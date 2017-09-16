// BlockLabelFragment //////////////////////////////////////////////////

// BlockLabelFragment instance creation:

export default class BlockLabelFragment {
    constructor(labelString) {
        this.labelString = labelString || '';
        this.type = '%s';    // null for label, a spec for an input
        this.defaultValue = '';
        this.options = '';
        this.isReadOnly = false; // for input slots
        this.isDeleted = false;
    }

    // accessing

    defSpecFragment() {
        // answer a string representing my prototype's spec
        const pref = this.type ? '%\'' : '';
        return this.isDeleted ?
                '' : pref + this.labelString + (this.type ? '\'' : '');
    }

    defTemplateSpecFragment() {
        // answer a string representing my prototype's spec
        // which also indicates my type, default value or arity
        let suff = '';
        if (!this.type) {return this.defSpecFragment(); }
        if (this.isUpvar()) {
            suff = ' \u2191';
        } else if (this.isMultipleInput()) {
            suff = '...';
        } else if (this.type === '%cs') {
            suff = ' \u03BB'; // ' [\u03BB'
        } else if (this.type === '%b') {
            suff = ' ?';
        } else if (this.type === '%l') {
            suff = ' \uFE19';
        } else if (this.type === '%obj') {
            suff = ' %turtleOutline';
        } else if (contains(
                ['%cmdRing', '%repRing', '%predRing', '%anyUE', '%boolUE'],
                this.type
            )) {
            suff = ' \u03BB';
        } else if (this.defaultValue) {
            if (this.type === '%n') {
                suff = ` # = ${this.defaultValue.toString()}`;
            } else { // 'any' or 'text'
                suff = ` = ${this.defaultValue.toString()}`;
            }
        } else if (this.type === '%n') {
            suff = ' #';
        }
        return this.labelString + suff;
    }

    blockSpecFragment() {
        // answer a string representing my block spec
        return this.isDeleted ? '' : this.type || this.labelString;
    }

    copy() {
        const ans = new BlockLabelFragment(this.labelString);
        ans.type = this.type;
        ans.defaultValue = this.defaultValue;
        ans.options = this.options;
        ans.isReadOnly = this.isReadOnly;
        return ans;
    }

    // arity

    isSingleInput() {
        return !this.isMultipleInput() &&
            (this.type !== '%upvar');
    }

    isMultipleInput() {
        // answer true if the type begins with '%mult'
        if (!this.type) {
            return false; // not an input at all
        }
        return this.type.includes('%mult');
    }

    isUpvar() {
        if (!this.type) {
            return false; // not an input at all
        }
        return this.type === '%upvar';
    }

    setToSingleInput() {
        if (!this.type) {return null; } // not an input at all
        if (this.type === '%upvar') {
            this.type = '%s';
        } else {
            this.type = this.singleInputType();
        }
    }

    setToMultipleInput() {
        if (!this.type) {return null; } // not an input at all
        if (this.type === '%upvar') {
            this.type = '%s';
        }
        this.type = '%mult'.concat(this.singleInputType());
    }

    setToUpvar() {
        if (!this.type) {return null; } // not an input at all
        this.type = '%upvar';
    }

    singleInputType() {
        // answer the type of my input withtou any preceding '%mult'
        if (!this.type) {
            return null; // not an input at all
        }
        if (this.isMultipleInput()) {
            return this.type.substr(5); // everything following '%mult'
        }
        return this.type;
    }

    setSingleInputType(type) {
        if (!this.type || !this.isMultipleInput()) {
            this.type = type;
        } else {
            this.type = '%mult'.concat(type);
        }
    }
}