// StringFieldMorph ////////////////////////////////////////////////////

import FrameMorph from "./FrameMorph";

export default class StringFieldMorph extends FrameMorph {
    constructor(defaultContents, minWidth, fontSize, fontStyle, bold, italic, isNumeric) {
        this.init(
            defaultContents || '',
            minWidth || 100,
            fontSize || 12,
            fontStyle || 'sans-serif',
            bold || false,
            italic || false,
            isNumeric
        );
    }

    init(defaultContents, minWidth, fontSize, fontStyle, bold, italic, isNumeric) {
        this.defaultContents = defaultContents;
        this.minWidth = minWidth;
        this.fontSize = fontSize;
        this.fontStyle = fontStyle;
        this.isBold = bold;
        this.isItalic = italic;
        this.isNumeric = isNumeric || false;
        this.text = null;
        super.init.call(this);
        this.color = new Color(255, 255, 255);
        this.isEditable = true;
        this.acceptsDrops = false;
        this.drawNew();
    }

    drawNew() {
        let txt;
        txt = this.text ? this.string() : this.defaultContents;
        this.text = null;
        this.children.forEach(child => {
            child.destroy();
        });
        this.children = [];
        this.text = new StringMorph(
            txt,
            this.fontSize,
            this.fontStyle,
            this.isBold,
            this.isItalic,
            this.isNumeric
        );

        this.text.isNumeric = this.isNumeric; // for whichever reason...
        this.text.setPosition(this.bounds.origin.copy());
        this.text.isEditable = this.isEditable;
        this.text.isDraggable = false;
        this.text.enableSelecting();
        this.silentSetExtent(
            new Point(
                Math.max(this.width(), this.minWidth),
                this.text.height()
            )
        );
        super.drawNew.call(this);
        this.add(this.text);
    }

    string() {
        return this.text.text;
    }

    mouseClickLeft(pos) {
        if (this.isEditable) {
            this.text.edit();
        } else {
            this.escalateEvent('mouseClickLeft', pos);
        }
    }
}