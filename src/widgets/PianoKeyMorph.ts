// PianoKeyMorph ///////////////////////////////////////////////////////

import MenuItemMorph from "../morphic/morph/MenuItemMorph";

export default class PianoKeyMorph extends MenuItemMorph {
    constructor(
        target,
        action,
        // can also be a Morph or a Canvas or a tuple: [icon, string]
        labelString,
        fontSize,
        fontStyle,
        environment,
        hint,
        color,
        bold,
        italic,
        // optional when used as list morph item
        doubleClickAction,
        label) {
        this.init(
            target,
            action,
            labelString,
            fontSize,
            fontStyle,
            environment,
            hint,
            color,
            bold,
            italic,
            doubleClickAction,
            label
        );
        this.feedback = label;
    }

    init(
        target,
        action,
        labelString,
        fontSize,
        fontStyle,
        environment,
        hint,
        color,
        bold,
        italic,
        doubleClickAction,
        label) {
        // additional "note" property for sound output:
        this.note = new Note(action);
        super.init.call(
            this,
            target,
            action,
            labelString,
            fontSize,
            fontStyle,
            environment,
            hint,
            color,
            bold,
            italic,
            doubleClickAction,
            label
        );
    }

    createLabel() {
        let icon;
        if (this.label !== null) {
            this.label.destroy();
        }
        // assume its pattern is: [icon, string]
        this.label = new Morph();
        icon = this.createIcon(this.labelString[0]);
        this.label.add(icon);
        this.label.drawNew();
        this.silentSetExtent(icon.extent());
        this.label.bounds = this.position().extent(this.label.extent());
        this.label.silentSetExtent(new Point(0, 0));
        this.add(this.label);
    }

    mouseEnter() {
        const piano = this.parentThatIsA(PianoMenuMorph);
        const soundType = piano ? piano.soundType : 1;
        const myself = this;
        if (piano) {
            piano.unselectAllItems();
            piano.selection = this;
            piano.world.keyboardReceiver = piano;
            piano.hasFocus = true;
        }
        this.label.children[0].hide();
        this.image = this.highlightImage;
        this.changed();
        this.feedback.text = this.labelString[1];
        this.feedback.changed();
        this.feedback.drawNew();
        this.feedback.changed();
        this.note.play(soundType);
        setTimeout(
            () => {
                myself.note.stop();
            },
            400
        );
    }

    mouseLeave() {
        this.note.stop();
        this.label.children[0].show();
        this.image = this.normalImage;
        this.changed();
    }
}

