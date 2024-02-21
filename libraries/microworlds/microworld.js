// Update 2024-02-13
var ide = world.children.find(child => {
        return child instanceof IDE_Morph;
    }),
    prefix = 'mw_';

function currentMicroworld(){
    return ide.stage.microworld;
}

function doIfMicroworld(cb){
    if(ide.stage.microworld){
        cb(ide.stage.microworld);
    }
    else {
        throw new Error("No microworld loaded! Make sure to run primitive "+prefix+"load");
    }
}

SnapExtensions.primitives.set(
    prefix+'get_spec_from_block(block)',
    (block) => {
        if(!block.expression){
            return "";
        }
        if(block.expression.selector && block.expression.selector !== 'evaluateCustomBlock'){
            return block.expression.selector;
        }
        else if(block.expression.blockSpec) {
            return block.expression.blockSpec;
        }

        return "";

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
    prefix+'is_active?',
    () => {
        var active = false;
        doIfMicroworld(microworld => {
            active = microworld.isActive;
        })
        return active;
    }
)

SnapExtensions.primitives.set(
    prefix+'load',
    () => {
        if(!ide.stage.microworld){
            ide.stage.microworld = new MicroWorld(ide);

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
    }
)

SnapExtensions.primitives.set(
    prefix+'switch_to_sprite(sprite)',
    spriteName => {
        var sprite = ide.sprites.contents.find(eachSprite => eachSprite.name === spriteName);
        if(sprite){
            ide.selectSprite(sprite);
        }
    }
)

SnapExtensions.primitives.set(
    prefix+'set_block_specs(specs)',
    (specs) => {
        if(!specs){
            specs = [];
        }
        else if(specs.constructor === List){
            specs = specs.contents;
        }
        else {
            throw new Error("Expecting List of block specs");
        }
        doIfMicroworld(microworld => {
            microworld.setBlockSpecs(specs);
        });
    }
)

SnapExtensions.primitives.set(
    prefix+'set_editable_blocks(specs)',
    (specs) => {
        if(!specs){
            specs = [];
        }
        else if(specs === 'all'){
            specs = 'all';
        }
        else if(specs.constructor === List){
            specs = specs.contents;
        }
        else {
            throw new Error("Expecting 'all' or List of block specs");
        }
        doIfMicroworld(microworld => {
            microworld.setEditableBlocks(specs);
        })
    }
)

SnapExtensions.primitives.set(
    prefix+'set_broadcast_after_translate(message)',
    (message) => {
        doIfMicroworld(microworld => {
            microworld.setBroadcastAfterTranslate(message);
        })
    }
)

SnapExtensions.primitives.set(
    prefix+'set_loading_screen_after_translate(showLoading)',
    (showLoading) => {
        doIfMicroworld(microworld => {
            microworld.setLoadingScreenAfterTranslate(showLoading)
        })
    }
)

SnapExtensions.primitives.set(
    prefix+'show_loading_screen',
    function() {
        doIfMicroworld(microworld => {
            microworld.showLoadingScreen();
        })
    }
)

SnapExtensions.primitives.set(
    prefix+'hide_loading_screen',
    function() {
        doIfMicroworld(microworld => {
            microworld.hideLoadingScreen();
        })
    }
)
SnapExtensions.primitives.set(
    prefix+'set_button_blocks(specs)',
    (specs) => {
        if(!specs){
            specs = [];
        }
        else if(specs.constructor === List){
            specs = specs.contents;
        }
        else {
            throw new Error("Expecting List of block specs");
        }
        doIfMicroworld(microworld => {
            microworld.setButtonBlocks(specs);
        })
    }
)

SnapExtensions.primitives.set(
    prefix+'set_buttons(location, buttons)',
    (location, buttons) => {
        if(!buttons){
            buttons = [];
        }
        else if(buttons.constructor === List){
            buttons = buttons.contents.map(item => JSON.parse(item));
        }
        else{
            throw new Error("Expecting List of buttons");
        }

        doIfMicroworld(microworld => {
            microworld.setButtons(location, buttons)
        })
    }
)

SnapExtensions.primitives.set(
    prefix+'button_pic(definition)',
    function(definition) {

        function resizeTo(canvas, pct) {
            const cw=canvas.width;
            const ch=canvas.height;
            const tempCanvas = newCanvas();
            const tctx = tempCanvas.getContext("2d");
            tempCanvas.width=cw;
            tempCanvas.height=ch;
            tctx.drawImage(canvas,0,0);
            canvas.width*=pct;
            canvas.height*=pct;
            const ctx=canvas.getContext('2d');
            ctx.drawImage(tempCanvas,0,0,cw,ch,0,0,cw*pct,ch*pct);
        }

        const microworld = currentMicroworld();
        if(microworld) {
            definition = JSON.parse(definition)
            const canvas = microworld.makeButton(definition).fullImage();
            resizeTo(canvas, 10)
            return new Costume(canvas);
        }
    }
)

SnapExtensions.primitives.set(
    prefix+'set_active_buttons(location, labels)',
    (location, labels) => {
        if(!labels){
            labels = [];
        }
        else if(labels.constructor === List){
            labels = labels.contents;
        }
        else{
            throw new Error("Expecting List of button labels");
        }

        doIfMicroworld(microworld => {
            microworld.setActiveButtons(location, labels)
        })
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
    prefix+'set_enable_keyboard(enable)',
    enableKeyboard => {
        doIfMicroworld(microworld => {
            microworld.enableKeyboard = enableKeyboard;
            microworld.setKeyboard(enableKeyboard);
        })

    }
)

SnapExtensions.primitives.set(
    prefix+'set_enable_variables(enable)',
    enableVariables => {
        doIfMicroworld(microworld => {
            microworld.setEnableVariables(enableVariables);
        })
    }
)

// Exposes some of the getters/setters library so we can do this without enabling JS
// Only exposes settings currently used in microworlds
SnapExtensions.primitives.set(
    prefix+'snap_ide_set(param,value)',
    function(which, value) {
        var   stage = this.parentThatIsA(StageMorph),
            ide = stage.parentThatIsA(IDE_Morph),
            world = stage.parentThatIsA(WorldMorph);

        try {
            ide.savingPreferences = false;
            switch (which) {
                case 'Zoom blocks':
                    if (!isNaN(value)) ide.setBlocksScale(Math.min(value, 12));
                    break;
                case 'Stage size':
                    if ((value instanceof List) && value.length()==2
                        && !isNaN(value.at(1)) && !isNaN(value.at(2)))
                        ide.setStageExtent(new Point(value.at(1), value.at(2)));
                    break;
                case 'Stage scale':
                    ide.toggleStageSize(value != 1, Math.max(0.1, value));
                    break;
                case 'Presentation mode':
                    if (value != ide.isAppMode) ide.toggleAppMode();
                    break;

            };
        }
        finally {ide.savingPreferences = true;
        };
    }
)


// for backwards compatability
SnapExtensions.primitives.set(
    prefix+'set_ide_lang(langCode,message,payload)',
    function(langCode, message, payload,loadingScreen) {
        if(currentMicroworld()) {
            currentMicroworld().changeLanguage(langCode,message,payload,false);
        }
    }
)

SnapExtensions.primitives.set(
    prefix+'set_ide_lang(langCode,message,payload,loadingScreen)',
    function(langCode, message, payload,loadingScreen) {
        if(currentMicroworld()) {
            currentMicroworld().changeLanguage(langCode,message,payload,loadingScreen);
        }
    }
)

SnapExtensions.primitives.set(
    prefix+'do_define_block(upvar, label, context)',
    function(upvar, label, context, proc) {
        doIfMicroworld(microworld => {
            microworld.doDefineBlock(upvar, label, context, proc)
        })
    }
)

function MicroWorld (ide) {
    this.init(ide);
}

MicroWorld.prototype.setBlockSpecs = function(specs){
    this.blockSpecs = specs;
    if(this.isActive){
        this.loadSpecs();
    }

}

MicroWorld.prototype.setEditableBlocks = function(specs){
    this.editableBlocks = specs;
}

MicroWorld.prototype.setBroadcastAfterTranslate = function(message) {
    this.broadcastAfterTranslate = message;
}

MicroWorld.prototype.setLoadingScreenAfterTranslate = function(showLoading) {
    this.loadingScreenAfterTranslate = true;
}

MicroWorld.prototype.setButtonBlocks = function(specs){
    this.buttonBlocks = specs;
    if(this.isActive){
        this.blocksToButtons(true);
        this.blocksToButtons();
    }
}

MicroWorld.prototype.setEnableVariables = function(enableVariables){
    this.enableVariables = enableVariables;
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

MicroWorld.prototype.setButtons = function(location, buttons){
    if(this.isActive){
        this.destroyButtons();
    }
    this.buttonAreas[location].buttons = buttons;
    if(this.isActive){
        this.makeButtons();
        this.refreshLayouts();
    }
}

MicroWorld.prototype.setActiveButtons = function(location, labels) {
    if(this.isActive) {
        this.destroyButtons();
    }
    this.buttonAreas[location].active = labels;
    if(this.isActive){
        this.makeButtons();
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
    this.hiddenPaletteActions = [];
    this.blockSpecs = [];

    this.enableVariables = true;

    this.menus = {
        projectMenu: ['notes...', '0', 'New', 'Open...', 'Save', 'Save as...', 'Restore unsaved project', 'Clear backup', '0', 'Import...', 'Export project...', 'Export blocks...', 'Unused blocks...', 'Export summary', 'Export summary with drop-shadows', 'Export all sprites as pic...', '0', 'Scenes...', 'New scene', 'Add scene...', '0', 'Libraries', 'Costumes', 'Backgrounds', 'Sounds...', 'Undelete sprites'],
        blockContextMenu: ['help...', '0', 'rename...', 'rename all...', 'inherited', 'transient', 'hide', '0', 'header mapping...', 'code mapping...', 'relabel...', 'compile', 'uncompile', 'duplicate', 'duplicate single block', 'extract', 'delete', 'add comment', 'script pic...', 'result pic...', 'download script', '0','unringify', 'ringify', '0','senders...','receivers...',],
        paletteContextMenu: ['find blocks...', 'hide primitives', 'show primitives', 'make a category...', 'delete a category...'],
        scriptsContextMenu: ['undrop', 'redrop', '0', 'clean up', 'add comment', 'scripts pic...', '0',  'inherited', 'make a block...'],
        stageContextMenu: ['edit', 'show all', 'pic...', '0', 'pen trails', 'svg...'],
        spriteContextMenu: ['duplicate', 'clone', '0', 'delete', 'move', 'rotate', 'pivot', 'edit', 'detatch all parts', 'export...'],
        settingsMenu: ['Language...', 'Zoom blocks...', 'Fade blocks', 'Stage size...', 'Dragging threshold...', 'Microphone resolution...', 'JavaScript extensions', 'Extension blocks', 'Retina display support', 'Input sliders', 'Turbo mode', 'Visible stepping', 'Log pen vectors', 'Ternary Boolean slots', 'Camera support', 'Blurred shadows', 'Zebra coloring', 'Dynamic input labels', 'Prefer empty slot drops', 'Long form input dialog', 'Plain prototype labels', 'Clicking sound', 'Animations', 'Rasterize SVGs', 'Flat design', 'Nested auto-wrapping', 'Sprite Nesting', 'First-Class Sprites', 'Keyboard Editing', 'Table support', 'Table lines', 'Live coding support', 'JIT compiler support', 'Thread safe scripts', 'Flat line ends', 'Codification support', 'Inheritance support', 'Hyper blocks support', 'Single palette', 'Show categories', 'Show buttons', 'Persist linked sublist IDs', 'Enable command drops in all rings', 'HSL pen color model', 'Disable click-to-run', 'Disable dragging data'],
        languageMenu: Object.keys(MicroWorld.getLanguageList())
    }

    this.buttonBlocks = [];

    this.buttonAreas = {
        'scripts': {
            buttons: [],
            active: []
        },
        'palette': {
            buttons: [],
            active: []
        },
        'corral': {
            buttons: [],
            active: []
        },
        'stage': {
            buttons: [],
            active: []
        }
    };
    this.enableKeyboard = true;
    // this.simpleBlockDialog = false;
    this.editableBlocks = 'all';
    this.isLoading = false;
    this.isActive = false;
    this.suppressedKeyEvents = [];
    this.broadcastAfterTranslate = '';
    this.loadingScreenAfterTranslate = false;

    // backup settings for exiting microworld
    this.oldCategory = null;
    this.oldHiddenPrimitives = {};

    this.ignoreSerializeOverride = false;
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
    this.updateSerializeFunction();
    this.updateLoadFunctions();
    this.updateFreshPaletteFunction();

    this.addBeButtonFunction();

    function addEditingBlocks(items, oldItems, block){
        var editItems = ['0','delete block definition...', 'duplicate block definition...','edit...']
            .map(label => myself.findMenuItem(oldItems, label))
            .filter(item => !!item);

        if((block.definition && block.definition.codeHeader && block.definition.codeHeader === 'microworld') || myself.editableBlocks === 'all' || (Array.isArray(myself.editableBlocks) && myself.editableBlocks.indexOf(block.blockSpec) > -1)){
            items = items.concat(editItems);
        }

        return items;
    }

    const updateTranslateMenu = (items, oldItems) => {
        items.forEach(item => {
            const languageList = MicroWorld.getLanguageList();

            const languageLabel = item[0][1],
                languageCode = languageList[languageLabel];

            item[1] = () => {

                this.changeLanguage(languageCode, this.broadcastAfterTranslate, null, this.loadingScreenAfterTranslate);

            }


        })

        return items;
    }

    // intercept menus
    this.changeMenu(IDE_Morph.prototype, 'projectMenu', 'projectMenu', true);
    this.changeMenu(IDE_Morph.prototype, 'settingsMenu', 'settingsMenu', true);
    this.changeMenu(IDE_Morph.prototype, 'languageMenu', 'languageMenu', true, updateTranslateMenu);
    this.changeMenu(BlockMorph.prototype, 'userMenu', 'blockContextMenu', false);
    this.changeMenu(ScriptsMorph.prototype, 'userMenu','scriptsContextMenu', false);
    this.changeMenu(StageMorph.prototype, 'userMenu','stageContextMenu', false);
    this.changeMenu(SpriteMorph.prototype, 'userMenu','spriteContextMenu', false);

    this.changeMenu(CustomCommandBlockMorph.prototype, 'userMenu', 'blockContextMenu', false, addEditingBlocks)
    this.changeMenu(CustomReporterBlockMorph.prototype, 'userMenu', 'blockContextMenu', false, addEditingBlocks)

    this.blocksToButtons();

    this.isLoading = false;
    this.refreshLayouts();

    this.hideLoadingScreen();

};

MicroWorld.prototype.showLoadingScreen = function() {
    // make sure there's only one loading screen
    if(!this.getLoadingScreen()) {
        let rect = new BoxMorph(),
        world = this.ide.world();
        rect.setWidth(world.width());
        rect.setHeight(world.height());
        rect.setColor(new Color(0,0,0));
        rect.microworldLoadingScreen = true;
        world.add(rect);
        this.ide.fixLayout();
        this.ide.showMessage('Loading')
    }
}

MicroWorld.prototype.getLoadingScreen = function() {
    return this.ide.world().children.find(child => child.microworldLoadingScreen);
}

MicroWorld.prototype.hideLoadingScreen = function() {
    const screen = this.getLoadingScreen();
    if(screen) {
        screen.destroy();
        this.ide.showMessage()
    }
}

MicroWorld.prototype.changeLanguage = function(languageCode, message, payload, loadingScreen) {
    var ide = this.ide,
        flag = ide.isAppMode;

    if(!message){
        message = '';
    } else if (Array.isArray(message)) {
        message = message[0];
    }

    const languages = MicroWorld.getLanguageList();

    let match = false;

    for(let language in languages) {
        if(languages[language] === languageCode) {
            match = true;
        }
    }

    if(!match) {
        throw new Error("Cannot find language "+languageCode+".")
    }

    var restoreMode = () => {
            ide.toggleAppMode(flag);
            ide.stage.fireUserEditEvent(
                ide.currentSprite.name,
                ['project', 'language', languageCode],
                ide.version
            );
        },
        callback;

    ide.loadNewProject = false;



    callback = () => {
        if(loadingScreen) {
            this.showLoadingScreen();
        }
        // for some reason this works better with a time delay
        setTimeout(() => {
            restoreMode();
            ide.broadcast(message, null, payload);
        }, 100)
    };

    ide.setLanguage(languageCode, callback, true); // don't save language setting
}

MicroWorld.prototype.escape = function () {
    if(!this.isActive){
        return;
    }
    var ide = this.ide,
        myself = this;

    this.isLoading = true;

    this.setKeyboard(!(ide.getSetting('keyboard') === false));

    if (ide.corralButtonsFrame) {
        ide.corralButtonsFrame.destroy();
        ide.corralButtonsFrame = null;
    }

    this.showAllMorphs();

    this.destroyButtons();

    ide.savingPreferences = true;

    this.blocksToButtons(true);


    this.restorePalette();

    this.isActive = false;
    this.isLoading = false;

    this.refreshLayouts();
};

MicroWorld.prototype.blocksToButtons = function(undo) {
    var ide = this.ide,
        sprites;

    if(this.hiddenMorphs.includes('spriteCorral')){
        sprites = [ide.currentSprite];
    }
    else{
        sprites = Array.from(ide.sprites.contents)
        sprites.push(ide.stage);
    }

    sprites.forEach(sprite => {
        if(sprite.scripts && sprite.scripts.children){
            sprite.scripts.children.forEach(block => {
                if(block instanceof CustomCommandBlockMorph){
                    if(undo){
                        block.beButton(false);
                    }
                    else if(this.buttonBlocks.includes(block.blockSpec)){
                        block.beButton();
                    }
                }
            })
        }
    })
}

MicroWorld.prototype.updateLoadFunctions = function() {

    if(!IDE_Morph.prototype.oldRawOpenProjectString) {
        IDE_Morph.prototype.oldRawOpenProjectString = IDE_Morph.prototype.rawOpenProjectString;
        IDE_Morph.prototype.rawOpenProjectString = function(str) {
            if(currentMicroworld() && currentMicroworld().isActive){
                currentMicroworld().escape();
            }
            this.oldRawOpenProjectString(str);
        }
    }

    if(!IDE_Morph.prototype.oldRawOpenCloudDataString) {
        IDE_Morph.prototype.oldRawOpenCloudDataString = IDE_Morph.prototype.rawOpenCloudDataString;
        IDE_Morph.prototype.rawOpenCloudDataString = function(str) {
            if(currentMicroworld() && currentMicroworld().isActive){
                currentMicroworld().escape();
            }
            this.oldRawOpenCloudDataString(str);
        }
    }


}



MicroWorld.prototype.updateSerializeFunction = function() {


    // disable this when refreshing the IDE to avoid lags on UI interactions
    function ignoreSerializeFor(owner, functionName) {
        var oldFunctionName = 'serializerOld' + functionName[0].toUpperCase() + functionName.slice(1);

        if(!owner || !owner.prototype[functionName]) {
            return;
        }

        if(!owner.prototype.hasOwnProperty(oldFunctionName)){
            owner.prototype[oldFunctionName] = owner.prototype[functionName];
            owner.prototype[functionName] = function (...args){
                if(currentMicroworld()) {
                    currentMicroworld().ignoreSerializeOverride = true;
                }
                owner.prototype[oldFunctionName].apply(this, args)
                if(currentMicroworld()) {
                    currentMicroworld().ignoreSerializeOverride = false;
                }

            }
        }
    }

    ignoreSerializeFor(SpriteMorph, "recordUserEdit");






    var ide = this.ide;
    if(!XML_Serializer.prototype.oldSerialize){
        XML_Serializer.prototype.oldSerialize = XML_Serializer.prototype.serialize;
        XML_Serializer.prototype.serialize = function(object, forBlocksLibrary){
            var reenter = false;

            if(currentMicroworld() && currentMicroworld().isActive && !currentMicroworld().ignoreSerializeOverride){
                currentMicroworld().escape();
                reenter = true;
                ide.scene.captureGlobalSettings();
                object = new Project(ide.scenes, ide.scene)
            }
            var str = this.oldSerialize(object, forBlocksLibrary);
            if(reenter){
                currentMicroworld().enter();
                ide.scene.captureGlobalSettings();
            }
            return str;
        }
    }
}

MicroWorld.prototype.updateFreshPaletteFunction = function(){
    var myself = this;
    if(!SpriteMorph.prototype.oldFreshPalette){
        SpriteMorph.prototype.oldFreshPalette = SpriteMorph.prototype.freshPalette;
        StageMorph.prototype.oldFreshPalette = StageMorph.prototype.freshPalette;
    }

    SpriteMorph.prototype.freshPalette = function (category){
        var palette = this.oldFreshPalette(category);

        if(currentMicroworld() && currentMicroworld().isActive){
            palette.allChildren()
                .filter(morph => myself.hiddenPaletteActions.includes(morph.action)) // only get items to hide
                .forEach(morph => {morph.destroy()});

            palette.contents.adjustBounds();

            var unit = SyntaxElementMorph.prototype.fontSize,
                x = 5,
                y = palette.contents.height();

            myself.buttonAreas.palette.buttons.forEach(def => {
                var button = myself.makeButton(def, 'palette');
                y += unit * 0.3;
                button.setPosition(new Point(x, y));
                palette.addContents(button);
                y+= button.height();
            })

        }

        palette.scrollX(palette.padding);
        palette.scrollY(palette.padding);

        return palette;
    }

    StageMorph.prototype.freshPalette = SpriteMorph.prototype.freshPalette;
}

MicroWorld.prototype.updateGetInputFunction = function() {
    if(!BlockDialogMorph.prototype.oldGetInput){
        BlockDialogMorph.prototype.oldGetInput = BlockDialogMorph.prototype.getInput;
        BlockDialogMorph.prototype.getInput = function() {
            if(!currentMicroworld() || !currentMicroworld().isActive){
                return this.oldGetInput();
            }
            var def = this.oldGetInput();
            def.codeHeader = 'microworld';
            return def;
        }
    }
}

MicroWorld.prototype.doDefineBlock = function (upvar, label, context, proc) {
    var rcvr = proc.blockReceiver(),
        ide = rcvr.parentThatIsA(IDE_Morph),
        vars = proc.context.outerContext.variables,
        type = proc.reportTypeOf(context),
        count = 1,
        matches, spec, def;

    proc.assertType(label, 'text');
    label = label.trim();
    if (label === '') {return ''; }
    proc.assertType(context, ['command', 'reporter', 'predicate']);

    // replace upvar self references inside the definition body
    // with "reportThisContext" reporters
    if (context.expression instanceof BlockMorph) {
        proc.compileBlockReferences(context, upvar);
    }

    // identify global custom block matching the specified label
    matches = ide.stage.globalBlocks.filter(def =>{
        return def.blockSpec() === label
    }

    );
    if (matches.length > 1) {
        throw new Error(
            'several block definitions\nalready match this label'
        );
    } else if (matches.length === 1) {
        // update the existing global definition with the context body
        
        def = matches[0];

        if(this.editableBlocks !== 'all' && !this.editableBlocks.includes(label) && def.codeHeader !== 'microworld') {
            throw new Error('You are not allowed to edit this block.\nTry changing the name.')
        }


        proc.doSetBlockAttribute(
            'definition',
            def.blockInstance().reify(),
            context
        );

        // create the reference to the new block
        vars.addVar(upvar);
        vars.setVar(upvar, def.blockInstance().reify());
        return;
    }

    // make a new custom block definition
    def = new CustomBlockDefinition('BYOB'); // haha!
    def.type = type;
    def.category = 'other';
    def.isGlobal = true;
    def.codeHeader = 'microworld';
    def.setBlockDefinition(context);
    def.setBlockLabel(label);
    ide.stage.globalBlocks.push(def);

    // make sure the spec is unique
    spec = def.spec;
    while (rcvr.doubleDefinitionsFor(def).length > 0) {
        count += 1;
        def.spec = spec + ' (' + count + ')';
    }

    // update the IDE
    ide.flushPaletteCache();
    ide.categories.refreshEmpty();
    ide.refreshPalette();
    rcvr.recordUserEdit(
        'palette',
        'custom block',
        def.isGlobal ? 'global' : 'local',
        'new',
        def.abstractBlockSpec()
    );

    // create the reference to the new block
    // vars.addVar(upvar);
    // vars.setVar(upvar, def.blockInstance().reify());


    proc.setVarNamed(upvar, def.blockInstance().reify())
};

MicroWorld.prototype.updateKeyFireFunction = function(){
    if(!StageMorph.prototype.oldFireKeyEvent) {
        StageMorph.prototype.oldFireKeyEvent = StageMorph.prototype.fireKeyEvent;

        StageMorph.prototype.fireKeyEvent = function(key){
            if(currentMicroworld() && currentMicroworld().isActive && currentMicroworld().suppressedKeyEvents.indexOf(key) > -1){
                return;
            }
            return this.oldFireKeyEvent(key);
        }

    }
}

MicroWorld.prototype.addBeButtonFunction = function (){
    if(!CustomCommandBlockMorph.prototype.beButton) {
        CustomCommandBlockMorph.prototype.beButton = function (button = true) {
            if (button) {
                this.buttonBackup = {
                    dent: this.dent,
                    corner: this.corner,
                    inset: this.inset,
                    edge: this.edge,
                    isDraggable: this.isDraggable,
                    attachTargets: this.attachTargets,
                    userMenu: this.userMenu
                }
                this.dent = -1;
                this.corner = 1;
                this.inset = 0;
                this.edge = 1;
                // this.isDraggable = false;
                this.attachTargets = function () {
                    return [];
                };
                this.userMenu = () => new MenuMorph();
            } else if (this.buttonBackup) {
                this.dent = this.buttonBackup.dent;
                this.corner = this.buttonBackup.corner;
                this.inset = this.buttonBackup.inset;
                this.edge = this.buttonBackup.edge;
                this.isDraggable = this.buttonBackup.isDraggable;
                this.attachTargets = this.buttonBackup.attachTargets;
                this.userMenu = this.buttonBackup.userMenu;
            }
        };
    }

    if(!BlockMorph.prototype.oldFixLayout) {
        BlockMorph.prototype.oldFixLayout = BlockMorph.prototype.fixLayout;

        BlockMorph.prototype.fixLayout = function() {


            if(currentMicroworld() && currentMicroworld().isActive && currentMicroworld().buttonBlocks.includes(this.blockSpec)){
                        this.beButton();
                    }

            this.oldFixLayout();

        }

    }
}

/**
 * Intercepts the function that creates a menu to limit the options for the MicroWorld
 * @param owner Object where the function to intercept is defined
 * @param functionName The function to intercept
 * @param menuSelector The property on the MicroWorld that contains the menu selectors to show
 * @param changeAfterOpen true if we want to modify the menu after it's created in the world; false if we want to modify the menu and return it
 * @param extraFunction Additional transformation to apply on the menu after it has been populated by the specified selectors
 */
MicroWorld.prototype.changeMenu = function(owner, functionName, menuSelector, changeAfterOpen, extraFunction) {
    var oldFunctionName = 'mwOld' + functionName[0].toUpperCase() + functionName.slice(1);

    if(!owner || !owner[functionName]) {
        return;
    }

    if(!owner.hasOwnProperty(oldFunctionName)){
        owner[oldFunctionName] = owner[functionName];
        owner[functionName] = function (){
            var returnMenu = owner[oldFunctionName].apply(this),
                menu = returnMenu;

            if(currentMicroworld() && currentMicroworld().isActive){

                if(changeAfterOpen){
                    menu = currentMicroworld().ide.currentSprite.world().activeMenu || null
                }

                var originalItems = menu.items;

                currentMicroworld().setupMenu(menuSelector, menu);
                currentMicroworld().transformMenu(menu, originalItems, extraFunction, this);
                currentMicroworld().cleanMenu(menu);

                if(changeAfterOpen) {
                    if(menu){
                        menu.createItems();
                    }
                }
            }
            return returnMenu;
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
}


MicroWorld.prototype.updateCustomBlockTemplateFunction = function(){
    if(!SpriteMorph.prototype.oldCustomBlockTemplatesForCategory) {
        SpriteMorph.prototype.oldCustomBlockTemplatesForCategory = SpriteMorph.prototype.customBlockTemplatesForCategory;
        StageMorph.prototype.oldCustomBlockTemplatesForCategory = SpriteMorph.prototype.oldCustomBlockTemplatesForCategory;

        SpriteMorph.prototype.customBlockTemplatesForCategory = function(category) {

            if(!currentMicroworld() || !currentMicroworld().isActive){
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

                    return block.blockSpec && currentMicroworld().blockSpecs.indexOf(block.blockSpec) > -1;
                })
            return blocks;
        }

        StageMorph.prototype.customBlockTemplatesForCategory = SpriteMorph.prototype.customBlockTemplatesForCategory;
    }
}

MicroWorld.prototype.updateBlockTemplatesFunction = function() {
    function filterVariables(category){
        var blocks = this.oldBlockTemplates(category);

        if(currentMicroworld() && currentMicroworld().isActive && category === 'variables' && !currentMicroworld().enableVariables){
            blocks = blocks.filter(block => {
                if(block instanceof PushButtonMorph || (block && block.selector && block.selector === 'reportGetVar')){
                    return false;
                }
                return true;
            });
        }

        return blocks;
    }

    if(!SpriteMorph.prototype.oldBlockTemplates){
        SpriteMorph.prototype.oldBlockTemplates = SpriteMorph.prototype.blockTemplates;
        StageMorph.prototype.oldBlockTemplates = StageMorph.prototype.blockTemplates;
        SpriteMorph.prototype.blockTemplates = filterVariables;
        StageMorph.prototype.blockTemplates = filterVariables;
    }
}

MicroWorld.prototype.loadSpecs = function (){
    var ide = this.ide;
    this.updateCustomBlockTemplateFunction();
    this.updateBlockTemplatesFunction();
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

        ide.flushBlocksCache('unified');
        ide.refreshPalette(true);
        ide.fixLayout();

        // since this isn't defined in the prototype, we need to run it each time the palette is refreshed
        this.changeMenu(ide.palette, 'userMenu', 'paletteContextMenu', false);

    }
}


MicroWorld.prototype.makeButtons = function () {
    var ide = this.ide,
        sprite = ide.currentSprite,
        stage = ide.stage,
        sf = sprite.scripts.parentThatIsA(ScrollFrameMorph),
        myself = this;

    if (!sprite.buttons) {
        sprite.buttons = [];
    }


    this.buttonAreas['scripts'].buttons.forEach(
        function (definition) {
            if (!sf.toolBar.children.find(
                function (child) {
                    return child.labelString == definition.label;
                }
            )) {
                var button = myself.makeButton(definition, 'scripts');
                sf.toolBar.add(button);
                sprite.buttons[definition.label] = button;
            }
        }
    );

    sf.toolBar.fixLayout();


    if (!ide.corralButtonsFrame) { this.createCorralButtonsFrame(); }

    if (this.buttonAreas['corral'].buttons.length > 0) {
        this.buttonAreas['corral'].buttons.forEach(
            function (definition) {
                var button = myself.makeButton(definition, 'corral');
                if (!contains(ide.corralButtonsFrame.contents.children, button))
                {
                    ide.corralButtonsFrame.addContents(button);
                    sprite.buttons[definition.label] = button;
                }
            }
        );
    }

    if(this.buttonAreas['stage'].buttons.length > 0 ) {
        this.buttonAreas['stage'].buttons.forEach(
            function({definition, appearance}) {
                var button = myself.makeButton(definition, 'stage');

                var oldFix = PushButtonMorph.prototype.fixLayout;

                const oldButton = stage.children.find(item => item.labelString === definition.label);

                if(oldButton) {
                    oldButton.destroy();
                }

                stage.add(button);

                button.fontSize = appearance.fontSize || button.fontSize;

                const originalFontSize = button.fontSize;
                const originalPadding = button.padding;

                button.fixLayout = function() {

                    const x = stage.center().x + (appearance.x * stage.scale),
                        y = stage.center().y - (appearance.y * stage.scale);

                    let offsetTop = 0, offsetLeft = 0;

                    switch(appearance.anchorX) {
                        case 'right':
                            offsetLeft = button.width() * -1 * stage.scale;
                            break;
                        case 'middle':
                            offsetLeft = button.width() / -2 * stage.scale;
                            break;
                    }

                    switch(appearance.anchorY) {
                        case 'bottom':
                            offsetTop = button.height() * -1 * stage.scale;
                            break;
                        case 'middle':
                            offsetTop = button.height() / -2 * stage.scale;
                            break;
                    }


                    button.padding = originalPadding * stage.scale;
                    button.setTop(y + offsetTop);
                    button.setLeft(x + offsetLeft);
                    button.fontSize = originalFontSize * stage.scale;
                    oldFix.apply(button);
                }


                button.fixLayout();
                button.rerender()
            }
        )

        stage.fixLayout();

    }

}

MicroWorld.prototype.destroyButtons = function(){

    var ide = this.ide,
        sprite = ide.currentSprite,
        stage = ide.stage,
        sf = sprite.scripts.parentThatIsA(ScrollFrameMorph);

    if(this.isActive){
        if (ide.corralButtonsFrame) {
            ide.corralButtonsFrame.destroy();
            ide.corralButtonsFrame = null;
        }

        this.buttonAreas['scripts'].buttons.forEach(
            function (definition) {
                var button = sf.toolBar.children.find(
                    function (child) {
                        return child.labelString == definition.label;
                    });

                if(button){
                    sf.toolBar.removeChild(button);
                    delete sprite.buttons[definition.label];
                }
            });

        this.buttonAreas['stage'].buttons.forEach(({definition})=> {
            const button = stage.children.find(child => child.labelString === definition.label);
            if(button) {
                stage.removeChild(button);
            }
        })

    }

}

MicroWorld.prototype.createCorralButtonsFrame = function () {
    var ide = this.ide,
        sprite = ide.currentSprite;
    ide.corralButtonsFrame =
        new ScrollFrameMorph(null, null, sprite.sliderColor);
    ide.corralButtonsFrame.setColor(sprite.paletteColor);
    ide.add(ide.corralButtonsFrame);
    ide.corralButtonsFrame.fixLayout = function () {
        var padding = 5,
            x = ide.corralButtonsFrame.left() + padding,
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

MicroWorld.prototype.makeButton = function (definition, area) {
    var sprite = this.ide.currentSprite,
        label = definition.label;
    const button = new PushButtonMorph(
        sprite,
        () => {
            this.ide.broadcast(definition.message, null, definition.payload || null)
        },
        label
    );

    if(this.buttonAreas[area]?.active.includes(definition.label)) {
        button.color = button.pressColor;
        button.labelShadowColor = new Color(200,200,200);
        button.highlightColor = button.color.lighter(25);
        button.fixLayout();
    }

    return button;
};

MicroWorld.prototype.findMenuItem = function(items, itemLabel){
    if(itemLabel === 'duplicate single block'){
        itemLabel = '[object HTMLCanvasElement]';
    }
    var item = items.find(
        function (each) {
            var label = each[0];
            if(Array.isArray(label)){
                label = label.find(entry => typeof entry === "string")
            }
            return label.toString() ===
                SnapTranslator.translate(itemLabel);
        }
    );
    return item;
}

MicroWorld.prototype.setupMenu = function (menuSelector, menu) {
    // extraFunction(currentMenuItems, originalMenuItems) is an optional parameter that can specify further transformations
    // helpful for dynamically deciding if menu items should be included

    // Only keep the items whose label is included in the `menuSelector` array
    // can't use Array >> filter because we may also want to reorder items
    var items = [];

    this.menus[menuSelector].forEach(
        (itemLabel) => {
            var item = this.findMenuItem(menu.items, itemLabel);
            if (item) {
                items.push(item);
            }
        }
    );

    menu.items = items;

    return menu;
};

MicroWorld.prototype.transformMenu = function (menu, originalItems, extraFunction, caller){

    if(typeof extraFunction === 'function'){
        menu.items = extraFunction(menu.items, originalItems, caller);
    }
    return menu;
}

MicroWorld.prototype.cleanMenu = function(menu){
    // remove multiple dividers in a row
    var lastWasDivider = false,
        items = menu.items.filter(item => {
            if(item[0] === 0){
                if(lastWasDivider){
                    return false;
                }
                lastWasDivider = true;
            }
            else{
                lastWasDivider = false;
            }
            return true;
        });

    if(items.length > 0){
        if(items[items.length - 1][0] === 0){
            items.pop();
        }
        if(items[0] && items[0][0] === 0){
            items.shift();
        }
    }

    menu.items = items;

    return menu;
}


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
    var ide = this.ide

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
    this.hidePaletteButton('makeBlock')
};

MicroWorld.prototype.showMakeBlockButtons = function () {
    this.showPaletteButton('makeBlock');
}

MicroWorld.prototype.hideSearchButton = function () {
    this.hidePaletteButton('searchBlocks');
    this.suppressKeyEvent('ctrl f');
};

MicroWorld.prototype.showSearchButton = function () {
    this.showPaletteButton('searchBlocks');
    this.allowKeyEvent('ctrl f');
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
    var ide = this.ide;

    ide.spriteBar.hide();
    ide.spriteBar.tabBar.hide();

    if(!IDE_Morph.prototype.oldFixLayout){
        IDE_Morph.prototype.oldFixLayout = IDE_Morph.prototype.fixLayout;
    }

    IDE_Morph.prototype.fixLayout = function (situation){
        this.oldFixLayout(situation);

        // spriteEditor (copied from inherited method; doesn't run in 'refreshPalette' situation)
        if (ide.spriteEditor.isVisible) {
            ide.spriteEditor.setPosition(new Point(
                ide.spriteBar.left(),
                ide.spriteBar.bottom() + ide.padding
            ));
            ide.spriteEditor.setExtent(new Point(
                ide.spriteBar.width(),
                ide.bottom() - ide.spriteEditor.top()
            ));
        }

        var spriteEditor = ide.spriteEditor;
        spriteEditor.setTop(spriteEditor.top() - ide.spriteBar.height());
        spriteEditor.setHeight(spriteEditor.height() + ide.spriteBar.height());

        if (this.corralButtonsFrame) {
            this.corralButtonsFrame.setPosition(this.corralBar.position());
            this.corralButtonsFrame.setWidth(this.corralBar.width());
            this.corralButtonsFrame.setHeight(
                this.bottom() - this.corralButtonsFrame.top()
            );
            this.corralButtonsFrame.fixLayout();
        }
    }

};

MicroWorld.prototype.showSpriteBar = function () {
    this.ide.spriteBar.show();
    this.ide.spriteBar.tabBar.show();

    if(IDE_Morph.prototype.oldFixLayout){
        IDE_Morph.prototype.fixLayout = IDE_Morph.prototype.oldFixLayout;
    }

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

MicroWorld.prototype.allowKeyEvent = function(key){
    this.suppressedKeyEvents = this.suppressedKeyEvents.filter(item => item !== key);
}

MicroWorld.prototype.hidePaletteButton = function(action) {
    this.hiddenPaletteActions.push(action);
}

MicroWorld.prototype.showPaletteButton = function(action) {
    this.hiddenPaletteActions = this.hiddenPaletteActions.filter(item => item !== action);
}

MicroWorld.getLanguageList = function() {
    const codes = SnapTranslator.languages();
    const languages = {};

    codes.forEach(code => {
        languages[SnapTranslator.languageName(code)] = code;
    })

    return languages;
}