// TextSlotMorph //////////////////////////////////////////////////////

/*
    I am a multi-line input slot, primarily used in Snap's code-mapping
    blocks.
*/

import InputSlotMorph from "./InputSlotMorph";

// TextSlotMorph instance creation:

export default class TextSlotMorph extends InputSlotMorph {
    constructor(text, isNumeric, choiceDict, isReadOnly) {
        this.init(text, isNumeric, choiceDict, isReadOnly);
    }

    init(text, isNumeric, choiceDict, isReadOnly) {
        const contents = new TextMorph('');

        const arrow = new ArrowMorph(
            'down',
            0,
            Math.max(Math.floor(this.fontSize / 6), 1)
        );

        contents.fontSize = this.fontSize;
        contents.drawNew();

        this.isUnevaluated = false;
        this.choices = choiceDict || null; // object, function or selector
        this.oldContentsExtent = contents.extent();
        this.isNumeric = isNumeric || false;
        this.isReadOnly = isReadOnly || false;
        this.minWidth = 0; // can be chaged for text-type inputs ("landscape")
        this.constant = null;

        InputSlotMorph.uber.init.call(this, null, null, null, null, true); // sil.
        this.color = new Color(255, 255, 255);
        this.add(contents);
        this.add(arrow);
        contents.isEditable = true;
        contents.isDraggable = false;
        contents.enableSelecting();
        this.setContents(text);
    }

    // TextSlotMorph accessing:

    getSpec() {
        if (this.isNumeric) {
            return '%mln';
        }
        return '%mlt'; // default
    }

    contents() {
        return detect(
            this.children,
            child => child instanceof TextMorph
        );
    }

    // TextSlotMorph events:

    layoutChanged() {
        this.fixLayout();
    }
}