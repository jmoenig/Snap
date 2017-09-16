// TextMorph ////////////////////////////////////////////////////////////////

import Morph from "./Morph";

// I am a multi-line, word-wrapping String, quasi-inheriting from StringMorph

// TextMorph instance creation:

export default class TextMorph extends Morph {
    constructor(
        text,
        fontSize,
        fontStyle,
        bold,
        italic,
        alignment,
        width,
        fontName,
        shadowOffset,
        shadowColor) {
        this.init(text,
            fontSize,
            fontStyle,
            bold,
            italic,
            alignment,
            width,
            fontName,
            shadowOffset,
            shadowColor);
    }

    init(
        text,
        fontSize,
        fontStyle,
        bold,
        italic,
        alignment,
        width,
        fontName,
        shadowOffset,
        shadowColor) {
        // additional properties:
        this.text = text || (text === '' ? text : 'TextMorph');
        this.words = [];
        this.lines = [];
        this.lineSlots = [];
        this.fontSize = fontSize || 12;
        this.fontName = fontName || MorphicPreferences.globalFontFamily;
        this.fontStyle = fontStyle || 'sans-serif';
        this.isBold = bold || false;
        this.isItalic = italic || false;
        this.alignment = alignment || 'left';
        this.shadowOffset = shadowOffset || new Point(0, 0);
        this.shadowColor = shadowColor || null;
        this.maxWidth = width || 0;
        this.maxLineWidth = 0;
        this.backgroundColor = null;
        this.isEditable = false;

        //additional properties for ad-hoc evaluation:
        this.receiver = null;

        // additional properties for text-editing:
        this.isScrollable = true; // scrolls into view when edited
        this.currentlySelecting = false;
        this.startMark = 0;
        this.endMark = 0;
        this.markedTextColor = new Color(255, 255, 255);
        this.markedBackgoundColor = new Color(60, 60, 120);

        // initialize inherited properties:
        super.init.call(this);

        // override inherited properites:
        this.color = new Color(0, 0, 0);
        this.noticesTransparentClick = true;
        this.drawNew();
    }

    toString() {
        // e.g. 'a TextMorph("Hello World")'
        return `a TextMorph("${this.text.slice(0, 30)}...")`;
    }

    parse() {
        const myself = this;
        const paragraphs = this.text.split('\n');
        const canvas = newCanvas();
        const context = canvas.getContext('2d');
        let oldline = '';
        let newline;
        let w;
        let slot = 0;

        context.font = this.font();
        this.maxLineWidth = 0;
        this.lines = [];
        this.lineSlots = [0];
        this.words = [];

        paragraphs.forEach(p => {
            myself.words = myself.words.concat(p.split(' '));
            myself.words.push('\n');
        });

        this.words.forEach(word => {
            if (word === '\n') {
                myself.lines.push(oldline);
                myself.lineSlots.push(slot);
                myself.maxLineWidth = Math.max(
                    myself.maxLineWidth,
                    context.measureText(oldline).width
                );
                oldline = '';
            } else {
                if (myself.maxWidth > 0) {
                    newline = `${oldline + word} `;
                    w = context.measureText(newline).width;
                    if (w > myself.maxWidth) {
                        myself.lines.push(oldline);
                        myself.lineSlots.push(slot);
                        myself.maxLineWidth = Math.max(
                            myself.maxLineWidth,
                            context.measureText(oldline).width
                        );
                        oldline = `${word} `;
                    } else {
                        oldline = newline;
                    }
                } else {
                    oldline = `${oldline + word} `;
                }
                slot += word.length + 1;
            }
        });
    }

    drawNew() {
        let context;
        let height;
        let i;
        let line;
        let width;
        let shadowHeight;
        let shadowWidth;
        let offx;
        let offy;
        let x;
        let y;
        let start;
        let stop;
        let p;
        let c;

        this.image = newCanvas();
        context = this.image.getContext('2d');
        context.font = this.font();
        this.parse();

        // set my extent
        shadowWidth = Math.abs(this.shadowOffset.x);
        shadowHeight = Math.abs(this.shadowOffset.y);
        height = this.lines.length * (fontHeight(this.fontSize) + shadowHeight);
        if (this.maxWidth === 0) {
            this.bounds = this.bounds.origin.extent(
                new Point(this.maxLineWidth + shadowWidth, height)
            );
        } else {
            this.bounds = this.bounds.origin.extent(
                new Point(this.maxWidth + shadowWidth, height)
            );
        }
        this.image.width = this.width();
        this.image.height = this.height();

        // prepare context for drawing text
        context = this.image.getContext('2d');
        context.font = this.font();
        context.textAlign = 'left';
        context.textBaseline = 'bottom';

        // fill the background, if desired
        if (this.backgroundColor) {
            context.fillStyle = this.backgroundColor.toString();
            context.fillRect(0, 0, this.width(), this.height());
        }

        // draw the shadow, if any
        if (this.shadowColor) {
            offx = Math.max(this.shadowOffset.x, 0);
            offy = Math.max(this.shadowOffset.y, 0);
            context.fillStyle = this.shadowColor.toString();

            for (i = 0; i < this.lines.length; i = i + 1) {
                line = this.lines[i];
                width = context.measureText(line).width + shadowWidth;
                if (this.alignment === 'right') {
                    x = this.width() - width;
                } else if (this.alignment === 'center') {
                    x = (this.width() - width) / 2;
                } else { // 'left'
                    x = 0;
                }
                y = (i + 1) * (fontHeight(this.fontSize) + shadowHeight)
                    - shadowHeight;
                context.fillText(line, x + offx, y + offy);
            }
        }

        // now draw the actual text
        offx = Math.abs(Math.min(this.shadowOffset.x, 0));
        offy = Math.abs(Math.min(this.shadowOffset.y, 0));
        context.fillStyle = this.color.toString();

        for (i = 0; i < this.lines.length; i = i + 1) {
            line = this.lines[i];
            width = context.measureText(line).width + shadowWidth;
            if (this.alignment === 'right') {
                x = this.width() - width;
            } else if (this.alignment === 'center') {
                x = (this.width() - width) / 2;
            } else { // 'left'
                x = 0;
            }
            y = (i + 1) * (fontHeight(this.fontSize) + shadowHeight)
                - shadowHeight;
            context.fillText(line, x + offx, y + offy);
        }

        // draw the selection
        start = Math.min(this.startMark, this.endMark);
        stop = Math.max(this.startMark, this.endMark);
        for (i = start; i < stop; i += 1) {
            p = this.slotPosition(i).subtract(this.position());
            c = this.text.charAt(i);
            context.fillStyle = this.markedBackgoundColor.toString();
            context.fillRect(p.x, p.y, context.measureText(c).width + 1,
                fontHeight(this.fontSize));
            context.fillStyle = this.markedTextColor.toString();
            context.fillText(c, p.x, p.y + fontHeight(this.fontSize));
        }

        // notify my parent of layout change
        if (this.parent) {
            if (this.parent.layoutChanged) {
                this.parent.layoutChanged();
            }
        }
    }

    setExtent(aPoint) {
        this.maxWidth = Math.max(aPoint.x, 0);
        this.changed();
        this.drawNew();
    }

    // TextMorph mesuring:

    columnRow(slot) {
        // answer the logical position point of the given index ("slot")
        let row;

        let col;
        let idx = 0;

        for (row = 0; row < this.lines.length; row += 1) {
            idx = this.lineSlots[row];
            for (col = 0; col < this.lines[row].length; col += 1) {
                if (idx === slot) {
                    return new Point(col, row);
                }
                idx += 1;
            }
        }
        // return new Point(0, 0);
        return new Point(
            this.lines[this.lines.length - 1].length - 1,
            this.lines.length - 1
        );
    }

    slotPosition(slot) {
        // answer the physical position point of the given index ("slot")
        // where the cursor should be placed
        const colRow = this.columnRow(slot);

        const context = this.image.getContext('2d');
        const shadowHeight = Math.abs(this.shadowOffset.y);
        let xOffset = 0;
        let yOffset;
        let x;
        let y;
        let idx;

        yOffset = colRow.y * (fontHeight(this.fontSize) + shadowHeight);
        for (idx = 0; idx < colRow.x; idx += 1) {
            xOffset += context.measureText(this.lines[colRow.y][idx]).width;
        }
        x = this.left() + xOffset;
        y = this.top() + yOffset;
        return new Point(x, y);
    }

    slotAt(aPoint) {
        // answer the slot (index) closest to the given point taking
        // in account how far from the middle of the character it is,
        // so the cursor can be moved accordingly

        let charX = 0;

        let row = 0;
        let col = 0;
        const shadowHeight = Math.abs(this.shadowOffset.y);
        const context = this.image.getContext('2d');

        while (aPoint.y - this.top() >
                ((fontHeight(this.fontSize) + shadowHeight) * row)) {
            row += 1;
        }
        row = Math.max(row, 1);

        while (aPoint.x - this.left() > charX) {
            charX += context.measureText(this.lines[row - 1][col]).width;
            col += 1;
        }

        // see where our click fell with respect to the middle of the char
        if (aPoint.x - this.left() >
                charX - context.measureText(this.lines[row - 1][col]).width / 2) {
            return this.lineSlots[Math.max(row - 1, 0)] + col;
        } else {
            return this.lineSlots[Math.max(row - 1, 0)] + col - 1;
        }
    }

    upFrom(slot) {
        // answer the slot above the given one
        let above;

        const colRow = this.columnRow(slot);
        if (colRow.y < 1) {
            return slot;
        }
        above = this.lines[colRow.y - 1];
        if (above.length < colRow.x - 1) {
            return this.lineSlots[colRow.y - 1] + above.length;
        }
        return this.lineSlots[colRow.y - 1] + colRow.x;
    }

    downFrom(slot) {
        // answer the slot below the given one
        let below;

        const colRow = this.columnRow(slot);
        if (colRow.y > this.lines.length - 2) {
            return slot;
        }
        below = this.lines[colRow.y + 1];
        if (below.length < colRow.x - 1) {
            return this.lineSlots[colRow.y + 1] + below.length;
        }
        return this.lineSlots[colRow.y + 1] + colRow.x;
    }

    startOfLine(slot) {
        // answer the first slot (index) of the line for the given slot
        return this.lineSlots[this.columnRow(slot).y];
    }

    endOfLine(slot) {
        // answer the slot (index) indicating the EOL for the given slot
        return this.startOfLine(slot) +
            this.lines[this.columnRow(slot).y].length - 1;
    }

    selectAllAndEdit() {
        this.edit();
        this.selectAll();
    }

    // TextMorph menus:

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
                    100,
                    true
                );
            },
            'set this Text\'s\nfont point size'
        );
        if (this.alignment !== 'left') {
            menu.addItem("align left", 'setAlignmentToLeft');
        }
        if (this.alignment !== 'right') {
            menu.addItem("align right", 'setAlignmentToRight');
        }
        if (this.alignment !== 'center') {
            menu.addItem("align center", 'setAlignmentToCenter');
        }
        menu.addLine();
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
        return menu;
    }

    setAlignmentToLeft() {
        this.alignment = 'left';
        this.drawNew();
        this.changed();
    }

    setAlignmentToRight() {
        this.alignment = 'right';
        this.drawNew();
        this.changed();
    }

    setAlignmentToCenter() {
        this.alignment = 'center';
        this.drawNew();
        this.changed();
    }

    // TextMorph evaluation:

    evaluationMenu() {
        const menu = new MenuMorph(this, null);
        menu.addItem(
            "do it",
            'doIt',
            'evaluate the\nselected expression'
        );
        menu.addItem(
            "show it",
            'showIt',
            'evaluate the\nselected expression\nand show the result'
        );
        menu.addItem(
            "inspect it",
            'inspectIt',
            'evaluate the\nselected expression\nand inspect the result'
        );
        menu.addLine();
        menu.addItem("select all", 'selectAllAndEdit');
        return menu;
    }

    setReceiver(obj) {
        this.receiver = obj;
        this.customContextMenu = this.evaluationMenu();
    }

    doIt() {
        this.receiver.evaluateString(this.selection());
        this.edit();
    }

    showIt() {
        const result = this.receiver.evaluateString(this.selection());
        if (result !== null) {
            this.inform(result);
        }
    }

    inspectIt() {
        const result = this.receiver.evaluateString(this.selection());
        const world = this.world();
        let inspector;
        if (isObject(result)) {
            inspector = new InspectorMorph(result);
            inspector.setPosition(world.hand.position());
            inspector.keepWithin(world);
            world.add(inspector);
            inspector.changed();
        }
    }
}

TextMorph.prototype.font = StringMorph.prototype.font;

TextMorph.prototype.previousWordFrom = StringMorph.prototype.previousWordFrom;

TextMorph.prototype.nextWordFrom = StringMorph.prototype.nextWordFrom;

// TextMorph editing:

TextMorph.prototype.edit = StringMorph.prototype.edit;

TextMorph.prototype.selection = StringMorph.prototype.selection;

TextMorph.prototype.selectionStartSlot
    = StringMorph.prototype.selectionStartSlot;

TextMorph.prototype.clearSelection = StringMorph.prototype.clearSelection;

TextMorph.prototype.deleteSelection = StringMorph.prototype.deleteSelection;

TextMorph.prototype.selectAll = StringMorph.prototype.selectAll;

TextMorph.prototype.mouseDownLeft = StringMorph.prototype.mouseDownLeft;

TextMorph.prototype.shiftClick = StringMorph.prototype.shiftClick;

TextMorph.prototype.mouseClickLeft = StringMorph.prototype.mouseClickLeft;

TextMorph.prototype.mouseDoubleClick = StringMorph.prototype.mouseDoubleClick;

TextMorph.prototype.selectWordAt = StringMorph.prototype.selectWordAt;

TextMorph.prototype.selectBetweenWordsAt
    = StringMorph.prototype.selectBetweenWordsAt;

TextMorph.prototype.enableSelecting = StringMorph.prototype.enableSelecting;

TextMorph.prototype.disableSelecting = StringMorph.prototype.disableSelecting;

TextMorph.prototype.toggleIsDraggable
    = StringMorph.prototype.toggleIsDraggable;

TextMorph.prototype.toggleWeight = StringMorph.prototype.toggleWeight;

TextMorph.prototype.toggleItalic = StringMorph.prototype.toggleItalic;

TextMorph.prototype.setSerif = StringMorph.prototype.setSerif;

TextMorph.prototype.setSansSerif = StringMorph.prototype.setSansSerif;

TextMorph.prototype.setText = StringMorph.prototype.setText;

TextMorph.prototype.setFontSize = StringMorph.prototype.setFontSize;

TextMorph.prototype.numericalSetters = StringMorph.prototype.numericalSetters;