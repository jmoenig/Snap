/*

    symbols.js

    graphical GUI-symbols for for morphic.js and Snap!

    written by Jens Mönig
    jens@moenig.org

    Copyright (C) 2020 by Jens Mönig

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


    credits:
    --------
    additional symbols have been contributed by members of the Snap!
    open-source community, especially by Bernat Romagosa

*/

/*global modules, Morph, Point, radians, ZERO, BLACK*/

// Global stuff ////////////////////////////////////////////////////////

modules.symbols = '2020-October-07';

var SymbolMorph;

// SymbolMorph //////////////////////////////////////////////////////////

/*
    I display graphical symbols, such as special letters. I have been
    called into existence out of frustration about not being able to
    consistently use Unicode characters to the same ends.

    Symbols can also display costumes, if one is specified in lieu
    of a name property, although this feature is currently not being
    used because of asynchronous image loading issues.
 */

// SymbolMorph inherits from Morph:

SymbolMorph.prototype = new Morph();
SymbolMorph.prototype.constructor = SymbolMorph;
SymbolMorph.uber = Morph.prototype;

// SymbolMorph available symbols:

SymbolMorph.prototype.names = [
    'square',
    'pointRight',
    'stepForward',
    'gears',
    'gearPartial',
    'gearBig',
    'file',
    'fullScreen',
    'grow',
    'normalScreen',
    'shrink',
    'smallStage',
    'normalStage',
    'turtle',
    'turtleOutline',
    'stage',
    'pause',
    'flag',
    'octagon',
    'cloud',
    'cloudGradient',
    'cloudOutline',
    'turnRight',
    'turnLeft',
    'turnAround',
    'storage',
    'poster',
    'flash',
    'brush',
    'tick',
    'checkedBox',
    'rectangle',
    'rectangleSolid',
    'circle',
    'circleSolid',
    'ellipse',
    'line',
    'cross',
    'crosshairs',
    'paintbucket',
    'eraser',
    'pipette',
    'speechBubble',
    'speechBubbleOutline',
    'loop',
    'turnBack',
    'turnForward',
    'arrowUp',
    'arrowUpOutline',
    'arrowUpThin',
    'arrowUpDownThin',
    'arrowLeft',
    'arrowLeftOutline',
    'arrowLeftThin',
    'arrowLeftRightThin',
    'arrowDown',
    'arrowDownOutline',
    'arrowDownThin',
    'arrowRight',
    'arrowRightOutline',
    'arrowRightThin',
    'robot',
    'magnifyingGlass',
    'magnifierOutline',
    'selection',
    'polygon',
    'closedBrush',
    'notes',
    'camera',
    'location',
    'footprints',
    'keyboard',
    'keyboardFilled',
    'globe',
    'globeBig',
    'list',
    'flipVertical',
    'flipHorizontal'
];

// SymbolMorph instance creation:

function SymbolMorph(name, size, color, shadowOffset, shadowColor) {
    this.init(name, size, color, shadowOffset, shadowColor);
}

SymbolMorph.prototype.init = function (
    name,
    size,
    color,
    shadowOffset,
    shadowColor
) {
    this.isProtectedLabel = false; // participate in zebraing
    this.isReadOnly = true;
    this.name = name || 'square';
    this.size = size || 50;
    this.shadowOffset = shadowOffset || ZERO;
    this.shadowColor = shadowColor || null;
    SymbolMorph.uber.init.call(this);
    this.color = color || BLACK;
    this.fixLayout();
    this.rerender();
};

// SymbolMorph string representation: 'a SymbolMorph: "square"'

SymbolMorph.prototype.toString = function () {
    return 'a ' +
        (this.constructor.name ||
            this.constructor.toString().split(' ')[1].split('(')[0]) +
        ': "' +
        this.name +
        '" ' +
        this.bounds;
};

// SymbolMorph zebra coloring:

SymbolMorph.prototype.setLabelColor = function (
    textColor,
    shadowColor,
    shadowOffset
) {
    this.shadowOffset = shadowOffset || new Point();
    this.shadowColor = shadowColor;
    this.setColor(textColor);
};

// SymbolMorph dynamic coloring:

SymbolMorph.prototype.getShadowRenderColor = function () {
    // answer the shadow rendering color, can be overridden for my children
    return this.shadowColor;
};

// SymbolMorph layout:

SymbolMorph.prototype.setExtent = function (aPoint) {
    if (this.size === aPoint.y) {return; }
    this.changed();
    this.size = aPoint.y;
    this.fixLayout();
    this.rerender();
};

SymbolMorph.prototype.fixLayout = function () {
    // determine my extent
    this.bounds.setWidth(this.symbolWidth() + Math.abs(this.shadowOffset.x));
    this.bounds.setHeight(this.size + Math.abs(this.shadowOffset.y));
};

// SymbolMorph displaying:

SymbolMorph.prototype.render = function (ctx) {
    var sx = this.shadowOffset.x < 0 ? 0 : this.shadowOffset.x,
        sy = this.shadowOffset.y < 0 ? 0 : this.shadowOffset.y,
        x = this.shadowOffset.x < 0 ? Math.abs(this.shadowOffset.x) : 0,
        y = this.shadowOffset.y < 0 ? Math.abs(this.shadowOffset.y) : 0;

    if (this.shadowColor) {
        ctx.save();
        ctx.translate(sx, sy);
        this.renderShape(ctx, this.getShadowRenderColor());
        ctx.restore();
    }
    ctx.save();
    ctx.translate(x, y);
    this.renderShape(ctx, this.getRenderColor());
    ctx.restore();
};

SymbolMorph.prototype.renderShape = function (ctx, aColor) {
    // private
    switch (this.name) {
    case 'square':
        this.renderSymbolStop(ctx, aColor);
        break;
    case 'pointRight':
        this.renderSymbolPointRight(ctx, aColor);
        break;
    case 'stepForward':
        this.renderSymbolStepForward(ctx, aColor);
        break;
    case 'gears':
        this.renderSymbolGears(ctx, aColor);
        break;
    case 'gearBig':
        this.renderSymbolGearBig(ctx, aColor);
        break;
    case 'gearPartial':
        this.renderSymbolGearPartial(ctx, aColor);
        break;
    case 'file':
        this.renderSymbolFile(ctx, aColor);
        break;
    case 'fullScreen':
        this.renderSymbolFullScreen(ctx, aColor);
        break;
    case 'grow':
        this.renderSymbolGrow(ctx, aColor);
        break;
    case 'normalScreen':
        this.renderSymbolNormalScreen(ctx, aColor);
        break;
    case 'smallStage':
        this.renderSymbolSmallStage(ctx, aColor);
        break;
    case 'normalStage':
        this.renderSymbolNormalStage(ctx, aColor);
        break;
    case 'shrink':
        this.renderSymbolShrink(ctx, aColor);
        break;
    case 'turtle':
        this.renderSymbolTurtle(ctx, aColor);
        break;
    case 'turtleOutline':
        this.renderSymbolTurtleOutline(ctx, aColor);
        break;
    case 'stage':
        this.renderSymbolStop(ctx, aColor);
        break;
    case 'pause':
        this.renderSymbolPause(ctx, aColor);
        break;
    case 'flag':
        this.renderSymbolFlag(ctx, aColor);
        break;
    case 'octagon':
        this.renderSymbolOctagon(ctx, aColor);
        break;
    case 'cloud':
        this.renderSymbolCloud(ctx, aColor);
        break;
    case 'cloudGradient':
        this.renderSymbolCloudGradient(ctx, aColor);
        break;
    case 'cloudOutline':
        this.renderSymbolCloudOutline(ctx, aColor);
        break;
    case 'turnRight':
        this.renderSymbolTurnRight(ctx, aColor);
        break;
    case 'turnLeft':
        this.renderSymbolTurnLeft(ctx, aColor);
        break;
    case 'turnAround':
        this.renderSymbolTurnAround(ctx, aColor);
        break;
    case 'storage':
        this.renderSymbolStorage(ctx, aColor);
        break;
    case 'poster':
        this.renderSymbolPoster(ctx, aColor);
        break;
    case 'flash':
        this.renderSymbolFlash(ctx, aColor);
        break;
    case 'brush':
        this.renderSymbolBrush(ctx, aColor);
        break;
    case 'tick':
        this.renderSymbolTick(ctx, aColor);
        break;
    case 'checkedBox':
        this.renderSymbolCheckedBox(ctx, aColor);
        break;
    case 'rectangle':
        this.renderSymbolRectangle(ctx, aColor);
        break;
    case 'rectangleSolid':
        this.renderSymbolRectangleSolid(ctx, aColor);
        break;
    case 'circle':
        this.renderSymbolCircle(ctx, aColor);
        break;
    case 'circleSolid':
        this.renderSymbolCircleSolid(ctx, aColor);
        break;
    case 'ellipse':
        this.renderSymbolCircle(ctx, aColor);
        break;
    case 'line':
        this.renderSymbolLine(ctx, aColor);
        break;
    case 'cross':
        this.renderSymbolCross(ctx, aColor);
        break;
    case 'crosshairs':
        this.renderSymbolCrosshairs(ctx, aColor);
        break;
    case 'paintbucket':
        this.renderSymbolPaintbucket(ctx, aColor);
        break;
    case 'eraser':
        this.renderSymbolEraser(ctx, aColor);
        break;
    case 'pipette':
        this.renderSymbolPipette(ctx, aColor);
        break;
    case 'speechBubble':
        this.renderSymbolSpeechBubble(ctx, aColor);
        break;
    case 'speechBubbleOutline':
        this.renderSymbolSpeechBubbleOutline(ctx, aColor);
        break;
    case 'loop':
        this.renderSymbolLoop(ctx, aColor);
        break;
    case 'turnBack':
        this.renderSymbolTurnBack(ctx, aColor);
        break;
    case 'turnForward':
        this.renderSymbolTurnForward(ctx, aColor);
        break;
    case 'arrowUp':
        this.renderSymbolArrowUp(ctx, aColor);
        break;
    case 'arrowUpOutline':
        this.renderSymbolArrowUpOutline(ctx, aColor);
        break;
    case 'arrowUpThin':
        this.renderSymbolArrowUpThin(ctx, aColor);
        break;
    case 'arrowUpDownThin':
        this.renderSymbolArrowUpDownThin(ctx, aColor);
        break;
    case 'arrowLeft':
        this.renderSymbolArrowLeft(ctx, aColor);
        break;
    case 'arrowLeftOutline':
        this.renderSymbolArrowLeftOutline(ctx, aColor);
        break;
    case 'arrowLeftThin':
        this.renderSymbolArrowLeftThin(ctx, aColor);
        break;
    case 'arrowLeftRightThin':
        this.renderSymbolArrowLeftRightThin(ctx, aColor);
        break;
    case 'arrowDown':
        this.renderSymbolArrowDown(ctx, aColor);
        break;
    case 'arrowDownOutline':
        this.renderSymbolArrowDownOutline(ctx, aColor);
        break;
    case 'arrowDownThin':
        this.renderSymbolArrowDownThin(ctx, aColor);
        break;
    case 'arrowRight':
        this.renderSymbolArrowRight(ctx, aColor);
        break;
    case 'arrowRightOutline':
        this.renderSymbolArrowRightOutline(ctx, aColor);
        break;
    case 'arrowRightThin':
        this.renderSymbolArrowRightThin(ctx, aColor);
        break;
    case 'robot':
        this.renderSymbolRobot(ctx, aColor);
        break;
    case 'magnifyingGlass':
        this.renderSymbolMagnifyingGlass(ctx, aColor);
        break;
    case 'magnifierOutline':
        this.renderSymbolMagnifierOutline(ctx, aColor);
        break;
    case 'selection':
        this.renderSymbolSelection(ctx, aColor);
        break;
    case 'polygon':
        this.renderSymbolOctagonOutline(ctx, aColor);
        break;
    case 'closedBrush':
        this.renderSymbolClosedBrushPath(ctx, aColor);
        break;
    case 'notes':
        this.renderSymbolNotes(ctx, aColor);
        break;
    case 'camera':
        this.renderSymbolCamera(ctx, aColor);
        break;
    case 'location':
        this.renderSymbolLocation(ctx, aColor);
        break;
    case 'footprints':
        this.renderSymbolFootprints(ctx, aColor);
        break;
    case 'keyboard':
        this.renderSymbolKeyboard(ctx, aColor);
        break;
    case 'keyboardFilled':
        this.renderSymbolKeyboardFilled(ctx, aColor);
        break;
    case 'globe':
        this.renderSymbolGlobe(ctx, aColor);
        break;
    case 'globeBig':
        this.renderSymbolGlobeBig(ctx, aColor);
        break;
    case 'list':
        this.renderSymbolList(ctx, aColor);
        break;
    case 'flipVertical':
        this.renderSymbolFlipVertical(ctx, aColor);
        break;
    case 'flipHorizontal':
        this.renderSymbolFlipHorizontal(ctx, aColor);
        break;
    default:
        throw new Error('unknown symbol name: "' + this.name + '"');
    }
};

SymbolMorph.prototype.symbolWidth = function () {
    // private
    var size = this.size;

    switch (this.name) {
    case 'pointRight':
        return Math.sqrt(size * size - Math.pow(size / 2, 2));
    case 'location':
        return size * 0.6;
    case 'flash':
    case 'file':
    case 'list':
        return size * 0.8;
    case 'smallStage':
    case 'normalStage':
        return size * 1.2;
    case 'turtle':
    case 'turtleOutline':
    case 'stage':
        return size * 1.3;
    case 'cloud':
    case 'cloudGradient':
    case 'cloudOutline':
    case 'turnBack':
    case 'turnForward':
    case 'keyboard':
    case 'keyboardFilled':
        return size * 1.6;
    case 'turnRight':
    case 'turnLeft':
        return size / 3 * 2;
    case 'loop':
        return size * 2;
    default:
        return size;
    }
};

SymbolMorph.prototype.renderSymbolStop = function (ctx, color) {
    // draw a vertically centered square
    ctx.fillStyle = color.toString();
    ctx.fillRect(0, 0, this.symbolWidth(), this.size);
};

SymbolMorph.prototype.renderSymbolPointRight = function (ctx, color) {
    // draw a right-pointing, equilateral triangle
    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(this.symbolWidth(), Math.round(this.size / 2));
    ctx.lineTo(0, this.size);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fill();
};

SymbolMorph.prototype.renderSymbolStepForward = function (ctx, color) {
    // draw a right-pointing triangle
    // followed by a vertical bar
    var w = this.symbolWidth(),
        h = this.size;

    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(w * 0.75, Math.round(h / 2));
    ctx.lineTo(0, h);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(
        w * 0.75,
        0,
        w * 0.25,
        h
    );
};

SymbolMorph.prototype.renderSymbolGears = function (ctx, color) {
    // draw gears
    var w = this.symbolWidth(),
        r = w / 2,
        spikes = 8,
        off = 8,
        shift = 10,
        angle, turn, i;

    ctx.fillStyle = color.toString();
    ctx.beginPath();

    // draw the spiked outline
    ctx.moveTo(w, r);
    angle = 360 / spikes;
    turn = angle * 0.5;
    for (i = 0; i < spikes; i += 1) {
        ctx.arc(
            r,
            r,
            r,
            radians(i * angle + turn),
            radians(i * angle + off + turn)
        );
        ctx.arc(
            r,
            r,
            r * 0.7,
            radians(i * angle - shift + angle * 0.5 + turn),
            radians(i * angle + shift + angle * 0.5 + turn)
        );
        ctx.arc(
            r,
            r,
            r,
            radians((i + 1) * angle - off + turn),
            radians((i + 1) * angle + turn)
        );
    }
    ctx.lineTo(w, r);

    // draw the hole in the middle
    ctx.arc(r, r, r * 0.3, radians(0), radians(360));

    // fill
    ctx.clip('evenodd');
    ctx.fillRect(0, 0, w, w);
};

SymbolMorph.prototype.renderSymbolGearBig = function (ctx, color) {
    // draw a large gear
    var w = this.symbolWidth(),
        r = w / 2,
        spikes = 10,
        off = 7,
        shift = 8,
        angle, i;

    ctx.fillStyle = color.toString();
    ctx.beginPath();

    // draw the spiked outline
    ctx.moveTo(w, r);
    angle = 360 / spikes;
    for (i = 0; i < spikes; i += 1) {
        ctx.arc(
            r,
            r,
            r,
            radians(i * angle),
            radians(i * angle + off)
        );
        ctx.arc(
            r,
            r,
            r * 0.8,
            radians(i * angle - shift + angle * 0.5),
            radians(i * angle + shift + angle * 0.5)
        );
        ctx.arc(
            r,
            r,
            r,
            radians((i + 1) * angle - off),
            radians((i + 1) * angle)
        );
    }
    ctx.lineTo(w, r);

    // draw the holes in the middle
    ctx.arc(r, r, r * 0.6, radians(0), radians(360));
    ctx.arc(r, r, r * 0.2, radians(0), radians(360));

    // fill
    ctx.clip('evenodd');
    ctx.fillRect(0, 0, w, w);
};

SymbolMorph.prototype.renderSymbolGearPartial = function (ctx, color) {
    // draw gears
    var w = this.symbolWidth(),
        r = w * 0.75,
        spikes = 8,
        off = 8,
        shift = 10,
        angle, turn, i;

    ctx.fillStyle = color.toString();
    ctx.beginPath();

    // draw the spiked outline
    ctx.moveTo(w, r);
    angle = 360 / spikes;
    turn = angle * 0.5;
    for (i = 0; i < spikes; i += 1) {
        ctx.arc(
            r,
            r,
            r,
            radians(i * angle + turn),
            radians(i * angle + off + turn)
        );
        ctx.arc(
            r,
            r,
            r * 0.7,
            radians(i * angle - shift + angle * 0.5 + turn),
            radians(i * angle + shift + angle * 0.5 + turn)
        );
        ctx.arc(
            r,
            r,
            r,
            radians((i + 1) * angle - off + turn),
            radians((i + 1) * angle + turn)
        );
    }
    ctx.lineTo(w, r);

    // draw the hole in the middle
    ctx.arc(r, r, r * 0.3, radians(0), radians(360));

    // fill
    ctx.clip('evenodd');
    ctx.fillRect(0, 0, w, w);
};

SymbolMorph.prototype.renderSymbolFile = function (ctx, color) {
    // draw a page symbol
    var height = this.size,
        width = this.symbolWidth(),
        w = Math.min(width, height) / 2;

    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(w, 0);
    ctx.lineTo(w, w);
    ctx.lineTo(width, w);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = color.darker(25).toString();
    ctx.beginPath();
    ctx.moveTo(w, 0);
    ctx.lineTo(width, w);
    ctx.lineTo(w, w);
    ctx.lineTo(w, 0);
    ctx.closePath();
    ctx.fill();
};

SymbolMorph.prototype.renderSymbolFullScreen = function (ctx, color) {
    // draw two arrows pointing diagonally outwards
    var h = this.size,
        width = this.symbolWidth(),
        c = width / 2,
        off = width / 20,
        w = width / 2;

    ctx.strokeStyle = color.toString();
    ctx.lineWidth = width / 5;
    ctx.beginPath();
    ctx.moveTo(c - off, c + off);
//    ctx.lineTo(0, h);
    ctx.lineTo(off * 2, h - off * 2);
    ctx.stroke();

    ctx.strokeStyle = color.toString();
    ctx.lineWidth = width / 5;
    ctx.beginPath();
    ctx.moveTo(c + off, c - off);
    ctx.lineTo(h - off * 2, off * 2);
    ctx.stroke();

    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.moveTo(0, h);
    ctx.lineTo(0, h - w);
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.moveTo(h, 0);
    ctx.lineTo(h - w, 0);
    ctx.lineTo(h, w);
    ctx.closePath();
    ctx.fill();
};

SymbolMorph.prototype.renderSymbolGrow = function (ctx, color) {

    var h = this.size,
        width = this.symbolWidth(),
        c = width / 2,
        off = width / 20,
        w = width / 3;
        
    function arrows() {
        ctx.strokeStyle = color.toString();
        ctx.lineWidth = width / 7;
        ctx.beginPath();
        ctx.moveTo(c - off * 3, c + off * 3);
        ctx.lineTo(off * 2, h - off * 2);
        ctx.stroke();

        ctx.strokeStyle = color.toString();
        ctx.lineWidth = width / 7;
        ctx.beginPath();
        ctx.moveTo(c + off * 3 , c - off * 3);
        ctx.lineTo(h - off * 2, off * 2);
        ctx.stroke();

        ctx.fillStyle = color.toString();
        ctx.beginPath();
        ctx.moveTo(0, h);
        ctx.lineTo(0, h - w);
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = color.toString();
        ctx.beginPath();
        ctx.moveTo(h, 0);
        ctx.lineTo(h - w, 0);
        ctx.lineTo(h, w);
        ctx.closePath();
        ctx.fill();
    }
    
    // draw four arrows pointing diagonally outwards
    arrows();
    ctx.translate(this.size, 0);
    ctx.rotate(radians(90));
    arrows();
};


SymbolMorph.prototype.renderSymbolNormalScreen = function (ctx, color) {
 var h = this.size,
        w = this.symbolWidth(),
        c = w / 2,
        off = w / 20;

    ctx.strokeStyle = color.toString();
    ctx.lineWidth = w / 5;
    ctx.beginPath();
    ctx.moveTo(c - off * 3, c + off * 3);
    ctx.lineTo(off, h - off);
    ctx.stroke();

    ctx.strokeStyle = color.toString();
    ctx.lineWidth = w / 5;
    ctx.beginPath();
    ctx.moveTo(c + off * 3, c - off * 3);
    ctx.lineTo(h - off, off);
    ctx.stroke();

    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.moveTo(c + off, c - off);
    ctx.lineTo(w, c - off);
    ctx.lineTo(c + off, 0);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.moveTo(c - off, c + off);
    ctx.lineTo(0, c + off);
    ctx.lineTo(c - off, w);
    ctx.closePath();
    ctx.fill();
};

SymbolMorph.prototype.renderSymbolShrink = function (ctx, color) {
    // draw 4 arrows pointing diagonally inwards
    var h = this.size,
        w = this.symbolWidth(),
        c = w / 2,
        off = w / 20;
        
    function arrows() {
        ctx.strokeStyle = color.toString();
        ctx.lineWidth = w / 8;
        ctx.beginPath();
        ctx.moveTo(c - off * 3, c + off * 3);
        ctx.lineTo(off, h - off);
        ctx.stroke();

        ctx.strokeStyle = color.toString();
        ctx.lineWidth = w / 8;
        ctx.beginPath();
        ctx.moveTo(c + off * 3, c - off * 3);
        ctx.lineTo(h - off, off);
        ctx.stroke();

        ctx.fillStyle = color.toString();
        ctx.beginPath();
        ctx.moveTo(c + off * 2, c - off * 2);
        ctx.lineTo(w - off, c - off * 2);
        ctx.lineTo(c + off * 2, 0 + off);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = color.toString();
        ctx.beginPath();
        ctx.moveTo(c - off * 2, c + off * 2);
        ctx.lineTo(0 + off, c + off * 2);
        ctx.lineTo(c - off * 2, w - off);
        ctx.closePath();
        ctx.fill();
    }
    
    arrows();
    ctx.translate(this.size, 0);
    ctx.rotate(radians(90));
    arrows();
};

SymbolMorph.prototype.renderSymbolSmallStage = function (ctx, color) {
    // draw a stage toggling symbol
    var w = this.symbolWidth(),
        h = this.size,
        w2 = w / 2,
        h2 = h / 2;

    ctx.fillStyle = color.darker(50).toString();
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = color.toString();
    ctx.fillRect(w2, 0, w2, h2);

};

SymbolMorph.prototype.renderSymbolNormalStage = function (ctx, color) {
    // draw a stage toggling symbol
    var w = this.symbolWidth(),
        h = this.size,
        w2 = w / 2,
        h2 = h / 2;

    ctx.fillStyle = color.toString();
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = color.darker(50).toString();
    ctx.fillRect(w2, 0, w2, h2);
};

SymbolMorph.prototype.renderSymbolTurtle = function (ctx, color) {
    // draw a LOGO turtle
    var w = this.symbolWidth(),
        h = this.size;

    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(w, h / 2);
    ctx.lineTo(0, h);
    ctx.lineTo(h / 2, h / 2);
    ctx.closePath();
    ctx.fill();
};

SymbolMorph.prototype.renderSymbolTurtleOutline = function (ctx, color) {
    // draw a LOGO turtle
    var w = this.symbolWidth(),
        h = this.size;

    ctx.strokeStyle = color.toString();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(w, h / 2);
    ctx.lineTo(0, h);
    ctx.lineTo(h / 2, h / 2);
    ctx.closePath();
    ctx.stroke();
};

SymbolMorph.prototype.renderSymbolPause = function (ctx, color) {
    // draw two parallel rectangles
    var w = this.symbolWidth() / 5,
        h = this.size;

    ctx.fillStyle = color.toString();
    ctx.fillRect(0, 0, w * 2, h);
    ctx.fillRect(w * 3, 0, w * 2, h);
};

SymbolMorph.prototype.renderSymbolFlag = function (ctx, color) {
    // draw a flag
    var w = this.symbolWidth(),
        h = this.size,
        l = Math.max(w / 12, 1);

    ctx.lineWidth = l;
    ctx.strokeStyle = color.toString();
    ctx.beginPath();
    ctx.moveTo(l / 2, 0);
    ctx.lineTo(l / 2, h);
    ctx.stroke();

    ctx.lineWidth = h / 2;
    ctx.beginPath();
    ctx.moveTo(0, h / 4);
    ctx.bezierCurveTo(
        w * 0.8,
        h / 4,
        w * 0.1,
        h * 0.5,
        w,
        h * 0.5
    );
    ctx.stroke();
};

SymbolMorph.prototype.renderSymbolOctagon = function (ctx, color) {
    // draw an octagon
    var side = this.symbolWidth(),
        vert = (side - (side * 0.383)) / 2;

    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.moveTo(vert, 0);
    ctx.lineTo(side - vert, 0);
    ctx.lineTo(side, vert);
    ctx.lineTo(side, side - vert);
    ctx.lineTo(side - vert, side);
    ctx.lineTo(vert, side);
    ctx.lineTo(0, side - vert);
    ctx.lineTo(0, vert);
    ctx.closePath();
    ctx.fill();
};

SymbolMorph.prototype.renderSymbolCloud = function (ctx, color) {
    // draw a cloud
    var w = this.symbolWidth(),
        h = this.size,
        r1 = h * 2 / 5,
        r2 = h / 4,
        r3 = h * 3 / 10,
        r4 = h / 5;

    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.arc(r2, h - r2, r2, radians(90), radians(259), false);
    ctx.arc(w / 20 * 5, h / 9 * 4, r4, radians(165), radians(300), false);
    ctx.arc(w / 20 * 11, r1, r1, radians(200), radians(357), false);
    ctx.arc(w - r3, h - r3, r3, radians(269), radians(90), false);
    ctx.closePath();
    ctx.fill();
};

SymbolMorph.prototype.renderSymbolCloudGradient = function (ctx, color) {
    // draw a cloud
    var w = this.symbolWidth(),
        h = this.size,
        gradient,
        r1 = h * 2 / 5,
        r2 = h / 4,
        r3 = h * 3 / 10,
        r4 = h / 5;

    gradient = ctx.createRadialGradient(
        0,
        0,
        0,
        0,
        0,
        w
    );
    gradient.addColorStop(0, color.lighter(25).toString());
    gradient.addColorStop(1, color.darker(25).toString());
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(r2, h - r2, r2, radians(90), radians(259), false);
    ctx.arc(w / 20 * 5, h / 9 * 4, r4, radians(165), radians(300), false);
    ctx.arc(w / 20 * 11, r1, r1, radians(200), radians(357), false);
    ctx.arc(w - r3, h - r3, r3, radians(269), radians(90), false);
    ctx.closePath();
    ctx.fill();
};

SymbolMorph.prototype.renderSymbolCloudOutline = function (ctx, color) {
    // draw cloud
    var w = this.symbolWidth(),
        h = this.size,
        r1 = h * 2 / 5,
        r2 = h / 4,
        r3 = h * 3 / 10,
        r4 = h / 5;

    ctx.strokeStyle = color.toString();
    ctx.beginPath();
    ctx.arc(r2 + 1, h - r2 - 1, r2, radians(90), radians(180), false);
    ctx.arc(w / 20 * 5, h / 9 * 4, r4, radians(150), radians(300), false);
    ctx.arc(w / 20 * 11, r1 + 1, r1, radians(210), radians(335), false);
    ctx.arc(w - r3 - 1, h - r3 - 1, r3, radians(280), radians(90), false);
    ctx.closePath();
    ctx.stroke();
};

SymbolMorph.prototype.renderSymbolTurnRight = function (ctx, color) {
    // draw a right-turning arrow
    var w = this.symbolWidth(),
        l = Math.max(w / 10, 1),
        r = w / 2;

    ctx.lineWidth = l;
    ctx.strokeStyle = color.toString();
    ctx.beginPath();
    ctx.arc(r, r * 2, r - l / 2, radians(0), radians(-90), false);
    ctx.stroke();

    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.moveTo(w, r);
    ctx.lineTo(r, 0);
    ctx.lineTo(r, r * 2);
    ctx.closePath();
    ctx.fill();
};

SymbolMorph.prototype.renderSymbolTurnLeft = function (ctx, color) {
    // draw a left-turning arrow
    var w = this.symbolWidth(),
        l = Math.max(w / 10, 1),
        r = w / 2;

    ctx.lineWidth = l;
    ctx.strokeStyle = color.toString();
    ctx.beginPath();
    ctx.arc(r, r * 2, r - l / 2, radians(180), radians(-90), true);
    ctx.stroke();

    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.moveTo(0, r);
    ctx.lineTo(r, 0);
    ctx.lineTo(r, r * 2);
    ctx.closePath();
    ctx.fill();
};

SymbolMorph.prototype.renderSymbolTurnAround = function (ctx, color) {
    // draw a right-around-turning arrow
    var w = this.symbolWidth(),
        l = Math.max(w / 10, 1),
        r = w / 2;

    ctx.lineWidth = l;
    ctx.strokeStyle = color.toString();
    ctx.beginPath();
    ctx.arc(r, r, r - l / 2, radians(-45), radians(225), false);
    ctx.stroke();
    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.moveTo(0, r * 0.1);
    ctx.lineTo(r * 0.8, 0);
    ctx.lineTo(r * 0.7, r * 0.7);
    ctx.closePath();
    ctx.fill();
};

SymbolMorph.prototype.renderSymbolStorage = function (ctx, color) {
    // draw a stack of three disks
    var w = this.symbolWidth(),
        h = this.size,
        r = h,
        unit = h / 11;

    function drawDisk(bottom) {
        ctx.fillStyle = color.toString();
        ctx.beginPath();
        ctx.arc(w / 2, bottom - h, r, radians(60), radians(120), false);
        ctx.lineTo(0, bottom - unit * 2);
        ctx.arc(
            w / 2,
            bottom - h - unit * 2,
            r,
            radians(120),
            radians(60),
            true
        );
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = color.darker(25).toString();
        ctx.beginPath();
        ctx.arc(
            w / 2,
            bottom + unit * 6 + 1,
            r,
            radians(-120), // 60
            radians(-60), // 120
            false // true
        );
        ctx.stroke();
    }

    ctx.strokeStyle = color.toString();
    drawDisk(h);
    drawDisk(h - unit * 3);
    drawDisk(h - unit * 6);
};

SymbolMorph.prototype.renderSymbolPoster = function (ctx, color) {
    // draw a poster stand
    var w = this.symbolWidth(),
        h = this.size,
        bottom = h * 0.75,
        edge = h / 5;

    ctx.fillStyle = color.toString();
    ctx.strokeStyle = color.toString();

    ctx.lineWidth = w / 15;

    ctx.beginPath();
    ctx.moveTo(w / 2, h / 3);
    ctx.lineTo(w / 6, h);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(w / 2, h / 3);
    ctx.lineTo(w / 2, h);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(w / 2, h / 3);
    ctx.lineTo(w * 5 / 6, h);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(w, 0);
    ctx.lineTo(w, bottom - edge);
    ctx.lineTo(w - edge, bottom - edge);
    ctx.lineTo(w - edge, bottom);
    ctx.lineTo(0, bottom);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = color.darker(25).toString();
    ctx.beginPath();
    ctx.moveTo(w, bottom - edge);
    ctx.lineTo(w - edge, bottom - edge);
    ctx.lineTo(w - edge, bottom);
    ctx.closePath();
    ctx.fill();
};

SymbolMorph.prototype.renderSymbolFlash = function (ctx, color) {
    // draw a lightning bolt
    var w = this.symbolWidth(),
        h = this.size,
        w3 = w / 3,
        h3 = h / 3,
        off = h3 / 3;

    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.moveTo(w3, 0);
    ctx.lineTo(0, h3);
    ctx.lineTo(w3, h3);
    ctx.lineTo(0, h3 * 2);
    ctx.lineTo(w3, h3 * 2);
    ctx.lineTo(0, h);
    ctx.lineTo(w, h3 * 2 - off);
    ctx.lineTo(w3 * 2, h3 * 2 - off);
    ctx.lineTo(w, h3 - off);
    ctx.lineTo(w3 * 2, h3 - off);
    ctx.lineTo(w, 0);
    ctx.closePath();
    ctx.fill();
};

SymbolMorph.prototype.renderSymbolBrush = function (ctx, color) {
    // draw a paintbrush
    var w = this.symbolWidth(),
        h = this.size,
        l = Math.max(w / 30, 0.5);

    ctx.fillStyle = color.toString();
    ctx.lineWidth = l * 2;
    ctx.beginPath();
    ctx.moveTo(w / 8 * 3, h / 2);
    ctx.quadraticCurveTo(0, h / 2, l, h - l);
    ctx.quadraticCurveTo(w / 2, h, w / 2, h / 8 * 5);
    ctx.closePath();
    ctx.fill();

    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = color.toString();

    ctx.moveTo(w / 8 * 3, h / 2);
    ctx.lineTo(w * 0.75, l);
    ctx.quadraticCurveTo(w, 0, w - l, h * 0.25);
    ctx.stroke();

    ctx.moveTo(w / 2, h / 8 * 5);
    ctx.lineTo(w - l, h * 0.25);
    ctx.stroke();
};

SymbolMorph.prototype.renderSymbolTick = function (ctx, color) {
    // draw a check mark
    var w = this.symbolWidth(),
        h = this.size;

    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.moveTo(w * 0.2, h * 0.5);
    ctx.lineTo(w * 0.5, h);
    ctx.lineTo(w * 0.8, h * 0.3);
    ctx.lineTo(w, 0);
    ctx.lineTo(w * 0.65, h * 0.2);
    ctx.lineTo(w * 0.5, h * 0.65);
    ctx.closePath();
    ctx.fill();
};

SymbolMorph.prototype.renderSymbolCheckedBox = function (ctx, color) {
    // draw a rectangle with a check mark
    this.renderSymbolRectangle(ctx, color);
    this.renderSymbolTick(ctx, color);
};

SymbolMorph.prototype.renderSymbolRectangle = function (ctx, color) {
    // draw a rectangle
    var w = this.symbolWidth(),
        h = this.size,
        l = Math.max(w / 20, 0.5);

    ctx.strokeStyle = color.toString();
    ctx.lineWidth = l * 2;
    ctx.beginPath();
    ctx.moveTo(l, l);
    ctx.lineTo(w - l, l);
    ctx.lineTo(w - l, h - l);
    ctx.lineTo(l, h - l);
    ctx.closePath();
    ctx.stroke();
};

SymbolMorph.prototype.renderSymbolRectangleSolid = function (ctx, color) {
    // draw a solid rectangle
    var w = this.symbolWidth(),
        h = this.size;

    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(w, 0);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();
};

SymbolMorph.prototype.renderSymbolCircle = function (ctx, color) {
    // draw a circle
    var w = this.symbolWidth(),
        l = Math.max(w / 20, 0.5);

    ctx.strokeStyle = color.toString();
    ctx.lineWidth = l * 2;
    ctx.beginPath();
    ctx.arc(w / 2, w / 2, w / 2 - l, radians(0), radians(360), false);
    ctx.stroke();
};

SymbolMorph.prototype.renderSymbolCircleSolid = function (ctx, color) {
    // draw a solid circle
    var w = this.symbolWidth();

    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.arc(w / 2, w / 2, w / 2, radians(0), radians(360), false);
    ctx.fill();
};

SymbolMorph.prototype.renderSymbolLine = function (ctx, color) {
    // draw a plus sign cross
    var w = this.symbolWidth(),
        h = this.size,
        l = Math.max(w / 20, 0.5);

    ctx.strokeStyle = color.toString();
    ctx.lineWidth = l * 2;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(l, l);
    ctx.lineTo(w - l, h - l);
    ctx.stroke();
};

SymbolMorph.prototype.renderSymbolCross = function (ctx, color) {
    // draw a diagonal line
    var w = this.symbolWidth(),
        l = Math.max(w / 20, 0.5);

    ctx.strokeStyle = color.toString();
    ctx.lineWidth = l * 2;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(l, w / 2);
    ctx.lineTo(w - l, w / 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(w / 2, l);
    ctx.lineTo(w / 2, w - l);
    ctx.stroke();
};

SymbolMorph.prototype.renderSymbolCrosshairs = function (ctx, color) {
    // draw a crosshairs
    var w = this.symbolWidth(),
        h = this.size,
        l = 0.5;

    ctx.strokeStyle = color.toString();
    ctx.lineWidth = l * 2;
    ctx.beginPath();
    ctx.moveTo(l, h / 2);
    ctx.lineTo(w - l, h / 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(w / 2, l);
    ctx.lineTo(w / 2, h - l);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(w / 2, h / 2);
    ctx.arc(w / 2, w / 2, w / 3 - l, radians(0), radians(360), false);
    ctx.stroke();
};

SymbolMorph.prototype.renderSymbolPaintbucket = function (ctx, color) {
    // draw a paint bucket
    var w = this.symbolWidth(),
        h = this.size,
        n = w / 5,
        l = Math.max(w / 30, 0.5);

    ctx.strokeStyle = color.toString();
    ctx.lineWidth = l * 2;
    ctx.beginPath();
    ctx.moveTo(n * 2, n);
    ctx.lineTo(n * 4, n * 3);
    ctx.lineTo(n * 3, n * 4);
    ctx.quadraticCurveTo(n * 2, h, n, n * 4);
    ctx.quadraticCurveTo(0, n * 3, n, n * 2);
    ctx.closePath();
    ctx.stroke();

    ctx.lineWidth = l;
    ctx.moveTo(n * 2, n * 2.5);
    ctx.arc(n * 2, n * 2.5, l, radians(0), radians(360), false);
    ctx.stroke();

    ctx.moveTo(n * 2, n * 2.5);
    ctx.lineTo(n * 2, n / 2 + l);
    ctx.stroke();

    ctx.arc(n * 1.5, n / 2 + l, n / 2, radians(0), radians(180), true);
    ctx.stroke();

    ctx.moveTo(n, n / 2 + l);
    ctx.lineTo(n, n * 2);
    ctx.stroke();

    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.moveTo(n * 3.5, n * 3.5);
    ctx.quadraticCurveTo(w, n * 3.5, w - l, h);
    ctx.lineTo(w, h);
    ctx.quadraticCurveTo(w, n * 2, n * 2.5, n * 1.5);
    ctx.lineTo(n * 4, n * 3);
    ctx.closePath();
    ctx.fill();
};

SymbolMorph.prototype.renderSymbolEraser = function (ctx, color) {
    // draw an eraser
    var w = this.symbolWidth(),
        h = this.size,
        n = w / 4,
        l = Math.max(w / 20, 0.5);

    ctx.strokeStyle = color.toString();
    ctx.lineWidth = l * 2;
    ctx.beginPath();
    ctx.moveTo(n * 3, l);
    ctx.lineTo(l, n * 3);
    ctx.quadraticCurveTo(n, h, n * 2, n * 3);
    ctx.lineTo(w - l, n);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.moveTo(n * 3, 0);
    ctx.lineTo(n * 1.5, n * 1.5);
    ctx.lineTo(n * 2.5, n * 2.5);
    ctx.lineTo(w, n);
    ctx.closePath();
    ctx.fill();
};

SymbolMorph.prototype.renderSymbolPipette = function (ctx, color) {
    // draw an eyedropper
    var w = this.symbolWidth(),
        h = this.size,
        n = w / 4,
        n2 = n / 2,
        l = Math.max(w / 20, 0.5);

    ctx.strokeStyle = color.toString();
    ctx.lineWidth = l * 2;
    ctx.beginPath();
    ctx.moveTo(l, h - l);
    ctx.quadraticCurveTo(n2, h - n2, n2, h - n);
    ctx.lineTo(n * 2, n * 1.5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(l, h - l);
    ctx.quadraticCurveTo(n2, h - n2, n, h - n2);
    ctx.lineTo(n * 2.5, n * 2);
    ctx.stroke();

    ctx.fillStyle = color.toString();
    ctx.arc(n * 3, n, n - l, radians(0), radians(360), false);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(n * 2, n);
    ctx.lineTo(n * 3, n * 2);
    ctx.stroke();
};

SymbolMorph.prototype.renderSymbolSpeechBubble = function (ctx, color) {
    // draw a speech bubble
    var w = this.symbolWidth(),
        h = this.size,
        n = w / 3,
        l = Math.max(w / 20, 0.5);

    ctx.fillStyle = color.toString();
    ctx.lineWidth = l * 2;
    ctx.beginPath();
    ctx.moveTo(n, n * 2);
    ctx.quadraticCurveTo(l, n * 2, l, n);
    ctx.quadraticCurveTo(l, l, n, l);
    ctx.lineTo(n * 2, l);
    ctx.quadraticCurveTo(w - l, l, w - l, n);
    ctx.quadraticCurveTo(w - l, n * 2, n * 2, n * 2);
    ctx.lineTo(n / 2, h - l);
    ctx.closePath();
    ctx.fill();
};

SymbolMorph.prototype.renderSymbolSpeechBubbleOutline = function (
    ctx,
    color
) {
    // draw a speech bubble
    var w = this.symbolWidth(),
        h = this.size,
        n = w / 3,
        l = Math.max(w / 20, 0.5);

    ctx.strokeStyle = color.toString();
    ctx.lineWidth = l * 2;
    ctx.beginPath();
    ctx.moveTo(n, n * 2);
    ctx.quadraticCurveTo(l, n * 2, l, n);
    ctx.quadraticCurveTo(l, l, n, l);
    ctx.lineTo(n * 2, l);
    ctx.quadraticCurveTo(w - l, l, w - l, n);
    ctx.quadraticCurveTo(w - l, n * 2, n * 2, n * 2);
    ctx.lineTo(n / 2, h - l);
    ctx.closePath();
    ctx.stroke();
};

SymbolMorph.prototype.renderSymbolLoop = function (ctx, aColor) {
    var w = this.symbolWidth(),
        h = this.size,
        w2 = w / 2,
        w4 = w2 / 2,
        h2 = h / 2,
        l = Math.max(h / 10, 0.5);

    ctx.lineWidth = l * 2;
    ctx.strokeStyle = aColor.toString();
    ctx.beginPath();
    ctx.moveTo(0, h - l);
    ctx.lineTo(w2, h - l);
    ctx.arc(w2, h2, h2 - l, radians(90), radians(0), true);
    ctx.stroke();
    ctx.fillStyle = aColor.toString();
    ctx.beginPath();
    ctx.moveTo(w4 * 3 - l, 0);
    ctx.lineTo(w2 - l, h2);
    ctx.lineTo(w, h2);
    ctx.closePath();
    ctx.fill();
};

SymbolMorph.prototype.renderSymbolTurnBack = function (ctx, aColor) {
    var w = this.symbolWidth(),
        h = this.size,
        w2 = w / 2,
        h2 = h / 2,
        l = Math.max(w / 20, 0.5);

    ctx.fillStyle = aColor.toString();
    ctx.lineWidth = l * 2;
    ctx.beginPath();
    ctx.moveTo(0, h2);
    ctx.lineTo(w2, 0);
    ctx.lineTo(w2, h);
    ctx.closePath();
    ctx.fill();
    ctx.lineWidth = l * 3;
    ctx.strokeStyle = aColor.toString();
    ctx.beginPath();
    ctx.arc(w2, h, h2, radians(0), radians(-90), true);
    ctx.stroke();
};

SymbolMorph.prototype.renderSymbolTurnForward = function (ctx, aColor) {
    var w = this.symbolWidth(),
        h = this.size,
        w2 = w / 2,
        h2 = h / 2,
        l = Math.max(w / 20, 0.5);

    ctx.fillStyle = aColor.toString();
    ctx.lineWidth = l * 2;
    ctx.beginPath();
    ctx.moveTo(w, h2);
    ctx.lineTo(w2, 0);
    ctx.lineTo(w2, h);
    ctx.closePath();
    ctx.fill();
    ctx.lineWidth = l * 3;
    ctx.strokeStyle = aColor.toString();
    ctx.beginPath();
    ctx.arc(w2, h, h2, radians(-180), radians(-90), false);
    ctx.stroke();
};

SymbolMorph.prototype.renderSymbolArrowUp = function (ctx, color) {
    // draw an up arrow
    var w = this.symbolWidth(),
        h = this.size,
        n = w / 2,
        l = Math.max(w / 20, 0.5);

    ctx.fillStyle = color.toString();
    ctx.lineWidth = l * 2;
    ctx.beginPath();
    ctx.moveTo(l, n);
    ctx.lineTo(n, l);
    ctx.lineTo(w - l, n);
    ctx.lineTo(w * 0.65, n);
    ctx.lineTo(w * 0.65, h - l);
    ctx.lineTo(w * 0.35, h - l);
    ctx.lineTo(w * 0.35, n);
    ctx.closePath();
    ctx.fill();
};

SymbolMorph.prototype.renderSymbolArrowUpOutline = function (ctx, color) {
    // draw an up arrow
    var w = this.symbolWidth(),
        h = this.size,
        n = w / 2,
        l = Math.max(w / 20, 0.5);

    ctx.strokeStyle = color.toString();
    ctx.lineWidth = l * 2;
    ctx.beginPath();
    ctx.moveTo(l, n);
    ctx.lineTo(n, l);
    ctx.lineTo(w - l, n);
    ctx.lineTo(w * 0.65, n);
    ctx.lineTo(w * 0.65, h - l);
    ctx.lineTo(w * 0.35, h - l);
    ctx.lineTo(w * 0.35, n);
    ctx.closePath();
    ctx.stroke();
};

SymbolMorph.prototype.renderSymbolArrowUpThin = function (ctx, color) {
    // draw a thin up arrow
    var w = this.symbolWidth(),
        h = this.size,
        n = w / 3,
        l = Math.max(w / 20, 0.5);

    ctx.strokeStyle = color.toString();
    ctx.lineWidth = l * 2;
    ctx.beginPath();
    ctx.moveTo(w - n, n);
    ctx.lineTo(w / 2, l * 2);
    ctx.lineTo(n, n);
    ctx.moveTo(w / 2, l * 2);
    ctx.lineTo(w / 2, h - l);
    ctx.stroke();
};

SymbolMorph.prototype.renderSymbolArrowUpDownThin = function (ctx, color) {
    // draw a thin up-down arrow
    var w = this.symbolWidth(),
        h = this.size,
        n = w / 3,
        l = Math.max(w / 20, 0.5);

    ctx.strokeStyle = color.toString();
    ctx.lineWidth = l * 2;
    ctx.beginPath();
    ctx.moveTo(w - n, n);
    ctx.lineTo(w / 2, l * 2);
    ctx.lineTo(n, n);
    ctx.moveTo(w - n, h - n);
    ctx.lineTo(w / 2, h - l * 2);
    ctx.lineTo(n, h - n);
    ctx.moveTo(w / 2, l * 2);
    ctx.lineTo(w / 2, h - l * 2);
    ctx.stroke();
};

SymbolMorph.prototype.renderSymbolArrowDown = function (ctx, color) {
    // draw a down arrow
    var w = this.symbolWidth();
    ctx.save();
    ctx.translate(w, w);
    ctx.rotate(radians(180));
    this.renderSymbolArrowUp(ctx, color);
    ctx.restore();
};

SymbolMorph.prototype.renderSymbolArrowDownOutline = function (ctx, color) {
    // draw a down arrow
    var w = this.symbolWidth();
    ctx.save();
    ctx.translate(w, w);
    ctx.rotate(radians(180));
    this.renderSymbolArrowUpOutline(ctx, color);
    ctx.restore();
};

SymbolMorph.prototype.renderSymbolArrowDownThin = function (ctx, color) {
    // draw a thin down arrow
    var w = this.symbolWidth();
    ctx.save();
    ctx.translate(w, w);
    ctx.rotate(radians(180));
    this.renderSymbolArrowUpThin(ctx, color);
    ctx.restore();
};

SymbolMorph.prototype.renderSymbolArrowLeft = function (ctx, color) {
    // draw a left arrow
    var w = this.symbolWidth();
    ctx.save();
    ctx.translate(0, w);
    ctx.rotate(radians(-90));
    this.renderSymbolArrowUp(ctx, color);
    ctx.restore();
};

SymbolMorph.prototype.renderSymbolArrowLeftOutline = function (ctx, color) {
    // draw a left arrow
    var w = this.symbolWidth();
    ctx.save();
    ctx.translate(0, w);
    ctx.rotate(radians(-90));
    this.renderSymbolArrowUpOutline(ctx, color);
    ctx.restore();
};

SymbolMorph.prototype.renderSymbolArrowLeftThin = function (ctx, color) {
    // draw a thin left arrow
    var w = this.symbolWidth();
    ctx.save();
    ctx.translate(0, w);
    ctx.rotate(radians(-90));
    this.renderSymbolArrowUpThin(ctx, color);
    ctx.restore();
};

SymbolMorph.prototype.renderSymbolArrowLeftRightThin = function (ctx, color) {
    // draw a thin left-right arrow
    var w = this.symbolWidth();
    ctx.save();
    ctx.translate(0, w);
    ctx.rotate(radians(-90));
    this.renderSymbolArrowUpDownThin(ctx, color);
    ctx.restore();
};

SymbolMorph.prototype.renderSymbolArrowRight = function (ctx, color) {
    // draw a right arrow
    var w = this.symbolWidth();
    ctx.save();
    ctx.translate(w, 0);
    ctx.rotate(radians(90));
    this.renderSymbolArrowUp(ctx, color);
    ctx.restore();
};

SymbolMorph.prototype.renderSymbolArrowRightOutline = function (ctx, color) {
    // draw a right arrow
    var w = this.symbolWidth();
    ctx.save();
    ctx.translate(w, 0);
    ctx.rotate(radians(90));
    this.renderSymbolArrowUpOutline(ctx, color);
    ctx.restore();
};

SymbolMorph.prototype.renderSymbolArrowRightThin = function (ctx, color) {
    // draw a thin right arrow
    var w = this.symbolWidth();
    ctx.save();
    ctx.translate(w, 0);
    ctx.rotate(radians(90));
    this.renderSymbolArrowUpThin(ctx, color);
    ctx.restore();
};

SymbolMorph.prototype.renderSymbolRobot = function (ctx, color) {
    // draw a humanoid robot
    var w = this.symbolWidth(),
        h = this.size,
        n = w / 6,
        n2 = n / 2,
        l = Math.max(w / 20, 0.5);

    ctx.fillStyle = color.toString();
    //ctx.lineWidth = l * 2;

    ctx.beginPath();
    ctx.moveTo(n + l, n);
    ctx.lineTo(n * 2, n);
    ctx.lineTo(n * 2.5, n * 1.5);
    ctx.lineTo(n * 3.5, n * 1.5);
    ctx.lineTo(n * 4, n);
    ctx.lineTo(n * 5 - l, n);
    ctx.lineTo(n * 4, n * 3);
    ctx.lineTo(n * 4, n * 4 - l);
    ctx.lineTo(n * 2, n * 4 - l);
    ctx.lineTo(n * 2, n * 3);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(n * 2.75, n + l);
    ctx.lineTo(n * 2.4, n);
    ctx.lineTo(n * 2.2, 0);
    ctx.lineTo(n * 3.8, 0);
    ctx.lineTo(n * 3.6, n);
    ctx.lineTo(n * 3.25, n + l);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(n * 2.5, n * 4);
    ctx.lineTo(n, n * 4);
    ctx.lineTo(n2 + l, h);
    ctx.lineTo(n * 2, h);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(n * 3.5, n * 4);
    ctx.lineTo(n * 5, n * 4);
    ctx.lineTo(w - (n2 + l), h);
    ctx.lineTo(n * 4, h);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(n, n);
    ctx.lineTo(l, n * 1.5);
    ctx.lineTo(l, n * 3.25);
    ctx.lineTo(n * 1.5, n * 3.5);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(n * 5, n);
    ctx.lineTo(w - l, n * 1.5);
    ctx.lineTo(w - l, n * 3.25);
    ctx.lineTo(n * 4.5, n * 3.5);
    ctx.closePath();
    ctx.fill();
};

SymbolMorph.prototype.renderSymbolMagnifyingGlass = function (ctx, color) {
    // draw a magnifying glass
    var w = this.symbolWidth(),
        h = this.size,
        gradient,
        r = w * 0.3,
        x = w * 2 / 3 - Math.sqrt(r),
        y = h / 3 + Math.sqrt(r),
        l = Math.max(w / 5, 0.5);

    ctx.strokeStyle = color.toString();

    gradient = ctx.createRadialGradient(
        x,
        y,
        0,
        x + r,
        y + r,
        w
    );

    gradient.addColorStop(0, color.inverted().lighter(50).toString());
    gradient.addColorStop(1, color.inverted().darker(25).toString());
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, r, radians(0), radians(360), false);
    ctx.fill();

    ctx.lineWidth = l / 2;
    ctx.beginPath();
    ctx.arc(x, y, r, radians(0), radians(360), false);
    ctx.stroke();

    ctx.lineWidth = l;
    ctx.beginPath();
    ctx.moveTo(l / 2, h - l / 2);
    ctx.lineTo(x - Math.sqrt(r + l), y + Math.sqrt(r + l));
    ctx.closePath();
    ctx.stroke();
};

SymbolMorph.prototype.renderSymbolMagnifierOutline = function (ctx, color) {
    // draw a magnifying glass
    var w = this.symbolWidth(),
        h = this.size,
        r = w * 0.3,
        x = w * 2 / 3 - Math.sqrt(r),
        y = h / 3 + Math.sqrt(r),
        l = Math.max(w / 5, 0.5);

    ctx.strokeStyle = color.toString();

    ctx.lineWidth = l * 0.5;
    ctx.beginPath();
    ctx.arc(x, y, r, radians(0), radians(360), false);
    ctx.stroke();

    ctx.lineWidth = l;
    ctx.beginPath();
    ctx.moveTo(l / 2, h - l / 2);
    ctx.lineTo(x - Math.sqrt(r + l), y + Math.sqrt(r + l));
    ctx.closePath();
    ctx.stroke();
};


SymbolMorph.prototype.renderSymbolSelection = function (ctx, color) {
    // draw a filled arrow and a dashed rectangle
    var w = this.symbolWidth(),
        h = this.size;

    ctx.save();
    ctx.setLineDash([3]);
    this.renderSymbolRectangle(ctx, color);
    ctx.restore();

    ctx.save();
    ctx.fillStyle = color.toString();
    ctx.translate(0.7 * w, 0.4 * h);
    ctx.scale(0.5, 0.5);
    ctx.rotate(radians(135));
    this.renderSymbolArrowDownOutline(ctx, color);
    ctx.fill();
    ctx.restore();
};

SymbolMorph.prototype.renderSymbolOctagonOutline = function (ctx, color) {
    // draw an octagon
    var side = this.symbolWidth(),
        vert = (side - (side * 0.383)) / 2,
        l = Math.max(side / 20, 0.5);

    ctx.strokeStyle = color.toString();
    ctx.lineWidth = l * 2;
    ctx.beginPath();
    ctx.moveTo(vert, l);
    ctx.lineTo(side - vert, l);
    ctx.lineTo(side - l, vert);
    ctx.lineTo(side - l, side - vert);
    ctx.lineTo(side - vert, side - l);
    ctx.lineTo(vert, side - l);
    ctx.lineTo(l, side - vert);
    ctx.lineTo(l, vert);
    ctx.closePath();
    ctx.stroke();
};

SymbolMorph.prototype.renderSymbolClosedBrushPath =
	SymbolMorph.prototype.renderSymbolCloudOutline;

SymbolMorph.prototype.renderSymbolNotes = function (ctx, color) {
    // draw two musical notes
    var size = this.symbolWidth(),
        r = size / 6,
        l = Math.max(r / 3, 1);

    ctx.strokeStyle = color.toString();
    ctx.fillStyle = color.toString();

    ctx.beginPath();
    ctx.arc(r, size - r, r, radians(0), radians(360), false);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(size - r, size - (r * 2), r, radians(0), radians(360), false);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(r * 2 - l, r);
    ctx.lineTo(size, 0);
    ctx.lineTo(size, r);
    ctx.lineTo(r * 2 - l, r * 2);
    ctx.closePath();
    ctx.fill();

    ctx.lineWidth = l;
    ctx.beginPath();
    ctx.moveTo(r * 2 - (l / 2), size - r);
    ctx.lineTo(r * 2 - (l / 2), r + l);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(size - (l / 2), size - (r * 2));
    ctx.lineTo(size - (l / 2), l);
    ctx.stroke();
};

SymbolMorph.prototype.renderSymbolCamera = function (ctx, color) {
    // draw a camera
    var w = this.symbolWidth(),
        h = this.size,
        r = w * 0.16,
        l = Math.max(w / 20, 0.5);

    ctx.lineWidth = l * 2;

    // camera body
    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.moveTo(l, h * 5 / 6);
    ctx.lineTo(w - l, h * 5 / 6);
    ctx.lineTo(w - l, h / 4);
    ctx.lineTo(w * 3 / 4 , h / 4);
    ctx.lineTo(w * 5 / 8 , l);
    ctx.lineTo(w * 3 / 8 , l);
    ctx.lineTo(w / 4 , h / 4);
    ctx.lineTo(l , h / 4);
    ctx.lineTo(l, h * 5 / 6);

    // camera lens
    ctx.arc(w / 2, h / 2, r, radians(0), radians(360), false);

    ctx.clip();
    ctx.fillRect(0, 0, w, h);
};

SymbolMorph.prototype.renderSymbolLocation = function (ctx, color) {
    // draw a map pin
    var w = this.symbolWidth(),
        h = this.size,
        r = w / 2;

    // pin
    ctx.fillStyle = color.toString();
    ctx.beginPath();

    ctx.moveTo(0, r);
    ctx.arc(r, r, r, radians(-180), radians(0), false);
    ctx.lineTo(r, h);
    ctx.lineTo(0, r);

    // hole
    ctx.arc(r, r, r * 0.5, radians(0), radians(360), false);

    ctx.clip('evenodd');
    ctx.fillRect(0, 0, w, h);
};

SymbolMorph.prototype.renderSymbolFootprints = function (ctx, color) {
    // draw a pair of (shoe) footprints
    var w = this.symbolWidth(),
        u = w / 10,
        r = u * 1.5;

    ctx.fillStyle = color.toString();

    // left shoe
    // tip
    ctx.beginPath();
    ctx.arc(r, r, r, radians(-200), radians(0), false);
    ctx.lineTo(r * 2, u * 5.5);
    ctx.lineTo(u, u * 6);
    ctx.closePath();
    ctx.fill();
    // heel
    ctx.beginPath();
    ctx.arc(u * 2.25, u * 6.75, u , radians(-40), radians(-170), false);
    ctx.closePath();
    ctx.fill();

    // right shoe
    // tip
    ctx.beginPath();
    ctx.arc(w - r, u * 4.5, r, radians(-180), radians(20), false);
    ctx.lineTo(w - u, u * 8.5);
    ctx.lineTo(w - (r * 2), u * 8);
    ctx.closePath();
    ctx.fill();
    // heel
    ctx.beginPath();
    ctx.arc(w - (u * 2.25), u * 9, u, radians(0), radians(-150), false);
    ctx.closePath();
    ctx.fill();
};

SymbolMorph.prototype.renderSymbolKeyboard = function (ctx, color) {
    // draw a typing keyboard
    var h = this.size,
        u = h / 10,
        k = h / 5,
        row, col;

    ctx.fillStyle = color.toString();
    for (row = 0; row < 2; row += 1) {
		for (col = 0; col < 5; col += 1) {
			ctx.fillRect(
      			((u + k) * col) + u,
          		((u + k) * row) + u,
           		k,
           		k
			);
   		}
  	}
	ctx.fillRect(u * 4, u * 7, k * 4, k);
};

SymbolMorph.prototype.renderSymbolKeyboardFilled = function (ctx, color) {
    // draw a typing keyboard
    var w = this.symbolWidth(),
        h = this.size,
        u = h / 10,
        k = h / 5,
        row, col;

    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.rect(0, 0, w, h);
    for (row = 0; row < 2; row += 1) {
        for (col = 0; col < 5; col += 1) {
            ctx.rect(
                  ((u + k) * col) + u,
                  ((u + k) * row) + u,
                   k,
                   k
            );
           }
      }
    ctx.rect(u * 4, u * 7, k * 4, k);

    ctx.clip('evenodd');
    ctx.fillRect(0, 0, w, h);
};

SymbolMorph.prototype.renderSymbolGlobeBig = function (ctx, color) {
    this.renderSymbolGlobe(ctx, color, true);
};

SymbolMorph.prototype.renderSymbolGlobe = function (ctx, color, detailed) {
    // draw a stylized globe
    var w = this.symbolWidth(),
        l = Math.max(w / 30, 0.5);

    ctx.strokeStyle = color.toString();
    ctx.lineWidth = l * 2;

    ctx.beginPath();
    ctx.arc(w / 2, w / 2, w / 2 - l, radians(0), radians(360), false);
    ctx.stroke();

    if (detailed) {
        ctx.moveTo(l * 3, w * 0.3);
        ctx.lineTo(w - l * 3, w * 0.3);
        ctx.stroke();
        ctx.moveTo(l * 3, w * 0.7);
        ctx.lineTo(w - l * 3, w * 0.7);
        ctx.stroke();
    }
    
    // single line version, looks better when small:
    ctx.beginPath();
    ctx.moveTo(l, w / 2);
    ctx.lineTo(w - l, w / 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(w / 2, l / 2);
    ctx.arcTo(0, w / 2, w / 2, w, w * 0.75);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(w / 2, l / 2);
    ctx.arcTo(w, w / 2, w / 2, w, w * 0.75);
    ctx.stroke();
};

SymbolMorph.prototype.renderSymbolList = function (ctx, color) {
    // draw a stylized list
    var w = this.symbolWidth(),
        h = this.size,
        padding = h / 10,
        item = h / 5,
        row;

    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.rect(0, 0, w, h);
    for (row = 0; row < 4; row += 1) {
        ctx.rect(
            padding,
            ((padding + item) * row) + padding,
            w - item,
            item
        );
    }
    ctx.clip('evenodd');
    ctx.fillRect(0, 0, w, h);
};

SymbolMorph.prototype.renderSymbolFlipHorizontal = function (ctx, color) {
    var w = this.symbolWidth(),
        h = this.size,
        c = w / 2,
        off = w / 15;
    
    ctx.strokeStyle = color.toString();
    ctx.lineWidth = w / 15;
    ctx.beginPath();
    ctx.moveTo(0 + off, h - off / 2);
    ctx.lineTo(c - off * 1.2, h - off / 2);
    ctx.lineTo(c - off * 1.2, off * 2);
    ctx.closePath();
    ctx.stroke();
    
    ctx.fillStyle = color.toString();
    ctx.lineWidth = w / 15;
    ctx.beginPath();
    ctx.moveTo(w - off, h - off / 2);
    ctx.lineTo(c + off * 1.2, h - off / 2);
    ctx.lineTo(c + off * 1.2, off * 2);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    };
    
SymbolMorph.prototype.renderSymbolFlipVertical = function (ctx, color) {
    ctx.translate(0, this.size);
    ctx.rotate(radians(-90));
    this.renderSymbolFlipHorizontal(ctx, color);
};


/*
// register examples with the World demo menu
// comment out to shave off a millisecond loading speed ;-)

(function () {
    var bright = new Color(240, 240, 240),
        dark = new Color(20, 20, 20),
        offset = new Point(-1, -1);
       
    SymbolMorph.prototype.addToDemoMenu([
        'Symbols',
        SymbolMorph.prototype.names.map(sym => [
            new SymbolMorph(
                sym,
                30,
                bright,
                offset,
                dark
            ),
            sym
        ])
    ]);
})();
*/
