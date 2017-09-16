// CommandSlotMorph ////////////////////////////////////////////////////

/*
    I am a CommandBlock-shaped input slot. I can nest command blocks
    and also accept    reporters (containing reified scripts).

    my most important accessor is

    nestedBlock()    - answer the command block I encompass, if any

    My command spec is %cmd

    evaluate() returns my nested block or null
*/

import ArgMorph from "./ArgMorph";

// CommandSlotMorph instance creation:

export default class CommandSlotMorph extends ArgMorph {
    constructor() {
        this.init();
    }

    init(silently) {
        super.init.call(this, null, true); // silently
        this.color = new Color(0, 17, 173);
        this.setExtent(
            new Point(230, this.corner * 4 + this.cSlotPadding),
            silently
        );
    }

    getSpec() {
        return '%cmd';
    }

    // CommandSlotMorph enumerating:

    topBlock() {
        if (this.parent.topBlock) {
            return this.parent.topBlock();
        }
        return this.nestedBlock();
    }

    // CommandSlotMorph nesting:

    nestedBlock(block) {
        if (block) {
            const nb = this.nestedBlock();
            this.add(block);
            if (nb) {
                block.bottomBlock().nextBlock(nb);
            }
            this.fixLayout();
        } else {
            return detect(
                this.children,
                child => child instanceof CommandBlockMorph
            );
        }
    }

    // CommandSlotMorph attach targets:

    slotAttachPoint() {
        return new Point(
            this.dentCenter(),
            this.top() + this.corner * 2
        );
    }

    dentLeft() {
        return this.left()
            + this.corner
            + this.inset * 2;
    }

    dentCenter() {
        return this.dentLeft()
            + this.corner
            + (this.dent * 0.5);
    }

    attachTargets() {
        const answer = [];
        answer.push({
            point: this.slotAttachPoint(),
            element: this,
            loc: 'bottom',
            type: 'slot'
        });
        return answer;
    }

    // CommandSlotMorph layout:

    fixLayout() {
        const nb = this.nestedBlock();
        if (this.parent) {
            if (!this.color.eq(this.parent.color)) {
                this.setColor(this.parent.color);
            }
        }
        if (nb) {
            nb.setPosition(
                new Point(
                    this.left() + this.edge + this.rfBorder,
                    this.top() + this.edge + this.rfBorder
                )
            );
            this.setWidth(nb.fullBounds().width()
                + (this.edge + this.rfBorder) * 2
                );
            this.setHeight(nb.fullBounds().height()
                + this.edge + (this.rfBorder * 2) - (this.corner - this.edge)
                );
        } else {
            this.setHeight(this.corner * 4);
            this.setWidth(
                this.corner * 4
                    + this.inset
                    + this.dent
            );
        }
        if (this.parent.fixLayout) {
            this.parent.fixLayout();
        }
    }

    // CommandSlotMorph evaluating:

    evaluate() {
        return this.nestedBlock();
    }

    isEmptySlot() {
        return !this.isStatic && (this.nestedBlock() === null);
    }

    // CommandSlotMorph context menu ops

    attach() {
        // for context menu demo and testing purposes
        // override inherited version to adjust new owner's layout
        const choices = this.overlappedMorphs();

        const menu = new MenuMorph(this, 'choose new parent:');
        const myself = this;

        choices.forEach(each => {
            menu.addItem(each.toString().slice(0, 50), () => {
                each.add(myself);
                myself.isDraggable = false;
                if (each.fixLayout) {
                    each.fixLayout();
                }
            });
        });
        if (choices.length > 0) {
            menu.popUpAtHand(this.world());
        }
    }

    // CommandSlotMorph drawing:

    drawNew() {
        let context;
        this.cachedClr = this.color.toString();
        this.cachedClrBright = this.bright();
        this.cachedClrDark = this.dark();
        this.image = newCanvas(this.extent());
        context = this.image.getContext('2d');
        context.fillStyle = this.cachedClr;
        context.fillRect(0, 0, this.width(), this.height());

        // draw the 'flat' shape:
        context.fillStyle = this.rfColor.toString();
        this.drawFlat(context);

        if (MorphicPreferences.isFlat) {return; }

        // add 3D-Effect:
        this.drawEdges(context);
    }

    drawFlat(context) {
        const isFilled = this.nestedBlock() !== null;
        const ins = (isFilled ? this.inset : this.inset / 2);
        const dent = (isFilled ? this.dent : this.dent / 2);
        const indent = this.corner * 2 + ins;
        const edge = this.edge;
        const rf = (isFilled ? this.rfBorder : 0);
        const y = this.height() - this.corner - edge;

        context.beginPath();

        // top left:
        context.arc(
            this.corner + edge,
            this.corner + edge,
            this.corner,
            radians(-180),
            radians(-90),
            false
        );

        // dent:
        context.lineTo(this.corner + ins + edge + rf * 2, edge);
        context.lineTo(indent + edge + rf * 2, this.corner + edge);
        context.lineTo(
            indent + edge  + rf * 2 + (dent - rf * 2),
            this.corner + edge
        );
        context.lineTo(
            indent + edge  + rf * 2 + (dent - rf * 2) + this.corner,
            edge
        );
        context.lineTo(this.width() - this.corner - edge, edge);

        // top right:
        context.arc(
            this.width() - this.corner - edge,
            this.corner + edge,
            this.corner,
            radians(-90),
            radians(-0),
            false
        );

        // bottom right:
        context.arc(
            this.width() - this.corner - edge,
            y,
            this.corner,
            radians(0),
            radians(90),
            false
        );

        // bottom left:
        context.arc(
            this.corner + edge,
            y,
            this.corner,
            radians(90),
            radians(180),
            false
        );

        context.closePath();
        context.fill();
    }

    drawEdges(context) {
        const isFilled = this.nestedBlock() !== null;
        const ins = (isFilled ? this.inset : this.inset / 2);
        const dent = (isFilled ? this.dent : this.dent / 2);
        const indent = this.corner * 2 + ins;
        const edge = this.edge;
        const rf = (isFilled ? this.rfBorder : 0);
        const shift = this.edge * 0.5;
        let gradient;
        let upperGradient;
        let lowerGradient;
        let rightGradient;

        context.lineWidth = this.edge;
        context.lineJoin = 'round';
        context.lineCap = 'round';


        // bright:
        // bottom horizontal line
        gradient = context.createLinearGradient(
            0,
            this.height(),
            0,
            this.height() - this.edge
        );
        gradient.addColorStop(0, this.cachedClr);
        gradient.addColorStop(1, this.cachedClrBright);

        context.strokeStyle = gradient;
        context.beginPath();
        context.moveTo(this.corner + edge, this.height() - shift);
        context.lineTo(
            this.width() - this.corner - edge,
            this.height() - shift
        );
        context.stroke();

        // bottom right corner
        gradient = context.createRadialGradient(
            this.width() - (this.corner + edge),
            this.height() - (this.corner + edge),
            this.corner,
            this.width() - (this.corner + edge),
            this.height() - (this.corner + edge),
            this.corner + edge
        );
        gradient.addColorStop(0, this.cachedClrBright);
        gradient.addColorStop(1, this.cachedClr);

        context.strokeStyle = gradient;
        context.beginPath();
        context.arc(
            this.width() - (this.corner + edge),
            this.height() - (this.corner + edge),
            this.corner + shift,
            radians(0),
            radians(90),
            false
        );
        context.stroke();

        // right vertical line
        gradient = context.createLinearGradient(
            this.width(),
            0,
            this.width() - this.edge,
            0
        );
        gradient.addColorStop(0, this.cachedClr);
        gradient.addColorStop(1, this.cachedClrBright);

        context.strokeStyle = gradient;
        context.beginPath();
        context.moveTo(
            this.width() - shift,
            this.height() - this.corner - this.edge
        );
        context.lineTo(this.width() - shift, edge + this.corner);
        context.stroke();

        context.shadowOffsetY = shift;
        context.shadowBlur = this.edge;
        context.shadowColor = this.rfColor.darker(80).toString();

        // left vertical side
        gradient = context.createLinearGradient(
            0,
            0,
            edge,
            0
        );
        gradient.addColorStop(0, this.cachedClr);
        gradient.addColorStop(1, this.cachedClrDark);

        context.strokeStyle = gradient;
        context.beginPath();
        context.moveTo(shift, edge + this.corner);
        context.lineTo(shift, this.height() - edge - this.corner);
        context.stroke();

        // upper left corner
        gradient = context.createRadialGradient(
            this.corner + edge,
            this.corner + edge,
            this.corner,
            this.corner + edge,
            this.corner + edge,
            this.corner + edge
        );
        gradient.addColorStop(0, this.cachedClrDark);
        gradient.addColorStop(1, this.cachedClr);

        context.strokeStyle = gradient;
        context.beginPath();
        context.arc(
            this.corner + edge,
            this.corner + edge,
            this.corner + shift,
            radians(-180),
            radians(-90),
            false
        );
        context.stroke();

        // upper edge (left side)
        upperGradient = context.createLinearGradient(
            0,
            0,
            0,
            this.edge
        );
        upperGradient.addColorStop(0, this.cachedClr);
        upperGradient.addColorStop(1, this.cachedClrDark);

        context.strokeStyle = upperGradient;
        context.beginPath();
        context.moveTo(this.corner + edge, shift);
        context.lineTo(
            this.corner + ins + edge + rf * 2 - shift,
            shift
        );
        context.stroke();

        // dent bottom
        lowerGradient = context.createLinearGradient(
            0,
            this.corner,
            0,
            this.corner + edge
        );
        lowerGradient.addColorStop(0, this.cachedClr);
        lowerGradient.addColorStop(1, this.cachedClrDark);

        context.strokeStyle = lowerGradient;
        context.beginPath();
        context.moveTo(indent + edge + rf * 2 + shift, this.corner + shift);
        context.lineTo(
            indent + edge  + rf * 2 + (dent - rf * 2),
            this.corner + shift
        );
        context.stroke();

        // dent right edge
        rightGradient = context.createLinearGradient(
            indent + edge  + rf * 2 + (dent - rf * 2) - shift,
            this.corner,
            indent + edge  + rf * 2 + (dent - rf * 2) + shift * 0.7,
            this.corner + shift + shift * 0.7
        );
        rightGradient.addColorStop(0, this.cachedClr);
        rightGradient.addColorStop(1, this.cachedClrDark);

        context.strokeStyle = rightGradient;
        context.beginPath();
        context.moveTo(
            indent + edge  + rf * 2 + (dent - rf * 2),
            this.corner + shift
        );
        context.lineTo(
            indent + edge  + rf * 2 + (dent - rf * 2) + this.corner,
            shift
        );
        context.stroke();

        // upper edge (right side)
        context.strokeStyle = upperGradient;
        context.beginPath();
        context.moveTo(
            indent + edge  + rf * 2 + (dent - rf * 2) + this.corner,
            shift
        );
        context.lineTo(this.width() - this.corner - edge, shift);
        context.stroke();
    }
}

// RingCommandSlotMorph ///////////////////////////////////////////////////

/*
    I am a CommandBlock-shaped input slot for use in RingMorphs.
    I can only nest command blocks, not reporters.

    My command spec is %rc

    evaluate() returns my nested block or null
    (inherited from CommandSlotMorph)
*/

// RingCommandSlotMorph inherits from CommandSlotMorph:

RingCommandSlotMorph.prototype = new CommandSlotMorph();
RingCommandSlotMorph.prototype.constructor = RingCommandSlotMorph;
Ringsuper = CommandSlotMorph.prototype;

// RingCommandSlotMorph preferences settings

RingCommandSlotMorph.prototype.rfBorder = 0;
RingCommandSlotMorph.prototype.edge = RingMorph.prototype.edge;

// RingCommandSlotMorph instance creation:

class RingCommandSlotMorph {
    constructor() {
        this.init();
    }

    init(silently) {
        Ringsuper.init.call(this, silently);
        this.isHole = true;
        this.noticesTransparentClick = true;
        this.color = new Color(0, 17, 173);
        this.alpha = RingMorph.prototype.alpha;
        this.contrast = RingMorph.prototype.contrast;
    }

    getSpec() {
        return '%rc';
    }

    // RingCommandSlotMorph drawing:

    drawNew() {
        let context;
        this.cachedClr = this.color.toString();
        this.cachedClrBright = this.bright();
        this.cachedClrDark = this.dark();
        this.image = newCanvas(this.extent());
        context = this.image.getContext('2d');
        context.fillStyle = this.cachedClr;

        // draw the 'flat' shape:
        this.drawFlat(context);

        if (MorphicPreferences.isFlat) {return; }

        // add 3D-Effect:
        this.drawEdges(context);
    }

    drawFlat(context) {
        const isFilled = this.nestedBlock() !== null;
        const ins = (isFilled ? this.inset : this.inset / 2);
        const dent = (isFilled ? this.dent : this.dent / 2);
        const indent = this.corner * 2 + ins;
        const edge = this.edge;
        const w = this.width();
        const h = this.height();
        const rf = (isFilled ? this.rfBorder : 0);
        const y = h - this.corner - edge;

        // top half:

        context.beginPath();
        context.moveTo(0, h / 2);
        context.lineTo(edge, h / 2);

        // top left:
        context.arc(
            this.corner + edge,
            this.corner + edge,
            this.corner,
            radians(-180),
            radians(-90),
            false
        );

        // dent:
        context.lineTo(this.corner + ins + edge + rf * 2, edge);
        context.lineTo(indent + edge + rf * 2, this.corner + edge);
        context.lineTo(
            indent + edge  + rf * 2 + (dent - rf * 2),
            this.corner + edge
        );
        context.lineTo(
            indent + edge  + rf * 2 + (dent - rf * 2) + this.corner,
            edge
        );
        context.lineTo(this.width() - this.corner - edge, edge);

        // top right:
        context.arc(
            w - this.corner - edge,
            this.corner + edge,
            this.corner,
            radians(-90),
            radians(-0),
            false
        );

        context.lineTo(w - this.edge, h / 2);
        context.lineTo(w, h / 2);
        context.lineTo(w, 0);
        context.lineTo(0, 0);
        context.closePath();
        context.fill();

        // bottom half:
        context.beginPath();
        context.moveTo(w, h / 2);
        context.lineTo(w - edge, h / 2);

        // bottom right:
        context.arc(
            this.width() - this.corner - edge,
            y,
            this.corner,
            radians(0),
            radians(90),
            false
        );

        // bottom left:
        context.arc(
            this.corner + edge,
            y,
            this.corner,
            radians(90),
            radians(180),
            false
        );

        context.lineTo(edge, h / 2);
        context.lineTo(0, h / 2);
        context.lineTo(0, h);
        context.lineTo(w, h);
        context.closePath();
        context.fill();
    }
}