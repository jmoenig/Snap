// PushButtonMorph /////////////////////////////////////////////////////

// I am a Button with rounded corners and 3D-ish graphical effects

import TriggerMorph from "../morphic/morph/TriggerMorph";

// PushButtonMorph preferences settings:

PushButtonMorph.prototype.fontSize = 10;
PushButtonMorph.prototype.fontStyle = 'sans-serif';
PushButtonMorph.prototype.labelColor = new Color(0, 0, 0);
PushButtonMorph.prototype.labelShadowColor = new Color(255, 255, 255);
PushButtonMorph.prototype.labelShadowOffset = new Point(1, 1);

PushButtonMorph.prototype.color = new Color(220, 220, 220);
PushButtonMorph.prototype.pressColor = new Color(115, 180, 240);
PushButtonMorph.prototype.highlightColor
    = PushButtonMorph.prototype.pressColor.lighter(50);
PushButtonMorph.prototype.outlineColor = new Color(30, 30, 30);
PushButtonMorph.prototype.outlineGradient = false;
PushButtonMorph.prototype.contrast = 60;

PushButtonMorph.prototype.edge = 2;
PushButtonMorph.prototype.corner = 5;
PushButtonMorph.prototype.outline = 1.00001;
PushButtonMorph.prototype.padding = 3;

// PushButtonMorph instance creation:

export default class PushButtonMorph extends TriggerMorph {
    constructor(target, action, labelString, environment, hint, template) {
        this.init(
            target,
            action,
            labelString,
            environment,
            hint,
            template
        );
    }

    init(target, action, labelString, environment, hint, template) {
        // additional properties:
        this.is3D = false; // for "flat" design exceptions
        this.target = target || null;
        this.action = action || null;
        this.environment = environment || null;
        this.labelString = labelString || null;
        this.label = null;
        this.labelMinExtent = new Point(0, 0);
        this.hint = hint || null;
        this.template = template || null; // for pre-computed backbrounds
        // if a template is specified, its background images are used as cache
        this.enabled = true;

        // initialize inherited properties:
        TriggerMorph.uber.init.call(this);

        // override inherited properites:
        this.color = PushButtonMorph.prototype.color;
        this.drawNew();
        this.fixLayout();
    }

    // PushButtonMorph layout:

    fixLayout() {
        // make sure I at least encompass my label
        if (this.label !== null) {
            const padding = this.padding * 2 + this.outline * 2 + this.edge * 2;
            this.setExtent(new Point(
                Math.max(this.label.width(), this.labelMinExtent.x) + padding,
                Math.max(this.label instanceof StringMorph ?
                        this.label.rawHeight() :
                            this.label.height(), this.labelMinExtent.y) + padding
            ));
            this.label.setCenter(this.center());
        }
    
        if (this.label) {
            this.label.setCenter(this.center().add(1));
        
            if (this.label) {
                this.label.setCenter(this.center());
            
        if (this.label) {
            this.label.setCenter(this.center());
        }
    }

    drawOutline(context) {
        let outlineStyle;
        const isFlat = MorphicPreferences.isFlat && !this.is3D;

        if (!this.outline || isFlat) {return null; }
        if (this.outlineGradient) {
            outlineStyle = context.createLinearGradient(
                0,
                0,
                0,
                this.height()
            );
            outlineStyle.addColorStop(0, this.outlineColor.darker().toString());
            outlineStyle.addColorStop(1, 'white');
        } else {
            outlineStyle = this.outlineColor.toString();
        }
        context.fillStyle = outlineStyle;
        context.beginPath();
        this.outlinePath(
            context,
            isFlat ? 0 : this.corner,
            0
        );
        context.closePath();
        context.fill();
    }

    drawBackground(context, color) {
        const isFlat = MorphicPreferences.isFlat && !this.is3D;

        context.fillStyle = color.toString();
        context.beginPath();
        this.outlinePath(
            context,
            isFlat ? 0 : Math.max(this.corner - this.outline, 0),
            this.outline
        );
        context.closePath();
        context.fill();
        context.lineWidth = this.outline;
    }

    drawEdges(context, color, topColor, bottomColor) {
        if (MorphicPreferences.isFlat && !this.is3D) {return; }
        const minInset = Math.max(this.corner, this.outline + this.edge);
        const w = this.width();
        const h = this.height();
        let gradient;

        // top:
        gradient = context.createLinearGradient(
            0,
            this.outline,
            0,
            this.outline + this.edge
        );
        gradient.addColorStop(0, topColor.toString());
        gradient.addColorStop(1, color.toString());

        context.strokeStyle = gradient;
        context.lineCap = 'round';
        context.lineWidth = this.edge;
        context.beginPath();
        context.moveTo(minInset, this.outline + this.edge / 2);
        context.lineTo(w - minInset, this.outline + this.edge / 2);
        context.stroke();

        // top-left corner:
        gradient = context.createRadialGradient(
            this.corner,
            this.corner,
            Math.max(this.corner - this.outline - this.edge, 0),
            this.corner,
            this.corner,
            Math.max(this.corner - this.outline, 0)
        );
        gradient.addColorStop(0, color.toString());
        gradient.addColorStop(1, topColor.toString());

        context.strokeStyle = gradient;
        context.lineCap = 'round';
        context.lineWidth = this.edge;
        context.beginPath();
        context.arc(
            this.corner,
            this.corner,
            Math.max(this.corner - this.outline - this.edge / 2, 0),
            radians(180),
            radians(270),
            false
        );
        context.stroke();

        // left:
        gradient = context.createLinearGradient(
            this.outline,
            0,
            this.outline + this.edge,
            0
        );
        gradient.addColorStop(0, topColor.toString());
        gradient.addColorStop(1, color.toString());

        context.strokeStyle = gradient;
        context.lineCap = 'round';
        context.lineWidth = this.edge;
        context.beginPath();
        context.moveTo(this.outline + this.edge / 2, minInset);
        context.lineTo(this.outline + this.edge / 2, h - minInset);
        context.stroke();

        // bottom:
        gradient = context.createLinearGradient(
            0,
            h - this.outline,
            0,
            h - this.outline - this.edge
        );
        gradient.addColorStop(0, bottomColor.toString());
        gradient.addColorStop(1, color.toString());

        context.strokeStyle = gradient;
        context.lineCap = 'round';
        context.lineWidth = this.edge;
        context.beginPath();
        context.moveTo(minInset, h - this.outline - this.edge / 2);
        context.lineTo(w - minInset, h - this.outline - this.edge / 2);
        context.stroke();

        // bottom-right corner:
        gradient = context.createRadialGradient(
            w - this.corner,
            h - this.corner,
            Math.max(this.corner - this.outline - this.edge, 0),
            w - this.corner,
            h - this.corner,
            Math.max(this.corner - this.outline, 0)
        );
        gradient.addColorStop(0, color.toString());
        gradient.addColorStop(1, bottomColor.toString());

        context.strokeStyle = gradient;
        context.lineCap = 'round';
        context.lineWidth = this.edge;
        context.beginPath();
        context.arc(
            w - this.corner,
            h - this.corner,
            Math.max(this.corner - this.outline - this.edge / 2, 0),
            radians(0),
            radians(90),
            false
        );
        context.stroke();

        // right:
        gradient = context.createLinearGradient(
            w - this.outline,
            0,
            w - this.outline - this.edge,
            0
        );
        gradient.addColorStop(0, bottomColor.toString());
        gradient.addColorStop(1, color.toString());

        context.strokeStyle = gradient;
        context.lineCap = 'round';
        context.lineWidth = this.edge;
        context.beginPath();
        context.moveTo(w - this.outline - this.edge / 2, minInset);
        context.lineTo(w - this.outline - this.edge / 2, h - minInset);
        context.stroke();
    }

    createBackgrounds() {
        let context;
        const ext = this.extent();

        if (this.template) { // take the backgrounds images from the template
            this.image = this.template.image;
            this.normalImage = this.template.normalImage;
            this.highlightImage = this.template.highlightImage;
            this.pressImage = this.template.pressImage;
            return null;
        }

        this.normalImage = newCanvas(ext);
        context = this.normalImage.getContext('2d');
        this.drawOutline(context);
        this.drawBackground(context, this.color);
        this.drawEdges(
            context,
            this.color,
            this.color.lighter(this.contrast),
            this.color.darker(this.contrast)
        );

        this.highlightImage = newCanvas(ext);
        context = this.highlightImage.getContext('2d');
        this.drawOutline(context);
        this.drawBackground(context, this.highlightColor);
        this.drawEdges(
            context,
            this.highlightColor,
            this.highlightColor.lighter(this.contrast),
            this.highlightColor.darker(this.contrast)
        );

        this.pressImage = newCanvas(ext);
        context = this.pressImage.getContext('2d');
        this.drawOutline(context);
        this.drawBackground(context, this.pressColor);
        this.drawEdges(
            context,
            this.pressColor,
            this.pressColor.darker(this.contrast),
            this.pressColor.lighter(this.contrast)
        );

        this.image = this.normalImage;
    }

    createLabel() {
        const shading = !MorphicPreferences.isFlat || this.is3D;

        if (this.label !== null) {
            this.label.destroy();
        }
        if (this.labelString instanceof SymbolMorph) {
            this.label = this.labelString.fullCopy();
            if (shading) {
                this.label.shadowOffset = this.labelShadowOffset;
                this.label.shadowColor = this.labelShadowColor;
            }
            this.label.color = this.labelColor;
            this.label.drawNew();
        } else {
            this.label = new StringMorph(
                localize(this.labelString),
                this.fontSize,
                this.fontStyle,
                true,
                false,
                false,
                shading ? this.labelShadowOffset : null,
                this.labelShadowColor,
                this.labelColor
            );
        }
        this.add(this.label);
    }

    // PushButtonMorph states

    disable() {
        this.enabled = false;
        this.forAllChildren(child => {
            child.alpha = 0.3;
        });
    }

    enable() {
        this.enabled = true;
        this.forAllChildren(child => {
            child.alpha = 1;
        });
    }
}

// PushButtonMorph drawing:

PushButtonMorph.prototype.outlinePath = BoxMorph.prototype.outlinePath;