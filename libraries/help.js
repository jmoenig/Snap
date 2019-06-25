// HelpScreenMorph //////////////////////////////////////////////////////

// HelpScreenMorph inherits from FrameMorph:

HelpScreenMorph.prototype = new FrameMorph();
HelpScreenMorph.prototype.constructor = HelpScreenMorph;
HelpScreenMorph.uber = FrameMorph.prototype;

// HelpScreenMorph layout settings:

HelpScreenMorph.prototype.padding = 15;
HelpScreenMorph.prototype.verticalPadding = 10;

// HelpScreenMorph instance creation:

function HelpScreenMorph(loadCallback) {
    this.init(loadCallback);
}

HelpScreenMorph.prototype.init = function (loadCallback) {
    // additional properties:
    this.thumbnail = null;
    this.imagesLoading = 0;
    this.loadCallback = loadCallback;

    // initialize inherited properties:
    HelpScreenMorph.uber.init.call(this);
    this.setWidth(572);
    this.color = DialogBoxMorph.prototype.color;
};

HelpScreenMorph.prototype.fixLayout = function () {
    var padding = this.padding, verticalPadding = this.verticalPadding,
        nextY = verticalPadding, thumbnail = this.thumbnail;
    function resizeBox (box) {
        var startX, startY, width = 0, height = 0;
        if (box !== thumbnail) {
            box.moveBy(new Point(0, nextY));
        }
        startX = box.left();
        startY = box.top();
        box.children.forEach(function (child) {
            child.moveBy(new Point (
                (child.shiftRight || 0) + padding,
                (child.shiftDown || 0) + padding
            ));
            if (box !== thumbnail) {
                if (child.right() > box.right()) {
                    child.setWidth(box.right() - padding - child.left());
                }
                if (child.top() < thumbnail.bottom() + padding) {
                    child.setTop(thumbnail.bottom() + padding);
                }
            }
            width = Math.max(width, child.right() - startX);
            height = Math.max(height, child.bottom() - startY);
        });
        box.setHeight(height + padding);
        if (box === thumbnail) {
            box.setWidth(width + padding);
        } else {
            nextY += box.height() + verticalPadding;
        }
    }
    resizeBox(thumbnail);
    this.children.forEach(function (box) {
        if (box !== thumbnail) {
            resizeBox(box);
        }
    });
    this.setHeight(nextY - verticalPadding);
};

HelpScreenMorph.prototype.createThumbnail = function () {
    var box = new BoxMorph();
    box.color = new Color(214, 225, 235);
    box.borderColor = new Color(153, 156, 158);
    return box;
};

HelpScreenMorph.prototype.createBox = function (color) {
    var box = new BoxMorph();
    if (color === 'blue') {
        box.color = new Color(214, 225, 235);
        box.borderColor = new Color(153, 156, 158);
    } else { // gray is default
        box.color = new Color(133, 138, 140);
        box.borderColor = new Color(183, 186, 188);
    }
    return box;
};

HelpScreenMorph.prototype.createColumn = function () {
    var col = new AlignmentMorph('column', this.padding);
    col.alignment = 'left';
    col.padding = this.verticalPadding;
    return col;
};

HelpScreenMorph.prototype.createRow = function () {
    var row = new AlignmentMorph('row', this.padding);
    row.alignment = 'top';
    row.padding = this.padding;
    return row;
};

HelpScreenMorph.prototype.createParagraph = function (text, size, color, italic) {
    var text = new TextMorph(
        text, size, 'serif', false, italic, null, null, 'Baskerville'
    );
    text.color = color;
    return text;
};

HelpScreenMorph.prototype.createRichParagraph = function (text, size, color, italic) {
    var text = new RichTextMorph(
        text, size, 'serif', false, italic, null, null, 'Baskerville'
    );
    text.color = color;
    return text;
};

HelpScreenMorph.prototype.createScriptDiagram = function (
    script, annotations, menus, bubbles, defaultArrowColor
) {
    return new ScriptDiagramMorph(
        script, annotations, menus, bubbles, defaultArrowColor
    );
};

HelpScreenMorph.prototype.createImage = function (src, width, height) {
    var myself = this;
    this.imagesLoading += 1;
    return new ImageMorph(src, width, height, function () {
        myself.imageLoaded();
    });
};

HelpScreenMorph.prototype.imageLoaded = function () {
    this.imagesLoading -= 1;
    if (this.imagesLoading === 0) {
        this.loadCallback(this);
    }
}

HelpScreenMorph.prototype.createMenu = function (items, noEmptyOption) {
    var dict = {}, input = new InputSlotMorph(),
        morph, i, item, itemMorph, tempParent;
    items.forEach(function (item) {
        if (item.tag === 'line') {
            dict['~'] = null;
        } else if (item.tag === 'item') {
            if (item.contents === '§_dir') {
                // direction picker takes its color from its input's parent
                tempParent = new Morph();
                tempParent.setColor(
                    SpriteMorph.prototype.blockColor['motion']
                );
                tempParent.add(input);
            }
            dict[item.contents] = null;
        }
    });
    morph = input.menuFromDict(dict, noEmptyOption);
    morph.drawNew();
    for (i = 0; i < items.length; i++) {
        item = items[i];
        itemMorph = morph.children[noEmptyOption ? i : i + 1];
        if (item.attributes.color) {
            itemMorph.setColor(item.attributes.color);
        }
        if (item.attributes.annotation) {
            itemMorph.annotationID = item.attributes.annotation;
        }
    }
    return morph;
};

// SnapSerializer ///////////////////////////////////////////////////////////

SnapSerializer.prototype.loadHelpScreen = function (xmlString, callback) {
    // public - answer the HelpScreenMorph represented by xmlString
    var myself = this,
        model = this.parse(xmlString),
        screen = new HelpScreenMorph(callback),
        padding = HelpScreenMorph.prototype.padding
        target = new SpriteMorph();

    this.project.stage = new StageMorph();
    target.globalBlocks = this.project.stage.globalBlocks;

    if (+model.attributes.version > this.version) {
        throw 'Module uses newer version of Serializer';
    }
    model.children.forEach(function (child) {
        if (child.tag === 'thumbnail') {
            screen.thumbnail = myself.loadHelpScreenElement(
                model.require('thumbnail'), screen, target, 'black'
            );
        } else if (child.tag === 'blocks') {
            myself.loadCustomBlocks(target, child, true);
            myself.populateCustomBlocks(target, child, true);
        } else {
            var morph = myself.loadHelpScreenElement(
                child, screen, target,
                child.attributes.color === 'blue' ? 'black' : 'white'
            );
            if (morph) {
                screen.add(morph);
            }
        }
    });

    function fixWidths (morph) {
        var parent = morph.parent;
        if (morph instanceof BoxMorph) {
            morph.setWidth(parent.width() - padding);
        } else if (
            morph instanceof AlignmentMorph
            || morph instanceof ScriptDiagramMorph
            || morph instanceof TextMorph
        ) {
            if (parent instanceof BoxMorph) {
                morph.silentSetWidth(parent.width() - 2 * padding);
            } else if (morph.relativeWidth) {
                morph.silentSetWidth(
                    morph.relativeWidth / parent.relWidthDenominator
                    * (parent.width() - parent.usedWidth)
                );
            } else {
                morph.silentSetWidth(parent.width());
            }
        }
        if (morph instanceof AlignmentMorph || morph instanceof BoxMorph) {
            if (
                morph instanceof AlignmentMorph
                && morph.orientation === 'row'
            ) {
                // calculate the total known used width of row items
                morph.usedWidth = morph.padding * (morph.children.length - 1)
                    + morph.children.reduce(
                        function (width, child) {
                            if (
                                child instanceof AlignmentMorph
                                || child instanceof ScriptDiagramMorph
                                || child instanceof TextMorph
                            ) {
                                return width;
                            } else if (child instanceof BlockMorph) {
                                return width
                                    + child.stackFullBounds().width();
                            } else {
                                return width + child.width();
                            }
                        }, 0
                    );
                morph.relWidthDenominator = morph.children.reduce(
                    function (width, child) {
                        return width + (child.relativeWidth || 0)
                    }, 0
                );
            }
            morph.children.forEach(fixWidths);
        }
    }

    screen.children.forEach(fixWidths);
    screen.forAllChildren(function (child) {
        // Reflow text
        if (child instanceof TextMorph) {
            child.children.forEach(function (child) {
                if (typeof child.fixLayout === 'function') {
                    child.fixLayout();
                }
            });
            child.setExtent(child.extent());
        }
    });
    screen.add(screen.thumbnail);
    screen.forAllChildren(function (child) {
        if (
            child instanceof AlignmentMorph
            || child instanceof ScriptDiagramMorph
        ) {
            child.fixLayout();
        }
    });

    screen.fixLayout();

    if (screen.imagesLoading === 0) {
        callback(screen);
    }
};

SnapSerializer.prototype.loadHelpScreenElement = function (
    element, screen, target, textColor
) {
    var myself = this, morph, customBlock, script, textSize, italic;

    function processText(text) {
        return text.trim().split(/\s+/).join(' ') // collapse whitespace
                    .replace(/\s*\\n\s*/g, '\n'); // replace $br with \n
    }

    switch (element.tag) {
    case 'block-definition':
        customBlock = detect(target.globalBlocks, function (block) {
            return block.blockSpec() === element.attributes.s;
        });
        morph = new PrototypeHatBlockMorph(customBlock);
        morph.nextBlock(customBlock.body.expression);
        break;
    case 'bool':
        return element.contents === 'true';
    case 'box':
        morph = screen.createBox(element.attributes.color);
        break;
    case 'column':
        morph = screen.createColumn();
        break;
    case 'diagram':
        script = myself.loadHelpScreenElement(
            element.childNamed('block-definition')
            || element.childNamed('menu')
            || element.require('script'),
            screen, target, textColor
        );
        morph = screen.createScriptDiagram(
            script,
            element.childNamed('annotations')
                ? element.require('annotations').children.map(
                    function (child) {
                        var morph = myself.loadHelpScreenElement(
                            child, screen, target, textColor
                        );
                        morph.arrowReverse =
                            !!child.attributes['arrow-reverse'];
                        if (child.attributes['arrow-color']) {
                            morph.arrowColor =
                                child.attributes['arrow-color'];
                        }
                        return morph;
                    }
                ) : [],
            element.childNamed('menus')
                ? element.childNamed('menus').children.map(function (child) {
                    return myself.loadHelpScreenElement(
                        child, screen, target, textColor
                    );
                })
                : [],
            element.childNamed('bubbles')
                ? element.childNamed('bubbles').children.map(function (child) {
                    return myself.loadHelpScreenElement(
                        child, screen, target, textColor
                    );
                })
                : [],
            textColor
        );
        break;
    case 'img':
        morph = screen.createImage(
            element.attributes.src,
            +element.attributes.width,
            +element.attributes.height
        );
        break;
    case 'menu':
        morph = screen.createMenu(
            element.children,
            element.attributes['no-empty-option']
        );
        break;
    case 'p':
    case 'small-p':
    case 'i':
    case 'small-i':
        textSize = element.tag === 'small-p' || element.tag === 'small-i'
                        ? 14 : 18;
        italic = element.tag === 'i' || element.tag === 'small-i';
        if (element.children.length === 0) {
            morph = screen.createParagraph(
                processText(element.contents),
                textSize, element.attributes.color || textColor, italic
            );
        } else {
            morph = screen.createRichParagraph(null, textSize, textColor);
            morph.text = element.children.map(function (child) {
                return myself.loadHelpScreenElement(
                    child, screen, target,
                    element.attributes.color || textColor, italic
                );
            });
            morph.drawNew();
        }
        break;
    case 'row':
        morph = screen.createRow();
        break;
    case 'script':
        morph = this.loadScript(element, target);
        morph.fixBlockColor(null, true); // force zebra coloring
        break;
    case 'text':
        return processText(element.contents);
    case 'thumbnail':
        morph = screen.createThumbnail();
        break;
    }
    if (morph) {
        if (element.attributes['rel-width']) {
            // width will be adjusted later
            morph.relativeWidth = +element.attributes['rel-width'];
        }
        if (
            morph instanceof AlignmentMorph
            && element.attributes.padding
        ) {
            morph.padding = +element.attributes.padding;
        }
        if (element.attributes.x) {
            morph.shiftRight = +element.attributes.x;
        }
        if (element.attributes.y) {
            morph.shiftDown = +element.attributes.y;
        }
        if (
            !(morph instanceof RichTextMorph
            || morph instanceof ScriptDiagramMorph
            || morph instanceof BlockMorph)
        ) {
            // add children
            element.children.forEach(function (child) {
                var childMorph = myself.loadHelpScreenElement(
                    child, screen, target, textColor
                );
                if (childMorph) {
                    morph.add(childMorph);
                }
            });
        }
    }
    return morph;
};

SnapSerializer.prototype.handleAnnotations = function (model, morph) {
    if (model.attributes['annotation']) {
        morph.annotationID = model.attributes['annotation'];
    }
    if (model.attributes['menu']) {
        morph.annotationMenu = model.attributes['menu'];
    }
    if (model.attributes['arrow-start']) {
        morph.annotationArrowStart = model.attributes['arrow-start'];
    }
    if (model.attributes['arrow-end']) {
        morph.annotationArrowEnd = model.attributes['arrow-end'];
    }
    if (model.attributes['arrow-color']) {
        morph.annotationArrowColor = model.attributes['arrow-color'];
    }
    if (model.attributes['bubble']) {
        morph.annotationBubble = model.attributes['bubble'];
    }
    if (model.attributes['highlight']) {
        morph.annotationHighlight = true;
    }
};

SnapSerializer.prototype.loadBlockOld = SnapSerializer.prototype.loadBlock;
SnapSerializer.prototype.loadBlock = function (model, isReporter, object) {
    var block = this.loadBlockOld(model, isReporter, object),
        migration, migrationOffset = 0, inputs;
    this.handleAnnotations(model, block);
    if (model.tag === 'block' && model.attributes.s) {
        migration = SpriteMorph.prototype.blockMigrations[
            model.attributes.s
        ];
        if (migration) {
            migrationOffset = migration.offset;
        }
    }
    inputs = block.inputs();
    model.children.forEach(function (child, i) {
        if (!contains(['variables', 'comment', 'receiver'], child.tag)) {
            this.handleAnnotations(child, inputs[i + migrationOffset]);
        }
    }, this);
    return block;
};

// ImageMorph ///////////////////////////////////////////////////////////////

ImageMorph.prototype = new Morph();
ImageMorph.prototype.constructor = ImageMorph;
ImageMorph.uber = Morph.prototype;

function ImageMorph(src, width, height, onload) {
    this.init(src, width, height, onload);
}

ImageMorph.prototype.init = function (src, width, height, onload) {
    var myself = this;

    // initialize inherited properties:
    HelpScreenMorph.uber.init.call(this);

    this.setExtent(new Point(width, height));
    this.pic = new Image();
    this.pic.onload = function () {
        myself.drawNew();
        myself.changed();
        if (typeof onload === 'function') {
            onload();
        }
    };
    this.pic.src = 'help/' + SnapTranslator.language + '/' + src
                    + '?t=' + Date.now();
};

ImageMorph.prototype.drawNew = function () {
    var ctx;
    this.image = newCanvas(this.extent());
    ctx = this.image.getContext('2d');
    if (this.pic) {
        ctx.drawImage(this.pic, 0, 0, this.width(), this.height());
    }
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
            for (i = 0; i < paragraphs.length; i++) {
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

    // don't bother with drawing shadow

    // now draw the actual text
    offx = Math.abs(Math.min(this.shadowOffset.x, 0));
    offy = Math.abs(Math.min(this.shadowOffset.y, 0));
    context.fillStyle = this.color.toString();

    y = 0;
    for (i = 0; i < this.lines.length; i++) {
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

// ScriptDiagramMorph ///////////////////////////////////////////////////

// ScriptDiagramMorph inherits from FrameMorph:

ScriptDiagramMorph.prototype = new FrameMorph();
ScriptDiagramMorph.prototype.constructor = ScriptDiagramMorph;
ScriptDiagramMorph.uber = FrameMorph.prototype;

// ScriptDiagramMorph layout settings:

ScriptDiagramMorph.prototype.margin = 30;
ScriptDiagramMorph.prototype.padding = 5;

// ScriptDiagramMorph instance creation:

function ScriptDiagramMorph(
    script,
    annotation,
    menus,
    bubbles,
    defaultArrowColor
) {
    this.init(
        script,
        annotation,
        menus,
        bubbles,
        defaultArrowColor
    );
}

ScriptDiagramMorph.prototype.init = function (
    script,
    annotations,
    menus,
    bubbles,
    defaultArrowColor
) {
    var myself = this;

    // additional properties:
    this.script = script;
    this.annotations = annotations || [];
    this.menus = menus || [];
    this.bubbles = bubbles || [];
    this.defaultArrowColor = defaultArrowColor;
    this.arrows = [];

    // initialize inherited properties:
    ScriptDiagramMorph.uber.init.call(this);

    this.add(this.script);
    this.annotations.forEach(function (annotation) {
        myself.add(annotation);
    });
    this.menus.forEach(function (menu) {
        myself.add(menu);
    });
};

ScriptDiagramMorph.prototype.drawNew = function () {
    this.image = newCanvas(new Point(1, 1));
};

ScriptDiagramMorph.prototype.fixLayout = function () {
    var myself = this,
        i, scriptWidth, diagramHeight, menu, bubbleValue, bubble, annotation,
        annotated, annotationWidth, annotationX, annotationMinY,  lineHeight,
        arrow, arrowStart, arrowEnd, arrowStartMorph, arrowEndMorph;

    if (this.script instanceof BlockMorph) {
        scriptWidth = this.script.stackFullBounds().width();
        diagramHeight = this.script.stackFullBounds().height();
    } else {
        scriptWidth = this.script.width();
        diagramHeight = this.script.height();
    }

    this.arrows.forEach(function (arrow) {
        myself.remove(arrow);
    });
    this.arrows = [];

    for (i = 1; i <= this.bubbles.length; i++) {
        bubbleValue = this.bubbles[i - 1];
        annotated = this.getAnnotatedMorph('annotationBubble', i);
        if (annotated) {
            bubble = annotated.showBubble(
                bubbleValue, false, new SpriteMorph(), true
            );
            this.add(bubble);
            bubble.setTop(this.top());
            bubble.setLeft(this.script.right() + 2);
            this.script.setTop(bubble.bottom());
            diagramHeight = Math.max(
                diagramHeight,
                this.script.bottom() - this.top()
            );
        }
    }

    for (i = 1; i <= this.menus.length; i++) {
        menu = this.menus[i - 1];
        annotated = this.getAnnotatedMorph('annotationMenu', i);
        if (annotated) {
            menu.setPosition(
                annotated.rightCenter().add(new Point(-10, 5))
            );
            scriptWidth = Math.max(
                scriptWidth,
                menu.right() - this.left()
            );
            diagramHeight = Math.max(
                diagramHeight,
                menu.bottom() - this.top()
            );
        }
    }

    annotationX = this.left() + scriptWidth + this.margin;
    annotationMinY = this.top();
    annotationWidth = this.right() - annotationX;
    for (i = 1; i <= this.annotations.length; i++) {
        annotation = this.annotations[i - 1];
        annotated = this.getAnnotatedMorph('annotationID', i);
        if (annotated) {
            if (
                annotated instanceof CommandBlockMorph
                || annotated instanceof MenuItemMorph
                || annotated === annotated.topBlock()
            ) {
                arrowEnd = new Point(
                    annotated.right() + this.padding,
                    annotated.parts
                        // use y of center of label
                        ? annotated.parts()[0].center().y
                        : annotated.center().y
                );
            } else if (i === 1) {
                arrowEnd = new Point(
                    annotated.right(),
                    annotated.center().y
                );
            } else {
                arrowEnd = annotated.bottomCenter();
            }

            if (annotation instanceof TextMorph) {
                annotation.setWidth(annotationWidth);
            }

            if (annotation instanceof RichTextMorph) {
                lineHeight = annotation.calculateLineHeight(annotation.lines[0]);
            } else if (annotation instanceof TextMorph) {
                lineHeight = fontHeight(annotation.fontSize);
            } else {
                lineHeight = annotation.height();
            }

            annotation.setPosition(new Point(
                annotationX,
                Math.max(
                    annotationMinY,
                    arrowEnd.y - lineHeight / 2
                )
            ));
            annotationMinY = annotation.bottom();

            arrowStart = new Point(
                annotation.left() - this.padding,
                annotation.top() + lineHeight / 2
            );
            if (Math.abs(arrowStart.y  - arrowEnd.y) <= 5) {
                arrowEnd.y = arrowStart.y;
            }

            arrow = new DiagramArrowMorph(
                arrowStart, arrowEnd, annotation.arrowReverse
            );
            arrow.color = annotation.arrowColor || this.defaultArrowColor;
            arrow.drawNew();
            this.arrows.push(arrow);
            this.add(arrow);
        }
    }

    i = 1;
    while (true) {
        arrowStartMorph = this.getAnnotatedMorph('annotationArrowStart', i);
        if (!arrowStartMorph) {
            break;
        }
        arrowStart = arrowStartMorph.center();
        arrowEndMorph = this.getAnnotatedMorph('annotationArrowEnd', i);
        arrowEnd = arrowEndMorph.center();
        arrow = new DiagramArrowMorph(arrowStart, arrowEnd, false);
        arrow.color = arrowStartMorph.annotationArrowColor
                        || this.defaultArrowColor;
        arrow.drawNew();
        this.arrows.push(arrow);
        this.add(arrow);
        i += 1;
    }

    this.script.forAllChildren(function (child) {
        if (child.annotationHighlight) {
            child.addHighlight();
        }
    });

    diagramHeight = Math.max(diagramHeight, annotationMinY);
    this.setHeight(diagramHeight);
};

ScriptDiagramMorph.prototype.getAnnotatedMorph = function (attribute, id) {
    function check (morph) {
        var i, result, ids, attrValue = morph[attribute];
        if (attrValue) {
            ids = attrValue.split(',').map(function (n) {
                return +n;
            });
            if (contains(ids, id)) {
                return morph;
            }
        }
        for (i = 0; i < morph.children.length; i++) {
            result = check(morph.children[i]);
            if (result) {
                return result;
            }
        }
        return null;
    }
    return check(this);
};

// DiagramArrowMorph ////////////////////////////////////////////////////

// DiagramArrowMorph inherits from FrameMorph:

DiagramArrowMorph.prototype = new Morph();
DiagramArrowMorph.prototype.constructor = DiagramArrowMorph;
DiagramArrowMorph.uber = Morph.prototype;

DiagramArrowMorph.prototype.padding = 5;

function DiagramArrowMorph(start, end, reverse) {
    this.init(start, end, reverse);
}

DiagramArrowMorph.prototype.init = function (start, end, reverse) {
    // additional properties:
    this.start = start;
    this.end = end;
    this.reverse = reverse;

    // initialize inherited properties:
    DiagramArrowMorph.uber.init.call(this);
};

DiagramArrowMorph.prototype.drawNew = function () {
    var start, end, oldStart, ctx, theta, r;

    this.silentSetExtent(
        this.end.subtract(this.start).abs().add(this.padding * 2)
    );
    this.setPosition(
        this.start.min(this.end)
            .subtract(DiagramArrowMorph.prototype.padding)
    );

    start = new Point(
        this.start.x < this.end.x
            ? this.padding
            : this.width() - this.padding,
        this.start.y < this.end.y
            ? this.padding
            : this.height() - this.padding
    );
    end = new Point(
        this.start.x < this.end.x
            ? this.width() - this.padding
            : this.padding,
        this.start.y < this.end.y
            ? this.height() - this.padding
            : this.padding
    );
    if (this.reverse) {
        oldStart = start;
        start = end;
        end = oldStart;
    }

    r = 5; // arrow head size
    theta = end.subtract(start).theta();
    end = end.subtract(new Point (
        r * Math.cos(theta), r * Math.sin(theta)
    ));

    this.image = newCanvas(this.extent());
    ctx = this.image.getContext('2d');
    ctx.strokeStyle = ctx.fillStyle = this.color.toString();

    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(
        end.x + r * Math.cos(theta),
        end.y + r * Math.sin(theta),
    );
    theta += 2/3 * Math.PI;
    ctx.lineTo(
        end.x + r * Math.cos(theta),
        end.y + r * Math.sin(theta),
    );
    theta += 2/3 * Math.PI;
    ctx.lineTo(
        end.x + r * Math.cos(theta),
        end.y + r * Math.sin(theta),
    );
    ctx.closePath();
    ctx.fill();
};

// BlockMorph ///////////////////////////////////////////////////////////

BlockMorph.prototype.addHighlight = function (oldHighlight) {
    var isHidden = !this.isVisible,
        oldUseBlurredShadows = useBlurredShadows,
        highlight;

    if (isHidden) {this.show(); }
    useBlurredShadows = false;
    highlight = this.highlight(
        oldHighlight ? oldHighlight.color : new Color(0, 255, 0),
        10,
        2
    );
    useBlurredShadows = oldUseBlurredShadows;
    this.addBack(highlight);
    this.fullChanged();
    if (isHidden) {this.hide(); }
    return highlight;
};

// ArgMorph /////////////////////////////////////////////////////////////

ArgMorph.prototype.addHighlight = BlockMorph.prototype.addHighlight;
ArgMorph.prototype.removeHighlight = BlockMorph.prototype.removeHighlight;
ArgMorph.prototype.toggleHighlight = ArgMorph.prototype.toggleHighlight;
ArgMorph.prototype.highlight = BlockMorph.prototype.highlight;
ArgMorph.prototype.highlightImage = BlockMorph.prototype.highlightImage;
ArgMorph.prototype.highlightImageBlurred =
    BlockMorph.prototype.highlightImageBlurred;
ArgMorph.prototype.getHighlight = BlockMorph.prototype.getHighlight;
