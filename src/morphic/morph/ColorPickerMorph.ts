// ColorPickerMorph ///////////////////////////////////////////////////

import Morph from "./Morph";
import Point from "../Point";
import ColorPaletteMorph from "./ColorPaletteMorph";
import GrayPaletteMorph from "./GrayPaletteMorph";

// ColorPickerMorph instance creation:

export default class ColorPickerMorph extends Morph {
    public choice: Color;
    public color = new Color(255, 255, 255);

    constructor(defaultColor = new Color(255, 255, 255)) {
        super();

        this.choice = defaultColor;

        this.silentSetExtent(new Point(80, 80));
        this.drawNew();
    }

    drawNew() {
        super.drawNew.call(this);
        this.buildSubmorphs();
    }

    buildSubmorphs() {
        let cpal;
        let gpal;
        let x;
        let y;

        this.children.forEach(child => {
            child.destroy();
        });
        this.children = [];
        this.feedback = new Morph();
        this.feedback.color = this.choice;
        this.feedback.setExtent(new Point(20, 20));
        cpal = new ColorPaletteMorph(
            this.feedback,
            new Point(this.width(), 50)
        );
        gpal = new GrayPaletteMorph(
            this.feedback,
            new Point(this.width(), 5)
        );
        cpal.setPosition(this.bounds.origin);
        this.add(cpal);
        gpal.setPosition(cpal.bottomLeft());
        this.add(gpal);
        x = (gpal.left() +
            Math.floor((gpal.width() - this.feedback.width()) / 2));
        y = gpal.bottom() + Math.floor((this.bottom() -
            gpal.bottom() - this.feedback.height()) / 2);
        this.feedback.setPosition(new Point(x, y));
        this.add(this.feedback);
    }

    getChoice() {
        return this.feedback.color;
    }

    rootForGrab() {
        return this;
    }
}

