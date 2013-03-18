/*

    byob.js

    "build your own blocks" for SNAP!
    based on morphic.js, widgets.js blocks.js, threads.js and objects.js
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
    needs blocks.js, threads.js, objects.js, widgets.js and morphic.js


    hierarchy
    ---------
    the following tree lists all constructors hierarchically,
    indentation indicating inheritance. Refer to this list to get a
    contextual overview:

    BlockLabelFragment
    CustomBlockDefinition

    CommandBlockMorph***
        CustomCommandBlockMorph
        HatBlockMorph***
            PrototypeHatBlockMorph

    DialogBoxMorph**
        BlockDialogMorph
        BlockEditorMorph
        BlockExportDialogMorph
        BlockImportDialogMorph
        InputSlotDialogMorph
        VariableDialogMorph

    ReporterBlockMorph***
        CustomReporterBlockMorph
        JaggedBlockMorph
        

    StringMorph*
        BlockLabelFragmentMorph
        BlockLabelPlaceHolderMorph

    TemplateSlotMorph***
        BlockInputFragmentMorph

    * from morphic.js
    ** from widgets.js
    *** from blocks.js


    toc
    ---
    the following list shows the order in which all constructors are
    defined. Use this list to locate code in this document:

    CustomBlockDefinition
    CustomCommandBlockMorph
    CustomReporterBlockMorph
    JaggedBlockMorph
    BlockDialogMorph
    BlockEditorMorph
    PrototypeHatBlockMorph
    BlockLabelFragmentMorph
    BlockLabelPlaceHolderMorph
    BlockInputFragmentMorph
    InputSlotDialogMorph
    VariableDialogMorph
    BlockExportDialogMorph
    BlockImportDialogMorph
    
*/

/*global modules, CommandBlockMorph, SpriteMorph, TemplateSlotMorph,
StringMorph, Color, DialogBoxMorph, ScriptsMorph, ScrollFrameMorph,
Point, HandleMorph, HatBlockMorph, BlockMorph, detect, List, Process,
AlignmentMorph, ToggleMorph, InputFieldMorph, ReporterBlockMorph,
Context, StringMorph, nop, newCanvas, radians, BoxMorph,
ArrowMorph, PushButtonMorph, contains, InputSlotMorph, ShadowMorph,
ToggleButtonMorph, IDE_Morph, MenuMorph, copy, ToggleElementMorph,
Morph, fontHeight, StageMorph, SyntaxElementMorph, SnapSerializer,
CommentMorph, localize, CSlotMorph*/

// Global stuff ////////////////////////////////////////////////////////

modules.byob = '2013-March-18';

// Declarations

var CustomBlockDefinition;
var CustomCommandBlockMorph;
var CustomReporterBlockMorph;
var BlockDialogMorph;
var BlockEditorMorph;
var PrototypeHatBlockMorph;
var BlockLabelFragment;
var BlockLabelFragmentMorph;
var BlockInputFragmentMorph;
var BlockLabelPlaceHolderMorph;
var InputSlotDialogMorph;
var VariableDialogMorph;
var JaggedBlockMorph;
var BlockExportDialogMorph;
var BlockImportDialogMorph;

// CustomBlockDefinition ///////////////////////////////////////////////

// CustomBlockDefinition instance creation:

function CustomBlockDefinition(spec, receiver) {
    this.body = null; // a Context (i.e. a reified top block)
    this.scripts = [];
    this.category = null;
    this.isGlobal = false;
    this.type = 'command';
    this.spec = spec || '';
    this.declarations = {}; // {'inputName' : [type, default]}

    // don't serialize (not needed for functionality):
    this.receiver = receiver || null; // for serialization only (pointer)
}

// CustomBlockDefinition instantiating blocks

CustomBlockDefinition.prototype.blockInstance = function () {
    var block;
    if (this.type === 'command') {
        block = new CustomCommandBlockMorph(this);
    } else {
        block = new CustomReporterBlockMorph(
            this,
            this.type === 'predicate'
        );
    }
    block.isDraggable = true;
    return block;
};

CustomBlockDefinition.prototype.templateInstance = function () {
    var block;
    block = this.blockInstance();
    block.refreshDefaults();
    block.isDraggable = false;
    block.isTemplate = true;
    return block;
};

CustomBlockDefinition.prototype.prototypeInstance = function () {
    var block, slot, myself = this;

    // make a new block instance and mark it as prototype
    if (this.type === 'command') {
        block = new CustomCommandBlockMorph(this, true);
    } else {
        block = new CustomReporterBlockMorph(
            this,
            this.type === 'predicate',
            true
        );
    }

    // assign slot declarations to prototype inputs
    block.parts().forEach(function (part) {
        if (part instanceof BlockInputFragmentMorph) {
            slot = myself.declarations[part.fragment.labelString];
            if (slot) {
                part.fragment.type = slot[0];
                part.fragment.defaultValue = slot[1];
            }
        }
    });

    return block;
};

// CustomBlockDefinition duplicating

CustomBlockDefinition.prototype.copyAndBindTo = function (sprite) {
    var c = copy(this);

    c.receiver = sprite; // only for (kludgy) serialization
    c.declarations = copy(this.declarations); // might have to go deeper
    c.body = Process.prototype.reify.call(
        null,
        this.body.expression,
        new List(this.inputNames())
    );
    c.body.outerContext = null;

    return c;
};

// CustomBlockDefinition accessing

CustomBlockDefinition.prototype.blockSpec = function () {
    var myself = this,
        ans = [],
        parts = this.parseSpec(this.spec),
        spec;
    parts.forEach(function (part) {
        if (part[0] === '%') {
            spec = myself.typeOf(part.slice(1));
        } else {
            spec = part;
        }
        ans.push(spec);
        ans.push(' ');
    });
    return ''.concat.apply('', ans).trim();
};

CustomBlockDefinition.prototype.helpSpec = function () {
    var ans = [],
        parts = this.parseSpec(this.spec);
    parts.forEach(function (part) {
        if (part[0] !== '%') {
            ans.push(part);
        }
    });
    return ''.concat.apply('', ans).replace(/\?/g, '');
};

CustomBlockDefinition.prototype.typeOf = function (inputName) {
    if (this.declarations[inputName]) {
        return this.declarations[inputName][0];
    }
    return '%s';
};

CustomBlockDefinition.prototype.defaultValueOf = function (inputName) {
    if (this.declarations[inputName]) {
        return this.declarations[inputName][1];
    }
    return '';
};

CustomBlockDefinition.prototype.defaultValueOfInputIdx = function (idx) {
    var inputName = this.inputNames()[idx];
    return this.defaultValueOf(inputName);
};

CustomBlockDefinition.prototype.inputNames = function () {
    var vNames = [],
        parts = this.parseSpec(this.spec);
    parts.forEach(function (part) {
        if (part[0] === '%') {
            vNames.push(part.slice(1));
        }
    });
    return vNames;
};

CustomBlockDefinition.prototype.parseSpec = function (spec) {
    // private
    var parts = [], word = '', i, quoted = false, c;
    for (i = 0; i < spec.length; i += 1) {
        c = spec[i];
        if (c === "'") {
            quoted = !quoted;
        } else if (c === ' ' && !quoted) {
            parts.push(word);
            word = '';
        } else {
            word = word.concat(c);
        }
    }
    parts.push(word);
    return parts;
};

// CustomCommandBlockMorph /////////////////////////////////////////////

// CustomCommandBlockMorph inherits from CommandBlockMorph:

CustomCommandBlockMorph.prototype = new CommandBlockMorph();
CustomCommandBlockMorph.prototype.constructor = CustomCommandBlockMorph;
CustomCommandBlockMorph.uber = CommandBlockMorph.prototype;

// CustomCommandBlockMorph instance creation:

function CustomCommandBlockMorph(definition, isProto) {
    this.init(definition, isProto);
}

CustomCommandBlockMorph.prototype.init = function (definition, isProto) {
    this.definition = definition; // mandatory
    this.isPrototype = isProto || false; // optional

    CustomCommandBlockMorph.uber.init.call(this);

    this.category = definition.category;
    this.selector = 'evaluateCustomBlock';
    if (definition) { // needed for de-serializing
        this.refresh();
    }
};

CustomCommandBlockMorph.prototype.refresh = function () {
    var def = this.definition,
        newSpec = this.isPrototype ?
                def.spec : def.blockSpec(),
        oldInputs;

    this.setCategory(def.category);
    if (this.blockSpec !== newSpec) {
        oldInputs = this.inputs();
        this.setSpec(newSpec);
        this.fixBlockColor();
        this.fixLabelColor();
        this.restoreInputs(oldInputs);
    }

    // find unnahmed upvars and label them
    // to their internal definition (default)
    this.inputs().forEach(function (inp, idx) {
        if (inp instanceof TemplateSlotMorph && inp.contents() === '\u2191') {
            inp.setContents(def.inputNames()[idx]);
        }
    });
};

CustomCommandBlockMorph.prototype.restoreInputs = function (oldInputs) {
    // try to restore my previous inputs when my spec has been changed
    var i = 0,
        old,
        myself = this;

    if (this.isPrototype) {return; }
    this.inputs().forEach(function (inp) {
        old = oldInputs[i];
        if (old instanceof ReporterBlockMorph &&
                (!(inp instanceof TemplateSlotMorph))) {
            myself.silentReplaceInput(inp, old);
        } else if (old instanceof InputSlotMorph
                && inp instanceof InputSlotMorph) {
            inp.setContents(old.evaluate());
        } else if (old instanceof TemplateSlotMorph
                && inp instanceof TemplateSlotMorph) {
            inp.setContents(old.evaluate());
        } else if (old instanceof CSlotMorph
                && inp instanceof CSlotMorph) {
            inp.nestedBlock(old.evaluate());
        }
        i += 1;
    });
};

CustomCommandBlockMorph.prototype.refreshDefaults = function () {
    // fill my editable slots with the defaults specified in my definition
    var inputs = this.inputs(), idx = 0, myself = this;

    inputs.forEach(function (inp) {
        if (inp instanceof InputSlotMorph) {
            inp.setContents(myself.definition.defaultValueOfInputIdx(idx));
        }
        idx += 1;
    });
};

CustomCommandBlockMorph.prototype.refreshPrototype = function () {
    // create my label parts from my (edited) fragments only
    var hat,
        protoSpec,
        frags = [],
        myself = this,
        words,
        newFrag,
        i = 0;

    if (!this.isPrototype) {return null; }

    hat = this.parentThatIsA(PrototypeHatBlockMorph);

    // remember the edited fragments
    this.parts().forEach(function (part) {
        if (!part.fragment.isDeleted) {
            // take into consideration that a fragment may spawn others
            // if it isn't an input label consisting of several words
            if (part.fragment.type) { // marked as input, take label as is
                frags.push(part.fragment);
            } else { // not an input, devide into several non-input fragments
                words = myself.definition.parseSpec(
                    part.fragment.labelString
                );
                words.forEach(function (word) {
                    newFrag = part.fragment.copy();
                    newFrag.labelString = word;
                    frags.push(newFrag);
                });
            }
        }
    });

    // remember the edited prototype spec
    protoSpec = this.specFromFragments();


    // update the prototype's type 
    // and possibly exchange 'this' for 'myself'
    if (this instanceof CustomCommandBlockMorph
            && ((hat.type === 'reporter') || (hat.type === 'predicate'))) {
        myself = new CustomReporterBlockMorph(
            this.definition,
            hat.type === 'predicate',
            true
        );
        hat.silentReplaceInput(this, myself);
    } else if (this instanceof CustomReporterBlockMorph) {
        if (hat.type === 'command') {
            myself = new CustomCommandBlockMorph(
                this.definition,
                true
            );
            hat.silentReplaceInput(this, myself);
        } else {
            this.isPredicate = (hat.type === 'predicate');
            this.drawNew();
        }
    }
    myself.setCategory(hat.blockCategory || 'other');
    hat.fixBlockColor();

    // update the (new) prototype's appearance
    myself.setSpec(protoSpec);

    // update the (new) prototype's (new) fragments
    // with the previously edited ones

    myself.parts().forEach(function (part) {
        if (!(part instanceof BlockLabelPlaceHolderMorph)) {
            if (frags[i]) { // don't delete the default fragment
                part.fragment = frags[i];
            }
            i += 1;
        }
    });

    // refresh slot type indicators
    this.refreshPrototypeSlotTypes();

    hat.fixLayout();
};

CustomCommandBlockMorph.prototype.refreshPrototypeSlotTypes = function () {
    this.parts().forEach(function (part) {
        if (part instanceof BlockInputFragmentMorph) {
            part.template().instantiationSpec = part.contents();
            part.setContents(part.fragment.defTemplateSpecFragment());
        }
    });
    this.fixBlockColor(null, true); // enforce zebra coloring of templates
};


CustomCommandBlockMorph.prototype.inputFragmentNames = function () {
    // for the variable name slot drop-down menu (in the block editor)
    var ans = [];

    this.parts().forEach(function (part) {
        if (!part.fragment.isDeleted && (part.fragment.type)) {
            ans.push(part.fragment.labelString);
        }
    });
    return ans;
};

CustomCommandBlockMorph.prototype.upvarFragmentNames = function () {
    // for the variable name slot drop-down menu (in the block editor)
    var ans = [];

    this.parts().forEach(function (part) {
        if (!part.fragment.isDeleted && (part.fragment.type === '%upvar')) {
            ans.push(part.fragment.labelString);
        }
    });
    return ans;
};

CustomCommandBlockMorph.prototype.upvarFragmentName = function (idx) {
    // for block prototypes while they are being edited
    return this.upvarFragmentNames()[idx] || '\u2191';
};

CustomCommandBlockMorph.prototype.specFromFragments = function () {
    // for block prototypes while they are being edited
    var ans = '';

    this.parts().forEach(function (part) {
        if (!part.fragment.isDeleted) {
            ans = ans + part.fragment.defSpecFragment() + ' ';
        }
    });
    return ans.trim();
};

CustomCommandBlockMorph.prototype.blockSpecFromFragments = function () {
    // for block instances while their prototype is being edited
    var ans = '';

    this.parts().forEach(function (part) {
        if (!part.fragment.isDeleted) {
            ans = ans + part.fragment.blockSpecFragment() + ' ';
        }
    });
    return ans.trim();
};

CustomCommandBlockMorph.prototype.declarationsFromFragments = function () {
    // format for type declarations: {inputName : [type, default]}
    var ans = {};

    this.parts().forEach(function (part) {
        if (part instanceof BlockInputFragmentMorph) {
            ans[part.fragment.labelString] =
                [part.fragment.type, part.fragment.defaultValue];
        }
    });
    return ans;
};

CustomCommandBlockMorph.prototype.parseSpec = function (spec) {
    if (!this.isPrototype) {
        return CustomCommandBlockMorph.uber.parseSpec.call(this, spec);
    }
    return this.definition.parseSpec.call(this, spec);
};

CustomCommandBlockMorph.prototype.mouseClickLeft = function () {
    if (!this.isPrototype) {
        return CustomCommandBlockMorph.uber.mouseClickLeft.call(this);
    }
    this.edit();
};

CustomCommandBlockMorph.prototype.edit = function () {
    var myself = this, block, hat;

    if (this.isPrototype) {
        block = this.definition.blockInstance();
        block.addShadow();
        hat = this.parentThatIsA(PrototypeHatBlockMorph);
        new BlockDialogMorph(
            null,
            function (definition) {
                if (definition) { // temporarily update everything
                    hat.blockCategory = definition.category;
                    hat.type = definition.type;
                    myself.refreshPrototype();
                }
            },
            myself
        ).openForChange(
            'Change block',
            hat.blockCategory,
            hat.type,
            myself.world(),
            block.fullImage(),
            myself.isInUse()
        );
    } else {
        new BlockEditorMorph(this.definition, this.receiver()).popUp();
    }
};

CustomCommandBlockMorph.prototype.labelPart = function (spec) {
    var part;

    if (!this.isPrototype) {
        return CustomCommandBlockMorph.uber.labelPart.call(this, spec);
    }
    if ((spec[0] === '%') && (spec.length > 1)) {
        part = new BlockInputFragmentMorph(spec.slice(1));
    } else {
        part = new BlockLabelFragmentMorph(spec);
        part.fontSize = this.fontSize;
        part.color = new Color(255, 255, 255);
        part.isBold = true;
        part.shadowColor = this.color.darker(this.labelContrast);
        part.shadowOffset = this.embossing;
        part.drawNew();
    }
    return part;
};

CustomCommandBlockMorph.prototype.placeHolder = function () {
    var part;

    part = new BlockLabelPlaceHolderMorph();
    part.fontSize = this.fontSize * 1.4;
    part.color = new Color(45, 45, 45);
    part.drawNew();
    return part;
};

CustomCommandBlockMorph.prototype.attachTargets = function () {
    if (this.isPrototype) {
        return [];
    }
    return CustomCommandBlockMorph.uber.attachTargets.call(this);
};

CustomCommandBlockMorph.prototype.isInUse = function () {
    // anser true if an instance of my definition is found
    // in any of my receiver's scripts or block definitions
    return this.receiver().usesBlockInstance(this.definition);
};

// CustomCommandBlockMorph menu:

CustomCommandBlockMorph.prototype.userMenu = function () {
    var menu;

    if (this.isPrototype) {
        menu = new MenuMorph(this);
        menu.addItem(
            "script pic...",
            function () {
                window.open(this.topBlock().fullImage().toDataURL());
            },
            'open a new window\nwith a picture of this script'
        );
    } else {
        menu = this.constructor.uber.userMenu.call(this);
        if (!menu) {
            menu = new MenuMorph(this);
        } else {
            menu.addLine();
        }
        // menu.addItem("export definition...", 'exportBlockDefinition');
        menu.addItem("delete block definition...", 'deleteBlockDefinition');
    }
    menu.addItem("edit...", 'edit'); // works also for prototypes
    return menu;
};

CustomCommandBlockMorph.prototype.exportBlockDefinition = function () {
    var xml = new SnapSerializer().serialize(this.definition);
    window.open('data:text/xml,' + encodeURIComponent(xml));
};

CustomCommandBlockMorph.prototype.deleteBlockDefinition = function () {
    var idx, rcvr, stage, ide, myself = this, block;
    if (this.isPrototype) {
        return null; // under construction...
    }
    block = myself.definition.blockInstance();
    block.addShadow();
    new DialogBoxMorph(
        this,
        function () {
            rcvr = myself.receiver();
            rcvr.deleteAllBlockInstances(myself.definition);
            if (myself.definition.isGlobal) {
                stage = rcvr.parentThatIsA(StageMorph);
                idx = stage.globalBlocks.indexOf(myself.definition);
                if (idx !== -1) {
                    stage.globalBlocks.splice(idx, 1);
                }
            } else {
                idx = rcvr.customBlocks.indexOf(myself.definition);
                if (idx !== -1) {
                    rcvr.customBlocks.splice(idx, 1);
                }
            }
            ide = rcvr.parentThatIsA(IDE_Morph);
            if (ide) {
                ide.flushPaletteCache();
                ide.refreshPalette();
            }
        },
        this
    ).askYesNo(
        'Delete Custom Block',
        localize('block deletion dialog text'), // long string lookup
        myself.world(),
        block.fullImage()
    );
};

// CustomReporterBlockMorph ////////////////////////////////////////////

// CustomReporterBlockMorph inherits from ReporterBlockMorph:

CustomReporterBlockMorph.prototype = new ReporterBlockMorph();
CustomReporterBlockMorph.prototype.constructor = CustomReporterBlockMorph;
CustomReporterBlockMorph.uber = ReporterBlockMorph.prototype;

// CustomReporterBlockMorph instance creation:

function CustomReporterBlockMorph(definition, isPredicate, isProto) {
    this.init(definition, isPredicate, isProto);
}

CustomReporterBlockMorph.prototype.init = function (
    definition,
    isPredicate,
    isProto
) {
    this.definition = definition; // mandatory
    this.isPrototype = isProto || false; // optional

    CustomReporterBlockMorph.uber.init.call(this, isPredicate);

    this.category = definition.category;
    this.selector = 'evaluateCustomBlock';
    if (definition) { // needed for de-serializing
        this.refresh();
    }
};

CustomReporterBlockMorph.prototype.refresh = function () {
    CustomCommandBlockMorph.prototype.refresh.call(this);
    if (!this.isPrototype) {
        this.isPredicate = (this.definition.type === 'predicate');
    }
    this.drawNew();
};

CustomReporterBlockMorph.prototype.mouseClickLeft = function () {
    if (!this.isPrototype) {
        return CustomReporterBlockMorph.uber.mouseClickLeft.call(this);
    }
    this.edit();
};

CustomReporterBlockMorph.prototype.placeHolder
    = CustomCommandBlockMorph.prototype.placeHolder;

CustomReporterBlockMorph.prototype.parseSpec
    = CustomCommandBlockMorph.prototype.parseSpec;

CustomReporterBlockMorph.prototype.edit
    = CustomCommandBlockMorph.prototype.edit;

CustomReporterBlockMorph.prototype.labelPart
    = CustomCommandBlockMorph.prototype.labelPart;

CustomReporterBlockMorph.prototype.upvarFragmentNames
    = CustomCommandBlockMorph.prototype.upvarFragmentNames;

CustomReporterBlockMorph.prototype.upvarFragmentName
    = CustomCommandBlockMorph.prototype.upvarFragmentName;

CustomReporterBlockMorph.prototype.inputFragmentNames
    = CustomCommandBlockMorph.prototype.inputFragmentNames;

CustomReporterBlockMorph.prototype.specFromFragments
    = CustomCommandBlockMorph.prototype.specFromFragments;

CustomReporterBlockMorph.prototype.blockSpecFromFragments
    = CustomCommandBlockMorph.prototype.blockSpecFromFragments;

CustomReporterBlockMorph.prototype.declarationsFromFragments
    = CustomCommandBlockMorph.prototype.declarationsFromFragments;

CustomReporterBlockMorph.prototype.refreshPrototype
    = CustomCommandBlockMorph.prototype.refreshPrototype;

CustomReporterBlockMorph.prototype.refreshPrototypeSlotTypes
    = CustomCommandBlockMorph.prototype.refreshPrototypeSlotTypes;

CustomReporterBlockMorph.prototype.restoreInputs
    = CustomCommandBlockMorph.prototype.restoreInputs;

CustomReporterBlockMorph.prototype.refreshDefaults
    = CustomCommandBlockMorph.prototype.refreshDefaults;

CustomReporterBlockMorph.prototype.isInUse
    = CustomCommandBlockMorph.prototype.isInUse;

// CustomReporterBlockMorph menu:

CustomReporterBlockMorph.prototype.userMenu
    = CustomCommandBlockMorph.prototype.userMenu;

CustomReporterBlockMorph.prototype.deleteBlockDefinition
    = CustomCommandBlockMorph.prototype.deleteBlockDefinition;


// JaggedBlockMorph ////////////////////////////////////////////////////

/*
    I am a reporter block with jagged left and right edges conveying the
    appearance of having the broken out of a bigger block. I am used to
    display input types in the long form input dialog.
*/

// JaggedBlockMorph inherits from ReporterBlockMorph:

JaggedBlockMorph.prototype = new ReporterBlockMorph();
JaggedBlockMorph.prototype.constructor = JaggedBlockMorph;
JaggedBlockMorph.uber = ReporterBlockMorph.prototype;

// JaggedBlockMorph preferences settings:

JaggedBlockMorph.prototype.jag = 5;

// JaggedBlockMorph instance creation:

function JaggedBlockMorph(spec) {
    this.init(spec);
}

JaggedBlockMorph.prototype.init = function (spec) {
    JaggedBlockMorph.uber.init.call(this);
    if (spec) {this.setSpec(spec); }
    if (spec === '%cs') {
        this.minWidth = 25;
        this.fixLayout();
    }
};

// JaggedBlockMorph drawing:

JaggedBlockMorph.prototype.drawNew = function () {
    var context;

    this.cachedClr = this.color.toString();
    this.cachedClrBright = this.bright();
    this.cachedClrDark = this.dark();
    this.image = newCanvas(this.extent());
    context = this.image.getContext('2d');
    context.fillStyle = this.cachedClr;

    this.drawBackground(context);
    this.drawEdges(context);

    // erase holes
    this.eraseHoles(context);
};

JaggedBlockMorph.prototype.drawBackground = function (context) {
    var w = this.width(),
        h = this.height(),
        jags = Math.round(h / this.jag),
        delta = h / jags,
        i,
        y;

    context.fillStyle = this.cachedClr;
    context.beginPath();

    context.moveTo(0, 0);
    context.lineTo(w, 0);

    y = 0;
    for (i = 0; i < jags; i += 1) {
        y += delta / 2;
        context.lineTo(w - this.jag / 2, y);
        y += delta / 2;
        context.lineTo(w, y);
    }

    context.lineTo(0, h);
    y = h;
    for (i = 0; i < jags; i += 1) {
        y -= delta / 2;
        context.lineTo(this.jag / 2, y);
        y -= delta / 2;
        context.lineTo(0, y);
    }

    context.closePath();
    context.fill();
};

JaggedBlockMorph.prototype.drawEdges = function (context) {
    var w = this.width(),
        h = this.height(),
        jags = Math.round(h / this.jag),
        delta = h / jags,
        shift = this.edge / 2,
        gradient,
        i,
        y;

    context.lineWidth = this.edge;
    context.lineJoin = 'round';
    context.lineCap = 'round';

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
    context.moveTo(shift, shift);
    context.lineTo(w - shift, shift);
    context.stroke();

    y = 0;
    for (i = 0; i < jags; i += 1) {
        context.strokeStyle = this.cachedClrDark;
        context.beginPath();
        context.moveTo(w - shift, y);
        y += delta / 2;
        context.lineTo(w - this.jag / 2 - shift, y);
        context.stroke();
        y += delta / 2;
    }

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
    context.moveTo(w - shift, h - shift);
    context.lineTo(shift, h - shift);
    context.stroke();

    y = h;
    for (i = 0; i < jags; i += 1) {
        context.strokeStyle = this.cachedClrBright;
        context.beginPath();
        context.moveTo(shift, y);
        y -= delta / 2;
        context.lineTo(this.jag / 2 + shift, y);
        context.stroke();
        y -= delta / 2;
    }
};

// BlockDialogMorph ////////////////////////////////////////////////////

// BlockDialogMorph inherits from DialogBoxMorph:

BlockDialogMorph.prototype = new DialogBoxMorph();
BlockDialogMorph.prototype.constructor = BlockDialogMorph;
BlockDialogMorph.uber = DialogBoxMorph.prototype;

// BlockDialogMorph instance creation:

function BlockDialogMorph(target, action, environment) {
    this.init(target, action, environment);
}

BlockDialogMorph.prototype.init = function (target, action, environment) {
    // additional properties:
    this.blockType = 'command';
    this.category = 'other';
    this.isGlobal = true;
    this.types = null;
    this.categories = null;

    // initialize inherited properties:
    BlockDialogMorph.uber.init.call(
        this,
        target,
        action,
        environment
    );

    // override inherited properites:
    this.types = new AlignmentMorph('row', this.padding);
    this.add(this.types);
    this.scopes = new AlignmentMorph('row', this.padding);
    this.add(this.scopes);

    this.categories = new BoxMorph();
    this.categories.color = SpriteMorph.prototype.paletteColor.lighter(8);
    this.categories.borderColor = this.categories.color.lighter(40);
    this.createCategoryButtons();
    this.fixCategoriesLayout();
    this.add(this.categories);

    this.createTypeButtons();
    this.createScopeButtons();
    this.fixLayout();
};

BlockDialogMorph.prototype.openForChange = function (
    title,
    category,
    type,
    world,
    pic,
    preventTypeChange // <bool>
) {
    var clr = SpriteMorph.prototype.blockColor[category];
    this.category = category;
    this.blockType = type;

    this.categories.children.forEach(function (each) {
        each.refresh();
    });
    this.types.children.forEach(function (each) {
        each.setColor(clr);
        each.refresh();
    });

    this.labelString = title;
    this.createLabel();
    if (pic) {this.setPicture(pic); }
    this.addButton('ok', 'OK');
    this.addButton('cancel', 'Cancel');
    if (preventTypeChange) {
        this.types.destroy();
        this.types = null;
    }
    this.scopes.destroy();
    this.scopes = null;
    this.fixLayout();
    this.drawNew();
    if (world) {
        world.add(this);
        this.setCenter(world.center());
        this.edit();
    }
};

// category buttons

BlockDialogMorph.prototype.createCategoryButtons = function () {
    var myself = this,
        oldFlag = Morph.prototype.trackChanges;

    Morph.prototype.trackChanges = false;
    SpriteMorph.prototype.categories.forEach(function (cat) {
        myself.addCategoryButton(cat);
    });
    Morph.prototype.trackChanges = oldFlag;
};

BlockDialogMorph.prototype.addCategoryButton = function (category) {
    var labelWidth = 75,
        myself = this,
        colors = [
            SpriteMorph.prototype.paletteColor,
            SpriteMorph.prototype.paletteColor.darker(50),
            SpriteMorph.prototype.blockColor[category]
        ],
        button;

    button = new ToggleButtonMorph(
        colors,
        this, // this block dialog box is the target
        function () {
            myself.category = category;
            myself.categories.children.forEach(function (each) {
                each.refresh();
            });
            if (myself.types) {
                myself.types.children.forEach(function (each) {
                    each.setColor(colors[2]);
                });
            }
            myself.edit();
        },
        category[0].toUpperCase().concat(category.slice(1)), // UCase label
        function () {return myself.category === category; }, // query
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
    button.labelColor = new Color(255, 255, 255);
    button.contrast = this.buttonContrast;
    button.fixLayout();
    button.refresh();
    this.categories.add(button);
    return button;
};

BlockDialogMorph.prototype.fixCategoriesLayout = function () {
    var buttonWidth = this.categories.children[0].width(), // all the same
        buttonHeight = this.categories.children[0].height(), // all the same
        xPadding = 15,
        yPadding = 2,
        border = 10, // this.categories.border,
        rows =  Math.ceil((this.categories.children.length) / 2),
        l = this.categories.left(),
        t = this.categories.top(),
        i = 0,
        row,
        col,
        oldFlag = Morph.prototype.trackChanges;

    Morph.prototype.trackChanges = false;

    this.categories.children.forEach(function (button) {
        i += 1;
        row = Math.ceil(i / 2);
        col = 2 - (i % 2);
        button.setPosition(new Point(
            l + (col * xPadding + ((col - 1) * buttonWidth)),
            t + (row * yPadding + ((row - 1) * buttonHeight) + border)
        ));
    });

    this.categories.setExtent(new Point(
        3 * xPadding + 2 * buttonWidth,
        (rows + 1) * yPadding + rows * buttonHeight + 2 * border
    ));

    Morph.prototype.trackChanges = oldFlag;
    this.categories.changed();
};

// type radio buttons

BlockDialogMorph.prototype.createTypeButtons = function () {
    var block,
        myself = this,
        clr = SpriteMorph.prototype.blockColor[this.category];


    block = new CommandBlockMorph();
    block.setColor(clr);
    block.setSpec(localize('Command'));
    this.addBlockTypeButton(
        function () {myself.setType('command'); },
        block,
        function () {return myself.blockType === 'command'; }
    );

    block = new ReporterBlockMorph();
    block.setColor(clr);
    block.setSpec(localize('Reporter'));
    this.addBlockTypeButton(
        function () {myself.setType('reporter'); },
        block,
        function () {return myself.blockType === 'reporter'; }
    );

    block = new ReporterBlockMorph(true);
    block.setColor(clr);
    block.setSpec(localize('Predicate'));
    this.addBlockTypeButton(
        function () {myself.setType('predicate'); },
        block,
        function () {return myself.blockType === 'predicate'; }
    );
};

BlockDialogMorph.prototype.addBlockTypeButton = function (
    action,
    element,
    query
) {
    var button = new ToggleElementMorph(
        this,
        action,
        element,
        query,
        null,
        null,
        'rebuild'
    );
    button.refresh();
    this.types.add(button);
    return button;
};

BlockDialogMorph.prototype.addTypeButton = function (action, label, query) {
    var button = new ToggleMorph(
        'radiobutton',
        this,
        action,
        label,
        query
    );
    button.edge = this.buttonEdge / 2;
    button.outline = this.buttonOutline / 2;
    button.outlineColor = this.buttonOutlineColor;
    button.outlineGradient = this.buttonOutlineGradient;
    button.contrast = this.buttonContrast;

    button.drawNew();
    button.fixLayout();
    this.types.add(button);
    return button;
};

BlockDialogMorph.prototype.setType = function (blockType) {
    this.blockType = blockType || this.blockType;
    this.types.children.forEach(function (c) {
        c.refresh();
    });
    this.edit();
};

// scope radio buttons

BlockDialogMorph.prototype.createScopeButtons = function () {
    var myself = this;

    this.addScopeButton(
        function () {myself.setScope('gobal'); },
        "for all sprites",
        function () {return myself.isGlobal; }
    );
    this.addScopeButton(
        function () {myself.setScope('local'); },
        "for this sprite only",
        function () {return !myself.isGlobal; }
    );
};

BlockDialogMorph.prototype.addScopeButton = function (action, label, query) {
    var button = new ToggleMorph(
        'radiobutton',
        this,
        action,
        label,
        query
    );
    button.edge = this.buttonEdge / 2;
    button.outline = this.buttonOutline / 2;
    button.outlineColor = this.buttonOutlineColor;
    button.outlineGradient = this.buttonOutlineGradient;
    button.contrast = this.buttonContrast;

    button.drawNew();
    button.fixLayout();
    this.scopes.add(button);
    return button;
};


BlockDialogMorph.prototype.setScope = function (varType) {
    this.isGlobal = (varType === 'gobal');
    this.scopes.children.forEach(function (c) {
        c.refresh();
    });
    this.edit();
};

// other ops

BlockDialogMorph.prototype.getInput = function () {
    var spec, def;
    if (this.body instanceof InputFieldMorph) {
        spec = this.normalizeSpaces(this.body.getValue());
    }
    def = new CustomBlockDefinition(spec);
    def.type = this.blockType;
    def.category = this.category;
    def.isGlobal = this.isGlobal;
    return def;
};

BlockDialogMorph.prototype.fixLayout = function () {
    var th = fontHeight(this.titleFontSize) + this.titlePadding * 2;

    if (this.body) {
        this.body.setPosition(this.position().add(new Point(
            this.padding,
            th + this.padding
        )));
        this.silentSetWidth(this.body.width() + this.padding * 2);
        this.silentSetHeight(
            this.body.height()
                + this.padding * 2
                + th
        );
        if (this.categories) {
            this.categories.setCenter(this.body.center());
            this.categories.setTop(this.body.top());
            this.body.setTop(this.categories.bottom() + this.padding);
            this.silentSetHeight(
                this.height()
                    + this.categories.height()
                    + this.padding
            );
        }
    } else if (this.head) { // when changing an existing prototype    
        if (this.types) {
            this.types.fixLayout();
            this.silentSetWidth(
                Math.max(this.types.width(), this.head.width())
                    + this.padding * 2
            );
        } else {
            this.silentSetWidth(
                Math.max(this.categories.width(), this.head.width())
                    + this.padding * 2
            );
        }
        this.head.setCenter(this.center());
        this.head.setTop(th + this.padding);
        this.silentSetHeight(
            this.head.height()
                + this.padding * 2
                + th
        );
        if (this.categories) {
            this.categories.setCenter(this.center());
            this.categories.setTop(this.head.bottom() + this.padding);
            this.silentSetHeight(
                this.height()
                    + this.categories.height()
                    + this.padding
            );
        }
    }

    if (this.label) {
        this.label.setCenter(this.center());
        this.label.setTop(this.top() + (th - this.label.height()) / 2);
    }

    if (this.types) {
        this.types.fixLayout();
        this.silentSetHeight(
            this.height()
                    + this.types.height()
                    + this.padding
        );
        this.silentSetWidth(Math.max(
            this.width(),
            this.types.width() + this.padding * 2
        ));
        this.types.setCenter(this.center());
        if (this.body) {
            this.types.setTop(this.body.bottom() + this.padding);
        } else if (this.categories) {
            this.types.setTop(this.categories.bottom() + this.padding);
        }
    }

    if (this.scopes) {
        this.scopes.fixLayout();
        this.silentSetHeight(
            this.height()
                    + this.scopes.height()
                    + (this.padding / 3)
        );
        this.silentSetWidth(Math.max(
            this.width(),
            this.scopes.width() + this.padding * 2
        ));
        this.scopes.setCenter(this.center());
        if (this.types) {
            this.scopes.setTop(this.types.bottom() + (this.padding / 3));
        }
    }

    if (this.buttons && (this.buttons.children.length > 0)) {
        this.buttons.fixLayout();
        this.silentSetHeight(
            this.height()
                    + this.buttons.height()
                    + this.padding
        );
        this.buttons.setCenter(this.center());
        this.buttons.setBottom(this.bottom() - this.padding);
    }
};

// BlockEditorMorph ////////////////////////////////////////////////////

// BlockEditorMorph inherits from DialogBoxMorph:

BlockEditorMorph.prototype = new DialogBoxMorph();
BlockEditorMorph.prototype.constructor = BlockEditorMorph;
BlockEditorMorph.uber = DialogBoxMorph.prototype;

// BlockEditorMorph instance creation:

function BlockEditorMorph(definition, target) {
    this.init(definition, target);
}

BlockEditorMorph.prototype.init = function (definition, target) {
    var scripts, proto, scriptsFrame, block, myself = this;

    // additional properties:
    this.definition = definition;
    this.handle = null;

    // initialize inherited properties:
    BlockEditorMorph.uber.init.call(
        this,
        target,
        function () {myself.updateDefinition(); },
        target
    );

    // override inherited properites:
    this.labelString = 'Block Editor';
    this.createLabel();

    // create scripting area
    scripts = new ScriptsMorph(target);
    scripts.allowsStickyComments = false;
    scripts.isDraggable = false;
    scripts.color = new Color(71, 71, 71);
    scripts.texture = 'scriptsPaneTexture.gif';
    scripts.cleanUpMargin = 10;

    proto = new PrototypeHatBlockMorph(this.definition);
    proto.setPosition(scripts.position().add(10));

    if (definition.body !== null) {
        proto.nextBlock(definition.body.expression.fullCopy());
    }

    scripts.add(proto);
    proto.fixBlockColor(null, true);

    this.definition.scripts.forEach(function (element) {
        block = element.fullCopy();
        block.setPosition(scripts.position().add(element.position()));
        scripts.add(block);
    });

    scriptsFrame = new ScrollFrameMorph(scripts);
    scriptsFrame.padding = 10;
    scriptsFrame.growth = 50;
    scriptsFrame.isDraggable = false;
    scriptsFrame.acceptsDrops = false;
    scriptsFrame.contents.acceptsDrops = true;
    scripts.scrollFrame = scriptsFrame;

    this.addBody(scriptsFrame);
    this.addButton('ok', 'OK');
    this.addButton('updateDefinition', 'Apply');
    this.addButton('cancel', 'Cancel');

    this.setExtent(new Point(375, 300));
    this.fixLayout();
    proto.children[0].fixLayout();
    scripts.fixMultiArgs();
};

BlockEditorMorph.prototype.popUp = function () {
    var world = this.target.world();

    if (world) {
        world.add(this);
        world.keyboardReceiver = this;
        this.handle = new HandleMorph(
            this,
            280,
            220,
            this.corner,
            this.corner
        );
        this.setCenter(world.center());
    }
};

// BlockEditorMorph ops

BlockEditorMorph.prototype.accept = function () {
    // check DialogBoxMorph comment for accept()
    if (this.action) {
        if (typeof this.target === 'function') {
            if (typeof this.action === 'function') {
                this.target.call(this.environment, this.action.call());
            } else {
                this.target.call(this.environment, this.action);
            }
        } else {
            if (typeof this.action === 'function') {
                this.action.call(this.target, this.getInput());
            } else { // assume it's a String
                this.target[this.action](this.getInput());
            }
        }
    }
    this.close();
};

BlockEditorMorph.prototype.cancel = function () {
    //this.refreshAllBlockInstances();
    this.close();
};

BlockEditorMorph.prototype.close = function () {
    // allow me to disappear only when name collisions
    // have been resolved
    var doubles, block,
        myself = this;
    doubles = this.target.doubleDefinitionsFor(this.definition);
    if (doubles.length > 0) {
        block = doubles[0].blockInstance();
        block.addShadow();
        new DialogBoxMorph(this, 'consolidateDoubles', this).askYesNo(
            'Same Named Blocks',
            'Another custom block with this name exists.\n'
                + 'Would you like to replace it?',
            myself.world(),
            block.fullImage()
        );
        return;
    }
    this.destroy();
};

BlockEditorMorph.prototype.consolidateDoubles = function () {
    this.target.replaceDoubleDefinitionsFor(this.definition);
    this.destroy();
};

BlockEditorMorph.prototype.refreshAllBlockInstances = function () {
    var template = this.target.paletteBlockInstance(this.definition);

    this.target.allBlockInstances(this.definition).forEach(
        function (block) {
            block.refresh();
        }
    );
    if (template) {
        template.refreshDefaults();
    }
};

BlockEditorMorph.prototype.updateDefinition = function () {
    var head, ide,
        pos = this.body.contents.position(),
        element,
        myself = this;

    this.definition.receiver = this.target; // only for serialization
    this.definition.spec = this.prototypeSpec();
    this.definition.declarations = this.prototypeSlots();
    this.definition.scripts = [];

    this.body.contents.children.forEach(function (morph) {
        if (morph instanceof PrototypeHatBlockMorph) {
            head = morph;
        } else if (morph instanceof BlockMorph ||
                morph instanceof CommentMorph) {
            element = morph.fullCopy();
            element.parent = null;
            element.setPosition(morph.position().subtract(pos));
            myself.definition.scripts.push(element);
        }
    });

    if (head) {
        this.definition.category = head.blockCategory;
        this.definition.type = head.type;
    }

    this.definition.body = this.context(head);
    this.refreshAllBlockInstances();

    ide = this.target.parentThatIsA(IDE_Morph);
    ide.flushPaletteCache();
    ide.refreshPalette();
};

BlockEditorMorph.prototype.context = function (prototypeHat) {
    // answer my script reified for deferred execution
    // if no prototypeHat is given, my body is scanned
    var head, topBlock, proto, stackFrame;

    head = prototypeHat || detect(
        this.body.contents.children,
        function (c) {return c instanceof PrototypeHatBlockMorph; }
    );
    topBlock = head.nextBlock();
    if (topBlock === null) {
        return null;
    }
    proto = head.parts()[0];
    stackFrame = Process.prototype.reify.call(
        null,
        topBlock,
        new List(this.definition.inputNames()),
        true // ignore empty slots for custom block reification
    );
    stackFrame.outerContext = null; //;
    return stackFrame;
};

BlockEditorMorph.prototype.prototypeSpec = function () {
    // answer the spec represented by my (edited) block prototype
    return detect(
        this.body.contents.children,
        function (c) {return c instanceof PrototypeHatBlockMorph; }
    ).parts()[0].specFromFragments();
};

BlockEditorMorph.prototype.prototypeSlots = function () {
    // answer the slot declarations from my (edited) block prototype
    return detect(
        this.body.contents.children,
        function (c) {return c instanceof PrototypeHatBlockMorph; }
    ).parts()[0].declarationsFromFragments();
};

// BlockEditorMorph layout

BlockEditorMorph.prototype.fixLayout = function () {
    var th = fontHeight(this.titleFontSize) + this.titlePadding * 2;

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
    }

    if (this.label) {
        this.label.setCenter(this.center());
        this.label.setTop(this.top() + (th - this.label.height()) / 2);
    }

    if (this.buttons && (this.buttons.children.length > 0)) {
        this.buttons.setCenter(this.center());
        this.buttons.setBottom(this.bottom() - this.padding);
    }
};

// PrototypeHatBlockMorph /////////////////////////////////////////////

// PrototypeHatBlockMorph inherits from HatBlockMorph:

PrototypeHatBlockMorph.prototype = new HatBlockMorph();
PrototypeHatBlockMorph.prototype.constructor = PrototypeHatBlockMorph;
PrototypeHatBlockMorph.uber = HatBlockMorph.prototype;

// PrototypeHatBlockMorph instance creation:

function PrototypeHatBlockMorph(definition) {
    this.init(definition);
}

PrototypeHatBlockMorph.prototype.init = function (definition) {
    var proto = definition.prototypeInstance();

    this.definition = definition;

    // additional attributes to store edited data
    this.blockCategory = definition ? definition.category : null;
    this.type = definition ? definition.type : null;

    // init inherited stuff
    HatBlockMorph.uber.init.call(this);
    this.color = SpriteMorph.prototype.blockColor.control;
    this.category = 'control';
    this.add(proto);
    proto.refreshPrototypeSlotTypes(); // show slot type indicators
    this.fixLayout();
};

PrototypeHatBlockMorph.prototype.mouseClickLeft = function () {
    // relay the mouse click to my prototype block to
    // pop-up a Block Dialog

    this.children[0].mouseClickLeft();
};

PrototypeHatBlockMorph.prototype.userMenu = function () {
    return this.children[0].userMenu();
};

// PrototypeHatBlockMorph zebra coloring

PrototypeHatBlockMorph.prototype.fixBlockColor = function (
    nearestBlock,
    isForced
) {
    var nearest = this.children[0] || nearestBlock;

    if (!this.zebraContrast && !isForced) {
        return;
    }
    if (!this.zebraContrast && isForced) {
        return this.forceNormalColoring();
    }

    if (nearest.category === this.category) {
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

// BlockLabelFragment //////////////////////////////////////////////////

// BlockLabelFragment instance creation:

function BlockLabelFragment(labelString) {
    this.labelString = labelString || '';
    this.type = '%s';    // null for label, a spec for an input
    this.defaultValue = '';
    this.isDeleted = false;
}

// accessing

BlockLabelFragment.prototype.defSpecFragment = function () {
    // answer a string representing my prototype's spec
    var pref = this.type ? '%\'' : '';
    return this.isDeleted ?
            '' : pref + this.labelString + (this.type ? '\'' : '');
};

BlockLabelFragment.prototype.defTemplateSpecFragment = function () {
    // answer a string representing my prototype's spec
    // which also indicates my type, default value or arity
    var suff = '';
    if (!this.type) {return this.defSpecFragment(); }
    if (this.isUpvar()) {
        suff = ' \u2191';
    } else if (this.isMultipleInput()) {
        suff = '...';
    } else if (this.type === '%cs') {
        suff = ' \u03BB'; // ' [\u03BB'
    } else if (this.type === '%b') {
        suff = ' ?';
    } else if (this.type === '%l') {
        suff = ' \uFE19';
    } else if (this.type === '%obj') {
        suff = ' %turtleOutline';
    } else if (contains(
            ['%cmdRing', '%repRing', '%predRing', '%anyUE', '%boolUE'],
            this.type
        )) {
        suff = ' \u03BB';
    } else if (this.defaultValue) {
        suff = ' = ' + this.defaultValue.toString();
    }
    return this.labelString + suff;
};

BlockLabelFragment.prototype.blockSpecFragment = function () {
    // answer a string representing my block spec
    return this.isDeleted ? '' : this.type || this.labelString;
};

BlockLabelFragment.prototype.copy = function () {
    var ans = new BlockLabelFragment(this.labelString);
    ans.type = this.type;
    ans.defaultValue = this.defaultValue;
    return ans;
};

// arity

BlockLabelFragment.prototype.isSingleInput = function () {
    return !this.isMultipleInput() &&
        (this.type !== '%upvar');
};

BlockLabelFragment.prototype.isMultipleInput = function () {
    // answer true if the type begins with '%mult'
    if (!this.type) {
        return false; // not an input at all
    }
    return this.type.indexOf('%mult') > -1;
};

BlockLabelFragment.prototype.isUpvar = function () {
    if (!this.type) {
        return false; // not an input at all
    }
    return this.type === '%upvar';
};

BlockLabelFragment.prototype.setToSingleInput = function () {
    if (!this.type) {return null; } // not an input at all
    if (this.type === '%upvar') {
        this.type = '%s';
    } else {
        this.type = this.singleInputType();
    }
};

BlockLabelFragment.prototype.setToMultipleInput = function () {
    if (!this.type) {return null; } // not an input at all
    if (this.type === '%upvar') {
        this.type = '%s';
    }
    this.type = '%mult'.concat(this.singleInputType());
};

BlockLabelFragment.prototype.setToUpvar = function () {
    if (!this.type) {return null; } // not an input at all
    this.type = '%upvar';
};

BlockLabelFragment.prototype.singleInputType = function () {
    // answer the type of my input withtou any preceding '%mult'
    if (!this.type) {
        return null; // not an input at all
    }
    if (this.isMultipleInput()) {
        return this.type.substr(5); // everything following '%mult'
    }
    return this.type;
};

BlockLabelFragment.prototype.setSingleInputType = function (type) {
    if (!this.type || !this.isMultipleInput()) {
        this.type = type;
    } else {
        this.type = '%mult'.concat(type);
    }
};

// BlockLabelFragmentMorph ///////////////////////////////////////////////

/*
    I am a single word in a custom block prototype's label. I can be clicked
    to edit my contents and to turn me into an input placeholder.
*/

// BlockLabelFragmentMorph inherits from StringMorph:

BlockLabelFragmentMorph.prototype = new StringMorph();
BlockLabelFragmentMorph.prototype.constructor = BlockLabelFragmentMorph;
BlockLabelFragmentMorph.uber = StringMorph.prototype;

// BlockLabelFragmentMorph instance creation:

function BlockLabelFragmentMorph(text) {
    this.init(text);
}

BlockLabelFragmentMorph.prototype.init = function (text) {
    this.fragment = new BlockLabelFragment(text);
    this.fragment.type = null;
    this.sO = null; // temporary backup for shadowOffset
    BlockLabelFragmentMorph.uber.init.call(
        this,
        text,
        null, // font size
        SyntaxElementMorph.prototype.labelFontStyle,
        null, // bold
        null, // italic
        null, // numeric
        null, // shadow offset
        null, // shadow color
        null, // color
        SyntaxElementMorph.prototype.labelFontName
    );
};

// BlockLabelFragmentMorph events:

BlockLabelFragmentMorph.prototype.mouseEnter = function () {
    this.sO = this.shadowOffset;
    this.shadowOffset = this.sO.neg();
    this.drawNew();
    this.changed();
};

BlockLabelFragmentMorph.prototype.mouseLeave = function () {
    this.shadowOffset = this.sO;
    this.drawNew();
    this.changed();
};

BlockLabelFragmentMorph.prototype.mouseClickLeft = function () {
/*
    make a copy of my fragment object and open an InputSlotDialog on it.
    If the user acknowledges the DialogBox, assign the - edited - copy
    of the fragment object to be my new fragment object and update the
    custom block'label (the prototype in the block editor). Do not yet update
    the definition and every block instance, as this happens only after
    the user acknowledges and closes the block editor
*/
    var frag = this.fragment.copy(),
        myself = this,
        isPlaceHolder = this instanceof BlockLabelPlaceHolderMorph,
        isOnlyElement = this.parent.parseSpec(this.parent.blockSpec).length
            < 2;

    new InputSlotDialogMorph(
        frag,
        null,
        function () {myself.updateBlockLabel(frag); },
        this,
        this.parent.definition.category
    ).open(
        this instanceof BlockLabelFragmentMorph ?
                'Edit label fragment' :
                isPlaceHolder ? 'Create input name' : 'Edit input name',
        frag.labelString,
        this.world(),
        null,
        isPlaceHolder || isOnlyElement
    );
};

BlockLabelFragmentMorph.prototype.updateBlockLabel = function (newFragment) {
    var prot = this.parentThatIsA(BlockMorph);

    this.fragment = newFragment;
    if (prot) {
        prot.refreshPrototype();
    }
};

// BlockLabelPlaceHolderMorph ///////////////////////////////////////////////

/*
    I am a space between words or inputs in a custom block prototype's label.
    When I am moused over I display a plus sign on a colored background
    circle. I can be clicked to add a new word or input to the prototype.
*/

// BlockLabelPlaceHolderMorph inherits from StringMorph:

BlockLabelPlaceHolderMorph.prototype = new StringMorph();
BlockLabelPlaceHolderMorph.prototype.constructor = BlockLabelPlaceHolderMorph;
BlockLabelPlaceHolderMorph.uber = StringMorph.prototype;

// BlockLabelPlaceHolderMorph instance creation:

function BlockLabelPlaceHolderMorph() {
    this.init();
}

BlockLabelPlaceHolderMorph.prototype.init = function () {
    this.fragment = new BlockLabelFragment('');
    this.fragment.type = '%s';
    this.fragment.isDeleted = true;
    this.isHighlighted = false;
    this.isProtectedLabel = true; // doesn't participate in zebra coloring
    BlockLabelFragmentMorph.uber.init.call(this, '+');
};

// BlockLabelPlaceHolderMorph drawing

BlockLabelPlaceHolderMorph.prototype.drawNew = function () {
    var context, width, x, y, cx, cy;

    // initialize my surface property
    this.image = newCanvas();
    context = this.image.getContext('2d');
    context.font = this.font();

    // set my extent
    width = Math.max(
        context.measureText(this.text).width
            + Math.abs(this.shadowOffset.x),
        1
    );
    this.bounds.corner = this.bounds.origin.add(
        new Point(
            width,
            fontHeight(this.fontSize) + Math.abs(this.shadowOffset.y)
        )
    );
    this.image.width = width;
    this.image.height = this.height();

    // draw background, if any
    if (this.isHighlighted) {
        cx = Math.floor(width / 2);
        cy = Math.floor(this.height() / 2);
        context.fillStyle = this.color.toString();
        context.beginPath();
        context.arc(
            cx,
            cy * 1.2,
            Math.min(cx, cy),
            radians(0),
            radians(360),
            false
        );
        context.closePath();
        context.fill();
    }

    // prepare context for drawing text
    context.font = this.font();
    context.textAlign = 'left';
    context.textBaseline = 'bottom';

    // first draw the shadow, if any
    if (this.shadowColor) {
        x = Math.max(this.shadowOffset.x, 0);
        y = Math.max(this.shadowOffset.y, 0);
        context.fillStyle = this.shadowColor.toString();
        context.fillText(this.text, x, fontHeight(this.fontSize) + y);
    }

    // now draw the actual text
    x = Math.abs(Math.min(this.shadowOffset.x, 0));
    y = Math.abs(Math.min(this.shadowOffset.y, 0));
    context.fillStyle = this.isHighlighted ?
            'white' : this.color.toString();
    context.fillText(this.text, x, fontHeight(this.fontSize) + y);

    // notify my parent of layout change
    if (this.parent) {
        if (this.parent.fixLayout) {
            this.parent.fixLayout();
        }
    }
};

// BlockLabelPlaceHolderMorph events:

BlockLabelPlaceHolderMorph.prototype.mouseEnter = function () {
    this.isHighlighted = true;
    this.drawNew();
    this.changed();
};

BlockLabelPlaceHolderMorph.prototype.mouseLeave = function () {
    this.isHighlighted = false;
    this.drawNew();
    this.changed();
};

BlockLabelPlaceHolderMorph.prototype.mouseClickLeft
    = BlockLabelFragmentMorph.prototype.mouseClickLeft;

BlockLabelPlaceHolderMorph.prototype.updateBlockLabel
    = BlockLabelFragmentMorph.prototype.updateBlockLabel;

// BlockInputFragmentMorph ///////////////////////////////////////////////

/*
    I am a variable blob in a custom block prototype's label. I can be clicked
    to edit my contents and to turn me into an part of the block's label text.
*/

// BlockInputFragmentMorph inherits from TemplateSlotMorph:

BlockInputFragmentMorph.prototype = new TemplateSlotMorph();
BlockInputFragmentMorph.prototype.constructor = BlockInputFragmentMorph;
BlockInputFragmentMorph.uber = TemplateSlotMorph.prototype;

// BlockInputFragmentMorph instance creation:

function BlockInputFragmentMorph(text) {
    this.init(text);
}

BlockInputFragmentMorph.prototype.init = function (text) {
    this.fragment = new BlockLabelFragment(text);
    this.fragment.type = '%s';
    BlockInputFragmentMorph.uber.init.call(this, text);
};

// BlockInputFragmentMorph events:

BlockInputFragmentMorph.prototype.mouseClickLeft
    = BlockLabelFragmentMorph.prototype.mouseClickLeft;

BlockInputFragmentMorph.prototype.updateBlockLabel
    = BlockLabelFragmentMorph.prototype.updateBlockLabel;

// InputSlotDialogMorph ////////////////////////////////////////////////

// ... "inherits" some methods from BlockDialogMorph

// InputSlotDialogMorph inherits from DialogBoxMorph:

InputSlotDialogMorph.prototype = new DialogBoxMorph();
InputSlotDialogMorph.prototype.constructor = InputSlotDialogMorph;
InputSlotDialogMorph.uber = DialogBoxMorph.prototype;

// InputSlotDialogMorph preferences settings:

// if "isLaunchingExpanded" is true I always open in the long form 
InputSlotDialogMorph.prototype.isLaunchingExpanded = false;

// InputSlotDialogMorph instance creation:

function InputSlotDialogMorph(
    fragment,
    target,
    action,
    environment,
    category
) {
    this.init(fragment, target, action, environment, category);
}

InputSlotDialogMorph.prototype.init = function (
    fragment,
    target,
    action,
    environment,
    category
) {
    var scale = SyntaxElementMorph.prototype.scale,
        fh = fontHeight(10) / 1.2 * scale; // "raw height"

    // additional properties:
    this.fragment = fragment || new BlockLabelFragment();
    this.types = null;
    this.slots = null;
    this.isExpanded = false;
    this.category = category || 'other';
    this.cachedRadioButton = null; // "template" for radio button backgrounds

    // initialize inherited properties:
    BlockDialogMorph.uber.init.call(
        this,
        target,
        action,
        environment
    );

    // override inherited properites:
    this.types = new AlignmentMorph('row', this.padding);
    this.types.respectHiddens = true; // prevent the arrow from flipping
    this.add(this.types);
    this.slots = new BoxMorph();
    this.slots.color = new Color(55, 55, 55); // same as palette
    this.slots.borderColor = this.slots.color.lighter(50);
    this.slots.setExtent(new Point((fh + 10) * 24, (fh + 10 * scale) * 10.4));
    this.add(this.slots);
    this.createSlotTypeButtons();
    this.fixSlotsLayout();
    this.createTypeButtons();
    this.fixLayout();
};

InputSlotDialogMorph.prototype.createTypeButtons = function () {
    var block,
        arrow,
        myself = this,
        clr = SpriteMorph.prototype.blockColor[this.category];


    block = new JaggedBlockMorph(localize('Title text'));
    block.setColor(clr);
    this.addBlockTypeButton(
        function () {myself.setType(null); },
        block,
        function () {return myself.fragment.type === null; }
    );

    block = new JaggedBlockMorph('%inputName');
    block.setColor(clr);
    this.addBlockTypeButton(
        function () {myself.setType('%s'); },
        block,
        function () {return myself.fragment.type !== null; }
    );

    // add an arrow button for long form/short form toggling
    arrow = new ArrowMorph(
        'right',
        PushButtonMorph.prototype.fontSize + 4,
        2
    );
    arrow.noticesTransparentClick = true;
    this.types.add(arrow);
    this.types.fixLayout();

    // configure arrow button
    arrow.refresh = function () {
        if (myself.fragment.type === null) {
            myself.isExpanded = false;
            arrow.hide();
            myself.drawNew();
        } else {
            arrow.show();
            if (myself.isExpanded) {
                arrow.direction = 'down';
            } else {
                arrow.direction = 'right';
            }
            arrow.drawNew();
            arrow.changed();
        }
    };

    arrow.mouseClickLeft = function () {
        if (arrow.isVisible) {
            myself.isExpanded = !myself.isExpanded;
            myself.types.children.forEach(function (c) {
                c.refresh();
            });
            myself.drawNew();
            myself.edit();
        }
    };

    arrow.refresh();
};

InputSlotDialogMorph.prototype.addTypeButton
    = BlockDialogMorph.prototype.addTypeButton;

InputSlotDialogMorph.prototype.addBlockTypeButton
    = BlockDialogMorph.prototype.addBlockTypeButton;

InputSlotDialogMorph.prototype.setType = function (fragmentType) {
    this.fragment.type = fragmentType || null;
    this.types.children.forEach(function (c) {
        c.refresh();
    });
    this.slots.children.forEach(function (c) {
        c.refresh();
    });
    this.edit();
};

InputSlotDialogMorph.prototype.getInput = function () {
    var lbl;
    if (this.body instanceof InputFieldMorph) {
        lbl = this.normalizeSpaces(this.body.getValue());
    }
    if (lbl) {
        this.fragment.labelString = lbl;
        this.fragment.defaultValue = this.slots.defaultInputField.getValue();
        return lbl;
    }
    this.fragment.isDeleted = true;
    return null;
};

InputSlotDialogMorph.prototype.fixLayout = function () {
    var maxWidth,
        left = this.left(),
        th = fontHeight(this.titleFontSize) + this.titlePadding * 2;

    if (!this.isExpanded) {
        if (this.slots) {
            this.slots.hide();
        }
        return BlockDialogMorph.prototype.fixLayout.call(this);
    }

    this.slots.show();
    maxWidth = this.slots.width();

    // arrange panes :
    // body (input field)
    this.body.setPosition(this.position().add(new Point(
        this.padding + (maxWidth - this.body.width()) / 2,
        th + this.padding
    )));

    // label
    this.label.setLeft(
        left + this.padding + (maxWidth - this.label.width()) / 2
    );
    this.label.setTop(this.top() + (th - this.label.height()) / 2);

    // types
    this.types.fixLayout();
    this.types.setTop(this.body.bottom() + this.padding);
    this.types.setLeft(
        left + this.padding + (maxWidth - this.types.width()) / 2
    );

    // slots
    this.slots.setPosition(new Point(
        this.left() + this.padding,
        this.types.bottom() + this.padding
    ));
    this.slots.children.forEach(function (c) {
        c.refresh();
    });

    // buttons
    this.buttons.fixLayout();
    this.buttons.setTop(this.slots.bottom() + this.padding);
    this.buttons.setLeft(
        left + this.padding + (maxWidth - this.buttons.width()) / 2
    );

    // set dialog box dimensions:
    this.silentSetHeight(this.buttons.bottom() - this.top() + this.padding);
    this.silentSetWidth(this.slots.right() - this.left() + this.padding);
};

InputSlotDialogMorph.prototype.open = function (
    title,
    defaultString,
    world,
    pic,
    noDeleteButton
) {
    var txt = new InputFieldMorph(defaultString),
        oldFlag = Morph.prototype.trackChanges;

    Morph.prototype.trackChanges = false;
    this.isExpanded = this.isLaunchingExpanded;
    txt.setWidth(250);
    this.labelString = title;
    this.createLabel();
    if (pic) {this.setPicture(pic); }
    this.addBody(txt);
    txt.drawNew();
    this.addButton('ok', 'OK');
    if (!noDeleteButton) {
        this.addButton('deleteFragment', 'Delete');
    }
    this.addButton('cancel', 'Cancel');
    this.fixLayout();
    this.drawNew();
    this.fixLayout();
    if (world) {
        world.add(this);
        this.setCenter(world.center());
        this.edit();
    }
    this.add(this.types); // make the types come to front
    Morph.prototype.trackChanges = oldFlag;
    this.changed();
};

InputSlotDialogMorph.prototype.deleteFragment = function () {
    this.fragment.isDeleted = true;
    this.accept();
};

InputSlotDialogMorph.prototype.createSlotTypeButtons = function () {
    // populate my 'slots' area with radio buttons, labels and input fields
    var myself = this, defLabel, defInput,
        oldFlag = Morph.prototype.trackChanges;

    Morph.prototype.trackChanges = false;

    // slot types
    this.addSlotTypeButton('Object', '%obj');
    this.addSlotTypeButton('Text', '%txt');
    this.addSlotTypeButton('List', '%l');
    this.addSlotTypeButton('Number', '%n');
    this.addSlotTypeButton('Any type', '%s');
    this.addSlotTypeButton('Boolean (T/F)', '%b');
    this.addSlotTypeButton('Command\n(inline)', '%cmdRing'); //'%cmd');
    this.addSlotTypeButton('Reporter', '%repRing'); //'%r');
    this.addSlotTypeButton('Predicate', '%predRing'); //'%p');
    this.addSlotTypeButton('Command\n(C-shape)', '%cs');
    this.addSlotTypeButton('Any\n(unevaluated)', '%anyUE');
    this.addSlotTypeButton('Boolean\n(unevaluated)', '%boolUE');

    // arity and upvars
    this.slots.radioButtonSingle = this.addSlotArityButton(
        function () {myself.setSlotArity('single'); },
        "Single input.",
        function () {return myself.fragment.isSingleInput(); }
    );
    this.addSlotArityButton(
        function () {myself.setSlotArity('multiple'); },
        "Multiple inputs (value is list of inputs)",
        function () {return myself.fragment.isMultipleInput(); }
    );
    this.addSlotArityButton(
        function () {myself.setSlotArity('upvar'); },
        "Upvar - make internal variable visible to caller",
        function () {return myself.fragment.isUpvar(); }
    );

    // default values
    defLabel = new StringMorph(localize('Default Value:'));
    defLabel.fontSize = this.slots.radioButtonSingle.fontSize;
    defLabel.setColor(new Color(255, 255, 255));
    defLabel.refresh = function () {
        if (myself.isExpanded && contains(
                ['%s', '%n', '%txt', '%anyUE'],
                myself.fragment.type
            )) {
            defLabel.show();
        } else {
            defLabel.hide();
        }
    };
    this.slots.defaultInputLabel = defLabel;
    this.slots.add(defLabel);

    defInput = new InputFieldMorph(this.fragment.defaultValue);
    defInput.contents().fontSize = defLabel.fontSize;
    defInput.contrast = 90;
    defInput.contents().drawNew();
    defInput.setWidth(50);
    defInput.refresh = function () {
        if (defLabel.isVisible) {
            defInput.show();
            if (myself.fragment.type === '%n') {
                defInput.setIsNumeric(true);
            } else {
                defInput.setIsNumeric(false);
            }
        } else {
            defInput.hide();
        }
    };
    this.slots.defaultInputField = defInput;
    this.slots.add(defInput);
    defInput.drawNew();

    Morph.prototype.trackChanges = oldFlag;
};

InputSlotDialogMorph.prototype.setSlotType = function (type) {
    this.fragment.setSingleInputType(type);
    this.slots.children.forEach(function (c) {
        c.refresh();
    });
    this.edit();
};

InputSlotDialogMorph.prototype.setSlotArity = function (arity) {
    if (arity === 'single') {
        this.fragment.setToSingleInput();
    } else if (arity === 'multiple') {
        this.fragment.setToMultipleInput();
    } else if (arity === 'upvar') {
        this.fragment.setToUpvar();
        // hide other options - under construction
    }
    this.slots.children.forEach(function (c) {
        c.refresh();
    });
    this.edit();
};

InputSlotDialogMorph.prototype.addSlotTypeButton = function (
    label,
    spec
) {
/*
    this method produces a radio button with a picture of the
    slot type indicated by "spec" and the "label" text to
    its right.
    Note that you can make the slot picture interactive (turn
    it into a ToggleElementMorph by changing the
    
        element.fullImage()
    
    line to just
    
        element
        
    I've opted for the simpler representation because it reduces
    the duration of time it takes for the InputSlotDialog to load
    and show. But in the future computers and browsers may be
    faster.
*/
    var myself = this,
        action = function () {myself.setSlotType(spec); },
        query,
        element = new JaggedBlockMorph(spec),
        button;

    query = function () {
        return myself.fragment.singleInputType() === spec;
    };
    element.setCategory(this.category);
    element.rebuild();
    button = new ToggleMorph(
        'radiobutton',
        this,
        action,
        label,
        query,
        null,
        null,
        this.cachedRadioButton,
        element.fullImage(), // delete the "fullImage()" part for interactive
        'rebuild'
    );
    button.edge = this.buttonEdge / 2;
    button.outline = this.buttonOutline / 2;
    button.outlineColor = this.buttonOutlineColor;
    button.outlineGradient = this.buttonOutlineGradient;
    button.drawNew();
    button.fixLayout();
    button.label.isBold = false;
    button.label.setColor(new Color(255, 255, 255));
    if (!this.cachedRadioButton) {
        this.cachedRadioButton = button;
    }
    this.slots.add(button);
    return button;
};

InputSlotDialogMorph.prototype.addSlotArityButton = function (
    action,
    label,
    query
) {
    var button = new ToggleMorph(
        'radiobutton',
        this,
        action,
        label,
        query,
        null,
        null,
        this.cachedRadioButton
    );
    button.edge = this.buttonEdge / 2;
    button.outline = this.buttonOutline / 2;
    button.outlineColor = this.buttonOutlineColor;
    button.outlineGradient = this.buttonOutlineGradient;

    button.drawNew();
    button.fixLayout();
    // button.label.isBold = false;
    button.label.setColor(new Color(255, 255, 255));
    this.slots.add(button);
    if (!this.cachedRadioButton) {
        this.cachedRadioButton = button;
    }
    return button;
};

InputSlotDialogMorph.prototype.fixSlotsLayout = function () {
    var slots = this.slots,
        scale = SyntaxElementMorph.prototype.scale,
        xPadding = 10 * scale,
        ypadding = 14 * scale,
        bh = (fontHeight(10) / 1.2 + 15) * scale, // slot type button height
        ah = (fontHeight(10) / 1.2 + 10) * scale, // arity button height
        size = 12, // number slot type radio buttons
        cols = [
            slots.left() + xPadding,
            slots.left() + slots.width() / 3,
            slots.left() + slots.width() * 2 / 3
        ],
        rows = [
            slots.top() + ypadding,
            slots.top() + ypadding + bh,
            slots.top() + ypadding + bh * 2,
            slots.top() + ypadding + bh * 3,
            slots.top() + ypadding + bh * 4,
            slots.top() + ypadding + bh * 5,

            slots.top() + ypadding + bh * 5 + ah,
            slots.top() + ypadding + bh * 5 + ah * 2
        ],
        idx,
        row = -1,
        col,
        oldFlag = Morph.prototype.trackChanges;

    Morph.prototype.trackChanges = false;

    // slot types:

    for (idx = 0; idx < size; idx += 1) {
        col = idx % 3;
        if (idx % 3 === 0) {row += 1; }
        slots.children[idx].setPosition(new Point(
            cols[col],
            rows[row]
        ));
    }

    // arity:

    col = 0;
    row = 5;
    for (idx = size; idx < size + 3; idx += 1) {
        slots.children[idx].setPosition(new Point(
            cols[col],
            rows[row + idx - size]
        ));
    }

    // default input

    this.slots.defaultInputLabel.setPosition(
        this.slots.radioButtonSingle.label.topRight().add(new Point(5, 0))
    );
    this.slots.defaultInputField.setCenter(
        this.slots.defaultInputLabel.center().add(new Point(
            this.slots.defaultInputField.width() / 2
                + this.slots.defaultInputLabel.width() / 2 + 5,
            0
        ))
    );
    Morph.prototype.trackChanges = oldFlag;
    this.slots.changed();
};

// InputSlotDialogMorph hiding and showing:

/*
    override the inherited behavior to recursively hide/show all
    children, so that my instances get restored correctly when
    hiding/showing my parent.
*/

InputSlotDialogMorph.prototype.hide = function () {
    this.isVisible = false;
    this.changed();
};

InputSlotDialogMorph.prototype.show = function () {
    this.isVisible = true;
    this.changed();
};

// VariableDialogMorph ////////////////////////////////////////////////////

// VariableDialogMorph inherits from DialogBoxMorph:

VariableDialogMorph.prototype = new DialogBoxMorph();
VariableDialogMorph.prototype.constructor = VariableDialogMorph;
VariableDialogMorph.uber = DialogBoxMorph.prototype;

// ... and some behavior from BlockDialogMorph

// VariableDialogMorph instance creation:

function VariableDialogMorph(target, action, environment) {
    this.init(target, action, environment);
}

VariableDialogMorph.prototype.init = function (target, action, environment) {
    // additional properties:
    this.types = null;
    this.isGlobal = true;

    // initialize inherited properties:
    BlockDialogMorph.uber.init.call(
        this,
        target,
        action,
        environment
    );

    // override inherited properites:
    this.types = new AlignmentMorph('row', this.padding);
    this.add(this.types);
    this.createTypeButtons();
};

VariableDialogMorph.prototype.createTypeButtons = function () {
    var myself = this;

    this.addTypeButton(
        function () {myself.setType('gobal'); },
        "for all sprites",
        function () {return myself.isGlobal; }
    );
    this.addTypeButton(
        function () {myself.setType('local'); },
        "for this sprite only",
        function () {return !myself.isGlobal; }
    );
};

VariableDialogMorph.prototype.addTypeButton
    = BlockDialogMorph.prototype.addTypeButton;

VariableDialogMorph.prototype.setType = function (varType) {
    this.isGlobal = (varType === 'gobal');
    this.types.children.forEach(function (c) {
        c.refresh();
    });
    this.edit();
};

VariableDialogMorph.prototype.getInput = function () {
    // answer a tuple: [varName, isGlobal]
    var name = this.normalizeSpaces(this.body.getValue());
    return name ? [name, this.isGlobal] : null;
};

VariableDialogMorph.prototype.fixLayout = function () {
    var th = fontHeight(this.titleFontSize) + this.titlePadding * 2;

    if (this.body) {
        this.body.setPosition(this.position().add(new Point(
            this.padding,
            th + this.padding
        )));
        this.silentSetWidth(this.body.width() + this.padding * 2);
        this.silentSetHeight(
            this.body.height()
                + this.padding * 2
                + th
        );
    }

    if (this.label) {
        this.label.setCenter(this.center());
        this.label.setTop(this.top() + (th - this.label.height()) / 2);
    }

    if (this.types) {
        this.types.fixLayout();
        this.silentSetHeight(
            this.height()
                    + this.types.height()
                    + this.padding
        );
        this.silentSetWidth(Math.max(
            this.width(),
            this.types.width() + this.padding * 2
        ));
        this.types.setCenter(this.center());
        if (this.body) {
            this.types.setTop(this.body.bottom() + this.padding);
        } else if (this.categories) {
            this.types.setTop(this.categories.bottom() + this.padding);
        }
    }

    if (this.buttons && (this.buttons.children.length > 0)) {
        this.buttons.fixLayout();
        this.silentSetHeight(
            this.height()
                    + this.buttons.height()
                    + this.padding
        );
        this.buttons.setCenter(this.center());
        this.buttons.setBottom(this.bottom() - this.padding);
    }
};

// BlockExportDialogMorph ////////////////////////////////////////////////////

// BlockExportDialogMorph inherits from DialogBoxMorph:

BlockExportDialogMorph.prototype = new DialogBoxMorph();
BlockExportDialogMorph.prototype.constructor = BlockExportDialogMorph;
BlockExportDialogMorph.uber = DialogBoxMorph.prototype;

// BlockExportDialogMorph instance creation:

function BlockExportDialogMorph(serializer, blocks) {
    this.init(serializer, blocks);
}

BlockExportDialogMorph.prototype.init = function (serializer, blocks) {
    var myself = this;

    // additional properties:
    this.serializer = serializer;
    this.blocks = blocks.slice(0);
    this.handle = null;

    // initialize inherited properties:
    BlockExportDialogMorph.uber.init.call(
        this,
        null, // target
        function () {myself.exportBlocks(); },
        null // environment
    );

    // override inherited properites:
    this.labelString = 'Export blocks';
    this.createLabel();

    // build contents
    this.buildContents();
};

BlockExportDialogMorph.prototype.buildContents = function () {
    var palette, x, y, block, checkBox, lastCat,
        myself = this,
        padding = 4;

    // create plaette
    palette = new ScrollFrameMorph(
        null,
        null,
        SpriteMorph.prototype.sliderColor
    );
    palette.color = SpriteMorph.prototype.paletteColor;
    palette.padding = padding;
    palette.isDraggable = false;
    palette.acceptsDrops = false;
    palette.contents.acceptsDrops = false;

    // populate palette
    x = palette.left() + padding;
    y = palette.top() + padding;
    SpriteMorph.prototype.categories.forEach(function (category) {
        myself.blocks.forEach(function (definition) {
            if (definition.category === category) {
                if (lastCat && (category !== lastCat)) {
                    y += padding;
                }
                lastCat = category;
                block = definition.templateInstance();
                checkBox = new ToggleMorph(
                    'checkbox',
                    myself,
                    function () {
                        var idx = myself.blocks.indexOf(definition);
                        if (idx > -1) {
                            myself.blocks.splice(idx, 1);
                        } else {
                            myself.blocks.push(definition);
                        }
                    },
                    null,
                    function () {
                        return contains(
                            myself.blocks,
                            definition
                        );
                    },
                    null,
                    null,
                    null,
                    block.fullImage()
                );
                checkBox.setPosition(new Point(
                    x,
                    y + (checkBox.top() - checkBox.toggleElement.top())
                ));
                palette.addContents(checkBox);
                y += checkBox.fullBounds().height() + padding;
            }
        });
    });

    palette.scrollX(padding);
    palette.scrollY(padding);
    this.addBody(palette);

    this.addButton('ok', 'OK');
    this.addButton('cancel', 'Cancel');

    this.setExtent(new Point(220, 300));
    this.fixLayout();

};

BlockExportDialogMorph.prototype.popUp = function (wrrld) {
    var world = wrrld || this.target.world();
    if (world) {
        world.add(this);
        world.keyboardReceiver = this;
        this.handle = new HandleMorph(
            this,
            200,
            220,
            this.corner,
            this.corner
        );
        this.setCenter(world.center());
    }
};

// BlockExportDialogMorph menu

BlockExportDialogMorph.prototype.userMenu = function () {
    var menu = new MenuMorph(this, 'select');
    menu.addItem('all', 'selectAll');
    menu.addItem('none', 'selectNone');
    return menu;
};

BlockExportDialogMorph.prototype.selectAll = function () {
    this.body.contents.children.forEach(function (checkBox) {
        if (!checkBox.state) {
            checkBox.trigger();
        }
    });
};

BlockExportDialogMorph.prototype.selectNone = function () {
    this.blocks = [];
    this.body.contents.children.forEach(function (checkBox) {
        checkBox.refresh();
    });
};

// BlockExportDialogMorph ops

BlockExportDialogMorph.prototype.exportBlocks = function () {
    var str = this.serializer.serialize(this.blocks);
    if (this.blocks.length > 0) {
        window.open('data:text/xml,<blocks app="'
            + this.serializer.app
            + '" version="'
            + this.serializer.version
            + '">'
            + str
            + '</blocks>');
    } else {
        new DialogBoxMorph().inform(
            'Export blocks',
            'no blocks were selected',
            this.world()
        );
    }
};

// BlockExportDialogMorph layout

BlockExportDialogMorph.prototype.fixLayout
    = BlockEditorMorph.prototype.fixLayout;

// BlockImportDialogMorph ////////////////////////////////////////////////////

// BlockImportDialogMorph inherits from DialogBoxMorph
// and pseudo-inherits from BlockExportDialogMorph:

BlockImportDialogMorph.prototype = new DialogBoxMorph();
BlockImportDialogMorph.prototype.constructor = BlockImportDialogMorph;
BlockImportDialogMorph.uber = DialogBoxMorph.prototype;

// BlockImportDialogMorph instance creation:

function BlockImportDialogMorph(blocks, target, name) {
    this.init(blocks, target, name);
}

BlockImportDialogMorph.prototype.init = function (blocks, target, name) {
    var myself = this;

    // additional properties:
    this.blocks = blocks.slice(0);
    this.handle = null;

    // initialize inherited properties:
    BlockExportDialogMorph.uber.init.call(
        this,
        target,
        function () {myself.importBlocks(name); },
        null // environment
    );

    // override inherited properites:
    this.labelString = localize('Import blocks')
        + (name ? ': ' : '')
        + name || '';
    this.createLabel();

    // build contents
    this.buildContents();
};

BlockImportDialogMorph.prototype.buildContents
    = BlockExportDialogMorph.prototype.buildContents;

BlockImportDialogMorph.prototype.popUp
    = BlockExportDialogMorph.prototype.popUp;

// BlockImportDialogMorph menu

BlockImportDialogMorph.prototype.userMenu
    = BlockExportDialogMorph.prototype.userMenu;

BlockImportDialogMorph.prototype.selectAll
    = BlockExportDialogMorph.prototype.selectAll;

BlockImportDialogMorph.prototype.selectNone
    = BlockExportDialogMorph.prototype.selectNone;

// BlockImportDialogMorph ops

BlockImportDialogMorph.prototype.importBlocks = function (name) {
    var ide = this.target.parentThatIsA(IDE_Morph);
    if (!ide) {return; }
    if (this.blocks.length > 0) {
        this.blocks.forEach(function (def) {
            def.receiver = ide.stage;
            ide.stage.globalBlocks.push(def);
            ide.stage.replaceDoubleDefinitionsFor(def);
        });
        ide.flushPaletteCache();
        ide.refreshPalette();
        ide.showMessage(
            'Imported Blocks Module' + (name ? ': ' + name : '') + '.',
            2
        );
    } else {
        new DialogBoxMorph().inform(
            'Import blocks',
            'no blocks were selected',
            this.world()
        );
    }
};

// BlockImportDialogMorph layout

BlockImportDialogMorph.prototype.fixLayout
    = BlockEditorMorph.prototype.fixLayout;
