/*
    vectorPaint.js

    a vector paint editor for Snap!
    inspired by the Snap bitmap paint editor and the Scratch paint editor.

    written by ****
    Copyright (C) 2015 by ****

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
    needs paint.js, blocks.js, gui.js, threads.js, objects.js and morphic.js

    toc
    ---
    the following list shows the order in which all constructors are
    defined. Use this list to locate code in this document:

        VectorShape
        VectorRectangle
        VectorLine
        VectorBrush
        VectorEllipse
        VectorClosedBrushPath
        VectorPolygon
        VectorPaintEditorMorph
        VectorPaintCanvasMorph
        VectorCostume;

    credits
    -------
*/

/*global Point, Object, Rectangle, VectorCostume, Costume,
    ToggleButtonMorph, SymbolMorph, AlignmentMorph, Morph,
    PaintColorPickerMorph, Color, SliderMorph, InputFieldMorph, 
    ToggleMorph, TextMorph, Image, VectorPaintEditorMorph, newCanvas */

// Declarations 

var VectorShape;
var VectorRectangle;
var VectorLine;
var VectorBrush;
var VectorEllipse;
var VectorClosedBrushPath;
var VectorPolygon;
var VectorPaintEditorMorph;
var VectorPaintCanvasMorph;
var VectorCostume;

/* New symbolsMorph in Vector editor */
SymbolMorph.prototype.names.push('selection');
SymbolMorph.prototype.names.push('polygon');
SymbolMorph.prototype.names.push('closedBrushPath');
SymbolMorph.prototype.names.push('duplicate');

SymbolMorph.prototype.originalSymbolCanvasColored = SymbolMorph.prototype.symbolCanvasColored;
SymbolMorph.prototype.symbolCanvasColored = function (aColor) {
    var canvas = newCanvas(new Point(this.symbolWidth(), this.size));

    switch (this.name) {
        case 'selection':
            return this.drawSymbolSelection(canvas, aColor);
        case 'polygon':
            return this.drawSymbolOctagonOutline(canvas, aColor);
        case 'closedBrushPath':
            return this.drawSymbolClosedBrushPath(canvas, aColor);
        case 'duplicate':
            return this.drawSymbolDuplicate(canvas, aColor);
    }
    return this.originalSymbolCanvasColored(aColor);
}

SymbolMorph.prototype.drawSymbolSelection = function (canvas, color) {
    // answer a canvas showing a filled arrow and a dashed rectangle
    var ctx = canvas.getContext('2d'),
        w = canvas.width;
        h = canvas.height;
    ctx.save();
    ctx.setLineDash([3]);
    this.drawSymbolRectangle(canvas, color);
    ctx.restore();
    ctx.save();
    ctx.fillStyle = color.toString();
    ctx.translate(0.7*w, 0.4*h);
    ctx.scale(0.5,0.5);
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
    ctx.stroke();

    return canvas;
};

SymbolMorph.prototype.drawSymbolClosedBrushPath = function (canvas, color) {
    // answer a canvas showing an cloud
    var ctx = canvas.getContext('2d');
    ctx.save();
    this.drawSymbolCloudOutline(canvas, color);
    ctx.restore();
    return canvas;
};

SymbolMorph.prototype.drawSymbolDuplicate = function (canvas, color) {
    // answer a canvas showing a rubber stamping
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        h = canvas.height;
    ctx.save();
    ctx.beginPath();
    ctx.arc(w / 2, h / 8, w / 6, radians(0), radians(360), false);
    ctx.fillRect((w / 2)-ctx.lineWidth, h / 5, w / 8, h*0.5);
    ctx.fillRect(w/8, h/2, w*0.8, h / 4);
    ctx.fillRect(w/4, 0.75*h, w*0.55, h / 6);
    ctx.fill();
    ctx.closePath;
    ctx.restore();
    return canvas;
};

// VectorShape

VectorShape.prototype = new Object();
VectorShape.prototype.constructor = VectorShape;
VectorShape.uber = Object.prototype;

function VectorShape(borderWidth, borderColor, threshold) {
    this.init(borderWidth, borderColor, threshold);
}

VectorShape.prototype.init = function(borderWidth, borderColor, threshold) {
    this.borderWidth = borderWidth; // get from editor
    this.borderColor = borderColor; // get from editor
    this.threshold = threshold === undefined ? 10: threshold;
    this.image = newCanvas();
}

VectorShape.prototype.toString = function () {
    return 'a ' +
        (this.constructor.name ||
         this.constructor.toString().split(' ')[1].split('(')[0])
}

VectorShape.prototype.copy = function (newshape) {
    var shape = newshape || new VectorShape(this.borderWidth, this.borderColor);
    shape.image.width = this.image.width;
    shape.image.height = this.image.height;
    shape.threshold = this.threshold;
    shape.image.getContext("2d").drawImage(this.image,0,0);
    return shape;
}

VectorShape.prototype.drawBoundingBox = function(context, origin, destination) {

    var bounds = this.getBounds();

    /* Drawing corners */
    context.lineWidth = 1;
    context.strokeStyle = "grey";
    context.setLineDash([6]);
    context.beginPath();
    context.strokeRect(bounds.left, bounds.top, Math.abs(bounds.left-bounds.right), Math.abs(bounds.top-bounds.bottom));

    /* Drawing corners */

    context.fillStyle = "white";
    context.strokeStyle = "black";
    context.setLineDash([]);

    /* upper-left corner */
    context.beginPath();
    context.arc(bounds.left,bounds.top,4,0,2*Math.PI);
    context.closePath();
    context.stroke();
    context.fill();
    /* upper-right corner */
    context.beginPath();
    context.arc(bounds.right,bounds.top,4,0,2*Math.PI);
    context.closePath();
    context.stroke();
    context.fill();

    /* bottom-left corner */
    context.beginPath();
    context.arc(bounds.left,bounds.bottom,4,0,2*Math.PI);
    context.closePath();
    context.stroke();
    context.fill();

    /* bottom-right corner */
    context.beginPath();
    context.arc(bounds.right,bounds.bottom,4,0,2*Math.PI);
    context.closePath();
    context.stroke();
    context.fill();

}

VectorShape.prototype.isEndPointInBoundingBox = function(leftTop, leftBottom, rightTop, rightBottom, aPoint) {
    var threshold = 0, 
        radius = 4; 
        circle = new VectorEllipse(null, null, null, leftTop, null, radius, radius, threshold);

    if(circle.containsPoint(aPoint)) return 'leftTop';
    circle = new VectorEllipse(null, null, null, leftBottom, null, radius, radius, threshold);
    if(circle.containsPoint(aPoint)) return 'leftBottom';
    circle = new VectorEllipse(null, null, null, rightTop, null, radius, radius, threshold);
    if(circle.containsPoint(aPoint)) return 'rightTop';
    circle = new VectorEllipse(null, null, null, rightBottom, null, radius, radius, threshold);
    if(circle.containsPoint(aPoint)) return 'rightBottom';
    return false;
}
// VectorRectangle

VectorRectangle.prototype = new VectorShape();
VectorRectangle.prototype.constructor = VectorRectangle;
VectorRectangle.uber = VectorShape.prototype;

function VectorRectangle(borderWidth, borderColor, fillColor, origin, destination, threshold) {
    VectorRectangle.uber.init.call(this, borderWidth, borderColor, threshold);
    this.init(fillColor, origin, destination);
}

VectorRectangle.prototype.init = function(fillColor, origin, destination) {
    this.origin = origin;
    this.destination = destination;
    this.fillColor = fillColor;
}

VectorRectangle.prototype.copy = function () {
    var newRectangle = new VectorRectangle(
        this.borderWidth, 
        this.borderColor, 
        this.fillColor, 
        this.origin, 
        this.destination
    );
    return VectorRectangle.uber.copy.call(this, newRectangle);
}

VectorRectangle.prototype.toString = function () {
    return VectorRectangle.uber.toString.call(this) + ' from: ' + this.origin.toString() + ' to: ' + this.destination.toString();
}

VectorRectangle.prototype.containsPoint = function(aPoint) {
    var rect = new Rectangle(
        Math.min(this.origin.x, this.destination.x) - this.threshold,
        Math.min(this.origin.y, this.destination.y) - this.threshold,
        Math.max(this.origin.x, this.destination.x) + this.threshold,
        Math.max(this.origin.y, this.destination.y) + this.threshold);
    if (!rect.containsPoint(aPoint)) { return false };
    return true;
}

VectorRectangle.prototype.containsPointEdge = function(aPoint) {
    var smallest = new VectorRectangle(null, null, null, 
        new Point(Math.min(this.origin.x, this.destination.x) + this.threshold, Math.min(this.origin.y, this.destination.y) + this.threshold), 
        new Point(Math.max(this.origin.x, this.destination.x) - this.threshold, Math.max(this.origin.y, this.destination.y) - this.threshold), 0),
    biggest = new VectorRectangle(null, null, null, 
        new Point(Math.min(this.origin.x, this.destination.x) - this.threshold, Math.min(this.origin.y, this.destination.y) - this.threshold), 
        new Point(Math.max(this.origin.x, this.destination.x) + this.threshold, Math.max(this.origin.y, this.destination.y) + this.threshold), 0);
    if(!smallest.containsPoint(aPoint) && biggest.containsPoint(aPoint)) return true;
    else false;
}

VectorRectangle.prototype.isFound = function(selectionBox) {   
    if ((selectionBox.origin.x === selectionBox.destination.x 
        && selectionBox.origin.y === selectionBox.destination.y 
        && this.containsPoint(selectionBox.origin)) 
        || (selectionBox.containsPoint(this.origin) 
        && selectionBox.containsPoint(this.destination))) return true;
    return false;
}

VectorRectangle.prototype.getBounds = function() {
    return {
        left: Math.min(this.origin.x, this.destination.x) - (this.borderWidth / 2),
        top: Math.min(this.origin.y, this.destination.y) - (this.borderWidth / 2),
        right: Math.max(this.origin.x, this.destination.x) + (this.borderWidth / 2), 
        bottom: Math.max(this.origin.y, this.destination.y) + (this.borderWidth / 2)
    };
}

VectorRectangle.prototype.isInBoundingBox = function(aPoint) {
    var bounds = this.getBounds(),
        result = this.isEndPointInBoundingBox(new Point(bounds.left, bounds.top),
            new Point(bounds.left, bounds.bottom),
            new Point(bounds.right, bounds.top),
            new Point(bounds.right, bounds.bottom),
            aPoint);
    if(!result) return this.containsPoint(aPoint);
    return result;
}

VectorRectangle.prototype.exportAsSVG = function() {
    var borderColor, fillColor, height = Math.abs(this.origin.y-this.destination.y), 
        width = Math.abs(this.origin.x - this.destination.x),
        x = Math.min(this.origin.x, this.destination.x),
        y = Math.min(this.origin.y, this.destination.y);
    borderColor = this.borderColor != 'transparent' ? 'stroke="' + this.borderColor + '"' : 'stroke="none"';
    fillColor = this.fillColor != 'transparent'? ' fill="' + this.fillColor + '"': ' fill="none"';
    return '<rect height="' + height + '" width="' + width + '" x="' + x + '" y="' + y
        + '" stroke-width="' + this.borderWidth + '" ' + borderColor + fillColor + '/>';
}

// VectorLine

VectorLine.prototype = new VectorShape();
VectorLine.prototype.constructor = VectorLine;
VectorLine.uber = VectorShape.prototype;

function VectorLine(borderWidth, borderColor, fillColor, origin, destination, threshold) {
    VectorLine.uber.init.call(this, borderWidth, borderColor, threshold);
    this.init(fillColor, origin, destination);
}

VectorLine.prototype.init = function(fillColor, origin, destination) {
    this.origin = origin;
    this.destination = destination;
}

VectorLine.prototype.copy = function () {
    var newLine = new VectorLine(
        this.borderWidth, 
        this.borderColor, 
        this.fillColor, 
        this.origin, 
        this.destination
    );
    return VectorLine.uber.copy.call(this, newLine);
}

VectorLine.prototype.toString = function () {
    return VectorLine.uber.toString.call(this) + ' from: ' + this.origin.toString() + ' to: ' + this.destination.toString();
}

VectorLine.prototype.containsPoint = function(aPoint) {
    var cross,
        rect = new Rectangle(
        Math.min(this.origin.x, this.destination.x)-this.threshold,
        Math.min(this.origin.y, this.destination.y)-this.threshold,
        Math.max(this.origin.x, this.destination.x)+this.threshold,
        Math.max(this.origin.y, this.destination.y)+this.threshold);
    if (!rect.containsPoint(aPoint)) { return false };
    cross = (aPoint.x - this.origin.x) * (this.destination.y - this.origin.y) - (aPoint.y - this.origin.y) * (this.destination.x - this.origin.x); // cross product 
    if (Math.abs(cross) > 1000) {return false}; // 1000 is a threshold
    return true;
}

VectorLine.prototype.isFound = function(selectionBox) {
    if ((selectionBox.origin.x === selectionBox.destination.x 
        && selectionBox.origin.y === selectionBox.destination.y
        && this.containsPoint(selectionBox.origin)) 
        || (selectionBox.containsPoint(this.origin) 
        && selectionBox.containsPoint(this.destination))) return true;
    return false;
}

VectorLine.prototype.getBounds = function() {
    return {left: Math.min(this.origin.x, this.destination.x),
                  top: Math.min(this.origin.y, this.destination.y),
                  right: Math.max(this.origin.x, this.destination.x), 
                  bottom: Math.max(this.origin.y, this.destination.y)
                 };
}

VectorLine.prototype.isInBoundingBox = function(aPoint) {
    var bounds = this.getBounds(),
        result = this.isEndPointInBoundingBox(new Point(bounds.left, bounds.top),
            new Point(bounds.left, bounds.bottom),
            new Point(bounds.right, bounds.top),
            new Point(bounds.right, bounds.bottom),
            aPoint);
    if(!result) return this.containsPoint(aPoint);
    return result;
}

VectorLine.prototype.exportAsSVG = function() {
    var borderColor = this.borderColor != 'transparent'? ' stroke="' + this.borderColor + '"': ' stroke="none"';
    return '<line x1="' + this.origin.x + '" y1="' + this.origin.y + '" x2="' + this.destination.x
        + '" y2="' + this.destination.y + '" stroke-width="' + this.borderWidth + '" ' + borderColor + '/>';
}

// VectorBrush

VectorBrush.prototype = new VectorShape();
VectorBrush.prototype.constructor = VectorBrush;
VectorBrush.uber = VectorShape.prototype;

function VectorBrush(borderWidth, borderColor, fillColor, origin, destination, threshold) {
    VectorBrush.uber.init.call(this, borderWidth, borderColor, threshold);
    this.init(fillColor, origin, destination);
}

VectorBrush.prototype.init = function(fillColor, origin, destination) {
    this.origin = origin.slice();
}

VectorBrush.prototype.copy = function () {
    var newBrush = new VectorBrush(
        this.borderWidth, 
        this.borderColor, 
        this.fillColor, 
        this.origin, 
        this.destination
    );
    return VectorBrush.uber.copy.call(this, newBrush);
}

VectorBrush.prototype.toString = function () {
    var coordinates = "";
    coordinates += this.origin.length + this.origin.length-1;
    for (i = 0; i < this.origin.length; ++i) {
        coordinates += "[" + this.origin[i][0].toString() + "@" + this.origin[i][1].toString() + "]";
        if (this.origin.length != (this.origin.length - 1)) coordinates += ", ";
    }
    return VectorBrush.uber.toString.call(this) + coordinates;
}

VectorBrush.prototype.containsPoint = function(aPoint) {
    var line;
    for (i = 0; i < this.origin.length - 1; ++i) {
        line = new VectorLine(null, null, null, new Point(this.origin[i][0], this.origin[i][1]), new Point(this.origin[i+1][0], this.origin[i+1][1])); // [0] = x, [1] = y
        if (line.containsPoint(aPoint)) return true;
    }
    return false;
}

VectorBrush.prototype.isFound = function(selectionBox) {
    var bounds = this.getBounds();
    if ((selectionBox.origin.x === selectionBox.destination.x 
        && selectionBox.origin.y === selectionBox.destination.y
        && this.containsPoint(selectionBox.origin))
        || (selectionBox.containsPoint(new Point(bounds.left, bounds.top)) 
        && selectionBox.containsPoint(new Point(bounds.right, bounds.bottom)))) return true;
    return false;
}

VectorBrush.prototype.getBounds = function() {
    var rightBottom,
        leftTop = this.origin.reduce(function(previous, current) {
        var left, top;
        left = (previous[0] > current[0] ? current[0] : previous[0]);
        top = (previous[1] > current[1] ? current[1] : previous[1]);
        return [left , top]}
        );
    rightBottom = this.origin.reduce(function(previous, current) {
        var right, bottom;
        right = (previous[0] < current[0] ? current[0] : previous[0]);
        bottom = (previous[1] < current[1] ? current[1] : previous[1]);
        return [right , bottom]}
        );
    return { left: leftTop[0]-(this.borderWidth/2), 
            top: leftTop[1]-(this.borderWidth/2), 
            right: rightBottom[0]+(this.borderWidth/2), 
            bottom: rightBottom[1]+(this.borderWidth/2) };
}

VectorBrush.prototype.isInBoundingBox = function(aPoint) {
    var bounds = this.getBounds(),
        result = this.isEndPointInBoundingBox(new Point(bounds.left, bounds.top),
            new Point(bounds.left, bounds.bottom),
            new Point(bounds.right, bounds.top),
            new Point(bounds.right, bounds.bottom),
            aPoint);
    if(!result) return this.containsPoint(aPoint);
    return result;
}

VectorBrush.prototype.exportAsSVG = function() {
    var borderColor,
        path = "M " + this.origin[0][0] + " " + this.origin[0][1]; 
    this.origin.forEach(function(each) {
        path = path + " L " + each[0] + " " + each[1]; //[0] = x & [1] = y
    });
    borderColor = this.borderColor != 'transparent'? ' stroke="' + this.borderColor + '"': ' stroke="none"';
    return '<path d="' + path + '" stroke-width="' + this.borderWidth + '" ' + borderColor + ' fill="none" />';
}

// VectorEllipse

VectorEllipse.prototype = new VectorShape();
VectorEllipse.prototype.constructor = VectorEllipse;
VectorEllipse.uber = VectorShape.prototype;

function VectorEllipse(borderWidth, borderColor, fillColor, origin, destination, hRadius, vRadius, threshold) {
    VectorEllipse.uber.init.call(this, borderWidth, borderColor, threshold);
    this.init(fillColor, origin, destination, hRadius, vRadius);
}

VectorEllipse.prototype.init = function(fillColor, origin, destination, hRadius, vRadius) {
    this.fillColor = fillColor;
    this.origin = origin;
    this.destination = destination;
    this.hRadius = hRadius;
    this.vRadius = vRadius;
}

VectorEllipse.prototype.copy = function () {
    var newEllipse = new VectorEllipse(
        this.borderWidth, 
        this.borderColor, 
        this.fillColor, 
        this.origin,
        this.destination,
        this.hRadius,
        this.vRadius
    );
    return VectorEllipse.uber.copy.call(this, newEllipse);
}

VectorEllipse.prototype.toString = function () {
    return VectorEllipse.uber.toString.call(this) + ' center: ' + this.origin.toString() + ' radius: (' + this.hRadius.toString() + ',' + this.vRadius.toString() + ')';
}

VectorEllipse.prototype.containsPoint = function(aPoint) {
    return (Math.pow(aPoint.x-this.origin.x,2)/Math.pow(this.hRadius+this.threshold,2) + Math.pow(aPoint.y-this.origin.y,2)/Math.pow(this.vRadius+this.threshold,2)) < 1 ? true: false;
}

VectorEllipse.prototype.containsPointEdge = function(aPoint) {
    smallest = new VectorEllipse(null, null, null, this.origin, null, this.hRadius-this.threshold, this.vRadius-this.threshold, 0);
    biggest = new VectorEllipse(null, null, null, this.origin, null, this.hRadius+this.threshold, this.vRadius+this.threshold, 0);
    if(!smallest.containsPoint(aPoint) && biggest.containsPoint(aPoint)) return true;
    else false;
}

VectorEllipse.prototype.isFound = function(selectionBox) {
    var bounds = this.getBounds();
    if ((selectionBox.origin.x === selectionBox.destination.x 
        && selectionBox.origin.y === selectionBox.destination.y
        && this.containsPoint(selectionBox.origin))
        || (selectionBox.containsPoint(new Point(bounds.left, bounds.top)) 
        && selectionBox.containsPoint(new Point(bounds.left, bounds.bottom)) 
        && selectionBox.containsPoint(new Point(bounds.right, bounds.top))
        && selectionBox.containsPoint(new Point(bounds.right, bounds.bottom)))) return true;
    return false;
}

VectorEllipse.prototype.isInBoundingBox = function(aPoint) {
    var bounds = this.getBounds(),
        result = this.isEndPointInBoundingBox(new Point(bounds.left, bounds.top),
            new Point(bounds.left, bounds.bottom),
            new Point(bounds.right, bounds.top),
            new Point(bounds.right, bounds.bottom),
            aPoint);
    if(!result) return this.containsPoint(aPoint);
    return result;
}

VectorEllipse.prototype.getBounds = function() {
    return {left: this.origin.x-this.hRadius-(this.borderWidth/2),
            top: this.origin.y-this.vRadius-(this.borderWidth/2),
            right: this.origin.x+this.hRadius+(this.borderWidth/2),
            bottom: this.origin.y+this.vRadius+(this.borderWidth/2)
            };
}

VectorEllipse.prototype.exportAsSVG = function() {
    var borderColor = this.borderColor != 'transparent'? ' stroke="' + this.borderColor + '"': ' stroke="none"',
        fillColor = this.fillColor != 'transparent'? ' fill="' + this.fillColor + '"': ' fill="none"';
    return '<ellipse cx="' + this.origin.x + '" cy="' + this.origin.y + '" rx="' + this.hRadius
        + '" ry="' + this.vRadius + '" stroke-width="' + this.borderWidth + '" ' + borderColor 
        + fillColor + '/>';
}

// VectorClosedBrushPath

VectorClosedBrushPath.prototype = new VectorShape();
VectorClosedBrushPath.prototype.constructor = VectorClosedBrushPath;
VectorClosedBrushPath.uber = VectorShape.prototype;

function VectorClosedBrushPath(borderWidth, borderColor, fillColor, origin, destination, threshold) {
    VectorClosedBrushPath.uber.init.call(this, borderWidth, borderColor, threshold);
    this.init(origin, fillColor);
}

VectorClosedBrushPath.prototype.init = function(origin, fillColor) {
    this.origin = origin.slice();
    this.fillColor = fillColor;
}

VectorClosedBrushPath.prototype.copy = function () {
    var newBrush = new VectorClosedBrushPath(
        this.borderWidth, 
        this.borderColor, 
        this.fillColor, 
        this.origin, 
        this.destination
    );
    return VectorClosedBrushPath.uber.copy.call(this, newBrush);
}

VectorClosedBrushPath.prototype.toString = function () {
    var coordinates = "";
    coordinates += this.origin.length + this.origin.length-1;
    for (i = 0; i < this.origin.length; ++i) {
        coordinates += "[" + this.origin[i][0].toString() + "@" + this.origin[i][1].toString() + "]";
        if (this.origin.length != (this.origin.length - 1)) coordinates += ", ";
    }
    return VectorClosedBrushPath.uber.toString.call(this) + coordinates;
}

VectorClosedBrushPath.prototype.getBounds = function() {
    var leftTop = this.origin.reduce(function(previous, current) {
        var left, top;
        left = (previous[0] > current[0] ? current[0] : previous[0]);
        top = (previous[1] > current[1] ? current[1] : previous[1]);
        return [left , top]}
        );
    var rightBottom = this.origin.reduce(function(previous, current) {
        var right, bottom;
        right = (previous[0] < current[0] ? current[0] : previous[0]);
        bottom = (previous[1] < current[1] ? current[1] : previous[1]);
        return [right , bottom]}
        );
    return { left: leftTop[0]-(this.borderWidth/2), top: leftTop[1]-(this.borderWidth/2), right: rightBottom[0]+(this.borderWidth/2), bottom: rightBottom[1]+(this.borderWidth/2) };
}

VectorClosedBrushPath.prototype.containsPoint = function(aPoint) {
    var lineAorigin, lineAdest, 
        lineBorigin, lineBdest, 
        line, countX = 0;
    /* Point in polygon evaluation (inside) */
    function CCW(p1, p2, p3) {
        return (p3.y - p1.y) * (p2.x - p1.x) > (p2.y - p1.y) * (p3.x - p1.x);
    }
    lineBorigin = aPoint;
    lineBdest = new Point(0, aPoint.y);
    for (i = 0; i < this.origin.length -1; ++i) {
        lineAorigin = new Point(this.origin[i][0], this.origin[i][1]);
        lineAdest = new Point(this.origin[i+1][0], this.origin[i+1][1]);
        if((CCW(lineAorigin, lineBorigin, lineBdest) != CCW(lineAdest, lineBorigin, lineBdest)) && (CCW(lineAorigin, lineAdest, lineBorigin) != CCW(lineAorigin, lineAdest, lineBdest))) ++countX;
    }

    lineAorigin = new Point(this.origin[0][0], this.origin[0][1]);
    lineAdest = new Point(this.origin[this.origin.length-1][0], this.origin[this.origin.length-1][1]);
    if((CCW(lineAorigin, lineBorigin, lineBdest) != CCW(lineAdest, lineBorigin, lineBdest)) && (CCW(lineAorigin, lineAdest, lineBorigin) != CCW(lineAorigin, lineAdest, lineBdest)) ) ++countX;  
    if(countX % 2 !== 0) return true;

   /* Detect borders  */
    for (i = 0; i < this.origin.length - 1; ++i) {
        line = new VectorLine(null, null, null, new Point(this.origin[i][0], this.origin[i][1]), new Point(this.origin[i+1][0], this.origin[i+1][1]), 0);
        if (line.containsPoint(aPoint)) return true;
    }

    /* closepath evaluation */
    line = new VectorLine(null, null, null, new Point(this.origin[0][0], this.origin[0][1]), new Point(this.origin[this.origin.length-1][0], this.origin[this.origin.length-1][1]), 0);
    if (line.containsPoint(aPoint)) return true;
    return false;
}

VectorClosedBrushPath.prototype.containsPointEdge = function(aPoint) {
    var brush = [],
        smallest, 
        biggest, 
        i,
        bounds, 
        tmp, 
        resizeRatioX, 
        resizeRatioY;
    bounds = this.getBounds();
    resizeRatioX = (bounds.right-bounds.left+(2*this.threshold))/(bounds.right-bounds.left);
    resizeRatioY = (bounds.bottom-bounds.top+(2*this.threshold))/(bounds.bottom-bounds.top);
    for (i = 0; i < this.origin.length; ++i) {
        tmp = new Point(this.origin[i][0]-bounds.left, this.origin[i][1]-bounds.top);
        brush.push([(tmp.x*resizeRatioX)+bounds.left, (tmp.y*resizeRatioY)+bounds.top]);
        brush[i][0] -= this.threshold;
        brush[i][1] -= this.threshold;
    }
    biggest = new VectorClosedBrushPath(null, null, null, brush, null, 0);
    if(!biggest.containsPoint(aPoint)) return false;
    brush = [];
    resizeRatioX = (bounds.right-bounds.left-(2*this.threshold))/(bounds.right-bounds.left);
    resizeRatioY = (bounds.bottom-bounds.top-(2*this.threshold))/(bounds.bottom-bounds.top);
    for (i = 0; i < this.origin.length; ++i) {
        tmp = new Point(this.origin[i][0]-bounds.left, this.origin[i][1]-bounds.top);
        brush.push([(tmp.x*resizeRatioX)+bounds.left, (tmp.y*resizeRatioY)+bounds.top]);
        brush[i][0] += this.threshold;
        brush[i][1] += this.threshold;
    }
    smallest = new VectorClosedBrushPath(null, null, null, brush, null, 0);
    if(smallest.containsPoint(aPoint)) return false;
    return true;
}

VectorClosedBrushPath.prototype.isFound = function(selectionBox) {
    var bounds = this.getBounds();
    if ((selectionBox.origin.x === selectionBox.destination.x 
        && selectionBox.origin.y === selectionBox.destination.y
        && this.containsPoint(selectionBox.origin))
        || (selectionBox.containsPoint(new Point(bounds.left, bounds.top)) 
        && selectionBox.containsPoint(new Point(bounds.right, bounds.bottom)))) return true;
    return false;
}

VectorClosedBrushPath.prototype.isInBoundingBox = function(aPoint) {
    var bounds = this.getBounds(),
        result = this.isEndPointInBoundingBox(new Point(bounds.left, bounds.top),
            new Point(bounds.left, bounds.bottom),
            new Point(bounds.right, bounds.top),
            new Point(bounds.right, bounds.bottom),
            aPoint);
    if(!result) return this.containsPoint(aPoint);
    return result;
}

VectorClosedBrushPath.prototype.exportAsSVG = function() {
    var fillColor = this.fillColor != 'transparent'? ' fill="' + this.fillColor + '"': ' fill="none"',
        borderColor = this.borderColor != 'transparent'? ' stroke="' + this.borderColor + '"': ' stroke="none"',
        path = "M " + this.origin[0][0] + " " + this.origin[0][1]; 
    this.origin.forEach(function(each) {
        path = path + " L " + each[0] + " " + each[1]; //[0] = x & [1] = y
    });
    return '<path d="' + path + ' Z" stroke-width="' + this.borderWidth + '" ' + borderColor + fillColor + ' />';
}

// VectorPolygon

VectorPolygon.prototype = new VectorShape();
VectorPolygon.prototype.constructor = VectorPolygon;
VectorPolygon.uber = VectorShape.prototype;

function VectorPolygon(borderWidth, borderColor, fillColor, origin, destination, threshold) {
    VectorPolygon.uber.init.call(this, borderWidth, borderColor, threshold);
    this.init(fillColor, origin, destination);
}

VectorPolygon.prototype.init = function(fillColor, origin, destination) {
    this.origin = origin
    this.fillColor = fillColor;
}

VectorPolygon.prototype.copy = function () {
    var newPolygon = new VectorPolygon(
        this.borderWidth, 
        this.borderColor, 
        this.fillColor, 
        this.origin, 
        this.destination
    );
    return VectorPolygon.uber.copy.call(this, newPolygon);
}

VectorPolygon.prototype.toString = function () {
    var coordinates = "";
    coordinates += this.origin.length + this.origin.length-1;
    for (i = 0; i < this.origin.length; ++i) {
        coordinates += "[" + this.origin[i][0] + "@" + this.origin[i][0] + "]";
        if (this.origin.length != (this.origin.length - 1)) coordinates += ", ";
    }
    return VectorPolygon.uber.toString.call(this) + coordinates;
}

VectorPolygon.prototype.containsPoint = function(aPoint) {
    var lineAorigin, lineAdest, 
        lineBorigin, lineBdest, 
        line, countX = 0;
    /* Point in polygon evaluation (inside) */
    function CCW(p1, p2, p3) {
        return (p3.y - p1.y) * (p2.x - p1.x) > (p2.y - p1.y) * (p3.x - p1.x);
    }
    lineBorigin = aPoint;
    lineBdest = new Point(0, aPoint.y);
    for (i = 0; i < this.origin.length -1; ++i) {
        lineAorigin = new Point(this.origin[i][0], this.origin[i][1]);
        lineAdest = new Point(this.origin[i+1][0], this.origin[i+1][1]);
        if((CCW(lineAorigin, lineBorigin, lineBdest) != CCW(lineAdest, lineBorigin, lineBdest)) && (CCW(lineAorigin, lineAdest, lineBorigin) != CCW(lineAorigin, lineAdest, lineBdest))) ++countX;
    }

    lineAorigin = new Point(this.origin[0][0], this.origin[0][1]);
    lineAdest = new Point(this.origin[this.origin.length-1][0], this.origin[this.origin.length-1][1]);
    if((CCW(lineAorigin, lineBorigin, lineBdest) != CCW(lineAdest, lineBorigin, lineBdest)) && (CCW(lineAorigin, lineAdest, lineBorigin) != CCW(lineAorigin, lineAdest, lineBdest))) ++countX;  
    if(countX % 2 !== 0) return true;

   /* Detect borders  */
    for (i = 0; i < this.origin.length - 1; ++i) {
        line = new VectorLine(null, null, null, new Point(this.origin[i][0], this.origin[i][1]), new Point(this.origin[i+1][0], this.origin[i+1][1]), 0);
        if (line.containsPoint(aPoint)) return true;
    }
    /* closepath evaluation */
    line = new VectorLine(null, null, null, new Point(this.origin[0][0], this.origin[0][1]), new Point(this.origin[this.origin.length-1][0], this.origin[this.origin.length-1][1]), 0);
    if (line.containsPoint(aPoint)) return true;
    return false;
}

VectorPolygon.prototype.containsPointEdge = function(aPoint) {
    var brush = [],
        smallest, 
        biggest, 
        i,
        bounds, 
        tmp, 
        resizeRatioX, 
        resizeRatioY;
    bounds = this.getBounds();
    resizeRatioX = (bounds.right-bounds.left+(2*this.threshold))/(bounds.right-bounds.left);
    resizeRatioY = (bounds.bottom-bounds.top+(2*this.threshold))/(bounds.bottom-bounds.top);
    for (i = 0; i < this.origin.length; ++i) {
        tmp = new Point(this.origin[i][0]-bounds.left, this.origin[i][1]-bounds.top);
        brush.push([(tmp.x*resizeRatioX)+bounds.left, (tmp.y*resizeRatioY)+bounds.top]);
        brush[i][0] -= this.threshold;
        brush[i][1] -= this.threshold;
    }
    biggest = new VectorClosedBrushPath(null, null, null, brush, null, 0);
    if(!biggest.containsPoint(aPoint)) return false;
    brush = [];
    resizeRatioX = (bounds.right-bounds.left-(2*this.threshold))/(bounds.right-bounds.left);
    resizeRatioY = (bounds.bottom-bounds.top-(2*this.threshold))/(bounds.bottom-bounds.top);
    for (i = 0; i < this.origin.length; ++i) {
        tmp = new Point(this.origin[i][0]-bounds.left, this.origin[i][1]-bounds.top);
        brush.push([(tmp.x*resizeRatioX)+bounds.left, (tmp.y*resizeRatioY)+bounds.top]);
        brush[i][0] += this.threshold;
        brush[i][1] += this.threshold;
    }
    smallest = new VectorClosedBrushPath(null, null, null, brush, null, 0);
    if(smallest.containsPoint(aPoint)) return false;
    return true;
}

VectorPolygon.prototype.isFound = function(selectionBox) {
    var bounds = this.getBounds();
    if ((selectionBox.origin.x === selectionBox.destination.x 
        && selectionBox.origin.y === selectionBox.destination.y
        && this.containsPoint(selectionBox.origin))
        || (selectionBox.containsPoint(new Point(bounds.left, bounds.top)) 
        && selectionBox.containsPoint(new Point(bounds.right, bounds.bottom)))) return true;
    return false;
}

VectorPolygon.prototype.getBounds = function() {
    var leftTop = this.origin.reduce(function(previous, current) {
        var left, top;
        left = (previous[0] > current[0] ? current[0] : previous[0]);
        top = (previous[1] > current[1] ? current[1] : previous[1]);
        return [left , top]}
        ),
        rightBottom = this.origin.reduce(function(previous, current) {
        var right, bottom;
        right = (previous[0] < current[0] ? current[0] : previous[0]);
        bottom = (previous[1] < current[1] ? current[1] : previous[1]);
        return [right , bottom]}
        );
    return { left: leftTop[0]-(this.borderWidth/2), top: leftTop[1]-(this.borderWidth/2), right: rightBottom[0]+(this.borderWidth/2), bottom: rightBottom[1]+(this.borderWidth/2)};
}

VectorPolygon.prototype.isInBoundingBox = function(aPoint) {
    var bounds = this.getBounds(),
        result = this.isEndPointInBoundingBox(new Point(bounds.left, bounds.top),
            new Point(bounds.left, bounds.bottom),
            new Point(bounds.right, bounds.top),
            new Point(bounds.right, bounds.bottom),
            aPoint);
    if(!result) return this.containsPoint(aPoint);
    return result;
}

VectorPolygon.prototype.exportAsSVG = function() {
    var fillColor = this.fillColor != 'transparent'? ' fill="' + this.fillColor + '"': ' fill="none"',
        borderColor = this.borderColor != 'transparent'? ' stroke="' + this.borderColor + '"': ' stroke="none"',
        path = "M " + this.origin[0][0] + " " + this.origin[0][1]; 
    this.origin.forEach(function(each) {
        path = path + " L " + each[0] + " " + each[1]; //[0] = x & [1] = y
    });
    return '<path d="' + path + ' Z" stroke-width="' + this.borderWidth + '"' + borderColor + fillColor + ' />';
}


// Decorator Pattern
// =================
// Modificar comportament de funcions sense sobreescriure-les

PaintEditorMorph.prototype.originalOpenIn = PaintEditorMorph.prototype.openIn;
PaintEditorMorph.prototype.openIn = function (world, oldim, oldrc, callback, anIDE) {
    this.originalOpenIn(world, oldim, oldrc, callback);
    this.ide = anIDE;
}

PaintEditorMorph.prototype.originalBuildEdits = PaintEditorMorph.prototype.buildEdits;
PaintEditorMorph.prototype.buildEdits = function () {
    var myself = this;
    this.originalBuildEdits();
    this.edits.add(this.pushButton(
            'Vector',
            function () {
                this.object = new VectorCostume();
                this.object.edit(
                        this.world(),
                        myself.ide,
                        true,
                        myself.oncancel,
                        function() { myself.ide.currentSprite.changed() }
                    );
                }
    ));
    this.edits.fixLayout();
};

/////////// VectorPaintEditorMorph //////////////////////////

VectorPaintEditorMorph.prototype = new PaintEditorMorph();
VectorPaintEditorMorph.prototype.constructor = VectorPaintEditorMorph;
VectorPaintEditorMorph.uber = PaintEditorMorph.prototype;

function VectorPaintEditorMorph() {
    this.init();
}

VectorPaintEditorMorph.prototype.init = function () {
    var myself = this;

    // additional properties:
    this.paper = null; // paint canvas
    this.vectorObjects = []; // collection of VectorShapes
    this.vectorObjectsSelected = []; // collection of VectorShapes
    this.vectorObjectsToDuplicate = []; // collection of VectorShapes to duplicate
    this.currentObject = null; // object being currently painted / edited

    // initialize inherited properties:
    VectorPaintEditorMorph.uber.init.call(this);

    // override inherited properties:
    this.labelString = "Vector Paint Editor";
    this.createLabel();
    this.fixLayout();
};

VectorPaintEditorMorph.prototype.buildEdits = function () {
    var crosshairs,
        myself = this;

    this.edits.add(this.pushButton(
        "clear", function () { myself.paper.clearCanvas()}));

    this.edits.add(this.pushButton(
            'Bitmap',
                function () {
                    var can = newCanvas(StageMorph.prototype.dimensions);
                    this.object = new Costume();
                    myself.vectorObjects.forEach(function(each) {
                        can.getContext("2d").drawImage(each.image, 0, 0);
                    });
                    this.object.rotationCenter = this.paper.rotationCenter.copy();
                    this.object.contents = can;
                    this.object.edit(
                            this.world(),
                            myself.ide,
                            false,
                            myself.oncancel
                        );
                    this.destroy();
                    }
                ));

    crosshairs = new ToggleButtonMorph(
            null,
            this,
            function () { // action
                myself.paper.currentTool = 'crosshairs';
                myself.paper.toolChanged('crosshairs');
                myself.refreshToolButtons();
            },
            new SymbolMorph('crosshairs', 14),
            function () {return myself.paper.currentTool === 'crosshairs'; }
        );
    crosshairs.drawNew();
    crosshairs.fixLayout();
    crosshairs.refresh();

    this.edits.add(crosshairs);

    this.edits.fixLayout();
}

VectorPaintEditorMorph.prototype.buildLayersBox = function () {
    var mctx = this.paper.mask.getContext("2d");
    this.scaleBox.add(this.pushButton(
        "Top", 
        this.jumpTop = function() {
            var index;
            for(z = this.vectorObjectsSelected.length-1; z >= 0; --z) {
                index = this.vectorObjects.indexOf(this.vectorObjectsSelected[z]);

                mctx.save();
                this.vectorObjects[index].drawBoundingBox(mctx);
                this.paper.changed();
                mctx.restore(); 

                this.vectorObjects.splice(index,1);
                this.vectorObjects.push(this.vectorObjectsSelected[z]);

            }
            this.paper.drawNew();
            }
        ));
    this.scaleBox.add(this.pushButton(
        "Bottom", this.jumpBottom
          = function() {
                var index,
                    z;
                for(z = 0; z < this.vectorObjectsSelected.length; ++z) {    
                    index = this.vectorObjects.indexOf(this.vectorObjectsSelected[z]);

                    mctx.save();
                    this.vectorObjects[index].drawBoundingBox(mctx);
                    this.paper.changed();
                    mctx.restore();
                    
                    this.vectorObjects.splice(index,1);
                    this.vectorObjects.unshift(this.vectorObjectsSelected[z]);
                }
                this.paper.drawNew();
            }
        ));
    this.scaleBox.add(this.pushButton(
        "Up", this.jumpUp = function() {
                var index, 
                    tmp, 
                    z,
                    lastIndexChanged = this.vectorObjects.length;
                for(z = 0; z < this.vectorObjectsSelected.length; ++z) {
                    index = this.vectorObjects.indexOf(this.vectorObjectsSelected[z]);
                    mctx.save();
                    this.vectorObjects[index].drawBoundingBox(mctx);
                    this.paper.changed();
                    mctx.restore();
                    if(lastIndexChanged-index > 1) {
                        tmp = this.vectorObjects[index];
                        this.vectorObjects[index] = this.vectorObjects[index+1];
                        this.vectorObjects[index+1] = tmp;
                        lastIndexChanged = index;
                    }
                    else lastIndexChanged = index;
                }
                this.paper.drawNew();
            }
        ));
    this.scaleBox.add(this.pushButton(
        "Down", this.jumpDown = function() {
                var index,
                    tmp,
                    z,
                    lastIndexChanged = -1;
                    for(z = this.vectorObjectsSelected.length-1; z >= 0; --z) {
                        index = this.vectorObjects.indexOf(this.vectorObjectsSelected[z]);
                        mctx.save();
                        this.vectorObjects[index].drawBoundingBox(mctx);
                        this.paper.changed();
                        mctx.restore();
                        if(index-lastIndexChanged > 1) {
                            tmp = this.vectorObjects[index];
                            this.vectorObjects[index] = this.vectorObjects[index-1];
                            this.vectorObjects[index-1] = tmp;
                            lastIndexChanged = index;
                        }
                        else lastIndexChanged = index;                
                    }
                    this.paper.drawNew();
                }
            ));
    this.scaleBox.fixLayout();
}

VectorPaintEditorMorph.prototype.buildScaleBox = VectorPaintEditorMorph.prototype.buildLayersBox;

VectorPaintEditorMorph.prototype.openIn = function (world, oldim, oldrc, callback, anIDE, oldvecObj) {
    /* copy oldVectorObjects */
    var myself = this,
        vecObj = [];

    VectorPaintEditorMorph.uber.openIn.call(this, world, oldim, oldrc, callback);

    oldvecObj.forEach(function(each) {
        vecObj.push(each.copy());
    });

    this.vectorObjects = vecObj;
    this.ide = anIDE;

    this.processKeyUp = function () {
        this.shift = false;
        this.ctrl = false;
        this.propertiesControls.constrain.refresh();
    };

    this.processKeyDown = function () {
        /* Shift key */
        if(!this.shift) this.shift = this.world().currentKey === 16;
        /* Ctrl */
        if(!this.ctrl) this.ctrl = this.world().currentKey === 17; 
        switch (this.world().currentKey) {
            /* Del key */
            case 46:
                this.delete = function() {
                    for(z = 0; z < this.vectorObjectsSelected.length; ++z) {
                        var index = this.vectorObjects.indexOf(this.vectorObjectsSelected[z]);
                        this.vectorObjects.splice(index,1);
                    }
                    this.drawNew(true);
                    this.changed();
                }
                this.delete();
            break;
            /* Page Up key */
            case 33:
                this.jumpUp();
            break;
            /* Page Down key */
            case 34:
                this.jumpDown();
            break;
            /* Home key */
            case 36:
                this.jumpTop();
            break;
            /* End key */
            case 35:
                this.jumpBottom();
            case 86:
            /* Ctrl + V */
            var pos, hand = world.hand;
            pos = hand.position();
            pos = pos.subtract(this.paper.bounds.origin);
            function insidePaper(pos) {
                return (pos.x >= 0 && pos.y >= 0 && pos.x <= myself.paper.bounds.width() && pos.y <= myself.paper.bounds.height());
            }
            if(this.ctrl && this.vectorObjectsToDuplicate.length && insidePaper(pos)) {
                myself.paper.currentTool = 'duplicate';
                myself.paper.toolChanged('duplicate');
                myself.refreshToolButtons();
                this.paper.duplicateShape(pos);
                this.paper.mouseClickLeft();
            };
            break;
            case 67:
            /* Ctrl + C */
            var vecObjDup = [];
            if(this.ctrl && this.vectorObjectsSelected.length) {
                this.vectorObjectsSelected.forEach(function(each) {
                    vecObjDup.push(each.copy());
                });
                this.vectorObjectsToDuplicate = vecObjDup;
            }
            break;
            default:
                nop();

        }
        this.propertiesControls.constrain.refresh();
    };
    this.drawNew();
}

VectorPaintEditorMorph.prototype.buildContents = function() {

    VectorPaintEditorMorph.uber.buildContents.call(this);

    var myself = this;

    this.paper.destroy();
    this.paper = new VectorPaintCanvasMorph(myself.shift);
    this.paper.setExtent(StageMorph.prototype.dimensions);
    this.body.add(this.paper);

    this.refreshToolButtons();
    this.fixLayout();
    this.drawNew();
}

VectorPaintEditorMorph.prototype.buildToolbox = function () {
    //VectorPaintEditorMorph.uber.buildToolbox.call(this);
    //this.tools.destroy();
    this.tools = null;

    var tools = {
        selection:
            "Selection tool",
        brush:
            "Paintbrush tool\n(free draw)",
        line:
            "Line tool\n(shift: vertical/horizontal)",
        rectangle:
            "Rectangle\n(shift: square)",
        circle:
            "Ellipse\n(shift: circle)",

        duplicate:
            "Duplicate a shapespe",
        paintbucket:
            "Fill a border (shift: fill a shape)",
        pipette:
            "Pipette tool\n(pick a color anywhere)",
        polygon:
            "Polygon \n(pick a color anywhere)",
        closedBrushPath:
            "Paintbrush closed \n(free draw)"
    },
        myself = this,
        left = this.toolbox.left(),
        top = this.toolbox.top(),
        padding = 2,
        inset = 5,
        x = 0,
        y = 0;

    Object.keys(tools).forEach(function (tool) {
        var btn = myself.toolButton(tool, tools[tool]);
        btn.setPosition(new Point(
                left + x,
                top + y
                ));
        x += btn.width() + padding;
        if (tool === "circle") { /* the tool mark the newline */
            x = 0;
            y += btn.height() + padding;
            myself.paper.drawcrosshair();
        }
        myself.toolbox[tool] = btn;
        myself.toolbox.add(btn);
    });

    this.toolbox.bounds = this.toolbox.fullBounds().expandBy(inset * 2);
    this.toolbox.drawNew();
};

VectorPaintEditorMorph.prototype.populatePropertiesMenu = function () {
    var c = this.controls,
        myself = this,
        pc = this.propertiesControls,
        alpen = new AlignmentMorph("row", this.padding);
        alignColor = new AlignmentMorph("row", this.padding);

    pc.primaryColorViewer = new Morph();
    pc.primaryColorViewer.setExtent(new Point(85, 15)); // 40 = height primary & brush size
    pc.primaryColorViewer.color = new Color(0, 0, 0);
    pc.secondaryColorViewer = new Morph();
    pc.secondaryColorViewer.setExtent(new Point(85, 15)); // 20 = height secondaryColor box
    pc.secondaryColorViewer.color = new Color(0, 0, 0);

    pc.colorpicker = new PaintColorPickerMorph(
        new Point(180, 100),
        function (color, whichColor) {
            whichColor = whichColor || myself.paper.isShiftPressed()? 'secondaryColor' : 'primaryColor';
            var ni = newCanvas(pc[whichColor + 'Viewer'].extent()), // equals secondaryColorViewer or primaryColorViewer
            ctx = ni.getContext("2d"),
            i,
            j;
            myself.paper.settings[whichColor.toLowerCase()] = color;
            if (color === "transparent") {
                for (i = 0; i < 180; i += 5) {
                    for (j = 0; j < 15; j += 5) {
                        ctx.fillStyle =
                ((j + i) / 5) % 2 === 0 ?
                "rgba(0, 0, 0, 0.2)" :
                "rgba(0, 0, 0, 0.5)";
            ctx.fillRect(i, j, 5, 5);

                    }
                }
            } else {
                ctx.fillStyle = color.toString();
                ctx.fillRect(0, 0, 180, 15);
            };
            //Brush size
            ctx.strokeStyle = "black";
            ctx.lineWidth = Math.min(myself.paper.settings.linewidth, 20);
            ctx.beginPath();
            ctx.lineCap = "round";
            ctx.moveTo(20, 30);
            ctx.lineTo(160, 30);
            ctx.stroke();
            pc[whichColor + 'Viewer'].image = ni;
            pc[whichColor + 'Viewer'].changed();
                }
        );

    pc.colorpicker.action(new Color(0, 0, 0));
    pc.colorpicker.action("transparent", 'secondaryColor'); // inizialize secondarycolor pc
    
    pc.penSizeSlider = new SliderMorph(0, 20, 5, 5);
    pc.penSizeSlider.orientation = "horizontal";
    pc.penSizeSlider.setHeight(15);
    pc.penSizeSlider.setWidth(150);
    pc.penSizeSlider.action = function (num) {
        if (pc.penSizeField) {
            pc.penSizeField.setContents(num);
        }
        myself.paper.settings.linewidth = num;
        pc.colorpicker.action(myself.paper.settings.primarycolor);
    };
    pc.penSizeField = new InputFieldMorph("3", true, null, false);
    pc.penSizeField.contents().minWidth = 20;
    pc.penSizeField.setWidth(25);
    pc.penSizeField.accept = function () {
        var val = parseFloat(pc.penSizeField.getValue());
        pc.penSizeSlider.value = val;
        pc.penSizeSlider.drawNew();
        pc.penSizeSlider.updateValue();
        this.setContents(val);
        myself.paper.settings.linewidth = val;
        this.world().keyboardReceiver = myself;
        pc.colorpicker.action(myself.paper.settings.primarycolor);
    };
    alpen.add(pc.penSizeSlider);
    alpen.add(pc.penSizeField);
    alpen.color = myself.color;
    alpen.fixLayout();
    pc.penSizeField.drawNew();

    pc.constrain = new ToggleMorph(
            "checkbox",
            this,
            function () {myself.shift = !myself.shift; },
            "Constrain proportions of shapes?\n(you can also hold shift)",
            function () {return myself.shift; }
            );

    alignColor.add(pc.primaryColorViewer);
    alignColor.add(pc.secondaryColorViewer);
    alignColor.fixLayout();

    c.add(pc.colorpicker);
    c.add(new TextMorph(localize("Border color         Fill color")));
    c.add(alignColor);
    c.add(new TextMorph(localize("Brush size")));
    c.add(alpen);
    c.add(pc.constrain);
};

VectorPaintEditorMorph.prototype.getSVG = function () {
    var srcSVG = "";
    this.vectorObjects.forEach(function(each) {
       srcSVG = srcSVG + each.exportAsSVG();
    });
    return srcSVG;
};

VectorPaintEditorMorph.prototype.getBoundsVectorObjects = function (vecObj) {
    var bounds = [];
    vecObj.forEach(function(each) {
        bounds.push(each.getBounds());
    });
    
    bounds = bounds.reduce(function(previous, current) {
        return {left: (previous.left > current.left ? current.left : previous.left),
                top: (previous.top > current.top ? current.top : previous.top),
                right: (previous.right > current.right ? previous.right : current.right),
                bottom: (previous.bottom > current.bottom ? previous.bottom : current.bottom)}
    });
    return bounds;
};

VectorPaintEditorMorph.prototype.ok = function () {
    var bounds, 
        myself = this,
        img = new Image();

    bounds = this.getBoundsVectorObjects(this.vectorObjects);

    img.src = 'data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" version="1.1" preserveAspectRatio="xMinYMin meet" viewBox="' 
        + bounds.left + ' ' + bounds.top + ' ' + (bounds.right - bounds.left) + ' ' + (bounds.bottom - bounds.top)
        + '" width="' + (bounds.right - bounds.left) + '" height="' + (bounds.bottom - bounds.top) + '" > ' + this.getSVG() + '</svg>';

    img.onload = function(){
        myself.callback(
            img,
            myself.paper.rotationCenter.subtract(new Point(bounds.left, bounds.top)),
            myself.vectorObjects
        )};

    this.destroy();
};

// VectorPaintCanvasMorph //////////////////////////

VectorPaintCanvasMorph.prototype = new PaintCanvasMorph();
VectorPaintCanvasMorph.prototype.constructor = VectorPaintCanvasMorph;
VectorPaintCanvasMorph.uber = PaintCanvasMorph.prototype;

function VectorPaintCanvasMorph(shift) {
    this.init(shift);
}

VectorPaintCanvasMorph.prototype.init = function (shift) {
    VectorPaintCanvasMorph.uber.init.call(this, shift);
    this.vectorbrushBuffer = [];
    this.currentTool = "selection";
    this.settings = {
        "primarycolor": new Color(0, 0, 0, 255), // stroke color
        "secondarycolor": "transparent", // fill color
        "linewidth": 3 // stroke width
    };
    this.polygonBuffer = [];
};

VectorPaintCanvasMorph.prototype.clearCanvas = function () {
    var editor = this.parentThatIsA(VectorPaintEditorMorph);
    editor.vectorObjects = [];
    editor.vectorObjectsSelected = [];
    this.mask.getContext("2d").clearRect(0, 0, this.bounds.width(), this.bounds.height());
    this.drawNew(true);
    this.changed();
};

VectorPaintCanvasMorph.prototype.drawNew = function(isPrintVectObject) {
    var editor = this.parentThatIsA(VectorPaintEditorMorph),
        myself = this,
        can = newCanvas(this.extent());
    if(typeof isPrintVectObject === 'undefined') var isPrintVectObject = true;
    this.merge(this.background, can);
    this.merge(this.paper, can);
    if(isPrintVectObject) {
        editor.vectorObjects.forEach(function(each) {
            myself.merge(each.image, can)
        });
    }
    this.merge(this.mask, can);
    this.image = can;
    this.drawFrame();
};

VectorPaintCanvasMorph.prototype.floodfill = function (aPoint) {
    var shape,
        editor = this.parentThatIsA(VectorPaintEditorMorph),
        mctx = this.mask.getContext("2d"),
        index = [-1, null],             // index shape to floodfill
        j;                      // iterator number

    mctx.clearRect(0, 0, this.bounds.width(), this.bounds.height()); // clear any temporary shape in mask
    for (j = editor.vectorObjects.length-1; j >= 0; --j) {
        shape = editor.vectorObjects[j];
        if(typeof shape.fillColor !== 'undefined' && shape.containsPointEdge(aPoint)) {
            index[0] = j;
            index[1] = 'edge';
            break;
        }
        if(shape.containsPoint(aPoint)) { 
            index[0] = j;
            if(typeof shape.fillColor !== 'undefined') {
                index[1] = 'inline';
            }
            else {
                index[1] = 'edge';
            }
            break;
        }
    }
    if(index[0] !== -1) {
        for(j = 0; j < editor.vectorObjects.length; ++j) {
            shape = editor.vectorObjects[j];
            if(j === index[0]) {
                if(shape.constructor.name == "VectorBrush" && this.isShiftPressed()) {
                    /* If shift is pressed and it's a brush, it will convert from brush to closedBrush,*/
                    editor.vectorObjects[j] = new VectorClosedBrushPath(shape.borderWidth, shape.borderColor, this.settings.secondarycolor, shape.origin, null);
                    shape = editor.vectorObjects[j];
                }
                else if(index[1] === 'edge') {
                    shape.borderColor = this.settings.primarycolor;
                }
                else {
                    shape.fillColor = this.settings.secondarycolor;
                }
            }
            this.paintShape(shape, j);
        }
        this.drawNew(false);
        this.changed();
        mctx.restore();
    }
};

VectorPaintCanvasMorph.prototype.duplicateShape = function (aPoint) {
    var duplicatedShape,
        bounds,
        editor = this.parentThatIsA(VectorPaintEditorMorph),
        movementX,
        movementY,
        moveBuffer = [],
        tmp,
        mctx = this.mask.getContext("2d"),
        index = [];

    mctx.clearRect(0, 0, this.bounds.width(), this.bounds.height());
    if(!editor.vectorObjectsToDuplicate.length) {
        for (j = editor.vectorObjects.length-1; j >= 0; --j) {
            if(editor.vectorObjects[j].containsPoint(aPoint)) {
                editor.vectorObjectsToDuplicate.push(editor.vectorObjects[j].copy());
                break;
            }
        }
    }
    if(editor.vectorObjectsToDuplicate.length) {
        bounds = editor.getBoundsVectorObjects(editor.vectorObjectsToDuplicate);
        movementX = aPoint.x - (bounds.left+(bounds.right-bounds.left)/2);
        movementY = aPoint.y - (bounds.top+(bounds.bottom-bounds.top)/2);
    }
    for (j = editor.vectorObjectsToDuplicate.length-1; j >= 0; --j) {
        duplicatedShape = editor.vectorObjectsToDuplicate[j];
        if(typeof duplicatedShape.destination !== 'undefined') {
            duplicatedShape.origin = new Point (duplicatedShape.origin.x+movementX, duplicatedShape.origin.y+movementY);
            duplicatedShape.destination = new Point (duplicatedShape.destination.x+movementX, duplicatedShape.destination.y+movementY);
        }
        else {
            moveBuffer = [];
            for(jj = 0; jj < duplicatedShape.origin.length; ++jj) {
                tmp = new Point(duplicatedShape.origin[jj][0], duplicatedShape.origin[jj][1]);
                moveBuffer.push([tmp.x+movementX, tmp.y+movementY]);
            }
            duplicatedShape.origin = moveBuffer.slice();
        }
        this.paintShape(duplicatedShape, null);
    }
    this.drawNew(true);
    this.changed();
    mctx.restore();
    }

VectorPaintCanvasMorph.prototype.paintShape = function (shape, index) {
    var p, q, w, h, hRadius, vRadius, pathCircle,
        tmask = newCanvas(this.extent()),
        mctx = this.mask.getContext("2d"),
        tmctx = tmask.getContext("2d"),
        tool = shape.constructor.name,
        x = shape.origin.x,
        y = shape.origin.y,
        editor = this.parentThatIsA(VectorPaintEditorMorph),
        width = this.paper.width;
        
    if(typeof shape.destination !== 'undefined' && shape.destination !== null) {
        p = shape.destination.x,
        q = shape.destination.y,
        w = (p - x) / 2,
        h = (q - y) / 2;
    }
    if (editor.currentObject === null || 
        typeof editor.currentObject === 'undefined') editor.currentObject = [];

    tmctx.clearRect(0, 0, this.bounds.width(), this.bounds.height());
    tmctx.save();
    tmctx.lineWidth = shape.borderWidth;

    if(typeof shape.fillColor !== 'undefined') tmctx.fillStyle = shape.fillColor.toString();
    tmctx.strokeStyle = shape.borderColor.toString();

    switch (tool) {
        case "VectorRectangle":
            if(shape.fillColor !== "transparent") tmctx.fillRect(x, y, w * 2, h * 2);
            if(shape.borderColor !== "transparent") tmctx.strokeRect(x, y, w * 2, h * 2);
        break;
        case "VectorLine":
            tmctx.beginPath();
            tmctx.moveTo(x, y);
            tmctx.lineTo(p, q);
            tmctx.stroke();
        break;
        case "VectorEllipse":
            tmctx.beginPath();
            if(shape.vRadius === shape.hRadius) {
                tmctx.arc(
                    x,
                    y,
                    new Point(x, y).distanceTo(new Point(p, q)),
                    0,
                    Math.PI * 2,
                    false
                );
            }
            else {
                vRadius = 0;
                for (i = 0; i < width; ++i) {
                    pathCircle = 2 - Math.pow((i - x) / (2 * w),2);
                    tmctx.lineTo(
                        i,
                        (2 * h) * Math.sqrt(pathCircle) + y
                        );
                    if (i == x) { 
                        vRadius = Math.abs((2 * h) * Math.sqrt(pathCircle));
                    }
                    if (Math.sqrt(pathCircle) > 0) {
                        hRadius = Math.abs(i-x);
                    }
                }
                for (i = width; i > 0; i -= 1) {
                    tmctx.lineTo(
                        i,
                        -1 * (2 * h) * Math.sqrt(2 - Math.pow(
                            (i - x) / (2 * w),
                            2
                            )) + y
                        );
                }
            }
            tmctx.closePath();
            tmctx.stroke();
            tmctx.fill();
        break;
        case "VectorBrush": case "VectorClosedBrushPath": case "VectorPolygon":
            tmctx.lineCap = "round";
            tmctx.lineJoin = "round";
            tmctx.beginPath();
            tmctx.moveTo(shape.origin[0][0], shape.origin[0][1]); // first Point 
            for (i = 0; i < shape.origin.length; ++i) {
                tmctx.lineTo(shape.origin[i][0], shape.origin[i][1]);
            }
            if(tool === 'VectorClosedBrushPath' || tool === 'VectorPolygon') {
                tmctx.closePath();
                if(shape.fillColor !== "transparent") tmctx.fill();
            }
            tmctx.stroke();
        break;
        default:
            nop();
        }
        editor.currentObject.push([index, shape]);
        /* Save only one image */
        editor.currentObject[editor.currentObject.length-1][1].image.width = tmask.width;
        editor.currentObject[editor.currentObject.length-1][1].image.height = tmask.height;
        editor.currentObject[editor.currentObject.length-1][1].image.getContext('2d').drawImage(tmask, 0, 0);
        mctx.drawImage(tmask, 0, 0);
    }

VectorPaintCanvasMorph.prototype.mouseMove = function (pos) {
    if (this.currentTool === "paintbucket" || this.currentTool === "duplicate") {
        return;
    }
    var relpos = pos.subtract(this.bounds.origin),      // relative position
        mctx = this.mask.getContext("2d"), // current tool temporary context
        tmask = newCanvas(this.extent()),
        tmctx = tmask.getContext("2d"), // temporal draing context          
        pctx = this.paper.getContext("2d"),             // drawing context
        x = this.dragRect.origin.x, // original drag X
        y = this.dragRect.origin.y, // original drag y
        p = relpos.x,               // current drag x
        q = relpos.y,               // current drag y
        w = (p - x) / 2,            // half the rect width
        h = (q - y) / 2,            // half the rect height
        i,                          // iterator number
        tool,                       // current tool 
        resizeRatioX,               // escale ratio axis X 
        resizeRatioY,               // escale ratio axis Y
        axisX, axisY,
        movementX,
        movementY,
        circleIsMoved = false,
        tmp,                        // temporal variable
        boundsVecSelected,          // bounds of selection
        shapeSelected,              // current shape selected
        action,                     // if there are vectorObjects selected then action have to do.
        moveBuffer = [],            // moveVector in polygon, brush and closedbrush
        hRadius, vRadius, pathCircle, // horizontal and vertical circle
        currentObjectIterator = -1,
        width = this.paper.width,
        editor = this.parentThatIsA(VectorPaintEditorMorph),
        myself = this;

        mctx.save();
        function newW() {
            return Math.max(Math.abs(w), Math.abs(w)) * (w / Math.abs(w));
        }
        function newH() {
            return Math.max(Math.abs(w), Math.abs(h)) * (h / Math.abs(h));
        }
        this.brushBuffer.push([p, q]);
        mctx.lineWidth = this.settings.linewidth;
    mctx.clearRect(0, 0, this.bounds.width(), this.bounds.height()); // mask, clear previous temporary drawing
    this.dragRect.corner = relpos.subtract(this.dragRect.origin); // reset corner
    
    mctx.fillStyle = this.settings.secondarycolor.toString();
    mctx.strokeStyle = this.settings.primarycolor.toString();

    action = false;
    for(ii = 0; ii < editor.vectorObjectsSelected.length && action === false; ++ii) {
        action = editor.vectorObjectsSelected[ii].isInBoundingBox(new Point(x,y));
    }
    if (action === false) editor.vectorObjectsSelected = [];

    if(this.currentTool === 'selection' && editor.vectorObjectsSelected.length) {
        if(action !== false) {
            /* Resize functionality takes as reference boundaryBox */
            boundsVecSelected = editor.getBoundsVectorObjects(editor.vectorObjectsSelected);
            movementX = relpos.x-this.dragRect.origin.x; // distance moved
            movementY = relpos.y-this.dragRect.origin.y; // distance moved
            if(action === 'leftTop' || action === 'leftBottom') movementX *= -1;
            if(action === 'leftTop' || action === 'rightTop') movementY *= -1;
            resizeRatioX = (boundsVecSelected.right-boundsVecSelected.left+movementX)/((boundsVecSelected.right-boundsVecSelected.left) === 0 ? 1: boundsVecSelected.right-boundsVecSelected.left);
            resizeRatioY = (boundsVecSelected.bottom-boundsVecSelected.top+movementY)/((boundsVecSelected.bottom-boundsVecSelected.top) === 0 ? 1: boundsVecSelected.bottom-boundsVecSelected.top);
            axisX = (action === 'rightBottom' || action === 'rightTop')? boundsVecSelected.left: boundsVecSelected.right;
            axisY = (action === 'rightBottom' || action === 'leftBottom')? boundsVecSelected.top: boundsVecSelected.bottom;
            
            for(ii = 0; ii < editor.vectorObjects.length; ++ii) {
                if(editor.vectorObjectsSelected.indexOf(editor.vectorObjects[ii]) === -1) {
                    mctx.drawImage(editor.vectorObjects[ii].image, 0, 0);
                }
                else {
                    ++currentObjectIterator;
                    shapeSelected = editor.vectorObjects[ii];
                    tool = shapeSelected.constructor.name;
                    if(typeof shapeSelected.fillColor !== 'undefined') tmctx.fillStyle = shapeSelected.fillColor.toString();
                    tmctx.strokeStyle = shapeSelected.borderColor.toString();
                    tmctx.lineWidth = shapeSelected.borderWidth;

                    if (action === true){
                        /* Move figure */
                        if(tool === 'VectorBrush' || tool === 'VectorClosedBrushPath' || tool === 'VectorPolygon') {
                            moveBuffer = [], tmp;
                            /* Clone array */
                            for(z = 0; z < shapeSelected.origin.length; ++z) {
                                tmp = new Point(shapeSelected.origin[z][0], shapeSelected.origin[z][1]);
                                moveBuffer.push([tmp.x+movementX, tmp.y+movementY]);
                            }
                        }
                        else {
                            /* Line, Rectangle, Ellipse,  */
                            if(tool === 'VectorEllipse' && shapeSelected.hRadius === shapeSelected.vRadius) circleIsMoved = true;
                            x = shapeSelected.origin.x + movementX; 
                            y = shapeSelected.origin.y + movementY;
                            p = shapeSelected.destination.x + movementX;
                            q = shapeSelected.destination.y + movementY;
                        }
                    }
                    else {
                        if(tool === 'VectorEllipse' || tool === 'VectorRectangle' || tool === 'VectorLine') {
                            tmp = new Point(shapeSelected.origin.x-axisX, shapeSelected.origin.y-axisY);
                            x = (tmp.x*resizeRatioX)+axisX;
                            y = (tmp.y*resizeRatioY)+axisY;
                            tmp = new Point(shapeSelected.destination.x-axisX, shapeSelected.destination.y-axisY);
                            p = (tmp.x*resizeRatioX)+axisX;
                            q = (tmp.y*resizeRatioY)+axisY;
                        } else if(tool === 'VectorBrush' || tool === 'VectorClosedBrushPath' || tool === 'VectorPolygon') {
                            moveBuffer = [];
                            for(z = 0; z < shapeSelected.origin.length; ++z) {
                                    tmp = new Point(shapeSelected.origin[z][0]-axisX, shapeSelected.origin[z][1]-axisY);
                                    moveBuffer.push([(tmp.x*resizeRatioX)+axisX, (tmp.y*resizeRatioY)+axisY]);
                                }
                        }
                    }
                        
                    w = (p - x) / 2,            // recalculate half the rect width
                    h = (q - y) / 2;            // recalculate half the rect height
                    /* drawing actioned */
                    if (editor.currentObject === null) editor.currentObject = [];
                    switch (tool) {
                        case "VectorRectangle":
                            if(shapeSelected.fillColor !== "transparent") tmctx.fillRect(x, y, w * 2, h * 2);
                            if(shapeSelected.borderColor !== "transparent") tmctx.strokeRect(x, y, w * 2, h * 2);
                            if (currentObjectIterator < editor.currentObject.length) {
                                editor.currentObject[currentObjectIterator][1].origin = new Point(x,y);
                                editor.currentObject[currentObjectIterator][1].destination = new Point(p,q);
                            } else {
                                editor.currentObject.push([ii, new VectorRectangle(shapeSelected.borderWidth, shapeSelected.borderColor, shapeSelected.fillColor, new Point(x,y), new Point(p,q))]);
                            }
                        break;
                        case "VectorLine":
                            tmctx.beginPath();
                            tmctx.moveTo(x, y);
                            tmctx.lineTo(p, q); // lineTo = create a line position
                            if (currentObjectIterator < editor.currentObject.length) {
                                editor.currentObject[currentObjectIterator][1].origin = new Point(x,y);
                                editor.currentObject[currentObjectIterator][1].destination = new Point(p, q);
                            } else {
                                /* borderWidth, borderColor, fillColor, origin, destination */
                                editor.currentObject.push([ii, new VectorLine(shapeSelected.borderWidth, shapeSelected.borderColor, shapeSelected.fillColor, new Point(x,y), new Point(p,q))]);
                            }
                            tmctx.stroke();
                        break;
                        case "VectorEllipse":
                            tmctx.beginPath();
                            if(circleIsMoved) {
                                tmctx.arc(
                                    x,
                                    y,
                                    new Point(x, y).distanceTo(new Point(p, q)),
                                    0,
                                    Math.PI * 2,
                                    false
                                    );
                                hRadius = new Point(x, y).distanceTo(new Point(p, q));
                                vRadius = hRadius;
                            }
                            else {
                                vRadius = 0;
                                for (i = 0; i < width; ++i) {
                                    pathCircle = 2 - Math.pow((i - x) / (2 * w),2);
                                    tmctx.lineTo(
                                        i,
                                        (2 * h) * Math.sqrt(pathCircle) + y
                                        );
                                    if (i <= x) {
                                        vRadius = Math.abs((2 * h) * Math.sqrt(pathCircle));
                                    }
                                    if (Math.sqrt(pathCircle) > 0) {
                                        hRadius = Math.abs(i-x);
                                    }
                                }
                                for (i = width; i > 0; i -= 1) {
                                    tmctx.lineTo(
                                        i,
                                        -1 * (2 * h) * Math.sqrt(2 - Math.pow(
                                            (i - x) / (2 * w),
                                            2
                                            )) + y
                                        );
                                }
                            }
                            if (currentObjectIterator < editor.currentObject.length) {
                                editor.currentObject[currentObjectIterator][1].origin = new Point(x,y);
                                editor.currentObject[currentObjectIterator][1].destination = new Point(p,q);
                                editor.currentObject[currentObjectIterator][1].hRadius = hRadius;
                                editor.currentObject[currentObjectIterator][1].vRadius = vRadius;
                            }
                            else {
                                editor.currentObject.push([ii, new VectorEllipse(shapeSelected.borderWidth, shapeSelected.borderColor, shapeSelected.fillColor, new Point(x,y), new Point(p,q), hRadius , vRadius)]);
                            }
                            tmctx.closePath();
                            tmctx.stroke();
                            tmctx.fill();
                        break;
                        case "VectorBrush": case "VectorClosedBrushPath":
                            tmctx.lineCap = "round";
                            tmctx.lineJoin = "round";
                            tmctx.beginPath();
                            tmctx.moveTo(moveBuffer[0][0], moveBuffer[0][1]); // first Point 
                            for (i = 0; i < moveBuffer.length; ++i) {
                                tmctx.lineTo(moveBuffer[i][0], moveBuffer[i][1]);
                            }
                            if(currentObjectIterator < editor.currentObject.length) {
                                editor.currentObject[currentObjectIterator][1].origin = moveBuffer;
                            } else {
                                if(tool === 'VectorBrush') editor.currentObject.push([ii, new VectorBrush(shapeSelected.borderWidth, shapeSelected.borderColor, shapeSelected.fillColor, moveBuffer, null)]);
                                else editor.currentObject.push([ii, new VectorClosedBrushPath(shapeSelected.borderWidth, shapeSelected.borderColor, shapeSelected.fillColor, moveBuffer, null)]);
                            }
                            if(tool === 'VectorClosedBrushPath') {
                                tmctx.closePath();
                                if(shapeSelected.fillColor !== "transparent") tmctx.fill();
                            }
                            tmctx.stroke();
                        break;
                        case "VectorPolygon":
                                tmctx.lineCap = "round"; // "A rounded end cap is added to each end of the line"
                                tmctx.lineJoin = "round";
                                tmctx.beginPath();
                                tmctx.moveTo(moveBuffer[0][0], moveBuffer[0][1]);
                                for (i = 0; i < moveBuffer.length; ++i) {
                                    tmctx.lineTo(moveBuffer[i][0], moveBuffer[i][1]);
                                }
                                if(currentObjectIterator < editor.currentObject.length) {
                                    editor.currentObject[currentObjectIterator][1].origin = moveBuffer;
                                } else {
                                    editor.currentObject.push([ii, new VectorPolygon(shapeSelected.borderWidth, shapeSelected.borderColor, shapeSelected.fillColor, moveBuffer, null)]);
                                }
                                tmctx.closePath();
                                if(shapeSelected.fillColor !== "transparent") tmctx.fill();
                                tmctx.stroke();
                            break;
                        default:
                            nop();
                        }
                        /* Save only one image */
                        editor.currentObject[currentObjectIterator][1].image.width = tmask.width;
                        editor.currentObject[currentObjectIterator][1].image.height = tmask.height;
                        editor.currentObject[currentObjectIterator][1].image.getContext('2d').drawImage(tmask, 0, 0);
                        mctx.drawImage(tmask, 0, 0);
                        tmctx.clearRect(0, 0, this.bounds.width(), this.bounds.height());
                    }
                }
            }
            this.drawNew(false);
            this.changed();
            mctx.restore();
        } else {
        // traditional 
            switch (this.currentTool) {

                case "selection":
                if (!editor.vectorObjectsSelected.length) {
                    tmp = mctx.strokeStyle; // auxColor
                    mctx.strokeStyle = "black";
                    mctx.lineWidth = 1;
                    mctx.setLineDash([6]);
                    mctx.strokeRect(x, y, w * 2, h * 2);
                    mctx.strokeStyle = tmp;
                    mctx.setLineDash([]);
                }
                break;
                case "rectangle":
                if (this.isShiftPressed()) {
                    if(this.settings.secondarycolor !== "transparent") mctx.fillRect(x, y, newW() * 2, newH() * 2);
                    if(this.settings.primarycolor !== "transparent") mctx.strokeRect(x, y, newW() * 2, newH() * 2);
                    if (editor.currentObject) {
                        editor.currentObject.origin = new Point(x,y);
                        editor.currentObject.destination = new Point(x + newW() * 2, y + newH() * 2);
                    } else {
                        editor.currentObject = new VectorRectangle(this.settings.linewidth, this.settings.primarycolor, this.settings.secondarycolor, new Point(x,y), new Point(x + newW() * 2, y + newH() * 2));
                    }
                } else {
                    if(this.settings.secondarycolor !== "transparent") mctx.fillRect(x, y, w * 2, h * 2);
                    if(this.settings.primarycolor !== "transparent") mctx.strokeRect(x, y, w * 2, h * 2);
                    if (editor.currentObject) {
                        editor.currentObject.origin = new Point(x,y);
                        editor.currentObject.destination = new Point(p,q);
                    } else {
                        editor.currentObject = new VectorRectangle(this.settings.linewidth, this.settings.primarycolor, this.settings.secondarycolor, new Point(x,y), new Point(p,q));
                    }

                }   
                break;
                case "brush": case "closedBrushPath":
                /* Save each point in a VectorBrusher */
                this.brush = function(isClosed) {
                    mctx.lineWidth = this.settings.linewidth;
                    mctx.fillStyle = this.settings.secondarycolor.toString();
                    mctx.strokeStyle = this.settings.primarycolor.toString();
                    mctx.lineCap = "round"; // "A rounded end cap is added to each end of the line"
                    mctx.lineJoin = "round";
                    mctx.beginPath();
                    mctx.moveTo(this.brushBuffer[0][0], this.brushBuffer[0][1]); // first Point 
                    for (i = 0; i < this.brushBuffer.length; ++i) {
                        mctx.lineTo(this.brushBuffer[i][0], this.brushBuffer[i][1]);
                    }
                    if (editor.currentObject) {
                        editor.currentObject.origin = this.brushBuffer.slice();
                    } else {
                        editor.currentObject = new VectorBrush(this.settings.linewidth, this.settings.primarycolor, this.settings.secondarycolor, this.brushBuffer.slice(), null);
                    }
                    if(isClosed) {
                        editor.currentObject = new VectorClosedBrushPath(this.settings.linewidth, this.settings.primarycolor, this.settings.secondarycolor, this.brushBuffer.slice(), null);
                        mctx.closePath();
                        mctx.fill();
                    }
                    mctx.stroke();
                    }
                    this.brush(false);
                    break;
                    case "line":    
                        mctx.beginPath();
                        mctx.moveTo(x, y);
                        if (this.isShiftPressed()) {
                            if (Math.abs(h) > Math.abs(w)) {
                                mctx.lineTo(x, q);
                                if (editor.currentObject) {
                                    editor.currentObject.origin = new Point(x,y);
                                    editor.currentObject.destination = new Point(x, q);
                                } else {
                                    /* borderWidth, borderColor, fillColor, origin, destination */
                                    editor.currentObject = new VectorLine(this.settings.linewidth, this.settings.primarycolor, this.settings.secondarycolor, new Point(x,y), new Point(x, q));
                                }
                            } else {
                            mctx.lineTo(p, y); // lineTo = create a line position
                            if (editor.currentObject) {
                                editor.currentObject.origin = new Point(x,y);
                                editor.currentObject.destination = new Point(p, y);
                            } else {
                                /* borderWidth, borderColor, fillColor, origin, destination */
                                editor.currentObject = new VectorLine(this.settings.linewidth, this.settings.primarycolor, this.settings.secondarycolor, new Point(x,y), new Point(p, y));
                            }
                        }
                        } else {
                            mctx.lineTo(p, q);
                            if (editor.currentObject) {
                                editor.currentObject.origin = new Point(x,y);
                                editor.currentObject.destination = new Point(p,q); // p & q
                            } else {
                                editor.currentObject = new VectorLine(this.settings.linewidth, this.settings.primarycolor, this.settings.secondarycolor, new Point(x,y), relpos);
                            }
                        }
                        mctx.stroke();
                break;
                case "circle":
                    mctx.beginPath();
                    if (this.isShiftPressed()) {
                        /* http://www.w3schools.com/tags/canvas_arc.asp */
                        mctx.arc(
                            x,
                            y,
                            new Point(x, y).distanceTo(new Point(p, q)),
                            0,
                            Math.PI * 2,
                            false
                            );
                        hRadius = new Point(x, y).distanceTo(new Point(p, q)),
                        vRadius = hRadius;
                        if (editor.currentObject) {
                            editor.currentObject.origin = new Point(x,y);
                            editor.currentObject.destination = new Point(p,q);
                            editor.currentObject.hRadius = hRadius;
                            editor.currentObject.vRadius = vRadius;
                        }
                        else {
                            editor.currentObject = new VectorEllipse(this.settings.linewidth, this.settings.primarycolor, this.settings.secondarycolor, new Point(x,y),  new Point(p,q), hRadius, vRadius);
                        }
                    } else {
                        vRadius = 0;
                        for (i = 0; i < width; ++i) {
                            pathCircle = 2 - Math.pow((i - x) / (2 * w),2);
                            mctx.lineTo(
                                i,
                                (2 * h) * Math.sqrt(pathCircle) + y
                                );
                            if (i == x) { 
                                vRadius = Math.abs((2 * h) * Math.sqrt(pathCircle));
                            }
                            if (Math.sqrt(pathCircle) > 0) {
                                hRadius = Math.abs(i-x);
                            }
                        }
                        for (i = width; i > 0; i -= 1) {
                            mctx.lineTo(
                                i,
                                -1 * (2 * h) * Math.sqrt(2 - Math.pow(
                                    (i - x) / (2 * w),
                                    2
                                    )) + y
                                );
                        }
                        if (editor.currentObject) {
                            editor.currentObject.origin = new Point(x,y);
                            editor.currentObject.destination = new Point(p,q);
                            editor.currentObject.hRadius = hRadius;
                            editor.currentObject.vRadius = vRadius;
                        }
                        else {
                            editor.currentObject = new VectorEllipse(this.settings.linewidth, this.settings.primarycolor, this.settings.secondarycolor, new Point(x,y), new Point(p,q), hRadius , vRadius);
                        }
                    }
                    mctx.closePath();
                    mctx.stroke();
                    mctx.fill();
                break;
                case "polygon":
                    if(!this.polygonBuffer.length) this.polygonBuffer.push([x,y]);
                    this.polygon = function(isClosedYet) {
                        mctx.lineWidth = this.settings.linewidth;
                        mctx.fillStyle = this.settings.secondarycolor.toString();
                        mctx.strokeStyle = this.settings.primarycolor.toString();
                        mctx.lineCap = "round"; // "A rounded end cap is added to each end of the line"
                        mctx.lineJoin = "round";
                        mctx.beginPath();
                        mctx.moveTo(this.polygonBuffer[0][0], this.polygonBuffer[0][1]);
                        for (i = 1; i < this.polygonBuffer.length; ++i) {
                            mctx.lineTo(this.polygonBuffer[i][0], this.polygonBuffer[i][1]);
                        }
                        if (editor.currentObject) {
                            /* Is it necessary? */
                            editor.currentObject.origin = this.polygonBuffer.slice();
                        } else {
                            editor.currentObject = new VectorPolygon(this.settings.linewidth, this.settings.primarycolor, this.settings.secondarycolor, this.polygonBuffer.slice(), null);
                        }
                        mctx.lineTo(p, q);
                        if(isClosedYet) {
                            editor.currentObject.origin = this.polygonBuffer.slice();
                            mctx.closePath();
                            mctx.fill();
                        }
                        mctx.stroke();
                    }
                    this.polygon(false);
                    break;
                case "crosshairs":
                    this.rotationCenter = relpos.copy();
                    this.drawcrosshair(mctx);
                break;
                default:
                    nop();
                break;
            }
            this.drawNew(true);
            this.changed();
            mctx.restore();
        }
    this.previousDragPoint = new Point(p,q);
};

VectorPaintCanvasMorph.prototype.mouseClickLeft = function () {
    var selectionBounds,
        editor = this.parentThatIsA(VectorPaintEditorMorph),
        mctx = this.mask.getContext("2d");
    function deselect() {
                /* erase selection*/
        editor.vectorObjectsSelected = [];
    }
    if (this.currentTool === "selection" && editor.currentObject === null) {
        deselect();
        mctx.save();
        mctx.clearRect(0, 0, editor.bounds.width(), editor.bounds.height()); // clear dashed rectangle
        this.drawNew();
        this.changed();
        mctx.restore();
        selectionBounds = new VectorRectangle(null, null, null, this.dragRect.origin, this.previousDragPoint);
        for (j = editor.vectorObjects.length-1; j >= 0; --j) {
            if(editor.vectorObjects[j].isFound(selectionBounds)) {
                mctx.save();
                editor.vectorObjects[j].drawBoundingBox(mctx);
                this.drawNew();
                this.changed();
                mctx.restore();
                editor.vectorObjectsSelected.push(editor.vectorObjects[j]);
                if(selectionBounds.origin.x === selectionBounds.destination.x 
                    && selectionBounds.origin.y === selectionBounds.destination.y) {
                    break;
                    }
            }
        }
    }
    else if ((this.currentTool === "selection" || this.currentTool === "paintbucket") && editor.currentObject !== null) {
        editor.vectorObjectsSelected = [];
        for (ii = editor.currentObject.length-1; ii >= 0; --ii) {
            editor.vectorObjects.splice(editor.currentObject[ii][0],1);
            editor.vectorObjects.splice(editor.currentObject[ii][0], 0, editor.currentObject[ii][1]); // splice(position, numberOfItemsToRemove, item)
            if(this.currentTool !== "paintbucket") {
                editor.vectorObjectsSelected.push(editor.vectorObjects[editor.currentObject[ii][0]]);
                mctx.save();
                editor.vectorObjects[editor.currentObject[ii][0]].drawBoundingBox(mctx);
                this.drawNew();
                this.changed();
                mctx.restore();
            }
        }
        editor.currentObject = null;
    }
    else if (this.currentTool === "closedBrushPath") {
        this.brush(true);
        this.drawNew();
        this.changed();
        mctx.restore();
    }
    if(this.currentTool === "duplicate") {
        if(editor.currentObject === null) {
            editor.vectorObjectsToDuplicate = [];
            this.duplicateShape(this.dragRect.origin);
        }
        if(editor.currentObject !== null) {
            for (ii = 0; ii < editor.currentObject.length; ++ii) {
                editor.vectorObjects.push(editor.currentObject[ii][1]);
            }
        }
        editor.currentObject = null;
        deselect();
    }
    else if(this.currentTool === "polygon") {
        if(this.polygonBuffer[0][0] === this.previousDragPoint.x && 
            this.polygonBuffer[0][0] === this.previousDragPoint.y ||
            this.polygonBuffer[this.polygonBuffer.length-1][0] === this.previousDragPoint.x && 
            this.polygonBuffer[this.polygonBuffer.length-1][1] === this.previousDragPoint.y) {
            this.polygon(true);
            this.polygonBuffer.length = 0;
            this.drawNew();
            this.changed();
            mctx.restore();
            editor.vectorObjects.push(editor.currentObject);
            editor.currentObject.image.width = this.mask.width;
            editor.currentObject.image.height = this.mask.height;
            editor.currentObject.image.getContext('2d').drawImage(this.mask, 0, 0);
            editor.currentObject = null;
        }
        else {
            this.polygonBuffer.push([this.previousDragPoint.x, this.previousDragPoint.y]);
        }
    }
    else if (editor.currentObject !== null && this.currentTool !== "crosshairs" 
        && this.currentTool !== "selection" 
        && this.currentTool !== "paintbucket") {
        
        editor.vectorObjects.push(editor.currentObject);
        editor.currentObject.image.width = this.mask.width;
        editor.currentObject.image.height = this.mask.height;
        editor.currentObject.image.getContext('2d').drawImage(this.mask, 0, 0);
        editor.currentObject = null;
        deselect();
    }
    this.brushBuffer.length = 0;
}

///////////////////////// VectorCostume //////////////////////////////////////

// SVG_Costume does not have an init function and thus needs default dummy values
VectorCostume.prototype = new SVG_Costume(new Image(), '', new Point(0,0));
VectorCostume.prototype.constructor = VectorCostume;
VectorCostume.uber = SVG_Costume.prototype;

// VectorCostume instance creation

function VectorCostume(image, name, rotationCenter, vectorObjects) {
    if (image && name && rotationCenter) {
        this.contents = image;
        this.shrinkToFit(this.maxExtent());
        this.name = name || null;
        this.rotationCenter = rotationCenter;
    }
    this.vectorObjects = vectorObjects ? vectorObjects : [];
    this.version = Date.now(); // for observer optimization
    this.loaded = null; // for de-serialization only
}

// VectorCostume duplication

VectorCostume.prototype.copy = function () {
    var img = new Image(),
        cpy,
        myself = this;
    img.src = this.contents.src;
    cpy = new VectorCostume(img, this.name ? copy(this.name) : null, this.rotationCenter.copy());
    this.vectorObjects.forEach(function(each) {
        cpy.vectorObjects.push(each.copy());
    });
    return cpy;
};

VectorCostume.prototype.edit = function (aWorld, anIDE, isnew, oncancel, onsubmit) {
    var myself = this,
        editor = new VectorPaintEditorMorph();
    editor.oncancel = oncancel || nop;
    editor.openIn(
        aWorld,
        isnew ?
                newCanvas(StageMorph.prototype.dimensions) : 
                this.contents,
        isnew ?
                new Point(240, 180) :
                myself.rotationCenter,
        function (img, rc, vectorObjects) {
            myself.contents = img;
            myself.rotationCenter = rc;
            myself.vectorObjects = vectorObjects;
            myself.version = Date.now();
            aWorld.changed();
            if (anIDE) {
                if (isnew) { anIDE.currentSprite.addCostume(myself) };
                anIDE.currentSprite.wearCostume(myself);
                anIDE.hasChangedMedia = true;
            }
            (onsubmit || nop)();
        },
        anIDE,
        this.vectorObjects ? this.vectorObjects : []
    );
};

///////////////////////// Costume //////////////////////////////////////

Costume.prototype.edit = function (aWorld, anIDE, isnew, oncancel, onsubmit) {
    var myself = this,
        editor = new PaintEditorMorph();
    editor.oncancel = oncancel || nop;
    editor.openIn(
        aWorld,
        isnew ?
                newCanvas(StageMorph.prototype.dimensions) :
                this.contents,
        isnew ?
                new Point(240, 180) :
                this.rotationCenter,
        function (img, rc) {
            myself.contents = img;
            myself.rotationCenter = rc;
            if (anIDE.currentSprite instanceof SpriteMorph) {
                // don't shrinkwrap stage costumes
                myself.shrinkWrap();
            }
            myself.version = Date.now();
            aWorld.changed();
            if (anIDE) {
                if (isnew) { anIDE.currentSprite.addCostume(myself) };
                anIDE.currentSprite.wearCostume(myself);
                anIDE.hasChangedMedia = true;
            }
            (onsubmit || nop)();
        },
        anIDE
    );
};

///////////////////////// CostumeIconMorph //////////////////////////////////////

CostumeIconMorph.prototype.editCostume = function () {
    if (this.object instanceof SVG_Costume && typeof this.object.vectorObjects === 'undefined') {
        this.object.editRotationPointOnly(this.world());
    } else {
        this.object.edit(
            this.world(),
            this.parentThatIsA(IDE_Morph)
        );
    }
};
