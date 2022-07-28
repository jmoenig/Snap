var prefix = 'ftx_';

SnapExtensions.primitives.set(
    prefix+'say(data, size, maxWidth, color)',
    (data, size, maxWidth, color, proc) => {
        makeFancyBubble(data, false, false, proc, size, maxWidth, color);
    }
)

SnapExtensions.primitives.set(
    prefix+'think(data, size, maxWidth, color)',
    (data, size, maxWidth, color, proc) => {
        makeFancyBubble(data, true, false, proc, size, maxWidth, color);
    }
)

function makeFancyBubble(data, isThought, isQuestion, proc, size, maxWidth, color) {
    const sprite = proc.receiver;
    const stage = sprite.parentThatIsA(StageMorph);

    if(!/rgba?\(\d{1,3}\,\d{1,3},\d{1,3},?\d?\.?\d*\)/.test(color) && !!color){
        throw new Error("Color must be in the format rgb(0,0,0) or rgba(0,0,0,1)");
    }

    color = Color.fromString(color);

    sprite.stopTalking();
    if (data === '' || isNil(data)) {return; }
    const bubble = new FancySpriteBubbleMorph(
        data,
        stage,
        isThought,
        isQuestion,
        size,
        maxWidth,
        color
    );

    sprite.add(bubble);
    sprite.positionTalkBubble();
}

FancyTextMorph.prototype = new TextMorph();
FancyTextMorph.prototype.constructor = FancyTextMorph;
FancyTextMorph.uber = TextMorph.prototype;

function FancyTextMorph(
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

FancyTextMorph.prototype.processLine = function(line, ctx, cb) {

    const processChar = (char) => {
        ctx.font = this.font();
        cb(char, ctx);
    }

    let escape = false;

    const originalBold = this.isBold,
        originalItalic = this.isItalic;

    line.split('').forEach((char) => {
        switch (char) {
            case '\\':
                if(escape) {
                    processChar(char);
                    escape = false;
                }
                else {
                    escape = true;
                }
                break;
            case '*':
                if(escape) {
                    processChar(char);
                    escape = false;
                }
                else {
                    this.isBold = !this.isBold;
                }
                break;
            case '_':
                if(escape) {
                    processChar(char);
                    escape = false;
                }
                else {
                    this.isItalic = !this.isItalic;
                }
                break;
            default:
                processChar(char);
        }
    });

    this.isBold = originalBold;
    this.isItalic = originalItalic;
}

FancyTextMorph.prototype.lineWidth = function(ctx, line) {
    let width = 0;
    this.processLine(line, ctx, char => width += ctx.measureText(char).width);
    return width;
}

FancyTextMorph.prototype.fillLine = function(ctx, line, x, y) {
    this.processLine(line, ctx, char => {
        ctx.fillText(char, x , y );
        x += ctx.measureText(char).width;
    })
}

FancyTextMorph.prototype.render = function (ctx) {
    var shadowWidth = Math.abs(this.shadowOffset.x),
        shadowHeight = Math.abs(this.shadowOffset.y),
        shadowColor = this.getShadowRenderColor(),
        i, line, width, offx, offy, x, y, start, stop, p, c;

    // prepare context for drawing text
    ctx.font = this.font();
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';

    // fill the background, if desired
    if (this.backgroundColor) {
        ctx.fillStyle = this.backgroundColor.toString();
        ctx.fillRect(0, 0, this.width(), this.height());
    }

    // draw the shadow, if any
    if (shadowColor) {
        offx = Math.max(this.shadowOffset.x, 0);
        offy = Math.max(this.shadowOffset.y, 0);
        ctx.fillStyle = shadowColor.toString();

        for (i = 0; i < this.lines.length; i = i + 1) {
            line = this.lines[i];
            width = this.lineWidth(ctx, line) + shadowWidth;
            if (this.alignment === 'right') {
                x = this.width() - width;
            } else if (this.alignment === 'center') {
                x = (this.width() - width) / 2;
            } else { // 'left'
                x = 0;
            }
            y = (i + 1) * (fontHeight(this.fontSize) + shadowHeight)
                - shadowHeight;
            this.fillLine(ctx, line, x + offx, y + offy);
        }
    }

    // now draw the actual text
    offx = Math.abs(Math.min(this.shadowOffset.x, 0));
    offy = Math.abs(Math.min(this.shadowOffset.y, 0));
    ctx.fillStyle = this.getRenderColor().toString();

    for (i = 0; i < this.lines.length; i = i + 1) {
        line = this.lines[i];
        width = this.lineWidth(ctx, line) + shadowWidth;
        if (this.alignment === 'right') {
            x = this.width() - width;
        } else if (this.alignment === 'center') {
            x = (this.width() - width) / 2;
        } else { // 'left'
            x = 0;
        }
        y = (i + 1) * (fontHeight(this.fontSize) + shadowHeight) - shadowHeight;
        this.fillLine(ctx, line, x + offx, y + offy);


    }

    // draw the selection
    start = Math.min(this.startMark, this.endMark);
    stop = Math.max(this.startMark, this.endMark);
    for (i = start; i < stop; i += 1) {
        p = this.slotPosition(i).subtract(this.position());
        c = this.text.charAt(i);
        ctx.fillStyle = this.markedBackgoundColor.toString();
        ctx.fillRect(p.x, p.y, ctx.measureText(c).width + 1,
            fontHeight(this.fontSize));
        ctx.fillStyle = this.markedTextColor.toString();
        ctx.fillText(c, p.x, p.y + fontHeight(this.fontSize));
    }
};

function FancySpriteBubbleMorph(data, stage, isThought, isQuestion, size, maxWidth, color) {
        this.init(data, stage, isThought, isQuestion, size, maxWidth, color);
}

FancySpriteBubbleMorph.prototype = new SpriteBubbleMorph('');
FancySpriteBubbleMorph.prototype.constructor = FancySpriteBubbleMorph;
FancySpriteBubbleMorph.uber = SpriteBubbleMorph.prototype;

FancySpriteBubbleMorph.prototype.init = function(data, stage, isThought, isQuestion, size, maxWidth, color){
    maxWidth = parseInt(maxWidth);
    if(maxWidth !== 0 && !maxWidth){
        maxWidth = SpriteMorph.prototype.bubbleMaxTextWidth;
    }
    this.maxWidth = maxWidth;
    this.size = size || SpriteMorph.prototype.bubbleFontSize;
    this.textColor = color || new Color();

    FancySpriteBubbleMorph.uber.init.call(this, data, stage, isThought, isQuestion);
}

FancySpriteBubbleMorph.prototype.dataAsMorph = function(data) {
    var contents,
        sprite = SpriteMorph.prototype,
        isText,
        img,
        scaledImg,
        width;

    // everything here comes directly from SpriteBubbleMorph.prototype.dataAsMorph,
    // EXCEPT that we're creating a FancyTextMorph
    if (isString(data)) {
        isText = true;
        contents = new FancyTextMorph(
            data,
            this.size * this.scale,
            null, // fontStyle
            false,
            false, // italic
            'center',
        );

        contents.setColor(this.textColor);

        // support exporting text / numbers directly from speech balloons:
        contents.userMenu = function () {
            var menu = new MenuMorph(this),
                ide = this.parentThatIsA(IDE_Morph)||
                    this.world().childThatIsA(IDE_Morph);

            if (ide.isAppMode) {return; }
            menu.addItem(
                'export',
                () => ide.saveFileAs(
                    data,
                    'text/plain;charset=utf-8',
                    localize('data')
                )
            );
            return menu;
        };

        // reflow text boundaries
        width = Math.max(
            contents.width(),
            sprite.bubbleCorner * 2 * this.scale
        );
        if (isText) {
            width = Math.min(width, this.maxWidth * this.scale);
        }
        contents.setWidth(width);

        return contents;
    }

    return FancySpriteBubbleMorph.uber.dataAsMorph.call(this, data);
}