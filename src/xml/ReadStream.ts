// ReadStream ////////////////////////////////////////////////////////////

// I am a sequential reading interface to an Array or String

// ReadStream instance creation:

export default class ReadStream {
    constructor(arrayOrString) {
        this.contents = arrayOrString || '';
        this.index = 0;
    }

    // ReadStream accessing:

    next(count) {
        let element;
        let start;
        if (count === undefined) {
            element = this.contents[this.index];
            this.index += 1;
            return element;
        }
        start = this.index;
        this.index += count;
        return this.contents.slice(start, this.index);
    }

    peek() {
        return this.contents[this.index];
    }

    skip(count) {
        this.index += count || 1;
    }

    atEnd() {
        return this.index > (this.contents.length - 1);
    }

    // ReadStream accessing String contents:

    upTo(str) {
        const i = this.contents.indexOf(str, this.index);
        return i === -1 ? '' : this.contents.slice(this.index, this.index = i);
    }

    peekUpTo(str) {
        const i = this.contents.indexOf(str, this.index);
        return i === -1 ? '' : this.contents.slice(this.index, i);
    }

    skipSpace() {
        this.nonSpace.lastIndex = this.index;
        const result = this.nonSpace.exec(this.contents);
        if (result) this.index = result.index;
    }

    word() {
        this.nonWord.lastIndex = this.index;
        const result = this.nonWord.exec(this.contents);
        return result ? this.contents.slice(this.index, this.index = result.index) : '';
    }
}

// ReadStream constants:

ReadStream.prototype.nonSpace = /\S|$/g;
ReadStream.prototype.nonWord = /[\s\>\/\=]|$/g;