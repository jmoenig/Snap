// ArgLabelMorph ///////////////////////////////////////////////////////

/*
    I am a label string that is wrapped around an ArgMorph, usually
    a MultiArgMorph, so to indicate that it has been replaced entirely
    for an embedded reporter block

    I don't have a block spec, I get embedded automatically by the parent
    block's argument replacement mechanism

    My evaluation method is the identity function, i.e. I simply pass my
    input's value along.
*/

import ArgMorph from "./ArgMorph";

// MultiArgMorph instance creation:

export default class ArgLabelMorph extends ArgMorph {
    constructor(argMorph, labelTxt) {
        this.init(argMorph, labelTxt);
    }

    init(argMorph, labelTxt) {
        let label;

        this.labelText = localize(labelTxt || 'input list:');
        super.init.call(this, null, true); // silently

        this.isStatic = true; // I cannot be exchanged

        // ArgLabelMorphs are transparent
        this.alpha = 0;
        this.noticesTransparentclick = true;

        // label text:
        label = this.labelPart(this.labelText);
        this.add(label);

        // argMorph
        this.add(argMorph);
    }

    label() {
        return this.children[0];
    }

    argMorph() {
        return this.children[1];
    }

    // ArgLabelMorph layout:

    fixLayout() {
        const label = this.label();
        let shadowColor;
        let shadowOffset;

        if (this.parent) {
            this.color = this.parent.color;
            shadowOffset = label.shadowOffset || new Point();

            // determine the shadow color for zebra coloring:
            if (shadowOffset.x < 0) {
                shadowColor = this.parent.color.darker(this.labelContrast);
            } else {
                shadowColor = this.parent.color.lighter(this.labelContrast);
            }

            if (this.labelText !== '') {
                if (!label.shadowColor.eq(shadowColor)) {
                    label.shadowColor = shadowColor;
                    label.shadowOffset = shadowOffset;
                    label.drawNew();
                }
            }
        }
        super.fixLayout.call(this);
        if (this.parent) {
            this.parent.fixLayout();
        }
    }

    refresh() {
        this.inputs().forEach(input => {
            input.drawNew();
        });
    }

    drawNew() {
        super.drawNew.call(this);
        this.refresh();
    }

    // ArgLabelMorph label color:

    setLabelColor(textColor, shadowColor, shadowOffset) {
        if (this.labelText !== '') {
            const label = this.label();
            label.color = textColor;
            label.shadowColor = shadowColor;
            label.shadowOffset = shadowOffset;
            label.drawNew();
        }
    }

    // ArgLabelMorph events:

    reactToGrabOf() {
        if (this.parent instanceof SyntaxElementMorph) {
            this.parent.revertToDefaultInput(this);
        }
    }

    // ArgLabelMorph evaluating:

    evaluate() {
        // this is usually overridden by the interpreter. This method is only
        // called (and needed) for the variables menu.

        return this.argMorph().evaluate();
    }

    isEmptySlot() {
        return false;
    }
}