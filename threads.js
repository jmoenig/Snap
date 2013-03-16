/*

    threads.js

    a tail call optimized blocks-based programming language interpreter
    based on morphic.js and blocks.js
    inspired by Scratch, Scheme and Squeak

    written by Jens Mšnig
    jens@moenig.org

    Copyright (C) 2013 by Jens Mšnig

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
        VariableFrame
        UpvarReference


    credits
    -------
    John Maloney and Dave Feinberg designed the original Scratch evaluator
    Ivan Motyashov contributed initial porting from Squeak

*/

// globals from blocks.js:

/*global ArgMorph, ArrowMorph, BlockHighlightMorph, BlockMorph,
BooleanSlotMorph, BoxMorph, Color, ColorPaletteMorph, ColorSlotMorph,
CommandBlockMorph, CommandSlotMorph, FrameMorph, HatBlockMorph,
InputSlotMorph, MenuMorph, Morph, MultiArgMorph, Point,
ReporterBlockMorph, ScriptsMorph, ShadowMorph, StringMorph,
SyntaxElementMorph, TextMorph, WorldMorph, blocksVersion, contains,
degrees, detect, getDocumentPositionOf, newCanvas, nop, radians,
useBlurredShadows, ReporterSlotMorph, CSlotMorph, RingMorph, IDE_Morph,
ArgLabelMorph, localize*/

// globals from objects.js:

/*global StageMorph, SpriteMorph, StagePrompterMorph, Note*/

// globals from morphic.js:

/*global modules, isString, copy, isNil*/

// globals from gui.js:

/*global WatcherMorph*/

// globals from lists.js:

/*global List, ListWatcherMorph*/

/*global alert, console*/

// Global stuff ////////////////////////////////////////////////////////

modules.threads = '2013-March-13';

var ThreadManager;
var Process;
var Context;
var VariableFrame;
var UpvarReference;

function snapEquals(a, b) {
    if (a instanceof List || (b instanceof List)) {
        if (a instanceof List && (b instanceof List)) {
            return a.equalTo(b);
        }
        return false;
    }
    var x = parseFloat(a),
        y = parseFloat(b);
    if (isNaN(x) || isNaN(y)) {
        x = a;
        y = b;
    }
    if (isString(x) && isString(y)) {
        return x.toLowerCase() === y.toLowerCase();
    }
    return x === y;
}

// ThreadManager ///////////////////////////////////////////////////////

function ThreadManager() {
    this.processes = [];
}

ThreadManager.prototype.toggleProcess = function (block) {
    var active = this.findProcess(block);
    if (active) {
        active.stop();
    } else {
        return this.startProcess(block);
    }
};

ThreadManager.prototype.startProcess = function (block, isThreadSafe) {
    var active = this.findProcess(block),
        top = block.topBlock(),
        newProc;
    if (active) {
        if (isThreadSafe) {
            return active;
        }
        active.stop();
        this.removeTerminatedProcesses();
    }
    top.addHighlight();
    newProc = new Process(block.topBlock());
    this.processes.push(newProc);
    return newProc;
};

ThreadManager.prototype.stopAll = function () {
    this.processes.forEach(function (proc) {
        proc.stop();
    });
};

ThreadManager.prototype.stopAllForReceiver = function (rcvr) {
    this.processes.forEach(function (proc) {
        if (proc.homeContext.receiver === rcvr) {
            proc.stop();
            if (rcvr.isClone) {
                proc.isDead = true;
            }
        }
    });
};

ThreadManager.prototype.stopProcess = function (block) {
    var active = this.findProcess(block);
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
/*
    run each process until it gives up control, skipping processes
    for sprites that are currently picked up, then filter out any
    processes that have been terminated
*/
    this.processes.forEach(function (proc) {
        if (!proc.homeContext.receiver.isPickedUp() && !proc.isDead) {
            proc.runStep();
        }
    });
    this.removeTerminatedProcesses();
};

ThreadManager.prototype.removeTerminatedProcesses = function () {
    // and un-highlight their scripts
    var remaining = [];
    this.processes.forEach(function (proc) {
        if (!proc.isRunning() && !proc.errorFlag && !proc.isDead) {
            proc.topBlock.removeHighlight();

            if (proc.prompter) {
                proc.prompter.destroy();
                if (proc.homeContext.receiver.stopTalking) {
                    proc.homeContext.receiver.stopTalking();
                }
            }

            if (proc.topBlock instanceof ReporterBlockMorph) {
                if (proc.homeContext.inputs[0] instanceof List) {
                    proc.topBlock.showBubble(new ListWatcherMorph(
                        proc.homeContext.inputs[0]
                    ));
                } else {
                    proc.topBlock.showBubble(proc.homeContext.inputs[0]);
                }
            }
        } else {
            remaining.push(proc);
        }
    });
    this.processes = remaining;
};

ThreadManager.prototype.findProcess = function (block) {
    var top = block.topBlock();
    return detect(
        this.processes,
        function (each) {
            return each.topBlock === top;
        }
    );
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
    context                the Context describing the current state
                        of this process
    homeContext            stores information relevant to the whole process,
                        i.e. its receiver, result etc.
    isPaused            boolean indicating whether to pause
    readyToYield        boolean indicating whether to yield control to
                        another process
    readyToTerminate    boolean indicating whether the stop method has
                        been called
    isDead              boolean indicating a terminated clone process
    timeout                msecs after which to force yield
    lastYield            msecs when the process last yielded
    errorFlag            boolean indicating whether an error was encountered
    prompter            active instance of StagePrompterMorph
    httpRequest         active instance of an HttpRequest or null
    pauseOffset         msecs between the start of an interpolated operation
                        and when the process was paused
*/

Process.prototype = {};
Process.prototype.contructor = Process;
Process.prototype.timeout = 500; // msecs after which to force yield
Process.prototype.isCatchingErrors = true;

function Process(topBlock) {
    this.topBlock = topBlock || null;

    this.readyToYield = false;
    this.readyToTerminate = false;
    this.isDead = false;
    this.errorFlag = false;
    this.context = null;
    this.homeContext = new Context();
    this.lastYield = Date.now();
    this.isAtomic = false;
    this.prompter = null;
    this.httpRequest = null;
    this.isPaused = false;
    this.pauseOffset = null;
    this.frameCount = 0;

    if (topBlock) {
        this.homeContext.receiver = topBlock.receiver();
        this.homeContext.variables.parentFrame =
            this.homeContext.receiver.variables;
        this.context = new Context(
            null,
            topBlock.blockSequence(),
            this.homeContext
        );
        this.pushContext('doYield'); // highlight top block
    }
}

// Process accessing

Process.prototype.isRunning = function () {
    return (this.context !== null) && (!this.readyToTerminate);
};

// Process entry points

Process.prototype.runStep = function () {
/*
    a step is an an uninterruptable 'atom', it can consist
    of several contexts, even of several blocks
*/
    if (this.isPaused) {
        return this.pauseStep();
    }
    this.readyToYield = false;
    while (!this.readyToYield
            && this.context
            && (this.isAtomic ?
                    (Date.now() - this.lastYield < this.timeout) : true)
                ) {
        this.evaluateContext();
    }
    this.lastYield = Date.now();

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
    this.isPaused = true;
    if (this.context && this.context.startTime) {
        this.pauseOffset = Date.now() - this.context.startTime;
    }
};

Process.prototype.resume = function () {
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
        return this[exp]();
    }
    this.popContext(); // default: just ignore it
};

Process.prototype.evaluateBlock = function (block, argCount) {
    // check for special forms
    if (contains(['reportOr', 'reportAnd'], block.selector)) {
        return this[block.selector](block);
    }

    // first evaluate all inputs, then apply the primitive
    var rcvr = this.context.receiver || this.topBlock.receiver(),
        inputs = this.context.inputs;

    if (argCount > inputs.length) {
        this.evaluateNextInput(block);
    } else {
        if (this[block.selector]) {
            rcvr = this;
        }
        if (this.isCatchingErrors) {
            try {
                this.returnValueToParentContext(
                    rcvr[block.selector].apply(rcvr, inputs)
                );
                this.popContext();
            } catch (error) {
                this.handleError(error, block);
            }
        } else {
            this.returnValueToParentContext(
                rcvr[block.selector].apply(rcvr, inputs)
            );
            this.popContext();
        }
    }
};

// Process: Special Forms Blocks Primitives

Process.prototype.reportOr = function (block) {
    var inputs = this.context.inputs;

    if (inputs.length < 1) {
        this.evaluateNextInput(block);
    } else if (inputs[0]) {
        this.returnValueToParentContext(true);
        this.popContext();
    } else if (inputs.length < 2) {
        this.evaluateNextInput(block);
    } else {
        this.returnValueToParentContext(inputs[1] === true);
        this.popContext();
    }
};

Process.prototype.reportAnd = function (block) {
    var inputs = this.context.inputs;

    if (inputs.length < 1) {
        this.evaluateNextInput(block);
    } else if (!inputs[0]) {
        this.returnValueToParentContext(false);
        this.popContext();
    } else if (inputs.length < 2) {
        this.evaluateNextInput(block);
    } else {
        this.returnValueToParentContext(inputs[1] === true);
        this.popContext();
    }
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
            if (contains(
                    [CommandSlotMorph, ReporterSlotMorph],
                    input.constructor
                ) || (input instanceof CSlotMorph && !input.isStatic)) {
                // I know, this still needs yet to be done right....
                ans = this.reify(ans, new List());
                ans.isImplicitLambda = true;
            }
        }
    }
    this.returnValueToParentContext(ans);
    this.popContext();
};

Process.prototype.evaluateSequence = function (arr) {
    var pc = this.context.pc,
        outer = this.context.outerContext,
        isLambda = this.context.isLambda,
        isImplicitLambda = this.context.isImplicitLambda,
        isCustomBlock = this.context.isCustomBlock,
        upvars = this.context.upvars;
    if (pc === (arr.length - 1)) { // tail call elimination
        this.context = new Context(
            this.context.parentContext,
            arr[pc],
            this.context.outerContext,
            this.context.receiver
        );
        this.context.isLambda = isLambda;
        this.context.isImplicitLambda = isImplicitLambda;
        this.context.isCustomBlock = isCustomBlock;
        if (upvars) {
            this.context.upvars = new UpvarReference(upvars);
        }
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
the variable bindings) and the isLambda flag along, and are indicated by a
short comment in the code. But to really revert would take a good measure
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
            if (contains(['reify', 'reportScript'],
                    this.context.expression.selector)) {
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

// Process Exception Handling

Process.prototype.handleError = function (error, element) {
    this.stop();
    this.errorFlag = true;
    this.topBlock.addErrorHighlight();
    (element || this.topBlock).showBubble(
        (element ? '' : 'Inside: ')
            + error.name
            + '\n'
            + error.message
    );
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
        context.expression = topBlock.fullCopy();
        context.expression.show(); // be sure to make visible if in app mode

        if (!isCustomBlock) {
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
        context.expression = [this.context.expression.fullCopy()];
    }

    context.inputs = parameterNames.asArray();
    context.receiver
        = this.context ? this.context.receiver : topBlock.receiver();

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

Process.prototype.doRun = function (context, args, isCustomBlock) {
    return this.evaluate(context, args, true, isCustomBlock);
};

Process.prototype.evaluate = function (
    context,
    args,
    isCommand
) {
    if (!context) {return null; }
    if (context.isContinuation) {
        return this.runContinuation(context, args);
    }
    if (!(context instanceof Context)) {
        throw new Error('expecting a ring but getting ' + context);
    }

    var outer = new Context(null, null, context.outerContext),
        runnable,
        extra,
        parms = args.asArray(),
        i,
        value,
        upvars;

    if (!outer.receiver) {
        outer.receiver = context.receiver; // for custom blocks
    }
    runnable = new Context(
        this.context.parentContext,
        context.expression,
        outer,
        context.receiver
    );
    extra = new Context(runnable, 'doYield');

    /*
        Note: if the context's expression is a ReporterBlockMorph,
        the extra context gets popped off immediately without taking
        effect (i.e. it doesn't yield within evaluating a stack of
        nested reporters)
    */

    if (isCommand || (context.expression instanceof ReporterBlockMorph)) {
        this.context.parentContext = extra;
    } else {
        this.context.parentContext = runnable;
    }

    runnable.isLambda = true;
    runnable.isImplicitLambda = context.isImplicitLambda;
    runnable.isCustomBlock = false;

    // assing parameters if any were passed
    if (parms.length > 0) {

        // assign formal parameters
        for (i = 0; i < context.inputs.length; i += 1) {
            value = 0;
            if (parms[i]) {
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
                    'expecting ' + context.emptySlots + ' input(s), '
                        + 'but getting ' + parms.length
                );
            }
        }
    }
    if (upvars) {
        runnable.upvars = upvars;
    } else if (this.context.upvars) {
        runnable.upvars = new UpvarReference(this.context.upvars);
    }

    if (runnable.expression instanceof CommandBlockMorph) {
        runnable.expression = runnable.expression.blockSequence();
    }
};

Process.prototype.fork = function (context, args) {
    if (context.isContinuation) {
        throw new Error(
            'continuations cannot be forked'
        );
    }

    var outer = new Context(null, null, context.outerContext),
        runnable = new Context(null,
            context.expression,
            outer
            ),
        parms = args.asArray(),
        i,
        value,
        stage = this.homeContext.receiver.parentThatIsA(StageMorph),
        proc = new Process();

    runnable.isLambda = true;

    // assign parameters if any were passed
    if (parms.length > 0) {

        // assign formal parameters
        for (i = 0; i < context.inputs.length; i += 1) {
            value = 0;
            if (parms[i]) {
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
                    'expecting ' + context.emptySlots + ' input(s), '
                        + 'but getting ' + parms.length
                );
            }
        }
    }

    if (runnable.expression instanceof CommandBlockMorph) {
        runnable.expression = runnable.expression.blockSequence();
    }

    proc.homeContext = context.outerContext;
    proc.topBlock = context.expression;
    proc.context = runnable;
    proc.pushContext('doYield');
    stage.threads.processes.push(proc);
};

Process.prototype.doReport = function (value, isCSlot) {
    while (this.context && !this.context.isLambda) {
        if (this.context.expression === 'doStopWarping') {
            this.doStopWarping();
        } else {
            this.popContext();
        }
    }
    if (this.context && this.context.isImplicitLambda) {
        if (this.context.expression === 'doStopWarping') {
            this.doStopWarping();
        } else {
            this.popContext();
        }
        return this.doReport(value, true);
    }
    if (this.context && this.context.isCustomBlock) {
        // now I'm back at the custom block sequence.
        // advance my pc to my expression's length
        this.context.pc = this.context.expression.length - 1;
    }
    if (isCSlot) {
        if (this.context.parentContext.expression instanceof Array) {
            this.popContext();
        }
    }
    return value;
};

Process.prototype.doStopBlock = function () {
    this.doReport();
};

// Process evaluation variants, commented out for now (redundant)

/*
Process.prototype.doRunWithInputList = function (context, args) {
    // provide an extra selector for the palette
    return this.doRun(context, args);
};

Process.prototype.evaluateWithInputList = function (context, args) {
    // provide an extra selector for the palette
    return this.evaluate(context, args);
};

Process.prototype.forkWithInputList = function (context, args) {
    // provide an extra selector for the palette
    return this.fork(context, args);
};
*/

// Process continuations primitives

Process.prototype.doCallCC = function (aContext) {
    this.evaluate(aContext, new List([this.context.continuation()]));
};

Process.prototype.reportCallCC = function (aContext) {
    this.doCallCC(aContext);
};

Process.prototype.runContinuation = function (aContext, args) {
    var parms = args.asArray();
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
    var context = this.context.expression.definition.body,
        declarations = this.context.expression.definition.declarations,
        args = new List(this.context.inputs),
        parms = args.asArray(),
        runnable,
        extra,
        i,
        value,
        upvars,
        outer;

    if (!context) {return null; }
    outer = new Context();
    outer.receiver = this.context.receiver; // || this.homeContext.receiver;
    outer.variables.parentFrame = outer.receiver.variables;

    runnable = new Context(
        this.context.parentContext,
        context.expression,
        outer,
        outer.receiver,
        true // is custom block
    );
    extra = new Context(runnable, 'doYield');

    this.context.parentContext = extra;

    runnable.isLambda = true;
    runnable.isCustomBlock = true;

    // passing parameters if any were passed
    if (parms.length > 0) {

        // assign formal parameters
        for (i = 0; i < context.inputs.length; i += 1) {
            value = 0;
            if (parms[i]) {
                value = parms[i];
            }
            outer.variables.addVar(context.inputs[i], value);

            // if the parameter is an upvar,
            // create an UpvarReference to it
            if (declarations[context.inputs[i]][0] === '%upvar') {
                if (!upvars) { // lazy initialization
                    upvars = new UpvarReference(this.context.upvars);
                }
                upvars.addReference(
                    value,
                    context.inputs[i],
                    outer.variables
                );
            }
        }
    }

    if (upvars) {
        runnable.upvars = upvars;
    } else if (this.context.upvars) {
        runnable.upvars = new UpvarReference(this.context.upvars);
    }

    if (runnable.expression instanceof CommandBlockMorph) {
        runnable.expression = runnable.expression.blockSequence();
    }
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
        name = varName;

    if (name instanceof Context) {
        if (name.expression.selector === 'reportGetVar') {
            name = name.expression.blockSpec;
        }
    }
    varFrame.setVar(name, value);
};

Process.prototype.doChangeVar = function (varName, value) {
    var varFrame = this.context.variables,
        name = varName;

    if (name instanceof Context) {
        if (name.expression.selector === 'reportGetVar') {
            name = name.expression.blockSpec;
        }
    }
    varFrame.changeVar(name, value);
};

Process.prototype.reportGetVar = function () {
    // assumes a getter block whose blockSpec is a variable name
    var varName = this.context.expression.blockSpec;

    return this.context.variables.getVar(
        varName,
        this.context.upvars
    );
};

Process.prototype.doShowVar = function (varName) {
    var varFrame = this.context.variables,
        stage,
        watcher,
        target,
        label,
        others,
        name = varName;

    if (name instanceof Context) {
        if (name.expression.selector === 'reportGetVar') {
            name = name.expression.blockSpec;
        }
    }
    if (this.homeContext.receiver) {
        stage = this.homeContext.receiver.parentThatIsA(StageMorph);
        if (stage) {
            target = varFrame.find(name);
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
            if (target.owner) {
                label = name;
            } else {
                label = name + ' (temporary)';
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

// Process lists primitives

Process.prototype.reportNewList = function (elements) {
    return elements;
};

Process.prototype.reportCONS = function (car, cdr) {
    return new List().cons(car, cdr);
};

Process.prototype.reportCDR = function (list) {
    return list.cdr();
};

Process.prototype.doAddToList = function (element, list) {
    list.add(element);
};

Process.prototype.doDeleteFromList = function (index, list) {
    var idx = index;
    if (this.inputOption(index) === 'all') {
        return list.clear();
    }
    if (index === '') {
        return null;
    }
    if (this.inputOption(index) === 'last') {
        idx = list.length();
    }
    list.remove(idx);
};

Process.prototype.doInsertInList = function (element, index, list) {
    var idx = index;
    if (index === '') {
        return null;
    }
    if (this.inputOption(index) === 'any') {
        idx = this.reportRandom(1, list.length());
    }
    if (this.inputOption(index) === 'last') {
        idx = list.length() + 1;
    }
    list.add(element, idx);
};

Process.prototype.doReplaceInList = function (index, list, element) {
    var idx = index;
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
    return list.length();
};

Process.prototype.reportListContainsItem = function (list, element) {
    return list.contains(element);
};

// Process conditionals primitives

Process.prototype.doIf = function () {
    var args = this.context.inputs,
        outer = this.context.outerContext, // for tail call elimination
        isLambda = this.context.isLambda,
        isImplicitLambda = this.context.isImplicitLambda,
        isCustomBlock = this.context.isCustomBlock,
        upvars = this.context.upvars;

    this.popContext();
    if (args[0]) {
        if (args[1]) {
            this.pushContext(args[1].blockSequence(), outer);
            this.context.isLambda = isLambda;
            this.context.isImplicitLambda = isImplicitLambda;
            this.context.isCustomBlock = isCustomBlock;
            this.context.upvars = new UpvarReference(upvars);
        }
    }
    this.pushContext();
};

Process.prototype.doIfElse = function () {
    var args = this.context.inputs,
        outer = this.context.outerContext, // for tail call elimination
        isLambda = this.context.isLambda,
        isImplicitLambda = this.context.isImplicitLambda,
        isCustomBlock = this.context.isCustomBlock,
        upvars = this.context.upvars;

    this.popContext();
    if (args[0]) {
        if (args[1]) {
            this.pushContext(args[1].blockSequence(), outer);
        }
    } else {
        if (args[2]) {
            this.pushContext(args[2].blockSequence(), outer);
        }
    }
    if (this.context) {
        this.context.isLambda = isLambda;
        this.context.isImplicitLambda = isImplicitLambda;
        this.context.isCustomBlock = isCustomBlock;
        this.context.upvars = new UpvarReference(upvars);
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

Process.prototype.doWarp = function (body) {
    // execute my contents block atomically (more or less)
    var outer = this.context.outerContext, // for tail call elimination
        isLambda = this.context.isLambda,
        isImplicitLambda = this.context.isImplicitLambda,
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

        this.context.isLambda = isLambda;
        this.context.isImplicitLambda = isImplicitLambda;
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
            if (ide.stage.isFastTracked) {
                ide.stopFastTracking();
            } else {
                ide.startFastTracking();
            }
        }
    }
};

// Process loop primitives

Process.prototype.doForever = function (body) {
    this.pushContext('doYield');
    if (body) {
        this.pushContext(body.blockSequence());
    }
    this.pushContext();
};

Process.prototype.doRepeat = function (counter, body) {
    var block = this.context.expression,
        outer = this.context.outerContext, // for tail call elimination
        isLambda = this.context.isLambda,
        isImplicitLambda = this.context.isImplicitLambda,
        isCustomBlock = this.context.isCustomBlock,
        upvars = this.context.upvars;

    if (counter < 1) { // was '=== 0', which caused infinite loops on non-ints
        return null;
    }
    this.popContext();

    this.pushContext(block, outer);

    this.context.isLambda = isLambda;
    this.context.isImplicitLambda = isImplicitLambda;
    this.context.isCustomBlock = isCustomBlock;
    this.context.upvars = new UpvarReference(upvars);

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

// Process interpolated primitives

Process.prototype.doWait = function (secs) {
    if (!this.context.startTime) {
        this.context.startTime = Date.now();
    }
    if ((Date.now() - this.context.startTime) >= (secs * 1000)) {
        return null;
    }
    this.pushContext('doYield');
    this.pushContext();
};

Process.prototype.doGlide = function (secs, endX, endY) {
    if (!this.context.startTime) {
        this.context.startTime = Date.now();
        this.context.startValue = new Point(
            this.homeContext.receiver.xPosition(),
            this.homeContext.receiver.yPosition()
        );
    }
    if ((Date.now() - this.context.startTime) >= (secs * 1000)) {
        this.homeContext.receiver.gotoXY(endX, endY);
        return null;
    }
    this.homeContext.receiver.glide(
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
        this.homeContext.receiver.bubble(data);
    }
    if ((Date.now() - this.context.startTime) >= (secs * 1000)) {
        this.homeContext.receiver.stopTalking();
        return null;
    }
    this.pushContext('doYield');
    this.pushContext();
};

Process.prototype.doThinkFor = function (data, secs) {
    if (!this.context.startTime) {
        this.context.startTime = Date.now();
        this.homeContext.receiver.doThink(data);
    }
    if ((Date.now() - this.context.startTime) >= (secs * 1000)) {
        this.homeContext.receiver.stopTalking();
        return null;
    }
    this.pushContext('doYield');
    this.pushContext();
};

// Process sound primitives (interpolated)

Process.prototype.doPlaySoundUntilDone = function (name) {
    var sprite = this.homeContext.receiver;
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
        isStage = this.homeContext.receiver instanceof StageMorph,
        activePrompter;

    if (!this.prompter) {
        activePrompter = detect(
            stage.children,
            function (morph) {return morph instanceof StagePrompterMorph; }
        );
        if (!activePrompter) {
            if (!isStage) {
                this.homeContext.receiver.bubble(data, false, true);
            }
            this.prompter = new StagePrompterMorph(isStage ? data : null);
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
            if (!isStage) {this.homeContext.receiver.stopTalking(); }
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
        this.httpRequest = new XMLHttpRequest();
        this.httpRequest.open("GET", 'http://' + url, true);
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
    var stage = this.homeContext.receiver.parentThatIsA(StageMorph),
        hats = [],
        procs = [];

    if (message !== '') {
        stage.children.concat(stage).forEach(function (morph) {
            if (morph instanceof SpriteMorph || morph instanceof StageMorph) {
                hats = hats.concat(morph.allHatBlocksFor(message));
            }
        });
        hats.forEach(function (block) {
            procs.push(stage.threads.startProcess(block, stage.isThreadSafe));
        });
    }
    return procs;
};

Process.prototype.doBroadcastAndWait = function (message) {
    if (!this.context.activeSends) {
        this.context.activeSends = this.doBroadcast(message);
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

// Process type inference

Process.prototype.reportIsA = function (thing, typeString) {
    return this.reportTypeOf(thing) === this.inputOption(typeString);
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
    if (!isNaN(parseFloat(thing))) {
        return 'number';
    }
    if (isString(thing)) {
        return 'text';
    }
    if (thing instanceof List) {
        return 'list';
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
    return parseFloat(a) + parseFloat(b);
};

Process.prototype.reportDifference = function (a, b) {
    return parseFloat(a) - parseFloat(b);
};

Process.prototype.reportProduct = function (a, b) {
    return parseFloat(a) * parseFloat(b);
};

Process.prototype.reportQuotient = function (a, b) {
    return parseFloat(a) / parseFloat(b);
};

Process.prototype.reportModulus = function (a, b) {
    var x = parseFloat(a),
        y = parseFloat(b);
    return ((x % y) + y) % y;
};

Process.prototype.reportRandom = function (min, max) {
    var floor = parseFloat(min),
        ceil = parseFloat(max);
    if ((floor % 1 !== 0) || (ceil % 1 !== 0)) {
        return Math.random() * (ceil - floor) + floor;
    }
    return Math.floor(Math.random() * (ceil - floor + 1)) + floor;
};

Process.prototype.reportLessThan = function (a, b) {
    var x = parseFloat(a),
        y = parseFloat(b);
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
    var x = parseFloat(a),
        y = parseFloat(b);
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
        if (a.hasOwnProperty(tag)) {
            delete a[tag];
        }
        if (b.hasOwnProperty(tag)) {
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
    return contains(
        ['nothing', 'Boolean', 'text', 'number', 'undefined'],
        this.reportTypeOf(obj)
    );
};

Process.prototype.reportTrue = function () {
    return true;
};

Process.prototype.reportFalse = function () {
    return false;
};

Process.prototype.reportRound = function (n) {
    return Math.round(parseFloat(n));
};

Process.prototype.reportMonadic = function (fname, n) {
    var x = parseFloat(n),
        result = 0;

    switch (this.inputOption(fname)) {
    case 'abs':
        result = Math.abs(x);
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
    case 'log':
        result = 0;
        break;
    case 'e^':
        result = Math.exp(x);
        break;
    case '10^':
        result = 0;
        break;
    default:
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
    var i = parseFloat(idx || 0),
        str = (string || '').toString();
    return str[i - 1] || '';
};

Process.prototype.reportStringSize = function (string) {
    var str = (string || '').toString();
    return str.length;
};

Process.prototype.reportUnicode = function (string) {
    var str = (string || '').toString()[0];
    return str ? str.charCodeAt(0) : 0;
};

Process.prototype.reportUnicodeAsLetter = function (num) {
    var code = parseFloat(num || 0);
    return String.fromCharCode(code);
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
        return obj instanceof SpriteMorph && obj.isClone ?
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

Process.prototype.doFaceTowards = function (name) {
    var thisObj = this.homeContext.receiver,
        thatObj;

    if (thisObj) {
        if (this.inputOption(name) === 'mouse-pointer') {
            thisObj.faceToXY(this.reportMouseX(), this.reportMouseY());
        } else {
            thatObj = this.getOtherObject(name, thisObj);
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
    var thisObj = this.homeContext.receiver,
        thatObj;

    if (thisObj) {
        if (this.inputOption(name) === 'mouse-pointer') {
            thisObj.gotoXY(this.reportMouseX(), this.reportMouseY());
        } else {
            thatObj = this.getOtherObject(name, thisObj);
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
    var thisObj = this.homeContext.receiver,
        thatObj;

    if (!name) {return; }
    if (thisObj) {
        if (this.inputOption(name) === 'myself') {
            thisObj.createClone();
        } else {
            thatObj = this.getOtherObject(name, thisObj);
            if (thatObj) {
                thatObj.createClone();
            }
        }
    }
};

// Process sensing primitives

Process.prototype.reportTouchingObject = function (name) {
    // also check for temparary clones, as in Scratch 2.0
    var thisObj = this.homeContext.receiver,
        those,
        stage,
        mouse;

    if (thisObj) {
        if (this.inputOption(name) === 'mouse-pointer') {
            mouse = thisObj.world().hand.position();
            if (thisObj.bounds.containsPoint(mouse)) {
                return !thisObj.isTransparentAt(mouse);
            }
            return false;
        }
        stage = thisObj.parentThatIsA(StageMorph);
        if (stage) {
            if (this.inputOption(name) === 'edge') {
                return !stage.bounds.containsRectangle(thisObj.bounds);
            }
            if (this.inputOption(name) === 'pen trails') {
                return thisObj.isTouching(stage.penTrailsMorph());
            }
            those = this.getObjectsNamed(name, thisObj, stage); // clones
            return those.some(
                function (any) {
                    return thisObj.isTouching(any);
                }
            );
        }
    }
    return false;
};

Process.prototype.reportTouchingColor = function (aColor) {
    var thisObj = this.homeContext.receiver,
        stage;

    if (thisObj) {
        stage = thisObj.parentThatIsA(StageMorph);
        if (stage) {
            return thisObj.isTouching(stage.colorFiltered(aColor, thisObj));
        }
    }
    return false;
};

Process.prototype.reportColorIsTouchingColor = function (color1, color2) {
    var thisObj = this.homeContext.receiver,
        stage;

    if (thisObj) {
        stage = thisObj.parentThatIsA(StageMorph);
        if (stage) {
            return thisObj.colorFiltered(color1).isTouching(
                stage.colorFiltered(color2, thisObj)
            );
        }
    }
    return false;
};

Process.prototype.reportDistanceTo = function (name) {
    var thisObj = this.homeContext.receiver,
        thatObj,
        stage,
        rc,
        point;

    if (thisObj) {
        rc = thisObj.rotationCenter();
        point = rc;
        if (this.inputOption(name) === 'mouse-pointer') {
            point = thisObj.world().hand.position();
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

Process.prototype.reportAttributeOf = function (attribute, name) {
    var thisObj = this.homeContext.receiver,
        thatObj,
        stage;

    if (thisObj) {
        stage = thisObj.parentThatIsA(StageMorph);
        if (stage.name === name) {
            thatObj = stage;
        } else {
            thatObj = this.getOtherObject(name, thisObj, stage);
        }
        if (thatObj) {
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
        this.context.activeNote.play();
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

// Process constant input options

Process.prototype.inputOption = function (dta) {
    // private - for localization
    return dta instanceof Array ? dta[0] : dta;
};

// Process stack

Process.prototype.pushContext = function (expression, outerContext) {
    var upvars = this.context ? this.context.upvars : null;
    this.context = new Context(
        this.context,
        expression,
        outerContext || (this.context ? this.context.outerContext : null),
            // for tail call elimination
        this.context ? // check needed due to tail call elimination
                this.context.receiver : this.homeContext.receiver
    );
    if (upvars) {
        this.context.upvars = new UpvarReference(upvars);
    }
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

// Context /////////////////////////////////////////////////////////////

/*
    A Context describes the state of a Process.

    Each Process has a pointer to a Context containing its
    state. Whenever the Process yields control, its Context
    tells it exactly where it left off.

    structure:

    parentContext    the Context to return to when this one has
                    been evaluated.
    outerContext    the Context holding my lexical scope
    expression        SyntaxElementMorph, an array of blocks to evaluate,
                    null or a String denoting a selector, e.g. 'doYield'
    receiver        the object to which the expression applies, if any
    variables        the current VariableFrame, if any
    upvars          the current UpvarReference, if any (default: null)
    inputs            an array of input values computed so far
                    (if expression is a    BlockMorph)
    pc                the index of the next block to evaluate
                    (if expression is an array)
    startTime        time when the context was first evaluated
    startValue        initial value for interpolated operations
    activeAudio     audio buffer for interpolated operations, don't persist
    activeNote      audio oscillator for interpolated ops, don't persist
    isLambda        marker for return ops
    isImplicitLambda    marker for return ops
    isCustomBlock   marker for return ops
    emptySlots        caches the number of empty slots for reification
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
    this.variables = new VariableFrame();
    if (this.outerContext) {
        this.variables.parentFrame = this.outerContext.variables;
        this.receiver = this.outerContext.receiver;
    }
    this.upvars = null; // set to an UpvarReference in custom blocks
    this.inputs = [];
    this.pc = 0;
    this.startTime = null;
    this.activeAudio = null;
    this.activeNote = null;
    this.isLambda = false; // marks the end of a lambda
    this.isImplicitLambda = false; // marks the end of a C-shaped slot
    this.isCustomBlock = false; // marks the end of a custom block's stack
    this.emptySlots = 0; // used for block reification
}

Context.prototype.toString = function () {
    var pref = this.isLambda ? '\u03BB-' : '',
        expr = this.expression;

    if (expr instanceof Array) {
        if (expr.length > 0) {
            expr = '[' + expr[0] + ']';
        }
    }
    return pref + 'Context >> ' + expr + ' ' + this.variables;
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
    return newCanvas();
};

// Context continuations:

Context.prototype.continuation = function () {
    var cont;
    if (this.expression instanceof Array) {
        cont = this;
    } else if (this.parentContext) {
        cont = this.parentContext;
    } else {
        return new Context(null, 'doStop');
    }
    cont = cont.copyForContinuation();
    cont.isContinuation = true;
    return cont;
};

Context.prototype.copyForContinuation = function () {
    var cpy = copy(this),
        cur = cpy,
        isReporter = !(this.expression instanceof Array);
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
        isReporter = !(this.expression instanceof Array);
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

// Context debugging

Context.prototype.stackSize = function () {
    if (!this.parentContext) {
        return 1;
    }
    return 1 + this.parentContext.stackSize();
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
    var frame = new VariableFrame(this.parentFrame);
    frame.vars = copy(this.vars);
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
        'a variable of name \''
            + name
            + '\'\ndoes not exist in this context'
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

VariableFrame.prototype.setVar = function (name, value) {
/*
    change the specified variable if it exists
    else throw an error, because variables need to be
    declared explicitly (e.g. through a "script variables" block),
    before they can be accessed.
*/
    var frame = this.find(name);
    if (frame) {
        frame.vars[name] = value;
    }
};

VariableFrame.prototype.changeVar = function (name, delta) {
/*
    change the specified variable if it exists
    else throw an error, because variables need to be
    declared explicitly (e.g. through a "script variables" block,
    before they can be accessed.
*/
    var frame = this.find(name),
        value;
    if (frame) {
        value = parseFloat(frame.vars[name]);
        if (isNaN(value)) {
            frame.vars[name] = delta;
        } else {
            frame.vars[name] = value + parseFloat(delta);
        }
    }
};

VariableFrame.prototype.getVar = function (name, upvars) {
    var frame = this.silentFind(name),
        value,
        upvarReference;
    if (frame) {
        value = frame.vars[name];
        return (value === 0 ? 0
                : value === false ? false
                        : value === '' ? ''
                            : value || 0); // don't return null
    }
    if (typeof name === 'number') {
        // empty input with a Binding-ID called without an argument
        return '';
    }
    if (upvars) {
        upvarReference = upvars.find(name);
        if (upvarReference) {
            return upvarReference.getVar(name);
        }
    }
    throw new Error(
        'a variable of name \''
            + name
            + '\'\ndoes not exist in this context'
    );
};

VariableFrame.prototype.addVar = function (name, value) {
    this.vars[name] = (value === 0 ? 0 : value || null);
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
        if (this.vars.hasOwnProperty(each)) {
            names.push(each);
        }
    }
    return names;
};

VariableFrame.prototype.allNamesDict = function () {
    var dict = {}, current = this;

    function addKeysToDict(srcDict, trgtDict) {
        var eachKey;
        for (eachKey in srcDict) {
            if (srcDict.hasOwnProperty(eachKey)) {
                trgtDict[eachKey] = eachKey;
            }
        }
    }

    while (current) {
        addKeysToDict(current.vars, dict);
        current = current.parentFrame;
    }
    return dict;
};

VariableFrame.prototype.allNames = function () {
/*
    only show the names of the lexical scope, hybrid scoping is
    reserved to the daring ;-)
*/
    var answer = [], each, dict = this.allNamesDict();

    for (each in dict) {
        if (dict.hasOwnProperty(each)) {
            answer.push(each);
        }
    }
    return answer;
};

// UpvarReference ///////////////////////////////////////////////////////////

// ... quasi-inherits some features from VariableFrame

function UpvarReference(parent) {
    this.vars = {}; // structure: {upvarName : [varName, varFrame]}
    this.parentFrame = parent || null;
}

UpvarReference.prototype.addReference = function (
    upvarName,
    varName,
    varFrame
) {
    this.vars[upvarName] = [varName, varFrame];
};

UpvarReference.prototype.find = function (name) {
/*
    answer the closest upvar reference containing
    the specified variable, or answer null.
*/
    if (this.vars[name] !== undefined) {
        return this;
    }
    if (this.parentFrame) {
        return this.parentFrame.find(name);
    }
    return null;
};

UpvarReference.prototype.getVar = function (name) {
    var varName = this.vars[name][0],
        varFrame = this.vars[name][1],
        value = varFrame.vars[varName];
    return (value === 0 ? 0 : value || 0); // don't return null
};

// UpvarReference tools

UpvarReference.prototype.toString = function () {
    return 'an UpvarReference {' + this.names() + '}';
};

// UpvarReference quasi-inheritance from VariableFrame

UpvarReference.prototype.names = VariableFrame.prototype.names;
UpvarReference.prototype.allNames = VariableFrame.prototype.allNames;
UpvarReference.prototype.allNamesDict = VariableFrame.prototype.allNamesDict;
