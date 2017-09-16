// StringMorph /////////////////////////////////////////////////////////

// I am a single line of text

import Morph from "./Morph";
import {MorphicPreferences} from "../settings";
import Point from "../Point";
import {fontHeight, isNil, isWordChar, newCanvas, radians} from "../util";

export default class StringMorph extends Morph {
    public text: string;
    public isEditable = false;
    public isPassword = false;
    public isShowingBlanks = false;
    public blanksColor = new Color(180, 140, 140);

    // additional properties for text-editing:
    public isScrollable = true; // scrolls into view when edited
    public currentlySelecting = false;
    public startMark = 0;
    public endMark = 0;
    public markedTextColor = new Color(255, 255, 255);
    public markedBackgoundColor = new Color(60, 60, 120);

    // override inherited properites:
    public noticesTransparentClick = true;

    constructor(text?: string,
                public fontSize = 12,
                public fontStyle = 'sans-serif',
                public isBold = false,
                public isItalic = false,
                public isNumeric = false,
                public shadowOffset = new Point(0, 0),
                public shadowColor: Color = null,
                public color = new Color(0, 0, 0),
                public fontName = MorphicPreferences.globalFontFamily) {
        super(true);

        // additional properties:
        this.text = text || ((text === '') ? '' : 'StringMorph');

        this.drawNew();
    }

    toString() {
        // e.g. 'a StringMorph("Hello World")'
        return `a ${this.constructor.name ||
        this.constructor.toString().split(' ')[1].split('(')[0]}("${this.text.slice(0, 30)}...")`;
    }

    password(letter: string, length: number) {
        let ans = '';
        let i;
        for (i = 0; i < length; i += 1) {
            ans += letter;
        }
        return ans;
    }

    font() {
        // answer a font string, e.g. 'bold italic 12px sans-serif'
        let font = '';
        if (this.isBold) {
            font = `${font}bold `;
        }
        if (this.isItalic) {
            font = `${font}italic `;
        }
        return `${font +
        this.fontSize}px ${this.fontName ? this.fontName + ', ' : ''}${this.fontStyle}`;
    }

    drawNew() {
        let context;
        let width;
        let start;
        let stop;
        let i;
        let p;
        let c;
        let x;
        let y;
        const shadowOffset = this.shadowOffset || new Point();

        const txt = this.isPassword ?
            this.password('*', this.text.length) : this.text;

        // initialize my surface property
        this.image = newCanvas();
        context = this.image.getContext('2d');
        context.font = this.font();

        // set my extent
        width = Math.max(
            context.measureText(txt).width + Math.abs(shadowOffset.x),
            1
        );
        this.bounds.corner = this.bounds.origin.add(
            new Point(
                width,
                fontHeight(this.fontSize) + Math.abs(shadowOffset.y)
            )
        );
        this.image.width = width;
        this.image.height = this.height();

        // prepare context for drawing text
        context.font = this.font();
        context.textAlign = 'left';
        context.textBaseline = 'bottom';

        // first draw the shadow, if any
        if (this.shadowColor) {
            x = Math.max(shadowOffset.x, 0);
            y = Math.max(shadowOffset.y, 0);
            context.fillStyle = this.shadowColor.toString();
            context.fillText(txt, x, fontHeight(this.fontSize) + y);
        }

        // now draw the actual text
        x = Math.abs(Math.min(shadowOffset.x, 0));
        y = Math.abs(Math.min(shadowOffset.y, 0));
        context.fillStyle = this.color.toString();

        if (this.isShowingBlanks) {
            this.renderWithBlanks(context, x, fontHeight(this.fontSize) + y);
        } else {
            context.fillText(txt, x, fontHeight(this.fontSize) + y);
        }

        // draw the selection
        start = Math.min(this.startMark, this.endMark);
        stop = Math.max(this.startMark, this.endMark);
        for (i = start; i < stop; i += 1) {
            p = this.slotPosition(i).subtract(this.position());
            c = txt.charAt(i);
            context.fillStyle = this.markedBackgoundColor.toString();
            context.fillRect(p.x, p.y, context.measureText(c).width + 1 + x,
                fontHeight(this.fontSize) + y);
            context.fillStyle = this.markedTextColor.toString();
            context.fillText(c, p.x + x, fontHeight(this.fontSize) + y);
        }

        // notify my parent of layout change
        if (this.parent) {
            if (this.parent.fixLayout) { // TODO
                this.parent.fixLayout();
            }
        }
    }

    renderWithBlanks(context: CanvasRenderingContext2D, x: number = 0, y: number) {
        const space = context.measureText(' ').width;
        const blank = newCanvas(new Point(space, this.height()));
        const ctx = blank.getContext('2d');
        const words = this.text.split(' ');
        let isFirst = true;

        // create the blank form
        ctx.fillStyle = this.blanksColor.toString();
        ctx.arc(
            space / 2,
            blank.height / 2,
            space / 2,
            radians(0),
            radians(360)
        );
        ctx.fill();

        function drawBlank() {
            context.drawImage(blank, x, 0);
            x += space;
        }

        // render my text inserting blanks
        words.forEach(word => {
            if (!isFirst) {
                drawBlank();
            }
            isFirst = false;
            if (word !== '') {
                context.fillText(word, x, y);
                x += context.measureText(word).width;
            }
        });
    }

    // StringMorph measuring:

    slotPosition(slot: number) {
        // answer the position point of the given index ("slot")
        // where the cursor should be placed
        const txt = this.isPassword ?
            this.password('*', this.text.length) : this.text;

        const dest = Math.min(Math.max(slot, 0), txt.length);
        const context = this.image.getContext('2d');
        let xOffset;
        let x;
        let y;
        let idx;

        xOffset = 0;
        for (idx = 0; idx < dest; idx += 1) {
            xOffset += context.measureText(txt[idx]).width;
        }
        this.pos = dest; // TODO: This property doesn't exist and is never accessed
        x = this.left() + xOffset;
        y = this.top();
        return new Point(x, y);
    }

    slotAt(aPoint: Point) {
        // answer the slot (index) closest to the given point taking
        // in account how far from the middle of the character it is,
        // so the cursor can be moved accordingly

        const txt = this.isPassword ?
            this.password('*', this.text.length) : this.text;

        let idx = 0;
        let charX = 0;
        const context = this.image.getContext('2d');

        while (aPoint.x - this.left() > charX) {
            charX += context.measureText(txt[idx]).width;
            idx += 1;
            if (idx === txt.length) {
                if ((context.measureText(txt).width -
                        (context.measureText(txt[idx - 1]).width / 2)) <
                    (aPoint.x - this.left())) {
                    return idx;
                }
            }
        }

        // see where our click fell with respect to the middle of the char
        if (aPoint.x - this.left() >
            charX - context.measureText(txt[idx - 1]).width / 2) {
            return idx;
        } else {
            return idx - 1;
        }
    }

    upFrom(slot: number) {
        // answer the slot above the given one
        return slot;
    }

    downFrom(slot: number) {
        // answer the slot below the given one
        return slot;
    }

    startOfLine() {
        // answer the first slot (index) of the line for the given slot
        return 0;
    }

    endOfLine() {
        // answer the slot (index) indicating the EOL for the given slot
        return this.text.length;
    }

    previousWordFrom(aSlot: number) {
        // answer the slot (index) slots indicating the position of the
        // previous word to the left of aSlot
        let index = aSlot - 1;

        // while the current character is non-word one, we skip it, so that
        // if we are in the middle of a non-alphanumeric sequence, we'll get
        // right to the beginning of the previous word
        while (index > 0 && !isWordChar(this.text[index])) {
            index -= 1;
        }

        // while the current character is a word one, we skip it until we
        // find the beginning of the current word
        while (index > 0 && isWordChar(this.text[index - 1])) {
            index -= 1;
        }

        return index;
    }

    nextWordFrom(aSlot: number) {
        let index = aSlot;

        while (index < this.endOfLine() && !isWordChar(this.text[index])) {
            index += 1;
        }

        while (index < this.endOfLine() && isWordChar(this.text[index])) {
            index += 1;
        }

        return index;
    }

    rawHeight() {
        // answer my corrected fontSize
        return this.height() / 1.2;
    }

    // StringMorph menus:

    developersMenu() {
        const menu = super.developersMenu.call(this);

        menu.addLine();
        menu.addItem("edit", 'edit');
        menu.addItem(
            "font size...",
            function () {
                this.prompt(
                    `${menu.title}\nfont\nsize:`,
                    this.setFontSize,
                    this,
                    this.fontSize.toString(),
                    null,
                    6,
                    500,
                    true
                );
            },
            'set this String\'s\nfont point size'
        );
        if (this.fontStyle !== 'serif') {
            menu.addItem("serif", 'setSerif');
        }
        if (this.fontStyle !== 'sans-serif') {
            menu.addItem("sans-serif", 'setSansSerif');
        }
        if (this.isBold) {
            menu.addItem("normal weight", 'toggleWeight');
        } else {
            menu.addItem("bold", 'toggleWeight');
        }
        if (this.isItalic) {
            menu.addItem("normal style", 'toggleItalic');
        } else {
            menu.addItem("italic", 'toggleItalic');
        }
        if (this.isShowingBlanks) {
            menu.addItem("hide blanks", 'toggleShowBlanks');
        } else {
            menu.addItem("show blanks", 'toggleShowBlanks');
        }
        if (this.isPassword) {
            menu.addItem("show characters", 'toggleIsPassword');
        } else {
            menu.addItem("hide characters", 'toggleIsPassword');
        }
        return menu;
    }

    toggleIsDraggable() {
        // for context menu demo purposes
        this.isDraggable = !this.isDraggable;
        if (this.isDraggable) {
            this.disableSelecting();
        } else {
            this.enableSelecting();
        }
    }

    toggleShowBlanks() {
        this.isShowingBlanks = !this.isShowingBlanks;
        this.changed();
        this.drawNew();
        this.changed();
    }

    toggleWeight() {
        this.isBold = !this.isBold;
        this.changed();
        this.drawNew();
        this.changed();
    }

    toggleItalic() {
        this.isItalic = !this.isItalic;
        this.changed();
        this.drawNew();
        this.changed();
    }

    toggleIsPassword() {
        this.isPassword = !this.isPassword;
        this.changed();
        this.drawNew();
        this.changed();
    }

    setSerif() {
        this.fontStyle = 'serif';
        this.changed();
        this.drawNew();
        this.changed();
    }

    setSansSerif() {
        this.fontStyle = 'sans-serif';
        this.changed();
        this.drawNew();
        this.changed();
    }

    setFontSize(size: number) {
        // for context menu demo purposes
        let newSize;
        if (typeof size === 'number') {
            this.fontSize = Math.round(Math.min(Math.max(size, 4), 500));
        } else {
            newSize = parseFloat(size);
            if (!isNaN(newSize)) {
                this.fontSize = Math.round(
                    Math.min(Math.max(newSize, 4), 500)
                );
            }
        }
        this.changed();
        this.drawNew();
        this.changed();
    }

    setText(size: number) {
        // for context menu demo purposes
        this.text = Math.round(size).toString();
        this.changed();
        this.drawNew();
        this.changed();
    }

    numericalSetters() {
        // for context menu demo purposes
        return [
            'setLeft',
            'setTop',
            'setAlphaScaled',
            'setFontSize',
            'setText'
        ];
    }

    // StringMorph editing:

    edit() { // TODO
        this.root().edit(this);
    }

    selection() {
        let start;
        let stop;
        start = Math.min(this.startMark, this.endMark);
        stop = Math.max(this.startMark, this.endMark);
        return this.text.slice(start, stop);
    }

    selectionStartSlot() {
        return Math.min(this.startMark, this.endMark);
    }

    clearSelection() {
        if (!this.currentlySelecting &&
            isNil(this.startMark) &&
            isNil(this.endMark)) {
            return;
        }
        this.currentlySelecting = false;
        this.startMark = null;
        this.endMark = null;
        this.drawNew();
        this.changed();
    }

    deleteSelection() {
        let start;
        let stop;
        let text;
        text = this.text;
        start = Math.min(this.startMark, this.endMark);
        stop = Math.max(this.startMark, this.endMark);
        this.text = text.slice(0, start) + text.slice(stop);
        this.changed();
        this.clearSelection();
    }

    selectAll() {
        let cursor;
        if (this.isEditable) {
            this.startMark = 0;
            cursor = this.root().cursor;
            if (cursor) {
                cursor.gotoSlot(this.text.length);
            }
            this.endMark = this.text.length;
            this.drawNew();
            this.changed();
        }
    }

    mouseDownLeft(pos: Point) {
        if (this.world().currentKey === 16) {
            this.shiftClick(pos);
        } else if (this.isEditable) {
            this.clearSelection();
        } else {
            this.escalateEvent('mouseDownLeft', pos);
        }
    }

    shiftClick(pos: Point) {
        const cursor = this.root().cursor;

        if (cursor) {
            if (!this.startMark) {
                this.startMark = cursor.slot;
            }
            cursor.gotoPos(pos);
            this.endMark = cursor.slot;
            this.drawNew();
            this.changed();
        }
        this.currentlySelecting = false;
        this.escalateEvent('mouseDownLeft', pos);
    }

    mouseClickLeft(pos: Point) {
        let cursor;
        if (this.isEditable) {
            if (!this.currentlySelecting) {
                this.edit(); // creates a new cursor
            }
            cursor = this.root().cursor;
            if (cursor) {
                cursor.gotoPos(pos);
            }
            this.currentlySelecting = true;
        } else {
            this.escalateEvent('mouseClickLeft', pos);
        }
    }

    mouseDoubleClick(pos: Point) {
        // selects the word at pos
        // if there is no word, we select whatever is between
        // the previous and next words
        let slot = this.slotAt(pos);

        if (this.isEditable) {
            this.edit();

            if (slot === this.text.length) {
                slot -= 1;
            }

            if (this.text[slot] && isWordChar(this.text[slot])) {
                this.selectWordAt(slot);
            } else if (this.text[slot]) {
                this.selectBetweenWordsAt(slot);
            } else {
                // special case for when we click right after the
                // last slot in multi line TextMorphs
                this.selectAll();
            }
        } else {
            this.escalateEvent('mouseDoubleClick', pos);
        }
    }

    selectWordAt(slot: number) {
        const cursor = this.root().cursor;

        if (slot === 0 || isWordChar(this.text[slot - 1])) {
            cursor.gotoSlot(this.previousWordFrom(slot));
            this.startMark = cursor.slot;
            this.endMark = this.nextWordFrom(cursor.slot);
        } else {
            cursor.gotoSlot(slot);
            this.startMark = slot;
            this.endMark = this.nextWordFrom(slot);
        }

        this.drawNew();
        this.changed();
    }

    selectBetweenWordsAt(slot: number) {
        const cursor = this.root().cursor;

        cursor.gotoSlot(this.nextWordFrom(this.previousWordFrom(slot)));
        this.startMark = cursor.slot;
        this.endMark = cursor.slot;

        while (this.endMark < this.text.length
        && !isWordChar(this.text[this.endMark])) {
            this.endMark += 1;
        }

        this.drawNew();
        this.changed();
    }

    enableSelecting() {
        this.mouseDownLeft = function (pos) {
            const crs = this.root().cursor;
            const already = crs ? crs.target === this : false;
            if (this.world().currentKey === 16) {
                this.shiftClick(pos);
            } else {
                this.clearSelection();
                if (this.isEditable && (!this.isDraggable)) {
                    this.edit();
                    this.root().cursor.gotoPos(pos);
                    this.startMark = this.slotAt(pos);
                    this.endMark = this.startMark;
                    this.currentlySelecting = true;
                    if (!already) {
                        this.escalateEvent('mouseDownLeft', pos);
                    }
                }
            }
        };
        this.mouseMove = function (pos) {
            if (this.isEditable &&
                this.currentlySelecting &&
                (!this.isDraggable)) {
                const newMark = this.slotAt(pos);
                if (newMark !== this.endMark) {
                    this.endMark = newMark;
                    this.drawNew();
                    this.changed();
                }
            }
        };
    }

    disableSelecting() {
        this.mouseDownLeft = StringMorph.prototype.mouseDownLeft;
        this.mouseMove = null;
        // delete this.mouseMove;
    }
}