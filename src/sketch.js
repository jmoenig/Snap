/*
    sketch.js

    a vector paint editor for Snap!
    inspired by the Snap bitmap paint editor and the Scratch vector editor.

    written by Carles Paredes and Bernat Romagosa
    Copyright (C) 2017 by Carles Paredes and Bernat Romagosa

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
        VectorEllipse
        VectorPolygon
        VectorSelection
        VectorPaintEditorMorph
        VectorPaintCanvasMorph

    credits
    -------
    Carles Paredes wrote the first working prototype in 2015
    Bernat Romagosa rewrote most of the code in 2017

    revision history
    -----------------
    2018, June 5 (Jens):
        - fixed initial rotation center for an existing costume
        - fixed initial rendering, so costumes can be re-opened after saving
    2018, June 20 (Jens):
        - select primary color with right-click (in addition to shift-click)
*/

/*global Point, Object, Rectangle, AlignmentMorph, Morph, XML_Element, nop,
PaintColorPickerMorph, Color, SliderMorph, InputFieldMorph, ToggleMorph,
TextMorph, Image, newCanvas, PaintEditorMorph, StageMorph, Costume, isNil,
localize, PaintCanvasMorph, detect, modules*/

modules.sketch = '2019-October-09';

// Declarations

var VectorShape;
var VectorRectangle;
var VectorLine;
var VectorEllipse;
var VectorPolygon;
var VectorSelection;
var VectorPaintEditorMorph;
var VectorPaintCanvasMorph;

// VectorShape

VectorShape.prototype = {};
VectorShape.prototype.constructor = VectorShape;
VectorShape.uber = Object.prototype;

function VectorShape (borderWidth, borderColor, fillColor) {
    this.init(borderWidth, borderColor, fillColor);
}

VectorShape.prototype.init = function (borderWidth, borderColor, fillColor) {
    this.borderWidth = (borderColor && borderColor.a) ? borderWidth : 0;
    this.borderColor = borderColor || new Color(0,0,0,0);
    this.fillColor = fillColor || new Color(0,0,0,0);
    this.image = newCanvas();
    this.isPolygon = false;
    this.isSelection = false;
    this.isCrosshair = false;
    this.origin = new Point();
    this.destination = new Point();
};

VectorShape.prototype.toString = function () {
    return 'a ' +
        (this.constructor.name ||
         this.constructor.toString().split(' ')[1].split('(')[0]);
};

VectorShape.prototype.asSVG = function (tagName) {
    var svg = new XML_Element(tagName);

    if (this.borderColor && this.borderColor.a) {
        // if border is not transparent
        svg.attributes.stroke = this.borderColor.toRGBstring();
        svg.attributes['stroke-linejoin'] = 'miter';
        svg.attributes['stroke-width'] = this.borderWidth;
    } else {
        svg.attributes.stroke = 'none';
    }

    if (this.fillColor && this.fillColor.a) {
        // if fill color is not transparent
        svg.attributes.fill = this.fillColor.toRGBstring();
    } else {
        svg.attributes.fill = 'none';
    }

    svg.attributes.prototype = this.constructor.name;

    return svg;
};

VectorShape.prototype.imageURL = function () {
    var svg = new XML_Element('svg'),
        bounds = this.bounds();

    svg.attributes.xmlns = 'http://www.w3.org/2000/svg';
    svg.attributes.version = '1.1';
    svg.attributes.preserveAspectRatio = 'xMinYMin meet';
    svg.attributes.viewBox =
        bounds.left() + ' ' + bounds.top() + ' ' +
        (bounds.right() - bounds.left()) + ' ' +
        (bounds.bottom() - bounds.top());
    svg.attributes.width = (bounds.right() - bounds.left());
    svg.attributes.height = (bounds.bottom() - bounds.top());

    svg.children = [ this.asSVG() ];

    return 'data:image/svg+xml;base64,' + svg;
};

VectorShape.prototype.copy = function (newShape) {
    var shape =
        newShape ||
        new VectorShape(
            this.borderWidth,
            this.borderColor,
            this.fillColor
        );
    shape.image.width = this.image.width;
    shape.image.height = this.image.height;
    shape.image.getContext('2d').drawImage(this.image,0,0);
    return shape;
};

VectorShape.prototype.bounds = function() {
    return new Rectangle(
        Math.min(this.origin.x, this.destination.x) - (this.borderWidth / 2),
        Math.min(this.origin.y, this.destination.y) - (this.borderWidth / 2),
        Math.max(this.origin.x, this.destination.x) + (this.borderWidth / 2),
        Math.max(this.origin.y, this.destination.y) + (this.borderWidth / 2)
    );
};

VectorShape.prototype.containsPoint = function (aPoint) {
    return this.bounds().containsPoint(aPoint);
};

VectorShape.prototype.update = function (newPoint, constrain) {
    this.destination = constrain ? this.constraintPoint(newPoint) : newPoint;
};

VectorShape.prototype.constraintPoint = function (aPoint) {
    var newPoint = aPoint,
        delta = newPoint.subtract(this.origin),
        constraintPos = new Point(
            Math.max(
                Math.abs(delta.x),
                Math.abs(delta.y)) * (delta.x / Math.abs(delta.x)
            ),
            Math.max(
                Math.abs(delta.x),
                Math.abs(delta.y)) * (delta.y / Math.abs(delta.y)
            )
        );

    newPoint = this.origin.add(constraintPos);
    return newPoint;
};

VectorShape.prototype.setColor = function (color, isSecondary) {
    if (isSecondary) {
        this.borderColor = color;
    } else {
        this.fillColor = color;
    }
};

VectorShape.prototype.setBorderWidth = function (width) {
    if (this.borderColor && this.borderColor.a) {
        this.borderWidth = width;
    }
};

VectorShape.prototype.moveBy = function (delta) {
    this.origin = this.origin.add(delta);
    this.destination = this.destination.add(delta);
};

VectorShape.prototype.resizeBy = function (delta, origin) {
    this.origin = this.origin.subtract(origin).multiplyBy(delta).add(origin);
    this.destination = this.destination.subtract(origin).multiplyBy(delta).add(
        origin
    );
};

// Generic drawOn method that stamps the shape SVG into its image canvas
// with position relative to aCanvasMorph's and asks it to redraw itself
VectorShape.prototype.drawOn = function (aCanvasMorph) {
    var myself = this,
        origin = this.bounds().origin.subtract(aCanvasMorph.position()),
        img = new Image();

    this.image = newCanvas(aCanvasMorph.extent());

    img.onload = function () {
        myself.image.getContext('2d').drawImage(img, origin.x, origin.y);
        aCanvasMorph.redraw = true;
    };

    img.src = this.imageURL();
};

// VectorRectangle

VectorRectangle.prototype = new VectorShape();
VectorRectangle.prototype.constructor = VectorRectangle;
VectorRectangle.uber = VectorShape.prototype;

function VectorRectangle (
    borderWidth,
    borderColor,
    fillColor,
    origin,
    destination
) {
    VectorRectangle.uber.init.call(this, borderWidth, borderColor, fillColor);
    this.init(origin, destination);
}

VectorRectangle.prototype.init = function (origin, destination) {
    this.origin = origin;
    this.destination = destination;
};

VectorRectangle.fromSVG = function (svg) {
    var attributes = svg.attributes;

    return new VectorRectangle(
            parseInt(attributes['stroke-width']), // borderWidth
            attributes.stroke === 'none' ? null :
                Color.fromString(attributes.stroke), // borderColor
            attributes.fill === 'none' ? null :
                Color.fromString(attributes.fill), // fillColor
            new Point(  // origin
                parseInt(attributes.x), parseInt(attributes.y)
            ),
            new Point( // destination
                parseInt(attributes.x) + parseInt(attributes.width),
                parseInt(attributes.y) + parseInt(attributes.height)
            )
        );
};

VectorRectangle.prototype.copy = function () {
    var newRectangle = new VectorRectangle(
        this.borderWidth,
        this.borderColor,
        this.fillColor,
        this.origin.copy(),
        this.destination.copy()
    );
    return VectorRectangle.uber.copy.call(this, newRectangle);
};

VectorRectangle.prototype.toString = function () {
    return VectorRectangle.uber.toString.call(this) + this.bounds().toString();
};

VectorRectangle.prototype.width = function () {
    return Math.abs(this.origin.x - this.destination.x);
};

VectorRectangle.prototype.height = function () {
    return Math.abs(this.origin.y - this.destination.y);
};

VectorRectangle.prototype.x = function () {
    return Math.min(this.origin.x, this.destination.x);
};

VectorRectangle.prototype.y = function () {
    return Math.min(this.origin.y, this.destination.y);
};

VectorRectangle.prototype.asSVG = function () {
    var svg = VectorRectangle.uber.asSVG.call(this, 'rect');
    svg.attributes.width = this.width();
    svg.attributes.height = this.height();
    svg.attributes.x = this.x();
    svg.attributes.y = this.y();
    return svg;
};

VectorRectangle.prototype.drawOn = function (aCanvasMorph) {
    var context,
        canvasPosition = aCanvasMorph.position();

    this.image = newCanvas(aCanvasMorph.extent());

    context = this.image.getContext('2d');

    context.beginPath();
    context.rect(
        this.x() - canvasPosition.x,
        this.y() - canvasPosition.y,
        this.width(),
        this.height()
    );

    if (this.fillColor.a > 0) {
        context.fillStyle = this.fillColor.toRGBstring();
        context.fill();
    }

    if (this.borderColor.a > 0) {
        context.lineWidth = this.borderWidth;
        context.strokeStyle = this.borderColor.toRGBstring();
        context.stroke();
    }

    aCanvasMorph.redraw = true;
};

// VectorLine

VectorLine.prototype = new VectorShape();
VectorLine.prototype.constructor = VectorLine;
VectorLine.uber = VectorShape.prototype;

function VectorLine (borderWidth, borderColor, origin, destination) {
    VectorLine.uber.init.call(this, borderWidth, borderColor);
    this.init(origin, destination);
}

VectorLine.prototype.init = function(origin, destination) {
    this.origin = origin;
    this.destination = destination;
};

VectorLine.fromSVG = function (svg) {
    var attributes = svg.attributes;
    return new VectorLine(
        parseInt(attributes['stroke-width']), // borderWidth
        Color.fromString(attributes.stroke), // borderColor
        new Point(parseInt(attributes.x1), parseInt(attributes.y1)), // origin
        new Point(parseInt(attributes.x2), parseInt(attributes.y2)) // dest.
    );
};

VectorLine.prototype.copy = function () {
    var newLine = new VectorLine(
        this.borderWidth,
        this.borderColor.copy(),
        this.origin.copy(),
        this.destination.copy()
    );
    return VectorLine.uber.copy.call(this, newLine);
};

VectorLine.prototype.containsPoint = function (aPoint) {
    var lineLength = this.origin.distanceTo(this.destination),
        distancesSum = aPoint.distanceTo(this.origin) +
            aPoint.distanceTo(this.destination);

    return Math.abs(lineLength - distancesSum) <=
        Math.sqrt(this.borderWidth / 2) / 2;
};

VectorLine.prototype.constraintPoint = function (aPoint) {
    var angle,
        newPoint = aPoint;

    angle = newPoint.subtract(this.origin).abs().degrees();
    if (angle < 22.5) {
        // horizontal line
        newPoint.y = this.origin.y;
    } else if (angle > 67.5) {
        // vertical line
        newPoint.x = this.origin.x;
    } else {
        // line at 45º
        newPoint = VectorLine.uber.constraintPoint.call(this, aPoint);
    }

    return newPoint;
};

VectorLine.prototype.setColor = function (color, isSecondary) {
    VectorLine.uber.setColor.call(this, color, !isSecondary);
};

VectorLine.prototype.toString = function () {
    return VectorLine.uber.toString.call(this) + this.bounds().toString();
};

VectorLine.prototype.asSVG = function() {
    var svg = VectorLine.uber.asSVG.call(this, 'line');
    svg.attributes.x1 = this.origin.x;
    svg.attributes.y1 = this.origin.y;
    svg.attributes.x2 = this.destination.x;
    svg.attributes.y2 = this.destination.y;
    return svg;
};

VectorLine.prototype.drawOn = function (aCanvasMorph) {
    var context,
        origin = this.origin.subtract(aCanvasMorph.position()),
        destination = this.destination.subtract(aCanvasMorph.position());

    this.image = newCanvas(aCanvasMorph.extent());

    context = this.image.getContext('2d');

    context.beginPath();

    if (this.borderColor.a > 0) {
        context.lineWidth = this.borderWidth;
        context.strokeStyle = this.borderColor.toRGBstring();
        context.moveTo(origin.x, origin.y);
        context.lineTo(destination.x, destination.y);
        context.stroke();
    }

    aCanvasMorph.redraw = true;
};

// VectorEllipse

VectorEllipse.prototype = new VectorShape();
VectorEllipse.prototype.constructor = VectorEllipse;
VectorEllipse.uber = VectorShape.prototype;

function VectorEllipse (
    borderWidth,
    borderColor,
    fillColor,
    origin,
    destination)
{
    VectorEllipse.uber.init.call(this, borderWidth, borderColor, fillColor);
    this.init(origin, destination);
}

VectorEllipse.prototype.init = function (origin, destination) {
    this.origin = origin;
    this.destination = destination;
};

VectorEllipse.fromSVG = function (svg) {
    var attributes = svg.attributes;

    return new VectorEllipse(
        parseInt(attributes['stroke-width']), // borderWidth
        attributes.stroke === 'none' ? null :
            Color.fromString(attributes.stroke), // borderColor
        attributes.fill === 'none' ? null :
            Color.fromString(attributes.fill), // fillColor
        new Point(parseInt(attributes.cx), parseInt(attributes.cy)), // origin
        new Point(
            parseInt(attributes.cx) + parseInt(attributes.rx),
            parseInt(attributes.cy) + parseInt(attributes.ry)) // destination
        );
};

VectorEllipse.prototype.copy = function () {
    var newEllipse = new VectorEllipse(
        this.borderWidth,
        this.borderColor,
        this.fillColor,
        this.origin.copy(),
        this.destination.copy()
    );
    return VectorEllipse.uber.copy.call(this, newEllipse);
};

VectorEllipse.prototype.hRadius = function () {
    return Math.abs(this.destination.x - this.origin.x);
};

VectorEllipse.prototype.vRadius = function () {
    return Math.abs(this.destination.y - this.origin.y);
};

VectorEllipse.prototype.toString = function () {
    return VectorEllipse.uber.toString.call(this) +
        ' center: ' + this.origin.toString() +
        ' radii: ' + this.hRadius().toString() + ',' +
        this.vRadius().toString();
};

VectorEllipse.prototype.bounds = function () {
    var hRadius = this.hRadius(),
        vRadius = this.vRadius();

    return new Rectangle(
        this.origin.x - hRadius - (this.borderWidth / 2),
        this.origin.y - vRadius - (this.borderWidth / 2),
        this.origin.x + hRadius + (this.borderWidth / 2),
        this.origin.y + vRadius + (this.borderWidth / 2)
    );
};

VectorEllipse.prototype.containsPoint = function (aPoint) {
    return (
        Math.pow(aPoint.x - this.origin.x, 2) /
            Math.pow(this.hRadius() + this.borderWidth / 2, 2)
                +
        Math.pow(aPoint.y - this.origin.y, 2) /
            Math.pow(this.vRadius() + this.borderWidth / 2, 2)
    ) < 1;
};

VectorEllipse.prototype.asSVG = function () {
    var svg = VectorEllipse.uber.asSVG.call(this, 'ellipse');
    svg.attributes.cx = this.origin.x;
    svg.attributes.cy = this.origin.y;
    svg.attributes.rx = this.hRadius();
    svg.attributes.ry = this.vRadius();
    return svg;
};

VectorEllipse.prototype.drawOn = function (aCanvasMorph) {
    var context,
        canvasPosition = aCanvasMorph.position();

    this.image = newCanvas(aCanvasMorph.extent());
    context = this.image.getContext('2d');
    context.beginPath();
    context.ellipse(
        this.origin.x - canvasPosition.x,
        this.origin.y - canvasPosition.y,
        this.hRadius(),
        this.vRadius(),
        0,
        0,
        2 * Math.PI,
        true);

    if (this.fillColor && this.fillColor.a > 0) {
        context.fillStyle = this.fillColor.toRGBstring();
        context.fill();
    }

    if (this.borderColor.a > 0) {
        context.lineWidth = this.borderWidth;
        context.strokeStyle = this.borderColor.toRGBstring();
        context.stroke();
    }

    aCanvasMorph.redraw = true;
};


// VectorPolygon

VectorPolygon.prototype = new VectorShape();
VectorPolygon.prototype.constructor = VectorPolygon;
VectorPolygon.uber = VectorShape.prototype;

function VectorPolygon (
    borderWidth,
    borderColor,
    fillColor,
    points,
    isClosed,
    isFreeHand
) {
    VectorPolygon.uber.init.call(this, borderWidth, borderColor, fillColor);
    this.init(points, isClosed, isFreeHand);
}

VectorPolygon.prototype.init = function (points, isClosed, isFreeHand) {
    this.points = points || [ ];
    this.isClosed = isClosed;
    this.isFreeHand = isFreeHand;
    this.isPolygon = true;
};

VectorPolygon.fromSVG = function (svg) {
    var attributes = svg.attributes,
        points = attributes.d.slice(1).split(/L */).map(
            function (pointString) {
                var pointArray = pointString.split(' ');
                return new Point(
                    parseInt(pointArray[0]),
                    parseInt(pointArray[1]));
            }
        );

    return new VectorPolygon(
        parseInt(attributes['stroke-width']), // borderWidth
        attributes.stroke === 'none' ? null :
            Color.fromString(attributes.stroke), // borderColor
        attributes.fill === 'none' ? null :
            Color.fromString(attributes.fill), // fillColor
        points, // points
        points[0].eq(points[points.length - 1]), // isClosed
        false // isFreeHand, does only matter when drawing it
    );
};

VectorPolygon.prototype.copy = function () {
    var newPolygon = new VectorPolygon(
        this.borderWidth,
        this.borderColor,
        this.fillColor,
        this.points.map(function (point) { return point.copy(); }),
        this.isClosed,
        this.isFreeHand
    );
    return VectorPolygon.uber.copy.call(this, newPolygon);
};

VectorPolygon.prototype.toString = function () {
    return VectorPolygon.uber.toString.call(this) + this.points;
};

VectorPolygon.prototype.bounds = function () {
    var left = this.points[0].x,
        top = this.points[0].y,
        right = this.points[this.points.length - 1].x,
        bottom = this.points[this.points.length - 1].y;

    this.points.forEach(function (point) {
        left = Math.min(left, point.x);
        top = Math.min(top, point.y);
        right = Math.max(right, point.x);
        bottom = Math.max(bottom, point.y);
    });

    return new Rectangle(
        left - (this.borderWidth / 2),
        top - (this.borderWidth / 2),
        right + (this.borderWidth / 2),
        bottom + (this.borderWidth / 2)
    );
};

VectorPolygon.prototype.containsPoint = function (aPoint) {
    var myself = this,
        pointCount = this.points.length,
        inside = false,
        i, j;

    for (i = 1; i < pointCount; i += 1) {
        if (pointIsBetween(this.points[i - 1], this.points[i])) {
            return true;
        }
    }

    if (this.isClosed) {
        for (i = 0, j = pointCount - 1; i < pointCount; i += 1) {
            if (
                (this.points[i].y > aPoint.y) !==
                    (this.points[j].y > aPoint.y) &&
                aPoint.x <
                    (this.points[j].x - this.points[i].x) *
                        (aPoint.y - this.points[i].y) /
                    (this.points[j].y - this.points[i].y) + this.points[i].x
            ) {
                inside = !inside;
            }
            j = i;
        }
        return inside;
    }

    function pointIsBetween (a, b) {
        return Math.abs(a.distanceTo(b) -
            (aPoint.distanceTo(a) + aPoint.distanceTo(b))) <=
                Math.sqrt(myself.borderWidth / 2) / 2;
    }

    return false;
};

VectorPolygon.prototype.update = function (newPoint, constrain) {
    if (this.isFreeHand || this.points.length === 1) {
        this.points.push(newPoint);
    } else if (!this.isFreeHand) {
        if (constrain) {
            // we reuse origin to store the previous point and perform the
            // constraint calculations as if we were drawing a single line
            this.origin = this.points[this.points.length - 2];
            newPoint = VectorLine.prototype.constraintPoint.call(
                this,
                newPoint
            );
        }
        this.points[this.points.length - 1] = newPoint;
    }
};

VectorPolygon.prototype.setColor = function (color, isSecondary) {
    VectorPolygon.uber.setColor.call(
        this,
        color,
        !this.isClosed || isSecondary
    );
};

VectorPolygon.prototype.moveBy = function (delta) {
    this.points.forEach(function (eachPoint) {
        eachPoint.x += delta.x;
        eachPoint.y += delta.y;
    });
};

VectorPolygon.prototype.resizeBy = function (delta, origin) {
    this.points = this.points.map(function (point) {
        return point.subtract(origin).multiplyBy(delta).add(origin);
    });
};

VectorPolygon.prototype.close = function () {
    if (this.isClosed) {
        this.points.push(this.points[0].copy());
    }
};

VectorPolygon.prototype.asSVG = function () {
    var svg = VectorPolygon.uber.asSVG.call(this, 'path');

    svg.attributes['stroke-linejoin'] = 'round';
    svg.attributes['stroke-linecap'] = 'round';

    // M stands for MoveTo and defines the starting point
    svg.attributes.d = 'M' + this.points[0].x + ' ' + this.points[0].y;

    // L stands for LineTo and defines the rest of the points
    this.points.slice(1).forEach(function (point) {
        svg.attributes.d += ' L ' + point.x + ' ' + point.y;
    });

    return svg;
};

VectorPolygon.prototype.drawOn = function (aCanvasMorph) {
    var context,
        points =
            this.points.map(
                function (eachPoint) {
                    return eachPoint.subtract(aCanvasMorph.position());
                }
            );

    this.image = newCanvas(aCanvasMorph.extent());
    context = this.image.getContext('2d');

    context.lineCap = 'round';
    context.lineJoin = 'round';

    context.beginPath();
    context.moveTo(points[0].x, points[0].y);

    points.slice(1).forEach(function (point) {
        context.lineTo(point.x, point.y);
    });

    if (this.fillColor && this.fillColor.a > 0) {
        context.fillStyle = this.fillColor.toRGBstring();
        context.fill();
    }

    if (this.borderColor.a > 0) {
        context.lineWidth = this.borderWidth;
        context.strokeStyle = this.borderColor.toRGBstring();
        context.stroke();
    } else if (this.points.length === 2) {
        // This is a polygon in construction, we should at least draw
        // a thin line between its first two points
        context.lineWidth = 1;
        context.strokeStyle = this.fillColor.toRGBstring();
        context.stroke();
    }

    aCanvasMorph.redraw = true;
};


// VectorSelection

VectorSelection.prototype = new VectorRectangle();
VectorSelection.prototype.constructor = VectorSelection;
VectorSelection.uber = VectorRectangle.prototype;

function VectorSelection (origin, destination) {
    VectorRectangle.uber.init.call(
        this,
        1, // borderWidth
        new Color(0, 0, 0, 255), // borderColor
        null // fillColor
    );
    this.init(origin, destination);
}

VectorSelection.prototype.init = function (origin, destination) {
    VectorSelection.uber.init.call(this, origin, destination);
    this.isSelection = true;
    this.threshold = 5;
};

VectorSelection.prototype.corners = function () {
    var bounds = this.bounds();
    return [
        bounds.topLeft(),
        bounds.topRight(),
        bounds.bottomLeft(),
        bounds.bottomRight()
    ];
};

VectorSelection.prototype.cornerAt = function (aPoint) {
    var threshold = this.threshold;

    return this.corners().find(function(corner) {
        return aPoint.distanceTo(corner) <= threshold;
    });
};

VectorSelection.prototype.cornerOppositeTo = function (aPoint) {
    return this.corners().reduce(function(a, b) {
        return (aPoint.distanceTo(a) > aPoint.distanceTo(b)) ? a : b;
    });
};

VectorSelection.prototype.drawOn = function (aCanvasMorph) {
    var context,
        bounds = this.bounds(),
        canvasPosition = aCanvasMorph.position(),
        origin = bounds.origin.subtract(canvasPosition),
        circleRadius = this.threshold;

    this.image = newCanvas(aCanvasMorph.extent());

    context = this.image.getContext('2d');

    context.rect(origin.x, origin.y, this.width(), this.height());
    context.setLineDash([5]);
    context.stroke();

    context.setLineDash([]);

    function drawCircle (x, y) {
        context.beginPath();
        context.arc(
            x - canvasPosition.x,
            y - canvasPosition.y,
            circleRadius,
            0,
            2 * Math.PI
        );
        context.stroke();
    }

    drawCircle(bounds.left(), bounds.top());
    drawCircle(bounds.left(), bounds.bottom());
    drawCircle(bounds.right(), bounds.top());
    drawCircle(bounds.right(), bounds.bottom());

    aCanvasMorph.redraw = true;
};

// Crosshair
// For convenience, we'll inherit from VectorShape

Crosshair.prototype = VectorShape;
Crosshair.prototype.constructor = Crosshair;
Crosshair.uber = VectorShape.prototype;

function Crosshair (center, paper) {
    this.init(center, paper);
}

Crosshair.prototype.init = function (center, paper) {
    this.center = center;
    this.paper = paper;
    this.image = newCanvas();
    this.isCrosshair = true;
};

Crosshair.prototype.update = function (newPosition) {
    this.center = newPosition.subtract(this.paper.position());
};

Crosshair.prototype.moveBy = function (delta) {
    this.center = this.center.add(delta);
};

Crosshair.prototype.drawOn = function (aCanvasMorph) {
    this.image = newCanvas(aCanvasMorph.extent());
    aCanvasMorph.rotationCenter = this.center.copy();
    aCanvasMorph.drawcrosshair(this.image.getContext('2d'));
    aCanvasMorph.redraw = true;
};

/////////// VectorPaintEditorMorph //////////////////////////

VectorPaintEditorMorph.prototype = new PaintEditorMorph();
VectorPaintEditorMorph.prototype.constructor = VectorPaintEditorMorph;
VectorPaintEditorMorph.uber = PaintEditorMorph.prototype;

function VectorPaintEditorMorph() {
    this.init();
}

VectorPaintEditorMorph.prototype.init = function () {
    // additional properties:
    this.paper = null; // paint canvas
    this.shapes = [];
    this.selection = []; // currently selected objects
    this.selecting = false;
    this.originalSelection = null; // see VectorPaintEditorMorph >> dragSelection
    this.moving = false;
    this.resizing = false;
    this.lastDragPosition = null;
    this.history = []; // shapes history, for undo purposes
    this.clipboard = []; // copied objects ready to be pasted
    this.currentShape = null; // object being currently edited

    VectorPaintEditorMorph.uber.init.call(this);

    this.labelString = 'Vector Paint Editor';
    this.createLabel();
    this.fixLayout();
};

VectorPaintEditorMorph.prototype.buildEdits = function () {
    var myself = this;

    this.edits.add(
        this.pushButton(
            'undo',
            function () {
                myself.undo();
            }
        )
    );

    this.edits.add(
        this.pushButton(
            'clear',
            function () {
                myself.paper.clearCanvas();
            }
        )
    );

    this.edits.add(
        this.pushButton(
            'Bitmap',
            function () {
                if (myself.shapes.length > 0) {
                    myself.ide.confirm(
                        'This will convert your vector objects into\n' +
                        'bitmaps, and you will not be able to convert\n' +
                        'them back into vector drawings.\n' +
                        'Are you sure you want to continue?',
                        'Convert to bitmap?',
                        function () {
                            myself.convertToBitmap();
                        },
                        nop
                    );
                } else {
                    myself.convertToBitmap();
                }
            }
        )
    );

    this.edits.fixLayout();
};

VectorPaintEditorMorph.prototype.convertToBitmap = function () {
    var canvas = newCanvas(StageMorph.prototype.dimensions);

    this.object = new Costume();

    this.shapes.forEach(function(each) {
        canvas.getContext('2d').drawImage(each.image, 0, 0);
    });

    this.object.rotationCenter = this.paper.rotationCenter.copy();
    this.object.contents = canvas;
    this.object.edit(
        this.world(),
        this.ide,
        false,
        this.oncancel
    );

    this.destroy();
};

VectorPaintEditorMorph.prototype.buildScaleBox = function () {
    var myself = this;
    ['Top', 'Bottom', 'Up', 'Down'].forEach(function (label) {
        myself.scaleBox.add(
            myself.pushButton(
                label,
                function () {
                    myself.changeSelectionLayer(label.toLowerCase());
                }
            )
        );
    });

    this.scaleBox.fixLayout();
};

VectorPaintEditorMorph.prototype.openIn = function (
    world,
    oldim,
    oldrc,
    callback,
    anIDE,
    shapes
) {
    var myself = this,
        isEmpty = isNil(shapes) || shapes.length === 0;

    VectorPaintEditorMorph.uber.openIn.call(this, world, null, oldrc, callback);
    this.ide = anIDE;
    this.paper.drawNew();
    this.paper.changed();

    // make sure shapes are initialized and can be rendered
    shapes.forEach(function (shape) {
        shape.drawOn(myself.paper);
    });
    // copy the shapes for editing and re-render the copies
    this.shapes = shapes.map(function (eachShape) {
        return eachShape.copy();
    });
    this.shapes.forEach(function (shape) {
        shape.drawOn(myself.paper);
    });
    // init the rotation center, if any
    if (oldrc && !isEmpty) {
        this.paper.automaticCrosshairs = false;
        this.paper.rotationCenter = this.getBounds(this.shapes).origin.subtract(
            this.paper.bounds.origin
        ).add(oldrc);
    } else {
        this.paper.automaticCrosshairs = true;
    }

    this.updateHistory();

    this.processKeyUp = function () {
        this.shift = false;
        this.ctrl = false;
        this.propertiesControls.constrain.refresh();
    };

    this.processKeyDown = function (event) {
        var myself = this,
            pos;

        this.shift = event.shiftKey;
        this.ctrl = event.ctrlKey;

        switch (this.world().currentKey) {
            /* Del and backspace keys */
            case 46:
            case 8:
                this.sortSelection();
                this.selection.slice().reverse().forEach(function (shape) {
                    myself.shapes.splice(myself.shapes.indexOf(shape), 1);
                });
                this.clearSelection();
                this.updateHistory();
            break;
            /* Enter key */
            case 13:
                if (this.currentShape && this.currentShape.isPolygon) {
                    this.currentShape.close();
                    this.currentShape.drawOn(this.paper);
                    this.shapes.push(this.currentShape);
                    this.currentShape = null;
                    this.updateHistory();
                }
            break;
            /* Page Up key */
            case 33:
                this.changeSelectionLayer('up');
            break;
            /* Page Down key */
            case 34:
                this.changeSelectionLayer('down');
            break;
            /* End key */
            case 35:
                this.changeSelectionLayer('bottom');
            break;

            /* Home key */
            case 36:
                this.changeSelectionLayer('top');
            break;
            case 90:
            /* Ctrl + Z */
                if (this.ctrl) {
                    this.undo();
                }
            break;
            case 67:
            /* Ctrl + C */
                if (this.ctrl && this.selection.length) {
                    this.clipboard =
                        this.selection.map(function (each) {
                            return each.copy();
                        }
                    );
                }
            break;
            case 86:
            /* Ctrl + V */
                pos = this.world().hand.position();
                if (this.ctrl && this.paper.bounds.containsPoint(pos)) {
                    this.paper.pasteAt(pos);
                    this.updateHistory();
                }
            break;
            case 65:
            /* Ctrl + A */
                if (this.ctrl) {
                    this.paper.currentTool = 'selection';
                    this.paper.toolChanged('selection');
                    this.refreshToolButtons();
                    this.paper.selectShapes(this.shapes);
                }
            break;
            case 27:
            /* Escape key */
                this.clearSelection();
            break;
            case 37:
            /* Left arrow */
                this.moveSelectionBy(new Point(-1, 0));
                this.updateHistory();
            break;
            case 38:
            /* Up arrow	*/
                this.moveSelectionBy(new Point(0, -1));
                this.updateHistory();
            break;
            case 39:
            /* Right arrow */
                this.moveSelectionBy(new Point(1, 0));
                this.updateHistory();
            break;
            case 40:
            /* Down arrow */
                this.moveSelectionBy(new Point(0, 1));
                this.updateHistory();
            break;
            default:
                nop();
        }
        this.propertiesControls.constrain.refresh();
        this.drawNew();
    };
};

VectorPaintEditorMorph.prototype.buildContents = function() {
    var myself = this;

    VectorPaintEditorMorph.uber.buildContents.call(this);

    this.paper.destroy();
    this.paper = new VectorPaintCanvasMorph(myself.shift);
    this.paper.setExtent(StageMorph.prototype.dimensions);
    this.body.add(this.paper);

    this.refreshToolButtons();
    this.fixLayout();
    this.drawNew();
};

VectorPaintEditorMorph.prototype.buildToolbox = function () {
    var tools = {
            brush:
                'Paintbrush tool\n(free draw)',
            rectangle:
                'Rectangle\n(shift: square)',
            ellipse:
                'Ellipse\n(shift: circle)',
            selection:
                'Selection tool',
            crosshairs:
                'Set the rotation center',
            line:
                'Line tool\n(shift: constrain to 45º)',
            closedBrush:
                'Closed brush\n(free draw)',
            polygon:
                'Polygon',
            paintbucket:
                'Paint a shape\n(shift: edge color)',
            pipette:
                'Pipette tool\n(pick a color from anywhere\nshift: fill color)'
        },
        myself = this,
        left = this.toolbox.left(),
        top = this.toolbox.top(),
        padding = 2,
        inset = 5,
        x = 0,
        y = 0;

    Object.keys(tools).forEach(function (toolName) {
        var button = myself.toolButton(toolName, tools[toolName]);
        button.setPosition(new Point(
            left + x,
            top + y
        ));
        x += button.width() + padding;
        if (toolName === 'crosshairs') { /* this tool marks the newline */
            x = 0;
            y += button.height() + padding;
            myself.paper.drawcrosshair();
        }
        myself.toolbox[toolName] = button;
        myself.toolbox.add(button);
    });

    this.toolbox.bounds = this.toolbox.fullBounds().expandBy(inset * 2);
    this.toolbox.drawNew();
};

// TODO :'(
VectorPaintEditorMorph.prototype.populatePropertiesMenu = function () {
    var c = this.controls,
        myself = this,
        pc = this.propertiesControls,
        alpen = new AlignmentMorph("row", this.padding),
        alignColor = new AlignmentMorph("row", this.padding),
        alignNames = new AlignmentMorph("row", this.padding);

    pc.primaryColorViewer = new Morph();
    pc.primaryColorViewer.setExtent(new Point(85, 15)); // 40 = height primary & brush size
    pc.primaryColorViewer.color = new Color(0, 0, 0);
    pc.secondaryColorViewer = new Morph();
    pc.secondaryColorViewer.setExtent(new Point(85, 15)); // 20 = height secondaryColor box
    pc.secondaryColorViewer.color = new Color(0, 0, 0);

    pc.colorpicker = new PaintColorPickerMorph(
        new Point(180, 100),
        function (color, isSecondary) {
            myself.selectColor(color, !isSecondary);
        }
    );

    // allow right-click on the color picker to select the fill color
    pc.colorpicker.mouseDownRight = function (pos) {
        if ((pos.subtract(this.position()).x > this.width() * 2 / 3) &&
                (pos.subtract(this.position()).y > this.height() - 10)) {
            this.action("transparent", true);
        } else {
            this.action(this.getPixelColor(pos), true);
        }
    };

    pc.colorpicker.action(new Color(0, 0, 0)); // secondary color
    pc.colorpicker.action('transparent', true);

    pc.penSizeSlider = new SliderMorph(0, 20, 5, 5);
    pc.penSizeSlider.orientation = "horizontal";
    pc.penSizeSlider.setHeight(15);
    pc.penSizeSlider.setWidth(150);
    pc.penSizeSlider.action = function (num) {
        if (pc.penSizeField) {
            pc.penSizeField.setContents(num);
        }
        myself.paper.settings.lineWidth = num;
        myself.selection.forEach(function (shape) {
            shape.setBorderWidth(num);
            shape.drawOn(myself.paper);
            myself.paper.updateSelection();
        });
        myself.updateHistory();
    };
    pc.penSizeField = new InputFieldMorph("3", true, null, false);
    pc.penSizeField.contents().minWidth = 20;
    pc.penSizeField.setWidth(25);
    pc.penSizeField.accept = function (num) {
        var val = parseFloat(pc.penSizeField.getValue());
        pc.penSizeSlider.value = val;
        pc.penSizeSlider.drawNew();
        pc.penSizeSlider.updateValue();
        this.setContents(val);
        myself.paper.settings.lineWidth = val;
        this.world().keyboardReceiver = myself;
        //pc.colorpicker.action(myself.paper.settings.primaryColor);
        myself.selection.forEach(function (shape) {
            shape.setBorderWidth(num);
            shape.drawOn(myself.paper);
            myself.paper.updateSelection();
        });
        myself.updateHistory();
    };
    alpen.add(pc.penSizeSlider);
    alpen.add(pc.penSizeField);
    alpen.color = myself.color;
    alpen.fixLayout();
    pc.penSizeField.drawNew();

    pc.constrain = new ToggleMorph(
            "checkbox",
            this,
            function () { myself.shift = !myself.shift; },
            "Constrain proportions of shapes?\n(you can also hold shift)",
            function () { return myself.shift; }
            );

    alignColor.add(pc.secondaryColorViewer);
    alignColor.add(pc.primaryColorViewer);
    alignColor.fixLayout();

    alignNames.add(new TextMorph(localize('Edge color\n(left click)'),
				 null, null, null, null,
				 'center', 85));
    alignNames.add(new TextMorph(localize('Fill color\n(right click)'),
				 null, null, null, null,
				 'center', 85));
    alignNames.fixLayout();
    c.add(pc.colorpicker);
	c.add(alignNames);
    c.add(alignColor);
    c.add(new TextMorph(localize('Brush size')));
    c.add(alpen);
    c.add(pc.constrain);
};

VectorPaintEditorMorph.prototype.selectColor = function (color, secondary) {
    var myself = this,
        isSecondary = this.paper.isShiftPressed() ? false : secondary,
        propertyName = (isSecondary ? 'secondary' : 'primary') + 'Color',
        ni = newCanvas(
            this.propertiesControls[propertyName + 'Viewer'].extent()
        ),
        ctx = ni.getContext('2d'),
        i, j;

    this.paper.settings[(propertyName)] = color;

    if (this.selection.length) {
        this.selection.forEach(function (shape) {
            shape.setColor(color, isSecondary);
            shape.drawOn(myself.paper);
        });
        this.updateHistory();
    }

    if (color === 'transparent') {
        for (i = 0; i < 180; i += 5) {
            for (j = 0; j < 15; j += 5) {
                ctx.fillStyle =
                    ((j + i) / 5) % 2 === 0 ?
                        'rgba(0, 0, 0, 0.2)'
                            :'rgba(0, 0, 0, 0.5)';
                ctx.fillRect(i, j, 5, 5);
            }
        }
    } else {
        ctx.fillStyle = color.toString();
        ctx.fillRect(0, 0, 180, 15);
    }

    //Brush size
    ctx.strokeStyle = 'black';
    ctx.lineWidth = Math.min(this.paper.settings.lineWidth, 20);
    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.moveTo(20, 30);
    ctx.lineTo(160, 30);
    ctx.stroke();
    this.propertiesControls[propertyName + 'Viewer'].image = ni;
    this.propertiesControls[propertyName + 'Viewer'].changed();
};

VectorPaintEditorMorph.prototype.changeSelectionLayer = function (destination) {
    // I move the selected shapes across the z axis
    var myself = this;

    this.sortSelection();

    switch (destination) {
        case 'top':
            this.selection.forEach(function (shape) {
                myself.shapes.splice(myself.shapes.indexOf(shape), 1);
                myself.shapes.push(shape);
            });
        break;
        case 'bottom':
            this.selection.slice().reverse().forEach(function (shape) {
                myself.shapes.splice(myself.shapes.indexOf(shape), 1);
                myself.shapes.splice(0, 0, shape);
            });
        break;
        case 'up':
            this.selection.forEach(function (shape) {
                var index = myself.shapes.indexOf(shape);
                myself.shapes.splice(index, 1);
                myself.shapes.splice(index + myself.selection.length, 0, shape);
            });
        break;
        case 'down':
            if (this.shapes[0] !== this.selection[0]) {
                this.selection.forEach(function (shape) {
                    var index = myself.shapes.indexOf(shape);
                    myself.shapes.splice(index, 1);
                    myself.shapes.splice(index - 1, 0, shape);
                });
            }
        break;
    }

    this.updateHistory();
    this.paper.redraw = true;
};

VectorPaintEditorMorph.prototype.dragSelection = function (pos) {
    var origin,
        ratio,
        delta;

    if (this.lastDragPosition) {
        if (this.moving) {
            delta = pos.subtract(this.lastDragPosition);
            this.moveSelectionBy(delta);
        } else if (this.resizing) {
            if (this.shift) {
                // constrain delta if shift is pressed
                origin = this.originalSelection.origin;
                ratio = Math.max(
                    (pos.x - origin.x) /
                        (this.originalSelection.destination.x - origin.x),
                    (pos.y - origin.y) /
                        (this.originalSelection.destination.y - origin.y)
                );
                pos = this.originalSelection.destination.subtract(
                    origin
                ).multiplyBy(ratio).add(origin);
            }
            // this.currentShape holds the selection shape
            delta = (pos.subtract(this.currentShape.origin)).divideBy(
                this.lastDragPosition.subtract(this.currentShape.origin));
            this.resizeSelectionBy(delta);
        }
    } else if (this.resizing) {
        // we save the selection as it was before we started resizing so that
        // we can use it to constrain its proportions later
        this.originalSelection = this.currentShape.copy();
    }

    this.lastDragPosition = pos;
};

VectorPaintEditorMorph.prototype.moveSelectionBy = function (delta) {
    var paper = this.paper;

    this.selection.forEach(function (shape) {
        shape.moveBy(delta);
        shape.drawOn(paper);
    });

    if (this.currentShape && this.currentShape.isSelection) {
        this.currentShape.moveBy(delta);
        this.currentShape.drawOn(paper);
    }
};

VectorPaintEditorMorph.prototype.resizeSelectionBy = function (delta) {
    var paper = this.paper,
        selectionShape;

    if (this.currentShape && this.currentShape.isSelection) {
        selectionShape = this.currentShape;

        this.selection.forEach(function (shape) {
            shape.resizeBy(delta, selectionShape.origin);
            shape.drawOn(paper);
        });

        selectionShape.resizeBy(delta, selectionShape.origin);
        selectionShape.drawOn(paper);
    }
};

VectorPaintEditorMorph.prototype.sortSelection = function () {
    var myself = this;
    this.selection.sort(function (a, b) {
        return myself.shapes.indexOf(a) > myself.shapes.indexOf(b);
    });
};

VectorPaintEditorMorph.prototype.clearSelection = function () {
    this.currentShape = null;
    this.selection = [];
    this.paper.redraw = true;
};

VectorPaintEditorMorph.prototype.getSVG = function () {
    var svg = new XML_Element('svg'),
        bounds = this.getBounds(this.shapes);

    svg.attributes.xmlns = 'http://www.w3.org/2000/svg';
    svg.attributes.snap = 'http://snap.berkeley.edu/run';
    svg.attributes.version = '1.1';
    svg.attributes.preserveAspectRatio = 'none meet';
    svg.attributes.viewBox =
        bounds.left() + ' ' + bounds.top() + ' ' +
        (bounds.right() - bounds.left()) + ' ' +
        (bounds.bottom() - bounds.top());
    svg.attributes.width = (bounds.right() - bounds.left());
    svg.attributes.height = (bounds.bottom() - bounds.top());

    svg.children = this.shapes.map(function (shape) { return shape.asSVG(); });

    return window.btoa(svg);
};

VectorPaintEditorMorph.prototype.getBounds = function (shapeCollection) {
    var shapeBounds = shapeCollection.map(function(each) {
        return each.bounds();
    });

    if (shapeBounds.length === 0) {return null; }

    return shapeBounds.reduce(
        function(previous, current) {
            return new Rectangle(
                Math.min(previous.left(), current.left()),
                Math.min(current.top(), previous.top()),
                Math.max(previous.right(), current.right()),
                Math.max(previous.bottom(), current.bottom())
            );
        }
    );
};

VectorPaintEditorMorph.prototype.silentMoveBy = function (delta) {
    VectorPaintEditorMorph.uber.silentMoveBy.call(this, delta);
    if (this.currentShape) {
        this.currentShape.moveBy(delta);
    }
    this.shapes.forEach(function (shape) {
        shape.moveBy(delta);
    });
};

VectorPaintEditorMorph.prototype.ok = function () {
    var myself = this,
        img = new Image(),
        shapeOrigin,
        originDelta;

    if (this.shapes.length === 0) {
        this.cancel();
        return;
    }

    shapeOrigin = this.getBounds(this.shapes).origin;
    originDelta = shapeOrigin.subtract(this.paper.bounds.origin);

    this.paper.updateAutomaticCenter();

    img.src = 'data:image/svg+xml;base64,' + this.getSVG().toString();

    img.onload = function() {
        myself.callback(
            img,
            myself.paper.rotationCenter.subtract(originDelta),
            myself.shapes
        );
    };

    this.destroy();
};

// Undo support

VectorPaintEditorMorph.prototype.updateHistory = function () {
    this.history.push(this.shapes.map(function (shape) {
        return shape.copy();
    }));
};

VectorPaintEditorMorph.prototype.undo = function () {
    var paper = this.paper,
        oldSum = this.checksum(),
        newSum = oldSum;

	function draw(shape) {
 		shape.drawOn(paper);
 	}

    while (this.shapes.length && oldSum == newSum) {
        this.shapes = this.history.pop() || [];
        this.shapes.forEach(draw);
        newSum = this.checksum();
    }

    this.clearSelection();
};

VectorPaintEditorMorph.prototype.checksum = function () {
    return JSON.stringify(this.shapes).split('').reduce(
            function (previousSum, currentChar) {
                return previousSum + currentChar.charCodeAt(0);
            },
            0);
};

// VectorPaintCanvasMorph //////////////////////////

VectorPaintCanvasMorph.prototype = new PaintCanvasMorph();
VectorPaintCanvasMorph.prototype.constructor = VectorPaintCanvasMorph;
VectorPaintCanvasMorph.uber = PaintCanvasMorph.prototype;

function VectorPaintCanvasMorph (shift) {
    this.init(shift);
}

VectorPaintCanvasMorph.prototype.init = function (shift) {
    VectorPaintCanvasMorph.uber.init.call(this, shift);
    this.pointBuffer = [];
    this.currentTool = 'brush';
    this.settings = {
        primaryColor: new Color(0, 0, 0, 0),
        secondaryColor: new Color(0, 0, 0, 255),
        lineWidth: 3
    };
};

VectorPaintCanvasMorph.prototype.calculateCanvasCenter = function () {
    var canvasBounds = this.bounds;

    // Can't use canvasBounds.center(), it rounds down.
    return new Point(
            (canvasBounds.width()) / 2,
            (canvasBounds.height()) / 2);
};

VectorPaintCanvasMorph.prototype.updateAutomaticCenter = function () {
    var editor = this.parentThatIsA(VectorPaintEditorMorph),
        shapeBounds = editor.getBounds(editor.shapes),
        relativePosition;

    if (this.automaticCrosshairs && shapeBounds) {
        relativePosition = shapeBounds.origin.subtract(this.bounds.origin);
        this.rotationCenter =
            (new Point(
                    (shapeBounds.width()) / 2,
                    (shapeBounds.height()) / 2)).add(relativePosition);
    } else if (this.automaticCrosshairs) {
        this.calculateCanvasCenter();
    }
};

VectorPaintCanvasMorph.prototype.clearCanvas = function () {
    var editor = this.parentThatIsA(VectorPaintEditorMorph);
    editor.updateHistory();
    editor.shapes = [];
    editor.clearSelection();
    this.mask.getContext('2d').clearRect(
        0,
        0,
        this.bounds.width(),
        this.bounds.height()
    );
    this.redraw = true;
};

VectorPaintCanvasMorph.prototype.toolChanged = function (tool) {
    var editor = this.parentThatIsA(VectorPaintEditorMorph);
    VectorPaintCanvasMorph.uber.toolChanged.call(this, tool);

    if (editor.currentShape && editor.currentShape.isPolygon) {
        editor.currentShape.close();
        editor.currentShape.drawOn(this);
        editor.shapes.push(editor.currentShape);
    }

    if (tool === 'crosshairs') {
        editor.clearSelection();
        editor.currentShape = new Crosshair(this.rotationCenter, this);
        editor.currentShape.drawOn(this);
        this.automaticCrosshairs = false;
    } else if (tool === 'pipette' && editor.selection) {
        return;
    } else {
        editor.clearSelection();
        editor.currentShape = null;
    }
};

VectorPaintCanvasMorph.prototype.drawNew = function () {
    var myself = this,
        editor = this.parentThatIsA(VectorPaintEditorMorph),
        canvas = newCanvas(this.extent());

    this.merge(this.background, canvas);
    this.merge(this.paper, canvas);

    editor.shapes.forEach(function(each) {
        myself.merge(each.image, canvas);
    });

    if (editor.currentShape) {
        this.merge(editor.currentShape.image, canvas);
    }

    this.image = canvas;
    this.drawFrame();
};

VectorPaintCanvasMorph.prototype.step = function () {
    if (this.redraw) {
        this.drawNew();
        this.changed();
        this.redraw = false;
    }
};

VectorPaintCanvasMorph.prototype.mouseMove = function (pos) {
    var editor = this.parentThatIsA(VectorPaintEditorMorph),
        primaryColor = this.settings.primaryColor,
        secondaryColor = this.settings.secondaryColor,
        borderWidth = this.settings.lineWidth,
        selectionCorner,
        oppositeCorner;

    if (this.currentTool === 'paintbucket') {
        return;

    } else if (editor.currentShape && editor.currentShape.isSelection
            && !editor.selecting) {

        selectionCorner = editor.currentShape.cornerAt(pos);

        if (editor.resizing || editor.moving) {
            editor.dragSelection(pos);
        } else if (selectionCorner) {
            oppositeCorner = editor.currentShape.cornerOppositeTo(
                selectionCorner
            );
            editor.currentShape = new VectorSelection(
                oppositeCorner,
                selectionCorner
            );
            editor.currentShape.drawOn(this);
            editor.resizing = true;
            document.body.style.cursor = 'move';
        } else if (editor.currentShape.containsPoint(pos)) {
            editor.moving = true;
            document.body.style.cursor = 'move';
        }

    } else if (!editor.currentShape || editor.currentShape.isSelection
            && !editor.selecting) {
        this.beginShape(borderWidth, primaryColor, secondaryColor, pos);
        editor.currentShape.drawOn(this);
    } else {
        editor.currentShape.update(pos, editor.shift);
        editor.currentShape.drawOn(this);
    }
};

VectorPaintCanvasMorph.prototype.mouseEnter = function () {
    if (this.currentTool === 'selection') {
        document.body.style.cursor = 'crosshair';
    } else {
        document.body.style.cursor = 'default';
    }
};

VectorPaintCanvasMorph.prototype.mouseLeave = function () {
    document.body.style.cursor = 'default';
};

VectorPaintCanvasMorph.prototype.mouseClickLeft = function (pos) {
    var editor = this.parentThatIsA(VectorPaintEditorMorph),
        shape = editor.currentShape;

    if (shape) {
        if (shape.isPolygon && !shape.isFreeHand) {
            shape.points.push(shape.points[shape.points.length - 1].copy());
        } else if (shape.isPolygon) {
            shape.close();
            shape.drawOn(this);
            editor.shapes.push(shape);
            editor.currentShape = null;
        } else if (shape.isSelection) {
            if (editor.selecting) {
                shape.destination = pos;
                this.selectInside(shape);
                editor.selecting = false;
            } else if (editor.moving || editor.resizing) {
                editor.moving = false;
                editor.resizing = false;
                this.updateSelection();
            } else {
                this.selectAtPoint(pos);
            }
        } else if (shape.isCrosshair) {
            this.rotationCenter = pos.subtract(this.bounds.origin);
        } else {
            shape.update(pos, editor.shift);
            editor.shapes.push(shape);
            editor.currentShape = null;
        }
    } else if (this.currentTool === 'selection') {
        this.selectAtPoint(pos);
    }

    editor.lastDragPosition = null;
    this.mouseEnter();
    editor.updateHistory();
};

VectorPaintCanvasMorph.prototype.mouseDoubleClick = function (pos) {
    var editor = this.parentThatIsA(VectorPaintEditorMorph),
        shape = editor.currentShape;

    if (shape && shape.isPolygon) {
        shape.close(); // if it applies
        shape.drawOn(this);
        editor.shapes.push(shape);
        editor.currentShape = null;
        editor.updateHistory();
    }
};

VectorPaintCanvasMorph.prototype.beginShape = function (
    borderWidth,
    primaryColor,
    secondaryColor,
    pos
) {
    switch (this.currentTool) {
        case 'brush':
            this.beginPolygon( // unclosed, freehanded
                borderWidth,
                secondaryColor,
                null,
                pos,
                false,
                true
            );
            break;
        case 'line':
            this.beginLine(borderWidth, secondaryColor, pos);
            break;
        case 'rectangle':
            this.beginRectangle(borderWidth, secondaryColor, primaryColor, pos);
            break;
        case 'ellipse':
            this.beginEllipse(borderWidth, secondaryColor, primaryColor, pos);
            break;
        case 'polygon':
            this.beginPolygon( // closed, point-based
                borderWidth,
                secondaryColor,
                primaryColor,
                pos,
                true,
                false
            );
            break;
        case 'closedBrush':
            this.beginPolygon( // closed, freehanded
                borderWidth,
                secondaryColor,
                primaryColor,
                pos,
                true,
                true
            );
            break;
        case 'selection':
            this.beginSelection(pos);
            break;
        // pipette is defined in PaintCanvasMorph >> toolButton
    }
};

VectorPaintCanvasMorph.prototype.beginPolygon = function (
    borderWidth,
    borderColor,
    fillColor,
    origin,
    isClosed,
    isFreeHand
) {
    var editor = this.parentThatIsA(VectorPaintEditorMorph);
    editor.currentShape = new VectorPolygon(
        borderWidth,
        borderColor,
        fillColor,
        [origin],
        isClosed,
        isFreeHand
    );
};

VectorPaintCanvasMorph.prototype.beginLine = function (
    borderWidth,
    borderColor,
    origin
) {
    var editor = this.parentThatIsA(VectorPaintEditorMorph);
    editor.currentShape = new VectorLine(
        borderWidth,
        borderColor,
        origin,
        origin
    );
};

VectorPaintCanvasMorph.prototype.beginRectangle = function (
    borderWidth,
    borderColor,
    fillColor,
    origin
) {
    var editor = this.parentThatIsA(VectorPaintEditorMorph);
    editor.currentShape = new VectorRectangle(
        borderWidth,
        borderColor,
        fillColor,
        origin,
        origin
    );
};

VectorPaintCanvasMorph.prototype.beginEllipse = function (
    borderWidth,
    borderColor,
    fillColor,
    origin
) {
    var editor = this.parentThatIsA(VectorPaintEditorMorph);
    editor.currentShape = new VectorEllipse(
        borderWidth,
        borderColor,
        fillColor,
        origin,
        origin
    );
};

VectorPaintCanvasMorph.prototype.beginSelection = function (origin) {
    var editor = this.parentThatIsA(VectorPaintEditorMorph);
    editor.currentShape = new VectorSelection(origin, origin);
    editor.selecting = true;
};

VectorPaintCanvasMorph.prototype.selectInside = function (selectionShape) {
    // I find and select all shapes contained inside
    // the bounds of selectionShape
    var selectionBounds = selectionShape.bounds(),
        editor = this.parentThatIsA(VectorPaintEditorMorph);

    editor.selection = editor.shapes.filter(function (eachShape) {
        return selectionBounds.containsRectangle(eachShape.bounds());
    });

    if (editor.selection.length > 0) {
        selectionBounds = editor.getBounds(editor.selection);
        selectionShape.origin = selectionBounds.topLeft();
        selectionShape.destination = selectionBounds.bottomRight();
        selectionShape.drawOn(this);
    } else {
        editor.currentShape = null;
        this.redraw = true;
    }
};

VectorPaintCanvasMorph.prototype.selectAtPoint = function (position) {
    // I find and select the topmost shape at position
    var editor = this.parentThatIsA(VectorPaintEditorMorph),
        shape = this.shapeAt(position),
        bounds,
        index;

    if (shape) {
        if (editor.shift) {
            index = editor.selection.indexOf(shape);
            if (index > -1) {
                editor.selection.splice(index, 1);
            } else {
                editor.selection.push(shape);
            }
        } else {
            editor.selection = [ shape ];
        }
        bounds = editor.getBounds(editor.selection);
    }

    if (bounds) {
        editor.currentShape = new VectorSelection(
            bounds.topLeft(),
            bounds.bottomRight()
        );
        editor.currentShape.drawOn(this);
    } else {
        editor.clearSelection();
    }
};

VectorPaintCanvasMorph.prototype.selectShapes = function (shapes) {
    var editor = this.parentThatIsA(VectorPaintEditorMorph),
        bounds;

    if (shapes.length > 0) {
        bounds = editor.getBounds(shapes);
        editor.selection = shapes;
        editor.currentShape = new VectorSelection(
            bounds.topLeft(),
            bounds.bottomRight()
        );
        editor.currentShape.drawOn(this);
    }
};

VectorPaintCanvasMorph.prototype.updateSelection = function () {
    var editor = this.parentThatIsA(VectorPaintEditorMorph);
    this.selectShapes(editor.selection);
};

VectorPaintCanvasMorph.prototype.shapeAt = function (position) {
    var editor = this.parentThatIsA(VectorPaintEditorMorph);
    return detect(
        editor.shapes.slice().reverse(),
        function (shape) {
            return shape.containsPoint(position);
        });
};

VectorPaintCanvasMorph.prototype.pasteAt = function (position) {
    var editor = this.parentThatIsA(VectorPaintEditorMorph),
        myself = this,
        clipboard = editor.clipboard,
        delta,
        copies = [];

    if (clipboard.length > 0) {
        // Each shape is positioned according to the difference between
        // the first shape's original position and the paste position
        delta = position.subtract(clipboard[0].bounds().origin);
    }

    clipboard.forEach(function (shape) {
        var copy = shape.copy();
        copy.moveBy(delta);
        editor.selection.push(copy);
        editor.shapes.push(copy);
        copy.drawOn(myself);
        copies.push(copy);
    });

    if (copies.length > 0) {
        this.selectShapes(copies);
        editor.updateHistory();
    }
};

VectorPaintCanvasMorph.prototype.floodfill = function (sourcepoint) {
    var editor = this.parentThatIsA(VectorPaintEditorMorph),
        shape = this.shapeAt(sourcepoint.add(this.position()));

    if (shape) {
        shape.setColor(
            editor.shift ?
                this.settings.secondaryColor
                    : this.settings.primaryColor, editor.shift
        );
        shape.drawOn(this);
    }
};

