// Points //////////////////////////////////////////////////////////////

import Rectangle from "./Rectangle";
import {degrees, radians} from "./util";

// Point instance creation:

export default class Point {
    constructor(public x = 0, public y = 0) {

    }

    // Point string representation: e.g. '12@68'

    toString() {
        return `${Math.round(this.x)}@${Math.round(this.y)}`;
    }

    // Point copying:

    copy() {
        return new Point(this.x, this.y);
    }

    // Point comparison:

    eq(aPoint: Point) {
        // ==
        return this.x === aPoint.x && this.y === aPoint.y;
    }

    lt(aPoint: Point) {
        // <
        return this.x < aPoint.x && this.y < aPoint.y;
    }

    gt(aPoint: Point) {
        // >
        return this.x > aPoint.x && this.y > aPoint.y;
    }

    ge(aPoint: Point) {
        // >=
        return this.x >= aPoint.x && this.y >= aPoint.y;
    }

    le(aPoint: Point) {
        // <=
        return this.x <= aPoint.x && this.y <= aPoint.y;
    }

    max(aPoint: Point) {
        return new Point(Math.max(this.x, aPoint.x),
            Math.max(this.y, aPoint.y));
    }

    min(aPoint: Point) {
        return new Point(Math.min(this.x, aPoint.x),
            Math.min(this.y, aPoint.y));
    }

    // Point conversion:

    round() {
        return new Point(Math.round(this.x), Math.round(this.y));
    }

    abs() {
        return new Point(Math.abs(this.x), Math.abs(this.y));
    }

    neg() {
        return new Point(-this.x, -this.y);
    }

    mirror() {
        return new Point(this.y, this.x);
    }

    floor() {
        return new Point(
            Math.max(Math.floor(this.x), 0),
            Math.max(Math.floor(this.y), 0)
        );
    }

    ceil() {
        return new Point(Math.ceil(this.x), Math.ceil(this.y));
    }

    // Point arithmetic:

    add(other: Point | number) {
        if (other instanceof Point) {
            return new Point(this.x + other.x, this.y + other.y);
        }
        return new Point(this.x + other, this.y + other);
    }

    subtract(other: Point | number) {
        if (other instanceof Point) {
            return new Point(this.x - other.x, this.y - other.y);
        }
        return new Point(this.x - other, this.y - other);
    }

    multiplyBy(other: Point | number) {
        if (other instanceof Point) {
            return new Point(this.x * other.x, this.y * other.y);
        }
        return new Point(this.x * other, this.y * other);
    }

    divideBy(other: Point | number) {
        if (other instanceof Point) {
            return new Point(this.x / other.x, this.y / other.y);
        }
        return new Point(this.x / other, this.y / other);
    }

    floorDivideBy(other: Point | number) {
        if (other instanceof Point) {
            return new Point(Math.floor(this.x / other.x),
                Math.floor(this.y / other.y));
        }
        return new Point(Math.floor(this.x / other),
            Math.floor(this.y / other));
    }

    // Point polar coordinates:

    r() {
        const t = (this.multiplyBy(this));
        return Math.sqrt(t.x + t.y);
    }

    degrees() {
        /*
            answer the angle I make with origin in degrees.
            Right is 0, down is 90
        */
        let tan;

        let theta;

        if (this.x === 0) {
            if (this.y >= 0) {
                return 90;
            }
            return 270;
        }
        tan = this.y / this.x;
        theta = Math.atan(tan);
        if (this.x >= 0) {
            if (this.y >= 0) {
                return degrees(theta);
            }
            return 360 + (degrees(theta));
        }
        return 180 + degrees(theta);
    }

    theta() {
        /*
            answer the angle I make with origin in radians.
            Right is 0, down is 90
        */
        let tan;

        let theta;

        if (this.x === 0) {
            if (this.y >= 0) {
                return radians(90);
            }
            return radians(270);
        }
        tan = this.y / this.x;
        theta = Math.atan(tan);
        if (this.x >= 0) {
            if (this.y >= 0) {
                return theta;
            }
            return radians(360) + theta;
        }
        return radians(180) + theta;
    }

    // Point functions:

    crossProduct(aPoint: Point) {
        return this.multiplyBy(aPoint.mirror());
    }

    distanceTo(aPoint: Point) {
        return (aPoint.subtract(this)).r();
    }

    rotate(direction: "right" | "left" | "pi", center: Point) {
        // direction must be 'right', 'left' or 'pi'
        const offset = this.subtract(center);
        if (direction === 'right') {
            return new Point(-offset.y, offset.y).add(center);
        }
        if (direction === 'left') {
            return new Point(offset.y, -offset.y).add(center);
        }
        // direction === 'pi'
        return center.subtract(offset);
    }

    flip(direction: "vertical" | "horizontal", center: Point) {
        // direction must be 'vertical' or 'horizontal'
        if (direction === 'vertical') {
            return new Point(this.x, center.y * 2 - this.y);
        }
        // direction === 'horizontal'
        return new Point(center.x * 2 - this.x, this.y);
    }

    distanceAngle(dist: number, angle: number) {
        let deg = angle;
        let x;
        let y;
        if (deg > 270) {
            deg = deg - 360;
        } else if (deg < -270) {
            deg = deg + 360;
        }
        if (-90 <= deg && deg <= 90) {
            x = Math.sin(radians(deg)) * dist;
            y = Math.sqrt((dist * dist) - (x * x));
            return new Point(x + this.x, this.y - y);
        }
        x = Math.sin(radians(180 - deg)) * dist;
        y = Math.sqrt((dist * dist) - (x * x));
        return new Point(x + this.x, this.y + y);
    }

    // Point transforming:

    scaleBy(scalePoint: Point | number) {
        return this.multiplyBy(scalePoint);
    }

    translateBy(deltaPoint: Point | number) {
        return this.add(deltaPoint);
    }

    rotateBy(angle: number, centerPoint: Point = new Point(0, 0)) {
        const center = centerPoint;
        const p = this.subtract(center);
        const r = p.r();
        const theta = angle - p.theta();
        return new Point(
            center.x + (r * Math.cos(theta)),
            center.y - (r * Math.sin(theta))
        );
    }

    // Point conversion:

    asArray() {
        return [this.x, this.y];
    }

    // creating Rectangle instances from Points:
    corner(cornerPoint: Point) {
        // answer a new Rectangle
        return new Rectangle(
            this.x,
            this.y,
            cornerPoint.x,
            cornerPoint.y
        );
    }
    rectangle(aPoint: Point) {
        // answer a new Rectangle
        let org;

        let crn;
        org = this.min(aPoint);
        crn = this.max(aPoint);
        return new Rectangle(org.x, org.y, crn.x, crn.y);
    }
    extent(aPoint: Point) {
        //answer a new Rectangle
        const crn = this.add(aPoint);
        return new Rectangle(this.x, this.y, crn.x, crn.y);
    };
}
