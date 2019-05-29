// HelpDialogMorph //////////////////////////////////////////////////////

// HelpDialogMorph inherits from DialogBoxMorph:

HelpDialogMorph.prototype = new DialogBoxMorph();
HelpDialogMorph.prototype.constructor = HelpDialogMorph;
HelpDialogMorph.uber = DialogBoxMorph.prototype;

// HelpDialogMorph instance creation:

function HelpDialogMorph(block, target) {
    this.init(block, target);
}

HelpDialogMorph.prototype.init = function (block, target) {
    // additional properties:
    this.block = block;
    this.target = target;
    this.screen = null;

    // initialize inherited properties:
    HelpDialogMorph.uber.init.call(
        this,
        target,
        nop,
        target
    );

    // override inherited properites:
    this.key = 'help';
    this.labelString = 'Help';
    this.createLabel();

    this.setExtent(new Point(600, 400));
    this.addButton('ok', 'OK');
};

HelpDialogMorph.prototype.popUp = function () {
    var myself = this,
        world = this.target.parentThatIsA(WorldMorph),
        ide = this.target.parentThatIsA(IDE_Morph),
        spec;
    
    if (this.block.isCustomBlock) {
        if (this.block.isGlobal) {
            spec = this.block.definition.helpSpec();
        } else {
            spec = this.target.getMethod(this.blockSpec).helpSpec();
        }
    } else {
        spec = this.block.selector;
    }

    ide.getURL( // TODO: error handling
        ide.resourceURL('help', spec + '.xml'),
        function (xmlString) {
            var scrollFrame;
            myself.screen = new SnapSerializer().loadHelpScreen(xmlString, myself.target);
            myself.screen.color = DialogBoxMorph.prototype.color;
            scrollFrame = new ScrollFrameMorph(myself.screen);
            scrollFrame.color = DialogBoxMorph.prototype.color;
            myself.screen.scrollFrame = scrollFrame;
            myself.addBody(scrollFrame);
            myself.fixLayout();
            HelpDialogMorph.uber.popUp.call(myself, world);
        }
    );
};

HelpDialogMorph.prototype.fixLayout = function () {
    BlockEditorMorph.prototype.fixLayout.call(this);
    if (this.screen && typeof this.screen.fixLayout === 'function') {
        this.screen.fixLayout();
    }
};

// HelpScreenMorph //////////////////////////////////////////////////////

// HelpScreenMorph inherits from FrameMorph:

HelpScreenMorph.prototype = new FrameMorph();
HelpScreenMorph.prototype.constructor = HelpScreenMorph;
HelpScreenMorph.uber = FrameMorph.prototype;

// HelpScreenMorph layout settings:

HelpScreenMorph.prototype.padding = 10;

// HelpScreenMorph instance creation:

function HelpScreenMorph() {
    this.init();
}

HelpScreenMorph.prototype.init = function () {
    HelpScreenMorph.uber.init.call(this);
    this.setWidth(572);
};

HelpScreenMorph.prototype.fixLayout = function () {
    var myself = this;
    this.children.forEach(function (child) {
        var startY = child.top(), height = 0;
        child.children.forEach(function (child) {
            child.setPosition(
                child.position().add(new Point(myself.padding, myself.padding))
            );
            height = Math.max(height, child.bottom() - startY);
        });
        child.setHeight(height + myself.padding);
    });
};

HelpScreenMorph.prototype.createBox = function () {
    var box = new BoxMorph();
    box.color = new Color(133, 138, 140);
    box.borderColor = new Color(183, 186, 188);
    return box;
};

HelpScreenMorph.prototype.createColumn = function () {
    var col = new AlignmentMorph('column', this.padding);
    col.alignment = 'left';
    return col;
};

HelpScreenMorph.prototype.createRow = function () {
    var row = new AlignmentMorph('row', this.padding);
    row.alignment = 'top';
    return row;
};

HelpScreenMorph.prototype.createParagraph = function (text) {
    return new TextMorph(text, 18, 'serif', false, false, null, null, 'Baskerville');
};

HelpScreenMorph.prototype.createRichParagraph = function (text) {
    return new RichTextMorph(text, 18, 'serif', false, false, null, null, 'Baskerville');
};

// RichTextMorph ////////////////////////////////////////////////////////////

// I am a multi-line, word-wrapping String that can have other morphs inlined

// RichTextMorph inherits from TextMorph:

RichTextMorph.prototype = new TextMorph();
RichTextMorph.prototype.constructor = RichTextMorph;
RichTextMorph.uber = TextMorph.prototype;

// RichTextMorph instance creation:

function RichTextMorph(
    text,
    fontSize,
    fontStyle,
    bold,
    italic,
    alignment,
    width,
    fontName,
    shadowOffset,
    shadowColor
) {
    this.init(text,
        fontSize,
        fontStyle,
        bold,
        italic,
        alignment,
        width,
        fontName,
        shadowOffset,
        shadowColor);
}

RichTextMorph.prototype.init = function (
    text,
    fontSize,
    fontStyle,
    bold,
    italic,
    alignment,
    width,
    fontName,
    shadowOffset,
    shadowColor
) {
    // initialize inherited properties:
    RichTextMorph.uber.init.call(this,
        text || ['RichTextMorph'],
        fontSize,
        fontStyle,
        bold,
        italic,
        alignment,
        width,
        fontName,
        shadowOffset,
        shadowColor);
};

RichTextMorph.prototype.toString = function () {
    // e.g. 'a RichTextMorph("Hello World")'
    return 'a RichTextMorph' + '("' + this.text.join(' ').slice(0, 30) + '...")';
};

RichTextMorph.prototype.parse = function () {
    var myself = this,
        canvas = newCanvas(),
        context = canvas.getContext('2d'),
        line = [],
        lineWidth = 0,
        w;

    context.font = this.font();
    this.maxLineWidth = 0;
    this.lines = [];
    this.words = [];

    this.text.forEach(function (word) {
        var paragraphs, i, p;
        if (word instanceof Morph) {
            myself.words.push(word);
            if (word.parent !== this) {
                myself.add(word);
            }
        } else {
            paragraphs = word.split('\n');
            for (i = 0; i < paragraphs.length; i = i + 1) {
                p = paragraphs[i];
                myself.words = myself.words.concat(p.split(' '));
                if (i < paragraphs.length - 1) {
                    myself.words.push('\n');
                }
            }
        }
    });

    this.words.forEach(function (word) {
        if (word === '\n') {
            myself.lines.push(line);
            myself.maxLineWidth = Math.max(myself.maxLineWidth, lineWidth);
            line = [];
            lineWidth = 0;
        } else {
            if (!(word instanceof Morph)) {
                word = word + ' ';
            }
            w = myself.calculateWordWidth(word);
            if (myself.maxWidth > 0 && lineWidth + w > myself.maxWidth) {
                myself.lines.push(line);
                myself.maxLineWidth = Math.max(
                    myself.maxLineWidth,
                    lineWidth
                );
                line = [word];
                lineWidth = w;
            } else {
                line.push(word);
                lineWidth += w;
            }
        }
    });
    this.lines.push(line);
    this.maxLineWidth = Math.max(this.maxLineWidth, lineWidth);
};

RichTextMorph.prototype.drawNew = function () {
    var myself = this, context, height, width, i, j, line, lineHeight, word,
        shadowHeight, shadowWidth, offx, offy, x, y;

    this.image = newCanvas();
    context = this.image.getContext('2d');
    context.font = this.font();
    this.parse();

    // set my extent
    shadowWidth = Math.abs(this.shadowOffset.x);
    shadowHeight = Math.abs(this.shadowOffset.y);
    height = 0;
    this.lines.forEach(function (line) {
        height += myself.calculateLineHeight(line) + shadowHeight;
    });
    if (this.maxWidth === 0) {
        this.bounds = this.bounds.origin.extent(
            new Point(this.maxLineWidth + shadowWidth, height)
        );
    } else {
        this.bounds = this.bounds.origin.extent(
            new Point(this.maxWidth + shadowWidth, height)
        );
    }
    this.image.width = this.width();
    this.image.height = this.height();

    // prepare context for drawing text
    context = this.image.getContext('2d');
    context.font = this.font();
    context.textAlign = 'left';
    context.textBaseline = 'bottom';

    // fill the background, if desired
    if (this.backgroundColor) {
        context.fillStyle = this.backgroundColor.toString();
        context.fillRect(0, 0, this.width(), this.height());
    }

    // draw the shadow, if any
    if (this.shadowColor) {
        offx = Math.max(this.shadowOffset.x, 0);
        offy = Math.max(this.shadowOffset.y, 0);
        context.fillStyle = this.shadowColor.toString();

        y = 0;
        for (i = 0; i < this.lines.length; i = i + 1) {
            line = this.lines[i];
            width = this.calculateLineWidth(line) + shadowWidth;
            if (this.alignment === 'right') {
                x = this.width() - width;
            } else if (this.alignment === 'center') {
                x = (this.width() - width) / 2;
            } else { // 'left'
                x = 0;
            }
            y += calculateLineHeight(line) / 2
            for (j = 0; j < line.length; j = j + 1) {
                word = line[j];
                if (!(word instanceof Morph)) {
                    context.fillText(
                        word, x + offx,
                        y + (this.calculateWordHeight(word) / 2) + offy
                    );
                }
                x += this.calculateWordWidth(word);
            }
            y += (calculateLineHeight(line) / 2) + shadowHeight;
        }
    }

    // now draw the actual text
    offx = Math.abs(Math.min(this.shadowOffset.x, 0));
    offy = Math.abs(Math.min(this.shadowOffset.y, 0));
    context.fillStyle = this.color.toString();

    y = 0;
    for (i = 0; i < this.lines.length; i = i + 1) {
        line = this.lines[i];
        width = this.calculateLineWidth(line) + shadowWidth;
        if (this.alignment === 'right') {
            x = this.width() - width;
        } else if (this.alignment === 'center') {
            x = (this.width() - width) / 2;
        } else { // 'left'
            x = 0;
        }
        lineHeight = this.calculateLineHeight(line);
        y += lineHeight / 2;
        for (j = 0; j < line.length; j = j + 1) {
            word = line[j];
            if (word instanceof Morph) {
                console.log(word);
                word.setPosition(new Point(
                    x + offx, 
                    y - (this.calculateWordHeight(word) / 2) + offy
                ));
            } else {
                context.fillText(
                    word, x + offx,
                    y + (this.calculateWordHeight(word) / 2) + offy
                );
            }
            x += this.calculateWordWidth(word);
        }
        y += lineHeight / 2 + shadowHeight;
    }

    // notify my parent of layout change
    if (this.parent) {
        if (this.parent.layoutChanged) {
            this.parent.layoutChanged();
        }
    }
};

RichTextMorph.prototype.calculateWordWidth = function (word) {
    var canvas = newCanvas(),
        context = canvas.getContext('2d');
    context.font = this.font();
    if (word instanceof Morph) {
        return word.width() + context.measureText(' ').width;
    }
    return context.measureText(word).width;
};

RichTextMorph.prototype.calculateLineWidth = function (line) {
    var myself = this, width = 0;
    line.forEach(function (word) {
        width += myself.calculateWordWidth(word);
    });
    return width;
};

RichTextMorph.prototype.calculateWordHeight = function (word) {
    if (word instanceof BlockMorph) {
        return word.stackFullBounds().height();
    } else if (word instanceof Morph) {
        return word.height();
    }
    return fontHeight(this.fontSize);
};

RichTextMorph.prototype.calculateLineHeight = function (line) {
    var myself = this, height = 0;
    line.forEach(function (word) {
        height = Math.max(height, myself.calculateWordHeight(word));
    });
    return height;
};
