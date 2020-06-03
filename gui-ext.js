/* globals ProjectDialogMorph, ensureFullUrl, localize, nop,
   IDE_Morph, Process, SnapCloud, BlockExportDialogMorph, DialogBoxMorph,
   detect, Point
   */

// adapted from installCloudProjectList
ProjectDialogMorph.prototype._openProject = ProjectDialogMorph.prototype.openProject;
ProjectDialogMorph.prototype.openProject = function () {
    var myself = this,
        proj = this.listField.selected,
        response;

    if (this.source === 'examples') {
        this.destroy();
        response = this.ide.getURL(this.ide.resourceURL('Examples', proj.name));
        this.ide.droppedText(response);
        // role name
        this.ide.updateUrlQueryString(proj.name, false, true);
    } else if (this.source === 'cloud-shared'){
        this.destroy();
        this.ide.showMessage('Opening project.. ', 2);
        SnapCloud.joinActiveProject(
            proj.ID,
            function(xml) {
                myself.ide.rawLoadCloudProject(xml, proj.Public);
            },
            myself.ide.cloudError()
        );
    } else {
        return this._openProject();
    }
};

ProjectDialogMorph.prototype.openCloudProject = function (project) {
    var myself = this,
        msg;

    this.destroy();
    myself.ide.nextSteps([
        function () {
            msg = myself.ide.showMessage('Fetching project\nfrom the cloud...');
        },
        function () {
            SnapCloud.reconnect(function() {
                var isReopen = project.ProjectName === myself.ide.room.name,
                    onlyMe = myself.ide.room.getCurrentOccupants() === 1;

                if (isReopen && onlyMe) {  // reopening own project
                    myself.rawOpenCloudProject(project);
                } else {
                    SnapCloud.isProjectActive(
                        project.ID,
                        function(isActive) {
                            var choices,
                                dialog;

                            if (isActive) {
                                // Prompt if we should join the project or open new
                                dialog = new DialogBoxMorph(null, nop);
                                choices = {};
                                choices['Join Existing'] = function() {
                                    SnapCloud.joinActiveProject(
                                        project.ID,
                                        function(xml) {
                                            myself.ide.rawLoadCloudProject(xml, project.Public);
                                        },
                                        myself.ide.cloudError()
                                    );
                                    dialog.destroy();
                                    myself.destroy();
                                };
                                choices['Create Copy'] = function() {
                                    dialog.destroy();
                                    return SnapCloud.getEntireProject(
                                        project.ID,
                                        function(xml) {
                                            return myself.ide.droppedText(xml);
                                        },
                                        myself.ide.cloudError()
                                    );
                                };
                                dialog.ask(
                                    localize('Join Existing Project'),
                                    localize('This project is already open. Would you like to join\n' +
                                        'the active one or create a new copy?'),
                                    myself.world(),
                                    choices
                                );
                            } else {
                                myself.rawOpenCloudProject(project);
                            }
                        },
                        myself.ide.cloudError()
                    );
                }
            }, myself.ide.cloudError());

        },
        function() {
            msg.destroy();
        }
    ]);
};

////////////////////////////////////////////////////
// Override submodule for exporting of message types
////////////////////////////////////////////////////

IDE_Morph.prototype._getURL = IDE_Morph.prototype.getURL;
IDE_Morph.prototype.getURL = function (url, callback) {
    url = ensureFullUrl(url);
    return this._getURL(url, callback);
};

IDE_Morph.prototype._rawOpenBlocksString = IDE_Morph.prototype.rawOpenBlocksString;
IDE_Morph.prototype.rawOpenBlocksString = function (str, name, silently) {
    var myself = this,
        msgTypes;

    if (Process.prototype.isCatchingErrors) {
        try {
            msgTypes = this.serializer.parse(str).childrenNamed('messageType');
        } catch (err) {
            this.showMessage('Load failed: ' + err);
        }
    } else {
        msgTypes = this.serializer.parse(str).childrenNamed('messageType');
    }

    if (silently) {
        msgTypes.forEach(function(msgType) {
            var name = msgType.childNamed('name').contents,
                fields = msgType.childNamed('fields').children.map(function(field) {
                    return field.contents;
                });

            myself.stage.addMessageType({
                name: name,
                fields: fields
            });
        });

        this.flushBlocksCache();
        this.flushPaletteCache();
        this.refreshPalette();
        this.showMessage(
            'Imported Blocks / Message Types Module' + (name ? ': ' + name : '') + '.',
            2
        );
    }

    return this._rawOpenBlocksString(str, name, silently);
};

IDE_Morph.prototype.loadReplayFromXml = function (str) {
    // Extract the replay from the project xml and load it
    var xml = this.serializer.parse(str);

    if (xml.tag === 'room') {
        // grab the first role for now
        xml = xml.children[0].childNamed('project');
    }

    if (xml.tag === 'project') {
        // Update ids of sprite, stage, if needed
        var ids = this.serializer.getInitialStageSpriteIds(xml),
            stageId = ids[0],
            spriteId = ids[1],
            sprite = this.sprites.at(1);

        SnapActions.registerOwner(this.stage, stageId);
        SnapActions.registerOwner(sprite, spriteId);
        xml = xml.childNamed('replay');
    }

    return this.droppedText(xml.toString());
};

IDE_Morph.prototype.openReplayString = function (str) {
    var myself = this,
        replay = this.serializer.parse(str);

    myself.exitReplayMode();
    return SnapActions.openProject()
        .then(function() {
            var allEvents = myself.serializer.loadReplayHistory(replay);
            myself.replayEvents(allEvents, false);
        });
};


IDE_Morph.prototype.isSupportedBrowser = function() {
    var isGoogleChrome = function() {
        // https://stackoverflow.com/questions/4565112/javascript-how-to-find-out-if-the-user-browser-is-chrome
        // please note,
        // that IE11 now returns undefined again for window.chrome
        // and new Opera 30 outputs true for window.chrome
        // but needs to check if window.opr is not undefined
        // and new IE Edge outputs to true now for window.chrome
        // and if not iOS Chrome check
        // so use the below updated condition
        var isChromium = window.chrome;
        var winNav = window.navigator;
        var vendorName = winNav.vendor;
        var isOpera = typeof window.opr !== 'undefined';
        var isIEedge = winNav.userAgent.indexOf('Edge') > -1;
        var isIOSChrome = winNav.userAgent.match('CriOS');

        if (isIOSChrome) {
            // is Google Chrome on IOS
            return true;
        } else if(
            isChromium !== null &&
            typeof isChromium !== 'undefined' &&
            vendorName === 'Google Inc.' &&
            isOpera === false &&
            isIEedge === false
        ) {
            // is Google Chrome
            return true;
        } else {
            // not Google Chrome
            return false;
        }
    };
    return isGoogleChrome();
}

//// Mobile Mode ////

IDE_Morph.prototype.isMobileDevice = function() {
    var smallSideMax = 420,
        bigSideMax = 800;
    var hasSmallPortraitDims = screen.width <= smallSideMax && screen.height <= bigSideMax;
    var hasSmallLandscapeDims = screen.width <= bigSideMax && screen.height <= smallSideMax;

    return (hasSmallPortraitDims || hasSmallLandscapeDims) &&
        (navigator.userAgent.toLowerCase().indexOf('mobile') !== -1) &&
        (typeof window.orientation !== 'undefined');
};

IDE_Morph.prototype.mobileMode = {
    // assuming top pos for horizontal alignment and right for vertical
    _stackMode: '', // stack controls horizontally or vertically
    buttons: [],
    btnConfig: {
        idealSize: 30, // symbol + padding(inner)
        SBRatio: 0.5, // symbol to button(size) ratio
        GBRatio: 0.3, // gap to button ratio
        symbolSize: undefined,
        padding: undefined,
        size: undefined, // cur size
        gap: undefined,
    },
    ideMorph: undefined, // TODO replace me
};

// activate mobilemode
IDE_Morph.prototype.mobileMode.init = function() {
    this.ideMorph = world.children[0];
    this.hideExtra();
    var screenPixelRatio = window.innerHeight / window.outerHeight;
    this.btnConfig.idealSize = this.btnConfig.idealSize * screenPixelRatio;
    this.setBtnSize(this.btnConfig.idealSize);
    this.fixLayout();
};

IDE_Morph.prototype.mobileMode.updateBtnConfig = function() {
    // compute btn sizes
    this.btnConfig.gap = this.btnConfig.size * this.btnConfig.GBRatio;
    this.btnConfig.symbolSize = this.btnConfig.size * this.btnConfig.SBRatio;
    this.btnConfig.padding = this.btnConfig.size * (1 - this.btnConfig.SBRatio);
};

// permanently change the btn size or
// temporarily set the btn size for current fixlayout
IDE_Morph.prototype.mobileMode.setBtnSize = function(newSize, temp) {
    if (temp === undefined) temp = true;
    if (!temp) this.btnConfig.idealSize = newSize;
    this.btnConfig.size = newSize;
    this.updateBtnConfig();
};

// resets to the idealsize
IDE_Morph.prototype.mobileMode.resetBtnSize = function() {
    this.btnConfig.size = this.btnConfig.idealSize;
    this.updateBtnConfig();
};

IDE_Morph.prototype.mobileMode.fixLayout = function() {
    this.ideMorph.controlBar.setHeight(0);
    var prevStackMode = this._stackMode;
    var spaces = this.emptySpaces();
    var optRect = this.optimalRectangle(spaces);
    // keep the button sizes consistent in landscape and portrait mode
    if (prevStackMode === 'h' && this._stackMode === 'v') {
        var newSize = this.btnConfig.size * 0.6;
        this.setBtnSize(newSize);
    }
    this.buttons = this.createButtons();
    // compute wrapper box details for the buttons
    var targetBox = this.computeControlPos(optRect);
    this.positionButtons(this.buttons, targetBox);
};

IDE_Morph.prototype.mobileMode.hideExtra = function() {
    this.ideMorph.controlBar.hide();
};

IDE_Morph.prototype.mobileMode.emptySpaces = function() {
    var h = window.innerHeight,
        w = window.innerWidth,
        bounds = world.children[0].stage.bounds;
    var spaces = {
        top: bounds.origin.y,
        left: bounds.origin.x,
        right: w - bounds.corner.x,
        bottom: h - bounds.corner.y
    };
    return spaces;
};


IDE_Morph.prototype.mobileMode.optimalRectangle = function(spaces) {
    // assuming stage is centered
    //  => just looking at top or right side of the stage
    // WARN stage could fill up the whole window
    var bestSide,
        stage = world.children[0].stage;
    var rect = {
        topRight: {
            x: window.innerWidth,
            y: 0
        },
        bottomLeft: {}
    };

    bestSide = (spaces.top > spaces.right) ? 'top' : 'right';

    var sizeToPixelRatio = 2; // symbol size to pixel raito
    if (spaces[bestSide] < this.btnConfig.size * sizeToPixelRatio) {
        var optimalSize = (spaces[bestSide] /sizeToPixelRatio) - 10;
        if (optimalSize < 10) throw new Error('no space on the sides.');
        this.setBtnSize(optimalSize);
    } else {
        this.resetBtnSize(); // set it back to ideal
    }
    switch(bestSide) {
    case 'right':
        rect.bottomLeft.x = stage.bounds.corner.x;
        rect.bottomLeft.y = window.innerHeight;
        break;
    case 'top':
        rect.bottomLeft.x = 0;
        rect.bottomLeft.y = stage.bounds.origin.y;
        break;
    }

    rect.height = Math.abs(rect.topRight.y - rect.bottomLeft.y);
    rect.width = Math.abs(rect.topRight.x - rect.bottomLeft.x);

    this._stackMode = (rect.height > rect.width) ? 'v' : 'h';
    return rect;
};

IDE_Morph.prototype.mobileMode.computeControlPos = function(targetRect) {
    var totalH = window.innerHeight,
        totalW = window.innerWidth,
        numButtons = this.buttons.length,
        btnHeight = this.buttons[0].height(),
        btnWidth = this.buttons[0].width(),
        controls;

    // stack button vertically or horizontally
    if  (this._stackMode === 'v') {
        // stack vertically
        controls = {
            origin: {},
            height: numButtons * btnHeight + (numButtons-1) * this.btnConfig.gap,
            width: btnWidth,
        };
        controls.origin.y = (totalH - controls.height) / 2;
        controls.origin.x = targetRect.bottomLeft.x + (targetRect.width - controls.width) / 2;

    } else if (this._stackMode === 'h') {
        //stack vertically
        controls = {
            origin: {},
            width: numButtons * btnWidth + (numButtons-1) * this.btnConfig.gap,
            height: btnHeight,
        };
        controls.origin.x = (totalW - controls.width) / 2;
        controls.origin.y = (targetRect.bottomLeft.y - controls.height)/2;
    }
    return controls;
};

IDE_Morph.prototype.mobileMode.createButtons = function() {
    var myself = this;
    var colors = [
        new Color(50, 50, 50),
        new Color(70, 70, 70),
        new Color(90, 90, 90),
    ];

    if (this.buttons && this.buttons.length !== 0) {
        this.buttons.forEach(function(btn) {
            btn.destroy();
        });
    }

    var buttons = [];

    // stopButton
    var stopButton = new ToggleButtonMorph(
        null, // colors
        this.ideMorph, // the IDE is the target
        'stopAllScripts',
        [
            new SymbolMorph('octagon', myself.btnConfig.symbolSize),
            new SymbolMorph('square', myself.btnConfig.symbolSize)
        ],
        function () {  // query
            return myself.ideMorph.stage ?
                myself.ideMorph.stage.enableCustomHatBlocks &&
                myself.ideMorph.stage.threads.pauseCustomHatBlocks
                : true;
        }
    );
    stopButton.labelColor = new Color(200, 0, 0);

    var startButton = new PushButtonMorph(
        this.ideMorph,
        'pressStart',
        new SymbolMorph('flag', myself.btnConfig.symbolSize)
    );
    startButton.labelColor = new Color(0, 200, 0);

    buttons.push(startButton);
    buttons.push(stopButton);


    buttons.forEach(function(btn){
        btn.hide();
        btn.fixLayout();
        btn.drawNew();
        myself.ideMorph.add(btn);
        btn.corner = 12;
        btn.color = colors[0];
        btn.highlightColor = colors[1];
        btn.pressColor = colors[2];
        btn.labelMinExtent = new Point(36, 18);
        btn.labelShadowOffset = new Point(-1, -1);
        btn.labelShadowColor = colors[1];
        btn.contrast = this.buttonContrast;
        btn.padding = myself.btnConfig.padding;
        // btn.setWidth(btnWidth);
        // btn.setHeight(BUTTON_SIZE.height);
        // fix layout will shrink width to paddings
        btn.fixLayout();
        if (btn.refresh) btn.refresh();
    });

    return buttons;
};

// position and show buttons
IDE_Morph.prototype.mobileMode.positionButtons = function(buttons, controls) {
    var btnHeight = buttons[0].height(),
        myself = this,
        btnWidth = buttons[0].width();

    // position buttons
    buttons.forEach( function(button, idx) {
        var x,y;
        if (myself._stackMode === 'v') {
            x = controls.origin.x;
            y = controls.origin.y + idx * btnHeight + idx * myself.btnConfig.gap;
        } else if (myself._stackMode === 'h') {
            y = controls.origin.y;
            x = controls.origin.x + idx * btnWidth + idx * myself.btnConfig.gap;
        }
        button.setPosition(new Point(x, y));
        button.show();
    });

};

IDE_Morph.prototype.initializeEmbeddedAPI = function () {
    var self = this,
        externalVariables = {},
        receiveMessage;

    receiveMessage = async function(event) {
        var data = event.data;
        switch (data.type) {
        case 'import':
            self.droppedText(data.content, data.name, data.fileType);
            break;
        case 'set-variable':
            externalVariables[data.key] = data.value;
            break;
        case 'delete-variable':
            delete externalVariables[data.key];
            break;
        case 'export-project':
        {
            const {id} = data;
            const xml = await self.getProjectXML();
            window.parent.postMessage({id, xml});
            break;
        }
        case 'get-username':
        {
            const {id} = data;
            const {username} = SnapCloud;
            window.parent.postMessage({id, username});
            break;
        }
        }
    };

    window.externalVariables = externalVariables;
    window.addEventListener('message', receiveMessage, false);
};

IDE_Morph.prototype.getMediaListFromURL = function (url, callback) {
    // Invoke the given callback with a list of files in a directory
    // based on the contents file.
    // If no callback is specified, synchronously return the list of files
    // Note: Synchronous fetching has been deprecated and should be switched
    var async = callback instanceof Function,
        myself = this,
        data;

    function alphabetically(x, y) {
        return x.name.toLowerCase() < y.name.toLowerCase() ? -1 : 1;
    }

    if (async) {
        this.getURL(
            url,
            function (txt) {
                var data = myself.parseResourceFile(txt);
                data.sort(alphabetically);
                callback.call(this, data);
            }
        );
    } else {
        data = this.parseResourceFile(this.getURL(url));
        data.sort(alphabetically);
        return data;
    }
};

// LibraryImportDialogMorph ///////////////////////////////////////////
// I am preview dialog shown before importing a library.
// I inherit from a DialogMorph but look similar to 
// ProjectDialogMorph, and BlockImportDialogMorph

LibraryImportDialogMorph.prototype = new DialogBoxMorph();
LibraryImportDialogMorph.prototype.constructor = LibraryImportDialogMorph;
LibraryImportDialogMorph.uber = DialogBoxMorph.prototype;

// LibraryImportDialogMorph instance creation:

function LibraryImportDialogMorph(ide, librariesData) {
    this.init(ide, librariesData);
}

LibraryImportDialogMorph.prototype.init = function (ide, librariesData) {
    // initialize inherited properties:
    LibraryImportDialogMorph.uber.init.call(
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
};

LibraryImportDialogMorph.prototype.buildContents = function () {
    this.addBody(new Morph());
    this.body.color = this.color;

    this.initializePalette();
    this.initializeLibraryDescription();
    this.installLibrariesList();

    this.addButton('importLibrary', 'Import');
    this.addButton('cancel', 'Cancel');

    this.setExtent(new Point(460, 455));
    this.fixLayout();
};

LibraryImportDialogMorph.prototype.initializePalette = function () {
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
};

LibraryImportDialogMorph.prototype.initializeLibraryDescription = function () {
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
};

LibraryImportDialogMorph.prototype.installLibrariesList = function () {
    var myself = this;

    if (this.listField) {this.listField.destroy(); }

    this.listField = new ListMorph(
        this.librariesData,
        function (element) {return element.name; },
        null,
        function () {myself.importLibrary(); }
    );

    this.fixListFieldItemColors();

    this.listField.fixLayout = nop;
    this.listField.edge = InputFieldMorph.prototype.edge;
    this.listField.fontSize = InputFieldMorph.prototype.fontSize;
    this.listField.typeInPadding = InputFieldMorph.prototype.typeInPadding;
    this.listField.contrast = InputFieldMorph.prototype.contrast;
    this.listField.drawNew = InputFieldMorph.prototype.drawNew;
    this.listField.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;

    this.listField.action = function (item) {
        if (isNil(item)) {return; }

        myself.notesText.text = item.description || '';
        myself.notesText.drawNew();
        myself.notesField.contents.adjustBounds();

        if (myself.hasCached(item.fileName)) {
            myself.displayBlocks(item.fileName);
        } else {
            myself.showMessage(
                localize('Loading') + '\n' + localize(item.name)
            );
            myself.ide.getURL(
                myself.ide.resourceURL('libraries', item.fileName),
                function(libraryXML) {
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
};

LibraryImportDialogMorph.prototype.popUp = function () {
    var world = this.ide.world();
    if (world) {
        LibraryImportDialogMorph.uber.popUp.call(this, world);
        this.handle = new HandleMorph(
            this,
            300,
            300,
            this.corner,
            this.corner
        );
    }
};

LibraryImportDialogMorph.prototype.fixListFieldItemColors =
    ProjectDialogMorph.prototype.fixListFieldItemColors;

LibraryImportDialogMorph.prototype.clearDetails =
    ProjectDialogMorph.prototype.clearDetails;

LibraryImportDialogMorph.prototype.fixLayout = function () {
    var titleHeight = fontHeight(this.titleFontSize) + this.titlePadding * 2,
        thin = this.padding / 2,
        oldFlag = Morph.prototype.trackChanges;

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
};
    
// Library Cache Utilities.
LibraryImportDialogMorph.prototype.hasCached = function (key) {
    return this.libraryCache.hasOwnProperty(key);
};

LibraryImportDialogMorph.prototype.cacheLibrary = function (key, blocks) {
    this.libraryCache[key] = blocks ;
};

LibraryImportDialogMorph.prototype.cachedLibrary = function (key) {
    return this.libraryCache[key];
};

LibraryImportDialogMorph.prototype.importLibrary = function () {
    var ide = this.ide,
        selectedLibrary = this.listField.selected.fileName,
        libraryName = this.listField.selected.name;

    ide.showMessage(localize('Loading') + ' ' + localize(libraryName));
    ide.getURL(
        ide.resourceURL('libraries', selectedLibrary),
        function(libraryText) {
            ide.droppedText(libraryText, libraryName);
        }
    );

    this.destroy();
};

LibraryImportDialogMorph.prototype.displayBlocks = function (libraryKey) {
    var x, y, blockImage, previousCategory, blockContainer,
        myself = this,
        padding = 4,
        blocksList = this.cachedLibrary(libraryKey);

    if (!blocksList.length) {return; }
    // populate palette, grouped by categories.
    this.initializePalette();
    x = this.palette.left() + padding;
    y = this.palette.top();

    SpriteMorph.prototype.categories.forEach(function (category) {
        blocksList.forEach(function (definition) {
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
};

LibraryImportDialogMorph.prototype.showMessage = function (msgText) {
    var msg = new MenuMorph(null, msgText);
    this.initializePalette();
    this.fixLayout();
    msg.popUpCenteredInWorld(this.palette.contents);
};


