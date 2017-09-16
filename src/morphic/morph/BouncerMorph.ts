// BouncerMorph ////////////////////////////////////////////////////////

// I am a Demo of a stepping custom Morph

import Morph from "./Morph";

// BouncerMorph instance creation:

export default class BouncerMorph extends Morph {
    constructor() {
        this.init();
    }

    // BouncerMorph initialization:

    init(type, speed) {
        super.init.call(this);
        this.fps = 50;

        // additional properties:
        this.isStopped = false;
        this.type = type || 'vertical';
        if (this.type === 'vertical') {
            this.direction = 'down';
        } else {
            this.direction = 'right';
        }
        this.speed = speed || 1;
    }

    // BouncerMorph moving:

    moveUp() {
        this.moveBy(new Point(0, -this.speed));
    }

    moveDown() {
        this.moveBy(new Point(0, this.speed));
    }

    moveRight() {
        this.moveBy(new Point(this.speed, 0));
    }

    moveLeft() {
        this.moveBy(new Point(-this.speed, 0));
    }

    // BouncerMorph stepping:

    step() {
        if (!this.isStopped) {
            if (this.type === 'vertical') {
                if (this.direction === 'down') {
                    this.moveDown();
                } else {
                    this.moveUp();
                }
                if (this.fullBounds().top() < this.parent.top() &&
                        this.direction === 'up') {
                    this.direction = 'down';
                }
                if (this.fullBounds().bottom() > this.parent.bottom() &&
                        this.direction === 'down') {
                    this.direction = 'up';
                }
            } else if (this.type === 'horizontal') {
                if (this.direction === 'right') {
                    this.moveRight();
                } else {
                    this.moveLeft();
                }
                if (this.fullBounds().left() < this.parent.left() &&
                        this.direction === 'left') {
                    this.direction = 'right';
                }
                if (this.fullBounds().right() > this.parent.right() &&
                        this.direction === 'right') {
                    this.direction = 'left';
                }
            }
        }
    }
}