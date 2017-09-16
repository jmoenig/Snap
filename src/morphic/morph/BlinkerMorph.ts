// BlinkerMorph ////////////////////////////////////////////////////////

// can be used for text cursors

import Morph from "./Morph";

// BlinkerMorph instance creation:

export default class BlinkerMorph extends Morph {
    constructor(rate = 2) {
        super();

        this.color = new Color(0, 0, 0);
        this.fps = rate || 2;
        this.drawNew();
    }

    // BlinkerMorph stepping:

    step() {
        this.toggleVisibility();
    }
}