// AlignmentMorph /////////////////////////////////////////////////////

// I am a reified layout, either a row or a column of submorphs

import Morph from "../morphic/morph/Morph";

// AlignmentMorph instance creation:

export default class AlignmentMorph extends Morph {
    constructor(orientation, padding) {
        this.init(orientation, padding);
    }

    init(orientation, padding) {
        // additional properties:
        this.orientation = orientation || 'row'; // or 'column'
        this.alignment = 'center'; // or 'left' in a column
        this.padding = padding || 0;
        this.respectHiddens = false;

        // initialize inherited properties:
        super.init.call(this);

        // override inherited properites:
    }

    // AlignmentMorph displaying and layout

    drawNew() {
        this.image = newCanvas(new Point(1, 1));
        this.fixLayout();
    }

    fixLayout() {
        const myself = this;
        let last = null;
        let newBounds;
        if (this.children.length === 0) {
            return null;
        }
        this.children.forEach(c => {
            let cfb = c.fullBounds();
            let lfb;
            if (c.isVisible || myself.respectHiddens) {
                if (last) {
                    lfb = last.fullBounds();
                    if (myself.orientation === 'row') {
                        c.setPosition(
                            lfb.topRight().add(new Point(
                                myself.padding,
                                (lfb.height() - cfb.height()) / 2
                            ))
                        );
                    } else { // orientation === 'column'
                        c.setPosition(
                            lfb.bottomLeft().add(new Point(
                                myself.alignment === 'center' ?
                                        (lfb.width() - cfb.width()) / 2
                                                : 0,
                                myself.padding
                            ))
                        );
                    }
                    cfb = c.fullBounds();
                    newBounds = newBounds.merge(cfb);
                } else {
                    newBounds = cfb;
                }
                last = c;
            }
        });
        this.bounds = newBounds;
    }
}

