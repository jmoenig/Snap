// BlockRemovalDialogMorph ///////////////////////////////////////////////////

// BlockRemovalDialogMorph inherits from DialogBoxMorph
// and pseudo-inherits from BlockExportDialogMorph:
// TODO
// BlockRemovalDialogMorph.prototype = new DialogBoxMorph();
// BlockRemovalDialogMorph.prototype.constructor = BlockImportDialogMorph;
// super = DialogBoxMorph.prototype;

// BlockRemovalDialogMorph constants:

BlockRemovalDialogMorph.prototype.key = 'blockRemove';

// BlockRemovalDialogMorph instance creation:

export default class BlockRemovalDialogMorph extends DialogBoxMorph {
    constructor(blocks, target) {
        this.init(blocks, target);
    }

    init(blocks, target) {
        const myself = this;

        // additional properties:
        this.blocks = blocks.slice(0);
        this.handle = null;

        // initialize inherited properties:
        BlockExportDialogMorph.uber.init.call(
            this,
            target,
            () => {myself.removeBlocks(); },
            null // environment
        );

        // override inherited properites:
        this.labelString = localize('Remove unused blocks')
            + (name ? ': ' : '')
            + name || '';
        this.createLabel();

        // build contents
        this.buildContents();
    }

    // BlockRemovalDialogMorph ops

    removeBlocks() {
        const ide = this.target.parentThatIsA(IDE_Morph);
        if (!ide) {return; }
        if (this.blocks.length > 0) {
            this.blocks.forEach(def => {
                const idx = ide.stage.globalBlocks.indexOf(def);
                if (idx !== -1) {
                    ide.stage.globalBlocks.splice(idx, 1);
                }
            });
            ide.flushPaletteCache();
            ide.refreshPalette();
            ide.showMessage(
                `${this.blocks.length} ${localize('unused block(s) removed')}`,
                2
            );
        } else {
            new DialogBoxMorph().inform(
                'Remove unused blocks',
                'no blocks were selected',
                this.world()
            );
        }
    }
}

BlockRemovalDialogMorph.prototype.buildContents
    = BlockExportDialogMorph.prototype.buildContents;

BlockRemovalDialogMorph.prototype.popUp
    = BlockExportDialogMorph.prototype.popUp;

// BlockRemovalDialogMorph menu

BlockRemovalDialogMorph.prototype.userMenu
    = BlockExportDialogMorph.prototype.userMenu;

BlockRemovalDialogMorph.prototype.selectAll
    = BlockExportDialogMorph.prototype.selectAll;

BlockRemovalDialogMorph.prototype.selectNone
    = BlockExportDialogMorph.prototype.selectNone;

// BlockRemovalDialogMorph layout

BlockRemovalDialogMorph.prototype.fixLayout
    = BlockEditorMorph.prototype.fixLayout;