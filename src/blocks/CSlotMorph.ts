// CSlotMorph ////////////////////////////////////////////////////

/*
    I am a C-shaped input slot. I can nest command blocks and also accept
    reporters (containing reified scripts).

    my most important accessor is

    nestedBlock()    - the command block I encompass, if any (inherited)

    My command spec is %c

    evaluate() returns my nested block or null
*/

import CommandSlotMorph from "./CommandSlotMorph";

// CSlotMorph instance creation:

export default class CSlotMorph extends CommandSlotMorph {
    constructor() {
        this.init();
    }

    init(silently) {
        CommandSlotMorph.uber.init.call(this, null, true); // silently
        this.isHole = true;
        this.isLambda = false; // see Process.prototype.evaluateInput
        this.color = new Color(0, 17, 173);
        this.setExtent(
            new Point(230, this.corner * 4 + this.cSlotPadding),
            silently
        );
    }

    getSpec() {
        return '%c';
    }

    mappedCode(definitions) {
        const code = StageMorph.prototype.codeMappings.reify || '<#1>';
        const codeLines = code.split('\n');
        const nested = this.nestedBlock();
        const part = nested ? nested.mappedCode(definitions) : '';
        const partLines = (part.toString()).split('\n');
        const rx = new RegExp('<#1>', 'g');

        codeLines.forEach((codeLine, idx) => {
            let prefix = '';
            let indent;
            if (codeLine.trimLeft().indexOf('<#1>') === 0) {
                indent = codeLine.indexOf('<#1>');
                prefix = codeLine.slice(0, indent);
            }
            codeLines[idx] = codeLine.replace(
                new RegExp('<#1>'),
                partLines.join(`\n${prefix}`)
            );
            codeLines[idx] = codeLines[idx].replace(rx, partLines.join('\n'));
        });

        return codeLines.join('\n');
    }

    // CSlotMorph layout:

    fixLayout() {
        const nb = this.nestedBlock();
        if (nb) {
            nb.setPosition(
                new Point(
                    this.left() + this.inset,
                    this.top() + this.corner
                )
            );
            this.setHeight(nb.fullBounds().height() + this.corner);
            this.setWidth(nb.fullBounds().width() + (this.cSlotPadding * 2));
        } else {
            this.setHeight(this.corner * 4  + this.cSlotPadding); // default
            this.setWidth(
                this.corner * 4
                    + (this.inset * 2)
                    + this.dent
                    + (this.cSlotPadding * 2)
            ); // default
        }
        if (this.parent.fixLayout) {
            this.parent.fixLayout();
        }
    }

    // CSlotMorph drawing:

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
        this.drawTopRightEdge(context);
        this.drawTopEdge(context, this.inset, this.corner);
        this.drawTopLeftEdge(context);
        this.drawBottomEdge(context);
        this.drawRightEdge(context);
    }

    drawFlat(context) {
        context.beginPath();

        // top line:
        context.moveTo(0, 0);
        context.lineTo(this.width(), 0);

        // top right:
        context.arc(
            this.width() - this.corner,
            0,
            this.corner,
            radians(90),
            radians(0),
            true
        );

        // jigsaw shape:
        context.lineTo(this.width() - this.corner, this.corner);
        context.lineTo(
            (this.inset * 2) + (this.corner * 3) + this.dent,
            this.corner
        );
        context.lineTo(
            (this.inset * 2) + (this.corner * 2) + this.dent,
            this.corner * 2
        );
        context.lineTo(
            (this.inset * 2) + (this.corner * 2),
            this.corner * 2
        );
        context.lineTo(
            (this.inset * 2) + this.corner,
            this.corner
        );
        context.lineTo(
            this.inset + this.corner,
            this.corner
        );
        context.arc(
            this.inset + this.corner,
            this.corner * 2,
            this.corner,
            radians(270),
            radians(180),
            true
        );

        // bottom:
        context.lineTo(
            this.inset,
            this.height() - (this.corner * 2)
        );
        context.arc(
            this.inset + this.corner,
            this.height() - (this.corner * 2),
            this.corner,
            radians(180),
            radians(90),
            true
        );
        context.lineTo(
            this.width() - this.corner,
            this.height() - this.corner
        );
        context.arc(
            this.width() - this.corner,
            this.height(),
            this.corner,
            radians(-90),
            radians(-0),
            false
        );
        context.lineTo(0, this.height());

        // fill:
        context.closePath();
        context.fill();
    }

    drawTopRightEdge(context) {
        const shift = this.edge * 0.5;
        const x = this.width() - this.corner;
        const y = 0;
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

    drawTopEdge(context, x, y) {
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
        context.moveTo(x + this.corner, y - shift);
        context.lineTo(x + this.corner + this.inset - shift, y - shift);
        context.stroke();

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
            (x + this.inset + (this.corner * 2) + this.dent) - shift,
            (y + this.corner - shift) - shift,
            (x + this.inset + (this.corner * 2) + this.dent) + (shift * 0.7),
            (y + this.corner - shift) + (shift * 0.7)
        );
        rightGradient.addColorStop(0, this.cachedClr);
        rightGradient.addColorStop(1, this.cachedClrDark);


        context.strokeStyle = rightGradient;
        context.beginPath();
        context.moveTo(
            x + this.inset + (this.corner * 2) + this.dent,
            y + this.corner - shift
        );
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

    drawTopLeftEdge(context) {
        const shift = this.edge * 0.5;
        let gradient;

        gradient = context.createRadialGradient(
            this.corner + this.inset,
            this.corner * 2,
            this.corner,
            this.corner + this.inset,
            this.corner * 2,
            this.corner + this.edge
        );
        gradient.addColorStop(0, this.cachedClrDark);
        gradient.addColorStop(1, this.cachedClr);

        context.lineWidth = this.edge;
        context.lineJoin = 'round';
        context.lineCap = 'round';

        context.strokeStyle = gradient;

        context.beginPath();
        context.arc(
            this.corner + this.inset,
            this.corner * 2,
            this.corner + shift,
            radians(-180),
            radians(-90),
            false
        );
        context.stroke();
    }

    drawRightEdge(context) {
        const shift = this.edge * 0.5;
        const x = this.inset;
        let gradient;

        gradient = context.createLinearGradient(x - this.edge, 0, x, 0);
        gradient.addColorStop(0, this.cachedClr);
        gradient.addColorStop(1, this.cachedClrDark);

        context.lineWidth = this.edge;
        context.lineJoin = 'round';
        context.lineCap = 'round';

        context.strokeStyle = gradient;
        context.beginPath();
        context.moveTo(x - shift, this.corner * 2);
        context.lineTo(x - shift, this.height() - this.corner * 2);
        context.stroke();
    }

    drawBottomEdge(context) {
        const shift = this.edge * 0.5;
        let gradient;
        let upperGradient;

        context.lineWidth = this.edge;
        context.lineJoin = 'round';
        context.lineCap = 'round';

        upperGradient = context.createRadialGradient(
            this.corner + this.inset,
            this.height() - (this.corner * 2),
            this.corner, /*- this.edge*/ // uncomment for half-tone
            this.corner + this.inset,
            this.height() - (this.corner * 2),
            this.corner + this.edge
        );
        upperGradient.addColorStop(0, this.cachedClrBright);
        upperGradient.addColorStop(1, this.cachedClr);
        context.strokeStyle = upperGradient;
        context.beginPath();
        context.arc(
            this.corner + this.inset,
            this.height() - (this.corner * 2),
            this.corner + shift,
            radians(180),
            radians(90),
            true
        );
        context.stroke();

        gradient = context.createLinearGradient(
            0,
            this.height() - this.corner,
            0,
            this.height() - this.corner + this.edge
        );
        gradient.addColorStop(0, this.cachedClrBright);
        gradient.addColorStop(1, this.cachedClr);

        context.strokeStyle = gradient;
        context.beginPath();
        context.moveTo(
            this.inset + this.corner,
            this.height() - this.corner + shift
        );
        context.lineTo(
            this.width() - this.corner,
            this.height() - this.corner + shift
        );

        context.stroke();
    }
}