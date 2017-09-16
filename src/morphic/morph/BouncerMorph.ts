// BouncerMorph ////////////////////////////////////////////////////////

// I am a Demo of a stepping custom Morph

import Morph from "./Morph";
import Point from "../Point";

// BouncerMorph instance creation:

export default class BouncerMorph extends Morph {
    public fps = 50;

    public isStopped = false;
    public type: "horizontal" | "vertical";
    public direction: "up" | "down" | "left" | "right";
    public speed: number;

    constructor() {
        super();

        const type: null = null; // TODO
        const speed: null = null;

        // additional properties:
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
                if (this.fullBounds().top() < (<Morph> this.parent).top() &&
                        this.direction === 'up') {
                    this.direction = 'down';
                }
                if (this.fullBounds().bottom() > (<Morph> this.parent).bottom() &&
                        this.direction === 'down') {
                    this.direction = 'up';
                }
            } else if (this.type === 'horizontal') {
                if (this.direction === 'right') {
                    this.moveRight();
                } else {
                    this.moveLeft();
                }
                if (this.fullBounds().left() < (<Morph> this.parent).left() &&
                        this.direction === 'left') {
                    this.direction = 'right';
                }
                if (this.fullBounds().right() > (<Morph> this.parent).right() &&
                        this.direction === 'right') {
                    this.direction = 'left';
                }
            }
        }
    }
}