// ReporterBlockMorph //////////////////////////////////////////////////

/*
    I am a block with a return value, either round-ish or diamond shaped
    I inherit all my important accessors from BlockMorph
*/

import BlockMorph from "./BlockMorph";

// ReporterBlockMorph instance creation:

export default class ReporterBlockMorph extends BlockMorph {
    constructor(isPredicate) {
        this.init(isPredicate);
    }

    init(isPredicate, silently) {
        super.init.call(this, silently);
        this.isPredicate = isPredicate || false;
        this.setExtent(new Point(200, 80), silently);
        this.cachedSlotSpec = null; // don't serialize
    }

    // ReporterBlockMorph drag & drop:

    snap(hand) {
        // passing the hand is optional (for when blocks are dragged & dropped)
        const scripts = this.parent;

        let nb;
        let target;

        this.cachedSlotSpec = null;
        if (!(scripts instanceof ScriptsMorph)) {
            return null;
        }

        scripts.clearDropInfo();
        scripts.lastDroppedBlock = this;

        target = scripts.closestInput(this, hand);
        if (target !== null) {
            scripts.lastReplacedInput = target;
            scripts.lastDropTarget = target.parent;
            if (target instanceof MultiArgMorph) {
                scripts.lastPreservedBlocks = target.inputs();
                scripts.lastReplacedInput = target.fullCopy();
            } else if (target instanceof CommandSlotMorph) {
                scripts.lastReplacedInput = target;
                nb = target.nestedBlock();
                if (nb) {
                    nb = nb.fullCopy();
                    scripts.add(nb);
                    nb.moveBy(nb.extent());
                    nb.fixBlockColor();
                    scripts.lastPreservedBlocks = [nb];
                }
            }
            target.parent.replaceInput(target, this);
            if (this.snapSound) {
                this.snapSound.play();
            }
        }
        this.startLayout();
        this.fixBlockColor();
        this.endLayout();
        super.snap.call(this);
        if (hand) {
            scripts.recordDrop(hand.grabOrigin);
        }
    }

    prepareToBeGrabbed(handMorph) {
        const oldPos = this.position();

        nop(handMorph);
        if ((this.parent instanceof BlockMorph)
                || (this.parent instanceof MultiArgMorph)
                || (this.parent instanceof ReporterSlotMorph)) {
            this.parent.revertToDefaultInput(this);
            this.setPosition(oldPos);
        }
        super.prepareToBeGrabbed.call(this, handMorph);
        this.alpha = 0.85;
        this.cachedSlotSpec = null;
    }

    // ReporterBlockMorph enumerating

    blockSequence() {
        // reporters don't have a sequence, answer myself
        return this;
    }

    // ReporterBlockMorph evaluating

    isUnevaluated() {
        // answer whether my parent block's slot is designated to be of an
        // 'unevaluated' kind, denoting a spedial form
        const spec = this.getSlotSpec();
        return spec === '%anyUE' ||
            spec === '%boolUE' ||
            spec === '%f';
    }

    isLocked() {
        // answer true if I can be exchanged by a dropped reporter
        return this.isStatic || (this.getSlotSpec() === '%t');
    }

    getSlotSpec() {
        // answer the spec of the slot I'm in, if any
        // cached for performance
        if (!this.cachedSlotSpec) {
            this.cachedSlotSpec = this.determineSlotSpec();
        /*
        } else {
            // debug slot spec caching
            var real = this.determineSlotSpec();
            if (real !== this.cachedSlotSpec) {
                throw new Error(
                    'cached slot spec ' +
                    this.cachedSlotSpec +
                    ' does not match: ' +
                    real
                );
            }
        */
        }
        return this.cachedSlotSpec;
    }

    determineSlotSpec() {
        // private - answer the spec of the slot I'm in, if any
        let parts;

        let idx;
        if (this.parent instanceof BlockMorph) {
            parts = this.parent.parts().filter(
                part => !(part instanceof BlockHighlightMorph)
            );
            idx = parts.indexOf(this);
            if (idx !== -1) {
                if (this.parent.blockSpec) {
                    return this.parseSpec(this.parent.blockSpec)[idx];
                }
            }
        }
        if (this.parent instanceof MultiArgMorph) {
            return this.parent.slotSpec;
        }
        if (this.parent instanceof TemplateSlotMorph) {
            return this.parent.getSpec();
        }
        return null;
    }

    // ReporterBlockMorph events

    mouseClickLeft(pos) {
        let label;
        if (this.parent instanceof BlockInputFragmentMorph) {
            return this.parent.mouseClickLeft();
        }
        if (this.parent instanceof TemplateSlotMorph) {
            if (this.parent.parent && this.parent.parent.parent &&
                    this.parent.parent.parent instanceof RingMorph) {
                label = "Input name";
            } else if (this.parent.parent.elementSpec === '%blockVars') {
                label = "Block variable name";
            } else {
                label = "Script variable name";
            }
            new DialogBoxMorph(
                this,
                this.userSetSpec,
                this
            ).prompt(
                label,
                this.blockSpec,
                this.world()
            );
        } else {
            super.mouseClickLeft.call(this, pos);
        }
    }

    // ReporterBlock exporting picture with result bubble

    exportResultPic() {
        const top = this.topBlock();
        const receiver = top.scriptTarget();
        let stage;
        if (top !== this) {return; }
        if (receiver) {
            stage = receiver.parentThatIsA(StageMorph);
            if (stage) {
                stage.threads.stopProcess(top);
                stage.threads.startProcess(top, receiver, false, true);
            }
        }
    }

    // ReporterBlockMorph deleting

    userDestroy() {
        // make sure to restore default slot of parent block
        const target = this.selectForEdit(); // enable copy-on-edit
        if (target !== this) {
            return this.userDestroy.call(target);
        }

        // for undrop / redrop
        const scripts = this.parentThatIsA(ScriptsMorph);
        if (scripts) {
            scripts.clearDropInfo();
            scripts.lastDroppedBlock = this;
            scripts.recordDrop(this.situation());
            scripts.dropRecord.action = 'delete';
        }

        this.topBlock().fullChanged();
        this.prepareToBeGrabbed(this.world().hand);
        this.destroy();
    }

    // ReporterBlockMorph drawing:

    drawNew() {
        let context;
        this.cachedClr = this.color.toString();
        this.cachedClrBright = this.bright();
        this.cachedClrDark = this.dark();
        this.image = newCanvas(this.extent());
        context = this.image.getContext('2d');
        context.fillStyle = this.cachedClr;

        if (this.isPredicate) {
            this.drawDiamond(context);
        } else {
            this.drawRounded(context);
        }

        // erase CommandSlots
        this.eraseHoles(context);
    }

    drawRounded(context) {
        const h = this.height();
        const r = Math.min(this.rounding, h / 2);
        const w = this.width();
        const shift = this.edge / 2;
        let gradient;

        // draw the 'flat' shape:
        context.fillStyle = this.cachedClr;
        context.beginPath();

        // top left:
        context.arc(
            r,
            r,
            r,
            radians(-180),
            radians(-90),
            false
        );

        // top right:
        context.arc(
            w - r,
            r,
            r,
            radians(-90),
            radians(-0),
            false
        );

        // bottom right:
        context.arc(
            w - r,
            h - r,
            r,
            radians(0),
            radians(90),
            false
        );

        // bottom left:
        context.arc(
            r,
            h - r,
            r,
            radians(90),
            radians(180),
            false
        );

        context.closePath();
        context.fill();

        if (MorphicPreferences.isFlat) {return; }

        // add 3D-Effect:
        context.lineWidth = this.edge;
        context.lineJoin = 'round';
        context.lineCap = 'round';

        // half-tone edges
        // bottem left corner
        gradient = context.createRadialGradient(
            r,
            h - r,
            r - this.edge,
            r,
            h - r,
            r + this.edge
        );
        gradient.addColorStop(0, this.cachedClr);
        gradient.addColorStop(1, this.cachedClrBright);
        context.strokeStyle = gradient;
        context.beginPath();
        context.arc(
            r,
            h - r,
            r - shift,
            radians(90),
            radians(180),
            false
        );
        context.stroke();

        // top right corner
        gradient = context.createRadialGradient(
            w - r,
            r,
            r - this.edge,
            w - r,
            r,
            r + this.edge
        );
        gradient.addColorStop(0, this.cachedClr);
        gradient.addColorStop(1, this.cachedClrDark);
        context.strokeStyle = gradient;
        context.beginPath();
        context.arc(
            w - r,
            r,
            r - shift,
            radians(-90),
            radians(0),
            false
        );
        context.stroke();

        // normal gradient edges

        // top edge: straight line
        gradient = context.createLinearGradient(
            0,
            0,
            0,
            this.edge
        );
        gradient.addColorStop(0, this.cachedClrBright);
        gradient.addColorStop(1, this.cachedClr);
        context.strokeStyle = gradient;
        context.beginPath();
        context.moveTo(r - shift, shift);
        context.lineTo(w - r + shift, shift);
        context.stroke();

        // top edge: left corner
        gradient = context.createRadialGradient(
            r,
            r,
            r - this.edge,
            r,
            r,
            r
        );
        gradient.addColorStop(0, this.cachedClr);
        gradient.addColorStop(1, this.cachedClrBright);
        context.strokeStyle = gradient;
        context.beginPath();
        context.arc(
            r,
            r,
            r - shift,
            radians(180),
            radians(270),
            false
        );
        context.stroke();

        // bottom edge: right corner
        gradient = context.createRadialGradient(
            w - r,
            h - r,
            r - this.edge,
            w - r,
            h - r,
            r
        );
        gradient.addColorStop(0, this.cachedClr);
        gradient.addColorStop(1, this.cachedClrDark);
        context.strokeStyle = gradient;
        context.beginPath();
        context.arc(
            w - r,
            h - r,
            r - shift,
            radians(0),
            radians(90),
            false
        );
        context.stroke();

        // bottom edge: straight line
        gradient = context.createLinearGradient(
            0,
            h - this.edge,
            0,
            h
        );
        gradient.addColorStop(0, this.cachedClr);
        gradient.addColorStop(1, this.cachedClrDark);
        context.strokeStyle = gradient;
        context.beginPath();
        context.moveTo(r - shift, h - shift);
        context.lineTo(w - r + shift, h - shift);
        context.stroke();

        // left edge: straight vertical line
        gradient = context.createLinearGradient(0, 0, this.edge, 0);
        gradient.addColorStop(0, this.cachedClrBright);
        gradient.addColorStop(1, this.cachedClr);
        context.strokeStyle = gradient;
        context.beginPath();
        context.moveTo(shift, r);
        context.lineTo(shift, h - r);
        context.stroke();

        // right edge: straight vertical line
        gradient = context.createLinearGradient(w - this.edge, 0, w, 0);
        gradient.addColorStop(0, this.cachedClr);
        gradient.addColorStop(1, this.cachedClrDark);
        context.strokeStyle = gradient;
        context.beginPath();
        context.moveTo(w - shift, r + shift);
        context.lineTo(w - shift, h - r);
        context.stroke();
    }

    drawDiamond(context) {
        const w = this.width();
        const h = this.height();
        const h2 = Math.floor(h / 2);
        const r = this.rounding;
        const shift = this.edge / 2;
        let gradient;

        // draw the 'flat' shape:
        context.fillStyle = this.cachedClr;
        context.beginPath();

        context.moveTo(0, h2);
        context.lineTo(r, 0);
        context.lineTo(w - r, 0);
        context.lineTo(w, h2);
        context.lineTo(w - r, h);
        context.lineTo(r, h);

        context.closePath();
        context.fill();

        if (MorphicPreferences.isFlat) {return; }

        // add 3D-Effect:
        context.lineWidth = this.edge;
        context.lineJoin = 'round';
        context.lineCap = 'round';

        // half-tone edges
        // bottom left corner
        gradient = context.createLinearGradient(
            -r,
            0,
            r,
            0
        );
        gradient.addColorStop(1, this.cachedClr);
        gradient.addColorStop(0, this.cachedClrBright);
        context.strokeStyle = gradient;
        context.beginPath();
        context.moveTo(shift, h2);
        context.lineTo(r, h - shift);
        context.closePath();
        context.stroke();

        // top right corner
        gradient = context.createLinearGradient(
            w - r,
            0,
            w + r,
            0
        );
        gradient.addColorStop(0, this.cachedClr);
        gradient.addColorStop(1, this.cachedClrDark);
        context.strokeStyle = gradient;
        context.beginPath();
        context.moveTo(w - shift, h2);
        context.lineTo(w - r, shift);
        context.closePath();
        context.stroke();

        // normal gradient edges
        // top edge: left corner
        gradient = context.createLinearGradient(
            0,
            0,
            r,
            0
        );
        gradient.addColorStop(0, this.cachedClrBright);
        gradient.addColorStop(1, this.cachedClr);
        context.strokeStyle = gradient;
        context.beginPath();
        context.moveTo(shift, h2);
        context.lineTo(r, shift);
        context.closePath();
        context.stroke();

        // top edge: straight line
        gradient = context.createLinearGradient(
            0,
            0,
            0,
            this.edge
        );
        gradient.addColorStop(0, this.cachedClrBright);
        gradient.addColorStop(1, this.cachedClr);
        context.strokeStyle = gradient;
        context.beginPath();
        context.moveTo(r, shift);
        context.lineTo(w - r, shift);
        context.closePath();
        context.stroke();

        // bottom edge: right corner
        gradient = context.createLinearGradient(
            w - r,
            0,
            w,
            0
        );
        gradient.addColorStop(0, this.cachedClr);
        gradient.addColorStop(1, this.cachedClrDark);
        context.strokeStyle = gradient;
        context.beginPath();
        context.moveTo(w - r, h - shift);
        context.lineTo(w - shift, h2);
        context.closePath();
        context.stroke();

        // bottom edge: straight line
        gradient = context.createLinearGradient(
            0,
            h - this.edge,
            0,
            h
        );
        gradient.addColorStop(0, this.cachedClr);
        gradient.addColorStop(1, this.cachedClrDark);
        context.strokeStyle = gradient;
        context.beginPath();
        context.moveTo(r + shift, h - shift);
        context.lineTo(w - r - shift, h - shift);
        context.closePath();
        context.stroke();
    }
}