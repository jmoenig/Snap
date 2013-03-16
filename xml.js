/*

    xml.js

    a simple XML DOM, encoder and parser for morphic.js

    written by Jens Mšnig
    jens@moenig.org

    Copyright (C) 2013 by Jens Mšnig

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
    needs morphic.js


    hierarchy
    ---------
    the following tree lists all constructors hierarchically,
    indentation indicating inheritance. Refer to this list to get a
    contextual overview:

        Node*
            XML_Element
        ReadStream

    * defined in morphic.js


    toc
    ---
    the following list shows the order in which all constructors are
    defined. Use this list to locate code in this document:

        ReadStream
        XML_Element


    credits
    -------
    Nathan Dinsmore contributed to the design and implemented a first
    working version of a complete XMLSerializer. I have taken much of the
    overall design and many of the functions and methods in this file from
    Nathan's fine original prototype.

*/

/*global modules, isString, detect, Node, isNil*/

// Global stuff ////////////////////////////////////////////////////////

modules.xml = '2013-February-18';

// Declarations

var ReadStream;
var XML_Element;

// ReadStream ////////////////////////////////////////////////////////////

// I am a sequential reading interface to an Array or String

// ReadStream instance creation:

function ReadStream(arrayOrString) {
    this.contents = arrayOrString || '';
    this.index = 0;
}

// ReadStream constants:

ReadStream.prototype.space = /[\s]/;

// ReadStream accessing:

ReadStream.prototype.next = function (count) {
    var element;
    if (count === undefined) {
        element = this.contents[this.index];
        this.index += 1;
        return element;
    }
    return this.contents.slice(this.index, this.index += count);
};

ReadStream.prototype.peek = function () {
    return this.contents[this.index];
};

ReadStream.prototype.skip = function (count) {
    this.index += count || 1;
};

ReadStream.prototype.atEnd = function () {
    return this.index > (this.contents.length - 1);
};

// ReadStream accessing String contents:

ReadStream.prototype.upTo = function (regex) {
    if (!isString(this.contents)) {return ''; }
    var i = this.contents.substr(this.index).search(regex);
    if (i === -1) {
        return '';
    }
    return this.contents.substring(this.index, this.index += i);
};

ReadStream.prototype.peekUpTo = function (regex) {
    if (!isString(this.contents)) {return ''; }
    var i = this.contents.substr(this.index).search(regex);
    if (i === -1) {
        return '';
    }
    return this.contents.substring(this.index, this.index + i);
};

ReadStream.prototype.skipSpace = function () {
    if (!isString(this.contents)) {return ''; }
    var ch;
    while (this.space.test(ch = this.peek()) && ch !== '') {
        this.skip();
    }
};

ReadStream.prototype.word = function () {
    if (!isString(this.contents)) {return ''; }
    var i = this.contents.substr(this.index).search(/[\s\>\/\=]|$/);
    if (i === -1) {
        return '';
    }
    return this.contents.substring(this.index, this.index += i);
};

// XML_Element ///////////////////////////////////////////////////////////
/*
    I am a DOM-Node which can encode itself to as well as parse itself
    from a well-formed XML string. Note that there is no separate parser
    object, all the parsing can be done in a single object.
*/

// XML_Element inherits from Node:

XML_Element.prototype = new Node();
XML_Element.prototype.constructor = XML_Element;
XML_Element.uber = Node.prototype;

// XML_Element preferences settings:

XML_Element.prototype.indentation = '  ';

// XML_Element instance creation:

function XML_Element(tag, contents, parent) {
    this.init(tag, contents, parent);
}

XML_Element.prototype.init = function (tag, contents, parent) {
    // additional properties:
    this.tag = tag || 'unnamed';
    this.attributes = {};
    this.contents = contents || '';

    // initialize inherited properties:
    XML_Element.uber.init.call(this);

    // override inherited properties
    if (parent instanceof XML_Element) {
        parent.addChild(this);
    }
};

// XML_Element DOM navigation: (aside from what's inherited from Node)

XML_Element.prototype.require = function (tagName) {
    // answer the first direct child with the specified tagName, or throw
    // an error if it doesn't exist
    var child = this.childNamed(tagName);
    if (!child) {
        throw new Error('Missing required element <' + tagName + '>!');
    }
    return child;
};

XML_Element.prototype.childNamed = function (tagName) {
    // answer the first direct child with the specified tagName, or null
    return detect(
        this.children,
        function (child) {return child.tag === tagName; }
    );
};

XML_Element.prototype.childrenNamed = function (tagName) {
    // answer all direct children with the specified tagName
    return this.children.filter(
        function (child) {return child.tag === tagName; }
    );
};

XML_Element.prototype.parentNamed = function (tagName) {
    // including myself
    if (this.tag === tagName) {
        return this;
    }
    if (!this.parent) {
        return null;
    }
    return this.parent.parentNamed(tagName);
};

// XML_Element output:

XML_Element.prototype.toString = function (isFormatted, indentationLevel) {
    var result = '',
        indent = '',
        level = indentationLevel || 0,
        key,
        i;

    // spaces for indentation, if any
    if (isFormatted) {
        for (i = 0; i < level; i += 1) {
            indent += this.indentation;
        }
        result += indent;
    }

    // opening tag
    result += ('<' + this.tag);

    // attributes, if any
    for (key in this.attributes) {
        if (this.attributes.hasOwnProperty(key) && this.attributes[key]) {
            result += ' ' + key + '="' + this.attributes[key] + '"';
        }
    }

    // contents, subnodes, and closing tag
    if (!this.contents.length && !this.children.length) {
        result += '/>';
    } else {
        result += '>';
        result += this.contents;
        this.children.forEach(function (element) {
            if (isFormatted) {
                result += '\n';
            }
            result += element.toString(isFormatted, level + 1);
        });
        if (isFormatted && this.children.length) {
            result += ('\n' + indent);
        }
        result += '</' + this.tag + '>';
    }
    return result;
};

XML_Element.prototype.escape = function (string, ignoreQuotes) {
    var src = isNil(string) ? '' : string.toString(),
        result = '',
        i,
        ch;
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
};

XML_Element.prototype.unescape = function (string) {
    var stream = new ReadStream(string),
        result = '',
        ch,
        esc;

    function nextPut(str) {
        result += str;
        stream.upTo(';');
        stream.skip();
    }

    while (!stream.atEnd()) {
        ch = stream.next();
        if (ch === '&') {
            esc = stream.peekUpTo(';');
            switch (esc) {
            case 'apos':
                nextPut('\'');
                break;
            case 'quot':
                nextPut('\"');
                break;
            case 'lt':
                nextPut('<');
                break;
            case 'gt':
                nextPut('>');
                break;
            case 'amp':
                nextPut('&');
                break;
            case '#xD':
                nextPut('\n');
                break;
            case '#126':
                nextPut('~');
                break;
            default:
                result += ch;
            }
        } else {
            result += ch;
        }
    }
    return result;
};

// XML_Element parsing:

XML_Element.prototype.parseString = function (string) {
    var stream = new ReadStream(string);
    stream.upTo('<');
    stream.skip();
    this.parseStream(stream);
};

XML_Element.prototype.parseStream = function (stream) {
    var key,
        value,
        ch,
        child;

    // tag:
    this.tag = stream.word();
    stream.skipSpace();

    // attributes:
    while ((ch = stream.peek()) !== '>' && ch !== '/') {
        key = stream.word();
        stream.skipSpace();
        if (stream.next() !== '=') {
            throw new Error('Expected "=" after attribute name');
        }
        stream.skipSpace();
        if ((ch = stream.next()) !== '"' && ch !== "'") {
            throw new Error(
                'Expected single- or double-quoted attribute value'
            );
        }
        value = stream.upTo(ch);
        stream.skip(1);
        stream.skipSpace();
        this.attributes[key] = this.unescape(value);
    }

    // empty tag:
    if (stream.peek() === '/') {
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
                    throw new Error('Expected to close ' + this.tag);
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
};