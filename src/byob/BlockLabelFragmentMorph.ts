// BlockLabelFragmentMorph ///////////////////////////////////////////////

import BlockLabelFragment from "./BlockLabelFragment";

/*
    I am a single word in a custom block prototype's label. I can be clicked
    to edit my contents and to turn me into an input placeholder.
*/

// BlockLabelFragmentMorph instance creation:

export default class BlockLabelFragmentMorph extends StringMorph {
    constructor(text) {
        this.init(text);
    }

    init(text) {
        this.fragment = new BlockLabelFragment(text);
        this.fragment.type = null;
        this.sO = null; // temporary backup for shadowOffset
        super.init.call(
            this,
            text,
            null, // font size
            SyntaxElementMorph.prototype.labelFontStyle,
            null, // bold
            null, // italic
            null, // numeric
            null, // shadow offset
            null, // shadow color
            null, // color
            SyntaxElementMorph.prototype.labelFontName
        );
    }

    // BlockLabelFragmentMorph events:

    mouseEnter() {
        this.sO = this.shadowOffset;
        this.shadowOffset = this.sO.neg();
        this.drawNew();
        this.changed();
    }

    mouseLeave() {
        this.shadowOffset = this.sO;
        this.drawNew();
        this.changed();
    }

    mouseClickLeft() {
        /*
            make a copy of my fragment object and open an InputSlotDialog on it.
            If the user acknowledges the DialogBox, assign the - edited - copy
            of the fragment object to be my new fragment object and update the
            custom block'label (the prototype in the block editor). Do not yet update
            the definition and every block instance, as this happens only after
            the user acknowledges and closes the block editor
        */
        const frag = this.fragment.copy();

        const myself = this;
        const isPlaceHolder = this instanceof BlockLabelPlaceHolderMorph;

        const isOnlyElement = this.parent.parseSpec(this.parent.blockSpec).length
            < 2;

        new InputSlotDialogMorph(
            frag,
            null,
            () => {myself.updateBlockLabel(frag); },
            this,
            this.parent.definition.category
        ).open(
            this instanceof BlockLabelFragmentMorph ?
                    'Edit label fragment' :
                    isPlaceHolder ? 'Create input name' : 'Edit input name',
            frag.labelString,
            this.world(),
            null,
            isPlaceHolder || isOnlyElement
        );
    }

    updateBlockLabel(newFragment) {
        const prot = this.parentThatIsA(BlockMorph);

        this.fragment = newFragment;
        if (prot) {
            prot.refreshPrototype();
        }
    }

    userMenu() {
        // show a menu of built-in special symbols
        const myself = this;

        const symbolColor = new Color(100, 100, 130);

        const menu = new MenuMorph(
            string => {
                const tuple = myself.text.split('-');
                myself.changed();
                tuple[0] = `$${string}`;
                myself.text = tuple.join('-');
                myself.fragment.labelString = myself.text;
                myself.parent.parent.changed();
                myself.drawNew();
                myself.changed();
                myself.parent.parent.fixLayout();
                myself.parent.parent.changed();
            },
            null,
            this,
            this.fontSize
        );

        SymbolMorph.prototype.names.forEach(name => {
            menu.addItem(
                [new SymbolMorph(name, menu.fontSize, symbolColor), name],
                name
            );
        });
        menu.addLine();
        menu.addItem(`\u23CE ${localize('new line')}`, 'nl');
        return menu;
    }
}