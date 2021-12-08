/*

    gui.js

    a programming environment
    based on morphic.js, blocks.js, threads.js and objects.js
    inspired by Scratch

    written by Jens Mönig
    jens@moenig.org

    Copyright (C) 2020 by Jens Mönig

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
        SoundRecorderDialogMorph


    credits
    -------
    Nathan Dinsmore contributed saving and loading of projects,
    ypr-Snap! project conversion and countless bugfixes
    Ian Reynolds contributed handling and visualization of sounds
    Michael Ball contributed to the countless
    utilities to load libraries from relative urls
    Bernat Romagosa contributed more things than I can mention,
    including interfacing to the camera and microphone

*/

/*global modules, Morph, SpriteMorph, SyntaxElementMorph, Color, Cloud,
ListWatcherMorph, TextMorph, newCanvas, useBlurredShadows, VariableFrame, Sound,
StringMorph, Point, MenuMorph, morphicVersion, DialogBoxMorph, normalizeCanvas,
ToggleButtonMorph, contains, ScrollFrameMorph, StageMorph, PushButtonMorph, sb,
InputFieldMorph, FrameMorph, Process, nop, SnapSerializer, ListMorph, detect,
AlignmentMorph, TabMorph, Costume, MorphicPreferences, BlockMorph,
ToggleMorph, InputSlotDialogMorph, ScriptsMorph, isNil, SymbolMorph,
BlockExportDialogMorph, BlockImportDialogMorph, SnapTranslator, localize,
List, ArgMorph, SnapCloud, HandleMorph, SVG_Costume, LOGO_IMAGE
fontHeight, sb, CommentMorph, CommandBlockMorph, SnapActions, ExtensionRegistry
BlockLabelPlaceHolderMorph, SpeechBubbleMorph, ScriptFocusMorph,
XML_Element, WatcherMorph, BlockRemovalDialogMorph, saveAs, TableMorph,
isSnapObject, isRetinaEnabled, disableRetinaSupport, enableRetinaSupport,
isRetinaSupported, SliderMorph, utils, CloudError, NetsBloxExtensions
AlignmentMorph, TabMorph, Costume, MorphicPreferences,BlockMorph,
InputSlotDialogMorph, ScriptsMorph, isNil, SymbolMorph, fontHeight,  localize,
BlockExportDialogMorph, BlockImportDialogMorph, SnapTranslator, List, ArgMorph,
HandleMorph, SVG_Costume, TableDialogMorph, CommentMorph, saveAs,
CommandBlockMorph, BooleanSlotMorph, RingReporterSlotMorph, ScriptFocusMorph,
BlockLabelPlaceHolderMorph, SpeechBubbleMorph, XML_Element, WatcherMorph, WHITE,
BlockRemovalDialogMorph,TableMorph, isSnapObject, isRetinaEnabled, SliderMorph,
disableRetinaSupport, enableRetinaSupport, isRetinaSupported,
BoxMorph, BlockEditorMorph, BlockDialogMorph, Note, ZERO, BLACK,
SnapUndo, ReplayControls, Services, hex_sha512*/

// Global stuff ////////////////////////////////////////////////////////

modules.gui = '2020-August-08';

// Declarations

/*
var IDE_Morph;
var ProjectDialogMorph;
var LibraryDialogMorph;
var SpriteIconMorph;
var CostumeIconMorph;
var TurtleIconMorph;
var WardrobeMorph;
var SoundIconMorph;
var JukeboxMorph;
var StageHandleMorph;
var PaletteHandleMorph;
var CamSnapshotDialogMorph;
var SoundRecorderDialogMorph;
*/

var SERVER_URL = SERVER_URL || window.location.origin;
var SERVER_ADDRESS = SERVER_URL.replace(/^.*\/\//, '');
function ensureFullUrl(url) {
    // if it's not a full path attach serverURL to the front
    // regex is checking to see if the protocol is there (eg http://, ws://)
    if(url.match(/^\w+:\/\//) === null) {
        if (url.substring(0,1)[0] === '/') {
            url = SERVER_URL + url;
        } else {
            url = SERVER_URL + '/' + url;
        }
    }
    return url;
}

// IDE_Morph ///////////////////////////////////////////////////////////

// I am SNAP's top-level frame, the Editor window

// IDE_Morph inherits from Morph:

IDE_Morph.prototype = new Morph();
IDE_Morph.prototype.constructor = IDE_Morph;
IDE_Morph.uber = Morph.prototype;

// IDE_Morph preferences settings and skins

IDE_Morph.prototype.setDefaultDesign = function () {
    MorphicPreferences.isFlat = false;
    SpriteMorph.prototype.paletteColor = new Color(30, 30, 30);
    SpriteMorph.prototype.paletteTextColor = new Color(230, 230, 230);
    StageMorph.prototype.paletteTextColor
        = SpriteMorph.prototype.paletteTextColor;
    StageMorph.prototype.paletteColor = SpriteMorph.prototype.paletteColor;
    SpriteMorph.prototype.sliderColor
        = SpriteMorph.prototype.paletteColor.lighter(30);

    IDE_Morph.prototype.buttonContrast = 30;
    IDE_Morph.prototype.backgroundColor = new Color(10, 10, 10);
    IDE_Morph.prototype.frameColor = SpriteMorph.prototype.paletteColor;

    IDE_Morph.prototype.groupColor
        = SpriteMorph.prototype.paletteColor.lighter(5);
    IDE_Morph.prototype.sliderColor = SpriteMorph.prototype.sliderColor;
    IDE_Morph.prototype.buttonLabelColor = WHITE;
    IDE_Morph.prototype.tabColors = [
        IDE_Morph.prototype.groupColor.darker(50),
        IDE_Morph.prototype.groupColor.darker(25),
        IDE_Morph.prototype.groupColor
    ];
    IDE_Morph.prototype.rotationStyleColors = IDE_Morph.prototype.tabColors;
    IDE_Morph.prototype.appModeColor = BLACK;
    IDE_Morph.prototype.scriptsPaneTexture = this.scriptsTexture();
    IDE_Morph.prototype.padding = 1;

    SpriteIconMorph.prototype.labelColor
        = IDE_Morph.prototype.buttonLabelColor;
    CostumeIconMorph.prototype.labelColor
        = IDE_Morph.prototype.buttonLabelColor;
    SoundIconMorph.prototype.labelColor
        = IDE_Morph.prototype.buttonLabelColor;
    TurtleIconMorph.prototype.labelColor
        = IDE_Morph.prototype.buttonLabelColor;

    SyntaxElementMorph.prototype.contrast = 65;
    ScriptsMorph.prototype.feedbackColor = WHITE;
};

IDE_Morph.prototype.setFlatDesign = function () {
    MorphicPreferences.isFlat = true;
    SpriteMorph.prototype.paletteColor = WHITE;
    SpriteMorph.prototype.paletteTextColor = new Color(70, 70, 70);
    StageMorph.prototype.paletteTextColor
        = SpriteMorph.prototype.paletteTextColor;
    StageMorph.prototype.paletteColor = SpriteMorph.prototype.paletteColor;
    SpriteMorph.prototype.sliderColor = SpriteMorph.prototype.paletteColor;

    IDE_Morph.prototype.buttonContrast = 30;
    IDE_Morph.prototype.backgroundColor = new Color(220, 220, 230);
    IDE_Morph.prototype.frameColor = new Color(240, 240, 245);

    IDE_Morph.prototype.groupColor = WHITE;
    IDE_Morph.prototype.sliderColor = SpriteMorph.prototype.sliderColor;
    IDE_Morph.prototype.buttonLabelColor = new Color(70, 70, 70);
    IDE_Morph.prototype.tabColors = [
        IDE_Morph.prototype.frameColor,
        IDE_Morph.prototype.frameColor.lighter(50),
        IDE_Morph.prototype.groupColor
    ];
    IDE_Morph.prototype.rotationStyleColors = IDE_Morph.prototype.tabColors;
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

    SyntaxElementMorph.prototype.contrast = 25;
    ScriptsMorph.prototype.feedbackColor = new Color(153, 255, 213);
};

IDE_Morph.prototype.scriptsTexture = function () {
    var pic = newCanvas(new Point(100, 100)), // bigger scales faster
        ctx = pic.getContext('2d'),
        i;
    for (i = 0; i < 100; i += 4) {
        ctx.fillStyle = this.frameColor.toString();
        ctx.fillRect(i, 0, 1, 100);
        ctx.fillStyle = this.groupColor.lighter(2).toString();
        ctx.fillRect(i + 1, 0, 1, 100);
        ctx.fillRect(i + 3, 0, 1, 100);
        ctx.fillStyle = this.groupColor.darker(2).toString();
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
    this.allowMsgsWhileCollaborating = null;  // null is false but unset by user; "false" means user confirmed behavior.
    this.applySavedSettings();

    // additional properties:
    this.cloud = SnapCloud;
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

    // logoURL is disabled because the image data is hard-copied
    // to avoid tainting the world canvas
    // this.logoURL = this.resourceURL('src', 'snap_logo_sm.png');

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
    this.isReplayMode = false;
    this.preReplayUndoState = null;
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
    this.activeEditor = this;
    this.extensions = NetsBloxExtensions;
    this.events = new Events();

    this.hiddenCategories = [];
};

IDE_Morph.prototype.openIn = function (world) {
    var usr, myself = this, urlLanguage = null;

    this.projectName = 'myRole';

    // get persistent user data, if any
    if (localStorage) {
        usr = localStorage['-snap-user'];
        if (usr) {
            usr = SnapCloud.parseSnapResponse(usr)[0];
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
    SnapActions.configure(this);
    SnapActions.disableCollaboration();
    SnapUndo.reset();
    world.add(this);
    world.userMenu = this.userMenu;

    // override SnapCloud's user message with Morphic
    this.cloud.message = (string) => {
        var m = new MenuMorph(null, string),
            intervalHandle;
        m.popUpCenteredInWorld(world);
        intervalHandle = setInterval(() => {
            m.destroy();
            clearInterval(intervalHandle);
        }, 2000);
    };

    // prevent non-DialogBoxMorphs from being dropped
    // onto the World in user-mode
    world.reactToDropOf = (morph) => {
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

    // dynamic notifications from non-source text files
    // has some issues, commented out for now
    /*
    this.cloudMsg = getURL('http://snap.berkeley.edu/cloudmsg.txt');
    motd = getURL('http://snap.berkeley.edu/motd.txt');
    if (motd) {
        this.inform('Snap!', motd);
    }
    */

    if (this.userLanguage) {
        this.loadNewProject = true;
        this.setLanguage(this.userLanguage, this.onOpen);
    } else {
        this.onOpen();
    }
    this.extensions.initialize(this);
    this.initializeEmbeddedAPI();
    window.dispatchEvent(new CustomEvent("ideLoaded"));
};

IDE_Morph.prototype.onOpen = function () {
    var myself = this,
        onConnect = this.sockets.onConnect,
        hasUrlAnchors = location.href.indexOf('?') > -1 || location.hash,
        opened = false;

    if (hasUrlAnchors) {
        var m = new MenuMorph(null, 'Loading...'),
            maxWait = 750;

        m.popUpCenteredInWorld(this.world());

        // Currently, we wait until the ws connection is established before
        // opening a project. After removing dependency on the ws connection,
        // we should be able to remove this and open projects w/o any ws conn
        this.sockets.onConnect = function() {
            m.destroy();
            opened = true;
            myself.sockets.onConnect = onConnect;
            myself.interpretUrlAnchors();
            myself.sockets.onConnect();
            return;
        };

        setTimeout(function() {
            if (!opened) {  // Make sure it opens regardless
                m.destroy();
                myself.interpretUrlAnchors();
            }
        }, maxWait);

    } else {
        this.interpretUrlAnchors();
    }
};

IDE_Morph.prototype.interpretUrlAnchors = async function (loc) {
    var myself = this,
        urlLanguage,
        hash,
        dict,
        idx;

    loc = loc || location;
    function getURL(url) {
        try {
            return utils.getUrlSync(url);
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
            myself.world().worldCanvas.focus();
        }
    }

    dict = {};
    if (loc.href.indexOf('?') > -1) {
        var querystring = loc.href
            .replace(/^.*\?/, '')
            .replace('#' + loc.hash, '');

        dict = SnapCloud.parseDict(querystring);
    }

    if (loc.hash.substr(0, 6) === '#open:') {
        hash = loc.hash.substr(6);
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
            await this.droppedText(hash);
        } else {
            await this.droppedText(getURL(hash));
        }
    } else if (loc.hash.substr(0, 5) === '#run:') {
        hash = loc.hash.substr(5);
        idx = hash.indexOf("&");
        if (idx > 0) {
            hash = hash.slice(0, idx);
        }
        if (hash.charAt(0) === '%'
                || hash.search(/\%(?:[0-9a-f]{2})/i) > -1) {
            hash = decodeURIComponent(hash);
        }
        if (hash.substr(0, 8) === '<project>') {
            await SnapActions.openProject(hash);
        } else {
            await SnapActions.openProject(getURL(hash));
        }
        this.toggleAppMode(true);
        this.runScripts();
    } else if (loc.hash.substr(0, 9) === '#present:' || dict.action === 'present') {
        this.shield = new Morph();
        this.shield.color = this.color;
        this.shield.setExtent(this.parent.extent());
        this.parent.add(this.shield);
        myself.showMessage('Fetching project\nfrom the cloud...');

        if (loc.hash.substr(0, 9) === '#present:') {
            dict = SnapCloud.parseDict(loc.hash.substr(9));
        }

        try {
            const projectData = await SnapCloud.getPublicProject(SnapCloud.encodeDict(dict));
            const msg = myself.showMessage('Opening project...');
            await myself.droppedText(projectData);  // TODO: TEST THIS
            myself.hasChangedMedia = true;
            myself.shield.destroy();
            myself.shield = null;
            msg.destroy();
            applyFlags(dict);
        } catch (err) {
            this.cloudError()(err.message);
        }
    } else if (loc.hash.substr(0, 7) === '#cloud:') {
        this.shield = new Morph();
        this.shield.alpha = 0;
        this.shield.setExtent(this.parent.extent());
        this.parent.add(this.shield);
        myself.showMessage('Fetching project\nfrom the cloud...');

        // make sure to lowercase the username
        dict = SnapCloud.parseDict(loc.hash.substr(7));
        dict.Username = dict.Username.toLowerCase();

        try {
            const projectData = await SnapCloud.getPublicProject(SnapCloud.encodeDict(dict));
            const msg = this.showMessage(localize('Opening project...'));
            await SnapActions.openProject(projectData);
            this.hasChangedMedia = true;
            this.shield.destroy();
            this.shield = null;
            msg.destroy();
            this.toggleAppMode(false);
        } catch (err) {
            this.cloudError()(err.message);
        }
    } else if (loc.hash.substr(0, 4) === '#dl:') {
        let m = myself.showMessage('Fetching project\nfrom the cloud...');

        // make sure to lowercase the username
        dict = SnapCloud.parseDict(loc.hash.substr(4));
        dict.Username = dict.Username.toLowerCase();

        try {
            const projectData = await SnapCloud.getPublicProject(SnapCloud.encodeDict(dict));
            const blob = new Blob([projectData], {type: 'text/xml'});
            const url = URL.createObjectURL(blob);

            // Create temporary link for download
            const link = document.createElement("a");
            link.href = url;
            link.download = dict.ProjectName + ".xml";

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
            m.destroy();
        } catch (err) {
            this.cloudError()(err.message);
        }
    } else if (loc.hash.substr(0, 6) === '#lang:') {
        urlLanguage = loc.hash.substr(6);
        this.setLanguage(urlLanguage);
        this.loadNewProject = true;
    } else if (loc.hash.substr(0, 7) === '#signup') {
        this.createCloudAccount();
    } else if (loc.hash.substr(0, 12) === '#collaborate') {
        var sessionId = loc.hash.substr(13);
        // Get the session id and join it!
        SnapActions.enableCollaboration();
        SnapActions.joinSession(sessionId, this.cloudError());
    } else if (loc.hash.substr(0, 9) === '#example:' || dict.action === 'example') {
        const example = dict ? dict.ProjectName : loc.hash.substr(9);

        this.shield = new Morph();
        this.shield.alpha = 0;
        this.shield.setExtent(this.parent.extent());
        this.parent.add(this.shield);

        const projectData = this.getURL(myself.resourceURL('Examples', example));
        const msg = myself.showMessage('Opening ' + example + ' example...');
        await this.droppedText(projectData);
        myself.hasChangedMedia = true;
        this.shield.destroy();
        this.shield = null;
        msg.destroy();
        applyFlags(dict);
    } else if (loc.hash.substr(0, 9) === '#private:' || dict.action === 'private') {
        var name = dict ? dict.ProjectName : loc.hash.substr(9),
            isLoggedIn = SnapCloud.username !== null;

        if (!isLoggedIn) {
            myself.showMessage('You are not logged in. Cannot open ' + name);
            return;
        }

        const msg = myself.showMessage('Opening ' + name + ' example...');
        try {
            const xml = await SnapCloud.getProjectByName(SnapCloud.username, dict.ProjectName);
            await myself.rawLoadCloudProject(xml);
            applyFlags(dict);
        } catch (err) {
            this.cloudError()(err.message);
        }
        msg.destroy();

    } else if (loc.hash.substr(0, 7) === '#signup' || dict.action === 'signup') {
        this.createCloudAccount();
    } else {
        await myself.newProject();
    }

    this.world().keyboardFocus = this.stage;
    this.warnAboutIE();

    if (dict.extensions) {
        try {
            const extensionUrls = JSON.parse(decodeURIComponent(dict.extensions));
            extensionUrls.forEach(url => this.loadExtension(url));
        } catch (err) {
            this.inform(
                'Unable to load extensions',
                'The following error occurred while trying to load extensions:\n\n' +
                err.message + '\n\n' +
                'Perhaps the URL is malformed?'
            );
        }
    }

    if (dict.setVariable) {
        const [varName, value] = dict.setVariable.split('=');
        const exists = this.globalVariables.allNames().includes(varName);
        if (exists) {
            this.globalVariables.setVar(varName, value);
        } else {
            await this.droppedText(value, varName, 'text');
        }
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
    this.createReplayControls();
};

IDE_Morph.prototype.createLogo = function () {
    var myself = this;

    if (this.logo) {
        this.logo.destroy();
    }

    this.logo = new Morph();

    // the logo texture is not loaded dynamically as an image, but instead
    // hard-copied here to avoid tainting the world canvas. This lets us
    // use Snap's (and Morphic's) color pickers to sense any pixel which
    // otherwise would be compromised by annoying browser security.

    // this.logo.texture = this.logoURL; // original code, commented out
    this.logo.texture = LOGO_IMAGE;

    this.logo.render = function (ctx) {
        var gradient = ctx.createLinearGradient(
            0,
            0,
            this.width(),
            0
        );
        gradient.addColorStop(0, 'black');
        gradient.addColorStop(0.5, myself.frameColor.toString());
        ctx.fillStyle = MorphicPreferences.isFlat ?
            myself.frameColor.toString() : gradient;
        ctx.fillRect(0, 0, this.width(), this.height());
        if (this.cachedTexture) {
            this.renderCachedTexture(ctx);
        } else if (this.texture) {
            this.renderTexture(this.texture, ctx);
        }
    };

    this.logo.renderCachedTexture = function (ctx) {
        ctx.drawImage(
            this.cachedTexture,
            5,
            Math.round((this.height() - this.cachedTexture.height) / 2)
        );
        this.changed();
    };

    this.logo.mouseClickLeft = function () {
        myself.snapMenu();
    };

    this.logo.color = BLACK;
    this.logo.setExtent(new Point(200, 28)); // dimensions are fixed
    this.add(this.logo);
};

IDE_Morph.prototype.mouseClickLeft = function () {
    this.setActiveEditor();
};

IDE_Morph.prototype.setActiveEditor = function (dialog) {
    if (this.activeEditor === dialog) {
        return;
    }

    this.activeEditor.onUnsetActive();
    this.activeEditor = dialog || this;
    this.activeEditor.onSetActive();
};

IDE_Morph.prototype.onSetActive = function () {
    if (this.isAppMode) {
        this.spriteEditor.hide();
    } else {
        if (this.currentTab === 'scripts') {
            this.currentSprite.scripts.updateToolbar();
        } else if (this.spriteEditor.updateToolbar) {
            this.spriteEditor.updateToolbar();
        }
    }
};

IDE_Morph.prototype.onUnsetActive = function () {
    if (this.currentTab === 'scripts') {
        this.currentSprite.scripts.hideToolbar();
    } else if (this.spriteEditor.hideToolbar) {
        this.spriteEditor.hideToolbar();
    }
};

IDE_Morph.prototype.getActiveScripts = function () {
    if (this.activeEditor instanceof BlockEditorMorph) {
        return this.activeEditor.body.contents;
    }
    return this.currentSprite.scripts;
};

IDE_Morph.prototype.getActiveEntity = function () {
    // Return the entity which is the subject of the focus. If a block editor
    // is open, return the definition which is being edited, else return the
    // sprite being edited

    if (this.activeEditor instanceof BlockEditorMorph) {
        return this.activeEditor.definition.id + '/scripts';
    }
    return this.currentSprite.id + '/' + this.currentTab;
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
        colors = MorphicPreferences.isFlat ? this.tabColors
            : [
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

    // let users manually enforce re-layout when changing orientation
    // on mobile devices
    this.controlBar.mouseClickLeft = function () {
        this.world().fillPage();
    };

    this.add(this.controlBar);

    //smallStageButton
    button = new ToggleButtonMorph(
        null, //colors,
        this, // the IDE is the target
        'toggleStageSize',
        [
            new SymbolMorph('smallStage', 14),
            new SymbolMorph('normalStage', 14)
        ],
        () => this.isSmallStage // query
    );

    button.hasNeutralBackground = true;
    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[0];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = MorphicPreferences.isFlat ?
        WHITE
        : this.buttonLabelColor;
    button.contrast = this.buttonContrast;
    // button.hint = 'stage size\nsmall & normal';
    button.fixLayout();
    button.refresh();
    stageSizeButton = button;
    this.controlBar.add(stageSizeButton);
    this.controlBar.stageSizeButton = button; // for refreshing

    //appModeButton
    button = new ToggleButtonMorph(
        null, //colors,
        this, // the IDE is the target
        'toggleAppMode',
        [
            new SymbolMorph('fullScreen', 14),
            new SymbolMorph('normalScreen', 14)
        ],
        () => this.isAppMode // query
    );

    button.hasNeutralBackground = true;
    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[0];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = this.buttonLabelColor;
    button.contrast = this.buttonContrast;
    // button.hint = 'app & edit\nmodes';
    button.fixLayout();
    button.refresh();
    appModeButton = button;
    this.controlBar.add(appModeButton);
    this.controlBar.appModeButton = appModeButton; // for refreshing

    //steppingButton
    button = new ToggleButtonMorph(
        null, //colors,
        this, // the IDE is the target
        'toggleSingleStepping',
        [
            new SymbolMorph('footprints', 16),
            new SymbolMorph('footprints', 16)
        ],
        () => Process.prototype.enableSingleStepping // query
    );

    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = new Color(153, 255, 213);
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = this.buttonLabelColor;
    button.contrast = this.buttonContrast;
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
        () => this.stage ? // query
            myself.stage.enableCustomHatBlocks &&
                myself.stage.threads.pauseCustomHatBlocks
            : true
    );

    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = new Color(
        MorphicPreferences.isFlat ? 128 : 200,
        0,
        0
    );
    button.contrast = this.buttonContrast;
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
        () => this.isPaused() // query
    );

    button.hasNeutralBackground = true;
    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[0];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = MorphicPreferences.isFlat ?
        new Color(220, 185, 0)
        : new Color(255, 220, 0);
    button.contrast = this.buttonContrast;
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
    button.labelColor = new Color(
        0,
        MorphicPreferences.isFlat ? 100 : 200,
        0
    );
    button.contrast = this.buttonContrast;
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
    slider.action = (num) => {
        Process.prototype.flashTime = (num - 1) / 100;
        this.controlBar.refreshResumeSymbol();
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
        function() {
            var menu = myself.projectMenu(),
                pos = myself.controlBar.projectButton.bottomLeft(),
                world = myself.world();

            menu.popup(world, pos);
        },
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
    // button.hint = 'open, save, & annotate project';
    button.fixLayout();
    projectButton = button;
    this.controlBar.add(projectButton);
    this.controlBar.projectButton = projectButton; // for menu positioning

    // settingsButton
    button = new PushButtonMorph(
        this,
        function() {
            var menu = myself.settingsMenu(),
                pos = myself.controlBar.settingsButton.bottomLeft();
            menu.popup(myself.world(), pos);
        },
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
    // button.hint = 'edit settings';
    button.fixLayout();
    settingsButton = button;
    this.controlBar.add(settingsButton);
    this.controlBar.settingsButton = settingsButton; // for menu positioning

    // extensions options
    button = new PushButtonMorph(
        this,
        function() {
            var menu = myself.extensionsMenu(),
                pos = myself.controlBar.extensionsButton.bottomLeft();
            menu.popup(myself.world(), pos);
        },
        new SymbolMorph('puzzlePiece', 14)
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
    // button.hint = 'edit settings';
    button.fixLayout();
    const extensionsButton = button;
    this.controlBar.add(extensionsButton);
    this.controlBar.extensionsButton = extensionsButton; // for menu positioning
    this.controlBar.extensionsButton.hide();

    // cloudButton
    button = new ToggleButtonMorph(
        null, //colors,
        this, // the IDE is the target
        async () => {
            var menu = await this.cloudMenu(),
                pos = this.controlBar.cloudButton.bottomLeft();
            menu.popup(this.world(), pos);
        },
        [
            new SymbolMorph('cloudOutline', 11),
            new SymbolMorph('cloud', 11)
        ],
        () => !isNil(this.cloud.username) // query
    );

    button.hasNeutralBackground = true;
    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[0];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = this.buttonLabelColor;
    button.contrast = this.buttonContrast;
    // button.hint = 'cloud operations';
    button.fixLayout();
    //button.refresh();
    cloudButton = button;
    this.controlBar.add(cloudButton);
    this.controlBar.cloudButton = cloudButton; // for menu positioning & refresh

    this.controlBar.fixLayout = function () {
        x = this.right() - padding;
        [stopButton, pauseButton, startButton].forEach(button => {
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
        [stageSizeButton, appModeButton].forEach(button => {
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

        extensionsButton.setCenter(myself.controlBar.center());
        extensionsButton.setRight(steppingButton.left() - padding);

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
            slider.fixLayout();
            slider.rerender();
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
                ' - ' + localize('development mode') : '',
            txt;

        if (this.label) {
            this.label.destroy();
        }
        if (myself.isAppMode) {
            return;
        }
        txt = new StringMorph(
            (myself.projectName || localize('untitled')) + suffix,
            14,
            'sans-serif',
            true,
            false,
            false,
            MorphicPreferences.isFlat ? null : new Point(2, 1),
            myself.frameColor.darker(myself.buttonContrast)
        );
        txt.color = myself.buttonLabelColor;

        this.label = new FrameMorph();
        this.label.acceptsDrops = false;
        this.label.alpha = 0;
        txt.setPosition(this.label.position());
        this.label.add(txt);
        this.label.setExtent(
            new Point(
                steppingButton.left() - settingsButton.right() - padding * 2,
                txt.height()
            )
        );
        this.label.setCenter(this.center());
        this.label.setLeft(this.settingsButton.right() + padding);
        this.add(this.label);
    };
};

IDE_Morph.prototype.createCategories = function () {
    var myself = this;

    if (this.categories) {
        this.categories.destroy();
    }

    if (contains(this.hiddenCategories, this.currentCategory)) {
        this.currentCategory = SpriteMorph.prototype.categories.find(function (cat) {
            return !contains(['lists', 'other'], cat) && !contains(myself.hiddenCategories, cat);
        });
        this.createPalette();
    }

    this.categories = new Morph();
    this.categories.color = this.groupColor;
    this.categories.bounds.setWidth(this.paletteWidth);
    // this.categories.getRenderColor = ScriptsMorph.prototype.getRenderColor;

    function addCategoryButton(category) {
        var labelWidth = 75,
            colors = [
                myself.frameColor,
                myself.frameColor.darker(MorphicPreferences.isFlat ? 5 : 50),
                SpriteMorph.prototype.blockColor[category]
            ],
            button;

        button = new ToggleButtonMorph(
            colors,
            myself, // the IDE is the target
            () => {
                myself.currentCategory = category;
                myself.categories.children.forEach(each =>
                    each.refresh()
                );
                myself.refreshPalette(true);
            },
            category[0].toUpperCase().concat(category.slice(1)), // label
            () => myself.currentCategory === category, // query
            null, // env
            null, // hint
            labelWidth, // minWidth
            true // has preview
        );

        button.userMenu = function() {
            var shiftClicked = world.currentKey === 16;
            if (!shiftClicked || myself.categories.children.length <= 1) {
                return;
            }

            var menu = new MenuMorph(myself);
            menu.addItem("hide category", function() {
                this.hideCategory(category);
            }, null, new Color(100, 0, 0));
            return menu;
        };

        button.corner = 8;
        button.padding = 0;
        button.labelShadowOffset = new Point(-1, -1);
        button.labelShadowColor = colors[1];
        button.labelColor = myself.buttonLabelColor;
        if (MorphicPreferences.isFlat) {
            button.labelPressColor = WHITE;
        }
        button.fixLayout();
        button.refresh();
        myself.categories.add(button);
        return button;
    }

    this.categories.userMenu = function() {
        var shiftClicked = world.currentKey === 16;
        if (!shiftClicked || myself.hiddenCategories.length <= 0) {
            return;
        }

        var menu = new MenuMorph(myself);
        menu.addItem("show hidden categories", 'showHiddenCategories',
            null, new Color(100, 0, 0));
        return menu;
    };

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
        if (!contains(['lists', 'other'], cat) && !contains(myself.hiddenCategories, cat)) {
            addCategoryButton(cat);
        }
    });
    fixCategoriesLayout();
    this.add(this.categories);
};

IDE_Morph.prototype.hideCategory = function(category) {
    this.hiddenCategories.push(category);
    this.createCategories();
    this.createPaletteHandle();
    this.fixLayout();
}

IDE_Morph.prototype.showHiddenCategories = function() {
    this.hiddenCategories.length = 0;
    this.createCategories();
    this.createPaletteHandle();
    this.fixLayout();
}

IDE_Morph.prototype.createPalette = function (forSearching) {
    // assumes that the logo pane has already been created
    // needs the categories pane for layout

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
            () => {
                this.refreshPalette();
                this.palette.adjustScrollBars();
            },
            new SymbolMorph("magnifierOutline", 16)
        );
        this.palette.toolBar.alpha = 0.2;
        this.palette.toolBar.padding = 1;
        // this.palette.toolBar.hint = 'Cancel';
        this.palette.toolBar.labelShadowColor = new Color(140, 140, 140);
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

    this.palette.reactToDropOf = (droppedMorph, hand) => {
        if (droppedMorph instanceof DialogBoxMorph) {
            this.world().add(droppedMorph);
        } else if (droppedMorph instanceof SpriteMorph) {
            SnapActions.removeSprite(droppedMorph);
        } else if (droppedMorph instanceof SpriteIconMorph) {
            droppedMorph.destroy();
            SnapActions.removeSprite(droppedMorph.object);
        } else if (droppedMorph instanceof CostumeIconMorph) {
            SnapActions.removeCostume(droppedMorph.object);
            droppedMorph.perish();
        } else if (droppedMorph instanceof SoundIconMorph) {
            SnapActions.removeSound(droppedMorph.object);
            droppedMorph.destroy();
        } else if (droppedMorph instanceof BlockMorph) {
            this.stage.threads.stopAllForBlock(droppedMorph);
            if (droppedMorph.id) {
                SnapActions.removeBlock(droppedMorph);
            }
            droppedMorph.perish();
        }
    };

    this.palette.contents.reactToDropOf = (droppedMorph) => {
        if (droppedMorph instanceof BlockMorph) {
            droppedMorph.destroy();
        }
    };

    this.palette.setWidth(this.logo.width());
    this.add(this.palette);
    if (this.isAppMode) this.palette.hide();
    return this.palette;
};

IDE_Morph.prototype.createPaletteHandle = function () {
    // assumes that the palette has already been created
    if (this.paletteHandle) {this.paletteHandle.destroy(); }
    this.paletteHandle = new PaletteHandleMorph(this.categories);
    this.add(this.paletteHandle);
    if (this.isAppMode) this.paletteHandle.hide();
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
        symbols = [
            new SymbolMorph('arrowRightThin', 10),
            new SymbolMorph('turnAround', 10),
            new SymbolMorph('arrowLeftRightThin', 10),
        ],
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
            () => {
                if (myself.currentSprite instanceof SpriteMorph) {
                    SnapActions.setRotationStyle(myself.currentSprite, rotationStyle);
                }
            },
            symbols[rotationStyle], // label
            () => myself.currentSprite instanceof SpriteMorph // query
                && myself.currentSprite.rotationStyle === rotationStyle,
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
        button.setPosition(myself.spriteBar.position().add(new Point(2, 4)));
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
    thumbnail.isCachingImage = true;
    thumbnail.bounds.setExtent(thumbSize);
    thumbnail.cachedImage = this.currentSprite.thumbnail(thumbSize);
    thumbnail.setPosition(
        rotationStyleButtons[0].topRight().add(new Point(5, 3))
    );
    this.spriteBar.add(thumbnail);

    thumbnail.fps = 3;

    thumbnail.step = function () {
        if (thumbnail.version !== myself.currentSprite.version) {
            thumbnail.cachedImage = myself.currentSprite.thumbnail(
                thumbSize,
                thumbnail.cachedImage
            );
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
    nameField.fixLayout();
    nameField.accept = function () {
        var newName = nameField.getValue(),
            currentName = myself.currentSprite.name,
            safeName = myself.newSpriteName(newName, myself.currentSprite);

        if (safeName !== currentName) {
            return SnapActions.renameSprite(myself.currentSprite, safeName);
        } else {
            nameField.setContents(safeName);
        }
    };
    this.spriteBar.nameField = nameField;
    this.spriteBar.reactToEdit = nameField.accept;

    // padlock
    padlock = new ToggleMorph(
        'checkbox',
        null,
        () => SnapActions.toggleDraggable(myself.currentSprite, !myself.currentSprite.isDraggable),
        localize('draggable'),
        () => this.currentSprite.isDraggable
    );
    padlock.label.isBold = false;
    padlock.label.setColor(this.buttonLabelColor);
    padlock.color = tabColors[2];
    padlock.highlightColor = tabColors[0];
    padlock.pressColor = tabColors[1];

    padlock.tick.shadowOffset = MorphicPreferences.isFlat ?
            ZERO : new Point(-1, -1);
    padlock.tick.shadowColor = BLACK;
    padlock.tick.color = this.buttonLabelColor;
    padlock.tick.isBold = false;
    padlock.tick.fixLayout();

    padlock.setPosition(nameField.bottomLeft().add(2));
    padlock.fixLayout();
    this.spriteBar.add(padlock);
    this.spriteBar.padlock = padlock;
    if (this.currentSprite instanceof StageMorph) {
        padlock.hide();
    }

    // tab bar
    tabBar.tabTo = function (tabString) {
        var active;
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
        () => {
            SnapActions.selectTab('scripts');
            tabBar.tabTo('scripts');
        },
        localize('Scripts'), // label
        () => this.currentTab === 'scripts' // query
    );
    tab.padding = 3;
    tab.corner = tabCorner;
    tab.edge = 1;
    tab.labelShadowOffset = new Point(-1, -1);
    tab.labelShadowColor = tabColors[1];
    tab.labelColor = this.buttonLabelColor;

    tab.getPressRenderColor = function () {
        if (MorphicPreferences.isFlat ||
                SyntaxElementMorph.prototype.alpha > 0.85) {
            return this.pressColor;
        }
        return this.pressColor.mixed(
            Math.max(SyntaxElementMorph.prototype.alpha - 0.15, 0),
            SpriteMorph.prototype.paletteColor
        );
    };

    tab.fixLayout();
    tabBar.add(tab);

    tab = new TabMorph(
        tabColors,
        null, // target
        () => {
            SnapActions.selectTab('costumes');
            tabBar.tabTo('costumes');
        },
        localize(this.currentSprite instanceof SpriteMorph ?
            'Costumes' : 'Backgrounds'
        ),
        () => this.currentTab === 'costumes' // query
    );
    tab.padding = 3;
    tab.corner = tabCorner;
    tab.edge = 1;
    tab.labelShadowOffset = new Point(-1, -1);
    tab.labelShadowColor = tabColors[1];
    tab.labelColor = this.buttonLabelColor;
    tab.fixLayout();
    tabBar.add(tab);

    tab = new TabMorph(
        tabColors,
        null, // target
        () => {
            SnapActions.selectTab('sounds');
            tabBar.tabTo('sounds');
        },
        localize('Sounds'), // label
        () => this.currentTab === 'sounds' // query
    );
    tab.padding = 3;
    tab.corner = tabCorner;
    tab.edge = 1;
    tab.labelShadowOffset = new Point(-1, -1);
    tab.labelShadowColor = tabColors[1];
    tab.labelColor = this.buttonLabelColor;
    tab.fixLayout();
    tabBar.add(tab);

    tabBar.fixLayout();
    tabBar.children.forEach(each =>
        each.refresh()
    );
    this.spriteBar.tabBar = tabBar;
    this.spriteBar.add(this.spriteBar.tabBar);

    this.spriteBar.fixLayout = function () {
        this.tabBar.setLeft(this.left());
        this.tabBar.setBottom(this.bottom() + myself.padding);
    };
    if (this.isAppMode) this.spriteBar.hide();
};

IDE_Morph.prototype.createSpriteEditor = function () {
    // assumes that the logo pane and the stage have already been created
    var scripts = this.currentSprite.scripts;

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
        this.spriteEditor.color = this.groupColor;
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

        this.spriteEditor.contents.mouseEnterDragging = (morph) => {
            if (morph instanceof BlockMorph) {
                this.spriteBar.tabBar.tabTo('scripts');
            }
        };
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

        this.spriteEditor.contents.mouseEnterDragging = (morph) => {
            if (morph instanceof BlockMorph) {
                this.spriteBar.tabBar.tabTo('scripts');
            }
        };
    } else {
        this.spriteEditor = new Morph();
        this.spriteEditor.color = this.groupColor;
        this.spriteEditor.acceptsDrops = true;
        this.spriteEditor.reactToDropOf = (droppedMorph) => {
            if (droppedMorph instanceof DialogBoxMorph) {
                this.world().add(droppedMorph);
            } else if (droppedMorph instanceof SpriteMorph) {
                this.removeSprite(droppedMorph);
            } else {
                droppedMorph.destroy();
            }
        };
        this.add(this.spriteEditor);
    }

    this.activeEditor.onSetActive();
};

IDE_Morph.prototype.createCorralBar = function () {
    // assumes the stage has already been created
    var padding = 5,
        newbutton,
        paintbutton,
        cambutton,
        colors = MorphicPreferences.isFlat ? this.tabColors
        : [
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
            event => {
                cambutton.disable();
                cambutton.hint =
                    CamSnapshotDialogMorph.prototype.notSupportedMessage;
            }
        );
    }
};

IDE_Morph.prototype.createCorral = function () {
    // assumes the corral bar has already been created
    var frame, padding = 5, myself = this;

    this.createStageHandle();
    this.createPaletteHandle();

    if (this.corral) {
        this.corral.destroy();
    }

    this.corral = new Morph();
    this.corral.color = this.groupColor;
    this.corral.getRenderColor = ScriptsMorph.prototype.getRenderColor;

    this.add(this.corral);

    this.corral.stageIcon = new SpriteIconMorph(this.stage);
    this.corral.stageIcon.isDraggable = false;
    this.corral.add(this.corral.stageIcon);

    frame = new ScrollFrameMorph(null, null, this.sliderColor);
    frame.acceptsDrops = false;
    frame.contents.acceptsDrops = false;

    frame.contents.wantsDropOf = (morph) => morph instanceof SpriteIconMorph;

    frame.contents.reactToDropOf = (spriteIcon) =>
        this.corral.reactToDropOf(spriteIcon);

    frame.alpha = 0;

    this.sprites.asArray().forEach(morph => {
        if (!morph.isTemporary) {
            frame.contents.add(new SpriteIconMorph(morph));
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

        this.frame.contents.children.forEach(icon => {
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
        this.frame.contents.children.forEach(icon =>
            icon.refresh()
        );
    };

    this.corral.wantsDropOf = (morph) => morph instanceof SpriteIconMorph;

    this.corral.reactToDropOf = function (spriteIcon) {
        var idx = 1,
            pos = spriteIcon.position(),
            stillExists = !!SnapActions.getOwnerFromId(spriteIcon.object.id);

        spriteIcon.destroy();
        if (stillExists) {
            this.frame.contents.children.forEach(function (icon) {
                if (pos.gt(icon.position()) || pos.y > icon.bottom()) {
                    idx += 1;
                }
            });
            myself.sprites.add(spriteIcon.object, idx);
            myself.createCorral();
            myself.fixLayout();
        }
    };

    this.corral.userMenu = function() {
        var menu = new MenuMorph(this),
            action,
            deletedSprite,
            len;

        if (SnapUndo.canUndo('corral')) {
            // get the deleted sprite's name
            len = SnapUndo.eventHistory.corral.length;
            action = SnapUndo.eventHistory.corral[len-1];
            deletedSprite = myself.serializer.parse(action.args[1])
                .childrenNamed('sprite')[0];

            menu.addItem(
                'restore ' + deletedSprite.attributes.name,
                function() {
                    SnapUndo.undo('corral');
                }
            );
        }
        return menu;
    };
    if (this.isAppMode) this.corral.hide();
};

IDE_Morph.prototype.createReplayControls = function () {
    this.replayControls = new ReplayControls(this);

    this.add(this.replayControls);
    //this.replayControls.rerender();
    this.replayControls.hide();
};

// IDE_Morph layout

IDE_Morph.prototype.fixLayout = function (situation) {
    // situation is a string, i.e.
    // 'selectSprite' or 'refreshPalette' or 'tabEditor'
    var padding = this.padding,
        flag,
        maxPaletteWidth;

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
            flag.fixLayout();
            this.embedPlayButton.size = flag.size * 1.6;
            this.embedPlayButton.fixLayout();
            if (this.embedOverlay) {
                this.embedOverlay.setExtent(this.extent());
            }
            this.stage.setCenter(this.center());
            this.embedPlayButton.setCenter(this.stage.center());
            flag.setCenter(this.embedPlayButton.center());
            flag.setLeft(flag.left() + flag.size * 0.1); // account for slight asymmetry
        } else if (this.isAppMode) {
            var optimalScale;
            if (this.isMobileDevice()) {
                var widthScale = (this.width() - padding * 2) / this.stage.dimensions.x;
                var heightScale = (this.height() - padding * 2) / this.stage.dimensions.y;
                optimalScale = Math.floor(Math.min(widthScale, heightScale) * 1000) / 1000;
            } else {
                optimalScale = Math.floor(Math.min(
                    (this.width() - padding * 2) / this.stage.dimensions.x,
                    (this.height() - this.controlBar.height() * 2 - padding * 2)
                        / this.stage.dimensions.y
                ) * 10) / 10;
            }
            this.stage.setScale(optimalScale);
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
            this.categories.bottom() - this.spriteBar.top() - padding - 8
        ));
        this.spriteBar.fixLayout();

        // spriteEditor
        if (this.spriteEditor.isVisible) {
            this.spriteEditor.setPosition(new Point(
                this.spriteBar.left(),
                this.spriteBar.bottom() + padding
            ));
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

    var width = Math.max(this.width() * 0.8, 250);

    // Set position
    this.removeChild(this.replayControls);
    this.add(this.replayControls);  // make sure it is on top!

    this.replayControls.setWidth(this.width()-40);
    this.replayControls.setHeight(80);
    this.replayControls.setCenter(new Point(this.width()/2, 0));
    this.replayControls.setBottom(this.bottom());
    this.replayControls.fixLayout();

    Morph.prototype.trackChanges = true;
    this.changed();

    // also re-arrange mobile mode
    if (this.isAppMode && this.isMobileDevice()) {
        // if mobilemode is fully initialized
        if (this.mobileMode.buttons.length !== 0) this.mobileMode.fixLayout();
    }
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
        if (this.isMobileDevice()) {
            minExt = new Point(10, 10);
        } else if (this.isEmbedMode) {
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

// IDE_Morph rendering

IDE_Morph.prototype.render = function (ctx) {
    var frame;
    IDE_Morph.uber.render.call(this, ctx);
    if (this.isAppMode && this.stage) {
        // draw a subtle outline rectangle around the stage
        // in presentation mode
        frame = this.stage.bounds.translateBy(
            this.position().neg()
        ).expandBy(2);
        ctx.strokeStyle = (MorphicPreferences.isFlat ? this.backgroundColor
            : this.groupColor).toString();
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(frame.origin.x, frame.origin.y);
        ctx.lineTo(frame.corner.x, frame.origin.y);
        ctx.lineTo(frame.corner.x, frame.corner.y);
        ctx.lineTo(frame.origin.x, frame.corner.y);
        ctx.closePath();
        ctx.stroke();
    }
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

    SnapActions.addCostume(costume, this.currentSprite, true);
};

IDE_Morph.prototype.droppedSVG = function (anImage, name) {
    var costume = new SVG_Costume(anImage, name.split('.')[0]);
    SnapActions.addCostume(costume, this.currentSprite, true);
};

IDE_Morph.prototype.droppedAudio = async function (anAudio, name) {
    anAudio.src = await this.getAudioAsBase64(anAudio.src);

    const sound = new Sound(anAudio, name.split('.')[0]);  // up to period

    SnapActions.addSound(sound, this.currentSprite, true)
        .then(() => this.spriteBar.tabBar.tabTo('sounds'));
};

IDE_Morph.prototype.getAudioAsBase64 = async function (src) {
    if (src.startsWith('data:audio')) {
        return src;
    } else {
    	return await new Promise(resolve => this.getURL(
        	src,
            blob => {
                var reader = new window.FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                	var base64 = reader.result;
                    base64 = 'data:audio/ogg;base64,' +
                        base64.split(',')[1];
                    resolve(base64);
                };
            },
            'blob'
        ));
    }
};

IDE_Morph.prototype.droppedText = async function (aString, name, fileType) {
    var lbl = name ? name.split('.')[0] : '',
        ext = name ? name.slice(name.lastIndexOf('.') + 1).toLowerCase() : '';

    // check for Snap specific files, projects, libraries, sprites, scripts
    if (aString.indexOf('<project') === 0) {
        location.hash = '';
        SnapActions.disableCollaboration();
        SnapUndo.reset();
        return this.openProjectString(aString);
    }
    if (aString.indexOf('<replay') === 0) {
        return this.openReplayString(aString);
    }
    if (aString.indexOf('<snapdata') === 0) {
        SnapActions.disableCollaboration();
        SnapUndo.reset();
        location.hash = '';
        return this.openCloudDataString(aString);
    }
    if (aString.indexOf('<blocks') === 0) {
        return SnapActions.importBlocks(aString, lbl);
    }
    if (aString.indexOf('<sprites') === 0) {
        return SnapActions.importSprites(aString);
    }
    if (aString.indexOf('<media') === 0) {
        return this.openMediaString(aString);
    }

    // check for encoded data-sets, CSV, JSON
    fileType = fileType || 'text';

    if (aString.indexOf('<script') === 0) {
        const script = await this.openScriptString(aString);
        if (script) {
            const handIsFull = this.world().hand.children.length;
            if (handIsFull) {
                this.showMessage(localize('Cannot import scripts while dragging another object.'));
            } else {
                script.setPosition(this.palette.center());
                this.palette.add(script);
                delete script.id;
                script.pickUp(this.world());
                this.showMessage(localize('Imported script.'), 2);
            }
        }
        return;
    }
    // check for encoded data-sets, CSV, JSON
    if (fileType.indexOf('csv') !== -1 || ext === 'csv') {
        return this.openDataString(aString, lbl, 'csv');
    }
    if (fileType.indexOf('json') !== -1 || ext === 'json') {
        return this.openDataString(aString, lbl, 'json');
    }

    // import as plain text data
    return this.openDataString(aString, lbl, 'text');
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
    SnapActions.pressStart(this.world().currentKey === 16);
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

IDE_Morph.prototype.toggleCollaborativeEditing = function () {
    var myself = this;

    if (SnapActions.isCollaborating()) {
        SnapActions.disableCollaboration();
    } else if (this.isReplayMode) {
        this.confirm(
            'Cannot enter collaborate while in replay mode. \nWould you ' +
            'like to exit replay mode and enable collaborative editing?',
            'Exit Replay Mode?',
            function() {
                myself.exitReplayMode();
                SnapActions.enableCollaboration();
            }
        );
    } else {
        SnapActions.enableCollaboration();
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
    this.controlBar.startButton.createLabel();
    this.controlBar.startButton.fixLayout();
    this.controlBar.startButton.rerender();
};

IDE_Morph.prototype.stopFastTracking = function () {
    this.stage.isFastTracked = false;
    this.stage.fps = this.stage.frameRate;
    this.controlBar.startButton.labelString = new SymbolMorph('flag', 14);
    this.controlBar.startButton.createLabel();
    this.controlBar.startButton.fixLayout();
    this.controlBar.startButton.rerender();
};

IDE_Morph.prototype.runScripts = function () {
    this.stage.fireGreenFlagEvent();
};

IDE_Morph.prototype.togglePauseResume = function () {
    SnapActions.togglePause(this.stage.threads.isPaused());
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
    SnapActions.stopAllScripts();
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
    // prevent switching to another sprite if a block editor is open
    // so local blocks of different sprites don't mix
    if (
        detect(
            this.world().children,
            morph => morph instanceof BlockEditorMorph ||
                morph instanceof BlockDialogMorph
        )
    ) {
        return;
    }
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
    return this.currentSprite;
};

// IDE_Morph retina display support

IDE_Morph.prototype.toggleRetina = function () {
    if (isRetinaEnabled()) {
        disableRetinaSupport();
    } else {
        enableRetinaSupport();
    }
    this.world().fillPage();
    if (!MorphicPreferences.isFlat) {
        IDE_Morph.prototype.scriptsPaneTexture = this.scriptsTexture();
    }
    this.stage.clearPenTrails();
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
        SnapActions.openProject();
    } else {
        SnapUndo.reset();
        this.openProjectString(projectData);
    }
};

// IDE_Morph settings persistance

IDE_Morph.prototype.applySavedSettings = function () {
    var design = this.getSetting('design'),
        zoom = this.getSetting('zoom'),
        fade = this.getSetting('fade'),
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

    // blocks fade
    if (!isNil(fade)) {
        this.setBlockTransparency(+fade);
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
        rnd = Process.prototype.reportBasicRandom;

    sprite.name = this.newSpriteName(sprite.name);
    sprite.setCenter(this.stage.center());
    sprite.parent = this.stage;

    // randomize sprite properties
    sprite.setColorComponentHSVA(0, rnd.call(this, 0, 100));
    sprite.setColorComponentHSVA(1, 100);
    sprite.setColorComponentHSVA(2, rnd.call(this, 50, 100));

    sprite.setXPosition(rnd.call(this, -220, 220));
    sprite.setYPosition(rnd.call(this, -160, 160));

    if (this.world().currentKey === 16) { // shift-click
        sprite.turn(rnd.call(this, 1, 360));
    }
    return SnapActions.addSprite(sprite)
        .then(sprite => this.selectSprite(sprite));
};

IDE_Morph.prototype.paintNewSprite = function () {
    var sprite = new SpriteMorph(this.globalVariables),
        cos = new Costume();

    cos.edit(
        this.world(),
        null,
        true,
        nop,
        () => {
            cos.shrinkWrap();
            sprite.parent = this.stage;
            sprite.addCostume(cos);
            sprite.wearCostume(cos);
            sprite.gotoXY(0, 0);
            SnapActions.addSprite(sprite);
        }
    );
};

IDE_Morph.prototype.newCamSprite = function () {
    var sprite = new SpriteMorph(this.globalVariables),
        camDialog;

    sprite.name = this.newSpriteName(sprite.name);
    sprite.setCenter(this.stage.center());
    sprite.parent = this.stage;

    camDialog = new CamSnapshotDialogMorph(
        this,
        sprite,
        nop,
        costume => { // needs to be "function" to it can access "this"
            sprite.addCostume(costume);
            sprite.wearCostume(costume);

            camDialog.close();
            SnapActions.addSprite(sprite)
                .then(sprite => this.selectSprite(sprite));
        });

    camDialog.popUp(this.world());
};

IDE_Morph.prototype.recordNewSound = function () {
    var soundRecorder;

    soundRecorder = new SoundRecorderDialogMorph(
        audio => {
            var sound;
            if (audio) {
                sound = this.currentSprite.addSound(
                	audio,
                    this.newSoundName('recording')
                );
                this.makeSureRecordingIsMono(sound);
                this.spriteBar.tabBar.tabTo('sounds');
                this.hasChangedMedia = true;
            }
        });

    soundRecorder.key = 'microphone';
    soundRecorder.popUp(this.world());
};

IDE_Morph.prototype.makeSureRecordingIsMono = function (sound) {
    // private and temporary, a horrible kludge to work around browsers'
    // reluctance to implement audio recording constraints that let us
    // record sound in mono only. As of January 2020 the audio channelCount
    // constraint only works in Firefox, hence this terrible function to
    // force convert a stereo sound to mono for Chrome.
    // If this code is still here next year, something is very wrong.
    // -Jens

    decodeSound(sound, makeMono);

    function decodeSound(sound, callback) {
        var base64, binaryString, len, bytes, i, arrayBuffer, audioCtx;
        if (sound.audioBuffer) {
            return callback (sound);
        }
        base64 = sound.audio.src.split(',')[1];
        binaryString = window.atob(base64);
        len = binaryString.length;
        bytes = new Uint8Array(len);
        for (i = 0; i < len; i += 1)        {
            bytes[i] = binaryString.charCodeAt(i);
        }
        arrayBuffer = bytes.buffer;
        audioCtx = Note.prototype.getAudioContext();
        sound.isDecoding = true;
        audioCtx.decodeAudioData(
            arrayBuffer,
            buffer => {
                sound.audioBuffer = buffer;
                return callback (sound);
            },
            err => {throw err; }
        );
    }

    function makeMono(sound) {
        var samples, audio, blob, reader;
        if (sound.audioBuffer.numberOfChannels === 1) {return; }
        samples = sound.audioBuffer.getChannelData(0);

        audio = new Audio();
        blob = new Blob(
            [
                audioBufferToWav(
                    encodeSound(samples, 44100).audioBuffer
                )
            ],
            {type: "audio/wav"}
        );
        reader = new FileReader();
        reader.onload = () => {
            audio.src = reader.result;
            sound.audio = audio; // .... aaaand we're done!
            sound.audioBuffer = null;
            sound.cachedSamples = null;
            sound.isDecoding = false;
            // console.log('made mono', sound);
        };
        reader.readAsDataURL(blob);
    }

    function encodeSound(samples, rate) {
        var ctx = Note.prototype.getAudioContext(),
            frameCount = samples.length,
            arrayBuffer = ctx.createBuffer(1, frameCount, +rate || 44100),
            i,
            source;

        if (!arrayBuffer.copyToChannel) {
            arrayBuffer.copyToChannel = function (src, channel) {
                var buffer = this.getChannelData(channel);
                for (i = 0; i < src.length; i += 1) {
                    buffer[i] = src[i];
                }
            };
        }
        arrayBuffer.copyToChannel(
            Float32Array.from(samples),
            0,
            0
        );
        source = ctx.createBufferSource();
        source.buffer = arrayBuffer;
        source.audioBuffer = source.buffer;
        return source;
    }

    function audioBufferToWav(buffer, opt) {
        var sampleRate = buffer.sampleRate,
            format = (opt || {}).float32 ? 3 : 1,
            bitDepth = format === 3 ? 32 : 16,
            result;

        result = buffer.getChannelData(0);
        return encodeWAV(result, format, sampleRate, 1, bitDepth);
    }

    function encodeWAV(
        samples,
        format,
        sampleRate,
        numChannels,
        bitDepth
    ) {
        var bytesPerSample = bitDepth / 8,
            blockAlign = numChannels * bytesPerSample,
            buffer = new ArrayBuffer(44 + samples.length * bytesPerSample),
            view = new DataView(buffer);

        function writeFloat32(output, offset, input) {
            for (var i = 0; i < input.length; i += 1, offset += 4) {
                output.setFloat32(offset, input[i], true);
            }
        }

        function floatTo16BitPCM(output, offset, input) {
            var i, s;
            for (i = 0; i < input.length; i += 1, offset += 2) {
                s = Math.max(-1, Math.min(1, input[i]));
                output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
            }
        }

        function writeString(view, offset, string) {
            for (var i = 0; i < string.length; i += 1) {
                view.setUint8(offset + i, string.charCodeAt(i));
            }
        }

        writeString(view, 0, 'RIFF'); // RIFF identifier
        // RIFF chunk length:
        view.setUint32(4, 36 + samples.length * bytesPerSample, true);
        writeString(view, 8, 'WAVE'); // RIFF type
        writeString(view, 12, 'fmt '); // format chunk identifier
        view.setUint32(16, 16, true); // format chunk length
        view.setUint16(20, format, true); // sample format (raw)
        view.setUint16(22, numChannels, true); // channel count
        view.setUint32(24, sampleRate, true); // sample rate
        // byte rate (sample rate * block align):
        view.setUint32(28, sampleRate * blockAlign, true);
        // block align (channel count * bytes per sample):
        view.setUint16(32, blockAlign, true);
        view.setUint16(34, bitDepth, true); // bits per sample
        writeString(view, 36, 'data'); // data chunk identifier
        // data chunk length:
        view.setUint32(40, samples.length * bytesPerSample, true);
        if (format === 1) { // Raw PCM
            floatTo16BitPCM(view, 44, samples);
        } else {
            writeFloat32(view, 44, samples);
        }
        return buffer;
    }
};

IDE_Morph.prototype.duplicateSprite = function (sprite) {
    var duplicate = sprite.fullCopy();

    duplicate.appearIn(this);
    return duplicate;
    // FIXME: does this work as expected?
    //duplicate.isDown = false;
    //duplicate.setPosition(this.world().hand.position());
    //duplicate.appearIn(this);
    //duplicate.keepWithin(this.stage);
    //duplicate.isDown = sprite.isDown;
    //this.selectSprite(duplicate);
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
    var idx;
    sprite.parts.slice().forEach(part =>
    	this.removeSprite(part)
    );
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
};

IDE_Morph.prototype.newSoundName = function (name) {
    var lastSound = this.currentSprite.sounds.at(
            this.currentSprite.sounds.length()
        );

    return this.newName(
        name || lastSound.name,
        this.currentSprite.sounds.asArray().map(eachSound =>
            eachSound.name
        )
    );
};

IDE_Morph.prototype.newSpriteName = function (name, ignoredSprite) {
    var all = this.sprites.asArray().concat(this.stage).filter(each =>
            each !== ignoredSprite
        ).map(each => each.name);
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
    menu.addItem('About...', 'aboutNetsBlox');
    menu.addLine();
    menu.addItem(
        'NetsBlox website',
        function () {
            window.open('https://netsblox.org', 'NetsBloxWebsite');
        }
    );
    menu.addItem(
        'Snap! manual',
        function () {
            var url = myself.resourceURL('help', 'SnapManual.pdf');
            window.open(url, 'SnapReferenceManual');
        }
    );
    menu.addItem(
        'Source code',
        function () {
            window.open(
                'https://github.com/netsblox/netsblox'
            );
        }
    );
    menu.addLine();
    menu.addItem(
        'Report a bug',
        'reportBug'
    );
    if (world.currentKey === 16) {
        menu.addItem(
            'Load reported bug',
            'loadBugReport',
            undefined,
            new Color(100, 0, 0)
        );
    }
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
        world = this.world(),
        shiftClicked = (world.currentKey === 16);

    if (location.protocol === 'file:' && !shiftClicked) {
        this.showMessage('cloud unavailable without a web server.');
        return;
    }

    menu = new MenuMorph(this);
    if (!this.cloud.username) {
        menu.addItem(
            'Login...',
            'initializeCloud'
        );
        menu.addItem(
            'Login with Snap!...',
            'initializeCloudWithSnap'
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
            () => {
                if (this.projectName) {
                    this.exportProjectMedia(this.projectName);
                } else {
                    this.prompt(
                        'Export Project As...',
                        name => this.exportProjectMedia(name),
                        null,
                        'exportProject'
                    );
                }
            },
            null,
            this.hasChangedMedia ? new Color(100, 0, 0) : new Color(0, 100, 0)
        );
        menu.addItem(
            'export project without media...',
            () => {
                if (this.projectName) {
                    this.exportProjectNoMedia(this.projectName);
                } else {
                    this.prompt(
                        'Export Project As...',
                        name => this.exportProjectNoMedia(name),
                        null,
                        'exportProject'
                    );
                }
            },
            null,
            new Color(100, 0, 0)
        );
        menu.addLine();
        menu.addItem(
            'open shared project from cloud...',
            () => {
                this.prompt('Author name…', usr => {
                    this.prompt('Project name...', async prj => {
                        var id = 'Username=' +
                            encodeURIComponent(usr.toLowerCase()) +
                            '&ProjectName=' +
                            encodeURIComponent(prj);
                        this.showMessage(
                            'Fetching project\nfrom the cloud...'
                        );
                        try {
                            const projectData = await SnapCloud.getPublicProject(id);
                            if (!Process.prototype.isCatchingErrors) {
                                window.open(
                                    'data:text/xml,' + projectData
                                );
                            }
                            const msg = this.showMessage('Opening project...');
                            await SnapActions.openProject(projectData);
                            msg.destroy();
                        } catch (err) {
                            this.cloudError()(err.message);
                        }

                    }, null, 'project');
                }, null, 'project');
            },
            null,
            new Color(100, 0, 0)
        );
    }

    return menu;
};

IDE_Morph.prototype.settingsMenu = function () {
    var menu,
        stage = this.stage,
        world = this.world(),
        shiftClicked = (world.currentKey === 16),
        on = new SymbolMorph(
            'checkedBox',
            MorphicPreferences.menuFontSize * 0.75
        ),
        off = new SymbolMorph(
            'rectangle',
            MorphicPreferences.menuFontSize * 0.75
        );

    function addPreference(label, toggle, test, onHint, offHint, hide) {
        if (!hide || shiftClicked) {
            menu.addItem(
                [
                    (test? on : off),
                    localize(label)
                ],
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
        'Fade blocks...',
        'userFadeBlocks'
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

    /*
    TODO: Discover extensions...
    menu.addMenu('Load Extension...', submenu);
    */

    menu.addLine();
    /*
    addPreference(
        'JavaScript',
        () => {
            Process.prototype.enableJS = !Process.prototype.enableJS;
            this.currentSprite.blocksCache.operators = null;
            this.currentSprite.paletteCache.operators = null;
            this.refreshPalette();
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
            'check for higher resolution,\nuses more computing resources',
            true
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
        'Log pen vectors',
        () => StageMorph.prototype.enablePenLogging =
            !StageMorph.prototype.enablePenLogging,
        StageMorph.prototype.enablePenLogging,
        'uncheck to turn off\nlogging pen vectors',
        'check to turn on\nlogging pen vectors',
        false
    );
    addPreference(
        'Ternary Boolean slots',
        () => BooleanSlotMorph.prototype.isTernary =
            !BooleanSlotMorph.prototype.isTernary,
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
        () => {
            BlockMorph.prototype.toggleSnapSound();
            if (BlockMorph.prototype.snapSound) {
                this.saveSetting('click', true);
            } else {
                this.removeSetting('click');
            }
        },
        BlockMorph.prototype.snapSound,
        'uncheck to turn\nblock clicking\nsound off',
        'check to turn\nblock clicking\nsound on'
    );
    addPreference(
        'Animations',
        () => this.isAnimating = !this.isAnimating,
        this.isAnimating,
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
        () => MorphicPreferences.rasterizeSVGs =
            !MorphicPreferences.rasterizeSVGs,
        MorphicPreferences.rasterizeSVGs,
        'uncheck for smooth\nscaling of vector costumes',
        'check to rasterize\nSVGs on import',
        true
    );
    addPreference(
        'Flat design',
        () => {
            if (MorphicPreferences.isFlat) {
                return this.defaultDesign();
            }
            this.flatDesign();
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
                this.removeSetting('autowrapping');
            } else {
                this.saveSetting('autowrapping', false);
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
            this.projectsInURLs = !this.projectsInURLs;
            if (this.projectsInURLs) {
                this.saveSetting('longurls', true);
            } else {
                this.removeSetting('longurls');
            }
        },
        this.projectsInURLs,
        'uncheck to disable\nproject data in URLs',
        'check to enable\nproject data in URLs',
        true
    );
    addPreference(
        'Sprite Nesting',
        () => SpriteMorph.prototype.enableNesting =
            !SpriteMorph.prototype.enableNesting,
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
            this.currentSprite.blocksCache.sensing = null;
            this.currentSprite.paletteCache.sensing = null;
            this.refreshPalette();
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
            this.currentSprite.scripts.updateToolbar();
            if (ScriptsMorph.prototype.enableKeyboard) {
                this.removeSetting('keyboard');
            } else {
                this.saveSetting('keyboard', false);
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
                this.removeSetting('tables');
            } else {
                this.saveSetting('tables', false);
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
                    this.saveSetting('tableLines', true);
                } else {
                    this.removeSetting('tableLines');
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
        () => Process.prototype.enableLiveCoding =
            !Process.prototype.enableLiveCoding,
        Process.prototype.enableLiveCoding,
        'EXPERIMENTAL! uncheck to disable live\ncustom control structures',
        'EXPERIMENTAL! check to enable\n live custom control structures',
        true
    );
    addPreference(
        'JIT compiler support',
        () => {
            Process.prototype.enableCompiling =
                !Process.prototype.enableCompiling;
            this.currentSprite.blocksCache.operators = null;
            this.currentSprite.paletteCache.operators = null;
            this.refreshPalette();
        },
        Process.prototype.enableCompiling,
        'EXPERIMENTAL! uncheck to disable live\nsupport for compiling',
        'EXPERIMENTAL! check to enable\nsupport for compiling',
        true
    );
    if (SnapActions.supportsCollaboration !== false) {
        addPreference(
            'Collaborative editing',
            'toggleCollaborativeEditing',
            SnapActions.isCollaborating(),
            'uncheck to disable Google Docs-style collaboration',
            'check to enable Google Docs-style collaboration',
            false
        );
    }
    addPreference(
        'Replay Mode',
        () => {
            if (this.isReplayMode) {  // exiting replay mode

                if (this.isPreviousVersion()) {
                    this.confirm(
                        'Exiting replay mode now will revert the project to\n' +
                        'the current point in history (losing any unapplied ' + 
                        'changes)\n\nAre you sure you want to exit replay mode?',
                        'Exit Replay Mode?',
                        () => this.exitReplayMode()
                    );
                    return;
                }
                return this.exitReplayMode();
            }
            // entering replay mode
            if (SnapUndo.allEvents.length < 2) {
                return this.showMessage('Nothing to replay!', 2);
            }
            if (SnapActions.isCollaborating()) {
                this.confirm(
                    'Cannot enter replay mode while collaborating. \nWould you ' +
                    'like to disable collaboration and enter replay mode?',
                    'Disable Collaboration?',
                    () => {
                        SnapActions.disableCollaboration();
                        this.replayEvents();
                    }
                );
            } else {
                this.replayEvents();
            }
        },
        this.isReplayMode,
        'uncheck to disable replay mode',
        'check to enable replay mode',
        false
    );
    addPreference(
        'Save replay history',
        function() {
            SnapSerializer.prototype.isSavingHistory = !SnapSerializer.prototype.isSavingHistory;
        },
        SnapSerializer.prototype.isSavingHistory,
        'uncheck to only save project',
        'check to save replay with project',
        false
    );
    addPreference(
        'Messaging while collaborating?',
        async () => {

            if (!this.allowMsgsWhileCollaborating) {
                const title = localize('Send messages while collaborating?');
                const message = localize('By default, message sending is disabled when collaborating because it can make\ndebugging distributed applications difficult.\n\n') +
                    localize('When multiple users collaborate, each collaborating user may send his/her own response\nto a received message. ') +
                    localize('This is problematic when using the "send msg and wait"\nblock as well as for applications like turn-based games.\n\n') +
                    localize('Would you like to enable message sending while collaborating?');
                const confirmed = await this.confirm(message, title);
                if (confirmed) {
                    this.allowMsgsWhileCollaborating = !this.allowMsgsWhileCollaborating;
                }
            } else {
                this.allowMsgsWhileCollaborating = !this.allowMsgsWhileCollaborating;
            }
        },
        this.allowMsgsWhileCollaborating,
        'uncheck to block message sending while multiple users occupy a single role',
        'check to allow message sending while multiple users occupy a single role',
        false
    );
    menu.addLine(); // everything below this line is stored in the project
    addPreference(
        'Thread safe scripts',
        () => stage.isThreadSafe = !stage.isThreadSafe,
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
        () => SpriteMorph.prototype.useFlatLineEnds =
            !SpriteMorph.prototype.useFlatLineEnds,
        SpriteMorph.prototype.useFlatLineEnds,
        'uncheck for round ends of lines',
        'check for flat ends of lines'
    );
    addPreference(
        'Codification support',
        () => {
            StageMorph.prototype.enableCodeMapping =
                !StageMorph.prototype.enableCodeMapping;
            this.currentSprite.blocksCache.variables = null;
            this.currentSprite.paletteCache.variables = null;
            this.refreshPalette();
        },
        StageMorph.prototype.enableCodeMapping,
        'uncheck to disable\nblock to text mapping features',
        'check for block\nto text mapping features',
        false
    );
    /*
    addPreference(
        'Inheritance support',
        () => {
            StageMorph.prototype.enableInheritance =
                !StageMorph.prototype.enableInheritance;
            this.currentSprite.blocksCache.variables = null;
            this.currentSprite.paletteCache.variables = null;
            this.refreshPalette();
        },
        StageMorph.prototype.enableInheritance,
        'uncheck to disable\nsprite inheritance features',
        'check for sprite\ninheritance features',
        true
    );
    */
    addPreference(
        'Hyper blocks support',
        () => Process.prototype.enableHyperOps =
            !Process.prototype.enableHyperOps,
        Process.prototype.enableHyperOps,
        'uncheck to disable\nusing operators on lists and tables',
        'check to enable\nusing operators on lists and tables',
        false
    );
    addPreference(
        'Persist linked sublist IDs',
        () => StageMorph.prototype.enableSublistIDs =
            !StageMorph.prototype.enableSublistIDs,
        StageMorph.prototype.enableSublistIDs,
        'uncheck to disable\nsaving linked sublist identities',
        'check to enable\nsaving linked sublist identities',
        true
    );
    addPreference(
        'Enable command drops in all rings',
        () => RingReporterSlotMorph.prototype.enableCommandDrops =
            !RingReporterSlotMorph.prototype.enableCommandDrops,
        RingReporterSlotMorph.prototype.enableCommandDrops,
        'uncheck to disable\ndropping commands in reporter rings',
        'check to enable\ndropping commands in all rings',
        true
    );

    return menu;
};

IDE_Morph.prototype.loadExtension = async function (url) {
    if (await this.isTrustedExtension(url)) {
        const node = document.createElement('script');
        node.setAttribute('src', url);
        node.setAttribute('type', 'text/javascript');
        document.body.appendChild(node);
    }
};

IDE_Morph.prototype.isTrustedExtension = async function (url) {
    const trustedSources = [ '/', window.location.origin, 'https://extensions.netsblox.org'];
    const isAutoTrusted = trustedSources.some(source => url.startsWith(source));
    if (isAutoTrusted) {
        return true;
    }

    const title = 'Install Third-Party Extension?';
    const message = 'An untrusted third-party extension was encountered and\nrequires approval to load:\n\n' +
        url + '\n\nIf the above URL is not recognized or trusted, installation is not \nrecommended as ' +
        'third-party extensions could be malicious.' +
        '\n\nWould you like to install this extension?';
    return await this.confirm(message, title);
};

IDE_Morph.prototype.projectMenu = function () {
    var menu,
        world = this.world(),
        graphicsName = this.currentSprite instanceof SpriteMorph ?
            'Costumes' : 'Backgrounds',
        shiftClicked = (world.currentKey === 16);

    menu = new MenuMorph(this);
    menu.addItem('Project notes...', 'editProjectNotes');
    menu.addLine();
    menu.addPair('New', 'createNewProject', '^N');
    menu.addPair('Open...', 'openProjectsBrowser', '^O');
    menu.addPair('Save', "save", '^S');
    menu.addItem('Save As...', 'saveAs');
    if (shiftClicked) {
        menu.addItem(
            localize('Replay events from file'),
            () => {
                var inp = document.createElement('input');
                if (SnapUndo.allEvents.length > 1) {
                    this.newProject();
                }

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
                inp.addEventListener(
                    'change',
                    function () {
                        var reader = new FileReader();
                        document.body.removeChild(inp);
                        this.filePicker = null;

                        reader.onloadend = function(result) {
                            return this.loadReplayFromXml(result.target.result);
                        };
                        reader.readAsText(inp.files[0]);
                    },
                    false
                );
                document.body.appendChild(inp);
                this.filePicker = inp;
                inp.click();
            },
            'Load project replay from the beginning',
            new Color(100, 0, 0)
        );
    }
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
            () => {
                if (this.projectName) {
                    this.exportProject(this.projectName, shiftClicked);
                } else {
                    this.prompt(
                        'Export Project As...',
                        // false - override the shiftClick setting to use XML:
                        name => this.exportProject(name, false),
                        null,
                        'exportProject'
                    );
                }
            },
            'show project data as XML\nin a new browser window',
            new Color(100, 0, 0)
        );
        menu.addItem(
            localize('Export project without history...'),
            () => {
                var savingHistory = this.serializer.isSavingHistory;
                if (this.projectName) {
                    this.serializer.isSavingHistory = false;
                    this.exportProject(this.projectName, shiftClicked);
                    this.serializer.isSavingHistory = savingHistory;
                } else {
                    this.prompt('Export Project As...', function (name) {
                        this.serializer.isSavingHistory = false;
                        this.exportProject(name, shiftClicked);
                        this.serializer.isSavingHistory = savingHistory;
                    }, null, 'exportProject');
                }
            },
            null,
            new Color(100, 0, 0)
        );
    }
    menu.addItem(
        shiftClicked ?
            'Export project as plain text...' : 'Export project...',
        () => {
            if (this.projectName) {
                this.exportProject(this.projectName, shiftClicked);
            } else {
                this.prompt(
                    'Export Project As...',
                    name => this.exportProject(name, shiftClicked),
                    null,
                    'exportProject'
                );
            }
        },
        'save project data as XML\nto your downloads folder',
        shiftClicked ? new Color(100, 0, 0) : null
    );

    if (this.stage.globalBlocks.length) {
        menu.addItem(
            'Export blocks...',
            () => this.exportGlobalBlocks(),
            'save global custom block\ndefinitions as XML'
        );
        if (SnapCloud.username) {
            menu.addItem(
                'Save blocks...',
                'createLibrary',
                'save custom blocks to the cloud as a library'
            );
        }
        menu.addItem(
            'Unused blocks...',
            () => this.removeUnusedBlocks(),
            'find unused global custom blocks' +
                '\nand remove their definitions'
        );
    }

    menu.addItem(
        'Export summary...',
        () => this.exportProjectSummary(),
        'save a summary\nof this project'
    );

    if (shiftClicked) {
        menu.addItem(
            'Export summary with drop-shadows...',
            () => this.exportProjectSummary(true),
            'download and save' +
                '\nwith a summary of this project' +
                '\nwith drop-shadows on all pictures.' +
                '\nnot supported by all browsers',
            new Color(100, 0, 0)
        );
        menu.addItem(
            'Export all scripts as pic...',
            () => this.exportScriptsPicture(),
            'show a picture of all scripts\nand block definitions',
            new Color(100, 0, 0)
        );
    }

    menu.addLine();
    menu.addItem(
        'Libraries...',
        () => {
            if (location.protocol === 'file:') {
                this.importLocalFile();
                return;
            }
            new LibraryDialogMorph(this).popUp(this.world());
        },
        'Select categories of additional blocks to add to this project.'
    );

    menu.addItem(
        localize(graphicsName) + '...',
        () => {
            if (location.protocol === 'file:') {
                this.importLocalFile();
                return;
            }
            this.importMedia(graphicsName);
        },
        'Select a costume from the media library'
    );
    menu.addItem(
        localize('Sounds') + '...',
        () => {
            if (location.protocol === 'file:') {
                this.importLocalFile();
                return;
            }
            this.importMedia('Sounds');
        },
        'Select a sound from the media library'
    );

    return menu;
};

IDE_Morph.prototype.replayEvents = function (actions, atEnd) {
    atEnd = !!atEnd;

    if (!actions) {  // If no actions, use current session
        atEnd = true;
        actions = JSON.parse(JSON.stringify(SnapUndo.allEvents));
    }
    this.replayControls.enable();
    this.replayControls.setActions(actions, atEnd);
    this.isReplayMode = true;

    // store the state of the undo queues (to detect the changed ones after)
    this.preReplayUndoState = {};
    var queueIds = SnapUndo.allQueueIds();
    for (var i = queueIds.length; i--;) {
        this.preReplayUndoState[queueIds[i]] = SnapUndo.undoCount[queueIds[i]];
    }
};

IDE_Morph.prototype.exitReplayMode = function () {
    if (this.isReplayMode) {
        this.isReplayMode = false;
        // only trim the undo queues for the queues that have changed
        var myself = this,
            allIds = SnapUndo.allQueueIds(),
            changedIds;

        changedIds = allIds.filter(function(id) {
            return myself.preReplayUndoState[id] !== SnapUndo.undoCount[id];
        });

        changedIds.forEach(function(id) {
            SnapUndo.trim(id);
        });

        SnapUndo.allEvents = this.replayControls.getCurrentHistory();
        this.activeEditor.onSetActive();
        this.replayControls.disable();
    }
};

IDE_Morph.prototype.resourceURL = function () {
    // Take in variadic inputs that represent an a nested folder structure.
    // Method can be easily overridden if running in a custom location.
    // Default Snap! simply returns a path (relative to snap.html)
    var args = Array.prototype.slice.call(arguments, 0);
    return args.join('/');
};

IDE_Morph.prototype.getMediaListFromURL = function (url, callback) {
    // Invoke the given callback with a list of files in a directory
    // based on the contents file.
    // If no callback is specified, synchronously return the list of files
    // Note: Synchronous fetching has been deprecated and should be switched
    var async = callback instanceof Function,
        data;

    function alphabetically(x, y) {
        return x.name.toLowerCase() < y.name.toLowerCase() ? -1 : 1;
    }

    if (async) {
        this.getURL(
            url,
            txt => {
                var data = this.parseResourceFile(txt);
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

IDE_Morph.prototype.getMediaList = function (dirname, callback) {
    var url = this.resourceURL(dirname, dirname.toUpperCase());
    return this.getMediaListFromURL.call(this, url, callback);
};

IDE_Morph.prototype.parseResourceFile = function (text) {
    // A Resource File lists all the files that could be loaded in a submenu
    // Examples are libraries/LIBRARIES, Costumes/COSTUMES, etc
    // The file format is tab-delimited, with unix newlines:
    // file-name, Display Name, Help Text (optional)
    var parts,
        items = [];

    text.split('\n').map(line =>
        line.trim()
    ).filter(line =>
        line.length > 0
    ).forEach(line => {
        parts = line.split('\t').map(str => str.trim());

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
        () => {
            document.body.removeChild(inp);
            this.filePicker = null;
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
    var msg = this.showMessage('Opening ' + folderName + '...');
    this.getMediaList(
        folderName,
        items => {
            msg.destroy();
            this.popupMediaImportDialog(folderName, items);
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
    dialog.addButton('cancel', 'Close');

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

        // refresh shadow
        this.removeShadow();
        this.addShadow();
    };

    items.forEach(item => {
        // Caution: creating very many thumbnails can take a long time!
        var url = this.resourceURL(folderName, item.fileName),
            img = new Image(),
            suffix = url.slice(url.lastIndexOf('.') + 1).toLowerCase(),
            isSVG = suffix === 'svg' && !MorphicPreferences.rasterizeSVGs,
            isSound = contains(['wav', 'mp3'], suffix),
            icon;

        if (isSound) {
            icon = new SoundIconMorph(new Sound(new Audio(), item.name));
        } else {
            icon = new CostumeIconMorph(
                new Costume(turtle.getImage(), item.name)
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
            this.getURL(
                url,
                txt => img.src = 'data:image/svg+xml;base64,' +
                    window.btoa(txt)
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

    aboutTxt = 'Snap! 6.2.0 - dev -\nBuild Your Own Blocks\n\n'
        + 'Copyright \u24B8 2008-2020 Jens M\u00F6nig and '
        + 'Brian Harvey\n'
        + 'jens@moenig.org, bh@cs.berkeley.edu\n\n'
        + '        Snap! is developed by the University of California, '
        + 'Berkeley and SAP        \n'
        + 'with support from the National Science Foundation (NSF),\n'
        + 'MIOsoft and YC Research.\n'
        + 'The design of Snap! is influenced and inspired by Scratch,\n'
        + 'from the Lifelong Kindergarten group at the MIT Media Lab\n\n'

        + 'for more information see https://snap.berkeley.edu';

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
        + '\nMichael Ball: Time/Date UI, Library Import Dialog,'
        + '\ncountless bugfixes and optimizations'
        + '\nBernat Romagosa: Countless contributions'
        + '\nBartosz Leper: Retina Display Support'
        + '\nZhenlei Jia and Dariusz Dorożalski: IME text editing'
        + '\nKen Kahn: IME support and countless other contributions'
        + '\nJosep Ferràndiz: Video Motion Detection'
        + '\nJoan Guillén: Countless contributions'
        + '\nKartik Chandra: Paint Editor'
        + '\nCarles Paredes: Initial Vector Paint Editor'
        + '\n"Ava" Yuan Yuan, Dylan Servilla: Graphic Effects'
        + '\nKyle Hotchkiss: Block search design'
        + '\nBrian Broll: Many bugfixes and optimizations'
        + '\nIan Reynolds: UI Design, Event Bindings, '
        + 'Sound primitives'
        + '\nJadga Hügle: Icons and countless other contributions'
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

    function txt(textString) {
        var tm = new TextMorph(
                textString,
                dlg.fontSize,
                dlg.fontStyle,
                true,
                false,
                'center',
                null,
                null,
                MorphicPreferences.isFlat ? null : new Point(1, 1),
                WHITE
            ),
            scroller,
            maxHeight = world.height() - dlg.titleFontSize * 10;
        if (tm.height() > maxHeight) {
            scroller = new ScrollFrameMorph();
            scroller.acceptsDrops = false;
            scroller.contents.acceptsDrops = false;
            scroller.bounds.setWidth(tm.width());
            scroller.bounds.setHeight(maxHeight);
            scroller.addContents(tm);
            scroller.color = new Color(0, 0, 0, 0);
            return scroller;
        }
        return tm;
    }

    dlg.inform('About Snap', aboutTxt, world, this.logo.cachedTexture);
    btn1 = dlg.buttons.children[0];
    translatorsBtn = dlg.addButton(
        () => {
            dlg.addBody(txt(translations));
            dlg.body.fixLayout();
            btn1.show();
            btn2.show();
            btn3.hide();
            btn4.hide();
            licenseBtn.hide();
            translatorsBtn.hide();
            dlg.fixLayout();
            dlg.setCenter(world.center());
        },
        'Translators...'
    );
    btn2 = dlg.addButton(
        () => {
            dlg.addBody(txt(aboutTxt));
            dlg.body.fixLayout();
            btn1.show();
            btn2.hide();
            btn3.show();
            btn4.show();
            licenseBtn.show();
            translatorsBtn.hide();
            dlg.fixLayout();
            dlg.setCenter(world.center());
        },
        'Back...'
    );
    btn2.hide();
    licenseBtn = dlg.addButton(
        () => {
            dlg.addBody(txt(noticeTxt));
            dlg.body.fixLayout();
            btn1.show();
            btn2.show();
            btn3.hide();
            btn4.hide();
            licenseBtn.hide();
            translatorsBtn.hide();
            dlg.fixLayout();
            dlg.setCenter(world.center());
        },
        'License...'
    );
    btn3 = dlg.addButton(
        () => {
            dlg.addBody(txt(versions));
            dlg.body.fixLayout();
            btn1.show();
            btn2.show();
            btn3.hide();
            btn4.hide();
            licenseBtn.hide();
            translatorsBtn.hide();
            dlg.fixLayout();
            dlg.setCenter(world.center());
        },
        'Modules...'
    );
    btn4 = dlg.addButton(
        () => {
            dlg.addBody(txt(creditsTxt));
            dlg.body.fixLayout();
            btn1.show();
            btn2.show();
            translatorsBtn.show();
            btn3.hide();
            btn4.hide();
            licenseBtn.hide();
            dlg.fixLayout();
            dlg.setCenter(world.center());
        },
        'Credits...'
    );
    translatorsBtn.hide();
    dlg.fixLayout();
};


IDE_Morph.prototype.editProjectNotes = function () {
    var dialog = new DialogBoxMorph().withKey('projectNotes'),
        frame = new ScrollFrameMorph(),
        text = new TextMorph(this.projectNotes || ''),
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
    frame.render = InputFieldMorph.prototype.render;
    frame.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;

    frame.addContents(text);

    dialog.getInput = () => text.text;

    dialog.target = this;

    dialog.action = (note) => this.projectNotes = note;

    dialog.justDropped = () => text.edit();

    dialog.labelString = 'Project Notes';
    dialog.createLabel();
    dialog.addBody(frame);
    dialog.addButton('ok', 'OK');
    dialog.addButton('cancel', 'Cancel');
    dialog.fixLayout();
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
    StageMorph.prototype.enablePenLogging = false;
    SpriteMorph.prototype.useFlatLineEnds = false;
    Process.prototype.enableLiveCoding = false;
    Process.prototype.enableHyperOps = true;
    this.setProjectName('');
    this.projectNotes = '';
    this.createStage();
    this.add(this.stage);
    this.createCorral();
    this.selectSprite(this.stage.children[0]);
    this.fixLayout();
};

IDE_Morph.prototype.isPreviousVersion = function () {
    if (!this.isReplayMode) return false;

    var newHistoryLen = this.replayControls.actionIndex + 1,
        lostEventCount = SnapUndo.allEvents.filter(function(event) {
            return !event.isReplay;
        }).length - newHistoryLen;

    return lostEventCount > 0;
};

IDE_Morph.prototype.saveAs = function () {
    if (this.isPreviousVersion()) {
        return this.showMessage('Please exit replay mode before saving');
    }

    this.saveProjectsBrowser();
};

IDE_Morph.prototype.save = function () {
    if (this.isPreviousVersion()) {
        return this.showMessage('Please exit replay mode before saving');
    }

    if (this.source === 'examples') {
        // cannot save to examples
        this.source = 'local';
    }

    // temporary hack - only allow exporting projects to disk
    // when running Snap! locally without a web server
    if (location.protocol === 'file:') {
        if (this.projectName) {
            this.exportProject(this.projectName, false);
        } else {
            this.prompt(
                'Export Project As...',
                name => this.exportProject(name, false),
                null,
                'exportProject'
            );
        }
        return;
    }

    if (this.room.name) {
        if (this.source === 'local') { // as well as 'examples'
            this.saveProject(this.room.name);
        } else { // 'cloud'
            this.saveProjectToCloud(this.room.name);
        }
    } else {
        this.saveProjectsBrowser();
    }
};

IDE_Morph.prototype.saveProject = function (name) {
    this.nextSteps([
        () => this.showMessage('Saving...'),
        () => this.rawSaveProject(name)
    ]);
};

// Serialize a project and save to the browser.
IDE_Morph.prototype.rawSaveProject = function (name) {
    var str;
    if (name) {
        this.setProjectName(name);
        if (Process.prototype.isCatchingErrors) {
            try {
                localStorage['-snap-project-' + name]
                    = str = this.serializer.serialize(this.stage);
                this.setURL('#open:' + str);
                this.showMessage('Saved!', 1);
            } catch (err) {
                this.showMessage('Save failed: ' + err);
            }
        } else {
            localStorage['-snap-project-' + name]
                = str = this.serializer.serialize(this.stage);
            this.setURL('#open:' + str);
            this.showMessage('Saved!', 1);
        }
    }
};

IDE_Morph.prototype.exportProject = function (name, plain) {
    // Export project XML, saving a file to disk
    // newWindow requests displaying the project in a new tab.
    var menu, str, dataPrefix;

    if (name) {
        var currentName = this.projectName;
        this.silentSetProjectName(name);
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
        this.silentSetProjectName(currentName);
    }
};

IDE_Morph.prototype.exportGlobalBlocks = function () {
    if (this.stage.globalBlocks.length > 0 || this.stage.deletableMessageNames().length) {
        new BlockExportDialogMorph(
            this.serializer,
            this.stage.globalBlocks,
            this.stage,
            (str, name) => this.saveXMLAs(str, name)
        ).popUp(this.world());
    } else {
        this.inform(
            'Export blocks/msg types',
            'this project doesn\'t have any\n'
                + 'custom global blocks or message types yet'
        );
    }
};

IDE_Morph.prototype.createLibrary = function () {
    if (this.stage.globalBlocks.length > 0 || this.stage.deletableMessageNames().length) {
        const dialog = new BlockExportDialogMorph(
            this.serializer,
            this.stage.globalBlocks,
            this.stage,
            async (libraryXML, name) => {
                const notes = await this.promptLibraryNotes();
                new LibraryDialogMorph(this, name, libraryXML, notes).popUp(this.world());  // FIXME: Remove
            }
        );
        dialog.labelString = 'Save blocks / message types';
        dialog.createLabel();
        dialog.fixLayout();
        dialog.popUp(this.world());
    } else {
        this.inform(
            'Export blocks/msg types',
            'this project doesn\'t have any\n'
                + 'custom global blocks or message types yet'
        );
    }
};

IDE_Morph.prototype.promptLibraryNotes = function () {
    const deferred = utils.defer();
    var dialog = new DialogBoxMorph().withKey('libraryNotes'),
        frame = new ScrollFrameMorph(),
        text = new TextMorph(''),
        ok = dialog.ok,
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
    frame.render = InputFieldMorph.prototype.render;
    frame.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;

    frame.addContents(text);

    dialog.ok = function () {
        deferred.resolve(text.text);
        ok.call(this);
    };

    dialog.justDropped = () => text.edit();

    dialog.labelString = 'Library Notes';
    dialog.createLabel();
    dialog.addBody(frame);
    dialog.addButton('ok', 'OK');
    dialog.addButton('cancel', 'Cancel');
    dialog.fixLayout();
    dialog.popUp(world);
    dialog.setCenter(world.center());
    text.edit();
    return deferred.promise;
};


IDE_Morph.prototype.removeUnusedBlocks = function () {
    var targets = this.sprites.asArray().concat([this.stage]),
        globalBlocks = this.stage.globalBlocks,
        unused = [],
        isDone = false,
        found;

    function scan() {
        return globalBlocks.filter(def => {
            if (contains(unused, def)) {return false; }
            return targets.every((each, trgIdx) =>
                !each.usesBlockInstance(def, true, trgIdx, unused)
            );
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
    var isSavingHistory = this.serializer.isSavingHistory,
        str;

    this.serializer.isSavingHistory = false;
    str = this.serializer.serialize(sprite.allParts());
    this.serializer.isSavingHistory = isSavingHistory;

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
    this.sprites.asArray().forEach(sprite => {
        pics.push(sprite.getImage());
        pics.push(sprite.scripts.scriptsPicture());
        sprite.customBlocks.forEach(def =>
            pics.push(def.scriptsPicture())
        );
    });
    pics.push(this.stage.getImage());
    pics.push(this.stage.scripts.scriptsPicture());
    this.stage.customBlocks.forEach(def =>
        pics.push(def.scriptsPicture())
    );

    // collect global block pics
    this.stage.globalBlocks.forEach(def =>
        pics.push(def.scriptsPicture())
    );

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
            names.forEach(name => {
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
                img = addImage(watcher.fullImage(), li);
                img.attributes.class = 'script';
            });
        }
    }

    function addBlocks(definitions) {
        if (definitions.length) {
            add(localize('Blocks'), 'h3');
            SpriteMorph.prototype.categories.forEach(category => {
                var isFirst = true,
                    ul;
                definitions.forEach(def => {
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
                        def.sortedElements().forEach(script => {
                            var defImg = addImage(
                                script instanceof BlockMorph ?
                                        script.scriptPic()
                                                : script.fullImage(),
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
    notes.asArray().forEach(paragraph => add(paragraph));

    // table of contents
    add(localize('Contents'), 'h4');
    toc = addNode('ul');

    // sprites & stage
    this.sprites.asArray().concat([stage]).forEach(sprite => {
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
                sprite.parts.forEach(part => {
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
            sprite.costumes.asArray().forEach(costume => {
                var li = addNode('li', ol, costume.name);
                addImage(costume.thumbnail(new Point(40, 40)), li, true)
                    .attributes.class = 'toc';
            });
        }

        // sounds
        if (sprite.sounds.length()) {
            add(localize('Sounds'), 'h3');
            ol = addNode('ol');
            sprite.sounds.asArray().forEach(sound =>
                add(sound.name, 'li', ol)
            );
        }

        // variables
        addVariables(sprite.variables);

        // scripts
        if (scripts.length) {
            add(localize('Scripts'), 'h3');
            scripts.forEach(script => {
                var img = addImage(script instanceof BlockMorph ?
                        script.scriptPic()
                                : script.fullImage());
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
    var msg;

    this.exitReplayMode();
    this.nextSteps([
        () => msg = this.showMessage('Opening project...'),
        () => SnapActions.openProject(str).then(() => msg.destroy()),
    ]);
};

IDE_Morph.prototype.rawOpenProjectString = function (str) {
    var project;

    this.toggleAppMode(false);
    this.spriteBar.tabBar.tabTo('scripts');
    StageMorph.prototype.hiddenPrimitives = {};
    StageMorph.prototype.codeMappings = {};
    StageMorph.prototype.codeHeaders = {};
    StageMorph.prototype.enableCodeMapping = false;
    StageMorph.prototype.enableInheritance = true;
    StageMorph.prototype.enableSublistIDs = false;
    StageMorph.prototype.enablePenLogging = false;
    Process.prototype.enableLiveCoding = false;
    if (Process.prototype.isCatchingErrors) {
        try {
            project = this.serializer.openProject(
                this.serializer.load(str, this),
                this
            );
        } catch (err) {
            this.showMessage('Load failed: ' + err);
        }
    } else {
        project = this.serializer.openProject(
            this.serializer.load(str, this),
            this
        );
    }
    this.stopFastTracking();
    return project;
};

IDE_Morph.prototype.openCloudDataString = function (str) {
    const size = Math.round(str.length / 1024);

    this.exitReplayMode();
    const msg = this.showMessage('Opening project\n' + size + ' KB...');
    return SnapActions.openProject(str)
        .then(() => msg.destroy());
};

IDE_Morph.prototype.rawOpenCloudDataString = function (str) {
    var model,
        project;
    StageMorph.prototype.hiddenPrimitives = {};
    StageMorph.prototype.codeMappings = {};
    StageMorph.prototype.codeHeaders = {};
    StageMorph.prototype.enableCodeMapping = false;
    StageMorph.prototype.enableInheritance = true;
    StageMorph.prototype.enableSublistIDs = false;
    StageMorph.prototype.enablePenLogging = false;
    Process.prototype.enableLiveCoding = false;
    SnapActions.disableCollaboration();
    SnapUndo.reset();
    if (Process.prototype.isCatchingErrors) {
        try {
            model = this.serializer.parse(str);
            this.serializer.loadMediaModel(model.childNamed('media'));
            project = this.serializer.openProject(
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
        project = this.serializer.openProject(
            this.serializer.loadProjectModel(
                model.childNamed('project'),
                this,
                model.attributes.remixID
            ),
            this
        );
    }
    this.stopFastTracking();
    return project;
};

IDE_Morph.prototype.uniqueIdForImport = function (str, name, callback) {
    var msg,
        myself = this;

    this.nextSteps([
        function () { nop(); }, // yield (bug in Chrome)
        function () {
            var model = myself.serializer.parse(str),
                children = model.allChildren();

            // Just add an id to everything... not the most efficient but effective for now
            for (var i = children.length; i--;) {
                if (children[i].attributes) {
                    children[i].attributes.collabId = SnapActions.newId();
                }
            }

            callback(model.toString());

        }
    ]);
};

IDE_Morph.prototype.openBlocksString = function (str, name, silently) {
    var msg;
    this.nextSteps([
        () => msg = this.showMessage('Opening blocks...'),
        () => {
            this.rawOpenBlocksString(str, name, silently);
            msg.destroy();
        }
    ]);
};

IDE_Morph.prototype.rawOpenBlocksString = function (str, name, silently) {
    // name is optional (string), so is silently (bool)
    var blocks;
    if (Process.prototype.isCatchingErrors) {
        try {
            blocks = this.serializer.loadBlocks(str, this.stage);
        } catch (err) {
            this.showMessage('Load failed: ' + err);
        }
    } else {
        blocks = this.serializer.loadBlocks(str, this.stage);
    }
    if (silently) {
        this.importCustomBlocks(blocks, name);
    } else {
        new BlockImportDialogMorph(blocks, this.stage, name).popUp();
    }
    return blocks;
};

IDE_Morph.prototype.importCustomBlocks = function (blocks, name) {
    var myself = this;

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
    SnapActions.loadCustomBlocks(blocks);
};

IDE_Morph.prototype.openSpritesString = function (str) {
    var msg;
    this.nextSteps([
        () => msg = this.showMessage('Opening sprite...'),
        () => {
            this.rawOpenSpritesString(str);
            msg.destroy();
        },
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
    var msg;
    return new Promise(resolve => {
        this.nextSteps([
            () => msg = this.showMessage('Opening script...'),
            () => {
                const script = this.rawOpenScriptString(str);
                msg.destroy();
                resolve(script);
            },
        ]);
    });
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
    return script;
};

IDE_Morph.prototype.openDataString = async function (str, name, type) {
    const msg = this.showMessage(localize('Opening data...'));
    await utils.sleep();
    await this.rawOpenDataString(str, name, type);
    msg.destroy();
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

    return SnapActions.addVariable(vName, true).then(() => {
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
    });
};


IDE_Morph.prototype.openProject = function (name) {
    var str;
    if (name) {
        this.showMessage('opening project\n' + name);
        this.setProjectName(name);
        str = localStorage['-snap-project-' + name];
        SnapActions.disableCollaboration();
        SnapUndo.reset();
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
    world.reactToDropOf = (morph) => {
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
};

IDE_Morph.prototype.flushPaletteCache = function (category) {
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
};

IDE_Morph.prototype.toggleZebraColoring = function () {
    var scripts = [];

    if (!BlockMorph.prototype.zebraContrast) {
        BlockMorph.prototype.zebraContrast = 40;
    } else {
        BlockMorph.prototype.zebraContrast = 0;
    }

    // select all scripts:
    this.stage.children.concat(this.stage).forEach(morph => {
        if (isSnapObject(morph)) {
            scripts = scripts.concat(
                morph.scripts.children.filter(morph =>
                    morph instanceof BlockMorph
                )
            );
        }
    });

    // force-update all scripts:
    scripts.forEach(topBlock =>
        topBlock.fixBlockColor(null, true)
    );
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
    SnapUndo.reset();
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

    if (this.isAppMode) {
		this.wasSingleStepping = Process.prototype.enableSingleStepping;
		if (this.wasSingleStepping) {
     		this.toggleSingleStepping();
    	}
        this.setColor(this.appModeColor);
        this.controlBar.setColor(this.color);
        this.controlBar.appModeButton.refresh();
        elements.forEach(e =>
            e.hide()
        );
        world.children.forEach(morph => {
            if (morph instanceof DialogBoxMorph) {
                morph.hide();
            }
        });
        if (world.keyboardFocus instanceof ScriptFocusMorph) {
            world.keyboardFocus.stopEditing();
        }
    } else {
        if (this.wasSingleStepping && !Process.prototype.enableSingleStepping) {
             this.toggleSingleStepping();
        }
        this.setColor(this.backgroundColor);
        this.controlBar.setColor(this.frameColor);
        elements.forEach(e =>
            e.show()
        );
        this.stage.setScale(1);
        // show all hidden dialogs
        world.children.forEach(morph => {
            if (morph instanceof DialogBoxMorph) {
                morph.show();
            }
        });
        // prevent scrollbars from showing when morph appears
        world.allChildren().filter(c =>
            c instanceof ScrollFrameMorph
        ).forEach(s =>
            s.adjustScrollBars()
        );
        // prevent rotation and draggability controls from
        // showing for the stage
        if (this.currentSprite === this.stage) {
            this.spriteBar.children.forEach(child => {
                if (child instanceof PushButtonMorph) {
                    child.hide();
                }
            });
        }
        this.currentSprite.scripts.updateToolbar();
    }
    this.setExtent(this.world().extent()); // resume trackChanges
    // check for mobilemode
    if (this.isMobileDevice() && this.isAppMode) {
        this.mobileMode.init();
    }

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
};

IDE_Morph.prototype.setPaletteWidth = function (newWidth) {
    var msecs = this.isAnimating ? 100 : 0,
        world = this.world();

    world.animations.push(new Animation(
        newWidth => {
            this.paletteWidth = newWidth;
            this.setExtent(world.extent());
        },
        () => this.paletteWidth,
        newWidth - this.paletteWidth,
        msecs
    ));
};

IDE_Morph.prototype.createNewProject = function () {
    this.confirm(
        'Replace the current project with a new one?',
        'New Project',
        () => {
            this.exitReplayMode();
            SnapActions.disableCollaboration();
            SnapUndo.reset();
            this.newProject();
        }
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
    new ProjectDialogMorph(this, 'open').popUp(this.world());
};

IDE_Morph.prototype.saveProjectsBrowser = function () {
    // temporary hack - only allow exporting projects to disk
    // when running Snap! locally without a web server
    if (location.protocol === 'file:') {
        this.prompt(
            'Export Project As...',
            name => this.exportProject(name, false),
            null,
            'exportProject'
        );
        return;
    }

    if (this.source === 'examples') {
        this.source = null; // cannot save to examples
    }
    new ProjectDialogMorph(this, 'save').popUp(this.world());
};

// IDE_Morph microphone settings

IDE_Morph.prototype.microphoneMenu = function () {
    var menu = new MenuMorph(this),
        world = this.world(),
        pos = this.controlBar.settingsButton.bottomLeft(),
        resolutions = ['low', 'normal', 'high', 'max'],
        microphone = this.stage.microphone,
        tick = new SymbolMorph(
            'tick',
            MorphicPreferences.menuFontSize * 0.75
        ),
        on = new SymbolMorph(
            'checkedBox',
            MorphicPreferences.menuFontSize * 0.75
        ),
        empty = tick.fullCopy();

    empty.render = nop;
    if (microphone.isReady) {
        menu.addItem(
            [
                on,
                localize('Microphone')
            ],
            () => microphone.stop()
        );
        menu.addLine();
    }
    resolutions.forEach((res, i) => {
        menu.addItem(
            [
                microphone.resolution === i + 1 ? tick : empty,
                localize(res)
            ],
            () => microphone.setResolution(i + 1)
        );
    });
    menu.popup(world, pos);
};

// IDE_Morph localization

IDE_Morph.prototype.languageMenu = function () {
    var menu = new MenuMorph(this),
        world = this.world(),
        pos = this.controlBar.settingsButton.bottomLeft(),
        tick = new SymbolMorph(
            'tick',
            MorphicPreferences.menuFontSize * 0.75
        ),
        empty = tick.fullCopy();

    empty.render = nop;
    SnapTranslator.languages().forEach(lang =>
        menu.addItem(
            [
                SnapTranslator.language === lang ? tick : empty,
                SnapTranslator.languageName(lang)
            ],
            () => {
                this.loadNewProject = false;
                this.setLanguage(lang);
            }
        )
    );
    menu.popup(world, pos);
};

IDE_Morph.prototype.setLanguage = function (lang, callback, noSave) {
    var translation = document.getElementById('language'),
        src = this.resourceURL('locale', 'lang-' + lang + '.js');
    SnapTranslator.unload();
    if (translation) {
        document.head.removeChild(translation);
    }
    if (lang === 'en') {
        return this.reflectLanguage('en', callback, noSave);
    }
    translation = document.createElement('script');
    translation.id = 'language';
    translation.onload = () => this.reflectLanguage(lang, callback, noSave);
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
        SnapUndo.reset();
        this.openProjectString(projectData);
    }
    if (!noSave) {
        this.saveSetting('language', lang);
    }
    if (callback) {callback.call(this); }
};

// IDE_Morph blocks scaling

IDE_Morph.prototype.userSetBlocksScale = function () {
    var scrpt,
        blck,
        shield,
        sample,
        action,
        dlg;

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
    if (SyntaxElementMorph.prototype.alpha > 0.8) {
        sample.cachedTexture = this.scriptsPaneTexture;
    }
    sample.setExtent(new Point(250, 180));
    scrpt.setPosition(sample.position().add(10));
    sample.add(scrpt);

    shield = new Morph();
    shield.alpha = 0;
    shield.setExtent(sample.extent());
    shield.setPosition(sample.position());
    sample.add(shield);

    action = (num) => {
        scrpt.blockSequence().forEach(block => {
            block.setScale(num);
            block.setSpec(block.blockSpec);
        });
        scrpt.fullChanged();
    };

    dlg = new DialogBoxMorph(
        null,
        num => this.setBlocksScale(Math.min(num, 12))
    ).withKey('zoomBlocks');
    if (MorphicPreferences.isTouchDevice) {
        dlg.isDraggable = false;
    }
    dlg.prompt(
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

// IDE_Morph blocks fading

IDE_Morph.prototype.userFadeBlocks = function () {
    var dlg,
        initial = 100 - (SyntaxElementMorph.prototype.alpha * 100);

    dlg = new DialogBoxMorph(
        null,
        num => this.setBlockTransparency(num, true) // and save setting
    ).withKey('fadeBlocks');
    if (MorphicPreferences.isTouchDevice) {
        dlg.isDraggable = false;
    }

    dlg.cancel = () => {
        this.setBlockTransparency(initial);
        dlg.destroy();
    };

    dlg.prompt(
        'Fade blocks',
        initial.toString(),
        this.world(),
        null, // pic
        {
            'block-solid (0)' : 0,
            'medium (50)' : 50,
            'light (70)' : 70,
            'shimmering (80)' : 80,
            'elegant (90)' : 90,
            'subtle (95)' : 95,
            'text-only (100)' : 100
        },
        false, // read only?
        true, // numeric
        0, // slider min
        100, // slider max
        num => this.setBlockTransparency(num), // slider action
        0 // decimals
    );
};

IDE_Morph.prototype.setBlockTransparency = function (num, save) {
    SyntaxElementMorph.prototype.setAlphaScaled(100 - num);
    this.changed();
    if (save) {
        if (num === 0) {
            this.removeSetting('fade');
        } else {
            this.saveSetting('fade', num);
        }
    }
};

// IDE_Morph stage size manipulation

IDE_Morph.prototype.userSetStageSize = function () {
    new DialogBoxMorph(
        this,
        function(point) {
            SnapActions.setStageSize(point.x, point.y);
        },
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
        num => MorphicPreferences.grabThreshold = Math.min(
            Math.max(+num, 0),
            200
        ),
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

IDE_Morph.prototype.initializeCloudWithSnap = function () {
    var world = this.world();
    new DialogBoxMorph(
        null,
        async user => {
            try {
                await this.cloud.login(
                    user.username.toLowerCase(),
                    user.password,
                    user.choice,
                    'Snap!'
                );
                //sessionStorage.username = username;
                this.controlBar.cloudButton.refresh();
                this.source = 'cloud';

                const {username, strategy} = this.cloud;
                let msg = localize('Logged in as ') + username;
                if (strategy) {
                    msg += ` (using ${strategy})`;
                }

                this.showMessage(msg, 2);
            } catch (err) {
                this.cloudError()(err.message);
            }
        }
    ).withKey('cloudlogin').promptCredentials(
        'Sign in with Snap!',
        'login',
        null,
        null,
        null,
        null,
        'stay signed in on this computer\nuntil logging out',
        world,
        this.cloudIcon(),
        this.cloudMsg
    );
};

IDE_Morph.prototype.initializeCloud = function () {
    var world = this.world();
    new DialogBoxMorph(
        null,
        async user => {
            try {
                const pwh = hex_sha512(user.password);
                await this.cloud.login(
                    user.username,
                    pwh,
                    user.choice,
                );
                const {username} = this.cloud;
                sessionStorage.username = username;
                this.controlBar.cloudButton.refresh();
                this.source = 'cloud';
                Services.fetchHosts();
                let msg = localize('Logged in as ') + username;
                this.showMessage(msg, 2);
            } catch (err) {
                this.cloudError()(err.message);
            }
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
        this.cloudIcon(),
        this.cloudMsg
    );
};

IDE_Morph.prototype.createCloudAccount = function () {
    var world = this.world();

    new DialogBoxMorph(
        null,
        user => this.cloud.signup(
            user.username,
            user.email,
            (txt, title) => new DialogBoxMorph().inform(
                title,
                txt +
                    '.\n\nAn e-mail with your password\n' +
                    'has been sent to the address provided',
                world,
                this.cloudIcon(null, new Color(0, 180, 0))
            ),
            this.cloudError()
        )
    ).withKey('cloudsignup').promptCredentials(
        'Sign up',
        'signup',
        '/tos.html',
        'Terms of Service...',
        '/privacy.html',
        'Privacy...',
        'I have read and agree\nto the Terms of Service',
        world,
        this.cloudIcon(),
        this.cloudMsg
    );
};

IDE_Morph.prototype.promptExitReplay = function (onExit) {
    var myself = this;
    this.confirm(
        'The given action cannot be applied while in replay mode. \n' +
        'Would you like to exit replay mode?',
        'Exit Replay?',
        function() {
            myself.exitReplayMode();
            onExit();
        }
    );
};

IDE_Morph.prototype.resetCloudPassword = function () {
    var world = this.world();

    new DialogBoxMorph(
        null,
        user => this.cloud.resetPassword(
            user.username,
            (txt, title) => new DialogBoxMorph().inform(
                title,
                txt +
                    '\n\nAn e-mail with a link to\n' +
                    'reset your password\n' +
                    'has been sent to the address provided',
                world,
                this.cloudIcon(null, new Color(0, 180, 0))
            ),
            this.cloudError()
        )
    ).withKey('cloudresetpassword').promptCredentials(
        'Reset password',
        'resetPassword',
        null,
        null,
        null,
        null,
        null,
        world,
        this.cloudIcon(),
        this.cloudMsg
    );
};

IDE_Morph.prototype.resendVerification = function () {
    var world = this.world();

    new DialogBoxMorph(
        null,
        user => this.cloud.resendVerification(
            user.username,
            (txt, title) => new DialogBoxMorph().inform(
                title,
                txt,
                world,
                this.cloudIcon(null, new Color(0, 180, 0))
            ),
            this.cloudError()
        )
    ).withKey('cloudresendverification').promptCredentials(
        'Resend verification email',
        'resendVerification',
        null,
        null,
        null,
        null,
        null,
        world,
        this.cloudIcon(),
        this.cloudMsg
    );
};

IDE_Morph.prototype.changeCloudPassword = function () {
    var world = this.world();

    new DialogBoxMorph(
        null,
        user => this.cloud.changePassword(
            user.oldpassword,
            user.password,
            () => this.showMessage('password has been changed.', 2),
            this.cloudError()
        )
    ).withKey('cloudpassword').promptCredentials(
        'Change Password',
        'changePassword',
        null,
        null,
        null,
        null,
        null,
        world,
        this.cloudIcon(),
        this.cloudMsg
    );
};

IDE_Morph.prototype.logout = function () {
    this.cloud.logout(
        () => {
            delete(sessionStorage.username);
            this.controlBar.cloudButton.refresh();
            this.showMessage('disconnected.', 2);
        },
        () => {
            delete(sessionStorage.username);
            this.controlBar.cloudButton.refresh();
            this.showMessage('disconnected.', 2);
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
    const contentName = this.room.hasMultipleRoles() ?
        this.room.getCurrentRoleName() : this.room.name;

    if (name) {
        this.showMessage('Saving ' + contentName + '\nto the cloud...');
        this.room.name = name;
        SnapCloud.saveProject(
            this,
            result => {
                if (result.name) {
                    this.room.silentSetRoomName(result.name);
                }
                this.showMessage('Saved ' + contentName + ' to the cloud!', 2);
            },
            this.cloudSaveError()
        );
    }
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
    var menu, str, media, replay, dta;
    this.serializer.isCollectingMedia = true;
    if (name) {
        this.setProjectName(name);
        if (Process.prototype.isCatchingErrors) {
            try {
                menu = this.showMessage('Exporting');
                str = this.serializer.serialize(this.stage);
                media = this.serializer.mediaXML(name);
                replay = this.serializer.replayHistory();
                dta = '<snapdata>' + str + replay + media + '</snapdata>';
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
            replay = this.serializer.replayHistory();
            dta = '<snapdata>' + str + replay + media + '</snapdata>';
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
    return (responseText, url) => {
        nop(responseText);
        new DialogBoxMorph().inform(
            'Cloud Connection',
            'Successfully connected to:\n'
                + 'http://'
                + url,
            this.world(),
            this.cloudIcon(null, new Color(0, 180, 0))
        );
    };
};

IDE_Morph.prototype.cloudResponse = function () {
    return (responseText, url) => {
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
            this.world(),
            this.cloudIcon(null, new Color(0, 180, 0))
        );
    };
};

IDE_Morph.prototype.cloudError = function () {
    return (responseText, url) => {
        // first, try to find out an explanation for the error
        // and notify the user about it,
        // if none is found, show an error dialog box
        var response = responseText,
            // explanation = getURL('https://snap.berkeley.edu/cloudmsg.txt'),
            explanation = null;
        if (this.shield) {
            this.shield.destroy();
            this.shield = null;
        }
        if (explanation) {
            this.showMessage(explanation);
            return;
        }
        new DialogBoxMorph().inform(
            'NetsBlox Cloud',
            (url ? url + '\n' : '')
                + response,
            this.world(),
            this.cloudIcon(null, new Color(180, 0, 0))
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
    new DialogBoxMorph(
        null,
        url => {
            this.cloud.url = url;
            this.cloud.checkCredentials(
                () => this.controlBar.cloudButton.refresh(),
                () => this.controlBar.cloudButton.refresh()
            );
        }
    ).withKey('cloudURL').prompt(
        'Cloud URL',
        this.cloud.url,
        this.world(),
        null,
        this.cloud.knownDomains
    );
};

IDE_Morph.prototype.urlParameters = function () {
    var parameters = location.hash.slice(location.hash.indexOf(':') + 1);
    return this.cloud.parseDict(parameters);
};

IDE_Morph.prototype.hasCloudProject = function () {
    var params = this.urlParameters();
    return params.hasOwnProperty('Username') &&
        params.hasOwnProperty('ProjectName');
};

// IDE_Morph HTTP data fetching

IDE_Morph.prototype.getURL = function (url, callback, responseType) {
    // fetch the contents of a url and pass it into the specified callback.
    // If no callback is specified synchronously fetch and return it
    // Note: Synchronous fetching has been deprecated and should be switched
    var request = new XMLHttpRequest(),
        async = callback instanceof Function,
        rsp;
    if (async) {
        request.responseType = responseType || 'text';
    }
    rsp = (!async || request.responseType === 'text') ? 'responseText'
        : 'response';
    try {
        request.open('GET', url, async);
        if (async) {
            request.onreadystatechange = () => {
                if (request.readyState === 4) {
                    if (request[rsp]) {
                        callback.call(
                            this,
                            request[rsp]
                        );
                    } else {
                        this.showMessage('unable to retrieve ' + url);
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
        this.showMessage(err.toString());
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
        intervalHandle = setInterval(
            () => {
                m.destroy();
                clearInterval(intervalHandle);
            },
            secs * 1000
        );
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
    var isPromisified = !action,
        deferred;

    if (isPromisified) {
        deferred = utils.defer();
        action = deferred.resolve.bind(null, true);
    }

    const dialog = new DialogBoxMorph(null, action);
    dialog.askYesNo(
        title,
        localize(message),
        this.world()
    );

    if (isPromisified) {
        dialog.cancel = () => {
            deferred.resolve(false);
            dialog.destroy();
        };
        return deferred.promise;
    }
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

// IDE_Morph bracing against IE

IDE_Morph.prototype.warnAboutIE = function () {
    var dlg, txt;
    if (this.isIE()) {
        dlg = new DialogBoxMorph();
        txt = new TextMorph(
            'Please do not use Internet Explorer.\n' +
                'Snap! runs best in a web-standards\n' +
                'compliant browser',
            dlg.fontSize,
            dlg.fontStyle,
            true,
            false,
            'center',
            null,
            null,
            MorphicPreferences.isFlat ? null : new Point(1, 1),
            WHITE
        );

        dlg.key = 'IE-Warning';
        dlg.labelString = "Internet Explorer";
        dlg.createLabel();
        dlg.addBody(txt);
        dlg.fixLayout();
        dlg.popUp(this.world());
    }
};

IDE_Morph.prototype.isIE = function () {
    var ua = navigator.userAgent;
    return ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
};

// SaveOpenDialogMorphSource ////////////////////////////////////////////////////

SaveOpenDialogMorphSource.prototype.constructor = SaveOpenDialogMorphSource;

function SaveOpenDialogMorphSource (name, icon, id) {
    this.init(name, icon, id);
}

SaveOpenDialogMorphSource.prototype.init = function(name, icon, id) {
    this.name = name;
    this.icon = icon;
    this.id = id || name.toLowerCase();
};

SaveOpenDialogMorphSource.prototype.canPublish = function() {
    return this.can('publish');
};

SaveOpenDialogMorphSource.prototype.canDelete = function() {
    return this.can('delete');
};

SaveOpenDialogMorphSource.prototype.can = function(task) {
    return this[task] !== SaveOpenDialogMorphSource.prototype[task];
};

SaveOpenDialogMorphSource.prototype.delete = function(/*item*/) {
    throw new Error(localize('Cannot delete projects from the ') + localize(this.name));
};

SaveOpenDialogMorphSource.prototype.publish = function(/*item, public*/) {
    throw new Error(localize('Cannot publish projects to the ') + localize(this.name));
};

SaveOpenDialogMorphSource.prototype.save = function(/*item*/) {
    throw new Error(localize('Cannot save projects to the ') + localize(this.name));
};

SaveOpenDialogMorphSource.prototype.getPreview = function(/*item*/) {
    throw new Error(localize('Cannot get project preview from the ') + localize(this.name));
};

SaveOpenDialogMorphSource.prototype.getContent = function(/*item*/) {
    throw new Error(localize('Cannot get content from the ') + localize(this.name));
};

// SaveOpenDialogMorph ////////////////////////////////////////////////////

// SaveOpenDialogMorph inherits from DialogBoxMorph:

SaveOpenDialogMorph.prototype = new DialogBoxMorph();
SaveOpenDialogMorph.prototype.constructor = SaveOpenDialogMorph;
SaveOpenDialogMorph.uber = DialogBoxMorph.prototype;

function SaveOpenDialogMorph() {
}

SaveOpenDialogMorph.prototype.init = function (task, itemName, sources, source, currentData) {
    var myself = this;

    // additional properties:
    this.task = task || 'open'; // String describing what do do (open, save)
    this.sources = sources.filter(source => source.can(this.task));
    this.source = source || this.sources[0]; // or 'cloud' or 'examples'
    this.itemsList = []; // [{name: , thumb: , notes:}]
    this.itemName = itemName;

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
    SaveOpenDialogMorph.uber.init.call(
        this,
        this, // target
        null, // function
        null // environment
    );

    // override inherited properites:
    this.labelString = this.task === 'save' ? 'Save ' + itemName : 'Open ' + itemName;
    this.createLabel();
    this.key = task + itemName;

    // build contents
    this.buildContents(currentData);
    this.onNextStep = function () { // yield to show "updating" message
        myself.setSource(myself.source);
    };
};

SaveOpenDialogMorph.prototype.buildContents = function (currentData) {
    var baseSize = new Point(455, 146);

    this.addBody(new Morph());
    this.body.color = this.color;

    this.srcBar = new AlignmentMorph('column', this.padding / 2);

    this.sources.forEach(source => {
        const button = this.addSourceButton(source);
        baseSize.y += button.height();
    });
    const minHeight = 335;
    baseSize.y = Math.max(baseSize.y, minHeight);
    if (this.task === 'open') {
        this.buildFilterField();  // Why is it doing this here?
    }

    this.srcBar.fixLayout();
    this.body.add(this.srcBar);

    if (this.task === 'save') {
        const {name} = currentData;
        this.nameField = new InputFieldMorph(name);
        this.body.add(this.nameField);
    }

    this.listField = new ListMorph([]);
    this.fixListFieldItemColors();
    this.listField.fixLayout = nop;
    this.listField.edge = InputFieldMorph.prototype.edge;
    this.listField.fontSize = InputFieldMorph.prototype.fontSize;
    this.listField.typeInPadding = InputFieldMorph.prototype.typeInPadding;
    this.listField.contrast = InputFieldMorph.prototype.contrast;
    this.listField.render = InputFieldMorph.prototype.render;
    this.listField.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;

    this.body.add(this.listField);

    this.initPreview();

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

    if (this.task === 'open') {
        this.notesText = new TextMorph('');
    } else { // 'save'
        const {notes} = currentData;
        this.notesText = new TextMorph(notes);
        this.notesText.isEditable = true;
        this.notesText.enableSelecting();
    }

    this.notesField.isTextLineWrapping = true;
    this.notesField.padding = 3;
    this.notesField.setContents(this.notesText);
    this.notesField.setWidth(this.preview.width());

    this.body.add(this.notesField);

    if (this.task === 'open') {
        this.addButton('openItem', 'Open');
        this.action = 'openItem';
    } else { // 'save'
        this.addButton('trySaveItem', 'Save');
        this.action = 'trySaveItem';
    }
    this.shareButton = this.addButton('shareItem', 'Share');
    this.unshareButton = this.addButton('unshareItem', 'Unshare');
    this.shareButton.hide();
    this.unshareButton.hide();
    this.deleteButton = this.addButton('deleteItem', 'Delete');
    this.addButton('cancel', 'Cancel');

    this.setExtent(baseSize);
    this.fixLayout();
};

SaveOpenDialogMorph.prototype.deleteItem = async function() {
    const item = this.listField.selected;
    if (item) {
        const confirmed = await this.ide.confirm(
            localize(
                'Are you sure you want to delete'
            ) + '\n"' + item.name + '"?',
            'Delete ' + this.itemName
        );
        if (confirmed) {
            await this.source.delete(item);
            // TODO: There may be a more efficient way to handle this
            this.setSource(this.source);
            return item;
        }
    }
};

SaveOpenDialogMorph.prototype.shareItem = async function() {
    var proj = this.listField.selected,
        entry = this.listField.active;

    if (proj) {
        const confirmed = await this.ide.confirm(
            localize(
                'Are you sure you want to publish'
            ) + '\n"' + proj.name + '"?',
            'Share ' + this.itemName
        );
        if (confirmed) {
            this.ide.showMessage(`sharing\n${this.itemName.toLowerCase()}...`);
            try {
                await this.source.publish(proj);
                proj.public = true;
                this.unshareButton.show();
                this.shareButton.hide();
                entry.label.isBold = true;
                entry.label.rerender();
                this.buttons.fixLayout();
                this.rerender();
                this.ide.showMessage('shared.', 2);
                return proj;
            } catch (err){
                this.ide.cloudError().call(null, err.label, err.message);
            }
        }
    }
};

SaveOpenDialogMorph.prototype.unshareItem = async function() {
    const item = this.listField.selected;
    const entry = this.listField.active;

    if (item) {
        const confirmed = await this.ide.confirm(
            localize(
                'Are you sure you want to unpublish'
            ) + '\n"' + item.name + '"?',
            'Unshare ' + this.itemName
        );
        if (confirmed) {
            this.ide.showMessage(`unsharing\n${this.itemName.toLowerCase()}...`);
            await this.source.publish(item, true);

            item.public = false;
            this.shareButton.show();
            this.unshareButton.hide();
            entry.label.isBold = false;
            entry.label.rerender();
            this.buttons.fixLayout();
            this.rerender();

            this.ide.showMessage('unshared.', 2);
            return item;
        }
    }
};

SaveOpenDialogMorph.prototype.openItem = async function() {
    const item = this.listField.selected;
    if (item) {
        await this.source.open(item);
        this.destroy();
    }
};

SaveOpenDialogMorph.prototype.trySaveItem = async function() {
    const newItem = {
        name: this.nameField.contents().text.text,
        notes: this.notesText.text,
    };
    const existingItem = detect(
        this.itemsList,
        function (item) {return item.name === newItem.name; }
    );
    const sourceName = localize(this.source.name.toLowerCase());
    const savingMsg = localize(`Saving ${this.itemName.toLowerCase()}\nto the `) + 
        sourceName + '...';
    const savedMsg = localize('Saved to the ') + sourceName + '!';
    let shouldSave = true;

    if (existingItem) {
        this.ide.showMessage(savingMsg);
        shouldSave = await this.ide.confirm(
            localize(
                'Are you sure you want to replace'
            ) + '\n"' + newItem.name + '"?',
            'Replace ' + this.itemName
        );
    }
    if (shouldSave) {
        try {
            this.ide.showMessage(savingMsg);
            await this.saveItem(newItem);
            this.ide.showMessage(savedMsg, 2);
            this.destroy();
        } catch (err) {
            this.ide.cloudError().call(null, err.label, err.message);
        }
        return newItem;
    }
};

SaveOpenDialogMorph.prototype.saveItem = async function(newItem) {
    await this.source.save(newItem);
};

SaveOpenDialogMorph.prototype.initPreview = function() {
    throw new Error('Action not supported!');
};

// SaveOpenDialogMorph source buttons

SaveOpenDialogMorph.prototype.addSourceButton = function (source) {
    const label = localize(source.name);
    const symbol = source.icon;
    var myself = this,
        lbl1 = new StringMorph(
            label,
            10,
            null,
            true,
            null,
            null,
            new Point(1, 1),
            WHITE
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
            WHITE
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

    l1.isCachingImage = true;
    l1.cachedImage = lbl1.fullImage();
    l1.bounds = lbl1.fullBounds();

    lbl2.add(new SymbolMorph(
        symbol,
        24,
        WHITE,
        new Point(-1, -1),
        this.titleBarColor.darker(50)
    ));
    lbl2.children[0].setCenter(lbl2.center());
    lbl2.children[0].setBottom(lbl2.top() - this.padding / 2);

    l2.isCachingImage = true;
    l2.cachedImage = lbl2.fullImage();
    l2.bounds = lbl2.fullBounds();

    button = new ToggleButtonMorph(
        null, //colors,
        this, // the SaveOpenDialogMorph is the target
        () => this.setSource(source),
        [l1, l2],
        () => this.source === source // query
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
    button.fixLayout();
    button.refresh();
    this.srcBar.add(button);
    return button;
};

// SaveOpenDialogMorph list field control

SaveOpenDialogMorph.prototype.fixListFieldItemColors = function () {
    // remember to always fixLayout() afterwards for the changes
    // to take effect
    this.listField.contents.children[0].alpha = 0;
    this.listField.contents.children[0].children.forEach(item => {
        item.pressColor = this.titleBarColor.darker(20);
        item.color = new Color(0, 0, 0, 0);
    });
};

// SaveOpenDialogMorph filter field

SaveOpenDialogMorph.prototype.buildFilterField = function () {
    var myself = this;

    this.filterField = new InputFieldMorph('');
    this.magnifyingGlass = new SymbolMorph(
        'magnifyingGlass',
        this.filterField.height(),
        this.titleBarColor.darker(50)
    );

    this.body.add(this.magnifyingGlass);
    this.body.add(this.filterField);

    this.filterField.reactToInput = function (evt) {
        var text = this.getValue();

        myself.listField.elements =
            myself.itemsList.filter(aProject => {
                const name = aProject.name;
                const notes = aProject.notes || '';
                return name.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
                    notes.toLowerCase().indexOf(text.toLowerCase()) > -1;
            });

        if (myself.listField.elements.length === 0) {
            myself.listField.elements.push('(no matches)');
        }

        myself.clearPreview();
        myself.listField.buildListContents();
        myself.fixListFieldItemColors();
        myself.listField.adjustScrollBars();
        myself.listField.scrollY(myself.listField.top());
        myself.fixLayout();
    };
};

// SaveOpenDialogMorph ops

SaveOpenDialogMorph.prototype.setSource = async function (newSource) {
    this.source = newSource;
    this.srcBar.children.forEach(function (button) {
        button.refresh();
    });
    const itemName = this.itemName.toLowerCase();
    const msg = this.ide.showMessage(`Updating\n${itemName} list...`);
    try {
        this.itemsList = [];
        const itemsList = await newSource.list();
        if (this.source === newSource) {
            this.itemsList = itemsList;
        } else {
            msg.destroy();
            return;
        }
    } catch (err) {
        this.ide.cloudError().call(null, err.label, err.message);
    }
    msg.destroy();

    this.itemsList.sort(function (x, y) {
        return x.name.toLowerCase() < y.name.toLowerCase() ?
                 -1 : 1;
    });

    this.listField.destroy();
    this.listField = new ListMorph(
        this.itemsList,
        this.itemsList.length > 0 ?
                function (element) {
                    return element.name || element;
                } : null,
        [ // format: display shared project names bold
            [
                'bold',
                function (proj) {return proj.public === true; }
            ]
        ],
        () => this.ok()
    );
    this.fixListFieldItemColors();
    this.listField.fixLayout = nop;
    this.listField.edge = InputFieldMorph.prototype.edge;
    this.listField.fontSize = InputFieldMorph.prototype.fontSize;
    this.listField.typeInPadding = InputFieldMorph.prototype.typeInPadding;
    this.listField.contrast = InputFieldMorph.prototype.contrast;
    this.listField.render = InputFieldMorph.prototype.render;
    this.listField.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;

    this.listField.action = async item => {
        if (item === undefined) {return; }
        if (this.nameField) {
            this.nameField.setContents(item.name || '');
        }
        if (this.task === 'open') {
            await this.setPreview(item);
        }

        if (this.source.canPublish()) {
            if (item.public) {
                this.shareButton.hide();
                this.unshareButton.show();
            } else {
                this.unshareButton.hide();
                this.shareButton.show();
            }
        } else {
            this.unshareButton.hide();
            this.shareButton.hide();
        }
        this.buttons.fixLayout();
        this.fixLayout();
        this.edit();
    };
    this.body.add(this.listField);
    if (this.source.canPublish()) {
        this.shareButton.show();
        this.unshareButton.hide();
    } else {
        this.shareButton.hide();
        this.unshareButton.hide();
    }

    if (this.source.canDelete()) {
        this.deleteButton.show();
    } else {
        this.deleteButton.hide();
    }

    this.buttons.fixLayout();
    this.fixLayout();
    if (this.task === 'open') {
        this.clearPreview();
    }
};

SaveOpenDialogMorph.prototype.setPreview = async function (item) {
    const previewInfo = await this.source.getPreview(item);
    this.notesText.text = previewInfo.notes || '';
    this.notesText.rerender();
    this.notesField.contents.adjustBounds();
    this.preview.texture = previewInfo.thumbnail || null;
    this.preview.cachedTexture = null;
    this.preview.rerender();
    if (previewInfo.details) {
        (new SpeechBubbleMorph(new TextMorph(
            //localize('last changed') + '\n' + item.Updated,
            previewInfo.details,
            null,
            null,
            null,
            null,
            'center'
        ))).popUp(
            this.world(),
            this.preview.rightCenter().add(new Point(2, 0))
        );
    }
};

SaveOpenDialogMorph.prototype.clearPreview = function () {
    this.notesText.text = '';
    this.notesText.rerender();
    this.notesField.contents.adjustBounds();
    this.preview.texture = null;
    this.preview.cachedTexture = null;
    this.preview.rerender();
};

SaveOpenDialogMorph.prototype.edit = function () {
    if (this.nameField) {
        this.nameField.edit();
    } else if (this.filterField) {
        this.filterField.edit();
    }
};

// SaveOpenDialogMorph layout

SaveOpenDialogMorph.prototype.fixLayout = function () {
    var th = fontHeight(this.titleFontSize) + this.titlePadding * 2,
        thin = this.padding / 2,
        inputField = this.nameField || this.filterField;

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

    // refresh shadow
    this.removeShadow();
    this.addShadow();
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
    this.preview.render = function (ctx) {
        InputFieldMorph.prototype.render.call(this, ctx);
        if (this.cachedTexture) {
            this.renderCachedTexture(ctx);
        } else if (this.texture) {
            this.renderTexture(this.texture, ctx);
        }
    };
    this.preview.renderCachedTexture = function (ctx) {
        ctx.drawImage(this.cachedTexture, this.edge, this.edge);
    };
    this.preview.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;
    this.preview.setExtent(
        this.ide.serializer.thumbnailSize.add(this.preview.edge * 2)
    );

    this.body.add(this.preview);

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
    this.notesField.setWidth(this.preview.width());

    this.body.add(this.notesField);

    this.addButton('recoverProject', 'Recover', true);
    this.addButton('cancel', 'Cancel');

    this.setExtent(new Point(360, 300));
    this.fixLayout();
};

ProjectRecoveryDialogMorph.prototype.buildListField = function () {
    this.listField = new ListMorph([]);
    this.fixListFieldItemColors();
    this.listField.fixLayout = nop;
    this.listField.edge = InputFieldMorph.prototype.edge;
    this.listField.fontSize = InputFieldMorph.prototype.fontSize;
    this.listField.typeInPadding = InputFieldMorph.prototype.typeInPadding;
    this.listField.contrast = InputFieldMorph.prototype.contrast;
    this.listField.render = InputFieldMorph.prototype.render;
    this.listField.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;

    this.listField.action = (item) => {
        var version;
        if (item === undefined) { return; }
        version = detect(
            this.versions,
            version => version.lastupdated === item
        );
        this.notesText.text = version.notes || '';
        this.notesText.rerender();
        this.notesField.contents.adjustBounds();
        this.preview.texture = version.thumbnail;
        this.preview.cachedTexture = null;
        this.preview.rerender();
    };

    this.ide.cloud.getProjectVersionMetadata(
        this.projectName,
        versions => {
            var today = new Date(),
                yesterday = new Date();
            yesterday.setDate(today.getDate() - 1);
            this.versions = versions;
            this.versions.forEach(version => {
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
            this.listField.elements = this.versions.map(version =>
                version.lastupdated
            );
            this.clearDetails();
            this.listField.buildListContents();
            this.fixListFieldItemColors();
            this.listField.adjustScrollBars();
            this.listField.scrollY(this.listField.top());
            this.fixLayout();
        },
        this.ide.cloudError()
    );

    this.body.add(this.listField);
};

ProjectRecoveryDialogMorph.prototype.cancel = function () {
    this.browser.show();
    this.browser.listField.select(
        detect(
            this.browser.projectList,
            item => item.projectname === this.projectName
        )
    );
    ProjectRecoveryDialogMorph.uber.cancel.call(this);
};

ProjectRecoveryDialogMorph.prototype.recoverProject = function () {
    var lastupdated = this.listField.selected,
        version = detect(
            this.versions,
            version => version.lastupdated === lastupdated
        );

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
        thin = this.padding / 2;

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

    // refresh shadow
    this.removeShadow();
    this.addShadow();
};

SaveOpenDialogMorph.prototype.popUp = function (world) {
    if (world) {
        SaveOpenDialogMorph.uber.popUp.call(this, world);
        this.handle = new HandleMorph(
            this,
            350,
            300,
            this.corner,
            this.corner
        );
    }
};

// ProjectsDialogSource ////////////////////////////////////////////////////

// ProjectsDialogSource inherits from SaveOpenDialogMorphSource:

ProjectsDialogSource.prototype = Object.create(SaveOpenDialogMorphSource.prototype);
ProjectsDialogSource.prototype.constructor = ProjectsDialogSource;
ProjectsDialogSource.uber = SaveOpenDialogMorphSource.prototype;

function ProjectsDialogSource(ide) {
    this.init(ide);
}

ProjectsDialogSource.prototype.init = function(ide, name, icon, id) {
    ProjectsDialogSource.uber.init.call(this, name, icon, id);
    this.ide = ide;
};

ProjectsDialogSource.prototype.getPreview = async function(project) {
    const src = await this.getContent(project);
    const xml = this.ide.serializer.parse(src);
    const firstProject = xml.children[0].children[0];  // get project info of first role

    return {
        thumbnail: firstProject.childNamed('thumbnail').contents,
        notes: firstProject.childNamed('notes').contents || '',
    };
};

ProjectsDialogSource.prototype.open = async function(project) {
    return this.ide.droppedText(await this.getContent(project));
};

// CloudProjectsSource ////////////////////////////////////////////////////

// CloudProjectsSource inherits from DialogBoxMorph:

CloudProjectsSource.prototype = Object.create(ProjectsDialogSource.prototype);
CloudProjectsSource.prototype.constructor = CloudProjectsSource;
CloudProjectsSource.uber = ProjectsDialogSource.prototype;

// CloudProjectsSource instance creation:

function CloudProjectsSource(ide) {
    this.init(ide, 'Cloud', 'cloud');
}

CloudProjectsSource.prototype.publish = function(proj, unpublish = false) {
    const serviceName = unpublish ? 'unpublishProject' : 'publishProject';
    const myself = this;
    const cloud = this.ide.cloud;

    cloud.reconnect(
        () => {
            cloud.callService(
                serviceName,
                () => cloud.disconnect(),
                this.ide.cloudError(),
                [proj.name]
            );

            // Set the Shared URL if the project is currently open
            if (!unpublish && proj.name === myself.ide.projectName) {
                var usr = SnapCloud.username,
                    projectId = 'Username=' +
                        encodeURIComponent(usr.toLowerCase()) +
                        '&ProjectName=' +
                        encodeURIComponent(proj.name);
                location.hash = 'present:' + projectId;
            }
        },
        this.ide.cloudError()
    );
};

CloudProjectsSource.prototype.open = async function(proj) {
    const deferred = utils.defer();
    SnapCloud.getProject(
        proj.ID,
        async projectInfo => {
            await this.ide.rawLoadCloudProject(projectInfo, proj.public);
            deferred.resolve(projectInfo);
        },
        function(msg, label) {
            const err = new CloudError(label, msg);
            deferred.reject(err);
        }
    );

    return deferred.promise;
};

CloudProjectsSource.prototype.list = function() {
    const deferred = utils.defer();
    SnapCloud.getProjectList(
        function (projectList) {
            projectList.forEach(proj => {
                proj.name = proj.ProjectName;
                proj.public = proj.Public === 'true';
            });
            deferred.resolve(projectList);
        },
        function (msg, label) {
            const err = new CloudError(label, msg);
            deferred.reject(err);
        }
    );
    return deferred.promise;
};

CloudProjectsSource.prototype.getPreview = function(project) {
    return {
        thumbnail: project.Thumbnail,
        notes: project.notes,
        details: localize('last changed') + '\n' + project.Updated
    };
};

CloudProjectsSource.prototype.save = function(newProject) {
    const deferred = utils.defer();
    const isSaveAs = newProject.name !== this.ide.room.name;
    const myself = this;

    SnapCloud.saveProject(
        this.ide,
        function (result) {
            if (result.name) {
                myself.ide.room.silentSetRoomName(result.name);
            }
            if (isSaveAs) {
                myself.ide.updateUrlQueryString();
            }
            deferred.resolve();
        },
        function (msg, label) {
            const err = new CloudError(label, msg);
            deferred.reject(err);
        },
        true,
        newProject.name
    );

    return deferred.promise;
};

CloudProjectsSource.prototype.delete = function(project) {
    SnapCloud.reconnect(
        () => {
            SnapCloud.callService(
                'deleteProject',
                () => {
                    SnapCloud.disconnect();
                    this.ide.hasChangedMedia = true;
                },
                this.ide.cloudError(),
                [project.name]
            );
        },
        this.ide.cloudError()
    );
};

// SharedCloudProjectsSource ////////////////////////////////////////////////////

// SharedCloudProjectsSource inherits from DialogBoxMorph:

SharedCloudProjectsSource.prototype = Object.create(ProjectsDialogSource.prototype);
SharedCloudProjectsSource.prototype.constructor = SharedCloudProjectsSource;
SharedCloudProjectsSource.uber = ProjectsDialogSource.prototype;

// SharedCloudProjectsSource instance creation:

function SharedCloudProjectsSource(ide) {
    this.init(ide, 'Shared with me', 'cloud', 'cloud-shared');
}

SharedCloudProjectsSource.prototype.list = function() {
    const deferred = utils.defer();
    SnapCloud.getSharedProjectList(
        function(projectList) {
            projectList.forEach(proj => {
                proj.name = proj.ProjectName;
            });
            deferred.resolve(projectList);
        },
        function (msg, label) {
            const err = new CloudError(label, msg);
            deferred.reject(err);
        }
    );
    return deferred.promise;
};

SharedCloudProjectsSource.prototype.delete = function(project) {
    SnapCloud.evictCollaborator(SnapCloud.username, project.ID);
};

SharedCloudProjectsSource.prototype.open = function(project) {
    SnapCloud.joinActiveProject(
        project.ID,
        async xml => {
            this.ide.rawLoadCloudProject(xml, project.public);
        },
        this.ide.cloudError()
    );
};

// BrowserProjectsSource ////////////////////////////////////////////////////

BrowserProjectsSource.prototype = Object.create(ProjectsDialogSource.prototype);
BrowserProjectsSource.prototype.constructor = BrowserProjectsSource;
BrowserProjectsSource.uber = ProjectsDialogSource.prototype;

// BrowserProjectsSource instance creation:

function BrowserProjectsSource(ide) {
    this.init(ide, 'Browser', 'storage', 'local');
}

BrowserProjectsSource.prototype.getContent = function(item) {
    return localStorage['-snap-project-' + item.name];
};

BrowserProjectsSource.prototype.list = function() {
    var stored, name, dta,
        projects = [];
    for (stored in localStorage) {
        if (Object.prototype.hasOwnProperty.call(localStorage, stored)
                && stored.substr(0, 14) === '-snap-project-') {
            name = stored.substr(14);
            dta = {name};
            projects.push(dta);
        }
    }
    return projects;
};

BrowserProjectsSource.prototype.save = function(newItem) {
    this.ide.room.name = newItem.name;
    this.ide.saveProject(name);
};

BrowserProjectsSource.prototype.delete = function(item) {
    delete localStorage['-snap-project-' + item.name];
};

// CloudProjectExamples ////////////////////////////////////////////////////

// CloudProjectExamples inherits from DialogBoxMorph:

CloudProjectExamples.prototype = Object.create(ProjectsDialogSource.prototype);
CloudProjectExamples.prototype.constructor = CloudProjectExamples;
CloudProjectExamples.uber = ProjectsDialogSource.prototype;

// CloudProjectExamples instance creation:

function CloudProjectExamples(ide) {
    this.init(ide, 'Examples', 'poster');
}

CloudProjectExamples.prototype.getContent = function(project) {
    const {fileName} = project;
    const src = this.ide.getURL(this.ide.resourceURL('Examples', fileName));
    return src;
};

CloudProjectExamples.prototype.open = async function(project) {
    const xml = await this.getContent(project);
    await this.ide.droppedText(xml);
    this.ide.updateUrlQueryString(project.name, false, true);
};

CloudProjectExamples.prototype.list = function() {
    const projects = this.ide.getMediaList('Examples');
    return projects.map(example => ({
        name: example.name,
        fileName: example.fileName,
        notes: example.description,
    }));
};

// ProjectDialogMorph ////////////////////////////////////////////////////

// ProjectDialogMorph inherits from DialogBoxMorph:

ProjectDialogMorph.prototype = new SaveOpenDialogMorph();
ProjectDialogMorph.prototype.constructor = ProjectDialogMorph;
ProjectDialogMorph.uber = SaveOpenDialogMorph.prototype;

// ProjectDialogMorph instance creation:

function ProjectDialogMorph(ide, label) {
    this.init(ide, label);
}

ProjectDialogMorph.prototype.init = function (ide, task) {
    this.ide = ide;
    const sources = [
        new CloudProjectsSource(ide),
        new SharedCloudProjectsSource(ide),
        new BrowserProjectsSource(ide),
        new CloudProjectExamples(ide),
    ];
    const defaultSourceID = ide.source || 'local';
    const defaultSource = sources.find(source => source.id === defaultSourceID);
    ProjectDialogMorph.uber.init.call(
        this,
        task,
        'Project',
        sources,
        defaultSource,
        {
            name: ide.room.name,
            notes: ide.projectNotes
        },
    );
};

ProjectDialogMorph.prototype.initPreview = function () {
    this.preview = new Morph();
    this.preview.fixLayout = nop;
    this.preview.edge = InputFieldMorph.prototype.edge;
    this.preview.fontSize = InputFieldMorph.prototype.fontSize;
    this.preview.typeInPadding = InputFieldMorph.prototype.typeInPadding;
    this.preview.contrast = InputFieldMorph.prototype.contrast;
    this.preview.render = function (ctx) {
        InputFieldMorph.prototype.render.call(this, ctx);
        if (this.cachedTexture) {
            this.renderCachedTexture(ctx);
        } else if (this.texture) {
            this.renderTexture(this.texture, ctx);
        }
    };
    this.preview.renderCachedTexture = function (ctx) {
        if (this.cachedTexture) {
            const scale = Math.min(
                    (this.width() / this.cachedTexture.width),
                    (this.height() / this.cachedTexture.height)
                ),
                width = scale * this.cachedTexture.width,
                height = scale * this.cachedTexture.height;
            ctx.drawImage(this.cachedTexture, this.edge, this.edge, width, height);
        }
    };
    this.preview.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;
    this.preview.setExtent(
        this.ide.serializer.thumbnailSize.divideBy(4).add(this.preview.edge * 2)
    );

    this.body.add(this.preview);
    if (this.task === 'save') {
        const thumbnail = this.ide.stage.thumbnail(
            SnapSerializer.prototype.thumbnailSize
        );
        this.preview.texture = null;
        this.preview.cachedTexture = thumbnail;
        this.preview.rerender();
    }
};

ProjectDialogMorph.prototype.trySaveItem = function () {
    var name = this.nameField.contents().text.text,
        notes = this.notesText.text;

    this.ide.projectNotes = notes || this.ide.projectNotes;
    if (/[\.@]+/.test(name)) {
        this.ide.inform(
            'Invalid Project Name',
            'Could not save project because\n' +
            'the provided name contains illegal characters.',
            this.world()
        );
        return;
    }

    const newProjectDetails = {
        name: name,
        notes: notes,
    };
    // TODO: Set the current room name?
    ProjectDialogMorph.uber.trySaveItem.call(this, newProjectDetails);
};

ProjectDialogMorph.prototype.saveItem = function(newItem) {
    ProjectDialogMorph.uber.saveItem.call(this, newItem);
    this.ide.source = this.source.id;
};

ProjectDialogMorph.prototype.saveCloudProject = function (name) {
    var myself = this;
    this.ide.showMessage('Saving project\nto the cloud...');
    SnapCloud.saveProject(
        this.ide,
        function (result) {
            if (result.name) {
                myself.ide.room.silentSetRoomName(result.name);
            }
            myself.ide.source = 'cloud';
            myself.ide.showMessage('Saved to cloud!', 2);
        },
        this.ide.cloudError(),
        true,
        name
    );
    this.destroy();
};

ProjectDialogMorph.prototype.shareItem = async function () {
    const project = await ProjectDialogMorph.uber.shareItem.call(this);
    if (project) {
        if (this.isCurrentProject(project)) {
            this.ide.updateUrlQueryString(project.name, true);
        }
    }
};

ProjectDialogMorph.prototype.isCurrentProject = function (project) {
    return project.ID === SnapCloud.projectId;
};

ProjectDialogMorph.prototype.unshareItem = async function () {
    const project = await ProjectDialogMorph.uber.unshareItem.call(this);
    if (project) {
        if (this.isCurrentProject(project)) {
            this.ide.updateUrlQueryString();
        }
    }
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
SpriteIconMorph.prototype.labelColor = WHITE;
SpriteIconMorph.prototype.fontSize = 9;

// SpriteIconMorph instance creation:

function SpriteIconMorph(aSprite) {
    this.init(aSprite);
}

SpriteIconMorph.prototype.init = function (aSprite) {
    var colors, action, query, hover;

    colors = [
        IDE_Morph.prototype.groupColor,
        IDE_Morph.prototype.frameColor,
        IDE_Morph.prototype.frameColor
    ];

    action = () => {
        // make my sprite the current one
        var ide = this.parentThatIsA(IDE_Morph);

        if (ide) {
            SnapActions.selectSprite(this.object);
            ide.selectSprite(this.object);
        }
    };

    query = () => {
        // answer true if my sprite is the current one
        var ide = this.parentThatIsA(IDE_Morph);

        if (ide) {
            return ide.currentSprite === this.object;
        }
        return false;
    };

    hover = () => {
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
        hover // hint
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
    this.thumbnail.isCachingImage = true;
    this.thumbnail.bounds.setExtent(this.thumbSize);
    if (this.object instanceof SpriteMorph) { // support nested sprites
        this.thumbnail.cachedImage = this.object.fullThumbnail(
            this.thumbSize,
            this.thumbnail.cachedImage
        );
        this.add(this.thumbnail);
        this.createRotationButton();
    } else {
        this.thumbnail.cachedImage = this.object.thumbnail(
            this.thumbSize,
            this.thumbnail.cachedImage
        );
        this.add(this.thumbnail);
    }
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
    var button;

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
        () => this.object.rotatesWithAnchor = !this.object.rotatesWithAnchor,
        [
            '\u2192',
            '\u21BB'
        ],
        () => this.object.rotatesWithAnchor // query
    );

    button.corner = 8;
    button.labelMinExtent = new Point(11, 11);
    button.padding = 0;
    button.pressColor = button.color;
    // button.hint = 'rotate synchronously\nwith anchor';
    button.fixLayout();
    button.refresh();
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

    this.bounds.setWidth(
        this.thumbnail.width()
            + this.outline * 2
            + this.edge * 2
            + this.padding * 2
    );

    this.bounds.setHeight(
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
    var menu = new MenuMorph(this);

    if (this.object instanceof StageMorph) {
        menu.addItem(
            'pic...',
            () => {
                var ide = this.parentThatIsA(IDE_Morph);
                ide.saveCanvasAs(
                    this.object.fullImage(),
                    this.object.name
                );
            },
            'save a picture\nof the stage'
        );
        if (this.object.trailsLog.length) {
            menu.addItem(
                'svg...',
                () => this.object.exportTrailsLogAsSVG(),
                'export pen trails\nline segments as SVG'
            );
        }
        return menu;
    }
    if (!(this.object instanceof SpriteMorph)) {return null; }
    menu.addItem("show", 'showSpriteOnStage');
    menu.addLine();
    menu.addItem("duplicate", () => {
        var position = this.world().hand.position();

        SnapActions.duplicateSprite(
            this.object,
            position
        );
    });
    //if (StageMorph.prototype.enableInheritance) {
        //menu.addItem("clone", 'instantiateSprite');
    //}
    menu.addItem("delete", () => SnapActions.removeSprite(this.object));
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
        //menu.addItem("parent...", 'chooseExemplar');
        //if (this.object.exemplar) {
            //menu.addItem(
                //"release",
                //'releaseSprite',
                //'make temporary and\nhide in the sprite corral'
            //);
        //}
    }
    if (this.object.anchor) {
        menu.addItem(
            localize('detach from') + ' ' + this.object.anchor.name,
            () => SnapActions.detachParts([this.object]),
        );
    }
    if (this.object.parts.length) {
        menu.addItem(
            'detach all parts',
            () => SnapActions.detachParts(this.object.parts),
        );
    }
    menu.addItem("export...", 'exportSprite');
    return menu;
};

// TODO: This is not currently used in NetsBlox as OOP is not supported
SpriteIconMorph.prototype.instantiateSprite = function () {
    var ide = this.parentThatIsA(IDE_Morph);
    if (ide) {
        ide.instantiateSprite(this.object);
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

SpriteIconMorph.prototype.render = function (ctx) {
    // only draw the edges if I am selected
    switch (this.userState) {
    case 'highlight':
        this.drawBackground(ctx, this.highlightColor);
        break;
    case 'pressed':
        this.drawOutline(ctx);
        this.drawBackground(ctx, this.pressColor);
        this.drawEdges(
            ctx,
            this.pressColor,
            this.pressColor.lighter(40),
            this.pressColor.darker(40)
        );
        break;
    default:
        this.drawBackground(ctx, this.getRenderColor());
    }
};

SpriteIconMorph.prototype.getRenderColor =
    ScriptsMorph.prototype.getRenderColor;

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

SpriteIconMorph.prototype.copyStack = async function (block) {
    var sprite = this.object,
        dup = block.id ? block.fullCopy() : block,
        // FIXME: This positioning can be problematic...
        y = Math.max(
            sprite.scripts.children.map(stack =>
                stack.fullBounds().bottom()
            ).concat([sprite.scripts.top()])
        ),
        position = new Point(this.object.scripts.left() + 20, y + 20);

    dup.allComments().forEach(comment => comment.align(dup));

    // delete all local custom blocks (methods) that the receiver
    // doesn't understand
    dup.allChildren().forEach(morph => {
        if (morph.isCustomBlock &&
            !morph.isGlobal &&
            !sprite.getMethod(morph.blockSpec)
        ) {
            morph.deleteBlock();
        }
    });

    dup.id = null;
    await SnapActions.addBlock(dup, sprite, position);
    sprite.scripts.adjustBounds();
};

SpriteIconMorph.prototype.copyCostume = function (costume) {
    const dup = costume.copy();

    dup.name = this.object.newCostumeName(dup.name);
    SnapActions.addCostume(dup, this.object);
};

SpriteIconMorph.prototype.copySound = function (sound) {
    SnapActions.addSound(sound, this.object);
};

// SpriteIconMorph flashing

SpriteIconMorph.prototype.flash = function () {
    var world = this.world(),
        isFlat = MorphicPreferences.isFlat,
        highlight = SpriteMorph.prototype.highlightColor,
        previousColor = isFlat ? this.pressColor : this.outlineColor,
        previousOutline = this.outline,
        previousState = this.userState;

    if (isFlat) {
        this.pressColor = highlight;
    } else {
        this.outlineColor = highlight;
        this.outline = 2;
    }
    this.userState = 'pressed';
    this.rerender();

    world.animations.push(new Animation(
        nop,
        nop,
        0,
        800,
        nop,
        () => {
            if (isFlat) {
                this.pressColor = previousColor;
            } else {
                this.outlineColor = previousColor;
                this.outline = previousOutline;
            }
            this.userState = previousState;
            this.rerender();
        }
    ));
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
CostumeIconMorph.prototype.labelColor = WHITE;
CostumeIconMorph.prototype.fontSize = 9;

// CostumeIconMorph instance creation:

function CostumeIconMorph(aCostume) {
    this.init(aCostume);
}

CostumeIconMorph.prototype.init = function (aCostume) {
    var colors, action, query;

    colors = [
        IDE_Morph.prototype.groupColor,
        IDE_Morph.prototype.frameColor,
        IDE_Morph.prototype.frameColor
    ];

    action = () => {
        // make my costume the current one
        var ide = this.parentThatIsA(IDE_Morph),
            wardrobe = this.parentThatIsA(WardrobeMorph);

        if (ide) {
            ide.currentSprite.wearCostume(this.object);
        }
        if (wardrobe) {
            wardrobe.updateSelection();
        }
    };

    query = () => {
        // answer true if my costume is the current one
        var ide = this.parentThatIsA(IDE_Morph);

        if (ide) {
            return ide.currentSprite.costume === this.object;
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
        null // hint
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
    var original = this.object.copy();

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
        false, // not a new costume, retain existing rotation center
        null,
        () => SnapActions.updateCostume(original, this.object)
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
        answer => {
            if (answer && (answer !== costume.name)) {
                var newName = wardrobe.sprite.newCostumeName(
                    answer,
                    costume
                );
                SnapActions.renameCostume(costume, newName);
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
    SnapActions.addCostume(newcos, wardrobe.sprite);
};

CostumeIconMorph.prototype.removeCostume = function () {
    SnapActions.removeCostume(this.object);
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

CostumeIconMorph.prototype.render
    = SpriteIconMorph.prototype.render;

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
    this.localRemoveCostume();
};

CostumeIconMorph.prototype.localRemoveCostume = function () {
    // Only remove the costume locally for the drag
    var wardrobe = this.parentThatIsA(WardrobeMorph),
        idx = this.parent.children.indexOf(this),
        ide = this.parentThatIsA(IDE_Morph);

    wardrobe.removeCostumeAt(idx - 2);
    if (ide.currentSprite.costume === this.object) {
        ide.currentSprite.wearCostume(null);
    }
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
TurtleIconMorph.prototype.labelColor = WHITE;
TurtleIconMorph.prototype.fontSize = 9;

// TurtleIconMorph instance creation:

function TurtleIconMorph(aSpriteOrStage) {
    this.init(aSpriteOrStage);
}

TurtleIconMorph.prototype.init = function (aSpriteOrStage) {
    var colors, action, query;

    colors = [
        IDE_Morph.prototype.groupColor,
        IDE_Morph.prototype.frameColor,
        IDE_Morph.prototype.frameColor
    ];

    action = () => {
        // make my costume the current one
        var ide = this.parentThatIsA(IDE_Morph),
            wardrobe = this.parentThatIsA(WardrobeMorph);

        if (ide) {
            ide.currentSprite.wearCostume(null);
        }
        if (wardrobe) {
            wardrobe.updateSelection();
        }
    };

    query = () => {
        // answer true if my costume is the current one
        var ide = this.parentThatIsA(IDE_Morph);

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
        null // hint
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

TurtleIconMorph.prototype.render
    = SpriteIconMorph.prototype.render;

// TurtleIconMorph user menu

TurtleIconMorph.prototype.userMenu = function () {
    var menu = new MenuMorph(this, 'pen'),
        on = '\u25CF',
        off = '\u25CB';
    if (this.object instanceof StageMorph) {
        return null;
    }
    menu.addItem(
        (this.object.penPoint === 'tip' ? on : off) + ' ' + localize('tip'),
        () => {
            this.object.penPoint = 'tip';
            this.object.changed();
            this.object.fixLayout();
            this.object.rerender();
        }
    );
    menu.addItem(
        (this.object.penPoint === 'middle' ? on : off) + ' ' + localize(
            'middle'
        ),
        () => {
            this.object.penPoint = 'middle';
            this.object.changed();
            this.object.fixLayout();
            this.object.rerender();
        }
    );
    return menu;
};

// WardrobeMorph ///////////////////////////////////////////////////////

// I am a watcher on a sprite's costume list

// WardrobeMorph inherits from ScrollFrameMorph

WardrobeMorph.prototype = new ScrollFrameMorph();
WardrobeMorph.prototype.undoCategory = 'costumes';
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
    var x = this.left() + 5,
        y = this.top() + 5,
        padding = 4,
        toolsPadding = 5,
        oldPos = this.contents.position(),
        icon,
        txt,
        paintbutton,
        cambutton;

    this.changed();

    this.contents.destroy();
    this.contents = new FrameMorph(this);
    this.contents.acceptsDrops = false;
    this.contents.reactToDropOf = (icon) => {
        this.reactToDropOf(icon);
    };
    this.addBack(this.contents);

    icon = new TurtleIconMorph(this.sprite);
    icon.setPosition(new Point(x, y));
    this.addContents(icon);
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
            () => {
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

    this.sprite.costumes.asArray().forEach(costume => {
        icon = new CostumeIconMorph(costume);
        icon.setPosition(new Point(x, y));
        this.addContents(icon);
        y = icon.bottom() + padding;
    });
    this.costumesVersion = this.sprite.costumes.lastChanged;

    this.contents.setPosition(oldPos);
    this.adjustScrollBars();
    this.changed();

    this.updateSelection();
    this.onNextStep = this.updateToolbar;
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
    var name = this.sprite.newCostumeName(localize('untitled')),
        ide = this.parentThatIsA(IDE_Morph),
        cos = new Costume(
            newCanvas(null, true),
            name
        );

    cos.edit(
        this.world(),
        ide,
        true,
        null,
        () => SnapActions.addCostume(cos, this.sprite)
    );
};

WardrobeMorph.prototype.newFromCam = function () {
    var camDialog,
        ide = this.parentThatIsA(IDE_Morph),
        sprite = this.sprite;

    camDialog = new CamSnapshotDialogMorph(
        ide,
        sprite,
        nop,
        costume => {
            SnapActions.addCostume(costume, sprite)
                .then(costume => sprite.wearCostume(costume))
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
    this.contents.children.forEach(item => {
        if (item instanceof CostumeIconMorph && item.top() < top - 4) {
            idx += 1;
        }
    });
    this.sprite.shadowAttribute('costumes');
    this.sprite.costumes.add(costume, idx + 1);
    this.updateList();
    icon.mouseClickLeft(); // select
};

// Undo/Redo support
WardrobeMorph.prototype.undoOwnerId = function() {
    return this.sprite.id + '/' + this.undoCategory;
};

WardrobeMorph.prototype.updateToolbar =
    ScriptsMorph.prototype.updateToolbar;

WardrobeMorph.prototype.addToolbar =
    ScriptsMorph.prototype.addToolbar;

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
SoundIconMorph.prototype.labelColor = WHITE;
SoundIconMorph.prototype.fontSize = 9;

// SoundIconMorph instance creation:

function SoundIconMorph(aSound) {
    this.init(aSound);
}

SoundIconMorph.prototype.init = function (aSound) {
    var colors, action, query;

    colors = [
        IDE_Morph.prototype.groupColor,
        IDE_Morph.prototype.frameColor,
        IDE_Morph.prototype.frameColor
    ];

    action = nop; // When I am selected (which is never the case for sounds)

    query = () => false;

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
        null // hint
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
    this.thumbnail.bounds.setExtent(this.thumbSize);
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
    if (!this.object.previewAudio) {
        //Audio is not playing
        this.button.labelString = 'Stop';
        this.button.hint = 'Stop sound';
        this.object.previewAudio = this.object.play();
        this.object.previewAudio.addEventListener(
            'ended',
            () => this.audioHasEnded(),
            false
        );
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
        ide = this.parentThatIsA(IDE_Morph);
    this.disinherit();
    new DialogBoxMorph(
        null,
        answer => {
            if (answer && (answer !== sound.name)) {
                SnapActions.renameSound(sound, answer);
            }
        }
    ).prompt(
        'rename sound',
        sound.name,
        this.world()
    );
};

SoundIconMorph.prototype.removeSound = function () {
    SnapActions.removeSound(this.object);
};

SoundIconMorph.prototype.localRemoveSound = function () {
    var jukebox = this.parentThatIsA(JukeboxMorph),
        idx = this.parent.children.indexOf(this) - 1;
    jukebox.removeSound(idx);
};

SoundIconMorph.prototype.exportSound = function () {
    var ide = this.parentThatIsA(IDE_Morph);
    ide.saveAudioAs(this.object.audio, this.object.name);
};

SoundIconMorph.prototype.render
    = SpriteIconMorph.prototype.render;

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
    this.userState = 'pressed';
    this.state = true;
    this.rerender();
    this.localRemoveSound();
};

// JukeboxMorph /////////////////////////////////////////////////////

/*
    I am JukeboxMorph, like WardrobeMorph, but for sounds
*/

// JukeboxMorph instance creation

JukeboxMorph.prototype = new ScrollFrameMorph();
JukeboxMorph.prototype.undoCategory = 'sounds';
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
    var x = this.left() + 5,
        y = this.top() + 5,
        padding = 4,
        icon,
        txt,
        ide = this.sprite.parentThatIsA(IDE_Morph),
        recordButton;

    this.changed();

    this.contents.destroy();
    this.contents = new FrameMorph(this);
    this.contents.acceptsDrops = false;
    this.contents.reactToDropOf = (icon) => this.reactToDropOf(icon);
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
    recordButton.hint = 'Record a new sound';
    recordButton.fixLayout();
    recordButton.label.setColor(new Color(255, 20, 20));
    recordButton.setPosition(txt.bottomLeft().add(new Point(0, padding * 2)));

    this.addContents(recordButton);

    y = recordButton.bottom() + padding;

    this.sprite.sounds.asArray().forEach(sound => {
        icon = new SoundIconMorph(sound);
        icon.setPosition(new Point(x, y));
        this.addContents(icon);
        y = icon.bottom() + padding;
    });
    this.soundsVersion = this.sprite.sounds.lastChanged;

    this.changed();
    this.updateSelection();
    this.onNextStep = this.updateToolbar;
};

JukeboxMorph.prototype.updateSelection = function () {
    this.contents.children.forEach(morph => {
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
    this.contents.children.forEach(item => {
        if (item instanceof SoundIconMorph && item.top() < top - 4) {
            idx += 1;
        }
    });

    this.sprite.shadowAttribute('sounds');
    this.sprite.sounds.add(costume, idx + 1);
    this.updateList();
};

// Undo/Redo support
JukeboxMorph.prototype.updateToolbar =
    ScriptsMorph.prototype.updateToolbar;

JukeboxMorph.prototype.addToolbar =
    ScriptsMorph.prototype.addToolbar;

JukeboxMorph.prototype.undoOwnerId =
    WardrobeMorph.prototype.undoOwnerId;

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
    this.userState = 'normal'; // or 'highlight'
    HandleMorph.uber.init.call(this);
    this.color = MorphicPreferences.isFlat ?
            IDE_Morph.prototype.backgroundColor : new Color(190, 190, 190);
    this.isDraggable = false;
    this.setExtent(new Point(12, 50));
};

// StageHandleMorph drawing:

StageHandleMorph.prototype.render = function (ctx) {
    if (this.userState === 'highlight') {
        this.renderOn(
            ctx,
            MorphicPreferences.isFlat ?
                    new Color(245, 245, 255) : new Color(100, 100, 255),
            this.color
        );
    } else { // assume 'normal'
        this.renderOn(ctx, this.color);
    }
};

StageHandleMorph.prototype.renderOn = function (
    ctx,
    color,
    shadowColor
) {
    var l = this.height() / 8,
        w = this.width() / 6,
        r = w / 2,
        x,
        y,
        i;

    ctx.lineWidth = w;
    ctx.lineCap = 'round';
    y = this.height() / 2;

    ctx.strokeStyle = color.toString();
    x = this.width() / 12;
    for (i = 0; i < 3; i += 1) {
        if (i > 0) {
            ctx.beginPath();
            ctx.moveTo(x, y - (l - r));
            ctx.lineTo(x, y + (l - r));
            ctx.stroke();
        }
        x += (w * 2);
        l *= 2;
    }
    if (shadowColor) {
        ctx.strokeStyle = shadowColor.toString();
        x = this.width() / 12 + w;
        l = this.height() / 8;
        for (i = 0; i < 3; i += 1) {
            if (i > 0) {
                ctx.beginPath();
                ctx.moveTo(x, y - (l - r));
                ctx.lineTo(x, y + (l - r));
                ctx.stroke();
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
            newWidth = this.target.right() - newPos;
            ide.stageRatio = newWidth / this.target.dimensions.x;
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
    this.userState = 'highlight';
    this.rerender();
};

StageHandleMorph.prototype.mouseLeave = function () {
    this.userState = 'normal';
    this.rerender();
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
    this.userState = 'normal';
    HandleMorph.uber.init.call(this);
    this.color = MorphicPreferences.isFlat ?
            IDE_Morph.prototype.backgroundColor : new Color(190, 190, 190);
    this.isDraggable = false;
    this.setExtent(new Point(12, 50));
};

// PaletteHandleMorph drawing:

PaletteHandleMorph.prototype.render =
    StageHandleMorph.prototype.render;

PaletteHandleMorph.prototype.renderOn =
    StageHandleMorph.prototype.renderOn;

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
    this.videoView.isCachingImage = true;

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
            .then(stream => {
                this.videoElement.srcObject = stream;
                this.videoElement.play().catch(noCameraSupport);
                this.videoElement.stream = stream;
            }).catch(noCameraSupport);
    }

    this.videoView.setExtent(stage.dimensions);
    this.videoView.cachedImage = newCanvas(
        stage.dimensions,
        true, // retina, maybe overkill here
        this.videoView.cachedImage
    );

    this.videoView.drawOn = function (ctx, rect) {
        var videoWidth = myself.videoElement.videoWidth,
            videoHeight = myself.videoElement.videoHeight,
            w = stage.dimensions.x,
            h = stage.dimensions.y,
            clippingWidth, clippingHeight;

        if (!videoWidth) { return; }

        ctx.save();

        // Flip the image so it looks like a mirror
        ctx.translate(w, 0);
        ctx.scale(-1, 1);

        if (videoWidth / w > videoHeight / h) {
            // preserve height, crop width
            clippingWidth = w * (videoHeight / h);
            clippingHeight = videoHeight;
        } else {
            // preserve width, crop height
            clippingWidth = videoWidth;
            clippingHeight = h * (videoWidth / w);
        }

        ctx.drawImage(
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

        ctx.restore();
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
    this.rerender();
};

CamSnapshotDialogMorph.prototype.ok = function () {
    this.accept(
        new Costume(
            this.videoView.fullImage(),
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
    var audioChunks = [];

    this.recordButton = new PushButtonMorph(
        this,
        'record',
        new SymbolMorph('circleSolid', 10)
    );

    this.stopButton = new PushButtonMorph(
        this,
        'stop',
        new SymbolMorph('rectangleSolid', 10)
    );

    this.playButton = new PushButtonMorph(
        this,
        'play',
        new SymbolMorph('pointRight', 10)
    );

    this.buildProgressBar();

    this.addBody(new AlignmentMorph('row', this.padding));
    this.body.add(this.recordButton);
    this.body.add(this.stopButton);
    this.body.add(this.playButton);
    this.body.add(this.progressBar);

    this.body.fixLayout();

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(
            {
                audio: {
                    channelCount: 1 // force mono, currently only works on FF
                }
                
            }
        ).then(stream => {
            this.mediaRecorder = new MediaRecorder(stream);
            this.mediaRecorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };
            this.mediaRecorder.onstop = (event) => {
                var buffer = new Blob(audioChunks),
                    reader = new window.FileReader();
                reader.readAsDataURL(buffer);
                reader.onloadend = () => {
                    var base64 = reader.result;
                    base64 = 'data:audio/ogg;base64,' +
                        base64.split(',')[1];
                    this.audioElement.src = base64;
                    this.audioElement.load();
                    audioChunks = [];
                };
            };
        });
    }

    this.addButton('ok', 'Save');
    this.addButton('cancel', 'Cancel');

    this.fixLayout();
    this.rerender();
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
            myself.buttons.children.forEach(button =>
                button.disable()
            );
            this.play();
        }
    };
};

SoundRecorderDialogMorph.prototype.destroy = function () {
    this.stop();
    this.audioElement.remove();
    if (this.mediaRecorder && this.mediaRecorder.stream) {
        this.mediaRecorder.stream.getTracks()[0].stop();
    }
    SoundRecorderDialogMorph.uber.destroy.call(this);
};
