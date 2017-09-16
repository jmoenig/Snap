// MouseSensorMorph ////////////////////////////////////////////////////

// for demo and debuggin purposes only, to be removed later

import BoxMorph from "./BoxMorph";

// MouseSensorMorph instance creation:

export default class MouseSensorMorph extends BoxMorph {
    constructor(edge, border, borderColor) {
        this.init(edge, border, borderColor);
    }

    init(edge, border, borderColor) {
        super.init.call(this);
        this.edge = edge || 4;
        this.border = border || 2;
        this.color = new Color(255, 255, 255);
        this.borderColor = borderColor || new Color();
        this.isTouched = false;
        this.upStep = 0.05;
        this.downStep = 0.02;
        this.noticesTransparentClick = false;
        this.drawNew();
    }

    touch() {
        const myself = this;
        if (!this.isTouched) {
            this.isTouched = true;
            this.alpha = 0.6;

            this.step = () => {
                if (myself.isTouched) {
                    if (myself.alpha < 1) {
                        myself.alpha = myself.alpha + myself.upStep;
                    }
                } else if (myself.alpha > (myself.downStep)) {
                    myself.alpha = myself.alpha - myself.downStep;
                } else {
                    myself.alpha = 0;
                    myself.step = null;
                }
                myself.changed();
            };
        }
    }

    unTouch() {
        this.isTouched = false;
    }

    mouseEnter() {
        this.touch();
    }

    mouseLeave() {
        this.unTouch();
    }

    mouseDownLeft() {
        this.touch();
    }

    mouseClickLeft() {
        this.unTouch();
    }
}