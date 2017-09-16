// SpriteMorph /////////////////////////////////////////////////////////

// I am a scriptable object

import PenMorph from "../morphic/morph/PenMorph";

// SpriteMorph settings

SpriteMorph.prototype.attributes =
    [
        'x position',
        'y position',
        'direction',
        'size',
        'costumes',
        'costume #',
        'sounds',
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

SpriteMorph.prototype.bubbleColor = new Color(255, 255, 255);
SpriteMorph.prototype.bubbleFontSize = 14;
SpriteMorph.prototype.bubbleFontIsBold = true;
SpriteMorph.prototype.bubbleCorner = 10;
SpriteMorph.prototype.bubbleBorder = 3;
SpriteMorph.prototype.bubbleBorderColor = new Color(190, 190, 190);
SpriteMorph.prototype.bubbleMaxTextWidth = 130;

SpriteMorph.prototype.initBlocks = () => {
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
            spec: 'play note %note for %n beats',
            defaults: [60, 0.5]
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
        floodFill: {
            only: SpriteMorph,
            type: 'command',
            category: 'pen',
            spec: 'fill'
        },
        reportPenTrailsAsCostume: {
            type: 'reporter',
            category: 'pen',
            spec: 'pen trails'
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

    /* migrated to a newer block version:

        receiveClick: {
            type: 'hat',
            category: 'control',
            spec: 'when I am clicked'
        },
    */

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

    /* migrated to doStopThis:

        doStopOthers: {
            type: 'command',
            category: 'control',
            spec: 'stop %stopOthersChoices'
        },
    */

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

        // Message passing - very experimental

        doTellTo: {
            dev: true,
            type: 'command',
            category: 'control',
            spec: 'tell %spr to %cl'
        },
        reportAskFor: {
            dev: true,
            type: 'reporter',
            category: 'control',
            spec: 'ask %spr for %repRing'
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
            spec: 'create a clone of %cln'
        },
        newClone: {
            type: 'reporter',
            category: 'control',
            spec: 'a new clone of %cln'
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
            spec: 'url %s',
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
        reportGet: {
            type: 'reporter',
            category: 'sensing',
            spec: 'my %get',
            defaults: [['neighbors']]
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
        reportBoolean: {
            type: 'predicate',
            category: 'operators',
            spec: '%bool',
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
            defaults: [`${localize('hello')} `, localize('world')]
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
            defaults: [`${localize('hello')} ${localize('world')}`, " "]
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

        // inheritance - experimental
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
        doForEach: {
            dev: true,
            type: 'command',
            category: 'lists',
            spec: 'for %upvar in %l %cl',
            defaults: [localize('each item')]
        },

        // Tables - experimental

        doShowTable: {
            dev: true,
            type: 'command',
            category: 'lists',
            spec: 'show table %l'
        },

        // Code mapping - experimental
        doMapCodeOrHeader: { // experimental
            type: 'command',
            category: 'other',
            spec: 'map %cmdRing to %codeKind %code'
        },
        doMapValueCode: { // experimental
            type: 'command',
            category: 'other',
            spec: 'map %mapValue to code %code',
            defaults: [['String'], '<#1>']
        },
    /* obsolete - superseded by 'doMapValue'
        doMapStringCode: { // experimental
            type: 'command',
            category: 'other',
            spec: 'map String to code %code',
            defaults: ['<#1>']
        },
    */
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

SpriteMorph.prototype.initBlockMigrations = () => {
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

    // variables
    doSetVar: ['doChangeVar'],
    doChangeVar: ['doSetVar'],
    doShowVar: ['doHideVar'],
    doHideVar: ['doShowVar']
};

// SpriteMorph instance creation

export default class SpriteMorph extends PenMorph {
    constructor(globals) {
        this.init(globals);
    }

    init(globals) {
        this.name = localize('Sprite');
        this.instrument = null;
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
        this.version = Date.now(); // for observer optimization
        this.isTemporary = false; // indicate a temporary Scratch-style clone
        this.isCorpse = false; // indicate whether a sprite/clone has been deleted
        this.cloneOriginName = '';

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
        this.rotationOffset = new Point(); // not to be serialized (!)
        this.idx = 0; // not to be serialized (!) - used for de-serialization
        this.wasWarped = false; // not to be serialized, used for fast-tracking

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

        super.init.call(this);

        this.isDraggable = true;
        this.isDown = false;
        this.heading = 90;
        this.changed();
        this.drawNew();
        this.changed();
    }

    // SpriteMorph duplicating (fullCopy)

    fullCopy(forClone) {
        const c = super.fullCopy.call(this);
        const myself = this;
        let arr = [];
        let cb;
        let effect;

        c.instances = [];
        c.stopTalking();
        c.color = this.color.copy();
        c.blocksCache = {};
        c.paletteCache = {};
        arr = [];
        this.inheritedAttributes.forEach(att => {
            arr.push(att);
        });
        c.inheritedAttributes = arr;
        if (forClone) {
            c.exemplar = this;
            c.customBlocks = [];
            c.variables = new VariableFrame(null, c);
            c.variables.parentFrame = this.variables;
            c.inheritedVariableNames().forEach(name => {
                c.shadowVar(name, c.variables.getVar(name));
            });
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
                c.allBlockInstances(def).forEach(block => {
                    block.definition = cb;
                });
            });
            arr = [];
            this.costumes.asArray().forEach(costume => {
                const cst = forClone ? costume : costume.copy();
                arr.push(cst);
                if (costume === myself.costume) {
                    c.costume = cst;
                }
            });
            c.costumes = new List(arr);
            arr = [];
            this.sounds.asArray().forEach(sound => {
                const snd = forClone ? sound : sound.copy();
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
            const dp = part.fullCopy(forClone);
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
    }

    appearIn(ide) {
        // private - used in IDE_Morph.duplicateSprite()
        if (!this.isTemporary) {
            this.name = ide.newSpriteName(this.name);
            ide.corral.addSprite(this);
            ide.sprites.add(this);
        }
        ide.stage.add(this);
        this.parts.forEach(part => {
            part.appearIn(ide);
        });
    }

    // SpriteMorph versioning

    setName(string) {
        this.name = string || this.name;
        this.version = Date.now();
    }

    // SpriteMorph rendering

    drawNew() {
        const myself = this;
        let currentCenter;

        let // actual costume heading based on my rotation style
        facing;

        let isFlipped;
        let isLoadingCostume;
        let cst;

        let // (flipped copy of) actual costume based on my rotation style
        pic;

        let stageScale;
        let newX;
        let corners = [];
        let origin;
        let shift;
        let corner;
        let costumeExtent;
        let ctx;
        let handle;

        if (this.isWarped) {
            this.wantsRedraw = true;
            return;
        }
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
            corners = pic.bounds().corners().map(point => point.rotateBy(
                radians(facing - 90),
                myself.costume.center()
            ));
            origin = corners[0];
            corner = corners[0];
            corners.forEach(point => {
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
            this.image = newCanvas(costumeExtent, true);
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
            this.image = newCanvas(this.extent(), true);
            this.setCenter(currentCenter, true); // just me
            super.drawNew.call(this, facing);
            this.rotationOffset = this.extent().divideBy(2);
            this.image = this.applyGraphicsEffects(this.image);
            if (isLoadingCostume) { // retry until costume is done loading
                cst = this.costume;
                handle = setInterval(
                    () => {
                        myself.wearCostume(cst);
                        clearInterval(handle);
                    },
                    100
                );
                return myself.wearCostume(null);

            }
        }
        this.version = Date.now(); // for observer optimization
    }

    endWarp() {
        this.isWarped = false;
        if (this.wantsRedraw) {
            const x = this.xPosition();
            const y = this.yPosition();
            this.drawNew();
            this.silentGotoXY(x, y, true); // just me
            this.wantsRedraw = false;
        }
        this.parent.changed();
    }

    rotationCenter() {
        return this.position().add(this.rotationOffset);
    }

    colorFiltered(aColor) {
        // answer a new Morph containing my image filtered by aColor
        // ignore transparency (alpha)
        const morph = new Morph();

        const ext = this.extent();
        let ctx;
        let src;
        let clr;
        let i;
        let dta;

        src = normalizeCanvas(this.image, true).getContext('2d').getImageData(
            0,
            0,
            ext.x,
            ext.y
        );
        morph.image = newCanvas(ext, true);
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
    }

    // SpriteMorph block instantiation

    blockForSelector(selector, setDefaults) {
        let migration;
        let info;
        let block;
        let defaults;
        let inputs;
        let i;
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
                    }
                }
            }
        }
        return block;
    }

    variableBlock(varName) {
        const block = new ReporterBlockMorph(false);
        block.selector = 'reportGetVar';
        block.color = this.blockColor.variables;
        block.category = 'variables';
        block.setSpec(varName);
        block.isDraggable = true;
        return block;
    }

    // SpriteMorph block templates

    blockTemplates(category) {
        const blocks = [];
        const myself = this;
        let varNames;
        let button;
        const cat = category || 'motion';
        let txt;
        const inheritedVars = this.inheritedVariableNames();

        function block(selector, isGhosted) {
            if (StageMorph.prototype.hiddenPrimitives[selector]) {
                return null;
            }
            const newBlock = SpriteMorph.prototype.blockForSelector(selector, true);
            newBlock.isTemplate = true;
            if (isGhosted) {newBlock.ghost(); }
            return newBlock;
        }

        function variableBlock(varName) {
            const newBlock = SpriteMorph.prototype.variableBlock(varName);
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
            const info = SpriteMorph.prototype.blocks[selector];
            return new ToggleMorph(
                'checkbox',
                this,
                () => {
                    myself.toggleWatcher(
                        selector,
                        localize(info.spec),
                        myself.blockColor[info.category]
                    );
                },
                null,
                () => myself.showingWatcher(selector),
                null
            );
        }

        function variableWatcherToggle(varName) {
            return new ToggleMorph(
                'checkbox',
                this,
                () => {
                    myself.toggleVariableWatcher(varName);
                },
                null,
                () => myself.showingVariableWatcher(varName),
                null
            );
        }

        function helpMenu() {
            const menu = new MenuMorph(this);
            menu.addItem('help...', 'showHelp');
            return menu;
        }

        function addVar(pair) {
            let ide;
            if (pair) {
                if (myself.isVariableNameInUse(pair[0], pair[1])) {
                    myself.inform('that name is already in use');
                } else {
                    ide = myself.parentThatIsA(IDE_Morph);
                    myself.addVariable(pair[0], pair[1]);
                    if (!myself.showingVariableWatcher(pair[0])) {
                        myself.toggleVariableWatcher(pair[0], pair[1]);
                    }
                    ide.flushBlocksCache('variables'); // b/c of inheritance
                    ide.refreshPalette();
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
            blocks.push(block('changeEffect'));
            blocks.push(block('setEffect'));
            blocks.push(block('clearEffects'));
            blocks.push('-');
            blocks.push(block('changeScale'));
            blocks.push(block('setScale'));
            blocks.push(watcherToggle('getScale'));
            blocks.push(block('getScale', this.inheritsAttribute('size')));
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
            blocks.push(block('doPlayNote'));
            blocks.push(block('doSetInstrument'));
            blocks.push('-');
            blocks.push(block('doChangeTempo'));
            blocks.push(block('doSetTempo'));
            blocks.push(watcherToggle('getTempo'));
            blocks.push(block('getTempo'));

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
            blocks.push(block('floodFill'));
            blocks.push('-');
            blocks.push(block('reportPenTrailsAsCostume'));

        } else if (cat === 'control') {

            blocks.push(block('receiveGo'));
            blocks.push(block('receiveKey'));
            blocks.push(block('receiveInteraction'));
            blocks.push(block('receiveCondition'));
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
        /*
        // old STOP variants, migrated to a newer version, now redundant
            blocks.push(block('doStopBlock'));
            blocks.push(block('doStop'));
            blocks.push(block('doStopAll'));
        */
            blocks.push(block('doStopThis'));
        /*
            // migrated to doStopThis, now redundant
            blocks.push(block('doStopOthers'));
        */
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
            blocks.push(block('newClone'));
            blocks.push(block('removeClone'));
            blocks.push('-');
            blocks.push(block('doPauseAll'));
            blocks.push('-');
            blocks.push(block('doTellTo'));
            blocks.push(block('reportAskFor'));

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

            if (SpriteMorph.prototype.enableFirstClass) {
                blocks.push(block('reportGet'));
            }
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
                blocks.push(watcherToggle('reportThreadCount'));
                blocks.push(block('reportThreadCount'));
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

        } else if (cat === 'variables') {

            button = new PushButtonMorph(
                null,
                () => {
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
                    () => {
                        const menu = new MenuMorph(
                            myself.deleteVariable,
                            null,
                            myself
                        );
                        myself.deletableVariableNames().forEach(name => {
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
                varNames.forEach(name => {
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

        // inheritance:

            if (StageMorph.prototype.enableInheritance) {
                blocks.push('-');
                blocks.push(block('doDeleteAttr'));
            }

        ///////////////////////////////

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
                blocks.push('-');
                blocks.push(block('doForEach'));
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

            button = new PushButtonMorph(
                null,
                () => {
                    const ide = myself.parentThatIsA(IDE_Morph);
                    const stage = myself.parentThatIsA(StageMorph);
                    new BlockDialogMorph(
                        null,
                        definition => {
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
    }

    palette(category) {
        if (!this.paletteCache[category]) {
            this.paletteCache[category] = this.freshPalette(category);
        }
        return this.paletteCache[category];
    }

    freshPalette(category) {
        const palette = new ScrollFrameMorph(null, null, this.sliderColor);
        const unit = SyntaxElementMorph.prototype.fontSize;
        let x = 0;
        let y = 5;
        let ry = 0;
        let blocks;
        let hideNextSpace = false;
        const myself = this;
        const stage = this.parentThatIsA(StageMorph);
        const oldFlag = Morph.prototype.trackChanges;

        Morph.prototype.trackChanges = false;

        palette.owner = this;
        palette.padding = unit / 2;
        palette.color = this.paletteColor;
        palette.growth = new Point(0, MorphicPreferences.scrollBarSize);

        // menu:

        palette.userMenu = function () {
            const menu = new MenuMorph();
            const ide = this.parentThatIsA(IDE_Morph);

            const more = {
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
                const defs = SpriteMorph.prototype.blocks;
                const hiddens = StageMorph.prototype.hiddenPrimitives;
                return Object.keys(hiddens).some(any => !isNil(defs[any]) && (defs[any].category === category
                    || contains((more[category] || []), any)));
            }

            function canHidePrimitives() {
                return palette.contents.children.some(any => contains(
                    Object.keys(SpriteMorph.prototype.blocks),
                    any.selector
                ));
            }

            menu.addPair(
                'find blocks...',
                () => {myself.searchBlocks(); },
                '^F'
            );
            if (canHidePrimitives()) {
                menu.addItem(
                    'hide primitives',
                    () => {
                        const defs = SpriteMorph.prototype.blocks;
                        Object.keys(defs).forEach(sel => {
                            if (defs[sel].category === category) {
                                StageMorph.prototype.hiddenPrimitives[sel] = true;
                            }
                        });
                        (more[category] || []).forEach(sel => {
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
                    () => {
                        const hiddens = StageMorph.prototype.hiddenPrimitives;
                        const defs = SpriteMorph.prototype.blocks;
                        Object.keys(hiddens).forEach(sel => {
                            if (defs[sel] && (defs[sel].category === category)) {
                                delete StageMorph.prototype.hiddenPrimitives[sel];
                            }
                        });
                        (more[category] || []).forEach(sel => {
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
                    // if (block.fixLayout) {block.fixLayout(); }
                    x = 0;
                    y += block.height();
                }
            }
        });

        // global custom blocks:

        if (stage) {
            y += unit * 1.6;

            stage.globalBlocks.forEach(definition => {
                let block;
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
            let block;
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
                let block;
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

        Morph.prototype.trackChanges = oldFlag;
        return palette;
    }

    // SpriteMorph blocks searching

    blocksMatching(
        searchString,
        strictly,
        // optional, ['hat', 'command', 'reporter', 'predicate']
        types,
        // optional, list of reachable unique variable names
        varNames) {
        // answer an array of block templates whose spec contains
        // the given search string, ordered by descending relevance
        // types is an optional array containing block types the search
        // is limited to, e.g. "command", "hat", "reporter", "predicate".
        // Note that "predicate" is not subsumed by "reporter" and has
        // to be specified explicitly.
        // if no types are specified all blocks are searched
        const blocks = [];

        let blocksDict;
        const myself = this;
        const search = searchString.toLowerCase();
        const stage = this.parentThatIsA(StageMorph);
        let reporterized;

        if (!types || !types.length) {
            types = ['hat', 'command', 'reporter', 'predicate', 'ring'];
        }
        if (!varNames) {varNames = []; }

        function labelOf(aBlockSpec) {
            const words = (BlockMorph.prototype.parseSpec(aBlockSpec));

            const filtered = words.filter(
                each => each.indexOf('%') !== 0
            );

            return filtered.join(' ');
        }

        function fillDigits(anInt, totalDigits, fillChar) {
            let ans = String(anInt);
            while (ans.length < totalDigits) {ans = fillChar + ans; }
            return ans;
        }

        function relevance(aBlockLabel, aSearchString) {
            const lbl = ` ${aBlockLabel}`;
            const idx = lbl.indexOf(aSearchString);
            let atWord;
            if (idx === -1) {return -1; }
            atWord = (lbl.charAt(idx - 1) === ' ');
            if (strictly && !atWord) {return -1; }
            return (atWord ? '1' : '2') + fillDigits(idx, 4, '0');
        }

        function primitive(selector) {
            const newBlock = SpriteMorph.prototype.blockForSelector(selector, true);
            newBlock.isTemplate = true;
            return newBlock;
        }

        // variable getters
        varNames.forEach(vName => {
            const rel = relevance(labelOf(vName.toLowerCase()), search);
            if (rel !== -1) {
                blocks.push([myself.variableBlock(vName), `${rel}1`]);
            }
        });
        // custom blocks
        [this.customBlocks, stage.globalBlocks].forEach(blocksList => {
            blocksList.forEach(definition => {
                if (contains(types, definition.type)) {
                    const spec = localize(definition.blockSpec()).toLowerCase();
                    const rel = relevance(labelOf(spec), search);
                    if (rel !== -1) {
                        blocks.push([definition.templateInstance(), `${rel}2`]);
                    }
                }
            });
        });
        // primitives
        blocksDict = SpriteMorph.prototype.blocks;
        Object.keys(blocksDict).forEach(selector => {
            if (!StageMorph.prototype.hiddenPrimitives[selector] &&
                    contains(types, blocksDict[selector].type)) {
                const block = blocksDict[selector];
                const spec = localize(block.alias || block.spec).toLowerCase();
                const rel = relevance(labelOf(spec), search);
                if (
                    (rel !== -1) &&
                        (!block.dev) &&
                        (!block.only || (block.only === myself.constructor))
                ) {
                    blocks.push([primitive(selector), `${rel}3`]);
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
    }

    searchBlocks(searchString, types, varNames, scriptFocus) {
        const myself = this;
        const unit = SyntaxElementMorph.prototype.fontSize;
        const ide = this.parentThatIsA(IDE_Morph);
        let oldSearch = '';
        const searchBar = new InputFieldMorph(searchString || '');
        const searchPane = ide.createPalette('forSearch');
        let blocksList = [];
        let selection;
        let focus;

        function showSelection() {
            if (focus) {focus.destroy(); }
            if (!selection || !scriptFocus) {return; }
            focus = selection.outline(
                MorphicPreferences.isFlat ? new Color(150, 200, 255)
                        : new Color(255, 255, 255),
                2
            );
            searchPane.contents.add(focus);
            focus.scrollIntoView();
        }

        function show(blocks) {
            const oldFlag = Morph.prototype.trackChanges;
            const x = searchPane.contents.left() + 5;
            let y = (searchBar.bottom() + unit);
            blocksList = blocks;
            selection = null;
            if (blocks.length && scriptFocus) {
                selection = blocks[0];
            }
            Morph.prototype.trackChanges = false;
            searchPane.contents.children = [searchPane.contents.children[0]];
            blocks.forEach(block => {
                block.setPosition(new Point(x, y));
                searchPane.addContents(block);
                y += block.height();
                y += unit * 0.3;
            });
            Morph.prototype.trackChanges = oldFlag;
            showSelection();
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

        searchPane.accept = () => {
            let search;
            if (scriptFocus) {
                searchBar.cancel();
                if (selection) {
                    scriptFocus.insertBlock(selection);
                }
            } else {
                search = searchBar.getValue();
                if (search.length > 0) {
                    show(myself.blocksMatching(search));
                }
            }
        };

        searchPane.reactToKeystroke = evt => {
            let search;
            let idx;
            const code = evt ? evt.keyCode : 0;
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
                search = searchBar.getValue();
                if (search !== oldSearch) {
                    oldSearch = search;
                    show(myself.blocksMatching(
                        search,
                        search.length < 2,
                        types,
                        varNames
                    ));
                }
            }
        };

        searchBar.cancel = () => {
            ide.refreshPalette();
            ide.palette.adjustScrollBars();
        };

        ide.fixLayout('refreshPalette');
        searchBar.edit();
        if (searchString) {searchPane.reactToKeystroke(); }
    }

    // SpritMorph parsing simple arithmetic expressions to reporter blocks

    reporterize(expressionString) {
        // highly experimental Christmas Easter Egg 2016 :-)
        let ast;

        function parseInfix(expression, operator, already) {
            // very basic diadic infix parser for arithmetic expressions
            // with strict left-to-right operator precedence (as in Smalltalk)
            // which can be overriden by - nested - parentheses.
            // assumes well-formed expressions, no graceful error handling yet.

            const inputs = ['', ''];

            let idx = 0;
            let ch;

            function format(value) {
                return value instanceof Array || isNaN(+value) ? value : +value;
            }

            function nested() {
                let level = 1;
                let expr = '';
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
            let block;
            let selectors;
            let monads;
            let alias;
            let key;
            let sel;
            let i;
            let inps;
            let off = 1;
            const reverseDict = {};
            selectors = {
                '+': 'reportSum',
                '-': 'reportDifference',
                '*': 'reportProduct',
                '/': 'reportQuotient',
                '%': 'reportModulus',
                '=': 'reportEquals',
                '<': 'reportLessThan',
                '>': 'reportGreaterThan',
                '&': 'reportAnd',
                '|': 'reportOr',
                round: 'reportRound',
                not: 'reportNot'
            };
            monads = ['abs', 'ceiling', 'floor', 'sqrt', 'sin', 'cos', 'tan',
                'asin', 'acos', 'atan', 'ln', 'log', 'round', 'not'];
            alias = {
                ceil: 'ceiling',
                '!' : 'not'
            };
            monads.concat(['true', 'false']).forEach(word => {
                reverseDict[localize(word).toLowerCase()] = word;
            });
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
            } else { // diadic
                block = SpriteMorph.prototype.blockForSelector(selectors[key]);
                inps = block.inputs();
            }
            for (i = 1; i < ast.length; i += 1) {
                if (ast[i] instanceof Array) {
                    block.silentReplaceInput(inps[i - off], blockFromAST(ast[i]));
                } else if (isString(ast[i])) {
                    if (contains(
                        ['true', 'false'], reverseDict[ast[i]] || ast[i])
                    ) {
                        block.silentReplaceInput(
                            inps[i - off],
                            SpriteMorph.prototype.blockForSelector(
                                (reverseDict[ast[i]] || ast[i]) === 'true' ?
                                        'reportTrue' : 'reportFalse'
                            )
                        );
                    } else if (ast[i] !== '_') {
                        block.silentReplaceInput(
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
    }

    // SpriteMorph variable management

    addVariable(name, isGlobal) {
        const ide = this.parentThatIsA(IDE_Morph);
        if (isGlobal) {
            this.globalVariables().addVar(name);
            if (ide) {
                ide.flushBlocksCache('variables');
            }
        } else {
            this.variables.addVar(name);
            this.blocksCache.variables = null;
        }
    }

    deleteVariable(varName) {
        const ide = this.parentThatIsA(IDE_Morph);
        if (!contains(this.inheritedVariableNames(true), varName)) {
            // check only shadowed variables
            this.deleteVariableWatcher(varName);
        }
        this.variables.deleteVar(varName);
        if (ide) {
            ide.flushBlocksCache('variables'); // b/c the var could be global
            ide.refreshPalette();
        }
    }

    // SpriteMorph costume management

    addCostume(costume) {
        if (!costume.name) {
            costume.name = `costume${this.costumes.length() + 1}`;
        }
        this.shadowAttribute('costumes');
        this.costumes.add(costume);
    }

    wearCostume(costume, noShadow) {
        const x = this.xPosition ? this.xPosition() : null;
        const y = this.yPosition ? this.yPosition() : null;
        const idx = isNil(costume) ? null : this.costumes.asArray().indexOf(costume);
        const isWarped = this.isWarped;
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
    }

    getCostumeIdx() {
        if (this.inheritsAttribute('costume #')) {
            return this.exemplar.getCostumeIdx();
        }
        return this.costumes.asArray().indexOf(this.costume) + 1;
    }

    doWearNextCostume() {
        const arr = this.costumes.asArray();
        let idx;
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
    }

    doWearPreviousCostume() {
        const arr = this.costumes.asArray();
        let idx;
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
    }

    doSwitchToCostume(id, noShadow) {
        if (id instanceof Costume) { // allow first-class costumes
            this.wearCostume(id, noShadow);
            return;
        }

        let num;
        const arr = this.costumes.asArray();
        let costume;
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
    }

    reportCostumes() {
        return this.costumes;
    }

    // SpriteMorph sound management

    addSound(audio, name) {
        this.shadowAttribute('sounds');
        this.sounds.add(new Sound(audio, name));
    }

    playSound(name) {
        const stage = this.parentThatIsA(StageMorph);

        const sound = name instanceof Sound ? name : detect(
            this.sounds.asArray(),
            s => s.name === name
        );

        let active;
        if (sound) {
            active = sound.play();
            if (stage) {
                stage.activeSounds.push(active);
                stage.activeSounds = stage.activeSounds.filter(aud => !aud.ended && !aud.terminated);
            }
            return active;
        }
    }

    reportSounds() {
        return this.sounds;
    }

    // SpriteMorph user menu

    userMenu() {
        const ide = this.parentThatIsA(IDE_Morph);
        const menu = new MenuMorph(this);

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
                `${localize('detach from')} ${this.anchor.name}`,
                'detachFromAnchor'
            );
        }
        if (this.parts.length) {
            menu.addItem('detach all parts', 'detachAllParts');
        }
        menu.addItem("export...", 'exportSprite');
        return menu;
    }

    exportSprite() {
        if (this.isTemporary) {return; }
        const ide = this.parentThatIsA(IDE_Morph);
        if (ide) {
            ide.exportSprite(this);
        }
    }

    edit() {
        const ide = this.parentThatIsA(IDE_Morph);
        if (ide && !ide.isAppMode) {
            ide.selectSprite(this);
        }
    }

    showOnStage() {
        const stage = this.parentThatIsA(StageMorph);
        if (stage) {
            this.keepWithin(stage);
            stage.add(this);
        }
        this.show();
    }

    duplicate() {
        const ide = this.parentThatIsA(IDE_Morph);
        if (ide) {
            ide.duplicateSprite(this);
        }
    }

    instantiate() {
        const ide = this.parentThatIsA(IDE_Morph);
        if (ide) {
            ide.instantiateSprite(this);
        }
    }

    remove() {
        const ide = this.parentThatIsA(IDE_Morph);
        if (ide) {
            ide.removeSprite(this);
        }
    }

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

    createClone(immediately) {
        const stage = this.parentThatIsA(StageMorph);
        let clone;
        if (stage && stage.cloneCount <= 5000) {
            clone = this.fullCopy(true);
            clone.clonify(stage, immediately);
        }
        return clone;
    }

    newClone(immediately) {
        const clone = this.createClone(immediately);
        if (isNil(clone)) {
            throw new Error('exceeding maximum number of clones');
        }
        return clone;
    }

    clonify(stage, immediately) {
        let hats;
        const myself = this;
        this.parts.forEach(part => {
            part.clonify(stage);
        });
        stage.cloneCount += 1;
        this.cloneOriginName = this.isTemporary ?
                this.cloneOriginName : this.name;
        this.isTemporary = true;
        this.name = '';
        stage.add(this);
        hats = this.allHatBlocksFor('__clone__init__');
        hats.forEach(block => {
            stage.threads.startProcess(
                block,
                myself,
                stage.isThreadSafe,
                null, // export result
                null, // callback
                null, // is clicked
                immediately // without yielding
            );
        });
        this.endWarp();
    }

    initClone(hats) {
        // used when manually instantiating a sprite in the IDE
        const stage = this.parentThatIsA(StageMorph);

        const myself = this;
        if (stage) {
            hats.forEach(block => {
                stage.threads.startProcess(block, myself, stage.isThreadSafe);
            });
            this.endWarp();
        }
    }

    removeClone() {
        const exemplar = this.exemplar;
        if (this.isTemporary) {
            // this.stopTalking();
            this.parent.threads.stopAllForReceiver(this);
            this.corpsify();
            this.instances.forEach(child => {
                if (child.isTemporary) {
                    child.setExemplar(exemplar);
                }
            });
            this.destroy();
            this.parent.cloneCount -= 1;
        }
    }

    perpetuate() {
        // make a temporary sprite (clone) permanent
        const stage = this.parentThatIsA(StageMorph);

        const ide = this.parentThatIsA(IDE_Morph);

        if (!this.isTemporary || !stage || !ide) {
            return;
        }
        this.isTemporary = false;
        this.name = ide.newSpriteName(this.cloneOriginName);
        this.cloneOriginName = '';
        stage.cloneCount -= 1;
        ide.corral.addSprite(this);
        ide.sprites.add(this);
        this.parts.forEach(part => {
            part.perpetuate();
        });
    }

    perpetuateAndEdit() {
        const ide = this.parentThatIsA(IDE_Morph);
        if (ide) {
            this.perpetuate();
            ide.selectSprite(this);
        }
    }

    release() {
        // turn a permenent sprite that's an instance of another one
        // into a temporary one (clone), that will vanish either when
        // the "delete this clone" operation is executed or when the user
        // hits the red stop sign button in the IDE
        const stage = this.parentThatIsA(StageMorph);

        const ide = this.parentThatIsA(IDE_Morph);
        let idx;

        if (this.isTemporary || !this.exemplar || !stage || !ide) {
            return;
        }
        this.parts.forEach(part => {
            part.release();
        });
        this.isTemporary = true;
        this.name = '';
        this.cloneOriginName = this.exemplar.name;
        stage.cloneCount += 1;
        idx = ide.sprites.asArray().indexOf(this) + 1;
        stage.watchers().forEach(function (watcher) {
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
    }

    // SpriteMorph deleting

    corpsify() {
        this.isCorpse = true;
        this.version = Date.now();
    }

    // SpriteMorph primitives

    // SpriteMorph hiding and showing:

    /*
        override the inherited behavior to also hide/show all
        nested parts.
    */

    hide() {
        super.hide.call(this);
        this.parts.forEach(part => {part.hide(); });
    }

    show() {
        super.show.call(this);
        this.parts.forEach(part => {part.show(); });
    }

    // SpriteMorph pen color

    setColor(aColor) {
        const x = this.xPosition();
        const y = this.yPosition();
        if (!this.color.eq(aColor)) {
            this.color = aColor.copy();
            if (!this.costume) {
                this.drawNew();
                this.silentGotoXY(x, y);
            }
        }
    }

    getHue() {
        return this.color.hsv()[0] * 100;
    }

    setHue(num) {
        const hsv = this.color.hsv();
        const x = this.xPosition();
        const y = this.yPosition();

        hsv[0] = Math.max(Math.min(+num || 0, 100), 0) / 100;
        hsv[1] = 1; // we gotta fix this at some time
        this.color.set_hsv(...hsv);
        if (!this.costume) {
            this.drawNew();
            this.changed();
        }
        this.gotoXY(x, y);
    }

    changeHue(delta) {
        this.setHue(this.getHue() + (+delta || 0));
    }

    getBrightness() {
        return this.color.hsv()[2] * 100;
    }

    setBrightness(num) {
        const hsv = this.color.hsv();
        const x = this.xPosition();
        const y = this.yPosition();

        hsv[1] = 1; // we gotta fix this at some time
        hsv[2] = Math.max(Math.min(+num || 0, 100), 0) / 100;
        this.color.set_hsv(...hsv);
        if (!this.costume) {
            this.drawNew();
            this.changed();
        }
        this.gotoXY(x, y);
    }

    changeBrightness(delta) {
        this.setBrightness(this.getBrightness() + (+delta || 0));
    }

    // SpriteMorph layers

    comeToFront() {
        if (this.parent) {
            this.parent.add(this);
            this.changed();
        }
    }

    goBack(layers) {
        let layer;
        const newLayer = +layers;
        let targetLayer;

        if (!this.parent) {return null; }
        layer = this.parent.children.indexOf(this);
        this.parent.removeChild(this);
        targetLayer = Math.max(layer - newLayer, 0);
        this.parent.children.splice(targetLayer, null, this);
        this.parent.changed();
    }

    // SpriteMorph collision detection optimization

    overlappingImage(otherSprite) {
        // overrides method from Morph because Sprites aren't nested Morphs
        const oRect = this.bounds.intersect(otherSprite.bounds);

        const oImg = newCanvas(oRect.extent(), true);
        const ctx = oImg.getContext('2d');

        if (oRect.width() < 1 || oRect.height() < 1) {
            return newCanvas(new Point(1, 1), true);
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
    }

    // SpriteMorph stamping

    doStamp() {
        const stage = this.parent;
        const context = stage.penTrails().getContext('2d');
        const isWarped = this.isWarped;
        const originalAlpha = context.globalAlpha;

        if (isWarped) {
            this.endWarp();
        }
        context.save();
        context.scale(1 / stage.scale, 1 / stage.scale);
        context.globalAlpha = this.alpha;
        context.drawImage(
            this.image,
            (this.left() - stage.left()),
            (this.top() - stage.top())
        );
        context.globalAlpha = originalAlpha;
        context.restore();
        this.changed();
        if (isWarped) {
            this.startWarp();
        }
    }

    clear() {
        this.parent.clearPenTrails();
    }

    // SpriteMorph pen size

    setSize(size) {
        // pen size
        if (!isNaN(size)) {
            this.size = Math.min(Math.max(+size, 0.0001), 1000);
        }
    }

    changeSize(delta) {
        this.setSize(this.size + (+delta || 0));
    }

    // SpriteMorph scale

    getScale() {
        // answer my scale in percent
        if (this.inheritsAttribute('size')) {
            return this.exemplar.getScale();
        }
        return this.scale * 100;
    }

    setScale(percentage, noShadow) {
        // set my (absolute) scale in percent
        const x = this.xPosition();

        const y = this.yPosition();
        const isWarped = this.isWarped;
        let realScale;
        let growth;

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
        this.parts.forEach(part => {
            const xDist = part.xPosition() - x;
            const yDist = part.yPosition() - y;
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
    }

    changeScale(delta) {
        this.setScale(this.getScale() + (+delta || 0));
    }

    // Spritemorph graphic effects

    graphicsChanged() {
        const myself = this;
        return Object.keys(this.graphicsValues).some(
            any => myself.graphicsValues[any] < 0 ||
                    myself.graphicsValues[any] > 0
        );
    }

    applyGraphicsEffects(canvas) {
        // For every effect: apply transform of that effect(canvas, stored value)
        // Graphic effects from Scratch are heavily based on ScratchPlugin.c

        let ctx;

        let imagedata;

        function transform_fisheye(imagedata, value) {
            let pixels;
            let newImageData;
            let newPixels;
            let centerX;
            let centerY;
            let w;
            let h;
            let x;
            let y;
            let dx;
            let dy;
            let r;
            let angle;
            let srcX;
            let srcY;
            let i;
            let srcI;

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
                    r = Math.sqrt(dx * dx + dy * dy) ** value;
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
            let pixels;
            let newImageData;
            let newPixels;
            let w;
            let h;
            let centerX;
            let centerY;
            let x;
            let y;
            let radius;
            let scaleX;
            let scaleY;
            let whirlRadians;
            let radiusSquared;
            let dx;
            let dy;
            let d;
            let factor;
            let angle;
            let srcX;
            let srcY;
            let i;
            let srcI;
            let sina;
            let cosa;

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
            let pixels;
            let newImageData;
            let newPixels;
            let w;
            let h;
            let x;
            let y;
            let srcX;
            let srcY;
            let i;
            let srcI;

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
            let pixels;
            let i;
            let l;
            let newImageData;
            let newPixels;
            let srcI;
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
            let pixels;
            let i;
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
            let pixels;
            let index;
            let l;
            let r;
            let g;
            let b;
            let max;
            let min;
            let span;
            let h;
            let s;
            let v;
            let i;
            let f;
            let p;
            let q;
            let t;
            let newR;
            let newG;
            let newB;
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

                h = (h + hueShift * 360 / 200) % 360;
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
            let pixels;
            let i;
            let l;
            let rcom;
            let gcom;
            let bcom;
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
            let pixels;
            let i;
            let l;
            pixels = imagedata.data;
            for (i = 0, l = pixels.length; i < l; i += 4) {
                pixels[i] += Math.sin(i * value) * 127 + 128;
                pixels[i + 1] += Math.sin(i * value) * 127 + 128;
                pixels[i + 2] += Math.sin(i * value) * 127 + 128;
            }
            return imagedata;
        }

        function transform_confetti (imagedata, value) {
            let pixels;
            let i;
            let l;
            pixels = imagedata.data;
            for (i = 0, l = pixels.length; i < l; i += 1) {
                pixels[i] = Math.sin(value * pixels[i]) * 127 + pixels[i];
            }
            return imagedata;
        }

        if (this.graphicsChanged()) {
            ctx = canvas.getContext("2d");
            imagedata = ctx.getImageData(0, 0, canvas.width, canvas.height);

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
    }

    setEffect(effect, value) {
        const eff = effect instanceof Array ? effect[0] : null;
        if (eff === 'ghost') {
            this.alpha = 1 - Math.min(Math.max(+value || 0, 0), 100) / 100;
        } else {
            this.graphicsValues[eff] = +value;
        }
        this.drawNew();
        this.changed();
    }

    getGhostEffect() {
        return (1 - this.alpha) * 100;
    }

    changeEffect(effect, value) {
        const eff = effect instanceof Array ? effect[0] : null;
        if (eff === 'ghost') {
            this.setEffect(effect, this.getGhostEffect() + (+value || 0));
        } else {
            this.setEffect(effect, +this.graphicsValues[eff] + (+value));
        }
    }

    clearEffects() {
        let effect;
        for (effect in this.graphicsValues) {
            if (this.graphicsValues.hasOwnProperty(effect)) {
                this.setEffect([effect], 0);
            }
        }
        this.setEffect(['ghost'], 0);
    }

    // SpriteMorph talk bubble

    stopTalking() {
        const bubble = this.talkBubble();
        if (bubble) {bubble.destroy(); }
    }

    doThink(data) {
        this.bubble(data, true);
    }

    bubble(data, isThought, isQuestion) {
        let bubble;
        const stage = this.parentThatIsA(StageMorph);

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
    }

    talkBubble() {
        return detect(
            this.children,
            morph => morph instanceof SpeechBubbleMorph
        );
    }

    positionTalkBubble() {
        const stage = this.parentThatIsA(StageMorph);
        const stageScale = stage ? stage.scale : 1;
        const bubble = this.talkBubble();
        const middle = this.center().y;
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
    }

    // dragging and dropping adjustments b/c of talk bubbles and parts

    prepareToBeGrabbed(hand) {
        this.removeShadow();
        this.recordLayers();
        this.shadowAttribute('x position');
        this.shadowAttribute('y position');
        if (!this.bounds.containsPoint(hand.position()) &&
                this.isCorrectingOutsideDrag()) {
            this.setCenter(hand.position());
        }
        this.addShadow();
    }

    isCorrectingOutsideDrag() {
        // make sure I don't "trail behind" the hand when dragged
        // override for morphs that you want to be dragged outside
        // their full bounds
        return !this.parts.length;
    }

    justDropped() {
        const stage = this.parentThatIsA(StageMorph);
        const myself = this;
        if (stage) {
            stage.enableCustomHatBlocks = true;
        }
        if (this.exemplar) {
            this.inheritedAttributes.forEach(att => {
                if (contains(['direction', 'size', 'costume #'], att)) {
                    // only refresh certain propagated attributes
                    myself.refreshInheritedAttribute(att);
                }
            });
        }
        this.restoreLayers();
        this.positionTalkBubble();
        this.receiveUserInteraction('dropped');
    }

    // SpriteMorph drawing:

    drawLine(start, dest) {
        const stagePos = this.parent.bounds.origin;
        const stageScale = this.parent.scale;
        const context = this.parent.penTrails().getContext('2d');
        const from = start.subtract(stagePos).divideBy(stageScale);
        const to = dest.subtract(stagePos).divideBy(stageScale);
        const damagedFrom = from.multiplyBy(stageScale).add(stagePos);
        const damagedTo = to.multiplyBy(stageScale).add(stagePos);

        const damaged = damagedFrom.rectangle(damagedTo).expandBy(
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
    }

    floodFill() {
        if (!this.parent.bounds.containsPoint(this.rotationCenter())) {
            return;
        }
        if (this.color.a > 1) {
            // fix a legacy bug in Morphic color detection
            this.color.a = this.color.a / 255;
        }
        const layer = normalizeCanvas(this.parent.penTrails());
        const width = layer.width;
        const height = layer.height;
        const ctx = layer.getContext('2d');
        const img = ctx.getImageData(0, 0, width, height);
        const dta = img.data;

        const stack = [
            ((height / 2) - Math.round(this.yPosition())) * width +
            Math.round(this.xPosition() + (width / 2))
        ];

        let current;
        let src;

        function read(p) {
            const d = p * 4;
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
    }

    // SpriteMorph pen trails as costume

    reportPenTrailsAsCostume() {
        const cst = new Costume(
            this.parentThatIsA(StageMorph).trailsCanvas,
            this.newCostumeName(localize('Costume'))
        );
        cst.shrinkWrap();
        return cst;
    }

    // SpriteMorph motion - adjustments due to nesting

    moveBy(delta, justMe?) {
        // override the inherited default to make sure my parts follow
        // unless it's justMe (a correction)
        const start = this.isDown && !justMe && this.parent ?
                this.rotationCenter() : null;
        super.moveBy.call(this, delta);
        if (start) {
            this.drawLine(start, this.rotationCenter());
        }
        if (!justMe) {
            this.parts.forEach(part => {
                part.moveBy(delta);
            });
            this.instances.forEach(instance => {
                if (instance.cachedPropagation) {
                    const inheritsX = instance.inheritsAttribute('x position');
                    const inheritsY = instance.inheritsAttribute('y position');
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
    }

    silentMoveBy(delta, justMe) {
        super.silentMoveBy.call(this, delta);
        if (!justMe && this.parent instanceof HandMorph) {
            this.parts.forEach(part => {
                part.moveBy(delta);
            });
            this.instances.forEach(instance => {
                if (instance.cachedPropagation) {
                    const inheritsX = instance.inheritsAttribute('x position');
                    const inheritsY = instance.inheritsAttribute('y position');
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
    }

    rootForGrab() {
        if (this.anchor) {
            return this.anchor.rootForGrab();
        }
        return super.rootForGrab.call(this);
    }

    setCenter(aPoint, justMe) {
        // override the inherited default to make sure my parts follow
        // unless it's justMe
        const delta = aPoint.subtract(this.center());
        this.moveBy(delta, justMe);
    }

    nestingBounds() {
        // same as fullBounds(), except that it uses "parts" instead of children
        // and special cases the costume-less "arrow" shape's bounding box
        let result = this.bounds;
        if (!this.costume && this.penBounds) {
            result = this.penBounds.translateBy(this.position());
        }
        this.parts.forEach(part => {
            if (part.isVisible) {
                result = result.merge(part.nestingBounds());
            }
        });
        return result;
    }

    // SpriteMorph motion primitives

    setPosition(aPoint, justMe) {
        // override the inherited default to make sure my parts follow
        // unless it's justMe
        const delta = aPoint.subtract(this.topLeft());
        if ((delta.x !== 0) || (delta.y !== 0)) {
            this.moveBy(delta, justMe);
        }
    }

    forward(steps) {
        let dest;
        const dist = steps * this.parent.scale || 0;

        if (dist >= 0) {
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
    }

    setHeading(degrees, noShadow) {
        const x = this.xPosition();
        const y = this.yPosition();
        const dir = (+degrees || 0);
        const turn = dir - this.heading;

        // apply to myself
        if (this.rotationStyle) { // optimization, only redraw if rotatable
            this.changed();
            super.setHeading.call(this, dir);
            this.silentGotoXY(x, y, true); // just me
            this.positionTalkBubble();
        } else {
            this.heading = ((+degrees % 360) + 360) % 360;
        }

        // propagate to my parts
        this.parts.forEach(part => {
            const pos = new Point(part.xPosition(), part.yPosition());
            const trg = pos.rotateBy(radians(turn), new Point(x, y));
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
    }

    faceToXY(x, y) {
        const deltaX = (x - this.xPosition()) * this.parent.scale;
        const deltaY = (y - this.yPosition()) * this.parent.scale;

        const angle = Math.abs(deltaX) < 0.001 ? (deltaY < 0 ? 90 : 270)
                : Math.round(
                (deltaX >= 0 ? 0 : 180)
                    - (Math.atan(deltaY / deltaX) * 57.2957795131)
            );

        this.setHeading(angle + 90);
    }

    turn(degrees) {
        this.setHeading(this.heading + (+degrees || 0));
    }

    turnLeft(degrees) {
        this.setHeading(this.heading - (+degrees || 0));
    }

    xPosition() {
        if (this.inheritsAttribute('x position')) {
            return this.exemplar.xPosition();
        }

        let stage = this.parentThatIsA(StageMorph);

        if (!stage && this.parent.grabOrigin) { // I'm currently being dragged
            stage = this.parent.grabOrigin.origin;
        }
        if (stage) {
            return (this.rotationCenter().x - stage.center().x) / stage.scale;
        }
        return this.rotationCenter().x;
    }

    yPosition() {
        if (this.inheritsAttribute('y position')) {
            return this.exemplar.yPosition();
        }

        let stage = this.parentThatIsA(StageMorph);

        if (!stage && this.parent.grabOrigin) { // I'm currently being dragged
            stage = this.parent.grabOrigin.origin;
        }
        if (stage) {
            return (stage.center().y - this.rotationCenter().y) / stage.scale;
        }
        return this.rotationCenter().y;
    }

    direction() {
        if (this.inheritsAttribute('direction')) {
            return this.exemplar.direction();
        }
        return this.heading;
    }

    penSize() {
        return this.size;
    }

    gotoXY(x, y, justMe, noShadow) {
        const stage = this.parentThatIsA(StageMorph);
        let newX;
        let newY;
        let dest;

        if (!stage) {return; }
        if (!noShadow) {
            this.shadowAttribute('x position');
            this.shadowAttribute('y position');
        }
        newX = stage.center().x + (+x || 0) * stage.scale;
        newY = stage.center().y - (+y || 0) * stage.scale;
        if (this.costume) {
            dest = new Point(newX, newY).subtract(this.rotationOffset);
        } else {
            dest = new Point(newX, newY).subtract(this.extent().divideBy(2));
        }
        this.setPosition(dest, justMe);
        this.positionTalkBubble();
    }

    silentGotoXY(x, y, justMe) {
        // move without drawing
        // don't shadow coordinate attributes
        const penState = this.isDown;
        this.isDown = false;
        this.gotoXY(x, y, justMe, true); // don't shadow coordinates
        this.isDown = penState;
    }

    setXPosition(num) {
        this.shadowAttribute('x position');
        this.gotoXY(+num || 0, this.yPosition(), false, true);
    }

    changeXPosition(delta) {
        this.setXPosition(this.xPosition() + (+delta || 0));
    }

    setYPosition(num) {
        this.shadowAttribute('y position');
        this.gotoXY(this.xPosition(), +num || 0, false, true);
    }

    changeYPosition(delta) {
        this.setYPosition(this.yPosition() + (+delta || 0));
    }

    glide(duration, endX, endY, elapsed, startPoint) {
        let fraction;
        let endPoint;
        let rPos;
        endPoint = new Point(endX, endY);
        fraction = Math.max(Math.min(elapsed / duration, 1), 0);
        rPos = startPoint.add(
            endPoint.subtract(startPoint).multiplyBy(fraction)
        );
        this.gotoXY(rPos.x, rPos.y);
    }

    bounceOffEdge() {
        // taking nested parts into account
        const stage = this.parentThatIsA(StageMorph);

        const fb = this.nestingBounds();
        let dirX;
        let dirY;

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
    }

    // SpriteMorph rotation center / fixation point manipulation

    setRotationX(absoluteX) {
      this.setRotationCenter(new Point(absoluteX, this.yPosition()));
    }

    setRotationY(absoluteY) {
      this.setRotationCenter(new Point(this.xPosition(), absoluteY));
    }

    setRotationCenter(absoluteCoordinate) {
        let delta;
        let normal;
        if (!this.costume) {
            throw new Error('setting the rotation center requires a costume');
        }
        delta = absoluteCoordinate.subtract(
            new Point(this.xPosition(), this.yPosition())
        ).divideBy(this.scale).rotateBy(radians(90 - this.heading));
        normal = this.costume.rotationCenter.add(new Point(delta.x, -delta.y));
        this.costume.rotationCenter = normal;
        this.drawNew();
    }

    moveRotationCenter() {
        // make this a method of Snap >> SpriteMorph
        this.world().activeHandle = new HandleMorph(
            this,
            null,
            null,
            null,
            null,
            'movePivot'
        );
    }

    setPivot(worldCoordinate) {
        const stage = this.parentThatIsA(StageMorph);
        let cntr;
        if (stage) {
            cntr = stage.center();
            this.setRotationCenter(
                new Point(
                    (worldCoordinate.x - cntr.x) / stage.scale,
                    (cntr.y - worldCoordinate.y) / stage.scale
                )
            );
        }
    }

    xCenter() {
        let stage = this.parentThatIsA(StageMorph);

        if (!stage && this.parent.grabOrigin) { // I'm currently being dragged
            stage = this.parent.grabOrigin.origin;
        }
        if (stage) {
            return (this.center().x - stage.center().x) / stage.scale;
        }
        return this.center().x;
    }

    yCenter() {
        let stage = this.parentThatIsA(StageMorph);

        if (!stage && this.parent.grabOrigin) { // I'm currently being dragged
            stage = this.parent.grabOrigin.origin;
        }
        if (stage) {
            return (stage.center().y - this.center().y) / stage.scale;
        }
        return this.center().y;
    }

    // SpriteMorph message broadcasting

    allMessageNames() {
        const msgs = [];
        const all = this.scripts.children.slice();
        this.customBlocks.forEach(def => {
            if (def.body) {
                all.push(def.body.expression);
            }
            def.scripts.forEach(scr => {
                all.push(scr);
            });
        });
        if (this.globalBlocks) {
            this.globalBlocks.forEach(def => {
                if (def.body) {
                    all.push(def.body.expression);
                }
                def.scripts.forEach(scr => {
                    all.push(scr);
                });
            });
        }
        all.forEach(script => {
            script.allChildren().forEach(morph => {
                let txt;
                if (morph.selector && contains(
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
            });
        });
        return msgs;
    }

    allHatBlocksFor(message) {
        if (typeof message === 'number') {message = message.toString(); }
        return this.scripts.children.filter(morph => {
            let event;
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
    }

    allHatBlocksForKey(key) {
        return this.scripts.children.filter(morph => {
            if (morph.selector) {
                if (morph.selector === 'receiveKey') {
                    const evt = morph.inputs()[0].evaluate()[0];
                    return evt === key || evt === 'any key';
                }
            }
            return false;
        });
    }

    allHatBlocksForInteraction(interaction) {
        return this.scripts.children.filter(morph => {
            if (morph.selector) {
                if (morph.selector === 'receiveInteraction') {
                    return morph.inputs()[0].evaluate()[0] === interaction;
                }
            }
            return false;
        });
    }

    allGenericHatBlocks() {
        return this.scripts.children.filter(morph => {
            if (morph.selector) {
                return morph.selector === 'receiveCondition';
            }
            return false;
        });
    }

    // SpriteMorph events

    mouseClickLeft() {
        return this.receiveUserInteraction('clicked');
    }

    mouseEnter() {
        return this.receiveUserInteraction('mouse-entered');
    }

    mouseDownLeft() {
        return this.receiveUserInteraction('pressed');
    }

    receiveUserInteraction(interaction) {
        const stage = this.parentThatIsA(StageMorph);
        const procs = [];
        const myself = this;
        let hats;
        if (!stage) {return; } // currently dragged
        hats = this.allHatBlocksForInteraction(interaction);
        hats.forEach(block => {
            procs.push(stage.threads.startProcess(
                block,
                myself,
                stage.isThreadSafe
            ));
        });
        return procs;
    }

    mouseDoubleClick() {
        if (this.isTemporary) {return; }
        this.edit();
    }

    // SpriteMorph timer

    getTimer() {
        const stage = this.parentThatIsA(StageMorph);
        if (stage) {
            return stage.getTimer();
        }
        return 0;
    }

    // SpriteMorph tempo

    getTempo() {
        const stage = this.parentThatIsA(StageMorph);
        if (stage) {
            return stage.getTempo();
        }
        return 0;
    }

    // SpriteMorph last message

    getLastMessage() {
        const stage = this.parentThatIsA(StageMorph);
        if (stage) {
            return stage.getLastMessage();
        }
        return '';
    }

    // SpriteMorph user prompting

    getLastAnswer() {
        return this.parentThatIsA(StageMorph).lastAnswer;
    }

    // SpriteMorph mouse coordinates

    reportMouseX() {
        const stage = this.parentThatIsA(StageMorph);
        if (stage) {
            return stage.reportMouseX();
        }
        return 0;
    }

    reportMouseY() {
        const stage = this.parentThatIsA(StageMorph);
        if (stage) {
            return stage.reportMouseY();
        }
        return 0;
    }

    // SpriteMorph thread count (for debugging)

    reportThreadCount() {
        const stage = this.parentThatIsA(StageMorph);
        if (stage) {
            return stage.threads.processes.length;
        }
        return 0;
    }

    // SpriteMorph variable refactoring

    refactorVariableInstances(oldName, newName, isGlobal) {
        if (isGlobal && this.hasSpriteVariable(oldName)) {
            return;
        }

        this.scripts.children.forEach(child => {
            if (child instanceof BlockMorph) {
                child.refactorVarInStack(oldName, newName);
            }
        });

    }

    // SpriteMorph variable watchers (for palette checkbox toggling)

    findVariableWatcher(varName) {
        const stage = this.parentThatIsA(StageMorph);
        const globals = this.globalVariables();
        const myself = this;
        if (stage === null) {
            return null;
        }
        return detect(
            stage.children,
            morph => morph instanceof WatcherMorph
                    && (morph.target === myself.variables
                            || morph.target === globals)
                    && morph.getter === varName
        );
    }

    toggleVariableWatcher(varName, isGlobal) {
        const stage = this.parentThatIsA(StageMorph);
        const globals = this.globalVariables();
        let watcher;
        let others;
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
            isGlobal = contains(globals.names(), varName);
        }
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
        stage.add(watcher);
        watcher.fixLayout();
        watcher.keepWithin(stage);
        return watcher;
    }

    showingVariableWatcher(varName) {
        const stage = this.parentThatIsA(StageMorph);
        let watcher;
        if (stage === null) {
            return false;
        }
        watcher = this.findVariableWatcher(varName);
        if (watcher) {
            return watcher.isVisible;
        }
        return false;
    }

    deleteVariableWatcher(varName) {
        const stage = this.parentThatIsA(StageMorph);
        let watcher;
        if (stage === null) {
            return null;
        }
        watcher = this.findVariableWatcher(varName);
        if (watcher !== null) {
            watcher.destroy();
        }
    }

    // SpriteMorph non-variable watchers

    toggleWatcher(selector, label, color) {
        const stage = this.parentThatIsA(StageMorph);
        let watcher;
        let others;
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
    }

    showingWatcher(selector) {
        const stage = this.parentThatIsA(StageMorph);
        let watcher;
        if (stage === null) {
            return false;
        }
        watcher = this.watcherFor(stage, selector);
        if (watcher) {
            return watcher.isVisible;
        }
        return false;
    }

    watcherFor(stage, selector) {
        const myself = this;
        return detect(stage.children, morph => morph instanceof WatcherMorph &&
            morph.getter === selector &&
             morph.target === (morph.isGlobal(selector) ? stage : myself));
    }

    // SpriteMorph custom blocks

    deleteAllBlockInstances(definition) {
        let stage;

        const blocks = definition.isGlobal ? this.allBlockInstances(definition)
            : this.allIndependentInvocationsOf(definition.blockSpec());

        blocks.forEach(each => {
            each.deleteBlock();
        });

        // purge custom block definitions of "corpses"
        // i.e. blocks that have been marked for deletion
        if (definition.isGlobal) {
            stage = this.parentThatIsA(StageMorph);
            if (stage) {
                stage.globalBlocks.forEach(def => {
                    def.purgeCorpses();
                });
                stage.children.concat(stage).forEach(sprite => {
                    if (sprite.isSnapObject) {
                        sprite.customBlocks.forEach(def => {
                            def.purgeCorpses();
                        });
                    }
                });
            }
        } else {
            this.allSpecimens().concat(this).forEach(sprite => {
                sprite.customBlocks.forEach(def => {
                    def.purgeCorpses();
                });
            });
        }
    }

    allBlockInstances(definition) {
        let stage;
        let objects;
        let blocks = [];
        let inDefinitions;
        if (definition.isGlobal) {
            stage = this.parentThatIsA(StageMorph);
            objects = stage.children.filter(morph => morph instanceof SpriteMorph);
            objects.push(stage);
            objects.forEach(sprite => {
                blocks = blocks.concat(sprite.allLocalBlockInstances(definition));
            });
            inDefinitions = [];
            stage.globalBlocks.forEach(def => {
                def.scripts.forEach(eachScript => {
                    eachScript.allChildren().forEach(c => {
                        if (c.isCustomBlock && (c.definition === definition)) {
                            inDefinitions.push(c);
                        }
                    });
                });
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
    }

    allIndependentInvocationsOf(aSpec) {
        let blocks;
        if (this.exemplar && this.exemplar.getMethod(aSpec)) {
            // shadows an inherited method, don't delete
            return [];
        }
        blocks = this.allInvocationsOf(aSpec);
        this.instances.forEach(sprite => {
            sprite.addAllInvocationsOf(aSpec, blocks);
        });
        return blocks;
    }

    allDependentInvocationsOf(aSpec) {
        let blocks;
        blocks = this.allInvocationsOf(aSpec);
        this.instances.forEach(sprite => {
            sprite.addAllInvocationsOf(aSpec, blocks);
        });
        return blocks;
    }

    allInvocationsOf(aSpec) {
        // only inside the receiver, without the inheritance branches
        let inScripts;

        let inDefinitions;
        let inBlockEditors;
        let blocks;

        inScripts = this.scripts.allChildren().filter(c => c.isCustomBlock && !c.isGlobal && (c.blockSpec === aSpec));

        inDefinitions = [];
        this.customBlocks.forEach(def => {
            def.scripts.forEach(eachScript => {
                eachScript.allChildren().forEach(c => {
                    if (c.isCustomBlock && !c.isGlobal &&
                        (c.blockSpec === aSpec)
                    ) {
                        inDefinitions.push(c);
                    }
                });
            });
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
    }

    addAllInvocationsOf(aSpec, anArray) {
        if (!this.getLocalMethod(aSpec)) {
            this.allInvocationsOf(aSpec).forEach(block => {
                anArray.push(block);
            });
            this.instances.forEach(sprite => {
                sprite.addAllInvocationsOf(aSpec, anArray);
            });
        }
    }

    allLocalBlockInstances(definition) {
        let inScripts;
        let inDefinitions;
        let inBlockEditors;
        let inPalette;
        let result;

        inScripts = this.scripts.allChildren().filter(c => c.isCustomBlock && (c.definition === definition));

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
    }

    allEditorBlockInstances(definition, spec) {
        // either pass a definition for global custom blocks
        // or a spec for local ones
        const inBlockEditors = [];

        const world = this.world();

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
    }

    paletteBlockInstance(definition) {
        const ide = this.parentThatIsA(IDE_Morph);
        if (!ide) {return null; }
        return detect(
            ide.palette.contents.children,
            block => block.isCustomBlock &&
                (block.definition === definition)
        );
    }

    usesBlockInstance(
        definition,
        // optional bool
        forRemoval,
        // optional bool
        skipGlobals,
        // optional array with ignorable definitions
        skipBlocks) {
        let inDefinitions;

        const inScripts = detect(
            this.scripts.allChildren(),
            c => c.isCustomBlock && (c.definition === definition)
        );

        if (inScripts) {return true; }

        if (definition.isGlobal && !skipGlobals) {
            inDefinitions = [];
            this.parentThatIsA(StageMorph).globalBlocks.forEach(
                def => {
                    if (forRemoval && (definition === def)) {return; }
                    if (skipBlocks && contains(skipBlocks, def)) {return; }
                    if (def.body) {
                        def.body.expression.allChildren().forEach(c => {
                            if (c.isCustomBlock && (c.definition === definition)) {
                                inDefinitions.push(c);
                            }
                        });
                    }
                }
            );
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
    }

    doubleDefinitionsFor(definition) {
        const spec = definition.blockSpec();
        let blockList;
        let idx;
        let stage;

        if (definition.isGlobal) {
            stage = this.parentThatIsA(StageMorph);
            if (!stage) {return []; }
            blockList = stage.globalBlocks;
        } else {
            blockList = this.customBlocks;
        }
        idx = blockList.indexOf(definition);
        if (idx === -1) {return []; }
        return blockList.filter((def, i) => def.blockSpec() === spec && (i !== idx));
    }

    replaceDoubleDefinitionsFor(definition) {
        const doubles = this.doubleDefinitionsFor(definition);
        const myself = this;
        let stage;
        let ide;
        doubles.forEach(double => {
            myself.allBlockInstances(double).forEach(block => {
                block.definition = definition;
                block.refresh();
            });
        });
        if (definition.isGlobal) {
            stage = this.parentThatIsA(StageMorph);
            stage.globalBlocks = stage.globalBlocks.filter(def => !contains(doubles, def));
        } else {
            this.customBlocks = this.customBlocks.filter(def => !contains(doubles, def));
        }
        ide = this.parentThatIsA(IDE_Morph);
        if (ide) {
            ide.flushPaletteCache();
            ide.refreshPalette();
        }
    }

    // SpriteMorph inheritance - general

    chooseExemplar() {
        const stage = this.parentThatIsA(StageMorph);
        const myself = this;

        const other = stage.children.filter(m => m instanceof SpriteMorph &&
            !m.isTemporary &&
            (!contains(m.allExemplars(), myself)));

        let menu;
        menu = new MenuMorph(
            aSprite => {myself.setExemplar(aSprite); },
            `${localize('current parent')}:\n${this.exemplar ? this.exemplar.name : localize('none')}`
        );
        other.forEach(eachSprite => {
            menu.addItem(eachSprite.name, eachSprite);
        });
        menu.addLine();
        menu.addItem(localize('none'), null);
        menu.popUpAtHand(this.world());
    }

    setExemplar(another) {
        let ide;
        this.emancipate();
        this.exemplar = another;
        if (another) {
            this.variables.parentFrame = another.variables;
            another.addSpecimen(this);
        } else {
            this.variables.parentFrame = this.globalVariables();
        }
        if (!this.isTemporary) {
            ide = this.parentThatIsA(IDE_Morph);
            if (ide) {
                ide.flushBlocksCache('variables');
                ide.refreshPalette();
            }
        }
    }

    prune() {
        // sever ties with all my specimen, if any,
        this.instances.forEach(child => {
            child.shadowAllAttributes();
            child.shadowAllMethods();
            child.shadowAllVars();
            child.exemplar = null;
        });
        this.instances = [];
    }

    emancipate() {
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
    }

    allExemplars() {
        // including myself
        const all = [];

        let current = this;
        while (!isNil(current)) {
            all.push(current);
            current = current.exemplar;
        }
        return all;
    }

    specimens() {
        // without myself
        return this.instances;
    }

    allSpecimens() {
        // without myself
        const all = this.instances.slice();
        this.instances.forEach(child => {
            all.push(...child.allSpecimens());
        });
        return all;
    }

    addSpecimen(another) {
        // private - use setExemplar() to establish an inheritance relationship
        this.instances.push(another);
    }

    removeSpecimen(another) {
        // private - use setExemplar(null) to cancel an inheritance relationship
        const idx = this.instances.indexOf(another);
        if (idx !== -1) {
            this.instances.splice(idx, 1);
        }
    }

    // SpriteMorph inheritance - attributes

    inheritsAttribute(aName) {
        return !isNil(this.exemplar) && contains(this.inheritedAttributes, aName);
    }

    updatePropagationCache() {
        // private - indicate whether one of my inherited attributes is technically
        // propagated down from my exemplar, instead of truly shared.
        // (only) needed for internal optimization caching
        const myself = this;
        this.cachedPropagation = !isNil(this.exemplar) && detect(
            ['x position', 'y position', 'direction', 'size', 'costume #'],
            att => contains(myself.inheritedAttributes, att)
        );
    }

    shadowedAttributes() {
        // answer an array of attribute names that can be deleted/shared
        const inherited = this.inheritedAttributes;
        return this.attributes.filter(each => !contains(inherited, each));
    }

    shadowAllAttributes() {
        const myself = this;
        this.attributes.forEach(att => {
            myself.shadowAttribute(att);
        });
    }

    shadowAttribute(aName) {
        let ide;
        let wardrobe;
        let jukebox;
        const myself = this;
        let pos;
        if (!this.inheritsAttribute(aName)) {
            return;
        }
        ide = this.parentThatIsA(IDE_Morph);
        this.inheritedAttributes = this.inheritedAttributes.filter(
            each => each !== aName
        );
        if (aName === 'costumes') {
            wardrobe = new List();
            this.costumes.asArray().forEach(costume => {
                const cst = costume.copy();
                wardrobe.add(cst);
                if (costume === myself.costume) {
                    myself.wearCostume(cst);
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
            this.sounds.asArray().forEach(sound => {
                jukebox.add(sound.copy());
            });
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
    }

    inheritAttribute(aName) {
        const ide = this.parentThatIsA(IDE_Morph);
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
    }

    refreshInheritedAttribute(aName) {
        let ide;
        let idx;
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
            this.doSwitchToCostume(this.getCostumeIdx(), true);
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
    }

    toggleInheritanceForAttribute(aName) {
        if (this.inheritsAttribute(aName)) {
            this.shadowAttribute(aName);
        } else {
            this.inheritAttribute(aName);
        }
    }

    // SpriteMorph inheritance - variables

    isVariableNameInUse(vName, isGlobal) {
        if (isGlobal) {
            return contains(this.variables.allNames(), vName);
        }
        if (contains(this.variables.names(), vName)) {return true; }
        return contains(this.globalVariables().names(), vName);
    }

    globalVariables() {
        let current = this.variables.parentFrame;
        while (current.owner) {
            current = current.parentFrame;
        }
        return current;
    }

    shadowAllVars() {
        const myself = this;
        this.inheritedVariableNames().forEach(name => {
            myself.shadowVar(name, myself.variables.getVar(name));
        });
    }

    shadowVar(name, value) {
        let ide;
        this.variables.addVar(name, value);
        if (!this.isTemporary) {
            ide = this.parentThatIsA(IDE_Morph);
            if (ide) {
                ide.flushBlocksCache('variables');
                ide.refreshPalette();
            }
        }
    }

    toggleInheritedVariable(vName) {
        if (contains(this.inheritedVariableNames(true), vName)) { // is shadowed
            this.deleteVariable(vName);
        } else if (contains(this.inheritedVariableNames(), vName)) { // inherited
            this.shadowVar(vName, this.variables.getVar(vName));
        }
    }

    inheritedVariableNames(shadowedOnly) {
        const names = [];
        const own = this.variables.names();
        let current = this.variables.parentFrame;

        function test(each) {
            return shadowedOnly ? contains(own, each) : !contains(own, each);
        }

        while (current.owner instanceof SpriteMorph) {
            names.push(...current.names().filter(test));
            current = current.parentFrame;
        }
        return names;
    }

    deletableVariableNames() {
        const locals = this.variables.names();
        const inherited = this.inheritedVariableNames();
        return locals.concat(
            this.globalVariables().names().filter(
                each => !contains(locals, each) && !contains(inherited, each)
            )
        );
    }

    hasSpriteVariable(varName) {
        return contains(this.variables.names(), varName);
    }

    // SpriteMorph inheritance - custom blocks

    getMethod(spec) {
        return this.allBlocks()[spec];
    }

    getLocalMethod(spec) {
        return this.ownBlocks()[spec];
    }

    ownBlocks() {
        const dict = {};
        this.customBlocks.forEach(def => {
            dict[def.blockSpec()] = def;
        });
        return dict;
    }

    allBlocks(valuesOnly) {
        const dict = {};
        this.allExemplars().reverse().forEach(sprite => {
            sprite.customBlocks.forEach(def => {
                dict[def.blockSpec()] = def;
            });
        });
        if (valuesOnly) {
            return Object.keys(dict).map(key => dict[key]);
        }
        return dict;
    }

    inheritedBlocks(valuesOnly) {
        const dict = {};
        const own = Object.keys(this.ownBlocks());
        const others = this.allExemplars().reverse();
        others.pop();
        others.forEach(sprite => {
            sprite.customBlocks.forEach(def => {
                const spec = def.blockSpec();
                if (!contains(own, spec)) {
                    dict[spec] = def;
                }
            });
        });
        if (valuesOnly) {
            return Object.keys(dict).map(key => dict[key]);
        }
        return dict;
    }

    shadowAllMethods() {
        let ide;
        const myself = this;
        this.inheritedMethods().forEach(dup => {
            myself.customBlocks.push(dup);
        });
        if (!this.isTemporary) {
            ide = this.parentThatIsA(IDE_Morph);
            if (ide) {
                ide.flushPaletteCache();
                ide.refreshPalette();
            }
        }
    }

    inheritedMethods() {
        // private - pre-serialization preparation
        const myself = this;
        return this.inheritedBlocks(true).map(def => // header only
        def.copyAndBindTo(myself, true));
    }

    // SpriteMorph thumbnail

    thumbnail(extentPoint) {
        /*
            answer a new Canvas of extentPoint dimensions containing
            my thumbnail representation keeping the originial aspect ratio
        */
        const // at this time sprites aren't composite morphs
        src = this.image;

        const scale = Math.min(
            (extentPoint.x / src.width),
            (extentPoint.y / src.height)
        );

        const xOffset = (extentPoint.x - (src.width * scale)) / 2;
        const yOffset = (extentPoint.y - (src.height * scale)) / 2;
        const trg = newCanvas(extentPoint);
        const ctx = trg.getContext('2d');

        function xOut(style, alpha, width) {
            const inset = Math.min(extentPoint.x, extentPoint.y) / 10;
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
        if (this.isCorpse) {
            ctx.globalAlpha = 0.3;
        }
        if (src.width && src.height) {
            ctx.scale(scale, scale);
            ctx.drawImage(
                src,
                Math.floor(xOffset / scale),
                Math.floor(yOffset / scale)
            );
        }
        if (this.isCorpse) {
            ctx.restore();
            xOut('white', 0.8, 6);
            xOut('black', 0.8, 1);
        }
        return trg;
    }

    fullThumbnail(extentPoint) {
        // containing parts and anchor symbols, if any
        const thumb = this.thumbnail(extentPoint);

        const ctx = thumb.getContext('2d');
        const ext = extentPoint.divideBy(3);
        let i = 0;

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
    }

    // SpriteMorph Boolean visual representation

    booleanMorph(bool) {
        const sym = new BooleanSlotMorph(bool);
        sym.isStatic = true;
        sym.drawNew();
        return sym;
    }

    // SpriteMorph nesting
    /*
        simulate Morphic trees
    */

    attachPart(aSprite) {
        const v = Date.now();
        if (aSprite.anchor) {
            aSprite.anchor.detachPart(aSprite);
        }
        this.parts.push(aSprite);
        this.version = v;
        aSprite.anchor = this;
        this.allParts().forEach(part => {
            part.nestingScale = part.scale;
        });
        aSprite.version = v;
    }

    detachPart(aSprite) {
        const idx = this.parts.indexOf(aSprite);
        let v;
        if (idx !== -1) {
            v = Date.now();
            this.parts.splice(idx, 1);
            this.version = v;
            aSprite.anchor = null;
            aSprite.version = v;
        }
    }

    detachAllParts() {
        const v = Date.now();

        this.parts.forEach(part => {
            part.anchor = null;
            part.version = v;
        });
        this.parts = [];
        this.version = v;
    }

    detachFromAnchor() {
        if (this.anchor) {
            this.anchor.detachPart(this);
        }
    }

    allParts() {
        // includes myself
        let result = [this];
        this.parts.forEach(part => {
            result = result.concat(part.allParts());
        });
        return result;
    }

    allAnchors() {
        // includes myself
        let result = [this];
        if (this.anchor !== null) {
            result = result.concat(this.anchor.allAnchors());
        }
        return result;
    }

    recordLayers() {
        const stage = this.parentThatIsA(StageMorph);
        if (!stage) {
            this.layerCache = null;
            return;
        }
        this.layers = this.allParts();
        this.layers.forEach(part => {
            const bubble = part.talkBubble();
            if (bubble) {bubble.hide(); }
        });
        this.layers.sort((x, y) => stage.children.indexOf(x) < stage.children.indexOf(y) ?
                -1 : 1);
    }

    restoreLayers() {
        if (this.layers && this.layers.length > 1) {
            this.layers.forEach(sprite => {
                sprite.comeToFront();
                sprite.positionTalkBubble();
            });
        }
        this.layers = null;
    }

    // SpriteMorph destroying

    destroy() {
        // make sure to sever all inheritance ties to other sprites
        this.emancipate();
        if (!this.isTemporary) {
            this.prune();
        }
        super.destroy.call(this);
    }

    // SpriteMorph highlighting

    addHighlight(oldHighlight) {
        const isHidden = !this.isVisible;
        let highlight;

        if (isHidden) {this.show(); }
        highlight = this.highlight(
            oldHighlight ? oldHighlight.color : this.highlightColor,
            this.highlightBorder
        );
        this.addBack(highlight);
        this.fullChanged();
        if (isHidden) {this.hide(); }
        return highlight;
    }

    removeHighlight() {
        const highlight = this.getHighlight();
        if (highlight !== null) {
            this.fullChanged();
            this.removeChild(highlight);
        }
        return highlight;
    }

    toggleHighlight() {
        if (this.getHighlight()) {
            this.removeHighlight();
        } else {
            this.addHighlight();
        }
    }

    highlight(color, border) {
        const highlight = new SpriteHighlightMorph();

        const // sprites are not nested in a Morphic way
        fb = this.bounds;

        const edge = border;
        let ctx;

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
    }

    highlightImage(color, border) {
        let fb;
        let img;
        let hi;
        let ctx;
        let out;
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
    }

    getHighlight() {
        let highlights;
        highlights = this.children.slice(0).reverse().filter(
            child => child instanceof SpriteHighlightMorph
        );
        if (highlights.length !== 0) {
            return highlights[0];
        }
        return null;
    }

    // SpriteMorph nesting events

    mouseEnterDragging() {
        let obj;
        if (!this.enableNesting) {return; }
        obj = this.world().hand.children[0];
        if (this.wantsDropOf(obj)) {
            this.addHighlight();
        }
    }

    mouseLeave() {
        this.receiveUserInteraction('mouse-departed');
        if (!this.enableNesting) {return; }
        this.removeHighlight();
    }

    wantsDropOf(morph) {
        // allow myself to be the anchor of another sprite
        // by drag & drop
        return this.enableNesting
            && morph instanceof SpriteIconMorph
            && !contains(morph.object.allParts(), this);
    }

    reactToDropOf(morph, hand) {
        this.removeHighlight();
        this.attachPart(morph.object);
        this.world().add(morph);
        morph.slideBackTo(hand.grabOrigin);
    }

    // SpriteMorph screenshots

    newCostumeName(name, ignoredCostume) {
        const ix = name.indexOf('(');
        const stem = (ix < 0) ? name : name.substring(0, ix);
        let count = 1;
        let newName = stem;

        const all = this.costumes.asArray().filter(
            each => each !== ignoredCostume
        ).map(
            each => each.name
        );

        while (contains(all, newName)) {
            count += 1;
            newName = `${stem}(${count})`;
        }
        return newName;
    }

    doScreenshot(imgSource, data) {
        let canvas;
        const stage = this.parentThatIsA(StageMorph);
        let costume;
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
    }
}

