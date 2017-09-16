// TableFrameMorph /////////////////////////////////////////////////////////

// a UI for table morphs, for re-sizing tables and their columns

import Morph from "../morphic/morph/Morph";

// TableFrameMorph instance creation:

export default class TableFrameMorph extends Morph {
    constructor(tableMorph, noResize) {
        this.init(tableMorph, noResize);
    }

    init(tableMorph, noResize) {
        // additional properties:
        this.tableMorph = tableMorph;
        this.handle = null;

        // initialize inherited properties:
        super.init.call(this, true);

        // override inherited properites:
        this.color = 'transparent';
        this.noticesTransparentClick = false;
        this.bounds = this.tableMorph.bounds.copy();
        this.add(this.tableMorph);

        if (!noResize) {
            this.handle = new HandleMorph(
                this, // target
                80, // minX
                25, // minY
                null, // insetX
                null // insetY
            );
        }

        this.drawNew();
    }

    fixLayout() {
        const ext = this.extent();
        if (this.tableMorph.extent().eq(ext)) {return; }
        this.tableMorph.setExtent(this.extent());
        if (this.parent && this.parent.fixLayout) {
            this.parent.fixLayout();
        }
    }

    setExtent(aPoint, silently) {
        super.setExtent.call(this, aPoint, silently);
        this.fixLayout();
    }

    // TableFrameMorph result / speech balloon support:

    expand(maxExtent) {
        let ext = this.tableMorph.globalExtent();
        if (maxExtent) {
            ext = ext.min(maxExtent);
        }
        this.setExtent(ext);
        this.handle.setRight(this.right());
        this.handle.setBottom(this.bottom());
    }
}

