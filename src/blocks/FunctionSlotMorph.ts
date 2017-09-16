// FunctionSlotMorph ///////////////////////////////////////////////////

/*
    I am an unevaluated, non-editable, rf-colored, rounded or diamond
    input slot. My current (only) use is in the THE BLOCK block.

    My command spec is %f
*/

import ArgMorph from "./ArgMorph"

// FunctionSlotMorph instance creation:

export default class FunctionSlotMorph extends ArgMorph {
    constructor(isPredicate) {
        this.init(isPredicate);
    }

    init(isPredicate, silently) {
        super.init.call(this, null, true); // silently
        this.isPredicate = isPredicate || false;
        this.color = this.rfColor;
        this.setExtent(
            new Point(
                (this.fontSize + this.edge * 2) * 2,
                this.fontSize + this.edge * 2
            ),
            silently
        );
    }

    getSpec() {
        return '%f';
    }

    // FunctionSlotMorph drawing:

    drawNew() {
        let context;
        let borderColor;

        // initialize my surface property
        this.image = newCanvas(this.extent());
        context = this.image.getContext('2d');
        if (this.parent) {
            borderColor = this.parent.color;
        } else {
            borderColor = new Color(120, 120, 120);
        }

        // cache my border colors
        this.cachedClr = borderColor.toString();
        this.cachedClrBright = borderColor.lighter(this.contrast)
            .toString();
        this.cachedClrDark = borderColor.darker(this.contrast).toString();

        if (this.isPredicate) {
            this.drawDiamond(context);
        } else {
            this.drawRounded(context);
        }
    }

    drawRounded(context) {
        const h = this.height();
        const r = Math.min(this.rounding, h / 2);
        const w = this.width();
        const shift = this.edge / 2;
        let gradient;

        // draw the 'flat' shape:
        context.fillStyle = this.color.toString();
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

        // bottom left corner
        context.strokeStyle = this.cachedClr; //gradient;
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
        context.strokeStyle = this.cachedClr; //gradient;
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

        context.shadowOffsetX = shift;
        context.shadowOffsetY = shift;
        context.shadowBlur = this.edge;
        context.shadowColor = this.color.darker(80).toString();

        // top edge: straight line
        gradient = context.createLinearGradient(
            0,
            0,
            0,
            this.edge
        );
        gradient.addColorStop(1, this.cachedClrDark);
        gradient.addColorStop(0, this.cachedClr);
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
        gradient.addColorStop(1, this.cachedClr);
        gradient.addColorStop(0, this.cachedClrDark);
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

        // left edge: straight vertical line
        gradient = context.createLinearGradient(0, 0, this.edge, 0);
        gradient.addColorStop(1, this.cachedClrDark);
        gradient.addColorStop(0, this.cachedClr);
        context.strokeStyle = gradient;
        context.beginPath();
        context.moveTo(shift, r);
        context.lineTo(shift, h - r);
        context.stroke();

        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.shadowBlur = 0;

        // bottom edge: right corner
        gradient = context.createRadialGradient(
            w - r,
            h - r,
            r - this.edge,
            w - r,
            h - r,
            r
        );
        gradient.addColorStop(1, this.cachedClr);
        gradient.addColorStop(0, this.cachedClrBright);
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
        gradient.addColorStop(1, this.cachedClr);
        gradient.addColorStop(0, this.cachedClrBright);
        context.strokeStyle = gradient;
        context.beginPath();
        context.moveTo(r - shift, h - shift);
        context.lineTo(w - r + shift, h - shift);
        context.stroke();

        // right edge: straight vertical line
        gradient = context.createLinearGradient(w - this.edge, 0, w, 0);
        gradient.addColorStop(1, this.cachedClr);
        gradient.addColorStop(0, this.cachedClrBright);
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
        const r = Math.min(this.rounding, h2);
        const shift = this.edge / 2;
        let gradient;

        // draw the 'flat' shape:
        context.fillStyle = this.color.toString();
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
        context.strokeStyle = this.cachedClr;
        context.beginPath();
        context.moveTo(shift, h2);
        context.lineTo(r, h - shift);
        context.stroke();

        // top right corner
        context.strokeStyle = this.cachedClr;
        context.beginPath();
        context.moveTo(w - shift, h2);
        context.lineTo(w - r, shift);
        context.stroke();

        // normal gradient edges
        // top edge: left corner

        context.shadowOffsetX = shift;
        context.shadowOffsetY = shift;
        context.shadowBlur = this.edge;
        context.shadowColor = this.color.darker(80).toString();

        gradient = context.createLinearGradient(
            0,
            0,
            r,
            0
        );
        gradient.addColorStop(1, this.cachedClrDark);
        gradient.addColorStop(0, this.cachedClr);
        context.strokeStyle = gradient;
        context.beginPath();
        context.moveTo(shift, h2);
        context.lineTo(r, shift);
        context.stroke();

        // top edge: straight line
        gradient = context.createLinearGradient(
            0,
            0,
            0,
            this.edge
        );
        gradient.addColorStop(1, this.cachedClrDark);
        gradient.addColorStop(0, this.cachedClr);
        context.strokeStyle = gradient;
        context.beginPath();
        context.moveTo(r, shift);
        context.lineTo(w - r, shift);
        context.stroke();

        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.shadowBlur = 0;

        // bottom edge: right corner
        gradient = context.createLinearGradient(
            w - r,
            0,
            w,
            0
        );
        gradient.addColorStop(1, this.cachedClr);
        gradient.addColorStop(0, this.cachedClrBright);
        context.strokeStyle = gradient;
        context.beginPath();
        context.moveTo(w - r, h - shift);
        context.lineTo(w - shift, h2);
        context.stroke();

        // bottom edge: straight line
        gradient = context.createLinearGradient(
            0,
            h - this.edge,
            0,
            h
        );
        gradient.addColorStop(1, this.cachedClr);
        gradient.addColorStop(0, this.cachedClrBright);
        context.strokeStyle = gradient;
        context.beginPath();
        context.moveTo(r + shift, h - shift);
        context.lineTo(w - r - shift, h - shift);
        context.stroke();
    }
}