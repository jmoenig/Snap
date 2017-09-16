// Table /////////////////////////////////////////////////////////////

/*
    Observable 2D data collections accessible by rows, columns and cells
    with indices starting at 1.
    currently only used for testing TableViews in Snap, because Snap
    automatically displays 2D lists as tables.
*/

export default class Table {
    constructor(cols, rows) {
        this.colCount = +cols;
        this.rowCount = +rows;
        this.colNames = [];
        this.rowNames = [];
        this.contents = new Array(+rows);
        for (let i = 0; i < rows; i += 1) {
            this.contents[i] = new Array(+cols);
        }
        this.lastChanged = Date.now();
    }

    // Table testing:

    demo(aWorld) {
        // new Table(50, 10000).demo(world)
        let dlg;
        this.fillWithTestData();
        dlg = new TableDialogMorph(this);
        dlg.popUp (aWorld);
    }

    // Table updating:

    changed() {
        this.lastChanged = Date.now();
    }

    // Table querying:

    get(col, row) {
        if (!col) {
            if (!row) {return [this.rowCount]; }
            return this.rowName(row);
        } else if (!row) {
            return this.colName(col);
        }
        if (col > this.colCount || row > this.rowCount) {return null; }
        return (this.contents[row - 1] || [])[col - 1];
    }

    row(row) {
        return this.contents[row - 1];
    }

    col(col) {
        const dta = [];
        const c = col - 1;
        let i;
        for (i = 0; i < this.rowCount; i += 1) {
            dta.push(this.contents[i][c]);
        }
        return dta;
    }

    colName(col) {
        // answer the specified name or a capital letter A-Z
        // repeated accordingly
        if (col > this.colCount) {return null; }
        const name = this.colNames[col - 1];
        if (name !== undefined) {return name; }
        return String.fromCharCode(64 + ((col % 26) || 26)).repeat(
            Math.floor((col - 1) / 26) + 1
        );
    }

    rowName(row) {
        // answer the specified name or row number
        if (row > this.rowCount) {return null; }
        return this.rowNames[row - 1] || row;
    }

    rows() {
        return this.rowCount;
    }

    cols() {
        return this.colCount;
    }

    columnNames() {
        return this.colNames;
    }

    // Table setting:

    set(data, col, row) {
        this.contents[row - 1][col - 1] = data;
        this.changed();
    }

    setRows(rowsArray, colNames, rowNames) {
        this.contents = rowsArray;
        if (colNames) {this.colNames = colNames; }
        if (rowNames) {this.rowNames = rowNames; }
        this.changed();
    }

    setCols(colsArray, colNames, rowNames) {
        let r;
        let c;
        for (c = 0; c < this.colCount; c += 1) {
            for (r = 0; r < this.rowCount; r += 1) {
                this.contents[r][c] = colsArray[c][r];
            }
        }
        if (colNames) {this.colNames = colNames; }
        if (rowNames) {this.rowNames = rowNames; }
        this.changed();
    }

    setColNames(array) {
        this.colNames = array || [];
        this.changed();
    }

    setRowNames(array) {
        this.rowNames = array || [];
        this.changed();
    }

    setColName(col, name) {
        this.colNames[col + 1] = name;
        this.changed();
    }

    setRowName(row, name) {
        this.rowNames[row + 1] = name;
        this.changed();
    }

    // Table growing:

    addRow(array, name) {
        if (array) {
            this.contents[this.rowCount] = array;
        } else {
            this.contents[this.rowCount] = new Array(this.rowCount);
        }
        this.rowNames[this.rowCount] = name;
        this.rowCount += 1;
        this.changed();
    }

    addCol(array, name) {
        let i;
        if (array) {
            for (i = 0; i < this.col; i += 1) {
                this.contents[i][this.colCount] = array[i];
            }
        }
        this.colNames[this.colCount] = name;
        this.colCount += 1;
        this.changed();
    }

    // Table converting:

    toList() {
        return new List(
            this.contents.map(eachRow => new List(eachRow))
        );
    }

    // Table testing

    fillWithTestData() {
        let c;
        let r;
        for (c = 1; c <= this.colCount; c += 1) {
            for (r = 1; r <= this.rowCount; r += 1) {
                this.set (this.colName(c) + this.rowName(r), c, r);
            }
        }
    }
}