// BlockInputFragmentMorph ///////////////////////////////////////////////

/*
    I am a variable blob in a custom block prototype's label. I can be clicked
    to edit my contents and to turn me into an part of the block's label text.
*/

import TemplateSlotMorph from "../blocks/TemplateSlotMorph";

// BlockInputFragmentMorph instance creation:

export default class BlockInputFragmentMorph extends TemplateSlotMorph {
    constructor(text) {
        this.init(text);
    }

    init(text) {
        this.fragment = new BlockLabelFragment(text);
        this.fragment.type = '%s';
        super.init.call(this, text);
    }
}

// BlockInputFragmentMorph events:

BlockInputFragmentMorph.prototype.mouseClickLeft
    = BlockLabelFragmentMorph.prototype.mouseClickLeft;

BlockInputFragmentMorph.prototype.updateBlockLabel
    = BlockLabelFragmentMorph.prototype.updateBlockLabel;

