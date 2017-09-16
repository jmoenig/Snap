// TriggerMorph ////////////////////////////////////////////////////////

// I provide basic button functionality

import Morph from "./Morph";

// TriggerMorph instance creation:

export default class TriggerMorph extends Morph {
    constructor(
        target,
        action,
        labelString,
        fontSize,
        fontStyle,
        environment,
        hint,
        labelColor,
        labelBold,
        labelItalic,
        doubleClickAction) {
        this.init(
            target,
            action,
            labelString,
            fontSize,
            fontStyle,
            environment,
            hint,
            labelColor,
            labelBold,
            labelItalic,
            doubleClickAction
        );
    }

    init(
        target,
        action,
        labelString,
        fontSize,
        fontStyle,
        environment,
        hint,
        labelColor,
        labelBold,
        labelItalic,
        doubleClickAction) {
        // additional properties:
        this.target = target || null;
        this.action = action || null;
        this.doubleClickAction = doubleClickAction || null;
        this.environment = environment || null;
        this.labelString = labelString || null;
        this.label = null;
        this.hint = hint || null; // null, String, or Function
        this.schedule = null; // animation slot for displaying hints
        this.fontSize = fontSize || MorphicPreferences.menuFontSize;
        this.fontStyle = fontStyle || 'sans-serif';
        this.highlightColor = new Color(192, 192, 192);
        this.pressColor = new Color(128, 128, 128);
        this.labelColor = labelColor || new Color(0, 0, 0);
        this.labelBold = labelBold || false;
        this.labelItalic = labelItalic || false;

        // initialize inherited properties:
        super.init.call(this);

        // override inherited properites:
        this.color = new Color(255, 255, 255);
        this.drawNew();
    }

    // TriggerMorph drawing:

    drawNew() {
        this.createBackgrounds();
        if (this.labelString !== null) {
            this.createLabel();
        }
    }

    createBackgrounds() {
        let context;
        const ext = this.extent();

        this.normalImage = newCanvas(ext);
        context = this.normalImage.getContext('2d');
        context.fillStyle = this.color.toString();
        context.fillRect(0, 0, ext.x, ext.y);

        this.highlightImage = newCanvas(ext);
        context = this.highlightImage.getContext('2d');
        context.fillStyle = this.highlightColor.toString();
        context.fillRect(0, 0, ext.x, ext.y);

        this.pressImage = newCanvas(ext);
        context = this.pressImage.getContext('2d');
        context.fillStyle = this.pressColor.toString();
        context.fillRect(0, 0, ext.x, ext.y);

        this.image = this.normalImage;
    }

    createLabel() {
        if (this.label !== null) {
            this.label.destroy();
        }
        this.label = new StringMorph(
            this.labelString,
            this.fontSize,
            this.fontStyle,
            this.labelBold,
            this.labelItalic,
            false, // numeric
            null, // shadow offset
            null, // shadow color
            this.labelColor
        );
        this.label.setPosition(
            this.center().subtract(
                this.label.extent().floorDivideBy(2)
            )
        );
        this.add(this.label);
    }

    // TriggerMorph action:

    trigger() {
        /*
        if target is a function, use it as callback:
        execute target as callback function with action as argument
        in the environment as optionally specified.
        Note: if action is also a function, instead of becoming
        the argument itself it will be called to answer the argument.
        for selections, Yes/No Choices etc. As second argument pass
        myself, so I can be modified to reflect status changes, e.g.
        inside a list box:

        else (if target is not a function):

            if action is a function:
            execute the action with target as environment (can be null)
            for lambdafied (inline) actions

            else if action is a String:
            treat it as function property of target and execute it
            for selector-like actions
        */
        if (this.schedule) {
            this.schedule.isActive = false;
        }
        if (typeof this.target === 'function') {
            if (typeof this.action === 'function') {
                this.target.call(this.environment, this.action.call(), this);
            } else {
                this.target.call(this.environment, this.action, this);
            }
        } else {
            if (typeof this.action === 'function') {
                this.action.call(this.target);
            } else { // assume it's a String
                this.target[this.action]();
            }
        }
    }

    triggerDoubleClick() {
        // same as trigger() but use doubleClickAction instead of action property
        // note that specifying a doubleClickAction is optional
        if (!this.doubleClickAction) {return; }
        if (this.schedule) {
            this.schedule.isActive = false;
        }
        if (typeof this.target === 'function') {
            if (typeof this.doubleClickAction === 'function') {
                this.target.call(
                    this.environment,
                    this.doubleClickAction.call(),
                    this
                );
            } else {
                this.target.call(this.environment, this.doubleClickAction, this);
            }
        } else {
            if (typeof this.doubleClickAction === 'function') {
                this.doubleClickAction.call(this.target);
            } else { // assume it's a String
                this.target[this.doubleClickAction]();
            }
        }
    }

    // TriggerMorph events:

    mouseEnter() {
        const contents = this.hint instanceof Function ? this.hint() : this.hint;
        this.image = this.highlightImage;
        this.changed();
        if (contents) {
            this.bubbleHelp(contents);
        }
    }

    mouseLeave() {
        this.image = this.normalImage;
        this.changed();
        if (this.schedule) {
            this.schedule.isActive = false;
        }
        if (this.hint) {
            this.world().hand.destroyTemporaries();
        }
    }

    mouseDownLeft() {
        this.image = this.pressImage;
        this.changed();
    }

    mouseClickLeft() {
        this.image = this.highlightImage;
        this.changed();
        this.trigger();
    }

    mouseDoubleClick() {
        this.triggerDoubleClick();
    }

    rootForGrab() {
        return this.isDraggable ? super.rootForGrab.call(this) : null;
    }

    // TriggerMorph bubble help:

    bubbleHelp(contents) {
        const world = this.world();
        const myself = this;
        this.schedule = new Animation(
            nop,
            nop,
            0,
            500,
            nop,
            () => {myself.popUpbubbleHelp(contents); }
        );
        world.animations.push(this.schedule);
    }

    popUpbubbleHelp(contents) {
        new SpeechBubbleMorph(
            localize(contents),
            null,
            null,
            1
        ).popUp(this.world(), this.rightCenter().add(new Point(-8, 0)));
    }
}