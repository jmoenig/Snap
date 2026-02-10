/*

    objects.js

    a scriptable microworld
    based on morphic.js, blocks.js and threads.js
    inspired by Scratch

    written by Jens Mönig
    jens@moenig.org

    Copyright (C) 2026 by Jens Mönig

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
        StagePickerMorph
        StagePickerItemMorph

        MenuItemMorph*
            StagePickerItemMorph
        MenuMorph*
            StagePickerMorph
        SpeechBubbleMorph*
            SpriteBubbleMorph
            StageBubbleMorph

    * defined in Morphic.js


    credits
    -------
    Ian Reynolds contributed initial porting of primitives from Squeak and
    sound handling
    Achal Dave contributed research and prototyping for creating music
    using the Web Audio API
    Yuan Yuan and Deborah Servilla contributed graphic effects for costumes

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
AlignmentMorph, Process, WorldMap, copyCanvas, useBlurredShadows, BLACK,
BlockVisibilityDialogMorph, CostumeIconMorph, SoundIconMorph, MenuItemMorph,
embedMetadataPNG, SnapExtensions, SnapSerializer, snapEquals, display,
CustomBlockDefinition, exportEmbroidery, CustomHatBlockMorph, HandMorph*/

/*jshint esversion: 11*/

modules.objects = '2026-February-10';

var SpriteMorph;
var StageMorph;
var SpriteBubbleMorph;
var StageBubbleMorph;
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
var StagePickerMorph;
var StagePickerItemMorph;

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
        'looks',
        'sound',
        'pen',
        'control',
        'sensing',
        'operators',
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

SpriteMorph.prototype.customCategories = new Map(); // key: name, value: color

SpriteMorph.prototype.allCategories = function () {
    return this.categories.concat(
        Array.from(this.customCategories.keys()).sort()
    );
};

SpriteMorph.prototype.blockColorFor = function (category) {
    return Object.hasOwn(this.blockColor, category) ? this.blockColor[category]
        : this.customCategories.get(category) || this.blockColor.other;
};

SpriteMorph.prototype.paletteColor = new Color(55, 55, 55);
SpriteMorph.prototype.paletteTextColor = new Color(230, 230, 230);
SpriteMorph.prototype.sliderColor
    = SpriteMorph.prototype.paletteColor.lighter(30);
SpriteMorph.prototype.isCachingPrimitives = true;

SpriteMorph.prototype.enableNesting = true;
SpriteMorph.prototype.enableFirstClass = true;
SpriteMorph.prototype.showingExtensions = false;
SpriteMorph.prototype.useFlatLineEnds = false;
SpriteMorph.prototype.penColorModel = 'hsv'; // or 'hsl'
SpriteMorph.prototype.disableDraggingData = false;
SpriteMorph.prototype.highlightColor = new Color(250, 200, 130);
SpriteMorph.prototype.highlightBorder = 8;

SpriteMorph.prototype.bubbleColor = WHITE;
SpriteMorph.prototype.bubbleFontSize = 14;
SpriteMorph.prototype.bubbleFontIsBold = true;
SpriteMorph.prototype.bubbleCorner = 10;
SpriteMorph.prototype.bubbleBorder = 3;
SpriteMorph.prototype.bubbleBorderColor = new Color(190, 190, 190);
SpriteMorph.prototype.bubbleMaxTextWidth = 130;

SpriteMorph.prototype.primitiveBlocks = function () {
    return {
        // Bootstrapping helpers
        reportHyperZip: {
            dev: true,
            type: 'reporter',
            category: 'control',
            spec:
                'zip %repRing inputs: %br %s leaf-rank %n %br %s leaf-rank %n',
            code: 'zip',
            src: `(
                ifElse (> (data [rank] (get a)) (get a-rank))
                    (ifElse (> (data [rank] (get b)) (get b-rank))
                        (report (map (ring
                            (zip (get fun)
                                (item nil (get a)) (get a-rank)
                                (item nil (get b)) (get b-rank)))
                            (range 1 (min (data [length] (get a))
                                (data [length] (get b))))))
                        (report (map (ring
                            (zip (get fun)
                                nil (get a-rank) (get b) (get b-rank)))
                            (get a))))
                    (ifElse (> (data [rank] (get b)) (get b-rank))
                        (report (map (ring
                            (zip (get fun)
                                (get a) (get a-rank) nil (get b-rank)))
                            (get b)))
                        (report (call (get fun) (get a) (get b))))
                fun a a-rank b b-rank)`
        },

        // Motion
        forward: {
            only: SpriteMorph,
            type: 'command',
            category: 'motion',
            spec: 'move %n steps',
            defaults: [10],
            animation: true,
            code: 'move',
            src: `(
                (prim t forward steps)
                (goto (+ (pos) (*
                    (list
                        (fn [sin] (dir))
                        (fn [cos] (dir)))
                    (get steps)))))`
        },
        turn: {
            only: SpriteMorph,
            type: 'command',
            category: 'motion',
            spec: 'turn $clockwise %n degrees',
            defaults: [15],
            animation: true,
            code: 'right',
            src: `(
                (prim t turn angle)
                (head (+ (dir) (get angle))))`
        },
        turnLeft: {
            only: SpriteMorph,
            type: 'command',
            category: 'motion',
            spec: 'turn $counterclockwise %n degrees',
            defaults: [15],
            animation: true,
            code: 'left',
            src: `(
                (prim t turnLeft angle)
                (head (- (dir) (get angle))))`
        },
        setHeading: {
            only: SpriteMorph,
            type: 'command',
            category: 'motion',
            spec: 'point in direction %dir',
            defaults: [90],
            animation: true,
            code: 'head',
            src: `(
                (prim t setHeading angle)
                (face (+ (pos) (ifThen (= (join (get angle)) random)
                    (list
                        (fn [sin] (rand 0.1 360.1))
                        (fn [cos] (rand 0.1 360.1)))
                    (list
                        (fn [sin] (get angle))
                        (fn [cos] (get angle)))))))`
        },
        doFaceTowards: {
            only: SpriteMorph,
            type: 'command',
            category: 'motion',
            spec: 'point towards %dst',
            defaults: [['mouse-pointer']],
            animation: true,
            code: 'face'
        },
        gotoXY: {
            only: SpriteMorph,
            type: 'command',
            category: 'motion',
            spec: 'go to x: %n y: %n',
            defaults: [0, 0],
            animation: true,
            code: 'go',
            src: `(
                (prim t gotoXY x y)
                (goto (list (get x) (get y))))`
        },
        doGotoObject: {
            only: SpriteMorph,
            type: 'command',
            category: 'motion',
            spec: 'go to %dst',
            defaults: [['random position']],
            animation: true,
            code: 'goto'
        },
        doGlide: {
            only: SpriteMorph,
            type: 'command',
            category: 'motion',
            spec: 'glide %n secs to x: %n y: %n',
            defaults: [1, 0, 0],
            animation: false,
            code: 'glide',
            src: `(
                (prim t doGlide span x y)
                (var pos start fract)
                (set pos (pos))
                (set start (current "[time in milliseconds]"))
                (until (>= (get fract) 1) (
                    (set fract (/
                        (- (current "[time in milliseconds]") (get start))
                        (* (get span) 1000)))
                    (goto (+
                        (get pos)
                        (* (- (list (get x) (get y)) (get pos)) (get fract))))))
                (go (get x) (get y)))`
        },
        changeXPosition: {
            only: SpriteMorph,
            type: 'command',
            category: 'motion',
            spec: 'change x by %n',
            defaults: [10],
            animation: true,
            code: '+x',
            src: `(
                (prim t changeXPosition delta)
                (x= (+ (x) (get delta))))`
        },
        setXPosition: {
            only: SpriteMorph,
            type: 'command',
            category: 'motion',
            spec: 'set x to %n',
            defaults: [0],
            animation: true,
            code: 'x=',
            src: `(
                (prim t setXPosition x)
                (goto (list (get x) (y))))`
        },
        changeYPosition: {
            only: SpriteMorph,
            type: 'command',
            category: 'motion',
            spec: 'change y by %n',
            defaults: [10],
            animation: true,
            code: '+y',
            src: `(
                (prim t changeYPosition delta)
                (y= (+ (y) (get delta))))`
        },
        setYPosition: {
            only: SpriteMorph,
            type: 'command',
            category: 'motion',
            spec: 'set y to %n',
            defaults: [0],
            animation: true,
            code: 'y=',
            src: `(
                (prim t setYPosition y)
                (goto (list (x) (get y))))`
        },
        bounceOffEdge: {
            only: SpriteMorph,
            type: 'command',
            category: 'motion',
            spec: 'if on edge, bounce',
            animation: true,
            code: 'bounce',
            src: `(
                (prim t bounceOffEdge)
                (if (touch [edge]) (
                    (var "get bounds" bounds center "stage bounds" "dir x"
                        "dir y" "delta x" "delta y")
                    (set "get bounds" (ring (list
                        (min : (cons
                            (list (my [left]) (my [bottom]))
                            (map (ring
                                (list
                                    (attribute [left] nil)
                                    (attribute [bottom] nil)))
                                (my [parts]))))
                        (max : (cons
                            (list (my [right]) (my [top]))
                            (map (ring
                                (list
                                    (attribute [right] nil)
                                    (attribute [top] nil)))
                                (my [parts])))))))
                    (set bounds (call (get "get bounds")))
                    (set center (/ (+ : (get bounds)) 2))
                    (set "stage bounds" (ask (my [stage]) (ring (list
                        (list (my [left]) (my [bottom]))
                        (list (my [right]) (my [top]))))))
                    (set "dir x" (fn [sin] (dir)))
                    (set "dir y" (fn [cos] (dir)))
                    (if (<
                        (item 1 (item 1 (get bounds)))
                        (item 1 (item 1 (get "stage bounds"))))
                        (set "dir x" (fn [abs] (get "dir x"))))
                    (if (>
                        (item 1 (item 2 (get bounds)))
                        (item 1 (item 2 (get "stage bounds"))))
                        (set "dir x" (fn [neg] (fn [abs] (get "dir x")))))
                    (if (>
                        (item 2 (item 2 (get bounds)))
                        (item 2 (item 2 (get "stage bounds"))))
                        (set "dir y" (fn [neg] (fn [abs] (get "dir y")))))
                    (if (<
                        (item 2 (item 1 (get bounds)))
                        (item 2 (item 1 (get "stage bounds"))))
                        (set "dir y" (fn [abs] (get "dir y"))))
                    (head (atan2 (get "dir x") (get "dir y")))
                    (set bounds (call (get "get bounds")))
                    (goto (+ (pos) (- (get center) (/ (+ : (get bounds)) 2))))
                    (set bounds (call (get "get bounds")))
                    (if (>
                        (item 1 (item 2 (get bounds)))
                        (item 1 (item 2 (get "stage bounds"))))
                        (set "delta x" (-
                            (item 1 (item 2 (get "stage bounds")))
                            (item 1 (item 2 (get bounds))))))
                    (if (<
                        (item 2 (item 1 (get bounds)))
                        (item 2 (item 1 (get "stage bounds"))))
                        (set "delta y" (-
                            (item 2 (item 1 (get "stage bounds")))
                            (item 2 (item 1 (get bounds))))))
                    (if (<
                        (item 1 (item 1 (get bounds)))
                        (item 1 (item 1 (get "stage bounds"))))
                        (set "delta x" (-
                            (item 1 (item 1 (get "stage bounds")))
                            (item 1 (item 1 (get bounds))))))
                    (if (>
                        (item 2 (item 2 (get bounds)))
                        (item 2 (item 2 (get "stage bounds"))))
                        (set "delta y" (-
                            (item 2 (item 2 (get "stage bounds")))
                            (item 2 (item 2 (get bounds))))))
                    (goto (+ (pos) (list (get "delta x") (get "delta y")))))))`
        },
        getPosition: {
            only: SpriteMorph,
            type: 'reporter',
            category: 'motion',
            spec: 'position',
            code: 'pos',
            src: `(
                (prim t getPosition)
                (report (list (x) (y))))`
        },
        xPosition: {
            only: SpriteMorph,
            type: 'reporter',
            category: 'motion',
            spec: 'x position',
            code: 'x'
        },
        yPosition: {
            only: SpriteMorph,
            type: 'reporter',
            category: 'motion',
            spec: 'y position',
            code: 'y'
        },
        direction: {
            only: SpriteMorph,
            type: 'reporter',
            category: 'motion',
            spec: 'direction',
            code: 'dir'
        },

        // Looks
        doSwitchToCostume: {
            type: 'command',
            category: 'looks',
            spec: 'switch to costume %cst',
            animation: true,
            code: 'wear'
        },
        doWearNextCostume: {
            type: 'command',
            category: 'looks',
            spec: 'next costume',
            animation: true,
            code: 'next',
            src: `(
                (prim t doWearNextCostume)
                (if (> (costume#) 0)
                    (wear (+
                        (mod (costume#) (data [length] (my [costumes])))
                        1))))`
        },
        getCostumeIdx: {
            type: 'reporter',
            category: 'looks',
            spec: 'costume #',
            code: 'costume#',
            src: `(
                (prim t getCostumeIdx)
                (report (# (my [costume]) (my [costumes]))))`
        },
        reportGetImageAttribute: {
            type: 'reporter',
            category: 'looks',
            spec: '%img of costume %cst',
            defaults: [['width'], ['current']],
            code: 'costume'
        },
        reportNewCostume: {
            type: 'reporter',
            category: 'looks',
            spec: 'new costume %l width %dim height %dim',
            code: 'newCostume'
        },
        reportNewCostumeStretched: {
            type: 'reporter',
            category: 'looks',
            spec: 'stretch %cst x: %n y: %n %',
            defaults: [['current'], 100, 50],
            code: 'stretch'
        },
        reportNewCostumeSkewed: {
            type: 'reporter',
            category: 'looks',
            spec: 'skew %cst to %dir degrees %n %',
            defaults: [['current'], 0, 50],
            code: 'skew'
        },
        doSayFor: {
            type: 'command',
            category: 'looks',
            spec: 'say %s for %n secs',
            defaults: [localize('Hello!'), 2],
            code: 'sayFor',
            src: `(
                (prim t doSayFor msg time)
                (say (get msg))
                (wait (get time))
                (say nil))`
        },
        bubble: {
            type: 'command',
            category: 'looks',
            spec: 'say %s',
            defaults: [localize('Hello!')],
            code: 'say'
        },
        doThinkFor: {
            only: SpriteMorph,
            type: 'command',
            category: 'looks',
            spec: 'think %s for %n secs',
            defaults: [localize('Hmm...'), 2],
            code: 'thinkFor',
            src: `(
                (prim t doThinkFor msg time)
                (think (get msg))
                (wait (get time))
                (think nil))`
        },
        doThink: {
            only: SpriteMorph,
            type: 'command',
            category: 'looks',
            spec: 'think %s',
            defaults: [localize('Hmm...')],
            code: 'think'
        },
        changeEffect: {
            type: 'command',
            category: 'looks',
            spec: 'change %eff effect by %n',
            defaults: [['ghost'], 25],
            animation: true,
            code: '+effect'
        },
        setEffect: {
            type: 'command',
            category: 'looks',
            spec: 'set %eff effect to %n',
            defaults: [['ghost'], 0],
            animation: true,
            code: 'effect='
        },
        getEffect: {
            type: 'reporter',
            category: 'looks',
            spec: '%eff effect',
            defaults: [['ghost']],
            code: 'effect'
        },
        clearEffects: {
            type: 'command',
            category: 'looks',
            animation: true,
            spec: 'clear graphic effects'
        },
        changeScale: {
            only: SpriteMorph,
            type: 'command',
            category: 'looks',
            spec: 'change size by %n',
            defaults: [10],
            animation: true,
            code: '+size',
            src: `(
                (prim t changeScale delta)
                (size= (+ (size) (get delta))))`
        },
        setScale: {
            only: SpriteMorph,
            type: 'command',
            category: 'looks',
            spec: 'set size to %n %',
            defaults: [100],
            animation: true,
            code: 'size='
        },
        getScale: {
            only: SpriteMorph,
            type: 'reporter',
            category: 'looks',
            spec: 'size',
            code: 'size'
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
            spec: 'shown?',
            code: 'shown'
        },
        goToLayer: {
            only: SpriteMorph,
            type: 'command',
            category: 'looks',
            spec: 'go to %layer layer',
            defaults: [['front']],
            animation: true,
            code: 'layer',
            src: `(
                (prim t goToLayer name)
                (ifElse (= (join (get name)) back)
                    (warp (until (= (# (my [self]) (ask (my [stage])
                        (ring (my "[other sprites]")))) 1)
                        (back 1)))
                    (warp (until (= (# (my [self]) (ask (my [stage])
                        (ring (my "[other sprites]"))))
                        (+ (data [length] (my "[other sprites]")) 1))
                        (back -1)))))`
        },
        goBack: {
            only: SpriteMorph,
            type: 'command',
            category: 'looks',
            spec: 'go back %n layers',
            defaults: [1],
            animation: true,
            code: 'back'
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
            spec: 'play sound %snd',
            code: 'play'
        },
        doPlaySoundUntilDone: {
            type: 'command',
            category: 'sound',
            spec: 'play sound %snd until done',
            code: 'playAll',
            src: `(
                (prim t doPlaySoundUntilDone target)
                (var sound)
                (set sound
                    (ifThen (is (get target) [sound])
                        (get target)
                        (ifThen (is (get target) [list])
                            (newSound (get target) 44100)
                            (find (pred (= (sound [name] nil) (get target)))
                                (my [sounds])))))
                (if (is (get sound) [sound]) (
                    (play (get sound))
                    (wait (sound [duration] (get sound))))))`
        },
        doPlaySoundAtRate: {
            type: 'command',
            category: 'sound',
            spec: 'play sound %snd at %rate Hz',
            defaults: ['', 44100],
            code: 'playAt',
            src: `(
                (prim t doPlaySoundAtRate target rate)
                (play (newSound (sound [samples] (get target)) (get rate))))`
        },
        doStopAllSounds: {
            type: 'command',
            category: 'sound',
            spec: 'stop all sounds',
            code: 'stopSounds'
        },
        reportGetSoundAttribute: {
            type: 'reporter',
            category: 'sound',
            spec: '%aa of sound %snd',
            defaults: [['duration']],
            code: 'sound'
        },
        reportNewSoundFromSamples: {
            type: 'reporter',
            category: 'sound',
            spec: 'new sound %l rate %rate Hz',
            defaults: [null, 44100],
            code: 'newSound'
        },
        doRest: {
            type: 'command',
            category: 'sound',
            spec: 'rest for %n beats',
            defaults: [0.2],
            code: 'rest',
            src: `(
                (prim t doRest beats)
                (wait (/ 60 (* (get beats) (tempo)))))`
        },
        doPlayNote: {
            type: 'command',
            category: 'sound',
            spec: 'play note %note for %n beats',
            defaults: [60, 0.5],
            code: 'note'
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
            defaults: [1],
            code: 'instrument'
        },
        doChangeTempo: {
            type: 'command',
            category: 'sound',
            spec: 'change tempo by %n',
            defaults: [20],
            code: '+tempo',
            src: `(
                (prim t doChangeTempo delta)
                (tempo= (+ (tempo) (get delta))))`
        },
        doSetTempo: {
            type: 'command',
            category: 'sound',
            spec: 'set tempo to %n bpm',
            defaults: [60],
            code: 'tempo='
        },
        getTempo: {
            type: 'reporter',
            category: 'sound',
            spec: 'tempo',
            code: 'tempo'
        },
        changeVolume: {
            type: 'command',
            category: 'sound',
            spec: 'change volume by %n',
            defaults: [10],
            code: '+vol',
            src: `(
                (prim t changeVolume delta)
                (vol= (+ (vol) (get delta))))`
        },
        setVolume: {
            type: 'command',
            category: 'sound',
            spec: 'set volume to %n %',
            defaults: [100],
            code: 'vol='
        },
        getVolume: {
            type: 'reporter',
            category: 'sound',
            spec: 'volume',
            code: 'vol'
        },
        changePan: {
            type: 'command',
            category: 'sound',
            spec: 'change balance by %n',
            defaults: [10],
            code: '+pan',
            src: `(
                (prim t changePan delta)
                (pan= (+ (pan) (get delta))))`
        },
        setPan: {
            type: 'command',
            category: 'sound',
            spec: 'set balance to %n',
            defaults: [0],
            code: 'pan='
        },
        getPan: {
            type: 'reporter',
            category: 'sound',
            spec: 'balance',
            code: 'pan'
        },
        playFreq: {
            type: 'command',
            category: 'sound',
            spec: 'play frequency %n Hz',
            defaults: [440],
            code: 'freq'
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
            spec: 'clear',
            animation: true
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
            spec: 'pen down?',
            code: 'down?'
        },
        setColor: {
            only: SpriteMorph,
            type: 'command',
            category: 'pen',
            spec: 'set pen color to %clr',
            src: `(
                (prim t setColor color)
                (extension "clr_setpen(clr)" (get color)))`
        },
        setPenColorDimension: {
            only: SpriteMorph,
            type: 'command',
            category: 'pen',
            spec: 'set pen %clrdim to %n',
            defaults: [['hue'], 50],
            code: 'pen='
        },
        changePenColorDimension: {
            only: SpriteMorph,
            type: 'command',
            category: 'pen',
            spec: 'change pen %clrdim by %n',
            defaults: [['hue'], 10],
            code: '+pen'
        },
        getPenAttribute: {
            type: 'reporter',
            category: 'pen',
            spec: 'pen %pen',
            defaults: [['hue']],
            code: 'pen'
        },
        setBackgroundColor: {
            only: StageMorph,
            type: 'command',
            category: 'pen',
            spec: 'set background color to %clr',
            animation: true
        },
        setBackgroundColorDimension: {
            only: StageMorph,
            type: 'command',
            category: 'pen',
            spec: 'set background %clrdim to %n',
            defaults: [['hue'], 50],
            animation: true
        },
        changeBackgroundColorDimension: {
            only: StageMorph,
            type: 'command',
            category: 'pen',
            spec: 'change background %clrdim by %n',
            defaults: [['hue'], 10],
            animation: true
        },
        changeSize: {
            only: SpriteMorph,
            type: 'command',
            category: 'pen',
            spec: 'change pen size by %n',
            defaults: [1],
            animation: true,
            code: '+penSize',
            src: `(
                (prim t changeSize delta)
                (penSize= (+ (pen [size]) (get delta))))`
        },
        setSize: {
            only: SpriteMorph,
            type: 'command',
            category: 'pen',
            spec: 'set pen size to %n',
            defaults: [1],
            animation: true,
            code: 'penSize='
        },
        doStamp: {
            only: SpriteMorph,
            type: 'command',
            category: 'pen',
            spec: 'stamp',
            animation: true,
            code: 'stamp'
        },
        floodFill: {
            only: SpriteMorph,
            type: 'command',
            category: 'pen',
            spec: 'fill',
            animation: true,
            code: 'fill'
        },
        write: {
            only: SpriteMorph,
            type: 'command',
            category: 'pen',
            spec: 'write %s size %n',
            defaults: [localize('Hello!'), 12],
            animation: true
        },
        reportPenTrailsAsCostume: {
            type: 'reporter',
            category: 'pen',
            spec: 'pen trails',
            code: 'trails'
        },
        reportPentrailsAsSVG: {
            type: 'reporter',
            category: 'pen',
            spec: 'pen vectors',
            code: 'svgTrails'
        },
        doPasteOn: {
            type: 'command',
            category: 'pen',
            spec: 'paste on %spr',
            code: 'paste',
            animation: true
        },
        doCutFrom: {
            type: 'command',
            category: 'pen',
            spec: 'cut from %spr',
            code: 'cut',
            animation: true
        },
        doDrawOn: {
            only: SpriteMorph,
            type: 'command',
            category: 'pen',
            spec: '%msk on %spr',
            defaults: [['paint'], ['Stage']],
            code: 'drawOn'
        },
        reportColor: {
            type: 'reporter',
            category: 'pen',
            spec: 'color %clr',
            code: 'colorFrom'
        },
        reportColorAttribute: {
            type: 'reporter',
            category: 'pen',
            spec: '%color of color %clr',
            defaults: [['hue']],
            code: 'color'
        },
        reportNewColor: {
            type: 'reporter',
            category: 'pen',
            spec: 'new color %hsbt',
            code: 'newColor'
        },

        // Control
        receiveGo: {
            type: 'hat',
            category: 'control',
            spec: 'when $greenflag clicked'
        },
        receiveKey: {
            type: 'hat',
            category: 'control',
            spec: 'when %keyHat key pressed %keyName',
            defaults: [['space']]
        },
        receiveInteraction: {
            type: 'hat',
            category: 'control',
            spec: 'when I am %interaction',
            defaults: [['clicked']]
        },
        receiveMessage: {
            type: 'hat',
            category: 'control',
            spec: 'when I receive %msgHat %message',
            defaults: [['']] // trigger the "message" expansion to refresh
        },
        receiveCondition: {
            type: 'hat',
            category: 'control',
            spec: 'when %b'
        },
        receiveConditionEvent: {
            type: 'hat',
            category: 'control',
            spec: 'when %b'
        },
        getLastMessage: {  // retained for legacy compatibility
            dev: true,
            type: 'reporter',
            category: 'control',
            spec: 'message'
        },
        doBroadcast: {
            type: 'command',
            category: 'control',
            spec: 'broadcast %msg %receive',
            code: 'send'
        },
        doBroadcastAndWait: {
            type: 'command',
            category: 'control',
            spec: 'broadcast %msg %receive and wait',
            code: 'sendAll'
        },
        reportPoll: {
            type: 'reporter',
            category: 'control',
            spec: 'request %msg %survey',
            code: 'request'
        },
        doWait: {
            type: 'command',
            category: 'control',
            spec: 'wait %n secs',
            defaults: [1],
            code: 'wait',
            src: `(
                (prim t doWait duration)
                (var "start time")
                (set "start time" (current "[time in milliseconds]"))
                (waitUntil (>=
                    (current "[time in milliseconds]")
                    (+ (get "start time") (* (get duration) 1000)))))`
        },
        doWaitUntil: {
            type: 'command',
            category: 'control',
            spec: 'wait until %boolUE',
            code: 'waitUntil',
            src: `(
                (prim t doWaitUntil condition)
                (if (not (call (get condition)))
                    (waitUntil (call (get condition)))))`
        },
        doForever: {
            type: 'command',
            category: 'control',
            spec: 'forever %loop',
            code: 'forever',
            src: `(
                (prim t doForever action)
                (run (get action))
                (run (this [script]) (get action)))`
        },
        doRepeat: {
            type: 'command',
            category: 'control',
            spec: 'repeat %n %loop',
            defaults: [10],
            code: 'repeat',
            src: `(
                (prim t doRepeat count action)
                (var self)
                (set self (this [script]))
                (if (> (get count) 0) (
                    (run (get action))
                    (extension snap_yield)
                    (run (get self) (- (get count) 1) (get action)))))`
        },
        doUntil: {
            type: 'command',
            category: 'control',
            spec: 'repeat until %boolUE %loop',
            code: 'until',
            src: `(
                (prim t doUntil condition action)
                (var self)
                (set self (this [script]))
                (if (not (call (get condition))) (
                    (run (get action))
                    (extension snap_yield)
                    (run (get self) (get condition) (get action)))))`
        },
        doFor: {
            type: 'command',
            category: 'control',
            spec: 'for %upvar = %n to %n %cla',
            defaults: ['i', 1, 10],
            code: 'for',
            src: `(
                (prim t doFor count start end action)
                (var test increment)
                (set count (get start))
                (ifElse (< (get start) (get end))
                    ((set test (pred (> (get count) (get end))))
                        (set increment 1))
                    ((set test (pred (< (get count) (get end))))
                        (set increment -1)))
                (until (call (get test)) (
                    (run (get action))
                    (+= count (get increment)))))`
        },
        doIf: {
            type: 'command',
            category: 'control',
            spec: 'if %b %c %elseif',
            code: 'if',
            src: `(
                (prim t doIf condition "true case" "else pairs")
                (var self)
                (set self (this [script]))
                (ifElse (get condition)
                    (run (get "true case"))
                    (ifElse (empty (get "else pairs"))
                        nil
                        (ifElse (item 1 (item 1 (get "else pairs")))
                            (run (item 2 (item 1 (get "else pairs"))))
                            (run (get self) (bool f) nil
                                (cdr (get "else pairs")))))))`
        },
        doIfElse: {
            type: 'command',
            category: 'control',
            spec: 'if %b %c else %c',
            code: 'ifElse',
            src: `(
                (prim t doIfElse condition "true case" "false case")
                (run (item (+ (get condition) 1)
                    (list (get "false case") (get "true case")))))`
        },
        reportIfElse: {
            type: 'reporter',
            category: 'control',
            spec: 'if %b then %anyUE else %anyUE',
            code: 'ifThen',
            src: `(
                (prim t reportIfElse condition "true case" "false case")
                (report (zip
                    (ring (call (item nil nil)))
                    (+ (get condition) 1) 0
                    (list (get "false case") (get "true case")) 1)))`
        },
        doStopThis: {
            type: 'command',
            category: 'control',
            spec: 'stop %stopChoices',
            defaults: [['all']],
            code: 'stop'
        },
        doRun: {
            type: 'command',
            category: 'control',
            spec: 'run %cmdRing %inputs',
            code: 'run'
        },
        fork: {
            type: 'command',
            category: 'control',
            spec: 'launch %cmdRing %inputs'
        },
        evaluate: {
            type: 'reporter',
            category: 'control',
            spec: 'call %repRing %inputs',
            code: 'call'
        },
        doReport: {
            type: 'command',
            category: 'control',
            spec: 'report %s',
            code: 'report'
        },
        doCallCC: {
            // deprecated - superseded by reportEnviornment - kept for legacy
            dev: true,
            type: 'command',
            category: 'control',
            spec: 'run %cmdRing w/continuation'
        },
        reportCallCC: {
            // deprecated - superseded by reportEnviornment - kept for legacy
            dev: true,
            type: 'reporter',
            category: 'control',
            spec: 'call %cmdRing w/continuation'
        },
        doWarp: {
            type: 'command',
            category: 'other',
            spec: 'warp %c',
            code: 'warp'
        },

        // Message passing
        doTellTo: {
            type: 'command',
            category: 'control',
            // spec: 'tell %spr to %cl' // I liked this version better, -Jens
            spec: 'tell %spr to %cmdRing %inputs',
            code: 'tell',
            src: `(
                (prim t doTellTo target action parameters)
                (run (attribute (get action) (get target)) : (get parameters)))`
        },
        reportAskFor: {
            type: 'reporter',
            category: 'control',
            spec: 'ask %spr for %repRing %inputs',
            code: 'ask',
            src: `(
                (prim t reportAskFor target action parameters)
                (report (call (attribute (get action) (get target))
                    : (get parameters))))`
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
            defaults: [['myself']],
            animation: true,
            code: 'clone',
            src: `(
                (prim t createClone target)
                (report (newClone (get target))))`
        },
        newClone: {
            type: 'reporter',
            category: 'control',
            spec: 'a new clone of %clntrtl',
            defaults: [['myself']],
            animation: true
        },
        removeClone: {
            type: 'command',
            category: 'control',
            spec: 'delete this clone',
            code: 'removeClone'
        },

        // recording user edits
        receiveUserEdit: {
            type: 'hat',
            category: 'control',
            spec: 'when %edit is edited %message',
            defaults: [['anything']]
        },

        // Custom Blocks & introspection
        doDefineBlock: {
            type: 'command',
            category: 'control',
            spec: 'define %upvar %s %repRing',
            defaults: [['block']],
            code: 'define'
        },
        doSetBlockAttribute: {
            type: 'command',
            category: 'control',
            spec: 'set %byob of block %repRing to %s',
            defaults: [['label']],
            code: 'setBlock'
        },
        doDeleteBlock: {
            type: 'command',
            category: 'control',
            spec: 'delete block %repRing',
            code: 'deleteBlock'
        },
        reportBlockAttribute: {
            type: 'reporter',
            category: 'control',
            spec: '%block of block %repRing',
            defaults: [['definition']],
            code: 'block'
        },
        reportEnvironment: {
            type: 'reporter',
            category: 'control',
            spec: 'this %env',
            defaults: [['script']],
            code: 'this'
        },

        // custom block slot control & dynamic user defined drop-down menus
        receiveSlotEvent: {
            type: 'hat',
            category: 'control',
            spec: 'when slot %inputSlot signals %slotEvent',
            defaults: ['', ['menu']]
        },
        doSetSlot: {
            type: 'command',
            category: 'control',
            spec: 'set slot %inputSlot to %s'
        },

        // Debugging - pausing
        doPauseAll: {
            type: 'command',
            category: 'control',
            spec: 'pause all $pause',
            code: 'pause'
        },

        // Scenes
        doSwitchToScene: {
            type: 'command',
            category: 'control',
            spec: 'switch to scene %scn %send',
            defaults: [['next']],
            code: 'scene'
        },

        // Pipe
        reportPipe: {
            type: 'reporter',
            category: 'control',
            spec: 'pipe %s $arrowRight %mult%repRing',
            code: 'pipe',
            src: `(
                (prim t reportPipe value functions)
                (report (ifThen (empty (get functions))
                    (get value)
                    (pipe (call (item 1 (get functions)) (get value)) :
                        (cdr (get functions))))))`
        },

        // Sensing
        reportTouchingObject: {
            only: SpriteMorph,
            type: 'predicate',
            category: 'sensing',
            spec: 'touching %col ?',
            defaults: [['mouse-pointer']],
            code: 'touch'
        },
        reportTouchingColor: {
            only: SpriteMorph,
            type: 'predicate',
            category: 'sensing',
            spec: 'touching %clr ?',
            code: 'touchColor'
        },
        reportColorIsTouchingColor: {
            only: SpriteMorph,
            type: 'predicate',
            category: 'sensing',
            spec: 'color %clr is touching %clr ?',
            defaults: [null, new Color(255, 230, 0)],
            code: 'colorTouch'
        },
        reportAspect: {
            type: 'reporter',
            category: 'sensing',
            spec: '%asp at %loc',
            defaults: [['hue'], ['mouse-pointer']],
            code: 'aspect'
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
            spec: 'answer',
            code: 'answer'
        },
        reportMousePosition: {
            type: 'reporter',
            category: 'sensing',
            spec: 'mouse position',
            code: 'mouse',
            src: `(
                (prim t reportMousePosition)
                (report (list (mouseX) (mouseY))))`
        },
        reportMouseX: {
            type: 'reporter',
            category: 'sensing',
            spec: 'mouse x',
            code: 'mouseX'
        },
        reportMouseY: {
            type: 'reporter',
            category: 'sensing',
            spec: 'mouse y',
            code: 'mouseY'
        },
        reportMouseDown: {
            type: 'predicate',
            category: 'sensing',
            spec: 'mouse down?',
            code: 'mouseDown'
        },
        reportKeyPressed: {
            type: 'predicate',
            category: 'sensing',
            spec: 'key %key pressed?',
            defaults: [['space']],
            code: 'key'
        },
        reportRelationTo: {
            only: SpriteMorph,
            type: 'reporter',
            category: 'sensing',
            spec: '%rel to %dst',
            defaults: [['distance'], ['mouse-pointer']],
            code: 'relation'
        },
        doResetTimer: {
            type: 'command',
            category: 'sensing',
            spec: 'reset timer',
            code: 'resetTimer'
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
            spec: 'timer',
            code: 'timer'
        },
        reportAttributeOf: {
            type: 'reporter',
            category: 'sensing',
            spec: '%att of %spr',
            defaults: [['costume #']],
            code: 'attribute'
        },
        reportObject: {
            type: 'reporter',
            category: 'sensing',
            spec: 'object %self',
            defaults: [['myself']],
            code: 'object',
            src: `(
                (prim t reportObject name)
                (report (zip
                    (ring (find (pred (= (get id) (ask nil (ring (my [name])))))
                        (append (ask (my [stage]) (ring (my "[other sprites]")))
                            (list (my [stage])))) id)
                    (get name) 0 nil 0)))`
        },
        reportURL: {
            type: 'reporter',
            category: 'sensing',
            spec: 'url %s',
            defaults: ['snap.berkeley.edu'],
            code: 'url'
        },
        doSetGlobalFlag: {
            type: 'command',
            category: 'sensing',
            spec: 'set %setting to %b',
            defaults: [['video capture']],
            code: 'global='
        },
        reportGlobalFlag: {
            type: 'predicate',
            category: 'sensing',
            spec: 'is %setting on?',
            defaults: [['turbo mode']],
            code: 'global'
        },
        reportDate: {
            type: 'reporter',
            category: 'sensing',
            spec: 'current %dates',
            defaults: [['date']],
            code: 'current'
        },
        reportGet: {
            type: 'reporter',
            category: 'sensing',
            spec: 'my %get',
            defaults: [['neighbors']],
            code: 'my'
        },
        reportAudio: {
            type: 'reporter',
            category: 'sensing',
            spec: 'microphone %audio',
            defaults: [['volume']],
            code: 'audio'
        },

        // Operators
        reifyScript: {
            type: 'ring',
            category: 'other',
            spec: '%rc %ringparms',
            alias: 'command ring lambda',
            code: 'cmd'
        },
        reifyReporter: {
            type: 'ring',
            category: 'other',
            spec: '%rr %ringparms',
            alias: 'reporter ring lambda',
            code: 'ring'
        },
        reifyPredicate: {
            type: 'ring',
            category: 'other',
            spec: '%rp %ringparms',
            alias: 'predicate ring lambda',
            code: 'pred'
        },
        reportVariadicSum: {
            type: 'reporter',
            category: 'operators',
            spec: '%sum',
            alias: '+',
            code: '+'
        },
        reportDifference: {
            type: 'reporter',
            category: 'operators',
            spec: '%n \u2212 %n',
            alias: '-',
            code: '-'
        },
        reportVariadicProduct: {
            type: 'reporter',
            category: 'operators',
            spec: '%product',
            alias: '*',
            code: '*'
        },
        reportQuotient: {
            type: 'reporter',
            category: 'operators',
            spec: '%n / %n', // '%n \u00F7 %n'
            code: '/'
        },
        reportRound: {
            type: 'reporter',
            category: 'operators',
            spec: 'round %n',
            code: 'round'
        },
        reportMonadic: {
            type: 'reporter',
            category: 'operators',
            spec: '%fun of %n',
            defaults: [['sqrt'], 10],
            code: 'fn'
        },
        reportPower: {
            type: 'reporter',
            category: 'operators',
            spec: '%n ^ %n',
            code: '^'
        },
        reportModulus: {
            type: 'reporter',
            category: 'operators',
            spec: '%n mod %n',
            code: 'mod'
        },
        reportAtan2: {
            type: 'reporter',
            category: 'operators',
            spec: 'atan2 %n ÷ %n',
            code: 'atan2'
        },
        reportVariadicMin: {
            type: 'reporter',
            category: 'operators',
            spec: '%min',
            alias: 'min',
            code: 'min'
        },
        reportVariadicMax: {
            type: 'reporter',
            category: 'operators',
            spec: '%max',
            alias: 'max',
            code: 'max'
        },
        reportRandom: {
            type: 'reporter',
            category: 'operators',
            spec: 'pick random %ns to %ns',
            defaults: [1, 10],
            code: 'rand'
        },
        reportVariadicEquals: {
            type: 'predicate',
            category: 'operators',
            spec: '%all=',
            code: '='
        },
        reportVariadicNotEquals: {
            type: 'predicate',
            category: 'operators',
            spec: '%all!=',
            code: '!='
        },
        reportVariadicLessThan: {
            type: 'predicate',
            category: 'operators',
            spec: '%all<',
            code: '<'
        },
        reportVariadicLessThanOrEquals: {
            type: 'predicate',
            category: 'operators',
            spec: '%all<=',
            code: '<='
        },
        reportVariadicGreaterThan: {
            type: 'predicate',
            category: 'operators',
            spec: '%all>',
            code: '>'
        },
        reportVariadicGreaterThanOrEquals: {
            type: 'predicate',
            category: 'operators',
            spec: '%all>=',
            code: '>='
        },
        reportVariadicAnd: {
            type: 'predicate',
            category: 'operators',
            spec: '%all',
            alias: '&',
            code: 'and'
        },
        reportVariadicOr: {
            type: 'predicate',
            category: 'operators',
            spec: '%any',
            alias: '|',
            code: 'or'
        },
        reportNot: {
            type: 'predicate',
            category: 'operators',
            spec: 'not %b',
            code: 'not',
            src: `(
                (prim t reportNot bool)
                (report (ifThen (get bool) (bool f) (bool t))))`
        },
        reportBoolean: {
            type: 'predicate',
            category: 'operators',
            spec: '%bool',
            defaults: [true],
            alias: 'true boolean',
            code: 'bool',
            src: `(
                (prim t reportBoolean arg)
                (report (get arg)))`
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
            defaults: [localize('hello') + ' ', localize('world')],
            code: 'join'
        },
        reportLetter: {
            type: 'reporter',
            category: 'operators',
            spec: 'letter %ix of %s',
            defaults: [1, localize('world')],
            code: 'letter',
            src: `(
                (prim t reportLetter idx text)
                (report (zip
                    (ring (item nil (split nil [letter])))
                    (get idx) 0
                    (get text) 0)))`
        },
        reportStringSize: { // deprecated as of v9
            type: 'reporter',
            category: 'operators',
            spec: 'length of %s',
            defaults: [localize('world')]
        },
        reportTextAttribute: {
            type: 'reporter',
            category: 'operators',
            spec: '%ta of text %s',
            defaults: [['length'], localize('world')],
            code: 'text'
        },
        reportUnicode: {
            type: 'reporter',
            category: 'operators',
            spec: 'unicode of %s',
            defaults: ['a'],
            code: 'unicode'
        },
        reportUnicodeAsLetter: {
            type: 'reporter',
            category: 'operators',
            spec: 'unicode %n as letter',
            defaults: [65],
            code: 'toLetter'
        },
        reportIsA: {
            type: 'predicate',
            category: 'operators',
            spec: 'is %s a %typ ?',
            defaults: [5, ['number']],
            code: 'is'
        },
        reportVariadicIsIdentical: {
            type: 'predicate',
            category: 'operators',
            spec: 'is %all== ?',
            code: 'same'
        },
        reportTextSplit: {
            type: 'reporter',
            category: 'operators',
            spec: 'split %s by %delim',
            defaults: [localize('hello') + ' ' + localize('world'), " "],
            code: 'split'
        },
        reportJSFunction: {
            type: 'reporter',
            category: 'operators',
            spec: 'JavaScript function ( %mult%s ) { %code }',
            code: 'js'
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
            defaults: [null, 0],
            code: 'set'
        },
        doChangeVar: {
            type: 'command',
            category: 'variables',
            spec: 'change %hyperVar by %n',
            defaults: [null, 1],
            code: '+='
        },
        doShowVar: {
            type: 'command',
            category: 'variables',
            spec: 'show variable %var',
            code: 'showVar'
        },
        doHideVar: {
            type: 'command',
            category: 'variables',
            spec: 'hide variable %var',
            code: 'hideVar'
        },
        doDeclareVariables: {
            type: 'command',
            category: 'other',
            spec: 'script variables %scriptVars',
            code: 'var'
        },

        // inheritance
        doDeleteAttr: {
            type: 'command',
            category: 'variables',
            spec: 'inherit %shd',
            code: 'inherit'
        },

        // Lists
        reportNewList: {
            type: 'reporter',
            category: 'lists',
            spec: 'list %exp',
            code: 'list',
            src: `(
                (prim t reportNewList inputs)
                (report (get inputs)))`
        },
        reportCONS: {
            type: 'reporter',
            category: 'lists',
            spec: '%s in front of %l',
            code: 'cons'
        },
        reportListItem: {
            type: 'reporter',
            category: 'lists',
            spec: 'item %idx of %l',
            defaults: [1],
            code: 'item'
        },
        reportCDR: {
            type: 'reporter',
            category: 'lists',
            spec: 'all but first of %l',
            code: 'cdr'
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
            defaults: [['length']],
            code: 'data'
        },
        reportListContainsItem: {
            type: 'predicate',
            category: 'lists',
            spec: '%l contains %s',
            defaults: [null, localize('thing')],
            code: 'contains',
            src: `(
                (prim t reportListContainsItem data value)
                (warp (for i 1 (data [length] (get data))
                    (if (= (item (get i) (get data)) (get value))
                        (report (bool t)))))
                (report (bool f)))`
        },
        reportListIsEmpty: {
            type: 'predicate',
            category: 'lists',
            spec: 'is %l empty?',
            code: 'empty',
            src: `(
                (prim t reportListIsEmpty data)
                (report (= (get data) (list))))`
        },
        reportListIndex: {
            type: 'reporter',
            category: 'lists',
            spec: 'index of %s in %l',
            defaults: [localize('thing')],
            code: '#',
            src: `(
                (prim t reportListIndex value data)
                (warp (for i 1 (data [length] (get data))
                    (if (= (item (get i) (get data)) (get value))
                        (report (get i)))))
                (report 0))`
        },
        doAddToList: {
            type: 'command',
            category: 'lists',
            spec: 'add %s to %l',
            defaults: [localize('thing')],
            code: 'add'
        },
        doDeleteFromList: {
            type: 'command',
            category: 'lists',
            spec: 'delete %ida of %l',
            defaults: [1],
            code: 'del'
        },
        doInsertInList: {
            type: 'command',
            category: 'lists',
            spec: 'insert %s at %idx of %l',
            defaults: [localize('thing'), 1],
            code: 'ins'
        },
        doReplaceInList: {
            type: 'command',
            category: 'lists',
            spec: 'replace item %idx of %l with %s',
            defaults: [1, null, localize('thing')],
            code: 'put'
        },

        // numbers - (arrayed when hyper-blocks is on, otherwise linked)
        reportNumbers: {
            type: 'reporter',
            category: 'lists',
            spec: 'numbers from %n to %n',
            defaults: [1, 10],
            code: 'range',
            src: `(
                (prim t reportNumbers start end)
                (report (zip (ring (
                    (var result)
                    (set result (list))
                    (warp (for i nil nil
                        (add (get i) (get result))))
                    (report (get result))))
                (get start) 0
                (get end) 0)))`
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
            spec: 'append %lists',
            code: 'append',
            src: `(
                (prim t reportConcatenatedLists lists)
                (var result)
                (set result (list))
                (warp (forEach list (get lists)
                    (forEach item (get list)
                        (add (get item) (get result)))))
                (report (get result)))`
        },
        reportCrossproduct: {
            type: 'reporter',
            category: 'lists',
            spec: 'combinations %lists',
            code: 'combinations',
            src: `(
                (prim t reportCrossproduct lists)
                (report (ifThen (empty (get lists))
                    (list (list))
                    (append : (map
                        (ring (map (ring
                            (cons (get first) nil))
                            (combinations : (cdr (get lists)))) first)
                        (item 1 (get lists)))))))`
        },
        reportTranspose: { // deprecated
            type: 'reporter',
            category: 'lists',
            spec: 'transpose %l'
        },
        reportReshape: {
            type: 'reporter',
            category: 'lists',
            spec: 'reshape %s to %nums',
            defaults: [null, [4, 3]],
            code: 'reshape'
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
            spec: 'map %repRing over %l',
            code: 'map',
            src: `(
                (prim t reportMap ring data)
                (var result implicit?)
                (set result (list))
                (set implicit? (empty (attribute "[input names]" (get ring))))
                (warp (for i 1 (data [length] (get data))
                    (add (call (get ring) :
                        (ifThen (get implicit?)
                            (list (item (get i) (get data)))
                            (list (item (get i) (get data))
                                (get i) (get data))))
                        (get result))))
                (report (get result)))`
        },
        reportAtomicMap: {
            dev: true, // not shown in palette, only accessible via relabelling
            type: 'reporter',
            category: 'lists',
            spec: '$blitz map %repRing over %l'
        },
        reportKeep: {
            type: 'reporter',
            category: 'lists',
            spec: 'keep items %predRing from %l',
            code: 'keep',
            src: `(
                (prim t reportKeep ring data)
                (var result implicit?)
                (set result (list))
                (set implicit? (empty (attribute "[input names]" (get ring))))
                (warp (for i 1 (data [length] (get data))
                    (if (call (get ring) :
                        (ifThen (get implicit?)
                            (list (item (get i) (get data)))
                            (list (item (get i) (get data))
                                (get i) (get data))))
                        (add (item (get i) (get data)) (get result)))))
                (report (get result)))`
        },
        reportAtomicKeep: {
            dev: true, // not shown in palette, only accessible via relabelling
            type: 'reporter',
            category: 'lists',
            spec: '$blitz keep items %predRing from %l'
        },
        reportFindFirst: {
            type: 'reporter',
            category: 'lists',
            spec: 'find first item %predRing in %l',
            code: 'find',
            src: `(
                (prim t reportFindFirst ring data)
                (var implicit?)
                (set implicit? (empty (attribute "[input names]" (get ring))))
                (warp (for i 1 (data [length] (get data))
                    (if (call (get ring) :
                        (ifThen (get implicit?)
                            (list (item (get i) (get data)))
                            (list (item (get i) (get data))
                                (get i) (get data))))
                        (report (item (get i) (get data))))))
                (report nil))`
        },
        reportAtomicFindFirst: {
            dev: true, // not shown in palette, only accessible via relabelling
            type: 'reporter',
            category: 'lists',
            spec: '$blitz find first item %predRing in %l'
        },
        reportCombine: {
            type: 'reporter',
            category: 'lists',
            spec: 'combine %l using %repRing',
            code: 'combine',
            src: `(
                (prim t reportCombine data ring)
                (if
                    (empty (get data))
                        (report 0)
                    (= (data [length] (get data)) 1)
                        (report (item 1 (get data)))
                )
                (report (call (get ring)
                    (item 1 (get data))
                    (call (this [script])
                        (cdr (get data))
                        (get ring)))))`
        },
        reportAtomicCombine: {
            dev: true, // not shown in palette, only accessible via relabelling
            type: 'reporter',
            category: 'lists',
            spec: '$blitz combine %l using %repRing'
        },
        doForEach: {
            type: 'command',
            category: 'lists',
            spec: 'for each %upvar in %l %cla',
            defaults: [localize('item')],
            code: 'forEach',
            src: `(
                (prim t doForEach item data action)
                (report (map
                    (ring (
                        (set item nil)
                        (run (get action))
                        (report 0)))
                    (get data))))`
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
            defaults: [null, ['code']],
            code: 'transpile'
        },
        doMapValueCode: {
            type: 'command',
            category: 'other',
            spec: 'map %mapValue to code %code',
            defaults: [['String'], '<#1>'],
            code: 'literal'
        },
        doMapListCode: {
            type: 'command',
            category: 'other',
            spec: 'map %codeListPart of %codeListKind to code %code',
            code: 'delimit'
        },
        reportMappedCode: {
            type: 'reporter',
            category: 'other',
            spec: 'code of %cmdRing',
            code: 'encode'
        },

        // Extensions
        doPrimitive: {
            type: 'command',
            category: 'other',
            spec: '%bool primitive %prim',
            defaults: [true],
            code: 'prim'
        },
        doApplyExtension: {
            type: 'command',
            category: 'other',
            spec: 'extension %ext %mult%s',
            code: 'extension'
        },
        reportApplyExtension: {
            type: 'reporter',
            category: 'other',
            spec: 'extension %ext %mult%s',
            code: 'ext'
        },

        // Video motion
        doSetVideoTransparency: {
            type: 'command',
            category: 'sensing',
            spec: 'set video transparency to %n',
            defaults: [50],
            code: 'transparency'
        },
        reportVideo: {
            type: 'reporter',
            category: 'sensing',
            spec: 'video %vid on %self',
            defaults: [['motion'], ['myself']],
            code: 'video'
        },
// Adding 6 dev primitives to offer compatibility with Snap4Arduino projects

        reportConnected: {
            dev: true,
            type: 'predicate',
            category: 'other',
            spec: 'arduino connected?',
            src:`(
                (prim t reportConnected) 
                (report 
                    (ext s4a_reportConnected)
                )
            )`
        },
        digitalWrite: {
            dev: true,
            type: 'command',
            category: 'other',
            spec: 'set digital pin %n to %b',
            src:`(
                (prim t digitalWrite pin value) 
                (extension "s4a_digitalWrite(pin, value)" 
                    (get pin) 
                    (get value)
                )
            )`
        },
        pwmWrite: {
            dev: true,
            type: 'command',
            category: 'other',
            spec: 'set pin %n to value %n',
            defaults: [null, 128],
            src:`(
                (prim t pwmWrite pin value) 
                (extension "s4a_pwmWrite(pin, value)" 
                    (get pin) 
                    (get value)
                )
            )`
        },
        servoWrite: {
            dev: true,
            type: 'command',
            category: 'other',
            spec: 'set servo %n to %s',
            defaults: [null, ['clockwise']],
            src:`(
                (prim t servoWrite pin value) 
                (extension "s4a_servoWrite(pin, value)" 
                    (get pin) 
                    (ext "txt_transform(name, txt)" unselect 
                        (get value)
                    )
                )
            )`
        },
            reportAnalogReading: {
            dev: true,
            type: 'reporter',
            category: 'other',
            spec: 'analog reading %n',
            src:`(
                (prim t reportAnalogReading pin) 
                (report 
                    (ext "s4a_reportAnalogReading(pin)" 
                        (get pin)
                    )
                )
            )`
        },
        reportDigitalReading: {
            dev: true,
            type: 'predicate',
            category: 'other',
            spec: 'digital reading %n',
            src:`(
                (prim t reportDigitalReading pin) 
                (report 
                    (ext "s4a_reportDigitalReading(pin)" 
                        (get pin)
                    )
                )
            )`
        }
    };
};

SpriteMorph.prototype.initBlocks = function () {
    SpriteMorph.prototype.blocks = this.primitiveBlocks();
    this.initHyperZip();
};

SpriteMorph.prototype.initHyperZip = function () {
    var info = SpriteMorph.prototype.blocks.reportHyperZip,
        def = SpriteMorph.prototype.customBlockDefinitionFor('reportHyperZip'),
        proc = new Process(null, this.parentThatIsA(StageMorph));

    def.primitive = false;
    info.definition = def;
    proc.pushContext();
    def.setBlockDefinition(proc.assemble(proc.parseCode(info.src)));
};

SpriteMorph.prototype.hasCustomizedPrimitives = function () {
    return Object.keys(this.blocks).some(selector =>
        selector !== 'reportHyperZip' &&
            this.blocks[selector].definition instanceof CustomBlockDefinition
    );
};

SpriteMorph.prototype.isBlocksAllTheWay = function () {
    var excluded = ['hat', 'ring'];
    return Object.keys(this.blocks).every(selector => {
        var record = this.blocks[selector];
        return record.definition instanceof CustomBlockDefinition ||
            excluded.includes(record.type);
    });
};

SpriteMorph.prototype.customBlockDefinitionFor = function (selector) {
    // generate a custom block definition header for the primitive block entry
    // identified by the selector - experimental for v10

    var record = this.blocks[selector],
        parts,
        count,
        slotName,
        spec,
        decl,
        entry,
        def;

    if (!record || ['hat', 'ring'].includes(record.type)) {
        return null;
    }

    parts = CustomBlockDefinition.prototype.parseSpec(record.spec);
    count = 0;

    // transform the spec into a definition spec with %names
    // and populates the slot declarations
    decl = new Map();
    spec = parts.map(word => {
        if (word === '%br') {
            return '$nl';
        } else if (word[0] === '%' && (word.length > 1)) {
            entry = CustomBlockDefinition.prototype.declarationFor(
                word
            );
            // the default values needs to be set externally (here)
            entry[1] = record.defaults ? record.defaults[count] : null;
            if (entry[1] instanceof Array) {
                if (entry[1].length === 1 && isString(entry[1][0])) {
                    // tag entry as selector so it becomes localizable
                    entry[1] = '$_' + entry[1][0];
                } else {
                    // encode the array as text
                    entry[1] = entry[1].map(v =>
                        v.toString().trim()).join('\n').trim();
                }
            } else if (
                (word === '%words' || word.startsWith('%mult')) &&
                entry[1]
            ) {
                // encode the remaining values as text
                entry[1] = record.defaults.slice(count).map(v =>
                    v.toString()).join('\n').trim();
            }
            count += 1;
            slotName = '%#' + count;
            decl.set('#' + count, entry);
            return slotName;
        }
        return word;
    }).join(' ');
    def = new CustomBlockDefinition(spec);
    def.selector = selector;
    def.primitive = selector;
    def.usePrimitive = true;
    def.declarations = decl;
    def.isGlobal = true;
    def.type = record.type;
    def.category = record.category;
    return def;
};

SpriteMorph.prototype.customizeBlocks = function () {
    // generate custom block definition headers for all block descriptions
    // in the blocks dictionary - experimental for v10
    var skipped = [];
    Object.keys(SpriteMorph.prototype.blocks).forEach(key => {
        if (!this.customizePrimitive(key)) {
            skipped.push(key);
        }
    });
    this.parentThatIsA(IDE_Morph).refreshPalette();
    return skipped;
};

SpriteMorph.prototype.customizePrimitive = function (
    selector,
    withCode,
    ersatz, // optional alternative definition, e.g. when editing a primitive
    alsoIn // optional alternative stage to scan when deserializing
) {
    var info = SpriteMorph.prototype.blocks[selector],
        ide = this.parentThatIsA(IDE_Morph),
        def, prot, proc;

    if (info.definition instanceof CustomBlockDefinition) {
        return false;
    }
    def = ersatz || SpriteMorph.prototype.customBlockDefinitionFor(selector);
    if (isNil(def)) {return false; }
    info.definition = def;
    prot = Object.getPrototypeOf(def.blockInstance());
    this.allPrimitiveBlockInstances(selector, alsoIn).forEach(block => {
        Object.setPrototypeOf(block, prot);
        block.selector = def.primitive || 'evaluateCustomBlock';
        block.definition = def;
        block.isCustomBlock = true;
        block.isGlobal = def.isGlobal;
        block.isPrototype = false;
        block.variables = null;
        block.initializeVariables(def.variableNames);
        block.refresh();
    });
    if (withCode && info.src) {
        proc = new Process(null, this.parentThatIsA(StageMorph));
        proc.pushContext();
        def.setBlockDefinition(proc.assemble(proc.parseCode(info.src)));
    }
    if (ide) {
        ide.flushBlocksCache();
    }
    return true;
};

SpriteMorph.prototype.restorePrimitives = function () {
    Object.keys(SpriteMorph.prototype.blocks).forEach(key => {
        let def = SpriteMorph.prototype.blocks[key].definition;
        if (def instanceof CustomBlockDefinition) {
            this.restorePrimitive(def);
        }
    });
    this.parentThatIsA(IDE_Morph).refreshPalette();
};

SpriteMorph.prototype.restorePrimitive = function (definition) {
    var selector = definition.selector,
        info = SpriteMorph.prototype.blocks[selector],
        all = this.allBlockInstances(definition),
        ide = this.parentThatIsA(IDE_Morph),
        inst, prot;

    if (!info.definition) {
        return false;
    }
    delete info.definition;
    inst = SpriteMorph.prototype.blockForSelector(selector);
    prot = Object.getPrototypeOf(inst);
    all.forEach(block => {
        block.selector = selector;
        delete block.definition;
        delete block.isCustomBlock;
        delete block.isGlobal;
        delete block.isPrototype;
        delete block.variables;
        Object.setPrototypeOf(block, prot);
        block.setSelector(selector);
    });
    if (ide) {
        ide.flushBlocksCache();
    }
    return true;
};

SpriteMorph.prototype.bootstrapCustomizedPrimitives = function (
    stage,
    skipped = []
) {
    var proc = new Process(null, stage);

    // cache the current palette
    proc.pushContext();
    proc.context.accumulator = proc.reportGet('blocks');

    Object.keys(this.blocks).forEach(sel => {
        if (skipped.includes(sel)) {return; }
        let info = this.blocks[sel],
            def = info.definition;
        if (info.src && def) {
            def.setBlockDefinition(proc.assemble(proc.parseCode(info.src)));
        }
    });
};

SpriteMorph.prototype.toggleAllCustomizedPrimitives = function (stage, choice) {
    this.bootstrappedBlocks().forEach(def => {
        var prim = def.body?.expression;
        if (prim && prim.selector === 'doPrimitive' && prim.nextBlock()) {
            prim.inputs()[0].setContents(choice);
            def.setPrimitive(
                choice ? prim.inputs()[1].contents().text || null : null
            );
            stage.allBlockInstances(def).reverse().forEach(block =>
                block.selector = def.primitive || 'evaluateCustomBlock'
            );
        }
    });
};

SpriteMorph.prototype.bootstrappedBlocks = function () {
    var boot = [];
    Object.keys(SpriteMorph.prototype.blocks).forEach(each => {
        if (each !== 'reportHyperZip' &&
                this.blocks[each].definition instanceof CustomBlockDefinition) {
            boot.push(this.blocks[each].definition);
        }
    });
    return boot;
};

SpriteMorph.prototype.quasiPrimitives = function () {
    return this.bootstrappedBlocks().filter(def =>
            def.isQuasiPrimitive()
    );
};

SpriteMorph.prototype.customizedPrimitives = function () {
    return this.bootstrappedBlocks().filter(def =>
            !def.isQuasiPrimitive()
    );
};

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
            selector: 'setPenColorDimension',
            inputs: [['hue']],
            offset: 1
        },
        setBrightness: {
            selector: 'setPenColorDimension',
            inputs: [['brightness']],
            offset: 1
        },
        setPenHSVA: {
            selector: 'setPenColorDimension'
        },
        changeHue: {
            selector: 'changePenColorDimension',
            inputs: [['hue']],
            offset: 1
        },
        changeBrightness: {
            selector: 'changePenColorDimension',
            inputs: [['brightness']],
            offset: 1
        },
        changePenHSVA: {
            selector: 'changePenColorDimension'
        },
        setBackgroundHSVA: {
            selector: 'setBackgroundColorDimension'
        },
        changeBackgroundHSVA: {
            selector: 'changeBackgroundColorDimension'
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
        },
        doSend: {
            selector: 'doBroadcast',
            expand: 1
        },
        reportSum: {
            selector: 'reportVariadicSum',
            variadic: true
        },
        reportProduct: {
            selector: 'reportVariadicProduct',
            variadic: true
        },
        reportMin: {
            selector: 'reportVariadicMin',
            variadic: true
        },
        reportMax: {
            selector: 'reportVariadicMax',
            variadic: true
        },
        reportAnd: {
            selector: 'reportVariadicAnd',
            variadic: true
        },
        reportOr: {
            selector: 'reportVariadicOr',
            variadic: true
        },
        reportLessThan: {
            selector: 'reportVariadicLessThan',
            variadic: true
        },
        reportGreaterThan: {
            selector: 'reportVariadicGreaterThan',
            variadic: true
        },
        reportLessThanOrEquals: {
            selector: 'reportVariadicLessThanOrEquals',
            variadic: true
        },
        reportGreaterThanOrEquals: {
            selector: 'reportVariadicGreaterThanOrEquals',
            variadic: true
        },
        reportEquals: {
            selector: 'reportVariadicEquals',
            variadic: true
        },
        reportNotEquals: {
            selector: 'reportVariadicNotEquals',
            variadic: true
        },
        reportIsIdentical: {
            selector: 'reportVariadicIsIdentical',
            variadic: true
        },
        reportThisContext: {
            selector: 'reportEnvironment',
            inputs: [['script']]
        },
        reportStringSize: {
            selector: 'reportTextAttribute',
            inputs: [['length']],
            offset: 1
        }
    };
};

SpriteMorph.prototype.newPrimitivesSince = function (version) {
    var selectors = ['reportJSFunction'];
    if (version < 10) {
        selectors.push(
            'reportNewCostumeSkewed'
        );
    }
    if (version < 9.1) {
        selectors.push(
            'reportNewCostumeSkewed',
            'reportAtan2',
            'reportVariadicMin',
            'reportVariadicMax'
        );
    }
    // 9: no new primitives
    // 8.2: no new primitives
    if (version < 8.1) {
        selectors.push(
            'reportPipe',
            'receiveUserEdit'
        );
    }
    if (version < 8) {
        selectors.push(
            'getPosition',
            'reportMousePosition',
            'doDefineBlock',
            'doSetBlockAttribute',
            'doDeleteBlock',
            'reportBlockAttribute',
            'reportEnvironment'
        );
    }
    if (version < 10) {
        selectors.push(
            'reportNewCostumeSkewed'
        );
    }
    // 10.1: no new primitives
    if (version < 10.2) {
        selectors.push(
            'receiveSlotEvent',
            'doSetSlot'
        );
    }
    if (version < 10.3) {
        selectors.push(
            'receiveConditionEvent',
        );
    }
    // 10.4 - 10.7: no new primitives
    if (version < 10.8) {
        selectors.push(
            'reportColor',
            'reportColorAttribute',
            'reportNewColor'
        );
    }
    if (version < 11) {
        selectors.push(
            'reportPoll'
        );
    }
    if (version < 12) {
        selectors.push(
            'doDrawOn'
        );
    }

    return selectors;
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
    xPosition: ['yPosition', 'getPosition'],
    yPosition: ['xPosition', 'getPosition'],
    getPosition: ['xPosition', 'yPosition'],

    // looks:
    doSayFor: ['doThinkFor', 'bubble', 'doThink', 'doAsk'],
    doThinkFor: ['doSayFor', 'doThink', 'bubble', 'doAsk'],
    bubble: ['doThink', 'doAsk', 'doSayFor', 'doThinkFor'],
    doThink: ['bubble', 'doAsk', 'doSayFor', 'doThinkFor'],
    reportNewCostumeStretched: ['reportNewCostumeSkewed'],
    reportNewCostumeSkewed: ['reportNewCostumeStretched'],
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
    setPenColorDimension: ['changePenColorDimension'],
    changePenColorDimension: ['setPenColorDimension'],
    setBackgroundColorDimension: ['changeBackgroundColorDimension'],
    changeBackgroundColorDimension: ['setBackgroundColorDimension'],
    changeSize: ['setSize'],
    setSize: ['changeSize'],

    // control:
    doBroadcast: ['doBroadcastAndWait'],
    doBroadcastAndWait: ['doBroadcast'],
    doIf: ['doIfElse', 'doUntil'],
    doIfElse: ['doIf', 'doUntil'],
    doRepeat: ['doUntil', ['doForever', -1], ['doFor', 2], ['doForEach', 1]],
    doUntil: ['doRepeat', 'doIf', ['doForever', -1], ['doFor', 2],
        ['doForEach', 1]],
    doForever: [['doUntil', 1], ['doRepeat', 1], ['doFor', 3],
        ['doForEach', 2]],
    doFor: [['doForever', -3], ['doRepeat', -2], ['doUntil', -2],
        ['doForEach', -1]],
    receiveCondition: ['receiveConditionEvent'],
    receiveConditionEvent: ['receiveCondition'],
    // doRun: ['fork'],
    // fork: ['doRun'],

    // sensing:
    doAsk: ['bubble', 'doThink', 'doSayFor', 'doThinkFor'],
    getLastAnswer: ['getTimer'],
    getTimer: ['getLastAnswer'],
    reportMouseX: ['reportMouseY', 'reportMousePosition'],
    reportMouseY: ['reportMouseX', 'reportMousePosition'],
    reportMousePosition: ['reportMouseX', 'reportMouseY'],

    // operators:
    reportVariadicSum: ['reportDifference', 'reportVariadicProduct',
        'reportQuotient', 'reportPower', 'reportModulus', 'reportAtan2',
        'reportVariadicMin', 'reportVariadicMax'],
    reportDifference: ['reportVariadicSum', 'reportVariadicProduct',
        'reportQuotient', 'reportPower', 'reportModulus', 'reportAtan2',
        'reportVariadicMin', 'reportVariadicMax'],
    reportVariadicProduct: ['reportDifference', 'reportVariadicSum',
        'reportQuotient', 'reportPower', 'reportModulus', 'reportAtan2',
        'reportVariadicMin', 'reportVariadicMax'],
    reportQuotient: ['reportDifference', 'reportVariadicProduct',
        'reportVariadicSum', 'reportPower', 'reportModulus', 'reportAtan2',
        'reportVariadicMin', 'reportVariadicMax'],
    reportPower: ['reportDifference', 'reportVariadicProduct',
        'reportVariadicSum', 'reportQuotient', 'reportModulus', 'reportAtan2',
        'reportVariadicMin', 'reportVariadicMax'],
    reportModulus: ['reportAtan2', 'reportDifference', 'reportVariadicProduct',
        'reportVariadicSum','reportQuotient', 'reportPower',
        'reportVariadicMin', 'reportVariadicMax'],
    reportAtan2: ['reportModulus', 'reportDifference', 'reportVariadicProduct',
        'reportVariadicSum','reportQuotient', 'reportPower',
        'reportVariadicMin', 'reportVariadicMax'],
    reportVariadicMin: ['reportVariadicMax', 'reportVariadicSum',
        'reportDifference', 'reportVariadicProduct', 'reportQuotient',
        'reportPower', 'reportModulus', 'reportAtan2'],
    reportVariadicMax: ['reportVariadicMin', 'reportVariadicSum',
        'reportDifference', 'reportVariadicProduct', 'reportQuotient',
        'reportPower', 'reportModulus', 'reportAtan2'],
    reportVariadicLessThan: ['reportVariadicLessThanOrEquals',
        'reportVariadicEquals', 'reportVariadicIsIdentical',
        'reportVariadicNotEquals', 'reportVariadicGreaterThan',
        'reportVariadicGreaterThanOrEquals'],
    reportVariadicEquals: ['reportVariadicIsIdentical',
        'reportVariadicNotEquals', 'reportVariadicLessThan',
        'reportVariadicLessThanOrEquals', 'reportVariadicGreaterThan',
        'reportVariadicGreaterThanOrEquals'],
    reportVariadicNotEquals: ['reportVariadicEquals',
        'reportVariadicIsIdentical', 'reportVariadicLessThan',
        'reportVariadicLessThanOrEquals', 'reportVariadicGreaterThan',
        'reportVariadicGreaterThanOrEquals'],
    reportVariadicGreaterThan: ['reportVariadicGreaterThanOrEquals',
        'reportVariadicEquals', 'reportVariadicIsIdentical',
        'reportVariadicNotEquals', 'reportVariadicLessThan',
        'reportVariadicLessThanOrEquals'],
    reportVariadicLessThanOrEquals: ['reportVariadicLessThan',
        'reportVariadicEquals', 'reportVariadicIsIdentical',
        'reportVariadicNotEquals', 'reportVariadicGreaterThan',
        'reportVariadicGreaterThanOrEquals'],
    reportVariadicGreaterThanOrEquals: ['reportVariadicGreaterThan',
        'reportVariadicEquals', 'reportVariadicIsIdentical',
        'reportVariadicNotEquals', 'reportVariadicLessThan',
        'reportVariadicLessThanOrEquals'],
    reportVariadicIsIdentical: ['reportVariadicEquals',
        'reportVariadicNotEquals', 'reportVariadicLessThan',
        'reportVariadicLessThanOrEquals', 'reportVariadicGreaterThan',
        'reportVariadicGreaterThanOrEquals'],
    reportVariadicAnd: ['reportVariadicOr'],
    reportVariadicOr: ['reportVariadicAnd'],

    // variables
    doSetVar: ['doChangeVar'],
    doChangeVar: ['doSetVar'],
    doShowVar: ['doHideVar'],
    doHideVar: ['doShowVar'],

    // lists
    reportConcatenatedLists: ['reportCrossproduct'],
    reportCrossproduct: ['reportConcatenatedLists'],

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

    // volume and stereo-pan support
    this.volume = 100;
    this.gainNode = null; // must be lazily initialized in Chrome, sigh...
    this.pan = 0;
    this.pannerNode = null; // must be lazily initialized in Chrome, sigh...

    // frequency player
    this.freqPlayer = null; // Note, to be lazily initialized

    // pen color dimensions support
    this.cachedColorDimensions = [0, 0, 0]; // not serialized

    // only temporarily for serialization
    this.inheritedMethodsCache = [];

    // sprite nesting properties
    this.parts = []; // not serialized, only anchor (name)
    this.anchor = null;
    this.nestingScale = 1;
    this.rotatesWithAnchor = true;
    this.layers = null; // cache for dragging nested sprites, don't serialize

    // Parsons Problems properties
    this.solution = null;

    this.primitivesCache = {}; // not to be serialized (!)
    this.paletteCache = {}; // not to be serialized (!)
    this.categoriesCache = null; // not to be serialized (!)
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

    // support for drawing on sprites
    this.sheet = null; // a sprite - surface destination to draw on
    this.tool = null; // string: blending mode ('paint', 'erase', 'overdraw')
    this.trailsCache = null; // a temporary costume for drawing on
    // this.originalCostume = null; // hold on to the unmodified original
    // costume, disabled for now

    SpriteMorph.uber.init.call(this);

    this.isFreeForm = true;
    this.cachedColorDimensions = this.color[this.penColorModel]();
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
    c.primitivesCache = {};
    c.paletteCache = {};
    c.categoriesCache = null;
    c.imageData = {};
    c.cachedColorDimensions = c.color[this.penColorModel]();
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
        if (c.costume instanceof Costume && !c.getCostumeIdx()) {
            c.costume = c.costume.copy();
        }
        arr = [];
        this.costumes.asArray().forEach(costume => {
            var cst = forClone ? costume : costume.copy();
            arr.push(cst);
            if (costume === this.costume) {
                c.costume = cst;
            }
        });
        c.costumes = new List(arr);
        c.costumes.type = 'costume';
        arr = [];
        this.sounds.asArray().forEach(sound => {
            var snd = forClone ? sound : sound.copy();
            arr.push(snd);
        });
        c.sounds = new List(arr);
        c.sounds.type = 'sound';
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
    var old = this.name;
    if (old === string) {return; }
    this.name = string || this.name;
    this.version = Date.now();
    this.recordUserEdit('sprite', 'name', old);
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
        costumeExtent,
        ide = this.parentThatIsA(IDE_Morph);

    currentCenter = this.center();
    isLoadingCostume = this.costume &&
        typeof this.costume.loaded === 'function';
    stageScale = this.parent instanceof StageMorph ?
            this.parent.scale : 1;
    if (ide?.performerMode) { stageScale = ide.performerScale; }
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

SpriteMorph.prototype.fullDrawOn = function (aContext, aRect) {
    if (!this.isVisible) {return; }
    this.isCachingImage = SpriteMorph.prototype.isCachingImage ||
        this.graphicsChanged();
    this.drawOn(aContext, aRect);
    this.children.forEach(child => child.fullDrawOn(aContext, aRect));
};

SpriteMorph.prototype.render = function (ctx) {
    var myself = this,
        facing, // actual costume heading based on my rotation style
        isFlipped,
        isLoadingCostume,
        cst,
        pic, // (flipped copy of) actual costume based on my rotation style
        stageScale,
        handle,
        ide = this.parentThatIsA(IDE_Morph);

    isLoadingCostume = this.costume &&
        typeof this.costume.loaded === 'function';
    stageScale = this.parent instanceof StageMorph ?
            this.parent.scale : 1;
    if (ide?.performerMode) { stageScale = ide.performerScale; }
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
    this.applyGraphicsEffects(this.cachedImage);
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
    if (info.definition instanceof CustomBlockDefinition) {
        // overload primitive with global custom block
        block = info.definition.blockInstance();
        if (setDefaults) {
            block.refreshDefaults(info.definition);
        }
        return block;
    } else {
        block = info.type === 'command' ? new CommandBlockMorph()
            : info.type === 'hat' ? new HatBlockMorph()
                : info.type === 'ring' ? new RingMorph()
                    : new ReporterBlockMorph(info.type === 'predicate');
        block.color = this.blockColorFor(info.category);
        block.category = info.category;
        block.selector = migration ? migration.selector : selector;
        if (contains(['reifyReporter', 'reifyPredicate'], block.selector)) {
            block.isStatic = true;
        }
        block.setSpec(block.localizeBlockSpec(info.spec));
    }
    if (migration && migration.expand) {
        if (migration.expand instanceof Array) {
            for (i = 0; i < migration.expand[1]; i += 1) {
                block.inputs()[migration.expand[0]].addInput();
            }
        } else {
            block.inputs()[migration.expand].addInput();
        }
    }
    if (info.defaults || migration?.inputs) {
        defaults = migration?.inputs || info.defaults;
        block.defaults = defaults;
        inputs = block.inputs();
        if (inputs[0] instanceof MultiArgMorph) {
            inputs[0].defaults = defaults;
            if (setDefaults || migration?.inputs) {
                inputs[0].setContents(defaults);
            }
        } else {
            for (i = 0; i < defaults.length; i += 1) {
                if (defaults[i] !== null) {
                    if (setDefaults || migration?.inputs) {
                        inputs[i].setContents(defaults[i]);
                    }
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

SpriteMorph.prototype.blockTemplates = function (
    category = 'motion',
    all = false // include hidden blocks
) {
    var blocks = [], myself = this, varNames,
        inheritedVars = this.inheritedVariableNames(),
        wrld = this.world(),
        devMode = wrld && wrld.isDevMode;

    function block(selector, isGhosted) {
        if (StageMorph.prototype.hiddenPrimitives[selector] && !all) {
            return null;
        }
        var newBlock = SpriteMorph.prototype.blockForSelector(selector, true);
        newBlock.isDraggable = false;
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

    function variableWatcherToggle(varName, isGlobal) {
        return new ToggleMorph(
            'checkbox',
            this,
            function () {
                myself.toggleVariableWatcher(varName, isGlobal);
            },
            null,
            function () {
                return myself.showingVariableWatcher(varName, isGlobal);
            },
            null
        );
    }

    SnapExtensions.buttons.palette.forEach(buttonDescriptor => {
        if (buttonDescriptor.category === category) {
            blocks.push(this.customPaletteButton(buttonDescriptor));
        }
    });

    if (category === 'motion') {

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
        blocks.push(block('getPosition'));
        blocks.push(watcherToggle('xPosition'));
        blocks.push(block('xPosition', this.inheritsAttribute('x position')));
        blocks.push(watcherToggle('yPosition'));
        blocks.push(block('yPosition', this.inheritsAttribute('y position')));
        blocks.push(watcherToggle('direction'));
        blocks.push(block('direction', this.inheritsAttribute('direction')));

    } else if (category === 'looks') {

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
        blocks.push(block('reportNewCostumeSkewed'));
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
        if (devMode) {
            blocks.push('-');
            blocks.push(this.devModeText());
            blocks.push('-');
            blocks.push(block('log'));
            blocks.push(block('alert'));
            blocks.push('-');
            blocks.push(block('doScreenshot'));
        }

    } else if (category === 'sound') {

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
        if (devMode) {
            blocks.push('-');
            blocks.push(this.devModeText());
            blocks.push('-');
            blocks.push(block('doPlayFrequency'));
        }

    } else if (category === 'pen') {

        blocks.push(block('clear'));
        blocks.push('-');
        blocks.push(block('down'));
        blocks.push(block('up'));
        blocks.push(watcherToggle('getPenDown'));
        blocks.push(block('getPenDown', this.inheritsAttribute('pen down?')));
        blocks.push('-');
        blocks.push(block('setColor'));
        blocks.push(block('changePenColorDimension'));
        blocks.push(block('setPenColorDimension'));
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
        blocks.push(block('doDrawOn'));
        blocks.push('-');
        blocks.push(block('reportColor'));
        blocks.push(block('reportColorAttribute'));
        blocks.push(block('reportNewColor'));

    } else if (category === 'control') {

        blocks.push(block('receiveGo'));
        blocks.push(block('receiveKey'));
        blocks.push(block('receiveInteraction'));
        blocks.push(block('receiveConditionEvent'));
        blocks.push('-');
        blocks.push(block('receiveMessage'));
        blocks.push(block('doBroadcast'));
        blocks.push(block('doBroadcastAndWait'));
        blocks.push(block('reportPoll'));
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
        // blocks.push(block('doVariadicIf'));
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
        blocks.push(block('reportPipe'));
        blocks.push('-');
        blocks.push(block('doTellTo'));
        blocks.push(block('reportAskFor'));
        blocks.push('-');
        blocks.push(block('receiveOnClone'));
        blocks.push(block('createClone'));
        blocks.push(block('newClone'));
        blocks.push(block('removeClone'));
        blocks.push('-');
        blocks.push(block('doPauseAll'));
        blocks.push(block('doSwitchToScene'));
        blocks.push('-');
        blocks.push(block('receiveUserEdit'));
        blocks.push(block('doDefineBlock'));
        blocks.push(block('doDeleteBlock'));
        blocks.push(block('doSetBlockAttribute'));
        blocks.push(block('reportBlockAttribute'));
        blocks.push(block('reportEnvironment'));
        blocks.push('-');
        blocks.push(block('receiveSlotEvent'));
        blocks.push(block('doSetSlot'));

        // for debugging: ///////////////
        if (devMode) {
            blocks.push('-');
            blocks.push(this.devModeText());
            blocks.push('-');
            blocks.push(watcherToggle('getLastMessage'));
            blocks.push(block('getLastMessage'));
            blocks.push(block('reportHyperZip'));
        // deprecated - superseded by reportEnviornment - retained for legacy
            blocks.push('-');
            blocks.push(block('doCallCC'));
            blocks.push(block('reportCallCC'));
        }

    } else if (category === 'sensing') {

        blocks.push(block('reportTouchingObject'));
        blocks.push(block('reportTouchingColor'));
        blocks.push(block('reportColorIsTouchingColor'));
        blocks.push('-');
        blocks.push(block('doAsk'));
        blocks.push(watcherToggle('getLastAnswer'));
        blocks.push(block('getLastAnswer'));
        blocks.push('-');
        blocks.push(block('reportMousePosition'));
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
        blocks.push(block('reportDate'));
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

        // for debugging: ///////////////
        if (devMode) {
            blocks.push('-');
            blocks.push(this.devModeText());
            blocks.push('-');
            blocks.push(watcherToggle('reportThreadCount'));
            blocks.push(block('reportThreadCount'));
            blocks.push(block('reportStackSize'));
            blocks.push(block('reportFrameCount'));
            blocks.push(block('reportYieldCount'));
        }
    } else if (category === 'operators') {

        blocks.push(block('reifyScript'));
        blocks.push(block('reifyReporter'));
        blocks.push(block('reifyPredicate'));
        blocks.push('#');
        blocks.push('-');
        blocks.push(block('reportVariadicSum'));
        blocks.push(block('reportDifference'));
        blocks.push(block('reportVariadicProduct'));
        blocks.push(block('reportQuotient'));
        blocks.push(block('reportPower'));
        blocks.push('-');
        blocks.push(block('reportModulus'));
        blocks.push(block('reportVariadicMin'));
        blocks.push(block('reportVariadicMax'));
        blocks.push('-');
        blocks.push(block('reportRound'));
        blocks.push(block('reportMonadic'));
        blocks.push(block('reportAtan2'));
        blocks.push(block('reportRandom'));
        blocks.push('-');
        blocks.push(block('reportVariadicLessThan'));
        blocks.push(block('reportVariadicEquals'));
        blocks.push(block('reportVariadicGreaterThan'));
        blocks.push('-');
        blocks.push(block('reportVariadicAnd'));
        blocks.push(block('reportVariadicOr'));
        blocks.push(block('reportNot'));
        blocks.push(block('reportBoolean'));
        blocks.push('-');
        blocks.push(block('reportJoinWords'));
        blocks.push(block('reportTextSplit'));
        blocks.push(block('reportLetter'));
        blocks.push(block('reportTextAttribute'));
        blocks.push('-');
        blocks.push(block('reportUnicode'));
        blocks.push(block('reportUnicodeAsLetter'));
        blocks.push('-');
        blocks.push(block('reportIsA'));
        blocks.push(block('reportVariadicIsIdentical'));

        if (Process.prototype.enableJS) {
            blocks.push('-');
            blocks.push(block('reportJSFunction'));
            if (Process.prototype.enableCompiling) {
                blocks.push(block('reportCompiled'));
            }
        }
        // for debugging: ///////////////
        if (devMode) {
            blocks.push('-');
            blocks.push(this.devModeText());
            blocks.push('-');
            blocks.push(block('reportTypeOf'));
            blocks.push(block('reportTextFunction'));
        }

    } else if (category === 'variables') {

        blocks.push(this.makeVariableButton());
        if (this.deletableVariableNames().length > 0) {
            blocks.push(this.deleteVariableButton());
        }
        blocks.push('-');

        varNames = this.allGlobalVariableNames(true, all);
        if (varNames.length > 0) {
            varNames.forEach(name => {
                blocks.push(variableWatcherToggle(name, true));
                blocks.push(variableBlock(name));
            });
            blocks.push('-');
        }

        varNames = this.allLocalVariableNames(true, all);
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
        blocks.push(block('doAddToList'));
        blocks.push(block('doDeleteFromList'));
        blocks.push(block('doInsertInList'));
        blocks.push(block('doReplaceInList'));
        blocks.push('-');
        blocks.push(block('reportConcatenatedLists'));
        blocks.push(block('reportReshape'));
        blocks.push(block('reportCrossproduct'));

        if (SpriteMorph.prototype.showingExtensions) {
            blocks.push('=');
            blocks.push(block('doPrimitive'));
            blocks.push(block('doApplyExtension'));
            blocks.push(block('reportApplyExtension'));
        }

        if (StageMorph.prototype.enableCodeMapping) {
            blocks.push('=');
            blocks.push(block('doMapCodeOrHeader'));
            blocks.push(block('doMapValueCode'));
            blocks.push(block('doMapListCode'));
            blocks.push('-');
            blocks.push(block('reportMappedCode'));
        }

        // for debugging: ///////////////
        if (this.world()?.isDevMode) {
            blocks.push('-');
            blocks.push(this.devModeText());
            blocks.push('-');
            blocks.push(block('doShowTable'));
        }
    }

    return blocks;
};

// Utilities displayed in the palette
SpriteMorph.prototype.makeVariableButton = function () {
    var button, myself = this;

    function addVar(pair) {
        var ide;
        if (pair) {
            ide = myself.parentThatIsA(IDE_Morph);
            myself.addVariable(pair[0], pair[1]);
            myself.toggleVariableWatcher(pair[0], pair[1]);
            ide.flushBlocksCache('variables'); // b/c of inheritance
            ide.refreshPalette();
            myself.recordUserEdit(
                'palette',
                'variable',
                pair[1] ? 'global' : 'local',
                'new',
                pair[0]
            );
        }
    }

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
    button.userMenu = this.helpMenu;
    button.selector = 'addVariable';
    button.showHelp = BlockMorph.prototype.showHelp;
    return button;
};

SpriteMorph.prototype.deleteVariableButton = function () {
    var button, myself = this;
    button = new PushButtonMorph(
        null,
        function () {
            var menu = new MenuMorph(
                (vn) => myself.deleteVariable(vn),
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
    button.userMenu = this.helpMenu;
    button.selector = 'deleteVariable';
    button.showHelp = BlockMorph.prototype.showHelp;
    return button;
};

SpriteMorph.prototype.categoryText = function (category) {
    var txt = new StringMorph(
        localize(category[0].toUpperCase().concat(category.slice(1))),
        11,
        null,
        true
    );
    txt.setColor(this.paletteTextColor);
    txt.category = category;
    return txt;
};

SpriteMorph.prototype.devModeText = function () {
    var txt = new TextMorph(
        localize('development mode \ndebugging primitives:')
    );
    txt.fontSize = 9;
    txt.setColor(this.paletteTextColor);
    return txt;
};

SpriteMorph.prototype.helpMenu = function () {
    // return a 1 item context menu for anything that implements
    // a 'showHelp' method.
    var menu = new MenuMorph(this);
    menu.addItem('help...', 'showHelp');
    return menu;
};

SpriteMorph.prototype.customBlockTemplatesForCategory = function (
    category,
    includeHidden
) {
    // returns an array of block templates for a selected category.
    var ide = this.parentThatIsA(IDE_Morph), blocks = [],
        isInherited = false, block, inheritedBlocks;

    function addCustomBlock(definition) {
        if ((!definition.isHelper || includeHidden) &&
            definition.category === category)
        {
            block = definition.templateInstance();
            if (isInherited) {block.ghost(); }
            if (definition.spaceAbove) {
                blocks.push('-');
            }
            blocks.push(block);
        }
    }

    // global custom blocks:
    if (ide && ide.stage) {
        ide.stage.globalBlocks.forEach(addCustomBlock);
        if (this.customBlocks.length) {blocks.push('='); }
    }

    // local custom blocks:
    this.customBlocks.forEach(addCustomBlock);

    // inherited custom blocks:
    if (this.exemplar) {
        inheritedBlocks = this.inheritedBlocks(true);
        if (this.customBlocks.length && inheritedBlocks.length) {
            blocks.push('=');
        }
        isInherited = true;
        inheritedBlocks.forEach(addCustomBlock);
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

    button.userMenu = this.helpMenu;
    button.selector = 'addCustomBlock';
    button.showHelp = BlockMorph.prototype.showHelp;
    return button;
};

SpriteMorph.prototype.customPaletteButton = function (descriptor) {
    // buttons added by extensions (read the docs in extensions.js)
    var button = new PushButtonMorph(
        this,
        descriptor.action,
        descriptor.label,
        null,
        descriptor.hint
    );
    button.hideable = descriptor.hideable;
    return button;
};

SpriteMorph.prototype.makeBlock = function () {
    // prompt the user to make a new block
    var ide = this.parentThatIsA(IDE_Morph),
        stage = this.parentThatIsA(StageMorph),
        category = ide.currentCategory === 'unified' ?
            ide.topVisibleCategoryInPalette()
            : ide.currentCategory,
        clr = SpriteMorph.prototype.blockColorFor(category),
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
                ide.refreshEmptyCategories();
                ide.refreshPalette();
                this.recordUserEdit(
                    'palette',
                    'custom block',
                    definition.isGlobal ? 'global' : 'local',
                    'new',
                    definition.abstractBlockSpec()
                );
                new BlockEditorMorph(definition, this).popUp();
            }
        },
        this
    );
    if (category !== 'variables' || category !== 'unified') {
        dlg.category = category;
        dlg.categories.refresh();
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

SpriteMorph.prototype.getPrimitiveTemplates = function (category) {
    var blocks = Object.hasOwn(this.primitivesCache, category) ?
            this.primitivesCache[category]
            : null;
    if (!blocks) {
        blocks = this.blockTemplates(category);
        if (this.isCachingPrimitives) {
            this.primitivesCache[category] = blocks;
        }
    }
    return blocks;
};

SpriteMorph.prototype.palette = function (category) {
    if (!Object.hasOwn(this.paletteCache, category) ||
        !this.paletteCache[category]
    ) {
        this.paletteCache[category] = this.freshPalette(category);
    }
    return this.paletteCache[category];
};

SpriteMorph.prototype.freshPalette = function (category) {
    var myself = this,
        palette = new ScrollFrameMorph(null, null, this.sliderColor),
        unit = SyntaxElementMorph.prototype.fontSize,
        ide = this.parentThatIsA(IDE_Morph),
        showCategories,
        showButtons,
        x = 0,
        y = 5,
        ry = 0,
        blocks,
        hideNextSpace = false,
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

    if (!ide || !ide.config.noOwnBlocks) {
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
    }

    palette.toolBar.fixLayout();
    palette.add(palette.toolBar);

    // menu:
    palette.userMenu = function () {
        var menu = new MenuMorph();
            ide = ide || this.parentThatIsA(IDE_Morph);

        menu.addPair(
            [
                new SymbolMorph(
                    'magnifyingGlass',
                    MorphicPreferences.menuFontSize
                ),
                localize('find blocks') + '...'
            ],
            () => myself.searchBlocks(),
            '^F'
        );
        if (!ide.config.noOwnBlocks) {
            menu.addItem(
                'hide blocks...',
                () => new BlockVisibilityDialogMorph(myself).popUp(
                    myself.world())
            );
            if (ide.scene.template) {
                menu.addItem(
                    'restore palette',
                    () => ide.stage.restoreHiddenGlobalBlocks(
                        ide.scene.template.hide,
                        ide.scene.template.version
                    ),
                    '"' + ide.scene.template.name + '"'
                );
            }
            menu.addLine();
            menu.addItem(
                'make a category...',
                () => this.parentThatIsA(IDE_Morph).createNewCategory()
            );
            if (SpriteMorph.prototype.customCategories.size) {
                menu.addItem(
                    'delete a category...',
                    () => this.parentThatIsA(IDE_Morph).deleteUserCategory()
                );
            }
        }
        return menu;
    };

    if (category === 'unified') {
        // In a Unified Palette custom blocks appear following each category,
        // but there is only 1 make a block button (at the end).
        ide = ide || this.parentThatIsA(IDE_Morph);
        showCategories = ide.scene.showCategories;
        showButtons = ide.scene.showPaletteButtons;
        blocks = SpriteMorph.prototype.allCategories().reduce(
            (blocks, category) => {
                let header = [this.categoryText(category), '-'],
                    primitives = this.getPrimitiveTemplates(category),
                    customs = this.customBlockTemplatesForCategory(category),
                    showHeader = showCategories &&
                        !['lists', 'other'].includes(category) &&
                        (primitives.some(item =>
                            item instanceof BlockMorph) || customs.length);

                // hide category names
                if (!showCategories && category !== 'variables') {
                    primitives = primitives.filter(each =>
                        each !== '-' &&
                        each !== '=' &&
                        (each && !each.hideWithCategory));
                }

                // hide "make / delete a variable" buttons
                if (!showButtons && category === 'variables') {
                    primitives = primitives.filter(each =>
                        !((each instanceof PushButtonMorph && each.hideable) &&
                            !(each instanceof ToggleMorph)));
                }

                return blocks.concat(
                    showHeader ? header : [],
                    primitives,
                    showHeader ? '=' : null,
                    customs,
                    showHeader ? '=' : '-'
                );
            },
            []
        );
    } else {
        // ensure we do not modify the cached array
        blocks = this.getPrimitiveTemplates(category).slice();
    }

    if (category !== 'unified' || showButtons) {
        ide = ide || this.parentThatIsA(IDE_Morph);
        if (!ide || !ide.config.noOwnBlocks) {
            blocks.push('=');
            blocks.push(this.makeBlockButton(category));
        }
    }

    if (category !== 'unified') {
        blocks.push('=');
        blocks.push(...this.customBlockTemplatesForCategory(category));
    }
    if (category === 'variables') {
        blocks.push(...this.customBlockTemplatesForCategory('lists'));
        blocks.push(...this.customBlockTemplatesForCategory('other'));
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
            y = (ry === 0 ? y : ry);
        } else {
            hideNextSpace = false;
            if (x === 0) {
                y += unit * 0.3;
            }
            block.setPosition(new Point(x, y));
            palette.addContents(block);
            if (block instanceof ToggleMorph) {
                x = block.right() + unit / 2;
            } else if (block instanceof RingMorph) {
                x = block.right() + unit / 2;
                ry = block.bottom();
            } else {
                x = 0;
                y += block.height();
            }
        }
    });

    palette.scrollX(palette.padding);
    palette.scrollY(palette.padding);
    return palette;
};

// SpriteMorph utilities for showing & hiding blocks in the palette

SpriteMorph.prototype.allPaletteBlocks = function () {
    // private - only to be used for showing & hiding blocks in the palette
    var blocks = SpriteMorph.prototype.allCategories().reduce(
        (blocks, category) => {
            let primitives = this.blockTemplates(category, true),
                customs = this.customBlockTemplatesForCategory(category, true);
            return blocks.concat(
                primitives,
                customs
            );
        },
        []
    );
    return blocks.filter(each => each instanceof BlockMorph);
};

SpriteMorph.prototype.isHidingBlock = function (aBlock) {
    var frame;
    if (aBlock.isCustomBlock) {
        return (
            aBlock.isGlobal ? aBlock.definition
                : this.getMethod(aBlock.semanticSpec)
        ).isHelper;
    }
    if (aBlock.selector === 'reportGetVar') {
        frame = this.variables.silentFind(aBlock.blockSpec);
        if (!frame) {
            return false;
        }
        return frame.vars[aBlock.blockSpec].isHidden;
    }
    return StageMorph.prototype.hiddenPrimitives[aBlock.selector] === true;
};

SpriteMorph.prototype.isDisablingBlock = function (aBlock) {
    // show or hide certain kinds of blocks in search results only
    // if they are enabled
    var sel = aBlock.selector;
    if (sel === 'reportJSFunction') {
        return !Process.prototype.enableJS;
    }
    if (
        sel === 'doPrimitive' ||
        sel === 'doApplyExtension' ||
        sel === 'reportApplyExtension'
    ) {
        return !SpriteMorph.prototype.showingExtensions;
    }
    if (
        sel === 'doMapCodeOrHeader' ||
        sel === 'doMapValueCode' ||
        sel === 'doMapListCode' ||
        sel === 'reportMappedCode'
    ) {
        return !StageMorph.prototype.enableCodeMapping;
    }
    return false;
};

SpriteMorph.prototype.changeBlockVisibility = function (aBlock, hideIt, quick) {
    var ide = this.parentThatIsA(IDE_Morph),
        dict, cat;
    if (aBlock.isCustomBlock) {
        (aBlock.isGlobal ? aBlock.definition
            : this.getMethod(aBlock.semanticSpec)
        ).isHelper = !!hideIt;
    } else if (aBlock.selector === 'reportGetVar') {
        this.variables.find(
            aBlock.blockSpec
        ).vars[aBlock.blockSpec].isHidden = !!hideIt;
    } else {
        if (hideIt) {
            StageMorph.prototype.hiddenPrimitives[aBlock.selector] = true;
        } else {
            delete StageMorph.prototype.hiddenPrimitives[aBlock.selector];
        }
    }
    if (quick) {
        this.recordUserEdit(
            'palette',
            hideIt ? 'hide' : 'show',
            aBlock.abstractBlockSpec()
        );
        return;
    }
    dict = {
        doWarp: 'control',
        reifyScript: 'operators',
        reifyReporter: 'operators',
        reifyPredicate: 'operators',
        doDeclareVariables: 'variables'
    };
    cat = dict[aBlock.selector] || aBlock.category;
    if (cat === 'lists') {cat = 'variables'; }
    ide.flushBlocksCache(cat);
    ide.refreshPalette();
    this.recordUserEdit(
        'palette',
        hideIt ? 'hide' : 'show',
        aBlock.abstractBlockSpec()
    );
};

SpriteMorph.prototype.populatedCategories = function () {
    // return a dictionary that indicates for each category whether
    // it has any shown blocks in it (true) or is empty (false)
    var hasBlocks = (any) => any instanceof BlockMorph &&
            !this.isHidingBlock(any);
    if (this.categoriesCache === null) {
        this.categoriesCache = {};
        SpriteMorph.prototype.allCategories().forEach(category =>
            this.categoriesCache[category] =
                this.getPrimitiveTemplates(category).some(hasBlocks) ||
                this.customBlockTemplatesForCategory(category).some(hasBlocks));
    }
    return this.categoriesCache;
};

SpriteMorph.prototype.primitiveCategories = function () {
    // - currently unused -
    // answer an array of all active primitive block categories that are
    // showing at least one block in the palette
    var cache = this.populatedCategories();
    return this.categories.filter(prim => cache[prim]);
};

SpriteMorph.prototype.hasPrimitiveCategories = function () {
    // - currently unused -
    // answer <true> if at least one category of primitive blocks is
    // showing at least one block in the palette, else <false>
    // in which case the pane with primitive categories can be
    // hidden altogether
    var cache = this.populatedCategories();
    return this.categories.some(prim => cache[prim]);
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
            ).map(spec => moreTextIn(spec));
        return filtered.join(' ') + ' ' + slots.join(' ');
    }

    function moreTextIn(aSlotSpec) {
        var info = BlockMorph.prototype.labelParts[aSlotSpec] || {},
            menu = info.menu,
            more;
        if (menu) {
            if (isString(menu)) {
                menu = InputSlotMorph.prototype[menu](true);
            }
            more = Object.values(menu).map(entry => {
                if (isNil(entry)) {return ''; }
                if (entry instanceof Array) {
                    return localize(entry[0]);
                }
                return entry.toString();
            }).join(' ');
        }
        return [
            more || '',
            localize(info.infix || ''),
            localize(info.collapse || '')
        ].join(' ');
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
                spec = BlockMorph.prototype.localizeBlockSpec(block.spec),
                rel = relevance(labelOf(spec), search);
            if (rel === -1 && block.alias) {
                rel = relevance(block.alias, search);
            }
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
    blocks = blocks.map(each => each[0]);
    return blocks.filter(each =>
        !this.isHidingBlock(each) &&
        !this.isDisablingBlock(each)
    );
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
        oldTop = ide.palette.contents.top(),
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
            IDE_Morph.prototype.isBright ? new Color(150, 200, 255) : WHITE,
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
            myself.recordUserEdit(
                'scripts',
                'block',
                'insert',
                selection instanceof BlockMorph ?
                    selection.abstractBlockSpec()
                    : ''
            );
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
        ide.palette.contents.setTop(oldTop);
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
        // very basic dyadic infix parser for arithmetic expressions
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
        var block, target, selectors, monads, alias, key, sel, i, inps,
            off = 1,
            reverseDict = {};
        selectors = {
            '+': 'reportVariadicSum',
            '-': 'reportDifference',
            '*': 'reportVariadicProduct',
            '/': 'reportQuotient',
            '%': 'reportModulus',
            '^': 'reportPower',
            '=': 'reportVariadicEquals',
            '<': 'reportVariadicLessThan',
            '>': 'reportVariadicGreaterThan',
            '&': 'reportVariadicAnd',
            '|': 'reportVariadicOr',
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
            target = block;
        } else { // dyadic
            block = SpriteMorph.prototype.blockForSelector(selectors[key]);
            target = block;
            inps = block.inputs();
            if (inps[0] instanceof MultiArgMorph) { // infix sum or product
                target = inps[0];
                inps = target.inputs();
            }
        }
        for (i = 1; i < ast.length; i += 1) {
            if (ast[i] instanceof Array) {
                target.replaceInput(inps[i - off], blockFromAST(ast[i]));
            } else if (isString(ast[i])) {
                if (contains(
                    ['true', 'false'], reverseDict[ast[i]] || ast[i])
                ) {
                    target.replaceInput(
                        inps[i - off],
                        SpriteMorph.prototype.blockForSelector(
                            (reverseDict[ast[i]] || ast[i]) === 'true' ?
                                    'reportTrue' : 'reportFalse'
                        )
                    );
                } else if (ast[i] !== '_') {
                    target.replaceInput(
                        inps[i - off],
                        SpriteMorph.prototype.variableBlock(ast[i])
                    );
                }
            } else { // number
                inps[i - off].setContents(ast[i]);
            }
        }
        target.fixLayout();
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
        this.primitivesCache.variables = null;
    }
};

SpriteMorph.prototype.deleteVariable = function (varName, isGlobal) {
    var ide = this.parentThatIsA(IDE_Morph);
    if (isGlobal) {
        this.deleteVariableWatcher(varName, true);
        this.globalVariables().deleteVar(varName);
    } else {
        if (!contains(this.inheritedVariableNames(true), varName)) {
            // check only shadowed variables
            this.deleteVariableWatcher(varName);
        }
        this.variables.deleteVar(varName);
    }
    if (ide) {
        ide.flushBlocksCache('variables'); // b/c the var could be global
        ide.refreshPalette();
        this.recordUserEdit(
            'palette',
            'variable',
            isGlobal ? 'global' : 'local',
            'delete',
            varName
        );
    }
};

SpriteMorph.prototype.renameVariable = function (
    oldName,
    newName,
    isGlobal,
    everywhere // bool - including in all scripts & custom block definitions
) {
    var stage = this.parentThatIsA(StageMorph),
        ide = stage.parentThatIsA(IDE_Morph),
        oldWatcher = this.findVariableWatcher(oldName, isGlobal),
        scope = isGlobal ? this.globalVariables() : this.variables,
        container, newWatcher, targets;

    function renameVariableInCustomBlock(definition) {
        definition.scripts.forEach(eachScript => {
            if (eachScript instanceof BlockMorph) { // skip comments
                eachScript.refactorVariable(oldName, newName);
            }
        });
        if (definition.body) {
            definition.body.expression.refactorVariable(
                oldName,
                newName
            );
        }
    }

    if (contains(scope.names(), newName)) {
        ide.inform(
            'Variable exists',
            'A variable with this name already exists.'
        );
        return false;

    }
    container = scope.vars[oldName];
    this.deleteVariable(oldName, isGlobal);
    scope.vars[newName] = container;

    if (oldWatcher && oldWatcher.isVisible) {
        newWatcher = this.toggleVariableWatcher(newName, isGlobal);
        newWatcher.setPosition(oldWatcher.position());
    }

    if (everywhere) {
        targets = isGlobal ?
            ide.sprites.itemsArray().concat([stage]).filter(sprite =>
                !contains(sprite.variables.names(), newName))
            : [this];

        targets.forEach(sprite => {
            // in scripts
            sprite.scripts.children.forEach(morph => {
                if (morph instanceof BlockMorph) {
                    morph.refactorVariable(oldName, newName);
                }
            });

            // in local custom block definitions
            sprite.customBlocks.forEach(eachBlock =>
                renameVariableInCustomBlock(eachBlock)
            );
        });

        // in global custom block definitions
        if (isGlobal) {
            stage.globalBlocks.forEach(eachBlock =>
                renameVariableInCustomBlock(eachBlock)
            );
        }

        // in currently open block editors
        this.world().children.forEach(morph => {
            if (morph instanceof BlockEditorMorph) {
                morph.body.contents.children.forEach(morph => {
                    if (morph instanceof BlockMorph) {
                        morph.refactorVariable(oldName, newName);
                    }
                });
            }
        });
    }

    ide.flushBlocksCache('variables');
    ide.refreshPalette();
    this.recordUserEdit(
        'palette',
        'variable',
        isGlobal ? 'global' : 'local',
        'rename',
        everywhere ? 'all' : 'once',
        oldName,
        newName
    );
    return true; // success
};

SpriteMorph.prototype.flashScope = function (varName, isGlobal) {
    var scope = this.visibleScopeFor(varName, isGlobal),
        clr = SyntaxElementMorph.prototype.activeHighlight.darker();
    scope.flat().forEach(elem => elem.flash(clr));
};

SpriteMorph.prototype.unflashScope = function (varName, isGlobal) {
    var scope = this.visibleScopeFor(varName, isGlobal);
    scope.flat().forEach(elem => elem.unflash());
};

SpriteMorph.prototype.visibleScopeFor = function (varName, isGlobal) {
    // private - answer an array of all my syntax elements within the lexical
    // scope of a given variable name, so they can be highlighted in the IDE.
    // Note: This is optimized to only answer the *visible* blocks, if you
    // want to get the full collection of affected elements use
    // Block >> fullScopeFor(varName) instead.

    var elements = [];

    if (isGlobal && contains(this.variables.names(), varName)) {
        return elements;
    }

    // in scripts
    this.scripts.children.forEach(morph => {
        if (morph instanceof BlockMorph) {
            elements.push(morph.fullScopeFor(varName));
        }
    });

    // in currently open block editors
    this.world().children.forEach(morph => {
        if (morph instanceof BlockEditorMorph) {
            morph.body.contents.children.forEach(morph => {
                if (morph instanceof BlockMorph) {
                    elements.push(morph.fullScopeFor(varName));
                }
            });
        }
    });

    return elements.flat();
};

// SpriteMorph costume management

SpriteMorph.prototype.addCostume = function (costume) {
    if (!costume.name) {
        costume.name = this.newCostumeName(localize('costume'));
    }
    this.shadowAttribute('costumes');
    this.costumes.add(costume);
    this.recordUserEdit(
        'costume',
        'add',
        costume.name
    );
};

SpriteMorph.prototype.wearCostume = function (costume, noShadow, keepCache) {
    var x = this.xPosition ? this.xPosition() : null,
        y = this.yPosition ? this.yPosition() : null,
        idx = isNil(costume) ? null : this.costumes.asArray().indexOf(costume);

    if (!keepCache) {
        this.trailsCache = null;
        // this.originalCostume = null;
    }
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

SpriteMorph.prototype.doSwitchToCostume = function (id, noShadow, keepCache) {
    var w = 0,
        h = 0,
        stage;
        
    if (id instanceof List) { // try to turn a list of pixels into a costume
        if (id.quickShape().at(2) <= 4) {
            if (this.costume) {
                // recycle dimensions of current costume
                w = this.costume.width();
                h = this.costume.height();
            }
            if (w * h !== id.length()) {
                // assume stage's dimensions
                stage = this.parentThatIsA(StageMorph);
                w = stage.dimensions.x;
                h = stage.dimensions.y;
            }
        } // else try to interpret the pixels as matrix
        id = Process.prototype.reportNewCostume(
            id,
            w,
            h,
            this.newCostumeName(localize('snap'))
        );
    }
    if (id instanceof Costume) { // allow first-class costumes
        this.wearCostume(id, noShadow, keepCache);
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
        costume = detect(arr, cst => snapEquals(cst.name, id));
        if (costume === null) {
            num = parseFloat(id);
            if (num === 0) {
                costume = null;
            } else {
                costume = arr[num - 1] || null;
            }
        }
    }
    this.wearCostume(costume, noShadow, keepCache);
};

SpriteMorph.prototype.reportCostumes = function () {
    return this.costumes;
};

// SpriteMorph sound management

SpriteMorph.prototype.addSound = function (audio, name) {
    var sound = new Sound(audio, this.newSoundName(name));
    this.shadowAttribute('sounds');
    this.sounds.add(sound);
    this.recordUserEdit(
        'sounds',
        'add',
        sound.name
    );
    return sound;
};

SpriteMorph.prototype.doPlaySound = function (name) {
    var stage = this.parentThatIsA(StageMorph),
        sound = name instanceof Sound ? name
            : (typeof name === 'number' ? this.sounds.at(name)
                : detect(
                    this.sounds.asArray(),
                    s => snapEquals(s.name, name.toString())
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

        aud.onended = function() {
            this.currentSrc = null;
            this.src = "";
            this.srcObject = null;
            this.terminated = true;
            this.remove();
        };

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
    hz = +hz || 0;
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

    if (ide && (ide.isAppMode || ide.config.noSpriteEdits)) {
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
    if (ide && !ide.isAppMode && !ide.config.noSpriteEdits) {
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

// SpriteMorph serialization & exporting utils

SpriteMorph.prototype.toXMLString = function () {
    // answer an xml string representation of this sprite and all parts
    // attached to it, including all dependencies (global custom blocks).
    var ide = this.parentThatIsA(IDE_Morph),
        all = this.allParts(),
        dependencies = [],
        categories = [],
        varNames = [],
        localVarNames,
        globalData,
        blocksXML = '';

    function collect(item, array) {
        // only once
        if (!contains(array, item)) {
            array.push(item);
        }
    }

    function collectAll(items, array) {
        items.forEach(item => collect(item, array));
    }

    // collect all dependencies and custom categories.
    // only collect global custom block dependencies, because the locals
    // will be included in each sprite's serialization code

    all.forEach(sprite => {

        // global block definition in scripts
        sprite.scripts.children.filter(
            morph => morph instanceof BlockMorph
        ).forEach(script =>
            collectAll(
                script.dependencies(true),
                dependencies
            )
        );

        // global block definitions referenced in local block definitions
        sprite.customBlocks.forEach(def => {
            collect(def.category, categories);
            collectAll(
                def.collectDependencies([], [], sprite)
                    .filter(each => each.isGlobal),
                dependencies
            );
        });

    });

    // collect global data dependencies of the custom block definitions
    // to be included in the file

    dependencies.forEach(def =>
        def.dataDependencies().forEach(name => {
            if (!varNames.includes(name)) {
                varNames.push(name);
            }
        })
    );
    localVarNames = this.variables.fork(varNames).names(true); // incl. hidden
    varNames = varNames.filter(name => !localVarNames.includes(name));
    globalData = this.globalVariables().fork(varNames);

    // encode both parts of the export-file:
    // the blocks library and the sprites

    if (dependencies.length || categories.length) {
        blocksXML = ide.blocksLibraryXML(
            dependencies,
            categories,
            false, // as file
            globalData
        );
    }

    return '<sprites app="' +
        ide.serializer.app +
        '" version="' +
        ide.serializer.version +
        '">' +
        blocksXML +
        ide.serializer.serialize(all) +
        '</sprites>';
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
    if (this.isCorpse) {
        throw new Error('cannot operate on a deleted sprite');
    }
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

SpriteMorph.prototype.newTurtleSprite = function () {
    var ide = this.parentThatIsA(IDE_Morph),
        sprite;
    if (this.isCorpse) {
        throw new Error('cannot operate on a deleted sprite');
    }
    if (ide.stage && ide.stage.cloneCount <= 5000) {
        sprite = new SpriteMorph(ide.globalVariables);
        sprite.isTemporary = true;
        sprite.cloneOriginName = ide.newSpriteName(sprite.name);
        sprite.setCenter(this.center());
        ide.stage.add(sprite);
        ide.stage.cloneCount += 1;
        sprite.fixLayout();
        sprite.rerender();
    } else {
        throw new Error('exceeding maximum number of clones');
    }
    return sprite;
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
        this.recordUserEdit(
            'corral',
            'permanent clone',
            this.name
        );
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

SpriteMorph.prototype.setColorDimension = function (idx, num) {
    var x = this.xPosition(),
        y = this.yPosition(),
        n = +num;

    idx = +idx;
    if (idx < 0 || idx > 3) {return; }
    if (idx === 0) {
        if (n < 0 || n > 100) { // wrap the hue
            n = (n < 0 ? 100 : 0) + n % 100;
        }
    } else {
        n = Math.min(100, Math.max(0, n));
    }
    if (idx === 3) {
        this.color.a = 1 - n / 100;
    } else {
        this.cachedColorDimensions[idx] = n / 100;
        this.color['set_' + this.penColorModel].apply(
            this.color,
            this.cachedColorDimensions
        );
    }
    if (!this.costume) {
        this.rerender();
    }
    this.silentGotoXY(x, y);
};

SpriteMorph.prototype.getColorDimension = function (idx) {
    idx = +idx;
    if (idx === 3) {
        return (1 - this.color.a) * 100;
    }
    return (this.cachedColorDimensions[idx] || 0) * 100;
};

SpriteMorph.prototype.changeColorDimension = function (idx, delta) {
    this.setColorDimension(
        idx,
        this.getColorDimension(idx) + (+delta || 0)
    );
};

SpriteMorph.prototype.setColorRGBA = function (dta) {
    // dta can be one of the following:
    // - a 4 item list representing r-g-b-a each on a scale of 0-255
    // - a 3 item list representing r-g-b leaving a unchanged
    // - a 1 item list representing greyscale from 0-255 leaving alpha unchanged
    // - a 2 item list representing greyscale and alpha each from 0-255
    // - a number representing greyscale from 0-255 leaving alpha unchanged
    var clr = this.color.copy(),
        num;
    if (dta instanceof List) {
        switch (dta.length()) {
        case 1:
            num = Math.max(0, Math.min(+(dta.at(1)), 255));
            if (isNaN(num)) {return; }
            clr.r = num;
            clr.g = num;
            clr.b = num;
            break;
        case 2:
            num = Math.max(0, Math.min(+(dta.at(1)), 255));
            if (isNaN(num)) {return; }
            clr.r = num;
            clr.g = num;
            clr.b = num;
            num = Math.max(0, Math.min(+(dta.at(2)), 255));
            if (isNaN(num)) {return; }
            clr.a = num / 255;
            break;
        case 3:
            num = Math.max(0, Math.min(+(dta.at(1)), 255));
            if (isNaN(num)) {return; }
            clr.r = num;
            num = Math.max(0, Math.min(+(dta.at(2)), 255));
            if (isNaN(num)) {return; }
            clr.g = num;
            num = Math.max(0, Math.min(+(dta.at(3)), 255));
            if (isNaN(num)) {return; }
            clr.b = num;
            break;
        case 4:
            num = Math.max(0, Math.min(+(dta.at(1)), 255));
            if (isNaN(num)) {return; }
            clr.r = num;
            num = Math.max(0, Math.min(+(dta.at(2)), 255));
            if (isNaN(num)) {return; }
            clr.g = num;
            num = Math.max(0, Math.min(+(dta.at(3)), 255));
            if (isNaN(num)) {return; }
            clr.b = num;
            num = Math.max(0, Math.min(+(dta.at(4)), 255));
            if (isNaN(num)) {return; }
            clr.a = num / 255;
            break;
        default:
            return;
        }
    } else {
        num = Math.max(0, Math.min(+dta, 255));
        if (isNaN(num)) {return; }
        clr.r = num;
        clr.g = num;
        clr.b = num;
    }
    this.setColor(clr);
};

SpriteMorph.prototype.changeColorRGBA = function (dta) {
    // dta can be one of the following:
    // - a 4 item list representing r-g-b-a each on a scale of 0-255
    // - a 3 item list representing r-g-b leaving a unchanged
    // - a 1 item list representing greyscale from 0-255 leaving alpha unchanged
    // - a 2 item list representing greyscale and alpha each from 0-255
    // - a number representing greyscale from 0-255 leaving alpha unchanged
    var clr = this.color.copy(),
        num;
    if (dta instanceof List) {
        switch (dta.length()) {
        case 1:
            num = +(dta.at(1));
            if (isNaN(num)) {return; }
            clr.r = Math.max(0, Math.min(clr.r + num, 255));
            clr.g = Math.max(0, Math.min(clr.g + num, 255));
            clr.b = Math.max(0, Math.min(clr.b + num, 255));
            break;
        case 2:
            num = +(dta.at(1));
            if (isNaN(num)) {return; }
            clr.r = Math.max(0, Math.min(clr.r + num, 255));
            clr.g = Math.max(0, Math.min(clr.g + num, 255));
            clr.b = Math.max(0, Math.min(clr.b + num, 255));
            num = +(dta.at(2));
            if (isNaN(num)) {return; }
            clr.a = Math.max(0, Math.min((clr.a * 255) + num, 255)) / 255;
            break;
        case 3:
            num = +(dta.at(1));
            if (isNaN(num)) {return; }
            clr.r = Math.max(0, Math.min(clr.r + num, 255));
            num = +(dta.at(2));
            if (isNaN(num)) {return; }
            clr.g = Math.max(0, Math.min(clr.g + num, 255));
            num = +(dta.at(3));
            if (isNaN(num)) {return; }
            clr.b = Math.max(0, Math.min(clr.b + num, 255));
            break;
        case 4:
            num = +(dta.at(1));
            if (isNaN(num)) {return; }
            clr.r = Math.max(0, Math.min(clr.r + num, 255));
            num = +(dta.at(2));
            if (isNaN(num)) {return; }
            clr.g = Math.max(0, Math.min(clr.g + num, 255));
            num = +(dta.at(3));
            if (isNaN(num)) {return; }
            clr.b = Math.max(0, Math.min(clr.b + num, 255));
            num = +(dta.at(4));
            if (isNaN(num)) {return; }
            clr.a = Math.max(0, Math.min((clr.a * 255) + num, 255)) / 255;
            break;
        default:
            return;
        }
    } else {
        num = +dta;
        if (isNaN(num)) {return; }
        clr.r = Math.max(0, Math.min(clr.r + num, 255));
        clr.g = Math.max(0, Math.min(clr.g + num, 255));
        clr.b = Math.max(0, Math.min(clr.b + num, 255));
    }
    this.setColor(clr);
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
        this.cachedColorDimensions = this.color[this.penColorModel]();
    }
};

SpriteMorph.prototype.setBackgroundColor = SpriteMorph.prototype.setColor;

SpriteMorph.prototype.getPenAttribute = function (attrib) {
    var name = attrib instanceof Array ? attrib[0] : attrib.toString(),
        options = ['hue', 'saturation', 'brightness', 'transparency'];
    if (name === 'size') {
        return this.size || 0;
    }
    if (name === 'color') {
        return this.color.copy();
    }
    if (name === 'r-g-b-a') {
        return new List([
            this.color.r,
            this.color.g,
            this.color.b,
            Math.round(this.color.a * 255)
        ]);
    }
    return this.getColorDimension(options.indexOf(name));
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
        radius,
        ide = this.parentThatIsA(IDE_Morph);
    if (ide?.performerMode) { stageScale = ide.performerScale; }
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

SpriteMorph.prototype.drawsOnSprite = function () {
    if (isSnapObject(this.sheet) && !this.sheet.isCorpse) {
        return true;
    }
    this.sheet = null;
    return false;
};

SpriteMorph.prototype.surface = function () {
    // answer a version of the current costume that can be drawn on
    // by another sprite's pen.
    // rasterize copy of the current costume if it's an SVG
    // cache the costume copy for later reuse
    // and also the original costume so "clear" can reset it
    var surface;
    if (this.costume) {
        if (this.trailsCache) {
            surface = this.trailsCache;
        } else {
            if (this.costume instanceof SVG_Costume) {
                surface = this.costume.rasterized();
            } else {
                surface = this.costume.copy();
            }
            this.trailsCache = surface;
            // this.originalCostume = this.costume;
        }
    } else {
        surface = null;
    }
    return surface;
};

SpriteMorph.prototype.blendingMode = function () {
    // private - answer the globalCompositeOperation property for drawing
    var modes = { // for pen trails we don't support 'source-atop'
            paint : this.drawsOnSprite() ? 'source-atop' : 'source-over',
            erase : 'destination-out',
            overdraw : 'source-over'
        },
        key = this.tool?.toString().toLowerCase();
    return modes[key] || modes.paint;
};

// SpriteMorph stamping

SpriteMorph.prototype.doStamp = function () {
    if (this.drawsOnSprite()) {
        this.blitOn(this.sheet, this.blendingMode());
    } else {
        this.stampOnPenTrails();
    }
};

SpriteMorph.prototype.stampOnPenTrails = function () {
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
    ctx.globalCompositeOperation = this.blendingMode();
    ctx.drawImage(
        img,
        this.left() - stage.left(),
        this.top() - stage.top()
    );
    ctx.restore();
    this.changed();
    stage.cachedPenTrailsMorph = null;
};

// SpriteMorph clearing

SpriteMorph.prototype.clear = function () {
    /* // version that resets a target costume to its original state
    // disabled for now, because CLEAR should always clear the stage.
    if (this.drawsOnSprite()) {
        if (this.sheet.originalCostume) {
            this.sheet.doSwitchToCostume(this.sheet.originalCostume);
        }
    } else {
        this.parent.clearPenTrails();
    }
    */
    this.parent.clearPenTrails();
};

// SpriteMorph writing

SpriteMorph.prototype.write = function (text, size) {
    if (typeof text !== 'string' && typeof text !== 'number') {
        throw new Error(
            localize('can only write text or numbers, not a') + ' ' +
            typeof text
        );
    }
    if (this.drawsOnSprite()) {
        this.writeOn(this.sheet, text, size);
    } else {
        this.writeOnPenTrails(text, size);
    }
};

SpriteMorph.prototype.writeOn = function (target, text, size) {
    var targetCostume,
        start,
        delta,
        dest,
        fontSize,
        rotation,
        len,
        ctx;

    // only draw if the sprite is not currently being dragged
    // prevent drawing an object onto itself
    if (this === target || this.parentThatIsA(HandMorph)) {
        return;
    }

    // check if target has a costume and fetch its pen surface
    if (target.costume) {
        targetCostume = target.surface();
    } else {
        return;
    }

    // determine the relative coordinates, rotation and font size
    start = target.costumePoint(this.rotationCenter());
    fontSize = size;
    rotation = radians(this.direction() - 90);
    if (target instanceof SpriteMorph) {
        fontSize /= target.scale;
        rotation -= radians(target.direction() - 90);
    }

    // write the text on the target canvas
    ctx = targetCostume.contents.getContext('2d');
    ctx.save();
    ctx.font = fontSize + 'px monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = this.color.toString();
    len = ctx.measureText(text).width;
    ctx.translate(start.x, start.y);
    ctx.rotate(rotation);
    ctx.globalCompositeOperation = this.blendingMode();
    ctx.fillText(text, 0, 0);
    ctx.translate(-start.x, -start.y);
    ctx.restore();
    delta = new Point(
        len * Math.sin(radians(this.direction())),
        len * Math.cos(radians(this.direction()))
    );
    dest = delta.add(new Point(this.xPosition(), this.yPosition()));
    this.gotoXY(dest.x, dest.y, false);

    // wear & cache the changed costume
    target.doSwitchToCostume(targetCostume, null, true); // keep cache
};

SpriteMorph.prototype.writeOnPenTrails = function (text, size) {
    // thanks to Michael Ball for contributing this code!
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
    context.globalCompositeOperation = this.blendingMode();
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
        spriteCenter, thisCenter, relPos, pos,
        ide = this.parentThatIsA(IDE_Morph);

    // prevent pasting an object onto itself
    if (this === target) {return; }

    // check if both source and target have costumes,
    // fetch the target's surface
    if (this.costume && target.costume) {
        sourceCostume = this.costume;
        if (sourceCostume instanceof SVG_Costume) {
            sourceCostume = sourceCostume.rasterized();
        }
        targetCostume = target.surface();
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
            if (ide?.performerMode) { stageScale = ide.performerScale; }
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
    ctx.globalAlpha = this.alpha;
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

    function transform_colorDimensions(
            imagedata,
            hueShift,
            saturationShift,
            brightnessShift
    ) {
        var pixels = imagedata.data,
            l = pixels.length,
            clr = new Color(),
            index, dim;

        for (index = 0; index < l; index += 4) {

            clr.r = pixels[index];
            clr.g = pixels[index + 1];
            clr.b = pixels[index + 2];

            dim = clr[SpriteMorph.prototype.penColorModel]();
            dim[0] = dim[0] * 100 + hueShift;
            if (dim[0] < 0 || dim[0] > 100) { // wrap the hue
                dim[0] = (dim[0] < 0 ? 100 : 0) + dim[0] % 100;
            }
            dim[0] = dim[0] / 100;
            dim[1] = dim[1] + saturationShift / 100;
            dim[2] = dim[2] + brightnessShift / 100;

            clr['set_' + SpriteMorph.prototype.penColorModel].apply(clr, dim);
            pixels[index] = clr.r;
            pixels[index + 1] = clr.g;
            pixels[index + 2] = clr.b;
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
            imagedata = transform_colorDimensions(
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
        throw new Error(localize('unsupported graphic effect') + ': "' + eff + '"');
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
        step,
        ide = this.parentThatIsA(IDE_Morph);

    if (ide?.performerMode) { stageScale = ide.performerScale; }

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
    if (this.drawsOnSprite()) {
        this.drawLineOn(this.sheet, start, dest);
    } else {
        this.drawPenTrailsLine(start, dest);
    }
};

SpriteMorph.prototype.drawPath = function (pointList, filled, closed) {
    var path = pointList.map(tuple => this.worldPoint(
        new Point(+tuple.at(1), +tuple.at(2)))
    );
    if (this.drawsOnSprite()) {
        this.drawPathOn(this.sheet, path, closed, filled);
    } else {
        this.drawPathOnPentrails(path, closed, filled);
    }
};

SpriteMorph.prototype.drawLineOn = function (target, start, dest) {
    var mode = this.blendingMode(),
        targetCostume,
        p1, p2,
        line,
        ctx;

    // only draw if the pen is down and not currently being dragged
    // prevent drawing an object onto itself
    if (!this.isDown || this === target || this.parentThatIsA(HandMorph)) {
        return;
    }

    // check if target has a costume and fetch its pen surface
    if (target.costume) {
        targetCostume = target.surface();
    } else if (mode === 'source-over') {
        target.doSwitchToCostume(new Costume(
            newCanvas(new Point(1, 1), true),
            this.newCostumeName(localize('Costume'))
        ));
        targetCostume = target.surface();
        // target.originalCostume = ['Turtle'];
    } else {
        return;
    }

    p1 = target.costumePoint(start);
    p2 = target.costumePoint(dest);

    if (mode === 'source-over') {
        line = this.size / target.scale;
        if (targetCostume.growTo(p1, line)) {
            target.doSwitchToCostume(targetCostume, null, true); // keep cache
            p1 = target.costumePoint(start);
            p2 = target.costumePoint(dest);
        }
        if (targetCostume.growTo(p2, line)) {
            target.doSwitchToCostume(targetCostume, null, true); // keep cache
            p1 = target.costumePoint(start);
            p2 = target.costumePoint(dest);
        }
    }

    // draw the line onto the target's costume copy:
    ctx = targetCostume.contents.getContext('2d');
    ctx.lineWidth = this.size;
    if (target instanceof SpriteMorph) {
        ctx.lineWidth /= target.scale;
    }
    ctx.strokeStyle = this.color.toString();
    if (this.useFlatLineEnds) {
        ctx.lineCap = 'butt';
        ctx.lineJoin = 'miter';
    } else {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
    }
    ctx.globalCompositeOperation = mode;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();

    // shrink-wrap where applicable
    if (contains(['source-over', 'destination-out'], mode)) {
        targetCostume.shrinkWrap();
    }

    // wear & cache the changed costume
    target.doSwitchToCostume(targetCostume, null, true); // keep cache
};

SpriteMorph.prototype.drawPathOn = function (
    target,
    path = new List(),
    closed = false,
    filled = false
) {
    var mode = this.blendingMode(),
        targetCostume,
        points,
        line,
        ctx,
        first,
        i,

        projection = () => path.map(each => target.costumePoint(each));

    // check if target has a costume and fetch its pen surface
    if (target.costume) {
        targetCostume = target.surface();
    } else if (mode === 'source-over') {
        target.doSwitchToCostume(new Costume(
            newCanvas(new Point(1, 1), true),
            this.newCostumeName(localize('Costume'))
        ));
        targetCostume = target.surface();
        // target.originalCostume = ['Turtle'];
    } else {
        return;
    }

    points = projection();

    if (mode === 'source-over') {
        line = this.size / target.scale;
        for (i = 1; i <= points.length(); i += 1) {
            if (targetCostume.growTo(points.at(i), line)) {
                target.doSwitchToCostume(targetCostume, null, true); // keep cache
                points = projection();
            }
        }
    }

    // draw the path onto the target's costume copy:
    ctx = targetCostume.contents.getContext('2d');
    ctx.save();
    if (filled) {
        ctx.fillStyle = this.color.toString();
    } else {
        ctx.lineWidth = this.size;
        if (target instanceof SpriteMorph) {
            ctx.lineWidth /= target.scale;
        }
        ctx.strokeStyle = this.color.toString();
        if (this.useFlatLineEnds) {
            ctx.lineCap = 'butt';
            ctx.lineJoin = 'miter';
        } else {
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
        }
    }
    ctx.globalCompositeOperation = mode;
    ctx.beginPath();
    first = points.at(1);
    ctx.moveTo(first.x, first.y);
    points.cdr().map(each =>
        ctx.lineTo(each.x, each.y)
    );
    if (closed || filled) {
        ctx.closePath();
    }
    if (filled) {
        ctx.fill();
    } else {
        ctx.stroke();
    }
    ctx.restore();

    // shrink-wrap where applicable
    if (contains(['source-over', 'destination-out'], mode)) {
        targetCostume.shrinkWrap();
    }

    // wear & cache the changed costume
    target.doSwitchToCostume(targetCostume, null, true); // keep cache
};

SpriteMorph.prototype.drawPenTrailsLine = function (start, dest) {
    var stagePos = this.parent.bounds.origin,
        stageScale = this.parent.scale,
        context = this.parent.penTrails().getContext('2d'),
        from = start.subtract(stagePos).divideBy(stageScale),
        to = dest.subtract(stagePos).divideBy(stageScale),
        damagedFrom,
        damagedTo,
        damaged,
        ide = this.parentThatIsA(IDE_Morph);

    if (ide?.performerMode) { stageScale = ide.performerScale; }

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
        context.globalCompositeOperation = this.blendingMode();
        context.beginPath();
        context.moveTo(from.x, from.y);
        context.lineTo(to.x, to.y);
        context.stroke();
        if (this.isWarped === false) {
            damagedFrom = from.multiplyBy(stageScale).add(stagePos);
            damagedTo = to.multiplyBy(stageScale).add(stagePos);
            damaged = damagedFrom.rectangle(damagedTo).expandBy(
                Math.max(this.size * stageScale / 2, 1)
            ).intersect(this.parent.visibleBounds()).spread();
            this.world().broken.push(damaged);
        }
        this.parent.cachedPenTrailsMorph = null;
    }
};

SpriteMorph.prototype.drawPathOnPentrails = function (
    path = new List(),
    closed = false,
    filled = false
) {
    var stagePos = this.parent.bounds.origin,
        stageScale = this.parent.scale,
        ctx = this.parent.penTrails().getContext('2d'),
        ide = this.parentThatIsA(IDE_Morph),
        points = path.map(each => each.subtract(stagePos).divideBy(stageScale)),
        first = points.at(1);

    if (ide?.performerMode) { stageScale = ide.performerScale; }

    // draw on the pen-trails layer
    ctx.save();
    if (filled) {
        ctx.fillStyle = this.color.toString();
    } else {
        ctx.lineWidth = this.size;
        ctx.strokeStyle = this.color.toString();
        if (this.useFlatLineEnds) {
            ctx.lineCap = 'butt';
            ctx.lineJoin = 'miter';
        } else {
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
        }
    }
    ctx.globalCompositeOperation = this.blendingMode();
    ctx.beginPath();
    ctx.moveTo(first.x, first.y);
    points.cdr().map(each =>
        ctx.lineTo(each.x, each.y)
    );
    if (closed || filled) {
        ctx.closePath();
    }
    if (filled) {
        ctx.fill();
    } else {
        ctx.stroke();
    }
    ctx.restore();
    this.parent.changed();
    this.parent.cachedPenTrailsMorph = null;
};

SpriteMorph.prototype.floodFill = function () {
    if (this.color.a > 1) {
        // fix a legacy bug in Morphic color detection
        this.color.a = this.color.a / 255;
    }

    var onSheet = this.drawsOnSprite(),
        target = onSheet ? this.sheet : this.parent,
        start = (onSheet ? this.sheet : this.parent)
            .costumePoint(this.rotationCenter()),
        clr = new Color(
            Math.round(Math.min(Math.max(this.color.r, 0), 255)),
            Math.round(Math.min(Math.max(this.color.g, 0), 255)),
            Math.round(Math.min(Math.max(this.color.b, 0), 255)),
            this.color.a
        ),
        layer,
        width,
        height,
        ctx,
        img,
        dta,
        stack,
        targetCostume,
        current,
        src;

    if (!target.bounds.containsPoint(this.rotationCenter())) {
        return;
    }

    if (onSheet) {
        // check if target has a costume and fetch its pen surface
        if (target.costume) {
            targetCostume = target.surface();
        } else {
            return;
        }
    } else {
        this.parent.cachedPenTrailsMorph = null;
    }

    layer = normalizeCanvas(onSheet ? targetCostume.contents
        : this.parent.penTrails());
    width = layer.width;
    height = layer.height;
    ctx = layer.getContext('2d');
    img = ctx.getImageData(0, 0, width, height);
    dta = img.data;
    stack = [Math.floor(start.y) * width + Math.floor(start.x)];

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
    if (src[0] === clr.r &&
            src[1] === clr.g &&
            src[2] === clr.b &&
            src[3] === Math.round(clr.a * 255)) {
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
        dta[current * 4] = clr.r;
        dta[current * 4 + 1] = clr.g;
        dta[current * 4 + 2] = clr.b;
        dta[current * 4 + 3] = Math.round(clr.a * 255);
    }
    ctx.putImageData(img, 0, 0);

    if (onSheet) {
        // wear & cache the changed costume
        this.sheet.doSwitchToCostume(targetCostume, null, true); // keep cache
    } else {
        this.parent.changed();
    }
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
    var stage = this.parentThatIsA(StageMorph);
    if (stage?.tutorialMode) {
        return stage;
    }
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

SpriteMorph.prototype.forward = function (steps, raw) {
    var dest,
        dist = steps * this.parent.scale || 0;

	if (dist === 0 && this.isDown) { // draw a dot
        this.doDrawDot();
     	return;
 	} else if (dist >= 0) {
        dest = this.position().distanceAngle(dist, this.heading);
    } else {
        dest = this.position().distanceAngle(
            Math.abs(dist),
            (this.heading - 180)
        );
    }

    if (!raw) { // don't shadow attributes
        this.shadowAttribute('x position');
        this.shadowAttribute('y position');
    }

    this.setPosition(dest);
    this.positionTalkBubble();
};

SpriteMorph.prototype.doDrawDot = function (dot = 0.1) {
    // draw a dot using the current line-end settings, i.e. a round one
    // or a centered square / rhombial dot in flat-line-end mode
    var down = this.isDown;
    dot = Math.max((this.useFlatLineEnds ? this.size : dot), 0.1);
    this.isDown = false;
    this.forward(dot * -0.5, true); // don't shadow attributes
    this.isDown = true;
    this.forward(dot, true); // don't shadow attributes
    this.isDown = false;
    this.forward(dot * -0.5, true); // don't shadow attributes
    this.isDown = down;
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

SpriteMorph.prototype.getPosition = function () {
    return new List([this.xPosition(), this.yPosition()]);
};

SpriteMorph.prototype.xPosition = function () {
    if (this.inheritsAttribute('x position')) {
        return this.exemplar.xPosition();
    }

    var stage = this.parentThatIsA(StageMorph);

    if (!stage && this.parent?.grabOrigin) { // I'm currently being dragged
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

    if (!stage && this.parent?.grabOrigin) { // I'm currently being dragged
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
    if (this.isDown && dest.eq(this.position())) {
        this.doDrawDot();
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

SpriteMorph.prototype.worldPoint = function(aSnapPoint) {
    var stage = this.parentThatIsA(StageMorph);
    return this.normalizePoint(aSnapPoint)
        .multiplyBy(stage.scale)
        .translateBy(stage.center());
};

SpriteMorph.prototype.costumePoint = function(aPoint) {
    // answer the coordinates of the given world point on the current
    // costume's pixel bitmap, if any
    var stage = this.parentThatIsA(StageMorph),
        flipY = new Point(1, -1),
        stagePoint, normalized, offset, unrotated;
    if (!this.costume || !stage) {
        return new Point();
    }
    stagePoint = this.snapPoint(aPoint).multiplyBy(flipY).divideBy(this.scale);
    normalized = stagePoint.add(this.costume.rotationCenter);
    offset = stage.center().subtract(this.rotationCenter())
        .divideBy(stage.scale * this.scale);
    unrotated = normalized.add(offset);
    return unrotated.rotateBy(
        radians(this.heading - 90),
        this.costume.rotationCenter
    );
};

SpriteMorph.prototype.normalizePoint = function (snapPoint) {
    return new Point(snapPoint.x, -snapPoint.y);
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
    this.shadowAttribute('costumes');
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
        cntr;
    if (stage) {
        cntr = stage.center();
        this.setRotationCenter(
            new Point(
                (worldCoordinate.x - cntr.x) / stage.scale,
                (cntr.y - worldCoordinate.y) / stage.scale
            )
        );
        this.recordUserEdit(
            'sprite',
            'pivot',
            this.xPosition(),
            this.yPosition()
        );
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
                    if (!msgs.some(m => snapEquals(m, txt))) {
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
    if (typeof message === 'number') {
        message = message.toString();
    }
    return this.scripts.children.filter(morph => {
        var sel = morph.selector,
            event;
        if (sel) {
            if (sel === 'receiveMessage') {
                event = morph.inputs()[0].evaluate();
                return snapEquals(event, message) ||
                    (event instanceof Array && snapEquals(event[0], message)) ||
                    (event instanceof Array &&
                        event[0] === 'any message' &&
                        message !== '__shout__go__' &&
                        message !== '__clone__init__');
            }
            if (sel === 'receiveGo') {
                return message === '__shout__go__';
            }
            if (sel === 'receiveOnClone') {
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
                var choice = morph.inputs()[0].evaluate(),
                    evt = choice instanceof Array ? choice[0] : choice;
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
                var choice = morph.inputs()[0].evaluate();
                return (choice instanceof Array ?
                    choice[0]
                    : choice
                ) === interaction;
            }
        }
        return false;
    });
};

SpriteMorph.prototype.allHatBlocksForUserEdit = function (spriteName) {
    return this.scripts.children.filter(morph => {
        if (morph.selector) {
            if (morph.selector === 'receiveUserEdit') {
                var choice = morph.inputs()[0].evaluate(),
                    evt = choice instanceof Array ? choice[0] : choice;
                return evt === spriteName || evt === 'anything';
            }
        }
        return false;
    });
};

SpriteMorph.prototype.hasGenericHatBlocks = function () {
    var generics = ['receiveCondition', 'receiveConditionEvent'];
    return this.scripts.children.some(morph =>
        morph instanceof CustomHatBlockMorph ||
            generics.includes(morph.selector)
    );
};

SpriteMorph.prototype.allGenericHatBlocks = function () {
    var generics = ['receiveCondition', 'receiveConditionEvent'];
    return this.scripts.children.filter(morph =>
        morph instanceof CustomHatBlockMorph ||
            generics.includes(morph.selector)
    );
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

// SpriteMorph thread count (for debugging)

SpriteMorph.prototype.reportThreadCount = function () {
    var stage = this.parentThatIsA(StageMorph);
    if (stage) {
        return stage.threads.processes.length;
    }
    return 0;
};

// SpriteMorph variable watchers (for palette checkbox toggling)

SpriteMorph.prototype.findVariableWatcher = function (varName, isGlobal) {
    var stage = this.parentThatIsA(StageMorph),
        globals = this.globalVariables();
    if (stage === null) {
        return null;
    }
    return detect(
        stage.children,
        morph => morph instanceof WatcherMorph &&
            (isGlobal ? morph.target === globals : morph.target === this.variables) &&
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
    watcher = this.findVariableWatcher(varName, isGlobal);
    if (watcher !== null) {
        if (watcher.isVisible) {
            watcher.hide();
        } else {
            watcher.show();
            watcher.fixLayout(); // re-hide hidden parts
            watcher.keepWithin(stage);
        }
        ide.flushBlocksCache('variables');
        ide.refreshPalette();
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

SpriteMorph.prototype.showingVariableWatcher = function (varName, isGlobal) {
    var stage = this.parentThatIsA(StageMorph),
        watcher;
    if (stage === null) {
        return false;
    }
    watcher = this.findVariableWatcher(varName, isGlobal);
    if (watcher) {
        return watcher.isVisible;
    }
    return false;
};

SpriteMorph.prototype.deleteVariableWatcher = function (varName, isGlobal) {
    var stage = this.parentThatIsA(StageMorph),
        watcher;
    if (stage === null) {
        return null;
    }
    watcher = this.findVariableWatcher(varName, isGlobal);
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
    var stage, objects,
        blocks = [],
        inDefinitions = [];
    if (definition.isGlobal) {
        stage = this.parentThatIsA(StageMorph);
        objects = stage.children.filter(morph =>
            morph instanceof SpriteMorph
        );
        objects.slice().forEach(sprite => {
            if (sprite.solution) {
                objects.push(sprite.solution);
            }
        });
        objects.push(stage);
        objects.forEach(sprite => {
            blocks = blocks.concat(
                sprite.allLocalBlockInstances(definition)
            );
        });
        stage.globalBlocks.concat(
            SpriteMorph.prototype.bootstrappedBlocks()
        ).forEach(def => {
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
        return blocks.concat(inDefinitions).concat(
            stage.allBlockInstancesInData(definition)
        );
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
    return blocks.concat(
        this.parentThatIsA(StageMorph).allBlockInvocationsInData(aSpec, this)
    );
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
        this.parentThatIsA(StageMorph).globalBlocks.concat(
            SpriteMorph.prototype.customizedPrimitives()
        ).forEach(def => {
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

    function mergeInto(array, source, target) {
        // replace the target item of an array with the source item,
        // and remove the former slot of the source item
        var srcIdx = array.indexOf(source),
            trgIdx = array.indexOf(target);
        if (srcIdx < 0 || trgIdx < 0 || srcIdx === trgIdx) {
            throw new Error('cannot merge custom block definition');
        }
        array[trgIdx] = source;
        array.splice(srcIdx, 1);
    }

    doubles.forEach(double =>
        this.allBlockInstances(double).forEach(block => {
            block.definition = definition;
            block.refresh();
        })
    );
    if (definition.isGlobal) {
        stage = this.parentThatIsA(StageMorph);
        doubles.forEach(def => mergeInto(stage.globalBlocks, definition, def));
    } else {
        doubles.forEach(def => mergeInto(this.customBlocks, definition, def));
        this.allDependentInvocationsOf(
            definition.blockSpec()
        ).reverse().forEach(
            block => block.refresh(definition)
        );
    }
    ide = this.parentThatIsA(IDE_Morph);
    if (ide) {
        ide.flushPaletteCache();
        ide.refreshPalette();
    }
};

// SpriteMorph enumerating blocks

SpriteMorph.prototype.everyBlock = function () {
    // answer an array of every block in the system - under construction
    var stage = this.parentThatIsA(StageMorph),
        ide = this.parentThatIsA(IDE_Morph),
        charted = [],
        blocks = [];

    function collect(morph) {
        if (morph instanceof BlockMorph) {
            blocks.push(morph);
        }
    }

    function scanVariables(varFrame) {
        varFrame.names().forEach(vname => {
            var value = varFrame.getVar(vname);
            if (value instanceof Context) {
                scanContext(value);
            } else if (value instanceof List) {
                scanList(value);
            }
        });
    }

    function scanContext(context) {
        if (!charted.includes(context)) {
            charted.push(context);
        }
        if (context.expression instanceof BlockMorph) {
            context.expression.allChildren().forEach(collect);
        }
    }

    function scanList(list) {
        if (!charted.includes(list)) {
            charted.push(list);
            if (!list.canBeJSON()) {
                list.map(each => {
                    if (each instanceof Context) {
                        scanContext(each);
                    } else if (each instanceof List) {
                        scanList(each);
                    }
                });
            }
        }
    }

    function scanDefinition(def) {
        def.scripts.forEach(eachScript =>
            eachScript.allChildren().forEach(collect)
        );
        if (def.body) {
            def.body.expression.allChildren().forEach(collect);
        }
    }

    SpriteMorph.prototype.bootstrappedBlocks().forEach(scanDefinition);

    if (ide) {
        ide.sprites.asArray().forEach(sprite => {
            sprite.scripts.allChildren().forEach(collect);
            sprite.customBlocks.forEach(scanDefinition);
            scanVariables(sprite.variables);
            if (sprite.solution) {
                sprite.solution.scripts.allChildren().forEach(collect);
                sprite.solution.customBlocks.forEach(scanDefinition);
                scanVariables(sprite.solution.variables);
            }
        });
    }

    if (stage) {
        stage.globalBlocks.forEach(scanDefinition);
        scanVariables(stage.globalVariables());
        stage.threads.processes.forEach(proc => {
            if (proc.context instanceof Context) {
                scanContext(proc.context);
            }
        });
    }

    return blocks;
};


// SpriteMorph enumerating primitive block instances

SpriteMorph.prototype.allPrimitiveBlockInstances = function (selector, alsoIn) {
    // answer an Array of all block instances in the system that are
    // primitive blocks (i.e. non-custom ones) with the given selector
    var stage = this.parentThatIsA(StageMorph),
        ide = this.parentThatIsA(IDE_Morph),
        charted = [],
        blocks = [];

    function collect(morph) {
        if (morph instanceof BlockMorph &&
            !morph.isCustomBlock &&
            morph.selector === selector
        ) {
            blocks.push(morph);
        }
    }

    function scanVariables(varFrame) {
        varFrame.names().forEach(vname => {
            var value = varFrame.getVar(vname);
            if (value instanceof Context) {
                scanContext(value);
            } else if (value instanceof List) {
                scanList(value);
            }
        });
    }

    function scanContext(context) {
        if (!charted.includes(context)) {
            charted.push(context);
        }
        if (context.expression instanceof BlockMorph) {
            context.expression.allChildren().forEach(collect);
        }
    }

    function scanList(list) {
        if (!charted.includes(list)) {
            charted.push(list);
            if (!list.canBeJSON()) {
                list.map(each => {
                    if (each instanceof Context) {
                        scanContext(each);
                    } else if (each instanceof List) {
                        scanList(each);
                    }
                });
            }
        }
    }

    SpriteMorph.prototype.bootstrappedBlocks().forEach(def => {
        def.scripts.forEach(eachScript =>
            eachScript.allChildren().forEach(collect)
        );
        if (def.body) {
            def.body.expression.allChildren().forEach(collect);
        }
    });

    if (ide) {
        ide.sprites.asArray().forEach(sprite => {
            sprite.scripts.allChildren().forEach(collect);
            sprite.customBlocks.forEach(def => {
                def.scripts.forEach(eachScript =>
                    eachScript.allChildren().forEach(collect)
                );
                if (def.body) {
                    def.body.expression.allChildren().forEach(collect);
                }
            });
            scanVariables(sprite.variables);
            if (sprite.solution) {
                sprite.solution.scripts.allChildren().forEach(collect);
                sprite.solution.customBlocks.forEach(def => {
                    def.scripts.forEach(eachScript =>
                        eachScript.allChildren().forEach(collect)
                    );
                    if (def.body) {
                        def.body.expression.allChildren().forEach(collect);
                    }
                });
                scanVariables(sprite.solution.variables);
            }
        });
    }

    stage.globalBlocks.forEach(def => {
        def.scripts.forEach(eachScript =>
            eachScript.allChildren().forEach(collect)
        );
        if (def.body) {
            def.body.expression.allChildren().forEach(collect);
        }
    });
    scanVariables(stage.globalVariables());
    stage.threads.processes.forEach(proc => {
        if (proc.context instanceof Context) {
            scanContext(proc.context);
        }
    });

    if (alsoIn) {
        alsoIn.globalBlocks.forEach(def => {
            def.scripts.forEach(eachScript =>
                eachScript.allChildren().forEach(collect)
            );
            if (def.body) {
                def.body.expression.allChildren().forEach(collect);
            }
        });
    }

    return blocks;

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

SpriteMorph.prototype.allLocalVariableNames = function (sorted, all) {
    // "all" includes hidden ones in the palette
    var data = this.variables.allNames(this.globalVariables(), all);

    function alphabetically(x, y) {
        return x.toLowerCase() < y.toLowerCase() ? -1 : 1;
    }

	if (sorted) {
 		data.sort(alphabetically);
   }
   return data;
};

SpriteMorph.prototype.allGlobalVariableNames = function (sorted, all) {
    var data = this.globalVariables().names(all);

    function alphabetically(x, y) {
        return x.toLowerCase() < y.toLowerCase() ? -1 : 1;
    }

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

SpriteMorph.prototype.thumb = function (extentPoint) {
    // answer a new Morph of extentPoint dimensions that displays
    // my thumbnail representation keeping the original aspect ratio
    var myself = this,
        thumb = new Morph(),
        ext = extentPoint.divideBy(3),
        i = 0;

    thumb.render = function (ctx) {
        var w = myself.width(),
            h = myself.height(),
            scale = Math.min(
                (extentPoint.x / w),
                (extentPoint.y / h)
            ),
            xOffset = (extentPoint.x - (w * scale)) / 2,
            yOffset = (extentPoint.y - (h * scale)) / 2;

        ctx.save();
        ctx.scale(scale, scale);
        ctx.translate(xOffset / scale, yOffset / scale);
        myself.render(ctx);
        ctx.restore();
  
        if (myself.anchor) {
            ctx.drawImage(
                myself.anchor.thumbnail(ext),
                0,
                0
            );
        }
        for (i = 0; i < 3; i += 1) {
            if (myself.parts[i]) {
                ctx.drawImage(
                    myself.parts[i].thumbnail(ext),
                    i * ext.x,
                    extentPoint.y - ext.y
                );
            }
        }
    };

    thumb.setExtent(extentPoint);
    return thumb;
};

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

// SpriteMorph visual data representations

SpriteMorph.prototype.booleanMorph = function (bool) {
    var sym = new BooleanSlotMorph(bool);
    sym.isStatic = true;
    sym.fixLayout();
    return sym;
};

SpriteMorph.prototype.colorSwatch = function (color, size) {
    var swatch = new Morph();
    swatch.color = color;

    swatch.render = function (ctx) {
        var w = this.width(),
            h = this.height(),
            clr = this.getRenderColor();
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = 'gray';
        ctx.fillRect(1, 1, w - 2, h - 2);
        ctx.fillStyle = 'white'; // for transparent colors
        ctx.fillRect(2, 2, w - 4, h - 4);
        if (!clr.a) { // fully transparent
            ctx.fillStyle = "lightgray";
            ctx.fillRect(2, 2, w * 0.5 - 2, w * 0.5 - 2);
            ctx.fillRect(w * 0.5, w * 0.5, w * 0.5 - 2, w * 0.5 - 2);
        }
        ctx.fillStyle = clr.toString();
        ctx.fillRect(2, 2, w - 4, h - 4);
    };

    swatch.setExtent(new Point(size, size));
    return swatch;
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
    if (this.parent?.tutorialMode) {
        return false;
    }
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
        ).map(each => each.name),
        exist = e => snapEquals(e, newName);
    while (all.some(exist)) {
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
        ).map(each => each.name),
        exist = e => snapEquals(e, newName);
    while (all.some(exist)) {
        count += 1;
        newName = stem + '(' + count + ')';
    }
    return newName;
};

// SpriteMorph recording and synching user edits

SpriteMorph.prototype.recordUserEdit = function (...details) {
    var ide = this.parentThatIsA(IDE_Morph);
    if (ide) {
        ide.recordUnsavedChanges(
            this.name,
            Array.from(details).concat(details[0] === 'scripts' ?
                [this.scriptsOnlyXML()]
                : []
            )
        );
    }
};

SpriteMorph.prototype.scriptsOnlyXML = function () {
    var serializer = this.parentThatIsA(IDE_Morph)?.serializer ||
        new SnapSerializer();
    return '<scriptsonly' +
        ' app="' + serializer.app +
        '" version="' + serializer.version +
        '">' +
        serializer.serialize(this.scripts) +
        '</scriptsonly>';
};

SpriteMorph.prototype.synchScriptsFrom = function (xml) {
    var serializer = this.parentThatIsA(IDE_Morph)?.serializer ||
            new SnapSerializer(),
        bak = this.scripts.children;
    try {
        this.scripts.children = [];
        serializer.loadScripts(
            this,
            this.scripts,
            serializer.parse(xml, true)
        );
        this.scripts.changed();
        this.recordUserEdit(
            'sprite',
            'synch',
            'scripts',
            xml
        );
    } catch (err) {
        this.scripts.children = bak;
        throw(err);
    }
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

StageMorph.prototype.dimensions = new Point(480, 360); // fallback unscaled ext

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
StageMorph.prototype.enableQuicksteps = true; // dynamic thread scheduling

// StageMorph instance creation

function StageMorph(globals) {
    this.init(globals);
}

StageMorph.prototype.init = function (globals) {
    this.name = localize('Stage');
    this.dimensions = new Point(480, 360); // unscaled extent
    this.instrument = null;
    this.threads = new ThreadManager();
    this.variables = new VariableFrame(globals || null, this);
    this.scripts = new ScriptsMorph();
    this.customBlocks = [];
    this.globalBlocks = [];
    this.costumes = new List();
    this.costumes.type = 'costume';
    this.costume = null;
    this.sounds = new List();
    this.sounds.type = 'sound';
    this.version = Date.now(); // for observers
    this.isFastTracked = false;
    this.enableCustomHatBlocks = true;
    this.cloneCount = 0;

    this.timerStart = Date.now();
    this.tempo = 60; // bpm
    this.lastMessage = '';

    // volume and stereo-pan support
    this.volume = 100;
    this.gainNode = null; // must be lazily initialized in Chrome, sigh...
    this.pan = 0;
    this.pannerNode = null; // must be lazily initialized in Chrome, sigh...

    // frequency player, experimental
    this.freqPlayer = null; // Note, to be lazily initialized

    this.watcherUpdateFrequency = 10; // increased in v11, was: 2
    this.lastWatcherUpdate = Date.now(); // needed when slowing down updates

    this.scale = 1; // for display modes, do not persist

    this.cachedColorDimensions = [0, 0, 0]; // bg color support, not serialized

    this.keysPressed = {}; // for handling keyboard events, do not persist
    this.primitivesCache = {}; // not to be serialized (!)
    this.paletteCache = {}; // not to be serialized (!)
    this.categoriesCache = null; // not to be serialized (!)
    this.lastAnswer = ''; // last user input, do not persist
    this.activeSounds = []; // do not persist

    this.trailsCanvas = null;
    this.trailsLog = []; // each line being [p1, p2, color, width, cap]

    // support for letting sprites directly draw on a background
    this.trailsCache = null; // a temporary costume for drawing on
    // this.originalCostume = null; // hold on to the unmodified original
    // costume, disabled for now

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

    // world map client, transient
    this.worldMap = new WorldMap();

    // Snap! API event listeners, transient
    this.messageCallbacks = {}; // name : [functions]

    // Tutorial scenes, transient
    this.tutorialMode = null; // or a scene back-pointer

    StageMorph.uber.init.call(this);

    this.setExtent(this.dimensions);
    this.isCachingImage = true;
    this.cachedColorDimensions = this.color[
        SpriteMorph.prototype.penColorModel
    ]();
    this.acceptsDrops = false;
    this.setColor(new Color(255, 255, 255));
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

    // first resize my speech balloon, if any
    bubble = this.talkBubble();
    if (bubble) {
        bubble.setScale(number);
        this.positionTalkBubble();
    }

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
        } else if (morph instanceof StagePickerMorph) {
            morph.createItems(number);
            morph.popup(this, morph.position());
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
    if (this.costume && !(this.costume.loaded instanceof Function)) {
        ctx.scale(this.scale, this.scale);
        ctx.drawImage(
            this.costume.contents,
            (this.width() / this.scale - this.costume.width()) / 2,
            (this.height() / this.scale - this.costume.height()) / 2
        );
        this.applyGraphicsEffects(this.cachedImage);
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

StageMorph.prototype.resizePenTrails = function () {
    var oldCanvas = this.trailsCanvas;
    this.cachedPenTrailsMorph = null;
    this.trailsCanvas = newCanvas(this.dimensions, null, this.trailsCanvas);
    this.trailsCanvas.getContext('2d').drawImage(oldCanvas, 0, 0);
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

StageMorph.prototype.stopProjection = function () {
    if (this.projectionSource) {
        this.stopProjectionSource();
        this.projectionSource.remove();
        this.projectionSource = null;
        this.continuousProjection = false;
    }
    this.clearProjectionLayer();
};

StageMorph.prototype.projectionSnap = function (target) {
    var snap = newCanvas(this.dimensions, true),
        ctx = snap.getContext('2d');
    ctx.drawImage(this.projectionLayer(), 0, 0);
    return new Costume(snap, (target || this).newCostumeName(localize('snap')));
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
    if (this.tutorialMode) {
        return false;
    }
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
    var current, elapsed, leftover,
        world = this.world();

    // handle keyboard events
    if (world.keyboardFocus === null) {
        world.keyboardFocus = this;
    }
    if (world.currentKey === null) {
        this.keyPressed = null;
    }

    // manage threads
    this.scheduleFrame();

    // update watchers
    if (this.watcherUpdateFrequency) {
        current = Date.now();
        elapsed = current - this.lastWatcherUpdate;
        leftover = (1000 / this.watcherUpdateFrequency) - elapsed;
        if (leftover < 1) {
            this.watchers().forEach(w => w.update());
            this.lastWatcherUpdate = Date.now();
        }
    } else {
        this.watchers().forEach(w => w.update());
    }

    // projection layer update (e.g. video frame capture)
    if (this.continuousProjection && this.projectionSource) {
        this.updateProjection();
    }
};

StageMorph.prototype.scheduleFrame = function () {
    // manage threads - perform one complete evaluation frame:
    // 1. evaluate every generic / custom hat block
    // 2. evaluate the next atom in every process
    // 3. "Twostep": re-evaluate every generic / custom event-only hat block
    // 4. "Quickstep": fill up the remaining time in the frame by stepping
    //    through all non-animating (visual) processes

    var isDone = false,
        ide;

    // "Afterglow" - display halos around running scripts
    this.threads.stepHalos();

    if (this.isFastTracked && this.threads.processes.length) {
        while (this.isFastTracked && (Date.now() - this.lastTime) < 16.7) {
            this.stepGenericConditions();
            this.threads.step(); // approx. 60 fps
            this.twostep(); // double-clock event hats
        }
        this.changed();
    } else {
        isDone = this.stepGenericConditions();
        this.threads.step();
        isDone = !this.threads.processes.length; // idle - no running scripts
        isDone = this.twostep() || isDone; // double-clock event hats

        // single-stepping hook:
        if (this.threads.wantsToPause) {
            ide = this.parentThatIsA(IDE_Morph);
            if (ide) {
                ide.controlBar.pauseButton.refresh();
            }
        }

        // v10.4 "Quicksteps"
        // keep stepping processes with non-visual animation
        if (this.enableQuicksteps) {
            while (!isDone && (Date.now() - this.lastTime) < 16.7) { // 60 fps
                this.stepGenericConditions();
                isDone = this.threads.step(true); // only non-visuals
                isDone = this.twostep() || isDone; // double-clock event hats
            }
        }
    }
};

StageMorph.prototype.twostep = function () {
    // double-clocking event hats involves stepping through all events twice,
    // before and after each regular atom in every process. This is necessary
    // so events get a chance to "reset" their internal state, e.g. to determine
    // a change in data they are set up to observe.
    // This function performs the second step, calling only the event hats,
    // and determining whether any animation happens or no atoms are left to
    // quickstep through afterwards.

    var atEnd = false;
    if (this.enableCustomHatBlocks &&
        !this.threads.pauseCustomHatBlocks &&
        !Process.prototype.enableSingleStepping
    ) {
        atEnd = this.stepGenericConditions(true); // only events
        this.threads.removeTerminatedProcesses();
    }
    return atEnd;
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

StageMorph.prototype.stepGenericConditions = function (onlyEvents) {
    var hatCount = 0,
        animating = false,
        ide;
    if (!this.enableCustomHatBlocks) {return false; }
    this.children.concat(this).forEach(morph => {
        if (isSnapObject(morph)) {
            morph.allGenericHatBlocks().forEach(block => {
                hatCount += 1;
                if (!this.threads.pauseCustomHatBlocks) {
                    if (onlyEvents && block.isRuleHat()) {
                        return;
                    }
                    animating = this.threads.startProcess (
                        block,
                        morph, // receiver
                        true, // isThreadSafe
                        null, // exportResult
                        null, // callback
                        null, // isClicked
                        true, // rightAway
                        null, // atomic
                        null, // variables
                        true, // no halo
                        true // generic condition
                    ).isAnimated || animating;
                }
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
    return animating;
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
            keyName =
                (keyName === 'Control' || keyName === 'Meta' ? '' : 'ctrl ') +
                    (event.shiftKey ? 'shift ' : '') + keyName;
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
        return ide.stopAllScripts();
    }
    this.children.concat(this).forEach(morph => {
        if (isSnapObject(morph)) {
            morph.allHatBlocksForKey(evt).forEach(block => {
                var varName = block.inputs()[1].evaluate()[0],
                    varFrame;
                if (varName) {
                    varFrame = new VariableFrame();
                    varFrame.addVar(
                        varName,
                        key === 'space' ? ' ' : key // not lowercased
                    );
                }
                procs.push(this.threads.startProcess(
                    block,
                    morph,
                    true, // ignore running scripts, was: myself.isThreadSafe
                    null, // exportResult (bool)
                    null, // callback
                    null, // isClicked
                    null, // rightAway
                    null, // atomic
                    varFrame
                ));
            });
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

StageMorph.prototype.fireChangeOfSceneEvent = function (message, data) {
    var procs = [];

    // remove all clones when the green flag event is broadcast
    if (message === '__shout__go__') {
        this.removeAllClones();
    }

    this.children.concat(this).forEach(morph => {
        if (isSnapObject(morph)) {
            morph.allHatBlocksFor(message).forEach(block => {
                var choice, varName, varFrame;
                if (block.selector === 'receiveMessage') {
                    varName = block.inputs()[1].evaluate()[0];
                    if (varName) {
                        varFrame = new VariableFrame();
                        choice = block.inputs()[0].evaluate();
                        if (choice instanceof Array &&
                                choice[0].indexOf('any') === 0) {
                            varFrame.addVar(
                                varName,
                                data !== '' ?
                                    new List([message, data])
                                    : message
                            );
                        } else {
                            varFrame.addVar(varName, data);
                        }
                    }
                    procs.push(this.threads.startProcess(
                        block,
                        morph,
                        this.isThreadSafe || // make "any msg" threadsafe
                            block.inputs()[0].evaluate() instanceof Array,
                        null, // exportResult (bool)
                        null, // callback
                        null, // isClicked
                        null, // rightAway
                        null, // atomic
                        varFrame
                    ));
                } else {
                    procs.push(this.threads.startProcess(
                        block,
                        morph,
                        this.isThreadSafe
                    ));
                }
            });
        }
    });
    return procs;
};

StageMorph.prototype.fireUserEditEvent = function (
    spriteName,
    details,
    timestamp
) {
    var procs = [];
    this.children.concat(this).forEach(morph => {
        if (isSnapObject(morph)) {
            morph.allHatBlocksForUserEdit(spriteName).forEach(block => {
                var varName = block.inputs()[1].evaluate()[0],
                    varFrame;
                if (varName) {
                    varFrame = new VariableFrame();
                    varFrame.addVar(
                        varName,
                        new List(
                            [spriteName].concat(
                                details
                            ).concat([timestamp])
                        )
                    );
                }
                procs.push(this.threads.startProcess(
                    block,
                    morph,
                    false, // ignore running scripts, was: myself.isThreadSafe
                    null, // exportResult (bool)
                    null, // callback
                    null, // isClicked
                    null, // rightAway
                    null, // atomic
                    varFrame
                ));
            });
        }
    });
    return procs;
};

StageMorph.prototype.fireGreenFlagEvent = function () {
    var procs = [],
        ide = this.parentThatIsA(IDE_Morph);

    this.removeAllClones();
    this.children.concat(this).forEach(morph => {
        if (isSnapObject(morph)) {
            morph.allHatBlocksFor('__shout__go__').forEach(block => {
                var varName, varFrame;

                if (block.selector === 'receiveMessage') {
                    varName = block.inputs()[1].evaluate()[0];
                    if (varName) {
                        varFrame = new VariableFrame();
                        varFrame.addVar(varName, ''); // empty
                    }
                }

                procs.push(this.threads.startProcess(
                    block,
                    morph,
                    this.isThreadSafe,
                    null, // exportResult (bool)
                    null, // callback
                    null, // isClicked
                    null, // rightAway
                    null, // atomic
                    varFrame
                ));
            });
        }
    });
    if (ide) {
        ide.controlBar.pauseButton.refresh();
    }
    return procs;
};

StageMorph.prototype.runStopScripts = function () {
    // Allow each sprite to run one last step before termination
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

StageMorph.prototype.blockTemplates = function (
    category = 'motion',
    all = false // include hidden blocks
) {
    var blocks = [], myself = this, varNames, txt;

    function block(selector) {
        if (myself.hiddenPrimitives[selector] && !all) {
            return null;
        }
        var newBlock = SpriteMorph.prototype.blockForSelector(selector, true);
        newBlock.isDraggable = false;
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

    function variableWatcherToggle(varName, isGlobal) {
        return new ToggleMorph(
            'checkbox',
            this,
            function () {
                myself.toggleVariableWatcher(varName, isGlobal);
            },
            null,
            function () {
                return myself.showingVariableWatcher(varName, isGlobal);
            },
            null
        );
    }


    SnapExtensions.buttons.palette.forEach(buttonDescriptor => {
        if (buttonDescriptor.category === category) {
            blocks.push(this.customPaletteButton(buttonDescriptor));
        }
    });

    if (category === 'motion') {

        txt = new TextMorph(localize('Stage selected:\nno motion primitives'));
        txt.fontSize = 9;
        txt.setColor(this.paletteTextColor);
        txt.hideWithCategory = true; // hide txt when category names are hidden
        blocks.push(txt);

    } else if (category === 'looks') {

        blocks.push(block('doSwitchToCostume'));
        blocks.push(block('doWearNextCostume'));
        blocks.push(watcherToggle('getCostumeIdx'));
        blocks.push(block('getCostumeIdx'));
        blocks.push('-');
        blocks.push(block('doSayFor'));
        blocks.push(block('bubble'));
        blocks.push('-');
        blocks.push(block('reportGetImageAttribute'));
        blocks.push(block('reportNewCostumeStretched'));
        blocks.push(block('reportNewCostumeSkewed'));
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
        if (this.world()?.isDevMode) {
            blocks.push('-');
            blocks.push(this.devModeText());
            blocks.push('-');
            blocks.push(block('log'));
            blocks.push(block('alert'));
            blocks.push('-');
            blocks.push(block('doScreenshot'));
        }

    } else if (category === 'sound') {

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
        if (this.world()?.isDevMode) {
            blocks.push('-');
            blocks.push(this.devModeText());
            blocks.push('-');
            blocks.push(block('doPlayFrequency'));
        }

    } else if (category === 'pen') {

        blocks.push(block('clear'));
        blocks.push('-');
        blocks.push(block('setBackgroundColor'));
        blocks.push(block('changeBackgroundColorDimension'));
        blocks.push(block('setBackgroundColorDimension'));
        blocks.push('-');
        blocks.push(block('write'));
        blocks.push('-');
        blocks.push(block('reportPenTrailsAsCostume'));
        blocks.push('-');
        blocks.push(block('doPasteOn'));
        blocks.push(block('doCutFrom'));
        blocks.push('-');
        blocks.push(block('reportColor'));
        blocks.push(block('reportColorAttribute'));
        blocks.push(block('reportNewColor'));

    } else if (category === 'control') {

        blocks.push(block('receiveGo'));
        blocks.push(block('receiveKey'));
        blocks.push(block('receiveInteraction'));
        blocks.push(block('receiveConditionEvent'));
        blocks.push('-');
        blocks.push(block('receiveMessage'));
        blocks.push(block('doBroadcast'));
        blocks.push(block('doBroadcastAndWait'));
        blocks.push(block('reportPoll'));
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
        // blocks.push(block('doVariadicIf'));
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
        blocks.push(block('reportPipe'));
        blocks.push('-');
        blocks.push(block('doTellTo'));
        blocks.push(block('reportAskFor'));
        blocks.push('-');
        blocks.push(block('createClone'));
        blocks.push(block('newClone'));
        blocks.push('-');
        blocks.push(block('doPauseAll'));
        blocks.push(block('doSwitchToScene'));
        blocks.push('-');
        blocks.push(block('receiveUserEdit'));
        blocks.push(block('doDefineBlock'));
        blocks.push(block('doDeleteBlock'));
        blocks.push(block('doSetBlockAttribute'));
        blocks.push(block('reportBlockAttribute'));
        blocks.push(block('reportEnvironment'));
        blocks.push('-');
        blocks.push(block('receiveSlotEvent'));
        blocks.push(block('doSetSlot'));

        // for debugging: ///////////////
        if (this.world()?.isDevMode) {
            blocks.push('-');
            blocks.push(this.devModeText());
            blocks.push('-');
            blocks.push(watcherToggle('getLastMessage'));
            blocks.push(block('getLastMessage'));
            blocks.push(block('reportHyperZip'));
        // deprecated - superseded by reportEnviornment - retained for legacy
            blocks.push('-');
            blocks.push(block('doCallCC'));
            blocks.push(block('reportCallCC'));
        }

    } else if (category === 'sensing') {

        blocks.push(block('doAsk'));
        blocks.push(watcherToggle('getLastAnswer'));
        blocks.push(block('getLastAnswer'));
        blocks.push('-');
        blocks.push(block('reportMousePosition'));
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
        blocks.push(block('reportDate'));
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

        // for debugging: ///////////////
        if (this.world()?.isDevMode) {
            blocks.push('-');
            blocks.push(this.devModeText());
            blocks.push('-');
            blocks.push(watcherToggle('reportThreadCount'));
            blocks.push(block('reportThreadCount'));
            blocks.push(block('reportStackSize'));
            blocks.push(block('reportFrameCount'));
            blocks.push(block('reportYieldCount'));
        }
    }
    if (category === 'operators') {

        blocks.push(block('reifyScript'));
        blocks.push(block('reifyReporter'));
        blocks.push(block('reifyPredicate'));
        blocks.push('#');
        blocks.push('-');
        blocks.push(block('reportVariadicSum'));
        blocks.push(block('reportDifference'));
        blocks.push(block('reportVariadicProduct'));
        blocks.push(block('reportQuotient'));
        blocks.push(block('reportPower'));
        blocks.push('-');
        blocks.push(block('reportModulus'));
        blocks.push(block('reportVariadicMin'));
        blocks.push(block('reportVariadicMax'));
        blocks.push('-');
        blocks.push(block('reportRound'));
        blocks.push(block('reportMonadic'));
        blocks.push(block('reportAtan2'));
        blocks.push(block('reportRandom'));
        blocks.push('-');
        blocks.push(block('reportVariadicLessThan'));
        blocks.push(block('reportVariadicEquals'));
        blocks.push(block('reportVariadicGreaterThan'));
        blocks.push('-');
        blocks.push(block('reportVariadicAnd'));
        blocks.push(block('reportVariadicOr'));
        blocks.push(block('reportNot'));
        blocks.push(block('reportBoolean'));
        blocks.push('-');
        blocks.push(block('reportJoinWords'));
        blocks.push(block('reportTextSplit'));
        blocks.push(block('reportLetter'));
        blocks.push(block('reportTextAttribute'));
        blocks.push('-');
        blocks.push(block('reportUnicode'));
        blocks.push(block('reportUnicodeAsLetter'));
        blocks.push('-');
        blocks.push(block('reportIsA'));
        blocks.push(block('reportVariadicIsIdentical'));

        if (Process.prototype.enableJS) { // (Process.prototype.enableJS) {
            blocks.push('-');
            blocks.push(block('reportJSFunction'));
            if (Process.prototype.enableCompiling) {
                blocks.push(block('reportCompiled'));
            }
        }

        // for debugging: ///////////////
        if (this.world()?.isDevMode) {
            blocks.push('-');
            blocks.push(this.devModeText());
            blocks.push('-');
            blocks.push(block('reportTypeOf'));
            blocks.push(block('reportTextFunction'));
        }

    }
    if (category === 'variables') {

        blocks.push(this.makeVariableButton());
        if (this.variables.allNames().length > 0) {
            blocks.push(this.deleteVariableButton());
        }
        blocks.push('-');

        varNames = this.allGlobalVariableNames(true, all);
        if (varNames.length > 0) {
            varNames.forEach(name => {
                blocks.push(variableWatcherToggle(name, true));
                blocks.push(variableBlock(name));
            });
            blocks.push('-');
        }

        varNames = this.allLocalVariableNames(true, all);
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
        blocks.push(block('doAddToList'));
        blocks.push(block('doDeleteFromList'));
        blocks.push(block('doInsertInList'));
        blocks.push(block('doReplaceInList'));
        blocks.push('-');
        blocks.push(block('reportConcatenatedLists'));
        blocks.push(block('reportReshape'));
        blocks.push(block('reportCrossproduct'));

        if (SpriteMorph.prototype.showingExtensions) {
            blocks.push('=');
            blocks.push(block('doPrimitive'));
            blocks.push(block('doApplyExtension'));
            blocks.push(block('reportApplyExtension'));
        }

        if (StageMorph.prototype.enableCodeMapping) {
            blocks.push('=');
            blocks.push(block('doMapCodeOrHeader'));
            blocks.push(block('doMapValueCode'));
            blocks.push(block('doMapListCode'));
            blocks.push('-');
            blocks.push(block('reportMappedCode'));
        }

        // for debugging: ///////////////
        if (this.world()?.isDevMode) {
            blocks.push('-');
            blocks.push(this.devModeText());
            blocks.push('-');
            blocks.push(block('doShowTable'));
        }
    }

    return blocks;
};

// StageMorph microworld palette support

StageMorph.prototype.hiddenGlobalBlocks = function () {
    var dict = this.globalVariables().vars;
    return new List([
        new List(Object.keys(this.hiddenPrimitives).filter(selector =>
            this.hiddenPrimitives[selector])
        ),
        new List(this.globalBlocks.filter(def => def.isHelper).map(def =>
            def.abstractBlockSpec())
        ),
        new List(Object.keys(dict).filter(name => dict[name].isHidden))
    ]);
    
};

StageMorph.prototype.restoreHiddenGlobalBlocks = function (
    hiddenList,
    version // optionial snap version
) {
    var ide = this.parentThatIsA(IDE_Morph),
        variables = this.globalVariables(),
        newer = SpriteMorph.prototype.newPrimitivesSince(parseFloat(version)),
        dict = {};

    function hidePrimitive(selector) {
        let migration = SpriteMorph.prototype.blockMigrations[selector],
            id = migration ? migration.selector : selector;
        dict[id] = true;
    }

    // primitives - make sure to take the current block, in case it was changed
    hiddenList.at(1).map(sel => hidePrimitive(sel));
    newer.map(sel => hidePrimitive(sel));
    StageMorph.prototype.hiddenPrimitives = dict;

    // global custom blocks
    this.globalBlocks.forEach(def =>
        def.isHelper = hiddenList.at(2).contains(def.abstractBlockSpec));

    // global variables
    variables.names(true).forEach(name =>
        variables.vars[name].isHidden = hiddenList.at(3).contains(name));

    ide.flushBlocksCache();
    ide.refreshPalette();
    ide.refreshEmptyCategories();
    this.recordUserEdit(
        'palette',
        'restore microworld'
    );
};

// StageMorph primitives

StageMorph.prototype.clear = function () {
    this.clearPenTrails();
};

// StageMorph user menu

StageMorph.prototype.userMenu = function () {
    var ide = this.parentThatIsA(IDE_Morph),
        menu = new MenuMorph(this);

    if (ide && (ide.isAppMode || ide.config.noSpriteEdits)) {
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
    if (ide) {
        menu.addItem(
            'pen trails',
            () => {
                var costume =
                    ide.currentSprite.reportPenTrailsAsCostume().copy();
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
    }
    if (this.trailsLog.length) {
        menu.addItem(
            'svg...',
            'exportTrailsLogAsSVG',
            'export pen trails\nline segments as SVG'
        );
        menu.addItem(
            'poly svg...',
            'exportTrailsLogAsPolySVG',
            'export pen trails\nline segments as polyline SVG'
        );
        menu.addItem(
            'dst...',
            'exportTrailsLogAsDST',
            'export pen trails\nas DST embroidery file'
        );
        menu.addItem(
            'exp...',
            'exportTrailsLogAsEXP',
            'export pen trails\nas EXP embroidery file'
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

// Performer mode button

StageMorph.prototype.addSwitchToScriptsButton = function () {
    var ide = this.parentThatIsA(IDE_Morph),
        scrollFrame = ide.currentSprite.scripts.parentThatIsA(ScrollFrameMorph),
        padding = 4,
        switchToScriptsButton = new PushButtonMorph(
            this, // target
            "switchToScripts",
            new SymbolMorph('turtle', 12)
        );

    this.switchToScriptsButton = switchToScriptsButton;

    switchToScriptsButton.alpha = 0.2;
    switchToScriptsButton.padding = padding;
    switchToScriptsButton.edge = 0;
    switchToScriptsButton.hint =
        'toggle focus between stage\nand scripting area';
    switchToScriptsButton.labelShadowColor =
        scrollFrame.toolBar.keyboardButton.labelShadowColor;
    switchToScriptsButton.fixLayout();
    this.add(switchToScriptsButton);
    switchToScriptsButton.setRight(this.right() - padding);
    switchToScriptsButton.setTop(this.top() + padding);
};

StageMorph.prototype.switchToScripts = function () {
    var ide = this.parentThatIsA(IDE_Morph),
        scrollFrame = ide.currentSprite.scripts.parentThatIsA(ScrollFrameMorph);
    this.switchToScriptsButton.destroy();
    scrollFrame.show();
};

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
        if ((isSnapObject(morph) || !noWatchers) &&
            morph.isVisible && (morph !== excludedSprite)
        ) {
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
        ide.getProjectName() || this.name
    );
};

StageMorph.prototype.exportTrailsLogAsPolySVG = function () {
    var ide = this.parentThatIsA(IDE_Morph);

    ide.saveFileAs(
        this.trailsLogAsPolySVG().src,
        'image/svg',
        (ide.getProjectName() || this.name) + '_poly'
    );
};

StageMorph.prototype.exportTrailsLogAsDST = function () {
    var ide = this.parentThatIsA(IDE_Morph);
    exportEmbroidery(this.trailsLog, ide.getProjectName() || this.name, 'dst');
};

StageMorph.prototype.exportTrailsLogAsEXP = function () {
    var ide = this.parentThatIsA(IDE_Morph);
    exportEmbroidery(this.trailsLog, ide.getProjectName() || this.name, 'exp');
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

StageMorph.prototype.trailsLogAsPolySVG = function () {
    var bottomLeft = this.trailsLog[0][0],
        topRight = bottomLeft,
        maxWidth = this.trailsLog[0][3],
        points = [],
        last,
        clr,
        width,
        cap,
        shift,
        box,
        p1, p2,
        svg;

    function writePoly() {
        var poly = '',
            pts = points.map(p => p.x + ',' + p.y).join(' ');
        poly = '<polyline fill="none" points="' +
            pts +
            '" ' +
            'style="stroke:' + clr.toRGBstring() + ';' +
            'stroke-opacity:' + clr.a + ';' +
            'stroke-width:' + width + ';' +
            'stroke-linecap:' + cap + ';' +
            'stroke-linejoin:' + (cap === 'round' ? 'round' : 'miter') +
            '" />';
        svg += poly;
    }

    function isSame(point1, point2) {
        // adjust for floating point errors
        var thres = 0.0000000001;
        return point1 instanceof Point &&
            point2 instanceof Point &&
            (point1.eq(point2) ||
                (Math.abs(point1.x - point2.x) < thres &&
                    Math.abs(point1.y - point2.y) < thres)
            );
    }

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

        if (isNil(last)) {
            points.push(p1);
            points.push(p2);
            last = p2;
            clr = line[2];
            width = line[3];
            cap = line[4];
        } else if (isSame(p1, last) &&
            line[2].eq(clr) &&
            line[3] === width &&
            line[4] === cap
        ) {
            points.push(p2);
            last = p2;
        } else {
            writePoly();
            points = [p1, p2];
            last = p2;
            clr = line[2];
            width = line[3];
            cap = line[4];
        }
    });
    if (points.length > 1) {
        writePoly();
    }
    svg += '</svg>';
    return {
        src : svg,
        rot : new Point(-box.origin.x, box.corner.y)
    };
};

// StageMorph coordinate conversion

StageMorph.prototype.costumePoint = SpriteMorph.prototype.costumePoint;

StageMorph.prototype.costumePoint = function(aPoint) {
    // answer the coordinates of the given world point on the current
    // costume's pixel bitmap, if any
    var flipY = new Point(1, -1),
        stagePoint;
    if (!this.costume) {
        return new Point();
    }
    stagePoint = this.snapPoint(aPoint).multiplyBy(flipY);
    return stagePoint.add(this.costume.extent().divideBy(2));
};

StageMorph.prototype.normalizePoint = SpriteMorph.prototype.normalizePoint;

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

StageMorph.prototype.setColorDimension = function (idx, num) {
    var n = +num;

    idx = +idx;
    if (idx < 0 || idx > 3) {return; }
    if (idx === 0) {
        if (n < 0 || n > 100) { // wrap the hue
            n = (n < 0 ? 100 : 0) + n % 100;
        }
    } else {
        n = Math.min(100, Math.max(0, n));
    }
    if (idx === 3) {
        this.color.a = 1 - n / 100;
    } else {
        this.cachedColorDimensions[idx] = n / 100;
        this.color['set_' + SpriteMorph.prototype.penColorModel].apply(
            this.color,
            this.cachedColorDimensions
        );
    }
    this.rerender();
};

// StageMorph writing on the trails canvas

StageMorph.prototype.write = function (text, size) {
    var fontSize = Math.max(3, +size || 1) * this.scale,
        textMorph, ctx, img;

    // make sure text can be printed
    if (typeof text !== 'string' && typeof text !== 'number') {
        throw new Error(
            localize('can only write text or numbers, not a') + ' ' +
            typeof text
        );
    }

    // use a TextMorph for layout
    textMorph = new TextMorph(
        text,
        fontSize,
        null, // fontStyle
        null, // bold - this.bubbleFontIsBold,
        null, // italic
        null, // alignment 'center'
        this.width() - fontSize
    );

    // try to contrast the background
    textMorph.setColor(this.getColorDimension(2) > 50 ? BLACK : WHITE);

    // stamp the text onstage
    ctx = this.penTrails().getContext('2d');
    img = textMorph.getImage();
    if (img.width < 1 || (img.height < 1)) {
        // too small to draw
        return;
    }
    ctx.save();
    ctx.scale(1 / this.scale, 1 / this.scale);
    ctx.drawImage(
        img,
        fontSize / 2,
        Math.min(0, (this.height() - img.height - fontSize / 2))
    );
    ctx.restore();
    this.changed();
    this.cachedPenTrailsMorph = null;
};

// StageMorph "pen" attributes for the background

StageMorph.prototype.getColorDimension =
    SpriteMorph.prototype.getColorDimension;

StageMorph.prototype.changeColorDimension =
    SpriteMorph.prototype.changeColorDimension;

StageMorph.prototype.setColorRGBA =
    SpriteMorph.prototype.setColorRGBA;

StageMorph.prototype.changeColorRGBA =
    SpriteMorph.prototype.changeColorRGBA;

StageMorph.prototype.setColor = function (aColor) {
    if (!this.color.eq(aColor, true)) { // observeAlpha
        this.color = aColor.copy();
        this.rerender();
        this.cachedColorDimensions = this.color[
            SpriteMorph.prototype.penColorModel
        ]();
    }
};

StageMorph.prototype.setBackgroundColor = StageMorph.prototype.setColor;

StageMorph.prototype.getPenAttribute
    = SpriteMorph.prototype.getPenAttribute;

// StageMorph printing on another sprite:

StageMorph.prototype.blitOn = SpriteMorph.prototype.blitOn;
StageMorph.prototype.surface = SpriteMorph.prototype.surface;

// StageMorph pseudo-inherited behavior

StageMorph.prototype.categories = SpriteMorph.prototype.categories;
StageMorph.prototype.blockColor = SpriteMorph.prototype.blockColor;
StageMorph.prototype.paletteColor = SpriteMorph.prototype.paletteColor;
StageMorph.prototype.setName = SpriteMorph.prototype.setName;
StageMorph.prototype.reporterize = SpriteMorph.prototype.reporterize;
StageMorph.prototype.variableBlock = SpriteMorph.prototype.variableBlock;
StageMorph.prototype.showingWatcher = SpriteMorph.prototype.showingWatcher;
StageMorph.prototype.addVariable = SpriteMorph.prototype.addVariable;
StageMorph.prototype.deleteVariable = SpriteMorph.prototype.deleteVariable;
StageMorph.prototype.renameVariable = SpriteMorph.prototype.renameVariable;
StageMorph.prototype.flashScope = SpriteMorph.prototype.flashScope;
StageMorph.prototype.unflashScope = SpriteMorph.prototype.unflashScope;
StageMorph.prototype.visibleScopeFor = SpriteMorph.prototype.visibleScopeFor;
 

// StageMorph Palette Utilities

StageMorph.prototype.makeBlock = SpriteMorph.prototype.makeBlock;
StageMorph.prototype.helpMenu = SpriteMorph.prototype.helpMenu;
StageMorph.prototype.makeBlockButton = SpriteMorph.prototype.makeBlockButton;
StageMorph.prototype.customPaletteButton
    = SpriteMorph.prototype.customPaletteButton;

StageMorph.prototype.makeVariableButton
    = SpriteMorph.prototype.makeVariableButton;

StageMorph.prototype.categoryText = SpriteMorph.prototype.categoryText;
StageMorph.prototype.devModeText = SpriteMorph.prototype.devModeText;

StageMorph.prototype.deleteVariableButton
    = SpriteMorph.prototype.deleteVariableButton;

StageMorph.prototype.customBlockTemplatesForCategory
    = SpriteMorph.prototype.customBlockTemplatesForCategory;

StageMorph.prototype.getPrimitiveTemplates
    = SpriteMorph.prototype.getPrimitiveTemplates;

StageMorph.prototype.palette = SpriteMorph.prototype.palette;
StageMorph.prototype.freshPalette = SpriteMorph.prototype.freshPalette;
StageMorph.prototype.blocksMatching = SpriteMorph.prototype.blocksMatching;
StageMorph.prototype.searchBlocks = SpriteMorph.prototype.searchBlocks;

// StageMorph utilities for showing & hiding blocks in the palette

StageMorph.prototype.allPaletteBlocks
    = SpriteMorph.prototype.allPaletteBlocks;

StageMorph.prototype.isHidingBlock = SpriteMorph.prototype.isHidingBlock;
StageMorph.prototype.isDisablingBlock = SpriteMorph.prototype.isDisablingBlock;

StageMorph.prototype.changeBlockVisibility
    = SpriteMorph.prototype.changeBlockVisibility;

StageMorph.prototype.changePrimitiveVisibility
    = SpriteMorph.prototype.changePrimitiveVisibility;

StageMorph.prototype.changeCustomBlockVisibility
    = SpriteMorph.prototype.changeCustomBlockVisibility;

StageMorph.prototype.changeVarBlockVisibility
    = SpriteMorph.prototype.changeVarBlockVisibility;

StageMorph.prototype.populatedCategories =
    SpriteMorph.prototype.populatedCategories;

StageMorph.prototype.primitiveCategories =
    SpriteMorph.prototype.primitiveCategories;

StageMorph.prototype.hasPrimitiveCategories =
    SpriteMorph.prototype.hasPrimitiveCategories;

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

// StageMorph talk bubble

StageMorph.prototype.stopTalking = SpriteMorph.prototype.stopTalking;

StageMorph.prototype.bubble = function (data) {
    var bubble;
    this.stopTalking();
    if (data === '' || isNil(data)) {return; }
    bubble = new StageBubbleMorph(data, this);
    this.add(bubble);
    this.positionTalkBubble();
};

StageMorph.prototype.talkBubble = SpriteMorph.prototype.talkBubble;

StageMorph.prototype.positionTalkBubble = function () {
    var bubble = this.talkBubble();
    if (!bubble) {return null; }
    bubble.show();
    bubble.keepWithin(this);
};

StageMorph.prototype.doThink = StageMorph.prototype.bubble;

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
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
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

StageMorph.prototype.worldPoint =
    SpriteMorph.prototype.worldPoint;
    
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

StageMorph.prototype.allHatBlocksForUserEdit =
    SpriteMorph.prototype.allHatBlocksForUserEdit;

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

StageMorph.prototype.allBlockInstancesInData = function (definition) {
    var blocks = [];
    this.allContextsUsing(definition).forEach(context => {
        if (context.expression instanceof BlockMorph) {
            context.expression.allChildren().forEach(c => {
                if (c.isCustomBlock && (c.definition === definition)) {
                    blocks.push(c);
                }
            });
        }
    });
    return blocks;
};

StageMorph.prototype.allContextsUsing = function (definition) {
    var objects,
        contexts = [],
        charted = [];

    if (!definition.isGlobal) {return []; }

    function scanVariables(varFrame) {
        varFrame.names().forEach(vname => {
            var value = varFrame.getVar(vname);
            if (value instanceof Context) {
                scanContext(value);
            } else if (value instanceof List) {
                scanList(value);
            }
        });
    }

    function scanContext(context) {
        if (!charted.includes(context)) {
            charted.push(context);
        }
        if (context.expression instanceof BlockMorph &&
            context.expression.allChildren().some(c =>
                c.isCustomBlock && (c.definition === definition))
        ) {
            contexts.push(context);
        }
    }

    function scanList(list) {
        if (!charted.includes(list)) {
            charted.push(list);
            if (!list.canBeJSON()) {
                list.map(each => {
                    if (each instanceof Context) {
                        scanContext(each);
                    } else if (each instanceof List) {
                        scanList(each);
                    }
                });
            }
        }
    }

    objects = this.children.filter(morph => morph instanceof SpriteMorph);
    objects.push(this);
    scanVariables(this.globalVariables());
    objects.forEach(sprite => scanVariables(sprite.variables));
    this.threads.processes.forEach(proc => {
        if (proc.context instanceof Context) {
            scanContext(proc.context);
        }
    });
    return contexts;
};

StageMorph.prototype.allBlockInvocationsInData = function (oldSpec, receiver) {
    var blocks = [];
    this.allContextsInvoking(oldSpec, receiver).forEach(context => {
        if (context.expression instanceof BlockMorph) {
            context.expression.allChildren().forEach(c => {
                if (c.isCustomBlock &&
                    !c.isGlobal &&
                    (c.blockSpec === oldSpec)
                ) {
                    blocks.push(c);
                }
            });
        }
    });
    return blocks;
};

StageMorph.prototype.allContextsInvoking = function (oldSpec, receiver) {
    var objects,
        contexts = [],
        charted = [];

    function scanVariables(varFrame) {
        varFrame.names().forEach(vname => {
            var value = varFrame.getVar(vname);
            if (value instanceof Context) {
                scanContext(value);
            } else if (value instanceof List) {
                scanList(value);
            }
        });
    }

    function scanContext(context) {
        if (!charted.includes(context)) {
            charted.push(context);
        }
        if ((context.receiver === receiver || context.receiver === null) &&
            context.expression instanceof BlockMorph &&
            context.expression.allChildren().some(c =>
                c.isCustomBlock && !c.isGlobal && (c.blockSpec === oldSpec)
            )
        ) {
            contexts.push(context);
        }
    }

    function scanList(list) {
        if (!charted.includes(list)) {
            charted.push(list);
            list.map(each => {
                if (each instanceof Context) {
                    scanContext(each);
                } else if (each instanceof List) {
                    scanList(each);
                }
            });
        }
    }

    objects = this.children.filter(morph => morph instanceof SpriteMorph);
    objects.push(this);
    scanVariables(this.globalVariables());
    objects.forEach(sprite => scanVariables(sprite.variables));
    this.threads.processes.forEach(proc => {
        if (proc.context instanceof Context) {
            scanContext(proc.context);
        }
    });
    return contexts;
};

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

StageMorph.prototype.customizeBlocks =
    SpriteMorph.prototype.customizeBlocks;

StageMorph.prototype.restorePrimitives =
    SpriteMorph.prototype.restorePrimitives;

StageMorph.prototype.restorePrimitive =
    SpriteMorph.prototype.restorePrimitive;

StageMorph.prototype.customizePrimitive =
    SpriteMorph.prototype.customizePrimitive;

StageMorph.prototype.allPrimitiveBlockInstances =
    SpriteMorph.prototype.allPrimitiveBlockInstances;

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

StageMorph.prototype.globalVariables
    = SpriteMorph.prototype.globalVariables;

StageMorph.prototype.inheritedVariableNames = function () {
    return [];
};

StageMorph.prototype.deletableVariableNames = function () {
    return this.variables.allNames();
};

StageMorph.prototype.allLocalVariableNames
	= SpriteMorph.prototype.allLocalVariableNames;

StageMorph.prototype.allGlobalVariableNames
	= SpriteMorph.prototype.allGlobalVariableNames;

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

// StageMorph recording and synching user edits

StageMorph.prototype.recordUserEdit =
    SpriteMorph.prototype.recordUserEdit;

StageMorph.prototype.scriptsOnlyXML =
    SpriteMorph.prototype.scriptsOnlyXML;

StageMorph.prototype.synchScriptsFrom =
    SpriteMorph.prototype.synchScriptsFrom;

// StageMorph cloning a generic sprite

StageMorph.prototype.newTurtleSprite =
    SpriteMorph.prototype.newTurtleSprite;

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
            def => def.isSending(message, receiverName)
        );
    this.globalBlocks.forEach(def => {
        if (def.collectDependencies([], []).some(dep => contains(all, dep))) {
            all.push(def);
        }
    });
    return all;
};

// StageMorph serialization & exporting utilities

StageMorph.prototype.toXMLString = function () {
    // answer an xml string representation of this sprite and all parts
    // attached to it, including all dependencies (global custom blocks).
    var ide = this.parentThatIsA(IDE_Morph),
        dependencies = [],
        categories = [],
        blocksXML = '',
        conversion,
        xml;

    function collect(item, array) {
        // only once
        if (!contains(array, item)) {
            array.push(item);
        }
    }

    function collectAll(items, array) {
        items.forEach(item => collect(item, array));
    }

    // collect all dependencies and custom categories.
    // only collect global custom block dependencies, because the locals
    // will be included in each sprite's serialization code

    // global block definition in scripts
    this.scripts.children.filter(
        morph => morph instanceof BlockMorph
    ).forEach(script =>
        collectAll(
            script.dependencies(true),
            dependencies
        )
    );

    // global block definitions referenced in local block definitions
    this.customBlocks.forEach(def => {
        collect(def.category, categories);
        collectAll(
            def.collectDependencies([], [], this)
                .filter(each => each.isGlobal),
            dependencies
        );
    });

    // encode both parts of the export-file:
    // the blocks library and the sprites

    if (dependencies.length || categories.length) {
        blocksXML = ide.blocksLibraryXML(dependencies, categories);
    }

    conversion = this.toXML;
    this.toXML = this.toSpriteXML;
    xml = '<sprites app="' +
        ide.serializer.app +
        '" version="' +
        ide.serializer.version +
        '">' +
        blocksXML +
        ide.serializer.serialize([this]) +
        '</sprites>';
    this.toXML = conversion;
    return xml;
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
    this.bubbleFontColor = BLACK;
    this.bubbleFontSize = sprite.bubbleFontSize;
    this.bubbleFontIsBold = sprite.bubbleFontIsBold;
    this.bubbleFontAlignment = 'center';
    this.bubbleCorner = sprite.bubbleCorner;
    this.bubbleBorder = sprite.bubbleBorder;
    this.bubblePadding = this.bubbleCorner / 2;
    this.maxTextWidth = sprite.bubbleMaxTextWidth;

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
        scroller,
        sprite = SpriteMorph.prototype,
        maxHeight = (this.stage?.dimensions?.y || 360) * this.scale -
            (this.border + this.padding + 1) * 2,
        draggable = this.stage?.tutorialMode ?
            !this.stage.tutorialMode.disableDraggingData
                : !sprite.disableDraggingData,
        isText,
        img,
        scaledImg,
        width;

    async function writeClipboardText(text, ide) {
        try {
            await navigator.clipboard.writeText(text);
            ide.showMessage('copied to clipboard', 1, true);
        } catch (error) {
            ide.showMessage(error.message, 2, true);
        }
    }

    if (data instanceof BlockMorph) {
        img = data.fullImage();
        contents = new Morph();
        contents.isCachingImage = true;
        contents.bounds.setWidth(img.width);
        contents.bounds.setHeight(img.height);
        contents.cachedImage = img;

        // support blocks to be dragged out of speech balloons:
        contents.isDraggable = draggable;
        contents.selectForEdit = function () {
            var script = data.fullCopy(),
                prepare = script.prepareToBeGrabbed,
                ide = this.parentThatIsA(IDE_Morph)||
                    this.world().childThatIsA(IDE_Morph);

            script.prepareToBeGrabbed = function (hand) {
                prepare.call(this, hand);
                hand.grabOrigin = {
                    origin: ide.palette,
                    position: ide.palette.center()
                };
                this.prepareToBeGrabbed = prepare;
            };

            if (ide.isAppMode) {return; }
            script.setPosition(this.position());
            return script;
        };
    } else if (data instanceof Morph) {
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
        if (contents instanceof TableFrameMorph && this.stage) {
            contents.expand(this.stage.extent().translateBy(
                -2 * (this.edge + this.border + this.padding)
            ));
        }
    } else if (isString(data)) {
        isText = true;
        contents = new TextMorph(
            data,
            this.bubbleFontSize * this.scale,
            null, // fontStyle
            this.bubbleFontIsBold,
            false, // italic
            this.bubbleFontAlignment
        );

        // support exporting text / numbers directly from speech balloons:
        contents.userMenu = function () {
            var menu = new MenuMorph(this),
                ide = this.parentThatIsA(IDE_Morph)||
                    this.world().childThatIsA(IDE_Morph);

            if (ide.isAppMode) {return; }
            menu.addItem(
                'export',
                () => ide.saveFileAs(
                    data,
                    'text/plain;charset=utf-8',
                    localize('data')
                )
            );
            menu.addItem(
                'copy',
                () => writeClipboardText(data, ide)
            );
            return menu;
        };
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

        // support costumes to be dragged out of speech balloons:
        contents.isDraggable = draggable;
        contents.selectForEdit = function () {
            var cst = data.copy(),
                icon,
                prepare,
                ide = this.parentThatIsA(IDE_Morph)||
                    this.world().childThatIsA(IDE_Morph);

            cst.name = ide.currentSprite.newCostumeName(cst.name);
            icon = new CostumeIconMorph(cst);
            prepare = icon.prepareToBeGrabbed;

            icon.prepareToBeGrabbed = function (hand) {
                hand.grabOrigin = {
                    origin: ide.palette,
                    position: ide.palette.center()
                };
                this.prepareToBeGrabbed = prepare;
            };

            if (ide.isAppMode) {return; }
            icon.setCenter(this.center());
            return icon;
        };

        // support exporting costumes directly from speech balloons:
        contents.userMenu = function () {
            var menu = new MenuMorph(this),
                ide = this.parentThatIsA(IDE_Morph)||
                    this.world().childThatIsA(IDE_Morph);

            if (ide.isAppMode) {return; }
            menu.addItem(
                'export',
                () => {
                    if (data instanceof SVG_Costume) {
                        // don't show SVG costumes in a new tab (shows text)
                        ide.saveFileAs(
                            data.contents.src,
                            'text/svg',
                            data.name
                        );
                    } else { // rasterized Costume
                        ide.saveCanvasAs(data.contents, data.name);
                    }
                }
            );
            return menu;
        };

    } else if (data instanceof Sound) {
        contents = new SymbolMorph('notes', 30);

        // support sounds to be dragged out of speech balloons:
        contents.isDraggable = draggable;
        contents.selectForEdit = function () {
            var snd = data.copy(),
                icon,
                prepare,
                ide = this.parentThatIsA(IDE_Morph)||
                    this.world().childThatIsA(IDE_Morph);

            snd.name = ide.currentSprite.newSoundName(snd.name);
            icon = new SoundIconMorph(snd);
            prepare = icon.prepareToBeGrabbed;

            icon.prepareToBeGrabbed = function (hand) {
                hand.grabOrigin = {
                    origin: ide.palette,
                    position: ide.palette.center()
                };
                this.prepareToBeGrabbed = prepare;
            };

            if (ide.isAppMode) {return; }
            icon.setCenter(this.center());
            return icon;
        };

        // support exporting sounds directly from speech balloons:
        contents.userMenu = function () {
            var menu = new MenuMorph(this),
                ide = this.parentThatIsA(IDE_Morph)||
                    this.world().childThatIsA(IDE_Morph);

            if (ide.isAppMode) {return; }
            menu.addItem(
                'export',
                () => ide.saveAudioAs(data.audio, data.name)
            );
            return menu;
        };

    } else if (data instanceof HTMLCanvasElement) {
        img = data;
        contents = new Morph();
        contents.isCachingImage = true;
        contents.bounds.setWidth(img.width);
        contents.bounds.setHeight(img.height);
        contents.cachedImage = img;
    } else if (data instanceof List) {
        if (data.isTable()) {
            contents = new TableFrameMorph(new TableMorph(data));
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
        if (contents instanceof TableFrameMorph && this.stage) {
            contents.expand(this.stage.extent().translateBy(
                -2 * (this.edge + this.border + this.padding)
            ));
        }
        contents.isDraggable = false;
        if (!draggable) {
            contents.forAllChildren(morph => {
                morph.isDraggable = false;
                morph.selectForEdit = nop;
            });
        }
    } else if (data instanceof Context) {
        img = data.image();
        contents = new Morph();
        contents.isCachingImage = true;
        contents.bounds.setWidth(img.width);
        contents.bounds.setHeight(img.height);
        contents.cachedImage = img;
        contents.version = data.version;
        contents.step = function () {
            if (this.version !== data.version) {
                img = data.image();
                this.cachedImage = img;
                this.version = data.version;
                this.changed();
            }
        };

        // support blocks to be dragged out of speech balloons:
        contents.isDraggable = draggable;
        contents.selectForEdit = function () {
            var script = data.toUserBlock(),
                prepare = script.prepareToBeGrabbed,
                ide = this.parentThatIsA(IDE_Morph)||
                    this.world().childThatIsA(IDE_Morph);

            script.prepareToBeGrabbed = function (hand) {
                prepare.call(this, hand);
                hand.grabOrigin = {
                    origin: ide.palette,
                    position: ide.palette.center()
                };
                this.prepareToBeGrabbed = prepare;
            };

            if (ide.isAppMode) {return; }
            script.setPosition(this.position());
            return script;
        };
    } else if (data instanceof Color) {
        contents = SpriteMorph.prototype.colorSwatch(
            data,
            this.bubbleFontSize * 1.4
        );
    } else {
        contents = new TextMorph(
            display(data),
            this.bubbleFontSize * this.scale,
            null, // fontStyle
            this.bubbleFontIsBold,
            false, // italic
            'center'
        );

        // support exporting text / numbers directly from speech balloons:
        contents.userMenu = function () {
            var menu = new MenuMorph(this),
                ide = this.parentThatIsA(IDE_Morph)||
                    this.world().childThatIsA(IDE_Morph);

            if (ide.isAppMode) {return; }
            menu.addItem(
                'export',
                () => ide.saveFileAs(
                    data.toString(),
                    'text/plain;charset=utf-8',
                    localize('data')
                )
            );
            menu.addItem(
                'copy',
                () => writeClipboardText(data, ide)
            );
            return menu;
        };

    }
    if (contents instanceof TextMorph) {
        // reflow text boundaries
        width = Math.max(
            contents.width(),
            sprite.bubbleCorner * 2 * this.scale
        );
        if (isText) {
            width = Math.min(width, this.maxTextWidth * this.scale);
        }
        contents.color = this.bubbleFontColor;
        contents.setWidth(width);

        if (contents.height() > maxHeight) { // scroll
            scroller = new ScrollFrameMorph();
            scroller.acceptsDrops = false;
            scroller.contents.acceptsDrops = false;
            scroller.bounds.setWidth(contents.width());
            scroller.bounds.setHeight(maxHeight);
            scroller.addContents(contents);
            scroller.color = new Color(0, 0, 0, 0);

            // scroll to the bottom:
            scroller.scrollY(scroller.bottom() - contents.bottom());
            scroller.adjustScrollBars();

            contents = scroller;
        }

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
    // scale my settings
    this.edge = this.bubbleCorner * this.scale;
    this.border = this.bubbleBorder * this.scale;
    this.padding = this.bubblePadding * this.scale;

    // rebuild my contents
    if (!(this.contentsMorph instanceof ListWatcherMorph ||
            this.contentsMorph instanceof TableFrameMorph)) {
        this.contentsMorph.destroy();
        this.contentsMorph = this.dataAsMorph(this.data);
    }
    this.add(this.contentsMorph);

    // adjust my dimensions
    this.adjustDimensions();

    // position my contents
    this.contentsMorph.setPosition(this.position().add(
        new Point(
            this.padding || this.edge,
            this.border + this.padding + 1
        )
    ));
};

SpriteBubbleMorph.prototype.adjustDimensions = function () {
    this.bounds.setWidth(this.contentsMorph.width()
        + (this.padding ? this.padding * 2 : this.edge * 2));
    this.bounds.setHeight(this.contentsMorph.height()
        + this.edge
        + this.border * 2
        + this.padding * 2
        + 2);
};

// StageBubbleMorph ////////////////////////////////////////////////////////

/*
    I am a stage's scaleable speech bubble. I rely on SpriteMorph
    for my preferences settings and quasi-inherit from SpriteBubbleMorph
*/

// StageBubbleMorph inherits from SpeechBubbleMorph:

StageBubbleMorph.prototype = new SpeechBubbleMorph();
StageBubbleMorph.prototype.constructor = StageBubbleMorph;
StageBubbleMorph.uber = SpeechBubbleMorph.prototype;

// StageBubbleMorph instance creation:

function StageBubbleMorph(data, stage) {
    this.init(data, stage);
}

StageBubbleMorph.prototype.init = function (data, stage) {
    var sprite = SpriteMorph.prototype;
    this.stage = stage;
    this.scale = stage ? stage.scale : 1;
    this.data = data;
    this.bubbleFontColor = BLACK;
    this.bubbleFontSize = sprite.bubbleFontSize;
    this.bubbleFontIsBold = false; // sprite.bubbleFontIsBold;
    this.bubbleCorner = sprite.bubbleCorner;
    this.bubbleBorder = sprite.bubbleBorder;
    this.bubblePadding = this.bubbleCorner / 2;
    this.maxTextWidth = stage.dimensions.x - sprite.bubbleCorner;
    this.bubbleFontAlignment = 'left';

    StageBubbleMorph.uber.init.call(
        this,
        this.data,
        sprite.bubbleColor,
        null,
        null,
        sprite.bubbleBorderColor,
        null,
        null, // isThought
        true // no shadow
    );

    this.isCachingImage = true;
    this.rerender();
};

// StageBubbleMorph contents formatting

StageBubbleMorph.prototype.dataAsMorph =
    SpriteBubbleMorph.prototype.dataAsMorph;

// StageBubbleMorph scaling

StageBubbleMorph.prototype.setScale = SpriteBubbleMorph.prototype.setScale;

// StageBubbleMorph layout:

StageBubbleMorph.prototype.fixLayout = SpriteBubbleMorph.prototype.fixLayout;

StageBubbleMorph.prototype.adjustDimensions = function () {
    this.bounds.setWidth(this.contentsMorph.width()
        + (this.padding ? this.padding * 2 : this.edge * 2));
    this.bounds.setHeight(this.contentsMorph.height()
        + this.edge
        + this.border * 2);
};

StageBubbleMorph.prototype.outlinePath = BoxMorph.prototype.outlinePath;

// Costume /////////////////////////////////////////////////////////////

/*
    I am a picture that's "wearable" by a sprite. My rotationCenter is
    relative to my contents position. I can also contain embedded data
    (a string), e.g. for sharing a CSV or JSON or serialized blocks,
    sprites, scenes in XML format.
*/

// Costume instance creation

function Costume(canvas, name, rotationCenter, noFit, maxExtent) {
    this.contents = canvas ? normalizeCanvas(canvas, true)
            : newCanvas(null, true);
    if (!noFit) {this.shrinkToFit(maxExtent || this.maxExtent()); }
    this.name = name || null;
    this.rotationCenter = rotationCenter || this.center();
    this.embeddedData = null; // must be a string or null
    this.version = Date.now(); // for observer optimization
    this.loaded = null; // for de-serialization only
}

Costume.prototype.maxDimensions = new Point(480, 360);

Costume.prototype.maxExtent = function () {
    // return StageMorph.prototype.dimensions;
    return this.maxDimensions;
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

// Costume growing

Costume.prototype.growTo = function (point, padding = 0) {
    // expand the canvas contents so the coordinates of the given point
    // including an optional padding - e.g. for the line width - are within
    // its bounds, answer false if nothing was changed
    var bounds = this.bounds(),
        w = bounds.width(),
        h = bounds.height(),
        offX = 0,
        offY = 0,
        canvas,
        ctx;
    if (bounds.insetBy(padding).containsPoint(point)) {
        return false;
    }
    if (point.x - padding < 0) {
        offX = padding - point.x;
        w += offX;
    } else {
        w = Math.max(point.x + padding, w);
    }
    if (point.y - padding < 0) {
        offY = padding - point.y;
        h += offY;
    } else {
        h = Math.max(point.y + padding, h);
    }
    canvas = newCanvas(new Point(w, h), true);
    ctx = canvas.getContext('2d');
    ctx.drawImage(this.contents, offX, offY);
    this.contents = canvas;
    this.rotationCenter = this.rotationCenter.add(new Point(offX, offY));
    return true;
};

// Costume flipping, stretching & skewing

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
        ),
        true // no shrink-wrap
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

Costume.prototype.skewed = function (angle, factor) {
    var degrees = ((+angle % 360) + 360) % 360,
        isDown = degrees > 90 && degrees < 270,
        w = this.width(),
        h = this.height(),
        trg = w * factor / 100,
        delta = w - trg,
        src = this.rasterized().contents,
        shift = Math.min(
                this.rotationCenter.y * Math.tan(radians(degrees)),
                Math.min(w * 100, 5000, (16777216 - w) / h)
            ) * (isDown ? -1 : 1),
        left = (w - trg) / 2 + shift,
        l = Math.min(left, 0),
        right = left + trg,
        r = Math.max(right, w),
        pad = Math.abs(l),
        dst = newCanvas(new Point(r - l, h), true),
        ctx = dst.getContext('2d'),
        step = shift / h,
        y;

    for (y = 0; y < h; y += 1) {
        ctx.drawImage(
            src, //image,
            0, // sx,
            isDown ? y : h - y, // sy,
            w, // sWidth,
            1, // sHeight,
            y / h * delta * 0.5 + (step * y) + pad, // dx,
            isDown ? y : h - y, // dy,
            w - (y / h * delta), // dWidth,
            1 // dHeight
        );
    }
    return new Costume(
        dst,
        this.name,
        this.rotationCenter.translateBy(new Point(pad, 0)),
        true
    );
};

// Costume actions

Costume.prototype.edit = function (aWorld, anIDE, isnew, oncancel, onsubmit) {
    var editor = new PaintEditorMorph();
    editor.oncancel = oncancel || nop;
    editor.openIn(
        aWorld,
        isnew ?
                newCanvas(anIDE.stage.dimensions, true) :
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

Costume.prototype.thumb = function (extentPoint) {
    // answer a new Morph of extentPoint dimensions that displays
    // my thumbnail representation keeping the original aspect ratio
    var myself = this,
        thumb = new Morph();

    thumb.render = function (ctx) {
        var w = myself.width(),
            h = myself.height(),
            scale = Math.min(
                (extentPoint.x / w),
                (extentPoint.y / h)
            ),
            xOffset = (extentPoint.x - (w * scale)) / 2,
            yOffset = (extentPoint.y - (h * scale)) / 2;

        ctx.save();
        ctx.scale(scale, scale);
        ctx.translate(xOffset / scale, yOffset / scale);
        ctx.drawImage(
            myself.contents,
            Math.floor(xOffset / scale),
            Math.floor(yOffset / scale)
        );
        ctx.restore();
    };

    thumb.setExtent(extentPoint);
    return thumb;
};

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
        return new List(pixels);
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

// Costume storing blocks code in PNG exports

Costume.prototype.pngData = function () {
    return embedMetadataPNG(this.contents, this.embeddedData);
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
        isnew ? newCanvas(anIDE.stage.dimensions) : this.contents,
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
    this.pitch = pitch === 0 ? 0 : Math.min(Math.max(pitch, 0), 144) || 69;
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
        myself = this,
        fontSize = SyntaxElementMorph.prototype.fontSize,
        isSameList = this.contentsMorph instanceof ListWatcherMorph
            && (this.contentsMorph.list === this.contents),
        isSameTable = this.contentsMorph instanceof TableFrameMorph
            && (this.contentsMorph.tableMorph.table === this.contents ||
                this.contents.isADT()),
        draggable = this.parentThatIsA(StageMorph)?.tutorialMode ?
            !this.parentThatIsA(StageMorph).tutorialMode.disableDraggingData
                : !SpriteMorph.prototype.disableDraggingData,
        setupList = () => {
            if (this.contents.isTable()) {
                this.contentsMorph = new TableFrameMorph(
                    new TableMorph(this.contents)
                );
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
        };

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
            } else {
                img = this.contents.fullImage();
            }
            this.contentsMorph = new Morph();
            this.contentsMorph.isCachingImage = true;
            this.contentsMorph.bounds.setWidth(img.width);
            this.contentsMorph.bounds.setHeight(img.height);
            this.contentsMorph.cachedImage = img;
            this.version = this.contents.version;
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
            this.version = this.contents.version;

            // support blocks to be dragged out of watchers:
            this.contentsMorph.isDraggable = draggable;
            this.contentsMorph.selectForEdit = function () {
                var script = myself.contents.toUserBlock(),
                    prepare = script.prepareToBeGrabbed,
                    ide = this.parentThatIsA(IDE_Morph) ||
                        this.world().childThatIsA(IDE_Morph);

                script.prepareToBeGrabbed = function (hand) {
                    prepare.call(this, hand);
                    hand.grabOrigin = {
                        origin: ide.palette,
                        position: ide.palette.center()
                    };
                    this.prepareToBeGrabbed = prepare;
                };

                if (ide.isAppMode) {return; }
                script.setPosition(this.position());
                return script;
            };
        } else if (this.contents instanceof Costume) {
            img = this.contents.thumbnail(new Point(40, 40));
            this.contentsMorph = new Morph();
            this.contentsMorph.isCachingImage = true;
            this.contentsMorph.bounds.setWidth(img.width);
            this.contentsMorph.bounds.setHeight(img.height);
            this.contentsMorph.cachedImage = img;

            // support costumes to be dragged out of watchers:
            this.contentsMorph.isDraggable = draggable;
            this.contentsMorph.selectForEdit = function () {
                var cst = myself.contents.copy(),
                    icon,
                    prepare,
                    ide = this.parentThatIsA(IDE_Morph)||
                        this.world().childThatIsA(IDE_Morph);

                cst.name = ide.currentSprite.newCostumeName(cst.name);
                icon = new CostumeIconMorph(cst);
                prepare = icon.prepareToBeGrabbed;

                icon.prepareToBeGrabbed = function (hand) {
                    hand.grabOrigin = {
                        origin: ide.palette,
                        position: ide.palette.center()
                    };
                    this.prepareToBeGrabbed = prepare;
                };

                if (ide.isAppMode) {return; }
                icon.setCenter(this.center());
                return icon;
            };
        } else if (this.contents instanceof Sound) {
            this.contentsMorph = new SymbolMorph('notes', 30);

            // support sounds to be dragged out of watchers:
            this.contentsMorph.isDraggable = draggable;
            this.contentsMorph.selectForEdit = function () {
                var snd = myself.contents.copy(),
                    icon,
                    prepare,
                    ide = this.parentThatIsA(IDE_Morph)||
                        this.world().childThatIsA(IDE_Morph);

                snd.name = ide.currentSprite.newCostumeName(snd.name);
                icon = new SoundIconMorph(snd);
                prepare = icon.prepareToBeGrabbed;

                icon.prepareToBeGrabbed = function (hand) {
                    hand.grabOrigin = {
                        origin: ide.palette,
                        position: ide.palette.center()
                    };
                    this.prepareToBeGrabbed = prepare;
                };

                if (ide.isAppMode) {return; }
                icon.setCenter(this.center());
                return icon;
            };
        } else if (this.contents instanceof List) {
            if (this.contents.isADT()) {
                // attempt to render the '_morph' method for a custom view.
                // since in this situation we don't have a full Snap! process
                // this will fail in most cases (unless there is a JS extension)
                // as a fallback render the ADT in table form
                try {
                    this.contentsMorph = invoke(
                        this.contents.lookup('_morph'),
                        new List([this.contents]),
                        this.contents, // support "this(object)"
                        500
                    );
                } catch {
                    setupList();
                }
            } else {
                setupList();
            }
            if (this.contentsMorph instanceof TableFrameMorph) {
                this.contentsMorph.expand(new Point(200, 150));
            }
            this.contentsMorph.isDraggable = false;
            if (!draggable) {
                this.contentsMorph.forAllChildren(morph =>
                    morph.isDraggable = false);
            }
        } else if (this.contents instanceof Color) {
            this.contentsMorph = SpriteMorph.prototype.colorSwatch(
                this.contents,
                fontSize * 1.4
            );
        } else {
            this.contentsMorph = new TextMorph(
                display(this.contents),
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
    if (!isSnapObject(this.contents) &&
        !(this.contents instanceof Costume) &&
        !(this.contents instanceof Context)
    ) {
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
        } else if (this.target instanceof List) { // OOP 2.0
            newValue = this.target.lookup(this.getter);
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
                newValue = Math.round(newValue * 1000000) / 1000000;
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
    // prevent watchers to be dragged in presentation and tutorial mode
    var ide = this.parentThatIsA(IDE_Morph),
        stage;
    if (ide && ide.isAppMode) {
        return ide;
    } else if (!ide) {
        return null;
    }
    stage = this.parentThatIsA(StageMorph);
    if (stage?.tutorialMode) {
        return stage;
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

    async function writeClipboardText(text, ide) {
        try {
            await navigator.clipboard.writeText(text);
            ide.showMessage('copied to clipboard', 1, true);
        } catch (error) {
            ide.showMessage(error.message, 2, true);
        }
    }

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
                    () => ide.saveFileAs(
                        this.currentValue.asCSV(),
                        'text/csv;charset=utf-8', // RFC 4180
                        this.getter // variable name
                    ),
                    null,
                    new Color(100, 0, 0)
                );
            }
            if (this.currentValue instanceof List &&
                    this.currentValue.canBeJSON()) {
                menu.addItem(
                    'export as JSON...',
                    () => ide.saveFileAs(
                        this.currentValue.asJSON(true), // guess objects
                        'text/json;charset=utf-8',
                        this.getter // variable name
                    ),
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
                () => ide.saveFileAs(
                    this.currentValue.toString(),
                    'text/plain;charset=utf-8',
                    this.getter // variable name
                )
            );
            menu.addItem(
                'copy',
                () => writeClipboardText(this.currentValue.toString(), ide)
            );
        } else if (this.currentValue instanceof Costume) {
            menu.addItem(
                'export...',
                 () => {
                    if (this.currentValue instanceof SVG_Costume) {
                        // don't show SVG costumes in a new tab (shows text)
                        ide.saveFileAs(
                            this.currentValue.contents.src,
                            'text/svg',
                            this.currentValue.name
                        );
                    } else { // rasterized Costume
                        ide.saveCanvasAs(
                            this.currentValue.contents,
                            this.currentValue.name
                        );
                    }
                }
            );
        } else if (this.currentValue instanceof Sound) {
            menu.addItem(
                'export...',
                () => ide.saveAudioAs(
                    this.currentValue.audio,
                    this.currentValue.name
                )
            );
        } else if (this.currentValue instanceof List &&
                this.currentValue.canBeCSV()) {
            menu.addItem(
                'export...',
                () => ide.saveFileAs(
                    this.currentValue.asCSV(),
                    'text/csv;charset=utf-8', // RFC 4180
                    this.getter // variable name
                )
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
                () => ide.saveFileAs(
                    this.currentValue.asJSON(true), // guessObjects
                    'text/json;charset=utf-8',
                    this.getter // variable name
                )
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
                    'Snap! can only import "text" files. ' +
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
    this.answer = null;
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
    this.answer = this.inputField.getValue();
    this.isDone = true;
};

// StagePickerMorph ////////////////////////////////////////////////////////

/*
    I am a sensor-category-colored input box which lets the user pick one
    from a list of options.
*/

// StagePickerMorph inherits from MenuMorph:

StagePickerMorph.prototype = new MenuMorph();
StagePickerMorph.prototype.constructor = StagePickerMorph;
StagePickerMorph.uber = MenuMorph.prototype;

// StagePickerMorph instance creation:

function StagePickerMorph(options) {
    this.init(options);
}

StagePickerMorph.prototype.init = function (options) {
    var first = options.at(1),
        isSubmenu = this.isSubmenu(options),
        title = isSubmenu ? first : null,
        items = isSubmenu ? options.at(2) : options;

    // additional properties
    this.answer = null;
    this.isDone = false;
    this.scale = 1;

    // initialize inherited properties
    StagePickerMorph.uber.init.call(
        this,
        choice => {
            var root = this.rootMenu();
            root.answer = choice;
            root.isDone = true;
        },
        title, // title
        this, // environment
        null // font size
    );

    // override inherited behavior

    // create items
    items.map(each => {
        var key, value, isLine;
        if (this.isSubmenu(each)) {
            this.addMenu(
                each.at(1), // label
                new StagePickerMorph(each.at(2)), // aMenu
                null, // indicator
                true // verbatim, don't translate
            );
        } else {
            key = each;
            value = each;
            if (each instanceof List) { // treat as pair
                isLine = each.isEmpty();
                if (this.isLeftQuote(each)) {
                    value = each.at(1);
                    key = new SpriteBubbleMorph(value);
                } else if (this.isRightQuote(each)) {
                    value = each.at(2);
                    key = new SpriteBubbleMorph(value);
                    key.isPointingRight = false;
                } else {
                    key = each.at(1);
                    if (key instanceof List) {
                        if (this.isLeftQuote(key)) {
                            key = new SpriteBubbleMorph(key.at(1));
                        } else if (this.isRightQuote(key)) {
                            key = new SpriteBubbleMorph(key.at(2));
                            key.isPointingRight = false;
                        } else if (this.isShortcut(key)) {
                            this.addPair(
                                key.at(1).toString(),
                                each.at(2),
                                key.at(2).toString()
                            );
                            return;
                        } else {
                            key = key.itemsArray();
                        }
                    }
                    value = each.at(2);
                }
            }
            if (isLine) {
                this.addLine();
            } else {
                this.addItem(
                    key,
                    value,
                    null, // hint
                    null, // color
                    null, // bold
                    null, // italic
                    null, // doubleClickAction
                    null, // shortcut
                    true // verbatim? don't translate
                );
            }
        }
    });

};

StagePickerMorph.prototype.isSubmenu = function (options) {
    var first;
    if (!(options instanceof List)) {
        return false;
    }
    first = options.at(1);
    return (isString(first) || !isNaN(+first)) &&
        first.toString().length &&
        options.length() === 2 &&
        options.rank() > 1;
};

StagePickerMorph.prototype.isLeftQuote = function (options) {
    return options instanceof List && !options.isEmpty() && !options.at(2);
};

StagePickerMorph.prototype.isRightQuote = function (options) {
    return options instanceof List &&
        !options.isEmpty() &&
        !options.at(1) &&
        (options.at(1) !== false);
};

StagePickerMorph.prototype.isShortcut = function (key) {
    var types = ['text', 'number'];
    return key instanceof List &&
        (key.length() === 2) &&
        key.at(1) &&
        key.at(2) &&
        contains(types, Process.prototype.reportTypeOf(key.at(1))) &&
        contains(types, Process.prototype.reportTypeOf(key.at(2)));
};

StagePickerMorph.prototype.dataRepresentation = function (data) {
    var sym, img;
    if (data instanceof SpeechBubbleMorph) {
        data.bubbleFontSize = 12;
        data.bubbleFontIsBold = false;
        data.bubbleCorner = 5;
        data.bubbleBorder = 0; // 1.5;
        data.bubblePadding = 0;
        data.scale = this.scale;
        data.bubbleFontColor = data.isPointingRight ? BLACK : WHITE;
        data.color = data.isPointingRight ? new Color(220, 220, 220)
            : SpriteMorph.prototype.blockColor.sensing;
        data.fixLayout();
        data.rerender();
        sym = data.fullImage();
        if (data.isPointingRight) {
            return sym;
        }
        img = newCanvas(new Point(
            (SpriteMorph.prototype.bubbleMaxTextWidth + 10) * this.scale,
            sym.height
        ));
        img.getContext('2d').drawImage(sym, img.width - sym.width, 0);
        return img;
    }
    switch (Process.prototype.reportTypeOf(data)) {
    case 'costume':
    case 'sprite':
    case 'stage':
        return data.thumbnail(new Point(40, 40).multiplyBy(this.scale));
    case 'command':
    case 'reporter':
    case 'predicate':
        return data.image();
    case 'Boolean':
        sym = new BooleanSlotMorph(data);
        sym.fontSize *= this.scale;
        sym.edge *= this.scale;
        sym.fixLayout();
        return sym.fullImage();
    case 'sound':
        return (new SymbolMorph('notes', 30 * this.scale)).fullImage();
    case 'color':
        return SpriteMorph.prototype.colorSwatch(data, 20 * this.scale);
    default:
        return data.toString();
    }
};

StagePickerMorph.prototype.addItem = function (
    labelString,
    action,
    hint,
    color,
    bold, // bool
    italic, // bool
    doubleClickAction, // optional, when used as list contents
    shortcut, // optional string, icon (Morph or Canvas) or tuple [icon, string]
    verbatim // optional bool, don't translate if true
) {
    /*
    labelString is normally a single-line string. But it can also be one
    of the following:

        * a multi-line string (containing line breaks)
        * an icon (either a Morph or a Canvas)
        * a tuple of format: [icon, string]
    */
    this.items.push([
        verbatim ? labelString : localize(labelString),
        action === 0 ? 0 : action || nop,
        hint,
        color,
        bold || false,
        italic || false,
        doubleClickAction,
        shortcut,
        verbatim]);
};

// StagePickerMorph popping up

StagePickerMorph.prototype.popup = function (stage, pos) {
	var scroller;

    this.setPosition(pos);
    this.keepWithin(stage);

    if (this.bottom() > stage.bottom()) {
    	// scroll menu items if the menu is taller than the stage
        scroller = this.scroll();
        this.bounds.corner.y = stage.bottom() - 2;
        scroller.setHeight(stage.bottom() - scroller.top() - this.edge - 2);
        scroller.adjustScrollBars();
     }

    if (this.items.length < 1 && !this.title) { // don't show empty menus
        return;
    }
    stage.add(this);
    this.fullChanged();
};

StagePickerMorph.prototype.createLabel = function () {
    var text;
    if (this.label !== null) {
        this.label.destroy();
    }
    text = new TextMorph(
        this.title.toString(),
        SpriteMorph.prototype.bubbleFontSize * this.scale,
        null, // MorphicPreferences.menuFontName,
        true,
        false,
        'center'
    );
    text.alignment = 'center';
    text.color = WHITE;
    text.backgroundColor = this.borderColor;
    text.fixLayout();

    // reflow text boundaries
    text.setWidth(Math.min(
        text.width(),
        SpriteMorph.prototype.bubbleMaxTextWidth * this.scale * 2
    ));

    this.label = new BoxMorph(this.edge, 0);
    this.label.color = this.borderColor;
    this.label.borderColor = this.borderColor;

    this.label.outlinePath = function (ctx, corner, inset) {
        // modify to only draw the top corners rounded
        var w = this.width(),
            h = this.height(),
            radius = Math.min(corner, (Math.min(w, h) - inset) / 2);
        ctx.roundRect(
            inset,
            inset,
            w - inset * 2,
            h - inset * 2,
            [radius, radius, 0, 0]
        );
    };

    this.label.setExtent(text.extent().add(this.edge));
    this.label.add(text);
    this.label.text = text;
};

StagePickerMorph.prototype.createItems = function (scale) {
    var item,
        x,
        y,
        isLine = false;

    this.scale = scale;
    this.children.forEach(m => m.destroy());
    this.children = [];
    this.edge = SyntaxElementMorph.prototype.rounding  * this.scale;
    this.border = SpriteMorph.prototype.bubbleBorder * this.scale;
    this.color = WHITE;
    this.borderColor = SpriteMorph.prototype.blockColor.sensing;
    this.setExtent(new Point(0, 0));

    y = this.border;
    x = this.left() + this.border;
    if (this.title) {
        this.createLabel();
        this.label.setPosition(this.bounds.origin);
        this.add(this.label);
        y = this.label.bottom();
    } else {
        y = this.top() + this.edge;
    }
    y += 1;
    this.items.forEach(tuple => {
        isLine = false;
        if (tuple[0] === 0 && tuple[1]) {
            isLine = true;
            item = new Morph();
            item.color = this.borderColor;
            item.setHeight(tuple[1] * this.scale);
        } else {
            item = new StagePickerItemMorph(
                this.target,
                tuple[1],
                tuple[0] instanceof Array ?
                    [this.dataRepresentation(tuple[0][0]), tuple[0][1]]
                        : this.dataRepresentation(tuple[0]),
                SpriteMorph.prototype.bubbleFontSize  * this.scale,
                null, // MorphicPreferences.menuFontName,
                this.environment,
                tuple[2], // bubble help hint
                tuple[3], // color
                tuple[4], // bold
                tuple[5], // italic
                tuple[6], // doubleclick action
                tuple[7], // shortcut
                this.scale
            );
        }
        if (isLine) {
            y += 1;
        }
        item.setPosition(new Point(x, y));
        this.add(item);
        y = y + item.height();
        if (isLine) {
            y += 1;
        }
    });

    this.adjustWidths();
    this.setExtent(
        this.fullBounds().extent().add(new Point(this.border, this.edge))
    );
    if (this.label) {
        this.label.setWidth(this.width());
        this.label.text.setPosition(
            this.label.center().subtract(
                this.label.text.extent().floorDivideBy(2)
            )
        );
    }
};

StagePickerMorph.prototype.maxWidth = function () {
    var w = 0;

    if (this.parent instanceof FrameMorph) {
        if (this.parent.scrollFrame instanceof ScrollFrameMorph) {
            w = this.parent.scrollFrame.width();
        }
    }
    this.children.forEach(item => {
        if (item instanceof MenuItemMorph) {
            w = Math.max(
                w,
                item.label.width() + this.edge +
                    (item.shortcut ? item.shortcut.width() + this.border : 0)
            );
        }
    });
    if (this.label) {
        w = Math.max(w, this.label.width() - this.border);
    }
    return w;
};

StagePickerMorph.prototype.adjustWidths = function () {
    var w = this.maxWidth();
    this.children.forEach(item => {
        item.setWidth(w);
        item.fixLayout();
    });
};

// StagePickerMorph removing

StagePickerMorph.prototype.destroy = function () {
    MenuMorph.uber.destroy.call(this);
};

// StagePickerMorph submenus

StagePickerMorph.prototype.closeSubmenu = function () {
    if (this.submenu) {
        this.submenu.destroy();
        this.submenu = null;
        this.unselectAllItems();
    }
};

StagePickerMorph.prototype.rootMenu = function () {
    return (this.parent instanceof StagePickerMorph) ?
        this.parent.rootMenu()
        : this;
};

// StagePickerItemMorph ////////////////////////////////////////////////////////

/*
    I am an option that can be clicked inside a StagePickerMorph.
*/

// StagePickerItemMorph inherits from MenuItemMorph:

StagePickerItemMorph.prototype = new MenuItemMorph();
StagePickerItemMorph.prototype.constructor = StagePickerItemMorph;
StagePickerItemMorph.uber = MenuItemMorph.prototype;

// StagePickerItemMorph instance creation:

function StagePickerItemMorph(
    target,
    action,
    labelString, // can also be a Morph or a Canvas or a tuple: [icon, string]
    fontSize,
    fontStyle,
    environment,
    hint,
    color,
    bold,
    italic,
    doubleClickAction, // optional when used as list morph item
    shortcut, // optional string, Morph, Canvas or tuple: [icon, string]
    scale
) {
    this.shortcutString = shortcut || null;
    this.shortcut = null;
    this.scale = scale || 1;
    this.init(
        target,
        action,
        labelString,
        fontSize,
        fontStyle,
        environment,
        hint,
        color,
        bold,
        italic,
        doubleClickAction
    );

    this.highlightColor = SpriteMorph.prototype.blockColor.sensing.lighter(75);
    this.pressColor = SpriteMorph.prototype.blockColor.sensing.lighter(25);
    if (this.shortcut) {
        this.shortcut.setColor(SpriteMorph.prototype.blockColor.sensing);
    }
}

StagePickerItemMorph.prototype.createLabelString = function (string) {
    var lbl = new TextMorph(
        string,
        this.fontSize,
        this.fontStyle,
        this.labelBold,
        this.labelItalic
    );
    // reflow text boundaries
    lbl.setWidth(Math.min(
        lbl.width(),
        SpriteMorph.prototype.bubbleMaxTextWidth * this.scale * 2
    ));
    lbl.setColor(this.labelColor);
    return lbl;
};

// StagePickerItemMorph submenus:

StagePickerItemMorph.prototype.popUpSubmenu = function () {
    var menu = this.parentThatIsA(MenuMorph),
        stage = this.parentThatIsA(StageMorph),
        scroller;

    if (!(this.action instanceof MenuMorph)) {return; }
    this.action.createItems(menu.scale);
    this.action.setPosition(this.topRight().subtract(new Point(0, 5)));
    this.action.keepWithin(stage);
    if (this.action.items.length < 1 && !this.action.title) {return; }

    if (this.action.bottom() > stage.bottom()) {
        // scroll menu items if the menu is taller than the world
        scroller = this.action.scroll();
        this.action.bounds.corner.y = stage.bottom() - 2;
        scroller.setHeight(
            stage.bottom() - scroller.top() - this.action.edge - 2
        );
        scroller.adjustScrollBars();
     }
    
    menu.add(this.action);
    menu.submenu = this.action;
    this.action.fullChanged();
};
