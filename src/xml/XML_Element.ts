// XML_Element ///////////////////////////////////////////////////////////
/*
    I am a DOM-Node which can encode itself to as well as parse itself
    from a well-formed XML string. Note that there is no separate parser
    object, all the parsing can be done in a single object.
*/

import Node from "../morphic/Node";

// XML_Element preferences settings:

XML_Element.prototype.indentation = '  ';

// XML_Element instance creation:

export default class XML_Element extends Node {
    constructor(tag, contents, parent) {
        this.init(tag, contents, parent);
    }

    init(tag, contents, parent) {
        // additional properties:
        this.tag = tag || 'unnamed';
        this.attributes = {};
        this.contents = contents || '';

        // initialize inherited properties:
        super.init.call(this);

        // override inherited properties
        if (parent) parent.addChild(this);
    }

    // XML_Element DOM navigation: (aside from what's inherited from Node)

    require(tagName) {
        // answer the first direct child with the specified tagName, or throw
        // an error if it doesn't exist
        const child = this.childNamed(tagName);
        if (!child) {
            throw new Error(`Missing required element <${tagName}>!`);
        }
        return child;
    }

    childNamed(tagName) {
        // answer the first direct child with the specified tagName, or null
        return detect(
            this.children,
            child => child.tag === tagName
        );
    }

    childrenNamed(tagName) {
        // answer all direct children with the specified tagName
        return this.children.filter(
            child => child.tag === tagName
        );
    }

    parentNamed(tagName) {
        // including myself
        if (this.tag === tagName) {
            return this;
        }
        if (!this.parent) {
            return null;
        }
        return this.parent.parentNamed(tagName);
    }

    // XML_Element output:

    toString(isFormatted, indentationLevel) {
        let result = '';
        let indent = '';
        const level = indentationLevel || 0;
        let key;
        let i;

        // spaces for indentation, if any
        if (isFormatted) {
            for (i = 0; i < level; i += 1) {
                indent += this.indentation;
            }
            result += indent;
        }

        // opening tag
        result += (`<${this.tag}`);

        // attributes, if any
        for (key in this.attributes) {
            if (Object.prototype.hasOwnProperty.call(this.attributes, key)
                    && this.attributes[key]) {
                result += ` ${key}="${this.attributes[key]}"`;
            }
        }

        // contents, subnodes, and closing tag
        if (!this.contents.length && !this.children.length) {
            result += '/>';
        } else {
            result += '>';
            result += this.contents;
            this.children.forEach(element => {
                if (isFormatted) {
                    result += '\n';
                }
                result += element.toString(isFormatted, level + 1);
            });
            if (isFormatted && this.children.length) {
                result += (`\n${indent}`);
            }
            result += `</${this.tag}>`;
        }
        return result;
    }

    escape(string, ignoreQuotes) {
        const src = isNil(string) ? '' : string.toString();
        let result = '';
        let i;
        let ch;
        for (i = 0; i < src.length; i += 1) {
            ch = src[i];
            switch (ch) {
            case '\'':
                result += '&apos;';
                break;
            case '\"':
                result += ignoreQuotes ? ch : '&quot;';
                break;
            case '<':
                result += '&lt;';
                break;
            case '>':
                result += '&gt;';
                break;
            case '&':
                result += '&amp;';
                break;
            case '\n': // escape CR b/c of export to URL feature
                result += '&#xD;';
                break;
            case '~': // escape tilde b/c it's overloaded in serializer.store()
                result += '&#126;';
                break;
            default:
                result += ch;
            }
        }
        return result;
    }

    unescape(string) {
        return string.replace(/&(amp|apos|quot|lt|gt|#xD|#126);/g, (_, name) => {
            switch (name) {
                case 'amp': return '&';
                case 'apos': return '\'';
                case 'quot': return '"';
                case 'lt': return '<';
                case 'gt': return '>';
                case '#xD': return '\n';
                case '#126': return '~';
                default: console.warn('unreachable');
            }
        });
    }

    // XML_Element parsing:

    parseString(string) {
        const stream = new ReadStream(string);
        stream.upTo('<');
        stream.skip();
        this.parseStream(stream);
    }

    parseStream(stream) {
        let key;
        let value;
        let ch;
        let child;

        // tag:
        this.tag = stream.word();
        stream.skipSpace();

        // attributes:
        ch = stream.peek();
        while (ch !== '>' && ch !== '/') {
            key = stream.word();
            stream.skipSpace();
            if (stream.next() !== '=') {
                throw new Error('Expected "=" after attribute name');
            }
            stream.skipSpace();
            ch = stream.next();
            if (ch !== '"' && ch !== "'") {
                throw new Error('Expected single- or double-quoted attribute value');
            }
            value = stream.upTo(ch);
            stream.skip(1);
            stream.skipSpace();
            this.attributes[key] = this.unescape(value);
            ch = stream.peek();
        }

        // empty tag:
        if (ch === '/') {
            stream.skip();
            if (stream.next() !== '>') {
                throw new Error('Expected ">" after "/" in empty tag');
            }
            return;
        }
        if (stream.next() !== '>') {
            throw new Error('Expected ">" after tag name and attributes');
        }

        // contents and children
        while (!stream.atEnd()) {
            ch = stream.next();
            if (ch === '<') {
                if (stream.peek() === '/') { // closing tag
                    stream.skip();
                    if (stream.word() !== this.tag) {
                        throw new Error(`Expected to close ${this.tag}`);
                    }
                    stream.upTo('>');
                    stream.skip();
                    this.contents = this.unescape(this.contents);
                    return;
                }
                child = new XML_Element(null, null, this);
                child.parseStream(stream);
            } else {
                this.contents += ch;
            }
        }
    }
}

