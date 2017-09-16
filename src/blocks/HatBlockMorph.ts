// HatBlockMorph ///////////////////////////////////////////////////////

/*
    I am a script's top most block. I can attach command blocks at my
    bottom, but not on top.

*/

import CommandBlockMorph from "./CommandBlockMorph";

// HatBlockMorph instance creation:

export default class HatBlockMorph extends CommandBlockMorph {
    constructor() {
        this.init();
    }

    init() {
        super.init.call(this, true); // silently
        this.setExtent(new Point(300, 150));
    }

    // HatBlockMorph enumerating:

    blockSequence() {
        // override my inherited method so that I am not part of my sequence
        const result = super.blockSequence.call(this);
        result.shift();
        return result;
    }

    // HatBlockMorph drawing:

    drawTop(context) {
        const s = this.hatWidth;
        const h = this.hatHeight;
        const r = ((4 * h * h) + (s * s)) / (8 * h);
        const a = degrees(4 * Math.atan(2 * h / s));
        const sa = a / 2;
        const sp = Math.min(s * 1.7, this.width() - this.corner);

        context.beginPath();

        context.moveTo(0, h + this.corner);

        // top arc:
        context.arc(
            s / 2,
            r,
            r,
            radians(-sa - 90),
            radians(-90),
            false
        );
        context.bezierCurveTo(
            s,
            0,
            s,
            h,
            sp,
            h
        );

        // top right:
        context.arc(
            this.width() - this.corner,
            h + this.corner,
            this.corner,
            radians(-90),
            radians(-0),
            false
        );

        context.closePath();
        context.fill();
    }

    drawBody(context) {
        context.fillRect(
            0,
            this.hatHeight + Math.floor(this.corner) - 1,
            this.width(),
            this.height() - Math.floor(this.corner * 3) - this.hatHeight + 2
        );
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
        context.moveTo(shift, this.hatHeight + shift);
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
        context.moveTo(x - shift, this.corner + this.hatHeight + shift);
        context.lineTo(x - shift, this.height() - this.corner * 2);
        context.stroke();
    }

    drawTopDentEdge() {
        return null;
    }

    drawTopLeftEdge(context) {
        const shift = this.edge * 0.5;
        const s = this.hatWidth;
        const h = this.hatHeight;
        const r = ((4 * h * h) + (s * s)) / (8 * h);
        const a = degrees(4 * Math.atan(2 * h / s));
        const sa = a / 2;
        const sp = Math.min(s * 1.7, this.width() - this.corner);
        let gradient;

        gradient = context.createRadialGradient(
            s / 2,
            r,
            r - this.edge,
            s / 2,
            r,
            r
        );
        gradient.addColorStop(1, this.cachedClrBright);
        gradient.addColorStop(0, this.cachedClr);

        context.lineWidth = this.edge;
        context.lineJoin = 'round';
        context.lineCap = 'round';

        context.strokeStyle = gradient;
        context.beginPath();
        context.arc(
            Math.round(s / 2),
            r,
            r - shift,
            radians(-sa - 90),
            radians(-90),
            false
        );
        context.moveTo(s / 2, shift);
        context.bezierCurveTo(
            s,
            shift,
            s,
            h + shift,
            sp,
            h + shift
        );
        context.lineTo(this.width() - this.corner, h + shift);
        context.stroke();
    }
}