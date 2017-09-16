// SyntaxElementMorph //////////////////////////////////////////////////

// I am the ancestor of all blocks and input slots

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

        feedbackColor       - <Color> for displaying drop feedbacks
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

SyntaxElementMorph.prototype.setScale = function (num) {
    const scale = Math.min(Math.max(num, 1), 25);
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
SyntaxElementMorph.prototype.isCachingInputs = false;

// SyntaxElementMorph instance creation:

export default class SyntaxElementMorph extends Morph {
    constructor() {
        this.init();
    }

    init(silently) {
        this.cachedClr = null;
        this.cachedClrBright = null;
        this.cachedClrDark = null;
        this.cachedNormalColor = null; // for single-stepping
        this.isStatic = false; // if true, I cannot be exchanged

        super.init.call(this, silently);

        this.defaults = [];
        this.cachedInputs = null;
    }

    // SyntaxElementMorph accessing:

    parts() {
        // answer my non-crontrol submorphs
        let nb = null;
        if (this.nextBlock) { // if I am a CommandBlock or a HatBlock
            nb = this.nextBlock();
        }
        return this.children.filter(child => (child !== nb)
            && !(child instanceof ShadowMorph)
            && !(child instanceof BlockHighlightMorph));
    }

    inputs() {
        // answer my arguments and nested reporters
        if (isNil(this.cachedInputs) || !this.isCachingInputs) {
            this.cachedInputs = this.parts().filter(part => part instanceof SyntaxElementMorph);
        }
        // this.debugCachedInputs();
        return this.cachedInputs;
    }

    debugCachedInputs() {
        // private - only used for manually debugging inputs caching
        let realInputs;

        let i;
        if (!isNil(this.cachedInputs)) {
            realInputs = this.parts().filter(part => part instanceof SyntaxElementMorph);
        }
        if (this.cachedInputs.length !== realInputs.length) {
            throw new Error(`cached inputs size do not match: ${this.constructor.name}`);
        }
        for (i = 0; i < realInputs.length; i += 1) {
            if (this.cachedInputs[i] !== realInputs[i]) {
                throw new Error(`cached input does not match: ${this.constructor.name} #${i} ${this.cachedInputs[i].constructor.name} != ${realInputs[i].constructor.name}`);
            }
        }
    }

    allInputs() {
        // answer arguments and nested reporters of all children
        const myself = this;
        return this.allChildren().slice(0).reverse().filter(
            child => (child instanceof ArgMorph) ||
                (child instanceof ReporterBlockMorph &&
                child !== myself)
        );
    }

    allEmptySlots() {
        // answer empty input slots of all children excluding myself,
        // but omit those in nested rings (lambdas) and JS-Function primitives.
        // Used by the evaluator when binding implicit formal parameters
        // to empty input slots
        let empty = [];
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
    }

    tagExitBlocks(stopTag, isCommand) {
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
    }

    replaceInput(oldArg, newArg) {
        const scripts = this.parentThatIsA(ScriptsMorph);
        let replacement = newArg;
        let idx = this.children.indexOf(oldArg);
        let i = 0;

        // try to find the ArgLabel embedding the newArg,
        // used for the undrop() feature
        if (idx === -1 && newArg instanceof MultiArgMorph) {
            this.children.forEach(morph => {
                if (morph instanceof ArgLabelMorph &&
                        morph.argMorph() === oldArg) {
                    idx = i;
                }
                i += 1;
            });
        }

        if ((idx === -1) || (scripts === null)) {
            return null;
        }

        if (oldArg.cachedSlotSpec) {oldArg.cachedSlotSpec = null; }
        if (newArg.cachedSlotSpec) {newArg.cachedSlotSpec = null; }

        this.startLayout();
        if (newArg.parent) {
            newArg.parent.removeChild(newArg);
        }
        if (oldArg instanceof MultiArgMorph) {
            oldArg.inputs().forEach(inp => { // preserve nested reporters
                oldArg.replaceInput(inp, new InputSlotMorph());
            });
            if (this.dynamicInputLabels) {
                replacement = new ArgLabelMorph(newArg);
            }
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
        this.cachedInputs = null;
        this.endLayout();
    }

    silentReplaceInput(oldArg, newArg) {
        // used by the Serializer or when programatically
        // changing blocks
        const i = this.children.indexOf(oldArg);

        let replacement;

        if (i === -1) {
            return;
        }

        if (oldArg.cachedSlotSpec) {oldArg.cachedSlotSpec = null; }
        if (newArg.cachedSlotSpec) {newArg.cachedSlotSpec = null; }

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
        this.cachedInputs = null;
    }

    revertToDefaultInput(arg, noValues) {
        const idx = this.parts().indexOf(arg);
        const inp = this.inputs().indexOf(arg);
        let deflt = new InputSlotMorph();
        let def;

        if (idx !== -1) {
            if (this instanceof BlockMorph) {
                deflt = this.labelPart(this.parseSpec(this.blockSpec)[idx]);
                if (this.isCustomBlock) {
                    def = this.isGlobal ? this.definition
                            : this.scriptTarget().getMethod(this.blockSpec);
                    if (deflt instanceof InputSlotMorph) {
                        deflt.setChoices(...def.inputOptionsOfIdx(inp));
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
        this.cachedInputs = null;
    }

    isLocked() {
        // answer true if I can be exchanged by a dropped reporter
        return this.isStatic;
    }

    // SyntaxElementMorph enumerating:

    topBlock() {
        if (this.parent && this.parent.topBlock) {
            return this.parent.topBlock();
        }
        return this;
    }

    // SyntaxElementMorph reachable variables

    getVarNamesDict() {
        const block = this.parentThatIsA(BlockMorph);
        let rcvr;
        const tempVars = [];
        let dict;

        if (!block) {
            return {};
        }
        rcvr = block.scriptTarget();
        block.allParents().forEach(morph => {
            if (morph instanceof PrototypeHatBlockMorph) {
                tempVars.push(...morph.variableNames());
                tempVars.push(...morph.inputs()[0].inputFragmentNames());
            } else if (morph instanceof BlockMorph) {
                morph.inputs().forEach(inp => {
                    if (inp instanceof TemplateSlotMorph) {
                        tempVars.push(inp.contents());
                    } else if (inp instanceof MultiArgMorph) {
                        inp.children.forEach(m => {
                            if (m instanceof TemplateSlotMorph) {
                                tempVars.push(m.contents());
                            }
                        });
                    }
                });
            }
        });
        if (rcvr) {
            dict = rcvr.variables.allNamesDict();
            tempVars.forEach(name => {
                dict[name] = name;
            });
            return dict;
        }
        return {};
    }

    // Variable refactoring

    refactorVarInStack(oldName, newName, isScriptVar) {
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
                && isNil(this.definition.declarations[oldName])
                && !contains(this.definition.variableNames, oldName)) {
            this.definition.body.expression.refactorVarInStack(oldName, newName);
        }

        this.inputs().forEach(input => {
            input.refactorVarInStack(oldName, newName);
        });

        if (this.nextBlock) {
            const nb = this.nextBlock();
            if (nb) {
                nb.refactorVarInStack(oldName, newName);
            }
        }
    }

    definesScriptVariable(name) {
        // Returns true if this block is defining either a script local var or
        // an upVar called `name`
        return ((this.selector === 'doDeclareVariables'
                    || (this.blockSpec && this.blockSpec.match('%upvar')))
                && (detect(this.inputs()[0].allInputs(), input => input.selector === 'reportGetVar'
                && input.blockSpec === name)));
    }

    // SyntaxElementMorph copy-on-write support:

    selectForEdit() {
        const scripts = this.parentThatIsA(ScriptsMorph);
        const ide = this.parentThatIsA(IDE_Morph);
        const rcvr = ide ? ide.currentSprite : null;
        let selected;
        if (scripts && rcvr && rcvr.inheritsAttribute('scripts')) {
            // copy on write:
            this.selectionID = true;
            rcvr.shadowAttribute('scripts');
            selected = detect(rcvr.scripts.allChildren(), m => m.selectionID);
            delete this.selectionID;
            delete selected.selectionID;
            return selected;
        }
        return this;
    }

    // SyntaxElementMorph drag & drop:

    reactToGrabOf(grabbedMorph) {
        const topBlock = this.topBlock();
        let affected;
        if (grabbedMorph instanceof CommandBlockMorph) {
            affected = this.parentThatIsA(CommandSlotMorph);
            if (affected) {
                this.startLayout();
                affected.fixLayout();
                this.endLayout();
            }
        }
        if (topBlock) {
            topBlock.allComments().forEach(comment => {
                comment.align(topBlock);
            });
            if (topBlock.getHighlight()) {
                topBlock.addHighlight(topBlock.removeHighlight());
            }
        }
    }

    // SyntaxElementMorph 3D - border color rendering:

    bright() {
        return this.color.lighter(this.contrast).toString();
    }

    dark() {
        return this.color.darker(this.contrast).toString();
    }

    // SyntaxElementMorph color changing:

    setColor(aColor, silently) {
        if (aColor) {
            if (!this.color.eq(aColor)) {
                this.color = aColor;
                if (!silently) {this.drawNew(); }
                this.children.forEach(child => {
                    if (!silently || child instanceof TemplateSlotMorph) {
                        child.drawNew();
                        child.changed();
                    }
                });
                this.changed();
            }
        }
    }

    setLabelColor(textColor, shadowColor, shadowOffset) {
        this.children.forEach(morph => {
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
    }

    flash() {
        if (!this.cachedNormalColor) {
            this.cachedNormalColor = this.color;
            this.setColor(this.activeHighlight);
        }
    }

    unflash() {
        if (this.cachedNormalColor) {
            const clr = this.cachedNormalColor;
            this.cachedNormalColor = null;
            this.setColor(clr);
        }
    }

    // SyntaxElementMorph zebra coloring

    fixBlockColor(nearestBlock, isForced) {
        this.children.forEach(morph => {
            if (morph instanceof SyntaxElementMorph) {
                morph.fixBlockColor(nearestBlock, isForced);
            }
        });
    }

    // SyntaxElementMorph label parts:

    labelPart(spec) {
        let part;
        let tokens;
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
                        '(90) right' : 90,
                        '(-90) left' : -90,
                        '(0) up' : '0',
                        '(180) down' : 180
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
                        'mouse-departed' : ['mouse-departed']
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
                        'whitespace' : ['whitespace'],
                        'line' : ['line'],
                        'tab' : ['tab'],
                        'cr' : ['cr'],
                        'csv' : ['csv']
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
                        fisheye: ['fisheye'],
                        whirl: ['whirl'],
                        pixelate: ['pixelate'],
                        mosaic: ['mosaic'],
                        duplicate: ['duplicate'],
                        negative : ['negative'],
                        comic: ['comic'],
                        confetti: ['confetti'],
                        saturation: ['saturation'],
                        brightness : ['brightness'],
                        ghost: ['ghost']
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
                        'e^' : ['e^'],
                        '10^' : ['10^']
                    },
                    true
                );
                part.setContents(['sqrt']);
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
            case '%cl':
                part = new CSlotMorph();
                part.isStatic = true; // rejects reporter drops
                part.isLambda = true; // auto-reifies nested script
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
                part = new SymbolMorph('turtle');
                part.size = this.fontSize * 1.2;
                part.color = new Color(255, 255, 255);
                part.shadowColor = this.color.darker(this.labelContrast);
                part.shadowOffset = MorphicPreferences.isFlat ?
                        new Point() : this.embossing;
                part.drawNew();
                break;
            case '%turtleOutline':
                part = new SymbolMorph('turtleOutline');
                part.size = this.fontSize;
                part.color = new Color(255, 255, 255);
                part.isProtectedLabel = true; // doesn't participate in zebraing
                part.shadowColor = this.color.darker(this.labelContrast);
                part.shadowOffset = MorphicPreferences.isFlat ?
                        new Point() : this.embossing;
                part.drawNew();
                break;
            case '%clockwise':
                part = new SymbolMorph('turnRight');
                part.size = this.fontSize * 1.5;
                part.color = new Color(255, 255, 255);
                part.isProtectedLabel = false; // zebra colors
                part.shadowColor = this.color.darker(this.labelContrast);
                part.shadowOffset = MorphicPreferences.isFlat ?
                        new Point() : this.embossing;
                part.drawNew();
                break;
            case '%counterclockwise':
                part = new SymbolMorph('turnLeft');
                part.size = this.fontSize * 1.5;
                part.color = new Color(255, 255, 255);
                part.isProtectedLabel = false; // zebra colors
                part.shadowColor = this.color.darker(this.labelContrast);
                part.shadowOffset = MorphicPreferences.isFlat ?
                        new Point() : this.embossing;
                part.drawNew();
                break;
            case '%greenflag':
                part = new SymbolMorph('flag');
                part.size = this.fontSize * 1.5;
                part.color = new Color(0, 200, 0);
                part.isProtectedLabel = true; // doesn't participate in zebraing
                part.shadowColor = this.color.darker(this.labelContrast);
                part.shadowOffset = MorphicPreferences.isFlat ?
                        new Point() : this.embossing;
                part.drawNew();
                break;
            case '%stop':
                part = new SymbolMorph('octagon');
                part.size = this.fontSize * 1.5;
                part.color = new Color(200, 0, 0);
                part.isProtectedLabel = true; // doesn't participate in zebraing
                part.shadowColor = this.color.darker(this.labelContrast);
                part.shadowOffset = MorphicPreferences.isFlat ?
                        new Point() : this.embossing;
                part.drawNew();
                break;
            case '%pause':
                part = new SymbolMorph('pause');
                part.size = this.fontSize;
                part.color = new Color(255, 220, 0);
                part.isProtectedLabel = true; // doesn't participate in zebraing
                part.shadowColor = this.color.darker(this.labelContrast);
                part.shadowOffset = MorphicPreferences.isFlat ?
                        new Point() : this.embossing;
                part.drawNew();
                break;
            default:
                nop();
            }
        } else if (spec[0] === '$' &&
                spec.length > 1 &&
                this.selector !== 'reportGetVar') {
    /*
            // allow costumes as label symbols
            // has issues when loading costumes (asynchronously)
            // commented out for now

            var rcvr = this.definition.receiver || this.scriptTarget(),
                id = spec.slice(1),
                cst;
            if (!rcvr) {return this.labelPart('%stop'); }
            cst = detect(
                rcvr.costumes.asArray(),
                function (each) {return each.name === id; }
            );
            part = new SymbolMorph(cst);
            part.size = this.fontSize * 1.5;
            part.color = new Color(255, 255, 255);
            part.isProtectedLabel = true; // doesn't participate in zebraing
            part.drawNew();
    */

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
                part = new SymbolMorph(tokens[0]);
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
                    new Point() : this.embossing;
            part.drawNew();
        } else {
            part = new StringMorph(
                spec, // text
                this.fontSize, // fontSize
                this.labelFontStyle, // fontStyle
                true, // bold
                false, // italic
                false, // isNumeric
                MorphicPreferences.isFlat ?
                        new Point() : this.embossing, // shadowOffset
                this.color.darker(this.labelContrast), // shadowColor
                new Color(255, 255, 255), // color
                this.labelFontName // fontName
            );
        }
        return part;
    }

    isObjInputFragment() {
        // private - for displaying a symbol in a variable block template
        return (this.selector === 'reportGetVar') &&
            (this.getSlotSpec() === '%t') &&
            (this.parent.fragment.type === '%obj');
    }

    // SyntaxElementMorph layout:

    fixLayout(silently) {
        let nb;
        const parts = this.parts();
        const myself = this;
        let x = 0;
        let y;
        let lineHeight = 0;
        let maxX = 0;
        let blockWidth = this.minWidth;
        let blockHeight;
        let affected;
        let l = [];
        const lines = [];

        const space = this.isPrototype ?
                1 : Math.floor(fontHeight(this.fontSize) / 3);

        let bottomCorrection;
        const initialExtent = this.extent();

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
        parts.forEach(part => {
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
        lines.forEach(line => {
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
            line.forEach(part => {
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

        // set my extent (silently, because we'll redraw later anyway):
        this.silentSetExtent(new Point(blockWidth, blockHeight));

        // adjust CSlots
        parts.forEach(part => {
            if (part instanceof CSlotMorph) {
                if (myself.isPredicate) {
                    part.setWidth(blockWidth - myself.rounding * 2);
                } else {
                    part.setWidth(blockWidth - myself.edge);
                }
            }
        });

        // redraw in order to erase CSlot backgrounds
        if (!silently) {this.drawNew(); }

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
    }

    fixHighlight() {
        const top = this.topBlock();
        if (top.getHighlight && top.getHighlight()) {
            top.addHighlight(top.removeHighlight());
        }
    }

    // SyntaxElementMorph evaluating:

    evaluate() {
        // responsibility of my children, default is to answer null
        return null;
    }

    isEmptySlot() {
        // responsibility of my children, default is to answer false
        return false;
    }

    // SyntaxElementMorph speech bubble feedback:

    showBubble(value, exportPic, target) {
        let bubble;
        let txt;
        let img;
        let morphToShow;
        let isClickable = false;
        const ide = this.parentThatIsA(IDE_Morph);
        let anchor = this;
        let pos = this.rightCenter().add(new Point(2, 0));
        const sf = this.parentThatIsA(ScrollFrameMorph);
        const wrrld = this.world();

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
                morphToShow.silentSetWidth(img.width);
                morphToShow.silentSetHeight(img.height);
                morphToShow.image = img;
                morphToShow.version = value.version;
                morphToShow.step = function () {
                    if (this.version !== value.version) {
                        img = value.thumbnail(new Point(40, 40));
                        this.image = img;
                        this.version = value.version;
                        this.changed();
                    }
                };
            } else {
                img = value.fullImage();
                morphToShow = new Morph();
                morphToShow.silentSetWidth(img.width);
                morphToShow.silentSetHeight(img.height);
                morphToShow.image = img;
            }
        } else if (value instanceof Costume) {
            img = value.thumbnail(new Point(40, 40));
            morphToShow = new Morph();
            morphToShow.silentSetWidth(img.width);
            morphToShow.silentSetHeight(img.height);
            morphToShow.image = img;
        } else if (value instanceof Sound) {
            morphToShow = new SymbolMorph('notes', 30);
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
            txt  = value.length > 500 ? `${value.slice(0, 500)}...` : value;
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
            } else {
                anchor = detect(
                    ide.corral.frame.contents.children,
                    icon => icon.object === target
                );
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
    }

    exportPictureWithResult(aBubble) {
        const ide = this.parentThatIsA(IDE_Morph);
        const scr = this.fullImage();
        const bub = aBubble.fullImageClassic();
        const taller = Math.max(0, bub.height - scr.height);

        const pic = newCanvas(new Point(
            scr.width + bub.width + 2,
            scr.height + taller
        ));

        const ctx = pic.getContext('2d');
        ctx.drawImage(scr, 0, pic.height - scr.height);
        ctx.drawImage(bub, scr.width + 2, 0);
        // request to open pic in new window.
        ide.saveCanvasAs(
            pic,
            `${ide.projetName || localize('untitled')} ${localize('script pic')}`
        );
    }

    // SyntaxElementMorph code mapping

    /*
        code mapping lets you use blocks to generate arbitrary text-based
        source code that can be exported and compiled / embedded elsewhere,
        it's not part of Snap's evaluator and not needed for Snap itself
    */

    mappedCode(definitions) {
        const result = this.evaluate();
        if (result instanceof BlockMorph) {
            return result.mappedCode(definitions);
        }
        return result;
    }

    // SyntaxElementMorph layout update optimization

    startLayout() {
        this.topBlock().fullChanged();
        Morph.prototype.trackChanges = false;
    }

    endLayout() {
        Morph.prototype.trackChanges = true;
        this.topBlock().fullChanged();
    }
}