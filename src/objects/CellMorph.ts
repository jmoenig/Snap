// CellMorph //////////////////////////////////////////////////////////

/*
    I am a spreadsheet style cell that can display either a string,
    a Morph, a Canvas or a toString() representation of anything else.
    I can be used in variable watchers or list view element cells.
*/

import BoxMorph from "../morphic/morph/BoxMorph";

// CellMorph instance creation:

export default class CellMorph extends BoxMorph {
    constructor(contents, color, idx, parentCell) {
        this.init(contents, color, idx, parentCell);
    }

    init(contents, color, idx, parentCell) {
        this.contents = (contents === 0 ? 0
                : contents === false ? false
                        : contents || '');
        this.isEditable = isNil(idx) ? false : true;
        this.idx = idx || null; // for list watchers
        this.parentCell = parentCell || null; // for list circularity detection
        super.init.call(
            this,
            SyntaxElementMorph.prototype.corner,
            1.000001, // shadow bug in Chrome,
            new Color(255, 255, 255)
        );
        this.color = color || new Color(255, 140, 0);
        this.isBig = false;
        this.version = null; // only for observing sprites
        this.drawNew();
    }

    // CellMorph accessing:

    big() {
        this.isBig = true;
        this.changed();
        this.drawNew();
        this.changed();
    }

    normal() {
        this.isBig = false;
        this.changed();
        this.drawNew();
        this.changed();
    }

    // CellMorph circularity testing:


    isCircular(list) {
        if (!this.parentCell) {return false; }
        if (list instanceof List) {
            return this.contents === list || this.parentCell.isCircular(list);
        }
        return this.parentCell.isCircular(this.contents);
    }

    // CellMorph layout:

    fixLayout() {
        let listwatcher;
        this.changed();
        this.drawNew();
        this.changed();
        if (this.parent && this.parent.fixLayout) { // variable watcher
            this.parent.fixLayout();
        } else {
            listwatcher = this.parentThatIsA(ListWatcherMorph);
            if (listwatcher) {
                listwatcher.fixLayout();
            }
        }
    }

    // CellMorph drawing:

    update() {
        // special case for observing sprites
        if (!isSnapObject(this.contents)) {
            return;
        }
        if (this.version !== this.contents.version) {
            this.drawNew();
        }
    }

    drawNew(toggle, type) {
        let context;
        let txt;
        let img;
        let fontSize = SyntaxElementMorph.prototype.fontSize;

        const isSameList = this.contentsMorph instanceof ListWatcherMorph
                && (this.contentsMorph.list === this.contents);

        const isSameTable = this.contentsMorph instanceof TableFrameMorph
                && (this.contentsMorph.tableMorph.table === this.contents);

        if (this.isBig) {
            fontSize = fontSize * 1.5;
        }

        // re-build my contents
        if (toggle || (this.contentsMorph && !isSameList && !isSameTable)) {
            this.contentsMorph.destroy();
            this.version = null;
        }

        if (toggle || (!isSameList && !isSameTable)) {
            if (this.contents instanceof Morph) {
                if (isSnapObject(this.contents)) {
                    img = this.contents.thumbnail(new Point(40, 40));
                    this.contentsMorph = new Morph();
                    this.contentsMorph.silentSetWidth(img.width);
                    this.contentsMorph.silentSetHeight(img.height);
                    this.contentsMorph.image = img;
                    this.version = this.contents.version;
                } else {
                    this.contentsMorph = this.contents;
                }
            } else if (isString(this.contents)) {
                txt  = this.contents.length > 500 ?
                        `${this.contents.slice(0, 500)}...` : this.contents;
                this.contentsMorph = new TextMorph(
                    txt,
                    fontSize,
                    null,
                    true,
                    false,
                    'left' // was formerly 'center', reverted b/c of code-mapping
                );
                if (this.isEditable) {
                    this.contentsMorph.isEditable = true;
                    this.contentsMorph.enableSelecting();
                }
                this.contentsMorph.setColor(new Color(255, 255, 255));
            } else if (typeof this.contents === 'boolean') {
                img = SpriteMorph.prototype.booleanMorph.call(
                    null,
                    this.contents
                ).fullImage();
                this.contentsMorph = new Morph();
                this.contentsMorph.silentSetWidth(img.width);
                this.contentsMorph.silentSetHeight(img.height);
                this.contentsMorph.image = img;
            } else if (this.contents instanceof HTMLCanvasElement) {
                this.contentsMorph = new Morph();
                this.contentsMorph.silentSetWidth(this.contents.width);
                this.contentsMorph.silentSetHeight(this.contents.height);
                this.contentsMorph.image = this.contents;
            } else if (this.contents instanceof Context) {
                img = this.contents.image();
                this.contentsMorph = new Morph();
                this.contentsMorph.silentSetWidth(img.width);
                this.contentsMorph.silentSetHeight(img.height);
                this.contentsMorph.image = img;
            } else if (this.contents instanceof Costume) {
                img = this.contents.thumbnail(new Point(40, 40));
                this.contentsMorph = new Morph();
                this.contentsMorph.silentSetWidth(img.width);
                this.contentsMorph.silentSetHeight(img.height);
                this.contentsMorph.image = img;
            } else if (this.contents instanceof Sound) {
                this.contentsMorph = new SymbolMorph('notes', 30);
            } else if (this.contents instanceof List) {
                if ('table' === type || (!toggle && this.contents.isTable())) {
                    this.contentsMorph = new TableFrameMorph(new TableMorph(
                        this.contents,
                        10
                    ));
                    this.contentsMorph.expand(new Point(200, 150));
                } else {
                    if (this.isCircular()) {
                        this.contentsMorph = new TextMorph(
                            '(...)',
                            fontSize,
                            null,
                            false, // bold
                            true, // italic
                            'center'
                        );
                        this.contentsMorph.setColor(new Color(255, 255, 255));
                    } else {
                        this.contentsMorph = new ListWatcherMorph(
                            this.contents,
                            this
                        );
                    }
                }
                this.contentsMorph.isDraggable = false;
            } else {
                this.contentsMorph = new TextMorph(
                    !isNil(this.contents) ? this.contents.toString() : '',
                    fontSize,
                    null,
                    true,
                    false,
                    'center'
                );
                if (this.isEditable) {
                    this.contentsMorph.isEditable = true;
                    this.contentsMorph.enableSelecting();
                }
                this.contentsMorph.setColor(new Color(255, 255, 255));
            }
            this.add(this.contentsMorph);
        }

        // adjust my layout
        this.silentSetHeight(this.contentsMorph.height()
            + this.edge
            + this.border * 2);
        this.silentSetWidth(Math.max(
            this.contentsMorph.width() + this.edge * 2,
            (this.contents instanceof Context ||
                this.contents instanceof List ? 0 :
                        SyntaxElementMorph.prototype.fontSize * 3.5)
        ));

        // draw my outline
        this.image = newCanvas(this.extent());
        context = this.image.getContext('2d');
        if ((this.edge === 0) && (this.border === 0)) {
            BoxMorph.uber.drawNew.call(this);
            return null;
        }
        context.fillStyle = this.color.toString();
        context.beginPath();
        this.outlinePath(
            context,
            Math.max(this.edge - this.border, 0),
            this.border
        );
        context.closePath();
        context.fill();
        if (this.border > 0 && !MorphicPreferences.isFlat) {
            context.lineWidth = this.border;
            context.strokeStyle = this.borderColor.toString();
            context.beginPath();
            this.outlinePath(context, this.edge, this.border / 2);
            context.closePath();
            context.stroke();

            context.shadowOffsetX = this.border;
            context.shadowOffsetY = this.border;
            context.shadowBlur = this.border;
            context.shadowColor = this.color.darker(80).toString();
            this.drawShadow(context, this.edge, this.border / 2);
        }

        // position my contents
        if (toggle || (!isSameList && !isSameTable)) {
            this.contentsMorph.setCenter(this.center());
        }
    }

    drawShadow(context, radius, inset) {
        const offset = radius + inset;
        const w = this.width();
        const h = this.height();

        // bottom left:
        context.beginPath();
        context.moveTo(0, h - offset);
        context.lineTo(0, offset);
        context.stroke();

        // top left:
        context.beginPath();
        context.arc(
            offset,
            offset,
            radius,
            radians(-180),
            radians(-90),
            false
        );
        context.stroke();

        // top right:
        context.beginPath();
        context.moveTo(offset, 0);
        context.lineTo(w - offset, 0);
        context.stroke();
    }

    // CellMorph editing (inside list watchers):

    layoutChanged() {
        let context;
        let fontSize = SyntaxElementMorph.prototype.fontSize;
        const listWatcher = this.parentThatIsA(ListWatcherMorph);

        if (this.isBig) {
            fontSize = fontSize * 1.5;
        }

        // adjust my layout
        this.silentSetHeight(this.contentsMorph.height()
            + this.edge
            + this.border * 2);
        this.silentSetWidth(Math.max(
            this.contentsMorph.width() + this.edge * 2,
            (this.contents instanceof Context ||
                this.contents instanceof List ? 0 : this.height() * 2)
        ));


        // draw my outline
        this.image = newCanvas(this.extent());
        context = this.image.getContext('2d');
        if ((this.edge === 0) && (this.border === 0)) {
            BoxMorph.uber.drawNew.call(this);
            return null;
        }
        context.fillStyle = this.color.toString();
        context.beginPath();
        this.outlinePath(
            context,
            Math.max(this.edge - this.border, 0),
            this.border
        );
        context.closePath();
        context.fill();
        if (this.border > 0 && !MorphicPreferences.isFlat) {
            context.lineWidth = this.border;
            context.strokeStyle = this.borderColor.toString();
            context.beginPath();
            this.outlinePath(context, this.edge, this.border / 2);
            context.closePath();
            context.stroke();

            context.shadowOffsetX = this.border;
            context.shadowOffsetY = this.border;
            context.shadowBlur = this.border;
            context.shadowColor = this.color.darker(80).toString();
            this.drawShadow(context, this.edge, this.border / 2);
        }

        // position my contents
        this.contentsMorph.setCenter(this.center());

        if (listWatcher) {
            listWatcher.fixLayout();
        }
    }

    reactToEdit(textMorph) {
        let listWatcher;
        if (!isNil(this.idx)) {
            listWatcher = this.parentThatIsA(ListWatcherMorph);
            if (listWatcher) {
                listWatcher.list.put(textMorph.text, this.idx);
            }
        }
    }

    mouseClickLeft(pos) {
        if (this.isEditable && this.contentsMorph instanceof TextMorph) {
            this.contentsMorph.selectAllAndEdit();
        } else {
            this.escalateEvent('mouseClickLeft', pos);
        }
    }

    mouseDoubleClick(pos) {
        if (List.prototype.enableTables &&
                this.currentValue instanceof List) {
            new TableDialogMorph(this.contents).popUp(this.world());
        } else {
            this.escalateEvent('mouseDoubleClick', pos);
        }
    }
}

