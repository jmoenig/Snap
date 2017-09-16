// ToggleButtonMorph ///////////////////////////////////////////////////////

/*
    I am a two-state PushButton. When my state is "true" I keep my "pressed"
    background color. I can also be set to not auto-layout my bounds, in
    which case my label will left-align.
*/

import PushButtonMorph from "./PushButtonMorph";

// ToggleButton settings

ToggleButtonMorph.prototype.contrast = 30;

// ToggleButtonMorph instance creation:

export default class ToggleButtonMorph extends PushButtonMorph {
    constructor(
        // color overrides, <array>: [normal, highlight, pressed]
        colors,
        target,
        // a toggle function
        action,
        labelString,
        // predicate/selector
        query,
        environment,
        hint,
        // optional, for cached background images
        template,
        // <num> optional, if specified label will left-align
        minWidth,
        // <bool> show press color on left edge (e.g. category)
        hasPreview,
        // treat label as picture, i.e. don't apply typography
        isPicture) {
        this.init(
            colors,
            target,
            action,
            labelString,
            query,
            environment,
            hint,
            template,
            minWidth,
            hasPreview,
            isPicture
        );
    }

    init(
        colors,
        target,
        action,
        labelString,
        query,
        environment,
        hint,
        template,
        minWidth,
        hasPreview,
        isPicture) {
        // additional properties:
        this.state = false;
        this.query = query || (() => true);
        this.minWidth = minWidth || null;
        this.hasPreview = hasPreview || false;
        this.isPicture = isPicture || false;
        this.trueStateLabel = null;

        // initialize inherited properties:
        super.init.call(
            this,
            target,
            action,
            labelString,
            environment,
            hint,
            template
        );

        // override default colors if others are specified
        if (colors) {
            this.color = colors[0];
            this.highlightColor = colors[1];
            this.pressColor = colors[2];
        }

        this.refresh();
        this.drawNew();
    }

    // ToggleButtonMorph events

    mouseEnter() {
        const contents = this.hint instanceof Function ? this.hint() : this.hint;
        if (!this.state) {
            this.image = this.highlightImage;
            this.changed();
        }
        if (contents) {
            this.bubbleHelp(contents);
        }
    }

    mouseLeave() {
        if (!this.state) {
            this.image = this.normalImage;
            this.changed();
        }
        if (this.schedule) {
            this.schedule.isActive = false;
        }
        if (this.hint) {
            this.world().hand.destroyTemporaries();
        }
    }

    mouseDownLeft() {
        if (!this.state) {
            this.image = this.pressImage;
            this.changed();
        }
    }

    mouseClickLeft() {
        if (!this.state) {
            this.image = this.highlightImage;
            this.changed();
        }
        this.trigger(); // allow me to be triggered again to force-update others
    }

    // ToggleButtonMorph action

    trigger() {
        super.trigger.call(this);
        this.refresh();
    }

    refresh() {
    /*
        if query is a function:
        execute the query with target as environment (can be null)
        for lambdafied (inline) actions

        else if query is a String:
        treat it as function property of target and execute it
        for selector-like queries
    */
        if (typeof this.query === 'function') {
            this.state = this.query.call(this.target);
        } else { // assume it's a String
            this.state = this.target[this.query]();
        }
        if (this.state) {
            this.image = this.pressImage;
            if (this.trueStateLabel) {
                this.label.hide();
                this.trueStateLabel.show();
            }
        } else {
            this.image = this.normalImage;
            if (this.trueStateLabel) {
                this.label.show();
                this.trueStateLabel.hide();
            }
        }
        this.changed();
    }

    // ToggleButtonMorph layout:

    fixLayout() {
        if (this.label !== null) {
            const lw = Math.max(this.label.width(), this.labelMinExtent.x);
            const padding = this.padding * 2 + this.outline * 2 + this.edge * 2;
            this.setExtent(new Point(
                (this.minWidth ?
                        Math.max(this.minWidth, lw) + padding
                        : lw + padding),
                Math.max(this.label instanceof StringMorph ?
                        this.label.rawHeight() :
                            this.label.height(), this.labelMinExtent.y) + padding
            ));
            this.label.setCenter(this.center());
            if (this.trueStateLabel) {
                this.trueStateLabel.setCenter(this.center());
            }
            if (this.minWidth) { // left-align along my corner
                this.label.setLeft(
                    this.left()
                        + this.outline
                        + this.edge
                        + this.corner
                        + this.padding
                );
            }
        }
    }

    // ToggleButtonMorph drawing

    createBackgrounds() {
        /*
            basically the same as inherited from PushButtonMorph, except for
            not inverting the pressImage 3D-ish border (because it stays that way),
            and optionally coloring the left edge in the press-color, previewing
            the selection color (e.g. in the case of Scratch palette-category
            selector. the latter is done in the drawEdges() method.
        */
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

        // note: don't invert the 3D-ish edges for pressedImage, because
        // it will stay that way, and should not look inverted (or should it?)
        this.pressImage = newCanvas(ext);
        context = this.pressImage.getContext('2d');
        this.drawOutline(context);
        this.drawBackground(context, this.pressColor);
        this.drawEdges(
            context,
            this.pressColor,
            this.pressColor.lighter(40),
            this.pressColor.darker(40)
        );

        this.image = this.normalImage;
    }

    drawEdges(context, color, topColor, bottomColor) {
        let gradient;

        super.drawEdges.call(
            this,
            context,
            color,
            topColor,
            bottomColor
        );

        if (this.hasPreview) { // indicate the possible selection color
            if (MorphicPreferences.isFlat && !this.is3D) {
                context.fillStyle = this.pressColor.toString();
                context.fillRect(
                    this.outline,
                    this.outline,
                    this.corner,
                    this.height() - this.outline * 2
                );
                return;
            }
            gradient = context.createLinearGradient(
                0,
                0,
                this.corner,
                0
            );
            gradient.addColorStop(0, this.pressColor.lighter(40).toString());
            gradient.addColorStop(1, this.pressColor.darker(40).toString());
            context.fillStyle = gradient; // this.pressColor.toString();
            context.beginPath();
            this.previewPath(
                context,
                Math.max(this.corner - this.outline, 0),
                this.outline
            );
            context.closePath();
            context.fill();
        }
    }

    previewPath(context, radius, inset) {
        const offset = radius + inset;
        const h = this.height();

        // top left:
        context.arc(
            offset,
            offset,
            radius,
            radians(-180),
            radians(-90),
            false
        );
        // bottom left:
        context.arc(
            offset,
            h - offset,
            radius,
            radians(90),
            radians(180),
            false
        );
    }

    createLabel() {
        const shading = !MorphicPreferences.isFlat || this.is3D;
        const none = new Point();

        if (this.label !== null) {
            this.label.destroy();
        }
        if (this.trueStateLabel !== null) {
            this.trueStateLabel.destroy();
        }
        if (this.labelString instanceof Array && this.labelString.length === 2) {
            if (this.labelString[0] instanceof SymbolMorph) {
                this.label = this.labelString[0].fullCopy();
                this.trueStateLabel = this.labelString[1].fullCopy();
                if (!this.isPicture) {
                    this.label.shadowOffset = shading ?
                            this.labelShadowOffset : none;
                    this.label.shadowColor = this.labelShadowColor;
                    this.label.color = this.labelColor;
                    this.label.drawNew();

                    this.trueStateLabel.shadowOffset = shading ?
                            this.labelShadowOffset : none;
                    this.trueStateLabel.shadowColor = this.labelShadowColor;
                    this.trueStateLabel.color = this.labelColor;
                    this.trueStateLabel.drawNew();
                }
            } else if (this.labelString[0] instanceof Morph) {
                this.label = this.labelString[0].fullCopy();
                this.trueStateLabel = this.labelString[1].fullCopy();
            } else {
                this.label = new StringMorph(
                    localize(this.labelString[0]),
                    this.fontSize,
                    this.fontStyle,
                    true,
                    false,
                    false,
                    shading ? this.labelShadowOffset : null,
                    this.labelShadowColor,
                    this.labelColor
                );
                this.trueStateLabel = new StringMorph(
                    localize(this.labelString[1]),
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
        } else {
            if (this.labelString instanceof SymbolMorph) {
                this.label = this.labelString.fullCopy();
                if (!this.isPicture) {
                    this.label.shadowOffset = shading ?
                            this.labelShadowOffset : none;
                    this.label.shadowColor = this.labelShadowColor;
                    this.label.color = this.labelColor;
                    this.label.drawNew();
                }
            } else if (this.labelString instanceof Morph) {
                this.label = this.labelString.fullCopy();
            } else {
                this.label = new StringMorph(
                    localize(this.labelString),
                    this.fontSize,
                    this.fontStyle,
                    true,
                    false,
                    false,
                    shading ? this.labelShadowOffset : none,
                    this.labelShadowColor,
                    this.labelColor
                );
            }
        }
        this.add(this.label);
        if (this.trueStateLabel) {
            this.add(this.trueStateLabel);
        }
    }

    // ToggleButtonMorph hiding and showing:

    /*
        override the inherited behavior to recursively hide/show all
        children, so that my instances get restored correctly when
        hiding/showing my parent.
    */

    hide() {
        this.isVisible = false;
        this.changed();
    }

    show() {
        this.isVisible = true;
        this.changed();
    }
}