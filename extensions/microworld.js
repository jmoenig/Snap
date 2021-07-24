var ide = world.children.find(child => {
    return child instanceof IDE_Morph;
}),
    prefix = 'mw_';

SnapExtensions.primitives.set(
    prefix+'get_specs(blocks)',
    (blocks) => {
        var specs = [];
        blocks.contents.map(block => {
            if(!block.expression){
                return;
            }
            if(block.expression.selector && block.expression.selector !== 'evaluateCustomBlock'){
                specs.push(block.expression.selector);
            }
            else if(block.expression.blockSpec) {
                specs.push(block.expression.blockSpec);
            }
        })

        return new List(specs);
    }
)

SnapExtensions.primitives.set(
    prefix+'enter',
    () => {
        if(ide.stage.microworld){
            ide.stage.microworld.enter();
        }
    }
)

SnapExtensions.primitives.set(
    prefix+'escape',
    () => {
        if(ide.stage.microworld){
            ide.stage.microworld.escape();
        }
    }
)

SnapExtensions.primitives.set(
    prefix+'load(params)',
    (params) => {
        params = JSON.parse(params);

        // don't reset the microworld while we're in it
        // probably only useful during development of this extension, but doesn't hurt anything
        if(ide.stage.microworld && ide.stage.microworld.isActive){
            ide.stage.microworld.escape();
        }

        ide.stage.microworld = new MicroWorld(ide);

        var microworld = ide.stage.microworld;

        microworld.zoom = params.zoom;
        microworld.enableKeyboard = params.enableKeyboard;
        microworld.simpleBlockDialog = params.simpleBlockDialog;
        microworld.hiddenMorphs = params.hiddenMorphs.split(",").map(item => item.trim());
        microworld.projectMenu = params.projectMenu;
        microworld.blockContextMenu = params.blockContextMenu;

        // add the enter/escape options to the Snap! logo
        ide.logo.userMenu = function () {
            var menu = new MenuMorph(ide);
            if (ide.stage.microworld && ide.stage.microworld.isActive) {
                menu.addItem(
                    'Escape microworld',
                    function () { ide.stage.microworld.escape(); }
                );
            } else if (ide.stage.microworld) {
                menu.addItem(
                    'Enter microworld',
                    function () { ide.stage.microworld.enter(); }
                );
            }
            return menu;
        };
    }
)


function MicroWorld (ide) {
    this.init(ide);
}

MicroWorld.prototype.init = function (ide) {
    this.ide = ide;
    this.hiddenMorphs = [];
    this.blockSpecs = ['load extension development %s', 'forward'];
    this.projectMenu = [];
    this.blockContextMenu = [];
    this.buttons = {
        'scripts': [],
        'palette': [],
        'corral': []
    };
    this.enableKeyboard = true;
    this.simpleBlockDialog = false;
    this.customJS = null;
    this.zoom = 1;
    this.uneditableBlocks = false;
    this.isActive = false;
    this.suppressedKeyEvents = [];

    // backup settings for exiting microworld
    this.originalFireKeyEvent = StageMorph.prototype.fireKeyEvent;

    this.originalCategory = null;
    this.originalHiddenPrimitives = {};

    this.originalCustomBlockTemplatesForCategory = SpriteMorph.prototype.customBlockTemplatesForCategory;
};

MicroWorld.prototype.enter = function () {
    if(this.isActive){
        return;
    }
    var ide = this.ide,
        myself = this;

    this.isActive = true;

    ide.savingPreferences = false;

    if (this.enableKeyboard) {
        ScriptsMorph.prototype.enableKeyboard = true;
    } else {
        ScriptsMorph.prototype.enableKeyboard = false;
    }
    ide.currentSprite.scripts.updateToolbar();

    if (this.customJS) {
        Function.apply(
            null,
            [ this.customJS ]
        ).call(ide);
    }

    this.setBlocksScale(this.zoom);

    if (this.simpleBlockDialog) {
        // Never launch in expanded form
        InputSlotDialogMorph.prototype.isLaunchingExpanded = false;
    }

    if (ide.corralButtonsFrame) {
        ide.corralButtonsFrame.destroy();
        ide.corralButtonsFrame = null;
    }

    this.createPalette();
    this.loadCustomBlocks();

    this.makeButtons();

    this.hideAllMorphs();
    this.ide.fixLayout();

    StageMorph.prototype.fireKeyEvent = function(key){
        if(myself.suppressedKeyEvents.indexOf(key) > -1){
            return;
        }
        return myself.originalFireKeyEvent.call(this, key);
    }
};

MicroWorld.prototype.escape = function () {
    if(!this.isActive){
        return;
    }
    var ide = this.ide,
        myself = this;

    this.isActive = false;

    ScriptsMorph.prototype.enableKeyboard =
        !(ide.getSetting('keyboard') === false);

    this.setBlocksScale(ide.getSetting('zoom') || 1);

    if (ide.corralButtonsFrame) {
        ide.corralButtonsFrame.destroy();
        ide.corralButtonsFrame = null;
    }

    this.hiddenMorphs.forEach(
        function (selector) {
            myself.showMorph(selector);
        }
    );

    ide.fixLayout();

    ide.savingPreferences = true;

    // restore non-microworld values and settings
    StageMorph.prototype.fireKeyEvent = this.originalFireKeyEvent;

    this.restorePalette();
};

MicroWorld.prototype.createPalette = function () {
    var sprite = this.ide.currentSprite,
        myself = this,
        ide = this.ide;

    SpriteMorph.prototype.customBlockTemplatesForCategory = function(category) {
        var blocks = myself.originalCustomBlockTemplatesForCategory.call(sprite, category)
            .filter(block => {
                if(block === "="){
                    return false;
                }

                return block.blockSpec && myself.blockSpecs.indexOf(block.blockSpec) > -1;
            })
        return blocks;
    }

    // backup old settings
    this.originalCategory = ide.currentCategory;


    this.originalHiddenPrimitives = Object.assign({},StageMorph.prototype.hiddenPrimitives);

    ide.setUnifiedPalette(true);

    // hide primitives
    var defs = SpriteMorph.prototype.blocks;

    Object.keys(defs).forEach(sel => {
        if(this.blockSpecs.indexOf(sel) === -1){
            StageMorph.prototype.hiddenPrimitives[sel] = true;
        }
    });

    ide.flushBlocksCache('unified');
    ide.refreshPalette(true);



    // // helper functions to build block templates
    // function primitiveBlock (selector) {
    //     var newBlock = SpriteMorph.prototype.blockForSelector(selector, true);
    //     if (!newBlock) { return null; }
    //     newBlock.isTemplate = true;
    //     return newBlock;
    // };
    // function customBlock (spec) {
    //     var newBlock =
    //         ide.stage.globalBlocks.find(function (block) {
    //             return block.spec == spec;
    //         });
    //     if (!newBlock) { return null; }
    //     return newBlock.templateInstance();
    // };
    // function block (selectorOrSpec) {
    //     if (selectorOrSpec === '-' || selectorOrSpec === '=') {
    //         return selectorOrSpec;
    //     } else {
    //         return primitiveBlock(selectorOrSpec) ||
    //             customBlock(selectorOrSpec);
    //     }
    // };
    //
    // // create the cache for the new category and fill it up with blocks
    // sprite.blocksCache['microworld'] = [];
    // blocks = sprite.blocksCache['microworld'];
    //
    // this.blockSpecs.forEach(function (spec) {
    //     var aBlock = block(spec);
    //     if (aBlock) { blocks.push(aBlock); }
    // });
    //
    // if (this.buttons['palette'].length > 0) {
    //     blocks.push("=");
    //     this.buttons['palette'].forEach(function (definition) {
    //         blocks.push(myself.makeButton(definition));
    //     });
    // }
    //
    // blocks.push("=");
    // blocks.push(sprite.makeBlockButton('microworld'));
    //
    // sprite.refreshMicroWorldPalette = function () {
    //     // only refresh if in microWorld mode
    //     if (myself.isActive) {
    //         blocks.forEach(
    //             function(block){
    //                 if (block.isCorpse) {
    //                     blocks.splice(blocks.indexOf(block), 1);
    //                     block.destroy();
    //                 }
    //             }
    //         );
    //         sprite.customPalette = sprite.freshPalette('microworld');
    //         sprite.customPalette.userMenu = nop;
    //         sprite.paletteCache['microworld'] = sprite.customPalette;
    //         ide.currentCategory = 'microworld';
    //         ide.refreshPalette(true);
    //
    //         ide.fixLayout();
    //     }
    // };
    //
    // sprite.refreshMicroWorldPalette();
    //
    // // flushPaletteCache should also refresh the MicroWorld palette
    // // otherwise deleting custom blocks leaves it in a funny state
    // if (!ide.oldFlushPaletteCache) {
    //     ide.oldFlushPaletteCache = ide.flushPaletteCache;
    //     ide.flushPaletteCache = function (category) {
    //         this.oldFlushPaletteCache(category);
    //         sprite.refreshMicroWorldPalette();
    //     };
    // }
};

MicroWorld.prototype.restorePalette = function() {
    var myself = this,
        ide = this.ide;

    SpriteMorph.prototype.customBlockTemplatesForCategory = this.originalCustomBlockTemplatesForCategory;

    // restore primitives
    StageMorph.prototype.hiddenPrimitives = Object.assign({}, this.originalHiddenPrimitives);
    ide.flushBlocksCache('unified');


    this.ide.setUnifiedPalette(this.originalCategory === 'unified');
    ide.currentCategory = this.originalCategory;
    ide.refreshPalette(true);

    // make sure current category is selected
    ide.categories.fixLayout();
    ide.categories.children.forEach(each =>
        each.refresh()
    );

    ide.fixLayout();


//
}

MicroWorld.prototype.loadCustomBlocks = function () {
    // We load our custom blocks from the stage.
    // They're watermarked with 'microworld' in their codeHeader
    var sprite = this.ide.currentSprite,
        blocks = this.ide.stage.globalBlocks.filter(
            function (block) {
                return block.codeHeader === 'microworld';
            }
        );

    blocks.forEach(function (block) {
        sprite.blocksCache['microworld'].push(block.templateInstance());
    });

    // sprite.refreshMicroWorldPalette();
};

MicroWorld.prototype.setBlocksScale = function (zoom) {
    // !!! EXPERIMENTAL !!! sets blocks scale without reloading the project
    SyntaxElementMorph.prototype.oldScale = SyntaxElementMorph.prototype.scale;
    SyntaxElementMorph.prototype.setScale(zoom);
    CommentMorph.prototype.refreshScale();
    this.ide.sprites.asArray().concat([ this.ide.stage ]).forEach(
        function (each) {
            each.blocksCache = {};
            each.paletteCache = {}
            each.scripts.forAllChildren(function (child) {
                if (child.setScale) {
                    child.setScale(zoom);
                    child.changed();
                    child.fixLayout();
                } else if (child.fontSize) {
                    child.fontSize = 10 * zoom;
                    child.changed();
                } else if (child instanceof SymbolMorph) {
                    child.size = zoom * 12;
                    child.changed();
                }
            });
        }
    );
};

MicroWorld.prototype.makeButtons = function () {
    var ide = this.ide,
        sprite = ide.currentSprite,
        sf = sprite.scripts.parentThatIsA(ScrollFrameMorph),
        myself = this;

    if (!sprite.buttons) {
        sprite.buttons = [];
    }

    this.buttons['scripts'].forEach(
        function (definition) {
            if (!sf.toolBar.children.find(
                function (child) {
                    return child.labelString == definition.label;
                }
            )) {
                var button = myself.makeButton(definition);
                sf.toolBar.add(button);
                sprite.buttons[definition.label] = button;
            }
        }
    );

    sf.toolBar.fixLayout();

    if (this.buttons['corral'].length > 0) {
        if (!ide.corralButtonsFrame) { this.createCorralButtonsFrame(); }
        this.buttons['corral'].forEach(
            function (definition) {
                var button = myself.makeButton(definition);
                if (!contains(ide.corralButtonsFrame.contents.children, button))
                {
                    ide.corralButtonsFrame.addContents(button);
                    sprite.buttons[definition.label] = button;
                }
            }
        );
    }

};

MicroWorld.prototype.createCorralButtonsFrame = function () {
    var ide = this.ide,
        sprite = ide.currentSprite;
    ide.corralButtonsFrame =
        new ScrollFrameMorph(null, null, sprite.sliderColor);
    ide.corralButtonsFrame.setColor(sprite.paletteColor);
    ide.add(ide.corralButtonsFrame);
    ide.corralButtonsFrame.fixLayout = function () {
        var padding = 5,
            x = ide.corralButtonsFrame.left() + padding;
        y = ide.corralButtonsFrame.top() + padding;
        ide.corralButtonsFrame.contents.children.forEach(function (button) {
            if ((x + button.width()) >
                (ide.corralButtonsFrame.right() - padding)) {
                x = ide.corralButtonsFrame.left() + padding;
                y += button.height() + padding;
            }
            button.setLeft(x);
            button.setTop(y);
            x += button.width() + padding;
        });
    };
};

MicroWorld.prototype.makeButton = function (definition) {
    var sprite = this.ide.currentSprite,
        currentLang = SnapTranslator.language,
        label =
            !isNil(definition.translations) &&
            (contains(Object.keys(definition.translations), currentLang)) ?
                definition.translations[currentLang] :
                definition.label;
    return new PushButtonMorph(
        sprite,
        Function.apply(
            null,
            [ definition.action ]
        ),
        label
    );
};

MicroWorld.prototype.setupMenu = function (menuSelector, menu) {
    // Only keep the items whose label is included in the `menuSelector` array
    // can't use Array >> filter because we may also want to reorder items
    var items = [];
    this[menuSelector].forEach(
        function (itemLabel) {
            var item = menu.items.find(
                function (each) {
                    return each[0].toString() ===
                        SnapTranslator.translate(itemLabel);
                }
            );
            if (item) {
                items.push(item);
            }
        }
    );
    menu.items = items;
};

MicroWorld.prototype.hideAllMorphs = function () {
    var myself = this;
    this.hiddenMorphs.forEach(
        function (selector) {
            myself.hideMorph(selector);
        }
    );
};

MicroWorld.prototype.hideMorph = function (morphSelector) {
    // given (i.e.) 'categoryList', calls this.hideCategoryList()
    var selector =
        'hide' + morphSelector[0].toUpperCase() + morphSelector.slice(1);
    if (this[selector]) {
        this[selector]();
    }
};

MicroWorld.prototype.showMorph = function (morphSelector) {
    // given (i.e.) 'categoryList', calls this.showCategoryList()
    var selector =
        'show' + morphSelector[0].toUpperCase() + morphSelector.slice(1);
    if (this[selector]) {
        this[selector]();
    }
};

MicroWorld.prototype.hideCategoryList = function () {
    var ide = this.ide,
        sprite = this.sprite;

    // hide categories
    ide.categories.hide();
    if (ide.categories.height() > 0) {
        ide.categoriesHeight = ide.categories.height();
    }
    ide.categories.setHeight(0);

    // resize palette to take up all vertical space
    ide.palette.setTop(ide.categories.top());
    ide.palette.setHeight(ide.height() - ide.controlBar.height());

    // adjust palette handle position
    if (!ide.paletteHandle.oldFixLayout) {
        ide.paletteHandle.oldFixLayout = ide.paletteHandle.fixLayout;
    }

    ide.paletteHandle.fixLayout = function () {
        if (!this.target) {
            return;
        }
        this.setCenter(ide.palette.center());
        this.setRight(ide.palette.right());
        if (ide) { ide.add(this); } // come to front
    };
};

MicroWorld.prototype.showCategoryList = function () {
    this.ide.categories.setHeight(this.ide.categoriesHeight);
    this.ide.categories.show();
    this.ide.paletteHandle.fixLayout = this.ide.paletteHandle.oldFixLayout;
};

MicroWorld.prototype.hideMakeBlockButtons = function () {
    this.hidePaletteButtons('makeBlock');
};

MicroWorld.prototype.hideSearchButton = function () {
    this.hidePaletteButtons('searchBlocks');
    this.suppressKeyEvent('ctrl f');
};

MicroWorld.prototype.hidePaletteButtons = function (selector) {
    this[selector + 'Buttons'] =
        this.ide.palette.allChildren().filter(
            function (morph) {
                return morph.action == selector;
            }
        );
    this[selector + 'Buttons'].forEach(
        function (each) {
            each.hide();
        }
    );
}

MicroWorld.prototype.hideSteppingButton = function () {
    this.ide.controlBar['steppingButton'].hide();
};

MicroWorld.prototype.hideStartButton = function () {
    this.ide.controlBar['startButton'].hide();
};

MicroWorld.prototype.hidePauseButton = function () {
    this.ide.controlBar['pauseButton'].hide();
};

MicroWorld.prototype.showSteppingButton = function () {
    this.ide.controlBar['steppingButton'].show();
};

MicroWorld.prototype.showStartButton = function () {
    this.ide.controlBar['startButton'].show();
};

MicroWorld.prototype.showPauseButton = function () {
    this.ide.controlBar['pauseButton'].show();
};

MicroWorld.prototype.hideSpriteBar = function () {
    // hide tab bar and sprite properties panel
    this.ide.spriteBar.hide();
    this.ide.spriteBar.hide();
    this.ide.spriteBar.tabBar.hide();
};

MicroWorld.prototype.showSpriteBar = function () {
    this.ide.spriteBar.show();
    this.ide.spriteBar.tabBar.show();
};

MicroWorld.prototype.hideSpriteCorral = function () {
    var myself = this;

    // hide corral and corral bar
    this.ide.corral.hide();
    this.ide.corralBar.hide();

    // prevent switching to a sprite on stage by double clicking on it
    if (!SpriteMorph.prototype.oldMouseDoubleClick) {
        SpriteMorph.prototype.oldMouseDoubleClick =
            SpriteMorph.prototype.mouseDoubleClick;
        SpriteMorph.prototype.mouseDoubleClick = function () {
            if (!myself.isActive) {
                this.oldMouseDoubleClick();
            }
        }
    }
};

MicroWorld.prototype.showSpriteCorral = function () {
    this.ide.corral.show();
    this.ide.corralBar.show();
};

MicroWorld.prototype.suppressKeyEvent = function(key){
    this.suppressedKeyEvents.push(key);
}
