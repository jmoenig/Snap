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
    isCustomBlock   marker for return ops
    emptySlots      caches the number of empty slots for reification
    tag             string or number to optionally identify the Context,
                    as a "return" target (for the "stop block" primitive)
    isFlashing      flag for single-stepping
*/

export default class Context {
    constructor(parentContext, expression, outerContext, receiver) {
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
        this.activeAudio = null;
        this.activeNote = null;
        this.isCustomBlock = false; // marks the end of a custom block's stack
        this.emptySlots = 0; // used for block reification
        this.tag = null;  // lexical catch-tag for custom blocks
        this.isFlashing = false; // for single-stepping
    }

    toString() {
        let expr = this.expression;
        if (expr instanceof Array) {
            if (expr.length > 0) {
                expr = `[${expr[0]}]`;
            }
        }
        return `Context >> ${expr} ${this.variables}`;
    }

    image() {
        const ring = new RingMorph();
        let block;
        let cont;

        if (this.expression instanceof Morph) {
            block = this.expression.fullCopy();

            // replace marked call/cc block with empty slot
            if (this.isContinuation) {
                cont = detect(block.allInputs(), inp => inp.bindingID === 1);
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
            this.inputs.forEach(inp => {
                ring.parts()[1].addInput(inp);
            });
        }
        return ring.fullImage();
    }

    // Context continuations:

    continuation() {
        let cont;
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
    }

    copyForContinuation() {
        const cpy = copy(this);
        let cur = cpy;

        const isReporter = !(this.expression instanceof Array ||
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
    }

    copyForContinuationCall() {
        const cpy = copy(this);
        let cur = cpy;

        const isReporter = !(this.expression instanceof Array ||
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
    }

    prepareContinuationForBinding() {
        const pos = this.inputs.length;
        let slot;
        this.expression = this.expression.fullCopy();
        slot = this.expression.inputs()[pos];
        if (slot) {
            this.inputs = [];
            // mark slot containing the call/cc reporter with an identifier
            slot.bindingID = 1;
            // and remember the number of detected empty slots
            this.emptySlots = 1;
        }
    }

    // Context accessing:

    addInput(input) {
        this.inputs.push(input);
    }

    // Context music

    stopMusic() {
        if (this.activeNote) {
            this.activeNote.stop();
            this.activeNote = null;
        }
    }

    // Context single-stepping:

    lastFlashable() {
        // for experimental single-stepping when pausing
        if (this.expression instanceof SyntaxElementMorph &&
                !(this.expression instanceof CommandSlotMorph)) {
            return this;
        } else if (this.parentContext) {
            return this.parentContext.lastFlashable();
        }
        return null;
    }

    // Context debugging

    stackSize() {
        if (!this.parentContext) {
            return 1;
        }
        return 1 + this.parentContext.stackSize();
    }
}