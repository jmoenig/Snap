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

import ArgMorph from "./ArgMorph";

// InputSlotMorph instance creation:

export default class InputSlotMorph extends ArgMorph {
    constructor(text, isNumeric, choiceDict, isReadOnly) {
        this.init(text, isNumeric, choiceDict, isReadOnly);
    }

    init(text, isNumeric, choiceDict, isReadOnly) {
        const contents = new StringMorph('');

        const arrow = new ArrowMorph(
            'down',
            0,
            Math.max(Math.floor(this.fontSize / 6), 1)
        );

        contents.fontSize = this.fontSize;
        contents.isShowingBlanks = true;
        contents.drawNew();

        this.isUnevaluated = false;
        this.choices = choiceDict || null; // object, function or selector
        this.oldContentsExtent = contents.extent();
        this.isNumeric = isNumeric || false;
        this.isReadOnly = isReadOnly || false;
        this.minWidth = 0; // can be chaged for text-type inputs ("landscape")
        this.constant = null;

        super.init.call(this, null, true);
        this.color = new Color(255, 255, 255);
        this.add(contents);
        this.add(arrow);
        contents.isEditable = true;
        contents.isDraggable = false;
        contents.enableSelecting();
        this.setContents(text);
    }

    // InputSlotMorph accessing:

    getSpec() {
        if (this.isNumeric) {
            return '%n';
        }
        return '%s'; // default
    }

    contents() {
        return detect(
            this.children,
            child => child instanceof StringMorph
        );
    }

    arrow() {
        return detect(
            this.children,
            child => child instanceof ArrowMorph
        );
    }

    setContents(aStringOrFloat) {
        const cnts = this.contents();
        let dta = aStringOrFloat;
        const isConstant = dta instanceof Array;
        if (isConstant) {
            dta = localize(dta[0]);
            cnts.isItalic = !this.isReadOnly;
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
        cnts.drawNew();

        // adjust to zebra coloring:
        if (this.isReadOnly && (this.parent instanceof BlockMorph)) {
            this.parent.fixLabelColor();
        }

        // remember the constant, if any
        this.constant = isConstant ? aStringOrFloat : null;
    }

    userSetContents(aStringOrFloat) {
        // enable copy-on-edit for inherited scripts
        this.selectForEdit().setContents(aStringOrFloat);
    }

    // InputSlotMorph drop-down menu:

    dropDownMenu(enableKeyboard) {
        const menu = this.menuFromDict(this.choices, null, enableKeyboard);
        if (!menu) { // has already happened
            return;
        }
        if (menu.items.length > 0) {
            if (enableKeyboard) {
                menu.popup(this.world(), this.bottomLeft());
                menu.getFocus();
            } else {
                menu.popUpAtHand(this.world());
            }
        }
    }

    menuFromDict(choices, noEmptyOption, enableKeyboard) {
        let key;

        const menu = new MenuMorph(
            this.userSetContents,
            null,
            this,
            this.fontSize
        );

        if (choices instanceof Function) {
            choices = choices.call(this);
        } else if (isString(choices)) {
            choices = this[choices](enableKeyboard);
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
                // } else if (key.indexOf('§_def') === 0) {
                //     menu.addItem(choices[key].blockInstance(), choices[key]);
                } else if (choices[key] instanceof Object &&
                        !(choices[key] instanceof Array) &&
                        (typeof choices[key] !== 'function')) {
                    menu.addMenu(key, this.menuFromDict(choices[key], true));
                } else {
                    menu.addItem(key, choices[key]);
                }
            }
        }
        return menu;
    }

    messagesMenu() {
        const dict = {};
        const rcvr = this.parentThatIsA(BlockMorph).scriptTarget();
        const stage = rcvr.parentThatIsA(StageMorph);
        const myself = this;
        let allNames = [];

        stage.children.concat(stage).forEach(morph => {
            if (isSnapObject(morph)) {
                allNames = allNames.concat(morph.allMessageNames());
            }
        });
        allNames.forEach(name => {
            dict[name] = name;
        });
        if (allNames.length > 0) {
            dict['~'] = null;
        }
        dict['new...'] = () => {

            new DialogBoxMorph(
                myself,
                myself.setContents,
                myself
            ).prompt(
                'Message name',
                null,
                myself.world()
            );
        };
        return dict;
    }

    messagesReceivedMenu() {
        const dict = {'any message': ['any message']};
        const rcvr = this.parentThatIsA(BlockMorph).scriptTarget();
        const stage = rcvr.parentThatIsA(StageMorph);
        const myself = this;
        let allNames = [];

        stage.children.concat(stage).forEach(morph => {
            if (isSnapObject(morph)) {
                allNames = allNames.concat(morph.allMessageNames());
            }
        });
        allNames.forEach(name => {
            dict[name] = name;
        });
        dict['~'] = null;
        dict['new...'] = () => {

            new DialogBoxMorph(
                myself,
                myself.setContents,
                myself
            ).prompt(
                'Message name',
                null,
                myself.world()
            );
        };
        return dict;
    }

    collidablesMenu() {
        const dict = {
                'mouse-pointer' : ['mouse-pointer'],
                edge : ['edge'],
                'pen trails' : ['pen trails']
            };

        const rcvr = this.parentThatIsA(BlockMorph).scriptTarget();
        const stage = rcvr.parentThatIsA(StageMorph);
        let allNames = [];

        stage.children.forEach(morph => {
            if (morph instanceof SpriteMorph && !morph.isTemporary) {
                if (morph.name !== rcvr.name) {
                    allNames = allNames.concat(morph.name);
                }
            }
        });
        if (allNames.length > 0) {
            dict['~'] = null;
            allNames.forEach(name => {
                dict[name] = name;
            });
        }
        return dict;
    }

    distancesMenu() {
        const dict = {
                'mouse-pointer' : ['mouse-pointer']
            };

        const rcvr = this.parentThatIsA(BlockMorph).scriptTarget();
        const stage = rcvr.parentThatIsA(StageMorph);
        let allNames = [];

        stage.children.forEach(morph => {
            if (morph instanceof SpriteMorph && !morph.isTemporary) {
                if (morph.name !== rcvr.name) {
                    allNames = allNames.concat(morph.name);
                }
            }
        });
        if (allNames.length > 0) {
            dict['~'] = null;
            allNames.forEach(name => {
                dict[name] = name;
            });
        }
        return dict;
    }

    clonablesMenu() {
        const dict = {};
        const rcvr = this.parentThatIsA(BlockMorph).scriptTarget();
        const stage = rcvr.parentThatIsA(StageMorph);
        let allNames = [];

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
            allNames.forEach(name => {
                dict[name] = name;
            });
        }
        return dict;
    }

    objectsMenu() {
        const rcvr = this.parentThatIsA(BlockMorph).scriptTarget();
        const stage = rcvr.parentThatIsA(StageMorph);
        const dict = {};
        const allNames = [];

        dict[stage.name] = stage.name;
        stage.children.forEach(morph => {
            if (morph instanceof SpriteMorph && !morph.isTemporary) {
                allNames.push(morph.name);
            }
        });
        if (allNames.length > 0) {
            dict['~'] = null;
            allNames.forEach(name => {
                dict[name] = name;
            });
        }
        return dict;
    }

    typesMenu() {
        const dict = {
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
    }

    gettablesMenu() {
        const dict = {
            neighbors : ['neighbors'],
            self : ['self'],
            'other sprites' : ['other sprites'],
            clones : ['clones'],
            'other clones' : ['other clones']
        };
        if (SpriteMorph.prototype.enableNesting) {
            dict.parts = ['parts'];
            dict.anchor = ['anchor'];
        }
        dict.stage = ['stage'];
        if (StageMorph.prototype.enableInheritance) {
            dict.children = ['children'];
            dict.parent = ['parent'];
            if (this.world().isDevMode) {
                dict['temporary?'] = ['temporary?'];
            }
        }
        dict.name = ['name'];
        dict.costumes = ['costumes'];
        dict.sounds = ['sounds'];
        dict['dangling?'] = ['dangling?'];
        dict['rotation x'] = ['rotation x'];
        dict['rotation y'] = ['rotation y'];
        dict['center x'] = ['center x'];
        dict['center y'] = ['center y'];
        return dict;
    }

    attributesMenu() {
        const block = this.parentThatIsA(BlockMorph);
        const objName = block.inputs()[1].evaluate();
        const rcvr = block.scriptTarget();
        const stage = rcvr.parentThatIsA(StageMorph);
        let obj;
        let dict = {};
        let varNames = [];

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
                'size' : ['size']
            };
        } else { // the stage
            dict = {
                'costume #' : ['costume #'],
                'costume name' : ['costume name']
            };
        }
        varNames = obj.variables.names();
        if (varNames.length > 0) {
            dict['~'] = null;
            varNames.forEach(name => {
                dict[name] = name;
            });
        }
        /*
        obj.customBlocks.forEach(function (def, i) {
            dict['§_def' + i] = def
        });
        */
        return dict;
    }

    costumesMenu() {
        const rcvr = this.parentThatIsA(BlockMorph).scriptTarget();
        let dict;
        let allNames = [];
        if (rcvr instanceof SpriteMorph) {
            dict = {Turtle : ['Turtle']};
        } else { // stage
            dict = {Empty : ['Empty']};
        }
        rcvr.costumes.asArray().forEach(costume => {
            allNames = allNames.concat(costume.name);
        });
        if (allNames.length > 0) {
            dict['~'] = null;
            allNames.forEach(name => {
                dict[name] = name;
            });
        }
        return dict;
    }

    soundsMenu() {
        const rcvr = this.parentThatIsA(BlockMorph).scriptTarget();
        let allNames = [];
        const dict = {};

        rcvr.sounds.asArray().forEach(sound => {
            allNames = allNames.concat(sound.name);
        });
        if (allNames.length > 0) {
            allNames.forEach(name => {
                dict[name] = name;
            });
        }
        return dict;
    }

    shadowedVariablesMenu() {
        const block = this.parentThatIsA(BlockMorph);
        let vars;
        let attribs;
        let rcvr;
        const dict = {};

        if (!block) {return dict; }
        rcvr = block.scriptTarget();
        if (rcvr && rcvr.exemplar) {
            vars = rcvr.inheritedVariableNames(true);
            vars.forEach(name => {
                dict[name] = name;
            });
            attribs = rcvr.shadowedAttributes();
            /*
            if (vars.length && attribs.length) {
                dict['~'] = null; // add line
            }
            */
            attribs.forEach(name => {
                dict[name] = [name];
            });
        }
        return dict;
    }

    pianoKeyboardMenu() {
        let menu;
        let block;
        let instrument;
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
        menu.selectKey(this.evaluate());
    }

    setChoices(dict, readonly) {
        // externally specify choices and read-only status,
        // used for custom blocks
        const cnts = this.contents();
        this.choices = dict;
        this.isReadOnly = readonly || false;
        if (this.parent instanceof BlockMorph) {
            this.parent.fixLabelColor();
            if (!readonly) {
                cnts.shadowOffset = new Point();
                cnts.shadowColor = null;
                cnts.setColor(new Color(0, 0, 0));
            }
        }
        this.fixLayout();
    }

    // InputSlotMorph layout:

    fixLayout() {
        let width;
        let height;
        let arrowWidth;
        const contents = this.contents();
        const arrow = this.arrow();

        contents.isNumeric = this.isNumeric;
        contents.isEditable = (!this.isReadOnly);
        if (this.isReadOnly) {
            contents.disableSelecting();
            contents.color = new Color(254, 254, 254);
        } else {
            contents.enableSelecting();
            contents.color = new Color(0, 0, 0);
        }

        if (this.choices) {
            arrow.setSize(this.fontSize);
            arrow.show();
        } else {
            arrow.hide();
        }
        arrowWidth = arrow.isVisible ? arrow.width() : 0;

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
        this.setExtent(new Point(width, height));
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

        if (this.parent) {
            if (this.parent.fixLayout) {
                if (this.world()) {
                    this.startLayout();
                    this.parent.fixLayout();
                    this.endLayout();
                } else {
                    this.parent.fixLayout();
                }
            }
        }
    }

    // InputSlotMorph events:

    mouseDownLeft(pos) {
        let world;
        if (this.isReadOnly || this.arrow().bounds.containsPoint(pos)) {
            this.escalateEvent('mouseDownLeft', pos);
        } else {
            world = this.world();
            if (world) {
                world.stopEditing();
            }
            this.selectForEdit().contents().edit();
        }
    }

    mouseClickLeft(pos) {
        if (this.arrow().bounds.containsPoint(pos)) {
            this.dropDownMenu();
        } else if (this.isReadOnly) {
            this.dropDownMenu();
        } else {
            this.contents().edit();
        }
    }

    reactToKeystroke() {
        let cnts;
        if (this.constant) {
            cnts = this.contents();
            this.constant = null;
            cnts.isItalic = false;
            cnts.drawNew();
        }
    }

    reactToEdit() {
        this.contents().clearSelection();
    }

    freshTextEdit(aStringOrTextMorph) {
        this.onNextStep = () => {
            aStringOrTextMorph.selectAll();
        };
    }

    // InputSlotMorph menu:

    userMenu() {
        const menu = new MenuMorph(this);
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
    }

    // InputSlotMorph code mapping

    /*
        code mapping lets you use blocks to generate arbitrary text-based
        source code that can be exported and compiled / embedded elsewhere,
        it's not part of Snap's evaluator and not needed for Snap itself
    */

    mapStringToCode() {
        // private - open a dialog box letting the user map code via the GUI
        new DialogBoxMorph(
            this,
            code => {
                StageMorph.prototype.codeMappings.string = code;
            },
            this
        ).promptCode(
            'Code mapping - String <#1>',
            StageMorph.prototype.codeMappings.string || '',
            this.world()
        );
    }

    mapNumberToCode() {
        // private - open a dialog box letting the user map code via the GUI
        new DialogBoxMorph(
            this,
            code => {
                StageMorph.prototype.codeMappings.number = code;
            },
            this
        ).promptCode(
            'Code mapping - Number <#1>',
            StageMorph.prototype.codeMappings.number || '',
            this.world()
        );
    }

    mappedCode() {
        const block = this.parentThatIsA(BlockMorph);
        const val = this.evaluate();
        let code;

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
    }

    // InputSlotMorph evaluating:

    evaluate() {
        /*
            answer my content's text string. If I am numerical convert that
            string to a number. If the conversion fails answer the string
            (e.g. for special choices like 'any', 'all' or 'last') otherwise
            the numerical value.
        */
        let num;

        const contents = this.contents();
        if (this.constant) {
            return this.constant;
        }
        if (this.isNumeric) {
            num = parseFloat(contents.text || '0');
            if (!isNaN(num)) {
                return num;
            }
        }
        return contents.text;
    }

    isEmptySlot() {
        return this.contents().text === '';
    }

    // InputSlotMorph single-stepping:

    flash() {
        // don't redraw the label b/c zebra coloring
        if (!this.cachedNormalColor) {
            this.cachedNormalColor = this.color;
            this.color = this.activeHighlight;
            this.drawNew();
            this.changed();
        }
    }

    unflash() {
        // don't redraw the label b/c zebra coloring
        if (this.cachedNormalColor) {
            const clr = this.cachedNormalColor;
            this.cachedNormalColor = null;
            this.color = clr;
            this.drawNew();
            this.changed();
        }
    }

    // InputSlotMorph drawing:

    drawNew() {
        let context;
        let borderColor;
        let r;

        // initialize my surface property
        this.image = newCanvas(this.extent());
        context = this.image.getContext('2d');
        if (this.cachedNormalColor) { // if flashing
            borderColor = this.color;
        } else if (this.parent) {
            borderColor = this.parent.color;
        } else {
            borderColor = new Color(120, 120, 120);
        }
        context.fillStyle = this.color.toString();
        if (this.isReadOnly && !this.cachedNormalColor) { // unless flashing
            context.fillStyle = borderColor.darker().toString();
        }

        // cache my border colors
        this.cachedClr = borderColor.toString();
        this.cachedClrBright = borderColor.lighter(this.contrast)
            .toString();
        this.cachedClrDark = borderColor.darker(this.contrast).toString();

        if (!this.isNumeric) {
            context.fillRect(
                this.edge,
                this.edge,
                this.width() - this.edge * 2,
                this.height() - this.edge * 2
            );
            if (!MorphicPreferences.isFlat) {
                this.drawRectBorder(context);
            }
        } else {
            r = (this.height() - (this.edge * 2)) / 2;
            context.beginPath();
            context.arc(
                r + this.edge,
                r + this.edge,
                r,
                radians(90),
                radians(-90),
                false
            );
            context.arc(
                this.width() - r - this.edge,
                r + this.edge,
                r,
                radians(-90),
                radians(90),
                false
            );
            context.closePath();
            context.fill();
            if (!MorphicPreferences.isFlat) {
                this.drawRoundBorder(context);
            }
        }
    }

    drawRectBorder(context) {
        const shift = this.edge * 0.5;
        let gradient;

        context.lineWidth = this.edge;
        context.lineJoin = 'round';
        context.lineCap = 'round';

        context.shadowOffsetY = shift;
        context.shadowBlur = this.edge;
        context.shadowColor = this.color.darker(80).toString();

        gradient = context.createLinearGradient(
            0,
            0,
            0,
            this.edge
        );
        gradient.addColorStop(0, this.cachedClr);
        gradient.addColorStop(1, this.cachedClrDark);
        context.strokeStyle = gradient;
        context.beginPath();
        context.moveTo(this.edge, shift);
        context.lineTo(this.width() - this.edge - shift, shift);
        context.stroke();

        context.shadowOffsetY = 0;

        gradient = context.createLinearGradient(
            0,
            0,
            this.edge,
            0
        );
        gradient.addColorStop(0, this.cachedClr);
        gradient.addColorStop(1, this.cachedClrDark);
        context.strokeStyle = gradient;
        context.beginPath();
        context.moveTo(shift, this.edge);
        context.lineTo(shift, this.height() - this.edge - shift);
        context.stroke();

        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.shadowBlur = 0;

        gradient = context.createLinearGradient(
            0,
            this.height() - this.edge,
            0,
            this.height()
        );
        gradient.addColorStop(0, this.cachedClrBright);
        gradient.addColorStop(1, this.cachedClr);
        context.strokeStyle = gradient;
        context.beginPath();
        context.moveTo(this.edge, this.height() - shift);
        context.lineTo(this.width() - this.edge, this.height() - shift);
        context.stroke();

        gradient = context.createLinearGradient(
            this.width() - this.edge,
            0,
            this.width(),
            0
        );
        gradient.addColorStop(0, this.cachedClrBright);
        gradient.addColorStop(1, this.cachedClr);
        context.strokeStyle = gradient;
        context.beginPath();
        context.moveTo(this.width() - shift, this.edge);
        context.lineTo(this.width() - shift, this.height() - this.edge);
        context.stroke();
    }

    drawRoundBorder(context) {
        const shift = this.edge * 0.5;
        let r = (this.height() - (this.edge * 2)) / 2;
        let start;
        let end;
        let gradient;

        context.lineWidth = this.edge;
        context.lineJoin = 'round';
        context.lineCap = 'round';

        // straight top edge:
        start = r + this.edge;
        end = this.width() - r - this.edge;
        if (end > start) {

            context.shadowOffsetX = shift;
            context.shadowOffsetY = shift;
            context.shadowBlur = this.edge;
            context.shadowColor = this.color.darker(80).toString();

            gradient = context.createLinearGradient(
                0,
                0,
                0,
                this.edge
            );
            gradient.addColorStop(0, this.cachedClr);
            gradient.addColorStop(1, this.cachedClrDark);
            context.strokeStyle = gradient;
            context.beginPath();

            context.moveTo(start, shift);
            context.lineTo(end, shift);
            context.stroke();

            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
            context.shadowBlur = 0;
        }

        // straight bottom edge:
        gradient = context.createLinearGradient(
            0,
            this.height() - this.edge,
            0,
            this.height()
        );
        gradient.addColorStop(0, this.cachedClrBright);
        gradient.addColorStop(1, this.cachedClr);
        context.strokeStyle = gradient;
        context.beginPath();
        context.moveTo(r + this.edge, this.height() - shift);
        context.lineTo(this.width() - r - this.edge, this.height() - shift);
        context.stroke();

        r = this.height() / 2;

        context.shadowOffsetX = shift;
        context.shadowOffsetY = shift;
        context.shadowBlur = this.edge;
        context.shadowColor = this.color.darker(80).toString();

        // top edge: left corner
        gradient = context.createRadialGradient(
            r,
            r,
            r - this.edge,
            r,
            r,
            r
        );
        gradient.addColorStop(1, this.cachedClr);
        gradient.addColorStop(0, this.cachedClrDark);
        context.strokeStyle = gradient;
        context.beginPath();
        context.arc(
            r,
            r,
            r - shift,
            radians(180),
            radians(270),
            false
        );

        context.stroke();

        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.shadowBlur = 0;

        // bottom edge: right corner
        gradient = context.createRadialGradient(
            this.width() - r,
            r,
            r - this.edge,
            this.width() - r,
            r,
            r
        );
        gradient.addColorStop(1, this.cachedClr);
        gradient.addColorStop(0, this.cachedClrBright);
        context.strokeStyle = gradient;
        context.beginPath();
        context.arc(
            this.width() - r,
            r,
            r - shift,
            radians(0),
            radians(90),
            false
        );
        context.stroke();
    }
}