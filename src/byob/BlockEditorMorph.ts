// BlockEditorMorph ////////////////////////////////////////////////////

// BlockEditorMorph instance creation:

export default class BlockEditorMorph extends DialogBoxMorph {
    constructor(definition, target) {
        this.init(definition, target);
    }

    init(definition, target) {
        let scripts;
        let proto;
        let scriptsFrame;
        let block;
        let comment;
        const myself = this;

        const isLive = Process.prototype.enableLiveCoding ||
            Process.prototype.enableSingleStepping;

        // additional properties:
        this.definition = definition;
        this.handle = null;

        // initialize inherited properties:
        super.init.call(
            this,
            target,
            () => {myself.updateDefinition(); },
            target
        );

        // override inherited properites:
        this.key = `editBlock${definition.spec}`;
        this.labelString = this.definition.isGlobal ? 'Block Editor' : 'Method';
        this.createLabel();

        // create scripting area
        scripts = new ScriptsMorph();
        scripts.rejectsHats = true;
        scripts.isDraggable = false;
        scripts.color = IDE_Morph.prototype.groupColor;
        scripts.cachedTexture = IDE_Morph.prototype.scriptsPaneTexture;
        scripts.cleanUpMargin = 10;

        proto = new PrototypeHatBlockMorph(this.definition);
        proto.setPosition(scripts.position().add(10));
        if (definition.comment !== null) {
            comment = definition.comment.fullCopy();
            proto.comment = comment;
            comment.block = proto;
        }
        if (definition.body !== null) {
            proto.nextBlock(isLive ? definition.body.expression
                    : definition.body.expression.fullCopy()
            );
        }
        scripts.add(proto);
        proto.fixBlockColor(null, true);
        proto.drawNew();

        this.definition.scripts.forEach(element => {
            block = element.fullCopy();
            block.setPosition(scripts.position().add(element.position()));
            scripts.add(block);
            if (block instanceof BlockMorph) {
                block.allComments().forEach(comment => {
                    comment.align(block);
                });
            }
        });
        proto.allComments().forEach(comment => {
            comment.align(proto);
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
        if (!isLive) {
            this.addButton('updateDefinition', 'Apply');
            this.addButton('cancel', 'Cancel');
        }

        this.setExtent(new Point(375, 300)); // normal initial extent
        this.fixLayout();
        scripts.fixMultiArgs();

        block = proto.parts()[0];
        block.forceNormalColoring();
        block.fixBlockColor(proto, true);
    }

    popUp() {
        const world = this.target.world();

        if (world) {
            super.popUp.call(this, world);
            this.setInitialDimensions();
            this.handle = new HandleMorph(
                this,
                280,
                220,
                this.corner,
                this.corner
            );
            world.keyboardReceiver = null;
        }
    }

    justDropped() {
        // override the inherited default behavior, which is to
        // give keyboard focus to dialog boxes, as in this case
        // we want Snap-global keyboard-shortcuts like ctrl-f
        // to still work
        nop();
    }

    // BlockEditorMorph ops

    accept(origin) {
        // check DialogBoxMorph comment for accept()
        if (origin instanceof CursorMorph) {return; }
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
    }

    cancel(origin) {
        if (origin instanceof CursorMorph) {return; }
        //this.refreshAllBlockInstances();
        this.close();
    }

    close() {
        let doubles;
        let block;
        const myself = this;

        // assert that no scope conflicts exists, i.e. that a global
        // definition doesn't contain any local custom blocks, as they
        // will be rendered "Obsolete!" when reloading the project
        if (this.definition.isGlobal) {
            block = detect(
                this.body.contents.allChildren(),
                morph => morph.definition && !morph.definition.isGlobal
            );
            if (block) {
                block = block.definition.blockInstance();
                block.addShadow();
                new DialogBoxMorph().inform(
                    'Local Block(s) in Global Definition',
                    'This global block definition contains one or more\n'
                        + 'local custom blocks which must be removed first.',
                    myself.world(),
                    block.fullImage()
                );
                return;
            }
        }

        // allow me to disappear only when name collisions
        // have been resolved
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
    }

    consolidateDoubles() {
        this.target.replaceDoubleDefinitionsFor(this.definition);
        this.destroy();
    }

    refreshAllBlockInstances(oldSpec) {
        const def = this.definition;
        const template = this.target.paletteBlockInstance(def);

        if (this.definition.isGlobal) {
            this.target.allBlockInstances(this.definition).forEach(
                block => {
                    block.refresh();
                }
            );
        } else {
            this.target.allDependentInvocationsOf(oldSpec).forEach(
                block => {
                    block.refresh(def);
                }
            );
        }
        if (template) {
            template.refreshDefaults();
        }
    }

    updateDefinition() {
        let head;
        let ide;
        const oldSpec = this.definition.blockSpec();
        const pos = this.body.contents.position();
        let element;
        const myself = this;

        this.definition.receiver = this.target; // only for serialization
        this.definition.spec = this.prototypeSpec();
        this.definition.declarations = this.prototypeSlots();
        this.definition.variableNames = this.variableNames();
        this.definition.scripts = [];
        this.definition.editorDimensions = this.bounds.copy();
        this.definition.cachedIsRecursive = null; // flush the cache, don't update

        this.body.contents.children.forEach(morph => {
            if (morph instanceof PrototypeHatBlockMorph) {
                head = morph;
            } else if (morph instanceof BlockMorph ||
                    (morph instanceof CommentMorph && !morph.block)) {
                element = morph.fullCopy();
                element.parent = null;
                element.setPosition(morph.position().subtract(pos));
                myself.definition.scripts.push(element);
            }
        });

        if (head) {
            if (this.definition.category !== head.blockCategory) {
                this.target.shadowAttribute('scripts');
            }
            this.definition.category = head.blockCategory;
            this.definition.type = head.type;
            if (head.comment) {
                this.definition.comment = head.comment.fullCopy();
                this.definition.comment.block = true; // serialize in short form
            } else {
                this.definition.comment = null;
            }
        }

        this.definition.body = this.context(head);
        this.refreshAllBlockInstances(oldSpec);
        ide = this.target.parentThatIsA(IDE_Morph);
        ide.flushPaletteCache();
        ide.refreshPalette();
    }

    context(prototypeHat) {
        // answer my script reified for deferred execution
        // if no prototypeHat is given, my body is scanned
        let head;

        let topBlock;
        let stackFrame;

        head = prototypeHat || detect(
            this.body.contents.children,
            c => c instanceof PrototypeHatBlockMorph
        );
        topBlock = head.nextBlock();
        if (topBlock === null) {
            return null;
        }
        topBlock.allChildren().forEach(c => {
            if (c instanceof BlockMorph) {c.cachedInputs = null; }
        });
        stackFrame = Process.prototype.reify.call(
            null,
            topBlock,
            new List(this.definition.inputNames()),
            true // ignore empty slots for custom block reification
        );
        stackFrame.outerContext = null;
        return stackFrame;
    }

    prototypeSpec() {
        // answer the spec represented by my (edited) block prototype
        return detect(
            this.body.contents.children,
            c => c instanceof PrototypeHatBlockMorph
        ).parts()[0].specFromFragments();
    }

    prototypeSlots() {
        // answer the slot declarations from my (edited) block prototype
        return detect(
            this.body.contents.children,
            c => c instanceof PrototypeHatBlockMorph
        ).parts()[0].declarationsFromFragments();
    }

    variableNames() {
        // answer the variable declarations from my prototype hat
        return detect(
            this.body.contents.children,
            c => c instanceof PrototypeHatBlockMorph
        ).variableNames();
    }

    // BlockEditorMorph layout

    setInitialDimensions() {
        const world = this.world();
        const mex = world.extent().subtract(new Point(this.padding, this.padding));
        const th = fontHeight(this.titleFontSize) + this.titlePadding * 2;
        const bh = this.buttons.height();

        if (this.definition.editorDimensions) {
            this.setPosition(this.definition.editorDimensions.origin);
            this.setExtent(this.definition.editorDimensions.extent().min(mex));
            this.keepWithin(world);
            return;
        }
        this.setExtent(
            this.body.contents.extent().add(
                new Point(this.padding, this.padding + th + bh)
            ).min(mex)
        );
        this.setCenter(this.world().center());
    }

    fixLayout() {
        const th = fontHeight(this.titleFontSize) + this.titlePadding * 2;

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
    }
}