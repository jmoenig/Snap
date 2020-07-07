/*

    lists.js

    list data structure and GUI for SNAP!

    written by Jens Mönig and Brian Harvey
    jens@moenig.org, bh@cs.berkeley.edu

    Copyright (C) 2020 by Jens Mönig and Brian Harvey

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
    needs morphic.js, widgets.js and gui.js


    I. hierarchy
    -------------
    the following tree lists all constructors hierarchically,
    indentation indicating inheritance. Refer to this list to get a
    contextual overview:

    List

    BoxMorph*
        ListWatcherMorph

    * from Morphic.js


    II. toc
    -------
    the following list shows the order in which all constructors are
    defined. Use this list to locate code in this document:

    List
    ListWatcherMorph

*/

// Global settings /////////////////////////////////////////////////////

/*global modules, BoxMorph, HandleMorph, PushButtonMorph, SyntaxElementMorph,
Color, Point, WatcherMorph, StringMorph, SpriteMorph, ScrollFrameMorph, isNil,
CellMorph, ArrowMorph, MenuMorph, snapEquals, localize, isString, IDE_Morph,
MorphicPreferences, TableDialogMorph, SpriteBubbleMorph, SpeechBubbleMorph,
TableFrameMorph, TableMorph, Variable, isSnapObject, Costume, contains, detect,
ZERO, WHITE*/

modules.lists = '2020-July-01';

var List;
var ListWatcherMorph;

// List ////////////////////////////////////////////////////////////////

/*
    I am a dynamic array data structure for SNAP!
    My index starts with 1

    I am a "smart" hybrid list, because I can be used as both a linked
    list and as a dynamic array

    public interface:

    setters (linked):
    -----------------
    cons                    - answer a new list with the given item in front
    cdr                     - answer all but the first element

    setters (arrayed):
    ------------------
    add(element, index)     - insert the element before the given slot,
    put(element, index)     - overwrite the element at the given slot
    remove(index)           - remove the given slot, shortening the list
    clear()                 - remove all elements

    getters (all hybrid):
    ---------------------
    length()                - number of slots
    at(index)               - element present in specified slot
    contains(element)       - <bool>
    isEmpty()               - <bool>
    indexOf(element)        - index of element's first occurrence, 0 if none

    conversion:
    -----------
    asArray()               - answer me as JavaScript array, convert to arrayed
    itemsArray()            - answer a JavaScript array shallow copy of myself
    asText()                - answer my elements (recursively) concatenated
    asCSV()                 - answer a csv-formatted String of myself
    asJSON()                - answer a json-formatted String of myself

    utility:
    ---------
    map(callback)           - answer an arrayed copy applying a JS func to all
*/

// List instance creation:

function List(array) {
    this.type = null; // for UI lists, such as costumes, sounds, sprites
    this.contents = array || [];
    this.first = null;
    this.rest = null;
    this.isLinked = false;
    this.lastChanged = Date.now();
}

// List global preferences

List.prototype.enableTables = true;

// List printing

List.prototype.toString = function () {
    return 'a List [' + this.length() + ' elements]';
};

// List updating:

List.prototype.changed = function () {
    this.lastChanged = Date.now();
};

// Linked List ops:

List.prototype.cons = function (car, cdr) {
    var answer = new List();
    if (!(cdr instanceof List || isNil(cdr))) {
        throw new Error("cdr isn't a list: " + cdr);
    }
    answer.first = isNil(car) ? null : car;
    answer.rest = cdr || null;
    answer.isLinked = true;
    return answer;
};

List.prototype.cdr = function () {
    var result, i;
    if (this.isLinked) {
        return this.rest || new List();
    }
    if (this.contents.length < 2) {
        return new List();
    }

    result = new List();
    for (i = this.contents.length; i > 1; i -= 1) {
        result = this.cons(this.at(i), result);
    }
    return result;
};

// List array setters:

List.prototype.add = function (element, index) {
/*
    insert the element before the given slot index,
    if no index is specifed, append the element
*/
    var idx = index || this.length() + 1,
        obj = isNil(element) ? null : element;

    this.becomeArray();
    this.contents.splice(idx - 1, 0, obj);
    this.changed();
};

List.prototype.put = function (element, index) {
    // exchange the element at the given slot for another
    var data = element === 0 ? 0
            : element === false ? false
                    : element || null;

    this.becomeArray();
    this.contents[index - 1] = data;
    this.changed();
};

List.prototype.remove = function (index) {
    // remove the given slot, shortening the list
    this.becomeArray();
    this.contents.splice(index - 1, 1);
    this.changed();
};

List.prototype.clear = function () {
    this.contents = [];
    this.first = null;
    this.rest = null;
    this.isLinked = false;
    this.changed();
};

List.prototype.map = function(callback) {
    return new List(
        this.asArray().map(callback)
    );
};

// List getters (all hybrid):

List.prototype.length = function () {
    if (this.isLinked) {
        var pair = this,
            result = 0;
        while (pair && pair.isLinked) {
            result += 1;
            pair = pair.rest;
        }
        return result + (pair ? pair.contents.length : 0);
    }
    return this.contents.length;
};

List.prototype.at = function (index) {
    var value, idx = +index, pair = this;
    while (pair.isLinked) {
        if (idx > 1) {
            pair = pair.rest;
            idx -= 1;
        } else {
            return pair.first;
        }
    }
    value = pair.contents[idx - 1];
    return isNil(value) ? '' : value;
};

List.prototype.contains = function (element) {
    var pair = this;
    while (pair.isLinked) {
        if (snapEquals(pair.first, element)) {
            return true;
        }
        pair = pair.rest;
    }
    // in case I'm arrayed
    return pair.contents.some(any => snapEquals(any, element));
};

List.prototype.isEmpty = function () {
    if (this.isLinked) {
        return isNil(this.first);
    }
    return !this.contents.length;
};

List.prototype.indexOf = function (element) {
    var pair = this,
        idx = 1,
        i, len;
    while (pair.isLinked) {
        if (snapEquals(pair.first, element)) {
            return idx;
        }
        pair = pair.rest;
        idx += 1;
    }
    // in case I'm arrayed
    len = pair.contents.length;
    for (i = 0; i < len; i += 1) {
        if (snapEquals(pair.contents[i], element)) {
            return idx + i;
        }
    }
    return 0;
};

// List table (2D) accessing (for table morph widget):

List.prototype.isTable = function () {
    return this.enableTables && (this.length() > 100 || this.cols() > 1);
};

List.prototype.get = function (col, row) {
    var r, len, cols;
    if (!col) {
        if (!row) {return [this.length()]; }
        if (row > this.rows()) {return null; }
        return this.rowName(row);
    } else if (!row) {
        if (this.cols() === 1) {return localize('items'); }
        return this.colName(col);
    }
    r = this.at(row);

    // encode "orphaned" as arrays and overshooting ones as Variables
    if (r instanceof List) {
        len = r.length();
        cols = this.cols();
        if (col > len) {
            return null;
        } else if (cols === 1 && len > 1) {
            return [r];
        } else if (col >= cols && len > cols) { // overshooting
            return new Variable(r.at(col));
        }
        return r.at(col);
    }
    if (col === 1 && row <= this.rows()) {
        return [r];
    }
    return null;
};

List.prototype.rows = function () {
    return this.length();
};

List.prototype.cols = function () {
    // scan the first 10 rows for the maximun width
    var len = Math.min(10, this.length()),
        count = 1,
        r, i;

    for (i = 1; i <= len; i += 1) {
        r = this.at(i);
        if (r instanceof List) {
            count = Math.max(count, r.length());
        }
    }
    return count;
};

List.prototype.colName = function (col) {
    if (col > this.cols()) {return null; }
    return String.fromCharCode(64 + ((col % 26) || 26)).repeat(
        Math.floor((col - 1) / 26) + 1
    );
};

List.prototype.rowName = function (row) {
    return row;
};

List.prototype.columnNames = function () {
    return [];
};

List.prototype.version = function (startRow, rows, startCol, cols) {
    var l = Math.min(startRow + rows, this.length()),
        v = this.lastChanged,
        r,
        i;
    for (i = startRow; i <= l; i += 1) {
        r = this.at(i);
        if (r instanceof Costume) {
            v = Math.max(v, r.version);
        } else if (r instanceof List) {
            v = Math.max(v, r.version(startCol, cols));
        } else {
            v = Math.max(v, r.lastChanged ? r.lastChanged : 0);
        }
    }
    return v;
};

// List conversion:

List.prototype.asArray = function () {
    // for use in the evaluator
    this.becomeArray();
    return this.contents;
};

List.prototype.itemsArray = function () {
    // answer an array containing my elements
    // don't convert linked lists to arrays
    if (this.isLinked) {
        var next = this,
            result = [],
            i;
        while (next && next.isLinked) {
            result.push(next.first);
            next = next.rest;
        }
        if (next) {
            for (i = 1; i <= next.contents.length; i += 1) {
                result.push(next.at(i));
            }
        }
        return result;
    }
    return this.contents;
};

List.prototype.asText = function () {
    var result = '',
        length,
        element,
        pair = this,
        i;
    while (pair.isLinked) {
        element = pair.first;
        if (element instanceof List) {
            result = result.concat(element.asText());
        } else {
            element = isNil(element) ? '' : element.toString();
            result = result.concat(element);
        }
        pair = pair.rest;
    }
    length = pair.length();
    for (i = 1; i <= length; i += 1) {
        element = pair.at(i);
        if (element instanceof List) {
            result = result.concat(element.asText());
        } else {
            element = isNil(element) ? '' : element.toString();
            result = result.concat(element);
        }
    }
    return result;
};

List.prototype.becomeArray = function () {
    if (this.isLinked) {
        this.contents = this.itemsArray();
        this.isLinked = false;
        this.first = null;
        this.rest = null;
    }
};

List.prototype.becomeLinked = function () {
    var i, stop, tail = this;
    if (!this.isLinked) {
        stop = this.length();
        for (i = 0; i < stop; i += 1) {
            tail.first = this.contents[i];
            if (i < stop) {
                tail.rest = new List();
                tail.isLinked = true;
                tail = tail.rest;
            }
        }
        this.contents = [];
        this.isLinked = true;
    }
};

List.prototype.asCSV = function () {
    // RFC 4180
    // Caution, no error catching!
    // this method assumes that the list.canBeCSV()

    var items = this.itemsArray(),
        rows = [];
    
    function encodeCell(atomicValue) {
        var string = isNil(atomicValue) ? '' : atomicValue.toString(),
            cell;
        if (string.indexOf('\"') ===  -1 &&
                (string.indexOf('\n') === -1) &&
                (string.indexOf('\,') === -1)) {
            return string;
        }
        cell = ['\"'];
        string.split('').forEach(letter => {
            cell.push(letter);
            if (letter === '\"') {
                cell.push(letter);
            }
        });
        cell.push('\"');
        return cell.join('');
    }

    if (items.some(any => any instanceof List)) {
        // 2-dimensional table
        items.forEach(item => {
            if (item instanceof List) {
                rows.push(item.itemsArray().map(encodeCell).join(','));
            } else {
                rows.push(encodeCell(item));
            }
        });
        return rows.join('\n');
    }
    // single row
    return items.map(encodeCell).join(',');
};

List.prototype.asJSON = function (guessObjects) {
    // Caution, no error catching!
    // this method assumes that the list.canBeJSON()

    function objectify(list, guessObjects) {
        var items = list.itemsArray(),
            obj = {};
        if (canBeObject(items)) {
            items.forEach(pair => {
                var value = pair.length() === 2 ? pair.at(2) : undefined;
                obj[pair.at(1)] = (value instanceof List ?
                    objectify(value, guessObjects) : value);
            });
            return obj;
        }
        return items.map(element => {
            return element instanceof List ?
                objectify(element, guessObjects) : element;
        });
    }

    function canBeObject(array) {
        // try to determine whether the contents of a list
        // might be better represented as dictionary/object
        // than as array
        var keys;
        if (array.every(
            element => element instanceof List && (element.length() < 3)
        )) {
            keys = array.map(each => each.at(1));
            return keys.every(each => isString(each) && isUniqueIn(each, keys));
        }
    }

    function isUniqueIn(element, array) {
        return array.indexOf(element) === array.lastIndexOf(element);
    }

    return JSON.stringify(objectify(this, guessObjects));
};

// List testing

List.prototype.equalTo = function (other) {
    var myself = this, it = other, i, j, loopcount;
    if (!(other instanceof List)) {
        return false;
    }

    while (myself.isLinked && it.isLinked) {
        if (!snapEquals(myself.first, it.first)) {
            return false;
        }
        myself = myself.rest;
        it = it.rest;
    }

    if (it.isLinked) {
        i = it;
        it = myself;
        myself = i;
    }

    j = 0;
    while (myself.isLinked) {
        if (!snapEquals(myself.first, it.contents[j])) {
            return false;
        }
        myself = myself.rest;
        j += 1;
    }

    i = 0;
    if (myself.contents.length !== (it.contents.length - j)) {
        return false;
    }

    loopcount = myself.contents.length;
    while (loopcount > 0) {
        loopcount -= 1;
        if (!snapEquals(myself.contents[i], it.contents[j])) {
            return false;
        }
        i += 1;
        j += 1;
    }
    return true;
};

List.prototype.canBeCSV = function () {
    return this.itemsArray().every(value => {
        return (!isNaN(+value) && typeof value !== 'boolean') ||
            isString(value) ||
            (value instanceof List && value.hasOnlyAtomicData());
    });
};

List.prototype.canBeJSON = function () {
    return this.itemsArray().every(value => {
        return !isNaN(+value) ||
            isString(value) ||
            value === true ||
            value === false ||
            (value instanceof List && value.canBeJSON());
    });
};

List.prototype.hasOnlyAtomicData = function () {
    return this.itemsArray().every(value => {
        return (!isNaN(+value) && typeof value !== 'boolean') ||
            isString(value);
    });
};

// List-to-block (experimental)

List.prototype.blockify = function (limit = 500, count = [0]) {
    var block = SpriteMorph.prototype.blockForSelector('reportNewList'),
        slots = block.inputs()[0],
        len = this.length(),
        bool,
        i, value;

    block.isDraggable = true;
    slots.removeInput();
    
    // fill the slots with the data
    for (i = 0; i < len && count[0] < limit; i += 1) {
        value = this.at(i + 1);
        if (value instanceof List) {
            slots.replaceInput(
                slots.addInput(),
                value.blockify(limit, count)
            );
        } else if (typeof value === 'boolean') {
            bool = SpriteMorph.prototype.blockForSelector('reportBoolean');
            bool.inputs()[0].setContents(value);
            bool.isDraggable = true;
            slots.replaceInput(
                slots.addInput(),
                bool
            );
        } else {
            slots.addInput(value);
        }
        count[0] += 1;
    }

    slots.fixBlockColor(null, true);
    return block;
};

// ListWatcherMorph ////////////////////////////////////////////////////

/*
    I am a little window which observes a list and continuously
    updates itself accordingly
*/

// ListWatcherMorph inherits from BoxMorph:

ListWatcherMorph.prototype = new BoxMorph();
ListWatcherMorph.prototype.constructor = ListWatcherMorph;
ListWatcherMorph.uber = BoxMorph.prototype;

// ListWatcherMorph default settings

ListWatcherMorph.prototype.cellColor =
    SpriteMorph.prototype.blockColor.lists;

// ListWatcherMorph instance creation:

function ListWatcherMorph(list, parentCell) {
    this.init(list, parentCell);
}

ListWatcherMorph.prototype.init = function (list, parentCell) {
    var myself = this,
        readOnly;

    this.list = list || new List();
    this.start = 1;
    this.range = 100;
    this.lastUpdated = 0;
    this.lastCell = null;
    this.parentCell = parentCell || null; // for circularity detection

    // elements declarations
    this.label = new StringMorph(
        localize('length: ') + this.list.length(),
        SyntaxElementMorph.prototype.fontSize,
        null,
        false,
        false,
        false,
        MorphicPreferences.isFlat ? ZERO : new Point(1, 1),
        WHITE
    );
    this.label.mouseClickLeft = function () {myself.startIndexMenu(); };


    this.frame = new ScrollFrameMorph(null, 10);
    this.frame.alpha = 0;
    this.frame.acceptsDrops = false;
    this.frame.contents.acceptsDrops = false;

    this.handle = new HandleMorph(
        this,
        80,
        70,
        3,
        3
    );
    this.handle.setExtent(new Point(13, 13));

    this.arrow = new ArrowMorph(
        'down',
        SyntaxElementMorph.prototype.fontSize
    );
    this.arrow.mouseClickLeft = function () {myself.startIndexMenu(); };
    this.arrow.setRight(this.handle.right());
    this.arrow.setBottom(this.handle.top());
    this.handle.add(this.arrow);

    readOnly = this.list.type && !contains(['text', 'number'], this.list.type);
    if (readOnly) {
        this.plusButton = null;
    } else {
        this.plusButton = new PushButtonMorph(
            this.list,
            'add',
            '+'
        );
        this.plusButton.padding = 0;
        this.plusButton.edge = 0;
        this.plusButton.outlineColor = this.color;
        this.plusButton.fixLayout();
    }

    ListWatcherMorph.uber.init.call(
        this,
        SyntaxElementMorph.prototype.rounding,
        1,
        new Color(120, 120, 120)
    );

    this.color = new Color(220, 220, 220);
    this.isDraggable = false;
    this.setExtent(new Point(80, 70).multiplyBy(
        SyntaxElementMorph.prototype.scale
    ));
    this.add(this.label);
    this.add(this.frame);
    if (!readOnly) {
        this.add(this.plusButton);
    }
    this.add(this.handle);
    this.handle.fixLayout();
    this.update();
    this.fixLayout();
};

// ListWatcherMorph updating:

ListWatcherMorph.prototype.update = function (anyway) {
    var i, idx, ceil, morphs, cell, cnts, label, button, max,
        starttime, maxtime = 1000;
    this.frame.contents.children.forEach(m => {
        if (m instanceof CellMorph) {
            if (m.contentsMorph instanceof ListWatcherMorph) {
                m.contentsMorph.update();
            } else if (isSnapObject(m.contents) ||
                    (m.contents instanceof Costume)) {
                m.update();
            }
        }
    });

    if (this.lastUpdated === this.list.lastChanged && !anyway) {
        return null;
    }
    this.updateLength(true);

    // adjust start index to current list length
    this.start = Math.max(
        Math.min(
            this.start,
            Math.floor((this.list.length() - 1) / this.range)
                * this.range + 1
        ),
        1
    );

    // refresh existing cells
    // highest index shown:
    max = Math.min(
        this.start + this.range - 1,
        this.list.length()
    );

    // number of morphs available for refreshing
    ceil = Math.min(
        (max - this.start + 1) * 3,
        this.frame.contents.children.length
    );

    for (i = 0; i < ceil; i += 3) {
        idx = this.start + (i / 3);

        cell = this.frame.contents.children[i];
        label = this.frame.contents.children[i + 1];
        button = this.frame.contents.children[i + 2];
        cnts = this.list.at(idx);

        if (cell.contents !== cnts) {
            cell.contents = cnts;
            cell.fixLayout();
            if (this.lastCell) {
                cell.setLeft(this.lastCell.left());
            }
        }
        this.lastCell = cell;

        if (label.text !== idx.toString()) {
            label.text = idx.toString();
            label.fixLayout();
        }

        button.action = idx;
    }

    // remove excess cells
    // number of morphs to be shown
    morphs = (max - this.start + 1) * 3;

    while (this.frame.contents.children.length > morphs) {
        this.frame.contents.children[morphs].destroy();
    }

    // add additional cells
    ceil = morphs; //max * 3;
    i = this.frame.contents.children.length;

    starttime = Date.now();
    if (ceil > i + 1) {
        for (i; i < ceil; i += 3) {
            if (Date.now() - starttime > maxtime) {
                this.fixLayout();
                this.frame.contents.adjustBounds();
                this.frame.contents.setLeft(this.frame.left());
                return null;
            }
            idx = this.start + (i / 3);
            label = new StringMorph(
                idx.toString(),
                SyntaxElementMorph.prototype.fontSize,
                null,
                false,
                false,
                false,
                MorphicPreferences.isFlat ? ZERO : new Point(1, 1),
                WHITE
            );
            cell = new CellMorph(
                this.list.at(idx),
                this.cellColor,
                idx,
                this.parentCell
            );
            button = new PushButtonMorph(
                this.list.remove,
                idx,
                '-',
                this.list
            );
            button.padding = 1;
            button.edge = 0;
            button.corner = 1;
            button.outlineColor = this.color.darker();
            button.fixLayout();

            this.frame.contents.add(cell);
            if (this.lastCell) {
                cell.setPosition(this.lastCell.bottomLeft());
            } else {
                cell.setTop(this.frame.contents.top());
            }
            this.lastCell = cell;
            label.setCenter(cell.center());
            label.setRight(cell.left() - 2);
            this.frame.contents.add(label);
            this.frame.contents.add(button);
        }
    }
    this.lastCell = null;

    this.fixLayout();
    this.frame.contents.adjustBounds();
    this.frame.contents.setLeft(this.frame.left());
    this.updateLength();
    this.lastUpdated = this.list.lastChanged;
};

ListWatcherMorph.prototype.updateLength = function (notDone) {
    this.label.text = localize('length: ') + this.list.length();
    if (notDone) {
        this.label.color = new Color(0, 0, 100);
    } else {
        this.label.color = new Color(0, 0, 0);
    }
    this.label.fixLayout();
    this.label.setCenter(this.center());
    this.label.setBottom(this.bottom() - 3);
};

ListWatcherMorph.prototype.startIndexMenu = function () {
    var i,
        range,
        items = Math.ceil(this.list.length() / this.range),
        menu = new MenuMorph(
            idx => this.setStartIndex(idx),
            null,
            this
        );
    menu.addItem('1...', 1);
    for (i = 1; i < items; i += 1) {
        range = i * 100 + 1;
        menu.addItem(range + '...', range);
    }
    menu.popUpAtHand(this.world());
};

ListWatcherMorph.prototype.setStartIndex = function (index) {
    this.start = index;
    this.list.changed();
    this.update();
};

ListWatcherMorph.prototype.fixLayout = function () {
    if (!this.label) {return; }
    if (this.frame) {
        this.arrangeCells();
        this.frame.setPosition(this.position().add(3));
        this.frame.bounds.corner = this.bounds.corner.subtract(new Point(
            3,
            17
        ));
        this.frame.fixLayout();
        this.frame.contents.adjustBounds();
    }

    this.label.setCenter(this.center());
    this.label.setBottom(this.bottom() - 3);
    if (this.plusButton) {
        this.plusButton.setLeft(this.left() + 3);
        this.plusButton.setBottom(this.bottom() - 3);
    }

    if (this.parent) {
        this.parent.changed();
        this.parent.fixLayout();
        this.parent.rerender();
    }
};

ListWatcherMorph.prototype.arrangeCells = function () {
    var i, cell, label, button, lastCell,
        end = this.frame.contents.children.length;
    for (i = 0; i < end; i += 3) {
        cell = this.frame.contents.children[i];
        label = this.frame.contents.children[i + 1];
        button = this.frame.contents.children[i + 2];
        if (lastCell) {
            cell.setTop(lastCell.bottom());
        }
        if (label) {
            label.setTop(cell.center().y - label.height() / 2);
            label.setRight(cell.left() - 2);
        }
        if (button) {
            button.setCenter(cell.center());
            button.setLeft(cell.right() + 2);
        }
        lastCell = cell;
    }
    this.frame.contents.adjustBounds();
};

ListWatcherMorph.prototype.expand = function (maxExtent) {
    // make sure to show all (first 100) cells
    var fe = this.frame.contents.extent(),
        ext = new Point(fe.x + 6, fe.y + this.label.height() + 6);
    if (maxExtent) {
        ext = ext.min(maxExtent);
    }
    this.setExtent(ext);
    this.handle.setRight(this.right() - 3);
    this.handle.setBottom(this.bottom() - 3);
};

// ListWatcherMorph context menu

ListWatcherMorph.prototype.userMenu = function () {
    if (!List.prototype.enableTables) {
        return this.escalateEvent('userMenu');
    }
    var menu = new MenuMorph(this);
    menu.addItem('table view...', 'showTableView');
    if (this.list.canBeJSON()) {
        menu.addItem(
            'blockify',
            () => {
                var world = this.world(),
                    ide = detect(world.children, m => m instanceof IDE_Morph);
                this.list.blockify().pickUp(world);
                world.hand.grabOrigin = {
                    origin: ide.palette,
                    position: ide.palette.center()
                };
            }
        );
    }
    menu.addLine();
    menu.addItem(
        'open in dialog...',
        () => new TableDialogMorph(this.list).popUp(this.world())
    );
    return menu;
};

ListWatcherMorph.prototype.showTableView = function () {
    var view = this.parentThatIsA(
        SpriteBubbleMorph,
        SpeechBubbleMorph,
        CellMorph
    );
    if (!view) {return; }
    if (view instanceof SpriteBubbleMorph) {
        view.contentsMorph.destroy();
        view.contentsMorph = new TableFrameMorph(new TableMorph(this.list, 10));
        view.contentsMorph.expand(this.extent());
        view.parent.positionTalkBubble();
    } else if (view instanceof SpeechBubbleMorph) {
        view.contents = new TableFrameMorph(new TableMorph(this.list, 10));
        view.contents.expand(this.extent());
    } else { // watcher cell
        view.changed();
        view.contentsMorph.destroy();
        view.contentsMorph = new TableFrameMorph(new TableMorph(this.list, 10));
        view.add(view.contentsMorph);
        view.contentsMorph.setPosition(this.position());
        view.contentsMorph.expand(this.extent());
    }
    view.fixLayout();
    view.rerender();
};

// ListWatcherMorph events:

ListWatcherMorph.prototype.mouseDoubleClick = function (pos) {
    if (List.prototype.enableTables) {
        new TableDialogMorph(this.list).popUp(this.world());
    } else {
        this.escalateEvent('mouseDoubleClick', pos);
    }
};

// ListWatcherMorph hiding/showing:

ListWatcherMorph.prototype.show = function () {
    ListWatcherMorph.uber.show.call(this);
    this.frame.contents.adjustBounds();
};

// ListWatcherMorph rendering:

ListWatcherMorph.prototype.render = WatcherMorph.prototype.render;
