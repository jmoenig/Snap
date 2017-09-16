// BooleanSlotMorph ////////////////////////////////////////////////////

/*
    I am a diamond-shaped argument slot.
    My block spec is

    %b         - Boolean
    %boolUE    - Boolean unevaluated

    I can be directly edited. When the user clicks on me I toggle
    between <true>, <false> and <null> values.

    evaluate() returns my value.

    my most important public attributes and accessors are:

    value                      - user editable contents (Boolean or null)
    setContents(Boolean/null)  - display the argument (Boolean or null)
*/

import ArgMorph from "./ArgMorph";

// BooleanSlotMorph preferences settings

BooleanSlotMorph.prototype.isTernary = true;

// BooleanSlotMorph instance creation:

export default class BooleanSlotMorph extends ArgMorph {
    constructor(initialValue) {
        this.init(initialValue);
    }

    init(initialValue) {
        this.value = (typeof initialValue === 'boolean') ? initialValue : null;
        this.isUnevaluated = false;
        super.init.call(this);
    }

    getSpec() {
        return this.isUnevaluated ? '%boolUE' : '%b';
    }

    // BooleanSlotMorph accessing:

    evaluate() {
        return this.value;
    }

    isEmptySlot() {
        return this.value === null;
    }

    isBinary() {
        return !this.isTernary &&
            isNil(this.parentThatIsA(RingMorph)) &&
            !isNil(this.parentThatIsA(ScriptsMorph));
    }

    setContents(boolOrNull, silently) {
        this.value = (typeof boolOrNull === 'boolean') ? boolOrNull : null;
        if (silently) {return; }
        this.drawNew();
        this.changed();
    }

    toggleValue() {
        const target = this.selectForEdit();
        let ide;
        if (target !== this) {
            return this.toggleValue.call(target);
        }
        ide = this.parentThatIsA(IDE_Morph);
        if (this.isStatic || this.isBinary()) {
            this.setContents(!this.value, true);
        } else {
            switch (this.value) {
            case true:
                this.value = false;
                break;
            case false:
                this.value = null;
                break;
            default:
                this.value = true;
            }
        }
        if (ide && !ide.isAnimating) {
            this.drawNew();
            this.changed();
            return;
        }
        this.drawNew(3);
        this.changed();
        this.nextSteps ([
            function () {
                this.drawNew(2);
                this.changed();
            },
            function () {
                this.drawNew(1);
                this.changed();
            },
            function () {
                this.drawNew();
                this.changed();
            },
        ]);
    }

    // BooleanSlotMorph events:

    mouseClickLeft() {
        this.toggleValue();
        if (isNil(this.value)) {return; }
        this.reactToSliderEdit();
    }

    mouseEnter() {
        if (this.isStatic) {return; }
        if (this.value === false && !this.isBinary()) {
            const oldValue = this.value;
            this.value = null;
            this.drawNew(3);
            this.changed();
            this.value = oldValue;
            return;
        }
        this.drawNew(1);
        this.changed();
    }

    mouseLeave() {
        if (this.isStatic) {return; }
        this.drawNew();
        this.changed();
    }

    // BooleanSlotMorph menu:

    userMenu() {
        const menu = new MenuMorph(this);
        if (!StageMorph.prototype.enableCodeMapping) {
            return this.parent.userMenu();
        }
        if (this.evaluate() === true) {
            menu.addItem(
                'code true mapping...',
                'mapTrueToCode'
            );
        } else {
            menu.addItem(
                'code false mapping...',
                'mapFalseToCode'
            );
        }
        return menu;
    }

    // BooleanSlotMorph code mapping

    /*
        code mapping lets you use blocks to generate arbitrary text-based
        source code that can be exported and compiled / embedded elsewhere,
        it's not part of Snap's evaluator and not needed for Snap itself
    */

    mapTrueToCode() {
        // private - open a dialog box letting the user map code via the GUI
        new DialogBoxMorph(
            this,
            code => {
                StageMorph.prototype.codeMappings['true'] = code;
            },
            this
        ).promptCode(
            'Code mapping - true',
            StageMorph.prototype.codeMappings['true'] || 'true',
            this.world()
        );
    }

    mapFalseToCode() {
        // private - open a dialog box letting the user map code via the GUI
        new DialogBoxMorph(
            this,
            code => {
                StageMorph.prototype.codeMappings['false'] = code;
            },
            this
        ).promptCode(
            'Code mapping - false',
            StageMorph.prototype.codeMappings['false'] || 'false',
            this.world()
        );
    }

    mappedCode() {
        if (this.evaluate() === true) {
            return StageMorph.prototype.codeMappings.boolTrue || 'true';
        }
        return StageMorph.prototype.codeMappings.boolFalse || 'false';
    }

    // BooleanSlotMorph drawing:

    drawNew(progress) {
        // "progress" is an optional number sliding the knob
        // on a range between 0 and 4
        let context;

        const textLabel = this.isStatic ? this.textLabel() : null;
        let h;

        if (textLabel) {
            h = textLabel.height + (this.edge * 3);
            this.silentSetExtent(new Point(
                textLabel.width + (h * 1.5) + (this.edge * 2),
                h
            ));
        } else {
            this.silentSetExtent(new Point(
                (this.fontSize + this.edge * 2) * 2,
                this.fontSize + this.edge * 2
            ));
        }
        if (!(this.cachedNormalColor)) { // unless flashing
            this.color = this.parent ?
                    this.parent.color : new Color(200, 200, 200);
        }
        this.cachedClr = this.color.toString();
        this.cachedClrBright = this.bright();
        this.cachedClrDark = this.dark();
        this.image = newCanvas(this.extent());
        context = this.image.getContext('2d');
        this.drawDiamond(context, progress);
        this.drawLabel(context, textLabel);
        this.drawKnob(context, progress);
    }

    drawDiamond(context, progress) {
        const w = this.width();
        const h = this.height();
        const r = h / 2;
        const w2 = w / 2;
        const shift = this.edge / 2;
        let gradient;

        // draw the 'flat' shape:
        if (this.cachedNormalColor) { // if flashing
            context.fillStyle = this.color.toString();
        } else {
            switch (this.value) {
            case true:
                context.fillStyle = 'rgb(0, 200, 0)';
                break;
            case false:
                context.fillStyle = 'rgb(200, 0, 0)';
                break;
            default:
                context.fillStyle = this.color.darker(25).toString();
            }
        }

        if (progress && !this.isEmptySlot()) {
            // left half:
            context.fillStyle = 'rgb(0, 200, 0)';
            context.beginPath();
            context.moveTo(0, r);
            context.lineTo(r, 0);
            context.lineTo(w2, 0);
            context.lineTo(w2, h);
            context.lineTo(r, h);
            context.closePath();
            context.fill();

            // right half:
            context.fillStyle = 'rgb(200, 0, 0)';
            context.beginPath();
            context.moveTo(w2, 0);
            context.lineTo(w - r, 0);
            context.lineTo(w, r);
            context.lineTo(w - r, h);
            context.lineTo(w2, h);
            context.closePath();
            context.fill();
        } else {
            context.beginPath();
            context.moveTo(0, r);
            context.lineTo(r, 0);
            context.lineTo(w - r, 0);
            context.lineTo(w, r);
            context.lineTo(w - r, h);
            context.lineTo(r, h);
            context.closePath();
            context.fill();
        }

        if (MorphicPreferences.isFlat) {return; }

        // add 3D-Effect:
        context.lineWidth = this.edge;
        context.lineJoin = 'round';
        context.lineCap = 'round';

        context.shadowOffsetX = shift;
        context.shadowBlur = shift;
        context.shadowColor = 'black';

        // top edge: left corner
        gradient = context.createLinearGradient(
            0,
            r,
            this.edge * 0.6,
            r + (this.edge * 0.6)
        );
        gradient.addColorStop(1, this.cachedClrDark);
        gradient.addColorStop(0, this.cachedClr);
        context.strokeStyle = gradient;
        context.beginPath();
        context.moveTo(shift, r);
        context.lineTo(r, shift);
        context.closePath();
        context.stroke();

        // top edge: straight line
        context.shadowOffsetX = 0;
        context.shadowOffsetY = shift;
        context.shadowBlur = this.edge;

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
        context.closePath();
        context.stroke();

        context.shadowOffsetY = 0;
        context.shadowBlur = 0;

        // bottom edge: right corner
        gradient = context.createLinearGradient(
            w - r - (this.edge * 0.6),
            h - (this.edge * 0.6),
            w - r,
            h
        );
        gradient.addColorStop(1, this.cachedClr);
        gradient.addColorStop(0, this.cachedClrBright);
        context.strokeStyle = gradient;
        context.beginPath();
        context.moveTo(w - r, h - shift);
        context.lineTo(w - shift, r);
        context.closePath();
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
        context.moveTo(r, h - shift);
        context.lineTo(w - r - shift, h - shift);
        context.closePath();
        context.stroke();
    }

    drawLabel(context, textLabel) {
        const w = this.width();
        const r = this.height() / 2 - this.edge;
        const r2 = r / 2;
        const shift = this.edge / 2;
        let x;
        let y = this.height() / 2;

        if (this.isEmptySlot()) {
            return;
        }
        if (textLabel) {
            y = (this.height() - textLabel.height) / 2;
            if (this.value) {
                x = this.height() / 2;
            } else {
                x = this.width() - (this.height() / 2) - textLabel.width;
            }
        if (!MorphicPreferences.isFlat) {
            context.shadowOffsetX = -shift;
            context.shadowOffsetY = -shift;
            context.shadowBlur = shift;
            context.shadowColor = this.value ? 'rgb(0, 100, 0)' : 'rgb(100, 0, 0)';
        }
            context.drawImage(textLabel, x, y);
            return;
        }
        // "tick:"
        x = r + (this.edge * 2) + shift;
        if (!MorphicPreferences.isFlat) {
            context.shadowOffsetX = -shift;
            context.shadowOffsetY = -shift;
            context.shadowBlur = shift;
            context.shadowColor = 'rgb(0, 100, 0)';
        }
        context.strokeStyle = 'white';
        context.lineWidth = this.edge + shift;
        context.lineCap = 'round';
        context.lineJoin = 'miter';
        context.beginPath();
        context.moveTo(x - r2, y);
        context.lineTo(x, y + r2);
        context.lineTo(x + r2, r2 + this.edge);
        context.stroke();

        // "cross:"
        x = w - y - (this.edge * 2);
        if (!MorphicPreferences.isFlat) {
            context.shadowOffsetX = -shift;
            context.shadowOffsetY = -shift;
            context.shadowBlur = shift;
            context.shadowColor = 'rgb(100, 0, 0)';
        }
        context.strokeStyle = 'white';
        context.lineWidth = this.edge;
        context.lineCap = 'butt';
        context.beginPath();
        context.moveTo(x - r2, y - r2);
        context.lineTo(x + r2, y + r2);
        context.moveTo(x - r2, y + r2);
        context.lineTo(x + r2, y - r2);
        context.stroke();
    }

    drawKnob(context, progress) {
        const w = this.width();
        const r = this.height() / 2;
        const shift = this.edge / 2;
        const slideStep = (this.width() - this.height()) / 4 * (progress || 0);
        let gradient;
        let x;
        const y = r;
        const outline = PushButtonMorph.prototype.outline / 2;
        const outlineColor = PushButtonMorph.prototype.outlineColor;
        const color = PushButtonMorph.prototype.color;
        const contrast = PushButtonMorph.prototype.contrast;
        const topColor = color.lighter(contrast);
        const bottomColor = color.darker(contrast);

        // draw the 'flat' shape:
        switch (this.value) {
        case false:
            x = r + slideStep;
            if (!MorphicPreferences.isFlat) {
                context.shadowOffsetX = shift;
                context.shadowOffsetY = 0;
                context.shadowBlur = shift;
                context.shadowColor = 'black';
            }
            break;
        case true:
            x = w - r - slideStep;
            if (!MorphicPreferences.isFlat) {
                context.shadowOffsetX = 0;
                context.shadowOffsetY = 0;
                context.shadowBlur = 0;
            }
            break;
        default:
            if (!progress) {return; }
            x = r;
            if (!MorphicPreferences.isFlat) {
                context.shadowOffsetX = shift;
                context.shadowOffsetY = 0;
                context.shadowBlur = shift;
                context.shadowColor = 'black';
            }
            context.globalAlpha = 0.2 * ((progress || 0) + 1);
        }

        context.fillStyle = color.toString();
        context.beginPath();
        context.arc(x, y, r, radians(0), radians(360));
        context.closePath();
        context.fill();

        if (MorphicPreferences.isFlat) {return; }

        // add 3D-Effect
        // outline:
        context.shadowOffsetX = 0;
        context.shadowBlur = 0;
        context.shadowColor = 'black';
        context.lineWidth = outline;
        context.strokeStyle = outlineColor.toString();
        context.beginPath();
        context.arc(x, y, r - (outline / 2), radians(0), radians(360));
        context.stroke();

        // top-left:
        gradient = context.createRadialGradient(
            x,
            y,
            r - outline - this.edge,
            x,
            y,
            r - outline
        );
        gradient.addColorStop(1, topColor.toString());
        gradient.addColorStop(0, color.toString());

        context.strokeStyle = gradient;
        context.lineCap = 'round';
        context.lineWidth = this.edge;
        context.beginPath();
        context.arc(
            x,
            y,
            r - outline - this.edge / 2,
            radians(180),
            radians(270),
            false
        );
        context.stroke();

        // bottom-right:
        gradient = context.createRadialGradient(
            x,
            y,
            r - outline - this.edge,
            x,
            y,
            r - outline
        );
        gradient.addColorStop(1, bottomColor.toString());
        gradient.addColorStop(0, color.toString());

        context.strokeStyle = gradient;
        context.lineCap = 'round';
        context.lineWidth = this.edge;
        context.beginPath();
        context.arc(
            x,
            y,
            r - outline - this.edge / 2,
            radians(0),
            radians(90),
            false
        );
        context.stroke();
    }

    textLabel() {
        if (this.isEmptySlot()) {return null; }
        let t;
        let f;
        let img;
        let lbl;
        let x;
        let y;
        t = new StringMorph(
            localize('true'),
            this.fontSize,
            null,
            true, // bold
            null,
            null,
            null,
            null,
            new Color(255, 255, 255)
        ).image;
        f = new StringMorph(
            localize('false'),
            this.fontSize,
            null,
            true, // bold
            null,
            null,
            null,
            null,
            new Color(255, 255, 255)
        ).image;
        img = newCanvas(new Point(
            Math.max(t.width, f.width),
            Math.max(t.height, f.height)
        ));
        lbl = this.value ? t : f;
        x = (img.width - lbl.width) / 2;
        y = (img.height - lbl.height) / 2;
        img.getContext('2d').drawImage(lbl, x, y);
        return img;
    }
}