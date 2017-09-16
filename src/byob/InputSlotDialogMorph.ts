// InputSlotDialogMorph ////////////////////////////////////////////////

// ... "inherits" some methods from BlockDialogMorph

// InputSlotDialogMorph preferences settings:

// if "isLaunchingExpanded" is true I always open in the long form
InputSlotDialogMorph.prototype.isLaunchingExpanded = false;

// InputSlotDialogMorph instance creation:

export default class InputSlotDialogMorph extends DialogBoxMorph {
    constructor(fragment, target, action, environment, category) {
        this.init(fragment, target, action, environment, category);
    }

    init(fragment, target, action, environment, category) {
        const scale = SyntaxElementMorph.prototype.scale; // "raw height"
        const fh = fontHeight(10) / 1.2 * scale;

        // additional properties:
        this.fragment = fragment || new BlockLabelFragment();
        this.textfield = null;
        this.types = null;
        this.slots = null;
        this.isExpanded = false;
        this.category = category || 'other';
        this.cachedRadioButton = null; // "template" for radio button backgrounds
        this.noDelete = false;

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
        this.addSlotsMenu();
        this.createTypeButtons();
        this.fixLayout();
    }

    createTypeButtons() {
        let block;
        let arrow;
        const myself = this;
        const clr = SpriteMorph.prototype.blockColor[this.category];


        block = new JaggedBlockMorph(localize('Title text'));
        block.setColor(clr);
        this.addBlockTypeButton(
            () => {myself.setType(null); },
            block,
            () => myself.fragment.type === null
        );

        block = new JaggedBlockMorph('%inputName');
        block.setColor(clr);
        this.addBlockTypeButton(
            () => {myself.setType('%s'); },
            block,
            () => myself.fragment.type !== null
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
        arrow.refresh = () => {
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

        arrow.mouseClickLeft = () => {
            if (arrow.isVisible) {
                myself.isExpanded = !myself.isExpanded;
                myself.types.children.forEach(c => {
                    c.refresh();
                });
                myself.drawNew();
                myself.edit();
            }
        };

        arrow.refresh();
    }

    setType(fragmentType) {
        this.textfield.choices = fragmentType ? null : this.symbolMenu;
        this.textfield.drawNew();
        this.fragment.type = fragmentType || null;
        this.types.children.forEach(c => {
            c.refresh();
        });
        this.slots.children.forEach(c => {
            c.refresh();
        });
        this.edit();
    }

    getInput() {
        let lbl;
        if (this.body instanceof InputFieldMorph) {
            lbl = this.normalizeSpaces(this.body.getValue());
        }
        if (lbl) {
            this.fragment.labelString = lbl;
            if (contains(['%b', '%boolUE'], this.fragment.type)) {
                this.fragment.defaultValue =
                    this.slots.defaultSwitch.evaluate();
            } else {
                this.fragment.defaultValue =
                    this.slots.defaultInputField.getValue();
            }
            return lbl;
        } else if (!this.noDelete) {
            this.fragment.isDeleted = true;
        }
        return null;
    }

    fixLayout() {
        let maxWidth;
        const left = this.left();
        const th = fontHeight(this.titleFontSize) + this.titlePadding * 2;

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
        this.slots.children.forEach(c => {
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
    }

    open(title, defaultString, world, pic, noDeleteButton) {
        const txt = new InputFieldMorph(defaultString);
        const oldFlag = Morph.prototype.trackChanges;

        if (!this.fragment.type) {
            txt.choices = this.symbolMenu;
        }
        Morph.prototype.trackChanges = false;
        this.isExpanded = this.isLaunchingExpanded;
        txt.setWidth(250);
        this.labelString = title;
        this.createLabel();
        if (pic) {this.setPicture(pic); }
        this.addBody(txt);
        txt.drawNew();
        this.textfield = txt;
        this.addButton('ok', 'OK');
        if (!noDeleteButton) {
            this.addButton('deleteFragment', 'Delete');
        } else {
            this.noDelete = true;
        }
        this.addButton('cancel', 'Cancel');
        this.fixLayout();
        this.drawNew();
        this.fixLayout();
        this.popUp(world);
        this.add(this.types); // make the types come to front
        Morph.prototype.trackChanges = oldFlag;
        this.changed();
    }

    symbolMenu() {
        const symbols = [];
        const symbolColor = new Color(100, 100, 130);
        const myself = this;
        SymbolMorph.prototype.names.forEach(symbol => {
            symbols.push([
                [
                    new SymbolMorph(symbol, myself.fontSize, symbolColor),
                    localize(symbol)
                ],
                `$${symbol}`
            ]);
        });
        symbols.push([`\u23CE ${localize('new line')}`, '$nl']);
        return symbols;
    }

    deleteFragment() {
        this.fragment.isDeleted = true;
        this.accept();
    }

    createSlotTypeButtons() {
        // populate my 'slots' area with radio buttons, labels and input fields
        const myself = this;

        let defLabel;
        let defInput;
        let defSwitch;
        const oldFlag = Morph.prototype.trackChanges;

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
            () => {myself.setSlotArity('single'); },
            "Single input.",
            () => myself.fragment.isSingleInput()
        );
        this.addSlotArityButton(
            () => {myself.setSlotArity('multiple'); },
            "Multiple inputs (value is list of inputs)",
            () => myself.fragment.isMultipleInput()
        );
        this.addSlotArityButton(
            () => {myself.setSlotArity('upvar'); },
            "Upvar - make internal variable visible to caller",
            () => myself.fragment.isUpvar()
        );

        // default values
        defLabel = new StringMorph(localize('Default Value:'));
        defLabel.fontSize = this.slots.radioButtonSingle.fontSize;
        defLabel.setColor(new Color(255, 255, 255));
        defLabel.refresh = () => {
            if (myself.isExpanded && contains(
                    ['%s', '%n', '%txt', '%anyUE', '%b', '%boolUE'],
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
        defInput.refresh = () => {
            if (myself.isExpanded && contains(
                ['%s', '%n', '%txt', '%anyUE'],
                myself.fragment.type
            )) {
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

        defSwitch = new BooleanSlotMorph(this.fragment.defaultValue);
        defSwitch.refresh = () => {
            if (myself.isExpanded && contains(
                ['%b', '%boolUE'],
                myself.fragment.type
            )) {
                defSwitch.show();
            } else {
                defSwitch.hide();
            }
        };
        this.slots.defaultSwitch = defSwitch;
        this.slots.add(defSwitch);
        defSwitch.drawNew();

        Morph.prototype.trackChanges = oldFlag;
    }

    setSlotType(type) {
        this.fragment.setSingleInputType(type);
        this.slots.children.forEach(c => {
            c.refresh();
        });
        this.edit();
    }

    setSlotArity(arity) {
        if (arity === 'single') {
            this.fragment.setToSingleInput();
        } else if (arity === 'multiple') {
            this.fragment.setToMultipleInput();
        } else if (arity === 'upvar') {
            this.fragment.setToUpvar();
            // hide other options - under construction
        }
        this.slots.children.forEach(c => {
            c.refresh();
        });
        this.edit();
    }

    addSlotTypeButton(label, spec) {
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
        const myself = this;

        const action = () => {myself.setSlotType(spec); };
        let query;
        const element = new JaggedBlockMorph(spec);
        let button;

        query = () => myself.fragment.singleInputType() === spec;
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
    }

    addSlotArityButton(action, label, query) {
        const button = new ToggleMorph(
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
    }

    fixSlotsLayout() {
        const slots = this.slots;
        const scale = SyntaxElementMorph.prototype.scale;
        const xPadding = 10 * scale;
        const ypadding = 14 * scale;

        const // slot type button height
        bh = (fontHeight(10) / 1.2 + 15) * scale;

        const // arity button height
        ah = (fontHeight(10) / 1.2 + 10) * scale;

        const // number slot type radio buttons
        size = 12;

        const cols = [
            slots.left() + xPadding,
            slots.left() + slots.width() / 3,
            slots.left() + slots.width() * 2 / 3
        ];

        const rows = [
            slots.top() + ypadding,
            slots.top() + ypadding + bh,
            slots.top() + ypadding + bh * 2,
            slots.top() + ypadding + bh * 3,
            slots.top() + ypadding + bh * 4,
            slots.top() + ypadding + bh * 5,

            slots.top() + ypadding + bh * 5 + ah,
            slots.top() + ypadding + bh * 5 + ah * 2
        ];

        let idx;
        let row = -1;
        let col;
        const oldFlag = Morph.prototype.trackChanges;

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
        this.slots.defaultSwitch.setCenter(
            this.slots.defaultInputLabel.center().add(new Point(
                this.slots.defaultSwitch.width() / 2
                    + this.slots.defaultInputLabel.width() / 2 + 5,
                0
            ))
        );
        Morph.prototype.trackChanges = oldFlag;
        this.slots.changed();
    }

    addSlotsMenu() {
        const myself = this;

        this.slots.userMenu = () => {
            if (contains(['%s', '%n', '%txt', '%anyUE'], myself.fragment.type)) {
                const menu = new MenuMorph(myself);
                const on = '\u2611 ';
                const off = '\u2610 ';
                menu.addItem('options...', 'editSlotOptions');
                menu.addItem(
                    (myself.fragment.isReadOnly ? on : off) +
                        localize('read-only'),
                    () => {myself.fragment.isReadOnly =
                             !myself.fragment.isReadOnly;
                             }
                );
                return menu;
            }
            return Morph.prototype.userMenu.call(myself);
        };
    }

    editSlotOptions() {
        const myself = this;
        new DialogBoxMorph(
            myself,
            options => {
                myself.fragment.options = options.trim();
            },
            myself
        ).promptCode(
            'Input Slot Options',
            myself.fragment.options,
            myself.world(),
            null,
            localize('Enter one option per line.\n' +
                'Optionally use "=" as key/value delimiter ' +
                'and {} for submenus. ' +
                'e.g.\n   the answer=42')
        );
    }

    // InputSlotDialogMorph hiding and showing:

    /*
        override the inherited behavior to recursively hide/show all
        children, so that my instances get restored correctly when
        hiding/showing my parent.
    */

    hide() {
        this.isVisible = false;
        this.changed();
    }

    show() {
        this.isVisible = true;
        this.changed();
    }
}

InputSlotDialogMorph.prototype.addTypeButton
    = BlockDialogMorph.prototype.addTypeButton;

InputSlotDialogMorph.prototype.addBlockTypeButton
    = BlockDialogMorph.prototype.addBlockTypeButton;