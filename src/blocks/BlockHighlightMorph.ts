// BlockHighlightMorph /////////////////////////////////////////////////

/*
    I am a glowing halo around a block or stack of blocks indicating that
    a script is currently active or has encountered an error.
    I halso have an optional readout that can display a thread count
    if more than one process shares the same script
*/

// BlockHighlightMorph instance creation:

export default class BlockHighlightMorph extends Morph {
    constructor() {
        this.threadCount = 0;
        this.init();
    }

    // BlockHighlightMorph thread count readout

    readout() {
        return this.children.length ? this.children[0] : null;
    }

    updateReadout() {
        let readout = this.readout();

        const inset = useBlurredShadows && !MorphicPreferences.isFlat ?
            SyntaxElementMorph.prototype.activeBlur * 0.4
                : SyntaxElementMorph.prototype.activeBorder * -2;

        if (this.threadCount < 2) {
            if (readout) {
                readout.destroy();
            }
            return;
        }
        if (readout) {
            readout.contents = this.threadCount.toString();
            readout.fullChanged();
            readout.drawNew();
            readout.fullChanged();
        } else {
            readout = new SpeechBubbleMorph(
                this.threadCount.toString(),
                this.color, // color,
                null, // edge,
                null, // border,
                this.color.darker(), // borderColor,
                null, // padding,
                1 // isThought - don't draw a hook
            );
            this.add(readout);
        }
        readout.setPosition(this.position().add(inset));
    }
}