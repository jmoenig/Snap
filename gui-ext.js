/* globals ProjectDialogMorph, ensureFullUrl, localize, nop,
   IDE_Morph, Process, SnapCloud, BlockExportDialogMorph, DialogBoxMorph,
   detect
   */

ProjectDialogMorph.prototype._deleteProject =
    ProjectDialogMorph.prototype.deleteProject;

ProjectDialogMorph.prototype.deleteProject = function () {
    if (this.source === 'cloud-shared') {
        // Remove self from list of collabs
        var name = this.listField.selected.ProjectName;
        this.ide.confirm(
            localize(
                'Are you sure you want to delete'
            ) + '\n"' + name + '"?',
            'Delete Project',
            function() {
                SnapCloud.evictCollaborator(SnapCloud.username);
            }
        );
    } else {
        this._deleteProject();
    }
};

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

// TODO: Why is this one so much different?
ProjectDialogMorph.prototype.rawOpenCloudProject = function (proj) {
    var myself = this,
        msg = myself.ide.showMessage('Fetching project\nfrom the cloud...');

    SnapCloud.getProject(
        proj.ID,
        function (xml) {
            msg.destroy();
            myself.ide.rawLoadCloudProject(xml, proj.Public);
        },
        myself.ide.cloudError()
    );
    this.destroy();
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
            myself.serializer.loadReplayHistory(replay);
            myself.replayEvents(JSON.parse(JSON.stringify(SnapUndo.allEvents)), false);
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

    receiveMessage = function(event) {
        switch (event.data.type) {
        case 'import':
            self.droppedText(event.data.content, event.data.name);
            break;
        case 'set-variable':
            externalVariables[event.data.key] = event.data.value;
            break;
        case 'delete-variable':
            delete externalVariables[event.data.key];
            break;
        }
    };

    window.externalVariables = externalVariables;
    window.addEventListener('message', receiveMessage, false);
};
