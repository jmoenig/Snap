// SVG_Costume /////////////////////////////////////////////////////////////

/*
    I am a costume containing an SVG image.
*/

import Costume from "./Costume";

// SVG_Costume instance creation

export default class SVG_Costume extends Costume {
    constructor(svgImage, name, rotationCenter) {
        this.contents = svgImage;
        this.shrinkToFit(this.maxExtent());
        this.name = name || null;
        this.rotationCenter = rotationCenter || this.center();
        this.version = Date.now(); // for observer optimization
        this.loaded = null; // for de-serialization only
    }

    toString() {
        return `an SVG_Costume(${this.name})`;
    }

    // SVG_Costume duplication

    copy() {
        const img = new Image();
        let cpy;
        img.src = this.contents.src;
        cpy = new SVG_Costume(img, this.name ? copy(this.name) : null);
        cpy.rotationCenter = this.rotationCenter.copy();
        return cpy;
    }

    // SVG_Costume flipping

    /*
        flipping is currently inherited from Costume, which rasterizes it.
        Therefore flipped SVG costumes may appear pixelated until we add
        a method to either truly flip SVGs or change the Sprite's drawNew()
        method to scale the costume before flipping it
    */

    // SVG_Costume thumbnail

    shrinkToFit(extentPoint) {
        // overridden for unrasterized SVGs
        nop(extentPoint);
        return;
    }
}

