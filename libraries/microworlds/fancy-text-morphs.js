// Update 2025-11-17 (jens - automatic vertical scrolling in fancy text bubbles)

/*global SnapExtensions, StageMorph, Color, isNil, SpriteMorph, Point,
TextMorph, fontHeight, SpriteBubbleMorph, isString, MenuMorph, IDE_Morph,
localize, ScrollFrameMorph, Costume, newCanvas, radians*/

/*jshint esversion: 11*/

var prefix = 'ftx_';

SnapExtensions.primitives.set(
    prefix+'say(data, size, maxWidth, color)',
    function (data, size, maxWidth, color, proc) {
        makeFancyBubble(this, data, false, false, proc, size, maxWidth, color);
    }
);

SnapExtensions.primitives.set(
    prefix+'say(data, size, maxWidth, color, anchor)',
    function (data, size, maxWidth, color, anchor, maxHeight, proc) {
        makeFancyBubble(this, data, false, false, proc, size, maxWidth, color, anchor, maxHeight);
    }
);

SnapExtensions.primitives.set(
    prefix+'think(data, size, maxWidth, color)',
    function (data, size, maxWidth, color, proc) {
        makeFancyBubble(this, data, true, false, proc, size, maxWidth, color);
    }
);

SnapExtensions.primitives.set(
    prefix+'think(data, size, maxWidth, color, anchor)',
    function (data, size, maxWidth, color, anchor, maxHeight, proc) {
        makeFancyBubble(this, data, true, false, proc, size, maxWidth, color, anchor, maxHeight);
    }
);

SnapExtensions.primitives.set(
    prefix+'costume(data, size, maxWidth, color, align, font)',
    function (data, size, maxWidth, color, align, font, proc) {
        validateColor(color);
        return new FancyTextCostume(data, size, maxWidth, color, align, font);
    }

);

SnapExtensions.primitives.set(
    prefix+'remove_formatting_characters(text)',
    function (text) {

        function remove(t) {
            return t.replace(/(\*[^\*]*\*)|(\_[^\_]*\_)/g, match => match.slice(1, -1));
        }

        function removeCharacters(t) {
            if(t === remove(t)) {
                return t;
            }

            return removeCharacters(remove(t));
        }

        return removeCharacters(text);

    }
);

function validateColor(color) {
    if(!/rgba?\(\d{1,3}\,\d{1,3},\d{1,3},?\d?\.?\d*\)/.test(color) && !!color){
        throw new Error("Color must be in the format rgb(0,0,0) or rgba(0,0,0,1)");
    }
}

function makeFancyBubble (sprite, data, isThought, isQuestion, proc, size, maxWidth, color, anchor, maxHeight) {
    const stage = sprite.parentThatIsA(StageMorph);

    validateColor(color);

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
        color,
        anchor,
        maxHeight
    );

    sprite.add(bubble);
    sprite.positionTalkBubble();
}

if(!SpriteMorph.prototype.oldPositionTalkBubble) {
    SpriteMorph.prototype.oldPositionTalkBubble = SpriteMorph.prototype.positionTalkBubble;
    SpriteMorph.prototype.positionTalkBubble = function() {

        if(!(this.talkBubble() instanceof FancySpriteBubbleMorph)) {
            return SpriteMorph.prototype.oldPositionTalkBubble.call(this);
        }

        var stage = this.parentThatIsA(StageMorph),
            stageScale = stage ? stage.scale : 1,
            bubble = this.talkBubble(),
            top = this.top(),
            bottom = this.bottom(),
            anchor = bubble.anchor,
            vAnchor = anchor.split(" ")[0],
            hAnchor = anchor.split(" ")[1];


        if (!bubble) {return null; }
        bubble.show();

        bubble.isPointingRight = hAnchor === 'right';
        bubble.fixLayout();
        bubble.rerender();

        var yMultiply = vAnchor === 'top' ? 1 : -1;
        var xMultiply = hAnchor === 'right' ? -1 : 1;

        var step = this.extent().divideBy(10)
            .max(new Point(5, 5).scaleBy(stageScale))
            .multiplyBy(new Point(xMultiply, yMultiply));

        if(hAnchor === 'right' ) {
            bubble.setLeft(this.right());
        }
        else {
            bubble.setRight(this.left());
        }

        bubble.setBottom(vAnchor === 'top' ? this.top() : this.bottom());

        while (vAnchor === 'top' && !this.isTouching(bubble) && bubble.bottom() < bottom) {
            bubble.moveBy(step);
        }
        while (vAnchor === 'bottom' && !this.isTouching(bubble) && bubble.top() > top) {
            bubble.moveBy(step);
        }

        var multiplier = new Point(1,1);

        if(anchor === 'top left' || anchor === 'bottom right') {
            multiplier = new Point(-1, -1);
        }

        bubble.moveBy(step.mirror().multiplyBy(multiplier));

        if (!stage) {return null; }
        if (bubble.right() > stage.right()) {
            bubble.isPointingRight = false;
            bubble.fixLayout();
            bubble.rerender();
            bubble.setRight(this.center().x);
        }

        if (bubble.left() < stage.left()) {
            bubble.isPointingRight = true;
            bubble.fixLayout();
            bubble.rerender();
            bubble.setLeft(this.center().x);
        }
        bubble.keepWithin(stage);
    };

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

FancyTextMorph.prototype.init = function (
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
    this.parsingFraction = false;
    FancyTextMorph.uber.init.call(
        this,
        text,
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

FancyTextMorph.prototype.fixLayout = function () {
    // determine my extent depending on my current settings
    var height, shadowHeight, shadowWidth;

    this.parse();

    // set my extent
    shadowWidth = Math.abs(this.shadowOffset.x);
    shadowHeight = Math.abs(this.shadowOffset.y);

    height = (this.lines.length * shadowHeight) + this.totalTextHeight();

    if (this.maxWidth === 0) {
        this.bounds = this.bounds.origin.extent(
            new Point(this.maxLineWidth + shadowWidth, height)
        );
    } else {
        this.bounds = this.bounds.origin.extent(
            new Point(this.maxWidth + shadowWidth, height)
        );
    }

    // notify my parent of layout change
    if (this.parent) {
        if (this.parent.layoutChanged) {
            this.parent.layoutChanged();
        }
    }
};

FancyTextMorph.prototype.processLine = function(line, ctx, charCb = () => {}, fracCb = () => {}) {
    const processChar = (char) => {
        ctx.font = this.font();
        charCb(char, ctx);
    };

    const processFrac = (frac) => {
        fracCb(frac, ctx);
    };

    let escape = false;

    const originalBold = this.isBold,
        originalItalic = this.isItalic;

    function processIfEscaped(char, otherwise) {
        if(escape) {
            processChar(char);
            escape = false;
        }
        else {
            otherwise();
        }
    }
    let fractionString = "",
        fractionParentheses = 0;
    line.split('').forEach((char) => {

        if(this.parsingFraction){
            fractionString += char;
            if(char === '('){
                fractionParentheses++;
            }
            if(char === ')'){
                fractionParentheses--;
            }
            if(fractionParentheses === 0){
                this.parsingFraction = false;
                let fraction = FancyFraction.parse(fractionString);
                processFrac(fraction);
                fractionString = "";

            }
        }
        else {
            switch (char) {
                case '\\':
                    processIfEscaped(char, ()=> escape = true);
                    break;
                case '*':
                    processIfEscaped(char, () => this.isBold = !this.isBold);
                    break;
                case '_':
                    processIfEscaped(char, () => this.isItalic = !this.isItalic);
                    break;
                case '~':
                    processIfEscaped(char, () => {
                        this.parsingFraction = true;
                    });
                    break;
                default:
                    processChar(char);
            }
        }
    });

    this.isBold = originalBold;
    this.isItalic = originalItalic;
};

FancyTextMorph.prototype.lineWidth = function(ctx, line) {
    let width = 0;
    this.processLine(line, ctx,
        char => width += ctx.measureText(char).width,
        frac => width += this.measureFraction(frac).width
    );
    return width;
};

FancyTextMorph.prototype.lineHeight = function(line) {
    const fractions = FancyFraction.extract(line);

    let lineHeight = fontHeight(this.fontSize);

    fractions.forEach(fraction => {
        lineHeight = Math.max(lineHeight, this.measureFraction(fraction).height);
    });

    return lineHeight;
};

FancyTextMorph.prototype.totalTextHeight = function() {
    let height = 0;
    this.lines.forEach(line =>
        {
            height += this.lineHeight(line);
        }

    );

    height += fontHeight(this.fontSize) * 0.2;

    return height;
};

FancyTextMorph.prototype.fillLine = function(ctx, line, x, y) {
    const lineHeight = this.lineHeight(line);

    this.processLine(line, ctx, char => {
        ctx.fillText(char, x , y + ((lineHeight - this.fontSize) / 2) );
        x += ctx.measureText(char).width;
    }, frac => {
        const {width: fWidth, height: fHeight} = this.measureFraction(frac);
        this.drawFraction(frac, ctx, x, y + ((lineHeight - fHeight) / 2));
        x += fWidth;
    });
};

FancyTextMorph.prototype.drawFraction = function(fraction, ctx, x, y, totalWidth) {

    const width = this.fractionWidth(fraction),
        height = this.fractionHeight(fraction);

    x = x || 0;
    y = y || 0;
    totalWidth = totalWidth || width;

    const oldFont = ctx.font;

    ctx.font = FancyFraction.transformFont(this.font(), this.fontName, this.fontStyle);

    if(typeof fraction === 'number') {
        fraction = fraction.toString();
    }

    if(typeof fraction === 'string') {
        ctx.fillText(fraction, x, y);
        return;
    }

    if(Array.isArray(fraction) ) {

        fraction.forEach(
            each => {
                this.drawFraction(
                    each,
                    ctx,
                    x,
                    y + (height - this.fractionHeight(each)) / 2,
                    totalWidth
                );
                x += this.fractionWidth(each);
            }
        );
        return;
    }

    const num = fraction.numerator,
        den = fraction.denominator;



    this.drawFraction(
        num,
        ctx,
        x +
        (num.isFraction ?
                (totalWidth - this.fractionWidth(num)) / 2 :
                (width - this.fractionWidth(num)) / 2
        ),
        y,
        totalWidth
    );

    const oldLineWidth = ctx.lineWidth;
    ctx.lineWidth = FancyFraction.lineWidth(this.fontSize);
    y += this.fractionHeight(num) + ctx.lineWidth;

    const lineY = y - this.fontSize;

    ctx.beginPath();
    ctx.moveTo(x, lineY);
    ctx.lineTo(x + width, lineY);
    ctx.stroke();

    ctx.lineWidth = oldLineWidth;

    y += ctx.lineWidth;


    this.drawFraction(
        den,
        ctx,
        x +
        (den.isFraction ?
                (totalWidth - this.fractionWidth(den)) / 2 :
                (width - this.fractionWidth(den)) / 2
        ),
        y + ctx.lineWidth * 2,
        totalWidth
    );

    ctx.font = oldFont;

};

FancyTextMorph.prototype.fractionHeight = function(fraction) {
    const fontSize = this.fontSize,
        lineWidth = FancyFraction.lineWidth(fontSize);
    if(typeof fraction === 'number' || typeof fraction === 'string') {
        return parseFloat(fontSize);
    }

    if(Array.isArray(fraction)) {
        const reducer = (acc, each) => Math.max(acc, this.fractionHeight(each));
        return fraction.reduce(reducer, 0);
    }

    return this.fractionHeight(fraction.numerator) +
        this.fractionHeight(fraction.denominator) + lineWidth * 4;
};

FancyTextMorph.prototype.fractionWidth = function(fraction) {

    if(typeof fraction === 'number') {
        fraction = fraction.toString();
    }

    if(typeof fraction === 'string') {
        const ctx = document.createElement('canvas').getContext('2d');

        ctx.font = FancyFraction.transformFont(this.font(), this.fontName, this.fontStyle);
        ctx.textAlign = 'left';
        ctx.textBaseline = 'bottom';

        return ctx.measureText(fraction).width;
    }

    if(Array.isArray(fraction)) {
        const reducer = (acc, each) => acc + this.fractionWidth(each);
        return fraction.reduce(reducer, 0);
    }

    const num = fraction.numerator,
        den = fraction.denominator,
        fontSize = this.fontSize;
    let width = Math.max(
        this.fractionWidth(num),
        this.fractionWidth(den)
    );

    if(num.isFraction || den.isFraction){
        width += fontSize;
    }

    return width;

};

FancyTextMorph.prototype.measureFraction = function(fraction){
    return {
        width: this.fractionWidth(fraction),
        height: this.fractionHeight(fraction)
    };
};

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
        ctx.strokeStyle = shadowColor.toString();

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
    ctx.strokeStyle = this.color;

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

function FancySpriteBubbleMorph(data, stage, isThought, isQuestion, size, maxWidth, color, anchor, maxHeight) {
    this.init(data, stage, isThought, isQuestion, size, maxWidth, color, anchor, maxHeight);
}

FancySpriteBubbleMorph.prototype = new SpriteBubbleMorph('');
FancySpriteBubbleMorph.prototype.constructor = FancySpriteBubbleMorph;
FancySpriteBubbleMorph.uber = SpriteBubbleMorph.prototype;
FancySpriteBubbleMorph.prototype.init = function(data, stage, isThought, isQuestion, size, maxWidth, color, anchor, maxHeight){

    maxWidth = parseInt(maxWidth);

    if(!maxWidth){
        maxWidth = 0;
    }
    this.maxWidth = maxWidth;

    maxHeight = parseInt(maxHeight);
    if(!maxHeight){
        maxHeight = 0;
    }
    this.maxHeight = maxHeight;

    this.size = size || SpriteMorph.prototype.bubbleFontSize;
    this.textColor = color || new Color();
    this.anchor = anchor || 'top right';

    FancySpriteBubbleMorph.uber.init.call(this, data, stage, isThought, isQuestion);
};

FancySpriteBubbleMorph.prototype.dataAsMorph = function(data) {
    var contents,
        sprite = SpriteMorph.prototype,
        maxHeight = (this.maxHeight || this.stage?.dimensions?.y || 360) *
            this.scale - (this.border + this.padding + 1) * 2,
        isText,
        width,
        scroller;

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

        if (contents.height() > maxHeight) { // scroll
            scroller = new ScrollFrameMorph();
            scroller.acceptsDrops = false;
            scroller.contents.acceptsDrops = false;
            scroller.bounds.setWidth(contents.width());
            scroller.bounds.setHeight(maxHeight);
            scroller.addContents(contents);
            scroller.color = new Color(0, 0, 0, 0);

            // scroll to the bottom:
            /* // commented out for this case for now
            scroller.scrollY(scroller.bottom() - contents.bottom());
            scroller.adjustScrollBars();
            */

            contents = scroller;
        }

        return contents;
    }

    return FancySpriteBubbleMorph.uber.dataAsMorph.call(this, data);
};

function FancyFraction (numerator, denominator) {
    this.init(numerator, denominator);
}

FancyFraction.prototype.init = function (numerator, denominator) {
    this.numerator = numerator;
    this.denominator = denominator;
    this.isFraction = true;
};

FancyFraction.extract = function (aString) {
    var parsingFraction = false,
        fractionParentheses = 0,
        fractionString = "",
        fractionStrings = [];
    aString.split('').forEach(character => {
        if(parsingFraction){
            fractionString += character;
            if(character === '('){
                fractionParentheses++;
            }
            if(character === ')'){
                fractionParentheses--;
            }
            if(fractionParentheses === 0){
                parsingFraction = false;
                fractionStrings.push(fractionString);
                fractionString = "";

            }
        }
        else {
            if(character === '~'){
                parsingFraction = true;
            }
        }
    });

    var fractions = [];

    fractionStrings.forEach(fractionString => {
        fractions.push(FancyFraction.parse(fractionString));
    });

    return fractions;
};

FancyFraction.parse = function (aString) {
    // * All fractions need to be parenthesized
    // * All non-fractional parts of a numerator or denominator need to be
    //   enclosed by brackets and separated by commas
    // Ex: ([(2/3),+,([4,*,45]/123)]/15)

    return eval(
        aString.replace(
            /\(/gi,
            (match) => 'new FancyFraction' + match + ''
        ).replaceAll(
            '\/',
            ','
        ).replace(
            /[\+\-\*·]+/gi,
            (match) => "'" + match + "'"
        ).replaceAll(
            '*',
            '×'
        )
    );
};

FancyFraction.lineWidth = function(fontSize) {
    return Math.max(fontSize / 12, 1);
};

FancyFraction.fontName = 'Courier';
FancyFraction.fontStyle = 'monospace';

FancyFraction.transformFont = function(fontString, originalFontName, originalFontStyle) {
    let font = fontString.replace(originalFontName, FancyFraction.fontName);
    if(originalFontStyle) {
        font = font.replace(originalFontStyle, FancyFraction.fontStyle);
    }
    return font;
};

FancyTextCostume.prototype = new Costume();
FancyTextCostume.prototype.constructor = FancyTextCostume;
FancyTextCostume.uber = Costume.prototype;

function FancyTextCostume(data, size, maxWidth, color, align, font) {
    align = ['left','right','center'].includes(align) ? align : 'left';
    const textMorph = new FancyTextMorph(data,
        // this.size * this.scale,
        size,
        null, // fontStyle
        false,
        false, // italic
        align,
        parseInt(maxWidth),
        font

    );
    textMorph.setColor(color);

    textMorph.setCenter(textMorph.center().multiplyBy(2));

    this.textMorph = textMorph;


    this.size = size || SpriteMorph.prototype.bubbleFontSize;

    this.canvas = newCanvas();


    this.shapes = [];
    // this.shrinkToFit(this.maxExtent());
    this.name = data || null;

    let rotationCenter;

    switch(align) {
        case 'left':
            rotationCenter = new Point(0,0);
            break;
        case 'right':
            rotationCenter = new Point(this.width(), 0);
            break;
        default:
            rotationCenter = new Point(this.center().x, 0);
    }

    this.rotationCenter = rotationCenter;
    this.version = Date.now(); // for observer optimization
    this.loaded = null; // for de-serialization only
}

FancyTextMorph.prototype.toString = function() {
    return 'a FancyTextCostume(' + this.name + ')';
};

Object.defineProperty(FancyTextCostume.prototype, "contents", {
    get: function contents() {
        const textMorph = this.textMorph;
        const canvas = newCanvas(textMorph.bounds.corner.subtract(textMorph.bounds.origin), false, this.canvas);
        const ctx = canvas.getContext("2d");
        textMorph.render(ctx);
        return canvas;
    }
});

if(!SpriteMorph.prototype.oldRender) {
    SpriteMorph.prototype.oldRender = SpriteMorph.prototype.render;
}


SpriteMorph.prototype.render = function(ctx) {
    if(!this.costume?.hasOwnProperty('textMorph')) {
        SpriteMorph.prototype.oldRender.call(this, ctx);
        return;
    }
    var myself = this,
        facing, // actual costume heading based on my rotation style
        isFlipped,
        isLoadingCostume,
        cst,
        pic, // (flipped copy of) actual costume based on my rotation style
        stageScale,
        handle;

    isLoadingCostume = this.costume &&
        typeof this.costume.loaded === 'function';
    stageScale = this.parent instanceof StageMorph ?
        this.parent.scale : 1;
    facing = this.rotationStyle ? this.heading : 90;
    if (this.rotationStyle === 2) {
        facing = 90;
        if ((this.heading > 180 && (this.heading < 360))
            || (this.heading < 0 && (this.heading > -180))) {
            isFlipped = true;
        }
    }
    if (this.costume && !isLoadingCostume) {



        pic = isFlipped ? this.costume.flipped() : this.costume;
        const textMorph = pic.textMorph;
        ctx.save();
        ctx.scale(this.scale * stageScale, this.scale * stageScale);
        ctx.translate(this.imageOffset.x, this.imageOffset.y);
        ctx.rotate(radians(facing - 90));

        textMorph.render(ctx);
        ctx.restore();


    } else {
        facing = isFlipped ? -90 : facing;
        SpriteMorph.uber.render.call(this, ctx, facing);

        if (isLoadingCostume) { // retry until costume is done loading
            cst = this.costume;
            handle = setInterval(
                function () {
                    myself.wearCostume(cst, true);
                    clearInterval(handle);
                },
                100
            );
            return this.wearCostume(null, true);
        }
    }
    // apply graphics effects to image
    this.cachedImage = this.applyGraphicsEffects(this.cachedImage);
    this.version = Date.now();


};
