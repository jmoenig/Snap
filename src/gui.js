/*

    gui.js

    a programming environment
    based on morphic.js, blocks.js, threads.js and objects.js
    inspired by Scratch

    written by Jens Mönig
    jens@moenig.org

    Copyright (C) 2019 by Jens Mönig

    This file is part of Snap!.

    Snap! is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of
    the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.


    prerequisites:
    --------------
    needs blocks.js, threads.js, objects.js, cloud.jus and morphic.js


    toc
    ---
    the following list shows the order in which all constructors are
    defined. Use this list to locate code in this document:

        IDE_Morph
        ProjectDialogMorph
        SpriteIconMorph
        TurtleIconMorph
        CostumeIconMorph
        WardrobeMorph
        StageHandleMorph
        PaletteHandleMorph
        CamSnapshotDialogMorph


    credits
    -------
    Nathan Dinsmore contributed saving and loading of projects,
    ypr-Snap! project conversion and countless bugfixes
    Ian Reynolds contributed handling and visualization of sounds
    Michael Ball contributed the LibraryImportDialogMorph and countless
    utilities to load libraries from relative urls

*/

/*global modules, Morph, SpriteMorph, SyntaxElementMorph, Color, Cloud,
ListWatcherMorph, TextMorph, newCanvas, useBlurredShadows, VariableFrame,
StringMorph, Point, MenuMorph, morphicVersion, DialogBoxMorph,normalizeCanvas,
ToggleButtonMorph, contains, ScrollFrameMorph, StageMorph, PushButtonMorph, sb,
InputFieldMorph, FrameMorph, Process, nop, SnapSerializer, ListMorph, detect,
AlignmentMorph, TabMorph, Costume, MorphicPreferences, Sound, BlockMorph,
ToggleMorph, InputSlotDialogMorph, ScriptsMorph, isNil, SymbolMorph, fontHeight,
BlockExportDialogMorph, BlockImportDialogMorph, SnapTranslator, localize,
List, ArgMorph, Uint8Array, HandleMorph, SVG_Costume, TableDialogMorph,
CommentMorph, CommandBlockMorph, BooleanSlotMorph, RingReporterSlotMorph,
BlockLabelPlaceHolderMorph, Audio, SpeechBubbleMorph, ScriptFocusMorph,
XML_Element, WatcherMorph, BlockRemovalDialogMorph, saveAs, TableMorph,
isSnapObject, isRetinaEnabled, disableRetinaSupport, enableRetinaSupport,
isRetinaSupported, SliderMorph, Animation, BoxMorph, MediaRecorder*/

// Global stuff ////////////////////////////////////////////////////////

modules.gui = '2019-July-17';

// Declarations

var IDE_Morph;
var ProjectDialogMorph;
var LibraryImportDialogMorph;
var SpriteIconMorph;
var CostumeIconMorph;
var TurtleIconMorph;
var WardrobeMorph;
var SoundIconMorph;
var JukeboxMorph;
var StageHandleMorph;
var PaletteHandleMorph;
var CamSnapshotDialogMorph;

// IDE_Morph ///////////////////////////////////////////////////////////

// I am SNAP's top-level frame, the Editor window

// IDE_Morph inherits from Morph:

IDE_Morph.prototype = new Morph();
IDE_Morph.prototype.constructor = IDE_Morph;
IDE_Morph.uber = Morph.prototype;

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

IDE_Morph.prototype.setFlatDesign = function () {
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
    var pic = newCanvas(new Point(100, 100)), // bigger scales faster
        ctx = pic.getContext('2d'),
        i;
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

function IDE_Morph(isAutoFill) {
    this.init(isAutoFill);
}

IDE_Morph.prototype.init = function (isAutoFill) {
    // global font setting
    MorphicPreferences.globalFontFamily = 'Helvetica, Arial';

    // restore saved user preferences
    this.userLanguage = null; // user language preference for startup
    this.projectsInURLs = false;
    this.applySavedSettings();

    // additional properties:
    this.cloud = new Cloud();
    this.cloudMsg = null;
    this.source = null;
    this.serializer = new SnapSerializer();

    this.globalVariables = new VariableFrame();
    this.currentSprite = new SpriteMorph(this.globalVariables);
    this.sprites = new List([this.currentSprite]);
    this.currentCategory = 'motion';
    this.currentTab = 'scripts';
    this.projectName = '';
    this.projectNotes = '';

    this.logoURL = this.resourceURL('src', 'snap_logo_sm.png');
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

    this.embedPlayButton = null;
    this.embedOverlay = null;
    this.isEmbedMode = false;

    this.isAutoFill = isAutoFill === undefined ? true : isAutoFill;
    this.isAppMode = false;
    this.isSmallStage = false;
    this.filePicker = null;
    this.hasChangedMedia = false;

    this.isAnimating = true;
    this.paletteWidth = 200; // initially same as logo width
    this.stageRatio = 1; // for IDE animations, e.g. when zooming

	this.wasSingleStepping = false; // for toggling to and from app mode

    this.loadNewProject = false; // flag when starting up translated
    this.shield = null;

    this.savingPreferences = true; // for bh's infamous "Eisenbergification"

    // initialize inherited properties:
    IDE_Morph.uber.init.call(this);

    // override inherited properites:
    this.color = this.backgroundColor;
};

IDE_Morph.prototype.openIn = function (world) {
    var hash, myself = this, urlLanguage = null;

    function initUser(username) {
        sessionStorage.username = username;
        if (username) {
            myself.source = 'cloud';
            if (!myself.cloud.verified) {
                new DialogBoxMorph().inform(
                    'Unverified account',
                    'Your account is still unverified.\n' +
                    'Please use the verification link that\n' +
                    'was sent to your email address when you\n' +
                    'signed up.\n\n' +
                    'If you cannot find that email, please\n' +
                    'check your spam folder. If you still\n' +
                    'cannot find it, please use the "Resend\n' +
                    'Verification Email..." option in the cloud\n' +
                    'menu.',
                    world,
                    myself.cloudIcon(null, new Color(0, 180, 0))
                );
            }
        }
    }

    if (location.protocol !== 'file:') {
        if (!sessionStorage.username) {
            // check whether login should persist across browser sessions
            this.cloud.initSession(initUser);
        } else {
            // login only persistent during a single browser session
            this.cloud.checkCredentials(initUser);
        }
    }

    this.buildPanes();
    world.add(this);
    world.userMenu = this.userMenu;

    // override SnapCloud's user message with Morphic
    this.cloud.message = function (string) {
        var m = new MenuMorph(null, string),
            intervalHandle;
        m.popUpCenteredInWorld(world);
        intervalHandle = setInterval(function () {
            m.destroy();
            clearInterval(intervalHandle);
        }, 2000);
    };

    // prevent non-DialogBoxMorphs from being dropped
    // onto the World in user-mode
    world.reactToDropOf = function (morph) {
        if (!(morph instanceof DialogBoxMorph ||
        		(morph instanceof MenuMorph))) {
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
            var request = new XMLHttpRequest();
            request.open('GET', url, false);
            request.send();
            if (request.status === 200) {
                return request.responseText;
            }
            throw new Error('unable to retrieve ' + url);
        } catch (err) {
            myself.showMessage('unable to retrieve project');
            return '';
        }
    }

    function applyFlags(dict) {
        if (dict.embedMode) {
            myself.setEmbedMode();
        }
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
        if (dict.lang) {
            myself.setLanguage(dict.lang, null, true); // don't persist
        }

        // only force my world to get focus if I'm not in embed mode
        // to prevent the iFrame from involuntarily scrolling into view
        if (!myself.isEmbedMode) {
            world.worldCanvas.focus();
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
        var dict, idx;

        if (location.hash.substr(0, 6) === '#open:') {
            hash = location.hash.substr(6);
            if (hash.charAt(0) === '%'
                    || hash.search(/\%(?:[0-9a-f]{2})/i) > -1) {
                hash = decodeURIComponent(hash);
            }
            if (contains(
                    ['project', 'blocks', 'sprites', 'snapdata'].map(
                        function (each) {
                            return hash.substr(0, 8).indexOf(each);
                        }
                    ),
                    1
                )) {
                this.droppedText(hash);
            } else {
                idx = hash.indexOf("&");
                if (idx > 0) {
                    dict = myself.cloud.parseDict(hash.substr(idx));
                    dict.editMode = true;
                    hash = hash.slice(0, idx);
                    applyFlags(dict);
                }
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
            applyFlags(myself.cloud.parseDict(location.hash.substr(5)));
        } else if (location.hash.substr(0, 9) === '#present:') {
            this.shield = new Morph();
            this.shield.color = this.color;
            this.shield.setExtent(this.parent.extent());
            this.parent.add(this.shield);
            myself.showMessage('Fetching project\nfrom the cloud...');

            // make sure to lowercase the username
            dict = myself.cloud.parseDict(location.hash.substr(9));
            dict.Username = dict.Username.toLowerCase();

            myself.cloud.getPublicProject(
                dict.ProjectName,
                dict.Username,
                function (projectData) {
                    var msg;
                    myself.nextSteps([
                        function () {
                            msg = myself.showMessage('Opening project...');
                        },
                        function () {nop(); }, // yield (bug in Chrome)
                        function () {
                            if (projectData.indexOf('<snapdata') === 0) {
                                myself.rawOpenCloudDataString(projectData);
                            } else if (
                                projectData.indexOf('<project') === 0
                            ) {
                                myself.rawOpenProjectString(projectData);
                            }
                            myself.hasChangedMedia = true;
                        },
                        function () {
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
            dict = myself.cloud.parseDict(location.hash.substr(7));

            myself.cloud.getPublicProject(
                dict.ProjectName,
                dict.Username,
                function (projectData) {
                    var msg;
                    myself.nextSteps([
                        function () {
                            msg = myself.showMessage('Opening project...');
                        },
                        function () {nop(); }, // yield (bug in Chrome)
                        function () {
                            if (projectData.indexOf('<snapdata') === 0) {
                                myself.rawOpenCloudDataString(projectData);
                            } else if (
                                projectData.indexOf('<project') === 0
                            ) {
                                myself.rawOpenProjectString(projectData);
                            }
                            myself.hasChangedMedia = true;
                        },
                        function () {
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
            dict = myself.cloud.parseDict(location.hash.substr(4));
            dict.Username = dict.Username.toLowerCase();

            myself.cloud.getPublicProject(
                dict.ProjectName,
                dict.Username,
                function (projectData) {
                	myself.saveXMLAs(projectData, dict.ProjectName);
                 	myself.showMessage(
                  	   'Saved project\n' + dict.ProjectName,
                      	2
                 	);
                },
                this.cloudError()
            );
        } else if (location.hash.substr(0, 6) === '#lang:') {
            urlLanguage = location.hash.substr(6);
            this.setLanguage(urlLanguage, null, true); // don't persist
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
};

// IDE_Morph construction

IDE_Morph.prototype.buildPanes = function () {
    this.createLogo();
    this.createControlBar();
    this.createCategories();
    this.createPalette();
    this.createStage();
    this.createSpriteBar();
    this.createSpriteEditor();
    this.createCorralBar();
    this.createCorral();
};

IDE_Morph.prototype.createLogo = function () {
    var myself = this;

    if (this.logo) {
        this.logo.destroy();
    }

    this.logo = new Morph();
    this.logo.texture = this.logoURL;
    this.logo.drawNew = function () {
        this.image = newCanvas(this.extent());
        var context = this.image.getContext('2d'),
            gradient = context.createLinearGradient(
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
        var context = this.image.getContext('2d');
        context.drawImage(
            this.cachedTexture,
            5,
            Math.round((this.height() - this.cachedTexture.height) / 2)
        );
        this.changed();
    };

    this.logo.mouseClickLeft = function () {
        myself.snapMenu();
    };

    this.logo.color = new Color();
    this.logo.setExtent(new Point(200, 28)); // dimensions are fixed
    this.add(this.logo);
};

IDE_Morph.prototype.createControlBar = function () {
    // assumes the logo has already been created
    var padding = 5,
        button,
        slider,
        stopButton,
        pauseButton,
        startButton,
        projectButton,
        settingsButton,
        stageSizeButton,
        appModeButton,
        steppingButton,
        cloudButton,
        x,
        colors = [
            this.groupColor,
            this.frameColor.darker(50),
            this.frameColor.darker(50)
        ],
        myself = this;

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
        function () {  // query
            return myself.isSmallStage;
        }
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
        function () {  // query
            return myself.isAppMode;
        }
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

    //steppingButton
    button = new ToggleButtonMorph(
        null, //colors,
        myself, // the IDE is the target
        'toggleSingleStepping',
        [
            new SymbolMorph('footprints', 16),
            new SymbolMorph('footprints', 16)
        ],
        function () {  // query
            return Process.prototype.enableSingleStepping;
        }
    );

    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = new Color(153, 255, 213);
//    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = this.buttonLabelColor;
    button.contrast = this.buttonContrast;
    button.drawNew();
    button.hint = 'Visible stepping';
    button.fixLayout();
    button.refresh();
    steppingButton = button;
    this.controlBar.add(steppingButton);
    this.controlBar.steppingButton = steppingButton; // for refreshing

    // stopButton
    button = new ToggleButtonMorph(
        null, // colors
        this, // the IDE is the target
        'stopAllScripts',
        [
            new SymbolMorph('octagon', 14),
            new SymbolMorph('square', 14)
        ],
        function () {  // query
            return myself.stage ?
                    myself.stage.enableCustomHatBlocks &&
                        myself.stage.threads.pauseCustomHatBlocks
                        : true;
        }
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
        function () {  // query
            return myself.isPaused();
        }
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
    slider.action = function (num) {
        Process.prototype.flashTime = (num - 1) / 100;
        myself.controlBar.refreshResumeSymbol();
    };
    // slider.alpha = MorphicPreferences.isFlat ? 0.1 : 0.3;
    slider.color = new Color(153, 255, 213);
    slider.alpha = 0.3;
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
            function (button) {
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
            function (button) {
                x += padding;
                button.setCenter(myself.controlBar.center());
                button.setLeft(x);
                x += button.width();
            }
        );

        slider.setCenter(myself.controlBar.center());
        slider.setRight(stageSizeButton.left() - padding);

        steppingButton.setCenter(myself.controlBar.center());
        steppingButton.setRight(slider.left() - padding);

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

    this.controlBar.refreshResumeSymbol = function () {
        var pauseSymbols;
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
        var suffix = myself.world().isDevMode ?
                ' - ' + localize('development mode') : '';

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
};

IDE_Morph.prototype.createCategories = function () {
    var myself = this;

    if (this.categories) {
        this.categories.destroy();
    }
    this.categories = new Morph();
    this.categories.color = this.groupColor;
    this.categories.silentSetWidth(this.paletteWidth);

    function addCategoryButton(category) {
        var labelWidth = 75,
            colors = [
                myself.frameColor,
                myself.frameColor.darker(50),
                SpriteMorph.prototype.blockColor[category]
            ],
            button;

        button = new ToggleButtonMorph(
            colors,
            myself, // the IDE is the target
            function () {
                myself.currentCategory = category;
                myself.categories.children.forEach(function (each) {
                    each.refresh();
                });
                myself.refreshPalette(true);
            },
            category[0].toUpperCase().concat(category.slice(1)), // label
            function () {  // query
                return myself.currentCategory === category;
            },
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
        var buttonWidth = myself.categories.children[0].width(),
            buttonHeight = myself.categories.children[0].height(),
            border = 3,
            rows =  Math.ceil((myself.categories.children.length) / 2),
            xPadding = (200 // myself.logo.width()
                - border
                - buttonWidth * 2) / 3,
            yPadding = 2,
            l = myself.categories.left(),
            t = myself.categories.top(),
            i = 0,
            row,
            col;

        myself.categories.children.forEach(function (button) {
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

    SpriteMorph.prototype.categories.forEach(function (cat) {
        if (!contains(['lists', 'other'], cat)) {
            addCategoryButton(cat);
        }
    });
    fixCategoriesLayout();
    this.add(this.categories);
};

IDE_Morph.prototype.createPalette = function (forSearching) {
    // assumes that the logo pane has already been created
    // needs the categories pane for layout
    var myself = this;

    if (this.palette) {
        this.palette.destroy();
    }

    if (forSearching) {
        this.palette = new ScrollFrameMorph(
            null,
            null,
            this.currentSprite.sliderColor
        );

        // search toolbar (floating cancel button):
        /* commented out for now
        this.palette.toolBar = new PushButtonMorph(
            this,
            function () {
                myself.refreshPalette();
                myself.palette.adjustScrollBars();
            },
            new SymbolMorph("magnifierOutline", 16)
        );
        this.palette.toolBar.alpha = 0.2;
        this.palette.toolBar.padding = 1;
        // this.palette.toolBar.hint = 'Cancel';
        this.palette.toolBar.labelShadowColor = new Color(140, 140, 140);
        this.palette.toolBar.drawNew();
        this.palette.toolBar.fixLayout();
        this.palette.add(this.palette.toolBar);
	    */
    } else {
        this.palette = this.currentSprite.palette(this.currentCategory);
    }
    this.palette.isDraggable = false;
    this.palette.acceptsDrops = true;
    this.palette.enableAutoScrolling = false;
    this.palette.contents.acceptsDrops = false;

    this.palette.reactToDropOf = function (droppedMorph, hand) {
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

    this.palette.contents.reactToDropOf = function (droppedMorph) {
        // for "undrop" operation
        if (droppedMorph instanceof BlockMorph) {
            droppedMorph.destroy();
        }
    };

    this.palette.setWidth(this.logo.width());
    this.add(this.palette);
    return this.palette;
};

IDE_Morph.prototype.createPaletteHandle = function () {
    // assumes that the palette has already been created
    if (this.paletteHandle) {this.paletteHandle.destroy(); }
    this.paletteHandle = new PaletteHandleMorph(this.categories);
    this.add(this.paletteHandle);
};

IDE_Morph.prototype.createStage = function () {
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
};

IDE_Morph.prototype.createStageHandle = function () {
    // assumes that the stage has already been created
    if (this.stageHandle) {this.stageHandle.destroy(); }
    this.stageHandle = new StageHandleMorph(this.stage);
    this.add(this.stageHandle);
};

IDE_Morph.prototype.createSpriteBar = function () {
    // assumes that the categories pane has already been created
    var rotationStyleButtons = [],
        thumbSize = new Point(45, 45),
        nameField,
        padlock,
        thumbnail,
        tabCorner = 15,
        tabColors = this.tabColors,
        tabBar = new AlignmentMorph('row', -tabCorner * 2),
        tab,
        symbols = ['\u2192', '\u21BB', '\u2194'],
        labels = ['don\'t rotate', 'can rotate', 'only face left/right'],
        myself = this;

    if (this.spriteBar) {
        this.spriteBar.destroy();
    }

    this.spriteBar = new Morph();
    this.spriteBar.color = this.frameColor;
    this.add(this.spriteBar);

    function addRotationStyleButton(rotationStyle) {
        var colors = myself.rotationStyleColors,
            button;

        button = new ToggleButtonMorph(
            colors,
            myself, // the IDE is the target
            function () {
                if (myself.currentSprite instanceof SpriteMorph) {
                    myself.currentSprite.rotationStyle = rotationStyle;
                    myself.currentSprite.changed();
                    myself.currentSprite.drawNew();
                    myself.currentSprite.changed();
                }
                rotationStyleButtons.forEach(function (each) {
                    each.refresh();
                });
            },
            symbols[rotationStyle], // label
            function () {  // query
                return myself.currentSprite instanceof SpriteMorph
                    && myself.currentSprite.rotationStyle === rotationStyle;
            },
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

    thumbnail.step = function () {
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
    this.spriteBar.nameField = nameField;
    nameField.drawNew();
    nameField.accept = function () {
        var newName = nameField.getValue();
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
        function () {
            myself.currentSprite.isDraggable =
                !myself.currentSprite.isDraggable;
        },
        localize('draggable'),
        function () {
            return myself.currentSprite.isDraggable;
        }
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
        var active;
        myself.currentTab = tabString;
        this.children.forEach(function (each) {
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
        function () {tabBar.tabTo('scripts'); },
        localize('Scripts'), // label
        function () {  // query
            return myself.currentTab === 'scripts';
        }
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
        function () {tabBar.tabTo('costumes'); },
        localize(this.currentSprite instanceof SpriteMorph ?
            'Costumes' : 'Backgrounds'
        ),
        function () {  // query
            return myself.currentTab === 'costumes';
        }
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
        function () {tabBar.tabTo('sounds'); },
        localize('Sounds'), // label
        function () {  // query
            return myself.currentTab === 'sounds';
        }
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
    tabBar.children.forEach(function (each) {
        each.refresh();
    });
    this.spriteBar.tabBar = tabBar;
    this.spriteBar.add(this.spriteBar.tabBar);

    this.spriteBar.fixLayout = function () {
        this.tabBar.setLeft(this.left());
        this.tabBar.setBottom(this.bottom());
    };
};

IDE_Morph.prototype.createSpriteEditor = function () {
    // assumes that the logo pane and the stage have already been created
    var scripts = this.currentSprite.scripts,
        myself = this;

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
        scripts.updateToolbar();
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
        this.spriteEditor.reactToDropOf = function (droppedMorph) {
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
};

IDE_Morph.prototype.createCorralBar = function () {
    // assumes the stage has already been created
    var padding = 5,
        newbutton,
        paintbutton,
        cambutton,
        colors = [
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
        cambutton.hint = "take a camera snapshot and\n" +
        	"import it as a new sprite";
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
        this.corralBar.add(cambutton);
        document.addEventListener(
            'cameraDisabled',
            function (event) {
                cambutton.disable();
                cambutton.hint =
                    CamSnapshotDialogMorph.prototype.notSupportedMessage;
            }
        );
    }
};

IDE_Morph.prototype.createCorral = function () {
    // assumes the corral bar has already been created
    var frame, template, padding = 5, myself = this;

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

    frame.contents.wantsDropOf = function (morph) {
        return morph instanceof SpriteIconMorph;
    };

    frame.contents.reactToDropOf = function (spriteIcon) {
        myself.corral.reactToDropOf(spriteIcon);
    };

    frame.alpha = 0;

    this.sprites.asArray().forEach(function (morph) {
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
        var x = this.frame.left(),
            y = this.frame.top(),
            max = this.frame.right(),
            start = this.frame.left();

        this.frame.contents.children.forEach(function (icon) {
            var w = icon.width();

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
        this.frame.contents.children.forEach(function (icon) {
            icon.refresh();
        });
    };

    this.corral.wantsDropOf = function (morph) {
        return morph instanceof SpriteIconMorph;
    };

    this.corral.reactToDropOf = function (spriteIcon) {
        var idx = 1,
            pos = spriteIcon.position();
        spriteIcon.destroy();
        this.frame.contents.children.forEach(function (icon) {
            if (pos.gt(icon.position()) || pos.y > icon.bottom()) {
                idx += 1;
            }
        });
        myself.sprites.add(spriteIcon.object, idx);
        myself.createCorral();
        myself.fixLayout();
    };
};

// IDE_Morph layout

IDE_Morph.prototype.fixLayout = function (situation) {
    // situation is a string, i.e.
    // 'selectSprite' or 'refreshPalette' or 'tabEditor'
    var padding = this.padding,
        flag,
        maxPaletteWidth;

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
        if (this.isEmbedMode) {
            this.stage.setScale(Math.floor(Math.min(
                this.width() / this.stage.dimensions.x,
                this.height() / this.stage.dimensions.y
                ) * 100) / 100);
            flag = this.embedPlayButton.flag;
            flag.size = Math.floor(Math.min(
                        this.width(), this.height())) / 5;
            flag.setWidth(flag.size);
            flag.setHeight(flag.size);
            this.embedPlayButton.size = flag.size * 1.6;
            this.embedPlayButton.setWidth(this.embedPlayButton.size);
            this.embedPlayButton.setHeight(this.embedPlayButton.size);
            if (this.embedOverlay) {
                this.embedOverlay.setExtent(this.extent());
            }
            this.stage.setCenter(this.center());
            this.embedPlayButton.setCenter(this.stage.center());
            flag.setCenter(this.embedPlayButton.center());
            flag.setLeft(flag.left() + flag.size * 0.1); // account for slight asymmetry
        } else if (this.isAppMode) {
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
};

IDE_Morph.prototype.setProjectName = function (string) {
    this.projectName = string.replace(/['"]/g, ''); // filter quotation marks
    this.hasChangedMedia = true;
    this.controlBar.updateLabel();
};

// IDE_Morph resizing

IDE_Morph.prototype.setExtent = function (point) {
    var padding = new Point(430, 110),
        minExt,
        ext,
        maxWidth,
        minWidth,
        maxHeight,
        minRatio,
        maxRatio;

    // determine the minimum dimensions making sense for the current mode
    if (this.isAppMode) {
        if (this.isEmbedMode) {
            minExt = new Point(100, 100);
        } else {
            minExt = StageMorph.prototype.dimensions.add(
                this.controlBar.height() + 10
            );
        }
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
    IDE_Morph.uber.setExtent.call(this, ext);
    this.fixLayout();
};

// IDE_Morph events

IDE_Morph.prototype.reactToWorldResize = function (rect) {
    if (this.isAutoFill) {
        this.setPosition(rect.origin);
        this.setExtent(rect.extent());
    }
    if (this.filePicker) {
        document.body.removeChild(this.filePicker);
        this.filePicker = null;
    }
};

IDE_Morph.prototype.droppedImage = function (aCanvas, name) {
    var costume = new Costume(
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
};

IDE_Morph.prototype.droppedSVG = function (anImage, name) {
    var costume = new SVG_Costume(anImage, name.split('.')[0]);
    this.currentSprite.addCostume(costume);
    this.currentSprite.wearCostume(costume);
    this.spriteBar.tabBar.tabTo('costumes');
    this.hasChangedMedia = true;
};

IDE_Morph.prototype.droppedAudio = function (anAudio, name) {
	var myself = this;
    if (anAudio.src.indexOf('data:audio') !== 0) {
    	// fetch and base 64 encode samples using FileReader
    	this.getURL(
        	anAudio.src,
        	function (blob) {
                var reader = new window.FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = function() {
                	var base64 = reader.result;
                    base64 = 'data:audio/ogg;base64,' +
                        base64.split(',')[1];
                    anAudio.src = base64;
                    myself.droppedAudio(anAudio, name);
                };
            },
            'blob'
        );
    } else {
    	this.currentSprite.addSound(anAudio, name.split('.')[0]); // up to '.'
    	this.spriteBar.tabBar.tabTo('sounds');
    	this.hasChangedMedia = true;
    }
};

IDE_Morph.prototype.droppedText = function (aString, name, fileType) {
    var lbl = name ? name.split('.')[0] : '',
        ext = name ? name.slice(name.lastIndexOf('.') + 1).toLowerCase() : '';

    // check for Snap specific files, projects, libraries, sprites, scripts
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
    if (aString.indexOf('<script') === 0) {
        return this.openScriptString(aString);
    }

    // check for encoded data-sets, CSV, JSON
    if (fileType.indexOf('csv') !== -1 || ext === 'csv') {
        return this.openDataString(aString, lbl, 'csv');
    }
    if (fileType.indexOf('json') !== -1 || ext === 'json') {
        return this.openDataString(aString, lbl, 'json');
    }

    // import as plain text data
    this.openDataString(aString, lbl, 'text');
};

IDE_Morph.prototype.droppedBinary = function (anArrayBuffer, name) {
    // dynamically load ypr->Snap!
    var ypr = document.getElementById('ypr'),
        myself = this,
        suffix = name.substring(name.length - 3);

    if (suffix.toLowerCase() !== 'ypr') {return; }

    function loadYPR(buffer, lbl) {
        var reader = new sb.Reader(),
            pname = lbl.split('.')[0]; // up to period
        reader.onload = function (info) {
            myself.droppedText(new sb.XMLWriter().write(pname, info));
        };
        reader.readYPR(new Uint8Array(buffer));
    }

    if (!ypr) {
        ypr = document.createElement('script');
        ypr.id = 'ypr';
        ypr.onload = function () {loadYPR(anArrayBuffer, name); };
        document.head.appendChild(ypr);
        ypr.src = this.resourceURL('src', 'ypr.js');
    } else {
        loadYPR(anArrayBuffer, name);
    }
};

// IDE_Morph button actions

IDE_Morph.prototype.refreshPalette = function (shouldIgnorePosition) {
    var oldTop = this.palette.contents.top();

    this.createPalette();
    if (this.isAppMode) {
        this.palette.hide();
        return;
    }
    this.fixLayout('refreshPalette');
    if (!shouldIgnorePosition) {
        this.palette.contents.setTop(oldTop);
    }
};

IDE_Morph.prototype.pressStart = function () {
    if (this.world().currentKey === 16) { // shiftClicked
        this.toggleFastTracking();
    } else {
        this.stage.threads.pauseCustomHatBlocks = false;
        this.controlBar.stopButton.refresh();
        this.runScripts();
    }
};

IDE_Morph.prototype.toggleFastTracking = function () {
    if (this.stage.isFastTracked) {
        this.stopFastTracking();
    } else {
        this.startFastTracking();
    }
};

IDE_Morph.prototype.toggleVariableFrameRate = function () {
    if (StageMorph.prototype.frameRate) {
        StageMorph.prototype.frameRate = 0;
        this.stage.fps = 0;
    } else {
        StageMorph.prototype.frameRate = 30;
        this.stage.fps = 30;
    }
};

IDE_Morph.prototype.toggleSingleStepping = function () {
    this.stage.threads.toggleSingleStepping();
    this.controlBar.steppingButton.refresh();
    this.controlBar.refreshSlider();
};

IDE_Morph.prototype.toggleCameraSupport = function () {
    CamSnapshotDialogMorph.prototype.enableCamera =
        !CamSnapshotDialogMorph.prototype.enableCamera;
    this.spriteBar.tabBar.tabTo(this.currentTab);
    this.createCorralBar();
    this.fixLayout();
};

IDE_Morph.prototype.startFastTracking = function () {
    this.stage.isFastTracked = true;
    this.stage.fps = 0;
    this.controlBar.startButton.labelString = new SymbolMorph('flash', 14);
    this.controlBar.startButton.drawNew();
    this.controlBar.startButton.fixLayout();
};

IDE_Morph.prototype.stopFastTracking = function () {
    this.stage.isFastTracked = false;
    this.stage.fps = this.stage.frameRate;
    this.controlBar.startButton.labelString = new SymbolMorph('flag', 14);
    this.controlBar.startButton.drawNew();
    this.controlBar.startButton.fixLayout();
};

IDE_Morph.prototype.runScripts = function () {
    this.stage.fireGreenFlagEvent();
};

IDE_Morph.prototype.togglePauseResume = function () {
    if (this.stage.threads.isPaused()) {
        this.stage.threads.resumeAll(this.stage);
    } else {
        this.stage.threads.pauseAll(this.stage);
    }
    this.controlBar.pauseButton.refresh();
};

IDE_Morph.prototype.isPaused = function () {
    if (!this.stage) {return false; }
    return this.stage.threads.isPaused();
};

IDE_Morph.prototype.stopAllScripts = function () {
    if (this.stage.enableCustomHatBlocks) {
        this.stage.threads.pauseCustomHatBlocks =
            !this.stage.threads.pauseCustomHatBlocks;
    } else {
        this.stage.threads.pauseCustomHatBlocks = false;
    }
    this.controlBar.stopButton.refresh();
    this.stage.fireStopAllEvent();
};

IDE_Morph.prototype.selectSprite = function (sprite) {
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
};

// IDE_Morph retina display support

IDE_Morph.prototype.toggleRetina = function () {
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
};

// IDE_Morph skins

IDE_Morph.prototype.defaultDesign = function () {
    this.setDefaultDesign();
    this.refreshIDE();
    this.removeSetting('design');
};

IDE_Morph.prototype.flatDesign = function () {
    this.setFlatDesign();
    this.refreshIDE();
    this.saveSetting('design', 'flat');
};

IDE_Morph.prototype.refreshIDE = function () {
    var projectData;

    if (Process.prototype.isCatchingErrors) {
        try {
            projectData = this.serializer.serialize(this.stage);
        } catch (err) {
            this.showMessage('Serialization failed: ' + err);
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
};

// IDE_Morph settings persistance

IDE_Morph.prototype.applySavedSettings = function () {
    var design = this.getSetting('design'),
        zoom = this.getSetting('zoom'),
        language = this.getSetting('language'),
        click = this.getSetting('click'),
        longform = this.getSetting('longform'),
        longurls = this.getSetting('longurls'),
        plainprototype = this.getSetting('plainprototype'),
        keyboard = this.getSetting('keyboard'),
        tables = this.getSetting('tables'),
        tableLines = this.getSetting('tableLines'),
        autoWrapping = this.getSetting('autowrapping');

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
};

IDE_Morph.prototype.saveSetting = function (key, value) {
    if (!this.savingPreferences) {
        return;
    }
    if (this.hasLocalStorage()) {
        localStorage['-snap-setting-' + key] = value;
    }
};

IDE_Morph.prototype.getSetting = function (key) {
    if (this.hasLocalStorage()) {
        return localStorage['-snap-setting-' + key];
    }
    return null;
};

IDE_Morph.prototype.removeSetting = function (key) {
    if (this.hasLocalStorage()) {
        delete localStorage['-snap-setting-' + key];
    }
};

IDE_Morph.prototype.hasLocalStorage = function () {
	// checks whether localStorage is available,
    // this kludgy try/catch mechanism is needed
    // because Safari 11 is paranoid about accessing
    // localstorage from the file:// protocol
	try {
		return !isNil(localStorage);
	} catch (err) {
    	return false;
	}
};

// IDE_Morph sprite list access

IDE_Morph.prototype.addNewSprite = function () {
    var sprite = new SpriteMorph(this.globalVariables),
        rnd = Process.prototype.reportRandom;

    sprite.name = this.newSpriteName(sprite.name);
    sprite.setCenter(this.stage.center());
    this.stage.add(sprite);

    // randomize sprite properties
    sprite.setColorComponentHSVA(0, rnd.call(this, 0, 100));
    sprite.setColorComponentHSVA(1, 100);
    sprite.setColorComponentHSVA(2, rnd.call(this, 50, 100));

    sprite.setXPosition(rnd.call(this, -220, 220));
    sprite.setYPosition(rnd.call(this, -160, 160));

    if (this.world().currentKey === 16) { // shift-click
        sprite.turn(rnd.call(this, 1, 360));
    }

    this.sprites.add(sprite);
    this.corral.addSprite(sprite);
    this.selectSprite(sprite);
};

IDE_Morph.prototype.paintNewSprite = function () {
    var sprite = new SpriteMorph(this.globalVariables),
        cos = new Costume(),
        myself = this;

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
        function () {myself.removeSprite(sprite); },
        function () {
            sprite.addCostume(cos);
            sprite.wearCostume(cos);
        }
    );
};

IDE_Morph.prototype.newCamSprite = function () {
    var sprite = new SpriteMorph(this.globalVariables),
        camDialog,
        myself = this;

    sprite.name = this.newSpriteName(sprite.name);
    sprite.setCenter(this.stage.center());
    this.stage.add(sprite);
    this.sprites.add(sprite);
    this.corral.addSprite(sprite);
    this.selectSprite(sprite);

    camDialog = new CamSnapshotDialogMorph(
        this,
        sprite,
        function () { myself.removeSprite(sprite); },
        function (costume) {
            sprite.addCostume(costume);
            sprite.wearCostume(costume);
            this.close();
        });

    camDialog.popUp(this.world());
};

IDE_Morph.prototype.recordNewSound = function () {
    var soundRecorder,
        myself = this;

    soundRecorder = new SoundRecorderDialogMorph(
        function (sound) {
            if (sound) {
                myself.currentSprite.addSound(
                	sound,
                    myself.newSoundName('recording')
                );
                myself.spriteBar.tabBar.tabTo('sounds');
                myself.hasChangedMedia = true;
            }
        });

    soundRecorder.key = 'microphone';
    soundRecorder.popUp(this.world());
};

IDE_Morph.prototype.duplicateSprite = function (sprite) {
    var duplicate = sprite.fullCopy();
    duplicate.isDown = false;
    duplicate.setPosition(this.world().hand.position());
    duplicate.appearIn(this);
    duplicate.keepWithin(this.stage);
    duplicate.isDown = sprite.isDown;
    this.selectSprite(duplicate);
};

IDE_Morph.prototype.instantiateSprite = function (sprite) {
    var instance = sprite.fullCopy(true),
        hats = instance.allHatBlocksFor('__clone__init__');
    instance.isDown = false;
    instance.appearIn(this);
    if (hats.length) {
        instance.initClone(hats);
    } else {
        instance.setPosition(this.world().hand.position());
        instance.keepWithin(this.stage);
    }
    instance.isDown = sprite.isDown;
    this.selectSprite(instance);
};

IDE_Morph.prototype.removeSprite = function (sprite) {
    var idx, myself = this;
    sprite.parts.slice().forEach(function (part) {
    	myself.removeSprite(part);
    });
    idx = this.sprites.asArray().indexOf(sprite) + 1;
    this.stage.threads.stopAllForReceiver(sprite);
    sprite.corpsify();
    sprite.destroy();
    this.stage.watchers().forEach(function (watcher) {
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
        function (morph) {
            return morph instanceof SpriteMorph && !morph.isTemporary;
        }
    ) || this.stage;

    this.selectSprite(this.currentSprite);
};

IDE_Morph.prototype.newSoundName = function (name) {
    var lastSound =
            this.currentSprite.sounds.at(
                this.currentSprite.sounds.length());

    return this.newName(
        name || lastSound.name,
        this.currentSprite.sounds.asArray().map(
            function (eachSound) {
                return eachSound.name;
            }
        )
    );
};

IDE_Morph.prototype.newSpriteName = function (name, ignoredSprite) {
    var all = this.sprites.asArray().concat(this.stage).filter(
            function (each) {return each !== ignoredSprite; }
        ).map(
            function (each) {return each.name; }
        );
    return this.newName(name, all);
};

IDE_Morph.prototype.newName = function (name, elements) {
    var ix = name.indexOf('('),
        stem = (ix < 0) ? name : name.substring(0, ix),
        count = 1,
        newName = stem;

    while (contains(elements, newName)) {
        count += 1;
        newName = stem + '(' + count + ')';
    }
    return newName;
};

// IDE_Morph deleting scripts

IDE_Morph.prototype.removeBlock = function (aBlock, justThis) {
    this.stage.threads.stopAllForBlock(aBlock);
    aBlock.destroy(justThis);
};

// IDE_Morph menus

IDE_Morph.prototype.userMenu = function () {
    var menu = new MenuMorph(this);
    // menu.addItem('help', 'nop');
    return menu;
};

IDE_Morph.prototype.snapMenu = function () {
    var menu,
        myself = this,
        world = this.world();

    menu = new MenuMorph(this);
    menu.addItem('About...', 'aboutSnap');
    menu.addLine();
    menu.addItem(
        'Reference manual',
        function () {
            var url = myself.resourceURL('help', 'SnapManual.pdf');
            window.open(url, 'SnapReferenceManual');
        }
    );
    menu.addItem(
        'Snap! website',
        function () {
            window.open('http://snap.berkeley.edu/', 'SnapWebsite');
        }
    );
    menu.addItem(
        'Download source',
        function () {
            window.open(
                'https://github.com/jmoenig/Snap/releases/latest',
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
};

IDE_Morph.prototype.cloudMenu = function () {
    var menu,
        myself = this,
        world = this.world(),
        pos = this.controlBar.cloudButton.bottomLeft(),
        shiftClicked = (world.currentKey === 16);

    if (location.protocol === 'file:' && !shiftClicked) {
        this.showMessage('cloud unavailable without a web server.');
        return;
    }

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
    if (!this.cloud.username) {
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
        menu.addItem(
            'Resend Verification Email...',
            'resendVerification'
        );
    } else {
        menu.addItem(
            localize('Logout') + ' ' + this.cloud.username,
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
            function () {
                if (myself.projectName) {
                    myself.exportProjectMedia(myself.projectName);
                } else {
                    myself.prompt('Export Project As...', function (name) {
                        myself.exportProjectMedia(name);
                    }, null, 'exportProject');
                }
            },
            null,
            this.hasChangedMedia ? new Color(100, 0, 0) : new Color(0, 100, 0)
        );
        menu.addItem(
            'export project without media...',
            function () {
                if (myself.projectName) {
                    myself.exportProjectNoMedia(myself.projectName);
                } else {
                    myself.prompt('Export Project As...', function (name) {
                        myself.exportProjectNoMedia(name);
                    }, null, 'exportProject');
                }
            },
            null,
            new Color(100, 0, 0)
        );
        menu.addItem(
            'export project as cloud data...',
            function () {
                if (myself.projectName) {
                    myself.exportProjectAsCloudData(myself.projectName);
                } else {
                    myself.prompt('Export Project As...', function (name) {
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
            function () {
                myself.prompt('Author name…', function (usr) {
                    myself.prompt('Project name...', function (prj) {
                        myself.showMessage(
                            'Fetching project\nfrom the cloud...'
                        );
                        myself.cloud.getPublicProject(
                            prj,
                            usr.toLowerCase(),
                            function (projectData) {
                                var msg;
                                if (!Process.prototype.isCatchingErrors) {
                                    window.open(
                                        'data:text/xml,' + projectData
                                    );
                                }
                                myself.nextSteps([
                                    function () {
                                        msg = myself.showMessage(
                                            'Opening project...'
                                        );
                                    },
                                    function () {nop(); }, // yield (Chrome)
                                    function () {
                                        myself.rawOpenCloudDataString(
                                            projectData
                                        );
                                    },
                                    function () {
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
};

IDE_Morph.prototype.settingsMenu = function () {
    var menu,
        stage = this.stage,
        world = this.world(),
        myself = this,
        pos = this.controlBar.settingsButton.bottomLeft(),
        shiftClicked = (world.currentKey === 16);

    function addPreference(label, toggle, test, onHint, offHint, hide) {
        var on = '\u2611 ',
            off = '\u2610 ';
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
    menu.addPair(
        [
            new SymbolMorph(
                'globe',
                MorphicPreferences.menuFontSize
            ),
            localize('Language...')
        ],
        'languageMenu'
    );
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
    menu.addItem(
        'Microphone resolution...',
        'microphoneMenu'
    );
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
        'Ternary Boolean slots',
        function () {
        	BooleanSlotMorph.prototype.isTernary =
        		!BooleanSlotMorph.prototype.isTernary;
      	},
        BooleanSlotMorph.prototype.isTernary,
        'uncheck to limit\nBoolean slots to true / false',
        'check to allow\nempty Boolean slots',
        true
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
        function () {
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
        function () {myself.isAnimating = !myself.isAnimating; },
        myself.isAnimating,
        'uncheck to disable\nIDE animations',
        'check to enable\nIDE animations',
        true
    );
    addPreference(
        'Cache Inputs',
        function () {
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
        function () {
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
        function () {
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
        function () {
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
        function () {
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
        function () {
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
        function () {
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
        function () {
            ScriptsMorph.prototype.enableKeyboard =
                !ScriptsMorph.prototype.enableKeyboard;
            myself.currentSprite.scripts.updateToolbar();
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
        function () {
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
            function () {
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
        function () {
            Process.prototype.enableLiveCoding =
                !Process.prototype.enableLiveCoding;
        },
        Process.prototype.enableLiveCoding,
        'EXPERIMENTAL! uncheck to disable live\ncustom control structures',
        'EXPERIMENTAL! check to enable\n live custom control structures',
        true
    );
    addPreference(
        'JIT compiler support',
        function () {
            Process.prototype.enableCompiling =
                !Process.prototype.enableCompiling;
            myself.currentSprite.blocksCache.operators = null;
            myself.currentSprite.paletteCache.operators = null;
            myself.refreshPalette();
        },
        Process.prototype.enableCompiling,
        'EXPERIMENTAL! uncheck to disable live\nsupport for compiling',
        'EXPERIMENTAL! check to enable\nsupport for compiling',
        true
    );
    menu.addLine(); // everything below this line is stored in the project
    addPreference(
        'Thread safe scripts',
        function () {stage.isThreadSafe = !stage.isThreadSafe; },
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
        function () {
            SpriteMorph.prototype.useFlatLineEnds =
                !SpriteMorph.prototype.useFlatLineEnds;
        },
        SpriteMorph.prototype.useFlatLineEnds,
        'uncheck for round ends of lines',
        'check for flat ends of lines'
    );
    addPreference(
        'Codification support',
        function () {
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
        function () {
            StageMorph.prototype.enableInheritance =
                !StageMorph.prototype.enableInheritance;
            myself.currentSprite.blocksCache.variables = null;
            myself.currentSprite.paletteCache.variables = null;
            myself.refreshPalette();
        },
        StageMorph.prototype.enableInheritance,
        'uncheck to disable\nsprite inheritance features',
        'check for sprite\ninheritance features',
        true
    );
    addPreference(
        'Persist linked sublist IDs',
        function () {
            StageMorph.prototype.enableSublistIDs =
                !StageMorph.prototype.enableSublistIDs;
        },
        StageMorph.prototype.enableSublistIDs,
        'uncheck to disable\nsaving linked sublist identities',
        'check to enable\nsaving linked sublist identities',
        true
    );
    addPreference(
        'Enable command drops in all rings',
        function () {
            RingReporterSlotMorph.prototype.enableCommandDrops =
                !RingReporterSlotMorph.prototype.enableCommandDrops;
        },
        RingReporterSlotMorph.prototype.enableCommandDrops,
        'uncheck to disable\ndropping commands in reporter rings',
        'check to enable\ndropping commands in all rings',
        true
    );
    menu.popup(world, pos);
};

IDE_Morph.prototype.projectMenu = function () {
    var menu,
        myself = this,
        world = this.world(),
        pos = this.controlBar.projectButton.bottomLeft(),
        graphicsName = this.currentSprite instanceof SpriteMorph ?
                'Costumes' : 'Backgrounds',
        shiftClicked = (world.currentKey === 16);

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
        'importLocalFile',
        'file menu import hint' // looks up the actual text in the translator
    );

    if (shiftClicked) {
        menu.addItem(
            localize(
                'Export project...') + ' ' + localize('(in a new window)'
            ),
            function () {
                if (myself.projectName) {
                    myself.exportProject(myself.projectName, shiftClicked);
                } else {
                    myself.prompt('Export Project As...', function (name) {
                        // false - override the shiftClick setting to use XML
                        myself.exportProject(name, false);
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
        function () {
            if (myself.projectName) {
                myself.exportProject(myself.projectName, shiftClicked);
            } else {
                myself.prompt('Export Project As...', function (name) {
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
            function () {myself.exportGlobalBlocks(); },
            'show global custom block definitions as XML' +
                '\nin a new browser window'
        );
        menu.addItem(
            'Unused blocks...',
            function () {myself.removeUnusedBlocks(); },
            'find unused global custom blocks' +
                '\nand remove their definitions'
        );
    }

    menu.addItem(
        'Export summary...',
        function () {myself.exportProjectSummary(); },
        'open a new browser browser window\n with a summary of this project'
    );

    if (shiftClicked) {
        menu.addItem(
            'Export summary with drop-shadows...',
            function () {myself.exportProjectSummary(true); },
            'open a new browser browser window' +
                '\nwith a summary of this project' +
                '\nwith drop-shadows on all pictures.' +
                '\nnot supported by all browsers',
            new Color(100, 0, 0)
        );
        menu.addItem(
            'Export all scripts as pic...',
            function () {myself.exportScriptsPicture(); },
            'show a picture of all scripts\nand block definitions',
            new Color(100, 0, 0)
        );
    }

    menu.addLine();
    menu.addItem(
        'Libraries...',
        function() {
            if (location.protocol === 'file:') {
                myself.importLocalFile();
                return;
            }
            myself.getURL(
                myself.resourceURL('libraries', 'LIBRARIES'),
                function (txt) {
                    var libraries = myself.parseResourceFile(txt);
                    new LibraryImportDialogMorph(myself, libraries).popUp();
                }
            );
        },
        'Select categories of additional blocks to add to this project.'
    );

    menu.addItem(
        localize(graphicsName) + '...',
        function () {
            if (location.protocol === 'file:') {
                myself.importLocalFile();
                return;
            }
            myself.importMedia(graphicsName);
        },
        'Select a costume from the media library'
    );
    menu.addItem(
        localize('Sounds') + '...',
        function () {
            if (location.protocol === 'file:') {
                myself.importLocalFile();
                return;
            }
            myself.importMedia('Sounds');
        },
        'Select a sound from the media library'
    );

    menu.popup(world, pos);
};

IDE_Morph.prototype.resourceURL = function () {
    // Take in variadic inputs that represent an a nested folder structure.
    // Method can be easily overridden if running in a custom location.
    // Default Snap! simply returns a path (relative to snap.html)
    var args = Array.prototype.slice.call(arguments, 0);
    return args.join('/');
};

IDE_Morph.prototype.getMediaList = function (dirname, callback) {
    // Invoke the given callback with a list of files in a directory
    // based on the contents file.
    // If no callback is specified, synchronously return the list of files
    // Note: Synchronous fetching has been deprecated and should be switched
    var url = this.resourceURL(dirname, dirname.toUpperCase()),
        async = callback instanceof Function,
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

IDE_Morph.prototype.parseResourceFile = function (text) {
    // A Resource File lists all the files that could be loaded in a submenu
    // Examples are libraries/LIBRARIES, Costumes/COSTUMES, etc
    // The file format is tab-delimited, with unix newlines:
    // file-name, Display Name, Help Text (optional)
    var parts,
        items = [];

    text.split('\n').map(function (line) {
        return line.trim();
    }).filter(function (line) {
        return line.length > 0;
    }).forEach(function (line) {
        parts = line.split('\t').map(function (str) { return str.trim(); });

        if (parts.length < 2) {return; }

        items.push({
            fileName: parts[0],
            name: parts[1],
            description: parts.length > 2 ? parts[2] : ''
        });
    });

    return items;
};

IDE_Morph.prototype.importLocalFile = function () {
    var inp = document.createElement('input'),
        myself = this,
        world = this.world();

    if (this.filePicker) {
        document.body.removeChild(this.filePicker);
        this.filePicker = null;
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
            document.body.removeChild(inp);
            myself.filePicker = null;
            world.hand.processDrop(inp.files);
        },
        false
    );
    document.body.appendChild(inp);
    this.filePicker = inp;
    inp.click();
};

IDE_Morph.prototype.importMedia = function (folderName) {
    // open a dialog box letting the user browse available "built-in"
    // costumes, backgrounds or sounds
    var myself = this,
        msg = this.showMessage('Opening ' + folderName + '...');
    this.getMediaList(
        folderName,
        function (items) {
            msg.destroy();
            myself.popupMediaImportDialog(folderName, items);
        }
    );

};

IDE_Morph.prototype.popupMediaImportDialog = function (folderName, items) {
    // private - this gets called by importMedia() and creates
    // the actual dialog
    var dialog = new DialogBoxMorph().withKey('import' + folderName),
        frame = new ScrollFrameMorph(),
        selectedIcon = null,
        turtle = new SymbolMorph('turtle', 60),
        myself = this,
        world = this.world(),
        handle;

    frame.acceptsDrops = false;
    frame.contents.acceptsDrops = false;
    frame.color = myself.groupColor;
    frame.fixLayout = nop;
    dialog.labelString = folderName;
    dialog.createLabel();
    dialog.addBody(frame);
    dialog.addButton('ok', 'Import');
    dialog.addButton('cancel', 'Cancel');

    dialog.ok = function () {
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
        var th = fontHeight(this.titleFontSize) + this.titlePadding * 2,
            x = 0,
            y = 0,
            fp, fw;
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
        frame.contents.children.forEach(function (icon) {
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

    items.forEach(function (item) {
        // Caution: creating very many thumbnails can take a long time!
        var url = myself.resourceURL(folderName, item.fileName),
            img = new Image(),
            suffix = url.slice(url.lastIndexOf('.') + 1).toLowerCase(),
            isSVG = suffix === 'svg' && !MorphicPreferences.rasterizeSVGs,
            isSound = contains(['wav', 'mp3'], suffix),
            cstTemplate,
            sndTemplate,
            icon;

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
        icon.action = function () {
            if (selectedIcon === icon) {return; }
            var prevSelected = selectedIcon;
            selectedIcon = icon;
            if (prevSelected) {prevSelected.refresh(); }
        };
        icon.doubleClickAction = dialog.ok;
        icon.query = function () {
            return icon === selectedIcon;
        };
        frame.addContents(icon);
        if (isSound) {
            icon.object.audio.onloadeddata = function () {
                icon.createThumbnail();
                icon.fixLayout();
                icon.refresh();
            };

            icon.object.audio.src = url;
            icon.object.audio.load();
        } else if (isSVG) {
            img.onload = function () {
                icon.object = new SVG_Costume(img, item.name);
                icon.refresh();
            };
            myself.getURL(
                url,
                function (txt) {
                    img.src = 'data:image/svg+xml;base64,' +
                         window.btoa(txt);
                }
            );
        } else {
            img.onload = function () {
                var canvas = newCanvas(new Point(img.width, img.height), true);
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
};

// IDE_Morph menu actions

IDE_Morph.prototype.aboutSnap = function () {
    var dlg, aboutTxt, noticeTxt, creditsTxt, versions = '', translations,
        module, btn1, btn2, btn3, btn4, licenseBtn, translatorsBtn,
        world = this.world();

    aboutTxt = 'Snap! 5.0.5\nBuild Your Own Blocks\n\n'
        + 'Copyright \u24B8 2019 Jens M\u00F6nig and '
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

    noticeTxt = localize('License')
        + '\n\n'
        + 'Snap! is free software: you can redistribute it and/or modify\n'
        + 'it under the terms of the GNU Affero General Public License as\n'
        + 'published by the Free Software Foundation, either version 3 of\n'
        + 'the License, or (at your option) any later version.\n\n'

        + 'This program is distributed in the hope that it will be useful,\n'
        + 'but WITHOUT ANY WARRANTY; without even the implied warranty of\n'
        + 'MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the\n'
        + 'GNU Affero General Public License for more details.\n\n'

        + 'You should have received a copy of the\n'
        + 'GNU Affero General Public License along with this program.\n'
        + 'If not, see http://www.gnu.org/licenses/\n\n'

        + 'Want to use Snap! but scared by the open-source license?\n'
        + 'Get in touch with us, we\'ll make it work.';

    creditsTxt = localize('Contributors')
        + '\n\nNathan Dinsmore: Saving/Loading, Snap-Logo Design, '
        + '\ncountless bugfixes and optimizations'
        + '\nKartik Chandra: Paint Editor'
        + '\nMichael Ball: Time/Date UI, Library Import Dialog,'
        + '\ncountless bugfixes and optimizations'
        + '\nBartosz Leper: Retina Display Support'
        + '\nBernat Romagosa: Countless contributions'
        + '\nJosep Ferràndiz: Video Motion Detection'
        + '\nJoan Guillén: Countless contributions'
        + '\nCarles Paredes: Initial Vector Paint Editor'
        + '\n"Ava" Yuan Yuan, Dylan Servilla: Graphic Effects'
        + '\nKyle Hotchkiss: Block search design'
        + '\nBrian Broll: Many bugfixes and optimizations'
        + '\nIan Reynolds: UI Design, Event Bindings, '
        + 'Sound primitives'
        + '\nIvan Motyashov: Initial Squeak Porting'
        + '\nLucas Karahadian: Piano Keyboard Design'
        + '\nDavide Della Casa: Morphic Optimizations'
        + '\nAchal Dave: Web Audio'
        + '\nJoe Otto: Morphic Testing and Debugging';

    for (module in modules) {
        if (Object.prototype.hasOwnProperty.call(modules, module)) {
            versions += ('\n' + module + ' (' +
                            modules[module] + ')');
        }
    }
    if (versions !== '') {
        versions = localize('current module versions:') + ' \n\n' +
            'morphic (' + morphicVersion + ')' +
            versions;
    }
    translations = localize('Translations') + '\n' + SnapTranslator.credits();

    dlg = new DialogBoxMorph();
    dlg.inform('About Snap', aboutTxt, world);
    btn1 = dlg.buttons.children[0];
    translatorsBtn = dlg.addButton(
        function () {
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
        function () {
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
        function () {
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
        function () {
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
        function () {
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
};

IDE_Morph.prototype.editProjectNotes = function () {
    var dialog = new DialogBoxMorph().withKey('projectNotes'),
        frame = new ScrollFrameMorph(),
        text = new TextMorph(this.projectNotes || ''),
        myself = this,
        size = 250,
        world = this.world();

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

    dialog.getInput = function () {
        return text.text;
    };

    dialog.target = myself;

    dialog.action = function (note) {
        myself.projectNotes = note;
    };

    dialog.justDropped = function () {
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
};

IDE_Morph.prototype.newProject = function () {
    this.source = this.cloud.username ? 'cloud' : null;
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
};

IDE_Morph.prototype.save = function () {
    var myself = this;

    // temporary hack - only allow exporting projects to disk
    // when running Snap! locally without a web server
    if (location.protocol === 'file:') {
        if (this.projectName) {
            this.exportProject(myself.projectName, false);
        } else {
            this.prompt('Export Project As...', function (name) {
                myself.exportProject(name, false);
            }, null, 'exportProject');
        }
        return;
    }

    if (this.source === 'examples' || this.source === 'local') {
        // cannot save to examples, deprecated localStorage
        this.source = null;
    }
    if (this.projectName) {
        if (this.source === 'disk') {
            this.exportProject(this.projectName);
        } else if (this.source === 'cloud') {
            this.saveProjectToCloud(this.projectName);
        } else {
            this.saveProjectsBrowser();
        }
    } else {
        this.saveProjectsBrowser();
    }
};

IDE_Morph.prototype.exportProject = function (name, plain) {
    // Export project XML, saving a file to disk
    // newWindow requests displaying the project in a new tab.
    var menu, str, dataPrefix;

    if (name) {
        this.setProjectName(name);
        dataPrefix = 'data:text/' + plain ? 'plain,' : 'xml,';
        try {
            menu = this.showMessage('Exporting');
            str = this.serializer.serialize(this.stage);
            this.setURL('#open:' + dataPrefix + encodeURIComponent(str));
            this.saveXMLAs(str, name);
            menu.destroy();
            this.showMessage('Exported!', 1);
        } catch (err) {
            if (Process.prototype.isCatchingErrors) {
                this.showMessage('Export failed: ' + err);
            } else {
                throw err;
            }
        }
    }
};

IDE_Morph.prototype.exportGlobalBlocks = function () {
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
};

IDE_Morph.prototype.removeUnusedBlocks = function () {
    var targets = this.sprites.asArray().concat([this.stage]),
        globalBlocks = this.stage.globalBlocks,
        unused = [],
        isDone = false,
        found;

    function scan() {
        return globalBlocks.filter(function (def) {
            if (contains(unused, def)) {return false; }
            return targets.every(function (each, trgIdx) {
                return !(each.usesBlockInstance(def, true, trgIdx, unused));
            });
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
};

IDE_Morph.prototype.exportSprite = function (sprite) {
    var str = this.serializer.serialize(sprite.allParts());
    str = '<sprites app="'
        + this.serializer.app
        + '" version="'
        + this.serializer.version
        + '">'
        + str
        + '</sprites>';
    this.saveXMLAs(str, sprite.name);
};

IDE_Morph.prototype.exportScriptsPicture = function () {
    var pics = [],
        pic,
        padding = 20,
        w = 0,
        h = 0,
        y = 0,
        ctx;

    // collect all script pics
    this.sprites.asArray().forEach(function (sprite) {
        pics.push(sprite.image);
        pics.push(sprite.scripts.scriptsPicture());
        sprite.customBlocks.forEach(function (def) {
            pics.push(def.scriptsPicture());
        });
    });
    pics.push(this.stage.image);
    pics.push(this.stage.scripts.scriptsPicture());
    this.stage.customBlocks.forEach(function (def) {
        pics.push(def.scriptsPicture());
    });

    // collect global block pics
    this.stage.globalBlocks.forEach(function (def) {
        pics.push(def.scriptsPicture());
    });

    pics = pics.filter(function (each) {return !isNil(each); });

    // determine dimensions of composite
    pics.forEach(function (each) {
        w = Math.max(w, each.width);
        h += (each.height);
        h += padding;
    });
    h -= padding;
    pic = newCanvas(new Point(w, h));
    ctx = pic.getContext('2d');

    // draw all parts
    pics.forEach(function (each) {
        ctx.drawImage(each, 0, y);
        y += padding;
        y += each.height;
    });
    this.saveCanvasAs(pic, this.projectName || localize('Untitled'));
};

IDE_Morph.prototype.exportProjectSummary = function (useDropShadows) {
    var html, head, meta, css, body, pname, notes, toc, globalVars,
        stage = this.stage;

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
        var para = !inline ? addNode('p', node) : null,
            pic = addNode('img', para || node);
        pic.attributes.src = canvas.toDataURL();
        return pic;
    }

    function addVariables(varFrame) {
        var names = varFrame.names().sort(),
            isFirst = true,
            ul;
        if (names.length) {
            add(localize('Variables'), 'h3');
            names.forEach(function (name) {
                /*
                addImage(
                    SpriteMorph.prototype.variableBlock(name).scriptPic()
                );
                */
                var watcher, listMorph, li, img;

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
            SpriteMorph.prototype.categories.forEach(function (category) {
                var isFirst = true,
                    ul;
                definitions.forEach(function (def) {
                    var li, blockImg;
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
                        def.sortedElements().forEach(function (script) {
                            var defImg = addImage(
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
    if (this.cloud.username) {
        add(localize('by ') + this.cloud.username);
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
        function (paragraph) {add(paragraph); }
    );

    // table of contents
    add(localize('Contents'), 'h4');
    toc = addNode('ul');

    // sprites & stage
    this.sprites.asArray().concat([stage]).forEach(function (sprite) {
        var tocEntry = addNode('li', toc),
            scripts = sprite.scripts.sortedElements(),
            cl = sprite.costumes.length(),
            pic,
            ol;

        addNode('hr');
        addImage(
            sprite.thumbnail(new Point(40, 40)),
            tocEntry,
            true
        ).attributes.class = 'toc';
        add(sprite.name, 'a', tocEntry).attributes.href = '#' + sprite.name;

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
                    add(localize('Kind of') + ' ' + sprite.exemplar.name),
                    true
                ).attributes.class = 'toc';
            }
            if (sprite.anchor) {
                addImage(
                    sprite.anchor.thumbnail(new Point(40, 40)),
                    add(localize('Part of') + ' ' + sprite.anchor.name),
                    true
                ).attributes.class = 'toc';
            }
            if (sprite.parts.length) {
                add(localize('Parts'), 'h3');
                ol = addNode('ul');
                sprite.parts.forEach(function (part) {
                    var li = addNode('li', ol, part.name);
                    addImage(part.thumbnail(new Point(40, 40)), li, true)
                        .attributes.class = 'toc';
                });
            }
        }

        // costumes
        if (cl > 1 || (sprite.getCostumeIdx() !== cl)) {
            add(localize('Costumes'), 'h3');
            ol = addNode('ol');
            sprite.costumes.asArray().forEach(function (costume) {
                var li = addNode('li', ol, costume.name);
                addImage(costume.thumbnail(new Point(40, 40)), li, true)
                    .attributes.class = 'toc';
            });
        }

        // sounds
        if (sprite.sounds.length()) {
            add(localize('Sounds'), 'h3');
            ol = addNode('ol');
            sprite.sounds.asArray().forEach(function (sound) {
                add(sound.name, 'li', ol);
            });
        }

        // variables
        addVariables(sprite.variables);

        // scripts
        if (scripts.length) {
            add(localize('Scripts'), 'h3');
            scripts.forEach(function (script) {
                var img = addImage(script instanceof BlockMorph ?
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
        '<!DOCTYPE html>' + html.toString(),
        'text/html;charset=utf-8',
        pname
    );
};

IDE_Morph.prototype.openProjectString = function (str) {
    var msg,
        myself = this;
    this.nextSteps([
        function () {
            msg = myself.showMessage('Opening project...');
        },
        function () {nop(); }, // yield (bug in Chrome)
        function () {
            myself.rawOpenProjectString(str);
        },
        function () {
            msg.destroy();
        }
    ]);
};

IDE_Morph.prototype.rawOpenProjectString = function (str) {
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
            this.showMessage('Load failed: ' + err);
        }
    } else {
        this.serializer.openProject(
            this.serializer.load(str, this),
            this
        );
    }
    this.stopFastTracking();
};

IDE_Morph.prototype.openCloudDataString = function (str) {
    var msg,
        myself = this,
        size = Math.round(str.length / 1024);
    this.nextSteps([
        function () {
            msg = myself.showMessage('Opening project\n' + size + ' KB...');
        },
        function () {nop(); }, // yield (bug in Chrome)
        function () {
            myself.rawOpenCloudDataString(str);
        },
        function () {
            msg.destroy();
        }
    ]);
};

IDE_Morph.prototype.rawOpenCloudDataString = function (str) {
    var model;
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
                    this,
                    model.attributes.remixID
                ),
                this
            );
        } catch (err) {
            this.showMessage('Load failed: ' + err);
        }
    } else {
        model = this.serializer.parse(str);
        this.serializer.loadMediaModel(model.childNamed('media'));
        this.serializer.openProject(
            this.serializer.loadProjectModel(
                model.childNamed('project'),
                this,
                model.attributes.remixID
            ),
            this
        );
    }
    this.stopFastTracking();
};

IDE_Morph.prototype.openBlocksString = function (str, name, silently) {
    var msg,
        myself = this;
    this.nextSteps([
        function () {
            msg = myself.showMessage('Opening blocks...');
        },
        function () {nop(); }, // yield (bug in Chrome)
        function () {
            myself.rawOpenBlocksString(str, name, silently);
        },
        function () {
            msg.destroy();
        }
    ]);
};

IDE_Morph.prototype.rawOpenBlocksString = function (str, name, silently) {
    // name is optional (string), so is silently (bool)
    var blocks,
        myself = this;
    if (Process.prototype.isCatchingErrors) {
        try {
            blocks = this.serializer.loadBlocks(str, myself.stage);
        } catch (err) {
            this.showMessage('Load failed: ' + err);
        }
    } else {
        blocks = this.serializer.loadBlocks(str, myself.stage);
    }
    if (silently) {
        blocks.forEach(function (def) {
            def.receiver = myself.stage;
            myself.stage.globalBlocks.push(def);
            myself.stage.replaceDoubleDefinitionsFor(def);
        });
        this.flushPaletteCache();
        this.refreshPalette();
        this.showMessage(
            'Imported Blocks Module' + (name ? ': ' + name : '') + '.',
            2
        );
    } else {
        new BlockImportDialogMorph(blocks, this.stage, name).popUp();
    }
};

IDE_Morph.prototype.openSpritesString = function (str) {
    var msg,
        myself = this;
    this.nextSteps([
        function () {
            msg = myself.showMessage('Opening sprite...');
        },
        function () {nop(); }, // yield (bug in Chrome)
        function () {
            myself.rawOpenSpritesString(str);
        },
        function () {
            msg.destroy();
        }
    ]);
};

IDE_Morph.prototype.rawOpenSpritesString = function (str) {
    if (Process.prototype.isCatchingErrors) {
        try {
            this.serializer.loadSprites(str, this);
        } catch (err) {
            this.showMessage('Load failed: ' + err);
        }
    } else {
        this.serializer.loadSprites(str, this);
    }
};

IDE_Morph.prototype.openMediaString = function (str) {
    if (Process.prototype.isCatchingErrors) {
        try {
            this.serializer.loadMedia(str);
        } catch (err) {
            this.showMessage('Load failed: ' + err);
        }
    } else {
        this.serializer.loadMedia(str);
    }
    this.showMessage('Imported Media Module.', 2);
};

IDE_Morph.prototype.openScriptString = function (str) {
    var msg,
        myself = this;
    this.nextSteps([
        function () {
            msg = myself.showMessage('Opening script...');
        },
        function () {nop(); }, // yield (bug in Chrome)
        function () {
            myself.rawOpenScriptString(str);
        },
        function () {
            msg.destroy();
        }
    ]);
};

IDE_Morph.prototype.rawOpenScriptString = function (str) {
    var xml,
        script,
        scripts = this.currentSprite.scripts;

    if (Process.prototype.isCatchingErrors) {
        try {
            xml = this.serializer.parse(str, this.currentSprite);
            script = this.serializer.loadScript(xml, this.currentSprite);
        } catch (err) {
            this.showMessage('Load failed: ' + err);
        }
    } else {
        xml = this.serializer.loadScript(str, this.currentSprite);
        script = this.serializer.loadScript(xml, this.currentSprite);
    }
    script.setPosition(this.world().hand.position());
    scripts.add(script);
    scripts.adjustBounds();
    scripts.lastDroppedBlock = script;
    scripts.recordDrop(
		{
            origin: this.palette,
            position: this.palette.center()
        }
    );
    this.showMessage(
        'Imported Script.',
        2
    );
};

IDE_Morph.prototype.openDataString = function (str, name, type) {
    var msg,
        myself = this;
    this.nextSteps([
        function () {
            msg = myself.showMessage('Opening data...');
        },
        function () {nop(); }, // yield (bug in Chrome)
        function () {
            myself.rawOpenDataString(str, name, type);
        },
        function () {
            msg.destroy();
        }
    ]);
};

IDE_Morph.prototype.rawOpenDataString = function (str, name, type) {
    var data, vName, dlg,
        globals = this.currentSprite.globalVariables();

    function newVarName(name) {
        var existing = globals.names(),
            ix = name.indexOf('\('),
            stem = (ix < 0) ? name : name.substring(0, ix),
            count = 1,
            newName = stem;
        while (contains(existing, newName)) {
            count += 1;
            newName = stem + '(' + count + ')';
        }
        return newName;
    }

    switch (type) {
        case 'csv':
            data = Process.prototype.parseCSV(str);
            break;
        case 'json':
            data = Process.prototype.parseJSON(str);
            break;
        default: // assume plain text
            data = str;
    }
    vName = newVarName(name || 'data');
    globals.addVar(vName);
    globals.setVar(vName, data);
    this.currentSprite.toggleVariableWatcher(vName, true); // global
    this.flushBlocksCache('variables');
    this.currentCategory = 'variables';
    this.categories.children.forEach(function (each) {
        each.refresh();
    });
    this.refreshPalette(true);
    if (data instanceof List) {
        dlg = new TableDialogMorph(data);
        dlg.labelString = localize(dlg.labelString) + ': ' + vName;
        dlg.createLabel();
        dlg.popUp(this.world());
    }
};

IDE_Morph.prototype.openProject = function (name) {
    var str;
    if (name) {
        this.showMessage('opening project\n' + name);
        this.setProjectName(name);
        str = localStorage['-snap-project-' + name];
        this.openProjectString(str);
        this.setURL('#open:' + str);
    }
};

IDE_Morph.prototype.setURL = function (str) {
    // Set the URL to a project's XML contents
    location.hash = this.projectsInURLs ? str : '';
};

IDE_Morph.prototype.saveFileAs = function (
    contents,
    fileType,
    fileName
) {
    /** Allow for downloading a file to a disk.
        This relies the FileSaver.js library which exports saveAs()
        Two utility methods saveImageAs and saveXMLAs should be used first.
    */
    var blobIsSupported = false,
        world = this.world(),
        fileExt,
        dialog;

    // fileType is a <kind>/<ext>;<charset> format.
    fileExt = fileType.split('/')[1].split(';')[0];
    // handle text/plain as a .txt file
    fileExt = '.' + (fileExt === 'plain' ? 'txt' : fileExt);

    function dataURItoBlob(text, mimeType) {
        var i,
            data = text,
            components = text.split(','),
            hasTypeStr = text.indexOf('data:') === 0;
        // Convert to binary data, in format Blob() can use.
        if (hasTypeStr && components[0].indexOf('base64') > -1) {
            text = atob(components[1]);
            data = new Uint8Array(text.length);
            i = text.length;
            while (i--) {
                data[i] = text.charCodeAt(i);
            }
        } else if (hasTypeStr) {
            // not base64 encoded
            text = text.replace(/^data:image\/.*?, */, '');
            data = new Uint8Array(text.length);
            i = text.length;
            while (i--) {
                data[i] = text.charCodeAt(i);
            }
        }
        return new Blob([data], {type: mimeType });
    }

    try {
        blobIsSupported = !!new Blob();
    } catch (e) {}

    if (blobIsSupported) {
        if (!(contents instanceof Blob)) {
            contents = dataURItoBlob(contents, fileType);
        }
        // download a file and delegate to FileSaver
        // false: Do not preprend a BOM to the file.
        saveAs(contents, fileName + fileExt, false);
    } else {
        dialog = new DialogBoxMorph();
        dialog.inform(
            localize('Could not export') + ' ' + fileName,
            'unable to export text',
            world
        );
        dialog.fixLayout();
        dialog.drawNew();
    }
};

IDE_Morph.prototype.saveCanvasAs = function (canvas, fileName) {
    // Export a Canvas object as a PNG image
    // Note: This commented out due to poor browser support.
    // cavas.toBlob() is currently supported in Firefox, IE, Chrome but
    // browsers prevent easily saving the generated files.
    // Do not re-enable without revisiting issue #1191
    // if (canvas.toBlob) {
    //     var myself = this;
    //     canvas.toBlob(function (blob) {
    //         myself.saveFileAs(blob, 'image/png', fileName);
    //     });
    //     return;
    // }

    this.saveFileAs(canvas.toDataURL(), 'image/png', fileName);
};

IDE_Morph.prototype.saveAudioAs = function (audio, fileName) {
    // Export a Sound object as a WAV file
    this.saveFileAs(audio.src, 'audio/wav', fileName);
};

IDE_Morph.prototype.saveXMLAs = function(xml, fileName) {
    // wrapper to saving XML files with a proper type tag.
    this.saveFileAs(xml, 'text/xml;chartset=utf-8', fileName);
};

IDE_Morph.prototype.switchToUserMode = function () {
    var world = this.world();

    world.isDevMode = false;
    Process.prototype.isCatchingErrors = true;
    this.controlBar.updateLabel();
    this.isAutoFill = true;
    this.isDraggable = false;
    this.reactToWorldResize(world.bounds.copy());
    this.siblings().forEach(function (morph) {
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
    world.reactToDropOf = function (morph) {
        if (!(morph instanceof DialogBoxMorph ||
        		(morph instanceof MenuMorph))) {
            if (world.hand.grabOrigin) {
                morph.slideBackTo(world.hand.grabOrigin);
            } else {
                world.hand.grab(morph);
            }
        }
    };
    this.showMessage('entering user mode', 1);

};

IDE_Morph.prototype.switchToDevMode = function () {
    var world = this.world();

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
};

IDE_Morph.prototype.flushBlocksCache = function (category) {
    // if no category is specified, the whole cache gets flushed
    if (category) {
        this.stage.blocksCache[category] = null;
        this.stage.children.forEach(function (m) {
            if (m instanceof SpriteMorph) {
                m.blocksCache[category] = null;
            }
        });
    } else {
        this.stage.blocksCache = {};
        this.stage.children.forEach(function (m) {
            if (m instanceof SpriteMorph) {
                m.blocksCache = {};
            }
        });
    }
    this.flushPaletteCache(category);
};

IDE_Morph.prototype.flushPaletteCache = function (category) {
    // if no category is specified, the whole cache gets flushed
    if (category) {
        this.stage.paletteCache[category] = null;
        this.stage.children.forEach(function (m) {
            if (m instanceof SpriteMorph) {
                m.paletteCache[category] = null;
            }
        });
    } else {
        this.stage.paletteCache = {};
        this.stage.children.forEach(function (m) {
            if (m instanceof SpriteMorph) {
                m.paletteCache = {};
            }
        });
    }
};

IDE_Morph.prototype.toggleZebraColoring = function () {
    var scripts = [];

    if (!BlockMorph.prototype.zebraContrast) {
        BlockMorph.prototype.zebraContrast = 40;
    } else {
        BlockMorph.prototype.zebraContrast = 0;
    }

    // select all scripts:
    this.stage.children.concat(this.stage).forEach(function (morph) {
        if (isSnapObject(morph)) {
            scripts = scripts.concat(
                morph.scripts.children.filter(function (morph) {
                    return morph instanceof BlockMorph;
                })
            );
        }
    });

    // force-update all scripts:
    scripts.forEach(function (topBlock) {
        topBlock.fixBlockColor(null, true);
    });
};

IDE_Morph.prototype.toggleDynamicInputLabels = function () {
    var projectData;
    SyntaxElementMorph.prototype.dynamicInputLabels =
        !SyntaxElementMorph.prototype.dynamicInputLabels;
    if (Process.prototype.isCatchingErrors) {
        try {
            projectData = this.serializer.serialize(this.stage);
        } catch (err) {
            this.showMessage('Serialization failed: ' + err);
        }
    } else {
        projectData = this.serializer.serialize(this.stage);
    }
    SpriteMorph.prototype.initBlocks();
    this.spriteBar.tabBar.tabTo('scripts');
    this.createCategories();
    this.createCorralBar();
    this.openProjectString(projectData);
};

IDE_Morph.prototype.toggleBlurredShadows = function () {
    window.useBlurredShadows = !useBlurredShadows;
};

IDE_Morph.prototype.toggleLongFormInputDialog = function () {
    InputSlotDialogMorph.prototype.isLaunchingExpanded =
        !InputSlotDialogMorph.prototype.isLaunchingExpanded;
    if (InputSlotDialogMorph.prototype.isLaunchingExpanded) {
        this.saveSetting('longform', true);
    } else {
        this.removeSetting('longform');
    }
};

IDE_Morph.prototype.togglePlainPrototypeLabels = function () {
    BlockLabelPlaceHolderMorph.prototype.plainLabel =
        !BlockLabelPlaceHolderMorph.prototype.plainLabel;
    if (BlockLabelPlaceHolderMorph.prototype.plainLabel) {
        this.saveSetting('plainprototype', true);
    } else {
        this.removeSetting('plainprototype');
    }
};

IDE_Morph.prototype.togglePreferEmptySlotDrops = function () {
    ScriptsMorph.prototype.isPreferringEmptySlots =
        !ScriptsMorph.prototype.isPreferringEmptySlots;
};

IDE_Morph.prototype.toggleVirtualKeyboard = function () {
    MorphicPreferences.useVirtualKeyboard =
        !MorphicPreferences.useVirtualKeyboard;
};

IDE_Morph.prototype.toggleInputSliders = function () {
    MorphicPreferences.useSliderForInput =
        !MorphicPreferences.useSliderForInput;
};

IDE_Morph.prototype.toggleSliderExecute = function () {
    ArgMorph.prototype.executeOnSliderEdit =
        !ArgMorph.prototype.executeOnSliderEdit;
};

IDE_Morph.prototype.setEmbedMode = function () {
    var myself = this;

    this.isEmbedMode = true;
    this.appModeColor = new Color(243,238,235);
    this.embedOverlay = new Morph();
    this.embedOverlay.color = new Color(128, 128, 128);
    this.embedOverlay.alpha = 0.5;

    this.embedPlayButton = new SymbolMorph('circleSolid');
    this.embedPlayButton.color = new Color(64, 128, 64);
    this.embedPlayButton.alpha = 0.75;
    this.embedPlayButton.flag = new SymbolMorph('flag');
    this.embedPlayButton.flag.color = new Color(128, 255, 128);
    this.embedPlayButton.flag.alpha = 0.75;
    this.embedPlayButton.add(this.embedPlayButton.flag);
    this.embedPlayButton.mouseClickLeft = function () {
        myself.runScripts();
        myself.embedOverlay.destroy();
        this.destroy();
    };

    this.controlBar.hide();

    this.add(this.embedOverlay);
    this.add(this.embedPlayButton);

    this.fixLayout();
};

IDE_Morph.prototype.toggleAppMode = function (appMode) {
    var world = this.world(),
        elements = [
            this.logo,
            this.controlBar.cloudButton,
            this.controlBar.projectButton,
            this.controlBar.settingsButton,
            this.controlBar.steppingButton,
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
		this.wasSingleStepping = Process.prototype.enableSingleStepping;
		if (this.wasSingleStepping) {
     		this.toggleSingleStepping();
    	}
        this.setColor(this.appModeColor);
        this.controlBar.setColor(this.color);
        this.controlBar.appModeButton.refresh();
        elements.forEach(function (e) {
            e.hide();
        });
        world.children.forEach(function (morph) {
            if (morph instanceof DialogBoxMorph) {
                morph.hide();
            }
        });
        if (world.keyboardReceiver instanceof ScriptFocusMorph) {
            world.keyboardReceiver.stopEditing();
        }
    } else {
        if (this.wasSingleStepping && !Process.prototype.enableSingleStepping) {
             this.toggleSingleStepping();
        }
        this.setColor(this.backgroundColor);
        this.controlBar.setColor(this.frameColor);
        elements.forEach(function (e) {
            e.show();
        });
        this.stage.setScale(1);
        // show all hidden dialogs
        world.children.forEach(function (morph) {
            if (morph instanceof DialogBoxMorph) {
                morph.show();
            }
        });
        // prevent scrollbars from showing when morph appears
        world.allChildren().filter(function (c) {
            return c instanceof ScrollFrameMorph;
        }).forEach(function (s) {
            s.adjustScrollBars();
        });
        // prevent rotation and draggability controls from
        // showing for the stage
        if (this.currentSprite === this.stage) {
            this.spriteBar.children.forEach(function (child) {
                if (child instanceof PushButtonMorph) {
                    child.hide();
                }
            });
        }
        // update undrop controls
        this.currentSprite.scripts.updateToolbar();
    }
    this.setExtent(this.world().extent()); // resume trackChanges
};

IDE_Morph.prototype.toggleStageSize = function (isSmall, forcedRatio) {
    var myself = this,
        smallRatio = forcedRatio || 0.5,
        msecs = this.isAnimating ? 100 : 0,
        world = this.world(),
        shiftClicked = (world.currentKey === 16),
        altClicked = (world.currentKey === 18);

    function toggle() {
        myself.isSmallStage = isNil(isSmall) ? !myself.isSmallStage : isSmall;
    }

    function zoomTo(targetRatio) {
        myself.isSmallStage = true;
        world.animations.push(new Animation(
            function (ratio) {
                myself.stageRatio = ratio;
                myself.setExtent(world.extent());
            },
            function () {
                return myself.stageRatio;
            },
            targetRatio - myself.stageRatio,
            msecs,
            null, // easing
            function () {
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
};

IDE_Morph.prototype.setPaletteWidth = function (newWidth) {
    var msecs = this.isAnimating ? 100 : 0,
        world = this.world(),
        myself = this;

    world.animations.push(new Animation(
        function (newWidth) {
            myself.paletteWidth = newWidth;
            myself.setExtent(world.extent());
        },
        function () {
            return myself.paletteWidth;
        },
        newWidth - myself.paletteWidth,
        msecs
    ));
};

IDE_Morph.prototype.createNewProject = function () {
    var myself = this;
    this.confirm(
        'Replace the current project with a new one?',
        'New Project',
        function () {myself.newProject(); }
    );
};

IDE_Morph.prototype.openProjectsBrowser = function () {
    if (location.protocol === 'file:') {
        // bypass the project import dialog and directly pop up
        // the local file picker.
        // this should not be necessary, we should be able
        // to access the cloud even when running Snap! locally
        // to be worked on.... (jens)
        this.importLocalFile();
        return;
    }
    new ProjectDialogMorph(this, 'open').popUp();
};

IDE_Morph.prototype.saveProjectsBrowser = function () {
    var myself = this;

    // temporary hack - only allow exporting projects to disk
    // when running Snap! locally without a web server
    if (location.protocol === 'file:') {
        this.prompt('Export Project As...', function (name) {
            myself.exportProject(name, false);
        }, null, 'exportProject');
        return;
    }

    if (this.source === 'examples') {
        this.source = null; // cannot save to examples
    }
    new ProjectDialogMorph(this, 'save').popUp();
};

// IDE_Morph microphone settings

IDE_Morph.prototype.microphoneMenu = function () {
    var menu = new MenuMorph(this),
        world = this.world(),
        pos = this.controlBar.settingsButton.bottomLeft(),
        resolutions = ['low', 'normal', 'high', 'max'],
        microphone = this.stage.microphone;

    if (microphone.isReady) {
        menu.addItem(
            '\u2611 ' + localize('Microphone'),
            function () {microphone.stop(); }
        );
        menu.addLine();
    }
    resolutions.forEach(function (res, i) {
        menu.addItem(
            (microphone.resolution === i + 1 ? '\u2713 ' : '    ') +
                localize(res),
            function () {
                microphone.setResolution(i + 1);
            }
        );
    });
    menu.popup(world, pos);
};

// IDE_Morph localization

IDE_Morph.prototype.languageMenu = function () {
    var menu = new MenuMorph(this),
        world = this.world(),
        pos = this.controlBar.settingsButton.bottomLeft(),
        myself = this;
    SnapTranslator.languages().forEach(function (lang) {
        menu.addItem(
            (SnapTranslator.language === lang ? '\u2713 ' : '    ') +
                SnapTranslator.languageName(lang),
            function () {
                myself.loadNewProject = false;
                myself.setLanguage(lang);
            }
        );
    });
    menu.popup(world, pos);
};

IDE_Morph.prototype.setLanguage = function (lang, callback, noSave) {
    var translation = document.getElementById('language'),
        src = this.resourceURL('locale', 'lang-' + lang + '.js'),
        myself = this;
    SnapTranslator.unload();
    if (translation) {
        document.head.removeChild(translation);
    }
    if (lang === 'en') {
        return this.reflectLanguage('en', callback, noSave);
    }
    translation = document.createElement('script');
    translation.id = 'language';
    translation.onload = function () {
        myself.reflectLanguage(lang, callback, noSave);
    };
    document.head.appendChild(translation);
    translation.src = src;
};

IDE_Morph.prototype.reflectLanguage = function (lang, callback, noSave) {
    var projectData,
        urlBar = location.hash;
    SnapTranslator.language = lang;
    if (!this.loadNewProject) {
        if (Process.prototype.isCatchingErrors) {
            try {
                projectData = this.serializer.serialize(this.stage);
            } catch (err) {
                this.showMessage('Serialization failed: ' + err);
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
    if (!noSave) {
        this.saveSetting('language', lang);
    }
    if (callback) {callback.call(this); }
};

// IDE_Morph blocks scaling

IDE_Morph.prototype.userSetBlocksScale = function () {
    var myself = this,
        scrpt,
        blck,
        shield,
        sample,
        action;

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

    action = function (num) {
    /*
        var c;
        blck.setScale(num);
        blck.drawNew();
        blck.setSpec(blck.blockSpec);
        c = blck.inputs()[0];
        c.setScale(num);
        c.nestedBlock(scrpt);
    */
        scrpt.blockSequence().forEach(function (block) {
            block.setScale(num);
            block.drawNew();
            block.setSpec(block.blockSpec);
        });
        scrpt.changed();
    };

    new DialogBoxMorph(
        null,
        function (num) {
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
        5, // slider max
        action // slider action
    );
};

IDE_Morph.prototype.setBlocksScale = function (num) {
    var projectData;
    if (Process.prototype.isCatchingErrors) {
        try {
            projectData = this.serializer.serialize(this.stage);
        } catch (err) {
            this.showMessage('Serialization failed: ' + err);
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
};

// IDE_Morph stage size manipulation

IDE_Morph.prototype.userSetStageSize = function () {
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
};

IDE_Morph.prototype.setStageExtent = function (aPoint) {
    var myself = this,
        world = this.world(),
        ext = aPoint.max(new Point(240, 180));

    function zoom() {
        myself.step = function () {
            var delta = ext.subtract(
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
    this.stage.stopVideo();
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
};

// IDE_Morph dragging threshold (internal feature)

IDE_Morph.prototype.userSetDragThreshold = function () {
    new DialogBoxMorph(
        this,
        function (num) {
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
};

// IDE_Morph cloud interface

IDE_Morph.prototype.initializeCloud = function () {
    var myself = this,
        world = this.world();
    new DialogBoxMorph(
        null,
        function (user) {
            myself.cloud.login(
                user.username.toLowerCase(),
                user.password,
                user.choice,
                function (username, role, response) {
                    sessionStorage.username = username;
                    myself.source = 'cloud';
                    if (!isNil(response.days_left)) {
                        new DialogBoxMorph().inform(
                            'Unverified account: ' +
                            response.days_left +
                            ' days left',
                            'You are now logged in, and your account\n' +
                            'is enabled for three days.\n' +
                            'Please use the verification link that\n' +
                            'was sent to your email address when you\n' +
                            'signed up.\n\n' +
                            'If you cannot find that email, please\n' +
                            'check your spam folder. If you still\n' +
                            'cannot find it, please use the "Resend\n' +
                            'Verification Email..." option in the cloud\n' +
                            'menu.\n\n' +
                            'You have ' + response.days_left + ' days left.',
                            world,
                            myself.cloudIcon(null, new Color(0, 180, 0))
                        );
                    } else {
                        myself.showMessage(response.message, 2);
                    }
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
};

IDE_Morph.prototype.createCloudAccount = function () {
    var myself = this,
        world = this.world();

    new DialogBoxMorph(
        null,
        function (user) {
            myself.cloud.signup(
                user.username,
                user.password,
                user.passwordRepeat,
                user.email,
                function (txt, title) {
                    new DialogBoxMorph().inform(
                        title,
                        txt +
                            '.\n\nYou can now log in.',
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
};

IDE_Morph.prototype.resetCloudPassword = function () {
    var myself = this,
        world = this.world();

    new DialogBoxMorph(
        null,
        function (user) {
            myself.cloud.resetPassword(
                user.username,
                function (txt, title) {
                    new DialogBoxMorph().inform(
                        title,
                        txt +
                            '\n\nAn e-mail with a link to\n' +
                            'reset your password\n' +
                            'has been sent to the address provided',
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
};

IDE_Morph.prototype.resendVerification = function () {
    var myself = this,
        world = this.world();

    new DialogBoxMorph(
        null,
        function (user) {
            myself.cloud.resendVerification(
                user.username,
                function (txt, title) {
                    new DialogBoxMorph().inform(
                        title,
                        txt,
                        world,
                        myself.cloudIcon(null, new Color(0, 180, 0))
                    );
                },
                myself.cloudError()
            );
        }
    ).withKey('cloudresendverification').promptCredentials(
        'Resend verification email',
        'resendVerification',
        null,
        null,
        null,
        null,
        null,
        world,
        myself.cloudIcon(),
        myself.cloudMsg
    );
};

IDE_Morph.prototype.changeCloudPassword = function () {
    var myself = this,
        world = this.world();
    new DialogBoxMorph(
        null,
        function (user) {
            myself.cloud.changePassword(
                user.oldpassword,
                user.password,
                user.passwordRepeat,
                function () {
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
};

IDE_Morph.prototype.logout = function () {
    var myself = this;
    this.cloud.logout(
        function () {
            delete(sessionStorage.username);
            myself.showMessage('disconnected.', 2);
        },
        function () {
            delete(sessionStorage.username);
            myself.showMessage('disconnected.', 2);
        }
    );
};

IDE_Morph.prototype.buildProjectRequest = function () {
    var xml = this.serializer.serialize(this.stage),
        thumbnail = normalizeCanvas(
            this.stage.thumbnail(
                SnapSerializer.prototype.thumbnailSize
        )).toDataURL(),
        body;

    this.serializer.isCollectingMedia = true;
    body = {
        notes: this.projectNotes,
        xml: xml,
        media: this.hasChangedMedia ?
            this.serializer.mediaXML(this.projectName) : null,
        thumbnail: thumbnail,
        remixID: this.stage.remixID
    };
    this.serializer.isCollectingMedia = false;
    this.serializer.flushMedia();

    return body;
};

IDE_Morph.prototype.verifyProject = function (body) {
    // Ensure the project is less than 10MB and serializes correctly.
    var encodedBody = JSON.stringify(body);
    if (encodedBody.length > Cloud.MAX_FILE_SIZE) {
        new DialogBoxMorph().inform(
            'Snap!Cloud - Cannot Save Project',
            'The media inside this project exceeds 10 MB.\n' +
                'Please reduce the size of costumes or sounds.\n',
            this.world(),
            this.cloudIcon(null, new Color(180, 0, 0))
        );
        return false;
    }

    // console.log(encodedBody.length);
    // check if serialized data can be parsed back again
    try {
        this.serializer.parse(body.xml);
    } catch (err) {
        this.showMessage('Serialization of program data failed:\n' + err);
        return false;
    }
    if (body.media !== null) {
        try {
            this.serializer.parse(body.media);
        } catch (err) {
            this.showMessage('Serialization of media failed:\n' + err);
            return false;
        }
    }
    this.serializer.isCollectingMedia = false;
    this.serializer.flushMedia();

    return encodedBody.length;
};

IDE_Morph.prototype.saveProjectToCloud = function (name) {
    var myself = this, projectBody, projectSize;

    if (name) {
        this.setProjectName(name);
    }

    this.showMessage('Saving project\nto the cloud...');
    projectBody = this.buildProjectRequest();
    projectSize = this.verifyProject(projectBody);
    if (!projectSize) {return; } // Invalid Projects don't return anything.
    this.showMessage(
        'Uploading ' + Math.round(projectSize / 1024) + ' KB...'
    );
    this.cloud.saveProject(
        this.projectName,
        projectBody,
        function () {myself.showMessage('saved.', 2); },
        this.cloudError()
    );
};

IDE_Morph.prototype.exportProjectMedia = function (name) {
    var menu, media;
    this.serializer.isCollectingMedia = true;
    if (name) {
        this.setProjectName(name);
        try {
            menu = this.showMessage('Exporting');
            media = this.serializer.mediaXML(name);
            this.saveXMLAs(media, this.projectName + ' media');
            menu.destroy();
            this.showMessage('Exported!', 1);
        } catch (err) {
            if (Process.prototype.isCatchingErrors) {
                this.serializer.isCollectingMedia = false;
                this.showMessage('Export failed: ' + err);
            } else {
                throw err;
            }
        }
    }
    this.serializer.isCollectingMedia = false;
    this.serializer.flushMedia();
    // this.hasChangedMedia = false;
};

IDE_Morph.prototype.exportProjectNoMedia = function (name) {
    var menu, str;
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
                this.showMessage('Export failed: ' + err);
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
};

IDE_Morph.prototype.exportProjectAsCloudData = function (name) {
    var menu, str, media, dta;
    this.serializer.isCollectingMedia = true;
    if (name) {
        this.setProjectName(name);
        if (Process.prototype.isCatchingErrors) {
            try {
                menu = this.showMessage('Exporting');
                str = this.serializer.serialize(this.stage);
                media = this.serializer.mediaXML(name);
                dta = '<snapdata>' + str + media + '</snapdata>';
                this.saveXMLAs(str, this.projectName);
                menu.destroy();
                this.showMessage('Exported!', 1);
            } catch (err) {
                this.serializer.isCollectingMedia = false;
                this.showMessage('Export failed: ' + err);
            }
        } else {
            menu = this.showMessage('Exporting');
            str = this.serializer.serialize(this.stage);
            media = this.serializer.mediaXML(name);
            dta = '<snapdata>' + str + media + '</snapdata>';
            this.saveXMLAs(str, this.projectName);
            menu.destroy();
            this.showMessage('Exported!', 1);
        }
    }
    this.serializer.isCollectingMedia = false;
    this.serializer.flushMedia();
    // this.hasChangedMedia = false;
};

IDE_Morph.prototype.cloudAcknowledge = function () {
    var myself = this;
    return function (responseText, url) {
        nop(responseText);
        new DialogBoxMorph().inform(
            'Cloud Connection',
            'Successfully connected to:\n'
                + 'http://'
                + url,
            myself.world(),
            myself.cloudIcon(null, new Color(0, 180, 0))
        );
    };
};

IDE_Morph.prototype.cloudResponse = function () {
    var myself = this;
    return function (responseText, url) {
        var response = responseText;
        if (response.length > 50) {
            response = response.substring(0, 50) + '...';
        }
        new DialogBoxMorph().inform(
            'Snap!Cloud',
            'http://'
                + url + ':\n\n'
                + 'responds:\n'
                + response,
            myself.world(),
            myself.cloudIcon(null, new Color(0, 180, 0))
        );
    };
};

IDE_Morph.prototype.cloudError = function () {
    var myself = this;

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

    return function (responseText, url) {
        // first, try to find out an explanation for the error
        // and notify the user about it,
        // if none is found, show an error dialog box
        var response = responseText,
            // explanation = getURL('http://snap.berkeley.edu/cloudmsg.txt'),
            explanation = null;
        if (myself.shield) {
            myself.shield.destroy();
            myself.shield = null;
        }
        if (explanation) {
            myself.showMessage(explanation);
            return;
        }
        new DialogBoxMorph().inform(
            'Snap!Cloud',
            (url ? url + '\n' : '')
                + response,
            myself.world(),
            myself.cloudIcon(null, new Color(180, 0, 0))
        );
    };
};

IDE_Morph.prototype.cloudIcon = function (height, color) {
    var clr = color || DialogBoxMorph.prototype.titleBarColor,
        isFlat = MorphicPreferences.isFlat,
        icon = new SymbolMorph(
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
};

IDE_Morph.prototype.setCloudURL = function () {
    var myself = this;
    new DialogBoxMorph(
        null,
        function (url) {
            myself.cloud.url = url;
        }
    ).withKey('cloudURL').prompt(
        'Cloud URL',
        this.cloud.url,
        this.world(),
        null,
        this.cloud.knownDomains
    );
};

// IDE_Morph HTTP data fetching

IDE_Morph.prototype.getURL = function (url, callback, responseType) {
    // fetch the contents of a url and pass it into the specified callback.
    // If no callback is specified synchronously fetch and return it
    // Note: Synchronous fetching has been deprecated and should be switched
    var request = new XMLHttpRequest(),
        async = callback instanceof Function,
        myself = this,
        rsp;
    if (async) {
        request.responseType = responseType || 'text';
    }
    rsp = (!async || request.responseType === 'text') ? 'responseText'
        : 'response';
    try {
        request.open('GET', url, async);
        if (async) {
            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    if (request[rsp]) {
                        callback.call(
                            myself,
                            request[rsp]
                        );
                    } else {
                        throw new Error('unable to retrieve ' + url);
                    }
                }
            };
        }
        // cache-control, commented out for now
        // added for Snap4Arduino but has issues with local robot servers
        // request.setRequestHeader('Cache-Control', 'max-age=0');
        request.send();
        if (!async) {
            if (request.status === 200) {
                return request[rsp];
            }
            throw new Error('unable to retrieve ' + url);
        }
    } catch (err) {
        myself.showMessage(err.toString());
        if (async) {
            callback.call(this);
        } else {
            return request[rsp];
        }
    }
};

// IDE_Morph user dialog shortcuts

IDE_Morph.prototype.showMessage = function (message, secs) {
    var m = new MenuMorph(null, message),
        intervalHandle;
    m.popUpCenteredInWorld(this.world());
    if (secs) {
        intervalHandle = setInterval(function () {
            m.destroy();
            clearInterval(intervalHandle);
        }, secs * 1000);
    }
    return m;
};

IDE_Morph.prototype.inform = function (title, message) {
    new DialogBoxMorph().inform(
        title,
        localize(message),
        this.world()
    );
};

IDE_Morph.prototype.confirm = function (message, title, action) {
    new DialogBoxMorph(null, action).askYesNo(
        title,
        localize(message),
        this.world()
    );
};

IDE_Morph.prototype.prompt = function (message, callback, choices, key) {
    (new DialogBoxMorph(null, callback)).withKey(key).prompt(
        message,
        '',
        this.world(),
        null,
        choices
    );
};

// ProjectDialogMorph ////////////////////////////////////////////////////

// ProjectDialogMorph inherits from DialogBoxMorph:

ProjectDialogMorph.prototype = new DialogBoxMorph();
ProjectDialogMorph.prototype.constructor = ProjectDialogMorph;
ProjectDialogMorph.uber = DialogBoxMorph.prototype;

// ProjectDialogMorph instance creation:

function ProjectDialogMorph(ide, label) {
    this.init(ide, label);
}

ProjectDialogMorph.prototype.init = function (ide, task) {
    var myself = this;

    // additional properties:
    this.ide = ide;
    this.task = task || 'open'; // String describing what do do (open, save)
    this.source = ide.source;
    this.projectList = []; // [{name: , thumb: , notes:}]

    this.handle = null;
    this.srcBar = null;
    this.nameField = null;
    this.filterField = null;
    this.magnifyingGlass = null;
    this.listField = null;
    this.preview = null;
    this.notesText = null;
    this.notesField = null;
    this.deleteButton = null;
    this.shareButton = null;
    this.unshareButton = null;
    this.publishButton = null;
    this.unpublishButton = null;
    this.recoverButton = null;

    // initialize inherited properties:
    ProjectDialogMorph.uber.init.call(
        this,
        this, // target
        null, // function
        null // environment
    );

    // override inherited properites:
    this.labelString = this.task === 'save' ? 'Save Project' : 'Open Project';
    this.createLabel();
    this.key = 'project' + task;

    // build contents
    if (task === 'open' && this.source === 'disk') {
        // give the user a chance to switch to another source
        this.source = null;
        this.buildContents();
        this.projectList = [];
        this.listField.hide();
        this.source = 'disk';
    } else {
        this.buildContents();
        this.onNextStep = function () { // yield to show "updating" message
            myself.setSource(myself.source);
        };
    }
};

ProjectDialogMorph.prototype.buildContents = function () {
    var thumbnail, notification;

    this.addBody(new Morph());
    this.body.color = this.color;

    this.srcBar = new AlignmentMorph('column', this.padding / 2);

    if (this.ide.cloudMsg) {
        notification = new TextMorph(
            this.ide.cloudMsg,
            10,
            null, // style
            false, // bold
            null, // italic
            null, // alignment
            null, // width
            null, // font name
            new Point(1, 1), // shadow offset
            new Color(255, 255, 255) // shadowColor
        );
        notification.refresh = nop;
        this.srcBar.add(notification);
    }

    this.addSourceButton('cloud', localize('Cloud'), 'cloud');

    if (this.task === 'open') {
        this.buildFilterField();
        this.addSourceButton('examples', localize('Examples'), 'poster');
        if (this.hasLocalProjects() || this.ide.world().currentKey === 16) {
            // shift- clicked
            this.addSourceButton('local', localize('Browser'), 'globe');
        }
    }
    this.addSourceButton('disk', localize('Computer'), 'storage');

    this.srcBar.fixLayout();
    this.body.add(this.srcBar);

    if (this.task === 'save') {
        this.nameField = new InputFieldMorph(this.ide.projectName);
        this.body.add(this.nameField);
    }

    this.listField = new ListMorph([]);
    this.fixListFieldItemColors();
    this.listField.fixLayout = nop;
    this.listField.edge = InputFieldMorph.prototype.edge;
    this.listField.fontSize = InputFieldMorph.prototype.fontSize;
    this.listField.typeInPadding = InputFieldMorph.prototype.typeInPadding;
    this.listField.contrast = InputFieldMorph.prototype.contrast;
    this.listField.drawNew = InputFieldMorph.prototype.drawNew;
    this.listField.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;

    this.body.add(this.listField);

    this.preview = new Morph();
    this.preview.fixLayout = nop;
    this.preview.edge = InputFieldMorph.prototype.edge;
    this.preview.fontSize = InputFieldMorph.prototype.fontSize;
    this.preview.typeInPadding = InputFieldMorph.prototype.typeInPadding;
    this.preview.contrast = InputFieldMorph.prototype.contrast;
    this.preview.drawNew = function () {
        InputFieldMorph.prototype.drawNew.call(this);
        if (this.texture) {
            this.drawTexture(this.texture);
        }
    };
    this.preview.drawCachedTexture = function () {
        var context = this.image.getContext('2d');
        context.drawImage(this.cachedTexture, this.edge, this.edge);
        this.changed();
    };
    this.preview.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;
    this.preview.setExtent(
        this.ide.serializer.thumbnailSize.add(this.preview.edge * 2)
    );

    this.body.add(this.preview);
    this.preview.drawNew();
    if (this.task === 'save') {
        thumbnail = this.ide.stage.thumbnail(
            SnapSerializer.prototype.thumbnailSize
        );
        this.preview.texture = null;
        this.preview.cachedTexture = thumbnail;
        this.preview.drawCachedTexture();
    }

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

    if (this.task === 'open') {
        this.notesText = new TextMorph('');
    } else { // 'save'
        this.notesText = new TextMorph(this.ide.projectNotes);
        this.notesText.isEditable = true;
        this.notesText.enableSelecting();
    }

    this.notesField.isTextLineWrapping = true;
    this.notesField.padding = 3;
    this.notesField.setContents(this.notesText);
    this.notesField.setWidth(this.preview.width());

    this.body.add(this.notesField);

    if (this.task === 'open') {
        this.addButton('openProject', 'Open');
        this.action = 'openProject';
        this.recoverButton = this.addButton('recoveryDialog', 'Recover', true);
        this.recoverButton.hide();
    } else { // 'save'
        this.addButton('saveProject', 'Save');
        this.action = 'saveProject';
    }
    this.shareButton = this.addButton('shareProject', 'Share', true);
    this.unshareButton = this.addButton('unshareProject', 'Unshare', true);
    this.shareButton.hide();
    this.unshareButton.hide();
    this.publishButton = this.addButton('publishProject', 'Publish', true);
    this.unpublishButton = this.addButton(
        'unpublishProject',
        'Unpublish',
        true
    );
    this.publishButton.hide();
    this.unpublishButton.hide();
    this.deleteButton = this.addButton('deleteProject', 'Delete');
    this.addButton('cancel', 'Cancel');

    if (notification) {
        this.setExtent(new Point(500, 360).add(notification.extent()));
    } else {
        this.setExtent(new Point(500, 360));
    }
    this.fixLayout();

};

ProjectDialogMorph.prototype.popUp = function (wrrld) {
    var world = wrrld || this.ide.world();
    if (world) {
        ProjectDialogMorph.uber.popUp.call(this, world);
        this.handle = new HandleMorph(
            this,
            350,
            330,
            this.corner,
            this.corner
        );
    }
};

// ProjectDialogMorph action buttons

ProjectDialogMorph.prototype.createButtons = function () {
    if (this.buttons) {
        this.buttons.destroy();
    }
    this.buttons = new AlignmentMorph('column', this.padding / 3);
    this.buttons.bottomRow = new AlignmentMorph('row', this.padding);
    this.buttons.topRow = new AlignmentMorph('row', this.padding);
    this.buttons.add(this.buttons.topRow);
    this.buttons.add(this.buttons.bottomRow);
    this.add(this.buttons);

    this.buttons.topRow.hide = function () {
        this.isVisible = false;
        this.changed();
    };

    this.buttons.topRow.show = function () {
        this.isVisible = true;
        this.changed();
    };

    this.buttons.fixLayout = function () {
        if (this.topRow.children.some(function (any) {
            return any.isVisible;
        })) {
            this.topRow.show();
            this.topRow.fixLayout();
        } else {
            this.topRow.hide();
        }
        this.bottomRow.fixLayout();
        AlignmentMorph.prototype.fixLayout.call(this);
    };
};

ProjectDialogMorph.prototype.addButton = function (action, label, topRow) {
    var button = new PushButtonMorph(
        this,
        action || 'ok',
        '  ' + localize((label || 'OK')) + '  '
    );
    button.fontSize = this.buttonFontSize;
    button.corner = this.buttonCorner;
    button.edge = this.buttonEdge;
    button.outline = this.buttonOutline;
    button.outlineColor = this.buttonOutlineColor;
    button.outlineGradient = this.buttonOutlineGradient;
    button.padding = this.buttonPadding;
    button.contrast = this.buttonContrast;
    button.drawNew();
    button.fixLayout();
    if (topRow) {
        this.buttons.topRow.add(button);
    } else {
        this.buttons.bottomRow.add(button);
    }
    return button;
};

// ProjectDialogMorph source buttons

ProjectDialogMorph.prototype.addSourceButton = function (
    source,
    label,
    symbol
) {
    var myself = this,
        lbl1 = new StringMorph(
            label,
            10,
            null,
            true,
            null,
            null,
            new Point(1, 1),
            new Color(255, 255, 255)
        ),
        lbl2 = new StringMorph(
            label,
            10,
            null,
            true,
            null,
            null,
            new Point(-1, -1),
            this.titleBarColor.darker(50),
            new Color(255, 255, 255)
        ),
        l1 = new Morph(),
        l2 = new Morph(),
        button;

    lbl1.add(new SymbolMorph(
        symbol,
        24,
        this.titleBarColor.darker(20),
        new Point(1, 1),
        this.titleBarColor.darker(50)
    ));
    lbl1.children[0].setCenter(lbl1.center());
    lbl1.children[0].setBottom(lbl1.top() - this.padding / 2);

    l1.image = lbl1.fullImage();
    l1.bounds = lbl1.fullBounds();

    lbl2.add(new SymbolMorph(
        symbol,
        24,
        new Color(255, 255, 255),
        new Point(-1, -1),
        this.titleBarColor.darker(50)
    ));
    lbl2.children[0].setCenter(lbl2.center());
    lbl2.children[0].setBottom(lbl2.top() - this.padding / 2);

    l2.image = lbl2.fullImage();
    l2.bounds = lbl2.fullBounds();

    button = new ToggleButtonMorph(
        null, //colors,
        myself, // the ProjectDialog is the target
        function () { // action
            myself.setSource(source);
        },
        [l1, l2],
        function () {  // query
            return myself.source === source;
        }
    );

    button.corner = this.buttonCorner;
    button.edge = this.buttonEdge;
    button.outline = this.buttonOutline;
    button.outlineColor = this.buttonOutlineColor;
    button.outlineGradient = this.buttonOutlineGradient;
    button.labelMinExtent = new Point(60, 0);
    button.padding = this.buttonPadding;
    button.contrast = this.buttonContrast;
    button.pressColor = this.titleBarColor.darker(20);

    button.drawNew();
    button.fixLayout();
    button.refresh();
    this.srcBar.add(button);
};

// ProjectDialogMorph list field control

ProjectDialogMorph.prototype.fixListFieldItemColors = function () {
    // remember to always fixLayout() afterwards for the changes
    // to take effect
    var myself = this;
    this.listField.contents.children[0].alpha = 0;
    this.listField.contents.children[0].children.forEach(function (item) {
        item.pressColor = myself.titleBarColor.darker(20);
        item.color = new Color(0, 0, 0, 0);
        item.noticesTransparentClick = true;
    });
};

// ProjectDialogMorph filter field

ProjectDialogMorph.prototype.buildFilterField = function () {
    var myself = this;

    this.filterField = new InputFieldMorph('');
    this.magnifyingGlass =
        new SymbolMorph(
            'magnifyingGlass',
            this.filterField.height(),
            this.titleBarColor.darker(50));

    this.body.add(this.magnifyingGlass);
    this.body.add(this.filterField);

    this.filterField.reactToKeystroke = function (evt) {
        var text = this.getValue();

        myself.listField.elements =
            myself.projectList.filter(function (aProject) {
                var name = aProject.projectname || aProject.name,
                    notes = aProject.notes || '';

                return name.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
                    notes.toLowerCase().indexOf(text.toLowerCase()) > -1;
            });

        if (myself.listField.elements.length === 0) {
            myself.listField.elements.push('(no matches)');
        }

        myself.clearDetails();
        myself.listField.buildListContents();
        myself.fixListFieldItemColors();
        myself.listField.adjustScrollBars();
        myself.listField.scrollY(myself.listField.top());
        myself.fixLayout();
    };
};

// ProjectDialogMorph ops

ProjectDialogMorph.prototype.setSource = function (source) {
    var myself = this,
        msg;

    this.source = source;
    this.srcBar.children.forEach(function (button) {
        button.refresh();
    });

    switch (this.source) {
    case 'cloud':
        msg = myself.ide.showMessage('Updating\nproject list...');
        this.projectList = [];
        myself.ide.cloud.getProjectList(
            function (response) {
                // Don't show cloud projects if user has since switched panes.
                if (myself.source === 'cloud') {
                    myself.installCloudProjectList(response.projects);
                }
                msg.destroy();
            },
            function (err, lbl) {
                msg.destroy();
                myself.ide.cloudError().call(null, err, lbl);
            }
        );
        return;
    case 'examples':
        this.projectList = this.getExamplesProjectList();
        break;
    case 'local':
        // deprecated, only for reading
        this.projectList = this.getLocalProjectList();
        break;
    case 'disk':
        if (this.task === 'save') {
            this.projectList = [];
        } else {
            this.destroy();
            this.ide.importLocalFile();
            return;
        }
        break;
    }

    this.listField.destroy();
    this.listField = new ListMorph(
        this.projectList,
        this.projectList.length > 0 ?
                function (element) {
                    return element.name || element;
                } : null,
        null,
        function () {myself.ok(); }
    );
    if (this.source === 'disk') {
        this.listField.hide();
    }

    this.fixListFieldItemColors();
    this.listField.fixLayout = nop;
    this.listField.edge = InputFieldMorph.prototype.edge;
    this.listField.fontSize = InputFieldMorph.prototype.fontSize;
    this.listField.typeInPadding = InputFieldMorph.prototype.typeInPadding;
    this.listField.contrast = InputFieldMorph.prototype.contrast;
    this.listField.drawNew = InputFieldMorph.prototype.drawNew;
    this.listField.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;

    if (this.source === 'local') {
        this.listField.action = function (item) {
            var src, xml;

            if (item === undefined) {return; }
            if (myself.nameField) {
                myself.nameField.setContents(item.name || '');
            }
            if (myself.task === 'open') {

                src = localStorage['-snap-project-' + item.name];

                if (src) {
                    xml = myself.ide.serializer.parse(src);

                    myself.notesText.text = xml.childNamed('notes').contents
                        || '';
                    myself.notesText.drawNew();
                    myself.notesField.contents.adjustBounds();
                    myself.preview.texture =
                        xml.childNamed('thumbnail').contents || null;
                    myself.preview.cachedTexture = null;
                    myself.preview.drawNew();
                }
            }
            myself.edit();
        };
    } else { // 'examples'; 'cloud' is initialized elsewhere
        this.listField.action = function (item) {
            var src, xml;
            if (item === undefined) {return; }
            if (myself.nameField) {
                myself.nameField.setContents(item.name || '');
            }
            src = myself.ide.getURL(
                myself.ide.resourceURL('Examples', item.fileName)
            );

            xml = myself.ide.serializer.parse(src);
            myself.notesText.text = xml.childNamed('notes').contents
                || '';
            myself.notesText.drawNew();
            myself.notesField.contents.adjustBounds();
            myself.preview.texture = xml.childNamed('thumbnail').contents
                || null;
            myself.preview.cachedTexture = null;
            myself.preview.drawNew();
            myself.edit();
        };
    }
    this.body.add(this.listField);
    this.shareButton.hide();
    this.unshareButton.hide();

    if (this.task === 'open') {
        this.recoverButton.hide();
    }

    this.publishButton.hide();
    this.unpublishButton.hide();
    if (this.source === 'local') {
        this.deleteButton.show();
    } else { // examples
        this.deleteButton.hide();
    }
    this.buttons.fixLayout();
    this.fixLayout();
    if (this.task === 'open') {
        this.clearDetails();
    }
};

ProjectDialogMorph.prototype.hasLocalProjects = function () {
    // check and report whether old projects still exist in the
    // browser's local storage, which as of v5 has been deprecated,
    // so the user can recover and move them elsewhere
    return Object.keys(localStorage).some(function (any) {
        return any.indexOf('-snap-project-') === 0;
    });
};

ProjectDialogMorph.prototype.getLocalProjectList = function () {
    var stored, name, dta,
        projects = [];
    for (stored in localStorage) {
        if (Object.prototype.hasOwnProperty.call(localStorage, stored)
                && stored.substr(0, 14) === '-snap-project-') {
            name = stored.substr(14);
            dta = {
                name: name,
                thumb: null,
                notes: null
            };
            projects.push(dta);
        }
    }
    projects.sort(function (x, y) {
        return x.name.toLowerCase() < y.name.toLowerCase() ? -1 : 1;
    });
    return projects;
};

ProjectDialogMorph.prototype.getExamplesProjectList = function () {
    return this.ide.getMediaList('Examples');
};

ProjectDialogMorph.prototype.installCloudProjectList = function (pl) {
    var myself = this;
    this.projectList = pl[0] ? pl : [];
    this.projectList.sort(function (x, y) {
        return x.projectname.toLowerCase() < y.projectname.toLowerCase() ?
                 -1 : 1;
    });

    this.listField.destroy();
    this.listField = new ListMorph(
        this.projectList,
        this.projectList.length > 0 ?
                function (element) {
                    return element.projectname || element;
                } : null,
        [ // format: display shared project names bold
            [
                'bold',
                function (proj) { return proj.ispublic; }
            ],
            [
                'italic',
                function (proj) { return proj.ispublished; }
            ]
        ],
        function () { myself.ok(); }
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
        if (item === undefined) {return; }
        if (myself.nameField) {
            myself.nameField.setContents(item.projectname || '');
        }
        if (myself.task === 'open') {
            myself.notesText.text = item.notes || '';
            myself.notesText.drawNew();
            myself.notesField.contents.adjustBounds();
            myself.preview.texture = '';
            myself.preview.drawNew();
            // we ask for the thumbnail when selecting a project
            myself.ide.cloud.getThumbnail(
                null, // username is implicit
                item.projectname,
                function (thumbnail) {
                    myself.preview.texture = thumbnail;
                    myself.preview.cachedTexture = null;
                    myself.preview.drawNew();
                });
            (new SpeechBubbleMorph(new TextMorph(
                localize('last changed') + '\n' + item.lastupdated,
                null,
                null,
                null,
                null,
                'center'
            ))).popUp(
                myself.world(),
                myself.preview.rightCenter().add(new Point(2, 0))
            );
        }
        if (item.ispublic) {
            myself.shareButton.hide();
            myself.unshareButton.show();
            if (item.ispublished) {
                myself.publishButton.hide();
                myself.unpublishButton.show();
            } else {
                myself.publishButton.show();
                myself.unpublishButton.hide();
            }
        } else {
            myself.unshareButton.hide();
            myself.shareButton.show();
            myself.publishButton.hide();
            myself.unpublishButton.hide();
        }
        myself.buttons.fixLayout();
        myself.fixLayout();
        myself.edit();
    };
    this.body.add(this.listField);
    if (this.task === 'open') {
        this.recoverButton.show();
    }
    this.shareButton.show();
    this.unshareButton.hide();
    this.deleteButton.show();
    this.buttons.fixLayout();
    this.fixLayout();
    if (this.task === 'open') {
        this.clearDetails();
    }
};

ProjectDialogMorph.prototype.clearDetails = function () {
    this.notesText.text = '';
    this.notesText.drawNew();
    this.notesField.contents.adjustBounds();
    this.preview.texture = null;
    this.preview.cachedTexture = null;
    this.preview.drawNew();
};

ProjectDialogMorph.prototype.recoveryDialog = function () {
    var proj = this.listField.selected;
    if (!proj) {return; }
    new ProjectRecoveryDialogMorph(this.ide, proj.projectname, this).popUp();
    this.hide();
};

ProjectDialogMorph.prototype.openProject = function () {
    var proj = this.listField.selected,
        src;
    if (!proj) {return; }
    this.ide.source = this.source;
    if (this.source === 'cloud') {
        this.openCloudProject(proj);
    } else if (this.source === 'examples') {
        // Note "file" is a property of the parseResourceFile function.
        src = this.ide.getURL(this.ide.resourceURL('Examples', proj.fileName));
        this.ide.openProjectString(src);
        this.destroy();
    } else { // 'local'
        this.ide.source = null;
        this.ide.openProject(proj.name);
        this.destroy();
    }
};

ProjectDialogMorph.prototype.openCloudProject = function (project, delta) {
    var myself = this;
    myself.ide.nextSteps([
        function () {
            myself.ide.showMessage('Fetching project\nfrom the cloud...');
        },
        function () {
            myself.rawOpenCloudProject(project, delta);
        }
    ]);
};

ProjectDialogMorph.prototype.rawOpenCloudProject = function (proj, delta) {
    var myself = this;
    this.ide.cloud.getProject(
        proj.projectname,
        delta,
        function (clouddata) {
            myself.ide.source = 'cloud';
            myself.ide.nextSteps([
                function () {
                    myself.ide.openCloudDataString(clouddata);
                }
            ]);
			location.hash = '';
            if (proj.ispublic) {
                location.hash = '#present:Username=' +
                    encodeURIComponent(myself.ide.cloud.username) +
                    '&ProjectName=' +
                    encodeURIComponent(proj.projectname);
            }
        },
        myself.ide.cloudError()
    );
    this.destroy();
};

ProjectDialogMorph.prototype.saveProject = function () {
    var name = this.nameField.contents().text.text,
        notes = this.notesText.text,
        myself = this;

    this.ide.projectNotes = notes || this.ide.projectNotes;
    if (name) {
        if (this.source === 'cloud') {
            if (detect(
                    this.projectList,
                    function (item) {return item.projectname === name; }
                )) {
                this.ide.confirm(
                    localize(
                        'Are you sure you want to replace'
                    ) + '\n"' + name + '"?',
                    'Replace Project',
                    function () {
                        myself.ide.setProjectName(name);
                        myself.saveCloudProject();
                    }
                );
            } else {
                this.ide.setProjectName(name);
                myself.saveCloudProject();
            }
        } else if (this.source === 'disk') {
            this.ide.exportProject(name, false);
            this.ide.source = 'disk';
            this.destroy();
        }
    }
};

ProjectDialogMorph.prototype.saveCloudProject = function () {
    this.ide.source = 'cloud';
    this.ide.saveProjectToCloud();
    this.destroy();
};

ProjectDialogMorph.prototype.deleteProject = function () {
    var myself = this,
        proj,
        idx,
        name;

    if (this.source === 'cloud') {
        proj = this.listField.selected;
        if (proj) {
            this.ide.confirm(
                localize(
                    'Are you sure you want to delete'
                ) + '\n"' + proj.projectname + '"?',
                'Delete Project',
                function () {
                    myself.ide.cloud.deleteProject(
                        proj.projectname,
                        null, // username is implicit
                        function () {
                            myself.ide.hasChangedMedia = true;
                            idx = myself.projectList.indexOf(proj);
                            myself.projectList.splice(idx, 1);
                            myself.installCloudProjectList(
                                myself.projectList
                            ); // refresh list
                        },
                        myself.ide.cloudError()
                    );
                }
            );
        }
    } else { // 'local, examples'
        if (this.listField.selected) {
            name = this.listField.selected.name;
            this.ide.confirm(
                localize(
                    'Are you sure you want to delete'
                ) + '\n"' + name + '"?',
                'Delete Project',
                function () {
                    delete localStorage['-snap-project-' + name];
                    myself.setSource(myself.source); // refresh list
                }
            );
        }
    }
};

ProjectDialogMorph.prototype.shareProject = function () {
    var myself = this,
        ide = this.ide,
        proj = this.listField.selected,
        entry = this.listField.active;

    if (proj) {
        this.ide.confirm(
            localize(
                'Are you sure you want to share'
            ) + '\n"' + proj.projectname + '"?',
            'Share Project',
            function () {
                ide.showMessage('sharing\nproject...');
                ide.cloud.shareProject(
                    proj.projectname,
                    null, // username is implicit
                    function () {
                        proj.ispublic = true;
                        myself.unshareButton.show();
                        myself.shareButton.hide();
                        myself.publishButton.show();
                        myself.unpublishButton.hide();
                        entry.label.isBold = true;
                        entry.label.drawNew();
                        entry.label.changed();
                        myself.buttons.fixLayout();
                        myself.drawNew();
                        myself.ide.showMessage('shared.', 2);

                        // Set the Shared URL if the project is currently open
                        if (proj.projectname === ide.projectName) {
                            var usr = ide.cloud.username,
                                projectId = 'Username=' +
                                    encodeURIComponent(usr.toLowerCase()) +
                                    '&ProjectName=' +
                                    encodeURIComponent(proj.projectname);
                            location.hash = 'present:' + projectId;
                        }
                    },
                    myself.ide.cloudError()
                );
            }
        );
    }
};

ProjectDialogMorph.prototype.unshareProject = function () {
    var myself = this,
        ide = this.ide,
        proj = this.listField.selected,
        entry = this.listField.active;

    if (proj) {
        this.ide.confirm(
            localize(
                'Are you sure you want to unshare'
            ) + '\n"' + proj.projectname + '"?',
            'Unshare Project',
            function () {
                ide.showMessage('unsharing\nproject...');
                ide.cloud.unshareProject(
                    proj.projectname,
                    null, // username is implicit
                    function () {
                        proj.ispublic = false;
                        myself.shareButton.show();
                        myself.unshareButton.hide();
                        myself.publishButton.hide();
                        myself.unpublishButton.hide();
                        entry.label.isBold = false;
                        entry.label.isItalic = false;
                        entry.label.drawNew();
                        entry.label.changed();
                        myself.buttons.fixLayout();
                        myself.drawNew();
                        myself.ide.showMessage('unshared.', 2);
                        if (proj.projectname === ide.projectName) {
                            location.hash = '';
                        }
                    },
                    myself.ide.cloudError()
                );
            }
        );
    }
};

ProjectDialogMorph.prototype.publishProject = function () {
    var myself = this,
        ide = this.ide,
        proj = this.listField.selected,
        entry = this.listField.active;

    if (proj) {
        this.ide.confirm(
            localize(
                'Are you sure you want to publish'
            ) + '\n"' + proj.projectname + '"?',
            'Publish Project',
            function () {
                ide.showMessage('publishing\nproject...');
                ide.cloud.publishProject(
                    proj.projectname,
                    null, // username is implicit
                    function () {
                        proj.ispublished = true;
                        myself.unshareButton.show();
                        myself.shareButton.hide();
                        myself.publishButton.hide();
                        myself.unpublishButton.show();
                        entry.label.isItalic = true;
                        entry.label.drawNew();
                        entry.label.changed();
                        myself.buttons.fixLayout();
                        myself.drawNew();
                        myself.ide.showMessage('published.', 2);

                        // Set the Shared URL if the project is currently open
                        if (proj.projectname === ide.projectName) {
                            var usr = ide.cloud.username,
                                projectId = 'Username=' +
                                    encodeURIComponent(usr.toLowerCase()) +
                                    '&ProjectName=' +
                                    encodeURIComponent(proj.projectname);
                            location.hash = 'present:' + projectId;
                        }
                    },
                    myself.ide.cloudError()
                );
            }
        );
    }
};

ProjectDialogMorph.prototype.unpublishProject = function () {
    var myself = this,
        proj = this.listField.selected,
        entry = this.listField.active;

    if (proj) {
        this.ide.confirm(
            localize(
                'Are you sure you want to unpublish'
            ) + '\n"' + proj.projectname + '"?',
            'Unpublish Project',
            function () {
                myself.ide.showMessage('unpublishing\nproject...');
                myself.ide.cloud.unpublishProject(
                    proj.projectname,
                    null, // username is implicit
                    function () {
                        proj.ispublished = false;
                        myself.unshareButton.show();
                        myself.shareButton.hide();
                        myself.publishButton.show();
                        myself.unpublishButton.hide();
                        entry.label.isItalic = false;
                        entry.label.drawNew();
                        entry.label.changed();
                        myself.buttons.fixLayout();
                        myself.drawNew();
                        myself.ide.showMessage('unpublished.', 2);
                    },
                    myself.ide.cloudError()
                );
            }
        );
    }
};

ProjectDialogMorph.prototype.edit = function () {
    if (this.nameField) {
        this.nameField.edit();
    } else if (this.filterField) {
        this.filterField.edit();
    }
};

// ProjectDialogMorph layout

ProjectDialogMorph.prototype.fixLayout = function () {
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
        inputField.drawNew();

        this.listField.setLeft(this.srcBar.right() + this.padding);
        this.listField.setWidth(
            this.body.width()
                - this.srcBar.width()
                - this.preview.width()
                - this.padding
                - thin
        );
        this.listField.contents.children[0].adjustWidths();

        this.listField.setTop(inputField.bottom() + this.padding);
        this.listField.setHeight(
            this.body.height() - inputField.height() - this.padding
        );

        if (this.magnifyingGlass) {
            this.magnifyingGlass.setTop(inputField.top());
            this.magnifyingGlass.setLeft(this.listField.left());
        }

        this.preview.setRight(this.body.right());
        this.preview.setTop(inputField.bottom() + this.padding);

        this.notesField.setTop(this.preview.bottom() + thin);
        this.notesField.setLeft(this.preview.left());
        this.notesField.setHeight(
            this.body.bottom() - this.preview.bottom() - thin
        );
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

// ProjectRecoveryDialogMorph /////////////////////////////////////////
// I show previous versions for a particular project and
// let users recover them.

ProjectRecoveryDialogMorph.prototype = new DialogBoxMorph();
ProjectRecoveryDialogMorph.prototype.constructor = ProjectRecoveryDialogMorph;
ProjectRecoveryDialogMorph.uber = DialogBoxMorph.prototype;

// ProjectRecoveryDialogMorph instance creation:

function ProjectRecoveryDialogMorph(ide, project, browser) {
    this.init(ide, project, browser);
}

ProjectRecoveryDialogMorph.prototype.init = function (
    ide,
    projectName,
    browser
) {
    // initialize inherited properties:
    ProjectRecoveryDialogMorph.uber.init.call(
        this,
        this, // target
        null, // function
        null  // environment
    );

    this.ide = ide;
    this.browser = browser;
    this.key = 'recoverProject';
    this.projectName = projectName;

    this.versions = null;

    this.handle = null;
    this.listField = null;
    this.preview = null;
    this.notesText = null;
    this.notesField = null;

    this.labelString = 'Recover project';
    this.createLabel();

    this.buildContents();
};

ProjectRecoveryDialogMorph.prototype.buildContents = function () {
    this.addBody(new Morph());
    this.body.color = this.color;

    this.buildListField();

    this.preview = new Morph();
    this.preview.fixLayout = nop;
    this.preview.edge = InputFieldMorph.prototype.edge;
    this.preview.fontSize = InputFieldMorph.prototype.fontSize;
    this.preview.typeInPadding = InputFieldMorph.prototype.typeInPadding;
    this.preview.contrast = InputFieldMorph.prototype.contrast;
    this.preview.drawNew = function () {
        InputFieldMorph.prototype.drawNew.call(this);
        if (this.texture) {
            this.drawTexture(this.texture);
        }
    };
    this.preview.drawCachedTexture = function () {
        var context = this.image.getContext('2d');
        context.drawImage(this.cachedTexture, this.edge, this.edge);
        this.changed();
    };
    this.preview.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;
    this.preview.setExtent(
        this.ide.serializer.thumbnailSize.add(this.preview.edge * 2)
    );

    this.body.add(this.preview);
    this.preview.drawNew();

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
    this.notesField.setWidth(this.preview.width());

    this.body.add(this.notesField);

    this.addButton('recoverProject', 'Recover', true);
    this.addButton('cancel', 'Cancel');

    this.setExtent(new Point(360, 300));
    this.fixLayout();
};

ProjectRecoveryDialogMorph.prototype.buildListField = function () {
    var myself = this;

    this.listField = new ListMorph([]);
    this.fixListFieldItemColors();
    this.listField.fixLayout = nop;
    this.listField.edge = InputFieldMorph.prototype.edge;
    this.listField.fontSize = InputFieldMorph.prototype.fontSize;
    this.listField.typeInPadding = InputFieldMorph.prototype.typeInPadding;
    this.listField.contrast = InputFieldMorph.prototype.contrast;
    this.listField.drawNew = InputFieldMorph.prototype.drawNew;
    this.listField.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;

    this.listField.action = function (item) {
        var version;
        if (item === undefined) { return; }
        version = detect(
            myself.versions,
            function (version) {
                return version.lastupdated === item;
            });
        myself.notesText.text = version.notes || '';
        myself.notesText.drawNew();
        myself.notesField.contents.adjustBounds();
        myself.preview.texture = version.thumbnail;
        myself.preview.cachedTexture = null;
        myself.preview.drawNew();
    };

    this.ide.cloud.getProjectVersionMetadata(
        this.projectName,
        function (versions) {
            var today = new Date(),
                yesterday = new Date();
            yesterday.setDate(today.getDate() - 1);
            myself.versions = versions;
            myself.versions.forEach(function (version) {
                var date = new Date(
                    new Date().getTime() - version.lastupdated * 1000
                );
                if (date.toDateString() === today.toDateString()) {
                    version.lastupdated = localize('Today, ') +
                        date.toLocaleTimeString();
                } else if (date.toDateString() === yesterday.toDateString()) {
                    version.lastupdated = localize('Yesterday, ') +
                        date.toLocaleTimeString();
                } else {
                    version.lastupdated = date.toLocaleString();
                }
            });
            myself.listField.elements =
                myself.versions.map(function (version) {
                    return version.lastupdated;
                });
            myself.clearDetails();
            myself.listField.buildListContents();
            myself.fixListFieldItemColors();
            myself.listField.adjustScrollBars();
            myself.listField.scrollY(myself.listField.top());
            myself.fixLayout();
        },
        this.ide.cloudError()
    );

    this.body.add(this.listField);
};

ProjectRecoveryDialogMorph.prototype.cancel = function () {
    var myself = this;
    this.browser.show();
    this.browser.listField.select(
        detect(
            this.browser.projectList,
            function (item) {
                return item.projectname === myself.projectName;
            }
        )
    );
    ProjectRecoveryDialogMorph.uber.cancel.call(this);
};

ProjectRecoveryDialogMorph.prototype.recoverProject = function () {
    var lastupdated = this.listField.selected,
        version = detect(
        this.versions,
        function (version) {
            return version.lastupdated === lastupdated;
        });

    this.browser.openCloudProject(
        {projectname: this.projectName},
        version.delta
    );
    this.destroy();
};

ProjectRecoveryDialogMorph.prototype.popUp = function () {
    var world = this.ide.world();
    if (world) {
        ProjectRecoveryDialogMorph.uber.popUp.call(this, world);
        this.handle = new HandleMorph(
            this,
            300,
            300,
            this.corner,
            this.corner
        );
    }
};

ProjectRecoveryDialogMorph.prototype.fixListFieldItemColors =
    ProjectDialogMorph.prototype.fixListFieldItemColors;

ProjectRecoveryDialogMorph.prototype.clearDetails =
    ProjectDialogMorph.prototype.clearDetails;

ProjectRecoveryDialogMorph.prototype.fixLayout = function () {
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

        this.listField.setWidth(
            this.body.width()
                - this.preview.width()
                - this.padding
        );
        this.listField.contents.children[0].adjustWidths();

        this.listField.setPosition(this.body.position());
        this.listField.setHeight(this.body.height());

        this.preview.setRight(this.body.right());
        this.preview.setTop(this.listField.top());

        this.notesField.setTop(this.preview.bottom() + thin);
        this.notesField.setLeft(this.preview.left());
        this.notesField.setHeight(
            this.body.bottom() - this.preview.bottom() - thin
        );
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

        myself.notesText.text = localize(item.description || '');
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
    var blocks,
        ide = this.ide,
        selectedLibrary = this.listField.selected.fileName,
        libraryName = this.listField.selected.name;

    if (this.hasCached(selectedLibrary)) {
        blocks = this.cachedLibrary(selectedLibrary);
        blocks.forEach(function (def) {
            def.receiver = ide.stage;
            ide.stage.globalBlocks.push(def);
            ide.stage.replaceDoubleDefinitionsFor(def);
        });
        ide.showMessage(localize('Imported') + ' ' + localize(libraryName), 2);
    } else {
        ide.showMessage(localize('Loading') + ' ' + localize(libraryName));
        ide.getURL(
            ide.resourceURL('libraries', selectedLibrary),
            function(libraryText) {
                ide.droppedText(libraryText, libraryName);
            }
        );
    }

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

// SpriteIconMorph ////////////////////////////////////////////////////

/*
    I am a selectable element in the Sprite corral, keeping a self-updating
    thumbnail of the sprite I'm respresenting, and a self-updating label
    of the sprite's name (in case it is changed elsewhere)
*/

// SpriteIconMorph inherits from ToggleButtonMorph (Widgets)

SpriteIconMorph.prototype = new ToggleButtonMorph();
SpriteIconMorph.prototype.constructor = SpriteIconMorph;
SpriteIconMorph.uber = ToggleButtonMorph.prototype;

// SpriteIconMorph settings

SpriteIconMorph.prototype.thumbSize = new Point(40, 40);
SpriteIconMorph.prototype.labelShadowOffset = null;
SpriteIconMorph.prototype.labelShadowColor = null;
SpriteIconMorph.prototype.labelColor = new Color(255, 255, 255);
SpriteIconMorph.prototype.fontSize = 9;

// SpriteIconMorph instance creation:

function SpriteIconMorph(aSprite, aTemplate) {
    this.init(aSprite, aTemplate);
}

SpriteIconMorph.prototype.init = function (aSprite, aTemplate) {
    var colors, action, query, hover, myself = this;

    if (!aTemplate) {
        colors = [
            IDE_Morph.prototype.groupColor,
            IDE_Morph.prototype.frameColor,
            IDE_Morph.prototype.frameColor
        ];

    }

    action = function () {
        // make my sprite the current one
        var ide = myself.parentThatIsA(IDE_Morph);

        if (ide) {
            ide.selectSprite(myself.object);
        }
    };

    query = function () {
        // answer true if my sprite is the current one
        var ide = myself.parentThatIsA(IDE_Morph);

        if (ide) {
            return ide.currentSprite === myself.object;
        }
        return false;
    };

    hover = function () {
        if (!aSprite.exemplar) {return null; }
        return (localize('parent') + ':\n' + aSprite.exemplar.name);
    };

    // additional properties:
    this.object = aSprite || new SpriteMorph(); // mandatory, actually
    this.version = this.object.version;
    this.thumbnail = null;
    this.rotationButton = null; // synchronous rotation of nested sprites

    // initialize inherited properties:
    SpriteIconMorph.uber.init.call(
        this,
        colors, // color overrides, <array>: [normal, highlight, pressed]
        null, // target - not needed here
        action, // a toggle function
        this.object.name, // label string
        query, // predicate/selector
        null, // environment
        hover, // hint
        aTemplate // optional, for cached background images
    );

    // override defaults and build additional components
    this.isDraggable = true;
    this.createThumbnail();
    this.padding = 2;
    this.corner = 8;
    this.fixLayout();
    this.fps = 1;
};

SpriteIconMorph.prototype.createThumbnail = function () {
    if (this.thumbnail) {
        this.thumbnail.destroy();
    }

    this.thumbnail = new Morph();
    this.thumbnail.setExtent(this.thumbSize);
    if (this.object instanceof SpriteMorph) { // support nested sprites
        this.thumbnail.image = this.object.fullThumbnail(this.thumbSize);
        this.createRotationButton();
    } else {
        this.thumbnail.image = this.object.thumbnail(this.thumbSize);
    }
    this.add(this.thumbnail);
};

SpriteIconMorph.prototype.createLabel = function () {
    var txt;

    if (this.label) {
        this.label.destroy();
    }
    txt = new StringMorph(
        this.object.name,
        this.fontSize,
        this.fontStyle,
        true,
        false,
        false,
        this.labelShadowOffset,
        this.labelShadowColor,
        this.labelColor
    );

    this.label = new FrameMorph();
    this.label.acceptsDrops = false;
    this.label.alpha = 0;
    this.label.setExtent(txt.extent());
    txt.setPosition(this.label.position());
    this.label.add(txt);
    this.add(this.label);
};

SpriteIconMorph.prototype.createRotationButton = function () {
    var button, myself = this;

    if (this.rotationButton) {
        this.rotationButton.destroy();
        this.roationButton = null;
    }
    if (!this.object.anchor) {
        return;
    }

    button = new ToggleButtonMorph(
        null, // colors,
        null, // target
        function () {
            myself.object.rotatesWithAnchor =
                !myself.object.rotatesWithAnchor;
        },
        [
            '\u2192',
            '\u21BB'
        ],
        function () {  // query
            return myself.object.rotatesWithAnchor;
        }
    );

    button.corner = 8;
    button.labelMinExtent = new Point(11, 11);
    button.padding = 0;
    button.pressColor = button.color;
    button.drawNew();
    // button.hint = 'rotate synchronously\nwith anchor';
    button.fixLayout();
    button.refresh();
    button.changed();
    this.rotationButton = button;
    this.add(this.rotationButton);
};

// SpriteIconMorph stepping

SpriteIconMorph.prototype.step = function () {
    if (this.version !== this.object.version) {
        this.createThumbnail();
        this.createLabel();
        this.fixLayout();
        this.version = this.object.version;
        this.refresh();
    }
};

// SpriteIconMorph layout

SpriteIconMorph.prototype.fixLayout = function () {
    if (!this.thumbnail || !this.label) {return null; }

    this.setWidth(
        this.thumbnail.width()
            + this.outline * 2
            + this.edge * 2
            + this.padding * 2
    );

    this.setHeight(
        this.thumbnail.height()
            + this.outline * 2
            + this.edge * 2
            + this.padding * 3
            + this.label.height()
    );

    this.thumbnail.setCenter(this.center());
    this.thumbnail.setTop(
        this.top() + this.outline + this.edge + this.padding
    );

    if (this.rotationButton) {
        this.rotationButton.setTop(this.top());
        this.rotationButton.setRight(this.right());
    }

    this.label.setWidth(
        Math.min(
            this.label.children[0].width(), // the actual text
            this.thumbnail.width()
        )
    );
    this.label.setCenter(this.center());
    this.label.setTop(
        this.thumbnail.bottom() + this.padding
    );
};

// SpriteIconMorph menu

SpriteIconMorph.prototype.userMenu = function () {
    var menu = new MenuMorph(this),
        myself = this;
    if (this.object instanceof StageMorph) {
        menu.addItem(
            'pic...',
            function () {
                var ide = myself.parentThatIsA(IDE_Morph);
                ide.saveCanvasAs(
                    myself.object.fullImageClassic(),
                    this.object.name
                );
            },
            'open a new window\nwith a picture of the stage'
        );
        return menu;
    }
    if (!(this.object instanceof SpriteMorph)) {return null; }
    menu.addItem("show", 'showSpriteOnStage');
    menu.addLine();
    menu.addItem("duplicate", 'duplicateSprite');
    if (StageMorph.prototype.enableInheritance) {
        menu.addItem("clone", 'instantiateSprite');
    }
    menu.addItem("delete", 'removeSprite');
    menu.addLine();
    if (StageMorph.prototype.enableInheritance) {
        /* version that hides refactoring capability unless shift-clicked
        if (this.world().currentKey === 16) { // shift-clicked
            menu.addItem(
                "parent...",
                'chooseExemplar',
                null,
                new Color(100, 0, 0)
            );
        }
        */
        menu.addItem("parent...", 'chooseExemplar');
        if (this.object.exemplar) {
            menu.addItem(
                "release",
                'releaseSprite',
                'make temporary and\nhide in the sprite corral'
            );
        }
    }
    if (this.object.anchor) {
        menu.addItem(
            localize('detach from') + ' ' + this.object.anchor.name,
            function () {myself.object.detachFromAnchor(); }
        );
    }
    if (this.object.parts.length) {
        menu.addItem(
            'detach all parts',
            function () {myself.object.detachAllParts(); }
        );
    }
    menu.addItem("export...", 'exportSprite');
    return menu;
};

SpriteIconMorph.prototype.duplicateSprite = function () {
    var ide = this.parentThatIsA(IDE_Morph);
    if (ide) {
        ide.duplicateSprite(this.object);
    }
};

SpriteIconMorph.prototype.instantiateSprite = function () {
    var ide = this.parentThatIsA(IDE_Morph);
    if (ide) {
        ide.instantiateSprite(this.object);
    }
};

SpriteIconMorph.prototype.removeSprite = function () {
    var ide = this.parentThatIsA(IDE_Morph);
    if (ide) {
        ide.removeSprite(this.object);
    }
};

SpriteIconMorph.prototype.exportSprite = function () {
    this.object.exportSprite();
};

SpriteIconMorph.prototype.chooseExemplar = function () {
    this.object.chooseExemplar();
};

SpriteIconMorph.prototype.releaseSprite = function () {
    this.object.release();
};

SpriteIconMorph.prototype.showSpriteOnStage = function () {
    this.object.showOnStage();
};

// SpriteIconMorph events

SpriteIconMorph.prototype.mouseDoubleClick = function () {
	if (this.object instanceof SpriteMorph) {
    	this.object.flash();
    }
};

// SpriteIconMorph drawing

SpriteIconMorph.prototype.createBackgrounds = function () {
//    only draw the edges if I am selected
    var context,
        ext = this.extent();

    if (this.template) { // take the backgrounds images from the template
        this.image = this.template.image;
        this.normalImage = this.template.normalImage;
        this.highlightImage = this.template.highlightImage;
        this.pressImage = this.template.pressImage;
        return null;
    }

    this.normalImage = newCanvas(ext);
    context = this.normalImage.getContext('2d');
    this.drawBackground(context, this.color);

    this.highlightImage = newCanvas(ext);
    context = this.highlightImage.getContext('2d');
    this.drawBackground(context, this.highlightColor);

    this.pressImage = newCanvas(ext);
    context = this.pressImage.getContext('2d');
    this.drawOutline(context);
    this.drawBackground(context, this.pressColor);
    this.drawEdges(
        context,
        this.pressColor,
        this.pressColor.lighter(this.contrast),
        this.pressColor.darker(this.contrast)
    );

    this.image = this.normalImage;
};

// SpriteIconMorph drag & drop

SpriteIconMorph.prototype.prepareToBeGrabbed = function () {
    var ide = this.parentThatIsA(IDE_Morph),
        idx;
    this.mouseClickLeft(); // select me
    this.alpha = 0.85;
    if (ide) {
        idx = ide.sprites.asArray().indexOf(this.object);
        ide.sprites.remove(idx + 1);
        ide.createCorral();
        ide.fixLayout();
    }
};

SpriteIconMorph.prototype.justDropped = function () {
    this.alpha = 1;
};

SpriteIconMorph.prototype.wantsDropOf = function (morph) {
    // allow scripts & media to be copied from one sprite to another
    // by drag & drop
    return morph instanceof BlockMorph
        || (morph instanceof CostumeIconMorph)
        || (morph instanceof SoundIconMorph);
};

SpriteIconMorph.prototype.reactToDropOf = function (morph, hand) {
    if (morph instanceof BlockMorph) {
        this.copyStack(morph);
    } else if (morph instanceof CostumeIconMorph) {
        this.copyCostume(morph.object);
    } else if (morph instanceof SoundIconMorph) {
        this.copySound(morph.object);
    }
    this.world().add(morph);
    morph.slideBackTo(hand.grabOrigin);
};

SpriteIconMorph.prototype.copyStack = function (block) {
    var sprite = this.object,
    	dup = block.fullCopy(),
        y = Math.max(sprite.scripts.children.map(function (stack) {
            return stack.fullBounds().bottom();
        }).concat([sprite.scripts.top()]));

    dup.setPosition(new Point(sprite.scripts.left() + 20, y + 20));
    sprite.scripts.add(dup);
    dup.allComments().forEach(function (comment) {
        comment.align(dup);
    });
    sprite.scripts.adjustBounds();

    // delete all local custom blocks (methods) that the receiver
    // doesn't understand
    dup.allChildren().forEach(function (morph) {
	    if (morph.isCustomBlock &&
        		!morph.isGlobal &&
        		!sprite.getMethod(morph.blockSpec)
        ) {
            morph.deleteBlock();
        }
    });
};

SpriteIconMorph.prototype.copyCostume = function (costume) {
    var dup = costume.copy();
    dup.name = this.object.newCostumeName(dup.name);
    this.object.addCostume(dup);
    this.object.wearCostume(dup);
};

SpriteIconMorph.prototype.copySound = function (sound) {
    var dup = sound.copy();
    this.object.addSound(dup.audio, dup.name);
};

// CostumeIconMorph ////////////////////////////////////////////////////

/*
    I am a selectable element in the SpriteEditor's "Costumes" tab, keeping
    a self-updating thumbnail of the costume I'm respresenting, and a
    self-updating label of the costume's name (in case it is changed
    elsewhere)
*/

// CostumeIconMorph inherits from ToggleButtonMorph (Widgets)
// ... and copies methods from SpriteIconMorph

CostumeIconMorph.prototype = new ToggleButtonMorph();
CostumeIconMorph.prototype.constructor = CostumeIconMorph;
CostumeIconMorph.uber = ToggleButtonMorph.prototype;

// CostumeIconMorph settings

CostumeIconMorph.prototype.thumbSize = new Point(80, 60);
CostumeIconMorph.prototype.labelShadowOffset = null;
CostumeIconMorph.prototype.labelShadowColor = null;
CostumeIconMorph.prototype.labelColor = new Color(255, 255, 255);
CostumeIconMorph.prototype.fontSize = 9;

// CostumeIconMorph instance creation:

function CostumeIconMorph(aCostume, aTemplate) {
    this.init(aCostume, aTemplate);
}

CostumeIconMorph.prototype.init = function (aCostume, aTemplate) {
    var colors, action, query, myself = this;

    if (!aTemplate) {
        colors = [
            IDE_Morph.prototype.groupColor,
            IDE_Morph.prototype.frameColor,
            IDE_Morph.prototype.frameColor
        ];

    }

    action = function () {
        // make my costume the current one
        var ide = myself.parentThatIsA(IDE_Morph),
            wardrobe = myself.parentThatIsA(WardrobeMorph);

        if (ide) {
            ide.currentSprite.wearCostume(myself.object);
        }
        if (wardrobe) {
            wardrobe.updateSelection();
        }
    };

    query = function () {
        // answer true if my costume is the current one
        var ide = myself.parentThatIsA(IDE_Morph);

        if (ide) {
            return ide.currentSprite.costume === myself.object;
        }
        return false;
    };

    // additional properties:
    this.object = aCostume || new Costume(); // mandatory, actually
    this.version = this.object.version;
    this.thumbnail = null;

    // initialize inherited properties:
    CostumeIconMorph.uber.init.call(
        this,
        colors, // color overrides, <array>: [normal, highlight, pressed]
        null, // target - not needed here
        action, // a toggle function
        this.object.name, // label string
        query, // predicate/selector
        null, // environment
        null, // hint
        aTemplate // optional, for cached background images
    );

    // override defaults and build additional components
    this.isDraggable = true;
    this.createThumbnail();
    this.padding = 2;
    this.corner = 8;
    this.fixLayout();
    this.fps = 1;
};

CostumeIconMorph.prototype.createThumbnail = function () {
    var txt;
    SpriteIconMorph.prototype.createThumbnail.call(this);
    if (this.object instanceof SVG_Costume) {
        txt = new StringMorph(
            'svg',
            this.fontSize * 0.8,
            this.fontStyle,
            false,
            false,
            false,
            this.labelShadowOffset,
            this.labelShadowColor,
            this.labelColor
        );
        txt.setBottom(this.thumbnail.bottom());
        this.thumbnail.add(txt);
    }
};

CostumeIconMorph.prototype.createLabel
    = SpriteIconMorph.prototype.createLabel;

// CostumeIconMorph stepping

CostumeIconMorph.prototype.step
    = SpriteIconMorph.prototype.step;

// CostumeIconMorph layout

CostumeIconMorph.prototype.fixLayout
    = SpriteIconMorph.prototype.fixLayout;

// CostumeIconMorph menu

CostumeIconMorph.prototype.userMenu = function () {
    var menu = new MenuMorph(this);
    if (!(this.object instanceof Costume)) {return null; }
    menu.addItem("edit", "editCostume");
    if (this.world().currentKey === 16) { // shift clicked
        menu.addItem(
            'edit rotation point only...',
            'editRotationPointOnly',
            null,
            new Color(100, 0, 0)
        );
    }
    menu.addItem("rename", "renameCostume");
    menu.addLine();
    menu.addItem("duplicate", "duplicateCostume");
    menu.addItem("delete", "removeCostume");
    menu.addLine();
    menu.addItem("export", "exportCostume");
    return menu;
};

CostumeIconMorph.prototype.editCostume = function () {
    this.disinherit();

    if (this.object instanceof SVG_Costume && this.object.shapes.length === 0) {
        try {
            this.object.parseShapes();
        } catch (e) {
            this.editRotationPointOnly();
            return;
        }
    }

    this.object.edit(
        this.world(),
        this.parentThatIsA(IDE_Morph),
        false // not a new costume, retain existing rotation center
    );
};

CostumeIconMorph.prototype.editRotationPointOnly = function () {
    var ide = this.parentThatIsA(IDE_Morph);
    this.object.editRotationPointOnly(this.world());
    ide.hasChangedMedia = true;
};

CostumeIconMorph.prototype.renameCostume = function () {
    this.disinherit();
    var costume = this.object,
        wardrobe = this.parentThatIsA(WardrobeMorph),
        ide = this.parentThatIsA(IDE_Morph);
    new DialogBoxMorph(
        null,
        function (answer) {
            if (answer && (answer !== costume.name)) {
                costume.name = wardrobe.sprite.newCostumeName(
                    answer,
                    costume
                );
                costume.version = Date.now();
                ide.hasChangedMedia = true;
            }
        }
    ).prompt(
        this.currentSprite instanceof SpriteMorph ?
            'rename costume' : 'rename background',
        costume.name,
        this.world()
    );
};

CostumeIconMorph.prototype.duplicateCostume = function () {
    var wardrobe = this.parentThatIsA(WardrobeMorph),
        ide = this.parentThatIsA(IDE_Morph),
        newcos = this.object.copy();
    newcos.name = wardrobe.sprite.newCostumeName(newcos.name);
    wardrobe.sprite.addCostume(newcos);
    wardrobe.updateList();
    if (ide) {
        ide.currentSprite.wearCostume(newcos);
    }
};

CostumeIconMorph.prototype.removeCostume = function () {
    var wardrobe = this.parentThatIsA(WardrobeMorph),
        idx = this.parent.children.indexOf(this),
        off = CamSnapshotDialogMorph.prototype.enableCamera ? 3 : 2,
        ide = this.parentThatIsA(IDE_Morph);
    wardrobe.removeCostumeAt(idx - off); // ignore paintbrush and camera buttons
    if (ide.currentSprite.costume === this.object) {
        ide.currentSprite.wearCostume(null);
    }
};

CostumeIconMorph.prototype.exportCostume = function () {
    var ide = this.parentThatIsA(IDE_Morph);
    if (this.object instanceof SVG_Costume) {
        // don't show SVG costumes in a new tab (shows text)
        ide.saveFileAs(this.object.contents.src, 'text/svg', this.object.name);
    } else { // rasterized Costume
        ide.saveCanvasAs(this.object.contents, this.object.name);
    }
};

// CostumeIconMorph drawing

CostumeIconMorph.prototype.createBackgrounds
    = SpriteIconMorph.prototype.createBackgrounds;

// CostumeIconMorph inheritance

CostumeIconMorph.prototype.disinherit = function () {
    var wardrobe = this.parentThatIsA(WardrobeMorph),
        idx = this.parent.children.indexOf(this);
    if (wardrobe.sprite.inheritsAttribute('costumes')) {
        wardrobe.sprite.shadowAttribute('costumes');
        this.object = wardrobe.sprite.costumes.at(idx - 3);
    }
};

// CostumeIconMorph drag & drop

CostumeIconMorph.prototype.prepareToBeGrabbed = function () {
    this.disinherit();
    this.mouseClickLeft(); // select me
    this.removeCostume();
};

// TurtleIconMorph ////////////////////////////////////////////////////

/*
    I am a selectable element in the SpriteEditor's "Costumes" tab, keeping
    a thumbnail of the sprite's or stage's default "Turtle" costume.
*/

// TurtleIconMorph inherits from ToggleButtonMorph (Widgets)
// ... and copies methods from SpriteIconMorph

TurtleIconMorph.prototype = new ToggleButtonMorph();
TurtleIconMorph.prototype.constructor = TurtleIconMorph;
TurtleIconMorph.uber = ToggleButtonMorph.prototype;

// TurtleIconMorph settings

TurtleIconMorph.prototype.thumbSize = new Point(80, 60);
TurtleIconMorph.prototype.labelShadowOffset = null;
TurtleIconMorph.prototype.labelShadowColor = null;
TurtleIconMorph.prototype.labelColor = new Color(255, 255, 255);
TurtleIconMorph.prototype.fontSize = 9;

// TurtleIconMorph instance creation:

function TurtleIconMorph(aSpriteOrStage, aTemplate) {
    this.init(aSpriteOrStage, aTemplate);
}

TurtleIconMorph.prototype.init = function (aSpriteOrStage, aTemplate) {
    var colors, action, query, myself = this;

    if (!aTemplate) {
        colors = [
            IDE_Morph.prototype.groupColor,
            IDE_Morph.prototype.frameColor,
            IDE_Morph.prototype.frameColor
        ];

    }

    action = function () {
        // make my costume the current one
        var ide = myself.parentThatIsA(IDE_Morph),
            wardrobe = myself.parentThatIsA(WardrobeMorph);

        if (ide) {
            ide.currentSprite.wearCostume(null);
        }
        if (wardrobe) {
            wardrobe.updateSelection();
        }
    };

    query = function () {
        // answer true if my costume is the current one
        var ide = myself.parentThatIsA(IDE_Morph);

        if (ide) {
            return ide.currentSprite.costume === null;
        }
        return false;
    };

    // additional properties:
    this.object = aSpriteOrStage; // mandatory, actually
    this.version = this.object.version;
    this.thumbnail = null;

    // initialize inherited properties:
    TurtleIconMorph.uber.init.call(
        this,
        colors, // color overrides, <array>: [normal, highlight, pressed]
        null, // target - not needed here
        action, // a toggle function
        'default', // label string
        query, // predicate/selector
        null, // environment
        null, // hint
        aTemplate // optional, for cached background images
    );

    // override defaults and build additional components
    this.isDraggable = false;
    this.createThumbnail();
    this.padding = 2;
    this.corner = 8;
    this.fixLayout();
};

TurtleIconMorph.prototype.createThumbnail = function () {
    var isFlat = MorphicPreferences.isFlat;

    if (this.thumbnail) {
        this.thumbnail.destroy();
    }
    if (this.object instanceof SpriteMorph) {
        this.thumbnail = new SymbolMorph(
            'turtle',
            this.thumbSize.y,
            this.labelColor,
            isFlat ? null : new Point(-1, -1),
            new Color(0, 0, 0)
        );
    } else {
        this.thumbnail = new SymbolMorph(
            'stage',
            this.thumbSize.y,
            this.labelColor,
            isFlat ? null : new Point(-1, -1),
            new Color(0, 0, 0)
        );
    }
    this.add(this.thumbnail);
};

TurtleIconMorph.prototype.createLabel = function () {
    var txt;

    if (this.label) {
        this.label.destroy();
    }
    txt = new StringMorph(
        localize(
            this.object instanceof SpriteMorph ? 'Turtle' : 'Empty'
        ),
        this.fontSize,
        this.fontStyle,
        true,
        false,
        false,
        this.labelShadowOffset,
        this.labelShadowColor,
        this.labelColor
    );

    this.label = new FrameMorph();
    this.label.acceptsDrops = false;
    this.label.alpha = 0;
    this.label.setExtent(txt.extent());
    txt.setPosition(this.label.position());
    this.label.add(txt);
    this.add(this.label);
};

// TurtleIconMorph layout

TurtleIconMorph.prototype.fixLayout
    = SpriteIconMorph.prototype.fixLayout;

// TurtleIconMorph drawing

TurtleIconMorph.prototype.createBackgrounds
    = SpriteIconMorph.prototype.createBackgrounds;

// TurtleIconMorph user menu

TurtleIconMorph.prototype.userMenu = function () {
    var myself = this,
        menu = new MenuMorph(this, 'pen'),
        on = '\u25CF',
        off = '\u25CB';
    if (this.object instanceof StageMorph) {
        return null;
    }
    menu.addItem(
        (this.object.penPoint === 'tip' ? on : off) + ' ' + localize('tip'),
        function () {
            myself.object.penPoint = 'tip';
            myself.object.changed();
            myself.object.drawNew();
            myself.object.changed();
        }
    );
    menu.addItem(
        (this.object.penPoint === 'middle' ? on : off) + ' ' + localize(
            'middle'
        ),
        function () {
            myself.object.penPoint = 'middle';
            myself.object.changed();
            myself.object.drawNew();
            myself.object.changed();
        }
    );
    return menu;
};

// WardrobeMorph ///////////////////////////////////////////////////////

// I am a watcher on a sprite's costume list

// WardrobeMorph inherits from ScrollFrameMorph

WardrobeMorph.prototype = new ScrollFrameMorph();
WardrobeMorph.prototype.constructor = WardrobeMorph;
WardrobeMorph.uber = ScrollFrameMorph.prototype;

// WardrobeMorph settings

// ... to follow ...

// WardrobeMorph instance creation:

function WardrobeMorph(aSprite, sliderColor) {
    this.init(aSprite, sliderColor);
}

WardrobeMorph.prototype.init = function (aSprite, sliderColor) {
    // additional properties
    this.sprite = aSprite || new SpriteMorph();
    this.costumesVersion = null;
    this.spriteVersion = null;

    // initialize inherited properties
    WardrobeMorph.uber.init.call(this, null, null, sliderColor);

    // configure inherited properties
    this.fps = 2;
    this.updateList();
};

// Wardrobe updating

WardrobeMorph.prototype.updateList = function () {
    var myself = this,
        x = this.left() + 5,
        y = this.top() + 5,
        padding = 4,
        toolsPadding = 5,
        oldFlag = Morph.prototype.trackChanges,
        oldPos = this.contents.position(),
        icon,
        template,
        txt,
        paintbutton,
        cambutton;

    this.changed();
    oldFlag = Morph.prototype.trackChanges;
    Morph.prototype.trackChanges = false;

    this.contents.destroy();
    this.contents = new FrameMorph(this);
    this.contents.acceptsDrops = false;
    this.contents.reactToDropOf = function (icon) {
        myself.reactToDropOf(icon);
    };
    this.addBack(this.contents);

    icon = new TurtleIconMorph(this.sprite);
    icon.setPosition(new Point(x, y));
    myself.addContents(icon);
    y = icon.bottom() + padding;

    paintbutton = new PushButtonMorph(
        this,
        "paintNew",
        new SymbolMorph("brush", 15)
    );
    paintbutton.padding = 0;
    paintbutton.corner = 12;
    paintbutton.color = IDE_Morph.prototype.groupColor;
    paintbutton.highlightColor = IDE_Morph.prototype.frameColor.darker(50);
    paintbutton.pressColor = paintbutton.highlightColor;
    paintbutton.labelMinExtent = new Point(36, 18);
    paintbutton.labelShadowOffset = new Point(-1, -1);
    paintbutton.labelShadowColor = paintbutton.highlightColor;
    paintbutton.labelColor = TurtleIconMorph.prototype.labelColor;
    paintbutton.contrast = this.buttonContrast;
    paintbutton.drawNew();
    paintbutton.hint = "Paint a new costume";
    paintbutton.setPosition(new Point(x, y));
    paintbutton.fixLayout();
    paintbutton.setCenter(icon.center());
    paintbutton.setLeft(icon.right() + padding * 4);

    this.addContents(paintbutton);

    if (CamSnapshotDialogMorph.prototype.enableCamera) {
        cambutton = new PushButtonMorph(
            this,
            "newFromCam",
            new SymbolMorph("camera", 15)
            );
        cambutton.padding = 0;
        cambutton.corner = 12;
        cambutton.color = IDE_Morph.prototype.groupColor;
        cambutton.highlightColor = IDE_Morph.prototype.frameColor.darker(50);
        cambutton.pressColor = paintbutton.highlightColor;
        cambutton.labelMinExtent = new Point(36, 18);
        cambutton.labelShadowOffset = new Point(-1, -1);
        cambutton.labelShadowColor = paintbutton.highlightColor;
        cambutton.labelColor = TurtleIconMorph.prototype.labelColor;
        cambutton.contrast = this.buttonContrast;
        cambutton.drawNew();
        cambutton.hint = "Import a new costume from your webcam";
        cambutton.setPosition(new Point(x, y));
        cambutton.fixLayout();
        cambutton.setCenter(paintbutton.center());
        cambutton.setLeft(paintbutton.right() + toolsPadding);

        this.addContents(cambutton);

        if (!CamSnapshotDialogMorph.prototype.enabled) {
            cambutton.disable();
            cambutton.hint =
            	CamSnapshotDialogMorph.prototype.notSupportedMessage;
        }

        document.addEventListener(
            'cameraDisabled',
            function () {
                cambutton.disable();
                cambutton.hint =
                    CamSnapshotDialogMorph.prototype.notSupportedMessage;
            }
        );
    }

    txt = new TextMorph(localize(
        "costumes tab help" // look up long string in translator
    ));
    txt.fontSize = 9;
    txt.setColor(SpriteMorph.prototype.paletteTextColor);

    txt.setPosition(new Point(x, y));
    this.addContents(txt);
    y = txt.bottom() + padding;

    this.sprite.costumes.asArray().forEach(function (costume) {
        template = icon = new CostumeIconMorph(costume, template);
        icon.setPosition(new Point(x, y));
        myself.addContents(icon);
        y = icon.bottom() + padding;
    });
    this.costumesVersion = this.sprite.costumes.lastChanged;

    this.contents.setPosition(oldPos);
    this.adjustScrollBars();
    Morph.prototype.trackChanges = oldFlag;
    this.changed();

    this.updateSelection();
};

WardrobeMorph.prototype.updateSelection = function () {
    this.contents.children.forEach(function (morph) {
        if (morph.refresh) {morph.refresh(); }
    });
    this.spriteVersion = this.sprite.version;
};

// Wardrobe stepping

WardrobeMorph.prototype.step = function () {
    if (this.costumesVersion !== this.sprite.costumes.lastChanged) {
        this.updateList();
    }
    if (this.spriteVersion !== this.sprite.version) {
        this.updateSelection();
    }
};

// Wardrobe ops

WardrobeMorph.prototype.removeCostumeAt = function (idx) {
    this.sprite.shadowAttribute('costumes');
    this.sprite.costumes.remove(idx);
    this.updateList();
};

WardrobeMorph.prototype.paintNew = function () {
    var cos = new Costume(
            newCanvas(null, true),
            this.sprite.newCostumeName(localize('Untitled'))
        ),
        ide = this.parentThatIsA(IDE_Morph),
        myself = this;
    cos.edit(this.world(), ide, true, null, function () {
        myself.sprite.shadowAttribute('costumes');
        myself.sprite.addCostume(cos);
        myself.updateList();
        if (ide) {
            ide.currentSprite.wearCostume(cos);
        }
    });
};

WardrobeMorph.prototype.newFromCam = function () {
    var camDialog,
        ide = this.parentThatIsA(IDE_Morph),
        myself = this,
        sprite = this.sprite;

    camDialog = new CamSnapshotDialogMorph(
        ide,
        sprite,
        nop,
        function (costume) {
            sprite.addCostume(costume);
            sprite.wearCostume(costume);
            myself.updateList();
        });

    camDialog.key = 'camera';
    camDialog.popUp(this.world());
};

// Wardrobe drag & drop

WardrobeMorph.prototype.wantsDropOf = function (morph) {
    return morph instanceof CostumeIconMorph;
};

WardrobeMorph.prototype.reactToDropOf = function (icon) {
    var idx = 0,
        costume = icon.object,
        top = icon.top();
    icon.destroy();
    this.contents.children.forEach(function (item) {
        if (item instanceof CostumeIconMorph && item.top() < top - 4) {
            idx += 1;
        }
    });
    this.sprite.shadowAttribute('costumes');
    this.sprite.costumes.add(costume, idx + 1);
    this.updateList();
    icon.mouseClickLeft(); // select
};

// SoundIconMorph ///////////////////////////////////////////////////////

/*
    I am an element in the SpriteEditor's "Sounds" tab.
*/

// SoundIconMorph inherits from ToggleButtonMorph (Widgets)
// ... and copies methods from SpriteIconMorph

SoundIconMorph.prototype = new ToggleButtonMorph();
SoundIconMorph.prototype.constructor = SoundIconMorph;
SoundIconMorph.uber = ToggleButtonMorph.prototype;

// SoundIconMorph settings

SoundIconMorph.prototype.thumbSize = new Point(80, 60);
SoundIconMorph.prototype.labelShadowOffset = null;
SoundIconMorph.prototype.labelShadowColor = null;
SoundIconMorph.prototype.labelColor = new Color(255, 255, 255);
SoundIconMorph.prototype.fontSize = 9;

// SoundIconMorph instance creation:

function SoundIconMorph(aSound, aTemplate) {
    this.init(aSound, aTemplate);
}

SoundIconMorph.prototype.init = function (aSound, aTemplate) {
    var colors, action, query;

    if (!aTemplate) {
        colors = [
            IDE_Morph.prototype.groupColor,
            IDE_Morph.prototype.frameColor,
            IDE_Morph.prototype.frameColor
        ];

    }

    action = function () {
        nop(); // When I am selected (which is never the case for sounds)
    };

    query = function () {
        return false;
    };

    // additional properties:
    this.object = aSound; // mandatory, actually
    this.version = this.object.version;
    this.thumbnail = null;

    // initialize inherited properties:
    SoundIconMorph.uber.init.call(
        this,
        colors, // color overrides, <array>: [normal, highlight, pressed]
        null, // target - not needed here
        action, // a toggle function
        this.object.name, // label string
        query, // predicate/selector
        null, // environment
        null, // hint
        aTemplate // optional, for cached background images
    );

    // override defaults and build additional components
    this.isDraggable = true;
    this.createThumbnail();
    this.padding = 2;
    this.corner = 8;
    this.fixLayout();
    this.fps = 1;
};

SoundIconMorph.prototype.createThumbnail = function () {
    var label;
    if (this.thumbnail) {
        this.thumbnail.destroy();
    }
    this.thumbnail = new Morph();
    this.thumbnail.setExtent(this.thumbSize);
    this.add(this.thumbnail);
    label = new StringMorph(
        this.createInfo(),
        '16',
        '',
        true,
        false,
        false,
        this.labelShadowOffset,
        this.labelShadowColor,
        new Color(200, 200, 200)
    );
    this.thumbnail.add(label);
    label.setCenter(new Point(40, 15));

    this.button = new PushButtonMorph(
        this,
        'toggleAudioPlaying',
        (this.object.previewAudio ? 'Stop' : 'Play')
    );
    this.button.drawNew();
    this.button.hint = 'Play sound';
    this.button.fixLayout();
    this.thumbnail.add(this.button);
    this.button.setCenter(new Point(40, 40));
};

SoundIconMorph.prototype.createInfo = function () {
    var dur = Math.round(this.object.audio.duration || 0),
        mod = dur % 60;
    return Math.floor(dur / 60).toString()
            + ":"
            + (mod < 10 ? "0" : "")
            + mod.toString();
};

SoundIconMorph.prototype.toggleAudioPlaying = function () {
    var myself = this;
    if (!this.object.previewAudio) {
        //Audio is not playing
        this.button.labelString = 'Stop';
        this.button.hint = 'Stop sound';
        this.object.previewAudio = this.object.play();
        this.object.previewAudio.addEventListener('ended', function () {
            myself.audioHasEnded();
        }, false);
    } else {
        //Audio is currently playing
        this.button.labelString = 'Play';
        this.button.hint = 'Play sound';
        this.object.previewAudio.pause();
        this.object.previewAudio.terminated = true;
        this.object.previewAudio = null;
    }
    this.button.createLabel();
};

SoundIconMorph.prototype.audioHasEnded = function () {
    this.button.trigger();
    this.button.mouseLeave();
};

SoundIconMorph.prototype.createLabel
    = SpriteIconMorph.prototype.createLabel;

// SoundIconMorph stepping

/*
SoundIconMorph.prototype.step
    = SpriteIconMorph.prototype.step;
*/

// SoundIconMorph layout

SoundIconMorph.prototype.fixLayout
    = SpriteIconMorph.prototype.fixLayout;

// SoundIconMorph menu

SoundIconMorph.prototype.userMenu = function () {
    var menu = new MenuMorph(this);
    if (!(this.object instanceof Sound)) { return null; }
    menu.addItem('rename', 'renameSound');
    menu.addItem('delete', 'removeSound');
    menu.addLine();
    menu.addItem('export', 'exportSound');
    return menu;
};


SoundIconMorph.prototype.renameSound = function () {
    var sound = this.object,
        ide = this.parentThatIsA(IDE_Morph),
        myself = this;
    this.disinherit();
    (new DialogBoxMorph(
        null,
        function (answer) {
            if (answer && (answer !== sound.name)) {
                sound.name = answer;
                sound.version = Date.now();
                myself.createLabel(); // can be omitted once I'm stepping
                myself.fixLayout(); // can be omitted once I'm stepping
                ide.hasChangedMedia = true;
            }
        }
    )).prompt(
        'rename sound',
        sound.name,
        this.world()
    );
};

SoundIconMorph.prototype.removeSound = function () {
    var jukebox = this.parentThatIsA(JukeboxMorph),
        idx = this.parent.children.indexOf(this) - 1;
    jukebox.removeSound(idx);
};

SoundIconMorph.prototype.exportSound = function () {
    var ide = this.parentThatIsA(IDE_Morph);
    ide.saveAudioAs(this.object.audio, this.object.name);
};

SoundIconMorph.prototype.createBackgrounds
    = SpriteIconMorph.prototype.createBackgrounds;

SoundIconMorph.prototype.createLabel
    = SpriteIconMorph.prototype.createLabel;

// SoundIconMorph inheritance

SoundIconMorph.prototype.disinherit = function () {
    var jukebox = this.parentThatIsA(JukeboxMorph),
        idx = this.parent.children.indexOf(this);
    if (jukebox.sprite.inheritsAttribute('sounds')) {
        jukebox.sprite.shadowAttribute('sounds');
        this.object = jukebox.sprite.sounds.at(idx - 1);
    }
};

// SoundIconMorph drag & drop

SoundIconMorph.prototype.prepareToBeGrabbed = function () {
    this.disinherit();
    this.removeSound();
};

// JukeboxMorph /////////////////////////////////////////////////////

/*
    I am JukeboxMorph, like WardrobeMorph, but for sounds
*/

// JukeboxMorph instance creation

JukeboxMorph.prototype = new ScrollFrameMorph();
JukeboxMorph.prototype.constructor = JukeboxMorph;
JukeboxMorph.uber = ScrollFrameMorph.prototype;

function JukeboxMorph(aSprite, sliderColor) {
    this.init(aSprite, sliderColor);
}

JukeboxMorph.prototype.init = function (aSprite, sliderColor) {
    // additional properties
    this.sprite = aSprite || new SpriteMorph();
    this.soundsVersion = null;
    this.spriteVersion = null;

    // initialize inherited properties
    JukeboxMorph.uber.init.call(this, null, null, sliderColor);

    // configure inherited properties
    this.acceptsDrops = false;
    this.fps = 2;
    this.updateList();
};

// Jukebox updating

JukeboxMorph.prototype.updateList = function () {
    var myself = this,
        x = this.left() + 5,
        y = this.top() + 5,
        padding = 4,
        oldFlag = Morph.prototype.trackChanges,
        icon,
        template,
        txt,
        ide = this.sprite.parentThatIsA(IDE_Morph),
        recordButton;

    this.changed();
    oldFlag = Morph.prototype.trackChanges;
    Morph.prototype.trackChanges = false;

    this.contents.destroy();
    this.contents = new FrameMorph(this);
    this.contents.acceptsDrops = false;
    this.contents.reactToDropOf = function (icon) {
        myself.reactToDropOf(icon);
    };
    this.addBack(this.contents);

    txt = new TextMorph(localize(
        'import a sound from your computer\nby dragging it into here'
    ));
    txt.fontSize = 9;
    txt.setColor(SpriteMorph.prototype.paletteTextColor);
    txt.setPosition(new Point(x, y));
    this.addContents(txt);

    recordButton = new PushButtonMorph(
        ide,
        'recordNewSound',
        new SymbolMorph('circleSolid', 15)
    );
    recordButton.padding = 0;
    recordButton.corner = 12;
    recordButton.color = IDE_Morph.prototype.groupColor;
    recordButton.highlightColor = IDE_Morph.prototype.frameColor.darker(50);
    recordButton.pressColor = recordButton.highlightColor;
    recordButton.labelMinExtent = new Point(36, 18);
    recordButton.labelShadowOffset = new Point(-1, -1);
    recordButton.labelShadowColor = recordButton.highlightColor;
    recordButton.labelColor = TurtleIconMorph.prototype.labelColor;
    recordButton.contrast = this.buttonContrast;
    recordButton.drawNew();
    recordButton.hint = 'Record a new sound';
    recordButton.fixLayout();
    recordButton.label.setColor(new Color(255, 20, 20));
    recordButton.setPosition(txt.bottomLeft().add(new Point(0, padding * 2)));

    this.addContents(recordButton);

    y = recordButton.bottom() + padding;

    this.sprite.sounds.asArray().forEach(function (sound) {
        template = icon = new SoundIconMorph(sound, template);
        icon.setPosition(new Point(x, y));
        myself.addContents(icon);
        y = icon.bottom() + padding;
    });
    this.soundsVersion = this.sprite.sounds.lastChanged;

    Morph.prototype.trackChanges = oldFlag;
    this.changed();

    this.updateSelection();
};

JukeboxMorph.prototype.updateSelection = function () {
    this.contents.children.forEach(function (morph) {
        if (morph.refresh) {morph.refresh(); }
    });
    this.spriteVersion = this.sprite.version;
};

// Jukebox stepping

JukeboxMorph.prototype.step = function () {
    if (this.soundsVersion !== this.sprite.sounds.lastChanged) {
        this.updateList();
    }
    if (this.spriteVersion !== this.sprite.version) {
        this.updateSelection();
    }
};

// Jukebox ops

JukeboxMorph.prototype.removeSound = function (idx) {
    this.sprite.sounds.remove(idx);
    this.updateList();
};

// Jukebox drag & drop

JukeboxMorph.prototype.wantsDropOf = function (morph) {
    return morph instanceof SoundIconMorph;
};

JukeboxMorph.prototype.reactToDropOf = function (icon) {
    var idx = 0,
        costume = icon.object,
        top = icon.top();

    icon.destroy();
    this.contents.children.forEach(function (item) {
        if (item instanceof SoundIconMorph && item.top() < top - 4) {
            idx += 1;
        }
    });

    this.sprite.shadowAttribute('sounds');
    this.sprite.sounds.add(costume, idx + 1);
    this.updateList();
};

// StageHandleMorph ////////////////////////////////////////////////////////

// I am a horizontal resizing handle for a StageMorph

// StageHandleMorph inherits from Morph:

StageHandleMorph.prototype = new Morph();
StageHandleMorph.prototype.constructor = StageHandleMorph;
StageHandleMorph.uber = Morph.prototype;

// StageHandleMorph instance creation:

function StageHandleMorph(target) {
    this.init(target);
}

StageHandleMorph.prototype.init = function (target) {
    this.target = target || null;
    HandleMorph.uber.init.call(this);
    this.color = MorphicPreferences.isFlat ?
            IDE_Morph.prototype.groupColor : new Color(190, 190, 190);
    this.isDraggable = false;
    this.noticesTransparentClick = true;
    this.setExtent(new Point(12, 50));
};

// StageHandleMorph drawing:

StageHandleMorph.prototype.drawNew = function () {
    this.normalImage = newCanvas(this.extent());
    this.highlightImage = newCanvas(this.extent());
    this.drawOnCanvas(
        this.normalImage,
        this.color
    );
    this.drawOnCanvas(
        this.highlightImage,
        MorphicPreferences.isFlat ?
                new Color(245, 245, 255) : new Color(100, 100, 255),
        this.color
    );
    this.image = this.normalImage;
    this.fixLayout();
};

StageHandleMorph.prototype.drawOnCanvas = function (
    aCanvas,
    color,
    shadowColor
) {
    var context = aCanvas.getContext('2d'),
        l = aCanvas.height / 8,
        w = aCanvas.width / 6,
        r = w / 2,
        x,
        y,
        i;

    context.lineWidth = w;
    context.lineCap = 'round';
    y = aCanvas.height / 2;

    context.strokeStyle = color.toString();
    x = aCanvas.width / 12;
    for (i = 0; i < 3; i += 1) {
        if (i > 0) {
            context.beginPath();
            context.moveTo(x, y - (l - r));
            context.lineTo(x, y + (l - r));
            context.stroke();
        }
        x += (w * 2);
        l *= 2;
    }
    if (shadowColor) {
        context.strokeStyle = shadowColor.toString();
        x = aCanvas.width / 12 + w;
        l = aCanvas.height / 8;
        for (i = 0; i < 3; i += 1) {
            if (i > 0) {
                context.beginPath();
                context.moveTo(x, y - (l - r));
                context.lineTo(x, y + (l - r));
                context.stroke();
            }
            x += (w * 2);
            l *= 2;
        }
    }
};

// StageHandleMorph layout:

StageHandleMorph.prototype.fixLayout = function () {
    if (!this.target) {return; }
    var ide = this.target.parentThatIsA(IDE_Morph);
    this.setTop(this.target.top() + 10);
    this.setRight(this.target.left());
    if (ide) {ide.add(this); } // come to front
};

// StageHandleMorph stepping:

StageHandleMorph.prototype.step = null;

StageHandleMorph.prototype.mouseDownLeft = function (pos) {
    var world = this.world(),
        offset = this.right() - pos.x,
        myself = this,
        ide = this.target.parentThatIsA(IDE_Morph);

    if (!this.target) {
        return null;
    }
    ide.isSmallStage = true;
    ide.controlBar.stageSizeButton.refresh();
    this.step = function () {
        var newPos, newWidth;
        if (world.hand.mouseButton) {
            newPos = world.hand.bounds.origin.x + offset;
            newWidth = myself.target.right() - newPos;
            ide.stageRatio = newWidth / myself.target.dimensions.x;
            ide.setExtent(world.extent());

        } else {
            this.step = null;
            ide.isSmallStage = (ide.stageRatio !== 1);
            ide.controlBar.stageSizeButton.refresh();
        }
    };
};

// StageHandleMorph events:

StageHandleMorph.prototype.mouseEnter = function () {
    this.image = this.highlightImage;
    this.changed();
};

StageHandleMorph.prototype.mouseLeave = function () {
    this.image = this.normalImage;
    this.changed();
};

StageHandleMorph.prototype.mouseDoubleClick = function () {
    this.target.parentThatIsA(IDE_Morph).toggleStageSize(true, 1);
};

// PaletteHandleMorph ////////////////////////////////////////////////////////

// I am a horizontal resizing handle for a blocks palette
// I pseudo-inherit many things from StageHandleMorph

// PaletteHandleMorph inherits from Morph:

PaletteHandleMorph.prototype = new Morph();
PaletteHandleMorph.prototype.constructor = PaletteHandleMorph;
PaletteHandleMorph.uber = Morph.prototype;

// PaletteHandleMorph instance creation:

function PaletteHandleMorph(target) {
    this.init(target);
}

PaletteHandleMorph.prototype.init = function (target) {
    this.target = target || null;
    HandleMorph.uber.init.call(this);
    this.color = MorphicPreferences.isFlat ?
            new Color(255, 255, 255) : new Color(190, 190, 190);
    this.isDraggable = false;
    this.noticesTransparentClick = true;
    this.setExtent(new Point(12, 50));
};

// PaletteHandleMorph drawing:

PaletteHandleMorph.prototype.drawNew =
    StageHandleMorph.prototype.drawNew;

PaletteHandleMorph.prototype.drawOnCanvas =
    StageHandleMorph.prototype.drawOnCanvas;

// PaletteHandleMorph layout:

PaletteHandleMorph.prototype.fixLayout = function () {
    if (!this.target) {return; }
    var ide = this.target.parentThatIsA(IDE_Morph);
    this.setTop(this.target.top() + 10);
    this.setRight(this.target.right());
    if (ide) {ide.add(this); } // come to front
};

// PaletteHandleMorph stepping:

PaletteHandleMorph.prototype.step = null;

PaletteHandleMorph.prototype.mouseDownLeft = function (pos) {
    var world = this.world(),
        offset = this.right() - pos.x,
        ide = this.target.parentThatIsA(IDE_Morph);

    if (!this.target) {
        return null;
    }
    this.step = function () {
        var newPos;
        if (world.hand.mouseButton) {
            newPos = world.hand.bounds.origin.x + offset;
            ide.paletteWidth = Math.min(
                Math.max(200, newPos),
                ide.stageHandle.left() - ide.spriteBar.tabBar.width()
            );
            ide.setExtent(world.extent());

        } else {
            this.step = null;
        }
    };
};

// PaletteHandleMorph events:

PaletteHandleMorph.prototype.mouseEnter
    = StageHandleMorph.prototype.mouseEnter;

PaletteHandleMorph.prototype.mouseLeave
    = StageHandleMorph.prototype.mouseLeave;

PaletteHandleMorph.prototype.mouseDoubleClick = function () {
    this.target.parentThatIsA(IDE_Morph).setPaletteWidth(200);
};

// CamSnapshotDialogMorph ////////////////////////////////////////////////////

/*
    I am a dialog morph that lets users take a snapshot using their webcam
    and use it as a costume for their sprites or a background for the Stage.

    NOTE: Currently disabled because of issues with experimental technology
    in Safari.
*/

// CamSnapshotDialogMorph inherits from DialogBoxMorph:

CamSnapshotDialogMorph.prototype = new DialogBoxMorph();
CamSnapshotDialogMorph.prototype.constructor = CamSnapshotDialogMorph;
CamSnapshotDialogMorph.uber = DialogBoxMorph.prototype;

// CamSnapshotDialogMorph settings

CamSnapshotDialogMorph.prototype.enableCamera = true; // off while experimental
CamSnapshotDialogMorph.prototype.enabled = true;

CamSnapshotDialogMorph.prototype.notSupportedMessage =
	'Please make sure your web browser is up to date\n' +
	'and your camera is properly configured. \n\n' +
	'Some browsers also require you to access Snap!\n' +
	'through HTTPS to use the camera.\n\n' +
    'Plase replace the "http://" part of the address\n' +
    'in your browser by "https://" and try again.';

// CamSnapshotDialogMorph instance creation

function CamSnapshotDialogMorph(ide, sprite, onCancel, onAccept) {
    this.init(ide, sprite, onCancel, onAccept);
}

CamSnapshotDialogMorph.prototype.init = function (
    ide,
    sprite,
    onCancel,
	onAccept
) {
    this.ide = ide;
    this.sprite = sprite;
    this.padding = 10;
    this.oncancel = onCancel;
    this.accept = onAccept;
    this.videoElement = null; // an HTML5 video element
    this.videoView = new Morph(); // a morph where we'll copy the video contents

    CamSnapshotDialogMorph.uber.init.call(this);
    this.labelString = 'Camera';
    this.createLabel();
    this.buildContents();
};

CamSnapshotDialogMorph.prototype.buildContents = function () {
    var myself = this,
        stage = this.sprite.parentThatIsA(StageMorph);

	function noCameraSupport() {
        myself.disable();
        myself.ide.inform(
            'Camera not supported',
            CamSnapshotDialogMorph.prototype.notSupportedMessage
        );
        if (myself.videoElement) {
        	myself.videoElement.remove();
        }
        myself.cancel();
	}

    this.videoElement = document.createElement('video');
    this.videoElement.hidden = true;
    this.videoElement.width = stage.dimensions.x;
    this.videoElement.height = stage.dimensions.y;

    document.body.appendChild(this.videoElement);

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                myself.videoElement.srcObject = stream;
                myself.videoElement.play().catch(noCameraSupport);
                myself.videoElement.stream = stream;
            })
            .catch(noCameraSupport);
    }

    this.videoView.setExtent(stage.dimensions);
    this.videoView.image = newCanvas(stage.dimensions);

    this.videoView.drawOn = function (aCanvas) {
        var context = aCanvas.getContext('2d'),
            videoWidth = myself.videoElement.videoWidth,
            videoHeight = myself.videoElement.videoHeight,
            w = stage.dimensions.x,
            h = stage.dimensions.y,
            clippingWidth, clippingHeight;

        if (!videoWidth) { return; }

        context.save();

        // Flip the image so it looks like a mirror
        context.translate(w, 0);
        context.scale(-1, 1);

        if (videoWidth / w > videoHeight / h) {
            // preserve height, crop width
            clippingWidth = w * (videoHeight / h);
            clippingHeight = videoHeight;
        } else {
            // preserve width, crop height
            clippingWidth = videoWidth;
            clippingHeight = h * (videoWidth / w);
        }

        context.drawImage(
            myself.videoElement,
            0,
            0,
            clippingWidth,
            clippingHeight,
            this.left() * -1,
            this.top(),
            w,
            h
            );

        context.restore();
    };

    this.videoView.step = function () {
        this.changed();
    };

    this.addBody(new AlignmentMorph('column', this.padding / 2));
    this.body.add(this.videoView);
    this.body.fixLayout();

    this.addButton('ok', 'Save');
    this.addButton('cancel', 'Cancel');

    this.fixLayout();
    this.drawNew();
};

CamSnapshotDialogMorph.prototype.ok = function () {
    this.accept(
        new Costume(
            this.videoView.fullImageClassic(),
            this.sprite.newCostumeName('camera')
        ).flipped()
    );
};

CamSnapshotDialogMorph.prototype.disable = function () {
    CamSnapshotDialogMorph.prototype.enabled = false;
    document.dispatchEvent(new Event('cameraDisabled'));
};

CamSnapshotDialogMorph.prototype.destroy = function () {
    this.oncancel.call(this);
    this.close();
};

CamSnapshotDialogMorph.prototype.close = function () {
    if (this.videoElement && this.videoElement.stream) {
        this.videoElement.stream.getTracks()[0].stop();
        this.videoElement.remove();
    }
    CamSnapshotDialogMorph.uber.destroy.call(this);
};

// SoundRecorderDialogMorph ////////////////////////////////////////////////////

/*
    I am a dialog morph that lets users record sound snippets for their
    sprites or Stage.
*/

// SoundRecorderDialogMorph inherits from DialogBoxMorph:

SoundRecorderDialogMorph.prototype = new DialogBoxMorph();
SoundRecorderDialogMorph.prototype.constructor = SoundRecorderDialogMorph;
SoundRecorderDialogMorph.uber = DialogBoxMorph.prototype;

// SoundRecorderDialogMorph instance creation

function SoundRecorderDialogMorph(onAccept) {
    this.init(onAccept);
}

SoundRecorderDialogMorph.prototype.init = function (onAccept) {
    var myself = this;
    this.padding = 10;
    this.accept = onAccept;

    this.mediaRecorder = null; // an HTML5 MediaRecorder object
    this.audioElement = document.createElement('audio');
    this.audioElement.hidden = true;
    this.audioElement.onended = function (event) {
        myself.stop();
    };
    document.body.appendChild(this.audioElement);

    this.recordButton = null;
    this.stopButton = null;
    this.playButton = null;
    this.progressBar = new BoxMorph();

    SoundRecorderDialogMorph.uber.init.call(this);
    this.labelString = 'Sound Recorder';
    this.createLabel();
    this.buildContents();
};

SoundRecorderDialogMorph.prototype.buildContents = function () {
    var myself = this,
        audioChunks = [];

    this.recordButton = new PushButtonMorph(
        this,
        'record',
        new SymbolMorph('circleSolid', 10)
    );
    this.recordButton.drawNew();
    this.recordButton.fixLayout();

    this.stopButton = new PushButtonMorph(
        this,
        'stop',
        new SymbolMorph('rectangleSolid', 10)
    );
    this.stopButton.drawNew();
    this.stopButton.fixLayout();

    this.playButton = new PushButtonMorph(
        this,
        'play',
        new SymbolMorph('pointRight', 10)
    );
    this.playButton.drawNew();
    this.playButton.fixLayout();

    this.buildProgressBar();

    this.addBody(new AlignmentMorph('row', this.padding));
    this.body.add(this.recordButton);
    this.body.add(this.stopButton);
    this.body.add(this.playButton);
    this.body.add(this.progressBar);

    this.body.fixLayout();

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function (stream) {
                myself.mediaRecorder = new MediaRecorder(stream);
                myself.mediaRecorder.ondataavailable = function (event) {
                    audioChunks.push(event.data);
                };
                myself.mediaRecorder.onstop = function (event) {
					var buffer = new Blob(audioChunks),
						reader = new window.FileReader();
					reader.readAsDataURL(buffer);
					reader.onloadend = function() {
   						var base64 = reader.result;
    					base64 = 'data:audio/ogg;base64,' +
         	               base64.split(',')[1];
						myself.audioElement.src = base64;
                    	myself.audioElement.load();
                    	audioChunks = [];
					};
                };
            });
    }

    this.addButton('ok', 'Save');
    this.addButton('cancel', 'Cancel');

    this.fixLayout();
    this.drawNew();
};

SoundRecorderDialogMorph.prototype.buildProgressBar = function () {
    var line = new Morph(),
        myself = this;

    this.progressBar.setExtent(new Point(150, 20));
    this.progressBar.setColor(new Color(200, 200, 200));
    this.progressBar.setBorderWidth(1);
    this.progressBar.setBorderColor(new Color(150, 150, 150));

    line.setExtent(new Point(130, 2));
    line.setColor(new Color(50, 50, 50));
    line.setCenter(this.progressBar.center());
    this.progressBar.add(line);

    this.progressBar.indicator = new Morph();
    this.progressBar.indicator.setExtent(new Point(5, 15));
    this.progressBar.indicator.setColor(new Color(50, 200, 50));
    this.progressBar.indicator.setCenter(line.leftCenter());

    this.progressBar.add(this.progressBar.indicator);

    this.progressBar.setPercentage = function (percentage) {
        this.indicator.setLeft(
            line.left() +
            (line.width() / 100 * percentage) -
            this.indicator.width() / 2
        );
    };

    this.progressBar.step = function () {
        if (myself.audioElement.duration) {
            this.setPercentage(
                myself.audioElement.currentTime /
                myself.audioElement.duration * 100);
        } else {
            this.setPercentage(0);
        }
    };
};

SoundRecorderDialogMorph.prototype.record = function () {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
        this.stop();
        return;
    }

    this.mediaRecorder.start();
    this.recordButton.label.setColor(new Color(255, 0, 0));
    this.playButton.label.setColor(new Color(0, 0, 0));
};

SoundRecorderDialogMorph.prototype.stop = function () {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
        this.mediaRecorder.stop();
    }

    this.audioElement.pause();
    this.audioElement.currentTime = 0;

    this.recordButton.label.setColor(new Color(0, 0, 0));
    this.playButton.label.setColor(new Color(0, 0, 0));
};

SoundRecorderDialogMorph.prototype.play = function () {
    this.stop();
    this.audioElement.oncanplaythrough = function () {
        this.play();
        this.oncanplaythrough = nop;
    };
    this.playButton.label.setColor(new Color(0, 255, 0));
};

SoundRecorderDialogMorph.prototype.ok = function () {
    var myself = this;
    this.stop();
    this.audioElement.oncanplaythrough = function () {
        if (this.duration && this.duration !== Infinity) {
            myself.accept(this);
            this.oncanplaythrough = nop;
            myself.destroy();
        } else {
            // For some reason, we need to play the sound
            // at least once to get its duration.
            myself.buttons.children.forEach(function (button) {
                button.disable();
            });
            this.play();
        }
    };

};

SoundRecorderDialogMorph.prototype.destroy = function () {
    this.stop();
    this.audioElement.remove();
    if (this.mediaRecorder) {
        this.mediaRecorder.stream.getTracks()[0].stop();
    }
    SoundRecorderDialogMorph.uber.destroy.call(this);
};
