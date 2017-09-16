// IDE_Morph ///////////////////////////////////////////////////////////

// I am SNAP's top-level frame, the Editor window

// IDE_Morph preferences settings and skins

IDE_Morph.prototype.setDefaultDesign = function () {
    MorphicPreferences.isFlat = false;
    SpriteMorph.prototype.paletteColor = new Color(55, 55, 55);
    SpriteMorph.prototype.paletteTextColor = new Color(230, 230, 230);
    StageMorph.prototype.paletteTextColor
        = SpriteMorph.prototype.paletteTextColor;
    StageMorph.prototype.paletteColor = SpriteMorph.prototype.paletteColor;
    SpriteMorph.prototype.sliderColor
        = SpriteMorph.prototype.paletteColor.lighter(30);

    IDE_Morph.prototype.buttonContrast = 30;
    IDE_Morph.prototype.backgroundColor = new Color(40, 40, 40);
    IDE_Morph.prototype.frameColor = SpriteMorph.prototype.paletteColor;

    IDE_Morph.prototype.groupColor
        = SpriteMorph.prototype.paletteColor.lighter(8);
    IDE_Morph.prototype.sliderColor = SpriteMorph.prototype.sliderColor;
    IDE_Morph.prototype.buttonLabelColor = new Color(255, 255, 255);
    IDE_Morph.prototype.tabColors = [
        IDE_Morph.prototype.groupColor.darker(40),
        IDE_Morph.prototype.groupColor.darker(60),
        IDE_Morph.prototype.groupColor
    ];
    IDE_Morph.prototype.rotationStyleColors = IDE_Morph.prototype.tabColors;
    IDE_Morph.prototype.appModeColor = new Color();
    IDE_Morph.prototype.scriptsPaneTexture = this.scriptsTexture();
    IDE_Morph.prototype.padding = 5;

    SpriteIconMorph.prototype.labelColor
        = IDE_Morph.prototype.buttonLabelColor;
    CostumeIconMorph.prototype.labelColor
        = IDE_Morph.prototype.buttonLabelColor;
    SoundIconMorph.prototype.labelColor
        = IDE_Morph.prototype.buttonLabelColor;
    TurtleIconMorph.prototype.labelColor
        = IDE_Morph.prototype.buttonLabelColor;
};

IDE_Morph.prototype.setFlatDesign = () => {
    MorphicPreferences.isFlat = true;
    SpriteMorph.prototype.paletteColor = new Color(255, 255, 255);
    SpriteMorph.prototype.paletteTextColor = new Color(70, 70, 70);
    StageMorph.prototype.paletteTextColor
        = SpriteMorph.prototype.paletteTextColor;
    StageMorph.prototype.paletteColor = SpriteMorph.prototype.paletteColor;
    SpriteMorph.prototype.sliderColor = SpriteMorph.prototype.paletteColor;

    IDE_Morph.prototype.buttonContrast = 30;
    IDE_Morph.prototype.backgroundColor = new Color(200, 200, 200);
    IDE_Morph.prototype.frameColor = new Color(255, 255, 255);

    IDE_Morph.prototype.groupColor = new Color(230, 230, 230);
    IDE_Morph.prototype.sliderColor = SpriteMorph.prototype.sliderColor;
    IDE_Morph.prototype.buttonLabelColor = new Color(70, 70, 70);
    IDE_Morph.prototype.tabColors = [
        IDE_Morph.prototype.groupColor.lighter(60),
        IDE_Morph.prototype.groupColor.darker(10),
        IDE_Morph.prototype.groupColor
    ];
    IDE_Morph.prototype.rotationStyleColors = [
        IDE_Morph.prototype.groupColor,
        IDE_Morph.prototype.groupColor.darker(10),
        IDE_Morph.prototype.groupColor.darker(30)
    ];
    IDE_Morph.prototype.appModeColor = IDE_Morph.prototype.frameColor;
    IDE_Morph.prototype.scriptsPaneTexture = null;
    IDE_Morph.prototype.padding = 1;

    SpriteIconMorph.prototype.labelColor
        = IDE_Morph.prototype.buttonLabelColor;
    CostumeIconMorph.prototype.labelColor
        = IDE_Morph.prototype.buttonLabelColor;
    SoundIconMorph.prototype.labelColor
        = IDE_Morph.prototype.buttonLabelColor;
    TurtleIconMorph.prototype.labelColor
        = IDE_Morph.prototype.buttonLabelColor;
};

IDE_Morph.prototype.scriptsTexture = function () {
    const // bigger scales faster
    pic = newCanvas(new Point(100, 100));

    const ctx = pic.getContext('2d');
    let i;
    for (i = 0; i < 100; i += 4) {
        ctx.fillStyle = this.frameColor.toString();
        ctx.fillRect(i, 0, 1, 100);
        ctx.fillStyle = this.groupColor.lighter(6).toString();
        ctx.fillRect(i + 1, 0, 1, 100);
        ctx.fillRect(i + 3, 0, 1, 100);
        ctx.fillStyle = this.groupColor.toString();
        ctx.fillRect(i + 2, 0, 1, 100);
    }
    return pic;
};

IDE_Morph.prototype.setDefaultDesign();

// IDE_Morph instance creation:

export default class IDE_Morph extends Morph {
    constructor(isAutoFill) {
        this.init(isAutoFill);
    }

    init(isAutoFill) {
        // global font setting
        MorphicPreferences.globalFontFamily = 'Helvetica, Arial';

        // restore saved user preferences
        this.userLanguage = null; // user language preference for startup
        this.projectsInURLs = false;
        this.applySavedSettings();

        // additional properties:
        this.cloudMsg = null;
        this.source = 'local';
        this.serializer = new SnapSerializer();

        this.globalVariables = new VariableFrame();
        this.currentSprite = new SpriteMorph(this.globalVariables);
        this.sprites = new List([this.currentSprite]);
        this.currentCategory = 'motion';
        this.currentTab = 'scripts';
        this.projectName = '';
        this.projectNotes = '';

        this.logoURL = this.resourceURL('snap_logo_sm.png');
        this.logo = null;
        this.controlBar = null;
        this.categories = null;
        this.palette = null;
        this.paletteHandle = null;
        this.spriteBar = null;
        this.spriteEditor = null;
        this.stage = null;
        this.stageHandle = null;
        this.corralBar = null;
        this.corral = null;

        this.isAutoFill = isAutoFill === undefined ? true : isAutoFill;
        this.isAppMode = false;
        this.isSmallStage = false;
        this.filePicker = null;
        this.hasChangedMedia = false;

        this.isAnimating = true;
        this.paletteWidth = 200; // initially same as logo width
        this.stageRatio = 1; // for IDE animations, e.g. when zooming

        this.loadNewProject = false; // flag when starting up translated
        this.shield = null;

        this.savingPreferences = true; // for bh's infamous "Eisenbergification"

        // initialize inherited properties:
        super.init.call(this);

        // override inherited properites:
        this.color = this.backgroundColor;
    }

    openIn(world) {
        let hash;
        let usr;
        const myself = this;
        let urlLanguage = null;

        // get persistent user data, if any
        if (localStorage) {
            usr = localStorage['-snap-user'];
            if (usr) {
                usr = SnapCloud.parseResponse(usr)[0];
                if (usr) {
                    SnapCloud.username = usr.username || null;
                    SnapCloud.password = usr.password || null;
                    if (SnapCloud.username) {
                        this.source = 'cloud';
                    }
                }
            }
        }

        this.buildPanes();
        world.add(this);
        world.userMenu = this.userMenu;

        // override SnapCloud's user message with Morphic
        SnapCloud.message = string => {
            const m = new MenuMorph(null, string);
            let intervalHandle;
            m.popUpCenteredInWorld(world);
            intervalHandle = setInterval(() => {
                m.destroy();
                clearInterval(intervalHandle);
            }, 2000);
        };

        // prevent non-DialogBoxMorphs from being dropped
        // onto the World in user-mode
        world.reactToDropOf = morph => {
            if (!(morph instanceof DialogBoxMorph)) {
                if (world.hand.grabOrigin) {
                    morph.slideBackTo(world.hand.grabOrigin);
                } else {
                    world.hand.grab(morph);
                }
            }
        };

        this.reactToWorldResize(world.bounds);

        function getURL(url) {
            try {
                const request = new XMLHttpRequest();
                request.open('GET', url, false);
                request.send();
                if (request.status === 200) {
                    return request.responseText;
                }
                throw new Error(`unable to retrieve ${url}`);
            } catch (err) {
                myself.showMessage('unable to retrieve project');
                return '';
            }
        }

        function applyFlags(dict) {
            if (dict.editMode) {
                myself.toggleAppMode(false);
            } else {
                myself.toggleAppMode(true);
            }
            if (!dict.noRun) {
                myself.runScripts();
            }
            if (dict.hideControls) {
                myself.controlBar.hide();
                window.onbeforeunload = nop;
            }
            if (dict.noExitWarning) {
                window.onbeforeunload = nop;
            }
        }

        // dynamic notifications from non-source text files
        // has some issues, commented out for now
        /*
        this.cloudMsg = getURL('http://snap.berkeley.edu/cloudmsg.txt');
        motd = getURL('http://snap.berkeley.edu/motd.txt');
        if (motd) {
            this.inform('Snap!', motd);
        }
        */

        function interpretUrlAnchors() {
            let dict;
            let idx;

            if (location.hash.substr(0, 6) === '#open:') {
                hash = location.hash.substr(6);
                if (hash.charAt(0) === '%'
                        || hash.search(/\%(?:[0-9a-f]{2})/i) > -1) {
                    hash = decodeURIComponent(hash);
                }
                if (contains(
                        ['project', 'blocks', 'sprites', 'snapdata'].map(
                            each => hash.substr(0, 8).indexOf(each)
                        ),
                        1
                    )) {
                    this.droppedText(hash);
                } else {
                    this.droppedText(getURL(hash));
                }
            } else if (location.hash.substr(0, 5) === '#run:') {
                hash = location.hash.substr(5);
                idx = hash.indexOf("&");
                if (idx > 0) {
                    hash = hash.slice(0, idx);
                }
                if (hash.charAt(0) === '%'
                        || hash.search(/\%(?:[0-9a-f]{2})/i) > -1) {
                    hash = decodeURIComponent(hash);
                }
                if (hash.substr(0, 8) === '<project>') {
                    this.rawOpenProjectString(hash);
                } else {
                    this.rawOpenProjectString(getURL(hash));
                }
                applyFlags(SnapCloud.parseDict(location.hash.substr(5)));
            } else if (location.hash.substr(0, 9) === '#present:') {
                this.shield = new Morph();
                this.shield.color = this.color;
                this.shield.setExtent(this.parent.extent());
                this.parent.add(this.shield);
                myself.showMessage('Fetching project\nfrom the cloud...');

                // make sure to lowercase the username
                dict = SnapCloud.parseDict(location.hash.substr(9));
                dict.Username = dict.Username.toLowerCase();

                SnapCloud.getPublicProject(
                    SnapCloud.encodeDict(dict),
                    projectData => {
                        let msg;
                        myself.nextSteps([
                            () => {
                                msg = myself.showMessage('Opening project...');
                            },
                            () => {nop(); },
                            () => {
                                if (projectData.indexOf('<snapdata') === 0) {
                                    myself.rawOpenCloudDataString(projectData);
                                } else if (
                                    projectData.indexOf('<project') === 0
                                ) {
                                    myself.rawOpenProjectString(projectData);
                                }
                                myself.hasChangedMedia = true;
                            },
                            () => {
                                myself.shield.destroy();
                                myself.shield = null;
                                msg.destroy();
                                applyFlags(dict);
                            }
                        ]);
                    },
                    this.cloudError()
                );
            } else if (location.hash.substr(0, 7) === '#cloud:') {
                this.shield = new Morph();
                this.shield.alpha = 0;
                this.shield.setExtent(this.parent.extent());
                this.parent.add(this.shield);
                myself.showMessage('Fetching project\nfrom the cloud...');

                // make sure to lowercase the username
                dict = SnapCloud.parseDict(location.hash.substr(7));
                dict.Username = dict.Username.toLowerCase();

                SnapCloud.getPublicProject(
                    SnapCloud.encodeDict(dict),
                    projectData => {
                        let msg;
                        myself.nextSteps([
                            () => {
                                msg = myself.showMessage('Opening project...');
                            },
                            () => {nop(); },
                            () => {
                                if (projectData.indexOf('<snapdata') === 0) {
                                    myself.rawOpenCloudDataString(projectData);
                                } else if (
                                    projectData.indexOf('<project') === 0
                                ) {
                                    myself.rawOpenProjectString(projectData);
                                }
                                myself.hasChangedMedia = true;
                            },
                            () => {
                                myself.shield.destroy();
                                myself.shield = null;
                                msg.destroy();
                                myself.toggleAppMode(false);
                            }
                        ]);
                    },
                    this.cloudError()
                );
            } else if (location.hash.substr(0, 4) === '#dl:') {
                myself.showMessage('Fetching project\nfrom the cloud...');

                // make sure to lowercase the username
                dict = SnapCloud.parseDict(location.hash.substr(4));
                dict.Username = dict.Username.toLowerCase();

                SnapCloud.getPublicProject(
                    SnapCloud.encodeDict(dict),
                    projectData => {
                        window.open(`data:text/xml,${projectData}`);
                    },
                    this.cloudError()
                );
            } else if (location.hash.substr(0, 6) === '#lang:') {
                urlLanguage = location.hash.substr(6);
                this.setLanguage(urlLanguage);
                this.loadNewProject = true;
            } else if (location.hash.substr(0, 7) === '#signup') {
                this.createCloudAccount();
            }
            this.loadNewProject = false;
        }

        if (this.userLanguage) {
            this.loadNewProject = true;
            this.setLanguage(this.userLanguage, interpretUrlAnchors);
        } else {
            interpretUrlAnchors.call(this);
        }
    }

    // IDE_Morph construction

    buildPanes() {
        this.createLogo();
        this.createControlBar();
        this.createCategories();
        this.createPalette();
        this.createStage();
        this.createSpriteBar();
        this.createSpriteEditor();
        this.createCorralBar();
        this.createCorral();
    }

    createLogo() {
        const myself = this;

        if (this.logo) {
            this.logo.destroy();
        }

        this.logo = new Morph();
        this.logo.texture = this.logoURL;
        this.logo.drawNew = function () {
            this.image = newCanvas(this.extent());
            const context = this.image.getContext('2d');

            const gradient = context.createLinearGradient(
                0,
                0,
                this.width(),
                0
            );

            gradient.addColorStop(0, 'black');
            gradient.addColorStop(0.5, myself.frameColor.toString());
            context.fillStyle = MorphicPreferences.isFlat ?
                    myself.frameColor.toString() : gradient;
            context.fillRect(0, 0, this.width(), this.height());
            if (this.texture) {
                this.drawTexture(this.texture);
            }
        };

        this.logo.drawCachedTexture = function () {
            const context = this.image.getContext('2d');
            context.drawImage(
                this.cachedTexture,
                5,
                Math.round((this.height() - this.cachedTexture.height) / 2)
            );
            this.changed();
        };

        this.logo.mouseClickLeft = () => {
            myself.snapMenu();
        };

        this.logo.color = new Color();
        this.logo.setExtent(new Point(200, 28)); // dimensions are fixed
        this.add(this.logo);
    }

    createControlBar() {
        // assumes the logo has already been created
        const padding = 5;

        let button;
        let slider;
        let stopButton;
        let pauseButton;
        let startButton;
        let projectButton;
        let settingsButton;
        let stageSizeButton;
        let appModeButton;
        let cloudButton;
        let x;

        const colors = [
            this.groupColor,
            this.frameColor.darker(50),
            this.frameColor.darker(50)
        ];

        const myself = this;

        if (this.controlBar) {
            this.controlBar.destroy();
        }

        this.controlBar = new Morph();
        this.controlBar.color = this.frameColor;
        this.controlBar.setHeight(this.logo.height()); // height is fixed
        this.controlBar.mouseClickLeft = function () {
            this.world().fillPage();
        };
        this.add(this.controlBar);

        //smallStageButton
        button = new ToggleButtonMorph(
            null, //colors,
            myself, // the IDE is the target
            'toggleStageSize',
            [
                new SymbolMorph('smallStage', 14),
                new SymbolMorph('normalStage', 14)
            ],
            () => // query
            myself.isSmallStage
        );

        button.corner = 12;
        button.color = colors[0];
        button.highlightColor = colors[1];
        button.pressColor = colors[2];
        button.labelMinExtent = new Point(36, 18);
        button.padding = 0;
        button.labelShadowOffset = new Point(-1, -1);
        button.labelShadowColor = colors[1];
        button.labelColor = this.buttonLabelColor;
        button.contrast = this.buttonContrast;
        button.drawNew();
        // button.hint = 'stage size\nsmall & normal';
        button.fixLayout();
        button.refresh();
        stageSizeButton = button;
        this.controlBar.add(stageSizeButton);
        this.controlBar.stageSizeButton = button; // for refreshing

        //appModeButton
        button = new ToggleButtonMorph(
            null, //colors,
            myself, // the IDE is the target
            'toggleAppMode',
            [
                new SymbolMorph('fullScreen', 14),
                new SymbolMorph('normalScreen', 14)
            ],
            () => // query
            myself.isAppMode
        );

        button.corner = 12;
        button.color = colors[0];
        button.highlightColor = colors[1];
        button.pressColor = colors[2];
        button.labelMinExtent = new Point(36, 18);
        button.padding = 0;
        button.labelShadowOffset = new Point(-1, -1);
        button.labelShadowColor = colors[1];
        button.labelColor = this.buttonLabelColor;
        button.contrast = this.buttonContrast;
        button.drawNew();
        // button.hint = 'app & edit\nmodes';
        button.fixLayout();
        button.refresh();
        appModeButton = button;
        this.controlBar.add(appModeButton);
        this.controlBar.appModeButton = appModeButton; // for refreshing

        // stopButton
        button = new ToggleButtonMorph(
            null, // colors
            this, // the IDE is the target
            'stopAllScripts',
            [
                new SymbolMorph('octagon', 14),
                new SymbolMorph('square', 14)
            ],
            () => // query
            (myself.stage ? myself.stage.enableCustomHatBlocks &&
                myself.stage.threads.pauseCustomHatBlocks : true)
        );

        button.corner = 12;
        button.color = colors[0];
        button.highlightColor = colors[1];
        button.pressColor = colors[2];
        button.labelMinExtent = new Point(36, 18);
        button.padding = 0;
        button.labelShadowOffset = new Point(-1, -1);
        button.labelShadowColor = colors[1];
        button.labelColor = new Color(200, 0, 0);
        button.contrast = this.buttonContrast;
        button.drawNew();
        // button.hint = 'stop\nevery-\nthing';
        button.fixLayout();
        button.refresh();
        stopButton = button;
        this.controlBar.add(stopButton);
        this.controlBar.stopButton = stopButton; // for refreshing

        //pauseButton
        button = new ToggleButtonMorph(
            null, //colors,
            this, // the IDE is the target
            'togglePauseResume',
            [
                new SymbolMorph('pause', 12),
                new SymbolMorph('pointRight', 14)
            ],
            () => // query
            myself.isPaused()
        );

        button.corner = 12;
        button.color = colors[0];
        button.highlightColor = colors[1];
        button.pressColor = colors[2];
        button.labelMinExtent = new Point(36, 18);
        button.padding = 0;
        button.labelShadowOffset = new Point(-1, -1);
        button.labelShadowColor = colors[1];
        button.labelColor = new Color(255, 220, 0);
        button.contrast = this.buttonContrast;
        button.drawNew();
        // button.hint = 'pause/resume\nall scripts';
        button.fixLayout();
        button.refresh();
        pauseButton = button;
        this.controlBar.add(pauseButton);
        this.controlBar.pauseButton = pauseButton; // for refreshing

        // startButton
        button = new PushButtonMorph(
            this,
            'pressStart',
            new SymbolMorph('flag', 14)
        );
        button.corner = 12;
        button.color = colors[0];
        button.highlightColor = colors[1];
        button.pressColor = colors[2];
        button.labelMinExtent = new Point(36, 18);
        button.padding = 0;
        button.labelShadowOffset = new Point(-1, -1);
        button.labelShadowColor = colors[1];
        button.labelColor = new Color(0, 200, 0);
        button.contrast = this.buttonContrast;
        button.drawNew();
        // button.hint = 'start green\nflag scripts';
        button.fixLayout();
        startButton = button;
        this.controlBar.add(startButton);
        this.controlBar.startButton = startButton;

        // steppingSlider
        slider = new SliderMorph(
            61,
            1,
            Process.prototype.flashTime * 100 + 1,
            6,
            'horizontal'
        );
        slider.action = num => {
            Process.prototype.flashTime = (num - 1) / 100;
            myself.controlBar.refreshResumeSymbol();
        };
        slider.alpha = MorphicPreferences.isFlat ? 0.1 : 0.3;
        slider.setExtent(new Point(50, 14));
        this.controlBar.add(slider);
        this.controlBar.steppingSlider = slider;

        // projectButton
        button = new PushButtonMorph(
            this,
            'projectMenu',
            new SymbolMorph('file', 14)
            //'\u270E'
        );
        button.corner = 12;
        button.color = colors[0];
        button.highlightColor = colors[1];
        button.pressColor = colors[2];
        button.labelMinExtent = new Point(36, 18);
        button.padding = 0;
        button.labelShadowOffset = new Point(-1, -1);
        button.labelShadowColor = colors[1];
        button.labelColor = this.buttonLabelColor;
        button.contrast = this.buttonContrast;
        button.drawNew();
        // button.hint = 'open, save, & annotate project';
        button.fixLayout();
        projectButton = button;
        this.controlBar.add(projectButton);
        this.controlBar.projectButton = projectButton; // for menu positioning

        // settingsButton
        button = new PushButtonMorph(
            this,
            'settingsMenu',
            new SymbolMorph('gears', 14)
            //'\u2699'
        );
        button.corner = 12;
        button.color = colors[0];
        button.highlightColor = colors[1];
        button.pressColor = colors[2];
        button.labelMinExtent = new Point(36, 18);
        button.padding = 0;
        button.labelShadowOffset = new Point(-1, -1);
        button.labelShadowColor = colors[1];
        button.labelColor = this.buttonLabelColor;
        button.contrast = this.buttonContrast;
        button.drawNew();
        // button.hint = 'edit settings';
        button.fixLayout();
        settingsButton = button;
        this.controlBar.add(settingsButton);
        this.controlBar.settingsButton = settingsButton; // for menu positioning

        // cloudButton
        button = new PushButtonMorph(
            this,
            'cloudMenu',
            new SymbolMorph('cloud', 11)
        );
        button.corner = 12;
        button.color = colors[0];
        button.highlightColor = colors[1];
        button.pressColor = colors[2];
        button.labelMinExtent = new Point(36, 18);
        button.padding = 0;
        button.labelShadowOffset = new Point(-1, -1);
        button.labelShadowColor = colors[1];
        button.labelColor = this.buttonLabelColor;
        button.contrast = this.buttonContrast;
        button.drawNew();
        // button.hint = 'cloud operations';
        button.fixLayout();
        cloudButton = button;
        this.controlBar.add(cloudButton);
        this.controlBar.cloudButton = cloudButton; // for menu positioning

        this.controlBar.fixLayout = function () {
            x = this.right() - padding;
            [stopButton, pauseButton, startButton].forEach(
                button => {
                    button.setCenter(myself.controlBar.center());
                    button.setRight(x);
                    x -= button.width();
                    x -= padding;
                }
            );

            x = Math.min(
                startButton.left() - (3 * padding + 2 * stageSizeButton.width()),
                myself.right() - StageMorph.prototype.dimensions.x *
                    (myself.isSmallStage ? myself.stageRatio : 1)
            );
            [stageSizeButton, appModeButton].forEach(
                button => {
                    x += padding;
                    button.setCenter(myself.controlBar.center());
                    button.setLeft(x);
                    x += button.width();
                }
            );

            slider.setCenter(myself.controlBar.center());
            slider.setRight(stageSizeButton.left() - padding);

            settingsButton.setCenter(myself.controlBar.center());
            settingsButton.setLeft(this.left());

            cloudButton.setCenter(myself.controlBar.center());
            cloudButton.setRight(settingsButton.left() - padding);

            projectButton.setCenter(myself.controlBar.center());
            projectButton.setRight(cloudButton.left() - padding);

            this.refreshSlider();
            this.updateLabel();
        };

        this.controlBar.refreshSlider = function () {
            if (Process.prototype.enableSingleStepping && !myself.isAppMode) {
                slider.drawNew();
                slider.show();
            } else {
                slider.hide();
            }
            this.refreshResumeSymbol();
        };

        this.controlBar.refreshResumeSymbol = () => {
            let pauseSymbols;
            if (Process.prototype.enableSingleStepping &&
                    Process.prototype.flashTime > 0.5) {
                myself.stage.threads.pauseAll(myself.stage);
                pauseSymbols = [
                    new SymbolMorph('pause', 12),
                    new SymbolMorph('stepForward', 14)
                ];
            } else {
                pauseSymbols = [
                    new SymbolMorph('pause', 12),
                    new SymbolMorph('pointRight', 14)
                ];
            }
            pauseButton.labelString = pauseSymbols;
            pauseButton.createLabel();
            pauseButton.fixLayout();
            pauseButton.refresh();
        };

        this.controlBar.updateLabel = function () {
            const suffix = myself.world().isDevMode ?
                    ` - ${localize('development mode')}` : '';

            if (this.label) {
                this.label.destroy();
            }
            if (myself.isAppMode) {
                return;
            }

            this.label = new StringMorph(
                (myself.projectName || localize('untitled')) + suffix,
                14,
                'sans-serif',
                true,
                false,
                false,
                MorphicPreferences.isFlat ? null : new Point(2, 1),
                myself.frameColor.darker(myself.buttonContrast)
            );
            this.label.color = myself.buttonLabelColor;
            this.label.drawNew();
            this.add(this.label);
            this.label.setCenter(this.center());
            this.label.setLeft(this.settingsButton.right() + padding);
        };
    }

    createCategories() {
        const myself = this;

        if (this.categories) {
            this.categories.destroy();
        }
        this.categories = new Morph();
        this.categories.color = this.groupColor;
        this.categories.silentSetWidth(this.paletteWidth);

        function addCategoryButton(category) {
            const labelWidth = 75;

            const colors = [
                myself.frameColor,
                myself.frameColor.darker(50),
                SpriteMorph.prototype.blockColor[category]
            ];

            let button;

            button = new ToggleButtonMorph(
                colors,
                myself, // the IDE is the target
                () => {
                    myself.currentCategory = category;
                    myself.categories.children.forEach(each => {
                        each.refresh();
                    });
                    myself.refreshPalette(true);
                },
                category[0].toUpperCase().concat(category.slice(1)), // label
                () => // query
                myself.currentCategory === category,
                null, // env
                null, // hint
                null, // template cache
                labelWidth, // minWidth
                true // has preview
            );

            button.corner = 8;
            button.padding = 0;
            button.labelShadowOffset = new Point(-1, -1);
            button.labelShadowColor = colors[1];
            button.labelColor = myself.buttonLabelColor;
            button.fixLayout();
            button.refresh();
            myself.categories.add(button);
            return button;
        }

        function fixCategoriesLayout() {
            const buttonWidth = myself.categories.children[0].width();
            const buttonHeight = myself.categories.children[0].height();
            const border = 3;
            const rows =  Math.ceil((myself.categories.children.length) / 2);

            const xPadding = (200 // myself.logo.width()
                - border
                - buttonWidth * 2) / 3;

            const yPadding = 2;
            const l = myself.categories.left();
            const t = myself.categories.top();
            let i = 0;
            let row;
            let col;

            myself.categories.children.forEach(button => {
                i += 1;
                row = Math.ceil(i / 2);
                col = 2 - (i % 2);
                button.setPosition(new Point(
                    l + (col * xPadding + ((col - 1) * buttonWidth)),
                    t + (row * yPadding + ((row - 1) * buttonHeight) + border)
                ));
            });

            myself.categories.setHeight(
                (rows + 1) * yPadding
                    + rows * buttonHeight
                    + 2 * border
            );
        }

        SpriteMorph.prototype.categories.forEach(cat => {
            if (!contains(['lists', 'other'], cat)) {
                addCategoryButton(cat);
            }
        });
        fixCategoriesLayout();
        this.add(this.categories);
    }

    createPalette(forSearching) {
        // assumes that the logo pane has already been created
        // needs the categories pane for layout
        const myself = this;

        if (this.palette) {
            this.palette.destroy();
        }

        if (forSearching) {
            this.palette = new ScrollFrameMorph(
                null,
                null,
                this.currentSprite.sliderColor
            );
        } else {
            this.palette = this.currentSprite.palette(this.currentCategory);
        }
        this.palette.isDraggable = false;
        this.palette.acceptsDrops = true;
        this.palette.enableAutoScrolling = false;
        this.palette.contents.acceptsDrops = false;

        this.palette.reactToDropOf = (droppedMorph, hand) => {
            if (droppedMorph instanceof DialogBoxMorph) {
                myself.world().add(droppedMorph);
            } else if (droppedMorph instanceof SpriteMorph) {
                myself.removeSprite(droppedMorph);
            } else if (droppedMorph instanceof SpriteIconMorph) {
                droppedMorph.destroy();
                myself.removeSprite(droppedMorph.object);
            } else if (droppedMorph instanceof CostumeIconMorph) {
                myself.currentSprite.wearCostume(null);
                droppedMorph.perish();
            } else if (droppedMorph instanceof BlockMorph) {
                myself.stage.threads.stopAllForBlock(droppedMorph);
                if (hand && hand.grabOrigin.origin instanceof ScriptsMorph) {
                    hand.grabOrigin.origin.clearDropInfo();
                    hand.grabOrigin.origin.lastDroppedBlock = droppedMorph;
                    hand.grabOrigin.origin.recordDrop(hand.grabOrigin);
                }
                droppedMorph.perish();
            } else {
                droppedMorph.perish();
            }
        };

        this.palette.contents.reactToDropOf = droppedMorph => {
            // for "undrop" operation
            if (droppedMorph instanceof BlockMorph) {
                droppedMorph.destroy();
            }
        };

        this.palette.setWidth(this.logo.width());
        this.add(this.palette);
        return this.palette;
    }

    createPaletteHandle() {
        // assumes that the palette has already been created
        if (this.paletteHandle) {this.paletteHandle.destroy(); }
        this.paletteHandle = new PaletteHandleMorph(this.categories);
        this.add(this.paletteHandle);
    }

    createStage() {
        // assumes that the logo pane has already been created
        if (this.stage) {this.stage.destroy(); }
        StageMorph.prototype.frameRate = 0;
        this.stage = new StageMorph(this.globalVariables);
        this.stage.setExtent(this.stage.dimensions); // dimensions are fixed
        if (this.currentSprite instanceof SpriteMorph) {
            this.currentSprite.setPosition(
                this.stage.center().subtract(
                    this.currentSprite.extent().divideBy(2)
                )
            );
            this.stage.add(this.currentSprite);
        }
        this.add(this.stage);
    }

    createStageHandle() {
        // assumes that the stage has already been created
        if (this.stageHandle) {this.stageHandle.destroy(); }
        this.stageHandle = new StageHandleMorph(this.stage);
        this.add(this.stageHandle);
    }

    createSpriteBar() {
        // assumes that the categories pane has already been created
        const rotationStyleButtons = [];

        const thumbSize = new Point(45, 45);
        let nameField;
        let padlock;
        let thumbnail;
        const tabCorner = 15;
        const tabColors = this.tabColors;
        const tabBar = new AlignmentMorph('row', -tabCorner * 2);
        let tab;
        const symbols = ['\u2192', '\u21BB', '\u2194'];
        const labels = ['don\'t rotate', 'can rotate', 'only face left/right'];
        const myself = this;

        if (this.spriteBar) {
            this.spriteBar.destroy();
        }

        this.spriteBar = new Morph();
        this.spriteBar.color = this.frameColor;
        this.add(this.spriteBar);

        function addRotationStyleButton(rotationStyle) {
            const colors = myself.rotationStyleColors;
            let button;

            button = new ToggleButtonMorph(
                colors,
                myself, // the IDE is the target
                () => {
                    if (myself.currentSprite instanceof SpriteMorph) {
                        myself.currentSprite.rotationStyle = rotationStyle;
                        myself.currentSprite.changed();
                        myself.currentSprite.drawNew();
                        myself.currentSprite.changed();
                    }
                    rotationStyleButtons.forEach(each => {
                        each.refresh();
                    });
                },
                symbols[rotationStyle], // label
                () => // query
                myself.currentSprite instanceof SpriteMorph && myself.currentSprite.rotationStyle === rotationStyle,
                null, // environment
                localize(labels[rotationStyle])
            );

            button.corner = 8;
            button.labelMinExtent = new Point(11, 11);
            button.padding = 0;
            button.labelShadowOffset = new Point(-1, -1);
            button.labelShadowColor = colors[1];
            button.labelColor = myself.buttonLabelColor;
            button.fixLayout();
            button.refresh();
            rotationStyleButtons.push(button);
            button.setPosition(myself.spriteBar.position().add(2));
            button.setTop(button.top()
                + ((rotationStyleButtons.length - 1) * (button.height() + 2))
                );
            myself.spriteBar.add(button);
            if (myself.currentSprite instanceof StageMorph) {
                button.hide();
            }
            return button;
        }

        addRotationStyleButton(1);
        addRotationStyleButton(2);
        addRotationStyleButton(0);
        this.rotationStyleButtons = rotationStyleButtons;

        thumbnail = new Morph();
        thumbnail.setExtent(thumbSize);
        thumbnail.image = this.currentSprite.thumbnail(thumbSize);
        thumbnail.setPosition(
            rotationStyleButtons[0].topRight().add(new Point(5, 3))
        );
        this.spriteBar.add(thumbnail);

        thumbnail.fps = 3;

        thumbnail.step = () => {
            if (thumbnail.version !== myself.currentSprite.version) {
                thumbnail.image = myself.currentSprite.thumbnail(thumbSize);
                thumbnail.changed();
                thumbnail.version = myself.currentSprite.version;
            }
        };

        nameField = new InputFieldMorph(this.currentSprite.name);
        nameField.setWidth(100); // fixed dimensions
        nameField.contrast = 90;
        nameField.setPosition(thumbnail.topRight().add(new Point(10, 3)));
        this.spriteBar.add(nameField);
        nameField.drawNew();
        nameField.accept = () => {
            const newName = nameField.getValue();
            myself.currentSprite.setName(
                myself.newSpriteName(newName, myself.currentSprite)
            );
            nameField.setContents(myself.currentSprite.name);
        };
        this.spriteBar.reactToEdit = nameField.accept;

        // padlock
        padlock = new ToggleMorph(
            'checkbox',
            null,
            () => {
                myself.currentSprite.isDraggable =
                    !myself.currentSprite.isDraggable;
            },
            localize('draggable'),
            () => myself.currentSprite.isDraggable
        );
        padlock.label.isBold = false;
        padlock.label.setColor(this.buttonLabelColor);
        padlock.color = tabColors[2];
        padlock.highlightColor = tabColors[0];
        padlock.pressColor = tabColors[1];

        padlock.tick.shadowOffset = MorphicPreferences.isFlat ?
                new Point() : new Point(-1, -1);
        padlock.tick.shadowColor = new Color(); // black
        padlock.tick.color = this.buttonLabelColor;
        padlock.tick.isBold = false;
        padlock.tick.drawNew();

        padlock.setPosition(nameField.bottomLeft().add(2));
        padlock.drawNew();
        this.spriteBar.add(padlock);
        if (this.currentSprite instanceof StageMorph) {
            padlock.hide();
        }

        // tab bar
        tabBar.tabTo = function (tabString) {
            let active;
            myself.currentTab = tabString;
            this.children.forEach(each => {
                each.refresh();
                if (each.state) {active = each; }
            });
            active.refresh(); // needed when programmatically tabbing
            myself.createSpriteEditor();
            myself.fixLayout('tabEditor');
        };

        tab = new TabMorph(
            tabColors,
            null, // target
            () => {tabBar.tabTo('scripts'); },
            localize('Scripts'), // label
            () => // query
            myself.currentTab === 'scripts'
        );
        tab.padding = 3;
        tab.corner = tabCorner;
        tab.edge = 1;
        tab.labelShadowOffset = new Point(-1, -1);
        tab.labelShadowColor = tabColors[1];
        tab.labelColor = this.buttonLabelColor;
        tab.drawNew();
        tab.fixLayout();
        tabBar.add(tab);

        tab = new TabMorph(
            tabColors,
            null, // target
            () => {tabBar.tabTo('costumes'); },
            localize(this.currentSprite instanceof SpriteMorph ?
                'Costumes' : 'Backgrounds'
            ),
            () => // query
            myself.currentTab === 'costumes'
        );
        tab.padding = 3;
        tab.corner = tabCorner;
        tab.edge = 1;
        tab.labelShadowOffset = new Point(-1, -1);
        tab.labelShadowColor = tabColors[1];
        tab.labelColor = this.buttonLabelColor;
        tab.drawNew();
        tab.fixLayout();
        tabBar.add(tab);

        tab = new TabMorph(
            tabColors,
            null, // target
            () => {tabBar.tabTo('sounds'); },
            localize('Sounds'), // label
            () => // query
            myself.currentTab === 'sounds'
        );
        tab.padding = 3;
        tab.corner = tabCorner;
        tab.edge = 1;
        tab.labelShadowOffset = new Point(-1, -1);
        tab.labelShadowColor = tabColors[1];
        tab.labelColor = this.buttonLabelColor;
        tab.drawNew();
        tab.fixLayout();
        tabBar.add(tab);

        tabBar.fixLayout();
        tabBar.children.forEach(each => {
            each.refresh();
        });
        this.spriteBar.tabBar = tabBar;
        this.spriteBar.add(this.spriteBar.tabBar);

        this.spriteBar.fixLayout = function () {
            this.tabBar.setLeft(this.left());
            this.tabBar.setBottom(this.bottom());
        };
    }

    createSpriteEditor() {
        // assumes that the logo pane and the stage have already been created
        const scripts = this.currentSprite.scripts;

        const myself = this;

        if (this.spriteEditor) {
            this.spriteEditor.destroy();
        }

        if (this.currentTab === 'scripts') {
            scripts.isDraggable = false;
            scripts.color = this.groupColor;
            scripts.cachedTexture = this.scriptsPaneTexture;

            this.spriteEditor = new ScrollFrameMorph(
                scripts,
                null,
                this.sliderColor
            );
            this.spriteEditor.padding = 10;
            this.spriteEditor.growth = 50;
            this.spriteEditor.isDraggable = false;
            this.spriteEditor.acceptsDrops = false;
            this.spriteEditor.contents.acceptsDrops = true;

            scripts.scrollFrame = this.spriteEditor;
            scripts.updateUndropControls();
            this.add(this.spriteEditor);
            this.spriteEditor.scrollX(this.spriteEditor.padding);
            this.spriteEditor.scrollY(this.spriteEditor.padding);
        } else if (this.currentTab === 'costumes') {
            this.spriteEditor = new WardrobeMorph(
                this.currentSprite,
                this.sliderColor
            );
            this.spriteEditor.color = this.groupColor;
            this.add(this.spriteEditor);
            this.spriteEditor.updateSelection();

            this.spriteEditor.acceptsDrops = false;
            this.spriteEditor.contents.acceptsDrops = false;
        } else if (this.currentTab === 'sounds') {
            this.spriteEditor = new JukeboxMorph(
                this.currentSprite,
                this.sliderColor
            );
            this.spriteEditor.color = this.groupColor;
            this.add(this.spriteEditor);
            this.spriteEditor.updateSelection();
            this.spriteEditor.acceptDrops = false;
            this.spriteEditor.contents.acceptsDrops = false;
        } else {
            this.spriteEditor = new Morph();
            this.spriteEditor.color = this.groupColor;
            this.spriteEditor.acceptsDrops = true;
            this.spriteEditor.reactToDropOf = droppedMorph => {
                if (droppedMorph instanceof DialogBoxMorph) {
                    myself.world().add(droppedMorph);
                } else if (droppedMorph instanceof SpriteMorph) {
                    myself.removeSprite(droppedMorph);
                } else {
                    droppedMorph.destroy();
                }
            };
            this.add(this.spriteEditor);
        }
    }

    createCorralBar() {
        // assumes the stage has already been created
        const padding = 5;

        let newbutton;
        let paintbutton;
        let cambutton;

        const colors = [
            this.groupColor,
            this.frameColor.darker(50),
            this.frameColor.darker(50)
        ];

        if (this.corralBar) {
            this.corralBar.destroy();
        }

        this.corralBar = new Morph();
        this.corralBar.color = this.frameColor;
        this.corralBar.setHeight(this.logo.height()); // height is fixed
        this.add(this.corralBar);

        // new sprite button
        newbutton = new PushButtonMorph(
            this,
            "addNewSprite",
            new SymbolMorph("turtle", 14)
        );
        newbutton.corner = 12;
        newbutton.color = colors[0];
        newbutton.highlightColor = colors[1];
        newbutton.pressColor = colors[2];
        newbutton.labelMinExtent = new Point(36, 18);
        newbutton.padding = 0;
        newbutton.labelShadowOffset = new Point(-1, -1);
        newbutton.labelShadowColor = colors[1];
        newbutton.labelColor = this.buttonLabelColor;
        newbutton.contrast = this.buttonContrast;
        newbutton.drawNew();
        newbutton.hint = "add a new Turtle sprite";
        newbutton.fixLayout();
        newbutton.setCenter(this.corralBar.center());
        newbutton.setLeft(this.corralBar.left() + padding);
        this.corralBar.add(newbutton);

        paintbutton = new PushButtonMorph(
            this,
            "paintNewSprite",
            new SymbolMorph("brush", 15)
        );
        paintbutton.corner = 12;
        paintbutton.color = colors[0];
        paintbutton.highlightColor = colors[1];
        paintbutton.pressColor = colors[2];
        paintbutton.labelMinExtent = new Point(36, 18);
        paintbutton.padding = 0;
        paintbutton.labelShadowOffset = new Point(-1, -1);
        paintbutton.labelShadowColor = colors[1];
        paintbutton.labelColor = this.buttonLabelColor;
        paintbutton.contrast = this.buttonContrast;
        paintbutton.drawNew();
        paintbutton.hint = "paint a new sprite";
        paintbutton.fixLayout();
        paintbutton.setCenter(this.corralBar.center());
        paintbutton.setLeft(
            this.corralBar.left() + padding + newbutton.width() + padding
        );
        this.corralBar.add(paintbutton);

        if (CamSnapshotDialogMorph.prototype.enableCamera) {
            cambutton = new PushButtonMorph(
                this,
                "newCamSprite",
                new SymbolMorph("camera", 15)
            );
            cambutton.corner = 12;
            cambutton.color = colors[0];
            cambutton.highlightColor = colors[1];
            cambutton.pressColor = colors[2];
            cambutton.labelMinExtent = new Point(36, 18);
            cambutton.padding = 0;
            cambutton.labelShadowOffset = new Point(-1, -1);
            cambutton.labelShadowColor = colors[1];
            cambutton.labelColor = this.buttonLabelColor;
            cambutton.contrast = this.buttonContrast;
            cambutton.drawNew();
            cambutton.hint = "take a camera snapshot and\nimport it as a new sprite";
            cambutton.fixLayout();
            cambutton.setCenter(this.corralBar.center());
            cambutton.setLeft(
                this.corralBar.left() +
                padding +
                newbutton.width() +
                padding +
                paintbutton.width() +
                padding
            );
            if (location.protocol === 'http:') {
                cambutton.hint = 'Due to browser security policies, you need to\n' +
                    'access Snap! through HTTPS to use the camera.\n\n' +
                    'Plase replace the "http://" part of the address\n' +
                    'in your browser by "https://" and try again.';
                cambutton.disable();
            }
            this.corralBar.add(cambutton);
        }
    }

    createCorral() {
        // assumes the corral bar has already been created
        let frame;

        let template;
        const padding = 5;
        const myself = this;

        this.createStageHandle();
        this.createPaletteHandle();

        if (this.corral) {
            this.corral.destroy();
        }

        this.corral = new Morph();
        this.corral.color = this.groupColor;
        this.add(this.corral);

        this.corral.stageIcon = new SpriteIconMorph(this.stage);
        this.corral.stageIcon.isDraggable = false;
        this.corral.add(this.corral.stageIcon);

        frame = new ScrollFrameMorph(null, null, this.sliderColor);
        frame.acceptsDrops = false;
        frame.contents.acceptsDrops = false;

        frame.contents.wantsDropOf = morph => morph instanceof SpriteIconMorph;

        frame.contents.reactToDropOf = spriteIcon => {
            myself.corral.reactToDropOf(spriteIcon);
        };

        frame.alpha = 0;

        this.sprites.asArray().forEach(morph => {
            if (!morph.isTemporary) {
                template = new SpriteIconMorph(morph, template);
                frame.contents.add(template);
            }
        });

        this.corral.frame = frame;
        this.corral.add(frame);

        this.corral.fixLayout = function () {
            this.stageIcon.setCenter(this.center());
            this.stageIcon.setLeft(this.left() + padding);
            this.frame.setLeft(this.stageIcon.right() + padding);
            this.frame.setExtent(new Point(
                this.right() - this.frame.left(),
                this.height()
            ));
            this.arrangeIcons();
            this.refresh();
        };

        this.corral.arrangeIcons = function () {
            let x = this.frame.left();
            let y = this.frame.top();
            const max = this.frame.right();
            const start = this.frame.left();

            this.frame.contents.children.forEach(icon => {
                const w = icon.width();

                if (x + w > max) {
                    x = start;
                    y += icon.height(); // they're all the same
                }
                icon.setPosition(new Point(x, y));
                x += w;
            });
            this.frame.contents.adjustBounds();
        };

        this.corral.addSprite = function (sprite) {
            this.frame.contents.add(new SpriteIconMorph(sprite));
            this.fixLayout();
        };

        this.corral.refresh = function () {
            this.stageIcon.refresh();
            this.frame.contents.children.forEach(icon => {
                icon.refresh();
            });
        };

        this.corral.wantsDropOf = morph => morph instanceof SpriteIconMorph;

        this.corral.reactToDropOf = function (spriteIcon) {
            let idx = 1;
            const pos = spriteIcon.position();
            spriteIcon.destroy();
            this.frame.contents.children.forEach(icon => {
                if (pos.gt(icon.position()) || pos.y > icon.bottom()) {
                    idx += 1;
                }
            });
            myself.sprites.add(spriteIcon.object, idx);
            myself.createCorral();
            myself.fixLayout();
        };
    }

    // IDE_Morph layout

    fixLayout(situation) {
        // situation is a string, i.e.
        // 'selectSprite' or 'refreshPalette' or 'tabEditor'
        const padding = this.padding;

        let maxPaletteWidth;

        Morph.prototype.trackChanges = false;

        if (situation !== 'refreshPalette') {
            // controlBar
            this.controlBar.setPosition(this.logo.topRight());
            this.controlBar.setWidth(this.right() - this.controlBar.left());
            this.controlBar.fixLayout();

            // categories
            this.categories.setLeft(this.logo.left());
            this.categories.setTop(this.logo.bottom());
            this.categories.setWidth(this.paletteWidth);
        }

        // palette
        this.palette.setLeft(this.logo.left());
        this.palette.setTop(this.categories.bottom());
        this.palette.setHeight(this.bottom() - this.palette.top());
        this.palette.setWidth(this.paletteWidth);

        if (situation !== 'refreshPalette') {
            // stage
            if (this.isAppMode) {
                this.stage.setScale(Math.floor(Math.min(
                    (this.width() - padding * 2) / this.stage.dimensions.x,
                    (this.height() - this.controlBar.height() * 2 - padding * 2)
                        / this.stage.dimensions.y
                ) * 10) / 10);
                this.stage.setCenter(this.center());
            } else {
                this.stage.setScale(this.isSmallStage ? this.stageRatio : 1);
                this.stage.setTop(this.logo.bottom() + padding);
                this.stage.setRight(this.right());
                maxPaletteWidth = Math.max(
                    200,
                    this.width() -
                        this.stage.width() -
                        this.spriteBar.tabBar.width() -
                        (this.padding * 2)
                );
                if (this.paletteWidth > maxPaletteWidth) {
                    this.paletteWidth = maxPaletteWidth;
                    this.fixLayout();
                }
                this.stageHandle.fixLayout();
                this.paletteHandle.fixLayout();
            }

            // spriteBar
            this.spriteBar.setLeft(this.paletteWidth + padding);
            this.spriteBar.setTop(this.logo.bottom() + padding);
            this.spriteBar.setExtent(new Point(
                Math.max(0, this.stage.left() - padding - this.spriteBar.left()),
                this.categories.bottom() - this.spriteBar.top() - padding
            ));
            this.spriteBar.fixLayout();

            // spriteEditor
            if (this.spriteEditor.isVisible) {
                this.spriteEditor.setPosition(this.spriteBar.bottomLeft());
                this.spriteEditor.setExtent(new Point(
                    this.spriteBar.width(),
                    this.bottom() - this.spriteEditor.top()
                ));
            }

            // corralBar
            this.corralBar.setLeft(this.stage.left());
            this.corralBar.setTop(this.stage.bottom() + padding);
            this.corralBar.setWidth(this.stage.width());

            // corral
            if (!contains(['selectSprite', 'tabEditor'], situation)) {
                this.corral.setPosition(this.corralBar.bottomLeft());
                this.corral.setWidth(this.stage.width());
                this.corral.setHeight(this.bottom() - this.corral.top());
                this.corral.fixLayout();
            }
        }

        Morph.prototype.trackChanges = true;
        this.changed();
    }

    setProjectName(string) {
        this.projectName = string.replace(/['"]/g, ''); // filter quotation marks
        this.hasChangedMedia = true;
        this.controlBar.updateLabel();
    }

    // IDE_Morph resizing

    setExtent(point) {
        const padding = new Point(430, 110);
        let minExt;
        let ext;
        let maxWidth;
        let minWidth;
        let maxHeight;
        let minRatio;
        let maxRatio;

        // determine the minimum dimensions making sense for the current mode
        if (this.isAppMode) {
            minExt = StageMorph.prototype.dimensions.add(
                this.controlBar.height() + 10
            );
        } else {
            if (this.stageRatio > 1) {
                minExt = padding.add(StageMorph.prototype.dimensions);
            } else {
                minExt = padding.add(
                    StageMorph.prototype.dimensions.multiplyBy(this.stageRatio)
                );
            }
        }
        ext = point.max(minExt);

        // adjust stage ratio if necessary
        maxWidth = ext.x -
            (200 + this.spriteBar.tabBar.width() + (this.padding * 2));
        minWidth = SpriteIconMorph.prototype.thumbSize.x * 3;
        maxHeight = (ext.y - SpriteIconMorph.prototype.thumbSize.y * 3.5);
        minRatio = minWidth / this.stage.dimensions.x;
        maxRatio = Math.min(
            (maxWidth / this.stage.dimensions.x),
            (maxHeight / this.stage.dimensions.y)
        );
        this.stageRatio = Math.min(maxRatio, Math.max(minRatio, this.stageRatio));

        // apply
        super.setExtent.call(this, ext);
        this.fixLayout();
    }

    // IDE_Morph events

    reactToWorldResize(rect) {
        if (this.isAutoFill) {
            this.setPosition(rect.origin);
            this.setExtent(rect.extent());
        }
        if (this.filePicker) {
            document.body.removeChild(this.filePicker);
            this.filePicker = null;
        }
    }

    droppedImage(aCanvas, name) {
        const costume = new Costume(
            aCanvas,
            this.currentSprite.newCostumeName(
                name ? name.split('.')[0] : '' // up to period
            )
        );

        if (costume.isTainted()) {
            this.inform(
                'Unable to import this image',
                'The picture you wish to import has been\n' +
                    'tainted by a restrictive cross-origin policy\n' +
                    'making it unusable for costumes in Snap!. \n\n' +
                    'Try downloading this picture first to your\n' +
                    'computer, and import it from there.'
            );
            return;
        }

        this.currentSprite.addCostume(costume);
        this.currentSprite.wearCostume(costume);
        this.spriteBar.tabBar.tabTo('costumes');
        this.hasChangedMedia = true;
    }

    droppedSVG(anImage, name) {
        const costume = new SVG_Costume(anImage, name.split('.')[0]);
        this.currentSprite.addCostume(costume);
        this.currentSprite.wearCostume(costume);
        this.spriteBar.tabBar.tabTo('costumes');
        this.hasChangedMedia = true;
    }

    droppedAudio(anAudio, name) {
        this.currentSprite.addSound(anAudio, name.split('.')[0]); // up to period
        this.spriteBar.tabBar.tabTo('sounds');
        this.hasChangedMedia = true;
    }

    droppedText(aString, name) {
        const lbl = name ? name.split('.')[0] : '';
        if (aString.indexOf('<project') === 0) {
            location.hash = '';
            return this.openProjectString(aString);
        }
        if (aString.indexOf('<snapdata') === 0) {
            location.hash = '';
            return this.openCloudDataString(aString);
        }
        if (aString.indexOf('<blocks') === 0) {
            return this.openBlocksString(aString, lbl, true);
        }
        if (aString.indexOf('<sprites') === 0) {
            return this.openSpritesString(aString);
        }
        if (aString.indexOf('<media') === 0) {
            return this.openMediaString(aString);
        }
    }

    droppedBinary(anArrayBuffer, name) {
        // dynamically load ypr->Snap!
        let ypr = document.getElementById('ypr');

        const myself = this;
        const suffix = name.substring(name.length - 3);

        if (suffix.toLowerCase() !== 'ypr') {return; }

        function loadYPR(buffer, lbl) {
            const reader = new sb.Reader(); // up to period
            const pname = lbl.split('.')[0];
            reader.onload = info => {
                myself.droppedText(new sb.XMLWriter().write(pname, info));
            };
            reader.readYPR(new Uint8Array(buffer));
        }

        if (!ypr) {
            ypr = document.createElement('script');
            ypr.id = 'ypr';
            ypr.onload = () => {loadYPR(anArrayBuffer, name); };
            document.head.appendChild(ypr);
            ypr.src = 'ypr.js';
        } else {
            loadYPR(anArrayBuffer, name);
        }
    }

    // IDE_Morph button actions

    refreshPalette(shouldIgnorePosition) {
        const oldTop = this.palette.contents.top();

        this.createPalette();
        this.fixLayout('refreshPalette');
        if (!shouldIgnorePosition) {
            this.palette.contents.setTop(oldTop);
        }
    }

    pressStart() {
        if (this.world().currentKey === 16) { // shiftClicked
            this.toggleFastTracking();
        } else {
            this.stage.threads.pauseCustomHatBlocks = false;
            this.controlBar.stopButton.refresh();
            this.runScripts();
        }
    }

    toggleFastTracking() {
        if (this.stage.isFastTracked) {
            this.stopFastTracking();
        } else {
            this.startFastTracking();
        }
    }

    toggleVariableFrameRate() {
        if (StageMorph.prototype.frameRate) {
            StageMorph.prototype.frameRate = 0;
            this.stage.fps = 0;
        } else {
            StageMorph.prototype.frameRate = 30;
            this.stage.fps = 30;
        }
    }

    toggleSingleStepping() {
        this.stage.threads.toggleSingleStepping();
        this.controlBar.refreshSlider();
    }

    toggleCameraSupport() {
        CamSnapshotDialogMorph.prototype.enableCamera =
            !CamSnapshotDialogMorph.prototype.enableCamera;
        this.spriteBar.tabBar.tabTo(this.currentTab);
        this.createCorralBar();
        this.fixLayout();
    }

    startFastTracking() {
        this.stage.isFastTracked = true;
        this.stage.fps = 0;
        this.controlBar.startButton.labelString = new SymbolMorph('flash', 14);
        this.controlBar.startButton.drawNew();
        this.controlBar.startButton.fixLayout();
    }

    stopFastTracking() {
        this.stage.isFastTracked = false;
        this.stage.fps = this.stage.frameRate;
        this.controlBar.startButton.labelString = new SymbolMorph('flag', 14);
        this.controlBar.startButton.drawNew();
        this.controlBar.startButton.fixLayout();
    }

    runScripts() {
        this.stage.fireGreenFlagEvent();
    }

    togglePauseResume() {
        if (this.stage.threads.isPaused()) {
            this.stage.threads.resumeAll(this.stage);
        } else {
            this.stage.threads.pauseAll(this.stage);
        }
        this.controlBar.pauseButton.refresh();
    }

    isPaused() {
        if (!this.stage) {return false; }
        return this.stage.threads.isPaused();
    }

    stopAllScripts() {
        if (this.stage.enableCustomHatBlocks) {
            this.stage.threads.pauseCustomHatBlocks =
                !this.stage.threads.pauseCustomHatBlocks;
        } else {
            this.stage.threads.pauseCustomHatBlocks = false;
        }
        this.controlBar.stopButton.refresh();
        this.stage.fireStopAllEvent();
    }

    selectSprite(sprite) {
        if (this.currentSprite && this.currentSprite.scripts.focus) {
            this.currentSprite.scripts.focus.stopEditing();
        }
        this.currentSprite = sprite;
        this.createPalette();
        this.createSpriteBar();
        this.createSpriteEditor();
        this.corral.refresh();
        this.fixLayout('selectSprite');
        this.currentSprite.scripts.fixMultiArgs();
    }

    // IDE_Morph retina display support

    toggleRetina() {
        if (isRetinaEnabled()) {
            disableRetinaSupport();
        } else {
            enableRetinaSupport();
        }
        this.world().fillPage();
        IDE_Morph.prototype.scriptsPaneTexture = this.scriptsTexture();
        this.stage.clearPenTrails();
        this.drawNew();
        this.refreshIDE();
    }

    // IDE_Morph skins

    defaultDesign() {
        this.setDefaultDesign();
        this.refreshIDE();
        this.removeSetting('design');
    }

    flatDesign() {
        this.setFlatDesign();
        this.refreshIDE();
        this.saveSetting('design', 'flat');
    }

    refreshIDE() {
        let projectData;

        if (Process.prototype.isCatchingErrors) {
            try {
                projectData = this.serializer.serialize(this.stage);
            } catch (err) {
                this.showMessage(`Serialization failed: ${err}`);
            }
        } else {
            projectData = this.serializer.serialize(this.stage);
        }
        SpriteMorph.prototype.initBlocks();
        this.buildPanes();
        this.fixLayout();
        if (this.loadNewProject) {
            this.newProject();
        } else {
            this.openProjectString(projectData);
        }
    }

    // IDE_Morph settings persistance

    applySavedSettings() {
        const design = this.getSetting('design');
        const zoom = this.getSetting('zoom');
        const language = this.getSetting('language');
        const click = this.getSetting('click');
        const longform = this.getSetting('longform');
        const longurls = this.getSetting('longurls');
        const plainprototype = this.getSetting('plainprototype');
        const keyboard = this.getSetting('keyboard');
        const tables = this.getSetting('tables');
        const tableLines = this.getSetting('tableLines');
        const autoWrapping = this.getSetting('autowrapping');

        // design
        if (design === 'flat') {
            this.setFlatDesign();
        } else {
            this.setDefaultDesign();
        }

        // blocks zoom
        if (zoom) {
            SyntaxElementMorph.prototype.setScale(Math.min(zoom, 12));
            CommentMorph.prototype.refreshScale();
            SpriteMorph.prototype.initBlocks();
        }

        // language
        if (language && language !== 'en') {
            this.userLanguage = language;
        } else {
            this.userLanguage = null;
        }

        //  click
        if (click && !BlockMorph.prototype.snapSound) {
            BlockMorph.prototype.toggleSnapSound();
        }

        // long form
        if (longform) {
            InputSlotDialogMorph.prototype.isLaunchingExpanded = true;
        }

        // project data in URLs
        if (longurls) {
            this.projectsInURLs = true;
        } else {
            this.projectsInURLs = false;
        }

        // keyboard editing
        if (keyboard === 'false') {
            ScriptsMorph.prototype.enableKeyboard = false;
        } else {
            ScriptsMorph.prototype.enableKeyboard = true;
        }

        // tables
        if (tables === 'false') {
            List.prototype.enableTables = false;
        } else {
            List.prototype.enableTables = true;
        }

        // tableLines
        if (tableLines) {
            TableMorph.prototype.highContrast = true;
        } else {
            TableMorph.prototype.highContrast = false;
        }

        // nested auto-wrapping
        if (autoWrapping === 'false') {
            ScriptsMorph.prototype.enableNestedAutoWrapping = false;
        } else {
            ScriptsMorph.prototype.enableNestedAutoWrapping = true;
        }

        // plain prototype labels
        if (plainprototype) {
            BlockLabelPlaceHolderMorph.prototype.plainLabel = true;
        }
    }

    saveSetting(key, value) {
        if (!this.savingPreferences) {
            return;
        }
        if (localStorage) {
            localStorage[`-snap-setting-${key}`] = value;
        }
    }

    getSetting(key) {
        if (localStorage) {
            return localStorage[`-snap-setting-${key}`];
        }
        return null;
    }

    removeSetting(key) {
        if (localStorage) {
            delete localStorage[`-snap-setting-${key}`];
        }
    }

    // IDE_Morph sprite list access

    addNewSprite() {
        const sprite = new SpriteMorph(this.globalVariables);
        const rnd = Process.prototype.reportRandom;

        sprite.name = this.newSpriteName(sprite.name);
        sprite.setCenter(this.stage.center());
        this.stage.add(sprite);

        // randomize sprite properties
        sprite.setHue(rnd.call(this, 0, 100));
        sprite.setBrightness(rnd.call(this, 50, 100));
        sprite.turn(rnd.call(this, 1, 360));
        sprite.setXPosition(rnd.call(this, -220, 220));
        sprite.setYPosition(rnd.call(this, -160, 160));

        this.sprites.add(sprite);
        this.corral.addSprite(sprite);
        this.selectSprite(sprite);
    }

    paintNewSprite() {
        const sprite = new SpriteMorph(this.globalVariables);
        const cos = new Costume();
        const myself = this;

        sprite.name = this.newSpriteName(sprite.name);
        sprite.setCenter(this.stage.center());
        this.stage.add(sprite);
        this.sprites.add(sprite);
        this.corral.addSprite(sprite);
        this.selectSprite(sprite);
        cos.edit(
            this.world(),
            this,
            true,
            () => {myself.removeSprite(sprite); },
            () => {
                sprite.addCostume(cos);
                sprite.wearCostume(cos);
            }
        );
    }

    newCamSprite() {
        const sprite = new SpriteMorph(this.globalVariables);
        let camDialog;
        const myself = this;

        sprite.name = this.newSpriteName(sprite.name);
        sprite.setCenter(this.stage.center());
        this.stage.add(sprite);
        this.sprites.add(sprite);
        this.corral.addSprite(sprite);
        this.selectSprite(sprite);

        camDialog = new CamSnapshotDialogMorph(
            this,
            sprite,
            () => { myself.removeSprite(sprite); },
            costume => {
                sprite.addCostume(costume);
                sprite.wearCostume(costume);
            });

        camDialog.popUp(this.world());
    }

    duplicateSprite(sprite) {
        const duplicate = sprite.fullCopy();
        duplicate.setPosition(this.world().hand.position());
        duplicate.appearIn(this);
        duplicate.keepWithin(this.stage);
        this.selectSprite(duplicate);
    }

    instantiateSprite(sprite) {
        const instance = sprite.fullCopy(true);
        const hats = instance.allHatBlocksFor('__clone__init__');
        instance.appearIn(this);
        if (hats.length) {
            instance.initClone(hats);
        } else {
            instance.setPosition(this.world().hand.position());
            instance.keepWithin(this.stage);
        }
        this.selectSprite(instance);
    }

    removeSprite(sprite) {
        let idx;
        const myself = this;
        sprite.parts.forEach(part => {myself.removeSprite(part); });
        idx = this.sprites.asArray().indexOf(sprite) + 1;
        this.stage.threads.stopAllForReceiver(sprite);
        sprite.corpsify();
        sprite.destroy();
        this.stage.watchers().forEach(watcher => {
            if (watcher.object() === sprite) {
                watcher.destroy();
            }
        });
        if (idx > 0) {
            this.sprites.remove(idx);
        }
        this.createCorral();
        this.fixLayout();
        this.currentSprite = detect(
            this.stage.children,
            morph => morph instanceof SpriteMorph && !morph.isTemporary
        ) || this.stage;

        this.selectSprite(this.currentSprite);
    }

    newSpriteName(name, ignoredSprite) {
        const ix = name.indexOf('(');
        const stem = (ix < 0) ? name : name.substring(0, ix);
        let count = 1;
        let newName = stem;

        const all = this.sprites.asArray().concat(this.stage).filter(
            each => each !== ignoredSprite
        ).map(
            each => each.name
        );

        while (contains(all, newName)) {
            count += 1;
            newName = `${stem}(${count})`;
        }
        return newName;
    }

    // IDE_Morph deleting scripts

    removeBlock(aBlock, justThis) {
        this.stage.threads.stopAllForBlock(aBlock);
        aBlock.destroy(justThis);
    }

    // IDE_Morph menus

    userMenu() {
        const menu = new MenuMorph(this);
        // menu.addItem('help', 'nop');
        return menu;
    }

    snapMenu() {
        let menu;
        const myself = this;
        const world = this.world();

        menu = new MenuMorph(this);
        menu.addItem('About...', 'aboutSnap');
        menu.addLine();
        menu.addItem(
            'Reference manual',
            () => {
                const url = myself.resourceURL('help', 'SnapManual.pdf');
                window.open(url, 'SnapReferenceManual');
            }
        );
        menu.addItem(
            'Snap! website',
            () => {
                window.open('http://snap.berkeley.edu/', 'SnapWebsite');
            }
        );
        menu.addItem(
            'Download source',
            () => {
                window.open(
                    'http://snap.berkeley.edu/snapsource/snap.zip',
                    'SnapSource'
                );
            }
        );
        if (world.isDevMode) {
            menu.addLine();
            menu.addItem(
                'Switch back to user mode',
                'switchToUserMode',
                'disable deep-Morphic\ncontext menus'
                    + '\nand show user-friendly ones',
                new Color(0, 100, 0)
            );
        } else if (world.currentKey === 16) { // shift-click
            menu.addLine();
            menu.addItem(
                'Switch to dev mode',
                'switchToDevMode',
                'enable Morphic\ncontext menus\nand inspectors,'
                    + '\nnot user-friendly!',
                new Color(100, 0, 0)
            );
        }
        menu.popup(world, this.logo.bottomLeft());
    }

    cloudMenu() {
        let menu;
        const myself = this;
        const world = this.world();
        const pos = this.controlBar.cloudButton.bottomLeft();
        const shiftClicked = (world.currentKey === 16);

        menu = new MenuMorph(this);
        if (shiftClicked) {
            menu.addItem(
                'url...',
                'setCloudURL',
                null,
                new Color(100, 0, 0)
            );
            menu.addLine();
        }
        if (!SnapCloud.username) {
            menu.addItem(
                'Login...',
                'initializeCloud'
            );
            menu.addItem(
                'Signup...',
                'createCloudAccount'
            );
            menu.addItem(
                'Reset Password...',
                'resetCloudPassword'
            );
        } else {
            menu.addItem(
                `${localize('Logout')} ${SnapCloud.username}`,
                'logout'
            );
            menu.addItem(
                'Change Password...',
                'changeCloudPassword'
            );
        }
        if (shiftClicked) {
            menu.addLine();
            menu.addItem(
                'export project media only...',
                () => {
                    if (myself.projectName) {
                        myself.exportProjectMedia(myself.projectName);
                    } else {
                        myself.prompt('Export Project As...', name => {
                            myself.exportProjectMedia(name);
                        }, null, 'exportProject');
                    }
                },
                null,
                this.hasChangedMedia ? new Color(100, 0, 0) : new Color(0, 100, 0)
            );
            menu.addItem(
                'export project without media...',
                () => {
                    if (myself.projectName) {
                        myself.exportProjectNoMedia(myself.projectName);
                    } else {
                        myself.prompt('Export Project As...', name => {
                            myself.exportProjectNoMedia(name);
                        }, null, 'exportProject');
                    }
                },
                null,
                new Color(100, 0, 0)
            );
            menu.addItem(
                'export project as cloud data...',
                () => {
                    if (myself.projectName) {
                        myself.exportProjectAsCloudData(myself.projectName);
                    } else {
                        myself.prompt('Export Project As...', name => {
                            myself.exportProjectAsCloudData(name);
                        }, null, 'exportProject');
                    }
                },
                null,
                new Color(100, 0, 0)
            );
            menu.addLine();
            menu.addItem(
                'open shared project from cloud...',
                () => {
                    myself.prompt('Author name…', usr => {
                        myself.prompt('Project name...', prj => {
                            const id = `Username=${encodeURIComponent(usr.toLowerCase())}&ProjectName=${encodeURIComponent(prj)}`;
                            myself.showMessage(
                                'Fetching project\nfrom the cloud...'
                            );
                            SnapCloud.getPublicProject(
                                id,
                                projectData => {
                                    let msg;
                                    if (!Process.prototype.isCatchingErrors) {
                                        window.open(
                                            `data:text/xml,${projectData}`
                                        );
                                    }
                                    myself.nextSteps([
                                        () => {
                                            msg = myself.showMessage(
                                                'Opening project...'
                                            );
                                        },
                                        () => {nop(); },
                                        () => {
                                            myself.rawOpenCloudDataString(
                                                projectData
                                            );
                                        },
                                        () => {
                                            msg.destroy();
                                        }
                                    ]);
                                },
                                myself.cloudError()
                            );

                        }, null, 'project');
                    }, null, 'project');
                },
                null,
                new Color(100, 0, 0)
            );
        }
        menu.popup(world, pos);
    }

    settingsMenu() {
        let menu;
        const stage = this.stage;
        const world = this.world();
        const myself = this;
        const pos = this.controlBar.settingsButton.bottomLeft();
        const shiftClicked = (world.currentKey === 16);

        function addPreference(label, toggle, test, onHint, offHint, hide) {
            const on = '\u2611 ';
            const off = '\u2610 ';
            if (!hide || shiftClicked) {
                menu.addItem(
                    (test ? on : off) + localize(label),
                    toggle,
                    test ? onHint : offHint,
                    hide ? new Color(100, 0, 0) : null
                );
            }
        }

        menu = new MenuMorph(this);
        menu.addItem('Language...', 'languageMenu');
        menu.addItem(
            'Zoom blocks...',
            'userSetBlocksScale'
        );
        menu.addItem(
            'Stage size...',
            'userSetStageSize'
        );
        if (shiftClicked) {
            menu.addItem(
                'Dragging threshold...',
                'userSetDragThreshold',
                'specify the distance the hand has to move\n' +
                    'before it picks up an object',
                new Color(100, 0, 0)
            );
        }
        menu.addLine();
        /*
        addPreference(
            'JavaScript',
            function () {
                Process.prototype.enableJS = !Process.prototype.enableJS;
                myself.currentSprite.blocksCache.operators = null;
                myself.currentSprite.paletteCache.operators = null;
                myself.refreshPalette();
            },
            Process.prototype.enableJS,
            'uncheck to disable support for\nnative JavaScript functions',
            'check to support\nnative JavaScript functions'
        );
        */
        if (isRetinaSupported()) {
            addPreference(
                'Retina display support',
                'toggleRetina',
                isRetinaEnabled(),
                'uncheck for lower resolution,\nsaves computing resources',
                'check for higher resolution,\nuses more computing resources'
            );
        }
        addPreference(
            'Input sliders',
            'toggleInputSliders',
            MorphicPreferences.useSliderForInput,
            'uncheck to disable\ninput sliders for\nentry fields',
            'check to enable\ninput sliders for\nentry fields'
        );
        if (MorphicPreferences.useSliderForInput) {
            addPreference(
                'Execute on slider change',
                'toggleSliderExecute',
                ArgMorph.prototype.executeOnSliderEdit,
                'uncheck to suppress\nrunning scripts\nwhen moving the slider',
                'check to run\nthe edited script\nwhen moving the slider'
            );
        }
        addPreference(
            'Turbo mode',
            'toggleFastTracking',
            this.stage.isFastTracked,
            'uncheck to run scripts\nat normal speed',
            'check to prioritize\nscript execution'
        );
        addPreference(
            'Visible stepping',
            'toggleSingleStepping',
            Process.prototype.enableSingleStepping,
            'uncheck to turn off\nvisible stepping',
            'check to turn on\n visible stepping (slow)',
            false
        );
        addPreference(
            'Camera support',
            'toggleCameraSupport',
            CamSnapshotDialogMorph.prototype.enableCamera,
            'uncheck to disable\ncamera support',
            'check to enable\ncamera support',
            true
        );
        menu.addLine(); // everything visible below is persistent
        addPreference(
            'Blurred shadows',
            'toggleBlurredShadows',
            useBlurredShadows,
            'uncheck to use solid drop\nshadows and highlights',
            'check to use blurred drop\nshadows and highlights',
            true
        );
        addPreference(
            'Zebra coloring',
            'toggleZebraColoring',
            BlockMorph.prototype.zebraContrast,
            'uncheck to disable alternating\ncolors for nested block',
            'check to enable alternating\ncolors for nested blocks',
            true
        );
        addPreference(
            'Dynamic input labels',
            'toggleDynamicInputLabels',
            SyntaxElementMorph.prototype.dynamicInputLabels,
            'uncheck to disable dynamic\nlabels for variadic inputs',
            'check to enable dynamic\nlabels for variadic inputs',
            true
        );
        addPreference(
            'Prefer empty slot drops',
            'togglePreferEmptySlotDrops',
            ScriptsMorph.prototype.isPreferringEmptySlots,
            'uncheck to allow dropped\nreporters to kick out others',
            'settings menu prefer empty slots hint',
            true
        );
        addPreference(
            'Long form input dialog',
            'toggleLongFormInputDialog',
            InputSlotDialogMorph.prototype.isLaunchingExpanded,
            'uncheck to use the input\ndialog in short form',
            'check to always show slot\ntypes in the input dialog'
        );
        addPreference(
            'Plain prototype labels',
            'togglePlainPrototypeLabels',
            BlockLabelPlaceHolderMorph.prototype.plainLabel,
            'uncheck to always show (+) symbols\nin block prototype labels',
            'check to hide (+) symbols\nin block prototype labels'
        );
        addPreference(
            'Virtual keyboard',
            'toggleVirtualKeyboard',
            MorphicPreferences.useVirtualKeyboard,
            'uncheck to disable\nvirtual keyboard support\nfor mobile devices',
            'check to enable\nvirtual keyboard support\nfor mobile devices',
            true
        );
        addPreference(
            'Clicking sound',
            () => {
                BlockMorph.prototype.toggleSnapSound();
                if (BlockMorph.prototype.snapSound) {
                    myself.saveSetting('click', true);
                } else {
                    myself.removeSetting('click');
                }
            },
            BlockMorph.prototype.snapSound,
            'uncheck to turn\nblock clicking\nsound off',
            'check to turn\nblock clicking\nsound on'
        );
        addPreference(
            'Animations',
            () => {myself.isAnimating = !myself.isAnimating; },
            myself.isAnimating,
            'uncheck to disable\nIDE animations',
            'check to enable\nIDE animations',
            true
        );
        addPreference(
            'Cache Inputs',
            () => {
                BlockMorph.prototype.isCachingInputs =
                    !BlockMorph.prototype.isCachingInputs;
            },
            BlockMorph.prototype.isCachingInputs,
            'uncheck to stop caching\ninputs (for debugging the evaluator)',
            'check to cache inputs\nboosts recursion',
            true
        );
        addPreference(
            'Rasterize SVGs',
            () => {
                MorphicPreferences.rasterizeSVGs =
                    !MorphicPreferences.rasterizeSVGs;
            },
            MorphicPreferences.rasterizeSVGs,
            'uncheck for smooth\nscaling of vector costumes',
            'check to rasterize\nSVGs on import',
            true
        );
        addPreference(
            'Flat design',
            () => {
                if (MorphicPreferences.isFlat) {
                    return myself.defaultDesign();
                }
                myself.flatDesign();
            },
            MorphicPreferences.isFlat,
            'uncheck for default\nGUI design',
            'check for alternative\nGUI design',
            false
        );
        addPreference(
            'Nested auto-wrapping',
            () => {
                ScriptsMorph.prototype.enableNestedAutoWrapping =
                    !ScriptsMorph.prototype.enableNestedAutoWrapping;
                if (ScriptsMorph.prototype.enableNestedAutoWrapping) {
                    myself.removeSetting('autowrapping');
                } else {
                    myself.saveSetting('autowrapping', false);
                }
            },
            ScriptsMorph.prototype.enableNestedAutoWrapping,
            'uncheck to confine auto-wrapping\nto top-level block stacks',
            'check to enable auto-wrapping\ninside nested block stacks',
            true
        );
        addPreference(
            'Project URLs',
            () => {
                myself.projectsInURLs = !myself.projectsInURLs;
                if (myself.projectsInURLs) {
                    myself.saveSetting('longurls', true);
                } else {
                    myself.removeSetting('longurls');
                }
            },
            myself.projectsInURLs,
            'uncheck to disable\nproject data in URLs',
            'check to enable\nproject data in URLs',
            true
        );
        addPreference(
            'Sprite Nesting',
            () => {
                SpriteMorph.prototype.enableNesting =
                    !SpriteMorph.prototype.enableNesting;
            },
            SpriteMorph.prototype.enableNesting,
            'uncheck to disable\nsprite composition',
            'check to enable\nsprite composition',
            true
        );
        addPreference(
            'First-Class Sprites',
            () => {
                SpriteMorph.prototype.enableFirstClass =
                    !SpriteMorph.prototype.enableFirstClass;
                myself.currentSprite.blocksCache.sensing = null;
                myself.currentSprite.paletteCache.sensing = null;
                myself.refreshPalette();
            },
            SpriteMorph.prototype.enableFirstClass,
            'uncheck to disable support\nfor first-class sprites',
            'check to enable support\n for first-class sprite',
            true
        );
        addPreference(
            'Keyboard Editing',
            () => {
                ScriptsMorph.prototype.enableKeyboard =
                    !ScriptsMorph.prototype.enableKeyboard;
                if (ScriptsMorph.prototype.enableKeyboard) {
                    myself.removeSetting('keyboard');
                } else {
                    myself.saveSetting('keyboard', false);
                }
            },
            ScriptsMorph.prototype.enableKeyboard,
            'uncheck to disable\nkeyboard editing support',
            'check to enable\nkeyboard editing support',
            true
        );
        addPreference(
            'Table support',
            () => {
                List.prototype.enableTables =
                    !List.prototype.enableTables;
                if (List.prototype.enableTables) {
                    myself.removeSetting('tables');
                } else {
                    myself.saveSetting('tables', false);
                }
            },
            List.prototype.enableTables,
            'uncheck to disable\nmulti-column list views',
            'check for multi-column\nlist view support',
            true
        );
        if (List.prototype.enableTables) {
            addPreference(
                'Table lines',
                () => {
                    TableMorph.prototype.highContrast =
                        !TableMorph.prototype.highContrast;
                    if (TableMorph.prototype.highContrast) {
                        myself.saveSetting('tableLines', true);
                    } else {
                        myself.removeSetting('tableLines');
                    }
                },
                TableMorph.prototype.highContrast,
                'uncheck for less contrast\nmulti-column list views',
                'check for higher contrast\ntable views',
                true
            );
        }
        addPreference(
            'Live coding support',
            () => {
                Process.prototype.enableLiveCoding =
                    !Process.prototype.enableLiveCoding;
            },
            Process.prototype.enableLiveCoding,
            'EXPERIMENTAL! uncheck to disable live\ncustom control structures',
            'EXPERIMENTAL! check to enable\n live custom control structures',
            true
        );
        menu.addLine(); // everything below this line is stored in the project
        addPreference(
            'Thread safe scripts',
            () => {stage.isThreadSafe = !stage.isThreadSafe; },
            this.stage.isThreadSafe,
            'uncheck to allow\nscript reentrance',
            'check to disallow\nscript reentrance'
        );
        addPreference(
            'Prefer smooth animations',
            'toggleVariableFrameRate',
            StageMorph.prototype.frameRate,
            'uncheck for greater speed\nat variable frame rates',
            'check for smooth, predictable\nanimations across computers',
            true
        );
        addPreference(
            'Flat line ends',
            () => {
                SpriteMorph.prototype.useFlatLineEnds =
                    !SpriteMorph.prototype.useFlatLineEnds;
            },
            SpriteMorph.prototype.useFlatLineEnds,
            'uncheck for round ends of lines',
            'check for flat ends of lines'
        );
        addPreference(
            'Codification support',
            () => {
                StageMorph.prototype.enableCodeMapping =
                    !StageMorph.prototype.enableCodeMapping;
                myself.currentSprite.blocksCache.variables = null;
                myself.currentSprite.paletteCache.variables = null;
                myself.refreshPalette();
            },
            StageMorph.prototype.enableCodeMapping,
            'uncheck to disable\nblock to text mapping features',
            'check for block\nto text mapping features',
            false
        );
        addPreference(
            'Inheritance support',
            () => {
                StageMorph.prototype.enableInheritance =
                    !StageMorph.prototype.enableInheritance;
                myself.currentSprite.blocksCache.variables = null;
                myself.currentSprite.paletteCache.variables = null;
                myself.refreshPalette();
            },
            StageMorph.prototype.enableInheritance,
            'uncheck to disable\nsprite inheritance features',
            'check for sprite\ninheritance features',
            false
        );
        addPreference(
            'Persist linked sublist IDs',
            () => {
                StageMorph.prototype.enableSublistIDs =
                    !StageMorph.prototype.enableSublistIDs;
            },
            StageMorph.prototype.enableSublistIDs,
            'uncheck to disable\nsaving linked sublist identities',
            'check to enable\nsaving linked sublist identities',
            true
        );
        menu.popup(world, pos);
    }

    projectMenu() {
        let menu;
        const myself = this;
        const world = this.world();
        const pos = this.controlBar.projectButton.bottomLeft();

        const graphicsName = this.currentSprite instanceof SpriteMorph ?
                'Costumes' : 'Backgrounds';

        const shiftClicked = (world.currentKey === 16);

        menu = new MenuMorph(this);
        menu.addItem('Project notes...', 'editProjectNotes');
        menu.addLine();
        menu.addPair('New', 'createNewProject', '^N');
        menu.addPair('Open...', 'openProjectsBrowser', '^O');
        menu.addPair('Save', "save", '^S');
        menu.addItem('Save As...', 'saveProjectsBrowser');
        menu.addLine();
        menu.addItem(
            'Import...',
            () => {
                const inp = document.createElement('input');
                if (myself.filePicker) {
                    document.body.removeChild(myself.filePicker);
                    myself.filePicker = null;
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
                    () => {
                        document.body.removeChild(inp);
                        myself.filePicker = null;
                        world.hand.processDrop(inp.files);
                    },
                    false
                );
                document.body.appendChild(inp);
                myself.filePicker = inp;
                inp.click();
            },
            'file menu import hint' // looks up the actual text in the translator
        );

        if (shiftClicked) {
            menu.addItem(
                `${localize(
    'Export project...')} ${localize('(in a new window)'
)}`,
                () => {
                    if (myself.projectName) {
                        myself.exportProject(myself.projectName, shiftClicked);
                    } else {
                        myself.prompt('Export Project As...', name => {
                            // false - override the shiftClick setting to use XML
                            // true - open XML in a new tab
                            myself.exportProject(name, false, true);
                        }, null, 'exportProject');
                    }
                },
                'show project data as XML\nin a new browser window',
                new Color(100, 0, 0)
            );
        }
        menu.addItem(
            shiftClicked ?
                    'Export project as plain text...' : 'Export project...',
            () => {
                if (myself.projectName) {
                    myself.exportProject(myself.projectName, shiftClicked);
                } else {
                    myself.prompt('Export Project As...', name => {
                        myself.exportProject(name, shiftClicked);
                    }, null, 'exportProject');
                }
            },
            'save project data as XML\nto your downloads folder',
            shiftClicked ? new Color(100, 0, 0) : null
        );

        if (this.stage.globalBlocks.length) {
            menu.addItem(
                'Export blocks...',
                () => {myself.exportGlobalBlocks(); },
                'show global custom block definitions as XML' +
                    '\nin a new browser window'
            );
            menu.addItem(
                'Unused blocks...',
                () => {myself.removeUnusedBlocks(); },
                'find unused global custom blocks' +
                    '\nand remove their definitions'
            );
        }

        menu.addItem(
            'Export summary...',
            () => {myself.exportProjectSummary(); },
            'open a new browser browser window\n with a summary of this project'
        );

        if (shiftClicked) {
            menu.addItem(
                'Export summary with drop-shadows...',
                () => {myself.exportProjectSummary(true); },
                'open a new browser browser window' +
                    '\nwith a summary of this project' +
                    '\nwith drop-shadows on all pictures.' +
                    '\nnot supported by all browsers',
                new Color(100, 0, 0)
            );
            menu.addItem(
                'Export all scripts as pic...',
                () => {myself.exportScriptsPicture(); },
                'show a picture of all scripts\nand block definitions',
                new Color(100, 0, 0)
            );
        }

        menu.addLine();
        menu.addItem(
            'Import tools',
            () => {
                myself.getURL(
                    myself.resourceURL('tools.xml'),
                    txt => {
                        myself.droppedText(txt, 'tools');
                    }
                );
            },
            'load the official library of\npowerful blocks'
        );
        menu.addItem(
            'Libraries...',
            () => {
                myself.getURL(
                    myself.resourceURL('libraries', 'LIBRARIES'),
                    txt => {
                        const libraries = myself.parseResourceFile(txt);
                        new LibraryImportDialogMorph(myself, libraries).popUp();
                    }
                );
            },
            'Select categories of additional blocks to add to this project.'
        );

        menu.addItem(
            `${localize(graphicsName)}...`,
            () => {
                myself.importMedia(graphicsName);
            },
            'Select a costume from the media library'
        );
        menu.addItem(
            `${localize('Sounds')}...`,
            () => {
                myself.importMedia('Sounds');
            },
            'Select a sound from the media library'
        );

        menu.popup(world, pos);
    }

    resourceURL() {
        // Take in variadic inputs that represent an a nested folder structure.
        // Method can be easily overridden if running in a custom location.
        // Default Snap! simply returns a path (relative to snap.html)
        const args = Array.prototype.slice.call(arguments, 0);
        return args.join('/');
    }

    getMediaList(dirname, callback) {
        // Invoke the given callback with a list of files in a directory
        // based on the contents file.
        // If no callback is specified, synchronously return the list of files
        // Note: Synchronous fetching has been deprecated and should be switched
        const url = this.resourceURL(dirname, dirname.toUpperCase());

        const async = callback instanceof Function;
        const myself = this;
        let data;

        function alphabetically(x, y) {
            return x.name.toLowerCase() < y.name.toLowerCase() ? -1 : 1;
        }

        if (async) {
            this.getURL(
                url,
                function (txt) {
                    const data = myself.parseResourceFile(txt);
                    data.sort(alphabetically);
                    callback.call(this, data);
                }
            );
        } else {
            data = this.parseResourceFile(this.getURL(url));
            data.sort(alphabetically);
            return data;
        }
    }

    parseResourceFile(text) {
        // A Resource File lists all the files that could be loaded in a submenu
        // Examples are libraries/LIBRARIES, Costumes/COSTUMES, etc
        // The file format is tab-delimited, with unix newlines:
        // file-name, Display Name, Help Text (optional)
        let parts;

        const items = [];

        text.split('\n').map(line => line.trim()).filter(line => line.length > 0).forEach(line => {
            parts = line.split('\t').map(str => str.trim());

            if (parts.length < 2) {return; }

            items.push({
                fileName: parts[0],
                name: parts[1],
                description: parts.length > 2 ? parts[2] : ''
            });
        });

        return items;
    }

    importMedia(folderName) {
        // open a dialog box letting the user browse available "built-in"
        // costumes, backgrounds or sounds
        const myself = this;

        const msg = this.showMessage(`Opening ${folderName}...`);
        this.getMediaList(
            folderName,
            items => {
                msg.destroy();
                myself.popupMediaImportDialog(folderName, items);
            }
        );
    }

    popupMediaImportDialog(folderName, items) {
        // private - this gets called by importMedia() and creates
        // the actual dialog
        const dialog = new DialogBoxMorph().withKey(`import${folderName}`);

        const frame = new ScrollFrameMorph();
        let selectedIcon = null;
        const turtle = new SymbolMorph('turtle', 60);
        const myself = this;
        const world = this.world();
        let handle;

        frame.acceptsDrops = false;
        frame.contents.acceptsDrops = false;
        frame.color = myself.groupColor;
        frame.fixLayout = nop;
        dialog.labelString = folderName;
        dialog.createLabel();
        dialog.addBody(frame);
        dialog.addButton('ok', 'Import');
        dialog.addButton('cancel', 'Cancel');

        dialog.ok = () => {
            if (selectedIcon) {
                if (selectedIcon.object instanceof Sound) {
                    myself.droppedAudio(
                        selectedIcon.object.copy().audio,
                        selectedIcon.labelString
                    );
                } else if (selectedIcon.object instanceof SVG_Costume) {
                    myself.droppedSVG(
                        selectedIcon.object.contents,
                        selectedIcon.labelString
                    );
                } else {
                    myself.droppedImage(
                        selectedIcon.object.contents,
                        selectedIcon.labelString
                    );
                }
            }
        };

        dialog.fixLayout = function () {
            const th = fontHeight(this.titleFontSize) + this.titlePadding * 2;
            let x = 0;
            let y = 0;
            let fp;
            let fw;
            this.buttons.fixLayout();
            this.body.setPosition(this.position().add(new Point(
                this.padding,
                th + this.padding
            )));
            this.body.setExtent(new Point(
                this.width() - this.padding * 2,
                this.height() - this.padding * 3 - th - this.buttons.height()
            ));
            fp = this.body.position();
            fw = this.body.width();
            frame.contents.children.forEach(icon => {
                  icon.setPosition(fp.add(new Point(x, y)));
                x += icon.width();
                if (x + icon.width() > fw) {
                    x = 0;
                    y += icon.height();
                }
            });
            frame.contents.adjustBounds();
            this.label.setCenter(this.center());
            this.label.setTop(this.top() + (th - this.label.height()) / 2);
            this.buttons.setCenter(this.center());
            this.buttons.setBottom(this.bottom() - this.padding);
        };

        items.forEach(item => {
            // Caution: creating very many thumbnails can take a long time!
            const url = myself.resourceURL(folderName, item.fileName);

            const img = new Image();
            const suffix = url.slice(url.lastIndexOf('.') + 1).toLowerCase();
            const isSVG = suffix === 'svg' && !MorphicPreferences.rasterizeSVGs;
            const isSound = contains(['wav', 'mp3'], suffix);
            let cstTemplate;
            let sndTemplate;
            let icon;

            if (isSound) {
                sndTemplate = icon = new SoundIconMorph(
                    new Sound(new Audio(), item.name),
                    sndTemplate
                );
            } else {
                cstTemplate = icon = new CostumeIconMorph(
                    new Costume(turtle.image, item.name),
                    cstTemplate
                );
            }
            icon.isDraggable = false;
            icon.userMenu = nop;
            icon.action = () => {
                if (selectedIcon === icon) {return; }
                const prevSelected = selectedIcon;
                selectedIcon = icon;
                if (prevSelected) {prevSelected.refresh(); }
            };
            icon.doubleClickAction = dialog.ok;
            icon.query = () => icon === selectedIcon;
            frame.addContents(icon);
            if (isSound) {
                icon.object.audio.onloadeddata = () => {
                    icon.createThumbnail();
                    icon.fixLayout();
                    icon.refresh();
                };

                icon.object.audio.src = url;
                icon.object.audio.load();
            } else if (isSVG) {
                img.onload = () => {
                    icon.object = new SVG_Costume(img, item.name);
                    icon.refresh();
                };
                myself.getURL(
                    url,
                    txt => {
                        img.src = `data:image/svg+xml;utf8,${encodeURIComponent(txt)}`;
                    }
                );
            } else {
                img.onload = () => {
                    const canvas = newCanvas(new Point(img.width, img.height), true);
                    canvas.getContext('2d').drawImage(img, 0, 0);
                    icon.object = new Costume(canvas, item.name);
                    icon.refresh();
                };
                img.src = url;
            }
        });
        dialog.popUp(world);
        dialog.setExtent(new Point(400, 300));
        dialog.setCenter(world.center());
        dialog.drawNew();

        handle = new HandleMorph(
            dialog,
            300,
            280,
            dialog.corner,
            dialog.corner
        );
    }

    // IDE_Morph menu actions

    aboutSnap() {
        let dlg;
        let aboutTxt;
        let noticeTxt;
        let creditsTxt;
        let versions = '';
        let translations;
        let module;
        let btn1;
        let btn2;
        let btn3;
        let btn4;
        let licenseBtn;
        let translatorsBtn;
        const world = this.world();

        aboutTxt = 'Snap! 4.1 - dev -\nBuild Your Own Blocks\n\n'
            + 'Copyright \u24B8 2017 Jens M\u00F6nig and '
            + 'Brian Harvey\n'
            + 'jens@moenig.org, bh@cs.berkeley.edu\n\n'

            + 'Snap! is developed by the University of California, Berkeley\n'
            + '          with support from the National Science Foundation (NSF), '
            + 'MioSoft,          \n'
            + 'the Communications Design Group (CDG) at SAP Labs, and the\n'
            + 'Human Advancement Research Community (HARC) at YC Research.\n'

            + 'The design of Snap! is influenced and inspired by Scratch,\n'
            + 'from the Lifelong Kindergarten group at the MIT Media Lab\n\n'

            + 'for more information see http://snap.berkeley.edu\n'
            + 'and http://scratch.mit.edu';

        noticeTxt = `${localize('License')}\n\nSnap! is free software: you can redistribute it and/or modify\nit under the terms of the GNU Affero General Public License as\npublished by the Free Software Foundation, either version 3 of\nthe License, or (at your option) any later version.\n\nThis program is distributed in the hope that it will be useful,\nbut WITHOUT ANY WARRANTY; without even the implied warranty of\nMERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the\nGNU Affero General Public License for more details.\n\nYou should have received a copy of the\nGNU Affero General Public License along with this program.\nIf not, see http://www.gnu.org/licenses/\n\nWant to use Snap! but scared by the open-source license?\nGet in touch with us, we'll make it work.`;

        creditsTxt = `${localize('Contributors')}\n\nNathan Dinsmore: Saving/Loading, Snap-Logo Design, \ncountless bugfixes and optimizations\nKartik Chandra: Paint Editor\nMichael Ball: Time/Date UI, Library Import Dialog,\ncountless bugfixes and optimizations\nBartosz Leper: Retina Display Support\nBernat Romagosa: Countless contributions\n"Ava" Yuan Yuan, Dylan Servilla: Graphic Effects\nKyle Hotchkiss: Block search design\nBrian Broll: Many bugfixes and optimizations\nIan Reynolds: UI Design, Event Bindings, Sound primitives\nIvan Motyashov: Initial Squeak Porting\nLucas Karahadian: Piano Keyboard Design\nDavide Della Casa: Morphic Optimizations\nAchal Dave: Web Audio\nJoe Otto: Morphic Testing and Debugging`;

        for (module in modules) {
            if (Object.prototype.hasOwnProperty.call(modules, module)) {
                versions += (`\n${module} (${modules[module]})`);
            }
        }
        if (versions !== '') {
            versions = `${localize('current module versions:')} \n\nmorphic (${morphicVersion})${versions}`;
        }
        translations = `${localize('Translations')}\n${SnapTranslator.credits()}`;

        dlg = new DialogBoxMorph();
        dlg.inform('About Snap', aboutTxt, world);
        btn1 = dlg.buttons.children[0];
        translatorsBtn = dlg.addButton(
            () => {
                dlg.body.text = translations;
                dlg.body.drawNew();
                btn1.show();
                btn2.show();
                btn3.hide();
                btn4.hide();
                licenseBtn.hide();
                translatorsBtn.hide();
                dlg.fixLayout();
                dlg.drawNew();
                dlg.setCenter(world.center());
            },
            'Translators...'
        );
        btn2 = dlg.addButton(
            () => {
                dlg.body.text = aboutTxt;
                dlg.body.drawNew();
                btn1.show();
                btn2.hide();
                btn3.show();
                btn4.show();
                licenseBtn.show();
                translatorsBtn.hide();
                dlg.fixLayout();
                dlg.drawNew();
                dlg.setCenter(world.center());
            },
            'Back...'
        );
        btn2.hide();
        licenseBtn = dlg.addButton(
            () => {
                dlg.body.text = noticeTxt;
                dlg.body.drawNew();
                btn1.show();
                btn2.show();
                btn3.hide();
                btn4.hide();
                licenseBtn.hide();
                translatorsBtn.hide();
                dlg.fixLayout();
                dlg.drawNew();
                dlg.setCenter(world.center());
            },
            'License...'
        );
        btn3 = dlg.addButton(
            () => {
                dlg.body.text = versions;
                dlg.body.drawNew();
                btn1.show();
                btn2.show();
                btn3.hide();
                btn4.hide();
                licenseBtn.hide();
                translatorsBtn.hide();
                dlg.fixLayout();
                dlg.drawNew();
                dlg.setCenter(world.center());
            },
            'Modules...'
        );
        btn4 = dlg.addButton(
            () => {
                dlg.body.text = creditsTxt;
                dlg.body.drawNew();
                btn1.show();
                btn2.show();
                translatorsBtn.show();
                btn3.hide();
                btn4.hide();
                licenseBtn.hide();
                dlg.fixLayout();
                dlg.drawNew();
                dlg.setCenter(world.center());
            },
            'Credits...'
        );
        translatorsBtn.hide();
        dlg.fixLayout();
        dlg.drawNew();
    }

    editProjectNotes() {
        const dialog = new DialogBoxMorph().withKey('projectNotes');
        const frame = new ScrollFrameMorph();
        const text = new TextMorph(this.projectNotes || '');
        const ok = dialog.ok;
        const myself = this;
        const size = 250;
        const world = this.world();

        frame.padding = 6;
        frame.setWidth(size);
        frame.acceptsDrops = false;
        frame.contents.acceptsDrops = false;

        text.setWidth(size - frame.padding * 2);
        text.setPosition(frame.topLeft().add(frame.padding));
        text.enableSelecting();
        text.isEditable = true;

        frame.setHeight(size);
        frame.fixLayout = nop;
        frame.edge = InputFieldMorph.prototype.edge;
        frame.fontSize = InputFieldMorph.prototype.fontSize;
        frame.typeInPadding = InputFieldMorph.prototype.typeInPadding;
        frame.contrast = InputFieldMorph.prototype.contrast;
        frame.drawNew = InputFieldMorph.prototype.drawNew;
        frame.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;

        frame.addContents(text);
        text.drawNew();

        dialog.ok = function () {
            myself.projectNotes = text.text;
            ok.call(this);
        };

        dialog.justDropped = () => {
            text.edit();
        };

        dialog.labelString = 'Project Notes';
        dialog.createLabel();
        dialog.addBody(frame);
        frame.drawNew();
        dialog.addButton('ok', 'OK');
        dialog.addButton('cancel', 'Cancel');
        dialog.fixLayout();
        dialog.drawNew();
        dialog.popUp(world);
        dialog.setCenter(world.center());
        text.edit();
    }

    newProject() {
        this.source = SnapCloud.username ? 'cloud' : 'local';
        if (this.stage) {
            this.stage.destroy();
        }
        if (location.hash.substr(0, 6) !== '#lang:') {
            location.hash = '';
        }
        this.globalVariables = new VariableFrame();
        this.currentSprite = new SpriteMorph(this.globalVariables);
        this.sprites = new List([this.currentSprite]);
        StageMorph.prototype.dimensions = new Point(480, 360);
        StageMorph.prototype.hiddenPrimitives = {};
        StageMorph.prototype.codeMappings = {};
        StageMorph.prototype.codeHeaders = {};
        StageMorph.prototype.enableCodeMapping = false;
        StageMorph.prototype.enableInheritance = true;
        StageMorph.prototype.enableSublistIDs = false;
        SpriteMorph.prototype.useFlatLineEnds = false;
        Process.prototype.enableLiveCoding = false;
        this.setProjectName('');
        this.projectNotes = '';
        this.createStage();
        this.add(this.stage);
        this.createCorral();
        this.selectSprite(this.stage.children[0]);
        this.fixLayout();
    }

    save() {
        if (this.source === 'examples') {
            this.source = 'local'; // cannot save to examples
        }
        if (this.projectName) {
            if (this.source === 'local') { // as well as 'examples'
                this.saveProject(this.projectName);
            } else { // 'cloud'
                this.saveProjectToCloud(this.projectName);
            }
        } else {
            this.saveProjectsBrowser();
        }
    }

    saveProject(name) {
        const myself = this;
        this.nextSteps([
            () => {
                myself.showMessage('Saving...');
            },
            () => {
                myself.rawSaveProject(name);
            }
        ]);
    }

    // Serialize a project and save to the browser.
    rawSaveProject(name) {
        let str;
        if (name) {
            this.setProjectName(name);
            if (Process.prototype.isCatchingErrors) {
                try {
                    localStorage[`-snap-project-${name}`]
                        = str = this.serializer.serialize(this.stage);
                    this.setURL(`#open:${str}`);
                    this.showMessage('Saved!', 1);
                } catch (err) {
                    this.showMessage(`Save failed: ${err}`);
                }
            } else {
                localStorage[`-snap-project-${name}`]
                    = str = this.serializer.serialize(this.stage);
                this.setURL(`#open:${str}`);
                this.showMessage('Saved!', 1);
            }
        }
    }

    exportProject(name, plain, newWindow) {
        // Export project XML, saving a file to disk
        // newWindow requests displaying the project in a new tab.
        let menu;

        let str;
        let dataPrefix;

        if (name) {
            this.setProjectName(name);
            dataPrefix = `data:text/${plain}` ? 'plain,' : 'xml,';
            try {
                menu = this.showMessage('Exporting');
                str = this.serializer.serialize(this.stage);
                this.setURL(`#open:${dataPrefix}${encodeURIComponent(str)}`);
                this.saveXMLAs(str, name, newWindow);
                menu.destroy();
                this.showMessage('Exported!', 1);
            } catch (err) {
                if (Process.prototype.isCatchingErrors) {
                    this.showMessage(`Export failed: ${err}`);
                } else {
                    throw err;
                }
            }
        }
    }

    exportGlobalBlocks() {
        if (this.stage.globalBlocks.length > 0) {
            new BlockExportDialogMorph(
                this.serializer,
                this.stage.globalBlocks
            ).popUp(this.world());
        } else {
            this.inform(
                'Export blocks',
                'this project doesn\'t have any\n'
                    + 'custom global blocks yet'
            );
        }
    }

    removeUnusedBlocks() {
        const targets = this.sprites.asArray().concat([this.stage]);
        const globalBlocks = this.stage.globalBlocks;
        let unused = [];
        let isDone = false;
        let found;

        function scan() {
            return globalBlocks.filter(def => {
                if (contains(unused, def)) {return false; }
                return targets.every((each, trgIdx) => !(each.usesBlockInstance(def, true, trgIdx, unused)));
            });
        }

        while (!isDone) {
            found = scan();
            if (found.length) {
                unused = unused.concat(found);
            } else {
                isDone = true;
            }
        }
        if (unused.length > 0) {
            new BlockRemovalDialogMorph(
                unused,
                this.stage
            ).popUp(this.world());
        } else {
            this.inform(
                'Remove unused blocks',
                'there are currently no unused\n'
                    + 'global custom blocks in this project'
            );
        }
    }

    exportSprite(sprite) {
        let str = this.serializer.serialize(sprite.allParts());
        str = `<sprites app="${this.serializer.app}" version="${this.serializer.version}">${str}</sprites>`;
        this.saveXMLAs(str, sprite.name);
    }

    exportScriptsPicture() {
        let pics = [];
        let pic;
        const padding = 20;
        let w = 0;
        let h = 0;
        let y = 0;
        let ctx;

        // collect all script pics
        this.sprites.asArray().forEach(sprite => {
            pics.push(sprite.image);
            pics.push(sprite.scripts.scriptsPicture());
            sprite.customBlocks.forEach(def => {
                pics.push(def.scriptsPicture());
            });
        });
        pics.push(this.stage.image);
        pics.push(this.stage.scripts.scriptsPicture());
        this.stage.customBlocks.forEach(def => {
            pics.push(def.scriptsPicture());
        });

        // collect global block pics
        this.stage.globalBlocks.forEach(def => {
            pics.push(def.scriptsPicture());
        });

        pics = pics.filter(each => !isNil(each));

        // determine dimensions of composite
        pics.forEach(each => {
            w = Math.max(w, each.width);
            h += (each.height);
            h += padding;
        });
        h -= padding;
        pic = newCanvas(new Point(w, h));
        ctx = pic.getContext('2d');

        // draw all parts
        pics.forEach(each => {
            ctx.drawImage(each, 0, y);
            y += padding;
            y += each.height;
        });
        this.saveCanvasAs(pic, this.projectName || localize('untitled'), true);
    }

    exportProjectSummary(useDropShadows) {
        let html;
        let head;
        let meta;
        let css;
        let body;
        let pname;
        let notes;
        let toc;
        let globalVars;
        const stage = this.stage;

        function addNode(tag, node, contents) {
            if (!node) {node = body; }
            return new XML_Element(tag, contents, node);
        }

        function add(contents, tag, node) {
            if (!tag) {tag = 'p'; }
            if (!node) {node = body; }
            return new XML_Element(tag, contents, node);
        }

        function addImage(canvas, node, inline) {
            if (!node) {node = body; }
            const para = !inline ? addNode('p', node) : null;
            const pic = addNode('img', para || node);
            pic.attributes.src = canvas.toDataURL();
            return pic;
        }

        function addVariables(varFrame) {
            const names = varFrame.names().sort();
            let isFirst = true;
            let ul;
            if (names.length) {
                add(localize('Variables'), 'h3');
                names.forEach(name => {
                    /*
                    addImage(
                        SpriteMorph.prototype.variableBlock(name).scriptPic()
                    );
                    */
                    let watcher;

                    let listMorph;
                    let li;
                    let img;

                    if (isFirst) {
                        ul = addNode('ul');
                        isFirst = false;
                    }
                    li = addNode('li', ul);
                    watcher = new WatcherMorph(
                        name,
                        SpriteMorph.prototype.blockColor.variables,
                        varFrame,
                        name
                    );
                    listMorph = watcher.cellMorph.contentsMorph;
                    if (listMorph instanceof ListWatcherMorph) {
                        listMorph.expand();
                    }
                    img = addImage(watcher.fullImageClassic(), li);
                    img.attributes.class = 'script';
                });
            }
        }

        function addBlocks(definitions) {
            if (definitions.length) {
                add(localize('Blocks'), 'h3');
                SpriteMorph.prototype.categories.forEach(category => {
                    let isFirst = true;
                    let ul;
                    definitions.forEach(def => {
                        let li;
                        let blockImg;
                        if (def.category === category) {
                            if (isFirst) {
                                add(
                                    localize(
                                        category[0].toUpperCase().concat(
                                            category.slice(1)
                                        )
                                    ),
                                    'h4'
                                );
                                ul = addNode('ul');
                                isFirst = false;
                            }
                            li = addNode('li', ul);
                            blockImg = addImage(
                                def.templateInstance().scriptPic(),
                                li
                            );
                            blockImg.attributes.class = 'script';
                            def.sortedElements().forEach(script => {
                                const defImg = addImage(
                                    script instanceof BlockMorph ?
                                            script.scriptPic()
                                                    : script.fullImageClassic(),
                                    li
                                );
                                defImg.attributes.class = 'script';
                            });
                        }
                    });
                });
            }
        }

        pname = this.projectName || localize('untitled');

        html = new XML_Element('html');
        html.attributes.lang = SnapTranslator.language;
        // html.attributes.contenteditable = 'true';

        head = addNode('head', html);

        meta = addNode('meta', head);
        meta.attributes.charset = 'UTF-8';

        if (useDropShadows) {
            css = 'img {' +
                'vertical-align: top;' +
                'filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.5));' +
                '-webkit-filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.5));' +
                '-ms-filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.5));' +
                '}' +
                '.toc {' +
                'vertical-align: middle;' +
                'padding: 2px 1em 2px 1em;' +
                '}';
        } else {
            css = 'img {' +
                'vertical-align: top;' +
                '}' +
                '.toc {' +
                'vertical-align: middle;' +
                'padding: 2px 1em 2px 1em;' +
                '}' +
                '.sprite {' +
                'border: 1px solid lightgray;' +
                '}';
        }
        addNode('style', head, css);

        add(pname, 'title', head);

        body = addNode('body', html);
        add(pname, 'h1');

        /*
        if (SnapCloud.username) {
            add(localize('by ') + SnapCloud.username);
        }
        */
        if (location.hash.indexOf('#present:') === 0) {
            add(location.toString(), 'a', body).attributes.href =
                location.toString();
            addImage(
                stage.thumbnail(stage.dimensions)
            ).attributes.class = 'sprite';
            add(this.serializer.app, 'h4');
        } else {
            add(this.serializer.app, 'h4');
            addImage(
                stage.thumbnail(stage.dimensions)
            ).attributes.class = 'sprite';
        }

        // project notes
        notes = Process.prototype.reportTextSplit(this.projectNotes, 'line');
        notes.asArray().forEach(
            paragraph => {add(paragraph); }
        );

        // table of contents
        add(localize('Contents'), 'h4');
        toc = addNode('ul');

        // sprites & stage
        this.sprites.asArray().concat([stage]).forEach(sprite => {
            const tocEntry = addNode('li', toc);
            const scripts = sprite.scripts.sortedElements();
            const cl = sprite.costumes.length();
            let pic;
            let ol;

            addNode('hr');
            addImage(
                sprite.thumbnail(new Point(40, 40)),
                tocEntry,
                true
            ).attributes.class = 'toc';
            add(sprite.name, 'a', tocEntry).attributes.href = `#${sprite.name}`;

            add(sprite.name, 'h2').attributes.id = sprite.name;
            // if (sprite instanceof SpriteMorph || sprite.costume) {
            pic = addImage(
                sprite.thumbnail(sprite.extent().divideBy(stage.scale))
            );
            pic.attributes.class = 'sprite';
            if (sprite instanceof SpriteMorph) {
                if (sprite.exemplar) {
                    addImage(
                        sprite.exemplar.thumbnail(new Point(40, 40)),
                        add(`${localize('Kind of')} ${sprite.exemplar.name}`),
                        true
                    ).attributes.class = 'toc';
                }
                if (sprite.anchor) {
                    addImage(
                        sprite.anchor.thumbnail(new Point(40, 40)),
                        add(`${localize('Part of')} ${sprite.anchor.name}`),
                        true
                    ).attributes.class = 'toc';
                }
                if (sprite.parts.length) {
                    add(localize('Parts'), 'h3');
                    ol = addNode('ul');
                    sprite.parts.forEach(part => {
                        const li = addNode('li', ol, part.name);
                        addImage(part.thumbnail(new Point(40, 40)), li, true)
                            .attributes.class = 'toc';
                    });
                }
            }

            // costumes
            if (cl > 1 || (sprite.getCostumeIdx() !== cl)) {
                add(localize('Costumes'), 'h3');
                ol = addNode('ol');
                sprite.costumes.asArray().forEach(costume => {
                    const li = addNode('li', ol, costume.name);
                    addImage(costume.thumbnail(new Point(40, 40)), li, true)
                        .attributes.class = 'toc';
                });
            }

            // sounds
            if (sprite.sounds.length()) {
                add(localize('Sounds'), 'h3');
                ol = addNode('ol');
                sprite.sounds.asArray().forEach(sound => {
                    add(sound.name, 'li', ol);
                });
            }

            // variables
            addVariables(sprite.variables);

            // scripts
            if (scripts.length) {
                add(localize('Scripts'), 'h3');
                scripts.forEach(script => {
                    const img = addImage(script instanceof BlockMorph ?
                            script.scriptPic()
                                    : script.fullImageClassic());
                    img.attributes.class = 'script';
                });
            }

            // custom blocks
            addBlocks(sprite.customBlocks);
        });

        // globals
        globalVars = stage.globalVariables();
        if (Object.keys(globalVars.vars).length || stage.globalBlocks.length) {
            addNode('hr');
            add(
                localize('For all Sprites'),
                'a',
                addNode('li', toc)
            ).attributes.href = '#global';
            add(localize('For all Sprites'), 'h2').attributes.id = 'global';

            // variables
            addVariables(globalVars);

            // custom blocks
            addBlocks(stage.globalBlocks);
        }

        this.saveFileAs(
            `<!DOCTYPE html>${html.toString()}`,
            'text/html;charset=utf-8',
            pname,
            false // request opening a new window.
        );
    }

    openProjectString(str) {
        let msg;
        const myself = this;
        this.nextSteps([
            () => {
                msg = myself.showMessage('Opening project...');
            },
            () => {nop(); },
            () => {
                myself.rawOpenProjectString(str);
            },
            () => {
                msg.destroy();
            }
        ]);
    }

    rawOpenProjectString(str) {
        this.toggleAppMode(false);
        this.spriteBar.tabBar.tabTo('scripts');
        StageMorph.prototype.hiddenPrimitives = {};
        StageMorph.prototype.codeMappings = {};
        StageMorph.prototype.codeHeaders = {};
        StageMorph.prototype.enableCodeMapping = false;
        StageMorph.prototype.enableInheritance = true;
        StageMorph.prototype.enableSublistIDs = false;
        Process.prototype.enableLiveCoding = false;
        if (Process.prototype.isCatchingErrors) {
            try {
                this.serializer.openProject(
                    this.serializer.load(str, this),
                    this
                );
            } catch (err) {
                this.showMessage(`Load failed: ${err}`);
            }
        } else {
            this.serializer.openProject(
                this.serializer.load(str, this),
                this
            );
        }
        this.stopFastTracking();
    }

    openCloudDataString(str) {
        let msg;
        const myself = this;
        const size = Math.round(str.length / 1024);
        this.nextSteps([
            () => {
                msg = myself.showMessage(`Opening project\n${size} KB...`);
            },
            () => {nop(); },
            () => {
                myself.rawOpenCloudDataString(str);
            },
            () => {
                msg.destroy();
            }
        ]);
    }

    rawOpenCloudDataString(str) {
        let model;
        StageMorph.prototype.hiddenPrimitives = {};
        StageMorph.prototype.codeMappings = {};
        StageMorph.prototype.codeHeaders = {};
        StageMorph.prototype.enableCodeMapping = false;
        StageMorph.prototype.enableInheritance = true;
        StageMorph.prototype.enableSublistIDs = false;
        Process.prototype.enableLiveCoding = false;
        if (Process.prototype.isCatchingErrors) {
            try {
                model = this.serializer.parse(str);
                this.serializer.loadMediaModel(model.childNamed('media'));
                this.serializer.openProject(
                    this.serializer.loadProjectModel(
                        model.childNamed('project'),
                        this
                    ),
                    this
                );
            } catch (err) {
                this.showMessage(`Load failed: ${err}`);
            }
        } else {
            model = this.serializer.parse(str);
            this.serializer.loadMediaModel(model.childNamed('media'));
            this.serializer.openProject(
                this.serializer.loadProjectModel(
                    model.childNamed('project'),
                    this
                ),
                this
            );
        }
        this.stopFastTracking();
    }

    openBlocksString(str, name, silently) {
        let msg;
        const myself = this;
        this.nextSteps([
            () => {
                msg = myself.showMessage('Opening blocks...');
            },
            () => {nop(); },
            () => {
                myself.rawOpenBlocksString(str, name, silently);
            },
            () => {
                msg.destroy();
            }
        ]);
    }

    rawOpenBlocksString(str, name, silently) {
        // name is optional (string), so is silently (bool)
        let blocks;

        const myself = this;
        if (Process.prototype.isCatchingErrors) {
            try {
                blocks = this.serializer.loadBlocks(str, myself.stage);
            } catch (err) {
                this.showMessage(`Load failed: ${err}`);
            }
        } else {
            blocks = this.serializer.loadBlocks(str, myself.stage);
        }
        if (silently) {
            blocks.forEach(def => {
                def.receiver = myself.stage;
                myself.stage.globalBlocks.push(def);
                myself.stage.replaceDoubleDefinitionsFor(def);
            });
            this.flushPaletteCache();
            this.refreshPalette();
            this.showMessage(
                `Imported Blocks Module${name ? ': ' + name : ''}.`,
                2
            );
        } else {
            new BlockImportDialogMorph(blocks, this.stage, name).popUp();
        }
    }

    openSpritesString(str) {
        let msg;
        const myself = this;
        this.nextSteps([
            () => {
                msg = myself.showMessage('Opening sprite...');
            },
            () => {nop(); },
            () => {
                myself.rawOpenSpritesString(str);
            },
            () => {
                msg.destroy();
            }
        ]);
    }

    rawOpenSpritesString(str) {
        if (Process.prototype.isCatchingErrors) {
            try {
                this.serializer.loadSprites(str, this);
            } catch (err) {
                this.showMessage(`Load failed: ${err}`);
            }
        } else {
            this.serializer.loadSprites(str, this);
        }
    }

    openMediaString(str) {
        if (Process.prototype.isCatchingErrors) {
            try {
                this.serializer.loadMedia(str);
            } catch (err) {
                this.showMessage(`Load failed: ${err}`);
            }
        } else {
            this.serializer.loadMedia(str);
        }
        this.showMessage('Imported Media Module.', 2);
    }

    openProject(name) {
        let str;
        if (name) {
            this.showMessage(`opening project\n${name}`);
            this.setProjectName(name);
            str = localStorage[`-snap-project-${name}`];
            this.openProjectString(str);
            this.setURL(`#open:${str}`);
        }
    }

    setURL(str) {
        // Set the URL to a project's XML contents
        if (this.projectsInURLs) {
            location.hash = str;
        }
    }

    saveFileAs(
        contents,
        fileType,
        fileName,
        // (optional) defaults to false.
        newWindow) {
        /** Allow for downloading a file to a disk or open in a new tab.
            This relies the FileSaver.js library which exports saveAs()
            Two utility methods saveImageAs and saveXMLAs should be used first.
            1. Opening a new window uses standard URI encoding.
            2. downloading a file uses Blobs.
            - every other combo is unsupposed.
        */
        let blobIsSupported = false;

        const world = this.world();
        let fileExt;
        let dataURI;
        let dialog;

        // fileType is a <kind>/<ext>;<charset> format.
        fileExt = fileType.split('/')[1].split(';')[0];
        // handle text/plain as a .txt file
        fileExt = `.${fileExt === 'plain' ? 'txt' : fileExt}`;

        // This is a workaround for a known Chrome crash with large URLs
        function exhibitsChomeBug(contents) {
            const MAX_LENGTH = 2e6;
            const isChrome  = navigator.userAgent.includes('Chrome');
            return isChrome && contents.length > MAX_LENGTH;
        }

        function dataURItoBlob(text, mimeType) {
            let i;
            let data = text;
            const components = text.split(',');
            const hasTypeStr = text.indexOf('data:') === 0;
            // Convert to binary data, in format Blob() can use.
            if (hasTypeStr && components[0].includes('base64')) {
                text = atob(components[1]);
                data = new Uint8Array(text.length);
                i = text.length;
                while (i--) {
                    data[i] = text.charCodeAt(i);
                }
            }
            return new Blob([data], {type: mimeType });
        }

        function dataURLFormat(text) {
            const hasTypeStr = text.indexOf('data:') === 0;
            if (hasTypeStr) {return text; }
            return `data:${fileType},${encodeURIComponent(text)}`;
        }

        try {
            blobIsSupported = !!new Blob();
        } catch (e) {}

        if (newWindow) {
            // Blob URIs need a custom URL to be displayed in a new window
            if (contents instanceof Blob) {
                dataURI = URL.createObjectURL(contents);
            } else {
                dataURI = dataURLFormat(contents);
            }

            // Detect crashing errors - fallback to downloading if necessary
            if (!exhibitsChomeBug(dataURI)) {
                window.open(dataURI, fileName);
                // Blob URIs should be "cleaned up" to reduce memory.
                if (contents instanceof Blob) {
                    URL.revokeObjectURL(dataURI);
                }
            } else {
                // (recursively) call this defauling newWindow to false
                this.showMessage('download to disk text');
                this.saveFileAs(contents, fileType, fileName);
            }
        } else if (blobIsSupported) {
            if (!(contents instanceof Blob)) {
                contents = dataURItoBlob(contents, fileType);
            }
            // download a file and delegate to FileSaver
            // false: Do not preprend a BOM to the file.
            saveAs(contents, fileName + fileExt, false);
        } else {
            dialog = new DialogBoxMorph();
            dialog.inform(
                `${localize('Could not export')} ${fileName}`,
                'unable to export text',
                world
            );
            dialog.fixLayout();
            dialog.drawNew();
        }
    }

    saveCanvasAs(canvas, fileName, newWindow) {
        // Export a Canvas object as a PNG image
        // Note: This commented out due to poor browser support.
        // cavas.toBlob() is currently supported in Firefox, IE, Chrome but 
        // browsers prevent easily saving the generated files.
        // Do not re-enable without revisiting issue #1191
        // if (canvas.toBlob) {
        //     var myself = this;
        //     canvas.toBlob(function (blob) {
        //         myself.saveFileAs(blob, 'image/png', fileName, newWindow);
        //     });
        //     return;
        // }
        
        this.saveFileAs(canvas.toDataURL(), 'image/png', fileName, newWindow);
    }

    saveXMLAs(xml, fileName, newWindow) {
        // wrapper to saving XML files with a proper type tag.
        this.saveFileAs(xml, 'text/xml;chartset=utf-8', fileName, newWindow);
    }

    switchToUserMode() {
        const world = this.world();

        world.isDevMode = false;
        Process.prototype.isCatchingErrors = true;
        this.controlBar.updateLabel();
        this.isAutoFill = true;
        this.isDraggable = false;
        this.reactToWorldResize(world.bounds.copy());
        this.siblings().forEach(morph => {
            if (morph instanceof DialogBoxMorph) {
                world.add(morph); // bring to front
            } else {
                morph.destroy();
            }
        });
        this.flushBlocksCache();
        this.refreshPalette();
        // prevent non-DialogBoxMorphs from being dropped
        // onto the World in user-mode
        world.reactToDropOf = morph => {
            if (!(morph instanceof DialogBoxMorph)) {
                if (world.hand.grabOrigin) {
                    morph.slideBackTo(world.hand.grabOrigin);
                } else {
                    world.hand.grab(morph);
                }
            }
        };
        this.showMessage('entering user mode', 1);

    }

    switchToDevMode() {
        const world = this.world();

        world.isDevMode = true;
        Process.prototype.isCatchingErrors = false;
        this.controlBar.updateLabel();
        this.isAutoFill = false;
        this.isDraggable = true;
        this.setExtent(world.extent().subtract(100));
        this.setPosition(world.position().add(20));
        this.flushBlocksCache();
        this.refreshPalette();
        // enable non-DialogBoxMorphs to be dropped
        // onto the World in dev-mode
        delete world.reactToDropOf;
        this.showMessage(
            'entering development mode.\n\n'
                + 'error catching is turned off,\n'
                + 'use the browser\'s web console\n'
                + 'to see error messages.'
        );
    }

    flushBlocksCache(category) {
        // if no category is specified, the whole cache gets flushed
        if (category) {
            this.stage.blocksCache[category] = null;
            this.stage.children.forEach(m => {
                if (m instanceof SpriteMorph) {
                    m.blocksCache[category] = null;
                }
            });
        } else {
            this.stage.blocksCache = {};
            this.stage.children.forEach(m => {
                if (m instanceof SpriteMorph) {
                    m.blocksCache = {};
                }
            });
        }
        this.flushPaletteCache(category);
    }

    flushPaletteCache(category) {
        // if no category is specified, the whole cache gets flushed
        if (category) {
            this.stage.paletteCache[category] = null;
            this.stage.children.forEach(m => {
                if (m instanceof SpriteMorph) {
                    m.paletteCache[category] = null;
                }
            });
        } else {
            this.stage.paletteCache = {};
            this.stage.children.forEach(m => {
                if (m instanceof SpriteMorph) {
                    m.paletteCache = {};
                }
            });
        }
    }

    toggleZebraColoring() {
        let scripts = [];

        if (!BlockMorph.prototype.zebraContrast) {
            BlockMorph.prototype.zebraContrast = 40;
        } else {
            BlockMorph.prototype.zebraContrast = 0;
        }

        // select all scripts:
        this.stage.children.concat(this.stage).forEach(morph => {
            if (isSnapObject(morph)) {
                scripts = scripts.concat(
                    morph.scripts.children.filter(morph => morph instanceof BlockMorph)
                );
            }
        });

        // force-update all scripts:
        scripts.forEach(topBlock => {
            topBlock.fixBlockColor(null, true);
        });
    }

    toggleDynamicInputLabels() {
        let projectData;
        SyntaxElementMorph.prototype.dynamicInputLabels =
            !SyntaxElementMorph.prototype.dynamicInputLabels;
        if (Process.prototype.isCatchingErrors) {
            try {
                projectData = this.serializer.serialize(this.stage);
            } catch (err) {
                this.showMessage(`Serialization failed: ${err}`);
            }
        } else {
            projectData = this.serializer.serialize(this.stage);
        }
        SpriteMorph.prototype.initBlocks();
        this.spriteBar.tabBar.tabTo('scripts');
        this.createCategories();
        this.createCorralBar();
        this.openProjectString(projectData);
    }

    toggleBlurredShadows() {
        window.useBlurredShadows = !useBlurredShadows;
    }

    toggleLongFormInputDialog() {
        InputSlotDialogMorph.prototype.isLaunchingExpanded =
            !InputSlotDialogMorph.prototype.isLaunchingExpanded;
        if (InputSlotDialogMorph.prototype.isLaunchingExpanded) {
            this.saveSetting('longform', true);
        } else {
            this.removeSetting('longform');
        }
    }

    togglePlainPrototypeLabels() {
        BlockLabelPlaceHolderMorph.prototype.plainLabel =
            !BlockLabelPlaceHolderMorph.prototype.plainLabel;
        if (BlockLabelPlaceHolderMorph.prototype.plainLabel) {
            this.saveSetting('plainprototype', true);
        } else {
            this.removeSetting('plainprototype');
        }
    }

    togglePreferEmptySlotDrops() {
        ScriptsMorph.prototype.isPreferringEmptySlots =
            !ScriptsMorph.prototype.isPreferringEmptySlots;
    }

    toggleVirtualKeyboard() {
        MorphicPreferences.useVirtualKeyboard =
            !MorphicPreferences.useVirtualKeyboard;
    }

    toggleInputSliders() {
        MorphicPreferences.useSliderForInput =
            !MorphicPreferences.useSliderForInput;
    }

    toggleSliderExecute() {
        ArgMorph.prototype.executeOnSliderEdit =
            !ArgMorph.prototype.executeOnSliderEdit;
    }

    toggleAppMode(appMode) {
        const world = this.world();

        const elements = [
            this.logo,
            this.controlBar.cloudButton,
            this.controlBar.projectButton,
            this.controlBar.settingsButton,
            this.controlBar.stageSizeButton,
            this.paletteHandle,
            this.stageHandle,
            this.corral,
            this.corralBar,
            this.spriteEditor,
            this.spriteBar,
            this.palette,
            this.categories
        ];

        this.isAppMode = isNil(appMode) ? !this.isAppMode : appMode;

        Morph.prototype.trackChanges = false;
        if (this.isAppMode) {
            this.setColor(this.appModeColor);
            this.controlBar.setColor(this.color);
            this.controlBar.appModeButton.refresh();
            elements.forEach(e => {
                e.hide();
            });
            world.children.forEach(morph => {
                if (morph instanceof DialogBoxMorph) {
                    morph.hide();
                }
            });
            if (world.keyboardReceiver instanceof ScriptFocusMorph) {
                world.keyboardReceiver.stopEditing();
            }
        } else {
            this.setColor(this.backgroundColor);
            this.controlBar.setColor(this.frameColor);
            elements.forEach(e => {
                e.show();
            });
            this.stage.setScale(1);
            // show all hidden dialogs
            world.children.forEach(morph => {
                if (morph instanceof DialogBoxMorph) {
                    morph.show();
                }
            });
            // prevent scrollbars from showing when morph appears
            world.allChildren().filter(c => c instanceof ScrollFrameMorph).forEach(s => {
                s.adjustScrollBars();
            });
            // prevent rotation and draggability controls from
            // showing for the stage
            if (this.currentSprite === this.stage) {
                this.spriteBar.children.forEach(child => {
                    if (child instanceof PushButtonMorph) {
                        child.hide();
                    }
                });
            }
            // update undrop controls
            this.currentSprite.scripts.updateUndropControls();
        }
        this.setExtent(this.world().extent()); // resume trackChanges
    }

    toggleStageSize(isSmall, forcedRatio) {
        const myself = this;
        let smallRatio = forcedRatio || 0.5;
        const msecs = this.isAnimating ? 100 : 0;
        const world = this.world();
        const shiftClicked = (world.currentKey === 16);
        const altClicked = (world.currentKey === 18);

        function toggle() {
            myself.isSmallStage = isNil(isSmall) ? !myself.isSmallStage : isSmall;
        }

        function zoomTo(targetRatio) {
            myself.isSmallStage = true;
            world.animations.push(new Animation(
                ratio => {
                    myself.stageRatio = ratio;
                    myself.setExtent(world.extent());
                },
                () => myself.stageRatio,
                targetRatio - myself.stageRatio,
                msecs,
                null, // easing
                () => {
                    myself.isSmallStage = (targetRatio !== 1);
                    myself.controlBar.stageSizeButton.refresh();
                }
            ));
        }

        if (shiftClicked) {
            smallRatio = SpriteIconMorph.prototype.thumbSize.x * 3 /
                this.stage.dimensions.x;
            if (!this.isSmallStage || (smallRatio === this.stageRatio)) {
                toggle();
            }
        } else if (altClicked) {
            smallRatio = this.width() / 2 /
                this.stage.dimensions.x;
            if (!this.isSmallStage || (smallRatio === this.stageRatio)) {
                toggle();
            }
        } else {
            toggle();
        }
        if (this.isSmallStage) {
            zoomTo(smallRatio);
        } else {
            zoomTo(1);
        }
    }

    setPaletteWidth(newWidth) {
        const msecs = this.isAnimating ? 100 : 0;
        const world = this.world();
        const myself = this;

        world.animations.push(new Animation(
            newWidth => {
                myself.paletteWidth = newWidth;
                myself.setExtent(world.extent());
            },
            () => myself.paletteWidth,
            newWidth - myself.paletteWidth,
            msecs
        ));
    }

    createNewProject() {
        const myself = this;
        this.confirm(
            'Replace the current project with a new one?',
            'New Project',
            () => {myself.newProject(); }
        );
    }

    openProjectsBrowser() {
        new ProjectDialogMorph(this, 'open').popUp();
    }

    saveProjectsBrowser() {
        if (this.source === 'examples') {
            this.source = 'local'; // cannot save to examples
        }
        new ProjectDialogMorph(this, 'save').popUp();
    }

    // IDE_Morph localization

    languageMenu() {
        const menu = new MenuMorph(this);
        const world = this.world();
        const pos = this.controlBar.settingsButton.bottomLeft();
        const myself = this;
        SnapTranslator.languages().forEach(lang => {
            menu.addItem(
                (SnapTranslator.language === lang ? '\u2713 ' : '    ') +
                    SnapTranslator.languageName(lang),
                () => {
                    myself.loadNewProject = false;
                    myself.setLanguage(lang);
                }
            );
        });
        menu.popup(world, pos);
    }

    setLanguage(lang, callback) {
        let translation = document.getElementById('language');
        const src = this.resourceURL(`lang-${lang}.js`);
        const myself = this;
        SnapTranslator.unload();
        if (translation) {
            document.head.removeChild(translation);
        }
        if (lang === 'en') {
            return this.reflectLanguage('en', callback);
        }
        translation = document.createElement('script');
        translation.id = 'language';
        translation.onload = () => {
            myself.reflectLanguage(lang, callback);
        };
        document.head.appendChild(translation);
        translation.src = src;
    }

    reflectLanguage(lang, callback) {
        let projectData;
        const urlBar = location.hash;
        SnapTranslator.language = lang;
        if (!this.loadNewProject) {
            if (Process.prototype.isCatchingErrors) {
                try {
                    projectData = this.serializer.serialize(this.stage);
                } catch (err) {
                    this.showMessage(`Serialization failed: ${err}`);
                }
            } else {
                projectData = this.serializer.serialize(this.stage);
            }
        }
        SpriteMorph.prototype.initBlocks();
        this.spriteBar.tabBar.tabTo('scripts');
        this.createCategories();
        this.createCorralBar();
        this.fixLayout();
        if (this.loadNewProject) {
            this.newProject();
            location.hash = urlBar;
        } else {
            this.openProjectString(projectData);
        }
        this.saveSetting('language', lang);
        if (callback) {callback.call(this); }
    }

    // IDE_Morph blocks scaling

    userSetBlocksScale() {
        const myself = this;
        let scrpt;
        let blck;
        let shield;
        let sample;
        let action;

        scrpt = new CommandBlockMorph();
        scrpt.color = SpriteMorph.prototype.blockColor.motion;
        scrpt.setSpec(localize('build'));
        blck = new CommandBlockMorph();
        blck.color = SpriteMorph.prototype.blockColor.sound;
        blck.setSpec(localize('your own'));
        scrpt.nextBlock(blck);
        blck = new CommandBlockMorph();
        blck.color = SpriteMorph.prototype.blockColor.operators;
        blck.setSpec(localize('blocks'));
        scrpt.bottomBlock().nextBlock(blck);
        /*
        blck = SpriteMorph.prototype.blockForSelector('doForever');
        blck.inputs()[0].nestedBlock(scrpt);
        */

        sample = new FrameMorph();
        sample.acceptsDrops = false;
        sample.color = IDE_Morph.prototype.groupColor;
        sample.cachedTexture = this.scriptsPaneTexture;
        sample.setExtent(new Point(250, 180));
        scrpt.setPosition(sample.position().add(10));
        sample.add(scrpt);

        shield = new Morph();
        shield.alpha = 0;
        shield.setExtent(sample.extent());
        shield.setPosition(sample.position());
        sample.add(shield);

        action = num => {
        /*
            var c;
            blck.setScale(num);
            blck.drawNew();
            blck.setSpec(blck.blockSpec);
            c = blck.inputs()[0];
            c.setScale(num);
            c.nestedBlock(scrpt);
        */
            scrpt.blockSequence().forEach(block => {
                block.setScale(num);
                block.drawNew();
                block.setSpec(block.blockSpec);
            });
            scrpt.changed();
        };

        new DialogBoxMorph(
            null,
            num => {
                myself.setBlocksScale(Math.min(num, 12));
            }
        ).withKey('zoomBlocks').prompt(
            'Zoom blocks',
            SyntaxElementMorph.prototype.scale.toString(),
            this.world(),
            sample, // pic
            {
                'normal (1x)' : 1,
                'demo (1.2x)' : 1.2,
                'presentation (1.4x)' : 1.4,
                'big (2x)' : 2,
                'huge (4x)' : 4,
                'giant (8x)' : 8,
                'monstrous (10x)' : 10
            },
            false, // read only?
            true, // numeric
            1, // slider min
            12, // slider max
            action // slider action
        );
    }

    setBlocksScale(num) {
        let projectData;
        if (Process.prototype.isCatchingErrors) {
            try {
                projectData = this.serializer.serialize(this.stage);
            } catch (err) {
                this.showMessage(`Serialization failed: ${err}`);
            }
        } else {
            projectData = this.serializer.serialize(this.stage);
        }
        SyntaxElementMorph.prototype.setScale(num);
        CommentMorph.prototype.refreshScale();
        SpriteMorph.prototype.initBlocks();
        this.spriteBar.tabBar.tabTo('scripts');
        this.createCategories();
        this.createCorralBar();
        this.fixLayout();
        this.openProjectString(projectData);
        this.saveSetting('zoom', num);
    }

    // IDE_Morph stage size manipulation

    userSetStageSize() {
        new DialogBoxMorph(
            this,
            this.setStageExtent,
            this
        ).promptVector(
            "Stage size",
            StageMorph.prototype.dimensions,
            new Point(480, 360),
            'Stage width',
            'Stage height',
            this.world(),
            null, // pic
            null // msg
        );
    }

    setStageExtent(aPoint) {
        const myself = this;
        const world = this.world();
        const ext = aPoint.max(new Point(480, 180));

        function zoom() {
            myself.step = function () {
                const delta = ext.subtract(
                    StageMorph.prototype.dimensions
                ).divideBy(2);
                if (delta.abs().lt(new Point(5, 5))) {
                    StageMorph.prototype.dimensions = ext;
                    delete myself.step;
                } else {
                    StageMorph.prototype.dimensions =
                        StageMorph.prototype.dimensions.add(delta);
                }
                myself.stage.setExtent(StageMorph.prototype.dimensions);
                myself.stage.clearPenTrails();
                myself.fixLayout();
                this.setExtent(world.extent());
            };
        }

        this.stageRatio = 1;
        this.isSmallStage = false;
        this.controlBar.stageSizeButton.refresh();
        this.setExtent(world.extent());
        if (this.isAnimating) {
            zoom();
        } else {
            StageMorph.prototype.dimensions = ext;
            this.stage.setExtent(StageMorph.prototype.dimensions);
            this.stage.clearPenTrails();
            this.fixLayout();
            this.setExtent(world.extent());
        }
    }

    // IDE_Morph dragging threshold (internal feature)

    userSetDragThreshold() {
        new DialogBoxMorph(
            this,
            num => {
                MorphicPreferences.grabThreshold = Math.min(
                    Math.max(+num, 0),
                    200
                );
            },
            this
        ).prompt(
            "Dragging threshold",
            MorphicPreferences.grabThreshold.toString(),
            this.world(),
            null, // pic
            null, // choices
            null, // read only
            true // numeric
        );
    }

    // IDE_Morph cloud interface

    initializeCloud() {
        const myself = this;
        const world = this.world();
        new DialogBoxMorph(
            null,
            user => {
                const pwh = hex_sha512(user.password);
                let str;
                SnapCloud.login(
                    user.username,
                    pwh,
                    () => {
                        if (user.choice) {
                            str = SnapCloud.encodeDict(
                                {
                                    username: user.username,
                                    password: pwh
                                }
                            );
                            localStorage['-snap-user'] = str;
                        }
                        myself.source = 'cloud';
                        myself.showMessage('now connected.', 2);
                    },
                    myself.cloudError()
                );
            }
        ).withKey('cloudlogin').promptCredentials(
            'Sign in',
            'login',
            null,
            null,
            null,
            null,
            'stay signed in on this computer\nuntil logging out',
            world,
            myself.cloudIcon(),
            myself.cloudMsg
        );
    }

    createCloudAccount() {
        const myself = this;
        const world = this.world();
        /*
            // force-logout, commented out for now:
            delete localStorage['-snap-user'];
            SnapCloud.clear();
        */
        new DialogBoxMorph(
            null,
            user => {
                SnapCloud.signup(
                    user.username,
                    user.email,
                    (txt, title) => {
                        new DialogBoxMorph().inform(
                            title,
                            `${txt}.\n\nAn e-mail with your password\nhas been sent to the address provided`,
                            world,
                            myself.cloudIcon(null, new Color(0, 180, 0))
                        );
                    },
                    myself.cloudError()
                );
            }
        ).withKey('cloudsignup').promptCredentials(
            'Sign up',
            'signup',
            'http://snap.berkeley.edu/tos.html',
            'Terms of Service...',
            'http://snap.berkeley.edu/privacy.html',
            'Privacy...',
            'I have read and agree\nto the Terms of Service',
            world,
            myself.cloudIcon(),
            myself.cloudMsg
        );
    }

    resetCloudPassword() {
        const myself = this;
        const world = this.world();
        /*
            // force-logout, commented out for now:
            delete localStorage['-snap-user'];
            SnapCloud.clear();
        */
        new DialogBoxMorph(
            null,
            user => {
                SnapCloud.resetPassword(
                    user.username,
                    (txt, title) => {
                        new DialogBoxMorph().inform(
                            title,
                            `${txt}.\n\nAn e-mail with a link to\nreset your password\nhas been sent to the address provided`,
                            world,
                            myself.cloudIcon(null, new Color(0, 180, 0))
                        );
                    },
                    myself.cloudError()
                );
            }
        ).withKey('cloudresetpassword').promptCredentials(
            'Reset password',
            'resetPassword',
            null,
            null,
            null,
            null,
            null,
            world,
            myself.cloudIcon(),
            myself.cloudMsg
        );
    }

    changeCloudPassword() {
        const myself = this;
        const world = this.world();
        new DialogBoxMorph(
            null,
            user => {
                SnapCloud.changePassword(
                    user.oldpassword,
                    user.password,
                    () => {
                        myself.logout();
                        myself.showMessage('password has been changed.', 2);
                    },
                    myself.cloudError()
                );
            }
        ).withKey('cloudpassword').promptCredentials(
            'Change Password',
            'changePassword',
            null,
            null,
            null,
            null,
            null,
            world,
            myself.cloudIcon(),
            myself.cloudMsg
        );
    }

    logout() {
        const myself = this;
        delete localStorage['-snap-user'];
        SnapCloud.logout(
            () => {
                SnapCloud.clear();
                myself.showMessage('disconnected.', 2);
            },
            () => {
                SnapCloud.clear();
                myself.showMessage('disconnected.', 2);
            }
        );
    }

    saveProjectToCloud(name) {
        const myself = this;
        if (name) {
            this.showMessage('Saving project\nto the cloud...');
            this.setProjectName(name);
            SnapCloud.saveProject(
                this,
                () => {myself.showMessage('saved.', 2); },
                this.cloudError()
            );
        }
    }

    exportProjectMedia(name) {
        let menu;
        let media;
        this.serializer.isCollectingMedia = true;
        if (name) {
            this.setProjectName(name);
            try {
                menu = this.showMessage('Exporting');
                media = this.serializer.mediaXML(name);
                this.saveXMLAs(media, `${this.projectName} media`);
                menu.destroy();
                this.showMessage('Exported!', 1);
            } catch (err) {
                if (Process.prototype.isCatchingErrors) {
                    this.serializer.isCollectingMedia = false;
                    this.showMessage(`Export failed: ${err}`);
                } else {
                    throw err;
                }
            }
        }
        this.serializer.isCollectingMedia = false;
        this.serializer.flushMedia();
        // this.hasChangedMedia = false;
    }

    exportProjectNoMedia(name) {
        let menu;
        let str;
        this.serializer.isCollectingMedia = true;
        if (name) {
            this.setProjectName(name);
            if (Process.prototype.isCatchingErrors) {
                try {
                    menu = this.showMessage('Exporting');
                    str = this.serializer.serialize(this.stage);
                    this.saveXMLAs(str, this.projectName);
                    menu.destroy();
                    this.showMessage('Exported!', 1);
                } catch (err) {
                    this.serializer.isCollectingMedia = false;
                    this.showMessage(`Export failed: ${err}`);
                }
            } else {
                menu = this.showMessage('Exporting');
                str = this.serializer.serialize(this.stage);
                this.saveXMLAs(str, this.projectName);
                menu.destroy();
                this.showMessage('Exported!', 1);
            }
        }
        this.serializer.isCollectingMedia = false;
        this.serializer.flushMedia();
    }

    exportProjectAsCloudData(name) {
        let menu;
        let str;
        let media;
        let dta;
        this.serializer.isCollectingMedia = true;
        if (name) {
            this.setProjectName(name);
            if (Process.prototype.isCatchingErrors) {
                try {
                    menu = this.showMessage('Exporting');
                    str = this.serializer.serialize(this.stage);
                    media = this.serializer.mediaXML(name);
                    dta = `<snapdata>${str}${media}</snapdata>`;
                    this.saveXMLAs(str, this.projectName);
                    menu.destroy();
                    this.showMessage('Exported!', 1);
                } catch (err) {
                    this.serializer.isCollectingMedia = false;
                    this.showMessage(`Export failed: ${err}`);
                }
            } else {
                menu = this.showMessage('Exporting');
                str = this.serializer.serialize(this.stage);
                media = this.serializer.mediaXML(name);
                dta = `<snapdata>${str}${media}</snapdata>`;
                this.saveXMLAs(str, this.projectName);
                menu.destroy();
                this.showMessage('Exported!', 1);
            }
        }
        this.serializer.isCollectingMedia = false;
        this.serializer.flushMedia();
        // this.hasChangedMedia = false;
    }

    cloudAcknowledge() {
        const myself = this;
        return (responseText, url) => {
            nop(responseText);
            new DialogBoxMorph().inform(
                'Cloud Connection',
                `Successfully connected to:\nhttp://${url}`,
                myself.world(),
                myself.cloudIcon(null, new Color(0, 180, 0))
            );
        };
    }

    cloudResponse() {
        const myself = this;
        return (responseText, url) => {
            let response = responseText;
            if (response.length > 50) {
                response = `${response.substring(0, 50)}...`;
            }
            new DialogBoxMorph().inform(
                'Snap!Cloud',
                `http://${url}:\n\nresponds:\n${response}`,
                myself.world(),
                myself.cloudIcon(null, new Color(0, 180, 0))
            );
        };
    }

    cloudError() {
        const myself = this;

        // try finding an eplanation what's going on
        // has some issues, commented out for now
        /*
        function getURL(url) {
            try {
                var request = new XMLHttpRequest();
                request.open('GET', url, false);
                request.send();
                if (request.status === 200) {
                    return request.responseText;
                }
                return null;
            } catch (err) {
                return null;
            }
        }
        */

        return (responseText, url) => {
            // first, try to find out an explanation for the error
            // and notify the user about it,
            // if none is found, show an error dialog box
            let response = responseText;

            const // explanation = getURL('http://snap.berkeley.edu/cloudmsg.txt'),
            explanation = null;

            if (myself.shield) {
                myself.shield.destroy();
                myself.shield = null;
            }
            if (explanation) {
                myself.showMessage(explanation);
                return;
            }
            if (response.length > 50) {
                response = `${response.substring(0, 50)}...`;
            }
            new DialogBoxMorph().inform(
                'Snap!Cloud',
                (url ? url + '\n' : '')
                    + response,
                myself.world(),
                myself.cloudIcon(null, new Color(180, 0, 0))
            );
        };
    }

    cloudIcon(height, color) {
        const clr = color || DialogBoxMorph.prototype.titleBarColor;
        const isFlat = MorphicPreferences.isFlat;

        const icon = new SymbolMorph(
            isFlat ? 'cloud' : 'cloudGradient',
            height || 50,
            clr,
            isFlat ? null : new Point(-1, -1),
            clr.darker(50)
        );

        if (!isFlat) {
            icon.addShadow(new Point(1, 1), 1, clr.lighter(95));
        }
        return icon;
    }

    setCloudURL() {
        new DialogBoxMorph(
            null,
            url => {
                SnapCloud.url = url;
            }
        ).withKey('cloudURL').prompt(
            'Cloud URL',
            SnapCloud.url,
            this.world(),
            null,
            {
                'Snap!Cloud' :
                    'https://snap.apps.miosoft.com/SnapCloud'
            }
        );
    }

    // IDE_Morph HTTP data fetching

    getURL(url, callback) {
        // fetch the contents of a url and pass it into the specified callback.
        // If no callback is specified synchronously fetch and return it
        // Note: Synchronous fetching has been deprecated and should be switched
        const request = new XMLHttpRequest();

        const async = callback instanceof Function;
        const myself = this;
        try {
            request.open('GET', url, async);
            if (async) {
                request.onreadystatechange = () => {
                    if (request.readyState === 4) {
                        if (request.responseText) {
                            callback.call(
                                myself,
                                request.responseText
                            );
                        } else {
                            throw new Error(`unable to retrieve ${url}`);
                        }
                    }
                };
            }
            request.send();
            if (!async) {
                if (request.status === 200) {
                    return request.responseText;
                }
                throw new Error(`unable to retrieve ${url}`);
            }
        } catch (err) {
            myself.showMessage(err.toString());
            if (async) {
                callback.call(this);
            } else {
                return request.responseText;
            }
        }
    }

    // IDE_Morph user dialog shortcuts

    showMessage(message, secs) {
        const m = new MenuMorph(null, message);
        let intervalHandle;
        m.popUpCenteredInWorld(this.world());
        if (secs) {
            intervalHandle = setInterval(() => {
                m.destroy();
                clearInterval(intervalHandle);
            }, secs * 1000);
        }
        return m;
    }

    inform(title, message) {
        new DialogBoxMorph().inform(
            title,
            localize(message),
            this.world()
        );
    }

    confirm(message, title, action) {
        new DialogBoxMorph(null, action).askYesNo(
            title,
            localize(message),
            this.world()
        );
    }

    prompt(message, callback, choices, key) {
        (new DialogBoxMorph(null, callback)).withKey(key).prompt(
            message,
            '',
            this.world(),
            null,
            choices
        );
    }
}