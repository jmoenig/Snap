// SpriteBubbleMorph ////////////////////////////////////////////////////////

/*
    I am a sprite's scaleable speech bubble. I rely on SpriteMorph
    for my preferences settings
*/

import SpeechBubbleMorph from "../morphic/morph/SpeechBubbleMorph";

// SpriteBubbleMorph instance creation:

export default class SpriteBubbleMorph extends SpeechBubbleMorph {
    constructor(data, stage, isThought, isQuestion) {
        this.init(data, stage, isThought, isQuestion);
    }

    init(data, stage, isThought, isQuestion) {
        const sprite = SpriteMorph.prototype;
        this.stage = stage;
        this.scale = stage ? stage.scale : 1;
        this.data = data;
        this.isQuestion = isQuestion;

        super.init.call(
            this,
            this.dataAsMorph(data),
            sprite.bubbleColor,
            null,
            null,
            isQuestion ? sprite.blockColor.sensing : sprite.bubbleBorderColor,
            null,
            isThought
        );
    }

    // SpriteBubbleMorph contents formatting

    dataAsMorph(data, toggle) {
        let contents;
        let isTable;
        const sprite = SpriteMorph.prototype;
        let isText;
        let img;
        let scaledImg;
        let width;
        if (data instanceof Morph) {
            if (isSnapObject(data)) {
                img = data.thumbnail(new Point(40, 40));
                contents = new Morph();
                contents.silentSetWidth(img.width);
                contents.silentSetHeight(img.height);
                contents.image = img;
                contents.version = data.version;
                contents.step = function () {
                    if (this.version !== data.version) {
                        img = data.thumbnail(new Point(40, 40));
                        this.image = img;
                        this.version = data.version;
                        this.changed();
                    }
                };
            } else {
                contents = data;
            }
        } else if (isString(data)) {
            isText = true;
            contents = new TextMorph(
                data,
                sprite.bubbleFontSize * this.scale,
                null, // fontStyle
                sprite.bubbleFontIsBold,
                false, // italic
                'center'
            );
        } else if (typeof data === 'boolean') {
            img = sprite.booleanMorph(data).fullImage();
            contents = new Morph();
            contents.silentSetWidth(img.width);
            contents.silentSetHeight(img.height);
            contents.image = img;
        } else if (data instanceof Costume) {
            img = data.thumbnail(new Point(40, 40));
            contents = new Morph();
            contents.silentSetWidth(img.width);
            contents.silentSetHeight(img.height);
            contents.image = img;
        } else if (data instanceof Sound) {
            contents = new SymbolMorph('notes', 30);
        } else if (data instanceof HTMLCanvasElement) {
            contents = new Morph();
            contents.silentSetWidth(data.width);
            contents.silentSetHeight(data.height);
            contents.image = data;
        } else if (data instanceof List) {
            if (toggle && this.contentsMorph) {
                isTable = (this.contentsMorph instanceof ListWatcherMorph);
            } else {
                isTable = data.isTable();
            }

            if (isTable) { // (!toggle && data.isTable()) {
                contents = new TableFrameMorph(new TableMorph(data, 10));
                if (this.stage) {
                    contents.expand(this.stage.extent().translateBy(
                        -2 * (this.edge + this.border + this.padding)
                    ));
                }
            } else {
                contents = new ListWatcherMorph(data);
                contents.update(true);
                contents.step = contents.update;
                if (this.stage) {
                    contents.expand(this.stage.extent().translateBy(
                        -2 * (this.edge + this.border + this.padding)
                    ));
                }
            }
            contents.isDraggable = false;
        } else if (data instanceof Context) {
            img = data.image();
            contents = new Morph();
            contents.silentSetWidth(img.width);
            contents.silentSetHeight(img.height);
            contents.image = img;
        } else {
            contents = new TextMorph(
                data.toString(),
                sprite.bubbleFontSize * this.scale,
                null, // fontStyle
                sprite.bubbleFontIsBold,
                false, // italic
                'center'
            );
        }
        if (contents instanceof TextMorph) {
            // reflow text boundaries
            width = Math.max(
                contents.width(),
                sprite.bubbleCorner * 2 * this.scale
            );
            if (isText) {
                width = Math.min(width, sprite.bubbleMaxTextWidth * this.scale);
            }
            contents.setWidth(width);
        } else if (!(data instanceof List)) {
            // scale contents image
            scaledImg = newCanvas(contents.extent().multiplyBy(this.scale));
            scaledImg.getContext('2d').drawImage(
                contents.image,
                0,
                0,
                scaledImg.width,
                scaledImg.height
            );
            contents.image = scaledImg;
            contents.bounds = contents.bounds.scaleBy(this.scale);
        }
        return contents;
    }

    // SpriteBubbleMorph scaling

    setScale(scale) {
        this.scale = scale;
        this.changed();
        this.drawNew();
        this.changed();
    }

    // SpriteBubbleMorph drawing:

    drawNew(toggle) {
        const sprite = SpriteMorph.prototype;

        // scale my settings
        this.edge = sprite.bubbleCorner * this.scale;
        this.border = sprite.bubbleBorder * this.scale;
        this.padding = sprite.bubbleCorner / 2 * this.scale;

        // re-build my contents
        if (this.contentsMorph) {
            this.contentsMorph.destroy();
        }
        this.contentsMorph = this.dataAsMorph(this.data, toggle);
        this.add(this.contentsMorph);

        // adjust my layout
        this.silentSetWidth(this.contentsMorph.width()
            + (this.padding ? this.padding * 2 : this.edge * 2));
        this.silentSetHeight(this.contentsMorph.height()
            + this.edge
            + this.border * 2
            + this.padding * 2
            + 2);

        // draw my outline
        SpeechBubbleMorph.uber.drawNew.call(this);

        // position my contents
        this.contentsMorph.setPosition(this.position().add(
            new Point(
                this.padding || this.edge,
                this.border + this.padding + 1
            )
        ));
    }

    // SpriteBubbleMorph resizing:

    fixLayout() {
        // to be used when resizing list watchers
        // otherwise use drawNew() to force re-layout

        const sprite = SpriteMorph.prototype;

        this.changed();
        // scale my settings
        this.edge = sprite.bubbleCorner * this.scale;
        this.border = sprite.bubbleBorder * this.scale;
        this.padding = sprite.bubbleCorner / 2 * this.scale;

        // adjust my layout
        this.silentSetWidth(this.contentsMorph.width()
            + (this.padding ? this.padding * 2 : this.edge * 2));
        this.silentSetHeight(this.contentsMorph.height()
            + this.edge
            + this.border * 2
            + this.padding * 2
            + 2);

        // draw my outline
        SpeechBubbleMorph.uber.drawNew.call(this);

        // position my contents
        this.contentsMorph.setPosition(this.position().add(
            new Point(
                this.padding || this.edge,
                this.border + this.padding + 1
            )
        ));
        this.changed();
    }
}

