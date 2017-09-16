// ReadStream ////////////////////////////////////////////////////////////

// I am a sequential reading interface to an Array or String

// ReadStream instance creation:

export default class ReadStream {
    nonSpace: RegExp; // prototype
    nonWord: RegExp; // prototype

    contents: string | string[];
    index = 0;

    constructor(arrayOrString: string = "") {
        this.contents = arrayOrString;
    }

    // ReadStream accessing:

    next(count?: number) {
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

    skip(count = 1) {
        this.index += count;
    }

    atEnd() {
        return this.index > (this.contents.length - 1);
    }

    // ReadStream accessing String contents:

    upTo(str: string): string {
        const i = this.contents.indexOf(str, this.index);
        return i === -1 ? '' : <string> this.contents.slice(this.index, this.index = i);
    }

    peekUpTo(str: string): string {
        const i = this.contents.indexOf(str, this.index);
        return i === -1 ? '' : <string> this.contents.slice(this.index, i);
    }

    skipSpace() {
        this.nonSpace.lastIndex = this.index;
        const result = this.nonSpace.exec(<string> this.contents);
        if (result) this.index = result.index;
    }

    word(): string {
        this.nonWord.lastIndex = this.index;
        const result = this.nonWord.exec(<string> this.contents);
        return result ? <string> this.contents.slice(this.index, this.index = result.index) : '';
    }
}

// ReadStream constants:

ReadStream.prototype.nonSpace = /\S|$/g;
ReadStream.prototype.nonWord = /[\s\>\/\=]|$/g;