// init decorator

SpriteMorph.prototype.originalInit = SpriteMorph.prototype.init;
SpriteMorph.prototype.init = function(globals) {
    this.originalInit(globals);
    this.arduino = new Arduino(this);
};

// Definition of a new Arduino Category

SpriteMorph.prototype.categories.push('arduino');
SpriteMorph.prototype.blockColor['arduino'] = new Color(24, 167, 181);

SpriteMorph.prototype.originalInitBlocks = SpriteMorph.prototype.initBlocks;
SpriteMorph.prototype.initArduinoBlocks = function () {

    this.blocks.reportAnalogReading = 
    {
        only: SpriteMorph,
        type: 'reporter',
        category: 'arduino',
        spec: 'analog reading %analogPin',
        transpilable: true
    };

    this.blocks.reportDigitalReading = 
    {
        only: SpriteMorph,
        type: 'predicate',
        category: 'arduino',
        spec: 'digital reading %digitalPin',
        transpilable: true
    };

    this.blocks.connectArduino =
    {
        only: SpriteMorph,
        type: 'command',
        category: 'arduino',
        spec: 'connect arduino at %s'
    };

    this.blocks.disconnectArduino =
    {
        only: SpriteMorph,
        type: 'command',
        category: 'arduino',
        spec: 'disconnect arduino'
    };

    // Keeping this block spec, although it's not used anymore!
    this.blocks.setPinMode =
    {
        only: SpriteMorph,
        type: 'command',
        category: 'arduino',
        spec: 'setup digital pin %digitalPin as %pinMode',
        defaults: [null, localize('servo')],
        transpilable: true
    };

    this.blocks.digitalWrite =
    {
        only: SpriteMorph,
        type: 'command',
        category: 'arduino',
        spec: 'set digital pin %digitalPin to %b',
        transpilable: true
    };

    this.blocks.servoWrite =
    {
        only: SpriteMorph,
        type: 'command',
        category: 'arduino',
        spec: 'set servo %servoPin to %servoValue',
        defaults: [null, ['clockwise']],
        transpilable: true
    };

    this.blocks.pwmWrite =
    {
        only: SpriteMorph,
        type: 'command',
        category: 'arduino',
        spec: 'set pin %pwmPin to value %n',
	defaults: [null, 128],
        transpilable: true
    };

    // Ardui... nization? 
    // Whatever, let's dumb this language down:

    this.blocks.receiveGo.transpilable = true;
    this.blocks.receiveMessage.transpilable = true;
    this.blocks.doBroadcastAndWait.transpilable = true;
    this.blocks.doWait.transpilable = true;
    this.blocks.doWaitUntil.transpilable = true;
    this.blocks.doForever.transpilable = true;
    this.blocks.doRepeat.transpilable = true;
    this.blocks.doUntil.transpilable = true;
    this.blocks.doIf.transpilable = true;
    this.blocks.doIfElse.transpilable = true;
    this.blocks.reportSum.transpilable = true;
    this.blocks.reportDifference.transpilable = true;
    this.blocks.reportProduct.transpilable = true;
    this.blocks.reportQuotient.transpilable = true;
    this.blocks.reportModulus.transpilable = true;
    this.blocks.reportRound.transpilable = true;
    this.blocks.reportMonadic.transpilable = true;
    this.blocks.reportRandom.transpilable = true;
    this.blocks.reportLessThan.transpilable = true;
    this.blocks.reportEquals.transpilable = true;
    this.blocks.reportGreaterThan.transpilable = true;
    this.blocks.reportAnd.transpilable = true;
    this.blocks.reportOr.transpilable = true;
    this.blocks.reportNot.transpilable = true;
    this.blocks.reportBoolean.transpilable = true;
    this.blocks.doSetVar.transpilable = true;
    this.blocks.doChangeVar.transpilable = true;
    this.blocks.doDeclareVariables.transpilable = true;

    StageMorph.prototype.codeMappings['delim'] = ',';
    StageMorph.prototype.codeMappings['tempvars_delim'] = ', ';
    StageMorph.prototype.codeMappings['string'] = '"<#1>"';

    StageMorph.prototype.codeMappings['receiveGo'] = 'void setup() {';
    StageMorph.prototype.codeMappings['doBroadcastAndWait'] = '  !call!<#1>();';
    StageMorph.prototype.codeMappings['receiveMessage'] = 'void <#1>() {';

    StageMorph.prototype.codeMappings['doWait'] = '  delay(<#1> * 1000);';
    StageMorph.prototype.codeMappings['doWaitUntil'] = '  while(!<#1>){\n  }\n';
    StageMorph.prototype.codeMappings['doForever'] = '}\n\nvoid loop() {\n  <#1>\n}';
    StageMorph.prototype.codeMappings['doRepeat'] = '  for (int i = 0; i < <#1>; i++) {\n  <#2>\n  }';
    StageMorph.prototype.codeMappings['doUntil'] = '  while(!<#1>){\n  <#2>\n  }';
    StageMorph.prototype.codeMappings['doIf'] = '  if (<#1>) {\n  <#2>\n}';
    StageMorph.prototype.codeMappings['doIfElse'] = '  if (<#1>) {\n  <#2>\n} else {\n  <#3>\n}';

    StageMorph.prototype.codeMappings['reportSum'] = '(<#1> + <#2>)';
    StageMorph.prototype.codeMappings['reportDifference'] = '(<#1> - <#2>)';
    StageMorph.prototype.codeMappings['reportProduct'] = '(<#1> * <#2>)';
    StageMorph.prototype.codeMappings['reportQuotient'] = '(<#1> / <#2>)';
    StageMorph.prototype.codeMappings['reportModulus'] = '(<#1> % <#2>)';
    StageMorph.prototype.codeMappings['reportRound'] = 'round(<#1>)';
    StageMorph.prototype.codeMappings['reportMonadic'] = 's4a.math(<#1>,<#2>)';
    StageMorph.prototype.codeMappings['reportRandom'] = 'random(<#1>, <#2>+1)';
    StageMorph.prototype.codeMappings['reportLessThan'] = '(<#1> < <#2>)';
    StageMorph.prototype.codeMappings['reportEquals'] = '(<#1> == <#2>)';
    StageMorph.prototype.codeMappings['reportGreaterThan'] = '(<#1> > <#2>)';
    StageMorph.prototype.codeMappings['reportAnd'] = '(<#1> && <#2>)';
    StageMorph.prototype.codeMappings['reportOr'] = '(<#1> || <#2>)';
    StageMorph.prototype.codeMappings['reportNot'] = '!(<#1>)';
    StageMorph.prototype.codeMappings['reportBoolean'] = '<#1>';

    StageMorph.prototype.codeMappings['doSetVar'] = '  <#1> = <#2>;';
    StageMorph.prototype.codeMappings['doChangeVar'] = '  <#1> += <#2>;';
    StageMorph.prototype.codeMappings['doDeclareVariables'] = 'int <#1> = 0;'; // How do we deal with types? Damn types...

    StageMorph.prototype.codeMappings['reportAnalogReading'] = 's4a.analogRead(<#1>)';
    StageMorph.prototype.codeMappings['reportDigitalReading'] = 's4a.digitalRead(<#1>)';
    StageMorph.prototype.codeMappings['setPinMode'] = '  pinMode(<#1>, <#2>);';
    StageMorph.prototype.codeMappings['digitalWrite'] = '  s4a.digitalWrite(<#1>, <#2>);';
    StageMorph.prototype.codeMappings['servoWrite'] = '  s4a.servoWrite(<#1>, <#2>);';
    StageMorph.prototype.codeMappings['pwmWrite'] = '  s4a.analogWrite(<#1>, <#2>);';
}

SpriteMorph.prototype.initBlocks =  function() {
    this.originalInitBlocks();
    this.initArduinoBlocks();
};

SpriteMorph.prototype.initBlocks();

// blockTemplates decorator

SpriteMorph.prototype.originalBlockTemplates = SpriteMorph.prototype.blockTemplates;
SpriteMorph.prototype.blockTemplates = function (category) {
    var myself = this,
        blocks = myself.originalBlockTemplates(category); 

    //  Button that triggers a connection attempt 

    this.arduinoConnectButton = new PushButtonMorph(
            null,
            function () {
                myself.arduino.attemptConnection();
            },
            'Connect Arduino'
            );

    //  Button that triggers a disconnection from board

    this.arduinoDisconnectButton = new PushButtonMorph(
            null,
            function () {
                myself.arduino.disconnect();;
            },
            'Disconnect Arduino'
            );

    function arduinoWatcherToggle (selector) {
        if (StageMorph.prototype.hiddenPrimitives[selector]) {
            return null;
        }
        var info = SpriteMorph.prototype.blocks[selector];

        return new ToggleMorph(
            'checkbox',
            this,
            function () {
                var reporter = detect(blocks, function (each) {
                        return (each.selector === selector)
                    }),
                    pin = reporter.inputs()[0].contents().text;

                if (!pin) { return };

                myself.arduinoWatcher(
                    selector,
                    localize(info.spec),
                    myself.blockColor[info.category],
                    pin
                );
            },
            null,
            function () {
                var reporter = detect(blocks, function (each) {
                    return (each && each.selector === selector)
                });

                return reporter &&
                    myself.showingArduinoWatcher(selector, reporter.inputs()[0].contents().text);
            },
            null
        );
    };

    function blockBySelector (selector) {
        if (StageMorph.prototype.hiddenPrimitives[selector]) {
            return null;
        }
        var newBlock = SpriteMorph.prototype.blockForSelector(selector, true);
        newBlock.isTemplate = true;
        return newBlock;
    };

    var analogToggle = arduinoWatcherToggle('reportAnalogReading'),
        reportAnalog = blockBySelector('reportAnalogReading'),
        digitalToggle = arduinoWatcherToggle('reportDigitalReading'),
        reportDigital = blockBySelector('reportDigitalReading');
    
    if (reportAnalog) {
        reportAnalog.toggle = analogToggle;
    }

    if (reportDigital) {
        reportDigital.toggle = digitalToggle;
    }

    if (category === 'arduino') {
        blocks.push(this.arduinoConnectButton);
        blocks.push(this.arduinoDisconnectButton);
        blocks.push('-');
        blocks.push(blockBySelector('connectArduino'));
        blocks.push(blockBySelector('disconnectArduino'));
        blocks.push('-');
        blocks.push(blockBySelector('servoWrite'));
        blocks.push(blockBySelector('digitalWrite'));
        blocks.push(blockBySelector('pwmWrite'));
        blocks.push('-');
        blocks.push(analogToggle);
        blocks.push(reportAnalog);
        blocks.push(digitalToggle);
        blocks.push(reportDigital);

    } else if (category === 'other') {
        button = new PushButtonMorph(
                null,
                function () {
                    var ide = myself.parentThatIsA(IDE_Morph),
                    stage = myself.parentThatIsA(StageMorph);
                    new BlockDialogMorph(
                        null,
                        function (definition) {
                            if (definition.spec !== '') {
                                if (definition.isGlobal) {
                                    stage.globalBlocks.push(definition);
                                } else {
                                    myself.customBlocks.push(definition);
                                }
                                ide.flushPaletteCache();
                                ide.refreshPalette();
                                new BlockEditorMorph(definition, myself).popUp();
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
//        button.userMenu = helpMenu;
        button.selector = 'addCustomBlock';
        button.showHelp = BlockMorph.prototype.showHelp;
        blocks.push(button);
    }

    return blocks;
};

// Removing 'other' blocks from 'variables' category
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
        oldFlag = Morph.prototype.trackChanges,
        shade = new Color(140, 140, 140),
        searchButton,
        makeButton;

    Morph.prototype.trackChanges = false;

    palette.owner = this;
    palette.padding = unit / 2;
    palette.color = this.paletteColor;
    palette.growth = new Point(0, MorphicPreferences.scrollBarSize);

    // toolbar:
    
    palette.toolBar = new AlignmentMorph('column');

    searchButton = new PushButtonMorph(
        this,
        "searchBlocks",
        new SymbolMorph("magnifierOutline", 16)
    );
    searchButton.alpha = 0.2;
    searchButton.padding = 1;
    searchButton.hint = localize('find blocks') + '...';
    searchButton.labelShadowColor = shade;
    searchButton.drawNew();
    searchButton.fixLayout();
	palette.toolBar.add(searchButton);

    makeButton = new PushButtonMorph(
        this,
        "makeBlock",
        new SymbolMorph("cross", 16)
    );
    makeButton.alpha = 0.2;
    makeButton.padding = 1;
    makeButton.hint = localize('Make a block') + '...';
    makeButton.labelShadowColor = shade;
    makeButton.drawNew();
    makeButton.fixLayout();
    palette.toolBar.add(makeButton);

	palette.toolBar.fixLayout();
    palette.add(palette.toolBar);

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

        menu.addPair(
            [
                new SymbolMorph(
                    'magnifyingGlass',
                    MorphicPreferences.menuFontSize
                ),
                localize('find blocks') + '...'
            ],
            function () {myself.searchBlocks(); },
            '^F'
        );
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
        return menu;
    };

    // primitives:

    blocks = this.blocksCache[category];
    if (!blocks) {
        blocks = this.blockTemplates(category);
        if (this.isCachingPrimitives) {
            this.blocksCache[category] = blocks;
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

    if (stage) {
        y += unit * 1.6;

        stage.globalBlocks.forEach(function (definition) {
            var block;
            if (definition.category === category ||
                    (category === 'variables'
                        && contains(
                            ['lists'],
                            definition.category
                        ))) {
                block = definition.templateInstance();
                y += unit * 0.3;
                block.setPosition(new Point(x, y));
                palette.addContents(block);
                x = 0;
                y += block.height();
            }
        });
    }

    // local custom blocks:

    y += unit * 1.6;
    this.customBlocks.forEach(function (definition) {
        var block;
        if (definition.category === category ||
                (category === 'variables'
                    && contains(
                        ['lists'],
                        definition.category
                    ))) {
            block = definition.templateInstance();
            y += unit * 0.3;
            block.setPosition(new Point(x, y));
            palette.addContents(block);
            x = 0;
            y += block.height();
        }
    });

    // inherited custom blocks:

    // y += unit * 1.6;
    if (this.exemplar) {
        this.inheritedBlocks(true).forEach(function (definition) {
            var block;
            if (definition.category === category ||
                    (category === 'variables'
                        && contains(
                            ['lists'],
                            definition.category
                        ))) {
                block = definition.templateInstance();
                y += unit * 0.3;
                block.setPosition(new Point(x, y));
                palette.addContents(block);
                block.ghost();
                x = 0;
                y += block.height();
            }
        });
    }

    //layout

    palette.scrollX(palette.padding);
    palette.scrollY(palette.padding);

    Morph.prototype.trackChanges = oldFlag;
    return palette;
};

// Sprite duplicates shouldn't share Arduino instances

SpriteMorph.prototype.originalFullCopy = SpriteMorph.prototype.fullCopy;
SpriteMorph.prototype.fullCopy = function (forClone) {
    var c = this.originalFullCopy(forClone);
   
    if (!forClone) {
        c.arduino = new Arduino(c);
    }

    return c;
};

SpriteMorph.prototype.reportAnalogReading = function (pin) {
    if (this.arduino.isBoardReady()) {
        var board = this.arduino.board;

        if (!pin) { return 0 };

        if (board.pins[board.analogPins[pin]].mode != board.MODES.ANALOG) {
            board.pinMode(board.analogPins[pin], board.MODES.ANALOG);
        }

        return board.pins[board.analogPins[pin]].value;

    } else {
        return 0;
    }
};

SpriteMorph.prototype.reportDigitalReading = function (pin) {
    if (this.arduino.isBoardReady()) {
        var board = this.arduino.board;

        if (!pin) { return false };

        if (board.pins[pin].mode != board.MODES.INPUT) {
            board.pinMode(pin, board.MODES.INPUT);
            board.reportDigitalPin(pin, 1);
        }
        return board.pins[pin].value == 1;
    } else {
        return false;
    }
};

SpriteMorph.prototype.arduinoWatcher = function (selector, label, color, pin) {
    var stage = this.parentThatIsA(StageMorph),
        watcher,
        others;

    if (!stage) { return; }

    watcher = this.arduinoWatcherFor(stage, selector, pin);

    if (watcher) {
        if (watcher.isVisible) {
            watcher.hide();
        } else {
            watcher.show();
            watcher.fixLayout(); // re-hide hidden parts
            watcher.keepWithin(stage);
        }
        return;
    }

    // if no watcher exists, create a new one
    watcher = new WatcherMorph(
        label.replace(/%.*\s*/, pin),
        color,
        WatcherMorph.prototype.isGlobal(selector) ? stage : this,
        selector
    );
    watcher.pin = pin;
    watcher.update = function () {
        var newValue, sprite, num;

        this.updateLabel();
        newValue = this.target[this.getter](pin);

        if (newValue !== '' && !isNil(newValue)) {
            num = +newValue;
            if (typeof newValue !== 'boolean' && !isNaN(num)) {
                newValue = Math.round(newValue * 1000000000) / 1000000000;
            }
        }
        if (newValue !== this.currentValue) {
            this.changed();
            this.cellMorph.contents = newValue;
            this.cellMorph.drawNew();
            if (!isNaN(newValue)) {
                this.sliderMorph.value = newValue;
                this.sliderMorph.drawNew();
            }
            this.fixLayout();
            this.currentValue = newValue;
        }
    };

    watcher.setPosition(stage.position().add(10));
    others = stage.watchers(watcher.left());
    if (others.length > 0) {
        watcher.setTop(others[others.length - 1].bottom());
    }
    stage.add(watcher);
    watcher.fixLayout();
    watcher.keepWithin(stage);
    return watcher;
};

SpriteMorph.prototype.arduinoWatcherFor = function (stage, selector, pin) {
    var myself = this;
    return detect(stage.children, function (morph) {
        return morph instanceof WatcherMorph &&
            morph.getter === selector &&
            morph.target === (morph.isGlobal(selector) ? stage : myself) &&
            morph.pin === pin; 
    });
};

SpriteMorph.prototype.showingArduinoWatcher = function (selector, pin) {
    var stage = this.parentThatIsA(StageMorph),
        watcher;
    if (stage === null) {
        return false;
    }
    watcher = this.arduinoWatcherFor(stage, selector, pin);
    if (watcher) {
        return watcher.isVisible;
    }
    return false;
};


// List exporting

WatcherMorph.prototype.userMenu = function () {
    var myself = this,
        menu = new MenuMorph(this),
        subMenu,
        on = '\u25CF',
        off = '\u25CB',
        vNames;

    function monitor(vName) {
        var stage = myself.parentThatIsA(StageMorph),
            varFrame = myself.currentValue.outerContext.variables;
        menu.addItem(
            vName + '...',
            function () {
                var watcher = detect(
                    stage.children,
                    function (morph) {
                        return morph instanceof WatcherMorph
                            && morph.target === varFrame
                            && morph.getter === vName;
                    }
                ),
                    others;
                if (watcher !== null) {
                    watcher.show();
                    watcher.fixLayout(); // re-hide hidden parts
                    return;
                }
                watcher = new WatcherMorph(
                    vName + ' ' + localize('(temporary)'),
                    SpriteMorph.prototype.blockColor.variables,
                    varFrame,
                    vName
                );
                watcher.setPosition(stage.position().add(10));
                others = stage.watchers(watcher.left());
                if (others.length > 0) {
                    watcher.setTop(others[others.length - 1].bottom());
                }
                stage.add(watcher);
                watcher.fixLayout();
            }
        );
    }

    menu.addItem(
        (this.style === 'normal' ? on : off) + ' ' + localize('normal'),
        'styleNormal'
    );
    menu.addItem(
        (this.style === 'large' ? on : off) + ' ' + localize('large'),
        'styleLarge'
    );
    if (this.target instanceof VariableFrame) {
        menu.addItem(
            (this.style === 'slider' ? on : off) + ' ' + localize('slider'),
            'styleSlider'
        );
        menu.addLine();
        menu.addItem(
            'slider min...',
            'userSetSliderMin'
        );
        menu.addItem(
            'slider max...',
            'userSetSliderMax'
        );
        menu.addLine();
        menu.addItem(
            'import...',
            function () {
                var inp = document.createElement('input'),
                    ide = myself.parentThatIsA(IDE_Morph);
                if (ide.filePicker) {
                    document.body.removeChild(ide.filePicker);
                    ide.filePicker = null;
                }
                inp.type = 'file';
                inp.style.color = "transparent";
                inp.style.backgroundColor = "transparent";
                inp.style.border = "none";
                inp.style.outline = "none";
                inp.style.position = "absolute";
                inp.style.top = "0px";
                inp.style.left = "0px";
                inp.style.width = "0px";
                inp.style.height = "0px";
                inp.style.display = "none";
                inp.addEventListener(
                    "change",
                    function () {
                        var file;

                        function txtOnlyMsg(ftype) {
                            ide.inform(
                                'Unable to import',
                                'Snap! can only import "text" files.\n' +
                                    'You selected a file of type "' +
                                    ftype +
                                    '".'
                            );
                        }

                        function readText(aFile) {
                            var frd = new FileReader();
                            frd.onloadend = function (e) {
                                myself.target.setVar(
                                    myself.getter,
                                    e.target.result
                                );
                            };

                            if (aFile.type.indexOf("text") === 0) {
                                frd.readAsText(aFile);
                            } else {
                                txtOnlyMsg(aFile.type);
                            }
                        }

                        document.body.removeChild(inp);
                        ide.filePicker = null;
                        if (inp.files.length > 0) {
                            file = inp.files[inp.files.length - 1];
                            readText(file);
                        }
                    },
                    false
                );
                document.body.appendChild(inp);
                ide.filePicker = inp;
                inp.click();
            }
        );
        if (this.currentValue &&
                (isString(this.currentValue) || !isNaN(+this.currentValue))) {
            menu.addItem('export...', this.valueExporter('plain'));
        } else if (this.currentValue instanceof List) {
            subMenu = new MenuMorph(this.currentValue);
            if (!this.currentValue.contents.some(
                    function (any) {
                        return any instanceof List;
                    })) {
                subMenu.addItem('Plain text', this.valueExporter('plain'));
            }
            subMenu.addItem('JSON', this.valueExporter('json'));
            subMenu.addItem('XML', this.valueExporter('xml'));
            subMenu.addItem('CSV', this.valueExporter('csv'));
            menu.addMenu('export...', subMenu);
        } else if (this.currentValue instanceof Context) {
            vNames = this.currentValue.outerContext.variables.names();
            if (vNames.length) {
                menu.addLine();
                vNames.forEach(function (vName) {
                    monitor(vName);
                });
            }
        }
    }
    return menu;
};

WatcherMorph.prototype.valueExporter = function (format) {
    var myself = this,
        value = this.currentValue,
        contents,
        format = format || 'plain',
        ide = myself.parentThatIsA(IDE_Morph);

    return function () {
        switch (format) {
            case 'plain':
                contents = value instanceof List ? 
                    value.asArray().join('\n') : 
                    value.toString();
                break;
            case 'json':
                contents = JSON.stringify(value);
                break;
            case 'xml':
                contents = ide.serializer.serialize(value);
                break;
            case 'csv':
                try {
                    contents = value.toCSV();
                } catch (err) {
                    if (Process.prototype.isCatchingErrors) {
                        ide.showMessage('List cannot be converted into CSV', 2);
                    } else {
                        throw err;
                    }
                    return;
                }
                break;
        }

        ide.saveFileAs(
            contents,
            'text/' + format + ';charset=utf-8',
            myself.getter // variable name
            );
    };
};
