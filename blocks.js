/*

    blocks.js

    a programming construction kit
    based on morphic.js
    inspired by Scratch

    written by Jens Mšnig
    jens@moenig.org

    Copyright (C) 2013 by Jens Mšnig

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
    needs morphic.js


    hierarchy
    ---------
    the following tree lists all constructors hierarchically,
    indentation indicating inheritance. Refer to this list to get a
    contextual overview:

        Morph*
            ArrowMorph
            BlockHighlightMorph
            ScriptsMorph
            SymbolMorph
            SyntaxElementMorph
                ArgMorph
                    ArgLabelMorph
                    BooleanSlotMorph
                    ColorSlotMorph
                    CommandSlotMorph
                        CSlotMorph
                        RingCommandSlotMorph
                    FunctionSlotMorph
                        ReporterSlotMorph
                            RingReporterSlotMorph
                    InputSlotMorph
                    MultiArgMorph
                    TemplateSlotMorph
                BlockMorph
                    CommandBlockMorph
                        HatBlockMorph
                    ReporterBlockMorph
                        RingMorph
        BoxMorph*
            CommentMorph

    * from morphic.js


    toc
    ---
    the following list shows the order in which all constructors are
    defined. Use this list to locate code in this document:

        SyntaxElementMorph
        BlockMorph
        CommandBlockMorph
        HatBlockMorph
        ReporterBlockMorph
        RingMorph
        ScriptsMorph
        ArgMorph
        CommandSlotMorph
        RingCommandSlotMorph
        CSlotMorph
        InputSlotMorph
        BooleanSlotMorph
        ArrowMorph
        SymbolMorph
        ColorSlotMorph
        TemplateSlotMorph
        BlockHighlightMorph
        MultiArgMorph
        ArgLabelMorph
        FunctionSlotMorph
        ReporterSlotMorph
        RingReporterSlotMorph
        CommentMorph


    structure of syntax elements
    ----------------------------
    the structure of syntax elements is identical with their morphic
    tree. There are, however, accessor methods to get (only) the
    parts which are relevant for evaluation wherever appropriate.

    In Scratch/BYOB every sprite and the stage has its own "blocks bin",
    an instance of ScriptsMorph (we're going to name it differently in
    Snap, probably just "scripts").

    At the top most level blocks are assembled into stacks in ScriptsMorph
    instances. A ScriptsMorph contains nothing but blocks, therefore
    every child of a ScriptsMorph is expected to be a block.

    Each block contains:

        selector    - indicating the name of the function it triggers,

    Its arguments are first evaluated and then passed along    as the
    selector is called. Arguments can be either instances of ArgMorph
    or ReporterBlockMorph. The getter method for a block's arguments is

        inputs()    - gets an array of arg morphs and/or reporter blocks

    in addition to inputs, command blocks also know their

        nextBlock()    - gets the block attached to the receiver's bottom

    and the block they're attached to - if any: Their parent.

    please also refer to the high-level comment at the beginning of each
    constructor for further details.
*/

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
useBlurredShadows, version, window, SpeechBubbleMorph, modules, StageMorph,
fontHeight*/

/*global SpriteMorph, Context, ListWatcherMorph, CellMorph,
DialogBoxMorph, BlockInputFragmentMorph, PrototypeHatBlockMorph*/

/*global IDE_Morph, BlockDialogMorph, BlockEditorMorph, localize, isNil*/

// Global stuff ////////////////////////////////////////////////////////

modules.blocks = '2013-March-22';

var SyntaxElementMorph;
var BlockMorph;
var CommandBlockMorph;
var ReporterBlockMorph;
var ScriptsMorph;
var ArgMorph;
var CommandSlotMorph;
var CSlotMorph;
var InputSlotMorph;
var BooleanSlotMorph;
var ArrowMorph;
var ColorSlotMorph;
var HatBlockMorph;
var BlockHighlightMorph;
var MultiArgMorph;
var TemplateSlotMorph;
var FunctionSlotMorph;
var ReporterSlotMorph;
var RingMorph;
var RingCommandSlotMorph;
var RingReporterSlotMorph;
var SymbolMorph;
var CommentMorph;
var ArgLabelMorph;

WorldMorph.prototype.customMorphs = function () {
    // add examples to the world's demo menu

    return [];

/*
    return [
        new SymbolMorph(
            'flash',
            50,
            new Color(250, 250, 0),
            new Point(-1, -1),
            new Color(0, 0, 200)
        ),
    ];
*/
/*
    var sm = new ScriptsMorph();
    sm.setExtent(new Point(800, 600));

    return [
        new SymbolMorph(),
        new HatBlockMorph(),
        new CommandBlockMorph(),
        sm,
        new CommandSlotMorph(),
        new CSlotMorph(),
        new InputSlotMorph(),
        new InputSlotMorph(null, true),
        new BooleanSlotMorph(),
        new ColorSlotMorph(),
        new TemplateSlotMorph('foo'),
        new ReporterBlockMorph(),
        new ReporterBlockMorph(true),
        new ArrowMorph(),
        new MultiArgMorph(),
        new FunctionSlotMorph(),
        new ReporterSlotMorph(),
        new ReporterSlotMorph(true),
//        new DialogBoxMorph('Dialog Box'),
//        new InputFieldMorph('Input Field')
        new RingMorph(),
        new RingCommandSlotMorph(),
        new RingReporterSlotMorph(),
        new RingReporterSlotMorph(true)
    ];
*/
};


// SyntaxElementMorph //////////////////////////////////////////////////

// I am the ancestor of all blocks and input slots

// SyntaxElementMorph inherits from Morph:

SyntaxElementMorph.prototype = new Morph();
SyntaxElementMorph.prototype.constructor = SyntaxElementMorph;
SyntaxElementMorph.uber = Morph.prototype;

// SyntaxElementMorph preferences settings:

/*
    the following settings govern the appearance of all syntax elements
    (blocks and slots) where applicable:

    outline:

        corner        - radius of command block rounding
        rounding    - radius of reporter block rounding
        edge        - width of 3D-ish shading box
        hatHeight    - additional top space for hat blocks
        hatWidth    - minimum width for hat blocks
        rfBorder    - pixel width of reification border (grey outline)
        minWidth    - minimum width for any syntax element's contents

    jigsaw shape:

        inset        - distance from indentation to left edge
        dent        - width of indentation bottom

    paddings:

        bottomPadding    - adds to the width of the bottom most c-slot
        cSlotPadding    - adds to the width of the open "C" in c-slots
        typeInPadding    - adds pixels between text and edge in input slots
        labelPadding    - adds left/right pixels to block labels

    label:

        labelFontName    - <string> specific font family name
        labelFontStyle    - <string> generic font family name, cascaded
        fontSize        - duh
        embossing        - <Point> offset for embossing effect
        labelWidth        - column width, used for word wrapping
        labelWordWrap    - <bool> if true labels can break after each word
        dynamicInputLabels - <bool> if true inputs can have dynamic labels

    snapping:

        feedbackColor        - <Color> for displaying drop feedbacks
        feedbackMinHeight    - height of white line for command block snaps
        minSnapDistance        - threshold when commands start snapping
        reporterDropFeedbackPadding    - increases reporter drop feedback

    color gradients:

        contrast        - <percent int> 3D-ish shading gradient contrast
        labelContrast    - <percent int> 3D-ish label shading contrast
        activeHighlight    - <Color> for stack highlighting when active
        errorHighlight    - <Color> for error highlighting
        activeBlur        - <pixels int> shadow for blurred activeHighlight
        activeBorder    - <pixels int> unblurred activeHighlight
        rfColor            - <Color> for reified outlines and slot backgrounds
*/

SyntaxElementMorph.prototype.setScale = function (num) {
    var scale = Math.min(Math.max(num, 1), 25);
    this.scale = scale;
    this.corner = 3 * scale;
    this.rounding = 9 * scale;
    this.edge = 1.000001 * scale;
    this.inset = 6 * scale;
    this.hatHeight = 12 * scale;
    this.hatWidth = 70 * scale;
    this.rfBorder = 3 * scale;
    this.minWidth = 0;
    this.dent = 8 * scale;
    this.bottomPadding = 3 * scale;
    this.cSlotPadding = 4 * scale;
    this.typeInPadding = scale;
    this.labelPadding = 4 * scale;
    this.labelFontName = 'Verdana';
    this.labelFontStyle = 'sans-serif';
    this.fontSize = 10 * scale;
    this.embossing = new Point(
        -1 * Math.max(scale / 2, 1),
        -1 * Math.max(scale / 2, 1)
    );
    this.labelWidth = 450 * scale;
    this.labelWordWrap = true;
    this.dynamicInputLabels = true;
    this.feedbackColor = new Color(255, 255, 255);
    this.feedbackMinHeight = 5;
    this.minSnapDistance = 20;
    this.reporterDropFeedbackPadding = 10 * scale;
    this.contrast = 65;
    this.labelContrast = 25;
    this.activeHighlight = new Color(153, 255, 213);
    this.errorHighlight = new Color(173, 15, 0);
    this.activeBlur = 20;
    this.activeBorder = 4;
    this.rfColor = new Color(120, 120, 120);
};

SyntaxElementMorph.prototype.setScale(1);

// SyntaxElementMorph instance creation:

function SyntaxElementMorph() {
    this.init();
}

SyntaxElementMorph.prototype.init = function () {
    this.cachedClr = null;
    this.cachedClrBright = null;
    this.cachedClrDark = null;
    this.isStatic = false; // if true, I cannot be exchanged

    SyntaxElementMorph.uber.init.call(this);

    this.defaults = [];
};

// SyntaxElementMorph accessing:

SyntaxElementMorph.prototype.parts = function () {
    // answer my non-crontrol submorphs
    var nb = null;
    if (this.nextBlock) { // if I am a CommandBlock or a HatBlock
        nb = this.nextBlock();
    }
    return this.children.filter(function (child) {
        return (child !== nb)
            && !(child instanceof ShadowMorph)
            && !(child instanceof BlockHighlightMorph);
    });
};

SyntaxElementMorph.prototype.inputs = function () {
    // answer my arguments and nested reporters
    return this.parts().filter(function (part) {
        return part instanceof SyntaxElementMorph;
    });

};

SyntaxElementMorph.prototype.allInputs = function () {
    // answer arguments and nested reporters of all children
    var myself = this;
    return this.allChildren().slice(0).reverse().filter(
        function (child) {
            return (child instanceof ArgMorph) ||
                (child instanceof ReporterBlockMorph &&
                child !== myself);
        }
    );
};

SyntaxElementMorph.prototype.allEmptySlots = function () {
/*
    answer empty input slots of all children excluding myself,
    but omit those in nested rings (lambdas)
*/
    var empty = [];
    if (!(this instanceof RingMorph)) {
        this.children.forEach(function (morph) {
            if (morph.isEmptySlot && morph.isEmptySlot()) {
                empty.push(morph);
            } else if (morph.allEmptySlots) {
                empty = empty.concat(morph.allEmptySlots());
            }
        });
    }
    return empty;
};

SyntaxElementMorph.prototype.replaceInput = function (oldArg, newArg) {
    var scripts = this.parentThatIsA(ScriptsMorph),
        replacement,
        idx = this.children.indexOf(oldArg),
        nb;

    if ((idx === -1) || (scripts === null)) {
        return null;
    }
    this.startLayout();
    if (newArg.parent) {
        newArg.parent.removeChild(newArg);
    }

    if (oldArg instanceof MultiArgMorph && this.dynamicInputLabels) {
        replacement = new ArgLabelMorph(newArg);
    } else {
        replacement = newArg;
    }

    replacement.parent = this;
    this.children[idx] = replacement;
    if (oldArg instanceof ReporterBlockMorph) {
        if (!(oldArg instanceof RingMorph)
                || (oldArg instanceof RingMorph && oldArg.contents())) {
            scripts.add(oldArg);
            oldArg.moveBy(replacement.extent());
            oldArg.fixBlockColor();
        }
    } else if (oldArg instanceof CommandSlotMorph) {
        nb = oldArg.nestedBlock();
        if (nb) {
            scripts.add(nb);
            nb.moveBy(replacement.extent());
            nb.fixBlockColor();
        }
    }

    if (replacement instanceof MultiArgMorph
            || replacement instanceof ArgLabelMorph
            || replacement.constructor === CommandSlotMorph) {
        replacement.fixLayout();
        if (this.fixLabelColor) { // special case for variadic continuations
            this.fixLabelColor();
        }
    } else {
        replacement.drawNew();
        this.fixLayout();
    }
    this.endLayout();
};

SyntaxElementMorph.prototype.silentReplaceInput = function (oldArg, newArg) {
    // used by the Serializer or when programatically
    // changing blocks
    var i = this.children.indexOf(oldArg),
        replacement;

    if (i === -1) {
        return;
    }

    if (newArg.parent) {
        newArg.parent.removeChild(newArg);
    }
    if (oldArg instanceof MultiArgMorph && this.dynamicInputLabels) {
        replacement = new ArgLabelMorph(newArg);
    } else {
        replacement = newArg;
    }
    replacement.parent = this;
    this.children[i] = replacement;

    if (replacement instanceof MultiArgMorph
            || replacement instanceof ArgLabelMorph
            || replacement.constructor === CommandSlotMorph) {
        replacement.fixLayout();
        if (this.fixLabelColor) { // special case for variadic continuations
            this.fixLabelColor();
        }
    } else {
        replacement.drawNew();
        this.fixLayout();
    }
};

SyntaxElementMorph.prototype.revertToDefaultInput = function (arg, noValues) {
    var idx = this.parts().indexOf(arg),
        inp = this.inputs().indexOf(arg),
        deflt = new InputSlotMorph();

    if (idx !== -1) {
        if (this instanceof BlockMorph) {
            deflt = this.labelPart(this.parseSpec(this.blockSpec)[idx]);
        } else if (this instanceof MultiArgMorph) {
            deflt = this.labelPart(this.slotSpec);
        } else if (this instanceof ReporterSlotMorph) {
            deflt = this.emptySlot();
        }
    }
    // set default value
    if (!noValues) {
        if (inp !== -1) {
            if (deflt instanceof MultiArgMorph) {
                deflt.setContents(this.defaults);
                deflt.defaults = this.defaults;
            } else if (!isNil(this.defaults[inp])) {
                deflt.setContents(this.defaults[inp]);
            }
        }
    }
    this.silentReplaceInput(arg, deflt);
    if (deflt instanceof MultiArgMorph) {
        deflt.refresh();
    } else if (deflt instanceof RingMorph) {
        deflt.fixBlockColor();
    }
};

SyntaxElementMorph.prototype.isLocked = function () {
    // answer true if I can be exchanged by a dropped reporter
    return this.isStatic;
};

// SyntaxElementMorph enumerating:

SyntaxElementMorph.prototype.topBlock = function () {
    if (this.parent && this.parent.topBlock) {
        return this.parent.topBlock();
    }
    return this;
};

// SyntaxElementMorph drag & drop:

SyntaxElementMorph.prototype.reactToGrabOf = function (grabbedMorph) {
    var topBlock = this.topBlock(),
        affected;
    if (grabbedMorph instanceof CommandBlockMorph) {
        affected = this.parentThatIsA(CommandSlotMorph);
        if (affected) {
            this.startLayout();
            affected.fixLayout();
            this.endLayout();
        }
    }
    if (topBlock) {
        topBlock.allComments().forEach(function (comment) {
            comment.align(topBlock);
        });
        if (topBlock.getHighlight()) {
            topBlock.removeHighlight();
            topBlock.addHighlight();
        }
    }
};

// SyntaxElementMorph 3D - border color rendering:

SyntaxElementMorph.prototype.bright = function () {
    return this.color.lighter(this.contrast).toString();
};

SyntaxElementMorph.prototype.dark = function () {
    return this.color.darker(this.contrast).toString();
};

// SyntaxElementMorph color changing:

SyntaxElementMorph.prototype.setColor = function (aColor) {
    if (aColor) {
        if (!this.color.eq(aColor)) {
            this.color = aColor;
            this.drawNew();
            this.children.forEach(function (child) {
                child.drawNew();
                child.changed();
            });
            this.changed();
        }
    }
};

SyntaxElementMorph.prototype.setLabelColor = function (
    textColor,
    shadowColor,
    shadowOffset
) {
    this.children.forEach(function (morph) {
        if (morph instanceof StringMorph && !morph.isProtectedLabel) {
            morph.shadowOffset = shadowOffset || morph.shadowOffset;
            morph.shadowColor = shadowColor || morph.shadowColor;
            morph.setColor(textColor);
        } else if (morph instanceof MultiArgMorph
                || morph instanceof ArgLabelMorph
                || (morph instanceof SymbolMorph && !morph.isProtectedLabel)
                || (morph instanceof InputSlotMorph
                    && morph.isReadOnly)) {
            morph.setLabelColor(textColor, shadowColor, shadowOffset);
        }
    });
};


// SyntaxElementMorph zebra coloring

SyntaxElementMorph.prototype.fixBlockColor = function (
    nearestBlock,
    isForced
) {
    this.children.forEach(function (morph) {
        if (morph instanceof SyntaxElementMorph) {
            morph.fixBlockColor(nearestBlock, isForced);
        }
    });
};

// SyntaxElementMorph label parts:

SyntaxElementMorph.prototype.labelPart = function (spec) {
    var part;
    if ((spec[0] === '%') && (spec.length > 1)) {

        // check for variable multi-arg-slot:
        if ((spec.length > 5) && (spec.slice(0, 5) === '%mult')) {
            part = new MultiArgMorph(spec.slice(5));
            part.addInput();
            return part;
        }

        // single-arg and specialized multi-arg slots:
        switch (spec) {
        case '%inputs':
            part = new MultiArgMorph('%s', 'with inputs');
            part.isStatic = false;
            part.canBeEmpty = false;
            break;
        case '%scriptVars':
            part = new MultiArgMorph('%t', null, 1, spec);
            part.canBeEmpty = false;
            break;
        case '%parms':
            part = new MultiArgMorph('%t', 'Input Names:', 0, spec);
            part.canBeEmpty = false;
            break;
        case '%ringparms':
            part = new MultiArgMorph(
                '%t',
                'input names:',
                0,
                spec
            );
            break;
        case '%cmdRing':
            part = new RingMorph();
            part.color = SpriteMorph.prototype.blockColor.other;
            part.selector = 'reifyScript';
            part.setSpec('%rc %ringparms');
            part.isDraggable = true;
            break;
        case '%repRing':
            part = new RingMorph();
            part.color = SpriteMorph.prototype.blockColor.other;
            part.selector = 'reifyReporter';
            part.setSpec('%rr %ringparms');
            part.isDraggable = true;
            part.isStatic = true;
            break;
        case '%predRing':
            part = new RingMorph(true);
            part.color = SpriteMorph.prototype.blockColor.other;
            part.selector = 'reifyPredicate';
            part.setSpec('%rp %ringparms');
            part.isDraggable = true;
            part.isStatic = true;
            break;
        case '%words':
            part = new MultiArgMorph('%s', null, 0);
            part.addInput(); // allow for default value setting
            part.addInput(); // allow for default value setting
            part.isStatic = false;
            break;
        case '%exp':
            part = new MultiArgMorph('%s', null, 0);
            part.addInput();
            part.isStatic = true;
            part.canBeEmpty = false;
            break;
        case '%br':
            part = new Morph();
            part.setExtent(new Point(0, 0));
            part.isBlockLabelBreak = true;
            part.getSpec = function () {
                return '%br';
            };
            break;
        case '%inputName':
            part = new ReporterBlockMorph();
            part.category = 'variables';
            part.color = SpriteMorph.prototype.blockColor.variables;
            part.setSpec(localize('Input name'));
            break;
        case '%s':
            part = new InputSlotMorph();
            break;
        case '%anyUE':
            part = new InputSlotMorph();
            part.isUnevaluated = true;
            break;
        case '%txt':
            part = new InputSlotMorph();
            part.minWidth = part.height() * 1.7; // "landscape"
            part.fixLayout();
            break;
        case '%obj':
            part = new ArgMorph('object');
            break;
        case '%n':
            part = new InputSlotMorph(null, true);
            break;
        case '%dir':
            part = new InputSlotMorph(
                null,
                true,
                {
                    '(90) right' : 90,
                    '(-90) left' : -90,
                    '(0) up' : '0',
                    '(180) down' : 180
                }
            );
            part.setContents(90);
            break;
        case '%inst':
            part = new InputSlotMorph(
                null,
                true,
                {
                    '(1) Acoustic Grand' : 1,
                    '(2) Bright Acoustic' : 2,
                    '(3) Electric Grand' : 3,
                    '(4) Honky Tonk' : 4,
                    '(5) Electric Piano 1' : 5,
                    '(6) Electric Piano 2' : 6,
                    '(7) Harpsichord' : 7
                }
            );
            part.setContents(1);
            break;
        case '%month':
            part = new InputSlotMorph(
                null, // text
                false, // numeric?
                {
                    'January' : ['January'],
                    'February' : ['February'],
                    'March' : ['March'],
                    'April' : ['April'],
                    'May' : ['May'],
                    'June' : ['June'],
                    'July' : ['July'],
                    'August' : ['August'],
                    'September' : ['September'],
                    'October' : ['October'],
                    'November' : ['November'],
                    'December' : ['December']
                },
                true // read-only
            );
            break;
        case '%ida':
            part = new InputSlotMorph(
                null,
                true,
                {
                    '1' : 1,
                    last : ['last'],
                    '~' : null,
                    all : ['all']
                }
            );
            part.setContents(1);
            break;
        case '%idx':
            part = new InputSlotMorph(
                null,
                true,
                {
                    '1' : 1,
                    last : ['last'],
                    any : ['any']
                }
            );
            part.setContents(1);
            break;
        case '%spr':
            part = new InputSlotMorph(
                null,
                false,
                'objectsMenu',
                true
            );
            break;
        case '%col': // collision detection
            part = new InputSlotMorph(
                null,
                false,
                'collidablesMenu',
                true
            );
            break;
        case '%dst': // distance measuring
            part = new InputSlotMorph(
                null,
                false,
                'distancesMenu',
                true
            );
            break;
        case '%cln': // clones
            part = new InputSlotMorph(
                null,
                false,
                'clonablesMenu',
                true
            );
            break;
        case '%cst':
            part = new InputSlotMorph(
                null,
                false,
                'costumesMenu',
                true
            );
            break;
        case '%eff':
            part = new InputSlotMorph(
                null,
                false,
                {
                /*
                    color : 'color',
                    fisheye : 'fisheye',
                    whirl : 'whirl',
                    pixelate : 'pixelate',
                    mosaic : 'mosaic',
                    brightness : 'brightness',
                */
                    ghost : ['ghost']
                },
                true
            );
            part.setContents(['ghost']);
            break;
        case '%snd':
            part = new InputSlotMorph(
                null,
                false,
                'soundsMenu',
                true
            );
            break;
        case '%key':
            part = new InputSlotMorph(
                null,
                false,
                {
                    'up arrow': ['up arrow'],
                    'down arrow': ['down arrow'],
                    'right arrow': ['right arrow'],
                    'left arrow': ['left arrow'],
                    space : ['space'],
                    a : ['a'],
                    b : ['b'],
                    c : ['c'],
                    d : ['d'],
                    e : ['e'],
                    f : ['f'],
                    g : ['g'],
                    h : ['h'],
                    i : ['i'],
                    j : ['j'],
                    k : ['k'],
                    l : ['l'],
                    m : ['m'],
                    n : ['n'],
                    o : ['o'],
                    p : ['p'],
                    q : ['q'],
                    r : ['r'],
                    s : ['s'],
                    t : ['t'],
                    u : ['u'],
                    v : ['v'],
                    w : ['w'],
                    x : ['x'],
                    y : ['y'],
                    z : ['z'],
                    '0' : ['0'],
                    '1' : ['1'],
                    '2' : ['2'],
                    '3' : ['3'],
                    '4' : ['4'],
                    '5' : ['5'],
                    '6' : ['6'],
                    '7' : ['7'],
                    '8' : ['8'],
                    '9' : ['9']
                },
                true
            );
            part.setContents(['space']);
            break;
        case '%keyHat':
            part = this.labelPart('%key');
            part.isStatic = true;
            break;
        case '%msg':
            part = new InputSlotMorph(
                null,
                false,
                'messagesMenu',
                true
            );
            break;
        case '%msgHat':
            part = new InputSlotMorph(
                null,
                false,
                'messagesMenu',
                true
            );
            part.isStatic = true;
            break;
        case '%att':
            part = new InputSlotMorph(
                null,
                false,
                'attributesMenu',
                true
            );
            part.isStatic = true;
            break;
        case '%fun':
            part = new InputSlotMorph(
                null,
                false,
                {
                    abs : ['abs'],
                    sqrt : ['sqrt'],
                    sin : ['sin'],
                    cos : ['cos'],
                    tan : ['tan'],
                    asin : ['asin'],
                    acos : ['acos'],
                    atan : ['atan'],
                    ln : ['ln'],
                    // log : 'log',
                    'e^' : ['e^']
                    // '10^' : '10^'
                },
                true
            );
            part.setContents(['sqrt']);
            break;
        case '%typ':
            part = new InputSlotMorph(
                null,
                false,
                {
                    number : ['number'],
                    text : ['text'],
                    Boolean : ['Boolean'],
                    list : ['list'],
                    command : ['command'],
                    reporter : ['reporter'],
                    predicate : ['predicate']
                    // ring : 'ring'
                    // object : 'object'
                },
                true
            );
            part.setContents(['number']);
            break;
        case '%var':
            part = new InputSlotMorph(
                null,
                false,
                'getVarNamesDict',
                true
            );
            part.isStatic = true;
            break;
        case '%lst':
            part = new InputSlotMorph(
                null,
                false,
                {
                    list1 : 'list1',
                    list2 : 'list2',
                    list3 : 'list3'
                },
                true
            );
            break;
        case '%l':
            part = new ArgMorph('list');
            break;
        case '%b':
        case '%boolUE':
            part = new BooleanSlotMorph(null, true);
            break;
        case '%cmd':
            part = new CommandSlotMorph();
            break;
        case '%rc':
            part = new RingCommandSlotMorph();
            part.isStatic = true;
            break;
        case '%rr':
            part = new RingReporterSlotMorph();
            part.isStatic = true;
            break;
        case '%rp':
            part = new RingReporterSlotMorph(true);
            part.isStatic = true;
            break;
        case '%c':
            part = new CSlotMorph();
            part.isStatic = true;
            break;
        case '%cs':
            part = new CSlotMorph(); // non-static
            break;
        case '%clr':
            part = new ColorSlotMorph();
            part.isStatic = true;
            break;
        case '%t':
            part = new TemplateSlotMorph('a');
            break;
        case '%upvar':
            part = new TemplateSlotMorph('\u2191'); // up-arrow
            break;
        case '%f':
            part = new FunctionSlotMorph();
            break;
        case '%r':
            part = new ReporterSlotMorph();
            break;
        case '%p':
            part = new ReporterSlotMorph(true);
            break;

    // symbols:

        case '%turtle':
            part = new SymbolMorph('turtle');
            part.size = this.fontSize * 1.2;
            part.color = new Color(255, 255, 255);
            part.shadowColor = this.color.darker(this.labelContrast);
            part.shadowOffset = this.embossing;
            part.drawNew();
            break;
        case '%turtleOutline':
            part = new SymbolMorph('turtleOutline');
            part.size = this.fontSize;
            part.color = new Color(255, 255, 255);
            part.isProtectedLabel = true; // doesn't participate in zebraing
            part.shadowColor = this.color.darker(this.labelContrast);
            part.shadowOffset = this.embossing;
            part.drawNew();
            break;
        case '%clockwise':
            part = new SymbolMorph('turnRight');
            part.size = this.fontSize * 1.5;
            part.color = new Color(255, 255, 255);
            part.isProtectedLabel = false; // zebra colors
            part.shadowColor = this.color.darker(this.labelContrast);
            part.shadowOffset = this.embossing;
            part.drawNew();
            break;
        case '%counterclockwise':
            part = new SymbolMorph('turnLeft');
            part.size = this.fontSize * 1.5;
            part.color = new Color(255, 255, 255);
            part.isProtectedLabel = false; // zebra colors
            part.shadowColor = this.color.darker(this.labelContrast);
            part.shadowOffset = this.embossing;
            part.drawNew();
            break;
        case '%greenflag':
            part = new SymbolMorph('flag');
            part.size = this.fontSize * 1.5;
            part.color = new Color(0, 200, 0);
            part.isProtectedLabel = true; // doesn't participate in zebraing
            part.shadowColor = this.color.darker(this.labelContrast);
            part.shadowOffset = this.embossing;
            part.drawNew();
            break;
        case '%stop':
            part = new SymbolMorph('octagon');
            part.size = this.fontSize * 1.5;
            part.color = new Color(200, 0, 0);
            part.isProtectedLabel = true; // doesn't participate in zebraing
            part.shadowColor = this.color.darker(this.labelContrast);
            part.shadowOffset = this.embossing;
            part.drawNew();
            break;
        default:
            // nop();
        }
    } else {
        part = new StringMorph(spec);
        part.fontName = this.labelFontName;
        part.fontStyle = this.labelFontStyle;
        part.fontSize = this.fontSize;
        part.color = new Color(255, 255, 255);
        part.isBold = true;
        part.shadowColor = this.color.darker(this.labelContrast);
        part.shadowOffset = this.embossing;
        part.drawNew();
    }
    return part;
};

// SyntaxElementMorph layout:

SyntaxElementMorph.prototype.fixLayout = function () {
    var nb,
        parts = this.parts(),
        myself = this,
        x = 0,
        y,
        lineHeight = 0,
        maxX = 0,
        blockWidth = this.minWidth,
        blockHeight,
        affected,
        l = [],
        lines = [],
        space = this.isPrototype ?
                1 : Math.floor(fontHeight(this.fontSize) / 3),
        bottomCorrection,
        initialExtent = this.extent();

    if ((this instanceof MultiArgMorph) && (this.slotSpec !== '%c')) {
        blockWidth += this.arrows().width();
    } else if (this instanceof ReporterBlockMorph) {
        blockWidth += (this.rounding * 2) + (this.edge * 2);
    } else {
        blockWidth += (this.corner * 4)
            + (this.edge * 2)
            + (this.inset * 3)
            + this.dent;
    }

    if (this.nextBlock) {
        nb = this.nextBlock();
    }

    // determine lines
    parts.forEach(function (part) {
        if ((part instanceof CSlotMorph)
                || (part.slotSpec === '%c')) {
            if (l.length > 0) {
                lines.push(l);
                lines.push([part]);
                l = [];
                x = 0;
            } else {
                lines.push([part]);
            }
        } else if (part instanceof BlockHighlightMorph) {
            nop(); // should be redundant now
            // myself.fullChanged();
            // myself.removeChild(part);
        } else {
            if (part.isVisible) {
                x += part.fullBounds().width() + space;
            }
            if ((x > myself.labelWidth) || part.isBlockLabelBreak) {
                if (l.length > 0) {
                    lines.push(l);
                    l = [];
                    x = part.fullBounds().width() + space;
                }
            }
            l.push(part);
            if (part.isBlockLabelBreak) {
                x = 0;
            }
        }
    });
    if (l.length > 0) {
        lines.push(l);
    }

    // distribute parts on lines
    if (this instanceof CommandBlockMorph) {
        y = this.top() + this.corner + this.edge;
        if (this instanceof HatBlockMorph) {
            y += this.hatHeight;
        }
    } else if (this instanceof ReporterBlockMorph) {
        y = this.top() + (this.edge * 2);
    } else if (this instanceof MultiArgMorph
            || this instanceof ArgLabelMorph) {
        y = this.top();
    }
    lines.forEach(function (line) {
        x = myself.left() + myself.edge + myself.labelPadding;
        if (myself instanceof RingMorph) {
            x = myself.left() + space; //myself.labelPadding;
        } else if (myself.isPredicate) {
            x = myself.left() + myself.rounding;
        } else if (myself instanceof MultiArgMorph
                || myself instanceof ArgLabelMorph) {
            x = myself.left();
        }
        y += lineHeight;
        lineHeight = 0;
        line.forEach(function (part) {
            if (part instanceof CSlotMorph) {
                x -= myself.labelPadding;
                if (myself.isPredicate) {
                    x = myself.left() + myself.rounding;
                }
                part.setColor(myself.color);
                part.setPosition(new Point(x, y));
                lineHeight = part.height();
            } else {
                part.setPosition(new Point(x, y));
                if (!part.isBlockLabelBreak) {
                    if (part.slotSpec === '%c') {
                        x += part.width();
                    } else if (part.isVisible) {
                        x += part.fullBounds().width() + space;
                    }
                }
                maxX = Math.max(maxX, x);
                lineHeight = Math.max(
                    lineHeight,
                    part instanceof StringMorph ?
                            part.rawHeight() : part.height()
                );
            }
        });

    // center parts vertically on each line:
        line.forEach(function (part) {
            part.moveBy(new Point(
                0,
                Math.floor((lineHeight - part.height()) / 2)
            ));
        });
    });

    // determine my height:
    y += lineHeight;
    if (this.children.some(function (any) {
            return any instanceof CSlotMorph;
        })) {
        bottomCorrection = this.bottomPadding;
        if (this instanceof ReporterBlockMorph && !this.isPredicate) {
            bottomCorrection = Math.max(
                this.bottomPadding,
                this.rounding - this.bottomPadding
            );
        }
        y += bottomCorrection;
    }
    if (this instanceof CommandBlockMorph) {
        blockHeight = y - this.top() + (this.corner * 2);
    } else if (this instanceof ReporterBlockMorph) {
        blockHeight = y - this.top() + (this.edge * 2);
    } else if (this instanceof MultiArgMorph
            || this instanceof ArgLabelMorph) {
        blockHeight = y - this.top();
    }

    // determine my width:
    if (this.isPredicate) {
        blockWidth = Math.max(
            blockWidth,
            maxX - this.left() + this.rounding
        );
    } else if (this instanceof MultiArgMorph
            || this instanceof ArgLabelMorph) {
        blockWidth = Math.max(
            blockWidth,
            maxX - this.left() - space
        );
    } else {
        blockWidth = Math.max(
            blockWidth,
            maxX - this.left() + this.labelPadding - this.edge
        );
        // adjust right padding if rightmost input has arrows
        if (parts[parts.length - 1] instanceof MultiArgMorph
                && (lines.length === 1)) {
            blockWidth -= space;
        }
        // adjust width to hat width
        if (this instanceof HatBlockMorph) {
            blockWidth = Math.max(blockWidth, this.hatWidth * 1.5);
        }
    }

    // set my extent:
    this.setExtent(new Point(blockWidth, blockHeight));

    // adjust CSlots
    parts.forEach(function (part) {
        if (part instanceof CSlotMorph) {
            if (myself.isPredicate) {
                part.setWidth(blockWidth - myself.rounding * 2);
            } else {
                part.setWidth(blockWidth - myself.edge);
            }
        }
    });

    // redraw in order to erase CSlot backgrounds
    this.drawNew();

    // position next block:
    if (nb) {
        nb.setPosition(
            new Point(
                this.left(),
                this.bottom() - (this.corner)
            )
        );
    }

    // find out if one of my parents needs to be fixed
    if (this instanceof CommandBlockMorph) {
        if (this.height() !== initialExtent.y) {
            affected = this.parentThatIsA(CommandSlotMorph);
            if (affected) {
                affected.fixLayout();
            }
        }
        if (this.width() !== initialExtent.x) {
            affected = this.parentThatIsAnyOf(
                [ReporterBlockMorph, CommandSlotMorph, RingCommandSlotMorph]
            );
            if (affected) {
                affected.fixLayout();
            }
        }
        if (affected) {
            return;
        }
    } else if (this instanceof ReporterBlockMorph) {
        if (this.parent) {
            if (this.parent.fixLayout) {
                return this.parent.fixLayout();
            }
        }
    }

    this.fixHighlight();
};

SyntaxElementMorph.prototype.fixHighlight = function () {
    var top = this.topBlock();
    if (top.getHighlight && top.getHighlight()) {
        top.removeHighlight();
        top.addHighlight();
    }
};

// SyntaxElementMorph evaluating:

SyntaxElementMorph.prototype.evaluate = function () {
    // responsibility of my children, default is to answer null
    return null;
};

SyntaxElementMorph.prototype.isEmptySlot = function () {
    // responsibility of my children, default is to answer false
    return false;
};

// SyntaxElementMorph speech bubble feedback:

SyntaxElementMorph.prototype.showBubble = function (value) {
    var bubble,
        txt,
        img,
        morphToShow,
        isClickable = false,
        wrrld = this.world();

    if ((value === undefined) || !wrrld) {
        return null;
    }
    if (value instanceof ListWatcherMorph) {
        morphToShow = value;
        morphToShow.update(true);
        morphToShow.step = value.update;
        morphToShow.isDraggable = false;
        isClickable = true;
    } else if (value instanceof Morph) {
        img = value.fullImage();
        morphToShow = new Morph();
        morphToShow.silentSetWidth(img.width);
        morphToShow.silentSetHeight(img.height);
        morphToShow.image = img;
    } else if (value instanceof Context) {
        img = value.image();
        morphToShow = new Morph();
        morphToShow.silentSetWidth(img.width);
        morphToShow.silentSetHeight(img.height);
        morphToShow.image = img;
    } else if (typeof value === 'boolean') {
        morphToShow = SpriteMorph.prototype.booleanMorph.call(
            null,
            value
        );
    } else if (isString(value)) {
        txt  = value.length > 500 ? value.slice(0, 500) + '...' : value;
        morphToShow = new TextMorph(
            txt,
            this.fontSize,
            null,
            false,
            false,
            'center'
        );
    } else if (value === null) {
        morphToShow = new TextMorph(
            '',
            this.fontSize,
            null,
            false,
            false,
            'center'
        );
    } else if (value === 0) {
        morphToShow = new TextMorph(
            '0',
            this.fontSize,
            null,
            false,
            false,
            'center'
        );
    } else if (value.toString) {
        morphToShow = new TextMorph(
            value.toString(),
            this.fontSize,
            null,
            false,
            false,
            'center'
        );
    }
    bubble = new SpeechBubbleMorph(
        morphToShow,
        null,
        Math.max(this.rounding - 2, 6),
        0
    );
    bubble.popUp(
        wrrld,
        this.rightCenter().add(new Point(2, 0)),
        isClickable
    );
};

// SyntaxElementMorph layout update optimization

SyntaxElementMorph.prototype.startLayout = function () {
    this.topBlock().fullChanged();
    Morph.prototype.trackChanges = false;
};

SyntaxElementMorph.prototype.endLayout = function () {
    Morph.prototype.trackChanges = true;
    this.topBlock().fullChanged();
};


// BlockMorph //////////////////////////////////////////////////////////

/*
    I am an abstraction of all blocks (commands, reporters, hats).

    Aside from the visual settings inherited from Morph and
    SyntaxElementMorph my most important attributes and public
    accessors are:

    selector    - (string) name of method to be triggered
    receiver()    - answer the object (sprite) to which I apply
    inputs()    - answer an array with my arg slots and nested reporters
    defaults    - an optional Array containing default input values
    topBlock()    - answer the top block of the stack I'm attached to
    blockSpec    - a formalized description of my label parts
    setSpec()    - force me to change my label structure
    evaluate()    - answer the result of my evaluation
    isUnevaluated() - answer whether I am part of a special form

    Zebra coloring provides a mechanism to alternate brightness of nested,
    same colored blocks (of the same category). The deviation of alternating
    brightness is set in the preferences setting:

    zebraContrast - <number> percentage of brightness deviation

    attribute. If the attribute is set to zero, zebra coloring is turned
    off. If it is a positive number, nested blocks will be colored in
    a brighter shade of the same hue and the label color (for texts)
    alternates between white and black. If the attribute is set to a negative
    number, nested blocks are colored in a darker shade of the same hue
    with no alternating label colors.

    Note: Some of these methods are inherited from SyntaxElementMorph
    for technical reasons, because they are shared among Block and
    MultiArgMorph (e.g. topBlock()).

    blockSpec is a formatted string consisting of plain words and
    reserved words starting with the percent character (%), which
    represent the following pre-defined input slots and/or label
    features:

    arity: single

    %br        - user-forced line break
    %s        - white rectangular type-in slot ("string-type")
    %txt    - white rectangular type-in slot ("text-type")
    %n        - white roundish type-in slot ("numerical")
    %dir    - white roundish type-in slot with drop-down for directions
    %inst    - white roundish type-in slot with drop-down for instruments
    %ida    - white roundish type-in slot with drop-down for list indices
    %idx    - white roundish type-in slot for indices incl. "any"
    %obj    - specially drawn slot for object reporters
    %spr    - chameleon colored rectangular drop-down for object-names
    %col    - chameleon colored rectangular drop-down for collidables
    %dst    - chameleon colored rectangular drop-down for distances
    %cst    - chameleon colored rectangular drop-down for costume-names
    %eff    - chameleon colored rectangular drop-down for graphic effects
    %snd    - chameleon colored rectangular drop-down for sound names
    %key    - chameleon colored rectangular drop-down for keyboard keys
    %msg    - chameleon colored rectangular drop-down for messages
    %att    - chameleon colored rectangular drop-down for attributes
    %fun    - chameleon colored rectangular drop-down for math functions
    %typ    - chameleon colored rectangular drop-down for data types
    %var - chameleon colored rectangular drop-down for variable names
    %lst    - chameleon colored rectangular drop-down for list names
    %b        - chameleon colored hexagonal slot (for predicates)
    %l        - list icon
    %c        - C-shaped command slot
    %clr    - interactive color slot
    %t        - inline variable reporter template
    %anyUE    - white rectangular type-in slot, unevaluated if replaced
    %boolUE    - chameleon colored hexagonal slot, unevaluated if replaced
    %f        - round function slot, unevaluated if replaced,
    %r        - round reporter slot
    %p        - hexagonal predicate slot

    rings:

    %cmdRing    - command slotted ring with %ringparms
    %repRing    - round slotted ringn with %ringparms
    %predRing   - diamond slotted ring with %ringparms

    arity: multiple

    %mult%x    - where %x stands for any of the above single inputs
    %inputs - for an additional text label 'with inputs'
    %words - for an expandable list of default 2 (used in JOIN)
    %exp - for a static expandable list of minimum 0 (used in LIST)
    %scriptVars - for an expandable list of variable reporter templates
    %parms - for an expandable list of formal parameters
    %ringparms - the same for use inside Rings

    special form: upvar

    %upvar - same as %t (inline variable reporter template)
    
    special form: input name
    
    %inputName - variable blob (used in input type dialog)

    examples:

        'if %b %c else %c'        - creates Scratch's If/Else block
        'set pen color to %clr'    - creates Scratch's Pen color block
        'list %mult%s'            - creates BYOB's list reporter block
        'call %n %inputs'        - creates BYOB's Call block
        'the script %parms %c'    - creates BYOB's THE SCRIPT block
*/

// BlockMorph inherits from SyntaxElementMorph:

BlockMorph.prototype = new SyntaxElementMorph();
BlockMorph.prototype.constructor = BlockMorph;
BlockMorph.uber = SyntaxElementMorph.prototype;

// BlockMorph preferences settings:

BlockMorph.prototype.zebraContrast = 40; // alternating color brightness

// BlockMorph sound feedback:

BlockMorph.prototype.snapSound = null;

BlockMorph.prototype.toggleSnapSound = function () {
    if (this.snapSound !== null) {
        this.snapSound = null;
    } else {
        BlockMorph.prototype.snapSound = document.createElement('audio');
        BlockMorph.prototype.snapSound.src = 'click.wav';
    }
    CommentMorph.prototype.snapSound = BlockMorph.prototype.snapSound;
};

// BlockMorph instance creation:

function BlockMorph() {
    this.init();
}

BlockMorph.prototype.init = function () {
    this.selector = null; // name of method to be triggered
    this.blockSpec = ''; // formal description of label and arguments
    this.comment = null; // optional "sticky" comment morph

    // not to be persisted:
    this.instantiationSpec = null; // spec to set upon fullCopy() of template
    this.category = null; // for zebra coloring (non persistent)

    BlockMorph.uber.init.call(this);
    this.color = new Color(0, 17, 173);
};

BlockMorph.prototype.receiver = function () {
    // answer the object to which I apply (whose method I represent)
    var up = this.parent;
    while (!!up) {
        if (up.owner) {
            return up.owner;
        }
        up = up.parent;
    }
    return null;
};

BlockMorph.prototype.toString = function () {
    return 'a ' +
        (this.constructor.name ||
            this.constructor.toString().split(' ')[1].split('(')[0]) +
        ' ("' +
        this.blockSpec.slice(0, 30) + '...")';
};

// BlockMorph spec:

BlockMorph.prototype.parseSpec = function (spec) {
    var result = [],
        words,
        word = '';

    words = isString(spec) ? spec.split(' ') : [];
    if (words.length === 0) {
        words = [spec];
    }
    if (this.labelWordWrap) {
        return words;
    }

    function addWord(w) {
        if ((w[0] === '%') && (w.length > 1)) {
            if (word !== '') {
                result.push(word);
                word = '';
            }
            result.push(w);
        } else {
            if (word !== '') {
                word += ' ' + w;
            } else {
                word = w;
            }
        }
    }

    words.forEach(function (each) {
        addWord(each);
    });
    if (word !== '') {
        result.push(word);
    }
    return result;
};

BlockMorph.prototype.setSpec = function (spec) {
    var myself = this,
        part;

    if (!spec) {return; }
    this.parts().forEach(function (part) {
        part.destroy();
    });
    if (this.isPrototype) {
        this.add(this.placeHolder());
    }
    this.parseSpec(spec).forEach(function (word) {
        part = myself.labelPart(word);
        myself.add(part);
        if (!(part instanceof CommandSlotMorph)) {
            part.drawNew();
        }
        if (part instanceof RingMorph) {
            part.fixBlockColor();
        }
        if (part instanceof MultiArgMorph
                || contains(
                    [CommandSlotMorph, RingCommandSlotMorph],
                    part.constructor
                )) {
            part.fixLayout();
        }
        if (myself.isPrototype) {
            myself.add(myself.placeHolder());
        }
    });
    this.blockSpec = spec;
    this.fixLayout();
};

BlockMorph.prototype.buildSpec = function () {
    // create my blockSpec from my parts - for demo purposes only
    var myself = this;
    this.blockSpec = '';
    this.parts().forEach(function (part) {
        if (part instanceof StringMorph) {
            myself.blockSpec += part.text;
        } else if (part instanceof ArgMorph) {
            myself.blockSpec += part.getSpec();
        } else if (part.isBlockLabelBreak) {
            myself.blockSpec += part.getSpec();
        } else {
            myself.blockSpec += '[undefined]';
        }
        myself.blockSpec += ' ';
    });
    this.blockSpec = this.blockSpec.trim();
};

BlockMorph.prototype.rebuild = function (contrast) {
    // rebuild my label fragments, for use in ToggleElementMorphs
    this.setSpec(this.blockSpec);
    if (contrast) {
        this.inputs().forEach(function (input) {
            if (input instanceof ReporterBlockMorph) {
                input.setColor(input.color.lighter(contrast));
                input.setSpec(input.blockSpec);
            }
        });
    }
};

// BlockMorph menu:

BlockMorph.prototype.userMenu = function () {
    var menu = new MenuMorph(this),
        world = this.world(),
        myself = this;

    menu.addItem(
        "help...",
        'showHelp'
    );
    if (this.isTemplate) {
        return menu;
    }
    menu.addLine();
    if (this.selector === 'reportGetVar') {
        menu.addItem(
            'rename...',
            function () {
                new DialogBoxMorph(
                    myself,
                    myself.setSpec,
                    myself
                ).prompt(
                    "Variable name",
                    myself.blockSpec,
                    world
                );
            }
        );
    } else if (SpriteMorph.prototype.blockAlternatives[this.selector]) {
        menu.addItem(
            'relabel...',
            function () {
                myself.relabel(
                    SpriteMorph.prototype.blockAlternatives[myself.selector]
                );
            }
        );
    }

    menu.addItem(
        "duplicate",
        function () {
            this.fullCopy().pickUp(world);
        },
        'make a copy\nand pick it up'
    );
    if (this instanceof CommandBlockMorph && this.nextBlock()) {
        menu.addItem(
            this.thumbnail(0.5, 60, false),
            function () {
                var cpy = this.fullCopy(),
                    nb = cpy.nextBlock();
                if (nb) {nb.destroy(); }
                cpy.pickUp(world);
            },
            'only duplicate this block'
        );
    }
    menu.addItem(
        "delete",
        'userDestroy'
    );
    menu.addItem(
        "script pic...",
        function () {
            window.open(myself.topBlock().fullImage().toDataURL());
        },
        'open a new window\nwith a picture of this script'
    );
    if (this.parentThatIsA(RingMorph)) {
        menu.addLine();
        menu.addItem("unringify", 'unringify');
        return menu;
    }
    if (this.parent instanceof ReporterSlotMorph
            || (this.parent instanceof CommandSlotMorph)
            || (this instanceof HatBlockMorph)
            || (this instanceof CommandBlockMorph
                && (this.topBlock() instanceof HatBlockMorph))) {
        return menu;
    }
    menu.addLine();
    menu.addItem("ringify", 'ringify');
    return menu;
};

BlockMorph.prototype.developersMenu = function () {
    var menu = BlockMorph.uber.developersMenu.call(this);
    menu.addLine();
    menu.addItem("delete block", 'deleteBlock');
    menu.addItem("spec...", function () {

        new DialogBoxMorph(
            this,
            this.setSpec,
            this
        ).prompt(
            menu.title + '\nspec',
            this.blockSpec,
            this.world()
        );
    });
    return menu;
};

BlockMorph.prototype.deleteBlock = function () {
    // delete just this one block, keep inputs and next block around
    var scripts = this.parentThatIsA(ScriptsMorph),
        nb = this.nextBlock ? this.nextBlock() : null,
        tobefixed,
        isindef;
    if (scripts) {
        if (nb) {
            scripts.add(nb);
        }
        this.inputs().forEach(function (inp) {
            if (inp instanceof BlockMorph) {
                scripts.add(inp);
            }
        });
    }
    if (this instanceof ReporterBlockMorph) {
        if (this.parent instanceof BlockMorph) {
            this.parent.revertToDefaultInput(this);
        }
    } else { // CommandBlockMorph
        if (this.parent) {
            if (this.parent.fixLayout) {
                tobefixed = this.parentThatIsA(ArgMorph);
            }
        } else { // must be in a custom block definition
            isindef = true;
        }
    }
    this.destroy();
    if (isindef) {
        /*
            since the definition's body still points to this block
            even after it has been destroyed, mark it to be deleted
            later.
        */
        this.isCorpse = true;
    }
    if (tobefixed) {
        tobefixed.fixLayout();
    }
};

BlockMorph.prototype.ringify = function () {
    // wrap a Ring around me
    var ring = new RingMorph(),
        top = this.topBlock(),
        center = top.fullBounds().center();

    if (this.parent === null) {return null; }
    if (this.parent instanceof SyntaxElementMorph) {
        if (this instanceof ReporterBlockMorph) {
            this.parent.silentReplaceInput(this, ring);
            ring.embed(this);
        } else if (top) { // command
            top.parent.add(ring);
            ring.embed(top);
            ring.setCenter(center);
        }
    } else {
        this.parent.add(ring);
        ring.embed(this);
        ring.setCenter(center);
    }
    this.fixBlockColor(null, true);
};

BlockMorph.prototype.unringify = function () {
    // remove a Ring around me, if any
    var ring = this.parentThatIsA(RingMorph),
        scripts = this.parentThatIsA(ScriptsMorph),
        block,
        center;

    if (ring === null) {return null; }
    block = ring.contents();
    center = ring.center();

    if (ring.parent instanceof SyntaxElementMorph) {
        if (block instanceof ReporterBlockMorph) {
            ring.parent.silentReplaceInput(ring, block);
        } else if (scripts) {
            scripts.add(block);
            block.setFullCenter(center);
            block.moveBy(20);
            ring.parent.revertToDefaultInput(ring);
        }
    } else {
        ring.parent.add(block);
        block.setFullCenter(center);
        ring.destroy();
    }
    this.fixBlockColor(null, true);
};

BlockMorph.prototype.relabel = function (alternativeSelectors) {
    var menu = new MenuMorph(this),
        oldInputs = this.inputs(),
        myself = this;
    alternativeSelectors.forEach(function (sel) {
        var block = SpriteMorph.prototype.blockForSelector(sel);
        block.restoreInputs(oldInputs);
        block.addShadow(new Point(3, 3));
        menu.addItem(
            block,
            function () {
                myself.setSelector(sel);
            }
        );
    });
    menu.popup(this.world(), this.bottomLeft().subtract(new Point(
        8,
        this instanceof CommandBlockMorph ? this.corner : 0
    )));
};

BlockMorph.prototype.setSelector = function (aSelector) {
    // private - used only for relabel()
    var oldInputs = this.inputs(),
        info;
    info = SpriteMorph.prototype.blocks[aSelector];
    this.category = info.category;
    this.selector = aSelector;
    this.setSpec(localize(info.spec));
    this.restoreInputs(oldInputs);
    this.fixLabelColor();
};

BlockMorph.prototype.restoreInputs = function (oldInputs) {
    // private - used only for relabel()
    // try to restore my previous inputs when my spec has been changed
    var i = 0,
        old,
        myself = this;

    this.inputs().forEach(function (inp) {
        old = oldInputs[i];
        if (old instanceof ReporterBlockMorph) {
            myself.silentReplaceInput(inp, old.fullCopy());
        } else if (old && inp instanceof InputSlotMorph) {
            inp.setContents(old.evaluate());
        }
        i += 1;
    });
};

BlockMorph.prototype.showHelp = function () {
    var myself = this,
        pic = new Image(),
        help,
        spec = this.selector === 'evaluateCustomBlock' ?
                this.definition.helpSpec() : this.selector,
        ctx;

    pic.onload = function () {
        help = newCanvas(new Point(pic.width, pic.height));
        ctx = help.getContext('2d');
        ctx.drawImage(pic, 0, 0);
        new DialogBoxMorph().inform(
            'Help',
            null,
            myself.world(),
            help
        );
    };
    pic.src = 'help/' + spec + '.png';
};

// BlockMorph drawing

BlockMorph.prototype.eraseHoles = function (context) {
    var myself = this,
        isReporter = this instanceof ReporterBlockMorph,
        shift = this.edge * 0.5,
        gradient,
        rightX,
        holes = this.parts().filter(function (part) {
            return part.isHole;
        });

    if (this.isPredicate && (holes.length > 0)) {
        rightX = this.width() - this.rounding;
        context.clearRect(
            rightX,
            0,
            this.width(),
            this.height()
        );

        // draw a 3D-ish vertical right edge
        gradient = context.createLinearGradient(
            rightX - this.edge,
            0,
            this.width(),
            0
        );
        gradient.addColorStop(0, this.color.toString());
        gradient.addColorStop(1, this.dark());
        context.lineWidth = this.edge;
        context.lineJoin = 'round';
        context.lineCap = 'round';
        context.strokeStyle = gradient;
        context.beginPath();
        context.moveTo(rightX - shift, this.edge + shift);
        context.lineTo(rightX - shift, this.height() - this.edge - shift);
        context.stroke();
    }
    holes.forEach(function (hole) {
        var w = hole.width(),
            h = Math.floor(hole.height()) - 2; // Opera needs this
        context.clearRect(
            Math.floor(hole.bounds.origin.x - myself.bounds.origin.x) + 1,
            Math.floor(hole.bounds.origin.y - myself.bounds.origin.y) + 1,
            isReporter ? w - 1 : w + 1,
            h
        );
    });
};

// BlockMorph highlighting

BlockMorph.prototype.addHighlight = function () {
    var isHidden = !this.isVisible,
        highlight;

    if (isHidden) {this.show(); }
    highlight = this.highlight(
        this.activeHighlight,
        this.activeBlur,
        this.activeBorder
    );
    this.addBack(highlight);
    this.fullChanged();
    if (isHidden) {this.hide(); }
    return highlight;
};

BlockMorph.prototype.addErrorHighlight = function () {
    var isHidden = !this.isVisible,
        highlight;

    if (isHidden) {this.show(); }
    this.removeHighlight();
    highlight = this.highlight(
        this.errorHighlight,
        this.activeBlur,
        this.activeBorder
    );
    this.addBack(highlight);
    this.fullChanged();
    if (isHidden) {this.hide(); }
    return highlight;
};

BlockMorph.prototype.removeHighlight = function () {
    var highlight = this.getHighlight();
    if (highlight !== null) {
        this.fullChanged();
        this.removeChild(highlight);
    }
};

BlockMorph.prototype.toggleHighlight = function () {
    if (this.getHighlight()) {
        this.removeHighlight();
    } else {
        this.addHighlight();
    }
};

BlockMorph.prototype.highlight = function (color, blur, border) {
    var highlight = new BlockHighlightMorph(),
        fb = this.fullBounds(),
        edge = useBlurredShadows ? blur : border;
    highlight.setExtent(fb.extent().add(edge * 2));
    highlight.image = useBlurredShadows ?
            this.highlightImageBlurred(color, blur)
                : this.highlightImage(color, border);
    highlight.setPosition(fb.origin.subtract(new Point(edge, edge)));
    return highlight;
};

BlockMorph.prototype.highlightImage = function (color, border) {
    var fb, img, hi, ctx, out;
    fb = this.fullBounds().extent();
    img = this.fullImage();

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

BlockMorph.prototype.highlightImageBlurred = function (color, blur) {
    var fb, img, hi, ctx;
    fb = this.fullBounds().extent();
    img = this.fullImage();

    hi = newCanvas(fb.add(blur * 2));
    ctx = hi.getContext('2d');
    ctx.shadowBlur = blur;
    ctx.shadowColor = color.toString();
    ctx.drawImage(img, blur, blur);

    ctx.shadowBlur = 0;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.drawImage(img, blur, blur);
    return hi;
};

BlockMorph.prototype.getHighlight = function () {
    var highlights;
    highlights = this.children.slice(0).reverse().filter(
        function (child) {
            return child instanceof BlockHighlightMorph;
        }
    );
    if (highlights.length !== 0) {
        return highlights[0];
    }
    return null;
};

// BlockMorph zebra coloring

BlockMorph.prototype.fixBlockColor = function (nearestBlock, isForced) {
    var nearest = nearestBlock,
        clr,
        cslot;

    if (!this.zebraContrast && !isForced) {
        return;
    }
    if (!this.zebraContrast && isForced) {
        return this.forceNormalColoring();
    }

    if (!nearest) {
        if (this.parent) {
            if (this.isPrototype) {
                nearest = null; // this.parent; // the PrototypeHatBlockMorph
            } else if (this instanceof ReporterBlockMorph) {
                nearest = this.parent.parentThatIsA(BlockMorph);
            } else { // command
                cslot = this.parentThatIsA(CommandSlotMorph);
                if (cslot) {
                    nearest = cslot.parentThatIsA(BlockMorph);
                }
            }
        }
    }
    if (!nearest) { // top block
        clr = SpriteMorph.prototype.blockColor[this.category];
        if (!this.color.eq(clr)) {
            this.alternateBlockColor();
        }
    } else if (nearest.category === this.category) {
        if (nearest.color.eq(this.color)) {
            this.alternateBlockColor();
        }
    } else if (this.category && !this.color.eq(
            SpriteMorph.prototype.blockColor[this.category]
        )) {
        this.alternateBlockColor();
    }
    if (isForced) {
        this.fixChildrensBlockColor(true);
    }
};

BlockMorph.prototype.forceNormalColoring = function () {
    var clr = SpriteMorph.prototype.blockColor[this.category];
    this.setColor(clr);
    this.setLabelColor(
        new Color(255, 255, 255),
        clr.darker(this.labelContrast),
        new Point(-1, -1)
    );
    this.fixChildrensBlockColor(true);
};

BlockMorph.prototype.alternateBlockColor = function () {
    var clr = SpriteMorph.prototype.blockColor[this.category];

    if (this.color.eq(clr)) {
        this.setColor(
            this.zebraContrast < 0 ? clr.darker(Math.abs(this.zebraContrast))
                : clr.lighter(this.zebraContrast)
        );
    } else {
        this.setColor(clr);
    }
    this.fixLabelColor();
    this.fixChildrensBlockColor(true); // has issues if not forced
};

BlockMorph.prototype.fixLabelColor = function () {
    if (this.zebraContrast > 0 && this.category) {
        var clr = SpriteMorph.prototype.blockColor[this.category];
        if (this.color.eq(clr)) {
            this.setLabelColor(
                new Color(255, 255, 255),
                clr.darker(this.labelContrast),
                new Point(-1, -1)
            );
        } else {
            this.setLabelColor(
                new Color(0, 0, 0),
                clr.lighter(this.zebraContrast)
                    .lighter(this.labelContrast * 2),
                new Point(1, 1)
            );
        }
    }
};

BlockMorph.prototype.fixChildrensBlockColor = function (isForced) {
    var myself = this;
    this.children.forEach(function (morph) {
        if (morph instanceof CommandBlockMorph) {
            morph.fixBlockColor(null, isForced);
        } else if (morph instanceof SyntaxElementMorph) {
            morph.fixBlockColor(myself, isForced);
        }
    });
};

BlockMorph.prototype.setCategory = function (aString) {
    this.category = aString;
    this.startLayout();
    this.fixBlockColor();
    this.endLayout();
};

// BlockMorph copying

BlockMorph.prototype.fullCopy = function () {
    var ans = BlockMorph.uber.fullCopy.call(this);
    ans.removeHighlight();
    ans.isDraggable = true;
    if (this.instantiationSpec) {
        ans.setSpec(this.instantiationSpec);
    }
    ans.allChildren().filter(function (block) {
        return !isNil(block.comment);
    }).forEach(function (block) {
        block.comment = null;
    });
    return ans;
};

// BlockMorph events

BlockMorph.prototype.mouseClickLeft = function () {
    var top = this.topBlock(),
        receiver = top.receiver(),
        stage;
    if (top instanceof PrototypeHatBlockMorph) {
        return top.mouseClickLeft();
    }
    if (receiver) {
        stage = receiver.parentThatIsA(StageMorph);
        if (stage) {
            stage.threads.toggleProcess(top);
        }
    }
};

// BlockMorph thumbnail

BlockMorph.prototype.thumbnail = function (scale, clipWidth, noShadow) {
    var block = this.fullCopy(),
        nb = block.nextBlock(),
        fadeout = 12,
        ext,
        trgt,
        ctx,
        gradient;
    if (nb) {nb.destroy(); }
    if (!noShadow) {block.addShadow(); }
    ext = block.fullBounds().extent();
    if (!noShadow) {
        ext = ext.subtract(this.shadowBlur * (useBlurredShadows ? 1 : 2));
    }
    trgt = newCanvas(new Point(
        Math.min(ext.x * scale, clipWidth || ext.x),
        ext.y * scale
    ));
    ctx = trgt.getContext('2d');
    ctx.scale(scale, scale);
    ctx.drawImage(block.fullImage(), 0, 0);
    // draw fade-out
    if (trgt.width === clipWidth) {
        gradient = ctx.createLinearGradient(
            trgt.width / scale - fadeout,
            0,
            trgt.width / scale,
            0
        );
        gradient.addColorStop(0, new Color(255, 255, 255, 0).toString());
        gradient.addColorStop(1, 'white');
        ctx.fillStyle = gradient;
        ctx.fillRect(
            trgt.width / scale - fadeout,
            0,
            trgt.width / scale,
            trgt.height / scale
        );
    }
    return trgt;
};

// BlockMorph dragging and dropping

BlockMorph.prototype.rootForGrab = function () {
    return this;
};

/*
    for demo purposes, allows you to drop arg morphs onto
    blocks and forces a layout update. This section has
    no relevance in end user mode.
*/

BlockMorph.prototype.wantsDropOf = function (aMorph) {
    // override the inherited method
    return (aMorph instanceof ArgMorph
        || aMorph instanceof StringMorph
        || aMorph instanceof TextMorph
    ) && !this.isTemplate;
};

BlockMorph.prototype.reactToDropOf = function (droppedMorph) {
    droppedMorph.isDraggable = false;
    if (droppedMorph instanceof InputSlotMorph) {
        droppedMorph.drawNew();
    } else if (droppedMorph instanceof MultiArgMorph) {
        droppedMorph.fixLayout();
    }
    this.fixLayout();
    this.buildSpec();
};

BlockMorph.prototype.situation = function () {
    // answer a dictionary specifying where I am right now, so
    // I can slide back to it if I'm dropped somewhere else
    var scripts = this.parentThatIsA(ScriptsMorph);
    if (scripts) {
        return {
            origin: scripts,
            position: this.position().subtract(scripts.position())
        };
    }
    return BlockMorph.uber.situation.call(this);
};

// BlockMorph sticky comments

BlockMorph.prototype.prepareToBeGrabbed = function () {
    var myself = this;
    this.allComments().forEach(function (comment) {
        comment.startFollowing(myself);
    });
};

BlockMorph.prototype.justDropped = function () {
    this.allComments().forEach(function (comment) {
        comment.stopFollowing();
    });
};

BlockMorph.prototype.allComments = function () {
    return this.allChildren().filter(function (block) {
        return !isNil(block.comment);
    }).map(function (block) {
        return block.comment;
    });
};

BlockMorph.prototype.stackHeight = function () {
    var fb = this.fullBounds(),
        commentsBottom = Math.max(this.allComments().map(
            function (comment) {return comment.bottom(); }
        )) || this.bottom();
    return Math.max(fb.bottom(), commentsBottom) - fb.top();
};

BlockMorph.prototype.snap = function () {
    var top = this.topBlock();
    top.allComments().forEach(function (comment) {
        comment.align(top);
    });
    // fix highlights, if any
    if (this.getHighlight() && (this !== top)) {
        this.removeHighlight();
    }
    if (top.getHighlight()) {
        top.removeHighlight();
        top.addHighlight();
    }
};

// CommandBlockMorph ///////////////////////////////////////////////////

/*
    I am a stackable jigsaw-shaped block.

    I inherit from BlockMorph adding the following most important
    public accessors:

    nextBlock()        - set / get the block attached to my bottom
    bottomBlock()    - answer the bottom block of my stack
    blockSequence()    - answer an array of blocks starting with myself
*/

// CommandBlockMorph inherits from BlockMorph:

CommandBlockMorph.prototype = new BlockMorph();
CommandBlockMorph.prototype.constructor = CommandBlockMorph;
CommandBlockMorph.uber = BlockMorph.prototype;

// CommandBlockMorph instance creation:

function CommandBlockMorph() {
    this.init();
}

CommandBlockMorph.prototype.init = function () {
    CommandBlockMorph.uber.init.call(this);
    this.setExtent(new Point(200, 100));
};

// CommandBlockMorph enumerating:

CommandBlockMorph.prototype.blockSequence = function () {
    var nb = this.nextBlock(),
        result = [this];
    if (nb) {
        result = result.concat(nb.blockSequence());
    }
    return result;
};

CommandBlockMorph.prototype.bottomBlock = function () {
    // topBlock() also exists - inherited from SyntaxElementMorph
    if (this.nextBlock()) {
        return this.nextBlock().bottomBlock();
    }
    return this;
};

CommandBlockMorph.prototype.nextBlock = function (block) {
    // set / get the block attached to my bottom
    if (block) {
        var nb = this.nextBlock(),
            affected = this.parentThatIsA(CommandSlotMorph);
        this.add(block);
        if (nb) {
            block.bottomBlock().nextBlock(nb);
        }
        this.fixLayout();
        if (affected) {
            affected.fixLayout();
        }
    } else {
        return detect(
            this.children,
            function (child) {
                return child instanceof CommandBlockMorph
                    && !child.isPrototype;
            }
        );
    }
};

// CommandBlockMorph attach targets:

CommandBlockMorph.prototype.topAttachPoint = function () {
    return new Point(
        this.dentCenter(),
        this.top()
    );
};

CommandBlockMorph.prototype.bottomAttachPoint = function () {
    return new Point(
        this.dentCenter(),
        this.bottom()
    );
};

CommandBlockMorph.prototype.dentLeft = function () {
    return this.left()
        + this.corner
        + this.inset;
};

CommandBlockMorph.prototype.dentCenter = function () {
    return this.dentLeft()
        + this.corner
        + (this.dent * 0.5);
};

CommandBlockMorph.prototype.attachTargets = function () {
    var answer = [];
    if (!(this instanceof HatBlockMorph)) {
        if (!(this.parent instanceof SyntaxElementMorph)) {
            answer.push({
                point: this.topAttachPoint(),
                element: this,
                loc: 'top',
                type: 'block'
            });
        }
    }
    if (!this.isStop()) {
        answer.push({
            point: this.bottomAttachPoint(),
            element: this,
            loc: 'bottom',
            type: 'block'
        });
    }
    return answer;
};

CommandBlockMorph.prototype.allAttachTargets = function (newParent) {
    var myself = this,
        target = newParent || this.parent,
        answer = [],
        topBlocks;

    topBlocks = target.children.filter(function (child) {
        return (child !== myself) &&
            child instanceof SyntaxElementMorph &&
            !child.isTemplate;
    });
    topBlocks.forEach(function (block) {
        block.forAllChildren(function (child) {
            if (child.attachTargets) {
                child.attachTargets().forEach(function (at) {
                    answer.push(at);
                });
            }
        });
    });
    return answer;
};

CommandBlockMorph.prototype.closestAttachTarget = function (newParent) {
    var target = newParent || this.parent,
        bottomBlock = this.bottomBlock(),
        answer = null,
        thresh = Math.max(
            this.corner * 2 + this.dent,
            this.minSnapDistance
        ),
        dist,
        ref = [],
        minDist = 1000;

    if (!(this instanceof HatBlockMorph)) {
        ref.push(
            {
                point: this.topAttachPoint(),
                loc: 'top'
            }
        );
    }
    if (!this.isStop()) {
        ref.push(
            {
                point: bottomBlock.bottomAttachPoint(),
                loc: 'bottom'
            }
        );
    }

    this.allAttachTargets(target).forEach(function (eachTarget) {
        ref.forEach(function (eachRef) {
            if (eachRef.loc !== eachTarget.loc) {
                dist = eachRef.point.distanceTo(eachTarget.point);
                if ((dist < thresh) && (dist < minDist)) {
                    minDist = dist;
                    answer = eachTarget;
                }
            }
        });
    });
    return answer;
};

CommandBlockMorph.prototype.snap = function () {
    var target = this.closestAttachTarget(),
        next,
        offsetY,
        affected;

    if (target === null) {
        this.startLayout();
        this.fixBlockColor();
        this.endLayout();
        CommandBlockMorph.uber.snap.call(this); // align stuck comments
        return;
    }
    this.startLayout();
    if (target.loc === 'bottom') {
        if (target.type === 'slot') {
            target.element.nestedBlock(this);
        } else {
            target.element.nextBlock(this);
        }
        if (this.isStop()) {
            next = this.nextBlock();
            if (next) {
                this.parentThatIsA(ScriptsMorph).add(next);
                next.moveBy(this.extent().floorDivideBy(2));
                affected = this.parentThatIsA(CommandSlotMorph);
                if (affected) {
                    affected.fixLayout();
                }
            }
        }
    } else if (target.loc === 'top') {
        offsetY = this.bottomBlock().bottom() - this.bottom();
        this.setBottom(target.element.top() + this.corner - offsetY);
        this.setLeft(target.element.left());
        this.bottomBlock().nextBlock(target.element);
    }
    this.fixBlockColor();
    this.endLayout();
    CommandBlockMorph.uber.snap.call(this); // align stuck comments
    if (this.snapSound) {
        this.snapSound.play();
    }
};

CommandBlockMorph.prototype.isStop = function () {
    return ([
        'doStop',
        'doStopBlock',
        'doStopAll',
        'doForever',
        'doReport',
        'removeClone'
    ].indexOf(this.selector) > -1);
};

// CommandBlockMorph deleting

CommandBlockMorph.prototype.userDestroy = function () {
    var cslot = this.parentThatIsA(CSlotMorph);
    this.destroy();
    if (cslot) {
        cslot.fixLayout();
    }
};

// CommandBlockMorph drawing:

CommandBlockMorph.prototype.drawNew = function () {
    var context;
    this.cachedClr = this.color.toString();
    this.cachedClrBright = this.bright();
    this.cachedClrDark = this.dark();
    this.image = newCanvas(this.extent());
    context = this.image.getContext('2d');
    context.fillStyle = this.cachedClr;

    // draw the 'flat' shape:
    this.drawTop(context);
    this.drawBody(context);
    this.drawBottom(context);

    // add 3D-Effect:
    this.drawTopDentEdge(context, 0, 0);
    this.drawBottomDentEdge(context, 0, this.height() - this.corner);
    this.drawLeftEdge(context);
    this.drawRightEdge(context);
    this.drawTopLeftEdge(context);
    this.drawBottomRightEdge(context);

    // erase CommandSlots
    this.eraseHoles(context);
};

CommandBlockMorph.prototype.drawBody = function (context) {
    context.fillRect(
        0,
        Math.floor(this.corner),
        this.width(),
        this.height() - Math.floor(this.corner * 3) + 1
    );
};

CommandBlockMorph.prototype.drawTop = function (context) {
    context.beginPath();

    // top left:
    context.arc(
        this.corner,
        this.corner,
        this.corner,
        radians(-180),
        radians(-90),
        false
    );

    // dent:
    this.drawDent(context, 0, 0);

    // top right:
    context.arc(
        this.width() - this.corner,
        this.corner,
        this.corner,
        radians(-90),
        radians(-0),
        false
    );

    context.closePath();
    context.fill();
};

CommandBlockMorph.prototype.drawBottom = function (context) {
    var y = this.height() - (this.corner * 2);

    context.beginPath();

    // bottom left:
    context.arc(
        this.corner,
        y,
        this.corner,
        radians(180),
        radians(90),
        true
    );

    if (!this.isStop()) {
        this.drawDent(context, 0, this.height() - this.corner);
    }

    // bottom right:
    context.arc(
        this.width() - this.corner,
        y,
        this.corner,
        radians(90),
        radians(0),
        true
    );

    context.closePath();
    context.fill();
};

CommandBlockMorph.prototype.drawDent = function (context, x, y) {
    var indent = x + this.corner * 2 + this.inset;

    context.lineTo(x + this.corner + this.inset, y);
    context.lineTo(indent, y + this.corner);
    context.lineTo(indent + this.dent, y + this.corner);
    context.lineTo(x + this.corner * 3 + this.inset + this.dent, y);
    context.lineTo(this.width() - this.corner, y);
};

CommandBlockMorph.prototype.drawTopDentEdge = function (context, x, y) {
    var shift = this.edge * 0.5,
        indent = x + this.corner * 2 + this.inset,
        upperGradient,
        lowerGradient,
        leftGradient,
        lgx;

    context.lineWidth = this.edge;
    context.lineJoin = 'round';
    context.lineCap = 'round';

    upperGradient = context.createLinearGradient(
        0,
        y,
        0,
        y + this.edge
    );
    upperGradient.addColorStop(0, this.cachedClrBright);
    upperGradient.addColorStop(1, this.cachedClr);

    context.strokeStyle = upperGradient;
    context.beginPath();
    context.moveTo(this.corner, y + shift);
    context.lineTo(x + this.corner + this.inset, y + shift);
    context.stroke();

    context.strokeStyle = upperGradient;
    context.beginPath();
    context.moveTo(
        x + this.corner * 3 + this.inset + this.dent + shift,
        y + shift
    );
    context.lineTo(this.width() - this.corner, y + shift);
    context.stroke();

    lgx = x + this.corner + this.inset;
    leftGradient = context.createLinearGradient(
        lgx - this.edge,
        y + this.edge,
        lgx,
        y
    );
    leftGradient.addColorStop(0, this.cachedClr);
    leftGradient.addColorStop(1, this.cachedClrBright);

    context.strokeStyle = leftGradient;
    context.beginPath();
    context.moveTo(x + this.corner + this.inset, y + shift);
    context.lineTo(indent, y + this.corner + shift);
    context.stroke();

    lowerGradient = context.createLinearGradient(
        0,
        y + this.corner,
        0,
        y + this.corner + this.edge
    );
    lowerGradient.addColorStop(0, this.cachedClrBright);
    lowerGradient.addColorStop(1, this.cachedClr);

    context.strokeStyle = lowerGradient;
    context.beginPath();
    context.moveTo(indent, y + this.corner + shift);
    context.lineTo(indent + this.dent, y + this.corner + shift);
    context.stroke();
};

CommandBlockMorph.prototype.drawBottomDentEdge = function (context, x, y) {
    var shift = this.edge * 0.5,
        indent = x + this.corner * 2 + this.inset,
        upperGradient,
        lowerGradient,
        rightGradient;

    context.lineWidth = this.edge;
    context.lineJoin = 'round';
    context.lineCap = 'round';

    upperGradient = context.createLinearGradient(
        0,
        y - this.edge,
        0,
        y
    );
    upperGradient.addColorStop(0, this.cachedClr);
    upperGradient.addColorStop(1, this.cachedClrDark);

    context.strokeStyle = upperGradient;
    context.beginPath();
    context.moveTo(this.corner, y - shift);
    if (this.isStop()) {
        context.lineTo(this.width() - this.corner, y - shift);
    } else {
        context.lineTo(x + this.corner + this.inset - shift, y - shift);
    }
    context.stroke();

    if (this.isStop()) {    // draw straight bottom edge
        return null;
    }

    lowerGradient = context.createLinearGradient(
        0,
        y + this.corner - this.edge,
        0,
        y + this.corner
    );
    lowerGradient.addColorStop(0, this.cachedClr);
    lowerGradient.addColorStop(1, this.cachedClrDark);

    context.strokeStyle = lowerGradient;
    context.beginPath();
    context.moveTo(indent + shift, y + this.corner - shift);
    context.lineTo(indent + this.dent, y + this.corner - shift);
    context.stroke();

    rightGradient = context.createLinearGradient(
        x + indent + this.dent - this.edge,
        y + this.corner - this.edge,
        x + indent + this.dent,
        y + this.corner
    );
    rightGradient.addColorStop(0, this.cachedClr);
    rightGradient.addColorStop(1, this.cachedClrDark);

    context.strokeStyle = rightGradient;
    context.beginPath();
    context.moveTo(x + indent + this.dent, y + this.corner - shift);
    context.lineTo(
        x + this.corner * 3 + this.inset + this.dent,
        y - shift
    );
    context.stroke();

    context.strokeStyle = upperGradient;
    context.beginPath();
    context.moveTo(
        x + this.corner * 3 + this.inset + this.dent,
        y - shift
    );
    context.lineTo(this.width() - this.corner, y - shift);
    context.stroke();
};

CommandBlockMorph.prototype.drawLeftEdge = function (context) {
    var shift = this.edge * 0.5,
        gradient = context.createLinearGradient(0, 0, this.edge, 0);

    gradient.addColorStop(0, this.cachedClrBright);
    gradient.addColorStop(1, this.cachedClr);

    context.lineWidth = this.edge;
    context.lineJoin = 'round';
    context.lineCap = 'round';

    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(shift, this.corner);
    context.lineTo(shift, this.height() - this.corner * 2 - shift);
    context.stroke();
};

CommandBlockMorph.prototype.drawRightEdge = function (context) {
    var shift = this.edge * 0.5,
        x = this.width(),
        gradient;

    gradient = context.createLinearGradient(x - this.edge, 0, x, 0);
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrDark);

    context.lineWidth = this.edge;
    context.lineJoin = 'round';
    context.lineCap = 'round';

    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(x - shift, this.corner + shift);
    context.lineTo(x - shift, this.height() - this.corner * 2);
    context.stroke();
};

CommandBlockMorph.prototype.drawTopLeftEdge = function (context) {
    var shift = this.edge * 0.5,
        gradient;

    gradient = context.createRadialGradient(
        this.corner,
        this.corner,
        this.corner,
        this.corner,
        this.corner,
        this.corner - this.edge
    );
    gradient.addColorStop(0, this.cachedClrBright);
    gradient.addColorStop(1, this.cachedClr);

    context.lineWidth = this.edge;
    context.lineJoin = 'round';
    context.lineCap = 'round';

    context.strokeStyle = gradient;

    context.beginPath();
    context.arc(
        this.corner,
        this.corner,
        this.corner - shift,
        radians(-180),
        radians(-90),
        false
    );
    context.stroke();
};

CommandBlockMorph.prototype.drawBottomRightEdge = function (context) {
    var shift = this.edge * 0.5,
        x = this.width() - this.corner,
        y = this.height() - this.corner * 2,
        gradient;

    gradient = context.createRadialGradient(
        x,
        y,
        this.corner,
        x,
        y,
        this.corner - this.edge
    );
    gradient.addColorStop(0, this.cachedClrDark);
    gradient.addColorStop(1, this.cachedClr);

    context.lineWidth = this.edge;
    context.lineJoin = 'round';
    context.lineCap = 'round';

    context.strokeStyle = gradient;

    context.beginPath();
    context.arc(
        x,
        y,
        this.corner - shift,
        radians(90),
        radians(0),
        true
    );
    context.stroke();
};

// HatBlockMorph ///////////////////////////////////////////////////////

/*
    I am a script's top most block. I can attach command blocks at my
    bottom, but not on top.

*/

// HatBlockMorph inherits from CommandBlockMorph:

HatBlockMorph.prototype = new CommandBlockMorph();
HatBlockMorph.prototype.constructor = HatBlockMorph;
HatBlockMorph.uber = CommandBlockMorph.prototype;

// HatBlockMorph instance creation:

function HatBlockMorph() {
    this.init();
}

HatBlockMorph.prototype.init = function () {
    HatBlockMorph.uber.init.call(this);
    this.setExtent(new Point(300, 150));
};

// HatBlockMorph enumerating:

HatBlockMorph.prototype.blockSequence = function () {
    // override my inherited method so that I am not part of my sequence
    var result = HatBlockMorph.uber.blockSequence.call(this);
    result.shift();
    return result;
};

// HatBlockMorph drawing:

HatBlockMorph.prototype.drawTop = function (context) {
    var s = this.hatWidth,
        h = this.hatHeight,
        r = ((4 * h * h) + (s * s)) / (8 * h),
        a = degrees(4 * Math.atan(2 * h / s)),
        sa = a / 2,
        sp = Math.min(s * 1.7, this.width() - this.corner);

    context.beginPath();

    context.moveTo(0, h + this.corner);

    // top arc:
    context.arc(
        s / 2,
        r,
        r,
        radians(-sa - 90),
        radians(-90),
        false
    );
    context.bezierCurveTo(
        s,
        0,
        s,
        h,
        sp,
        h
    );

    // top right:
    context.arc(
        this.width() - this.corner,
        h + this.corner,
        this.corner,
        radians(-90),
        radians(-0),
        false
    );

    context.closePath();
    context.fill();
};

HatBlockMorph.prototype.drawBody = function (context) {
    context.fillRect(
        0,
        this.hatHeight + Math.floor(this.corner) - 1,
        this.width(),
        this.height() - Math.floor(this.corner * 3) - this.hatHeight + 2
    );
};

HatBlockMorph.prototype.drawLeftEdge = function (context) {
    var shift = this.edge * 0.5,
        gradient = context.createLinearGradient(0, 0, this.edge, 0);

    gradient.addColorStop(0, this.cachedClrBright);
    gradient.addColorStop(1, this.cachedClr);

    context.lineWidth = this.edge;
    context.lineJoin = 'round';
    context.lineCap = 'round';

    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(shift, this.hatHeight + shift);
    context.lineTo(shift, this.height() - this.corner * 2 - shift);
    context.stroke();
};

HatBlockMorph.prototype.drawRightEdge = function (context) {
    var shift = this.edge * 0.5,
        x = this.width(),
        gradient;

    gradient = context.createLinearGradient(x - this.edge, 0, x, 0);
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrDark);

    context.lineWidth = this.edge;
    context.lineJoin = 'round';
    context.lineCap = 'round';

    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(x - shift, this.corner + this.hatHeight + shift);
    context.lineTo(x - shift, this.height() - this.corner * 2);
    context.stroke();
};

HatBlockMorph.prototype.drawTopDentEdge = function () {
    return null;
};

HatBlockMorph.prototype.drawTopLeftEdge = function (context) {
    var shift = this.edge * 0.5,
        s = this.hatWidth,
        h = this.hatHeight,
        r = ((4 * h * h) + (s * s)) / (8 * h),
        a = degrees(4 * Math.atan(2 * h / s)),
        sa = a / 2,
        sp = Math.min(s * 1.7, this.width() - this.corner),
        gradient;

    gradient = context.createRadialGradient(
        s / 2,
        r,
        r - this.edge,
        s / 2,
        r,
        r
    );
    gradient.addColorStop(1, this.cachedClrBright);
    gradient.addColorStop(0, this.cachedClr);

    context.lineWidth = this.edge;
    context.lineJoin = 'round';
    context.lineCap = 'round';

    context.strokeStyle = gradient;
    context.beginPath();
    context.arc(
        Math.round(s / 2),
        r,
        r - shift,
        radians(-sa - 90),
        radians(-90),
        false
    );
    context.moveTo(s / 2, shift);
    context.bezierCurveTo(
        s,
        shift,
        s,
        h + shift,
        sp,
        h + shift
    );
    context.lineTo(this.width() - this.corner, h + shift);
    context.stroke();
};

// ReporterBlockMorph //////////////////////////////////////////////////

/*
    I am a block with a return value, either round-ish or diamond shaped
    I inherit all my important accessors from BlockMorph
*/

// ReporterBlockMorph inherits from BlockMorph:

ReporterBlockMorph.prototype = new BlockMorph();
ReporterBlockMorph.prototype.constructor = ReporterBlockMorph;
ReporterBlockMorph.uber = BlockMorph.prototype;

// ReporterBlockMorph instance creation:

function ReporterBlockMorph(isPredicate) {
    this.init(isPredicate);
}

ReporterBlockMorph.prototype.init = function (isPredicate) {
    ReporterBlockMorph.uber.init.call(this);
    this.isPredicate = isPredicate || false;
    this.setExtent(new Point(200, 80));
};

// ReporterBlockMorph drag & drop:

ReporterBlockMorph.prototype.snap = function (hand) {
    // passing the hand is optional (for when blocks are dragged & dropped)
    if (!this.parent instanceof ScriptsMorph) {
        return null;
    }

    var target = this.parent.closestInput(this, hand);

    if (target !== null) {
        target.parent.replaceInput(target, this);
        if (this.snapSound) {
            this.snapSound.play();
        }
    }
    this.startLayout();
    this.fixBlockColor();
    this.endLayout();
    ReporterBlockMorph.uber.snap.call(this);
};

ReporterBlockMorph.prototype.prepareToBeGrabbed = function (handMorph) {
    var oldPos = this.position();

    nop(handMorph);
    if ((this.parent instanceof BlockMorph)
            || (this.parent instanceof MultiArgMorph)
            || (this.parent instanceof ReporterSlotMorph)) {
        this.parent.revertToDefaultInput(this);
        this.setPosition(oldPos);
    }
    ReporterBlockMorph.uber.prepareToBeGrabbed.call(this, handMorph);
};

// ReporterBlockMorph enumerating

ReporterBlockMorph.prototype.blockSequence = function () {
    // reporters don't have a sequence, answer myself
    return this;
};

// ReporterBlockMorph evaluating

ReporterBlockMorph.prototype.isUnevaluated = function () {
/*
    answer whether my parent block's slot is designated to be of an
    'unevaluated' kind, denoting a spedial form
*/
    return contains(['%anyUE', '%boolUE', '%f'], this.getSlotSpec());
};

ReporterBlockMorph.prototype.isLocked = function () {
    // answer true if I can be exchanged by a dropped reporter
    return this.isStatic || (this.getSlotSpec() === '%t');
};

ReporterBlockMorph.prototype.getSlotSpec = function () {
    // answer the spec of the slot I'm in, if any
    var parts, idx;
    if (this.parent instanceof BlockMorph) {
        parts = this.parent.parts().filter(
            function (part) {
                return !(part instanceof BlockHighlightMorph);
            }
        );
        idx = parts.indexOf(this);
        if (idx !== -1) {
            if (this.parent.blockSpec) {
                return this.parseSpec(this.parent.blockSpec)[idx];
            }
        }
    }
    if (this.parent instanceof MultiArgMorph) {
        return this.parent.slotSpec;
    }
    if (this.parent instanceof TemplateSlotMorph) {
        return this.parent.getSpec();
    }
    return null;
};

// ReporterBlockMorph events

ReporterBlockMorph.prototype.mouseClickLeft = function (pos) {
    if (this.parent instanceof BlockInputFragmentMorph) {
        return this.parent.mouseClickLeft();
    }
    if (this.parent instanceof TemplateSlotMorph) {
        new DialogBoxMorph(
            this,
            this.setSpec,
            this
        ).prompt(
            "Input name",
            this.blockSpec,
            this.world()
        );
    } else {
        ReporterBlockMorph.uber.mouseClickLeft.call(this, pos);
    }
};

// ReporterBlockMorph deleting

ReporterBlockMorph.prototype.userDestroy = function () {
    this.prepareToBeGrabbed(); // restore default slot of parent block
    this.destroy();
};

// ReporterBlockMorph drawing:

ReporterBlockMorph.prototype.drawNew = function () {
    var context;
    this.cachedClr = this.color.toString();
    this.cachedClrBright = this.bright();
    this.cachedClrDark = this.dark();
    this.image = newCanvas(this.extent());
    context = this.image.getContext('2d');
    context.fillStyle = this.cachedClr;

    if (this.isPredicate) {
        this.drawDiamond(context);
    } else {
        this.drawRounded(context);
    }

    // erase CommandSlots
    this.eraseHoles(context);
};

ReporterBlockMorph.prototype.drawRounded = function (context) {
    var h = this.height(),
        r = Math.min(this.rounding, h / 2),
        w = this.width(),
        shift = this.edge / 2,
        gradient;

    // draw the 'flat' shape:
    context.fillStyle = this.cachedClr;
    context.beginPath();

    // top left:
    context.arc(
        r,
        r,
        r,
        radians(-180),
        radians(-90),
        false
    );

    // top right:
    context.arc(
        w - r,
        r,
        r,
        radians(-90),
        radians(-0),
        false
    );

    // bottom right:
    context.arc(
        w - r,
        h - r,
        r,
        radians(0),
        radians(90),
        false
    );

    // bottom left:
    context.arc(
        r,
        h - r,
        r,
        radians(90),
        radians(180),
        false
    );

    context.closePath();
    context.fill();


    // add 3D-Effect:
    context.lineWidth = this.edge;
    context.lineJoin = 'round';
    context.lineCap = 'round';

    // half-tone edges
    // bottem left corner
    gradient = context.createRadialGradient(
        r,
        h - r,
        r - this.edge,
        r,
        h - r,
        r + this.edge
    );
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrBright);
    context.strokeStyle = gradient;
    context.beginPath();
    context.arc(
        r,
        h - r,
        r - shift,
        radians(90),
        radians(180),
        false
    );
    context.stroke();

    // top right corner
    gradient = context.createRadialGradient(
        w - r,
        r,
        r - this.edge,
        w - r,
        r,
        r + this.edge
    );
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrDark);
    context.strokeStyle = gradient;
    context.beginPath();
    context.arc(
        w - r,
        r,
        r - shift,
        radians(-90),
        radians(0),
        false
    );
    context.stroke();

    // normal gradient edges

    // top edge: straight line
    gradient = context.createLinearGradient(
        0,
        0,
        0,
        this.edge
    );
    gradient.addColorStop(0, this.cachedClrBright);
    gradient.addColorStop(1, this.cachedClr);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(r - shift, shift);
    context.lineTo(w - r + shift, shift);
    context.stroke();

    // top edge: left corner
    gradient = context.createRadialGradient(
        r,
        r,
        r - this.edge,
        r,
        r,
        r
    );
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrBright);
    context.strokeStyle = gradient;
    context.beginPath();
    context.arc(
        r,
        r,
        r - shift,
        radians(180),
        radians(270),
        false
    );
    context.stroke();

    // bottom edge: right corner
    gradient = context.createRadialGradient(
        w - r,
        h - r,
        r - this.edge,
        w - r,
        h - r,
        r
    );
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrDark);
    context.strokeStyle = gradient;
    context.beginPath();
    context.arc(
        w - r,
        h - r,
        r - shift,
        radians(0),
        radians(90),
        false
    );
    context.stroke();

    // bottom edge: straight line
    gradient = context.createLinearGradient(
        0,
        h - this.edge,
        0,
        h
    );
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrDark);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(r - shift, h - shift);
    context.lineTo(w - r + shift, h - shift);
    context.stroke();

    // left edge: straight vertical line
    gradient = context.createLinearGradient(0, 0, this.edge, 0);
    gradient.addColorStop(0, this.cachedClrBright);
    gradient.addColorStop(1, this.cachedClr);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(shift, r);
    context.lineTo(shift, h - r);
    context.stroke();

    // right edge: straight vertical line
    gradient = context.createLinearGradient(w - this.edge, 0, w, 0);
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrDark);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(w - shift, r + shift);
    context.lineTo(w - shift, h - r);
    context.stroke();

};

ReporterBlockMorph.prototype.drawDiamond = function (context) {
    var w = this.width(),
        h = this.height(),
        h2 = Math.floor(h / 2),
        r = this.rounding,
        shift = this.edge / 2,
        gradient;

    // draw the 'flat' shape:
    context.fillStyle = this.cachedClr;
    context.beginPath();

    context.moveTo(0, h2);
    context.lineTo(r, 0);
    context.lineTo(w - r, 0);
    context.lineTo(w, h2);
    context.lineTo(w - r, h);
    context.lineTo(r, h);

    context.closePath();
    context.fill();

    // add 3D-Effect:
    context.lineWidth = this.edge;
    context.lineJoin = 'round';
    context.lineCap = 'round';

    // half-tone edges
    // bottom left corner
    gradient = context.createLinearGradient(
        -r,
        0,
        r,
        0
    );
    gradient.addColorStop(1, this.cachedClr);
    gradient.addColorStop(0, this.cachedClrBright);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(shift, h2);
    context.lineTo(r, h - shift);
    context.closePath();
    context.stroke();

    // top right corner
    gradient = context.createLinearGradient(
        w - r,
        0,
        w + r,
        0
    );
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrDark);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(w - shift, h2);
    context.lineTo(w - r, shift);
    context.closePath();
    context.stroke();

    // normal gradient edges
    // top edge: left corner
    gradient = context.createLinearGradient(
        0,
        0,
        r,
        0
    );
    gradient.addColorStop(0, this.cachedClrBright);
    gradient.addColorStop(1, this.cachedClr);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(shift, h2);
    context.lineTo(r, shift);
    context.closePath();
    context.stroke();

    // top edge: straight line
    gradient = context.createLinearGradient(
        0,
        0,
        0,
        this.edge
    );
    gradient.addColorStop(0, this.cachedClrBright);
    gradient.addColorStop(1, this.cachedClr);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(r, shift);
    context.lineTo(w - r, shift);
    context.closePath();
    context.stroke();

    // bottom edge: right corner
    gradient = context.createLinearGradient(
        w - r,
        0,
        w,
        0
    );
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrDark);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(w - r, h - shift);
    context.lineTo(w - shift, h2);
    context.closePath();
    context.stroke();

    // bottom edge: straight line
    gradient = context.createLinearGradient(
        0,
        h - this.edge,
        0,
        h
    );
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrDark);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(r + shift, h - shift);
    context.lineTo(w - r - shift, h - shift);
    context.closePath();
    context.stroke();
};

// RingMorph /////////////////////////////////////////////////////////////

/*
    I am a reporter block which reifies its contents, my outer shape is
    always roundish (never diamond)
*/

// RingMorph inherits from ReporterBlockMorph:

RingMorph.prototype = new ReporterBlockMorph();
RingMorph.prototype.constructor = RingMorph;
RingMorph.uber = ReporterBlockMorph.prototype;

// RingMorph preferences settings:

// RingMorph.prototype.edge = 2;
// RingMorph.prototype.rounding = 9;
// RingMorph.prototype.alpha = 0.8;
// RingMorph.prototype.contrast = 85;

// RingMorph instance creation:

function RingMorph() {
    this.init();
}

RingMorph.prototype.init = function () {
    RingMorph.uber.init.call(this);
    this.category = 'other';
    this.alpha = RingMorph.prototype.alpha;
    this.contrast = RingMorph.prototype.contrast;
    this.setExtent(new Point(200, 80));
};

// RingMorph dragging and dropping

RingMorph.prototype.rootForGrab = function () {
    if (this.isDraggable) {
        return this;
    }
    return BlockMorph.uber.rootForGrab.call(this);
};

// RingMorph ops - Note: these assume certain layouts defined elsewhere -

RingMorph.prototype.embed = function (aBlock, inputNames) {
    var slot;

    // set my color
    this.color = SpriteMorph.prototype.blockColor.other;
    this.isDraggable = true;

    // set my type, selector, and nested block:
    if (aBlock instanceof CommandBlockMorph) {
        this.isStatic = false;
        this.setSpec('%rc %ringparms');
        this.selector = 'reifyScript';
        slot = this.parts()[0];
        slot.nestedBlock(aBlock);
    } else if (aBlock.isPredicate) {
        this.isStatic = true;
        this.setSpec('%rp %ringparms');
        this.selector = 'reifyPredicate';
        slot = this.parts()[0];
        slot.silentReplaceInput(slot.contents(), aBlock);
    } else { // reporter
        this.isStatic = false;
        this.setSpec('%rr %ringparms');
        this.selector = 'reifyReporter';
        slot = this.parts()[0];
        slot.silentReplaceInput(slot.contents(), aBlock);
    }

    // set my inputs, if any
    slot = this.parts()[1];
    if (inputNames) {
        inputNames.forEach(function (name) {
            slot.addInput(name);
        });
    }

    // ensure zebra coloring
    this.fixBlockColor(null, true);
};

RingMorph.prototype.vanishForSimilar = function () {
    // let me disappear if I am nesting a variable getter or Ring
    // but only if I'm not already inside another ring
    var slot = this.parts()[0],
        block = slot.nestedBlock();

    if (!block) {return null; }
    if (!(this.parent instanceof SyntaxElementMorph)) {return null; }
    if (this.parent instanceof RingReporterSlotMorph
            || (this.parent instanceof RingCommandSlotMorph)) {
        return null;
    }
    if (block.selector === 'reportGetVar' || (block instanceof RingMorph)) {
        this.parent.silentReplaceInput(this, block);
    }
};

RingMorph.prototype.contents = function () {
    return this.parts()[0].nestedBlock();
};

RingMorph.prototype.inputNames = function () {
    return this.parts()[1].evaluate();
};

RingMorph.prototype.dataType = function () {
    switch (this.selector) {
    case 'reifyScript':
        return 'command';
    case 'reifyPredicate':
        return 'predicate';
    default:
        return 'reporter';
    }
};

// RingMorph zebra coloring

RingMorph.prototype.fixBlockColor = function (nearest, isForced) {
    var slot = this.parts()[0];
    RingMorph.uber.fixBlockColor.call(this, nearest, isForced);
    if (slot instanceof RingCommandSlotMorph) {
        slot.fixLayout();
    }
};

// ScriptsMorph ////////////////////////////////////////////////////////

/*
    I give feedback about possible drop targets and am in charge
    of actually snapping blocks together.

    My children are the top blocks of scripts.

    I store a back-pointer to my owner, i.e. the object (sprite)
    to whom my scripts apply.
*/

// ScriptsMorph inherits from FrameMorph:

ScriptsMorph.prototype = new FrameMorph();
ScriptsMorph.prototype.constructor = ScriptsMorph;
ScriptsMorph.uber = FrameMorph.prototype;

// ScriptsMorph preference settings

ScriptsMorph.prototype.cleanUpMargin = 20;
ScriptsMorph.prototype.cleanUpSpacing = 15;
ScriptsMorph.prototype.isPreferringEmptySlots = true;

// ScriptsMorph instance creation:

function ScriptsMorph(owner) {
    this.init(owner);
}

ScriptsMorph.prototype.init = function (owner) {
    this.owner = owner || null;
    this.feedbackColor = SyntaxElementMorph.prototype.feedbackColor;
    this.feedbackMorph = new BoxMorph();
    this.allowsStickyComments = true;

    ScriptsMorph.uber.init.call(this);
    this.setColor(new Color(70, 70, 70));
};

// ScriptsMorph deep copying:

ScriptsMorph.prototype.fullCopy = function () {
    var cpy = new ScriptsMorph(),
        pos = this.position(),
        child;
    this.children.forEach(function (morph) {
        child = morph.fullCopy();
        child.setPosition(morph.position().subtract(pos));
        cpy.add(child);
    });
    cpy.adjustBounds();
    return cpy;
};

// ScriptsMorph stepping:

ScriptsMorph.prototype.step = function () {
    var hand = this.world().hand,
        block;

    if (this.feedbackMorph.parent) {
        this.feedbackMorph.destroy();
    }
    if (hand.children.length === 0) {
        return null;
    }
    if (!this.bounds.containsPoint(hand.bounds.origin)) {
        return null;
    }
    block = hand.children[0];
    if (!(block instanceof BlockMorph) && !(block instanceof CommentMorph)) {
        return null;
    }
    if (!contains(hand.morphAtPointer().allParents(), this)) {
        return null;
    }
    if (block instanceof CommentMorph) {
        this.showCommentDropFeedback(block, hand);
    } else if (block instanceof ReporterBlockMorph) {
        this.showReporterDropFeedback(block, hand);
    } else {
        this.showCommandDropFeedback(block);
    }
};

ScriptsMorph.prototype.showReporterDropFeedback = function (block, hand) {
    var target = this.closestInput(block, hand);

    if (target === null) {
        return null;
    }
    this.feedbackMorph.bounds = target.fullBounds()
        .expandBy(Math.max(
            block.edge * 2,
            block.reporterDropFeedbackPadding
        ));
    this.feedbackMorph.edge = SyntaxElementMorph.prototype.rounding;
    this.feedbackMorph.border = Math.max(
        SyntaxElementMorph.prototype.edge,
        3
    );
    this.add(this.feedbackMorph);
    if (target instanceof MultiArgMorph) {
        this.feedbackMorph.color =
            SpriteMorph.prototype.blockColor.lists.copy();
        this.feedbackMorph.borderColor =
            SpriteMorph.prototype.blockColor.lists;
    } else {
        this.feedbackMorph.color = this.feedbackColor.copy();
        this.feedbackMorph.borderColor = this.feedbackColor;
    }
    this.feedbackMorph.color.a = 0.5;
    this.feedbackMorph.drawNew();
    this.feedbackMorph.changed();
};

ScriptsMorph.prototype.showCommandDropFeedback = function (block) {
    var y, target;

    target = block.closestAttachTarget(this);
    if (!target) {
        return null;
    }
    this.add(this.feedbackMorph);
    this.feedbackMorph.border = 0;
    this.feedbackMorph.edge = 0;
    this.feedbackMorph.alpha = 1;
    this.feedbackMorph.setExtent(new Point(
        target.element.width(),
        Math.max(
            SyntaxElementMorph.prototype.corner,
            SyntaxElementMorph.prototype.feedbackMinHeight
        )
    ));
    this.feedbackMorph.color = this.feedbackColor;
    this.feedbackMorph.drawNew();
    this.feedbackMorph.changed();
    y = target.point.y;
    if (target.loc === 'bottom') {
        if (target.type === 'block') {
            if (target.element.nextBlock()) {
                y -= SyntaxElementMorph.prototype.corner;
            }
        } else if (target.type === 'slot') {
            if (target.element.nestedBlock()) {
                y -= SyntaxElementMorph.prototype.corner;
            }
        }
    }
    this.feedbackMorph.setPosition(new Point(
        target.element.left(),
        y
    ));
};

ScriptsMorph.prototype.showCommentDropFeedback = function (comment, hand) {
    var target = this.closestBlock(comment, hand);
    if (!target) {
        return null;
    }

    this.feedbackMorph.bounds = target.bounds
        .expandBy(Math.max(
            BlockMorph.prototype.edge * 2,
            BlockMorph.prototype.reporterDropFeedbackPadding
        ));
    this.feedbackMorph.edge = SyntaxElementMorph.prototype.rounding;
    this.feedbackMorph.border = Math.max(
        SyntaxElementMorph.prototype.edge,
        3
    );
    this.add(this.feedbackMorph);
    this.feedbackMorph.color = comment.color.copy();
    this.feedbackMorph.color.a = 0.25;
    this.feedbackMorph.borderColor = comment.titleBar.color;
    this.feedbackMorph.drawNew();
    this.feedbackMorph.changed();
};

ScriptsMorph.prototype.closestInput = function (reporter, hand) {
    // passing the hand is optional (when dragging reporters)
    var fb = reporter.fullBoundsNoShadow(),
        stacks = this.children.filter(function (child) {
            return (child instanceof BlockMorph) &&
                (child.fullBounds().intersects(fb));
        }),
        blackList = reporter.allInputs(),
        handPos,
        target,
        all;

    all = [];
    stacks.forEach(function (stack) {
        all = all.concat(stack.allInputs());
    });
    if (all.length === 0) {return null; }

    if (this.isPreferringEmptySlots) {
        if (hand) {
            handPos = hand.position();
            target = detect(
                all,
                function (input) {
                    return (input instanceof InputSlotMorph
                            || input instanceof ArgMorph
                            || (input instanceof RingMorph
                                && !input.contents())
                            || input.isEmptySlot())
                        && !input.isLocked()
                        && input.bounds.containsPoint(handPos)
                        && !contains(blackList, input);
                }
            );
            if (target) {
                return target;
            }
        }
        target = detect(
            all,
            function (input) {
                return (input instanceof InputSlotMorph
                        || input instanceof ArgMorph
                        || (input instanceof RingMorph
                            && !input.contents())
                        || input.isEmptySlot())
                    && !input.isLocked()
                    && input.bounds.intersects(fb)
                    && !contains(blackList, input);
            }
        );
        if (target) {
            return target;
        }
    }

    if (hand) {
        handPos = hand.position();
        target = detect(
            all,
            function (input) {
                return (input !== reporter)
                    && !input.isLocked()
                    && input.bounds.containsPoint(handPos)
                    && !(input.parent instanceof PrototypeHatBlockMorph)
                    && !contains(blackList, input);
            }
        );
        if (target) {
            return target;
        }
    }
    return detect(
        all,
        function (input) {
            return (input !== reporter)
                && !input.isLocked()
                && input.fullBounds().intersects(fb)
                && !(input.parent instanceof PrototypeHatBlockMorph)
                && !contains(blackList, input);
        }
    );
};

ScriptsMorph.prototype.closestBlock = function (comment, hand) {
    // passing the hand is optional (when dragging comments)
    var fb = comment.bounds,
        stacks = this.children.filter(function (child) {
            return (child instanceof BlockMorph) &&
                (child.fullBounds().intersects(fb));
        }),
        handPos,
        target,
        all;

    if (!this.allowsStickyComments) {return null; }
    all = [];
    stacks.forEach(function (stack) {
        all = all.concat(stack.allChildren().slice(0).reverse().filter(
            function (child) {return child instanceof BlockMorph &&
                !child.isTemplate; }
        ));
    });
    if (all.length === 0) {return null; }

    if (hand) {
        handPos = hand.position();
        target = detect(
            all,
            function (block) {
                return !block.comment
                    && block.bounds.containsPoint(handPos);
            }
        );
        if (target) {
            return target;
        }
    }
    return detect(
        all,
        function (block) {
            return !block.comment
                && block.bounds.intersects(fb);
        }
    );
};

// ScriptsMorph user menu

ScriptsMorph.prototype.userMenu = function () {
    var menu = new MenuMorph(this),
        ide = this.parentThatIsA(IDE_Morph),
        blockEditor,
        myself = this,
        obj = this.owner,
        stage = obj.parentThatIsA(StageMorph);

    if (!ide) {
        blockEditor = this.parentThatIsA(BlockEditorMorph);
        if (blockEditor) {
            ide = blockEditor.target.parentThatIsA(IDE_Morph);
        }
    }
    menu.addItem('clean up', 'cleanUp', 'arrange scripts\nvertically');
    menu.addItem('add comment', 'addComment');
    if (ide) {
        menu.addLine();
        menu.addItem(
            'make a block...',
            function () {
                new BlockDialogMorph(
                    null,
                    function (definition) {
                        if (definition.spec !== '') {
                            if (definition.isGlobal) {
                                stage.globalBlocks.push(definition);
                            } else {
                                obj.customBlocks.push(definition);
                            }
                            ide.flushPaletteCache();
                            ide.refreshPalette();
                            new BlockEditorMorph(definition, obj).popUp();
                        }
                    },
                    myself
                ).prompt(
                    'Make a block',
                    null,
                    myself.world()
                );
            }
        );
    }
    return menu;
};

// ScriptsMorph user menu features:

ScriptsMorph.prototype.cleanUp = function () {
    var origin = this.topLeft(),
        y = this.cleanUpMargin,
        myself = this;
    this.children.sort(function (a, b) {
        // make sure the prototype hat block always stays on top
        return a instanceof PrototypeHatBlockMorph ? 0 : a.top() - b.top();
    }).forEach(function (child) {
        if (child instanceof CommentMorph && child.block) {
            return; // skip anchored comments
        }
        child.setPosition(origin.add(new Point(myself.cleanUpMargin, y)));
        if (child instanceof BlockMorph) {
            child.allComments().forEach(function (comment) {
                comment.align(child, true); // ignore layer
            });
        }
        y += child.stackHeight() + myself.cleanUpSpacing;
    });
    if (this.parent) {
        this.setPosition(this.parent.topLeft());
    }
    this.adjustBounds();
};


ScriptsMorph.prototype.addComment = function () {
    new CommentMorph().pickUp(this.world());
};

// ScriptsMorph blocks layout fix

ScriptsMorph.prototype.fixMultiArgs = function () {
    var oldFlag = Morph.prototype.trackChanges;

    Morph.prototype.trackChanges = false;
    this.forAllChildren(function (morph) {
        if (morph instanceof MultiArgMorph) {
            morph.fixLayout();
        }
    });
    Morph.prototype.trackChanges = oldFlag;
};

// ScriptsMorph drag & drop:

ScriptsMorph.prototype.wantsDropOf = function (aMorph) {
    // override the inherited method
    return aMorph instanceof SyntaxElementMorph ||
        aMorph instanceof CommentMorph;
};

ScriptsMorph.prototype.reactToDropOf = function (droppedMorph, hand) {
    if (droppedMorph instanceof BlockMorph ||
            droppedMorph instanceof CommentMorph) {
        droppedMorph.snap(hand);
    }
    this.adjustBounds();
};

// ArgMorph //////////////////////////////////////////////////////////

/*
    I am a syntax element and the ancestor of all block inputs.
    I am present in block labels.
    Usually I am just a receptacle for inherited methods and attributes,
    however, if my 'type' attribute is set to one of the following
    values, I act as an iconic slot myself:
    
        'list'    - a list symbol
*/

// ArgMorph inherits from SyntaxElementMorph:

ArgMorph.prototype = new SyntaxElementMorph();
ArgMorph.prototype.constructor = ArgMorph;
ArgMorph.uber = SyntaxElementMorph.prototype;

// ArgMorph instance creation:

function ArgMorph(type) {
    this.init(type);
}

ArgMorph.prototype.init = function (type) {
    this.type = type || null;
    this.isHole = false;
    ArgMorph.uber.init.call(this);
    this.color = new Color(0, 17, 173);
    this.setExtent(new Point(50, 50));
};

// ArgMorph drag & drop: for demo puposes only

ArgMorph.prototype.justDropped = function () {
    if (!(this instanceof CommandSlotMorph)) {
        this.drawNew();
        this.changed();
    }
};

// ArgMorph spec extrapolation (for demo purposes)

ArgMorph.prototype.getSpec = function () {
    return '%s'; // default
};

// ArgMorph drawing

ArgMorph.prototype.drawNew = function () {
    if (this.type === 'list') {
        this.image = this.listIcon();
        this.silentSetExtent(new Point(
            this.image.width,
            this.image.height
        ));
    } else if (this.type === 'object') {
        this.image = this.objectIcon();
        this.silentSetExtent(new Point(
            this.image.width,
            this.image.height
        ));
    } else {
        ArgMorph.uber.drawNew.call(this);
    }
};

ArgMorph.prototype.listIcon = function () {
    var frame = new Morph(),
        first = new CellMorph(),
        second = new CellMorph(),
        source,
        icon,
        context,
        ratio;

    frame.color = new Color(255, 255, 255);
    second.setPosition(first.bottomLeft().add(new Point(
        0,
        this.fontSize / 3
    )));
    first.add(second);
    first.setPosition(frame.position().add(this.fontSize));
    frame.add(first);
    frame.bounds.corner = second.bounds.corner.add(this.fontSize);
    frame.drawNew();
    source = frame.fullImage();
    ratio = (this.fontSize + this.edge) / source.height;
    icon = newCanvas(new Point(
        Math.ceil(source.width * ratio) + 1,
        Math.ceil(source.height * ratio) + 1
    ));
    context = icon.getContext('2d');
    context.fillStyle = 'black';
    context.fillRect(0, 0, icon.width, icon.height);
    context.scale(ratio, ratio);
    context.drawImage(source, 1 / ratio, 1 / ratio);
    return icon;
};

ArgMorph.prototype.objectIcon = function () {
    return this.labelPart('%turtle').image;
};

// ArgMorph evaluation

ArgMorph.prototype.isEmptySlot = function () {
    return this.type !== null;
};


// CommandSlotMorph ////////////////////////////////////////////////////

/*
    I am a CommandBlock-shaped input slot. I can nest command blocks
    and also accept    reporters (containing reified scripts).

    my most important accessor is

    nestedBlock()    - answer the command block I encompass, if any

    My command spec is %cmd

    evaluate() returns my nested block or null
*/

// CommandSlotMorph inherits from ArgMorph:

CommandSlotMorph.prototype = new ArgMorph();
CommandSlotMorph.prototype.constructor = CommandSlotMorph;
CommandSlotMorph.uber = ArgMorph.prototype;

// CommandSlotMorph instance creation:

function CommandSlotMorph() {
    this.init();
}

CommandSlotMorph.prototype.init = function () {
    CommandSlotMorph.uber.init.call(this);
    this.color = new Color(0, 17, 173);
    this.setExtent(new Point(230, this.corner * 4 + this.cSlotPadding));
};

CommandSlotMorph.prototype.getSpec = function () {
    return '%cmd';
};

// CommandSlotMorph enumerating:

CommandSlotMorph.prototype.topBlock = function () {
    if (this.parent.topBlock) {
        return this.parent.topBlock();
    }
    return this.nestedBlock();
};

// CommandSlotMorph nesting:

CommandSlotMorph.prototype.nestedBlock = function (block) {
    if (block) {
        var nb = this.nestedBlock();
        this.add(block);
        if (nb) {
            block.bottomBlock().nextBlock(nb);
        }
        this.fixLayout();
    } else {
        return detect(
            this.children,
            function (child) {
                return child instanceof CommandBlockMorph;
            }
        );
    }
};

// CommandSlotMorph attach targets:

CommandSlotMorph.prototype.slotAttachPoint = function () {
    return new Point(
        this.dentCenter(),
        this.top() + this.corner * 2
    );
};

CommandSlotMorph.prototype.dentLeft = function () {
    return this.left()
        + this.corner
        + this.inset * 2;
};

CommandSlotMorph.prototype.dentCenter = function () {
    return this.dentLeft()
        + this.corner
        + (this.dent * 0.5);
};

CommandSlotMorph.prototype.attachTargets = function () {
    var answer = [];
    answer.push({
        point: this.slotAttachPoint(),
        element: this,
        loc: 'bottom',
        type: 'slot'
    });
    return answer;
};

// CommandSlotMorph layout:

CommandSlotMorph.prototype.fixLayout = function () {
    var nb = this.nestedBlock();
    if (this.parent) {
        if (!this.color.eq(this.parent.color)) {
            this.setColor(this.parent.color);
        }
    }
    if (nb) {
        nb.setPosition(
            new Point(
                this.left() + this.edge + this.rfBorder,
                this.top() + this.edge + this.rfBorder
            )
        );
        this.setWidth(nb.fullBounds().width()
            + (this.edge + this.rfBorder) * 2
            );
        this.setHeight(nb.fullBounds().height()
            + this.edge + (this.rfBorder * 2) - (this.corner - this.edge)
            );
    } else {
        this.setHeight(this.corner * 4);
        this.setWidth(
            this.corner * 4
                + this.inset
                + this.dent
        );
    }
    if (this.parent.fixLayout) {
        this.parent.fixLayout();
    }
};

// CommandSlotMorph evaluating:

CommandSlotMorph.prototype.evaluate = function () {
    return this.nestedBlock();
};

CommandSlotMorph.prototype.isEmptySlot = function () {
    return this.nestedBlock() === null;
};

// CommandSlotMorph context menu ops

CommandSlotMorph.prototype.attach = function () {
    // for context menu demo and testing purposes
    // override inherited version to adjust new owner's layout
    var choices = this.overlappedMorphs(),
        menu = new MenuMorph(this, 'choose new parent:'),
        myself = this;

    choices.forEach(function (each) {
        menu.addItem(each.toString().slice(0, 50), function () {
            each.add(myself);
            myself.isDraggable = false;
            if (each.fixLayout) {
                each.fixLayout();
            }
        });
    });
    if (choices.length > 0) {
        menu.popUpAtHand(this.world());
    }
};

// CommandSlotMorph drawing:

CommandSlotMorph.prototype.drawNew = function () {
    var context;
    this.cachedClr = this.color.toString();
    this.cachedClrBright = this.bright();
    this.cachedClrDark = this.dark();
    this.image = newCanvas(this.extent());
    context = this.image.getContext('2d');
    context.fillStyle = this.cachedClr;
    context.fillRect(0, 0, this.width(), this.height());

    // draw the 'flat' shape:
    context.fillStyle = this.rfColor.toString();
    this.drawFlat(context);

    // add 3D-Effect:
    this.drawEdges(context);
};

CommandSlotMorph.prototype.drawFlat = function (context) {
    var isFilled = this.nestedBlock() !== null,
        ins = (isFilled ? this.inset : this.inset / 2),
        dent = (isFilled ? this.dent : this.dent / 2),
        indent = this.corner * 2 + ins,
        edge = this.edge,
        rf = (isFilled ? this.rfBorder : 0),
        y = this.height() - this.corner - edge;

    context.beginPath();

    // top left:
    context.arc(
        this.corner + edge,
        this.corner + edge,
        this.corner,
        radians(-180),
        radians(-90),
        false
    );

    // dent:
    context.lineTo(this.corner + ins + edge + rf * 2, edge);
    context.lineTo(indent + edge + rf * 2, this.corner + edge);
    context.lineTo(
        indent + edge  + rf * 2 + (dent - rf * 2),
        this.corner + edge
    );
    context.lineTo(
        indent + edge  + rf * 2 + (dent - rf * 2) + this.corner,
        edge
    );
    context.lineTo(this.width() - this.corner - edge, edge);

    // top right:
    context.arc(
        this.width() - this.corner - edge,
        this.corner + edge,
        this.corner,
        radians(-90),
        radians(-0),
        false
    );

    // bottom right:
    context.arc(
        this.width() - this.corner - edge,
        y,
        this.corner,
        radians(0),
        radians(90),
        false
    );

    // bottom left:
    context.arc(
        this.corner + edge,
        y,
        this.corner,
        radians(90),
        radians(180),
        false
    );

    context.closePath();
    context.fill();

};

CommandSlotMorph.prototype.drawEdges = function (context) {
    var isFilled = this.nestedBlock() !== null,
        ins = (isFilled ? this.inset : this.inset / 2),
        dent = (isFilled ? this.dent : this.dent / 2),
        indent = this.corner * 2 + ins,
        edge = this.edge,
        rf = (isFilled ? this.rfBorder : 0),
        shift = this.edge * 0.5,
        gradient,
        upperGradient,
        lowerGradient,
        rightGradient;

    context.lineWidth = this.edge;
    context.lineJoin = 'round';
    context.lineCap = 'round';


    // bright:
    // bottom horizontal line
    gradient = context.createLinearGradient(
        0,
        this.height(),
        0,
        this.height() - this.edge
    );
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrBright);

    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(this.corner + edge, this.height() - shift);
    context.lineTo(
        this.width() - this.corner - edge,
        this.height() - shift
    );
    context.stroke();

    // bottom right corner
    gradient = context.createRadialGradient(
        this.width() - (this.corner + edge),
        this.height() - (this.corner + edge),
        this.corner,
        this.width() - (this.corner + edge),
        this.height() - (this.corner + edge),
        this.corner + edge
    );
    gradient.addColorStop(0, this.cachedClrBright);
    gradient.addColorStop(1, this.cachedClr);

    context.strokeStyle = gradient;
    context.beginPath();
    context.arc(
        this.width() - (this.corner + edge),
        this.height() - (this.corner + edge),
        this.corner + shift,
        radians(0),
        radians(90),
        false
    );
    context.stroke();

    // right vertical line
    gradient = context.createLinearGradient(
        this.width(),
        0,
        this.width() - this.edge,
        0
    );
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrBright);

    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(
        this.width() - shift,
        this.height() - this.corner - this.edge
    );
    context.lineTo(this.width() - shift, edge + this.corner);
    context.stroke();

    context.shadowOffsetY = shift;
    context.shadowBlur = this.edge;
    context.shadowColor = this.rfColor.darker(80).toString();

    // left vertical side
    gradient = context.createLinearGradient(
        0,
        0,
        edge,
        0
    );
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrDark);

    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(shift, edge + this.corner);
    context.lineTo(shift, this.height() - edge - this.corner);
    context.stroke();

    // upper left corner
    gradient = context.createRadialGradient(
        this.corner + edge,
        this.corner + edge,
        this.corner,
        this.corner + edge,
        this.corner + edge,
        this.corner + edge
    );
    gradient.addColorStop(0, this.cachedClrDark);
    gradient.addColorStop(1, this.cachedClr);

    context.strokeStyle = gradient;
    context.beginPath();
    context.arc(
        this.corner + edge,
        this.corner + edge,
        this.corner + shift,
        radians(-180),
        radians(-90),
        false
    );
    context.stroke();

    // upper edge (left side)
    upperGradient = context.createLinearGradient(
        0,
        0,
        0,
        this.edge
    );
    upperGradient.addColorStop(0, this.cachedClr);
    upperGradient.addColorStop(1, this.cachedClrDark);

    context.strokeStyle = upperGradient;
    context.beginPath();
    context.moveTo(this.corner + edge, shift);
    context.lineTo(
        this.corner + ins + edge + rf * 2 - shift,
        shift
    );
    context.stroke();

    // dent bottom
    lowerGradient = context.createLinearGradient(
        0,
        this.corner,
        0,
        this.corner + edge
    );
    lowerGradient.addColorStop(0, this.cachedClr);
    lowerGradient.addColorStop(1, this.cachedClrDark);

    context.strokeStyle = lowerGradient;
    context.beginPath();
    context.moveTo(indent + edge + rf * 2 + shift, this.corner + shift);
    context.lineTo(
        indent + edge  + rf * 2 + (dent - rf * 2),
        this.corner + shift
    );
    context.stroke();

    // dent right edge
    rightGradient = context.createLinearGradient(
        indent + edge  + rf * 2 + (dent - rf * 2) - shift,
        this.corner,
        indent + edge  + rf * 2 + (dent - rf * 2) + shift * 0.7,
        this.corner + shift + shift * 0.7
    );
    rightGradient.addColorStop(0, this.cachedClr);
    rightGradient.addColorStop(1, this.cachedClrDark);

    context.strokeStyle = rightGradient;
    context.beginPath();
    context.moveTo(
        indent + edge  + rf * 2 + (dent - rf * 2),
        this.corner + shift
    );
    context.lineTo(
        indent + edge  + rf * 2 + (dent - rf * 2) + this.corner,
        shift
    );
    context.stroke();

    // upper edge (right side)
    context.strokeStyle = upperGradient;
    context.beginPath();
    context.moveTo(
        indent + edge  + rf * 2 + (dent - rf * 2) + this.corner,
        shift
    );
    context.lineTo(this.width() - this.corner - edge, shift);
    context.stroke();
};

// RingCommandSlotMorph ///////////////////////////////////////////////////

/*
    I am a CommandBlock-shaped input slot for use in RingMorphs.
    I can only nest command blocks, not reporters.

    My command spec is %rc

    evaluate() returns my nested block or null
    (inherited from CommandSlotMorph)
*/

// RingCommandSlotMorph inherits from CommandSlotMorph:

RingCommandSlotMorph.prototype = new CommandSlotMorph();
RingCommandSlotMorph.prototype.constructor = RingCommandSlotMorph;
RingCommandSlotMorph.uber = CommandSlotMorph.prototype;

// RingCommandSlotMorph preferences settings

RingCommandSlotMorph.prototype.rfBorder = 0;
RingCommandSlotMorph.prototype.edge = RingMorph.prototype.edge;

// RingCommandSlotMorph instance creation:

function RingCommandSlotMorph() {
    this.init();
}

RingCommandSlotMorph.prototype.init = function () {
    RingCommandSlotMorph.uber.init.call(this);
    this.isHole = true;
    this.noticesTransparentClick = true;
    this.color = new Color(0, 17, 173);
    this.alpha = RingMorph.prototype.alpha;
    this.contrast = RingMorph.prototype.contrast;
};

RingCommandSlotMorph.prototype.getSpec = function () {
    return '%rc';
};

// RingCommandSlotMorph drawing:

RingCommandSlotMorph.prototype.drawNew = function () {
    var context;
    this.cachedClr = this.color.toString();
    this.cachedClrBright = this.bright();
    this.cachedClrDark = this.dark();
    this.image = newCanvas(this.extent());
    context = this.image.getContext('2d');
    context.fillStyle = this.cachedClr;

    // draw the 'flat' shape:
    this.drawFlat(context);

    // add 3D-Effect:
    this.drawEdges(context);
};

RingCommandSlotMorph.prototype.drawFlat = function (context) {
    var isFilled = this.nestedBlock() !== null,
        ins = (isFilled ? this.inset : this.inset / 2),
        dent = (isFilled ? this.dent : this.dent / 2),
        indent = this.corner * 2 + ins,
        edge = this.edge,
        w = this.width(),
        h = this.height(),
        rf = (isFilled ? this.rfBorder : 0),
        y = h - this.corner - edge;

    // top half:

    context.beginPath();
    context.moveTo(0, h / 2);
    context.lineTo(edge, h / 2);

    // top left:
    context.arc(
        this.corner + edge,
        this.corner + edge,
        this.corner,
        radians(-180),
        radians(-90),
        false
    );

    // dent:
    context.lineTo(this.corner + ins + edge + rf * 2, edge);
    context.lineTo(indent + edge + rf * 2, this.corner + edge);
    context.lineTo(
        indent + edge  + rf * 2 + (dent - rf * 2),
        this.corner + edge
    );
    context.lineTo(
        indent + edge  + rf * 2 + (dent - rf * 2) + this.corner,
        edge
    );
    context.lineTo(this.width() - this.corner - edge, edge);

    // top right:
    context.arc(
        w - this.corner - edge,
        this.corner + edge,
        this.corner,
        radians(-90),
        radians(-0),
        false
    );

    context.lineTo(w - this.edge, h / 2);
    context.lineTo(w, h / 2);
    context.lineTo(w, 0);
    context.lineTo(0, 0);
    context.closePath();
    context.fill();

    // bottom half:
    context.beginPath();
    context.moveTo(w, h / 2);
    context.lineTo(w - edge, h / 2);

    // bottom right:
    context.arc(
        this.width() - this.corner - edge,
        y,
        this.corner,
        radians(0),
        radians(90),
        false
    );

    // bottom left:
    context.arc(
        this.corner + edge,
        y,
        this.corner,
        radians(90),
        radians(180),
        false
    );

    context.lineTo(edge, h / 2);
    context.lineTo(0, h / 2);
    context.lineTo(0, h);
    context.lineTo(w, h);
    context.closePath();
    context.fill();

};

// CSlotMorph ////////////////////////////////////////////////////

/*
    I am a C-shaped input slot. I can nest command blocks and also accept
    reporters (containing reified scripts).

    my most important accessor is

    nestedBlock()    - the command block I encompass, if any (inherited)

    My command spec is %c

    evaluate() returns my nested block or null
*/

// CSlotMorph inherits from CommandSlotMorph:

CSlotMorph.prototype = new CommandSlotMorph();
CSlotMorph.prototype.constructor = CSlotMorph;
CSlotMorph.uber = CommandSlotMorph.prototype;

// CSlotMorph instance creation:

function CSlotMorph() {
    this.init();
}

CSlotMorph.prototype.init = function () {
    CommandSlotMorph.uber.init.call(this);
    this.isHole = true;
    this.color = new Color(0, 17, 173);
    this.setExtent(new Point(230, this.corner * 4 + this.cSlotPadding));
};

CSlotMorph.prototype.getSpec = function () {
    return '%c';
};

// CSlotMorph layout:

CSlotMorph.prototype.fixLayout = function () {
    var nb = this.nestedBlock();
    if (nb) {
        nb.setPosition(
            new Point(
                this.left() + this.inset,
                this.top() + this.corner
            )
        );
        this.setHeight(nb.fullBounds().height() + this.corner);
        this.setWidth(nb.fullBounds().width() + (this.cSlotPadding * 2));
    } else {
        this.setHeight(this.corner * 4  + this.cSlotPadding); // default
        this.setWidth(
            this.corner * 4
                + (this.inset * 2)
                + this.dent
                + (this.cSlotPadding * 2)
        ); // default
    }
    if (this.parent.fixLayout) {
        this.parent.fixLayout();
    }
};

// CSlotMorph drawing:

CSlotMorph.prototype.drawNew = function () {
    var context;
    this.cachedClr = this.color.toString();
    this.cachedClrBright = this.bright();
    this.cachedClrDark = this.dark();
    this.image = newCanvas(this.extent());
    context = this.image.getContext('2d');
    context.fillStyle = this.cachedClr;

    // draw the 'flat' shape:
    this.drawFlat(context);

    // add 3D-Effect:
    this.drawTopRightEdge(context);
    this.drawTopEdge(context, this.inset, this.corner);
    this.drawTopLeftEdge(context);
    this.drawBottomEdge(context);
    this.drawRightEdge(context);
};

CSlotMorph.prototype.drawFlat = function (context) {
    context.beginPath();

    // top line:
    context.moveTo(0, 0);
    context.lineTo(this.width(), 0);

    // top right:
    context.arc(
        this.width() - this.corner,
        0,
        this.corner,
        radians(90),
        radians(0),
        true
    );

    // jigsaw shape:
    context.lineTo(this.width() - this.corner, this.corner);
    context.lineTo(
        (this.inset * 2) + (this.corner * 3) + this.dent,
        this.corner
    );
    context.lineTo(
        (this.inset * 2) + (this.corner * 2) + this.dent,
        this.corner * 2
    );
    context.lineTo(
        (this.inset * 2) + (this.corner * 2),
        this.corner * 2
    );
    context.lineTo(
        (this.inset * 2) + this.corner,
        this.corner
    );
    context.lineTo(
        this.inset + this.corner,
        this.corner
    );
    context.arc(
        this.inset + this.corner,
        this.corner * 2,
        this.corner,
        radians(270),
        radians(180),
        true
    );

    // bottom:
    context.lineTo(
        this.inset,
        this.height() - (this.corner * 2)
    );
    context.arc(
        this.inset + this.corner,
        this.height() - (this.corner * 2),
        this.corner,
        radians(180),
        radians(90),
        true
    );
    context.lineTo(
        this.width() - this.corner,
        this.height() - this.corner
    );
    context.arc(
        this.width() - this.corner,
        this.height(),
        this.corner,
        radians(-90),
        radians(-0),
        false
    );
    context.lineTo(0, this.height());

    // fill:
    context.closePath();
    context.fill();
};

CSlotMorph.prototype.drawTopRightEdge = function (context) {
    var shift = this.edge * 0.5,
        x = this.width() - this.corner,
        y = 0,
        gradient;

    gradient = context.createRadialGradient(
        x,
        y,
        this.corner,
        x,
        y,
        this.corner - this.edge
    );
    gradient.addColorStop(0, this.cachedClrDark);
    gradient.addColorStop(1, this.cachedClr);

    context.lineWidth = this.edge;
    context.lineJoin = 'round';
    context.lineCap = 'round';

    context.strokeStyle = gradient;

    context.beginPath();
    context.arc(
        x,
        y,
        this.corner - shift,
        radians(90),
        radians(0),
        true
    );
    context.stroke();
};

CSlotMorph.prototype.drawTopEdge = function (context, x, y) {
    var shift = this.edge * 0.5,
        indent = x + this.corner * 2 + this.inset,
        upperGradient,
        lowerGradient,
        rightGradient;

    context.lineWidth = this.edge;
    context.lineJoin = 'round';
    context.lineCap = 'round';

    upperGradient = context.createLinearGradient(
        0,
        y - this.edge,
        0,
        y
    );
    upperGradient.addColorStop(0, this.cachedClr);
    upperGradient.addColorStop(1, this.cachedClrDark);

    context.strokeStyle = upperGradient;
    context.beginPath();
    context.moveTo(x + this.corner, y - shift);
    context.lineTo(x + this.corner + this.inset - shift, y - shift);
    context.stroke();

    lowerGradient = context.createLinearGradient(
        0,
        y + this.corner - this.edge,
        0,
        y + this.corner
    );
    lowerGradient.addColorStop(0, this.cachedClr);
    lowerGradient.addColorStop(1, this.cachedClrDark);

    context.strokeStyle = lowerGradient;
    context.beginPath();
    context.moveTo(indent + shift, y + this.corner - shift);
    context.lineTo(indent + this.dent, y + this.corner - shift);
    context.stroke();

    rightGradient = context.createLinearGradient(
        (x + this.inset + (this.corner * 2) + this.dent) - shift,
        (y + this.corner - shift) - shift,
        (x + this.inset + (this.corner * 2) + this.dent) + (shift * 0.7),
        (y + this.corner - shift) + (shift * 0.7)
    );
    rightGradient.addColorStop(0, this.cachedClr);
    rightGradient.addColorStop(1, this.cachedClrDark);


    context.strokeStyle = rightGradient;
    context.beginPath();
    context.moveTo(
        x + this.inset + (this.corner * 2) + this.dent,
        y + this.corner - shift
    );
    context.lineTo(
        x + this.corner * 3 + this.inset + this.dent,
        y - shift
    );
    context.stroke();

    context.strokeStyle = upperGradient;
    context.beginPath();
    context.moveTo(
        x + this.corner * 3 + this.inset + this.dent,
        y - shift
    );
    context.lineTo(this.width() - this.corner, y - shift);
    context.stroke();
};

CSlotMorph.prototype.drawTopLeftEdge = function (context) {
    var shift = this.edge * 0.5,
        gradient;

    gradient = context.createRadialGradient(
        this.corner + this.inset,
        this.corner * 2,
        this.corner,
        this.corner + this.inset,
        this.corner * 2,
        this.corner + this.edge
    );
    gradient.addColorStop(0, this.cachedClrDark);
    gradient.addColorStop(1, this.cachedClr);

    context.lineWidth = this.edge;
    context.lineJoin = 'round';
    context.lineCap = 'round';

    context.strokeStyle = gradient;

    context.beginPath();
    context.arc(
        this.corner + this.inset,
        this.corner * 2,
        this.corner + shift,
        radians(-180),
        radians(-90),
        false
    );
    context.stroke();
};

CSlotMorph.prototype.drawRightEdge = function (context) {
    var shift = this.edge * 0.5,
        x = this.inset,
        gradient;

    gradient = context.createLinearGradient(x - this.edge, 0, x, 0);
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrDark);

    context.lineWidth = this.edge;
    context.lineJoin = 'round';
    context.lineCap = 'round';

    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(x - shift, this.corner * 2);
    context.lineTo(x - shift, this.height() - this.corner * 2);
    context.stroke();
};

CSlotMorph.prototype.drawBottomEdge = function (context) {
    var shift = this.edge * 0.5,
        gradient,
        upperGradient;

    context.lineWidth = this.edge;
    context.lineJoin = 'round';
    context.lineCap = 'round';

    upperGradient = context.createRadialGradient(
        this.corner + this.inset,
        this.height() - (this.corner * 2),
        this.corner, /*- this.edge*/ // uncomment for half-tone
        this.corner + this.inset,
        this.height() - (this.corner * 2),
        this.corner + this.edge
    );
    upperGradient.addColorStop(0, this.cachedClrBright);
    upperGradient.addColorStop(1, this.cachedClr);
    context.strokeStyle = upperGradient;
    context.beginPath();
    context.arc(
        this.corner + this.inset,
        this.height() - (this.corner * 2),
        this.corner + shift,
        radians(180),
        radians(90),
        true
    );
    context.stroke();

    gradient = context.createLinearGradient(
        0,
        this.height() - this.corner,
        0,
        this.height() - this.corner + this.edge
    );
    gradient.addColorStop(0, this.cachedClrBright);
    gradient.addColorStop(1, this.cachedClr);

    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(
        this.inset + this.corner,
        this.height() - this.corner + shift
    );
    context.lineTo(
        this.width() - this.corner,
        this.height() - this.corner + shift
    );

    context.stroke();
};

// InputSlotMorph //////////////////////////////////////////////////////

/*
    I am an editable text input slot. I can be either rectangular or
    rounded, and can have an optional drop-down menu. If I'm set to
    read-only I must have a drop-down menu and will assume a darker
    shade of my    parent's color.

    my most important public attributes and accessors are:

    setContents(str/float)    - display the argument (string or float)
    contents().text            - get the displayed string
    choices                    - a key/value list for my optional drop-down
    isReadOnly                - governs whether I am editable or not
    isNumeric                - governs my outer shape (round or rect)

    my block specs are:

    %s        - string input, rectangular
    %n        - numerical input, semi-circular vertical edges
    %anyUE    - any unevaluated

    evaluate() returns my displayed string, cast to float if I'm numerical

    there are also a number of specialized drop-down menu presets, refer
    to BlockMorph for details.
*/

// InputSlotMorph inherits from ArgMorph:

InputSlotMorph.prototype = new ArgMorph();
InputSlotMorph.prototype.constructor = InputSlotMorph;
InputSlotMorph.uber = ArgMorph.prototype;

// InputSlotMorph preferences settings:

InputSlotMorph.prototype.executeOnSliderEdit = false;

// InputSlotMorph instance creation:

function InputSlotMorph(text, isNumeric, choiceDict, isReadOnly) {
    this.init(text, isNumeric, choiceDict, isReadOnly);
}

InputSlotMorph.prototype.init = function (
    text,
    isNumeric,
    choiceDict,
    isReadOnly
) {
    var contents = new StringMorph(''),
        arrow = new ArrowMorph(
            'down',
            0,
            Math.max(Math.floor(this.fontSize / 6), 1)
        );

    contents.fontSize = this.fontSize;
    contents.isShowingBlanks = true;
    contents.drawNew();

    this.isUnevaluated = false;
    this.choices = choiceDict || null; // object, function or selector
    this.oldContentsExtent = contents.extent();
    this.isNumeric = isNumeric || false;
    this.isReadOnly = isReadOnly || false;
    this.minWidth = 0; // can be chaged for text-type inputs ("landscape")
    this.constant = null;

    InputSlotMorph.uber.init.call(this);
    this.color = new Color(255, 255, 255);
    this.add(contents);
    this.add(arrow);
    contents.isEditable = true;
    contents.isDraggable = false;
    contents.enableSelecting();
    this.setContents(text);
};

// InputSlotMorph accessing:

InputSlotMorph.prototype.getSpec = function () {
    if (this.isNumeric) {
        return '%n';
    }
    return '%s'; // default
};

InputSlotMorph.prototype.contents = function () {
    return detect(
        this.children,
        function (child) {
            return (child instanceof StringMorph);
        }
    );
};

InputSlotMorph.prototype.arrow = function () {
    return detect(
        this.children,
        function (child) {
            return (child instanceof ArrowMorph);
        }
    );
};

InputSlotMorph.prototype.setContents = function (aStringOrFloat) {
    var cnts = this.contents(),
        dta = aStringOrFloat,
        isConstant = dta instanceof Array;
    if (isConstant) {
        dta = localize(dta[0]);
    } else { // assume dta is a localizable choice if it's a key in my choices
        if (this.choices !== null && this.choices[dta] instanceof Array) {
            return this.setContents(this.choices[dta]);
        }
    }
    cnts.text = dta;
    if (isNil(dta)) {
        cnts.text = '';
    } else if (dta.toString) {
        cnts.text = dta.toString();
    }
    cnts.drawNew();

    // adjust to zebra coloring:
    if (this.isReadOnly && (this.parent instanceof BlockMorph)) {
        this.parent.fixLabelColor();
    }

    // remember the constant, if any
    this.constant = isConstant ? aStringOrFloat : null;
};

// InputSlotMorph drop-down menu:

InputSlotMorph.prototype.dropDownMenu = function () {
    var choices = this.choices,
        key,
        menu = new MenuMorph(
            this.setContents,
            null,
            this,
            this.fontSize
        );

    if (choices instanceof Function) {
        choices = choices.call(this);
    } else if (isString(choices)) {
        choices = this[choices]();
    }
    if (!choices) {
        return null;
    }
    menu.addItem(' ', null);
    for (key in choices) {
        if (choices.hasOwnProperty(key)) {
            if (key[0] === '~') {
                menu.addLine();
            } else {
                menu.addItem(key, choices[key]);
            }
        }
    }
    if (menu.items.length > 0) {
        menu.popUpAtHand(this.world());
    } else {
        return null;
    }
};

InputSlotMorph.prototype.messagesMenu = function () {
    var dict = {},
        rcvr = this.parentThatIsA(BlockMorph).receiver(),
        stage = rcvr.parentThatIsA(StageMorph),
        myself = this,
        allNames = [];

    stage.children.concat(stage).forEach(function (morph) {
        if (morph instanceof SpriteMorph || morph instanceof StageMorph) {
            allNames = allNames.concat(morph.allMessageNames());
        }
    });
    allNames.forEach(function (name) {
        dict[name] = name;
    });
    if (allNames.length > 0) {
        dict['~'] = null;
    }
    dict['new...'] = function () {

        new DialogBoxMorph(
            myself,
            myself.setContents,
            myself
        ).prompt(
            'Message name',
            null,
            myself.world()
        );
    };

    return dict;
};

InputSlotMorph.prototype.collidablesMenu = function () {
    var dict = {
            'mouse-pointer' : ['mouse-pointer'],
            edge : ['edge'],
            'pen trails' : ['pen trails']
        },
        rcvr = this.parentThatIsA(BlockMorph).receiver(),
        stage = rcvr.parentThatIsA(StageMorph),
        allNames = [];

    stage.children.forEach(function (morph) {
        if (morph instanceof SpriteMorph) {
            if (morph.name !== rcvr.name) {
                allNames = allNames.concat(morph.name);
            }
        }
    });
    if (allNames.length > 0) {
        dict['~'] = null;
        allNames.forEach(function (name) {
            dict[name] = name;
        });
    }
    return dict;
};

InputSlotMorph.prototype.distancesMenu = function () {
    var dict = {
            'mouse-pointer' : ['mouse-pointer']
        },
        rcvr = this.parentThatIsA(BlockMorph).receiver(),
        stage = rcvr.parentThatIsA(StageMorph),
        allNames = [];

    stage.children.forEach(function (morph) {
        if (morph instanceof SpriteMorph) {
            if (morph.name !== rcvr.name) {
                allNames = allNames.concat(morph.name);
            }
        }
    });
    if (allNames.length > 0) {
        dict['~'] = null;
        allNames.forEach(function (name) {
            dict[name] = name;
        });
    }
    return dict;
};

InputSlotMorph.prototype.clonablesMenu = function () {
    var dict = {},
        rcvr = this.parentThatIsA(BlockMorph).receiver(),
        stage = rcvr.parentThatIsA(StageMorph),
        allNames = [];

    if (rcvr instanceof SpriteMorph) {
        dict.myself = ['myself'];
    }
    stage.children.forEach(function (morph) {
        if (morph instanceof SpriteMorph && !morph.isClone) {
            allNames = allNames.concat(morph.name);
        }
    });
    if (allNames.length > 0) {
        dict['~'] = null;
        allNames.forEach(function (name) {
            dict[name] = name;
        });
    }
    return dict;
};

InputSlotMorph.prototype.objectsMenu = function () {
    var rcvr = this.parentThatIsA(BlockMorph).receiver(),
        stage = rcvr.parentThatIsA(StageMorph),
        dict = {},
        allNames = [];

    dict[stage.name] = stage.name;
    stage.children.forEach(function (morph) {
        if (morph instanceof SpriteMorph) {
            allNames.push(morph.name);
        }
    });
    if (allNames.length > 0) {
        dict['~'] = null;
        allNames.forEach(function (name) {
            dict[name] = name;
        });
    }
    return dict;
};

InputSlotMorph.prototype.attributesMenu = function () {
    var block = this.parentThatIsA(BlockMorph),
        objName = block.inputs()[1].evaluate(),
        rcvr = block.receiver(),
        stage = rcvr.parentThatIsA(StageMorph),
        obj,
        dict = {},
        varNames = [];

    if (objName === stage.name) {
        obj = stage;
    } else {
        obj = detect(
            stage.children,
            function (morph) {
                return morph.name === objName;
            }
        );
    }
    if (!obj) {
        return dict;
    }
    if (obj instanceof SpriteMorph) {
        dict = {
            'x position' : ['x position'],
            'y position' : ['y position'],
            'direction' : ['direction'],
            'costume #' : ['costume #'],
            'costume name' : ['costume name'],
            'size' : ['size']
        };
    } else { // the stage
        dict = {
            'costume #' : ['costume #'],
            'costume name' : ['costume name']
        };
    }
    varNames = obj.variables.names();
    if (varNames.length > 0) {
        dict['~'] = null;
        varNames.forEach(function (name) {
            dict[name] = name;
        });
    }
    return dict;
};

InputSlotMorph.prototype.costumesMenu = function () {
    var rcvr = this.parentThatIsA(BlockMorph).receiver(),
        dict,
        allNames = [];
    if (rcvr instanceof SpriteMorph) {
        dict = {Turtle : ['Turtle']};
    } else { // stage
        dict = {Empty : ['Empty']};
    }
    rcvr.costumes.asArray().forEach(function (costume) {
        allNames = allNames.concat(costume.name);
    });
    if (allNames.length > 0) {
        dict['~'] = null;
        allNames.forEach(function (name) {
            dict[name] = name;
        });
    }
    return dict;
};

InputSlotMorph.prototype.soundsMenu = function () {
    var rcvr = this.parentThatIsA(BlockMorph).receiver(),
        allNames = [],
        dict = {};

    rcvr.sounds.asArray().forEach(function (sound) {
        allNames = allNames.concat(sound.name);
    });
    if (allNames.length > 0) {
        allNames.forEach(function (name) {
            dict[name] = name;
        });
    }
    return dict;
};

InputSlotMorph.prototype.getVarNamesDict = function () {
    var block = this.parentThatIsA(BlockMorph),
        rcvr,
        proto,
        rings,
        declarations,
        tempVars = [],
        dict;

    if (!block) {
        return {};
    }
    rcvr = block.receiver();

    proto = detect(block.allParents(), function (morph) {
        return morph instanceof PrototypeHatBlockMorph;
    });
    if (proto) {
        tempVars = proto.inputs()[0].inputFragmentNames();
    }

    rings = block.allParents().filter(function (block) {
        return block instanceof RingMorph;
    });
    rings.forEach(function (block) {
        tempVars = tempVars.concat(block.inputs()[1].evaluate());
    });

    declarations = block.allParents().filter(function (block) {
        return block.selector === 'doDeclareVariables';
    });
    declarations.forEach(function (block) {
        tempVars = tempVars.concat(block.inputs()[0].evaluate());
    });

    if (rcvr) {
        dict = rcvr.variables.allNamesDict();
        tempVars.forEach(function (name) {
            dict[name] = name;
        });
        return dict;
    }
    return {};
};

// InputSlotMorph layout:

InputSlotMorph.prototype.fixLayout = function () {
    var contents = this.contents(),
        arrow = this.arrow();

    contents.isNumeric = this.isNumeric;
    contents.isEditable = (!this.isReadOnly);
    if (this.isReadOnly) {
        contents.disableSelecting();
        contents.color = new Color(254, 254, 254);
    } else {
        contents.enableSelecting();
        contents.color = new Color(0, 0, 0);
    }

    if (this.choices) {
        arrow.setSize(this.fontSize);
        arrow.show();
    } else {
        arrow.setSize(0);
        arrow.hide();
    }
    this.setHeight(
        contents.height()
            + this.edge * 2
            // + this.typeInPadding * 2
    );
    if (this.isNumeric) {
        this.setWidth(contents.width()
            + Math.floor(arrow.width() * 0.5)
            + this.height()
            + this.typeInPadding * 2
            );
    } else {
        this.setWidth(Math.max(
            contents.width()
                + arrow.width()
                + this.edge * 2
                + this.typeInPadding * 2,
            contents.rawHeight() + arrow.width(),
            this.minWidth // for text-type slots
        ));
    }
    if (this.isNumeric) {
        contents.setPosition(new Point(
            Math.floor(this.height() / 2),
            this.edge
        ).add(new Point(this.typeInPadding, 0)).add(this.position()));
    } else {
        contents.setPosition(new Point(
            this.edge,
            this.edge
        ).add(new Point(this.typeInPadding, 0)).add(this.position()));
    }

    arrow.setPosition(new Point(
        this.right() - arrow.width() - this.edge,
        contents.top()
    ));

    if (this.parent) {
        if (this.parent.fixLayout) {
            if (this.world()) {
                this.startLayout();
                this.parent.fixLayout();
                this.endLayout();
            } else {
                this.parent.fixLayout();
            }
        }
    }
};

// InputSlotMorph events:

InputSlotMorph.prototype.mouseClickLeft = function (pos) {
    if (this.arrow().bounds.containsPoint(pos)) {
        this.dropDownMenu();
    } else if (this.isReadOnly) {
        this.dropDownMenu();
    } else {
        this.contents().edit();
        this.contents().selectAll();
    }
};

InputSlotMorph.prototype.reactToKeystroke = function () {
    this.constant = null;
};

InputSlotMorph.prototype.reactToEdit = function () {
    this.contents().clearSelection();
};

InputSlotMorph.prototype.reactToSliderEdit = function () {
/*
    directly execute the stack of blocks I'm part of if my
    "executeOnSliderEdit" setting is turned on, obeying the stage's
    thread safety setting. This feature allows for "Bret Victor" style
    interactive coding.
*/
    var block, top, receiver, stage;
    if (!this.executeOnSliderEdit) {return; }
    block = this.parentThatIsA(BlockMorph);
    if (block) {
        top = block.topBlock();
        receiver = top.receiver();
        if (top instanceof PrototypeHatBlockMorph) {
            return;
        }
        if (receiver) {
            stage = receiver.parentThatIsA(StageMorph);
            if (stage && stage.isThreadSafe) {
                stage.threads.startProcess(top, stage.isThreadSafe);
            } else {
                top.mouseClickLeft();
            }
        }
    }
};

// InputSlotMorph evaluating:

InputSlotMorph.prototype.evaluate = function () {
/*
    answer my content's text string. If I am numerical convert that
    string to a number. If the conversion fails answer the string
    (e.g. for special choices like 'any', 'all' or 'last') otherwise
    the numerical value.
*/
    var num,
        contents = this.contents();
    if (this.constant) {
        return this.constant;
    }
    if (this.isNumeric) {
        num = parseFloat(contents.text || '0');
        if (!isNaN(num)) {
            return num;
        }
    }
    return contents.text;
};

InputSlotMorph.prototype.isEmptySlot = function () {
    return this.contents().text === '';
};

// InputSlotMorph drawing:

InputSlotMorph.prototype.drawNew = function () {
    var context, borderColor, r;

    // initialize my surface property
    this.image = newCanvas(this.extent());
    context = this.image.getContext('2d');
    if (this.parent) {
        borderColor = this.parent.color;
    } else {
        borderColor = new Color(120, 120, 120);
    }
    context.fillStyle = this.color.toString();
    if (this.isReadOnly) {
        context.fillStyle = borderColor.darker().toString();
    }

    // cache my border colors
    this.cachedClr = borderColor.toString();
    this.cachedClrBright = borderColor.lighter(this.contrast)
        .toString();
    this.cachedClrDark = borderColor.darker(this.contrast).toString();

    if (!this.isNumeric) {
        context.fillRect(
            this.edge,
            this.edge,
            this.width() - this.edge * 2,
            this.height() - this.edge * 2
        );
        this.drawRectBorder(context);
    } else {
        r = (this.height() - (this.edge * 2)) / 2;
        context.fillStyle = this.color.toString();
        context.beginPath();
        context.arc(
            r + this.edge,
            r + this.edge,
            r,
            radians(90),
            radians(-90),
            false
        );
        context.arc(
            this.width() - r - this.edge,
            r + this.edge,
            r,
            radians(-90),
            radians(90),
            false
        );
        context.closePath();
        context.fill();
        this.drawRoundBorder(context);
    }
};

InputSlotMorph.prototype.drawRectBorder = function (context) {
    var shift = this.edge * 0.5,
        gradient;

    context.lineWidth = this.edge;
    context.lineJoin = 'round';
    context.lineCap = 'round';

    context.shadowOffsetY = shift;
    context.shadowBlur = this.edge;
    context.shadowColor = this.color.darker(80).toString();

    gradient = context.createLinearGradient(
        0,
        0,
        0,
        this.edge
    );
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrDark);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(this.edge, shift);
    context.lineTo(this.width() - this.edge - shift, shift);
    context.stroke();

    context.shadowOffsetY = 0;

    gradient = context.createLinearGradient(
        0,
        0,
        this.edge,
        0
    );
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrDark);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(shift, this.edge);
    context.lineTo(shift, this.height() - this.edge - shift);
    context.stroke();

    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowBlur = 0;

    gradient = context.createLinearGradient(
        0,
        this.height() - this.edge,
        0,
        this.height()
    );
    gradient.addColorStop(0, this.cachedClrBright);
    gradient.addColorStop(1, this.cachedClr);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(this.edge, this.height() - shift);
    context.lineTo(this.width() - this.edge, this.height() - shift);
    context.stroke();

    gradient = context.createLinearGradient(
        this.width() - this.edge,
        0,
        this.width(),
        0
    );
    gradient.addColorStop(0, this.cachedClrBright);
    gradient.addColorStop(1, this.cachedClr);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(this.width() - shift, this.edge);
    context.lineTo(this.width() - shift, this.height() - this.edge);
    context.stroke();

};

InputSlotMorph.prototype.drawRoundBorder = function (context) {
    var shift = this.edge * 0.5,
        r = (this.height() - (this.edge * 2)) / 2,
        start,
        end,
        gradient;

    context.lineWidth = this.edge;
    context.lineJoin = 'round';
    context.lineCap = 'round';

    // straight top edge:
    start = r + this.edge;
    end = this.width() - r - this.edge;
    if (end > start) {

        context.shadowOffsetX = shift;
        context.shadowOffsetY = shift;
        context.shadowBlur = this.edge;
        context.shadowColor = this.color.darker(80).toString();

        gradient = context.createLinearGradient(
            0,
            0,
            0,
            this.edge
        );
        gradient.addColorStop(0, this.cachedClr);
        gradient.addColorStop(1, this.cachedClrDark);
        context.strokeStyle = gradient;
        context.beginPath();

        context.moveTo(start, shift);
        context.lineTo(end, shift);
        context.stroke();

        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.shadowBlur = 0;
    }

    // straight bottom edge:
    gradient = context.createLinearGradient(
        0,
        this.height() - this.edge,
        0,
        this.height()
    );
    gradient.addColorStop(0, this.cachedClrBright);
    gradient.addColorStop(1, this.cachedClr);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(r + this.edge, this.height() - shift);
    context.lineTo(this.width() - r - this.edge, this.height() - shift);
    context.stroke();

    r = this.height() / 2;

    context.shadowOffsetX = shift;
    context.shadowOffsetY = shift;
    context.shadowBlur = this.edge;
    context.shadowColor = this.color.darker(80).toString();

    // top edge: left corner
    gradient = context.createRadialGradient(
        r,
        r,
        r - this.edge,
        r,
        r,
        r
    );
    gradient.addColorStop(1, this.cachedClr);
    gradient.addColorStop(0, this.cachedClrDark);
    context.strokeStyle = gradient;
    context.beginPath();
    context.arc(
        r,
        r,
        r - shift,
        radians(180),
        radians(270),
        false
    );

    context.stroke();

    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowBlur = 0;

    // bottom edge: right corner
    gradient = context.createRadialGradient(
        this.width() - r,
        r,
        r - this.edge,
        this.width() - r,
        r,
        r
    );
    gradient.addColorStop(1, this.cachedClr);
    gradient.addColorStop(0, this.cachedClrBright);
    context.strokeStyle = gradient;
    context.beginPath();
    context.arc(
        this.width() - r,
        r,
        r - shift,
        radians(0),
        radians(90),
        false
    );
    context.stroke();
};

// TemplateSlotMorph ///////////////////////////////////////////////////

/*
    I am a reporter block template sitting on a pedestal.
    My block spec is

    %t        - template

    evaluate returns the embedded reporter template's label string
*/

// TemplateSlotMorph inherits from ArgMorph:

TemplateSlotMorph.prototype = new ArgMorph();
TemplateSlotMorph.prototype.constructor = TemplateSlotMorph;
TemplateSlotMorph.uber = ArgMorph.prototype;

// TemplateSlotMorph instance creation:

function TemplateSlotMorph(name) {
    this.init(name);
}

TemplateSlotMorph.prototype.init = function (name) {
    var template = new ReporterBlockMorph();
    this.labelString = name || '';
    template.isDraggable = false;
    template.isTemplate = true;
    if (modules.objects !== undefined) {
        template.color = SpriteMorph.prototype.blockColor.variables;
        template.category = 'variables';
    } else {
        template.color = new Color(243, 118, 29);
        template.category = null;
    }
    template.setSpec(this.labelString);
    template.selector = 'reportGetVar';
    TemplateSlotMorph.uber.init.call(this);
    this.add(template);
    this.fixLayout();
    this.isDraggable = false;
    this.isStatic = true; // I cannot be exchanged
};

// TemplateSlotMorph accessing:

TemplateSlotMorph.prototype.getSpec = function () {
    return '%t';
};

TemplateSlotMorph.prototype.template = function () {
    return this.children[0];
};

TemplateSlotMorph.prototype.contents = function () {
    return this.template().blockSpec;
};

TemplateSlotMorph.prototype.setContents = function (aString) {
    var tmp = this.template();
    tmp.setSpec(aString);
    tmp.fixBlockColor(); // fix zebra coloring
    tmp.fixLabelColor();
};

// TemplateSlotMorph evaluating:

TemplateSlotMorph.prototype.evaluate = function () {
    return this.contents();
};

// TemplateSlotMorph layout:

TemplateSlotMorph.prototype.fixLayout = function () {
    var template = this.template();
    this.setExtent(template.extent().add(this.edge * 2 + 2));
    template.setPosition(this.position().add(this.edge + 1));
    if (this.parent) {
        if (this.parent.fixLayout) {
            this.parent.fixLayout();
        }
    }
};

// TemplateSlotMorph drawing:

TemplateSlotMorph.prototype.drawNew = function () {
    var context;
    if (this.parent instanceof Morph) {
        this.color = this.parent.color.copy();
    }
    this.cachedClr = this.color.toString();
    this.cachedClrBright = this.bright();
    this.cachedClrDark = this.dark();
    this.image = newCanvas(this.extent());
    context = this.image.getContext('2d');
    context.fillStyle = this.cachedClr;
    this.drawRounded(context);
};

TemplateSlotMorph.prototype.drawRounded = ReporterBlockMorph
    .prototype.drawRounded;

// BooleanSlotMorph ////////////////////////////////////////////////////

/*
    I am a diamond-shaped argument slot.
    My block spec is

    %b        - Boolean
    %boolUE    - Boolean unevaluated

    evaluate returns null
*/

// BooleanSlotMorph inherits from ArgMorph:

BooleanSlotMorph.prototype = new ArgMorph();
BooleanSlotMorph.prototype.constructor = BooleanSlotMorph;
BooleanSlotMorph.uber = ArgMorph.prototype;

// BooleanSlotMorph instance creation:

function BooleanSlotMorph() {
    this.init();
}

BooleanSlotMorph.prototype.init = function () {
    BooleanSlotMorph.uber.init.call(this);
};

BooleanSlotMorph.prototype.getSpec = function () {
    return '%b';
};

// BooleanSlotMorph drawing:

BooleanSlotMorph.prototype.drawNew = function () {
    var context;
    this.silentSetExtent(new Point(
        (this.fontSize + this.edge * 2) * 2,
        this.fontSize + this.edge * 2
    ));
    if (this.parent) {
        this.color = this.parent.color;
    }
    this.cachedClr = this.color.toString();
    this.cachedClrBright = this.bright();
    this.cachedClrDark = this.dark();
    this.image = newCanvas(this.extent());
    context = this.image.getContext('2d');
    this.drawDiamond(context, true);
};

BooleanSlotMorph.prototype.drawDiamond = function (context) {
    var w = this.width(),
        h = this.height(),
        r = h / 2,
        shift = this.edge / 2,
        gradient;

    // draw the 'flat' shape:
    context.fillStyle = this.color.darker(25).toString();
    context.beginPath();

    context.moveTo(0, r);
    context.lineTo(r, 0);
    context.lineTo(w - r, 0);
    context.lineTo(w, r);
    context.lineTo(w - r, h);
    context.lineTo(r, h);

    context.closePath();
    context.fill();

    // add 3D-Effect:
    context.lineWidth = this.edge;
    context.lineJoin = 'round';
    context.lineCap = 'round';

    context.shadowOffsetX = shift;
    context.shadowBlur = shift;
    context.shadowColor = 'black';

    // top edge: left corner
    gradient = context.createLinearGradient(
        0,
        r,
        this.edge * 0.6,
        r + (this.edge * 0.6)
    );
    gradient.addColorStop(1, this.cachedClrDark);
    gradient.addColorStop(0, this.cachedClr);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(shift, r);
    context.lineTo(r, shift);
    context.closePath();
    context.stroke();

    // top edge: straight line
    context.shadowOffsetX = 0;
    context.shadowOffsetY = shift;
    context.shadowBlur = this.edge;

    gradient = context.createLinearGradient(
        0,
        0,
        0,
        this.edge
    );
    gradient.addColorStop(1, this.cachedClrDark);
    gradient.addColorStop(0, this.cachedClr);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(r, shift);
    context.lineTo(w - r, shift);
    context.closePath();
    context.stroke();

    context.shadowOffsetY = 0;
    context.shadowBlur = 0;

    // bottom edge: right corner
    gradient = context.createLinearGradient(
        w - r - (this.edge * 0.6),
        h - (this.edge * 0.6),
        w - r,
        h
    );
    gradient.addColorStop(1, this.cachedClr);
    gradient.addColorStop(0, this.cachedClrBright);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(w - r, h - shift);
    context.lineTo(w - shift, r);
    context.closePath();
    context.stroke();

    // bottom edge: straight line
    gradient = context.createLinearGradient(
        0,
        h - this.edge,
        0,
        h
    );
    gradient.addColorStop(1, this.cachedClr);
    gradient.addColorStop(0, this.cachedClrBright);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(r, h - shift);
    context.lineTo(w - r - shift, h - shift);
    context.closePath();
    context.stroke();
};

// ArrowMorph //////////////////////////////////////////////////////////

/*
    I am a triangular arrow shape, for use in drop-down menus etc.
    My orientation is governed by my 'direction' property, which can be
    'down', 'up', 'left' or 'right'.
*/

// ArrowMorph inherits from Morph:

ArrowMorph.prototype = new Morph();
ArrowMorph.prototype.constructor = ArrowMorph;
ArrowMorph.uber = Morph.prototype;

// ArrowMorph instance creation:

function ArrowMorph(direction, size, padding, color) {
    this.init(direction, size, padding, color);
}

ArrowMorph.prototype.init = function (direction, size, padding, color) {
    this.direction = direction || 'down';
    this.size = size || ((size === 0) ? 0 : 50);
    this.padding = padding || 0;

    ArrowMorph.uber.init.call(this);
    this.color = color || new Color(0, 0, 0);
    this.setExtent(new Point(this.size, this.size));
};

ArrowMorph.prototype.setSize = function (size) {
    var min = Math.max(size, 1);
    this.size = size;
    this.setExtent(new Point(min, min));
};

// ArrowMorph displaying:

ArrowMorph.prototype.drawNew = function () {
    // initialize my surface property
    this.image = newCanvas(this.extent());
    var context = this.image.getContext('2d'),
        pad = this.padding,
        h = this.height(),
        h2 = Math.floor(h / 2),
        w = this.width(),
        w2 = Math.floor(w / 2);

    context.fillStyle = this.color.toString();
    context.beginPath();
    if (this.direction === 'down') {
        context.moveTo(pad, h2);
        context.lineTo(w - pad, h2);
        context.lineTo(w2, h - pad);
    } else if (this.direction === 'up') {
        context.moveTo(pad, h2);
        context.lineTo(w - pad, h2);
        context.lineTo(w2, pad);
    } else if (this.direction === 'left') {
        context.moveTo(pad, h2);
        context.lineTo(w2, pad);
        context.lineTo(w2, h - pad);
    } else { // 'right'
        context.moveTo(w2, pad);
        context.lineTo(w - pad, h2);
        context.lineTo(w2, h - pad);
    }
    context.closePath();
    context.fill();
};

// SymbolMorph //////////////////////////////////////////////////////////

/*
    I display graphical symbols, such as special letters. I have been
    called into existence out of frustration about not being able to
    consistently use Unicode characters to the same ends.
 */

// SymbolMorph inherits from Morph:

SymbolMorph.prototype = new Morph();
SymbolMorph.prototype.constructor = SymbolMorph;
SymbolMorph.uber = Morph.prototype;

// SymbolMorph instance creation:

function SymbolMorph(name, size, color, shadowOffset, shadowColor) {
    this.init(name, size, color, shadowOffset, shadowColor);
}

SymbolMorph.prototype.init = function (
    name,
    size,
    color,
    shadowOffset,
    shadowColor
) {
    this.isProtectedLabel = false; // participate in zebraing
    this.isReadOnly = true;
    this.name = name || 'square';
    this.size = size || ((size === 0) ? 0 : 50);
    this.shadowOffset = shadowOffset || new Point(0, 0);
    this.shadowColor = shadowColor || null;

    SymbolMorph.uber.init.call(this);
    this.color = color || new Color(0, 0, 0);
    this.drawNew();
};

// SymbolMorph zebra coloring:

SymbolMorph.prototype.setLabelColor = function (
    textColor,
    shadowColor,
    shadowOffset
) {
    this.shadowOffset = shadowOffset;
    this.shadowColor = shadowColor;
    this.setColor(textColor);
};

// SymbolMorph displaying:

SymbolMorph.prototype.drawNew = function () {
    var ctx, x, y, sx, sy;
    this.image = newCanvas(new Point(
        this.symbolWidth() + Math.abs(this.shadowOffset.x),
        this.size + Math.abs(this.shadowOffset.y)
    ));
    this.silentSetWidth(this.image.width);
    this.silentSetHeight(this.image.height);
    ctx = this.image.getContext('2d');
    sx = this.shadowOffset.x < 0 ? 0 : this.shadowOffset.x;
    sy = this.shadowOffset.y < 0 ? 0 : this.shadowOffset.y;
    x = this.shadowOffset.x < 0 ? Math.abs(this.shadowOffset.x) : 0;
    y = this.shadowOffset.y < 0 ? Math.abs(this.shadowOffset.y) : 0;
    if (this.shadowColor) {
        ctx.drawImage(
            this.symbolCanvasColored(this.shadowColor),
            sx,
            sy
        );
    }
    ctx.drawImage(
        this.symbolCanvasColored(this.color),
        x,
        y
    );
};

SymbolMorph.prototype.symbolCanvasColored = function (aColor) {
    // private
    var canvas = newCanvas(new Point(this.symbolWidth(), this.size));
    switch (this.name) {
    case 'square':
        return this.drawSymbolStop(canvas, aColor);
    case 'pointRight':
        return this.drawSymbolPointRight(canvas, aColor);
    case 'gears':
        return this.drawSymbolGears(canvas, aColor);
    case 'file':
        return this.drawSymbolFile(canvas, aColor);
    case 'fullScreen':
        return this.drawSymbolFullScreen(canvas, aColor);
    case 'normalScreen':
        return this.drawSymbolNormalScreen(canvas, aColor);
    case 'smallStage':
        return this.drawSymbolSmallStage(canvas, aColor);
    case 'normalStage':
        return this.drawSymbolNormalStage(canvas, aColor);
    case 'turtle':
        return this.drawSymbolTurtle(canvas, aColor);
    case 'stage':
        return this.drawSymbolStop(canvas, aColor);
    case 'turtleOutline':
        return this.drawSymbolTurtleOutline(canvas, aColor);
    case 'pause':
        return this.drawSymbolPause(canvas, aColor);
    case 'flag':
        return this.drawSymbolFlag(canvas, aColor);
    case 'octagon':
        return this.drawSymbolOctagon(canvas, aColor);
    case 'cloud':
        return this.drawSymbolCloud(canvas, aColor);
    case 'cloudOutline':
        return this.drawSymbolCloudOutline(canvas, aColor);
    case 'cloudGradient':
        return this.drawSymbolCloudGradient(canvas, aColor);
    case 'turnRight':
        return this.drawSymbolTurnRight(canvas, aColor);
    case 'turnLeft':
        return this.drawSymbolTurnLeft(canvas, aColor);
    case 'storage':
        return this.drawSymbolStorage(canvas, aColor);
    case 'poster':
        return this.drawSymbolPoster(canvas, aColor);
    case 'flash':
        return this.drawSymbolFlash(canvas, aColor);
    default:
        return canvas;
    }
};

SymbolMorph.prototype.symbolWidth = function () {
    // private
    var size = this.size;
    switch (this.name) {
    case 'pointRight':
        return Math.sqrt(size * size - Math.pow(size / 2, 2));
    case 'flash':
    case 'file':
        return size * 0.8;
    case 'smallStage':
    case 'normalStage':
        return size * 1.2;
    case 'turtle':
    case 'turtleOutline':
    case 'stage':
        return size * 1.3;
    case 'cloud':
    case 'cloudGradient':
    case 'cloudOutline':
        return size * 1.6;
    case 'turnRight':
    case 'turnLeft':
        return size / 3 * 2;
    default:
        return this.size;
    }
};

SymbolMorph.prototype.drawSymbolStop = function (canvas, color) {
    // answer a canvas showing a vertically centered square
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = color.toString();
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    return canvas;
};

SymbolMorph.prototype.drawSymbolPointRight = function (canvas, color) {
    // answer a canvas showing a right-pointing, equilateral triangle
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(canvas.width, Math.round(canvas.height / 2));
    ctx.lineTo(0, canvas.height);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fill();
    return canvas;
};

SymbolMorph.prototype.drawSymbolGears = function (canvas, color) {
    // answer a canvas showing gears
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        r = w / 2,
        e = w / 6;

    ctx.strokeStyle = color.toString();
    ctx.lineWidth = canvas.width / 7;

    ctx.beginPath();
    ctx.arc(r, r, w, radians(0), radians(360), true);
    ctx.arc(r, r, e * 1.5, radians(0), radians(360), false);
    ctx.closePath();
    ctx.clip();

    ctx.moveTo(0, r);
    ctx.lineTo(w, r);
    ctx.stroke();

    ctx.moveTo(r, 0);
    ctx.lineTo(r, w);
    ctx.stroke();

    ctx.moveTo(e, e);
    ctx.lineTo(w - e, w - e);
    ctx.stroke();

    ctx.moveTo(w - e, e);
    ctx.lineTo(e, w - e);
    ctx.stroke();

    return canvas;
};

SymbolMorph.prototype.drawSymbolFile = function (canvas, color) {
    // answer a canvas showing a page symbol
    var ctx = canvas.getContext('2d'),
        w = Math.min(canvas.width, canvas.height) / 2;

    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(w, 0);
    ctx.lineTo(w, w);
    ctx.lineTo(canvas.width, w);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = color.darker(25).toString();
    ctx.beginPath();
    ctx.moveTo(w, 0);
    ctx.lineTo(canvas.width, w);
    ctx.lineTo(w, w);
    ctx.lineTo(w, 0);
    ctx.closePath();
    ctx.fill();

    return canvas;
};

SymbolMorph.prototype.drawSymbolFullScreen = function (canvas, color) {
    // answer a canvas showing two arrows pointing diagonally outwards
    var ctx = canvas.getContext('2d'),
        h = canvas.height,
        c = canvas.width / 2,
        off = canvas.width / 20,
        w = canvas.width / 2;

    ctx.strokeStyle = color.toString();
    ctx.lineWidth = canvas.width / 5;
    ctx.moveTo(c - off, c + off);
    ctx.lineTo(0, h);
    ctx.stroke();

    ctx.strokeStyle = color.toString();
    ctx.lineWidth = canvas.width / 5;
    ctx.moveTo(c + off, c - off);
    ctx.lineTo(h, 0);
    ctx.stroke();

    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.moveTo(0, h);
    ctx.lineTo(0, h - w);
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.moveTo(h, 0);
    ctx.lineTo(h - w, 0);
    ctx.lineTo(h, w);
    ctx.closePath();
    ctx.fill();

    return canvas;
};

SymbolMorph.prototype.drawSymbolNormalScreen = function (canvas, color) {
    // answer a canvas showing two arrows pointing diagonally inwards
    var ctx = canvas.getContext('2d'),
        h = canvas.height,
        c = canvas.width / 2,
        off = canvas.width / 20,
        w = canvas.width;

    ctx.strokeStyle = color.toString();
    ctx.lineWidth = canvas.width / 5;
    ctx.moveTo(c - off * 3, c + off * 3);
    ctx.lineTo(0, h);
    ctx.stroke();

    ctx.strokeStyle = color.toString();
    ctx.lineWidth = canvas.width / 5;
    ctx.moveTo(c + off * 3, c - off * 3);
    ctx.lineTo(h, 0);
    ctx.stroke();

    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.moveTo(c + off, c - off);
    ctx.lineTo(w, c - off);
    ctx.lineTo(c + off, 0);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.moveTo(c - off, c + off);
    ctx.lineTo(0, c + off);
    ctx.lineTo(c - off, w);
    ctx.closePath();
    ctx.fill();

    return canvas;
};

SymbolMorph.prototype.drawSymbolSmallStage = function (canvas, color) {
    // answer a canvas showing a stage toggling symbol
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        h = canvas.height,
        w2 = w / 2,
        h2 = h / 2;

    ctx.fillStyle = color.darker(40).toString();
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = color.toString();
    ctx.fillRect(w2, 0, w2, h2);

    return canvas;
};

SymbolMorph.prototype.drawSymbolNormalStage = function (canvas, color) {
    // answer a canvas showing a stage toggling symbol
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        h = canvas.height,
        w2 = w / 2,
        h2 = h / 2;

    ctx.fillStyle = color.toString();
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = color.darker(25).toString();
    ctx.fillRect(w2, 0, w2, h2);

    return canvas;
};

SymbolMorph.prototype.drawSymbolTurtle = function (canvas, color) {
    // answer a canvas showing a turtle
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.lineTo(0, canvas.height);
    ctx.lineTo(canvas.height / 2, canvas.height / 2);
    ctx.closePath();
    ctx.fill();
    return canvas;
};

SymbolMorph.prototype.drawSymbolTurtleOutline = function (canvas, color) {
    // answer a canvas showing a turtle
    var ctx = canvas.getContext('2d');

    ctx.strokeStyle = color.toString();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.lineTo(0, canvas.height);
    ctx.lineTo(canvas.height / 2, canvas.height / 2);
    ctx.closePath();
    ctx.stroke();

    return canvas;
};

SymbolMorph.prototype.drawSymbolPause = function (canvas, color) {
    // answer a canvas showing two parallel rectangles
    var ctx = canvas.getContext('2d'),
        w = canvas.width / 5;

    ctx.fillStyle = color.toString();
    ctx.fillRect(0, 0, w * 2, canvas.height);
    ctx.fillRect(w * 3, 0, w * 2, canvas.height);
    return canvas;
};

SymbolMorph.prototype.drawSymbolFlag = function (canvas, color) {
    // answer a canvas showing a flag
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        l = Math.max(w / 12, 1),
        h = canvas.height;

    ctx.lineWidth = l;
    ctx.strokeStyle = color.toString();
    ctx.beginPath();
    ctx.moveTo(l / 2, 0);
    ctx.lineTo(l / 2, canvas.height);
    ctx.stroke();

    ctx.lineWidth = h / 2;
    ctx.beginPath();
    ctx.moveTo(0, h / 4);
    ctx.bezierCurveTo(
        w * 0.8,
        h / 4,
        w * 0.1,
        h * 0.5,
        w,
        h * 0.5
    );
    ctx.stroke();

    return canvas;
};

SymbolMorph.prototype.drawSymbolOctagon = function (canvas, color) {
    // answer a canvas showing an octagon
    var ctx = canvas.getContext('2d'),
        side = canvas.width,
        vert = (side - (side * 0.383)) / 2;

    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.moveTo(vert, 0);
    ctx.lineTo(side - vert, 0);
    ctx.lineTo(side, vert);
    ctx.lineTo(side, side - vert);
    ctx.lineTo(side - vert, side);
    ctx.lineTo(vert, side);
    ctx.lineTo(0, side - vert);
    ctx.lineTo(0, vert);
    ctx.closePath();
    ctx.fill();

    return canvas;
};

SymbolMorph.prototype.drawSymbolCloud = function (canvas, color) {
    // answer a canvas showing an cloud
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        h = canvas.height,
        r1 = h * 2 / 5,
        r2 = h / 4,
        r3 = h * 3 / 10,
        r4 = h / 5;

    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.arc(r2, h - r2, r2, radians(90), radians(259), false);
    ctx.arc(w / 20 * 5, h / 9 * 4, r4, radians(165), radians(300), false);
    ctx.arc(w / 20 * 11, r1, r1, radians(200), radians(357), false);
    ctx.arc(w - r3, h - r3, r3, radians(269), radians(90), false);
    ctx.closePath();
    ctx.fill();

    return canvas;
};

SymbolMorph.prototype.drawSymbolCloudGradient = function (canvas, color) {
    // answer a canvas showing an cloud
    var ctx = canvas.getContext('2d'),
        gradient,
        w = canvas.width,
        h = canvas.height,
        r1 = h * 2 / 5,
        r2 = h / 4,
        r3 = h * 3 / 10,
        r4 = h / 5;

    gradient = ctx.createRadialGradient(
        0,
        0,
        0,
        0,
        0,
        w
    );
    gradient.addColorStop(0, color.lighter(25).toString());
    gradient.addColorStop(1, color.darker(25).toString());
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(r2, h - r2, r2, radians(90), radians(259), false);
    ctx.arc(w / 20 * 5, h / 9 * 4, r4, radians(165), radians(300), false);
    ctx.arc(w / 20 * 11, r1, r1, radians(200), radians(357), false);
    ctx.arc(w - r3, h - r3, r3, radians(269), radians(90), false);
    ctx.closePath();
    ctx.fill();

    return canvas;
};

SymbolMorph.prototype.drawSymbolCloudOutline = function (canvas, color) {
    // answer a canvas showing an cloud
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        h = canvas.height,
        r1 = h * 2 / 5,
        r2 = h / 4,
        r3 = h * 3 / 10,
        r4 = h / 5;

    ctx.strokeStyle = color.toString();
    ctx.beginPath();
    ctx.arc(r2 + 1, h - r2 - 1, r2, radians(90), radians(259), false);
    ctx.arc(w / 20 * 5, h / 9 * 4, r4, radians(165), radians(300), false);
    ctx.arc(w / 20 * 11, r1 + 1, r1, radians(200), radians(357), false);
    ctx.arc(w - r3 - 1, h - r3 - 1, r3, radians(269), radians(90), false);
    ctx.closePath();
    ctx.stroke();

    return canvas;
};

SymbolMorph.prototype.drawSymbolTurnRight = function (canvas, color) {
    // answer a canvas showing a right-turning arrow
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        l = Math.max(w / 10, 1),
        r = w / 2;

    ctx.lineWidth = l;
    ctx.strokeStyle = color.toString();
    ctx.beginPath();
    ctx.arc(r, r * 2, r - l / 2, radians(0), radians(-90), false);
    ctx.stroke();

    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.moveTo(w, r);
    ctx.lineTo(r, 0);
    ctx.lineTo(r, r * 2);
    ctx.closePath();
    ctx.fill();

    return canvas;
};

SymbolMorph.prototype.drawSymbolTurnLeft = function (canvas, color) {
    // answer a canvas showing a left-turning arrow
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        l = Math.max(w / 10, 1),
        r = w / 2;

    ctx.lineWidth = l;
    ctx.strokeStyle = color.toString();
    ctx.beginPath();
    ctx.arc(r, r * 2, r - l / 2, radians(180), radians(-90), true);
    ctx.stroke();

    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.moveTo(0, r);
    ctx.lineTo(r, 0);
    ctx.lineTo(r, r * 2);
    ctx.closePath();
    ctx.fill();

    return canvas;
};

SymbolMorph.prototype.drawSymbolStorage = function (canvas, color) {
    // answer a canvas showing a stack of three disks
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        h = canvas.height,
        r = canvas.height,
        unit = canvas.height / 11;

    function drawDisk(bottom, fillTop) {
        ctx.fillStyle = color.toString();
        ctx.beginPath();
        ctx.arc(w / 2, bottom - h, r, radians(60), radians(120), false);
        ctx.lineTo(0, bottom - unit * 2);
        ctx.arc(
            w / 2,
            bottom - h - unit * 2,
            r,
            radians(120),
            radians(60),
            true
        );
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = color.darker(25).toString();
        ctx.beginPath();

        if (fillTop) {
            ctx.arc(
                w / 2,
                bottom - h - unit * 2,
                r,
                radians(120),
                radians(60),
                true
            );
        }

        ctx.arc(
            w / 2,
            bottom + unit * 6 + 1,
            r,
            radians(60),
            radians(120),
            true
        );
        ctx.closePath();

        if (fillTop) {
            ctx.fill();
        } else {
            ctx.stroke();
        }
    }

    ctx.strokeStyle = color.toString();
    drawDisk(h);
    drawDisk(h - unit * 3);
    drawDisk(h - unit * 6, false);
    return canvas;
};

SymbolMorph.prototype.drawSymbolPoster = function (canvas, color) {
    // answer a canvas showing a poster stand
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        h = canvas.height,
        bottom = h * 0.75,
        edge = canvas.height / 5;

    ctx.fillStyle = color.toString();
    ctx.strokeStyle = color.toString();

    ctx.lineWidth = w / 15;
    ctx.moveTo(w / 2, h / 3);
    ctx.lineTo(w / 6, h);
    ctx.stroke();

    ctx.moveTo(w / 2, h / 3);
    ctx.lineTo(w / 2, h);
    ctx.stroke();

    ctx.moveTo(w / 2, h / 3);
    ctx.lineTo(w * 5 / 6, h);
    ctx.stroke();

    ctx.fillRect(0, 0, w, bottom);
    ctx.clearRect(0, bottom, w, w / 20);

    ctx.clearRect(w - edge, bottom - edge, edge + 1, edge + 1);

    ctx.fillStyle = color.darker(25).toString();
    ctx.beginPath();
    ctx.moveTo(w, bottom - edge);
    ctx.lineTo(w - edge, bottom - edge);
    ctx.lineTo(w - edge, bottom);
    ctx.closePath();
    ctx.fill();

    return canvas;
};

SymbolMorph.prototype.drawSymbolFlash = function (canvas, color) {
    // answer a canvas showing a flash
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        w3 = w / 3,
        h = canvas.height,
        h3 = h / 3,
        off = h3 / 3;

    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.moveTo(w3, 0);
    ctx.lineTo(0, h3);
    ctx.lineTo(w3, h3);
    ctx.lineTo(0, h3 * 2);
    ctx.lineTo(w3, h3 * 2);
    ctx.lineTo(0, h);
    ctx.lineTo(w, h3 * 2 - off);
    ctx.lineTo(w3 * 2, h3 * 2 - off);
    ctx.lineTo(w, h3 - off);
    ctx.lineTo(w3 * 2, h3 - off);
    ctx.lineTo(w, 0);
    ctx.closePath();
    ctx.fill();
    return canvas;
};

// ColorSlotMorph //////////////////////////////////////////////////////

/*
    I am an editable input slot for a color. Users can edit my color by
    clicking on me, in which case a display a color gradient palette
    and let the user select another color. Note that the user isn't
    restricted to selecting a color from the palette, any color from
    anywhere within the World can be chosen.

    my block spec is %clr

    evaluate() returns my color
*/

// ColorSlotMorph  inherits from ArgMorph:

ColorSlotMorph.prototype = new ArgMorph();
ColorSlotMorph.prototype.constructor = ColorSlotMorph;
ColorSlotMorph.uber = ArgMorph.prototype;

// ColorSlotMorph  instance creation:

function ColorSlotMorph(clr) {
    this.init(clr);
}

ColorSlotMorph.prototype.init = function (clr) {
    ColorSlotMorph.uber.init.call(this);
    this.setColor(clr || new Color(145, 26, 68));
};

ColorSlotMorph.prototype.getSpec = function () {
    return '%clr';
};

// ColorSlotMorph  color sensing:

ColorSlotMorph.prototype.getUserColor = function () {
    var myself = this,
        world = this.world(),
        hand = world.hand,
        posInDocument = getDocumentPositionOf(world.worldCanvas),
        mouseMoveBak = hand.processMouseMove,
        mouseDownBak = hand.processMouseDown,
        mouseUpBak = hand.processMouseUp,
        pal = new ColorPaletteMorph(null, new Point(
            this.fontSize * 16,
            this.fontSize * 10
        ));
    world.add(pal);
    pal.setPosition(this.bottomLeft().add(new Point(0, this.edge)));

    hand.processMouseMove = function (event) {
        hand.setPosition(new Point(
            event.pageX - posInDocument.x,
            event.pageY - posInDocument.y
        ));
        myself.setColor(world.getGlobalPixelColor(hand.position()));
    };

    hand.processMouseDown = nop;

    hand.processMouseUp = function () {
        pal.destroy();
        hand.processMouseMove = mouseMoveBak;
        hand.processMouseDown = mouseDownBak;
        hand.processMouseUp = mouseUpBak;
    };
};

// ColorSlotMorph events:

ColorSlotMorph.prototype.mouseClickLeft = function () {
    this.getUserColor();
};

// ColorSlotMorph evaluating:

ColorSlotMorph.prototype.evaluate = function () {
    return this.color;
};

// ColorSlotMorph drawing:

ColorSlotMorph.prototype.drawNew = function () {
    var context, borderColor, side;

    side = this.fontSize + this.edge * 2 + this.typeInPadding * 2;
    this.silentSetExtent(new Point(side, side));

    // initialize my surface property
    this.image = newCanvas(this.extent());
    context = this.image.getContext('2d');
    if (this.parent) {
        borderColor = this.parent.color;
    } else {
        borderColor = new Color(120, 120, 120);
    }
    context.fillStyle = this.color.toString();

    // cache my border colors
    this.cachedClr = borderColor.toString();
    this.cachedClrBright = borderColor.lighter(this.contrast)
        .toString();
    this.cachedClrDark = borderColor.darker(this.contrast).toString();

    context.fillRect(
        this.edge,
        this.edge,
        this.width() - this.edge * 2,
        this.height() - this.edge * 2
    );
    this.drawRectBorder(context);
};

ColorSlotMorph.prototype.drawRectBorder =
    InputSlotMorph.prototype.drawRectBorder;

// BlockHighlightMorph /////////////////////////////////////////////////

// BlockHighlightMorph inherits from Morph:

BlockHighlightMorph.prototype = new Morph();
BlockHighlightMorph.prototype.constructor = BlockHighlightMorph;
BlockHighlightMorph.uber = Morph.prototype;

// BlockHighlightMorph instance creation:

function BlockHighlightMorph() {
    this.init();
}

// MultiArgMorph ///////////////////////////////////////////////////////

/*
    I am an arity controlled list of input slots

    my block specs are

        %mult%x - where x is any single input slot
        %inputs - for an additional text label 'with inputs'

    evaluation is handles by the interpreter
*/

// MultiArgMorph  inherits from ArgMorph:

MultiArgMorph.prototype = new ArgMorph();
MultiArgMorph.prototype.constructor = MultiArgMorph;
MultiArgMorph.uber = ArgMorph.prototype;

// MultiArgMorph instance creation:

function MultiArgMorph(
    slotSpec,
    labelTxt,
    min,
    eSpec,
    arrowColor,
    labelColor,
    shadowColor,
    shadowOffset,
    isTransparent
) {
    this.init(
        slotSpec,
        labelTxt,
        min,
        eSpec,
        arrowColor,
        labelColor,
        shadowColor,
        shadowOffset,
        isTransparent
    );
}

MultiArgMorph.prototype.init = function (
    slotSpec,
    labelTxt,
    min,
    eSpec,
    arrowColor,
    labelColor,
    shadowColor,
    shadowOffset,
    isTransparent
) {
    var label,
        arrows = new FrameMorph(),
        leftArrow,
        rightArrow,
        i;

    this.slotSpec = slotSpec || '%s';
    this.labelText = localize(labelTxt || '');
    this.minInputs = min || 0;
    this.elementSpec = eSpec || null;
    this.labelColor = labelColor || null;
    this.shadowColor = shadowColor || null;
    this.shadowOffset = shadowOffset || null;

    this.canBeEmpty = true;
    MultiArgMorph.uber.init.call(this);

    // MultiArgMorphs are transparent by default b/c of zebra coloring
    this.alpha = isTransparent === false ? 1 : 0;
    arrows.alpha = isTransparent === false ? 1 : 0;
    arrows.noticesTransparentClick = true;
    this.noticesTransparentclick = true;

    // label text:
    label = this.labelPart(this.labelText);
    this.add(label);
    label.hide();

    // left arrow:
    leftArrow = new ArrowMorph(
        'left',
        this.fontSize,
        Math.max(Math.floor(this.fontSize / 6), 1),
        arrowColor
    );

    // right arrow:
    rightArrow = new ArrowMorph(
        'right',
        this.fontSize,
        Math.max(Math.floor(this.fontSize / 6), 1),
        arrowColor
    );

    // control panel:
    arrows.add(leftArrow);
    arrows.add(rightArrow);
    arrows.drawNew();
    arrows.acceptsDrops = false;

    this.add(arrows);

    // create the minimum number of inputs
    for (i = 0; i < this.minInputs; i += 1) {
        this.addInput();
    }
};

MultiArgMorph.prototype.label = function () {
    return this.children[0];
};

MultiArgMorph.prototype.arrows = function () {
    return this.children[this.children.length - 1];
};

MultiArgMorph.prototype.getSpec = function () {
    return '%mult' + this.slotSpec;
};

// MultiArgMorph defaults:

MultiArgMorph.prototype.setContents = function (anArray) {
    var inputs = this.inputs(), i;
    for (i = 0; i < anArray.length; i += 1) {
        if (anArray[i] !== null && (inputs[i])) {
            inputs[i].setContents(anArray[i]);
        }
    }
};

// MultiArgMorph hiding and showing:

/*
    override the inherited behavior to recursively hide/show all
    children, so that my instances get restored correctly when
    switching back out of app mode.
*/

MultiArgMorph.prototype.hide = function () {
    this.isVisible = false;
    this.changed();
};

MultiArgMorph.prototype.show = function () {
    this.isVisible = true;
    this.changed();
};

// MultiArgMorph coloring:

MultiArgMorph.prototype.setLabelColor = function (
    textColor,
    shadowColor,
    shadowOffset
) {
    this.textColor = textColor;
    this.shadowColor = shadowColor;
    this.shadowOffset = shadowOffset;
    MultiArgMorph.uber.setLabelColor.call(
        this,
        textColor,
        shadowColor,
        shadowOffset
    );
};

// MultiArgMorph layout:

MultiArgMorph.prototype.fixLayout = function () {
    if (this.slotSpec === '%t') {
        this.isStatic = true; // in this case I cannot be exchanged
    }
    if (this.parent) {
        var label = this.label(), shadowColor, shadowOffset;
        this.color = this.parent.color;
        shadowColor = this.shadowColor ||
            this.parent.color.darker(this.labelContrast);
        shadowOffset = this.shadowOffset || label.shadowOffset;
        this.arrows().color = this.color;

        if (this.labelText !== '') {
            if (!label.shadowColor.eq(shadowColor)) {
                label.shadowColor = shadowColor;
                label.shadowOffset = shadowOffset;
                label.drawNew();
            }
        }

    }
    this.fixArrowsLayout();
    MultiArgMorph.uber.fixLayout.call(this);
    if (this.parent) {
        this.parent.fixLayout();
    }
};

MultiArgMorph.prototype.fixArrowsLayout = function () {
    var label = this.label(),
        arrows = this.arrows(),
        leftArrow = arrows.children[0],
        rightArrow = arrows.children[1],
        dim = new Point(rightArrow.width() / 2, rightArrow.height());
    if (this.inputs().length < (this.minInputs + 1)) {
        label.hide();
        leftArrow.hide();
        rightArrow.setPosition(
            arrows.position().subtract(new Point(dim.x, 0))
        );
        arrows.setExtent(dim);
    } else {
        if (this.labelText !== '') {
            label.show();
        }
        leftArrow.show();
        rightArrow.setPosition(leftArrow.topCenter());
        arrows.bounds.corner = rightArrow.bottomRight().copy();
    }
    arrows.drawNew();
};

MultiArgMorph.prototype.refresh = function () {
    this.inputs().forEach(function (input) {
        input.drawNew();
    });
};

MultiArgMorph.prototype.drawNew = function () {
    MultiArgMorph.uber.drawNew.call(this);
    this.refresh();
};

// MultiArgMorph arity control:

MultiArgMorph.prototype.addInput = function (contents) {
    var newPart = this.labelPart(this.slotSpec),
        idx = this.children.length - 1;
    // newPart.alpha = this.alpha ? 1 : (1 - this.alpha) / 2;
    if (contents) {
        newPart.setContents(contents);
    } else if (this.elementSpec === '%scriptVars') {
        newPart.setContents('abcdefghijklmnopqrstuvwxyz'[idx - 1] || 'foo');
    } else if (contains(['%parms', '%ringparms'], this.elementSpec)) {
        newPart.setContents('#' + idx);
    }
    newPart.parent = this;
    this.children.splice(idx, 0, newPart);
    newPart.drawNew();
    this.fixLayout();
};

MultiArgMorph.prototype.removeInput = function () {
    var oldPart, scripts;
    if (this.children.length > 1) {
        oldPart = this.children[this.children.length - 2];
        this.removeChild(oldPart);
        if (oldPart instanceof BlockMorph) {
            scripts = this.parentThatIsA(ScriptsMorph);
            if (scripts) {
                scripts.add(oldPart);
            }
        }
    }
    this.fixLayout();
};

// MultiArgMorph events:

MultiArgMorph.prototype.mouseClickLeft = function (pos) {
    // if the <shift> key is pressed, repeat action 5 times
    var arrows = this.arrows(),
        leftArrow = arrows.children[0],
        rightArrow = arrows.children[1],
        repetition = this.world().currentKey === 16 ? 3 : 1,
        i;

    this.startLayout();
    if (rightArrow.bounds.containsPoint(pos)) {
        for (i = 0; i < repetition; i += 1) {
            if (rightArrow.isVisible) {
                this.addInput();
            }
        }
    } else if (leftArrow.bounds.containsPoint(pos)) {
        for (i = 0; i < repetition; i += 1) {
            if (leftArrow.isVisible) {
                this.removeInput();
            }
        }
    } else {
        this.escalateEvent('mouseClickLeft', pos);
    }
    this.endLayout();
};

// MultiArgMorph arity evaluating:

MultiArgMorph.prototype.evaluate = function () {
/*
    this is usually overridden by the interpreter. This method is only
    called (and needed) for the variables menu.
*/
    var result = [];
    this.inputs().forEach(function (slot) {
        result.push(slot.evaluate());
    });
    return result;
};

MultiArgMorph.prototype.isEmptySlot = function () {
    return this.canBeEmpty ? this.inputs().length === 0 : false;
};

// ArgLabelMorph ///////////////////////////////////////////////////////

/*
    I am a label string that is wrapped around an ArgMorph, usually
    a MultiArgMorph, so to indicate that it has been replaced entirely
    for an embedded reporter block

    I don't have a block spec, I get embedded automatically by the parent
    block's argument replacement mechanism

    My evaluation method is the identity function, i.e. I simply pass my
    input's value along.
*/

// ArgLabelMorph  inherits from ArgMorph:

ArgLabelMorph.prototype = new ArgMorph();
ArgLabelMorph.prototype.constructor = ArgLabelMorph;
ArgLabelMorph.uber = ArgMorph.prototype;

// MultiArgMorph instance creation:

function ArgLabelMorph(argMorph, labelTxt) {
    this.init(argMorph, labelTxt);
}

ArgLabelMorph.prototype.init = function (argMorph, labelTxt) {
    var label;

    this.labelText = localize(labelTxt || 'input list:');
    ArgLabelMorph.uber.init.call(this);

    this.isStatic = true; // I cannot be exchanged

    // ArgLabelMorphs are transparent
    this.alpha = 0;
    this.noticesTransparentclick = true;

    // label text:
    label = this.labelPart(this.labelText);
    this.add(label);

    // argMorph
    this.add(argMorph);
};

ArgLabelMorph.prototype.label = function () {
    return this.children[0];
};

ArgLabelMorph.prototype.argMorph = function () {
    return this.children[1];
};

// ArgLabelMorph layout:

ArgLabelMorph.prototype.fixLayout = function () {
    var label = this.label(),
        shadowColor,
        shadowOffset;

    if (this.parent) {
        this.color = this.parent.color;
        shadowOffset = label.shadowOffset;

        // determine the shadow color for zebra coloring:
        if (shadowOffset.x < 0) {
            shadowColor = this.parent.color.darker(this.labelContrast);
        } else {
            shadowColor = this.parent.color.lighter(this.labelContrast);
        }

        if (this.labelText !== '') {
            if (!label.shadowColor.eq(shadowColor)) {
                label.shadowColor = shadowColor;
                label.shadowOffset = shadowOffset;
                label.drawNew();
            }
        }
    }
    ArgLabelMorph.uber.fixLayout.call(this);
    if (this.parent) {
        this.parent.fixLayout();
    }
};

ArgLabelMorph.prototype.refresh = function () {
    this.inputs().forEach(function (input) {
        input.drawNew();
    });
};

ArgLabelMorph.prototype.drawNew = function () {
    ArgLabelMorph.uber.drawNew.call(this);
    this.refresh();
};

// ArgLabelMorph label color:

ArgLabelMorph.prototype.setLabelColor = function (
    textColor,
    shadowColor,
    shadowOffset
) {
    if (this.labelText !== '') {
        var label = this.label();
        label.color = textColor;
        label.shadowColor = shadowColor;
        label.shadowOffset = shadowOffset;
        label.drawNew();
    }
};

// ArgLabelMorph events:

ArgLabelMorph.prototype.reactToGrabOf = function () {
    if (this.parent instanceof SyntaxElementMorph) {
        this.parent.revertToDefaultInput(this);
    }
};

// ArgLabelMorph evaluating:

ArgLabelMorph.prototype.evaluate = function () {
/*
    this is usually overridden by the interpreter. This method is only
    called (and needed) for the variables menu.
*/
    return this.argMorph().evaluate();
};

ArgLabelMorph.prototype.isEmptySlot = function () {
    return false;
};

// FunctionSlotMorph ///////////////////////////////////////////////////

/*
    I am an unevaluated, non-editable, rf-colored, rounded or diamond
    input slot.    My current (only) use is in the THE BLOCK block.

    My command spec is %f
*/

// FunctionSlotMorph inherits from ArgMorph:

FunctionSlotMorph.prototype = new ArgMorph();
FunctionSlotMorph.prototype.constructor = FunctionSlotMorph;
FunctionSlotMorph.uber = ArgMorph.prototype;

// FunctionSlotMorph instance creation:

function FunctionSlotMorph(isPredicate) {
    this.init(isPredicate);
}

FunctionSlotMorph.prototype.init = function (isPredicate) {
    FunctionSlotMorph.uber.init.call(this);
    this.isPredicate = isPredicate || false;
    this.color = this.rfColor;
    this.setExtent(new Point(
        (this.fontSize + this.edge * 2) * 2,
        this.fontSize + this.edge * 2
    ));
};

FunctionSlotMorph.prototype.getSpec = function () {
    return '%f';
};

// FunctionSlotMorph drawing:

FunctionSlotMorph.prototype.drawNew = function () {
    var context, borderColor;

    // initialize my surface property
    this.image = newCanvas(this.extent());
    context = this.image.getContext('2d');
    if (this.parent) {
        borderColor = this.parent.color;
    } else {
        borderColor = new Color(120, 120, 120);
    }

    // cache my border colors
    this.cachedClr = borderColor.toString();
    this.cachedClrBright = borderColor.lighter(this.contrast)
        .toString();
    this.cachedClrDark = borderColor.darker(this.contrast).toString();

    if (this.isPredicate) {
        this.drawDiamond(context);
    } else {
        this.drawRounded(context);
    }
};

FunctionSlotMorph.prototype.drawRounded = function (context) {
    var h = this.height(),
        r = Math.min(this.rounding, h / 2),
        w = this.width(),
        shift = this.edge / 2,
        gradient;

    // draw the 'flat' shape:
    context.fillStyle = this.color.toString();
    context.beginPath();

    // top left:
    context.arc(
        r,
        r,
        r,
        radians(-180),
        radians(-90),
        false
    );

    // top right:
    context.arc(
        w - r,
        r,
        r,
        radians(-90),
        radians(-0),
        false
    );

    // bottom right:
    context.arc(
        w - r,
        h - r,
        r,
        radians(0),
        radians(90),
        false
    );

    // bottom left:
    context.arc(
        r,
        h - r,
        r,
        radians(90),
        radians(180),
        false
    );

    context.closePath();
    context.fill();


    // add 3D-Effect:
    context.lineWidth = this.edge;
    context.lineJoin = 'round';
    context.lineCap = 'round';

    // bottom left corner
    context.strokeStyle = this.cachedClr; //gradient;
    context.beginPath();
    context.arc(
        r,
        h - r,
        r - shift,
        radians(90),
        radians(180),
        false
    );
    context.stroke();

    // top right corner
    context.strokeStyle = this.cachedClr; //gradient;
    context.beginPath();
    context.arc(
        w - r,
        r,
        r - shift,
        radians(-90),
        radians(0),
        false
    );
    context.stroke();

    // normal gradient edges

    context.shadowOffsetX = shift;
    context.shadowOffsetY = shift;
    context.shadowBlur = this.edge;
    context.shadowColor = this.color.darker(80).toString();

    // top edge: straight line
    gradient = context.createLinearGradient(
        0,
        0,
        0,
        this.edge
    );
    gradient.addColorStop(1, this.cachedClrDark);
    gradient.addColorStop(0, this.cachedClr);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(r - shift, shift);
    context.lineTo(w - r + shift, shift);
    context.stroke();

    // top edge: left corner
    gradient = context.createRadialGradient(
        r,
        r,
        r - this.edge,
        r,
        r,
        r
    );
    gradient.addColorStop(1, this.cachedClr);
    gradient.addColorStop(0, this.cachedClrDark);
    context.strokeStyle = gradient;
    context.beginPath();
    context.arc(
        r,
        r,
        r - shift,
        radians(180),
        radians(270),
        false
    );
    context.stroke();

    // left edge: straight vertical line
    gradient = context.createLinearGradient(0, 0, this.edge, 0);
    gradient.addColorStop(1, this.cachedClrDark);
    gradient.addColorStop(0, this.cachedClr);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(shift, r);
    context.lineTo(shift, h - r);
    context.stroke();

    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowBlur = 0;

    // bottom edge: right corner
    gradient = context.createRadialGradient(
        w - r,
        h - r,
        r - this.edge,
        w - r,
        h - r,
        r
    );
    gradient.addColorStop(1, this.cachedClr);
    gradient.addColorStop(0, this.cachedClrBright);
    context.strokeStyle = gradient;
    context.beginPath();
    context.arc(
        w - r,
        h - r,
        r - shift,
        radians(0),
        radians(90),
        false
    );
    context.stroke();

    // bottom edge: straight line
    gradient = context.createLinearGradient(
        0,
        h - this.edge,
        0,
        h
    );
    gradient.addColorStop(1, this.cachedClr);
    gradient.addColorStop(0, this.cachedClrBright);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(r - shift, h - shift);
    context.lineTo(w - r + shift, h - shift);
    context.stroke();

    // right edge: straight vertical line
    gradient = context.createLinearGradient(w - this.edge, 0, w, 0);
    gradient.addColorStop(1, this.cachedClr);
    gradient.addColorStop(0, this.cachedClrBright);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(w - shift, r + shift);
    context.lineTo(w - shift, h - r);
    context.stroke();

};

FunctionSlotMorph.prototype.drawDiamond = function (context) {
    var w = this.width(),
        h = this.height(),
        h2 = Math.floor(h / 2),
        r = Math.min(this.rounding, h2),
        shift = this.edge / 2,
        gradient;

    // draw the 'flat' shape:
    context.fillStyle = this.color.toString();
    context.beginPath();

    context.moveTo(0, h2);
    context.lineTo(r, 0);
    context.lineTo(w - r, 0);
    context.lineTo(w, h2);
    context.lineTo(w - r, h);
    context.lineTo(r, h);

    context.closePath();
    context.fill();

    // add 3D-Effect:
    context.lineWidth = this.edge;
    context.lineJoin = 'round';
    context.lineCap = 'round';

    // half-tone edges
    // bottom left corner
    context.strokeStyle = this.cachedClr;
    context.beginPath();
    context.moveTo(shift, h2);
    context.lineTo(r, h - shift);
    context.stroke();

    // top right corner
    context.strokeStyle = this.cachedClr;
    context.beginPath();
    context.moveTo(w - shift, h2);
    context.lineTo(w - r, shift);
    context.stroke();

    // normal gradient edges
    // top edge: left corner

    context.shadowOffsetX = shift;
    context.shadowOffsetY = shift;
    context.shadowBlur = this.edge;
    context.shadowColor = this.color.darker(80).toString();

    gradient = context.createLinearGradient(
        0,
        0,
        r,
        0
    );
    gradient.addColorStop(1, this.cachedClrDark);
    gradient.addColorStop(0, this.cachedClr);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(shift, h2);
    context.lineTo(r, shift);
    context.stroke();

    // top edge: straight line
    gradient = context.createLinearGradient(
        0,
        0,
        0,
        this.edge
    );
    gradient.addColorStop(1, this.cachedClrDark);
    gradient.addColorStop(0, this.cachedClr);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(r, shift);
    context.lineTo(w - r, shift);
    context.stroke();

    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowBlur = 0;

    // bottom edge: right corner
    gradient = context.createLinearGradient(
        w - r,
        0,
        w,
        0
    );
    gradient.addColorStop(1, this.cachedClr);
    gradient.addColorStop(0, this.cachedClrBright);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(w - r, h - shift);
    context.lineTo(w - shift, h2);
    context.stroke();

    // bottom edge: straight line
    gradient = context.createLinearGradient(
        0,
        h - this.edge,
        0,
        h
    );
    gradient.addColorStop(1, this.cachedClr);
    gradient.addColorStop(0, this.cachedClrBright);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(r + shift, h - shift);
    context.lineTo(w - r - shift, h - shift);
    context.stroke();
};

// ReporterSlotMorph ///////////////////////////////////////////////////

/*
    I am a ReporterBlock-shaped input slot. I can nest as well as
    accept reporter blocks (containing reified scripts).

    my most important accessor is

    nestedBlock()    - answer the reporter block I encompass, if any

    My command spec is %r for reporters (round) and %p for
    predicates (diamond)

    evaluate() returns my nested block or null
*/

// ReporterSlotMorph inherits from FunctionSlotMorph:

ReporterSlotMorph.prototype = new FunctionSlotMorph();
ReporterSlotMorph.prototype.constructor = ReporterSlotMorph;
ReporterSlotMorph.uber = FunctionSlotMorph.prototype;

// ReporterSlotMorph instance creation:

function ReporterSlotMorph(isPredicate) {
    this.init(isPredicate);
}

ReporterSlotMorph.prototype.init = function (isPredicate) {
    ReporterSlotMorph.uber.init.call(this, isPredicate);
    this.add(this.emptySlot());
    this.fixLayout();
};

ReporterSlotMorph.prototype.emptySlot = function () {
    var empty = new ArgMorph(),
        shrink = this.rfBorder * 2 + this.edge * 2;
    empty.color = this.rfColor;
    empty.alpha = 0;
    empty.setExtent(new Point(
        (this.fontSize + this.edge * 2) * 2 - shrink,
        this.fontSize + this.edge * 2 - shrink
    ));
    return empty;
};

// ReporterSlotMorph accessing:

ReporterSlotMorph.prototype.getSpec = function () {
    return '%r';
};

ReporterSlotMorph.prototype.contents = function () {
    return this.children[0];
};

ReporterSlotMorph.prototype.nestedBlock = function () {
    var contents = this.contents();
    return contents instanceof ReporterBlockMorph ? contents : null;
};

// ReporterSlotMorph evaluating:

ReporterSlotMorph.prototype.evaluate = function () {
    return this.nestedBlock();
};

CommandSlotMorph.prototype.isEmptySlot = function () {
    return this.nestedBlock() === null;
};

// ReporterSlotMorph layout:

ReporterSlotMorph.prototype.fixLayout = function () {
    var contents = this.contents();
    this.setExtent(contents.extent().add(
        this.edge * 2 + this.rfBorder * 2
    ));
    contents.setCenter(this.center());
    if (this.parent) {
        if (this.parent.fixLayout) {
            this.parent.fixLayout();
        }
    }
};

// RingReporterSlotMorph ///////////////////////////////////////////////////

/*
    I am a ReporterBlock-shaped input slot for use in RingMorphs.
    I can only nest reporter blocks (both round and diamond).

    My command spec is %rr for reporters (round) and %rp for
    predicates (diamond)

    evaluate() returns my nested block or null
    (inherited from ReporterSlotMorph
*/

// ReporterSlotMorph inherits from FunctionSlotMorph:

RingReporterSlotMorph.prototype = new ReporterSlotMorph();
RingReporterSlotMorph.prototype.constructor = RingReporterSlotMorph;
RingReporterSlotMorph.uber = ReporterSlotMorph.prototype;

// ReporterSlotMorph preferences settings:

RingReporterSlotMorph.prototype.rfBorder
    = RingCommandSlotMorph.prototype.rfBorder;

RingReporterSlotMorph.prototype.edge
    = RingCommandSlotMorph.prototype.edge;

// RingReporterSlotMorph instance creation:

function RingReporterSlotMorph(isPredicate) {
    this.init(isPredicate);
}

RingReporterSlotMorph.prototype.init = function (isPredicate) {
    RingReporterSlotMorph.uber.init.call(this, isPredicate);
    this.alpha = RingMorph.prototype.alpha;
    this.contrast = RingMorph.prototype.contrast;
    this.isHole = true;
};

// RingReporterSlotMorph accessing:

RingReporterSlotMorph.prototype.getSpec = function () {
    return '%rr';
};

RingReporterSlotMorph.prototype.replaceInput = function (source, target) {
    RingReporterSlotMorph.uber.replaceInput.call(this, source, target);
    if (this.parent instanceof RingMorph) {
        this.parent.vanishForSimilar();
    }
};

// RingReporterSlotMorph drawing:

RingReporterSlotMorph.prototype.drawRounded = function (context) {
    var h = this.height(),
        r = Math.min(this.rounding, h / 2),
        w = this.width(),
        shift = this.edge / 2,
        gradient;

    // draw the 'flat' shape:
    context.fillStyle = this.cachedClr; //this.color.toString();

    // top half:
    context.beginPath();
    context.moveTo(0, h / 2);

    // top left:
    context.arc(
        r,
        r,
        r,
        radians(-180),
        radians(-90),
        false
    );

    // top right:
    context.arc(
        w - r,
        r,
        r,
        radians(-90),
        radians(-0),
        false
    );

    context.lineTo(w, h / 2);
    context.lineTo(w, 0);
    context.lineTo(0, 0);
    context.closePath();
    context.fill();

    // bottom half:
    context.beginPath();
    context.moveTo(w, h / 2);

    // bottom right:
    context.arc(
        w - r,
        h - r,
        r,
        radians(0),
        radians(90),
        false
    );

    // bottom left:
    context.arc(
        r,
        h - r,
        r,
        radians(90),
        radians(180),
        false
    );

    context.lineTo(0, h / 2);
    context.lineTo(0, h);
    context.lineTo(w, h);
    context.closePath();
    context.fill();

    // add 3D-Effect:
    context.lineWidth = this.edge;
    context.lineJoin = 'round';
    context.lineCap = 'round';

    // bottom left corner
    context.strokeStyle = this.cachedClr; //gradient;
    context.beginPath();
    context.arc(
        r,
        h - r,
        r - shift,
        radians(90),
        radians(180),
        false
    );
    context.stroke();

    // top right corner
    context.strokeStyle = this.cachedClr; //gradient;
    context.beginPath();
    context.arc(
        w - r,
        r,
        r - shift,
        radians(-90),
        radians(0),
        false
    );
    context.stroke();

    // normal gradient edges

    context.shadowOffsetX = shift;
    context.shadowOffsetY = shift;
    context.shadowBlur = this.edge;
    context.shadowColor = this.color.darker(80).toString();

    // top edge: straight line
    gradient = context.createLinearGradient(
        0,
        0,
        0,
        this.edge
    );
    gradient.addColorStop(1, this.cachedClrDark);
    gradient.addColorStop(0, this.cachedClr);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(r - shift, shift);
    context.lineTo(w - r + shift, shift);
    context.stroke();

    // top edge: left corner
    gradient = context.createRadialGradient(
        r,
        r,
        r - this.edge,
        r,
        r,
        r
    );
    gradient.addColorStop(1, this.cachedClr);
    gradient.addColorStop(0, this.cachedClrDark);
    context.strokeStyle = gradient;
    context.beginPath();
    context.arc(
        r,
        r,
        r - shift,
        radians(180),
        radians(270),
        false
    );
    context.stroke();

    // left edge: straight vertical line
    gradient = context.createLinearGradient(0, 0, this.edge, 0);
    gradient.addColorStop(1, this.cachedClrDark);
    gradient.addColorStop(0, this.cachedClr);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(shift, r);
    context.lineTo(shift, h - r);
    context.stroke();

    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowBlur = 0;

    // bottom edge: right corner
    gradient = context.createRadialGradient(
        w - r,
        h - r,
        r - this.edge,
        w - r,
        h - r,
        r
    );
    gradient.addColorStop(1, this.cachedClr);
    gradient.addColorStop(0, this.cachedClrBright);
    context.strokeStyle = gradient;
    context.beginPath();
    context.arc(
        w - r,
        h - r,
        r - shift,
        radians(0),
        radians(90),
        false
    );
    context.stroke();

    // bottom edge: straight line
    gradient = context.createLinearGradient(
        0,
        h - this.edge,
        0,
        h
    );
    gradient.addColorStop(1, this.cachedClr);
    gradient.addColorStop(0, this.cachedClrBright);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(r - shift, h - shift);
    context.lineTo(w - r + shift, h - shift);
    context.stroke();

    // right edge: straight vertical line
    gradient = context.createLinearGradient(w - this.edge, 0, w, 0);
    gradient.addColorStop(1, this.cachedClr);
    gradient.addColorStop(0, this.cachedClrBright);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(w - shift, r + shift);
    context.lineTo(w - shift, h - r);
    context.stroke();
};

RingReporterSlotMorph.prototype.drawDiamond = function (context) {
    var w = this.width(),
        h = this.height(),
        h2 = Math.floor(h / 2),
        r = Math.min(this.rounding, h2),
        shift = this.edge / 2,
        gradient;

    // draw the 'flat' shape:
    context.fillStyle = this.cachedClr;
    context.beginPath();

    context.moveTo(0, 0);
    context.lineTo(0, h2);
    context.lineTo(r, 0);
    context.lineTo(w - r, 0);
    context.lineTo(w, h2);
    context.lineTo(w, 0);

    context.closePath();
    context.fill();

    context.moveTo(w, h2);
    context.lineTo(w - r, h);
    context.lineTo(r, h);
    context.lineTo(0, h2);
    context.lineTo(0, h);
    context.lineTo(w, h);

    context.closePath();
    context.fill();

    // add 3D-Effect:
    context.lineWidth = this.edge;
    context.lineJoin = 'round';
    context.lineCap = 'round';

    // half-tone edges
    // bottom left corner
    context.strokeStyle = this.cachedClr;
    context.beginPath();
    context.moveTo(shift, h2);
    context.lineTo(r, h - shift);
    context.stroke();

    // top right corner
    context.strokeStyle = this.cachedClr;
    context.beginPath();
    context.moveTo(w - shift, h2);
    context.lineTo(w - r, shift);
    context.stroke();

    // normal gradient edges
    // top edge: left corner

    context.shadowOffsetX = shift;
    context.shadowOffsetY = shift;
    context.shadowBlur = this.edge;
    context.shadowColor = this.color.darker(80).toString();

    gradient = context.createLinearGradient(
        0,
        0,
        r,
        0
    );
    gradient.addColorStop(1, this.cachedClrDark);
    gradient.addColorStop(0, this.cachedClr);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(shift, h2);
    context.lineTo(r, shift);
    context.stroke();

    // top edge: straight line
    gradient = context.createLinearGradient(
        0,
        0,
        0,
        this.edge
    );
    gradient.addColorStop(1, this.cachedClrDark);
    gradient.addColorStop(0, this.cachedClr);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(r, shift);
    context.lineTo(w - r, shift);
    context.stroke();

    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowBlur = 0;

    // bottom edge: right corner
    gradient = context.createLinearGradient(
        w - r,
        0,
        w,
        0
    );
    gradient.addColorStop(1, this.cachedClr);
    gradient.addColorStop(0, this.cachedClrBright);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(w - r, h - shift);
    context.lineTo(w - shift, h2);
    context.stroke();

    // bottom edge: straight line
    gradient = context.createLinearGradient(
        0,
        h - this.edge,
        0,
        h
    );
    gradient.addColorStop(1, this.cachedClr);
    gradient.addColorStop(0, this.cachedClrBright);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(r + shift, h - shift);
    context.lineTo(w - r - shift, h - shift);
    context.stroke();
};

// CommentMorph //////////////////////////////////////////////////////////

/*
    I am an editable, multi-line non-scrolling text window. I can be collapsed
    to a single abbreviated line or expanded to full. My width can be adjusted
    by the user, by height is determined by the size of my text body. I can be
    either placed in a scripting area or "stuck" to a block.
*/

// CommentMorph inherits from BoxMorph:

CommentMorph.prototype = new BoxMorph();
CommentMorph.prototype.constructor = CommentMorph;
CommentMorph.uber = BoxMorph.prototype;

// CommentMorph preferences settings (pseudo-inherited from SyntaxElement):

CommentMorph.prototype.refreshScale = function () {
    CommentMorph.prototype.fontSize = SyntaxElementMorph.prototype.fontSize;
    CommentMorph.prototype.padding = 5 * SyntaxElementMorph.prototype.scale;
    CommentMorph.prototype.rounding = 8 * SyntaxElementMorph.prototype.scale;
};

CommentMorph.prototype.refreshScale();

// CommentMorph instance creation:

function CommentMorph(contents) {
    this.init(contents);
}

CommentMorph.prototype.init = function (contents) {
    var myself = this,
        scale = SyntaxElementMorph.prototype.scale;
    this.block = null; // optional anchor block
    this.stickyOffset = null; // not to be persisted
    this.isCollapsed = false;
    this.titleBar = new BoxMorph(
        this.rounding,
        1.000001 * scale, // shadow bug in Chrome,
        new Color(255, 255, 180)
    );
    this.titleBar.color = new Color(255, 255, 180);
    this.titleBar.setHeight(fontHeight(this.fontSize) + this.padding);
    this.title = null;
    this.arrow = new ArrowMorph(
        'down',
        this.fontSize
    );
    this.arrow.noticesTransparentClick = true;
    this.arrow.mouseClickLeft = function () {myself.toggleExpand(); };
    this.contents = new TextMorph(
        contents || localize('add comment here...'),
        this.fontSize
    );
    this.contents.isEditable = true;
    this.contents.enableSelecting();
    this.contents.maxWidth = 90 * scale;
    this.contents.drawNew();
    this.handle = new HandleMorph(
        this.contents,
        80,
        this.fontSize * 2,
        -2,
        -2
    );
    this.handle.setExtent(new Point(11 * scale, 11 * scale));
    this.anchor = null;

    CommentMorph.uber.init.call(
        this,
        this.rounding,
        1.000001 * scale, // shadow bug in Chrome,
        new Color(255, 255, 180)
    );
    this.color = new Color(255, 255, 220);
    this.isDraggable = true;
    this.add(this.titleBar);
    this.add(this.arrow);
    this.add(this.contents);
    this.add(this.handle);

    this.fixLayout();
};

// CommentMorph ops:

CommentMorph.prototype.fullCopy = function () {
    var cpy = new CommentMorph(this.contents.text);
    cpy.isCollapsed = this.isCollapsed;
    cpy.setTextWidth(this.textWidth());
    return cpy;
};

CommentMorph.prototype.setTextWidth = function (pixels) {
    this.contents.maxWidth = pixels;
    this.contents.drawNew();
    this.fixLayout();
};

CommentMorph.prototype.textWidth = function () {
    return this.contents.maxWidth;
};

CommentMorph.prototype.text = function () {
    return this.contents.text;
};

CommentMorph.prototype.toggleExpand = function () {
    this.isCollapsed = !this.isCollapsed;
    this.fixLayout();
    this.align();
};

// CommentMorph layout:

CommentMorph.prototype.layoutChanged = function () {
    // react to a change of the contents area
    this.fixLayout();
    this.align();
};

CommentMorph.prototype.fixLayout = function () {
    var label,
        tw = this.contents.width() + 2 * this.padding,
        myself = this,
        oldFlag = Morph.prototype.trackChanges;

    Morph.prototype.trackChanges = false;

    if (this.title) {
        this.title.destroy();
        this.title = null;
    }
    if (this.isCollapsed) {
        this.contents.hide();
        this.title = new FrameMorph();
        this.title.alpha = 0;
        this.title.acceptsDrops = false;
        label = new StringMorph(
            this.contents.text,
            this.fontSize,
            null, // style (sans-serif)
            true // bold
        );
        label.rootForGrab = function () {
            return myself;
        };
        this.title.add(label);
        this.title.setHeight(label.height());
        this.title.setWidth(
            tw - this.arrow.width() - this.padding * 2 - this.rounding
        );
        this.add(this.title);
    } else {
        this.contents.show();
    }
    this.titleBar.setWidth(tw);
    this.contents.setLeft(this.titleBar.left() + this.padding);
    this.contents.setTop(this.titleBar.bottom() + this.padding);
    this.arrow.direction = this.isCollapsed ? 'right' : 'down';
    this.arrow.drawNew();
    this.arrow.setCenter(this.titleBar.center());
    this.arrow.setLeft(this.titleBar.left() + this.padding);
    if (this.title) {
        this.title.setPosition(
            this.arrow.topRight().add(new Point(this.padding, 0))
        );
    }
    Morph.prototype.trackChanges = oldFlag;
    this.changed();
    this.silentSetHeight(
        this.titleBar.height()
            + (this.isCollapsed ? 0 :
                    this.padding
                        + this.contents.height()
                        + this.padding)
    );
    this.silentSetWidth(this.titleBar.width());
    this.drawNew();
    this.handle.drawNew();
    this.changed();
};

// CommentMorph menu:

CommentMorph.prototype.userMenu = function () {
    var menu = new MenuMorph(this),
        myself = this;

    menu.addItem(
        "duplicate",
        function () {
            this.fullCopy().pickUp(this.world());
        },
        'make a copy\nand pick it up'
    );
    menu.addItem("delete", 'destroy');
    menu.addItem(
        "picture...",
        function () {
            window.open(myself.fullImage().toDataURL());
        },
        'open a new window\nwith a picture of this comment'
    );
    return menu;
};

// CommentMorph dragging & dropping

CommentMorph.prototype.prepareToBeGrabbed = function () {
    // disassociate from the block I'm posted to
    if (this.block) {
        this.block.comment = null;
        this.block = null;
    }
    if (this.anchor) {
        this.anchor.destroy();
        this.anchor = null;
        // fix shadow, because it was added earlier
        this.removeShadow();
        this.addShadow();
    }
};

CommentMorph.prototype.snap = function (hand) {
    // passing the hand is optional (for when blocks are dragged & dropped)
    if (!this.parent instanceof ScriptsMorph) {
        return null;
    }

    var target = this.parent.closestBlock(this, hand);

    if (target !== null) {
        target.comment = this;
        this.block = target;
        if (this.snapSound) {
            this.snapSound.play();
        }
    }
    this.align();
};

// CommentMorph sticking to blocks

CommentMorph.prototype.align = function (topBlock, ignoreLayer) {
    if (this.block) {
        var top = topBlock || this.block.topBlock(),
            affectedBlocks,
            tp,
            bottom,
            rightMost,
            scripts = top.parentThatIsA(ScriptsMorph);
        this.setTop(this.block.top() + this.block.corner);
        tp = this.top();
        bottom = this.bottom();
        affectedBlocks = top.allChildren().filter(function (child) {
            return child instanceof BlockMorph &&
                child.bottom() > tp &&
                child.top() < bottom;
        });
        rightMost = Math.max.apply(
            null,
            affectedBlocks.map(function (block) {return block.right(); })
        );

        this.setLeft(rightMost + 5);
        if (!ignoreLayer) {
            scripts.addBack(this); // push to back and show
        }

        if (!this.anchor) {
            this.anchor = new Morph();
            this.anchor.color = this.titleBar.color;
        }
        this.anchor.silentSetPosition(new Point(
            this.block.right(),
            this.top() + this.edge
        ));
        this.anchor.bounds.corner = new Point(
            this.left(),
            this.top() + this.edge + 1
        );
        this.anchor.drawNew();
        this.addBack(this.anchor);
        this.anchor.changed();
    }
};

CommentMorph.prototype.startFollowing = function (topBlock) {
    var myself = this;
    this.align(topBlock);
    this.addShadow();
    this.stickyOffset = this.position().subtract(this.block.position());
    this.step = function () {
        myself.setPosition(this.block.position().add(myself.stickyOffset));
    };
};

CommentMorph.prototype.stopFollowing = function () {
    this.removeShadow();
    delete this.step;
};

CommentMorph.prototype.destroy = function () {
    if (this.block) {
        this.block.comment = null;
    }
    CommentMorph.uber.destroy.call(this);
};

CommentMorph.prototype.stackHeight = function () {
    return this.height();
};
