// TableMorph //////////////////////////////////////////////////////////

import FrameMorph from "../morphic/morph/FrameMorph";

// TableMorph preferences settings:

TableMorph.prototype.highContrast = false;

// TableMorph instance creation:

export default class TableMorph extends FrameMorph {
    constructor(
        table,
        // optional parameters below this line
        scrollBarSize,
        extent,
        startRow,
        startCol,
        globalColWidth,
        colWidths,
        rowHeight,
        colLabelHeight,
        padding) {
        this.init(
            table,
            scrollBarSize,
            extent,
            startRow,
            startCol,
            globalColWidth,
            colWidths,
            rowHeight,
            colLabelHeight,
            padding
        );
    }

    init(
        table,
        scrollBarSize,
        extent,
        startRow,
        startCol,
        globalColWidth,
        colWidths,
        rowHeight,
        colLabelHeight,
        padding) {
        // additional properties:
        this.table = table;
        this.scrollBarSize = scrollBarSize || MorphicPreferences.scrollBarSize;
        this.startRow = startRow || 1;
        this.startCol = startCol || 1;
        this.textHeight = Math.ceil(
            fontHeight(SyntaxElementMorph.prototype.fontSize) * 1.3
        );
        this.rowHeight = rowHeight || this.textHeight;
        this.colWidths = colWidths || [];
        this.globalColWidth = globalColWidth || Math.ceil(this.textHeight * 3.5);
        this.colLabelHeight = colLabelHeight || this.textHeight;
        this.padding = padding || SyntaxElementMorph.prototype.scale; //1;
        this.tableVersion = this.table.lastChanged;

        // scroll bars:
        this.hBar = null;
        this.vBar = null;

        // cached properties (do not persist):
        this.rowLabelWidth = 0;
        this.columns = []; // relative left positions
        this.rows = 0;

        // cached properties for scrolling and resizing (do not persist):
        this.maxStartRow = null;
        this.maxStartCol = null;
        this.dragAnchor = null;
        this.resizeAnchor = null;
        this.resizeCol = null;
        this.resizeRow = null;

        // cached property for updating (don not persist):
        this.wantsUpdate = false;

        // initialize inherited properties:
        // make sure not to draw anything just yet
        // therefore omit FrameMorph's properties (not needed here)
        // and only initialize properties inherited from Morph:
        Morph.prototype.init.call(this, true);

        // override inherited properites:
        // this.fps = 3; // this will slow down the sliders (!)
        if (extent) {this.silentSetExtent(extent); }
        this.initScrollBars();
        this.drawNew();
    }

    initScrollBars() {
        const myself = this;

        // horizontal scroll bar - scrolls columns
        this.hBar = new SliderMorph(
            1, // start
            null, // stop
            null, // value
            null, // size
            'horizontal'
        );
        this.hBar.setHeight(this.scrollBarSize);
        this.hBar.action = num => {
            myself.showData(num, null, true);
        };
        this.hBar.isDraggable = false;
        this.add(this.hBar);

        // vertical scroll bar - scrolls rows
        this.vBar = new SliderMorph(
            1, // start
            null, // stop
            null, // value
            null, // size
            'vertical'
        );
        this.vBar.setWidth(this.scrollBarSize);
        this.vBar.action = num => {
            myself.showData(null, num, true);
        };
        this.vBar.isDraggable = false;
        this.add(this.vBar);
    }

    updateScrollBars() {
        if (this.maxStartCol === 1) {
            this.hBar.hide();
        } else {
            this.hBar.show();
            this.hBar.stop = this.maxStartCol;
            this.hBar.value = this.startCol;
            this.hBar.size = Math.max(
                this.hBar.rangeSize() * this.columns.length / this.table.cols(),
                this.hBar.rangeSize() / 10
            );
            this.hBar.drawNew();
        }

        this.vBar.stop = this.maxStartRow;
        this.vBar.value = this.startRow;
        if (this.maxStartRow === 1) {
            this.vBar.hide();
        } else {
            this.vBar.show();
            this.vBar.size = Math.max(
                this.vBar.rangeSize() * this.rows / this.table.rows(),
                this.vBar.rangeSize() / 10
            );
            this.vBar.drawNew();
        }
    }

    drawNew() {
        let context;
        let w;
        let i;
        this.image = newCanvas(this.extent());
        context = this.image.getContext('2d');
        context.fillStyle = 'rgb(220, 220, 220)';
        BoxMorph.prototype.outlinePath.call(
            this, context, SyntaxElementMorph.prototype.corner + 1, 0
        );
        context.fill();

        // determine and cache layout information
        this.rowLabelWidth = this.rowLabelsWidth();
        this.columns = this.columnsLayout();
        this.rows = this.visibleRows();

        // optionally draw grid
        if (this.highContrast && this.table.cols() > 1) {
            w = this.padding;
            for (i = this.startCol; i <= this.table.cols(); i += 1) {
                w += (this.colWidth(i) + this.padding);
            }
            context.fillStyle = 'darkGray';
            context.fillRect(
                this.padding + this.rowLabelWidth,
                this.padding + this.colLabelHeight,
                w,
                (this.rowHeight + this.padding) *
                    (this.table.rows() + 1 - this.startRow) +
                    this.padding
            );
        }

        this.buildCells();

        // fix scroll bars layout
        this.hBar.setWidth(this.width() - this.vBar.width());
        this.hBar.setLeft(this.left());
        this.hBar.setBottom(this.bottom());
        this.vBar.setHeight(this.height() - this.hBar.height());
        this.vBar.setRight(this.right());
        this.vBar.setTop(this.top());
    }

    buildCells() {
        // also populate cells with the correct data and
        // arrange the layout of cells all in one pass
        let cell;

        let r;
        let c;
        const pos = this.position();

        // delete all existing cells
        this.children = [];

        // create cells
        for (c = 0; c <= this.columns.length; c += 1) {
            for (r = 0; r <= this.rows; r += 1) {
                cell = new TableCellMorph(
                    this.table.get(
                        !c ? c : c + this.startCol - 1,
                        !r ? r : r + this.startRow - 1
                    ),
                    new Point(
                        !c ? this.rowLabelWidth
                                : this.colWidth(c + this.startCol - 1),
                        !r ? this.colLabelHeight : this.rowHeight
                    ),
                    !(r && c), // isLabel
                    false // should be list
                );
                cell.setPosition(
                    new Point(
                        !c ? this.padding
                                : this.columns[c - 1],
                        !r ? this.padding :
                                this.padding * 2 + this.colLabelHeight +
                                    ((r - 1) * (this.rowHeight + this.padding))
                    ).add(pos)
                );
                this.add(cell);
                if (isSnapObject(cell.getData())) {
                    this.wantsUpdate = true;
                }
            }
        }
        this.add(this.hBar);
        this.add(this.vBar);
        this.updateScrollBars();
        this.changed();
    }

    drawData(noScrollUpdate) {
        // redraw all cells with their current data or label
        let cell;

        let cellIdx = 0;
        let r;
        let c;
        for (c = 0; c <= this.columns.length; c += 1) {
            for (r = 0; r <= this.rows; r += 1) {
                cell = this.children[cellIdx];
                cellIdx += 1;
                cell.setData(
                    this.table.get(
                        !c ? c : c + this.startCol - 1,
                        !r ? r : r + this.startRow - 1
                    )
                );
                if (isSnapObject(cell.getData())) {
                    this.wantsUpdate = true;
                }
            }
        }
        if (!noScrollUpdate) {this.updateScrollBars(); }
        this.changed();
    }

    // TableMorph scrolling

    scroll(xSteps, ySteps) {
        this.showData(
            Math.min(
                this.maxStartCol,
                Math.max(1, this.startCol + Math.round(xSteps))
            ),
            Math.min(
                this.maxStartRow,
                Math.max(1, this.startRow + Math.round(ySteps))
            )
        );
        this.updateScrollBars();
    }

    showData(startCol, startRow, noScrollUpdate) {
        const c = startCol || this.startCol;
        const r = startRow || this.startRow;
        if (c === this.startCol) {
            if (r === this.startRow) {return; } // no change
            this.startRow = r;
            this.rows = this.visibleRows();
            this.drawData(noScrollUpdate);
        } else {
            this.startCol = c;
            this.startRow = r;
            this.rows = this.visibleRows();
            if (this.colWidths.length) {
                this.columns = this.columnsLayout();
                this.buildCells();
            } else {
                this.drawData(noScrollUpdate);
            }
        }
    }

    // TableMorph stepping

    step() {
        if (this.dragAnchor) {
            this.shiftCells(this.world().hand.position());
        } else if (this.resizeAnchor) {
            this.resizeCells(this.world().hand.position());
        }
        this.update();
    }

    update() {
        let oldCols;
        let oldRows;

        const version = this.table instanceof List ?
            this.table.version(this.startRow, this.rows)
                    : this.table.lastChanged;

        if (this.tableVersion === version && !this.wantsUpdate) {
            return;
        }
        this.wantsUpdate = false;
        if (this.table instanceof List) {
            oldCols = this.columns.length;
            oldRows = this.rows;
            this.rowLabelWidth = this.rowLabelsWidth();
            this.columns = this.columnsLayout();
            this.rows = this.visibleRows();
            if (this.columns.length !== oldCols || (this.rows !== oldRows)) {
                this.buildCells();
            } else {
                this.drawData();
            }
        } else { // Table
            this.drawData();
        }
        this.tableVersion = version;
    }

    // TableMorph layout helpers (all private):

    rowLabelsWidth() {
        const ctx = newCanvas().getContext('2d');
        ctx.font = `italic ${SyntaxElementMorph.prototype.fontSize}px Helvetica, Arial, sans-serif`;
        return Math.max(
            0,
            Math.max.apply(
                null,
                this.table.columnNames().map(name => name ? ctx.measureText(name).width : 0)
            )
        ) || ctx.measureText(this.table.rows().toString()).width +
                (6 * SyntaxElementMorph.prototype.scale);
    }

    columnsLayout() {
        // determines and maxStartCol and
        // modifies startCol if needed
        const c = [];

        let x = this.padding * 2 + this.rowLabelWidth;
        let colNum;
        let w;

        // determine maxStartCol
        colNum = this.table.cols();
        w = x;
        while (w < this.width() && colNum > 0) {
            w += this.colWidth(colNum);
            colNum -= 1;
        }
        if (colNum === 0 && (w < this.width())) {
            this.maxStartCol = 1;
        } else {
            this.maxStartCol = Math.min(colNum + 2, this.table.cols());
        }

        // determine the left position of every shown column
        this.startCol = Math.min(this.startCol, this.maxStartCol);
        colNum = this.startCol;
        while (x < this.width() &&
            (colNum < (this.table.cols() + this.startCol))
        ) {
            w = this.colWidth(colNum);
            c.push(x);
            x += w;
            x += this.padding;
            colNum += 1;
        }
        return c;
    }

    colWidth(col) {
        return this.colWidths[col - 1] || this.globalColWidth;
    }

    visibleRows() {
        // determines maxStartRow and
        // modifies startRow if needed
        const rest = this.height() - this.colLabelHeight - this.padding;

        let possible;
        if (rest < 0) {return 0; }
        possible = Math.ceil(rest / (this.rowHeight + this.padding));
        this.maxStartRow = Math.max(1, this.table.rows() - possible + 2);
        this.startRow = Math.min(this.startRow, this.maxStartRow);
        return Math.min(this.table.rows(), possible);
    }

    globalExtent() {
        let i;
        let w = this.rowLabelsWidth() + 2;
        const cols = this.table.cols();
        for (i = 0; i < cols; i += 1) {
            w += this.colWidth(i + 1);
            w += this.padding;
        }
        if (cols === 1) {
            w += this.scrollBarSize;
            w += this.padding * 2;
        }
        return new Point(
            w + this.padding,
            this.colLabelHeight + (this.padding * 2) +
                ((this.rowHeight + this.padding) * this.table.rows())
        );
    }

    // TableMorph events:

    mouseScroll(y, x) {
        this.scroll(
            -(+x * MorphicPreferences.mouseScrollAmount / 4),
            -(+y * MorphicPreferences.mouseScrollAmount)
        );
    }

    mouseDownLeft(pos) {
        const rel = pos.subtract(this.position());
        if (rel.x <= this.rowLabelWidth || (rel.y <= this.colLabelHeight)) {
            // resize cells
            if (this.world().currentKey === 16) { // shiftClicked
                this.resizeCol = 0;
            } else {
                this.resizeCol = this.columnAt(rel.x);
            }
            this.resizeRow = (rel.y > (this.colLabelHeight));
            this.resizeAnchor = pos;
        } else {
            // shift the viewed portion
            this.resizeRow = null;
            this.dragAnchor = pos;
        }
    }

    mouseClickLeft(pos) {
        this.dragAnchor = null;
        this.resizeAnchor = null;
            this.resizeRow = null;
    }

    mouseLeaveDragging(pos) {
        this.dragAnchor = null;
        this.resizeAnchor = null;
            this.resizeRow = null;
    }

    mouseDoubleClick(pos) {
        if (this.parentThatIsA(TableDialogMorph)) {
            this.escalateEvent('mouseDoubleClick', pos);
        } else {
            new TableDialogMorph(
                this.table,
                this.globalColWidth,
                this.colWidths,
                this.rowHeight
            ).popUp(this.world());
        }
    }

    // TableMorph scrolling and resizing cells by "hand"

    shiftCells(pos) {
        const delta = this.dragAnchor.subtract(pos);
        const scrollX = Math.round(delta.x / this.globalColWidth);
        const scrollY = Math.round(delta.y / this.rowHeight);
        if (scrollX || scrollY) {
            this.scroll(scrollX, scrollY);
            this.dragAnchor = pos;
        }
    }

    resizeCells(pos) {
        const delta = pos.subtract(this.resizeAnchor);
        let i;

        if (this.resizeCol) {
            this.colWidths[this.resizeCol - 1] = Math.max(
                16,
                (this.colWidths[this.resizeCol - 1] || this.globalColWidth) +
                    delta.x
            );
        } else if (this.resizeRow) {
            this.rowHeight = Math.max(16, this.rowHeight + delta.y);
        } else {
            this.globalColWidth = Math.max(16, this.globalColWidth + delta.x);
            for (i = 0; i < this.colWidths.length; i += 1) {
                if (this.colWidths[i]) {
                    this.colWidths[i] = Math.max(
                        16,
                        this.colWidths[i] + delta.x
                    );
                }
            }
        }
        if (this.highContrast) {
            this.drawNew();
        } else {
            this.rowLabelWidth = this.rowLabelsWidth();
            this.columns = this.columnsLayout();
            this.rows = this.visibleRows();
            this.buildCells();
        }
        this.resizeAnchor = pos;
    }

    columnAt(relativeX) {
        let c = 0;
        if (relativeX < (this.columns[0])) {
            return 0;
        }
        while (relativeX > this.columns[c]) {
            c += 1;
        }
        return c + this.startCol - 1;
    }

    // TableMorph context menu

    userMenu() {
        const menu = new MenuMorph(this);
        if (this.parentThatIsA(TableDialogMorph)) {
            if (this.colWidths.length) {
                menu.addItem('reset columns', 'resetColumns');
                menu.addLine();
            }
            menu.addItem('open in another dialog...', 'openInDialog');
            return menu;
        }

        if (this.colWidths.length) {
            menu.addItem('reset columns', 'resetColumns');
        }
        menu.addItem('list view...', 'showListView');
        menu.addLine();
        menu.addItem('open in dialog...', 'openInDialog');
        return menu;
    }

    resetColumns() {
        this.colWidths = [];
        if (this.highContrast) {
            this.drawNew();
        } else {
            this.rowLabelWidth = this.rowLabelsWidth();
            this.columns = this.columnsLayout();
            this.rows = this.visibleRows();
            this.buildCells();
        }
    }

    openInDialog() {
        new TableDialogMorph(
            this.table,
            this.globalColWidth,
            this.colWidths,
            this.rowHeight
        ).popUp(this.world());
    }

    showListView() {
        const view = this.parentThatIsAnyOf([
            SpriteBubbleMorph,
            SpeechBubbleMorph,
            CellMorph
        ]);
        if (!view) {return; }
        if (view instanceof SpriteBubbleMorph) {
            view.changed();
            view.drawNew(true);
        } else if (view instanceof SpeechBubbleMorph) {
            view.contents = new ListWatcherMorph(this.table);
            view.contents.step = view.contents.update;
            view.contents.expand(this.extent());
            view.drawNew(true);
        } else { // watcher cell
            view.drawNew(true);
            view.contentsMorph.expand(this.extent());
        }
        view.fixLayout();
    }

    // TableMorph updating:

    show() {
        super.show.call(this);
        this.updateScrollBars();
    }
}