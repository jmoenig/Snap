// LibraryImportDialogMorph ///////////////////////////////////////////
// I am preview dialog shown before importing a library.
// I inherit from a DialogMorph but look similar to 
// ProjectDialogMorph, and BlockImportDialogMorph // TODO

// LibraryImportDialogMorph instance creation:

export default class LibraryImportDialogMorph extends DialogBoxMorph {
    constructor(ide, librariesData) {
        this.init(ide, librariesData);
    }

    init(ide, librariesData) {
        // initialize inherited properties:
        super.init.call(
            this,
            this, // target
            null, // function
            null  // environment
        );

        this.ide = ide;
        this.key = 'importLibrary';
        this.librariesData = librariesData; // [{name: , fileName: , description:}]

        // I contain a cached version of the libaries I have displayed,
        // because users may choose to explore a library many times before
        // importing.
        this.libraryCache = {}; // {fileName: [blocks-array] }

        this.handle = null;
        this.listField = null;
        this.palette = null;
        this.notesText = null;
        this.notesField = null;

        this.labelString = 'Import library';
        this.createLabel();

        this.buildContents();
    }

    buildContents() {
        this.addBody(new Morph());
        this.body.color = this.color;

        this.initializePalette();
        this.initializeLibraryDescription();
        this.installLibrariesList();

        this.addButton('importLibrary', 'Import');
        this.addButton('cancel', 'Cancel');

        this.setExtent(new Point(460, 455));
        this.fixLayout();
    }

    initializePalette() {
        // I will display a scrolling list of blocks.
        if (this.palette) {this.palette.destroy(); }

        this.palette = new ScrollFrameMorph(
            null,
            null,
            SpriteMorph.prototype.sliderColor
        );
        this.palette.color = SpriteMorph.prototype.paletteColor;
        this.palette.padding = 4;
        this.palette.isDraggable = false;
        this.palette.acceptsDrops = false;
        this.palette.contents.acceptsDrops = false;

        this.body.add(this.palette);
    }

    initializeLibraryDescription() {
        if (this.notesField) {this.notesField.destroy(); }

        this.notesField = new ScrollFrameMorph();
        this.notesField.fixLayout = nop;

        this.notesField.edge = InputFieldMorph.prototype.edge;
        this.notesField.fontSize = InputFieldMorph.prototype.fontSize;
        this.notesField.typeInPadding = InputFieldMorph.prototype.typeInPadding;
        this.notesField.contrast = InputFieldMorph.prototype.contrast;
        this.notesField.drawNew = InputFieldMorph.prototype.drawNew;
        this.notesField.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;

        this.notesField.acceptsDrops = false;
        this.notesField.contents.acceptsDrops = false;

        this.notesText = new TextMorph('');

        this.notesField.isTextLineWrapping = true;
        this.notesField.padding = 3;
        this.notesField.setContents(this.notesText);
        this.notesField.setHeight(100);

        this.body.add(this.notesField);
    }

    installLibrariesList() {
        const myself = this;

        if (this.listField) {this.listField.destroy(); }

        this.listField = new ListMorph(
            this.librariesData,
            element => element.name,
            null,
            () => {myself.importLibrary(); }
        );

        this.fixListFieldItemColors();

        this.listField.fixLayout = nop;
        this.listField.edge = InputFieldMorph.prototype.edge;
        this.listField.fontSize = InputFieldMorph.prototype.fontSize;
        this.listField.typeInPadding = InputFieldMorph.prototype.typeInPadding;
        this.listField.contrast = InputFieldMorph.prototype.contrast;
        this.listField.drawNew = InputFieldMorph.prototype.drawNew;
        this.listField.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;

        this.listField.action = item => {
            if (isNil(item)) {return; }

            myself.notesText.text = item.description || '';
            myself.notesText.drawNew();
            myself.notesField.contents.adjustBounds();

            if (myself.hasCached(item.fileName)) {
                myself.displayBlocks(item.fileName);
            } else {
                myself.showMessage(
                    `${localize('Loading')}\n${localize(item.name)}`
                );
                myself.ide.getURL(
                    myself.ide.resourceURL('libraries', item.fileName),
                    libraryXML => {
                        myself.cacheLibrary(
                            item.fileName,
                            myself.ide.serializer.loadBlocks(libraryXML)
                        );
                        myself.displayBlocks(item.fileName);
                    }
                );
            }
        };

        this.listField.setWidth(200);
        this.body.add(this.listField);

        this.fixLayout();
    }

    popUp() {
        const world = this.ide.world();
        if (world) {
            super.popUp.call(this, world);
            this.handle = new HandleMorph(
                this,
                300,
                300,
                this.corner,
                this.corner
            );
        }
    }

    fixLayout() {
        const titleHeight = fontHeight(this.titleFontSize) + this.titlePadding * 2;
        const thin = this.padding / 2;
        const oldFlag = Morph.prototype.trackChanges;

        Morph.prototype.trackChanges = false;

        if (this.body) {
            this.body.setPosition(this.position().add(new Point(
                this.padding,
                titleHeight + this.padding
            )));
            this.body.setExtent(new Point(
                this.width() - this.padding * 2,
                this.height()
                    - this.padding * 3 // top, bottom and button padding.
                    - titleHeight
                    - this.buttons.height()
            ));

            this.listField.setExtent(new Point(
                200,
                this.body.height()
            ));
            this.notesField.setExtent(new Point(
                this.body.width() - this.listField.width() - thin,
                100
            ));
            this.palette.setExtent(new Point(
                this.notesField.width(),
                this.body.height() - this.notesField.height() - thin
            ));
            this.listField.contents.children[0].adjustWidths();

            this.listField.setPosition(this.body.position());
            this.palette.setPosition(this.listField.topRight().add(
                new Point(thin, 0)
            ));
            this.notesField.setPosition(this.palette.bottomLeft().add(
                new Point(0, thin)
            ));
        }

        if (this.label) {
            this.label.setCenter(this.center());
            this.label.setTop(
                this.top() + (titleHeight - this.label.height()) / 2
            );
        }

        if (this.buttons) {
            this.buttons.fixLayout();
            this.buttons.setCenter(this.center());
            this.buttons.setBottom(this.bottom() - this.padding);
        }

        Morph.prototype.trackChanges = oldFlag;
        this.changed();
    }

    // Library Cache Utilities.
    hasCached(key) {
        return this.libraryCache.hasOwnProperty(key);
    }

    cacheLibrary(key, blocks) {
        this.libraryCache[key] = blocks ;
    }

    cachedLibrary(key) {
        return this.libraryCache[key];
    }

    importLibrary() {
        let blocks;
        const ide = this.ide;
        const selectedLibrary = this.listField.selected.fileName;
        const libraryName = this.listField.selected.name;

        if (this.hasCached(selectedLibrary)) {
            blocks = this.cachedLibrary(selectedLibrary);
            blocks.forEach(def => {
                def.receiver = ide.stage;
                ide.stage.globalBlocks.push(def);
                ide.stage.replaceDoubleDefinitionsFor(def);
            });
            ide.showMessage(`${localize('Imported')} ${localize(libraryName)}`, 2);
        } else {
            ide.showMessage(`${localize('Loading')} ${localize(libraryName)}`);
            ide.getURL(
                ide.resourceURL('libraries', selectedLibrary),
                libraryText => {
                    ide.droppedText(libraryText, libraryName);
                }
            );
        }

        this.destroy();
    }

    displayBlocks(libraryKey) {
        let x;
        let y;
        let blockImage;
        let previousCategory;
        let blockContainer;
        const myself = this;
        const padding = 4;
        const blocksList = this.cachedLibrary(libraryKey);

        if (!blocksList.length) {return; }
        // populate palette, grouped by categories.
        this.initializePalette();
        x = this.palette.left() + padding;
        y = this.palette.top();

        SpriteMorph.prototype.categories.forEach(category => {
            blocksList.forEach(definition => {
                if (definition.category !== category) {return; }
                if (category !== previousCategory) {
                    y += padding;
                }
                previousCategory = category;

                blockImage = definition.templateInstance().fullImage();
                blockContainer = new Morph();
                blockContainer.setExtent(
                    new Point(blockImage.width, blockImage.height)
                );
                blockContainer.image = blockImage;
                blockContainer.setPosition(new Point(x, y));
                myself.palette.addContents(blockContainer);

                y += blockContainer.fullBounds().height() + padding;
            });
        });

        this.palette.scrollX(padding);
        this.palette.scrollY(padding);
        this.fixLayout();
    }

    showMessage(msgText) {
        const msg = new MenuMorph(null, msgText);
        this.initializePalette();
        this.fixLayout();
        msg.popUpCenteredInWorld(this.palette.contents);
    }
}

LibraryImportDialogMorph.prototype.fixListFieldItemColors =
    ProjectDialogMorph.prototype.fixListFieldItemColors;

LibraryImportDialogMorph.prototype.clearDetails =
    ProjectDialogMorph.prototype.clearDetails;