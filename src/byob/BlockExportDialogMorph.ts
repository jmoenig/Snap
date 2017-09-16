// BlockExportDialogMorph ////////////////////////////////////////////////////

// BlockExportDialogMorph constants:

BlockExportDialogMorph.prototype.key = 'blockExport';

// BlockExportDialogMorph instance creation:

export default class BlockExportDialogMorph extends DialogBoxMorph {
    constructor(serializer, blocks) {
        this.init(serializer, blocks);
    }

    init(serializer, blocks) {
        const myself = this;

        // additional properties:
        this.serializer = serializer;
        this.blocks = blocks.slice(0);
        this.handle = null;

        // initialize inherited properties:
        super.init.call(
            this,
            null, // target
            () => {myself.exportBlocks(); },
            null // environment
        );

        // override inherited properites:
        this.labelString = 'Export blocks';
        this.createLabel();

        // build contents
        this.buildContents();
    }

    buildContents() {
        let palette;
        let x;
        let y;
        let block;
        let checkBox;
        let lastCat;
        const myself = this;
        const padding = 4;

        // create plaette
        palette = new ScrollFrameMorph(
            null,
            null,
            SpriteMorph.prototype.sliderColor
        );
        palette.color = SpriteMorph.prototype.paletteColor;
        palette.padding = padding;
        palette.isDraggable = false;
        palette.acceptsDrops = false;
        palette.contents.acceptsDrops = false;

        // populate palette
        x = palette.left() + padding;
        y = palette.top() + padding;
        SpriteMorph.prototype.categories.forEach(category => {
            myself.blocks.forEach(definition => {
                if (definition.category === category) {
                    if (lastCat && (category !== lastCat)) {
                        y += padding;
                    }
                    lastCat = category;
                    block = definition.templateInstance();
                    checkBox = new ToggleMorph(
                        'checkbox',
                        myself,
                        () => {
                            const idx = myself.blocks.indexOf(definition);
                            if (idx > -1) {
                                myself.blocks.splice(idx, 1);
                            } else {
                                myself.blocks.push(definition);
                            }
                        },
                        null,
                        () => contains(
                            myself.blocks,
                            definition
                        ),
                        null,
                        null,
                        null,
                        block.fullImage()
                    );
                    checkBox.setPosition(new Point(
                        x,
                        y + (checkBox.top() - checkBox.toggleElement.top())
                    ));
                    palette.addContents(checkBox);
                    y += checkBox.fullBounds().height() + padding;
                }
            });
        });

        palette.scrollX(padding);
        palette.scrollY(padding);
        this.addBody(palette);

        this.addButton('ok', 'OK');
        this.addButton('cancel', 'Cancel');

        this.setExtent(new Point(220, 300));
        this.fixLayout();
    }

    popUp(wrrld) {
        const world = wrrld || this.target.world();
        if (world) {
            super.popUp.call(this, world);
            this.handle = new HandleMorph(
                this,
                200,
                220,
                this.corner,
                this.corner
            );
        }
    }

    // BlockExportDialogMorph menu

    userMenu() {
        const menu = new MenuMorph(this, 'select');
        menu.addItem('all', 'selectAll');
        menu.addItem('none', 'selectNone');
        return menu;
    }

    selectAll() {
        this.body.contents.children.forEach(checkBox => {
            if (!checkBox.state) {
                checkBox.trigger();
            }
        });
    }

    selectNone() {
        this.blocks = [];
        this.body.contents.children.forEach(checkBox => {
            checkBox.refresh();
        });
    }

    // BlockExportDialogMorph ops

    exportBlocks() {
        let str = this.serializer.serialize(this.blocks);
        const ide = this.world().children[0];

        if (this.blocks.length > 0) {
            str = `<blocks app="${this.serializer.app}" version="${this.serializer.version}">${str}</blocks>`;
            ide.saveXMLAs(
                str,
                `${ide.projectName || localize('untitled')} ${localize('blocks')}`
            );
        } else {
            new DialogBoxMorph().inform(
                'Export blocks',
                'no blocks were selected',
                this.world()
            );
        }
    }
}

// BlockExportDialogMorph layout

BlockExportDialogMorph.prototype.fixLayout
    = BlockEditorMorph.prototype.fixLayout;