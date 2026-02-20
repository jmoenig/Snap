/*

    threads.js

    a tail call optimized blocks-based programming language interpreter
    based on morphic.js and blocks.js
    inspired by Scratch, Scheme and Squeak

    written by Jens Mönig
    jens@moenig.org

    Copyright (C) 2026 by Jens Mönig

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
        JSCompiler

    credits
    -------
    John Maloney and Dave Feinberg designed the original Scratch evaluator
    Ivan Motyashov contributed initial porting from Squeak

*/

// Global stuff ////////////////////////////////////////////////////////

/*global ArgMorph, BlockMorph, CommandBlockMorph, CommandSlotMorph, Morph, ZERO,
MultiArgMorph, Point, ReporterBlockMorph, SyntaxElementMorph, contains, Costume,
degrees, detect, nop, radians, ReporterSlotMorph, CSlotMorph, RingMorph, Sound,
IDE_Morph, ArgLabelMorph, localize, XML_Element, hex_sha512, TableDialogMorph,
StageMorph, SpriteMorph, StagePrompterMorph, Note, modules, isString, copy, Map,
isNil, WatcherMorph, List, ListWatcherMorph, alert, console, TableMorph, BLACK,
TableFrameMorph, ColorSlotMorph, isSnapObject, newCanvas, Symbol, SVG_Costume,
SnapExtensions, AlignmentMorph, TextMorph, Cloud, HatBlockMorph, InputSlotMorph,
StagePickerMorph, CustomBlockDefinition, CommentMorph, BooleanSlotMorph, Color,
CustomHatBlockMorph*/

/*jshint esversion: 11, bitwise: false, evil: true*/

modules.threads = '2026-February-10';

var ThreadManager;
var Process;
var Context;
var Variable;
var VariableFrame;
var JSCompiler;

const NONNUMBERS = [true, false, ''];

(function () {
    // "zum Schneckengang verdorben, was Adlerflug geworden wäre"
    // collecting edge-cases that somebody complained about
    // on Github. Folks, take it easy and keep it fun, okay?
    // Shit like this is patently ugly and slows Snap down. Tnx!
    for (var i = 9; i <= 13; i += 1) {
        NONNUMBERS.push(String.fromCharCode(i));
    }
    NONNUMBERS.push(String.fromCharCode(160));
})();

function snapEquals(a, b) {
    // nil
    if (isNil(a) || isNil(b)) {
        return a === b;
    }

    // lists, functions and blocks
    if (a.equalTo || b.equalTo) {
        if (a.constructor.name === b.constructor.name) {
            return a.equalTo(b);
        }
        return false;
    }

    // colors (points, rectangles)
    if (a.eq || b.eq) {
        if (a.constructor.name === b.constructor.name) {
            return a.eq(b, true); // observe alpha
        }
        return false;
    }

    // selectors (translatable text)
    if (a instanceof Array) {
        return snapEquals(a[0], b);
    }
    if (b instanceof Array) {
        return snapEquals(a, b[0]);
    }

    var x = +a,
        y = +b;

    // check for special values before coercing to numbers
    if (isNaN(x) || isNaN(y) ||
            [a, b].some(any => contains(NONNUMBERS, any) ||
                  (isString(any) && (any.indexOf(' ') > -1)))
    ) {
        x = a;
        y = b;
    }

    // handle text comparison case-insensitive.
    if (isString(x) && isString(y)) {
        if (Process.prototype.isCaseInsensitive) {
            return x.toLowerCase() === y.toLowerCase();
        }
    }

    return x === y;
}

function invoke(
    action, // a BlockMorph or a Context, a reified ("ringified") block
    contextArgs, // optional List of arguments for the context, or null
    receiver, // sprite or environment, optional for contexts
    timeout, // msecs
    timeoutErrorMsg, // string
    suppressErrors, // bool
    callerProcess, // optional for JS-functions
    returnContext // bool
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
            action = proc.reportContextFor(action, receiver);
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
        return action.apply(
            receiver,
            contextArgs.itemsArray().concat(callerProcess)
        );
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
    return returnContext ? proc.homeContext : proc.homeContext.inputs[0];
}

// ThreadManager ///////////////////////////////////////////////////////

function ThreadManager() {
    this.processes = [];
    this.halos = [];
    this.wantsToPause = false; // single stepping support
}

ThreadManager.prototype.pauseCustomHatBlocks = false;
ThreadManager.prototype.disableClickToRun = false;
ThreadManager.prototype.afterglow = 5;

ThreadManager.prototype.toggleProcess = function (block, receiver) {
    if (this.disableClickToRun) {
        return;
    }
    var active = this.findProcess(block, receiver);
    if (active) {
        active.stop();
    } else {
        return this.startProcess(
            block,
            receiver,
            null,
            null,
            null,
            true, // isClicked
            null,
            null,
            this.clickFrameFor(block) // for upvars declared inside hat blocks
        );
    }
};

ThreadManager.prototype.startProcess = function (
    block,
    receiver,
    isThreadSafe,
    exportResult, // bool
    callback,
    isClicked,
    rightAway,
    atomic, // special option used (only) for "onStop" scripts
    variables, // optional variable frame, used for WHEN hats
    noHalo,
    genericCondition,
    silentVars // for dynamic, user-scripted widgets, ignores missing variables
) {
    var top = block.topBlock(),
        active = this.findProcess(top, receiver),
        newProc;
    if (active) {
        if (isThreadSafe) {
            return active;
        }
        active.stop();
        active.canBroadcast = true; // broadcasts to fire despite reentrancy
        this.removeTerminatedProcesses();
    }
    newProc = new Process(top, receiver, callback, isClicked);
    newProc.exportResult = exportResult;
    newProc.isClicked = isClicked || false;
    newProc.isAtomic = atomic || false;
    newProc.isGenericCondition = genericCondition || false;
    newProc.isSilentVar = silentVars || false;

    // in case an optional variable frame has been passed,
    // copy it into the new outer context.
    // Relevance: When a predicate inside a generic WHEN hat block
    // publishes an upvar, this code makes the upvar accessible
    // to the script attached to the WHEN hat
    if (variables instanceof VariableFrame) {
        Object.keys(variables.vars).forEach(vName =>
            newProc.context.outerContext.variables.vars[vName] =
                variables.vars[vName]
        );
    }

    // in case the optional variable frame is an InputList,
    // evaluate all inputs and then copy them into the new
    // outer context
    else if (variables instanceof InputList) {
        newProc.pushContext(variables);
    }

    // show a highlight around the running stack
    if (!noHalo) {
        this.highlight(newProc);
    }

    this.processes.push(newProc);
    if (rightAway) {
        newProc.runStep();
    }
    return newProc;
};

ThreadManager.prototype.highlight = function (aProcess, adjustCount = 0) {
    // show a highlight around the running stack
    // if there are more than one active processes
    // for a block, display the thread count
    // next to it
    var top = aProcess.topBlock,
        glow = top.getHighlight();
    if (glow) {
        glow.threadCount = this.processesForBlock(top).length + 1 + adjustCount;
        glow.updateReadout();
    } else if (aProcess.isRunning()) {
        top.addHighlight();
    }
    aProcess.wantsHalo = false;
};

ThreadManager.prototype.stopAll = function (excpt) {
    // excpt is optional
    this.processes.forEach(proc => {
        if (proc !== excpt) {
            proc.stop();
        }
    });
};

ThreadManager.prototype.stopAllForReceiver = function (rcvr, excpt) {
    // excpt is optional
    this.processes.forEach(proc => {
        if (proc.homeContext.receiver === rcvr && proc !== excpt) {
            proc.stop();
            if (rcvr.isTemporary) {
                proc.isDead = true;
            }
        }
    });
};

ThreadManager.prototype.stopAllForBlock = function (aTopBlock) {
    this.processesForBlock(aTopBlock, true).forEach(proc =>
        proc.stop()
    );
};

ThreadManager.prototype.stopProcess = function (block, receiver) {
    var active = this.findProcess(block, receiver);
    if (active) {
        active.stop();
    }
};

ThreadManager.prototype.pauseAll = function (stage) {
    this.processes.forEach(proc => proc.pause());
    if (stage) {
        stage.pauseAllActiveSounds();
    }
};

ThreadManager.prototype.isPaused = function () {
    return detect(
        this.processes,
        proc => proc.isPaused
    ) !== null;
};

ThreadManager.prototype.resumeAll = function (stage) {
    this.processes.forEach(proc => proc.resume());
    if (stage) {
        stage.resumeAllActiveSounds();
    }
};

ThreadManager.prototype.step = function (skipAnimations) {
    // run each process until it gives up control, skipping processes
    // for sprites that are currently picked up, then filter out any
    // processes that have been terminated.
    // answer <true> if any process is animated or none are left

    var animating = false,
        skipped = 0,
        isInterrupted;
    if (Process.prototype.enableSingleStepping) {
        this.processes.forEach(proc => {
            if (proc.isInterrupted) {
                if (proc.wantsHalo) { this.highlight(proc, -1); }
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
            return true;
        }
    }

    this.processes.forEach(proc => {
        if (proc.isAnimated && skipAnimations) {
            skipped += 1;
        } else if (!proc.homeContext.receiver?.isPickedUp() && !proc.isDead) {
            if (proc.wantsHalo) { this.highlight(proc, -1); }
            proc.runStep();
            animating = animating || proc.isAnimated;
        }
    });
    this.removeTerminatedProcesses();
    return animating || (this.processes.length - skipped < 1);
};

ThreadManager.prototype.removeTerminatedProcesses = function () {
    // and un-highlight their scripts
    var remaining = [],
        count;
    this.processes.forEach(proc => {
        var result,
            glow;
        if ((!proc.isRunning() && !proc.errorFlag) || proc.isDead) {
            if (proc.topBlock instanceof BlockMorph) {
                proc.unflash();
                // adjust the thread count indicator, if any
                count = this.processesForBlock(proc.topBlock).length;
                if (count) {
                    glow = proc.topBlock.getHighlight() ||
                        proc.topBlock.addHighlight();
                    glow.threadCount = count;
                    glow.updateReadout();
                } else {
                    // afterglow the script for a couple of frames
                    // was: proc.topBlock.removeHighlight();
                    if (!proc.isGenericCondition ||
                        proc.hasFiredGenericCondition
                    ) {
                        if (proc.hasFiredGenericCondition &&
                            !proc.topBlock.getHighlight()
                        ) {
                            proc.topBlock.addHighlight();
                        }
                        proc.topBlock.afterglow = this.afterglow;
                        if (!this.halos.includes(proc.topBlock)) {
                            this.halos.push(proc.topBlock);
                        }
                    }
                }
            }
            if (proc.prompter) {
                proc.prompter.destroy();
                if (proc.homeContext.receiver.stopTalking) {
                    proc.homeContext.receiver.stopTalking();
                }
            }
            if (proc.topBlock instanceof ReporterBlockMorph ||
                    proc.isShowingResult || proc.exportResult) {
                result = proc.homeContext.inputs[0];
                if (proc.onComplete instanceof Function) {
                    proc.onComplete(result);
                } else {
                    if (result instanceof List) {
                        if (result.isADT()) {
                            // compute the ADT's dynamic view
                            proc.pushContext();
                            proc.homeContext.inputs.pop();
                            proc.evaluate(
                                proc.reportListItem('_morph', result)
                            );
                            remaining.push(proc);
                        } else {
                            proc.topBlock.showBubble(
                                result.isTable() ?
                                        new TableFrameMorph(
                                            new TableMorph(result)
                                        )
                                        : new ListWatcherMorph(result),
                                proc.exportResult,
                                proc.receiver
                            );
                        }
                    } else {
                        proc.topBlock.showBubble(
                            result,
                            proc.exportResult,
                            proc.receiver
                        );
                    }
                }
            } else if (proc.onComplete instanceof Function) {
                proc.onComplete(proc.homeContext.inputs[0]);
            }
        } else {
            remaining.push(proc);
        }
    });
    this.processes = remaining;
};

ThreadManager.prototype.stepHalos = function () {
    var remaining = [];
    this.halos.forEach(block => {
        block.afterglow -= 1;
        if (block.afterglow < 1) {
            block.removeHighlight();
        } else {
            remaining.push(block);
        }
    });
    this.halos = remaining;
};

ThreadManager.prototype.findProcess = function (block, receiver) {
    var top = block.topBlock();
    return detect(
        this.processes,
        each => each.topBlock === top && (each.receiver === receiver)
    );
};

ThreadManager.prototype.processesForBlock = function (block, only) {
    var top = only ? block : block.topBlock();
    return this.processes.filter(each =>
        each.topBlock === top &&
            each.isRunning() &&
                !each.isDead
    );
};

ThreadManager.prototype.toggleSingleStepping = function () {
    Process.prototype.enableSingleStepping =
        !Process.prototype.enableSingleStepping;
    if (!Process.prototype.enableSingleStepping) {
        this.processes.forEach(proc => {
            if (!proc.isPaused) {
                proc.unflash();
            }
        });
    }
};

ThreadManager.prototype.clickFrameFor = function (block) {
    // private - answer a variable frame or null containing upvar declarations
    // in certain hat blocks if the user manually clicks on them
    var name, frame;
    if (block instanceof HatBlockMorph) {
        if (block.selector === 'receiveKey' ||
                block.selector === 'receiveMessage') {
            name = block.inputs()[1].evaluate()[0];
            if (name) {
                frame = new VariableFrame();
                frame.addVar(name, '');
                return frame;
            }
        }
    }
    return null;
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
    canBroadcast        boolean, used to control reentrancy & "when stopped"
*/

Process.prototype = {};
Process.prototype.constructor = Process;
Process.prototype.timeout = 500; // msecs after which to force yield
Process.prototype.isCatchingErrors = true;
Process.prototype.isCaseInsensitive = true; // text comparison
Process.prototype.enableHyperOps = true;
Process.prototype.enableLiveCoding = false; // experimental
Process.prototype.enableSingleStepping = false;
Process.prototype.enableCompiling = false; // experimental
Process.prototype.flashTime = 0;
Process.prototype.enableJS = false;

function Process(topBlock, receiver, onComplete, yieldFirst) {
    this.topBlock = topBlock || null;
    this.receiver = receiver;
    this.instrument = receiver ? receiver.instrument : null;
    this.readyToYield = false;
    this.readyToTerminate = false;
    this.isDead = false;
    this.isClicked = false;
    this.isShowingResult = false;
    this.wantsHalo = false;
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
    this.currentTime = Date.now(); // keeping track of time between yields
    this.frameCount = 0; // only used for profiling and debugging
    this.stepFrameCount = 0; // keeping track of when to keep time
    this.yieldCount = 0; // only used for profiling and debugging
    this.exportResult = false;
    this.onComplete = onComplete || null;
    this.procedureCount = 0;
    this.flashingContext = null; // for single-stepping
    this.isInterrupted = false; // for single-stepping
    this.canBroadcast = true; // used to control "when I am stopped"
    this.isAnimated = false; // temporary - used to control yields for animation
    this.isGenericCondition = false; // used for displaying halos
    this.hasFiredGenericCondition = false; // used for displaying halos
    this.isSilentVar = false; // silences missing variable references in widgets

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
    return !this.readyToTerminate && (this.context || this.isPaused);
};

// Process entry points

Process.prototype.runStep = function (deadline) {
    // a step is an an uninterruptable 'atom', it can consist
    // of several contexts, even of several blocks

    this.isAnimated = false;

    if (this.isPaused) { // allow pausing in between atomic steps:
        return this.pauseStep();
    }
    this.readyToYield = false;
    this.isInterrupted = false;

    // repeatedly evaluate the next context (stack frame) until
    // it's time to yield. In case of WARP or infinite recursive
    // reporters (or long HOFs) emergency-yield every 500 ms.
    // Since looking up the current time at every stack frame puts
    // an amazing strain on performance, only check the system time
    // every n (=100) contexts.
    // This is happens over at evaluateContext().
    while (!this.readyToYield && !this.isInterrupted
            && this.context
            && (this.currentTime - this.lastYield < this.timeout)
    ) {
        // also allow pausing inside atomic steps - for PAUSE block primitive:
        if (this.isPaused) {
            return this.pauseStep();
        }
        if (deadline && (this.currentTime > deadline)) {
            if (this.isAtomic &&
                    this.homeContext.receiver &&
                    this.homeContext.receiver.endWarp) {
                this.homeContext.receiver.endWarp();
            }
            return;
        }
        this.evaluateContext();
    }

    this.stepFrameCount = 0;
    this.yieldCount += 1;
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
    this.canBroadcast = false;
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

    // keep track of overall frames for profiling purposes.
    // also keep track of frames inside the current atomic step.
    // In order to let Snap! behave similarly on a wide range of
    // differently performant hardware decide when to yield inside
    // a WARPed script or an infinitely recursive reporter
    // by how much time has elapsed since the last yield, but since
    // looking up the system time is surprisingly costly only look it
    // up every 100 frames.
    this.frameCount += 1;
    this.stepFrameCount += 1;
    if (this.stepFrameCount > 100) {
        this.currentTime = Date.now();
        this.stepFrameCount = 0;
    }

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
    if (exp instanceof ArgMorph || (exp && exp.bindingID)) {
        return this.evaluateInput(exp);
    }
    if (exp instanceof BlockMorph || exp instanceof InputList) {
        return this.evaluateBlock(exp, exp.inputs().length);
    }
    if (isString(exp)) {
        return this[exp].apply(this, this.context.inputs);
    }
    if (exp instanceof Variable) { // special case for empty reporter rings
        this.returnValueToParentContext(exp.value);
    }
    this.popContext(); // default: just ignore it
};

Process.prototype.evaluateBlock = function (block, argCount) {
    var rcvr, inputs,
    	selector = block.selector;

    // check for special forms
    if (selector === 'reportVariadicOr' ||
            selector ===  'reportVariadicAnd' ||
            selector === 'doIf' ||
            selector === 'reportIfElse' ||
            selector === 'doReport') {
        if (this.isCatchingErrors) {
            try {
                return this[selector](block);
            } catch (error) {
                this.handleError(error, block);
            }
        } else {
            return this[selector](block);
        }
    }

    // first evaluate all inputs, then apply the primitive
    rcvr = this.context.receiver || this.receiver;
    inputs = this.context.inputs;

    if (argCount > inputs.length) {
        // this.evaluateNextInput(block);
        this.evaluateNextInputSet(block); // frame-optimized version
    } else {
        if (!this.isAnimated) {
            this.isAnimated =
                SpriteMorph.prototype.blocks[selector]?.animation || false;
        }
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

// Process: Primitive Extensions (for libraries etc.)

Process.prototype.doPrimitive = nop;

Process.prototype.doApplyExtension = function (prim, args) {
    this.reportApplyExtension(prim, args);
};

Process.prototype.reportApplyExtension = function (prim, args) {
    var ext = SnapExtensions.primitives.get(prim);
    if (isNil(ext)) {
        throw new Error(
            localize('missing / unspecified extension') + ': ' + prim
        );
    }
    return ext.apply(
        this.blockReceiver(),
        args.itemsArray().concat([this])
    );
};

// Process: Special Forms Blocks Primitives

Process.prototype.reportVariadicOr = function (block) {
    this.reportAssociativeBool(
        block,
        this.reportBasicOr, // base op
        true // short-circuit return value
    );
};

Process.prototype.reportVariadicAnd = function (block) {
    this.reportAssociativeBool(
        block,
        this.reportBasicAnd, // base op
        false // short-circuit return value
    );
};

Process.prototype.reportAssociativeBool = function (block, baseOp, short) {
    // private - evaluate special form variadic associative Boolean operations
    // such as AND, OR
    // baseOp - dyadic base operation (AND, OR)
    // short - value at which to immediately return (short circuit)
    var inputs = this.context.inputs,
        tests = block.inputs()[0],
        inline = tests instanceof MultiArgMorph,
        outer = this.context.outerContext,
        acc = this.context.accumulator,
        check = slot => {
            if (slot instanceof List || typeof slot === 'boolean') {
                inputs.push(slot);
            } else {
                this.pushContext();
                this.evaluate(slot);
            }
        };
    if (inputs.length < 1) {
        if (inline) {
            acc = this.context.accumulator = {
                slots: tests.inputs(),
                len: tests.inputs().length,
                pc: 1
            };
            if (acc.slots.length) {
                this.pushContext(acc.slots[0], outer);
            } else {
                this.context.addInput(!short);
            }
        } else { // tests is an ArgLabelMorph
            this.pushContext(tests.argMorph(), outer);
        }
    } else if (inputs.length === 1) {
        if (acc) { // inline - acc has been initialized
            if (inputs[0] === short) {
                if (this.flashContext()) {return; }
                this.returnValueToParentContext(short);
                this.popContext();
            } else if (acc.pc >= acc.len) {
                if (this.flashContext()) {return; }
                this.returnValueToParentContext(
                    inputs[0] === null ? !short : inputs[0]
                );
                this.popContext();
            } else {
                if (inline) {
                    this.pushContext(acc.slots[acc.pc], outer);
                } else {
                    check(acc.slots[acc.pc]);
                }
            }
        } else { // "with input list" variant
            this.context.accumulator = {
                slots: inputs[0].itemsArray(),
                len: inputs[0].length(),
                pc: 1
            };
            inputs.pop();
            check(this.context.accumulator.slots[0]);
        }
    } else {
        if (this.flashContext()) {return; }
        inputs.push(this.hyper(
            baseOp,
            inputs.pop(),
            inputs.pop()
        ));
        acc.pc += 1;
    }
};

Process.prototype.reportBasicOr = function (a, b) {
    return a || b;
};

Process.prototype.reportBasicAnd = function (a, b) {
    return a && b;
};

Process.prototype.doReport = function (block) {
    var outer = this.context.outerContext;
    if (this.flashContext()) {return; } // flash the block here, special form
    if (this.isClicked && (block.topBlock() === this.topBlock)) {
        this.isShowingResult = true;
    }
    if (block.partOfCustomCommand) {
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
    // an HTTP Request for a hardware extension
    this.pushContext(block.inputs()[0], outer);
    this.context.isCustomCommand = block.partOfCustomCommand;
};

// Process: Non-Block evaluation

Process.prototype.evaluateMultiSlot = function (multiSlot, argCount) {
    // first evaluate all subslots, then return a list of their values
    var inputs = this.context.inputs,
        ans, i;
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
            // this.evaluateNextInput(multiSlot);
            this.evaluateNextInputSet(multiSlot); // frame-optimized version
        } else {
            // declare a new script var in the current context for every
            // variable template, excluding formal ring parameters
            if (['%t', '%upvar'].includes(multiSlot.slotSpec) && // var template
                !(multiSlot.parentThatIsA(BlockMorph) instanceof RingMorph)
            ) {
                inputs.forEach(vname =>
                    this.context.outerContext.variables.addVar(vname)
                );
            } else if (multiSlot.slotSpec instanceof Array) { // input group
                if (multiSlot.slotSpec.includes('%t') ||
                    multiSlot.slotSpec.includes('%upvar')
                ) { // identify and declare every upvar
                    for (i = 0; i < inputs.length; i += 1) {
                        if (['%t', '%upvar'].includes(
                            multiSlot.slotSpec[i % multiSlot.slotSpec.length]
                        )) {
                            this.context.outerContext.variables.addVar(
                                inputs[i]
                            );
                        }
                    }
                }
                if (inputs.length &&
                    multiSlot.groupInputs > 1 &&
                    !['%receive', '%send', '%survey'].includes(
                        multiSlot.elementSpec
                    )
                ) {
                    // format the inputs as 2D table, unless it's a "built-in"
                    // group, e.g. for broadcast, scene changes etc.
                    ans = new List(inputs);
                    inputs = this.reportNumbers(1, ans.length()).reshape(
                        new List([0, multiSlot.slotSpec.length])
                    ).map(indices => ans.query(indices)).itemsArray();
                }
            }
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
        if (ans && this.isAutoLambda(input)) {
            ans = this.reify(ans, new List());
        }

    }
    this.returnValueToParentContext(ans);
    this.popContext();
};

Process.prototype.isAutoLambda = function (inputSlot) {
    if ([
        'doForever',
        'doRepeat',
        'doUntil',
        'doIfElse',
        'doWarp',
        'doFor',
        'doForEach'
    ].includes(inputSlot.parent?.selector)) {
        // special cases when overloading those primitives
        // with custom block definitions
        return false;
    }
    return inputSlot.constructor === CommandSlotMorph ||
        inputSlot.constructor === ReporterSlotMorph ||
        (inputSlot instanceof CSlotMorph && (
            !inputSlot.isStatic ||
            inputSlot.isLambda ||
            inputSlot.parentThatIsA(BlockMorph)?.isCustomBlock
        )
    );
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
            } else if (sel === 'doUntil' || sel === 'doWaitUntil') {
                this.pushContext(exp, outer);
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

Process.prototype.evaluateNextInputSet = function (element) {
    // Optimization to use instead of evaluateNextInput(), bums out a few
    // frames and function calls to save some milliseconds.
    // the idea behind this optimization is to keep evaluating the inputs
    // while we know for sure that we aren't going to yield anyway
    var args = element.inputs(),
        sel = this.context.expression?.selector,
        outer = this.context.outerContext, // for tail call elimination
        exp, ans;

    while (args.length > this.context.inputs.length) {
        exp = args[this.context.inputs.length];
        if (exp.isUnevaluated) {
            if (exp.isUnevaluated === true || exp.isUnevaluated()) {
                if (sel === 'reify' || sel === 'reportScript') {
                    this.context.addInput(exp);
                } else if (sel === 'doUntil' || sel === 'doWaitUntil') {
                    this.pushContext(exp, outer);
                    break;
                } else {
                    this.context.addInput(this.reify(exp, new List()));
                }
            } else {
                this.pushContext(exp, outer);
                break;
            }
        } else {
            if (exp instanceof MultiArgMorph || exp instanceof ArgLabelMorph ||
                    exp instanceof BlockMorph) {
                 this.pushContext(exp, outer);
                 break;
            } else { // asuming an ArgMorph
                if (this.flashContext()) {return; } // yield to flash
                if (exp.bindingID) {
                    if (this.isCatchingErrors) {
                        try {
                            ans = this.context.variables.getVar(exp.bindingID);
                        } catch (error) {
                            this.handleError(error, exp);
                        }
                    } else {
                        ans = this.context.variables.getVar(exp.bindingID);
                    }
                } else {
                    ans = exp.evaluate();
                    if (ans && this.isAutoLambda(exp)) {
                        ans = this.reify(ans, new List());
                    }
                }
                this.context.addInput(ans);
            }
        }
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

Process.prototype.throwError = function (error, element) {
    var m = element,
        ide = this.homeContext.receiver.parentThatIsA(IDE_Morph);
    this.stop();
    this.errorFlag = true;
    this.topBlock.addErrorHighlight();
    if (ide.isAppMode) {
        ide.showMessage(localize(error.name) + '\n' + error.message);
    } else {
        if (isNil(m) || isNil(m.world())) {m = this.topBlock; }
        m.showBubble(
            this.errorBubble(error, element),
            this.exportResult,
            this.receiver
        );
    }
};

Process.prototype.tryCatch = function (action, exception, errVarName) {
    var next = this.context.continuation();

    this.handleError = function(error) {
        this.resetErrorHandling();
        if (exception.expression instanceof CommandBlockMorph) {
            exception.expression = exception.expression.blockSequence();
        }
        exception.pc = 0;
        exception.outerContext.variables.addVar(errVarName);
        exception.outerContext.variables.setVar(errVarName, error.message);
        this.context = exception;
        this.evaluate(next, new List(), true);
    };

    this.evaluate(action, new List(), true);
};

Process.prototype.resetErrorHandling = function () {
    this.handleError = this.throwError;
};

Process.prototype.resetErrorHandling();

Process.prototype.errorObsolete = function () {
    throw new Error('a custom block definition is missing');
};

Process.prototype.errorBubble = function (error, element) {
    // Return a morph containing an image of the elment causing the error
    // above the text of error.
    var errorMorph = new AlignmentMorph('column', 5),
        errorIsNested = !!element && isNil(element.world()),
        errorPrefix = errorIsNested ? `${localize('Inside a custom block')}\n`
            : '',
        errorMessage = new TextMorph(
            `${errorPrefix}${localize(error.name)}\n${localize(error.message)}`,
            SyntaxElementMorph.prototype.fontSize
        ),
        blockToShow = element;

    errorMorph.add(errorMessage);

    if (errorIsNested && error.cause !== 'user') {
        if (blockToShow.selector === 'reportGetVar') {
            // if I am a single variable, show my caller in the output.
            blockToShow = blockToShow.parent || blockToShow;
        }
        errorMorph.children[0].text +=
            `\n${localize('The question came up at')}`;
        errorMorph.children[0].fixLayout();
        errorMorph.add(blockToShow.fullCopy());
    }

    errorMorph.fixLayout();
    return errorMorph;
};

Process.prototype.variableError = function (varName) {
    throw new Error(
        localize('a variable of name')
            + ' \''
            + varName.toString()
            + '\'\n'
            + localize('does not exist in this context')
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

    if (this.context?.expression instanceof RingMorph) {
        context.comment = this.context.expression?.comment?.text();
    }
    if (topBlock) {
        context.expression = this.enableLiveCoding ||
            this.enableSingleStepping ?
                topBlock : topBlock.fullCopy();
        context.expression.show(); // be sure to make visible if in app mode

        if (!isCustomBlock && !parameterNames.length()) {
            // mark all empty slots with an identifier
            context.expression.allEmptySlots().forEach(slot => {
                i += 1;
                if (slot instanceof MultiArgMorph) {
                    slot.bindingID = Symbol.for('arguments');
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

    context.inputs = parameterNames.itemsArray();
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
    if (!this.enableJS) {
        throw new Error('JavaScript extensions for Snap!\nare turned off');
    }
    return Function.apply(
        null,
        parmNames.itemsArray().concat([body])
    );
};

Process.prototype.doRun = function (context, args) {
    return this.evaluate(context, args, true);
};

Process.prototype.evaluate = function (
    context,
    args = new List(),
    isCommand = false
) {
    if (!context) {
        return this.returnValueToParentContext(null);
    }
    if (context instanceof Function) {
        return context.apply(
            this.blockReceiver(),
            args.itemsArray().concat([this])
        );
    }
    if (context.isContinuation) {
        return this.runContinuation(context, args);
    }
    if (context instanceof List) {
        if (context.canBeJSON() && isCommand) {
            return;
        }
        return this.hyperEval(context, args);
    }
    if (context instanceof BlockMorph) {
        return this.evaluate(
            context.fullCopy().reify(),
            new List(),
            context instanceof CommandBlockMorph
        );
    }
    if (!(context instanceof Context)) {
        if (isCommand) {
            return this.returnValueToParentContext(null);
        }
        throw new Error('expecting a ring but getting ' + context);
    }

    var outer = new Context(null, null, context.outerContext),
        caller = this.context.parentContext,
        cont = this.context.rawContinuation(!isCommand),
        exit,
        runnable,
        expr,
        parms = args.itemsArray(),
        i,
        value,
        csym = Symbol.for('caller'),
        lastCaller = this.context.variables.silentFind(csym)?.vars[csym].value,
        isRecursiveCall = () => lastCaller instanceof Context &&
            this.context.expression === lastCaller.expression;

    if (!outer.receiver) {
        outer.receiver = context.receiver; // for custom blocks
    }
    runnable = new Context(
        this.context.parentContext,
        context.expression,
        outer,
        context.receiver
    );
    runnable.isCustomCommand = isCommand; // for short-circuiting HTTP requests
    this.context.parentContext = runnable;

    if (context.expression instanceof ReporterBlockMorph) {
        // auto-"warp" nested reporters
        this.readyToYield = (this.currentTime - this.lastYield > this.timeout);
    }

    // assign a self-reference for introspection and recursion
    outer.variables.addVar(Symbol.for('self'), context);

    // capture the current continuation
    outer.variables.addVar(Symbol.for('continuation'), cont);

    // capture the dynamic scope in "this caller"
    // only capture the caller once in repeating recursive calls
    // to prevent TCO memory leaks
    outer.variables.addVar(csym, isRecursiveCall() ? lastCaller : this.context);

    // assign arguments to parameters

    // assign the actual arguments list to the special
    // parameter ID Symbol.for('arguments'), to be used for variadic inputs
    outer.variables.addVar(Symbol.for('arguments'), args);

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
        // in case there is only one input
        // assign it to all empty slots...
        if (parms.length === 1) {
            // ... unless it's an empty reporter ring,
            // in which special case it gets treated as the ID-function;
            if (!context.emptySlots) {
                expr = context.expression;
                if (expr instanceof Array &&
                        expr.length === 1 &&
                        expr[0].selector &&
                        expr[0].selector === 'reifyReporter' &&
                        !expr[0].contents()) {
                    runnable.expression = new Variable(parms[0]);
                }
            } else {
                for (i = 1; i <= context.emptySlots; i += 1) {
                    outer.variables.addVar(i, parms[0]);
                }
            }
        // otherwise match the inputs sequentially to the empty slots,
        // disregard unmatched or excess inputs or slots
        } else {
            for (i = 1; i <= parms.length; i += 1) {
                outer.variables.addVar(i, parms[i - 1]);
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

Process.prototype.hyperEval = function (context, args) {
    // hyper-monadic deep-map
    // note: currently only literal inputs are supported in hyper-calls
    var mapBlock = SpriteMorph.prototype.blockForSelector('reportMap'),
        callBlock = SpriteMorph.prototype.blockForSelector('evaluate'),
        varBlock = SpriteMorph.prototype.variableBlock('fn'),
        argsBlock = this.assertType(args, 'JSON').blockify(),
        funArg;

    callBlock.replaceInput(callBlock.inputs()[0], varBlock);
    callBlock.replaceInput(callBlock.inputs()[1], argsBlock);
    funArg = this.reify(callBlock, new List(['fn']));

    this.popContext();
    this.pushContext(mapBlock);
    this.context.inputs = [funArg, context];
    this.pushContext();
};

Process.prototype.fork = function (context, args) {
    if (this.readyToTerminate) {return; }
    var proc = new Process(),
        stage = this.homeContext.receiver.parentThatIsA(StageMorph);
    proc.instrument = this.instrument;
    proc.receiver = this.receiver;
    proc.initializeFor(context, args);
    // proc.pushContext('doYield');
    stage.threads.processes.push(proc);
};

Process.prototype.initializeFor = function (context, args) {
    // used by Process.fork() and global invoke()
    if (context.isContinuation) {
        throw new Error(
            'continuations cannot be forked'
        );
    }
    if (!(context instanceof Context)) {
        throw new Error(
            localize('expecting a') + ' ' +
            localize('ring') + ' ' +
            localize('but getting a') + ' ' +
            localize(this.reportTypeOf(context))
        );
    }

    var outer = new Context(null, null, context.outerContext),
        runnable = new Context(null,
            context.expression,
            outer
            ),
        parms = args.itemsArray(),
        i,
        value;

    // remember the receiver
    this.context = context.receiver;

    // assign arguments to parameters

    // assign the actual arguments list to the special
    // parameter ID Symbol.for('arguments'), to be used for variadic inputs
    outer.variables.addVar(Symbol.for('arguments'), args);

    // assign arguments that are actually passed
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
            // in case there is only one input
            // assign it to all empty slots
            if (parms.length === 1) {
                for (i = 1; i <= context.emptySlots; i += 1) {
                    outer.variables.addVar(i, parms[0]);
                }

            // otherwise match the inputs sequentially to the empty slots,
            // disregard unmatched or excess inputs or slots
            } else {
                for (i = 1; i <= parms.length; i += 1) {
                    outer.variables.addVar(i, parms[i - 1]);
                }
            }
        }
    }

    if (runnable.expression instanceof CommandBlockMorph) {
        runnable.expression = runnable.expression.blockSequence();
    }

    this.homeContext = new Context(); // context.outerContext;
    this.homeContext.receiver = context.outerContext.receiver;
    this.topBlock = context.expression;
    this.context = runnable;
};

// Process introspection

Process.prototype.reportEnvironment = function (choice, trgt = this.context) {
    switch (this.inputOption(choice)) {
    case 'caller':
        return this.reportCaller(trgt);
    case 'continuation':
        return this.reportContinuation(trgt);
    case 'inputs':
        return this.reportInputs(trgt);
    case 'object':
        return this.reportData(trgt);
    default:
        return this.reportSelf(trgt);
    }
};

Process.prototype.reportSelf = function (trgt) {
    var sym = Symbol.for('self'),
        frame = trgt.variables.silentFind(sym),
        ctx;
    if (frame) {
        ctx = copy(frame.vars[sym].value);
    } else {
        ctx = this.topBlock.reify();
    }
    ctx.outerContext = trgt.outerContext;
    if (ctx.outerContext) {
        ctx.variables.parentFrame = ctx.outerContext.variables;
    }
    if (!this.isAtomic &&
        this.context.expression.parent?.selector === 'doRun'
    ) {
        // assume direct recursion of a command block,
        // yield to ensure smooth animations
        this.readyToYield = true;
    }
    return ctx;
};

Process.prototype.reportCaller = function (trgt) {
    var sym = Symbol.for('caller'),
        frame = trgt.variables.silentFind(sym),
        ctx, nb;
    if (frame) {
        ctx = copy(frame.vars[sym].value);
        // ctx.expression = ctx.expression?.topBlock().fullCopy();
        ctx.expression = ctx.expression?.fullCopy();
        nb = ctx.expression?.nextBlock ? ctx.expression.nextBlock() : null;
        if (nb) {
            nb.destroy();
        }
        ctx.inputs = [];
        return ctx;
    }
    return this.blockReceiver();
};

Process.prototype.reportContinuation = function (trgt) {
    var sym = Symbol.for('continuation'),
        frame = trgt.variables.silentFind(sym),
        cont;
    if (frame) {
        cont = frame.vars[sym].value;
        cont = cont.copyForContinuation();
        cont.tag = null;
        cont.isContinuation = true;
    } else {
        cont = new Context(
            null,
            'popContext'
        );
        cont.isContinuation = true;
    }
    return cont;
};

Process.prototype.reportInputs = function (trgt) {
    var sym = Symbol.for('arguments'),
        frame = trgt.variables.silentFind(sym);
    return frame ? frame.vars[sym].value : new List();
};

Process.prototype.reportData = function (trgt) {
    var data = trgt.variables;
    while (!isNil(data)) {
        if (data instanceof List) {
            return data;
        }
        if (isSnapObject(data.owner)) {
            return data.owner;
        }
        data = data.parentFrame;
    }
    return data;
};

// Process custom block slot primitives

Process.prototype.doSetSlot = function(name, value) {
    var sym = Symbol.for('block'),
        frame, block, slot, subslots;
    if (!name) {return; }
    frame = this.context.variables.silentFind(sym);
    if (!frame) {return; }
    block = frame.getVar(sym);
    if (block.isCustomBlock) {
        slot = block.inputSlotNamed(name);
        if (slot instanceof InputSlotMorph) {
            slot.setContents(value.toString());
        } else if (slot instanceof BooleanSlotMorph) {
            slot.setContents(value);
        } else if (slot instanceof MultiArgMorph) {
            if (!(value instanceof List)) {
                value = new List([value]);
            }
            slot.expandTo(value.length());
            subslots = slot.inputs();
            value.itemsArray().forEach((item, i) => {
                if (subslots[i] instanceof InputSlotMorph) {
                    subslots[i].setContents(
                        isNil(item) ? '' : item.toString()
                    );
                } else if (subslots[i] instanceof BooleanSlotMorph) {
                    subslots[i].setContents(item);
                }
            });
        }
    }
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
        new List([this.context.continuation(isReporter)]),
        !isReporter
    );
};

Process.prototype.reportCallCC = function (aContext) {
    this.doCallCC(aContext, true);
};

Process.prototype.runContinuation = function (aContext, args) {
    var parms = args.itemsArray();

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
    if (this.context.expression instanceof CustomHatBlockMorph &&
        !this.context.accumulator
    ) {
        return this.evaluateCustomHatBlock();
    }

    var caller = this.context.parentContext,
        block = this.context.expression,
        method = block.isGlobal ? block.definition
                : this.blockReceiver().getMethod(block.semanticSpec),
        context = method.body,
        declarations = method.declarations,
        cont = this.context.rawContinuation(method.type !== 'command'),
        args = new List(this.context.inputs),
        parms = args.itemsArray(),
        runnable,
        exit,
        i,
        value,
        outer,
        csym = Symbol.for('caller'),
        lastCaller = this.context.variables.silentFind(csym)?.vars[csym].value,
        isRecursiveCall = () => {
            var clrBlock = lastCaller?.expression,
                clr;
            if (clrBlock instanceof BlockMorph && clrBlock.isCustomBlock) {
                clr = clrBlock.isGlobal ? clrBlock.definition
                        : this.blockReceiver().getMethod(clrBlock.semanticSpec);
            }
            return clr === method;
        };

    if (!context) {return null; }
    this.procedureCount += 1;
    outer = new Context();
    outer.receiver = this.context.receiver;

    outer.variables.parentFrame = block.variables;

    // block (instance) var support:
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
            if (declarations.get(context.inputs[i])[0] === '%upvar') {
                this.context.outerContext.variables.vars[value] =
                    outer.variables.vars[context.inputs[i]];
            }
        }
    }

    // tag return target
    if (method.type !== 'command') {
        // clear previous exit tags, if any
        runnable.expression.tagExitBlocks(undefined, false);
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
        this.readyToYield = (this.currentTime - this.lastYield > this.timeout);
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

    // keep track of the environment for recursion and introspection
    outer.variables.addVar(Symbol.for('self'), context);
    outer.variables.addVar(Symbol.for('continuation'), cont);
    outer.variables.addVar(Symbol.for('arguments'), args);

    // only capture the caller once in repeating recursive calls
    // to prevent TCO memory leaks
    outer.variables.addVar(csym, isRecursiveCall() ? lastCaller : this.context);

    runnable.expression = runnable.expression.blockSequence();
};

// Process variables primitives

Process.prototype.doDeclareVariables = function (varNames) {
    // create script variable entries for the given names.
    // this method is no longer needed, because script variables
    // are now automatically created for every variadic variable
    // template. See evaluateMultiSlot().
    // This method is currently only retained for its selector and
    // is marked for deprecation in v10.
    nop(varNames);

    // former code - retained for documentation
    /*
    var varFrame = this.context.outerContext.variables;
    varNames.itemsArray().forEach(name =>
        varFrame.addVar(name)
    );
    */
};

Process.prototype.mergeVariables = function () {
    this.context.outerContext.variables.addVar(
        Symbol.for('block'),
        this.context.expression.block // expression is an InputList
    );
    // bind a copy of the block instance to "this caller"
    // not entirely convinced about the benefits, but let's play with it
    this.context.outerContext.variables.addVar(
        Symbol.for('caller'),
        this.context.expression.block.fullCopy().reify()
    );
    this.context.expression.names.forEach((name, i) =>
        this.context.outerContext.variables.addVar(name, this.context.inputs[i])
    );
    this.context.expression.block.variables.parentFrame =
        this.context.outerContext.variables.parentFrame;
    this.context.outerContext.variables.parentFrame =
        this.context.expression.block.variables;
};

Process.prototype.doSetVar = function (varName, value) {
    var varFrame = this.context.variables,
        name = varName;
    if (name instanceof Context) {
        if (name.expression.selector === 'reportGetVar') {
            name.variables.setVar(
                name.expression.blockSpec,
                value,
                this.blockReceiver()
            );
            return;
        }
        this.doSet(name, value);
        return;
    }
    if (name instanceof Array) {
        this.doSet(name, value);
        return;
    }
    varFrame.setVar(name, value, this.blockReceiver());
};

Process.prototype.doChangeVar = function (varName, value) {
    var varFrame = this.context.variables,
        name = varName;
    this.assertType(value, ['number', 'list'], '');
    if (name instanceof Context) {
        if (name.expression.selector === 'reportGetVar') {
            name.variables.changeVar(
                name.expression.blockSpec,
                value,
                this.blockReceiver()
            );
            return;
        }
    } else if (name instanceof List) {
        this.hyperChangeBy(name, value);
        return; // do not shadow in this case (problematic, experimental)
    }
    varFrame.changeVar(name, value, this.blockReceiver());
};

Process.prototype.reportGetVar = function () {
    // assumes a getter block whose blockSpec is a variable name
    return this.context.variables.getVar(
        this.context.expression.blockSpec,
        this // fallback for OOP 2.0 List environments
    );
};

Process.prototype.doShowVar = function (varName, context) {
    // context is an optional start-context to be used by extensions
    var varFrame = (context || (this.context || this.homeContext)).variables,
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
            this.blockReceiver().changeBlockVisibility(name.expression, false);
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
                morph => morph instanceof WatcherMorph &&
                    morph.target === target &&
                        morph.getter === name
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
            watcher.rerender();
        }
    }
};

Process.prototype.doHideVar = function (varName, context) {
    // if no varName is specified delete all watchers on temporaries
    // context is an optional start-context to be used by extensions
    var varFrame = (context || this.context).variables,
        stage,
        watcher,
        target,
        name = varName;

    if (name instanceof Context) {
        if (name.expression.selector === 'reportGetVar') {
            name = name.expression.blockSpec;
        } else {
            this.blockReceiver().changeBlockVisibility(name.expression, true);
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
                morph => morph instanceof WatcherMorph &&
                    morph.target === target &&
                        morph.getter === name
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
            stage.watchers().forEach(watcher => {
                if (watcher.isTemporary()) {
                    watcher.destroy();
                }
            });
        }
    }
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

// message passing primitives

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
        list = this.shadowListAttribute(list);
    }
    list.add(element);
};

Process.prototype.doDeleteFromList = function (index, list) {
    var idx = index;
    this.assertType(list, 'list');
    if (list.type) {
        list = this.shadowListAttribute(list);
    }
    if (this.inputOption(index) === 'all') {
        return list.clear();
    }
    if (index === '') {
        return null;
    }
    if (this.inputOption(index) === 'last') {
        idx = list.length();
    } else if (this.inputOption(index) === 'parent') {
        idx = '...';
    }
    list.forget(idx);
};

Process.prototype.doInsertInList = function (element, index, list) {
    var idx = index;
    this.assertType(list, 'list');
    if (list.type) {
        this.assertType(element, list.type);
        list = this.shadowListAttribute(list);
    }
    if (index === '') {
        return null;
    }
    if (index instanceof Array) {
        if (index[0] === 'random') {
            idx = this.reportBasicRandom(1, list.length() + 1);
        } else if (index[0] === 'last') {
            idx = list.length() + 1;
        } else if (index[0] === 'parent') {
            idx = '...';
        } else {
            idx = list.length() + 1;
        }
    }
    if (parseFloat(idx) !== +idx) { // treat as alphanumerical index
        if (element instanceof Context) { // OOP 2.0: treat ring as method
            element = this.reportContextFor(element, list);
        }
        return list.bind(idx, element);
    }
    list.add(element, idx);
};

Process.prototype.doReplaceInList = function (index, list, element) {
    var idx = index;
    this.assertType(list, 'list');
    if (list.type) {
        this.assertType(element, list.type);
        list = this.shadowListAttribute(list);
    }
    if (index === '') {
        return null;
    }
    if (index instanceof Array) {
        if (index[0] === 'random') {
            idx = this.reportBasicRandom(1, list.length() + 1);
        } else if (index[0] === 'last') {
            idx = list.length();
        } else if (index[0] === 'parent') {
            idx = '...';
        } else {
            idx = 0;
        }
    }
    if (element instanceof Context && (parseFloat(idx) !== +idx)) {
        // OOP 2.0: treat ring as method
        element = this.reportContextFor(element, list);
    }
    list.bind(idx, element);
};

Process.prototype.shadowListAttribute = function (list) {
    // private - check whether the list is an attribute that needs to be
    // shadowed. Use only on typed lists for performance.
    var rcvr;
    if (list.type === 'costume' || list.type === 'sound') {
        rcvr = this.blockReceiver();
        if (list === rcvr.costumes) {
            rcvr.shadowAttribute('costumes');
            list = rcvr.costumes;
        } else if (list === rcvr.sounds) {
            rcvr.shadowAttribute('sounds');
            list = rcvr.sounds;
        }
    }
    return list;
};

// Process accessing list elements - hyper dyadic

Process.prototype.reportListItem = function (index, list) {
    var value;
    this.assertType(list, 'list');
    if (index === '') {
        return '';
    }
    if (index instanceof Array) {
        if (index[0] === 'random') {
            return list.at(this.reportBasicRandom(1, list.length()));
        }
        if (index[0] === 'last') {
            return list.at(list.length());
        }
        if (index[0] === 'parent') {
            index = '...';
        } else {
            // return '';
            return this.reportListItem(index[0], list); // support selector keys
        }
    }
    if (index instanceof List && this.enableHyperOps) {
        return list.query(index);
    }
    value = list.lookup(index);
    if (value instanceof Context && (parseFloat(index) !== +index)) {
        // treat the ring as macro and bind it to the list as environment
        // for OOP 2.0
        value = this.reportContextFor(value, list);
    }
    return value;
};

// Process - tabular list ops

Process.prototype.reportTranspose = function (list) {
    this.assertType(list, 'list');
    return list.transpose();
};

Process.prototype.reportCrossproduct = function (lists) {
    this.assertType(lists, 'list');
    if (lists.isEmpty()) {
        return lists.cons(new List(), lists);
    }
    this.assertType(lists.at(1), 'list');
    return lists.crossproduct();
};

Process.prototype.reportReshape = function (list, shape) {
    this.assertType(shape, 'list');
    list = list instanceof List ? list : new List([list]);
    return list.reshape(shape);
};

Process.prototype.reportSlice = function (list, indices) {
    // currently not in use
    this.assertType(list, 'list');
    this.assertType(indices, 'list');
    return list.slice(indices);
};

// Process - other basic list accessors

Process.prototype.reportListAttribute = function (choice, list) {
    var option = this.inputOption(choice);
    switch (option) {
    case 'length':
        this.assertType(list, 'list');
        return list.length();
    case 'size':
        this.assertType(list, 'list');
        return list.size();
    case 'rank':
        return this.reportRank(list);
    case 'dimensions':
        return this.reportDimensions(list);
    case 'flatten':
        return list instanceof List ? list.ravel() : new List([list]);
    case 'columns':
        this.assertType(list, 'list');
        return list.columns();
    case 'transpose':
        this.assertType(list, 'list');
        return list.transpose();
    case 'uniques':
        this.assertType(list, 'list');
        if (list.canBeCSV() ||
            list.itemsArray().every(value => value instanceof Color)
        ) {
            return this.reportListAttribute(
                'distribution',
                list
            ).columns().at(1);
        }
        return this.reportUniqueValues(list);
    case 'distribution':
        this.assertType(list, 'list');
        if (list.canBeJSON()) {
            // support computing the frequency distribution of nested lists
            // if all leaf items have atomic data,
            // observe case-sensitivity setting
            return list.map(row => {
                let entry = row instanceof List ?
                    '__json__' + row.asJSON() // internally tag as list
                    : row;
                return isString(entry) && Process.prototype.isCaseInsensitive ?
                    entry.toLowerCase()
                    : entry;
            }).distribution().map(row => {
                let item = row.at(1);
                return new List([
                    isString(item) && item.startsWith('__json__') ?
                        this.parseJSON(item.slice(8))
                        : item,
                    row.at(2)
                ]);
            });
        } else if (list.itemsArray().every(value => value instanceof Color)) {
            return list.map(value =>
                this.normalizeColor(value)
            ).distribution().map(row => {
                return new List([
                    this.restoreColor(row.at(1)),
                    row.at(2)
                ]);
            });
        }
        return this.reportDistribution(list);
    case 'sorted':
        this.assertType(list, 'list');
        return this.reportSorted(list);
    case 'shuffled':
        this.assertType(list, 'list');
        return this.reportShuffled(list);
    case 'reverse':
        this.assertType(list, 'list');
        return list.reversed();
    case '\u03a3':
        this.assertType(list, 'list');
        return list.ssum();
    case 'text':
        this.assertType(list, 'list');
        if (this.isAST(list)) {
            return this.toTextSyntax(list).encode(0, 0);
        }
        if (list.canBeWords()) {
            return list.asWords();
        }
        throw new Error(
            localize('unable to convert to') + ' ' + localize('text')
        );
    case 'lines':
        this.assertType(list, 'list');
        if (this.isAST(list)) {
            return this.toTextSyntax(list).encode();
        }
        if (list.canBeTXT()) {
            return list.asTXT();
        }
        throw new Error(
            localize('unable to convert to') + ' ' + localize('lines')
        );
    case 'csv':
        this.assertType(list, 'list');
        if (list.canBeCSV()) {
            return list.asCSV();
        }
        throw new Error(
            localize('unable to convert to') + ' ' + localize('CSV')
        );
    case 'json':
        this.assertType(list, 'list');
        if (list.canBeJSON()) {
            return list.asJSON();
        }
        throw new Error(
            localize('unable to convert to') + ' ' + localize('JSON')
        );
    default:
        return 0;
    }
};

Process.prototype.normalizeColor = function (aColor) {
    // private - answer a string representation of the given color
    // that can be used for (quick) statistical purposes such as
    // sorting and frequency distribution analysis
    return (
        'rgba(' +
        aColor.r.toString().padStart(3, '0') + ',' +
        aColor.g.toString().padStart(3, '0') + ',' +
        aColor.b.toString().padStart(3, '0') + ',' +
        Math.round(aColor.a * 255).toString().padStart(3, '0') +
        ')'
    );
};

Process.prototype.restoreColor = function (normalized) {
    // private - answer a color from a normalized color string
    var channels = normalized.split(/[\(),]/).slice(1, 5);
    return new Color(+channels[0], +channels[1], +channels[2], +channels[3]);
};

Process.prototype.reportListLength = function (list) {
    this.assertType(list, 'list');
    return list.length();
};

Process.prototype.reportListIndex = function(element, list) {
    this.assertType(list, 'list');
    return list.indexOf(element);
};

Process.prototype.reportListContainsItem = function (list, element) {
    this.assertType(list, 'list');
    return list.contains(element);
};

Process.prototype.reportListIsEmpty = function (list) {
    this.assertType(list, 'list');
    return list.isEmpty();
};

Process.prototype.reportRank = function (data) {
    return data instanceof List ? data.rank() : 0;
};

Process.prototype.reportQuickRank = function (data) {
    // private - assume a regularly shaped nested list
    return data instanceof List ? data.quickRank() : 0;
};

Process.prototype.reportDimensions = function (data) {
    return data instanceof List ? data.shape() : new List();
};

Process.prototype.doShowTable = function (list) {
    // experimental
    this.assertType(list, 'list');
    new TableDialogMorph(list).popUp(this.blockReceiver().world());
};

// process - analyzing sorting and shuffling a list (general utility)

Process.prototype.reportUniqueValues = function (list) {
    // Filter - answer a new list representing the set of unique values
    // in the list based on equality,
    // interpolated so it can be interrupted by the user
    // because snapEquals() can be a lot slower than identity comparison
    var next;
    if (this.context.accumulator === null) {
        this.assertType(list, 'list');
        this.context.accumulator = {
            idx : 0,
            target : []
        };
    }
    if (this.context.accumulator.idx === list.length()) {
        this.returnValueToParentContext(
            new List(this.context.accumulator.target)
        );
        return;
    }
    this.context.accumulator.idx += 1;
    next = list.at(this.context.accumulator.idx);
    if (!this.context.accumulator.target.some(any => snapEquals(any, next))) {
        this.context.accumulator.target.push(next);
    }
    this.pushContext();
};

Process.prototype.reportDistribution = function (list) {
    // answer a new list with an entry for each unique value and the
    // number of its occurrences in the source list,
    // interpolated so it can be interrupted by the user
    // because snapEquals() can be a lot slower than identity comparison
    var next, record;
    if (this.context.accumulator === null) {
        this.assertType(list, 'list');
        this.context.accumulator = {
            idx : 0,
            target : []
        };
    }
    if (this.context.accumulator.idx === list.length()) {
        this.returnValueToParentContext(
            new List(this.context.accumulator.target
                .sort((a, b) =>b[1] - a[1])
                .map(row => new List(row)))
        );
        return;
    }
    this.context.accumulator.idx += 1;
    next = list.at(this.context.accumulator.idx);

    record = this.context.accumulator.target.find(row =>
        snapEquals(row[0], next)
    );
    if (record !== undefined) {
        record[1] += 1;
    } else {
        this.context.accumulator.target.push([next, 1]);
    }
    this.pushContext();
};

Process.prototype.reportSorted = function (data) {
    return new List(data.itemsArray().slice().sort((a, b) =>
        this.reportIsBefore(a, b) ? - 1 : 1
    ));
};

Process.prototype.reportIsBefore = function (a, b) {
    // private - this is an elaborate version of reportBasicLessThan()
    // that is similar to snapEquals in that it will work with heterogeneous
    // data types but is too slow for everyday use. Therefore it is currently
    // only used for the generalized sorting of arbitrary data (lists)
    // and not exposed as the (better) semantics behind "<"
    var order = [
            'list',
            'text',
            'number',
            'Boolean',
            'color',
            'command',
            'reporter',
            'predicate',
            'costume',
            'sound',
            'sprite',
            'stage',
            'nothing',
            'undefined'
        ],
        typeA = this.reportTypeOf(a),
        typeB = this.reportTypeOf(b),
        lenA, lenB;

    if (typeA !== typeB) {
        return order.indexOf(typeA) < order.indexOf(typeB);
    }
    switch (typeA) {
    case 'list':
        // primary: length of list descending (!)
        // secondary: contents of columns from left to right
        // recursive, hope this doesn't crash on large tables
        lenA = a.length();
        lenB = b.length();
        return lenA > lenB || (
            lenA === lenB && (
                !lenA ||
                this.reportIsBefore(a.at(1), b.at(1)) ||
                    (snapEquals(a.at(1), b.at(1)) &&
                    this.reportIsBefore(a.cdr(), b.cdr()))
            )
        );
    case 'color':
        return a.r < b.r || a.g < b.g || a.b < b.b;
    case 'command':
    case 'reporter':
    case 'predicate':
        return a.expression.abstractBlockSpec() <
            b.expression.abstractBlockSpec();
    case 'costume':
    case 'sound':
    case 'sprite':
    case 'stage':
        return a.name < b.name;
    default:
        // number, Boolean, text or other
        return this.reportBasicLessThan(a, b);
    }
};

Process.prototype.reportShuffled = function (data) {
    // Fisher-Yates algorithm
    var array = [...data.itemsArray()],
        i, k, tmp;
    for (i = array.length - 1; i > 0; i -= 1) {
        k = Math.floor(Math.random() * (i + 1));
        tmp = array[i];
        array[i] = array[k];
        array[k] = tmp;
    }
    return new List(array);
};

// Process non-HOF list primitives

Process.prototype.reportNumbers = function (start, end) {
    // hyper-dyadic
    return this.hyper(
        (strt, stp) => this.reportBasicNumbers(strt, stp),
        start,
        end
    );
};

Process.prototype.reportBasicNumbers = function (start, end) {
    // answer a new arrayed list containing an linearly ascending progression
    // of integers beginning at start to end.
    this.assertType(+start, 'number');
    this.assertType(+end, 'number');

    var result, len, i,
        s = +start,
        e = +end,
        n = s;

    if (e > s) {
        len = Math.floor(e - s);
        result = new Array(len);
        for(i = 0; i <= len; i += 1) {
            result[i] = n;
            n += 1;
        }
    } else {
        len = Math.floor(s - e);
        result = new Array(len);
        for(i = 0; i <= len; i += 1) {
            result[i] = n;
            n -= 1;
        }
    }
    return new List(result);
};

Process.prototype.reportListCombination = function (choice, lists) {
    // experimental, currently not in use
    var option = this.inputOption(choice);
    switch (option) {
    case 'append':
        return this.reportConcatenatedLists(lists);
    case 'cross product':
        return this.reportCrossproduct(lists);
    default:
        return 0;
    }
};

Process.prototype.reportConcatenatedLists = function (lists) {
    var first, result, rows, row, rowIdx, cols, col;
    this.assertType(lists, 'list');
    if (lists.isEmpty()) {
        return lists;
    }
    first = lists.at(1);
    // this.assertType(first, 'list');
    if (!(first instanceof List)) {
        first = new List([first]);
    }
    if (first.isLinked) { // link everything
        return this.concatenateLinkedLists(lists);
    }

    // in case the first sub-list is arrayed
    result = [];
    rows = lists.length();
    for (rowIdx = 1; rowIdx <= rows; rowIdx += 1) {
        row = lists.at(rowIdx);
        // this.assertType(row, 'list');
        if (row instanceof List) {
            cols = row.length();
            for (col = 1; col <= cols; col += 1) {
                result.push(row.at(col));
            }
        } else { // append scalar as new list item
            result.push(row);
        }
    }
    return new List(result);
};

Process.prototype.concatenateLinkedLists = function (lists) {
    var first;
    if (lists.isEmpty()) {
        return lists;
    }
    first = lists.at(1);
    // this.assertType(first, 'list');
    if (!(first instanceof List)) {
        first = lists.cons(first, new List());
    }
    if (lists.length() === 1) {
        return first;
    }
    if (first.isEmpty()) {
        return this.concatenateLinkedLists(lists.cdr());
    }
    return lists.cons(
        first.at(1),
        this.concatenateLinkedLists(
            lists.cons(
                first.cdr(),
                lists.cdr()
            )
        )
    );
};

// Process interpolated non-HOF list primitives

Process.prototype.reportLinkedNumbers = function (start, end) {
    // - currently not in use -
    // answer a new linked list containing an linearly ascending progression
    // of integers beginning at start to end.
    // this is interpolated so it can handle big ranges of numbers
    // without blocking the UI

    var dta;
    if (this.context.accumulator === null) {
        this.assertType(start, 'number');
        this.assertType(end, 'number');
        this.context.accumulator = {
            target : new List(),
            end : null,
            idx : +start,
            step: +end > +start ? +1 : -1
        };
        this.context.accumulator.target.isLinked = true;
        this.context.accumulator.end = this.context.accumulator.target;
    }
    dta = this.context.accumulator;
    if (dta.step === 1 ? dta.idx > +end : dta.idx < +end) {
        dta.end.rest = new List();
        this.returnValueToParentContext(dta.target.cdr());
        return;
    }
    dta.end.rest = dta.target.cons(dta.idx);
    dta.end = dta.end.rest;
    dta.idx += dta.step;
    this.pushContext();
};

// Process conditionals primitives

/*  // original non-variadic non-special form version
    // retained for documentation
Process.prototype.doIf = function () {
    var args = this.context.inputs,
        outer = this.context.outerContext, // for tail call elimination
        isCustomBlock = this.context.isCustomBlock;

    // this.assertType(args[0], ['Boolean']);
    this.popContext();
    if (args[0]) {
        if (args[1]) {
            this.pushContext(args[1].blockSequence(), outer);
            this.context.isCustomBlock = isCustomBlock;
        }
    }
    this.pushContext();
};
*/

Process.prototype.receiveCondition = function (bool) {
    var nb = this.context.expression.nextBlock(),
        outer = this.context.outerContext;
    this.popContext();
    if ((bool === true || this.isClicked) && nb) {
        this.pushContext(nb.blockSequence(), outer);
        this.hasFiredGenericCondition = true;
        this.wantsHalo = true;
    }
    this.pushContext();
};

Process.prototype.receiveConditionEvent = function (bool) {
    var hatBlock = this.context.expression,
        next = hatBlock.nextBlock(),
        outer = this.context.outerContext;
    this.popContext();
    if (next) {
        if ((bool === true && hatBlock.isLoaded) || this.isClicked) {
            hatBlock.isLoaded = this.enableSingleStepping; // false;
            this.pushContext(next.blockSequence(), outer);
            this.hasFiredGenericCondition = true;
            this.wantsHalo = true;
        } else if (!bool) {
            hatBlock.isLoaded = true;
        }
    }
    this.pushContext();
};

Process.prototype.evaluateCustomHatBlock = function () {
    var hatBlock = this.context.expression,
        runnable = new Context(
            this.context.parentContext,
            hatBlock.semantics === 'rule' ? 'dispatchRule' :'dispatchEvent',
            this.context.outerContext
        );
    runnable.addInput(hatBlock);
    this.context.parentContext = runnable;
    this.context.accumulator = true;
    this.evaluateCustomBlock();
};

Process.prototype.dispatchRule = function (hatBlock, bool) {
    var outer = this.context.outerContext,
        next = hatBlock.nextBlock();
    this.popContext();
    if ((bool === true || this.isClicked) && next) {
        this.pushContext(next.blockSequence(), outer);
        this.hasFiredGenericCondition = true;
        this.wantsHalo = true;
    }
    this.pushContext();
};

Process.prototype.dispatchEvent = function (hatBlock, bool) {
    var outer = this.context.outerContext,
        next = hatBlock.nextBlock();
    this.popContext();
    if (next) {
        if ((bool === true && hatBlock.isLoaded) || this.isClicked) {
            hatBlock.isLoaded = this.enableSingleStepping; // false;
            this.pushContext(next.blockSequence(), outer);
            this.hasFiredGenericCondition = true;
            this.wantsHalo = true;
        } else if (!bool) {
            hatBlock.isLoaded = true;
        }
    }
    this.pushContext();
};

Process.prototype.doIfElse = function () {
    // version with trancending variable scope, i.e. the C-slots are
    // not full lambdas, letting you e.g. declare script variables inside
    // them that can be accessed later outside of the C-slot
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

Process.prototype.doIf = function (block) {
    // variadic version with trancending variable scope, i.e. the C-slots are
    // not full lambdas, letting you e.g. declare script variables inside
    // them that can be accesses later outside of the C-slot
    var args = this.context.inputs,
        inps = block.inputs(),
        outer = this.context.outerContext,
        acc = this.context.accumulator,
        isCustomBlock = this.context.isCustomBlock;

    if (!acc) {
        acc = this.context.accumulator = {
            args: inps.slice(0, 2).concat(inps[2].inputs())
        };
    }
    if (!args.length) {
        if (acc.args.length) {
            this.pushContext(acc.args.shift(), outer);
            this.context.isCustomBlock = isCustomBlock;
            return;
        }
        this.popContext();
        return;
    }
    if (args.pop()) {
        this.popContext();
        this.pushContext(acc.args.shift().evaluate()?.blockSequence(), outer);
        this.context.isCustomBlock = isCustomBlock;
        return;
    }
    acc.args.shift();
};

Process.prototype.reportIfElse = function (block) {
    var inputs = this.context.inputs,
        accumulator,
        condition,
        expression,
        trueIsBlock,
        falseIsBlock;

    if (inputs.length < 1) {
        // evaluate the first input, either a Boolean or a (nested) list
        this.evaluateNextInput(block);
        return;
    }

    if (inputs[0] instanceof List && this.enableHyperOps) {
        // hyperize a (nested) list of Booleans
        if (this.context.accumulator === null) {
            // cache literal true/false cases for optimized evaluation
            trueIsBlock = block.inputs()[1] instanceof BlockMorph;
            falseIsBlock = block.inputs()[2] instanceof BlockMorph;
            this.context.accumulator = {
                results : [],
                trueIsLiteral : !trueIsBlock,
                trueCase : trueIsBlock ? null : block.inputs()[1].evaluate(),
                falseIsLiteral : !falseIsBlock,
                falseCase : falseIsBlock ? null : block.inputs()[2].evaluate()
            };
            // optimize if both true-/false- cases are literals
            // for atomic conditions:
            if (!trueIsBlock && !falseIsBlock) {
                this.returnValueToParentContext(inputs[0].deepMap(
                    leaf => leaf ? this.context.accumulator.trueCase
                        : this.context.accumulator.falseCase)
                );
                this.popContext();
                return;
            }
        } else if (inputs.length > 1) {
            // retrieve & remember previous result & remove it from the inputs
            this.context.accumulator.results.push(inputs.pop());
        }
        accumulator = this.context.accumulator;
        if (accumulator.results.length === inputs[0].length()) {
            // done with all the conditions in the current list
            this.returnValueToParentContext(
                new List(accumulator.results)
            );
            this.popContext();
            return;
        }
        condition = inputs[0].at(accumulator.results.length + 1);

        // optimize single literal true-/false- cases for atomic conditions:
        if (!(condition instanceof List)) {
            if (condition && accumulator.trueIsLiteral) {
                accumulator.results.push(accumulator.trueCase);
                return;
            }
            if (!condition && accumulator.falseIsLiteral) {
                accumulator.results.push(accumulator.falseCase);
                return;
            }
        }

        this.pushContext(block); // recursive call
        this.context.addInput(condition);
        // optimize evaluation of literals:
        this.context.accumulator = copy(accumulator);
        this.context.accumulator.results = [];
        return;
    }

    // handle a scalar condition
    if (inputs.length > 1) {
        // done with evaluating a case, retrieve and return its result
        if (this.flashContext()) {return; }
        this.returnValueToParentContext(inputs.pop());
        this.popContext();
        return;
    }
    // this.assertType(inputs[0], ['Boolean']);
    if (inputs[0]) {
        expression = block.inputs()[1]; // true block
    } else {
        expression = block.inputs()[2]; // false block
    }
    this.pushContext(expression);
};

// Process process related primitives

Process.prototype.doStop = function () {
    this.stop();
};

Process.prototype.doStopAll = function () {
    var ide;
    if (this.homeContext.receiver) {
        ide = this.homeContext.receiver.parentThatIsA(IDE_Morph);
        ide.scene.stop();
    }
};

Process.prototype.doStopAllScenes = function () {
    var ide;
    if (this.homeContext.receiver) {
        ide = this.homeContext.receiver.parentThatIsA(IDE_Morph);
        ide.scenes.map(scn => scn.stop(true));
    }
};

Process.prototype.doStopThis = function (choice) {
    switch (this.inputOption(choice)) {
    case 'all':
        this.doStopAll();
        break;
    case 'all scenes':
        this.doStopAllScenes();
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
                    this.context.outerContext.receiver,
                    // this.homeContext.receiver,
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
        }

        // this.pushContext('doYield'); // no longer needed in Morphic2
        this.pushContext('popContext'); // instead we do this...

        if (this.context) {
            this.context.isCustomBlock = isCustomBlock;
        }
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

Process.prototype.doSetGlobalFlag = function (name, bool) {
    var stage = this.homeContext.receiver.parentThatIsA(StageMorph);
    name = this.inputOption(name);
    this.assertType(bool, 'Boolean');
    switch (name) {
    case 'turbo mode':
        this.doSetFastTracking(bool);
        break;
    case 'case sensitivity':
        Process.prototype.isCaseInsensitive = !bool;
        break;
    case 'flat line ends':
        SpriteMorph.prototype.useFlatLineEnds = bool;
        break;
    case 'log pen vectors':
        StageMorph.prototype.enablePenLogging = bool;
        break;
    case 'video capture':
        if (bool) {
            this.startVideo(stage);
        } else {
            stage.stopProjection();
        }
        break;
    case 'mirror video':
        stage.mirrorVideo = bool;
        break;
    }
};

Process.prototype.reportGlobalFlag = function (name) {
    var stage = this.homeContext.receiver.parentThatIsA(StageMorph);
    name = this.inputOption(name);
    switch (name) {
    case 'turbo mode':
        return this.reportIsFastTracking();
    case 'case sensitivity':
        return !Process.prototype.isCaseInsensitive;
    case 'flat line ends':
        return SpriteMorph.prototype.useFlatLineEnds;
    case 'log pen vectors':
        return StageMorph.prototype.enablePenLogging;
    case 'video capture':
        return !isNil(stage.projectionSource) &&
            stage.projectionLayer()
                .getContext('2d')
                .getImageData(0, 0, 1, 1)
                .data[3] > 0;
    case 'mirror video':
        return stage.mirrorVideo;
    default:
        return '';
    }
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
    // non-special-form version, requires the C-slot input to
    // be marked as non-unevaluated (applicative order), which makes it
    // return its plain nested block without reifying it into a Context
    // (lambda)
    this.context.inputs = []; // force re-evaluation of C-slot
    this.pushContext('doYield');
    if (body) {
        this.pushContext(body.blockSequence());
    }
    this.pushContext();
};

Process.prototype.doRepeat = function (counter, body) {
    // non-special-form version, requires the C-slot input to
    // be marked as non-unevaluated (applicative order), which makes it
    // return its plain nested block without reifying it into a Context
    // (lambda)
    var block = this.context.expression,
        outer = this.context.outerContext, // for tail call elimination
        isCustomBlock = this.context.isCustomBlock;

    if (isNaN(counter) || counter < 1) {
	// was '=== 0', which caused infinite loops on non-ints
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
    // non-special-form version, requires the C-slot input to
    // be marked as non-unevaluated (applicative order), which makes it
    // return its plain nested block without reifying it into a Context
    // (lambda)
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
    // non-special-form version, directly evaluates the
    // condition slot each time without requiring it to be marked as
    // "unevaluated"
    if (goalCondition) {
        this.popContext();
        this.pushContext('doYield');
        return null;
    }
    this.context.inputs = [];
    this.pushContext('doYield');
    this.pushContext();
};

// Process interpolated iteration primitives

Process.prototype.doForEach = function (upvar, list, script) {
    // perform a script for each element of a list, assigning the
    // current iteration's element to a variable with the name
    // specified in the "upvar" parameter, so it can be referenced
    // within the script.
    // Distinguish between linked and arrayed lists.

    var next;
    if (this.context.accumulator === null) {
        this.assertType(list, 'list');
        this.context.accumulator = {
            source : list,
            remaining : list.length(),
            idx : 0
        };
    }
    if (this.context.accumulator.remaining === 0) {
        return;
    }
    this.context.accumulator.remaining -= 1;
    if (this.context.accumulator.source.isLinked) {
        next = this.context.accumulator.source.at(1);
        this.context.accumulator.source =
            this.context.accumulator.source.cdr();
    } else { // arrayed
        this.context.accumulator.idx += 1;
        next = this.context.accumulator.source.at(this.context.accumulator.idx);
    }
    this.pushContext('doYield');

    // optimize running the body script for speed:
    // don't reify the C-slot contents, see: isAutoLambda()
    // and put the script directly on the stack.
    // below is the alternative - more correct (scope) code,
    // retained in case of issues with the optimized version
    // -------------------
    // this.pushContext();
    // this.context.outerContext.variables.addVar(upvar);
    // this.context.outerContext.variables.setVar(upvar, next);
    // this.evaluate(script, new List(/*[next]*/), true);

    if (script) {
        this.pushContext(script.blockSequence());
    }
    this.context.outerContext.variables.addVar(upvar);
    this.context.outerContext.variables.setVar(upvar, next);
    this.pushContext();
};

Process.prototype.doFor = function (upvar, start, end, script) {
    // perform a script for every integer step between start and stop,
    // assigning the current iteration index to a variable with the
    // name specified in the "upvar" parameter, so it can be referenced
    // within the script.

    var vars = this.context.outerContext.variables,
        dta = this.context.accumulator;
    if (dta === null) {
        this.assertType(+start, 'number');
        this.assertType(+end, 'number');
        dta = this.context.accumulator = {
            test : +start < +end ?
                (() => vars.getVar(upvar) > +end)
                : (() => vars.getVar(upvar) < +end),
            step : +start < +end ? 1 : -1,
            parms : new List() // empty parameters, reusable to avoid GC
        };
        vars.addVar(upvar);
        vars.setVar(upvar, Math.floor(+start));
    } else {
        vars.changeVar(upvar, dta.step);
    }
    if (dta.test()) {return; }
    this.pushContext('doYield');

    // optimize running the body script for speed:
    // don't reify the C-slot contents, see: isAutoLambda()
    // and put the script directly on the stack.
    // below is the alternative - more correct (scope) code,
    // retained in case of issues with the optimized version
    // -------------------
    // this.pushContext();
    // this.evaluate(script, dta.parms, true);

    if (script) {
        this.pushContext(script.blockSequence());
    }
    this.pushContext();
};

// Process interpolated HOF primitives

/*
    this.context.inputs:
    [0] - reporter
    [1] - list (original source)
    -----------------------------
    [2] - last reporter evaluation result

    these primitives used to store the accumulated data in the unused parts
    of the context's input-array. For reasons obscure to me this led to
    JS stack overflows when used on large lists (> 150 k items). As a remedy
    aggregations are now accumulated in the "accumulator" property slot
    of Context. Why this speeds up execution by orders of magnitude while
    "fixing" the stack-overflow issue eludes me. -Jens
*/

Process.prototype.reportMap = function (reporter, list) {
    // answer a new list containing the results of the reporter applied
    // to each value of the given list. Distinguish between linked and
    // arrayed lists.
    // if the reporter uses formal parameters instead of implicit empty slots
    // there are two additional optional parameters:
    // #1 - element
    // #2 - optional | index
    // #3 - optional | source list

    var next, index, parms;
    if (list.isLinked) {
        if (this.context.accumulator === null) {
            this.assertType(list, 'list');
            this.context.accumulator = {
                source : list,
                idx : 1,
                target : new List(),
                end : null,
                remaining : list.length()
            };
            this.context.accumulator.target.isLinked = true;
            this.context.accumulator.end = this.context.accumulator.target;
        } else if (this.context.inputs.length > 2) {
            this.context.accumulator.end.rest = list.cons(
                this.context.inputs.pop()
            );
            this.context.accumulator.end = this.context.accumulator.end.rest;
            this.context.accumulator.idx += 1;
            this.context.accumulator.remaining -= 1;
        }
        if (this.context.accumulator.remaining === 0) {
            this.context.accumulator.end.rest = list.cons(
                this.context.inputs[2]
            ).cdr();
            this.returnValueToParentContext(
                this.context.accumulator.target.cdr()
            );
            return;
        }
        index = this.context.accumulator.idx;
        next = this.context.accumulator.source.at(1);
        this.context.accumulator.source = this.context.accumulator.source.cdr();
    } else { // arrayed
        if (this.context.accumulator === null) {
            this.assertType(list, 'list');
            this.context.accumulator = [];
        } else if (this.context.inputs.length > 2) {
            this.context.accumulator.push(this.context.inputs.pop());
        }
        if (this.context.accumulator.length === list.length()) {
            this.returnValueToParentContext(
                new List(this.context.accumulator)
            );
            return;
        }
        index = this.context.accumulator.length + 1;
        next = list.at(index);
    }
    this.pushContext();
    parms = [next];
    if (reporter instanceof Context) { // can also be a list of rings
        if (reporter.inputs.length > 1) {
            parms.push(index);
        }
        if (reporter.inputs.length > 2) {
            parms.push(list);
        }
    }
    return this.evaluate(reporter, new List(parms));
};

Process.prototype.reportKeep = function (predicate, list) {
    // Filter - answer a new list containing the items of the list for which
    // the predicate evaluates TRUE.
    // Distinguish between linked and arrayed lists.
    // if the predicate uses formal parameters instead of implicit empty slots
    // there are two additional optional parameters:
    // #1 - element
    // #2 - optional | index
    // #3 - optional | source list

    var next, index, parms;
    if (list.isLinked) {
        if (this.context.accumulator === null) {
            this.assertType(list, 'list');
            this.context.accumulator = {
                source : list,
                idx: 1,
                target : new List(),
                end : null,
                remaining : list.length()
            };
            this.context.accumulator.target.isLinked = true;
            this.context.accumulator.end = this.context.accumulator.target;
        } else if (this.context.inputs.length > 2) {
            if (this.context.inputs.pop() === true) {
                this.context.accumulator.end.rest = list.cons(
                    this.context.accumulator.source.at(1)
                );
                this.context.accumulator.end =
                    this.context.accumulator.end.rest;
            }
            this.context.accumulator.remaining -= 1;
            this.context.accumulator.idx += 1;
            this.context.accumulator.source =
                this.context.accumulator.source.cdr();
        }
        if (this.context.accumulator.remaining === 0) {
            this.context.accumulator.end.rest = new List();
            this.returnValueToParentContext(
                this.context.accumulator.target.cdr()
            );
            return;
        }
        index = this.context.accumulator.idx;
        next = this.context.accumulator.source.at(1);
    } else { // arrayed
        if (this.context.accumulator === null) {
            this.assertType(list, 'list');
            this.context.accumulator = {
                idx : 0,
                target : []
            };
        } else if (this.context.inputs.length > 2) {
            if (this.context.inputs.pop() === true) {
                this.context.accumulator.target.push(
                    list.at(this.context.accumulator.idx)
                );
            }
        }
        if (this.context.accumulator.idx === list.length()) {
            this.returnValueToParentContext(
                new List(this.context.accumulator.target)
            );
            return;
        }
        this.context.accumulator.idx += 1;
        index = this.context.accumulator.idx;
        next = list.at(index);
    }
    this.pushContext();
    parms = [next];
    if (predicate instanceof Context) { // can also be a list of rings
        if (predicate.inputs.length > 1) {
            parms.push(index);
        }
        if (predicate.inputs.length > 2) {
            parms.push(list);
        }
    }
    return this.evaluate(predicate, new List(parms));
};

Process.prototype.reportFindFirst = function (predicate, list) {
    // Find - answer the first item of the list for which
    // the predicate evaluates TRUE.
    // Distinguish between linked and arrayed lists.
    // if the predicate uses formal parameters instead of implicit empty slots
    // there are two additional optional parameters:
    // #1 - element
    // #2 - optional | index
    // #3 - optional | source list

    var next, index, parms;
    if (list.isLinked) {
        if (this.context.accumulator === null) {
            this.assertType(list, 'list');
            this.context.accumulator = {
                source : list,
                idx : 1,
                remaining : list.length()
            };
        } else if (this.context.inputs.length > 2) {
            if (this.context.inputs.pop() === true) {
                this.returnValueToParentContext(
                    this.context.accumulator.source.at(1)
                );
                return;
            }
            this.context.accumulator.remaining -= 1;
            this.context.accumulator.idx += 1;
            this.context.accumulator.source =
                this.context.accumulator.source.cdr();
        }
        if (this.context.accumulator.remaining === 0) {
            this.returnValueToParentContext('');
            return;
        }
        index = this.context.accumulator.idx;
        next = this.context.accumulator.source.at(1);
    } else { // arrayed
        if (this.context.accumulator === null) {
            this.assertType(list, 'list');
            this.context.accumulator = {
                idx : 0,
                current : null
            };
        } else if (this.context.inputs.length > 2) {
            if (this.context.inputs.pop() === true) {
                this.returnValueToParentContext(
                    this.context.accumulator.current
                );
                return;
            }
        }
        if (this.context.accumulator.idx === list.length()) {
            this.returnValueToParentContext('');
            return;
        }
        this.context.accumulator.idx += 1;
        index = this.context.accumulator.idx;
        next = list.at(index);
        this.context.accumulator.current = next;
    }
    this.pushContext();
    parms = [next];
    if (predicate instanceof Context) { // can also be a list of rings
        if (predicate.inputs.length > 1) {
            parms.push(index);
        }
        if (predicate.inputs.length > 2) {
            parms.push(list);
        }
    }
    return this.evaluate(predicate, new List(parms));
};

Process.prototype.reportCombine = function (list, reporter) {
    // Fold - answer an aggregation of all list items from "left to right"
    // Distinguish between linked and arrayed lists.
    // if the reporter uses formal parameters instead of implicit empty slots
    // there are two additional optional parameters:
    // #1 - accumulator
    // #2 - element
    // #3 - optional | index
    // #4 - optional | source list

    var next, current, index, parms;
    this.assertType(list, 'list');
    if (list.isLinked) {
        if (this.context.accumulator === null) {
            // check for special cases to speed up
            if (reporter instanceof Context &&
                    this.canRunOptimizedForCombine(reporter)) {
                return this.reportListAggregation(
                    list,
                    reporter.expression.selector
                );
            }

            // test for base cases
            if (list.length() < 2) {
                this.returnValueToParentContext(
                    list.length() ?
                        list.at(1)
                        : this.emptyListValueForCombine(
                            reporter.expression.selector
                        )
                );
                return;
            }

            // initialize the accumulator
            this.context.accumulator = {
                source : list.cdr(),
                idx : 1,
                target : list.at(1),
                remaining : list.length() - 1
            };
        } else if (this.context.inputs.length > 2) {
            this.context.accumulator.target = this.context.inputs.pop();
            this.context.accumulator.remaining -= 1;
            this.context.accumulator.idx += 1;
            this.context.accumulator.source =
                this.context.accumulator.source.cdr();
        }
        if (this.context.accumulator.remaining === 0) {
            this.returnValueToParentContext(this.context.accumulator.target);
            return;
        }
        next = this.context.accumulator.source.at(1);
    } else { // arrayed
        if (this.context.accumulator === null) {
            // check for special cases to speed up
            if (reporter instanceof Context &&
                    this.canRunOptimizedForCombine(reporter)) {
                return this.reportListAggregation(
                    list,
                    reporter.expression.selector
                );
            }

            // test for base cases
            if (list.length() < 2) {
                this.returnValueToParentContext(
                    list.length() ?
                        list.at(1)
                        : this.emptyListValueForCombine(
                            reporter.expression.selector
                        )
                );
                return;
            }

            // initialize the accumulator
            this.context.accumulator = {
                idx : 1,
                target : list.at(1)
            };
        } else if (this.context.inputs.length > 2) {
            this.context.accumulator.target = this.context.inputs.pop();
        }
        if (this.context.accumulator.idx === list.length()) {
            this.returnValueToParentContext(this.context.accumulator.target);
            return;
        }
        this.context.accumulator.idx += 1;
        next = list.at(this.context.accumulator.idx);
    }
    index = this.context.accumulator.idx;
    current = this.context.accumulator.target;
    this.pushContext();
    parms = [current, next];
    if (reporter instanceof Context) { // can also be a list of rings
        if (reporter.inputs.length > 2) {
            parms.push(index);
        }
        if (reporter.inputs.length > 3) {
            parms.push(list);
        }
    }
    return this.evaluate(reporter, new List(parms));
};

Process.prototype.reportListAggregation = function (list, selector) {
    // private - used by reportCombine to optimize certain commutative
    // operations such as sum, product, min, max hyperized all at once
    var len = list.length(),
        result, i, op;
    op = {
        reportVariadicSum: 'reportSum',
        reportVariadicProduct: 'reportProduct',
        reportVariadicMin: 'reportMin',
        reportVariadicMax: 'reportMax'
    }[selector] || selector;
    if (len === 0) {
        switch (op) {
        case 'reportProduct':
            return 1;
        case 'reportMin':
            return Infinity;
        case 'reportMax':
            return -Infinity;
        default: // reportSum
            return 0;
        }
    }
    result = list.at(1);
    if (len > 1) {
        for (i = 2; i <= len; i += 1) {
            result = this[op](result, list.at(i));
        }
    }
    return result;
};

Process.prototype.canRunOptimizedForCombine = function (aContext) {
    // private - used by reportCombine to check for optimizable
    // special cases
    var op = aContext.expression.selector,
        slots,
        eligible;
    if (!op) {
        return false;
    }
    eligible = [
        'reportVariadicSum',
        'reportVariadicProduct',
        'reportVariadicMin',
        'reportVariadicMax'
    ];
    if (!contains(eligible, op)) {
        return false;
    }

    // scan the expression's inputs,
    // make sure there are exactly two and none is
    // a non-empty input slot or a variable getter whose name doesn't
    // correspond to an input of the context.
    // make sure the context has either no or exactly two inputs.
    slots = aContext.expression.inputs()[0].inputs();
    if (slots.length !== 2) {
        return false;
    }
    if (aContext.inputs.length === 0) {
        return slots.every(each => each.bindingID);
    }
    if (aContext.inputs.length !== 2) {
        return false;
    }
    return slots.every(each =>
        each.selector === 'reportGetVar' &&
            contains(aContext.inputs, each.blockSpec)
    );
};

Process.prototype.emptyListValueForCombine = function (selector) {
    switch (selector) {
    case 'reportJoinWords':
        return '';
    case 'reportVariadicAnd':
        return true;
    case 'reportVariadicOr':
        return false;
    case 'reportConcatenatedLists':
        return new List();
    case 'reportCrossproduct':
        return new List([new List()]);
    default:
        return 0;
    }
};

Process.prototype.reportPipe = function (value, reporterList) {
    // Pipe - answer an aggregation of channeling an initial value
    // through a sequence of monadic functions
    var next, current;
    this.assertType(reporterList, 'list');

    if (this.context.accumulator === null) {
        // test for base cases
        if (reporterList.length() < 1) {
            this.returnValueToParentContext(value);
            return;
        }

        // initialize the accumulator
        this.context.accumulator = {
            idx : 0,
            result : value
        };
    } else if (this.context.inputs.length > 2) {
        this.context.accumulator.result = this.context.inputs.pop();
    }
    if (this.context.accumulator.idx === reporterList.length()) {
        this.returnValueToParentContext(this.context.accumulator.result);
        return;
    }
    this.context.accumulator.idx += 1;
    next = reporterList.at(this.context.accumulator.idx);
    this.assertType(next, ['command', 'reporter', 'predicate']);
    current = this.context.accumulator.result;
    this.pushContext();
    this.evaluate(next, new List([current]));
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

// Process SAY and THINK primitives

Process.prototype.bubble = function (data) {
    if (data instanceof List && data.isADT()) {
        return this.dynamicViewFor(data);
    }
    this.blockReceiver().bubble(data);
};

Process.prototype.doThink = function (data) {
    if (data instanceof List && data.isADT()) {
        return this.dynamicViewFor(data);
    }
    this.blockReceiver().doThink(data);
};

Process.prototype.doSayFor = function (data, secs) {
    if (data instanceof List && data.isADT()) {
        return this.dynamicViewFor(data);
    }
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
    if (data instanceof List && data.isADT()) {
        return this.dynamicViewFor(data);
    }
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

Process.prototype.dynamicViewFor = function (data) {
    // private - compute the dynamic view for an ADT
    this.context.inputs = [];
    this.pushContext();
    this.evaluate(this.reportListItem('_morph', data));
};

Process.prototype.blockReceiver = function () {
    return this.context ? this.context.receiver || this.homeContext.receiver
            : this.homeContext.receiver || this.receiver;
};

// Process sound primitives (interpolated)

Process.prototype.playSound = function (name) {
    if (name instanceof List) {
        // use the microphone's default sample rate in case it has been
        // initialized before, otherwise 44.1 kHz
        return this.doPlaySoundAtRate(
            name,
            this.blockReceiver().parentThatIsA(StageMorph)
                .microphone?.audioContext?.sampleRate || 44100
        );
    }
    return this.blockReceiver().doPlaySound(name);
};

Process.prototype.doPlaySoundUntilDone = function (name) {
    if (this.context.activeAudio === null) {
        this.context.activeAudio = this.playSound(name);
    }
    if (name === null || this.context.activeAudio.ended
            || this.context.activeAudio.terminated) {
        if (this.context.activeAudio && this.context.activeAudio.remove) {
            this.context.activeAudio.currentSrc = null;
            this.context.activeAudio.src = "";
            this.context.activeAudio.srcObject = null;
            this.context.activeAudio.remove();
        }
        return null;
    }
    this.pushContext('doYield');
    this.pushContext();
};

Process.prototype.doStopAllSounds = function () {
    var stage = this.homeContext.receiver.parentThatIsA(StageMorph);
    if (stage) {
        stage.threads.processes.forEach(thread => {
            if (thread.context) {
                thread.context.stopMusic();
                if (thread.context.activeAudio) {
                    thread.context.activeAudio.currentSrc = null;
                    thread.context.activeAudio.src = "";
                    thread.context.activeAudio.srcObject = null;
                    thread.context.activeAudio.remove();
                    thread.popContext();
                }
            }
        });
        stage.stopAllActiveSounds();
    }
};

Process.prototype.doPlaySoundAtRate = function (name, rate) {
    var sound, samples, ctx, gain, pan, source, rcvr;

    if (!(name instanceof List)) {
        sound = name instanceof Sound ? name
            : (typeof name === 'number' ? this.blockReceiver().sounds.at(name)
                : detect(
                    this.blockReceiver().sounds.asArray(),
                    s => snapEquals(s.name, name.toString())
            )
        );
        if (!sound.audioBuffer) {
            this.decodeSound(sound);
            return;
        }
        samples = this.reportGetSoundAttribute('samples', sound);
    } else {
        samples = name;
    }

    rcvr = this.blockReceiver();
    ctx = rcvr.audioContext();
    gain = rcvr.getGainNode();
    pan = rcvr.getPannerNode();
    source = this.encodeSound(samples, rate);
    rcvr.setVolume(rcvr.volume);
    source.connect(gain);
    if (pan) {
        gain.connect(pan);
        pan.connect(ctx.destination);
        rcvr.setPan(rcvr.pan);
    } else {
        gain.connect(ctx.destination);
    }
    source.pause = source.stop;
    source.ended = false;
    source.onended = () => source.ended = true;
    source.start();
    rcvr.parentThatIsA(StageMorph).activeSounds.push(source);
    return source;
};

Process.prototype.reportGetSoundAttribute = function (choice, soundName) {
    var sound = soundName instanceof Sound ? soundName
            : (typeof soundName === 'number' ?
                    this.blockReceiver().sounds.at(soundName)
                : (soundName instanceof List ? this.encodeSound(soundName)
                    : detect(
                        this.blockReceiver().sounds.asArray(),
                        s => snapEquals(s.name, soundName.toString())
                    )
                )
            ),
        option = this.inputOption(choice);

    if (option === 'name') {
        return sound.name;
    }

    if (!sound.audioBuffer) {
        this.decodeSound(sound);
        return;
    }

    switch (option) {
    case 'samples':
        if (!sound.cachedSamples) {
            sound.cachedSamples = function (sound, untype) {
                var buf = sound.audioBuffer,
                    result, i;
                if (buf.numberOfChannels > 1) {
                    result = new List();
                    for (i = 0; i < buf.numberOfChannels; i += 1) {
                        result.add(new List(untype(buf.getChannelData(i))));
                    }
                    return result;
                }
                return new List(untype(buf.getChannelData(0)));
            } (sound, this.untype);
        }
        return sound.cachedSamples;
    case 'sample rate':
        return sound.audioBuffer.sampleRate;
    case 'duration':
        return sound.audioBuffer.duration;
    case 'length':
        return sound.audioBuffer.length;
    case 'number of channels':
        return sound.audioBuffer.numberOfChannels;
    default:
        return 0;
    }
};

Process.prototype.decodeSound = function (sound, callback) {
    // private - callback is optional and invoked with sound as argument
    var base64, binaryString, len, bytes, i, arrayBuffer, audioCtx;

    if (sound.audioBuffer) {
        return (callback || nop)(sound);
    }
    if (!sound.isDecoding) {
        base64 = sound.audio.src.split(',')[1];
        binaryString = window.atob(base64);
        len = binaryString.length;
        bytes = new Uint8Array(len);
        for (i = 0; i < len; i += 1)        {
            bytes[i] = binaryString.charCodeAt(i);
        }
        arrayBuffer = bytes.buffer;
        audioCtx = Note.prototype.getAudioContext();
        sound.isDecoding = true;
        audioCtx.decodeAudioData(
            arrayBuffer,
            buffer => {
                sound.audioBuffer = buffer;
                sound.isDecoding = false;
            },
            err => {
                sound.isDecoding = false;
                this.handleError(err);
            }
        );
    }
    this.pushContext('doYield');
    this.pushContext();
};

Process.prototype.encodeSound = function (samples, rate) {
    // private
    var rcvr = this.blockReceiver(),
        ctx = rcvr.audioContext(),
        channels = (samples.at(1) instanceof List) ? samples.length() : 1,
        frameCount = (channels === 1) ?
            samples.length()
            : samples.at(1).length(),
        arrayBuffer = ctx.createBuffer(channels, frameCount, +rate || 44100),
        i,
        source;

    if (!arrayBuffer.copyToChannel) {
        arrayBuffer.copyToChannel = function (src, channel) {
            var buffer = this.getChannelData(channel);
            for (i = 0; i < src.length; i += 1) {
                buffer[i] = src[i];
            }
        };
    }
    if (channels === 1) {
        arrayBuffer.copyToChannel(
            Float32Array.from(samples.itemsArray()),
            0,
            0
        );
    } else {
        for (i = 0; i < channels; i += 1) {
            arrayBuffer.copyToChannel(
                Float32Array.from(samples.at(i + 1).itemsArray()),
                i,
                0
            );
        }
    }
    source = ctx.createBufferSource();
    source.buffer = arrayBuffer;
    source.audioBuffer = source.buffer;
    return source;
};

// Process first-class sound creation from samples, interpolated

Process.prototype.reportNewSoundFromSamples = function (samples, rate) {
    // this method inspired by: https://github.com/Jam3/audiobuffer-to-wav
    // https://www.russellgood.com/how-to-convert-audiobuffer-to-audio-file

    var audio, blob, reader;

    if (isNil(this.context.accumulator)) {
        this.assertType(samples, 'list'); // check only the first time
        this.context.accumulator = {
            audio: null
        };
        audio = new Audio();
        blob = new Blob(
            [
                this.audioBufferToWav(
                    this.encodeSound(samples, rate || 44100).audioBuffer
                )
            ],
            {type: "audio/wav"}
        );
        reader = new FileReader();
        reader.onload = () => {
            audio.src = reader.result;
            this.context.accumulator.audio = audio;
        };
        reader.readAsDataURL(blob);
    }
    if (this.context.accumulator.audio) {
        return new Sound(
            this.context.accumulator.audio,
            this.blockReceiver().newSoundName(localize('sound'))
        );
    }
    this.pushContext('doYield');
    this.pushContext();
};

Process.prototype.audioBufferToWav = function (buffer, opt) {
    var numChannels = buffer.numberOfChannels,
        sampleRate = buffer.sampleRate,
        format = (opt || {}).float32 ? 3 : 1,
        bitDepth = format === 3 ? 32 : 16,
        result;

    function interleave(inputL, inputR) {
        var length = inputL.length + inputR.length,
            result = new Float32Array(length),
            index = 0,
            inputIndex = 0;

        while (index < length) {
            result[index++] = inputL[inputIndex];
            result[index++] = inputR[inputIndex];
            inputIndex += 1;
        }
        return result;
    }

    if (numChannels === 2) {
        result = interleave(
            buffer.getChannelData(0),
            buffer.getChannelData(1)
        );
    } else {
        result = buffer.getChannelData(0);
    }
    return this.encodeWAV(result, format, sampleRate, numChannels, bitDepth);
};

Process.prototype.encodeWAV = function (
    samples,
    format,
    sampleRate,
    numChannels,
    bitDepth
) {
    var bytesPerSample = bitDepth / 8,
        blockAlign = numChannels * bytesPerSample,
        buffer = new ArrayBuffer(44 + samples.length * bytesPerSample),
        view = new DataView(buffer);

    function writeFloat32(output, offset, input) {
        for (var i = 0; i < input.length; i += 1, offset += 4) {
            output.setFloat32(offset, input[i], true);
        }
    }

    function floatTo16BitPCM(output, offset, input) {
        var i, s;
        for (i = 0; i < input.length; i += 1, offset += 2) {
            s = Math.max(-1, Math.min(1, input[i]));
            output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
        }
    }

    function writeString(view, offset, string) {
        for (var i = 0; i < string.length; i += 1) {
            view.setUint8(offset + i, string.charCodeAt(i));
        }
    }

    writeString(view, 0, 'RIFF'); // RIFF identifier
    // RIFF chunk length:
    view.setUint32(4, 36 + samples.length * bytesPerSample, true);
    writeString(view, 8, 'WAVE'); // RIFF type
    writeString(view, 12, 'fmt '); // format chunk identifier
    view.setUint32(16, 16, true); // format chunk length
    view.setUint16(20, format, true); // sample format (raw)
    view.setUint16(22, numChannels, true); // channel count
    view.setUint32(24, sampleRate, true); // sample rate
    // byte rate (sample rate * block align):
    view.setUint32(28, sampleRate * blockAlign, true);
    // block align (channel count * bytes per sample):
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitDepth, true); // bits per sample
    writeString(view, 36, 'data'); // data chunk identifier
    // data chunk length:
    view.setUint32(40, samples.length * bytesPerSample, true);
    if (format === 1) { // Raw PCM
        floatTo16BitPCM(view, 44, samples);
    } else {
        writeFloat32(view, 44, samples);
    }
    return buffer;
};

// Process audio input (interpolated)

Process.prototype.reportAudio = function (choice) {
    var stage = this.blockReceiver().parentThatIsA(StageMorph),
        selection = this.inputOption(choice);
    if (selection === 'resolution') {
        return stage.microphone.binSize();
    }
    if (selection === 'modifier') {
        return stage.microphone.modifier;
    }
    if (stage.microphone.isOn()) {
        switch (selection) {
        case 'volume':
            return stage.microphone.volume * 100;
        case 'frequency':
            return stage.microphone.pitch;
        case 'note':
            return stage.microphone.note;
        case 'samples':
            return new List(this.untype(stage.microphone.signals));
        case 'sample rate':
            return stage.microphone.audioContext.sampleRate;
        case 'output':
            return new List(this.untype(stage.microphone.output));
        case 'spectrum':
            return new List(this.untype(stage.microphone.frequencies));
        default:
            return null;
        }
    }
    this.pushContext('doYield');
    this.pushContext();
};

Process.prototype.untype = function (typedArray) {
    var len = typedArray.length,
        arr = new Array(len),
        i;
    for (i = 0; i < len; i += 1) {
        arr[i] = typedArray[i];
    }
    return arr;
};

Process.prototype.setMicrophoneModifier = function (modifier) {
    var stage = this.blockReceiver().parentThatIsA(StageMorph),
        invalid = [
            'sprite',
            'stage',
            'list',
            'costume',
            'sound',
            'number',
            'text',
            'Boolean'
        ];
    if (!modifier || contains(invalid, this.reportTypeOf(modifier))) {
        stage.microphone.modifier = null;
        stage.microphone.stop();
        return;
    }
    stage.microphone.modifier = modifier;
    stage.microphone.compiledModifier = this.reportCompiled(modifier, 1);
    stage.microphone.compilerProcess = this;
};

// Process user prompting primitives (interpolated)

Process.prototype.doAsk = function (data) {
    var stage = this.homeContext.receiver.parentThatIsA(StageMorph),
        rcvr = this.blockReceiver(),
        isStage = rcvr instanceof StageMorph,
        isHiddenSprite = rcvr instanceof SpriteMorph && !rcvr.isVisible,
        activePrompter,
        leftSpace,
        rightSpace;

    stage.keysPressed = {};
    if (this.readyToTerminate) {
        return;
    }
    if (!data) {
        // terminate all other processes currently asking a question
        // or waiting to ask one
        stage.threads.processes.filter(proc =>
            (proc.prompter && !proc.prompter.isDone) ||
            (proc?.context?.expression?.selector === 'doAsk' && proc !== this)
        ).forEach(proc => proc.stop());
        stage.lastAnswer = '';
        return;
    }
    if (!this.prompter) {
        activePrompter = detect(
            stage.children,
            morph => morph instanceof StagePrompterMorph ||
                morph instanceof StagePickerMorph
        );
        if (!activePrompter) {
            if (data instanceof List) {
                rcvr.stopTalking();
                this.prompter = new StagePickerMorph(data);
                this.prompter.createItems(stage.scale);
                leftSpace = rcvr.left() - stage.left();
                rightSpace = stage.right() - rcvr.right();
                if (isStage) {
                    this.prompter.popup(
                        stage,
                        stage.center().subtract(
                            this.prompter.extent().floorDivideBy(2)
                        )
                    );
                } else {
                    this.prompter.popup(
                        stage,
                        rightSpace > this.prompter.width() ||
                                rightSpace >= leftSpace ?
                            rcvr.topRight()
                            : rcvr.topLeft().subtract(
                                new Point(this.prompter.width(), 0)
                            )
                    );
                }
            } else {
                if (!isStage && !isHiddenSprite) {
                    rcvr.bubble(data, false, true);
                } else if (isStage) {
                    rcvr.stopTalking();
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
        }
    } else {
        if (this.prompter.isDone) {
            stage.lastAnswer = this.prompter.answer;
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
    url = decodeURI(url);
    this.checkURLAllowed(url);
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
        // cache-control, commented out for now
        // added for Snap4Arduino but has issues with local robot servers
        // this.httpRequest.setRequestHeader('Cache-Control', 'max-age=0');
        this.httpRequest.send(null);
        if (this.context.isCustomCommand) {
            // special case when ignoring the result, e.g. when
            // communicating with a robot to control its motors
            this.httpRequest = null;
            return null;
        }
    } else if (this.httpRequest.readyState === 4) {
        response = this.httpRequest.responseText;
        this.httpRequest = null;
        return response;
    }
    this.pushContext('doYield');
    this.pushContext();
};

Process.prototype.checkURLAllowed = function (url) {
    if ([ 'users', 'logout', 'projects', 'collections' ].some(
        pathPart => {
            // Check out whether we're targeting one of the remote domains
            return Object.values(Cloud.prototype.knownDomains).filter(
                each => each.includes('snap')
            ).some(
                domain => url.match(
                    // Check only against the host -not the protocol, path or
                    // port- of the domain
                    new RegExp(`${(new URL(domain)).host}.*${pathPart}`, 'i'))
            );
        }
    )) {
        throw new Error('Request blocked');
    }
};

// Process event messages primitives

Process.prototype.doBroadcast = function (message, options) {
    var stage = this.homeContext.receiver.parentThatIsA(StageMorph),
        target = this.inputOption(options.at(1) || ['all']),
        payload = options.at(2),
        thisObj,
        msg = this.inputOption(message),
        rcvrs,
        procs = [];
    if (!this.canBroadcast) {
        return [];
    }

    // remove all clones when the green flag event is broadcast to all
    if (msg === '__shout__go__' && target === 'all') {
        stage.removeAllClones();
    }

    // determine the receivers
    thisObj = this.blockReceiver();
    if (target === 'all') {
        rcvrs = stage.children.concat(stage);
    } else if (isSnapObject(target)) {
        rcvrs = [target];
    } else if (isString(target)) {
        // assume the string to be the name of a sprite or the stage
        if (target === stage.name) {
            rcvrs = [stage];
        } else {
            rcvrs = [this.getOtherObject(target, thisObj, stage)];
        }
    } else if (target instanceof List) {
        // assume all elements to be sprites or sprite names
        rcvrs = target.itemsArray().map(each =>
            this.getOtherObject(each, thisObj, stage)
        );
    } else {
        return; // abort
    }

    // transmit the message
    if (msg !== '') {
        stage.lastMessage = message; // retained for backwards compatibility
        rcvrs.forEach(morph => {
            if (isSnapObject(morph)) {
                morph.allHatBlocksFor(msg).forEach(block => {
                    var choice, varName, varFrame;
                    if (block.selector === 'receiveMessage') {
                        varName = block.inputs()[1].evaluate()[0];
                        if (varName) {
                            varFrame = new VariableFrame();
                            choice = block.inputs()[0].evaluate();
                            if (choice instanceof Array &&
                                    choice[0].indexOf('any') === 0) {
                                varFrame.addVar(
                                    varName,
                                    payload !== '' ?
                                        new List([message, payload])
                                        : message
                                );
                            } else {
                                varFrame.addVar(varName, payload);
                            }
                        }
                        procs.push(stage.threads.startProcess(
                            block,
                            morph,
                            stage.isThreadSafe,
                            // commented out for now to enable tail recursion:
                            // || // make "any msg" threadsafe
                            // block.inputs()[0].evaluate() instanceof Array,
                            null, // exportResult (bool)
                            null, // callback
                            null, // isClicked
                            null, // rightAway
                            null, // atomic
                            varFrame
                        ));
                    } else {
                        procs.push(stage.threads.startProcess(
                            block,
                            morph,
                            stage.isThreadSafe
                        ));
                    }
                });
            }
        });
        (stage.messageCallbacks[''] || []).forEach(callback =>
            callback(msg) // for "any" message, pass it along as argument
        );
        (stage.messageCallbacks[msg] || []).forEach(callback =>
            callback(payload) // for a particular message
        );
    }
    return procs;
};

Process.prototype.doBroadcastAndWait = function (message, target) {
    if (!this.context.activeSends) {
        this.context.activeSends = this.doBroadcast(message, target);
        if (this.isRunning()) {
            this.context.activeSends.forEach(proc =>
                proc.runStep()
            );
        }
    }
    this.context.activeSends = this.context.activeSends.filter(proc =>
        proc.isRunning()
    );
    if (this.context.activeSends.length === 0) {
        return null;
    }
    this.pushContext('doYield');
    this.pushContext();
};

Process.prototype.reportPoll = function (message, target) {
    // experimental in v11: Reporter version of "broadcast and wait" that
    // supports collecting replies from every fired script (using "report"),
    // answering a list of replies, or a single value if there is only
    // a single fired script
    var replies;
    if (!this.context.activeSends) {
        this.context.activeSends = this.doBroadcast(message, target);
        this.context.accumulator = {threads: this.context.activeSends.slice()};
        if (this.isRunning()) {
            this.context.activeSends.forEach(proc =>
                proc.runStep()
            );
        }
    }
    this.context.activeSends = this.context.activeSends.filter(proc =>
        proc.isRunning()
    );
    if (this.context.activeSends.length === 0) {
        replies = this.context.accumulator.threads.map(p => {
            let answer = p.homeContext.inputs[0];
            return isNil(answer) ? '' : answer;
        });
        this.returnValueToParentContext(
            replies.length === 1 ? replies[0] : new List(replies)
        );
        return;
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
    var choice = this.inputOption(typeString);
    switch (choice) {
    case 'agent':
        return isSnapObject(thing);
    case 'script':
        return thing instanceof Context;
    default:
        return this.reportTypeOf(thing) === choice;
    }
};

Process.prototype.assertType = function (thing, typeString, ...exempt) {
    // make sure "thing" is a particular type or any of a number of types
    // or a particular exempt value and raise an error if not
    // use responsibly wrt performance implications
    var thingType = this.reportTypeOf(thing);
    if (thingType === typeString) {return thing; }
    if (typeString instanceof Array && contains(typeString, thingType)) {
        return thing;
    }
    if (exempt.length && contains(exempt, thing)) {return thing; }
    if (typeString === 'JSON' && thing instanceof List && thing.canBeJSON()) {
        return thing;
    }
    throw new Error(
        localize('expecting a') + ' ' +
        (typeString instanceof Array ?
            typeString.reduce((a, b) => localize(a) + ' / ' + localize(b))
            : localize(typeString)) +
        ' ' +
        localize('but getting a') + ' ' +
        localize(thingType)
    );
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
    if (parseFloat(thing) === +thing) { // I hate this! -Jens
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
    if (thing instanceof Color) {
        return 'color';
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
            if (exp instanceof HatBlockMorph) {
                return 'hat';
            }
            if (exp instanceof CommandBlockMorph) {
                return 'command';
            }
            return 'reporter'; // 'ring';
        }

        if (thing.expression instanceof HatBlockMorph) {
            return 'hat';
        }
        if (thing.expression instanceof CommandBlockMorph) {
            return 'command';
        }
        return 'reporter'; // 'ring';
    }
    if (thing instanceof Array && isString(thing[0])) {
        return 'selector';
    }
    return 'undefined';
};

// Process math primtives - hyper

Process.prototype.hyper = function (fn, ...args) {
    // enable monadic and dyadic operations to be performed on dimensional data
    // use this as entry point
    if (this.enableHyperOps) {
        if (args.length === 1) {
            return this.hyperMonadic(fn, args[0]);
        } else if (args.length === 2) {
            return this.hyperDyadic(fn, args[0], args[1]);
        }
    }
    return fn.apply(null, args);
};

Process.prototype.hyperMonadic = function (baseOp, arg) {
    // enable monadic operations to be performed on lists and tables
    if (arg instanceof List) {
        return arg.map(each => this.hyperMonadic(baseOp, each));
    }
    return baseOp(arg);
};

Process.prototype.hyperDyadic = function (baseOp, a, b) {
    var match = Math.min(this.reportQuickRank(a), this.reportQuickRank(b));
    return this.hyperZip(baseOp, a, b, match, match);
};

Process.prototype.hyperZip = function (baseOp, a, b, zipa, zipb) {
    // enable dyadic operations to be performed on lists and tables
    // allowing to specify the ranks that are to be matched.
    // this allows to write 2d matrix convolutions for 3+d inputs with
    // 2d kernels e.g. for image processing without having to first
    // reshape the kernel matrix to match the broadcast shape.
    var arank = this.reportQuickRank(a),
        brank = this.reportQuickRank(b),
        len, i, result;
    if (arank === brank || (arank <= zipa && brank <= zipb)) {
        if (arank + brank === 0) {
            return baseOp(a, b);
        }
        if (brank === 0) {
            return a.map(each => this.hyperZip(baseOp, each, b, zipa, zipb));
        }
        if (arank === 0) {
            return b.map(each => this.hyperZip(baseOp, a, each, zipa, zipb));
        }
        // zip both arguments ignoring out-of-bounds indices
        a = a.itemsArray();
        b = b.itemsArray();
        len = Math.min(a.length, b.length);
        result = new Array(len);
        for (i = 0; i < len; i += 1) {
            result[i] = this.hyperZip(baseOp, a[i], b[i], zipa, zipb);
        }
        return new List(result);
    }
    if (arank > zipa) {
        return a.map(each => this.hyperZip(baseOp, each, b, zipa, zipb));
    }
    if (brank > zipb) {
        return b.map(each => this.hyperZip(baseOp, a, each, zipa, zipb));
    }
    if (arank > brank) {
        return a.map(each => this.hyperZip(baseOp, each, b, zipa, zipb));
    }
    return b.map(each => this.hyperZip(baseOp, a, each, zipa, zipb));
};

Process.prototype.hyperChangeBy = function (data, delta) {
    // mutate (!) a data structure the same way as performing a hyper-dyadic
    // operation on it. Experimental for v10.
    this.assertType(data, 'list');
    var match = Math.min(
        this.reportQuickRank(data),
        this.reportQuickRank(delta)
    );
    this.hyperMutate(
        this.reportBasicSum,
        data,
        delta,
        match,
        match
    );
};

Process.prototype.hyperMutate = function (baseOp, a, b, zipa, zipb) {
    // enable dyadic operations to be performed on lists and tables
    // allowing to specify the ranks that are to be matched.
    // note that this mutates (!) the first argument in place.
    // Highly experimental for v10.
    var arank = this.reportQuickRank(a),
        brank = this.reportQuickRank(b),
        len, i, k, elem;
    if (arank === brank || (arank <= zipa && brank <= zipb)) {
        // zip both arguments ignoring out-of-bounds indices
        len = Math.min(a.length(), b.length());
        for (i = 1; i <= len; i += 1) {
            elem = a.at(i);
            if (this.reportQuickRank(elem) === 0) {
                a.put(this.hyperZip(baseOp, elem, b.at(i), zipa, zipb), i);
            } else {
                this.hyperMutate(baseOp, elem, b.at(i), zipa, zipb);
            }
        }
        len = a.length();
        // remove non-matching items
        for (k = i; k <= len; k += 1) {
            a.remove(i);
        }
        return;
    }
    len = a.length();
    for (i = 1; i <= len; i += 1) {
        elem = a.at(i);
        if (this.reportQuickRank(elem) === 0) {
            a.put(this.hyperZip(baseOp, elem, b, zipa, zipb), i);
        } else {
            this.hyperMutate(baseOp, elem, b, zipa, zipb);
        }
    }
};

Process.prototype.packCoordinates = function (list) {
    // convert all numerical 2-item sub-lists into a variable to they
    // can be handled as atomic by hyperDyadic(),
    // remember to let the baseOp unpack them.
    return this.isCoordinate(list) ? new Variable(list)
        : list.map(each => each instanceof List ? this.packCoordinates(each)
            : each);
};

// Process dyadic math primtives - arithmetic
/*
    Note: the "basic" versions are required so the abonomable "bignums"
    library can overload them, a library so sloppily written, so ill maintained
    and devoid of love, building on a terrible monstrosity of a mechanism
    I don't even want to think about it, but here we are -jens
*/

Process.prototype.reportVariadicSum = function (numbers) {
    if (!isNaN(+numbers)) {return +numbers; }
    this.assertType(numbers, 'list');
    return this.reportListAggregation(numbers, 'reportSum');
};

Process.prototype.reportSum = function (a, b) {
    return this.hyper(this.reportBasicSum, a, b);
};

Process.prototype.reportBasicSum = function (a, b) {
    return +a + (+b);
};

Process.prototype.reportDifference = function (a, b) {
    return this.hyper(this.reportBasicDifference, a, b);
};

Process.prototype.reportBasicDifference = function (a, b) {
    return +a - +b;
};

Process.prototype.reportVariadicProduct = function (numbers) {
    this.assertType(numbers, 'list');
    return this.reportListAggregation(numbers, 'reportProduct');
};

Process.prototype.reportProduct = function (a, b) {
    return this.hyper(this.reportBasicProduct, a, b);
};

Process.prototype.reportBasicProduct = function (a, b) {
    return +a * +b;
};

Process.prototype.reportQuotient = function (a, b) {
    return this.hyper(this.reportBasicQuotient, a, b);
};

Process.prototype.reportBasicQuotient = function (a, b) {
    return +a / +b;
};

Process.prototype.reportPower = function (a, b) {
    return this.hyper(this.reportBasicPower, a, b);
};

Process.prototype.reportBasicPower = function (a, b) {
    return Math.pow(+a, +b);
};

Process.prototype.reportRandom = function (a, b) {
    return this.hyper(this.reportBasicRandom, a, b);
};

Process.prototype.reportBasicRandom = function (min, max) {
    var floor = Math.min(+min, +max),
        ceil = Math.max(+min, +max);

    function isFloat(n) {
        return (+n % 1 !== 0) || (isString(n) && n.includes('.'));
    }

    if (isFloat(min) || isFloat(max)) {
        return Math.random() * (ceil - floor) + floor;
    }
    return Math.floor(Math.random() * (ceil - floor + 1)) + floor;
};

Process.prototype.reportModulus = function (a, b) {
    return this.hyper(this.reportBasicModulus, a, b);
};

Process.prototype.reportBasicModulus = function (a, b) {
    return ((+a % +b) + (+b)) % +b;
};

Process.prototype.reportAtan2 = function (a, b) {
    return this.hyper(this.reportBasicAtan2, a, b);
};

Process.prototype.reportBasicAtan2 = function (a, b) {
    return degrees(Math.atan2(+a, +b));
};

Process.prototype.reportVariadicMin = function (numbers) {
    this.assertType(numbers, 'list');
    return this.reportListAggregation(numbers, 'reportMin');
};

Process.prototype.reportMin = function (a, b) {
    return this.hyper(this.reportBasicMin, a, b);
};

Process.prototype.reportBasicMin = function (a, b) {
    // return Math.min(+a, +b); // enhanced to also work with text
    var x = +a,
        y = +b;
    if (isNaN(x) || isNaN(y)) {
        x = a;
        y = b;
    }
    return x < y ? x : y;
};

Process.prototype.reportVariadicMax = function (numbers) {
    this.assertType(numbers, 'list');
    return this.reportListAggregation(numbers, 'reportMax');
};

Process.prototype.reportMax = function (a, b) {
    return this.hyper(this.reportBasicMax, a, b);
};

Process.prototype.reportBasicMax = function (a, b) {
    // return Math.max(+a, +b); // enhanced to also work with text
    var x = +a,
        y = +b;
    if (isNaN(x) || isNaN(y)) {
        x = a;
        y = b;
    }
    return x > y ? x : y;
};

// Process logic primitives - hyper-variadic applicative order

Process.prototype.reportVariadicLessThan = function (items) {
    return this.reportSequentialComparison(
        (a, b) => this.reportLessThan(a, b),
        items
    );
};

Process.prototype.reportVariadicGreaterThan = function (items) {
    return this.reportSequentialComparison(
        (a, b) => this.reportGreaterThan(a, b),
        items
    );
};

Process.prototype.reportVariadicLessThanOrEquals = function (items) {
    return this.reportSequentialComparison(
        (a, b) => this.reportLessThanOrEquals(a, b),
        items
    );
};

Process.prototype.reportVariadicGreaterThanOrEquals = function (items) {
    return this.reportSequentialComparison(
        (a, b) => this.reportGreaterThanOrEquals(a, b),
        items
    );
};

Process.prototype.reportVariadicEquals = function (items) {
    return this.reportSequentialComparison(
        (a, b) => this.reportEquals(a, b),
        items,
        true // not hyper
    );
};

Process.prototype.reportVariadicNotEquals = function (items) {
    return this.reportSequentialComparison(
        (a, b) => this.reportNotEquals(a, b),
        items,
        true // not hyper
    );
};

Process.prototype.reportVariadicIsIdentical = function (items) {
    return this.reportSequentialComparison(
        (a, b) => this.reportIsIdentical(a, b),
        items,
        true // not hyper
    );
};

Process.prototype.reportSequentialComparison = function (op, items, notHyper) {
    // private - apply a comparison op to a sequence of values
    var len = items.length(),
        step, result, i;
    if (len < 2) {return true; }
    for (i = 1; i < len; i += 1) {
        step = op(items.at(i), items.at(i + 1));
        if (isNil(result)) {
            result = step;
        } else if (notHyper) {
            result = result && step;
        } else {
            result = this.hyper(
                (a, b) => a && b,
                result,
                step
            );
        }
    }
    return result;
};

// Process logic primitives - hyper where applicable

Process.prototype.reportLessThan = function (a, b) {
    return this.hyper(this.reportBasicLessThan, a, b);
};

Process.prototype.reportLessThanOrEquals = function (a, b) {
    return this.hyper(
        (a, b) => !this.reportBasicGreaterThan(a, b),
        a,
        b
    );
};

Process.prototype.reportBasicLessThan = function (a, b) {
    var x = +a,
        y = +b;
    if (isNaN(x) || isNaN(y)) {
        x = a;
        y = b;
    }
    if (Process.prototype.isCaseInsensitive) {
        if (isString(x)) {
            x = x.toLowerCase();
        }
        if (isString(y)) {
            y = y.toLowerCase();
        }
    }
    return x < y;
};

Process.prototype.reportGreaterThan = function (a, b) {
    return this.hyper(this.reportBasicGreaterThan, a, b);
};

Process.prototype.reportGreaterThanOrEquals = function (a, b) {
    return this.hyper(
        (a, b) => !this.reportBasicLessThan(a, b),
        a,
        b
    );
};

Process.prototype.reportBasicGreaterThan = function (a, b) {
    var x = +a,
        y = +b;
    if (isNaN(x) || isNaN(y)) {
        x = a;
        y = b;
    }
    if (Process.prototype.isCaseInsensitive) {
        if (isString(x)) {
            x = x.toLowerCase();
        }
        if (isString(y)) {
            y = y.toLowerCase();
        }
    }
    return x > y;
};

Process.prototype.reportEquals = function (a, b) {
    return snapEquals(a, b);
};

Process.prototype.reportNotEquals = function (a, b) {
    return !snapEquals(a, b);
};

Process.prototype.reportNot = function (bool) {
    return this.hyper(val => !val, bool);
};

Process.prototype.reportIsIdentical = function (a, b) {
    var tag = 'idTag';
    if (isString(a) && isString(b)) {
        // compare texts case-sentitive
        return a === b;
    }
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

// Process monadic primitives

Process.prototype.reportRound = function (n) {
    return this.hyper(this.reportBasicRound, n);
};

Process.prototype.reportBasicRound = function (n) {
    return Math.round(+n);
};

Process.prototype.reportMonadic = function (fname, n) {
    return this.hyper(
        num => this.reportBasicMonadic(fname, num),
        n
    );
};

Process.prototype.reportBasicMonadic = function (fname, n) {
    var x = +n,
        result = 0;

    switch (this.inputOption(fname)) {
    case 'abs':
        result = Math.abs(x);
        break;
    // case '\u2212': // minus-sign
    case 'neg':
        result = n * -1;
        break;
    case 'sign':
        result = Math.sign(x);
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
        result =  Math.log10(x);
        break;
    case 'lg': // base 2
        result =  Math.log2(x);
        break;
    case 'e^':
        result = Math.exp(x);
        break;
    case '10^':
        result = Math.pow(10, x);
        break;
    case '2^':
        result = Math.pow(2, x);
        break;
    case 'sigmoid':
    case 'σ':
        result = 1 / (1 + Math.exp(-x));
        break;
    case 'sigmoid\'':
    case '∂σ':
        result = x * (1 - x);
        break;
    case 'id':
        return n;
    default:
        nop();
    }
    return result;
};

// Process - non hyper-monadic text primitives

Process.prototype.reportTextFunction = function (fname, string) {
    // currently in dev mode only, not hyper-monadic
    var x = (isNil(string) ? '' : string).toString(),
        result = x;

    switch (this.inputOption(fname)) {
    case 'select':
        result = [x];
        break;
    case 'unselect':
        break;
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
    case 'JS escape':
        result = JSCompiler.prototype.escape(x);
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
        if (this.isAST(aList)) {
            return this.assemble(aList);
        }
        return aList.asText();
    }
    return (aList || '').toString();
};

Process.prototype.isAST = function (aList) {
    var first = aList.at(1);
    if (first instanceof Context) {
        return true;
    }
    if (first instanceof List) {
        return first.at(1) instanceof Context;
    }
    return false;
};

// Process string ops - hyper

Process.prototype.reportLetter = function (idx, string) {
    return this.hyper(
        (ix, str) => this.reportBasicLetter(ix, str),
        idx,
        string
    );
};

Process.prototype.safeStringArray = function (str) {
    // An error is thrown if the string is > 125814708 characters long
    // While both strings and arrays can be much longer, the JS runtime
    // throws an error when using a string iterator which is too long.
    // We set this value at an "even" 100 million characters.
    let MAX_STRING_LENGTH = 100e6;
    str = (str || '').toString();
    if (str.length > MAX_STRING_LENGTH) {
        return str;
    }
    return Array.from(str.toString());
};

Process.prototype.reportBasicLetter = function (idx, string) {
    var str = isNil(string) ? '' : string.toString(),
        char_array = this.safeStringArray(str),
        i;
    if (this.inputOption(idx) === 'all') {
        return new List(char_array);
    }
    if (this.inputOption(idx) === 'random') {
        idx = this.reportBasicRandom(1, char_array.length);
    }
    if (this.inputOption(idx) === 'last') {
        idx = char_array.length;
    }
    i = +(idx || 0);
    return char_array[i - 1] || '';
};

Process.prototype.reportTextAttribute = function (choice, text) {
    var option = this.inputOption(choice);
    switch (option) {
    case 'length':
        return this.reportStringSize(text);
    case 'lower case':
        return this.hyper(
            str => isString(str) ? str.toLowerCase() : str,
            text
        );
    case 'upper case':
        return this.hyper(
            str => isString(str) ? str.toUpperCase() : str,
            text
        );
    default:
        return 0;
    }
};

Process.prototype.reportStringSize = function (data) {
    return this.hyper(
        str => isString(str) ? this.safeStringArray(str).length
                : (parseFloat(str) === +str ? str.toString().length : 0),
        data
    );
};

Process.prototype.reportUnicode = function (string) {
    // special case to report a list of numbers for a string of characters,
    // hence this is NOT using hyper()
    var str, unicodeList;

    if (this.enableHyperOps) {
        if (string instanceof List) {
            return string.map(each => this.reportUnicode(each));
        }
        str = isNil(string) ? '\u0000' : string.toString();
        unicodeList = this.safeStringArray(str);
        if (unicodeList.length > 1) {
            return this.reportUnicode(new List(unicodeList));
        }
    } else {
        str = isNil(string) ? '\u0000' : string.toString();
    }
    if (str.codePointAt) { // support for Unicode in newer browsers.
        return str.codePointAt(0) || 0;
    }
    return str.charCodeAt(0) || 0;
};

Process.prototype.reportUnicodeAsLetter = function (num) {
    return this.hyper(this.reportBasicUnicodeAsLetter, num);
};

Process.prototype.reportBasicUnicodeAsLetter = function (num) {
    var code = +(num || 0);

    if (String.fromCodePoint) { // support for Unicode in newer browsers.
        return String.fromCodePoint(code);
    }
    return String.fromCharCode(code);
};

Process.prototype.reportTextSplit = function (string, delimiter) {
    if (this.inputOption(delimiter) === 'blocks') {
        if (isString(string) && '(;'.includes(string.trim()[0])) {
            return this.parseCode(string);
        }
        this.assertType(string, ['command', 'reporter', 'predicate', 'hat']);
        return string.components();
    }
    return this.hyper(
        (str, delim) => this.reportBasicTextSplit(str, delim),
        string,
        delimiter
    );
};

Process.prototype.reportBasicTextSplit = function (string, delimiter) {
    var types = ['text', 'number'],
        strType = this.reportTypeOf(string),
        delType = this.reportTypeOf(this.inputOption(delimiter)),
        str,
        del;
    if (!contains(types, strType)) {
        throw new Error(
            localize('expecting a') + ' ' +
            localize('text') + ' ' +
            localize('but getting a') + ' ' +
            localize(strType)
        );
    }
    if (!contains(types, delType)) {
        throw new Error(
            localize('expecting a') + ' ' +
            localize('text') + ' ' +
            localize('but getting a') + ' ' +
            localize(delType)
        );
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
    case 'word':
    case 'whitespace':
        str = str.trim();
        del = /\s+/;
        break;
    case '':
    case 'letter':
        return new List(this.safeStringArray(str));
    case 'csv':
        return this.parseCSV(string);
    case 'json':
        return this.parseJSON(string);
    default:
        del = delimiter.toString();
        if (this.isCaseInsensitive) {
            del = new RegExp(
                del.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'),
                "ig"
            );
        }
    }
    return new List(str.split(del));
};

// Process - parsing primitives

Process.prototype.parseCSV = function (text) {
    // try to address the kludge that Excel sometimes uses commas
    // and sometimes semi-colons as delimiters, try to find out
    // which makes more sense by examining the first line
    return this.rawParseCSV(text, this.guessDelimiterCSV(text));
};

Process.prototype.guessDelimiterCSV = function (text) {
    // assumes that the first line contains the column headers.
    // report the first delimiter for which parsing the header
    // yields more than a single field, otherwise default to comma
    var delims = [',', ';', '|', '\t'],
        len = delims.length,
        firstLine = text.split('\n')[0],
        i;
    for (i = 0; i < len; i += 1) {
        if (this.rawParseCSV(firstLine, delims[i]).length() > 1) {
            return delims[i];
        }
    }
    return delims[0];
};

Process.prototype.rawParseCSV = function (text, delim) {
    // RFC 4180
    // parse a csv table into a two-dimensional list.
    // if the table contains just a single row return it a one-dimensional
    // list of fields instead (for backwards-compatibility)
    var prev = '',
        fields = [''],
        records = [fields],
        col = 0,
        r = 0,
        esc = true,
        len = text.length,
        idx,
        char;
    delim = delim || ',';
    for (idx = 0; idx < len; idx += 1) {
        char = text[idx];
        if (char === '\"') {
            if (esc && char === prev) {
                fields[col] += char;
            }
            esc = !esc;
        } else if (char === delim && esc) {
            char = '';
            col += 1;
            fields[col] = char;
        } else if (char === '\r' && esc) {
            r += 1;
            records[r] = [''];
            fields = records[r];
            col = 0;
        } else if (char === '\n' && esc) {
            if (prev !== '\r') {
                r += 1;
                records[r] = [''];
                fields = records[r];
                col = 0;
            }
        } else {
            fields[col] += char;
        }
        prev = char;
    }

    // remove the last record, if it is empty
    if (records[records.length - 1].length === 1 &&
            records[records.length - 1][0] === '')
    {
        records.pop();
    }

    // convert arrays to Snap! Lists
    records = new List(
        records.map(row => new List(row))
    );

    // for backwards compatibility return the first row if it is the only one
    if (records.length() === 1) {
        return records.at(1);
    }
    return records;
};

Process.prototype.parseJSON = function (string) {
    // Bernat's original Snapi contribution
    function listify(jsonObject) {
        if (jsonObject instanceof Array) {
            return new List(
                jsonObject.map(function(eachElement) {
                    return listify(eachElement);
                })
            );
        } else if (jsonObject instanceof Object) {
            return new List(
                Object.keys(jsonObject).map(function(eachKey) {
                    return new List([
                        eachKey,
                        listify(jsonObject[eachKey])
                    ]);
                })
            );
        } else {
            return jsonObject;
        }
    }

    return listify(JSON.parse(string));
};

Process.prototype.parseCode = function (string) {
    var data = new List();
    data.parse(string);
    return this.toBlockSyntax(data);
};

// Process syntax analysis

Process.prototype.assemble = function (blocks) {
    var first;
    if (!(blocks instanceof List)) {
        return blocks;
    }
    first = blocks.at(1);
    if (first instanceof Context) {
        return first.copyWithInputs(
            blocks.cdr().map(each => this.assemble(each))
        );
    }
    if (blocks.isEmpty()) {
        return blocks;
    }
    if (this.reportIsA(blocks.at(1), 'number')) {
        return blocks.map(each => this.assemble(each));
    }
    return blocks.map(each => this.assemble(each)).itemsArray().reduce(
        (a, b) => a.copyWithNext(b)
    );
};

// Process - generating syntax trees from parsed text

Process.prototype.toBlockSyntax = function (list) {
    var head, data;
    if (list.isEmpty()) {
        return list;
    }
    head = list.at(1);
    if (snapEquals(head, 'items')) { // reserved token for data
        data = this.toInputSyntax(list.cdr());
        return list.cons(data.length(), data);
    }
    return this.variadify(
        list.cons(
            head instanceof List ? this.toBlockSyntax(head)
                : this.blockMatching(head),
            this.toInputSyntax(list.cdr())
        )
    );
};

Process.prototype.blockMatching = function (string) {
    // allow caching the palette for bulk-bootstrapping
    var pal = this.context.accumulator || this.reportGet('blocks'),
        block,
        lbl,
        i;
    if (pal) { // when bootstrapping the palette at first launch it can be empty
        for (i = 1; i <= pal.length(); i += 1) {
            block = pal.at(i);
            if (block.expression && block.expression.isCustomBlock) {
                lbl = this.reportBasicBlockAttribute('label', block);
                if (snapEquals(string, lbl)) {
                    return block;
                }
            }
        }
    }
    return (SpriteMorph.prototype.blockForSelector(
        this.blockAlias(string)
    ) || SpriteMorph.prototype.variableBlock(' ')).reify();
};

Process.prototype.toInputSyntax = function (list) {
    var head;
    if (list.isEmpty()) {
        return list;
    }
    head = list.at(1);
    return list.cons(
        head instanceof List ? this.toBlockSyntax(head)
            : this.parseInputValue(head),
        this.toInputSyntax(list.cdr())
    );
};

Process.prototype.parseInputValue = function (data) {
    if (snapEquals(data, 't')) {
        return true;
    }
    if (snapEquals(data, 'f')) {
        return false;
    }
    return data;
};

Process.prototype.variadify = function (list) {
    var ring = list.at(1),
        slot, idx, syntax, items;
    if (ring instanceof List) {
        return list;
    }
    slot = ring.expression.inputs().find(any =>
        any instanceof MultiArgMorph);
    if (slot) {
        idx = ring.expression.inputs().indexOf(slot) + 1;
        slot.collapseAll();
        items = list.itemsArray();
        syntax = new List(items.slice(0, idx));
        if (list.at(idx + 1) === ':') {
            syntax.add(list.at(idx + 2));
            if (list.length() > idx + 2) {
                // add following tokens as ring parameters, if any
                for (idx = idx + 3; idx <= list.length(); idx += 1) {
                    syntax.add(list.at(idx));
                }
            }
        } else {
            syntax.add(new List(
                [list.cons(
                    list.length() - idx,
                    new List(items.slice(idx))
                )]
            ));
        }
        return syntax;
    }
    return list;
};

Process.prototype.blockAlias = function (string) {
    return snapEquals(string, 'get') ? 'reportGetVar'
        : Object.keys(SpriteMorph.prototype.blocks).find(key =>
            snapEquals(SpriteMorph.prototype.blocks[key]?.code, string)) || string;
};

Process.prototype.selectorAlias = function (string) {
    return string === 'reportGetVar' ? 'get'
        : SpriteMorph.prototype.blocks[string]?.code || string;
};

// Process - replacing blocks in syntax trees with text

Process.prototype.toTextSyntax = function (list) {
    var head, syn;
    if (list.isEmpty()) {
        return list;
    }
    syn = this.devariadify(list);
    head = syn.at(1);
    return syn.cons(
        head instanceof List ? this.toTextSyntax(head)
            : (head === Symbol.for('items') ? 'items' // reserved token for data
                : this.blockToken(head)),
        this.toInputTextSyntax(syn.cdr())
    );
};

Process.prototype.devariadify = function (list) {
    var ring = list.at(1),
        slot, idx, syntax,
        arr, slots, inps, slotInputs;
    if (ring instanceof List) {
        return list;
    }
    slot = ring.expression?.inputs().find(any =>
        any instanceof MultiArgMorph);

    if (slot) {
        if (!slot.inputs().length) {
            // "with input list"
            idx = ring.expression.inputs().indexOf(slot) + 1;
            syntax = list.map(each => each); // shallow copy
            if (syntax.length() === (idx + 1) && syntax.at(idx + 1) === '') {
                syntax.remove(idx + 1);
                return syntax;
            }
            syntax.add(':', idx + 1);
            return syntax;
        }
        inps = slot.inputs();
        slots = ring.expression.inputs();
        if (inps.length + slots.length < list.length()) {
            // special case: the first expression has a variadic slot
            // that conflicts with surplus ring parameters
            // solution: collect the slot inputs in a separate data list
            arr = list.itemsArray();
            idx = slots.indexOf(slot) + 1;
            syntax = new List(arr.slice(0, idx));
            slotInputs = arr.slice(idx, idx + inps.length);
            slotInputs.unshift(Symbol.for('items'));
            syntax.add(':');
            syntax.add(new List(slotInputs));
            arr.slice(idx + inps.length, list.length()).forEach(each =>
                syntax.add(each));
            return syntax;
        }
    }
    return list;
};

Process.prototype.blockToken = function (ring) {
    var block = ring.expression;
    return isNil(block) ? 'ring'
        : block.isCustomBlock &&
            !(block.isGlobal && block.definition.isBootstrapped()) ?
                this.reportBasicBlockAttribute('label', ring)
                : this.selectorAlias(block.selector);
};

Process.prototype.toInputTextSyntax = function (list) {
    var head;
    if (list.isEmpty()) {
        return list;
    }
    head = list.at(1);
    return list.cons(
        head instanceof List ? this.toTextSyntax(head) : head,
        this.toInputTextSyntax(list.cdr())
    );
};

// Process debugging

Process.prototype.alert = function (data) {
    // debugging primitives only work in dev mode, otherwise they're nop
    var world;
    if (this.homeContext.receiver) {
        world = this.homeContext.receiver.world();
        if (world.isDevMode) {
            alert('Snap! ' + data.itemsArray());
        }
    }
};

Process.prototype.log = function (data) {
    // debugging primitives only work in dev mode, otherwise they're nop
    var world;
    if (this.homeContext.receiver) {
        world = this.homeContext.receiver.world();
        if (world.isDevMode) {
            console.log('Snap! ' + data.itemsArray());
        }
    }
};

// Process motion primitives

Process.prototype.getOtherObject = function (name, thisObj, stageObj) {
    // private, find the sprite indicated by the given name
    // either onstage or in the World's hand

    // deal with first-class sprites
    if (isSnapObject(name)) {
        return name;
    }

    if (this.inputOption(name) === 'myself') {
        return thisObj;
    }
    var stage = isNil(stageObj) ?
                thisObj.parentThatIsA(StageMorph) : stageObj,
        thatObj = null;
    if (stage) {
        // find the corresponding sprite on the stage
        thatObj = detect(
            stage.children,
            morph => snapEquals(morph.name, name)
        );
        if (!thatObj) {
            // check if the sprite in question is currently being
            // dragged around
            thatObj = detect(
                stage.world().hand.children,
                morph => morph instanceof SpriteMorph &&
                    morph.name === name
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
            direction = this.reportBasicRandom(1, 36000) / 100;
        }
		thisObj.setHeading(direction);
    }
};

Process.prototype.doFaceTowards = function (name) {
    var thisObj = this.blockReceiver(),
        thatObj;

    if (thisObj) {
        if (this.inputOption(name) === 'center') {
            thisObj.faceToXY(0, 0);
        } else if (this.inputOption(name) === 'mouse-pointer') {
            thisObj.faceToXY(this.reportMouseX(), this.reportMouseY());
        } else if (this.inputOption(name) === 'random position') {
        	thisObj.setHeading(this.reportBasicRandom(1, 36000) / 100);
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
        if (this.inputOption(name) === 'center') {
            thisObj.gotoXY(0, 0);
        } else if (this.inputOption(name) === 'mouse-pointer') {
            thisObj.gotoXY(this.reportMouseX(), this.reportMouseY());
        } else if (this.inputOption(name) === 'random position') {
	        stage = thisObj.parentThatIsA(StageMorph);
    	    if (stage) {
         		thisObj.setCenter(new Point(
					this.reportBasicRandom(stage.left(), stage.right()),
                    this.reportBasicRandom(stage.top(), stage.bottom())
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

// Process layering primitives

Process.prototype.goToLayer = function (name) {
    var option = this.inputOption(name),
        thisObj = this.blockReceiver();
    if (thisObj instanceof SpriteMorph) {
        if (option === 'front') {
            thisObj.comeToFront();
        } else if (option === 'back') {
            thisObj.goToBack();
        }
    }
};

// Process scene primitives

Process.prototype.doSwitchToScene = function (id, transmission) {
    var rcvr = this.blockReceiver(),
        idx = 0,
        message = this.inputOption(transmission.at(1)),
        payload = transmission.at(2),
        ide, scenes, num, scene;
    this.assertAlive(rcvr);
    this.assertType(message, ['text', 'number', 'Boolean', 'list']);
    this.assertType(payload, ['text', 'number', 'Boolean', 'list']);
    if (message instanceof List) {
        // make sure only atomic leafs are inside the list
        // don't actually encode the list as json, though
        if (message.canBeJSON()) {
            message = message.deepMap(leaf => leaf); // deep copy the list
        } else {
            throw new Error(localize(
                'cannot send media,\nsprites or procedures\nto another scene'
            ));
        }
    }
    if (payload instanceof List) {
        // make sure only atomic leafs are inside the list
        // don't actually encode the list as json, though
        if (payload.canBeJSON()) {
            payload = payload.deepMap(leaf => leaf); // deep copy the list
        } else {
            throw new Error(localize(
                'cannot send media,\nsprites or procedures\nto another scene'
            ));
        }
    }
    if (this.readyToTerminate) {
        // let the user press "stop" or "esc",
        // prevent "when this scene starts" hat blocks from directly
        // switching to another
        return;
    }
    ide = rcvr.parentThatIsA(IDE_Morph);
    scenes = ide.scenes;

    if (id instanceof Array) { // special named indices
        switch (this.inputOption(id)) {
        case 'next':
            idx = scenes.indexOf(ide.scene) + 1;
            if (idx > scenes.length()) {
                idx = 1;
            }
            break;
        case 'previous':
            idx = scenes.indexOf(ide.scene) - 1;
            if (idx < 1) {
                idx = scenes.length();
            }
            break;
        /*
        case 'last':
            idx = scenes.length();
            break;
        */
        case 'random':
            idx = this.reportBasicRandom(1, scenes.length());
            break;
        }
        this.stop();
        // ide.onNextStep = () => // slow down scene switching, disabled for now
        ide.switchToScene(scenes.at(idx), null, message, payload);
        return;
    }

    scene = detect(scenes.itemsArray(), scn => scn.name === id);
    if (scene === null) {
        num = parseFloat(id);
        if (isNaN(num)) {
            return;
        }
        scene = scenes.at(num);
    }

    this.stop();
    ide.switchToScene(scene, null, message, payload);
};

// Process color primitives

Process.prototype.castColor = function (color) {
    // private - return the given color, if it is a list of numbers, return
    // a color represented by the list's rgba values
    // if the list is a single color, interpret it as grayscales
    // if the list has 2 values, interpret it as grayscale and alpha
    // if it has 3 values, treat it as solid rgba
    var clr = color,
        len, first, n;
    this.assertType(color, ['color', 'list', 'costume']);

    if (this.enableHyperOps) {
        if (this.reportQuickRank(clr) > 1) {
            // hyper-monadicized
            return clr.map(each => this.castColor(each));
        }
        if (color instanceof Costume) {
            return this.castColor(color.rasterized().pixels().reshape(new List([
                color.height(),
                color.width(),
                4
            ])));
        }
    }
    if (color instanceof List) {
        first = clr.at(1);
        if ((first instanceof Color || first instanceof Costume) &&
            this.enableHyperOps
        ) {
            return clr.map(each => this.castColor(each));
        }
        clr = new Color();
        len = color.length();
        if (len > 0 && len < 3) {
            n = color.at(1);
            this.assertType(n, 'number');
            n = Math.min(Math.max(+n, 0), 255);
            clr.r = n;
            clr.g = n;
            clr.b = n;
            if (len === 2) {
                n = color.at(2);
                this.assertType(n, 'number');
                clr.a = Math.min(Math.max(+n, 0), 255) / 255;
            }
        } else if (len > 0) {
            n = color.at(1);
            this.assertType(n, 'number');
            clr.r = Math.min(Math.max(+n, 0), 255);
            n = color.at(2);
            this.assertType(n, 'number');
            clr.g = Math.min(Math.max(+n, 0), 255);
            n = color.at(3);
            this.assertType(n, 'number');
            clr.b = Math.min(Math.max(+n, 0), 255);
            if (color.length() > 3) {
                n = color.at(4);
                this.assertType(n, 'number');
                clr.a = Math.min(Math.max(n, 0), 255) / 255;
            }
        }
    }
    return clr;
};

Process.prototype.reportColor = function (color) {
    return this.castColor(color);
};

Process.prototype.reportColorAttribute = function (attrib, color) {
    return this.hyper(
        (att, obj) => this.reportBasicColorAttribute(att, obj),
        attrib,
        this.castColor(color)
    );
};

Process.prototype.reportBasicColorAttribute = function (attrib, clr) {
    var options = ['hue', 'saturation', 'brightness', 'transparency'],
        choice = this.inputOption(attrib),
        model,
        idx;
    if (choice === 'r-g-b-a') {
        return new List([
            clr.r,
            clr.g,
            clr.b,
            Math.round(clr.a * 255)
        ]);
    }
    model = clr[SpriteMorph.prototype.penColorModel]();
    if (choice === 'h-s-b-t') {
        return new List([
            (model[0] || 0) * 100,
            (model[1] || 0) * 100,
            (model[2] || 0) * 100,
            (1 - clr.a) * 100
        ]);
    }
    idx = options.indexOf(choice);
    if (idx === 3) {
        return (1 - clr.a) * 100;
    }
    return (model[idx] || 0) * 100;
};

Process.prototype.reportNewColor = function (hsbt) {
    // return the given color encoded by a list of numbers
    // representing hsbt values, - brightness/lightness - depending
    // on the user's globel color model setting.
    // fill-in missing dimensions with default values.
    var model = SpriteMorph.prototype.penColorModel,
        len, clr, h, s, b, t;
    this.assertType(hsbt, 'list');
    if (this.reportQuickRank(hsbt) > 1) { // hyper-monadicized
        return hsbt.map(each => this.reportNewColor(each));
    }
    len = hsbt.length();
    h = len < 1 ? 0 : this.reportBasicModulus(hsbt.at(1), 100) / 100;
    this.assertType(h, 'number');
    s = len < 2 ? 1 : Math.min(Math.max(hsbt.at(2), 0), 100) / 100;
    this.assertType(s, 'number');
    b = len < 3 ? (model === 'hsl' ? 0.5 : 1)
        : Math.min(Math.max(hsbt.at(3), 0), 100) / 100;
    this.assertType(b, 'number');
    t = len < 4 ? 0 : Math.min(Math.max(hsbt.at(4), 0), 100) / 100;
    this.assertType(t, 'number');
    clr = new Color();
    clr['set_' + model].apply(clr, [h, s, b]);
    clr.a = 1 - t;
    return clr;
};

Process.prototype.setColor = function (color) {
    this.blockReceiver().setColor(this.castColor(color));
};

Process.prototype.reportTouchingColor = function (color) {
    return this.blockReceiver().reportTouchingColor(this.castColor(color));
};

Process.prototype.reportColorIsTouchingColor = function (color, another) {
    return this.blockReceiver().reportColorIsTouchingColor(
        this.castColor(color),
        this.castColor(another)
    );
};

Process.prototype.setColorDimension = function (name, num) {
    var options = ['hue', 'saturation', 'brightness', 'transparency'],
        choice = this.inputOption(name);
    if (choice === 'r-g-b(-a)') {
        this.blockReceiver().setColorRGBA(num);
        return;
    }
    this.blockReceiver().setColorDimension(
        options.indexOf(choice),
        +num
    );
};

Process.prototype.changeColorDimension = function (name, num) {
    var options = ['hue', 'saturation', 'brightness', 'transparency'],
        choice = this.inputOption(name);
    if (choice === 'r-g-b(-a)') {
        this.blockReceiver().changeColorRGBA(num);
        return;
    }
    this.blockReceiver().changeColorDimension(
        options.indexOf(choice),
        +num
    );
};

Process.prototype.setPenColorDimension =
    Process.prototype.setColorDimension;

Process.prototype.changePenColorDimension =
    Process.prototype.changeColorDimension;

Process.prototype.setBackgroundColorDimension =
    Process.prototype.setColorDimension;

Process.prototype.changeBackgroundColorDimension =
    Process.prototype.changeColorDimension;

// Process cutting & pasting primitives

Process.prototype.doPasteOn = function (name) {
    this.blitOn(name, 'source-atop');
};

Process.prototype.doCutFrom = function (name) {
    this.blitOn(name, 'destination-out');
};

Process.prototype.doDrawOn = function (mode, surface) {
    var rcvr = this.blockReceiver(),
        mask = this.inputOption(mode),
        dest = this.inputOption(surface),
        tools = ['paint', 'erase', 'overdraw'];
    rcvr.sheet = (dest === 'pen trails' ? null
        : this.reportObject(dest) || null);
    if (rcvr.sheet === rcvr || rcvr.sheet instanceof StageMorph) {
        // drawing on the stage's costume is disabled for now.
        rcvr.sheet = null;
    }
    rcvr.tool = contains(tools, mask) ? mask || null : null;
};

Process.prototype.blitOn = function (name, mask, thisObj, stage) {
    // allow for lists of sprites and also check for temparary clones,
    // as in Scratch 2.0,
    var those;
    thisObj = thisObj || this.blockReceiver();
    stage = stage || thisObj.parentThatIsA(StageMorph);
    if (stage.name === name) {
        name = stage;
    }
    if (isSnapObject(name)) {
        return thisObj.blitOn(name, mask);
    }
    if (name instanceof List) { // assume all elements to be sprites
        those = name.itemsArray();
    } else {
        those = this.getObjectsNamed(name, thisObj, stage); // clones
    }
    those.forEach(each => {
        // only draw on same-named clones that don't dynamically the costume
        if (!each.inheritsAttribute('costume #')) {
            this.blitOn(each, mask, thisObj, stage);
        }
    });
};

// Process temporary cloning (Scratch-style)

Process.prototype.createClone = function (name) {
    var thisObj = this.blockReceiver(),
        thatObj;

    if (!name || this.readyToTerminate) {return; }
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
        } else if (this.inputOption(name) === 'Turtle sprite') {
            return thisObj.newTurtleSprite();
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
    var those,
        stage,
        box,
        coord;

    if (this.inputOption(name) === 'mouse-pointer') {
        coord = thisObj.world().hand.position();
        if (thisObj.bounds.containsPoint(coord) &&
                !thisObj.isTransparentAt(coord)) {
            return true;
        }
    } else if (this.isCoordinate(name)) {
        coord = thisObj.worldPoint(new Point(name.at(1), name.at(2)));
        if (thisObj.bounds.containsPoint(coord) &&
                !thisObj.isTransparentAt(coord)) {
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
                return name.isVisible && thisObj.isTouching(name);
            }
            if (name instanceof List) { // assume all elements to be sprites
                those = name.itemsArray();
            } else {
                those = this.getObjectsNamed(name, thisObj, stage); // clones
            }
            if (those.some(any => any.isVisible && thisObj.isTouching(any)
                    // check collision with any part, performance issue
                    // commented out for now
                /*
                    return any.allParts().some(function (part) {
                        return part.isVisible && thisObj.isTouching(part);
                    })
                */
                )) {
                return true;
            }
        }
    }
    return thisObj.parts.some(any =>
        this.objectTouchingObject(any, name)
    );
};

Process.prototype.reportAspect = function (aspect, location) {
    // sense colors and sprites anywhere,
    // use sprites to read/write data encoded in colors.
    //
    // usage:
    // ------
    // left input selects color/saturation/brightness/transparency or "sprites".
    // right input selects "mouse-pointer", "myself" or name of another sprite.
    // you can also embed a a reporter with a reference to a sprite itself
    // or a list of two items representing x- and y- coordinates.
    //
    // what you'll get:
    // ----------------
    // left input (aspect):
    //
    //      'color'         - a COLOR object
    //      'hue'           - hsv HUE on a scale of 0 - 100
    //      'saturation'    - hsv SATURATION on a scale of 0 - 100
    //      'brightness'    - hsv BRIGHTNESS on a scale of 0 - 100
    //      'transparency'  - rgba ALPHA on a reversed (!) scale of 0 - 100
    //      'r-g-b-a'       - list of rgba values on a scale of 0 - 255 each
    //      'sprites'       - a list of sprites at the location, empty if none
    //
    // right input (location):
    //
    //      'mouse-pointer' - color/sprites at mouse-pointer anywhere in Snap
    //      'myself'        - sprites at or color UNDERNEATH the rotation center
    //      sprite-name     - sprites at or color UNDERNEATH sprites's rot-ctr.
    //      two-item-list   - color/sprites at x-/y- coordinates on the Stage
    //
    // what does "underneath" mean?
    // ----------------------------
    // the not-fully-transparent color of the top-layered sprite at the given
    // location excluding the receiver sprite's own layer and all layers above
    // it gets reported.
    //
    // color-aspect "underneath" a sprite means that the sprite's layer is
    // relevant for what gets reported. Sprites can only sense colors in layers
    // below themselves, not their own color and not colors in sprites above
    // their own layer.

    if (this.enableHyperOps) {
        if (location instanceof List && !this.isCoordinate(location)) {
            return location.map(each => this.reportAspect(aspect, each));
        }
    }

    var choice = this.inputOption(aspect),
        target = this.inputOption(location),
        options = ['hue', 'saturation', 'brightness', 'transparency'],
        idx = options.indexOf(choice),
        thisObj = this.blockReceiver(),
        thatObj,
        stage = thisObj.parentThatIsA(StageMorph),
        world = thisObj.world(),
        point,
        clr;

    if (target === 'myself') {
        if (choice === 'sprites') {
            if (thisObj instanceof StageMorph) {
                point = thisObj.center();
            } else {
                point = thisObj.rotationCenter();
            }
            return this.spritesAtPoint(point, stage);
        } else {
            clr = this.colorAtSprite(thisObj);
        }
    } else if (target === 'mouse-pointer') {
        if (choice === 'sprites') {
            return this.spritesAtPoint(world.hand.position(), stage);
        } else {
            clr = world.getGlobalPixelColor(world.hand.position());
        }
    } else if (target instanceof List) {
        point = new Point(
            target.at(1) * stage.scale + stage.center().x,
            stage.center().y - (target.at(2) * stage.scale)
        );
        if (choice === 'sprites') {
            return this.spritesAtPoint(point, stage);
        } else {
            clr = world.getGlobalPixelColor(point);
        }
    } else {
        if (!target) {return; }
        thatObj = this.getOtherObject(target, thisObj, stage);
        if (thatObj) {
            if (choice === 'sprites') {
                point = thatObj instanceof SpriteMorph ?
                    thatObj.rotationCenter() : thatObj.center();
                return this.spritesAtPoint(point, stage);
            } else {
                clr = this.colorAtSprite(thatObj);
            }
        } else {
            return;
        }

    }

    if (choice === 'color') {
        return clr.copy();
    }
    if (choice === 'r-g-b-a') {
        return new List([clr.r, clr.g, clr.b, Math.round(clr.a * 255)]);
    }
    if (idx < 0 || idx > 3) {
        return;
    }
    if (idx === 3) {
        return (1 - clr.a) * 100;
    }
    return clr[SpriteMorph.prototype.penColorModel]()[idx] * 100;
};

Process.prototype.colorAtSprite = function (sprite) {
    // private - helper function for aspect of location
    // answer the top-most color at the sprite's rotation center
    // excluding the sprite itself
    var point = sprite instanceof SpriteMorph ? sprite.rotationCenter()
            : sprite.center(),
        stage = sprite.parentThatIsA(StageMorph),
        child,
        i;

    if (!stage) {return BLACK; }
    for (i = stage.children.length; i > 0; i -= 1) {
        child = stage.children[i - 1];
        if ((child !== sprite) &&
            child.isVisible &&
            child.bounds.containsPoint(point) &&
            !child.isTransparentAt(point)
        ) {
            return child.getPixelColor(point);
        }
    }
    if (stage.bounds.containsPoint(point)) {
        return stage.getPixelColor(point);
    }
    return BLACK;
};

Process.prototype.colorBelowSprite = function (sprite) {
    // private - helper function for aspect of location
    // answer the color underneath the layer of the sprite's rotation center
    // NOTE: layer-aware color sensing is currently unused
    // in favor of top-layer detection because of user-observations
    var point = sprite instanceof SpriteMorph ? sprite.rotationCenter()
            : sprite.center(),
        stage = sprite.parentThatIsA(StageMorph),
        below = stage,
        found = false,
        child,
        i;

    if (!stage) {return BLACK; }
    for (i = 0; i < stage.children.length; i += 1) {
        if (!found) {
            child = stage.children[i];
            if (child === sprite) {
                found = true;
            } else if (child.isVisible &&
                child.bounds.containsPoint(point) &&
                !child.isTransparentAt(point)
            ) {
                below = child;
            }
        }
    }
    if (below.bounds.containsPoint(point)) {
        return below.getPixelColor(point);
    }
    return BLACK;
};

Process.prototype.spritesAtPoint = function (point, stage) {
    // private - helper function for aspect of location
    // point argument is an absolute (Morphic) point
    // answer a list of sprites, if any, at the given point
    // ordered by their layer, i.e. top-layer is last in the list
    return new List(
        stage.children.filter(morph =>
            morph instanceof SpriteMorph &&
                morph.isVisible &&
                    morph.bounds.containsPoint(point) &&
                        !morph.isTransparentAt(point)
        )
    );
};

Process.prototype.reportRelationTo = function (relation, name) {
    if (this.enableHyperOps) {
        if (name instanceof List) {
            // make all numerical 2-item lists atomic
            name = this.packCoordinates(name);
        }
        return this.hyperDyadic(
            (rel, nam) => this.reportBasicRelationTo(rel, nam),
            relation,
            name
        );
    }
    return this.reportBasicRelationTo(relation, name);
};

Process.prototype.reportBasicRelationTo = function (relation, name) {
	var rel = this.inputOption(relation);
    if (name instanceof Variable) { // atomic coordinate
        name = name.value;
    }
 	if (rel === 'distance') {
  		return this.reportDistanceTo(name);
  	}
    if (rel === 'ray length') {
    	return this.reportRayLengthTo(name);
    }
    if (rel === 'direction') {
    	return this.reportDirectionTo(name);
    }
    if (this.reportTypeOf(rel) === 'number') {
        return this.reportRayLengthTo(name, +rel);
    }
    return 0;
};

Process.prototype.isCoordinate = function (data) {
    return data instanceof List &&
        (data.length() === 2) &&
            this.reportTypeOf(data.at(1)) === 'number' &&
                this.reportTypeOf(data.at(2)) === 'number';
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
        } else if (this.inputOption(name) === 'center') {
            return new Point(thisObj.xPosition(), thisObj.yPosition())
                .distanceTo(ZERO);
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

Process.prototype.reportRayLengthTo = function (name, relativeAngle = 0) {
    // raycasting edge detection - answer the distance between the asking
    // sprite's rotation center to the target sprite's outer edge (the first
    // opaque pixel) in the asking sprite's current direction offset by
    // an optional relative angle in degrees
    var thisObj = this.blockReceiver(),
        thatObj,
        stage,
        rc,
        targetBounds,
        intersections = [],
        dir,
        a, b, x, y,
        top, bottom, left, right,
        circa, hSect, vSect,
        point, hit,
        temp,
        width, imageData;

    circa = (num) => Math.round(num * 10000000) / 10000000; // good enough

    hSect = (yLevel) => {
        var theta = radians(dir);
        b = rc.y - yLevel;
        a = b * Math.tan(theta);
        x = rc.x + a;
        if (
            (circa(x) === circa(rc.x) &&
                ((dir === 180 && rc.y < yLevel) ||
                dir === 0 && rc.y > yLevel)
            ) ||
            (x > rc.x && dir >= 0 && dir < 180) ||
            (circa(x) < circa(rc.x) &&
                dir >= 180 && dir < 360)
        ) {
            if (x >= left && x <= right) {
                intersections.push(new Point(x, yLevel));
            }
        }
    };

    vSect = (xLevel) => {
        var theta = radians(360 - dir - 90);
        b = rc.x - xLevel;
        a = b * Math.tan(theta);
        y = rc.y + a;
        if (
            (circa(y) === circa(rc.y) &&
                ((dir === 90 && rc.x < xLevel) ||
                dir === 270 && rc.x > xLevel)
            ) ||
            (y > rc.y && dir >= 90 && dir < 270) ||
            (y < rc.y && (dir >= 270 || dir < 90))
        ) {
            if (y >= top && y <= bottom) {
                intersections.push(new Point(xLevel, y));
            }
        }
    };

    if (!thisObj) {return -1; }
    rc = thisObj.rotationCenter();
    point = rc;
    stage = thisObj.parentThatIsA(StageMorph);
    thatObj = this.getOtherObject(name, thisObj, stage);
    if (!(thatObj instanceof SpriteMorph)) {return -1; }

    // determine intersections with the target's bounding box
    dir = thisObj.heading + relativeAngle;
    dir = ((+dir % 360) + 360) % 360;
    targetBounds = thatObj.bounds;
    top = targetBounds.top();
    bottom = targetBounds.bottom();
    left = targetBounds.left();
    right = targetBounds.right() - 1;

    // test if already inside the target
    if (targetBounds.containsPoint(rc)) {
        intersections.push(rc);
        hSect(top);
        hSect(bottom);
        vSect(left);
        vSect(right);
        if (intersections.length < 2) {
            return -1;
        }
    } else {
        hSect(top);
        hSect(bottom);
        vSect(left);
        vSect(right);
        if (intersections.length < 2) {
            return -1;
        }
        // sort
        if (dir !== 90) {
            if (Math.sign(rc.x - intersections[0].x) !==
                Math.sign(intersections[0].x - intersections[1].x) ||
                Math.sign(rc.y - intersections[0].y) !==
                Math.sign(intersections[0].y - intersections[1].y)
            ) {
                temp = intersections[0];
                intersections[0] = intersections[1];
                intersections[1] = temp;
            }
        }
    }

    // for debugging:
    /*
    return new List(intersections)
        .map(point => thisObj.snapPoint(point))
        .map(point => new List([point.x, point.y]));
    */

    // convert intersections to local bitmap coordinates of the target
    intersections = intersections.map(point =>
        point.subtract(targetBounds.origin).floorDivideBy(stage.scale)
    );

    // get image data
    width = Math.floor(targetBounds.width() / stage.scale);
    imageData = thatObj.getImageData();

    // scan the ray along the coordinates of a Bresenham line
    // for the first opaque pixel
    function alphaAt(imageData, width, x, y) {
        var idx = y * width + x;
        return imageData[idx] && 0x000000FF; // alpha
    }

    function isOpaque(x, y) {
        return alphaAt(imageData, width, x, y) > 0;
    }

    function scan(testFunc, x0, y0, x1, y1) {
        // Bresenham's algorithm
        var dx = Math.abs(x1 - x0),
            sx = x0 < x1 ? 1 : -1,
            dy = -Math.abs(y1 - y0),
            sy = y0 < y1 ? 1 : -1,
            err = dx + dy,
            e2;

        while (true) {
            if (testFunc(x0, y0)) {
                return new Point(x0 * stage.scale, y0 * stage.scale);
            }
            if (x0 === x1 && y0 === y1) {
                return -1; // not found
            }
            e2 = 2 * err;
            if (e2 > dy) {
                err += dy;
                x0 += sx;
            }
            if (e2 < dx) {
                err += dx;
                y0 += sy;
            }
        }
    }

    hit = scan(
        isOpaque,
        intersections[0].x,
        intersections[0].y,
        intersections[1].x,
        intersections[1].y
    );
    if (hit === -1) {return hit; }
    return rc.distanceTo(hit.add(targetBounds.origin)) / stage.scale;
};

Process.prototype.reportDirectionTo = function (name) {
    var thisObj = this.blockReceiver(),
        thatObj;

    if (thisObj) {
        if (this.inputOption(name) === 'mouse-pointer') {
            return thisObj.angleToXY(this.reportMouseX(), this.reportMouseY());
        }
        if (this.inputOption(name) === 'center') {
            return thisObj.angleToXY(0, 0);
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
    // hyper-dyadic
    // note: specifying strings in the left input only accesses
    // sprite-local variables. Attributes such as "width", "direction" etc.
    // can only be queried via the dropdown menu and are, therefore, not
    // reachable as dyadic inputs
    return this.hyper(
        (att, obj) => this.reportBasicAttributeOf(att, obj),
        attribute,
        name
    );
};

Process.prototype.reportBasicAttributeOf = function (attribute, name) {
    var thisObj = this.blockReceiver(),
        thatObj,
        stage;

    if (name instanceof Context && attribute instanceof Context) {
        if (attribute?.expression.selector === 'reportEnvironment') {
            this.returnValueToParentContext(this.reportEnvironment(
                attribute.expression.inputs()[0].evaluate(),
                name
            ));
            return;
        }
        return this.reportContextFor(attribute, name);
    }
    if (thisObj) {
        this.assertAlive(thisObj);
        stage = thisObj.parentThatIsA(StageMorph);
        if (name instanceof Context) {
            thatObj = name;
        } else if (stage.name === name) {
            thatObj = stage;
        } else {
            thatObj = this.getOtherObject(name, thisObj, stage);
        }
        if (isSnapObject(thatObj)) {
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
            case 'position':
                return thatObj.xPosition ?
                    new List([thatObj.xPosition(), thatObj.yPosition()])
                    : '';
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
            case 'volume':
                return thatObj.getVolume();
            case 'balance':
                return thatObj.getPan();
            case 'extent':
                if (thatObj instanceof StageMorph) {
                    return new List([
                        thatObj.dimensions.x,
                        thatObj.dimensions.y
                    ]);
                }
                this.assertType(thatObj, 'sprite');
                return new List([
                    thatObj.width() / stage.scale,
                    thatObj.height() / stage.scale,
                ]);
            case 'width':
                if (thatObj instanceof StageMorph) {
                    return thatObj.dimensions.x;
                }
                this.assertType(thatObj, 'sprite');
                return thatObj.width() / stage.scale;
            case 'height':
                if (thatObj instanceof StageMorph) {
                    return thatObj.dimensions.y;
                }
                this.assertType(thatObj, 'sprite');
                return thatObj.height() / stage.scale;
            case 'left':
                return thatObj.xLeft();
            case 'right':
                return thatObj.xRight();
            case 'top':
                return thatObj.yTop();
            case 'bottom':
                return thatObj.yBottom();
            }
        }
        if (isString(attribute)) {
            return thatObj.outerContext.variables.getVar(attribute);
        }
        if (this.inputOption(attribute) === 'variables') {
            return new List((thatObj instanceof Context ?
                thatObj.outerContext
                : thatObj).variables.allNames()
            );
        }
        if (this.inputOption(attribute) === 'input names') {
            return new List(thatObj instanceof Context ?
                thatObj.inputs.slice()
                : []
            );
        }
    }
    return '';
};

Process.prototype.reportGet = function (query) {
    // answer a reference to a first-class member
    // or a list of first-class members
    var thisObj = this.blockReceiver(),
        stage,
        objName;

    function allOtherSprites() {
        var stage = thisObj.parentThatIsA(StageMorph),
            sprites = stage.children.filter(each =>
                each instanceof SpriteMorph && each !== thisObj
            ),
            inHand = stage.world().hand.children[0];
        if (inHand instanceof SpriteMorph) {
            sprites.push(inHand);
        }
        return sprites;
    }

    if (thisObj) {
        switch (this.inputOption(query)) {
        case 'self' :
            return thisObj;
        case 'other sprites':
            return new List(allOtherSprites());
        case 'parts': // shallow copy to disable side-effects
            return new List((thisObj.parts || []).map(each => each));
        case 'anchor':
            return thisObj.anchor || '';
        case 'parent':
            return thisObj.exemplar || '';
        case 'children':
            return new List(thisObj.specimens ? thisObj.specimens() : []);
        case 'temporary?':
            return thisObj.isTemporary || false;
        case 'clones':
            objName = thisObj.name || thisObj.cloneOriginName;
            return new List(
                allOtherSprites().filter(each =>
                    each.isTemporary && (each.cloneOriginName === objName)
                )
            );
        case 'other clones':
            return thisObj.isTemporary ?
                    this.reportGet(['clones']) : new List();
        case 'neighbors':
            // old rectangular, bounding-box-based algorithm
            // deprecated in favor of a circular perimeter based newer one
            /*
            neighborhood = thisObj.bounds.expandBy(new Point(
                thisObj.width(),
                thisObj.height()
            ));
            return new List(
                allOtherSprites.filter(each =>
                    each.isVisible && each.bounds.intersects(neighborhood)
                )
            );
            */
            return thisObj.neighbors();
        case 'dangling?':
            return !thisObj.rotatesWithAnchor;
        case 'draggable?':
            return thisObj.isDraggable;
        case 'rotation style':
            return thisObj.rotationStyle || 0;
        case 'rotation x':
            return thisObj.xPosition();
        case 'rotation y':
            return thisObj.yPosition();
        case 'center x':
            return thisObj.xCenter();
        case 'center y':
            return thisObj.yCenter();
        case 'left':
            return thisObj.xLeft();
        case 'right':
            return thisObj.xRight();
        case 'top':
            return thisObj.yTop();
        case 'bottom':
            return thisObj.yBottom();
        case 'name':
            return thisObj.name;
        case 'stage':
            return thisObj.parentThatIsA(StageMorph);
        case 'scripts':
            return new List(
                thisObj.scripts.sortedElements().filter(
                    each => each instanceof BlockMorph
                ).map(
                    each => each.fullCopy().reify()
                )
            );
        case 'solutions':
            if (thisObj.solution) {
                return new List(
                    thisObj.solution.scripts.sortedElements().filter(
                        each => each instanceof BlockMorph
                    ).map(
                        each => new List([
                            each?.comment?.text() || '',
                            each.fullCopy().reify()
                        ])
                    )
                );
            }
            return new List();
        case 'blocks': // palette unoordered without inherited methods
            return new List(
                thisObj.parentThatIsA(StageMorph).globalBlocks.concat(
                    thisObj.allBlocks(true)
                ).filter(
                    def => !def.isHelper
                ).map(
                    def => def.blockInstance().reify()
                ).concat(
                    SpriteMorph.prototype.categories.reduce(
                        (blocks, category) => blocks.concat(
                            thisObj.getPrimitiveTemplates(
                                category
                            ).filter(
                                each => each instanceof BlockMorph &&
                                    !(each instanceof HatBlockMorph)
                            ).map(block => {
                                let instance = block.fullCopy();
                                instance.isTemplate = false;
                                return instance.reify();
                            })
                        ),
                        []
                    )
                )
            );
        case 'categories':
            /* // localized version, commented out for now:
            return new List(SpriteMorph.prototype.categories.map(cat =>
                localize(cat.charAt(0).toUpperCase() + cat.slice(1))).concat(
                    Array.from(
                        SpriteMorph.prototype.customCategories.keys()
                    ).sort()
                )
            );
            */
            return new List(SpriteMorph.prototype.allCategories());
        case 'costume':
            return thisObj.costume;
        case 'costumes':
            return thisObj.reportCostumes();
        case 'sounds':
            return thisObj.sounds;
        case 'width':
            if (thisObj instanceof StageMorph) {
                return thisObj.dimensions.x;
            }
            stage = thisObj.parentThatIsA(StageMorph);
            return stage ? thisObj.width() / stage.scale : 0;
        case 'height':
            if (thisObj instanceof StageMorph) {
                return thisObj.dimensions.y;
            }
            stage = thisObj.parentThatIsA(StageMorph);
            return stage ? thisObj.height() / stage.scale : 0;
        }
    }
    if ([
            'other sprites',
            'parts',
            'children',
            'clones',
            'other clones',
            'neighbors',
            'scripts',
            'solutions',
            'blocks',
            'categories',
            'costumes',
            'sounds'
        ].includes(this.inputOption(query))
    ) {
        return new List();
    }
    return '';
};

Process.prototype.reportObject = function (name) {
    // hyper-monadic
    if (this.enableHyperOps) {
        if (name instanceof List) {
            return name.map(each => this.reportObject(each));
        }
    }

    var thisObj = this.blockReceiver(),
        thatObj,
        stage;

    if (thisObj) {
        this.assertAlive(thisObj);
        stage = thisObj.parentThatIsA(StageMorph);
        if (snapEquals(stage.name, name)) {
            thatObj = stage;
        } else {
            thatObj = this.getOtherObject(name, thisObj, stage);
        }
        if (thatObj) {
            this.assertAlive(thatObj);
        }
        return thatObj;
    }
};

Process.prototype.doSet = function (attribute, value) {
    // manipulate sprites' attributes
    var name, rcvr, ide;
    rcvr = this.blockReceiver();
    this.assertAlive(rcvr);
    if (!(attribute instanceof Context || attribute instanceof Array) ||
        (attribute instanceof Context &&
            attribute.expression.selector !== 'reportGet')) {
        throw new Error(localize('unsupported attribute'));
    }
    name = attribute instanceof Context ?
            attribute.expression.inputs()[0].evaluate()
                : attribute;
    if (name instanceof Array) {
        name = name[0];
    }
    switch (name) {
    case 'anchor':
    case 'my anchor':
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
    case 'my parent':
        this.assertType(rcvr, 'sprite');
        value = value instanceof SpriteMorph ? value : null;
        rcvr.setExemplar(value, true); // throw an error in case of circularity
        break;
    case 'temporary?':
    case 'my temporary?':
        this.assertType(rcvr, 'sprite');
        this.assertType(value, 'Boolean');
        if (value) {
            rcvr.release();
        } else {
            rcvr.perpetuate();
        }
        break;
    case 'name':
    case 'my name':
        this.assertType(rcvr, ['sprite', 'stage']);
        this.assertType(value, ['text', 'number']);
        ide = rcvr.parentThatIsA(IDE_Morph);
        if (ide) {
            rcvr.setName(
                ide.newSpriteName(value.toString(), rcvr)
            );
            ide.spriteBar.nameField.setContents(
                ide.currentSprite.name.toString()
            );
        }
        break;
    case 'dangling?':
    case 'my dangling?':
        this.assertType(rcvr, 'sprite');
        this.assertType(value, 'Boolean');
        rcvr.rotatesWithAnchor = !value;
        rcvr.version = Date.now();
        break;
    case 'draggable?':
    case 'my draggable?':
        this.assertType(rcvr, 'sprite');
        this.assertType(value, 'Boolean');
        rcvr.isDraggable = value;
        // update padlock symbol in the IDE:
        ide = rcvr.parentThatIsA(IDE_Morph);
        if (ide) {
            ide.spriteBar.children.forEach(each => {
                if (each.refresh) {
                    each.refresh();
                }
            });
        }
        rcvr.version = Date.now();
        break;
    case 'rotation style':
    case 'my rotation style':
        this.assertType(rcvr, 'sprite');
        this.assertType(+value, 'number');
        if (!contains([0, 1, 2], +value)) {
            return; // maybe throw an error msg
        }
        rcvr.changed();
        rcvr.rotationStyle = +value;
        rcvr.fixLayout();
        rcvr.rerender();
        // update padlock symbol in the IDE:
        ide = rcvr.parentThatIsA(IDE_Morph);
        if (ide) {
            ide.spriteBar.children.forEach(each => {
                if (each.refresh) {
                    each.refresh();
                }
            });
        }
        rcvr.version = Date.now();
        break;
    case 'rotation x':
    case 'my rotation x':
        this.assertType(rcvr, 'sprite');
        this.assertType(+value, 'number');
        rcvr.setRotationX(+value);
        break;
    case 'rotation y':
    case 'my rotation y':
        this.assertType(rcvr, 'sprite');
        this.assertType(+value, 'number');
        rcvr.setRotationY(+value);
        break;
    case 'microphone modifier':
        this.setMicrophoneModifier(value);
        break;
    case 'scripts':
    case 'my scripts':
        // careful, this is powerful but also super dangerous, because it
        // simply replaces all scripts, deleting the old ones for good!!
        this.assertType(value, 'list');
        value.map(each => this.assertType(
            each,
            ['command', 'reporter', 'predicate', 'hat']
        ));
        rcvr.scripts.allChildren().forEach(morph => {
            if (morph instanceof BlockMorph || morph instanceof CommentMorph) {
                morph.destroy();
            }
        });
        value.map(ring => rcvr.scripts.add(ring.expression.fullCopy()));
        rcvr.scripts.forAllChildren(m => {if (m instanceof BlockMorph) {
            m.fixBlockColor();
        }});
        rcvr.scripts.cleanUp();
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
    var result = copy(context),
        receiverVars,
        rootVars;

    if (otherObj instanceof List) { // OOP 2.0
        result.outerContext = new Context();
        result.outerContext.variables.parentFrame = otherObj;
        return result;
    }

    if (otherObj instanceof Context) {
        result.outerContext = otherObj.outerContext;
        result.variables.parentFrame = otherObj.outerContext.variables;
        result.receiver = otherObj.receiver;
        return result;
    }

    result.receiver = otherObj;
    if (!result.outerContext) {
        result.outerContext = new Context();
        result.variables.parentFrame = result.outerContext.variables;
    }
    result.outerContext = copy(result.outerContext);
    result.outerContext.variables = copy(result.outerContext.variables);
    result.outerContext.receiver = otherObj;
    if (result.outerContext.variables.parentFrame) {
        rootVars = result.outerContext.variables.parentFrame;
        receiverVars = otherObj.variables.fullCopy();
        receiverVars.root().parentFrame = rootVars;
        result.outerContext.variables.parentFrame = receiverVars;
        result.variables = receiverVars;
    } else {
        result.outerContext.variables.parentFrame = otherObj.variables;
    }
    return result;
};

Process.prototype.reportMousePosition = function () {
    var world, pos;
    if (this.homeContext.receiver) {
        world = this.homeContext.receiver.world();
        if (world) {
            pos = this.homeContext.receiver.snapPoint(world.hand.position());
            return new List([pos.x, pos.y]);
        }
    }
    return '';
};

Process.prototype.reportMouseX = function () {
    var world;
    if (this.homeContext.receiver) {
        world = this.homeContext.receiver.world();
        if (world) {
            return this.homeContext.receiver.snapPoint(world.hand.position()).x;
        }
    }
    return 0;
};

Process.prototype.reportMouseY = function () {
    var world;
    if (this.homeContext.receiver) {
        world = this.homeContext.receiver.world();
        if (world) {
            return this.homeContext.receiver.snapPoint(world.hand.position()).y;
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
    // hyper-monadic
    var stage;
    if (this.homeContext.receiver) {
        stage = this.homeContext.receiver.parentThatIsA(StageMorph);
        if (stage) {
            if (this.inputOption(keyString) === 'any key') {
                return Object.keys(stage.keysPressed).length > 0;
            }
            if (keyString instanceof List && this.enableHyperOps) {
                return keyString.map(
                    each => stage.keysPressed[each] !== undefined
                );
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

// Process video motion detection primitives

Process.prototype.doSetVideoTransparency = function(factor) {
    var stage;
    if (this.homeContext.receiver) {
        stage = this.homeContext.receiver.parentThatIsA(StageMorph);
        if (stage) {
            stage.projectionTransparency = Math.max(0, Math.min(100, factor));
        }
    }
};

Process.prototype.reportVideo = function(attribute, name) {
    // hyper-monadic
    var thisObj = this.blockReceiver(),
        stage = thisObj.parentThatIsA(StageMorph),
        thatObj;

    if (!stage.projectionSource || !stage.projectionSource.stream) {
        // wait until video is turned on
        if (!this.context.accumulator) {
            this.context.accumulator = true; // started video
            stage.startVideo();
        }
        this.pushContext('doYield');
        this.pushContext();
        return;
    }

    if (this.enableHyperOps) {
        if (name instanceof List) {
            return name.map(each => this.reportVideo(attribute, each));
        }
    }
    thatObj = this.getOtherObject(name, thisObj, stage);
    switch (this.inputOption(attribute)) {
    case 'motion':
        if (thatObj instanceof SpriteMorph) {
            stage.videoMotion.getLocalMotion(thatObj);
            return thatObj.motionAmount;
        }
        stage.videoMotion.getStageMotion();
        return stage.videoMotion.motionAmount;
    case 'direction':
        if (thatObj instanceof SpriteMorph) {
            stage.videoMotion.getLocalMotion(thatObj);
            return thatObj.motionDirection;
        }
        stage.videoMotion.getStageMotion();
        return stage.videoMotion.motionDirection;
    case 'snap':
        if (thatObj instanceof SpriteMorph) {
            return thatObj.projectionSnap(thisObj);
        }
        return stage.projectionSnap(thisObj);
    }
    return -1;
};

Process.prototype.startVideo = function(stage) {
    // interpolated
    if (this.reportGlobalFlag('video capture')) {return; }
    if (!stage.projectionSource || !stage.projectionSource.stream) {
        // wait until video is turned on
        if (!this.context.accumulator) {
            this.context.accumulator = true; // started video
            stage.startVideo();
        }
    }
    this.pushContext('doYield');
    this.pushContext();
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
        ' \'' + anOption + '\'\n' + localize('is not a valid option')
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
            localize('unsupported data type') + ': "' + tp + '"'
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
    return this.hyper(
        ctx => {
            var scripts;
            if (ctx instanceof Context) {
                if (ctx.expression instanceof SyntaxElementMorph) {
                    return ctx.expression.mappedCode();
                }
            } else if (isSnapObject(ctx)) {
                scripts = ctx.scripts.sortedElements().filter(
                    each => each instanceof BlockMorph
                ).map(
                    each => each.mappedCode()
                );
                return (scripts.length ? scripts : ['']).reduce((a, b) =>
                    a + '\n\n' + b);
            }
            return '';
        },
        aContext
    );
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
    var rcvr = this.blockReceiver();
    if (!this.context.startTime) {
        rcvr.setVolume(rcvr.getVolume()); // b/c Chrome needs lazy init
        rcvr.setPan(rcvr.getPan()); // b/c Chrome needs lazy initialization
        this.context.startTime = Date.now();
        this.context.activeNote = new Note(pitch);
        this.context.activeNote.play(
            this.instrument,
            rcvr.getGainNode(),
            rcvr.getPannerNode()
        );
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

Process.prototype.doPlayFrequency = function (hz, secs) {
    this.doPlayFrequencyForSecs(
        parseFloat(hz || '0'),
        parseFloat(secs || '0')
    );
};

Process.prototype.doPlayFrequencyForSecs = function (hz, secs) {
    // interpolated
    if (!this.context.startTime) {
        this.context.startTime = Date.now();
        this.context.activeNote = new Note();
        this.context.activeNote.frequency = hz;
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
    if (this.receiver.freqPlayer) {
        this.receiver.freqPlayer.setInstrument(+num);
    }
};

// Process image processing primitives

Process.prototype.reportGetImageAttribute = function (choice, name) {
    if (this.enableHyperOps) {
        if (name instanceof List) {
            return name.map(each => this.reportGetImageAttribute(choice, each));
        }
    }

    var cst = this.costumeNamed(name) || new Costume(),
        option = this.inputOption(choice);

    switch (option) {
    case 'name':
        return cst.name;
    case 'width':
        return cst.width();
    case 'height':
        return cst.height();
    case 'pixels':
        return cst.rasterized().pixels();
    case 'colors':
        return this.castColor(cst);
    default:
        return cst;
    }
};

Process.prototype.reportNewCostumeStretched = function (name, xP, yP) {
    var cst, shp, height, width, dim, xStretch, yStretch, result;
    if (name instanceof List) {
        shp = name.quickShape();
        if (shp.at(2) > 4 ||
            (shp.length() === 2 && name.firstAtom() instanceof Color)
        ) {
            height = shp.at(1);
            width = shp.at(2);
            dim = new List([height * width]);
            if (shp.length() === 3) {
                dim.add(shp.at(3));
            }
            cst = this.reportNewCostume(name.reshape(dim), width, height);
        } else {
            return this.reportNewCostume(name, xP, yP);
        }
    } else {
        cst = this.costumeNamed(name);
    }
    if (!cst) {
        throw new Error(
            'expecting a costume\nbut getting none'
        );
        // return new Costume();
    }
    if (!isFinite(+xP * +yP) || isNaN(+xP * +yP)) {
        throw new Error(
            'expecting a finite number\nbut getting Infinity or NaN'
        );
    }
    xStretch = Math.round(cst.width() * +xP / 100);
    yStretch = Math.round(cst.height() * +yP / 100);
    result = cst.stretched(xStretch, yStretch);
    if (shp instanceof List && shp.at(2) > 0) {
        if (shp.length() === 2 && name.firstAtom() instanceof Color) {
            return this.reportColor(
                result.pixels().reshape(new List([yStretch, xStretch, 4]))
            );
        }
        if (shp.at(3) < 1) {
            return result.pixels().columns().at(1).reshape(
                new List([yStretch, xStretch])
            );
        }
        return result.pixels().reshape(new List([yStretch, xStretch, 0]));
    }
    return result;
};

Process.prototype.reportNewCostumeSkewed = function (name, angle, factor) {
    var cst = this.costumeNamed(name);
    if (!cst) {
        return new Costume();
    }
    if (!isFinite(+angle * +factor) || isNaN(+angle * +factor)) {
        throw new Error(
            'expecting a finite number\nbut getting Infinity or NaN'
        );
    }
    return cst.skewed(+angle, +factor);
};

Process.prototype.costumeNamed = function (name) {
    // private
    if (name instanceof Costume) {
        return name;
    }
    if (typeof name === 'number') {
        return this.blockReceiver().costumes.at(name);
    }
    if (this.inputOption(name) === 'current') {
        return this.blockReceiver().costume;
    }
    return detect(
        this.blockReceiver().costumes.asArray(),
        c => snapEquals(c.name, name.toString())
    );
};

Process.prototype.reportNewCostume = function (pixels, width, height, name) {
    var rcvr, stage, canvas, ctx, shp, dim, src, dta, i, k, px;

    this.assertType(pixels, 'list');
    if (this.inputOption(width) === 'current') {
        rcvr = this.blockReceiver();
        stage = rcvr.parentThatIsA(StageMorph);
        width = rcvr.costume ? rcvr.costume.width() : stage.dimensions.x;
    }
    if (this.inputOption(height) === 'current') {
        rcvr = rcvr || this.blockReceiver();
        stage = stage || rcvr.parentThatIsA(StageMorph);
        height = rcvr.costume ? rcvr.costume.height() : stage.dimensions.y;
    }
    width = Math.abs(Math.floor(+width));
    height = Math.abs(Math.floor(+height));
    if (!isFinite(width * height) || isNaN(width * height)) {
       throw new Error(
           'expecting a finite number\nbut getting Infinity or NaN'
       );
    }
    if (width <= 0 || height <= 0) {
        // try to interpret the pixels as matrix
        shp = pixels.quickShape();
        if (shp.length() > 2 && pixels.firstAtom() instanceof Color) {
            return pixels.map(each =>
                this.reportNewCostume(each, width, height, name));
        }
        if (shp.at(2) > 4 ||
            (shp.length() === 2 && pixels.firstAtom() instanceof Color)
        ) {
            height = shp.at(1);
            width = shp.at(2);
            dim = new List([height * width]);
            if (shp.length() === 3) {
                dim.add(shp.at(3));
            }
            pixels = pixels.reshape(dim);
        } else {
            throw new Error(
                'cannot handle zero width or height'
            );
        }
    }

    canvas = newCanvas(new Point(width, height), true);
    ctx = canvas.getContext('2d');
    src = pixels.itemsArray();
    dta = ctx.createImageData(width, height);
    for (i = 0; i < src.length; i += 1) {
        if (src[i] instanceof List) {
            px = src[i].itemsArray();
        } else if (src[i] instanceof Color) {
            px = [src[i].r, src[i].g, src[i].b, Math.round(src[i].a * 255)];
        } else {
            px = [src[i]];
        }
        for (k = 0; k < 3; k += 1) {
            dta.data[(i * 4) + k] = px[k] === undefined ? +px[0] : +px[k];
        }
        dta.data[i * 4 + 3] = (px[3] === undefined ? 255 : +px[3]);
    }
    ctx.putImageData(dta, 0, 0);
    return new Costume(
        canvas,
        name || (rcvr || this.blockReceiver()).newCostumeName(
            localize('costume')
        )
    );
};

Process.prototype.reportPentrailsAsSVG = function () {
    // interpolated
    var rcvr, stage, svg, acc, offset;

    if (!this.context.accumulator) {
        stage = this.homeContext.receiver.parentThatIsA(StageMorph);
        if (!stage.trailsLog.length) {
            throw new Error (localize(
                'there are currently no\nvectorizable pen trail segments'
            ));
        }
        svg = stage.trailsLogAsSVG();
        this.context.accumulator = {
            img : new Image(),
            rot : svg.rot,
            ready : false
        };
        acc = this.context.accumulator;
        acc.img.onload = () => acc.ready = true;
        acc.img.src = 'data:image/svg+xml,' + svg.src;
        acc.img.rot = svg.rotationShift;
    } else if (this.context.accumulator.ready) {
        offset = ZERO;
        rcvr = this.blockReceiver();
        if (rcvr instanceof SpriteMorph) {
            offset = new Point(rcvr.xPosition(), -rcvr.yPosition());
        }
        this.returnValueToParentContext(
            new SVG_Costume(
                this.context.accumulator.img,
                this.blockReceiver().newCostumeName(localize('Costume')),
                this.context.accumulator.rot.translateBy(offset)
            )
        );
        return;
    }
    this.pushContext();
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

        // if the script has been clicked on by the user in visible stepping
        // mode show the result of evaluating a reporter in a
        // speech balloon. Thanks, Vic!
        if (this.enableSingleStepping &&
            this.isClicked &&
            this.context.expression instanceof ReporterBlockMorph
        ) {
            let anchor = this.context.expression;
            if (!anchor.world()) {
                // find a place to display the result of custon reporters
                anchor = this.topBlock;
            }
            if (value instanceof List) {
                anchor.showBubble(
                    value.isTable() ?
                        new TableFrameMorph(new TableMorph(value))
                        : new ListWatcherMorph(value),
                    this.exportResult,
                    this.receiver
                );
            } else {
                anchor.showBubble(
                    value,
                    this.exportResult,
                    this.receiver
                );
            }
        }
    }
};

Process.prototype.reportStackSize = function () {
    return this.context ? this.context.stackSize() : 0;
};

Process.prototype.reportFrameCount = function () {
    return this.frameCount;
};

Process.prototype.reportYieldCount = function () {
    return this.yieldCount;
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

// Process - Block attributes, DEFINE and introspection prims

Process.prototype.reportBlockAttribute = function (attribute, block) {
    // hyper-dyadic
    // note: attributes in the left slot
    // can only be queried via the dropdown menu and are, therefore, not
    // reachable as dyadic inputs
    return this.hyper(
        (att, obj) => this.reportBasicBlockAttribute(att, obj),
        attribute,
        block
    );
};

Process.prototype.reportBasicBlockAttribute = function (attribute, block) {
    var choice = this.inputOption(attribute),
        expr, body, slots, data, def, info, loc, cmt, prim;
    this.assertType(block, ['command', 'reporter', 'predicate', 'hat']);
    expr = block.expression;
    switch (choice) {
    case 'label':
        return expr ? expr.abstractBlockSpec() : '';
    case 'comment':
        if (block.comment) {
            return block.comment;
        }
        cmt = expr?.comment?.text();
        if (cmt) {
            return cmt;
        }
        if (expr.isCustomBlock) {
            def = (expr.isGlobal ?
                expr.definition
                : this.blockReceiver().getMethod(expr.semanticSpec));
            return def.comment?.text() || expr?.comment?.text() || '';
        }
        return '';
    case 'definition':
        if (expr.isCustomBlock) {
            if (expr.isGlobal) {
                def = expr.definition;
                if (def.primitive && !def.body) {
                    prim = SpriteMorph.prototype.blockForSelector(
                        'doPrimitive'
                    );
                    prim.inputs()[0].setContents(true);
                    prim.inputs()[1].setContents(def.primitive);
                    body = prim.reify();
                }
            } else {
                def = this.blockReceiver().getMethod(expr.semanticSpec);
            }
            if (!body) {
                body = def.body;
                if (!body) {
                    body = new Context();
                    def.inputNames().forEach(name => body.addInput(name));
                }
            }
        } else {
            prim = SpriteMorph.prototype.blocks[expr.selector].src;
            if (prim) {
                this.context.accumulator = this.reportGet('blocks');
                body = this.assemble(this.parseCode(prim));
            } else {
                prim = SpriteMorph.prototype.blockForSelector('doPrimitive');
                prim.inputs()[0].setContents(true);
                prim.inputs()[1].setContents(expr.selector);
                body = prim.reify();
            }
            if (body instanceof Context &&
                (!body.expression || prim) &&
                !body.inputs.length
            ) {
                // make sure the definition has the same number of inputs as the
                // block prototype (i.e. the header)
                expr.inputs().forEach((inp, i) => body.addInput('#' + (i + 1)));
            }
        }
        if (body.expression && body.expression.selector === 'doReport' &&
                body.expression.inputs()[0] instanceof BlockMorph) {
            return body.expression.inputs()[0].reify(body.inputs);
        }
        return body;
    case 'primitive':
        if (expr.isCustomBlock) {
            if (expr.isGlobal) {
                prim = expr.definition.body?.expression;
                if (prim && prim.selector === 'doPrimitive') {
                    return prim.inputs()[0].value || false;
                }
            }
            return false;
        }
        return true;
    case 'category':
        return expr ?
            SpriteMorph.prototype.allCategories().indexOf(expr.category) + 1
                : 0;
    case 'custom?':
        return expr ? !!expr.isCustomBlock : false;
    case 'global?':
        return (expr && expr.isCustomBlock) ? !!expr.isGlobal : true;
    case 'expression':
        return expr instanceof BlockMorph ? expr.fullCopy() : '';
    case 'type':
        return ['command', 'reporter', 'predicate', 'hat'].indexOf(
            this.reportTypeOf(block)
        ) + 1;
    case 'scope':
        return expr.isCustomBlock ? (expr.isGlobal ? 1 : 2) : 0;
    case 'selector':
        return expr.isCustomBlock ?
            (expr.isGlobal ? expr.definition.selector || '' : '')
            : expr.selector;
    case 'slots':
        if (expr.isCustomBlock) {
            slots = [];
            (expr.isGlobal ?
                expr.definition
                : this.blockReceiver().getMethod(expr.semanticSpec)
            ).declarations.forEach(value => slots.push(value[0]));
            return new List(slots).map(spec => this.slotType(spec));
        }
        return new List(
            expr.inputs().map(each =>
                each instanceof ReporterBlockMorph ?
                    each.getSlotSpec()
                    : (each instanceof MultiArgMorph &&
                            each.slotSpec instanceof Array ?
                        each.slotSpec
                        : each.getSpec())
            )
        ).map(spec => this.slotType(spec));
    case 'defaults':
        slots = new List();
        if (expr.isCustomBlock) {
            def = (expr.isGlobal ?
                expr.definition
                : this.blockReceiver().getMethod(expr.semanticSpec));
            // def.declarations.forEach(value => slots.add(value[1]));
            def.declarations.forEach(value => {
                if((value[0] || '').toString().startsWith('%mult') ||
                    (value[0] || '').toString().startsWith('%group')
                ) {
                    data = (value[1] || '').split('\n').map(each =>
                        each.trim()).filter(each =>
                            each.length).map(txt => this.perhapsColor(txt));
                    slots.add(data.length > 1 ? new List(data) : data[0]);
                } else {
                    slots.add(this.perhapsColor(value[1]));
                }
            });
        } else {
            info = SpriteMorph.prototype.blocks[expr.selector];
            if (!info) {return slots; }
            slots = (info.defaults || []).map(v => this.inputOption(v));
            // adjust structure if the last input is variadic
            // and the default values overshoot the number of input slots
            if (expr.inputs().slice(-1)[0] instanceof MultiArgMorph &&
                slots.length > expr.inputs().length
            ) {
                data = slots.slice(expr.inputs().length - 1);
                slots = slots.slice(0, expr.inputs().length - 1);
                slots.push(new List(data));
            }
            slots = new List(slots);
        }
        return slots;
    case 'menus':
        slots = new List();
        if (expr.isCustomBlock) {
            def = (expr.isGlobal ?
                expr.definition
                : this.blockReceiver().getMethod(expr.semanticSpec));
            def.declarations.forEach((value, key) => {
                var dta = isString(value[2]) ?
                    def.decodeChoices(def.parseChoices(value[2]))
                        : '',
                    script;
                if (dta instanceof List && dta.at(1) === '§_dynamicMenu') {
                    script = detect(def.scripts, each =>
                        each.selector === 'receiveSlotEvent' &&
                            each.inputs()[0].evaluate() === key &&
                            each.inputs()[1].evaluateOption() === 'menu');
                    slots.add(script ? script.fullCopy().reify() : dta);
                } else {
                    slots.add(dta);
                }
            });
        } else {
            expr.inputs().forEach(slot => {
                if (slot instanceof ReporterBlockMorph) {
                    slot = SyntaxElementMorph.prototype.labelPart(
                        slot.getSlotSpec()
                    );
                }
                slots.add(slot instanceof InputSlotMorph ?
                    (isString(slot.choices) ? '§_' + slot.choices
                        : CustomBlockDefinition.prototype.decodeChoices(
                            slot.choices
                        ))
                    : ''
                );
            });
        }
        return slots;
    case 'editables':
        slots = new List();
        if (expr.isCustomBlock) {
            def = (expr.isGlobal ?
                expr.definition
                : this.blockReceiver().getMethod(expr.semanticSpec));
            def.declarations.forEach(value => slots.add(!value[3]));
        } else {
            expr.inputs().forEach(slot => {
                if (slot instanceof ReporterBlockMorph) {
                    slot = SyntaxElementMorph.prototype.labelPart(
                        slot.getSlotSpec()
                    );
                }
                slots.add(slot instanceof InputSlotMorph ?
                    !slot.isReadOnly : false
                );
            });
        }
        return slots;
    case 'replaceables':
        slots = new List();
        if (expr.isCustomBlock) {
            def = (expr.isGlobal ?
                expr.definition
                : this.blockReceiver().getMethod(expr.semanticSpec));
            def.declarations.forEach(value => slots.add(!value[4]));
        } else {
            expr.inputs().forEach(slot => {
                if (slot instanceof ReporterBlockMorph) {
                    slot = SyntaxElementMorph.prototype.labelPart(
                        slot.getSlotSpec()
                    );
                }
                slots.add(!slot.isStatic);
            });
        }
        return slots;
    case 'separators':
        slots = new List();
        if (expr.isCustomBlock) {
            def = (expr.isGlobal ?
                expr.definition
                : this.blockReceiver().getMethod(expr.semanticSpec));
            def.declarations.forEach(value => slots.add(value[5] || ''));
        } else {
            expr.inputs().forEach(slot => {
                if (slot instanceof ReporterBlockMorph) {
                    slot = SyntaxElementMorph.prototype.labelPart(
                        slot.getSlotSpec()
                    );
                }
                slots.add(slot instanceof MultiArgMorph ?
                    slot.infix : ''
                );
            });
        }
        return slots;
    case 'collapses':
        slots = new List();
        if (expr.isCustomBlock) {
            def = (expr.isGlobal ?
                expr.definition
                : this.blockReceiver().getMethod(expr.semanticSpec));
            def.declarations.forEach(value => slots.add(value[6] || ''));
        } else {
            expr.inputs().forEach(slot => {
                if (slot instanceof ReporterBlockMorph) {
                    slot = SyntaxElementMorph.prototype.labelPart(
                        slot.getSlotSpec()
                    );
                }
                slots.add(slot instanceof MultiArgMorph ?
                    slot.collapse : ''
                );
            });
        }
        return slots;
    case 'expands':
        slots = new List();
        if (expr.isCustomBlock) {
            def = (expr.isGlobal ?
                expr.definition
                : this.blockReceiver().getMethod(expr.semanticSpec));
            def.declarations.forEach(value => {
                data = (value[7] || '').split('\n').map(each =>
                    each.trim()).filter(each =>
                        each.length);
                slots.add(data.length > 1 ? new List(data) : data[0] || '');
            });
        } else {
            expr.inputs().forEach(slot => {
                if (slot instanceof ReporterBlockMorph) {
                    slot = SyntaxElementMorph.prototype.labelPart(
                        slot.getSlotSpec()
                    );
                }
                if (slot instanceof MultiArgMorph) {
                    data = slot.labelText instanceof Array ?
                        new List(slot.labelText.map(item =>
                            item.replaceAll('\n', ' ')))
                        : (slot.labelText || '').replaceAll('\n', ' ');
                    slots.add(data);
                } else {
                    slots.add('');
                }
            });
        }
        return slots;
    case 'initial slots':
        slots = new List();
        if (expr.isCustomBlock) {
            def = (expr.isGlobal ?
                expr.definition
                : this.blockReceiver().getMethod(expr.semanticSpec));
            def.declarations.forEach(value => slots.add(+value[8] || 0));
        } else {
            expr.inputs().forEach(slot => {
                if (slot instanceof ReporterBlockMorph) {
                    slot = SyntaxElementMorph.prototype.labelPart(
                        slot.getSlotSpec()
                    );
                }
                slots.add(slot instanceof MultiArgMorph ?
                    slot.initialSlots : ''
                );
            });
        }
        return slots;
    case 'min slots':
        slots = new List();
        if (expr.isCustomBlock) {
            def = (expr.isGlobal ?
                expr.definition
                : this.blockReceiver().getMethod(expr.semanticSpec));
            def.declarations.forEach(value => slots.add(+value[9] || 0));
        } else {
            expr.inputs().forEach(slot => {
                if (slot instanceof ReporterBlockMorph) {
                    slot = SyntaxElementMorph.prototype.labelPart(
                        slot.getSlotSpec()
                    );
                }
                slots.add(slot instanceof MultiArgMorph ?
                    +slot.minInputs : ''
                );
            });
        }
        return slots;
    case 'max slots':
        slots = new List();
        if (expr.isCustomBlock) {
            def = (expr.isGlobal ?
                expr.definition
                : this.blockReceiver().getMethod(expr.semanticSpec));
            def.declarations.forEach(value => slots.add(+value[10] || 0));
        } else {
            expr.inputs().forEach(slot => {
                if (slot instanceof ReporterBlockMorph) {
                    slot = SyntaxElementMorph.prototype.labelPart(
                        slot.getSlotSpec()
                    );
                }
                slots.add(slot instanceof MultiArgMorph ?
                    +slot.maxInputs || 0 : ''
                );
            });
        }
        return slots;
    case 'translations':
        if (expr.isCustomBlock) {
            def = (expr.isGlobal ?
                expr.definition
                : this.blockReceiver().getMethod(expr.semanticSpec));
            loc = new List();
            Object.keys(def.translations).forEach(lang =>
                loc.add(new List([lang, def.translations[lang]]))
            );
            return loc;
        }
        return new List();
    }
    return '';
};

Process.prototype.perhapsColor = function (value) {
    // private - cast strings starting with 'rgba(' to colors
    return isString(value) && value.startsWith('rgba(') ?
        Color.fromString(value)
        : value;
};

Process.prototype.slotType = function (spec) {
    // answer a number indicating the shape of a slot represented by its spec.
    // Note: you can also use it to translate mnemonics into slot type numbers
    if (spec instanceof Array) {
        // first check for a bunch of special cases
        if (spec[0] === '%rcv') {
            return 16;
        } else if (spec[0] === '%msgSend') {
            return 17;
        } else if (spec[0] === '%b') {
            return 18;
        }
        return new List(spec.map(each => this.slotType(each)));
    }

    var shift = 0,
        key = spec.toLowerCase(),
        num;

    if (spec.startsWith('%')) {
        key = spec.slice(1).toLowerCase();
        if (key.startsWith('mult')) {
            shift = 100;
            key = key.slice(5);
            if (key === 't') {
                shift = 0;
                key = 'variables';
            }
        } else if (key.startsWith('group')) {
            return new List(
                key.split('%').slice(1).map(each => this.slotType(each))
            );
        }
    } else if (spec.endsWith('...')) {
        shift = 100;
        key = spec.slice(0, -3).toLowerCase();
    }

    num =  {
        '0':            0,
        's':            0, // spec
        // mnemonics:
        ' ':            0,
        '_':            0,
        'a':            0,
        'any':          0,

        '1':            1,
        'n':            1, // spec
        'ns':           1, // spec for random numbers reporter
        // mnemonics:
        '#':            1,
        'num':          1,
        'number':       1,

        '2':            2,
        'b':            2, // spec
        // mnemonics:
        '?':            2,
        'tf':           2,
        'bool':         2,
        'boolean':      2,

        '3':            3,
        'l':            3, // spec
        // mnemonics:
        ':':            3,
        'lst':          3,
        'list':         3,

        '4':            4,
        'txt':          4, // spec
        'mlt':          4, // spec
        'code':         4, // spec
        // mnemonics:
        'x':            4,
        'text':         4,
        'abc':          4,

        '5':            5,
        'c':            5, // spec
        'cs':           5, // spec
        // mnemonics:
        'script':       5,

        '6':            6,
        'cmdring':      6, // spec
        // mnemonics:
        'cmd':          6,
        'command':      6,

        '7':            7,
        'repring':      7, // spec
        // mnemonics:
        'ring':         7,
        'rep':          7,
        'reporter':     7,

        '8':            8,
        'predring':     8, // spec
        // mnemonics:
        'pred':         8,
        'predicate':    8,

        '9':            9,
        'anyue':        9, // spec
        // mnemonics:
        'unevaluated':  9,

        '10':           10,
        'boolue':       10, // spec
        // mnemonics: none

        '11':           11,
        'obj':          11, // spec
        // mnemonics:
        'o':            11,
        'object':       11,

        '12':           12,
        't':            12, // spec
        'upvar':        12, // spec
        // mnemonics:
        'v':            12,
        'var':          12,
        'variable':     12,

        '13':           13,
        'clr':          13, // spec
        // mnemonics:
        'color':        13,

        '14':           14,
        'scriptvars':   14, // spec
        // mnemonics:
        'vars':         14,
        'variables':    14,

        '15':           15,
        'ca':           15, // spec
        'loop':         15, // spec

        '16':           16,
        'receive':      16, // spec
        // mnemonics:
        'receivers':    16,

        '17':           17,
        'send':         17, // spec

        '18':           18,
        'elseif':       18, // spec
        // mnemonics:
        'conditionals': 18,

        '19':           19,
        'parameter':    19, // spec
        // mnemonics:
        'parm':         19

    }[key];
    if (num === undefined) {
        return spec;
    }
    return shift + num;
};

Process.prototype.slotSpec = function (num) {
    // answer a spec indicating the shape of a slot represented by a number
    // or by a textual mnemomic
    var prefix = '',
        id = this.reportIsA(num, 'text') ? this.slotType(num) : +num,
        spec;

    if (num instanceof List) { // input group
        return '%group' + num.itemsArray().map(each =>
            this.slotSpec(each)
        ).join('');
    }

    if (id >= 100) {
        prefix = '%mult';
        id -= 100;
    }

    spec = ['s', 'n', 'b', 'l', 'mlt', 'cs', 'cmdRing', 'repRing', 'predRing',
    'anyUE', 'boolUE', 'obj', 'upvar', 'clr', 'scriptVars', 'loop', 'receive',
    'send', 'elseif', 'parameter'][id];

    if (spec === undefined) {
        return null;
    }
    if (spec === 'upvar' && id > 100) {
        return null;
    }
    if (num > 100 && [
        'loop', 'scriptVars', 'receive', 'send', 'elseif'
        ].includes(spec) && num > 100)
    {
        // guard against unimaginative metaprogramming fetishist assholes
        // badmouthing Snap! "bugs" in the forums
        return null;
    }
    return prefix + '%' + spec;
};

Process.prototype.doSetBlockAttribute = function (attribute, block, val) {
    var choice = this.inputOption(attribute),
        rcvr = this.blockReceiver(),
        ide = rcvr.parentThatIsA(IDE_Morph),
        types = ['command', 'reporter', 'predicate', 'hat'],
        scopes = ['global', 'local'],
        idx, oldSpec, expr, def, inData, template, oldType, type, loc, prim;

    this.assertType(block, types);
    expr = block.expression;
    if (expr instanceof RingMorph) {
        throw new Error(
            'expecting a custom block\nbut getting a ring'
        );
    }
    if (!expr.isCustomBlock) {
        if (choice === 'primitive' && [true, 1, '1'].includes(val)) {
            return; // already a primitive, do nothing
        }
        rcvr.customizePrimitive(expr.selector, choice !== 'definition');
        def = SpriteMorph.prototype.blocks[expr.selector].definition;
    } else {
        def = expr.isGlobal ?
            expr.definition
            : rcvr.getMethod(expr.semanticSpec);
    }
    oldSpec = def.blockSpec();

    function isInUse() {
        if (def.isGlobal) {
            return ide.sprites.asArray().concat([ide.stage]).some((any, idx) =>
                any.usesBlockInstance(def, false, idx)
            ) || ide.stage.allBlockInstancesInData(def).some(any =>
                !any.isUnattached()
            );
        }
        return rcvr.allDependentInvocationsOf(oldSpec).some(any =>
            !any.isUnattached()
        );
    }

    function remove(arr, value) {
        var idx = arr.indexOf(value);
        if (idx > -1) {
            arr.splice(idx, 1);
        }
    }

    function isMajorTypeChange() {
        var rep = ['reporter', 'predicate'];
        return (type === 'command' && rep.includes(oldType)) ||
            (oldType == 'command' && rep.includes(type));
    }

    function labelFromList(list) {
        return list.map(each => each instanceof List ? each.asWords()
            : each).asTXT().replaceAll('\n', ' $nl ');
    }

    switch (choice) {
    case 'label':
        if (val instanceof List) {
            val = labelFromList(val);
        }
        def.setBlockLabel(val);
        break;
    case 'comment':
        def.comment = val ? new CommentMorph(val) : null;
        if (def.body) {
            def.body.comment = val || null;
        }
        break;
    case 'definition':
        this.assertType(val, types);
        def.setBlockDefinition(val);
        break;
    case 'primitive':
        prim = def.body?.expression;
        val = [true, 1, '1'].includes(val);
        if (prim && prim.selector === 'doPrimitive' && prim.nextBlock()) {
            prim.inputs()[0].setContents(val);
            def.setPrimitive(
                val ? prim.inputs()[1].contents().text || null : null
            );
        }
        break;
    case 'category':
        this.assertType(val, ['number', 'text']);
        if (this.reportTypeOf(val) === 'text') {
            idx = SpriteMorph.prototype.allCategories().map(
                cat => cat.toLowerCase()
            ).indexOf(val.toLowerCase());
            val = idx + 1;
        }
        def.category = SpriteMorph.prototype.allCategories()[+val - 1] ||
            'other';
        break;
    case 'type':
        this.assertType(val, ['number', 'text']);
        if (this.reportTypeOf(val) === 'text') {
            type = val.toLowerCase();
        } else {
            type = types[val - 1] || '';
        }
        if (!types.includes(type)) {return;}

        if (rcvr.allBlockInstances(def).every(block =>
            block.isChangeableTo(type))
        ) {
            oldType = def.type;
            def.type = type;
        } else {
            throw new Error('cannot change this\nfor a block that is in use');
        }
        if (isMajorTypeChange()) {
            // since we've already scanned all contexts we know that those
            // that contain block instances only contain single, unattached
            // ones. Therefore we can simply replace them with new ones.
            if (def.isGlobal) {
                ide.stage.allContextsUsing(def).forEach(context =>
                    context.expression = def.blockInstance()
                );
            } else {
                ide.stage.allContextsInvoking(def.blockSpec(), rcvr).forEach(
                    context => context.expression = def.blockInstance()
                );
            }
        }
        break;
    case 'scope':
        if (isInUse()) {
            throw new Error('cannot change this\nfor a block that is in use');
        }
        this.assertType(val, ['number', 'text']);
        if (this.reportTypeOf(val) === 'text') {
            type = val.toLowerCase();
        }
        if (scopes.includes(type)) {
            type = scopes.indexOf(type) + 1;
        } else {
            type = +val;
        }
        if (type === 1 && !def.isGlobal) {
            // make global
            inData = ide.stage.allContextsInvoking(def.blockSpec(), rcvr);
            def.isGlobal = true;
            remove(rcvr.customBlocks, def);
            ide.stage.globalBlocks.push(def);
        } else if (type === 2 && def.isGlobal) {
            // make local
            inData = ide.stage.allContextsUsing(def);
            def.isGlobal = false;
            remove(ide.stage.globalBlocks, def);
            rcvr.customBlocks.push(def);
        } else {
            return;
        }
        inData.forEach(context => {
            context.expression = def.blockInstance();
            context.changed();
        });
        break;
    case 'selector':
        this.assertType(val, 'text');
        def.selector = val || null;
        break;
    case 'slots':
        this.assertType(val, ['list', 'number', 'text']);
        if (!(val instanceof List)) {
            val = new List(new Array(def.inputNames().length).fill(val));
        }
        def.inputNames().forEach((name, idx) => {
            var info = def.declarations.get(name),
                id = val.at(idx + 1);
            if (id !== '') {
                info[0] = this.slotSpec(id) || info[0];
                def.declarations.set(name, info);
            }
        });
        break;
    case 'defaults':
        this.assertType(val, ['list', 'Boolean', 'number', 'text', 'color']);
        if (!(val instanceof List)) {
            val = new List(new Array(def.inputNames().length).fill(val));
        }
        def.inputNames().forEach((name, idx) => {
            var info = def.declarations.get(name),
                options = val.at(idx + 1);
            this.assertType(
                options,
                ['list', 'Boolean', 'number', 'text', 'selector', 'color']
            );
            if (options instanceof List) {
                options = options.itemsArray().map(v =>
                    v.toString().trim()).join('\n');
            }
            info[1] = options;
            def.declarations.set(name, info);
        });
        break;
    case 'menus':
        this.assertType(val, ['list', 'text', 'number']);
        if (!(val instanceof List)) {
            val = new List(new Array(def.inputNames().length).fill(val));
        }
        def.inputNames().forEach((name, idx) => {
            var info = def.declarations.get(name),
                options = val.at(idx + 1),
                block;
            if (options !== '') {
                if (options instanceof Context) {
                    expr = options.expression;
                    if (expr instanceof ReporterBlockMorph) {
                        block = SpriteMorph.prototype.blockForSelector(
                            'doReport'
                        );
                        block.replaceInput(block.inputs()[0], expr.fullCopy());
                        expr = block;
                    }
                    if (expr instanceof CommandBlockMorph) {
                        block = SpriteMorph.prototype.blockForSelector(
                            'receiveSlotEvent'
                        );
                        block.inputs()[0].setContents(name);
                        block.inputs()[1].setContents(['menu']);
                        block.nextBlock(expr);
                        expr = block;
                        expr.setPosition(new Point(20, 120));
                        def.scripts = def.scripts.filter(each =>
                            !(each.selector === 'receiveSlotEvent' &&
                                each.inputs()[0].evaluate() === name &&
                                each.inputs()[1].evaluateOption() === 'menu'));
                        def.scripts.push(expr);
                    }
                    options = '§_dynamicMenu';
                }
                if (!(options instanceof List)) {
                    options = new List([options]);
                }
                info[2] = def.encodeChoices(options);
                def.declarations.set(name, info);
            }
        });
        break;
    case 'editables':
        this.assertType(val, ['list', 'Boolean', 'number']);
        if (!(val instanceof List)) {
            val = new List(new Array(def.inputNames().length).fill(val));
        }
        def.inputNames().forEach((name, idx) => {
            var info = def.declarations.get(name),
                options = val.at(idx + 1);
            if ([true, false, 0, 1, '0', '1'].includes(options)) {
                options = +options;
                info[3] = !options;
                def.declarations.set(name, info);
            }
        });
        break;
    case 'replaceables':
        this.assertType(val, ['list', 'Boolean', 'number']);
        if (!(val instanceof List)) {
            val = new List(new Array(def.inputNames().length).fill(val));
        }
        def.inputNames().forEach((name, idx) => {
            var info = def.declarations.get(name),
                options = val.at(idx + 1);
            if ([true, false, 0, 1, '0', '1'].includes(options)) {
                options = +options;
                info[4] = !options;
                def.declarations.set(name, info);
            }
        });
        break;
    case 'separators':
        this.assertType(val, ['list', 'text', 'number']);
        if (!(val instanceof List)) {
            val = new List([val]);
        }
        def.inputNames().forEach((name, idx) => {
            var info = def.declarations.get(name),
                options = val.at(idx + 1);
            info[5] = options.toString();
            def.declarations.set(name, info);
        });
        break;
    case 'collapses':
        this.assertType(val, ['list', 'text', 'number']);
        if (!(val instanceof List)) {
            val = new List([val]);
        }
        def.inputNames().forEach((name, idx) => {
            var info = def.declarations.get(name),
                options = val.at(idx + 1);
            info[6] = options.toString();
            def.declarations.set(name, info);
        });
        break;
    case 'expands':
        this.assertType(val, ['list', 'text', 'number']);
        if (!(val instanceof List)) {
            val = new List([val]);
        }
        def.inputNames().forEach((name, idx) => {
            var info = def.declarations.get(name),
                options = val.at(idx + 1),
                data;
            if (options instanceof List) {
                data = options.itemsArray().map(each =>
                    each.replaceAll('\n', ' ').trim()).filter(each =>
                        each.length).join('\n');
            } else {
                data = options.toString();
            }

            info[7] = data;
            def.declarations.set(name, info);
        });
        break;
    case 'initial slots':
        this.assertType(val, ['list', 'text', 'number']);
        if (!(val instanceof List)) {
            val = new List([val]);
        }
        def.inputNames().forEach((name, idx) => {
            var info = def.declarations.get(name),
                options = val.at(idx + 1);
            info[8] = +options;
            def.declarations.set(name, info);
        });
        break;
    case 'min slots':
        this.assertType(val, ['list', 'text', 'number']);
        if (!(val instanceof List)) {
            val = new List([val]);
        }
        def.inputNames().forEach((name, idx) => {
            var info = def.declarations.get(name),
                options = val.at(idx + 1);
            info[9] = +options;
            def.declarations.set(name, info);
        });
        break;
    case 'max slots':
        this.assertType(val, ['list', 'text', 'number']);
        if (!(val instanceof List)) {
            val = new List([val]);
        }
        def.inputNames().forEach((name, idx) => {
            var info = def.declarations.get(name),
                options = val.at(idx + 1);
            info[10] = +options;
            def.declarations.set(name, info);
        });
        break;
    case 'translations':
        this.assertType(val, 'list');
        loc = {};
        val.map(row =>
            loc[row.at(1).toString()] = row.at(2).toString()
        );
        def.translations = loc;
        break;
    default:
        return;
    }

    // make sure the spec is unique
    while (rcvr.doubleDefinitionsFor(def).length > 0) {
        def.spec += (' (2)');
    }

    // update all block instances:
    // refer to "updateDefinition()" of BlockEditorMorph:
    template = rcvr.paletteBlockInstance(def);

    if (def.isGlobal) {
        rcvr.allBlockInstances(def).reverse().forEach(block => block.refresh());
        ide.stage.allContextsUsing(def).forEach(context => context.changed());
    } else {
        rcvr.allDependentInvocationsOf(oldSpec).reverse().forEach(
            block => block.refresh(def)
        );
        ide.stage.allContextsInvoking(def.blockSpec(), rcvr).forEach(context =>
            context.changed()
        );
    }
    if (template) {
        template.refreshDefaults();
    }
    ide.flushPaletteCache();
    ide.refreshEmptyCategories();
    ide.refreshPalette();
    rcvr.recordUserEdit(
        'scripts',
        'custom block',
        def.isGlobal ? 'global' : 'local',
        'changed attribute',
        def.abstractBlockSpec(),
        choice
    );
};

Process.prototype.doDefineBlock = function (upvar, label, context) {
    var rcvr = this.blockReceiver(),
        ide = rcvr.parentThatIsA(IDE_Morph),
        vars = this.context.outerContext.variables,
        type = this.reportTypeOf(context),
        count = 1,
        spec, def;

    function newName(name, elements) {
        var count = 1,
            newName = name,
            exist = e => snapEquals(e, newName);

        while (elements.some(exist)) {
            count += 1;
            newName = name + ' (' + count + ')';
        }
        return newName;
    }

    function labelFromList(list) {
        return list.map(each => each instanceof List ? each.asWords()
            : each).asTXT().replaceAll('\n', ' $nl ');
    }

    if (label instanceof List) {
        label = labelFromList(label);
    }
    this.assertType(label, 'text');
    label = label.trim();
    if (label === '') {return ''; }
    this.assertType(context, ['command', 'reporter', 'predicate', 'hat']);

    // replace upvar self references inside the definition body
    // with "reportEnvironment" reporters
    if (context.expression instanceof BlockMorph) {
        this.compileBlockReferences(context, upvar);
    }

    // avoid using a label that matches an existing global custom block def
    // even if technically it's not (yet) a collision case
    label = newName(
        label,
        ide.stage.globalBlocks.map(def => def.abstractBlockSpec())
    );

    // make a new custom block definition
    def = new CustomBlockDefinition('BYOB'); // haha!
    def.type = type;
    def.category = 'other';
    def.isGlobal = true;
    def.setBlockDefinition(context);
    def.setBlockLabel(label);
    ide.stage.globalBlocks.push(def);

    // make sure the spec is unique
    spec = def.spec;
    while (rcvr.doubleDefinitionsFor(def).length > 0) {
        count += 1;
        def.spec = spec + ' (' + count + ')';
    }

    // update the IDE
    ide.flushPaletteCache();
    ide.refreshEmptyCategories();
    ide.refreshPalette();
    rcvr.recordUserEdit(
        'palette',
        'custom block',
        def.isGlobal ? 'global' : 'local',
        'new',
        def.abstractBlockSpec()
    );

    // create the reference to the new block
    vars.addVar(upvar);
    vars.setVar(upvar, def.blockInstance().reify());
};

Process.prototype.compileBlockReferences = function (context, varName) {
    // private - replace self references inside the definition body
    // with "this script" reporters
    var report, declare, assign, self;

    function block(selector) {
        return SpriteMorph.prototype.blockForSelector(selector);
    }

    if (context.expression.allChildren().some(any =>
        any.selector === 'reportGetVar' && any.parentThatIsA(RingMorph)
    )) {
        if (context.expression instanceof ReporterBlockMorph) {
            // turn into a REPORT script
            report = block('doReport');
            report.replaceInput(
                report.inputs()[0],
                context.expression.fullCopy()
            );
            context.expression = report;
        }
        // add a script var to capture the outer definition
        // don't replace any references, because they now should just work
        self = block('reportEnvironment');
        self.inputs()[0].setContents(['script']);
        declare = block('doDeclareVariables');
        declare.inputs()[0].setContents([varName]);
        assign = block('doSetVar');
        assign.inputs()[0].setContents(varName);
        assign.replaceInput(assign.inputs()[1], self);
        declare.nextBlock(assign);
        assign.nextBlock(context.expression.fullCopy());
        context.expression = declare;
        return;
    }

    if (context.expression instanceof BlockMorph) {
        context.expression.forAllChildren(morph => {
            var ref;
            if (morph.selector === 'reportGetVar' &&
                (morph.blockSpec === varName))
            {
                ref = block('reportEnvironment');
                ref.inputs()[0].setContents(['script']);
                if (morph.parent instanceof SyntaxElementMorph) {
                    morph.parent.replaceInput(morph, ref);
                } else {
                    context.expression = ref;
                }
            }
        });
    }
};

Process.prototype.doDeleteBlock = function (context) {
    var rcvr = this.blockReceiver(),
        ide = rcvr.parentThatIsA(IDE_Morph),
        stage = ide.stage,
        expr, def, method, idx;

    this.assertType(context, ['command', 'reporter', 'predicate', 'hat']);
    expr = context.expression;
    if (!expr.isCustomBlock) {
        throw new Error('expecting a custom block\nbut getting a primitive');
    }
    def = expr.isGlobal ? expr.definition : rcvr.getMethod(expr.semanticSpec);
    if (def.isBootstrapped()) {
        rcvr.restorePrimitive(def);
    } else {
        rcvr.deleteAllBlockInstances(def);
        if (def.isGlobal) {
            idx = stage.globalBlocks.indexOf(def);
            if (idx !== -1) {
                stage.globalBlocks.splice(idx, 1);
            }
        } else {
            // delete local definition
            idx = rcvr.customBlocks.indexOf(def);
            if (idx !== -1) {
                rcvr.customBlocks.splice(idx, 1);
            }
            // refresh instances of inherited method, if any
            method = rcvr.getMethod(def.blockSpec);
            if (method) {
                rcvr.allDependentInvocationsOf(method.blockSpec).forEach(
                    block => block.refresh(method)
                );
            }
        }
    }

    // update the IDE
    ide.flushPaletteCache();
    ide.refreshEmptyCategories();
    ide.refreshPalette();
    rcvr.recordUserEdit(
        'palette',
        'custom block',
        def.isGlobal ? 'global' : 'local',
        'delete definition',
        def.abstractBlockSpec()
    );
};

// Process: Compile (as of yet simple) block scripts to JS

/*
	with either only explicit formal parameters or a specified number of
	implicit formal parameters mapped to empty input slots
	*** highly experimental and heavily under construction ***
*/

Process.prototype.reportCompiled = function (context, implicitParamCount) {
	// implicitParamCount is optional and indicates the number of
 	// expected parameters, if any. This is only used to handle
  	// implicit (empty slot) parameters and can otherwise be
   	// ignored
    return new JSCompiler(this).compileFunction(context, implicitParamCount);
};

Process.prototype.capture = function (aContext) {
    // private - answer a new process on a full copy of the given context
    // while retaining the lexical variable scope
    var proc = new Process(this.topBlock, this.receiver);
    var clos = new Context(
        aContext.parentContext,
        aContext.expression,
        aContext.outerContext,
        aContext.receiver
    );
    clos.variables = aContext.variables.fullCopy();
    clos.variables.root().parentFrame = proc.variables;
    proc.context = clos;
    return proc;
};

Process.prototype.getVarNamed = function (name) {
    // private - special form for compiled expressions
    // DO NOT use except in compiled methods!
    // first check script vars, then global ones
    var frame = this.homeContext.variables.silentFind(name) ||
            this.context.variables.silentFind(name),
        value;
    if (frame) {
        value = frame.vars[name].value;
        return (value === 0 ? 0
                : value === false ? false
                        : value === '' ? ''
                            : value || 0); // don't return null
    }
    this.variableError(name);
};

Process.prototype.setVarNamed = function (name, value) {
    // private - special form for compiled expressions
    // incomplete, currently only sets named vars
    // DO NOT use except in compiled methods!
    // first check script vars, then global ones
    var frame = this.homeContext.variables.silentFind(name) ||
            this.context.variables.silentFind(name);
    if (isNil(frame)) {
        this.variableError(name);
    }
    frame.vars[name].value = value;
};

Process.prototype.incrementVarNamed = function (name, delta) {
    // private - special form for compiled expressions
    this.setVarNamed(name, this.getVarNamed(name) - (-delta));
};

// Process: Atomic HOFs using experimental JIT-compilation

Process.prototype.reportAtomicMap = function (reporter, list) {
    // if the reporter uses formal parameters instead of implicit empty slots
    // there are two additional optional parameters:
    // #1 - element
    // #2 - optional | index
    // #3 - optional | source list

    this.assertType(list, 'list');
	var result = [],
    	src = list.itemsArray(),
    	len = src.length,
        formalParameterCount = reporter.inputs.length,
        parms,
     	func,
    	i;

	// try compiling the reporter into generic JavaScript
 	// fall back to the morphic reporter if unsuccessful
    try {
    	func = this.reportCompiled(reporter, 1); // a single expected input
    } catch (err) {
        console.log(err.message);
     	func = reporter;
    }

	// iterate over the data in a single frame:
 	// to do: Insert some kind of user escape mechanism

	for (i = 0; i < len; i += 1) {
        parms = [src[i]];
        if (formalParameterCount > 1) {
            parms.push(i + 1);
        }
        if (formalParameterCount > 2) {
            parms.push(list);
        }
  		result.push(
        	invoke(
            	func,
                new List(parms),
                null,
                null,
                null,
                null,
                this.capture(reporter) // process
            )
        );
	}
	return new List(result);
};

Process.prototype.reportAtomicKeep = function (reporter, list) {
    // if the reporter uses formal parameters instead of implicit empty slots
    // there are two additional optional parameters:
    // #1 - element
    // #2 - optional | index
    // #3 - optional | source list

    this.assertType(list, 'list');
    var result = [],
        src = list.itemsArray(),
        len = src.length,
        formalParameterCount = reporter.inputs.length,
        parms,
        func,
        i;

    // try compiling the reporter into generic JavaScript
    // fall back to the morphic reporter if unsuccessful
    try {
        func = this.reportCompiled(reporter, 1); // a single expected input
    } catch (err) {
        console.log(err.message);
        func = reporter;
    }

    // iterate over the data in a single frame:
    // to do: Insert some kind of user escape mechanism
    for (i = 0; i < len; i += 1) {
        parms = [src[i]];
        if (formalParameterCount > 1) {
            parms.push(i + 1);
        }
        if (formalParameterCount > 2) {
            parms.push(list);
        }
    	if (
        	invoke(
            	func,
                new List(parms),
                null,
                null,
                null,
                null,
                this.capture(reporter) // process
            )
        ) {
     		result.push(src[i]);
     	}
    }
    return new List(result);
};

Process.prototype.reportAtomicFindFirst = function (reporter, list) {
    // if the reporter uses formal parameters instead of implicit empty slots
    // there are two additional optional parameters:
    // #1 - element
    // #2 - optional | index
    // #3 - optional | source list

    this.assertType(list, 'list');
    var src = list.itemsArray(),
        len = src.length,
        formalParameterCount = reporter.inputs.length,
        parms,
        func,
        i;

    // try compiling the reporter into generic JavaScript
    // fall back to the morphic reporter if unsuccessful
    try {
        func = this.reportCompiled(reporter, 1); // a single expected input
    } catch (err) {
        console.log(err.message);
        func = reporter;
    }

    // iterate over the data in a single frame:
    // to do: Insert some kind of user escape mechanism
    for (i = 0; i < len; i += 1) {
        parms = [src[i]];
        if (formalParameterCount > 1) {
            parms.push(i + 1);
        }
        if (formalParameterCount > 2) {
            parms.push(list);
        }
        if (
            invoke(
                func,
                new List(parms),
                null,
                null,
                null,
                null,
                this.capture(reporter) // process
            )
        ) {
            return src[i];
         }
    }
    return '';
};

Process.prototype.reportAtomicCombine = function (list, reporter) {
    // if the reporter uses formal parameters instead of implicit empty slots
    // there are two additional optional parameters:
    // #1 - accumulator
    // #2 - element
    // #3 - optional | index
    // #4 - optional | source list

    var result, src, len, formalParameterCount, parms, func, i;
    this.assertType(list, 'list');

    // check for special cases to speed up
    if (this.canRunOptimizedForCombine(reporter)) {
        return this.reportListAggregation(
            list,
            reporter.expression.selector
        );
    }

    result = '';
    src = list.itemsArray();
    len = src.length;
    formalParameterCount = reporter.inputs.length;

	if (len === 0) {
 		return result;
 	}
  	result = src[0];

    // try compiling the reporter into generic JavaScript
    // fall back to the morphic reporter if unsuccessful
    try {
        func = this.reportCompiled(reporter, 2); // a single expected input
    } catch (err) {
        console.log(err.message);
        func = reporter;
    }

    // iterate over the data in a single frame:
    // to do: Insert some kind of user escape mechanism
    for (i = 1; i < len; i += 1) {
        parms = [result, src[i]];
        if (formalParameterCount > 2) {
            parms.push(i + 1);
        }
        if (formalParameterCount > 3) {
            parms.push(list);
        }
    	result = invoke(
        	func,
            new List(parms),
            null,
            null,
            null,
            null,
            this.capture(reporter) // process
        );
    }
    return result;
};

Process.prototype.reportAtomicSort = function (list, reporter) {
    this.assertType(list, 'list');
    var func;

    // try compiling the reporter into generic JavaScript
    // fall back to the morphic reporter if unsuccessful
    try {
    	func = this.reportCompiled(reporter, 2); // two inputs expected
    } catch (err) {
        console.log(err.message);
        func = reporter;
    }

    // iterate over the data in a single frame:
	return new List(
  		list.itemsArray().slice().sort((a, b) =>
            invoke(
                func,
                new List([a, b]),
                null,
                null,
                null,
                null,
                this.capture(reporter) // process
            ) ? -1 : 1
        )
    );
};

Process.prototype.reportAtomicGroup = function (list, reporter) {
    this.assertType(list, 'list');
    var result = [],
        dict = new Map(),
        groupKey,
        src = list.itemsArray(),
        len = src.length,
        func,
        i;

    // try compiling the reporter into generic JavaScript
    // fall back to the morphic reporter if unsuccessful
    try {
        func = this.reportCompiled(reporter, 1); // a single expected input
    } catch (err) {
        console.log(err.message);
         func = reporter;
    }

    // iterate over the data in a single frame:
    // to do: Insert some kind of user escape mechanism

    for (i = 0; i < len; i += 1) {
        groupKey = invoke(
            func,
            new List([src[i]]),
            null,
            null,
            null,
            null,
            this.capture(reporter) // process
        );
        if (dict.has(groupKey)) {
            dict.get(groupKey).push(src[i]);
        } else {
            dict.set(groupKey, [src[i]]);
        }
    }

    dict.forEach((value, key) =>
        result.push(new List([key, value.length, new List(value)]))
    );
    return new List(result);
};

// Adding 6 dev primitives to offer compatibility with Snap4Arduino projects
// They need s4a extension functions, loaded with the S4A Connector library

Process.prototype.reportConnected = function () {
    return this.reportApplyExtension("s4a_reportConnected", new List([]));
};

Process.prototype.digitalWrite = function (pin, booleanValue) {
    this.doApplyExtension(
        "s4a_digitalWrite(pin, value)",
        new List([pin, booleanValue])
    );
};

Process.prototype.pwmWrite = function (pin, value) {
    this.doApplyExtension("s4a_pwmWrite(pin, value)", new List([pin, value]));
};

Process.prototype.servoWrite = function (pin, value) {
    this.doApplyExtension("s4a_servoWrite(pin, value)", new List([pin, value]));
};

Process.prototype.reportAnalogReading = function (pin) {
    return this.reportApplyExtension(
        "s4a_reportAnalogReading(pin)",
        new List([pin])
    );
};

Process.prototype.reportDigitalReading = function (pin, booleanValue) {
    return this.reportApplyExtension(
        "s4a_reportDigitalReading(pin)",
        new List([pin])
    );
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
    isCustomCommand marker for interpolated blocking reporters (reportURL)
    emptySlots      caches the number of empty slots for reification
    tag             string or number to optionally identify the Context,
                    as a "return" target (for the "stop block" primitive)
    isFlashing      flag for single-stepping
    accumulator     slot for collecting data from reentrant visits
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
    this.comment = null;
    this.isContinuation = false;
    this.startTime = null;
    this.activeSends = null;
    this.activeAudio = null;
    this.activeNote = null;
    this.isCustomBlock = false; // marks the end of a custom block's stack
    this.isCustomCommand = null; // used for ignoring URL reporters' results
    this.emptySlots = 0; // used for block reification
    this.tag = null;  // lexical catch-tag for custom blocks
    this.isFlashing = false; // for single-stepping
    this.accumulator = null;
    this.version = null; // for oberservers, don't serialize
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

Context.prototype.changed = function () {
    // notify observers about a change of my state
    this.version = Date.now();
};

Context.prototype.image = function () {
    var ring = this.toBlock();
    return ring.doWithAlpha(1, () => ring.fullImage());
};

Context.prototype.toBlock = function () {
    var ring = new RingMorph(),
        block,
        cmt,
        cont;

    if (this.comment) {
        cmt = new CommentMorph(this.comment);
        cmt.block = ring;
        ring.comment = cmt;
    }

    if (this.expression instanceof Morph) {
        block = this.expression.fullCopy();

        // replace marked call/cc block with empty slot
        if (this.isContinuation) {
            cont = detect(
                block.allInputs(),
                inp => inp.bindingID === 1
            );
            if (cont) {
                block.revertToDefaultInput(cont, true);
            }
        }
        ring.embed(block, this.inputs);
        ring.clearAlpha();
        return ring;
    }
    if (this.expression instanceof Array) {
        block = this.expression[this.pc].fullCopy();
        if (block instanceof RingMorph && !block.contents()) { // empty ring
            return block;
        }
        ring.embed(block, this.isContinuation ? [] : this.inputs);
        return ring;
    }

    // otherwise show an empty ring
    ring.color = SpriteMorph.prototype.blockColor.other;
    ring.setSpec('%rr %ringparms');

    // also show my inputs, unless I'm a continuation
    if (!this.isContinuation) {
        this.inputs.forEach(inp =>
            ring.parts()[1].addInput(inp)
        );
    }
    return ring;
};

Context.prototype.toUserBlock = function () {
    var ring = this.toBlock(),
        block = ring.contents();
    if (!block || ring.inputNames().length) {
        return ring;
    }
    return block;
};

// Context continuations:

Context.prototype.rawContinuation = function (isReporter) {
    var cont;
    if (this.expression instanceof Array) {
        return this;
    }
    if (this.parentContext) {
        return this.parentContext;
    }
    cont = new Context(
        null,
        isReporter ? 'expectReport' : 'popContext'
    );
    cont.isContinuation = true;
    return cont;
};

Context.prototype.continuation = function (isReporter) {
    // retained for legacy compatibility for deprecated run/cc and call/cc
    var cont;
    if (this.expression instanceof Array) {
        cont = this;
    } else if (this.parentContext) {
        cont = this.parentContext;
    } else {
        cont = new Context(
            null,
            isReporter ? 'expectReport' : 'popContext'
        );
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
    // for single-stepping when pausing
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

Context.prototype.isInCustomBlock = function () {
    if (this.isCustomBlock) {
        return true;
    }
    if (this.parentContext) {
        return this.parentContext.isInCustomBlock();
    }
    return false;
};

// Context syntax analysis

Context.prototype.components = function () {
    var expr = this.expression;
    if (expr && expr.components) {
        expr = expr.components(this.inputs.slice());
    } else {
        expr = new Context();
        expr.inputs = this.inputs.slice();
    }
    return expr instanceof Context ? new List([expr]) : expr;
};

Context.prototype.equalTo = function (other) {
    var c1 = this.components(),
        c2 = other.components();
    if (this.emptyOrEqual(c1.cdr(), c2.cdr())) {
        if (this.expression && this.expression.length === 1 &&
                other.expression && other.expression.length === 1) {
            return snapEquals(this.expression[0], other.expression[0]);
        }
        return snapEquals(this.expression, other.expression);
    }
    return false;
};

Context.prototype.emptyOrEqual = function (list1, list2) {
    // private - return TRUE if both lists are either equal
    // or only contain empty items
    return list1.equalTo(list2) || (
        list1.itemsArray().every(item => !item) &&
        list2.itemsArray().every(item => !item)
    );
};

Context.prototype.copyWithInputs = function (inputs) {
    return this.expression ?
        this.expression.copyWithInputs(inputs)
        : this;
};

Context.prototype.copyWithNext = function (next) {
    return this.expression.copyWithNext(next.expression, this.inputs.slice());
};

Context.prototype.updateEmptySlots = function () {
    this.emptySlots = this.expression.markEmptySlots();
};

// Variable /////////////////////////////////////////////////////////////////

function Variable(value, isTransient, isHidden) {
    this.value = value;
    this.isTransient = isTransient || false; // prevent value serialization
    this.isHidden = isHidden || false; // not shown in the blocks palette
}

Variable.prototype.toString = function () {
    return 'a ' + (this.isTransient ? 'transient ' : '') +
        (this.isHidden ? 'hidden ' : '') +
        'Variable [' + this.value + ']';
};

Variable.prototype.copy = function () {
    return new Variable(this.value, this.isTransient, this.isHidden);
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
    this.names().forEach(vName =>
        frame.addVar(vName, this.getVar(vName))
    );
    return frame;
};

VariableFrame.prototype.fullCopy = function () {
    var frame;
    if (this.parentFrame) {
        frame = new VariableFrame(this.parentFrame.fullCopy());
    } else {
        frame = new VariableFrame();
    }
    frame.vars = copy(this.vars);
    return frame;
};

// Variable Frame forking and merging for libraries

VariableFrame.prototype.fork = function (names = []) {
    // answer a copy that only has entries for the given array of variable names
    // and only has values for primitive data.
    // used for including data dependencies in libraries.
    var frame = new VariableFrame();
    this.names(true).forEach(vName => {
        var v, val, typ;
        if (names.includes(vName)) {
            v = this.vars[vName];
            if (v.isTransient) {
                val = '';
            } else {
                typ = Process.prototype.reportTypeOf(v.value);
                if (['text', 'number', 'Boolean'].includes(typ) ||
                    (v.value instanceof List &&
                        (v.value.canBeCSV() || v.value.canBeJSON()))
                ) {
                    val = v.value;
                } else {
                    val = '';
                }
            }
            frame.vars[vName] = new Variable(val, v.isTransient, v.isHidden);
        }
    });
    return frame;
};

VariableFrame.prototype.merge = function (otherFrame) {
    // add another frame's variables overwriting existing values and
    // settings (transient, hidden) if any. Merge only replaces and
    // adds to the frame, does not delete any entries.
    // used for handling data dependencies in libraries.
    otherFrame.names(true).forEach(vName =>
        this.vars[vName] = otherFrame.vars[vName]
    );
};

// Variable Frame ops

VariableFrame.prototype.root = function () {
    if (this.parentFrame) {
        return this.parentFrame.root();
    }
    return this;
};

VariableFrame.prototype.find = function (name) {
    // answer the closest variable frame containing
    // the specified variable. otherwise throw an exception.
    var frame = this.silentFind(name);
    if (frame) {return frame; }
    this.variableError(name);
};

VariableFrame.prototype.silentFind = function (name) {
    // answer the closest variable frame containing
    // the specified variable. Otherwise return null.
    if (this.vars[name] instanceof Variable) {
        return this;
    }
    if (this.parentFrame) {
        if (this.parentFrame instanceof List) {
            return this.parentFrame;
        }
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
        if (frame instanceof List) { // OOP 2.0
            frame.lookup(name, () => this.variableError(name));
            frame.bind(name, value);
            return;
        }
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
        if (frame instanceof List) { // OOP 2.0
            value = frame.lookup(name, () => this.variableError(name));
            // only hypermutate if the attribute is not inherited
            if (value instanceof List && frame.hasKey(name)) {
                Process.prototype.hyperChangeBy(value, delta);
                return;
            }
            newValue = isNaN(parseFloat(value)) ? delta
                : Process.prototype.reportSum(value, delta);
            frame.bind(name, newValue);
            return;
        }
        value = frame.vars[name].value;
        if (value instanceof List) {
            Process.prototype.hyperChangeBy(value, delta);
            return; // do not shadow in this case (problematic, experimental)
        }
        newValue = !(value instanceof List) && isNaN(parseFloat(value)) ? delta
            : Process.prototype.reportSum(value, delta);
        if (sender instanceof SpriteMorph &&
                (frame.owner instanceof SpriteMorph) &&
                (sender !== frame.owner)) {
            sender.shadowVar(name, newValue);
        } else {
            frame.vars[name].value = newValue;
        }
    }
};

VariableFrame.prototype.getVar = function (name, proc) {
    var frame = this.silentFind(name),
        value;

    if (frame) {
        if (frame instanceof List) { // OOP 2.0
            value = frame.lookup(
                name,
                proc ?
                    () => proc.blockReceiver().globalVariables().getVar(name)
                    : () => this.variableError(name)
            );
            if (value instanceof Context) {
                value = Process.prototype.reportContextFor(value, frame);
            }
            return value;
        }
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
    if (proc?.isSilentVar) {
        // don't throw an error inside a user-scripted dynamic dropdown etc.
        // instead return an empty list, because this is the basis for ADTs
        return new List();
    }
    this.variableError(name);
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

VariableFrame.prototype.variableError = Process.prototype.variableError;

// VariableFrame tools

VariableFrame.prototype.names = function (includeHidden) {
    var each, names = [];
    for (each in this.vars) {
        if (Object.prototype.hasOwnProperty.call(this.vars, each)) {
            if (!this.vars[each].isHidden || includeHidden) {
                names.push(each);
            }
        }
    }
    return names;
};

VariableFrame.prototype.allNamesDict = function (upTo, includeHidden) {
	// "upTo" is an optional parent frame at which to stop, e.g. globals
    var dict = {}, current = this;

    function addKeysToDict(srcDict, trgtDict) {
        var eachKey;
        for (eachKey in srcDict) {
            if (Object.prototype.hasOwnProperty.call(srcDict, eachKey)) {
                if (!srcDict[eachKey].isHidden || includeHidden) {
                    trgtDict[eachKey] = eachKey;
                }
            }
        }
    }

    while (current && (current !== upTo)) {
        addKeysToDict(current.vars, dict);
        current = current.parentFrame;
    }
    return dict;
};

VariableFrame.prototype.allNames = function (upTo, includeHidden) {
/*
    only show the names of the lexical scope, hybrid scoping is
    reserved to the daring ;-)
	"upTo" is an optional parent frame at which to stop, e.g. globals
*/
    var answer = [], each, dict = this.allNamesDict(upTo, includeHidden);

    for (each in dict) {
        if (Object.prototype.hasOwnProperty.call(dict, each)) {
            answer.push(each);
        }
    }
    return answer;
};

// InputList ////////////////////////////////////////////////////////////////

function InputList(block, names = []) {
    this.block = block;
    this.names = names;
    this.selector = 'mergeVariables';
}

InputList.prototype.inputs = function () {
    return this.block.inputs();
};

// JSCompiler ////////////////////////////////////////////////////////////////

/*
    *** don't use same JSCompiler object multiple times ***
    Compile simple reporters
    with either only explicit formal parameters or a specified number of
    implicit formal parameters mapped to empty input slots
    *** highly experimental and heavily under construction ***
*/

function JSCompiler(aProcess, outerScope) {
    this.process = aProcess;
    this.source = null; // a context
    this.paramCount = 0;
    this.params = 0;
    this.gensymArgIndexes = new Map();
    this.scope = new Map();
    if (outerScope == null) {
        this.scope.depth = 0;
        this.scope.outerScope = null;
        return;
    }
    this.scope.depth = 1 + outerScope.depth;
    this.scope.outerScope = outerScope;
}

JSCompiler.prototype.toString = () => 'a JSCompiler';

JSCompiler.prototype.gensymForVar = function (varName, argIndex) {
    // argIndex -1 for script variables
    var gensym = this.getGensym(varName), oldArgIndex;
    if (gensym == null) {
        gensym = '_' + this.scope.depth + '_' + this.scope.size;
        this.scope.set(varName, gensym);
        this.gensymArgIndexes.set(gensym, argIndex);
        return gensym;
    }
    oldArgIndex = this.gensymArgIndexes.get(gensym);
    if (oldArgIndex == null || oldArgIndex < argIndex) {
        this.gensymArgIndexes.set(gensym, argIndex);
    }
    return gensym;
};

JSCompiler.prototype.getGensym = function (varName) {
    var scope = this.scope, gensym;
    while (null == (gensym = scope.get(varName)) &&
        null != (scope = scope.outerScope));
    return gensym;
};

JSCompiler.prototype.functionHead = function () {
    var str1 = 'var ', str2 = '';
    this.gensymArgIndexes.forEach((argIndex, gensym) => {
        if (argIndex === -1) {
            str1 += gensym + '=0,';
            return;
        }
        str2 += ',' + argIndex + ':' + gensym;
    });
    str1 += 'proc=params.pop();\n';
    if (this.params) {
        str1 += 'while(' + this.params + '>params.length)params.push(0);\n';
    }
    if (str2) {
        str1 += 'var{' + str2.substring(1) + '}=params;\n';
    }
    return str1;
};

JSCompiler.prototype.compileFunction = function () {
    return window.eval(this.compileFunctionBody.apply(this, arguments));
};

JSCompiler.prototype.findEmptySlot = function findEmptySlot(m) {
    if (m.isEmptySlot != null && m.isEmptySlot()) {
        return true;
    }
    if (m instanceof RingMorph) {
        // don't look in rings (they are not current scope)
        return false;
    }
    m = m.children;
    var i = m.length;
    while (i) {
        if (findEmptySlot(m[--i])) {
            return true;
        }
    }
    return false;
};

JSCompiler.prototype.compileFunctionBody = function (
    aContext,
    implicitParamCount
) {
    var block = aContext.expression,
        parameters = aContext.inputs,
        hasEmptySlots,
        code;

    if (block instanceof Array) {
        throw new Error('can\'t compile empty ring');
    }

    this.source = aContext;
    if (implicitParamCount === '' || isNil(implicitParamCount)) {
        this.implicitParams = 1;
    } else {
        this.implicitParams = Math.floor(implicitParamCount);
        if (!(this.implicitParams > 0 && this.implicitParams < 128)) {
            // use 1 if implicitParamCount doesn't make sense
            this.implicitParams = 1;
        }
    }

    // scan for empty input slots
    hasEmptySlots = this.findEmptySlot(block);

    // translate formal parameters into gensyms
    if (parameters.length) {
        // test for conflicts
        if (hasEmptySlots) {
            throw new Error(
                'compiling does not yet support\n' +
                'mixing explicit formal parameters\n' +
                'with empty input slots'
            );
        }
        // map explicit formal parameters
        this.params = parameters.length;
        parameters.forEach(this.gensymForVar, this);
    } else if (hasEmptySlots) {
        this.params = this.implicitParams;
    }

    // compile using gensyms
    if (block instanceof CommandBlockMorph) {
        code = this.compileSequence(block) + 'return "";\n';
    } else {
        code = 'return ' + this.compileExpression(block) + ';\n';
    }
    return '(function func(...params){\n' + this.functionHead() + code + '})';
};

JSCompiler.prototype.compileExpression = function (block) {
    var selector = block.selector,
        inputs = block.inputs(),
        target,
        args;

    // first check for special forms and infix operators
    switch (selector) {
    case 'reportVariadicOr':
        return this.compileInfix('||', inputs[0].inputs());
    case 'reportVariadicAnd':
        return this.compileInfix('&&', inputs[0].inputs());
    case 'reportIfElse':
        return '(' +
            this.compileInput(inputs[0]) +
            ' ? ' +
            this.compileInput(inputs[1]) +
            ' : ' +
            this.compileInput(inputs[2]) +
            ')';
    case 'evaluateCustomBlock':
        throw new Error(
            'compiling does not yet support\n' +
            'custom blocks'
        );
    // special evaluation primitives
    case 'doRun':
    case 'evaluate':
        return 'invoke(' + this.compileInput(inputs[0]) + ',' +
            this.compileInput(inputs[1]) +
            ',proc.blockReceiver(),null,null,null,proc,null)';
    // special command forms
    case 'doDeclareVariables':
        block = '';
        inputs[0].inputs().forEach(x => {
            block += this.gensymForVar(x.children[0].blockSpec, -1) + '=';
        });
        return block + '0';
    case 'reportGetVar':
        target = this.getGensym(block = block.blockSpec);
        if (target == null) {
            // redirect var to process
            return 'proc.getVarNamed("' + this.escape(block) + '")';
        }
        return target;
    case 'doSetVar':
        if (inputs[0] instanceof ArgMorph) {
            target = this.getGensym(inputs[0].evaluate());
            if (target != null) {
                return target + ' = ' + this.compileInput(inputs[1]);
            }
        }
        // redirect var to process
        return 'proc.setVarNamed(' +
            this.compileInput(inputs[0]) +
            ', ' +
            this.compileInput(inputs[1]) +
            ')';
    case 'doChangeVar':
        if (inputs[0] instanceof ArgMorph) {
            target = this.getGensym(inputs[0].evaluate());
            if (target != null) {
                return target + ' -=- ' + this.compileInput(inputs[1]);
            }
        }
        // redirect var to process
        return 'proc.incrementVarNamed(' +
            this.compileInput(inputs[0]) +
            ', ' +
            this.compileInput(inputs[1]) +
            ')';
    case 'doReport':
        return 'return ' + this.compileInput(inputs[0]);
    case 'doIf':
        return 'if (' +
            this.compileInput(inputs[0]) +
            ') {\n' +
            this.compileSequence(inputs[1].evaluate()) +
            '}' +
            this.compileElseIf(inputs[2]);
    case 'doIfElse':
        return 'if (' +
            this.compileInput(inputs[0]) +
            ') {\n' +
            this.compileSequence(inputs[1].evaluate()) +
            '} else {\n' +
            this.compileSequence(inputs[2].evaluate()) +
            '}';
    case 'doWarp':
        // synchronous javascript is already like warp
        return this.compileSequence(inputs[0].evaluate());
    case 'reportBoolean':
    case 'reportNewList':
        return this.compileInput(inputs[0]);
    case 'reportEnvironment':
        return 'func';
    default:
        target = this.process[selector] ? this.process
            : (this.source.receiver || this.process.receiver);
        args = this.compileInputs(inputs);
        if (isSnapObject(target)) {
            return 'proc.blockReceiver().' + selector + '(' + args + ')';
        } else {
            return 'proc.' + selector + '(' + args + ')';
        }
    }
};

JSCompiler.prototype.compileElseIf = function (multiArg) {
    return (multiArg.inputs().map((slot, i) => i % 2 === 0 ?
        ' else if (' + this.compileInput(slot) + ') '
        : '{\n' + this.compileSequence(slot.evaluate()) + '}'
    ).join(''));
};

JSCompiler.prototype.compileSequence = function (commandBlock) {
    if (commandBlock == null) return '';
    commandBlock = commandBlock.blockSequence();
    var l = commandBlock.length, i = 0, body = '';
    while (l > i) {
        body += this.compileExpression(commandBlock[i++]) + ';\n';
    }
    return body;
};

JSCompiler.prototype.compileInfix = function (operator, inputs) {
    return inputs.map(each =>
        this.compileInput(each)).join(' ' + operator + ' ');
};

JSCompiler.prototype.compileInputs = function (array) {
    var args = '';
    array.forEach(inp => {
        if (args) {
            args += ', ';
        }
        args += this.compileInput(inp);
    });
    return args;
};

JSCompiler.prototype.compileInput = function (inp) {
    var value, type;

    if (inp.isEmptySlot && inp.isEmptySlot()) {
        // implicit formal parameter
        if (this.implicitParams > 1) {
            if (this.paramCount < this.implicitParams) {
                return 'params[' + this.paramCount++ + ']';
            }
            throw new Error(
                localize('expecting') + ' ' + this.implicitParams + ' '
                    + localize('input(s), but getting') + ' '
                    + this.paramCount
            );
        }
        return 'params[0]';
    }
    if (inp instanceof RingMorph) {
        inp = inp.children;
        return new JSCompiler(this.process,this.scope).compileFunctionBody({
            'expression': inp[0].children[0],
            'inputs': inp[1].inputs().map(x => x.children[0].blockSpec),
            'receiver': this.source.receiver
        }, '');
    }
    if (inp instanceof MultiArgMorph) {
        return 'new List([' + this.compileInputs(inp.inputs()) + '])';
    }
    if (inp instanceof ArgLabelMorph) {
        return this.compileInput(inp.argMorph());
    }
    if (inp instanceof ArgMorph) {
        // literal - evaluate inline
        value = inp.evaluate();
        type = this.process.reportTypeOf(value);
        switch (type) {
        case 'number':
        case 'Boolean':
            return '' + value;
        case 'text':
            // escape and enclose in double quotes
            return '"' + this.escape(value) + '"';
        case 'list':
            return 'new List([' + this.compileInputs(value) + '])';
        default:
            if (value instanceof Array) {
                return '["' + this.escape(value[0]) + '"]';
            }
            throw new Error(
                'compiling does not yet support\n' +
                'inputs of type\n' +
                 type
            );
        }
    }
    if (inp instanceof BlockMorph) {
        return this.compileExpression(inp);
    }
    throw new Error(
        'compiling does not yet support\n' +
        'input slots of type\n' +
        inp.constructor.name
    );
};

JSCompiler.prototype.escape = string => {
    // make sure string is a string
    string += '';
    var len = string.length, i = 0, char, escaped = '', safe_chars =
        ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$' +
        "%&'()*+,-./:;<=>?@[]^_`{|}~";
    while (len > i) {
        char = string.charAt(i++);
        if (safe_chars.indexOf(char) === -1) {
            escaped += '\\u' + (char.charCodeAt(0) | 0x10000)
                .toString(16).substring(1);
        } else {
            escaped += char;
        }
    }
    return escaped;
};
