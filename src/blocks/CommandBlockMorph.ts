// CommandBlockMorph ///////////////////////////////////////////////////

/*
    I am a stackable jigsaw-shaped block.

    I inherit from BlockMorph adding the following most important
    public accessors:

        nextBlock()       - set / get the block attached to my bottom
        bottomBlock()     - answer the bottom block of my stack
        blockSequence()   - answer an array of blocks starting with myself

    and the following "lexical awareness" indicators:

        partOfCustomCommand - temporary bool set by the evaluator
        exitTag           - temporary string or number set by the evaluator
*/

import BlockMorph from "./BlockMorph";

// CommandBlockMorph instance creation:

export default class CommandBlockMorph extends BlockMorph {
    constructor() {
        this.init();
    }

    init(silently) {
        super.init.call(this, silently);
        this.setExtent(new Point(200, 100), silently);
        this.partOfCustomCommand = false;
        this.exitTag = null;
        // this.cachedNextBlock = null; // don't serialize
    }

    // CommandBlockMorph enumerating:

    blockSequence() {
        const nb = this.nextBlock();
        let result = [this];
        if (nb) {
            result = result.concat(nb.blockSequence());
        }
        return result;
    }

    bottomBlock() {
        // topBlock() also exists - inherited from SyntaxElementMorph
        if (this.nextBlock()) {
            return this.nextBlock().bottomBlock();
        }
        return this;
    }

    nextBlock(block) {
        // set / get the block attached to my bottom
        if (block) {
            const nb = this.nextBlock();
            const affected = this.parentThatIsA(CommandSlotMorph);
            this.add(block);
            // this.cachedNextBlock = block;
            if (nb) {
                block.bottomBlock().nextBlock(nb);
            }
            block.setPosition(
                new Point(
                    this.left(),
                    this.bottom() - (this.corner)
                )
            );
            if (affected) {
                affected.fixLayout();
            }
        } else {
            /* cachedNextBlock - has issues, disabled for now
            if (!this.cachedNextBlock) {
                this.cachedNextBlock = detect(
                    this.children,
                    function (child) {
                        return child instanceof CommandBlockMorph
                            && !child.isPrototype;
                    }
                );
            }
            return this.cachedNextBlock;
            */
            return detect(
                this.children,
                child => child instanceof CommandBlockMorph
                    && !child.isPrototype
            );
        }
    }

    // CommandBlockMorph attach targets:

    topAttachPoint() {
        return new Point(
            this.dentCenter(),
            this.top()
        );
    }

    bottomAttachPoint() {
        return new Point(
            this.dentCenter(),
            this.bottom()
        );
    }

    wrapAttachPoint() {
        const cslot = detect( // could be a method making uses of caching...
            this.inputs(), // ... although these already are cached
            each => each instanceof CSlotMorph
        );
        if (cslot && !cslot.nestedBlock()) {
            return new Point(
                cslot.left() + (cslot.inset * 2) + cslot.corner,
                cslot.top() + (cslot.corner * 2)
            );
        }
        return null;
    }

    dentLeft() {
        return this.left()
            + this.corner
            + this.inset;
    }

    dentCenter() {
        return this.dentLeft()
            + this.corner
            + (this.dent * 0.5);
    }

    attachTargets() {
        const answer = [];
        let tp;
        if (!(this instanceof HatBlockMorph)) {
            tp = this.topAttachPoint();
            if (!(this.parent instanceof SyntaxElementMorph)) {
                answer.push({
                    point: tp,
                    element: this,
                    loc: 'top',
                    type: 'block'
                });
            }
            if (ScriptsMorph.prototype.enableNestedAutoWrapping ||
                    !this.parentThatIsA(CommandSlotMorph)) {
                answer.push({
                    point: tp,
                    element: this,
                    loc: 'wrap',
                    type: 'block'
                });
            }
        }
        if (!this.isStop()) {
            answer.push({
                point: this.bottomAttachPoint(),
                element: this,
                loc: 'bottom',
                type: 'block'
            });
        }
        return answer;
    }

    allAttachTargets(newParent) {
        const myself = this;
        const target = newParent || this.parent;
        const answer = [];
        let topBlocks;

        if (this instanceof HatBlockMorph && newParent.rejectsHats) {
            return answer;
        }
        topBlocks = target.children.filter(child => (child !== myself) &&
            child instanceof SyntaxElementMorph &&
            !child.isTemplate);
        topBlocks.forEach(block => {
            block.forAllChildren(child => {
                if (child.attachTargets) {
                    child.attachTargets().forEach(at => {
                        answer.push(at);
                    });
                }
            });
        });
        return answer;
    }

    closestAttachTarget(newParent) {
        const target = newParent || this.parent;
        const bottomBlock = this.bottomBlock();
        let answer = null;

        const thresh = Math.max(
            this.corner * 2 + this.dent,
            this.minSnapDistance
        );

        let dist;
        const ref = [];
        let minDist = 1000;
        let wrap;

        if (!(this instanceof HatBlockMorph)) {
            ref.push(
                {
                    point: this.topAttachPoint(),
                    loc: 'top'
                }
            );
            wrap = this.wrapAttachPoint();
            if (wrap) {
                ref.push(
                    {
                        point: wrap,
                        loc: 'wrap'
                    }
                );
            }
        }
        if (!bottomBlock.isStop()) {
            ref.push(
                {
                    point: bottomBlock.bottomAttachPoint(),
                    loc: 'bottom'
                }
            );
        }
        this.allAttachTargets(target).forEach(eachTarget => {
            ref.forEach(eachRef => {
                // match: either both locs are 'wrap' or both are different,
                // none being 'wrap' (can this be expressed any better?)
                if ((eachRef.loc === 'wrap' && (eachTarget.loc === 'wrap')) ||
                    ((eachRef.loc !== eachTarget.loc) &&
                        (eachRef.loc !== 'wrap') && (eachTarget.loc !== 'wrap'))
                ) {
                    dist = eachRef.point.distanceTo(eachTarget.point);
                    if ((dist < thresh) && (dist < minDist)) {
                        minDist = dist;
                        answer = eachTarget;
                    }
                }
            });
        });
        return answer;
    }

    snap(hand) {
        const target = this.closestAttachTarget();
        const scripts = this.parentThatIsA(ScriptsMorph);
        let before;
        let next;
        let offsetY;
        let cslot;
        let affected;

        scripts.clearDropInfo();
        scripts.lastDroppedBlock = this;
        if (target === null) {
            this.startLayout();
            this.fixBlockColor();
            this.endLayout();
            super.snap.call(this); // align stuck comments
            if (hand) {
                scripts.recordDrop(hand.grabOrigin);
            }
            return;
        }

        scripts.lastDropTarget = target;

        this.startLayout();
        if (target.loc === 'bottom') {
            if (target.type === 'slot') {
                this.removeHighlight();
                scripts.lastNextBlock = target.element.nestedBlock();
                target.element.nestedBlock(this);
            } else {
                scripts.lastNextBlock = target.element.nextBlock();
                target.element.nextBlock(this);
            }
            if (this.isStop()) {
                next = this.nextBlock();
                if (next) {
                    scripts.add(next);
                    next.moveBy(this.extent().floorDivideBy(2));
                    affected = this.parentThatIsA(CommandSlotMorph);
                    if (affected) {
                        affected.fixLayout();
                    }
                }
            }
        } else if (target.loc === 'top') {
            target.element.removeHighlight();
            offsetY = this.bottomBlock().bottom() - this.bottom();
            this.setBottom(target.element.top() + this.corner - offsetY);
            this.setLeft(target.element.left());
            this.bottomBlock().nextBlock(target.element);
        } else if (target.loc === 'wrap') {
            cslot = detect( // this should be a method making use of caching
                this.inputs(), // these are already cached, so maybe it's okay
                each => each instanceof CSlotMorph
            );
            // assume the cslot is (still) empty, was checked determining the target
            before = (target.element.parent);
            scripts.lastWrapParent = before;

            // adjust position of wrapping block
            this.moveBy(target.point.subtract(cslot.slotAttachPoint()));

            // wrap c-slot around target
            cslot.nestedBlock(target.element);
            if (before instanceof CommandBlockMorph) {
                before.nextBlock(this);
            } else if (before instanceof CommandSlotMorph) {
                before.nestedBlock(this);
            }

            // fix zebra coloring.
            // this could probably be generalized into the fixBlockColor mechanism
            target.element.blockSequence().forEach(
                cmd => {cmd.fixBlockColor(); }
            );
        }
        this.fixBlockColor();
        this.endLayout();
        super.snap.call(this); // align stuck comments
        if (hand) {
            scripts.recordDrop(hand.grabOrigin);
        }
        if (this.snapSound) {
            this.snapSound.play();
        }
    }

    isStop() {
        return ([
            'doStopThis',
            'doStop',
            'doStopBlock',
            'doStopAll',
            'doForever',
            'doReport',
            'removeClone'
        ].includes(this.selector));
    }

    // CommandBlockMorph deleting

    userDestroy() {
        const target = this.selectForEdit(); // enable copy-on-edit
        if (target !== this) {
            return this.userDestroy.call(target);
        }
        if (this.nextBlock()) {
            this.userDestroyJustThis();
            return;
        }

        const scripts = this.parentThatIsA(ScriptsMorph);
        const ide = this.parentThatIsA(IDE_Morph);
        const parent = this.parentThatIsA(SyntaxElementMorph);
        const cslot = this.parentThatIsA(CSlotMorph);

        // for undrop / redrop
        if (scripts) {
            scripts.clearDropInfo();
            scripts.lastDroppedBlock = this;
            scripts.recordDrop(this.situation());
            scripts.dropRecord.action = 'delete';
        }

        if (ide) {
            // also stop all active processes hatted by this block
            ide.removeBlock(this);
        } else {
            this.destroy();
        }
        if (cslot) {
            cslot.fixLayout();
        }
        if (parent) {
            parent.reactToGrabOf(this); // fix highlight
        }
    }

    userDestroyJustThis() {
        // delete just this one block, reattach next block to the previous one,
        const scripts = this.parentThatIsA(ScriptsMorph);

        const ide = this.parentThatIsA(IDE_Morph);
        const cs = this.parentThatIsA(CommandSlotMorph);
        let pb;
        const nb = this.nextBlock();
        let above;
        const parent = this.parentThatIsA(SyntaxElementMorph);
        const cslot = this.parentThatIsA(CSlotMorph);

        // for undrop / redrop
        if (scripts) {
            scripts.clearDropInfo();
            scripts.lastDroppedBlock = this;
            scripts.recordDrop(this.situation());
            scripts.dropRecord.lastNextBlock = nb;
            scripts.dropRecord.action = 'delete';
        }

        this.topBlock().fullChanged();
        if (this.parent) {
            pb = this.parent.parentThatIsA(CommandBlockMorph);
        }
        if (pb && (pb.nextBlock() === this)) {
            above = pb;
        } else if (cs && (cs.nestedBlock() === this)) {
            above = cs;
        }
        if (ide) {
            // also stop all active processes hatted by this block
            ide.removeBlock(this, true); // just this block
        } else {
            this.destroy(true); // just this block
        }
        if (nb) {
            if (above instanceof CommandSlotMorph) {
                above.nestedBlock(nb);
            } else if (above instanceof CommandBlockMorph) {
                above.nextBlock(nb);
            } else {
                scripts.add(nb);
            }
        } else if (cslot) {
            cslot.fixLayout();
        }
        if (parent) {
            parent.reactToGrabOf(this); // fix highlight
        }
    }

    // CommandBlockMorph drawing:

    drawNew() {
        let context;
        this.cachedClr = this.color.toString();
        this.cachedClrBright = this.bright();
        this.cachedClrDark = this.dark();
        this.image = newCanvas(this.extent());
        context = this.image.getContext('2d');
        context.fillStyle = this.cachedClr;

        // draw the 'flat' shape:
        this.drawTop(context);
        this.drawBody(context);
        this.drawBottom(context);

        // add 3D-Effect:
        if (!MorphicPreferences.isFlat) {
            this.drawTopDentEdge(context, 0, 0);
            this.drawBottomDentEdge(context, 0, this.height() - this.corner);
            this.drawLeftEdge(context);
            this.drawRightEdge(context);
            this.drawTopLeftEdge(context);
            this.drawBottomRightEdge(context);
        } else {
            nop();
            /*
            this.drawFlatBottomDentEdge(
                context, 0, this.height() - this.corner
            );
            */
        }

        // erase CommandSlots
        this.eraseHoles(context);
    }

    drawBody(context) {
        context.fillRect(
            0,
            Math.floor(this.corner),
            this.width(),
            this.height() - Math.floor(this.corner * 3) + 1
        );
    }

    drawTop(context) {
        context.beginPath();

        // top left:
        context.arc(
            this.corner,
            this.corner,
            this.corner,
            radians(-180),
            radians(-90),
            false
        );

        // dent:
        this.drawDent(context, 0, 0);

        // top right:
        context.arc(
            this.width() - this.corner,
            this.corner,
            this.corner,
            radians(-90),
            radians(-0),
            false
        );

        context.closePath();
        context.fill();
    }

    drawBottom(context) {
        const y = this.height() - (this.corner * 2);

        context.beginPath();

        // bottom left:
        context.arc(
            this.corner,
            y,
            this.corner,
            radians(180),
            radians(90),
            true
        );

        if (!this.isStop()) {
            this.drawDent(context, 0, this.height() - this.corner);
        }

        // bottom right:
        context.arc(
            this.width() - this.corner,
            y,
            this.corner,
            radians(90),
            radians(0),
            true
        );

        context.closePath();
        context.fill();
    }

    drawDent(context, x, y) {
        const indent = x + this.corner * 2 + this.inset;

        context.lineTo(x + this.corner + this.inset, y);
        context.lineTo(indent, y + this.corner);
        context.lineTo(indent + this.dent, y + this.corner);
        context.lineTo(x + this.corner * 3 + this.inset + this.dent, y);
        context.lineTo(this.width() - this.corner, y);
    }

    drawTopDentEdge(context, x, y) {
        const shift = this.edge * 0.5;
        const indent = x + this.corner * 2 + this.inset;
        let upperGradient;
        let lowerGradient;
        let leftGradient;
        let lgx;

        context.lineWidth = this.edge;
        context.lineJoin = 'round';
        context.lineCap = 'round';

        upperGradient = context.createLinearGradient(
            0,
            y,
            0,
            y + this.edge
        );
        upperGradient.addColorStop(0, this.cachedClrBright);
        upperGradient.addColorStop(1, this.cachedClr);

        context.strokeStyle = upperGradient;
        context.beginPath();
        context.moveTo(this.corner, y + shift);
        context.lineTo(x + this.corner + this.inset, y + shift);
        context.stroke();

        context.strokeStyle = upperGradient;
        context.beginPath();
        context.moveTo(
            x + this.corner * 3 + this.inset + this.dent + shift,
            y + shift
        );
        context.lineTo(this.width() - this.corner, y + shift);
        context.stroke();

        lgx = x + this.corner + this.inset;
        leftGradient = context.createLinearGradient(
            lgx - this.edge,
            y + this.edge,
            lgx,
            y
        );
        leftGradient.addColorStop(0, this.cachedClr);
        leftGradient.addColorStop(1, this.cachedClrBright);

        context.strokeStyle = leftGradient;
        context.beginPath();
        context.moveTo(x + this.corner + this.inset, y + shift);
        context.lineTo(indent, y + this.corner + shift);
        context.stroke();

        lowerGradient = context.createLinearGradient(
            0,
            y + this.corner,
            0,
            y + this.corner + this.edge
        );
        lowerGradient.addColorStop(0, this.cachedClrBright);
        lowerGradient.addColorStop(1, this.cachedClr);

        context.strokeStyle = lowerGradient;
        context.beginPath();
        context.moveTo(indent, y + this.corner + shift);
        context.lineTo(indent + this.dent, y + this.corner + shift);
        context.stroke();
    }

    drawBottomDentEdge(context, x, y) {
        const shift = this.edge * 0.5;
        const indent = x + this.corner * 2 + this.inset;
        let upperGradient;
        let lowerGradient;
        let rightGradient;

        context.lineWidth = this.edge;
        context.lineJoin = 'round';
        context.lineCap = 'round';

        upperGradient = context.createLinearGradient(
            0,
            y - this.edge,
            0,
            y
        );
        upperGradient.addColorStop(0, this.cachedClr);
        upperGradient.addColorStop(1, this.cachedClrDark);

        context.strokeStyle = upperGradient;
        context.beginPath();
        context.moveTo(this.corner, y - shift);
        if (this.isStop()) {
            context.lineTo(this.width() - this.corner, y - shift);
        } else {
            context.lineTo(x + this.corner + this.inset - shift, y - shift);
        }
        context.stroke();

        if (this.isStop()) {    // draw straight bottom edge
            return null;
        }

        lowerGradient = context.createLinearGradient(
            0,
            y + this.corner - this.edge,
            0,
            y + this.corner
        );
        lowerGradient.addColorStop(0, this.cachedClr);
        lowerGradient.addColorStop(1, this.cachedClrDark);

        context.strokeStyle = lowerGradient;
        context.beginPath();
        context.moveTo(indent + shift, y + this.corner - shift);
        context.lineTo(indent + this.dent, y + this.corner - shift);
        context.stroke();

        rightGradient = context.createLinearGradient(
            x + indent + this.dent - this.edge,
            y + this.corner - this.edge,
            x + indent + this.dent,
            y + this.corner
        );
        rightGradient.addColorStop(0, this.cachedClr);
        rightGradient.addColorStop(1, this.cachedClrDark);

        context.strokeStyle = rightGradient;
        context.beginPath();
        context.moveTo(x + indent + this.dent, y + this.corner - shift);
        context.lineTo(
            x + this.corner * 3 + this.inset + this.dent,
            y - shift
        );
        context.stroke();

        context.strokeStyle = upperGradient;
        context.beginPath();
        context.moveTo(
            x + this.corner * 3 + this.inset + this.dent,
            y - shift
        );
        context.lineTo(this.width() - this.corner, y - shift);
        context.stroke();
    }

    drawFlatBottomDentEdge(context) {
        if (!this.isStop()) {
            context.fillStyle = this.color.darker(this.contrast / 2).toString();
            context.beginPath();
            this.drawDent(context, 0, this.height() - this.corner);
            context.closePath();
            context.fill();
        }
    }

    drawLeftEdge(context) {
        const shift = this.edge * 0.5;
        const gradient = context.createLinearGradient(0, 0, this.edge, 0);

        gradient.addColorStop(0, this.cachedClrBright);
        gradient.addColorStop(1, this.cachedClr);

        context.lineWidth = this.edge;
        context.lineJoin = 'round';
        context.lineCap = 'round';

        context.strokeStyle = gradient;
        context.beginPath();
        context.moveTo(shift, this.corner);
        context.lineTo(shift, this.height() - this.corner * 2 - shift);
        context.stroke();
    }

    drawRightEdge(context) {
        const shift = this.edge * 0.5;
        const x = this.width();
        let gradient;

        gradient = context.createLinearGradient(x - this.edge, 0, x, 0);
        gradient.addColorStop(0, this.cachedClr);
        gradient.addColorStop(1, this.cachedClrDark);

        context.lineWidth = this.edge;
        context.lineJoin = 'round';
        context.lineCap = 'round';

        context.strokeStyle = gradient;
        context.beginPath();
        context.moveTo(x - shift, this.corner + shift);
        context.lineTo(x - shift, this.height() - this.corner * 2);
        context.stroke();
    }

    drawTopLeftEdge(context) {
        const shift = this.edge * 0.5;
        let gradient;

        gradient = context.createRadialGradient(
            this.corner,
            this.corner,
            this.corner,
            this.corner,
            this.corner,
            this.corner - this.edge
        );
        gradient.addColorStop(0, this.cachedClrBright);
        gradient.addColorStop(1, this.cachedClr);

        context.lineWidth = this.edge;
        context.lineJoin = 'round';
        context.lineCap = 'round';

        context.strokeStyle = gradient;

        context.beginPath();
        context.arc(
            this.corner,
            this.corner,
            this.corner - shift,
            radians(-180),
            radians(-90),
            false
        );
        context.stroke();
    }

    drawBottomRightEdge(context) {
        const shift = this.edge * 0.5;
        const x = this.width() - this.corner;
        const y = this.height() - this.corner * 2;
        let gradient;

        gradient = context.createRadialGradient(
            x,
            y,
            this.corner,
            x,
            y,
            this.corner - this.edge
        );
        gradient.addColorStop(0, this.cachedClrDark);
        gradient.addColorStop(1, this.cachedClr);

        context.lineWidth = this.edge;
        context.lineJoin = 'round';
        context.lineCap = 'round';

        context.strokeStyle = gradient;

        context.beginPath();
        context.arc(
            x,
            y,
            this.corner - shift,
            radians(90),
            radians(0),
            true
        );
        context.stroke();
    }
}