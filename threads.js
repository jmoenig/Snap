/*

    threads.js

    a tail call optimized blocks-based programming language interpreter
    based on morphic.js and blocks.js
    inspired by Scratch, Scheme and Squeak

    written by Jens Mönig
    jens@moenig.org

    Copyright (C) 2018 by Jens Mönig

    This file is part of Snap!.

    Snap! is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of
    the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.


    prerequisites:
    --------------
    needs blocks.js and objects.js


    toc
    ---
    the following list shows the order in which all constructors are
    defined. Use this list to locate code in this document:

        ThreadManager
        Process
        Context
        Variable
        VariableFrame


    credits
    -------
    John Maloney and Dave Feinberg designed the original Scratch evaluator
    Ivan Motyashov contributed initial porting from Squeak

*/

// Global stuff ////////////////////////////////////////////////////////

/*global ArgMorph, BlockMorph, CommandBlockMorph, CommandSlotMorph, Morph,
MultiArgMorph, Point, ReporterBlockMorph, SyntaxElementMorph, contains, Costume,
degrees, detect, nop, radians, ReporterSlotMorph, CSlotMorph, RingMorph, Sound,
IDE_Morph, ArgLabelMorph, localize, XML_Element, hex_sha512, TableDialogMorph,
StageMorph, SpriteMorph, StagePrompterMorph, Note, modules, isString, copy,
isNil, WatcherMorph, List, ListWatcherMorph, alert, console, TableMorph,
TableFrameMorph, ColorSlotMorph, isSnapObject*/

modules.threads = '2018-March-14';

var ThreadManager;
var Process;
var Context;
var VariableFrame;

function snapEquals(a, b) {
    if (a instanceof List || (b instanceof List)) {
        if (a instanceof List && (b instanceof List)) {
            return a.equalTo(b);
        }
        return false;
    }

    var x = +a,
        y = +b,
        i,
        specials = [true, false, ''];

    // "zum Schneckengang verdorben, was Adlerflug geworden wäre"
    // collecting edge-cases that somebody complained about
    // on Github. Folks, take it easy and keep it fun, okay?
    // Shit like this is patently ugly and slows Snap down. Tnx!
    for (i = 9; i <= 13; i += 1) {
        specials.push(String.fromCharCode(i));
    }
    specials.push(String.fromCharCode(160));

    // check for special values before coercing to numbers
    if (isNaN(x) || isNaN(y) ||
            [a, b].some(function (any) {return contains(specials, any) ||
                  (isString(any) && (any.indexOf(' ') > -1)); })) {
        x = a;
        y = b;
    }

    // handle text comparison case-insensitive.
    if (isString(x) && isString(y)) {
        return x.toLowerCase() === y.toLowerCase();
    }

    return x === y;
}

function invoke(
    action, // a BlockMorph or a Context, a reified ("ringified") block
    contextArgs, // optional List of arguments for the context, or null
    receiver, // sprite or environment, optional for contexts
    timeout, // msecs
    timeoutErrorMsg, // string
    suppressErrors // bool
) {
    // execute the given block or context synchronously without yielding.
    // Apply context (not a block) to a list of optional arguments.
    // Receiver (sprite, stage or  environment), timeout etc. are optional.
    // If a timeout (in milliseconds) is specified, abort execution
    // after the timeout has been reached and throw an error.
    // SuppressErrors (bool) if non-timeout errors occurring in the
    // block are handled elsewhere.
    // This is highly experimental.
    // Caution: Kids, do not try this at home!
    // Use ThreadManager::startProcess with a callback instead

    var proc = new Process(),
        deadline = (timeout ? Date.now() + timeout : null);

    if (action instanceof Context) {
        if (receiver) { // optional
            action = proc.reportContextFor(receiver);
        }
        proc.initializeFor(action, contextArgs || new List());
    } else if (action instanceof BlockMorph) {
        proc.topBlock = action;
        if (receiver) {
            proc.homeContext = new Context();
            proc.homeContext.receiver = receiver;
            if (receiver.variables) {
                proc.homeContext.variables.parentFrame = receiver.variables;
            }
        } else {
            throw new Error('expecting a receiver but getting ' + receiver);
        }
        proc.context = new Context(
            null,
            action.blockSequence(),
            proc.homeContext
        );
    } else if (action.evaluate) {
        return action.evaluate();
    } else if (action instanceof Function) {
    	return action.apply(receiver, contextArgs.asArray());
    } else {
        throw new Error('expecting a block or ring but getting ' + action);
    }
    if (suppressErrors) {
        proc.isCatchingErrors = false;
    }
    while (proc.isRunning()) {
        if (deadline && (Date.now() > deadline)) {
            throw (new Error(
                localize(
                    timeoutErrorMsg ||
                        "a synchronous Snap! script has timed out")
                )
            );
        }
        proc.runStep(deadline);
    }
    return proc.homeContext.inputs[0];
}

// ThreadManager ///////////////////////////////////////////////////////

function ThreadManager() {
    this.processes = [];
    this.wantsToPause = false; // single stepping support
}

ThreadManager.prototype.pauseCustomHatBlocks = false;

ThreadManager.prototype.toggleProcess = function (block, receiver) {
    var active = this.findProcess(block, receiver);
    if (active) {
        active.stop();
    } else {
        return this.startProcess(block, receiver, null, null, null, true);
    }
};

ThreadManager.prototype.startProcess = function (
    block,
    receiver,
    isThreadSafe,
    exportResult, // bool
    callback,
    isClicked,
    rightAway
) {
    var top = block.topBlock(),
        active = this.findProcess(top, receiver),
        glow,
        newProc;
    if (active) {
        if (isThreadSafe) {
            return active;
        }
        active.stop();
        this.removeTerminatedProcesses();
    }
    newProc = new Process(top, receiver, callback, isClicked);
    newProc.exportResult = exportResult;
    newProc.isClicked = isClicked || false;

    // show a highlight around the running stack
    // if there are more than one active processes
    // for a block, display the thread count
    // next to it
    glow = top.getHighlight();
    if (glow) {
        glow.threadCount = this.processesForBlock(top).length + 1;
        glow.updateReadout();
    } else {
        top.addHighlight();
    }

    this.processes.push(newProc);
    if (rightAway) {
        newProc.runStep();
    }
    return newProc;
};

ThreadManager.prototype.stopAll = function (excpt) {
    // excpt is optional
    this.processes.forEach(function (proc) {
        if (proc !== excpt) {
            proc.stop();
        }
    });
};

ThreadManager.prototype.stopAllForReceiver = function (rcvr, excpt) {
    // excpt is optional
    this.processes.forEach(function (proc) {
        if (proc.homeContext.receiver === rcvr && proc !== excpt) {
            proc.stop();
            if (rcvr.isTemporary) {
                proc.isDead = true;
            }
        }
    });
};

ThreadManager.prototype.stopAllForBlock = function (aTopBlock) {
    this.processesForBlock(aTopBlock, true).forEach(function (proc) {
        proc.stop();
    });
};

ThreadManager.prototype.stopProcess = function (block, receiver) {
    var active = this.findProcess(block, receiver);
    if (active) {
        active.stop();
    }
};

ThreadManager.prototype.pauseAll = function (stage) {
    this.processes.forEach(function (proc) {
        proc.pause();
    });
    if (stage) {
        stage.pauseAllActiveSounds();
    }
};

ThreadManager.prototype.isPaused = function () {
    return detect(this.processes, function (proc) {return proc.isPaused; })
        !== null;
};

ThreadManager.prototype.resumeAll = function (stage) {
    this.processes.forEach(function (proc) {
        proc.resume();
    });
    if (stage) {
        stage.resumeAllActiveSounds();
    }
};

ThreadManager.prototype.step = function () {
    // run each process until it gives up control, skipping processes
    // for sprites that are currently picked up, then filter out any
    // processes that have been terminated

    var isInterrupted;
    if (Process.prototype.enableSingleStepping) {
        this.processes.forEach(function (proc) {
            if (proc.isInterrupted) {
                proc.runStep();
                isInterrupted = true;
            } else {
                proc.lastYield = Date.now();
            }
        });
        this.wantsToPause = (Process.prototype.flashTime > 0.5);
        if (isInterrupted) {
            if (this.wantsToPause) {
                this.pauseAll();
            }
            return;
        }
    }

    this.processes.forEach(function (proc) {
        if (!proc.homeContext.receiver.isPickedUp() && !proc.isDead) {
            proc.runStep();
        }
    });
    this.removeTerminatedProcesses();
};

ThreadManager.prototype.removeTerminatedProcesses = function () {
    // and un-highlight their scripts
    var remaining = [],
        count,
        myself = this;
    this.processes.forEach(function (proc) {
        var result,
            glow;
        if ((!proc.isRunning() && !proc.errorFlag) || proc.isDead) {
            if (proc.topBlock instanceof BlockMorph) {
                proc.unflash();
                // adjust the thread count indicator, if any
                count = myself.processesForBlock(proc.topBlock).length;
                if (count) {
                    glow = proc.topBlock.getHighlight() ||
                        proc.topBlock.addHighlight();
                    glow.threadCount = count;
                    glow.updateReadout();
                } else {
                    proc.topBlock.removeHighlight();
                }
            }
            if (proc.prompter) {
                proc.prompter.destroy();
                if (proc.homeContext.receiver.stopTalking) {
                    proc.homeContext.receiver.stopTalking();
                }
            }
            if (proc.topBlock instanceof ReporterBlockMorph ||
                    proc.isShowingResult) {
                result = proc.homeContext.inputs[0];
                if (proc.onComplete instanceof Function) {
                    proc.onComplete(result);
                } else {
                    if (result instanceof List) {
                        proc.topBlock.showBubble(
                            result.isTable() ?
                                    new TableFrameMorph(
                                        new TableMorph(result, 10)
                                    )
                                    : new ListWatcherMorph(result),
                            proc.exportResult,
                            proc.receiver
                        );
                    } else {
                        proc.topBlock.showBubble(
                            result,
                            proc.exportResult,
                            proc.receiver
                        );
                    }
                }
            }
        } else {
            remaining.push(proc);
        }
    });
    this.processes = remaining;
};

ThreadManager.prototype.findProcess = function (block, receiver) {
    var top = block.topBlock();
    return detect(
        this.processes,
        function (each) {
            return each.topBlock === top && (each.receiver === receiver);
        }
    );
};

ThreadManager.prototype.processesForBlock = function (block, only) {
    var top = only ? block : block.topBlock();
    return this.processes.filter(function (each) {
            return each.topBlock === top &&
                each.isRunning() &&
                !each.isDead;
    });
};

ThreadManager.prototype.doWhen = function (block, receiver, stopIt) {
    if (this.pauseCustomHatBlocks) {return; }
    if ((!block) || this.findProcess(block, receiver)) {
        return;
    }
    var pred = block.inputs()[0], world;
    if (block.removeHighlight()) {
        world = block.world();
        if (world) {
            world.hand.destroyTemporaries();
        }
    }
    if (stopIt) {return; }
    try {
        if (invoke(
            pred,
            null,
            receiver,
            50,
            'the predicate takes\ntoo long for a\ncustom hat block',
            true // suppress errors => handle them right here instead
        ) === true) {
            this.startProcess(
                block,
                receiver,
                null,
                null,
                null,
                null,
                true // atomic
            );
        }
    } catch (error) {
        block.addErrorHighlight();
        block.showBubble(
            error.name
            + '\n'
            + error.message
        );
    }
};

ThreadManager.prototype.toggleSingleStepping = function () {
    Process.prototype.enableSingleStepping =
        !Process.prototype.enableSingleStepping;
    if (!Process.prototype.enableSingleStepping) {
        this.processes.forEach(function (proc) {
            if (!proc.isPaused) {
                proc.unflash();
            }
        });
    }
};

// Process /////////////////////////////////////////////////////////////

/*
    A Process is what brings a stack of blocks to life. The process
    keeps track of which block to run next, evaluates block arguments,
    handles control structures, and so forth.

    The ThreadManager is the (passive) scheduler, telling each process
    when to run by calling its runStep() method. The runStep() method
    will execute some number of blocks, then voluntarily yield control
    so that the ThreadManager can run another process.

    The Scratch etiquette is that a process should yield control at the
    end of every loop iteration, and while it is running a timed command
    (e.g. "wait 5 secs") or a synchronous command (e.g. "broadcast xxx
    and wait"). Since Snap also has lambda and custom blocks Snap adds
    yields at the beginning of each non-atomic custom command block
    execution, and - to let users escape infinite loops and recursion -
    whenever the process runs into a timeout.

    a Process runs for a receiver, i.e. a sprite or the stage or any
    blocks-scriptable object that we'll introduce.

    structure:

    topBlock            the stack's first block, of which all others
                        are children
    receiver            object (sprite) to which the process applies,
                        cached from the top block
    instrument          musical instrument type, cached from the receiver,
                        so a single sprite can play several instruments
                        at once
    context             the Context describing the current state
                        of this process
    homeContext         stores information relevant to the whole process,
                        i.e. its receiver, result etc.
    isPaused            boolean indicating whether to pause
    readyToYield        boolean indicating whether to yield control to
                        another process
    readyToTerminate    boolean indicating whether the stop method has
                        been called
    isDead              boolean indicating a terminated clone process
    timeout             msecs after which to force yield
    lastYield           msecs when the process last yielded
    isFirstStep         boolean indicating whether on first step - for clones
    errorFlag           boolean indicating whether an error was encountered
    prompter            active instance of StagePrompterMorph
    httpRequest         active instance of an HttpRequest or null
    pauseOffset         msecs between the start of an interpolated operation
                        and when the process was paused
    isClicked           boolean flag indicating whether the process was
                        initiated by a user-click on a block
    isShowingResult     boolean flag indicating whether a "report" command
                        has been executed in a user-clicked process
    exportResult        boolean flag indicating whether a picture of the top
                        block along with the result bubble shoud be exported
    onComplete          an optional callback function to be executed when
                        the process is done
    procedureCount      number counting procedure call entries,
                        used to tag custom block calls, so "stop block"
                        invocations can catch them
    flashingContext     for single stepping
    isInterrupted       boolean, indicates intra-step flashing of blocks
*/

Process.prototype = {};
Process.prototype.constructor = Process;
Process.prototype.timeout = 500; // msecs after which to force yield
Process.prototype.isCatchingErrors = true;
Process.prototype.enableLiveCoding = false; // experimental
Process.prototype.enableSingleStepping = false; // experimental
Process.prototype.enableCompiling = false; // experimental
Process.prototype.flashTime = 0; // experimental
// Process.prototype.enableJS = false;

function Process(topBlock, receiver, onComplete, yieldFirst) {
    this.topBlock = topBlock || null;
    this.receiver = receiver;
    this.instrument = receiver ? receiver.instrument : null;
    this.readyToYield = false;
    this.readyToTerminate = false;
    this.isDead = false;
    this.isClicked = false;
    this.isShowingResult = false;
    this.errorFlag = false;
    this.context = null;
    this.homeContext = new Context(null, null, null, receiver);
    this.lastYield =  Date.now();
    this.isFirstStep = true;
    this.isAtomic = false;
    this.prompter = null;
    this.httpRequest = null;
    this.isPaused = false;
    this.pauseOffset = null;
    this.frameCount = 0;
    this.exportResult = false;
    this.onComplete = onComplete || null;
    this.procedureCount = 0;
    this.flashingContext = null; // experimental, for single-stepping
    this.isInterrupted = false; // experimental, for single-stepping

    if (topBlock) {
        this.homeContext.variables.parentFrame =
            this.homeContext.receiver.variables;
        this.context = new Context(
            null,
            topBlock.blockSequence(),
            this.homeContext
        );
        if (yieldFirst) {
            this.pushContext('doYield'); // highlight top block
        }
    }
}

// Process accessing

Process.prototype.isRunning = function () {
    return (this.context !== null) && (!this.readyToTerminate);
};

// Process entry points

Process.prototype.runStep = function (deadline) {
    // a step is an an uninterruptable 'atom', it can consist
    // of several contexts, even of several blocks

    if (this.isPaused) { // allow pausing in between atomic steps:
        return this.pauseStep();
    }
    this.readyToYield = false;
    this.isInterrupted = false;

    while (!this.readyToYield && !this.isInterrupted
            && this.context
            && (Date.now() - this.lastYield < this.timeout)
    ) {
        // also allow pausing inside atomic steps - for PAUSE block primitive:
        if (this.isPaused) {
            return this.pauseStep();
        }
        if (deadline && (Date.now() > deadline)) {
            if (this.isAtomic &&
                    this.homeContext.receiver &&
                    this.homeContext.receiver.endWarp) {
                this.homeContext.receiver.endWarp();
            }
            return;
        }
        this.evaluateContext();
    }

    this.lastYield = Date.now();
    this.isFirstStep = false;

    // make sure to redraw atomic things
    if (this.isAtomic &&
            this.homeContext.receiver &&
            this.homeContext.receiver.endWarp) {
        this.homeContext.receiver.endWarp();
        this.homeContext.receiver.startWarp();
    }

    if (this.readyToTerminate) {
        while (this.context) {
            this.popContext();
        }
        if (this.homeContext.receiver) {
            if (this.homeContext.receiver.endWarp) {
                // pen optimization
                this.homeContext.receiver.endWarp();
            }
        }
    }
};

Process.prototype.stop = function () {
    this.readyToYield = true;
    this.readyToTerminate = true;
    this.errorFlag = false;
    if (this.context) {
        this.context.stopMusic();
    }
};

Process.prototype.pause = function () {
    if (this.readyToTerminate) {
        return;
    }
    this.isPaused = true;
    this.flashPausedContext();
    if (this.context && this.context.startTime) {
        this.pauseOffset = Date.now() - this.context.startTime;
    }
};

Process.prototype.resume = function () {
    if (!this.enableSingleStepping) {
        this.unflash();
    }
    this.isPaused = false;
    this.pauseOffset = null;
};

Process.prototype.pauseStep = function () {
    this.lastYield = Date.now();
    if (this.context && this.context.startTime) {
        this.context.startTime = this.lastYield - this.pauseOffset;
    }
};

// Process evaluation

Process.prototype.evaluateContext = function () {
    var exp = this.context.expression;
    this.frameCount += 1;
    if (this.context.tag === 'exit') {
        this.expectReport();
    }
    if (exp instanceof Array) {
        return this.evaluateSequence(exp);
    }
    if (exp instanceof MultiArgMorph) {
        return this.evaluateMultiSlot(exp, exp.inputs().length);
    }
    if (exp instanceof ArgLabelMorph) {
        return this.evaluateArgLabel(exp);
    }
    if (exp instanceof ArgMorph || exp.bindingID) {
        return this.evaluateInput(exp);
    }
    if (exp instanceof BlockMorph) {
        return this.evaluateBlock(exp, exp.inputs().length);
    }
    if (isString(exp)) {
        return this[exp].apply(this, this.context.inputs);
    }
    this.popContext(); // default: just ignore it
};

Process.prototype.evaluateBlock = function (block, argCount) {
    var rcvr, inputs,
    	selector = block.selector;

    // check for special forms
    if (selector === 'reportOr' ||
            selector ===  'reportAnd' ||
            selector === 'doReport') {
        return this[selector](block);
    }

    // first evaluate all inputs, then apply the primitive
    rcvr = this.context.receiver || this.receiver;
    inputs = this.context.inputs;

    if (argCount > inputs.length) {
        this.evaluateNextInput(block);
    } else {
        if (this.flashContext()) {return; } // yield to flash the block
        if (this[selector]) {
            rcvr = this;
        }
        if (this.isCatchingErrors) {
            try {
                this.returnValueToParentContext(
                    rcvr[selector].apply(rcvr, inputs)
                );
                this.popContext();
            } catch (error) {
                this.handleError(error, block);
            }
        } else {
            this.returnValueToParentContext(
                rcvr[selector].apply(rcvr, inputs)
            );
            this.popContext();
        }
    }
};

// Process: Compile simple, side-effect free Reporters
// with only explicit formal parameters (no empty input slots)
// ** highly experimental and heavily under construction **

Process.prototype.reportCompiled = function (context) {
	this.assertType(context, ['reporter', 'predicate']);
	return this.compileFunction(context.expression, context.inputs);
};

Process.prototype.compileFunction = function (block, parameters) {
	// first test for unbound variables
 	block.allChildren().forEach(function (morph) {
  		if (morph.selector === 'reportGetVar' &&
        	!contains(parameters, morph.blockSpec)
        ) {
	        throw new Error(
    	        'compiling does not yet support\n' +
        	    'variables that are not\nformal parameters'
        	);
        }
    });
	return Function.apply(
    	null,
    	parameters.concat(['return ' + this.compileExpression(block)])
    );
};

Process.prototype.compileExpression = function (block) {
    var selector = block.selector,
		inputs = block.inputs(),
		src,
		rcvr,
		args;

    // first check for special forms and infix operators
    switch (selector) {
    case 'reportOr':
		return this.compileInfix('||', inputs);
    case 'reportAnd':
        return this.compileInfix('&&', inputs);
    case 'evaluateCustomBlock':
        throw new Error(
            'compiling does not yet support\n' +
            'custom blocks'
        );
    default:
        src = this[selector] ? this : (this.context.receiver || this.receiver);
        rcvr = src.constructor.name + '.prototype';
        args = this.compileInputs(inputs);
	    return rcvr + '.' + selector + '.apply('+ rcvr + ', [' + args +'])';
    }
};

Process.prototype.compileInfix = function (operator, inputs) {
	return '(' + this.compileInput(inputs[0]) + ' ' + operator + ' ' +
 	   this.compileInput(inputs[1]) +')';
};

Process.prototype.compileInputs = function (array) {
    var args = '',
        myself = this;

    array.forEach(function (inp) {
        if (args.length) {
            args += ', ';
        }
		args += myself.compileInput(inp);
    });
    return args;
};

Process.prototype.compileInput = function (inp) {
     var value, type;

    if (inp.isEmptySlot && inp.isEmptySlot()) {
        // implicit parameter - unsupported for now
    	throw new Error(
        	'compiling does not yet support\n' +
            'implicit parameters\n(empty input slots)'
    	);
    } else if (inp instanceof MultiArgMorph) {
        if (inp.isStatic) {
            return 'new List([' + this.compileInputs(inp.inputs()) + '])';
          } else {
            return '' + this.compileInputs(inp.inputs());
           }
    } else if (inp instanceof ArgMorph) {
        // literal - evaluate inline
        value = inp.evaluate();
        type = this.reportTypeOf(value);
        switch (type) {
        case 'number':
        case 'Boolean':
            return '' + value;
        case 'text':
            // enclose in double quotes
            return '"' + value + '"';
        case 'list':
            return 'new List([' + this.compileInputs(value) + '])';
        default:
        	if (value instanceof Array) {
         		return '"' + value[0] + '"';
         	}
            throw new Error(
                'compiling does not yet support\n' +
                'inputs of type\n' +
                 type
            );
        }
    } else if (inp instanceof BlockMorph) {
        if (inp.selector === 'reportGetVar') {
            // un-quoted string:
            return inp.blockSpec;
        } else {
            return this.compileExpression(inp);
        }
    } else {
        throw new Error(
            'compiling does not yet support\n' +
            'input slots of type\n' +
            inp.constructor.name
        );
    }
};

// Process: Special Forms Blocks Primitives

Process.prototype.reportOr = function (block) {
    var inputs = this.context.inputs;

    if (inputs.length < 1) {
        this.evaluateNextInput(block);
    } else if (inputs[0]) {
        if (this.flashContext()) {return; }
        this.returnValueToParentContext(true);
        this.popContext();
    } else if (inputs.length < 2) {
        this.evaluateNextInput(block);
    } else {
        if (this.flashContext()) {return; }
        this.returnValueToParentContext(inputs[1] === true);
        this.popContext();
    }
};

Process.prototype.reportAnd = function (block) {
    var inputs = this.context.inputs;

    if (inputs.length < 1) {
        this.evaluateNextInput(block);
    } else if (!inputs[0]) {
        if (this.flashContext()) {return; }
        this.returnValueToParentContext(false);
        this.popContext();
    } else if (inputs.length < 2) {
        this.evaluateNextInput(block);
    } else {
        if (this.flashContext()) {return; }
        this.returnValueToParentContext(inputs[1] === true);
        this.popContext();
    }
};

Process.prototype.doReport = function (block) {
    var outer = this.context.outerContext;
    if (this.flashContext()) {return; } // flash the block here, special form
    if (this.isClicked && (block.topBlock() === this.topBlock)) {
        this.isShowingResult = true;
    }
    if (this.context.expression.partOfCustomCommand) {
        this.doStopCustomBlock();
        this.popContext();
    } else {
        while (this.context && this.context.tag !== 'exit') {
            if (this.context.expression === 'doStopWarping') {
                this.doStopWarping();
            } else {
                this.popContext();
            }
        }
        if (this.context) {
            if (this.context.expression === 'expectReport') {
                // pop off inserted top-level exit context
                this.popContext();
            } else {
                // un-tag and preserve original caller
                this.context.tag = null;
            }
        }
    }
    // in any case evaluate (and ignore)
    // the input, because it could be
    // and HTTP Request for a hardware extension
    this.pushContext(block.inputs()[0], outer);
};

// Process: Non-Block evaluation

Process.prototype.evaluateMultiSlot = function (multiSlot, argCount) {
    // first evaluate all subslots, then return a list of their values
    var inputs = this.context.inputs,
        ans;
    if (multiSlot.bindingID) {
        if (this.isCatchingErrors) {
            try {
                ans = this.context.variables.getVar(multiSlot.bindingID);
            } catch (error) {
                this.handleError(error, multiSlot);
            }
        } else {
            ans = this.context.variables.getVar(multiSlot.bindingID);
        }
        this.returnValueToParentContext(ans);
        this.popContext();
    } else {
        if (argCount > inputs.length) {
            this.evaluateNextInput(multiSlot);
        } else {
            this.returnValueToParentContext(new List(inputs));
            this.popContext();
        }
    }
};

Process.prototype.evaluateArgLabel = function (argLabel) {
    // perform the ID function on an ArgLabelMorph element
    var inputs = this.context.inputs;
    if (inputs.length < 1) {
        this.evaluateNextInput(argLabel);
    } else {
        this.returnValueToParentContext(inputs[0]);
        this.popContext();
    }
};

Process.prototype.evaluateInput = function (input) {
    // evaluate the input unless it is bound to an implicit parameter
    var ans;
    if (this.flashContext()) {return; } // yield to flash the current argMorph
    if (input.bindingID) {
        if (this.isCatchingErrors) {
            try {
                ans = this.context.variables.getVar(input.bindingID);
            } catch (error) {
                this.handleError(error, input);
            }
        } else {
            ans = this.context.variables.getVar(input.bindingID);
        }
    } else {
        ans = input.evaluate();
        if (ans) {
            if (input.constructor === CommandSlotMorph ||
                    input.constructor === ReporterSlotMorph ||
                    (input instanceof CSlotMorph &&
                        (!input.isStatic || input.isLambda))) {
                // I know, this still needs yet to be done right....
                ans = this.reify(ans, new List());
            }
        }
    }
    this.returnValueToParentContext(ans);
    this.popContext();
};

Process.prototype.evaluateSequence = function (arr) {
    var pc = this.context.pc,
        outer = this.context.outerContext,
        isCustomBlock = this.context.isCustomBlock;
    if (pc === (arr.length - 1)) { // tail call elimination
        this.context = new Context(
            this.context.parentContext,
            arr[pc],
            this.context.outerContext,
            this.context.receiver
        );
        this.context.isCustomBlock = isCustomBlock;
    } else {
        if (pc >= arr.length) {
            this.popContext();
        } else {
            this.context.pc += 1;
            this.pushContext(arr[pc], outer);
        }
    }
};

/*
// version w/o tail call optimization:
--------------------------------------
Caution: we cannot just revert to this version of the method, because to make
tail call elimination work many tweaks had to be done to various primitives.
For the most part these tweaks are about schlepping the outer context (for
the variable bindings) and the isCustomBlock flag along, and are indicated
by a short comment in the code. But to really revert would take a good measure
of trial and error as well as debugging. In the developers file archive there
is a version of threads.js dated 120119(2) which basically resembles the
last version before introducing tail call optimization on 120123.

Process.prototype.evaluateSequence = function (arr) {
    var pc = this.context.pc;
    if (pc >= arr.length) {
        this.popContext();
    } else {
        this.context.pc += 1;
        this.pushContext(arr[pc]);
    }
};
*/

Process.prototype.evaluateNextInput = function (element) {
    var nxt = this.context.inputs.length,
        args = element.inputs(),
        exp = args[nxt],
        sel = this.context.expression.selector,
        outer = this.context.outerContext; // for tail call elimination

    if (exp.isUnevaluated) {
        if (exp.isUnevaluated === true || exp.isUnevaluated()) {
            // just return the input as-is
            /*
                Note: we only reify the input here, if it's not an
                input to a reification primitive itself (THE BLOCK,
                THE SCRIPT), because those allow for additional
                explicit parameter bindings.
            */
            if (sel === 'reify' || sel === 'reportScript') {
                this.context.addInput(exp);
            } else {
                this.context.addInput(this.reify(exp, new List()));
            }
        } else {
            this.pushContext(exp, outer);
        }
    } else {
        this.pushContext(exp, outer);
    }
};

Process.prototype.doYield = function () {
    this.popContext();
    if (!this.isAtomic) {
        this.readyToYield = true;
    }
};

Process.prototype.expectReport = function () {
    this.handleError(new Error("reporter didn't report"));
};

// Process Exception Handling

Process.prototype.handleError = function (error, element) {
    var m = element;
    this.stop();
    this.errorFlag = true;
    this.topBlock.addErrorHighlight();
    if (isNil(m) || isNil(m.world())) {m = this.topBlock; }
    m.showBubble(
        (m === element ? '' : 'Inside: ')
            + error.name
            + '\n'
            + error.message,
        this.exportResult,
        this.receiver
    );
};

Process.prototype.errorObsolete = function () {
    throw new Error('a custom block definition is missing');
};

// Process Lambda primitives

Process.prototype.reify = function (topBlock, parameterNames, isCustomBlock) {
    var context = new Context(
            null,
            null,
            this.context ? this.context.outerContext : null
        ),
        i = 0;

    if (topBlock) {
        context.expression = this.enableLiveCoding ||
            this.enableSingleStepping ?
                topBlock : topBlock.fullCopy();
        context.expression.show(); // be sure to make visible if in app mode

        if (!isCustomBlock && !parameterNames.length()) {
            // mark all empty slots with an identifier
            context.expression.allEmptySlots().forEach(function (slot) {
                i += 1;
                if (slot instanceof MultiArgMorph) {
                    slot.bindingID = ['arguments'];
                } else {
                    slot.bindingID = i;
                }
            });
            // and remember the number of detected empty slots
            context.emptySlots = i;
        }

    } else {
        context.expression = this.enableLiveCoding ||
            this.enableSingleStepping ? [this.context.expression]
                : [this.context.expression.fullCopy()];
    }

    context.inputs = parameterNames.asArray();
    context.receiver
        = this.context ? this.context.receiver : this.receiver;
    context.origin = context.receiver; // for serialization

    return context;
};

Process.prototype.reportScript = function (parameterNames, topBlock) {
    return this.reify(topBlock, parameterNames);
};

Process.prototype.reifyScript = function (topBlock, parameterNames) {
    return this.reify(topBlock, parameterNames);
};

Process.prototype.reifyReporter = function (topBlock, parameterNames) {
    return this.reify(topBlock, parameterNames);
};

Process.prototype.reifyPredicate = function (topBlock, parameterNames) {
    return this.reify(topBlock, parameterNames);
};

Process.prototype.reportJSFunction = function (parmNames, body) {
    return Function.apply(
        null,
        parmNames.asArray().concat([body])
    );
};

Process.prototype.doRun = function (context, args) {
    return this.evaluate(context, args, true);
};

Process.prototype.evaluate = function (
    context,
    args,
    isCommand
) {
    if (!context) {return null; }
    if (context instanceof Function) {
        /*
        if (!this.enableJS) {
            throw new Error('JavaScript is not enabled');
        }
        */
        return context.apply(
            this.blockReceiver(),
            args.asArray().concat([this])
        );
    }
    if (context.isContinuation) {
        return this.runContinuation(context, args);
    }
    if (!(context instanceof Context)) {
        throw new Error('expecting a ring but getting ' + context);
    }

    var outer = new Context(null, null, context.outerContext),
        caller = this.context.parentContext,
        exit,
        runnable,
        parms = args.asArray(),
        i,
        value;

    if (!outer.receiver) {
        outer.receiver = context.receiver; // for custom blocks
    }
    runnable = new Context(
        this.context.parentContext,
        context.expression,
        outer,
        context.receiver
    );
    this.context.parentContext = runnable;

    if (context.expression instanceof ReporterBlockMorph) {
        // auto-"warp" nested reporters
        this.readyToYield = (Date.now() - this.lastYield > this.timeout);
    }

    // assign parameters if any were passed
    if (parms.length > 0) {

        // assign formal parameters
        for (i = 0; i < context.inputs.length; i += 1) {
            value = 0;
            if (!isNil(parms[i])) {
                value = parms[i];
            }
            outer.variables.addVar(context.inputs[i], value);
        }

        // assign implicit parameters if there are no formal ones
        if (context.inputs.length === 0) {
            // assign the actual arguments list to the special
            // parameter ID ['arguments'], to be used for variadic inputs
            outer.variables.addVar(['arguments'], args);

            // in case there is only one input
            // assign it to all empty slots
            if (parms.length === 1) {
                for (i = 1; i <= context.emptySlots; i += 1) {
                    outer.variables.addVar(i, parms[0]);
                }

            // if the number of inputs matches the number
            // of empty slots distribute them sequentially
            } else if (parms.length === context.emptySlots) {
                for (i = 1; i <= parms.length; i += 1) {
                    outer.variables.addVar(i, parms[i - 1]);
                }

            } else if (context.emptySlots !== 1) {
                throw new Error(
                    localize('expecting') + ' ' + context.emptySlots + ' '
                        + localize('input(s), but getting') + ' '
                        + parms.length
                );
            }
        }
    }

    if (runnable.expression instanceof CommandBlockMorph) {
        runnable.expression = runnable.expression.blockSequence();
        if (!isCommand) {
            if (caller) {
                // tag caller, so "report" can catch it later
                caller.tag = 'exit';
            } else {
                // top-level context, insert a tagged exit context
                // which "report" can catch later
                exit = new Context(
                    runnable.parentContext,
                    'expectReport',
                    outer,
                    outer.receiver
                );
                exit.tag = 'exit';
                runnable.parentContext = exit;
            }
        }
    }
};

Process.prototype.fork = function (context, args) {
    var proc = new Process(),
        stage = this.homeContext.receiver.parentThatIsA(StageMorph);
    proc.instrument = this.instrument;
    proc.receiver = this.receiver;
    proc.initializeFor(context, args, this.enableSingleStepping);
    // proc.pushContext('doYield');
    stage.threads.processes.push(proc);
};

Process.prototype.initializeFor = function (context, args, ignoreExit) {
    // used by Process.fork() and global invoke()
    if (context.isContinuation) {
        throw new Error(
            'continuations cannot be forked'
        );
    }
    if (!(context instanceof Context)) {
        throw new Error('expecting a ring but getting ' + context);
    }

    var outer = new Context(null, null, context.outerContext),
        runnable = new Context(null,
            context.expression,
            outer
            ),
        parms = args.asArray(),
        i,
        value,
        exit;

    // remember the receiver
    this.context = context.receiver;

    // assign parameters if any were passed
    if (parms.length > 0) {

        // assign formal parameters
        for (i = 0; i < context.inputs.length; i += 1) {
            value = 0;
            if (!isNil(parms[i])) {
                value = parms[i];
            }
            outer.variables.addVar(context.inputs[i], value);
        }

        // assign implicit parameters if there are no formal ones
        if (context.inputs.length === 0) {
            // assign the actual arguments list to the special
            // parameter ID ['arguments'], to be used for variadic inputs
            outer.variables.addVar(['arguments'], args);

            // in case there is only one input
            // assign it to all empty slots
            if (parms.length === 1) {
                for (i = 1; i <= context.emptySlots; i += 1) {
                    outer.variables.addVar(i, parms[0]);
                }

            // if the number of inputs matches the number
            // of empty slots distribute them sequentially
            } else if (parms.length === context.emptySlots) {
                for (i = 1; i <= parms.length; i += 1) {
                    outer.variables.addVar(i, parms[i - 1]);
                }

            } else if (context.emptySlots !== 1) {
                throw new Error(
                    localize('expecting') + ' ' + context.emptySlots + ' '
                        + localize('input(s), but getting') + ' '
                        + parms.length
                );
            }
        }
    }

    if (runnable.expression instanceof CommandBlockMorph) {
        runnable.expression = runnable.expression.blockSequence();

        // insert a tagged exit context
        // which "report" can catch later
        // needed for invoke() situations
        if (!ignoreExit) { // when single stepping LAUNCH
	        exit = new Context(
    	        runnable.parentContext,
        	    'expectReport',
            	outer,
            	outer.receiver
        	);
        	exit.tag = 'exit';
        	runnable.parentContext = exit;
    	}
    }

    this.homeContext = new Context(); // context.outerContext;
    this.homeContext.receiver = context.outerContext.receiver;
    this.topBlock = context.expression;
    this.context = runnable;
};

// Process stopping blocks primitives

Process.prototype.doStopBlock = function () {
    var target = this.context.expression.exitTag;
    if (isNil(target)) {
        return this.doStopCustomBlock();
    }
    while (this.context &&
            (isNil(this.context.tag) || (this.context.tag > target))) {
        if (this.context.expression === 'doStopWarping') {
            this.doStopWarping();
        } else {
            this.popContext();
        }
    }
    this.pushContext();
};

Process.prototype.doStopCustomBlock = function () {
    // fallback solution for "report" blocks inside
    // custom command definitions and untagged "stop" blocks
    while (this.context && !this.context.isCustomBlock) {
        if (this.context.expression === 'doStopWarping') {
            this.doStopWarping();
        } else {
            this.popContext();
        }
    }
};

// Process continuations primitives

Process.prototype.doCallCC = function (aContext, isReporter) {
    this.evaluate(
        aContext,
        new List([this.context.continuation()]),
        !isReporter
    );
};

Process.prototype.reportCallCC = function (aContext) {
    this.doCallCC(aContext, true);
};

Process.prototype.runContinuation = function (aContext, args) {
    var parms = args.asArray();

    // determine whether the continuations is to show the result
    // in a value-balloon becuse the user has directly clicked on a reporter
    if (aContext.expression === 'expectReport' && parms.length) {
        this.stop();
        this.homeContext.inputs[0] = parms[0];
        return;
    }

    this.context.parentContext = aContext.copyForContinuationCall();
    // passing parameter if any was passed
    if (parms.length === 1) {
        this.context.parentContext.outerContext.variables.addVar(
            1,
            parms[0]
        );
    }
};

// Process custom block primitives

Process.prototype.evaluateCustomBlock = function () {
    var caller = this.context.parentContext,
        block = this.context.expression,
        method = block.isGlobal ? block.definition
                : this.blockReceiver().getMethod(block.semanticSpec),
        context = method.body,
        declarations = method.declarations,
        args = new List(this.context.inputs),
        parms = args.asArray(),
        runnable,
        exit,
        i,
        value,
        outer;

    if (!context) {return null; }
    this.procedureCount += 1;
    outer = new Context();
    outer.receiver = this.context.receiver;

    outer.variables.parentFrame = block.variables;

    // block (instance) var support, experimental:
    // only splice in block vars if any are defined, because block vars
    // can cause race conditions in global block definitions that
    // access sprite-local variables at the same time.
    if (method.variableNames.length) {
        block.variables.parentFrame = outer.receiver ?
                outer.receiver.variables : null;
    } else {
        // original code without block variables:
        outer.variables.parentFrame = outer.receiver ?
                outer.receiver.variables : null;
    }

    runnable = new Context(
        this.context.parentContext,
        context.expression,
        outer,
        outer.receiver
    );
    runnable.isCustomBlock = true;
    this.context.parentContext = runnable;

    // passing parameters if any were passed
    if (parms.length > 0) {

        // assign formal parameters
        for (i = 0; i < context.inputs.length; i += 1) {
            value = 0;
            if (!isNil(parms[i])) {
                value = parms[i];
            }
            outer.variables.addVar(context.inputs[i], value);

            // if the parameter is an upvar,
            // create a reference to the variable it points to
            if (declarations[context.inputs[i]][0] === '%upvar') {
                this.context.outerContext.variables.vars[value] =
                    outer.variables.vars[context.inputs[i]];
            }
        }
    }

    // tag return target
    if (method.type !== 'command') {
        if (caller) {
            // tag caller, so "report" can catch it later
            caller.tag = 'exit';
        } else {
            // top-level context, insert a tagged exit context
            // which "report" can catch later
            exit = new Context(
                runnable.parentContext,
                'expectReport',
                outer,
                outer.receiver
            );
            exit.tag = 'exit';
            runnable.parentContext = exit;
        }
        // auto-"warp" nested reporters
        this.readyToYield = (Date.now() - this.lastYield > this.timeout);
    } else {
        // tag all "stop this block" blocks with the current
        // procedureCount as exitTag, and mark all "report" blocks
        // as being inside a custom command definition
        runnable.expression.tagExitBlocks(this.procedureCount, true);

        // tag the caller with the current procedure count, so
        // "stop this block" blocks can catch it, but only
        // if the caller hasn't been tagged already
        if (caller && !caller.tag) {
            caller.tag = this.procedureCount;
        }
        // yield commands unless explicitly "warped" or directly recursive
        if (!this.isAtomic && method.isDirectlyRecursive()) {
            this.readyToYield = true;
        }
    }
    runnable.expression = runnable.expression.blockSequence();
};

// Process variables primitives

Process.prototype.doDeclareVariables = function (varNames) {
    var varFrame = this.context.outerContext.variables;
    varNames.asArray().forEach(function (name) {
        varFrame.addVar(name);
    });
};

Process.prototype.doSetVar = function (varName, value) {
    var varFrame = this.context.variables,
        name = varName,
        rcvr;
    if (name instanceof Context) {
        rcvr = this.blockReceiver();
        if (name.expression.selector === 'reportGetVar') {
            name.variables.setVar(
                name.expression.blockSpec,
                value,
                rcvr
            );
            return;
        }
        this.doSet(name, value);
        return;
    }
    varFrame.setVar(name, value, this.blockReceiver());
};

Process.prototype.doChangeVar = function (varName, value) {
    var varFrame = this.context.variables,
        name = varName;

    if (name instanceof Context) {
        if (name.expression.selector === 'reportGetVar') {
            name.variables.changeVar(
                name.expression.blockSpec,
                value,
                this.blockReceiver()
            );
            return;
        }
    }
    varFrame.changeVar(name, value, this.blockReceiver());
};

Process.prototype.reportGetVar = function () {
    // assumes a getter block whose blockSpec is a variable name
    return this.context.variables.getVar(
        this.context.expression.blockSpec
    );
};

Process.prototype.doShowVar = function (varName) {
    var varFrame = this.context.variables,
        stage,
        watcher,
        target,
        label,
        others,
        isGlobal,
        name = varName;

    if (name instanceof Context) {
        if (name.expression.selector === 'reportGetVar') {
            name = name.expression.blockSpec;
        } else {
            this.doChangePrimitiveVisibility(name.expression, false);
            return;
        }
    }
    if (this.homeContext.receiver) {
        stage = this.homeContext.receiver.parentThatIsA(StageMorph);
        if (stage) {
            target = varFrame.silentFind(name);
            if (!target) {return; }
            // first try to find an existing (hidden) watcher
            watcher = detect(
                stage.children,
                function (morph) {
                    return morph instanceof WatcherMorph
                        && morph.target === target
                        && morph.getter === name;
                }
            );
            if (watcher !== null) {
                watcher.show();
                watcher.fixLayout(); // re-hide hidden parts
                return;
            }
            // if no watcher exists, create a new one
            isGlobal = contains(
                this.homeContext.receiver.globalVariables().names(),
                varName
            );
            if (isGlobal || target.owner) {
                label = name;
            } else {
                label = name + ' ' + localize('(temporary)');
            }
            watcher = new WatcherMorph(
                label,
                SpriteMorph.prototype.blockColor.variables,
                target,
                name
            );
            watcher.setPosition(stage.position().add(10));
            others = stage.watchers(watcher.left());
            if (others.length > 0) {
                watcher.setTop(others[others.length - 1].bottom());
            }
            stage.add(watcher);
            watcher.fixLayout();
        }
    }
};

Process.prototype.doHideVar = function (varName) {
    // if no varName is specified delete all watchers on temporaries
    var varFrame = this.context.variables,
        stage,
        watcher,
        target,
        name = varName;

    if (name instanceof Context) {
        if (name.expression.selector === 'reportGetVar') {
            name = name.expression.blockSpec;
        } else {
            this.doChangePrimitiveVisibility(name.expression, true);
            return;
        }
    }
    if (!name) {
        this.doRemoveTemporaries();
        return;
    }
    if (this.homeContext.receiver) {
        stage = this.homeContext.receiver.parentThatIsA(StageMorph);
        if (stage) {
            target = varFrame.find(name);
            watcher = detect(
                stage.children,
                function (morph) {
                    return morph instanceof WatcherMorph
                        && morph.target === target
                        && morph.getter === name;
                }
            );
            if (watcher !== null) {
                if (watcher.isTemporary()) {
                    watcher.destroy();
                } else {
                    watcher.hide();
                }
            }
        }
    }
};

Process.prototype.doRemoveTemporaries = function () {
    var stage;
    if (this.homeContext.receiver) {
        stage = this.homeContext.receiver.parentThatIsA(StageMorph);
        if (stage) {
            stage.watchers().forEach(function (watcher) {
                if (watcher.isTemporary()) {
                    watcher.destroy();
                }
            });
        }
    }
};

// Process hiding and showing primitives primitives :-)

Process.prototype.doChangePrimitiveVisibility = function (aBlock, hideIt) {
    var ide = this.homeContext.receiver.parentThatIsA(IDE_Morph),
        dict,
        cat;
    if (!ide || (aBlock.selector === 'evaluateCustomBlock')) {
        return;
    }
    if (hideIt) {
        StageMorph.prototype.hiddenPrimitives[aBlock.selector] = true;
    } else {
        delete StageMorph.prototype.hiddenPrimitives[aBlock.selector];
    }
    dict = {
        doWarp: 'control',
        reifyScript: 'operators',
        reifyReporter: 'operators',
        reifyPredicate: 'operators',
        doDeclareVariables: 'variables'
    };
    cat = dict[this.selector] || this.category;
    if (cat === 'lists') {cat = 'variables'; }
    ide.flushBlocksCache(cat);
    ide.refreshPalette();
};

// Process sprite inheritance primitives

Process.prototype.doDeleteAttr = function (attrName) {
    var name = attrName,
        rcvr = this.blockReceiver();
    if (name instanceof Context) {
        if (name.expression.selector === 'reportGetVar') {
            name = name.expression.blockSpec;
        } else { // attribute
            name = {
                xPosition: 'x position',
                yPosition: 'y position',
                direction: 'direction',
                getCostumeIdx: 'costume #',
                size: 'size'
            }[name.expression.selector];
            if (!isNil(name)) {
                rcvr.inheritAttribute(name);
            }
            return; // error: cannot delete attribute...
        }
    }
    if (name instanceof Array) {
        return rcvr.inheritAttribute(this.inputOption(name));
    }
    if (contains(rcvr.inheritedVariableNames(true), name)) {
        rcvr.deleteVariable(name);
    }
};

// experimental message passing primitives

Process.prototype.doTellTo = function (sprite, context, args) {
    this.doRun(
        this.reportAttributeOf(context, sprite),
        args
    );
};

Process.prototype.reportAskFor = function (sprite, context, args) {
    this.evaluate(
        this.reportAttributeOf(context, sprite),
        args
    );
};

// Process lists primitives

Process.prototype.reportNewList = function (elements) {
    return elements;
};

Process.prototype.reportCONS = function (car, cdr) {
    this.assertType(cdr, 'list');
    return new List().cons(car, cdr);
};

Process.prototype.reportCDR = function (list) {
    this.assertType(list, 'list');
    return list.cdr();
};

Process.prototype.doAddToList = function (element, list) {
    this.assertType(list, 'list');
    if (list.type) {
        this.assertType(element, list.type);
    }
    list.add(element);
};

Process.prototype.doDeleteFromList = function (index, list) {
    var idx = index;
    this.assertType(list, 'list');
    if (this.inputOption(index) === 'all') {
        return list.clear();
    }
    if (index === '') {
        return null;
    }
    if (this.inputOption(index) === 'last') {
        idx = list.length();
    } else if (isNaN(+this.inputOption(index))) {
        return null;
    }
    list.remove(idx);
};

Process.prototype.doInsertInList = function (element, index, list) {
    var idx = index;
    this.assertType(list, 'list');
    if (list.type) {
        this.assertType(element, list.type);
    }
    if (index === '') {
        return null;
    }
    if (this.inputOption(index) === 'any') {
        idx = this.reportRandom(1, list.length() + 1);
    }
    if (this.inputOption(index) === 'last') {
        idx = list.length() + 1;
    }
    list.add(element, idx);
};

Process.prototype.doReplaceInList = function (index, list, element) {
    var idx = index;
    this.assertType(list, 'list');
    if (list.type) {
        this.assertType(element, list.type);
    }
    if (index === '') {
        return null;
    }
    if (this.inputOption(index) === 'any') {
        idx = this.reportRandom(1, list.length());
    }
    if (this.inputOption(index) === 'last') {
        idx = list.length();
    }
    list.put(element, idx);
};

Process.prototype.reportListItem = function (index, list) {
    var idx = index;
    this.assertType(list, 'list');
    if (index === '') {
        return '';
    }
    if (this.inputOption(index) === 'any') {
        idx = this.reportRandom(1, list.length());
    }
    if (this.inputOption(index) === 'last') {
        idx = list.length();
    }
    return list.at(idx);
};

Process.prototype.reportListLength = function (list) {
    this.assertType(list, 'list');
    return list.length();
};

Process.prototype.reportListContainsItem = function (list, element) {
    this.assertType(list, 'list');
    return list.contains(element);
};

Process.prototype.doShowTable = function (list) {
    // experimental
    this.assertType(list, 'list');
    new TableDialogMorph(list).popUp(this.blockReceiver().world());
};

// Process conditionals primitives

Process.prototype.doIf = function () {
    var args = this.context.inputs,
        outer = this.context.outerContext, // for tail call elimination
        isCustomBlock = this.context.isCustomBlock;

    this.popContext();
    if (args[0]) {
        if (args[1]) {
            this.pushContext(args[1].blockSequence(), outer);
            this.context.isCustomBlock = isCustomBlock;
        }
    }
    this.pushContext();
};

Process.prototype.doIfElse = function () {
    var args = this.context.inputs,
        outer = this.context.outerContext, // for tail call elimination
        isCustomBlock = this.context.isCustomBlock;

    this.popContext();
    if (args[0]) {
        if (args[1]) {
            this.pushContext(args[1].blockSequence(), outer);
        }
    } else {
        if (args[2]) {
            this.pushContext(args[2].blockSequence(), outer);
        } else {
            this.pushContext('doYield');
        }
    }
    if (this.context) {
        this.context.isCustomBlock = isCustomBlock;
    }

    this.pushContext();
};

// Process process related primitives

Process.prototype.doStop = function () {
    this.stop();
};

Process.prototype.doStopAll = function () {
    var stage, ide;
    if (this.homeContext.receiver) {
        stage = this.homeContext.receiver.parentThatIsA(StageMorph);
        if (stage) {
            stage.threads.resumeAll(stage);
            stage.keysPressed = {};
            stage.threads.stopAll();
            stage.stopAllActiveSounds();
            stage.children.forEach(function (morph) {
                if (morph.stopTalking) {
                    morph.stopTalking();
                }
            });
            stage.removeAllClones();
        }
        ide = stage.parentThatIsA(IDE_Morph);
        if (ide) {ide.controlBar.pauseButton.refresh(); }
    }
};

Process.prototype.doStopThis = function (choice) {
    switch (this.inputOption(choice)) {
    case 'all':
        this.doStopAll();
        break;
    case 'this script':
        this.doStop();
        break;
    case 'this block':
        this.doStopBlock();
        break;
    default:
        this.doStopOthers(choice);
    }
};

Process.prototype.doStopOthers = function (choice) {
    var stage;
    if (this.homeContext.receiver) {
        stage = this.homeContext.receiver.parentThatIsA(StageMorph);
        if (stage) {
            switch (this.inputOption(choice)) {
            case 'all but this script':
                stage.threads.stopAll(this);
                break;
            case 'other scripts in sprite':
                stage.threads.stopAllForReceiver(
                    this.homeContext.receiver,
                    this
                );
                break;
            default:
                nop();
            }
        }
    }
};

Process.prototype.doWarp = function (body) {
    // execute my contents block atomically (more or less)
    var outer = this.context.outerContext, // for tail call elimination
        isCustomBlock = this.context.isCustomBlock,
        stage;

    this.popContext();

    if (body) {
        if (this.homeContext.receiver) {
            if (this.homeContext.receiver.startWarp) {
                // pen optimization
                this.homeContext.receiver.startWarp();
            }
            stage = this.homeContext.receiver.parentThatIsA(StageMorph);
            if (stage) {
                stage.fps = 0; // variable frame rate
            }
        }
        this.pushContext('doYield');
        this.context.isCustomBlock = isCustomBlock;
        if (!this.isAtomic) {
            this.pushContext('doStopWarping');
        }
        this.pushContext(body.blockSequence(), outer);
        this.isAtomic = true;
    }
    this.pushContext();
};

Process.prototype.doStopWarping = function () {
    var stage;
    this.popContext();
    this.isAtomic = false;
    if (this.homeContext.receiver) {
        if (this.homeContext.receiver.endWarp) {
            // pen optimization
            this.homeContext.receiver.endWarp();
        }
        stage = this.homeContext.receiver.parentThatIsA(StageMorph);
        if (stage) {
            stage.fps = stage.frameRate; //  back to fixed frame rate
        }
    }
};

Process.prototype.reportIsFastTracking = function () {
    var ide;
    if (this.homeContext.receiver) {
        ide = this.homeContext.receiver.parentThatIsA(IDE_Morph);
        if (ide) {
            return ide.stage.isFastTracked;
        }
    }
    return false;
};

Process.prototype.doSetFastTracking = function (bool) {
    var ide;
    if (!this.reportIsA(bool, 'Boolean')) {
        return;
    }
    if (this.homeContext.receiver) {
        ide = this.homeContext.receiver.parentThatIsA(IDE_Morph);
        if (ide) {
            if (bool) {
                ide.startFastTracking();
            } else {
                ide.stopFastTracking();
            }
        }
    }
};

Process.prototype.doPauseAll = function () {
    var stage, ide;
    if (this.homeContext.receiver) {
        stage = this.homeContext.receiver.parentThatIsA(StageMorph);
        if (stage) {
            stage.threads.pauseAll(stage);
        }
        ide = stage.parentThatIsA(IDE_Morph);
        if (ide) {ide.controlBar.pauseButton.refresh(); }
    }
};

// Process loop primitives

Process.prototype.doForever = function (body) {
    this.context.inputs = []; // force re-evaluation of C-slot
    this.pushContext('doYield');
    if (body) {
        this.pushContext(body.blockSequence());
    }
    this.pushContext();
};

Process.prototype.doRepeat = function (counter, body) {
    var block = this.context.expression,
        outer = this.context.outerContext, // for tail call elimination
        isCustomBlock = this.context.isCustomBlock;

    if (counter < 1) { // was '=== 0', which caused infinite loops on non-ints
        return null;
    }
    this.popContext();
    this.pushContext(block, outer);
    this.context.isCustomBlock = isCustomBlock;
    this.context.addInput(counter - 1);
    this.pushContext('doYield');
    if (body) {
        this.pushContext(body.blockSequence());
    }
    this.pushContext();
};

Process.prototype.doUntil = function (goalCondition, body) {
    if (goalCondition) {
        this.popContext();
        this.pushContext('doYield');
        return null;
    }
    this.context.inputs = [];
    this.pushContext('doYield');
    if (body) {
        this.pushContext(body.blockSequence());
    }
    this.pushContext();
};

Process.prototype.doWaitUntil = function (goalCondition) {
    if (goalCondition) {
        this.popContext();
        this.pushContext('doYield');
        return null;
    }
    this.context.inputs = [];
    this.pushContext('doYield');
    this.pushContext();
};

Process.prototype.reportMap = function (reporter, list) {
    // answer a new list containing the results of the reporter applied
    // to each value of the given list. Distinguish between linked and
    // arrayed lists.
    // Note: This method utilizes the current context's inputs array to
    // manage temporary variables, whose allocation to which slot are
    // documented in each of the variants' code (linked or arrayed) below

    var next;
    if (list.isLinked) {
        // this.context.inputs:
        // [0] - reporter
        // [1] - list (original source)
        // -----------------------------
        // [2] - result list (target)
        // [3] - currently last element of result list
        // [4] - current source list (what's left to map)
        // [5] - current value of last function call

        if (this.context.inputs.length < 3) {
            this.context.addInput(new List());
            this.context.inputs[2].isLinked = true;
            this.context.addInput(this.context.inputs[2]);
            this.context.addInput(list);
        }
        if (this.context.inputs[4].length() === 0) {
            this.context.inputs[3].rest = list.cons(this.context.inputs[5]);
            this.returnValueToParentContext(this.context.inputs[2].cdr());
            return;
        }
        if (this.context.inputs.length > 5) {
            this.context.inputs[3].rest = list.cons(this.context.inputs[5]);
            this.context.inputs[3] = this.context.inputs[3].rest;
            this.context.inputs.splice(5);
        }
        next = this.context.inputs[4].at(1);
        this.context.inputs[4] = this.context.inputs[4].cdr();
        this.pushContext();
        this.evaluate(reporter, new List([next]));
    } else { // arrayed
        // this.context.inputs:
        // [0] - reporter
        // [1] - list (original source)
        // -----------------------------
        // [2..n] - result values (target)

        if (this.context.inputs.length - 2 === list.length()) {
            this.returnValueToParentContext(
                new List(this.context.inputs.slice(2))
            );
            return;
        }
        next = list.at(this.context.inputs.length - 1);
        this.pushContext();
        this.evaluate(reporter, new List([next]));
    }
};

Process.prototype.doForEach = function (upvar, list, script) {
    // perform a script for each element of a list, assigning the
    // current iteration's element to a variable with the name
    // specified in the "upvar" parameter, so it can be referenced
    // within the script. Uses the context's - unused - fourth
    // element as temporary storage for the current list index

    if (isNil(this.context.inputs[3])) {this.context.inputs[3] = 1; }
    var index = this.context.inputs[3];
    this.context.outerContext.variables.addVar(upvar);
    this.context.outerContext.variables.setVar(
        upvar,
        list.at(index)
    );
    if (index > list.length()) {return; }
    this.context.inputs[3] += 1;
    this.pushContext('doYield');
    this.pushContext();
    this.evaluate(script, new List(), true);
};

// Process interpolated primitives

Process.prototype.doWait = function (secs) {
    if (!this.context.startTime) {
        this.context.startTime = Date.now();
    }
    if ((Date.now() - this.context.startTime) >= (secs * 1000)) {
        if (!this.isAtomic && (secs === 0)) {
            // "wait 0 secs" is a plain "yield"
            // that can be overridden by "warp"
            this.readyToYield = true;
        }
        return null;
    }
    this.pushContext('doYield');
    this.pushContext();
};

Process.prototype.doGlide = function (secs, endX, endY) {
    if (!this.context.startTime) {
        this.context.startTime = Date.now();
        this.context.startValue = new Point(
            this.blockReceiver().xPosition(),
            this.blockReceiver().yPosition()
        );
    }
    if ((Date.now() - this.context.startTime) >= (secs * 1000)) {
        this.blockReceiver().gotoXY(endX, endY);
        return null;
    }
    this.blockReceiver().glide(
        secs * 1000,
        endX,
        endY,
        Date.now() - this.context.startTime,
        this.context.startValue
    );

    this.pushContext('doYield');
    this.pushContext();
};

Process.prototype.doSayFor = function (data, secs) {
    if (!this.context.startTime) {
        this.context.startTime = Date.now();
        this.blockReceiver().bubble(data);
    }
    if ((Date.now() - this.context.startTime) >= (secs * 1000)) {
        this.blockReceiver().stopTalking();
        return null;
    }
    this.pushContext('doYield');
    this.pushContext();
};

Process.prototype.doThinkFor = function (data, secs) {
    if (!this.context.startTime) {
        this.context.startTime = Date.now();
        this.blockReceiver().doThink(data);
    }
    if ((Date.now() - this.context.startTime) >= (secs * 1000)) {
        this.blockReceiver().stopTalking();
        return null;
    }
    this.pushContext('doYield');
    this.pushContext();
};

Process.prototype.blockReceiver = function () {
    return this.context ? this.context.receiver || this.homeContext.receiver
            : this.homeContext.receiver || this.receiver;
};

// Process sound primitives (interpolated)

Process.prototype.doPlaySoundUntilDone = function (name) {
    var sprite = this.blockReceiver();
    if (this.context.activeAudio === null) {
        this.context.activeAudio = sprite.playSound(name);
    }
    if (this.context.activeAudio.ended
            || this.context.activeAudio.terminated) {
        return null;
    }
    this.pushContext('doYield');
    this.pushContext();
};

Process.prototype.doStopAllSounds = function () {
    var stage = this.homeContext.receiver.parentThatIsA(StageMorph);
    if (stage) {
        stage.threads.processes.forEach(function (thread) {
            if (thread.context) {
                thread.context.stopMusic();
                if (thread.context.activeAudio) {
                    thread.popContext();
                }
            }
        });
        stage.stopAllActiveSounds();
    }
};

// Process user prompting primitives (interpolated)

Process.prototype.doAsk = function (data) {
    var stage = this.homeContext.receiver.parentThatIsA(StageMorph),
        rcvr = this.blockReceiver(),
        isStage = rcvr instanceof StageMorph,
        isHiddenSprite = rcvr instanceof SpriteMorph && !rcvr.isVisible,
        activePrompter;

    stage.keysPressed = {};
    if (!this.prompter) {
        activePrompter = detect(
            stage.children,
            function (morph) {return morph instanceof StagePrompterMorph; }
        );
        if (!activePrompter) {
            if (!isStage && !isHiddenSprite) {
                rcvr.bubble(data, false, true);
            }
            this.prompter = new StagePrompterMorph(
                isStage || isHiddenSprite ? data : null
            );
            if (stage.scale < 1) {
                this.prompter.setWidth(stage.width() - 10);
            } else {
                this.prompter.setWidth(stage.dimensions.x - 20);
            }
            this.prompter.fixLayout();
            this.prompter.setCenter(stage.center());
            this.prompter.setBottom(stage.bottom() - this.prompter.border);
            stage.add(this.prompter);
            this.prompter.inputField.edit();
            stage.changed();
        }
    } else {
        if (this.prompter.isDone) {
            stage.lastAnswer = this.prompter.inputField.getValue();
            this.prompter.destroy();
            this.prompter = null;
            if (!isStage) {rcvr.stopTalking(); }
            return null;
        }
    }
    this.pushContext('doYield');
    this.pushContext();
};

Process.prototype.reportLastAnswer = function () {
    return this.homeContext.receiver.parentThatIsA(StageMorph).lastAnswer;
};

// Process URI retrieval (interpolated)

Process.prototype.reportURL = function (url) {
    var response;
    if (!this.httpRequest) {
        // use the location protocol unless the user specifies otherwise
        if (url.indexOf('//') < 0 || url.indexOf('//') > 8) {
            if (location.protocol === 'file:') {
                // allow requests from locally loaded sources
                url = 'https://' + url;
            } else {
                url = location.protocol + '//' + url;
            }
        }
        this.httpRequest = new XMLHttpRequest();
        this.httpRequest.open("GET", url, true);
        this.httpRequest.send(null);
    } else if (this.httpRequest.readyState === 4) {
        response = this.httpRequest.responseText;
        this.httpRequest = null;
        return response;
    }
    this.pushContext('doYield');
    this.pushContext();
};

// Process event messages primitives

Process.prototype.doBroadcast = function (message) {
    // messages are user-defined events, and by default global, same as in
    // Scratch. An experimental feature, messages can be sent to a single
    // sprite or to a list of sprites by using a 2-item list in the message
    // slot, where the first slot is a message text, and the second slot
    // its recipient(s), identified either by a single name or sprite, or by
    // a list of names or sprites (can be a heterogeneous list).

    var stage = this.homeContext.receiver.parentThatIsA(StageMorph),
        thisObj,
        msg = message,
        trg,
        rcvrs,
        myself = this,
        procs = [];

    if (message instanceof List && (message.length() === 2)) {
        thisObj = this.blockReceiver();
        msg = message.at(1);
        trg = message.at(2);
        if (isSnapObject(trg)) {
            rcvrs = [trg];
        } else if (isString(trg)) {
            // assume the string to be the name of a sprite or the stage
            if (trg === stage.name) {
                rcvrs = [stage];
            } else {
                rcvrs = [this.getOtherObject(trg, thisObj, stage)];
            }
        } else if (trg instanceof List) {
            // assume all elements to be sprites or sprite names
            rcvrs = trg.itemsArray().map(function (each) {
                return myself.getOtherObject(each, thisObj, stage);
            });
        } else {
            return; // abort
        }
    } else { // global
        rcvrs = stage.children.concat(stage);
    }
    if (msg !== '') {
        stage.lastMessage = message; // the actual data structure
        rcvrs.forEach(function (morph) {
            if (isSnapObject(morph)) {
                morph.allHatBlocksFor(msg).forEach(function (block) {
                    procs.push(stage.threads.startProcess(
                        block,
                        morph,
                        stage.isThreadSafe
                    ));
                });
            }
        });
    }
    return procs;
};

Process.prototype.doBroadcastAndWait = function (message) {
    if (!this.context.activeSends) {
        this.context.activeSends = this.doBroadcast(message);
        this.context.activeSends.forEach(function (proc) {
        	// optimize for atomic sub-routines
            proc.runStep();
        });
    }
    this.context.activeSends = this.context.activeSends.filter(
        function (proc) {
            return proc.isRunning();
        }
    );
    if (this.context.activeSends.length === 0) {
        return null;
    }
    this.pushContext('doYield');
    this.pushContext();
};

Process.prototype.getLastMessage = function () {
    var stage;
    if (this.homeContext.receiver) {
        stage = this.homeContext.receiver.parentThatIsA(StageMorph);
        if (stage) {
            return stage.getLastMessage();
        }
    }
    return '';
};

// Process type inference

Process.prototype.reportIsA = function (thing, typeString) {
    return this.reportTypeOf(thing) === this.inputOption(typeString);
};

Process.prototype.assertType = function (thing, typeString) {
    // make sure "thing" is a particular type or any of a number of types
    // and raise an error if not
    // use responsibly wrt performance implications
    var thingType = this.reportTypeOf(thing);
    if (thingType === typeString) {return true; }
    if (typeString instanceof Array && contains(typeString, thingType)) {
        return true;
    }
    throw new Error('expecting ' + typeString + ' but getting ' + thingType);
};

Process.prototype.assertAlive = function (thing) {
    if (thing && thing.isCorpse) {
        throw new Error('cannot operate on a deleted sprite');
    }
};

Process.prototype.reportTypeOf = function (thing) {
    // answer a string denoting the argument's type
    var exp;
    if (thing === null || (thing === undefined)) {
        return 'nothing';
    }
    if (thing === true || (thing === false)) {
        return 'Boolean';
    }
    if (thing instanceof List) {
        return 'list';
    }
    if (!isNaN(+thing)) {
        return 'number';
    }
    if (isString(thing)) {
        return 'text';
    }
    if (thing instanceof SpriteMorph) {
        return 'sprite';
    }
    if (thing instanceof StageMorph) {
        return 'stage';
    }
    if (thing instanceof Costume) {
        return 'costume';
    }
    if (thing instanceof Sound) {
        return 'sound';
    }
    if (thing instanceof Context) {
        if (thing.expression instanceof RingMorph) {
            return thing.expression.dataType();
        }
        if (thing.expression instanceof ReporterBlockMorph) {
            if (thing.expression.isPredicate) {
                return 'predicate';
            }
            return 'reporter';
        }

        if (thing.expression instanceof Array) {
            exp = thing.expression[thing.pc || 0];
            if (exp.isPredicate) {
                return 'predicate';
            }
            if (exp instanceof RingMorph) {
                return exp.dataType();
            }
            if (exp instanceof ReporterBlockMorph) {
                return 'reporter';
            }
            if (exp instanceof CommandBlockMorph) {
                return 'command';
            }
            return 'reporter'; // 'ring';
        }

        if (thing.expression instanceof CommandBlockMorph) {
            return 'command';
        }
        return 'reporter'; // 'ring';
    }
    return 'undefined';
};

// Process math primtives

Process.prototype.reportSum = function (a, b) {
    return +a + (+b);
};

Process.prototype.reportDifference = function (a, b) {
    return +a - +b;
};

Process.prototype.reportProduct = function (a, b) {
    return +a * +b;
};

Process.prototype.reportQuotient = function (a, b) {
    return +a / +b;
};

Process.prototype.reportModulus = function (a, b) {
    var x = +a,
        y = +b;
    return ((x % y) + y) % y;
};

Process.prototype.reportRandom = function (min, max) {
    var floor = +min,
        ceil = +max;
    if ((floor % 1 !== 0) || (ceil % 1 !== 0)) {
        return Math.random() * (ceil - floor) + floor;
    }
    return Math.floor(Math.random() * (ceil - floor + 1)) + floor;
};

Process.prototype.reportLessThan = function (a, b) {
    var x = +a,
        y = +b;
    if (isNaN(x) || isNaN(y)) {
        x = a;
        y = b;
    }
    return x < y;
};

Process.prototype.reportNot = function (bool) {
    return !bool;
};

Process.prototype.reportGreaterThan = function (a, b) {
    var x = +a,
        y = +b;
    if (isNaN(x) || isNaN(y)) {
        x = a;
        y = b;
    }
    return x > y;
};

Process.prototype.reportEquals = function (a, b) {
    return snapEquals(a, b);
};

Process.prototype.reportIsIdentical = function (a, b) {
    var tag = 'idTag';
    if (this.isImmutable(a) || this.isImmutable(b)) {
        return snapEquals(a, b);
    }

    function clear() {
        if (Object.prototype.hasOwnProperty.call(a, tag)) {
            delete a[tag];
        }
        if (Object.prototype.hasOwnProperty.call(b, tag)) {
            delete b[tag];
        }
    }

    clear();
    a[tag] = Date.now();
    if (b[tag] === a[tag]) {
        clear();
        return true;
    }
    clear();
    return false;
};

Process.prototype.isImmutable = function (obj) {
    // private
    var type = this.reportTypeOf(obj);
    return type === 'nothing' ||
        type === 'Boolean' ||
        type === 'text' ||
        type === 'number' ||
        type === 'undefined';
};

Process.prototype.reportBoolean = function (bool) {
    return bool;
};

Process.prototype.reportRound = function (n) {
    return Math.round(+n);
};

Process.prototype.reportMonadic = function (fname, n) {
    var x = +n,
        result = 0;

    switch (this.inputOption(fname)) {
    case 'abs':
        result = Math.abs(x);
        break;
    case 'ceiling':
        result = Math.ceil(x);
        break;
    case 'floor':
        result = Math.floor(x);
        break;
    case 'sqrt':
        result = Math.sqrt(x);
        break;
    case 'sin':
        result = Math.sin(radians(x));
        break;
    case 'cos':
        result = Math.cos(radians(x));
        break;
    case 'tan':
        result = Math.tan(radians(x));
        break;
    case 'asin':
        result = degrees(Math.asin(x));
        break;
    case 'acos':
        result = degrees(Math.acos(x));
        break;
    case 'atan':
        result = degrees(Math.atan(x));
        break;
    case 'ln':
        result = Math.log(x);
        break;
    case 'log': // base 10
        result =  Math.log(x) / Math.LN10;
        break;
    case 'e^':
        result = Math.exp(x);
        break;
    case '10^':
        result = Math.pow(10, x);
        break;
    default:
        nop();
    }
    return result;
};

Process.prototype.reportTextFunction = function (fname, string) {
    var x = (isNil(string) ? '' : string).toString(),
        result = '';

    switch (this.inputOption(fname)) {
    case 'encode URI':
        result = encodeURI(x);
        break;
    case 'decode URI':
        result = decodeURI(x);
        break;
    case 'encode URI component':
        result = encodeURIComponent(x);
        break;
    case 'decode URI component':
        result = decodeURIComponent(x);
        break;
    case 'XML escape':
        result = new XML_Element().escape(x);
        break;
    case 'XML unescape':
        result = new XML_Element().unescape(x);
        break;
    case 'hex sha512 hash':
        result = hex_sha512(x);
        break;
    default:
        nop();
    }
    return result;
};

Process.prototype.reportJoin = function (a, b) {
    var x = (isNil(a) ? '' : a).toString(),
        y = (isNil(b) ? '' : b).toString();
    return x.concat(y);
};

Process.prototype.reportJoinWords = function (aList) {
    if (aList instanceof List) {
        return aList.asText();
    }
    return (aList || '').toString();
};

// Process string ops

Process.prototype.reportLetter = function (idx, string) {
    if (string instanceof List) { // catch a common user error
        return '';
    }
    var i = +(idx || 0),
        str = isNil(string) ? '' : string.toString();
    return str[i - 1] || '';
};

Process.prototype.reportStringSize = function (data) {
    if (data instanceof List) { // catch a common user error
        return data.length();
    }

    return isNil(data) ? 0 : data.toString().length;
};

Process.prototype.reportUnicode = function (string) {
    var str = isNil(string) ? '\u0000' : string.toString();

    if (str.codePointAt) { // support for Unicode in newer browsers.
        return str.codePointAt(0);
    }
    return str.charCodeAt(0);
};

Process.prototype.reportUnicodeAsLetter = function (num) {
    var code = +(num || 0);

    if (String.fromCodePoint) { // support for Unicode in newer browsers.
        return String.fromCodePoint(code);
    }
    return String.fromCharCode(code);
};

Process.prototype.reportTextSplit = function (string, delimiter) {
    var types = ['text', 'number'],
        strType = this.reportTypeOf(string),
        delType = this.reportTypeOf(this.inputOption(delimiter)),
        str,
        del;
    if (!contains(types, strType)) {
        throw new Error('expecting text instead of a ' + strType);
    }
    if (!contains(types, delType)) {
        throw new Error('expecting a text delimiter instead of a ' + delType);
    }
    str = isNil(string) ? '' : string.toString();
    switch (this.inputOption(delimiter)) {
    case 'line':
        // Unicode compliant line splitting (platform independent)
        // http://www.unicode.org/reports/tr18/#Line_Boundaries
        del = /\r\n|[\n\v\f\r\x85\u2028\u2029]/;
        break;
    case 'tab':
        del = '\t';
        break;
    case 'cr':
        del = '\r';
        break;
    case 'whitespace':
        str = str.trim();
        del = /\s+/;
        break;
    case 'letter':
        del = '';
        break;
    case 'csv':
        return this.parseCSV(string);
    default:
        del = isNil(delimiter) ? '' : delimiter.toString();
    }
    return new List(str.split(del));
};

Process.prototype.parseCSV = function (string) {
    // parse a single row of CSV data into a one-dimensional list
    // this assumes that the whole csv data has already been split
    // by lines.
    // taken from:
    // https://stackoverflow.com/questions/8493195/how-can-i-parse-a-csv-string-with-javascript-which-contains-comma-in-data

    var re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/,
        re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g,
        a = [];

    if (!re_valid.test(string)) {
        return new List();
    }
    string.replace(
        re_value,
        function(m0, m1, m2, m3) {
            if (m1 !== undefined) {
                // remove backslash from \' in single quoted values.
                a.push(m1.replace(/\\'/g, "'"));
            } else if (m2 !== undefined) {
                // remove backslash from \" in double quoted values.
                a.push(m2.replace(/\\"/g, '"'));
            } else if (m3 !== undefined) {
                a.push(m3);
            }
            return '';
        }
    );
    // special case: empty last value.
    if (/,\s*$/.test(string)) {
        a.push('');
    }
    return new List(a);
};

// Process debugging

Process.prototype.alert = function (data) {
    // debugging primitives only work in dev mode, otherwise they're nop
    var world;
    if (this.homeContext.receiver) {
        world = this.homeContext.receiver.world();
        if (world.isDevMode) {
            alert('Snap! ' + data.asArray());
        }
    }
};

Process.prototype.log = function (data) {
    // debugging primitives only work in dev mode, otherwise they're nop
    var world;
    if (this.homeContext.receiver) {
        world = this.homeContext.receiver.world();
        if (world.isDevMode) {
            console.log('Snap! ' + data.asArray());
        }
    }
};

// Process motion primitives

Process.prototype.getOtherObject = function (name, thisObj, stageObj) {
    // private, find the sprite indicated by the given name
    // either onstage or in the World's hand

    // experimental: deal with first-class sprites
    if (isSnapObject(name)) {
        return name;
    }

    var stage = isNil(stageObj) ?
                thisObj.parentThatIsA(StageMorph) : stageObj,
        thatObj = null;

    if (stage) {
        // find the corresponding sprite on the stage
        thatObj = detect(
            stage.children,
            function (morph) {return morph.name === name; }
        );
        if (!thatObj) {
            // check if the sprite in question is currently being
            // dragged around
            thatObj = detect(
                stage.world().hand.children,
                function (morph) {
                    return morph instanceof SpriteMorph
                        && morph.name === name;
                }
            );
        }
    }
    return thatObj;
};

Process.prototype.getObjectsNamed = function (name, thisObj, stageObj) {
    // private, find all sprites and their clones indicated
    // by the given name either onstage or in the World's hand

    var stage = isNil(stageObj) ?
                thisObj.parentThatIsA(StageMorph) : stageObj,
        those = [];

    function check(obj) {
        return obj instanceof SpriteMorph && obj.isTemporary ?
                obj.cloneOriginName === name : obj.name === name;
    }

    if (stage) {
        // find the corresponding sprite on the stage
        those = stage.children.filter(check);
        if (!those.length) {
            // check if a sprite in question is currently being
            // dragged around
            those = stage.world().hand.children.filter(check);
        }
    }
    return those;
};

Process.prototype.setHeading = function (direction) {
    var thisObj = this.blockReceiver();

    if (thisObj) {
        if (this.inputOption(direction) === 'random') {
            direction = this.reportRandom(1, 36000) / 100;
        }
		thisObj.setHeading(direction);
    }
};

Process.prototype.doFaceTowards = function (name) {
    var thisObj = this.blockReceiver(),
        thatObj;

    if (thisObj) {
        if (this.inputOption(name) === 'mouse-pointer') {
            thisObj.faceToXY(this.reportMouseX(), this.reportMouseY());
        } if (this.inputOption(name) === 'random position') {
        	thisObj.setHeading(this.reportRandom(1, 36000) / 100);
        } else {
            if (name instanceof List) {
                thisObj.faceToXY(
                    name.at(1),
                    name.at(2)
                );
                return;
            }
            thatObj = this.getOtherObject(name, this.homeContext.receiver);
            if (thatObj) {
                thisObj.faceToXY(
                    thatObj.xPosition(),
                    thatObj.yPosition()
                );
            }
        }
    }
};

Process.prototype.doGotoObject = function (name) {
    var thisObj = this.blockReceiver(),
        thatObj,
        stage;

    if (thisObj) {
        if (this.inputOption(name) === 'mouse-pointer') {
            thisObj.gotoXY(this.reportMouseX(), this.reportMouseY());
        } else if (this.inputOption(name) === 'random position') {
	        stage = thisObj.parentThatIsA(StageMorph);
    	    if (stage) {
         		thisObj.setCenter(new Point(
					this.reportRandom(stage.left(), stage.right()),
                    this.reportRandom(stage.top(), stage.bottom())
                ));
         	}
        } else {
            if (name instanceof List) {
                thisObj.gotoXY(
                    name.at(1),
                    name.at(2)
                );
                return;
            }
            thatObj = this.getOtherObject(name, this.homeContext.receiver);
            if (thatObj) {
                thisObj.gotoXY(
                    thatObj.xPosition(),
                    thatObj.yPosition()
                );
            }
        }
    }
};

// Process temporary cloning (Scratch-style)

Process.prototype.createClone = function (name) {
    var thisObj = this.blockReceiver(),
        thatObj;

    if (!name) {return; }
    if (thisObj) {
        if (this.inputOption(name) === 'myself') {
            thisObj.createClone(!this.isFirstStep);
        } else {
            thatObj = this.getOtherObject(name, thisObj);
            if (thatObj) {
                thatObj.createClone(!this.isFirstStep);
            }
        }
    }
};

Process.prototype.newClone = function (name) {
    var thisObj = this.blockReceiver(),
        thatObj;

    if (!name) {return; }
    if (thisObj) {
        if (this.inputOption(name) === 'myself') {
            return thisObj.newClone(!this.isFirstStep);
        }
        thatObj = this.getOtherObject(name, thisObj);
        if (thatObj) {
            return thatObj.newClone(!this.isFirstStep);
        }
    }
};

// Process sensing primitives

Process.prototype.reportTouchingObject = function (name) {
    var thisObj = this.blockReceiver();

    if (thisObj) {
        return this.objectTouchingObject(thisObj, name);
    }
    return false;
};

Process.prototype.objectTouchingObject = function (thisObj, name) {
    // helper function for reportTouchingObject()
    // also check for temparary clones, as in Scratch 2.0,
    // and for any parts (subsprites)
    var myself = this,
        those,
        stage,
        box,
        mouse;

    if (this.inputOption(name) === 'mouse-pointer') {
        mouse = thisObj.world().hand.position();
        if (thisObj.bounds.containsPoint(mouse) &&
                !thisObj.isTransparentAt(mouse)) {
            return true;
        }
    } else {
        stage = thisObj.parentThatIsA(StageMorph);
        if (stage) {
            if (this.inputOption(name) === 'edge') {
                box = thisObj.bounds;
                if (!thisObj.costume && thisObj.penBounds) {
                    box = thisObj.penBounds.translateBy(thisObj.position());
                }
                if (!stage.bounds.containsRectangle(box)) {
                    return true;
                }
            }
            if (this.inputOption(name) === 'pen trails' &&
                    thisObj.isTouching(stage.penTrailsMorph())) {
                return true;
            }
            if (isSnapObject(name)) {
                return thisObj.isTouching(name);
            }
            if (name instanceof List) { // assume all elements to be sprites
                those = name.itemsArray();
            } else {
                those = this.getObjectsNamed(name, thisObj, stage); // clones
            }
            if (those.some(function (any) {
                    return thisObj.isTouching(any);
                })) {
                return true;
            }
        }
    }
    return thisObj.parts.some(
        function (any) {
            return myself.objectTouchingObject(any, name);
        }
    );
};

Process.prototype.reportTouchingColor = function (aColor) {
    // also check for any parts (subsprites)
    var thisObj = this.blockReceiver(),
        stage;

    if (thisObj) {
        stage = thisObj.parentThatIsA(StageMorph);
        if (stage) {
            if (thisObj.isTouching(stage.colorFiltered(aColor, thisObj))) {
                return true;
            }
            return thisObj.parts.some(
                function (any) {
                    return any.isTouching(stage.colorFiltered(aColor, any));
                }
            );
        }
    }
    return false;
};

Process.prototype.reportColorIsTouchingColor = function (color1, color2) {
    // also check for any parts (subsprites)
    var thisObj = this.blockReceiver(),
        stage;

    if (thisObj) {
        stage = thisObj.parentThatIsA(StageMorph);
        if (stage) {
            if (thisObj.colorFiltered(color1).isTouching(
                    stage.colorFiltered(color2, thisObj)
                )) {
                return true;
            }
            return thisObj.parts.some(
                function (any) {
                    return any.colorFiltered(color1).isTouching(
                        stage.colorFiltered(color2, any)
                    );
                }
            );
        }
    }
    return false;
};

Process.prototype.reportRelationTo = function (relation, name) {
	var rel = this.inputOption(relation);
 	if (rel === 'distance') {
  		return this.reportDistanceTo(name);
  	}
    if (rel === 'direction') {
    	return this.reportDirectionTo(name);
    }
    return 0;
};

Process.prototype.reportDistanceTo = function (name) {
    var thisObj = this.blockReceiver(),
        thatObj,
        stage,
        rc,
        point;

    if (thisObj) {
        rc = thisObj.rotationCenter();
        point = rc;
        if (this.inputOption(name) === 'mouse-pointer') {
            point = thisObj.world().hand.position();
        } else if (name instanceof List) {
            return new Point(thisObj.xPosition(), thisObj.yPosition())
                .distanceTo(new Point(name.at(1), name.at(2)));
        }
        stage = thisObj.parentThatIsA(StageMorph);
        thatObj = this.getOtherObject(name, thisObj, stage);
        if (thatObj) {
            point = thatObj.rotationCenter();
        }
        return rc.distanceTo(point) / stage.scale;
    }
    return 0;
};

Process.prototype.reportDirectionTo = function (name) {
    var thisObj = this.blockReceiver(),
        thatObj;

    if (thisObj) {
        if (this.inputOption(name) === 'mouse-pointer') {
            return thisObj.angleToXY(this.reportMouseX(), this.reportMouseY());
        }
        if (name instanceof List) {
            return thisObj.angleToXY(
                name.at(1),
                name.at(2)
            );
        }
        thatObj = this.getOtherObject(name, this.homeContext.receiver);
        if (thatObj) {
            return thisObj.angleToXY(
                thatObj.xPosition(),
                thatObj.yPosition()
            );
        }
        return thisObj.direction();
    }
    return 0;
};

Process.prototype.reportAttributeOf = function (attribute, name) {
    var thisObj = this.blockReceiver(),
        thatObj,
        stage;

    if (thisObj) {
        this.assertAlive(thisObj);
        stage = thisObj.parentThatIsA(StageMorph);
        if (stage.name === name) {
            thatObj = stage;
        } else {
            thatObj = this.getOtherObject(name, thisObj, stage);
        }
        if (thatObj) {
            this.assertAlive(thatObj);
            if (attribute instanceof BlockMorph) { // a "wish"
            	return this.reportContextFor(
             	   this.reify(
                		thatObj.getMethod(attribute.semanticSpec)
                        	.blockInstance(),
                		new List()
                	),
                 	thatObj
                );
            }
            if (attribute instanceof Context) {
                return this.reportContextFor(attribute, thatObj);
            }
            if (isString(attribute)) {
                return thatObj.variables.getVar(attribute);
            }
            switch (this.inputOption(attribute)) {
            case 'x position':
                return thatObj.xPosition ? thatObj.xPosition() : '';
            case 'y position':
                return thatObj.yPosition ? thatObj.yPosition() : '';
            case 'direction':
                return thatObj.direction ? thatObj.direction() : '';
            case 'costume #':
                return thatObj.getCostumeIdx();
            case 'costume name':
                return thatObj.costume ? thatObj.costume.name
                        : thatObj instanceof SpriteMorph ? localize('Turtle')
                                : localize('Empty');
            case 'size':
                return thatObj.getScale ? thatObj.getScale() : '';
            }
        }
    }
    return '';
};

Process.prototype.reportGet = function (query) {
    // experimental, answer a reference to a first-class member
    // or a list of first-class members
    var thisObj = this.blockReceiver(),
        neighborhood,
        stage,
        objName;

    if (thisObj) {
        switch (this.inputOption(query)) {
        case 'self' :
            return thisObj;
        case 'other sprites':
            stage = thisObj.parentThatIsA(StageMorph);
            return new List(
                stage.children.filter(function (each) {
                    return each instanceof SpriteMorph &&
                        each !== thisObj;
                })
            );
        case 'parts':
            return new List(thisObj.parts || []);
        case 'anchor':
            return thisObj.anchor || '';
        case 'parent':
            return thisObj.exemplar || '';
        case 'children':
            return new List(thisObj.specimens ? thisObj.specimens() : []);
        case 'temporary?':
            return thisObj.isTemporary || false;
        case 'clones':
            stage = thisObj.parentThatIsA(StageMorph);
            objName = thisObj.name || thisObj.cloneOriginName;
            return new List(
                stage.children.filter(function (each) {
                    return each.isTemporary &&
                        (each !== thisObj) &&
                        (each.cloneOriginName === objName);
                })
            );
        case 'other clones':
            return thisObj.isTemporary ?
                    this.reportGet(['clones']) : new List();
        case 'neighbors':
            stage = thisObj.parentThatIsA(StageMorph);
            neighborhood = thisObj.bounds.expandBy(new Point(
                thisObj.width(),
                thisObj.height()
            ));
            return new List(
                stage.children.filter(function (each) {
                    return each instanceof SpriteMorph &&
                        (each !== thisObj) &&
                        each.bounds.intersects(neighborhood);
                })
            );
        case 'dangling?':
            return !thisObj.rotatesWithAnchor;
        case 'rotation x':
            return thisObj.xPosition();
        case 'rotation y':
            return thisObj.yPosition();
        case 'center x':
            return thisObj.xCenter();
        case 'center y':
            return thisObj.yCenter();
        case 'name':
            return thisObj.name;
        case 'stage':
            return thisObj.parentThatIsA(StageMorph);
        case 'costumes':
            return thisObj.reportCostumes();
        case 'sounds':
            return thisObj.sounds;
        }
    }
    return '';
};

Process.prototype.doSet = function (attribute, value) {
    // experimental, manipulate sprites' attributes
    var name, rcvr;
    if (!(attribute instanceof Context)) {
        return;
    }
    rcvr = this.blockReceiver();
    this.assertAlive(rcvr);
    if (!(attribute instanceof Context) ||
            attribute.expression.selector !== 'reportGet') {
        throw new Error(localize('unsupported attribute'));
    }
    name = attribute.expression.inputs()[0].evaluate();
    if (name instanceof Array) {
        name = name[0];
    }
    switch (name) {
    case 'anchor':
        this.assertType(rcvr, 'sprite');
        if (value instanceof SpriteMorph) {
            // avoid circularity here, because the GUI already checks for
            // conflicts while the user drags parts over prospective targets
            if (!rcvr.enableNesting || contains(rcvr.allParts(), value)) {
                throw new Error(
                    localize('unable to nest\n(disabled or circular?)')
                );
            }
            value.attachPart(rcvr);
        } else {
            rcvr.detachFromAnchor();
        }
        break;
    case 'parent':
        this.assertType(rcvr, 'sprite');
        value = value instanceof SpriteMorph ? value : null;
        // needed: circularity avoidance
        rcvr.setExemplar(value);
        break;
    case 'temporary?':
        this.assertType(rcvr, 'sprite');
        this.assertType(value, 'Boolean');
        if (rcvr.world().isDevMode) {
            if (value) {
                rcvr.release();
            } else {
                rcvr.perpetuate();
            }
        }
        break;
    case 'dangling?':
        this.assertType(rcvr, 'sprite');
        this.assertType(value, 'Boolean');
        rcvr.rotatesWithAnchor = !value;
        rcvr.version = Date.now();
        break;
    case 'rotation x':
        this.assertType(rcvr, 'sprite');
        this.assertType(value, 'number');
        rcvr.setRotationX(value);
        break;
    case 'rotation y':
        this.assertType(rcvr, 'sprite');
        this.assertType(value, 'number');
        rcvr.setRotationY(value);
        break;
    default:
        throw new Error(
            '"' + localize(name) + '" ' + localize('is read-only')
        );
    }
};

Process.prototype.reportContextFor = function (context, otherObj) {
    // Private - return a copy of the context
    // and bind it to another receiver
    var result = copy(context);
    result.receiver = otherObj;
    if (result.outerContext) {
        result.outerContext = copy(result.outerContext);
        result.outerContext.variables = copy(result.outerContext.variables);
        result.outerContext.receiver = otherObj;
        result.outerContext.variables.parentFrame = otherObj.variables;
    }
    return result;
};

Process.prototype.reportMouseX = function () {
    var stage, world;
    if (this.homeContext.receiver) {
        stage = this.homeContext.receiver.parentThatIsA(StageMorph);
        if (stage) {
            world = stage.world();
            if (world) {
                return (world.hand.position().x - stage.center().x)
                    / stage.scale;
            }
        }
    }
    return 0;
};

Process.prototype.reportMouseY = function () {
    var stage, world;
    if (this.homeContext.receiver) {
        stage = this.homeContext.receiver.parentThatIsA(StageMorph);
        if (stage) {
            world = stage.world();
            if (world) {
                return (stage.center().y - world.hand.position().y)
                    / stage.scale;
            }
        }
    }
    return 0;
};

Process.prototype.reportMouseDown = function () {
    var world;
    if (this.homeContext.receiver) {
        world = this.homeContext.receiver.world();
        if (world) {
            return world.hand.mouseButton === 'left';
        }
    }
    return false;
};

Process.prototype.reportKeyPressed = function (keyString) {
    var stage;
    if (this.homeContext.receiver) {
        stage = this.homeContext.receiver.parentThatIsA(StageMorph);
        if (stage) {
            if (this.inputOption(keyString) === 'any key') {
                return Object.keys(stage.keysPressed).length > 0;
            }
            return stage.keysPressed[keyString] !== undefined;
        }
    }
    return false;
};

Process.prototype.doResetTimer = function () {
    var stage;
    if (this.homeContext.receiver) {
        stage = this.homeContext.receiver.parentThatIsA(StageMorph);
        if (stage) {
            stage.resetTimer();
        }
    }
};

Process.prototype.reportTimer = function () {
    var stage;
    if (this.homeContext.receiver) {
        stage = this.homeContext.receiver.parentThatIsA(StageMorph);
        if (stage) {
            return stage.getTimer();
        }
    }
    return 0;
};

// Process Dates and times in Snap
Process.prototype.reportDate = function (datefn) {
    var currDate, func, result,
        inputFn = this.inputOption(datefn),
        // Map block options to built-in functions
        dateMap = {
            'year' : 'getFullYear',
            'month' : 'getMonth',
            'date': 'getDate',
            'day of week' : 'getDay',
            'hour' : 'getHours',
            'minute' : 'getMinutes',
            'second' : 'getSeconds',
            'time in milliseconds' : 'getTime'
        };

    if (!dateMap[inputFn]) { return ''; }
    currDate = new Date();
    func = dateMap[inputFn];
    result = currDate[func]();

    // Show months as 1-12 and days as 1-7
    if (inputFn === 'month' || inputFn === 'day of week') {
        result += 1;
    }
    return result;
};

// Process code mapping

/*
    for generating textual source code using
    blocks - not needed to run or debug Snap
*/

Process.prototype.doMapCodeOrHeader = function (aContext, anOption, aString) {
    if (this.inputOption(anOption) === 'code') {
        return this.doMapCode(aContext, aString);
    }
    if (this.inputOption(anOption) === 'header') {
        return this.doMapHeader(aContext, aString);
    }
    throw new Error(
        ' \'' + anOption + '\'\nis not a valid option'
    );
};

Process.prototype.doMapHeader = function (aContext, aString) {
    if (aContext instanceof Context) {
        if (aContext.expression instanceof SyntaxElementMorph) {
            return aContext.expression.mapHeader(aString || '');
        }
    }
};

Process.prototype.doMapCode = function (aContext, aString) {
    if (aContext instanceof Context) {
        if (aContext.expression instanceof SyntaxElementMorph) {
            return aContext.expression.mapCode(aString || '');
        }
    }
};

Process.prototype.doMapValueCode = function (type, aString) {
    var tp = this.inputOption(type);
    switch (tp) {
    case 'String':
        StageMorph.prototype.codeMappings.string = aString || '<#1>';
        break;
    case 'Number':
        StageMorph.prototype.codeMappings.number = aString || '<#1>';
        break;
    case 'true':
        StageMorph.prototype.codeMappings.boolTrue = aString || 'true';
        break;
    case 'false':
        StageMorph.prototype.codeMappings.boolFalse = aString || 'true';
        break;
    default:
        throw new Error(
            localize('unsupported data type') + ' ' + tp
        );
    }

};

Process.prototype.doMapListCode = function (part, kind, aString) {
    var key1 = '',
        key2 = 'delim';

    if (this.inputOption(kind) === 'parameters') {
        key1 = 'parms_';
    } else if (this.inputOption(kind) === 'variables') {
        key1 = 'tempvars_';
    }

    if (this.inputOption(part) === 'list') {
        key2 = 'list';
    } else if (this.inputOption(part) === 'item') {
        key2 = 'item';
    }

    StageMorph.prototype.codeMappings[key1 + key2] = aString || '';
};

Process.prototype.reportMappedCode = function (aContext) {
    if (aContext instanceof Context) {
        if (aContext.expression instanceof SyntaxElementMorph) {
            return aContext.expression.mappedCode();
        }
    }
    return '';
};

// Process music primitives

Process.prototype.doRest = function (beats) {
    var tempo = this.reportTempo();
    this.doWait(60 / tempo * beats);
};

Process.prototype.reportTempo = function () {
    var stage;
    if (this.homeContext.receiver) {
        stage = this.homeContext.receiver.parentThatIsA(StageMorph);
        if (stage) {
            return stage.getTempo();
        }
    }
    return 0;
};

Process.prototype.doChangeTempo = function (delta) {
    var stage;
    if (this.homeContext.receiver) {
        stage = this.homeContext.receiver.parentThatIsA(StageMorph);
        if (stage) {
            stage.changeTempo(delta);
        }
    }
};

Process.prototype.doSetTempo = function (bpm) {
    var stage;
    if (this.homeContext.receiver) {
        stage = this.homeContext.receiver.parentThatIsA(StageMorph);
        if (stage) {
            stage.setTempo(bpm);
        }
    }
};

Process.prototype.doPlayNote = function (pitch, beats) {
    var tempo = this.reportTempo();
    this.doPlayNoteForSecs(
        parseFloat(pitch || '0'),
        60 / tempo * parseFloat(beats || '0')
    );
};

Process.prototype.doPlayNoteForSecs = function (pitch, secs) {
    // interpolated
    if (!this.context.startTime) {
        this.context.startTime = Date.now();
        this.context.activeNote = new Note(pitch);
        this.context.activeNote.play(this.instrument);
    }
    if ((Date.now() - this.context.startTime) >= (secs * 1000)) {
        if (this.context.activeNote) {
            this.context.activeNote.stop();
            this.context.activeNote = null;
        }
        return null;
    }
    this.pushContext('doYield');
    this.pushContext();
};

Process.prototype.doSetInstrument = function (num) {
    this.instrument = +num;
    this.receiver.instrument = +num;
};

// Process constant input options

Process.prototype.inputOption = function (dta) {
    // private - for localization
    return dta instanceof Array ? dta[0] : dta;
};

// Process stack

Process.prototype.pushContext = function (expression, outerContext) {
    this.context = new Context(
        this.context,
        expression,
        outerContext || (this.context ? this.context.outerContext : null),
            // for tail call elimination
        this.context ? // check needed due to tail call elimination
                this.context.receiver : this.homeContext.receiver
    );
};

Process.prototype.popContext = function () {
    if (this.context) {
        this.context.stopMusic();
    }
    this.context = this.context ? this.context.parentContext : null;
};

Process.prototype.returnValueToParentContext = function (value) {
    // if no parent context exists treat value as result
    if (value !== undefined) {
        var target = this.context ? // in case of tail call elimination
                this.context.parentContext || this.homeContext
            : this.homeContext;
        target.addInput(value);
    }
};

Process.prototype.reportStackSize = function () {
    return this.context ? this.context.stackSize() : 0;
};

Process.prototype.reportFrameCount = function () {
    return this.frameCount;
};

// Process single-stepping

Process.prototype.flashContext = function () {
    var expr = this.context.expression;
    if (this.enableSingleStepping &&
            !this.isAtomic &&
            expr instanceof SyntaxElementMorph &&
            !(expr instanceof CommandSlotMorph) &&
            !this.context.isFlashing &&
            expr.world() &&
            !(expr instanceof ColorSlotMorph)) {
        this.unflash();
        expr.flash();
        this.context.isFlashing = true;
        this.flashingContext = this.context;
        if (this.flashTime > 0 && (this.flashTime <= 0.5)) {
            this.pushContext('doIdle');
            this.context.addInput(this.flashTime);
        } else {
            this.pushContext('doInterrupt');
        }
        return true;
    }
    return false;
};

Process.prototype.flashPausedContext = function () {
    var flashable = this.context ? this.context.lastFlashable() : null;
    if (flashable) {
        this.unflash();
        flashable.expression.flash();
        flashable.isFlashing = true;
        this.flashingContext = flashable;
    }
};

Process.prototype.doInterrupt = function () {
    this.popContext();
    if (!this.isAtomic) {
        this.isInterrupted = true;
    }
};

Process.prototype.doIdle = function (secs) {
    if (!this.context.startTime) {
        this.context.startTime = Date.now();
    }
    if ((Date.now() - this.context.startTime) < (secs * 1000)) {
        this.pushContext('doInterrupt');
        return;
    }
    this.popContext();
};

Process.prototype.unflash = function () {
    if (this.flashingContext) {
        this.flashingContext.expression.unflash();
        this.flashingContext.isFlashing = false;
        this.flashingContext = null;
    }
};

// Context /////////////////////////////////////////////////////////////

/*
    A Context describes the state of a Process.

    Each Process has a pointer to a Context containing its
    state. Whenever the Process yields control, its Context
    tells it exactly where it left off.

    structure:

    parentContext   the Context to return to when this one has
                    been evaluated.
    outerContext    the Context holding my lexical scope
    expression      SyntaxElementMorph, an array of blocks to evaluate,
                    null or a String denoting a selector, e.g. 'doYield'
    origin          the object of origin, only used for serialization
    receiver        the object to which the expression applies, if any
    variables       the current VariableFrame, if any
    inputs          an array of input values computed so far
                    (if expression is a    BlockMorph)
    pc              the index of the next block to evaluate
                    (if expression is an array)
    isContinuation  flag for marking a transient continuation context
    startTime       time when the context was first evaluated
    startValue      initial value for interpolated operations
    activeAudio     audio buffer for interpolated operations, don't persist
    activeNote      audio oscillator for interpolated ops, don't persist
    activeSends		forked processes waiting to be completed
    isCustomBlock   marker for return ops
    emptySlots      caches the number of empty slots for reification
    tag             string or number to optionally identify the Context,
                    as a "return" target (for the "stop block" primitive)
    isFlashing      flag for single-stepping
*/

function Context(
    parentContext,
    expression,
    outerContext,
    receiver
) {
    this.outerContext = outerContext || null;
    this.parentContext = parentContext || null;
    this.expression = expression || null;
    this.receiver = receiver || null;
    this.origin = receiver || null; // only for serialization
    this.variables = new VariableFrame();
    if (this.outerContext) {
        this.variables.parentFrame = this.outerContext.variables;
        this.receiver = this.outerContext.receiver;
    }
    this.inputs = [];
    this.pc = 0;
    this.isContinuation = false;
    this.startTime = null;
    this.activeSends = null;
    this.activeAudio = null;
    this.activeNote = null;
    this.isCustomBlock = false; // marks the end of a custom block's stack
    this.emptySlots = 0; // used for block reification
    this.tag = null;  // lexical catch-tag for custom blocks
    this.isFlashing = false; // for single-stepping
}

Context.prototype.toString = function () {
    var expr = this.expression;
    if (expr instanceof Array) {
        if (expr.length > 0) {
            expr = '[' + expr[0] + ']';
        }
    }
    return 'Context >> ' + expr + ' ' + this.variables;
};

Context.prototype.image = function () {
    var ring = new RingMorph(),
        block,
        cont;

    if (this.expression instanceof Morph) {
        block = this.expression.fullCopy();

        // replace marked call/cc block with empty slot
        if (this.isContinuation) {
            cont = detect(block.allInputs(), function (inp) {
                return inp.bindingID === 1;
            });
            if (cont) {
                block.revertToDefaultInput(cont, true);
            }
        }
        ring.embed(block, this.inputs);
        return ring.fullImage();
    }
    if (this.expression instanceof Array) {
        block = this.expression[this.pc].fullCopy();
        if (block instanceof RingMorph && !block.contents()) { // empty ring
            return block.fullImage();
        }
        ring.embed(block, this.isContinuation ? [] : this.inputs);
        return ring.fullImage();
    }

    // otherwise show an empty ring
    ring.color = SpriteMorph.prototype.blockColor.other;
    ring.setSpec('%rc %ringparms');

    // also show my inputs, unless I'm a continuation
    if (!this.isContinuation) {
        this.inputs.forEach(function (inp) {
            ring.parts()[1].addInput(inp);
        });
    }
    return ring.fullImage();
};

// Context continuations:

Context.prototype.continuation = function () {
    var cont;
    if (this.expression instanceof Array) {
        cont = this;
    } else if (this.parentContext) {
        cont = this.parentContext;
    } else {
        cont = new Context(null, 'expectReport');
        cont.isContinuation = true;
        return cont;
    }
    cont = cont.copyForContinuation();
    cont.tag = null;
    cont.isContinuation = true;
    return cont;
};

Context.prototype.copyForContinuation = function () {
    var cpy = copy(this),
        cur = cpy,
        isReporter = !(this.expression instanceof Array ||
            isString(this.expression));
    if (isReporter) {
        cur.prepareContinuationForBinding();
        while (cur.parentContext) {
            cur.parentContext = copy(cur.parentContext);
            cur = cur.parentContext;
            cur.inputs = [];
        }
    }
    return cpy;
};

Context.prototype.copyForContinuationCall = function () {
    var cpy = copy(this),
        cur = cpy,
        isReporter = !(this.expression instanceof Array ||
            isString(this.expression));
    if (isReporter) {
        this.expression = this.expression.fullCopy();
        this.inputs = [];
        while (cur.parentContext) {
            cur.parentContext = copy(cur.parentContext);
            cur = cur.parentContext;
            cur.inputs = [];
        }
    }
    return cpy;
};

Context.prototype.prepareContinuationForBinding = function () {
    var pos = this.inputs.length,
        slot;
    this.expression = this.expression.fullCopy();
    slot = this.expression.inputs()[pos];
    if (slot) {
        this.inputs = [];
        // mark slot containing the call/cc reporter with an identifier
        slot.bindingID = 1;
        // and remember the number of detected empty slots
        this.emptySlots = 1;
    }
};

// Context accessing:

Context.prototype.addInput = function (input) {
    this.inputs.push(input);
};

// Context music

Context.prototype.stopMusic = function () {
    if (this.activeNote) {
        this.activeNote.stop();
        this.activeNote = null;
    }
};

// Context single-stepping:

Context.prototype.lastFlashable = function () {
    // for experimental single-stepping when pausing
    if (this.expression instanceof SyntaxElementMorph &&
            !(this.expression instanceof CommandSlotMorph)) {
        return this;
    } else if (this.parentContext) {
        return this.parentContext.lastFlashable();
    }
    return null;
};

// Context debugging

Context.prototype.stackSize = function () {
    if (!this.parentContext) {
        return 1;
    }
    return 1 + this.parentContext.stackSize();
};

// Variable /////////////////////////////////////////////////////////////////

function Variable(value, isTransient) {
    this.value = value;
    this.isTransient = isTransient || false; // prevent value serialization
}

Variable.prototype.toString = function () {
    return 'a ' + (this.isTransient ? 'transient ' : '') + 'Variable [' +
        this.value + ']';
};

Variable.prototype.copy = function () {
    return new Variable(this.value, this.isTransient);
};

// VariableFrame ///////////////////////////////////////////////////////

function VariableFrame(parentFrame, owner) {
    this.vars = {};
    this.parentFrame = parentFrame || null;
    this.owner = owner || null;
}

VariableFrame.prototype.toString = function () {
    return 'a VariableFrame {' + this.names() + '}';
};

VariableFrame.prototype.copy = function () {
    var frame = new VariableFrame(this.parentFrame),
        myself = this;
    this.names().forEach(function (vName) {
        frame.addVar(vName, myself.getVar(vName));
    });
    return frame;
};

VariableFrame.prototype.deepCopy = function () {
    // currently unused
    var frame;
    if (this.parentFrame) {
        frame = new VariableFrame(this.parentFrame.deepCopy());
    } else {
        frame = new VariableFrame(this.parentFrame);
    }
    frame.vars = copy(this.vars);
    return frame;
};

VariableFrame.prototype.find = function (name) {
/*
    answer the closest variable frame containing
    the specified variable. otherwise throw an exception.
*/
    var frame = this.silentFind(name);
    if (frame) {return frame; }
    throw new Error(
        localize('a variable of name \'')
            + name
            + localize('\'\ndoes not exist in this context')
    );
};

VariableFrame.prototype.silentFind = function (name) {
/*
    answer the closest variable frame containing
    the specified variable. Otherwise return null.
*/
    if (this.vars[name] !== undefined) {
        return this;
    }
    if (this.parentFrame) {
        return this.parentFrame.silentFind(name);
    }
    return null;
};

VariableFrame.prototype.setVar = function (name, value, sender) {
    // change the specified variable if it exists
    // else throw an error, because variables need to be
    // declared explicitly (e.g. through a "script variables" block),
    // before they can be accessed.
    // if the found frame is inherited by the sender sprite
    // shadow it (create an explicit one for the sender)
    // before setting the value ("create-on-write")

    var frame = this.find(name);
    if (frame) {
        if (sender instanceof SpriteMorph &&
                (frame.owner instanceof SpriteMorph) &&
                (sender !== frame.owner)) {
            sender.shadowVar(name, value);
        } else {
            frame.vars[name].value = value;
        }
    }
};

VariableFrame.prototype.changeVar = function (name, delta, sender) {
    // change the specified variable if it exists
    // else throw an error, because variables need to be
    // declared explicitly (e.g. through a "script variables" block,
    // before they can be accessed.
    // if the found frame is inherited by the sender sprite
    // shadow it (create an explicit one for the sender)
    // before changing the value ("create-on-write")

    var frame = this.find(name),
        value,
        newValue;
    if (frame) {
        value = parseFloat(frame.vars[name].value);
        newValue = isNaN(value) ? delta : value + parseFloat(delta);
        if (sender instanceof SpriteMorph &&
                (frame.owner instanceof SpriteMorph) &&
                (sender !== frame.owner)) {
            sender.shadowVar(name, newValue);
        } else {
            frame.vars[name].value = newValue;
        }

    }
};

VariableFrame.prototype.getVar = function (name) {
    var frame = this.silentFind(name),
        value;
    if (frame) {
        value = frame.vars[name].value;
        return (value === 0 ? 0
                : value === false ? false
                        : value === '' ? ''
                            : value || 0); // don't return null
    }
    if (typeof name === 'number') {
        // empty input with a Binding-ID called without an argument
        return '';
    }
    throw new Error(
        localize('a variable of name \'')
            + name
            + localize('\'\ndoes not exist in this context')
    );
};

VariableFrame.prototype.addVar = function (name, value) {
    this.vars[name] = new Variable(value === 0 ? 0
              : value === false ? false
                       : value === '' ? '' : value || 0);
};

VariableFrame.prototype.deleteVar = function (name) {
    var frame = this.find(name);
    if (frame) {
        delete frame.vars[name];
    }
};

// VariableFrame tools

VariableFrame.prototype.names = function () {
    var each, names = [];
    for (each in this.vars) {
        if (Object.prototype.hasOwnProperty.call(this.vars, each)) {
            names.push(each);
        }
    }
    return names;
};

VariableFrame.prototype.allNamesDict = function (upTo) {
	// "upTo" is an optional parent frame at which to stop, e.g. globals
    var dict = {}, current = this;

    function addKeysToDict(srcDict, trgtDict) {
        var eachKey;
        for (eachKey in srcDict) {
            if (Object.prototype.hasOwnProperty.call(srcDict, eachKey)) {
                trgtDict[eachKey] = eachKey;
            }
        }
    }

    while (current && (current !== upTo)) {
        addKeysToDict(current.vars, dict);
        current = current.parentFrame;
    }
    return dict;
};

VariableFrame.prototype.allNames = function (upTo) {
/*
    only show the names of the lexical scope, hybrid scoping is
    reserved to the daring ;-)
	"upTo" is an optional parent frame at which to stop, e.g. globals
*/
    var answer = [], each, dict = this.allNamesDict(upTo);

    for (each in dict) {
        if (Object.prototype.hasOwnProperty.call(dict, each)) {
            answer.push(each);
        }
    }
    return answer;
};
