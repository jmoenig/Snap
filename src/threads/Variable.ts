// Variable /////////////////////////////////////////////////////////////////

export default class Variable {
    constructor(value, isTransient) {
        this.value = value;
        this.isTransient = isTransient || false; // prevent value serialization
    }

    toString() {
        return `a ${this.isTransient ? 'transient ' : ''}Variable [${this.value}]`;
    }

    copy() {
        return new Variable(this.value, this.isTransient);
    }
}

