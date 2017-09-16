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
Process.prototype.timeout = 500; // msecs after which to force yield
Process.prototype.isCatchingErrors = true;
Process.prototype.enableLiveCoding = false; // experimental
Process.prototype.enableSingleStepping = false; // experimental
Process.prototype.flashTime = 0; // experimental

// Process.prototype.enableJS = false;

class Process {
    constructor(topBlock, receiver, onComplete, yieldFirst) {
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

    isRunning() {
        return (this.context !== null) && (!this.readyToTerminate);
    }

    // Process entry points

    runStep(deadline) {
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
    }

    stop() {
        this.readyToYield = true;
        this.readyToTerminate = true;
        this.errorFlag = false;
        if (this.context) {
            this.context.stopMusic();
        }
    }

    pause() {
        if (this.readyToTerminate) {
            return;
        }
        this.isPaused = true;
        this.flashPausedContext();
        if (this.context && this.context.startTime) {
            this.pauseOffset = Date.now() - this.context.startTime;
        }
    }

    resume() {
        if (!this.enableSingleStepping) {
            this.unflash();
        }
        this.isPaused = false;
        this.pauseOffset = null;
    }

    pauseStep() {
        this.lastYield = Date.now();
        if (this.context && this.context.startTime) {
            this.context.startTime = this.lastYield - this.pauseOffset;
        }
    }

    // Process evaluation

    evaluateContext() {
        const exp = this.context.expression;
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
            return this[exp](...this.context.inputs);
        }
        this.popContext(); // default: just ignore it
    }

    evaluateBlock(block, argCount) {
        const selector = block.selector;
        // check for special forms
        if (selector === 'reportOr' ||
                selector ===  'reportAnd' ||
                selector === 'doReport') {
            return this[selector](block);
        }

        // first evaluate all inputs, then apply the primitive
        let rcvr = this.context.receiver || this.receiver;

        const inputs = this.context.inputs;

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
                        rcvr[selector](...inputs)
                    );
                    this.popContext();
                } catch (error) {
                    this.handleError(error, block);
                }
            } else {
                this.returnValueToParentContext(
                    rcvr[selector](...inputs)
                );
                this.popContext();
            }
        }
    }

    // Process: Special Forms Blocks Primitives

    reportOr(block) {
        const inputs = this.context.inputs;

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
    }

    reportAnd(block) {
        const inputs = this.context.inputs;

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
    }

    doReport(block) {
        const outer = this.context.outerContext;
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
    }

    // Process: Non-Block evaluation

    evaluateMultiSlot(multiSlot, argCount) {
        // first evaluate all subslots, then return a list of their values
        const inputs = this.context.inputs;

        let ans;
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
    }

    evaluateArgLabel(argLabel) {
        // perform the ID function on an ArgLabelMorph element
        const inputs = this.context.inputs;
        if (inputs.length < 1) {
            this.evaluateNextInput(argLabel);
        } else {
            this.returnValueToParentContext(inputs[0]);
            this.popContext();
        }
    }

    evaluateInput(input) {
        // evaluate the input unless it is bound to an implicit parameter
        let ans;
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
    }

    evaluateSequence(arr) {
        const pc = this.context.pc;
        const outer = this.context.outerContext;
        const isCustomBlock = this.context.isCustomBlock;
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
    }

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

    evaluateNextInput(element) {
        const nxt = this.context.inputs.length; // for tail call elimination
        const args = element.inputs();
        const exp = args[nxt];
        const sel = this.context.expression.selector;
        const outer = this.context.outerContext;

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
    }

    doYield() {
        this.popContext();
        if (!this.isAtomic) {
            this.readyToYield = true;
        }
    }

    expectReport() {
        this.handleError(new Error("reporter didn't report"));
    }

    // Process Exception Handling

    handleError(error, element) {
        let m = element;
        this.stop();
        this.errorFlag = true;
        this.topBlock.addErrorHighlight();
        if (isNil(m) || isNil(m.world())) {m = this.topBlock; }
        m.showBubble(
            `${(m === element ? '' : 'Inside: ')
    + error.name}\n${error.message}`,
            this.exportResult,
            this.receiver
        );
    }

    errorObsolete() {
        throw new Error('a custom block definition is missing');
    }

    // Process Lambda primitives

    reify(topBlock, parameterNames, isCustomBlock) {
        const context = new Context(
                null,
                null,
                this.context ? this.context.outerContext : null
            );

        let i = 0;

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
    }

    reportScript(parameterNames, topBlock) {
        return this.reify(topBlock, parameterNames);
    }

    reifyScript(topBlock, parameterNames) {
        return this.reify(topBlock, parameterNames);
    }

    reifyReporter(topBlock, parameterNames) {
        return this.reify(topBlock, parameterNames);
    }

    reifyPredicate(topBlock, parameterNames) {
        return this.reify(topBlock, parameterNames);
    }

    reportJSFunction(parmNames, body) {
        return Function(...parmNames.asArray().concat([body]));
    }

    doRun(context, args) {
        return this.evaluate(context, args, true);
    }

    evaluate(context, args, isCommand) {
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
            throw new Error(`expecting a ring but getting ${context}`);
        }

        const outer = new Context(null, null, context.outerContext);
        const caller = this.context.parentContext;
        let exit;
        let runnable;
        const parms = args.asArray();
        let i;
        let value;

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
                        `${localize('expecting')} ${context.emptySlots} ${localize('input(s), but getting')} ${parms.length}`
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
    }

    fork(context, args) {
        const proc = new Process();
        const stage = this.homeContext.receiver.parentThatIsA(StageMorph);
        proc.initializeFor(context, args);
        // proc.pushContext('doYield');
        stage.threads.processes.push(proc);
    }

    initializeFor(context, args) {
        // used by Process.fork() and global invoke()
        if (context.isContinuation) {
            throw new Error(
                'continuations cannot be forked'
            );
        }
        if (!(context instanceof Context)) {
            throw new Error(`expecting a ring but getting ${context}`);
        }

        const outer = new Context(null, null, context.outerContext);

        const runnable = new Context(null,
            context.expression,
            outer
            );

        const parms = args.asArray();
        let i;
        let value;
        let exit;

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
                        `${localize('expecting')} ${context.emptySlots} ${localize('input(s), but getting')} ${parms.length}`
                    );
                }
            }
        }

        if (runnable.expression instanceof CommandBlockMorph) {
            runnable.expression = runnable.expression.blockSequence();

            // insert a tagged exit context
            // which "report" can catch later
            // needed for invoke() situations
            exit = new Context(
                runnable.parentContext,
                'expectReport',
                outer,
                outer.receiver
            );
            exit.tag = 'exit';
            runnable.parentContext = exit;
        }

        this.homeContext = new Context(); // context.outerContext;
        this.homeContext.receiver = context.outerContext.receiver;
        this.topBlock = context.expression;
        this.context = runnable;
    }

    // Process stopping blocks primitives

    doStopBlock() {
        const target = this.context.expression.exitTag;
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
    }

    doStopCustomBlock() {
        // fallback solution for "report" blocks inside
        // custom command definitions and untagged "stop" blocks
        while (this.context && !this.context.isCustomBlock) {
            if (this.context.expression === 'doStopWarping') {
                this.doStopWarping();
            } else {
                this.popContext();
            }
        }
    }

    // Process continuations primitives

    doCallCC(aContext, isReporter) {
        this.evaluate(
            aContext,
            new List([this.context.continuation()]),
            !isReporter
        );
    }

    reportCallCC(aContext) {
        this.doCallCC(aContext, true);
    }

    runContinuation(aContext, args) {
        const parms = args.asArray();

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
    }

    // Process custom block primitives

    evaluateCustomBlock() {
        const caller = this.context.parentContext;
        const block = this.context.expression;

        const method = block.isGlobal ? block.definition
                : this.blockReceiver().getMethod(block.blockSpec);

        const context = method.body;
        const declarations = method.declarations;
        const args = new List(this.context.inputs);
        const parms = args.asArray();
        let runnable;
        let exit;
        let i;
        let value;
        let outer;

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
    }

    // Process variables primitives

    doDeclareVariables(varNames) {
        const varFrame = this.context.outerContext.variables;
        varNames.asArray().forEach(name => {
            varFrame.addVar(name);
        });
    }

    doSetVar(varName, value) {
        const varFrame = this.context.variables;
        const name = varName;
        let rcvr;
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
    }

    doChangeVar(varName, value) {
        const varFrame = this.context.variables;
        const name = varName;

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
    }

    reportGetVar() {
        // assumes a getter block whose blockSpec is a variable name
        return this.context.variables.getVar(
            this.context.expression.blockSpec
        );
    }

    doShowVar(varName) {
        const varFrame = this.context.variables;
        let stage;
        let watcher;
        let target;
        let label;
        let others;
        let isGlobal;
        let name = varName;

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
                    morph => morph instanceof WatcherMorph
                        && morph.target === target
                        && morph.getter === name
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
                    label = `${name} ${localize('(temporary)')}`;
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
    }

    doHideVar(varName) {
        // if no varName is specified delete all watchers on temporaries
        const varFrame = this.context.variables;

        let stage;
        let watcher;
        let target;
        let name = varName;

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
                    morph => morph instanceof WatcherMorph
                        && morph.target === target
                        && morph.getter === name
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
    }

    doRemoveTemporaries() {
        let stage;
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
    }

    // Process hiding and showing primitives primitives :-)

    doChangePrimitiveVisibility(aBlock, hideIt) {
        const ide = this.homeContext.receiver.parentThatIsA(IDE_Morph);
        let dict;
        let cat;
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
    }

    // Process sprite inheritance primitives

    doDeleteAttr(attrName) {
        let name = attrName;
        const rcvr = this.blockReceiver();
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
    }

    // experimental message passing primitives

    doTellTo(sprite, context) {
        this.doRun(
            this.reportAttributeOf(context, sprite),
            new List()
        );
    }

    reportAskFor(sprite, context) {
        this.evaluate(
            this.reportAttributeOf(context, sprite),
            new List()
        );
    }

    // Process lists primitives

    reportNewList(elements) {
        return elements;
    }

    reportCONS(car, cdr) {
        this.assertType(cdr, 'list');
        return new List().cons(car, cdr);
    }

    reportCDR(list) {
        this.assertType(list, 'list');
        return list.cdr();
    }

    doAddToList(element, list) {
        this.assertType(list, 'list');
        if (list.type) {
            this.assertType(element, list.type);
        }
        list.add(element);
    }

    doDeleteFromList(index, list) {
        let idx = index;
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
    }

    doInsertInList(element, index, list) {
        let idx = index;
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
    }

    doReplaceInList(index, list, element) {
        let idx = index;
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
    }

    reportListItem(index, list) {
        let idx = index;
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
    }

    reportListLength(list) {
        this.assertType(list, 'list');
        return list.length();
    }

    reportListContainsItem(list, element) {
        this.assertType(list, 'list');
        return list.contains(element);
    }

    doShowTable(list) {
        // experimental
        this.assertType(list, 'list');
        new TableDialogMorph(list).popUp(this.blockReceiver().world());
    }

    // Process conditionals primitives

    doIf() {
        const args = this.context.inputs;

        const // for tail call elimination
        outer = this.context.outerContext;

        const isCustomBlock = this.context.isCustomBlock;

        this.popContext();
        if (args[0]) {
            if (args[1]) {
                this.pushContext(args[1].blockSequence(), outer);
                this.context.isCustomBlock = isCustomBlock;
            }
        }
        this.pushContext();
    }

    doIfElse() {
        const args = this.context.inputs;

        const // for tail call elimination
        outer = this.context.outerContext;

        const isCustomBlock = this.context.isCustomBlock;

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
    }

    // Process process related primitives

    doStop() {
        this.stop();
    }

    doStopAll() {
        let stage;
        let ide;
        if (this.homeContext.receiver) {
            stage = this.homeContext.receiver.parentThatIsA(StageMorph);
            if (stage) {
                stage.threads.resumeAll(stage);
                stage.keysPressed = {};
                stage.threads.stopAll();
                stage.stopAllActiveSounds();
                stage.children.forEach(morph => {
                    if (morph.stopTalking) {
                        morph.stopTalking();
                    }
                });
                stage.removeAllClones();
            }
            ide = stage.parentThatIsA(IDE_Morph);
            if (ide) {ide.controlBar.pauseButton.refresh(); }
        }
    }

    doStopThis(choice) {
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
    }

    doStopOthers(choice) {
        let stage;
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
    }

    doWarp(body) {
        // execute my contents block atomically (more or less)
        const // for tail call elimination
        outer = this.context.outerContext;

        const isCustomBlock = this.context.isCustomBlock;
        let stage;

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
    }

    doStopWarping() {
        let stage;
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
    }

    reportIsFastTracking() {
        let ide;
        if (this.homeContext.receiver) {
            ide = this.homeContext.receiver.parentThatIsA(IDE_Morph);
            if (ide) {
                return ide.stage.isFastTracked;
            }
        }
        return false;
    }

    doSetFastTracking(bool) {
        let ide;
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
    }

    doPauseAll() {
        let stage;
        let ide;
        if (this.homeContext.receiver) {
            stage = this.homeContext.receiver.parentThatIsA(StageMorph);
            if (stage) {
                stage.threads.pauseAll(stage);
            }
            ide = stage.parentThatIsA(IDE_Morph);
            if (ide) {ide.controlBar.pauseButton.refresh(); }
        }
    }

    // Process loop primitives

    doForever(body) {
        this.context.inputs = []; // force re-evaluation of C-slot
        this.pushContext('doYield');
        if (body) {
            this.pushContext(body.blockSequence());
        }
        this.pushContext();
    }

    doRepeat(counter, body) {
        const block = this.context.expression;

        const // for tail call elimination
        outer = this.context.outerContext;

        const isCustomBlock = this.context.isCustomBlock;

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
    }

    doUntil(goalCondition, body) {
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
    }

    doWaitUntil(goalCondition) {
        if (goalCondition) {
            this.popContext();
            this.pushContext('doYield');
            return null;
        }
        this.context.inputs = [];
        this.pushContext('doYield');
        this.pushContext();
    }

    reportMap(reporter, list) {
        // answer a new list containing the results of the reporter applied
        // to each value of the given list. Distinguish between linked and
        // arrayed lists.
        // Note: This method utilizes the current context's inputs array to
        // manage temporary variables, whose allocation to which slot are
        // documented in each of the variants' code (linked or arrayed) below

        let next;
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
    }

    doForEach(upvar, list, script) {
        // perform a script for each element of a list, assigning the
        // current iteration's element to a variable with the name
        // specified in the "upvar" parameter, so it can be referenced
        // within the script. Uses the context's - unused - fourth
        // element as temporary storage for the current list index

        if (isNil(this.context.inputs[3])) {this.context.inputs[3] = 1; }
        const index = this.context.inputs[3];
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
    }

    // Process interpolated primitives

    doWait(secs) {
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
    }

    doGlide(secs, endX, endY) {
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
    }

    doSayFor(data, secs) {
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
    }

    doThinkFor(data, secs) {
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
    }

    blockReceiver() {
        return this.context ? this.context.receiver || this.homeContext.receiver
                : this.homeContext.receiver || this.receiver;
    }

    // Process sound primitives (interpolated)

    doPlaySoundUntilDone(name) {
        const sprite = this.blockReceiver();
        if (this.context.activeAudio === null) {
            this.context.activeAudio = sprite.playSound(name);
        }
        if (this.context.activeAudio.ended
                || this.context.activeAudio.terminated) {
            return null;
        }
        this.pushContext('doYield');
        this.pushContext();
    }

    doStopAllSounds() {
        const stage = this.homeContext.receiver.parentThatIsA(StageMorph);
        if (stage) {
            stage.threads.processes.forEach(thread => {
                if (thread.context) {
                    thread.context.stopMusic();
                    if (thread.context.activeAudio) {
                        thread.popContext();
                    }
                }
            });
            stage.stopAllActiveSounds();
        }
    }

    // Process user prompting primitives (interpolated)

    doAsk(data) {
        const stage = this.homeContext.receiver.parentThatIsA(StageMorph);
        const rcvr = this.blockReceiver();
        const isStage = rcvr instanceof StageMorph;
        const isHiddenSprite = rcvr instanceof SpriteMorph && !rcvr.isVisible;
        let activePrompter;

        stage.keysPressed = {};
        if (!this.prompter) {
            activePrompter = detect(
                stage.children,
                morph => morph instanceof StagePrompterMorph
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
    }

    reportLastAnswer() {
        return this.homeContext.receiver.parentThatIsA(StageMorph).lastAnswer;
    }

    // Process URI retrieval (interpolated)

    reportURL(url) {
        let response;
        if (!this.httpRequest) {
            // use the location protocol unless the user specifies otherwise
            if (!url.includes('//')) {
                if (location.protocol === 'file:') {
                    // allow requests from locally loaded sources
                    url = `https://${url}`;
                } else {
                    url = `${location.protocol}//${url}`;
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
    }

    // Process event messages primitives

    doBroadcast(message) {
        // messages are user-defined events, and by default global, same as in
        // Scratch. An experimental feature, messages can be sent to a single
        // sprite or to a list of sprites by using a 2-item list in the message
        // slot, where the first slot is a message text, and the second slot
        // its recipient(s), identified either by a single name or sprite, or by
        // a list of names or sprites (can be a heterogeneous list).

        const stage = this.homeContext.receiver.parentThatIsA(StageMorph);

        let thisObj;
        let msg = message;
        let trg;
        let rcvrs;
        const myself = this;
        const procs = [];

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
                rcvrs = trg.itemsArray().map(each => myself.getOtherObject(each, thisObj, stage));
            } else {
                return; // abort
            }
        } else { // global
            rcvrs = stage.children.concat(stage);
        }
        if (msg !== '') {
            stage.lastMessage = message; // the actual data structure
            rcvrs.forEach(morph => {
                if (isSnapObject(morph)) {
                    morph.allHatBlocksFor(msg).forEach(block => {
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
    }

    doBroadcastAndWait(message) {
        if (!this.context.activeSends) {
            this.context.activeSends = this.doBroadcast(message);
        }
        this.context.activeSends = this.context.activeSends.filter(
            proc => proc.isRunning()
        );
        if (this.context.activeSends.length === 0) {
            return null;
        }
        this.pushContext('doYield');
        this.pushContext();
    }

    getLastMessage() {
        let stage;
        if (this.homeContext.receiver) {
            stage = this.homeContext.receiver.parentThatIsA(StageMorph);
            if (stage) {
                return stage.getLastMessage();
            }
        }
        return '';
    }

    // Process type inference

    reportIsA(thing, typeString) {
        return this.reportTypeOf(thing) === this.inputOption(typeString);
    }

    assertType(thing, typeString) {
        // make sure "thing" is a particular type or any of a number of types
        // and raise an error if not
        // use responsibly wrt performance implications
        const thingType = this.reportTypeOf(thing);
        if (thingType === typeString) {return true; }
        if (typeString instanceof Array && contains(typeString, thingType)) {
            return true;
        }
        throw new Error(`expecting ${typeString} but getting ${thingType}`);
    }

    assertAlive(thing) {
        if (thing && thing.isCorpse) {
            throw new Error('cannot operate on a deleted sprite');
        }
    }

    reportTypeOf(thing) {
        // answer a string denoting the argument's type
        let exp;
        if (thing === null || (thing === undefined)) {
            return 'nothing';
        }
        if (thing === true || (thing === false)) {
            return 'Boolean';
        }
        if (!isNaN(+thing)) {
            return 'number';
        }
        if (isString(thing)) {
            return 'text';
        }
        if (thing instanceof List) {
            return 'list';
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
    }

    // Process math primtives

    reportSum(a, b) {
        return +a + (+b);
    }

    reportDifference(a, b) {
        return +a - +b;
    }

    reportProduct(a, b) {
        return +a * +b;
    }

    reportQuotient(a, b) {
        return +a / +b;
    }

    reportModulus(a, b) {
        const x = +a;
        const y = +b;
        return ((x % y) + y) % y;
    }

    reportRandom(min, max) {
        const floor = +min;
        const ceil = +max;
        if ((floor % 1 !== 0) || (ceil % 1 !== 0)) {
            return Math.random() * (ceil - floor) + floor;
        }
        return Math.floor(Math.random() * (ceil - floor + 1)) + floor;
    }

    reportLessThan(a, b) {
        let x = +a;
        let y = +b;
        if (isNaN(x) || isNaN(y)) {
            x = a;
            y = b;
        }
        return x < y;
    }

    reportNot(bool) {
        return !bool;
    }

    reportGreaterThan(a, b) {
        let x = +a;
        let y = +b;
        if (isNaN(x) || isNaN(y)) {
            x = a;
            y = b;
        }
        return x > y;
    }

    reportEquals(a, b) {
        return snapEquals(a, b);
    }

    reportIsIdentical(a, b) {
        const tag = 'idTag';
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
    }

    isImmutable(obj) {
        // private
        const type = this.reportTypeOf(obj);
        return type === 'nothing' ||
            type === 'Boolean' ||
            type === 'text' ||
            type === 'number' ||
            type === 'undefined';
    }

    reportBoolean(bool) {
        return bool;
    }

    reportRound(n) {
        return Math.round(+n);
    }

    reportMonadic(fname, n) {
        const x = +n;
        let result = 0;

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
            result = 10 ** x;
            break;
        default:
            nop();
        }
        return result;
    }

    reportTextFunction(fname, string) {
        const x = (isNil(string) ? '' : string).toString();
        let result = '';

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
    }

    reportJoin(a, b) {
        const x = (isNil(a) ? '' : a).toString();
        const y = (isNil(b) ? '' : b).toString();
        return x.concat(y);
    }

    reportJoinWords(aList) {
        if (aList instanceof List) {
            return aList.asText();
        }
        return (aList || '').toString();
    }

    // Process string ops

    reportLetter(idx, string) {
        if (string instanceof List) { // catch a common user error
            return '';
        }
        const i = +(idx || 0);
        const str = isNil(string) ? '' : string.toString();
        return str[i - 1] || '';
    }

    reportStringSize(data) {
        if (data instanceof List) { // catch a common user error
            return data.length();
        }

        return isNil(data) ? 0 : data.toString().length;
    }

    reportUnicode(string) {
        const str = (string || '').toString()[0];
        return str ? str.charCodeAt(0) : 0;
    }

    reportUnicodeAsLetter(num) {
        const code = +(num || 0);
        return String.fromCharCode(code);
    }

    reportTextSplit(string, delimiter) {
        const types = ['text', 'number'];
        const strType = this.reportTypeOf(string);
        const delType = this.reportTypeOf(this.inputOption(delimiter));
        let str;
        let del;
        if (!contains(types, strType)) {
            throw new Error(`expecting text instead of a ${strType}`);
        }
        if (!contains(types, delType)) {
            throw new Error(`expecting a text delimiter instead of a ${delType}`);
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
    }

    parseCSV(string) {
        // parse a single row of CSV data into a one-dimensional list
        // this assumes that the whole csv data has already been split
        // by lines.
        // taken from:
        // https://stackoverflow.com/questions/8493195/how-can-i-parse-a-csv-string-with-javascript-which-contains-comma-in-data

        const re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;

        const re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
        const a = [];

        if (!re_valid.test(string)) {
            return new List();
        }
        string.replace(
            re_value,
            (m0, m1, m2, m3) => {
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
    }

    // Process debugging

    alert(data) {
        // debugging primitives only work in dev mode, otherwise they're nop
        let world;
        if (this.homeContext.receiver) {
            world = this.homeContext.receiver.world();
            if (world.isDevMode) {
                alert(`Snap! ${data.asArray()}`);
            }
        }
    }

    log(data) {
        // debugging primitives only work in dev mode, otherwise they're nop
        let world;
        if (this.homeContext.receiver) {
            world = this.homeContext.receiver.world();
            if (world.isDevMode) {
                console.log(`Snap! ${data.asArray()}`);
            }
        }
    }

    // Process motion primitives

    getOtherObject(name, thisObj, stageObj) {
        // private, find the sprite indicated by the given name
        // either onstage or in the World's hand

        // experimental: deal with first-class sprites
        if (isSnapObject(name)) {
            return name;
        }

        const stage = isNil(stageObj) ?
                    thisObj.parentThatIsA(StageMorph) : stageObj;

        let thatObj = null;

        if (stage) {
            // find the corresponding sprite on the stage
            thatObj = detect(
                stage.children,
                morph => morph.name === name
            );
            if (!thatObj) {
                // check if the sprite in question is currently being
                // dragged around
                thatObj = detect(
                    stage.world().hand.children,
                    morph => morph instanceof SpriteMorph
                        && morph.name === name
                );
            }
        }
        return thatObj;
    }

    getObjectsNamed(name, thisObj, stageObj) {
        // private, find all sprites and their clones indicated
        // by the given name either onstage or in the World's hand

        const stage = isNil(stageObj) ?
                    thisObj.parentThatIsA(StageMorph) : stageObj;

        let those = [];

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
    }

    doFaceTowards(name) {
        const thisObj = this.blockReceiver();
        let thatObj;

        if (thisObj) {
            if (this.inputOption(name) === 'mouse-pointer') {
                thisObj.faceToXY(this.reportMouseX(), this.reportMouseY());
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
    }

    doGotoObject(name) {
        const thisObj = this.blockReceiver();
        let thatObj;

        if (thisObj) {
            if (this.inputOption(name) === 'mouse-pointer') {
                thisObj.gotoXY(this.reportMouseX(), this.reportMouseY());
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
    }

    // Process temporary cloning (Scratch-style)

    createClone(name) {
        const thisObj = this.blockReceiver();
        let thatObj;

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
    }

    newClone(name) {
        const thisObj = this.blockReceiver();
        let thatObj;

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
    }

    // Process sensing primitives

    reportTouchingObject(name) {
        const thisObj = this.blockReceiver();

        if (thisObj) {
            return this.objectTouchingObject(thisObj, name);
        }
        return false;
    }

    objectTouchingObject(thisObj, name) {
        // helper function for reportTouchingObject()
        // also check for temparary clones, as in Scratch 2.0,
        // and for any parts (subsprites)
        const myself = this;

        let those;
        let stage;
        let box;
        let mouse;

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
                if (those.some(any => thisObj.isTouching(any))) {
                    return true;
                }
            }
        }
        return thisObj.parts.some(
            any => myself.objectTouchingObject(any, name)
        );
    }

    reportTouchingColor(aColor) {
        // also check for any parts (subsprites)
        const thisObj = this.blockReceiver();

        let stage;

        if (thisObj) {
            stage = thisObj.parentThatIsA(StageMorph);
            if (stage) {
                if (thisObj.isTouching(stage.colorFiltered(aColor, thisObj))) {
                    return true;
                }
                return thisObj.parts.some(
                    any => any.isTouching(stage.colorFiltered(aColor, any))
                );
            }
        }
        return false;
    }

    reportColorIsTouchingColor(color1, color2) {
        // also check for any parts (subsprites)
        const thisObj = this.blockReceiver();

        let stage;

        if (thisObj) {
            stage = thisObj.parentThatIsA(StageMorph);
            if (stage) {
                if (thisObj.colorFiltered(color1).isTouching(
                        stage.colorFiltered(color2, thisObj)
                    )) {
                    return true;
                }
                return thisObj.parts.some(
                    any => any.colorFiltered(color1).isTouching(
                        stage.colorFiltered(color2, any)
                    )
                );
            }
        }
        return false;
    }

    reportDistanceTo(name) {
        const thisObj = this.blockReceiver();
        let thatObj;
        let stage;
        let rc;
        let point;

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
    }

    reportAttributeOf(attribute, name) {
        const thisObj = this.blockReceiver();
        let thatObj;
        let stage;

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
    }

    reportGet(query) {
        // experimental, answer a reference to a first-class member
        // or a list of first-class members
        const thisObj = this.blockReceiver();

        let neighborhood;
        let stage;
        let objName;

        if (thisObj) {
            switch (this.inputOption(query)) {
            case 'self' :
                return thisObj;
            case 'other sprites':
                stage = thisObj.parentThatIsA(StageMorph);
                return new List(
                    stage.children.filter(each => each instanceof SpriteMorph &&
                        each !== thisObj)
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
                    stage.children.filter(each => each.isTemporary &&
                        (each !== thisObj) &&
                        (each.cloneOriginName === objName))
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
                    stage.children.filter(each => each instanceof SpriteMorph &&
                        (each !== thisObj) &&
                        each.bounds.intersects(neighborhood))
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
    }

    doSet(attribute, value) {
        // experimental, manipulate sprites' attributes
        let name;

        let rcvr;
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
                `"${localize(name)}" ${localize('is read-only')}`
            );
        }
    }

    reportContextFor(context, otherObj) {
        // Private - return a copy of the context
        // and bind it to another receiver
        const result = copy(context);
        result.receiver = otherObj;
        if (result.outerContext) {
            result.outerContext = copy(result.outerContext);
            result.outerContext.variables = copy(result.outerContext.variables);
            result.outerContext.receiver = otherObj;
            result.outerContext.variables.parentFrame = otherObj.variables;
        }
        return result;
    }

    reportMouseX() {
        let stage;
        let world;
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
    }

    reportMouseY() {
        let stage;
        let world;
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
    }

    reportMouseDown() {
        let world;
        if (this.homeContext.receiver) {
            world = this.homeContext.receiver.world();
            if (world) {
                return world.hand.mouseButton === 'left';
            }
        }
        return false;
    }

    reportKeyPressed(keyString) {
        let stage;
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
    }

    doResetTimer() {
        let stage;
        if (this.homeContext.receiver) {
            stage = this.homeContext.receiver.parentThatIsA(StageMorph);
            if (stage) {
                stage.resetTimer();
            }
        }
    }

    reportTimer() {
        let stage;
        if (this.homeContext.receiver) {
            stage = this.homeContext.receiver.parentThatIsA(StageMorph);
            if (stage) {
                return stage.getTimer();
            }
        }
        return 0;
    }

    // Process Dates and times in Snap
    reportDate(datefn) {
        let currDate;
        let func;
        let result;
        const inputFn = this.inputOption(datefn);

        const // Map block options to built-in functions
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
    }

    // Process code mapping

    /*
        for generating textual source code using
        blocks - not needed to run or debug Snap
    */

    doMapCodeOrHeader(aContext, anOption, aString) {
        if (this.inputOption(anOption) === 'code') {
            return this.doMapCode(aContext, aString);
        }
        if (this.inputOption(anOption) === 'header') {
            return this.doMapHeader(aContext, aString);
        }
        throw new Error(
            ` '${anOption}'\nis not a valid option`
        );
    }

    doMapHeader(aContext, aString) {
        if (aContext instanceof Context) {
            if (aContext.expression instanceof SyntaxElementMorph) {
                return aContext.expression.mapHeader(aString || '');
            }
        }
    }

    doMapCode(aContext, aString) {
        if (aContext instanceof Context) {
            if (aContext.expression instanceof SyntaxElementMorph) {
                return aContext.expression.mapCode(aString || '');
            }
        }
    }

    doMapValueCode(type, aString) {
        const tp = this.inputOption(type);
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
                `${localize('unsupported data type')} ${tp}`
            );
        }

    }

    doMapListCode(part, kind, aString) {
        let key1 = '';
        let key2 = 'delim';

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
    }

    reportMappedCode(aContext) {
        if (aContext instanceof Context) {
            if (aContext.expression instanceof SyntaxElementMorph) {
                return aContext.expression.mappedCode();
            }
        }
        return '';
    }

    // Process music primitives

    doRest(beats) {
        const tempo = this.reportTempo();
        this.doWait(60 / tempo * beats);
    }

    reportTempo() {
        let stage;
        if (this.homeContext.receiver) {
            stage = this.homeContext.receiver.parentThatIsA(StageMorph);
            if (stage) {
                return stage.getTempo();
            }
        }
        return 0;
    }

    doChangeTempo(delta) {
        let stage;
        if (this.homeContext.receiver) {
            stage = this.homeContext.receiver.parentThatIsA(StageMorph);
            if (stage) {
                stage.changeTempo(delta);
            }
        }
    }

    doSetTempo(bpm) {
        let stage;
        if (this.homeContext.receiver) {
            stage = this.homeContext.receiver.parentThatIsA(StageMorph);
            if (stage) {
                stage.setTempo(bpm);
            }
        }
    }

    doPlayNote(pitch, beats) {
        const tempo = this.reportTempo();
        this.doPlayNoteForSecs(
            parseFloat(pitch || '0'),
            60 / tempo * parseFloat(beats || '0')
        );
    }

    doPlayNoteForSecs(pitch, secs) {
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
    }

    doSetInstrument(num) {
        this.instrument = +num;
        this.receiver.instrument = +num;
    }

    // Process constant input options

    inputOption(dta) {
        // private - for localization
        return dta instanceof Array ? dta[0] : dta;
    }

    // Process stack

    pushContext(expression, outerContext) {
        this.context = new Context(
            this.context,
            expression,
            outerContext || (this.context ? this.context.outerContext : null),
                // for tail call elimination
            this.context ? // check needed due to tail call elimination
                    this.context.receiver : this.homeContext.receiver
        );
    }

    popContext() {
        if (this.context) {
            this.context.stopMusic();
        }
        this.context = this.context ? this.context.parentContext : null;
    }

    returnValueToParentContext(value) {
        // if no parent context exists treat value as result
        if (value !== undefined) {
            const target = this.context ? // in case of tail call elimination
                    this.context.parentContext || this.homeContext
                : this.homeContext;
            target.addInput(value);
        }
    }

    reportStackSize() {
        return this.context ? this.context.stackSize() : 0;
    }

    reportFrameCount() {
        return this.frameCount;
    }

    // Process single-stepping

    flashContext() {
        const expr = this.context.expression;
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
    }

    flashPausedContext() {
        const flashable = this.context ? this.context.lastFlashable() : null;
        if (flashable) {
            this.unflash();
            flashable.expression.flash();
            flashable.isFlashing = true;
            this.flashingContext = flashable;
        }
    }

    doInterrupt() {
        this.popContext();
        if (!this.isAtomic) {
            this.isInterrupted = true;
        }
    }

    doIdle(secs) {
        if (!this.context.startTime) {
            this.context.startTime = Date.now();
        }
        if ((Date.now() - this.context.startTime) < (secs * 1000)) {
            this.pushContext('doInterrupt');
            return;
        }
        this.popContext();
    }

    unflash() {
        if (this.flashingContext) {
            this.flashingContext.expression.unflash();
            this.flashingContext.isFlashing = false;
            this.flashingContext = null;
        }
    }
}

