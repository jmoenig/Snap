// RingMorph /////////////////////////////////////////////////////////////

/*
    I am a reporter block which reifies its contents, my outer shape is
    always roundish (never diamond)
*/

import ReporterBlockMorph from "./ReporterBlockMorph";

// RingMorph preferences settings:

RingMorph.prototype.isCachingInputs = false;

// RingMorph.prototype.edge = 2;
// RingMorph.prototype.rounding = 9;
// RingMorph.prototype.alpha = 0.8;
// RingMorph.prototype.contrast = 85;

// RingMorph instance creation:

export default class RingMorph extends ReporterBlockMorph {
    constructor() {
        this.init();
    }

    init() {
        super.init.call(this);
        this.category = 'other';
        this.alpha = RingMorph.prototype.alpha;
        this.contrast = RingMorph.prototype.contrast;
        this.setExtent(new Point(200, 80));
    }

    // RingMorph dragging and dropping

    rootForGrab() {
        if (this.isDraggable) {
            return this;
        }
        return BlockMorph.uber.rootForGrab.call(this);
    }

    // RingMorph ops - Note: these assume certain layouts defined elsewhere -

    embed(aBlock, inputNames) {
        let slot;

        // set my color
        this.color = SpriteMorph.prototype.blockColor.other;
        this.isDraggable = true;

        // set my type, selector, and nested block:
        if (aBlock instanceof CommandBlockMorph) {
            this.isStatic = false;
            this.setSpec('%rc %ringparms');
            this.selector = 'reifyScript';
            slot = this.parts()[0];
            slot.nestedBlock(aBlock);
        } else if (aBlock.isPredicate) {
            this.isStatic = true;
            this.setSpec('%rp %ringparms');
            this.selector = 'reifyPredicate';
            slot = this.parts()[0];
            slot.silentReplaceInput(slot.contents(), aBlock);
        } else if (aBlock instanceof BooleanSlotMorph) {
            this.isStatic = false;
            this.setSpec('%rp %ringparms');
            this.selector = 'reifyPredicate';
            slot = this.parts()[0];
            slot.silentReplaceInput(slot.contents(), aBlock);
        } else { // reporter or input slot)
            this.isStatic = false;
            this.setSpec('%rr %ringparms');
            this.selector = 'reifyReporter';
            slot = this.parts()[0];
            slot.silentReplaceInput(slot.contents(), aBlock);
        }

        // set my inputs, if any
        slot = this.parts()[1];
        if (inputNames) {
            inputNames.forEach(name => {
                slot.addInput(name);
            });
        }

        // ensure zebra coloring
        this.fixBlockColor(null, true);
    }

    vanishForSimilar() {
        // let me disappear if I am nesting a variable getter or Ring
        // but only if I'm not already inside another ring
        const slot = this.parts()[0];

        const block = slot.nestedBlock();

        if (!block) {return null; }
        if (!(this.parent instanceof SyntaxElementMorph)) {return null; }
        if (this.parent instanceof RingReporterSlotMorph
                || (this.parent instanceof RingCommandSlotMorph)) {
            return null;
        }
        if (block.selector === 'reportGetVar' ||
            block.selector === 'reportJSFunction' ||
            (block instanceof RingMorph)
        ) {
            this.parent.silentReplaceInput(this, block);
        }
    }

    contents() {
        return this.parts()[0].nestedBlock();
    }

    inputNames() {
        return this.parts()[1].evaluate();
    }

    dataType() {
        switch (this.selector) {
        case 'reifyScript':
            return 'command';
        case 'reifyPredicate':
            return 'predicate';
        default:
            return 'reporter';
        }
    }

    // RingMorph zebra coloring

    fixBlockColor(nearest, isForced) {
        const slot = this.parts()[0];
        super.fixBlockColor.call(this, nearest, isForced);
        slot.fixLayout();
    }
}