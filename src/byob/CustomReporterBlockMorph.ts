// CustomReporterBlockMorph ////////////////////////////////////////////

import ReporterBlockMorph from "../blocks/ReporterBlockMorph";

// CustomReporterBlockMorph shared settings:

CustomReporterBlockMorph.prototype.isCustomBlock = true;

// CustomReporterBlockMorph instance creation:

export default class CustomReporterBlockMorph extends ReporterBlockMorph {
    constructor(definition, isPredicate, isProto) {
        this.init(definition, isPredicate, isProto);
    }

    init(definition, isPredicate, isProto) {
        this.definition = definition; // mandatory
        this.isGlobal = definition ? definition.isGlobal : false;
        this.isPrototype = isProto || false; // optional
        super.init.call(this, isPredicate, true); // sil.
        this.category = definition.category;
        this.variables = new VariableFrame();
        this.initializeVariables();
        this.selector = 'evaluateCustomBlock';
        if (definition) { // needed for de-serializing
            this.refresh();
        }
    }

    refresh(aDefinition) {
        const def = aDefinition || this.definition;
        CustomCommandBlockMorph.prototype.refresh.call(this, aDefinition, true);
        if (!this.isPrototype) {
            this.isPredicate = (def.type === 'predicate');
        }
        if (this.parent instanceof SyntaxElementMorph) {
            this.parent.cachedInputs = null;
        }
        this.drawNew();
    }

    mouseClickLeft() {
        if (!this.isPrototype) {
            return super.mouseClickLeft.call(this);
        }
        this.edit();
    }
}

CustomReporterBlockMorph.prototype.initializeVariables =
    CustomCommandBlockMorph.prototype.initializeVariables;

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

CustomReporterBlockMorph.prototype.duplicateBlockDefinition
    = CustomCommandBlockMorph.prototype.duplicateBlockDefinition;

CustomReporterBlockMorph.prototype.deleteBlockDefinition
    = CustomCommandBlockMorph.prototype.deleteBlockDefinition;

// CustomReporterBlockMorph events:

// hover help - commented out for now
/*
CustomReporterBlockMorph.prototype.mouseEnter
    = CustomCommandBlockMorph.prototype.mouseEnter;

CustomReporterBlockMorph.prototype.mouseLeave
    = CustomCommandBlockMorph.prototype.mouseLeave;
*/

// CustomReporterBlockMorph bubble help:

CustomReporterBlockMorph.prototype.bubbleHelp
    = CustomCommandBlockMorph.prototype.bubbleHelp;

CustomReporterBlockMorph.prototype.popUpbubbleHelp
    = CustomCommandBlockMorph.prototype.popUpbubbleHelp;

// CustomReporterBlockMorph relabelling

CustomReporterBlockMorph.prototype.relabel
    = CustomCommandBlockMorph.prototype.relabel;

CustomReporterBlockMorph.prototype.alternatives
    = CustomCommandBlockMorph.prototype.alternatives;