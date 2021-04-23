/*

    objects.js

    a scriptable microworld
    based on morphic.js, blocks.js and threads.js
    inspired by Scratch

    written by Jens Mönig
    jens@moenig.org

    Copyright (C) 2021 by Jens Mönig

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
        Microphone
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
    Yuan Yuan and Dylan Servilla contributed graphic effects for costumes

*/

// Global stuff ////////////////////////////////////////////////////////

/*global PaintEditorMorph, ListWatcherMorph, PushButtonMorph, ToggleMorph, ZERO,
DialogBoxMorph, InputFieldMorph, SpriteIconMorph, BlockMorph, SymbolMorph, nop,
ThreadManager, VariableFrame, detect, BlockMorph, BoxMorph, Color, Animation,
CommandBlockMorph, FrameMorph, HatBlockMorph, MenuMorph, Morph, MultiArgMorph,
ReporterBlockMorph, ScriptsMorph, StringMorph, SyntaxElementMorph, XML_Element,
TextMorph, contains, degrees, detect, newCanvas, radians, Array, CursorMorph,
Date, FrameMorph, Math, MenuMorph, Morph, invoke, MorphicPreferences, WHITE,
Object, PenMorph, Point, Rectangle, ScrollFrameMorph, SliderMorph, VideoMotion,
StringMorph, TextMorph, contains, copy, degrees, detect, document, isNaN, Point,
isString, newCanvas, nop, parseFloat, radians, window, modules, IDE_Morph,
VariableDialogMorph, HTMLCanvasElement, Context, List, RingMorph, HandleMorph,
SpeechBubbleMorph, InputSlotMorph, isNil, FileReader, TableDialogMorph, String,
BlockEditorMorph, BlockDialogMorph, PrototypeHatBlockMorph,  BooleanSlotMorph,
localize, TableMorph, TableFrameMorph, normalizeCanvas, VectorPaintEditorMorph,
AlignmentMorph, Process, WorldMap, copyCanvas, useBlurredShadows*/

modules.objects = '2021-April-23';

var SpriteMorph;
var StageMorph;
var SpriteBubbleMorph;
var Costume;
var SVG_Costume;
var CostumeEditorMorph;
var Sound;
var Note;
var Microphone;
var CellMorph;
var WatcherMorph;
var StagePrompterMorph;
var Note;
var SpriteHighlightMorph;

function isSnapObject(thing) {
    return thing instanceof SpriteMorph || (thing instanceof StageMorph);
}

// SpriteMorph /////////////////////////////////////////////////////////

// I am a scriptable object

// SpriteMorph inherits from PenMorph:

SpriteMorph.prototype = new PenMorph();
SpriteMorph.prototype.constructor = SpriteMorph;
SpriteMorph.uber = PenMorph.prototype;

// SpriteMorph settings

SpriteMorph.prototype.attributes =
    [
        'x position',
        'y position',
        'direction',
        'size',
        'costumes',
        'costume #',
        'volume',
        'balance',
        'sounds',
        'shown?',
        'pen down?',
        'scripts'
    ];

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
SpriteMorph.prototype.enableFirstClass = true;
SpriteMorph.prototype.useFlatLineEnds = false;
SpriteMorph.prototype.highlightColor = new Color(250, 200, 130);
SpriteMorph.prototype.highlightBorder = 8;

SpriteMorph.prototype.bubbleColor = WHITE;
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
            spec: 'point in direction %dir',
            defaults: [90]
        },
        doFaceTowards: {
            only: SpriteMorph,
            type: 'command',
            category: 'motion',
            spec: 'point towards %dst',
            defaults: [['mouse-pointer']]
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
            spec: 'go to %dst',
            defaults: [['random position']]
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
        reportGetImageAttribute: {
            type: 'reporter',
            category: 'looks',
            spec: '%img of costume %cst',
            defaults: [['width'], ['current']]
        },
        reportNewCostume: {
            type: 'reporter',
            category: 'looks',
            spec: 'new costume %l width %dim height %dim'
        },
        reportNewCostumeStretched: {
            type: 'reporter',
            category: 'looks',
            spec: 'stretch %cst x: %n y: %n %',
            defaults: [['current'], 100, 50]
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
            defaults: [['ghost'], 25]
        },
        setEffect: {
            type: 'command',
            category: 'looks',
            spec: 'set %eff effect to %n',
            defaults: [['ghost'], 0]
        },
        getEffect: {
            type: 'reporter',
            category: 'looks',
            spec: '%eff effect',
            defaults: [['ghost']]
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
            type: 'command',
            category: 'looks',
            spec: 'show'
        },
        hide: {
            type: 'command',
            category: 'looks',
            spec: 'hide'
        },
        reportShown: {
            type: 'predicate',
            category: 'looks',
            spec: 'shown?'
        },
        goToLayer: {
            only: SpriteMorph,
            type: 'command',
            category: 'looks',
            spec: 'go to %layer layer',
            defaults: [['front']]
        },
        goBack: {
            only: SpriteMorph,
            type: 'command',
            category: 'looks',
            spec: 'go back %n layers',
            defaults: [1]
        },

        // Looks - Debugging primitives for development mode
        doScreenshot: {
            dev: true,
            type: 'command',
            category: 'looks',
            spec: 'save %imgsource as costume named %s',
            defaults: [['pen trails'], localize('screenshot')]
        },
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
        doPlaySoundAtRate: {
            type: 'command',
            category: 'sound',
            spec: 'play sound %snd at %rate Hz',
            defaults: ['', 44100]
        },
        doStopAllSounds: {
            type: 'command',
            category: 'sound',
            spec: 'stop all sounds'
        },
        reportGetSoundAttribute: {
            type: 'reporter',
            category: 'sound',
            spec: '%aa of sound %snd',
            defaults: [['duration']]
        },
        reportNewSoundFromSamples: {
            type: 'reporter',
            category: 'sound',
            spec: 'new sound %l rate %rate Hz',
            defaults: [null, 44100]
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
            spec: 'play note %note for %n beats',
            defaults: [60, 0.5]
        },
        doPlayFrequency: { // only in dev mode - experimental
            dev: true,
            type: 'command',
            category: 'sound',
            spec: 'play %n Hz for %n secs',
            defaults: [440, 2]
        },
        doSetInstrument: {
            type: 'command',
            category: 'sound',
            spec: 'set instrument to %inst',
            defaults: [1]
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
        changeVolume: {
            type: 'command',
            category: 'sound',
            spec: 'change volume by %n',
            defaults: [10]
        },
        setVolume: {
            type: 'command',
            category: 'sound',
            spec: 'set volume to %n %',
            defaults: [100]
        },
        getVolume: {
            type: 'reporter',
            category: 'sound',
            spec: 'volume'
        },
        changePan: {
            type: 'command',
            category: 'sound',
            spec: 'change balance by %n',
            defaults: [10]
        },
        setPan: {
            type: 'command',
            category: 'sound',
            spec: 'set balance to %n',
            defaults: [0]
        },
        getPan: {
            type: 'reporter',
            category: 'sound',
            spec: 'balance'
        },
        playFreq: {
            type: 'command',
            category: 'sound',
            spec: 'play frequency %n Hz',
            defaults: [440]
        },
        stopFreq: {
            type: 'command',
            category: 'sound',
            spec: 'stop frequency'
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
        getPenDown: {
            only: SpriteMorph,
            type: 'predicate',
            category: 'pen',
            spec: 'pen down?'
        },
        setColor: {
            only: SpriteMorph,
            type: 'command',
            category: 'pen',
            spec: 'set pen color to %clr'
        },
        setPenHSVA: {
            only: SpriteMorph,
            type: 'command',
            category: 'pen',
            spec: 'set pen %hsva to %n',
            defaults: [['hue'], 50]
        },
        changePenHSVA: {
            only: SpriteMorph,
            type: 'command',
            category: 'pen',
            spec: 'change pen %hsva by %n',
            defaults: [['hue'], 10]
        },
        getPenAttribute: {
            type: 'reporter',
            category: 'pen',
            spec: 'pen %pen',
            defaults: [['hue']]
        },
        setBackgroundColor: {
            only: StageMorph,
            type: 'command',
            category: 'pen',
            spec: 'set background color to %clr'
        },
        setBackgroundHSVA: {
            only: StageMorph,
            type: 'command',
            category: 'pen',
            spec: 'set background %hsva to %n',
            defaults: [['hue'], 50]
        },
        changeBackgroundHSVA: {
            only: StageMorph,
            type: 'command',
            category: 'pen',
            spec: 'change background %hsva by %n',
            defaults: [['hue'], 10]
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
        floodFill: {
            only: SpriteMorph,
            type: 'command',
            category: 'pen',
            spec: 'fill'
        },
        write: {
            only: SpriteMorph,
            type: 'command',
            category: 'pen',
            spec: 'write %s size %n',
            defaults: [localize('Hello!'), 12]
        },
        reportPenTrailsAsCostume: {
            type: 'reporter',
            category: 'pen',
            spec: 'pen trails'
        },
        reportPentrailsAsSVG: {
            type: 'reporter',
            category: 'pen',
            spec: 'pen vectors'
        },
        doPasteOn: {
            type: 'command',
            category: 'pen',
            spec: 'paste on %spr'
        },
        doCutFrom: {
            type: 'command',
            category: 'pen',
            spec: 'cut from %spr'
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
            spec: 'when %keyHat key pressed',
            defaults: [['space']]
        },
        receiveInteraction: {
            type: 'hat',
            category: 'control',
            spec: 'when I am %interaction',
            defaults: ['clicked']
        },
        receiveMessage: {
            type: 'hat',
            category: 'control',
            spec: 'when I receive %msgHat'
        },
        receiveCondition: {
            type: 'hat',
            category: 'control',
            spec: 'when %b'
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
        doSend: {
            type: 'command',
            category: 'control',
            spec: 'send %msg to %spr'
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
            spec: 'forever %loop'
        },
        doRepeat: {
            type: 'command',
            category: 'control',
            spec: 'repeat %n %loop',
            defaults: [10]
        },
        doUntil: {
            type: 'command',
            category: 'control',
            spec: 'repeat until %b %loop'
        },
        doFor: {
            type: 'command',
            category: 'control',
            spec: 'for %upvar = %n to %n %cla',
            defaults: ['i', 1, 10]
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
        reportIfElse: {
            type: 'reporter',
            category: 'control',
            spec: 'if %b then %s else %s'
        },
        doStopThis: {
            type: 'command',
            category: 'control',
            spec: 'stop %stopChoices',
            defaults: [['all']]
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
        doReport: {
            type: 'command',
            category: 'control',
            spec: 'report %s'
        },
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

        // Message passing
        doTellTo: {
            type: 'command',
            category: 'control',
            // spec: 'tell %spr to %cl' // I liked this version much better, -Jens
            spec: 'tell %spr to %cmdRing %inputs'
        },
        reportAskFor: {
            type: 'reporter',
            category: 'control',
            spec: 'ask %spr for %repRing %inputs'
        },

        // Cloning
        receiveOnClone: {
            type: 'hat',
            category: 'control',
            spec: 'when I start as a clone'
        },
        createClone: {
            type: 'command',
            category: 'control',
            spec: 'create a clone of %cln',
            defaults: [['myself']]
        },
        newClone: {
            type: 'reporter',
            category: 'control',
            spec: 'a new clone of %cln',
            defaults: [['myself']]
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
            spec: 'touching %col ?',
            defaults: [['mouse-pointer']]
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
        reportAspect: {
            type: 'reporter',
            category: 'sensing',
            spec: '%asp at %loc',
            defaults: [['hue'], ['mouse-pointer']]
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
        reportYieldCount: {
            dev: true,
            type: 'reporter',
            category: 'sensing',
            spec: 'yields'
        },
        reportThreadCount: {
            dev: true,
            type: 'reporter',
            category: 'sensing',
            spec: 'processes'
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
            spec: 'key %key pressed?',
            defaults: [['space']]
        },
        reportRelationTo: {
            only: SpriteMorph,
            type: 'reporter',
            category: 'sensing',
            spec: '%rel to %dst',
            defaults: [['distance'], ['mouse-pointer']]
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
        reportObject: {
            type: 'reporter',
            category: 'sensing',
            spec: 'object %self',
            defaults: [['myself']]
        },
        reportURL: {
            type: 'reporter',
            category: 'sensing',
            spec: 'url %s',
            defaults: ['snap.berkeley.edu']
        },
        doSetGlobalFlag: {
            type: 'command',
            category: 'sensing',
            spec: 'set %setting to %b',
            defaults: [['video capture']]
        },
        reportGlobalFlag: {
            type: 'predicate',
            category: 'sensing',
            spec: 'is %setting on?',
            defaults: [['turbo mode']]
        },
        reportDate: {
            type: 'reporter',
            category: 'sensing',
            spec: 'current %dates',
            defaults: [['date']]
        },
        reportGet: {
            type: 'reporter',
            category: 'sensing',
            spec: 'my %get',
            defaults: [['neighbors']]
        },
        reportAudio: {
            type: 'reporter',
            category: 'sensing',
            spec: 'microphone %audio',
            defaults: [['volume']]
        },

        // Operators
        reifyScript: {
            type: 'ring',
            category: 'other',
            spec: '%rc %ringparms',
            alias: 'command ring lambda'
        },
        reifyReporter: {
            type: 'ring',
            category: 'other',
            spec: '%rr %ringparms',
            alias: 'reporter ring lambda'
        },
        reifyPredicate: {
            type: 'ring',
            category: 'other',
            spec: '%rp %ringparms',
            alias: 'predicate ring lambda'
        },
        reportSum: {
            type: 'reporter',
            category: 'operators',
            spec: '%n + %n'
        },
        reportDifference: {
            type: 'reporter',
            category: 'operators',
            spec: '%n \u2212 %n',
            alias: '-'
        },
        reportProduct: {
            type: 'reporter',
            category: 'operators',
            spec: '%n \u00D7 %n',
            alias: '*'
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
            defaults: [['sqrt'], 10]
        },
        reportPower: {
            type: 'reporter',
            category: 'operators',
            spec: '%n ^ %n'
        },
        reportModulus: {
            type: 'reporter',
            category: 'operators',
            spec: '%n mod %n'
        },
        reportAtan2: {
            type: 'reporter',
            category: 'operators',
            spec: 'atan2 %n ÷ %n'
        },
        reportMin: {
            type: 'reporter',
            category: 'operators',
            spec: '%n min %n'
        },
        reportMax: {
            type: 'reporter',
            category: 'operators',
            spec: '%n max %n'
        },
        reportRandom: {
            type: 'reporter',
            category: 'operators',
            spec: 'pick random %n to %n',
            defaults: [1, 10]
        },
        reportEquals: {
            type: 'predicate',
            category: 'operators',
            spec: '%s = %s'
        },
        reportNotEquals: {
            type: 'predicate',
            category: 'operators',
            spec: '%s \u2260 %s'
        },
        reportLessThan: {
            type: 'predicate',
            category: 'operators',
            spec: '%s < %s'
        },
        reportLessThanOrEquals: {
            type: 'predicate',
            category: 'operators',
            spec: '%s \u2264 %s'
        },
        reportGreaterThan: {
            type: 'predicate',
            category: 'operators',
            spec: '%s > %s'
        },
        reportGreaterThanOrEquals: {
            type: 'predicate',
            category: 'operators',
            spec: '%s \u2265 %s'
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
        reportBoolean: {
            type: 'predicate',
            category: 'operators',
            spec: '%bool',
            defaults: [true],
            alias: 'true boolean'
        },
        reportFalse: { // special case for keyboard entry and search
            type: 'predicate',
            category: 'operators',
            spec: '%bool',
            defaults: [false],
            alias: 'false boolean'
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
            spec: 'letter %idx of %s',
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
            defaults: [5, ['number']]
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
        reportJSFunction: {
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
            defaults: [['encode URI'], "Abelson & Sussman"]
        },
        reportCompiled: { // experimental
            dev: true,
            type: 'reporter',
            category: 'operators',
            spec: 'compile %repRing for %n args',
            defaults: [null, 0]
        },

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

        // inheritance
        doDeleteAttr: {
            type: 'command',
            category: 'variables',
            spec: 'inherit %shd'
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
        reportListLength: { // deprecated as of v6.6
            dev: true,
            type: 'reporter',
            category: 'lists',
            spec: 'length of %l'
        },
        reportListAttribute: {
            type: 'reporter',
            category: 'lists',
            spec: '%la of %l',
            defaults: [['length']]
        },
        reportListContainsItem: {
            type: 'predicate',
            category: 'lists',
            spec: '%l contains %s',
            defaults: [null, localize('thing')]
        },
        reportListIsEmpty: {
            type: 'predicate',
            category: 'lists',
            spec: 'is %l empty?'
        },
        reportListIndex: {
            type: 'reporter',
            category: 'lists',
            spec: 'index of %s in %l',
            defaults: [localize('thing')]
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

        // numbers - (arrayed when hyper-blocks is on, otherwise linked)
        reportNumbers: {
            type: 'reporter',
            category: 'lists',
            spec: 'numbers from %n to %n',
            defaults: [1, 10]
        },
    /*
        reportListCombination: { // currently not in use
            type: 'reporter',
            category: 'lists',
            spec: '%mlfunc %lists',
            defaults: [['append']]
        },
    */
        reportConcatenatedLists: {
            type: 'reporter',
            category: 'lists',
            spec: 'append %lists'
        },
        reportTranspose: { // deprecated
            type: 'reporter',
            category: 'lists',
            spec: 'transpose %l'
        },
        reportReshape: {
            type: 'reporter',
            category: 'lists',
            spec: 'reshape %l to %nums',
            defaults: [null, [4, 3]]
        },
    /*
        reportSlice: { // currently not in use
            type: 'reporter',
            category: 'lists',
            spec: 'slice %l by %nums',
            defaults: [null, [2, -1]]
        },
    */

        // HOFs
        reportMap: {
            type: 'reporter',
            category: 'lists',
            spec: 'map %repRing over %l'
        },
        reportAtomicMap: {
            dev: true, // not shown in palette, only accessible via relabelling
            type: 'reporter',
            category: 'lists',
            spec: '%blitz map %repRing over %l'
        },
        reportKeep: {
            type: 'reporter',
            category: 'lists',
            spec: 'keep items %predRing from %l'
        },
        reportAtomicKeep: {
            dev: true, // not shown in palette, only accessible via relabelling
            type: 'reporter',
            category: 'lists',
            spec: '%blitz keep items %predRing from %l'
        },
        reportFindFirst: {
            type: 'reporter',
            category: 'lists',
            spec: 'find first item %predRing in %l'
        },
        reportAtomicFindFirst: {
            dev: true, // not shown in palette, only accessible via relabelling
            type: 'reporter',
            category: 'lists',
            spec: '%blitz find first item %predRing in %l'
        },
        reportCombine: {
            type: 'reporter',
            category: 'lists',
            spec: 'combine %l using %repRing'
        },
        reportAtomicCombine: {
            dev: true, // not shown in palette, only accessible via relabelling
            type: 'reporter',
            category: 'lists',
            spec: '%blitz combine %l using %repRing'
        },
        doForEach: {
            type: 'command',
            category: 'lists',
            spec: 'for each %upvar in %l %cla',
            defaults: [localize('item')]
        },

        // Tables - experimental
        doShowTable: {
            dev: true,
            type: 'command',
            category: 'lists',
            spec: 'show table %l'
        },

        // Code mapping
        doMapCodeOrHeader: {
            type: 'command',
            category: 'other',
            spec: 'map %cmdRing to %codeKind %code',
            defaults: [null, ['code']]
        },
        doMapValueCode: {
            type: 'command',
            category: 'other',
            spec: 'map %mapValue to code %code',
            defaults: [['String'], '<#1>']
        },
        doMapListCode: {
            type: 'command',
            category: 'other',
            spec: 'map %codeListPart of %codeListKind to code %code'
        },
        reportMappedCode: {
            type: 'reporter',
            category: 'other',
            spec: 'code of %cmdRing'
        },

        // Video motion
        doSetVideoTransparency: {
            type: 'command',
            category: 'sensing',
            spec: 'set video transparency to %n',
            defaults: [50]
        },
        reportVideo: {
            type: 'reporter',
            category: 'sensing',
            spec: 'video %vid on %self',
            defaults: [['motion'], ['myself']]
        },
    };
};

SpriteMorph.prototype.initBlocks();

SpriteMorph.prototype.initBlockMigrations = function () {
    // change blocks in existing projects to their updated version
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
        },
        doStopOthers: {
            selector: 'doStopThis',
            inputs: [['all']],
            offset: 0
        },
        receiveClick: {
            selector: 'receiveInteraction',
            inputs: [['clicked']]
        },
        reportTrue: {
            selector: 'reportBoolean',
            inputs: [true]
        },
        reportFalse: {
            selector: 'reportBoolean',
            inputs: [false]
        },
        reportCostumes: {
            selector: 'reportGet',
            inputs: [['costumes']]
        },
        reportSounds: {
            selector: 'reportGet',
            inputs: [['sounds']]
        },
        doMapStringCode: {
            selector: 'doMapValueCode',
            inputs: [['String'], '<#1>'],
            offset: 1
        },
        reportDistanceTo: {
        	selector: 'reportRelationTo',
         	inputs: [['distance']],
            offset: 1
        },
        comeToFront: {
            selector: 'goToLayer',
            inputs: [['front']]
        },
        setHue: {
            selector: 'setPenHSVA',
            inputs: [['hue']],
            offset: 1
        },
        setBrightness: {
            selector: 'setPenHSVA',
            inputs: [['brightness']],
            offset: 1
        },
        changeHue: {
            selector: 'changePenHSVA',
            inputs: [['hue']],
            offset: 1
        },
        changeBrightness: {
            selector: 'changePenHSVA',
            inputs: [['brightness']],
            offset: 1
        },
        reportIsFastTracking: {
            selector: 'reportGlobalFlag',
            inputs: [['turbo mode']],
            offset: 1
        },
        doSetFastTracking: {
            selector: 'doSetGlobalFlag',
            inputs: [['turbo mode']],
            offset: 1
        },
        reportTableRotated: {
            selector: 'reportListAttribute',
            inputs: [['transpose']],
            offset: 1
        },
        reportTranspose: {
            selector: 'reportListAttribute',
            inputs: [['transpose']],
            offset: 1
        },
        reportListLength: {
            selector: 'reportListAttribute',
            inputs: [['length']],
            offset: 1
        }
    };
};

SpriteMorph.prototype.initBlockMigrations();

SpriteMorph.prototype.blockAlternatives = {
    // structure:
    //      selector: [ersatz, ...]
    //      ersatz can also be a 2-item array: [selector, input-offset]

    // motion:
    forward: ['changeXPosition', 'changeYPosition'],
    turn: ['turnLeft'],
    turnLeft: ['turn'],
    doFaceTowards:  ['doGotoObject'],
    gotoXY: [['doGlide', 1]],
    doGotoObject: ['doFaceTowards'],
    doGlide: [['gotoXY', -1]],
    changeXPosition: ['changeYPosition', 'setXPosition', 'setYPosition',
        'forward'],
    setXPosition: ['setYPosition', 'changeXPosition', 'changeYPosition'],
    changeYPosition: ['changeXPosition', 'setYPosition', 'setXPosition',
        'forward'],
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
    playSound: ['doPlaySoundUntilDone', 'doPlaySoundAtRate'],
    doPlaySoundUntilDone: ['playSound', 'doPlaySoundAtRate'],
    doPlaySoundAtRate: ['playSound', 'doPlaySoundUntilDone'],
    doPlayNote: [['doRest', -1]],
    doRest: [['doPlayNote', 1]],
    doChangeTempo: ['doSetTempo'],
    doSetTempo: ['doChangeTempo'],
    setVolume: ['changeVolume'],
    changeVolume: ['setVolume'],
    setPan: ['changePan'],
    changePan: ['setPan'],
    getVolume: ['getTempo', 'getPan'],
    getTempo: ['getVolume', 'getPan'],
    getPan: ['getVolume', 'getTempo'],

    // pen:
    clear: ['down', 'up', 'doStamp'],
    down: ['up', 'clear', 'doStamp'],
    up: ['down', 'clear', 'doStamp'],
    doPasteOn: ['doCutFrom'],
    doCutFrom: ['doPasteOn'],
    doStamp: ['clear', 'down', 'up'],
    setPenHSVA: ['changePenHSVA'],
    changePenHSVA: ['setPenHSVA'],
    setBackgroundHSVA: ['changeBackgroundHSVA'],
    changeBackgroundHSVA: ['setBackgroundHSVA'],
    changeSize: ['setSize'],
    setSize: ['changeSize'],
    
    // control:
    doBroadcast: ['doBroadcastAndWait', 'doSend'],
    doBroadcastAndWait: ['doBroadcast', 'doSend'],
    doSend: ['doBroadcast', 'doBroadcastAndWait'],
    doIf: ['doIfElse', 'doUntil'],
    doIfElse: ['doIf', 'doUntil'],
    doRepeat: ['doUntil', ['doForever', -1], ['doFor', 2], ['doForEach', 1]],
    doUntil: ['doRepeat', 'doIf', ['doForever', -1], ['doFor', 2],
        ['doForEach', 1]],
    doForever: [['doUntil', 1], ['doRepeat', 1], ['doFor', 3],
        ['doForEach', 2]],
    doFor: [['doForever', -3], ['doRepeat', -2], ['doUntil', -2],
        ['doForEach', -1]],
    // doRun: ['fork'],
    // fork: ['doRun'],

    // sensing:
    doAsk: ['bubble', 'doThink', 'doSayFor', 'doThinkFor'],
    getLastAnswer: ['getTimer'],
    getTimer: ['getLastAnswer'],
    reportMouseX: ['reportMouseY'],
    reportMouseY: ['reportMouseX'],

    // operators:
    reportSum: ['reportDifference', 'reportProduct', 'reportQuotient',
        'reportPower', 'reportModulus', 'reportAtan2', 'reportMin',
        'reportMax'],
    reportDifference: ['reportSum', 'reportProduct', 'reportQuotient',
        'reportPower', 'reportModulus', 'reportAtan2', 'reportMin',
        'reportMax'],
    reportProduct: ['reportDifference', 'reportSum', 'reportQuotient',
        'reportPower', 'reportModulus', 'reportAtan2', 'reportMin',
        'reportMax'],
    reportQuotient: ['reportDifference', 'reportProduct', 'reportSum',
        'reportPower', 'reportModulus', 'reportAtan2', 'reportMin',
        'reportMax'],
    reportPower: ['reportDifference', 'reportProduct', 'reportSum',
        'reportQuotient', 'reportModulus', 'reportAtan2', 'reportMin',
        'reportMax'],
    reportModulus: ['reportAtan2', 'reportDifference', 'reportProduct',
        'reportSum','reportQuotient', 'reportPower', 'reportMin', 'reportMax'],
    reportAtan2: ['reportModulus', 'reportDifference', 'reportProduct',
        'reportSum','reportQuotient', 'reportPower', 'reportMin', 'reportMax'],
    reportMin: ['reportMax', 'reportSum', 'reportDifference', 'reportProduct',
        'reportQuotient', 'reportPower', 'reportModulus', 'reportAtan2'],
    reportMax: ['reportMin', 'reportSum', 'reportDifference', 'reportProduct',
        'reportQuotient', 'reportPower', 'reportModulus', 'reportAtan2'],
    reportLessThan: ['reportLessThanOrEquals', 'reportEquals',
        'reportNotEquals', 'reportGreaterThan', 'reportGreaterThanOrEquals'],
    reportEquals: ['reportIsIdentical', 'reportNotEquals', 'reportLessThan',
        'reportLessThanOrEquals', 'reportGreaterThan',
        'reportGreaterThanOrEquals'],
    reportNotEquals: ['reportEquals', 'reportIsIdentical', 'reportLessThan',
        'reportLessThanOrEquals', 'reportGreaterThan',
        'reportGreaterThanOrEquals'],
    reportGreaterThan: ['reportGreaterThanOrEquals', 'reportEquals',
        'reportIsIdentical', 'reportNotEquals', 'reportLessThan',
        'reportLessThanOrEquals'],
    reportLessThanOrEquals: ['reportLessThan', 'reportEquals',
        'reportIsIdentical', 'reportNotEquals', 'reportGreaterThan',
        'reportGreaterThanOrEquals'],
    reportGreaterThanOrEquals: ['reportGreaterThan', 'reportEquals',
        'reportIsIdentical', 'reportNotEquals', 'reportLessThan',
        'reportLessThanOrEquals'],
    reportIsIdentical: ['reportEquals', 'reportNotEquals', 'reportLessThan',
        'reportLessThanOrEquals', 'reportGreaterThan',
        'reportGreaterThanOrEquals'],
    reportAnd: ['reportOr'],
    reportOr: ['reportAnd'],

    // variables
    doSetVar: ['doChangeVar'],
    doChangeVar: ['doSetVar'],
    doShowVar: ['doHideVar'],
    doHideVar: ['doShowVar'],

    // HOFs
    reportMap: ['reportKeep', 'reportFindFirst'],
    reportKeep: ['reportFindFirst', 'reportMap'],
    reportFindFirst: ['reportKeep', 'reportMap'],
    doForEach: [['doFor', 1], ['doForever', -2], ['doRepeat', -1],
        ['doUntil', -1]]
};

// SpriteMorph instance creation

function SpriteMorph(globals) {
    this.init(globals);
}

SpriteMorph.prototype.init = function (globals) {
    this.name = localize('Sprite');
    this.variables = new VariableFrame(globals || null, this);
    this.scripts = new ScriptsMorph();
    this.customBlocks = [];
    this.costumes = new List();
    this.costumes.type = 'costume';
    this.costume = null;
    this.sounds = new List();
    this.sounds.type = 'sound';
    this.normalExtent = new Point(60, 60); // only for costume-less situation
    this.scale = 1;
    this.rotationStyle = 1; // 1 = full, 2 = left/right, 0 = off
    this.instrument = null;
    this.version = Date.now(); // for observer optimization
    this.isTemporary = false; // indicate a temporary Scratch-style clone
    this.isCorpse = false; // indicate whether a sprite/clone has been deleted
    this.cloneOriginName = '';

    // volume and stereo-pan support, experimental:
    this.volume = 100;
    this.gainNode = null; // must be lazily initialized in Chrome, sigh...
    this.pan = 0;
    this.pannerNode = null; // must be lazily initialized in Chrome, sigh...

    // frequency player, experimental
    this.freqPlayer = null; // Note, to be lazily initialized

    // pen hsv color support
    this.cachedHSV = [0, 0, 0]; // not serialized

    // only temporarily for serialization
    this.inheritedMethodsCache = [];

    // sprite nesting properties
    this.parts = []; // not serialized, only anchor (name)
    this.anchor = null;
    this.nestingScale = 1;
    this.rotatesWithAnchor = true;
    this.layers = null; // cache for dragging nested sprites, don't serialize

    this.blocksCache = {}; // not to be serialized (!)
    this.paletteCache = {}; // not to be serialized (!)
    this.rotationOffset = ZERO; // not to be serialized (!)
    this.idx = 0; // not to be serialized (!) - used for de-serialization

    this.graphicsValues = {
        'color': 0,
        'fisheye': 0,
        'whirl': 0,
        'pixelate': 0,
        'mosaic': 0,
        'duplicate': 0,
        'negative': 0,
        'comic': 0,
        'confetti': 0,
        'saturation': 0,
        'brightness': 0
    };

    // sprite inheritance
    this.exemplar = null;
    this.instances = [];
    this.cachedPropagation = false; // not to be persisted
    this.inheritedAttributes = []; // 'x position', 'direction', 'size' etc...

    // video- and rendering state
    this.imageExtent = ZERO;
    this.imageOffset = ZERO;
    this.imageData = {}; // version: date, pixels: Uint32Array
    this.motionAmount = 0;
    this.motionDirection = 0;
    this.frameNumber = 0;

    SpriteMorph.uber.init.call(this);

    this.isCachingImage = true;
    this.isFreeForm = true;
    this.cachedHSV = this.color.hsv();
    this.isDraggable = true;
    this.isDown = false;
    this.heading = 90;
    this.fixLayout();
    this.rerender();
};

// SpriteMorph duplicating (fullCopy)

SpriteMorph.prototype.fullCopy = function (forClone) {
    var c = SpriteMorph.uber.fullCopy.call(this),
        arr = [],
        cb, effect;

    // make sure the clone has its own canvas to recycle
    // needs to be copied instead of redrawn, because at
    // this time the clone is not yet onstage and therefore
    // has no access to the stage's scale
    c.cachedImage = copyCanvas(this.cachedImage);

    // un-share individual properties
    c.instances = [];
    c.stopTalking();
    c.color = this.color.copy();
    c.gainNode = null;
    c.pannerNode = null;
    c.freqPlayer = null;
    c.blocksCache = {};
    c.paletteCache = {};
    c.imageData = {};
    c.cachedHSV = c.color.hsv();
    arr = [];
    this.inheritedAttributes.forEach(att => arr.push(att));
    c.inheritedAttributes = arr;
    if (forClone) {
        c.exemplar = this;
        c.customBlocks = [];
        c.variables = new VariableFrame(null, c);
        c.variables.parentFrame = this.variables;
        c.inheritedVariableNames().forEach(name =>
            c.shadowVar(name, c.variables.getVar(name))
        );
        this.addSpecimen(c);
        this.cachedPropagation = false;
        ['scripts', 'costumes', 'sounds'].forEach(att => {
            if (!contains(c.inheritedAttributes, att)) {
                c.inheritedAttributes.push(att);
            }
        });
    } else {
        c.variables = this.variables.copy();
        c.variables.owner = c;
        c.scripts = this.scripts.fullCopy();
        c.customBlocks = [];
        this.customBlocks.forEach(def => {
            cb = def.copyAndBindTo(c);
            c.customBlocks.push(cb);
            c.allBlockInstances(def).forEach(block =>
                block.definition = cb
            );
        });
        arr = [];
        this.costumes.asArray().forEach(costume => {
            var cst = forClone ? costume : costume.copy();
            arr.push(cst);
            if (costume === this.costume) {
                c.costume = cst;
            }
        });
        c.costumes = new List(arr);
        arr = [];
        this.sounds.asArray().forEach(sound => {
            var snd = forClone ? sound : sound.copy();
            arr.push(snd);
        });
        c.sounds = new List(arr);
        arr = [];
    }
    c.nestingScale = 1;
    c.rotatesWithAnchor = true;
    c.anchor = null;
    c.parts = [];
    this.parts.forEach(part => {
        var dp = part.fullCopy(forClone);
        dp.nestingScale = part.nestingScale;
        dp.rotatesWithAnchor = part.rotatesWithAnchor;
        c.attachPart(dp);
    });
    c.graphicsValues = {};
    for (effect in this.graphicsValues) {
        if (this.graphicsValues.hasOwnProperty(effect)) {
            c.graphicsValues[effect] = this.graphicsValues[effect];
        }
    }
    return c;
};

SpriteMorph.prototype.appearIn = function (ide) {
    // private - used in IDE_Morph.duplicateSprite()
    if (!this.isTemporary) {
        this.name = ide.newSpriteName(this.name);
        ide.corral.addSprite(this);
        ide.sprites.add(this);
    }
    ide.stage.add(this);
    this.parts.forEach(part => part.appearIn(ide));
};

// SpriteMorph versioning

SpriteMorph.prototype.setName = function (string) {
    this.name = string || this.name;
    this.version = Date.now();
};

// SpriteMorph rendering

SpriteMorph.prototype.getImage = function () {
    // overrides inherited method to allow for an image exceeding my bounds
    // to accommodate rotation and to disable retina resolution to
    // optimize graphics performance
    if (this.shouldRerender || !this.cachedImage) {
        this.cachedImage = newCanvas(
            this.costume ? this.imageExtent : this.extent(),
            !isNil(this.costume), // retina
            this.cachedImage
        );
        this.render(this.cachedImage.getContext('2d'));
        this.shouldRerender = false;
    }
    return this.cachedImage;
};

SpriteMorph.prototype.fixLayout = function () {
    // determine my extent and the extent designated for my cached image
    var currentCenter,
        facing, // actual costume heading based on my rotation style
        isFlipped,
        isLoadingCostume,
        pic, // (flipped copy of) actual costume based on my rotation style
        imageSide,
        stageScale,
        newX,
        corners = [],
        origin,
        corner,
        costumeExtent;

    currentCenter = this.center();
    isLoadingCostume = this.costume &&
        typeof this.costume.loaded === 'function';
    stageScale = this.parent instanceof StageMorph ?
            this.parent.scale : 1;
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
         corners = pic.bounds().corners().map(point =>
            point.rotateBy(
                radians(facing - 90),
                this.costume.center()
            )
         );
         origin = corners[0];
         corner = corners[0];
         corners.forEach(point => {
             origin = origin.min(point);
             corner = corner.max(point);
         });
         costumeExtent = origin.corner(corner)
             .extent().multiplyBy(this.scale * stageScale);

         // determine the new relative origin of the rotated shape
         this.imageOffset = ZERO.rotateBy(
             radians(-(facing - 90)),
             pic.center()
         ).subtract(origin);

        // determine an adequately dimensioned image extent, so the
        // shape on the canvas ran be rotated without having to create
        // a new canvas each time

        if (this.rotationStyle === 1) { // rotate freely in all directions
            // create a canvas that is big enough, so the sprite's current
            // costume can be fully rotated inside, so we can recycle
            // the canvas for re-rendering until the sprite's or the stage's
            // scale changes.
            // note that the canvas will be too big for most situations, but
            // the sprite's bounds indicate the actually visible area.
            // recycling canvas elements instead of creating new ones whenever
            // we render a sprite boosts performance for recent browser
            // architectures that move canvas elements to the GPU for
            // rendering (which is a pain in the ass and an altogether
            // bad idea for any serious GUI but looks oh-so-nice for
            // some flashy graphic effects in the Apple store).
            imageSide = Math.sqrt(
                Math.pow(pic.width(), 2) + Math.pow(pic.height(), 2)
            ) * this.scale * stageScale;
            this.imageExtent = new Point(imageSide, imageSide);
        } else { // don't actually rotate
            this.imageExtent = costumeExtent;
        }
        this.bounds.setExtent(costumeExtent);

        // adjust my position to the rotation
        this.setCenter(currentCenter, true);

        // determine my rotation offset
        this.rotationOffset = this.imageOffset
            .translateBy(pic.rotationCenter)
            .rotateBy(radians(-(facing - 90)), this.imageOffset)
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
        this.bounds.setWidth(newX);
        this.bounds.setHeight(newX);
        this.setCenter(currentCenter, true); // just me
        this.rotationOffset = this.extent().divideBy(2);
    }
 };

SpriteMorph.prototype.render = function (ctx) {
    var myself = this,
        facing, // actual costume heading based on my rotation style
        isFlipped,
        isLoadingCostume,
        cst,
        pic, // (flipped copy of) actual costume based on my rotation style
        stageScale,
        handle;

    isLoadingCostume = this.costume &&
        typeof this.costume.loaded === 'function';
    stageScale = this.parent instanceof StageMorph ?
            this.parent.scale : 1;
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
        ctx.save();
        ctx.scale(this.scale * stageScale, this.scale * stageScale);
        ctx.translate(this.imageOffset.x, this.imageOffset.y);
        ctx.rotate(radians(facing - 90));
        ctx.drawImage(pic.contents, 0, 0);
        ctx.restore();

    } else {
        facing = isFlipped ? -90 : facing;
        SpriteMorph.uber.render.call(this, ctx, facing);

        if (isLoadingCostume) { // retry until costume is done loading
            cst = this.costume;
            handle = setInterval(
                function () {
                    myself.wearCostume(cst, true);
                    clearInterval(handle);
                },
                100
            );
            return this.wearCostume(null, true);
        }
    }
    // apply graphics effects to image
    this.cachedImage = this.applyGraphicsEffects(this.cachedImage);
    this.version = Date.now();
};

SpriteMorph.prototype.rotationCenter = function () {
    return this.position().add(this.rotationOffset);
};

SpriteMorph.prototype.getImageData = function () {
    // used for video motion detection.
    // Get sprite image data scaled to 1 an converted to ABGR array,
    // cache to reduce GC load
    if (this.version !== this.imageData.version) {
        var stage = this.parentThatIsA(StageMorph),
            ext = this.extent(),
            newExtent = new Point(
                Math.floor(ext.x / stage.scale),
                Math.floor(ext.y / stage.scale)
            ),
            canvas = newCanvas(newExtent, true),
            canvasContext,
            imageData;
        canvasContext = canvas.getContext("2d");
        canvasContext.drawImage(
            this.getImage(),
            0, 0, Math.floor(ext.x),
            Math.floor(ext.y),
            0, 0, newExtent.x, newExtent.y
        );
        imageData = canvasContext.getImageData(
            0,
            0,
            newExtent.x,
            newExtent.y
        ).data;
        this.imageData = {
            version : this.version,
            pixels : new Uint32Array(imageData.buffer.slice(0))
        };
    }
    return this.imageData.pixels;
};

SpriteMorph.prototype.projectionSnap = function() {
    var stage = this.parentThatIsA(StageMorph),
        center = this.center().subtract(stage.position())
            .divideBy(stage.scale),
        cst = this.costume || this.getImage(),
        w, h, rot,
        offset,
        snap,
        ctx;

    if (cst instanceof Costume) {
        rot = cst.rotationCenter.copy();
        cst = cst.contents;
        w = cst.width;
        h = cst.height;
    } else {
        w = this.width();
        h = this.height();
    }
    offset = new Point(
        Math.floor(center.x - (w / 2)),
        Math.floor(center.y - (h / 2))
    );
    snap = newCanvas(new Point(w, h), true);
    ctx = snap.getContext('2d');
    ctx.drawImage(cst, 0, 0);
    ctx.globalCompositeOperation = 'source-atop';
    ctx.drawImage(stage.projectionLayer(), -offset.x, -offset.y);
    return new Costume(snap, this.newCostumeName(localize('snap')), rot);
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
    block.selector = migration ? migration.selector : selector;
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
                    if (inputs[i] instanceof MultiArgMorph) {
                        inputs[i].defaults = defaults[i];
                    }
                }
            }
        }
    }
    return block;
};

SpriteMorph.prototype.variableBlock = function (varName, isLocalTemplate) {
    var block = new ReporterBlockMorph(false);
    block.selector = 'reportGetVar';
    block.color = this.blockColor.variables;
    block.category = 'variables';
    block.isLocalVarTemplate = isLocalTemplate;
    block.setSpec(varName);
    block.isDraggable = true;
    return block;
};

// SpriteMorph block templates

SpriteMorph.prototype.blockTemplates = function (category) {
    var blocks = [], myself = this, varNames, button,
        cat = category || 'motion', txt,
        inheritedVars = this.inheritedVariableNames();

    function block(selector, isGhosted) {
        if (StageMorph.prototype.hiddenPrimitives[selector]) {
            return null;
        }
        var newBlock = SpriteMorph.prototype.blockForSelector(selector, true);
        newBlock.isTemplate = true;
        if (isGhosted) {newBlock.ghost(); }
        return newBlock;
    }

    function variableBlock(varName, isLocal) {
        var newBlock = SpriteMorph.prototype.variableBlock(varName, isLocal);
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
        var ide;
        if (pair) {
            if (myself.isVariableNameInUse(pair[0], pair[1])) {
                myself.inform('that name is already in use');
            } else {
                ide = myself.parentThatIsA(IDE_Morph);
                myself.addVariable(pair[0], pair[1]);
                myself.toggleVariableWatcher(pair[0], pair[1]);
                ide.flushBlocksCache('variables'); // b/c of inheritance
                ide.refreshPalette();
                ide.recordUnsavedChanges();
            }
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
        blocks.push(block('xPosition', this.inheritsAttribute('x position')));
        blocks.push(watcherToggle('yPosition'));
        blocks.push(block('yPosition', this.inheritsAttribute('y position')));
        blocks.push(watcherToggle('direction'));
        blocks.push(block('direction', this.inheritsAttribute('direction')));
        blocks.push('=');
        blocks.push(this.makeBlockButton(cat));

    } else if (cat === 'looks') {

        blocks.push(block('doSwitchToCostume'));
        blocks.push(block('doWearNextCostume'));
        blocks.push(watcherToggle('getCostumeIdx'));
        blocks.push(block('getCostumeIdx', this.inheritsAttribute('costume #')));
        blocks.push('-');
        blocks.push(block('doSayFor'));
        blocks.push(block('bubble'));
        blocks.push(block('doThinkFor'));
        blocks.push(block('doThink'));
        blocks.push('-');
        blocks.push(block('reportGetImageAttribute'));
        blocks.push(block('reportNewCostumeStretched'));
        blocks.push(block('reportNewCostume'));
        blocks.push('-');
        blocks.push(block('changeEffect'));
        blocks.push(block('setEffect'));
        blocks.push(block('clearEffects'));
        blocks.push(block('getEffect'));
        blocks.push('-');
        blocks.push(block('changeScale'));
        blocks.push(block('setScale'));
        blocks.push(watcherToggle('getScale'));
        blocks.push(block('getScale', this.inheritsAttribute('size')));
        blocks.push('-');
        blocks.push(block('show'));
        blocks.push(block('hide'));
        blocks.push(watcherToggle('reportShown'));
        blocks.push(block('reportShown', this.inheritsAttribute('shown?')));
        blocks.push('-');
        blocks.push(block('goToLayer'));
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
            blocks.push(block('log'));
            blocks.push(block('alert'));
            blocks.push('-');
            blocks.push(block('doScreenshot'));
        }

    /////////////////////////////////

        blocks.push('=');
        blocks.push(this.makeBlockButton(cat));

    } else if (cat === 'sound') {

        blocks.push(block('playSound'));
        blocks.push(block('doPlaySoundUntilDone'));
        blocks.push(block('doStopAllSounds'));
        blocks.push('-');
        blocks.push(block('doPlaySoundAtRate'));
        blocks.push(block('reportGetSoundAttribute'));
        blocks.push(block('reportNewSoundFromSamples'));
        blocks.push('-');
        blocks.push(block('doRest'));
        blocks.push(block('doPlayNote'));
        blocks.push(block('doSetInstrument'));
        blocks.push('-');
        blocks.push(block('doChangeTempo'));
        blocks.push(block('doSetTempo'));
        blocks.push(watcherToggle('getTempo'));
        blocks.push(block('getTempo'));
        blocks.push('-');
        blocks.push(block('changeVolume'));
        blocks.push(block('setVolume'));
        blocks.push(watcherToggle('getVolume'));
        blocks.push(block('getVolume', this.inheritsAttribute('volume')));
        blocks.push('-');
        blocks.push(block('changePan'));
        blocks.push(block('setPan'));
        blocks.push(watcherToggle('getPan'));
        blocks.push(block('getPan', this.inheritsAttribute('balance')));
        blocks.push('-');
        blocks.push(block('playFreq'));
        blocks.push(block('stopFreq'));

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
            blocks.push(block('doPlayFrequency'));
        }

    /////////////////////////////////

        blocks.push('=');
        blocks.push(this.makeBlockButton(cat));

    } else if (cat === 'pen') {

        blocks.push(block('clear'));
        blocks.push('-');
        blocks.push(block('down'));
        blocks.push(block('up'));
        blocks.push(watcherToggle('getPenDown'));
        blocks.push(block('getPenDown', this.inheritsAttribute('pen down?')));
        blocks.push('-');
        blocks.push(block('setColor'));
        blocks.push(block('changePenHSVA'));
        blocks.push(block('setPenHSVA'));
        blocks.push(block('getPenAttribute'));
        blocks.push('-');
        blocks.push(block('changeSize'));
        blocks.push(block('setSize'));
        blocks.push('-');
        blocks.push(block('doStamp'));
        blocks.push(block('floodFill'));
        blocks.push(block('write'));
        blocks.push('-');
        blocks.push(block('reportPenTrailsAsCostume'));
        blocks.push('-');
        blocks.push(block('doPasteOn'));
        blocks.push(block('doCutFrom'));
        blocks.push('=');
        blocks.push(this.makeBlockButton(cat));

    } else if (cat === 'control') {

        blocks.push(block('receiveGo'));
        blocks.push(block('receiveKey'));
        blocks.push(block('receiveInteraction'));
        blocks.push(block('receiveCondition'));
        blocks.push(block('receiveMessage'));
        blocks.push('-');
        blocks.push(block('doBroadcast'));
        blocks.push(block('doBroadcastAndWait'));
        blocks.push(block('doSend'));
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
        blocks.push(block('doFor'));
        blocks.push('-');
        blocks.push(block('doIf'));
        blocks.push(block('doIfElse'));
        blocks.push(block('reportIfElse'));
        blocks.push('-');
        blocks.push(block('doReport'));
        blocks.push(block('doStopThis'));
        blocks.push('-');
        blocks.push(block('doRun'));
        blocks.push(block('fork'));
        blocks.push(block('evaluate'));
        blocks.push('-');
        blocks.push(block('doTellTo'));
        blocks.push(block('reportAskFor'));
        blocks.push('-');
        blocks.push(block('doCallCC'));
        blocks.push(block('reportCallCC'));
        blocks.push('-');
        blocks.push(block('receiveOnClone'));
        blocks.push(block('createClone'));
        blocks.push(block('newClone'));
        blocks.push(block('removeClone'));
        blocks.push('-');
        blocks.push(block('doPauseAll'));
        blocks.push('=');
        blocks.push(this.makeBlockButton(cat));

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
        blocks.push(block('reportRelationTo'));
        blocks.push(block('reportAspect'));
        blocks.push('-');
        blocks.push(block('doResetTimer'));
        blocks.push(watcherToggle('getTimer'));
        blocks.push(block('getTimer'));
        blocks.push('-');
        blocks.push(block('reportAttributeOf'));

        if (SpriteMorph.prototype.enableFirstClass) {
            blocks.push(block('reportGet'));
        }

        blocks.push(block('reportObject'));
        blocks.push('-');
        blocks.push(block('reportURL'));
        blocks.push(block('reportAudio'));
        blocks.push(block('reportVideo'));
        blocks.push(block('doSetVideoTransparency'));
        blocks.push('-');
        blocks.push(block('reportGlobalFlag'));
        blocks.push(block('doSetGlobalFlag'));
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
            blocks.push(watcherToggle('reportThreadCount'));
            blocks.push(block('reportThreadCount'));
            blocks.push(block('reportStackSize'));
            blocks.push(block('reportFrameCount'));
            blocks.push(block('reportYieldCount'));
        }

	/////////////////////////////////

		blocks.push('=');
        blocks.push(this.makeBlockButton(cat));

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
        blocks.push(block('reportPower'));
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
        blocks.push(block('reportBoolean'));
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

        if (true) { // (Process.prototype.enableJS) {
            blocks.push('-');
            blocks.push(block('reportJSFunction'));
            if (Process.prototype.enableCompiling) {
	            blocks.push(block('reportCompiled'));
            }
        }

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
            blocks.push(block('reportTypeOf'));
            blocks.push(block('reportTextFunction'));
        }

    /////////////////////////////////

        blocks.push('=');
        blocks.push(this.makeBlockButton(cat));

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
                        myself.deleteVariable,
                        null,
                        myself
                    );
                    myself.deletableVariableNames().forEach(name =>
                        menu.addItem(
                            name,
                            name,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            true // verbatim - don't translate
                        )
                    );
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

        varNames = this.reachableGlobalVariableNames(true);
        if (varNames.length > 0) {
            varNames.forEach(name => {
                blocks.push(variableWatcherToggle(name));
                blocks.push(variableBlock(name));
            });
            blocks.push('-');
        }

        varNames = this.allLocalVariableNames(true);
        if (varNames.length > 0) {
            varNames.forEach(name => {
                blocks.push(variableWatcherToggle(name));
                blocks.push(variableBlock(name, true));
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
        blocks.push(block('reportNumbers'));
        blocks.push('-');
        blocks.push(block('reportCONS'));
        blocks.push(block('reportListItem'));
        blocks.push(block('reportCDR'));
        blocks.push('-');
        blocks.push(block('reportListAttribute'));
        blocks.push(block('reportListIndex'));
        blocks.push(block('reportListContainsItem'));
        blocks.push(block('reportListIsEmpty'));
        blocks.push('-');
        blocks.push(block('reportMap'));
        blocks.push(block('reportKeep'));
        blocks.push(block('reportFindFirst'));
        blocks.push(block('reportCombine'));
        blocks.push('-');
        blocks.push(block('doForEach'));
        blocks.push('-');
        blocks.push(block('reportConcatenatedLists'));
        blocks.push(block('reportReshape'));
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
            blocks.push(block('doShowTable'));
        }

    /////////////////////////////////

        blocks.push('=');

        if (StageMorph.prototype.enableCodeMapping) {
            blocks.push(block('doMapCodeOrHeader'));
            blocks.push(block('doMapValueCode'));
            blocks.push(block('doMapListCode'));
            blocks.push('-');
            blocks.push(block('reportMappedCode'));
            blocks.push('=');
        }

        blocks.push(this.makeBlockButton());
 	}
    return blocks;
};

SpriteMorph.prototype.makeBlockButton = function (category) {
	// answer a button that prompts the user to make a new block
    var button = new PushButtonMorph(
        this,
		'makeBlock',
        'Make a block'
    );

    button.userMenu = function () {
        var menu = new MenuMorph(this);
        menu.addItem('help...', 'showHelp');
        return menu;
    };

    button.selector = 'addCustomBlock';
    button.showHelp = BlockMorph.prototype.showHelp;
    return button;
};

SpriteMorph.prototype.makeBlock = function () {
    // prompt the user to make a new block
    var ide = this.parentThatIsA(IDE_Morph),
        stage = this.parentThatIsA(StageMorph),
        category = ide.currentCategory,
        clr = SpriteMorph.prototype.blockColor[category],
        dlg;
    dlg = new BlockDialogMorph(
        null,
        definition => {
            if (definition.spec !== '') {
                if (definition.isGlobal) {
                    stage.globalBlocks.push(definition);
                } else {
                    this.customBlocks.push(definition);
                }
                ide.flushPaletteCache();
                ide.refreshPalette();
                ide.recordUnsavedChanges();
                new BlockEditorMorph(definition, this).popUp();
            }
        },
        this
    );
    if (category !== 'variables') {
        dlg.category = category;
        dlg.categories.children.forEach(each => each.refresh());
        dlg.types.children.forEach(each => {
            each.setColor(clr);
            each.refresh();
        });
    }
    dlg.prompt(
        'Make a block',
        null,
        this.world()
    );
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
        stage = this.parentThatIsA(StageMorph),
        shade = new Color(140, 140, 140),
        searchButton,
        makeButton;

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
    searchButton.edge = 0;
    searchButton.padding = 3;
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
    makeButton.edge = 0;
    makeButton.padding = 3;
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
                        'reportNumbers',
                        'reportCONS',
                        'reportListItem',
                        'reportCDR',
                        'reportListAttribute',
                        'reportListIndex',
                        'reportConcatenatedLists',
                        'reportReshape',
                        'reportListContainsItem',
                        'reportListIsEmpty',
                        'doForEach',
                        'reportMap',
                        'reportKeep',
                        'reportFindFirst',
                        'reportCombine',
                        'doAddToList',
                        'doDeleteFromList',
                        'doInsertInList',
                        'doReplaceInList'
                    ]
            };

        function hasHiddenPrimitives() {
            var defs = SpriteMorph.prototype.blocks,
                hiddens = StageMorph.prototype.hiddenPrimitives;
            return Object.keys(hiddens).some(any =>
                !isNil(defs[any]) &&
                    (defs[any].category === category ||
                        contains((more[category] || []), any))
            );
        }

        function canHidePrimitives() {
            return palette.contents.children.some(any =>
                contains(
                    Object.keys(SpriteMorph.prototype.blocks),
                    any.selector
                )
            );
        }

        menu.addPair(
            [
                new SymbolMorph(
                    'magnifyingGlass',
                    MorphicPreferences.menuFontSize
                ),
                localize('find blocks') + '...'
            ],
            () => this.searchBlocks(),
            '^F'
        );
        if (canHidePrimitives()) {
            menu.addItem(
                'hide primitives',
                function () {
                    var defs = SpriteMorph.prototype.blocks;
                    Object.keys(defs).forEach(sel => {
                        if (defs[sel].category === category) {
                            StageMorph.prototype.hiddenPrimitives[sel] = true;
                        }
                    });
                    (more[category] || []).forEach(sel =>
                        StageMorph.prototype.hiddenPrimitives[sel] = true
                    );
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
                    Object.keys(hiddens).forEach(sel => {
                        if (defs[sel] && (defs[sel].category === category)) {
                            delete StageMorph.prototype.hiddenPrimitives[sel];
                        }
                    });
                    (more[category] || []).forEach(sel =>
                        delete StageMorph.prototype.hiddenPrimitives[sel]
                    );
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

    blocks.forEach(block => {
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
                x = 0;
                y += block.height();
            }
        }
    });

    // global custom blocks:

    if (stage) {
        y += unit * 1.6;

        stage.globalBlocks.forEach(definition => {
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
    this.customBlocks.forEach(definition => {
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

    // inherited custom blocks:

    // y += unit * 1.6;
    if (this.exemplar) {
        this.inheritedBlocks(true).forEach(definition => {
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
                block.ghost();
                x = 0;
                y += block.height();
            }
        });
    }

    //layout

    palette.scrollX(palette.padding);
    palette.scrollY(palette.padding);
    return palette;
};

// SpriteMorph blocks searching

SpriteMorph.prototype.blocksMatching = function (
    searchString,
    strictly,
    types, // optional, ['hat', 'command', 'reporter', 'predicate']
    varNames // optional, list of reachable unique variable names
) {
    // answer an array of block templates whose spec contains
    // the given search string, ordered by descending relevance
    // types is an optional array containing block types the search
    // is limited to, e.g. "command", "hat", "reporter", "predicate".
    // Note that "predicate" is not subsumed by "reporter" and has
    // to be specified explicitly.
    // if no types are specified all blocks are searched
    var blocks = [],
        blocksDict,
        search = searchString.toLowerCase(),
        stage = this.parentThatIsA(StageMorph),
        reporterized;

    if (!types || !types.length) {
        types = ['hat', 'command', 'reporter', 'predicate', 'ring'];
    }
    if (!varNames) {varNames = []; }

    function labelOf(aBlockSpec) {
        var words = (BlockMorph.prototype.parseSpec(aBlockSpec)),
            filtered = words.filter(each =>
                each.indexOf('%') !== 0 || each.length === 1
            ),
            slots = words.filter(each =>
                each.length > 1 && each.indexOf('%') === 0
            ).map(spec => menuOf(spec));
        return filtered.join(' ') + ' ' + slots.join(' ');
    }

    function menuOf(aSlotSpec) {
        var info = BlockMorph.prototype.labelParts[aSlotSpec] || {},
            menu = info.menu;
        if (!menu) {return ''; }
        if (isString(menu)) {
            menu = InputSlotMorph.prototype[menu](true);
        }
        return Object.values(menu).map(entry => {
            if (isNil(entry)) {return ''; }
            if (entry instanceof Array) {
                return localize(entry[0]);
            }
            return entry.toString();
        }).join(' ');
    }

    function fillDigits(anInt, totalDigits, fillChar) {
        var ans = String(anInt);
        while (ans.length < totalDigits) {ans = fillChar + ans; }
        return ans;
    }

    function relevance(aBlockLabel, aSearchString) {
        var lbl = ' ' + aBlockLabel.toLowerCase(),
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

    // variable getters
    varNames.forEach(vName => {
        var rel = relevance(vName, search);
        if (rel !== -1) {
            blocks.push([this.variableBlock(vName), rel + '1']);
        }
    });
    // custom blocks
    [this.customBlocks, stage.globalBlocks].forEach(blocksList =>
        blocksList.forEach(definition => {
            if (contains(types, definition.type)) {
                var spec = definition.localizedSpec(),
                    rel = relevance(labelOf(
                        spec) + ' ' + definition.menuSearchWords(),
                        search
                    );
                if (rel !== -1) {
                    blocks.push([definition.templateInstance(), rel + '2']);
                }
            }
        })
    );
    // primitives
    blocksDict = SpriteMorph.prototype.blocks;
    Object.keys(blocksDict).forEach(selector => {
        if (!StageMorph.prototype.hiddenPrimitives[selector] &&
                contains(types, blocksDict[selector].type)) {
            var block = blocksDict[selector],
                spec = localize(block.alias || block.spec),
                rel = relevance(labelOf(spec), search);
            if (
                (rel !== -1) &&
                    (!block.dev) &&
                    (!block.only || (block.only === this.constructor))
            ) {
                blocks.push([primitive(selector), rel + '3']);
            }
        }
    });
    // infix arithmetic expression
    if (contains(types, 'reporter')) {
        reporterized = this.reporterize(searchString);
        if (reporterized) {
            // reporterized.isTemplate = true;
            // reporterized.isDraggable = false;
            blocks.push([reporterized, '']);
        }
    }
    blocks.sort((x, y) => x[1] < y[1] ? -1 : 1);
    return blocks.map(each => each[0]);
};

SpriteMorph.prototype.searchBlocks = function (
    searchString,
    types,
    varNames,
    scriptFocus
) {
    var myself = this,
        unit = SyntaxElementMorph.prototype.fontSize,
        ide = this.parentThatIsA(IDE_Morph),
        oldSearch = '',
        searchBar = new InputFieldMorph(searchString || ''),
        searchPane = ide.createPalette('forSearch'),
        blocksList = [],
        selection,
        focus;

    function showSelection() {
        if (focus) {focus.destroy(); }
        if (!selection || !scriptFocus) {return; }
        focus = selection.outline(
            MorphicPreferences.isFlat ? new Color(150, 200, 255) : WHITE,
            2
        );
        searchPane.contents.add(focus);
        focus.scrollIntoView();
    }

    function show(blocks) {
        var x = searchPane.contents.left() + 5,
            y = (searchBar.bottom() + unit);
        blocksList = blocks;
        selection = null;
        if (blocks.length && scriptFocus) {
            selection = blocks[0];
        }
        searchPane.contents.children = [searchPane.contents.children[0]];
        blocks.forEach(block => {
            block.setPosition(new Point(x, y));
            searchPane.addContents(block);
            y += block.height();
            y += unit * 0.3;
        });
        showSelection();
        searchPane.changed();
    }

    searchPane.owner = this;
    searchPane.color = this.paletteColor;
    searchPane.contents.color = this.paletteColor;
    searchPane.addContents(searchBar);
    searchBar.setWidth(ide.logo.width() - 30);
    searchBar.contrast = 90;
    searchBar.setPosition(
        searchPane.contents.topLeft().add(new Point(10, 10))
    );
    searchBar.fixLayout();

    searchPane.accept = function () {
        var search;
        if (scriptFocus) {
            searchBar.cancel();
            if (selection) {
                scriptFocus.insertBlock(selection);
            }
            if (ide) {
                ide.recordUnsavedChanges();
            }
        } else {
            search = searchBar.getValue();
            if (search.length > 0) {
                show(myself.blocksMatching(search));
            }
        }
    };

    searchPane.reactToKeystroke = function (evt) {
        var idx, code = evt ? evt.keyCode : 0;
        switch (code) {
        case 38: // up arrow
            if (!scriptFocus || !selection) {return; }
            idx = blocksList.indexOf(selection) - 1;
            if (idx < 0) {
                idx = blocksList.length - 1;
            }
            selection = blocksList[idx];
            showSelection();
            return;
        case 40: // down arrow
            if (!scriptFocus || !selection) {return; }
            idx = blocksList.indexOf(selection) + 1;
            if (idx >= blocksList.length) {
                idx = 0;
            }
            selection = blocksList[idx];
            showSelection();
            return;
        default:
            nop();
        }
    };

    searchPane.reactToInput = function (evt) {
        var search = searchBar.getValue();
        if (search !== oldSearch) {
            oldSearch = search;
            show(myself.blocksMatching(
                search,
                search.length < 2,
                types,
                varNames
            ));
        }
    };

    searchBar.cancel = function () {
        ide.refreshPalette();
        ide.palette.adjustScrollBars();
    };

    ide.fixLayout('refreshPalette');
    searchBar.edit();
    if (searchString) {searchPane.reactToKeystroke(); }
};

// SpritMorph parsing simple arithmetic expressions to reporter blocks

SpriteMorph.prototype.reporterize = function (expressionString) {
    // highly experimental Christmas Easter Egg 2016 :-)
    var ast;

    function parseInfix(expression, operator, already) {
        // very basic diadic infix parser for arithmetic expressions
        // with strict left-to-right operator precedence (as in Smalltalk)
        // which can be overriden by - nested - parentheses.
        // assumes well-formed expressions, no graceful error handling yet.

        var inputs = ['', ''],
            idx = 0,
            ch;

        function format(value) {
            return value instanceof Array || isNaN(+value) ? value : +value;
        }

        function nested() {
            var level = 1,
                expr = '';
            while (idx < expression.length) {
                ch = expression[idx];
                idx += 1;
                switch (ch) {
                case '(':
                    level += 1;
                    break;
                case ')':
                    level -= 1;
                    if (!level) {
                        return expr;
                    }
                    break;
                }
                expr += ch;
            }
        }

        while (idx < expression.length) {
            ch = expression[idx];
            idx += 1;
            switch (ch) {
            case ' ':
                break;
            case '(':
                if (inputs[operator ? 1 : 0].length) {
                    inputs[operator ? 1 : 0] = [
                        inputs[operator ? 1 : 0],
                        parseInfix(nested())
                    ];
                } else {
                    inputs[operator ? 1 : 0] = parseInfix(nested());
                }
                break;
            case '-':
            case '+':
            case '*':
            case '/':
            case '%':
            case '^':
            case '=':
            case '<':
            case '>':
            case '&':
            case '|':
                if (!operator && !inputs[0].length) {
                    inputs[0] = ch;
                } else if (operator) {
                    if (!inputs[1].length) {
                        inputs[1] = ch;
                    } else {
                        return parseInfix(
                            expression.slice(idx),
                            ch,
                            [operator, already, format(inputs[1])]
                        );
                    }
                } else {
                    operator = ch;
                    already = format(inputs[0]);
                }
                break;
            default:
                inputs[operator ? 1 : 0] += ch;
            }
        }
        if (operator) {
            return [operator, already, format(inputs[1])];
        }
        return format(inputs[0]);
    }

    function blockFromAST(ast) {
        var block, selectors, monads, alias, key, sel, i, inps,
            off = 1,
            reverseDict = {};
        selectors = {
            '+': 'reportSum',
            '-': 'reportDifference',
            '*': 'reportProduct',
            '/': 'reportQuotient',
            '%': 'reportModulus',
            '^': 'reportPower',
            '=': 'reportEquals',
            '<': 'reportLessThan',
            '>': 'reportGreaterThan',
            '&': 'reportAnd',
            '|': 'reportOr',
            round: 'reportRound',
            not: 'reportNot'
        };
        monads = ['abs', 'neg', 'ceiling', 'floor', 'sqrt', 'sin', 'cos',
            'tan', 'asin', 'acos', 'atan', 'ln', 'log', 'lg', 'id', 'round',
            'not'];
        alias = {
            ceil: 'ceiling',
            '!' : 'not'
        };
        monads.concat(['true', 'false']).forEach(word =>
            reverseDict[localize(word).toLowerCase()] = word
        );
        key = alias[ast[0]] || reverseDict[ast[0].toLowerCase()] || ast[0];
        if (contains(monads, key)) { // monadic
            sel = selectors[key];
            if (sel) { // single input
                block = SpriteMorph.prototype.blockForSelector(sel);
                inps = block.inputs();
            } else { // two inputs, first is function name
                block = SpriteMorph.prototype.blockForSelector('reportMonadic');
                inps = block.inputs();
                inps[0].setContents([key]);
                off = 0;
            }
        } else { // dyadic
            block = SpriteMorph.prototype.blockForSelector(selectors[key]);
            inps = block.inputs();
        }
        for (i = 1; i < ast.length; i += 1) {
            if (ast[i] instanceof Array) {
                block.replaceInput(inps[i - off], blockFromAST(ast[i]));
            } else if (isString(ast[i])) {
                if (contains(
                    ['true', 'false'], reverseDict[ast[i]] || ast[i])
                ) {
                    block.replaceInput(
                        inps[i - off],
                        SpriteMorph.prototype.blockForSelector(
                            (reverseDict[ast[i]] || ast[i]) === 'true' ?
                                    'reportTrue' : 'reportFalse'
                        )
                    );
                } else if (ast[i] !== '_') {
                    block.replaceInput(
                        inps[i - off],
                        SpriteMorph.prototype.variableBlock(ast[i])
                    );
                }
            } else { // number
                inps[i - off].setContents(ast[i]);
            }
        }
        block.isDraggable = true;
        block.fixLayout();
        block.fixBlockColor(null, true);
        return block;
    }

    if (expressionString.length > 100) {return null; }
    try {
        ast = parseInfix(expressionString);
        return ast instanceof Array ? blockFromAST(ast) : null;
    } catch (error) {
        return null;
    }
};

// SpriteMorph variable management

SpriteMorph.prototype.addVariable = function (name, isGlobal) {
    var ide = this.parentThatIsA(IDE_Morph);
    if (isGlobal) {
        this.globalVariables().addVar(name);
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
    if (!contains(this.inheritedVariableNames(true), varName)) {
        // check only shadowed variables
        this.deleteVariableWatcher(varName);
    }
    this.variables.deleteVar(varName);
    if (ide) {
        ide.flushBlocksCache('variables'); // b/c the var could be global
        ide.refreshPalette();
        ide.recordUnsavedChanges();
    }
};

// SpriteMorph costume management

SpriteMorph.prototype.addCostume = function (costume) {
    if (!costume.name) {
        costume.name = 'costume' + (this.costumes.length() + 1);
    }
    this.shadowAttribute('costumes');
    this.costumes.add(costume);
};

SpriteMorph.prototype.wearCostume = function (costume, noShadow) {
    var x = this.xPosition ? this.xPosition() : null,
        y = this.yPosition ? this.yPosition() : null,
        idx = isNil(costume) ? null : this.costumes.asArray().indexOf(costume);

    this.changed();
    this.costume = costume;
    this.fixLayout();
    this.rerender();
    if (x !== null) {
        this.silentGotoXY(x, y, true); // just me
    }
    if (this.positionTalkBubble) { // the stage doesn't talk
        this.positionTalkBubble();
    }
    this.version = Date.now();

    // propagate to children that inherit my costume #
    if (!noShadow) {
        this.shadowAttribute('costume #');
    }
    this.specimens().forEach(instance => {
        if (instance.cachedPropagation) {
            if (instance.inheritsAttribute('costume #')) {
                if (idx === null) {
                    instance.wearCostume(null, true);
                } else if (idx === -1) {
                    instance.wearCostume(costume, true);
                } else {
                    instance.doSwitchToCostume(idx + 1, true);
                }
            }
        }
    });
};

SpriteMorph.prototype.getCostumeIdx = function () {
    if (this.inheritsAttribute('costume #')) {
        return this.exemplar.getCostumeIdx();
    }
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

SpriteMorph.prototype.doSwitchToCostume = function (id, noShadow) {
    var w = 0, h = 0;
    if (id instanceof List) { // try to turn a list of pixels into a costume
        if (this.costume) {
            // recycle dimensions of current costume
            w = this.costume.width();
            h = this.costume.height();
        }
        if (w * h !== id.length()) {
            // assume stage's dimensions
            w = StageMorph.prototype.dimensions.x;
            h = StageMorph.prototype.dimensions.y;
        }
        id = Process.prototype.reportNewCostume(
            id,
            w,
            h,
            this.newCostumeName(localize('snap'))
        );
    }
    if (id instanceof Costume) { // allow first-class costumes
        this.wearCostume(id, noShadow);
        return;
    }
    if (id instanceof Array && (id[0] === 'current')) {
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
        costume = detect(arr, cst => cst.name === id);
        if (costume === null) {
            num = parseFloat(id);
            if (num === 0) {
                costume = null;
            } else {
                costume = arr[num - 1] || null;
            }
        }
    }
    this.wearCostume(costume, noShadow);
};

SpriteMorph.prototype.reportCostumes = function () {
    return this.costumes;
};

// SpriteMorph sound management

SpriteMorph.prototype.addSound = function (audio, name) {
    var sound = new Sound(audio, name);
    this.shadowAttribute('sounds');
    this.sounds.add(sound);
    return sound;
};

SpriteMorph.prototype.doPlaySound = function (name) {
    var stage = this.parentThatIsA(StageMorph),
        sound = name instanceof Sound ? name
            : (typeof name === 'number' ? this.sounds.at(name)
                : detect(
                    this.sounds.asArray(),
                    s => s.name === name.toString()
            )),
        ctx = this.audioContext(),
        gain =  this.getGainNode(),
        pan = this.getPannerNode(),
        aud,
        source;
    if (sound) {
        aud = document.createElement('audio');
        aud.src = sound.audio.src;
        ctx.resume(); // needed to fix tainted context in case of autoplay
        source = ctx.createMediaElementSource(aud);
        source.connect(gain);
        if (pan) {
            gain.connect(pan);
            pan.connect(ctx.destination); // perhaps redundant
            this.setPan(this.getPan()); // yep, should be redundant
        } else {
            gain.connect(ctx.destination);
        }
        this.setVolume(this.getVolume()); // probably redundant as well
        aud.play();
        if (stage) {
            stage.activeSounds.push(aud);
            stage.activeSounds = stage.activeSounds.filter(snd =>
                !snd.ended && !snd.terminated
            );
        }
        return aud;
    }
};

SpriteMorph.prototype.reportSounds = function () {
    return this.sounds;
};

// SpriteMorph volume

SpriteMorph.prototype.setVolume = function (num, noShadow) {
    this.volume = Math.max(Math.min(+num || 0, 100), 0);
    this.getGainNode().gain.setValueAtTime(
        1 / Math.pow(10, Math.log2(100 / this.volume)),
        this.audioContext().currentTime
    );
    if (this instanceof StageMorph) {
        return;
    }
    // propagate to children that inherit my volume
    if (!noShadow) {
        this.shadowAttribute('volume');
    }
    this.instances.forEach(instance => {
        if (instance.cachedPropagation) {
            if (instance.inheritsAttribute('volume')) {
                instance.setVolume(num, true);
            }
        }
    });
};

SpriteMorph.prototype.changeVolume = function (delta) {
    this.setVolume(this.getVolume() + (+delta || 0));
};

SpriteMorph.prototype.getVolume = function () {
    if (this.inheritsAttribute('volume')) {
        return this.exemplar.getVolume();
    }
    return this.volume;
};

SpriteMorph.prototype.getGainNode = function () {
    if (!this.gainNode) {
        this.gainNode = this.audioContext().createGain();
    }
    return this.gainNode;
};

SpriteMorph.prototype.audioContext = function () {
    return Note.prototype.getAudioContext();
};

// SpriteMorph stero panning

SpriteMorph.prototype.setPan = function (num, noShadow) {
    var panner = this.getPannerNode();
    if (!panner) {return; }
    this.pan = Math.max(Math.min((+num || 0), 100), -100);
    panner.pan.setValueAtTime(
        this.pan / 100,
        this.audioContext().currentTime
    );
    if (this instanceof StageMorph) {
        return;
    }
    // propagate to children that inherit my balance
    if (!noShadow) {
        this.shadowAttribute('balance');
    }
    this.instances.forEach(instance => {
        if (instance.cachedPropagation) {
            if (instance.inheritsAttribute('balance')) {
                instance.setPan(num, true);
            }
        }
    });
};

SpriteMorph.prototype.changePan = function (delta) {
    this.setPan(this.getPan() + (+delta || 0));
};

SpriteMorph.prototype.getPan = function () {
    if (this.inheritsAttribute('balance')) {
        return this.exemplar.getPan();
    }
    return this.pan;
};

SpriteMorph.prototype.getPannerNode = function () {
    var ctx;
    if (!this.pannerNode) {
        ctx = this.audioContext();
        if (ctx.createStereoPanner) {
            this.pannerNode = this.audioContext().createStereoPanner();
        }
    }
    return this.pannerNode;
};

// SpriteMorph frequency player

SpriteMorph.prototype.playFreq = function (hz) {
    // start playing the given frequency until stopped
    var note,
        ctx = this.audioContext(),
        gain = this.getGainNode(),
        pan = this.getPannerNode(),
        stage = this.parentThatIsA(StageMorph);
    if (!this.freqPlayer) {
        this.freqPlayer = new Note();
    }
    note = this.freqPlayer;
    note.fader = ctx.createGain();
    if (note.oscillator) {
        note.oscillator.frequency.value = hz;
    } else {
        note.oscillator = ctx.createOscillator();
        if (!note.oscillator.start) {
            note.oscillator.start = note.oscillator.noteOn;
        }
        if (!note.oscillator.stop) {
            note.oscillator.stop = note.oscillator.noteOff;
        }
        note.setInstrument(this.instrument);
        note.oscillator.frequency.value = hz;
        this.setVolume(this.getVolume());
        note.oscillator.connect(note.fader);
        note.fader.connect(gain);
        if (pan) {
            gain.connect(pan);
            pan.connect(ctx.destination);
            this.setPan(this.pan);
        } else {
            gain.connect(ctx.destination);
        }
        note.ended = false;
        if (stage) {
            stage.activeSounds.push(note);
            stage.activeSounds = stage.activeSounds.filter(snd =>
                !snd.ended && !snd.terminated
            );
        }
        note.fader.gain.setValueCurveAtTime(
            note.fadeIn,
            ctx.currentTime,
            note.fadeTime
        );
        note.oscillator.start(0);
    }
};

SpriteMorph.prototype.stopFreq = function () {
    if (this.freqPlayer) {
        this.freqPlayer.stop();
    }
};

// SpriteMorph user menu

SpriteMorph.prototype.userMenu = function () {
    var ide = this.parentThatIsA(IDE_Morph),
        menu = new MenuMorph(this),
        allParts,
        anchors;

    if (ide && ide.isAppMode) {
        // menu.addItem('help', 'nop');
        return menu;
    }
    if (!this.isTemporary) {
        menu.addItem("duplicate", 'duplicate');
        if (StageMorph.prototype.enableInheritance) {
            menu.addItem("clone", 'instantiate');
            menu.addLine();
        }
    }
    menu.addItem("delete", 'remove');
    menu.addItem("move", 'moveCenter');
    menu.addItem("rotate", 'setRotation');
    if (this.costume) {
        menu.addItem(
            "pivot",
            'moveRotationCenter',
            'edit the costume\'s\nrotation center'
        );
    }
    if (this.isTemporary) {
        if (StageMorph.prototype.enableInheritance) {
            menu.addItem(
                "edit",
                'perpetuateAndEdit',
                'make permanent and\nshow in the sprite corral'
            );
        }
    } else {
        menu.addItem("edit", 'edit');
    }
    menu.addLine();
    if (this.anchor) {
        menu.addItem(
            localize('detach from') + ' ' + this.anchor.name,
            'detachFromAnchor'
        );
    } else {
        allParts = this.allParts();
        anchors = this.parent.children.filter(morph =>
            morph instanceof SpriteMorph && !contains(allParts, morph)
        );
        if (anchors.length) {
            menu.addMenu('stick to', this.anchorsMenu(anchors));
        }
    }
    if (this.parts.length) {
        menu.addItem('detach all parts', 'detachAllParts');
    }
    menu.addItem("export...", 'exportSprite');
    return menu;
};

SpriteMorph.prototype.anchorsMenu = function (targets) {
    var menu = new MenuMorph(this.attachTo, null, this);
    targets.forEach(sprite =>
        menu.addItem(
            [
                sprite.thumbnail(new Point(24, 24)),
                sprite.name,
            ],
            sprite
        )
    );
    return menu;
};

SpriteMorph.prototype.exportSprite = function () {
    if (this.isTemporary) {return; }
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

SpriteMorph.prototype.instantiate = function () {
    var ide = this.parentThatIsA(IDE_Morph);
    if (ide) {
        ide.instantiateSprite(this);
    }
};

SpriteMorph.prototype.remove = function () {
    var ide = this.parentThatIsA(IDE_Morph);
    if (ide) {
        ide.removeSprite(this);
    }
};

// SpriteMorph cloning

/*
    clones are temporary, partially shallow copies of sprites that don't
    appear as icons in the corral. Clones get deleted when the red stop button
    is pressed. Shallow-copying clones' scripts and costumes makes spawning
    very fast, so they can be used for particle system simulations.
    This speed-up, however, comes at the cost of some detrimental side
    effects: Changes to a costume or a script of the original sprite are
    in some cases shared with all of its clones, however such shared changes
    are hard to predict for users and not actively propagated, so they don't
    offer any reliable feature, and will not be supported as such.
    Changes to the original sprite's scripts affect all of its clones, unless
    the script contains any custom block whose definition contains one or more
    block variables (in which case the script does get deep-copied).
    The original sprite's scripting area, costumes wardrobe or sounds jukebox
    are also not shared. therefore adding or deleting a script, sound or
    costume in the original sprite has no effect on any of its clones.
*/

SpriteMorph.prototype.createClone = function (immediately) {
    var stage = this.parentThatIsA(StageMorph),
        clone;
    if (stage && stage.cloneCount <= 5000) {
        clone = this.fullCopy(true);
        clone.clonify(stage, immediately);
    }
    return clone;
};

SpriteMorph.prototype.newClone = function (immediately) {
    var clone = this.createClone(immediately);
    if (isNil(clone)) {
        throw new Error('exceeding maximum number of clones');
    }
    return clone;
};

SpriteMorph.prototype.clonify = function (stage, immediately) {
    var hats;
    this.parts.forEach(part => part.clonify(stage));
    stage.cloneCount += 1;
    this.cloneOriginName = this.isTemporary ?
            this.cloneOriginName : this.name;
    this.isTemporary = true;
    this.name = '';
    stage.add(this);
    hats = this.allHatBlocksFor('__clone__init__');
    hats.forEach(block =>
        stage.threads.startProcess(
            block,
            this,
            stage.isThreadSafe,
            null, // export result
            null, // callback
            null, // is clicked
            immediately // without yielding
        )
    );
    this.endWarp();
};

SpriteMorph.prototype.initClone = function (hats) {
    // used when manually instantiating a sprite in the IDE
    var stage = this.parentThatIsA(StageMorph);
    if (stage) {
        hats.forEach(block =>
            stage.threads.startProcess(
                block,
                this,
                stage.isThreadSafe
            )
        );
        this.endWarp();
    }
};

SpriteMorph.prototype.removeClone = function () {
    var exemplar = this.exemplar;
    if (this.isTemporary) {
        // this.stopTalking();
        this.parent.threads.stopAllForReceiver(this);
        this.parts.slice().forEach(part => {
        	this.detachPart(part);
            part.removeClone();
        });
        this.corpsify();
        this.instances.forEach(child => {
            if (child.isTemporary) {
                child.setExemplar(exemplar);
            }
        });
        this.destroy();
        this.parent.cloneCount -= 1;
    }
};

SpriteMorph.prototype.perpetuate = function () {
    // make a temporary sprite (clone) permanent
    var stage = this.parentThatIsA(StageMorph),
        ide = this.parentThatIsA(IDE_Morph);

	// make sure my exemplar-chain is fully perpetuated
    if (this.exemplar) {
        this.exemplar.perpetuate();
    }
    if (!this.isTemporary || !stage || !ide) {
        return;
    }
    this.isTemporary = false;
    this.name = ide.newSpriteName(this.cloneOriginName);
    this.cloneOriginName = '';
    stage.cloneCount -= 1;
    ide.corral.addSprite(this);
    ide.sprites.add(this);
    this.parts.forEach(part => part.perpetuate());
};

SpriteMorph.prototype.perpetuateAndEdit = function () {
    var ide = this.parentThatIsA(IDE_Morph);
    if (ide) {
        this.perpetuate();
        ide.selectSprite(this);
        ide.recordUnsavedChanges();
    }
};

SpriteMorph.prototype.release = function () {
    // turn a permenent sprite that's an instance of another one
    // into a temporary one (clone), that will vanish either when
    // the "delete this clone" operation is executed or when the user
    // hits the red stop sign button in the IDE
    var stage = this.parentThatIsA(StageMorph),
        ide = this.parentThatIsA(IDE_Morph),
        idx;

    if (this.isTemporary || !this.exemplar || !stage || !ide) {
        return;
    }

	// make sure all parts and instances are also released
    this.parts.forEach(part => part.release());
    this.instances.forEach(inst => inst.release());
    this.isTemporary = true;
    this.name = '';
    this.cloneOriginName = this.exemplar.name;
    stage.cloneCount += 1;
    idx = ide.sprites.asArray().indexOf(this) + 1;
    stage.watchers().forEach(watcher => {
        if (watcher.object() === this) {
            watcher.destroy();
        }
    });
    if (idx > 0) {
        ide.sprites.remove(idx);
    }
    ide.createCorral();
    ide.fixLayout();
    if (ide.currentSprite === this) {
        ide.currentSprite = detect(
            stage.children,
            morph => morph instanceof SpriteMorph && !morph.isTemporary
        ) || this.stage;
    }
    ide.selectSprite(ide.currentSprite);
    if (ide.isAppMode) {
        ide.toggleAppMode(true);
    }
};

// SpriteMorph deleting

SpriteMorph.prototype.corpsify = function () {
    this.isCorpse = true;
    this.version = Date.now();
};

// SpriteMorph primitives

// SpriteMorph hiding and showing:

/*
    override the inherited behavior to also hide/show all
    nested parts.
*/

SpriteMorph.prototype.show = function () {
    this.setVisibility(true);
};

SpriteMorph.prototype.hide = function () {
    this.setVisibility(false);
};

SpriteMorph.prototype.setVisibility = function (bool, noShadow) {
    var bubble = this.talkBubble();

    if (bool) {
        SpriteMorph.uber.show.call(this);
    } else {
        SpriteMorph.uber.hide.call(this);
    }

    // propagate to speech bubble, if any
    if (bubble) {
        if (bool) {
            bubble.show();
        } else {
            bubble.hide();
        }
    }

    // progagate to parts
    this.parts.forEach(part => part.setVisibility(bool));

    // propagate to children that inherit my visibility
    if (!noShadow) {
        this.shadowAttribute('shown?');
    }
    this.instances.forEach(instance => {
        if (instance.cachedPropagation) {
            if (instance.inheritsAttribute('shown?')) {
                instance.setVisibility(bool, true);
            }
        }
    });
};

SpriteMorph.prototype.reportShown = function () {
    if (this.inheritsAttribute('shown?')) {
        return this.exemplar.reportShown();
    }
    return this.isVisible;
};

// SpriteMorph pen color

SpriteMorph.prototype.setColorComponentHSVA = function (idx, num) {
    var x = this.xPosition(),
        y = this.yPosition(),
        n = +num;

    idx = +idx;
    if (idx < 0 || idx > 3) {return; }
    if (idx == 0) {
        if (n < 0 || n > 100) { // wrap the hue
            n = (n < 0 ? 100 : 0) + n % 100;
        }
    } else {
        n = Math.min(100, Math.max(0, n));
    }
    if (idx === 3) {
        this.color.a = 1 - n / 100;
    } else {
        this.cachedHSV[idx] = n / 100;
        this.color.set_hsv.apply(this.color, this.cachedHSV);
    }
    if (!this.costume) {
        this.rerender();
    }
    this.gotoXY(x, y);
};

SpriteMorph.prototype.getColorComponentHSLA = function (idx) {
    idx = +idx;
    if (idx === 3) {
        return (1 - this.color.a) * 100;
    }
    return (this.cachedHSV[idx] || 0) * 100;
};

SpriteMorph.prototype.changeColorComponentHSVA = function (idx, delta) {
    this.setColorComponentHSVA(
        idx,
        this.getColorComponentHSLA(idx) + (+delta || 0)
    );
};

SpriteMorph.prototype.setColor = function (aColor) {
    var x = this.xPosition(),
        y = this.yPosition();
    if (!this.color.eq(aColor, true)) { // observeAlpha
        this.color = aColor.copy();
        if (!this.costume) {
            this.rerender();
            this.silentGotoXY(x, y);
        }
        this.cachedHSV = this.color.hsv();
    }
};

SpriteMorph.prototype.setBackgroundColor = SpriteMorph.prototype.setColor;

SpriteMorph.prototype.getPenAttribute = function (attrib) {
    var name = attrib instanceof Array ? attrib[0] : attrib.toString(),
        options = ['hue', 'saturation', 'brightness', 'transparency'];
    if (name === 'size') {
        return this.size || 0;
    }
    return this.getColorComponentHSLA(options.indexOf(name));
};

// SpriteMorph layers

SpriteMorph.prototype.comeToFront = function () {
    if (this.parent) {
        this.parent.add(this);
        this.changed();
    }
};

SpriteMorph.prototype.goToBack = function () {
    if (this.parent) {
        this.parent.addBack(this);
        this.changed();
    }
};

SpriteMorph.prototype.goBack = function (layers) {
    var layer,
        newLayer = +layers,
        targetLayer;

    if (!this.parent) {return null; }
    layer = this.parent.children.indexOf(this);
    this.parent.removeChild(this);
    targetLayer = Math.max(layer - newLayer, 0);
    this.parent.children.splice(targetLayer, null, this);
    this.parent.changed();
};

// SpriteMorph collision detection

// attempted optimized collision detection using video buffer
// turns out it's actually slower to partially enumerate 2 sets of pixels
// than to create a new masked canvas.
// commented out and kept for reference

/*
SpriteMorph.prototype.isTouching = function (other) {
    var stage = this.parentThatIsA(StageMorph),
        inter, off, src, trg, sw, tw, x, y;

    function isOpaque(imageData, width, x, y) {
        return (imageData[y * width + x] && 0x000000FF) > 0; // alpha
    }

    if (!(other instanceof SpriteMorph)) {
        return SpriteMorph.uber.isTouching.call(this, other);
    }

    // determine the intersection of both bounding boxes
    // unscaled and translated to local coordinates

    inter = this.bounds.intersect(other.bounds).translateBy(
        this.position().neg()
    ).scaleBy(1 / stage.scale); // .floor(); ?

    if (inter.width() < 1 || inter.height() < 1) {
        return false;
    }

    off = this.position().subtract(
        other.position()
    ).scaleBy(1 / stage.scale).floor();

    src = this.getImageData();
    sw = Math.floor(this.width() / stage.scale);
    trg = other.getImageData();
    tw = Math.floor(other.width() / stage.scale);

    for (y = inter.origin.y; y <= inter.corner.y; y += 1) {
        for (x = inter.origin.x; x <= inter.corner.x; x += 1) {
            if (isOpaque(src, sw, x, y) &&
                    isOpaque(trg, tw, x + off.x, y + off.y)) {
                return true;
            }
        }
    }
    return false;
};
*/

SpriteMorph.prototype.reportTouchingColor = function (aColor) {
    var stage = this.parentThatIsA(StageMorph),
        data, len, i;

    if (stage) {
        data = this.overlappingPixels(stage);
        if (!data) {return false; }
        len = data[0].length;
        for (i = 3; i < len; i += 4) {
            if (data[0][i] && data[1][i]) {
                if (
                    data[1][i - 3] === aColor.r &&
                    data[1][i - 2] === aColor.g &&
                    data[1][i - 1] === aColor.b
                ) {
                    return true;
                }
            }
        }
    }
    return false;
};

SpriteMorph.prototype.reportColorIsTouchingColor = function (
    thisColor,
    thatColor
) {
    var stage = this.parentThatIsA(StageMorph),
        data, len, i;

    if (stage) {
        data = this.overlappingPixels(stage);
        if (!data) {return false; }
        len = data[0].length;
        for (i = 3; i < len; i += 4) {
            if (data[0][i] && data[1][i]) {
                if (
                    data[0][i - 3] === thisColor.r &&
                    data[0][i - 2] === thisColor.g &&
                    data[0][i - 1] === thisColor.b &&
                    data[1][i - 3] === thatColor.r &&
                    data[1][i - 2] === thatColor.g &&
                    data[1][i - 1] === thatColor.b
                ) {
                    return true;
                }
            }
        }
    }
    return false;
};

SpriteMorph.prototype.overlappingPixels = function (otherSprite) {
    // overrides method from Morph because Sprites aren't nested Morphs
    // the same applies for speech balloons, where it's enough to
    // test the encompassing shape only
    var oRect = this.bounds.intersect(otherSprite.bounds),
        thisImg = this.getImage(),
        thatImg = otherSprite.getImage();

    if (otherSprite instanceof StageMorph) {
        // only check for color collision
        thatImg = otherSprite.fancyThumbnail(otherSprite.extent(), this, true);
    }
    if (oRect.width() < 1 || oRect.height() < 1 || !thisImg || !thatImg ||
        !thisImg.width || !thisImg.height || !thatImg.width || !thatImg.height
    ) {
        return false;
    }
    if (thisImg.isRetinaEnabled !== thatImg.isRetinaEnabled) {
        thisImg = normalizeCanvas(thisImg, true);
        thatImg = normalizeCanvas(thatImg, true);
    }
    return [
        thisImg.getContext("2d").getImageData(
            oRect.left() - this.left(),
            oRect.top() - this.top(),
            oRect.width(),
            oRect.height()
        ).data,
        thatImg.getContext("2d").getImageData(
            oRect.left() - otherSprite.left(),
            oRect.top() - otherSprite.top(),
            oRect.width(),
            oRect.height()
        ).data
    ];
};

// SpriteMorph neighbor detection

SpriteMorph.prototype.neighbors = function (aStage) {
    var stage = aStage || this.parentThatIsA(StageMorph),
        myPerimeter = this.perimeter(stage);
    return new List(
        stage.children.filter(each => {
            var eachPerimeter,
                distance;
            if (each instanceof SpriteMorph &&
                each.isVisible &&
                (each !== this)
            ) {
                eachPerimeter = each.perimeter(stage);
                distance = myPerimeter.center.distanceTo(eachPerimeter.center);
                return (distance - myPerimeter.radius - eachPerimeter.radius)
                    < 0;
            }
            return false;
        })
    );
};

SpriteMorph.prototype.perimeter = function (aStage) {
    var stage = aStage || this.parentThatIsA(StageMorph),
        stageScale = this instanceof StageMorph ? 1 : stage.scale,
        radius;
    if (this.costume) {
        radius = Math.max(
            this.costume.width(),
            this.costume.height()
        ) * this.scale * stageScale;
    } else {
        radius = Math.max(this.width(), this.height());
    }
    return {
        center: this.center(), // geometric center rather than position
        radius: radius
    };
};

// SpriteMorph pen ops

SpriteMorph.prototype.doStamp = function () {
    var stage = this.parent,
        ctx = stage.penTrails().getContext('2d'),
        img = this.getImage();

    if (img.width < 1 || (img.height < 1)) {
        // too small to draw
        return;
    }
    ctx.save();
    ctx.scale(1 / stage.scale, 1 / stage.scale);
    ctx.globalAlpha = this.alpha;
    ctx.drawImage(
        img,
        this.left() - stage.left(),
        this.top() - stage.top()
    );
    ctx.restore();
    this.changed();
    stage.cachedPenTrailsMorph = null;
};

SpriteMorph.prototype.clear = function () {
    this.parent.clearPenTrails();
};

SpriteMorph.prototype.write = function (text, size) {
    // thanks to Michael Ball for contributing this code!
    if (typeof text !== 'string' && typeof text !== 'number') {
        throw new Error(
            'LABEL can only draw text or numbers, not a ' +
            typeof text
        );
    }

    var stage = this.parentThatIsA(StageMorph),
        context = stage.penTrails().getContext('2d'),
        rotation = radians(this.direction() - 90),
        trans = new Point(
            this.rotationCenter().x - stage.left(),
            this.rotationCenter().y - stage.top()
        ),
        len,
        pos;

    context.save();
    context.font = size + 'px monospace';
    context.textAlign = 'left';
    context.textBaseline = 'alphabetic';
    context.fillStyle = this.color.toString();
    len = context.measureText(text).width;
    trans = trans.multiplyBy(1 / stage.scale);
    context.translate(trans.x, trans.y);
    context.rotate(rotation);
    context.fillText(text, 0, 0);
    context.translate(-trans.x, -trans.y);
    context.restore();
    pos = new Point(
        len * Math.sin(radians(this.direction())),
        len * Math.cos(radians(this.direction()))
    );
    pos = pos.add(new Point(this.xPosition(), this.yPosition()));
    this.gotoXY(pos.x, pos.y, false);
    this.changed();
    stage.changed();
};

SpriteMorph.prototype.setSize = function (size) {
    // pen size
    if (!isNaN(size)) {
        this.size = Math.min(Math.max(+size, 0.0001), 1000);
    }
};

SpriteMorph.prototype.changeSize = function (delta) {
    this.setSize(this.size + (+delta || 0));
};

// SpriteMorph printing on another sprite:

SpriteMorph.prototype.blitOn = function (target, mask = 'source-atop') {
    // draw my costume onto a copy of the target's costume scaled and rotated
    // so it appears as though I'm "stamped" onto it.

    var sourceHeading = (this.rotationStyle === 1) ? this.heading : 90,
        targetHeading = (target.rotationStyle === 1) ? target.heading : 90,
        sourceCostume, targetCostume, ctx,
        relRot, relScale, stageScale,
        centerDist, centerDelta, centerAngleRadians, center,
        originDist, originAngleRadians,
        spriteCenter, thisCenter, relPos, pos;

    // prevent pasting an object onto itself
    if (this === target) {return; }

    // check if both source and target have costumes,
    // rasterize copy of target costume if it's an SVG
    if (this.costume && target.costume) {
        sourceCostume = this.costume;
        if (sourceCostume instanceof SVG_Costume) {
            sourceCostume = sourceCostume.rasterized();
        }
        if (target.costume instanceof SVG_Costume) {
            targetCostume = target.costume.rasterized();
        } else {
            targetCostume = target.costume.copy();
        }
    } else {
        return;
    }

    // do the math:
    if (target instanceof SpriteMorph) {
        if (this instanceof SpriteMorph) {
            // stamp a sprite on a sprite:
            relRot = sourceHeading - targetHeading;
            relScale = this.scale / target.scale;
            stageScale = this.parentThatIsA(StageMorph).scale;
            centerDist = target.center().distanceTo(this.center());
            centerDelta = this.center().subtract(target.center());
            centerAngleRadians = Math.atan2(centerDelta.y, centerDelta.x);
            center = new Point(
                    sourceCostume.width(),
                    sourceCostume.height()
                ).multiplyBy(0.5 * this.scale * stageScale);
            originDist = center.distanceTo(ZERO);
            originAngleRadians = Math.atan2(center.y, center.x);
            spriteCenter = new Point(
                    target.costume.width(),
                    target.costume.height()
                ).multiplyBy(0.5 * target.scale * stageScale)
                .rotateBy(radians(relRot));
            thisCenter = spriteCenter.distanceAngle(
                    centerDist,
                    degrees(centerAngleRadians) - sourceHeading + 180
                );
            relPos = thisCenter.distanceAngle(
                    originDist,
                    degrees(originAngleRadians) -90
                );
            pos = relPos.divideBy(stageScale)
                .divideBy(relScale)
                .divideBy(target.scale);
        } else { // if the stage is the source
            // stamp the stage on a sprite:
            relRot = 90 - targetHeading;
            relScale = 1 / target.scale;
            centerDist = target.center().distanceTo(this.position());
            centerDelta = this.position().subtract(target.center());
            centerAngleRadians = Math.atan2(centerDelta.y, centerDelta.x);
            center = new Point(
                    target.costume.width(),
                    target.costume.height()
                ).multiplyBy(0.5 * target.scale)
                .rotateBy(radians(90 - targetHeading));
            pos = center.distanceAngle(
                    centerDist / this.scale,
                    degrees(centerAngleRadians) + 90
                );
        }
    } else { // if the stage is the target
        // stamp a sprite on the stage:
        relRot = sourceHeading - 90;
        relScale = this.scale;
        center = this.center().subtract(target.position())
                .divideBy(this.scale * target.scale)
                .rotateBy(radians(sourceHeading - 90));
        pos = center.subtract(
                new Point(
                    sourceCostume.width(),
                    sourceCostume.height()
                ).multiplyBy(0.5)
            );
    }

    // draw my costume onto the target's costume copy:
    ctx = targetCostume.contents.getContext('2d');
    ctx.rotate(radians(relRot));
    ctx.scale(relScale, relScale);
    ctx.globalCompositeOperation = mask;
    ctx.drawImage(sourceCostume.contents, pos.x, pos.y);

    // make the target wear the new costume
    target.doSwitchToCostume(targetCostume);
};

// SpriteMorph pen up and down:

SpriteMorph.prototype.down = function () {
    this.setPenDown(true);
};

SpriteMorph.prototype.up = function () {
    this.setPenDown(false);
};

SpriteMorph.prototype.setPenDown = function (bool, noShadow) {
    if (bool) {
        SpriteMorph.uber.down.call(this);
    } else {
        SpriteMorph.uber.up.call(this);
    }

    // propagate to children that inherit my visibility
    if (!noShadow) {
        this.shadowAttribute('pen down?');
    }
    this.instances.forEach(instance => {
        if (instance.cachedPropagation) {
            if (instance.inheritsAttribute('pen down?')) {
                instance.setPenDown(bool, true);
            }
        }
    });
};

SpriteMorph.prototype.getPenDown = function () {
    if (this.inheritsAttribute('pen down?')) {
        return this.exemplar.getPenDown();
    }
    return this.isDown;
};

// SpriteMorph scale

SpriteMorph.prototype.getScale = function () {
    // answer my scale in percent
    if (this.inheritsAttribute('size')) {
        return this.exemplar.getScale();
    }
    return this.scale * 100;
};

SpriteMorph.prototype.setScale = function (percentage, noShadow) {
    // set my (absolute) scale in percent
    var x = this.xPosition(),
        y = this.yPosition(),
        realScale,
        growth;

    realScale = (+percentage || 0) / 100;
    growth = realScale / this.nestingScale;
    this.nestingScale = realScale;
    this.scale = Math.max(realScale, 0.01);

    // apply to myself
    this.changed();
    this.fixLayout();
    this.rerender();

    this.silentGotoXY(x, y, true); // just me
    this.positionTalkBubble();

    // propagate to nested parts
    this.parts.forEach(part => {
        var xDist = part.xPosition() - x,
            yDist = part.yPosition() - y;
        part.setScale(part.scale * 100 * growth);
        part.silentGotoXY(
            x + (xDist * growth),
            y + (yDist * growth)
        );
    });

    // propagate to children that inherit my scale
    if (!noShadow) {
        this.shadowAttribute('size');
    }
    this.instances.forEach(instance => {
        if (instance.cachedPropagation) {
            if (instance.inheritsAttribute('size')) {
                instance.setScale(percentage, true);
            }
        }
    });
};

SpriteMorph.prototype.changeScale = function (delta) {
    this.setScale(this.getScale() + (+delta || 0));
};

// Spritemorph graphic effects

SpriteMorph.prototype.graphicsChanged = function () {
    return Object.keys(this.graphicsValues).some(any =>
        this.graphicsValues[any] < 0 ||
            this.graphicsValues[any] > 0
    );
};

SpriteMorph.prototype.applyGraphicsEffects = function (canvas) {
  // For every effect: apply transform of that effect(canvas, stored value)
  // Graphic effects from Scratch are heavily based on ScratchPlugin.c

    var ctx, imagedata, w, h;

    function transform_fisheye(imagedata, value) {
        var pixels, newImageData, newPixels, centerX, centerY,
            w, h, x, y, dx, dy, r, angle, srcX, srcY, i, srcI;

        w = imagedata.width;
        h = imagedata.height;
        pixels = imagedata.data;
        newImageData = ctx.createImageData(w, h);
        newPixels = newImageData.data;

        centerX = w / 2;
        centerY = h / 2;
        value = Math.max(0, (value + 100) / 100);
        for (y = 0; y < h; y++) {
            for (x = 0; x < w; x++) {
                dx = (x - centerX) / centerX;
                dy = (y - centerY) / centerY;
                r = Math.pow(Math.sqrt(dx * dx + dy * dy), value);
                if (r <= 1) {
                    angle = Math.atan2(dy, dx);
                    srcX = Math.floor(
                        centerX + (r * Math.cos(angle) * centerX)
                    );
                    srcY = Math.floor(
                        centerY + (r * Math.sin(angle) * centerY)
                    );
                } else {
                    srcX = x;
                    srcY = y;
                }
                i = (y * w + x) * 4;
                srcI = (srcY * w + srcX) * 4;
                newPixels[i] = pixels[srcI];
                newPixels[i + 1] = pixels[srcI + 1];
                newPixels[i + 2] = pixels[srcI + 2];
                newPixels[i + 3] = pixels[srcI + 3];
            }
        }
        return newImageData;
    }

    function transform_whirl(imagedata, value) {
        var pixels, newImageData, newPixels, w, h, centerX, centerY,
            x, y, radius, scaleX, scaleY, whirlRadians, radiusSquared,
            dx, dy, d, factor, angle, srcX, srcY, i, srcI, sina, cosa;

        w = imagedata.width;
        h = imagedata.height;
        pixels = imagedata.data;
        newImageData = ctx.createImageData(w, h);
        newPixels = newImageData.data;

        centerX = w / 2;
        centerY = h / 2;
        radius = Math.min(centerX, centerY);
        if (w < h) {
            scaleX = h / w;
            scaleY = 1;
        } else {
            scaleX = 1;
            scaleY = w / h;
        }
        whirlRadians = -radians(value);
        radiusSquared = radius * radius;
        for (y = 0; y < h; y++) {
            for (x = 0; x < w; x++) {
                dx = scaleX * (x - centerX);
                dy = scaleY * (y - centerY);
                d = dx * dx + dy * dy;
                if (d < radiusSquared) {
                    factor = 1 - (Math.sqrt(d) / radius);
                    angle = whirlRadians * (factor * factor);
                    sina = Math.sin(angle);
                    cosa = Math.cos(angle);
                    srcX = Math.floor(
                        (cosa * dx - sina * dy) / scaleX + centerX
                    );
                    srcY = Math.floor(
                        (sina * dx + cosa * dy) / scaleY + centerY
                    );
                } else {
                    srcX = x;
                    srcY = y;
                }
                i = (y * w + x) * 4;
                srcI = (srcY * w + srcX) * 4;
                newPixels[i] = pixels[srcI];
                newPixels[i + 1] = pixels[srcI + 1];
                newPixels[i + 2] = pixels[srcI + 2];
                newPixels[i + 3] = pixels[srcI + 3];
            }
        }
        return newImageData;
    }

    function transform_pixelate(imagedata, value) {
        var pixels, newImageData, newPixels, w, h,
            x, y, srcX, srcY, i, srcI;

        w = imagedata.width;
        h = imagedata.height;
        pixels = imagedata.data;
        newImageData = ctx.createImageData(w, h);
        newPixels = newImageData.data;

        value = Math.floor(Math.abs(value / 10) + 1);
        for (y = 0; y < h; y++) {
            for (x = 0; x < w; x++) {
                srcX = Math.floor(x / value) * value;
                srcY = Math.floor(y / value) * value;
                i = (y * w + x) * 4;
                srcI = (srcY * w + srcX) * 4;
                newPixels[i] = pixels[srcI];
                newPixels[i + 1] = pixels[srcI + 1];
                newPixels[i + 2] = pixels[srcI + 2];
                newPixels[i + 3] = pixels[srcI + 3];
            }
        }
        return newImageData;
    }

    function transform_mosaic(imagedata, value) {
        var pixels, i, l, newImageData, newPixels, srcI;
        pixels = imagedata.data;
        newImageData = ctx.createImageData(imagedata.width, imagedata.height);
        newPixels = newImageData.data;

        value = Math.round((Math.abs(value) + 10) / 10);
        value = Math.max(
            0,
            Math.min(value, Math.min(imagedata.width, imagedata.height))
        );
        for (i = 0, l = pixels.length; i < l; i += 4) {
            srcI = i * value % l;
            newPixels[i] = pixels[srcI];
            newPixels[i + 1] = pixels[srcI + 1];
            newPixels[i + 2] = pixels[srcI + 2];
            newPixels[i + 3] = pixels[srcI + 3];
        }
        return newImageData;
    }

    function transform_duplicate(imagedata, value) {
        var pixels, i;
        pixels = imagedata.data;
        for (i = 0; i < pixels.length; i += 4) {
            pixels[i] = pixels[i * value];
            pixels[i + 1] = pixels[i * value + 1];
            pixels[i + 2] = pixels[i * value + 2];
            pixels[i + 3] = pixels[i * value + 3];
        }
        return imagedata;
    }

    function transform_HSV(
            imagedata,
            hueShift,
            saturationShift,
            brightnessShift
    ) {
        var pixels, index, l, r, g, b, max, min, span,
            h, s, v, i, f, p, q, t, newR, newG, newB;
        pixels = imagedata.data;
        for (index = 0, l = pixels.length; index < l; index += 4) {
            r = pixels[index];
            g = pixels[index + 1];
            b = pixels[index + 2];

            max = Math.max(r, g, b);
            min = Math.min(r, g, b);
            span = max - min;
            if (span === 0) {
                h = s = 0;
            } else {
                if (max === r) {
                    h = (60 * (g - b)) / span;
                } else if (max === g) {
                    h = 120 + ((60 * (b - r)) / span);
                } else if (max === b) {
                    h = 240 + ((60 * (r - g)) / span);
                }
                s = (max - min) / max;
            }
            if (h < 0) {
                h += 360;
            }
            v = max / 255;

            h = (((h + hueShift * 360 / 200) % 360) + 360) % 360;
            s = Math.max(0, Math.min(s + saturationShift / 100, 1));
            v = Math.max(0, Math.min(v + brightnessShift / 100, 1));

            i = Math.floor(h / 60);
            f = (h / 60) - i;
            p = v * (1 - s);
            q = v * (1 - (s * f));
            t = v * (1 - (s * (1 - f)));

            if (i === 0 || i === 6) {
                newR = v;
                newG = t;
                newB = p;
            } else if (i === 1) {
                newR = q;
                newG = v;
                newB = p;
            } else if (i === 2) {
                newR = p;
                newG = v;
                newB = t;
            } else if (i === 3) {
                newR = p;
                newG = q;
                newB = v;
            } else if (i === 4) {
                newR = t;
                newG = p;
                newB = v;
            } else if (i === 5) {
                newR = v;
                newG = p;
                newB = q;
            }

            pixels[index] = newR * 255;
            pixels[index + 1] = newG * 255;
            pixels[index + 2] = newB * 255;
        }
        return imagedata;
    }

    function transform_negative (imagedata, value) {
        var pixels, i, l, rcom, gcom, bcom;
        pixels = imagedata.data;
        for (i = 0, l = pixels.length; i < l; i += 4) {
            rcom = 255 - pixels[i];
            gcom = 255 - pixels[i + 1];
            bcom = 255 - pixels[i + 2];

            if (pixels[i] < rcom) { //compare to the complement
                pixels[i] += value;
            } else if (pixels[i] > rcom) {
                pixels[i] -= value;
            }
            if (pixels[i + 1] < gcom) {
                pixels[i + 1] += value;
            } else if (pixels[i + 1] > gcom) {
                pixels[i + 1] -= value;
            }
            if (pixels[i + 2] < bcom) {
                pixels[i + 2] += value;
            } else if (pixels[i + 2] > bcom) {
                pixels[i + 2] -= value;
            }
        }
        return imagedata;
    }

    function transform_comic (imagedata, value) {
        var pixels, i, l;
        pixels = imagedata.data;
        for (i = 0, l = pixels.length; i < l; i += 4) {
            pixels[i] += Math.sin(i * value) * 127 + 128;
            pixels[i + 1] += Math.sin(i * value) * 127 + 128;
            pixels[i + 2] += Math.sin(i * value) * 127 + 128;
        }
        return imagedata;
    }

    function transform_confetti (imagedata, value) {
        var pixels, i, l;
        pixels = imagedata.data;
        for (i = 0, l = pixels.length; i < l; i += 1) {
            pixels[i] = Math.sin(value * pixels[i]) * 127 + pixels[i];
        }
        return imagedata;
    }

    if (this.graphicsChanged()) {
        w = Math.ceil(this.width());
        h = Math.ceil(this.height());
        if (!canvas.width || !canvas.height || !w || !h) {
            // too small to get image data, abort
            return canvas;
        }
        ctx = canvas.getContext("2d");
        imagedata = ctx.getImageData(0, 0, w, h);

        if (this.graphicsValues.fisheye) {
            imagedata = transform_fisheye(
                imagedata,
                this.graphicsValues.fisheye
            );
        }
        if (this.graphicsValues.whirl) {
            imagedata = transform_whirl(
                imagedata,
                this.graphicsValues.whirl
            );
        }
        if (this.graphicsValues.pixelate) {
            imagedata = transform_pixelate(
                imagedata,
                this.graphicsValues.pixelate
            );
        }
        if (this.graphicsValues.mosaic) {
            imagedata = transform_mosaic(
                imagedata,
                this.graphicsValues.mosaic
            );
        }
        if (this.graphicsValues.duplicate) {
            imagedata = transform_duplicate(
                imagedata,
                this.graphicsValues.duplicate
            );
        }
        if (this.graphicsValues.color ||
                this.graphicsValues.saturation ||
                this.graphicsValues.brightness) {
            imagedata = transform_HSV(
                imagedata,
                this.graphicsValues.color,
                this.graphicsValues.saturation,
                this.graphicsValues.brightness
            );
        }
        if (this.graphicsValues.negative) {
            imagedata = transform_negative(
                imagedata,
                this.graphicsValues.negative
            );
        }
        if (this.graphicsValues.comic) {
            imagedata = transform_comic(
                imagedata,
                this.graphicsValues.comic
            );
        }
        if (this.graphicsValues.confetti) {
            imagedata = transform_confetti(
                imagedata,
                this.graphicsValues.confetti
            );
        }

        ctx.putImageData(imagedata, 0, 0);
    }

    return canvas;
};

SpriteMorph.prototype.setEffect = function (effect, value) {
    var eff = effect instanceof Array ? effect[0] : effect.toString();
    if (!contains(
            [
                'color',
                'saturation',
                'brightness',
                'ghost',
                'fisheye',
                'whirl',
                'pixelate',
                'mosaic',
                'negative',
                // depracated, but still supported in legacy projects:
                'duplicate',
                'comic',
                'confetti'
            ],
            eff
    )) {
        throw new Error(localize('unsupported graphic effect') + ':\n' + eff);
    }
    if (eff === 'ghost') {
        this.alpha = 1 - Math.min(Math.max(+value || 0, 0), 100) / 100;
    } else {
        this.graphicsValues[eff] = +value;
    }
    this.rerender();
};

SpriteMorph.prototype.getEffect = function (effect) {
    var eff = effect instanceof Array ? effect[0] : effect.toString();
    if (eff === 'ghost') {
        return this.getGhostEffect();
    }
    return this.graphicsValues[eff] || 0;
};

SpriteMorph.prototype.getGhostEffect = function () {
    return (1 - this.alpha) * 100;
};

SpriteMorph.prototype.changeEffect = function (effect, value) {
    var eff = effect instanceof Array ? effect[0] : effect.toString();
    if (eff === 'ghost') {
        this.setEffect(effect, this.getGhostEffect() + (+value || 0));
    } else {
        this.setEffect(effect, +this.graphicsValues[eff] + (+value));
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
        stage,
        isThought,
        isQuestion
    );
    this.add(bubble);
    this.positionTalkBubble();
};

SpriteMorph.prototype.talkBubble = function () {
    return detect(
        this.children,
        morph => morph instanceof SpeechBubbleMorph
    );
};

SpriteMorph.prototype.positionTalkBubble = function () {
    var stage = this.parentThatIsA(StageMorph),
        stageScale = stage ? stage.scale : 1,
        bubble = this.talkBubble(),
        bottom = this.bottom(),
        step = this.extent().divideBy(10)
            .max(new Point(5, 5).scaleBy(stageScale))
            .multiplyBy(new Point(-1, 1));

    if (!bubble) {return null; }
    bubble.show();
    if (!bubble.isPointingRight) {
        bubble.isPointingRight = true;
        bubble.fixLayout();
        bubble.rerender();
    }
    bubble.setLeft(this.right());
    bubble.setBottom(this.top());
    while (!this.isTouching(bubble) && bubble.bottom() < bottom) {
        bubble.moveBy(step);
    }
    bubble.moveBy(step.mirror());
    if (!stage) {return null; }
    if (bubble.right() > stage.right()) {
        bubble.isPointingRight = false;
        bubble.fixLayout();
        bubble.rerender();
        bubble.setRight(this.center().x);
    }
    bubble.keepWithin(stage);
};

// dragging and dropping adjustments b/c of talk bubbles and parts

SpriteMorph.prototype.prepareToBeGrabbed = function (hand) {
    this.recordLayers();
    this.shadowAttribute('x position');
    this.shadowAttribute('y position');
    if (!this.bounds.containsPoint(hand.position()) &&
            this.isCorrectingOutsideDrag()) {
        this.setCenter(hand.position());
    }
};

SpriteMorph.prototype.isCorrectingOutsideDrag = function () {
    // make sure I don't "trail behind" the hand when dragged
    // override for morphs that you want to be dragged outside
    // their full bounds
    return !this.parts.length;
};

SpriteMorph.prototype.justDropped = function () {
    var stage = this.parentThatIsA(StageMorph);
    if (stage) {
        stage.enableCustomHatBlocks = true;
    }
    if (this.exemplar) {
        this.inheritedAttributes.forEach(att => {
            if (contains(['direction', 'size', 'costume #'], att)) {
                // only refresh certain propagated attributes
                this.refreshInheritedAttribute(att);
            }
        });
    }
    this.restoreLayers();
    this.positionTalkBubble();
    this.receiveUserInteraction('dropped');
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
        // record for later svg conversion
        if (StageMorph.prototype.enablePenLogging) {
            this.parent.trailsLog.push(
                [
                    this.snapPoint(start),
                    this.snapPoint(dest),
                    this.color.copy(),
                    this.size,
                    this.useFlatLineEnds ? 'butt' : 'round'
                ]
            );
        }

        // draw on the pen-trails layer
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
        this.parent.cachedPenTrailsMorph = null;
    }
};

SpriteMorph.prototype.floodFill = function () {
    if (!this.parent.bounds.containsPoint(this.rotationCenter())) {
        return;
    }
    this.parent.cachedPenTrailsMorph = null;
    if (this.color.a > 1) {
        // fix a legacy bug in Morphic color detection
        this.color.a = this.color.a / 255;
    }
    var layer = normalizeCanvas(this.parent.penTrails()),
        width = layer.width,
        height = layer.height,
        ctx = layer.getContext('2d'),
        img = ctx.getImageData(0, 0, width, height),
        dta = img.data,
        stack = [
            Math.round((height / 2) - this.yPosition()) * width +
            Math.round(this.xPosition() + (width / 2))
        ],
        current,
        src;

    function read(p) {
        var d = p * 4;
        return [dta[d], dta[d + 1], dta[d + 2], dta[d + 3]];
    }

    function check(p) {
        return p[0] === src[0] &&
            p[1] === src[1] &&
            p[2] === src[2] &&
            p[3] === src[3];
    }

    src = read(stack[0]);
    if (src[0] === Math.round(this.color.r) &&
            src[1] === Math.round(this.color.g) &&
            src[2] === Math.round(this.color.b) &&
            src[3] === Math.round(this.color.a * 255)) {
        return;
    }
    while (stack.length > 0) {
        current = stack.pop();
        if (check(read(current))) {
            if (current % width > 1) {
                stack.push(current + 1);
                stack.push(current - 1);
            }
            if (current > 0 && current < height * width) {
                stack.push(current + width);
                stack.push(current - width);
            }
        }
        dta[current * 4] = Math.round(this.color.r);
        dta[current * 4 + 1] = Math.round(this.color.g);
        dta[current * 4 + 2] = Math.round(this.color.b);
        dta[current * 4 + 3] = Math.round(this.color.a * 255);
    }
    ctx.putImageData(img, 0, 0);
    this.parent.changed();
};

// SpriteMorph pen trails as costume

SpriteMorph.prototype.reportPenTrailsAsCostume = function () {
    var cst = new Costume(
        this.parentThatIsA(StageMorph).trailsCanvas,
        this.newCostumeName(localize('Costume'))
    );
    cst.shrinkWrap();
    cst.rotationCenter = cst.rotationCenter.translateBy(
        new Point(this.xPosition(), -this.yPosition())
    );
    return cst;
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
        this.parts.forEach(part => part.moveBy(delta));
        this.instances.forEach(instance => {
            if (instance.cachedPropagation) {
                var inheritsX = instance.inheritsAttribute('x position'),
                    inheritsY = instance.inheritsAttribute('y position');
                if (inheritsX && inheritsY) {
                    instance.moveBy(delta);
                } else if (inheritsX) {
                    instance.moveBy(new Point(delta.x, 0));
                } else if (inheritsY) {
                    instance.moveBy(new Point(0, delta.y));
                }
            }
        });
    }
};

SpriteMorph.prototype.rootForGrab = function () {
    if (this.anchor) {
        return this.anchor.rootForGrab();
    }
    return SpriteMorph.uber.rootForGrab.call(this);
};

SpriteMorph.prototype.setCenter = function (aPoint, justMe) {
    // override the inherited default to make sure my parts follow
    // unless it's justMe
    var delta = aPoint.subtract(this.center());
    this.moveBy(delta, justMe);
};

SpriteMorph.prototype.nestingBounds = function () {
    // same as fullBounds(), except that it uses "parts" instead of children
    // and special cases the costume-less "arrow" shape's bounding box
    var result = this.bounds;
    if (!this.costume && this.penBounds) {
        result = this.penBounds.translateBy(this.position());
    }
    this.parts.forEach(part => {
        if (part.isVisible) {
            result = result.merge(part.nestingBounds());
        }
    });
    return result;
};

// SpriteMorph motion primitives

SpriteMorph.prototype.setPosition = function (aPoint, justMe) {
    // override the inherited default to make sure my parts follow
    // unless it's justMe
    var delta = aPoint.subtract(this.topLeft());
    if ((delta.x !== 0) || (delta.y !== 0)) {
        this.moveBy(delta, justMe);
    }
};

SpriteMorph.prototype.forward = function (steps) {
    var dest,
        dist = steps * this.parent.scale || 0,
        dot = 0.1;

	if (dist === 0 && this.isDown) { // draw a dot
 		// dot = Math.min(this.size, 1);
 		this.isDown = false;
        this.forward(dot * -0.5);
        this.isDown = true;
        this.forward(dot);
        this.isDown = false;
        this.forward(dot * -0.5);
        this.isDown = true;
     	return;
 	} else if (dist >= 0) {
        dest = this.position().distanceAngle(dist, this.heading);
    } else {
        dest = this.position().distanceAngle(
            Math.abs(dist),
            (this.heading - 180)
        );
    }

    this.shadowAttribute('x position');
    this.shadowAttribute('y position');

    this.setPosition(dest);
    this.positionTalkBubble();
};

SpriteMorph.prototype.setHeading = function (degrees, noShadow) {
    var x = this.xPosition(),
        y = this.yPosition(),
        dir = !isFinite(degrees) ? 0 : +degrees,
        turn = dir - this.heading;

    // apply to myself
    if (this.rotationStyle) { // optimization, only redraw if rotatable
        this.changed();
        SpriteMorph.uber.setHeading.call(this, dir);
        this.silentGotoXY(x, y, true); // just me
        this.positionTalkBubble();
    } else {
        this.heading = ((+degrees % 360) + 360) % 360;
    }

    // propagate to my parts
    this.parts.forEach(part => {
        var pos = new Point(part.xPosition(), part.yPosition()),
            trg = pos.rotateBy(radians(turn), new Point(x, y));
        if (part.rotatesWithAnchor) {
            part.turn(turn);
        }
        part.gotoXY(trg.x, trg.y);
    });

    // propagate to children that inherit my direction
    if (!noShadow) {
        this.shadowAttribute('direction');
    }
    this.instances.forEach(instance => {
        if (instance.cachedPropagation) {
            if (instance.inheritsAttribute('direction')) {
                instance.setHeading(degrees, true);
            }
        }
    });
};

SpriteMorph.prototype.faceToXY = function (x, y) {
    this.setHeading(this.angleToXY(x, y));
};

SpriteMorph.prototype.angleToXY = function (x, y) {
    var deltaX = (x - this.xPosition()) * this.parent.scale,
        deltaY = (y - this.yPosition()) * this.parent.scale,
        angle = Math.abs(deltaX) < 0.001 ? (deltaY < 0 ? 90 : 270)
                : Math.round(
                (deltaX >= 0 ? 0 : 180)
                    - (Math.atan(deltaY / deltaX) * 57.2957795131)
            );
    return angle + 90;
};

SpriteMorph.prototype.turn = function (degrees) {
    this.setHeading(this.heading + (+degrees || 0));
};

SpriteMorph.prototype.turnLeft = function (degrees) {
    this.setHeading(this.heading - (+degrees || 0));
};

SpriteMorph.prototype.xPosition = function () {
    if (this.inheritsAttribute('x position')) {
        return this.exemplar.xPosition();
    }

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
    if (this.inheritsAttribute('y position')) {
        return this.exemplar.yPosition();
    }

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
    if (this.inheritsAttribute('direction')) {
        return this.exemplar.direction();
    }
    return this.heading;
};

SpriteMorph.prototype.penSize = function () {
    return this.size;
};

SpriteMorph.prototype.gotoXY = function (x, y, justMe, noShadow) {
    var stage = this.parentThatIsA(StageMorph),
        newX,
        newY,
        dest;

    if (!stage) {return; }
    if (!noShadow) {
        this.shadowAttribute('x position');
        this.shadowAttribute('y position');
    }
    x = !isFinite(+x) ? 0 : +x;
    y = !isFinite(+y) ? 0 : +y;
    newX = stage.center().x + x * stage.scale;
    newY = stage.center().y - y * stage.scale;
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
    // don't shadow coordinate attributes
    var penState = this.isDown;
    this.isDown = false;
    this.gotoXY(x, y, justMe, true); // don't shadow coordinates
    this.isDown = penState;
};

SpriteMorph.prototype.setXPosition = function (num) {
    this.shadowAttribute('x position');
    this.gotoXY(+num || 0, this.yPosition(), false, true);
};

SpriteMorph.prototype.changeXPosition = function (delta) {
    this.setXPosition(this.xPosition() + (+delta || 0));
};

SpriteMorph.prototype.setYPosition = function (num) {
    this.shadowAttribute('y position');
    this.gotoXY(this.xPosition(), +num || 0, false, true);
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

    this.shadowAttribute('x position');
    this.shadowAttribute('y position');
    this.shadowAttribute('direction');

    this.setHeading(degrees(Math.atan2(-dirY, dirX)) + 90);
    this.setPosition(this.position().add(
        fb.amountToTranslateWithin(stage.bounds)
    ));
    this.positionTalkBubble();
};

// SpriteMorph coordinate conversion

SpriteMorph.prototype.snapPoint = function(aPoint) {
    var stage = this.parentThatIsA(StageMorph),
        origin = stage.center();
    return new Point(
        (aPoint.x - origin.x) / stage.scale,
        (origin.y - aPoint.y) / stage.scale
    );
};

// SpriteMorph rotation center / fixation point manipulation

SpriteMorph.prototype.setRotationX = function (absoluteX) {
  this.setRotationCenter(new Point(absoluteX, this.yPosition()));
};

SpriteMorph.prototype.setRotationY = function (absoluteY) {
  this.setRotationCenter(new Point(this.xPosition(), absoluteY));
};

SpriteMorph.prototype.setRotationCenter = function (absoluteCoordinate) {
    var delta, normal;
    if (!this.costume) {
        throw new Error('setting the rotation center requires a costume');
    }
    delta = absoluteCoordinate.subtract(
        new Point(this.xPosition(), this.yPosition())
    ).divideBy(this.scale).rotateBy(radians(90 - this.heading));
    normal = this.costume.rotationCenter.add(new Point(delta.x, -delta.y));
    this.costume.rotationCenter = normal;
    this.changed();
    this.fixLayout();
    this.changed();
};

SpriteMorph.prototype.moveRotationCenter = function () {
    // make this a method of Snap >> SpriteMorph
    this.world().activeHandle = new HandleMorph(
        this,
        null,
        null,
        null,
        null,
        'movePivot'
    );
};

SpriteMorph.prototype.setPivot = function (worldCoordinate) {
    var stage = this.parentThatIsA(StageMorph),
        ide = this.parentThatIsA(IDE_Morph),
        cntr;
    if (stage) {
        cntr = stage.center();
        this.setRotationCenter(
            new Point(
                (worldCoordinate.x - cntr.x) / stage.scale,
                (cntr.y - worldCoordinate.y) / stage.scale
            )
        );
        if (ide) {
            ide.recordUnsavedChanges();
        }
    }
};

// SpriteMorph dimension getters

SpriteMorph.prototype.xCenter = function () {
    var stage = this.parentThatIsA(StageMorph);

    if (!stage && this.parent.grabOrigin) { // I'm currently being dragged
        stage = this.parent.grabOrigin.origin;
    }
    if (stage) {
        return (this.center().x - stage.center().x) / stage.scale;
    }
    return this.center().x;
};

SpriteMorph.prototype.yCenter = function () {
    var stage = this.parentThatIsA(StageMorph);

    if (!stage && this.parent.grabOrigin) { // I'm currently being dragged
        stage = this.parent.grabOrigin.origin;
    }
    if (stage) {
        return (stage.center().y - this.center().y) / stage.scale;
    }
    return this.center().y;
};

SpriteMorph.prototype.xLeft = function () {
    var stage = this.parentThatIsA(StageMorph);

    if (!stage && this.parent.grabOrigin) { // I'm currently being dragged
        stage = this.parent.grabOrigin.origin;
    }
    if (stage) {
        return (this.left() - stage.center().x) / stage.scale;
    }
    return this.left();
};

SpriteMorph.prototype.xRight = function () {
    var stage = this.parentThatIsA(StageMorph);

    if (!stage && this.parent.grabOrigin) { // I'm currently being dragged
        stage = this.parent.grabOrigin.origin;
    }
    if (stage) {
        return (this.right() - stage.center().x) / stage.scale;
    }
    return this.right();
};
 
SpriteMorph.prototype.yTop = function () {
    var stage = this.parentThatIsA(StageMorph);

    if (!stage && this.parent.grabOrigin) { // I'm currently being dragged
        stage = this.parent.grabOrigin.origin;
    }
    if (stage) {
        return (stage.center().y - this.top()) / stage.scale;
    }
    return this.top();
};

SpriteMorph.prototype.yBottom = function () {
    var stage = this.parentThatIsA(StageMorph);

    if (!stage && this.parent.grabOrigin) { // I'm currently being dragged
        stage = this.parent.grabOrigin.origin;
    }
    if (stage) {
        return (stage.center().y - this.bottom()) / stage.scale;
    }
    return this.bottom();
};

// SpriteMorph message broadcasting

SpriteMorph.prototype.allMessageNames = function () {
    var msgs = [];
    this.allScripts().forEach(script => {
        script.allChildren().forEach(morph => {
            var txt;
            if (morph instanceof InputSlotMorph && morph.choices && contains(
                ['messagesMenu', 'messagesReceivedMenu'],
                morph.choices
            )) {
                txt = morph.evaluate();
                if (isString(txt) && txt !== '') {
                    if (!contains(msgs, txt)) {
                        msgs.push(txt);
                    }
                }
            }
        });
    });
    return msgs;
};

SpriteMorph.prototype.allSendersOf = function (message, receiverName, known) {
    return this.allScripts().filter(script =>
        script.isSending && script.isSending(message, receiverName, known)
    );
};

SpriteMorph.prototype.allHatBlocksFor = function (message) {
    if (typeof message === 'number') { message = message.toString(); }
    return this.scripts.children.filter(morph => {
        var event;
        if (morph.selector) {
            if (morph.selector === 'receiveMessage') {
                event = morph.inputs()[0].evaluate();
                return event === message
                    || (event instanceof Array
                        && message !== '__shout__go__'
                        && message !== '__clone__init__');
            }
            if (morph.selector === 'receiveGo') {
                return message === '__shout__go__';
            }
            if (morph.selector === 'receiveOnClone') {
                return message === '__clone__init__';
            }
        }
        return false;
    });
};

SpriteMorph.prototype.allHatBlocksForKey = function (key) {
    return this.scripts.children.filter(morph => {
        if (morph.selector) {
            if (morph.selector === 'receiveKey') {
                var evt = morph.inputs()[0].evaluate()[0];
                return evt === key || evt === 'any key';
            }
        }
        return false;
    });
};

SpriteMorph.prototype.allHatBlocksForInteraction = function (interaction) {
    return this.scripts.children.filter(morph => {
        if (morph.selector) {
            if (morph.selector === 'receiveInteraction') {
                return morph.inputs()[0].evaluate()[0] === interaction;
            }
        }
        return false;
    });
};

SpriteMorph.prototype.hasGenericHatBlocks = function () {
    return this.scripts.children.some(morph =>
        morph.selector === 'receiveCondition'
    );
};

SpriteMorph.prototype.allGenericHatBlocks = function () {
    return this.scripts.children.filter(morph => {
        if (morph.selector) {
            return morph.selector === 'receiveCondition';
        }
        return false;
    });
};

SpriteMorph.prototype.allScripts = function () {
    var all = this.scripts.children.slice();
    this.customBlocks.forEach(def => {
        if (def.body) {
            all.push(def.body.expression);
        }
        def.scripts.forEach(scr => all.push(scr));
    });
    if (this.globalBlocks) {
        this.globalBlocks.forEach(def => {
            if (def.body) {
                all.push(def.body.expression);
            }
            def.scripts.forEach(scr => all.push(scr));
        });
    }
    return all;
};

// SpriteMorph events

SpriteMorph.prototype.mouseClickLeft = function () {
    return this.receiveUserInteraction('clicked');
};

SpriteMorph.prototype.mouseEnter = function () {
    return this.receiveUserInteraction('mouse-entered');
};

SpriteMorph.prototype.mouseDownLeft = function () {
    return this.receiveUserInteraction('pressed');
};

SpriteMorph.prototype.mouseScroll = function (y) {
    return this.receiveUserInteraction('scrolled-' + (y > 0 ? 'up' : 'down'));
};

SpriteMorph.prototype.receiveUserInteraction = function (
    interaction,
    rightAway,
    threadSafe
) {
    var stage = this.parentThatIsA(StageMorph),
        procs = [],
        hats;
    if (!stage) {return; } // currently dragged
    hats = this.allHatBlocksForInteraction(interaction);
    hats.forEach(block =>
        procs.push(stage.threads.startProcess(
            block,
            this,
            threadSafe || stage.isThreadSafe,
            null, // export result
            null, // callback
            null, // is clicked
            rightAway, // immediately
            interaction === 'stopped' // atomic
        ))
    );
    return procs;
};

SpriteMorph.prototype.mouseDoubleClick = function () {
    if (this.isTemporary) {return; }
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

// SpriteMorph thread count (for debugging)

SpriteMorph.prototype.reportThreadCount = function () {
    var stage = this.parentThatIsA(StageMorph);
    if (stage) {
        return stage.threads.processes.length;
    }
    return 0;
};

// SpriteMorph variable refactoring

SpriteMorph.prototype.refactorVariableInstances = function (
    oldName,
    newName,
    isGlobal
) {
    if (isGlobal && this.hasSpriteVariable(oldName)) {
        return;
    }

    this.scripts.children.forEach(child => {
        if (child instanceof BlockMorph) {
            child.refactorVarInStack(oldName, newName);
        }
    });

};

// SpriteMorph variable watchers (for palette checkbox toggling)

SpriteMorph.prototype.findVariableWatcher = function (varName) {
    var stage = this.parentThatIsA(StageMorph),
        globals = this.globalVariables();
    if (stage === null) {
        return null;
    }
    return detect(
        stage.children,
        morph => morph instanceof WatcherMorph &&
            (morph.target === this.variables || morph.target === globals) &&
                morph.getter === varName
    );
};

SpriteMorph.prototype.toggleVariableWatcher = function (varName, isGlobal) {
    var stage = this.parentThatIsA(StageMorph),
        ide = this.parentThatIsA(IDE_Morph),
        globals = this.globalVariables(),
        watcher,
        others;
        
    if (stage === null) {
        return null;
    }
    if (isNil(isGlobal)) {
        isGlobal = contains(globals.names(), varName);
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
        if (isGlobal) {
            ide.flushBlocksCache('variables');
            ide.refreshPalette();
        }
        return;
    }

    // if no watcher exists, create a new one
    watcher = new WatcherMorph(
        varName,
        this.blockColor.variables,
        isGlobal ? globals : this.variables,
        varName
    );
    watcher.setPosition(stage.position().add(10));
    others = stage.watchers(watcher.left());
    if (others.length > 0) {
        watcher.setTop(others[others.length - 1].bottom());
    }
    watcher.fixLayout();
    watcher.keepWithin(stage);
    stage.add(watcher);
    watcher.changed();
    return watcher;
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
        ide = this.parentThatIsA(IDE_Morph),
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
        if (watcher.isGlobal(selector)) {
            ide.flushBlocksCache();
            ide.refreshPalette();
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
    watcher.changed();
    if (watcher.isGlobal(selector)) {
        ide.flushBlocksCache();
        ide.refreshPalette();
    }
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
    return detect(
        stage.children,
        morph => morph instanceof WatcherMorph &&
            morph.getter === selector &&
                morph.target === (morph.isGlobal(selector) ? stage : this)
    );
};

// SpriteMorph custom blocks

SpriteMorph.prototype.deleteAllBlockInstances = function (definition) {
    var stage,
        blocks = definition.isGlobal ? this.allBlockInstances(definition)
            : this.allIndependentInvocationsOf(definition.blockSpec());

    blocks.forEach(each => each.deleteBlock());

    // purge custom block definitions of "corpses"
    // i.e. blocks that have been marked for deletion
    if (definition.isGlobal) {
        stage = this.parentThatIsA(StageMorph);
        if (stage) {
            stage.globalBlocks.forEach(def => def.purgeCorpses());
            stage.children.concat(stage).forEach(sprite => {
                if (sprite.isSnapObject) {
                    sprite.customBlocks.forEach(def => def.purgeCorpses());
                }
            });
        }
    } else {
        this.allSpecimens().concat(this).forEach(sprite =>
            sprite.customBlocks.forEach(def => def.purgeCorpses())
        );
    }
};

SpriteMorph.prototype.allBlockInstances = function (definition) {
    var stage, objects, blocks = [], inDefinitions;
    if (definition.isGlobal) {
        stage = this.parentThatIsA(StageMorph);
        objects = stage.children.filter(morph =>
            morph instanceof SpriteMorph
        );
        objects.push(stage);
        objects.forEach(sprite =>
            blocks = blocks.concat(
                sprite.allLocalBlockInstances(definition)
            )
        );
        inDefinitions = [];
        stage.globalBlocks.forEach(def => {
            def.scripts.forEach(eachScript =>
                eachScript.allChildren().forEach(c => {
                    if (c.isCustomBlock && (c.definition === definition)) {
                        inDefinitions.push(c);
                    }
                })
            );
            if (def.body) {
                def.body.expression.allChildren().forEach(c => {
                    if (c.isCustomBlock && (c.definition === definition)) {
                        inDefinitions.push(c);
                    }
                });
            }
        });
        return blocks.concat(inDefinitions);
    }
    return this.allLocalBlockInstances(definition);
};

SpriteMorph.prototype.allIndependentInvocationsOf = function (aSpec) {
    var blocks;
    if (this.exemplar && this.exemplar.getMethod(aSpec)) {
        // shadows an inherited method, don't delete
        return [];
    }
    blocks = this.allInvocationsOf(aSpec);
    this.instances.forEach(sprite =>
        sprite.addAllInvocationsOf(aSpec, blocks)
    );
    return blocks;
};

SpriteMorph.prototype.allDependentInvocationsOf = function (aSpec) {
    var blocks;
    blocks = this.allInvocationsOf(aSpec);
    this.instances.forEach(sprite =>
        sprite.addAllInvocationsOf(aSpec, blocks)
    );
    return blocks;
};

SpriteMorph.prototype.allInvocationsOf = function (aSpec) {
    // only inside the receiver, without the inheritance branches
    var inScripts, inDefinitions, inBlockEditors, blocks;

    inScripts = this.scripts.allChildren().filter(c =>
        c.isCustomBlock && !c.isGlobal && (c.blockSpec === aSpec)
    );

    inDefinitions = [];
    this.customBlocks.forEach(def => {
        def.scripts.forEach(eachScript =>
            eachScript.allChildren().forEach(c => {
                if (c.isCustomBlock && !c.isGlobal &&
                    (c.blockSpec === aSpec)
                ) {
                    inDefinitions.push(c);
                }
            })
        );
        if (def.body) {
            def.body.expression.allChildren().forEach(c => {
                if (c.isCustomBlock && !c.isGlobal &&
                    (c.blockSpec === aSpec)
                ) {
                    inDefinitions.push(c);
                }
            });
        }
    });

    inBlockEditors = this.allEditorBlockInstances(null, aSpec);
    blocks = inScripts.concat(inDefinitions).concat(inBlockEditors);
    return blocks;
};

SpriteMorph.prototype.addAllInvocationsOf = function (aSpec, anArray) {
    if (!this.getLocalMethod(aSpec)) {
        this.allInvocationsOf(aSpec).forEach(block =>
            anArray.push(block)
        );
        this.instances.forEach(sprite =>
            sprite.addAllInvocationsOf(aSpec, anArray)
        );
    }
};


SpriteMorph.prototype.allLocalBlockInstances = function (definition) {
    var inScripts, inDefinitions, inBlockEditors, inPalette, result;

    inScripts = this.scripts.allChildren().filter(c =>
        c.isCustomBlock && (c.definition === definition)
    );

    inDefinitions = [];
    this.customBlocks.forEach(def => {
        if (def.body) {
            def.body.expression.allChildren().forEach(c => {
                if (c.isCustomBlock && (c.definition === definition)) {
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

SpriteMorph.prototype.allEditorBlockInstances = function (definition, spec) {
    // either pass a definition for global custom blocks
    // or a spec for local ones
    var inBlockEditors = [],
        world = this.world();

    if (!world) {return []; } // when copying a sprite

    this.world().children.forEach(morph => {
        if (morph instanceof BlockEditorMorph) {
            morph.body.contents.allChildren().forEach(block => {
                if (definition) { // global
                    if (!block.isPrototype
                            && !(block instanceof PrototypeHatBlockMorph)
                            && (block.definition === definition)) {
                        inBlockEditors.push(block);
                    }
                } else { // local
                    if (block.isCustomBlock
                            && !block.isGlobal
                            && !block.isPrototype
                            && !(block instanceof PrototypeHatBlockMorph)
                            && (block.blockSpec === spec)) {
                        inBlockEditors.push(block);
                    }
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
        block => block.isCustomBlock && (block.definition === definition)
    );
};

SpriteMorph.prototype.usesBlockInstance = function (
    definition,
    forRemoval, // optional bool
    skipGlobals, // optional bool
    skipBlocks // optional array with ignorable definitions
) {
    var inDefinitions,
        inScripts = detect(
            this.scripts.allChildren(),
            c => c.isCustomBlock && (c.definition === definition)
        );

    if (inScripts) {return true; }

    if (definition.isGlobal && !skipGlobals) {
        inDefinitions = [];
        this.parentThatIsA(StageMorph).globalBlocks.forEach(def => {
            if (forRemoval && (definition === def)) {return; }
            if (skipBlocks && contains(skipBlocks, def)) {return; }
            if (def.body) {
                def.body.expression.allChildren().forEach(c => {
                    if (c.isCustomBlock && (c.definition === definition)) {
                        inDefinitions.push(c);
                    }
                });
            }
        });
        if (inDefinitions.length > 0) {return true; }
    }

    inDefinitions = [];
    this.customBlocks.forEach(def => {
        if (def.body) {
            def.body.expression.allChildren().forEach(c => {
                if (c.isCustomBlock && (c.definition === definition)) {
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
    return blockList.filter((def, i) =>
        def.blockSpec() === spec && (i !== idx)
    );
};

SpriteMorph.prototype.replaceDoubleDefinitionsFor = function (definition) {
    var doubles = this.doubleDefinitionsFor(definition),
        stage,
        ide;
    doubles.forEach(double =>
        this.allBlockInstances(double).forEach(block => {
            block.definition = definition;
            block.refresh();
        })
    );
    if (definition.isGlobal) {
        stage = this.parentThatIsA(StageMorph);
        stage.globalBlocks = stage.globalBlocks.filter(def =>
            !contains(doubles, def)
        );
    } else {
        this.customBlocks = this.customBlocks.filter(def =>
            !contains(doubles, def)
        );
    }
    ide = this.parentThatIsA(IDE_Morph);
    if (ide) {
        ide.flushPaletteCache();
        ide.refreshPalette();
    }
};

// SpriteMorph controlling generic WHEN hats

SpriteMorph.prototype.pauseGenericHatBlocks = function () {
    var stage = this.parentThatIsA(StageMorph),
        ide = this.parentThatIsA(IDE_Morph);
    if (this.hasGenericHatBlocks()) {
        stage.enableCustomHatBlocks = true;
        stage.threads.pauseCustomHatBlocks = true;
        ide.controlBar.stopButton.refresh();
    }
};

// SpriteMorph inheritance - general

SpriteMorph.prototype.chooseExemplar = function () {
    var stage = this.parentThatIsA(StageMorph),
        other = stage.children.filter(m =>
            m instanceof SpriteMorph &&
                !m.isTemporary &&
                    (!contains(m.allExemplars(), this))
        ),
        menu;
    menu = new MenuMorph(
        aSprite => this.setExemplar(aSprite),
        localize('current parent') +
            ':\n' +
            (this.exemplar ? this.exemplar.name : localize('none'))
    );
    other.forEach(eachSprite =>
        menu.addItem(
            eachSprite.name,
            eachSprite,
            null, // hint
            null, // color
            null, // bold
            null, // italic
            null, // doubleClickAction
            null, // shortcut
            true  // verbatim
        )
    );
    menu.addLine();
    menu.addItem(localize('none'), null);
    menu.popUpAtHand(this.world());
};

SpriteMorph.prototype.setExemplar = function (another, enableError) {
    var ide;

    // check for circularity
    if (another instanceof SpriteMorph &&
            contains(another.allExemplars(), this)) {
        if (enableError) {
            throw new Error(
                localize('unable to inherit\n(disabled or circular?)')
            );
        }
        return; // silently fail so stored projects can still be loaded
    }

    this.emancipate();
    this.exemplar = another;
    if (another) {
        this.variables.parentFrame = another.variables;
        another.addSpecimen(this);
    } else {
        this.variables.parentFrame = this.globalVariables();
    }
    if (this.isTemporary) {
        this.cloneOriginName = another.cloneOriginName || another.name;
    } else {
        ide = this.parentThatIsA(IDE_Morph);
        if (ide) {
            ide.flushBlocksCache();
            ide.refreshPalette();
        }
    }
};

SpriteMorph.prototype.prune = function () {
    // sever ties with all my specimen, if any,
    this.instances.forEach(child => {
        child.shadowAllAttributes();
        child.shadowAllMethods();
        child.shadowAllVars();
        child.exemplar = null;
    });
    this.instances = [];
};

SpriteMorph.prototype.emancipate = function () {
    // sever all relations with my exemplar, if any,
    // and make sure I am the root of my specimen
    if (this.exemplar) {
        if (!this.isTemporary) {
            this.shadowAllAttributes();
            this.shadowAllMethods();
            this.shadowAllVars();
        }
        this.exemplar.removeSpecimen(this); // optimization
        this.exemplar = null;
    }
};

SpriteMorph.prototype.allExemplars = function () {
    // including myself
    var all = [],
        current = this;
    while (!isNil(current)) {
        all.push(current);
        current = current.exemplar;
    }
    return all;
};

SpriteMorph.prototype.specimens = function () {
    // without myself
    return this.instances;
};

SpriteMorph.prototype.allSpecimens = function () {
    // without myself
    var all = this.instances.slice();
    this.instances.forEach(child =>
        all.push.apply(all, child.allSpecimens())
    );
    return all;
};

SpriteMorph.prototype.addSpecimen = function (another) {
    // private - use setExemplar() to establish an inheritance relationship
    this.instances.push(another);
};

SpriteMorph.prototype.removeSpecimen = function(another) {
    // private - use setExemplar(null) to cancel an inheritance relationship
    var idx = this.instances.indexOf(another);
    if (idx !== -1) {
        this.instances.splice(idx, 1);
    }
};

// SpriteMorph inheritance - attributes

SpriteMorph.prototype.inheritsAttribute = function (aName) {
    return !isNil(this.exemplar) && contains(this.inheritedAttributes, aName);
};

SpriteMorph.prototype.updatePropagationCache = function () {
    // private - indicate whether one of my inherited attributes is technically
    // propagated down from my exemplar, instead of truly shared.
    // (only) needed for internal optimization caching
    this.cachedPropagation = !isNil(this.exemplar) && detect(
        [
            'x position',
            'y position',
            'direction',
            'size',
            'costume #',
            'volume',
            'balance',
            'shown?',
            'pen down?'
        ],
        att => contains(this.inheritedAttributes, att)
    );
};

SpriteMorph.prototype.shadowedAttributes = function () {
    // answer an array of attribute names that can be deleted/shared
    var inherited = this.inheritedAttributes;
    return this.attributes.filter(each => !contains(inherited, each));
};

SpriteMorph.prototype.shadowAllAttributes = function () {
    this.attributes.forEach(att =>
        this.shadowAttribute(att)
    );
};

SpriteMorph.prototype.shadowAttribute = function (aName) {
    var ide, wardrobe, jukebox,
        pos;
    if (!this.inheritsAttribute(aName)) {
        return;
    }
    ide = this.parentThatIsA(IDE_Morph);
    this.inheritedAttributes = this.inheritedAttributes.filter(each =>
        each !== aName
    );
    if (aName === 'costumes') {
        wardrobe = new List();
        this.costumes.asArray().forEach(costume => {
            var cst = costume.copy();
            wardrobe.add(cst);
            if (costume === this.costume) {
                this.wearCostume(cst);
            }
        });
        this.costumes = wardrobe;
        this.instances.forEach(obj => {
            if (obj.inheritsAttribute('costumes')) {
                obj.refreshInheritedAttribute('costumes');
            }
        });
    } else if (aName === 'sounds') {
        jukebox = new List();
        this.sounds.asArray().forEach(sound => jukebox.add(sound.copy()));
        this.sounds = jukebox;
        this.instances.forEach(obj => {
            if (obj.inheritsAttribute('sounds')) {
                obj.refreshInheritedAttribute('sounds');
            }
        });
    } else if (aName === 'scripts') {
        ide.stage.threads.stopAllForReceiver(this);
        pos = this.scripts.position();
        this.scripts = this.exemplar.scripts.fullCopy();
        if (ide && (contains(ide.currentSprite.allExemplars(), this))) {
            ide.createSpriteEditor();
            ide.fixLayout('selectSprite');
            this.scripts.fixMultiArgs();
            this.scripts.setPosition(pos);
            ide.spriteEditor.adjustScrollBars();
        }
        this.instances.forEach(obj => {
            if (obj.inheritsAttribute('scripts')) {
                obj.refreshInheritedAttribute('scripts');
            }
        });
    } else {
        this.updatePropagationCache();
        if (ide && !this.isTemporary) {
            ide.flushBlocksCache(); // optimization: specify category if known
            ide.refreshPalette();
        }
    }
};

SpriteMorph.prototype.inheritAttribute = function (aName) {
    var ide = this.parentThatIsA(IDE_Morph);
    if (!this.exemplar || !contains(this.attributes, aName)) {
        return;
    }
    if (!this.inheritsAttribute(aName)) {
        this.inheritedAttributes.push(aName);
        this.refreshInheritedAttribute(aName);
        if (ide) {
            ide.flushBlocksCache(); // optimization: specify category
            ide.refreshPalette();
        }
    }
};

SpriteMorph.prototype.refreshInheritedAttribute = function (aName) {
    var ide, idx;
    switch (aName) {
    case 'x position':
    case 'y position':
        this.cachedPropagation = true;
        this.gotoXY(this.xPosition(), this.yPosition(), false, true);
        break;
    case 'direction':
        this.cachedPropagation = true;
        this.setHeading(this.direction(), true);
        break;
    case 'size':
        this.cachedPropagation = true;
        this.setScale(this.getScale(), true);
        break;
    case 'costume #':
        this.cachedPropagation = true;
        if (this.inheritsAttribute('costumes')) {
            // if inheriting the whole wardrobe,
            // just switch to the exemplar's costume
            this.wearCostume(this.exemplar.costume, true);
        } else {
            // otherwise switch to the own costume of the
            // corresponing number
            this.doSwitchToCostume(this.getCostumeIdx(), true);
        }
        break;
    case 'volume':
        this.cachedPropagation = true;
        this.setVolume(this.getVolume(), true);
        break;
    case 'shown?':
        this.cachedPropagation = true;
        this.setVisibility(this.reportShown(), true);
        break;
    case 'pen down?':
        this.cachedPropagation = true;
        this.setPenDown(this.getPenDown(), true);
        break;
    case 'balance':
        this.cachedPropagation = true;
        this.setPan(this.getPan(), true);
        break;
    case 'costumes':
        idx = this.getCostumeIdx();
        this.costumes = this.exemplar.costumes;
        this.doSwitchToCostume(idx, true);
        this.instances.forEach(sprite => {
            if (sprite.inheritsAttribute('costumes')) {
                sprite.refreshInheritedAttribute('costumes');
            }
        });
        break;
    case 'sounds':
        this.sounds = this.exemplar.sounds;
        this.instances.forEach(sprite => {
            if (sprite.inheritsAttribute('sounds')) {
                sprite.refreshInheritedAttribute('sounds');
            }
        });
        break;
    case 'scripts':
        this.scripts = this.exemplar.scripts;
        ide = this.parentThatIsA(IDE_Morph);
        if (ide) {
            ide.stage.threads.stopAllForReceiver(this);
            if (contains(ide.currentSprite.allExemplars(), this)) {
                ide.createSpriteEditor();
                ide.fixLayout('selectSprite');
            }
        }
        this.instances.forEach(sprite => {
            if (sprite.inheritsAttribute('scripts')) {
                sprite.refreshInheritedAttribute('scripts');
            }
        });
        break;
    default:
        nop();
    }
};

SpriteMorph.prototype.toggleInheritanceForAttribute = function (aName) {
    if (this.inheritsAttribute(aName)) {
        this.shadowAttribute(aName);
    } else {
        this.inheritAttribute(aName);
    }
};

// SpriteMorph inheritance - variables

SpriteMorph.prototype.isVariableNameInUse = function (vName, isGlobal) {
    if (isGlobal) {
        return contains(this.variables.allNames(), vName);
    }
    if (contains(this.variables.names(), vName)) {return true; }
    return contains(this.globalVariables().names(), vName);
};

SpriteMorph.prototype.globalVariables = function () {
    var current = this.variables.parentFrame;
    while (current.owner) {
        current = current.parentFrame;
    }
    return current;
};

SpriteMorph.prototype.shadowAllVars = function () {
    this.inheritedVariableNames().forEach(name =>
        this.shadowVar(name, this.variables.getVar(name))
    );
};

SpriteMorph.prototype.shadowVar = function (name, value) {
    var ide;
    this.variables.addVar(name, value);
    if (!this.isTemporary) {
        ide = this.parentThatIsA(IDE_Morph);
        if (ide) {
            ide.flushBlocksCache('variables');
            ide.refreshPalette();
        }
    }
};

SpriteMorph.prototype.toggleInheritedVariable = function (vName) {
    if (contains(this.inheritedVariableNames(true), vName)) { // is shadowed
        this.deleteVariable(vName);
    } else if (contains(this.inheritedVariableNames(), vName)) { // inherited
        this.shadowVar(vName, this.variables.getVar(vName));
    }
};

SpriteMorph.prototype.inheritedVariableNames = function (shadowedOnly) {
    var names = [],
        own = this.variables.names(),
        current = this.variables.parentFrame;

    function test(each) {
        return shadowedOnly ? contains(own, each) : !contains(own, each);
    }

    while (current.owner instanceof SpriteMorph) {
        names.push.apply(
            names,
            current.names().filter(test)
        );
        current = current.parentFrame;
    }
    return names;
};

SpriteMorph.prototype.deletableVariableNames = function () {
    var locals = this.variables.names(),
        inherited = this.inheritedVariableNames();
    return locals.concat(
        this.globalVariables().names().filter(each =>
            !contains(locals, each) && !contains(inherited, each)
        )
    );
};

SpriteMorph.prototype.hasSpriteVariable = function (varName) {
    return contains(this.variables.names(), varName);
};

SpriteMorph.prototype.allLocalVariableNames = function (sorted) {
    var exceptGlobals = this.globalVariables(),
        globalNames = exceptGlobals.names(),
        data;

    function alphabetically(x, y) {
        return x.toLowerCase() < y.toLowerCase() ? -1 : 1;
    }

 	data = this.variables.allNames(exceptGlobals).filter(each =>
		!contains(globalNames, each)
    );
	if (sorted) {
 		data.sort(alphabetically);
   }
   return data;
};

SpriteMorph.prototype.reachableGlobalVariableNames = function (sorted) {
    var locals = this.allLocalVariableNames(),
    	data;

    function alphabetically(x, y) {
        return x.toLowerCase() < y.toLowerCase() ? -1 : 1;
    }

	data = this.globalVariables().names().filter(each =>
    	!contains(locals, each)
	);
    if (sorted) {
    	data.sort(alphabetically);
   }
   return data;
};

// SpriteMorph inheritance - custom blocks

SpriteMorph.prototype.getMethod = function (spec) {
    return this.allBlocks()[spec];
};

SpriteMorph.prototype.getLocalMethod = function (spec) {
    return this.ownBlocks()[spec];
};

SpriteMorph.prototype.ownBlocks = function () {
    var dict = {};
    this.customBlocks.forEach(def =>
        dict[def.blockSpec()] = def
    );
    return dict;
};

SpriteMorph.prototype.allBlocks = function (valuesOnly) {
    var dict = {};
    this.allExemplars().reverse().forEach(sprite =>
        sprite.customBlocks.forEach(def =>
            dict[def.blockSpec()] = def
        )
    );
    if (valuesOnly) {
        return Object.keys(dict).map(key => dict[key]);
    }
    return dict;
};

SpriteMorph.prototype.inheritedBlocks = function (valuesOnly) {
    var dict = {},
        own = Object.keys(this.ownBlocks()),
        others = this.allExemplars().reverse();
    others.pop();
    others.forEach(sprite =>
        sprite.customBlocks.forEach(def => {
            var spec = def.blockSpec();
            if (!contains(own, spec)) {
                dict[spec] = def;
            }
        })
    );
    if (valuesOnly) {
        return Object.keys(dict).map(key => dict[key]);
    }
    return dict;
};

SpriteMorph.prototype.shadowAllMethods = function () {
    var ide;
    this.inheritedMethods().forEach(dup =>
        this.customBlocks.push(dup)
    );
    if (!this.isTemporary) {
        ide = this.parentThatIsA(IDE_Morph);
        if (ide) {
            ide.flushPaletteCache();
            ide.refreshPalette();
        }
    }
};

SpriteMorph.prototype.inheritedMethods = function () {
    // private - pre-serialization preparation
    return this.inheritedBlocks(true).map(def =>
        def.copyAndBindTo(this, true) // header only
    );
};

// SpriteMorph thumbnail

SpriteMorph.prototype.thumbnail = function (extentPoint, recycleMe, noCorpse) {
    // answer a new Canvas of extentPoint dimensions containing
    // my thumbnail representation keeping the originial aspect ratio
    // a "recycleMe canvas can be passed for re-use
    var src = this.getImage(), // at this time sprites aren't composite morphs
        w = this.width(),
        h = this.height(),
        scale = Math.min(
            (extentPoint.x / w),
            (extentPoint.y / h)
        ),
        xOffset = (extentPoint.x - (w * scale)) / 2,
        yOffset = (extentPoint.y - (h * scale)) / 2,
        trg = newCanvas(extentPoint, false, recycleMe),
        ctx = trg.getContext('2d');

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
    if (this.isCorpse && !noCorpse) {
        ctx.globalAlpha = 0.3;
    }
    if (w && h && src.width && src.height) {
        ctx.scale(scale, scale);
        ctx.drawImage(
            src,
            Math.floor(xOffset / scale),
            Math.floor(yOffset / scale)
        );
    }
    if (this.isCorpse && !noCorpse) {
        ctx.restore();
        xOut('white', 0.8, 6);
        xOut('black', 0.8, 1);
    }
    ctx.restore();
    return trg;
};

SpriteMorph.prototype.fullThumbnail = function (extentPoint, recycleMe) {
    // containing parts and anchor symbols, if any
    var thumb = this.thumbnail(extentPoint, recycleMe),
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
    var sym = new BooleanSlotMorph(bool);
    sym.isStatic = true;
    sym.fixLayout();
    return sym;
};

// SpriteMorph nesting
/*
    simulate Morphic trees
*/

SpriteMorph.prototype.attachTo = function (aSprite) {
    aSprite.attachPart(this);
};

SpriteMorph.prototype.attachPart = function (aSprite) {
    var v = Date.now();
    if (aSprite.anchor) {
        aSprite.anchor.detachPart(aSprite);
    }
    this.parts.push(aSprite);
    this.version = v;
    aSprite.anchor = this;
    this.allParts().forEach(part =>
        part.nestingScale = part.scale
    );
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

    this.parts.forEach(part => {
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
    this.parts.forEach(part =>
        result = result.concat(part.allParts())
    );
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

SpriteMorph.prototype.recordLayers = function () {
    var stage = this.parentThatIsA(StageMorph);
    if (!stage) {
        this.layerCache = null;
        return;
    }
    this.layers = this.allParts();
    this.layers.forEach(part => {
        var bubble = part.talkBubble();
        if (bubble) {bubble.hide(); }
    });
    this.layers.sort((x, y) =>
        stage.children.indexOf(x) < stage.children.indexOf(y) ?
            -1 : 1
    );
};

SpriteMorph.prototype.restoreLayers = function () {
    if (this.layers && this.layers.length > 1) {
        this.layers.forEach(sprite => {
            sprite.comeToFront();
            sprite.positionTalkBubble();
        });
    }
    this.layers = null;
};

// SpriteMorph destroying

SpriteMorph.prototype.destroy = function () {
    // make sure to sever all inheritance ties to other sprites
    if (this.anchor) {
        this.anchor.detachPart(this);
    }
    this.emancipate();
    if (!this.isTemporary) {
        this.prune();
    }
    SpriteMorph.uber.destroy.call(this);
};

// SpriteMorph highlighting

SpriteMorph.prototype.flash = function () {
	var world = this.world();
    this.addHighlight();
	world.animations.push(new Animation(
		nop,
  		nop,
    	0,
     	800,
      	nop,
      	() => this.removeHighlight()
	));
};

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

    highlight.bounds.setExtent(fb.extent().add(edge * 2));
    highlight.color = color;
    highlight.cachedImage = this.highlightImage(color, border);
    ctx = highlight.cachedImage.getContext('2d');
    ctx.drawImage(
        this.highlightImage(WHITE, 4),
        border - 4,
        border - 4
    );
    ctx.drawImage(
        this.highlightImage(new Color(50, 50, 50), 2),
        border - 2,
        border - 2
    );
    ctx.drawImage(
        this.highlightImage(WHITE, 1),
        border - 1,
        border - 1
    );
    highlight.setPosition(fb.origin.subtract(new Point(edge, edge)));
    return highlight;
};

SpriteMorph.prototype.highlightImage = function (color, border) {
    var fb, img, hi, ctx, out;
    fb = this.extent();
    img = this.getImage();

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
    var highlights = this.children.slice(0).reverse().filter(child =>
        child instanceof SpriteHighlightMorph
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
    this.receiveUserInteraction('mouse-departed');
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
        all = this.costumes.asArray().filter(each =>
            each !== ignoredCostume
        ).map(each => each.name);
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
        canvas = stage.fullImage();
        costume = new Costume(canvas, data);
    }
    this.addCostume(costume);
};

// SpriteMorph adding sounds

SpriteMorph.prototype.newSoundName = function (name, ignoredSound) {
    var ix = name.indexOf('('),
        stem = (ix < 0) ? name : name.substring(0, ix),
        count = 1,
        newName = stem,
        all = this.sounds.asArray().filter(each =>
            each !== ignoredSound
        ).map(each => each.name);
    while (contains(all, newName)) {
        count += 1;
        newName = stem + '(' + count + ')';
    }
    return newName;
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

SpriteHighlightMorph.prototype.init = function () {
    SpriteHighlightMorph.uber.init.call(this);
    this.isCachingImage = true;
};

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
StageMorph.prototype.enableInheritance = true;
StageMorph.prototype.enableSublistIDs = false;
StageMorph.prototype.enablePenLogging = false; // for SVG generation

// StageMorph instance creation

function StageMorph(globals) {
    this.init(globals);
}

StageMorph.prototype.init = function (globals) {
    this.name = localize('Stage');
    this.instrument = null;
    this.threads = new ThreadManager();
    this.variables = new VariableFrame(globals || null, this);
    this.scripts = new ScriptsMorph();
    this.customBlocks = [];
    this.globalBlocks = [];
    this.costumes = new List();
    this.costume = null;
    this.sounds = new List();
    this.version = Date.now(); // for observers
    this.isFastTracked = false;
    this.enableCustomHatBlocks = true;
    this.cloneCount = 0;

    this.timerStart = Date.now();
    this.tempo = 60; // bpm
    this.lastMessage = '';

    // volume and stereo-pan support, experimental:
    this.volume = 100;
    this.gainNode = null; // must be lazily initialized in Chrome, sigh...
    this.pan = 0;
    this.pannerNode = null; // must be lazily initialized in Chrome, sigh...

    // frequency player, experimental
    this.freqPlayer = null; // Note, to be lazily initialized

    this.watcherUpdateFrequency = 2;
    this.lastWatcherUpdate = Date.now();

    this.scale = 1; // for display modes, do not persist

    this.cachedHSV = [0, 0, 0]; // for background hsv support, not serialized

    this.keysPressed = {}; // for handling keyboard events, do not persist
    this.blocksCache = {}; // not to be serialized (!)
    this.paletteCache = {}; // not to be serialized (!)
    this.lastAnswer = ''; // last user input, do not persist
    this.activeSounds = []; // do not persist

    this.trailsCanvas = null;
    this.trailsLog = []; // each line being [p1, p2, color, width, cap]
    this.isThreadSafe = false;

    this.microphone = new Microphone(); // audio input, do not persist

    this.graphicsValues = {
        'color': 0,
        'fisheye': 0,
        'whirl': 0,
        'pixelate': 0,
        'mosaic': 0,
        'duplicate': 0,
        'negative': 0,
        'comic': 0,
        'confetti': 0,
        'saturation': 0,
        'brightness': 0
    };

    this.cachedPenTrailsMorph = null; // optimization, do not persist

    this.remixID = null;

    // projection layer - for video, maps, 3D extensions etc., transient
    this.projectionSource = null; // offscreen DOM element for video, maps, 3D
    this.getProjectionImage = null; // function to return a blittable image
    this.stopProjectionSource = null; // function to turn off video stream etc.
    this.continuousProjection = false; // turn ON for video
    this.projectionCanvas = null;
    this.projectionTransparency = 50;

    // video motion detection, transient
    this.mirrorVideo = true;
    this.videoMotion = null;

    // world map client - experimental, transient
    this.worldMap = new WorldMap();

    // Snap! API event listeners - experimental, transient
    this.messageCallbacks = {}; // name : [functions]

    StageMorph.uber.init.call(this);

    this.isCachingImage = true;
    this.cachedHSV = this.color.hsv();
    this.acceptsDrops = false;
    this.setColor(new Color(255, 255, 255));
    this.fps = this.frameRate;
};

// StageMorph scaling

StageMorph.prototype.setScale = function (number) {
    var delta = number / this.scale,
        pos = this.position(),
        relativePos,
        bubble;

    if (delta === 1) {return; }
    this.cachedPenTrailsMorph = null;
    this.scale = number;
    this.setExtent(this.dimensions.multiplyBy(number));

    // now move and resize all children - sprites, bubbles, watchers etc..
    this.children.forEach(morph => {
        relativePos = morph.position().subtract(pos);
        morph.fixLayout();
        morph.setPosition(
            relativePos.multiplyBy(delta).add(pos),
            true // just me (for nested sprites)
        );
        if (morph instanceof SpriteMorph) {
            morph.rerender();
            bubble = morph.talkBubble();
            if (bubble) {
                bubble.setScale(number);
                morph.positionTalkBubble();
            }
        } else if (morph instanceof StagePrompterMorph) {
            if (this.scale < 1) {
                morph.setWidth(this.width() - 10);
            } else {
                morph.setWidth(this.dimensions.x - 20);
            }
            morph.setCenter(this.center());
            morph.setBottom(this.bottom());
        }
    });
};

StageMorph.prototype.moveBy = function (delta) {
    // override the inherited method to skip attached sprite parts,
    // because they are also level-1 children of the stage and thus
    // will be moved individually
    var children = this.children,
        i = children.length;
    this.changed();
    this.bounds = this.bounds.translateBy(delta);
    this.changed();
    for (i; i > 0; i -= 1) {
        children[i - 1].moveBy(delta, true); // justMe - skip sprite parts
    }
};

// StageMorph rendering

StageMorph.prototype.render = function (ctx) {
    ctx.save();
    ctx.fillStyle = this.color.toString();
    ctx.fillRect(0, 0, this.width(), this.height());
    if (this.costume) {
        ctx.scale(this.scale, this.scale);
        ctx.drawImage(
            this.costume.contents,
            (this.width() / this.scale - this.costume.width()) / 2,
            (this.height() / this.scale - this.costume.height()) / 2
        );
        this.cachedImage = this.applyGraphicsEffects(this.cachedImage);
    }
    ctx.restore();
    this.version = Date.now(); // for observer optimization
};

StageMorph.prototype.drawOn = function (ctx, rect) {
    // draw pen trails and webcam layers
    var clipped = rect.intersect(this.bounds),
        pos, src, w, h, sl, st, ws, hs;

    if (!this.isVisible || !clipped.extent().gt(ZERO)) {
        return;
    }

    // costume, if any, and background color
    StageMorph.uber.drawOn.call(this, ctx, rect);

    pos = this.position();
    src = clipped.translateBy(pos.neg());
    sl = src.left();
    st = src.top();
    w = src.width();
    h = src.height();
    ws = w / this.scale;
    hs = h / this.scale;

    ctx.save();
    ctx.scale(this.scale, this.scale);

    // projection layer (e.g. webcam)
    if (this.projectionSource) {
        ctx.globalAlpha = 1 - (this.projectionTransparency / 100);
        ctx.drawImage(
            this.projectionLayer(),
            sl / this.scale,
            st / this.scale,
            ws,
            hs,
            clipped.left() / this.scale,
            clipped.top() / this.scale,
            ws,
            hs
        );
        this.version = Date.now(); // update watcher icons
    }

    // pen trails
    ctx.globalAlpha = 1;
    ctx.drawImage(
        this.penTrails(),
        sl / this.scale,
        st / this.scale,
        ws,
        hs,
        clipped.left() / this.scale,
        clipped.top() / this.scale,
        ws,
        hs
    );

    ctx.restore();
};

StageMorph.prototype.clearPenTrails = function () {
    this.cachedPenTrailsMorph = null;
    this.trailsCanvas = newCanvas(this.dimensions, null, this.trailsCanvas);
    this.trailsLog = [];
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
    var morph, trails, ctx;

    if (this.cachedPenTrailsMorph) {
        return this.cachedPenTrailsMorph;
    }
    morph = new Morph();
    morph.isCachingImage = true;
    trails = this.penTrails();
    morph.bounds = this.bounds.copy();
    morph.cachedImage = newCanvas(this.extent(), true);
    ctx = morph.cachedImage.getContext('2d');
    ctx.drawImage(
        trails,
        0,
        0,
        trails.width,
        trails.height,
        0,
        0,
        this.width(),
        this.height()
    );
    this.cachedPenTrailsMorph = morph;
    return morph;
};

StageMorph.prototype.projectionLayer = function () {
    if (!this.projectionCanvas) {
        this.projectionCanvas = newCanvas(this.dimensions, true);
    }
    return this.projectionCanvas;
};

StageMorph.prototype.clearProjectionLayer = function () {
    this.projectionCanvas = null;
    this.changed();
};

// StageMorph video capture

StageMorph.prototype.startVideo = function() {
    var myself = this;

    function noCameraSupport() {
        var dialog = new DialogBoxMorph();
        dialog.inform(
            localize('Camera not supported'),
            localize('Please make sure your web browser is up to date\n' +
                'and your camera is properly configured. \n\n' +
                'Some browsers also require you to access Snap!\n' +
                'through HTTPS to use the camera.\n\n' +
                'Please replace the "http://" part of the address\n' +
                'in your browser by "https://" and try again.'),
            this.world
        );
        dialog.fixLayout();
        if (myself.projectionSource) {
            myself.projectionSource.remove();
            myself.projectionSource = null;
        }
    }
    if (this.projectionSource) { // video capture has already been started
        return;
    }

    this.projectionSource = document.createElement('video');
    this.projectionSource.width = this.dimensions.x;
    this.projectionSource.height = this.dimensions.y;
    this.projectionSource.hidden = true;
    document.body.appendChild(this.projectionSource);
    if (!this.videoMotion) {
        this.videoMotion = new VideoMotion(
            this.dimensions.x,
            this.dimensions.y
        );
    }
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                myself.getProjectionImage = myself.getVideoImage;
                myself.stopProjectionSource = myself.stopVideo;
                myself.continuousProjection = true;
                myself.projectionSource.srcObject = stream;
                myself.projectionSource.play().catch(noCameraSupport);
                myself.projectionSource.stream = stream;
            })
            .catch(noCameraSupport);
    }
};

StageMorph.prototype.getVideoImage = function () {
    return this.projectionSource;
};

StageMorph.prototype.stopVideo = function() {
    if (this.projectionSource && this.projectionSource.stream) {
        this.projectionSource.stream.getTracks().forEach(track =>
            track.stop()
        );
    }
    this.videoMotion = null;
};

StageMorph.prototype.stopProjection = function() {
    if (this.projectionSource) {
        this.stopProjectionSource();
        this.projectionSource.remove();
        this.projectionSource = null;
        this.continuousProjection = false;
    }
    this.clearProjectionLayer();
};

StageMorph.prototype.projectionSnap = function() {
    var snap = newCanvas(this.dimensions, true),
        ctx = snap.getContext('2d');
    ctx.drawImage(this.projectionLayer(), 0, 0);
    return new Costume(snap, this.newCostumeName(localize('snap')));
};

// StageMorph pixel access:

StageMorph.prototype.getPixelColor = function (aPoint) {
    var point, context, data;
	if (this.trailsCanvas) {
        point = aPoint.subtract(this.bounds.origin);
        context = this.penTrailsMorph().getImage().getContext('2d');
        data = context.getImageData(point.x, point.y, 1, 1);
        if (data.data[3] === 0) {
            if (this.projectionCanvas) {
                point = point.divideBy(this.scale);
                context = this.projectionCanvas.getContext('2d');
                data = context.getImageData(point.x, point.y, 1, 1);
                return new Color(
                    data.data[0],
                    data.data[1],
                    data.data[2],
                    data.data[3] / 255
                );
            }
        	return StageMorph.uber.getPixelColor.call(this, aPoint);
        }
        return new Color(
            data.data[0],
            data.data[1],
            data.data[2],
            data.data[3] / 255
        );
 	}
};

// StageMorph accessing

StageMorph.prototype.watchers = function (leftPos) {
/*
    answer an array of all currently visible watchers.
    If leftPos is specified, filter the list for all
    shown or hidden watchers whose left side equals
    the given border (for automatic positioning)
*/
    return this.children.filter(morph => {
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

// StageMorph Mouse Coordinates

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
    var current, elapsed, leftover, ide, world = this.world();

    // handle keyboard events
    if (world.keyboardFocus === null) {
        world.keyboardFocus = this;
    }
    if (world.currentKey === null) {
        this.keyPressed = null;
    }

    // manage threads
    if (this.enableCustomHatBlocks) {
        this.stepGenericConditions();
    }
    if (this.isFastTracked && this.threads.processes.length) {
        while (this.isFastTracked && (Date.now() - this.lastTime) < 15) {
            this.threads.step(); // approx. 67 fps
        }
        this.changed();
    } else {
        this.threads.step();

        // single-stepping hook:
        if (this.threads.wantsToPause) {
            ide = this.parentThatIsA(IDE_Morph);
            if (ide) {
                ide.controlBar.pauseButton.refresh();
            }
        }
    }

    // update watchers
    current = Date.now();
    elapsed = current - this.lastWatcherUpdate;
    leftover = (1000 / this.watcherUpdateFrequency) - elapsed;
    if (leftover < 1) {
        this.watchers().forEach(w => w.update());
        this.lastWatcherUpdate = Date.now();
    }

    // projection layer update (e.g. video frame capture)
    if (this.continuousProjection && this.projectionSource) {
        this.updateProjection();
    }
};

StageMorph.prototype.updateProjection = function () {
    var context = this.projectionLayer().getContext('2d');
    context.save();
    if (this.mirrorVideo) {
        context.translate(this.dimensions.x, 0);
        context.scale(-1, 1);
    }
    context.drawImage(
        this.getProjectionImage(),
        0,
        0,
        this.projectionSource.width,
        this.projectionSource.height
    );
    if (this.videoMotion) {
        this.videoMotion.addFrame(
            context.getImageData(
                0,
                0,
                this.projectionSource.width,
                this.projectionSource.height
            ).data
        );
    }
    context.restore();
    this.changed();
};

StageMorph.prototype.stepGenericConditions = function (stopAll) {
    var hatCount = 0,
        ide;
    this.children.concat(this).forEach(morph => {
        if (isSnapObject(morph)) {
            morph.allGenericHatBlocks().forEach(block => {
                hatCount += 1;
                this.threads.doWhen(block, morph, stopAll);
            });
        }
    });
    if (!hatCount) {
        this.enableCustomHatBlocks = false;
        ide = this.parentThatIsA(IDE_Morph);
        if (ide) {
            ide.controlBar.stopButton.refresh();
        }
    }
};

StageMorph.prototype.developersMenu = function () {
    var menu = StageMorph.uber.developersMenu.call(this);
    menu.addItem(
        "stop",
        () => this.threads.stopAll(),
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
        } else if (event.shiftKey) {
            keyName = 'shift enter';
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
        keyName = event.key || String.fromCharCode(
            event.keyCode || event.charCode
        );
        if (event.ctrlKey || event.metaKey) {
            keyName = 'ctrl ' + (event.shiftKey ? 'shift ' : '') + keyName;
        }
    }
    action.call(this, keyName);
};

StageMorph.prototype.fireKeyEvent = function (key) {
    var evt = key.toLowerCase(),
        procs = [],
        ide = this.parentThatIsA(IDE_Morph);

    this.keysPressed[evt] = true;
    if (evt === 'ctrl enter' && !ide.isAppMode) {
        return this.fireGreenFlagEvent();
    }
    if (evt === 'shift enter') {
        return this.editScripts();
    }
    if (evt === 'ctrl f') {
        if (!ide.isAppMode) {ide.currentSprite.searchBlocks(); }
        return;
    }
    if (evt === 'ctrl z') {
        if (!ide.isAppMode) {ide.currentSprite.scripts.undrop(); }
         return;
    }
    if (evt === 'ctrl shift z' || (evt === 'ctrl y')) {
        if (!ide.isAppMode) {ide.currentSprite.scripts.redrop(); }
         return;
    }
    if (evt === 'ctrl n') {
        if (!ide.isAppMode) {ide.createNewProject(); }
        return;
    }
    if (evt === 'ctrl o') {
        if (!ide.isAppMode) {ide.openProjectsBrowser(); }
        return;
    }
    if (evt === 'ctrl s') {
        if (!ide.isAppMode) {ide.save(); }
        return;
    }
    if (evt === 'ctrl shift s') {
        if (!ide.isAppMode) {return ide.saveProjectsBrowser(); }
        return;
    }
    if (evt === 'esc' && !ide.isAppMode) {
        return this.fireStopAllEvent();
    }
    this.children.concat(this).forEach(morph => {
        if (isSnapObject(morph)) {
            morph.allHatBlocksForKey(evt).forEach(block =>
                procs.push(this.threads.startProcess(
                    block,
                    morph,
                    true // ignore running scripts, was: myself.isThreadSafe
                ))
            );
        }
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
        ide = this.parentThatIsA(IDE_Morph);

    this.removeAllClones();
    this.children.concat(this).forEach(morph => {
        if (isSnapObject(morph)) {
            morph.allHatBlocksFor('__shout__go__').forEach(block =>
                procs.push(this.threads.startProcess(
                    block,
                    morph,
                    this.isThreadSafe
                ))
            );
        }
    });
    if (ide) {
        ide.controlBar.pauseButton.refresh();
    }
    return procs;
};

StageMorph.prototype.fireStopAllEvent = function () {
    var ide = this.parentThatIsA(IDE_Morph);

    this.threads.resumeAll(this.stage);

    // experimental: run one step of a user-defined script
    this.runStopScripts();

    this.keysPressed = {};
    this.threads.stopAll();
    this.stopAllActiveSounds();
    this.children.forEach(morph => {
        if (morph.stopTalking) {
            morph.stopTalking();
        }
    });
    this.removeAllClones();
    if (ide) {
        ide.nextSteps([
            nop,
            () => this.stopAllActiveSounds(), // catch forever loops
            () => this.stopProjection(),
            () => ide.controlBar.pauseButton.refresh()
        ]);
    }
};

StageMorph.prototype.runStopScripts = function () {
    // experimental: Allow each sprite to run one last step before termination
    // usage example: Stop a robot or device associated with the sprite
    this.receiveUserInteraction('stopped', true, true);
    this.children.forEach(morph => {
        if (morph instanceof SpriteMorph) {
            morph.receiveUserInteraction('stopped', true, true);
        }
    });
};

StageMorph.prototype.removeAllClones = function () {
    var clones = this.children.filter(morph =>
            morph instanceof SpriteMorph && morph.isTemporary
        );
    clones.forEach(clone => {
        this.threads.stopAllForReceiver(clone);
        clone.detachFromAnchor();
        clone.corpsify();
        clone.destroy();
    });
    this.cloneCount = 0;
};

StageMorph.prototype.editScripts = function () {
    var ide = this.parentThatIsA(IDE_Morph),
        scripts,
        sorted;
    if (ide.isAppMode || !ScriptsMorph.prototype.enableKeyboard) {return; }
    scripts = this.parentThatIsA(
        IDE_Morph
    ).currentSprite.scripts.selectForEdit(); // shadow on edit, if inherited
    scripts.edit(scripts.position());
    sorted = scripts.focus.sortedScripts();
    if (sorted.length) {
        scripts.focus.element = sorted[0];
        if (scripts.focus.element instanceof HatBlockMorph) {
            scripts.focus.nextCommand();
        }
    } else {
        scripts.focus.moveBy(new Point(50, 50));
    }
    scripts.focus.fixLayout();
};

// StageMorph controlling generic WHEN hats

StageMorph.prototype.pauseGenericHatBlocks = function () {
    var ide = this.parentThatIsA(IDE_Morph);
    if (this.hasGenericHatBlocks() ||
            ide.sprites.asArray().some(any => any.hasGenericHatBlocks())) {
        this.enableCustomHatBlocks = true;
        this.threads.pauseCustomHatBlocks = true;
        ide.controlBar.stopButton.refresh();
    }
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

    function variableBlock(varName, isLocal) {
        var newBlock = SpriteMorph.prototype.variableBlock(varName, isLocal);
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
            var ide;
            if (myself.isVariableNameInUse(pair[0])) {
                myself.inform('that name is already in use');
            } else {
                ide = myself.parentThatIsA(IDE_Morph);
                myself.addVariable(pair[0], pair[1]);
                myself.toggleVariableWatcher(pair[0], pair[1]);
                myself.blocksCache[cat] = null;
                myself.paletteCache[cat] = null;
                ide.refreshPalette();
                ide.recordUnsavedChanges();
            }
        }
    }

    if (cat === 'motion') {

        txt = new TextMorph(localize(
            'Stage selected:\nno motion primitives'
        ));
        txt.fontSize = 9;
        txt.setColor(this.paletteTextColor);
        blocks.push(txt);
        blocks.push('=');
        blocks.push(this.makeBlockButton(cat));

    } else if (cat === 'looks') {

        blocks.push(block('doSwitchToCostume'));
        blocks.push(block('doWearNextCostume'));
        blocks.push(watcherToggle('getCostumeIdx'));
        blocks.push(block('getCostumeIdx'));
        blocks.push('-');
        blocks.push(block('reportGetImageAttribute'));
        blocks.push(block('reportNewCostumeStretched'));
        blocks.push(block('reportNewCostume'));
        blocks.push('-');
        blocks.push(block('changeEffect'));
        blocks.push(block('setEffect'));
        blocks.push(block('clearEffects'));
        blocks.push(block('getEffect'));
        blocks.push('-');
        blocks.push(block('show'));
        blocks.push(block('hide'));
        blocks.push(watcherToggle('reportShown'));
        blocks.push(block('reportShown'));

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
            blocks.push(block('log'));
            blocks.push(block('alert'));
            blocks.push('-');
            blocks.push(block('doScreenshot'));
        }

    /////////////////////////////////

        blocks.push('=');
        blocks.push(this.makeBlockButton(cat));

    } else if (cat === 'sound') {

        blocks.push(block('playSound'));
        blocks.push(block('doPlaySoundUntilDone'));
        blocks.push(block('doStopAllSounds'));
        blocks.push('-');
        blocks.push(block('doPlaySoundAtRate'));
        blocks.push(block('reportGetSoundAttribute'));
        blocks.push(block('reportNewSoundFromSamples'));
        blocks.push('-');
        blocks.push(block('doRest'));
        blocks.push(block('doPlayNote'));
        blocks.push(block('doSetInstrument'));
        blocks.push('-');
        blocks.push(block('doChangeTempo'));
        blocks.push(block('doSetTempo'));
        blocks.push(watcherToggle('getTempo'));
        blocks.push(block('getTempo'));
        blocks.push('-');
        blocks.push(block('changeVolume'));
        blocks.push(block('setVolume'));
        blocks.push(watcherToggle('getVolume'));
        blocks.push(block('getVolume'));
        blocks.push('-');
        blocks.push(block('changePan'));
        blocks.push(block('setPan'));
        blocks.push(watcherToggle('getPan'));
        blocks.push(block('getPan'));
        blocks.push('-');
        blocks.push(block('playFreq'));
        blocks.push(block('stopFreq'));

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
            blocks.push(block('doPlayFrequency'));
        }

    /////////////////////////////////

        blocks.push('=');
        blocks.push(this.makeBlockButton(cat));

    } else if (cat === 'pen') {

        blocks.push(block('clear'));
        blocks.push('-');
        blocks.push(block('setBackgroundColor'));
        blocks.push(block('changeBackgroundHSVA'));
        blocks.push(block('setBackgroundHSVA'));
        blocks.push('-');
        blocks.push(block('reportPenTrailsAsCostume'));
        blocks.push('-');
        blocks.push(block('doPasteOn'));
        blocks.push(block('doCutFrom'));
        blocks.push('=');
        blocks.push(this.makeBlockButton(cat));

    } else if (cat === 'control') {

        blocks.push(block('receiveGo'));
        blocks.push(block('receiveKey'));
        blocks.push(block('receiveInteraction'));
        blocks.push(block('receiveCondition'));
        blocks.push(block('receiveMessage'));
        blocks.push('-');
        blocks.push(block('doBroadcast'));
        blocks.push(block('doBroadcastAndWait'));
        blocks.push(block('doSend'));
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
        blocks.push(block('doFor'));
        blocks.push('-');
        blocks.push(block('doIf'));
        blocks.push(block('doIfElse'));
        blocks.push(block('reportIfElse'));
        blocks.push('-');
        blocks.push(block('doReport'));
        blocks.push(block('doStopThis'));
        blocks.push('-');
        blocks.push(block('doRun'));
        blocks.push(block('fork'));
        blocks.push(block('evaluate'));
        blocks.push('-');
        blocks.push(block('doTellTo'));
        blocks.push(block('reportAskFor'));
        blocks.push('-');
        blocks.push(block('doCallCC'));
        blocks.push(block('reportCallCC'));
        blocks.push('-');
        blocks.push(block('createClone'));
        blocks.push(block('newClone'));
        blocks.push('-');
        blocks.push(block('doPauseAll'));
        blocks.push('=');
        blocks.push(this.makeBlockButton(cat));

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
        blocks.push(block('reportAspect'));
        blocks.push('-');
        blocks.push(block('doResetTimer'));
        blocks.push(watcherToggle('getTimer'));
        blocks.push(block('getTimer'));
        blocks.push('-');
        blocks.push(block('reportAttributeOf'));

        if (SpriteMorph.prototype.enableFirstClass) {
            blocks.push(block('reportGet'));
        }

        blocks.push(block('reportObject'));
        blocks.push('-');
        blocks.push(block('reportURL'));
        blocks.push(block('reportAudio'));
        blocks.push(block('reportVideo'));
        blocks.push(block('doSetVideoTransparency'));
        blocks.push('-');
        blocks.push(block('reportGlobalFlag'));
        blocks.push(block('doSetGlobalFlag'));
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
            blocks.push(watcherToggle('reportThreadCount'));
            blocks.push(block('reportThreadCount'));
            blocks.push(block('reportStackSize'));
            blocks.push(block('reportFrameCount'));
            blocks.push(block('reportYieldCount'));
        }

    /////////////////////////////////

        blocks.push('=');
        blocks.push(this.makeBlockButton(cat));

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
        blocks.push(block('reportPower'));
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
        blocks.push(block('reportBoolean'));
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

        if (true) { // (Process.prototype.enableJS) {
            blocks.push('-');
            blocks.push(block('reportJSFunction'));
            if (Process.prototype.enableCompiling) {
                blocks.push(block('reportCompiled'));
            }
        }

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

        blocks.push('=');
        blocks.push(this.makeBlockButton(cat));

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
                        myself.deleteVariable,
                        null,
                        myself
                    );
                    myself.variables.allNames().forEach(name =>
                        menu.addItem(
                            name,
                            name,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            true // verbatim - don't translate
                        )
                    );
                    menu.popUpAtHand(myself.world());
                },
                'Delete a variable'
            );
            blocks.push(button);
        }

        blocks.push('-');

        varNames = this.reachableGlobalVariableNames(true);
        if (varNames.length > 0) {
            varNames.forEach(name => {
                blocks.push(variableWatcherToggle(name));
                blocks.push(variableBlock(name));
            });
            blocks.push('-');
        }

        varNames = this.allLocalVariableNames(true);
        if (varNames.length > 0) {
            varNames.forEach(name => {
                blocks.push(variableWatcherToggle(name));
                blocks.push(variableBlock(name, true));
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
        blocks.push(block('reportNumbers'));
        blocks.push('-');
        blocks.push(block('reportCONS'));
        blocks.push(block('reportListItem'));
        blocks.push(block('reportCDR'));
        blocks.push('-');
        blocks.push(block('reportListAttribute'));
        blocks.push(block('reportListIndex'));
        blocks.push(block('reportListContainsItem'));
        blocks.push(block('reportListIsEmpty'));
        blocks.push('-');
        blocks.push(block('reportMap'));
        blocks.push(block('reportKeep'));
        blocks.push(block('reportFindFirst'));
        blocks.push(block('reportCombine'));
        blocks.push('-');
        blocks.push(block('doForEach'));
        blocks.push('-');
        blocks.push(block('reportConcatenatedLists'));
        blocks.push(block('reportReshape'));
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
            blocks.push(block('doShowTable'));
        }

    /////////////////////////////////

        blocks.push('=');

        if (StageMorph.prototype.enableCodeMapping) {
            blocks.push(block('doMapCodeOrHeader'));
            blocks.push(block('doMapValueCode'));
            blocks.push(block('doMapListCode'));
            blocks.push('-');
            blocks.push(block('reportMappedCode'));
            blocks.push('=');
        }

        blocks.push(this.makeBlockButton());
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
        menu = new MenuMorph(this);

    if (ide && ide.isAppMode) {
        // menu.addItem('help', 'nop');
        return menu;
    }
    menu.addItem("edit", 'edit');
    menu.addItem("show all", 'showAll');
    menu.addItem(
        "pic...",
        () => ide.saveCanvasAs(this.fullImage(), this.name),
        'save a picture\nof the stage'
    );
    menu.addLine();
    menu.addItem(
        'pen trails',
        () => {
            var costume = ide.currentSprite.reportPenTrailsAsCostume().copy();
            ide.currentSprite.addCostume(costume);
            ide.currentSprite.wearCostume(costume);
            ide.hasChangedMedia = true;
            ide.spriteBar.tabBar.tabTo('costumes');
        },
        ide.currentSprite instanceof SpriteMorph ?
            'turn all pen trails and stamps\n' +
                'into a new costume for the\ncurrently selected sprite'
                    : 'turn all pen trails and stamps\n' +
                        'into a new background for the stage'
    );
    if (this.trailsLog.length) {
        menu.addItem(
            'svg...',
            'exportTrailsLogAsSVG',
            'export pen trails\nline segments as SVG'
        );
    }
    return menu;
};

StageMorph.prototype.showAll = function () {
    this.children.forEach(m => {
        if (m instanceof SpriteMorph) {
            if (!m.anchor) {
                m.show();
                m.keepWithin(this);
            }
        } else {
            m.show();
            m.keepWithin(this);
            if (m.fixLayout) {m.fixLayout(); }
        }
    });
};

StageMorph.prototype.edit = SpriteMorph.prototype.edit;

StageMorph.prototype.fullImage = Morph.prototype.fullImage;

// StageMorph thumbnail

StageMorph.prototype.thumbnail = function (extentPoint, recycleMe, noWatchers) {
    // answer a new Canvas of extentPoint dimensions containing
    // my thumbnail representation keeping the originial aspect ratio
    // a "recycleMe canvas can be passed for re-use
    return this.fancyThumbnail(extentPoint, null, false, recycleMe, noWatchers);
};

StageMorph.prototype.fancyThumbnail = function (
    extentPoint,
    excludedSprite,
    nonRetina,
    recycleMe,
    noWatchers
) {
    var src = this.getImage(),
        scale = Math.min(
            (extentPoint.x / src.width),
            (extentPoint.y / src.height)
        ),
        trg = newCanvas(extentPoint, nonRetina, recycleMe),
        ctx = trg.getContext('2d'),
        fb,
        fimg;

    ctx.save();
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
    if (this.projectionSource) {
        ctx.save();
        ctx.globalAlpha = 1 - (this.projectionTransparency / 100);
        ctx.drawImage(
            this.projectionLayer(),
            0,
            0,
            this.dimensions.x * this.scale,
            this.dimensions.y * this.scale
        );
        ctx.restore();
    }
    this.children.forEach(morph => {
        if ((isSnapObject(morph) || !noWatchers) && morph.isVisible && (morph !== excludedSprite)) {
            fb = morph.fullBounds();
            fimg = morph.fullImage();
            if (fimg.width && fimg.height) {
                ctx.drawImage(
                    morph.fullImage(),
                    fb.origin.x - this.bounds.origin.x,
                    fb.origin.y - this.bounds.origin.y
                );
            }
        }
    });
    ctx.restore();
    return trg;
};

// StageMorph - exporting the pen trails as SVG

StageMorph.prototype.exportTrailsLogAsSVG = function () {
    var ide = this.parentThatIsA(IDE_Morph);

    ide.saveFileAs(
        this.trailsLogAsSVG().src,
        'image/svg',
        ide.projectName || this.name
    );
};

StageMorph.prototype.trailsLogAsSVG = function () {
    var bottomLeft = this.trailsLog[0][0],
        topRight = bottomLeft,
        maxWidth = this.trailsLog[0][3],
        shift,
        box,
        p1, p2,
        svg;

    // determine bounding box and max line width
    this.trailsLog.forEach(line => {
        bottomLeft = bottomLeft.min(line[0]);
        bottomLeft = bottomLeft.min(line[1]);
        topRight = topRight.max(line[0]);
        topRight = topRight.max(line[1]);
        maxWidth = Math.max(maxWidth, line[3]);
    });
    box = bottomLeft.corner(topRight).expandBy(maxWidth / 2);
    shift = new Point(-bottomLeft.x, topRight.y).translateBy(maxWidth / 2);
    svg = '<svg xmlns="http://www.w3.org/2000/svg" ' +
        'preserveAspectRatio="none" ' +
        'viewBox="0 0 ' + box.width() + ' ' + box.height() + '" ' +
        'width="' + box.width() + '" height="' + box.height() + '" ' +
        // 'style="background-color:black" ' + // for supporting backgrounds
        '>';
    svg += '<!-- Generated by Snap! - http://snap.berkeley.edu/ -->';

    // for debugging the viewBox:
    // svg += '<rect width="100%" height="100%" fill="black"/>'

    this.trailsLog.forEach(line => {
        p1 = this.normalizePoint(line[0]).translateBy(shift);
        p2 = this.normalizePoint(line[1]).translateBy(shift);
        svg += '<line x1="' + p1.x + '" y1="' + p1.y +
            '" x2="' + p2.x + '" y2="' + p2.y + '" ' +
            'style="stroke:' + line[2].toRGBstring() + ';' +
            'stroke-opacity:' + line[2].a + ';' +
            'stroke-width:' + line[3] +
            ';stroke-linecap:' + line[4] +
            '" />';
    });
    svg += '</svg>';
    return {
        src : svg,
        rot : new Point(-box.origin.x, box.corner.y)
    };
};

StageMorph.prototype.normalizePoint = function (snapPoint) {
    return new Point(snapPoint.x, -snapPoint.y);
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

StageMorph.prototype.reportShown = SpriteMorph.prototype.reportShown;

// StageMorph cloning override

StageMorph.prototype.createClone = nop;
StageMorph.prototype.newClone = nop;

// StageMorph background color setting

StageMorph.prototype.setColorComponentHSVA = function (idx, num) {
    var n = +num;

    idx = +idx;
    if (idx < 0 || idx > 3) {return; }
    if (idx == 0) {
        if (n < 0 || n > 100) { // wrap the hue
            n = (n < 0 ? 100 : 0) + n % 100;
        }
    } else {
        n = Math.min(100, Math.max(0, n));
    }
    if (idx === 3) {
        this.color.a = 1 - n / 100;
    } else {
        this.cachedHSV[idx] = n / 100;
        this.color.set_hsv.apply(this.color, this.cachedHSV);
    }
    this.rerender();
};

StageMorph.prototype.getColorComponentHSLA
    = SpriteMorph.prototype.getColorComponentHSLA;

StageMorph.prototype.changeColorComponentHSVA
    = SpriteMorph.prototype.changeColorComponentHSVA;

StageMorph.prototype.setColor = function (aColor) {
    if (!this.color.eq(aColor, true)) { // observeAlpha
        this.color = aColor.copy();
        this.rerender();
        this.cachedHSV = this.color.hsv();
    }
};

StageMorph.prototype.setBackgroundColor = StageMorph.prototype.setColor;

StageMorph.prototype.getPenAttribute
    = SpriteMorph.prototype.getPenAttribute;

// StageMorph printing on another sprite:

StageMorph.prototype.blitOn = SpriteMorph.prototype.blitOn;

// StageMorph pseudo-inherited behavior

StageMorph.prototype.categories = SpriteMorph.prototype.categories;
StageMorph.prototype.blockColor = SpriteMorph.prototype.blockColor;
StageMorph.prototype.paletteColor = SpriteMorph.prototype.paletteColor;
StageMorph.prototype.setName = SpriteMorph.prototype.setName;
StageMorph.prototype.makeBlockButton = SpriteMorph.prototype.makeBlockButton;
StageMorph.prototype.makeBlock = SpriteMorph.prototype.makeBlock;
StageMorph.prototype.palette = SpriteMorph.prototype.palette;
StageMorph.prototype.freshPalette = SpriteMorph.prototype.freshPalette;
StageMorph.prototype.blocksMatching = SpriteMorph.prototype.blocksMatching;
StageMorph.prototype.searchBlocks = SpriteMorph.prototype.searchBlocks;
StageMorph.prototype.reporterize = SpriteMorph.prototype.reporterize;
StageMorph.prototype.variableBlock = SpriteMorph.prototype.variableBlock;
StageMorph.prototype.showingWatcher = SpriteMorph.prototype.showingWatcher;
StageMorph.prototype.addVariable = SpriteMorph.prototype.addVariable;
StageMorph.prototype.deleteVariable = SpriteMorph.prototype.deleteVariable;

// StageMorph neighbor detection

StageMorph.prototype.neighbors = SpriteMorph.prototype.neighbors;
StageMorph.prototype.perimeter = SpriteMorph.prototype.perimeter;

// StageMorph block rendering

StageMorph.prototype.doScreenshot = SpriteMorph.prototype.doScreenshot;
StageMorph.prototype.newCostumeName = SpriteMorph.prototype.newCostumeName;
StageMorph.prototype.blockForSelector = SpriteMorph.prototype.blockForSelector;

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

StageMorph.prototype.getEffect
    = SpriteMorph.prototype.getEffect;

StageMorph.prototype.getGhostEffect
    = SpriteMorph.prototype.getGhostEffect;

StageMorph.prototype.changeEffect
    = SpriteMorph.prototype.changeEffect;

StageMorph.prototype.clearEffects
    = SpriteMorph.prototype.clearEffects;

// StageMorph sound management

StageMorph.prototype.addSound
    = SpriteMorph.prototype.addSound;

StageMorph.prototype.doPlaySound
    = SpriteMorph.prototype.doPlaySound;

StageMorph.prototype.stopAllActiveSounds = function () {
    this.activeSounds.forEach(audio => audio.pause());
    this.activeSounds = [];
    if (this.microphone.modifier && this.microphone.isReady) {
        this.microphone.stop();
    }
};

StageMorph.prototype.pauseAllActiveSounds = function () {
    this.activeSounds.forEach(audio => audio.pause());
};

StageMorph.prototype.resumeAllActiveSounds = function () {
    this.activeSounds.forEach(audio => audio.play());
};

StageMorph.prototype.reportSounds
    = SpriteMorph.prototype.reportSounds;

StageMorph.prototype.newSoundName
    = SpriteMorph.prototype.newSoundName;

// StageMorph volume

StageMorph.prototype.setVolume
    = SpriteMorph.prototype.setVolume;

StageMorph.prototype.changeVolume
    = SpriteMorph.prototype.changeVolume;

StageMorph.prototype.getVolume
    = SpriteMorph.prototype.getVolume;

StageMorph.prototype.getGainNode
    = SpriteMorph.prototype.getGainNode;

StageMorph.prototype.audioContext
    = SpriteMorph.prototype.audioContext;

// StageMorph stereo panning

StageMorph.prototype.setPan
    = SpriteMorph.prototype.setPan;

StageMorph.prototype.changePan
    = SpriteMorph.prototype.changePan;

StageMorph.prototype.getPan
    = SpriteMorph.prototype.getPan;

StageMorph.prototype.getPannerNode
    = SpriteMorph.prototype.getPannerNode;

// StageMorph frequency player

StageMorph.prototype.playFreq
    = SpriteMorph.prototype.playFreq;

StageMorph.prototype.stopFreq
    = SpriteMorph.prototype.stopFreq;

// StageMorph non-variable watchers

StageMorph.prototype.toggleWatcher
    = SpriteMorph.prototype.toggleWatcher;

StageMorph.prototype.showingWatcher
    = SpriteMorph.prototype.showingWatcher;

StageMorph.prototype.watcherFor =
    SpriteMorph.prototype.watcherFor;

StageMorph.prototype.getLastAnswer
    = SpriteMorph.prototype.getLastAnswer;

StageMorph.prototype.reportThreadCount
    = SpriteMorph.prototype.reportThreadCount;

// StageMorph coordinate conversion

StageMorph.prototype.snapPoint
    = SpriteMorph.prototype.snapPoint;

// StageMorph dimension getters

StageMorph.prototype.xCenter = function () {
    return 0;
};

StageMorph.prototype.yCenter = function () {
    return 0;
};

StageMorph.prototype.xLeft = function () {
    return this.dimensions.x * -0.5;
};

StageMorph.prototype.xRight = function () {
   return this.dimensions.x / 2;
};

StageMorph.prototype.yTop = function () {
    return this.dimensions.y / 2;
};

StageMorph.prototype.yBottom = function () {
   return this.dimensions.y * -0.5;
};

// StageMorph message broadcasting

StageMorph.prototype.allMessageNames
    = SpriteMorph.prototype.allMessageNames;

StageMorph.prototype.allSendersOf
    = SpriteMorph.prototype.allSendersOf;

StageMorph.prototype.allHatBlocksFor
    = SpriteMorph.prototype.allHatBlocksFor;

StageMorph.prototype.allHatBlocksForKey
    = SpriteMorph.prototype.allHatBlocksForKey;

StageMorph.prototype.allHatBlocksForInteraction
    = SpriteMorph.prototype.allHatBlocksForInteraction;

StageMorph.prototype.hasGenericHatBlocks
    = SpriteMorph.prototype.hasGenericHatBlocks;

StageMorph.prototype.allGenericHatBlocks
    = SpriteMorph.prototype.allGenericHatBlocks;

StageMorph.prototype.allScripts
    = SpriteMorph.prototype.allScripts;

// StageMorph events

StageMorph.prototype.mouseClickLeft
    = SpriteMorph.prototype.mouseClickLeft;

StageMorph.prototype.mouseEnter
    = SpriteMorph.prototype.mouseEnter;

StageMorph.prototype.mouseLeave = function () {
    this.receiveUserInteraction('mouse-departed');
};

StageMorph.prototype.mouseDownLeft
    = SpriteMorph.prototype.mouseDownLeft;

StageMorph.prototype.mouseScroll
    = SpriteMorph.prototype.mouseScroll;

StageMorph.prototype.receiveUserInteraction
    = SpriteMorph.prototype.receiveUserInteraction;

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

StageMorph.prototype.allInvocationsOf
    = SpriteMorph.prototype.allInvocationsOf;

StageMorph.prototype.allIndependentInvocationsOf
    = SpriteMorph.prototype.allInvocationsOf;

StageMorph.prototype.allDependentInvocationsOf
    = SpriteMorph.prototype.allInvocationsOf;

// StageMorph inheritance support - general

StageMorph.prototype.specimens = function () {
    return [];
};

StageMorph.prototype.allSpecimens = function () {
    return [];
};

StageMorph.prototype.shadowAttribute = nop;

// StageMorph inheritance support - attributes

StageMorph.prototype.inheritsAttribute = function () {
    return false;
};

// StageMorph inheritance support - variables

StageMorph.prototype.isVariableNameInUse
    = SpriteMorph.prototype.isVariableNameInUse;

StageMorph.prototype.globalVariables
    = SpriteMorph.prototype.globalVariables;

StageMorph.prototype.inheritedVariableNames = function () {
    return [];
};

StageMorph.prototype.allLocalVariableNames
	= SpriteMorph.prototype.allLocalVariableNames;

StageMorph.prototype.reachableGlobalVariableNames
	= SpriteMorph.prototype.reachableGlobalVariableNames;

// StageMorph inheritance - custom blocks

StageMorph.prototype.getMethod
    = SpriteMorph.prototype.getMethod;

StageMorph.prototype.getLocalMethod
    = SpriteMorph.prototype.getLocalMethod;

StageMorph.prototype.ownBlocks
    = SpriteMorph.prototype.ownBlocks;

StageMorph.prototype.allBlocks = function (valuesOnly) {
    var dict = this.ownBlocks();
    if (valuesOnly) {
        return Object.keys(dict).map(key => dict[key]);
    }
    return dict;
};

StageMorph.prototype.inheritedBlocks = function () {
    return [];
};

// StageMorph variable refactoring

StageMorph.prototype.hasSpriteVariable
    = SpriteMorph.prototype.hasSpriteVariable;

StageMorph.prototype.refactorVariableInstances
    = SpriteMorph.prototype.refactorVariableInstances;

// StageMorph pen trails as costume

StageMorph.prototype.reportPenTrailsAsCostume = function () {
    return new Costume(
        this.trailsCanvas,
        this.newCostumeName(localize('Background'))
    );
};

// StageMorph scanning global custom blocks for message sends

StageMorph.prototype.globalBlocksSending = function (message, receiverName) {
    // "transitive hull"
    var all = this.globalBlocks.filter(
            def =>def.isSending(message, receiverName)
        );
    this.globalBlocks.forEach(def => {
        if (def.collectDependencies().some(dep => contains(all, dep))) {
            all.push(def);
        }
    });
    return all;
};

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

function SpriteBubbleMorph(data, stage, isThought, isQuestion) {
    this.init(data, stage, isThought, isQuestion);
}

SpriteBubbleMorph.prototype.init = function (
    data,
    stage,
    isThought,
    isQuestion
) {
    var sprite = SpriteMorph.prototype;
    this.stage = stage;
    this.scale = stage ? stage.scale : 1;
    this.data = data;
    this.isQuestion = isQuestion;

    SpriteBubbleMorph.uber.init.call(
        this,
        this.data,
        sprite.bubbleColor,
        null,
        null,
        isQuestion ? sprite.blockColor.sensing : sprite.bubbleBorderColor,
        null,
        isThought,
        true // no shadow
    );

    this.isCachingImage = true;
    this.rerender();
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
        if (isSnapObject(data)) {
            img = data.thumbnail(new Point(40, 40));
            contents = new Morph();
            contents.isCachingImage = true;
            contents.bounds.setWidth(img.width);
            contents.bounds.setHeight(img.height);
            contents.cachedImage = img;
            contents.version = data.version;
            contents.step = function () {
                if (this.version !== data.version) {
                    img = data.thumbnail(new Point(40, 40), this.cachedImage);
                    this.cachedImage = img;
                    this.version = data.version;
                    this.changed();
                }
            };
        } else {
            contents = data;
        }
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
        contents.isCachingImage = true;
        contents.bounds.setWidth(img.width);
        contents.bounds.setHeight(img.height);
        contents.cachedImage = img;
    } else if (data instanceof Costume) {
        img = data.thumbnail(new Point(40, 40));
        contents = new Morph();
        contents.isCachingImage = true;
        contents.bounds.setWidth(img.width);
        contents.bounds.setHeight(img.height);
        contents.cachedImage = img;
    } else if (data instanceof Sound) {
        contents = new SymbolMorph('notes', 30);
    } else if (data instanceof HTMLCanvasElement) {
        img = data;
        contents = new Morph();
        contents.isCachingImage = true;
        contents.bounds.setWidth(img.width);
        contents.bounds.setHeight(img.height);
        contents.cachedImage = img;
    } else if (data instanceof List) {
        if (data.isTable()) {
            contents = new TableFrameMorph(new TableMorph(data, 10));
            if (this.stage) {
                contents.expand(this.stage.extent().translateBy(
                    -2 * (this.edge + this.border + this.padding)
                ));
            }
        } else {
            contents = new ListWatcherMorph(data);
            contents.update(true);
            contents.step = contents.update;
            if (this.stage) {
                contents.expand(this.stage.extent().translateBy(
                    -2 * (this.edge + this.border + this.padding)
                ));
            }
        }
        contents.isDraggable = false;
    } else if (data instanceof Context) {
        img = data.image();
        contents = new Morph();
        contents.isCachingImage = true;
        contents.bounds.setWidth(img.width);
        contents.bounds.setHeight(img.height);
        contents.cachedImage = img;
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
            contents.getImage(),
            0,
            0,
            scaledImg.width,
            scaledImg.height
        );
        contents.cachedImage = scaledImg;
        contents.bounds = contents.bounds.scaleBy(this.scale);
    }
    return contents;
};

// SpriteBubbleMorph scaling

SpriteBubbleMorph.prototype.setScale = function (scale) {
    this.scale = scale;
    this.changed();
    this.fixLayout();
    this.rerender();
};

// SpriteBubbleMorph layout:

SpriteBubbleMorph.prototype.fixLayout = function () {
    var sprite = SpriteMorph.prototype;

    // rebuild my contents
    if (!(this.contentsMorph instanceof ListWatcherMorph ||
            this.contentsMorph instanceof TableFrameMorph)) {
        this.contentsMorph.destroy();
        this.contentsMorph = this.dataAsMorph(this.data);
    }
    this.add(this.contentsMorph);

    // scale my settings
    this.edge = sprite.bubbleCorner * this.scale;
    this.border = sprite.bubbleBorder * this.scale;
    this.padding = sprite.bubbleCorner / 2 * this.scale;

    // adjust my dimensions
    this.bounds.setWidth(this.contentsMorph.width()
        + (this.padding ? this.padding * 2 : this.edge * 2));
    this.bounds.setHeight(this.contentsMorph.height()
        + this.edge
        + this.border * 2
        + this.padding * 2
        + 2);

    // position my contents
    this.contentsMorph.setPosition(this.position().add(
        new Point(
            this.padding || this.edge,
            this.border + this.padding + 1
        )
    ));
};

// Costume /////////////////////////////////////////////////////////////

/*
    I am a picture that's "wearable" by a sprite. My rotationCenter is
    relative to my contents position.
*/

// Costume instance creation

function Costume(canvas, name, rotationCenter, noFit) {
    this.contents = canvas ? normalizeCanvas(canvas, true)
            : newCanvas(null, true);
    if (!noFit) {this.shrinkToFit(this.maxExtent()); }
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
        pic = newCanvas(ext, true),
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

Costume.prototype.canvasBoundingBox = function (pic) {
    // answer the rectangle surrounding my contents' non-transparent pixels
    var row,
        col,
        w = pic.width,
        h = pic.height,
        ctx = pic.getContext('2d'),
        dta = ctx.getImageData(0, 0, w, h);

    function getAlpha(x, y) {
        return dta.data[((y * w * 4) + (x * 4)) + 3];
    }

    function getLeft() {
        for (col = 0; col < w; col += 1) {
            for (row = 0; row < h; row += 1) {
                if (getAlpha(col, row)) {
                    return col;
                }
            }
        }
        return 0;
    }

    function getTop() {
        for (row = 0; row < h; row += 1) {
            for (col = 0; col < w; col += 1) {
                if (getAlpha(col, row)) {
                    return row;
                }
            }
        }
        return 0;
    }

    function getRight() {
        for (col = w - 1; col >= 0; col -= 1) {
            for (row = h - 1; row >= 0; row -= 1) {
                if (getAlpha(col, row)) {
                    return Math.min(col + 1, w);
                }
            }
        }
        return w;
    }

    function getBottom() {
        for (row = h - 1; row >= 0; row -= 1) {
            for (col = w - 1; col >= 0; col -= 1) {
                if (getAlpha(col, row)) {
                    return Math.min(row + 1, h);
                }
            }
        }
        return h;
    }

    return new Rectangle(getLeft(), getTop(), getRight(), getBottom());
};

Costume.prototype.boundingBox = function () {
    return this.canvasBoundingBox(this.contents);
};

// Costume duplication

Costume.prototype.copy = function () {
    var canvas = newCanvas(this.extent(), true),
        cpy,
        ctx;
    ctx = canvas.getContext('2d');
    ctx.drawImage(this.contents, 0, 0);
    cpy = new Costume(canvas, this.name ? copy(this.name) : null);
    cpy.rotationCenter = this.rotationCenter.copy();
    return cpy;
};

// Costume flipping & stretching

Costume.prototype.flipped = function () {
/*
    answer a copy of myself flipped horizontally
    (mirrored along a vertical axis), used for
    SpriteMorph's rotation style type 2
*/
    var canvas = newCanvas(this.extent(), true),
        ctx = canvas.getContext('2d'),
        flipped;

    ctx.translate(this.width(), 0);
    ctx.scale(-1, 1);
    ctx.drawImage(this.contents, 0, 0);
    flipped = new Costume(
        canvas,
        this.name,
        new Point(
            this.width() - this.rotationCenter.x,
            this.rotationCenter.y
        )
    );
    return flipped;
};

Costume.prototype.stretched = function (w, h) {
    w = (Math.sign(w) || 1) * Math.max(1, Math.abs(w));
    h = (Math.sign(h) || 1) * Math.max(1, Math.abs(h));

    var canvas = newCanvas(new Point(Math.abs(w), Math.abs(h)), true),
        ctx = canvas.getContext('2d'),
        xRatio = w / this.width(),
        yRatio = h / this.height(),
        center = this.rotationCenter.multiplyBy(new Point(xRatio, yRatio)),
        stretched;

    if (xRatio < 0) {
        center.x = canvas.width - Math.abs(center.x);
    }
    if (yRatio < 0) {
        center.y = canvas.height - Math.abs(center.y);
    }

    ctx.translate(Math.abs(Math.min(w, 0)), Math.abs(Math.min(h, 0)));
    ctx.scale(xRatio, yRatio);
    // first rasterize in case it's an SVG and in case it's on Firefox
    // because Firefox prevents stretching of SVGs with locked aspect ratios
    ctx.drawImage(this.rasterized().contents, 0, 0);
    stretched = new Costume(
        canvas,
        this.name,
        center,
        true
    );
    return stretched;
};

// Costume actions

Costume.prototype.edit = function (aWorld, anIDE, isnew, oncancel, onsubmit) {
    var editor = new PaintEditorMorph();
    editor.oncancel = oncancel || nop;
    editor.openIn(
        aWorld,
        isnew ?
                newCanvas(StageMorph.prototype.dimensions, true) :
                this.contents,
        isnew ?
                null :
                this.rotationCenter,
        (img, rc) => {
            this.contents = img;
            this.rotationCenter = rc;
            this.version = Date.now();
            aWorld.changed();
            if (anIDE) {
                if (anIDE.currentSprite instanceof SpriteMorph) {
                    // don't shrinkwrap stage costumes
                    this.shrinkWrap();
                }
                anIDE.currentSprite.wearCostume(this, true); // don't shadow
                anIDE.hasChangedMedia = true;
            }
            (onsubmit || nop)();
        },
        anIDE
    );
};

Costume.prototype.editRotationPointOnly = function (aWorld, anIDE) {
    var editor = new CostumeEditorMorph(this),
        action,
        dialog,
        txt;

    editor.fixLayout();
    action = () => {
        editor.accept();
        anIDE.currentSprite.wearCostume(this, true); // don't shadow
    };
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
        WHITE
    );

    dialog.labelString = 'Costume Editor';
    dialog.createLabel();
    dialog.setPicture(editor);
    dialog.addBody(txt);
    dialog.addButton('ok', 'Ok');
    dialog.addButton('cancel', 'Cancel');
    dialog.fixLayout();
    dialog.popUp(aWorld);
};

// Costume thumbnail

Costume.prototype.shrinkToFit = function (extentPoint) {
    if (extentPoint.x < this.width() || (extentPoint.y < this.height())) {
        this.contents = this.thumbnail(extentPoint, null, true);
    }
};

Costume.prototype.thumbnail = function (extentPoint, recycleMe, noPadding) {
    // answer a new Canvas of extentPoint dimensions containing
    // my thumbnail representation keeping the originial aspect ratio
    // a "recycleMe canvas can be passed for re-use
    // if "noPadding" is "true" the resulting thumbnail fits inside the
    // given extentPoint without padding it, i.e. one of the dimensions
    // is likely to be lesser than that of the extentPoint
    var src = this.contents,
        w = src ? src.width : 1, // could be an asynchronously loading SVG
        h = src ? src.height : 1, // could be an asynchronously loading SVG
        scale = Math.min(
            (extentPoint.x / w),
            (extentPoint.y / h)
        ),
        xOffset = noPadding ? 0
            : Math.floor((extentPoint.x - (w * scale)) / 2),
        yOffset = noPadding ? 0
            : Math.floor((extentPoint.y - (h * scale)) / 2),
        trg, ctx;

    trg = newCanvas(
        noPadding ? new Point(this.width() * scale, this.height() * scale)
            : extentPoint,
        true, // non-retina
        recycleMe
    );
    if (!src || src.width + src.height === 0) {return trg; }
    ctx = trg.getContext('2d');
    ctx.save();
    ctx.scale(scale, scale);
    ctx.drawImage(
        src,
        Math.floor(xOffset / scale),
        Math.floor(yOffset / scale)
    );
    ctx.restore();
    return trg;
};

// Costume pixel access

Costume.prototype.rasterized = function () {
    return this;
};

Costume.prototype.pixels = function () {
    var pixels = [],
        src,
        i;

    if (!this.contents.width || !this.contents.height) {
        return pixels;
    }
    src = this.contents.getContext('2d').getImageData(
        0,
        0,
        this.contents.width,
        this.contents.height
    );
    for (i = 0; i < src.data.length; i += 4) {
        pixels.push(new List([
            src.data[i],
            src.data[i + 1],
            src.data[i + 2],
            src.data[i + 3]
        ]));
    }
    return new List(pixels);
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
    this.shapes = [];
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
    cpy.shapes = this.shapes.map(shape => shape.copy());
    return cpy;
};

// SVG_Costume flipping

/*
    Flipping is currently inherited from Costume, which rasterizes it.
    Therefore flipped SVG costumes may appear pixelated until we add
    a method to either truly flip SVGs or change the Sprite's render()
    method to scale the costume before flipping it.

    Stretching, OTOH, is achieved with real scaling and thus produces
    smooth, albeit rasterized results for vector graphics.
*/

// SVG_Costume thumbnail

SVG_Costume.prototype.shrinkToFit = function (extentPoint) {
    // overridden for unrasterized SVGs
    nop(extentPoint);
    return;
};

SVG_Costume.prototype.parseShapes = function () {
    // I try to parse my SVG as an editable collection of shapes
    var element = new XML_Element(),
        // remove 'data:image/svg+xml, ' from src
        contents = this.contents.src.replace(/^data:image\/.*?, */, '');

    if (this.contents.src.indexOf('base64') > -1) {
        contents = atob(contents);
    }

    element.parseString(contents);

    if (this.shapes.length === 0 && element.attributes.snap) {
        this.shapes = element.children.map(child =>
            window[child.attributes.prototype].fromSVG(child)
        );
    }
};

SVG_Costume.prototype.edit = function (
	aWorld,
    anIDE,
    isnew,
    oncancel,
    onsubmit
) {
    var editor = new VectorPaintEditorMorph(),
        myself = this;

    editor.oncancel = oncancel || nop;
    editor.openIn(
        aWorld,
        isnew ? newCanvas(StageMorph.prototype.dimensions) : this.contents,
        isnew ? new Point(240, 180) : this.rotationCenter,
        (img, rc, shapes) => {
            myself.contents = img;
            myself.rotationCenter = rc;
            myself.shapes = shapes;
            myself.version = Date.now();
            aWorld.changed();
            if (anIDE) {
                if (isnew) {anIDE.currentSprite.addCostume(myself); }
                anIDE.currentSprite.wearCostume(myself);
                anIDE.hasChangedMedia = true;
            }
            (onsubmit || nop)();
        },
        anIDE,
        this.shapes || []
    );
};

// SVG_Costume pixel access

SVG_Costume.prototype.rasterized = function () {
    var canvas = newCanvas(this.extent(), true),
        ctx = canvas.getContext('2d'),
        rasterized;

    ctx.drawImage(this.contents, 0, 0);
    rasterized = new Costume(
        canvas,
        this.name,
        this.rotationCenter.copy()
    );
    return rasterized;
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
    this.margin = ZERO;
    CostumeEditorMorph.uber.init.call(this);
};

// CostumeEditorMorph edit ops

CostumeEditorMorph.prototype.accept = function () {
    this.costume.rotationCenter = this.rotationCenter.copy();
    this.costume.version = Date.now();
};

// CostumeEditorMorph displaying

CostumeEditorMorph.prototype.fixLayout = function () {
    this.bounds.setExtent(this.size);
};

CostumeEditorMorph.prototype.render = function (ctx) {
    var rp;

    this.margin = this.size.subtract(this.costume.extent()).divideBy(2);
    rp = this.rotationCenter.add(this.margin);


    // draw the background
    if (!this.cachedTexture) {
        this.cachedTexture = this.createTexture();

    }
    this.renderCachedTexture(ctx);

    /*
    pattern = ctx.createPattern(this.background, 'repeat');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, this.size.x, this.size.y);
    */

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
    this.rerender();
};

CostumeEditorMorph.prototype.mouseMove
    = CostumeEditorMorph.prototype.mouseDownLeft;

// Sound /////////////////////////////////////////////////////////////

// Sound instance creation

function Sound(audio, name) {
    this.audio = audio; // mandatory
    this.name = name || "Sound";

    // cached samples, don't persist
    this.cachedSamples = null;

    // internal for decoding, don't persist
    this.audioBuffer = null; // for decoding ops
    this.isDecoding = false;

    // internal for deserializing, don't persist
    this.loaded = null; // for de-serialization only
}

Sound.prototype.play = function () {
    // return an instance of an audio element which can be terminated
    // externally (i.e. by the stage)
    // Note: only to be used by the GUI, not by scripts,
    // because no effects like volume or panning are applied
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

// I am a single musical note.
// alternatively I can be used to play a frequency in hz

// Note instance creation

function Note(pitch) {
    this.pitch = pitch === 0 ? 0 : pitch || 69;
    this.frequency = null; // alternative for playing a non-note frequency
    this.setupContext();
    this.oscillator = null;
    this.fader = null; // gain node for suppressing clicks
    this.ended = false; // for active sounds management
}

// Note shared properties

Note.prototype.audioContext = null;

Note.prototype.fadeIn = new Float32Array(2);
Note.prototype.fadeIn[0] = [0.0];
Note.prototype.fadeIn[1] = [0.2];

Note.prototype.fadeOut = new Float32Array(2);
Note.prototype.fadeOut[0] = [0.2];
Note.prototype.fadeOut[1] = [0.0];

Note.prototype.fadeTime = 0.01;

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
        if (!ctx.prototype.createGain) {
            ctx.prototype.createGain = ctx.prototype.createGainNode;
        }
        return ctx;
    }());
    if (!AudioContext) {
        throw new Error('Web Audio API is not supported\nin this browser');
    }
    Note.prototype.audioContext = new AudioContext();
};

Note.prototype.getAudioContext = function () {
    // lazily initializes and shares the Note prototype's audio context
    // to be used by all other Snap! objects requiring audio,
    // e.g. the microphone, the sprites, etc.
    if (!this.audioContext) {
        this.setupContext();
    }
    this.audioContext.resume();
    return this.audioContext;
};

// Note playing

Note.prototype.play = function (type, gainNode, pannerNode) {
    if (!gainNode) {
        gainNode = this.audioContext.createGain();
    }
    this.fader = this.audioContext.createGain();
    this.oscillator = this.audioContext.createOscillator();
    if (!this.oscillator.start) {
        this.oscillator.start = this.oscillator.noteOn;
    }
    if (!this.oscillator.stop) {
        this.oscillator.stop = this.oscillator.noteOff;
    }
    this.setInstrument(type);
    this.oscillator.frequency.value = isNil(this.frequency) ?
        Math.pow(2, (this.pitch - 69) / 12) * 440 : this.frequency;
    this.oscillator.connect(this.fader);
    this.fader.connect(gainNode);
    if (pannerNode) {
        gainNode.connect(pannerNode);
        pannerNode.connect(this.audioContext.destination);
    } else {
        gainNode.connect(this.audioContext.destination);
    }
    this.ended = false;
    this.fader.gain.setValueCurveAtTime(
        this.fadeIn,
        this.audioContext.currentTime,
        this.fadeTime
    );
    this.oscillator.start(0);
};

Note.prototype.setInstrument = function (type) {
    // private - make sure the oscillator node has been initialized before
    if (this.oscillator) {
        this.oscillator.type = [
            'sine',
            'square',
            'sawtooth',
            'triangle'
        ][(type || 1) - 1];
    }
};

Note.prototype.stop = function (immediately) {
    // set "immediately" to true to terminate instantly
    // needed for widgets like the PianoKeyboard
    var fade = !immediately;
    if (immediately && this.oscillator) {
        this.oscillator.stop(0);
        return;
    }
    if (this.fader) {
        try {
            this.fader.gain.setValueCurveAtTime(
                this.fadeOut,
                this.audioContext.currentTime,
                this.fadeTime
            );
        } catch (err) {
            fade = false;
        }
    }
    if (this.oscillator) {
        this.oscillator.stop(
            fade ?
                this.audioContext.currentTime + this.fadeTime
                : 0
        );
        this.oscillator = null;
    }
    this.ended = true;
};

Note.prototype.pause = function () {
    // emulate a sound for active sounds mngmt
    this.stop();
};

// Microphone /////////////////////////////////////////////////////////

// I am a microphone and know about volume, note, pitch, as well as
// signals and frequencies.
// mostly meant to be a singleton of the stage
// I stop when I'm not queried something for 5 seconds
// to free up system resources
//
// modifying and metering output is currently experimental
// and only fully works in Chrome. Modifiers work in Firefox, but only with
// a significant lag, metering output is currently not supported by Firefox.
// Safari... well, let's not talk about Safari :-)

function Microphone() {
    // web audio components:
    this.audioContext = null; // shared with Note.prototype.audioContext
    this.sourceStream = null;
    this.processor = null;
    this.analyser = null;

    // parameters:
    this.resolution = 2;
    this.GOOD_ENOUGH_CORRELATION = 0.96;

    // modifier
    this.modifier = null;
    this.compiledModifier = null;
    this.compilerProcess = null;

    // memory alloc
    this.correlations = [];
    this.wrapper = new List([0]);
    this.outChannels = [];

    // metered values:
    this.volume = 0;
    this.signals = [];
    this.output = [];
    this.frequencies = [];
    this.pitch = -1;

    // asynch control:
    this.isStarted = false;
    this.isReady = false;

    // idling control:
    this.isAutoStop = (location.protocol !== 'file:');
    this.lastTime = Date.now();
}

Microphone.prototype.isOn = function () {
    if (this.isReady) {
        this.lastTime = Date.now();
        return true;
    }
    this.start();
    return false;
};

// Microphone shared properties

Microphone.prototype.binSizes = [256, 512, 1024, 2048, 4096];

// Microphone resolution

Microphone.prototype.binSize = function () {
    return this.binSizes[this.resolution - 1];
};

Microphone.prototype.setResolution = function (num) {
    if (contains([1, 2, 3, 4], num)) {
        if (this.isReady) {
            this.stop();
        }
        this.resolution = num;
    }
};

// Microphone ops

Microphone.prototype.start = function () {
    if (this.isStarted) {return; }
    this.isStarted = true;
    this.isReady = false;
    this.audioContext = Note.prototype.getAudioContext();

    navigator.mediaDevices.getUserMedia(
        {
            "audio": {
                "mandatory": {
                    "googEchoCancellation": "false",
                    "googAutoGainControl": "false",
                    "googNoiseSuppression": "false",
                    "googHighpassFilter": "false"
                },
            "optional": []
            },
        }
    ).then(
        stream => this.setupNodes(stream)
    ).catch(nop);
};

Microphone.prototype.stop = function () {
    this.processor.onaudioprocess = null;
    this.sourceStream.getTracks().forEach(track => track.stop());
    this.processor.disconnect();
    this.analyser.disconnect();
    this.processor = null;
    this.analyser = null;
    this.audioContext = null;
    this.isReady = false;
    this.isStarted = false;
};

// Microphone initialization

Microphone.prototype.setupNodes = function (stream) {
    this.sourceStream = stream;
    this.createProcessor();
    this.createAnalyser();
    this.analyser.connect(this.processor);
    this.processor.connect(this.audioContext.destination);
    this.audioContext.createMediaStreamSource(stream).connect(this.analyser);
    this.lastTime = Date.now();
};

Microphone.prototype.createAnalyser = function () {
    var bufLength;
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = this.binSizes[this.resolution];
    bufLength = this.analyser.frequencyBinCount;
    this.frequencies = new Uint8Array(bufLength);

    // setup pitch detection correlations:
    this.correlations = new Array(Math.floor(bufLength/2));
};

Microphone.prototype.createProcessor = function () {
    var myself = this;
    this.processor = this.audioContext.createScriptProcessor(
        this.binSizes[this.resolution - 1]
    );

    this.processor.onaudioprocess = function (event) {
        myself.stepAudio(event);
    };

    this.processor.clipping = false;
    this.processor.lastClip = 0;
    this.processor.clipLevel = 0.98;
    this.processor.averaging = 0.95;
    this.processor.clipLag = 750;
};

// Microphone stepping

Microphone.prototype.stepAudio = function (event) {
    var channels, i;
    if (this.isAutoStop &&
            ((Date.now() - this.lastTime) > 5000) &&
            !this.modifier
    ) {
        this.stop();
        return;
    }

    // signals:
    this.signals = event.inputBuffer.getChannelData(0);

    // output:
    if (this.modifier) {
        channels = event.outputBuffer.numberOfChannels;
        if (this.outChannels.length !== channels) {
            this.outChannels = new Array(channels);
        }
        for (i = 0; i < channels; i += 1) {
            this.outChannels[i] = event.outputBuffer.getChannelData(i);
        }
        this.output = this.outChannels[0];
    } else {
        this.output = event.outputBuffer.getChannelData(0);
    }

    // frequency bins:
    this.analyser.getByteFrequencyData(this.frequencies);

    // pitch & volume:
    this.pitch = this.detectPitchAndVolume(
        this.signals,
        this.audioContext.sampleRate
    );

    // note:
    if (this.pitch > 0) {
        this.note = Math.round(
            12 * (Math.log(this.pitch / 440) / Math.log(2))
        ) + 69;
    }

    this.isReady = true;
    this.isStarted = false;
};

Microphone.prototype.detectPitchAndVolume = function (buf, sampleRate) {
    // https://en.wikipedia.org/wiki/Autocorrelation
    // thanks to Chris Wilson:
    // https://plus.google.com/+ChrisWilson/posts/9zHsF9PCDAL
    // https://github.com/cwilso/PitchDetect/

    var SIZE = buf.length,
        MAX_SAMPLES = Math.floor(SIZE/2),
        best_offset = -1,
        best_correlation = 0,
        rms = 0,
        foundGoodCorrelation = false,
        correlations = this.correlations,
        channels = this.outChannels.length,
        correlation,
        lastCorrelation,
        offset,
        shift,
        i,
        k,
        val,
        modified;

    for (i = 0; i < SIZE; i += 1) {
        val = buf[i];
        if (Math.abs(val) >= this.processor.clipLevel) {
            this.processor.clipping = true;
            this.processor.lastClip = window.performance.now();
        }
        rms += val * val;

        // apply modifier, if any
        if (this.modifier) {
            this.wrapper.contents[0] = val;
            modified = invoke(
                this.compiledModifier,
                this.wrapper,
                null,
                null,
                null,
                null,
                this.compilerProcess
            );
            for (k = 0; k < channels; k += 1) {
                this.outChannels[k][i] = modified;
            }
        }
    }
    rms = Math.sqrt(rms/SIZE);
    this.volume = Math.max(rms, this.volume * this.processor.averaging);
    if (rms < 0.01)
        return this.pitch;

    lastCorrelation = 1;
    for (offset = 1; offset < MAX_SAMPLES; offset += 1) {
        correlation = 0;

        for (i = 0; i < MAX_SAMPLES; i += 1) {
            correlation += Math.abs((buf[i]) - (buf[i + offset]));
        }
        correlation = 1 - (correlation/MAX_SAMPLES);
        correlations[offset] = correlation;
        if ((correlation > this.GOOD_ENOUGH_CORRELATION)
            && (correlation > lastCorrelation)
        ) {
            foundGoodCorrelation = true;
            if (correlation > best_correlation) {
                best_correlation = correlation;
                best_offset = offset;
            }
        } else if (foundGoodCorrelation) {
            shift = (correlations[best_offset + 1] -
                correlations[best_offset - 1]) /
                    correlations[best_offset];
            return sampleRate / (best_offset + (8 * shift));
        }
        lastCorrelation = correlation;
    }
    if (best_correlation > 0.01) {
        return sampleRate / best_offset;
    }
    return this.pitch;
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
        1,
        WHITE
    );
    this.color = color || new Color(255, 140, 0);
    this.isBig = false;
    this.version = null; // only for observing sprites
    this.fixLayout();
};

// CellMorph accessing:

CellMorph.prototype.big = function () {
    this.isBig = true;
    this.changed();
    if (this.contentsMorph instanceof TextMorph) {
        this.contentsMorph.setFontSize(
            SyntaxElementMorph.prototype.fontSize * 1.5
        );
    }
    this.fixLayout(true);
    this.rerender();
};

CellMorph.prototype.normal = function () {
    this.isBig = false;
    this.changed();
    if (this.contentsMorph instanceof TextMorph) {
        this.contentsMorph.setFontSize(
            SyntaxElementMorph.prototype.fontSize
        );
    }
    this.fixLayout(true);
    this.rerender();
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

CellMorph.prototype.fixLayout = function (justMe) {
    var isSameList = this.contentsMorph instanceof ListWatcherMorph
            && (this.contentsMorph.list === this.contents),
        isSameTable = this.contentsMorph instanceof TableFrameMorph
            && (this.contentsMorph.tableMorph.table === this.contents),
        listwatcher;

    if (justMe) {return; }

    this.createContents();

    // adjust my dimensions
    this.bounds.setHeight(this.contentsMorph.height()
        + this.edge
        + this.border * 2);
    this.bounds.setWidth(Math.max(
        this.contentsMorph.width() + this.edge * 2,
        (this.contents instanceof Context ||
            this.contents instanceof List ? 0 :
                    SyntaxElementMorph.prototype.fontSize * 3.5)
    ));

   // position my contents
    if (!isSameList && !isSameTable) {
        this.contentsMorph.setCenter(this.center());
    }

    if (this.parent) {
        this.parent.changed();
        this.parent.fixLayout();
        this.parent.rerender();
        listwatcher = this.parentThatIsA(ListWatcherMorph);
        if (listwatcher) {
            listwatcher.changed();
            listwatcher.fixLayout();
            listwatcher.rerender();
        }
    }
};

CellMorph.prototype.createContents = function () {
    // re-build my contents
    var txt,
        img,
        fontSize = SyntaxElementMorph.prototype.fontSize,
        isSameList = this.contentsMorph instanceof ListWatcherMorph
            && (this.contentsMorph.list === this.contents),
        isSameTable = this.contentsMorph instanceof TableFrameMorph
            && (this.contentsMorph.tableMorph.table === this.contents);

    if (this.isBig) {
        fontSize = fontSize * 1.5;
    }

    if (this.contentsMorph && !isSameList && !isSameTable) {
        this.contentsMorph.destroy();
        this.version = null;
    }

    if (!isSameList && !isSameTable) {
        if (this.contents instanceof Morph) {
            if (isSnapObject(this.contents)) {
                img = this.contents.thumbnail(new Point(40, 40));
                this.contentsMorph = new Morph();
                this.contentsMorph.isCachingImage = true;
                this.contentsMorph.bounds.setWidth(img.width);
                this.contentsMorph.bounds.setHeight(img.height);
                this.contentsMorph.cachedImage = img;
                this.version = this.contents.version;
            } else {
                this.contentsMorph = this.contents;
            }
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
            this.contentsMorph.setColor(WHITE);
        } else if (typeof this.contents === 'boolean') {
            img = SpriteMorph.prototype.booleanMorph.call(
                null,
                this.contents
            ).fullImage();
            this.contentsMorph = new Morph();
            this.contentsMorph.isCachingImage = true;
            this.contentsMorph.bounds.setWidth(img.width);
            this.contentsMorph.bounds.setHeight(img.height);
            this.contentsMorph.cachedImage = img;
        } else if (this.contents instanceof HTMLCanvasElement) {
            img = this.contents;
            this.contentsMorph = new Morph();
            this.contentsMorph.isCachingImage = true;
            this.contentsMorph.bounds.setWidth(img.width);
            this.contentsMorph.bounds.setHeight(img.height);
            this.contentsMorph.cachedImage = img;
        } else if (this.contents instanceof Context) {
            img = this.contents.image();
            this.contentsMorph = new Morph();
            this.contentsMorph.isCachingImage = true;
            this.contentsMorph.bounds.setWidth(img.width);
            this.contentsMorph.bounds.setHeight(img.height);
            this.contentsMorph.cachedImage = img;
        } else if (this.contents instanceof Costume) {
            img = this.contents.thumbnail(new Point(40, 40));
            this.contentsMorph = new Morph();
            this.contentsMorph.isCachingImage = true;
            this.contentsMorph.bounds.setWidth(img.width);
            this.contentsMorph.bounds.setHeight(img.height);
            this.contentsMorph.cachedImage = img;
        } else if (this.contents instanceof Sound) {
            this.contentsMorph = new SymbolMorph('notes', 30);
        } else if (this.contents instanceof List) {
            if (this.contents.isTable()) {
                this.contentsMorph = new TableFrameMorph(new TableMorph(
                    this.contents,
                    10
                ));
                this.contentsMorph.expand(new Point(200, 150));
            } else {
                if (this.isCircular()) {
                    this.contentsMorph = new TextMorph(
                        '(...)',
                        fontSize,
                        null,
                        false, // bold
                        true, // italic
                        'center'
                    );
                    this.contentsMorph.setColor(WHITE);
                } else {
                    this.contentsMorph = new ListWatcherMorph(
                        this.contents,
                        this
                    );
                }
            }
            this.contentsMorph.isDraggable = false;
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
            this.contentsMorph.setColor(WHITE);
        }
        this.add(this.contentsMorph);
    }
};

// CellMorph drawing:

CellMorph.prototype.update = function () {
    // special case for observing sprites
    if (!isSnapObject(this.contents) && !(this.contents instanceof Costume)) {
        return;
    }
    if (this.version !== this.contents.version) {
        this.fixLayout();
        this.rerender();
        this.version = this.contents.version;
    }
};

CellMorph.prototype.render = function (ctx) {
    // draw my outline
    if ((this.edge === 0) && (this.border === 0)) {
        BoxMorph.uber.render.call(this, ctx);
        return null;
    }
    ctx.fillStyle = this.color.toString();
    ctx.beginPath();
    this.outlinePath(
        ctx,
        Math.max(this.edge - this.border, 0),
        this.border
    );
    ctx.closePath();
    ctx.fill();
    if (this.border > 0 && !MorphicPreferences.isFlat) {
        ctx.lineWidth = this.border;
        ctx.strokeStyle = this.borderColor.toString();
        ctx.beginPath();
        this.outlinePath(ctx, this.edge, this.border / 2);
        ctx.closePath();
        ctx.stroke();

        if (useBlurredShadows) {
            ctx.shadowOffsetX = this.border;
            ctx.shadowOffsetY = this.border;
            ctx.shadowBlur = this.border;
            ctx.shadowColor = this.color.darker(80).toString();
            this.drawShadow(ctx, this.edge, 0);
        }
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

    // top left:
    context.arc(
        offset,
        offset,
        radius,
        radians(-180),
        radians(-90),
        false
    );

    // top right:
    context.lineTo(w - offset, 0);
    context.stroke();
};

// CellMorph editing (inside list watchers):

CellMorph.prototype.layoutChanged = function () {
    var listWatcher = this.parentThatIsA(ListWatcherMorph);

    // adjust my layout
    this.bounds.setHeight(this.contentsMorph.height()
        + this.edge
        + this.border * 2);
    this.bounds.setWidth(Math.max(
        this.contentsMorph.width() + this.edge * 2,
        (this.contents instanceof Context ||
            this.contents instanceof List ? 0 : this.height() * 2)
    ));

    // position my contents
    this.contentsMorph.setCenter(this.center());
    this.rerender();

    if (listWatcher) {
        listWatcher.fixLayout();
    }
};

CellMorph.prototype.reactToEdit = function (textMorph) {
    var listWatcher;
    if (!isNil(this.idx)) {
        listWatcher = this.parentThatIsA(ListWatcherMorph);
        if (listWatcher) {
            listWatcher.list.put(
                textMorph.text,
                this.idx + listWatcher.start - 1
            );
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

CellMorph.prototype.mouseDoubleClick = function (pos) {
    if (List.prototype.enableTables &&
            this.currentValue instanceof List) {
        new TableDialogMorph(this.contents).popUp(this.world());
    } else {
        this.escalateEvent('mouseDoubleClick', pos);
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
    this.isGhosted = false; // transient, don't persist

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
             'reportMouseX', 'reportMouseY', 'reportThreadCount'],
        selector
    );
};

// WatcherMorph slider accessing:

WatcherMorph.prototype.setSliderMin = function (num, noUpdate) {
    if (this.target instanceof VariableFrame) {
        this.sliderMorph.setSize(1, noUpdate);
        this.sliderMorph.setStart(num, noUpdate);
        this.sliderMorph.setSize(this.sliderMorph.rangeSize() / 5, noUpdate);
    }
};

WatcherMorph.prototype.setSliderMax = function (num, noUpdate) {
    if (this.target instanceof VariableFrame) {
        this.sliderMorph.setSize(1, noUpdate);
        this.sliderMorph.setStop(num, noUpdate);
        this.sliderMorph.setSize(this.sliderMorph.rangeSize() / 5, noUpdate);
    }
};

// WatcherMorph updating:

WatcherMorph.prototype.update = function () {
    var newValue, sprite, num, att,
        isInherited = false;

    if (this.target && this.getter) {
        this.updateLabel();
        if (this.target instanceof VariableFrame) {
            newValue = this.target.vars[this.getter] ?
                    this.target.vars[this.getter].value : undefined;
            if (newValue === undefined && this.target.owner) {
                sprite = this.target.owner;
                if (contains(sprite.inheritedVariableNames(), this.getter)) {
                    newValue = this.target.getVar(this.getter);
                    // ghost cell color
                    this.cellMorph.setColor(
                        SpriteMorph.prototype.blockColor.variables
                            .lighter(35)
                    );
                } else {
                    this.destroy();
                    return;
                }
            } else {
                // un-ghost the cell color
                this.cellMorph.setColor(
                    SpriteMorph.prototype.blockColor.variables
                );
            }
        } else {
            newValue = this.target[this.getter]();

            // determine whether my getter is an inherited attribute
            att = {
                xPosition: 'x position',
                yPosition: 'y position',
                direction: 'direction',
                getCostumeIdx: 'costume #',
                getScale: 'size',
                getVolume: 'volume',
                getPan: 'balance',
                reportShown: 'shown?',
                getPenDown: 'pen down?'
            } [this.getter];
            isInherited = att ? this.target.inheritsAttribute(att) : false;
        }
        if (newValue !== '' && !isNil(newValue)) {
            num = +newValue;
            if (typeof newValue !== 'boolean' && !isNaN(num)) {
                newValue = Math.round(newValue * 1000000000) / 1000000000;
            }
        }
        if (newValue === undefined) {
            // console.log('removing watcher for', this.labelText);
            this.destroy();
            return;
        }
        if (newValue !== this.currentValue ||
                isInherited !== this.isGhosted ||
                (!isNil(newValue) &&
                    newValue.version &&
                    (newValue.version !== this.version)
                )
        ) {
            this.changed();
            this.cellMorph.contents = newValue;
            this.isGhosted = isInherited;
            if (isSnapObject(this.target)) {
                if (isInherited) {
                    this.cellMorph.setColor(this.readoutColor.lighter(35));
                } else {
                    this.cellMorph.setColor(this.readoutColor);
                }
            }
            this.cellMorph.fixLayout();
            if (!isNaN(newValue)) {
                this.sliderMorph.value = newValue;
                this.sliderMorph.fixLayout();
            }
            this.fixLayout();
            if (this.currentValue && this.currentValue.version) {
                this.version = this.currentValue.version;
            } else {
                this.version = Date.now();
            }
            this.currentValue = newValue;
        }
    }
    if (this.cellMorph.contentsMorph instanceof ListWatcherMorph) {
        this.cellMorph.contentsMorph.update();
    } else if (isSnapObject(this.cellMorph.contents)) {
        this.cellMorph.update();
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
            WHITE
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
            myself.target.setVar(
                myself.getter,
                Math.round(num),
                myself.target.owner
            );
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
        this.bounds.setExtent(this.cellMorph.extent().subtract(1));
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
        this.sliderMorph.setPosition(new Point(
            this.labelMorph.left(),
            this.cellMorph.bottom()
                + SyntaxElementMorph.prototype.typeInPadding
        ));
        this.sliderMorph.setWidth(this.cellMorph.right()
            - this.labelMorph.left());
        this.bounds.setHeight(
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
};

// WatcherMorph events:

WatcherMorph.prototype.mouseDoubleClick = function (pos) {
    if (List.prototype.enableTables &&
            this.currentValue instanceof List) {
        new TableDialogMorph(this.currentValue).popUp(this.world());
    } else {
        this.escalateEvent('mouseDoubleClick', pos);
    }
};

// WatcherMorph dragging and dropping:

WatcherMorph.prototype.rootForGrab = function () {
    // prevent watchers to be dragged in presentation mode
    var ide = this.parentThatIsA(IDE_Morph);
    if (ide && ide.isAppMode) {
        return ide;
    }
    return this;
};

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
        ide = this.parentThatIsA(IDE_Morph),
        shiftClicked = (this.world().currentKey === 16),
        menu = new MenuMorph(this),
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
                    (morph) => morph instanceof WatcherMorph
                        && morph.target === varFrame
                            && morph.getter === vName
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

    if (ide && ide.isAppMode) { // prevent context menu in app mode
        return;
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
            'importData'
        );
        menu.addItem(
            'raw data...',
            () => this.importData(true),
            'import without attempting to\nparse or format data'//,
        );
        if (shiftClicked) {
            if (this.currentValue instanceof List &&
                    this.currentValue.canBeCSV()) {
                menu.addItem(
                    'export as CSV...',
                    () => {
                        var ide = this.parentThatIsA(IDE_Morph);
                        ide.saveFileAs(
                            this.currentValue.asCSV(),
                            'text/csv;charset=utf-8', // RFC 4180
                            this.getter // variable name
                        );
                    },
                    null,
                    new Color(100, 0, 0)
                );
            }
            if (this.currentValue instanceof List &&
                    this.currentValue.canBeJSON()) {
                menu.addItem(
                    'export as JSON...',
                    () => {
                        var ide = this.parentThatIsA(IDE_Morph);
                        ide.saveFileAs(
                            this.currentValue.asJSON(true), // guess objects
                            'text/json;charset=utf-8',
                            this.getter // variable name
                        );
                    },
                    null,
                    new Color(100, 0, 0)
                );
            }
        }
        if (isString(this.currentValue) || !isNaN(+this.currentValue)) {
            if (shiftClicked) {
                menu.addItem(
                    'parse',
                    'parseTxt',
                    'try to convert\nraw data into a list',
                    new Color(100, 0, 0)
                );
            }
            menu.addItem(
                'export...',
                () => {
                    var ide = this.parentThatIsA(IDE_Morph);
                    ide.saveFileAs(
                        this.currentValue.toString(),
                        'text/plain;charset=utf-8',
                        this.getter // variable name
                    );
                }
            );
        } else if (this.currentValue instanceof List &&
                this.currentValue.canBeCSV()) {
            menu.addItem(
                'export...',
                 () => {
                    var ide = this.parentThatIsA(IDE_Morph);
                    ide.saveFileAs(
                        this.currentValue.asCSV(),
                        'text/csv;charset=utf-8', // RFC 4180
                        this.getter // variable name
                    );
                }
            );
            if (this.currentValue.canBeJSON()) {
                menu.addItem(
                    'blockify',
                    () => {
                        var world = ide.world();
                        this.currentValue.blockify().pickUp(world);
                        world.hand.grabOrigin = {
                            origin: ide.palette,
                            position: ide.palette.center()
                        };
                    }
                );
            }
        } else if (this.currentValue instanceof List &&
                this.currentValue.canBeJSON()) {
            menu.addItem(
                'export...',
                 () => {
                    var ide = this.parentThatIsA(IDE_Morph);
                    ide.saveFileAs(
                        this.currentValue.asJSON(true), // guessObjects
                        'text/json;charset=utf-8',
                        this.getter // variable name
                    );
                }
            );
        } else if (this.currentValue instanceof Context) {
            vNames = this.currentValue.outerContext.variables.names();
            if (vNames.length) {
                menu.addLine();
                vNames.forEach(vName => monitor(vName));
            }
        }
    }
    return menu;
};

WatcherMorph.prototype.importData = function (raw) {
    // raw is a Boolean flag selecting to keep the data unparsed
    var inp = document.createElement('input'),
        ide = this.parentThatIsA(IDE_Morph),
        myself = this;

    function userImport() {

        function txtOnlyMsg(ftype, anyway) {
            ide.confirm(
                localize(
                    'Snap! can only import "text" files.\n' +
                        'You selected a file of type "' +
                        ftype +
                        '".'
                ) + '\n\n' + localize('Open anyway?'),
                'Unable to import',
                anyway // callback
            );
        }

        function readText(aFile) {
            var frd = new FileReader(),
                ext = aFile.name.split('.').pop().toLowerCase();

            function isTextFile(aFile) {
                // special cases for Windows
                // check the file extension for text-like-ness
                return aFile.type.indexOf('text') !== -1 ||
                    contains(['txt', 'csv', 'xml', 'json', 'tsv'], ext);
            }

            function isType(aFile, string) {
                return aFile.type.indexOf(string) !== -1 || (ext === string);
            }

            frd.onloadend = function (e) {
                if (!raw && isType(aFile, 'csv')) {
                    myself.target.setVar(
                        myself.getter,
                        Process.prototype.parseCSV(e.target.result)
                    );
                } else if (!raw && isType(aFile, 'json')) {
                    myself.target.setVar(
                        myself.getter,
                        Process.prototype.parseJSON(e.target.result)
                    );
                } else {
                    myself.target.setVar(
                        myself.getter,
                        e.target.result
                    );
                }
            };

            if (raw || isTextFile(aFile)) {
                frd.readAsText(aFile);
            } else {
                // show a warning and an option
                // letting the user load the file anyway
                txtOnlyMsg(
                    aFile.type,
                    () => frd.readAsText(aFile)
                );
            }
        }

        document.body.removeChild(inp);
        ide.filePicker = null;
        if (inp.files.length > 0) {
            readText(inp.files[inp.files.length - 1]);
        }
    }

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
        userImport,
        false
    );
    document.body.appendChild(inp);
    ide.filePicker = inp;
    inp.click();
};

WatcherMorph.prototype.parseTxt = function () {
    // experimental!
    var src = this.target.vars[this.getter].value;
    this.target.setVar(
        this.getter,
        src.indexOf('\[') === 0 ?
            Process.prototype.parseJSON(src)
                : Process.prototype.parseCSV(src)
    );
};

WatcherMorph.prototype.setStyle = function (style) {
    this.style = style;
    this.changed();
    this.fixLayout();
    this.rerender();
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

WatcherMorph.prototype.render = function (ctx) {
    var gradient;
    if (MorphicPreferences.isFlat || (this.edge === 0 && this.border === 0)) {
        BoxMorph.uber.render.call(this, ctx);
        return;
    }
    gradient = ctx.createLinearGradient(0, 0, 0, this.height());
    gradient.addColorStop(0, this.color.lighter().toString());
    gradient.addColorStop(1, this.color.darker().toString());
    ctx.fillStyle = gradient;
    ctx.beginPath();
    this.outlinePath(
        ctx,
        Math.max(this.edge - this.border, 0),
        this.border
    );
    ctx.closePath();
    ctx.fill();
    if (this.border > 0) {
        gradient = ctx.createLinearGradient(0, 0, 0, this.height());
        gradient.addColorStop(0, this.borderColor.lighter().toString());
        gradient.addColorStop(1, this.borderColor.darker().toString());
        ctx.lineWidth = this.border;
        ctx.strokeStyle = gradient;
        ctx.beginPath();
        this.outlinePath(ctx, this.edge, this.border / 2);
        ctx.closePath();
        ctx.stroke();
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
        () => this.accept(),
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
    this.color = WHITE;
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
    this.bounds.setHeight(
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
