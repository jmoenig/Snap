// BlockDialogMorph ////////////////////////////////////////////////////

import DialogBoxMorph from "../"; // TODO

// BlockDialogMorph instance creation:

export default class BlockDialogMorph extends DialogBoxMorph {
    constructor(target, action, environment) {
        this.init(target, action, environment);
    }

    init(target, action, environment) {
        // additional properties:
        this.blockType = 'command';
        this.category = 'other';
        this.isGlobal = true;
        this.types = null;
        this.categories = null;

        // initialize inherited properties:
        super.init.call(
            this,
            target,
            action,
            environment
        );

        // override inherited properites:
        this.key = 'makeABlock';

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
    }

    openForChange(
        title,
        category,
        type,
        world,
        pic,
        // <bool>
        preventTypeChange) {
        const clr = SpriteMorph.prototype.blockColor[category];
        this.key = 'changeABlock';
        this.category = category;
        this.blockType = type;

        this.categories.children.forEach(each => {
            each.refresh();
        });
        this.types.children.forEach(each => {
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
        this.popUp(world);
    }

    // category buttons

    createCategoryButtons() {
        const myself = this;
        const oldFlag = Morph.prototype.trackChanges;

        Morph.prototype.trackChanges = false;
        SpriteMorph.prototype.categories.forEach(cat => {
            myself.addCategoryButton(cat);
        });
        Morph.prototype.trackChanges = oldFlag;
    }

    addCategoryButton(category) {
        const labelWidth = 75;
        const myself = this;

        const colors = [
            SpriteMorph.prototype.paletteColor,
            SpriteMorph.prototype.paletteColor.darker(50),
            SpriteMorph.prototype.blockColor[category]
        ];

        let button;

        button = new ToggleButtonMorph(
            colors,
            this, // this block dialog box is the target
            () => {
                myself.category = category;
                myself.categories.children.forEach(each => {
                    each.refresh();
                });
                if (myself.types) {
                    myself.types.children.forEach(each => {
                        each.setColor(colors[2]);
                    });
                }
                myself.edit();
            },
            category[0].toUpperCase().concat(category.slice(1)), // UCase label
            () => myself.category === category,
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
        button.labelColor = IDE_Morph.prototype.buttonLabelColor;
        button.contrast = this.buttonContrast;
        button.fixLayout();
        button.refresh();
        this.categories.add(button);
        return button;
    }

    fixCategoriesLayout() {
        const // all the same
        buttonWidth = this.categories.children[0].width();

        const // all the same
        buttonHeight = this.categories.children[0].height();

        const xPadding = 15;
        const yPadding = 2;

        const // this.categories.border,
        border = 10;

        const rows =  Math.ceil((this.categories.children.length) / 2);
        const l = this.categories.left();
        const t = this.categories.top();
        let i = 0;
        let row;
        let col;
        const oldFlag = Morph.prototype.trackChanges;

        Morph.prototype.trackChanges = false;

        this.categories.children.forEach(button => {
            i += 1;
            row = Math.ceil(i / 2);
            col = 2 - (i % 2);
            button.setPosition(new Point(
                l + (col * xPadding + ((col - 1) * buttonWidth)),
                t + (row * yPadding + ((row - 1) * buttonHeight) + border)
            ));
        });

        if (MorphicPreferences.isFlat) {
            this.categories.corner = 0;
            this.categories.border = 0;
            this.categories.edge = 0;
        }
        this.categories.setExtent(new Point(
            3 * xPadding + 2 * buttonWidth,
            (rows + 1) * yPadding + rows * buttonHeight + 2 * border
        ));

        Morph.prototype.trackChanges = oldFlag;
        this.categories.changed();
    }

    // type radio buttons

    createTypeButtons() {
        let block;
        const myself = this;
        const clr = SpriteMorph.prototype.blockColor[this.category];


        block = new CommandBlockMorph();
        block.setColor(clr);
        block.setSpec(localize('Command'));
        this.addBlockTypeButton(
            () => {myself.setType('command'); },
            block,
            () => myself.blockType === 'command'
        );

        block = new ReporterBlockMorph();
        block.setColor(clr);
        block.setSpec(localize('Reporter'));
        this.addBlockTypeButton(
            () => {myself.setType('reporter'); },
            block,
            () => myself.blockType === 'reporter'
        );

        block = new ReporterBlockMorph(true);
        block.setColor(clr);
        block.setSpec(localize('Predicate'));
        this.addBlockTypeButton(
            () => {myself.setType('predicate'); },
            block,
            () => myself.blockType === 'predicate'
        );
    }

    addBlockTypeButton(action, element, query) {
        const button = new ToggleElementMorph(
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
    }

    addTypeButton(action, label, query) {
        const button = new ToggleMorph(
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
    }

    setType(blockType) {
        this.blockType = blockType || this.blockType;
        this.types.children.forEach(c => {
            c.refresh();
        });
        this.edit();
    }

    // scope radio buttons

    createScopeButtons() {
        const myself = this;

        this.addScopeButton(
            () => {myself.setScope('global'); },
            "for all sprites",
            () => myself.isGlobal
        );
        this.addScopeButton(
            () => {myself.setScope('local'); },
            "for this sprite only",
            () => !myself.isGlobal
        );
    }

    addScopeButton(action, label, query) {
        const button = new ToggleMorph(
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
    }

    setScope(varType) {
        this.isGlobal = (varType === 'global');
        this.scopes.children.forEach(c => {
            c.refresh();
        });
        this.edit();
    }

    // other ops

    getInput() {
        let spec;
        let def;
        let body;
        if (this.body instanceof InputFieldMorph) {
            spec = this.normalizeSpaces(this.body.getValue());
        }
        def = new CustomBlockDefinition(spec);
        def.type = this.blockType;
        def.category = this.category;
        def.isGlobal = this.isGlobal;
        if (def.type === 'reporter' || def.type === 'predicate') {
            body = Process.prototype.reify.call(
                null,
                SpriteMorph.prototype.blockForSelector('doReport'),
                new List(),
                true // ignore empty slots for custom block reification
            );
            body.outerContext = null;
            def.body = body;
        }
        return def;
    }

    fixLayout() {
        const th = fontHeight(this.titleFontSize) + this.titlePadding * 2;

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
    }

    accept() {
        if ((this.body instanceof InputFieldMorph) &&
                (this.normalizeSpaces(this.body.getValue()) === '')) {
            this.edit();
        } else {
            super.accept.call(this);
        }
    }
}