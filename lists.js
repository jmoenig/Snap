/*

    lists.js

    list data structure and GUI for SNAP!

    written by Jens Mšnig and Brian Harvey
    jens@moenig.org, bh@cs.berkeley.edu

    Copyright (C) 2013 by Jens Mšnig and Brian Harvey

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

/*global modules, contains, BoxMorph, WorldMorph, HandleMorph,
PushButtonMorph, SyntaxElementMorph, Color, Point, WatcherMorph,
StringMorph, SpriteMorph, ScrollFrameMorph, CellMorph, ArrowMorph,
MenuMorph, snapEquals, Morph, isNil, localize*/

modules.lists = '2013-March-12';

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
    cons                - answer a new list with the given item in front
    cdr                    - answer all but the first element

    setters (arrayed):
    ------------------
    add(element, index)    - insert the element before the given slot,
    put(element, index)    - overwrite the element at the given slot
    remove(index)        - remove the given slot, shortening the list
    clear()                - remove all elements

    getters (all hybrid):
    ---------------------
    length()            - number of slots
    at(index)            - element present in specified slot
    contains(element)    - <bool>

    conversion:
    -----------
    asArray()            - answer me as JavaScript array
    asText()            - answer my elements (recursively) concatenated
*/

// List instance creation:

function List(array) {
    this.contents = array || [];
    this.first = null;
    this.rest = null;
    this.isLinked = false;
    this.lastChanged = Date.now();
}

List.prototype.toString = function () {
    return 'a List [' + this.asArray + ']';
};

// List updating:

List.prototype.changed = function () {
    this.lastChanged = Date.now();
};

// Linked List ops:

List.prototype.cons = function (car, cdr) {
    var answer = new List();
    answer.first = isNil(car) ? null : car;
    answer.rest = cdr || null;
    answer.isLinked = true;
    return answer;
};

List.prototype.cdr = function () {
    function helper(i) {
        if (i > this.contents.length) {
            return new List();
        }
        return this.cons(this.at(i), helper.call(this, i + 1));
    }
    if (this.isLinked) {
        return this.rest || new List();
    }
    if (this.contents.length < 2) {
        return new List();
    }
    return helper.call(this, 2);
};

// List array setters:

List.prototype.add = function (element, index) {
/*
    insert the element before the given slot index,
    if no index is specifed, append the element
*/
    var idx = index || this.length() + 1,
        obj = element === 0 ? 0
                : element === false ? false
                        : element || null;
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

// List getters (all hybrid):

List.prototype.length = function () {
    if (this.isLinked) {
        return (this.first === undefined ? 0 : 1)
            + (this.rest ? this.rest.length() : 0);
    }
    return this.contents.length;
};

List.prototype.at = function (index) {
    var value;
    if (this.isLinked) {
        return index === 1 ? this.first : this.rest.at(index - 1);
    }
    value = this.contents[index - 1];
    return isNil(value) ? '' : value;
};

List.prototype.contains = function (element) {
    var num = parseFloat(element);
    if (this.isLinked) {
        if (this.first === element) {
            return true;
        }
        if (!isNaN(num)) {
            if (this.first === num) {
                return true;
            }
        }
        if (this.rest instanceof List) {
            return this.rest.contains(element);
        }
        return false;
    }
    // in case I'm arrayed
    if (contains(this.contents, element)) {
        return true;
    }
    if (!isNaN(num)) {
        return (contains(this.contents, num));
    }
    return false;
};

// List conversion:

List.prototype.asArray = function () {
    // for use in the evaluator
    this.becomeArray();
    return this.contents;
};

List.prototype.asText = function () {
    var result = '',
        length = this.length(),
        element,
        i;
    for (i = 1; i <= length; i += 1) {
        element = this.at(i);
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
        var next = this;
        this.contents = [];
        while (next instanceof List && (next.length() > 0)) {
            this.contents.push(next.at(1));
            next = next.cdr();
        }
        this.isLinked = false;
    }
};

List.prototype.becomeLinked = function () {
    var i, stop, tail = this;
    if (!this.isLinked) {
        stop = this.length();
        for (i = 0; i < stop; i += 1) {
            tail.first = this.contents[i];
            tail.rest = new List();
            tail.isLinked = true;
            tail = tail.rest;
        }
        this.contents = [];
        this.isLinked = true;
    }
};

// List testing

List.prototype.equalTo = function (other) {
    var i;
    if (!(other instanceof List)) {
        return false;
    }
    if ((!this.isLinked) && (!other.isLinked)) {
        if (this.length() === 0 && (other.length() === 0)) {
            return true;
        }
        if (this.length() !== other.length()) {
            return false;
        }
        for (i = 0; i < this.length(); i += 1) {
            if (!snapEquals(this.contents[i], other.contents[i])) {
                return false;
            }
        }
        return true;
    }
    if ((this.isLinked) && (other.isLinked)) {
        if (snapEquals(this.at(1), other.at(1))) {
            return this.cdr().equalTo(other.cdr());
        }
        return false;
    }
    if (this.length() !== other.length()) {
        return false;
    }
    for (i = 0; i < this.length(); i += 1) {
        if (!snapEquals(this.at(i), other.at(i))) {
            return false;
        }
    }
    return true;
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

function ListWatcherMorph(list) {
    this.init(list);
}

ListWatcherMorph.prototype.init = function (list) {
    var myself = this;

    this.list = list || new List();
    this.start = 1;
    this.range = 100;
    this.lastUpdated = Date.now();
    this.lastCell = null;

    // elements declarations
    this.label = new StringMorph(
        localize('length: ') + this.list.length(),
        SyntaxElementMorph.prototype.fontSize,
        null,
        false,
        false,
        false,
        new Point(1, 1),
        new Color(255, 255, 255)
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

    this.plusButton = new PushButtonMorph(
        this.list,
        'add',
        '+'
    );
    this.plusButton.padding = 0;
    this.plusButton.edge = 0;
    this.plusButton.outlineColor = this.color;
    this.plusButton.drawNew();
    this.plusButton.fixLayout();

    ListWatcherMorph.uber.init.call(
        this,
        SyntaxElementMorph.prototype.rounding,
        1.000001, // shadow bug in Chrome,
        new Color(120, 120, 120)
    );

    this.color = new Color(220, 220, 220);
    this.isDraggable = true;
    this.setExtent(new Point(80, 70));
    this.add(this.label);
    this.add(this.frame);
    this.add(this.plusButton);
    this.add(this.handle);
    this.handle.drawNew();
    this.update();
    this.fixLayout();
};

// ListWatcherMorph updating:

ListWatcherMorph.prototype.update = function (anyway) {
    var i, idx, ceil, morphs, cell, cnts, label, button, max,
        starttime, maxtime = 1000;

    this.frame.contents.children.forEach(function (m) {
        if (m instanceof CellMorph
                && m.contentsMorph instanceof ListWatcherMorph) {
            m.contentsMorph.update();
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
            cell.drawNew();
            if (this.lastCell) {
                cell.setLeft(this.lastCell.left());
            }
        }
        this.lastCell = cell;

        if (label.text !== idx.toString()) {
            label.text = idx.toString();
            label.drawNew();
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
                new Point(1, 1),
                new Color(255, 255, 255)
            );
            cell = new CellMorph(
                this.list.at(idx),
                this.cellColor,
                idx
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
            button.drawNew();
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
    this.label.drawNew();
    this.label.setCenter(this.center());
    this.label.setBottom(this.bottom() - 3);
};

ListWatcherMorph.prototype.startIndexMenu = function () {
    var i,
        range,
        myself = this,
        items = Math.ceil(this.list.length() / this.range),
        menu = new MenuMorph(
            function (idx) {myself.setStartIndex(idx); },
            null,
            myself
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
};

ListWatcherMorph.prototype.fixLayout = function () {
    Morph.prototype.trackChanges = false;
    if (this.frame) {
        this.arrangeCells();
        this.frame.silentSetPosition(this.position().add(3));
        this.frame.bounds.corner = this.bounds.corner.subtract(new Point(
            3,
            17
        ));
        this.frame.drawNew();
        this.frame.contents.adjustBounds();
    }

    this.label.setCenter(this.center());
    this.label.setBottom(this.bottom() - 3);
    this.plusButton.setLeft(this.left() + 3);
    this.plusButton.setBottom(this.bottom() - 3);

    Morph.prototype.trackChanges = true;
    this.changed();

    if (this.parent && this.parent.fixLayout) {
        this.parent.fixLayout();
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

// ListWatcherMorph hiding/showing:

ListWatcherMorph.prototype.show = function () {
    ListWatcherMorph.uber.show.call(this);
    this.frame.contents.adjustBounds();
};

// ListWatcherMorph drawing:

ListWatcherMorph.prototype.drawNew = function () {
    WatcherMorph.prototype.drawNew.call(this);
    this.fixLayout();
};
