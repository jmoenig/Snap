/* globals ensureFullUrl, localize, nop, Point, IDE_Morph, Process, 
   SaveOpenDialogMorph, SaveOpenDialogMorphSource, Morph, utils, MenuMorph,
   SERVER_URL, SnapActions, fontHeight, TextMorph, ScrollFrameMorph, SpriteMorph,
   InputFieldMorph,
   */

////////////////////////////////////////////////////
// Override submodule for exporting of message types
////////////////////////////////////////////////////
IDE_Morph.prototype.UrlActionRegistry = {};
IDE_Morph.prototype.parseUrlAnchors = function (querystring, hash) {
    // Parse the hash options
    hash = hash.replace(/^#/, '');
    const [hashAction, ...hashDataChunks] = hash.split(':');
    const hashData = hashDataChunks.join(':');
    let hashDictStr = hashData;

    if (hashData.length > 0) {
      const withoutTrailingParams = hashData.split('&').shift();
      let hasImplicitParam = !withoutTrailingParams.includes('=');

      if (hasImplicitParam) {
          hashDictStr = 'data=' + hashData;
      }

      if (this.UrlActionRegistry.hasOwnProperty(hashAction)) {
          hashDictStr = hashDictStr + `&action=${hashAction}`;
      }
    }

    const anchorsDict = new SearchParams(hashDictStr);

    // parse querystring params
    const queryDict = new SearchParams(querystring);
    queryDict.forEach((value, key) => anchorsDict.set(key, value));

    return anchorsDict;
};

IDE_Morph.prototype.getUrlSettings = function (querystring, hash) {
    const anchorsDict = this.parseUrlAnchors(querystring, hash);
    const UrlAction = this.UrlActionRegistry[anchorsDict.get('action')] || NoMainParam;
    return new UrlAction(anchorsDict, hash);
};

class UrlParamError extends Error {}
class MissingParameterError extends UrlParamError {
  constructor(params, parameter) {
    const action = params.get('action');
    super(`"${parameter}" required for "${action}"`);
  }
}

/**
 * A case-insensitive search parameter dictionary.
 */
class SearchParams extends URLSearchParams {
  normalizeKey(key) {
    return key.toLowerCase();
  }

  has(key) {
    return super.has(this.normalizeKey(key))
  }

  get(key) {
    return super.get(this.normalizeKey(key))
  }

  set(key, value) {
    return super.set(this.normalizeKey(key), value)
  }
}

class UrlParams {
    constructor(params) {
        this.params = params;
    }

    getRequiredParam(name) {
        if (!this.params.has(name)) {
          throw new MissingParameterError(this.params, name);
        }
        return this.params.get(name);
    }

    /**
     * Check if a parameter value is truthy. A value of "" is considered to
     * be truthy since it means the URL parameter is added like "&editMode".
     */
    getParameterFlag(name) {
        const value = this.params.get(name);
        const falseValues = [undefined, null, '0', 'false', false];
        return !falseValues.includes(value);
    }

    async applySettings(ide) {
        await this.applyInitialFlags(ide);
        await this.apply(ide);
        await this.applyFlags(ide);
    }

    async apply(_ide) {}

    async applyInitialFlags(ide) {
        const extensions = this.params.get('extensions');
        if (extensions) {
            try {
                const extensionUrls = JSON.parse(decodeURIComponent(extensions));
                await Promise.all(extensionUrls.map(url => ide.loadExtension(url)));
            } catch (err) {
                ide.inform(
                    'Unable to load extensions',
                    'The following error occurred while trying to load extensions:\n\n' +
                    err.message + '\n\n' +
                    'Perhaps the URL is malformed?'
                );
            }
        }
    }

    async applyFlags(ide) {
        if (this.getParameterFlag('embedMode')) {
            ide.setEmbedMode();
        }
        if (this.getParameterFlag('appMode')) {
            ide.toggleAppMode(true);
        }
        if (this.getParameterFlag('run')) {
            ide.runScripts();
        }
        if (this.getParameterFlag('hideControls')) {
            ide.controlBar.hide();
            window.onbeforeunload = nop;
        }
        if (this.getParameterFlag('noExitWarning')) {
            window.onbeforeunload = nop;
        }
        if (this.params.get('lang')) {
            ide.setLanguage(this.params.get('lang'), null, true); // don't persist
        }
        if (this.params.get('setVariable')) {
            const [varName, value] = this.params.get('setVariable').split('=');
            const exists = ide.globalVariables.allNames().includes(varName);
            if (exists) {
                ide.globalVariables.setVar(varName, value);
            } else {
                await ide.droppedText(value, varName, 'text');
            }
        }

        // only force my world to get focus if I'm not in embed mode
        // to prevent the iFrame from involuntarily scrolling into view
        if (!ide.isEmbedMode) {
            ide.world().keyboardHandler.focus();
        }
    }
}

/**
 * Default params. Don't really do anything but apply the before & after flags.
 */
class NoMainParam extends UrlParams {}

/**
 * Import content (xml or URL) on open
 */
class OpenTextFromUrl extends UrlParams {
    async apply(ide) {
        let hash = this.getRequiredParam('data');

        const text = hash.startsWith('<') ? hash : utils.getUrlSync(hash);
        await ide.droppedText(text);
    }
}
IDE_Morph.prototype.UrlActionRegistry.open = OpenTextFromUrl;

/**
 * Open project from xml/URL and run.
 */
class RunProjectFromUrl extends UrlParams {
    async apply(ide) {
        let hash = this.getRequiredParam('data');
        // Determine if it is a URL or text
        const text = hash.startsWith('<') ? hash : utils.getUrlSync(hash);
        await ide.droppedText(text);

        if (!this.getParameterFlag('editMode')) {
            this.params.set('appMode', true);
        }
        if (!this.getParameterFlag('noRun')) {
            this.params.set('run', true);
        }
    }
}
IDE_Morph.prototype.UrlActionRegistry.run = RunProjectFromUrl;

/**
 * Open a public project (username, project name)
 */
class OpenPublicProject extends UrlParams {
    async apply(ide) {
        ide.showMessage('Fetching project\nfrom the cloud...');

        const msg = ide.showMessage('Opening project...');
        const projectData = await ide.cloud.getProjectByName(
            this.getRequiredParam('Username'),
            this.getRequiredParam('ProjectName')
        );
        const xml = ide.getXMLFromProjectData(projectData);
        await ide.droppedText(xml);
        ide.hasChangedMedia = true;

        if (!this.getParameterFlag('editMode')) {
            this.params.set('appMode', true);
        }
        if (!this.getParameterFlag('noRun')) {
            this.params.set('run', true);
        }
        msg.destroy();
    }
}
IDE_Morph.prototype.UrlActionRegistry.present = OpenPublicProject;

/**
 * Download a cloud project as an xml
 */
class DownloadCloudProject extends UrlParams {
    async apply(ide) {
        let m = ide.showMessage('Fetching project\nfrom the cloud...');
        try {
            const projectData = await ide.cloud.getProjectByName(
                this.getRequiredParam('Username'),
                this.getRequiredParam('ProjectName')
            );
            const xml = ide.getXMLFromProjectData(projectData);
            const blob = new Blob([xml], {type: 'text/xml'});
            const url = URL.createObjectURL(blob);

            // Create temporary link for download
            const link = document.createElement("a");
            link.href = url;
            link.download = this.getRequiredParam('ProjectName') + ".xml";

            document.body.appendChild(link);
            link.dispatchEvent(
                new MouseEvent('click', { 
                bubbles: true, 
                cancelable: true, 
                view: window 
                })
            );

            // Cleanup
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (err) {
            ide.cloudError()(err.message);
        }
        m.destroy();
    }
}
IDE_Morph.prototype.UrlActionRegistry.dl = DownloadCloudProject;

/**
 * Open cloud signup dialog.
 */
class CreateCloudAccount extends UrlParams {
    async apply(ide) {
        ide.createCloudAccount();
    }
}
IDE_Morph.prototype.UrlActionRegistry.signup = CreateCloudAccount;

/**
 * Open example project.
 */
class OpenExampleProject extends UrlParams {
    async apply(ide) {
        const exampleName = this.params.get('data') || this.getRequiredParam('ProjectName');
        const source = new CloudProjectExamples(ide);
        const example = source.list().find(example => example.name === exampleName);
        if (example) {
            const msg = ide.showMessage('Opening ' + example + ' example...');
            await source.open(example);
            ide.hasChangedMedia = true;
            msg.destroy();
        } else {
            ide.showMessage('Example not found: ' + exampleName);
        }

        if (!this.getParameterFlag('editMode')) {
            this.params.set('appMode', true);
        }
        if (!this.getParameterFlag('noRun')) {
            this.params.set('run', true);
        }
    }
}
IDE_Morph.prototype.UrlActionRegistry.example = OpenExampleProject;

/**
 * open a private (unshared) project via url
 */
class OpenPrivateProject extends UrlParams {
    async apply(ide) {
        const name = this.params.get('data') || this.getRequiredParam('ProjectName');
        const isLoggedIn = ide.cloud.username !== null;
        if (!isLoggedIn) {
            ide.showMessage('You are not logged in. Cannot open ' + name);
            return;
        }

        const msg = ide.showMessage('Opening ' + name + '...');
        try {
            const metadata = await ide.cloud.getProjectMetadataByName(ide.cloud.username, name);
            const source = new CloudProjectsSource(ide);
            await source.open(metadata);

            if (!this.getParameterFlag('editMode')) {
                this.params.set('appMode', true);
            }
            if (!this.getParameterFlag('noRun')) {
                this.params.set('run', true);
            }
        } catch (err) {
            ide.cloudError()(err.message);
        }
        msg.destroy();
    }
}
IDE_Morph.prototype.UrlActionRegistry.private = OpenPrivateProject;

IDE_Morph.prototype._getURL = IDE_Morph.prototype.getURL;
IDE_Morph.prototype.getURL = function (url, callback, responseType) {
    url = ensureFullUrl(url);
    return this._getURL(url, callback, responseType);
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
        btn.rerender();
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
    var externalVariables = {},
        receiveMessage;

    receiveMessage = async event => {
        var data = event.data;
        console.log('received message', event.data);
        switch (data.type) {
        case 'import':
            this.droppedText(data.content, data.name, data.fileType);
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
            const xml = await this.getProjectXML();
            const type = 'reply';
            event.source.postMessage({id, type, xml}, event.origin);
            break;
        }
        case 'get-username':
        {
            const {id} = data;
            const {username} = this.cloud;
            const type = 'reply';
            event.source.postMessage({id, type, username}, event.origin);
            break;
        }
        case 'add-listener':
        {
            const {id, eventType, listenerId} = data;
            const {source, origin} = event;
            const callback = event => {
                source.postMessage({
                    type: 'event',
                    eventType: event.type,
                    detail: event.detail,
                }, origin);
            };
            this.events.addEventListener(eventType, listenerId, callback);
            source.postMessage({id, type: 'reply'}, origin);
            break;
        }
        case 'remove-listener':
        {
            const {id, eventType, listenerId} = data;
            this.events.removeEventListener(eventType, listenerId);
            event.source.postMessage({id, type: 'reply'}, event.origin);
            break;
        }
        case 'run-scripts':
            this.runScripts();
            break;
        case 'stop-all-scripts':
            this.stopAllScripts();
            break;
        }
    };

    window.externalVariables = externalVariables;
    window.addEventListener('message', receiveMessage, false);
};

IDE_Morph.prototype.extensionsMenu = function() {
    const dict = {};

    this.extensions.registry
        .filter(ext => ext.getMenu())
        .forEach(ext => {
            const name = ext.name || ext.constructor.name;
            dict[name] = ext.getMenu();
        });

    const menuFromDict = dict => {
        const menu = new MenuMorph(this);
        Object.entries(dict).forEach(entry => {
            const [label, contents] = entry;
            if (typeof contents === 'object') {
                const submenu = menuFromDict(contents);
                menu.addMenu(label, submenu);
            } else if (label === '~') {
                menu.addLine();
            } else {
                menu.addItem(label, contents);
            }
        });
        return menu;
    };

    let menu = menuFromDict(dict);

    const on = new SymbolMorph(
        'checkedBox',
        MorphicPreferences.menuFontSize * 0.75
    ),
    off = new SymbolMorph(
        'rectangle',
        MorphicPreferences.menuFontSize * 0.75
    );
                    
    // Add preferences
    this.extensions.registry
        .filter(ext => ext.getSettings())
        .forEach(ext => {
            const name = ext.name || ext.constructor.name;
            let thisExtMenu = menu.items.find(item => item[0] == name);

            let prefs = ext.getSettings();

            if(thisExtMenu){
                thisExtMenu = thisExtMenu[1];

                // Only show menu if there is a non-hidden option available
                if(prefs.find(pref => !pref.hide || world.currentKey == 16) !== undefined){
                    let newOptionsMenu = new MenuMorph(this);
                    thisExtMenu.addMenu('Options', newOptionsMenu);
                    
                    // Add each setting as a toggle
                    prefs.forEach(pref => {

                        let test = pref.test;

                        if (!pref.hide || world.currentKey == 16) {
                            newOptionsMenu.addItem(
                                [
                                    (test() ? on : off),
                                    pref.label
                                ],
                                pref.toggle,
                                test() ? pref.onHint : pref.offHint,
                                pref.hide ? new Color(100, 0, 0) : null
                            );
                        }
                    });
                }
            }
        });

    return menu;
};

IDE_Morph.prototype.requestProjectReload = async function (reason) {
    const message = reason + '\n\nWould you like to reload the current role?';
    const confirmed = await this.confirm(message, localize('Project Reload Required'));
    if (confirmed) {
        const xml = await this.cloud.exportRole();
        const msg = this.showMessage(localize('Opening project...'));
        await this.openRoleString(xml);
        msg.destroy();
    }
};

IDE_Morph.prototype.openRoleString = async function (role, parsed=false) {
    if (!parsed) {
        role = this.serializer.parse(role);
    }

    var projectXml = [
        '<snapdata>',
        role.childNamed('project').toString(),
        role.childNamed('media').toString(),
        '</snapdata>'
    ].join('');

    return SnapActions.openProject(projectXml);
};

IDE_Morph.prototype.manageFriends = async function () {
    const dialog = new UserDialogMorph(this);
    dialog.popUp(this.world());
};

IDE_Morph.prototype.sendFriendRequest = async function () {
    this.prompt(localize('Send Friend Invitation to...'), async name => {
        await this.cloud.sendFriendRequest(name);
        this.showMessage(localize('Friend request sent!'), 2);
    });
};

IDE_Morph.prototype.respondToFriendRequest = async function (request) {
    const dialog = new DialogBoxMorph(
        this,
        () => this.cloud.respondToFriendRequest(request.sender, 'Approved'),
    );
    dialog.labelString = 'Respond to Friend Request';
    dialog.key = `FriendRequestFrom${request.sender}`;

    const textString = localize('Received friend request from ') + request.sender +
        '.\n\n' + localize('What would you like to do?');
    const txt = new TextMorph(
        textString,
        dialog.fontSize,
        dialog.fontStyle,
        true,
        false,
        'center',
        null,
        null,
        MorphicPreferences.isFlat ? null : new Point(1, 1),
        WHITE
    );
    dialog.addBody(txt);
    dialog.addButton('ok', localize('Accept'));
    dialog.addButton(
        () => {
            this.cloud.respondToFriendRequest(request.sender, 'Rejected');
            dialog.destroy();
        }, 
        localize('Reject')
    );
    dialog.addButton(
        async () => {
            const confirmed = await this.confirm(
                localize('Are you sure you would like to block ') + request.sender + '?',
                localize('Block User?')
            );
            if (confirmed) {
                this.cloud.respondToFriendRequest(request.sender, 'Blocked');
            }
            dialog.destroy();
        }, 
        localize('Block')
    );
    dialog.addButton('cancel', localize('Cancel'));
    dialog.createLabel();
    dialog.fixLayout = function() {
        DialogBoxMorph.prototype.fixLayout.call(this);
        horizontalCenter(this, this.label);
        horizontalCenter(this, this.body);
    };
    function horizontalCenter(parent, child) {
        const centerX = parent.center().x
        const left = centerX - child.width()/2;
        child.setLeft(left);
    }

    dialog.popUp(this.world());
    dialog.fixLayout();
};

IDE_Morph.prototype.tryElevatePermissions = async function (projectId, room) {
    const username = this.cloud.username;
    const existingInvite = (await this.cloud.getCollaboratorRequestList()).find(
        invite => invite.projectId === projectId
    );

    if (existingInvite) {
        this.confirm(
            localize('Edits cannot be made on projects by guests.\n\nWould ' +
            'you like to accept the existing invitation to collaborate?'),
            localize('Accept Collaboration Invitation?'),
            async () => {
              await this.cloud.respondToCollaborateRequest(existingInvite.id, true);
            }
        );
    } else {
        this.confirm(
            localize('Edits cannot be made on projects by guests.\n\nWould ' +
            'you like to request to be made a collaborator?'),
            localize('Request Collaborator Privileges?'),
            () => {
                const ownerIds = room.getOccupants()
                    .filter(occupant => room.isOwner(occupant.name))
                    .map(occupant => occupant.id);

                this.sockets.sendIDEMessage({
                    type: 'permission-elevation-request',
                    id: `elevate-${Date.now()}`,
                    projectId: projectId,
                    clients: ownerIds,
                    username,
                }, ...ownerIds);
            }
        );
    }
};

IDE_Morph.prototype.respondToCollaborateRequest = async function (request) {
    const metadata = await this.cloud.getProjectMetadata(request.projectId);
    const dialog = new DialogBoxMorph(
        this,
        async () => {
            await this.cloud.respondToCollaborateRequest(request.id, true);
            const isOccupied = request.projectId === this.cloud.projectId;

            if (!isOccupied) {
                const dialog = new DialogBoxMorph();
                dialog.askYesNo(
                  localize('Open Shared Project?'),
                  localize('Would you like to open the shared project now?'),
                  this.root(),
                );
                dialog.ok = async () => {
                  const source = new SharedCloudProjectsSource(this);
                  await source.open(metadata);
                };
            }
        },
    );
    dialog.labelString = 'Respond to Collaborate Request';
    dialog.key = request.id;

    const textString = request.sender + localize(' has invited you to collaborate on') +
        '\n\n' + metadata.name + '\n\n' + localize('What would you like to do?');
    const txt = new TextMorph(
        textString,
        dialog.fontSize,
        dialog.fontStyle,
        true,
        false,
        'center',
        null,
        null,
        MorphicPreferences.isFlat ? null : new Point(1, 1),
        WHITE
    );
    dialog.addBody(txt);
    dialog.addButton('ok', localize('Accept'));
    dialog.addButton(
        async () => {
            await this.cloud.respondToCollaborateRequest(request.id, false);
            this.showMessage(localize('Invitation rejected.'));
            dialog.destroy();
        }, 
        localize('Reject')
    );
    dialog.addButton('cancel', localize('Cancel'));
    dialog.createLabel();
    dialog.fixLayout = function() {
        DialogBoxMorph.prototype.fixLayout.call(this);
        horizontalCenter(this, this.label);
        horizontalCenter(this, this.body);
    };
    function horizontalCenter(parent, child) {
        const centerX = parent.center().x
        const left = centerX - child.width()/2;
        child.setLeft(left);
    }

    dialog.popUp(this.world());
    dialog.fixLayout();

};

IDE_Morph.prototype.manageCollaborators = async function () {
    const dialog = new CollaboratorDialogMorph(
        this,
    );
    dialog.popUp();
};

// Events ///////////////////////////////////////////

class Events {
    // closure compiler bug prevents us from subclassing EventTarget
    // For more information, check out https://github.com/NetsBlox/NetsBlox/issues/3254
    constructor() {
        this._events = new EventTarget();
        this._listeners = {};
    }

    _registerListener(id, callback) {
        this._listeners[id] = callback;
    }

    addEventListener(type, id, callback) {
        this._registerListener(id, callback);
        return this._events.addEventListener(type, callback);
    }

    removeEventListener(type, id) {
        const callback = this._listeners[id];
        delete this._listeners[id];
        return this._events.removeEventListener(type, callback);
    }

    dispatchEvent() {
        return this._events.dispatchEvent(...arguments);
    }
}

// LibraryDialogSources ///////////////////////////////////////////

LibraryDialogSource.prototype = Object.create(SaveOpenDialogMorphSource.prototype);
LibraryDialogSource.prototype.constructor = LibraryDialogSource;
LibraryDialogSource.uber = SaveOpenDialogMorphSource.prototype;

function LibraryDialogSource() {
}

LibraryDialogSource.prototype.init = function(ide, name, icon, id) {
    this.ide = ide;
    LibraryDialogSource.uber.init.call(this, name, icon, id);
};

LibraryDialogSource.prototype.open = async function(library) {
    this.ide.droppedText(await this.getContent(library));
};

LibraryDialogSource.prototype.cacheKey = function(item) {
    return [
        this.id,
        item.name,
    ].join('/');
};

OfficialLibrarySource.prototype = Object.create(LibraryDialogSource.prototype);
OfficialLibrarySource.prototype.constructor = OfficialLibrarySource;
OfficialLibrarySource.uber = LibraryDialogSource.prototype;

function OfficialLibrarySource(ide) {
    this.init(ide, 'Official', 'netsbloxLogo', 'official');
}

OfficialLibrarySource.prototype.list = function() {
    const deferred = utils.defer();
    this.ide.getURL(
        this.ide.resourceURL('libraries', 'LIBRARIES'),
        txt => {
            const libraries = this.ide.parseResourceFile(txt).map(lib => {
                lib.notes = lib.description;
                return lib;
            });
            deferred.resolve(libraries);
        }
    );
    return deferred.promise;
};

OfficialLibrarySource.prototype.getContent = async function(item) {
    const deferred = utils.defer();
    this.ide.getURL(
        this.ide.resourceURL('libraries', item.fileName),
        function(libraryXML) {
            deferred.resolve(libraryXML);
        }
    );
    return deferred.promise;
};

CloudLibrarySource.prototype = Object.create(LibraryDialogSource.prototype);
CloudLibrarySource.prototype.constructor = CloudLibrarySource;
CloudLibrarySource.uber = LibraryDialogSource.prototype;

function CloudLibrarySource(ide) {
    this.init(ide, 'Cloud', 'cloud', 'cloud');
}

CloudLibrarySource.prototype.list = async function() {
    const isLoggedIn = !!this.ide.cloud.username;
    if (!isLoggedIn) {
        this.ide.showMessage(localize('You are not logged in'));
    }

    const libs = await this.ide.cloud.getLibraryList();
    libs.forEach(lib => lib.public = lib.state === 'Public' || lib.state === 'PendingApproval');
    return libs;
};

CloudLibrarySource.prototype.save = async function(item) {
    const {name, blocks, notes} = item;
    const library = await this.ide.cloud.saveLibrary(name, blocks, notes);
    if (library.state === 'PendingApproval') {
        this.ide.inform(
            'Approval Required',
            'Approval is required to re-publish the given library.\n\n' +
            'It will be publicly available again\nfollowing a successful approval!',
        );
    }
};

CloudLibrarySource.prototype.getContent = async function(item) {
    const {owner, name} = item;
    return await this.ide.cloud.getLibrary(owner, name);
};

CloudLibrarySource.prototype.delete = async function(item) {
    const {name} = item;
    return await this.ide.cloud.deleteLibrary(name);
};

CloudLibrarySource.prototype.publish = async function(item, unpublish) {
    const {name} = item;
    const action = unpublish ? 'unpublish' : 'publish';
    if (unpublish) {
        await this.ide.cloud.unpublishLibrary(name);
    } else {
        const publishState = await this.ide.cloud.publishLibrary(name);
        if (publishState === 'PendingApproval') {
            this.ide.inform(
                'Approval Required',
                'Approval is required to publish the given library.\n\n' +
                'It will be publicly available automatically\nfollowing a successful approval!',
            );
        }
    }
};

CommunityLibrarySource.prototype = Object.create(LibraryDialogSource.prototype);
CommunityLibrarySource.prototype.constructor = CommunityLibrarySource;
CommunityLibrarySource.uber = LibraryDialogSource.prototype;

function CommunityLibrarySource(ide) {
    this.init(ide, 'Community', 'cloud', 'community');
}

CommunityLibrarySource.prototype.list = async function() {
    const libs = await this.ide.cloud.getCommunityLibraryList();
    libs.forEach(lib => {
        lib.libraryName = lib.name;
        lib.name = `${lib.name} (author: ${lib.owner})`;
    });
    return libs;
};

CommunityLibrarySource.prototype.getContent = function(item) {
    const {owner} = item;
    const name = item.libraryName;
    return CloudLibrarySource.prototype.getContent.call(this, {name, owner});
};

// LibraryDialogMorph ///////////////////////////////////////////

LibraryDialogMorph.prototype = new SaveOpenDialogMorph();
LibraryDialogMorph.prototype.constructor = LibraryDialogMorph;
LibraryDialogMorph.uber = SaveOpenDialogMorph.prototype;

// LibraryDialogMorph instance creation:

function LibraryDialogMorph(ide, name, xml, notes) {
    this.init(ide, name, xml, notes);
}

LibraryDialogMorph.prototype.init = function (ide, name, xml, notes) {
    const sources = [
        new OfficialLibrarySource(ide),
        new CloudLibrarySource(ide),
        new CommunityLibrarySource(ide),
    ];
    const task = xml ? 'save' : 'open';
    // initialize inherited properties:
    this.ide = ide;
    this.libraryXML = xml;
    // I contain a cached version of the libraries I have displayed,
    // because users may choose to explore a library many times before
    // importing.
    this.libraryCache = {}; // {fileName: [blocks-array] }

    LibraryDialogMorph.uber.init.call(
        this,
        task,
        'Library',
        sources,
        null,
        {name, notes}
    );

    if (task === 'open') {
        this.labelString = 'Import Library';
        this.createLabel();
    }
};

LibraryDialogMorph.prototype.getNewItemID = function() {
    return Date.now();
};

LibraryDialogMorph.prototype.saveItem = async function(newItem) {
    newItem.blocks = this.libraryXML;
    await this.source.save(newItem);
};

LibraryDialogMorph.prototype.buildContents = function () {
    LibraryDialogMorph.uber.buildContents.apply(this, arguments);
    if (this.task === 'open') {
        const openButton = this.buttons.children.find(btn => btn.action === 'openItem');
        openButton.labelString = '  ' + localize('Import') + '  ';
        openButton.rerender();
        openButton.fixLayout();
    } else {
        const cacheKey = 'current-library';
        this.cacheLibrary(
            cacheKey,
            this.ide.serializer.loadBlocks(this.libraryXML)
        );
        this.displayBlocks(cacheKey);
        this.fixLayout();
    }
};

LibraryDialogMorph.prototype.setPreview = async function (item) {
    const cacheKey = this.source.cacheKey(item);
    if (this.hasCached(cacheKey)) {
        this.displayBlocks(cacheKey);
    } else {
        this.showMessage(
            localize('Loading') + '\n' + localize(item.name)
        );
        const libraryXML = await this.source.getContent(item);
        this.cacheLibrary(
            cacheKey,
            this.ide.serializer.loadBlocks(libraryXML)
        );
        this.displayBlocks(cacheKey);
    }
    this.notesText.text = item.notes || '';
    this.notesText.rerender();
};

LibraryDialogMorph.prototype.initPreview = function () {
    this.initializePalette();
    this.preview = this.palette;
};

LibraryDialogMorph.prototype.initializePalette = function () {
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

LibraryDialogMorph.prototype.initializeLibraryDescription = function () {
    if (this.notesField) {this.notesField.destroy(); }

    this.notesField = new ScrollFrameMorph();
    this.notesField.fixLayout = nop;

    this.notesField.edge = InputFieldMorph.prototype.edge;
    this.notesField.fontSize = InputFieldMorph.prototype.fontSize;
    this.notesField.typeInPadding = InputFieldMorph.prototype.typeInPadding;
    this.notesField.contrast = InputFieldMorph.prototype.contrast;
    this.notesField.render = InputFieldMorph.prototype.render;
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

LibraryDialogMorph.prototype.fixLayout = function () {
    var th = fontHeight(this.titleFontSize) + this.titlePadding * 2,
        thin = this.padding / 2,
        inputField = this.nameField || this.filterField,
        oldFlag = Morph.prototype.trackChanges;

    Morph.prototype.trackChanges = false;

    if (this.buttons && (this.buttons.children.length > 0)) {
        this.buttons.fixLayout();
    }

    if (this.body) {
        this.body.setPosition(this.position().add(new Point(
            this.padding,
            th + this.padding
        )));
        this.body.setExtent(new Point(
            this.width() - this.padding * 2,
            this.height() - this.padding * 3 - th - this.buttons.height()
        ));
        this.srcBar.setPosition(this.body.position());

        inputField.setWidth(
            this.body.width() - this.srcBar.width() - this.padding * 6
        );
        inputField.setLeft(this.srcBar.right() + this.padding * 3);
        inputField.setTop(this.srcBar.top());
        inputField.rerender();

        this.listField.setLeft(this.srcBar.right() + this.padding);
        this.listField.setWidth(200);
        this.listField.contents.children[0].adjustWidths();

        this.listField.setTop(inputField.bottom() + this.padding);
        this.listField.setHeight(
            this.body.height() - inputField.height() - this.padding
        );

        if (this.magnifyingGlass) {
            this.magnifyingGlass.setTop(inputField.top());
            this.magnifyingGlass.setLeft(this.listField.left());
        }

        this.notesField.setExtent(new Point(
            this.body.right() - this.listField.right() - thin,
            100,
        ));

        this.palette.setExtent(new Point(
            this.notesField.width(),
            this.listField.height() - this.notesField.height() - thin
        ));
        this.palette.setRight(this.body.right());
        this.palette.setTop(inputField.bottom() + this.padding);
        
        this.notesField.setPosition(this.palette.bottomLeft().add(
            new Point(0, thin)
        ));

        this.notesField.setTop(this.palette.bottom() + thin);
        this.notesField.setLeft(this.palette.left());
    }

    if (this.label) {
        this.label.setCenter(this.center());
        this.label.setTop(this.top() + (th - this.label.height()) / 2);
    }

    if (this.buttons && (this.buttons.children.length > 0)) {
        this.buttons.setCenter(this.center());
        this.buttons.setBottom(this.bottom() - this.padding);
    }

    Morph.prototype.trackChanges = oldFlag;
    this.changed();
};
    
// Library Cache Utilities.
LibraryDialogMorph.prototype.hasCached = function (key) {
    return this.libraryCache.hasOwnProperty(key);
};

LibraryDialogMorph.prototype.cacheLibrary = function (key, blocks) {
    this.libraryCache[key] = blocks ;
};

LibraryDialogMorph.prototype.cachedLibrary = function (key) {
    return this.libraryCache[key];
};

LibraryDialogMorph.prototype.displayBlocks = function (libraryKey) {
    var x, y, blockImage, previousCategory, blockContainer,
        padding = 4,
        blocksList = this.cachedLibrary(libraryKey);

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
            blockContainer.isCachingImage = true;
            blockContainer.bounds.setWidth(blockImage.width);
            blockContainer.bounds.setHeight(blockImage.height);
            blockContainer.cachedImage = blockImage;
            blockContainer.setPosition(new Point(x, y));
            this.palette.addContents(blockContainer);

            y += blockContainer.fullBounds().height() + padding;
        });
    });

    this.palette.scrollX(padding);
    this.palette.scrollY(padding);
    this.fixLayout();
};

LibraryDialogMorph.prototype.showMessage = function (msgText) {
    var msg = new MenuMorph(null, msgText);
    msg.popUpCenteredInWorld(this.palette.contents);
};
