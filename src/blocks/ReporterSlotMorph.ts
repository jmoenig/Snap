// ReporterSlotMorph ///////////////////////////////////////////////////

/*
    I am a ReporterBlock-shaped input slot. I can nest as well as
    accept reporter blocks (containing reified scripts).

    my most important accessor is

    nestedBlock()    - answer the reporter block I encompass, if any

    My command spec is %r for reporters (round) and %p for
    predicates (diamond)

    evaluate() returns my nested block or null
*/

import FunctionSlotMorph from "./FunctionSlotMorph";

// ReporterSlotMorph instance creation:

export default class ReporterSlotMorph extends FunctionSlotMorph {
    constructor(isPredicate) {
        this.init(isPredicate);
    }

    init(isPredicate) {
        super.init.call(this, isPredicate, true);
        this.add(this.emptySlot());
        this.fixLayout();
    }

    emptySlot() {
        const empty = new ArgMorph();
        const shrink = this.rfBorder * 2 + this.edge * 2;
        empty.color = this.rfColor;
        empty.alpha = 0;
        empty.setExtent(new Point(
            (this.fontSize + this.edge * 2) * 2 - shrink,
            this.fontSize + this.edge * 2 - shrink
        ));
        return empty;
    }

    // ReporterSlotMorph accessing:

    getSpec() {
        return '%r';
    }

    contents() {
        return this.children[0];
    }

    nestedBlock() {
        const contents = this.contents();
        return contents instanceof ReporterBlockMorph ? contents : null;
    }

    // ReporterSlotMorph evaluating:

    evaluate() {
        return this.nestedBlock();
    }

    isEmptySlot() {
        return this.nestedBlock() === null;
    }

    // ReporterSlotMorph layout:

    fixLayout() {
        const contents = this.contents();
        this.setExtent(contents.extent().add(
            this.edge * 2 + this.rfBorder * 2
        ));
        contents.setCenter(this.center());
        if (this.parent) {
            if (this.parent.fixLayout) {
                this.parent.fixLayout();
            }
        }
    }
}