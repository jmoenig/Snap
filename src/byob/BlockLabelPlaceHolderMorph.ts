// BlockLabelPlaceHolderMorph ///////////////////////////////////////////////

/*
    I am a space between words or inputs in a custom block prototype's label.
    When I am moused over I display a plus sign on a colored background
    circle. I can be clicked to add a new word or input to the prototype.
*/

import BlockLabelFragment from "./BlockLabelFragment";

// BlockLabelPlaceHolderMorph preferences settings

BlockLabelPlaceHolderMorph.prototype.plainLabel = false; // always show (+)

// BlockLabelPlaceHolderMorph instance creation:

export default class BlockLabelPlaceHolderMorph extends StringMorph {
    constructor() {
        this.init();
    }

    init() {
        this.fragment = new BlockLabelFragment('');
        this.fragment.type = '%s';
        this.fragment.isDeleted = true;
        this.isHighlighted = false;
        this.isProtectedLabel = true; // doesn't participate in zebra coloring
        BlockLabelFragmentMorph.uber.init.call(this, '+');
    }

    // BlockLabelPlaceHolderMorph drawing

    drawNew() {
        let context;
        let width;
        let x;
        let y;
        let cx;
        let cy;

        // set my text contents depending on the "plainLabel" flag
        if (this.plainLabel) {
            this.text = this.isHighlighted ? ' + ' : '';
        }

        // initialize my surface property
        this.image = newCanvas();
        context = this.image.getContext('2d');
        context.font = this.font();

        // set my extent
        width = Math.max(
            context.measureText(this.text).width
                + Math.abs(this.shadowOffset.x),
            1
        );
        this.bounds.corner = this.bounds.origin.add(
            new Point(
                width,
                fontHeight(this.fontSize) + Math.abs(this.shadowOffset.y)
            )
        );
        this.image.width = width;
        this.image.height = this.height();

        // draw background, if any
        if (this.isHighlighted) {
            cx = Math.floor(width / 2);
            cy = Math.floor(this.height() / 2);
            context.fillStyle = this.color.toString();
            context.beginPath();
            context.arc(
                cx,
                cy * 1.2,
                Math.min(cx, cy),
                radians(0),
                radians(360),
                false
            );
            context.closePath();
            context.fill();
        }

        // prepare context for drawing text
        context.font = this.font();
        context.textAlign = 'left';
        context.textBaseline = 'bottom';

        // first draw the shadow, if any
        if (this.shadowColor) {
            x = Math.max(this.shadowOffset.x, 0);
            y = Math.max(this.shadowOffset.y, 0);
            context.fillStyle = this.shadowColor.toString();
            context.fillText(this.text, x, fontHeight(this.fontSize) + y);
        }

        // now draw the actual text
        x = Math.abs(Math.min(this.shadowOffset.x, 0));
        y = Math.abs(Math.min(this.shadowOffset.y, 0));
        context.fillStyle = this.isHighlighted ?
                'white' : this.color.toString();
        context.fillText(this.text, x, fontHeight(this.fontSize) + y);

        // notify my parent of layout change
        if (this.parent) {
            if (this.parent.fixLayout) {
                this.parent.fixLayout();
            }
            if (this.parent.parent instanceof PrototypeHatBlockMorph) {
                this.parent.parent.fixLayout();
            }
        }
    }

    // BlockLabelPlaceHolderMorph events:

    mouseEnter() {
        const hat = this.parentThatIsA(PrototypeHatBlockMorph);
        this.isHighlighted = true;
        if (this.plainLabel && hat) {
            hat.changed();
            this.drawNew();
            hat.changed();
        } else {
            this.drawNew();
            this.changed();
        }
    }

    mouseLeave() {
        const hat = this.parentThatIsA(PrototypeHatBlockMorph);
        this.isHighlighted = false;
        if (this.plainLabel && hat) {
            hat.changed();
            this.drawNew();
            hat.changed();
        } else {
            this.drawNew();
            this.changed();
        }
    }
}

BlockLabelPlaceHolderMorph.prototype.mouseClickLeft
    = BlockLabelFragmentMorph.prototype.mouseClickLeft;

BlockLabelPlaceHolderMorph.prototype.updateBlockLabel
    = BlockLabelFragmentMorph.prototype.updateBlockLabel;

