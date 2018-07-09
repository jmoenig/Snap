/*

    symbols.js

    graphical GUI-symbols for for morphic.js and Snap!

    written by Jens Mönig
    jens@moenig.org

    Copyright (C) 2018 by Jens Mönig

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


    prerequisites:
    --------------
    additional symbols have been contributed by members of the Snap!
    open-source community, especially by Bernat Romagosa

*/

/*global modules, Morph, Point, newCanvas, Costume, radians, Color*/

// Global stuff ////////////////////////////////////////////////////////

modules.symbols = '2018-June-05';

var SymbolMorph;

/*
WorldMorph.prototype.customMorphs = function () {
    // add examples to the world's demo menu

    return [
        new SymbolMorph(
            'keyboardFilled',
            50,
            new Color(250, 250, 250),
            new Point(-1, -1),
            new Color(20, 20, 20)
        )
    ];
};
*/

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
    'file',
    'fullScreen',
    'normalScreen',
    'smallStage',
    'normalStage',
    'turtle',
    'stage',
    'turtleOutline',
    'pause',
    'flag',
    'octagon',
    'cloud',
    'cloudOutline',
    'cloudGradient',
    'turnRight',
    'turnLeft',
    'storage',
    'poster',
    'flash',
    'brush',
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
    'turnBack',
    'turnForward',
    'arrowUp',
    'arrowUpOutline',
    'arrowLeft',
    'arrowLeftOutline',
    'arrowDown',
    'arrowDownOutline',
    'arrowRight',
    'arrowRightOutline',
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
    'keyboardFilled'
];

// SymbolMorph instance creation:

function SymbolMorph(name, size, color, shadowOffset, shadowColor) {
    this.init(name, size, color, shadowOffset, shadowColor);
}

SymbolMorph.prototype.init = function (
    name, // or costume
    size,
    color,
    shadowOffset,
    shadowColor
) {
    this.isProtectedLabel = false; // participate in zebraing
    this.isReadOnly = true;
    this.name = name || 'square'; // can also be a costume
    this.size = size || ((size === 0) ? 0 : 50);
    this.shadowOffset = shadowOffset || new Point(0, 0);
    this.shadowColor = shadowColor || null;

    SymbolMorph.uber.init.call(this, true); // silently
    this.color = color || new Color(0, 0, 0);
    this.drawNew();
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

// SymbolMorph displaying:

SymbolMorph.prototype.drawNew = function () {
    var ctx, x, y, sx, sy;
    this.image = newCanvas(new Point(
        this.symbolWidth() + Math.abs(this.shadowOffset.x),
        this.size + Math.abs(this.shadowOffset.y)
    ));
    this.silentSetWidth(this.image.width);
    this.silentSetHeight(this.image.height);
    ctx = this.image.getContext('2d');
    sx = this.shadowOffset.x < 0 ? 0 : this.shadowOffset.x;
    sy = this.shadowOffset.y < 0 ? 0 : this.shadowOffset.y;
    x = this.shadowOffset.x < 0 ? Math.abs(this.shadowOffset.x) : 0;
    y = this.shadowOffset.y < 0 ? Math.abs(this.shadowOffset.y) : 0;
    if (this.shadowColor) {
        ctx.drawImage(
            this.symbolCanvasColored(this.shadowColor),
            sx,
            sy
        );
    }
    ctx.drawImage(
        this.symbolCanvasColored(this.color),
        x,
        y
    );
};

SymbolMorph.prototype.symbolCanvasColored = function (aColor) {
    // private
    if (this.name instanceof Costume) {
        return this.name.thumbnail(new Point(this.symbolWidth(), this.size));
    }

    var canvas = newCanvas(new Point(this.symbolWidth(), this.size));

    switch (this.name) {
    case 'square':
        return this.drawSymbolStop(canvas, aColor);
    case 'pointRight':
        return this.drawSymbolPointRight(canvas, aColor);
    case 'stepForward':
        return this.drawSymbolStepForward(canvas, aColor);
    case 'gears':
        return this.drawSymbolGears(canvas, aColor);
    case 'file':
        return this.drawSymbolFile(canvas, aColor);
    case 'fullScreen':
        return this.drawSymbolFullScreen(canvas, aColor);
    case 'normalScreen':
        return this.drawSymbolNormalScreen(canvas, aColor);
    case 'smallStage':
        return this.drawSymbolSmallStage(canvas, aColor);
    case 'normalStage':
        return this.drawSymbolNormalStage(canvas, aColor);
    case 'turtle':
        return this.drawSymbolTurtle(canvas, aColor);
    case 'stage':
        return this.drawSymbolStop(canvas, aColor);
    case 'turtleOutline':
        return this.drawSymbolTurtleOutline(canvas, aColor);
    case 'pause':
        return this.drawSymbolPause(canvas, aColor);
    case 'flag':
        return this.drawSymbolFlag(canvas, aColor);
    case 'octagon':
        return this.drawSymbolOctagon(canvas, aColor);
    case 'cloud':
        return this.drawSymbolCloud(canvas, aColor);
    case 'cloudOutline':
        return this.drawSymbolCloudOutline(canvas, aColor);
    case 'cloudGradient':
        return this.drawSymbolCloudGradient(canvas, aColor);
    case 'turnRight':
        return this.drawSymbolTurnRight(canvas, aColor);
    case 'turnLeft':
        return this.drawSymbolTurnLeft(canvas, aColor);
    case 'storage':
        return this.drawSymbolStorage(canvas, aColor);
    case 'poster':
        return this.drawSymbolPoster(canvas, aColor);
    case 'flash':
        return this.drawSymbolFlash(canvas, aColor);
    case 'brush':
        return this.drawSymbolBrush(canvas, aColor);
    case 'rectangle':
        return this.drawSymbolRectangle(canvas, aColor);
    case 'rectangleSolid':
        return this.drawSymbolRectangleSolid(canvas, aColor);
    case 'circle':
        return this.drawSymbolCircle(canvas, aColor);
    case 'circleSolid':
        return this.drawSymbolCircleSolid(canvas, aColor);
    case 'ellipse':
        return this.drawSymbolCircle(canvas, aColor);
    case 'line':
        return this.drawSymbolLine(canvas, aColor);
    case 'cross':
        return this.drawSymbolCross(canvas, aColor);
    case 'crosshairs':
        return this.drawSymbolCrosshairs(canvas, aColor);
    case 'paintbucket':
        return this.drawSymbolPaintbucket(canvas, aColor);
    case 'eraser':
        return this.drawSymbolEraser(canvas, aColor);
    case 'pipette':
        return this.drawSymbolPipette(canvas, aColor);
    case 'speechBubble':
        return this.drawSymbolSpeechBubble(canvas, aColor);
    case 'speechBubbleOutline':
        return this.drawSymbolSpeechBubbleOutline(canvas, aColor);
    case 'turnBack':
        return this.drawSymbolTurnBack(canvas, aColor);
    case 'turnForward':
        return this.drawSymbolTurnForward(canvas, aColor);
    case 'arrowUp':
        return this.drawSymbolArrowUp(canvas, aColor);
    case 'arrowUpOutline':
        return this.drawSymbolArrowUpOutline(canvas, aColor);
    case 'arrowLeft':
        return this.drawSymbolArrowLeft(canvas, aColor);
    case 'arrowLeftOutline':
        return this.drawSymbolArrowLeftOutline(canvas, aColor);
    case 'arrowDown':
        return this.drawSymbolArrowDown(canvas, aColor);
    case 'arrowDownOutline':
        return this.drawSymbolArrowDownOutline(canvas, aColor);
    case 'arrowRight':
        return this.drawSymbolArrowRight(canvas, aColor);
    case 'arrowRightOutline':
        return this.drawSymbolArrowRightOutline(canvas, aColor);
    case 'robot':
        return this.drawSymbolRobot(canvas, aColor);
    case 'magnifyingGlass':
        return this.drawSymbolMagnifyingGlass(canvas, aColor);
    case 'magnifierOutline':
        return this.drawSymbolMagnifierOutline(canvas, aColor);
    case 'selection':
        return this.drawSymbolSelection(canvas, aColor);
    case 'polygon':
        return this.drawSymbolOctagonOutline(canvas, aColor);
    case 'closedBrush':
        return this.drawSymbolClosedBrushPath(canvas, aColor);
    case 'notes':
        return this.drawSymbolNotes(canvas, aColor);
    case 'camera':
        return this.drawSymbolCamera(canvas, aColor);
    case 'location':
        return this.drawSymbolLocation(canvas, aColor);
    case 'footprints':
        return this.drawSymbolFootprints(canvas, aColor);
    case 'keyboard':
        return this.drawSymbolKeyboard(canvas, aColor);
    case 'keyboardFilled':
        return this.drawSymbolKeyboardFilled(canvas, aColor);
    default:
        return canvas;
    }
};

SymbolMorph.prototype.symbolWidth = function () {
    // private
    var size = this.size;

    if (this.name instanceof Costume) {
        return (size / this.name.height()) * this.name.width();
    }
    switch (this.name) {
    case 'pointRight':
        return Math.sqrt(size * size - Math.pow(size / 2, 2));
    case 'location':
        return size * 0.6;
    case 'flash':
    case 'file':
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
    default:
        return size;
    }
};

SymbolMorph.prototype.drawSymbolStop = function (canvas, color) {
    // answer a canvas showing a vertically centered square
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = color.toString();
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    return canvas;
};

SymbolMorph.prototype.drawSymbolPointRight = function (canvas, color) {
    // answer a canvas showing a right-pointing, equilateral triangle
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(canvas.width, Math.round(canvas.height / 2));
    ctx.lineTo(0, canvas.height);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fill();
    return canvas;
};

SymbolMorph.prototype.drawSymbolStepForward = function (canvas, color) {
    // answer a canvas showing a right-pointing triangle
    // followed by a vertical bar
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(canvas.width * 0.75, Math.round(canvas.height / 2));
    ctx.lineTo(0, canvas.height);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(
        canvas.width * 0.75,
        0,
        canvas.width * 0.25,
        canvas.height
    );
    return canvas;
};

SymbolMorph.prototype.drawSymbolGears = function (canvas, color) {
    // answer a canvas showing gears
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        r = w / 2,
        e = w / 6;

    ctx.strokeStyle = color.toString();
    ctx.lineWidth = canvas.width / 7;

    ctx.beginPath();
    ctx.arc(r, r, w, radians(0), radians(360), true);
    ctx.arc(r, r, e * 1.5, radians(0), radians(360), false);
    ctx.closePath();
    ctx.clip();

    ctx.moveTo(0, r);
    ctx.lineTo(w, r);
    ctx.stroke();

    ctx.moveTo(r, 0);
    ctx.lineTo(r, w);
    ctx.stroke();

    ctx.moveTo(e, e);
    ctx.lineTo(w - e, w - e);
    ctx.stroke();

    ctx.moveTo(w - e, e);
    ctx.lineTo(e, w - e);
    ctx.stroke();

    return canvas;
};

SymbolMorph.prototype.drawSymbolFile = function (canvas, color) {
    // answer a canvas showing a page symbol
    var ctx = canvas.getContext('2d'),
        w = Math.min(canvas.width, canvas.height) / 2;

    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(w, 0);
    ctx.lineTo(w, w);
    ctx.lineTo(canvas.width, w);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = color.darker(25).toString();
    ctx.beginPath();
    ctx.moveTo(w, 0);
    ctx.lineTo(canvas.width, w);
    ctx.lineTo(w, w);
    ctx.lineTo(w, 0);
    ctx.closePath();
    ctx.fill();

    return canvas;
};

SymbolMorph.prototype.drawSymbolFullScreen = function (canvas, color) {
    // answer a canvas showing two arrows pointing diagonally outwards
    var ctx = canvas.getContext('2d'),
        h = canvas.height,
        c = canvas.width / 2,
        off = canvas.width / 20,
        w = canvas.width / 2;

    ctx.strokeStyle = color.toString();
    ctx.lineWidth = canvas.width / 5;
    ctx.moveTo(c - off, c + off);
    ctx.lineTo(0, h);
    ctx.stroke();

    ctx.strokeStyle = color.toString();
    ctx.lineWidth = canvas.width / 5;
    ctx.moveTo(c + off, c - off);
    ctx.lineTo(h, 0);
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

    return canvas;
};

SymbolMorph.prototype.drawSymbolNormalScreen = function (canvas, color) {
    // answer a canvas showing two arrows pointing diagonally inwards
    var ctx = canvas.getContext('2d'),
        h = canvas.height,
        c = canvas.width / 2,
        off = canvas.width / 20,
        w = canvas.width;

    ctx.strokeStyle = color.toString();
    ctx.lineWidth = canvas.width / 5;
    ctx.moveTo(c - off * 3, c + off * 3);
    ctx.lineTo(0, h);
    ctx.stroke();

    ctx.strokeStyle = color.toString();
    ctx.lineWidth = canvas.width / 5;
    ctx.moveTo(c + off * 3, c - off * 3);
    ctx.lineTo(h, 0);
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

    return canvas;
};

SymbolMorph.prototype.drawSymbolSmallStage = function (canvas, color) {
    // answer a canvas showing a stage toggling symbol
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        h = canvas.height,
        w2 = w / 2,
        h2 = h / 2;

    ctx.fillStyle = color.darker(40).toString();
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = color.toString();
    ctx.fillRect(w2, 0, w2, h2);

    return canvas;
};

SymbolMorph.prototype.drawSymbolNormalStage = function (canvas, color) {
    // answer a canvas showing a stage toggling symbol
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        h = canvas.height,
        w2 = w / 2,
        h2 = h / 2;

    ctx.fillStyle = color.toString();
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = color.darker(25).toString();
    ctx.fillRect(w2, 0, w2, h2);

    return canvas;
};

SymbolMorph.prototype.drawSymbolTurtle = function (canvas, color) {
    // answer a canvas showing a turtle
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.lineTo(0, canvas.height);
    ctx.lineTo(canvas.height / 2, canvas.height / 2);
    ctx.closePath();
    ctx.fill();
    return canvas;
};

SymbolMorph.prototype.drawSymbolTurtleOutline = function (canvas, color) {
    // answer a canvas showing a turtle
    var ctx = canvas.getContext('2d');

    ctx.strokeStyle = color.toString();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.lineTo(0, canvas.height);
    ctx.lineTo(canvas.height / 2, canvas.height / 2);
    ctx.closePath();
    ctx.stroke();

    return canvas;
};

SymbolMorph.prototype.drawSymbolPause = function (canvas, color) {
    // answer a canvas showing two parallel rectangles
    var ctx = canvas.getContext('2d'),
        w = canvas.width / 5;

    ctx.fillStyle = color.toString();
    ctx.fillRect(0, 0, w * 2, canvas.height);
    ctx.fillRect(w * 3, 0, w * 2, canvas.height);
    return canvas;
};

SymbolMorph.prototype.drawSymbolFlag = function (canvas, color) {
    // answer a canvas showing a flag
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        l = Math.max(w / 12, 1),
        h = canvas.height;

    ctx.lineWidth = l;
    ctx.strokeStyle = color.toString();
    ctx.beginPath();
    ctx.moveTo(l / 2, 0);
    ctx.lineTo(l / 2, canvas.height);
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

    return canvas;
};

SymbolMorph.prototype.drawSymbolOctagon = function (canvas, color) {
    // answer a canvas showing an octagon
    var ctx = canvas.getContext('2d'),
        side = canvas.width,
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

    return canvas;
};

SymbolMorph.prototype.drawSymbolCloud = function (canvas, color) {
    // answer a canvas showing an cloud
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        h = canvas.height,
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

    return canvas;
};

SymbolMorph.prototype.drawSymbolCloudGradient = function (canvas, color) {
    // answer a canvas showing an cloud
    var ctx = canvas.getContext('2d'),
        gradient,
        w = canvas.width,
        h = canvas.height,
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

    return canvas;
};

SymbolMorph.prototype.drawSymbolCloudOutline = function (canvas, color) {
    // answer a canvas showing an cloud
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        h = canvas.height,
        r1 = h * 2 / 5,
        r2 = h / 4,
        r3 = h * 3 / 10,
        r4 = h / 5;

    ctx.strokeStyle = color.toString();
    ctx.beginPath();
    ctx.arc(r2 + 1, h - r2 - 1, r2, radians(90), radians(259), false);
    ctx.arc(w / 20 * 5, h / 9 * 4, r4, radians(165), radians(300), false);
    ctx.arc(w / 20 * 11, r1 + 1, r1, radians(200), radians(357), false);
    ctx.arc(w - r3 - 1, h - r3 - 1, r3, radians(269), radians(90), false);
    ctx.closePath();
    ctx.stroke();

    return canvas;
};

SymbolMorph.prototype.drawSymbolTurnRight = function (canvas, color) {
    // answer a canvas showing a right-turning arrow
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
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

    return canvas;
};

SymbolMorph.prototype.drawSymbolTurnLeft = function (canvas, color) {
    // answer a canvas showing a left-turning arrow
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
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

    return canvas;
};

SymbolMorph.prototype.drawSymbolStorage = function (canvas, color) {
    // answer a canvas showing a stack of three disks
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        h = canvas.height,
        r = canvas.height,
        unit = canvas.height / 11;

    function drawDisk(bottom, fillTop) {
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

        if (fillTop) {
            ctx.arc(
                w / 2,
                bottom - h - unit * 2,
                r,
                radians(120),
                radians(60),
                true
            );
        }

        ctx.arc(
            w / 2,
            bottom + unit * 6 + 1,
            r,
            radians(60),
            radians(120),
            true
        );
        ctx.closePath();

        if (fillTop) {
            ctx.fill();
        } else {
            ctx.stroke();
        }
    }

    ctx.strokeStyle = color.toString();
    drawDisk(h);
    drawDisk(h - unit * 3);
    drawDisk(h - unit * 6, false);
    return canvas;
};

SymbolMorph.prototype.drawSymbolPoster = function (canvas, color) {
    // answer a canvas showing a poster stand
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        h = canvas.height,
        bottom = h * 0.75,
        edge = canvas.height / 5;

    ctx.fillStyle = color.toString();
    ctx.strokeStyle = color.toString();

    ctx.lineWidth = w / 15;
    ctx.moveTo(w / 2, h / 3);
    ctx.lineTo(w / 6, h);
    ctx.stroke();

    ctx.moveTo(w / 2, h / 3);
    ctx.lineTo(w / 2, h);
    ctx.stroke();

    ctx.moveTo(w / 2, h / 3);
    ctx.lineTo(w * 5 / 6, h);
    ctx.stroke();

    ctx.fillRect(0, 0, w, bottom);
    ctx.clearRect(0, bottom, w, w / 20);

    ctx.clearRect(w - edge, bottom - edge, edge + 1, edge + 1);

    ctx.fillStyle = color.darker(25).toString();
    ctx.beginPath();
    ctx.moveTo(w, bottom - edge);
    ctx.lineTo(w - edge, bottom - edge);
    ctx.lineTo(w - edge, bottom);
    ctx.closePath();
    ctx.fill();

    return canvas;
};

SymbolMorph.prototype.drawSymbolFlash = function (canvas, color) {
    // answer a canvas showing a flash
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        w3 = w / 3,
        h = canvas.height,
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
    return canvas;
};

SymbolMorph.prototype.drawSymbolBrush = function (canvas, color) {
    // answer a canvas showing a paintbrush
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        h = canvas.height,
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

    return canvas;
};

SymbolMorph.prototype.drawSymbolRectangle = function (canvas, color) {
    // answer a canvas showing a rectangle
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        h = canvas.width,
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
    return canvas;
};

SymbolMorph.prototype.drawSymbolRectangleSolid = function (canvas, color) {
    // answer a canvas showing a solid rectangle
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        h = canvas.width;

    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(w, 0);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();
    return canvas;
};

SymbolMorph.prototype.drawSymbolCircle = function (canvas, color) {
    // answer a canvas showing a circle
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        l = Math.max(w / 20, 0.5);

    ctx.strokeStyle = color.toString();
    ctx.lineWidth = l * 2;
    ctx.arc(w / 2, w / 2, w / 2 - l, radians(0), radians(360), false);
    ctx.stroke();
    return canvas;
};

SymbolMorph.prototype.drawSymbolCircleSolid = function (canvas, color) {
    // answer a canvas showing a solid circle
    var ctx = canvas.getContext('2d'),
        w = canvas.width;

    ctx.fillStyle = color.toString();
    ctx.arc(w / 2, w / 2, w / 2, radians(0), radians(360), false);
    ctx.fill();
    return canvas;
};

SymbolMorph.prototype.drawSymbolLine = function (canvas, color) {
    // answer a canvas showing a plus sign cross
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        h = canvas.height,
        l = Math.max(w / 20, 0.5);

    ctx.strokeStyle = color.toString();
    ctx.lineWidth = l * 2;
    ctx.lineCap = 'round';
    ctx.moveTo(l, l);
    ctx.lineTo(w - l, h - l);
    ctx.stroke();
    return canvas;
};

SymbolMorph.prototype.drawSymbolCross = function (canvas, color) {
    // answer a canvas showing a diagonal line
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        l = Math.max(w / 20, 0.5);

    ctx.strokeStyle = color.toString();
    ctx.lineWidth = l * 2;
    ctx.lineCap = 'round';
    ctx.moveTo(l, w / 2);
    ctx.lineTo(w - l, w / 2);
    ctx.stroke();
    ctx.moveTo(w / 2, l);
    ctx.lineTo(w / 2, w - l);
    ctx.stroke();
    return canvas;
};

SymbolMorph.prototype.drawSymbolCrosshairs = function (canvas, color) {
    // answer a canvas showing a crosshairs
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        h = canvas.height,
        l = 0.5;

    ctx.strokeStyle = color.toString();
    ctx.lineWidth = l * 2;
    ctx.moveTo(l, h / 2);
    ctx.lineTo(w - l, h / 2);
    ctx.stroke();
    ctx.moveTo(w / 2, l);
    ctx.lineTo(w / 2, h - l);
    ctx.stroke();
    ctx.moveTo(w / 2, h / 2);
    ctx.arc(w / 2, w / 2, w / 3 - l, radians(0), radians(360), false);
    ctx.stroke();
    return canvas;
};

SymbolMorph.prototype.drawSymbolPaintbucket = function (canvas, color) {
    // answer a canvas showing a paint bucket
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        h = canvas.height,
        n = canvas.width / 5,
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

    return canvas;
};

SymbolMorph.prototype.drawSymbolEraser = function (canvas, color) {
    // answer a canvas showing an eraser
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        h = canvas.height,
        n = canvas.width / 4,
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

    return canvas;
};

SymbolMorph.prototype.drawSymbolPipette = function (canvas, color) {
    // answer a canvas showing an eyedropper
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        h = canvas.height,
        n = canvas.width / 4,
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

    return canvas;
};

SymbolMorph.prototype.drawSymbolSpeechBubble = function (canvas, color) {
    // answer a canvas showing a speech bubble
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        h = canvas.height,
        n = canvas.width / 3,
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
    return canvas;
};

SymbolMorph.prototype.drawSymbolSpeechBubbleOutline = function (
    canvas,
    color
) {
    // answer a canvas showing a speech bubble
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        h = canvas.height,
        n = canvas.width / 3,
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
    return canvas;
};

SymbolMorph.prototype.drawSymbolTurnBack = function (canvas, aColor) {
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        h = canvas.height,
        w2 = canvas.width / 2,
        h2 = canvas.height / 2,
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
    return canvas;
};

SymbolMorph.prototype.drawSymbolTurnForward = function (canvas, aColor) {
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        h = canvas.height,
        w2 = canvas.width / 2,
        h2 = canvas.height / 2,
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
    return canvas;
};

SymbolMorph.prototype.drawSymbolArrowUp = function (canvas, color) {
    // answer a canvas showing an up arrow
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        h = canvas.height,
        n = canvas.width / 2,
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
    return canvas;
};

SymbolMorph.prototype.drawSymbolArrowUpOutline = function (canvas, color) {
    // answer a canvas showing an up arrow
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        h = canvas.height,
        n = canvas.width / 2,
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
    return canvas;
};

SymbolMorph.prototype.drawSymbolArrowDown = function (canvas, color) {
    // answer a canvas showing a down arrow
    var ctx = canvas.getContext('2d'),
        w = canvas.width;
    ctx.save();
    ctx.translate(w, w);
    ctx.rotate(radians(180));
    this.drawSymbolArrowUp(canvas, color);
    ctx.restore();
    return canvas;
};

SymbolMorph.prototype.drawSymbolArrowDownOutline = function (canvas, color) {
    // answer a canvas showing a down arrow
    var ctx = canvas.getContext('2d'),
        w = canvas.width;
    ctx.save();
    ctx.translate(w, w);
    ctx.rotate(radians(180));
    this.drawSymbolArrowUpOutline(canvas, color);
    ctx.restore();
    return canvas;
};

SymbolMorph.prototype.drawSymbolArrowLeft = function (canvas, color) {
    // answer a canvas showing a left arrow
    var ctx = canvas.getContext('2d'),
        w = canvas.width;
    ctx.save();
    ctx.translate(0, w);
    ctx.rotate(radians(-90));
    this.drawSymbolArrowUp(canvas, color);
    ctx.restore();
    return canvas;
};

SymbolMorph.prototype.drawSymbolArrowLeftOutline = function (canvas, color) {
    // answer a canvas showing a left arrow
    var ctx = canvas.getContext('2d'),
        w = canvas.width;
    ctx.save();
    ctx.translate(0, w);
    ctx.rotate(radians(-90));
    this.drawSymbolArrowUpOutline(canvas, color);
    ctx.restore();
    return canvas;
};

SymbolMorph.prototype.drawSymbolArrowRight = function (canvas, color) {
    // answer a canvas showing a right arrow
    var ctx = canvas.getContext('2d'),
        w = canvas.width;
    ctx.save();
    ctx.translate(w, 0);
    ctx.rotate(radians(90));
    this.drawSymbolArrowUp(canvas, color);
    ctx.restore();
    return canvas;
};

SymbolMorph.prototype.drawSymbolArrowRightOutline = function (canvas, color) {
    // answer a canvas showing a right arrow
    var ctx = canvas.getContext('2d'),
        w = canvas.width;
    ctx.save();
    ctx.translate(w, 0);
    ctx.rotate(radians(90));
    this.drawSymbolArrowUpOutline(canvas, color);
    ctx.restore();
    return canvas;
};

SymbolMorph.prototype.drawSymbolRobot = function (canvas, color) {
    // answer a canvas showing a humanoid robot
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        h = canvas.height,
        n = canvas.width / 6,
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

    return canvas;
};

SymbolMorph.prototype.drawSymbolMagnifyingGlass = function (canvas, color) {
    // answer a canvas showing a magnifying glass
    var ctx = canvas.getContext('2d'),
        gradient,
        w = canvas.width,
        h = canvas.height,
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
    ctx.arc(x, y, r, radians(0), radians(360), false);
    ctx.fill();

    ctx.lineWidth = l / 2;
    ctx.arc(x, y, r, radians(0), radians(360), false);
    ctx.stroke();

    ctx.lineWidth = l;
    ctx.beginPath();
    ctx.moveTo(l / 2, h - l / 2);
    ctx.lineTo(x - Math.sqrt(r + l), y + Math.sqrt(r + l));
    ctx.closePath();
    ctx.stroke();

    return canvas;
};

SymbolMorph.prototype.drawSymbolMagnifierOutline = function (canvas, color) {
    // answer a canvas showing a magnifying glass
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        h = canvas.height,
        r = w * 0.3,
        x = w * 2 / 3 - Math.sqrt(r),
        y = h / 3 + Math.sqrt(r),
        l = Math.max(w / 5, 0.5);

    ctx.strokeStyle = color.toString();

    ctx.lineWidth = l * 0.5;
    ctx.arc(x, y, r, radians(0), radians(360), false);
    ctx.stroke();

    ctx.lineWidth = l;
    ctx.beginPath();
    ctx.moveTo(l / 2, h - l / 2);
    ctx.lineTo(x - Math.sqrt(r + l), y + Math.sqrt(r + l));
    ctx.closePath();
    ctx.stroke();

    return canvas;
};


SymbolMorph.prototype.drawSymbolSelection = function (canvas, color) {
    // answer a canvas showing a filled arrow and a dashed rectangle
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        h = canvas.height;

    ctx.save();
    ctx.setLineDash([3]);
    this.drawSymbolRectangle(canvas, color);
    ctx.restore();

    ctx.save();
    ctx.fillStyle = color.toString();
    ctx.translate(0.7 * w, 0.4 * h);
    ctx.scale(0.5, 0.5);
    ctx.rotate(radians(135));
    this.drawSymbolArrowDownOutline(canvas, color);
    ctx.fill();
    ctx.restore();

    return canvas;
};

SymbolMorph.prototype.drawSymbolOctagonOutline = function (canvas, color) {
    // answer a canvas showing an octagon
    var ctx = canvas.getContext('2d'),
        side = canvas.width,
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

    return canvas;
};

SymbolMorph.prototype.drawSymbolClosedBrushPath =
	SymbolMorph.prototype.drawSymbolCloudOutline;

SymbolMorph.prototype.drawSymbolNotes = function (canvas, color) {
    // answer a canvas showing two musical notes
    var ctx = canvas.getContext('2d'),
        size = canvas.width,
        r = size / 6,
        l = Math.max(r / 3, 1);

    ctx.strokeStyle = color.toString();
    ctx.fillStyle = color.toString();

    ctx.arc(r, size - r, r, radians(0), radians(360), false);
    ctx.fill();
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
    return canvas;
};

SymbolMorph.prototype.drawSymbolCamera = function (canvas, color) {
    // answer a canvas showing a camera
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        h = canvas.width,
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
    ctx.closePath();
    ctx.fill();

    // camera lens
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, r, radians(0), radians(360), false);
    ctx.fill();
    ctx.restore();

    return canvas;
};

SymbolMorph.prototype.drawSymbolLocation = function (canvas, color) {
    // answer a canvas showing a map pin
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        h = canvas.height,
        r = w / 2;

    // pin
    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.arc(r, r, r, radians(-210), radians(30), false);
    ctx.lineTo(r, h);
    ctx.closePath();
    ctx.fill();

    // hole
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(r, r, r * 0.5, radians(0), radians(360), false);
    ctx.closePath();
    ctx.fill();

    return canvas;
};

SymbolMorph.prototype.drawSymbolFootprints = function (canvas, color) {
    // answer a canvas showing a pair of (shoe) footprints
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
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
    return canvas;
};

SymbolMorph.prototype.drawSymbolKeyboard = function (canvas, color) {
    // answer a canvas showing a typing keyboard
    var ctx = canvas.getContext('2d'),
        h = canvas.height,
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
	return canvas;
};

SymbolMorph.prototype.drawSymbolKeyboardFilled = function (canvas, color) {
    // answer a canvas showing a typing keyboard
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        h = canvas.height,
        u = h / 10,
        k = h / 5,
        row, col;

    ctx.fillStyle = color.toString();
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'destination-out';
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
    return canvas;
};
