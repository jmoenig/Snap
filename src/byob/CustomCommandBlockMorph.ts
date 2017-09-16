// CustomCommandBlockMorph /////////////////////////////////////////////

import CommandBlockMorph from "../blocks/CommandBlockMorph";

// CustomCommandBlockMorph shared settings:

CustomCommandBlockMorph.prototype.isCustomBlock = true;

// CustomCommandBlockMorph instance creation:

export default class CustomCommandBlockMorph extends CommandBlockMorph {
    constructor(definition, isProto) {
        this.init(definition, isProto);
    }

    init(definition, isProto) {
        this.definition = definition; // mandatory
        this.isGlobal = definition ? definition.isGlobal : false;
        this.isPrototype = isProto || false; // optional
        super.init.call(this, true); // silently
        this.category = definition.category;
        this.selector = 'evaluateCustomBlock';
        this.variables = null;
        this.initializeVariables();
        if (definition) { // needed for de-serializing
            this.refresh();
        }
    }

    initializeVariables(oldVars) {
        const myself = this;
        this.variables = new VariableFrame();
        if (!this.isGlobal) {
            return;
        }
        this.definition.variableNames.forEach(name => {
            const v = oldVars ? oldVars[name] : null;
            myself.variables.addVar(
                name,
                v instanceof Variable ? v.value : null
            );
        });
    }

    refresh(aDefinition, silently) {
        const def = aDefinition || this.definition;

        const newSpec = this.isPrototype ?
                def.spec : def.blockSpec();

        let oldInputs;

        // make sure local custom blocks don't hold on to a method.
        // future performance optimization plan:
        // null out the definition for local blocks here,
        // and then cache them again when invoking them
        if (!this.isGlobal && !this.isPrototype) {
            this.definition = null;
        }

        this.setCategory(def.category);
        if (this.blockSpec !== newSpec) {
            oldInputs = this.inputs();
            if (!this.zebraContrast) {
                this.forceNormalColoring();
            } else {
                this.fixBlockColor();
            }
            this.setSpec(newSpec, silently, def);
            this.fixLabelColor();
            this.restoreInputs(oldInputs);
        } else { // update all input slots' drop-downs
            this.inputs().forEach((inp, i) => {
                if (inp instanceof InputSlotMorph) {
                    inp.setChoices(...def.inputOptionsOfIdx(i));
                }
            });
        }

        // find unnamed upvars and label them
        // to their internal definition (default)
        this.cachedInputs = null;
        this.inputs().forEach((inp, idx) => {
            if (inp instanceof TemplateSlotMorph && inp.contents() === '\u2191') {
                inp.setContents(def.inputNames()[idx]);
            }
        });

        // initialize block vars
        // preserve values of unchanged variable names
        if (this.isGlobal) {
            this.initializeVariables(this.variables.vars);
        }

        // make (double) sure I'm colored correctly
        this.forceNormalColoring();
        this.drawNew();
        this.fixBlockColor(null, true);
    }

    restoreInputs(oldInputs) {
        // try to restore my previous inputs when my spec has been changed
        let i = 0;

        let old;
        const myself = this;

        if (this.isPrototype) {return; }
        this.cachedInputs = null;
        this.inputs().forEach(inp => {
            old = oldInputs[i];
            if (old instanceof ReporterBlockMorph &&
                    (!(inp instanceof TemplateSlotMorph))) {
                myself.silentReplaceInput(inp, old.fullCopy());
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
        this.cachedInputs = null;
    }

    refreshDefaults(definition) {
        // fill my editable slots with the defaults specified in my definition
        const inputs = this.inputs();

        let idx = 0;
        const myself = this;

        inputs.forEach(inp => {
            if (inp instanceof InputSlotMorph || inp instanceof BooleanSlotMorph) {
                inp.setContents(
                    (definition || myself.definition).defaultValueOfInputIdx(idx)
                );
            }
            idx += 1;
        });
        this.cachedInputs = null;
    }

    refreshPrototype() {
        // create my label parts from my (edited) fragments only
        let hat;

        let protoSpec;
        const frags = [];
        let myself = this;
        let words;
        let newFrag;
        let i = 0;

        if (!this.isPrototype) {return null; }

        hat = this.parentThatIsA(PrototypeHatBlockMorph);

        // remember the edited fragments
        this.parts().forEach(part => {
            if (!part.fragment.isDeleted) {
                // take into consideration that a fragment may spawn others
                // if it isn't an input label consisting of several words
                if (part.fragment.type) { // marked as input, take label as is
                    frags.push(part.fragment);
                } else { // not an input, devide into several non-input fragments
                    words = myself.definition.parseSpec(
                        part.fragment.labelString
                    );
                    words.forEach(word => {
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

        myself.parts().forEach(part => {
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
    }

    refreshPrototypeSlotTypes() {
        this.parts().forEach(part => {
            if (part instanceof BlockInputFragmentMorph) {
                part.template().instantiationSpec = part.contents();
                part.setContents(part.fragment.defTemplateSpecFragment());
            }
        });
        this.fixBlockColor(null, true); // enforce zebra coloring of templates
    }

    inputFragmentNames() {
        // for the variable name slot drop-down menu (in the block editor)
        const ans = [];

        this.parts().forEach(part => {
            if (!part.fragment.isDeleted && (part.fragment.type)) {
                ans.push(part.fragment.labelString);
            }
        });
        return ans;
    }

    upvarFragmentNames() {
        // for the variable name slot drop-down menu (in the block editor)
        const ans = [];

        this.parts().forEach(part => {
            if (!part.fragment.isDeleted && (part.fragment.type === '%upvar')) {
                ans.push(part.fragment.labelString);
            }
        });
        return ans;
    }

    upvarFragmentName(idx) {
        // for block prototypes while they are being edited
        return this.upvarFragmentNames()[idx] || '\u2191';
    }

    specFromFragments() {
        // for block prototypes while they are being edited
        let ans = '';

        this.parts().forEach(part => {
            if (!part.fragment.isDeleted) {
                ans = `${ans + part.fragment.defSpecFragment()} `;
            }
        });
        return ans.trim();
    }

    blockSpecFromFragments() {
        // for block instances while their prototype is being edited
        let ans = '';

        this.parts().forEach(part => {
            if (!part.fragment.isDeleted) {
                ans = `${ans + part.fragment.blockSpecFragment()} `;
            }
        });
        return ans.trim();
    }

    declarationsFromFragments() {
        // format for type declarations: {inputName : [type, default]}
        const ans = {};

        this.parts().forEach(part => {
            if (part instanceof BlockInputFragmentMorph) {
                ans[part.fragment.labelString] = [
                    part.fragment.type,
                    part.fragment.defaultValue,
                    part.fragment.options,
                    part.fragment.isReadOnly
                ];
            }
        });
        return ans;
    }

    parseSpec(spec) {
        if (!this.isPrototype) {
            return super.parseSpec.call(this, spec);
        }
        return CustomBlockDefinition.prototype.parseSpec(spec);
    }

    mouseClickLeft() {
        if (!this.isPrototype) {
            return super.mouseClickLeft.call(this);
        }
        this.edit();
    }

    edit() {
        const myself = this;
        let def = this.definition;
        let editor;
        let block;
        let hat;
        let rcvr;

        if (this.isPrototype) {
            block = this.definition.blockInstance();
            block.addShadow();
            hat = this.parentThatIsA(PrototypeHatBlockMorph);
            new BlockDialogMorph(
                null,
                definition => {
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
            // check for local custom block inheritance
            rcvr = this.scriptTarget();
            if (!this.isGlobal) {
                if (contains(
                        Object.keys(rcvr.inheritedBlocks()),
                        this.blockSpec
                    )
                ) {
                    this.duplicateBlockDefinition();
                    return;
                }
                def = rcvr.getMethod(this.blockSpec);
            }
            Morph.prototype.trackChanges = false;
            editor = new BlockEditorMorph(def, rcvr);
            editor.popUp();
            Morph.prototype.trackChanges = true;
            editor.changed();
        }
    }

    labelPart(spec) {
        let part;

        if (!this.isPrototype) {
            return super.labelPart.call(this, spec);
        }
        if ((spec[0] === '%') && (spec.length > 1)) {
            // part = new BlockInputFragmentMorph(spec.slice(1));
            part = new BlockInputFragmentMorph(spec.replace(/%/g, ''));
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
    }

    placeHolder() {
        let part;

        part = new BlockLabelPlaceHolderMorph();
        part.fontSize = this.fontSize * 1.4;
        part.color = new Color(45, 45, 45);
        part.drawNew();
        return part;
    }

    attachTargets() {
        if (this.isPrototype) {
            return [];
        }
        return super.attachTargets.call(this);
    }

    isInUse() {
        // answer true if an instance of my definition is found
        // in any of my receiver's scripts or block definitions
        // NOTE: for sprite-local blocks only to be used in a situation
        // where the user actively clicks on a block in the IDE,
        // e.g. to edit it (and change its type)
        const def = this.definition;

        const rcvr = this.scriptTarget();
        const ide = rcvr.parentThatIsA(IDE_Morph);
        if (def.isGlobal && ide) {
            return ide.sprites.asArray().concat([ide.stage]).some(
                (any, idx) => any.usesBlockInstance(def, false, idx)
            );
        }
        return rcvr.allDependentInvocationsOf(this.blockSpec).length > 0;
    }

    // CustomCommandBlockMorph menu:

    userMenu() {
        const hat = this.parentThatIsA(PrototypeHatBlockMorph);
        const rcvr = this.scriptTarget();
        const myself = this;
        const shiftClicked = this.world().currentKey === 16;
        let menu;

        function monitor(vName) {
            const stage = rcvr.parentThatIsA(StageMorph);
            const varFrame = myself.variables;
            menu.addItem(
                `${vName}...`,
                () => {
                    let watcher = detect(
                        stage.children,
                        morph => morph instanceof WatcherMorph
                            && morph.target === varFrame
                            && morph.getter === vName
                    );

                    let others;
                    if (watcher !== null) {
                        watcher.show();
                        watcher.fixLayout(); // re-hide hidden parts
                        return;
                    }
                    watcher = new WatcherMorph(
                        `${vName} ${localize('(temporary)')}`,
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

        if (this.isPrototype) {
            menu = new MenuMorph(this);
            menu.addItem(
                "script pic...",
                function () {
                    const ide = this.world().children[0];
                    ide.saveCanvasAs(
                        this.topBlock().scriptPic(),
                        `${ide.projectName || localize('untitled')} ${localize('script pic')}`,
                        false // request opening a new window
                    );
                },
                'open a new window\nwith a picture of this script'
            );
            if (this.isGlobal) {
                if (hat.inputs().length < 2) {
                    menu.addItem(
                        "block variables...",
                        () => {
                            hat.enableBlockVars();
                        },
                        'experimental -\nunder construction'
                    );
                } else {
                    menu.addItem(
                        "remove block variables...",
                        () => {
                            hat.enableBlockVars(false);
                        },
                        'experimental -\nunder construction'
                    );
                }
            }
        } else {
            menu = this.constructor.uber.userMenu.call(this);
            if (!menu) {
                menu = new MenuMorph(this);
            } else {
                menu.addLine();
            }
            if (shiftClicked) {
                // menu.addItem("export definition...", 'exportBlockDefinition');
                menu.addItem(
                    "duplicate block definition...",
                    'duplicateBlockDefinition',
                    null,
                    new Color(100, 0, 0)
                );
            }

            // if global or own method - let the user delete the definition
            if (this.isGlobal ||
                contains(
                    Object.keys(rcvr.ownBlocks()),
                    this.blockSpec
                )
            ) {
                menu.addItem(
                    "delete block definition...",
                    'deleteBlockDefinition'
                );
            }

            this.variables.names().forEach(vName => {
                monitor(vName);
            });
        }
        menu.addItem("edit...", 'edit'); // works also for prototypes
        return menu;
    }

    exportBlockDefinition() {
        const xml = new SnapSerializer().serialize(this.definition);
        const ide = this.parentThatIsA(IDE_Morph);

        ide.saveXMLAs(xml, this.spec);
    }

    duplicateBlockDefinition() {
        const rcvr = this.scriptTarget();
        const ide = this.parentThatIsA(IDE_Morph);
        const def = this.isGlobal ? this.definition : rcvr.getMethod(this.blockSpec);
        const dup = def.copyAndBindTo(rcvr);
        if (this.isGlobal) {
            ide.stage.globalBlocks.push(dup);
        } else {
            rcvr.customBlocks.push(dup);
        }
        ide.flushPaletteCache();
        ide.refreshPalette();
        new BlockEditorMorph(dup, rcvr).popUp();
    }

    deleteBlockDefinition() {
        let idx;
        let stage;
        let ide;
        let method;
        let block;
        const rcvr = this.scriptTarget();
        const myself = this;
        if (this.isPrototype) {
            return null; // under construction...
        }
        method = this.isGlobal? this.definition
                : rcvr.getLocalMethod(this.blockSpec);
        block = method.blockInstance();
        block.addShadow();
        new DialogBoxMorph(
            this,
            () => {
                rcvr.deleteAllBlockInstances(method);
                if (method.isGlobal) {
                    stage = rcvr.parentThatIsA(StageMorph);
                    idx = stage.globalBlocks.indexOf(method);
                    if (idx !== -1) {
                        stage.globalBlocks.splice(idx, 1);
                    }
                } else {
                    // delete local definition
                    idx = rcvr.customBlocks.indexOf(method);
                    if (idx !== -1) {
                        rcvr.customBlocks.splice(idx, 1);
                    }
                    // refresh instances of inherited method, if any
                    method = rcvr.getMethod(myself.blockSpec);
                    if (method) {
                        rcvr.allDependentInvocationsOf(myself.blockSpec).forEach(
                            block => {
                                block.refresh(method);
                            }
                        );
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
    }

    // CustomCommandBlockMorph relabelling

    relabel(alternatives) {
        const menu = new MenuMorph(this);

        const oldInputs = this.inputs().map(
            each => each.fullCopy()
        );

        const myself = this;
        alternatives.forEach(def => {
            const block = def.blockInstance();
            block.restoreInputs(oldInputs);
            block.fixBlockColor(null, true);
            block.addShadow(new Point(3, 3));
            menu.addItem(
                block,
                () => {
                    myself.definition = def;
                    myself.refresh();
                }
            );
        });
        menu.popup(this.world(), this.bottomLeft().subtract(new Point(
            8,
            this instanceof CommandBlockMorph ? this.corner : 0
        )));
    }

    alternatives() {
        const rcvr = this.scriptTarget();
        const stage = rcvr.parentThatIsA(StageMorph);
        const allDefs = rcvr.customBlocks.concat(stage.globalBlocks);

        const type = this instanceof CommandBlockMorph ? 'command'
            : (this.isPredicate ? 'predicate' : 'reporter');

        const myself = this;
        return allDefs.filter(each => each !== myself.definition &&
            each.type === type);
    }
}