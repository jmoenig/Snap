// Rectangles //////////////////////////////////////////////////////////

import Point from "./Point";

// Rectangle instance creation:

export default class Rectangle {
    public origin: Point;
    public corner: Point;

    constructor(left = 0, top = 0, right = 0, bottom = 0) {
        this.init(new Point(left, top),
                new Point(right, bottom));
    }

    init(originPoint: Point, cornerPoint: Point) {
        this.origin = originPoint;
        this.corner = cornerPoint;
    }

    // Rectangle string representation: e.g. '[0@0 | 160@80]'

    toString() {
        return `[${this.origin.toString()} | ${this.extent().toString()}]`;
    }

    // Rectangle copying:

    copy() {
        return new Rectangle(
            this.left(),
            this.top(),
            this.right(),
            this.bottom()
        );
    }

    // Rectangle accessing - setting:

    setTo(left: number, top: number, right: number, bottom: number) {
        // note: all inputs are optional and can be omitted

        this.origin = new Point(
            left || ((left === 0) ? 0 : this.left()),
            top || ((top === 0) ? 0 : this.top())
        );

        this.corner = new Point(
            right || ((right === 0) ? 0 : this.right()),
            bottom || ((bottom === 0) ? 0 : this.bottom())
        );
    }

    // Rectangle accessing - getting:

    area() {
        //requires width() and height() to be defined
        const w = this.width();
        if (w < 0) {
            return 0;
        }
        return Math.max(w * this.height(), 0);
    }

    bottom() {
        return this.corner.y;
    }

    bottomCenter() {
        return new Point(this.center().x, this.bottom());
    }

    bottomLeft() {
        return new Point(this.origin.x, this.corner.y);
    }

    bottomRight() {
        return this.corner.copy();
    }

    boundingBox() {
        return this;
    }

    center() {
        return this.origin.add(
            this.corner.subtract(this.origin).floorDivideBy(2)
        );
    }

    corners() {
        return [this.origin,
            this.bottomLeft(),
            this.corner,
            this.topRight()];
    }

    extent() {
        return this.corner.subtract(this.origin);
    }

    height() {
        return this.corner.y - this.origin.y;
    }

    left() {
        return this.origin.x;
    }

    leftCenter() {
        return new Point(this.left(), this.center().y);
    }

    right() {
        return this.corner.x;
    }

    rightCenter() {
        return new Point(this.right(), this.center().y);
    }

    top() {
        return this.origin.y;
    }

    topCenter() {
        return new Point(this.center().x, this.top());
    }

    topLeft() {
        return this.origin;
    }

    topRight() {
        return new Point(this.corner.x, this.origin.y);
    }

    width() {
        return this.corner.x - this.origin.x;
    }

    position() {
        return this.origin;
    }

    // Rectangle comparison:

    eq(aRect: Rectangle) {
        return this.origin.eq(aRect.origin) &&
            this.corner.eq(aRect.corner);
    }

    abs() {
        let newOrigin;
        let newCorner;

        newOrigin = this.origin.abs();
        newCorner = this.corner.max(newOrigin);
        return newOrigin.corner(newCorner);
    }

    // Rectangle functions:

    insetBy(delta: Point | number) {
        const result = new Rectangle();
        result.origin = this.origin.add(delta);
        result.corner = this.corner.subtract(delta);
        return result;
    }

    expandBy(delta: Point | number) {
        const result = new Rectangle();
        result.origin = this.origin.subtract(delta);
        result.corner = this.corner.add(delta);
        return result;
    }

    growBy(delta: Point | number) {
        const result = new Rectangle();
        result.origin = this.origin.copy();
        result.corner = this.corner.add(delta);
        return result;
    }

    intersect(aRect: Rectangle) {
        const result = new Rectangle();
        result.origin = this.origin.max(aRect.origin);
        result.corner = this.corner.min(aRect.corner);
        return result;
    }

    merge(aRect: Rectangle) {
        const result = new Rectangle();
        result.origin = this.origin.min(aRect.origin);
        result.corner = this.corner.max(aRect.corner);
        return result;
    }

    mergeWith(aRect: Rectangle) {
        // mutates myself
        this.origin = this.origin.min(aRect.origin);
        this.corner = this.corner.max(aRect.corner);
    }

    round() {
        return this.origin.round().corner(this.corner.round());
    }

    spread() {
        // round me by applying floor() to my origin and ceil() to my corner
        // expand by 1 to be on the safe side, this eliminates rounding
        // artifacts caused by Safari's auto-scaling on retina displays
        return this.origin.floor().corner(this.corner.ceil()).expandBy(1);
    }

    amountToTranslateWithin(aRect: Rectangle) {
        /*
            Answer a Point, delta, such that self + delta is forced within
            aRectangle. when all of me cannot be made to fit, prefer to keep
            my topLeft inside. Taken from Squeak.
        */
        let dx = 0;

        let dy = 0;

        if (this.right() > aRect.right()) {
            dx = aRect.right() - this.right();
        }
        if (this.bottom() > aRect.bottom()) {
            dy = aRect.bottom() - this.bottom();
        }
        if ((this.left() + dx) < aRect.left()) {
            dx = aRect.left() - this.left();
        }
        if ((this.top() + dy) < aRect.top()) {
            dy = aRect.top() - this.top();
        }
        return new Point(dx, dy);
    }

    // Rectangle testing:

    containsPoint(aPoint: Point) {
        return this.origin.le(aPoint) && aPoint.lt(this.corner);
    }

    containsRectangle(aRect: Rectangle) {
        return aRect.origin.gt(this.origin) &&
            aRect.corner.lt(this.corner);
    }

    intersects(aRect: Rectangle) {
        const ro = aRect.origin;
        const rc = aRect.corner;
        return (rc.x >= this.origin.x) &&
            (rc.y >= this.origin.y) &&
            (ro.x <= this.corner.x) &&
            (ro.y <= this.corner.y);
    }

    isNearTo(aRect: Rectangle, threshold = 0) {
        const ro = aRect.origin;
        const rc = aRect.corner;
        const border = threshold;
        return (rc.x + border >= this.origin.x) &&
            (rc.y  + border >= this.origin.y) &&
            (ro.x - border <= this.corner.x) &&
            (ro.y - border <= this.corner.y);
    }

    // Rectangle transforming:

    scaleBy(scale: Point | number) {
        // scale can be either a Point or a scalar
        const o = this.origin.multiplyBy(scale);

        const c = this.corner.multiplyBy(scale);
        return new Rectangle(o.x, o.y, c.x, c.y);
    }

    translateBy(factor: Point | number) {
        // factor can be either a Point or a scalar
        const o = this.origin.add(factor);

        const c = this.corner.add(factor);
        return new Rectangle(o.x, o.y, c.x, c.y);
    }

    // Rectangle converting:

    asArray() {
        return [this.left(), this.top(), this.right(), this.bottom()];
    }

    asArray_xywh() {
        return [this.left(), this.top(), this.width(), this.height()];
    }
}

