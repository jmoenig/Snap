// XML_Serializer ///////////////////////////////////////////////////////
/*
    I am an abstract protype for my heirs.

    I manage object identities and keep track of circular data structures.
    Objects are "touched" and a property named "serializationID" is added
    to each, representing an index integer in the list, starting with 1.
*/

// XML_Serializer instance creation:

export default class XML_Serializer {
    constructor() {
        this.contents = [];
        this.media = [];
        this.isCollectingMedia = false;
    }

    // XML_Serializer accessing:

    serialize(object) {
        // public: answer an XML string representing the given object
        let xml;
        this.flush(); // in case an error occurred in an earlier attempt
        this.flushMedia();
        xml = this.store(object);
        this.flush();
        return xml;
    }

    store(object, mediaID) {
        // private - mediaID is optional
        if (isNil(object) || !object.toXML) {
            // unsupported type, to be checked before calling store()
            // when debugging, be sure to throw an error at this point
            return '';
        }
        if (this.isCollectingMedia && object[this.mediaDetectionProperty]) {
            this.addMedia(object, mediaID);
            return this.format(
                '<ref mediaID="@"></ref>',
                object[this.mediaIdProperty]
            );
        }
        if (object[this.idProperty]) {
            return this.format('<ref id="@"></ref>', object[this.idProperty]);
        }
        this.add(object);
        return object.toXML(this, mediaID).replace(
            '~',
            this.format('id="@"', object[this.idProperty])
        );
    }

    mediaXML() {
        // answer a project's collected media module as XML
        let xml = '<media>';

        const myself = this;
        this.media.forEach(object => {
            const str = object.toXML(myself).replace(
                '~',
                myself.format('mediaID="@"', object[myself.mediaIdProperty])
            );
            xml = xml + str;
        });
        return `${xml}</media>`;
    }

    add(object) {
        // private - mark the object with a serializationID property and add it
        if (object[this.idProperty]) { // already present
            return -1;
        }
        this.contents.push(object);
        object[this.idProperty] = this.contents.length;
        return this.contents.length;
    }

    addMedia(object, mediaID) {
        // private - mark the object with a serializationMediaID property
        // and add it to media
        // if a mediaID is given, take it, otherwise generate one
        if (object[this.mediaIdProperty]) { // already present
            return -1;
        }
        this.media.push(object);
        if (mediaID) {
            object[this.mediaIdProperty] = `${mediaID}_${object.name}`;
        } else {
            object[this.mediaIdProperty] = this.media.length;
        }
        return this.media.length;
    }

    at(integer) {
        // private
        return this.contents[integer - 1];
    }

    flush() {
        // private - free all objects and empty my contents
        const myself = this;
        this.contents.forEach(obj => {
            delete obj[myself.idProperty];
        });
        this.contents = [];
    }

    flushMedia() {
        // private - free all media objects and empty my media
        const myself = this;
        if (this.media instanceof Array) {
            this.media.forEach(obj => {
                delete obj[myself.mediaIdProperty];
            });
        }
        this.media = [];
    }

    format(string) {
        // private
        const myself = this;

        let i = -1;
        const values = arguments;
        let value;

        return string.replace(/[@$%]([\d]+)?/g, (spec, index) => {
            index = parseInt(index, 10);

            if (isNaN(index)) {
                i += 1;
                value = values[i + 1];
            } else {
                value = values[index + 1];
            }
            // original line of code - now frowned upon by JSLint:
            // value = values[(isNaN(index) ? (i += 1) : index) + 1];

            return spec === '@' ?
                    myself.escape(value)
                        : spec === '$' ?
                            myself.escape(value, true)
                                : value;
        });
    }

    // XML_Serializer loading:

    load(xmlString) {
        // public - answer a new object which is represented by the given
        // XML string.
        nop(xmlString);
        throw new Error(
            'loading should be implemented in heir of XML_Serializer'
        );
    }

    parse(xmlString) {
        // private - answer an XML_Element representing the given XML String
        const element = new XML_Element();
        element.parseString(xmlString);
        return element;
    }
}

// XML_Serializer preferences settings:

XML_Serializer.prototype.idProperty = 'serializationID';
XML_Serializer.prototype.mediaIdProperty = 'serializationMediaID';
XML_Serializer.prototype.mediaDetectionProperty = 'isMedia';
XML_Serializer.prototype.version = 1; // increment on structural change

// XML_Serializer formatting:

XML_Serializer.prototype.escape = XML_Element.prototype.escape;
XML_Serializer.prototype.unescape = XML_Element.prototype.unescape;

