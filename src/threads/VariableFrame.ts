// VariableFrame ///////////////////////////////////////////////////////

export default class VariableFrame {
    constructor(parentFrame, owner) {
        this.vars = {};
        this.parentFrame = parentFrame || null;
        this.owner = owner || null;
    }

    toString() {
        return `a VariableFrame {${this.names()}}`;
    }

    copy() {
        const frame = new VariableFrame(this.parentFrame);
        const myself = this;
        this.names().forEach(vName => {
            frame.addVar(vName, myself.getVar(vName));
        });
        return frame;
    }

    deepCopy() {
        // currently unused
        let frame;
        if (this.parentFrame) {
            frame = new VariableFrame(this.parentFrame.deepCopy());
        } else {
            frame = new VariableFrame(this.parentFrame);
        }
        frame.vars = copy(this.vars);
        return frame;
    }

    find(name) {
    /*
        answer the closest variable frame containing
        the specified variable. otherwise throw an exception.
    */
        const frame = this.silentFind(name);
        if (frame) {return frame; }
        throw new Error(
            localize('a variable of name \'')
                + name
                + localize('\'\ndoes not exist in this context')
        );
    }

    silentFind(name) {
    /*
        answer the closest variable frame containing
        the specified variable. Otherwise return null.
    */
        if (this.vars[name] !== undefined) {
            return this;
        }
        if (this.parentFrame) {
            return this.parentFrame.silentFind(name);
        }
        return null;
    }

    setVar(name, value, sender) {
        // change the specified variable if it exists
        // else throw an error, because variables need to be
        // declared explicitly (e.g. through a "script variables" block),
        // before they can be accessed.
        // if the found frame is inherited by the sender sprite
        // shadow it (create an explicit one for the sender)
        // before setting the value ("create-on-write")

        const frame = this.find(name);
        if (frame) {
            if (sender instanceof SpriteMorph &&
                    (frame.owner instanceof SpriteMorph) &&
                    (sender !== frame.owner)) {
                sender.shadowVar(name, value);
            } else {
                frame.vars[name].value = value;
            }
        }
    }

    changeVar(name, delta, sender) {
        // change the specified variable if it exists
        // else throw an error, because variables need to be
        // declared explicitly (e.g. through a "script variables" block,
        // before they can be accessed.
        // if the found frame is inherited by the sender sprite
        // shadow it (create an explicit one for the sender)
        // before changing the value ("create-on-write")

        const frame = this.find(name);

        let value;
        let newValue;
        if (frame) {
            value = parseFloat(frame.vars[name].value);
            newValue = isNaN(value) ? delta : value + parseFloat(delta);
            if (sender instanceof SpriteMorph &&
                    (frame.owner instanceof SpriteMorph) &&
                    (sender !== frame.owner)) {
                sender.shadowVar(name, newValue);
            } else {
                frame.vars[name].value = newValue;
            }

        }
    }

    getVar(name) {
        const frame = this.silentFind(name);
        let value;
        if (frame) {
            value = frame.vars[name].value;
            return (value === 0 ? 0
                    : value === false ? false
                            : value === '' ? ''
                                : value || 0); // don't return null
        }
        if (typeof name === 'number') {
            // empty input with a Binding-ID called without an argument
            return '';
        }
        throw new Error(
            localize('a variable of name \'')
                + name
                + localize('\'\ndoes not exist in this context')
        );
    }

    addVar(name, value) {
        this.vars[name] = new Variable(value === 0 ? 0
                  : value === false ? false
                           : value === '' ? '' : value || 0);
    }

    deleteVar(name) {
        const frame = this.find(name);
        if (frame) {
            delete frame.vars[name];
        }
    }

    // VariableFrame tools

    names() {
        let each;
        const names = [];
        for (each in this.vars) {
            if (Object.prototype.hasOwnProperty.call(this.vars, each)) {
                names.push(each);
            }
        }
        return names;
    }

    allNamesDict() {
        const dict = {};
        let current = this;

        function addKeysToDict(srcDict, trgtDict) {
            let eachKey;
            for (eachKey in srcDict) {
                if (Object.prototype.hasOwnProperty.call(srcDict, eachKey)) {
                    trgtDict[eachKey] = eachKey;
                }
            }
        }

        while (current) {
            addKeysToDict(current.vars, dict);
            current = current.parentFrame;
        }
        return dict;
    }

    allNames() {
        /*
            only show the names of the lexical scope, hybrid scoping is
            reserved to the daring ;-)
        */
        const answer = [];

        let each;
        const dict = this.allNamesDict();

        for (each in dict) {
            if (Object.prototype.hasOwnProperty.call(dict, each)) {
                answer.push(each);
            }
        }
        return answer;
    }
}

