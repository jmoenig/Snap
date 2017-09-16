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
    %var    - chameleon colored rectangular drop-down for variable names
    %shd    - Chameleon colored rectuangular drop-down for shadowed var names
    %lst    - chameleon colored rectangular drop-down for list names
    %b      - chameleon colored hexagonal slot (for predicates)
    %bool   - chameleon colored hexagonal slot (for predicates), static
    %l      - list icon
    %c      - C-shaped command slot, special form for primitives
    %cs     - C-shaped, auto-reifying, accepts reporter drops
    %cl     - C-shaped, auto-reifying, rejects reporters
    %clr    - interactive color slot
    %t      - inline variable reporter template
    %anyUE  - white rectangular type-in slot, unevaluated if replaced
    %boolUE - chameleon colored hexagonal slot, unevaluated if replaced
    %f      - round function slot, unevaluated if replaced,
    %r      - round reporter slot
    %p      - hexagonal predicate slot

    rings:

    %cmdRing    - command slotted ring with %ringparms
    %repRing    - round slotted ringn with %ringparms
    %predRing   - diamond slotted ring with %ringparms

    arity: multiple

    %mult%x      - where %x stands for any of the above single inputs
    %inputs      - for an additional text label 'with inputs'
    %words       - for an expandable list of default 2 (used in JOIN)
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

import SyntaxElementMorph from "./SyntaxElementMorph";

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
        BlockMorph.prototype.snapSound.src = 'click.wav';
    }
    CommentMorph.prototype.snapSound = BlockMorph.prototype.snapSound;
};

// BlockMorph instance creation:

export default class BlockMorph extends SyntaxElementMorph {
    constructor() {
        this.init();
    }

    init(silently) {
        this.selector = null; // name of method to be triggered
        this.blockSpec = ''; // formal description of label and arguments
        this.comment = null; // optional "sticky" comment morph

        // not to be persisted:
        this.instantiationSpec = null; // spec to set upon fullCopy() of template
        this.category = null; // for zebra coloring (non persistent)
        this.isCorpse = false; // marked for deletion fom a custom block definition

        super.init.call(this, silently);
        this.color = new Color(0, 17, 173);
        this.cachedInputs = null;
    }

    scriptTarget() {
        // answer the sprite or stage that this block acts on,
        // if the user clicks on it.
        // NOTE: since scripts can be shared by more than a single sprite
        // this method only gives the desired result within the context of
        // the user actively clicking on a block inside the IDE
        // there is no direct relationship between a block and a sprite.
        const scripts = this.parentThatIsA(ScriptsMorph);

        let ide;
        if (scripts) {
            return scripts.scriptTarget();
        }
        ide = this.parentThatIsA(IDE_Morph);
        if (ide) {
            return ide.currentSprite;
        }
        throw new Error('script target cannot be found for orphaned block');
    }

    toString() {
        return `a ${this.constructor.name ||
        this.constructor.toString().split(' ')[1].split('(')[0]} ("${this.blockSpec.slice(0, 30)}...")`;
    }

    // BlockMorph spec:

    parseSpec(spec) {
        const result = [];
        let words;
        let word = '';

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
                    word += ` ${w}`;
                } else {
                    word = w;
                }
            }
        }

        words.forEach(each => {
            addWord(each);
        });
        if (word !== '') {
            result.push(word);
        }
        return result;
    }

    setSpec(spec, silently, definition) {
        const myself = this;
        let part;
        let inputIdx = -1;

        if (!spec) {return; }
        this.parts().forEach(part => {
            part.destroy();
        });
        if (this.isPrototype) {
            this.add(this.placeHolder());
        }
        this.parseSpec(spec).forEach(word => {
            if (word[0] === '%') {
                inputIdx += 1;
            }
            part = myself.labelPart(word);
            if (isNil(part)) {
                // console.log('could not create label part', word);
                return;
            }
            myself.add(part);
            if (!(part instanceof CommandSlotMorph ||
                    part instanceof StringMorph)) {
                part.drawNew();
            }
            if (part instanceof RingMorph) {
                part.fixBlockColor();
            }
            if (part instanceof MultiArgMorph ||
                    part.constructor === CommandSlotMorph ||
                    part.constructor === RingCommandSlotMorph) {
                part.fixLayout();
            }
            if (myself.isPrototype) {
                myself.add(myself.placeHolder());
            }
            if (part instanceof InputSlotMorph && myself.isCustomBlock) {
                part.setChoices(...(definition || myself.definition).inputOptionsOfIdx(inputIdx));
            }
        });
        this.blockSpec = spec;
        this.fixLayout(silently);
        this.cachedInputs = null;
    }

    userSetSpec(spec) {
        const tb = this.topBlock();
        tb.fullChanged();
        this.setSpec(spec);
        tb.fullChanged();
    }

    buildSpec() {
        // create my blockSpec from my parts - for demo purposes only
        const myself = this;
        this.blockSpec = '';
        this.parts().forEach(part => {
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
    }

    rebuild(contrast) {
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
    }

    // BlockMorph menu:

    userMenu() {
        const menu = new MenuMorph(this);
        const world = this.world();
        const myself = this;
        const shiftClicked = world.currentKey === 16;
        const proc = this.activeProcess();

        const vNames = proc && proc.context && proc.context.outerContext ?
                proc.context.outerContext.variables.names() : [];

        let alternatives;
        let field;
        let rcvr;
        let top;

        function addOption(label, toggle, test, onHint, offHint) {
            const on = '\u2611 ';
            const off = '\u2610 ';
            menu.addItem(
                (test ? on : off) + localize(label),
                toggle,
                test ? onHint : offHint
            );
        }

        function renameVar() {
            const blck = myself.fullCopy();
            blck.addShadow();
            new DialogBoxMorph(
                myself,
                myself.userSetSpec,
                myself
            ).prompt(
                "Variable name",
                myself.blockSpec,
                world,
                blck.fullImage(), // pic
                InputSlotMorph.prototype.getVarNamesDict.call(myself)
            );
        }

        menu.addItem(
            "help...",
            'showHelp'
        );
        if (shiftClicked) {
            top = this.topBlock();
            if (top instanceof ReporterBlockMorph) {
                menu.addItem(
                    "script pic with result...",
                    () => {
                        top.exportResultPic();
                    },
                    'open a new window\n' +
                        'with a picture of both\nthis script and its result',
                    new Color(100, 0, 0)
                );
            }
        }
        if (this.isTemplate) {
            if (this.parent instanceof SyntaxElementMorph) { // in-line
                if (this.selector === 'reportGetVar') { // script var definition
                    menu.addLine();
                    menu.addItem(
                        'rename...',
                        () => {
                            myself.refactorThisVar(true); // just the template
                        },
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
                            () => {
                                rcvr.toggleInheritedVariable(myself.blockSpec);
                            },
                            true,
                            'uncheck to\ndisinherit',
                            null
                        );
                    } else { // not inherited
                        if (this.isInheritedVariable(true)) { // shadowed
                            addOption(
                                'inherited',
                                () => {
                                    rcvr.toggleInheritedVariable(myself.blockSpec);
                                },
                                false,
                                null,
                                `${localize('check to inherit\nfrom')} ${rcvr.exemplar.name}`
                            );
                        }
                        addOption(
                            'transient',
                            'toggleTransientVariable',
                            myself.isTransientVariable(),
                            'uncheck to save contents\nin the project',
                            'check to prevent contents\nfrom being saved'
                        );
                        menu.addLine();
                        menu.addItem(
                            'rename...',
                            () => {
                                myself.refactorThisVar(true); // just the template
                            },
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
                        getCostumeIdx: 'costume #'
                    }[this.selector];
                    if (field && rcvr && rcvr.exemplar) {
                        menu.addLine();
                        addOption(
                            'inherited',
                            () => {
                                rcvr.toggleInheritanceForAttribute(field);
                            },
                            rcvr.inheritsAttribute(field),
                            'uncheck to\ndisinherit',
                            `${localize('check to inherit\nfrom')} ${rcvr.exemplar.name}`
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
                () => {
                    myself.relabel(
                        SpriteMorph.prototype.blockAlternatives[myself.selector]
                    );
                }
            );
        } else if (this.isCustomBlock && this.alternatives) {
            alternatives = this.alternatives();
            if (alternatives.length > 0) {
                menu.addItem(
                    'relabel...',
                    () => {myself.relabel(alternatives); }
                );
            }
        }

        menu.addItem(
            "duplicate",
            () => {
                const dup = myself.fullCopy();
                let ide = myself.parentThatIsA(IDE_Morph);
                const blockEditor = myself.parentThatIsA(BlockEditorMorph);
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
                    const cpy = myself.fullCopy();
                    const nb = cpy.nextBlock();
                    let ide = myself.parentThatIsA(IDE_Morph);
                    const blockEditor = myself.parentThatIsA(BlockEditorMorph);
                    if (nb) {nb.destroy(); }
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
        menu.addItem(
            "delete",
            'userDestroy'
        );
        menu.addItem(
            "script pic...",
            () => {
                const ide = myself.parentThatIsA(IDE_Morph) ||
                    myself.parentThatIsA(BlockEditorMorph).target.parentThatIsA(
                        IDE_Morph
                );
                ide.saveCanvasAs(
                    myself.topBlock().scriptPic(),
                    `${ide.projetName || localize('untitled')} ${localize('script pic')}`,
                    false // request new window
                );
            },
            'open a new window\nwith a picture of this script'
        );
        if (proc) {
            if (vNames.length) {
                menu.addLine();
                vNames.forEach(vn => {
                    menu.addItem(
                        `${vn}...`,
                        () => {
                            proc.doShowVar(vn);
                        }
                    );
                });
            }
            proc.homeContext.variables.names().forEach(vn => {
                if (!contains(vNames, vn)) {
                    menu.addItem(
                        `${vn}...`,
                        () => {
                            proc.doShowVar(vn);
                        }
                    );
                }
            });
            return menu;
        }
        if (this.parent.parentThatIsA(RingMorph)) {
            menu.addLine();
            menu.addItem("unringify", 'unringify');
            top = this.topBlock();
            if (this instanceof ReporterBlockMorph ||
                    (!(top instanceof HatBlockMorph))) {
                menu.addItem("ringify", 'ringify');
            }
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
    }

    developersMenu() {
        const menu = super.developersMenu.call(this);
        menu.addLine();
        menu.addItem("delete block", 'deleteBlock');
        menu.addItem("spec...", function () {

            new DialogBoxMorph(
                this,
                this.userSetSpec,
                this
            ).prompt(
                `${menu.title}\nspec`,
                this.blockSpec,
                this.world()
            );
        });
        return menu;
    }

    hidePrimitive() {
        const ide = this.parentThatIsA(IDE_Morph);
        let dict;
        let cat;
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
    }

    isInheritedVariable(shadowedOnly) {
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
    }

    isTransientVariable() {
        // private - only for variable getter template inside the palette
        const varFrame = this.scriptTarget().variables.silentFind(this.blockSpec);
        return varFrame ? varFrame.vars[this.blockSpec].isTransient : false;
    }

    toggleTransientVariable() {
        // private - only for variable getter template inside the palette
        const varFrame = this.scriptTarget().variables.silentFind(this.blockSpec);
        if (!varFrame) {return; }
        varFrame.vars[this.blockSpec].isTransient =
            !(varFrame.vars[this.blockSpec].isTransient);
    }

    deleteBlock() {
        // delete just this one block, keep inputs and next block around
        const scripts = this.parentThatIsA(ScriptsMorph);

        const nb = this.nextBlock ? this.nextBlock() : null;
        let tobefixed;
        let isindef;
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
    }

    ringify() {
        // wrap a Ring around me
        let ring; // copy-on-edit

        let top;
        let center;
        const target = this.selectForEdit();
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
                this.parent.silentReplaceInput(this, ring);
                ring.embed(this);
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
    }

    unringify() {
        // remove a Ring around me, if any
        let ring; // copy-on-edit

        let top;
        let center;
        let scripts;
        let block;
        const target = this.selectForEdit();
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
        top.fullChanged();
    }

    relabel(alternativeSelectors) {
        let menu; // copy-on-edit
        let oldInputs;
        let myself;
        const target = this.selectForEdit();
        if (target !== this) {
            return this.relabel.call(target, alternativeSelectors);
        }
        menu = new MenuMorph(this);
        oldInputs = this.inputs();
        myself = this;
        alternativeSelectors.forEach(sel => {
            const block = SpriteMorph.prototype.blockForSelector(sel);
            block.restoreInputs(oldInputs);
            block.fixBlockColor(null, true);
            block.addShadow(new Point(3, 3));
            menu.addItem(
                block,
                () => {
                    myself.setSelector(sel);
                }
            );
        });
        menu.popup(this.world(), this.bottomLeft().subtract(new Point(
            8,
            this instanceof CommandBlockMorph ? this.corner : 0
        )));
    }

    setSelector(aSelector) {
        // private - used only for relabel()
        const oldInputs = this.inputs();

        const scripts = this.parentThatIsA(ScriptsMorph);
        let surplus;
        let info;
        info = SpriteMorph.prototype.blocks[aSelector];
        this.setCategory(info.category);
        this.selector = aSelector;
        this.setSpec(localize(info.spec));
        surplus = this.restoreInputs(oldInputs);
        this.fixLabelColor();

        // place surplus blocks on scipts
        if (scripts && surplus.length) {
            surplus.forEach(blk => {
                blk.moveBy(10);
                scripts.add(blk);
            });
        }
    }

    restoreInputs(oldInputs) {
        // private - used only for relabel()
        // try to restore my previous inputs when my spec has been changed
        // return an Array of left-over blocks, if any
        let i = 0;

        let old;
        let nb;
        const leftOver = [];
        const myself = this;

        this.inputs().forEach(inp => {
            old = oldInputs[i];
            if (old instanceof ReporterBlockMorph) {
                myself.silentReplaceInput(inp, old.fullCopy());
            } else if (old && inp instanceof InputSlotMorph) {
                // original - turns empty numberslots to 0:
                // inp.setContents(old.evaluate());
                // "fix" may be wrong b/c constants
                if (old.contents) {
                    inp.setContents(old.contents().text);
                }
            } else if (old instanceof CSlotMorph && inp instanceof CSlotMorph) {
                nb = old.nestedBlock();
                if (nb) {
                    inp.nestedBlock(nb.fullCopy());
                }
            }
            i += 1;
        });

        // gather surplus blocks
        for (i; i < oldInputs.length; i += 1) {
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
        this.cachedInputs = null;
        return leftOver;
    }

    showHelp() {
        const myself = this;
        let ide = this.parentThatIsA(IDE_Morph);
        let blockEditor;
        const pic = new Image();
        let help;
        let comment;
        let block;

        const spec = this.isCustomBlock ?
                this.definition.helpSpec() : this.selector;

        let ctx;

        if (!ide) {
            blockEditor = this.parentThatIsA(BlockEditorMorph);
            if (blockEditor) {
                ide = blockEditor.target.parentThatIsA(IDE_Morph);
            }
        }

        pic.onload = () => {
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

        if (this.isCustomBlock && this.definition.comment) {
            block = this.fullCopy();
            block.addShadow();
            comment = this.definition.comment.fullCopy();
            comment.contents.parse();
            help = '';
            comment.contents.lines.forEach(line => {
                help = `${help}\n${line}`;
            });
            new DialogBoxMorph().inform(
                'Help',
                help.substr(1),
                myself.world(),
                block.fullImage()
            );
        } else {
            pic.src = ide.resourceURL('help', `${spec}.png`);
        }
    }

    // BlockMorph code mapping

    /*
        code mapping lets you use blocks to generate arbitrary text-based
        source code that can be exported and compiled / embedded elsewhere,
        it's not part of Snap's evaluator and not needed for Snap itself
    */

    mapToHeader() {
        // open a dialog box letting the user map header code via the GUI
        const key = this.selector.substr(0, 5) === 'reify' ?
                'reify' : this.selector;

        const block = this.codeDefinitionHeader();
        const myself = this;
        let help;
        let pic;
        block.addShadow(new Point(3, 3));
        pic = block.fullImageClassic();
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
                    myself.definition.codeHeader = code;
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
    }

    mapToCode() {
        // open a dialog box letting the user map code via the GUI
        const key = this.selector.substr(0, 5) === 'reify' ?
                'reify' : this.selector;

        const block = this.codeMappingHeader();
        const myself = this;
        let pic;
        block.addShadow(new Point(3, 3));
        pic = block.fullImageClassic();
        new DialogBoxMorph(
            this,
            code => {
                if (key === 'evaluateCustomBlock') {
                    myself.definition.codeMapping = code;
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
    }

    mapHeader(aString, key) {
        // primitive for programatically mapping header code
        const sel = key || this.selector.substr(0, 5) === 'reify' ?
                'reify' : this.selector;
        if (aString) {
            if (this.isCustomBlock) {
                this.definition.codeHeader = aString;
            } else {
                StageMorph.prototype.codeHeaders[sel] = aString;
            }
        }
    }

    mapCode(aString, key) {
        // primitive for programatically mapping code
        const sel = key || this.selector.substr(0, 5) === 'reify' ?
                'reify' : this.selector;
        if (aString) {
            if (this.isCustomBlock) {
                this.definition.codeMapping = aString;
            } else {
                StageMorph.prototype.codeMappings[sel] = aString;
            }
        }
    }

    mappedCode(definitions) {
        const key = this.selector.substr(0, 5) === 'reify' ?
                'reify' : this.selector;

        let code;
        let codeLines;
        let count = 1;
        let header;
        let headers;
        let headerLines;
        let body;
        let bodyLines;
        const defKey = this.isCustomBlock ? this.definition.spec : key;
        const defs = definitions || {};
        const parts = [];
        code = key === 'reportGetVar' ? this.blockSpec
                : this.isCustomBlock ? this.definition.codeMapping || ''
                        : StageMorph.prototype.codeMappings[key] || '';

        // map header
        if (key !== 'reportGetVar' && !defs.hasOwnProperty(defKey)) {
            defs[defKey] = null; // create the property for recursive definitions
            if (this.isCustomBlock) {
                header = this.definition.codeHeader || '';
                if (header.includes('<body')) { // replace with def mapping
                    body = '';
                    if (this.definition.body) {
                        body = this.definition.body.expression.mappedCode(defs);
                    }
                    bodyLines = body.split('\n');
                    headerLines = header.split('\n');
                    headerLines.forEach((headerLine, idx) => {
                        let prefix = '';
                        let indent;
                        if (headerLine.trimLeft().indexOf('<body') === 0) {
                            indent = headerLine.indexOf('<body');
                            prefix = headerLine.slice(0, indent);
                        }
                        headerLines[idx] = headerLine.replace(
                            new RegExp('<body>'),
                            bodyLines.join(`\n${prefix}`)
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
        this.inputs().forEach(input => {
            parts.push(input.mappedCode(defs).toString());
        });
        parts.forEach(part => {
            const partLines = part.split('\n');
            const placeHolder = `<#${count}>`;
            const rx = new RegExp(placeHolder, 'g');
            codeLines.forEach((codeLine, idx) => {
                let prefix = '';
                let indent;
                if (codeLine.trimLeft().indexOf(placeHolder) === 0) {
                    indent = codeLine.indexOf(placeHolder);
                    prefix = codeLine.slice(0, indent);
                }
                codeLines[idx] = codeLine.replace(
                    new RegExp(placeHolder),
                    partLines.join(`\n${prefix}`)
                );
                codeLines[idx] = codeLines[idx].replace(rx, partLines.join('\n'));
            });
            count += 1;
        });
        code = codeLines.join('\n');
        if (this.nextBlock && this.nextBlock()) { // Command
            code += (`\n${this.nextBlock().mappedCode(defs)}`);
        }
        if (!definitions) { // top-level, add headers
            headers = [];
            Object.keys(defs).forEach(each => {
                if (defs[each]) {
                    headers.push(defs[each]);
                }
            });
            if (headers.length) {
                return `${headers.join('\n\n')}\n\n${code}`;
            }
        }
        return code;
    }

    codeDefinitionHeader() {
        const block = this.isCustomBlock ? new PrototypeHatBlockMorph(this.definition)
                : SpriteMorph.prototype.blockForSelector(this.selector);

        const hat = new HatBlockMorph();
        let count = 1;

        if (this.isCustomBlock) {return block; }
        block.inputs().forEach(input => {
            const part = new TemplateSlotMorph(`#${count}`);
            block.silentReplaceInput(input, part);
            count += 1;
        });
        block.isPrototype = true;
        hat.setCategory("control");
        hat.setSpec('%s');
        hat.silentReplaceInput(hat.inputs()[0], block);
        if (this.category === 'control') {
            hat.alternateBlockColor();
        }
        return hat;
    }

    codeMappingHeader() {
        const block = this.isCustomBlock ? this.definition.blockInstance()
                : SpriteMorph.prototype.blockForSelector(this.selector);

        const hat = new HatBlockMorph();
        let count = 1;

        block.inputs().forEach(input => {
            const part = new TemplateSlotMorph(`<#${count}>`);
            block.silentReplaceInput(input, part);
            count += 1;
        });
        block.isPrototype = true;
        hat.setCategory("control");
        hat.setSpec('%s');
        hat.silentReplaceInput(hat.inputs()[0], block);
        if (this.category === 'control') {
            hat.alternateBlockColor();
        }
        return hat;
    }

    // Variable refactoring

    refactorThisVar(justTheTemplate) {
        // Rename all occurrences of the variable this block is holding,
        // taking care of its lexical scope

        const receiver = this.scriptTarget();

        const oldName = this.blockSpec;
        const cpy = this.fullCopy();

        cpy.addShadow();

        new DialogBoxMorph(this, renameVarTo, this).prompt(
            'Variable name',
            oldName,
            this.world(),
            cpy.fullImage(), // pic
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
    }

    varExistsError(ide, where) {
        ide.inform(
            'Variable exists',
            `A variable with this name already exists ${where || 'in this context'}.`
        );
    }

    doRefactorBlockParameter(oldName, newName, justTheTemplate) {
        const fragMorph = this.parentThatIsA(BlockInputFragmentMorph);
        const fragment = fragMorph.fragment.copy();
        const definer = fragMorph.parent;
        const editor = this.parentThatIsA(BlockEditorMorph);
        const scripts = editor.body.contents;

        if (definer.anyChild(any => any.blockSpec === newName)) {
            this.varExistsError(editor.target.parentThatIsA(IDE_Morph));
            return;
        }

        fragment.labelString = newName;
        fragMorph.updateBlockLabel(fragment);

        if (justTheTemplate) {
            return;
        }

        scripts.children.forEach(script => {
            script.refactorVarInStack(oldName, newName);
        });
    }

    doRefactorRingParameter(oldName, newName, justTheTemplate) {
        const ring = this.parentThatIsA(RingMorph);
        const script = ring.contents();
        const tb = this.topBlock();

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
    }

    doRefactorScriptVar(oldName, newName, justTheTemplate) {
        const definer = this.parentThatIsA(CommandBlockMorph);
        let receiver;
        let ide;

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
    }

    doRefactorSpriteVar(oldName, newName, justTheTemplate) {
        const receiver = this.scriptTarget();
        const ide = receiver.parentThatIsA(IDE_Morph);
        const oldWatcher = receiver.findVariableWatcher(oldName);
        let oldValue;
        let newWatcher;

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
                receiver.customBlocks.forEach(eachBlock => {
                    eachBlock.body.expression.refactorVarInStack(
                        oldName,
                        newName
                    );
                });
            }
        }

        ide.flushBlocksCache('variables');
        ide.refreshPalette();
    }

    doRefactorGlobalVar(oldName, newName, justTheTemplate) {
        const receiver = this.scriptTarget();
        const ide = receiver.parentThatIsA(IDE_Morph);
        const stage = ide ? ide.stage : null;
        const oldWatcher = receiver.findVariableWatcher(oldName);
        let oldValue;
        let newWatcher;

        if (!isNil(ide.globalVariables.vars[newName])) {
            this.varExistsError(ide);
            return;
        } else if (
                detect(
                    stage.children,
                    any => any instanceof SpriteMorph &&
                        any.hasSpriteVariable(newName))
                ) {
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
                    eachBlock.body.expression.refactorVarInStack(
                        oldName,
                        newName
                    );
                });
                stage.forAllChildren(child => {
                    if (child instanceof SpriteMorph) {
                        child.refactorVariableInstances(
                            oldName,
                            newName,
                            true
                        );
                        child.customBlocks.forEach(
                            eachBlock => {
                                eachBlock.body.expression
                                    .refactorVarInStack(
                                        oldName,
                                        newName
                                    );
                            }
                        );
                    }
                });
            }
        }

        ide.flushBlocksCache('variables');
        ide.refreshPalette();
    }

    // BlockMorph drawing

    eraseHoles(context) {
        const myself = this;
        const isRing = this instanceof RingMorph;
        const shift = this.edge * 0.5;
        let gradient;
        let rightX;
        const holes = this.parts().filter(part => part.isHole);

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
        holes.forEach(hole => {
            const w = hole.width(); // Opera needs this
            const h = Math.floor(hole.height()) - 2;
            context.clearRect(
                hole.bounds.origin.x - myself.bounds.origin.x + 1,
                hole.bounds.origin.y - myself.bounds.origin.y + 1,
                isRing ? w - 2 : w + 1,
                h
            );
        });
    }

    // BlockMorph highlighting

    addHighlight(oldHighlight) {
        const isHidden = !this.isVisible;
        let highlight;

        if (isHidden) {this.show(); }
        highlight = this.highlight(
            oldHighlight ? oldHighlight.color : this.activeHighlight,
            this.activeBlur,
            this.activeBorder
        );
        this.addBack(highlight);
        this.fullChanged();
        if (isHidden) {this.hide(); }
        return highlight;
    }

    addErrorHighlight() {
        const isHidden = !this.isVisible;
        let highlight;

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

    highlight(color, blur, border) {
        const highlight = new BlockHighlightMorph();
        const fb = this.fullBounds();

        const edge = useBlurredShadows && !MorphicPreferences.isFlat ?
                blur : border;

        highlight.setExtent(fb.extent().add(edge * 2));
        highlight.color = color;
        highlight.image = useBlurredShadows && !MorphicPreferences.isFlat ?
                this.highlightImageBlurred(color, blur)
                    : this.highlightImage(color, border);
        highlight.setPosition(fb.origin.subtract(new Point(edge, edge)));
        return highlight;
    }

    highlightImage(color, border) {
        let fb;
        let img;
        let hi;
        let ctx;
        let out;
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
    }

    highlightImageBlurred(color, blur) {
        let fb;
        let img;
        let hi;
        let ctx;
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
    }

    getHighlight() {
        let highlights;
        highlights = this.children.slice(0).reverse().filter(
            child => child instanceof BlockHighlightMorph
        );
        if (highlights.length !== 0) {
            return highlights[0];
        }
        return null;
    }

    outline(color, border) {
        const highlight = new BlockHighlightMorph();
        const fb = this.fullBounds();
        const edge = border;
        highlight.setExtent(fb.extent().add(edge * 2));
        highlight.color = color;
        highlight.image = this.highlightImage(color, border);
        highlight.setPosition(fb.origin.subtract(new Point(edge, edge)));
        return highlight;
    }

    // BlockMorph zebra coloring

    fixBlockColor(nearestBlock, isForced) {
        let nearest = nearestBlock;
        let clr;
        let cslot;

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
    }

    forceNormalColoring(silently) {
        const clr = SpriteMorph.prototype.blockColor[this.category];
        this.setColor(clr, silently);
        this.setLabelColor(
            new Color(255, 255, 255),
            clr.darker(this.labelContrast),
            new Point(-1, -1)
        );
        this.fixChildrensBlockColor(true);
    }

    alternateBlockColor() {
        const clr = SpriteMorph.prototype.blockColor[this.category];

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
    }

    ghost() {
        this.setColor(
            SpriteMorph.prototype.blockColor[this.category].lighter(35)
        );
    }

    fixLabelColor() {
        if (this.zebraContrast > 0 && this.category) {
            const clr = SpriteMorph.prototype.blockColor[this.category];
            if (this.color.eq(clr)) {
                this.setLabelColor(
                    new Color(255, 255, 255),
                    clr.darker(this.labelContrast),
                    MorphicPreferences.isFlat ? null : new Point(-1, -1)
                );
            } else {
                this.setLabelColor(
                    new Color(0, 0, 0),
                    clr.lighter(this.zebraContrast)
                        .lighter(this.labelContrast * 2),
                    MorphicPreferences.isFlat ? null : new Point(1, 1)
                );
            }
        }
    }

    fixChildrensBlockColor(isForced) {
        const myself = this;
        this.children.forEach(morph => {
            if (morph instanceof CommandBlockMorph) {
                morph.fixBlockColor(null, isForced);
            } else if (morph instanceof SyntaxElementMorph) {
                morph.fixBlockColor(myself, isForced);
                if (morph instanceof BooleanSlotMorph) {
                    morph.drawNew();
                }
            }
        });
    }

    setCategory(aString) {
        this.category = aString;
        this.startLayout();
        this.fixBlockColor();
        this.endLayout();
    }

    hasLabels() {
        return this.children.some(any => any instanceof StringMorph);
    }

    // BlockMorph copying

    fullCopy() {
        const ans = super.fullCopy.call(this);
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
            const cmnt = block.comment.fullCopy();
            block.comment = cmnt;
            cmnt.block = block;
        });
        ans.cachedInputs = null;
        return ans;
    }

    reactToTemplateCopy() {
        this.forceNormalColoring();
    }

    hasBlockVars() {
        return this.anyChild(any => any.isCustomBlock &&
            any.isGlobal &&
            any.definition.variableNames.length);
    }

    // BlockMorph events

    mouseClickLeft() {
        const top = this.topBlock();
        const receiver = top.scriptTarget();
        const shiftClicked = this.world().currentKey === 16;
        let stage;
        if (shiftClicked && !this.isTemplate) {
            return this.selectForEdit().focus(); // enable coopy-on-edit
        }
        if (top instanceof PrototypeHatBlockMorph) {
            return top.mouseClickLeft();
        }
        if (receiver) {
            stage = receiver.parentThatIsA(StageMorph);
            if (stage) {
                stage.threads.toggleProcess(top, receiver);
            }
        }
    }

    focus() {
        const scripts = this.parentThatIsA(ScriptsMorph);
        const world = this.world();
        let focus;
        if (!scripts || !ScriptsMorph.prototype.enableKeyboard) {return; }
        if (scripts.focus) {scripts.focus.stopEditing(); }
        world.stopEditing();
        focus = new ScriptFocusMorph(scripts, this);
        scripts.focus = focus;
        focus.getFocus(world);
        if (this instanceof HatBlockMorph) {
            focus.nextCommand();
        }
    }

    activeProcess() {
        const top = this.topBlock();
        const receiver = top.scriptTarget();
        let stage;
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
    }

    // BlockMorph thumbnail and script pic

    thumbnail(scale, clipWidth) {
        const nb = this.nextBlock();
        const fadeout = 12;
        let ext;
        let trgt;
        let ctx;
        let gradient;

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
    }

    scriptPic() {
        // answer a canvas image that also includes comments
        const scr = this.fullImage();

        const fb = this.stackFullBounds();
        const pic = newCanvas(fb.extent());
        const ctx = pic.getContext('2d');
        this.allComments().forEach(comment => {
            ctx.drawImage(
                comment.fullImageClassic(),
                comment.fullBounds().left() - fb.left(),
                comment.top() - fb.top()
            );
        });
        ctx.drawImage(scr, 0, 0);
        return pic;
    }

    // BlockMorph dragging and dropping

    rootForGrab() {
        return this;
    }

    /*
        for demo purposes, allows you to drop arg morphs onto
        blocks and forces a layout update. This section has
        no relevance in end user mode.
    */

    wantsDropOf(aMorph) {
        // override the inherited method
        return (aMorph instanceof ArgMorph
            || aMorph instanceof StringMorph
            || aMorph instanceof TextMorph
        ) && !this.isTemplate;
    }

    reactToDropOf(droppedMorph) {
        droppedMorph.isDraggable = false;
        if (droppedMorph instanceof InputSlotMorph) {
            droppedMorph.drawNew();
        } else if (droppedMorph instanceof MultiArgMorph) {
            droppedMorph.fixLayout();
        }
        this.fixLayout();
        this.buildSpec();
    }

    situation() {
        // answer a dictionary specifying where I am right now, so
        // I can slide back to it if I'm dropped somewhere else
        if (!(this.parent instanceof TemplateSlotMorph)) {
            const scripts = this.parentThatIsA(ScriptsMorph);
            if (scripts) {
                return {
                    origin: scripts,
                    position: this.position().subtract(scripts.position())
                };
            }
        }
        return super.situation.call(this);
    }

    // BlockMorph sticky comments

    prepareToBeGrabbed(hand) {
        const myself = this;
        this.allComments().forEach(comment => {
            comment.startFollowing(myself, hand.world);
        });
    }

    justDropped() {
        this.alpha = 1;
        this.allComments().forEach(comment => {
            comment.stopFollowing();
        });
    }

    allComments() {
        return this.allChildren().filter(block => !isNil(block.comment)).map(block => block.comment);
    }

    destroy(justThis) {
        // private - use IDE_Morph.removeBlock() to first stop all my processes
        if (justThis) {
            if (!isNil(this.comment)) {
                this.comment.destroy();
            }
        } else {
            this.allComments().forEach(comment => {
                comment.destroy();
            });
        }
        super.destroy.call(this);
    }

    stackHeight() {
        const fb = this.fullBounds();

        const commentsBottom = Math.max(this.allComments().map(
            comment => comment.bottom()
        )) || this.bottom();

        return Math.max(fb.bottom(), commentsBottom) - fb.top();
    }

    stackFullBounds() {
        const fb = this.fullBounds();
        this.allComments().forEach(comment => {
            fb.mergeWith(comment.bounds);
        });
        return fb;
    }

    stackWidth() {
        const fb = this.fullBounds();

        const commentsRight = Math.max(this.allComments().map(
            comment => comment.right()
        )) || this.right();

        return Math.max(fb.right(), commentsRight) - fb.left();
    }

    snap() {
        const top = this.topBlock();
        let receiver;
        let stage;
        let ide;
        top.allComments().forEach(comment => {
            comment.align(top);
        });
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
    }
}