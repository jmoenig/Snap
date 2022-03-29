/*

    blocks.js

    a programming construction kit
    based on morphic.js
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
    needs morphic.js, symbols.js and widgets.js


    hierarchy
    ---------
    the following tree lists all constructors hierarchically,
    indentation indicating inheritance. Refer to this list to get a
    contextual overview:

        Morph*
            ArrowMorph
            BlockHighlightMorph
            ScriptsMorph
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
                        TextSlotMorph
                    MultiArgMorph
                    TemplateSlotMorph
                BlockMorph
                    CommandBlockMorph
                        HatBlockMorph
                    ReporterBlockMorph
                        RingMorph
        BoxMorph*
            CommentMorph
            ScriptFocusMorph
        StringMorph*
            BlockLabelMorph
            InputSlotStringMorph
            InputSlotTextMorph
        SymbolMorph*
            BlockSymbolMorph

    * from morphic.js


    toc
    ---
    the following list shows the order in which all constructors are
    defined. Use this list to locate code in this document:

        SyntaxElementMorph
        BlockLabelMorph
        BlockSymbolMorph
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
        InputSlotStringMorph
        InputSlotTextMorph
        BooleanSlotMorph
        ArrowMorph
        TextSlotMorph
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

/*global BoxMorph, StructInputSlotMorph,
Color, ColorPaletteMorph, FrameMorph, HandleMorph, MenuMorph,
Morph, MorphicPreferences, Point, ScrollFrameMorph, ShadowMorph, ZERO,
StringMorph, TextMorph, contains, degrees, detect, PianoMenuMorph,
getDocumentPositionOf, isString, nop, 
radians, useBlurredShadows, SpeechBubbleMorph, modules, StageMorph, Sound,
fontHeight, TableFrameMorph, SpriteMorph, Context, ListWatcherMorph, Rectangle,
DialogBoxMorph, BlockInputFragmentMorph, PrototypeHatBlockMorph, WHITE, BLACK,
Costume, IDE_Morph, BlockDialogMorph, BlockEditorMorph, localize, isNil, CLEAR,
isSnapObject, PushButtonMorph, SpriteIconMorph, Process, AlignmentMorph,
CustomCommandBlockMorph, SymbolMorph, ToggleButtonMorph, DialMorph, utils,
SnapActions, SnapUndo, NetsBloxExtensions*/

// Global stuff ////////////////////////////////////////////////////////

modules.blocks = '2020-August-08';

/*
var SyntaxElementMorph;
var BlockMorph;
var BlockLabelMorph;
var BlockSymbolMorph;
var CommandBlockMorph;
var ReporterBlockMorph;
var ScriptsMorph;
var ArgMorph;
var CommandSlotMorph;
var CSlotMorph;
var InputSlotMorph;
var InputSlotStringMorph;
var InputSlotTextMorph;
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
var CommentMorph;
var ArgLabelMorph;
var TextSlotMorph;
var ScriptFocusMorph;
*/

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

        corner      - radius of command block rounding
        rounding    - radius of reporter block rounding
        edge        - width of 3D-ish shading box
        hatHeight   - additional top space for hat blocks
        hatWidth    - minimum width for hat blocks
        rfBorder    - pixel width of reification border (grey outline)
        minWidth    - minimum width for any syntax element's contents

    jigsaw shape:

        inset       - distance from indentation to left edge
        dent        - width of indentation bottom

    paddings:

        bottomPadding   - adds to the width of the bottom most c-slot
        cSlotPadding    - adds to the width of the open "C" in c-slots
        typeInPadding   - adds pixels between text and edge in input slots
        labelPadding    - adds left/right pixels to block labels

    label:

        labelFontName       - <string> specific font family name
        labelFontStyle      - <string> generic font family name, cascaded
        fontSize            - duh
        embossing           - <Point> offset for embossing effect
        labelWidth          - column width, used for word wrapping
        labelWordWrap       - <bool> if true labels can break after each word
        dynamicInputLabels  - <bool> if true inputs can have dynamic labels

    snapping:

        feedbackMinHeight   - height of white line for command block snaps
        minSnapDistance     - threshold when commands start snapping
        reporterDropFeedbackPadding  - increases reporter drop feedback

    color gradients:

        contrast        - <percent int> 3D-ish shading gradient contrast
        labelContrast   - <percent int> 3D-ish label shading contrast
        activeHighlight - <Color> for stack highlighting when active
        errorHighlight  - <Color> for error highlighting
        activeBlur      - <pixels int> shadow for blurred activeHighlight
        activeBorder    - <pixels int> unblurred activeHighlight
        rfColor         - <Color> for reified outlines and slot backgrounds
*/

SyntaxElementMorph.prototype.contrast = 65;

SyntaxElementMorph.prototype.setScale = function (num) {
    var scale = Math.min(Math.max(num, 1), 25);
    this.scale = scale;
    this.corner = 3 * scale;
    this.rounding = 9 * scale;
    this.edge = scale;
    this.flatEdge = scale * 0.5;
    this.jag = 5 * scale;
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
    this.feedbackMinHeight = 5;
    this.minSnapDistance = 20;
    this.reporterDropFeedbackPadding = 10 * scale;
    this.labelContrast = 25;
    this.activeHighlight = new Color(153, 255, 213);
    this.errorHighlight = new Color(173, 15, 0);
    this.activeBlur = 20;
    this.activeBorder = 4;
    this.rfColor = new Color(120, 120, 120);
};

SyntaxElementMorph.prototype.setScale(1);
SyntaxElementMorph.prototype.isCachingInputs = false;
SyntaxElementMorph.prototype.alpha = 1;

// SyntaxElementMorph instance creation:

function SyntaxElementMorph() {
    this.init();
}

SyntaxElementMorph.prototype.init = function () {
    this.cachedClr = null;
    this.cachedClrBright = null;
    this.cachedClrDark = null;
    this.cachedNormalColor = null; // for single-stepping
    this.isStatic = false; // if true, I cannot be exchanged

    SyntaxElementMorph.uber.init.call(this);

    this.defaults = [];
    this.cachedInputs = null;
    delete this.alpha;
};

// SyntaxElementMorph accessing:

SyntaxElementMorph.prototype.parts = function () {
    // answer my non-crontrol submorphs
    var nb = null;
    if (this.nextBlock) { // if I am a CommandBlock or a HatBlock
        nb = this.nextBlock();
    }
    return this.children.filter(child =>
        (child !== nb) &&
            !(child instanceof ShadowMorph) &&
                !(child instanceof BlockHighlightMorph)
    );
};

SyntaxElementMorph.prototype.inputs = function () {
    // answer my arguments and nested reporters
    if (isNil(this.cachedInputs) || !this.isCachingInputs) {
        this.cachedInputs = this.parts().filter(part =>
            part instanceof SyntaxElementMorph
        );
    }
    // this.debugCachedInputs();
    return this.cachedInputs;
};

SyntaxElementMorph.prototype.debugCachedInputs = function () {
    // private - only used for manually debugging inputs caching
    var realInputs, i;
    if (!isNil(this.cachedInputs)) {
        realInputs = this.parts().filter(part =>
            part instanceof SyntaxElementMorph
        );
    }
    if (this.cachedInputs.length !== realInputs.length) {
        throw new Error('cached inputs size do not match: ' +
            this.constructor.name);
    }
    for (i = 0; i < realInputs.length; i += 1) {
        if (this.cachedInputs[i] !== realInputs[i]) {
            throw new Error('cached input does not match: ' +
                this.constructor.name +
                ' #' +
                i +
                ' ' +
                this.cachedInputs[i].constructor.name +
                ' != ' +
                realInputs[i].constructor.name);
        }
    }
};

SyntaxElementMorph.prototype.allInputs = function () {
    // answer arguments and nested reporters of all children
    return this.allChildren().slice(0).reverse().filter(child =>
        (child instanceof ArgMorph) ||
            (child instanceof ReporterBlockMorph &&
                child !== this)
    );
};

SyntaxElementMorph.prototype.allEmptySlots = function () {
    // answer empty input slots of all children excluding myself,
    // but omit those in nested rings (lambdas) and JS-Function primitives.
    // Used by the evaluator when binding implicit formal parameters
    // to empty input slots
    var empty = [];
    if (!(this instanceof RingMorph) &&
            (this.selector !== 'reportJSFunction')) {
        this.children.forEach(morph => {
            if (morph.isEmptySlot && morph.isEmptySlot()) {
                empty.push(morph);
            } else if (morph.allEmptySlots) {
                empty = empty.concat(morph.allEmptySlots());
            }
        });
    }
    return empty;
};

SyntaxElementMorph.prototype.tagExitBlocks = function (stopTag, isCommand) {
    // tag 'report' and 'stop this block' blocks of all children including
    // myself, with either a stopTag (for "stop" blocks) or an indicator of
    // being inside a command block definition, but omit those in nested
    // rings (lambdas. Used by the evaluator when entering a procedure
    if (this.selector === 'doReport') {
        this.partOfCustomCommand = isCommand;
    } else if (this.selector === 'doStopThis') {
        this.exitTag = stopTag;
    } else {
        if (!(this instanceof RingMorph)) {
            this.children.forEach(morph => {
                if (morph.tagExitBlocks) {
                    morph.tagExitBlocks(stopTag, isCommand);
                }
            });
        }
    }
};

SyntaxElementMorph.prototype.replaceInput = function (oldArg, newArg) {
    var scripts = this.parentThatIsA(ScriptsMorph),
        replacement = newArg,
        idx = this.children.indexOf(oldArg),
        i = 0;

    // try to find the ArgLabel embedding the newArg,
    // used for the undrop() feature
    if (idx === -1 && newArg instanceof MultiArgMorph) {
        this.children.forEach(morph => {
            if (morph instanceof ArgLabelMorph &&
                morph.argMorph() === oldArg
            ) {
                idx = i;
            }
            i += 1;
        });
    }

    if (oldArg.cachedSlotSpec) {oldArg.cachedSlotSpec = null; }
    if (newArg.cachedSlotSpec) {newArg.cachedSlotSpec = null; }

    this.changed();
    if (newArg.parent) {
        newArg.parent.removeChild(newArg);
    }
    if (oldArg instanceof MultiArgMorph) {
        oldArg.inputs().forEach(inp => // preserve nested reporters
            oldArg.replaceInput(inp, new InputSlotMorph())
        );
        if (this.dynamicInputLabels) {
            replacement = new ArgLabelMorph(newArg);
        }
    }
    replacement.parent = this;
    this.children[idx] = replacement;
    if (oldArg instanceof ReporterBlockMorph && scripts) {
        if (!(oldArg instanceof RingMorph)
                || (oldArg instanceof RingMorph && oldArg.contents())) {
            scripts.add(oldArg);
            oldArg.moveBy(replacement.extent());
            oldArg.fixBlockColor();
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
        this.fixLayout();
    }
    this.cachedInputs = null;
};

SyntaxElementMorph.prototype.revertToDefaultInput = function (arg, noValues) {
    var idx = this.parts().indexOf(arg),
        inp = this.inputs().indexOf(arg),
        deflt = new InputSlotMorph(),
        def;

    // Update idx for struct support
    var structs = this.parts().filter(function(part) {
            return part instanceof StructInputSlotMorph;
        }),
        specOffset = structs.reduce(function(offset, struct) {
            return offset + struct.fields.length;
        }, 0);

    idx = idx !== -1 ? idx - specOffset : idx;

    if (idx !== -1) {
        if (this instanceof BlockMorph) {
            deflt = this.labelPart(this.parseSpec(this.blockSpec)[idx]);
            if (this.isCustomBlock) {
                def = this.isGlobal ? this.definition
                    : this.scriptTarget().getMethod(this.blockSpec);
                if (deflt instanceof InputSlotMorph) {
                    deflt.setChoices.apply(
                        deflt,
                        def.inputOptionsOfIdx(inp)
                    );
                }
                if (deflt instanceof InputSlotMorph ||
                    (deflt instanceof BooleanSlotMorph)
                ) {
                    deflt.setContents(
                        def.defaultValueOfInputIdx(inp)
                    );
                }
            }
        } else if (this instanceof MultiArgMorph) {
            deflt = this.labelPart(this.slotSpec);
        } else if (this instanceof ReporterSlotMorph) {
            deflt = this.emptySlot();
        }
    }

    // Try to set to the old value, first. If there is no old value,
    // then (potentially) try to set the default value
    var lastValue = SnapActions.getFieldValue(this, inp);
    if (lastValue !== undefined) {
        deflt.setContents(lastValue);
    } else if (!noValues) {  // set default value
        if (inp !== -1) {
            if (deflt instanceof MultiArgMorph) {
                deflt.setContents(this.defaults);
                deflt.defaults = this.defaults;
            } else if (!isNil(this.defaults[inp])) {
                deflt.setContents(this.defaults[inp]);
            }
        }
    }
    if (deflt.icon || deflt instanceof BooleanSlotMorph) {
        deflt.fixLayout();
    }
    this.replaceInput(arg, deflt);
    if (deflt instanceof MultiArgMorph) {
        deflt.refresh();
    } else if (deflt instanceof RingMorph) {
        deflt.fixBlockColor();
    }
    this.cachedInputs = null;
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

// SyntaxElementMorph reachable variables

SyntaxElementMorph.prototype.getVarNamesDict = function () {
    var block = this.parentThatIsA(BlockMorph),
        rcvr,
        tempVars = [],
        dict,
        oop = StageMorph.prototype.enableInheritance;

    if (!block) {
        return {};
    }
    rcvr = block.scriptTarget();
    block.allParents().forEach(morph => {
        if (morph instanceof PrototypeHatBlockMorph) {
            tempVars.push.apply(
                tempVars,
                morph.variableNames()
            );
            tempVars.push.apply(
                tempVars,
                morph.inputs()[0].inputFragmentNames()
            );
        } else if (morph instanceof BlockMorph) {
            morph.inputs().forEach(inp => {
                inp.allChildren().forEach(child => {
                    if (child instanceof TemplateSlotMorph) {
                        tempVars.push(child.contents());
                    } else if (child instanceof MultiArgMorph) {
                        child.children.forEach(m => {
                            if (m instanceof TemplateSlotMorph) {
                                tempVars.push(m.contents());
                            }
                        });
                    }
                });
            });
        }
    });
    if (rcvr) {
        dict = rcvr.variables.allNamesDict();
        tempVars.forEach(name =>
            dict[name] = name
        );
        if (block.selector === 'doSetVar') {
            // add settable object attributes
            dict['~'] = null;
            dict.my = [{// wrap the submenu into a 1-item array to translate it
                'anchor' : ['anchor'],
                'name' : ['name'],
                'temporary?' : ['temporary?'],
                'dangling?' : ['dangling?'],
                'draggable?' : ['draggable?'],
                'rotation style' : ['rotation style'],
                'rotation x' : ['rotation x'],
                'rotation y' : ['rotation y']
            }];
            if (oop) {
                dict.my[0].parent = ['parent'];
            }
            if (this.world().currentKey === 16) { // shift
                dict.my[0]['~'] = null; // don't forget we're inside an array...
                dict.my[0]['microphone modifier'] = ['microphone modifier'];
            }
        }
        return dict;
    }
    return {};
};

// Variable refactoring

SyntaxElementMorph.prototype.refactorVarInStack = function (
    oldName,
    newName,
    isScriptVar
) {
    // Rename all oldName var occurrences found in this block stack into newName
    // taking care of not being too greedy

    if ((this instanceof RingMorph && contains(this.inputNames(), oldName))
            || (!isScriptVar && this.definesScriptVariable(oldName))) {
        return;
    }

    if (this.selector === 'reportGetVar'
            && this.blockSpec === oldName) {
        this.setSpec(newName);
        this.fullChanged();
        this.fixLabelColor();
    }

    if (this.choices === 'getVarNamesDict'
            && this.contents().text === oldName) {
        this.setContents(newName);
    }

    if (this instanceof CustomCommandBlockMorph
            && this.definition.body
            && isNil(this.definition.declarations.get(oldName))
            && !contains(this.definition.variableNames, oldName)) {
        this.definition.body.expression.refactorVarInStack(oldName, newName);
    }

    this.inputs().forEach(input =>
        input.refactorVarInStack(oldName, newName)
    );

    if (this.nextBlock) {
        var nb = this.nextBlock();
        if (nb) {
            nb.refactorVarInStack(oldName, newName);
        }
    }
};

SyntaxElementMorph.prototype.definesScriptVariable = function (name) {
    // Returns true if this block is defining either a script local var or
    // an upVar called `name`
    return (this.selector === 'doDeclareVariables' ||
            (this.blockSpec && this.blockSpec.match('%upvar'))
    ) && detect(
        this.inputs()[0].allInputs(),
            input => (input.selector === 'reportGetVar' &&
                input.blockSpec === name)
    );
};

// SyntaxElementMorph copy-on-write support:

SyntaxElementMorph.prototype.selectForEdit = function () {
    var scripts = this.parentThatIsA(ScriptsMorph),
        ide = this.parentThatIsA(IDE_Morph),
        rcvr = ide ? ide.currentSprite : null,
        selected;
    if (scripts && rcvr && rcvr.inheritsAttribute('scripts')) {
        // copy on write:
        this.selectionID = true;
        rcvr.shadowAttribute('scripts');
        selected = detect(
            rcvr.scripts.allChildren(),
            m => m.selectionID
        );
        delete this.selectionID;
        delete selected.selectionID;
        return selected;
    }
    return this;
};

// SyntaxElementMorph drag & drop:

SyntaxElementMorph.prototype.reactToGrabOf = function (grabbedMorph) {
    var topBlock = this.topBlock(),
        affected;
    if (grabbedMorph instanceof CommandBlockMorph) {
        affected = this.parentThatIsA(CommandSlotMorph, ReporterSlotMorph);
        if (affected) {
            affected.fixLayout();
        }
    }
    if (topBlock) {
        topBlock.allComments().forEach(comment =>
            comment.align(topBlock)
        );
        if (topBlock.getHighlight()) {
            topBlock.addHighlight(topBlock.removeHighlight());
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
    var block;
    if (aColor) {
        if (!this.color.eq(aColor)) {
            block = this.parentThatIsA(BlockMorph);
            this.color = aColor;
            this.children.forEach(morph => {
                if (block && (morph instanceof StringMorph ||
                        morph instanceof SymbolMorph)) {
                    morph.shadowColor = block.color.darker(
                        block.labelContrast
                    );
                    morph.rerender();
                } else if (morph instanceof CommandSlotMorph) {
                    morph.setColor(aColor);
                }
            });
            this.rerender();
        }
    }
};

SyntaxElementMorph.prototype.setLabelColor = function (
    textColor,
    shadowColor,
    shadowOffset
) {
    this.children.forEach(morph => {
        let textclr = textColor;
        if (textclr.eq(WHITE)) textclr = morph.overrideWhite || WHITE;
        else if (textclr.eq(BLACK)) textclr = morph.overrideBlack || BLACK;

        if (morph instanceof StringMorph && !morph.isProtectedLabel) {
            morph.shadowOffset = shadowOffset || morph.shadowOffset;
            morph.shadowColor = shadowColor || morph.shadowColor;
            morph.setColor(textclr);
        } else if (morph instanceof MultiArgMorph
                || morph instanceof ArgLabelMorph
                || (morph instanceof SymbolMorph && !morph.isProtectedLabel)
                || (morph instanceof InputSlotMorph
                    && morph.isReadOnly)) {
            morph.setLabelColor(textclr, shadowColor, shadowOffset);
        } else if (morph.isLoop) { // C-shaped slot with loop arrow symbol
            morph.loop().setLabelColor(textclr, shadowColor, shadowOffset);
        }
    });
};

SyntaxElementMorph.prototype.flash = function () {
    if (!this.cachedNormalColor) {
        this.cachedNormalColor = this.color;
        this.setColor(this.activeHighlight);
    }
};

SyntaxElementMorph.prototype.unflash = function () {
    if (this.cachedNormalColor) {
        var clr = this.cachedNormalColor;
        this.cachedNormalColor = null;
        this.setColor(clr);
    }
};

SyntaxElementMorph.prototype.doWithAlpha = function (alpha, callback) {
    var current = SyntaxElementMorph.prototype.alpha,
        result;
    SyntaxElementMorph.prototype.alpha = alpha;
    result = callback();
    SyntaxElementMorph.prototype.alpha = current;
    return result;
};

// SyntaxElementMorph zebra coloring

SyntaxElementMorph.prototype.fixBlockColor = function (
    nearestBlock,
    isForced
) {
    this.children.forEach(morph => {
        if (morph instanceof SyntaxElementMorph) {
            morph.fixBlockColor(nearestBlock, isForced);
        }
    });
};

// SyntaxElementMorph label parts:

SyntaxElementMorph.prototype.labelPart = function (spec) {
    var part, tokens;
    if (spec[0] === '%' &&
            spec.length > 1 &&
            (this.selector !== 'reportGetVar' ||
                (spec === '%turtleOutline' && this.isObjInputFragment()))) {

        // check for variable multi-arg-slot:
        if ((spec.length > 5) && (spec.slice(0, 5) === '%mult')) {
            part = new MultiArgMorph(spec.slice(5));
            part.addInput();
            return part;
        }

        // inputs with hint text
        if ((spec.length > 5) && (spec.slice(0, 5) === '%hint')) {
            part = new HintInputSlotMorph('', spec.slice(5));
            return part;
        }

        if ((spec.length > 6) && (spec.slice(0, 6) === '%mhint')) {
            var token = spec.slice(6);
            part = new MultiHintArgMorph(token, null, 0); // third arg: min number of inputs

            part.isStatic = true;
            part.canBeEmpty = false;
            return part;
        }
        // single-arg and specialized multi-arg slots:
        switch (spec) {
        case '%imgsource':
            part = new InputSlotMorph(
                null, // text
                false, // non-numeric
                {
                    'pen trails': ['pen trails'],
                    'stage image': ['stage image']
                },
                true
            );
            part.setContents(['pen trails']);
            break;
        case '%inputs':
            part = new MultiArgMorph('%s', 'with inputs');
            part.isStatic = false;
            part.canBeEmpty = false;
            break;
        case '%scriptVars':
            part = new MultiArgMorph('%t', null, 1, spec);
            part.canBeEmpty = false;
            break;
        case '%blockVars':
            part = new MultiArgMorph('%t', 'block variables', 0, spec);
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
            break;
        case '%lists':
            part = new MultiArgMorph('%l', null, 0);
            part.addInput();
            part.addInput();
            break;
        case '%exp':
            part = new MultiArgMorph('%s', null, 0);
            part.addInput();
            part.isStatic = true;
            part.canBeEmpty = false;
            break;
        case '%br':
            part = new Morph();
            part.setExtent(ZERO);
            part.isBlockLabelBreak = true;
            part.getSpec = () => '%br';
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
            part = new InputSlotMorph(); // supports whitespace dots
            // part = new TextSlotMorph(); // multi-line, no whitespace dots
            part.minWidth = part.height() * 1.7; // "landscape"
            part.fixLayout();
            break;
        case '%mlt':
            part = new TextSlotMorph();
            part.fixLayout();
            break;
        case '%code':
            part = new TextSlotMorph();
            part.contents().fontName = 'monospace';
            part.contents().fontStyle = 'monospace';
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
                	'§_dir': null,
                    '(90) right' : 90,
                    '(-90) left' : -90,
                    '(0) up' : '0',
                    '(180) down' : 180,
                    'random' : ['random']
                }
            );
            part.setContents(90);
            break;
        case '%note':
            part = new InputSlotMorph(
                null, // test
                true, // numeric
                'pianoKeyboardMenu',
                false // read-only
            );
            break;
        case '%inst':
            part = new InputSlotMorph(
                null,
                true,
                {
                    '(1) sine' : 1,
                    '(2) square' : 2,
                    '(3) sawtooth' : 3,
                    '(4) triangle' : 4
                }
            );
            part.setContents(1);
            break;
        case '%audio':
            part = new InputSlotMorph(
                null, // text
                false, // numeric?
                'audioMenu',
                true // read-only
            );
            break;
        case '%aa': // audio attributes
            part = new InputSlotMorph(
                null, // text
                false, // numeric?
                {
                    'name' : ['name'],
                    'duration' : ['duration'],
                    'length' : ['length'],
                    'number of channels' : ['number of channels'],
                    'sample rate' : ['sample rate'],
                    'samples' : ['samples']
                },
                true // read-only
            );
            break;
        case '%img': // image attributes
            part = new InputSlotMorph(
                null, // text
                false, // numeric?
                {
                    'name' : ['name'],
                    'width' : ['width'],
                    'height' : ['height'],
                    'pixels' : ['pixels']
                },
                true // read-only
            );
            break;
        case '%rate':
            part = new InputSlotMorph(
                null,
                true,
                {
                    '22.05 kHz' : 22050,
                    '44.1 kHz' : 44100,
                    '88.2 kHz' : 88200,
                    '96 kHz' : 96000
                }
            );
            part.setContents(1);
            break;
        case '%audio':
            part = new InputSlotMorph(
                null, // text
                false, // numeric?
                'audioMenu',
                true // read-only
            );
            break;
        case '%aa': // audio attributes
            part = new InputSlotMorph(
                null, // text
                false, // numeric?
                {
                    'name' : ['name'],
                    'duration' : ['duration'],
                    'length' : ['length'],
                    'number of channels' : ['number of channels'],
                    'sample rate' : ['sample rate'],
                    'samples' : ['samples']
                },
                true // read-only
            );
            break;
        case '%img': // image attributes
            part = new InputSlotMorph(
                null, // text
                false, // numeric?
                {
                    'name' : ['name'],
                    'width' : ['width'],
                    'height' : ['height'],
                    'pixels' : ['pixels']
                },
                true // read-only
            );
            break;
        case '%rate':
            part = new InputSlotMorph(
                null,
                true,
                {
                    '22.05 kHz' : 22050,
                    '44.1 kHz' : 44100,
                    '88.2 kHz' : 88200,
                    '96 kHz' : 96000
                }
            );
            part.setContents(1);
            break;
        case '%httprt': // http request type
            part = new InputSlotMorph(
                null, // text
                false, // numeric?
                {
                    'GET': ['GET'],
                    'POST': ['POST'],
                    'PUT': ['PUT'],
                    'DELETE': ['DELETE'],
                },
                true // read-only
            );
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
        case '%interaction':
            part = new InputSlotMorph(
                null, // text
                false, // numeric?
                {
                    'clicked' : ['clicked'],
                    'pressed' : ['pressed'],
                    'dropped' : ['dropped'],
                    'mouse-entered' : ['mouse-entered'],
                    'mouse-departed' : ['mouse-departed'],
                    'scrolled-up' : ['scrolled-up'],
                    'scrolled-down' : ['scrolled-down'],
                    'stopped' : ['stopped'] // experimental
                },
                true // read-only
            );
            part.isStatic = true;
            break;
        case '%dates':
            part = new InputSlotMorph(
                null, // text
                false, // non-numeric
                {
                    'year' : ['year'],
                    'month' : ['month'],
                    'date' : ['date'],
                    'day of week' : ['day of week'],
                    'hour' : ['hour'],
                    'minute' : ['minute'],
                    'second' : ['second'],
                    'time in milliseconds' : ['time in milliseconds']
                },
                true // read-only
            );
            part.setContents(['date']);
            break;
        case '%delim':
            part = new InputSlotMorph(
                null, // text
                false, // numeric?
                {
                    'letter' : ['letter'],
                    'word' : ['word'],
                    'line' : ['line'],
                    'tab' : ['tab'],
                    'cr' : ['cr'],
                    'csv' : ['csv'],
                    'json' : ['json']
                    /*
                    'csv records' : ['csv records'],
                    'csv fields' : ['csv fields']
                    */
                },
                false // read-only
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
        case '%dim':
            part = new InputSlotMorph(
                null,
                true,
                {
                    current : ['current']
                }
            );
            // part.setContents( ['current']);
            break;
        case '%rel':
            part = new InputSlotMorph(
                null, // text
                false, // numeric?
                {
                    'distance' : ['distance'],
                    'direction' : ['direction']
                },
                true // read-only
            );
            break;
        case '%loc': // location
            part = new InputSlotMorph(
                null,
                false,
                'locationMenu',
                true
            );
            break;
        case '%spr':
            part = new InputSlotMorph(
                null,
                false,
                'objectsMenu',
                true
            );
            break;
        case '%self':
            part = new InputSlotMorph(
                null,
                false,
                'objectsMenuWithSelf',
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
        case '%get': // sprites, parts, speciment, clones
            part = new InputSlotMorph(
                null,
                false,
                'gettablesMenu',
                true
            );
            part.isStatic = true;
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
                    color: ['color'],
                    saturation: ['saturation'],
                    brightness : ['brightness'],
                    ghost: ['ghost'],
                    fisheye: ['fisheye'],
                    whirl: ['whirl'],
                    pixelate: ['pixelate'],
                    mosaic: ['mosaic'],
                    negative : ['negative']
                    // duplicate: ['duplicate'],
                    // comic: ['comic'],
                    // confetti: ['confetti']
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
                    'any key' : ['any key'],
                    'up arrow': ['up arrow'],
                    'down arrow': ['down arrow'],
                    'right arrow': ['right arrow'],
                    'left arrow': ['left arrow'],
                    space : ['space'],
                    '+' : ['+'],
                    '-' : ['-'],
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
        case '%msgType':
            part = new InputSlotMorph(
                null,
                false,
                'messageTypes',
                true
            );
            break;
        case '%msgOutput':
            part = new MessageOutputSlotMorph();
            break;
        case '%msgInput':
            part = new MessageInputSlotMorph();
            break;
        case '%roles':
            // role ids
            part = new InputSlotMorph(
                null,
                false,
                'roleNames'
            );
            break;
        case '%serviceNames':
            part = new InputSlotMorph(
                null,
                false,
                'serviceNames',
                true
            );
            part.isStatic = true;
            break;
        case '%rpcActions':
            part = new InputSlotMorph(
                null,
                false,
                'rpcActions',
                true
            );
            break;
        case '%rpcMethod':
            part = new RPCInputSlotMorph();
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
                'messagesReceivedMenu',
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
            break;
        case '%fun':
            part = new InputSlotMorph(
                null,
                false,
                {
                    abs : ['abs'],
                    // '\u2212' : ['\u2212'], // minus-sign
                    neg : ['neg'],
                    ceiling : ['ceiling'],
                    floor : ['floor'],
                    sqrt : ['sqrt'],
                    sin : ['sin'],
                    cos : ['cos'],
                    tan : ['tan'],
                    asin : ['asin'],
                    acos : ['acos'],
                    atan : ['atan'],
                    ln : ['ln'],
                    log : ['log'],
                    lg : ['lg'],
                    'e^' : ['e^'],
                    '10^' : ['10^'],
                    '2^' : ['2^'],
                    id: ['id']
                },
                true
            );
            part.setContents(['sqrt']);
            break;
        case '%layer':
            part = new InputSlotMorph(
                null,
                false,
                {
                    front : ['front'],
                    back : ['back']
                },
                true
            );
            part.setContents(['front']);
            break;
        case '%hsva':
            part = new InputSlotMorph(
                null,
                false,
                {
                    hue : ['hue'],
                    saturation : ['saturation'],
                    brightness : ['brightness'],
                    transparency : ['transparency']
                },
                true
            );
            part.setContents(['hue']);
            break;
        case '%pen':
            part = new InputSlotMorph(
                null,
                false,
                {
                    size : ['size'],
                    hue : ['hue'],
                    saturation : ['saturation'],
                    brightness : ['brightness'],
                    transparency : ['transparency']
                },
                true
            );
            part.setContents(['hue']);
            break;
        case '%asp': // aspect
            part = new InputSlotMorph(
                null,
                false,
                {
                    hue : ['hue'],
                    saturation : ['saturation'],
                    brightness : ['brightness'],
                    transparency : ['transparency'],
                    'r-g-b-a' : ['r-g-b-a'],
                    '~' : null,
                    sprites : ['sprites'],
                },
                true
            );
            part.setContents(['hue']);
            break;
        case '%txtfun':
            part = new InputSlotMorph(
                null,
                false,
                {
                    'encode URI' : ['encode URI'],
                    'decode URI' : ['decode URI'],
                    'encode URI component' : ['encode URI component'],
                    'decode URI component' : ['decode URI component'],
                    'XML escape' : ['XML escape'],
                    'XML unescape' : ['XML unescape'],
                    'hex sha512 hash' : ['hex sha512 hash']
                },
                true
            );
            part.setContents(['encode URI']);
            break;
        case '%stopChoices':
            part = new InputSlotMorph(
                null,
                false,
                {
                    'all' : ['all'],
                    'this script' : ['this script'],
                    'this block' : ['this block'],
                    'all but this script' : ['all but this script'],
                    'other scripts in sprite' : ['other scripts in sprite']
                },
                true
            );
            part.setContents(['all']);
            part.isStatic = true;
            break;
        case '%setting':
            part = new InputSlotMorph(
                null,
                false,
                {
                    'turbo mode' : ['turbo mode'],
                    'flat line ends' : ['flat line ends'],
                    'log pen vectors' : ['log pen vectors'],
                    'video capture' : ['video capture'],
                    'mirror video' : ['mirror video']
                },
                true
            );
            part.setContents(['turbo mode']);
            part.isStatic = true;
            break;
        case '%typ':
            part = new InputSlotMorph(
                null,
                false,
                'typesMenu',
                true
            );
            part.setContents(['number']);
            break;
        case '%mapValue':
            part = new InputSlotMorph(
                null,
                false,
                {
                    String : ['String'],
                    Number : ['Number'],
                    'true' : ['true'],
                    'false' : ['false']
                },
                true
            );
            part.setContents(['String']);
            part.isStatic = true;
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
        case '%shd':
            part = new InputSlotMorph(
                null,
                false,
                'shadowedVariablesMenu',
                true
            );
            // part.isStatic = true;
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
        case '%codeKind':
            part = new InputSlotMorph(
                null,
                false,
                {
                    code : ['code'],
                    header : ['header']
                },
                true
            );
            part.setContents(['code']);
            break;
        case '%l':
            part = new ArgMorph('list');
            break;
        case '%b':
            part = new BooleanSlotMorph();
            break;
        case '%boolUE':
            part = new BooleanSlotMorph();
            part.isUnevaluated = true;
            break;
        case '%bool':
            part = new BooleanSlotMorph(true);
            part.isStatic = true;
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
        case '%ca':
            part = new CSlotMorph(); // non-static
            part.isLoop = true; // has a loop symbol
            part.add(this.labelPart('%loopArrow'));
            break;
        case '%cl':
            part = new CSlotMorph();
            part.isStatic = true; // rejects reporter drops
            part.isLambda = true; // auto-reifies nested script
            break;
        case '%cla':
            part = new CSlotMorph();
            part.isStatic = true; // rejects reporter drops
            part.isLambda = true; // auto-reifies nested script
            part.isLoop = true; // has a loop symbol
            part.add(this.labelPart('%loopArrow'));
            break;
        case '%loop':
            part = new CSlotMorph();
            part.isStatic = true;
            part.isLoop = true; // has a loop symbol
            part.add(this.labelPart('%loopArrow'));
            break;
        case '%loopArrow':
            part = new BlockSymbolMorph('loop');
            part.size = this.fontSize * 0.7;
            part.color = WHITE;
            part.shadowColor = this.color.darker(this.labelContrast);
            part.shadowOffset = MorphicPreferences.isFlat ?
                    ZERO : this.embossing;
            part.isFading = true;
            part.fixLayout();
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

    // code mapping (experimental)

        case '%codeListPart':
            part = new InputSlotMorph(
                null, // text
                false, // numeric?
                {
                    'list' : ['list'],
                    'item' : ['item'],
                    'delimiter' : ['delimiter']
                },
                true // read-only
            );
            break;
        case '%codeListKind':
            part = new InputSlotMorph(
                null, // text
                false, // numeric?
                {
                    'collection' : ['collection'],
                    'variables' : ['variables'],
                    'parameters' : ['parameters']
                },
                true // read-only
            );
            break;

    // symbols:

        case '%turtle':
            part = new BlockSymbolMorph('turtle');
            part.size = this.fontSize * 1.2;
            part.color = WHITE;
            part.shadowColor = this.color.darker(this.labelContrast);
            part.shadowOffset = MorphicPreferences.isFlat ?
                    ZERO : this.embossing;
            part.fixLayout();
            break;
        case '%turtleOutline':
            part = new BlockSymbolMorph('turtleOutline');
            part.size = this.fontSize;
            part.color = WHITE;
            part.isProtectedLabel = true; // doesn't participate in zebraing
            part.shadowColor = this.color.darker(this.labelContrast);
            part.shadowOffset = MorphicPreferences.isFlat ?
                    ZERO : this.embossing;
            part.fixLayout();
            break;
        case '%clockwise':
            part = new BlockSymbolMorph('turnRight');
            part.size = this.fontSize * 1.5;
            part.color = WHITE;
            part.isProtectedLabel = false; // zebra colors
            part.shadowColor = this.color.darker(this.labelContrast);
            part.shadowOffset = MorphicPreferences.isFlat ?
                    ZERO : this.embossing;
            part.fixLayout();
            break;
        case '%counterclockwise':
            part = new BlockSymbolMorph('turnLeft');
            part.size = this.fontSize * 1.5;
            part.color = WHITE;
            part.isProtectedLabel = false; // zebra colors
            part.shadowColor = this.color.darker(this.labelContrast);
            part.shadowOffset = MorphicPreferences.isFlat ?
                    ZERO : this.embossing;
            part.fixLayout();
            break;
        case '%greenflag':
            part = new BlockSymbolMorph('flag');
            part.size = this.fontSize * 1.5;
            part.color = new Color(0, 200, 0);
            part.isProtectedLabel = true; // doesn't participate in zebraing
            part.shadowColor = this.color.darker(this.labelContrast);
            part.shadowOffset = MorphicPreferences.isFlat ?
                    ZERO : this.embossing;
            part.fixLayout();
            break;
        case '%stop':
            part = new BlockSymbolMorph('octagon');
            part.size = this.fontSize * 1.5;
            part.color = new Color(200, 0, 0);
            part.isProtectedLabel = true; // doesn't participate in zebraing
            part.shadowColor = this.color.darker(this.labelContrast);
            part.shadowOffset = MorphicPreferences.isFlat ?
                    ZERO : this.embossing;
            part.fixLayout();
            break;
        case '%pause':
            part = new BlockSymbolMorph('pause');
            part.size = this.fontSize;
            part.color = new Color(255, 220, 0);
            part.isProtectedLabel = true; // doesn't participate in zebraing
            part.shadowColor = this.color.darker(this.labelContrast);
            part.shadowOffset = MorphicPreferences.isFlat ?
                    ZERO : this.embossing;
            part.fixLayout();
            break;
        case '%blitz':
            part = new BlockSymbolMorph('flash');
            part.size = this.fontSize;
            part.color = WHITE;
            part.isProtectedLabel = false; // zebra colors
            part.shadowColor = this.color.darker(this.labelContrast);
            part.shadowOffset = MorphicPreferences.isFlat ?
                    ZERO : this.embossing;
            part.fixLayout();
            break;
        case '%list':
            part = new BlockSymbolMorph('list');
            part.size = this.fontSize;
            part.color = WHITE;
            part.shadowColor = this.color.darker(this.labelContrast);
            part.shadowOffset = MorphicPreferences.isFlat ?
                    ZERO : this.embossing;
            part.fixLayout();
            break;

        // Video motion

        case '%vid':
            part = new InputSlotMorph(
                null,
                false, {
                    'snap': ['snap'],
                    'motion': ['motion'],
                    'direction': ['direction']
                },
                true // read-only
            );
            part.setContents(['motion']);
            break;
        case '%on':
            part = new InputSlotMorph(
                null,
                false, {
                    'this sprite': ['this sprite'],
                    'stage': ['stage']
                },
                true // read-only
            );
            break;
        case '%self':
            part = new InputSlotMorph(
                null,
                false,
                'objectsMenuWithSelf',
                true
            );
            break;
        case '%vid':
            part = new InputSlotMorph(
                null,
                false, {
                    'snap': ['snap'],
                    'motion': ['motion'],
                    'direction': ['direction']
                },
                true // read-only
            );
            part.setContents(['motion']);
            break;
        default:
            part = NetsBloxExtensions.getLabelPart(spec);
            nop();
        }
    } else if (spec[0] === '$' &&
            spec.length > 1 &&
            this.selector !== 'reportGetVar') {

        // allow GUI symbols as label icons
        // usage: $symbolName[-size-r-g-b], size and color values are optional
        // If there isn't a symbol under that name, it just styles whatever is
        // after "$", so you can add unicode icons to your blocks, for example
        // ☺️
        tokens = spec.slice(1).split('-');
        if (!contains(SymbolMorph.prototype.names, tokens[0])) {
            part = new StringMorph(tokens[0]);
            part.fontName = this.labelFontName;
            part.fontStyle = this.labelFontStyle;
            part.fontSize = this.fontSize * (+tokens[1] || 1);
        } else {
            part = new BlockSymbolMorph(tokens[0]);
            part.size = this.fontSize * (+tokens[1] || 1.2);
        }
        part.color = new Color(
            +tokens[2] === 0 ? 0 : +tokens[2] || 255,
            +tokens[3] === 0 ? 0 : +tokens[3] || 255,
            +tokens[4] === 0 ? 0 : +tokens[4] || 255
        );
        part.isProtectedLabel = tokens.length > 2; // zebra colors
        part.shadowColor = this.color.darker(this.labelContrast);
        part.shadowOffset = MorphicPreferences.isFlat ?
                ZERO : this.embossing;
        part.fixLayout();
    } else {
        part = new BlockLabelMorph(
            spec, // text
            this.fontSize, // fontSize
            this.labelFontStyle, // fontStyle
            true, // bold
            false, // italic
            false, // isNumeric
            MorphicPreferences.isFlat ?
                    ZERO : this.embossing, // shadowOffset
            this.color.darker(this.labelContrast), // shadowColor
            this.overrideWhite || WHITE, // color
            this.labelFontName // fontName
        );

    }
    return part;
};

SyntaxElementMorph.prototype.isObjInputFragment = function () {
    // private - for displaying a symbol in a variable block template
    return (this.selector === 'reportGetVar') &&
        (this.getSlotSpec() === '%t') &&
        (this.parent.fragment.type === '%obj');
};

// SyntaxElementMorph layout:

SyntaxElementMorph.prototype.fixLayout = function () {
    var nb,
        parts = this.parts(),
        pos = this.position(),
        x = 0,
        y,
        lineHeight = 0,
        maxX = 0,
        blockWidth = this.minWidth,
        blockHeight,
        l = [],
        lines = [],
        space = this.isPrototype ?
                1 : Math.floor(fontHeight(this.fontSize) / 3),
        ico = this instanceof BlockMorph && this.hasLocationPin() ?
        	this.methodIconExtent().x + space : 0,
        bottomCorrection,
        hasLoopCSlot = false,
        hasLoopArrow = false;

    if ((this instanceof MultiArgMorph) && (this.slotSpec !== '%cs')) {
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
    parts.forEach(part => {
        if ((part instanceof CSlotMorph)
                || (part.slotSpec === '%cs')) {
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
            // this.fullChanged();
            // this.removeChild(part);
        } else {
            if (part.isVisible) {
                x += part.fullBounds().width() + space;
            }
            if ((x > this.labelWidth) || part.isBlockLabelBreak) {
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
        if (this.slotSpec === '%cs' && this.inputs().length > 0) {
            y -= this.rounding;
        }
    }
    lines.forEach(line => {
        if (hasLoopCSlot) {
            hasLoopArrow = true;
            hasLoopCSlot = false;
        }
        x = this.left() + ico + this.edge + this.labelPadding;
        if (this instanceof RingMorph) {
            x = this.left() + space; //this.labelPadding;
        } else if (this.isPredicate) {
            x = this.left() + ico + this.rounding;
        } else if (this instanceof MultiArgMorph ||
            this instanceof ArgLabelMorph
        ) {
            x = this.left();
        }
        y += lineHeight;
        lineHeight = 0;
        line.forEach(part => {
            if (part.isLoop) {
                hasLoopCSlot = true;
            }
            if (part instanceof CSlotMorph) {
                x -= this.labelPadding;
                if (this.isPredicate) {
                    x = this.left() + ico + this.rounding;
                }
                part.setColor(this.color);
                part.setPosition(new Point(x, y));
                lineHeight = part.height();
            } else if (part instanceof MultiArgMorph &&
                    (part.slotSpec === '%cs')) {
                if (this.isPredicate) {
                    x += this.corner;
                }
                part.setPosition(new Point(x, y));
                lineHeight = part.height();
            } else {
                part.setPosition(new Point(x, y));
                if (!part.isBlockLabelBreak) {
                    if (part.slotSpec === '%c' || part.slotSpec === '%loop') {
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

    // adjust label row below a loop-arrow C-slot to accomodate the loop icon
    if (hasLoopArrow) {
        x += this.fontSize * 1.5;
        maxX = Math.max(maxX, x);
        hasLoopArrow = false;
    }

    // center parts vertically on each line:
        line.forEach(part => {
            part.moveBy(new Point(
                0,
                Math.floor((lineHeight - part.height()) / 2)
            ));
        });
    });

    // determine my height:
    y += lineHeight;
    if (this.children.some(any => any instanceof CSlotMorph)) {
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
    } else if ((this instanceof MultiArgMorph && this.slotSpec !== '%cs')
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

    // set my extent (silently, because we'll redraw later anyway):
    this.bounds.setWidth(blockWidth);
    this.bounds.setHeight(blockHeight);

    // adjust CSlots and collect holes
    this.holes = [];
    parts.forEach(part => {
        var adjustMultiWidth = 0;
        if (part instanceof CSlotMorph || (part.slotSpec === '%cs')) {
            if (this.isPredicate) {
                part.bounds.setWidth(
                    blockWidth -
                        ico -
                        this.rounding -
                        this.inset -
                        this.corner
                );
                adjustMultiWidth = this.corner;
            } else {
                part.bounds.setWidth(blockWidth - this.edge - ico);
                adjustMultiWidth = this.corner + this.edge;
            }
            if (part.fixLoopLayout) {
                part.fixLoopLayout();
            }
        }
        if (part.slotSpec === '%cs') { // a multi-arg
            part.inputs().forEach(slot =>
                slot.bounds.setWidth(
                    part.right() - slot.left() - adjustMultiWidth
                )
            );
        }
        part.fixHolesLayout();
        this.holes.push.apply(
            this.holes,
            part.holes.map( hole =>
                hole.translateBy(part.position().subtract(pos))
            )
        );
    });

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
    if (this instanceof BlockMorph && this.parent && this.parent.fixLayout) {
        this.parent.fixLayout();
        this.parent.changed();
        if (this.parent instanceof SyntaxElementMorph) {
            return;
        }
    }
    
    this.fixHighlight();
};

SyntaxElementMorph.prototype.fixHighlight = function () {
    var top = this.topBlock();
    if (top.getHighlight && top.getHighlight()) {
        top.addHighlight(top.removeHighlight());
    }
};

SyntaxElementMorph.prototype.methodIconExtent = function () {
    // answer the span of the icon for the "local method" indicator
    var ico = this.fontSize * 1.2;
    return this.hasLocationPin() ? new Point(ico * 0.66, ico)
    		: new Point(0, 0);
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

SyntaxElementMorph.prototype.showBubble = function (value, exportPic, target) {
    var bubble,
        txt,
        img,
        morphToShow,
        isClickable = false,
        ide = this.parentThatIsA(IDE_Morph),
        anchor = this,
        pos = this.rightCenter().add(new Point(2, 0)),
        sf = this.parentThatIsA(ScrollFrameMorph),
        wrrld = this.world();

    if ((value === undefined) || !wrrld) {
        return null;
    }
    if (value instanceof ListWatcherMorph) {
        morphToShow = value;
        morphToShow.update(true);
        morphToShow.step = value.update;
        morphToShow.isDraggable = false;
        morphToShow.expand(this.parentThatIsA(ScrollFrameMorph).extent());
        isClickable = true;
    } else if (value instanceof TableFrameMorph) {
        morphToShow = value;
        morphToShow.isDraggable = false;
        morphToShow.expand(this.parentThatIsA(ScrollFrameMorph).extent());
        isClickable = true;
    } else if (value instanceof Morph) {
        if (isSnapObject(value)) {
            img = value.thumbnail(new Point(40, 40));
            morphToShow = new Morph();
            morphToShow.isCachingImage = true;
            morphToShow.bounds.setWidth(img.width);
            morphToShow.bounds.setHeight(img.height);
            morphToShow.cachedImage = img;
            morphToShow.version = value.version;
            morphToShow.step = function () {
                if (this.version !== value.version) {
                    img = value.thumbnail(new Point(40, 40));
                    this.cachedImage = img;
                    this.version = value.version;
                    this.changed();
                }
            };
        } else {
            img = value.fullImage();
            morphToShow = new Morph();
            morphToShow.isCachingImage = true;
            morphToShow.bounds.setWidth(img.width);
            morphToShow.bounds.setHeight(img.height);
            morphToShow.cachedImage = img;
        }
    } else if (value instanceof Costume) {
        img = value.thumbnail(new Point(40, 40));
        morphToShow = new Morph();
        morphToShow = new Morph();
        morphToShow.isCachingImage = true;
        morphToShow.bounds.setWidth(img.width);
        morphToShow.bounds.setHeight(img.height);
        morphToShow.cachedImage = img;
    } else if (value instanceof Sound) {
        morphToShow = new SymbolMorph('notes', 30);
    } else if (value instanceof Context) {
        img = value.image();
        morphToShow = new Morph();
        morphToShow.isCachingImage = true;
        morphToShow.bounds.setWidth(img.width);
        morphToShow.bounds.setHeight(img.height);
        morphToShow.cachedImage = img;
    } else if (typeof value === 'boolean') {
        morphToShow = SpriteMorph.prototype.booleanMorph.call(
            null,
            value
        );
    } else if (isString(value)) {
        txt  = value.length > 500 ? value.slice(0, 500) + '...' : value;
        morphToShow = new TextMorph(
            txt,
            this.fontSize
        );
    } else if (value === null) {
        morphToShow = new TextMorph(
            '',
            this.fontSize
        );
    } else if (value === 0) {
        morphToShow = new TextMorph(
            '0',
            this.fontSize
        );
    } else if (value.toString) {
        morphToShow = new TextMorph(
            value.toString(),
            this.fontSize
        );
    }
    if (ide && (ide.currentSprite !== target)) {
        if (target instanceof StageMorph) {
            anchor = ide.corral.stageIcon;
        } else if (target) {
        	if (target.isTemporary) {
         		target = detect(
					target.allExemplars(),
     				each => !each.isTemporary
         		);
     		}
            anchor = detect(
                ide.corral.frame.contents.children,
                icon => icon.object === target
            );
        } else {
        	target = ide;
        }
        pos = anchor.center();
    }
    bubble = new SpeechBubbleMorph(
        morphToShow,
        null,
        Math.max(this.rounding - 2, 6),
        0
    );
    bubble.popUp(
        wrrld,
        pos,
        isClickable
    );
    if (exportPic) {
        this.exportPictureWithResult(bubble);
    }
    if (anchor instanceof SpriteIconMorph) {
        bubble.keepWithin(ide.corral);
    } else if (sf) {
        bubble.keepWithin(sf);
    }
};

SyntaxElementMorph.prototype.exportPictureWithResult = function (aBubble) {
    var ide = this.parentThatIsA(IDE_Morph) ||
            this.parentThatIsA(BlockEditorMorph).target.parentThatIsA(
                IDE_Morph
            ),
        scr = this.fullImage(),
        bub = aBubble.fullImage(),
        taller = Math.max(0, bub.height - scr.height),
        pic = newCanvas(new Point(
            scr.width + bub.width + 2,
            scr.height + taller
        )),
        ctx = pic.getContext('2d');
    ctx.drawImage(scr, 0, pic.height - scr.height);
    ctx.drawImage(bub, scr.width + 2, 0);
    // request to open pic in new window.
    ide.saveCanvasAs(
        pic,
        (ide.projectName || localize('untitled')) + ' ' + localize('script pic')
    );
};

// SyntaxElementMorph code mapping

/*
    code mapping lets you use blocks to generate arbitrary text-based
    source code that can be exported and compiled / embedded elsewhere,
    it's not part of Snap's evaluator and not needed for Snap itself
*/

SyntaxElementMorph.prototype.mappedCode = function (definitions) {
    var result = this.evaluate();
    if (result instanceof BlockMorph) {
        return result.mappedCode(definitions);
    }
    return result;
};

// BlockLabelMorph ///////////////////////////////////////////////

/*
    I am a piece of single-line text written on a block. I serve as a
    container for sharing typographic attributes among my instances
*/

// BlockLabelMorph inherits from StringMorph:

BlockLabelMorph.prototype = new StringMorph();
BlockLabelMorph.prototype.constructor = BlockLabelMorph;
BlockLabelMorph.uber = StringMorph.prototype;

function BlockLabelMorph(
    text,
    fontSize,
    fontStyle,
    bold,
    italic,
    isNumeric,
    shadowOffset,
    shadowColor,
    color,
    fontName
) {
    this.init(
        text,
        fontSize,
        fontStyle,
        bold,
        italic,
        isNumeric,
        shadowOffset,
        shadowColor,
        color,
        fontName
    );
}
BlockLabelMorph.prototype.getRenderColor = function () {
    var block = this.parentThatIsA(BlockMorph);
    if (MorphicPreferences.isFlat) {
        return block.alpha > 0.5 ? this.color
            : block.color.solid().darker(Math.max(block.alpha * 200, 0.1));
    }
    return block.alpha > 0.5 ? this.color
        : block.color.solid().lighter(Math.max(block.alpha * 200, 0.1));

};

BlockLabelMorph.prototype.getShadowRenderColor = function () {
    return this.parentThatIsA(BlockMorph).alpha > 0.5 ?
        this.shadowColor
            : CLEAR;
};

// BlockSymbolMorph //////////////////////////////////////////////////////////

/*
    I am a pictogram written on a block. I serve as a
    container for sharing typographic attributes among my instances.
    NOTE: I have an additional attribute ".isFading" that governs
    my behavior when fading out the blocks I'm embedded in
*/

// BlockSymbolMorph inherits from SymbolMorph:

BlockSymbolMorph.prototype = new SymbolMorph();
BlockSymbolMorph.prototype.constructor = BlockSymbolMorph;
BlockSymbolMorph.uber = SymbolMorph.prototype;

function BlockSymbolMorph(name, size, color, shadowOffset, shadowColor) {
    this.init(name, size, color, shadowOffset, shadowColor);
}

BlockSymbolMorph.prototype.getRenderColor = function () {
    var block = this.parentThatIsA(BlockMorph);
    if (MorphicPreferences.isFlat) {
        if (this.isFading) {
            return this.color.mixed(block.alpha, this.overrideWhite || WHITE);
        }
        if (this.color.eq(this.overrideWhite || WHITE)) {
            return this.parent.alpha > 0.5 ? this.color
                : block.color.solid().darker(Math.max(block.alpha * 200, 0.1));
        }
        if (this.color.eq(this.overrideBlack || BLACK)) {
            return this.parent.alpha > 0.5 ? this.color
                : block.color.solid().darker(Math.max(block.alpha * 200, 0.1));
        }
        return this.color;
    }
    if (this.isFading) {
        return this.color.mixed(
            block.alpha,
            SpriteMorph.prototype.paletteColor
        );
    }
    if (this.color.eq(this.overrideBlack || BLACK)) {
        return block.alpha > 0.5 ? this.color
            : block.color.solid().lighter(Math.max(block.alpha * 200, 0.1));
    }
    if (this.color.eq(this.overrideWhite || WHITE)) {
        return this.parent.alpha > 0.5 ? this.color
            : block.color.solid().lighter(Math.max(block.alpha * 200, 0.1));
    }
    return this.color;
};

BlockSymbolMorph.prototype.getShadowRenderColor = function () {
    return this.parent.alpha > 0.5 ? this.shadowColor : CLEAR;
};

// BlockMorph //////////////////////////////////////////////////////////

/*
    I am an abstraction of all blocks (commands, reporters, hats).

    Aside from the visual settings inherited from Morph and
    SyntaxElementMorph my most important attributes and public
    accessors are:

    selector        - (string) name of method to be triggered
    scriptTarget()  - answer the object (sprite) to which I apply
    inputs()        - answer an array with my arg slots and nested reporters
    defaults        - an optional Array containing default input values
    topBlock()      - answer the top block of the stack I'm attached to
    blockSpec       - a formalized description of my label parts
    setSpec()       - force me to change my label structure
    evaluate()      - answer the result of my evaluation
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

    %br     - user-forced line break
    %s      - white rectangular type-in slot ("string-type")
    %txt    - white rectangular type-in slot ("text-type")
    %mlt    - white rectangular type-in slot ("multi-line-text-type")
    %code   - white rectangular type-in slot, monospaced font
    %n      - white roundish type-in slot ("numerical")
    %dir    - white roundish type-in slot with drop-down for directions
    %inst   - white roundish type-in slot with drop-down for instruments
    %ida    - white roundish type-in slot with drop-down for list indices
    %idx    - white roundish type-in slot for indices incl. "any"
    %dim    - white roundish type-in slot for dimensinos incl. "current"
    %obj    - specially drawn slot for object reporters
    %rel    - chameleon colored rectangular drop-down for relation options
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
    %var    - chameleon colored rectangular drop-down for variable names
    %shd    - Chameleon colored rectuangular drop-down for shadowed var names
    %lst    - chameleon colored rectangular drop-down for list names
    %b      - chameleon colored hexagonal slot (for predicates)
    %bool   - chameleon colored hexagonal slot (for predicates), static
    %l      - list icon
    %c      - C-shaped command slot, special form for primitives
    %loop   - C-shaped with loop arrow, special form for certain primitives
    %ca     - C-shaped with loop arrow, for custom blocks
    %cs     - C-shaped, auto-reifying, accepts reporter drops
    %cl     - C-shaped, auto-reifying, rejects reporters
    %cla    - C-shaped with loop arrows, auto-reifying, rejects reporters
    %clr    - interactive color slot
    %t      - inline variable reporter template
    %anyUE  - white rectangular type-in slot, unevaluated if replaced
    %boolUE - chameleon colored hexagonal slot, unevaluated if replaced
    %f      - round function slot, unevaluated if replaced,
    %r      - round reporter slot
    %p      - hexagonal predicate slot
    %vid    - chameleon colored rectangular drop-down for video modes

    rings:

    %cmdRing    - command slotted ring with %ringparms
    %repRing    - round slotted ringn with %ringparms
    %predRing   - diamond slotted ring with %ringparms

    arity: multiple

    %mult%x      - where %x stands for any of the above single inputs
    %inputs      - for an additional text label 'with inputs'
    %words       - for an expandable list of default 2 (used in JOIN)
    %lists       - for an expandable list of default 2 lists (CONCAT)
    %exp         - for a static expandable list of minimum 0 (used in LIST)
    %scriptVars  - for an expandable list of variable reporter templates
    %parms       - for an expandable list of formal parameters
    %ringparms   - the same for use inside Rings

    special form: upvar

    %upvar       - same as %t (inline variable reporter template)

    special form: input name

    %inputName   - variable blob (used in input type dialog)

    examples:

        'if %b %c else %c'        - creates Scratch's If/Else block
        'set pen color to %clr'   - creates Scratch's Pen color block
        'list %mult%s'            - creates BYOB's list reporter block
        'call %n %inputs'         - creates BYOB's Call block
        'the script %parms %c'    - creates BYOB's THE SCRIPT block
*/

// BlockMorph inherits from SyntaxElementMorph:

BlockMorph.prototype = new SyntaxElementMorph();
BlockMorph.prototype.constructor = BlockMorph;
BlockMorph.uber = SyntaxElementMorph.prototype;

// BlockMorph preferences settings:

BlockMorph.prototype.isCachingInputs = true;
BlockMorph.prototype.zebraContrast = 40; // alternating color brightness

// BlockMorph sound feedback:

BlockMorph.prototype.snapSound = null;

BlockMorph.prototype.toggleSnapSound = function () {
    if (this.snapSound !== null) {
        this.snapSound = null;
    } else {
        BlockMorph.prototype.snapSound = document.createElement('audio');
        BlockMorph.prototype.snapSound.src = 'src/click.wav';
    }
    CommentMorph.prototype.snapSound = BlockMorph.prototype.snapSound;
};

// BlockMorph instance creation:

function BlockMorph() {
    this.init();
}

BlockMorph.prototype.init = function () {
    this.id = null;
    this.selector = null; // name of method to be triggered
    this.blockSpec = ''; // formal description of label and arguments
    this.comment = null; // optional "sticky" comment morph

    // not to be persisted:
    this.instantiationSpec = null; // spec to set upon fullCopy() of template
    this.category = null; // for zebra coloring (non persistent)
    this.isCorpse = false; // marked for deletion fom a custom block definition

    BlockMorph.uber.init.call(this);
    this.color = new Color(102, 102, 102);
    this.cachedInputs = null;
};

BlockMorph.prototype.scriptTarget = function () {
    // answer the sprite or stage that this block acts on,
    // if the user clicks on it.
    // NOTE: since scripts can be shared by more than a single sprite
    // this method only gives the desired result within the context of
    // the user actively clicking on a block inside the IDE
    // there is no direct relationship between a block and a sprite.
    var scripts = this.parentThatIsA(ScriptsMorph),
        ide;
    if (scripts) {
        return scripts.scriptTarget();
    }
    ide = this.parentThatIsA(IDE_Morph);
    if (ide) {
        return ide.currentSprite;
    }
    throw new Error('script target cannot be found for orphaned block');
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

    words.forEach(each => addWord(each));
    if (word !== '') {
        result.push(word);
    }
    return result;
};

BlockMorph.prototype.setSpec = function (spec, definition) {
    var part,
        inputIdx = -1;

    if (!spec) {return; }
    this.parts().forEach(part =>
        part.destroy()
    );
    if (this.isPrototype) {
        this.add(this.placeHolder());
    }
    this.parseSpec(spec).forEach((word, idx, arr) => {
        if (word[0] === '%' && (word !== '%br')) {
            inputIdx += 1;
        }
        part = this.labelPart(word);
        if (isNil(part)) {
            // console.log('could not create label part', word);
            return;
        }
        this.add(part);
        if (!(part instanceof CommandSlotMorph ||
                part instanceof StringMorph)) {
            part.fixLayout();
            part.rerender();
        }
        if (part instanceof RingMorph) {
            part.fixBlockColor();
        }
        if (part instanceof MultiArgMorph ||
                part.constructor === CommandSlotMorph ||
                part.constructor === RingCommandSlotMorph) {
            part.fixLayout();
        }
        if (this.isPrototype) {
            this.add(this.placeHolder());
        }
        if (part instanceof InputSlotMorph && this.isCustomBlock) {
            part.setChoices.apply(
                part,
                (definition || this.definition).inputOptionsOfIdx(inputIdx)
            );
        }
    });
    this.blockSpec = spec;
    this.fixLayout();
    this.rerender();
    this.cachedInputs = null;
};

BlockMorph.prototype.userSetSpec = function (spec) {
    var tb = this.topBlock();
    tb.fullChanged();
    this.setSpec(spec);
    tb.fullChanged();
};

BlockMorph.prototype.buildSpec = function () {
    // create my blockSpec from my parts - for demo purposes only
    this.blockSpec = '';
    this.parts().forEach(part => {
        if (part instanceof StringMorph) {
            this.blockSpec += part.text;
        } else if (part instanceof ArgMorph) {
            this.blockSpec += part.getSpec();
        } else if (part.isBlockLabelBreak) {
            this.blockSpec += part.getSpec();
        } else {
            this.blockSpec += '[undefined]';
        }
        this.blockSpec += ' ';
    });
    this.blockSpec = this.blockSpec.trim();
};

BlockMorph.prototype.rebuild = function (contrast) {
    // rebuild my label fragments, for use in ToggleElementMorphs
    this.setSpec(this.blockSpec);
    if (contrast) {
        this.inputs().forEach(input => {
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
        myself = this,
        shiftClicked = world.currentKey === 16,
        proc = this.activeProcess(),
        top = this.topBlock(),
        vNames = proc && proc.context && proc.context.outerContext ?
                proc.context.outerContext.variables.names() : [],
        alternatives,
        field,
        rcvr;

    function addOption(label, toggle, test, onHint, offHint) {
        menu.addItem(
            [
                test ? new SymbolMorph(
                    'checkedBox',
                    MorphicPreferences.menuFontSize * 0.75
                ) : new SymbolMorph(
                    'rectangle',
                    MorphicPreferences.menuFontSize * 0.75
                ),
                localize(label)
            ],
            toggle,
            test ? onHint : offHint
        );
    }

    function renameVar() {
        var blck = myself.fullCopy();
        blck.addShadow();
        new DialogBoxMorph(
            myself,
            function(spec) {
                SnapActions.setBlockSpec(this, spec);
            },
            myself
        ).prompt(
            "Variable name",
            myself.blockSpec,
            world,
            blck.doWithAlpha(1, () => blck.fullImage()), // pic
            InputSlotMorph.prototype.getVarNamesDict.call(myself)
        );
    }

    menu.addItem(
        "help...",
        'showHelp'
    );
    if (this.isTemplate) {
        if (this.parent instanceof SyntaxElementMorph) { // in-line
            if (this.selector === 'reportGetVar') { // script var definition
                menu.addLine();
                menu.addItem(
                    'rename...',
                    () => this.refactorThisVar(true), // just the template
                    'rename only\nthis reporter'
                );
                menu.addItem(
                    'rename all...',
                    'refactorThisVar',
                    'rename all blocks that\naccess this variable'
                );
            }
        } else { // in palette
            if (this.selector === 'reportGetVar') {
                rcvr = this.scriptTarget();
                if (this.isInheritedVariable(false)) { // fully inherited
                    addOption(
                        'inherited',
                        () => rcvr.toggleInheritedVariable(this.blockSpec),
                        true,
                        'uncheck to\ndisinherit',
                        null
                    );
                } else { // not inherited
                    if (this.isInheritedVariable(true)) { // shadowed
                        addOption(
                            'inherited',
                            () => rcvr.toggleInheritedVariable(
                                this.blockSpec
                            ),
                            false,
                            null,
                            localize('check to inherit\nfrom')
                                + ' ' + rcvr.exemplar.name
                        );
                    }
                    addOption(
                        'transient',
                        'toggleTransientVariable',
                        this.isTransientVariable(),
                        'uncheck to save contents\nin the project',
                        'check to prevent contents\nfrom being saved'
                    );
                    menu.addLine();
                    menu.addItem(
                        'rename...',
                        () => this.refactorThisVar(true), // just the template
                        'rename only\nthis reporter'
                    );
                    menu.addItem(
                        'rename all...',
                        'refactorThisVar',
                        'rename all blocks that\naccess this variable'
                    );
                }
            } else if (this.selector !== 'evaluateCustomBlock') {
                menu.addItem(
                    "hide",
                    'hidePrimitive'
                );
            }

            // allow toggling inheritable attributes
            if (StageMorph.prototype.enableInheritance) {
                rcvr = this.scriptTarget();
                field = {
                    xPosition: 'x position',
                    yPosition: 'y position',
                    direction: 'direction',
                    getScale: 'size',
                    getCostumeIdx: 'costume #',
                    getVolume: 'volume',
                    getPan: 'balance',
                    reportShown: 'shown?',
                    getPenDown: 'pen down?'
                }[this.selector];
                if (field && rcvr && rcvr.exemplar) {
                    menu.addLine();
                    addOption(
                        'inherited',
                        () => rcvr.toggleInheritanceForAttribute(field),
                        rcvr.inheritsAttribute(field),
                        'uncheck to\ndisinherit',
                        localize('check to inherit\nfrom')
                            + ' ' + rcvr.exemplar.name
                    );
                }
            }

            if (StageMorph.prototype.enableCodeMapping) {
                menu.addLine();
                menu.addItem(
                    'header mapping...',
                    'mapToHeader'
                );
                menu.addItem(
                    'code mapping...',
                    'mapToCode'
                );
            }
        }
        return menu;
    }
    menu.addLine();
    if (this.selector === 'reportGetVar') {
        menu.addItem(
            'rename...',
            renameVar,
            'rename only\nthis reporter'
        );
    } else if (SpriteMorph.prototype.blockAlternatives[this.selector]) {
        menu.addItem(
            'relabel...',
            () => this.relabel(
                SpriteMorph.prototype.blockAlternatives[this.selector]
            )
        );
    } else if (this.isCustomBlock && this.alternatives) {
        alternatives = this.alternatives();
        if (alternatives.length > 0) {
            menu.addItem(
                'relabel...',
                () => this.relabel(alternatives)
            );
        }
    }

    // direct relabelling:
    // - JIT-compile HOFs - experimental
    // - vector pen trails
    if (
        contains(
            ['reportMap', 'reportKeep', 'reportFindFirst', 'reportCombine'],
            this.selector
        )
    ) {
        alternatives = {
            reportMap : 'reportAtomicMap',
            reportKeep : 'reportAtomicKeep',
            reportFindFirst: 'reportAtomicFindFirst',
            reportCombine : 'reportAtomicCombine'
        };
        menu.addItem(
            'compile',
            () => this.setSelector(alternatives[this.selector]),
            'experimental!\nmake this reporter fast and uninterruptable\n' +
                'CAUTION: Errors in the ring\ncan break your Snap! session!'
        );
    } else if (
        contains(
            [
                'reportAtomicMap',
                'reportAtomicKeep',
                'reportAtomicFindFirst',
                'reportAtomicCombine'
            ],
            this.selector
        )
    ) {
        alternatives = {
            reportAtomicMap : 'reportMap',
            reportAtomicKeep : 'reportKeep',
            reportAtomicFindFirst: 'reportFindFirst',
            reportAtomicCombine : 'reportCombine'
        };
        menu.addItem(
            'uncompile',
            () => this.setSelector(alternatives[this.selector])
        );
    } else if (
        contains(
            ['reportPenTrailsAsCostume', 'reportPentrailsAsSVG'],
            this.selector
        )
    ) {
        alternatives = {
            reportPenTrailsAsCostume : 'reportPentrailsAsSVG',
            reportPentrailsAsSVG : 'reportPenTrailsAsCostume'
        };
        menu.addItem(
            localize(
                SpriteMorph.prototype.blocks[
                    alternatives[this.selector]
                ].spec
            ),
            () => {
                this.setSelector(alternatives[this.selector]);
                this.changed();
            }
        );
    }

    menu.addItem(
        "duplicate",
        () => {
            var dup = this.fullCopy(),
                ide = this.parentThatIsA(IDE_Morph),
                blockEditor = this.parentThatIsA(BlockEditorMorph);
            dup.id = null;
            dup.pickUp(world);
            // register the drop-origin, so the block can
            // slide back to its former situation if dropped
            // somewhere where it gets rejected
            if (!ide && blockEditor) {
                ide = blockEditor.target.parentThatIsA(IDE_Morph);
            }
            if (ide) {
                world.hand.grabOrigin = {
                    origin: ide.palette,
                    position: ide.palette.center()
                };
            }
        },
        'make a copy\nand pick it up'
    );
    if (this instanceof CommandBlockMorph && this.nextBlock()) {
        menu.addItem(
            (proc ? this.fullCopy() : this).thumbnail(0.5, 60),
            () => {
                var cpy = this.fullCopy(),
                    nb = cpy.nextBlock(),
                    ide = this.parentThatIsA(IDE_Morph),
                    blockEditor = this.parentThatIsA(BlockEditorMorph);
                if (nb) {nb.destroy(); }
                cpy.id = null;
                cpy.pickUp(world);
                if (!ide && blockEditor) {
                    ide = blockEditor.target.parentThatIsA(IDE_Morph);
                }
                if (ide) {
                    world.hand.grabOrigin = {
                        origin: ide.palette,
                        position: ide.palette.center()
                    };
                }
            },
            'only duplicate this block'
        );
    }
    menu.addItem("delete", function() {
        if (this.id) {
            SnapActions.removeBlock(this, true);
        } else {
            this.userDestroy();
        }
    });
    menu.addItem(
        "script pic...",
        () => {
            var ide = this.parentThatIsA(IDE_Morph) ||
                this.parentThatIsA(BlockEditorMorph).target.parentThatIsA(
                    IDE_Morph
            );
            ide.saveCanvasAs(
                top.scriptPic(),
                (ide.projectName || localize('untitled')) + ' ' +
                    localize('script pic')
            );
        },
        'save a picture\nof this script'
    );
    if (top instanceof ReporterBlockMorph) {
        menu.addItem(
            "result pic...",
            () => top.exportResultPic(),
            'save a picture of both\nthis script and its result'
        );
    }
    if (shiftClicked) {
        menu.addItem(
            'download script',
            () => {
                var ide = this.parentThatIsA(IDE_Morph),
                    blockEditor = this.parentThatIsA(BlockEditorMorph);
                if (!ide && blockEditor) {
                    ide = blockEditor.target.parentThatIsA(IDE_Morph);
                }
                if (ide) {
                    ide.saveXMLAs(
                        ide.serializer.serialize(this),
                        this.selector + ' script',
                        false);
                }
            },
            'download this script\nas an XML file',
            new Color(100, 0, 0)
        );
    }
    if (proc) {
        if (vNames.length) {
            menu.addLine();
            vNames.forEach(vn =>
                menu.addItem(
                    vn + '...',
                    () => proc.doShowVar(vn)
                )
            );
        }
        proc.homeContext.variables.names().forEach(vn => {
            if (!contains(vNames, vn)) {
                menu.addItem(
                    vn + '...',
                    () => proc.doShowVar(vn)
                );
            }
        });
        return menu;
    }
    if (this.parent.parentThatIsA(RingMorph)) {
        menu.addLine();
        menu.addItem("unringify", function() {
            SnapActions.unringify(this);
        });
        top = this.topBlock();
        if (this instanceof ReporterBlockMorph ||
                (!(top instanceof HatBlockMorph))) {
            menu.addItem("ringify", function() {
                SnapActions.ringify(this);
            });
        }
        return menu;
    }
    if (contains(
        ['doBroadcast', 'doSend', 'doBroadcastAndWait', 'receiveMessage',
            'receiveOnClone', 'receiveGo'],
        this.selector
    )) {
        menu.addLine();
        menu.addItem(
            (this.selector.indexOf('receive') === 0 ?
                "senders..." : "receivers..."),
            'showMessageUsers'
        );
    }
    if (this.parent instanceof ReporterSlotMorph
            || (this.parent instanceof CommandSlotMorph)
            || (this instanceof HatBlockMorph)
            || (this instanceof CommandBlockMorph
                && (top instanceof HatBlockMorph))) {
        return menu;
    }
    menu.addLine();
    menu.addItem("ringify", function() {
        SnapActions.ringify(this);
    });
    if (StageMorph.prototype.enableCodeMapping) {
        menu.addLine();
        menu.addItem(
            'header mapping...',
            'mapToHeader'
        );
        menu.addItem(
            'code mapping...',
            'mapToCode'
        );
    }
    return menu;
};

BlockMorph.prototype.showMessageUsers = function () {
    var ide = this.parentThatIsA(IDE_Morph),
        corral = ide.corral,
        getter = (this.selector.indexOf('receive') === 0) ?
            'allSendersOf' : 'allHatBlocksFor',
        inputs = this.inputs(),
        message, receiverName;

    if (this.selector === 'receiveGo') {
        message = '__shout__go__';
    } else if (this.selector === 'receiveOnClone') {
        message = '__clone__init__';
    } else if (inputs[0] instanceof InputSlotMorph) {
        message = inputs[0].evaluate();
    }

    if (((this.selector === 'doSend') && inputs[1] instanceof InputSlotMorph)) {
        receiverName = this.inputs()[1].evaluate();
    } else if (this.selector.indexOf('receive') === 0) {
        receiverName = this.scriptTarget().name;
    }

    if (message !== '') {
        corral.frame.contents.children.concat(corral.stageIcon).forEach(
            icon => {
                if (icon.object &&
                    ((this.selector !== 'doSend' || receiverName === icon.object.name) &&
                    (icon.object[getter](message, receiverName).length > 0))
                ) {
                    icon.flash();
                }
            }
        );
    }
};

BlockMorph.prototype.developersMenu = function () {
    var menu = BlockMorph.uber.developersMenu.call(this);
    menu.addLine();
    menu.addItem("delete block", 'deleteBlock');  // TODO: Send this through collaborator
    menu.addItem(
        "spec...",
        () => new DialogBoxMorph(
            this,
            function(spec) {
                SnapActions.setBlockSpec(this, spec);
            },
            this
        ).prompt(
            menu.title + '\nspec',
            this.blockSpec,
            this.world()
        )
    );
    return menu;
};

BlockMorph.prototype.hidePrimitive = function () {
    var ide = this.parentThatIsA(IDE_Morph),
        dict,
        cat;
    if (!ide) {return; }
    StageMorph.prototype.hiddenPrimitives[this.selector] = true;
    dict = {
        doWarp: 'control',
        reifyScript: 'operators',
        reifyReporter: 'operators',
        reifyPredicate: 'operators',
        doDeclareVariables: 'variables'
    };
    cat = dict[this.selector] || this.category;
    if (cat === 'lists') {cat = 'variables'; }
    ide.flushBlocksCache(cat);
    ide.refreshPalette();
};

BlockMorph.prototype.isInheritedVariable = function (shadowedOnly) {
    // private - only for variable getter template inside the palette
    if (this.isTemplate &&
            (this.selector === 'reportGetVar') &&
            (this.parent instanceof FrameMorph)) {
        return contains(
            this.scriptTarget().inheritedVariableNames(shadowedOnly),
            this.blockSpec
        );
    }
    return false;
};

BlockMorph.prototype.isTransientVariable = function () {
    // private - only for variable getter template inside the palette
    var varFrame = this.scriptTarget().variables.silentFind(this.blockSpec);
    return varFrame ? varFrame.vars[this.blockSpec].isTransient : false;
};

BlockMorph.prototype.toggleTransientVariable = function () {
    // private - only for variable getter template inside the palette
    var varFrame = this.scriptTarget().variables.silentFind(this.blockSpec);
    if (!varFrame) {return; }
    varFrame.vars[this.blockSpec].isTransient =
        !(varFrame.vars[this.blockSpec].isTransient);
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
        this.inputs().forEach(inp => {
            if (inp instanceof BlockMorph) {
                scripts.add(inp);
            }
        });
    }
    if (this instanceof ReporterBlockMorph &&
			((this.parent instanceof BlockMorph)
                || (this.parent instanceof MultiArgMorph)
                || (this.parent instanceof ReporterSlotMorph))) {
        this.parent.revertToDefaultInput(this);
    } else { // CommandBlockMorph
        if (this.parent && this.parent.fixLayout) {
            tobefixed = this.parentThatIsA(ArgMorph);
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
    var ring, top, center,
        target = this.selectForEdit(); // copy-on-edit
    if (target !== this) {
        return this.ringify.call(target);
    }
    ring = new RingMorph();
    top = this.topBlock();
    center = top.fullBounds().center();
    if (this.parent === null) {return null; }
    top.fullChanged();
    if (this.parent instanceof SyntaxElementMorph) {
        if (this instanceof ReporterBlockMorph) {
            this.parent.replaceInput(this, ring, true); // don't vanish
            ring.embed(this, null, true); // don't vanish
        } else if (top) { // command
            if (top instanceof HatBlockMorph) {
                return;
            }
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
    top.fullChanged();
    return ring;
};

BlockMorph.prototype.unringify = function () {
    // remove a Ring around me, if any
    var ring, top, center, scripts, block,
        target = this.selectForEdit(); // copy-on-edit
    if (target !== this) {
        return this.unringify.call(target);
    }
    ring = this.parent.parentThatIsA(RingMorph);
    top = this.topBlock();
    scripts = this.parentThatIsA(ScriptsMorph);
    if (ring === null) {return null; }
    block = ring.contents();
    center = ring.center();

    top.fullChanged();
    if (ring.parent instanceof SyntaxElementMorph) {
        if (block instanceof ReporterBlockMorph) {
            ring.parent.replaceInput(ring, block);
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
    top.fullChanged();
    return ring;
};

BlockMorph.prototype.relabel = function (alternativeSelectors) {
    // morph one block into another trying to keep the inputs in place
    // alternative Selector can either be a string representing
    // a block selector or a 2-item array containing a string and
    // an integer offset for restoring inputs
    var menu, oldInputs,
        target = this.selectForEdit(); // copy-on-edit
    if (target !== this) {
        return this.relabel.call(target, alternativeSelectors);
    }
    menu = new MenuMorph(this);
    oldInputs = this.inputs();
    alternativeSelectors.forEach(alternative => {
        var block, selector, offset;
        if (alternative instanceof Array) {
            selector = alternative[0];
            offset = -alternative[1];
        } else {
            selector = alternative;
            offset = 0;
        }
        block = SpriteMorph.prototype.blockForSelector(selector, true);
        block.restoreInputs(oldInputs, offset);
        block.fixBlockColor(null, true);
        block.addShadow(new Point(3, 3));
        menu.addItem(
            block.doWithAlpha(1, () => block.fullImage()),
            () => SnapActions.setSelector(this, selector),  // FIXME: account for offset: this.setSelector(selector, -offset)
        );
    });
    menu.popup(this.world(), this.bottomLeft().subtract(new Point(
        8,
        this instanceof CommandBlockMorph ? this.corner : 0
    )));
};


BlockMorph.prototype.setSelector = function (aSelector, inputOffset = 0) {
    // private - used only for relabel()
    // input offset is optional and can be used to shift the inputs
    // to be restored
    var oldInputs = this.inputs(),
        scripts = this.parentThatIsA(ScriptsMorph),
        surplus,
        info,
        slots,
        i;
    info = SpriteMorph.prototype.blocks[aSelector];
    this.setCategory(info.category);
    this.selector = aSelector;
    this.setSpec(localize(info.spec));
    this.defaults = info.defaults || [];

    // restore default values
    slots = this.inputs();
    if (slots[0] instanceof MultiArgMorph) {
        slots[0].setContents(this.defaults);
        slots[0].defaults = this.defaults;
    } else {
        for (i = 0; i < this.defaults.length; i += 1) {
            if (this.defaults[i] !== null && slots[i].setContents) {
                slots[i].setContents(this.defaults[i]);
            }
        }
    }

    // restore previous inputs
    surplus = this.restoreInputs(oldInputs, -inputOffset);
    this.fixLabelColor();

    // place surplus blocks on scripts
    if (scripts && surplus.length) {
        surplus.forEach(blk => {
            blk.moveBy(10);
            scripts.add(blk);
        });
    }
};

BlockMorph.prototype.restoreInputs = function (oldInputs, offset = 0) {
    // private - used only for relabel()
    // try to restore my previous inputs when my spec has been changed
    // return an Array of left-over blocks, if any
    // optional offset parameter allows for shifting the range
    // of inputs to be restored
    var old, nb, i,
        leftOver = [];

    // gather leading surplus blocks
    for (i = 0; i < offset; i += 1) {
        old = oldInputs[i];
        if (old instanceof ReporterBlockMorph) {
            leftOver.push(old);
        } else if (old instanceof CommandSlotMorph) {
            nb = old.nestedBlock();
            if (nb) {
                leftOver.push(nb);
            }
        }
    }

    // restore matching inputs in their original order
    this.inputs().forEach(inp => {
        old = oldInputs[offset];
        if (old instanceof RingMorph) {
            if (old.contents()) {
                this.replaceInput(inp, old.fullCopy());
            }
            // otherwise ignore the empty ring
        } else if (old instanceof ReporterBlockMorph) {
            if (inp instanceof TemplateSlotMorph || inp.isStatic) {
                leftOver.push(old);
            } else {
                this.replaceInput(inp, old.fullCopy());
            }
        } else if (old && inp instanceof InputSlotMorph) {
            // original - turns empty numberslots to 0:
            // inp.setContents(old.evaluate());
            // "fix" may be wrong b/c constants
            if (old.contents) {
                inp.setContents(old.contents().text);
                if (old.constant) {
                    inp.constant = old.constant;
                }
            }
        } else if (old instanceof CSlotMorph && inp instanceof CSlotMorph) {
            nb = old.nestedBlock();
            if (nb) {
                inp.nestedBlock(nb.fullCopy());
            }
        }
        offset += 1;
    });

    // gather trailing surplus blocks
    for (offset; offset < oldInputs.length; offset += 1) {
        old = oldInputs[offset];
        if (old instanceof ReporterBlockMorph) {
            leftOver.push(old);
        } else if (old instanceof CommandSlotMorph) {
            nb = old.nestedBlock();
            if (nb) {
                leftOver.push(nb);
            }
        }
    }
    this.cachedInputs = null;
    return leftOver;
};

BlockMorph.prototype.showHelp = function () {
    var myself = this,
        ide = this.parentThatIsA(IDE_Morph),
        blockEditor,
        pic = new Image(),
        help,
        def,
        comment,
        block,
        spec,
        ctx;

    if (this.isCustomBlock) {
        if (this.isGlobal) {
            spec = this.definition.helpSpec();
        } else {
            spec = this.scriptTarget().getMethod(this.blockSpec).helpSpec();
        }
    } else {
        spec = this.selector;
    }

    if (!ide) {
        blockEditor = this.parentThatIsA(BlockEditorMorph);
        if (blockEditor) {
            ide = blockEditor.target.parentThatIsA(IDE_Morph);
        }
    }

    pic.onload = function () {
        help = newCanvas(new Point(pic.width, pic.height), true); // nonRetina
        ctx = help.getContext('2d');
        ctx.drawImage(pic, 0, 0);
        new DialogBoxMorph().inform(
            'Help',
            null,
            myself.world(),
            help
        );
    };

    if (this.isCustomBlock) {
        def = this.isGlobal ? this.definition
                : this.scriptTarget().getMethod(this.blockSpec);
        comment = def.comment;
        if (comment) {
            block = def.blockInstance();
            block.refreshDefaults(def);
            comment = comment.fullCopy();
            comment.contents.parse();
            help = '';
            comment.contents.lines.forEach(line =>
                help = help + '\n' + line
            );
            new DialogBoxMorph().inform(
                'Help',
                help.substr(1),
                myself.world(),
                block.doWithAlpha(
                    1,
                    () => {
                        block.addShadow();
                        return block.fullImage();
                    }
                )
            );
            return;
        }
    }
    pic.src = ide.resourceURL('help', spec + '.png');
};

// BlockMorph code mapping

/*
    code mapping lets you use blocks to generate arbitrary text-based
    source code that can be exported and compiled / embedded elsewhere,
    it's not part of Snap's evaluator and not needed for Snap itself
*/

BlockMorph.prototype.mapToHeader = function () {
    // open a dialog box letting the user map header code via the GUI
    var key = this.selector.substr(0, 5) === 'reify' ?
            'reify' : this.selector,
        block = this.codeDefinitionHeader(),
        help,
        pic;
    block.addShadow(new Point(3, 3));
    pic = block.doWithAlpha(1, () => block.fullImage());
    if (this.isCustomBlock) {
        help = 'Enter code that corresponds to the block\'s definition. ' +
            'Use the formal parameter\nnames as shown and <body> to ' +
            'reference the definition body\'s generated text code.';
    } else {
        help = 'Enter code that corresponds to the block\'s definition. ' +
            'Choose your own\nformal parameter names (ignoring the ones ' +
            'shown).';
    }
    new DialogBoxMorph(
        this,
        code => {
            if (key === 'evaluateCustomBlock') {
                this.definition.codeHeader = code;
            } else {
                StageMorph.prototype.codeHeaders[key] = code;
            }
        },
        this
    ).promptCode(
        'Header mapping',
        key === 'evaluateCustomBlock' ? this.definition.codeHeader || ''
                 : StageMorph.prototype.codeHeaders[key] || '',
        this.world(),
        pic,
        help
    );
};

BlockMorph.prototype.mapToCode = function () {
    // open a dialog box letting the user map code via the GUI
    var key = this.selector.substr(0, 5) === 'reify' ?
            'reify' : this.selector,
        block = this.codeMappingHeader(),
        pic;
    block.addShadow(new Point(3, 3));
    pic = block.doWithAlpha(1, () => block.fullImage());
    new DialogBoxMorph(
        this,
        code => {
            if (key === 'evaluateCustomBlock') {
                this.definition.codeMapping = code;
            } else {
                StageMorph.prototype.codeMappings[key] = code;
            }
        },
        this
    ).promptCode(
        'Code mapping',
        key === 'evaluateCustomBlock' ? this.definition.codeMapping || ''
                 : StageMorph.prototype.codeMappings[key] || '',
        this.world(),
        pic,
        'Enter code that corresponds to the block\'s operation ' +
            '(usually a single\nfunction invocation). Use <#n> to ' +
            'reference actual arguments as shown.'
    );
};

BlockMorph.prototype.mapHeader = function (aString, key) {
    // primitive for programatically mapping header code
    var sel = key || this.selector.substr(0, 5) === 'reify' ?
            'reify' : this.selector;
    if (aString) {
        if (this.isCustomBlock) {
            this.definition.codeHeader = aString;
        } else {
            StageMorph.prototype.codeHeaders[sel] = aString;
        }
    }
};

BlockMorph.prototype.mapCode = function (aString, key) {
    // primitive for programatically mapping code
    var sel = key || this.selector.substr(0, 5) === 'reify' ?
            'reify' : this.selector;
    if (aString) {
        if (this.isCustomBlock) {
            this.definition.codeMapping = aString;
        } else {
            StageMorph.prototype.codeMappings[sel] = aString;
        }
    }
};

BlockMorph.prototype.mappedCode = function (definitions) {
    var key = this.selector.substr(0, 5) === 'reify' ?
            'reify' : this.selector,
        code,
        codeLines,
        count = 1,
        header,
        headers,
        headerLines,
        body,
        bodyLines,
        defKey = this.isCustomBlock ? this.definition.spec : key,
        defs = definitions || {},
        parts = [];
    code = key === 'reportGetVar' ? this.blockSpec
            : this.isCustomBlock ? this.definition.codeMapping || ''
                    : StageMorph.prototype.codeMappings[key] || '';

    // map header
    if (key !== 'reportGetVar' && !defs.hasOwnProperty(defKey)) {
        defs[defKey] = null; // create the property for recursive definitions
        if (this.isCustomBlock) {
            header = this.definition.codeHeader || '';
            if (header.indexOf('<body') !== -1) { // replace with def mapping
                body = '';
                if (this.definition.body) {
                    body = this.definition.body.expression.mappedCode(defs);
                }
                bodyLines = body.split('\n');
                headerLines = header.split('\n');
                headerLines.forEach((headerLine, idx) => {
                    var prefix = '',
                        indent;
                    if (headerLine.trimLeft().indexOf('<body') === 0) {
                        indent = headerLine.indexOf('<body');
                        prefix = headerLine.slice(0, indent);
                    }
                    headerLines[idx] = headerLine.replace(
                        new RegExp('<body>'),
                        bodyLines.join('\n' + prefix)
                    );
                    headerLines[idx] = headerLines[idx].replace(
                        new RegExp('<body>', 'g'),
                        bodyLines.join('\n')
                    );
                });
                header = headerLines.join('\n');
            }
            defs[defKey] = header;
        } else {
            defs[defKey] = StageMorph.prototype.codeHeaders[defKey];
        }
    }

    codeLines = code.split('\n');
    this.inputs().forEach(input =>
        parts.push(input.mappedCode(defs).toString())
    );
    parts.forEach(part => {
        var partLines = part.split('\n'),
            placeHolder = '<#' + count + '>',
            rx = new RegExp(placeHolder, 'g');
        codeLines.forEach((codeLine, idx) => {
            var prefix = '',
                indent;
            if (codeLine.trimLeft().indexOf(placeHolder) === 0) {
                indent = codeLine.indexOf(placeHolder);
                prefix = codeLine.slice(0, indent);
            }
            codeLines[idx] = codeLine.replace(
                new RegExp(placeHolder),
                partLines.join('\n' + prefix)
            );
            codeLines[idx] = codeLines[idx].replace(rx, partLines.join('\n'));
        });
        count += 1;
    });
    code = codeLines.join('\n');
    if (this.nextBlock && this.nextBlock()) { // Command
        code += ('\n' + this.nextBlock().mappedCode(defs));
    }
    if (!definitions) { // top-level, add headers
        headers = [];
        Object.keys(defs).forEach(each => {
            if (defs[each]) {
                headers.push(defs[each]);
            }
        });
        if (headers.length) {
            return headers.join('\n\n')
                + '\n\n'
                + code;
        }
    }
    return code;
};

BlockMorph.prototype.codeDefinitionHeader = function () {
    var block = this.isCustomBlock ? new PrototypeHatBlockMorph(this.definition)
            : SpriteMorph.prototype.blockForSelector(this.selector),
        hat = new HatBlockMorph(),
        count = 1;

    if (this.isCustomBlock) {return block; }
    block.inputs().forEach(input => {
        var part = new TemplateSlotMorph('#' + count);
        block.replaceInput(input, part);
        count += 1;
    });
    block.isPrototype = true;
    hat.setCategory("control");
    hat.setSpec('%s');
    hat.replaceInput(hat.inputs()[0], block);
    if (this.category === 'control') {
        hat.alternateBlockColor();
    }
    return hat;
};

BlockMorph.prototype.codeMappingHeader = function () {
    var block = this.isCustomBlock ? this.definition.blockInstance()
            : SpriteMorph.prototype.blockForSelector(this.selector),
        hat = new HatBlockMorph(),
        count = 1;

    block.inputs().forEach(input => {
        var part = new TemplateSlotMorph('<#' + count + '>');
        block.replaceInput(input, part);
        count += 1;
    });
    block.isPrototype = true;
    hat.setCategory("control");
    hat.setSpec('%s');
    hat.replaceInput(hat.inputs()[0], block);
    if (this.category === 'control') {
        hat.alternateBlockColor();
    }
    return hat;
};

// Variable refactoring

BlockMorph.prototype.refactorThisVar = function (justTheTemplate) {
    // Rename all occurrences of the variable this block is holding,
    // taking care of its lexical scope

    var receiver = this.scriptTarget(),
        oldName = this.instantiationSpec || this.blockSpec,
        cpy = this.fullCopy();

    cpy.addShadow();

    new DialogBoxMorph(this, renameVarTo, this).prompt(
        'Variable name',
        oldName,
        this.world(),
        cpy.doWithAlpha(1, () => cpy.fullImage()), // pic
        InputSlotMorph.prototype.getVarNamesDict.call(this)
    );

    function renameVarTo (newName) {
        if (this.parent instanceof SyntaxElementMorph) {
            if (this.parentThatIsA(BlockEditorMorph)) {
                this.doRefactorBlockParameter(
                    oldName,
                    newName,
                    justTheTemplate
                );
            } else if (this.parentThatIsA(RingMorph)) {
                this.doRefactorRingParameter(oldName, newName, justTheTemplate);
            } else {
                this.doRefactorScriptVar(oldName, newName, justTheTemplate);
            }
        } else if (receiver.hasSpriteVariable(oldName)) {
            this.doRefactorSpriteVar(oldName, newName, justTheTemplate);
        } else {
            this.doRefactorGlobalVar(oldName, newName, justTheTemplate);
        }
    }
};

BlockMorph.prototype.varExistsError = function (ide, where) {
    ide.inform(
        'Variable exists',
        'A variable with this name already exists ' +
        (where || 'in this context') + '.'
    );
};

BlockMorph.prototype.doRefactorBlockParameter = function (
    oldName,
    newName,
    justTheTemplate
) {
    var fragMorph = this.parentThatIsA(BlockInputFragmentMorph),
        fragment = fragMorph.fragment.copy(),
        definer = fragMorph.parent,
        editor = this.parentThatIsA(BlockEditorMorph),
        scripts = editor.body.contents;

    if (definer.anyChild(any =>
        any.blockSpec === newName
    )) {
        this.varExistsError(editor.target.parentThatIsA(IDE_Morph));
        return;
    }

    fragment.labelString = newName;
    fragMorph.updateBlockLabel(fragment);

    if (justTheTemplate) {
        return;
    }

    scripts.children.forEach(script =>
        script.refactorVarInStack(oldName, newName)
    );
};

BlockMorph.prototype.doRefactorRingParameter = function (
    oldName,
    newName,
    justTheTemplate
) {
    var ring = this.parentThatIsA(RingMorph),
        script = ring.contents(),
        tb = this.topBlock();

    if (contains(ring.inputNames(), newName)) {
        this.varExistsError(this.parentThatIsA(IDE_Morph));
        return;
    }

    tb.fullChanged();
    this.setSpec(newName);

    if (justTheTemplate) {
        tb.fullChanged();
        return;
    }

    if (script) {
        script.refactorVarInStack(oldName, newName);
    }

    tb.fullChanged();
};

BlockMorph.prototype.doRefactorScriptVar = function (
    oldName,
    newName,
    justTheTemplate
) {
    var definer = this.parentThatIsA(CommandBlockMorph),
        receiver, ide;

    if (definer.definesScriptVariable(newName)) {
        receiver = this.scriptTarget();
        ide = receiver.parentThatIsA(IDE_Morph);
        this.varExistsError(ide);
        return;
    }

    this.userSetSpec(newName);

    if (justTheTemplate) {
        return;
    }

    definer.refactorVarInStack(oldName, newName, true);
};

BlockMorph.prototype.doRefactorSpriteVar = function (
    oldName,
    newName,
    justTheTemplate
) {
    var receiver = this.scriptTarget(),
        ide = receiver.parentThatIsA(IDE_Morph),
        oldWatcher = receiver.findVariableWatcher(oldName),
        oldValue, newWatcher;

    if (receiver.hasSpriteVariable(newName)) {
        this.varExistsError(ide);
        return;
    } else if (!isNil(ide.globalVariables.vars[newName])) {
        this.varExistsError(ide, 'as a global variable');
        return;
    } else {
        oldValue = receiver.variables.getVar(oldName);
        receiver.deleteVariable(oldName);
        receiver.addVariable(newName, false);
        receiver.variables.setVar(newName, oldValue);

        if (oldWatcher && oldWatcher.isVisible) {
            newWatcher = receiver.toggleVariableWatcher(
                newName,
                false
            );
            newWatcher.setPosition(oldWatcher.position());
        }

        if (!justTheTemplate) {
            receiver.refactorVariableInstances(
                oldName,
                newName,
                false
            );
            receiver.customBlocks.forEach(eachBlock =>
                eachBlock.body.expression.refactorVarInStack(
                    oldName,
                    newName
                )
            );
        }
    }

    ide.flushBlocksCache('variables');
    ide.refreshPalette();
};

BlockMorph.prototype.doRefactorGlobalVar = function (
    oldName,
    newName,
    justTheTemplate
) {
    var receiver = this.scriptTarget(),
        ide = receiver.parentThatIsA(IDE_Morph),
        stage = ide ? ide.stage : null,
        oldWatcher = receiver.findVariableWatcher(oldName),
        oldValue, newWatcher;

    if (!isNil(ide.globalVariables.vars[newName])) {
        this.varExistsError(ide);
        return;
    } else if (detect(
        stage.children,
        any => any instanceof SpriteMorph &&
            any.hasSpriteVariable(newName)
    )) {
        this.varExistsError(ide, 'as a sprite local variable');
        return;
    } else {
        oldValue = ide.globalVariables.getVar(oldName);
        stage.deleteVariable(oldName);
        stage.addVariable(newName, true);
        ide.globalVariables.setVar(newName, oldValue);

        if (oldWatcher && oldWatcher.isVisible) {
            newWatcher = receiver.toggleVariableWatcher(
                    newName,
                    true
            );
            newWatcher.setPosition(oldWatcher.position());
        }

        if (!justTheTemplate) {
            stage.refactorVariableInstances(
                oldName,
                newName,
                true
            );
            stage.globalBlocks.forEach(eachBlock => {
                if (eachBlock.body) {
                    eachBlock.body.expression.refactorVarInStack(
                        oldName,
                        newName
                    );
                }
            });
            stage.forAllChildren(child => {
                if (child instanceof SpriteMorph) {
                    child.refactorVariableInstances(
                        oldName,
                        newName,
                        true
                    );
                    child.customBlocks.forEach(eachBlock =>
                        eachBlock.body.expression.refactorVarInStack(
                            oldName,
                            newName
                        )
                    );
                }
            });
        }
    }

    ide.flushBlocksCache('variables');
    ide.refreshPalette();
};

// BlockMorph thumbnail and script pic

BlockMorph.prototype.thumbnail = function (scale, clipWidth) {
    var nb = this.nextBlock(),
        fadeout = 12,
        ext,
        trgt,
        ctx,
        gradient;

    if (nb) {nb.isVisible = false; }
    ext = this.fullBounds().extent();
    trgt = newCanvas(new Point(
        clipWidth ? Math.min(ext.x * scale, clipWidth) : ext.x * scale,
        ext.y * scale
    ));
    ctx = trgt.getContext('2d');
    ctx.scale(scale, scale);
    ctx.drawImage(this.fullImage(), 0, 0);
    // draw fade-out
    if (clipWidth && ext.x * scale > clipWidth) {
        gradient = ctx.createLinearGradient(
            trgt.width / scale - fadeout,
            0,
            trgt.width / scale,
            0
        );
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(1, 'black');
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = gradient;
        ctx.fillRect(
            trgt.width / scale - fadeout,
            0,
            trgt.width / scale,
            trgt.height / scale
        );
    }
    if (nb) {nb.isVisible = true; }
    return trgt;
};

BlockMorph.prototype.scriptPic = function () {
    // answer a canvas image that also includes comments
    var scr = this.fullImage(),
        fb = this.stackFullBounds(),
        pic = newCanvas(fb.extent()),
        ctx = pic.getContext('2d');

    this.allComments().forEach(comment =>
        ctx.drawImage(
            comment.fullImage(),
            comment.fullBounds().left() - fb.left(),
            comment.top() - fb.top()
        )
    );
    ctx.drawImage(scr, 0, 0);
    return pic;
};

BlockMorph.prototype.fullImage = function () {
    // answer a canvas image meant for (semi-) transparent blocks
    // that lets the background shine through
    var src, solid, pic, ctx;

    if (this.alpha === 1) {
        return BlockMorph.uber.fullImage.call(this);
    }
    this.forAllChildren(m => {
        if (m instanceof BlockMorph) {
            m.mouseLeaveBounds();
        }
    });
    src = BlockMorph.uber.fullImage.call(this);
    solid = this.doWithAlpha(1, () => BlockMorph.uber.fullImage.call(this));
    pic = newCanvas(this.fullBounds().extent());
    ctx = pic.getContext('2d');
    ctx.fillStyle = ScriptsMorph.prototype.getRenderColor().toString();
    ctx.fillRect(0, 0, pic.width, pic.height);
    ctx.globalCompositeOperation = 'destination-in';
    ctx.drawImage(solid, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(src, 0, 0);
    return pic;
};

BlockMorph.prototype.clearAlpha = function () {
    this.forAllChildren(m => {
        if (m instanceof BlockMorph) {
            delete m.alpha;
        }
    });
};

// BlockMorph drawing

BlockMorph.prototype.render = function (ctx) {
    this.cachedClr = this.color.toString();
    this.cachedClrBright = this.bright();
    this.cachedClrDark = this.dark();

    if (MorphicPreferences.isFlat) {
        // draw the outline
        ctx.fillStyle = this.cachedClrDark;
        ctx.beginPath();
        this.outlinePath(ctx, 0);
        ctx.closePath();
        ctx.fill();

        // draw the inner filled shaped
        ctx.fillStyle = this.cachedClr;
        ctx.beginPath();
        this.outlinePath(ctx, this.flatEdge);
        ctx.closePath();
        ctx.fill();
    } else {
        // draw the flat shape
        ctx.fillStyle = this.cachedClr;
        ctx.beginPath();
        this.outlinePath(ctx, 0);
        ctx.closePath();
        ctx.fill();
    
        // add 3D-Effect:
        this.drawEdges(ctx);
    }

    // draw location pin icon if applicable
    if (this.hasLocationPin()) {
        this.drawMethodIcon(ctx);
    }
};

BlockMorph.prototype.drawMethodIcon = function (ctx) {
    var ext = this.methodIconExtent(),
        w = ext.x,
        h = ext.y,
        r = w / 2,
        x = this.edge + this.labelPadding,
        y = this.edge,
        isNormal =
            this.color === SpriteMorph.prototype.blockColor[this.category];

    if (this.isPredicate) {
        x = this.rounding;
    }
    if (this instanceof CommandBlockMorph) {
        y += this.corner;
    }
    ctx.fillStyle = isNormal ? this.cachedClrBright : this.cachedClrDark;

    // pin
    ctx.beginPath();
    ctx.arc(x + r, y + r, r, radians(-210), radians(30), false);
    ctx.lineTo(x + r, y + h);
    ctx.closePath();
    ctx.fill();

    // hole
    ctx.fillStyle = this.cachedClr;
    ctx.beginPath();
    ctx.arc(x + r, y + r, r * 0.4, radians(0), radians(360), false);
    ctx.closePath();
    ctx.fill();
};

BlockMorph.prototype.cSlots = function () {
    var result = [];
    this.parts().forEach(part => {
        if (part instanceof CSlotMorph) {
            result.push(part);
        } else if (part instanceof MultiArgMorph) {
            part.parts().forEach(slot => {
                if (slot instanceof CSlotMorph) {
                    result.push(slot);
                }
            });
        }
    });
    return result;
};

BlockMorph.prototype.hasLocationPin = function () {
	return (this.isCustomBlock && !this.isGlobal) || this.isLocalVarTemplate;
};

// BlockMorph highlighting

BlockMorph.prototype.addHighlight = function (oldHighlight) {
    var isHidden = !this.isVisible,
        highlight;

    if (isHidden) {this.show(); }
    if (SyntaxElementMorph.prototype.alpha < 1) {
        this.clearAlpha();
    }
    highlight = this.highlight(
        oldHighlight ? oldHighlight.color : this.activeHighlight,
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
    return highlight;
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
        edge = useBlurredShadows && !MorphicPreferences.isFlat ?
                blur : border;
    highlight.bounds.setExtent(fb.extent().add(edge * 2));
    highlight.holes = [highlight.bounds]; // make the highlight untouchable
    highlight.color = color;
    highlight.cachedImage = useBlurredShadows && !MorphicPreferences.isFlat ?
            this.highlightImageBlurred(color, blur)
                : this.highlightImage(color, border);
    highlight.setPosition(fb.origin.subtract(new Point(edge, edge)));
    return highlight;
};

BlockMorph.prototype.highlightImage = function (color, border) {
    var fb, img, hi, ctx, out;
    fb = this.fullBounds().extent();
    this.doWithAlpha(1, () => img = this.fullImage());

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
    this.doWithAlpha(1, () => img = this.fullImage());

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
    highlights = this.children.slice(0).reverse().filter(child =>
        child instanceof BlockHighlightMorph
    );
    if (highlights.length !== 0) {
        return highlights[0];
    }
    return null;
};

BlockMorph.prototype.outline = function (color, border) {
    var highlight = new BlockHighlightMorph(),
        fb = this.fullBounds(),
        edge = border;
    highlight.bounds.setExtent(fb.extent().add(edge * 2));
    highlight.color = color;
    highlight.cachedImage = this.highlightImage(color, border);
    highlight.setPosition(fb.origin.subtract(new Point(edge, edge)));
    return highlight;
};

// BlockMorph zebra coloring

BlockMorph.prototype.getCategoryColor = function (category) {
    return SpriteMorph.prototype.blockColor[category] ||
        SpriteMorph.prototype.blockColor.other;
};

BlockMorph.prototype.fixBlockColor = function (nearestBlock, isForced) {
    var nearest = nearestBlock,
        clr,
        cslot;

    if (!this.zebraContrast && !isForced) {
        return;
    }
    if (!this.zebraContrast && isForced) {
        return this.forceNormalColoring(true);
    }

    if (!nearest) {
        if (this.parent) {
            if (this.isPrototype) {
                nearest = null; // this.parent; // the PrototypeHatBlockMorph
            } else if (this instanceof ReporterBlockMorph) {
                nearest = this.parent.parentThatIsA(BlockMorph);
            } else { // command
                cslot = this.parentThatIsA(CommandSlotMorph, ReporterSlotMorph);
                if (cslot) {
                    nearest = cslot.parentThatIsA(BlockMorph);
                }
            }
        }
    }
    if (!nearest) { // top block
        clr = this.getCategoryColor(this.category);
        if (!this.color.eq(clr)) {
            this.alternateBlockColor();
        }
    } else if (nearest.category === this.category) {
        if (nearest.color.eq(this.color)) {
            this.alternateBlockColor();
        }
    } else if (this.category && !this.color.eq(
            this.getCategoryColor(this.category)
        )) {
        this.alternateBlockColor();
    }
    if (isForced) {
        this.fixChildrensBlockColor(true);
    }
};

BlockMorph.prototype.forceNormalColoring = function () {
    var clr = this.getCategoryColor(this.category);
    this.setColor(clr);
    this.setLabelColor(
        this.overrideWhite || WHITE,
        clr.darker(this.labelContrast),
        MorphicPreferences.isFlat ? ZERO : this.embossing
    );
    this.fixChildrensBlockColor(true);
};

BlockMorph.prototype.alternateBlockColor = function () {
    var clr = this.getCategoryColor(this.category);

    if (this.color.eq(clr)) {
        this.setColor(
            this.zebraContrast < 0 ? clr.darker(Math.abs(this.zebraContrast))
                : clr.lighter(this.zebraContrast),
            this.hasLabels() // silently
        );
    } else {
        this.setColor(clr, this.hasLabels()); // silently
    }
    this.fixLabelColor();
    this.fixChildrensBlockColor(true); // has issues if not forced
};

BlockMorph.prototype.ghost = function () {
    this.setColor(
        this.getCategoryColor(this.category).lighter(35)
    );
};

BlockMorph.prototype.fixLabelColor = function () {
    if (this.zebraContrast > 0 && this.category) {
        var clr = this.getCategoryColor(this.category);
        if (this.color.eq(clr)) {
            this.setLabelColor(
                this.overrideWhite || WHITE,
                clr.darker(this.labelContrast),
                MorphicPreferences.isFlat ? null : this.embossing
            );
        } else {
            this.setLabelColor(
                this.overrideBlack || BLACK,
                clr.lighter(this.zebraContrast)
                    .lighter(this.labelContrast * 2),
                MorphicPreferences.isFlat ? null : this.embossing.neg()
            );
        }
    }
};

BlockMorph.prototype.fixChildrensBlockColor = function (isForced) {
    this.children.forEach(morph => {
        if (morph instanceof CommandBlockMorph) {
            morph.fixBlockColor(null, isForced);
        } else if (morph instanceof SyntaxElementMorph) {
            morph.fixBlockColor(this, isForced);
            if (morph instanceof BooleanSlotMorph) {
                morph.fixLayout();
            }
        }
    });
};

BlockMorph.prototype.setCategory = function (aString) {
    this.category = aString;
    this.fixBlockColor();
};

BlockMorph.prototype.hasLabels = function () {
    return this.children.some(any => any instanceof StringMorph);
};

// BlockMorph copying

BlockMorph.prototype.copy = function () {
    var ans = BlockMorph.uber.copy.call(this);
    ans.id = this.id;
    return ans;
};

BlockMorph.prototype.fullCopy = function () {
    var ans = BlockMorph.uber.fullCopy.call(this);
    ans.removeHighlight();
    ans.isDraggable = true;
    if (this.instantiationSpec) {
        ans.setSpec(this.instantiationSpec);
    }
    ans.allChildren().filter(block => {
        if (block instanceof SyntaxElementMorph) {
            block.cachedInputs = null;
            if (block.isCustomBlock) {
                block.initializeVariables();
            }
        }
        return !isNil(block.comment);
    }).forEach(block => {
        var cmnt = block.comment.fullCopy();
        block.comment = cmnt;
        cmnt.block = block;
    });
    ans.cachedInputs = null;
    return ans;
};

BlockMorph.prototype.reactToTemplateCopy = function () {
    if (this.isLocalVarTemplate) {
    	this.isLocalVarTemplate = null;
        this.fixLayout();
    }
    this.forceNormalColoring();
};

BlockMorph.prototype.hasBlockVars = function () {
    return this.anyChild(any =>
        any.isCustomBlock &&
            any.isGlobal &&
                any.definition.variableNames.length
    );
};

BlockMorph.prototype.pickUp = function (wrrld) {
    // used when duplicating and grabbing a block via its context menu
    // position the duplicate's top-left corner at the mouse pointer
    var world = wrrld || this.world();
    this.setPosition(world.hand.position().subtract(this.rounding));
    world.hand.grab(this);
};

// BlockMorph events

BlockMorph.prototype.mouseClickLeft = function () {
    var top = this.topBlock(),
        receiver = top.scriptTarget(),
        shiftClicked = this.world().currentKey === 16,
        stage;
    if (shiftClicked && !this.isTemplate) {
        return this.selectForEdit().focus(); // enable coopy-on-edit
    }
    if (top instanceof PrototypeHatBlockMorph) {
        return; // top.mouseClickLeft();
    }
    if (receiver) {
        stage = receiver.parentThatIsA(StageMorph);
        if (stage) {
            var active = stage.threads.findProcess(top);
            // msg handlers can only be stopped - not started
            if (!(top.selector === 'receiveSocketMessage' && !active)) {
                stage.threads.toggleProcess(top, receiver);
                if (top.id) {  // record that the block has been executed
                    SnapActions.startScript(top, active);
                }
            }
        }
    }
};

BlockMorph.prototype.focus = function () {
    var scripts = this.parentThatIsA(ScriptsMorph),
        world = this.world(),
        focus;
    if (!scripts || !ScriptsMorph.prototype.enableKeyboard) {return; }
    if (scripts.focus) {scripts.focus.stopEditing(); }
    world.stopEditing();
    focus = new ScriptFocusMorph(scripts, this);
    scripts.focus = focus;
    focus.getFocus(world);
    if (this instanceof HatBlockMorph) {
        focus.nextCommand();
    }
};

BlockMorph.prototype.activeProcess = function () {
    var top = this.topBlock(),
        receiver = top.scriptTarget(),
        stage;
    if (top instanceof PrototypeHatBlockMorph) {
        return null;
    }
    if (receiver) {
        stage = receiver.parentThatIsA(StageMorph);
        if (stage) {
            return stage.threads.findProcess(top, receiver);
        }
    }
    return null;
};

BlockMorph.prototype.mouseEnterBounds = function (dragged) {
    if (!dragged && this.alpha < 1) {
        this.alpha = Math.min(this.alpha + 0.2, 1);
        this.rerender();
    }
};

BlockMorph.prototype.mouseLeaveBounds = function (dragged) {
    if (SyntaxElementMorph.prototype.alpha < 1) {
        delete this.alpha;
        this.rerender();
    }
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
    droppedMorph.fixLayout();
    this.fixLayout();
    this.buildSpec();
};

BlockMorph.prototype.situation = function () {
    // answer a dictionary specifying where I am right now, so
    // I can slide back to it if I'm dropped somewhere else
    if (!(this.parent instanceof TemplateSlotMorph)) {
        var scripts = this.parentThatIsA(ScriptsMorph);
        if (scripts) {
            return {
                origin: this.parent,
                position: this.position().subtract(scripts.position())
            };
        }
    }
    return BlockMorph.uber.situation.call(this);
};

// BlockMorph sticky comments

BlockMorph.prototype.prepareToBeGrabbed = function (hand) {
    var wrld = hand ? hand.world : this.world();
    this.allInputs().forEach(input =>
        delete input.bindingID
    );
    this.allComments().forEach(comment =>
        comment.startFollowing(this, wrld)
    );
};

BlockMorph.prototype.justDropped = function () {
    delete this.alpha;
    this.allComments().forEach(comment =>
        comment.stopFollowing()
    );
};

BlockMorph.prototype.allComments = function () {
    return this.allChildren().filter(block =>
        !isNil(block.comment)
    ).map(block =>
        block.comment
    );
};

BlockMorph.prototype.destroy = function (justThis) {
    // private - use IDE_Morph.removeBlock() to first stop all my processes
    // FIXME: Make sure the processes have been stopped when called from the Sn
    if (justThis) {
        if (!isNil(this.comment)) {
            this.comment.destroy();
        }
    } else {
        this.allComments().forEach(comment =>
            comment.destroy()
        );
    }
    BlockMorph.uber.destroy.call(this);
};

BlockMorph.prototype.stackHeight = function () {
    var fb = this.fullBounds(),
        commentsBottom = Math.max(this.allComments().map(comment =>
            comment.bottom()
        )) || this.bottom();
    return Math.max(fb.bottom(), commentsBottom) - fb.top();
};

BlockMorph.prototype.stackFullBounds = function () {
    var fb = this.fullBounds();
    this.allComments().forEach(comment =>
        fb.mergeWith(comment.bounds)
    );
    return fb;
};

BlockMorph.prototype.stackWidth = function () {
    var fb = this.fullBounds(),
        commentsRight = Math.max(this.allComments().map(comment =>
            comment.right()
        )) || this.right();
    return Math.max(fb.right(), commentsRight) - fb.left();
};

BlockMorph.prototype.snapTarget = function () {
    return null;
};

BlockMorph.prototype.snap = function () {
    var top = this.topBlock(),
        receiver,
        stage,
        ide;
    top.allComments().forEach(comment =>
        comment.align(top)
    );
    // fix highlights, if any
    if (this.getHighlight() && (this !== top)) {
        this.removeHighlight();
    }
    if (top.getHighlight()) {
        top.addHighlight(top.removeHighlight());
    }
    // register generic hat blocks
    if (this.selector === 'receiveCondition') {
        receiver = top.scriptTarget();
        if (receiver) {
            stage = receiver.parentThatIsA(StageMorph);
            if (stage) {
                stage.enableCustomHatBlocks = true;
                stage.threads.pauseCustomHatBlocks = false;
                ide = stage.parentThatIsA(IDE_Morph);
                if (ide) {
                    ide.controlBar.stopButton.refresh();
                }
            }
        }
    }
};

// CommandBlockMorph ///////////////////////////////////////////////////

/*
    I am a stackable jigsaw-shaped block.

    I inherit from BlockMorph adding the following most important
    public accessors:

        nextBlock()       - set / get the block attached to my bottom
        bottomBlock()     - answer the bottom block of my stack
        blockSequence()   - answer an array of blocks starting with myself

    and the following "lexical awareness" indicators:

        partOfCustomCommand - temporary bool set by the evaluator
        exitTag           - temporary string or number set by the evaluator
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

    this.bounds.setExtent(new Point(60, 24).multiplyBy(this.scale));
    this.fixLayout();
    this.rerender();

    this.partOfCustomCommand = false;
    this.exitTag = null;
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
            affected = this.parentThatIsA(CommandSlotMorph, ReporterSlotMorph);
        this.add(block);
        if (nb) {
            block.bottomBlock().nextBlock(nb);
        }
        block.setPosition(
            new Point(
                this.left(),
                this.bottom() - (this.corner)
            )
        );
        if (affected) {
            affected.fixLayout();
        }
    } else {
        return detect(
            this.children,
            child => child instanceof CommandBlockMorph && !child.isPrototype
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

CommandBlockMorph.prototype.wrapAttachPoint = function () {
    var cslot = detect( // could be a method making uses of caching...
        this.inputs(), // ... although these already are cached
        each => each instanceof CSlotMorph
    );
    if (cslot && !cslot.nestedBlock()) {
        return new Point(
            cslot.left() + (cslot.inset * 2) + cslot.corner,
            cslot.top() + (cslot.corner * 2)
        );
    }
    return null;
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
    var answer = [],
        tp;
    if (!(this instanceof HatBlockMorph)) {
        tp = this.topAttachPoint();
        if (!(this.parent instanceof SyntaxElementMorph)) {
            answer.push({
                point: tp,
                element: this,
                loc: 'top',
                type: 'block'
            });
        }
        if (ScriptsMorph.prototype.enableNestedAutoWrapping ||
                !this.parentThatIsA(CommandSlotMorph)) {
            answer.push({
                point: tp,
                element: this,
                loc: 'wrap',
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
    var target = newParent || this.parent,
        answer = [],
        topBlocks;

    if (this instanceof HatBlockMorph && newParent.rejectsHats) {
        return answer;
    }
    topBlocks = target.children.filter(child =>
        (child !== this) &&
            child instanceof SyntaxElementMorph &&
                !child.isTemplate
    );
    topBlocks.forEach(block =>
        block.forAllChildren(child => {
            if (child.attachTargets) {
                child.attachTargets().forEach(at =>
                    answer.push(at)
                );
            }
        })
    );
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
        minDist = 1000,
        wrap;

    if (!(this instanceof HatBlockMorph)) {
        ref.push(
            {
                point: this.topAttachPoint(),
                loc: 'top'
            }
        );
        wrap = this.wrapAttachPoint();
        if (wrap) {
            ref.push(
                {
                    point: wrap,
                    loc: 'wrap'
                }
            );
        }
    }
    if (!bottomBlock.isStop()) {
        ref.push(
            {
                point: bottomBlock.bottomAttachPoint(),
                loc: 'bottom'
            }
        );
    }
    this.allAttachTargets(target).forEach(eachTarget =>
        ref.forEach(eachRef => {
            // match: either both locs are 'wrap' or both are different,
            // none being 'wrap' (can this be expressed any better?)
            if ((eachRef.loc === 'wrap' && (eachTarget.loc === 'wrap')) ||
                ((eachRef.loc !== eachTarget.loc) &&
                    (eachRef.loc !== 'wrap') && (eachTarget.loc !== 'wrap'))
            ) {
                dist = eachRef.point.distanceTo(eachTarget.point);
                if ((dist < thresh) && (dist < minDist)) {
                    minDist = dist;
                    answer = eachTarget;
                }
            }
        })
    );
    return answer;
};

CommandBlockMorph.prototype.snapTarget = function () {
    return this.closestAttachTarget();
};

CommandBlockMorph.prototype.snap = function (target) {
    var scripts = this.parentThatIsA(ScriptsMorph),
        before,
        next,
        offsetY,
        cslot,
        affected;

    if (target === null) {
        this.fixBlockColor();
        CommandBlockMorph.uber.snap.call(this); // align stuck comments
        return;
    }

    scripts.lastDropTarget = target;
    if (target.loc === 'bottom') {
        if (target.type === 'slot') {
            this.removeHighlight();
            target.element.nestedBlock(this);
        } else {
            target.element.nextBlock(this);
        }
        if (this.isStop()) {
            next = this.nextBlock();
            if (next) {
                scripts.add(next);
                next.moveBy(this.extent().floorDivideBy(2));
                affected = this.parentThatIsA(
                    CommandSlotMorph,
                    ReporterSlotMorph
                );
                if (affected) {
                    affected.fixLayout();
                }
            }
        }
    } else if (target.loc === 'top') {
        target.element.removeHighlight();
        offsetY = this.bottomBlock().bottom() - this.bottom();
        this.setBottom(target.element.top() + this.corner - offsetY);
        this.setLeft(target.element.left());
        this.bottomBlock().nextBlock(target.element);
    } else if (target.loc === 'wrap') {
        cslot = detect( // this should be a method making use of caching
            this.inputs(), // these are already cached, so maybe it's okay
            each => each instanceof CSlotMorph
        );
        // assume the cslot is (still) empty, was checked determining the target
        before = (target.element.parent);

        // adjust position of wrapping block
        this.moveBy(target.point.subtract(cslot.slotAttachPoint()));

        // wrap c-slot around target
        cslot.nestedBlock(target.element);
        if (before instanceof CommandBlockMorph) {
            before.nextBlock(this);
        } else if (before instanceof CommandSlotMorph) {
            before.nestedBlock(this);
        } else if (before instanceof RingReporterSlotMorph) {
            before.add(this);
            before.fixLayout();
        }

        // fix zebra coloring.
        // this could probably be generalized into the fixBlockColor mechanism
        target.element.blockSequence().forEach(cmd =>
            cmd.fixBlockColor()
        );
    }
    this.fixBlockColor();
    CommandBlockMorph.uber.snap.call(this); // align stuck comments
    if (this.snapSound) {
        this.snapSound.play();
    }
};

CommandBlockMorph.prototype.prepareToBeGrabbed = function (handMorph) {
    var oldPos = this.position();

    if (this.parent instanceof RingReporterSlotMorph) {
        this.parent.revertToDefaultInput(this);
        this.setPosition(oldPos);
    }
    CommandBlockMorph.uber.prepareToBeGrabbed.call(this, handMorph);
};

CommandBlockMorph.prototype.isStop = function () {
    var choice;
    if (this.selector === 'doStopThis') { // this could be cached...
        choice = this.inputs()[0].evaluate();
        return choice instanceof Array && choice[0].length < 12;
    }
    return ([
        'doForever',
        'doReport',
        'removeClone'
    ].indexOf(this.selector) > -1);
};

// CommandBlockMorph deleting

CommandBlockMorph.prototype.userDestroy = function () {
    var target = this.selectForEdit(); // enable copy-on-edit
    if (target !== this) {
        return this.userDestroy.call(target);
    }
    if (this.nextBlock()) {
        this.userDestroyJustThis();
        return;
    }

    var ide = this.parentThatIsA(IDE_Morph),
        parent = this.parentThatIsA(SyntaxElementMorph),
        cslot = this.parentThatIsA(CSlotMorph);

    this.prepareToBeGrabbed(); // fix outer ring reporter slot

    if (ide) {
        // also stop all active processes hatted by this block
        ide.removeBlock(this);
    } else {
        this.destroy();
    }
    if (cslot) {
        cslot.fixLayout();
    }
    if (parent) {
        parent.reactToGrabOf(this); // fix highlight
    }
};

CommandBlockMorph.prototype.userDestroyJustThis = function () {
    // delete just this one block, reattach next block to the previous one,
    var scripts = this.parentThatIsA(ScriptsMorph),
        ide = this.parentThatIsA(IDE_Morph),
        cs = this.parentThatIsA(CommandSlotMorph, RingReporterSlotMorph),
        pb,
        nb = this.nextBlock(),
        above,
        parent = this.parentThatIsA(SyntaxElementMorph),
        cslot = this.parentThatIsA(CSlotMorph, RingReporterSlotMorph);

    this.topBlock().fullChanged();
    if (this.parent) {
        pb = this.parent.parentThatIsA(CommandBlockMorph);
    }
    if (pb && (pb.nextBlock() === this)) {
        above = pb;
    } else if (cs && (cs.nestedBlock() === this)) {
        above = cs;
        this.prepareToBeGrabbed(); // restore ring reporter slot, if any
    }
    if (ide) {
        // also stop all active processes hatted by this block
        ide.removeBlock(this, true); // just this block
    } else {
        this.destroy(true); // just this block
    }
    if (nb) {
        if (above instanceof CommandSlotMorph ||
            above instanceof RingReporterSlotMorph
        ) {
            above.nestedBlock(nb);
        } else if (above instanceof CommandBlockMorph) {
            above.nextBlock(nb);
        } else {
            scripts.add(nb);
        }
    } else if (cslot) {
        cslot.fixLayout();
    }
    if (parent) {
        parent.reactToGrabOf(this); // fix highlight
    }
};

// CommandBlockMorph drawing:

CommandBlockMorph.prototype.outlinePath = function(ctx, inset) {
    var indent = this.corner * 2 + this.inset,
        bottom = this.height() - this.corner,
        bottomCorner = this.height() - this.corner * 2,
        radius = Math.max(this.corner - inset, 0),
        pos = this.position();

    // top left:
    ctx.arc(
        this.corner,
        this.corner,
        radius,
        radians(-180),
        radians(-90),
        false
    );

    // top dent:
    ctx.lineTo(this.corner + this.inset, inset);
    ctx.lineTo(indent, this.corner + inset);
    ctx.lineTo(indent + this.dent, this.corner + inset);
    ctx.lineTo(this.corner * 3 + this.inset + this.dent, inset);
    ctx.lineTo(this.width() - this.corner, inset);

    // top right:
    ctx.arc(
        this.width() - this.corner,
        this.corner,
        radius,
        radians(-90),
        radians(-0),
        false
    );

    // C-Slots
    this.cSlots().forEach(slot => {
        slot.outlinePath(ctx, inset, slot.position().subtract(pos));
    });

    // bottom right:
    ctx.arc(
        this.width() - this.corner,
        bottomCorner,
        radius,
        radians(0),
        radians(90),
        false
    );

    if (!this.isStop()) {
        ctx.lineTo(this.width() - this.corner, bottom - inset);
        ctx.lineTo(this.corner * 3 + this.inset + this.dent, bottom - inset);
        ctx.lineTo(indent + this.dent, bottom + this.corner - inset);
        ctx.lineTo(indent, bottom + this.corner - inset);
        ctx.lineTo(this.corner + this.inset, bottom - inset);
    }

    // bottom left:
    ctx.arc(
        this.corner,
        bottomCorner,
        radius,
        radians(90),
        radians(180),
        false
    );
};

CommandBlockMorph.prototype.drawEdges = function (ctx) {
    this.drawTopDentEdge(ctx, 0, 0);
    this.drawBottomDentEdge(ctx, 0, this.height() - this.corner);
    this.drawLeftEdge(ctx);
    this.drawRightEdge(ctx);
    this.drawTopLeftEdge(ctx);
    this.drawBottomRightEdge(ctx);
};

CommandBlockMorph.prototype.drawTopDentEdge = function (ctx, x, y) {
    var shift = this.edge * 0.5,
        indent = x + this.corner * 2 + this.inset,
        upperGradient,
        lowerGradient,
        leftGradient,
        lgx;

    ctx.lineWidth = this.edge;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    upperGradient = ctx.createLinearGradient(
        0,
        y,
        0,
        y + this.edge
    );
    upperGradient.addColorStop(0, this.cachedClrBright);
    upperGradient.addColorStop(1, this.cachedClr);

    ctx.strokeStyle = upperGradient;
    ctx.beginPath();
    ctx.moveTo(this.corner, y + shift);
    ctx.lineTo(x + this.corner + this.inset, y + shift);
    ctx.stroke();

    ctx.strokeStyle = upperGradient;
    ctx.beginPath();
    ctx.moveTo(
        x + this.corner * 3 + this.inset + this.dent + shift,
        y + shift
    );
    ctx.lineTo(this.width() - this.corner, y + shift);
    ctx.stroke();

    lgx = x + this.corner + this.inset;
    leftGradient = ctx.createLinearGradient(
        lgx - this.edge,
        y + this.edge,
        lgx,
        y
    );
    leftGradient.addColorStop(0, this.cachedClr);
    leftGradient.addColorStop(1, this.cachedClrBright);

    ctx.strokeStyle = leftGradient;
    ctx.beginPath();
    ctx.moveTo(x + this.corner + this.inset, y + shift);
    ctx.lineTo(indent, y + this.corner + shift);
    ctx.stroke();

    lowerGradient = ctx.createLinearGradient(
        0,
        y + this.corner,
        0,
        y + this.corner + this.edge
    );
    lowerGradient.addColorStop(0, this.cachedClrBright);
    lowerGradient.addColorStop(1, this.cachedClr);

    ctx.strokeStyle = lowerGradient;
    ctx.beginPath();
    ctx.moveTo(indent, y + this.corner + shift);
    ctx.lineTo(indent + this.dent, y + this.corner + shift);
    ctx.stroke();
};

CommandBlockMorph.prototype.drawBottomDentEdge = function (ctx, x, y) {
    var shift = this.edge * 0.5,
        indent = x + this.corner * 2 + this.inset,
        upperGradient,
        lowerGradient,
        rightGradient;

    ctx.lineWidth = this.edge;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    upperGradient = ctx.createLinearGradient(
        0,
        y - this.edge,
        0,
        y
    );
    upperGradient.addColorStop(0, this.cachedClr);
    upperGradient.addColorStop(1, this.cachedClrDark);

    ctx.strokeStyle = upperGradient;
    ctx.beginPath();
    ctx.moveTo(this.corner, y - shift);
    if (this.isStop()) {
        ctx.lineTo(this.width() - this.corner, y - shift);
    } else {
        ctx.lineTo(x + this.corner + this.inset - shift, y - shift);
    }
    ctx.stroke();

    if (this.isStop()) {    // draw straight bottom edge
        return null;
    }

    lowerGradient = ctx.createLinearGradient(
        0,
        y + this.corner - this.edge,
        0,
        y + this.corner
    );
    lowerGradient.addColorStop(0, this.cachedClr);
    lowerGradient.addColorStop(1, this.cachedClrDark);

    ctx.strokeStyle = lowerGradient;
    ctx.beginPath();
    ctx.moveTo(indent + shift, y + this.corner - shift);
    ctx.lineTo(indent + this.dent, y + this.corner - shift);
    ctx.stroke();

    rightGradient = ctx.createLinearGradient(
        x + indent + this.dent - this.edge,
        y + this.corner - this.edge,
        x + indent + this.dent,
        y + this.corner
    );
    rightGradient.addColorStop(0, this.cachedClr);
    rightGradient.addColorStop(1, this.cachedClrDark);

    ctx.strokeStyle = rightGradient;
    ctx.beginPath();
    ctx.moveTo(x + indent + this.dent, y + this.corner - shift);
    ctx.lineTo(
        x + this.corner * 3 + this.inset + this.dent,
        y - shift
    );
    ctx.stroke();

    ctx.strokeStyle = upperGradient;
    ctx.beginPath();
    ctx.moveTo(
        x + this.corner * 3 + this.inset + this.dent,
        y - shift
    );
    ctx.lineTo(this.width() - this.corner, y - shift);
    ctx.stroke();
};

CommandBlockMorph.prototype.drawFlatBottomDentEdge = function (ctx) {
    if (!this.isStop()) {
        ctx.fillStyle = this.color.darker(this.contrast / 2).toString();
        ctx.beginPath();
        this.drawDent(ctx, 0, this.height() - this.corner);
        ctx.closePath();
        ctx.fill();
    }
};

CommandBlockMorph.prototype.drawLeftEdge = function (ctx) {
    var shift = this.edge * 0.5,
        gradient = ctx.createLinearGradient(0, 0, this.edge, 0);

    gradient.addColorStop(0, this.cachedClrBright);
    gradient.addColorStop(1, this.cachedClr);

    ctx.lineWidth = this.edge;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(shift, this.corner);
    ctx.lineTo(shift, this.height() - this.corner * 2 - shift);
    ctx.stroke();
};

CommandBlockMorph.prototype.drawRightEdge = function (ctx) {
    var shift = this.edge * 0.5,
        cslots = this.cSlots(),
        top = this.top(),
        x = this.width(),
        y,
        gradient;

    gradient = ctx.createLinearGradient(x - this.edge, 0, x, 0);
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrDark);

    ctx.lineWidth = this.edge;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = gradient;

    if (cslots.length) {
        ctx.beginPath();
        ctx.moveTo(x - shift, this.corner + shift);
        cslots.forEach(slot => {
            y = slot.top() - top;
            ctx.lineTo(x - shift, y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x - shift, y + slot.height());
        });
    } else {
        ctx.beginPath();
        ctx.moveTo(x - shift, this.corner + shift);
    }
    ctx.lineTo(x - shift, this.height() - this.corner * 2);
    ctx.stroke();
};

CommandBlockMorph.prototype.drawTopLeftEdge = function (ctx) {
    var shift = this.edge * 0.5,
        gradient;

    gradient = ctx.createRadialGradient(
        this.corner,
        this.corner,
        this.corner,
        this.corner,
        this.corner,
        this.corner - this.edge
    );
    gradient.addColorStop(0, this.cachedClrBright);
    gradient.addColorStop(1, this.cachedClr);

    ctx.lineWidth = this.edge;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    ctx.strokeStyle = gradient;

    ctx.beginPath();
    ctx.arc(
        this.corner,
        this.corner,
        this.corner - shift,
        radians(-180),
        radians(-90),
        false
    );
    ctx.stroke();
};

CommandBlockMorph.prototype.drawBottomRightEdge = function (ctx) {
    var shift = this.edge * 0.5,
        x = this.width() - this.corner,
        y = this.height() - this.corner * 2,
        gradient;

    gradient = ctx.createRadialGradient(
        x,
        y,
        this.corner,
        x,
        y,
        this.corner - this.edge
    );
    gradient.addColorStop(0, this.cachedClrDark);
    gradient.addColorStop(1, this.cachedClr);

    ctx.lineWidth = this.edge;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    ctx.strokeStyle = gradient;

    ctx.beginPath();
    ctx.arc(
        x,
        y,
        this.corner - shift,
        radians(90),
        radians(0),
        true
    );
    ctx.stroke();
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
    this.bounds.setExtent(new Point(120, 36).multiplyBy(this.scale));
    this.fixLayout();
    this.rerender();
};

HatBlockMorph.prototype.readout = function () {
    return detect(
        this.children,
        function(child) {
            return child instanceof SpeechBubbleMorph;
        }
    );
};

// clears the msg que for this  hatblock
HatBlockMorph.prototype.clearMessages = function () {
    const ide = this.parentThatIsA(IDE_Morph);
    const queue = ide.sockets.getMessageQueue(this);
    queue.empty();
    this.updateReadout();
};

// creates, updates and destroys the readout as necessary
HatBlockMorph.prototype.updateReadout = function () {
    // forked from snap/dd4fd6190c
    var myself = this,
        world = this.world(),
        readColor = new Color(242, 119, 68);
    if (!world) return;
    const ide = this.parentThatIsA(IDE_Morph);
    if (!ide) return;
    const queue = ide.sockets.getMessageQueue(this);
    this.msgCount =  queue ? queue.contents.length : 0;
    var readout = this.readout();
    if (this.msgCount < 1) {
        if (readout) {
            readout.destroy();
        }
        return;
    }
    if (readout) { // just update the value
        readout.changed();
        readout.contents = this.msgCount.toString();
        readout.fixLayout();
        readout.rerender();
    } else { // create the readout
        readout = new SpeechBubbleMorph(
            this.msgCount.toString(),
            readColor, // color,
            null, // edge,
            null, // border,
            readColor.darker(), // borderColor,
            null, // padding,
            1 // isThought - don't draw a hook
        );
        readout.mouseClickLeft = function() {
            var dialog = new DialogBoxMorph();
            dialog.askYesNo('Clear Message Queue', 'Do you want to clear the message queue for this block?', world);
            dialog.ok = function() {
                myself.clearMessages();
                this.destroy();
            };
        };
        this.add(readout);
    }

    // compute and set the bubble position
    var padding = 5;
    var bubblePos = this.position() // hatblock pos
        .add(new Point(this.width(), 0)) // all the way to the right
        .add(new Point(padding, -2*padding)); // add a padding (same for x & y)
    readout.setPosition(bubblePos);

};

// HatBlockMorph enumerating:

HatBlockMorph.prototype.blockSequence = function () {
    // override my inherited method so that I am not part of my sequence
    var result = HatBlockMorph.uber.blockSequence.call(this);
    result.shift();
    return result;
};

// HatBlockMorph drawing:

HatBlockMorph.prototype.outlinePath = function(ctx, inset) {
    var indent = this.corner * 2 + this.inset,
        bottom = this.height() - this.corner,
        bottomCorner = this.height() - this.corner * 2,
        radius = Math.max(this.corner - inset, 0),
        s = this.hatWidth,
        h = this.hatHeight,
        r = ((4 * h * h) + (s * s)) / (8 * h),
        a = degrees(4 * Math.atan(2 * h / s)),
        sa = a / 2,
        sp = Math.min(s * 1.7, this.width() - this.corner);

    // top arc:
    ctx.moveTo(inset, h + this.corner);
    ctx.arc(
        s / 2,
        r,
        r,
        radians(-sa - 90),
        radians(-90),
        false
    );
    ctx.bezierCurveTo(
        s,
        0,
        s,
        h,
        sp,
        h
    );

    // top right:
    ctx.arc(
        this.width() - this.corner,
        h + this.corner,
        radius,
        radians(-90),
        radians(-0),
        false
    );

    // bottom right:
    ctx.arc(
        this.width() - this.corner,
        bottomCorner,
        radius,
        radians(0),
        radians(90),
        false
    );

    if (!this.isStop()) {
        ctx.lineTo(this.width() - this.corner, bottom - inset);
        ctx.lineTo(this.corner * 3 + this.inset + this.dent, bottom - inset);
        ctx.lineTo(indent + this.dent, bottom + this.corner - inset);
        ctx.lineTo(indent, bottom + this.corner - inset);
        ctx.lineTo(this.corner + this.inset, bottom - inset);
    }

    // bottom left:
    ctx.arc(
        this.corner,
        bottomCorner,
        radius,
        radians(90),
        radians(180),
        false
    );
};

HatBlockMorph.prototype.drawLeftEdge = function (ctx) {
    var shift = this.edge * 0.5,
        gradient = ctx.createLinearGradient(0, 0, this.edge, 0);

    gradient.addColorStop(0, this.cachedClrBright);
    gradient.addColorStop(1, this.cachedClr);

    ctx.lineWidth = this.edge;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(shift, this.hatHeight + shift);
    ctx.lineTo(shift, this.height() - this.corner * 2 - shift);
    ctx.stroke();
};

HatBlockMorph.prototype.drawRightEdge = function (ctx) {
    var shift = this.edge * 0.5,
        x = this.width(),
        gradient;

    gradient = ctx.createLinearGradient(x - this.edge, 0, x, 0);
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrDark);

    ctx.lineWidth = this.edge;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(x - shift, this.corner + this.hatHeight + shift);
    ctx.lineTo(x - shift, this.height() - this.corner * 2);
    ctx.stroke();
};

HatBlockMorph.prototype.drawTopDentEdge = nop;

HatBlockMorph.prototype.drawTopLeftEdge = function (ctx) {
    var shift = this.edge * 0.5,
        s = this.hatWidth,
        h = this.hatHeight,
        r = ((4 * h * h) + (s * s)) / (8 * h),
        a = degrees(4 * Math.atan(2 * h / s)),
        sa = a / 2,
        sp = Math.min(s * 1.7, this.width() - this.corner),
        gradient;

    gradient = ctx.createRadialGradient(
        s / 2,
        r,
        r - this.edge,
        s / 2,
        r,
        r
    );
    gradient.addColorStop(1, this.cachedClrBright);
    gradient.addColorStop(0, this.cachedClr);

    ctx.lineWidth = this.edge;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.arc(
        Math.round(s / 2),
        r,
        r - shift,
        radians(-sa - 90),
        radians(-90),
        false
    );
    ctx.moveTo(s / 2, shift);
    ctx.bezierCurveTo(
        s,
        shift,
        s,
        h + shift,
        sp,
        h + shift
    );
    ctx.lineTo(this.width() - this.corner, h + shift);
    ctx.stroke();
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
 
    this.bounds.setExtent(new Point(50, 22).multiplyBy(this.scale));
    this.fixLayout();
    this.rerender();
 
    this.cachedSlotSpec = null; // don't serialize
    this.isLocalVarTemplate = null; // don't serialize
};

// ReporterBlockMorph drag & drop:

ReporterBlockMorph.prototype.snapTarget = function (hand) {
    return this.parent.closestInput(this, hand);
};

ReporterBlockMorph.prototype.snap = function (target) {
    // passing the hand is optional (for when blocks are dragged & dropped)
    var scripts = this.parent,
        nb;

    this.cachedSlotSpec = null;
    if (!(scripts instanceof ScriptsMorph)) {
        return null;
    }

    if (target !== null) {
        if (target instanceof CommandSlotMorph) {
            nb = target.nestedBlock();
            if (nb) {
                nb = nb.fullCopy();
                scripts.add(nb);
                nb.moveBy(nb.extent());
                nb.fixBlockColor();
            }
        }
        target.parent.replaceInput(target, this);
        if (this.snapSound) {
            this.snapSound.play();
        }
    }
    this.fixBlockColor();
    ReporterBlockMorph.uber.snap.call(this);
};

ReporterBlockMorph.prototype.prepareToBeGrabbed = function (handMorph) {
    var oldPos = this.position();

    if ((this.parent instanceof BlockMorph)
            || (this.parent instanceof MultiArgMorph)
            || (this.parent instanceof ReporterSlotMorph)) {
        this.parent.revertToDefaultInput(this);
        this.setPosition(oldPos);
    }
    ReporterBlockMorph.uber.prepareToBeGrabbed.call(this, handMorph);
    if (handMorph) {
        handMorph.alpha = this.alpha < 1 ? 1 : 0.85;
    }
    this.cachedSlotSpec = null;
};

// ReporterBlockMorph enumerating

ReporterBlockMorph.prototype.blockSequence = function () {
    // reporters don't have a sequence, answer myself
    return this;
};

// ReporterBlockMorph evaluating

ReporterBlockMorph.prototype.isUnevaluated = function () {
    // answer whether my parent block's slot is designated to be of an
    // 'unevaluated' kind, denoting a spedial form
    var spec = this.getSlotSpec();
    return spec === '%anyUE' ||
        spec === '%boolUE' ||
        spec === '%f';
};

ReporterBlockMorph.prototype.isLocked = function () {
    // answer true if I can be exchanged by a dropped reporter
    return this.isStatic || (this.getSlotSpec() === '%t');
};

ReporterBlockMorph.prototype.getSlotSpec = function () {
    // answer the spec of the slot I'm in, if any
    // cached for performance
    if (!this.cachedSlotSpec) {
        this.cachedSlotSpec = this.determineSlotSpec();
    /*
    } else {
        // debug slot spec caching
        var real = this.determineSlotSpec();
        if (real !== this.cachedSlotSpec) {
            throw new Error(
                'cached slot spec ' +
                this.cachedSlotSpec +
                ' does not match: ' +
                real
            );
        }
    */
    }
    return this.cachedSlotSpec;
};

ReporterBlockMorph.prototype.determineSlotSpec = function () {
    // private - answer the spec of the slot I'm in, if any
    var parts, idx;
    if (this.parent instanceof BlockMorph) {
        parts = this.parent.parts().filter(part =>
            !(part instanceof BlockHighlightMorph)
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
    var label;
    if (this.parent instanceof BlockInputFragmentMorph) {
        return this.parent.mouseClickLeft();
    }
    if (this.parent instanceof TemplateSlotMorph) {
        const block = this.parent.parent.parent;
        if (this.parent.parent && this.parent.parent.parent &&
                this.parent.parent.parent instanceof RingMorph) {
            label = "Input name";
        } else if (this.parent.parent.elementSpec === '%blockVars') {
            label = "Block variable name";
        } else {
            label = "Script variable name";
        }
        new DialogBoxMorph(
            this,
            function(spec) {
                if (block.id) {
                    SnapActions.setBlockSpec(this, spec);
                } else {
                    this.userSetSpec(spec);
                }
            },
            this
        ).prompt(
            label,
            this.blockSpec,
            this.world()
        );
    } else {
        ReporterBlockMorph.uber.mouseClickLeft.call(this, pos);
    }
};

// ReporterBlock exporting picture with result bubble

ReporterBlockMorph.prototype.exportResultPic = function () {
    var top = this.topBlock(),
        receiver = top.scriptTarget(),
        stage;
    if (top !== this) {return; }
    if (receiver) {
        stage = receiver.parentThatIsA(StageMorph);
        if (stage) {
            stage.threads.stopProcess(top);
            stage.threads.startProcess(top, receiver, false, true);
        }
    }
};

// ReporterBlockMorph deleting

ReporterBlockMorph.prototype.userDestroy = function () {
    // make sure to restore default slot of parent block
    var target = this.selectForEdit(); // enable copy-on-edit
    if (target !== this) {
        return this.userDestroy.call(target);
    }

    var world = this.world(),
        hand;
    if (world) {
        hand = world.hand;
    }

    this.topBlock().fullChanged();
    this.prepareToBeGrabbed(hand);
    this.destroy();
};

// ReporterBlockMorph drawing:

ReporterBlockMorph.prototype.outlinePath = function (ctx, inset) {
    if (this.isPredicate) {
        this.outlinePathDiamond(ctx, inset);
    } else {
        this.outlinePathOval(ctx, inset);
    }
};

ReporterBlockMorph.prototype.outlinePathOval = function (ctx, inset) {
    // draw the 'flat' shape
    var h = this.height(),
        r = Math.min(this.rounding, h / 2),
        radius = Math.max(r - inset, 0),
        w = this.width(),
        pos = this.position();

    // top left:
    ctx.arc(
        r,
        r,
        radius,
        radians(-180),
        radians(-90),
        false
    );

    // top right:
    ctx.arc(
        w - r,
        r,
        radius,
        radians(-90),
        radians(-0),
        false
    );

    // C-Slots
    this.cSlots().forEach(slot => {
        slot.outlinePath(ctx, inset, slot.position().subtract(pos));
    });

    // bottom right:
    ctx.arc(
        w - r,
        h - r,
        radius,
        radians(0),
        radians(90),
        false
    );

    // bottom left:
    ctx.arc(
        r,
        h - r,
        radius,
        radians(90),
        radians(180),
        false
    );

    ctx.lineTo(r - radius, r); // close the path so we can clip it for rings
};

ReporterBlockMorph.prototype.outlinePathDiamond = function (ctx, inset) {
    // draw the 'flat' shape:
    var w = this.width(),
        h = this.height(),
        h2 = Math.floor(h / 2),
        r = this.rounding,
        right = w - r,
        pos = this.position(),
        cslots = this.cSlots();

    ctx.moveTo(inset, h2);
    ctx.lineTo(r, inset);
    ctx.lineTo(right - inset, inset);

    if (cslots.length) {
        this.cSlots().forEach(slot => {
            slot.outlinePath(ctx, inset, slot.position().subtract(pos));
        });
    } else {
        ctx.lineTo(w - inset, h2);
    }

    ctx.lineTo(right - inset, h - inset);
    ctx.lineTo(r, h - inset);
};

ReporterBlockMorph.prototype.drawEdges = function (ctx) {
    if (this.isPredicate) {
        this.drawEdgesDiamond(ctx);
    } else {
        this.drawEdgesOval(ctx);
    }
};

ReporterBlockMorph.prototype.drawEdgesOval = function (ctx) {
    // add 3D-Effect
    var h = this.height(),
        r = Math.max(Math.min(this.rounding, h / 2), this.edge),
        w = this.width(),
        shift = this.edge / 2,
        y,
        top = this.top(),
        cslots = this.cSlots(),
        gradient;

    ctx.lineWidth = this.edge;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    // half-tone edges
    // bottem left corner
    gradient = ctx.createRadialGradient(
        r,
        h - r,
        r - this.edge,
        r,
        h - r,
        r + this.edge
    );
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrBright);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.arc(
        r,
        h - r,
        r - shift,
        radians(90),
        radians(180),
        false
    );
    ctx.stroke();

    // top right corner
    gradient = ctx.createRadialGradient(
        w - r,
        r,
        r - this.edge,
        w - r,
        r,
        r + this.edge
    );
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrDark);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.arc(
        w - r,
        r,
        r - shift,
        radians(-90),
        radians(0),
        false
    );
    ctx.stroke();

    // normal gradient edges

    // top edge: straight line
    gradient = ctx.createLinearGradient(
        0,
        0,
        0,
        this.edge
    );
    gradient.addColorStop(0, this.cachedClrBright);
    gradient.addColorStop(1, this.cachedClr);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(r - shift, shift);
    ctx.lineTo(w - r + shift, shift);
    ctx.stroke();

    // top edge: left corner
    gradient = ctx.createRadialGradient(
        r,
        r,
        r - this.edge,
        r,
        r,
        r
    );
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrBright);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.arc(
        r,
        r,
        r - shift,
        radians(180),
        radians(270),
        false
    );
    ctx.stroke();

    // bottom edge: right corner
    gradient = ctx.createRadialGradient(
        w - r,
        h - r,
        r - this.edge,
        w - r,
        h - r,
        r
    );
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrDark);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.arc(
        w - r,
        h - r,
        r - shift,
        radians(0),
        radians(90),
        false
    );
    ctx.stroke();

    // bottom edge: straight line
    gradient = ctx.createLinearGradient(
        0,
        h - this.edge,
        0,
        h
    );
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrDark);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(r - shift, h - shift);
    ctx.lineTo(w - r + shift, h - shift);
    ctx.stroke();

    // left edge: straight vertical line
    gradient = ctx.createLinearGradient(0, 0, this.edge, 0);
    gradient.addColorStop(0, this.cachedClrBright);
    gradient.addColorStop(1, this.cachedClr);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(shift, r);
    ctx.lineTo(shift, h - r);
    ctx.stroke();

    // right edge: straight vertical line
    gradient = ctx.createLinearGradient(w - this.edge, 0, w, 0);
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrDark);
    ctx.strokeStyle = gradient;

    if (cslots.length) {
        ctx.beginPath();
        ctx.moveTo(w - shift, r + shift);
        cslots.forEach(slot => {
            y = slot.top() - top;
            ctx.lineTo(w - shift, y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(w - shift, y + slot.height());
        });
    } else {
        ctx.beginPath();
        ctx.moveTo(w - shift, r + shift);
    }

    ctx.lineTo(w - shift, h - r);
    ctx.stroke();
};

ReporterBlockMorph.prototype.drawEdgesDiamond = function (ctx) {
    // add 3D-Effec
    var w = this.width(),
        h = this.height(),
        h2 = Math.floor(h / 2),
        r = this.rounding,
        shift = this.edge / 2,
        cslots = this.cSlots(),
        top = this.top(),
        y,
        gradient;

    ctx.lineWidth = this.edge;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    // half-tone edges
    // bottom left corner
    gradient = ctx.createLinearGradient(
        -r,
        0,
        r,
        0
    );
    gradient.addColorStop(1, this.cachedClr);
    gradient.addColorStop(0, this.cachedClrBright);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(shift, h2);
    ctx.lineTo(r, h - shift);
    ctx.closePath();
    ctx.stroke();

    // normal gradient edges
    // top edge: left corner
    gradient = ctx.createLinearGradient(
        0,
        0,
        r,
        0
    );
    gradient.addColorStop(0, this.cachedClrBright);
    gradient.addColorStop(1, this.cachedClr);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(shift, h2);
    ctx.lineTo(r, shift);
    ctx.closePath();
    ctx.stroke();

    // top edge: straight line
    gradient = ctx.createLinearGradient(
        0,
        0,
        0,
        this.edge
    );
    gradient.addColorStop(0, this.cachedClrBright);
    gradient.addColorStop(1, this.cachedClr);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(r, shift);

    // right edge
    if (cslots.length) {
        // end of top edge
        ctx.lineTo(w - r - shift, shift);
        ctx.closePath();
        ctx.stroke();

        // right vertical edge
        gradient = ctx.createLinearGradient(w - r - this.edge, 0, w - r, 0);
        gradient.addColorStop(0, this.cachedClr);
        gradient.addColorStop(1, this.cachedClrDark);

        ctx.lineWidth = this.edge;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = gradient;

        ctx.beginPath();
        ctx.moveTo(w - r - shift, this.edge + shift);
        cslots.forEach(slot => {
            y = slot.top() - top;
            ctx.lineTo(w - r - shift, y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(w - r - shift, y + slot.height());
        });
        ctx.lineTo(w - r - shift, h - shift);
        ctx.stroke();
    } else {
        // end of top edge
        ctx.lineTo(w - r, shift);
        ctx.closePath();
        ctx.stroke();

        // top diagonal slope right
        gradient = ctx.createLinearGradient(
            w - r,
            0,
            w + r,
            0
        );
        gradient.addColorStop(0, this.cachedClr);
        gradient.addColorStop(1, this.cachedClrDark);
        ctx.strokeStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(w - shift, h2);
        ctx.lineTo(w - r, shift);
        ctx.closePath();
        ctx.stroke();

        // bottom diagonal slope right
        gradient = ctx.createLinearGradient(
            w - r,
            0,
            w,
            0
        );
        gradient.addColorStop(0, this.cachedClr);
        gradient.addColorStop(1, this.cachedClrDark);
        ctx.strokeStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(w - r, h - shift);
        ctx.lineTo(w - shift, h2);
        ctx.closePath();
        ctx.stroke();
    }

    // bottom edge: straight line
    gradient = ctx.createLinearGradient(
        0,
        h - this.edge,
        0,
        h
    );
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrDark);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(r + shift, h - shift);
    ctx.lineTo(w - r - shift, h - shift);
    ctx.closePath();
    ctx.stroke();
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

RingMorph.prototype.isCachingInputs = false;
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
    this.contrast = RingMorph.prototype.contrast;
    this.setExtent(new Point(200, 80));
};

// RingMorph drawing

RingMorph.prototype.render = function (ctx) {
    var slot = this.inputs()[0],
        pos = this.position();

    this.cachedClr = this.color.toString();
    this.cachedClrBright = this.bright();
    this.cachedClrDark = this.dark();

    if (MorphicPreferences.isFlat) {
        // draw the outer filled shape
        // draw the outline
        ctx.fillStyle = this.cachedClrDark;
        ctx.beginPath();
        this.outlinePath(ctx, 0);

        // render the hole:
        slot.outlinePath(ctx, slot.position().subtract(pos));

        // ctx.closePath();
        ctx.clip('evenodd');
        ctx.fillRect(0, 0, this.width(), this.height());

        // draw the inner filled shaped
        // draw the outline
        ctx.fillStyle = this.cachedClr;
        ctx.beginPath();
        this.outlinePath(ctx, this.flatEdge);

        // render the hole:
        slot.outlinePath(ctx, slot.position().subtract(pos));

        // ctx.closePath();
        ctx.clip('evenodd');
        ctx.fillRect(0, 0, this.width(), this.height());
    } else {
        // draw the flat shape
        // draw the outline
        ctx.fillStyle = this.cachedClr;
        ctx.beginPath();
        this.outlinePath(ctx, 0);

        // render the hole:
        slot.outlinePath(ctx, slot.position().subtract(pos));

        // ctx.closePath();
        ctx.clip('evenodd');
        ctx.fillRect(0, 0, this.width(), this.height());
    
        // add 3D-Effect:
        this.drawEdges(ctx);
    }
};

// RingMorph dragging and dropping

RingMorph.prototype.rootForGrab = function () {
    if (this.isDraggable) {
        return this;
    }
    return BlockMorph.uber.rootForGrab.call(this);
};

// RingMorph ops - Note: these assume certain layouts defined elsewhere -

RingMorph.prototype.embed = function (aBlock, inputNames, noVanish) {
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
        slot.replaceInput(slot.contents(), aBlock);
    } else if (aBlock instanceof BooleanSlotMorph) {
        this.isStatic = false;
        this.setSpec('%rp %ringparms');
        this.selector = 'reifyPredicate';
        slot = this.parts()[0];
        slot.replaceInput(slot.contents(), aBlock);
    } else { // reporter or input slot)
        this.isStatic = false;
        this.setSpec('%rr %ringparms');
        this.selector = 'reifyReporter';
        slot = this.parts()[0];
        slot.replaceInput(slot.contents(), aBlock, noVanish);
    }

    // set my inputs, if any
    slot = this.parts()[1];
    if (inputNames) {
        inputNames.forEach(name =>
            slot.addInput(name)
        );
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
    if ((block.selector === 'reportGetVar' &&
            !contains(this.inputNames(), block.blockSpec)) ||
        // block.selector === 'reportListItem' ||
        block.selector === 'reportJSFunction' ||
        block.selector === 'reportAttributeOf' ||
        block.selector === 'reportCompiled' ||
        (block instanceof RingMorph)
    ) {
        this.parent.replaceInput(this, block);
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
    slot.fixLayout();
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
ScriptsMorph.prototype.undoCategory = 'scripts';
ScriptsMorph.uber = FrameMorph.prototype;

// ScriptsMorph preference settings

ScriptsMorph.prototype.cleanUpMargin = 20;
ScriptsMorph.prototype.cleanUpSpacing = 15;
ScriptsMorph.prototype.isPreferringEmptySlots = true;
ScriptsMorph.prototype.enableKeyboard = true;
ScriptsMorph.prototype.enableNestedAutoWrapping = true;
ScriptsMorph.prototype.feedbackColor = WHITE;

// ScriptsMorph instance creation:

function ScriptsMorph() {
    this.init();
}

ScriptsMorph.prototype.init = function () {
    this.feedbackMorph = new BoxMorph();
    this.rejectsHats = false;

    // keyboard editing support:
    this.focus = null;

    ScriptsMorph.uber.init.call(this);
    this.setColor(new Color(70, 70, 70));

};

// ScriptsMorph deep copying:

ScriptsMorph.prototype.fullCopy = function () {
    var cpy = new ScriptsMorph(),
        pos = this.position(),
        child;
    if (this.focus) {
        this.focus.stopEditing();
    }
    this.children.forEach(morph => {
        if (!morph.block) { // omit anchored comments
            child = morph.fullCopy();
            cpy.add(child);
            child.setPosition(morph.position().subtract(pos));
            if (child instanceof BlockMorph) {
                child.allComments().forEach(comment =>
                    comment.align(child)
                );
            }
        }
    });
    cpy.adjustBounds();
    return cpy;
};

// ScriptsMorph rendering:

ScriptsMorph.prototype.render = function (aContext) {
    aContext.fillStyle = this.getRenderColor().toString();
    aContext.fillRect(0, 0, this.width(), this.height());
    if (this.cachedTexture) {
        this.renderCachedTexture(aContext);
    } else if (this.texture) {
        this.renderTexture(this.texture, aContext);
    }
};

ScriptsMorph.prototype.getRenderColor = function () {
    if (MorphicPreferences.isFlat ||
            SyntaxElementMorph.prototype.alpha > 0.85) {
        return this.color;
    }
    return this.color.mixed(
        Math.max(SyntaxElementMorph.prototype.alpha - 0.15, 0),
        SpriteMorph.prototype.paletteColor
    );
};

ScriptsMorph.prototype.renderCachedTexture = function (ctx) {
    // support blocks-to-text slider
    if (SyntaxElementMorph.prototype.alpha > 0.8) {
        ScriptsMorph.uber.renderCachedTexture.call(this, ctx);
    }
};

// ScriptsMorph stepping:

ScriptsMorph.prototype.step = function () {
    var world = this.world(),
        hand = world.hand,
        block;

    if (this.feedbackMorph.parent) {
        this.feedbackMorph.destroy();
        this.feedbackMorph.parent = null;
    }
    if (this.focus && (!world.keyboardFocus ||
            world.keyboardFocus instanceof StageMorph)) {
        this.focus.getFocus(world);
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
    this.feedbackMorph.rerender();
};

ScriptsMorph.prototype.showCommandDropFeedback = function (block) {
    var y, target;

    target = block.closestAttachTarget(this);
    if (!target) {
        return null;
    }
    if (target.loc === 'wrap') {
        this.showCSlotWrapFeedback(block, target.element);
        return;
    }
    this.add(this.feedbackMorph);
    this.feedbackMorph.border = 0;
    this.feedbackMorph.edge = 0;
    this.feedbackMorph.alpha = 1;
    this.feedbackMorph.bounds.setWidth(target.element.width());
    this.feedbackMorph.bounds.setHeight(Math.max(
            SyntaxElementMorph.prototype.corner,
            SyntaxElementMorph.prototype.feedbackMinHeight
        )
    );
    this.feedbackMorph.color = this.feedbackColor;
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
    this.feedbackMorph.rerender();
};

ScriptsMorph.prototype.showCSlotWrapFeedback = function (srcBlock, trgBlock) {
    var clr;
    this.feedbackMorph.bounds = trgBlock.fullBounds()
        .expandBy(BlockMorph.prototype.corner);
    this.feedbackMorph.edge = SyntaxElementMorph.prototype.corner;
    this.feedbackMorph.border = Math.max(
        SyntaxElementMorph.prototype.edge,
        3
    );
    this.add(this.feedbackMorph);
    clr = srcBlock.color.lighter(40);
    this.feedbackMorph.color = clr.copy();
    this.feedbackMorph.color.a = 0.1;
    this.feedbackMorph.borderColor = clr;
    this.feedbackMorph.rerender();
};

ScriptsMorph.prototype.closestInput = function (reporter, hand) {
    // passing the hand is optional (when dragging reporters)
    var fb = reporter.fullBoundsNoShadow(),
        stacks = this.children.filter(child =>
            (child instanceof BlockMorph) &&
                (child.fullBounds().intersects(fb))
        ),
        blackList = reporter.allInputs(),
        handPos,
        target,
        all;

    all = [];
    stacks.forEach(stack =>
        all = all.concat(stack.allInputs())
    );
    if (all.length === 0) {return null; }

    function touchingVariadicArrowsIfAny(inp, point) {
        if (inp instanceof MultiArgMorph) {
            if (point) {
                return inp.arrows().bounds.containsPoint(point);
            }
            return inp.arrows().bounds.intersects(fb);
        }
        return true;
    }

    if (this.isPreferringEmptySlots) {
        if (hand) {
            handPos = hand.position();
            target = detect(
                all,
                input => (input instanceof InputSlotMorph ||
                        (input instanceof ArgMorph &&
                            !(input instanceof CommandSlotMorph) &&
                            !(input instanceof MultiArgMorph)
                        ) ||
                        (input instanceof RingMorph && !input.contents()) ||
                        input.isEmptySlot()
                    ) &&
                        !input.isLocked() &&
                            input.bounds.containsPoint(handPos) &&
                                !contains(blackList, input)
            );
            if (target) {
                return target;
            }
        }
        target = detect(
            all,
            input => (input instanceof InputSlotMorph ||
                    input instanceof ArgMorph ||
                    (input instanceof RingMorph && !input.contents()) ||
                    input.isEmptySlot()
                ) &&
                    !input.isLocked() &&
                        input.bounds.intersects(fb) &&
                            !contains(blackList, input) &&
                                touchingVariadicArrowsIfAny(input, handPos)
        );
        if (target) {
            return target;
        }
    }

    if (hand) {
        handPos = hand.position();
        target = detect(
            all,
            input => (input !== reporter) &&
                !input.isLocked() &&
                    input.bounds.containsPoint(handPos) &&
                        !(input.parent instanceof PrototypeHatBlockMorph) &&
                            !contains(blackList, input) &&
                                touchingVariadicArrowsIfAny(input, handPos)
        );
        if (target) {
            return target;
        }
    }
    return detect(
        all,
        input => (input !== reporter) &&
            !input.isLocked() &&
                input.fullBounds().intersects(fb) &&
                    !(input.parent instanceof PrototypeHatBlockMorph) &&
                        !contains(blackList, input) &&
                            touchingVariadicArrowsIfAny(input)
    );
};

ScriptsMorph.prototype.closestBlock = function (comment, hand) {
    // passing the hand is optional (when dragging comments)
    var fb = comment.bounds,
        stacks = this.children.filter(child =>
            (child instanceof BlockMorph) &&
                (child.fullBounds().intersects(fb))
        ),
        handPos,
        target,
        all;

    all = [];
    stacks.forEach(stack => {
        all = all.concat(stack.allChildren().slice(0).reverse().filter(
            child => child instanceof BlockMorph && !child.isTemplate
        ));
    });
    if (all.length === 0) {return null; }

    if (hand) {
        handPos = hand.position();
        target = detect(
            all,
            block => !block.comment &&
                !block.isPrototype &&
                    block.bounds.containsPoint(handPos)
        );
        if (target) {
            return target;
        }
    }
    return detect(
        all,
        block => !block.comment &&
            !block.isPrototype &&
                block.bounds.intersects(fb)
    );
};

// ScriptsMorph user menu

ScriptsMorph.prototype.userMenu = function () {
    var menu = new MenuMorph(this),
        ide = this.parentThatIsA(IDE_Morph),
        blockEditor,
        obj = this.scriptTarget();

    function addOption(label, toggle, test, onHint, offHint) {
        menu.addItem(
            [
                test ? new SymbolMorph(
                    'checkedBox',
                    MorphicPreferences.menuFontSize * 0.75
                ) : new SymbolMorph(
                    'rectangle',
                    MorphicPreferences.menuFontSize * 0.75
                ),
                localize(label)
            ],
            toggle,
            test ? onHint : offHint
        );
    }

    if (!ide) {
        blockEditor = this.parentThatIsA(BlockEditorMorph);
        if (blockEditor) {
            ide = blockEditor.target.parentThatIsA(IDE_Morph);
        }
    }

    if (SnapUndo.canUndo(obj)) {
        menu.addItem(
            [
                new SymbolMorph(
                    'turnBack',
                    MorphicPreferences.menuFontSize
                ),
                localize('undo')
            ],
            function() {
                SnapUndo.undo(obj);
            },
            localize('undo the last edit')
        );
    }
    if (SnapUndo.canRedo(obj)) {
        menu.addItem(
            [
                new SymbolMorph(
                    'turnForward',
                    MorphicPreferences.menuFontSize
                ),
                localize('redo')
            ],
            function() {
                SnapUndo.redo(obj);
            },
            localize('redo the last edit')
        );
    }
    if (SnapUndo.canUndo(obj) || SnapUndo.canRedo(obj)) {
        menu.addLine();
    }

    menu.addItem('clean up', 'cleanUp', 'arrange scripts\nvertically');
    menu.addItem('add comment', 'addComment');
    menu.addItem(
        'scripts pic...',
        'exportScriptsPicture',
        'save a picture\nof all scripts'
    );
    if (ide) {
        menu.addLine();
        if (!blockEditor && obj.exemplar) {
            addOption(
                'inherited',
                () => obj.toggleInheritanceForAttribute('scripts'),
                obj.inheritsAttribute('scripts'),
                'uncheck to\ndisinherit',
                localize('check to inherit\nfrom')
                    + ' ' + obj.exemplar.name
            );
        }
        menu.addItem(
            'make a block...',
            () => new BlockDialogMorph(
                null,
                definition => {
                    if (definition.spec !== '') {
                        SnapActions.addCustomBlock(definition, obj)
                            .then(function(def) {
                                var editor = new BlockEditorMorph(def, obj);
                                editor.popUp();
                            });
                    }
                },
                this
            ).prompt(
                'Make a block',
                null,
                this.world()
            )
        );
    }
    return menu;
};

// ScriptsMorph user menu features:

ScriptsMorph.prototype.cleanUp = function () {
    var target = this.selectForEdit(), // enable copy-on-edit
        origin = target.topLeft(),
        y = target.cleanUpMargin;

    target.children.sort((a, b) =>
        // make sure the prototype hat block always stays on top
        a instanceof PrototypeHatBlockMorph ? 0 : a.top() - b.top()
    );

    const ids = this.children.map(function(child) {
        return child.id;
    });

    const positions = this.children.map(function (child) {
        if (child instanceof CommentMorph && child.block) {
            return; // skip anchored comments
        }

        point = origin.add(new Point(target.cleanUpMargin, y));
        y += child.stackHeight() + target.cleanUpSpacing;
        return point;
    });

    SnapActions.setBlocksPositions(ids, positions);

    if (target.parent) {
        target.setPosition(target.parent.topLeft());
    }
    target.adjustBounds();
};

ScriptsMorph.prototype.exportScriptsPicture = function () {
    var pic = this.scriptsPicture(),
        ide = this.world().children[0];
    if (pic) {
        ide.saveCanvasAs(
            pic,
            (ide.projectName || localize('untitled')) + ' ' +
                localize('script pic')
        );
    }
};

ScriptsMorph.prototype.scriptsPicture = function () {
    // private - answer a canvas containing the pictures of all scripts
    var boundingBox, pic, ctx;
    if (this.children.length === 0) {return; }
    boundingBox = this.children[0].fullBounds();
    this.children.forEach(child => {
        if (child.isVisible) {
            boundingBox = boundingBox.merge(child.fullBounds());
        }
    });
    pic = newCanvas(boundingBox.extent());
    ctx = pic.getContext('2d');
    this.children.forEach(child => {
        var pos = child.fullBounds().origin;
        if (child.isVisible) {
            ctx.drawImage(
                child.fullImage(),
                pos.x - boundingBox.origin.x,
                pos.y - boundingBox.origin.y
            );
        }
    });
    return pic;
};

ScriptsMorph.prototype.addComment = function () {
    var ide = this.parentThatIsA(IDE_Morph),
        blockEditor = this.parentThatIsA(BlockEditorMorph),
        world = this.world();
    new CommentMorph().pickUp(world);
    // register the drop-origin, so the element can
    // slide back to its former situation if dropped
    // somewhere where it gets rejected
    if (!ide && blockEditor) {
        ide = blockEditor.target.parentThatIsA(IDE_Morph);
    }
    if (ide) {
        world.hand.grabOrigin = {
            origin: ide.palette,
            position: ide.palette.center()
        };
    }
};

ScriptsMorph.prototype.undoOwnerId = function () {
    try {
        const editor = this.parentThatIsA(BlockEditorMorph);
        const target = editor ? editor.definition : this.scriptTarget();
        return target.id + '/' + this.undoCategory;
    } catch (err) {
        return null;
    }
};

ScriptsMorph.prototype.addToolbar = function () {
    var toolBar = new AlignmentMorph(),
        shade = new Color(140, 140, 140);

    toolBar.respectHiddens = true;
    toolBar.undoButton = new PushButtonMorph(
        this,
        function() {
            SnapUndo.undo(this.undoOwnerId());
        },
        new SymbolMorph("turnBack", 12)
    );
    toolBar.undoButton.alpha = 0.2;
    toolBar.undoButton.padding = 4;
    // toolBar.undoButton.hint = 'undo the last\nblock drop\nin this pane';
    toolBar.undoButton.labelShadowColor = shade;
    toolBar.undoButton.edge = 0;
    toolBar.undoButton.fixLayout();
    toolBar.add(toolBar.undoButton);

    toolBar.redoButton = new PushButtonMorph(
        this,
        () => SnapUndo.redo(this.undoOwnerId()),
        new SymbolMorph("turnForward", 12)
    );
    toolBar.redoButton.alpha = 0.2;
    toolBar.redoButton.padding = 4;
    // toolBar.redoButton.hint = 'redo the last undone\nblock drop\nin this pane';
    toolBar.redoButton.labelShadowColor = shade;
    toolBar.redoButton.edge = 0;
    toolBar.redoButton.fixLayout();
    toolBar.add(toolBar.redoButton);

    toolBar.keyboardButton = new ToggleButtonMorph(
    	null, // colors
        this, // target
        "toggleKeyboardEntry",
        [
            new SymbolMorph('keyboard', 12),
            new SymbolMorph('keyboardFilled', 12)
        ],
		() => !isNil(this.focus) // query
    );
    toolBar.keyboardButton.alpha = 0.2;
    toolBar.keyboardButton.padding = 4;
    toolBar.keyboardButton.edge = 0;
    toolBar.keyboardButton.hint = 'use the keyboard\nto enter blocks';
    //toolBar.keyboardButton.pressColor = new Color(40, 40, 40);
    toolBar.keyboardButton.labelShadowColor = shade;
    toolBar.keyboardButton.fixLayout();
    toolBar.add(toolBar.keyboardButton);

    return toolBar;
};

ScriptsMorph.prototype.updateToolbar = function () {
    var sf = this.parentThatIsA(ScrollFrameMorph),
        changed = false,
        owner;
    if (!sf) {return; }

    owner = this.undoOwnerId();
    if (!sf.toolBar) {
        sf.toolBar = this.addToolbar();
        sf.add(sf.toolBar);
        changed = true;
    }
    if (this.enableKeyboard) { // TODO: mark it as changed?
        sf.toolBar.keyboardButton.show();
        sf.toolBar.keyboardButton.refresh();
    } else {
        sf.toolBar.keyboardButton.hide();
    }

    if (owner && SnapUndo.canUndo(owner)) {
        if (!sf.toolBar.undoButton.isEnabled()) {
            sf.toolBar.undoButton.enable();
            changed = true;
        }
    } else if (sf.toolBar.undoButton.isEnabled()) {
        sf.toolBar.undoButton.disable();
        changed = true;
    }

    if (owner && SnapUndo.canRedo(owner)) {
        if (!sf.toolBar.redoButton.isEnabled()) {
            sf.toolBar.redoButton.enable();
            sf.toolBar.undoButton.mouseLeave();
            changed = true;
        }
    } else if (sf.toolBar.redoButton.isEnabled()) {
        sf.toolBar.redoButton.disable();
        changed = true;
    }

    // both buttons should always be visible
    if (!sf.toolBar.undoButton.isVisible || !sf.toolBar.redoButton.isVisible) {
        sf.toolBar.undoButton.show();
        sf.toolBar.redoButton.show();
        changed = true;
    }

    if (changed || !sf.toolBar.isVisible) {
        sf.toolBar.isVisible = true;
        sf.toolBar.fixLayout();
    }

    sf.adjustToolBar();
};

ScriptsMorph.prototype.hideToolbar = function () {
    var sf = this.parentThatIsA(ScrollFrameMorph);
    if (!sf) {return; }

    if (sf.toolBar) {
        sf.toolBar.isVisible = false;
        sf.toolBar.changed();
    }
};

// ScriptsMorph sorting blocks and comments

ScriptsMorph.prototype.sortedElements = function () {
    // return all scripts and unattached comments
    var scripts = this.children.filter(each =>
        each instanceof CommentMorph ? !each.block : true
    );
    scripts.sort((a, b) =>
        // make sure the prototype hat block always stays on top
        a instanceof PrototypeHatBlockMorph ? 0 : a.top() - b.top()
    );
    return scripts;
};

// ScriptsMorph blocks layout fix

ScriptsMorph.prototype.fixMultiArgs = function () {
    this.forAllChildren(morph => {
        if (morph instanceof MultiArgMorph) {
            morph.fixLayout();
        }
    });
};

// ScriptsMorph drag & drop:

ScriptsMorph.prototype.wantsDropOf = function (aMorph) {
    // override the inherited method
    if (aMorph instanceof HatBlockMorph) {
        return !this.rejectsHats;
    }
    return aMorph instanceof SyntaxElementMorph ||
        aMorph instanceof CommentMorph;
};

ScriptsMorph.prototype.reactToDropOf = function (droppedMorph, hand) {
    if (droppedMorph instanceof BlockMorph ||
            droppedMorph instanceof CommentMorph) {

        const target = droppedMorph.snapTarget(hand);
        if (target) {  // moveBlock
            this.moveBlock(droppedMorph, target, hand);
        } else if (!droppedMorph.id) {  // addBlock
            this.addBlock(droppedMorph);
        } else if (hand) {  // change position
            this.setBlockPosition(droppedMorph, hand);
        }
    }
    this.adjustBounds();
};

ScriptsMorph.prototype.moveBlock = function (block, target, hand) {
    var origin = hand && hand.grabOrigin.origin,
        position = origin && hand.grabOrigin.position.add(origin.position()),
        isMovingBtwnEditors = origin !== this && origin instanceof ScriptsMorph;

    if (isMovingBtwnEditors) {  // moving between open editors
        const dup = block.fullCopy();

        if (SnapActions.isCollaborating()) {
            // only revert if collaborating - ow, this can't fail!
            block.setPosition(position);
        }

        // copy the blocks and add them to the new editor
        dup.id = null;
        hand.grabOrigin.origin.add(block);
        return SnapActions.moveBlock(dup, target, position)
            // if that succeeds, remove them from the current editor
            .then(function() {
                block.setPosition(position);
                return SnapActions.removeBlock(block);
            });
    } else {  // basic moveBlock
        position = origin instanceof ScriptsMorph ? position : null;
        SnapActions.moveBlock(block, target, position);
    }
};

ScriptsMorph.prototype.addBlock = function (block) {
    const target = this.parentThatIsA(BlockEditorMorph) ||
        this.scriptTarget();
    SnapActions.addBlock(block, target, block.position());
    block.destroy();
};

ScriptsMorph.prototype.setBlockPosition = function (block, hand) {
    var position = block.position(),
        originPosition,
        revertPosition;

    originPosition = hand.grabOrigin.position.add(hand.grabOrigin.origin.position());
    revertPosition = function() {
        block.setPosition(originPosition);
    };

    if (hand) {
        const originScripts = hand.grabOrigin.origin.parentThatIsA(ScriptsMorph);
        if (originScripts !== this) {  // move between scripts morph
            originScripts.add(block);

            // copy the blocks and add them to the new editor
            const dup = block.fullCopy();

            const target = this.parentThatIsA(BlockEditorMorph) ||
                this.scriptTarget();
            return SnapActions.addBlock(dup, target, position)
                // if that succeeds, remove them from the current editor
                .then(function() {
                    return SnapActions.removeBlock(block);
                });
        } else if (SnapActions.isReadOnly()) {
            revertPosition();
        }
    }

    return SnapActions.setBlockPosition(block, position)
        .catch(revertPosition);
};

// ScriptsMorph events

ScriptsMorph.prototype.mouseClickLeft = function (pos) {
    var shiftClicked = this.world().currentKey === 16;
    if (shiftClicked) {
        return this.edit(pos);
    }
    if (this.focus) {this.focus.stopEditing(); }
    this.escalateEvent('mouseClickLeft', pos);
};

ScriptsMorph.prototype.selectForEdit = function () {
    var ide = this.parentThatIsA(IDE_Morph),
        rcvr = ide ? ide.currentSprite : null;
    if (rcvr && rcvr.inheritsAttribute('scripts')) {
        // copy on write:
        this.feedbackMorph.destroy();
        rcvr.shadowAttribute('scripts');
        return rcvr.scripts;
    }
    return this;
};

// ScriptsMorph keyboard support

ScriptsMorph.prototype.edit = function (pos) {
    var target,
		world = this.world();
    if (this.focus) {this.focus.stopEditing(); }
    world.stopEditing();
    if (!ScriptsMorph.prototype.enableKeyboard) {return; }
    target = this.selectForEdit(); // enable copy-on-edit
    target.focus = new ScriptFocusMorph(target, target, pos);
    target.focus.getFocus(world);
};

ScriptsMorph.prototype.toggleKeyboardEntry = function () {
	// when the user clicks the keyboard button in the toolbar
    var target, sorted,
        world = this.world();
    if (this.focus) {
    	this.focus.stopEditing();
        return;
    }
    world.stopEditing();
    if (!ScriptsMorph.prototype.enableKeyboard) {return; }
    target = this.selectForEdit(); // enable copy-on-edit
    target.focus = new ScriptFocusMorph(target, target, target.position());
    target.focus.getFocus(world);
    sorted = target.focus.sortedScripts();
    if (sorted.length) {
        target.focus.element = sorted[0];
        if (target.focus.element instanceof HatBlockMorph) {
            target.focus.nextCommand();
        }
    } else {
        target.focus.moveBy(new Point(50, 50));
    }
    target.focus.fixLayout();
};

// ScriptsMorph context - scripts target

ScriptsMorph.prototype.scriptTarget = function () {
    // answer the sprite or stage that this script editor acts on,
    // if the user clicks on a block.
    // NOTE: since scripts can be shared by more than a single sprite
    // this method only gives the desired result within the context of
    // the user actively clicking on a block inside the IDE
    // there is no direct relationship between a block or a scripts editor
    //  and a sprite.
    var editor = this.parentThatIsA(IDE_Morph);
    if (editor) {
        return editor.currentSprite;
    }
    editor = this.parentThatIsA(BlockEditorMorph);
    if (editor) {
        return editor.target;
    }
    throw new Error('script target cannot be found for orphaned scripts');
};


// ArgMorph //////////////////////////////////////////////////////////

/*
    I am a syntax element and the ancestor of all block inputs.
    I am present in block labels.
    Usually I am just a receptacle for inherited methods and attributes,
    however, if my 'type' attribute is set to one of the following
    values, I act as an iconic slot myself:

        'list'      - a list symbol
        'object'    - a turtle symbol
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
    this.icon = null;
    ArgMorph.uber.init.call(this);
    this.color = new Color(0, 17, 173);
    this.createIcon();
    if (type === 'list') {
        this.alpha = 1;
    }
};

// ArgMorph preferences settings:

ArgMorph.prototype.executeOnSliderEdit = false;

// ArgMorph events:

ArgMorph.prototype.reactToSliderEdit = function () {
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
        receiver = top.scriptTarget();
        if (top instanceof PrototypeHatBlockMorph) {
            return;
        }
        if (receiver) {
            stage = receiver.parentThatIsA(StageMorph);
            if (stage && (stage.isThreadSafe ||
                    Process.prototype.enableSingleStepping)) {
                stage.threads.startProcess(top, receiver, stage.isThreadSafe);
            } else {
                top.mouseClickLeft();
            }
        }
    }
};

// ArgMorph drag & drop: for demo puposes only

ArgMorph.prototype.justDropped = function () {
    if (!(this instanceof CommandSlotMorph)) {
        this.fixLayout();
        this.rerender();
    }
};

// ArgMorph spec extrapolation (for demo purposes)

ArgMorph.prototype.getSpec = function () {
    return '%s'; // default
};

// ArgMorph drawing

ArgMorph.prototype.createIcon = function () {
    switch (this.type) {
    case 'list':
        this.icon = this.labelPart('%list');
        this.add(this.icon);
        break;
    case 'object':
        this.icon = this.labelPart('%turtle');
        this.add(this.icon);
        break;
    default:
        nop(); // no icon
    }
};

ArgMorph.prototype.fixLayout = function () {
    if (this.icon) {
        this.icon.setPosition(this.position());
        this.bounds.setExtent(this.icon.extent());
    } else {
        ArgMorph.uber.fixLayout.call(this);
    }
};

ArgMorph.prototype.render = function (ctx) {
    // make sure my icon's shadow color matches my block's color
    var block;
    if (this.icon) {
        block = this.parentThatIsA(BlockMorph);
        if (block) {
            this.icon.shadowColor = block.color.darker(this.labelContrast);
        }
        switch (this.type) {
        case 'list':
            this.color = new Color(255, 140, 0); // list color
            break;
        default:
            return; // don't draw anything except the icon
        }
    }
    ArgMorph.uber.render.call(this, ctx);
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
    this.setExtent(
        new Point(230, this.corner * 4 + this.cSlotPadding)
    );
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
            child => child instanceof CommandBlockMorph
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
        this.bounds.setWidth(nb.fullBounds().width()
            + (this.edge + this.rfBorder) * 2
            );
        this.bounds.setHeight(nb.fullBounds().height()
            + this.edge + (this.rfBorder * 2) - (this.corner - this.edge)
            );
    } else {
        this.bounds.setHeight(this.corner * 4);
        this.bounds.setWidth(
            this.corner * 4
                + this.inset
                + this.dent
        );
    }
    if (this.parent && this.parent.fixLayout) {
        this.parent.fixLayout();
    }
};

// CommandSlotMorph evaluating:

CommandSlotMorph.prototype.evaluate = function () {
    return this.nestedBlock();
};

CommandSlotMorph.prototype.isEmptySlot = function () {
    return !this.isStatic && (this.nestedBlock() === null);
};

// CommandSlotMorph context menu ops

CommandSlotMorph.prototype.attach = function () {
    // for context menu demo and testing purposes
    // override inherited version to adjust new owner's layout
    var choices = this.overlappedMorphs(),
        menu = new MenuMorph(this, 'choose new parent:');

    choices.forEach(each =>
        menu.addItem(
            each.toString().slice(0, 50),
            () => {
                each.add(this);
                this.isDraggable = false;
                if (each.fixLayout) {
                    each.fixLayout();
                }
            }
        )
    );
    if (choices.length > 0) {
        menu.popUpAtHand(this.world());
    }
};

// CommandSlotMorph drawing:

CommandSlotMorph.prototype.render = function (ctx) {
    this.cachedClr = this.color.toString();
    this.cachedClrBright = this.bright();
    this.cachedClrDark = this.dark();
    ctx.fillStyle = this.cachedClr;
    ctx.fillRect(0, 0, this.width(), this.height());

    // draw the 'flat' shape:
    ctx.fillStyle = this.rfColor.toString();
    this.drawFlat(ctx);

    if (MorphicPreferences.isFlat) {return; }

    // add 3D-Effect:
    this.drawEdges(ctx);
};

CommandSlotMorph.prototype.drawFlat = function (ctx) {
    var isFilled = this.nestedBlock() !== null,
        ins = (isFilled ? this.inset : this.inset / 2),
        dent = (isFilled ? this.dent : this.dent / 2),
        indent = this.corner * 2 + ins,
        edge = this.edge,
        rf = (isFilled ? this.rfBorder : 0),
        y = this.height() - this.corner - edge;

    ctx.beginPath();

    // top left:
    ctx.arc(
        this.corner + edge,
        this.corner + edge,
        this.corner,
        radians(-180),
        radians(-90),
        false
    );

    // dent:
    ctx.lineTo(this.corner + ins + edge + rf * 2, edge);
    ctx.lineTo(indent + edge + rf * 2, this.corner + edge);
    ctx.lineTo(
        indent + edge  + rf * 2 + (dent - rf * 2),
        this.corner + edge
    );
    ctx.lineTo(
        indent + edge  + rf * 2 + (dent - rf * 2) + this.corner,
        edge
    );
    ctx.lineTo(this.width() - this.corner - edge, edge);

    // top right:
    ctx.arc(
        this.width() - this.corner - edge,
        this.corner + edge,
        this.corner,
        radians(-90),
        radians(-0),
        false
    );

    // bottom right:
    ctx.arc(
        this.width() - this.corner - edge,
        y,
        this.corner,
        radians(0),
        radians(90),
        false
    );

    // bottom left:
    ctx.arc(
        this.corner + edge,
        y,
        this.corner,
        radians(90),
        radians(180),
        false
    );

    ctx.closePath();
    ctx.fill();

};

CommandSlotMorph.prototype.drawEdges = function (ctx) {
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

    ctx.lineWidth = this.edge;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';


    // bright:
    // bottom horizontal line
    gradient = ctx.createLinearGradient(
        0,
        this.height(),
        0,
        this.height() - this.edge
    );
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrBright);

    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(this.corner + edge, this.height() - shift);
    ctx.lineTo(
        this.width() - this.corner - edge,
        this.height() - shift
    );
    ctx.stroke();

    // bottom right corner
    gradient = ctx.createRadialGradient(
        this.width() - (this.corner + edge),
        this.height() - (this.corner + edge),
        this.corner,
        this.width() - (this.corner + edge),
        this.height() - (this.corner + edge),
        this.corner + edge
    );
    gradient.addColorStop(0, this.cachedClrBright);
    gradient.addColorStop(1, this.cachedClr);

    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.arc(
        this.width() - (this.corner + edge),
        this.height() - (this.corner + edge),
        this.corner + shift,
        radians(0),
        radians(90),
        false
    );
    ctx.stroke();

    // right vertical line
    gradient = ctx.createLinearGradient(
        this.width(),
        0,
        this.width() - this.edge,
        0
    );
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrBright);

    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(
        this.width() - shift,
        this.height() - this.corner - this.edge
    );
    ctx.lineTo(this.width() - shift, edge + this.corner);
    ctx.stroke();

    ctx.shadowOffsetY = shift;
    ctx.shadowBlur = this.edge;
    ctx.shadowColor = this.rfColor.darker(80).toString();

    // left vertical side
    gradient = ctx.createLinearGradient(
        0,
        0,
        edge,
        0
    );
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrDark);

    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(shift, edge + this.corner);
    ctx.lineTo(shift, this.height() - edge - this.corner);
    ctx.stroke();

    // upper left corner
    gradient = ctx.createRadialGradient(
        this.corner + edge,
        this.corner + edge,
        this.corner,
        this.corner + edge,
        this.corner + edge,
        this.corner + edge
    );
    gradient.addColorStop(0, this.cachedClrDark);
    gradient.addColorStop(1, this.cachedClr);

    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.arc(
        this.corner + edge,
        this.corner + edge,
        this.corner + shift,
        radians(-180),
        radians(-90),
        false
    );
    ctx.stroke();

    // upper edge (left side)
    upperGradient = ctx.createLinearGradient(
        0,
        0,
        0,
        this.edge
    );
    upperGradient.addColorStop(0, this.cachedClr);
    upperGradient.addColorStop(1, this.cachedClrDark);

    ctx.strokeStyle = upperGradient;
    ctx.beginPath();
    ctx.moveTo(this.corner + edge, shift);
    ctx.lineTo(
        this.corner + ins + edge + rf * 2 - shift,
        shift
    );
    ctx.stroke();

    // dent bottom
    lowerGradient = ctx.createLinearGradient(
        0,
        this.corner,
        0,
        this.corner + edge
    );
    lowerGradient.addColorStop(0, this.cachedClr);
    lowerGradient.addColorStop(1, this.cachedClrDark);

    ctx.strokeStyle = lowerGradient;
    ctx.beginPath();
    ctx.moveTo(indent + edge + rf * 2 + shift, this.corner + shift);
    ctx.lineTo(
        indent + edge  + rf * 2 + (dent - rf * 2),
        this.corner + shift
    );
    ctx.stroke();

    // dent right edge
    rightGradient = ctx.createLinearGradient(
        indent + edge  + rf * 2 + (dent - rf * 2) - shift,
        this.corner,
        indent + edge  + rf * 2 + (dent - rf * 2) + shift * 0.7,
        this.corner + shift + shift * 0.7
    );
    rightGradient.addColorStop(0, this.cachedClr);
    rightGradient.addColorStop(1, this.cachedClrDark);

    ctx.strokeStyle = rightGradient;
    ctx.beginPath();
    ctx.moveTo(
        indent + edge  + rf * 2 + (dent - rf * 2),
        this.corner + shift
    );
    ctx.lineTo(
        indent + edge  + rf * 2 + (dent - rf * 2) + this.corner,
        shift
    );
    ctx.stroke();

    // upper edge (right side)
    ctx.strokeStyle = upperGradient;
    ctx.beginPath();
    ctx.moveTo(
        indent + edge  + rf * 2 + (dent - rf * 2) + this.corner,
        shift
    );
    ctx.lineTo(this.width() - this.corner - edge, shift);
    ctx.stroke();
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
    this.color = new Color(0, 17, 173);
    this.contrast = RingMorph.prototype.contrast;
};

RingCommandSlotMorph.prototype.getSpec = function () {
    return '%rc';
};

// RingCommandSlotMorph drawing:

RingCommandSlotMorph.prototype.render = function (ctx) {
    if (MorphicPreferences.isFlat) {return; }

    // init
    this.cachedClr = this.color.toString();
    this.cachedClrBright = this.bright();
    this.cachedClrDark = this.dark();
    ctx.fillStyle = this.cachedClr;

    // only add 3D-Effect here, rendering of the flat shape happens at the
    // encompassing block level
    this.drawEdges(ctx);
};

RingCommandSlotMorph.prototype.outlinePath = function (ctx, offset) {
    var ox = offset.x,
        oy = offset.y,
        isFilled = this.nestedBlock() !== null,
        ins = (isFilled ? this.inset : this.inset / 2),
        dent = (isFilled ? this.dent : this.dent / 2),
        indent = this.corner * 2 + ins,
        edge = this.edge,
        w = this.width(),
        h = this.height(),
        rf = (isFilled ? this.rfBorder : 0),
        y = h - this.corner - edge;

    // top left:
    ctx.arc(
        this.corner + edge + ox,
        this.corner + edge + oy,
        this.corner,
        radians(-180),
        radians(-90),
        false
    );

    // dent:
    ctx.lineTo(this.corner + ins + edge + rf * 2 + ox, edge + oy);
    ctx.lineTo(indent + edge + rf * 2 + ox, this.corner + edge + oy);
    ctx.lineTo(
        indent + edge  + rf * 2 + (dent - rf * 2) + ox,
        this.corner + edge + oy
    );
    ctx.lineTo(
        indent + edge  + rf * 2 + (dent - rf * 2) + this.corner + ox,
        edge + oy
    );
    ctx.lineTo(this.width() - this.corner - edge + ox, edge + oy);

    // top right:
    ctx.arc(
        w - this.corner - edge + ox,
        this.corner + edge + oy,
        this.corner,
        radians(-90),
        radians(-0),
        false
    );

    // bottom right:
    ctx.arc(
        this.width() - this.corner - edge + ox,
        y + oy,
        this.corner,
        radians(0),
        radians(90),
        false
    );

    // bottom left:
    ctx.arc(
        this.corner + edge + ox,
        y + oy,
        this.corner,
        radians(90),
        radians(180),
        false
    );

    // close the path, so we can clip it:
    ctx.lineTo(
        this.corner + edge + ox - this.corner, // this needs to be adjusted
        this.corner + edge + oy
    );

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
    this.isLambda = false; // see Process.prototype.evaluateInput
    this.isLoop = false; // has a loop arrow symbol
    this.color = new Color(0, 17, 173);
    this.setExtent(new Point(230, this.corner * 4 + this.cSlotPadding));
};

CSlotMorph.prototype.getSpec = function () {
    return this.isLoop? '%loop' : '%c';
};

CSlotMorph.prototype.mappedCode = function (definitions) {
    var code = StageMorph.prototype.codeMappings.reify || '<#1>',
        codeLines = code.split('\n'),
        nested = this.nestedBlock(),
        part = nested ? nested.mappedCode(definitions) : '',
        partLines = (part.toString()).split('\n'),
        rx = new RegExp('<#1>', 'g');

    codeLines.forEach((codeLine, idx) => {
        var prefix = '',
            indent;
        if (codeLine.trimLeft().indexOf('<#1>') === 0) {
            indent = codeLine.indexOf('<#1>');
            prefix = codeLine.slice(0, indent);
        }
        codeLines[idx] = codeLine.replace(
            new RegExp('<#1>'),
            partLines.join('\n' + prefix)
        );
        codeLines[idx] = codeLines[idx].replace(rx, partLines.join('\n'));
    });

    return codeLines.join('\n');
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
        this.bounds.setHeight(nb.fullBounds().height() + this.corner);
        this.bounds. setWidth(
            nb.fullBounds().width() + (this.cSlotPadding * 2)
        );
    } else {
        this.bounds.setHeight(this.corner * 4  + this.cSlotPadding); // default
        this.bounds.setWidth(
            this.corner * 4
                + (this.inset * 2)
                + this.dent
                + (this.cSlotPadding * 2)
        );
    }

    if (this.parent && this.parent.fixLayout) {
        this.parent.fixLayout();
    }
};

CSlotMorph.prototype.fixLoopLayout = function () {
    var loop;
    if (this.isLoop) {
        loop = this.loop();
        if (loop) {
            loop.setRight(this.right() - this.corner);
            loop.setBottom(this.bottom() + this.cSlotPadding + this.edge);
        }
    }
};

CSlotMorph.prototype.loop = function () {
    if (this.isLoop) {
        return detect(
            this.children,
            child => child instanceof SymbolMorph
        );
    }
    return null;
};

CSlotMorph.prototype.fixHolesLayout = function () {
    this.holes = [
        new Rectangle(
            this.inset,
            this.corner,
            this.width(),
            this.height() - this.corner
        )
    ];
};

CSlotMorph.prototype.isLocked = function () {
    return this.isStatic || this.parent instanceof MultiArgMorph;
};

// CSlotMorph drawing:

CSlotMorph.prototype.render = function (ctx) {
    if (MorphicPreferences.isFlat) {return; }

    // init
    this.cachedClr = this.color.toString();
    this.cachedClrBright = this.bright();
    this.cachedClrDark = this.dark();
    ctx.fillStyle = this.cachedClr;

    // only add 3D-Effect here, rendering of the flat shape happens at the
    // encompassing block level
    this.drawTopRightEdge(ctx);
    this.drawTopEdge(ctx, this.inset, this.corner);
    this.drawTopLeftEdge(ctx);
    this.drawBottomEdge(ctx);
    this.drawRightEdge(ctx);
};

CSlotMorph.prototype.outlinePath = function (ctx, inset, offset) {
    var ox = offset.x,
        oy = offset.y,
        radius = Math.max(this.corner - inset, 0);

    // top corner:
    ctx.lineTo(this.width() + ox - inset, oy);

    // top right:
    ctx.arc(
        this.width() - this.corner + ox,
        oy,
        radius,
        radians(90),
        radians(0),
        true
    );

    // jigsaw shape:
    ctx.lineTo(
        this.width() - this.corner + ox,
        this.corner + oy - inset
    );
    ctx.lineTo(
        (this.inset * 2) + (this.corner * 3) + this.dent + ox,
        this.corner + oy - inset
    );
    ctx.lineTo(
        (this.inset * 2) + (this.corner * 2) + this.dent + ox,
        this.corner * 2 + oy - inset
    );
    ctx.lineTo(
        (this.inset * 2) + (this.corner * 2) + ox,
        this.corner * 2 + oy - inset
    );
    ctx.lineTo(
        (this.inset * 2) + this.corner + ox,
        this.corner + oy - inset
    );
    ctx.lineTo(
        this.inset + this.corner + ox,
        this.corner + oy - inset
    );
    ctx.arc(
        this.inset + this.corner + ox,
        this.corner * 2 + oy,
        this.corner + inset,
        radians(270),
        radians(180),
        true
    );

    // bottom:
    ctx.lineTo(
        this.inset + ox - inset,
        this.height() - (this.corner * 2) + oy
    );
    ctx.arc(
        this.inset + this.corner  + ox,
        this.height() - (this.corner * 2) + oy,
        this.corner + inset,
        radians(180),
        radians(90),
        true
    );
    ctx.lineTo(
        this.width() - this.corner + ox,
        this.height() - this.corner + oy + inset
    );
    ctx.arc(
        this.width() - this.corner + ox,
        this.height() + oy,
        radius,
        radians(-90),
        radians(-0),
        false
    );
};

CSlotMorph.prototype.drawTopRightEdge = function (ctx) {
    var shift = this.edge * 0.5,
        x = this.width() - this.corner,
        y = 0,
        gradient;

    gradient = ctx.createRadialGradient(
        x,
        y,
        this.corner,
        x,
        y,
        this.corner - this.edge
    );
    gradient.addColorStop(0, this.cachedClrDark);
    gradient.addColorStop(1, this.cachedClr);

    ctx.lineWidth = this.edge;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    ctx.strokeStyle = gradient;

    ctx.beginPath();
    ctx.arc(
        x,
        y,
        this.corner - shift,
        radians(90),
        radians(0),
        true
    );
    ctx.stroke();
};

CSlotMorph.prototype.drawTopEdge = function (ctx, x, y) {
    var shift = this.edge * 0.5,
        indent = x + this.corner * 2 + this.inset,
        upperGradient,
        lowerGradient,
        rightGradient;

    ctx.lineWidth = this.edge;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    upperGradient = ctx.createLinearGradient(
        0,
        y - this.edge,
        0,
        y
    );
    upperGradient.addColorStop(0, this.cachedClr);
    upperGradient.addColorStop(1, this.cachedClrDark);

    ctx.strokeStyle = upperGradient;
    ctx.beginPath();
    ctx.moveTo(x + this.corner, y - shift);
    ctx.lineTo(x + this.corner + this.inset - shift, y - shift);
    ctx.stroke();

    lowerGradient = ctx.createLinearGradient(
        0,
        y + this.corner - this.edge,
        0,
        y + this.corner
    );
    lowerGradient.addColorStop(0, this.cachedClr);
    lowerGradient.addColorStop(1, this.cachedClrDark);

    ctx.strokeStyle = lowerGradient;
    ctx.beginPath();
    ctx.moveTo(indent + shift, y + this.corner - shift);
    ctx.lineTo(indent + this.dent, y + this.corner - shift);
    ctx.stroke();

    rightGradient = ctx.createLinearGradient(
        (x + this.inset + (this.corner * 2) + this.dent) - shift,
        (y + this.corner - shift) - shift,
        (x + this.inset + (this.corner * 2) + this.dent) + (shift * 0.7),
        (y + this.corner - shift) + (shift * 0.7)
    );
    rightGradient.addColorStop(0, this.cachedClr);
    rightGradient.addColorStop(1, this.cachedClrDark);


    ctx.strokeStyle = rightGradient;
    ctx.beginPath();
    ctx.moveTo(
        x + this.inset + (this.corner * 2) + this.dent,
        y + this.corner - shift
    );
    ctx.lineTo(
        x + this.corner * 3 + this.inset + this.dent,
        y - shift
    );
    ctx.stroke();

    ctx.strokeStyle = upperGradient;
    ctx.beginPath();
    ctx.moveTo(
        x + this.corner * 3 + this.inset + this.dent,
        y - shift
    );
    ctx.lineTo(this.width() - this.corner, y - shift);
    ctx.stroke();
};

CSlotMorph.prototype.drawTopLeftEdge = function (ctx) {
    var shift = this.edge * 0.5,
        gradient;

    gradient = ctx.createRadialGradient(
        this.corner + this.inset,
        this.corner * 2,
        this.corner,
        this.corner + this.inset,
        this.corner * 2,
        this.corner + this.edge
    );
    gradient.addColorStop(0, this.cachedClrDark);
    gradient.addColorStop(1, this.cachedClr);

    ctx.lineWidth = this.edge;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    ctx.strokeStyle = gradient;

    ctx.beginPath();
    ctx.arc(
        this.corner + this.inset,
        this.corner * 2,
        this.corner + shift,
        radians(-180),
        radians(-90),
        false
    );
    ctx.stroke();
};

CSlotMorph.prototype.drawRightEdge = function (ctx) {
    var shift = this.edge * 0.5,
        x = this.inset,
        gradient;

    gradient = ctx.createLinearGradient(x - this.edge, 0, x, 0);
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrDark);

    ctx.lineWidth = this.edge;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(x - shift, this.corner * 2);
    ctx.lineTo(x - shift, this.height() - this.corner * 2);
    ctx.stroke();
};

CSlotMorph.prototype.drawBottomEdge = function (ctx) {
    var shift = this.edge * 0.5,
        gradient,
        upperGradient;

    ctx.lineWidth = this.edge;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    upperGradient = ctx.createRadialGradient(
        this.corner + this.inset,
        this.height() - (this.corner * 2),
        this.corner, /*- this.edge*/ // uncomment for half-tone
        this.corner + this.inset,
        this.height() - (this.corner * 2),
        this.corner + this.edge
    );
    upperGradient.addColorStop(0, this.cachedClrBright);
    upperGradient.addColorStop(1, this.cachedClr);
    ctx.strokeStyle = upperGradient;
    ctx.beginPath();
    ctx.arc(
        this.corner + this.inset,
        this.height() - (this.corner * 2),
        this.corner + shift,
        radians(180),
        radians(90),
        true
    );
    ctx.stroke();

    gradient = ctx.createLinearGradient(
        0,
        this.height() - this.corner,
        0,
        this.height() - this.corner + this.edge
    );
    gradient.addColorStop(0, this.cachedClrBright);
    gradient.addColorStop(1, this.cachedClr);

    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(
        this.inset + this.corner,
        this.height() - this.corner + shift
    );
    ctx.lineTo(
        this.width() - this.corner,
        this.height() - this.corner + shift
    );

    ctx.stroke();
};

// InputSlotMorph //////////////////////////////////////////////////////

/*
    I am an editable text input slot. I can be either rectangular or
    rounded, and can have an optional drop-down menu. If I'm set to
    read-only I must have a drop-down menu and will assume a darker
    shade of my parent's color.

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
    var contents = new InputSlotStringMorph(''),
        arrow = new ArrowMorph(
            'down',
            0,
            Math.max(Math.floor(this.fontSize / 6), 1),
            BLACK,
            true
        );

    contents.fontSize = this.fontSize;
    contents.isShowingBlanks = true;

	this.selectedBlock = null;

    this.isUnevaluated = false;
    this.choices = choiceDict || null; // object, function or selector
    this.oldContentsExtent = contents.extent();
    this.isNumeric = isNumeric || false;
    this.isReadOnly = isReadOnly || false;
    this.minWidth = 0; // can be chaged for text-type inputs ("landscape")
    this.constant = null;

    InputSlotMorph.uber.init.call(this, null, true);
    this.color = this.overrideWhite || WHITE;
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
        child => child instanceof StringMorph
    );
};

InputSlotMorph.prototype.arrow = function () {
    return detect(
        this.children,
        child => child instanceof ArrowMorph
    );
};

InputSlotMorph.prototype.getConstantDisplayName = function (constant) {
    if (this.choices === 'serviceNames') {
        return constant.split('/').pop();
    }
    return constant;
};

InputSlotMorph.prototype.setContents = function (data) {
	// data can be a String, Float, or "wish" Block
    var cnts = this.contents(),
        dta = data,
        isConstant = dta instanceof Array;

	if (this.selectedBlock) {
   		this.selectedBlock = null;
	}

    if (isConstant) {
        dta = localize(this.getConstantDisplayName(dta[0]));
        cnts.isItalic = !this.isReadOnly;
    } else if (dta instanceof BlockMorph) {
    	this.selectedBlock = dta;
      	dta = ''; // make sure the contents text emptied
    } else { // assume dta is a localizable choice if it's a key in my choices
        cnts.isItalic = false;
        if (!isNil(this.choices) && this.choices[dta] instanceof Array) {
            return this.setContents(this.choices[dta]);
        }
    }
    cnts.text = dta;
    if (isNil(dta)) {
        cnts.text = '';
    } else if (dta.toString) {
        cnts.text = dta.toString();
    }
    if (this.isReadOnly && !MorphicPreferences.isFlat) {
        cnts.shadowOffset = new Point(1, 1); // correct initial dimensions
    }
    cnts.fixLayout();

    // remember the constant, if any
    this.constant = isConstant ? data : null;
    this.lastValue = data;

    // adjust to zebra coloring:
    if (this.isReadOnly && (this.parent instanceof BlockMorph)) {
        this.parent.fixLabelColor();
    }
};

InputSlotMorph.prototype.userSetContents = function (aStringOrFloat) {
    // enable copy-on-edit for inherited scripts
    this.selectForEdit().updateFieldValue(aStringOrFloat);
};

// InputSlotMorph drop-down menu:

InputSlotMorph.prototype.dropDownMenu = async function (enableKeyboard) {
    var position = this.world().hand.position(),
        menu = await this.menuFromDict(this.choices, null, enableKeyboard);
    if (!menu) { // has already happened
        return;
    }

    if (menu.items.length > 0) {
        if (enableKeyboard) {
            menu.popup(this.world(), this.bottomLeft());
            menu.getFocus();
        } else {
            menu.popup(this.world(), position);
        }
    }
};

InputSlotMorph.prototype.menuFromDict = async function (
    choices,
    noEmptyOption,
    enableKeyboard)
{
    var key, dial, flag,
        myself = this,
        menu = new MenuMorph(
            this.userSetContents,
            null,
            this,
            this.fontSize
        );

    function update(num) {
        myself.setContents(num);
        myself.reactToSliderEdit();
    }

    function getImg(block) {
        return () => block.fullImage();
    }

    if (choices instanceof Function) {
        choices = await choices.call(this);
    } else if (isString(choices)) {
        choices = await this[choices](enableKeyboard);
        if (!choices) { // menu has already happened
            return;
        }
    }
    if (!noEmptyOption) {
        menu.addItem(' ', null);
    }
    for (key in choices) {
        if (Object.prototype.hasOwnProperty.call(choices, key)) {
            if (key[0] === '~') {
                menu.addLine();
            } else if (key.indexOf('§_def') === 0) {
                menu.addItem(
                    this.doWithAlpha(1, getImg(choices[key])),
                    choices[key]
                );
            } else if (key.indexOf('§_dir') === 0) {
                dial = new DialMorph();
                dial.rootForGrab = function () {return this; };
                dial.target = this;
                dial.action = update;
                dial.fillColor = this.parent.color;
                dial.setRadius(this.fontSize * 3);
                dial.setValue(+this.evaluate(), false, true);
                menu.addLine();
                menu.items.push(dial);
                menu.addLine();
            } else if (key.indexOf('§_') === 0) {
                // prefixing a key with '§_' only makes the menu item
                // appear when the user holds down the shift-key
                // use with care because mobile devices might only
                // have a "soft" keyboard that isn't always there
                if (this.world().currentKey === 16) { // shift
                    menu.addItem(
                        key.slice(2),
                        choices[key],
                        null, // hint
                        null, // color
                        null, // bold
                        true, // italic
                        null, // doubleClickAction
                        null, // shortcut
                        !(choices[key] instanceof Array) &&
                            typeof choices[key] !== 'function' // verbatim?
                    );
                }
            } else if (key === '__shout__go__') {
                // show the green flag symbol
                flag = new SymbolMorph('flag');
                flag.size = this.fontSize * 1.5;
                flag.setColor(new Color(0, 200, 0));
                flag.fixLayout();
                menu.addItem(flag, ['__shout__go__']);
            } else if (choices[key] instanceof Object &&
                    !(choices[key] instanceof Array) &&
                    (typeof choices[key] !== 'function')) {
                menu.addMenu(
                    key,
                    await this.menuFromDict(choices[key], true),
                    null,  // indicator
                    true   // verbatim? - don't translate
                );
            } else if (choices[key] instanceof Array &&
                    choices[key][0] instanceof Object &&
                    typeof choices[key][0] !== 'function') {
                menu.addMenu(
                    key,
                    await this.menuFromDict(choices[key][0], true),
                    null,  // indicator
                    false  // verbatim? - do translate, if inside an array
                );
            } else {
                menu.addItem(
                    key,
                    choices[key],
                    null, // hint
                    null, // color
                    null, // bold
                    null, // italic
                    null, // doubleClickAction
                    null, // shortcut
                    !(choices[key] instanceof Array) &&
                        typeof choices[key] !== 'function' // verbatim?
                );
            }
        }
    }
    return menu;
};

InputSlotMorph.prototype.messageTypesMenu = function() {
    var rcvr = this.parentThatIsA(BlockMorph).scriptTarget(),
        stage = rcvr.parentThatIsA(StageMorph),
        names = stage.messageTypes.names(),
        dict = {};

    for (var i = names.length; i--;) {
        dict[names[i]] = names[i];
    }
    return dict;
};

InputSlotMorph.prototype.messageTypes = function () {
    var stage = this.parentThatIsA(IDE_Morph).stage,
        msgTypes = stage.messageTypes.names(),
        dict = {};

    for (var i = msgTypes.length; i--;) {
        dict[msgTypes[i]] = msgTypes[i];
    }

    return dict;
};

InputSlotMorph.prototype.roleNames = function () {
    var ide = this.root().children[0],
        roles = ide.room.getRoleNames(),
        dict = {};

    for (var i = roles.length; i--;) {
        if (ide.projectName !== roles[i]) {  // project name is roleid
            dict[roles[i]] = roles[i];
        }
    }

    dict['others in room'] = ['others in room'];
    dict['everyone in room'] = ['everyone in room'];
    return dict;
};

// IDE_Morph is not always accessible. quick fix => add getURL to
// InputSlotMorph
InputSlotMorph.prototype.getURL = function (url) {
    try {
        return utils.getUrlSync(url);
    } catch (err) {
        return '';
    }
};

InputSlotMorph.prototype.rpcActions = function () {
    var field = this.parent.inputs()[0],
        dict = {},
        actions,
        rpc;

    // assume that the rpc name is the first field
    if (field) {
        rpc = field.evaluate();
    }

    if (rpc) {
        actions = Object.keys(JSON.parse(this.getURL('/rpc/' + rpc)));
        for (var i = actions.length; i--;) {
            dict[actions[i]] = actions[i];
        }
    }

    return dict;
};
InputSlotMorph.prototype.messagesMenu = function () {
    var dict = {},
        rcvr = this.parentThatIsA(BlockMorph).scriptTarget(),
        stage = rcvr.parentThatIsA(StageMorph),
        allNames = [];

    stage.children.concat(stage).forEach(morph => {
        if (isSnapObject(morph)) {
            allNames = allNames.concat(morph.allMessageNames());
        }
    });
    allNames.sort().forEach(name =>
        dict[name] = name
    );
    if (this.world().currentKey === 16) { // shift
        dict.__shout__go__ = ['__shout__go__'];
    }
    if (allNames.length > 0) {
        dict['~'] = null;
    }
    dict['new...'] = () =>
        new DialogBoxMorph(
            this,
            this.updateFieldValue,
            this
        ).prompt(
            'Message name',
            null,
            this.world()
        );
    return dict;
};

InputSlotMorph.prototype.messagesReceivedMenu = function () {
    var dict = {'any message': ['any message']},
        rcvr = this.parentThatIsA(BlockMorph).scriptTarget(),
        stage = rcvr.parentThatIsA(StageMorph),
        allNames = [];

    stage.children.concat(stage).forEach(morph => {
        if (isSnapObject(morph)) {
            allNames = allNames.concat(morph.allMessageNames());
        }
    });
    allNames.sort().forEach(name => {
        if (name !== '__shout__go__') {
            dict[name] = name;
        }
    });
    dict['~'] = null;
    dict['new...'] = () =>
        new DialogBoxMorph(
            this,
            this.updateFieldValue,
            this
        ).prompt(
            'Message name',
            null,
            this.world()
        );
    return dict;
};

InputSlotMorph.prototype.collidablesMenu = function () {
    var dict = {
            'mouse-pointer' : ['mouse-pointer'],
            edge : ['edge'],
            'pen trails' : ['pen trails']
        },
        rcvr = this.parentThatIsA(BlockMorph).scriptTarget(),
        stage = rcvr.parentThatIsA(StageMorph),
        allNames = [];

    stage.children.forEach(morph => {
        if (morph instanceof SpriteMorph && !morph.isTemporary) {
            if (morph.name !== rcvr.name) {
                allNames = allNames.concat(morph.name);
            }
        }
    });
    if (allNames.length > 0) {
        dict['~'] = null;
        allNames.forEach(name =>
            dict[name] = name
        );
    }
    return dict;
};

InputSlotMorph.prototype.locationMenu = function () {
    var dict = {
            'mouse-pointer' : ['mouse-pointer'],
            'myself' : ['myself']
        },
        rcvr = this.parentThatIsA(BlockMorph).scriptTarget(),
        stage = rcvr.parentThatIsA(StageMorph),
        allNames = [];

    stage.children.forEach(morph => {
        if (morph instanceof SpriteMorph && !morph.isTemporary) {
            if (morph.name !== rcvr.name) {
                allNames = allNames.concat(morph.name);
            }
        }
    });
    if (allNames.length > 0) {
        dict['~'] = null;
        allNames.forEach(name =>
            dict[name] = name
        );
    }
    return dict;
};

InputSlotMorph.prototype.distancesMenu = function () {
	var block = this.parentThatIsA(BlockMorph),
        dict = {},
        rcvr = this.parentThatIsA(BlockMorph).scriptTarget(),
        stage = rcvr.parentThatIsA(StageMorph),
        allNames = [];

	if (block && (block.selector !== 'reportRelationTo')) {
	    dict['random position'] = ['random position'];
 	}
	dict['mouse-pointer'] = ['mouse-pointer'];
    dict.center = ['center'];

    stage.children.forEach(morph => {
        if (morph instanceof SpriteMorph && !morph.isTemporary) {
            if (morph.name !== rcvr.name) {
                allNames = allNames.concat(morph.name);
            }
        }
    });
    if (allNames.length > 0) {
        dict['~'] = null;
        allNames.forEach(name =>
            dict[name] = name
        );
    }
    return dict;
};

InputSlotMorph.prototype.clonablesMenu = function () {
    var dict = {},
        rcvr = this.parentThatIsA(BlockMorph).scriptTarget(),
        stage = rcvr.parentThatIsA(StageMorph),
        allNames = [];

    if (rcvr instanceof SpriteMorph) {
        dict.myself = ['myself'];
    }
    stage.children.forEach(morph => {
        if (morph instanceof SpriteMorph && !morph.isTemporary) {
            allNames = allNames.concat(morph.name);
        }
    });
    if (allNames.length > 0) {
        dict['~'] = null;
        allNames.forEach(name =>
            dict[name] = name
        );
    }
    return dict;
};

InputSlotMorph.prototype.objectsMenuWithSelf = function () {
    return this.objectsMenu(true);
};

InputSlotMorph.prototype.objectsMenu = function (includeMyself) {
    var rcvr = this.parentThatIsA(BlockMorph).scriptTarget(),
        stage = rcvr.parentThatIsA(StageMorph),
        dict = {},
        allNames = [];

    if (includeMyself) {
        dict.myself = ['myself'];
    }
    dict[stage.name] = stage.name;
    stage.children.forEach(morph => {
        if (morph instanceof SpriteMorph && !morph.isTemporary) {
            allNames.push(morph.name);
        }
    });
    if (allNames.length > 0) {
        dict['~'] = null;
        allNames.forEach(name =>
            dict[name] = name
        );
    }
    return dict;
};

InputSlotMorph.prototype.typesMenu = function () {
    var dict = {
        number : ['number'],
        text : ['text'],
        Boolean : ['Boolean'],
        list : ['list']
    };
    if (SpriteMorph.prototype.enableFirstClass) {
        dict.sprite = ['sprite'];
    }
    dict.costume = ['costume'];
    dict.sound = ['sound'];
    dict.command = ['command'];
    dict.reporter = ['reporter'];
    dict.predicate = ['predicate'];
    return dict;
};

InputSlotMorph.prototype.gettablesMenu = function () {
    var dict = {},
        nest = SpriteMorph.prototype.enableNesting,
        oop = StageMorph.prototype.enableInheritance;

    dict.neighbors = ['neighbors'];
    dict.self = ['self'];
    dict['other sprites'] = ['other sprites'];
    dict.clones = ['clones'];
    dict['other clones'] = ['other clones'];
    if (nest) {
        dict.parts = ['parts'];
        dict.anchor = ['anchor'];
    }
    dict.stage = ['stage'];
    if (oop) {
        dict.children = ['children'];
        dict.parent = ['parent'];
        dict['temporary?'] = ['temporary?'];
    }
    dict.name = ['name'];
    dict.costume = ['costume'];
    dict.costumes = ['costumes'];
    dict.sounds = ['sounds'];
    dict['dangling?'] = ['dangling?'];
    dict['draggable?'] = ['draggable?'];
    dict.width = ['width'];
    dict.height = ['height'];
    dict.left = ['left'];
    dict.right = ['right'];
    dict.top = ['top'];
    dict.bottom = ['bottom'];
    dict['rotation style'] = ['rotation style'];
    dict['rotation x'] = ['rotation x'];
    dict['rotation y'] = ['rotation y'];
    dict['center x'] = ['center x'];
    dict['center y'] = ['center y'];
    return dict;
};

InputSlotMorph.prototype.attributesMenu = function () {
    var block = this.parentThatIsA(BlockMorph),
        objName = block.inputs()[1].evaluate(),
        rcvr = block.scriptTarget(),
        stage = rcvr.parentThatIsA(StageMorph),
        obj,
        dict = {},
        varNames = [];

    if (objName === stage.name) {
        obj = stage;
    } else {
        obj = detect(
            stage.children,
            morph => morph.name === objName
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
            'size' : ['size'],
            'width': ['width'],
            'height': ['height'],
            'left' : ['left'],
            'right' : ['right'],
            'top' : ['top'],
            'bottom' : ['bottom'],
            'volume' : ['volume'],
            'balance' : ['balance']
        };
    } else { // the stage
        dict = {
            'costume #' : ['costume #'],
            'costume name' : ['costume name'],
            'volume' : ['volume'],
            'balance' : ['balance'],
            'width': ['width'],
            'height': ['height'],
            'left' : ['left'],
            'right' : ['right'],
            'top' : ['top'],
            'bottom' : ['bottom']
        };
    }
    varNames = obj.variables.names();
    if (varNames.length > 0) {
        dict['~'] = null;
        varNames.forEach(name =>
            dict[name] = name
        );
    }
    obj.allBlocks(true).forEach((def, i) =>
        dict['§_def' + i] = def.blockInstance(true) // include translations
    );
    return dict;
};

InputSlotMorph.prototype.costumesMenu = function () {
    var block = this.parentThatIsA(BlockMorph),
        rcvr = block.scriptTarget(),
        dict,
        allNames = [];
    if (rcvr instanceof SpriteMorph) {
        dict = {Turtle : ['Turtle']};
    } else { // stage
        dict = {Empty : ['Empty']};
    }
    if (block.selector !== 'doSwitchToCostume') {
        dict.current = ['current'];
    }
    rcvr.costumes.asArray().forEach(costume =>
        allNames = allNames.concat(costume.name)
    );
    if (allNames.length > 0) {
        dict['~'] = null;
        allNames.forEach(name =>
            dict[name] = name
        );
    }
    return dict;
};

InputSlotMorph.prototype.soundsMenu = function () {
    var rcvr = this.parentThatIsA(BlockMorph).scriptTarget(),
        allNames = [],
        dict = {};

    rcvr.sounds.asArray().forEach(sound =>
        allNames = allNames.concat(sound.name)
    );
    if (allNames.length > 0) {
        allNames.sort().forEach(name =>
            dict[name] = name
        );
    }
    return dict;
};

InputSlotMorph.prototype.shadowedVariablesMenu = function () {
    var block = this.parentThatIsA(BlockMorph),
        vars,
        attribs,
        rcvr,
        dict = {};

    if (!block) {return dict; }
    rcvr = block.scriptTarget();
    if (this.parentThatIsA(RingMorph) ||
            this.topBlock().selector === 'receiveOnClone') {
    	// show own local vars and attributes, because this is likely to be
     	// inside TELL, ASK or OF or when initializing a new clone
        vars = rcvr.variables.names();
        vars.forEach(name =>
            dict[name] = name
        );
        attribs = rcvr.attributes;
        /*
        if (vars.length && attribs.length) {
            dict['~'] = null; // add line
        }
        */
        attribs.forEach(name =>
            dict[name] = [name]
        );
    } else if (rcvr && rcvr.exemplar) {
    	// only show shadowed vars and attributes
        vars = rcvr.inheritedVariableNames(true);
        vars.forEach(name =>
            dict[name] = name
        );
        attribs = rcvr.shadowedAttributes();
        /*
        if (vars.length && attribs.length) {
            dict['~'] = null; // add line
        }
        */
        attribs.forEach(name =>
            dict[name] = [name]
        );
    }
    return dict;
};

InputSlotMorph.prototype.pianoKeyboardMenu = function () {
    var menu, block, instrument;
    block = this.parentThatIsA(BlockMorph);
    if (block) {
        instrument = block.scriptTarget().instrument;
    }
    menu = new PianoMenuMorph(
        this.setContents,
        this,
        this.fontSize,
        instrument
    );
    menu.popup(this.world(), new Point(
        this.right() - (menu.width() / 2),
        this.bottom()
    ));
    menu.selectKey(+this.evaluate());
};

InputSlotMorph.prototype.directionDialMenu = function () {
    return {'§_dir': null};
};

InputSlotMorph.prototype.audioMenu = function () {
    var dict = {
        'volume' : ['volume'],
        'note' : ['note'],
        'frequency' : ['frequency'],
        'samples' : ['samples'],
        'sample rate' : ['sample rate'],
        'spectrum' : ['spectrum'],
        'resolution' : ['resolution']
    };
    if (this.world().currentKey === 16) { // shift
        dict['~'] = null;
        dict.modifier = ['modifier'];
        dict.output = ['output'];
    }
    return dict;
};

InputSlotMorph.prototype.setChoices = function (dict, readonly) {
    // externally specify choices and read-only status,
    // used for custom blocks
    var cnts = this.contents();
    this.choices = dict;
    this.isReadOnly = readonly || false;
    if (this.parent instanceof BlockMorph) {
        this.parent.fixLabelColor();
        if (!readonly) {
            cnts.shadowOffset = ZERO;
            cnts.shadowColor = null;
            cnts.setColor(this.overrideBlack || BLACK);
        }
    }
    this.fixLayout();
};

InputSlotMorph.prototype.shadowedVariablesMenu = function () {
    var block = this.parentThatIsA(BlockMorph),
        rcvr,
        dict = {};

    if (!block) {return dict; }
    rcvr = block.receiver();
    if (rcvr) {
        rcvr.inheritedVariableNames(true).forEach(function (name) {
            dict[name] = name;
        });
    }
    return dict;
};

InputSlotMorph.prototype.directionDialMenu = function () {
    return {'§_dir': null};
};

InputSlotMorph.prototype.audioMenu = function () {
    var dict = {
        'volume' : ['volume'],
        'note' : ['note'],
        'frequency' : ['frequency'],
        'samples' : ['samples'],
        'sample rate' : ['sample rate'],
        'spectrum' : ['spectrum'],
        'resolution' : ['resolution']
    };
    if (this.world().currentKey === 16) { // shift
        dict['~'] = null;
        dict.modifier = ['modifier'];
        dict.output = ['output'];
    }
    return dict;
};

// InputSlotMorph layout:

InputSlotMorph.prototype.fixLayout = function () {
    var width, height, arrowWidth,
        contents = this.contents(),
        arrow = this.arrow(),
        tp = this.topBlock();

    contents.isNumeric = this.isNumeric;
    contents.isEditable = (!this.isReadOnly);
    if (this.isReadOnly) {
        contents.disableSelecting();
        contents.color = this.overrideWhite || WHITE;
    } else {
        contents.enableSelecting();
        contents.color = this.overrideBlack || BLACK;
    }

    if (this.choices) {
        arrow.setSize(this.fontSize);
        arrow.show();
    } else {
        arrow.hide();
    }
    arrowWidth = arrow.isVisible ? arrow.width() : 0;

	// determine slot dimensions
    if (this.selectedBlock) { // a "wish" in the OF-block's left slot
        height = this.selectedBlock.height() + this.edge * 2;
         width = this.selectedBlock.width()
            + arrowWidth
            + this.edge * 2
            + this.typeInPadding * 2;
     } else {
    	height = contents.height() + this.edge * 2; // + this.typeInPadding * 2
        if (this.isNumeric) {
            width = contents.width()
                + Math.floor(arrowWidth * 0.5)
                + height
                + this.typeInPadding * 2;
        } else {
            width = Math.max(
                contents.width()
                    + arrowWidth
                    + this.edge * 2
                    + this.typeInPadding * 2,
                contents.rawHeight ? // single vs. multi-line contents
                            contents.rawHeight() + arrowWidth
                                    : fontHeight(contents.fontSize) / 1.3
                                        + arrowWidth,
                this.minWidth // for text-type slots
            );
        }
    }
    this.bounds.setExtent(new Point(width, height));

    if (this.isNumeric) {
        contents.setPosition(new Point(
            Math.floor(height / 2),
            this.edge
        ).add(new Point(this.typeInPadding, 0)).add(this.position()));
    } else {
        contents.setPosition(new Point(
            this.edge,
            this.edge
        ).add(new Point(this.typeInPadding, 0)).add(this.position()));
    }

    if (arrow.isVisible) {
        arrow.setPosition(new Point(
            this.right() - arrowWidth - this.edge,
            contents.top()
        ));
    }

    if (this.parent && this.parent.fixLayout) {
        tp.fullChanged();
        this.parent.fixLayout();
        tp.fullChanged();
    }
};

// InputSlotMorph events:

InputSlotMorph.prototype.mouseDownLeft = function (pos) {
    if (this.isReadOnly || this.arrow().bounds.containsPoint(pos)) {
        this.escalateEvent('mouseDownLeft', pos);
    } else {
        this.selectForEdit().contents().edit();
    }
};

InputSlotMorph.prototype.mouseClickLeft = function (pos) {
    if (this.arrow().bounds.containsPoint(pos)) {
        this.dropDownMenu();
    } else if (this.isReadOnly) {
        this.dropDownMenu();
    } else {
        this.contents().edit();
    }
};

InputSlotMorph.prototype.reactToKeystroke = function () {
    var cnts;
    if (this.constant) {
        cnts = this.contents();
        this.constant = null;
        cnts.isItalic = false;
        cnts.rerender();
    }
};

InputSlotMorph.prototype.updateFieldValue = function (newValue) {
    var block = this.parentThatIsA(BlockMorph);

    newValue = newValue !== undefined ? newValue : this.contents().text;
    if (block.id) {  // not in the palette
        this.setContents(this.lastValue);  // set to original value in case it fails
        return SnapActions.setField(this, newValue);
    }
};

InputSlotMorph.prototype.reactToEdit = function () {
    this.updateFieldValue();
    this.contents().clearSelection();
};

InputSlotMorph.prototype.freshTextEdit = function (aStringOrTextMorph) {
    this.onNextStep = () => aStringOrTextMorph.selectAll();
};

// InputSlotMorph menu:

InputSlotMorph.prototype.userMenu = function () {
    var menu = new MenuMorph(this);
    if (!StageMorph.prototype.enableCodeMapping) {
        return this.parent.userMenu();
    }
    if (this.isNumeric) {
        menu.addItem(
            'code number mapping...',
            'mapNumberToCode'
        );
    } else {
        menu.addItem(
            'code string mapping...',
            'mapStringToCode'
        );
    }
    return menu;
};

// InputSlotMorph code mapping

/*
    code mapping lets you use blocks to generate arbitrary text-based
    source code that can be exported and compiled / embedded elsewhere,
    it's not part of Snap's evaluator and not needed for Snap itself
*/

InputSlotMorph.prototype.mapStringToCode = function () {
    // private - open a dialog box letting the user map code via the GUI
    new DialogBoxMorph(
        this,
        code => StageMorph.prototype.codeMappings.string = code,
        this
    ).promptCode(
        'Code mapping - String <#1>',
        StageMorph.prototype.codeMappings.string || '',
        this.world()
    );
};

InputSlotMorph.prototype.mapNumberToCode = function () {
    // private - open a dialog box letting the user map code via the GUI
    new DialogBoxMorph(
        this,
        code => StageMorph.prototype.codeMappings.number = code,
        this
    ).promptCode(
        'Code mapping - Number <#1>',
        StageMorph.prototype.codeMappings.number || '',
        this.world()
    );
};

InputSlotMorph.prototype.mappedCode = function () {
    var block = this.parentThatIsA(BlockMorph),
        val = this.evaluate(),
        code;

    if (this.isNumeric) {
        code = StageMorph.prototype.codeMappings.number || '<#1>';
        return code.replace(/<#1>/g, val);
    }
    if (!isNaN(parseFloat(val))) {return val; }
    if (!isString(val)) {return val; }
    if (block && contains(
            ['doSetVar', 'doChangeVar', 'doShowVar', 'doHideVar'],
            block.selector
        )) {
        return val;
    }
    code = StageMorph.prototype.codeMappings.string || '<#1>';
    return code.replace(/<#1>/g, val);
};

// InputSlotMorph evaluating:

InputSlotMorph.prototype.evaluate = function () {
/*
    answer my contents, which can be a "wish", i.e. a block that refers to
    another sprite's local method, or a text string. If I am numerical convert
    that string to a number. If the conversion fails answer the string
    (e.g. for special choices like 'any', 'all' or 'last') otherwise
    the numerical value.
*/
    var num, contents;

 	if (this.selectedBlock) {
  		return this.selectedBlock;
  	}
    if (this.constant) {
        return this.constant;
    }
    contents = this.contents();
    if (this.isNumeric) {
        num = parseFloat(contents.text || '0');
        if (!isNaN(num)) {
            return num;
        }
    }
    return contents.text;
};

InputSlotMorph.prototype.isEmptySlot = function () {
    return this.contents().text === '' && !this.selectedBlock;
};

// InputSlotMorph single-stepping:

InputSlotMorph.prototype.flash = function () {
    // don't redraw the label b/c zebra coloring
    if (!this.cachedNormalColor) {
        this.cachedNormalColor = this.color;
        this.color = this.activeHighlight;
        this.rerender();
    }
};

InputSlotMorph.prototype.unflash = function () {
    // don't redraw the label b/c zebra coloring
    if (this.cachedNormalColor) {
        var clr = this.cachedNormalColor;
        this.cachedNormalColor = null;
        this.color = clr;
        this.rerender();
    }
};

// InputSlotMorph drawing:

InputSlotMorph.prototype.render = function (ctx) {
    var borderColor, r;

    // initialize my surface property
    if (this.cachedNormalColor) { // if flashing
        borderColor = this.color;
    } else if (this.parent) {
        borderColor = this.parent.color;
    } else {
        borderColor = new Color(120, 120, 120);
    }
    ctx.fillStyle = this.color.toString();
    if (this.isReadOnly && !this.cachedNormalColor) { // unless flashing
        ctx.fillStyle = borderColor.darker().toString();
    }

    // cache my border colors
    this.cachedClr = borderColor.toString();
    this.cachedClrBright = borderColor.lighter(this.contrast)
        .toString();
    this.cachedClrDark = borderColor.darker(this.contrast).toString();

    if (!this.isNumeric) {
        ctx.fillRect(
            this.edge,
            this.edge,
            this.width() - this.edge * 2,
            this.height() - this.edge * 2
        );
        if (!MorphicPreferences.isFlat) {
            this.drawRectBorder(ctx);
        }
    } else {
        r = Math.max((this.height() - (this.edge * 2)) / 2, 0);
        ctx.beginPath();
        ctx.arc(
            r + this.edge,
            r + this.edge,
            r,
            radians(90),
            radians(-90),
            false
        );
        ctx.arc(
            this.width() - r - this.edge,
            r + this.edge,
            r,
            radians(-90),
            radians(90),
            false
        );
        ctx.closePath();
        ctx.fill();
        if (!MorphicPreferences.isFlat) {
            this.drawRoundBorder(ctx);
        }
    }

	// draw my "wish" block, if any
	if (this.selectedBlock) {
 		ctx.drawImage(
        	this.doWithAlpha(1, () => this.selectedBlock.fullImage()),
            this.edge + this.typeInPadding,
            this.edge
        );
 	}

};

InputSlotMorph.prototype.drawRectBorder = function (ctx) {
    var shift = this.edge * 0.5,
        gradient;

    ctx.lineWidth = this.edge;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    ctx.shadowOffsetY = shift;
    ctx.shadowBlur = this.edge;
    ctx.shadowColor = this.color.darker(80).toString();

    gradient = ctx.createLinearGradient(
        0,
        0,
        0,
        this.edge
    );
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrDark);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(this.edge, shift);
    ctx.lineTo(this.width() - this.edge - shift, shift);
    ctx.stroke();

    ctx.shadowOffsetY = 0;

    gradient = ctx.createLinearGradient(
        0,
        0,
        this.edge,
        0
    );
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrDark);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(shift, this.edge);
    ctx.lineTo(shift, this.height() - this.edge - shift);
    ctx.stroke();

    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;

    gradient = ctx.createLinearGradient(
        0,
        this.height() - this.edge,
        0,
        this.height()
    );
    gradient.addColorStop(0, this.cachedClrBright);
    gradient.addColorStop(1, this.cachedClr);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(this.edge, this.height() - shift);
    ctx.lineTo(this.width() - this.edge, this.height() - shift);
    ctx.stroke();

    gradient = ctx.createLinearGradient(
        this.width() - this.edge,
        0,
        this.width(),
        0
    );
    gradient.addColorStop(0, this.cachedClrBright);
    gradient.addColorStop(1, this.cachedClr);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(this.width() - shift, this.edge);
    ctx.lineTo(this.width() - shift, this.height() - this.edge);
    ctx.stroke();

};

InputSlotMorph.prototype.drawRoundBorder = function (ctx) {
    var shift = this.edge * 0.5,
        r = Math.max((this.height() - (this.edge * 2)) / 2, 0),
        start,
        end,
        gradient;

    ctx.lineWidth = this.edge;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    // straight top edge:
    start = r + this.edge;
    end = this.width() - r - this.edge;
    if (end > start) {

        ctx.shadowOffsetX = shift;
        ctx.shadowOffsetY = shift;
        ctx.shadowBlur = this.edge;
        ctx.shadowColor = this.color.darker(80).toString();

        gradient = ctx.createLinearGradient(
            0,
            0,
            0,
            this.edge
        );
        gradient.addColorStop(0, this.cachedClr);
        gradient.addColorStop(1, this.cachedClrDark);
        ctx.strokeStyle = gradient;
        ctx.beginPath();

        ctx.moveTo(start, shift);
        ctx.lineTo(end, shift);
        ctx.stroke();

        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0;
    }

    // straight bottom edge:
    gradient = ctx.createLinearGradient(
        0,
        this.height() - this.edge,
        0,
        this.height()
    );
    gradient.addColorStop(0, this.cachedClrBright);
    gradient.addColorStop(1, this.cachedClr);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(r + this.edge, this.height() - shift);
    ctx.lineTo(this.width() - r - this.edge, this.height() - shift);
    ctx.stroke();

    r = Math.max(this.height() / 2, this.edge);

    ctx.shadowOffsetX = shift;
    ctx.shadowOffsetY = shift;
    ctx.shadowBlur = this.edge;
    ctx.shadowColor = this.color.darker(80).toString();

    // top edge: left corner
    gradient = ctx.createRadialGradient(
        r,
        r,
        r - this.edge,
        r,
        r,
        r
    );
    gradient.addColorStop(1, this.cachedClr);
    gradient.addColorStop(0, this.cachedClrDark);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.arc(
        r,
        r,
        r - shift,
        radians(180),
        radians(270),
        false
    );

    ctx.stroke();

    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;

    // bottom edge: right corner
    gradient = ctx.createRadialGradient(
        this.width() - r,
        r,
        r - this.edge,
        this.width() - r,
        r,
        r
    );
    gradient.addColorStop(1, this.cachedClr);
    gradient.addColorStop(0, this.cachedClrBright);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.arc(
        this.width() - r,
        r,
        r - shift,
        radians(0),
        radians(90),
        false
    );
    ctx.stroke();
};

// InputSlotStringMorph ///////////////////////////////////////////////

/*
    I am a piece of single-line text inside an input slot block. I serve as a
    container for sharing typographic attributes among my instances
*/

// InputSlotStringMorph inherits from StringMorph:

InputSlotStringMorph.prototype = new StringMorph();
InputSlotStringMorph.prototype.constructor = InputSlotStringMorph;
InputSlotStringMorph.uber = StringMorph.prototype;

function InputSlotStringMorph(
    text,
    fontSize,
    fontStyle,
    bold,
    italic,
    isNumeric,
    shadowOffset,
    shadowColor,
    color,
    fontName
) {
    this.init(
        text,
        fontSize,
        fontStyle,
        bold,
        italic,
        isNumeric,
        shadowOffset,
        shadowColor,
        color,
        fontName
    );
}

InputSlotStringMorph.prototype.getRenderColor = function () {
    if (MorphicPreferences.isFlat) {
        if (this.isEditable) {
            return this.color;
        }
        return this.parent.alpha > 0.5 ? this.color : this.overrideBlack || BLACK;
    }
    return this.parent.alpha > 0.25 ? this.color : this.overrideWhite || WHITE;
};

InputSlotStringMorph.prototype.getShadowRenderColor = function () {
    return this.parent.alpha > 0.25 ? this.shadowColor : CLEAR;
};

// InputSlotTextMorph ///////////////////////////////////////////////

/*
    I am a piece of multi-line text inside an input slot block. I serve as a
    container for sharing typographic attributes among my instances
*/

// InputSlotTextMorph inherits from TextMorph:

InputSlotTextMorph.prototype = new TextMorph();
InputSlotTextMorph.prototype.constructor = InputSlotTextMorph;
InputSlotTextMorph.uber = StringMorph.prototype;

function InputSlotTextMorph(
    text,
    fontSize,
    fontStyle,
    bold,
    italic,
    alignment,
    width,
    fontName,
    shadowOffset,
    shadowColor
) {
    this.init(text,
        fontSize,
        fontStyle,
        bold,
        italic,
        alignment,
        width,
        fontName,
        shadowOffset,
        shadowColor);
}

InputSlotTextMorph.prototype.getRenderColor =
    InputSlotStringMorph.prototype.getRenderColor;

InputSlotTextMorph.prototype.getShadowRenderColor =
    InputSlotStringMorph.prototype.getShadowRenderColor;

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
    this.bounds.setExtent(template.extent().add(this.edge * 2 + 2));
    template.setPosition(this.position().add(this.edge + 1));
    if (this.parent) {
        if (this.parent.fixLayout) {
            this.parent.fixLayout();
        }
    }
};

// TemplateSlotMorph drop behavior:

TemplateSlotMorph.prototype.wantsDropOf = function (aMorph) {
    return aMorph.selector === 'reportGetVar';
};

TemplateSlotMorph.prototype.reactToDropOf = function (droppedMorph) {
    if (droppedMorph.selector === 'reportGetVar') {
        droppedMorph.destroy();
    }
};

// TemplateSlotMorph drawing:

TemplateSlotMorph.prototype.render = function (ctx) {
    if (this.parent instanceof Morph) {
        this.color = this.parent.color.copy();
    }
    BlockMorph.prototype.render.call(this, ctx);
};

TemplateSlotMorph.prototype.outlinePath =
    ReporterBlockMorph.prototype.outlinePathOval;

TemplateSlotMorph.prototype.outlinePath =
    ReporterBlockMorph.prototype.outlinePathOval;

TemplateSlotMorph.prototype.drawEdges = ReporterBlockMorph
    .prototype.drawEdgesOval;

TemplateSlotMorph.prototype.hasLocationPin = function () {
    return false;
};

TemplateSlotMorph.prototype.cSlots = function () {
    return [];
};

// TemplateSlotMorph single-stepping

TemplateSlotMorph.prototype.flash = function () {
    this.template().flash();
};

TemplateSlotMorph.prototype.unflash = function () {
    this.template().unflash();
};

// BooleanSlotMorph ////////////////////////////////////////////////////

/*
    I am a diamond-shaped argument slot.
    My block spec is

    %b         - Boolean
    %boolUE    - Boolean unevaluated

    I can be directly edited. When the user clicks on me I toggle
    between <true>, <false> and <null> values.

    evaluate() returns my value.

    my most important public attributes and accessors are:

    value                      - user editable contents (Boolean or null)
    setContents(Boolean/null)  - display the argument (Boolean or null)
*/

// BooleanSlotMorph inherits from ArgMorph:

BooleanSlotMorph.prototype = new ArgMorph();
BooleanSlotMorph.prototype.constructor = BooleanSlotMorph;
BooleanSlotMorph.uber = ArgMorph.prototype;

// BooleanSlotMorph preferences settings

BooleanSlotMorph.prototype.isTernary = false;

// BooleanSlotMorph instance creation:

function BooleanSlotMorph(initialValue) {
    this.init(initialValue);
}

BooleanSlotMorph.prototype.init = function (initialValue) {
    this.value = (typeof initialValue === 'boolean') ? initialValue : null;
    this.isUnevaluated = false;
    this.progress = 0; // for animation state, not persisted
    BooleanSlotMorph.uber.init.call(this);
    this.alpha = 1;
    this.fixLayout();
};

BooleanSlotMorph.prototype.getSpec = function () {
    return this.isUnevaluated ? '%boolUE' : '%b';
};

// BooleanSlotMorph accessing:

BooleanSlotMorph.prototype.evaluate = function () {
    return this.value;
};

BooleanSlotMorph.prototype.isEmptySlot = function () {
    return this.value === null;
};

BooleanSlotMorph.prototype.isBinary = function () {
    return !this.isTernary &&
        isNil(this.parentThatIsA(RingMorph)) &&
        !isNil(this.parentThatIsA(ScriptsMorph));
};

BooleanSlotMorph.prototype.setContents = function (boolOrNull) {
    this.value = (typeof boolOrNull === 'boolean') ? boolOrNull : null;
    this.rerender();
};

BooleanSlotMorph.prototype.toggleValue = function () {
    var target = this.selectForEdit(),
        ide;
    if (target !== this) {
        return this.toggleValue.call(target);
    }
    ide = this.parentThatIsA(IDE_Morph);
    this.value = this.nextValue();
    if (ide && !ide.isAnimating) {
        this.rerender();
        return;
    }
    this.progress = 3;
    this.rerender();
    this.nextSteps ([
        () => {
            this.progress = 2;
            this.rerender();
        },
        () => {
            this.progress = 1;
            this.rerender();
        },
        () => {
            this.progress = 0;
            this.rerender();
        },
    ]);
};

BooleanSlotMorph.prototype.nextValue = function () {
    if (this.isStatic || this.isBinary()) {
        return !this.value;
    }
    switch (this.value) {
    case true:
        return false;
    case false:
        return null;
    default:
        return true;
    }
};

// BooleanSlotMorph events:

BooleanSlotMorph.prototype.mouseClickLeft = function () {
    var block = this.parentThatIsA(BlockMorph);

    if (block.id) {
        SnapActions.toggleBoolean(this, this.value);
    } else {  // in the palette
        this.toggleValue();
    }
};

BooleanSlotMorph.prototype.mouseEnter = function () {
    if (this.isStatic) {return; }
    if (this.nextValue() === null) {
        this.progress = -1; // 'fade'
    } else {
        this.progress = 1;
    }
    this.rerender();
};

BooleanSlotMorph.prototype.mouseLeave = function () {
    if (this.isStatic) {return; }
    this.progress = 0;
    this.rerender();
};

// BooleanSlotMorph menu:

BooleanSlotMorph.prototype.userMenu = function () {
    var menu = new MenuMorph(this);
    if (!StageMorph.prototype.enableCodeMapping) {
        return this.parent.userMenu();
    }
    if (this.evaluate() === true) {
        menu.addItem(
            'code true mapping...',
            'mapTrueToCode'
        );
    } else {
        menu.addItem(
            'code false mapping...',
            'mapFalseToCode'
        );
    }
    return menu;
};

// BooleanSlotMorph code mapping

/*
    code mapping lets you use blocks to generate arbitrary text-based
    source code that can be exported and compiled / embedded elsewhere,
    it's not part of Snap's evaluator and not needed for Snap itself
*/

BooleanSlotMorph.prototype.mapTrueToCode = function () {
    // private - open a dialog box letting the user map code via the GUI
    new DialogBoxMorph(
        this,
        code => StageMorph.prototype.codeMappings['true'] = code,
        this
    ).promptCode(
        'Code mapping - true',
        StageMorph.prototype.codeMappings['true'] || 'true',
        this.world()
    );
};

BooleanSlotMorph.prototype.mapFalseToCode = function () {
    // private - open a dialog box letting the user map code via the GUI
    new DialogBoxMorph(
        this,
        code => StageMorph.prototype.codeMappings['false'] = code,
        this
    ).promptCode(
        'Code mapping - false',
        StageMorph.prototype.codeMappings['false'] || 'false',
        this.world()
    );
};

BooleanSlotMorph.prototype.mappedCode = function () {
    if (this.evaluate() === true) {
        return StageMorph.prototype.codeMappings.boolTrue || 'true';
    }
    return StageMorph.prototype.codeMappings.boolFalse || 'false';
};

// BooleanSlotMorph layout:

BooleanSlotMorph.prototype.fixLayout = function () {
    // determine my extent
    var text, h;
    if (this.isStatic) {
        text = this.textLabelExtent();
        h = text.y + (this.edge * 3);
        this.bounds.setWidth(text.x + (h * 1.5) + (this.edge * 2));
        this.bounds.setHeight(h);
    } else {
        this.bounds.setWidth((this.fontSize + this.edge * 2) * 2);
        this.bounds.setHeight(this.fontSize + this.edge * 2);
    }
};

// BooleanSlotMorph drawing:

BooleanSlotMorph.prototype.render = function (ctx) {
    if (!(this.cachedNormalColor)) { // unless flashing
        this.color = this.parent ?
                this.parent.color : new Color(200, 200, 200);
    }
    this.cachedClr = this.color.toString();
    this.cachedClrBright = this.bright();
    this.cachedClrDark = this.dark();
    this.drawDiamond(ctx, this.progress);
    this.drawLabel(ctx);
    this.drawKnob(ctx, this.progress);
};

BooleanSlotMorph.prototype.drawDiamond = function (ctx, progress) {
    var w = this.width(),
        h = this.height(),
        r = h / 2,
        w2 = w / 2,
        shift = this.edge / 2,
        gradient;

    // draw the 'flat' shape:
    if (this.cachedNormalColor) { // if flashing
        ctx.fillStyle = this.color.toString();
    } else if (progress < 0 ) { // 'fade'
        ctx.fillStyle = this.color.darker(25).toString();
    } else {
        switch (this.value) {
        case true:
            ctx.fillStyle = 'rgb(0, 200, 0)';
            break;
        case false:
            ctx.fillStyle = 'rgb(200, 0, 0)';
            break;
        default:
            ctx.fillStyle = this.color.darker(25).toString();
        }
    }

    if (progress > 0 && !this.isEmptySlot()) {
        // left half:
        ctx.fillStyle = 'rgb(0, 200, 0)';
        ctx.beginPath();
        ctx.moveTo(0, r);
        ctx.lineTo(r, 0);
        ctx.lineTo(w2, 0);
        ctx.lineTo(w2, h);
        ctx.lineTo(r, h);
        ctx.closePath();
        ctx.fill();

        // right half:
        ctx.fillStyle = 'rgb(200, 0, 0)';
        ctx.beginPath();
        ctx.moveTo(w2, 0);
        ctx.lineTo(w - r, 0);
        ctx.lineTo(w, r);
        ctx.lineTo(w - r, h);
        ctx.lineTo(w2, h);
        ctx.closePath();
        ctx.fill();
    } else {
        ctx.beginPath();
        ctx.moveTo(0, r);
        ctx.lineTo(r, 0);
        ctx.lineTo(w - r, 0);
        ctx.lineTo(w, r);
        ctx.lineTo(w - r, h);
        ctx.lineTo(r, h);
        ctx.closePath();
        ctx.fill();
    }

    if (MorphicPreferences.isFlat) {return; }

    // add 3D-Effect:
    ctx.lineWidth = this.edge;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    ctx.shadowOffsetX = shift;
    ctx.shadowBlur = shift;
    ctx.shadowColor = 'black';

    // top edge: left corner
    gradient = ctx.createLinearGradient(
        0,
        r,
        this.edge * 0.6,
        r + (this.edge * 0.6)
    );
    gradient.addColorStop(1, this.cachedClrDark);
    gradient.addColorStop(0, this.cachedClr);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(shift, r);
    ctx.lineTo(r, shift);
    ctx.closePath();
    ctx.stroke();

    // top edge: straight line
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = shift;
    ctx.shadowBlur = this.edge;

    gradient = ctx.createLinearGradient(
        0,
        0,
        0,
        this.edge
    );
    gradient.addColorStop(1, this.cachedClrDark);
    gradient.addColorStop(0, this.cachedClr);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(r, shift);
    ctx.lineTo(w - r, shift);
    ctx.closePath();
    ctx.stroke();

    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;

    // bottom edge: right corner
    gradient = ctx.createLinearGradient(
        w - r - (this.edge * 0.6),
        h - (this.edge * 0.6),
        w - r,
        h
    );
    gradient.addColorStop(1, this.cachedClr);
    gradient.addColorStop(0, this.cachedClrBright);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(w - r, h - shift);
    ctx.lineTo(w - shift, r);
    ctx.closePath();
    ctx.stroke();

    // bottom edge: straight line
    gradient = ctx.createLinearGradient(
        0,
        h - this.edge,
        0,
        h
    );
    gradient.addColorStop(1, this.cachedClr);
    gradient.addColorStop(0, this.cachedClrBright);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(r, h - shift);
    ctx.lineTo(w - r - shift, h - shift);
    ctx.closePath();
    ctx.stroke();
};

BooleanSlotMorph.prototype.drawLabel = function (ctx) {
    var w = this.width(),
        r = this.height() / 2 - this.edge,
        r2 = r / 2,
        shift = this.edge / 2,
        text,
        x,
        y = this.height() / 2;

    if (this.isEmptySlot() || this.progress < 0) {
        return;
    }

    if (this.isStatic) { // draw the full text label
        text = this.textLabelExtent();
        y = this.height() - (this.height() - text.y) / 2;
        if (this.value) {
            x = this.height() / 2;
        } else {
            x = this.width() - (this.height() / 2) - text.x;
        }
        ctx.save();
        if (!MorphicPreferences.isFlat) {
            ctx.shadowOffsetX = -shift;
            ctx.shadowOffsetY = -shift;
            ctx.shadowBlur = shift;
            ctx.shadowColor = this.value ? 'rgb(0, 100, 0)' : 'rgb(100, 0, 0)';
        }
        ctx.font = new StringMorph(null, this.fontSize, null, true).font();
        ctx.textAlign = 'left';
        ctx.textBaseline = 'bottom';
        ctx.fillStyle = 'rgb(255, 255, 255';
        ctx.fillText(
            localize(this.value ? 'true' : 'false'),
            x,
            y
        );
        ctx.restore();
        return;
    }

    // "tick:"
    x = r + (this.edge * 2) + shift;
    if (!MorphicPreferences.isFlat) {
        ctx.shadowOffsetX = -shift;
        ctx.shadowOffsetY = -shift;
        ctx.shadowBlur = shift;
        ctx.shadowColor = 'rgb(0, 100, 0)';
    }
    ctx.strokeStyle = 'white';
    ctx.lineWidth = this.edge + shift;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'miter';
    ctx.beginPath();
    ctx.moveTo(x - r2, y);
    ctx.lineTo(x, y + r2);
    ctx.lineTo(x + r2, r2 + this.edge);
    ctx.stroke();

    // "cross:"
    x = w - y - (this.edge * 2);
    if (!MorphicPreferences.isFlat) {
        ctx.shadowOffsetX = -shift;
        ctx.shadowOffsetY = -shift;
        ctx.shadowBlur = shift;
        ctx.shadowColor = 'rgb(100, 0, 0)';
    }
    ctx.strokeStyle = 'white';
    ctx.lineWidth = this.edge;
    ctx.lineCap = 'butt';
    ctx.beginPath();
    ctx.moveTo(x - r2, y - r2);
    ctx.lineTo(x + r2, y + r2);
    ctx.moveTo(x - r2, y + r2);
    ctx.lineTo(x + r2, y - r2);
    ctx.stroke();
};

BooleanSlotMorph.prototype.drawKnob = function (ctx, progress) {
    var w = this.width(),
        r = this.height() / 2,
        shift = this.edge / 2,
        slideStep = (this.width() - this.height()) / 4 * Math.max(0, (progress || 0)),
        gradient,
        x,
        y = r,
        outline = PushButtonMorph.prototype.outline / 2,
        outlineColor = PushButtonMorph.prototype.outlineColor,
        color = PushButtonMorph.prototype.color,
        contrast = PushButtonMorph.prototype.contrast,
        topColor = color.lighter(contrast),
        bottomColor = color.darker(contrast);

    // draw the 'flat' shape:
    switch (this.value) {
    case false:
        x = r + slideStep;
        if (!MorphicPreferences.isFlat) {
            ctx.shadowOffsetX = shift;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = shift;
            ctx.shadowColor = 'black';
        }
        if (progress < 0) {
            ctx.globalAlpha = 0.6;
        }
        break;
    case true:
        x = w - r - slideStep;
        if (!MorphicPreferences.isFlat) {
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 0;
        }
        break;
    default:
        if (!progress) {return; }
        x = r;
        if (!MorphicPreferences.isFlat) {
            ctx.shadowOffsetX = shift;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = shift;
            ctx.shadowColor = 'black';
        }
        ctx.globalAlpha = 0.6;
    }

    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.arc(x, y, r, radians(0), radians(360));
    ctx.closePath();
    ctx.fill();

    if (MorphicPreferences.isFlat) {
        ctx.globalAlpha = 1;
        return;
    }

    // add 3D-Effect
    // outline:
    ctx.shadowOffsetX = 0;
    ctx.shadowBlur = 0;
    ctx.shadowColor = 'black';
    ctx.lineWidth = outline;
    ctx.strokeStyle = outlineColor.toString();
    ctx.beginPath();
    ctx.arc(x, y, r - (outline / 2), radians(0), radians(360));
    ctx.stroke();

    // top-left:
    gradient = ctx.createRadialGradient(
        x,
        y,
        r - outline - this.edge,
        x,
        y,
        r - outline
    );
    gradient.addColorStop(1, topColor.toString());
    gradient.addColorStop(0, color.toString());

    ctx.strokeStyle = gradient;
    ctx.lineCap = 'round';
    ctx.lineWidth = this.edge;
    ctx.beginPath();
    ctx.arc(
        x,
        y,
        r - outline - this.edge / 2,
        radians(180),
        radians(270),
        false
    );
    ctx.stroke();

    // bottom-right:
    gradient = ctx.createRadialGradient(
        x,
        y,
        r - outline - this.edge,
        x,
        y,
        r - outline
    );
    gradient.addColorStop(1, bottomColor.toString());
    gradient.addColorStop(0, color.toString());

    ctx.strokeStyle = gradient;
    ctx.lineCap = 'round';
    ctx.lineWidth = this.edge;
    ctx.beginPath();
    ctx.arc(
        x,
        y,
        r - outline - this.edge / 2,
        radians(0),
        radians(90),
        false
    );
    ctx.stroke();
    ctx.globalAlpha = 1;
};

BooleanSlotMorph.prototype.textLabelExtent = function () {
    var t, f;
    t = new StringMorph(
        localize('true'),
        this.fontSize,
        null,
        true // bold
    );
    f = new StringMorph(
        localize('false'),
        this.fontSize,
        null,
        true // bold
    );
    return new Point(Math.max(t.width(), f.width()), t.height());
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

function ArrowMorph(direction, size, padding, color, isBlockLabel) {
    this.init(direction, size, padding, color, isBlockLabel);
}

ArrowMorph.prototype.init = function (direction, size, padding, color, isLbl) {
    this.direction = direction || 'down';
    this.size = size || ((size === 0) ? 0 : 50);
    this.padding = padding || 0;
    this.isBlockLabel = isLbl || false;

    ArrowMorph.uber.init.call(this);
    this.color = color || BLACK;
    this.bounds.setWidth(this.size);
    this.bounds.setHeight(this.size);
    this.rerender();
};

ArrowMorph.prototype.setSize = function (size) {
    var min = Math.max(size, 1);
    this.size = size;
    this.changed();
    this.bounds.setWidth(min);
    this.bounds.setHeight(min);
    this.rerender();
};

// ArrowMorph displaying:

ArrowMorph.prototype.render = function (ctx) {
    // initialize my surface property
    var pad = this.padding,
        h = this.height(),
        h2 = Math.floor(h / 2),
        w = this.width(),
        w2 = Math.floor(w / 2);

    ctx.fillStyle = this.getRenderColor().toString();
    ctx.beginPath();
    if (this.direction === 'down') {
        ctx.moveTo(pad, h2);
        ctx.lineTo(w - pad, h2);
        ctx.lineTo(w2, h - pad);
    } else if (this.direction === 'up') {
        ctx.moveTo(pad, h2);
        ctx.lineTo(w - pad, h2);
        ctx.lineTo(w2, pad);
    } else if (this.direction === 'left') {
        ctx.moveTo(pad, h2);
        ctx.lineTo(w2, pad);
        ctx.lineTo(w2, h - pad);
    } else { // 'right'
        ctx.moveTo(w2, pad);
        ctx.lineTo(w - pad, h2);
        ctx.lineTo(w2, h - pad);
    }
    ctx.closePath();
    ctx.fill();
};

ArrowMorph.prototype.getRenderColor = function () {
    if (this.isBlockLabel) {
        if (MorphicPreferences.isFlat) {
            return this.color;
        }
        return SyntaxElementMorph.prototype.alpha > 0.5 ? this.color : WHITE;
    }
    return this.color;
};

// TextSlotMorph //////////////////////////////////////////////////////

/*
    I am a multi-line input slot, primarily used in Snap's code-mapping
    blocks.
*/

// TextSlotMorph inherits from InputSlotMorph:

TextSlotMorph.prototype = new InputSlotMorph();
TextSlotMorph.prototype.constructor = TextSlotMorph;
TextSlotMorph.uber = InputSlotMorph.prototype;

// TextSlotMorph instance creation:

function TextSlotMorph(text, isNumeric, choiceDict, isReadOnly) {
    this.init(text, isNumeric, choiceDict, isReadOnly);
}

TextSlotMorph.prototype.init = function (
    text,
    isNumeric,
    choiceDict,
    isReadOnly
) {
    var contents = new InputSlotTextMorph(''),
        arrow = new ArrowMorph(
            'down',
            0,
            Math.max(Math.floor(this.fontSize / 6), 1),
            BLACK,
            true
        );

    contents.fontSize = this.fontSize;
    contents.fixLayout();

    this.isUnevaluated = false;
    this.choices = choiceDict || null; // object, function or selector
    this.oldContentsExtent = contents.extent();
    this.isNumeric = isNumeric || false;
    this.isReadOnly = isReadOnly || false;
    this.minWidth = 0; // can be chaged for text-type inputs ("landscape")
    this.constant = null;

    InputSlotMorph.uber.init.call(this, null, null, null, null, true); // sil.
    this.color = this.overrideWhite || WHITE;
    this.add(contents);
    this.add(arrow);
    contents.isEditable = true;
    contents.isDraggable = false;
    contents.enableSelecting();
    this.setContents(text);

};

// TextSlotMorph accessing:

TextSlotMorph.prototype.getSpec = function () {
    if (this.isNumeric) {
        return '%mln';
    }
    return '%mlt'; // default
};

TextSlotMorph.prototype.contents = function () {
    return detect(
        this.children,
        child => child instanceof TextMorph
    );
};

TextSlotMorph.prototype.layoutChanged = function () {
    this.fixLayout();
};


SymbolMorph.prototype.drawSymbolQueue = function (canvas, color) {

    // draws a triangle given the tip position, dimenstions and direction
    /* opts = {tipPos, dims, direction: pointing dir} */
    var drawTriangle = function(ctx, color, opts) {
        var tgHeight = opts.dims.h;
        var tgWidth = opts.dims.w;
        var direction = opts.direction === 'left' ? 1 : -1;
        ctx.fillStyle = color.toString();
        ctx.beginPath();
        ctx.moveTo(opts.tipPos.x, opts.tipPos.y);
        ctx.lineTo(opts.tipPos.x + (direction*tgWidth), opts.tipPos.y + tgHeight/2);
        ctx.lineTo(opts.tipPos.x + (direction*tgWidth), opts.tipPos.y - tgHeight/2);
        ctx.fill();
    };

    var ctx = canvas.getContext('2d');
    var u = canvas.width/5;
    var padding = u/2;
    var rectW = u;
    var rectH = 3*u;
    var centerY = 1*padding + rectH/2;
    var curX = padding;

    ctx.fillStyle = color.toString();

    var drawRightTri = function(startX) {
        drawTriangle(ctx, color, {
            tipPos: {x: startX + rectW, y: centerY},
            dims: {h: rectH/2, w: rectW},
            direction: 'right'
        });
    };

    drawRightTri(curX);
    curX += rectW+padding;

    ctx.fillRect(curX, padding, rectW, rectH);
    curX += rectW+padding;

    ctx.fillRect(curX, padding, rectW, rectH);
    curX += rectW+padding;

    drawRightTri(curX);

    return canvas;
};

SymbolMorph.prototype.drawSymbolFootprints = function (canvas, color) {
    // answer a canvas showing a pair of (shoe) footprints
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        u = w / 10,
        r = u * 1.5;
     ctx.fillStyle = color.toString();
     // left shoe
    // tip
    ctx.beginPath();
    ctx.arc(r, r, r, radians(-200), radians(0), false);
    ctx.lineTo(r * 2, u * 5.5);
    ctx.lineTo(u, u * 6);
    ctx.closePath();
    ctx.fill();
    // heel
    ctx.beginPath();
    ctx.arc(u * 2.25, u * 6.75, u , radians(-40), radians(-170), false);
    ctx.closePath();
    ctx.fill();
    // right shoe
    // tip
    ctx.beginPath();
    ctx.arc(w - r, u * 4.5, r, radians(-180), radians(20), false);
    ctx.lineTo(w - u, u * 8.5);
    ctx.lineTo(w - (r * 2), u * 8);
    ctx.closePath();
    ctx.fill();
    // heel
    ctx.beginPath();
    ctx.arc(w - (u * 2.25), u * 9, u, radians(0), radians(-150), false);
    ctx.closePath();
    ctx.fill();
    return canvas;
};

SymbolMorph.prototype.drawSymbolNetsBloxLogo = function (canvas, color) {
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        h = canvas.height,
        radius = w/14,
        innerWidth = w - 2*radius;

    ctx.beginPath();
    ctx.arc(w/2, h/2, 2*radius, radians(180), radians(270));

    ctx.strokeStyle = color.toString();
    ctx.beginPath();
    ctx.arc(w/2, h/2, radius, 0, radians(360));
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(w/2, h/2, 2*radius, 0, radians(90));
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(w/2, h/2, 3*radius, 0, radians(90));
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(w/2, h/2, 2*radius, radians(180), radians(270));
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(w/2, h/2, 3*radius, radians(180), radians(270));
    ctx.stroke();

    function drawLink(x, y, heading, stemLen) {
        const dx = stemLen * Math.cos(heading);
        const dy = stemLen * Math.sin(heading);
        const startX = radius * Math.cos(heading) + x;
        const startY = radius * Math.sin(heading) + y;

        ctx.beginPath();
        ctx.arc(x, y, radius, heading, heading + 2*Math.PI);
        ctx.moveTo(startX, startY);
        ctx.lineTo(x + dx, y + dy);
        ctx.stroke();
    }

    let heading = -60;
    let x = radius;
    let y = h/2;
    let totalLen = innerWidth/2;
    const thin = w/48;
    const stemLen = totalLen - 2 * radius - thin;
    while (heading < 300) {
        drawLink(x, y, radians(heading), stemLen);
        x += totalLen * Math.cos(radians(heading));
        y += totalLen * Math.sin(radians(heading));
        heading += 60;
    }

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
    this.alpha = 1;
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
        oldClr = this.color,
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
        var clr = world.getGlobalPixelColor(hand.position());
        hand.setPosition(new Point(
            event.pageX - posInDocument.x,
            event.pageY - posInDocument.y
        ));
        if (!clr.a) {
            // ignore transparent,
            // needed for retina-display support
            return;
        }
        myself.setColor(clr);
    };

    hand.processMouseDown = nop;

    hand.processMouseUp = function () {
        if (myself.parentThatIsA(ScriptsMorph)) {
            SnapActions.setColorField(myself, myself.color)
                .catch(function() {
                    myself.setColor(oldClr);
                });
        } else {
            myself.setColor(myself.color);
        }

        pal.destroy();
        hand.processMouseMove = mouseMoveBak;
        hand.processMouseDown = mouseDownBak;
        hand.processMouseUp = mouseUpBak;
    };
};

// ColorSlotMorph events:

ColorSlotMorph.prototype.mouseClickLeft = function () {
    this.selectForEdit().getUserColor();
};

// ColorSlotMorph evaluating:

ColorSlotMorph.prototype.evaluate = function () {
    return this.color;
};

// ColorSlotMorph drawing:

ColorSlotMorph.prototype.fixLayout = function () {
    // determine my extent
    var side = this.fontSize + this.edge * 2 + this.typeInPadding * 2;
    this.bounds.setWidth(side);
    this.bounds.setHeight(side);
};

ColorSlotMorph.prototype.render = function (ctx) {
    var borderColor;

    if (this.parent) {
        borderColor = this.parent.color;
    } else {
        borderColor = new Color(120, 120, 120);
    }
    ctx.fillStyle = this.color.toString();

    // cache my border colors
    this.cachedClr = borderColor.toString();
    this.cachedClrBright = borderColor.lighter(this.contrast)
        .toString();
    this.cachedClrDark = borderColor.darker(this.contrast).toString();

    ctx.fillRect(
        this.edge,
        this.edge,
        this.width() - this.edge * 2,
        this.height() - this.edge * 2
    );
    if (!MorphicPreferences.isFlat) {
        this.drawRectBorder(ctx);
    }
};

ColorSlotMorph.prototype.drawRectBorder =
    InputSlotMorph.prototype.drawRectBorder;

// BlockHighlightMorph /////////////////////////////////////////////////

/*
    I am a glowing halo around a block or stack of blocks indicating that
    a script is currently active or has encountered an error.
    I halso have an optional readout that can display a thread count
    if more than one process shares the same script
*/

// BlockHighlightMorph inherits from Morph:

BlockHighlightMorph.prototype = new Morph();
BlockHighlightMorph.prototype.constructor = BlockHighlightMorph;
BlockHighlightMorph.uber = Morph.prototype;

// BlockHighlightMorph instance creation:

function BlockHighlightMorph() {
    this.threadCount = 0;
    this.init();
}

BlockHighlightMorph.prototype.init = function () {
    BlockHighlightMorph.uber.init.call(this);
    this.isCachingImage = true;
};

// BlockHighlightMorph thread count readout

BlockHighlightMorph.prototype.readout = function () {
    return this.children.length ? this.children[0] : null;
};

BlockHighlightMorph.prototype.updateReadout = function () {
    var readout = this.readout(),
        inset = useBlurredShadows && !MorphicPreferences.isFlat ?
            SyntaxElementMorph.prototype.activeBlur * 0.4
                : SyntaxElementMorph.prototype.activeBorder * -2;
    if (this.threadCount < 2) {
        if (readout) {
            readout.destroy();
        }
        return;
    }
    if (readout) {
        readout.changed();
        readout.contents = this.threadCount.toString();
        readout.fixLayout();
        readout.rerender();
    } else {
        readout = new SpeechBubbleMorph(
            this.threadCount.toString(),
            this.color, // color,
            null, // edge,
            null, // border,
            this.color.darker(), // borderColor,
            null, // padding,
            1, // isThought - don't draw a hook
            true // no shadow - faster
        );
        this.add(readout);
    }
    readout.setPosition(this.position().add(inset));
};

// MultiArgMorph ///////////////////////////////////////////////////////

/*
    I am an arity controlled list of input slots

    my block specs are

        %mult%x - where x is any single input slot
        %inputs - for an additional text label 'with inputs'

    evaluation is handles by the interpreter
*/

// MultiArgMorph inherits from ArgMorph:

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

    // label text:
    if (this.labelText || (this.slotSpec === '%cs')) {
        label = this.labelPart(this.labelText);
        this.add(label);
        label.hide();
    }

    // left arrow:
    leftArrow = new ArrowMorph(
        'left',
        this.fontSize,
        Math.max(Math.floor(this.fontSize / 6), 1),
        arrowColor,
        true
    );

    // right arrow:
    rightArrow = new ArrowMorph(
        'right',
        this.fontSize,
        Math.max(Math.floor(this.fontSize / 6), 1),
        arrowColor,
        true
    );

    // control panel:
    arrows.add(leftArrow);
    arrows.add(rightArrow);
    arrows.rerender();
    arrows.acceptsDrops = false;

    this.add(arrows);

    // create the minimum number of inputs
    for (i = 0; i < this.minInputs; i += 1) {
        this.addInput();
    }
};

MultiArgMorph.prototype.label = function () {
    return this.labelText ? this.children[0] : null;
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
    var label, shadowColor, shadowOffset;
    if (this.slotSpec === '%t') {
        this.isStatic = true; // in this case I cannot be exchanged
    }
    if (this.parent) {
        label = this.label();
        this.color = this.parent.color;
        this.arrows().color = this.color;
        if (label) {
            shadowColor = this.shadowColor ||
                this.parent.color.darker(this.labelContrast);
            shadowOffset = this.shadowOffset ||
                (label ? label.shadowOffset : null);
            if (!label.shadowColor.eq(shadowColor)) {
                label.shadowColor = shadowColor;
                label.shadowOffset = shadowOffset;
                label.fixLayout();
                label.rerender();
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
        inpCount = this.inputs().length,
        dim = new Point(rightArrow.width() / 2, rightArrow.height());
    if (inpCount < (this.minInputs + 1)) { // hide left arrow
        if (label) {
            label.hide();
        }
        leftArrow.hide();
        rightArrow.setPosition(
            arrows.position().subtract(new Point(dim.x, 0))
        );
        arrows.setExtent(dim);
    } else if (this.is3ArgRingInHOF() && inpCount > 2) { // hide right arrow
        rightArrow.hide();
        arrows.setExtent(dim);
    } else {
        if (label) {
            label.show();
        }
        leftArrow.show();
        rightArrow.show();
        rightArrow.setPosition(leftArrow.topCenter());
        arrows.bounds.corner = rightArrow.bottomRight().copy();
    }
    arrows.rerender();
};

MultiArgMorph.prototype.fixHolesLayout = function () {
    var pos;
    this.holes = [];
    if (this.slotSpec === '%cs') {
        pos = this.position();
        this.inputs().forEach(slot => {
            if (slot instanceof CSlotMorph) {
                slot.fixHolesLayout();
                this.holes.push(
                    slot.holes[0].translateBy(slot.position().subtract(pos))
                );
            }
        });
    }
};

MultiArgMorph.prototype.refresh = function () {
    this.inputs().forEach(input => {
        input.fixLayout();
        input.rerender();
    });
};

// MultiArgMorph arity control:

MultiArgMorph.prototype.addInput = function (contents) {
    var i, name,
        newPart = this.labelPart(this.slotSpec),
        idx = this.children.length - 1;
    if (contents) {
        newPart.setContents(contents);
    } else if (this.elementSpec === '%scriptVars' ||
            this.elementSpec === '%blockVars') {
        name = '';
        i = idx;
        if (this.elementSpec === '%scriptVars') {
            // compensate for missing label element
            i += 1;
        }
        while (i > 0) {
            name = String.fromCharCode(97 + (i - 1) % 26) + name;
            i = Math.floor((i - 1) / 26);
        }
        newPart.setContents(name);
    } else if (contains(['%parms', '%ringparms'], this.elementSpec)) {
        if (this.is3ArgRingInHOF() && idx < 4) {
            newPart.setContents([
                localize('value'),
                localize('index'),
                localize('list')
            ][idx - 1]);
        } else {
            newPart.setContents('#' + idx);
        }
    }
    newPart.parent = this;
    this.children.splice(idx, 0, newPart);
    newPart.fixLayout();
    this.fixLayout();
    return newPart;
};

MultiArgMorph.prototype.removeInput = function () {
    var oldPart, scripts;
    if (this.children.length > 1) {
        oldPart = this.children[this.children.length - 2];
        this.removeChild(oldPart);
        if (oldPart instanceof BlockMorph &&
                !(oldPart instanceof RingMorph && !oldPart.contents())) {
            scripts = this.parentThatIsA(ScriptsMorph);
            if (scripts) {
                scripts.add(oldPart);
            }
        }
    }
    this.fixLayout();
};

MultiArgMorph.prototype.is3ArgRingInHOF = function () {
    // answer true if I am embedded into a ring inside a HOF block
    // that supports 3 parameters ("item, idx, data")
    // of which there are currently only MAP, KEEP and FIND
    // and their atomic counterparts
    var ring = this.parent,
        block;
    if (ring) {
        block = ring.parent;
        if (block instanceof ReporterBlockMorph) {
            return block.inputs()[0] === ring &&
                contains(
                    [
                        'reportMap',
                        'reportAtomicMap',
                        'reportKeep',
                        'reportAtomicKeep',
                        'reportFindFirst',
                        'reportAtomicFindFirst'
                    ],
                    block.selector
                );
        }
    }
    return false;
};

// MultiArgMorph events:

MultiArgMorph.prototype.mouseClickLeft = function (pos) {
    // prevent expansion in the palette
    // (because it can be hard or impossible to collapse again)
    var isMsgTypeBlock = this.parentThatIsA(MessageDefinitionBlock);
    if (!this.parentThatIsA(ScriptsMorph) && !isMsgTypeBlock) {
        this.escalateEvent('mouseClickLeft', pos);
        return;
    }
    // if the <shift> key is pressed, repeat action 3 times
    var target = this.selectForEdit(),
        arrows = target.arrows(),
        leftArrow = arrows.children[0],
        rightArrow = arrows.children[1],
        repetition = target.world().currentKey === 16 ? 3 : 1,
        i;

    if (rightArrow.bounds.containsPoint(pos)) {
        if (rightArrow.isVisible) {
            if (isMsgTypeBlock) {
                for (i = 0; i < repetition; i++) {
                    this.addInput();
                }
            } else {
                SnapActions.addListInput(target, repetition);
            }
        }
    } else if (leftArrow.bounds.containsPoint(pos)) {
        if (leftArrow.isVisible) {
            repetition = Math.min(repetition, this.inputs().length - this.minInputs);
            if (isMsgTypeBlock) {
                for (i = 0; i < repetition; i++) {
                    this.removeInput();
                }
            } else {
                SnapActions.removeListInput(target, repetition);
            }
        }
    } else {
        target.escalateEvent('mouseClickLeft', pos);
    }
};

// MultiArgMorph menu:

MultiArgMorph.prototype.userMenu = function () {
    var menu = new MenuMorph(this),
        block = this.parentThatIsA(BlockMorph),
        key = '';
    if (!StageMorph.prototype.enableCodeMapping) {
        return this.parent.userMenu();
    }
    if (block) {
        if (block instanceof RingMorph) {
            key = 'parms_';
        } else if (block.selector === 'doDeclareVariables') {
            key = 'tempvars_';
        }
    }
    menu.addItem(
        'code list mapping...',
        () => this.mapCodeList(key)
    );
    menu.addItem(
        'code item mapping...',
        () => this.mapCodeItem(key)
    );
    menu.addItem(
        'code delimiter mapping...',
        () => this.mapCodeDelimiter(key)
    );
    return menu;
};

// MultiArgMorph code mapping

/*
    code mapping lets you use blocks to generate arbitrary text-based
    source code that can be exported and compiled / embedded elsewhere,
    it's not part of Snap's evaluator and not needed for Snap itself
*/

MultiArgMorph.prototype.mapCodeDelimiter = function (key) {
    this.mapToCode(key + 'delim', 'list item delimiter');
};

MultiArgMorph.prototype.mapCodeList = function (key) {
    this.mapToCode(key + 'list', 'list contents <#1>');
};

MultiArgMorph.prototype.mapCodeItem = function (key) {
    this.mapToCode(key + 'item', 'list item <#1>');
};

MultiArgMorph.prototype.mapToCode = function (key, label) {
    // private - open a dialog box letting the user map code via the GUI
    new DialogBoxMorph(
        this,
        code => StageMorph.prototype.codeMappings[key] = code,
        this
    ).promptCode(
        'Code mapping - ' + label,
        StageMorph.prototype.codeMappings[key] || '',
        this.world()
    );
};

MultiArgMorph.prototype.mappedCode = function (definitions) {
    var block = this.parentThatIsA(BlockMorph),
        key = '',
        code,
        items = '',
        itemCode,
        delim,
        count = 0,
        parts = [];

    if (block) {
        if (block instanceof RingMorph) {
            key = 'parms_';
        } else if (block.selector === 'doDeclareVariables') {
            key = 'tempvars_';
        }
    }

    code = StageMorph.prototype.codeMappings[key + 'list'] || '<#1>';
    itemCode = StageMorph.prototype.codeMappings[key + 'item'] || '<#1>';
    delim = StageMorph.prototype.codeMappings[key + 'delim'] || ' ';

    this.inputs().forEach(input =>
        parts.push(itemCode.replace(/<#1>/g, input.mappedCode(definitions)))
    );
    parts.forEach(part => {
        if (count) {
            items += delim;
        }
        items += part;
        count += 1;
    });
    code = code.replace(/<#1>/g, items);
    return code;
};

// MultiArgMorph arity evaluating:

MultiArgMorph.prototype.evaluate = function () {
    // this is usually overridden by the interpreter. This method is only
    // called (and needed) for the variables menu.

    var result = [];
    this.inputs().forEach(slot =>
        result.push(slot.evaluate())
    );
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

// ArgLabelMorph inherits from ArgMorph:

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
        shadowOffset = label.shadowOffset || ZERO;

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
                label.rerender();
            }
        }
    }
    ArgLabelMorph.uber.fixLayout.call(this);
    if (this.parent) {
        this.parent.fixLayout();
    }
};

ArgLabelMorph.prototype.refresh = function () {
    this.inputs().forEach(input => {
        input.fixLayout();
        input.rerender();
    });
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
        label.rerender();
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
    // this is usually overridden by the interpreter. This method is only
    // called (and needed) for the variables menu.

    return this.argMorph().evaluate();
};

ArgLabelMorph.prototype.isEmptySlot = function () {
    return false;
};

// FunctionSlotMorph ///////////////////////////////////////////////////

/*
    I am an unevaluated, non-editable, rf-colored, rounded or diamond
    input slot. My current (only) use is in the THE BLOCK block.

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
};

FunctionSlotMorph.prototype.getSpec = function () {
    return '%f';
};

// FunctionSlotMorph drawing:

FunctionSlotMorph.prototype.render = function (ctx) {
    var borderColor;

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
        this.drawDiamond(ctx);
    } else {
        this.drawRounded(ctx);
    }
};

FunctionSlotMorph.prototype.drawRounded = function (ctx) {
    var h = this.height(),
        r = Math.min(this.rounding, h / 2),
        w = this.width(),
        shift = this.edge / 2,
        gradient;

    // draw the 'flat' shape:
    ctx.fillStyle = this.color.toString();
    ctx.beginPath();

    // top left:
    ctx.arc(
        r,
        r,
        r,
        radians(-180),
        radians(-90),
        false
    );

    // top right:
    ctx.arc(
        w - r,
        r,
        r,
        radians(-90),
        radians(-0),
        false
    );

    // bottom right:
    ctx.arc(
        w - r,
        h - r,
        r,
        radians(0),
        radians(90),
        false
    );

    // bottom left:
    ctx.arc(
        r,
        h - r,
        r,
        radians(90),
        radians(180),
        false
    );

    ctx.closePath();
    ctx.fill();

    if (MorphicPreferences.isFlat) {return; }

    // add 3D-Effect:
    ctx.lineWidth = this.edge;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    // bottom left corner
    ctx.strokeStyle = this.cachedClr; //gradient;
    ctx.beginPath();
    ctx.arc(
        r,
        h - r,
        r - shift,
        radians(90),
        radians(180),
        false
    );
    ctx.stroke();

    // top right corner
    ctx.strokeStyle = this.cachedClr; //gradient;
    ctx.beginPath();
    ctx.arc(
        w - r,
        r,
        r - shift,
        radians(-90),
        radians(0),
        false
    );
    ctx.stroke();

    // normal gradient edges

    ctx.shadowOffsetX = shift;
    ctx.shadowOffsetY = shift;
    ctx.shadowBlur = this.edge;
    ctx.shadowColor = this.color.darker(80).toString();

    // top edge: straight line
    gradient = ctx.createLinearGradient(
        0,
        0,
        0,
        this.edge
    );
    gradient.addColorStop(1, this.cachedClrDark);
    gradient.addColorStop(0, this.cachedClr);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(r - shift, shift);
    ctx.lineTo(w - r + shift, shift);
    ctx.stroke();

    // top edge: left corner
    gradient = ctx.createRadialGradient(
        r,
        r,
        r - this.edge,
        r,
        r,
        r
    );
    gradient.addColorStop(1, this.cachedClr);
    gradient.addColorStop(0, this.cachedClrDark);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.arc(
        r,
        r,
        r - shift,
        radians(180),
        radians(270),
        false
    );
    ctx.stroke();

    // left edge: straight vertical line
    gradient = ctx.createLinearGradient(0, 0, this.edge, 0);
    gradient.addColorStop(1, this.cachedClrDark);
    gradient.addColorStop(0, this.cachedClr);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(shift, r);
    ctx.lineTo(shift, h - r);
    ctx.stroke();

    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;

    // bottom edge: right corner
    gradient = ctx.createRadialGradient(
        w - r,
        h - r,
        r - this.edge,
        w - r,
        h - r,
        r
    );
    gradient.addColorStop(1, this.cachedClr);
    gradient.addColorStop(0, this.cachedClrBright);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.arc(
        w - r,
        h - r,
        r - shift,
        radians(0),
        radians(90),
        false
    );
    ctx.stroke();

    // bottom edge: straight line
    gradient = ctx.createLinearGradient(
        0,
        h - this.edge,
        0,
        h
    );
    gradient.addColorStop(1, this.cachedClr);
    gradient.addColorStop(0, this.cachedClrBright);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(r - shift, h - shift);
    ctx.lineTo(w - r + shift, h - shift);
    ctx.stroke();

    // right edge: straight vertical line
    gradient = ctx.createLinearGradient(w - this.edge, 0, w, 0);
    gradient.addColorStop(1, this.cachedClr);
    gradient.addColorStop(0, this.cachedClrBright);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(w - shift, r + shift);
    ctx.lineTo(w - shift, h - r);
    ctx.stroke();

};

FunctionSlotMorph.prototype.drawDiamond = function (ctx) {
    var w = this.width(),
        h = this.height(),
        h2 = Math.floor(h / 2),
        r = Math.min(this.rounding, h2),
        shift = this.edge / 2,
        gradient;

    // draw the 'flat' shape:
    ctx.fillStyle = this.color.toString();
    ctx.beginPath();

    ctx.moveTo(0, h2);
    ctx.lineTo(r, 0);
    ctx.lineTo(w - r, 0);
    ctx.lineTo(w, h2);
    ctx.lineTo(w - r, h);
    ctx.lineTo(r, h);

    ctx.closePath();
    ctx.fill();

    if (MorphicPreferences.isFlat) {return; }

    // add 3D-Effect:
    ctx.lineWidth = this.edge;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    // half-tone edges
    // bottom left corner
    ctx.strokeStyle = this.cachedClr;
    ctx.beginPath();
    ctx.moveTo(shift, h2);
    ctx.lineTo(r, h - shift);
    ctx.stroke();

    // top right corner
    ctx.strokeStyle = this.cachedClr;
    ctx.beginPath();
    ctx.moveTo(w - shift, h2);
    ctx.lineTo(w - r, shift);
    ctx.stroke();

    // normal gradient edges
    // top edge: left corner

    ctx.shadowOffsetX = shift;
    ctx.shadowOffsetY = shift;
    ctx.shadowBlur = this.edge;
    ctx.shadowColor = this.color.darker(80).toString();

    gradient = ctx.createLinearGradient(
        0,
        0,
        r,
        0
    );
    gradient.addColorStop(1, this.cachedClrDark);
    gradient.addColorStop(0, this.cachedClr);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(shift, h2);
    ctx.lineTo(r, shift);
    ctx.stroke();

    // top edge: straight line
    gradient = ctx.createLinearGradient(
        0,
        0,
        0,
        this.edge
    );
    gradient.addColorStop(1, this.cachedClrDark);
    gradient.addColorStop(0, this.cachedClr);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(r, shift);
    ctx.lineTo(w - r, shift);
    ctx.stroke();

    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;

    // bottom edge: right corner
    gradient = ctx.createLinearGradient(
        w - r,
        0,
        w,
        0
    );
    gradient.addColorStop(1, this.cachedClr);
    gradient.addColorStop(0, this.cachedClrBright);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(w - r, h - shift);
    ctx.lineTo(w - shift, h2);
    ctx.stroke();

    // bottom edge: straight line
    gradient = ctx.createLinearGradient(
        0,
        h - this.edge,
        0,
        h
    );
    gradient.addColorStop(1, this.cachedClr);
    gradient.addColorStop(0, this.cachedClrBright);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(r + shift, h - shift);
    ctx.lineTo(w - r - shift, h - shift);
    ctx.stroke();
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
    ReporterSlotMorph.uber.init.call(this, isPredicate, true);
    this.add(this.emptySlot());
    this.fixLayout();
};

ReporterSlotMorph.prototype.emptySlot = function () {
    var empty = new ArgMorph(),
        shrink = this.rfBorder * 2 + this.edge * 2;
    empty.color = this.rfColor;
    empty.alpha = 0;
    empty.bounds.setExtent(new Point(
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

ReporterSlotMorph.prototype.isEmptySlot = function () {
    return this.nestedBlock() === null;
};

// ReporterSlotMorph layout:

ReporterSlotMorph.prototype.fixLayout = function () {
    var contents = this.contents();
    this.bounds.setExtent(contents.extent().add(
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
    I can nest reporter blocks (both round and diamond) as well
    as command blocks (jigsaw shaped).

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

RingReporterSlotMorph.prototype.enableCommandDrops = true;

// RingReporterSlotMorph instance creation:

function RingReporterSlotMorph(isPredicate) {
    this.init(isPredicate);
}

RingReporterSlotMorph.prototype.init = function (isPredicate) {
    RingReporterSlotMorph.uber.init.call(this, isPredicate, true);
    this.contrast = RingMorph.prototype.contrast;
};

// RingReporterSlotMorph accessing:

RingReporterSlotMorph.prototype.getSpec = function () {
    return '%rr';
};

RingReporterSlotMorph.prototype.replaceInput = function (
    source,
    target,
    noVanish
) {
    RingReporterSlotMorph.uber.replaceInput.call(this, source, target);
    if (this.parent instanceof RingMorph && !noVanish) {
        this.parent.vanishForSimilar();
    }
};

// RingReporterSlotMorph attach targets for commands:

RingReporterSlotMorph.prototype.slotAttachPoint =
    CommandSlotMorph.prototype.slotAttachPoint;

RingReporterSlotMorph.prototype.dentLeft =
    CommandSlotMorph.prototype.dentLeft;

RingReporterSlotMorph.prototype.dentCenter =
    CommandSlotMorph.prototype.dentCenter;

RingReporterSlotMorph.prototype.attachTargets = function () {
    if (!RingReporterSlotMorph.prototype.enableCommandDrops ||
        this.contents() instanceof ReporterBlockMorph
    ) {
        // don't let commands "kick out" embedded reporters
        return [];
    }
    return CommandSlotMorph.prototype.attachTargets.call(this);
};

// RingReporterSlotMorph nesting for commands:

RingReporterSlotMorph.prototype.nestedBlock = function (block) {
    if (block) {
        var nb = this.nestedBlock();
        this.replaceInput(this.children[0], block);
        if (nb) {
            block.bottomBlock().nextBlock(nb);
        }
        this.fixLayout();
    } else {
        return detect(
            this.children,
            child => child instanceof BlockMorph
        );
    }
};

// RingReporterSlotMorph layout:

RingReporterSlotMorph.prototype.fixLayout = function () {
    if (this.contents() instanceof CommandBlockMorph) {
        CommandSlotMorph.prototype.fixLayout.call(this);
    } else {
        RingReporterSlotMorph.uber.fixLayout.call(this);
    }
};

// RingReporterSlotMorph drawing:

RingReporterSlotMorph.prototype.render = function (ctx) {
    if (MorphicPreferences.isFlat) {return; }

    // init
    this.cachedClr = this.color.toString();
    this.cachedClrBright = this.bright();
    this.cachedClrDark = this.dark();
    ctx.fillStyle = this.cachedClr;

    // only add 3D-Effect here, rendering of the flat shape happens at the
    // encompassing block level
    if (this.isPredicate) {
        this.drawEdgesDiamond(ctx);
    } else {
        this.drawEdgesOval(ctx);
    }
};

RingReporterSlotMorph.prototype.outlinePath = function (ctx, offset) {
    if (this.isPredicate) {
        this.outlinePathDiamond(ctx, offset);
    } else {
        this.outlinePathOval(ctx, offset);
    }
};

RingReporterSlotMorph.prototype.outlinePathOval = function (ctx, offset) {
    var ox = offset.x,
        oy = offset.y,
        w = this.width(),
        h = this.height(),
        r = Math.min(this.rounding, h / 2);

    // top left:
    ctx.arc(
        r + this.edge + ox,
        r + this.edge + oy,
        r,
        radians(-180),
        radians(-90),
        false
    );

    // top right:
    ctx.arc(
        w - r - this.edge + ox,
        r + this.edge + oy,
        r,
        radians(-90),
        radians(-0),
        false
    );

    // bottom right:
    ctx.arc(
        w - r - this.edge + ox,
        h - r - this.edge + oy,
        r,
        radians(0),
        radians(90),
        false
    );

    // bottom left:
    ctx.arc(
        r + this.edge + ox,
        h - r - this.edge + oy,
        r,
        radians(90),
        radians(180),
        false
    );

    // "close" the path
    ctx.lineTo(this.edge + ox, r + this.edge + oy);
};

RingReporterSlotMorph.prototype.drawEdgesOval = function (ctx) {
    var h = this.height(),
        r = Math.min(this.rounding, h / 2),
        w = this.width(),
        shift = this.edge / 2,
        gradient;


    // add 3D-Effect:
    ctx.lineWidth = this.edge;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    // bottom left corner
    ctx.strokeStyle = this.cachedClr;
    ctx.beginPath();
    ctx.arc(
        r,
        h - r,
        r - shift,
        radians(90),
        radians(180),
        false
    );
    ctx.stroke();

    // top right corner
    ctx.strokeStyle = this.cachedClr;
    ctx.beginPath();
    ctx.arc(
        w - r,
        r,
        r - shift,
        radians(-90),
        radians(0),
        false
    );
    ctx.stroke();

    // normal gradient edges

    ctx.shadowOffsetX = shift;
    ctx.shadowOffsetY = shift;
    ctx.shadowBlur = this.edge;
    ctx.shadowColor = this.color.darker(80).toString();

    // top edge: straight line
    gradient = ctx.createLinearGradient(
        0,
        0,
        0,
        this.edge
    );
    gradient.addColorStop(1, this.cachedClrDark);
    gradient.addColorStop(0, this.cachedClr);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(r - shift, shift);
    ctx.lineTo(w - r + shift, shift);
    ctx.stroke();

    // top edge: left corner
    gradient = ctx.createRadialGradient(
        r,
        r,
        r - this.edge,
        r,
        r,
        r
    );
    gradient.addColorStop(1, this.cachedClr);
    gradient.addColorStop(0, this.cachedClrDark);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.arc(
        r,
        r,
        r - shift,
        radians(180),
        radians(270),
        false
    );
    ctx.stroke();

    // left edge: straight vertical line
    gradient = ctx.createLinearGradient(0, 0, this.edge, 0);
    gradient.addColorStop(1, this.cachedClrDark);
    gradient.addColorStop(0, this.cachedClr);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(shift, r);
    ctx.lineTo(shift, h - r);
    ctx.stroke();

    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;

    // bottom edge: right corner
    gradient = ctx.createRadialGradient(
        w - r,
        h - r,
        r - this.edge,
        w - r,
        h - r,
        r
    );
    gradient.addColorStop(1, this.cachedClr);
    gradient.addColorStop(0, this.cachedClrBright);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.arc(
        w - r,
        h - r,
        r - shift,
        radians(0),
        radians(90),
        false
    );
    ctx.stroke();

    // bottom edge: straight line
    gradient = ctx.createLinearGradient(
        0,
        h - this.edge,
        0,
        h
    );
    gradient.addColorStop(1, this.cachedClr);
    gradient.addColorStop(0, this.cachedClrBright);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(r - shift, h - shift);
    ctx.lineTo(w - r + shift, h - shift);
    ctx.stroke();

    // right edge: straight vertical line
    gradient = ctx.createLinearGradient(w - this.edge, 0, w, 0);
    gradient.addColorStop(1, this.cachedClr);
    gradient.addColorStop(0, this.cachedClrBright);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(w - shift, r + shift);
    ctx.lineTo(w - shift, h - r);
    ctx.stroke();
};

RingReporterSlotMorph.prototype.outlinePathDiamond = function (ctx, offset) {
    var ox = offset.x,
        oy = offset.y,
        w = this.width(),
        h = this.height(),
        h2 = Math.floor(h / 2),
        r = Math.min(this.rounding, h2);

    ctx.moveTo(ox + this.edge, h2 + oy);
    ctx.lineTo(r + this.edge + ox, this.edge + oy);
    ctx.lineTo(w - r - this.edge + ox, this.edge + oy);
    ctx.lineTo(w - this.edge + ox, h2 + oy);
    ctx.lineTo(w - r - this.edge + ox, h - this.edge + oy);
    ctx.lineTo(r + this.edge + ox, h - this.edge + oy);
    ctx.lineTo(ox + this.edge, h2 + oy);
};

RingReporterSlotMorph.prototype.drawEdgesDiamond = function (ctx) {
    var w = this.width(),
        h = this.height(),
        h2 = Math.floor(h / 2),
        r = Math.min(this.rounding, h2),
        shift = this.edge / 2,
        gradient;

    // add 3D-Effect:
    ctx.lineWidth = this.edge;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    // half-tone edges
    // bottom left corner
    ctx.strokeStyle = this.cachedClr;
    ctx.beginPath();
    ctx.moveTo(shift, h2);
    ctx.lineTo(r, h - shift);
    ctx.stroke();

    // top right corner
    ctx.strokeStyle = this.cachedClr;
    ctx.beginPath();
    ctx.moveTo(w - shift, h2);
    ctx.lineTo(w - r, shift);
    ctx.stroke();

    // normal gradient edges
    // top edge: left corner

    ctx.shadowOffsetX = shift;
    ctx.shadowOffsetY = shift;
    ctx.shadowBlur = this.edge;
    ctx.shadowColor = this.color.darker(80).toString();

    gradient = ctx.createLinearGradient(
        0,
        0,
        r,
        0
    );
    gradient.addColorStop(1, this.cachedClrDark);
    gradient.addColorStop(0, this.cachedClr);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(shift, h2);
    ctx.lineTo(r, shift);
    ctx.stroke();

    // top edge: straight line
    gradient = ctx.createLinearGradient(
        0,
        0,
        0,
        this.edge
    );
    gradient.addColorStop(1, this.cachedClrDark);
    gradient.addColorStop(0, this.cachedClr);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(r, shift);
    ctx.lineTo(w - r, shift);
    ctx.stroke();

    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;

    // bottom edge: right corner
    gradient = ctx.createLinearGradient(
        w - r,
        0,
        w,
        0
    );
    gradient.addColorStop(1, this.cachedClr);
    gradient.addColorStop(0, this.cachedClrBright);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(w - r, h - shift);
    ctx.lineTo(w - shift, h2);
    ctx.stroke();

    // bottom edge: straight line
    gradient = ctx.createLinearGradient(
        0,
        h - this.edge,
        0,
        h
    );
    gradient.addColorStop(1, this.cachedClr);
    gradient.addColorStop(0, this.cachedClrBright);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(r + shift, h - shift);
    ctx.lineTo(w - r - shift, h - shift);
    ctx.stroke();
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
    var scale = SyntaxElementMorph.prototype.scale;

    this.block = null; // optional anchor block
    this.stickyOffset = null; // not to be persisted
    this.isCollapsed = false;
    this.titleBar = new BoxMorph(
        this.rounding,
        scale,
        new Color(255, 255, 180)
    );
    this.titleBar.color = new Color(255, 255, 180);
    this.titleBar.setHeight(fontHeight(this.fontSize) + this.padding);
    this.title = null;
    this.arrow = new ArrowMorph(
        'down',
        this.fontSize
    );
    this.arrow.mouseClickLeft = () => this.toggleExpand();
    this.contents = new TextMorph(
        contents || localize('add comment here...'),
        this.fontSize
    );
    this.lastValue = this.contents.text;
    this.contents.isEditable = true;
    this.contents.enableSelecting();
    this.contents.maxWidth = 90 * scale;
    this.contents.fixLayout();
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
        scale,
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

CommentMorph.prototype.reactToEdit = function (value) {
    var text = value.text;

    if (text !== this.lastValue) {
        this.contents.text = this.lastValue;
        this.contents.rerender();
        this.contents.changed();
        this.layoutChanged();

        SnapActions.setCommentText(this, text);
    }
};

CommentMorph.prototype.fullCopy = function () {
    var cpy = new CommentMorph(this.contents.text);
    cpy.isCollapsed = this.isCollapsed;
    cpy.setTextWidth(this.textWidth());
    cpy.id = this.id;

    if (this.selectionID) { // for copy on write
        cpy.selectionID = true;
    }
    return cpy;
};

CommentMorph.prototype.setTextWidth = function (pixels) {
    this.contents.maxWidth = pixels;
    this.contents.fixLayout();
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
    if (!this.isCollapsed) {
        this.comeToFront();
    }
};

CommentMorph.prototype.comeToFront = function () {
    if (this.parent) {
        this.parent.add(this);
        this.changed();
    }
};

// CommentMorph events:

CommentMorph.prototype.mouseClickLeft = function () {
    this.comeToFront();
};

// CommentMorph layout:

CommentMorph.prototype.layoutChanged = function () {
    // react to a change of the contents area
    this.fixLayout();
    this.align();
    this.comeToFront();
};

CommentMorph.prototype.fixLayout = function () {
    var label,
        tw = this.contents.width() + 2 * this.padding;

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
        label.rootForGrab = () => this;
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
    this.arrow.rerender();
    this.arrow.setCenter(this.titleBar.center());
    this.arrow.setLeft(this.titleBar.left() + this.padding);
    if (this.title) {
        this.title.setPosition(
            this.arrow.topRight().add(new Point(this.padding, 0))
        );
    }
    this.changed();
    this.bounds.setHeight(
        this.titleBar.height()
            + (this.isCollapsed ? 0 :
                    this.padding
                        + this.contents.height()
                        + this.padding)
    );
    this.bounds.setWidth(this.titleBar.width());
    this.rerender();
    this.handle.fixLayout();
};

// CommentMorph menu:

CommentMorph.prototype.userMenu = function () {
    var menu = new MenuMorph(this);

    menu.addItem(
        "duplicate",
        () => {
            var dup = this.fullCopy(),
                ide = this.parentThatIsA(IDE_Morph),
                blockEditor = this.parentThatIsA(BlockEditorMorph),
                world = this.world();
            dup.id = null;
            dup.pickUp(world);
            // register the drop-origin, so the comment can
            // slide back to its former situation if dropped
            // somewhere where it gets rejected
            if (!ide && blockEditor) {
                ide = blockEditor.target.parentThatIsA(IDE_Morph);
            }
            if (ide) {
                world.hand.grabOrigin = {
                    origin: ide.palette,
                    position: ide.palette.center()
                };
            }
        },
        'make a copy\nand pick it up'
    );
    menu.addItem("delete", function() {
        if (this.id) {
            SnapActions.removeBlock(this);
        } else {
            this.destroy();
        }
    });
    menu.addItem(
        "comment pic...",
        () => {
            var ide = this.parentThatIsA(IDE_Morph);
            ide.saveCanvasAs(
                this.fullImage(),
                (ide.projectName || localize('untitled')) + ' ' +
                    localize('comment pic')
            );
        },
        'save a picture\nof this comment'
    );
    return menu;
};

CommentMorph.prototype.userDestroy = function () {
    this.selectForEdit().destroy(); // enable copy-on-edit
};

// CommentMorph hiding and showing:

/*
    override the inherited behavior to recursively hide/show all
    children, so that my instances get restored correctly when
    switching back out of app mode.
*/

CommentMorph.prototype.hide = function () {
    this.isVisible = false;
    this.changed();
};

CommentMorph.prototype.show = function () {
    this.isVisible = true;
    this.changed();
};

// CommentMorph dragging & dropping

CommentMorph.prototype.prepareToBeGrabbed = function (hand) {
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

CommentMorph.prototype.snapTarget = function (hand) {
    return this.parent.closestBlock(this, hand);
};

CommentMorph.prototype.selectForEdit =
    SyntaxElementMorph.prototype.selectForEdit;

CommentMorph.prototype.snap = function (target) {
    // passing the hand is optional (for when blocks are dragged & dropped)
    var scripts = this.parent;

    if (!(scripts instanceof ScriptsMorph)) {
        return null;
    }

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
        affectedBlocks = top.allChildren().filter(child =>
            child instanceof BlockMorph &&
                child.bottom() > tp &&
                    child.top() < bottom
        );
        rightMost = Math.max.apply(
            null,
            affectedBlocks.map(block => block.right())
        );

        this.setLeft(rightMost + 5);
        if (!ignoreLayer && scripts) {
            scripts.addBack(this); // push to back and show
        }

        if (!this.anchor) {
            this.anchor = new Morph();
            this.anchor.color = this.titleBar.color;
        }
        this.anchor.setPosition(new Point(
            this.block.right(),
            this.top() + this.edge
        ));
        this.anchor.bounds.corner = new Point(
            this.left(),
            this.top() + this.edge + 1
        );
        this.anchor.rerender();
        this.addBack(this.anchor);
    }
};

CommentMorph.prototype.startFollowing = function (topBlock, world) {
    this.align(topBlock);
    world.add(this);
    this.addShadow();
    this.stickyOffset = this.position().subtract(this.block.position());
    this.step = () => {
        if (!this.block) { // kludge - only needed for "redo"
            this.stopFollowing();
            return;
        }
        this.setPosition(this.block.position().add(this.stickyOffset));
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

// ScriptFocusMorph //////////////////////////////////////////////////////////

/*
    I offer keyboard navigation for syntax elements, blocks and scripts:

    activate:
      - shift + click on a scripting pane's background
      - shift + click on any block
      - shift + enter in the IDE's edit mode

    stop editing:
      - left-click on scripting pane's background
      - esc

    navigate among scripts:
      - tab: next script
      - backtab (shift + tab): last script

    start editing a new script:
      - shift + enter

    navigate among commands within a script:
      - down arrow: next command
      - up arrow: last command

    navigate among all elements within a script:
      - right arrow: next element (block or input)
      - left arrow: last element

    move the currently edited script (stack of blocks):
      - shift + arrow keys (left, right, up, down)

    editing scripts:

      - backspace:
        * delete currently focused reporter
        * delete command above current insertion mark (blinking)
        * collapse currently focused variadic input by one element

      - enter:
        * edit currently focused input slot
        * expand currently focused variadic input by one element

      - space:
        * activate currently focused input slot's pull-down menu, if any
        * show a menu of reachable variables for the focused input or reporter

      - any other key:
        start searching for insertable matching blocks

      - in menus triggered by this feature:
        * navigate with up / down arrow keys
        * trigger selection with enter
        * cancel menu with esc

      - in the search bar triggered b this feature:
        * keep typing / deleting to narrow and update matches
        * navigate among shown matches with up / down arrow keys
        * insert selected match at the focus' position with enter
        * cancel searching and inserting with esc

    running the currently edited script:
        * shift+ctrl+enter simulates clicking the edited script with the mouse
*/

// ScriptFocusMorph inherits from BoxMorph:

ScriptFocusMorph.prototype = new BoxMorph();
ScriptFocusMorph.prototype.constructor = ScriptFocusMorph;
ScriptFocusMorph.uber = BoxMorph.prototype;

// ScriptFocusMorph instance creation:

function ScriptFocusMorph(editor, initialElement, position) {
    this.init(editor, initialElement, position);
}

ScriptFocusMorph.prototype.init = function (
    editor,
    initialElement,
    position
) {
    this.editor = editor; // a ScriptsMorph
    this.element = initialElement;
    this.atEnd = false;
    ScriptFocusMorph.uber.init.call(this);
    if (this.element instanceof ScriptsMorph) {
        this.setPosition(position);
    }
};

// ScriptFocusMorph keyboard focus:

ScriptFocusMorph.prototype.getFocus = function (world) {
    if (!world) {world = this.world(); }
    if (world && world.keyboardFocus !== this) {
        world.stopEditing();
    }
    world.keyboardFocus = this;
    this.fixLayout();
    this.editor.updateToolbar();
};

// ScriptFocusMorph layout:

ScriptFocusMorph.prototype.fixLayout = function () {
    this.changed();
    if (this.element instanceof CommandBlockMorph ||
            this.element instanceof CommandSlotMorph ||
            this.element instanceof ScriptsMorph) {
        this.manifestStatement();
    } else {
        this.manifestExpression();
    }
    this.editor.add(this); // come to front
    this.scrollIntoView();
    this.changed();
};

ScriptFocusMorph.prototype.manifestStatement = function () {
    var newScript = this.element instanceof ScriptsMorph,
        y = this.element.top();
    this.border = 0;
    this.edge = 0;
    this.alpha = 1;
    this.color = this.editor.feedbackColor;
    this.bounds.setExtent(new Point(
        newScript ?
                SyntaxElementMorph.prototype.hatWidth : this.element.width(),
        Math.max(
            SyntaxElementMorph.prototype.corner,
            SyntaxElementMorph.prototype.feedbackMinHeight
        )
    ));
    if (this.element instanceof CommandSlotMorph) {
        y += SyntaxElementMorph.prototype.corner;
    } else if (this.atEnd) {
        y = this.element.bottom();
    }
    if (!newScript) {
        this.setPosition(new Point(
            this.element.left(),
            y
        ));
    }
    this.fps = 2;
    this.show();
    this.step = function () {
        this.toggleVisibility();
    };
};

ScriptFocusMorph.prototype.manifestExpression = function () {
    this.edge = SyntaxElementMorph.prototype.rounding;
    this.border = Math.max(
        SyntaxElementMorph.prototype.edge,
        3
    );
    this.color = this.editor.feedbackColor.copy();
    this.color.a = 0.5;
    this.borderColor = this.editor.feedbackColor;

    this.bounds = this.element.fullBounds()
        .expandBy(Math.max(
            SyntaxElementMorph.prototype.edge * 2,
            SyntaxElementMorph.prototype.reporterDropFeedbackPadding
        ));
    this.rerender();
    delete this.fps;
    delete this.step;
    this.show();
};

// ScriptFocusMorph editing

ScriptFocusMorph.prototype.trigger = function () {
    var current = this.element,
        myself = this;

    if (current instanceof MultiArgMorph) {
        if (current.arrows().children[1].isVisible) {
            SnapActions.addListInput(current)
                .then(function() {
                    myself.fixLayout();
                });
        }
        return;
    }
    if (current.parent instanceof TemplateSlotMorph) {
        current.mouseClickLeft();
        return;
    }
    if (current instanceof BooleanSlotMorph) {
        SnapActions.toggleBoolean(current, current.value);
        return;
    }
    if (current instanceof InputSlotMorph) {
        var oldFieldUpdate = current.updateFieldValue;
        current.updateFieldValue = function() {
            var action = oldFieldUpdate.apply(this, arguments);
            if (action) {
                action.then(function() {
                    myself.fixLayout();
                });
            }
            this.updateFieldValue = oldFieldUpdate;
        };

        if (!current.isReadOnly) {
            delete this.fps;
            delete this.step;
            this.hide();
            this.world().onNextStep = () => {
                current.contents().edit();
                current.contents().selectAll();
            };
        } else if (current.choices) {
            current.dropDownMenu(true);
            delete this.fps;
            delete this.step;
            this.hide();
        }
    }
};

ScriptFocusMorph.prototype.menu = function () {
    var current = this.element;
    if (current instanceof InputSlotMorph && current.choices) {
        current.dropDownMenu(true);
        delete this.fps;
        delete this.step;
        this.hide();
    } else {
        this.insertVariableGetter();
    }
};

ScriptFocusMorph.prototype.deleteLastElement = function () {
    var current = this.element,
        myself = this,
        newBlock,
        action;

    if (current.parent instanceof ScriptsMorph) {
        if (this.atEnd || current instanceof ReporterBlockMorph) {
            SnapActions.removeBlock(current)
                .then(function() {
                    myself.element = myself.editor;
                    myself.atEnd = false;
                    myself.editor.adjustBounds();
                    myself.fixLayout();
                });

            return;
        }
    } else if (current instanceof MultiArgMorph) {
        if (current.arrows().children[0].isVisible) {
            action = SnapActions.removeListInput(current);
        }
    } else if (current instanceof BooleanSlotMorph) {
        if (!current.isStatic) {
            action = SnapActions.toggleBoolean(current, false);
        }
    } else if (current instanceof ReporterBlockMorph) {
        if (!current.isTemplate) {
            SnapActions.removeBlock(current)
                .then(function() {
                    myself.lastElement();
                    myself.editor.adjustBounds();
                    myself.fixLayout();
                });
            return;
        }
    } else if (current instanceof CommandBlockMorph) {
        if (this.atEnd) {
            newBlock = current.parent;
            SnapActions.removeBlock(current, true)
                .then(function() {
                    myself.element = newBlock;
                    myself.editor.adjustBounds();
                    myself.fixLayout();
                });
            return;
        } else {
            if (current.parent instanceof CommandBlockMorph) {
                action = SnapActions.removeBlock(current.parent, true);
            }
        }
    }

    if (action) {
        action.then(function() {
            myself.editor.adjustBounds();
            myself.fixLayout();
        });
    }
};

ScriptFocusMorph.prototype.insertBlock =
ScriptFocusMorph.prototype.fillInBlock = function (block) {
    var pb, stage, ide, rcvr, position, isAtEnd, action;
    block.isTemplate = false;
    block.isDraggable = true;

    if (this.element instanceof ScriptsMorph) {
        // Getting position!
        if (block instanceof CommandBlockMorph) {
            if (block.isStop()) {
                position = this.topLeft();
            } else {
                position = new Point(this.left(), this.top() - block.height());
                isAtEnd = true;
            }
        } else {
            position = new Point(this.left(), this.center().y + block.height()/2);
        }
        action = SnapActions.addBlock(block, this.editor.scriptTarget(), position);
    } else if (this.element instanceof CommandBlockMorph) {
        var target;
        if (this.atEnd) {
            target = {
                point: this.element.bottomAttachPoint(),
                element: this.element,
                loc: 'bottom',
                type: 'block'
            };
        } else {
            // to be done: special case if block.isStop()
            pb = this.element.parent;
            if (pb instanceof ScriptsMorph) { // top block
                target = {
                    point: this.element.topAttachPoint(),
                    element: this.element,
                    loc: 'top',
                    type: 'block'
                };
            // the next two branches are just moveBlock
            } else if (pb instanceof CommandSlotMorph) {
                // FIXME: Should I remove the next bit?
                //target = {
                    //point: pb.slotAttachPoint(),
                    //element: pb,
                    //loc: 'bottom',
                    //type: 'slot'
                //};
                pb.nestedBlock(block);
            } else if (pb instanceof RingReporterSlotMorph) {
                block.nextBlock(pb.nestedBlock());
                pb.add(block);
                pb.fixLayout();
            } else if (pb instanceof CommandBlockMorph) {
                target = {
                    point: pb.bottomAttachPoint(),
                    element: pb,
                    loc: 'bottom',
                    type: 'block'
                };
            }
        }
        action = SnapActions.moveBlock(block, target);
    } else if (this.element instanceof CommandSlotMorph) {
        // to be done: special case if block.isStop()
        target = {
            point: this.element.slotAttachPoint(),
            element: this.element,
            loc: 'bottom',
            type: 'slot'
        };
        isAtEnd = true;
        action = SnapActions.moveBlock(block, target);
    } else {
        pb = this.element.parent;
        if (pb instanceof ScriptsMorph) {
            action = SnapActions.replaceBlock(this.element, block);
        } else {
            isAtEnd = true;
            action = SnapActions.moveBlock(block, this.element);
        }
    }

    action.then(block => {
        if (isAtEnd) {
            this.atEnd = true;
        }
        // register generic hat blocks
        if (block.selector === 'receiveCondition') {
            rcvr = this.editor.scriptTarget();
            if (rcvr) {
                stage = rcvr.parentThatIsA(StageMorph);
                if (stage) {
                    stage.enableCustomHatBlocks = true;
                    stage.threads.pauseCustomHatBlocks = false;
                    ide = stage.parentThatIsA(IDE_Morph);
                    if (ide) {
                        ide.controlBar.stopButton.refresh();
                    }
                }
            }
        }
        this.element = block;
        this.fixLayout();

        // experimental: if the inserted block has inputs, go to the first one
        if (block.inputs && block.inputs().length) {
            this.element = block;
            this.atEnd = false;
            this.nextElement();
        }
    });
};

ScriptFocusMorph.prototype.insertVariableGetter = function () {
    var types = this.blockTypes(),
        vars,
        menu = new MenuMorph();
    if (!types || !contains(types, 'reporter')) {
        return;
    }
    vars = InputSlotMorph.prototype.getVarNamesDict.call(this.element);
    Object.keys(vars).forEach(vName => {
        var block = SpriteMorph.prototype.variableBlock(vName);
        block.addShadow(new Point(3, 3));
        menu.addItem(
            block,
            () => {
                block.removeShadow();
                this.insertBlock(block);
            }
        );
    });
    if (menu.items.length > 0) {
        menu.popup(this.world(), this.element.bottomLeft());
        menu.getFocus();
    }
};

ScriptFocusMorph.prototype.stopEditing = function () {
    this.editor.focus = null;
    this.editor.updateToolbar();
    this.world().keyboardFocus = null;
    this.destroy();
};

// ScriptFocusMorph navigation

ScriptFocusMorph.prototype.lastElement = function () {
    var items = this.items(),
        idx;
    if (!items.length) {
        this.shiftScript(new Point(-50, 0));
        return;
    }
    if (this.atEnd) {
        this.element = items[items.length - 1];
        this.atEnd = false;
    } else {
        idx = items.indexOf(this.element) - 1;
        if (idx < 0) {idx = items.length - 1; }
        this.element = items[idx];
    }
    if (this.element instanceof CommandSlotMorph &&
            this.element.nestedBlock()) {
        this.lastElement();
    } else if (this.element instanceof HatBlockMorph) {
        if (items.length > 1) {
            this.lastElement();
        } else {
            this.atEnd = true;
        }
    }
    this.fixLayout();
};

ScriptFocusMorph.prototype.nextElement = function () {
    var items = this.items(), idx, nb;
    if (!items.length) {
        this.shiftScript(new Point(50, 0));
        return;
    }
    idx = items.indexOf(this.element) + 1;
    if (idx >= items.length) {
        idx = 0;
    }
    this.atEnd = false;
    this.element = items[idx];
    if (this.element instanceof CommandSlotMorph) {
        nb = this.element.nestedBlock();
        if (nb) {this.element = nb; }
    } else if (this.element instanceof HatBlockMorph) {
        if (items.length === 1) {
            this.atEnd = true;
        } else {
            this.nextElement();
        }
    }
    this.fixLayout();
};

ScriptFocusMorph.prototype.lastCommand = function () {
    var cm = this.element.parentThatIsA(CommandBlockMorph),
        pb;
    if (!cm) {
        if (this.element instanceof ScriptsMorph) {
            this.shiftScript(new Point(0, -50));
        }
        return;
    }
    if (this.element instanceof CommandBlockMorph) {
        if (this.atEnd) {
            this.atEnd = false;
        } else {
            pb = cm.parent.parentThatIsA(CommandBlockMorph);
            if (pb) {
                this.element = pb;
            } else {
                pb = cm.topBlock().bottomBlock();
                if (pb) {
                    this.element = pb;
                    this.atEnd = true;
                }
            }
        }
    } else {
        this.element = cm;
        this.atEnd = false;
    }
    if (this.element instanceof HatBlockMorph && !this.atEnd) {
        this.lastCommand();
    }
    this.fixLayout();
};

ScriptFocusMorph.prototype.nextCommand = function () {
    var cm = this.element,
        tb,
        nb,
        cs;
    if (cm instanceof ScriptsMorph) {
        this.shiftScript(new Point(0, 50));
        return;
    }
    while (!(cm instanceof CommandBlockMorph)) {
        cm = cm.parent;
        if (cm instanceof ScriptsMorph) {
            return;
        }
    }
    if (this.atEnd) {
        cs = cm.parentThatIsA(CommandSlotMorph);
        if (cs) {
            this.element = cs.parentThatIsA(CommandBlockMorph);
            this.atEnd = false;
            this.nextCommand();
        } else {
            tb = cm.topBlock().parentThatIsA(CommandBlockMorph);
            if (tb) {
                this.element = tb;
                this.atEnd = false;
                if (this.element instanceof HatBlockMorph) {
                    this.nextCommand();
                }
            }
        }
    } else {
        nb = cm.nextBlock();
        if (nb) {
            this.element = nb;
        } else {
            this.element = cm;
            this.atEnd = true;
        }
    }
    this.fixLayout();
};

ScriptFocusMorph.prototype.nextScript = function () {
    var scripts = this.sortedScripts(),
        idx;
    if (scripts.length < 1) {return; }
    if (this.element instanceof ScriptsMorph) {
        this.element = scripts[0];
    }
    idx = scripts.indexOf(this.element.topBlock()) + 1;
    if (idx >= scripts.length) {idx = 0; }
    this.element = scripts[idx];
    this.element.scrollIntoView();
    this.atEnd = false;
    if (this.element instanceof HatBlockMorph) {
        return this.nextElement();
    }
    this.fixLayout();
};

ScriptFocusMorph.prototype.lastScript = function () {
    var scripts = this.sortedScripts(),
        idx;
    if (scripts.length < 1) {return; }
    if (this.element instanceof ScriptsMorph) {
        this.element = scripts[0];
    }
    idx = scripts.indexOf(this.element.topBlock()) - 1;
    if (idx < 0) {idx = scripts.length - 1; }
    this.element = scripts[idx];
    this.element.scrollIntoView();
    this.atEnd = false;
    if (this.element instanceof HatBlockMorph) {
        return this.nextElement();
    }
    this.fixLayout();
};

ScriptFocusMorph.prototype.shiftScript = function (deltaPoint) {
    var myself = this,
        position,
        tb;

    if (this.element instanceof ScriptsMorph) {
        this.moveBy(deltaPoint);
        this.editor.adjustBounds();
        this.fixLayout();
    } else {
        tb = this.element.topBlock();
        if (tb && !(tb instanceof PrototypeHatBlockMorph)) {
            position = tb.topLeft().add(deltaPoint);
            SnapActions.setBlockPosition(tb, position)
                .then(function() {
                    myself.editor.adjustBounds();
                    myself.fixLayout();
                });
        }
    }
};

ScriptFocusMorph.prototype.newScript = function () {
    var pos = this.position();
    if (!(this.element instanceof ScriptsMorph)) {
        pos = this.element.topBlock().fullBounds().bottomLeft().add(
            new Point(0, 50)
        );
    }
    this.setPosition(pos);
    this.element = this.editor;
    this.editor.adjustBounds();
    this.fixLayout();
};

ScriptFocusMorph.prototype.runScript = function () {
    if (this.element instanceof ScriptsMorph) {return; }
    this.element.topBlock().mouseClickLeft();
};

ScriptFocusMorph.prototype.items = function () {
    if (this.element instanceof ScriptsMorph) {return []; }
    var script = this.element.topBlock();
    return script.allChildren().filter(each =>
        each instanceof SyntaxElementMorph &&
            !(each instanceof TemplateSlotMorph) &&
                (!each.isStatic ||
                    each.choices ||
                    each instanceof BooleanSlotMorph ||
                    each instanceof RingMorph ||
                    each instanceof MultiArgMorph ||
                    each instanceof CommandSlotMorph
                )
    );
};

ScriptFocusMorph.prototype.sortedScripts = function () {
    var scripts = this.editor.children.filter(each =>
        each instanceof BlockMorph
    );
    scripts.sort((a, b) =>
        // make sure the prototype hat block always stays on top
        a instanceof PrototypeHatBlockMorph ? 0 : a.top() - b.top()
    );
    return scripts;
};

// ScriptFocusMorph block types

ScriptFocusMorph.prototype.blockTypes = function () {
    // answer an array of possible block types that fit into
    // the current situation, NULL if no block can be inserted

    if (this.element.isTemplate) {return null; }
    if (this.element instanceof ScriptsMorph) {
        return ['hat', 'command', 'reporter', 'predicate', 'ring'];
    }
    if (this.element instanceof HatBlockMorph ||
            this.element instanceof CommandSlotMorph) {
        return ['command'];
    }
    if (this.element instanceof CommandBlockMorph) {
        if (this.atEnd && this.element.isStop()) {
            return null;
        }
        if (this.element.parent instanceof ScriptsMorph) {
            return ['hat', 'command'];
        }
        return ['command'];
    }
    if (this.element instanceof ReporterBlockMorph) {
        if (this.element.getSlotSpec() === '%n') {
            return ['reporter'];
        }
        return ['reporter', 'predicate', 'ring'];
    }
    if (this.element.getSpec() === '%n') {
        return ['reporter'];
    }
    if (this.element.isStatic) {
        return null;
    }
    return ['reporter', 'predicate', 'ring'];
};


// ScriptFocusMorph keyboard events

ScriptFocusMorph.prototype.processKeyDown = function (event) {
    this.processKeyEvent(
        event,
        this.reactToKeyEvent
    );
};

ScriptFocusMorph.prototype.processKeyUp = function (event) {
    nop(event);
};

ScriptFocusMorph.prototype.processKeyPress = function (event) {
    nop(event);
};


ScriptFocusMorph.prototype.processKeyEvent = function (event, action) {
    var keyName, ctrl, shift;

    //console.log(event.keyCode);
    this.world().hand.destroyTemporaries(); // remove result bubbles, if any
    switch (event.keyCode) {
    case 8:
        keyName = 'backspace';
        break;
    case 9:
        keyName = 'tab';
        break;
    case 13:
        keyName = 'enter';
        break;
    case 16:
    case 17:
    case 18:
        return;
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
    }
    ctrl = (event.ctrlKey || event.metaKey) ? 'ctrl ' : '';
    shift = event.shiftKey ? 'shift ' : '';
    keyName = ctrl + shift + keyName;
    action.call(this, keyName);
};

ScriptFocusMorph.prototype.reactToKeyEvent = function (key) {
    var evt = key.toLowerCase(),
        shift = 50,
        types,
        vNames;

    // console.log(evt);
    switch (evt) {
    case 'esc':
        return this.stopEditing();
    case 'enter':
        return this.trigger();
    case 'shift enter':
        return this.newScript();
    case 'ctrl shift enter':
        return this.runScript();
    case 'space':
        return this.menu();
    case 'left arrow':
        return this.lastElement();
    case 'shift left arrow':
        return this.shiftScript(new Point(-shift, 0));
    case 'right arrow':
        return this.nextElement();
    case 'shift right arrow':
        return this.shiftScript(new Point(shift, 0));
    case 'up arrow':
        return this.lastCommand();
    case 'shift up arrow':
        return this.shiftScript(new Point(0, -shift));
    case 'down arrow':
        return this.nextCommand();
    case 'shift down arrow':
        return this.shiftScript(new Point(0, shift));
    case 'tab':
        return this.nextScript();
    case 'shift tab':
        return this.lastScript();
    case 'backspace':
        return this.deleteLastElement();
    case 'ctrl z':
        return SnapUndo.undo(this.editor.owner);
    case 'ctrl y':
    case 'ctrl shift z':
        return SnapUndo.redo(this.editor.owner);
    case 'ctrl [': // ignore the first press of the Mac cmd key
        return;
    default:
        types = this.blockTypes();
        if (!(this.element instanceof ScriptsMorph) &&
                types && contains(types, 'reporter')) {
            vNames = Object.keys(this.element.getVarNamesDict());
        }
        if (types) {
            delete this.fps;
            delete this.step;
            this.show();
            this.editor.scriptTarget().searchBlocks(
                key,
                types,
                vNames,
                this
            );
        }
    }
};


/*
// register examples with the World demo menu
// comment out to shave off a millisecond loading speed ;-)

(function () {
    var h, b, c, ci, cb, cm, cd, co, cl, cu, cs, cmd, rings, rc, scripts;
    // SyntaxElementMorph.prototype.setScale(2.5);

    h = new HatBlockMorph();
    h.setSpec('When %greenflag pressed');

    b = new ReporterBlockMorph(true);
    b.setSpec('%bool');

    c = new CommandBlockMorph();
    c.setSpec('this is a test $globe');

    ci = new CommandBlockMorph();
    ci.setSpec('block with input %s unit %mult%n number');

    cb = new CommandBlockMorph();
    cb.setSpec('bool %b ?');

    cm = new CommandBlockMorph();
    cm.setSpec('month %month');

    cd = new CommandBlockMorph();
    cd.setSpec('direction %dir degrees');

    co = new CommandBlockMorph();
    co.setSpec('object %obj');

    cl = new CommandBlockMorph();
    cl.setSpec('list %l');

    cu = new CommandBlockMorph();
    cu.setSpec('list %upvar');

    cs = new CommandBlockMorph();
    cs.setSpec('control %b %ca');

    cmd = new CommandBlockMorph();
    cmd.setSpec('command %cmdRing');
    
    rings = new CommandBlockMorph();
    rings.setSpec('reporter %repRing predicate %predRing');

    rc = new ReporterBlockMorph();
    rc.setSpec('color %clr');

    scripts = new ScriptsMorph();

    BlockMorph.prototype.addToDemoMenu([
        'Syntax',
        [
            [h, 'hat'],
            [b, 'predicate'],
            [c, 'with label text'],
            [ci, 'editable input slots'],
            [cb, 'Boolean slot'],
            [cm, 'menu input'],
            [cd, 'direction input'],
            [co, 'object input'],
            [cl, 'list input'],
            [cu, 'upvar input'],
            [cs, 'loop input'],
            [cmd, 'cmd ring input'],
            [rings, 'reporter rings input'],
            [rc, 'color input'],
            [scripts, 'scripts']
        ]
    ]);
})();
*/
