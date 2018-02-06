/* global SpriteMorph, StageMorph, Color, MorphicPreferences, Morph,
   Point, ScrollFrameMorph, MenuMorph, SyntaxElementMorph, IDE_Morph,
   localize, BlockEditorMorph, BlockDialogMorph, TextMorph, PushButtonMorph,
   MessageFrame, BlockMorph, ToggleMorph, MessageCreatorMorph,
   VariableDialogMorph, SnapCloud, contains, List, CommandBlockMorph,
   MessageType, isNil, RingMorph, SnapActions, RoomEditorMorph, NetsBloxMorph,
   SnapUndo, newCanvas, ReplayControls, WatcherMorph */

SpriteMorph.prototype.categories =
[
    'motion',
    'control',
    'looks',
    'sensing',
    'sound',
    'operators',
    'pen',
    'variables',
    'network',
    'custom',
    'lists',
    'other'
];

SpriteMorph.prototype.blockColor.network = new Color(217, 77, 17);
SpriteMorph.prototype.blockColor.custom = new Color(120, 120, 120);

SpriteMorph.prototype.freshPalette = function (category) {
    var palette = new ScrollFrameMorph(null, null, this.sliderColor),
        unit = SyntaxElementMorph.prototype.fontSize,
        x = 0,
        y = 5,
        ry = 0,
        blocks,
        hideNextSpace = false,
        myself = this,
        stage = this.parentThatIsA(StageMorph),
        oldFlag = Morph.prototype.trackChanges;

    Morph.prototype.trackChanges = false;

    palette.owner = this;
    palette.padding = unit / 2;
    palette.color = this.paletteColor;
    palette.growth = new Point(0, MorphicPreferences.scrollBarSize);

    // menu:

    palette.userMenu = function () {
        var menu = new MenuMorph(),
            ide = this.parentThatIsA(IDE_Morph),
            more = {
                operators:
                    ['reifyScript', 'reifyReporter', 'reifyPredicate'],
                control:
                    ['doWarp'],
                variables:
                [
                    'doDeclareVariables',
                    'reportNewList',
                    'reportCONS',
                    'reportListItem',
                    'reportCDR',
                    'reportListLength',
                    'reportListContainsItem',
                    'doAddToList',
                    'doDeleteFromList',
                    'doInsertInList',
                    'doReplaceInList'
                ]
            };

        function hasHiddenPrimitives() {
            var defs = SpriteMorph.prototype.blocks,
                hiddens = StageMorph.prototype.hiddenPrimitives;
            return Object.keys(hiddens).some(function (any) {
                return !isNil(defs[any]) && (defs[any].category === category
                    || contains((more[category] || []), any));
            });
        }

        function canHidePrimitives() {
            return palette.contents.children.some(function (any) {
                return contains(
                    Object.keys(SpriteMorph.prototype.blocks),
                    any.selector
                );
            });
        }

        menu.addItem('find blocks...', function () {myself.searchBlocks(); });
        if (canHidePrimitives()) {
            menu.addItem(
                'hide primitives',
                function () {
                    var defs = SpriteMorph.prototype.blocks;
                    Object.keys(defs).forEach(function (sel) {
                        if (defs[sel].category === category) {
                            StageMorph.prototype.hiddenPrimitives[sel] = true;
                        }
                    });
                    (more[category] || []).forEach(function (sel) {
                        StageMorph.prototype.hiddenPrimitives[sel] = true;
                    });
                    ide.flushBlocksCache(category);
                    ide.refreshPalette();
                }
            );
        }
        if (hasHiddenPrimitives()) {
            menu.addItem(
                'show primitives',
                function () {
                    var hiddens = StageMorph.prototype.hiddenPrimitives,
                        defs = SpriteMorph.prototype.blocks;
                    Object.keys(hiddens).forEach(function (sel) {
                        if (defs[sel] && (defs[sel].category === category)) {
                            delete StageMorph.prototype.hiddenPrimitives[sel];
                        }
                    });
                    (more[category] || []).forEach(function (sel) {
                        delete StageMorph.prototype.hiddenPrimitives[sel];
                    });
                    ide.flushBlocksCache(category);
                    ide.refreshPalette();
                }
            );
        }

        // Add undo block removal support
        if (SnapUndo.canUndo('palette')) {
            // Get the custom block name
            var len = SnapUndo.eventHistory.palette.length,
                action = SnapUndo.eventHistory.palette[len-1],
                deletedBlock = ide.serializer.parse(action.args[2]);

            menu.addItem(
                'restore "' + deletedBlock.attributes.s + '"',
                function() {
                    SnapUndo.undo('palette');
                });
        }
        return menu;
    };

    // primitives:

    blocks = this.blocksCache[category];
    if (!blocks) {
        blocks = myself.blockTemplates(category);
        if (this.isCachingPrimitives) {
            myself.blocksCache[category] = blocks;
        }
    }

    blocks.forEach(function (block) {
        if (block === null) {
            return;
        }
        if (block === '-') {
            if (hideNextSpace) {return; }
            y += unit * 0.8;
            hideNextSpace = true;
        } else if (block === '=') {
            if (hideNextSpace) {return; }
            y += unit * 1.6;
            hideNextSpace = true;
        } else if (block === '#') {
            x = 0;
            y = ry;
        } else {
            hideNextSpace = false;
            if (x === 0) {
                y += unit * 0.3;
            }
            block.setPosition(new Point(x, y));
            palette.addContents(block);
            if (block instanceof ToggleMorph
                    || (block instanceof RingMorph)) {
                x = block.right() + unit / 2;
                ry = block.bottom();
            } else {
                // if (block.fixLayout) {block.fixLayout(); }
                x = 0;
                y += block.height();
            }
        }
    });

    // global custom blocks:

    // NetsBlox addition: start
    if (category === 'custom') {
        if (stage) {
            y += unit * 1.6;

            stage.globalBlocks.forEach(function (definition) {
                var block = definition.templateInstance();
                y += unit * 0.3;
                block.setPosition(new Point(x, y));
                palette.addContents(block);
                x = 0;
                y += block.height();
            });
        }

        // local custom blocks:

        y += unit * 1.6;
        this.customBlocks.forEach(function (definition) {
            var block = definition.templateInstance();
            y += unit * 0.3;
            block.setPosition(new Point(x, y));
            palette.addContents(block);
            x = 0;
            y += block.height();
        });
    }
    // NetsBlox addition: end

    //layout

    palette.scrollX(palette.padding);
    palette.scrollY(palette.padding);

    Morph.prototype.trackChanges = oldFlag;
    return palette;
};

// Additional block definitions
// RPC's
SpriteMorph.prototype._initBlocks = SpriteMorph.prototype.initBlocks;
SpriteMorph.prototype.initBlocks = function () {
    SpriteMorph.prototype._initBlocks();  // super
    SpriteMorph.prototype.blocks.getJSFromRPC = {  // primitive JSON response
        type: 'reporter',
        category: 'network',
        spec: 'call %s with %s',
        defaults: ['GoogleTrends']
    };

    SpriteMorph.prototype.blocks.getJSFromRPCDropdown = {  // primitive JSON response
        type: 'reporter',
        category: 'network',
        spec: 'call %rpcNames / %rpcActions with %s',
        defaults: ['GoogleTrends']
    };

    SpriteMorph.prototype.blocks.getJSFromRPCStruct = {  // primitive JSON response
        type: 'reporter',
        category: 'network',
        spec: 'call %rpcNames / %rpcMethod',
        defaults: ['GoogleTrends']
    };

    SpriteMorph.prototype.blocks.getCostumeFromRPC = {
        type: 'reporter',
        category: 'network',
        spec: 'costume from %rpcNames / %rpcActions with %s',
        defaults: ['GoogleTrends', '']
    };

    SpriteMorph.prototype.blocks.reportRPCError = {
        type: 'reporter',
        category: 'network',
        spec: 'error'
    };

    // Network Messages
    // request reply
    SpriteMorph.prototype.blocks.doSocketRequest = {
        type: 'reporter',
        category: 'network',
        spec: 'send msg %msgInput to %roles and wait'
    };

    SpriteMorph.prototype.blocks.doSocketResponse = {
        type: 'command',
        category: 'network',
        spec: 'send response %s'
    };

    SpriteMorph.prototype.blocks.doSocketMessage = {
        type: 'command',
        category: 'network',
        spec: 'send msg %msgInput to %roles'
    };

    SpriteMorph.prototype.blocks.receiveSocketMessage = {
        type: 'hat',
        category: 'network',
        spec: 'when I receive %msgOutput'
    };

    // Role Reporters
    SpriteMorph.prototype.blocks.getProjectId = {
        type: 'reporter',
        category: 'network',
        spec: 'role name'
    };

    SpriteMorph.prototype.blocks.getProjectIds = {
        type: 'reporter',
        category: 'network',
        spec: 'all role names'
    };

    // Geo
    SpriteMorph.prototype.blocks.reportLatitude = {
        type: 'reporter',
        category: 'sensing',
        spec: 'my latitude'
    };

    SpriteMorph.prototype.blocks.reportLongitude = {
        type: 'reporter',
        category: 'sensing',
        spec: 'my longitude'
    };

    // Stage info
    SpriteMorph.prototype.blocks.reportStageWidth = {
        type: 'reporter',
        category: 'sensing',
        spec: 'stage width'
    };

    SpriteMorph.prototype.blocks.reportStageHeight = {
        type: 'reporter',
        category: 'sensing',
        spec: 'stage height'
    };

    SpriteMorph.prototype.blocks.reportUsername = {
        type: 'reporter',
        category: 'sensing',
        spec: 'username'
    };

};
SpriteMorph.prototype.initBlocks();

// SpriteMorph project/sead id(s)

SpriteMorph.prototype.getProjectId = function () {
    var ide = this.parentThatIsA(IDE_Morph);
    return ide.projectName;
};

SpriteMorph.prototype.getProjectIds = function () {
    var ide = this.parentThatIsA(IDE_Morph),
        roles = ide.room.getRoleNames();
    return new List(roles);
};

StageMorph.prototype.getProjectId =
    SpriteMorph.prototype.getProjectId;

StageMorph.prototype.getProjectIds =
    SpriteMorph.prototype.getProjectIds;

// SpriteMorph non-variable watchers

SpriteMorph.prototype.reportUsername = function () {
    return SnapCloud.username || '';
};

StageMorph.prototype.reportUsername =
    SpriteMorph.prototype.reportUsername;

SpriteMorph.prototype._blockForSelector = SpriteMorph.prototype.blockForSelector;  // super
SpriteMorph.prototype.blockForSelector = function(selector, setDefaults) {
    var block = this._blockForSelector(selector, setDefaults);
    if (selector === 'receiveSocketMessage') {  // this hat block is executable (it "unpacks" the msg)
        block.blockSequence = CommandBlockMorph.prototype.blockSequence;
    }
    return block;
};

// Palette
SpriteMorph.prototype.blockTemplates = function (category) {
    var blocks = [], myself = this, varNames, button,
        cat = category || 'motion', txt,
        inheritedVars = this.inheritedVariableNames();

    function block(selector) {
        if (StageMorph.prototype.hiddenPrimitives[selector]) {
            return null;
        }
        var newBlock = SpriteMorph.prototype.blockForSelector(selector, true);
        newBlock.isTemplate = true;
        return newBlock;
    }

    function variableBlock(varName) {
        var newBlock = SpriteMorph.prototype.variableBlock(varName);
        newBlock.isDraggable = false;
        newBlock.isTemplate = true;
        if (contains(inheritedVars, varName)) {
            newBlock.ghost();
        }
        return newBlock;
    }

    function watcherToggle(selector) {
        if (StageMorph.prototype.hiddenPrimitives[selector]) {
            return null;
        }
        var info = SpriteMorph.prototype.blocks[selector];
        return new ToggleMorph(
            'checkbox',
            this,
            function () {
                myself.toggleWatcher(
                    selector,
                    localize(info.spec),
                    myself.blockColor[info.category]
                );
            },
            null,
            function () {
                return myself.showingWatcher(selector);
            },
            null
        );
    }

    function variableWatcherToggle(varName) {
        return new ToggleMorph(
            'checkbox',
            this,
            function () {
                myself.toggleVariableWatcher(varName);
            },
            null,
            function () {
                return myself.showingVariableWatcher(varName);
            },
            null
        );
    }

    function helpMenu() {
        var menu = new MenuMorph(this);
        menu.addItem('help...', 'showHelp');
        return menu;
    }

    function addVar(pair) {
        if (pair) {
            if (myself.isVariableNameInUse(pair[0], pair[1])) {
                myself.inform('that name is already in use');
            } else {
                SnapActions.addVariable(pair[0], pair[1] || myself.id);
            }
        }
    }

    function deleteVar(name) {
        SnapActions.deleteVariable(name, myself.id);
    }

    function addMessageType(desc) {
        var stage = myself.parentThatIsA(StageMorph);

        desc.fields = desc.fields.filter(function(field) {
            return !!field;
        });

        // Check that the message type doesn't already exist
        if (stage.messageTypes.getMsgType(desc.name)) {
            myself.inform('that name is already in use');
        } else {
            SnapActions.addMessageType(desc.name, desc.fields);
        }
    }

    if (cat === 'motion') {

        blocks.push(block('forward'));
        blocks.push(block('turn'));
        blocks.push(block('turnLeft'));
        blocks.push('-');
        blocks.push(block('setHeading'));
        blocks.push(block('doFaceTowards'));
        blocks.push('-');
        blocks.push(block('gotoXY'));
        blocks.push(block('doGotoObject'));
        blocks.push(block('doGlide'));
        blocks.push('-');
        blocks.push(block('changeXPosition'));
        blocks.push(block('setXPosition'));
        blocks.push(block('changeYPosition'));
        blocks.push(block('setYPosition'));
        blocks.push('-');
        blocks.push(block('bounceOffEdge'));
        blocks.push('-');
        blocks.push(watcherToggle('xPosition'));
        blocks.push(block('xPosition'));
        blocks.push(watcherToggle('yPosition'));
        blocks.push(block('yPosition'));
        blocks.push(watcherToggle('direction'));
        blocks.push(block('direction'));

    } else if (cat === 'looks') {

        blocks.push(block('doSwitchToCostume'));
        blocks.push(block('doWearNextCostume'));
        blocks.push(watcherToggle('getCostumeIdx'));
        blocks.push(block('getCostumeIdx'));
        blocks.push('-');
        blocks.push(block('doSayFor'));
        blocks.push(block('bubble'));
        blocks.push(block('doThinkFor'));
        blocks.push(block('doThink'));
        blocks.push('-');
        blocks.push(block('changeEffect'));
        blocks.push(block('setEffect'));
        blocks.push(block('clearEffects'));
        blocks.push('-');
        blocks.push(block('changeScale'));
        blocks.push(block('setScale'));
        blocks.push(watcherToggle('getScale'));
        blocks.push(block('getScale'));
        blocks.push('-');
        blocks.push(block('show'));
        blocks.push(block('hide'));
        blocks.push('-');
        blocks.push(block('comeToFront'));
        blocks.push(block('goBack'));

        // for debugging: ///////////////

        if (this.world().isDevMode) {
            blocks.push('-');
            txt = new TextMorph(localize(
                'development mode \ndebugging primitives:'
            ));
            txt.fontSize = 9;
            txt.setColor(this.paletteTextColor);
            blocks.push(txt);
            blocks.push('-');
            blocks.push(block('reportCostumes'));
            blocks.push('-');
            blocks.push(block('log'));
            blocks.push(block('alert'));
            blocks.push('-');
            blocks.push(block('doScreenshot'));
        }

    /////////////////////////////////

    } else if (cat === 'sound') {

        blocks.push(block('playSound'));
        blocks.push(block('doPlaySoundUntilDone'));
        blocks.push(block('doStopAllSounds'));
        blocks.push('-');
        blocks.push(block('doRest'));
        blocks.push('-');
        blocks.push(block('doPlayNote'));
        blocks.push('-');
        blocks.push(block('doChangeTempo'));
        blocks.push(block('doSetTempo'));
        blocks.push(watcherToggle('getTempo'));
        blocks.push(block('getTempo'));

        // for debugging: ///////////////

        if (this.world().isDevMode) {
            blocks.push('-');
            txt = new TextMorph(localize(
                'development mode \ndebugging primitives:'
            ));
            txt.fontSize = 9;
            txt.setColor(this.paletteTextColor);
            blocks.push(txt);
            blocks.push('-');
            blocks.push(block('reportSounds'));
        }

    } else if (cat === 'pen') {

        blocks.push(block('clear'));
        blocks.push('-');
        blocks.push(block('down'));
        blocks.push(block('up'));
        blocks.push('-');
        blocks.push(block('setColor'));
        blocks.push(block('changeHue'));
        blocks.push(block('setHue'));
        blocks.push('-');
        blocks.push(block('changeBrightness'));
        blocks.push(block('setBrightness'));
        blocks.push('-');
        blocks.push(block('changeSize'));
        blocks.push(block('setSize'));
        blocks.push('-');
        blocks.push(block('doStamp'));

    } else if (cat === 'control') {

        blocks.push(block('receiveGo'));
        blocks.push(block('receiveKey'));
        blocks.push(block('receiveInteraction'));
        blocks.push(block('receiveMessage'));
        blocks.push('-');
        blocks.push(block('doBroadcast'));
        blocks.push(block('doBroadcastAndWait'));
        blocks.push(watcherToggle('getLastMessage'));
        blocks.push(block('getLastMessage'));
        blocks.push('-');
        blocks.push(block('doWarp'));
        blocks.push('-');
        blocks.push(block('doWait'));
        blocks.push(block('doWaitUntil'));
        blocks.push('-');
        blocks.push(block('doForever'));
        blocks.push(block('doRepeat'));
        blocks.push(block('doUntil'));
        blocks.push('-');
        blocks.push(block('doIf'));
        blocks.push(block('doIfElse'));
        blocks.push('-');
        blocks.push(block('doReport'));
        blocks.push('-');
        /*
    // old STOP variants, migrated to a newer version, now redundant
        blocks.push(block('doStopBlock'));
        blocks.push(block('doStop'));
        blocks.push(block('doStopAll'));
    */
        blocks.push(block('doStopThis'));
        blocks.push(block('doStopOthers'));
        blocks.push('-');
        blocks.push(block('doRun'));
        blocks.push(block('fork'));
        blocks.push(block('evaluate'));
        blocks.push('-');
        /*
    // list variants commented out for now (redundant)
        blocks.push(block('doRunWithInputList'));
        blocks.push(block('forkWithInputList'));
        blocks.push(block('evaluateWithInputList'));
        blocks.push('-');
    */
        blocks.push(block('doCallCC'));
        blocks.push(block('reportCallCC'));
        blocks.push('-');
        blocks.push(block('receiveOnClone'));
        blocks.push(block('createClone'));
        blocks.push(block('removeClone'));
        blocks.push('-');
        blocks.push(block('doPauseAll'));

    } else if (cat === 'network') {
        blocks.push(block('receiveSocketMessage'));
        blocks.push(block('doSocketMessage'));
        blocks.push('-');

        blocks.push(block('doSocketRequest'));
        blocks.push(block('doSocketResponse'));
        blocks.push('-');

        blocks.push(block('getJSFromRPCStruct'));
        blocks.push(watcherToggle('reportRPCError'));
        blocks.push(block('reportRPCError'));
        blocks.push('-');
        blocks.push(block('getProjectIds'));
        blocks.push(block('getProjectId'));

        // Add custom message types
        button = new PushButtonMorph(
            null,
            function () {
                new MessageCreatorMorph(
                    myself,
                    addMessageType
                ).popUp();
            },
            'Make a message type'
        );
        blocks.push(button);

        // Add delete message type block
        if (this.deletableMessageNames().length > 0) {
            button = new PushButtonMorph(
                null,
                function () {
                    var menu = new MenuMorph(
                        function(name) {
                            SnapActions.deleteMessageType(name);
                        },
                        null
                    );
                    myself.deletableMessageNames().forEach(function (name) {
                        menu.addItem(name, name);
                    });
                    menu.popUpAtHand(myself.world());
                },
                'Delete a message type'
            );
            button.userMenu = helpMenu;
            button.selector = 'deleteMessageType';
            button.showHelp = BlockMorph.prototype.showHelp;
            blocks.push(button);
        }

    } else if (cat === 'sensing') {

        blocks.push(block('reportTouchingObject'));
        blocks.push(block('reportTouchingColor'));
        blocks.push(block('reportColorIsTouchingColor'));
        blocks.push('-');
        blocks.push(block('doAsk'));
        blocks.push(watcherToggle('getLastAnswer'));
        blocks.push(block('getLastAnswer'));
        blocks.push('-');
        blocks.push(watcherToggle('reportMouseX'));
        blocks.push(block('reportMouseX'));
        blocks.push(watcherToggle('reportMouseY'));
        blocks.push(block('reportMouseY'));
        blocks.push(block('reportMouseDown'));
        blocks.push('-');
        blocks.push(block('reportKeyPressed'));
        blocks.push('-');
        blocks.push(block('reportDistanceTo'));
        blocks.push('-');
        blocks.push(block('doResetTimer'));
        blocks.push(watcherToggle('getTimer'));
        blocks.push(block('getTimer'));
        blocks.push('-');
        blocks.push(block('reportAttributeOf'));
        blocks.push('-');
        blocks.push(block('reportURL'));
        blocks.push('-');
        blocks.push(block('reportIsFastTracking'));
        blocks.push(block('doSetFastTracking'));
        blocks.push('-');
        blocks.push(block('reportDate'));
        blocks.push(block('reportUsername'));
        blocks.push('-');
        blocks.push(block('reportLatitude'));
        blocks.push(block('reportLongitude'));
        blocks.push('-');
        blocks.push(block('reportStageHeight'));
        blocks.push(block('reportStageWidth'));

        // for debugging: ///////////////

        if (this.world().isDevMode) {

            blocks.push('-');
            txt = new TextMorph(localize(
                'development mode \ndebugging primitives:'
            ));
            txt.fontSize = 9;
            txt.setColor(this.paletteTextColor);
            blocks.push(txt);
            blocks.push('-');
            blocks.push(watcherToggle('reportThreadCount'));
            blocks.push(block('reportThreadCount'));
            blocks.push(block('colorFiltered'));
            blocks.push(block('reportStackSize'));
            blocks.push(block('reportFrameCount'));
        }

    } else if (cat === 'operators') {

        blocks.push(block('reifyScript'));
        blocks.push(block('reifyReporter'));
        blocks.push(block('reifyPredicate'));
        blocks.push('#');
        blocks.push('-');
        blocks.push(block('reportSum'));
        blocks.push(block('reportDifference'));
        blocks.push(block('reportProduct'));
        blocks.push(block('reportQuotient'));
        blocks.push('-');
        blocks.push(block('reportModulus'));
        blocks.push(block('reportRound'));
        blocks.push(block('reportMonadic'));
        blocks.push(block('reportRandom'));
        blocks.push('-');
        blocks.push(block('reportLessThan'));
        blocks.push(block('reportEquals'));
        blocks.push(block('reportGreaterThan'));
        blocks.push('-');
        blocks.push(block('reportAnd'));
        blocks.push(block('reportOr'));
        blocks.push(block('reportNot'));
        blocks.push('-');
        blocks.push(block('reportTrue'));
        blocks.push(block('reportFalse'));
        blocks.push('-');
        blocks.push(block('reportJoinWords'));
        blocks.push(block('reportTextSplit'));
        blocks.push(block('reportLetter'));
        blocks.push(block('reportStringSize'));
        blocks.push('-');
        blocks.push(block('reportUnicode'));
        blocks.push(block('reportUnicodeAsLetter'));
        blocks.push('-');
        blocks.push(block('reportIsA'));
        blocks.push(block('reportIsIdentical'));
        blocks.push('-');
        blocks.push(block('reportJSFunction'));

        // for debugging: ///////////////

        if (this.world().isDevMode) {
            blocks.push('-');
            txt = new TextMorph(
                'development mode \ndebugging primitives:'
            );
            txt.fontSize = 9;
            txt.setColor(this.paletteTextColor);
            blocks.push(txt);
            blocks.push('-');
            blocks.push(block('reportTypeOf'));
            blocks.push(block('reportTextFunction'));
        }

    /////////////////////////////////

    } else if (cat === 'variables') {

        button = new PushButtonMorph(
            null,
            function () {
                new VariableDialogMorph(
                    null,
                    addVar,
                    myself
                ).prompt(
                    'Variable name',
                    null,
                    myself.world()
                );
            },
            'Make a variable'
        );
        button.userMenu = helpMenu;
        button.selector = 'addVariable';
        button.showHelp = BlockMorph.prototype.showHelp;
        blocks.push(button);

        if (this.deletableVariableNames().length > 0) {
            button = new PushButtonMorph(
                null,
                function () {
                    var menu = new MenuMorph(
                        deleteVar,
                        null,
                        myself
                    );
                    myself.deletableVariableNames().forEach(function (name) {
                        menu.addItem(name, name);
                    });
                    menu.popUpAtHand(myself.world());
                },
                'Delete a variable'
            );
            button.userMenu = helpMenu;
            button.selector = 'deleteVariable';
            button.showHelp = BlockMorph.prototype.showHelp;
            blocks.push(button);
        }

        blocks.push('-');

        varNames = this.variables.allNames();
        if (varNames.length > 0) {
            varNames.forEach(function (name) {
                blocks.push(variableWatcherToggle(name));
                blocks.push(variableBlock(name));
            });
            blocks.push('-');
        }

        blocks.push(block('doSetVar'));
        blocks.push(block('doChangeVar'));
        blocks.push(block('doShowVar'));
        blocks.push(block('doHideVar'));
        blocks.push(block('doDeclareVariables'));

        // inheritance:

        if (StageMorph.prototype.enableInheritance) {
            blocks.push('-');
            blocks.push(block('doDeleteAttr'));
        }

        ///////////////////////////////

        blocks.push('=');

        blocks.push(block('reportNewList'));
        blocks.push('-');
        blocks.push(block('reportCONS'));
        blocks.push(block('reportListItem'));
        blocks.push(block('reportCDR'));
        blocks.push('-');
        blocks.push(block('reportListLength'));
        blocks.push(block('reportListContainsItem'));
        blocks.push('-');
        blocks.push(block('doAddToList'));
        blocks.push(block('doDeleteFromList'));
        blocks.push(block('doInsertInList'));
        blocks.push(block('doReplaceInList'));

        // for debugging: ///////////////

        if (this.world().isDevMode) {
            blocks.push('-');
            txt = new TextMorph(localize(
                'development mode \ndebugging primitives:'
            ));
            txt.fontSize = 9;
            txt.setColor(this.paletteTextColor);
            blocks.push(txt);
            blocks.push('-');
            blocks.push(block('reportMap'));
            blocks.push('-');
            blocks.push(block('doForEach'));
            blocks.push(block('doShowTable'));
        }

        /////////////////////////////////

        blocks.push('=');

        if (StageMorph.prototype.enableCodeMapping) {
            blocks.push(block('doMapCodeOrHeader'));
            blocks.push(block('doMapStringCode'));
            blocks.push(block('doMapListCode'));
            blocks.push('-');
            blocks.push(block('reportMappedCode'));
            blocks.push('=');
        }

        button = new PushButtonMorph(
            null,
            function () {
                new BlockDialogMorph(
                    null,
                    function (definition) {
                        if (definition.spec !== '') {
                            SnapActions.addCustomBlock(definition, myself)
                                .accept(function(def) {
                                    var editor = new BlockEditorMorph(def, myself);
                                    editor.popUp();
                                });
                        }
                    },
                    myself
                ).prompt(
                    'Make a block',
                    null,
                    myself.world()
                );
            },
            'Make a block'
        );
        button.userMenu = helpMenu;
        button.selector = 'addCustomBlock';
        button.showHelp = BlockMorph.prototype.showHelp;
        blocks.push(button);
    } else if (cat === 'custom') {
        button = new PushButtonMorph(
            null,
            function () {
                new BlockDialogMorph(
                    null,
                    function (definition) {
                        if (definition.spec !== '') {
                            SnapActions.addCustomBlock(definition, myself)
                                .accept(function(def) {
                                    var editor = new BlockEditorMorph(def, myself);
                                    editor.popUp();
                                });
                        }
                    },
                    myself
                ).prompt(
                    'Make a block',
                    null,
                    myself.world()
                );
            },
            'Make a block'
        );
        button.userMenu = helpMenu;
        button.selector = 'addCustomBlock';
        button.showHelp = BlockMorph.prototype.showHelp;
        blocks.push(button);
    }
    return blocks;
};

SpriteMorph.prototype.deletableMessageNames = function() {
    var stage = this.parentThatIsA(StageMorph);
    return stage.deletableMessageNames();
};

StageMorph.prototype.deletableMessageNames = function() {
    return this.messageTypes.names().filter(function(name) {
        return name !== 'message';
    });
};

SpriteMorph.prototype.deleteMessageType = function(name) {
    var ide = this.parentThatIsA(IDE_Morph),
        stage = ide.stage,
        cat = 'network';

    stage.messageTypes.deleteMsgType(name);

    // Refresh message palette if possible in case the user is already on the 'Room' tab
    try {
        ide.room.parentThatIsA(RoomEditorMorph).updateRoom();
        if (ide && ide.currentTab === 'room') {
            ide.spriteBar.tabBar.tabTo('room');
        }
    } catch(e) {
        //do nothing
    }

    ide.flushBlocksCache(cat); // b/c of inheritance
    ide.refreshPalette();
};

StageMorph.prototype.deleteMessageType =
    SpriteMorph.prototype.deleteMessageType;

// StageMorph Overrides
StageMorph.prototype.freshPalette = SpriteMorph.prototype.freshPalette;
StageMorph.prototype._init = StageMorph.prototype.init;
StageMorph.prototype.init = function (globals) {
    this.messageTypes = new MessageFrame();

    this.addMessageType({  // Add initial message type
        name: 'message',
        fields: ['msg']
    });
    this._init(globals);
};

StageMorph.prototype.addMessageType = function (messageType) {
    var msgType,
        name,
        fields;

    name = messageType.name;
    fields = messageType.fields;
    msgType = new MessageType(name, fields);
    this.messageTypes.addMsgType(msgType);

    // Refresh message palette if possible in case the user is already on the 'Room' tab
    try {
        var ide = this.parentThatIsA(NetsBloxMorph);
        ide.room.parentThatIsA(RoomEditorMorph).updateRoom();
        if (ide && ide.currentTab === 'room') {
            ide.spriteBar.tabBar.tabTo('room');
        }
    } catch(e) {
        // do nothing
    }
};

StageMorph.prototype.blockTemplates = function (category) {
    var blocks = [], myself = this, varNames, button,
        cat = category || 'motion', txt;

    function block(selector) {
        if (myself.hiddenPrimitives[selector]) {
            return null;
        }
        var newBlock = SpriteMorph.prototype.blockForSelector(selector, true);
        newBlock.isTemplate = true;
        return newBlock;
    }

    function variableBlock(varName) {
        var newBlock = SpriteMorph.prototype.variableBlock(varName);
        newBlock.isDraggable = false;
        newBlock.isTemplate = true;
        return newBlock;
    }

    function watcherToggle(selector) {
        if (myself.hiddenPrimitives[selector]) {
            return null;
        }
        var info = SpriteMorph.prototype.blocks[selector];
        return new ToggleMorph(
            'checkbox',
            this,
            function () {
                myself.toggleWatcher(
                    selector,
                    localize(info.spec),
                    myself.blockColor[info.category]
                );
            },
            null,
            function () {
                return myself.showingWatcher(selector);
            },
            null
        );
    }

    function variableWatcherToggle(varName) {
        return new ToggleMorph(
            'checkbox',
            this,
            function () {
                myself.toggleVariableWatcher(varName);
            },
            null,
            function () {
                return myself.showingVariableWatcher(varName);
            },
            null
        );
    }

    function addVar(pair) {
        if (pair) {
            if (myself.isVariableNameInUse(pair[0])) {
                myself.inform('that name is already in use');
            } else {
                SnapActions.addVariable(pair[0], pair[1] || myself.id);
            }
        }
    }

    function deleteVar(name) {
        SnapActions.deleteVariable(name, myself.id);
    }

    function addMessageType(desc) {
        var stage = myself.parentThatIsA(StageMorph);

        desc.fields = desc.fields.filter(function(field) {
            return !!field;
        });

        // Check that the message type doesn't already exist
        if (stage.messageTypes.getMsgType(desc.name)) {
            myself.inform('that name is already in use');
        } else {
            SnapActions.addMessageType(desc.name, desc.fields);
        }
    }

    if (cat === 'motion') {

        txt = new TextMorph(localize(
            'Stage selected:\nno motion primitives'
        ));
        txt.fontSize = 9;
        txt.setColor(this.paletteTextColor);
        blocks.push(txt);

    } else if (cat === 'looks') {

        blocks.push(block('doSwitchToCostume'));
        blocks.push(block('doWearNextCostume'));
        blocks.push(watcherToggle('getCostumeIdx'));
        blocks.push(block('getCostumeIdx'));
        blocks.push('-');
        blocks.push(block('changeEffect'));
        blocks.push(block('setEffect'));
        blocks.push(block('clearEffects'));
        blocks.push('-');
        blocks.push(block('show'));
        blocks.push(block('hide'));

        // for debugging: ///////////////

        if (this.world().isDevMode) {
            blocks.push('-');
            txt = new TextMorph(localize(
                'development mode \ndebugging primitives:'
            ));
            txt.fontSize = 9;
            txt.setColor(this.paletteTextColor);
            blocks.push(txt);
            blocks.push('-');
            blocks.push(block('reportCostumes'));
            blocks.push('-');
            blocks.push(block('log'));
            blocks.push(block('alert'));
            blocks.push('-');
            blocks.push(block('doScreenshot'));
        }

    /////////////////////////////////

    } else if (cat === 'sound') {

        blocks.push(block('playSound'));
        blocks.push(block('doPlaySoundUntilDone'));
        blocks.push(block('doStopAllSounds'));
        blocks.push('-');
        blocks.push(block('doRest'));
        blocks.push('-');
        blocks.push(block('doPlayNote'));
        blocks.push('-');
        blocks.push(block('doChangeTempo'));
        blocks.push(block('doSetTempo'));
        blocks.push(watcherToggle('getTempo'));
        blocks.push(block('getTempo'));

        // for debugging: ///////////////

        if (this.world().isDevMode) {
            blocks.push('-');
            txt = new TextMorph(localize(
                'development mode \ndebugging primitives:'
            ));
            txt.fontSize = 9;
            txt.setColor(this.paletteTextColor);
            blocks.push(txt);
            blocks.push('-');
            blocks.push(block('reportSounds'));
        }

    } else if (cat === 'pen') {

        blocks.push(block('clear'));

    } else if (cat === 'network') {
        blocks.push(block('receiveSocketMessage'));
        blocks.push(block('doSocketMessage'));
        blocks.push('-');
        blocks.push(block('doSocketRequest'));
        blocks.push(block('doSocketResponse'));
        blocks.push('-');

        blocks.push(block('getJSFromRPCStruct'));
        blocks.push(watcherToggle('reportRPCError'));
        blocks.push(block('reportRPCError'));
        blocks.push('-');
        blocks.push(block('getProjectIds'));
        blocks.push(block('getProjectId'));

        // Add custom message types
        button = new PushButtonMorph(
            null,
            function () {
                new MessageCreatorMorph(
                    myself,
                    addMessageType
                ).popUp();
            },
            'Make a message type'
        );
        blocks.push(button);

        // Add delete message type block
        if (this.deletableMessageNames().length > 0) {
            button = new PushButtonMorph(
                null,
                function () {
                    var menu = new MenuMorph(
                        function(name) {
                            SnapActions.deleteMessageType(name);
                        },
                        null
                    );
                    myself.deletableMessageNames().forEach(function (name) {
                        menu.addItem(name, name);
                    });
                    menu.popUpAtHand(myself.world());
                },
                'Delete a message type'
            );
            button.selector = 'deleteMessageType';
            button.showHelp = BlockMorph.prototype.showHelp;
            blocks.push(button);
        }

    } else if (cat === 'control') {

        blocks.push(block('receiveGo'));
        blocks.push(block('receiveKey'));
        blocks.push(block('receiveInteraction'));
        blocks.push(block('receiveMessage'));
        blocks.push('-');
        blocks.push(block('doBroadcast'));
        blocks.push(block('doBroadcastAndWait'));
        blocks.push(watcherToggle('getLastMessage'));
        blocks.push(block('getLastMessage'));
        blocks.push('-');
        blocks.push(block('doWarp'));
        blocks.push('-');
        blocks.push(block('doWait'));
        blocks.push(block('doWaitUntil'));
        blocks.push('-');
        blocks.push(block('doForever'));
        blocks.push(block('doRepeat'));
        blocks.push(block('doUntil'));
        blocks.push('-');
        blocks.push(block('doIf'));
        blocks.push(block('doIfElse'));
        blocks.push('-');
        blocks.push(block('doReport'));
        blocks.push('-');
        /*
    // old STOP variants, migrated to a newer version, now redundant
        blocks.push(block('doStopBlock'));
        blocks.push(block('doStop'));
        blocks.push(block('doStopAll'));
    */
        blocks.push(block('doStopThis'));
        blocks.push(block('doStopOthers'));
        blocks.push('-');
        blocks.push(block('doRun'));
        blocks.push(block('fork'));
        blocks.push(block('evaluate'));
        blocks.push('-');
        /*
    // list variants commented out for now (redundant)
        blocks.push(block('doRunWithInputList'));
        blocks.push(block('forkWithInputList'));
        blocks.push(block('evaluateWithInputList'));
        blocks.push('-');
    */
        blocks.push(block('doCallCC'));
        blocks.push(block('reportCallCC'));
        blocks.push('-');
        blocks.push(block('createClone'));
        blocks.push('-');
        blocks.push(block('doPauseAll'));

    } else if (cat === 'sensing') {

        blocks.push(block('doAsk'));
        blocks.push(watcherToggle('getLastAnswer'));
        blocks.push(block('getLastAnswer'));
        blocks.push('-');
        blocks.push(watcherToggle('reportMouseX'));
        blocks.push(block('reportMouseX'));
        blocks.push(watcherToggle('reportMouseY'));
        blocks.push(block('reportMouseY'));
        blocks.push(block('reportMouseDown'));
        blocks.push('-');
        blocks.push(block('reportKeyPressed'));
        blocks.push('-');
        blocks.push(block('doResetTimer'));
        blocks.push(watcherToggle('getTimer'));
        blocks.push(block('getTimer'));
        blocks.push('-');
        blocks.push(block('reportAttributeOf'));
        blocks.push('-');
        blocks.push(block('reportURL'));
        blocks.push('-');
        blocks.push(block('reportIsFastTracking'));
        blocks.push(block('doSetFastTracking'));
        blocks.push('-');
        blocks.push(block('reportDate'));
        blocks.push(block('reportUsername'));
        blocks.push('-');
        blocks.push(block('reportLatitude'));
        blocks.push(block('reportLongitude'));
        blocks.push('-');
        blocks.push(block('reportStageHeight'));
        blocks.push(block('reportStageWidth'));

        // for debugging: ///////////////

        if (this.world().isDevMode) {

            blocks.push('-');
            txt = new TextMorph(localize(
                'development mode \ndebugging primitives:'
            ));
            txt.fontSize = 9;
            txt.setColor(this.paletteTextColor);
            blocks.push(txt);
            blocks.push('-');
            blocks.push(watcherToggle('reportThreadCount'));
            blocks.push(block('reportThreadCount'));
            blocks.push(block('colorFiltered'));
            blocks.push(block('reportStackSize'));
            blocks.push(block('reportFrameCount'));
        }

    /////////////////////////////////

    } else if (cat === 'operators') {

        blocks.push(block('reifyScript'));
        blocks.push(block('reifyReporter'));
        blocks.push(block('reifyPredicate'));
        blocks.push('#');
        blocks.push('-');
        blocks.push(block('reportSum'));
        blocks.push(block('reportDifference'));
        blocks.push(block('reportProduct'));
        blocks.push(block('reportQuotient'));
        blocks.push('-');
        blocks.push(block('reportModulus'));
        blocks.push(block('reportRound'));
        blocks.push(block('reportMonadic'));
        blocks.push(block('reportRandom'));
        blocks.push('-');
        blocks.push(block('reportLessThan'));
        blocks.push(block('reportEquals'));
        blocks.push(block('reportGreaterThan'));
        blocks.push('-');
        blocks.push(block('reportAnd'));
        blocks.push(block('reportOr'));
        blocks.push(block('reportNot'));
        blocks.push('-');
        blocks.push(block('reportTrue'));
        blocks.push(block('reportFalse'));
        blocks.push('-');
        blocks.push(block('reportJoinWords'));
        blocks.push(block('reportTextSplit'));
        blocks.push(block('reportLetter'));
        blocks.push(block('reportStringSize'));
        blocks.push('-');
        blocks.push(block('reportUnicode'));
        blocks.push(block('reportUnicodeAsLetter'));
        blocks.push('-');
        blocks.push(block('reportIsA'));
        blocks.push(block('reportIsIdentical'));
        blocks.push('-');
        blocks.push(block('reportJSFunction'));

        // for debugging: ///////////////

        if (this.world().isDevMode) {
            blocks.push('-');
            txt = new TextMorph(
                'development mode \ndebugging primitives:'
            );
            txt.fontSize = 9;
            txt.setColor(this.paletteTextColor);
            blocks.push(txt);
            blocks.push('-');
            blocks.push(block('reportTypeOf'));
            blocks.push(block('reportTextFunction'));
        }

    //////////////////////////////////

    } else if (cat === 'variables') {

        button = new PushButtonMorph(
            null,
            function () {
                new VariableDialogMorph(
                    null,
                    addVar,
                    myself
                ).prompt(
                    'Variable name',
                    null,
                    myself.world()
                );
            },
            'Make a variable'
        );
        blocks.push(button);

        if (this.variables.allNames().length > 0) {
            button = new PushButtonMorph(
                null,
                function () {
                    var menu = new MenuMorph(
                        deleteVar,
                        null,
                        myself
                    );
                    myself.variables.allNames().forEach(function (name) {
                        menu.addItem(name, name);
                    });
                    menu.popUpAtHand(myself.world());
                },
                'Delete a variable'
            );
            blocks.push(button);
        }

        blocks.push('-');

        varNames = this.variables.allNames();
        if (varNames.length > 0) {
            varNames.forEach(function (name) {
                blocks.push(variableWatcherToggle(name));
                blocks.push(variableBlock(name));
            });
            blocks.push('-');
        }

        blocks.push(block('doSetVar'));
        blocks.push(block('doChangeVar'));
        blocks.push(block('doShowVar'));
        blocks.push(block('doHideVar'));
        blocks.push(block('doDeclareVariables'));
        blocks.push('=');
        blocks.push(block('reportNewList'));
        blocks.push('-');
        blocks.push(block('reportCONS'));
        blocks.push(block('reportListItem'));
        blocks.push(block('reportCDR'));
        blocks.push('-');
        blocks.push(block('reportListLength'));
        blocks.push(block('reportListContainsItem'));
        blocks.push('-');
        blocks.push(block('doAddToList'));
        blocks.push(block('doDeleteFromList'));
        blocks.push(block('doInsertInList'));
        blocks.push(block('doReplaceInList'));

        // for debugging: ///////////////

        if (this.world().isDevMode) {
            blocks.push('-');
            txt = new TextMorph(localize(
                'development mode \ndebugging primitives:'
            ));
            txt.fontSize = 9;
            txt.setColor(this.paletteTextColor);
            blocks.push(txt);
            blocks.push('-');
            blocks.push(block('reportMap'));
            blocks.push('-');
            blocks.push(block('doForEach'));
            blocks.push(block('doShowTable'));
        }

        /////////////////////////////////

        blocks.push('=');

        if (StageMorph.prototype.enableCodeMapping) {
            blocks.push(block('doMapCodeOrHeader'));
            blocks.push(block('doMapStringCode'));
            blocks.push(block('doMapListCode'));
            blocks.push('-');
            blocks.push(block('reportMappedCode'));
            blocks.push('=');
        }

        button = new PushButtonMorph(
            null,
            function () {
                new BlockDialogMorph(
                    null,
                    function (definition) {
                        if (definition.spec !== '') {
                            SnapActions.addCustomBlock(definition, myself)
                                .accept(function(def) {
                                    var editor = new BlockEditorMorph(def, myself);
                                    editor.popUp();
                                });
                        }
                    },
                    myself
                ).prompt(
                    'Make a block',
                    null,
                    myself.world()
                );
            },
            'Make a block'
        );
        blocks.push(button);
    } else if (cat === 'custom') {
        button = new PushButtonMorph(
            null,
            function () {
                new BlockDialogMorph(
                    null,
                    function (definition) {
                        if (definition.spec !== '') {
                            SnapActions.addCustomBlock(definition, myself)
                                .accept(function(def) {
                                    var editor = new BlockEditorMorph(def, myself);
                                    editor.popUp();
                                });
                        }
                    },
                    myself
                ).prompt(
                    'Make a block',
                    null,
                    myself.world()
                );
            },
            'Make a block'
        );
        blocks.push(button);
    }
    return blocks;
};

StageMorph.prototype.thumbnail = function (extentPoint, excludedSprite) {
/*
    answer a new Canvas of extentPoint dimensions containing
    my thumbnail representation keeping the originial aspect ratio
*/
    var myself = this,
        src = this.image,
        scale = Math.min(
            (extentPoint.x / src.width),
            (extentPoint.y / src.height)
        ),
        // Netsblox addition: start
        trg,
        ctx,
        fb,
        fimg;

    extentPoint = new Point(src.width * scale, src.height * scale);
    trg = newCanvas(extentPoint);
    ctx = trg.getContext('2d');
    // Netsblox addition: end

    ctx.scale(scale, scale);
    ctx.drawImage(
        src,
        0,
        0
    );
    ctx.drawImage(
        this.penTrails(),
        0,
        0,
        this.dimensions.x * this.scale,
        this.dimensions.y * this.scale
    );
    this.children.forEach(function (morph) {
        if (morph.isVisible && (morph !== excludedSprite)) {
            fb = morph.fullBounds();
            fimg = morph.fullImage();
            if (fimg.width && fimg.height) {
                ctx.drawImage(
                    morph.fullImage(),
                    fb.origin.x - myself.bounds.origin.x,
                    fb.origin.y - myself.bounds.origin.y
                );
            }
        }
    });
    return trg;
};

SpriteMorph.prototype.thumbnail = function (extentPoint) {
/*
    answer a new Canvas of extentPoint dimensions containing
    my thumbnail representation keeping the originial aspect ratio
*/
    var src = this.image, // at this time sprites aren't composite morphs
        scale = Math.min(
            (extentPoint.x / src.width),
            (extentPoint.y / src.height)
        ),
        // Netsblox addition: start
        xOffset,
        yOffset,
        trg,
        ctx;

    extentPoint = new Point(src.width * scale, src.height * scale);
    xOffset = (extentPoint.x - (src.width * scale)) / 2,
    yOffset = (extentPoint.y - (src.height * scale)) / 2,
    trg = newCanvas(extentPoint);
    ctx = trg.getContext('2d');
    // Netsblox addition: end

    function xOut(style, alpha, width) {
        var inset = Math.min(extentPoint.x, extentPoint.y) / 10;
        ctx.strokeStyle = style;
        ctx.globalAlpha = alpha;
        ctx.compositeOperation = 'lighter';
        ctx.lineWidth = width || 1;
        ctx.moveTo(inset, inset);
        ctx.lineTo(trg.width - inset, trg.height - inset);
        ctx.moveTo(inset, trg.height - inset);
        ctx.lineTo(trg.width - inset, inset);
        ctx.stroke();
    }

    ctx.save();
    if (this.isCorpse) {
        ctx.globalAlpha = 0.3;
    }
    if (src.width && src.height) {
        ctx.scale(scale, scale);
        ctx.drawImage(
            src,
            Math.floor(xOffset / scale),
            Math.floor(yOffset / scale)
        );
    }
    if (this.isCorpse) {
        ctx.restore();
        xOut('white', 0.8, 6);
        xOut('black', 0.8, 1);
    }
    return trg;
};

ReplayControls.prototype._applyEvent = ReplayControls.prototype.applyEvent;
ReplayControls.prototype.applyEvent = function(event, next) {
    if (event.type !== 'openProject') {
        return ReplayControls.prototype._applyEvent.call(this, event, next);
    } else {
        return next();
    }
};

SpriteMorph.prototype.reportRPCError = function () {
    return this.parentThatIsA(StageMorph).rpcError;
};

StageMorph.prototype.reportRPCError = function () {
    return this.rpcError;
};

WatcherMorph.prototype._isGlobal =
    WatcherMorph.prototype.isGlobal;

WatcherMorph.prototype.isGlobal = function (selector) {
    return selector === 'reportRPCError' ||
        WatcherMorph.prototype._isGlobal.call(this, selector);
};
