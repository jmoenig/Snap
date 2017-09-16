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

class List {
    constructor(array) {
        this.type = null; // for UI lists, such as costumes, sounds, sprites
        this.contents = array || [];
        this.first = null;
        this.rest = null;
        this.isLinked = false;
        this.lastChanged = Date.now();
    }

    // List printing

    toString() {
        return `a List [${this.length} elements]`;
    }

    // List updating:

    changed() {
        this.lastChanged = Date.now();
    }

    // Linked List ops:

    cons(car, cdr) {
        const answer = new List();
        if (!(cdr instanceof List || isNil(cdr))) {
            throw new Error(`cdr isn't a list: ${cdr}`);
        }
        answer.first = isNil(car) ? null : car;
        answer.rest = cdr || null;
        answer.isLinked = true;
        return answer;
    }

    cdr() {
        let result;
        let i;
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
    }

    // List array setters:

    add(element, index) {
        /*
            insert the element before the given slot index,
            if no index is specifed, append the element
        */
        const idx = index || this.length() + 1;

        const obj = isNil(element) ? null : element;

        this.becomeArray();
        this.contents.splice(idx - 1, 0, obj);
        this.changed();
    }

    put(element, index) {
        // exchange the element at the given slot for another
        const data = element === 0 ? 0
                : element === false ? false
                        : element || null;

        this.becomeArray();
        this.contents[index - 1] = data;
        this.changed();
    }

    remove(index) {
        // remove the given slot, shortening the list
        this.becomeArray();
        this.contents.splice(index - 1, 1);
        this.changed();
    }

    clear() {
        this.contents = [];
        this.first = null;
        this.rest = null;
        this.isLinked = false;
        this.changed();
    }

    // List getters (all hybrid):

    length() {
        if (this.isLinked) {
            let pair = this;
            let result = 0;
            while (pair && pair.isLinked) {
                result += 1;
                pair = pair.rest;
            }
            return result + (pair ? pair.contents.length : 0);
        }
        return this.contents.length;
    }

    at(index) {
        let value;
        let idx = +index;
        let pair = this;
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
    }

    contains(element) {
        let pair = this;
        while (pair.isLinked) {
            if (snapEquals(pair.first, element)) {
                return true;
            }
            pair = pair.rest;
        }
        // in case I'm arrayed
        return pair.contents.some(any => snapEquals(any, element));
    }

    // List table (2D) accessing (for table morph widget):

    isTable() {
        return this.enableTables && (this.length() > 100 || this.cols() > 1);
    }

    get(col, row) {
        let r;
        let len;
        let cols;
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
    }

    rows() {
        return this.length();
    }

    cols() {
        const r = (this.at(1));
        return r instanceof List ? r.length() : 1;
    }

    colName(col) {
        if (col > this.cols()) {return null; }
        return String.fromCharCode(64 + ((col % 26) || 26)).repeat(
            Math.floor((col - 1) / 26) + 1
        );
    }

    rowName(row) {
        return row;
    }

    columnNames() {
        return [];
    }

    version(startRow, rows) {
        const l = Math.min(startRow + rows, this.length());
        let v = this.lastChanged;
        let r;
        let i;
        for (i = startRow; i <= l; i += 1) {
            r = this.at(i);
            v = Math.max(v, r.lastChanged ? r.lastChanged : 0);
        }
        return v;
    }

    // List conversion:

    asArray() {
        // for use in the evaluator
        this.becomeArray();
        return this.contents;
    }

    itemsArray() {
        // answer an array containing my elements
        // don't convert linked lists to arrays
        if (this.isLinked) {
            let next = this;
            const result = [];
            let i;
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
    }

    asText() {
        let result = '';
        let length;
        let element;
        let pair = this;
        let i;
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
    }

    becomeArray() {
        if (this.isLinked) {
            this.contents = this.itemsArray();
            this.isLinked = false;
            this.first = null;
            this.rest = null;
        }
    }

    becomeLinked() {
        let i;
        let stop;
        let tail = this;
        if (!this.isLinked) {
            stop = this.length();
            for (i = 0; i < stop; i += 1) {
                tail.first = this.contents[i];
                if (i < (stop - 1)) {
                    tail.rest = new List();
                    tail.isLinked = true;
                    tail = tail.rest;
                }
            }
            this.contents = [];
            this.isLinked = true;
        }
    }

    // List testing

    equalTo(other) {
        let myself = this;
        let it = other;
        let i;
        let j;
        let loopcount;
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
    }
}

// List global preferences

List.prototype.enableTables = false; // default, to not confuse NYC teachers