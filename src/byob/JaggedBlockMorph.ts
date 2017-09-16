// JaggedBlockMorph ////////////////////////////////////////////////////

import ReporterBlockMorph from "../blocks/ReporterBlockMorph";

/*
    I am a reporter block with jagged left and right edges conveying the
    appearance of having the broken out of a bigger block. I am used to
    display input types in the long form input dialog.
*/

// JaggedBlockMorph preferences settings:

JaggedBlockMorph.prototype.jag = 5;

// JaggedBlockMorph instance creation:

export default class JaggedBlockMorph extends ReporterBlockMorph {
    constructor(spec) {
        this.init(spec);
    }

    init(spec) {
        super.init.call(this);
        if (spec) {this.setSpec(spec); }
        if (spec === '%cs') {
            this.minWidth = 25;
            this.fixLayout();
        }
    }

    // JaggedBlockMorph drawing:

    drawNew() {
        let context;

        this.cachedClr = this.color.toString();
        this.cachedClrBright = this.bright();
        this.cachedClrDark = this.dark();
        this.image = newCanvas(this.extent());
        context = this.image.getContext('2d');
        context.fillStyle = this.cachedClr;

        this.drawBackground(context);
        if (!MorphicPreferences.isFlat) {
            this.drawEdges(context);
        }

        // erase holes
        this.eraseHoles(context);
    }

    drawBackground(context) {
        const w = this.width();
        const h = this.height();
        const jags = Math.round(h / this.jag);
        const delta = h / jags;
        let i;
        let y;

        context.fillStyle = this.cachedClr;
        context.beginPath();

        context.moveTo(0, 0);
        context.lineTo(w, 0);

        y = 0;
        for (i = 0; i < jags; i += 1) {
            y += delta / 2;
            context.lineTo(w - this.jag / 2, y);
            y += delta / 2;
            context.lineTo(w, y);
        }

        context.lineTo(0, h);
        y = h;
        for (i = 0; i < jags; i += 1) {
            y -= delta / 2;
            context.lineTo(this.jag / 2, y);
            y -= delta / 2;
            context.lineTo(0, y);
        }

        context.closePath();
        context.fill();
    }

    drawEdges(context) {
        const w = this.width();
        const h = this.height();
        const jags = Math.round(h / this.jag);
        const delta = h / jags;
        const shift = this.edge / 2;
        let gradient;
        let i;
        let y;

        context.lineWidth = this.edge;
        context.lineJoin = 'round';
        context.lineCap = 'round';

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
        context.moveTo(shift, shift);
        context.lineTo(w - shift, shift);
        context.stroke();

        y = 0;
        for (i = 0; i < jags; i += 1) {
            context.strokeStyle = this.cachedClrDark;
            context.beginPath();
            context.moveTo(w - shift, y);
            y += delta / 2;
            context.lineTo(w - this.jag / 2 - shift, y);
            context.stroke();
            y += delta / 2;
        }

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
        context.moveTo(w - shift, h - shift);
        context.lineTo(shift, h - shift);
        context.stroke();

        y = h;
        for (i = 0; i < jags; i += 1) {
            context.strokeStyle = this.cachedClrBright;
            context.beginPath();
            context.moveTo(shift, y);
            y -= delta / 2;
            context.lineTo(this.jag / 2 + shift, y);
            context.stroke();
            y -= delta / 2;
        }
    }
}