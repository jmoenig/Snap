/*

    objects.js

    a scriptable microworld
    based on morphic.js, blocks.js and threads.js
    inspired by Scratch

    written by Jens Mönig
    jens@moenig.org

    Copyright (C) 2014 by Jens Mönig

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
    needs blocks.js, threads.js, morphic.js and widgets.js


    toc
    ---
    the following list shows the order in which all constructors are
    defined. Use this list to locate code in this document:

        SpriteMorph
        SpriteHighlightMorph
        StageMorph
        Costume
            SVG_Costume
        CostumeEditorMorph
        Sound
        Note
        CellMorph
        WatcherMorph
        StagePrompterMorph

        SpeechBubbleMorph*
            SpriteBubbleMorph

    * defined in Morphic.js


    credits
    -------
    Ian Reynolds contributed initial porting of primitives from Squeak and
    sound handling
    Achal Dave contributed research and prototyping for creating music
    using the Web Audio API
    Yuan Yuan contributed graphic effects for costumes

*/

// globals from paint.js:
/*global PaintEditorMorph*/

// globals from lists.js:

/*global ListWatcherMorph*/

// gloabls from widgets.js:

/*global PushButtonMorph, ToggleMorph, DialogBoxMorph, InputFieldMorph*/

// gloabls from gui.js:

/*global WatcherMorph, SpriteIconMorph*/

// globals from threads.js:

/*global ArgMorph, BlockMorph, Process, StackFrame, ThreadManager,
VariableFrame, detect, threadsVersion*/

// globals from blocks.js:

/*global ArgMorph, ArrowMorph, BlockHighlightMorph, BlockMorph,
BooleanSlotMorph, BoxMorph, Color, ColorPaletteMorph, ColorSlotMorph,
CommandBlockMorph, CommandSlotMorph, FrameMorph, HatBlockMorph,
InputSlotMorph, MenuMorph, Morph, MultiArgMorph, Point,
ReporterBlockMorph, ScriptsMorph, ShaAwMorph, StringMorph,
SyntaxElementMorph, TextMorph, WorldMorph, blocksVersion, contains,
degrees, detect, getDocumentPositionOf, newCanvas, nop, radians,
useBlurredShadows*/

// globals from morphic.js:

/*global Array, BlinkerMorph, BouncerMorph, BoxMorph, CircleBoxMorph,
Color, ColorPaletteMorph, ColorPickerMorph, CursorMorph, Date,
FrameMorph, Function, GrayPaletteMorph, HandMorph, HandleMorph,
InspectorMorph, ListMorph, Math, MenuItemMorph, MenuMorph, Morph,
MorphicPreferences, MouseSensorMorph, Node, Object, PenMorph, Point,
Rectangle, ScrollFrameMorph, ShadowMorph, SliderButtonMorph,
SliderMorph, String, StringFieldMorph, StringMorph, TextMorph,
TriggerMorph, WorldMorph, clone, contains, copy, degrees, detect,
document, getDocumentPositionOf, isNaN, isObject, isString, newCanvas,
nop, parseFloat, radians, standardSettings, touchScreenSettings,
useBlurredShadows, version, window, modules, IDE_Morph, VariableDialogMorph,
HTMLCanvasElement, Context, List, SpeechBubbleMorph, RingMorph, isNil,
FileReader*/

// globals from byob.js:

/*global CustomBlockDefinition, BlockEditorMorph, BlockDialogMorph,
PrototypeHatBlockMorph*/

// globals from locale.js:

/*global localize*/

// temporary globals

// Global stuff ////////////////////////////////////////////////////////

modules.objects = '2014-July-30';

var SpriteMorph;
var StageMorph;
var SpriteBubbleMorph;
var Costume;
var SVG_Costume;
var CostumeEditorMorph;
var Sound;
var Note;
var CellMorph;
var WatcherMorph;
var StagePrompterMorph;
var Note;
var SpriteHighlightMorph;

// SpriteMorph /////////////////////////////////////////////////////////

// I am a scriptable object

// SpriteMorph inherits from PenMorph:

SpriteMorph.prototype = new PenMorph();
SpriteMorph.prototype.constructor = SpriteMorph;
SpriteMorph.uber = PenMorph.prototype;

// SpriteMorph settings

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
        'lists',
        'other'
    ];

SpriteMorph.prototype.blockColor = {
    motion : new Color(74, 108, 212),
    looks : new Color(143, 86, 227),
    sound : new Color(207, 74, 217),
    pen : new Color(0, 161, 120),
    control : new Color(230, 168, 34),
    sensing : new Color(4, 148, 220),
    operators : new Color(98, 194, 19),
    variables : new Color(243, 118, 29),
    lists : new Color(217, 77, 17),
    other: new Color(150, 150, 150)
};

SpriteMorph.prototype.paletteColor = new Color(55, 55, 55);
SpriteMorph.prototype.paletteTextColor = new Color(230, 230, 230);
SpriteMorph.prototype.sliderColor
    = SpriteMorph.prototype.paletteColor.lighter(30);
SpriteMorph.prototype.isCachingPrimitives = true;

SpriteMorph.prototype.enableNesting = true;
SpriteMorph.prototype.useFlatLineEnds = false;
SpriteMorph.prototype.highlightColor = new Color(250, 200, 130);
SpriteMorph.prototype.highlightBorder = 8;

SpriteMorph.prototype.bubbleColor = new Color(255, 255, 255);
SpriteMorph.prototype.bubbleFontSize = 14;
SpriteMorph.prototype.bubbleFontIsBold = true;
SpriteMorph.prototype.bubbleCorner = 10;
SpriteMorph.prototype.bubbleBorder = 3;
SpriteMorph.prototype.bubbleBorderColor = new Color(190, 190, 190);
SpriteMorph.prototype.bubbleMaxTextWidth = 130;

SpriteMorph.prototype.initBlocks = function () {
    SpriteMorph.prototype.blocks = {

        // Motion
        forward: {
            only: SpriteMorph,
            type: 'command',
            category: 'motion',
            spec: 'move %n steps',
            defaults: [10]
        },
        turn: {
            only: SpriteMorph,
            type: 'command',
            category: 'motion',
            spec: 'turn %clockwise %n degrees',
            defaults: [15]
        },
        turnLeft: {
            only: SpriteMorph,
            type: 'command',
            category: 'motion',
            spec: 'turn %counterclockwise %n degrees',
            defaults: [15]
        },
        setHeading: {
            only: SpriteMorph,
            type: 'command',
            category: 'motion',
            spec: 'point in direction %dir'
        },
        doFaceTowards: {
            only: SpriteMorph,
            type: 'command',
            category: 'motion',
            spec: 'point towards %dst'
        },
        gotoXY: {
            only: SpriteMorph,
            type: 'command',
            category: 'motion',
            spec: 'go to x: %n y: %n',
            defaults: [0, 0]
        },
        doGotoObject: {
            only: SpriteMorph,
            type: 'command',
            category: 'motion',
            spec: 'go to %dst'
        },
        doGlide: {
            only: SpriteMorph,
            type: 'command',
            category: 'motion',
            spec: 'glide %n secs to x: %n y: %n',
            defaults: [1, 0, 0]
        },
        changeXPosition: {
            only: SpriteMorph,
            type: 'command',
            category: 'motion',
            spec: 'change x by %n',
            defaults: [10]
        },
        setXPosition: {
            only: SpriteMorph,
            type: 'command',
            category: 'motion',
            spec: 'set x to %n',
            defaults: [0]
        },
        changeYPosition: {
            only: SpriteMorph,
            type: 'command',
            category: 'motion',
            spec: 'change y by %n',
            defaults: [10]
        },
        setYPosition: {
            only: SpriteMorph,
            type: 'command',
            category: 'motion',
            spec: 'set y to %n',
            defaults: [0]
        },
        bounceOffEdge: {
            only: SpriteMorph,
            type: 'command',
            category: 'motion',
            spec: 'if on edge, bounce'
        },
        xPosition: {
            only: SpriteMorph,
            type: 'reporter',
            category: 'motion',
            spec: 'x position'
        },
        yPosition: {
            only: SpriteMorph,
            type: 'reporter',
            category: 'motion',
            spec: 'y position'
        },
        direction: {
            only: SpriteMorph,
            type: 'reporter',
            category: 'motion',
            spec: 'direction'
        },

        // Looks
        doSwitchToCostume: {
            type: 'command',
            category: 'looks',
            spec: 'switch to costume %cst'
        },
        doWearNextCostume: {
            type: 'command',
            category: 'looks',
            spec: 'next costume'
        },
        getCostumeIdx: {
            type: 'reporter',
            category: 'looks',
            spec: 'costume #'
        },
        doSayFor: {
            only: SpriteMorph,
            type: 'command',
            category: 'looks',
            spec: 'say %s for %n secs',
            defaults: [localize('Hello!'), 2]
        },
        bubble: {
            only: SpriteMorph,
            type: 'command',
            category: 'looks',
            spec: 'say %s',
            defaults: [localize('Hello!')]
        },
        doThinkFor: {
            only: SpriteMorph,
            type: 'command',
            category: 'looks',
            spec: 'think %s for %n secs',
            defaults: [localize('Hmm...'), 2]
        },
        doThink: {
            only: SpriteMorph,
            type: 'command',
            category: 'looks',
            spec: 'think %s',
            defaults: [localize('Hmm...')]
        },
        changeEffect: {
            type: 'command',
            category: 'looks',
            spec: 'change %eff effect by %n',
            defaults: [null, 25]
        },
        setEffect: {
            type: 'command',
            category: 'looks',
            spec: 'set %eff effect to %n',
            defaults: [null, 0]
        },
        clearEffects: {
            type: 'command',
            category: 'looks',
            spec: 'clear graphic effects'
        },
        changeScale: {
            only: SpriteMorph,
            type: 'command',
            category: 'looks',
            spec: 'change size by %n',
            defaults: [10]
        },
        setScale: {
            only: SpriteMorph,
            type: 'command',
            category: 'looks',
            spec: 'set size to %n %',
            defaults: [100]
        },
        getScale: {
            only: SpriteMorph,
            type: 'reporter',
            category: 'looks',
            spec: 'size'
        },
        show: {
            only: SpriteMorph,
            type: 'command',
            category: 'looks',
            spec: 'show'
        },
        hide: {
            only: SpriteMorph,
            type: 'command',
            category: 'looks',
            spec: 'hide'
        },
        comeToFront: {
            only: SpriteMorph,
            type: 'command',
            category: 'looks',
            spec: 'go to front'
        },
        goBack: {
            only: SpriteMorph,
            type: 'command',
            category: 'looks',
            spec: 'go back %n layers',
            defaults: [1]
        },
        doScreenshot: {
            type: 'command',
            category: 'looks',
            spec: 'save %imgsource as costume named %s',
            defaults: [['pen trails'], localize('screenshot')]
        },

        // Looks - Debugging primitives for development mode
        reportCostumes: {
            dev: true,
            type: 'reporter',
            category: 'looks',
            spec: 'wardrobe'
        },

        alert: {
            dev: true,
            type: 'command',
            category: 'looks',
            spec: 'alert %mult%s'
        },
        log: {
            dev: true,
            type: 'command',
            category: 'looks',
            spec: 'console log %mult%s'
        },

        // Sound
        playSound: {
            type: 'command',
            category: 'sound',
            spec: 'play sound %snd'
        },
        doPlaySoundUntilDone: {
            type: 'command',
            category: 'sound',
            spec: 'play sound %snd until done'
        },
        doStopAllSounds: {
            type: 'command',
            category: 'sound',
            spec: 'stop all sounds'
        },
        doRest: {
            type: 'command',
            category: 'sound',
            spec: 'rest for %n beats',
            defaults: [0.2]
        },
        doPlayNote: {
            type: 'command',
            category: 'sound',
            spec: 'play note %n for %n beats',
            defaults: [60, 0.5]
        },
        doChangeTempo: {
            type: 'command',
            category: 'sound',
            spec: 'change tempo by %n',
            defaults: [20]
        },
        doSetTempo: {
            type: 'command',
            category: 'sound',
            spec: 'set tempo to %n bpm',
            defaults: [60]
        },
        getTempo: {
            type: 'reporter',
            category: 'sound',
            spec: 'tempo'
        },

        // Sound - Debugging primitives for development mode
        reportSounds: {
            dev: true,
            type: 'reporter',
            category: 'sound',
            spec: 'jukebox'
        },

        // Pen
        clear: {
            type: 'command',
            category: 'pen',
            spec: 'clear'
        },
        down: {
            only: SpriteMorph,
            type: 'command',
            category: 'pen',
            spec: 'pen down'
        },
        up: {
            only: SpriteMorph,
            type: 'command',
            category: 'pen',
            spec: 'pen up'
        },
        setColor: {
            only: SpriteMorph,
            type: 'command',
            category: 'pen',
            spec: 'set pen color to %clr'
        },
        changeHue: {
            only: SpriteMorph,
            type: 'command',
            category: 'pen',
            spec: 'change pen color by %n',
            defaults: [10]
        },
        setHue: {
            only: SpriteMorph,
            type: 'command',
            category: 'pen',
            spec: 'set pen color to %n',
            defaults: [0]
        },
        changeBrightness: {
            only: SpriteMorph,
            type: 'command',
            category: 'pen',
            spec: 'change pen shade by %n',
            defaults: [10]
        },
        setBrightness: {
            only: SpriteMorph,
            type: 'command',
            category: 'pen',
            spec: 'set pen shade to %n',
            defaults: [100]
        },
        changeSize: {
            only: SpriteMorph,
            type: 'command',
            category: 'pen',
            spec: 'change pen size by %n',
            defaults: [1]
        },
        setSize: {
            only: SpriteMorph,
            type: 'command',
            category: 'pen',
            spec: 'set pen size to %n',
            defaults: [1]
        },
        doStamp: {
            only: SpriteMorph,
            type: 'command',
            category: 'pen',
            spec: 'stamp'
        },

        // Control
        receiveGo: {
            type: 'hat',
            category: 'control',
            spec: 'when %greenflag clicked'
        },
        receiveKey: {
            type: 'hat',
            category: 'control',
            spec: 'when %keyHat key pressed'
        },
        receiveClick: {
            type: 'hat',
            category: 'control',
            spec: 'when I am clicked'
        },
        receiveMessage: {
            type: 'hat',
            category: 'control',
            spec: 'when I receive %msgHat'
        },
        doBroadcast: {
            type: 'command',
            category: 'control',
            spec: 'broadcast %msg'
        },
        doBroadcastAndWait: {
            type: 'command',
            category: 'control',
            spec: 'broadcast %msg and wait'
        },
        getLastMessage: {
            type: 'reporter',
            category: 'control',
            spec: 'message'
        },
        doWait: {
            type: 'command',
            category: 'control',
            spec: 'wait %n secs',
            defaults: [1]
        },
        doWaitUntil: {
            type: 'command',
            category: 'control',
            spec: 'wait until %b'
        },
        doForever: {
            type: 'command',
            category: 'control',
            spec: 'forever %c'
        },
        doRepeat: {
            type: 'command',
            category: 'control',
            spec: 'repeat %n %c',
            defaults: [10]
        },
        doUntil: {
            type: 'command',
            category: 'control',
            spec: 'repeat until %b %c'
        },
        doIf: {
            type: 'command',
            category: 'control',
            spec: 'if %b %c'
        },
        doIfElse: {
            type: 'command',
            category: 'control',
            spec: 'if %b %c else %c'
        },

    /* migrated to a newer block version:

        doStop: {
            type: 'command',
            category: 'control',
            spec: 'stop script'
        },
        doStopAll: {
            type: 'command',
            category: 'control',
            spec: 'stop all %stop'
        },
    */

        doStopThis: {
            type: 'command',
            category: 'control',
            spec: 'stop %stopChoices'
        },
        doStopOthers: {
            type: 'command',
            category: 'control',
            spec: 'stop %stopOthersChoices'
        },
        doRun: {
            type: 'command',
            category: 'control',
            spec: 'run %cmdRing %inputs'
        },
        fork: {
            type: 'command',
            category: 'control',
            spec: 'launch %cmdRing %inputs'
        },
        evaluate: {
            type: 'reporter',
            category: 'control',
            spec: 'call %repRing %inputs'
        },
    /*
        doRunWithInputList: {
            type: 'command',
            category: 'control',
            spec: 'run %cmd with input list %l'
        },

        forkWithInputList: {
            type: 'command',
            category: 'control',
            spec: 'launch %cmd with input list %l'
        },

        evaluateWithInputList: {
            type: 'reporter',
            category: 'control',
            spec: 'call %r with input list %l'
        },
    */
        doReport: {
            type: 'command',
            category: 'control',
            spec: 'report %s'
        },
    /*
        doStopBlock: { // migrated to a newer block version
            type: 'command',
            category: 'control',
            spec: 'stop block'
        },
    */
        doCallCC: {
            type: 'command',
            category: 'control',
            spec: 'run %cmdRing w/continuation'
        },
        reportCallCC: {
            type: 'reporter',
            category: 'control',
            spec: 'call %cmdRing w/continuation'
        },
        doWarp: {
            type: 'command',
            category: 'other',
            spec: 'warp %c'
        },

        // Cloning - very experimental
        receiveOnClone: {
            type: 'hat',
            category: 'control',
            spec: 'when I start as a clone'
        },
        createClone: {
            type: 'command',
            category: 'control',
            spec: 'create a clone of %cln'
        },
        removeClone: {
            type: 'command',
            category: 'control',
            spec: 'delete this clone'
        },

        // Debugging - pausing

        doPauseAll: {
            type: 'command',
            category: 'control',
            spec: 'pause all %pause'
        },

        // Sensing

        reportTouchingObject: {
            only: SpriteMorph,
            type: 'predicate',
            category: 'sensing',
            spec: 'touching %col ?'
        },
        reportTouchingColor: {
            only: SpriteMorph,
            type: 'predicate',
            category: 'sensing',
            spec: 'touching %clr ?'
        },
        reportColorIsTouchingColor: {
            only: SpriteMorph,
            type: 'predicate',
            category: 'sensing',
            spec: 'color %clr is touching %clr ?'
        },
        colorFiltered: {
            dev: true,
            type: 'reporter',
            category: 'sensing',
            spec: 'filtered for %clr'
        },
        reportStackSize: {
            dev: true,
            type: 'reporter',
            category: 'sensing',
            spec: 'stack size'
        },
        reportFrameCount: {
            dev: true,
            type: 'reporter',
            category: 'sensing',
            spec: 'frames'
        },
        doAsk: {
            type: 'command',
            category: 'sensing',
            spec: 'ask %s and wait',
            defaults: [localize('what\'s your name?')]
        },
        reportLastAnswer: { // retained for legacy compatibility
            dev: true,
            type: 'reporter',
            category: 'sensing',
            spec: 'answer'
        },
        getLastAnswer: {
            type: 'reporter',
            category: 'sensing',
            spec: 'answer'
        },
        reportMouseX: {
            type: 'reporter',
            category: 'sensing',
            spec: 'mouse x'
        },
        reportMouseY: {
            type: 'reporter',
            category: 'sensing',
            spec: 'mouse y'
        },
        reportMouseDown: {
            type: 'predicate',
            category: 'sensing',
            spec: 'mouse down?'
        },
        reportKeyPressed: {
            type: 'predicate',
            category: 'sensing',
            spec: 'key %key pressed?'
        },
        reportDistanceTo: {
            type: 'reporter',
            category: 'sensing',
            spec: 'distance to %dst'
        },
        doResetTimer: {
            type: 'command',
            category: 'sensing',
            spec: 'reset timer'
        },
        reportTimer: { // retained for legacy compatibility
            dev: true,
            type: 'reporter',
            category: 'sensing',
            spec: 'timer'
        },
        getTimer: {
            type: 'reporter',
            category: 'sensing',
            spec: 'timer'
        },
        reportAttributeOf: {
            type: 'reporter',
            category: 'sensing',
            spec: '%att of %spr',
            defaults: [['costume #']]
        },
        reportURL: {
            type: 'reporter',
            category: 'sensing',
            spec: 'http:// %s',
            defaults: ['snap.berkeley.edu']
        },
        reportIsFastTracking: {
            type: 'predicate',
            category: 'sensing',
            spec: 'turbo mode?'
        },
        doSetFastTracking: {
            type: 'command',
            category: 'sensing',
            spec: 'set turbo mode to %b'
        },
        reportDate: {
            type: 'reporter',
            category: 'sensing',
            spec: 'current %dates'
        },

        // Operators
        reifyScript: {
            type: 'ring',
            category: 'other',
            spec: '%rc %ringparms'
        },
        reifyReporter: {
            type: 'ring',
            category: 'other',
            spec: '%rr %ringparms'
        },
        reifyPredicate: {
            type: 'ring',
            category: 'other',
            spec: '%rp %ringparms'
        },
        reportSum: {
            type: 'reporter',
            category: 'operators',
            spec: '%n + %n'
        },
        reportDifference: {
            type: 'reporter',
            category: 'operators',
            spec: '%n \u2212 %n'
        },
        reportProduct: {
            type: 'reporter',
            category: 'operators',
            spec: '%n \u00D7 %n'
        },
        reportQuotient: {
            type: 'reporter',
            category: 'operators',
            spec: '%n / %n' // '%n \u00F7 %n'
        },
        reportRound: {
            type: 'reporter',
            category: 'operators',
            spec: 'round %n'
        },
        reportMonadic: {
            type: 'reporter',
            category: 'operators',
            spec: '%fun of %n',
            defaults: [null, 10]
        },
        reportModulus: {
            type: 'reporter',
            category: 'operators',
            spec: '%n mod %n'
        },
        reportRandom: {
            type: 'reporter',
            category: 'operators',
            spec: 'pick random %n to %n',
            defaults: [1, 10]
        },
        reportLessThan: {
            type: 'predicate',
            category: 'operators',
            spec: '%s < %s'
        },
        reportEquals: {
            type: 'predicate',
            category: 'operators',
            spec: '%s = %s'
        },
        reportGreaterThan: {
            type: 'predicate',
            category: 'operators',
            spec: '%s > %s'
        },
        reportAnd: {
            type: 'predicate',
            category: 'operators',
            spec: '%b and %b'
        },
        reportOr: {
            type: 'predicate',
            category: 'operators',
            spec: '%b or %b'
        },
        reportNot: {
            type: 'predicate',
            category: 'operators',
            spec: 'not %b'
        },
        reportTrue: {
            type: 'predicate',
            category: 'operators',
            spec: 'true'
        },
        reportFalse: {
            type: 'predicate',
            category: 'operators',
            spec: 'false'
        },
        reportJoinWords: {
            type: 'reporter',
            category: 'operators',
            spec: 'join %words',
            defaults: [localize('hello') + ' ', localize('world')]
        },
        reportLetter: {
            type: 'reporter',
            category: 'operators',
            spec: 'letter %n of %s',
            defaults: [1, localize('world')]
        },
        reportStringSize: {
            type: 'reporter',
            category: 'operators',
            spec: 'length of %s',
            defaults: [localize('world')]
        },
        reportUnicode: {
            type: 'reporter',
            category: 'operators',
            spec: 'unicode of %s',
            defaults: ['a']
        },
        reportUnicodeAsLetter: {
            type: 'reporter',
            category: 'operators',
            spec: 'unicode %n as letter',
            defaults: [65]
        },
        reportIsA: {
            type: 'predicate',
            category: 'operators',
            spec: 'is %s a %typ ?',
            defaults: [5]
        },
        reportIsIdentical: {
            type: 'predicate',
            category: 'operators',
            spec: 'is %s identical to %s ?'
        },
        reportTextSplit: {
            type: 'reporter',
            category: 'operators',
            spec: 'split %s by %delim',
            defaults: [localize('hello') + ' ' + localize('world'), " "]
        },
        reportJSFunction: { // experimental
            type: 'reporter',
            category: 'operators',
            spec: 'JavaScript function ( %mult%s ) { %code }'
        },
        reportTypeOf: { // only in dev mode for debugging
            dev: true,
            type: 'reporter',
            category: 'operators',
            spec: 'type of %s',
            defaults: [5]
        },
        reportTextFunction: { // only in dev mode - experimental
            dev: true,
            type: 'reporter',
            category: 'operators',
            spec: '%txtfun of %s',
            defaults: [null, "Abelson & Sussman"]
        },

    /*
        reportScript: {
            type: 'reporter',
            category: 'operators',
            spec: 'the script %parms %c'
        },
        reify: {
            type: 'reporter',
            category: 'operators',
            spec: 'the %f block %parms'
        },
    */

        // Variables
        doSetVar: {
            type: 'command',
            category: 'variables',
            spec: 'set %var to %s',
            defaults: [null, 0]
        },
        doChangeVar: {
            type: 'command',
            category: 'variables',
            spec: 'change %var by %n',
            defaults: [null, 1]
        },
        doShowVar: {
            type: 'command',
            category: 'variables',
            spec: 'show variable %var'
        },
        doHideVar: {
            type: 'command',
            category: 'variables',
            spec: 'hide variable %var'
        },
        doDeclareVariables: {
            type: 'command',
            category: 'other',
            spec: 'script variables %scriptVars'
        },

        // Lists
        reportNewList: {
            type: 'reporter',
            category: 'lists',
            spec: 'list %exp'
        },
        reportCONS: {
            type: 'reporter',
            category: 'lists',
            spec: '%s in front of %l'
        },
        reportListItem: {
            type: 'reporter',
            category: 'lists',
            spec: 'item %idx of %l',
            defaults: [1]
        },
        reportCDR: {
            type: 'reporter',
            category: 'lists',
            spec: 'all but first of %l'
        },
        reportListLength: {
            type: 'reporter',
            category: 'lists',
            spec: 'length of %l'
        },
        reportListContainsItem: {
            type: 'predicate',
            category: 'lists',
            spec: '%l contains %s',
            defaults: [null, localize('thing')]
        },
        doAddToList: {
            type: 'command',
            category: 'lists',
            spec: 'add %s to %l',
            defaults: [localize('thing')]
        },
        doDeleteFromList: {
            type: 'command',
            category: 'lists',
            spec: 'delete %ida of %l',
            defaults: [1]
        },
        doInsertInList: {
            type: 'command',
            category: 'lists',
            spec: 'insert %s at %idx of %l',
            defaults: [localize('thing'), 1]
        },
        doReplaceInList: {
            type: 'command',
            category: 'lists',
            spec: 'replace item %idx of %l with %s',
            defaults: [1, null, localize('thing')]
        },

        // MAP - experimental
        reportMap: {
            dev: true,
            type: 'reporter',
            category: 'lists',
            spec: 'map %repRing over %l'
        },

        // Code mapping - experimental
        doMapCodeOrHeader: { // experimental
            type: 'command',
            category: 'other',
            spec: 'map %cmdRing to %codeKind %code'
        },
        doMapStringCode: { // experimental
            type: 'command',
            category: 'other',
            spec: 'map String to code %code',
            defaults: ['<#1>']
        },
        doMapListCode: { // experimental
            type: 'command',
            category: 'other',
            spec: 'map %codeListPart of %codeListKind to code %code'
        },
        reportMappedCode: { // experimental
            type: 'reporter',
            category: 'other',
            spec: 'code of %cmdRing'
        }
    };
};

SpriteMorph.prototype.initBlocks();

SpriteMorph.prototype.initBlockMigrations = function () {
    SpriteMorph.prototype.blockMigrations = {
        doStopAll: {
            selector: 'doStopThis',
            inputs: [['all']]
        },
        doStop: {
            selector: 'doStopThis',
            inputs: [['this script']]
        },
        doStopBlock: {
            selector: 'doStopThis',
            inputs: [['this block']]
        }
    };
};

SpriteMorph.prototype.initBlockMigrations();

SpriteMorph.prototype.blockAlternatives = {
    // motion:
    turn: ['turnLeft'],
    turnLeft: ['turn'],
    changeXPosition: ['changeYPosition', 'setXPosition', 'setYPosition'],
    setXPosition: ['setYPosition', 'changeXPosition', 'changeYPosition'],
    changeYPosition: ['changeXPosition', 'setYPosition', 'setXPosition'],
    setYPosition: ['setXPosition', 'changeYPosition', 'changeXPosition'],
    xPosition: ['yPosition'],
    yPosition: ['xPosition'],

    // looks:
    doSayFor: ['doThinkFor', 'bubble', 'doThink', 'doAsk'],
    doThinkFor: ['doSayFor', 'doThink', 'bubble', 'doAsk'],
    bubble: ['doThink', 'doAsk', 'doSayFor', 'doThinkFor'],
    doThink: ['bubble', 'doAsk', 'doSayFor', 'doThinkFor'],
    show: ['hide'],
    hide: ['show'],
    changeEffect: ['setEffect'],
    setEffect: ['changeEffect'],
    changeScale: ['setScale'],
    setScale: ['changeScale'],

    // sound:
    playSound: ['doPlaySoundUntilDone'],
    doPlaySoundUntilDone: ['playSound'],
    doChangeTempo: ['doSetTempo'],
    doSetTempo: ['doChangeTempo'],

    // pen:
    clear: ['down', 'up', 'doStamp'],
    down: ['up', 'clear', 'doStamp'],
    up: ['down', 'clear', 'doStamp'],
    doStamp: ['clear', 'down', 'up'],
    changeHue: ['setHue', 'changeBrightness', 'setBrightness'],
    setHue: ['changeHue', 'changeBrightness', 'setBrightness'],
    changeBrightness: ['setBrightness', 'setHue', 'changeHue'],
    setBrightness: ['changeBrightness', 'setHue', 'changeHue'],
    changeSize: ['setSize'],
    setSize: ['changeSize'],

    // control:
    receiveGo: ['receiveClick'],
    receiveClick: ['receiveGo'],
    doBroadcast: ['doBroadcastAndWait'],
    doBroadcastAndWait: ['doBroadcast'],
    doIf: ['doIfElse', 'doUntil'],
    doIfElse: ['doIf', 'doUntil'],
    doRepeat: ['doUntil'],
    doUntil: ['doRepeat', 'doIf'],

    // sensing:
    doAsk: ['bubble', 'doThink', 'doSayFor', 'doThinkFor'],
    getLastAnswer: ['getTimer'],
    getTimer: ['getLastAnswer'],
    reportMouseX: ['reportMouseY'],
    reportMouseY: ['reportMouseX'],

    // operators:
    reportSum: ['reportDifference', 'reportProduct', 'reportQuotient'],
    reportDifference: ['reportSum', 'reportProduct', 'reportQuotient'],
    reportProduct: ['reportDifference', 'reportSum', 'reportQuotient'],
    reportQuotient: ['reportDifference', 'reportProduct', 'reportSum'],
    reportLessThan: ['reportEquals', 'reportGreaterThan'],
    reportEquals: ['reportLessThan', 'reportGreaterThan'],
    reportGreaterThan: ['reportEquals', 'reportLessThan'],
    reportAnd: ['reportOr'],
    reportOr: ['reportAnd'],
    reportTrue: ['reportFalse'],
    reportFalse: ['reportTrue'],

    // variables
    doSetVar: ['doChangeVar'],
    doChangeVar: ['doSetVar'],
    doShowVar: ['doHideVar'],
    doHideVar: ['doShowVar']
};

// SpriteMorph instance creation

function SpriteMorph(globals) {
    this.init(globals);
}

SpriteMorph.prototype.init = function (globals) {
    this.name = localize('Sprite');
    this.variables = new VariableFrame(globals || null, this);
    this.scripts = new ScriptsMorph(this);
    this.customBlocks = [];
    this.costumes = new List();
    this.costume = null;
    this.sounds = new List();
    this.normalExtent = new Point(60, 60); // only for costume-less situation
    this.scale = 1;
    this.rotationStyle = 1; // 1 = full, 2 = left/right, 0 = off
    this.version = Date.now(); // for observer optimization
    this.isClone = false; // indicate a "temporary" Scratch-style clone
    this.cloneOriginName = '';

    // sprite nesting properties
    this.parts = []; // not serialized, only anchor (name)
    this.anchor = null;
    this.nestingScale = 1;
    this.rotatesWithAnchor = true;

    this.blocksCache = {}; // not to be serialized (!)
    this.paletteCache = {}; // not to be serialized (!)
    this.rotationOffset = new Point(); // not to be serialized (!)
    this.idx = 0; // not to be serialized (!) - used for de-serialization
    this.wasWarped = false; // not to be serialized, used for fast-tracking

    this.graphicsValues = { 'negative': 0,
                            'fisheye': 0,
                            'whirl': 0,
                            'pixelate': 0,
                            'mosaic': 0,
                            'brightness': 0,
                            'color': 0,
                            'comic': 0,
                            'duplicate': 0,
                            'confetti': 0
                         };

    SpriteMorph.uber.init.call(this);

    this.isDraggable = true;
    this.isDown = false;

    this.heading = 90;
    this.changed();
    this.drawNew();
    this.changed();
};

// SpriteMorph duplicating (fullCopy)

SpriteMorph.prototype.fullCopy = function () {
    var c = SpriteMorph.uber.fullCopy.call(this),
        myself = this,
        arr = [],
        dp,
        cb;

    c.stopTalking();
    c.color = this.color.copy();
    c.blocksCache = {};
    c.paletteCache = {};
    c.scripts = this.scripts.fullCopy();
    c.scripts.owner = c;
    c.variables = this.variables.copy();
    c.variables.owner = c;
    c.customBlocks = [];
    this.customBlocks.forEach(function (def) {
        cb = def.copyAndBindTo(c);
        c.customBlocks.push(cb);
        c.allBlockInstances(def).forEach(function (block) {
            block.definition = cb;
        });
    });
    this.costumes.asArray().forEach(function (costume) {
        var cst = costume.copy();
        arr.push(cst);
        if (costume === myself.costume) {
            c.costume = cst;
        }
    });
    c.costumes = new List(arr);
    arr = [];
    this.sounds.asArray().forEach(function (sound) {
        arr.push(sound);
    });
    c.sounds = new List(arr);
    c.nestingScale = 1;
    c.rotatesWithAnchor = true;
    c.anchor = null;
    c.parts = [];
    this.parts.forEach(function (part) {
        dp = part.fullCopy();
        dp.nestingScale = part.nestingScale;
        dp.rotatesWithAnchor = part.rotatesWithAnchor;
        c.attachPart(dp);
    });

    return c;
};

SpriteMorph.prototype.appearIn = function (ide) {
    // private - used in IDE_Morph.duplicateSprite()
    this.name = ide.newSpriteName(this.name);
    ide.stage.add(this);
    ide.sprites.add(this);
    ide.corral.addSprite(this);
    this.parts.forEach(function (part) {
        part.appearIn(ide);
    });
};

// SpriteMorph versioning

SpriteMorph.prototype.setName = function (string) {
    this.name = string || this.name;
    this.version = Date.now();
};

// SpriteMorph rendering

SpriteMorph.prototype.drawNew = function () {
    var myself = this,
        currentCenter = this.center(),
        facing, // actual costume heading based on my rotation style
        isFlipped,
        isLoadingCostume = this.costume &&
            typeof this.costume.loaded === 'function',
        cst,
        pic, // (flipped copy of) actual costume based on my rotation style
        stageScale = this.parent instanceof StageMorph ?
                this.parent.scale : 1,
        newX,
        corners = [],
        origin,
        shift,
        corner,
        costumeExtent,
        ctx,
        handle;

    if (this.isWarped) {
        this.wantsRedraw = true;
        return;
    }
    facing = this.rotationStyle ? this.heading : 90;
    if (this.rotationStyle === 2) {
        facing = 90;
        if ((this.heading > 180 && (this.heading < 360))
                || (this.heading < 0 && (this.heading > -180))) {
            isFlipped = true;
        }
    }
    if (this.costume && !isLoadingCostume) {
        pic = isFlipped ? this.costume.flipped() : this.costume;

        // determine the rotated costume's bounding box
        corners = pic.bounds().corners().map(function (point) {
            return point.rotateBy(
                radians(facing - 90),
                myself.costume.center()
            );
        });
        origin = corners[0];
        corner = corners[0];
        corners.forEach(function (point) {
            origin = origin.min(point);
            corner = corner.max(point);
        });
        costumeExtent = origin.corner(corner)
            .extent().multiplyBy(this.scale * stageScale);

        // determine the new relative origin of the rotated shape
        shift = new Point(0, 0).rotateBy(
            radians(-(facing - 90)),
            pic.center()
        ).subtract(origin);

        // create a new, adequately dimensioned canvas
        // and draw the costume on it
        this.image = newCanvas(costumeExtent);
        this.silentSetExtent(costumeExtent);
        ctx = this.image.getContext('2d');
        ctx.scale(this.scale * stageScale, this.scale * stageScale);
        ctx.translate(shift.x, shift.y);
        ctx.rotate(radians(facing - 90));
        ctx.drawImage(pic.contents, 0, 0);

        // apply graphics effects to image
        this.image = this.applyGraphicsEffects(this.image);

        // adjust my position to the rotation
        this.setCenter(currentCenter, true); // just me

        // determine my rotation offset
        this.rotationOffset = shift
            .translateBy(pic.rotationCenter)
            .rotateBy(radians(-(facing - 90)), shift)
            .scaleBy(this.scale * stageScale);
    } else {
        facing = isFlipped ? -90 : facing;
        newX = Math.min(
            Math.max(
                this.normalExtent.x * this.scale * stageScale,
                5
            ),
            1000
        );
        this.silentSetExtent(new Point(newX, newX));
        this.image = newCanvas(this.extent());
        this.setCenter(currentCenter, true); // just me
        SpriteMorph.uber.drawNew.call(this, facing);
        this.rotationOffset = this.extent().divideBy(2);
        this.image = this.applyGraphicsEffects(this.image);
        if (isLoadingCostume) { // retry until costume is done loading
            cst = this.costume;
            handle = setInterval(
                function () {
                    myself.wearCostume(cst);
                    clearInterval(handle);
                },
                100
            );
            return myself.wearCostume(null);

        }
    }
    this.version = Date.now();
};

SpriteMorph.prototype.endWarp = function () {
    this.isWarped = false;
    if (this.wantsRedraw) {
        var x = this.xPosition(),
            y = this.yPosition();
        this.drawNew();
        this.silentGotoXY(x, y, true); // just me
        this.wantsRedraw = false;
    }
    this.parent.changed();
};

SpriteMorph.prototype.rotationCenter = function () {
    return this.position().add(this.rotationOffset);
};

SpriteMorph.prototype.colorFiltered = function (aColor) {
    // answer a new Morph containing my image filtered by aColor
    // ignore transparency (alpha)
    var morph = new Morph(),
        ext = this.extent(),
        ctx,
        src,
        clr,
        i,
        dta;

    src = this.image.getContext('2d').getImageData(0, 0, ext.x, ext.y);
    morph.image = newCanvas(ext);
    morph.bounds = this.bounds.copy();
    ctx = morph.image.getContext('2d');
    dta = ctx.createImageData(ext.x, ext.y);
    for (i = 0; i < ext.x * ext.y * 4; i += 4) {
        clr = new Color(
            src.data[i],
            src.data[i + 1],
            src.data[i + 2]
        );
        if (clr.eq(aColor)) {
            dta.data[i] = src.data[i];
            dta.data[i + 1] = src.data[i + 1];
            dta.data[i + 2] = src.data[i + 2];
            dta.data[i + 3] = 255;
        }
    }
    ctx.putImageData(dta, 0, 0);
    return morph;
};

// SpriteMorph block instantiation

SpriteMorph.prototype.blockForSelector = function (selector, setDefaults) {
    var migration, info, block, defaults, inputs, i;
    migration = this.blockMigrations[selector];
    info = this.blocks[migration ? migration.selector : selector];
    if (!info) {return null; }
    block = info.type === 'command' ? new CommandBlockMorph()
        : info.type === 'hat' ? new HatBlockMorph()
            : info.type === 'ring' ? new RingMorph()
                : new ReporterBlockMorph(info.type === 'predicate');
    block.color = this.blockColor[info.category];
    block.category = info.category;
    block.selector = selector;
    if (contains(['reifyReporter', 'reifyPredicate'], block.selector)) {
        block.isStatic = true;
    }
    block.setSpec(localize(info.spec));
    if ((setDefaults && info.defaults) || (migration && migration.inputs)) {
        defaults = migration ? migration.inputs : info.defaults;
        block.defaults = defaults;
        inputs = block.inputs();
        if (inputs[0] instanceof MultiArgMorph) {
            inputs[0].setContents(defaults);
            inputs[0].defaults = defaults;
        } else {
            for (i = 0; i < defaults.length; i += 1) {
                if (defaults[i] !== null) {
                    inputs[i].setContents(defaults[i]);
                }
            }
        }
    }
    return block;
};

SpriteMorph.prototype.variableBlock = function (varName) {
    var block = new ReporterBlockMorph(false);
    block.selector = 'reportGetVar';
    block.color = this.blockColor.variables;
    block.category = 'variables';
    block.setSpec(varName);
    block.isDraggable = true;
    return block;
};

// SpriteMorph block templates

SpriteMorph.prototype.blockTemplates = function (category) {
    var blocks = [], myself = this, varNames, button,
        cat = category || 'motion', txt;

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
        blocks.push(block('receiveClick'));
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
                    function (pair) {
                        if (pair && !myself.variables.silentFind(pair[0])) {
                            myself.addVariable(pair[0], pair[1]);
                            myself.toggleVariableWatcher(pair[0], pair[1]);
                            myself.blocksCache[cat] = null;
                            myself.paletteCache[cat] = null;
                            myself.parentThatIsA(IDE_Morph).refreshPalette();
                        }
                    },
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

        if (this.variables.allNames().length > 0) {
            button = new PushButtonMorph(
                null,
                function () {
                    var menu = new MenuMorph(
                        myself.deleteVariable,
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
        button.userMenu = helpMenu;
        button.selector = 'addCustomBlock';
        button.showHelp = BlockMorph.prototype.showHelp;
        blocks.push(button);
    }
    return blocks;
};

SpriteMorph.prototype.palette = function (category) {
    if (!this.paletteCache[category]) {
        this.paletteCache[category] = this.freshPalette(category);
    }
    return this.paletteCache[category];
};

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
                return defs[any].category === category ||
                    contains((more[category] || []), any);
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
                        if (defs[sel].category === category) {
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
                if (block.fixLayout) {block.fixLayout(); }
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
                            ['lists', 'other'],
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
                        ['lists', 'other'],
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

    //layout

    palette.scrollX(palette.padding);
    palette.scrollY(palette.padding);

    Morph.prototype.trackChanges = oldFlag;
    return palette;
};

// SpriteMorph blocks searching

SpriteMorph.prototype.blocksMatching = function (searchString, strictly) {
    // answer an array of block templates whose spec contains
    // the given search string, ordered by descending relevance
    var blocks = [],
        blocksDict,
        myself = this,
        search = searchString.toLowerCase(),
        stage = this.parentThatIsA(StageMorph);

    function labelOf(aBlockSpec) {
        var words = (BlockMorph.prototype.parseSpec(aBlockSpec)),
            filtered = words.filter(
                function (each) {return (each.indexOf('%') !== 0); }
            );
        return filtered.join(' ');
    }

    function fillDigits(anInt, totalDigits, fillChar) {
        var ans = String(anInt);
        while (ans.length < totalDigits) {ans = fillChar + ans; }
        return ans;
    }

    function relevance(aBlockLabel, aSearchString) {
        var lbl = ' ' + aBlockLabel,
            idx = lbl.indexOf(aSearchString),
            atWord;
        if (idx === -1) {return -1; }
        atWord = (lbl.charAt(idx - 1) === ' ');
        if (strictly && !atWord) {return -1; }
        return (atWord ? '1' : '2') + fillDigits(idx, 4, '0');
    }

    function primitive(selector) {
        var newBlock = SpriteMorph.prototype.blockForSelector(selector, true);
        newBlock.isTemplate = true;
        return newBlock;
    }

    // custom blocks
    [this.customBlocks, stage.globalBlocks].forEach(function (blocksList) {
        blocksList.forEach(function (definition) {
            var spec = localize(definition.blockSpec()).toLowerCase(),
                rel = relevance(labelOf(spec), search);
            if (rel !== -1) {
                blocks.push([definition.templateInstance(), rel + '1']);
            }
        });
    });
    // primitives
    blocksDict = SpriteMorph.prototype.blocks;
    Object.keys(blocksDict).forEach(function (selector) {
        if (!StageMorph.prototype.hiddenPrimitives[selector]) {
            var block = blocksDict[selector],
                spec = localize(block.spec).toLowerCase(),
                rel = relevance(labelOf(spec), search);
            if (
                (rel !== -1) &&
                    (!block.dev) &&
                    (!block.only || (block.only === myself.constructor))
            ) {
                blocks.push([primitive(selector), rel + '2']);
            }
        }
    });
    blocks.sort(function (x, y) {return x[1] < y[1] ? -1 : 1; });
    return blocks.map(function (each) {return each[0]; });
};

SpriteMorph.prototype.searchBlocks = function () {
    var myself = this,
        unit = SyntaxElementMorph.prototype.fontSize,
        ide = this.parentThatIsA(IDE_Morph),
        oldSearch = '',
        searchBar = new InputFieldMorph(''),
        searchPane = ide.createPalette('forSearch');

    function show(blocks) {
        var oldFlag = Morph.prototype.trackChanges,
            x = searchPane.contents.left() + 5,
            y = (searchBar.bottom() + unit);
        Morph.prototype.trackChanges = false;
        searchPane.contents.children = [searchPane.contents.children[0]];
        blocks.forEach(function (block) {
            block.setPosition(new Point(x, y));
            searchPane.addContents(block);
            y += block.height();
            y += unit * 0.3;
        });
        Morph.prototype.trackChanges = oldFlag;
        searchPane.changed();
    }

    searchPane.owner = this;
    searchPane.color = myself.paletteColor;
    searchPane.contents.color = myself.paletteColor;
    searchPane.addContents(searchBar);
    searchBar.drawNew();
    searchBar.setWidth(ide.logo.width() - 30);
    searchBar.contrast = 90;
    searchBar.setPosition(
        searchPane.contents.topLeft().add(new Point(10, 10))
    );
    searchBar.drawNew();

    searchPane.accept = function () {
        var search = searchBar.getValue();
        if (search.length > 0) {
            show(myself.blocksMatching(search));
        }
    };

    searchPane.reactToKeystroke = function () {
        var search = searchBar.getValue();
        if (search !== oldSearch) {
            oldSearch = search;
            show(myself.blocksMatching(search, search.length < 2));
        }
    };

    searchBar.cancel = function () {
        ide.refreshPalette();
        ide.palette.adjustScrollBars();
    };

    ide.fixLayout('refreshPalette');
    searchBar.edit();
};

// SpriteMorph variable management

SpriteMorph.prototype.addVariable = function (name, isGlobal) {
    var ide = this.parentThatIsA(IDE_Morph);
    if (isGlobal) {
        this.variables.parentFrame.addVar(name);
        if (ide) {
            ide.flushBlocksCache('variables');
        }
    } else {
        this.variables.addVar(name);
        this.blocksCache.variables = null;
    }
};

SpriteMorph.prototype.deleteVariable = function (varName) {
    var ide = this.parentThatIsA(IDE_Morph);
    this.deleteVariableWatcher(varName);
    this.variables.deleteVar(varName);
    if (ide) {
        ide.flushBlocksCache('variables'); // b/c the var could be global
        ide.refreshPalette();
    }
};

// SpriteMorph costume management

SpriteMorph.prototype.addCostume = function (costume) {
    if (!costume.name) {
        costume.name = 'costume' + (this.costumes.length() + 1);
    }
    this.costumes.add(costume);
};

SpriteMorph.prototype.wearCostume = function (costume) {
    var x = this.xPosition ? this.xPosition() : null,
        y = this.yPosition ? this.yPosition() : null,
        isWarped = this.isWarped;
    if (isWarped) {
        this.endWarp();
    }
    this.changed();
    this.costume = costume;
    this.drawNew();
    this.changed();
    if (isWarped) {
        this.startWarp();
    }
    if (x !== null) {
        this.silentGotoXY(x, y, true); // just me
    }
    if (this.positionTalkBubble) { // the stage doesn't talk
        this.positionTalkBubble();
    }
    this.version = Date.now();
};

SpriteMorph.prototype.getCostumeIdx = function () {
    return this.costumes.asArray().indexOf(this.costume) + 1;
};

SpriteMorph.prototype.doWearNextCostume = function () {
    var arr = this.costumes.asArray(),
        idx;
    if (arr.length > 1) {
        idx = arr.indexOf(this.costume);
        if (idx > -1) {
            idx += 1;
            if (idx > (arr.length - 1)) {
                idx = 0;
            }
            this.wearCostume(arr[idx]);
        }
    }
};

SpriteMorph.prototype.doWearPreviousCostume = function () {
    var arr = this.costumes.asArray(),
        idx;
    if (arr.length > 1) {
        idx = arr.indexOf(this.costume);
        if (idx > -1) {
            idx -= 1;
            if (idx < 0) {
                idx = arr.length - 1;
            }
            this.wearCostume(arr[idx]);
        }
    }
};

SpriteMorph.prototype.doSwitchToCostume = function (id) {
    if (id instanceof Costume) { // allow first-class costumes
        this.wearCostume(id);
        return;
    }

    var num,
        arr = this.costumes.asArray(),
        costume;
    if (
        contains(
            [localize('Turtle'), localize('Empty')],
            (id instanceof Array ? id[0] : null)
        )
    ) {
        costume = null;
    } else {
        if (id === -1) {
            this.doWearPreviousCostume();
            return;
        }
        costume = detect(arr, function (cst) {
            return cst.name === id;
        });
        if (costume === null) {
            num = parseFloat(id);
            if (num === 0) {
                costume = null;
            } else {
                costume = arr[num - 1] || null;
            }
        }
    }
    this.wearCostume(costume);
};

SpriteMorph.prototype.reportCostumes = function () {
    return this.costumes;
};

// SpriteMorph sound management

SpriteMorph.prototype.addSound = function (audio, name) {
    this.sounds.add(new Sound(audio, name));
};

SpriteMorph.prototype.playSound = function (name) {
    var stage = this.parentThatIsA(StageMorph),
        sound = detect(
            this.sounds.asArray(),
            function (s) {return s.name === name; }
        ),
        active;
    if (sound) {
        active = sound.play();
        if (stage) {
            stage.activeSounds.push(active);
            stage.activeSounds = stage.activeSounds.filter(function (aud) {
                return !aud.ended && !aud.terminated;
            });
        }
        return active;
    }
};

SpriteMorph.prototype.reportSounds = function () {
    return this.sounds;
};

// SpriteMorph user menu

SpriteMorph.prototype.userMenu = function () {
    var ide = this.parentThatIsA(IDE_Morph),
        menu = new MenuMorph(this);

    if (ide && ide.isAppMode) {
        // menu.addItem('help', 'nop');
        return menu;
    }
    menu.addItem("duplicate", 'duplicate');
    menu.addItem("delete", 'remove');
    menu.addItem("move", 'move');
    menu.addItem("edit", 'edit');
    menu.addLine();
    if (this.anchor) {
        menu.addItem(
            localize('detach from') + ' ' + this.anchor.name,
            'detachFromAnchor'
        );
    }
    if (this.parts.length) {
        menu.addItem('detach all parts', 'detachAllParts');
    }
    menu.addItem("export...", 'exportSprite');
    return menu;
};

SpriteMorph.prototype.exportSprite = function () {
    var ide = this.parentThatIsA(IDE_Morph);
    if (ide) {
        ide.exportSprite(this);
    }
};

SpriteMorph.prototype.edit = function () {
    var ide = this.parentThatIsA(IDE_Morph);
    if (ide && !ide.isAppMode) {
        ide.selectSprite(this);
    }
};

SpriteMorph.prototype.showOnStage = function () {
    var stage = this.parentThatIsA(StageMorph);
    if (stage) {
        this.keepWithin(stage);
        stage.add(this);
    }
    this.show();
};

SpriteMorph.prototype.duplicate = function () {
    var ide = this.parentThatIsA(IDE_Morph);
    if (ide) {
        ide.duplicateSprite(this);
    }
};

SpriteMorph.prototype.remove = function () {
    var ide = this.parentThatIsA(IDE_Morph);
    if (ide) {
        ide.removeSprite(this);
    }
};

// SpriteMorph cloning (experimental)

SpriteMorph.prototype.createClone = function () {
    var stage = this.parentThatIsA(StageMorph);
    if (stage && stage.cloneCount <= 300) {
        this.fullCopy().clonify(stage);
    }
};

SpriteMorph.prototype.clonify = function (stage) {
    var hats;
    this.parts.forEach(function (part) {
        part.clonify(stage);
    });
    stage.cloneCount += 1;
    this.cloneOriginName = this.isClone ?
            this.cloneOriginName : this.name;
    this.isClone = true;
    this.name = '';
    stage.add(this);
    hats = this.allHatBlocksFor('__clone__init__');
    hats.forEach(function (block) {
        stage.threads.startProcess(block, stage.isThreadSafe);
    });
};

SpriteMorph.prototype.removeClone = function () {
    if (this.isClone) {
        // this.stopTalking();
        this.parent.threads.stopAllForReceiver(this);
        this.destroy();
        this.parent.cloneCount -= 1;
    }
};

// SpriteMorph primitives

// SpriteMorph hiding and showing:

/*
    override the inherited behavior to also hide/show all
    nested parts.
*/

SpriteMorph.prototype.hide = function () {
    SpriteMorph.uber.hide.call(this);
    this.parts.forEach(function (part) {part.hide(); });
};

SpriteMorph.prototype.show = function () {
    SpriteMorph.uber.show.call(this);
    this.parts.forEach(function (part) {part.show(); });
};

// SpriteMorph pen color

SpriteMorph.prototype.setColor = function (aColor) {
    var x = this.xPosition(),
        y = this.yPosition();
    if (!this.color.eq(aColor)) {
        this.color = aColor;
        this.drawNew();
        this.gotoXY(x, y);
    }
};

SpriteMorph.prototype.getHue = function () {
    return this.color.hsv()[0] * 100;
};

SpriteMorph.prototype.setHue = function (num) {
    var hsv = this.color.hsv(),
        x = this.xPosition(),
        y = this.yPosition();

    hsv[0] = Math.max(Math.min(+num || 0, 100), 0) / 100;
    hsv[1] = 1; // we gotta fix this at some time
    this.color.set_hsv.apply(this.color, hsv);
    if (!this.costume) {
        this.drawNew();
        this.changed();
    }
    this.gotoXY(x, y);
};

SpriteMorph.prototype.changeHue = function (delta) {
    this.setHue(this.getHue() + (+delta || 0));
};

SpriteMorph.prototype.getBrightness = function () {
    return this.color.hsv()[2] * 100;
};

SpriteMorph.prototype.setBrightness = function (num) {
    var hsv = this.color.hsv(),
        x = this.xPosition(),
        y = this.yPosition();

    hsv[1] = 1; // we gotta fix this at some time
    hsv[2] = Math.max(Math.min(+num || 0, 100), 0) / 100;
    this.color.set_hsv.apply(this.color, hsv);
    if (!this.costume) {
        this.drawNew();
        this.changed();
    }
    this.gotoXY(x, y);
};

SpriteMorph.prototype.changeBrightness = function (delta) {
    this.setBrightness(this.getBrightness() + (+delta || 0));
};

// SpriteMorph layers

SpriteMorph.prototype.comeToFront = function () {
    if (this.parent) {
        this.parent.add(this);
        this.changed();
    }
};

SpriteMorph.prototype.goBack = function (layers) {
    var layer, newLayer = +layers || 0;
    if (!this.parent) {return null; }
    layer = this.parent.children.indexOf(this);
    if (layer < newLayer) {return null; }
    this.parent.removeChild(this);
    this.parent.children.splice(layer - newLayer, null, this);
    this.parent.changed();
};

// SpriteMorph collision detection optimization

SpriteMorph.prototype.overlappingImage = function (otherSprite) {
    // overrides method from Morph because Sprites aren't nested Morphs
    var oRect = this.bounds.intersect(otherSprite.bounds),
        oImg = newCanvas(oRect.extent()),
        ctx = oImg.getContext('2d');

    if (oRect.width() < 1 || oRect.height() < 1) {
        return newCanvas(new Point(1, 1));
    }
    ctx.drawImage(
        this.image,
        this.left() - oRect.left(),
        this.top() - oRect.top()
    );
    ctx.globalCompositeOperation = 'source-in';
    ctx.drawImage(
        otherSprite.image,
        otherSprite.left() - oRect.left(),
        otherSprite.top() - oRect.top()
    );
    return oImg;
};

// SpriteMorph stamping

SpriteMorph.prototype.doStamp = function () {
    var stage = this.parent,
        context = stage.penTrails().getContext('2d'),
        isWarped = this.isWarped;
    if (isWarped) {
        this.endWarp();
    }
    context.save();
    context.scale(1 / stage.scale, 1 / stage.scale);
    context.drawImage(
        this.image,
        (this.left() - stage.left()),
        (this.top() - stage.top())
    );
    context.restore();
    this.changed();
    if (isWarped) {
        this.startWarp();
    }
};

SpriteMorph.prototype.clear = function () {
    this.parent.clearPenTrails();
};

// SpriteMorph pen size

SpriteMorph.prototype.setSize = function (size) {
    // pen size
    if (!isNaN(size)) {
        this.size = Math.min(Math.max(+size, 0.0001), 1000);
    }
};

SpriteMorph.prototype.changeSize = function (delta) {
    this.setSize(this.size + (+delta || 0));
};

// SpriteMorph scale

SpriteMorph.prototype.getScale = function () {
    // answer my scale in percent
    return this.scale * 100;
};

SpriteMorph.prototype.setScale = function (percentage) {
    // set my (absolute) scale in percent
    var x = this.xPosition(),
        y = this.yPosition(),
        isWarped = this.isWarped,
        realScale,
        growth;

    if (isWarped) {
        this.endWarp();
    }
    realScale = (+percentage || 0) / 100;
    growth = realScale / this.nestingScale;
    this.nestingScale = realScale;
    this.scale = Math.max(realScale, 0.01);

    // apply to myself
    this.changed();
    this.drawNew();
    this.changed();
    if (isWarped) {
        this.startWarp();
    }
    this.silentGotoXY(x, y, true); // just me
    this.positionTalkBubble();

    // propagate to nested parts
    this.parts.forEach(function (part) {
        var xDist = part.xPosition() - x,
            yDist = part.yPosition() - y;
        part.setScale(part.scale * 100 * growth);
        part.silentGotoXY(
            x + (xDist * growth),
            y + (yDist * growth)
        );
    });
};

SpriteMorph.prototype.changeScale = function (delta) {
    this.setScale(this.getScale() + (+delta || 0));
};

// Spritemorph graphic effects

SpriteMorph.prototype.graphicsChanged = function () {
    var myself = this;
    return Object.keys(this.graphicsValues).some(
        function (any) {
            return myself.graphicsValues[any] < 0 ||
                    myself.graphicsValues[any] > 0;
        }
    );
};

SpriteMorph.prototype.applyGraphicsEffects = function (canvas) {
// For every effect: apply transform of that effect(canvas, stored value)
// The future: write more effects here
    var ctx, imagedata, pixels, newimagedata;

    function transform_negative(p, value) {
        var i, rcom, gcom, bcom;
        if (value !== 0) {
            for (i = 0; i < p.length; i += 4) {
                rcom = 255 - p[i];
                gcom = 255 - p[i + 1];
                bcom = 255 - p[i + 2];

                if (p[i] < rcom) { //compare to the complement
                    p[i] += value;
                } else if (p[i] > rcom) {
                    p[i] -= value;
                }
                if (p[i + 1] < gcom) {
                    p[i + 1] += value;
                } else if (p[i + 1] > gcom) {
                    p[i + 1] -= value;
                }
                if (p[i + 2] < bcom) {
                    p[i + 2] += value;
                } else if (p[i + 2] > bcom) {
                    p[i + 2] -= value;
                }
            }
        }
        return p;
    }

    function transform_brightness(p, value) {
        var i;
        if (value !== 0) {
            for (i = 0; i < p.length; i += 4) {
                p[i] += value; //255 = 100% of this color 
                p[i + 1] += value;
                p[i + 2] += value;
            }
        }
        return p;
    }

    function transform_comic(p, value) {
        var i;
        if (value !== 0) {
            for (i = 0; i < p.length; i += 4) {
                p[i] += Math.sin(i * value) * 127 + 128;
                p[i + 1] += Math.sin(i * value) * 127 + 128;
                p[i + 2] += Math.sin(i * value) * 127 + 128;
            }
        }
        return p;
    }

    function transform_duplicate(p, value) {
        var i;
        if (value !== 0) {
            for (i = 0; i < p.length; i += 4) {
                p[i] = p[i * value];
                p[i + 1] = p[i * value + 1];
                p[i + 2] = p[i * value + 2];
                p[i + 3] = p[i * value + 3];
            }
        }
        return p;
    }

    function transform_confetti(p, value) {
        var i;
        if (value !== 0) {
            for (i = 0; i < p.length; i += 1) {
                p[i] = Math.sin(value * p[i]) * 127 + p[i];
            }
        }
        return p;
    }

    if (this.graphicsChanged()) {
        ctx = canvas.getContext("2d");
        imagedata = ctx.getImageData(0, 0, canvas.width, canvas.height);
        pixels = imagedata.data;

        //A sprite should wear all 7 effects at once
        /*pixels = transform_whirl(pixels, this.graphicsValues.whirl);*/
        pixels = transform_negative(pixels, this.graphicsValues.negative);
        pixels = transform_brightness(pixels, this.graphicsValues.brightness);
        pixels = transform_comic(pixels, this.graphicsValues.comic);
        /*pixels = transform_pixelate(pixels, this.graphicsValues.pixelate);*/
        pixels = transform_duplicate(pixels, this.graphicsValues.duplicate);
        /*pixels = transform_color(pixels, this.graphicsValues.color);*/
        /*pixels = transform_fisheye(pixels, this.graphicsValues.fisheye);*/
        pixels = transform_confetti(pixels, this.graphicsValues.confetti);

        //the last object will have all the transformations done on it
        newimagedata = ctx.createImageData(imagedata); //make imgdata object
        newimagedata.data.set(pixels); //add transformed pixels
        ctx.putImageData(newimagedata, 0, 0);
    }

    return canvas;
};

SpriteMorph.prototype.setEffect = function (effect, value) {
    var eff = effect instanceof Array ? effect[0] : null;
    if (eff === 'ghost') {
        this.alpha = 1 - Math.min(Math.max(+value || 0, 0), 100) / 100;
    } else {
        this.graphicsValues[eff] = value;
    }
    this.drawNew();
    this.changed();
};

SpriteMorph.prototype.getGhostEffect = function () {
    return (1 - this.alpha) * 100;
};

SpriteMorph.prototype.changeEffect = function (effect, value) {
    var eff = effect instanceof Array ? effect[0] : null;
    if (eff === 'ghost') {
        this.setEffect(effect, this.getGhostEffect() + (+value || 0));
    } else {
        this.setEffect(effect, this.graphicsValues[eff] + value);
    }
};

SpriteMorph.prototype.clearEffects = function () {
    var effect;
    for (effect in this.graphicsValues) {
        if (this.graphicsValues.hasOwnProperty(effect)) {
            this.setEffect([effect], 0);
        }
    }
    this.setEffect(['ghost'], 0);
};

// SpriteMorph talk bubble

SpriteMorph.prototype.stopTalking = function () {
    var bubble = this.talkBubble();
    if (bubble) {bubble.destroy(); }
};

SpriteMorph.prototype.doThink = function (data) {
    this.bubble(data, true);
};

SpriteMorph.prototype.bubble = function (data, isThought, isQuestion) {
    var bubble,
        stage = this.parentThatIsA(StageMorph);

    this.stopTalking();
    if (data === '' || isNil(data)) {return; }
    bubble = new SpriteBubbleMorph(
        data,
        stage ? stage.scale : 1,
        isThought,
        isQuestion
    );
    this.add(bubble);
    this.positionTalkBubble();
};

SpriteMorph.prototype.talkBubble = function () {
    return detect(
        this.children,
        function (morph) {return morph instanceof SpeechBubbleMorph; }
    );
};

SpriteMorph.prototype.positionTalkBubble = function () {
    var stage = this.parentThatIsA(StageMorph),
        stageScale = stage ? stage.scale : 1,
        bubble = this.talkBubble(),
        middle = this.center().y;
    if (!bubble) {return null; }
    bubble.show();
    if (!bubble.isPointingRight) {
        bubble.isPointingRight = true;
        bubble.drawNew();
        bubble.changed();
    }
    bubble.setLeft(this.right());
    bubble.setBottom(this.top());
    while (!this.isTouching(bubble) && bubble.bottom() < middle) {
        bubble.silentMoveBy(new Point(-1, 1).scaleBy(stageScale));
    }
    if (!stage) {return null; }
    if (bubble.right() > stage.right()) {
        bubble.isPointingRight = false;
        bubble.drawNew();
        bubble.setRight(this.center().x);
    }
    bubble.keepWithin(stage);
    bubble.changed();
};

// dragging and dropping adjustments b/c of talk bubbles

SpriteMorph.prototype.prepareToBeGrabbed = function (hand) {
    var bubble = this.talkBubble();
    if (!bubble) {return null; }
    this.removeShadow();
    bubble.hide();
    if (!this.bounds.containsPoint(hand.position())) {
        this.setCenter(hand.position());
    }
    this.addShadow();
};

SpriteMorph.prototype.justDropped = function () {
    this.positionTalkBubble();
};

// SpriteMorph drawing:

SpriteMorph.prototype.drawLine = function (start, dest) {
    var stagePos = this.parent.bounds.origin,
        stageScale = this.parent.scale,
        context = this.parent.penTrails().getContext('2d'),
        from = start.subtract(stagePos).divideBy(stageScale),
        to = dest.subtract(stagePos).divideBy(stageScale),
        damagedFrom = from.multiplyBy(stageScale).add(stagePos),
        damagedTo = to.multiplyBy(stageScale).add(stagePos),
        damaged = damagedFrom.rectangle(damagedTo).expandBy(
            Math.max(this.size * stageScale / 2, 1)
        ).intersect(this.parent.visibleBounds()).spread();

    if (this.isDown) {
        context.lineWidth = this.size;
        context.strokeStyle = this.color.toString();
        if (this.useFlatLineEnds) {
            context.lineCap = 'butt';
            context.lineJoin = 'miter';
        } else {
            context.lineCap = 'round';
            context.lineJoin = 'round';
        }
        context.beginPath();
        context.moveTo(from.x, from.y);
        context.lineTo(to.x, to.y);
        context.stroke();
        if (this.isWarped === false) {
            this.world().broken.push(damaged);
        }
    }
};

// SpriteMorph motion - adjustments due to nesting

SpriteMorph.prototype.moveBy = function (delta, justMe) {
    // override the inherited default to make sure my parts follow
    // unless it's justMe (a correction)
    var start = this.isDown && !justMe && this.parent ?
            this.rotationCenter() : null;
    SpriteMorph.uber.moveBy.call(this, delta);
    if (start) {
        this.drawLine(start, this.rotationCenter());
    }
    if (!justMe) {
        this.parts.forEach(function (part) {
            part.moveBy(delta);
        });
    }
};

SpriteMorph.prototype.slideBackTo = function (situation, inSteps) {
    // override the inherited default to make sure my parts follow
    var steps = inSteps || 5,
        pos = situation.origin.position().add(situation.position),
        xStep = -(this.left() - pos.x) / steps,
        yStep = -(this.top() - pos.y) / steps,
        stepCount = 0,
        oldStep = this.step,
        oldFps = this.fps,
        myself = this;

    this.fps = 0;
    this.step = function () {
        myself.moveBy(new Point(xStep, yStep));
        stepCount += 1;
        if (stepCount === steps) {
            situation.origin.add(myself);
            if (situation.origin.reactToDropOf) {
                situation.origin.reactToDropOf(myself);
            }
            myself.step = oldStep;
            myself.fps = oldFps;
        }
    };
};

SpriteMorph.prototype.setCenter = function (aPoint, justMe) {
    // override the inherited default to make sure my parts follow
    // unless it's justMe
    var delta = aPoint.subtract(this.center());
    this.moveBy(delta, justMe);
};

SpriteMorph.prototype.nestingBounds = function () {
    // same as fullBounds(), except that it uses "parts" instead of children
    var result;
    result = this.bounds;
    this.parts.forEach(function (part) {
        if (part.isVisible) {
            result = result.merge(part.nestingBounds());
        }
    });
    return result;
};

// SpriteMorph motion primitives

Morph.prototype.setPosition = function (aPoint, justMe) {
    // override the inherited default to make sure my parts follow
    // unless it's justMe
    var delta = aPoint.subtract(this.topLeft());
    if ((delta.x !== 0) || (delta.y !== 0)) {
        this.moveBy(delta, justMe);
    }
};

SpriteMorph.prototype.forward = function (steps) {
    var dest,
        dist = steps * this.parent.scale || 0;

    if (dist >= 0) {
        dest = this.position().distanceAngle(dist, this.heading);
    } else {
        dest = this.position().distanceAngle(
            Math.abs(dist),
            (this.heading - 180)
        );
    }
    this.setPosition(dest);
    this.positionTalkBubble();
};

SpriteMorph.prototype.setHeading = function (degrees) {
    var x = this.xPosition(),
        y = this.yPosition(),
        dir = (+degrees || 0),
        turn = dir - this.heading;

    // apply to myself
    this.changed();
    SpriteMorph.uber.setHeading.call(this, dir);
    this.silentGotoXY(x, y, true); // just me
    this.positionTalkBubble();

    // propagate to my parts
    this.parts.forEach(function (part) {
        var pos = new Point(part.xPosition(), part.yPosition()),
            trg = pos.rotateBy(radians(turn), new Point(x, y));
        if (part.rotatesWithAnchor) {
            part.turn(turn);
        }
        part.gotoXY(trg.x, trg.y);
    });
};

SpriteMorph.prototype.faceToXY = function (x, y) {
    var deltaX = (x - this.xPosition()) * this.parent.scale,
        deltaY = (y - this.yPosition()) * this.parent.scale,
        angle = Math.abs(deltaX) < 0.001 ? (deltaY < 0 ? 90 : 270)
                : Math.round(
                (deltaX >= 0 ? 0 : 180)
                    - (Math.atan(deltaY / deltaX) * 57.2957795131)
            );
    this.setHeading(angle + 90);
};

SpriteMorph.prototype.turn = function (degrees) {
    this.setHeading(this.heading + (+degrees || 0));
};

SpriteMorph.prototype.turnLeft = function (degrees) {
    this.setHeading(this.heading - (+degrees || 0));
};

SpriteMorph.prototype.xPosition = function () {
    var stage = this.parentThatIsA(StageMorph);

    if (!stage && this.parent.grabOrigin) { // I'm currently being dragged
        stage = this.parent.grabOrigin.origin;
    }
    if (stage) {
        return (this.rotationCenter().x - stage.center().x) / stage.scale;
    }
    return this.rotationCenter().x;
};

SpriteMorph.prototype.yPosition = function () {
    var stage = this.parentThatIsA(StageMorph);

    if (!stage && this.parent.grabOrigin) { // I'm currently being dragged
        stage = this.parent.grabOrigin.origin;
    }
    if (stage) {
        return (stage.center().y - this.rotationCenter().y) / stage.scale;
    }
    return this.rotationCenter().y;
};

SpriteMorph.prototype.direction = function () {
    return this.heading;
};

SpriteMorph.prototype.penSize = function () {
    return this.size;
};

SpriteMorph.prototype.gotoXY = function (x, y, justMe) {
    var stage = this.parentThatIsA(StageMorph),
        newX,
        newY,
        dest;

    newX = stage.center().x + (+x || 0) * stage.scale;
    newY = stage.center().y - (+y || 0) * stage.scale;
    if (this.costume) {
        dest = new Point(newX, newY).subtract(this.rotationOffset);
    } else {
        dest = new Point(newX, newY).subtract(this.extent().divideBy(2));
    }
    this.setPosition(dest, justMe);
    this.positionTalkBubble();
};

SpriteMorph.prototype.silentGotoXY = function (x, y, justMe) {
    // move without drawing
    var penState = this.isDown;
    this.isDown = false;
    this.gotoXY(x, y, justMe);
    this.isDown = penState;
};

SpriteMorph.prototype.setXPosition = function (num) {
    this.gotoXY(+num || 0, this.yPosition());
};

SpriteMorph.prototype.changeXPosition = function (delta) {
    this.setXPosition(this.xPosition() + (+delta || 0));
};

SpriteMorph.prototype.setYPosition = function (num) {
    this.gotoXY(this.xPosition(), +num || 0);
};

SpriteMorph.prototype.changeYPosition = function (delta) {
    this.setYPosition(this.yPosition() + (+delta || 0));
};

SpriteMorph.prototype.glide = function (
    duration,
    endX,
    endY,
    elapsed,
    startPoint
) {
    var fraction, endPoint, rPos;
    endPoint = new Point(endX, endY);
    fraction = Math.max(Math.min(elapsed / duration, 1), 0);
    rPos = startPoint.add(
        endPoint.subtract(startPoint).multiplyBy(fraction)
    );
    this.gotoXY(rPos.x, rPos.y);
};

SpriteMorph.prototype.bounceOffEdge = function () {
    // taking nested parts into account
    var stage = this.parentThatIsA(StageMorph),
        fb = this.nestingBounds(),
        dirX,
        dirY;

    if (!stage) {return null; }
    if (stage.bounds.containsRectangle(fb)) {return null; }

    dirX = Math.cos(radians(this.heading - 90));
    dirY = -(Math.sin(radians(this.heading - 90)));

    if (fb.left() < stage.left()) {
        dirX = Math.abs(dirX);
    }
    if (fb.right() > stage.right()) {
        dirX = -(Math.abs(dirX));
    }
    if (fb.top() < stage.top()) {
        dirY = -(Math.abs(dirY));
    }
    if (fb.bottom() > stage.bottom()) {
        dirY = Math.abs(dirY);
    }

    this.setHeading(degrees(Math.atan2(-dirY, dirX)) + 90);
    this.setPosition(this.position().add(
        fb.amountToTranslateWithin(stage.bounds)
    ));
    this.positionTalkBubble();
};

// SpriteMorph message broadcasting

SpriteMorph.prototype.allMessageNames = function () {
    var msgs = [];
    this.scripts.allChildren().forEach(function (morph) {
        var txt;
        if (morph.selector) {
            if (contains(
                    ['receiveMessage', 'doBroadcast', 'doBroadcastAndWait'],
                    morph.selector
                )) {
                txt = morph.inputs()[0].evaluate();
                if (isString(txt) && txt !== '') {
                    if (!contains(msgs, txt)) {
                        msgs.push(txt);
                    }
                }
            }
        }
    });
    return msgs;
};

SpriteMorph.prototype.allHatBlocksFor = function (message) {
    return this.scripts.children.filter(function (morph) {
        var event;
        if (morph.selector) {
            if (morph.selector === 'receiveMessage') {
                event = morph.inputs()[0].evaluate();
                return event === message || (event instanceof Array);
            }
            if (morph.selector === 'receiveGo') {
                return message === '__shout__go__';
            }
            if (morph.selector === 'receiveOnClone') {
                return message === '__clone__init__';
            }
            if (morph.selector === 'receiveClick') {
                return message === '__click__';
            }
        }
        return false;
    });
};

SpriteMorph.prototype.allHatBlocksForKey = function (key) {
    return this.scripts.children.filter(function (morph) {
        if (morph.selector) {
            if (morph.selector === 'receiveKey') {
                return morph.inputs()[0].evaluate()[0] === key;
            }
        }
        return false;
    });
};

// SpriteMorph events

SpriteMorph.prototype.mouseClickLeft = function () {
    var stage = this.parentThatIsA(StageMorph),
        hats = this.allHatBlocksFor('__click__'),
        procs = [];

    hats.forEach(function (block) {
        procs.push(stage.threads.startProcess(block, stage.isThreadSafe));
    });
    return procs;
};

SpriteMorph.prototype.mouseDoubleClick = function () {
    this.edit();
};

// SpriteMorph timer

SpriteMorph.prototype.getTimer = function () {
    var stage = this.parentThatIsA(StageMorph);
    if (stage) {
        return stage.getTimer();
    }
    return 0;
};

// SpriteMorph tempo

SpriteMorph.prototype.getTempo = function () {
    var stage = this.parentThatIsA(StageMorph);
    if (stage) {
        return stage.getTempo();
    }
    return 0;
};

// SpriteMorph last message

SpriteMorph.prototype.getLastMessage = function () {
    var stage = this.parentThatIsA(StageMorph);
    if (stage) {
        return stage.getLastMessage();
    }
    return '';
};

// SpriteMorph user prompting

SpriteMorph.prototype.getLastAnswer = function () {
    return this.parentThatIsA(StageMorph).lastAnswer;
};

// SpriteMorph mouse coordinates

SpriteMorph.prototype.reportMouseX = function () {
    var stage = this.parentThatIsA(StageMorph);
    if (stage) {
        return stage.reportMouseX();
    }
    return 0;
};

SpriteMorph.prototype.reportMouseY = function () {
    var stage = this.parentThatIsA(StageMorph);
    if (stage) {
        return stage.reportMouseY();
    }
    return 0;
};

// SpriteMorph variable watchers (for palette checkbox toggling)

SpriteMorph.prototype.findVariableWatcher = function (varName) {
    var stage = this.parentThatIsA(StageMorph),
        myself = this;
    if (stage === null) {
        return null;
    }
    return detect(
        stage.children,
        function (morph) {
            return morph instanceof WatcherMorph
                    && (morph.target === myself.variables
                            || morph.target === myself.variables.parentFrame)
                    && morph.getter === varName;
        }
    );
};

SpriteMorph.prototype.toggleVariableWatcher = function (varName, isGlobal) {
    var stage = this.parentThatIsA(StageMorph),
        watcher,
        others;
    if (stage === null) {
        return null;
    }
    watcher = this.findVariableWatcher(varName);
    if (watcher !== null) {
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
    if (isNil(isGlobal)) {
        isGlobal = contains(this.variables.parentFrame.names(), varName);
    }
    watcher = new WatcherMorph(
        varName,
        this.blockColor.variables,
        isGlobal ? this.variables.parentFrame : this.variables,
        varName
    );
    watcher.setPosition(stage.position().add(10));
    others = stage.watchers(watcher.left());
    if (others.length > 0) {
        watcher.setTop(others[others.length - 1].bottom());
    }
    stage.add(watcher);
    watcher.fixLayout();
    watcher.keepWithin(stage);
};

SpriteMorph.prototype.showingVariableWatcher = function (varName) {
    var stage = this.parentThatIsA(StageMorph),
        watcher;
    if (stage === null) {
        return false;
    }
    watcher = this.findVariableWatcher(varName);
    if (watcher) {
        return watcher.isVisible;
    }
    return false;
};

SpriteMorph.prototype.deleteVariableWatcher = function (varName) {
    var stage = this.parentThatIsA(StageMorph),
        watcher;
    if (stage === null) {
        return null;
    }
    watcher = this.findVariableWatcher(varName);
    if (watcher !== null) {
        watcher.destroy();
    }
};

// SpriteMorph non-variable watchers

SpriteMorph.prototype.toggleWatcher = function (selector, label, color) {
    var stage = this.parentThatIsA(StageMorph),
        watcher,
        others;
    if (!stage) { return; }
    watcher = this.watcherFor(stage, selector);
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
        label,
        color,
        WatcherMorph.prototype.isGlobal(selector) ? stage : this,
        selector
    );
    watcher.setPosition(stage.position().add(10));
    others = stage.watchers(watcher.left());
    if (others.length > 0) {
        watcher.setTop(others[others.length - 1].bottom());
    }
    stage.add(watcher);
    watcher.fixLayout();
    watcher.keepWithin(stage);
};

SpriteMorph.prototype.showingWatcher = function (selector) {
    var stage = this.parentThatIsA(StageMorph),
        watcher;
    if (stage === null) {
        return false;
    }
    watcher = this.watcherFor(stage, selector);
    if (watcher) {
        return watcher.isVisible;
    }
    return false;
};

SpriteMorph.prototype.watcherFor = function (stage, selector) {
    var myself = this;
    return detect(stage.children, function (morph) {
        return morph instanceof WatcherMorph &&
            morph.getter === selector &&
             morph.target === (morph.isGlobal(selector) ? stage : myself);
    });
};

// SpriteMorph custom blocks

SpriteMorph.prototype.deleteAllBlockInstances = function (definition) {
    this.allBlockInstances(definition).forEach(function (each) {
        each.deleteBlock();
    });
    this.customBlocks.forEach(function (def) {
        if (def.body && def.body.expression.isCorpse) {
            def.body = null;
        }
    });
};

SpriteMorph.prototype.allBlockInstances = function (definition) {
    var stage, objects, blocks = [], inDefinitions;
    if (definition.isGlobal) {
        stage = this.parentThatIsA(StageMorph);
        objects = stage.children.filter(function (morph) {
            return morph instanceof SpriteMorph;
        });
        objects.push(stage);
        objects.forEach(function (sprite) {
            blocks = blocks.concat(sprite.allLocalBlockInstances(definition));
        });
        inDefinitions = [];
        stage.globalBlocks.forEach(function (def) {
            if (def.body) {
                def.body.expression.allChildren().forEach(function (c) {
                    if (c.definition && (c.definition === definition)) {
                        inDefinitions.push(c);
                    }
                });
            }
        });
        return blocks.concat(inDefinitions);
    }
    return this.allLocalBlockInstances(definition);
};

SpriteMorph.prototype.allLocalBlockInstances = function (definition) {
    var inScripts, inDefinitions, inBlockEditors, inPalette, result;

    inScripts = this.scripts.allChildren().filter(function (c) {
        return c.definition && (c.definition === definition);
    });

    inDefinitions = [];
    this.customBlocks.forEach(function (def) {
        if (def.body) {
            def.body.expression.allChildren().forEach(function (c) {
                if (c.definition && (c.definition === definition)) {
                    inDefinitions.push(c);
                }
            });
        }
    });

    inBlockEditors = this.allEditorBlockInstances(definition);
    inPalette = this.paletteBlockInstance(definition);

    result = inScripts.concat(inDefinitions).concat(inBlockEditors);
    if (inPalette) {
        result.push(inPalette);
    }
    return result;
};

SpriteMorph.prototype.allEditorBlockInstances = function (definition) {
    var inBlockEditors = [],
        world = this.world();

    if (!world) {return []; } // when copying a sprite

    this.world().children.forEach(function (morph) {
        if (morph instanceof BlockEditorMorph) {
            morph.body.contents.allChildren().forEach(function (block) {
                if (!block.isPrototype
                        && !(block instanceof PrototypeHatBlockMorph)
                        && (block.definition === definition)) {
                    inBlockEditors.push(block);
                }
            });
        }
    });
    return inBlockEditors;
};


SpriteMorph.prototype.paletteBlockInstance = function (definition) {
    var ide = this.parentThatIsA(IDE_Morph);
    if (!ide) {return null; }
    return detect(
        ide.palette.contents.children,
        function (block) {
            return block.definition === definition;
        }
    );
};

SpriteMorph.prototype.usesBlockInstance = function (definition) {
    var inDefinitions,
        inScripts = detect(
            this.scripts.allChildren(),
            function (c) {
                return c.definition && (c.definition === definition);
            }
        );

    if (inScripts) {return true; }

    inDefinitions = [];
    this.customBlocks.forEach(function (def) {
        if (def.body) {
            def.body.expression.allChildren().forEach(function (c) {
                if (c.definition && (c.definition === definition)) {
                    inDefinitions.push(c);
                }
            });
        }
    });
    return (inDefinitions.length > 0);
};

SpriteMorph.prototype.doubleDefinitionsFor = function (definition) {
    var spec = definition.blockSpec(),
        blockList,
        idx,
        stage;

    if (definition.isGlobal) {
        stage = this.parentThatIsA(StageMorph);
        if (!stage) {return []; }
        blockList = stage.globalBlocks;
    } else {
        blockList = this.customBlocks;
    }
    idx = blockList.indexOf(definition);
    if (idx === -1) {return []; }
    return blockList.filter(function (def, i) {
        return def.blockSpec() === spec && (i !== idx);
    });
};

SpriteMorph.prototype.replaceDoubleDefinitionsFor = function (definition) {
    var doubles = this.doubleDefinitionsFor(definition),
        myself = this,
        stage,
        ide;
    doubles.forEach(function (double) {
        myself.allBlockInstances(double).forEach(function (block) {
            block.definition = definition;
            block.refresh();
        });
    });
    if (definition.isGlobal) {
        stage = this.parentThatIsA(StageMorph);
        stage.globalBlocks = stage.globalBlocks.filter(function (def) {
            return !contains(doubles, def);
        });
    } else {
        this.customBlocks = this.customBlocks.filter(function (def) {
            return !contains(doubles, def);
        });
    }
    ide = this.parentThatIsA(IDE_Morph);
    if (ide) {
        ide.flushPaletteCache();
        ide.refreshPalette();
    }
};

// SpriteMorph thumbnail

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
        xOffset = (extentPoint.x - (src.width * scale)) / 2,
        yOffset = (extentPoint.y - (src.height * scale)) / 2,
        trg = newCanvas(extentPoint),
        ctx = trg.getContext('2d');

    ctx.save();
    if (src.width && src.height) {
        ctx.scale(scale, scale);
        ctx.drawImage(
            src,
            Math.floor(xOffset / scale),
            Math.floor(yOffset / scale)
        );
    }
    return trg;
};

SpriteMorph.prototype.fullThumbnail = function (extentPoint) {
    // containing parts and anchor symbols, if any
    var thumb = this.thumbnail(extentPoint),
        ctx = thumb.getContext('2d'),
        ext = extentPoint.divideBy(3),
        i = 0;

    ctx.restore();
    if (this.anchor) {
        ctx.drawImage(
            this.anchor.thumbnail(ext),
            0,
            0
        );
    }
    for (i = 0; i < 3; i += 1) {
        if (this.parts[i]) {
            ctx.drawImage(
                this.parts[i].thumbnail(ext),
                i * ext.x,
                extentPoint.y - ext.y
            );
        }
    }
    return thumb;
};

// SpriteMorph Boolean visual representation

SpriteMorph.prototype.booleanMorph = function (bool) {
    // answer a block which can be shown in watchers, speech bubbles etc.
    var block = new ReporterBlockMorph(true);
    block.color = SpriteMorph.prototype.blockColor.operators;
    block.setSpec(localize(bool.toString()));
    return block;
};

// SpriteMorph nesting
/*
    simulate Morphic trees
*/

SpriteMorph.prototype.attachPart = function (aSprite) {
    var v = Date.now();
    if (aSprite.anchor) {
        aSprite.anchor.detachPart(aSprite);
    }
    this.parts.push(aSprite);
    this.version = v;
    aSprite.anchor = this;
    this.allParts().forEach(function (part) {
        part.nestingScale = part.scale;
    });
    aSprite.version = v;
};

SpriteMorph.prototype.detachPart = function (aSprite) {
    var idx = this.parts.indexOf(aSprite),
        v;
    if (idx !== -1) {
        v = Date.now();
        this.parts.splice(idx, 1);
        this.version = v;
        aSprite.anchor = null;
        aSprite.version = v;
    }
};

SpriteMorph.prototype.detachAllParts = function () {
    var v = Date.now();

    this.parts.forEach(function (part) {
        part.anchor = null;
        part.version = v;
    });
    this.parts = [];
    this.version = v;
};

SpriteMorph.prototype.detachFromAnchor = function () {
    if (this.anchor) {
        this.anchor.detachPart(this);
    }
};

SpriteMorph.prototype.allParts = function () {
    // includes myself
    var result = [this];
    this.parts.forEach(function (part) {
        result = result.concat(part.allParts());
    });
    return result;
};

SpriteMorph.prototype.allAnchors = function () {
    // includes myself
    var result = [this];
    if (this.anchor !== null) {
        result = result.concat(this.anchor.allAnchors());
    }
    return result;
};

// SpriteMorph highlighting

SpriteMorph.prototype.addHighlight = function (oldHighlight) {
    var isHidden = !this.isVisible,
        highlight;

    if (isHidden) {this.show(); }
    highlight = this.highlight(
        oldHighlight ? oldHighlight.color : this.highlightColor,
        this.highlightBorder
    );
    this.addBack(highlight);
    this.fullChanged();
    if (isHidden) {this.hide(); }
    return highlight;
};

SpriteMorph.prototype.removeHighlight = function () {
    var highlight = this.getHighlight();
    if (highlight !== null) {
        this.fullChanged();
        this.removeChild(highlight);
    }
    return highlight;
};

SpriteMorph.prototype.toggleHighlight = function () {
    if (this.getHighlight()) {
        this.removeHighlight();
    } else {
        this.addHighlight();
    }
};

SpriteMorph.prototype.highlight = function (color, border) {
    var highlight = new SpriteHighlightMorph(),
        fb = this.bounds, // sprites are not nested in a Morphic way
        edge = border,
        ctx;

    highlight.setExtent(fb.extent().add(edge * 2));
    highlight.color = color;
    highlight.image = this.highlightImage(color, border);
    ctx = highlight.image.getContext('2d');
    ctx.drawImage(
        this.highlightImage(new Color(255, 255, 255), 4),
        border - 4,
        border - 4
    );
    ctx.drawImage(
        this.highlightImage(new Color(50, 50, 50), 2),
        border - 2,
        border - 2
    );
    ctx.drawImage(
        this.highlightImage(new Color(255, 255, 255), 1),
        border - 1,
        border - 1
    );
    highlight.setPosition(fb.origin.subtract(new Point(edge, edge)));
    return highlight;
};

SpriteMorph.prototype.highlightImage = function (color, border) {
    var fb, img, hi, ctx, out;
    fb = this.extent();
    img = this.image;

    hi = newCanvas(fb.add(border * 2));
    ctx = hi.getContext('2d');

    ctx.drawImage(img, 0, 0);
    ctx.drawImage(img, border, 0);
    ctx.drawImage(img, border * 2, 0);
    ctx.drawImage(img, border * 2, border);
    ctx.drawImage(img, border * 2, border * 2);
    ctx.drawImage(img, border, border * 2);
    ctx.drawImage(img, 0, border * 2);
    ctx.drawImage(img, 0, border);

    ctx.globalCompositeOperation = 'destination-out';
    ctx.drawImage(img, border, border);

    out = newCanvas(fb.add(border * 2));
    ctx = out.getContext('2d');
    ctx.drawImage(hi, 0, 0);
    ctx.globalCompositeOperation = 'source-atop';
    ctx.fillStyle = color.toString();
    ctx.fillRect(0, 0, out.width, out.height);

    return out;
};

SpriteMorph.prototype.getHighlight = function () {
    var highlights;
    highlights = this.children.slice(0).reverse().filter(
        function (child) {
            return child instanceof SpriteHighlightMorph;
        }
    );
    if (highlights.length !== 0) {
        return highlights[0];
    }
    return null;
};

// SpriteMorph nesting events

SpriteMorph.prototype.mouseEnterDragging = function () {
    var obj;
    if (!this.enableNesting) {return; }
    obj = this.world().hand.children[0];
    if (this.wantsDropOf(obj)) {
        this.addHighlight();
    }
};

SpriteMorph.prototype.mouseLeave = function () {
    if (!this.enableNesting) {return; }
    this.removeHighlight();
};

SpriteMorph.prototype.wantsDropOf = function (morph) {
    // allow myself to be the anchor of another sprite
    // by drag & drop
    return this.enableNesting
        && morph instanceof SpriteIconMorph
        && !contains(morph.object.allParts(), this);
};

SpriteMorph.prototype.reactToDropOf = function (morph, hand) {
    this.removeHighlight();
    this.attachPart(morph.object);
    this.world().add(morph);
    morph.slideBackTo(hand.grabOrigin);
};

// SpriteMorph screenshots

SpriteMorph.prototype.newCostumeName = function (name, ignoredCostume) {
    var ix = name.indexOf('('),
        stem = (ix < 0) ? name : name.substring(0, ix),
        count = 1,
        newName = stem,
        all = this.costumes.asArray().filter(
            function (each) {return each !== ignoredCostume; }
        ).map(
            function (each) {return each.name; }
        );
    while (contains(all, newName)) {
        count += 1;
        newName = stem + '(' + count + ')';
    }
    return newName;
};

SpriteMorph.prototype.doScreenshot = function (imgSource, data) {
    var canvas,
        stage = this.parentThatIsA(StageMorph),
        costume;
    data = this.newCostumeName(data);
    if (imgSource[0] === undefined) {
        return;
    }
    if (imgSource[0] === "pen trails") {
        canvas = stage.trailsCanvas;
        costume = new Costume(canvas, data).copy(); // prevent mutation
    } else if (imgSource[0] === "stage image") {
        canvas = stage.fullImageClassic();
        costume = new Costume(canvas, data);
    }
    this.addCostume(costume);
};

// SpriteHighlightMorph /////////////////////////////////////////////////

// SpriteHighlightMorph inherits from Morph:

SpriteHighlightMorph.prototype = new Morph();
SpriteHighlightMorph.prototype.constructor = SpriteHighlightMorph;
SpriteHighlightMorph.uber = Morph.prototype;

// SpriteHighlightMorph instance creation:

function SpriteHighlightMorph() {
    this.init();
}

// StageMorph /////////////////////////////////////////////////////////

/*
    I inherit from FrameMorph and copy from SpriteMorph.
*/

// StageMorph inherits from FrameMorph:

StageMorph.prototype = new FrameMorph();
StageMorph.prototype.constructor = StageMorph;
StageMorph.uber = FrameMorph.prototype;

// StageMorph preferences settings

StageMorph.prototype.dimensions = new Point(480, 360); // unscaled extent

StageMorph.prototype.frameRate = 0; // unscheduled per default

StageMorph.prototype.isCachingPrimitives
    = SpriteMorph.prototype.isCachingPrimitives;

StageMorph.prototype.sliderColor
    = SpriteMorph.prototype.sliderColor;

StageMorph.prototype.paletteTextColor
    = SpriteMorph.prototype.paletteTextColor;

StageMorph.prototype.hiddenPrimitives = {};
StageMorph.prototype.codeMappings = {};
StageMorph.prototype.codeHeaders = {};
StageMorph.prototype.enableCodeMapping = false;

// StageMorph instance creation

function StageMorph(globals) {
    this.init(globals);
}

StageMorph.prototype.init = function (globals) {
    this.name = localize('Stage');
    this.threads = new ThreadManager();
    this.variables = new VariableFrame(globals || null, this);
    this.scripts = new ScriptsMorph(this);
    this.customBlocks = [];
    this.globalBlocks = [];
    this.costumes = new List();
    this.costume = null;
    this.sounds = new List();
    this.version = Date.now(); // for observers
    this.isFastTracked = false;
    this.cloneCount = 0;

    this.timerStart = Date.now();
    this.tempo = 60; // bpm
    this.lastMessage = '';

    this.watcherUpdateFrequency = 2;
    this.lastWatcherUpdate = Date.now();

    this.scale = 1; // for display modes, do not persist

    this.keysPressed = {}; // for handling keyboard events, do not persist
    this.blocksCache = {}; // not to be serialized (!)
    this.paletteCache = {}; // not to be serialized (!)
    this.lastAnswer = ''; // last user input, do not persist
    this.activeSounds = []; // do not persist

    this.trailsCanvas = null;
    this.isThreadSafe = false;

    this.graphicsValues = { 'negative': 0,
                            'fisheye': 0,
                            'whirl': 0,
                            'pixelate': 0,
                            'mosaic': 0,
                            'brightness': 0,
                            'color': 0,
                            'comic': 0,
                            'duplicate': 0,
                            'confetti': 0
                        };

    StageMorph.uber.init.call(this);

    this.acceptsDrops = false;
    this.setColor(new Color(255, 255, 255));
    this.fps = this.frameRate;
};

// StageMorph scaling

StageMorph.prototype.setScale = function (number) {
    var delta = number / this.scale,
        pos = this.position(),
        relativePos,
        bubble,
        oldFlag = Morph.prototype.trackChanges,
        myself = this;

    if (delta === 1) {return; }
    Morph.prototype.trackChanges = false;
    this.scale = number;
    this.setExtent(this.dimensions.multiplyBy(number));

    // now move and resize all children - sprites, bubbles, watchers etc..
    this.children.forEach(function (morph) {
        relativePos = morph.position().subtract(pos);
        morph.drawNew();
        morph.setPosition(
            relativePos.multiplyBy(delta).add(pos),
            true // just me (for nested sprites)
        );
        if (morph instanceof SpriteMorph) {
            bubble = morph.talkBubble();
            if (bubble) {
                bubble.setScale(number);
                morph.positionTalkBubble();
            }
        } else if (morph instanceof StagePrompterMorph) {
            if (myself.scale < 1) {
                morph.setWidth(myself.width() - 10);
            } else {
                morph.setWidth(myself.dimensions.x - 20);
            }
            morph.fixLayout();
            morph.setCenter(myself.center());
            morph.setBottom(myself.bottom());
        }
    });
    Morph.prototype.trackChanges = oldFlag;
    this.changed();
};

// StageMorph rendering

StageMorph.prototype.drawNew = function () {
    var ctx;
    StageMorph.uber.drawNew.call(this);
    if (this.costume) {
        ctx = this.image.getContext('2d');
        ctx.scale(this.scale, this.scale);
        ctx.drawImage(
            this.costume.contents,
            (this.width() / this.scale - this.costume.width()) / 2,
            (this.height() / this.scale - this.costume.height()) / 2
        );
        this.image = this.applyGraphicsEffects(this.image);
    }
};

StageMorph.prototype.drawOn = function (aCanvas, aRect) {
    // make sure to draw the pen trails canvas as well
    var rectangle, area, delta, src, context, w, h, sl, st, ws, hs;
    if (!this.isVisible) {
        return null;
    }
    rectangle = aRect || this.bounds;
    area = rectangle.intersect(this.bounds).round();
    if (area.extent().gt(new Point(0, 0))) {
        delta = this.position().neg();
        src = area.copy().translateBy(delta).round();
        context = aCanvas.getContext('2d');
        context.globalAlpha = this.alpha;

        sl = src.left();
        st = src.top();
        w = Math.min(src.width(), this.image.width - sl);
        h = Math.min(src.height(), this.image.height - st);

        if (w < 1 || h < 1) {
            return null;
        }
        context.drawImage(
            this.image,
            src.left(),
            src.top(),
            w,
            h,
            area.left(),
            area.top(),
            w,
            h
        );

        // pen trails
        ws = w / this.scale;
        hs = h / this.scale;
        context.save();
        context.scale(this.scale, this.scale);
        context.drawImage(
            this.penTrails(),
            src.left() / this.scale,
            src.top() / this.scale,
            ws,
            hs,
            area.left() / this.scale,
            area.top() / this.scale,
            ws,
            hs
        );
        context.restore();
    }
};

StageMorph.prototype.clearPenTrails = function () {
    this.trailsCanvas = newCanvas(this.dimensions);
    this.changed();
};

StageMorph.prototype.penTrails = function () {
    if (!this.trailsCanvas) {
        this.trailsCanvas = newCanvas(this.dimensions);
    }
    return this.trailsCanvas;
};

StageMorph.prototype.penTrailsMorph = function () {
    // for collision detection purposes
    var morph = new Morph(),
        trails = this.penTrails(),
        ctx;
    morph.bounds = this.bounds.copy();
    morph.image = newCanvas(this.extent());
    ctx = morph.image.getContext('2d');
    ctx.drawImage(
        trails,
        0,
        0,
        trails.width,
        trails.height,
        0,
        0,
        this.image.width,
        this.image.height
    );
    return morph;
};

StageMorph.prototype.colorFiltered = function (aColor, excludedSprite) {
    // answer a new Morph containing my image filtered by aColor
    // ignore the excludedSprite, because its collision is checked
    // ignore transparency (alpha)
    var morph = new Morph(),
        ext = this.extent(),
        img = this.thumbnail(ext, excludedSprite),
        ctx,
        src,
        clr,
        i,
        dta;

    src = img.getContext('2d').getImageData(0, 0, ext.x, ext.y);
    morph.bounds = this.bounds.copy();
    morph.image = newCanvas(ext);
    ctx = morph.image.getContext('2d');
    dta = ctx.createImageData(ext.x, ext.y);
    for (i = 0; i < ext.x * ext.y * 4; i += 4) {
        clr = new Color(
            src.data[i],
            src.data[i + 1],
            src.data[i + 2]
        );
        if (clr.eq(aColor)) {
            dta.data[i] = src.data[i];
            dta.data[i + 1] = src.data[i + 1];
            dta.data[i + 2] = src.data[i + 2];
            dta.data[i + 3] = 255;
        }
    }
    ctx.putImageData(dta, 0, 0);
    return morph;
};

// StageMorph accessing

StageMorph.prototype.watchers = function (leftPos) {
/*
    answer an array of all currently visible watchers.
    If leftPos is specified, filter the list for all
    shown or hidden watchers whose left side equals
    the given border (for automatic positioning)
*/
    return this.children.filter(function (morph) {
        if (morph instanceof WatcherMorph) {
            if (leftPos) {
                return morph.left() === leftPos;
            }
            return morph.isVisible;
        }
        return false;
    });
};

// StageMorph timer

StageMorph.prototype.resetTimer = function () {
    this.timerStart = Date.now();
};

StageMorph.prototype.getTimer = function () {
    var elapsed = Math.floor((Date.now() - this.timerStart) / 100);
    return elapsed / 10;
};

// StageMorph tempo

StageMorph.prototype.setTempo = function (bpm) {
    this.tempo = Math.max(20, (+bpm || 0));
};

StageMorph.prototype.changeTempo = function (delta) {
    this.setTempo(this.getTempo() + (+delta || 0));
};

StageMorph.prototype.getTempo = function () {
    return +this.tempo;
};

// StageMorph messages

StageMorph.prototype.getLastMessage = function () {
    return this.lastMessage || '';
};

// StageMorph Mouse Corridnates

StageMorph.prototype.reportMouseX = function () {
    var world = this.world();
    if (world) {
        return (world.hand.position().x - this.center().x) / this.scale;
    }
    return 0;
};

StageMorph.prototype.reportMouseY = function () {
    var world = this.world();
    if (world) {
        return (this.center().y - world.hand.position().y) / this.scale;
    }
    return 0;
};

// StageMorph drag & drop

StageMorph.prototype.wantsDropOf = function (aMorph) {
    return aMorph instanceof SpriteMorph ||
        aMorph instanceof WatcherMorph ||
        aMorph instanceof ListWatcherMorph ||
        aMorph instanceof SpriteIconMorph;
};

StageMorph.prototype.reactToDropOf = function (morph, hand) {
    if (morph instanceof SpriteIconMorph) { // detach sprite from anchor
        if (morph.object.anchor) {
            morph.object.anchor.detachPart(morph.object);
        }
        this.world().add(morph);
        morph.slideBackTo(hand.grabOrigin);
    }
};

// StageMorph stepping

StageMorph.prototype.step = function () {
    var current, elapsed, leftover, world = this.world();

    // handle keyboard events
    if (world.keyboardReceiver === null) {
        world.keyboardReceiver = this;
    }
    if (world.currentKey === null) {
        this.keyPressed = null;
    }

    // manage threads
    if (this.isFastTracked && this.threads.processes.length) {
        this.children.forEach(function (morph) {
            if (morph instanceof SpriteMorph) {
                morph.wasWarped = morph.isWarped;
                if (!morph.isWarped) {
                    morph.startWarp();
                }
            }
        });
        while ((Date.now() - this.lastTime) < 100) {
            this.threads.step();
        }
        this.children.forEach(function (morph) {
            if (morph instanceof SpriteMorph) {
                if (!morph.wasWarped) {
                    morph.endWarp();
                }
            }
        });
        this.changed();
    } else {
        this.threads.step();
    }

    // update watchers
    current = Date.now();
    elapsed = current - this.lastWatcherUpdate;
    leftover = (1000 / this.watcherUpdateFrequency) - elapsed;
    if (leftover < 1) {
        this.watchers().forEach(function (w) {
            w.update();
        });
        this.lastWatcherUpdate = Date.now();
    }
};

StageMorph.prototype.developersMenu = function () {
    var myself = this,
        menu = StageMorph.uber.developersMenu.call(this);
    menu.addItem(
        "stop",
        function () {
            myself.threads.stopAll();
        },
        'terminate all running threads'
    );
    return menu;
};

// StageMorph keyboard events

StageMorph.prototype.processKeyDown = function (event) {
    this.processKeyEvent(
        event,
        this.fireKeyEvent
    );
};

StageMorph.prototype.processKeyUp = function (event) {
    this.processKeyEvent(
        event,
        this.removePressedKey
    );
};

StageMorph.prototype.processKeyEvent = function (event, action) {
    var keyName;

    // this.inspectKeyEvent(event);
    switch (event.keyCode) {
    case 13:
        keyName = 'enter';
        if (event.ctrlKey || event.metaKey) {
            keyName = 'ctrl enter';
        }
        break;
    case 27:
        keyName = 'esc';
        break;
    case 32:
        keyName = 'space';
        break;
    case 37:
        keyName = 'left arrow';
        break;
    case 39:
        keyName = 'right arrow';
        break;
    case 38:
        keyName = 'up arrow';
        break;
    case 40:
        keyName = 'down arrow';
        break;
    default:
        keyName = String.fromCharCode(event.keyCode || event.charCode);
        if (event.ctrlKey || event.metaKey) {
            keyName = 'ctrl ' + (event.shiftKey ? 'shift ' : '') + keyName;
        }
    }
    action.call(this, keyName);
};

StageMorph.prototype.fireKeyEvent = function (key) {
    var evt = key.toLowerCase(),
        hats = [],
        procs = [],
        myself = this;

    this.keysPressed[evt] = true;
    if (evt === 'ctrl enter') {
        return this.fireGreenFlagEvent();
    }
    if (evt === 'ctrl f') {
        return this.parentThatIsA(IDE_Morph).currentSprite.searchBlocks();
    }
    if (evt === 'ctrl n') {
        return this.parentThatIsA(IDE_Morph).createNewProject();
    }
    if (evt === 'ctrl o') {
        return this.parentThatIsA(IDE_Morph).openProjectsBrowser();
    }
    if (evt === 'ctrl s') {
        return this.parentThatIsA(IDE_Morph).save();
    }
    if (evt === 'ctrl shift s') {
        return this.parentThatIsA(IDE_Morph).saveProjectsBrowser();
    }
    if (evt === 'esc') {
        return this.fireStopAllEvent();
    }
    this.children.concat(this).forEach(function (morph) {
        if (morph instanceof SpriteMorph || morph instanceof StageMorph) {
            hats = hats.concat(morph.allHatBlocksForKey(evt));
        }
    });
    hats.forEach(function (block) {
        procs.push(myself.threads.startProcess(block, myself.isThreadSafe));
    });
    return procs;
};

StageMorph.prototype.removePressedKey = function (key) {
    delete this.keysPressed[key.toLowerCase()];
};

StageMorph.prototype.processKeyPress = function (event) {
    nop(event);
};

StageMorph.prototype.inspectKeyEvent
    = CursorMorph.prototype.inspectKeyEvent;

StageMorph.prototype.fireGreenFlagEvent = function () {
    var procs = [],
        hats = [],
        ide = this.parentThatIsA(IDE_Morph),
        myself = this;

    this.children.concat(this).forEach(function (morph) {
        if (morph instanceof SpriteMorph || morph instanceof StageMorph) {
            hats = hats.concat(morph.allHatBlocksFor('__shout__go__'));
        }
    });
    hats.forEach(function (block) {
        procs.push(myself.threads.startProcess(
            block,
            myself.isThreadSafe
        ));
    });
    if (ide) {
        ide.controlBar.pauseButton.refresh();
    }
    return procs;
};

StageMorph.prototype.fireStopAllEvent = function () {
    var ide = this.parentThatIsA(IDE_Morph);
    this.threads.resumeAll(this.stage);
    this.keysPressed = {};
    this.threads.stopAll();
    this.stopAllActiveSounds();
    this.children.forEach(function (morph) {
        if (morph.stopTalking) {
            morph.stopTalking();
        }
    });
    this.removeAllClones();
    if (ide) {
        ide.nextSteps([
            nop,
            function () {ide.controlBar.pauseButton.refresh(); }
        ]);
    }
};

StageMorph.prototype.removeAllClones = function () {
    var myself = this,
        clones = this.children.filter(
            function (morph) {return morph.isClone; }
        );
    clones.forEach(function (clone) {
        myself.threads.stopAllForReceiver(clone);
        clone.destroy();
    });
    this.cloneCount = 0;
};

// StageMorph block templates

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

    } else if (cat === 'control') {

        blocks.push(block('receiveGo'));
        blocks.push(block('receiveKey'));
        blocks.push(block('receiveClick'));
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
                    function (pair) {
                        if (pair && !myself.variables.silentFind(pair[0])) {
                            myself.addVariable(pair[0], pair[1]);
                            myself.toggleVariableWatcher(pair[0], pair[1]);
                            myself.blocksCache[cat] = null;
                            myself.paletteCache[cat] = null;
                            myself.parentThatIsA(IDE_Morph).refreshPalette();
                        }
                    },
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
                        myself.deleteVariable,
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
                var ide = myself.parentThatIsA(IDE_Morph);
                new BlockDialogMorph(
                    null,
                    function (definition) {
                        if (definition.spec !== '') {
                            if (definition.isGlobal) {
                                myself.globalBlocks.push(definition);
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
        blocks.push(button);
    }
    return blocks;
};

// StageMorph primitives

StageMorph.prototype.clear = function () {
    this.clearPenTrails();
};

// StageMorph user menu

StageMorph.prototype.userMenu = function () {
    var ide = this.parentThatIsA(IDE_Morph),
        menu = new MenuMorph(this),
        shiftClicked = this.world().currentKey === 16,
        myself = this;

    if (ide && ide.isAppMode) {
        // menu.addItem('help', 'nop');
        return menu;
    }
    menu.addItem("edit", 'edit');
    menu.addItem("show all", 'showAll');
    menu.addItem(
        "pic...",
        function () {
            window.open(myself.fullImageClassic().toDataURL());
        },
        'open a new window\nwith a picture of the stage'
    );
    if (shiftClicked) {
        menu.addLine();
        menu.addItem(
            "turn pen trails into new costume...",
            function () {
                var costume = new Costume(
                    myself.trailsCanvas,
                    Date.now().toString()
                ).copy();
                ide.currentSprite.addCostume(costume);
                ide.currentSprite.wearCostume(costume);
                ide.hasChangedMedia = true;
            },
            'turn all pen trails and stamps\n' +
                'into a new costume for the\ncurrently selected sprite',
            new Color(100, 0, 0)
        );
    }
    return menu;
};

StageMorph.prototype.showAll = function () {
    var myself = this;
    this.children.forEach(function (m) {
        m.show();
        m.keepWithin(myself);
        if (m.fixLayout) {m.fixLayout(); }
    });
};

StageMorph.prototype.edit = SpriteMorph.prototype.edit;

// StageMorph thumbnail

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
        trg = newCanvas(extentPoint),
        ctx = trg.getContext('2d'),
        fb,
        fimg;

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
        if (morph !== excludedSprite) {
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

// StageMorph hiding and showing:

/*
    override the inherited behavior to recursively hide/show all
    children.
*/

StageMorph.prototype.hide = function () {
    this.isVisible = false;
    this.changed();
};

StageMorph.prototype.show = function () {
    this.isVisible = true;
    this.changed();
};

// StageMorph cloning overrice

StageMorph.prototype.createClone = nop;

// StageMorph pseudo-inherited behavior

StageMorph.prototype.categories = SpriteMorph.prototype.categories;
StageMorph.prototype.blockColor = SpriteMorph.prototype.blockColor;
StageMorph.prototype.paletteColor = SpriteMorph.prototype.paletteColor;
StageMorph.prototype.setName = SpriteMorph.prototype.setName;
StageMorph.prototype.palette = SpriteMorph.prototype.palette;
StageMorph.prototype.freshPalette = SpriteMorph.prototype.freshPalette;
StageMorph.prototype.blocksMatching = SpriteMorph.prototype.blocksMatching;
StageMorph.prototype.searchBlocks = SpriteMorph.prototype.searchBlocks;
StageMorph.prototype.showingWatcher = SpriteMorph.prototype.showingWatcher;
StageMorph.prototype.addVariable = SpriteMorph.prototype.addVariable;
StageMorph.prototype.deleteVariable = SpriteMorph.prototype.deleteVariable;

// StageMorph block rendering

StageMorph.prototype.doScreenshot
    = SpriteMorph.prototype.doScreenshot;

StageMorph.prototype.newCostumeName
    = SpriteMorph.prototype.newCostumeName;

StageMorph.prototype.blockForSelector
    = SpriteMorph.prototype.blockForSelector;

// StageMorph variable watchers (for palette checkbox toggling)

StageMorph.prototype.findVariableWatcher
    = SpriteMorph.prototype.findVariableWatcher;

StageMorph.prototype.toggleVariableWatcher
    = SpriteMorph.prototype.toggleVariableWatcher;

StageMorph.prototype.showingVariableWatcher
    = SpriteMorph.prototype.showingVariableWatcher;

StageMorph.prototype.deleteVariableWatcher
    = SpriteMorph.prototype.deleteVariableWatcher;

// StageMorph background management

StageMorph.prototype.addCostume
    = SpriteMorph.prototype.addCostume;

StageMorph.prototype.wearCostume
    = SpriteMorph.prototype.wearCostume;

StageMorph.prototype.getCostumeIdx
    = SpriteMorph.prototype.getCostumeIdx;

StageMorph.prototype.doWearNextCostume
    = SpriteMorph.prototype.doWearNextCostume;

StageMorph.prototype.doWearPreviousCostume
    = SpriteMorph.prototype.doWearPreviousCostume;

StageMorph.prototype.doSwitchToCostume
    = SpriteMorph.prototype.doSwitchToCostume;

StageMorph.prototype.reportCostumes
    = SpriteMorph.prototype.reportCostumes;

// StageMorph graphic effects

StageMorph.prototype.graphicsChanged
    = SpriteMorph.prototype.graphicsChanged;

StageMorph.prototype.applyGraphicsEffects
    = SpriteMorph.prototype.applyGraphicsEffects;

StageMorph.prototype.setEffect
    = SpriteMorph.prototype.setEffect;

StageMorph.prototype.getGhostEffect
    = SpriteMorph.prototype.getGhostEffect;

StageMorph.prototype.changeEffect
    = SpriteMorph.prototype.changeEffect;

StageMorph.prototype.clearEffects
    = SpriteMorph.prototype.clearEffects;

// StageMorph sound management

StageMorph.prototype.addSound
    = SpriteMorph.prototype.addSound;

StageMorph.prototype.playSound
    = SpriteMorph.prototype.playSound;

StageMorph.prototype.stopAllActiveSounds = function () {
    this.activeSounds.forEach(function (audio) {
        audio.pause();
    });
    this.activeSounds = [];
};

StageMorph.prototype.pauseAllActiveSounds = function () {
    this.activeSounds.forEach(function (audio) {
        audio.pause();
    });
};

StageMorph.prototype.resumeAllActiveSounds = function () {
    this.activeSounds.forEach(function (audio) {
        audio.play();
    });
};

StageMorph.prototype.reportSounds
    = SpriteMorph.prototype.reportSounds;

// StageMorph non-variable watchers

StageMorph.prototype.toggleWatcher
    = SpriteMorph.prototype.toggleWatcher;

StageMorph.prototype.showingWatcher
    = SpriteMorph.prototype.showingWatcher;

StageMorph.prototype.watcherFor =
    SpriteMorph.prototype.watcherFor;

StageMorph.prototype.getLastAnswer
    = SpriteMorph.prototype.getLastAnswer;

// StageMorph message broadcasting

StageMorph.prototype.allMessageNames
    = SpriteMorph.prototype.allMessageNames;

StageMorph.prototype.allHatBlocksFor
    = SpriteMorph.prototype.allHatBlocksFor;

StageMorph.prototype.allHatBlocksForKey
    = SpriteMorph.prototype.allHatBlocksForKey;

// StageMorph events

StageMorph.prototype.mouseClickLeft
    = SpriteMorph.prototype.mouseClickLeft;

// StageMorph custom blocks

StageMorph.prototype.deleteAllBlockInstances
    = SpriteMorph.prototype.deleteAllBlockInstances;

StageMorph.prototype.allBlockInstances
    = SpriteMorph.prototype.allBlockInstances;

StageMorph.prototype.allLocalBlockInstances
    = SpriteMorph.prototype.allLocalBlockInstances;

StageMorph.prototype.allEditorBlockInstances
    = SpriteMorph.prototype.allEditorBlockInstances;

StageMorph.prototype.paletteBlockInstance
    = SpriteMorph.prototype.paletteBlockInstance;

StageMorph.prototype.usesBlockInstance
    = SpriteMorph.prototype.usesBlockInstance;

StageMorph.prototype.doubleDefinitionsFor
    = SpriteMorph.prototype.doubleDefinitionsFor;

StageMorph.prototype.replaceDoubleDefinitionsFor
    = SpriteMorph.prototype.replaceDoubleDefinitionsFor;

// SpriteBubbleMorph ////////////////////////////////////////////////////////

/*
    I am a sprite's scaleable speech bubble. I rely on SpriteMorph
    for my preferences settings
*/

// SpriteBubbleMorph inherits from SpeechBubbleMorph:

SpriteBubbleMorph.prototype = new SpeechBubbleMorph();
SpriteBubbleMorph.prototype.constructor = SpriteBubbleMorph;
SpriteBubbleMorph.uber = SpeechBubbleMorph.prototype;

// SpriteBubbleMorph instance creation:

function SpriteBubbleMorph(data, scale, isThought, isQuestion) {
    this.init(data, scale, isThought, isQuestion);
}

SpriteBubbleMorph.prototype.init = function (
    data,
    scale,
    isThought,
    isQuestion
) {
    var sprite = SpriteMorph.prototype;
    this.scale = scale || 1;
    this.data = data;
    this.isQuestion = isQuestion;

    SpriteBubbleMorph.uber.init.call(
        this,
        this.dataAsMorph(data),
        sprite.bubbleColor,
        null,
        null,
        isQuestion ? sprite.blockColor.sensing : sprite.bubbleBorderColor,
        null,
        isThought
    );
};

// SpriteBubbleMorph contents formatting

SpriteBubbleMorph.prototype.dataAsMorph = function (data) {
    var contents,
        sprite = SpriteMorph.prototype,
        isText,
        img,
        scaledImg,
        width;

    if (data instanceof Morph) {
        contents = data;
    } else if (isString(data)) {
        isText = true;
        contents = new TextMorph(
            data,
            sprite.bubbleFontSize * this.scale,
            null, // fontStyle
            sprite.bubbleFontIsBold,
            false, // italic
            'center'
        );
    } else if (typeof data === 'boolean') {
        img = sprite.booleanMorph(data).fullImage();
        contents = new Morph();
        contents.silentSetWidth(img.width);
        contents.silentSetHeight(img.height);
        contents.image = img;
    } else if (data instanceof Costume) {
        img = data.thumbnail(new Point(40, 40));
        contents = new Morph();
        contents.silentSetWidth(img.width);
        contents.silentSetHeight(img.height);
        contents.image = img;
    } else if (data instanceof HTMLCanvasElement) {
        contents = new Morph();
        contents.silentSetWidth(data.width);
        contents.silentSetHeight(data.height);
        contents.image = data;
    } else if (data instanceof List) {
        contents = new ListWatcherMorph(data);
        contents.isDraggable = false;
        contents.update(true);
        contents.step = contents.update;
    } else if (data instanceof Context) {
        img = data.image();
        contents = new Morph();
        contents.silentSetWidth(img.width);
        contents.silentSetHeight(img.height);
        contents.image = img;
    } else {
        contents = new TextMorph(
            data.toString(),
            sprite.bubbleFontSize * this.scale,
            null, // fontStyle
            sprite.bubbleFontIsBold,
            false, // italic
            'center'
        );
    }
    if (contents instanceof TextMorph) {
        // reflow text boundaries
        width = Math.max(
            contents.width(),
            sprite.bubbleCorner * 2 * this.scale
        );
        if (isText) {
            width = Math.min(width, sprite.bubbleMaxTextWidth * this.scale);
        }
        contents.setWidth(width);
    } else if (!(data instanceof List)) {
        // scale contents image
        scaledImg = newCanvas(contents.extent().multiplyBy(this.scale));
        scaledImg.getContext('2d').drawImage(
            contents.image,
            0,
            0,
            scaledImg.width,
            scaledImg.height
        );
        contents.image = scaledImg;
        contents.bounds = contents.bounds.scaleBy(this.scale);
    }
    return contents;
};

// SpriteBubbleMorph scaling

SpriteBubbleMorph.prototype.setScale = function (scale) {
    this.scale = scale;
    this.changed();
    this.drawNew();
    this.changed();
};

// SpriteBubbleMorph drawing:

SpriteBubbleMorph.prototype.drawNew = function () {
    var sprite = SpriteMorph.prototype;

    // scale my settings
    this.edge = sprite.bubbleCorner * this.scale;
    this.border = sprite.bubbleBorder * this.scale;
    this.padding = sprite.bubbleCorner / 2 * this.scale;

    // re-build my contents
    if (this.contentsMorph) {
        this.contentsMorph.destroy();
    }
    this.contentsMorph = this.dataAsMorph(this.data);
    this.add(this.contentsMorph);

    // adjust my layout
    this.silentSetWidth(this.contentsMorph.width()
        + (this.padding ? this.padding * 2 : this.edge * 2));
    this.silentSetHeight(this.contentsMorph.height()
        + this.edge
        + this.border * 2
        + this.padding * 2
        + 2);

    // draw my outline
    SpeechBubbleMorph.uber.drawNew.call(this);

    // position my contents
    this.contentsMorph.setPosition(this.position().add(
        new Point(
            this.padding || this.edge,
            this.border + this.padding + 1
        )
    ));
};

// SpriteBubbleMorph resizing:

SpriteBubbleMorph.prototype.fixLayout = function () {
    // to be used when resizing list watchers
    // otherwise use drawNew() to force re-layout

    var sprite = SpriteMorph.prototype;

    this.changed();
    // scale my settings
    this.edge = sprite.bubbleCorner * this.scale;
    this.border = sprite.bubbleBorder * this.scale;
    this.padding = sprite.bubbleCorner / 2 * this.scale;

    // adjust my layout
    this.silentSetWidth(this.contentsMorph.width()
        + (this.padding ? this.padding * 2 : this.edge * 2));
    this.silentSetHeight(this.contentsMorph.height()
        + this.edge
        + this.border * 2
        + this.padding * 2
        + 2);

    // draw my outline
    SpeechBubbleMorph.uber.drawNew.call(this);

    // position my contents
    this.contentsMorph.setPosition(this.position().add(
        new Point(
            this.padding || this.edge,
            this.border + this.padding + 1
        )
    ));
    this.changed();
};

// Costume /////////////////////////////////////////////////////////////

/*
    I am a picture that's "wearable" by a sprite. My rotationCenter is
    relative to my contents position.
*/

// Costume instance creation

function Costume(canvas, name, rotationCenter) {
    this.contents = canvas || newCanvas();
    this.shrinkToFit(this.maxExtent());
    this.name = name || null;
    this.rotationCenter = rotationCenter || this.center();
    this.version = Date.now(); // for observer optimization
    this.loaded = null; // for de-serialization only
}

Costume.prototype.maxExtent = function () {
    return StageMorph.prototype.dimensions;
};

Costume.prototype.toString = function () {
    return 'a Costume(' + this.name + ')';
};

// Costume dimensions - all relative

Costume.prototype.extent = function () {
    return new Point(this.contents.width, this.contents.height);
};

Costume.prototype.center = function () {
    return this.extent().divideBy(2);
};

Costume.prototype.width = function () {
    return this.contents.width;
};

Costume.prototype.height = function () {
    return this.contents.height;
};

Costume.prototype.bounds = function () {
    return new Rectangle(0, 0, this.width(), this.height());
};

// Costume shrink-wrapping

Costume.prototype.shrinkWrap = function () {
    // adjust my contents'  bounds to my visible bounding box
    var bb = this.boundingBox(),
        ext = bb.extent(),
        pic = newCanvas(ext),
        ctx = pic.getContext('2d');

    ctx.drawImage(
        this.contents,
        bb.origin.x,
        bb.origin.y,
        ext.x,
        ext.y,
        0,
        0,
        ext.x,
        ext.y
    );
    this.rotationCenter = this.rotationCenter.subtract(bb.origin);
    this.contents = pic;
    this.version = Date.now();
};

Costume.prototype.boundingBox = function () {
    // answer the rectangle surrounding my contents' non-transparent pixels
    var row,
        col,
        pic = this.contents,
        w = pic.width,
        h = pic.height,
        ctx = pic.getContext('2d'),
        dta = ctx.getImageData(0, 0, w, h);

    function getAlpha(x, y) {
        return dta.data[((y * w * 4) + (x * 4)) + 3];
    }

    function getLeft() {
        for (col = 0; col <= w; col += 1) {
            for (row = 0; row <= h; row += 1) {
                if (getAlpha(col, row)) {
                    return col;
                }
            }
        }
        return 0;
    }

    function getTop() {
        for (row = 0; row <= h; row += 1) {
            for (col = 0; col <= h; col += 1) {
                if (getAlpha(col, row)) {
                    return row;
                }
            }
        }
        return 0;
    }

    function getRight() {
        for (col = w; col >= 0; col -= 1) {
            for (row = h; row >= 0; row -= 1) {
                if (getAlpha(col, row)) {
                    return Math.min(col + 1, w);
                }
            }
        }
        return w;
    }

    function getBottom() {
        for (row = h; row >= 0; row -= 1) {
            for (col = w; col >= 0; col -= 1) {
                if (getAlpha(col, row)) {
                    return Math.min(row + 1, h);
                }
            }
        }
        return h;
    }

    return new Rectangle(getLeft(), getTop(), getRight(), getBottom());
};

// Costume duplication

Costume.prototype.copy = function () {
    var canvas = newCanvas(this.extent()),
        cpy,
        ctx;

    ctx = canvas.getContext('2d');
    ctx.drawImage(this.contents, 0, 0);
    cpy = new Costume(canvas, this.name ? copy(this.name) : null);
    cpy.rotationCenter = this.rotationCenter.copy();
    return cpy;
};

// Costume flipping

Costume.prototype.flipped = function () {
/*
    answer a copy of myself flipped horizontally
    (mirrored along a vertical axis), used for
    SpriteMorph's rotation style type 2
*/
    var canvas = newCanvas(this.extent()),
        ctx = canvas.getContext('2d'),
        flipped;

    ctx.translate(this.width(), 0);
    ctx.scale(-1, 1);
    ctx.drawImage(this.contents, 0, 0);
    flipped = new Costume(
        canvas,
        new Point(
            this.width() - this.rotationCenter.x,
            this.rotationCenter.y
        )
    );
    return flipped;
};

// Costume actions

Costume.prototype.edit = function (aWorld, anIDE, isnew, oncancel, onsubmit) {
    var myself = this,
        editor = new PaintEditorMorph();
    editor.oncancel = oncancel || nop;
    editor.openIn(
        aWorld,
        isnew ?
                newCanvas(StageMorph.prototype.dimensions) :
                this.contents,
        isnew ?
                new Point(240, 180) :
                this.rotationCenter,
        function (img, rc) {
            myself.contents = img;
            myself.rotationCenter = rc;
            if (anIDE.currentSprite instanceof SpriteMorph) {
                // don't shrinkwrap stage costumes
                myself.shrinkWrap();
            }
            myself.version = Date.now();
            aWorld.changed();
            if (anIDE) {
                anIDE.currentSprite.wearCostume(myself);
                anIDE.hasChangedMedia = true;
            }
            (onsubmit || nop)();
        }
    );
};

Costume.prototype.editRotationPointOnly = function (aWorld) {
    var editor = new CostumeEditorMorph(this),
        action,
        dialog,
        txt;

    action = function () {editor.accept(); };
    dialog = new DialogBoxMorph(this, action);
    txt = new TextMorph(
        localize('click or drag crosshairs to move the rotation center'),
        dialog.fontSize,
        dialog.fontStyle,
        true,
        false,
        'center',
        null,
        null,
        new Point(1, 1),
        new Color(255, 255, 255)
    );

    dialog.labelString = 'Costume Editor';
    dialog.createLabel();
    dialog.setPicture(editor);
    dialog.addBody(txt);
    dialog.addButton('ok', 'Ok');
    dialog.addButton('cancel', 'Cancel');
    dialog.fixLayout();
    dialog.drawNew();
    dialog.fixLayout();
    dialog.popUp(aWorld);
};

// Costume thumbnail

Costume.prototype.shrinkToFit = function (extentPoint) {
    if (extentPoint.x < this.width() || (extentPoint.y < this.height())) {
        this.contents = this.thumbnail(extentPoint);
    }
};

Costume.prototype.thumbnail = function (extentPoint) {
/*
    answer a new Canvas of extentPoint dimensions containing
    my thumbnail representation keeping the originial aspect ratio
*/
    var src = this.contents, // at this time sprites aren't composite morphs
        scale = Math.min(
            (extentPoint.x / src.width),
            (extentPoint.y / src.height)
        ),
        xOffset = (extentPoint.x - (src.width * scale)) / 2,
        yOffset = (extentPoint.y - (src.height * scale)) / 2,
        trg = newCanvas(extentPoint),
        ctx = trg.getContext('2d');

    if (!src || src.width + src.height === 0) {return trg; }
    ctx.scale(scale, scale);
    ctx.drawImage(
        src,
        Math.floor(xOffset / scale),
        Math.floor(yOffset / scale)
    );
    return trg;
};

// Costume catching "tainted" canvases

Costume.prototype.isTainted = function () {
    // find out whether the canvas has been tainted by cross-origin data
    // assumes that if reading image data throws an error it is tainted
    try {
        this.contents.getContext('2d').getImageData(
            0,
            0,
            this.contents.width,
            this.contents.height
        );
    } catch (err) {
        return true;
    }
    return false;
};

// SVG_Costume /////////////////////////////////////////////////////////////

/*
    I am a costume containing an SVG image.
*/

// SVG_Costume inherits from Costume:

SVG_Costume.prototype = new Costume();
SVG_Costume.prototype.constructor = SVG_Costume;
SVG_Costume.uber = Costume.prototype;

// SVG_Costume instance creation

function SVG_Costume(svgImage, name, rotationCenter) {
    this.contents = svgImage;
    this.shrinkToFit(this.maxExtent());
    this.name = name || null;
    this.rotationCenter = rotationCenter || this.center();
    this.version = Date.now(); // for observer optimization
    this.loaded = null; // for de-serialization only
}

SVG_Costume.prototype.toString = function () {
    return 'an SVG_Costume(' + this.name + ')';
};

// SVG_Costume duplication

SVG_Costume.prototype.copy = function () {
    var img = new Image(),
        cpy;
    img.src = this.contents.src;
    cpy = new SVG_Costume(img, this.name ? copy(this.name) : null);
    cpy.rotationCenter = this.rotationCenter.copy();
    return cpy;
};

// SVG_Costume flipping

/*
    flipping is currently inherited from Costume, which rasterizes it.
    Therefore flipped SVG costumes may appear pixelated until we add
    a method to either truly flip SVGs or change the Sprite's drawNew()
    method to scale the costume before flipping it
*/

// SVG_Costume thumbnail

SVG_Costume.prototype.shrinkToFit = function (extentPoint) {
    // overridden for unrasterized SVGs
    nop(extentPoint);
    return;
};

// CostumeEditorMorph ////////////////////////////////////////////////////////

// CostumeEditorMorph inherits from Morph:

CostumeEditorMorph.prototype = new Morph();
CostumeEditorMorph.prototype.constructor = CostumeEditorMorph;
CostumeEditorMorph.uber = Morph.prototype;

// CostumeEditorMorph preferences settings:
CostumeEditorMorph.prototype.size = Costume.prototype.maxExtent();

// CostumeEditorMorph instance creation

function CostumeEditorMorph(costume) {
    this.init(costume);
}

CostumeEditorMorph.prototype.init = function (costume) {
    this.costume = costume || new Costume();
    this.rotationCenter = this.costume.rotationCenter.copy();
    this.margin = new Point(0, 0);
    CostumeEditorMorph.uber.init.call(this);
    this.noticesTransparentClick = true;
};

// CostumeEditorMorph edit ops

CostumeEditorMorph.prototype.accept = function () {
    this.costume.rotationCenter = this.rotationCenter.copy();
    this.costume.version = Date.now();
};

// CostumeEditorMorph displaying

CostumeEditorMorph.prototype.drawNew = function () {
    var rp, ctx;

    this.margin = this.size.subtract(this.costume.extent()).divideBy(2);
    rp = this.rotationCenter.add(this.margin);

    this.silentSetExtent(this.size);

    this.image = newCanvas(this.extent());

    // draw the background
    if (!this.cachedTexture) {
        this.cachedTexture = this.createTexture();

    }
    this.drawCachedTexture();

/*
    pattern = ctx.createPattern(this.background, 'repeat');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, this.size.x, this.size.y);
*/

    ctx = this.image.getContext('2d');

    // draw the costume
    ctx.drawImage(this.costume.contents, this.margin.x, this.margin.y);

    // draw crosshairs:
    ctx.globalAlpha = 0.5;

    // circle around center:
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(
        rp.x,
        rp.y,
        20,
        radians(0),
        radians(360),
        false
    );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(
        rp.x,
        rp.y,
        10,
        radians(0),
        radians(360),
        false
    );
    ctx.stroke();

    // horizontal line:
    ctx.beginPath();
    ctx.moveTo(0, rp.y);
    ctx.lineTo(this.costume.width() + this.margin.x * 2, rp.y);
    ctx.stroke();

    // vertical line:
    ctx.beginPath();
    ctx.moveTo(rp.x, 0);
    ctx.lineTo(rp.x, this.costume.height() + this.margin.y * 2);
    ctx.stroke();
};

CostumeEditorMorph.prototype.createTexture = function () {
    var size = 5,
        texture = newCanvas(new Point(size * 2, size * 2)),
        ctx = texture.getContext('2d'),
        grey = new Color(230, 230, 230);

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, size * 2, size * 2);
    ctx.fillStyle = grey.toString();
    ctx.fillRect(0, 0, size, size);
    ctx.fillRect(size, size, size, size);
    return texture;
};


// CostumeEditorMorph events

CostumeEditorMorph.prototype.mouseDownLeft = function (pos) {
    this.rotationCenter = pos.subtract(
        this.position().add(this.margin)
    );
    this.drawNew();
    this.changed();
};

CostumeEditorMorph.prototype.mouseMove
    = CostumeEditorMorph.prototype.mouseDownLeft;

// Sound /////////////////////////////////////////////////////////////

// Sound instance creation

function Sound(audio, name) {
    this.audio = audio; // mandatory
    this.name = name || "Sound";
}

Sound.prototype.play = function () {
    // return an instance of an audio element which can be terminated
    // externally (i.e. by the stage)
    var aud = document.createElement('audio');
    aud.src = this.audio.src;
    aud.play();
    return aud;
};

Sound.prototype.copy = function () {
    var snd = document.createElement('audio'),
        cpy;

    snd.src = this.audio.src;
    cpy = new Sound(snd, this.name ? copy(this.name) : null);
    return cpy;
};

Sound.prototype.toDataURL = function () {
    return this.audio.src;
};

// Note /////////////////////////////////////////////////////////

// I am a single musical note

// Note instance creation

function Note(pitch) {
    this.pitch = pitch === 0 ? 0 : pitch || 69;
    this.setupContext();
    this.oscillator = null;
}

// Note shared properties

Note.prototype.audioContext = null;
Note.prototype.gainNode = null;

// Note audio context

Note.prototype.setupContext = function () {
    if (this.audioContext) { return; }
    var AudioContext = (function () {
        // cross browser some day?
        var ctx = window.AudioContext ||
            window.mozAudioContext ||
            window.msAudioContext ||
            window.oAudioContext ||
            window.webkitAudioContext;
        if (!ctx.prototype.hasOwnProperty('createGain')) {
            ctx.prototype.createGain = ctx.prototype.createGainNode;
        }
        return ctx;
    }());
    if (!AudioContext) {
        throw new Error('Web Audio API is not supported\nin this browser');
    }
    Note.prototype.audioContext = new AudioContext();
    Note.prototype.gainNode = Note.prototype.audioContext.createGain();
    Note.prototype.gainNode.gain.value = 0.25; // reduce volume by 1/4
};

// Note playing

Note.prototype.play = function () {
    this.oscillator = this.audioContext.createOscillator();
    if (!this.oscillator.start) {
        this.oscillator.start = this.oscillator.noteOn;
    }
    if (!this.oscillator.stop) {
        this.oscillator.stop = this.oscillator.noteOff;
    }
    this.oscillator.type = 0;
    this.oscillator.frequency.value =
        Math.pow(2, (this.pitch - 69) / 12) * 440;
    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(this.audioContext.destination);
    this.oscillator.start(0);
};

Note.prototype.stop = function () {
    if (this.oscillator) {
        this.oscillator.stop(0);
        this.oscillator = null;
    }
};

// CellMorph //////////////////////////////////////////////////////////

/*
    I am a spreadsheet style cell that can display either a string,
    a Morph, a Canvas or a toString() representation of anything else.
    I can be used in variable watchers or list view element cells.
*/

// CellMorph inherits from BoxMorph:

CellMorph.prototype = new BoxMorph();
CellMorph.prototype.constructor = CellMorph;
CellMorph.uber = BoxMorph.prototype;

// CellMorph instance creation:

function CellMorph(contents, color, idx, parentCell) {
    this.init(contents, color, idx, parentCell);
}

CellMorph.prototype.init = function (contents, color, idx, parentCell) {
    this.contents = (contents === 0 ? 0
            : contents === false ? false
                    : contents || '');
    this.isEditable = isNil(idx) ? false : true;
    this.idx = idx || null; // for list watchers
    this.parentCell = parentCell || null; // for list circularity detection
    CellMorph.uber.init.call(
        this,
        SyntaxElementMorph.prototype.corner,
        1.000001, // shadow bug in Chrome,
        new Color(255, 255, 255)
    );
    this.color = color || new Color(255, 140, 0);
    this.isBig = false;
    this.drawNew();
};

// CellMorph accessing:

CellMorph.prototype.big = function () {
    this.isBig = true;
    this.changed();
    this.drawNew();
    this.changed();
};

CellMorph.prototype.normal = function () {
    this.isBig = false;
    this.changed();
    this.drawNew();
    this.changed();
};

// CellMorph circularity testing:


CellMorph.prototype.isCircular = function (list) {
    if (!this.parentCell) {return false; }
    if (list instanceof List) {
        return this.contents === list || this.parentCell.isCircular(list);
    }
    return this.parentCell.isCircular(this.contents);
};

// CellMorph layout:

CellMorph.prototype.fixLayout = function () {
    var listwatcher;
    this.changed();
    this.drawNew();
    this.changed();
    if (this.parent && this.parent.fixLayout) { // variable watcher
        this.parent.fixLayout();
    } else {
        listwatcher = this.parentThatIsA(ListWatcherMorph);
        if (listwatcher) {
            listwatcher.fixLayout();
        }
    }
};

// CellMorph drawing:

CellMorph.prototype.drawNew = function () {
    var context,
        txt,
        img,
        fontSize = SyntaxElementMorph.prototype.fontSize,
        isSameList = this.contentsMorph instanceof ListWatcherMorph
                && (this.contentsMorph.list === this.contents);

    if (this.isBig) {
        fontSize = fontSize * 1.5;
    }

    // re-build my contents
    if (this.contentsMorph && !isSameList) {
        this.contentsMorph.destroy();
    }

    if (!isSameList) {
        if (this.contents instanceof Morph) {
            this.contentsMorph = this.contents;
        } else if (isString(this.contents)) {
            txt  = this.contents.length > 500 ?
                    this.contents.slice(0, 500) + '...' : this.contents;
            this.contentsMorph = new TextMorph(
                txt,
                fontSize,
                null,
                true,
                false,
                'left' // was formerly 'center', reverted b/c of code-mapping
            );
            if (this.isEditable) {
                this.contentsMorph.isEditable = true;
                this.contentsMorph.enableSelecting();
            }
            this.contentsMorph.setColor(new Color(255, 255, 255));
        } else if (typeof this.contents === 'boolean') {
            this.contentsMorph = SpriteMorph.prototype.booleanMorph.call(
                null,
                this.contents
            );
        } else if (this.contents instanceof HTMLCanvasElement) {
            this.contentsMorph = new Morph();
            this.contentsMorph.silentSetWidth(this.contents.width);
            this.contentsMorph.silentSetHeight(this.contents.height);
            this.contentsMorph.image = this.contents;
        } else if (this.contents instanceof Context) {
            img = this.contents.image();
            this.contentsMorph = new Morph();
            this.contentsMorph.silentSetWidth(img.width);
            this.contentsMorph.silentSetHeight(img.height);
            this.contentsMorph.image = img;
        } else if (this.contents instanceof Costume) {
            img = this.contents.thumbnail(new Point(40, 40));
            this.contentsMorph = new Morph();
            this.contentsMorph.silentSetWidth(img.width);
            this.contentsMorph.silentSetHeight(img.height);
            this.contentsMorph.image = img;
        } else if (this.contents instanceof List) {
            if (this.isCircular()) {
                this.contentsMorph = new TextMorph(
                    '(...)',
                    fontSize,
                    null,
                    false, // bold
                    true, // italic
                    'center'
                );
                this.contentsMorph.setColor(new Color(255, 255, 255));
            } else {
                this.contentsMorph = new ListWatcherMorph(
                    this.contents,
                    this
                );
                this.contentsMorph.isDraggable = false;
            }
        } else {
            this.contentsMorph = new TextMorph(
                !isNil(this.contents) ? this.contents.toString() : '',
                fontSize,
                null,
                true,
                false,
                'center'
            );
            if (this.isEditable) {
                this.contentsMorph.isEditable = true;
                this.contentsMorph.enableSelecting();
            }
            this.contentsMorph.setColor(new Color(255, 255, 255));
        }
        this.add(this.contentsMorph);
    }

    // adjust my layout
    this.silentSetHeight(this.contentsMorph.height()
        + this.edge
        + this.border * 2);
    this.silentSetWidth(Math.max(
        this.contentsMorph.width() + this.edge * 2,
        (this.contents instanceof Context ||
            this.contents instanceof List ? 0 :
                    SyntaxElementMorph.prototype.fontSize * 3.5)
    ));

    // draw my outline
    this.image = newCanvas(this.extent());
    context = this.image.getContext('2d');
    if ((this.edge === 0) && (this.border === 0)) {
        BoxMorph.uber.drawNew.call(this);
        return null;
    }
    context.fillStyle = this.color.toString();
    context.beginPath();
    this.outlinePath(
        context,
        Math.max(this.edge - this.border, 0),
        this.border
    );
    context.closePath();
    context.fill();
    if (this.border > 0 && !MorphicPreferences.isFlat) {
        context.lineWidth = this.border;
        context.strokeStyle = this.borderColor.toString();
        context.beginPath();
        this.outlinePath(context, this.edge, this.border / 2);
        context.closePath();
        context.stroke();

        context.shadowOffsetX = this.border;
        context.shadowOffsetY = this.border;
        context.shadowBlur = this.border;
        context.shadowColor = this.color.darker(80).toString();
        this.drawShadow(context, this.edge, this.border / 2);
    }

    // position my contents
    if (!isSameList) {
        this.contentsMorph.setCenter(this.center());
    }
};

CellMorph.prototype.drawShadow = function (context, radius, inset) {
    var offset = radius + inset,
        w = this.width(),
        h = this.height();

    // bottom left:
    context.beginPath();
    context.moveTo(0, h - offset);
    context.lineTo(0, offset);
    context.stroke();

    // top left:
    context.beginPath();
    context.arc(
        offset,
        offset,
        radius,
        radians(-180),
        radians(-90),
        false
    );
    context.stroke();

    // top right:
    context.beginPath();
    context.moveTo(offset, 0);
    context.lineTo(w - offset, 0);
    context.stroke();
};

// CellMorph editing (inside list watchers):

CellMorph.prototype.layoutChanged = function () {
    var context,
        fontSize = SyntaxElementMorph.prototype.fontSize,
        listWatcher = this.parentThatIsA(ListWatcherMorph);

    if (this.isBig) {
        fontSize = fontSize * 1.5;
    }

    // adjust my layout
    this.silentSetHeight(this.contentsMorph.height()
        + this.edge
        + this.border * 2);
    this.silentSetWidth(Math.max(
        this.contentsMorph.width() + this.edge * 2,
        (this.contents instanceof Context ||
            this.contents instanceof List ? 0 : this.height() * 2)
    ));


    // draw my outline
    this.image = newCanvas(this.extent());
    context = this.image.getContext('2d');
    if ((this.edge === 0) && (this.border === 0)) {
        BoxMorph.uber.drawNew.call(this);
        return null;
    }
    context.fillStyle = this.color.toString();
    context.beginPath();
    this.outlinePath(
        context,
        Math.max(this.edge - this.border, 0),
        this.border
    );
    context.closePath();
    context.fill();
    if (this.border > 0 && !MorphicPreferences.isFlat) {
        context.lineWidth = this.border;
        context.strokeStyle = this.borderColor.toString();
        context.beginPath();
        this.outlinePath(context, this.edge, this.border / 2);
        context.closePath();
        context.stroke();

        context.shadowOffsetX = this.border;
        context.shadowOffsetY = this.border;
        context.shadowBlur = this.border;
        context.shadowColor = this.color.darker(80).toString();
        this.drawShadow(context, this.edge, this.border / 2);
    }

    // position my contents
    this.contentsMorph.setCenter(this.center());

    if (listWatcher) {
        listWatcher.fixLayout();
    }
};

CellMorph.prototype.reactToEdit = function (textMorph) {
    var listWatcher;
    if (!isNil(this.idx)) {
        listWatcher = this.parentThatIsA(ListWatcherMorph);
        if (listWatcher) {
            listWatcher.list.put(textMorph.text, this.idx);
        }
    }
};

CellMorph.prototype.mouseClickLeft = function (pos) {
    if (this.isEditable && this.contentsMorph instanceof TextMorph) {
        this.contentsMorph.selectAllAndEdit();
    } else {
        this.escalateEvent('mouseClickLeft', pos);
    }
};

// WatcherMorph //////////////////////////////////////////////////////////

/*
    I am a little window which observes some value and continuously
    updates itself accordingly.

    My target can be either a SpriteMorph or a VariableFrame.
*/

// WatcherMorph inherits from BoxMorph:

WatcherMorph.prototype = new BoxMorph();
WatcherMorph.prototype.constructor = WatcherMorph;
WatcherMorph.uber = BoxMorph.prototype;

// WatcherMorph instance creation:

function WatcherMorph(label, color, target, getter, isHidden) {
    this.init(label, color, target, getter, isHidden);
}

WatcherMorph.prototype.init = function (
    label,
    color,
    target,
    getter,
    isHidden
) {
    // additional properties
    this.labelText = label || '';
    this.version = null;
    this.objName = '';

    // initialize inherited properties
    WatcherMorph.uber.init.call(
        this,
        SyntaxElementMorph.prototype.rounding,
        1.000001, // shadow bug in Chrome,
        new Color(120, 120, 120)
    );

    // override inherited behavior
    this.color = new Color(220, 220, 220);
    this.readoutColor = color;
    this.style = 'normal';
    this.target = target || null; // target obj (Sprite) or VariableFrame
    this.getter = getter || null; // callback or variable name (string)
    this.currentValue = null;
    this.labelMorph = null;
    this.sliderMorph = null;
    this.cellMorph = null;
    this.isDraggable = true;
    this.fixLayout();
    this.update();
    if (isHidden) { // for de-serializing
        this.hide();
    }
};

// WatcherMorph accessing:

WatcherMorph.prototype.isTemporary = function () {
    var stage = this.parentThatIsA(StageMorph);
    if (this.target instanceof VariableFrame) {
        if (stage) {
            if (this.target === stage.variables.parentFrame) {
                return false; // global
            }
        }
        return this.target.owner === null;
    }
    return false;
};

WatcherMorph.prototype.object = function () {
    // answer the actual sprite I refer to
    return this.target instanceof VariableFrame ?
            this.target.owner : this.target;
};

WatcherMorph.prototype.isGlobal = function (selector) {
    return contains(
        ['getLastAnswer', 'getLastMessage', 'getTempo', 'getTimer',
             'reportMouseX', 'reportMouseY'],
        selector
    );
};

// WatcherMorph slider accessing:

WatcherMorph.prototype.setSliderMin = function (num) {
    if (this.target instanceof VariableFrame) {
        this.sliderMorph.setSize(1);
        this.sliderMorph.setStart(num);
        this.sliderMorph.setSize(this.sliderMorph.rangeSize() / 5);
    }
};

WatcherMorph.prototype.setSliderMax = function (num) {
    if (this.target instanceof VariableFrame) {
        this.sliderMorph.setSize(1);
        this.sliderMorph.setStop(num);
        this.sliderMorph.setSize(this.sliderMorph.rangeSize() / 5);
    }
};

// WatcherMorph updating:

WatcherMorph.prototype.update = function () {
    var newValue,
        num;
    if (this.target && this.getter) {
        this.updateLabel();
        if (this.target instanceof VariableFrame) {
            newValue = this.target.vars[this.getter];
        } else {
            newValue = this.target[this.getter]();
        }
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
    }
    if (this.cellMorph.contentsMorph instanceof ListWatcherMorph) {
        this.cellMorph.contentsMorph.update();
    }
};

WatcherMorph.prototype.updateLabel = function () {
    // check whether the target object's name has been changed
    var obj = this.object();

    if (!obj || this.isGlobal(this.getter)) { return; }
    if (obj.version !== this.version) {
        this.objName = obj.name ? obj.name + ' ' : ' ';
        if (this.labelMorph) {
            this.labelMorph.destroy();
            this.labelMorph = null;
            this.fixLayout();
        }
    }
};

// WatcherMorph layout:

WatcherMorph.prototype.fixLayout = function () {
    var fontSize = SyntaxElementMorph.prototype.fontSize, isList,
        myself = this;

    this.changed();

    // create my parts
    if (this.labelMorph === null) {
        this.labelMorph = new StringMorph(
            this.objName + this.labelText,
            fontSize,
            null,
            true,
            false,
            false,
            MorphicPreferences.isFlat ? new Point() : new Point(1, 1),
            new Color(255, 255, 255)
        );
        this.add(this.labelMorph);
    }
    if (this.cellMorph === null) {
        this.cellMorph = new CellMorph('', this.readoutColor);
        this.add(this.cellMorph);
    }
    if (this.sliderMorph === null) {
        this.sliderMorph = new SliderMorph(
            0,
            100,
            0,
            20,
            'horizontal'
        );
        this.sliderMorph.alpha = 1;
        this.sliderMorph.button.color = this.color.darker();
        this.sliderMorph.color = this.color.lighter(60);
        this.sliderMorph.button.highlightColor = this.color.darker();
        this.sliderMorph.button.highlightColor.b += 50;
        this.sliderMorph.button.pressColor = this.color.darker();
        this.sliderMorph.button.pressColor.b += 100;
        this.sliderMorph.setHeight(fontSize);
        this.sliderMorph.action = function (num) {
            myself.target.vars[myself.getter] = Math.round(num);
        };
        this.add(this.sliderMorph);
    }

    // adjust my layout
    isList = this.cellMorph.contents instanceof List;
    if (isList) { this.style = 'normal'; }

    if (this.style === 'large') {
        this.labelMorph.hide();
        this.sliderMorph.hide();
        this.cellMorph.big();
        this.cellMorph.setPosition(this.position());
        this.setExtent(this.cellMorph.extent().subtract(1));
        return;
    }

    this.labelMorph.show();
    this.sliderMorph.show();
    this.cellMorph.normal();
    this.labelMorph.setPosition(this.position().add(new Point(
        this.edge,
        this.border + SyntaxElementMorph.prototype.typeInPadding
    )));

    if (isList) {
        this.cellMorph.setPosition(this.labelMorph.bottomLeft().add(
            new Point(0, SyntaxElementMorph.prototype.typeInPadding)
        ));
    } else {
        this.cellMorph.setPosition(this.labelMorph.topRight().add(new Point(
            fontSize / 3,
            0
        )));
        this.labelMorph.setTop(
            this.cellMorph.top()
                + (this.cellMorph.height() - this.labelMorph.height()) / 2
        );
    }

    if (this.style === 'slider') {
        this.sliderMorph.silentSetPosition(new Point(
            this.labelMorph.left(),
            this.cellMorph.bottom()
                + SyntaxElementMorph.prototype.typeInPadding
        ));
        this.sliderMorph.setWidth(this.cellMorph.right()
            - this.labelMorph.left());
        this.silentSetHeight(
            this.cellMorph.height()
                + this.sliderMorph.height()
                + this.border * 2
                + SyntaxElementMorph.prototype.typeInPadding * 3
        );
    } else {
        this.sliderMorph.hide();
        this.bounds.corner.y = this.cellMorph.bottom()
            + this.border
            + SyntaxElementMorph.prototype.typeInPadding;
    }
    this.bounds.corner.x = Math.max(
        this.cellMorph.right(),
        this.labelMorph.right()
    ) + this.edge
        + SyntaxElementMorph.prototype.typeInPadding;
    this.drawNew();
    this.changed();
};

// WatcherMorph events:

/*
// Scratch-like watcher-toggling, commented out b/c we have a drop-down menu

WatcherMorph.prototype.mouseClickLeft = function () {
    if (this.style === 'normal') {
        if (this.target instanceof VariableFrame) {
            this.style = 'slider';
        } else {
            this.style = 'large';
        }
    } else if (this.style === 'slider') {
        this.style = 'large';
    } else {
        this.style = 'normal';
    }
    this.fixLayout();
};
*/

// WatcherMorph user menu:

WatcherMorph.prototype.userMenu = function () {
    var myself = this,
        menu = new MenuMorph(this),
        on = '\u25CF',
        off = '\u25CB';
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
            menu.addItem(
                'export...',
                function () {
                    window.open(
                        'data:text/plain;charset=utf-8,' +
                            encodeURIComponent(this.currentValue.toString())
                    );
                }
            );
        }
    }
    return menu;
};

WatcherMorph.prototype.setStyle = function (style) {
    this.style = style;
    this.fixLayout();
};

WatcherMorph.prototype.styleNormal = function () {
    this.setStyle('normal');
};

WatcherMorph.prototype.styleLarge = function () {
    this.setStyle('large');
};

WatcherMorph.prototype.styleSlider = function () {
    this.setStyle('slider');
};

WatcherMorph.prototype.userSetSliderMin = function () {
    new DialogBoxMorph(
        this,
        this.setSliderMin,
        this
    ).prompt(
        "Slider minimum value",
        this.sliderMorph.start.toString(),
        this.world(),
        null, // pic
        null, // choices
        null, // read only
        true // numeric
    );
};

WatcherMorph.prototype.userSetSliderMax = function () {
    new DialogBoxMorph(
        this,
        this.setSliderMax,
        this
    ).prompt(
        "Slider maximum value",
        this.sliderMorph.stop.toString(),
        this.world(),
        null, // pic
        null, // choices
        null, // read only
        true // numeric
    );
};

// WatcherMorph drawing:

WatcherMorph.prototype.drawNew = function () {
    var context,
        gradient;
    this.image = newCanvas(this.extent());
    context = this.image.getContext('2d');
    if (MorphicPreferences.isFlat || (this.edge === 0 && this.border === 0)) {
        BoxMorph.uber.drawNew.call(this);
        return;
    }
    gradient = context.createLinearGradient(0, 0, 0, this.height());
    gradient.addColorStop(0, this.color.lighter().toString());
    gradient.addColorStop(1, this.color.darker().toString());
    context.fillStyle = gradient;
    context.beginPath();
    this.outlinePath(
        context,
        Math.max(this.edge - this.border, 0),
        this.border
    );
    context.closePath();
    context.fill();
    if (this.border > 0) {
        gradient = context.createLinearGradient(0, 0, 0, this.height());
        gradient.addColorStop(0, this.borderColor.lighter().toString());
        gradient.addColorStop(1, this.borderColor.darker().toString());
        context.lineWidth = this.border;
        context.strokeStyle = gradient;
        context.beginPath();
        this.outlinePath(context, this.edge, this.border / 2);
        context.closePath();
        context.stroke();
    }
};

// StagePrompterMorph ////////////////////////////////////////////////////////

/*
    I am a sensor-category-colored input box at the bottom of the stage
    which lets the user answer to a question. If I am opened from within
    the context of a sprite, my question can be anything that is displayable
    in a SpeechBubble and will be, if I am opened from within the stage
    my question will be shown as a single line of text within my label morph.
*/

// StagePrompterMorph inherits from BoxMorph:

StagePrompterMorph.prototype = new BoxMorph();
StagePrompterMorph.prototype.constructor = StagePrompterMorph;
StagePrompterMorph.uber = BoxMorph.prototype;

// StagePrompterMorph instance creation:

function StagePrompterMorph(question) {
    this.init(question);
}

StagePrompterMorph.prototype.init = function (question) {
    // question is optional in case the Stage is asking
    var myself = this;

    // additional properties
    this.isDone = false;
    if (question) {
        this.label = new StringMorph(
            question,
            SpriteMorph.prototype.bubbleFontSize,
            null, // fontStyle
            SpriteMorph.prototype.bubbleFontIsBold,
            false, // italic
            'left'
        );
    } else {
        this.label = null;
    }
    this.inputField = new InputFieldMorph();
    this.button = new PushButtonMorph(
        null,
        function () {myself.accept(); },
        '\u2713'
    );

    // initialize inherited properties
    StagePrompterMorph.uber.init.call(
        this,
        SyntaxElementMorph.prototype.rounding,
        SpriteMorph.prototype.bubbleBorder,
        SpriteMorph.prototype.blockColor.sensing
    );

    // override inherited behavior
    this.color = new Color(255, 255, 255);
    if (this.label) {this.add(this.label); }
    this.add(this.inputField);
    this.add(this.button);
    this.setWidth(StageMorph.prototype.dimensions.x - 20);
    this.fixLayout();
};

// StagePrompterMorph layout:

StagePrompterMorph.prototype.fixLayout = function () {
    var y = 0;
    if (this.label) {
        this.label.setPosition(new Point(
            this.left() + this.edge,
            this.top() + this.edge
        ));
        y = this.label.bottom() - this.top();
    }
    this.inputField.setPosition(new Point(
        this.left() + this.edge,
        this.top() + y + this.edge
    ));
    this.inputField.setWidth(
        this.width()
            - this.edge * 2
            - this.button.width()
            - this.border
    );
    this.button.setCenter(this.inputField.center());
    this.button.setLeft(this.inputField.right() + this.border);
    this.setHeight(
        this.inputField.bottom()
            - this.top()
            + this.edge
    );
};

// StagePrompterMorph events:

StagePrompterMorph.prototype.mouseClickLeft = function () {
    this.inputField.edit();
};

StagePrompterMorph.prototype.accept = function () {
    this.isDone = true;
};
