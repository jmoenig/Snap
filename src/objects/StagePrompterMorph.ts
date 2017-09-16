// StagePrompterMorph ////////////////////////////////////////////////////////

/*
    I am a sensor-category-colored input box at the bottom of the stage
    which lets the user answer to a question. If I am opened from within
    the context of a sprite, my question can be anything that is displayable
    in a SpeechBubble and will be, if I am opened from within the stage
    my question will be shown as a single line of text within my label morph.
*/

import BoxMorph from "../morphic/morph/BoxMorph";

// StagePrompterMorph instance creation:

export default class StagePrompterMorph extends BoxMorph {
    constructor(question) {
        this.init(question);
    }

    init(question) {
        // question is optional in case the Stage is asking
        const myself = this;

        // additional properties
        this.isDone = false;
        if (question) {
            this.label = new StringMorph(
                question,
                SpriteMorph.prototype.bubbleFontSize,
                null, // fontStyle
                SpriteMorph.prototype.bubbleFontIsBold,
                false, // italic
                'left'
            );
        } else {
            this.label = null;
        }
        this.inputField = new InputFieldMorph();
        this.button = new PushButtonMorph(
            null,
            () => {myself.accept(); },
            '\u2713'
        );

        // initialize inherited properties
        super.init.call(
            this,
            SyntaxElementMorph.prototype.rounding,
            SpriteMorph.prototype.bubbleBorder,
            SpriteMorph.prototype.blockColor.sensing
        );

        // override inherited behavior
        this.color = new Color(255, 255, 255);
        if (this.label) {this.add(this.label); }
        this.add(this.inputField);
        this.add(this.button);
        this.setWidth(StageMorph.prototype.dimensions.x - 20);
        this.fixLayout();
    }

    // StagePrompterMorph layout:

    fixLayout() {
        let y = 0;
        if (this.label) {
            this.label.setPosition(new Point(
                this.left() + this.edge,
                this.top() + this.edge
            ));
            y = this.label.bottom() - this.top();
        }
        this.inputField.setPosition(new Point(
            this.left() + this.edge,
            this.top() + y + this.edge
        ));
        this.inputField.setWidth(
            this.width()
                - this.edge * 2
                - this.button.width()
                - this.border
        );
        this.button.setCenter(this.inputField.center());
        this.button.setLeft(this.inputField.right() + this.border);
        this.setHeight(
            this.inputField.bottom()
                - this.top()
                + this.edge
        );
    }

    // StagePrompterMorph events:

    mouseClickLeft() {
        this.inputField.edit();
    }

    accept() {
        this.isDone = true;
    }
}

