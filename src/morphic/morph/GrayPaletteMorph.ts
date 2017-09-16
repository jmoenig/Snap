// GrayPaletteMorph ///////////////////////////////////////////////////

import ColorPaletteMorph from "./ColorPaletteMorph";
import {newCanvas} from "../util";
import Morph from "./Morph";
import Point from "../Point";

// GrayPaletteMorph instance creation:

export default class GrayPaletteMorph extends ColorPaletteMorph {
    constructor(target: Morph = null, sizePoint = new Point(80, 10)) {
        super(target, sizePoint);
    }

    drawNew() {
        let context;
        let ext;
        let gradient;

        ext = this.extent();
        this.image = newCanvas(this.extent());
        context = this.image.getContext('2d');
        this.choice = new Color();
        gradient = context.createLinearGradient(0, 0, ext.x, ext.y);
        gradient.addColorStop(0, 'black');
        gradient.addColorStop(1, 'white');
        context.fillStyle = gradient;
        context.fillRect(0, 0, ext.x, ext.y);
    }
}