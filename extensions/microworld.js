var ide = world.children.find(child => {
        return child instanceof IDE_Morph;
    }),
    prefix = 'mw_';

function doIfMicroworld(cb){
    if(ide.stage.microworld){
        cb(ide.stage.microworld);
    }
    else {
        throw new Error("No microworld loaded! Make sure to run primitive "+prefix+"load");
    }
}

SnapExtensions.primitives.set(
    prefix+'get_specs_from_blocks(blocks)',
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
        doIfMicroworld(microworld => {
            microworld.enter();
        })
    }
)

SnapExtensions.primitives.set(
    prefix+'escape',
    () => {
        doIfMicroworld(microworld => {
            microworld.escape();
        })
    }
)

SnapExtensions.primitives.set(
    prefix+'load',
    () => {
        if(!ide.stage.microworld){
            ide.stage.microworld = new MicroWorld(ide);
        }
        var microworld = ide.stage.microworld;

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

SnapExtensions.primitives.set(
    prefix+'set_block_specs(specs)',
    (specs) => {
        doIfMicroworld(microworld => {
            microworld.setBlockSpecs(specs);
        });
    }

)

SnapExtensions.primitives.set(
    prefix+'set_hidden_morphs(morphs)',
    morphs => {
        doIfMicroworld(microworld => {
            microworld.setHiddenMorphs(morphs);
        })
    }
)

SnapExtensions.primitives.set(
    prefix+'set_menu_items(menu,items)',
    (menu, items) => {
        doIfMicroworld(microworld => {
            microworld.setMenuItems(menu, items);
        })
    }
)

SnapExtensions.primitives.set(
    prefix+'set_zoom(zoom)',
    (zoom) => {
        zoom = parseFloat(zoom);
        doIfMicroworld(microworld => {
            if(microworld.zoom === zoom){
                return;
            }
            microworld.zoom = zoom;
            microworld.setZoom(zoom);
        })
    }
)

SnapExtensions.primitives.set(
    prefix+'set_enable_keyboard(enable)',
    enableKeyboard => {
        doIfMicroworld(microworld => {
            microworld.enableKeyboard = enableKeyboard;
            microworld.setKeyboard(enableKeyboard);
        })

    }
)


function MicroWorld (ide) {
    this.init(ide);
}

MicroWorld.prototype.setBlockSpecs = function(specs){
    this.blockSpecs = specs.contents;

    if(this.isActive){
        this.loadSpecs();
    }

}

MicroWorld.prototype.setHiddenMorphs = function(morphs){
    var oldIsLoading = this.isLoading;
    if(this.isActive){
        this.isLoading = true;
        this.showAllMorphs();
        this.isLoading = oldIsLoading;
    }
    if(!morphs){
        this.hiddenMorphs = [];
    }
    else{
        this.hiddenMorphs = (morphs).split(",").map(item => item.trim());
    }

    if(this.isActive){
        this.hideAllMorphs();
    }
}

MicroWorld.prototype.setMenuItems = function(menu, items){
    this.menus[menu] = (items).split(",").map(item => item.trim());
}

MicroWorld.prototype.setZoom = function(zoom){
    if(this.isActive){
        this.setBlocksScale(zoom);
        this.refreshLayouts();
    }
}


MicroWorld.prototype.setKeyboard = function(keyboard){
    ScriptsMorph.prototype.enableKeyboard = keyboard;
    if(this.isActive){
        this.ide.currentSprite.scripts.updateToolbar();
    }
}

MicroWorld.prototype.init = function (ide) {
    this.ide = ide;
    this.hiddenMorphs = [];
    this.blockSpecs = [];

    this.menus = {
        projectMenu: [],
        blockContextMenu: []
    }

    this.buttons = {
        'scripts': [],
        'palette': [],
        'corral': []
    };
    this.enableKeyboard = true;
    // this.simpleBlockDialog = false;
    this.zoom = 1;
    this.uneditableBlocks = false;
    this.isLoading = false;
    this.isActive = false;
    this.suppressedKeyEvents = [];

    // backup settings for exiting microworld
    this.oldCategory = null;
    this.oldHiddenPrimitives = {};
};


MicroWorld.prototype.enter = function () {
    if(this.isActive){
        return;
    }
    var ide = this.ide,
        myself = this;

    this.isActive = true;
    this.isLoading = true;

    ide.savingPreferences = false;

    this.setKeyboard(this.enableKeyboard);

    if(this.zoom !== (parseFloat(ide.getSetting('zoom')) || 1)){
        this.setZoom(this.zoom);
    }

    // if (this.simpleBlockDialog) {
    //     // Never launch in expanded form
    //     InputSlotDialogMorph.prototype.isLaunchingExpanded = false;
    // }

    if (ide.corralButtonsFrame) {
        ide.corralButtonsFrame.destroy();
        ide.corralButtonsFrame = null;
    }

    this.createPalette();

    this.makeButtons();

    this.hideAllMorphs();

    this.updateGetInputFunction();
    this.updateKeyFireFunction();

    // intercept menus
    this.changeMenu(IDE_Morph.prototype, 'projectMenu', 'projectMenu', true);
    this.changeMenu(BlockMorph.prototype, 'userMenu', 'blockContextMenu', false);

    this.isLoading = false;

    this.refreshLayouts();

};

MicroWorld.prototype.escape = function () {
    if(!this.isActive){
        return;
    }
    var ide = this.ide,
        myself = this;

    this.isLoading = true;

    this.setKeyboard(!(ide.getSetting('keyboard') === false));

    this.setZoom(ide.getSetting('zoom') || 1);

    if (ide.corralButtonsFrame) {
        ide.corralButtonsFrame.destroy();
        ide.corralButtonsFrame = null;
    }

    this.showAllMorphs();

    ide.savingPreferences = true;

    this.restorePalette();

    this.isActive = false;
    this.isLoading = false;

    this.refreshLayouts();
};

MicroWorld.prototype.updateGetInputFunction = function() {
    var myself = this;
    if(!BlockDialogMorph.prototype.oldGetInput){
        BlockDialogMorph.prototype.oldGetInput = BlockDialogMorph.prototype.getInput;
        BlockDialogMorph.prototype.getInput = function() {
            if(!myself.isActive){
                return this.oldGetInput();
            }
            var def = this.oldGetInput();
            def.codeHeader = 'microworld';
            return def;
        }
    }
}

MicroWorld.prototype.updateKeyFireFunction = function(){
    var myself = this;
    if(!StageMorph.prototype.oldFireKeyEvent) {
        StageMorph.prototype.oldFireKeyEvent = StageMorph.prototype.fireKeyEvent;

        StageMorph.prototype.fireKeyEvent = function(key){
            if(myself.isActive && myself.suppressedKeyEvents.indexOf(key) > -1){
                return;
            }
            return this.oldFireKeyEvent(key);
        }

    }
}

/**
 * Intercepts the function that creates a menu to limit the options for the MicroWorld
 * @param prototype Prototype where the function to intercept is defined
 * @param functionName The function to intercept
 * @param menuSelector The property on the MicroWorld that contains the menu selectors to show
 * @param changeAfterOpen true if we want to modify the menu after it's created in the world; false if we want to modify the menu and return it
 */
MicroWorld.prototype.changeMenu = function(prototype, functionName, menuSelector, changeAfterOpen) {
    var myself = this,
        oldFunctionName = 'mwOld' + functionName[0].toUpperCase() + functionName.slice(1);

    if(!prototype || !prototype[functionName]) {
        return;
    }

    if(!prototype[oldFunctionName]){
        prototype[oldFunctionName] = prototype[functionName];
        prototype[functionName] = function (){
            var menu = this[oldFunctionName]();
            if(myself.isActive){
                if(changeAfterOpen) {
                    var openMenu = myself.ide.currentSprite.world().activeMenu || null;
                    if(openMenu){
                        myself.setupMenu(menuSelector, openMenu);
                        openMenu.createItems();
                    }
                }
                else{
                    return myself.setupMenu(menuSelector, menu);
                }
            }
            return menu;
        }
    }
}


MicroWorld.prototype.createPalette = function () {
    var ide = this.ide;

    // backup old settings
    this.oldCategory = ide.currentCategory;
    this.oldHiddenPrimitives = Object.assign({},StageMorph.prototype.hiddenPrimitives);

    ide.setUnifiedPalette(true);

    this.loadSpecs();
};


MicroWorld.prototype.updateCustomBlockTemplateFunction = function(){
    var myself = this;
    if(!SpriteMorph.prototype.oldCustomBlockTemplatesForCategory) {
        SpriteMorph.prototype.oldCustomBlockTemplatesForCategory = SpriteMorph.prototype.customBlockTemplatesForCategory;

        SpriteMorph.prototype.customBlockTemplatesForCategory = function(category) {

            if(!myself.isActive){
                return this.oldCustomBlockTemplatesForCategory(category);
            }
            var blocks = this.oldCustomBlockTemplatesForCategory(category)
                .filter(block => {
                    if(block === "="){
                        return false;
                    }
                    if(block.definition && block.definition.codeHeader && block.definition.codeHeader === 'microworld'){
                        return true;
                    }

                    return block.blockSpec && myself.blockSpecs.indexOf(block.blockSpec) > -1;
                })
            return blocks;
        }
    }
}

MicroWorld.prototype.loadSpecs = function (){
    var ide = this.ide;
    this.updateCustomBlockTemplateFunction();
    this.showOnlyRelevantPrimitives();

    if(this.isActive){
        this.refreshLayouts();
    }

}

MicroWorld.prototype.showOnlyRelevantPrimitives = function(){
    // hide primitives
    var defs = SpriteMorph.prototype.blocks;

    StageMorph.prototype.hiddenPrimitives = {};

    Object.keys(defs).forEach(sel => {
        if(this.blockSpecs.indexOf(sel) === -1){
            StageMorph.prototype.hiddenPrimitives[sel] = true;
        }
    });
}

MicroWorld.prototype.restorePalette = function() {
    var myself = this,
        ide = this.ide;

    // restore primitives
    StageMorph.prototype.hiddenPrimitives = Object.assign({}, this.oldHiddenPrimitives);


    // switch out of unified palette, if necessary
    ide.setUnifiedPalette(this.oldCategory === 'unified');
    // restore the previously-selected category
    ide.currentCategory = this.oldCategory;


    ide.categories.fixLayout();
    ide.categories.children.forEach(each =>
        each.refresh()
    );

    this.refreshLayouts();
}

MicroWorld.prototype.refreshLayouts = function() {
    var ide = this.ide;

    if(!this.isLoading){
        ide.fixLayout();
        ide.flushBlocksCache('unified');
        ide.refreshPalette(true);
    }
}

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
    this.menus[menuSelector].forEach(
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
    return menu;
};

MicroWorld.prototype.hideAllMorphs = function () {
    var myself = this;
    this.hiddenMorphs.forEach(
        function (selector) {
            myself.hideMorph(selector);
        }
    );
    this.refreshLayouts();
};

MicroWorld.prototype.showAllMorphs = function () {
    var myself = this;
    this.hiddenMorphs.forEach(
        function (selector) {
            myself.showMorph(selector);
        }
    );
    this.refreshLayouts();
}

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
