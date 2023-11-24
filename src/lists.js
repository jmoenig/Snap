/*

    lists.js

    list data structure and GUI for SNAP!

    written by Jens Mönig and Brian Harvey
    jens@moenig.org, bh@cs.berkeley.edu

    Copyright (C) 2023 by Jens Mönig and Brian Harvey

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

/*global modules, BoxMorph, HandleMorph, PushButtonMorph, SyntaxElementMorph,
Color, Point, WatcherMorph, StringMorph, SpriteMorph, ScrollFrameMorph, isNil,
CellMorph, ArrowMorph, MenuMorph, snapEquals, localize, isString, IDE_Morph,
MorphicPreferences, TableDialogMorph, SpriteBubbleMorph, SpeechBubbleMorph,
TableFrameMorph, TableMorph, Variable, isSnapObject, Costume, contains, detect,
Context, ZERO, WHITE*/

/*jshint esversion: 6*/

// Global settings /////////////////////////////////////////////////////

modules.lists = '2023-November-22';

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
    deepMap(callback)       - same as map for all atomic elements

    matrix ops (arrayed)
    --------------------
    size()                  - count the number of all atomic elements
    rank()                  - answer the number of my dimensions
    shape()                 - answer a list of the max size for each dimension
    width()                 - ansswer the maximum length of my columns, if any
    flatten()               - answer a concatenated list of columns and atoms
    ravel()                 - answer a flat list of all atoms in all sublists
    columns()               - answer a 2D list with rows turned into columns
    transpose()             - answer the matrix transpose over all dimensions
    reversed()              - answer a reversed shallow copy of the list
    reshape()               - answer a new list formatted to the given dimensions.
    crossproduct()          - answer a new list of all possible sublist tuples
    query()                 - answer a part of a list or multidimensionel struct
    slice()                 - same as query() turning negative indices into slices

    analysis:
    ---------
    distribution()          - answer the occurrence count for each element

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
    var idx = Math.round(+index) || this.length() + 1,
        obj = isNil(element) ? null : element;

    this.becomeArray();
    this.contents.splice(idx - 1, 0, obj);
    this.changed();
};

List.prototype.put = function (element, index) {
    // exchange the element at the given slot for another
    var idx = Math.round(+index) || 0,
        data = element === 0 ? 0
            : element === false ? false
                    : element || null;

    this.becomeArray();
    if (idx < 1 || idx > this.contents.length) {
        return;
    }
    this.contents[idx - 1] = data;
    this.changed();
};

List.prototype.remove = function (index) {
    // remove the given slot, shortening the list
    this.becomeArray();
    this.contents.splice(Math.round(+index || 0) - 1, 1);
    this.changed();
};

List.prototype.clear = function () {
    this.contents = [];
    this.first = null;
    this.rest = null;
    this.isLinked = false;
    this.changed();
};

// List utilities

List.prototype.map = function (callback) {
    return new List(
        this.itemsArray().map(callback)
    );
};

List.prototype.deepMap = function (callback) {
    return this.map(item => item instanceof List ?
        item.deepMap(callback)
            : callback(item));
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
    var value,
        idx = Math.round(+index || 0),
        pair = this;
    while (pair.isLinked) {
        if (idx > 1) {
            pair = pair.rest;
            idx -= 1;
        } else {
            return idx < 1 ? '' : pair.first;
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

// List key-value accessing (experimental in v8.1):

List.prototype.lookup = function (key) {
    var rec;
    if (parseFloat(key) === +key) { // treat as numerical index
        return this.at(key);
    }
    rec = this.itemsArray().find(elem => elem instanceof List &&
        elem.length() > 0 &&
        snapEquals(elem.at(1), key));
    return rec ?
        (rec.length() > 2 ? rec.cdr() : rec.at(2))
        : '';
};

List.prototype.bind = function (key, value) {
    if (parseFloat(key) === +key) { // treat as numerical index
        return this.put(value, key);
    }
    if (key instanceof List) {
        return; // cannot use lists as key because of hyperization
    }
    this.forget(key); // ensure unique entry
    this.add(new List([key, value]));
};

List.prototype.forget = function (key) {
    var idx = 0,
        query = rec =>
            snapEquals(rec, key) || (
                rec instanceof List &&
                rec.length() === 2 &&
                snapEquals(rec.at(1), key)
            );

    if (parseFloat(key) === +key) { // treat as numerical index
        return this.remove(key);
    }
    while (idx > -1) {
        idx = this.itemsArray().findIndex(query);
        if (idx > -1) {
            this.remove(idx + 1);
        }
    }
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

// List matrix operations and utilities

List.prototype.query = function (indices) {
    // assumes a 2D argument list where each slot represents
    // the indices to select from a dimension
    // e.g. [rows, columns, planes]
    var first, select;
    if (indices.isEmpty()) {
        return this.map(e => e);
    }
    if (indices.rank() === 1) {
        return indices.map(i => this.lookup(i));
    }
    first = indices.at(1);
    if (first instanceof List) {
        select = first.isEmpty() ?
            this.range(1, this.length())
                : first;
    } else {
        select = new List([first]);
    }
    return select.map(i => this.lookup(i)).map(
            e => e instanceof List? e.query(indices.cdr()) : e
    );
};

List.prototype.slice = function (indices) {
    // EXPERIMENTAL - NOT IN USE.
    // assumes a 2D argument list where each slot represents
    // the indices to select from a dimension
    // e.g. [rows, columns, planes]
    //
    // slicing spec:
    // positive integers represent single indices,
    // negative integes and zero represent slices starting at the
    // index following the last specified positive integer up to / down to
    // my length offset by the negative / zero integer
    //
    // Currently unused and NOT part of the ITEM OF primitivie in
    // production Snap, because negative indices are used in exercises and
    // curriculum activities relying on them returning zero / empty values
    // rather than wrapped ones, e.g. when creating a "reverb" or "echo"
    // effect from sound samples.
    //
    // to be revisited in the future, perhaps as seperate primitive.
    // -Jens

    var first, select;
    if (indices.isEmpty()) {
        return this.map(e => e);
    }
    if (indices.rank() === 1) {
        return this.rangify(indices).map(i => this.at(i));
    }
    first = indices.at(1);
    if (first instanceof List) {
        select = first.isEmpty() ?
            this.range(1, this.length())
                : this.rangify(first);
    } else {
        select = this.rangify(new List([first]));
    }
    return select.map(i => this.at(i)).map(
            e => e instanceof List? e.slice(indices.cdr()) : e
    );
};

List.prototype.rangify = function (indices) {
    // EXPERIMENTAL - NOT IN USE.
    // private - answer a list of indices with zero and negative integers
    // replaced by slices of consecutive indices ranging from the next
    // index following the last specified single index up / down to
    // my length offset by the negative / zero index.
    var result = [],
        len = this.length(),
        current = 0,
        start, end;
    indices.itemsArray().forEach(idx => {
        idx = +idx;
        if (idx > 0) {
            result.push(idx);
            current = idx;
        } else {
            end = len + idx;
            if (current !== end) {
                start = current < end ? current + 1 : current - 1;
                this.range(start, end).itemsArray().forEach(
                    num => result.push(num)
                );
            }
        }
    });
    return new List(result);
};

List.prototype.range = function (start, end) {
    // private - answer a list of integers from start to the given end
    return new List([...Array(Math.abs(end - start) + 1)].map((e, i) =>
        start < end ? start + i : start - i
    ));
};

List.prototype.items = function (indices) {
    // deprecated. Same as query() above, except in reverse order.
    // e.g. [planes, columns, rows]

    // This. This is it. The pinnacle of my programmer's life.
    // After days of roaming about my house and garden,
    // of taking showers and rummaging through the fridge,
    // of strumming the charango and the five ukuleles
    // sitting next to my laptop on my desk,
    // and of letting my mind wander far and wide,
    // to come up with this design, always thinking
    // "What would Brian do?".
    // And look, Ma, it's turned out all beautiful! -jens

    return makeSelector(
        this.rank(),
        indices.cdr(),
        makeLeafSelector(indices.at(1))
    )(this);

    function makeSelector(rank, indices, next) {
        if (rank === 1) {
            return next;
        }
        return makeSelector(
            rank - 1,
            indices.cdr(),
            makeBranch(
                indices.at(1) || new List(),
                next
            )
        );
    }

    function makeBranch(indices, next) {
        return function(data) {
            if (indices.isEmpty()) {
                return data.map(item => next(item));
            }
            return indices.map(idx => next(data.at(idx)));
        };
    }

    function makeLeafSelector(indices) {
        return function (data) {
            if (indices.isEmpty()) {
                return data.map(item => item);
            }
            return indices.map(idx => data.at(idx));
        };
    }
};

List.prototype.size = function () {
    // count the number of all atomic elements
    var count = 0;
    this.deepMap(() => count += 1);
    return count;
};

List.prototype.ravel = function () {
    // answer a flat list containing all atomic elements in all sublists
    var all = [];
    this.deepMap(atom => all.push(atom));
    return new List(all);
};

List.prototype.rank = function () {
    // answer the number of my dimensions
    // traverse the whole structure for irregularly shaped nested lists
    var rank = 1,
        len = this.length(),
        item, i;

    for (i = 1; i <= len; i += 1) {
        item = this.at(i);
        if (item instanceof List) {
            rank = Math.max(rank, 1 + item.rank());
        }
    }
    return rank;
};

List.prototype.shape = function () {
    // answer a list of the maximum size for each dimension
    var dim,
        rank = this.rank(),
        shp = new List([this.length()]),
        max, items, i, len;
    for (dim = 2; dim <= rank; dim += 1) {
        max = 0;
        items = this.getDimension(dim);
        len = items.length();
        for (i = 1; i <= len; i += 1) {
            max = Math.max(max, items.at(i).length());
        }
        shp.add(max);
    }
    return shp;
};

List.prototype.getDimension = function (rank = 0) {
    // private - answer a list of all elements of the specified rank
    if (rank < 1) {return new List(); }
    if (rank === 1) {
        return this.map(item => item);
    }
    if (rank === 2) {
        return new List(this.itemsArray().filter(item => item instanceof List));
    }
    return new List(
        this.getDimension(rank - 1).flatten().itemsArray().filter(
            value => value instanceof List
        )
    );
};

List.prototype.width = function () {
    // private - answer the maximum length of my direct sub-lists (columns),
    // if any
    var i, item,
        width = 0,
        len = this.length();
    for (i = 1; i <= len; i += 1) {
        item = this.at(i);
        width = Math.max(width, item instanceof List ? item.length() : 0);
    }
    return width;
};

List.prototype.flatten = function () {
    // answer a new list that concatenates my direct sublists (columns)
    // and atomic elements
    var flat = [];
    this.itemsArray().forEach(item => {
        if (item instanceof List) {
            item.itemsArray().forEach(value => flat.push(value));
        } else {
            flat.push(item);
        }
    });
    return new List(flat);
};

List.prototype.transpose = function () {
    if (this.rank() > 2) {
        return this.strideTranspose();
    }
    return this.columns();
};

List.prototype.columns = function () {
    // answer a 2D list where each item has turned into a row,
    // convert atomic items into lists,
    // fill ragged columns with atomic values, if any, or empty cells

    var col, src, i,
        width = Math.max(this.width(), 1),
        table = [];

    // convert atomic items into rows
    src = this.map(row =>
        row instanceof List ? row : new List(new Array(width).fill(row))
    );

    // define the mapper function
    col = (tab, c) => tab.map(row => row.at(c));

    // create the transform
    for (i = 1; i <= width; i += 1) {
        table.push(col(src, i));
    }
    return new List(table);
};

List.prototype.reshape = function (dimensions) {
    // answer a new list formatted to fit the given dimensions.
    // truncate excess elements, if any.
    // pad with (repetitions of) existing elements
    var src = this.ravel().itemsArray(),
        dim = this.fillDimensionsFor(dimensions, src.length),
        i = 0,
        size, trg;

    // if no dimensions, report a scalar
    if (dim.isEmpty()) {return src[0]; }

    size = dim.itemsArray().reduce((a, b) => a * b);

    // make sure the items count matches the specified target dimensions
    if (size < src.length) {
        // truncate excess elements from the source
        trg = src.slice(0, size);
    } else {
        if (size > src.length && dim.length() > 2 && size > 1000000) {
            // limit usage of reshape to grow to a maximum size of 1MM rows
            // in higher dimensions to prevent accidental dimension overflow
            throw new Error('exceeding the size limit for reshape');
        }
        // pad the source by repeating its existing elements
        trg = src.slice();
        while (trg.length < size) {
            if (i >= src.length) {
                i = 0;
            }
            trg.push(src[i]);
            i += 1;
        }
    }

    // fold the doctored source into the specified dimensions
    return new List(trg).folded(dim);
};

List.prototype.fillDimensionsFor = function (dimensions, leafCount) {
    // private - answer a copy of the dimensions list with all zeroish
    // values adjusted to accomodate the given overall leaf count from
    // left to right, e.g. for leaf count of 10 the given dimensions
    // (0,3) become (4,3)
    var factor,
        already = -1;
    if (dimensions.contains(0) ||
        dimensions.contains('') ||
        dimensions.contains(false)
    ) {
        factor = Math.ceil(leafCount / dimensions.itemsArray().reduce((a, b) =>
            Math.max(a, 1) * Math.max(b, 1)));
        return dimensions.map(each =>
            each ? each : (already++ ? factor : 1));
    }
    return dimensions;
};

List.prototype.folded = function (dimensions) {
    // private
    var len = dimensions.length(),
        trg = this,
        i;
    if (len < 2) {
        return this.map(e => e);
    }
    for (i = len; i > 1; i -= 1) {
        trg = trg.asChunksOf(dimensions.at(i));
    }
    return trg;
};

List.prototype.asChunksOf = function (size) {
    // private
    var trg = new List(),
        len = this.length(),
        sub, i;
    for (i = 0; i < len; i += 1) {
        if (i % size === 0) {
            sub = new List();
            trg.add(sub);
        }
        sub.add(this.at(i + 1));
    }
    return trg;
};

List.prototype.crossproduct = function () {
    // expects myself to be a list of lists.
    // answers a new list of all possible tuples
    // with one item from each of my sublists
    var result = new List(),
        len = this.length(),
        lengths = this.map(each => each.length()),
        size = lengths.itemsArray().reduce((a, b) => a * b),
        i, k, row, factor;

    // limit crossproduct to a maximum size of 1MM rows
    // to guard against accidental memory overflows in Chrome
    if (size > 1000000) {
        throw new Error('exceeding the size limit for cross product');
    }

    for (i = 1; i <= size; i += 1) {
        row = new List();
        factor = 1;
        for (k = 1; k <= len; k += 1) {
            row.add(
                this.at(k).at(
                    ((Math.ceil(i / ((size / lengths.at(k)) * factor)) - 1) %
                        lengths.at(k)) + 1
                )
            );
            factor /= lengths.at(k);
        }
        result.add(row);
    }
    return result;
};

List.prototype.strideTranspose = function () {
    // private - transpose a matric of rank > 2
    // thanks, Brian!
    var oldShape = this.shape(),
        newShape = oldShape.reversed(),
        oldSizes = new List([1]),
        newSizes = new List([1]),
        oldFlat = this.ravel(),
        newFlat = new List(new Array(oldFlat.length())),
        product = 1,
        i;

    function newIndex(old, os, ns) {
        var foo;
        if (os.isEmpty()) {
            return 0;
        }
        foo = Math.floor(old / ns.at(1));
        return foo * os.at(1) + newIndex(
            old % ns.at(1),
            os.cdr(),
            ns.cdr()
        );
    }

    for (i = oldShape.length(); i > 1; i -= 1) {
        product *= oldShape.at(i);
        newSizes.add(product, 1);
    }
    product = 1;
    for (i = 1; i <= oldShape.length() - 1; i += 1) {
        product *= oldShape.at(i);
        oldSizes.add(product);
    }
    for (i = 1; i <= oldFlat.length(); i += 1) {
        newFlat.put(
            oldFlat.at(i),
            newIndex(i-1, oldSizes, newSizes)+1
        );
    }
    return newFlat.reshape(newShape);
};

List.prototype.reversed = function () {
    // only for arrayed lists
    return new List(this.itemsArray().slice().reverse());
};

// List analysis

List.prototype.distribution = function () {
    // return a table representing a dictionary indicating the occurrence count
    // of each unique elements
    // note: for compound data this method uses identity rather than equality
    var dict = new Map(),
        data = this.itemsArray(),
        len = data.length,
        isNum = thing => parseFloat(thing) === +thing,
        item, i;
    for (i = 0; i < len; i += 1) {
        item = isNum(data[i]) ? data[i].toString() : data[i];
        if (dict.has(item)) {
            dict.set(item, dict.get(item) + 1);
        } else {
            dict.set(item, 1);
        }
    }
    return new List([...dict].sort((a, b) => b[1] - a[1])
        .map(pair => new List(pair))
    );
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
        Array.from(string).forEach(letter => {
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

List.prototype.asJSON = function () {
    // Caution, no error catching!
    // this method assumes that the list.canBeJSON()

    function objectify(list) {
        var items = list.itemsArray(),
            obj = {};
        if (canBeObject(items)) {
            items.forEach(pair => {
                var value = pair.length() === 2 ? pair.at(2) : undefined;
                obj[pair.at(1)] = (value instanceof List ?
                    objectify(value) : value);
            });
            return obj;
        }
        return items.map(element => element instanceof List ?
            objectify(element) : element
        );
    }

    function canBeObject(array) {
        // try to determine whether the contents of a list
        // might be better represented as dictionary/object
        // than as array
        var keys;
        if (array.every(
            element => element instanceof List && (element.length() === 2)
        )) {
            keys = array.map(each => each.at(1));
            return keys.every(each => isString(each) && isUniqueIn(each, keys));
        }
        return false;
    }

    function isUniqueIn(element, array) {
        return array.indexOf(element) === array.lastIndexOf(element);
    }

    return JSON.stringify(objectify(this), null, 4);
};

List.prototype.canBeTXT = function () {
    return this.itemsArray().every(item =>
        isString(item) || (typeof item === 'number')
    );
};

List.prototype.asTXT = function () {
    // Caution, no error catching!
    // this method assumes that the list.canBeTXT()
    return this.itemsArray().join('\n');
};

List.prototype.canBeWords = function () {
    return this.itemsArray().every(item =>
        isString(item) ||
        (typeof item === 'number') ||
        (item instanceof List && item.canBeWords())
    );
};

List.prototype.asWords = function () {
    // recursively join all leaf items with spaces between.
    // Caution, no error catching!
    // this method assumes that the list.canBeWords()
    return this.itemsArray().map(each =>
        each instanceof List ? each.asWords() : each.toString().trim()
    ).filter(word => word.length).join(' ');
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
    return this.itemsArray().every(value =>
        (!isNaN(+value) && typeof value !== 'boolean') ||
            isString(value) ||
            (value instanceof List && value.hasOnlyAtomicData())
    );
};

List.prototype.canBeJSON = function () {
    return this.itemsArray().every(value => !isNaN(+value) ||
        isString(value) ||
        value === true ||
        value === false ||
        (value instanceof List && value.canBeJSON())
    );
};

List.prototype.hasOnlyAtomicData = function () {
    return this.itemsArray().every(value =>
        (!isNaN(+value) && typeof value !== 'boolean') || isString(value)
    );
};

// List-to-block

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
                (m.contents instanceof Costume) ||
                (m.contents instanceof Context)
            ) {
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
    var world = this.world(),
        ide = detect(world.children, m => m instanceof IDE_Morph);

    if (!List.prototype.enableTables || ide.isAppMode) {
        return this.escalateEvent('userMenu');
    }
    var menu = new MenuMorph(this);
    menu.addItem('table view...', 'showTableView');
    if (this.list.canBeJSON()) {
        menu.addItem(
            'blockify',
            () => {
                this.list.blockify().pickUp(world);
                world.hand.grabOrigin = {
                    origin: ide.palette,
                    position: ide.palette.center()
                };
            }
        );
        menu.addItem(
            'export',
            () => {
                if (this.list.canBeCSV()) {
                    ide.saveFileAs(
                        this.list.asCSV(),
                        'text/csv;charset=utf-8', // RFC 4180
                        localize('data') // name
                    );
                } else {
                    ide.saveFileAs(
                        this.list.asJSON(),
                        'text/json;charset=utf-8',
                        localize('data') // name
                    );
                }
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
