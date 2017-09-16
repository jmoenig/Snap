// BlockImportDialogMorph ////////////////////////////////////////////////////

// BlockImportDialogMorph inherits from DialogBoxMorph
// and pseudo-inherits from BlockExportDialogMorph:
// TODO
// BlockImportDialogMorph.prototype = new DialogBoxMorph();
// BlockImportDialogMorph.prototype.constructor = BlockImportDialogMorph;
// super = DialogBoxMorph.prototype;

// BlockImportDialogMorph constants:

BlockImportDialogMorph.prototype.key = 'blockImport';

// BlockImportDialogMorph instance creation:

export default class BlockImportDialogMorph extends DialogBoxMorph {
    constructor(blocks, target, name) {
        this.init(blocks, target, name);
    }

    init(blocks, target, name) {
        const myself = this;

        // additional properties:
        this.blocks = blocks.slice(0);
        this.handle = null;

        // initialize inherited properties:
        BlockExportDialogMorph.uber.init.call(
            this,
            target,
            () => {myself.importBlocks(name); },
            null // environment
        );

        // override inherited properites:
        this.labelString = localize('Import blocks')
            + (name ? ': ' : '')
            + name || '';
        this.createLabel();

        // build contents
        this.buildContents();
    }

    // BlockImportDialogMorph ops

    importBlocks(name) {
        const ide = this.target.parentThatIsA(IDE_Morph);
        if (!ide) {return; }
        if (this.blocks.length > 0) {
            this.blocks.forEach(def => {
                def.receiver = ide.stage;
                ide.stage.globalBlocks.push(def);
                ide.stage.replaceDoubleDefinitionsFor(def);
            });
            ide.flushPaletteCache();
            ide.refreshPalette();
            ide.showMessage(
                `Imported Blocks Module${name ? ': ' + name : ''}.`,
                2
            );
        } else {
            new DialogBoxMorph().inform(
                'Import blocks',
                'no blocks were selected',
                this.world()
            );
        }
    }
}

BlockImportDialogMorph.prototype.buildContents
    = BlockExportDialogMorph.prototype.buildContents;

BlockImportDialogMorph.prototype.popUp
    = BlockExportDialogMorph.prototype.popUp;

// BlockImportDialogMorph menu

BlockImportDialogMorph.prototype.userMenu
    = BlockExportDialogMorph.prototype.userMenu;

BlockImportDialogMorph.prototype.selectAll
    = BlockExportDialogMorph.prototype.selectAll;

BlockImportDialogMorph.prototype.selectNone
    = BlockExportDialogMorph.prototype.selectNone;

// BlockImportDialogMorph layout

BlockImportDialogMorph.prototype.fixLayout
    = BlockEditorMorph.prototype.fixLayout;