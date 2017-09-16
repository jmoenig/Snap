// PenMorph ////////////////////////////////////////////////////////////

// I am a simple LOGO-wise turtle.

import Morph from "./Morph";

// PenMorph: referenced constructors

// PenMorph instance creation:

export default class PenMorph extends Morph {
    constructor() {
        this.init();
    }

    init() {
        const size = MorphicPreferences.handleSize * 4;

        // additional properties:
        this.isWarped = false; // internal optimization
        this.heading = 0;
        this.isDown = true;
        this.size = 1;
        this.wantsRedraw = false;
        this.penPoint = 'tip'; // or 'center"
        this.penBounds = null; // rect around the visible arrow shape

        HandleMorph.uber.init.call(this);
        this.setExtent(new Point(size, size));
    }

    // PenMorph updating - optimized for warping, i.e atomic recursion

    changed() {
        if (this.isWarped === false) {
            const w = this.root();
            if (w instanceof WorldMorph) {
                w.broken.push(this.visibleBounds().spread());
            }
            if (this.parent) {
                this.parent.childChanged(this);
            }
        }
    }

    // PenMorph display:

    drawNew(facing) {
        // my orientation can be overridden with the "facing" parameter to
        // implement Scratch-style rotation styles

        let context;

        let start;
        let dest;
        let left;
        let right;
        let len;
        const direction = facing || this.heading;

        if (this.isWarped) {
            this.wantsRedraw = true;
            return;
        }
        this.image = newCanvas(this.extent());
        context = this.image.getContext('2d');
        len = this.width() / 2;
        start = this.center().subtract(this.bounds.origin);

        if (this.penPoint === 'tip') {
            dest = start.distanceAngle(len * 0.75, direction - 180);
            left = start.distanceAngle(len, direction + 195);
            right = start.distanceAngle(len, direction - 195);
        } else { // 'middle'
            dest = start.distanceAngle(len * 0.75, direction);
            left = start.distanceAngle(len * 0.33, direction + 230);
            right = start.distanceAngle(len * 0.33, direction - 230);
        }

        // cache penBounds
        this.penBounds = new Rectangle(
            Math.min(start.x, dest.x, left.x, right.x),
            Math.min(start.y, dest.y, left.y, right.y),
            Math.max(start.x, dest.x, left.x, right.x),
            Math.max(start.y, dest.y, left.y, right.y)
        );

        // draw arrow shape
        context.fillStyle = this.color.toString();
        context.beginPath();

        context.moveTo(start.x, start.y);
        context.lineTo(left.x, left.y);
        context.lineTo(dest.x, dest.y);
        context.lineTo(right.x, right.y);

        context.closePath();
        context.strokeStyle = 'white';
        context.lineWidth = 3;
        context.stroke();
        context.strokeStyle = 'black';
        context.lineWidth = 1;
        context.stroke();
        context.fill();
    }

    // PenMorph access:

    setHeading(degrees) {
        this.heading = ((+degrees % 360) + 360) % 360;
        this.drawNew();
        this.changed();
    }

    // PenMorph drawing:

    drawLine(start, dest) {
        const context = this.parent.penTrails().getContext('2d');
        const from = start.subtract(this.parent.bounds.origin);
        const to = dest.subtract(this.parent.bounds.origin);
        if (this.isDown) {
            context.lineWidth = this.size;
            context.strokeStyle = this.color.toString();
            context.lineCap = 'round';
            context.lineJoin = 'round';
            context.beginPath();
            context.moveTo(from.x, from.y);
            context.lineTo(to.x, to.y);
            context.stroke();
            if (this.isWarped === false) {
                this.world().broken.push(
                    start.rectangle(dest).expandBy(
                        Math.max(this.size / 2, 1)
                    ).intersect(this.parent.visibleBounds()).spread()
                );
            }
        }
    }

    // PenMorph turtle ops:

    turn(degrees) {
        this.setHeading(this.heading + parseFloat(degrees));
    }

    forward(steps) {
        const start = this.center();
        let dest;
        const dist = parseFloat(steps);
        if (dist >= 0) {
            dest = this.position().distanceAngle(dist, this.heading);
        } else {
            dest = this.position().distanceAngle(
                Math.abs(dist),
                (this.heading - 180)
            );
        }
        this.setPosition(dest);
        this.drawLine(start, this.center());
    }

    down() {
        this.isDown = true;
    }

    up() {
        this.isDown = false;
    }

    clear() {
        this.parent.drawNew();
        this.parent.changed();
    }

    // PenMorph optimization for atomic recursion:

    startWarp() {
        this.wantsRedraw = false;
        this.isWarped = true;
    }

    endWarp() {
        this.isWarped = false;
        if (this.wantsRedraw) {
            this.drawNew();
            this.wantsRedraw = false;
        }
        this.parent.changed();
    }

    warp(fun) {
        this.startWarp();
        fun.call(this);
        this.endWarp();
    }

    warpOp(selector, argsArray) {
        this.startWarp();
        this[selector](...argsArray);
        this.endWarp();
    }

    // PenMorph demo ops:
    // try these with WARP eg.: this.warp(function () {tree(12, 120, 20)})

    warpSierpinski(length, min) {
        this.warpOp('sierpinski', [length, min]);
    }

    sierpinski(length, min) {
        let i;
        if (length > min) {
            for (i = 0; i < 3; i += 1) {
                this.sierpinski(length * 0.5, min);
                this.turn(120);
                this.forward(length);
            }
        }
    }

    warpTree(level, length, angle) {
        this.warpOp('tree', [level, length, angle]);
    }

    tree(level, length, angle) {
        if (level > 0) {
            this.size = level;
            this.forward(length);
            this.turn(angle);
            this.tree(level - 1, length * 0.75, angle);
            this.turn(angle * -2);
            this.tree(level - 1, length * 0.75, angle);
            this.turn(angle);
            this.forward(-length);
        }
    }
}