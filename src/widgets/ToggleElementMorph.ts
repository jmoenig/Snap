// ToggleElementMorph /////////////////////////////////////////////////////
/*
    I am a picture of a Morph ("element") which acts as a toggle button.
    I am different from ToggleButton in that I neither create a label nor
    draw button outlines. Instead I display my element morph in specified
    contrasts of a given color, symbolizing whether it is selected or not
*/

import TriggerMorph from "../morphic/morph/TriggerMorph";

// ToggleElementMorph preferences settings

ToggleElementMorph.prototype.contrast = 50;
ToggleElementMorph.prototype.shadowOffset = new Point(2, 2);
ToggleElementMorph.prototype.shadowAlpha = 0.6;
ToggleElementMorph.prototype.fontSize = 10; // only for (optional) labels
ToggleElementMorph.prototype.inactiveColor = new Color(180, 180, 180);

// ToggleElementMorph instance creation:

export default class ToggleElementMorph extends TriggerMorph {
    constructor(target, action, element, query, environment, hint, builder, labelString) {
        this.init(
            target,
            action,
            element,
            query,
            environment,
            hint,
            builder,
            labelString
        );
    }

    init(
        target,
        action,
        // mandatory
        element,
        query,
        environment,
        hint,
        // optional function name that rebuilds the element
        builder,
        labelString) {
        // additional properties:
        this.target = target || null;
        this.action = action || null;
        this.element = element;
        this.query = query || (() => true);
        this.environment = environment || null;
        this.hint = hint || null;
        this.builder = builder || 'nop';
        this.captionString = labelString || null;
        this.labelAlignment = 'right';
        this.state = false;

        // initialize inherited properties:
        TriggerMorph.uber.init.call(this);

        // override inherited properties:
        this.color = element.color;
        this.createLabel();
    }

    // ToggleElementMorph drawing:

    createBackgrounds() {
        const shading = !MorphicPreferences.isFlat || this.is3D;

        this.color = this.element.color;
        this.element.removeShadow();
        this.element[this.builder]();
        if (shading) {
            this.element.addShadow(this.shadowOffset, this.shadowAlpha);
        }
        this.silentSetExtent(this.element.fullBounds().extent()); // w/ shadow
        this.pressImage = this.element.fullImage();

        this.element.removeShadow();
        this.element.setColor(this.inactiveColor);
        this.element[this.builder](this.contrast);
        if (shading) {
            this.element.addShadow(this.shadowOffset, 0);
        }
        this.normalImage = this.element.fullImage();

        this.element.removeShadow();
        this.element.setColor(this.color.lighter(this.contrast));
        this.element[this.builder](this.contrast);
        if (shading) {
            this.element.addShadow(this.shadowOffset, this.shadowAlpha);
        }
        this.highlightImage = this.element.fullImage();

        this.element.removeShadow();
        this.element.setColor(this.color);
        this.element[this.builder]();
        this.image = this.normalImage;
    }

    setColor(aColor) {
        this.element.setColor(aColor);
        this.createBackgrounds();
        this.refresh();
    }

    // ToggleElementMorph layout:

    createLabel() {
        let y;
        if (this.captionString) {
            this.label = new StringMorph(
                this.captionString,
                this.fontSize,
                this.fontStyle,
                true
            );
            this.add(this.label);
            y = this.top() + (this.height() - this.label.height()) / 2;
            if (this.labelAlignment === 'right') {
                this.label.setPosition(new Point(
                    this.right(),
                    y
                ));
            } else {
                this.label.setPosition(new Point(
                    this.left() - this.label.width(),
                    y
                ));
            }
        }
    }
}

// ToggleElementMorph action

ToggleElementMorph.prototype.trigger
    = ToggleButtonMorph.prototype.trigger;

ToggleElementMorph.prototype.refresh
    = ToggleButtonMorph.prototype.refresh;

// ToggleElementMorph events

ToggleElementMorph.prototype.mouseEnter
    = ToggleButtonMorph.prototype.mouseEnter;

ToggleElementMorph.prototype.mouseLeave
    = ToggleButtonMorph.prototype.mouseLeave;

ToggleElementMorph.prototype.mouseDownLeft
    = ToggleButtonMorph.prototype.mouseDownLeft;

ToggleElementMorph.prototype.mouseClickLeft
    = ToggleButtonMorph.prototype.mouseClickLeft;