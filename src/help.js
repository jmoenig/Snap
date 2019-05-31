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
    if (this.screen) {
        this.screen.fixLayout();
    }
    if (this.body) {
        // hack - scroll bars don't properly update without this
        this.body.setExtent(this.body.extent());
    }
};

// HelpScreenMorph //////////////////////////////////////////////////////

// HelpScreenMorph inherits from FrameMorph:

HelpScreenMorph.prototype = new FrameMorph();
HelpScreenMorph.prototype.constructor = HelpScreenMorph;
HelpScreenMorph.uber = FrameMorph.prototype;

// HelpScreenMorph layout settings:

HelpScreenMorph.prototype.padding = 15;

// HelpScreenMorph instance creation:

function HelpScreenMorph() {
    this.init();
}

HelpScreenMorph.prototype.init = function () {
    // additional properties:
    this.thumbnail = null;

    // initialize inherited properties:
    HelpScreenMorph.uber.init.call(this);
    this.setWidth(572);
};

HelpScreenMorph.prototype.fixLayout = function () {
    var padding = this.padding, nextY = padding,
        thumbnail = this.thumbnail;
    function resizeBox (box) {
        var startX, startY, width = 0, height = 0;
        if (box !== thumbnail) {
            box.moveBy(new Point(padding, nextY));
        }
        startX = box.left();
        startY = box.top();
        box.children.forEach(function (child) {
            child.moveBy(padding);
            if (box !== thumbnail) {
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
            nextY += box.height() + padding;
        }
    }
    resizeBox(thumbnail);
    this.children.forEach(function (box) {
        if (box !== thumbnail) {
            resizeBox(box);
        }
    });
};

HelpScreenMorph.prototype.createThumbnail = function () {
    var box = new BoxMorph();
    box.color = new Color(214, 225, 235);
    box.borderColor = new Color(153, 156, 158);
    return box;
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

HelpScreenMorph.prototype.createScriptDiagram = function (script, annotations) {
    return new ScriptDiagramMorph(script, annotations);
};

HelpScreenMorph.prototype.createImage = function (src, width, height) {
    var morph = new Morph();
    morph.setExtent(new Point(width, height));
    morph.pic = new Image();
    morph.pic.onload = function () {
        morph.drawNew = function () {
            var ctx;
            this.image = newCanvas(this.extent());
            ctx = this.image.getContext('2d');
            ctx.drawImage(this.pic, 0, 0, this.width(), this.height());
        };
        morph.drawNew();
        morph.changed();
    };
    morph.pic.src = 'help/' + src;
    return morph;
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

    // draw the shadow, if any
    if (this.shadowColor) {
        offx = Math.max(this.shadowOffset.x, 0);
        offy = Math.max(this.shadowOffset.y, 0);
        context.fillStyle = this.shadowColor.toString();

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

ScriptDiagramMorph.prototype.margin = 50;
ScriptDiagramMorph.prototype.padding = 5;

// ScriptDiagramMorph instance creation:

function ScriptDiagramMorph(script, annotation) {
    this.init(script, annotation);
}

ScriptDiagramMorph.prototype.init = function (script, annotations) {
    var myself = this;

    // additional properties:
    this.script = script;

    annotations = annotations || [];
    this.annotations = new AlignmentMorph('column', this.padding);
    this.annotations.alignment = 'left';
    annotations.forEach(function (annotation) {
        myself.annotations.add(annotation);
    });

    this.arrows = [];

    // initialize inherited properties:
    ScriptDiagramMorph.uber.init.call(this);

    this.add(this.script);
    this.add(this.annotations);
};

ScriptDiagramMorph.prototype.drawNew = function () {
    this.image = newCanvas(new Point(1, 1));
};

ScriptDiagramMorph.prototype.fixLayout = function () {
    var myself = this,
        i, startPoint, endPoint, annotation, annotated, arrow;

    this.arrows.forEach(function (arrow) {
        myself.remove(arrow);
    });
    this.arrows = [];

    this.annotations.setLeft(
        this.script.stackFullBounds().right() + this.margin
    );
    var annotationsWidth = this.right() - this.annotations.left();
    this.annotations.setWidth(annotationsWidth);
    this.annotations.children.forEach(function (annotation) {
        annotation.setWidth(annotationsWidth);
    });
    for (i = 1; i <= this.annotations.children.length; i = i + 1) {
        annotation = this.annotations.children[i - 1];
        annotated = this.getAnnotatedMorph(i);
        if (annotated) {
            startPoint = new Point(
                annotation.left() - this.padding,
                annotation.center().y
            );
            if (i === 1) {
                endPoint = annotated.rightCenter()
                    .add(new Point(this.padding, 0));
                if (Math.abs(annotation.center().y  - endPoint.y) <= 5) {
                    endPoint.y = annotation.center().y;
                }
            } else {
                endPoint = annotated.bottomCenter();
            }
            arrow = new DiagramArrowMorph(startPoint, endPoint);
            // TODO: implement arrows other than bottom-right to top-left
            arrow.setPosition(
                endPoint.subtract(DiagramArrowMorph.prototype.padding)
            );
            this.arrows.push(arrow);
            this.add(arrow);
        }
    }
    this.setHeight(Math.max(
        this.script.stackFullBounds().height(),
        this.annotations.height()
    ));
};

ScriptDiagramMorph.prototype.getAnnotatedMorph = function (id) {
    function check (morph) {
        var i, result;
        if (morph.annotation === id) {
            return morph;
        }
        for (i = 0; i < morph.children.length; i++) {
            result = check(morph.children[i]);
            if (result) {
                return result;
            }
        }
        return null;
    }
    return check(this.script);
};

// DiagramArrowMorph ////////////////////////////////////////////////////

// DiagramArrowMorph inherits from FrameMorph:

DiagramArrowMorph.prototype = new Morph();
DiagramArrowMorph.prototype.constructor = DiagramArrowMorph;
DiagramArrowMorph.uber = Morph.prototype;

DiagramArrowMorph.prototype.padding = 5;

function DiagramArrowMorph(start, end) {
    this.init(start, end);
}

DiagramArrowMorph.prototype.init = function (start, end) {
    // additional properties:
    this.start = start;
    this.end = end;

    // initialize inherited properties:
    DiagramArrowMorph.uber.init.call(this);
};

DiagramArrowMorph.prototype.drawNew = function () {
    var start, end, ctx, theta, r;

    this.silentSetExtent(
        this.end.subtract(this.start).abs().add(this.padding * 2)
    );

    // TODO: implement arrows other than bottom-right to top-left
    start = new Point(
        this.width() - this.padding,
        this.height() - this.padding
    );
    end = new Point(this.padding, this.padding);
    r = 5; // arrow head size
    theta = end.subtract(start).theta();
    end = end.subtract(new Point (
        r * Math.cos(theta), r * Math.sin(theta)
    ));

    this.image = newCanvas(this.extent());
    ctx = this.image.getContext('2d');
    ctx.strokeStyle = ctx.fillStyle = '#bb0000';

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
