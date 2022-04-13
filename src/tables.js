/*

    tables.js

    basic spreadsheet elements for Snap!

    written by Jens Mönig
    jens@moenig.org

    Copyright (C) 2020 by Jens Mönig

    This file is part of Snap!.

    Snap! is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of
    the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.


    prerequisites:
    --------------
    needs morphic.js, list.js, widgets.js, byob.js, threads


    I. hierarchy
    -------------
    the following tree lists all constructors hierarchically,
    indentation indicating inheritance. Refer to this list to get a
    contextual overview:

    DialogBoxMorph**
        TableDialogMorph
    Morph*
        FrameMorph*
            TableMorph
        TableCellMorph
        TableFrameMorph
    Table

    * from morphic.js
    ** from widgets.js


    II. toc
    -------
    the following list shows the order in which all constructors are
    defined. Use this list to locate code in this document:

    Table
    TableCellMorph
    TableMorph
    TableFrameMorph
    TableDialogMorph

*/

// Global settings /////////////////////////////////////////////////////

/*global modules, Point, Morph, fontHeight, SliderMorph, isString, detect,
MorphicPreferences, FrameMorph, HandleMorph, DialogBoxMorph, StringMorph,
SpriteMorph, Context, Costume, BlockEditorMorph, SymbolMorph, List, IDE_Morph,
SyntaxElementMorph, MenuMorph, SpriteBubbleMorph, SpeechBubbleMorph, Sound,
CellMorph, ListWatcherMorph, isNil, BoxMorph, Variable, isSnapObject*/

modules.tables = '2020-May-18';

var Table;
var TableCellMorph;
var TableMorph;
var TableFrameMorph;

// Table /////////////////////////////////////////////////////////////

/*
    Observable 2D data collections accessible by rows, columns and cells
    with indices starting at 1.
    currently only used for testing TableViews in Snap, because Snap
    automatically displays 2D lists as tables.
*/

function Table(cols, rows) {
    this.colCount = +cols;
    this.rowCount = +rows;
    this.colNames = [];
    this.rowNames = [];
    this.contents = new Array(+rows);
    for (var i = 0; i < rows; i += 1) {
        this.contents[i] = new Array(+cols);
    }
    this.lastChanged = Date.now();
}

// Table testing:

Table.prototype.demo = function(aWorld) {
    // new Table(50, 10000).demo(world)
    var dlg;
    this.fillWithTestData();
    dlg = new TableDialogMorph(this);
    dlg.popUp (aWorld);
};

// Table updating:

Table.prototype.changed = function () {
    this.lastChanged = Date.now();
};

// Table querying:

Table.prototype.get = function (col, row) {
    if (!col) {
        if (!row) {return [this.rowCount]; }
        return this.rowName(row);
    } else if (!row) {
        return this.colName(col);
    }
    if (col > this.colCount || row > this.rowCount) {return null; }
    return (this.contents[row - 1] || [])[col - 1];
};

Table.prototype.row = function(row) {
    return this.contents[row - 1];
};

Table.prototype.col = function(col) {
    var dta = [],
        c = col - 1,
        i;
    for (i = 0; i < this.rowCount; i += 1) {
        dta.push(this.contents[i][c]);
    }
    return dta;
};

Table.prototype.colName = function (col) {
    // answer the specified name or a capital letter A-Z
    // repeated accordingly
    if (col > this.colCount) {return null; }
    var name = this.colNames[col - 1];
    if (name !== undefined) {return name; }
    return String.fromCharCode(64 + ((col % 26) || 26)).repeat(
        Math.floor((col - 1) / 26) + 1
    );
};

Table.prototype.rowName = function (row) {
    // answer the specified name or row number
    if (row > this.rowCount) {return null; }
    return this.rowNames[row - 1] || row;
};

Table.prototype.rows = function () {
    return this.rowCount;
};

Table.prototype.cols = function () {
    return this.colCount;
};

Table.prototype.columnNames = function () {
    return this.colNames;
};

// Table setting:

Table.prototype.set = function (data, col, row) {
    this.contents[row - 1][col - 1] = data;
    this.changed();
};

Table.prototype.setRows = function (rowsArray, colNames, rowNames) {
    this.contents = rowsArray;
    if (colNames) {this.colNames = colNames; }
    if (rowNames) {this.rowNames = rowNames; }
    this.changed();
};

Table.prototype.setCols = function (colsArray, colNames, rowNames) {
    var r, c;
    for (c = 0; c < this.colCount; c += 1) {
        for (r = 0; r < this.rowCount; r += 1) {
            this.contents[r][c] = colsArray[c][r];
        }
    }
    if (colNames) {this.colNames = colNames; }
    if (rowNames) {this.rowNames = rowNames; }
    this.changed();
};

Table.prototype.setColNames = function (array) {
    this.colNames = array || [];
    this.changed();
};

Table.prototype.setRowNames = function (array) {
    this.rowNames = array || [];
    this.changed();
};

Table.prototype.setColName = function (col, name) {
    this.colNames[col + 1] = name;
    this.changed();
};

Table.prototype.setRowName = function (row, name) {
    this.rowNames[row + 1] = name;
    this.changed();
};

// Table growing:

Table.prototype.addRow = function (array, name) {
    if (array) {
        this.contents[this.rowCount] = array;
    } else {
        this.contents[this.rowCount] = new Array(this.rowCount);
    }
    this.rowNames[this.rowCount] = name;
    this.rowCount += 1;
    this.changed();
};

Table.prototype.addCol = function (array, name) {
    var i;
    if (array) {
        for (i = 0; i < this.col; i += 1) {
            this.contents[i][this.colCount] = array[i];
        }
    }
    this.colNames[this.colCount] = name;
    this.colCount += 1;
    this.changed();
};

// Table converting:

Table.prototype.toList = function () {
    return new List(
        this.contents.map(eachRow => new List(eachRow))
    );
};

// Table testing

Table.prototype.fillWithTestData = function () {
    var c, r;
    for (c = 1; c <= this.colCount; c += 1) {
        for (r = 1; r <= this.rowCount; r += 1) {
            this.set (this.colName(c) + this.rowName(r), c, r);
        }
    }
};

// TableCellMorph /////////////////////////////////////////////////////////

// basic fast data view, currently constrained to a single line of text

// TableCellMorph inherits from Morph:

TableCellMorph.prototype = new Morph();
TableCellMorph.prototype.constructor = TableCellMorph;
TableCellMorph.uber = Morph.prototype;

// TableCellMorph global setting:

TableCellMorph.prototype.cachedListSymbol = null;

TableCellMorph.prototype.listSymbol = function () {
    if (!this.cachedListSymbol || this.cachedListSymbol.height() !==
            SyntaxElementMorph.prototype.fontSize) {
        this.cachedListSymbol = new SymbolMorph(
            'list',
            SyntaxElementMorph.prototype.fontSize,
            SpriteMorph.prototype.blockColor.lists.darker(50)
        );
    }
    return this.cachedListSymbol.getImage();
};

// TableCellMorph instance creation:

function TableCellMorph(data, extent, isLabel) {
    this.init(data, extent, isLabel);
}

TableCellMorph.prototype.init = function (data, extent, isLabel) {
    // additional properties:
    this.data = data;
    this.isLabel = isLabel || false;
    this.labelString = null;

    // initialize inherited properties:
    TableCellMorph.uber.init.call(this, true);

    // override inherited properties:
    if (extent) {this.bounds.setExtent(extent); }
    this.fixLayout();
};

TableCellMorph.prototype.setData = function (data, extent) {
    this.data = data;
    if (extent && (!extent.eq(this.extent()))) {
        this.bounds.setExtent(extent);
    }
    this.rerender();
};

TableCellMorph.prototype.getData = function () {
    return this.data instanceof Array ? this.data[0] : this.data;
};

TableCellMorph.prototype.render = function (ctx) {
    var dta = this.labelString || this.dataRepresentation(this.data),
        fontSize = SyntaxElementMorph.prototype.fontSize,
        empty = TableMorph.prototype.highContrast ? 'rgb(220, 220, 220)'
                : 'transparent',
        orphaned = 'rgb(217, 77, 17)',
        fontStyle = this.isLabel ?
                (this.data instanceof Array ? 'italic'  : '')
                        : this.shouldBeList() ? 'bold' : '',
        font = fontStyle + ' ' + fontSize + 'px Helvetica, Arial, sans-serif',
        background = this.labelString ? 'rgb(220, 220, 250)'
            : (this.isLabel ? empty
                : (this.shouldBeList() ? orphaned
                        : (this.isOvershooting() ? 'white'
                                : (isNil(this.data) ? empty : 'white')))),
        foreground = !this.isLabel && this.shouldBeList()? 'white' : 'black',
        width = this.width(),
        height = this.height(),
        txtWidth,
        txtHeight,
        x,
        y;

    ctx.fillStyle = background;
    if (this.shouldBeList()) {
        BoxMorph.prototype.outlinePath.call(
            this, ctx, SyntaxElementMorph.prototype.corner + 1, 0
        );
        ctx.fill();
    } else if (this.isOvershooting()) {
        this.raggedBoxPath(ctx);
        ctx.fill();
    } else {
        ctx.fillRect(0, 0, width, height);
    }

    if (!dta) {return; }
    if (dta instanceof HTMLCanvasElement) {
        x = Math.max((width - dta.width) / 2, 0);
        y = Math.max((height - dta.height) / 2, 0);
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 4;
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'lightgray';
        ctx.drawImage(dta, x, y);
    } else { // text
        ctx.font = font;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'bottom';
        txtWidth = ctx.measureText(dta).width;
        txtHeight = fontHeight(fontSize);
        ctx.fillStyle = foreground;
        x = Math.max((width - txtWidth) / 2, 0);
        y = Math.max((height - txtHeight) / 2, 0);
        ctx.fillText(dta, x, txtHeight + y);
    }
};

TableCellMorph.prototype.dataRepresentation = function (dta) {
    if (dta instanceof Morph) {
        if (isSnapObject(dta)) {
            return dta.thumbnail(new Point(40, 40));
        } else {
            return dta.fullImage();
        }
    } else if (isString(dta)) {
        return dta.length > 100 ? dta.slice(0, 100) + '...' : dta;
    } else if (typeof dta === 'number') {
        return dta.toString();
    } else if (typeof dta === 'boolean') {
        return SpriteMorph.prototype.booleanMorph.call(
            null,
            dta
        ).fullImage();
    } else if (dta instanceof Array) {
        return this.dataRepresentation(dta[0]);
    } else if (dta instanceof Variable) {
        return this.dataRepresentation(dta.value);
    } else if (dta instanceof HTMLCanvasElement) {
        return dta;
    } else if (dta instanceof Context) {
        return dta.image();
    } else if (dta instanceof Costume) {
        return dta.thumbnail(new Point(40, 40));
    } else if (dta instanceof Sound) {
        return new SymbolMorph(
            'notes', SyntaxElementMorph.prototype.fontSize
        ).getImage();
    } else if (dta instanceof List) {
        return this.listSymbol();
    } else {
        return dta ? dta.toString() : (dta === 0 ? '0' : null);
    }
};

TableCellMorph.prototype.raggedBoxPath = function (context) {
    var width = this.width(),
        height = this.height(),
        x = width * 0.75,
        step = height / 6,
        y = 0;
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(width, 0);
    for (y = 0; y < height; y += (step * 2)) {
        context.lineTo(x, y + step);
        context.lineTo(width, y + (step * 2));
    }
    context.lineTo(width, height);
    context.lineTo(0, height);
    context.closePath();
};

TableCellMorph.prototype.shouldBeList = function () {
    return this.data instanceof Array;
};

TableCellMorph.prototype.isOvershooting = function () {
    return this.data instanceof Variable;
};

// TableCellMorph events:

TableCellMorph.prototype.mouseDoubleClick = function (pos) {
    if (this.data instanceof Table || this.data instanceof List) {
        new TableDialogMorph(this.data).popUp(this.world());
    } else if (this.data instanceof Array && this.data[0] instanceof List) {
        new TableDialogMorph(this.data[0]).popUp(this.world());
    } else {
        this.escalateEvent('mouseDoubleClick', pos);
    }
};

TableCellMorph.prototype.mouseEnter = function () {
    var tm, x, c;
    if (this.isLabel) {
        tm = this.parentThatIsA(TableMorph);
        x = tm.world().hand.left() - tm.left();
        c = tm.columnAt(x);
        if (c > 0) {
            this.labelString = c;
            this.rerender();
        }
    }
};

TableCellMorph.prototype.mouseLeave = function () {
    if (this.isLabel) {
        this.labelString = null;
        this.rerender();
    }
};

// TableMorph //////////////////////////////////////////////////////////

// TableMorph inherits from FrameMorph:

TableMorph.prototype = new FrameMorph();
TableMorph.prototype.constructor = TableMorph;
TableMorph.uber = FrameMorph.prototype;

// TableMorph preferences settings:

TableMorph.prototype.highContrast = false;

// TableMorph instance creation:

function TableMorph(
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
    padding
) {
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

TableMorph.prototype.init = function (
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
) {
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

    // override inherited properties:
    // this.fps = 3; // this will slow down the sliders (!)
    if (extent) {this.bounds.setExtent(extent); }
    this.initScrollBars();
    this.fixLayout();
};

TableMorph.prototype.initScrollBars = function () {
    var myself = this;

    // horizontal scroll bar - scrolls columns
    this.hBar = new SliderMorph(
        1, // start
        null, // stop
        null, // value
        null, // size
        'horizontal'
    );
    this.hBar.setHeight(this.scrollBarSize);
    this.hBar.action = function (num) {
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
    this.vBar.action = function (num) {
        myself.showData(null, num, true);
    };
    this.vBar.isDraggable = false;
    this.add(this.vBar);
};

TableMorph.prototype.updateScrollBars = function () {
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
        this.hBar.fixLayout();
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
        this.vBar.fixLayout();
    }
};

TableMorph.prototype.fixLayout = function () {
    TableMorph.uber.fixLayout.call(this);

    // determine and cache layout information
    this.rowLabelWidth = this.rowLabelsWidth();
    this.columns = this.columnsLayout();
    this.rows = this.visibleRows();

    this.buildCells();

    // fix scroll bars layout
    this.hBar.setWidth(this.width() - this.vBar.width());
    this.hBar.setLeft(this.left());
    this.hBar.setBottom(this.bottom());
    this.vBar.setHeight(this.height() - this.hBar.height());
    this.vBar.setRight(this.right());
    this.vBar.setTop(this.top());
};

TableMorph.prototype.render = function (ctx) {
    var w, i;
    ctx.fillStyle = 'rgb(220, 220, 220)';
    BoxMorph.prototype.outlinePath.call(
        this,
        ctx, SyntaxElementMorph.prototype.corner + 1,
        0
    );
    ctx.fill();

    // optionally draw grid
    if (this.highContrast && this.table.cols() > 1) {
        w = this.padding;
        for (i = this.startCol; i <= this.table.cols(); i += 1) {
            w += (this.colWidth(i) + this.padding);
        }
        ctx.fillStyle = 'darkGray';
        ctx.fillRect(
            this.padding + this.rowLabelWidth,
            this.padding + this.colLabelHeight,
            w,
            (this.rowHeight + this.padding) *
                (this.table.rows() + 1 - this.startRow) +
                this.padding
        );
    }
};

TableMorph.prototype.buildCells = function () {
    // also populate cells with the correct data and
    // arrange the layout of cells all in one pass
    var cell, r, c,
        pos = this.position();

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
};

TableMorph.prototype.drawData = function (noScrollUpdate) {
    // redraw all cells with their current data or label
    var cell, cellIdx = 0, r, c;
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
};

// TableMorph scrolling

TableMorph.prototype.scroll = function (xSteps, ySteps) {
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
};

TableMorph.prototype.showData = function (startCol, startRow, noScrollUpdate) {
    var c = startCol || this.startCol,
        r = startRow || this.startRow;
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
};

// TableMorph stepping

TableMorph.prototype.step = function () {
    if (this.dragAnchor) {
        this.shiftCells(this.world().hand.position());
    } else if (this.resizeAnchor) {
        this.resizeCells(this.world().hand.position());
    }
    this.update();
};

TableMorph.prototype.update = function () {
    var oldCols, oldRows,
        version = this.table instanceof List ?
            this.table.version(
                this.startRow,
                this.rows,
                this.startCol,
                this.columns.length
            ) : this.table.lastChanged;
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
};

// TableMorph layout helpers (all private):

TableMorph.prototype.rowLabelsWidth = function () {
    var ctx = StringMorph.prototype.measureCtx;
    ctx.font = 'italic ' + SyntaxElementMorph.prototype.fontSize +
        'px Helvetica, Arial, sans-serif';
    return Math.max(
        0,
        Math.max.apply(
            null,
            this.table.columnNames().map(
                name => name ? ctx.measureText(name).width : 0
            )
        )
    ) || ctx.measureText(this.table.rows().toString()).width +
            (6 * SyntaxElementMorph.prototype.scale);
};

TableMorph.prototype.columnsLayout = function () {
    // determines and maxStartCol and
    // modifies startCol if needed
    var c = [],
        x = this.padding * 2 + this.rowLabelWidth,
        colNum,
        w;

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
};

TableMorph.prototype.colWidth = function (col) {
    return this.colWidths[col - 1] || this.globalColWidth;
};

TableMorph.prototype.visibleRows = function () {
    // determines maxStartRow and
    // modifies startRow if needed
    var rest = this.height() - this.colLabelHeight - this.padding,
        possible;
    if (rest < 0) {return 0; }
    possible = Math.ceil(rest / (this.rowHeight + this.padding));
    this.maxStartRow = Math.max(1, this.table.rows() - possible + 2);
    this.startRow = Math.min(this.startRow, this.maxStartRow);
    return Math.min(this.table.rows(), possible);
};

TableMorph.prototype.globalExtent = function () {
    var i,
        w = this.rowLabelsWidth() + 2,
        cols = this.table.cols();
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
};

// TableMorph events:

TableMorph.prototype.mouseScroll = function (y, x) {
    this.scroll(
        -(+x * MorphicPreferences.mouseScrollAmount / 4),
        -(+y * MorphicPreferences.mouseScrollAmount)
    );
};

TableMorph.prototype.mouseDownLeft = function (pos) {
    var rel = pos.subtract(this.position());
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
};

TableMorph.prototype.mouseClickLeft = function (pos) {
    this.dragAnchor = null;
    this.resizeAnchor = null;
        this.resizeRow = null;
};

TableMorph.prototype.mouseLeaveDragging = function (pos) {
    this.dragAnchor = null;
    this.resizeAnchor = null;
        this.resizeRow = null;
};

TableMorph.prototype.mouseDoubleClick = function (pos) {
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
};

// TableMorph scrolling and resizing cells by "hand"

TableMorph.prototype.shiftCells = function (pos) {
    var delta = this.dragAnchor.subtract(pos),
        scrollX = Math.round(delta.x / this.globalColWidth),
        scrollY = Math.round(delta.y / this.rowHeight);
    if (scrollX || scrollY) {
        this.scroll(scrollX, scrollY);
        this.dragAnchor = pos;
    }
};

TableMorph.prototype.resizeCells = function (pos) {
    var delta = pos.subtract(this.resizeAnchor),
        i;

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
    this.rowLabelWidth = this.rowLabelsWidth();
    this.columns = this.columnsLayout();
    this.rows = this.visibleRows();
    this.buildCells();
    this.resizeAnchor = pos;
    this.changed();
};

TableMorph.prototype.columnAt = function (relativeX) {
    var c = 0;
    if (relativeX < (this.columns[0])) {
        return 0;
    }
    while (relativeX > this.columns[c]) {
        c += 1;
    }
    return c + this.startCol - 1;
};

// TableMorph context menu

TableMorph.prototype.userMenu = function () {
    var menu = new MenuMorph(this);
    if (this.parentThatIsA(TableDialogMorph)) {
        if (this.colWidths.length) {
            menu.addItem('reset columns', 'resetColumns');
            menu.addLine();
        }
        if (this.table instanceof List && this.table.canBeJSON()) {
            menu.addItem(
                'blockify',
                () => {
                    var world = this.world(),
                        ide = detect(
                            world.children,
                            m => m instanceof IDE_Morph
                        );
                    this.table.blockify().pickUp(world);
                    world.hand.grabOrigin = {
                        origin: ide.palette,
                        position: ide.palette.center()
                    };
                }
            );
        }
        menu.addItem('open in another dialog...', 'openInDialog');
        return menu;
    }

    if (this.colWidths.length) {
        menu.addItem('reset columns', 'resetColumns');
    }
    menu.addItem('list view...', 'showListView');
    if (this.table instanceof List && this.table.canBeJSON()) {
        menu.addItem(
            'blockify',
            () => {
                var world = this.world(),
                    ide = detect(world.children, m => m instanceof IDE_Morph);
                this.table.blockify().pickUp(world);
                world.hand.grabOrigin = {
                    origin: ide.palette,
                    position: ide.palette.center()
                };
            }
        );
    }
    menu.addLine();
    menu.addItem('open in dialog...', 'openInDialog');
    return menu;
};

TableMorph.prototype.resetColumns = function () {
    this.colWidths = [];
    this.rowLabelWidth = this.rowLabelsWidth();
    this.columns = this.columnsLayout();
    this.rows = this.visibleRows();
    this.buildCells();
    this.changed();
};

TableMorph.prototype.openInDialog = function () {
    new TableDialogMorph(
        this.table,
        this.globalColWidth,
        this.colWidths,
        this.rowHeight
    ).popUp(this.world());
};

TableMorph.prototype.showListView = function () {
    var view = this.parentThatIsA(
        SpriteBubbleMorph,
        SpeechBubbleMorph,
        CellMorph
    );
    if (!view) {return; }
    if (view instanceof SpriteBubbleMorph) {
        view.changed();
        view.contentsMorph.destroy();
        view.contentsMorph = new ListWatcherMorph(this.table);
        view.contentsMorph.step = view.contents.update;
        view.contentsMorph.expand(this.extent());
        view.parent.positionTalkBubble();
    } else if (view instanceof SpeechBubbleMorph) {
        view.contents = new ListWatcherMorph(this.table);
        view.contents.step = view.contents.update;
        view.contents.expand(this.extent());
    } else { // watcher cell
        view.changed();
        view.contentsMorph.destroy();
        view.contentsMorph = new ListWatcherMorph(this.table);
        view.add(view.contentsMorph);
        view.contentsMorph.setPosition(this.position());
        view.contentsMorph.expand(this.extent());
    }
    view.fixLayout();
    view.rerender();
};

// TableMorph updating:

TableMorph.prototype.show = function () {
    TableMorph.uber.show.call(this);
    this.updateScrollBars();
};

// TableFrameMorph /////////////////////////////////////////////////////////

// a UI for table morphs, for re-sizing tables and their columns

// TableFrameMorph inherits from Morph:

TableFrameMorph.prototype = new Morph();
TableFrameMorph.prototype.constructor = TableFrameMorph;
TableFrameMorph.uber = Morph.prototype;

// TableFrameMorph instance creation:

function TableFrameMorph(tableMorph, noResize) {
    this.init(tableMorph, noResize);
}

TableFrameMorph.prototype.init = function (tableMorph, noResize) {
    // additional properties:
    this.tableMorph = tableMorph;
    this.handle = null;

    // initialize inherited properties:
    TableFrameMorph.uber.init.call(this, true);

    // override inherited properties:
    this.color = 'transparent';
    this.bounds = this.tableMorph.bounds.copy();
    this.add(this.tableMorph);

    if (!noResize) {
        this.handle = new HandleMorph(
            this, // target
            80, // minX
            25, // minY
            null, // insetX
            null // insetY
        );
    }

    this.fixLayout();
};

TableFrameMorph.prototype.fixLayout = function () {
    var ext = this.extent();
    if (this.tableMorph.extent().eq(ext)) {return; }
    this.tableMorph.setExtent(this.extent());
    if (this.parent) {
        this.parent.changed();
        this.parent.fixLayout();
        this.parent.rerender();
   }
};

// TableFrameMorph result / speech balloon support:

TableFrameMorph.prototype.expand = function (maxExtent) {
    var ext = this.tableMorph.globalExtent();
    if (maxExtent) {
        ext = ext.min(maxExtent);
    }
    this.setExtent(ext);
    this.handle.setRight(this.right());
    this.handle.setBottom(this.bottom());
};

// TableDialogMorph inherits from DialogBoxMorph:

TableDialogMorph.prototype = new DialogBoxMorph();
TableDialogMorph.prototype.constructor = TableDialogMorph;
TableDialogMorph.uber = DialogBoxMorph.prototype;

// TableDialogMorph instance creation:

function TableDialogMorph(data, globalColWidth, colWidths, rowHeight) {
    this.init(data, globalColWidth, colWidths, rowHeight);
}

TableDialogMorph.prototype.init = function (
    data,
    globalColWidth,
    colWidths,
    rowHeight
) {
    // additional properties:
    this.handle = null;
    this.data = data;
    this.tableView = null;

    // initialize inherited properties:
    TableDialogMorph.uber.init.call(this);

    // override inherited properties:
    this.labelString = 'Table view';
    this.createLabel();

    // build contents
    this.buildContents(data, globalColWidth, colWidths, rowHeight);
};

TableDialogMorph.prototype.buildContents = function (
    data,
    globalColWidth,
    colWidths,
    rowHeight
) {
    this.tableView = new TableMorph(
        data,
        null, // scrollBarSize
        null, // extent
        null, // startRow
        null, // startCol
        globalColWidth,
        colWidths,
        rowHeight,
        null, // colLabelHeight
        null // padding
    );
    this.addBody(new TableFrameMorph(this.tableView, true));
    this.addButton('ok', 'OK');
};

TableDialogMorph.prototype.setInitialDimensions = function () {
    var world = this.world(),
        mex = world.extent().subtract(new Point(this.padding, this.padding)),
        th = fontHeight(this.titleFontSize) + this.titlePadding * 3, // hm...
        bh = this.buttons.height();
    this.setExtent(
        this.tableView.globalExtent().add(
            new Point(this.padding * 2, this.padding * 2 + th + bh)
        ).min(mex).max(new Point(100, 100))
    );
    this.setCenter(this.world().center());
};

TableDialogMorph.prototype.popUp = function (world) {
    if (world) {
        TableDialogMorph.uber.popUp.call(this, world);
        this.setInitialDimensions();
        this.handle = new HandleMorph(
            this,
            100,
            100,
            this.corner,
            this.corner
        );
    }
};

TableDialogMorph.prototype.fixLayout =
    BlockEditorMorph.prototype.fixLayout;
