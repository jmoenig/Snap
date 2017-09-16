// ScriptsMorph ////////////////////////////////////////////////////////

/*
    I give feedback about possible drop targets and am in charge
    of actually snapping blocks together.

    My children are the top blocks of scripts.

    I store a back-pointer to my owner, i.e. the object (sprite)
    to whom my scripts apply.
*/

// ScriptsMorph preference settings

ScriptsMorph.prototype.cleanUpMargin = 20;
ScriptsMorph.prototype.cleanUpSpacing = 15;
ScriptsMorph.prototype.isPreferringEmptySlots = true;
ScriptsMorph.prototype.enableKeyboard = true;
ScriptsMorph.prototype.enableNestedAutoWrapping = true;

// ScriptsMorph instance creation:

export default class ScriptsMorph extends FrameMorph {
    constructor() {
        this.init();
    }

    init() {
        this.feedbackColor = SyntaxElementMorph.prototype.feedbackColor;
        this.feedbackMorph = new BoxMorph();
        this.rejectsHats = false;

        // "undrop" attributes:
        this.lastDroppedBlock = null;
        this.lastReplacedInput = null;
        this.lastDropTarget = null;
        this.lastPreservedBlocks = null;
        this.lastNextBlock = null;
        this.lastWrapParent = null;

        // keyboard editing support:
        this.focus = null;

        super.init.call(this);
        this.setColor(new Color(70, 70, 70));
        this.noticesTransparentClick = true;

        // initialize "undrop" queue
        this.isAnimating = false;
        this.dropRecord = null;
        this.recordDrop();
    }

    // ScriptsMorph deep copying:

    fullCopy() {
        const cpy = new ScriptsMorph();
        const pos = this.position();
        let child;
        if (this.focus) {
            this.focus.stopEditing();
        }
        this.children.forEach(morph => {
            if (!morph.block) { // omit anchored comments
                child = morph.fullCopy();
                cpy.add(child);
                child.setPosition(morph.position().subtract(pos));
                if (child instanceof BlockMorph) {
                    child.allComments().forEach(comment => {
                        comment.align(child);
                    });
                }
            }
        });
        cpy.adjustBounds();
        return cpy;
    }

    // ScriptsMorph stepping:

    step() {
        const world = this.world();
        const hand = world.hand;
        let block;

        if (this.feedbackMorph.parent) {
            this.feedbackMorph.destroy();
            this.feedbackMorph.parent = null;
        }
        if (this.focus && (!world.keyboardReceiver ||
                world.keyboardReceiver instanceof StageMorph)) {
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
    }

    showReporterDropFeedback(block, hand) {
        const target = this.closestInput(block, hand);

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
    }

    showCommandDropFeedback(block) {
        let y;
        let target;

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
    }

    showCommentDropFeedback(comment, hand) {
        const target = this.closestBlock(comment, hand);
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
    }

    showCSlotWrapFeedback(srcBlock, trgBlock) {
        let clr;
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
        this.feedbackMorph.drawNew();
        this.feedbackMorph.changed();
    }

    closestInput(reporter, hand) {
        // passing the hand is optional (when dragging reporters)
        const fb = reporter.fullBoundsNoShadow();

        const stacks = this.children.filter(child => (child instanceof BlockMorph) &&
            (child.fullBounds().intersects(fb)));

        const blackList = reporter.allInputs();
        let handPos;
        let target;
        let all;

        all = [];
        stacks.forEach(stack => {
            all = all.concat(stack.allInputs());
        });
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
                    input => (input instanceof InputSlotMorph
                            || (input instanceof ArgMorph
                                && !(input instanceof CommandSlotMorph)
                                && !(input instanceof MultiArgMorph))
                            || (input instanceof RingMorph
                                && !input.contents())
                            || input.isEmptySlot())
                        && !input.isLocked()
                        && input.bounds.containsPoint(handPos)
                        && !contains(blackList, input)
                );
                if (target) {
                    return target;
                }
            }
            target = detect(
                all,
                input => (input instanceof InputSlotMorph
                        || input instanceof ArgMorph
                        || (input instanceof RingMorph
                            && !input.contents())
                        || input.isEmptySlot())
                    && !input.isLocked()
                    && input.bounds.intersects(fb)
                    && !contains(blackList, input)
                    && touchingVariadicArrowsIfAny(input)
            );
            if (target) {
                return target;
            }
        }

        if (hand) {
            handPos = hand.position();
            target = detect(
                all,
                input => (input !== reporter)
                    && !input.isLocked()
                    && input.bounds.containsPoint(handPos)
                    && !(input.parent instanceof PrototypeHatBlockMorph)
                    && !contains(blackList, input)
            );
            if (target) {
                return target;
            }
        }
        return detect(
            all,
            input => (input !== reporter)
                && !input.isLocked()
                && input.fullBounds().intersects(fb)
                && !(input.parent instanceof PrototypeHatBlockMorph)
                && !contains(blackList, input)
        );
    }

    closestBlock(comment, hand) {
        // passing the hand is optional (when dragging comments)
        const fb = comment.bounds;

        const stacks = this.children.filter(child => (child instanceof BlockMorph) &&
            (child.fullBounds().intersects(fb)));

        let handPos;
        let target;
        let all;

        all = [];
        stacks.forEach(stack => {
            all = all.concat(stack.allChildren().slice(0).reverse().filter(
                child => child instanceof BlockMorph &&
                    !child.isTemplate
            ));
        });
        if (all.length === 0) {return null; }

        if (hand) {
            handPos = hand.position();
            target = detect(
                all,
                block => !block.comment
                    && !block.isPrototype
                    && block.bounds.containsPoint(handPos)
            );
            if (target) {
                return target;
            }
        }
        return detect(
            all,
            block => !block.comment
                && !block.isPrototype
                && block.bounds.intersects(fb)
        );
    }

    // ScriptsMorph user menu

    userMenu() {
        const menu = new MenuMorph(this);
        let ide = this.parentThatIsA(IDE_Morph);
        const shiftClicked = this.world().currentKey === 16;
        let blockEditor;
        const myself = this;
        const obj = this.scriptTarget();
        let hasUndropQueue;
        const stage = obj.parentThatIsA(StageMorph);

        function addOption(label, toggle, test, onHint, offHint) {
            const on = '\u2611 ';
            const off = '\u2610 ';
            menu.addItem(
                (test ? on : off) + localize(label),
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
        if (this.dropRecord) {
            if (this.dropRecord.lastRecord) {
                hasUndropQueue = true;
                menu.addPair(
                    [
                        new SymbolMorph(
                            'turnBack',
                            MorphicPreferences.menuFontSize
                        ),
                        localize('undrop')
                    ],
                    'undrop',
                    '^Z',
                    'undo the last\nblock drop\nin this pane'
                );
            }
            if (this.dropRecord.nextRecord) {
                hasUndropQueue = true;
                menu.addPair(
                    [
                        new SymbolMorph(
                            'turnForward',
                            MorphicPreferences.menuFontSize
                        ),
                        localize('redrop')
                    ],
                    'redrop',
                    '^Y',
                    'redo the last undone\nblock drop\nin this pane'
                );
            }
            if (hasUndropQueue) {
                if (shiftClicked) {
                    menu.addItem(
                        "clear undrop queue",
                        () => {
                            myself.dropRecord = null;
                            myself.clearDropInfo();
                            myself.recordDrop();
                        },
                        'forget recorded block drops\non this pane',
                        new Color(100, 0, 0)
                    );
                }
                menu.addLine();
            }
        }

        menu.addItem('clean up', 'cleanUp', 'arrange scripts\nvertically');
        menu.addItem('add comment', 'addComment');
        menu.addItem(
            'scripts pic...',
            'exportScriptsPicture',
            'open a new window\nwith a picture of all scripts'
        );
        if (ide) {
            menu.addLine();
            if (!blockEditor && obj.exemplar) {
                    addOption(
                        'inherited',
                        () => {
                            obj.toggleInheritanceForAttribute('scripts');
                        },
                        obj.inheritsAttribute('scripts'),
                        'uncheck to\ndisinherit',
                        `${localize('check to inherit\nfrom')} ${obj.exemplar.name}`
                    );
            }
            menu.addItem(
                'make a block...',
                () => {
                    new BlockDialogMorph(
                        null,
                        definition => {
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
    }

    // ScriptsMorph user menu features:

    cleanUp() {
        const // enable copy-on-edit
        target = this.selectForEdit();

        const origin = target.topLeft();
        let y = target.cleanUpMargin;
        target.children.sort((a, b) => // make sure the prototype hat block always stays on top
        (a instanceof PrototypeHatBlockMorph ? 0 : a.top() - b.top())).forEach(child => {
            if (child instanceof CommentMorph && child.block) {
                return; // skip anchored comments
            }
            child.setPosition(origin.add(new Point(target.cleanUpMargin, y)));
            if (child instanceof BlockMorph) {
                child.allComments().forEach(comment => {
                    comment.align(child, true); // ignore layer
                });
            }
            y += child.stackHeight() + target.cleanUpSpacing;
        });
        if (target.parent) {
            target.setPosition(target.parent.topLeft());
        }
        target.adjustBounds();
    }

    exportScriptsPicture() {
        const pic = this.scriptsPicture();
        const ide = this.world().children[0];
        if (pic) {
            ide.saveCanvasAs(
                pic,
                `${ide.projetName || localize('untitled')} ${localize('script pic')}`,
                false // request new window
            );
        }
    }

    scriptsPicture() {
        // private - answer a canvas containing the pictures of all scripts
        let boundingBox;

        let pic;
        let ctx;
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
            const pos = child.fullBounds().origin;
            if (child.isVisible) {
                ctx.drawImage(
                    child.fullImageClassic(),
                    pos.x - boundingBox.origin.x,
                    pos.y - boundingBox.origin.y
                );
            }
        });
        return pic;
    }

    addComment() {
        let ide = this.parentThatIsA(IDE_Morph);
        const blockEditor = this.parentThatIsA(BlockEditorMorph);
        const world = this.world();
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
    }

    // ScriptsMorph undrop / redrop

    undrop() {
        const myself = this;
        if (this.isAnimating) {return; }
        if (!this.dropRecord || !this.dropRecord.lastRecord) {return; }
        if (!this.dropRecord.situation) {
            this.dropRecord.situation =
                this.dropRecord.lastDroppedBlock.situation();
        }
        this.isAnimating = true;
        this.dropRecord.lastDroppedBlock.slideBackTo(
            this.dropRecord.lastOrigin,
            null,
            this.recoverLastDrop(),
            () => {
                myself.updateUndropControls();
                myself.isAnimating = false;
            }
        );
        this.dropRecord = this.dropRecord.lastRecord;
    }

    redrop() {
        const myself = this;
        if (this.isAnimating) {return; }
        if (!this.dropRecord || !this.dropRecord.nextRecord) {return; }
        this.dropRecord = this.dropRecord.nextRecord;
        if (this.dropRecord.action === 'delete') {
            this.recoverLastDrop(true);
            this.dropRecord.lastDroppedBlock.destroy();
            this.updateUndropControls();
        } else {
            this.isAnimating = true;
            this.dropRecord.lastDroppedBlock.slideBackTo(
                this.dropRecord.situation,
                null,
                this.recoverLastDrop(true),
                () => {
                    myself.updateUndropControls();
                    myself.isAnimating = false;
                }
            );
        }
    }

    recoverLastDrop(forRedrop) {
        // retrieve the block last touched by the user and answer a function
        // to be called after the animation that moves it back right before
        // dropping it into its former situation
        const rec = this.dropRecord;

        let dropped;
        let onBeforeDrop;
        let parent;

        if (!rec || !rec.lastDroppedBlock) {
            throw new Error('nothing to undrop');
        }
        dropped = rec.lastDroppedBlock;
        parent = dropped.parent;
        if (dropped instanceof CommandBlockMorph) {
            if (rec.lastNextBlock) {
                if (rec.action === 'delete') {
                    if (forRedrop) {
                        this.add(rec.lastNextBlock);
                    }
                } else {
                    this.add(rec.lastNextBlock);
                }
            }
            if (rec.lastDropTarget) {
                if (rec.lastDropTarget.loc === 'bottom') {
                    if (rec.lastDropTarget.type === 'slot') {
                        if (rec.lastNextBlock) {
                            rec.lastDropTarget.element.nestedBlock(
                                rec.lastNextBlock
                            );
                        }
                    } else { // 'block'
                        if (rec.lastNextBlock) {
                            rec.lastDropTarget.element.nextBlock(
                                rec.lastNextBlock
                            );
                        }
                    }
                } else if (rec.lastDropTarget.loc === 'top') {
                    this.add(rec.lastDropTarget.element);
                } else if (rec.lastDropTarget.loc === 'wrap') {
                    const cslot = detect( // could be cached...
                        rec.lastDroppedBlock.inputs(), // ...although these are
                        each => each instanceof CSlotMorph
                    );
                    if (rec.lastWrapParent instanceof CommandBlockMorph) {
                        if (forRedrop) {
                            onBeforeDrop = () => {
                                cslot.nestedBlock(rec.lastDropTarget.element);
                            };
                        } else {
                            rec.lastWrapParent.nextBlock(
                                rec.lastDropTarget.element
                            );
                        }
                    } else if (rec.lastWrapParent instanceof CommandSlotMorph) {
                        if (forRedrop) {
                            onBeforeDrop = () => {
                                cslot.nestedBlock(rec.lastDropTarget.element);
                            };
                        } else {
                            rec.lastWrapParent.nestedBlock(
                                rec.lastDropTarget.element
                            );
                        }
                    } else {
                        this.add(rec.lastDropTarget.element);
                    }

                    // fix zebra coloring.
                    // this could be generalized into the fixBlockColor mechanism
                    rec.lastDropTarget.element.blockSequence().forEach(
                        cmd => {cmd.fixBlockColor(); }
                    );
                    cslot.fixLayout();
                }
            }
        } else if (dropped instanceof ReporterBlockMorph) {
            if (rec.lastDropTarget) {
                rec.lastDropTarget.replaceInput(
                    rec.lastDroppedBlock,
                    rec.lastReplacedInput
                );
                rec.lastDropTarget.fixBlockColor(null, true);
                if (rec.lastPreservedBlocks) {
                    rec.lastPreservedBlocks.forEach(morph => {
                        morph.destroy();
                    });
                }
            }
        } else if (dropped instanceof CommentMorph) {
            if (forRedrop && rec.lastDropTarget) {
                onBeforeDrop = () => {
                    rec.lastDropTarget.element.comment = dropped;
                    dropped.block = rec.lastDropTarget.element;
                    dropped.align();
                };
            }
        } else {
            throw new Error(`unsupported action for ${dropped}`);
        }
        this.clearDropInfo();
        dropped.prepareToBeGrabbed(this.world().hand);
        if (dropped instanceof CommentMorph) {
            dropped.removeShadow();
        }
        this.add(dropped);
        parent.reactToGrabOf(dropped);
        if (dropped instanceof ReporterBlockMorph && parent instanceof BlockMorph) {
            parent.changed();
        }
        if (rec.action === 'delete') {
            if (forRedrop && rec.lastNextBlock) {
                if (parent instanceof CommandBlockMorph) {
                    parent.nextBlock(rec.lastNextBlock);
                } else if (parent instanceof CommandSlotMorph) {
                    parent.nestedBlock(rec.lastNextBlock);
                }
            }

            // animate "undelete"
            if (!forRedrop) {
                dropped.moveBy(new Point(-100, -20));
            }
        }
        return onBeforeDrop;
    }

    clearDropInfo() {
        this.lastDroppedBlock = null;
        this.lastReplacedInput = null;
        this.lastDropTarget = null;
        this.lastPreservedBlocks = null;
        this.lastNextBlock = null;
        this.lastWrapParent = null;
    }

    recordDrop(lastGrabOrigin) {
        // support for "undrop" / "redrop"
         const record = {
            lastDroppedBlock: this.lastDroppedBlock,
            lastReplacedInput: this.lastReplacedInput,
            lastDropTarget: this.lastDropTarget,
            lastPreservedBlocks: this.lastPreservedBlocks,
            lastNextBlock: this.lastNextBlock,
            lastWrapParent: this.lastWrapParent,
            lastOrigin: lastGrabOrigin,
            action: null,
            situation: null,
            lastRecord: this.dropRecord,
            nextRecord: null
        };
        if (this.dropRecord) {
            this.dropRecord.nextRecord = record;
        }
        this.dropRecord = record;
        this.updateUndropControls();
    }

    addUndropControls() {
        const toolBar = new AlignmentMorph();
        const shade = (new Color(140, 140, 140));
        toolBar.undoButton = new PushButtonMorph(
            this,
            "undrop",
            new SymbolMorph("turnBack", 12)
        );
        toolBar.redoButton = new PushButtonMorph(
            this,
            "redrop",
            new SymbolMorph("turnForward", 12)
        );
        toolBar.undoButton.alpha = 0.2;
        // toolBar.undoButton.hint = 'undo the last\nblock drop\nin this pane';
        toolBar.undoButton.labelShadowColor = shade;
        toolBar.undoButton.drawNew();
        toolBar.undoButton.fixLayout();
        toolBar.add(toolBar.undoButton);

        toolBar.redoButton.alpha = 0.2;
        // toolBar.redoButton.hint = 'redo the last undone\nblock drop\nin this pane';
        toolBar.redoButton.labelShadowColor = shade;
        toolBar.redoButton.drawNew();
        toolBar.redoButton.fixLayout();
        toolBar.add(toolBar.redoButton);
        return toolBar;
    }

    updateUndropControls() {
        const sf = this.parentThatIsA(ScrollFrameMorph);
        if (!sf) {return; }
        if (!sf.toolBar) {
            sf.toolBar = this.addUndropControls();
            sf.add(sf.toolBar);
        }
        if (this.dropRecord) {
            if (this.dropRecord.lastRecord) {
                if (!sf.toolBar.undoButton.isVisible) {
                    sf.toolBar.undoButton.show();
                }
            } else {
                if (sf.toolBar.undoButton.isVisible) {
                    sf.toolBar.undoButton.hide();
                }
            }
            if (this.dropRecord.nextRecord) {
                if (!sf.toolBar.redoButton.isVisible) {
                    sf.toolBar.redoButton.show();
                    sf.toolBar.undoButton.mouseLeave();
                }
            } else {
                if (sf.toolBar.redoButton.isVisible) {
                    sf.toolBar.redoButton.hide();
                }
            }
        }
        if (sf.toolBar.undoButton.isVisible || sf.toolBar.redoButton.isVisible) {
            sf.toolBar.drawNew();
            sf.toolBar.changed();
        } else {
            sf.removeChild(sf.toolBar);
            sf.toolBar = null;
        }
        sf.adjustToolBar();
    }

    // ScriptsMorph sorting blocks and comments

    sortedElements() {
        // return all scripts and unattached comments
        const scripts = this.children.filter(each => each instanceof CommentMorph ? !each.block : true);
        scripts.sort((a, b) => // make sure the prototype hat block always stays on top
        (a instanceof PrototypeHatBlockMorph ? 0 : a.top() - b.top()));
        return scripts;
    }

    // ScriptsMorph blocks layout fix

    fixMultiArgs() {
        const oldFlag = Morph.prototype.trackChanges;

        Morph.prototype.trackChanges = false;
        this.forAllChildren(morph => {
            if (morph instanceof MultiArgMorph) {
                morph.fixLayout();
            }
        });
        Morph.prototype.trackChanges = oldFlag;
    }

    // ScriptsMorph drag & drop:

    wantsDropOf(aMorph) {
        // override the inherited method
        if (aMorph instanceof HatBlockMorph) {
            return !this.rejectsHats;
        }
        return aMorph instanceof SyntaxElementMorph ||
            aMorph instanceof CommentMorph;
    }

    reactToDropOf(droppedMorph, hand) {
        if (droppedMorph instanceof BlockMorph ||
                droppedMorph instanceof CommentMorph) {
            droppedMorph.snap(hand);
        }
        this.adjustBounds();
    }

    // ScriptsMorph events

    mouseClickLeft(pos) {
        const shiftClicked = this.world().currentKey === 16;
        if (shiftClicked) {
            return this.edit(pos);
        }
        if (this.focus) {this.focus.stopEditing(); }
    }

    selectForEdit() {
        const ide = this.parentThatIsA(IDE_Morph);
        const rcvr = ide ? ide.currentSprite : null;
        if (rcvr && rcvr.inheritsAttribute('scripts')) {
            // copy on write:
            this.feedbackMorph.destroy();
            rcvr.shadowAttribute('scripts');
            return rcvr.scripts;
        }
        return this;
    }

    // ScriptsMorph keyboard support

    edit(pos) {
        let target;
        const world = this.world();
        if (this.focus) {this.focus.stopEditing(); }
        world.stopEditing();
        if (!ScriptsMorph.prototype.enableKeyboard) {return; }
        target = this.selectForEdit(); // enable copy-on-edit
        target.focus = new ScriptFocusMorph(target, target, pos);
        target.focus.getFocus(world);
    }

    // ScriptsMorph context - scripts target

    scriptTarget() {
        // answer the sprite or stage that this script editor acts on,
        // if the user clicks on a block.
        // NOTE: since scripts can be shared by more than a single sprite
        // this method only gives the desired result within the context of
        // the user actively clicking on a block inside the IDE
        // there is no direct relationship between a block or a scripts editor
        //  and a sprite.
        let editor = this.parentThatIsA(IDE_Morph);
        if (editor) {
            return editor.currentSprite;
        }
        editor = this.parentThatIsA(BlockEditorMorph);
        if (editor) {
            return editor.target;
        }
        throw new Error('script target bannot be found for orphaned scripts');
    }
}