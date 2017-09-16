// DialogBoxMorph /////////////////////////////////////////////////////

/*
    I am a DialogBox frame.

    Note:
    -----
    my key property keeps track of my purpose to prevent multiple instances
    on the same or similar objects
*/

import Morph from "../morphic/morph/Morph";

// DialogBoxMorph preferences settings:

DialogBoxMorph.prototype.fontSize = 12;
DialogBoxMorph.prototype.titleFontSize = 14;
DialogBoxMorph.prototype.fontStyle = 'sans-serif';

DialogBoxMorph.prototype.color = PushButtonMorph.prototype.color;
DialogBoxMorph.prototype.titleTextColor = new Color(255, 255, 255);
DialogBoxMorph.prototype.titleBarColor
    = PushButtonMorph.prototype.pressColor;

DialogBoxMorph.prototype.contrast = 40;

DialogBoxMorph.prototype.corner = 12;
DialogBoxMorph.prototype.padding = 14;
DialogBoxMorph.prototype.titlePadding = 6;

DialogBoxMorph.prototype.buttonContrast = 50;
DialogBoxMorph.prototype.buttonFontSize = 12;
DialogBoxMorph.prototype.buttonCorner = 12;
DialogBoxMorph.prototype.buttonEdge = 6;
DialogBoxMorph.prototype.buttonPadding = 0;
DialogBoxMorph.prototype.buttonOutline = 3;
DialogBoxMorph.prototype.buttonOutlineColor
    = PushButtonMorph.prototype.color;
DialogBoxMorph.prototype.buttonOutlineGradient = true;

DialogBoxMorph.prototype.instances = {}; // prevent multiple instances

// DialogBoxMorph instance creation:

export default class DialogBoxMorph extends Morph {
    constructor(target, action, environment) {
        this.init(target, action, environment);
    }

    init(target, action, environment) {
        // additional properties:
        this.is3D = false; // for "flat" design exceptions
        this.target = target || null;
        this.action = action || null;
        this.environment = environment || null;
        this.key = null; // keep track of my purpose to prevent mulitple instances

        this.labelString = null;
        this.label = null;
        this.head = null;
        this.body = null;
        this.buttons = null;

        // initialize inherited properties:
        super.init.call(this);

        // override inherited properites:
        this.isDraggable = true;
        this.color = PushButtonMorph.prototype.color;
        this.createLabel();
        this.createButtons();
        this.setExtent(new Point(300, 150));
    }

    // DialogBoxMorph ops
    inform(title, textString, world, pic) {
        const txt = new TextMorph(
            textString,
            this.fontSize,
            this.fontStyle,
            true,
            false,
            'center',
            null,
            null,
            MorphicPreferences.isFlat ? null : new Point(1, 1),
            new Color(255, 255, 255)
        );

        if (!this.key) {
            this.key = `inform${title}${textString}`;
        }

        this.labelString = title;
        this.createLabel();
        if (pic) {this.setPicture(pic); }
        if (textString) {
            this.addBody(txt);
        }
        this.addButton('ok', 'OK');
        this.drawNew();
        this.fixLayout();
        this.popUp(world);
    }

    askYesNo(title, textString, world, pic) {
        const txt = new TextMorph(
            textString,
            this.fontSize,
            this.fontStyle,
            true,
            false,
            'center',
            null,
            null,
            MorphicPreferences.isFlat ? null : new Point(1, 1),
            new Color(255, 255, 255)
        );

        if (!this.key) {
            this.key = `decide${title}${textString}`;
        }

        this.labelString = title;
        this.createLabel();
        if (pic) {this.setPicture(pic); }
        this.addBody(txt);
        this.addButton('ok', 'Yes');
        this.addButton('cancel', 'No');
        this.fixLayout();
        this.drawNew();
        this.fixLayout();
        this.popUp(world);
    }

    prompt(
        title,
        defaultString,
        world,
        pic,
        // optional dictionary for drop-down of choices
        choices,
        // optional when using choices
        isReadOnly,
        // optional
        isNumeric,
        // optional for numeric sliders
        sliderMin,
        // optional for numeric sliders
        sliderMax,
        // optional single-arg function for numeric slider
        sliderAction) {
        let sld;
        let head;

        const txt = new InputFieldMorph(
            defaultString,
            isNumeric || false, // numeric?
            choices || null, // drop-down dict, optional
            choices ? isReadOnly || false : false
        );

        txt.setWidth(250);
        if (isNumeric) {
            if (pic) {
                head = new AlignmentMorph('column', this.padding);
                pic.setPosition(head.position());
                head.add(pic);
            }
            if (!isNil(sliderMin) && !isNil(sliderMax)) {
                sld = new SliderMorph(
                    sliderMin * 100,
                    sliderMax * 100,
                    parseFloat(defaultString) * 100,
                    (sliderMax - sliderMin) / 10 * 100,
                    'horizontal'
                );
                sld.alpha = 1;
                sld.color = this.color.lighter(50);
                sld.setHeight(txt.height() * 0.7);
                sld.setWidth(txt.width());
                sld.action = num => {
                    if (sliderAction) {
                        sliderAction(num / 100);
                    }
                    txt.setContents(num / 100);
                    txt.edit();
                };
                if (!head) {
                    head = new AlignmentMorph('column', this.padding);
                }
                head.add(sld);
            }
            if (head) {
                head.fixLayout();
                this.setPicture(head);
                head.fixLayout();
            }
        } else {
            if (pic) {this.setPicture(pic); }
        }

        this.reactToChoice = inp => {
            if (sld) {
                sld.value = inp * 100;
                sld.drawNew();
                sld.changed();
            }
            if (sliderAction) {
                sliderAction(inp);
            }
        };

        txt.reactToKeystroke = () => {
            let inp = txt.getValue();
            if (sld) {
                inp = Math.max(inp, sliderMin);
                sld.value = inp * 100;
                sld.drawNew();
                sld.changed();
            }
            if (sliderAction) {
                sliderAction(inp);
            }
        };

        this.labelString = title;
        this.createLabel();

        if (!this.key) {
            this.key = `prompt${title}${defaultString}`;
        }

        this.addBody(txt);
        txt.drawNew();
        this.addButton('ok', 'OK');
        this.addButton('cancel', 'Cancel');
        this.fixLayout();
        this.drawNew();
        this.fixLayout();
        this.popUp(world);
    }

    promptCode(title, defaultString, world, pic, instructions) {
        const frame = new ScrollFrameMorph();
        const text = new TextMorph(defaultString || '');
        const bdy = new AlignmentMorph('column', this.padding);
        const size = pic ? Math.max(pic.width, 400) : 400;

        this.getInput = () => text.text;

        function remarkText(string) {
            return new TextMorph(
                localize(string),
                10,
                null, // style
                false, // bold
                null, // italic
                null, // alignment
                null, // width
                null, // font name
                MorphicPreferences.isFlat ? null : new Point(1, 1),
                new Color(255, 255, 255) // shadowColor
            );
        }

        frame.padding = 6;
        frame.setWidth(size);
        frame.acceptsDrops = false;
        frame.contents.acceptsDrops = false;

        text.fontName = 'monospace';
        text.fontStyle = 'monospace';
        text.fontSize = 11;
        text.setPosition(frame.topLeft().add(frame.padding));
        text.enableSelecting();
        text.isEditable = true;

        frame.setHeight(size / 4);
        frame.fixLayout = nop;
        frame.edge = InputFieldMorph.prototype.edge;
        frame.fontSize = InputFieldMorph.prototype.fontSize;
        frame.typeInPadding = InputFieldMorph.prototype.typeInPadding;
        frame.contrast = InputFieldMorph.prototype.contrast;
        frame.drawNew = InputFieldMorph.prototype.drawNew;
        frame.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;

        frame.addContents(text);
        text.drawNew();

        if (pic) {this.setPicture(pic); }

        this.labelString = title;
        this.createLabel();

        if (!this.key) {
            this.key = `promptCode${title}${defaultString}`;
        }

        bdy.setColor(this.color);
        bdy.add(frame);
        if (instructions) {
            bdy.add(remarkText(instructions));
        }
        bdy.fixLayout();

        this.addBody(bdy);
        frame.drawNew();
        bdy.drawNew();

        this.addButton('ok', 'OK');
        this.addButton('cancel', 'Cancel');
        this.fixLayout();
        this.drawNew();
        this.fixLayout();
        this.popUp(world);
        text.edit();
    }

    promptVector(title, point, deflt, xLabel, yLabel, world, pic, msg) {
        const vec = new AlignmentMorph('row', 4);
        const xInp = new InputFieldMorph(point.x.toString(), true);
        const yInp = new InputFieldMorph(point.y.toString(), true);
        const xCol = new AlignmentMorph('column', 2);
        const yCol = new AlignmentMorph('column', 2);
        const inp = new AlignmentMorph('column', 2);
        const bdy = new AlignmentMorph('column', this.padding);

        function labelText(string) {
            return new TextMorph(
                localize(string),
                10,
                null, // style
                false, // bold
                null, // italic
                null, // alignment
                null, // width
                null, // font name
                MorphicPreferences.isFlat ? null : new Point(1, 1),
                new Color(255, 255, 255) // shadowColor
            );
        }

        inp.alignment = 'left';
        inp.setColor(this.color);
        bdy.setColor(this.color);
        xCol.alignment = 'left';
        xCol.setColor(this.color);
        yCol.alignment = 'left';
        yCol.setColor(this.color);

        xCol.add(labelText(xLabel));
        xCol.add(xInp);
        yCol.add(labelText(yLabel));
        yCol.add(yInp);
        vec.add(xCol);
        vec.add(yCol);
        inp.add(vec);

        if (msg) {
            bdy.add(labelText(msg));
        }

        bdy.add(inp);

        vec.fixLayout();
        xCol.fixLayout();
        yCol.fixLayout();
        inp.fixLayout();
        bdy.fixLayout();

        this.labelString = title;
        this.createLabel();
        if (pic) {this.setPicture(pic); }

        this.addBody(bdy);

        vec.drawNew();
        xCol.drawNew();
        xInp.drawNew();
        yCol.drawNew();
        yInp.drawNew();
        bdy.fixLayout();

        this.addButton('ok', 'OK');

        if (deflt instanceof Point) {
            this.addButton(
                () => {
                    xInp.setContents(deflt.x.toString());
                    yInp.setContents(deflt.y.toString());
                },
                'Default'

            );
        }

        this.addButton('cancel', 'Cancel');
        this.fixLayout();
        this.drawNew();
        this.fixLayout();

        this.edit = () => {
            xInp.edit();
        };

        this.getInput = () => new Point(xInp.getValue(), yInp.getValue());

        if (!this.key) {
            this.key = `vector${title}`;
        }

        this.popUp(world);
    }

    promptCredentials(
        title,
        purpose,
        tosURL,
        tosLabel,
        prvURL,
        prvLabel,
        checkBoxLabel,
        world,
        pic,
        msg) {
        const usr = new InputFieldMorph();
        let bmn;
        let byr;
        let emlLabel;
        const eml = new InputFieldMorph();
        const pw1 = new InputFieldMorph();
        const pw2 = new InputFieldMorph();
        const opw = new InputFieldMorph();
        let agree = false;
        let chk;
        const dof = new AlignmentMorph('row', 4);
        const mCol = new AlignmentMorph('column', 2);
        const yCol = new AlignmentMorph('column', 2);
        const inp = new AlignmentMorph('column', 2);
        const lnk = new AlignmentMorph('row', 4);
        const bdy = new AlignmentMorph('column', this.padding);
        const years = {};
        let currentYear = new Date().getFullYear();
        const firstYear = currentYear - 20;
        const myself = this;

        function labelText(string) {
            return new TextMorph(
                localize(string),
                10,
                null, // style
                false, // bold
                null, // italic
                null, // alignment
                null, // width
                null, // font name
                MorphicPreferences.isFlat ? null : new Point(1, 1),
                new Color(255, 255, 255) // shadowColor
            );
        }

        function linkButton(label, url) {
            const btn = new PushButtonMorph(
                myself,
                () => {
                    window.open(url);
                },
                `  ${localize(label)}  `
            );
            btn.fontSize = 10;
            btn.corner = myself.buttonCorner;
            btn.edge = myself.buttonEdge;
            btn.outline = myself.buttonOutline;
            btn.outlineColor = myself.buttonOutlineColor;
            btn.outlineGradient = myself.buttonOutlineGradient;
            btn.padding = myself.buttonPadding;
            btn.contrast = myself.buttonContrast;
            btn.drawNew();
            btn.fixLayout();
            return btn;
        }

        function age() {
            const today = new Date().getFullYear() + new Date().getMonth() / 12;
            let year = +byr.getValue() || 0;
            let monthName = bmn.getValue();
            let month;
            let birthday;
            if (monthName instanceof Array) { // translatable
                monthName = monthName[0];
            }
            if (isNaN(year)) {
                year = 0;
            }
            month = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ].indexOf(monthName);
            if (isNaN(month)) {
                month = 0;
            }
            birthday = year + month / 12;
            return today - birthday;
        }

        bmn = new InputFieldMorph(
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
        for (currentYear; currentYear > firstYear; currentYear -= 1) {
            years[`${currentYear.toString()} `] = currentYear;
        }
        years[`${firstYear} ${localize('or before')}`] = `< ${currentYear}`;
        byr = new InputFieldMorph(
            null, // text
            false, // numeric?
            years,
            true // read-only
        );

        inp.alignment = 'left';
        inp.setColor(this.color);
        bdy.setColor(this.color);

        mCol.alignment = 'left';
        mCol.setColor(this.color);
        yCol.alignment = 'left';
        yCol.setColor(this.color);

        usr.setWidth(200);
        bmn.setWidth(100);
        byr.contents().minWidth = 80;
        byr.setWidth(80);
        eml.setWidth(200);
        pw1.setWidth(200);
        pw2.setWidth(200);
        opw.setWidth(200);
        pw1.contents().text.toggleIsPassword();
        pw2.contents().text.toggleIsPassword();
        opw.contents().text.toggleIsPassword();

        if (purpose === 'login') {
            inp.add(labelText('User name:'));
            inp.add(usr);
        }

        if (purpose === 'signup') {
            inp.add(labelText('User name:'));
            inp.add(usr);
            mCol.add(labelText('Birth date:'));
            mCol.add(bmn);
            yCol.add(labelText('year:'));
            yCol.add(byr);
            dof.add(mCol);
            dof.add(yCol);
            inp.add(dof);
            emlLabel = labelText('foo');
            inp.add(emlLabel);
            inp.add(eml);
        }

        if (purpose === 'login') {
            inp.add(labelText('Password:'));
            inp.add(pw1);
        }

        if (purpose === 'changePassword') {
            inp.add(labelText('Old password:'));
            inp.add(opw);
            inp.add(labelText('New password:'));
            inp.add(pw1);
            inp.add(labelText('Repeat new password:'));
            inp.add(pw2);
        }

        if (purpose === 'resetPassword') {
            inp.add(labelText('User name:'));
            inp.add(usr);
        }

        if (msg) {
            bdy.add(labelText(msg));
        }

        bdy.add(inp);

        if (tosURL || prvURL) {
            bdy.add(lnk);
        }
        if (tosURL) {
            lnk.add(linkButton(tosLabel, tosURL));
        }
        if (prvURL) {
            lnk.add(linkButton(prvLabel, prvURL));
        }

        if (checkBoxLabel) {
            chk = new ToggleMorph(
                'checkbox',
                this,
                () => {agree = !agree; },
                checkBoxLabel,
                () => agree
            );
            chk.edge = this.buttonEdge / 2;
            chk.outline = this.buttonOutline / 2;
            chk.outlineColor = this.buttonOutlineColor;
            chk.outlineGradient = this.buttonOutlineGradient;
            chk.contrast = this.buttonContrast;
            chk.drawNew();
            chk.fixLayout();
            bdy.add(chk);
        }

        dof.fixLayout();
        mCol.fixLayout();
        yCol.fixLayout();
        inp.fixLayout();
        lnk.fixLayout();
        bdy.fixLayout();

        this.labelString = title;
        this.createLabel();
        if (pic) {this.setPicture(pic); }

        this.addBody(bdy);

        usr.drawNew();
        dof.drawNew();
        mCol.drawNew();
        bmn.drawNew();
        yCol.drawNew();
        byr.drawNew();
        pw1.drawNew();
        pw2.drawNew();
        opw.drawNew();
        eml.drawNew();
        bdy.fixLayout();

        this.addButton('ok', 'OK');
        this.addButton('cancel', 'Cancel');
        this.fixLayout();
        this.drawNew();
        this.fixLayout();

        function validInputs() {
            let checklist;
            let empty;
            const em = eml.getValue();

            function indicate(morph, string) {
                const bubble = new SpeechBubbleMorph(localize(string));
                bubble.isPointingRight = false;
                bubble.drawNew();
                bubble.popUp(
                    world,
                    morph.leftCenter().subtract(new Point(bubble.width() + 2, 0))
                );
                if (morph.edit) {
                    morph.edit();
                }
            }

            if (purpose === 'login') {
                checklist = [usr, pw1];
            } else if (purpose === 'signup') {
                checklist = [usr, bmn, byr, eml];
            } else if (purpose === 'changePassword') {
                checklist = [opw, pw1, pw2];
            } else if (purpose === 'resetPassword') {
                checklist = [usr];
            }

            empty = detect(
                checklist,
                inp => !inp.getValue()
            );
            if (empty) {
                indicate(empty, 'please fill out\nthis field');
                return false;
            }
            if (purpose === 'signup') {
                if (usr.getValue().length < 4) {
                    indicate(usr, 'User name must be four\ncharacters or longer');
                    return false;
                }
                if (em.includes(' ') || !em.includes('@')
                        || !em.includes('.')) {
                    indicate(eml, 'please provide a valid\nemail address');
                    return false;
                }
            }
            if (purpose === 'changePassword') {
                if (pw1.getValue().length < 6) {
                    indicate(pw1, 'password must be six\ncharacters or longer');
                    return false;
                }
                if (pw1.getValue() !== pw2.getValue()) {
                    indicate(pw2, 'passwords do\nnot match');
                    return false;
                }
            }
            if (purpose === 'signup') {
                if (!agree) {
                    indicate(chk, 'please agree to\nthe TOS');
                    return false;
                }
            }
            return true;
        }

        this.accept = () => {
            if (validInputs()) {
                DialogBoxMorph.prototype.accept.call(myself);
            }
        };

        this.edit = () => {
            if (purpose === 'changePassword') {
                opw.edit();
            } else { // 'signup', 'login', 'resetPassword'
                usr.edit();
            }
        };

        this.getInput = () => ({
            username: usr.getValue(),
            email: eml.getValue(),
            oldpassword: opw.getValue(),
            password: pw1.getValue(),
            choice: agree
        });

        this.reactToChoice = () => {
            if (purpose === 'signup') {
                emlLabel.changed();
                emlLabel.text = age() <= 13 ?
                        'E-mail address of parent or guardian:'
                            : 'E-mail address:';
                emlLabel.text = localize(emlLabel.text);
                emlLabel.drawNew();
                emlLabel.changed();
            }
        };

        this.reactToChoice(); // initialize e-mail label

        if (!this.key) {
            this.key = `credentials${title}${purpose}`;
        }

        this.popUp(world);
    }

    accept() {
        /*
        if target is a function, use it as callback:
        execute target as callback function with action as argument
        in the environment as optionally specified.
        Note: if action is also a function, instead of becoming
        the argument itself it will be called to answer the argument.
        for selections, Yes/No Choices etc:

        else (if target is not a function):

            if action is a function:
            execute the action with target as environment (can be null)
            for lambdafied (inline) actions

            else if action is a String:
            treat it as function property of target and execute it
            for selector-like actions
        */
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
        this.destroy();
    }

    withKey(key) {
        this.key = key;
        return this;
    }

    popUp(world) {
        if (world) {
            if (this.key) {
                if (this.instances[world.stamp]) {
                    if (this.instances[world.stamp][this.key]) {
                        this.instances[world.stamp][this.key].destroy();
                    }
                    this.instances[world.stamp][this.key] = this;
                } else {
                    this.instances[world.stamp] = {};
                    this.instances[world.stamp][this.key] = this;
                }
            }
            world.add(this);
            world.keyboardReceiver = this;
            this.setCenter(world.center());
            this.edit();
        }
    }

    destroy() {
        super.destroy.call(this);
        if (this.key) {
            delete this.instances[this.key];
        }
    }

    ok() {
        this.accept();
    }

    cancel() {
        this.destroy();
    }

    edit() {
        this.children.forEach(c => {
            if (c.edit) {
                return c.edit();
            }
        });
    }

    getInput() {
        if (this.body instanceof InputFieldMorph) {
            return this.body.getValue();
        }
        return null;
    }

    justDropped(hand) {
        hand.world.keyboardReceiver = this;
        this.edit();
    }

    destroy() {
        const world = this.world();
        world.keyboardReceiver = null;
        world.hand.destroyTemporaries();
        super.destroy.call(this);
    }

    normalizeSpaces(string) {
        let ans = '';
        let i;
        let c;
        let flag = false;

        for (i = 0; i < string.length; i += 1) {
            c = string[i];
            if (c === ' ') {
                if (flag) {
                    ans += c;
                    flag = false;
                }
            } else {
                ans += c;
                flag = true;
            }
        }
        return ans.trim();
    }

    // DialogBoxMorph submorph construction

    createLabel() {
        const shading = !MorphicPreferences.isFlat || this.is3D;

        if (this.label) {
            this.label.destroy();
        }
        if (this.labelString) {
            this.label = new StringMorph(
                localize(this.labelString),
                this.titleFontSize,
                this.fontStyle,
                true,
                false,
                false,
                shading ? new Point(2, 1) : null,
                this.titleBarColor.darker(this.contrast)
            );
            this.label.color = this.titleTextColor;
            this.label.drawNew();
            this.add(this.label);
        }
    }

    createButtons() {
        if (this.buttons) {
            this.buttons.destroy();
        }
        this.buttons = new AlignmentMorph('row', this.padding);
        this.add(this.buttons);
    }

    addButton(action, label) {
        const button = new PushButtonMorph(
            this,
            action || 'ok',
            `  ${localize((label || 'OK'))}  `
        );
        button.fontSize = this.buttonFontSize;
        button.corner = this.buttonCorner;
        button.edge = this.buttonEdge;
        button.outline = this.buttonOutline;
        button.outlineColor = this.buttonOutlineColor;
        button.outlineGradient = this.buttonOutlineGradient;
        button.padding = this.buttonPadding;
        button.contrast = this.buttonContrast;
        button.drawNew();
        button.fixLayout();
        this.buttons.add(button);
        return button;
    }

    setPicture(aMorphOrCanvas) {
        let morph;
        if (aMorphOrCanvas instanceof Morph) {
            morph = aMorphOrCanvas;
        } else {
            morph = new Morph();
            morph.image = aMorphOrCanvas;
            morph.silentSetWidth(aMorphOrCanvas.width);
            morph.silentSetHeight(aMorphOrCanvas.height);
        }
        this.addHead(morph);
    }

    addHead(aMorph) {
        if (this.head) {
            this.head.destroy();
        }
        this.head = aMorph;
        this.add(this.head);
    }

    addBody(aMorph) {
        if (this.body) {
            this.body.destroy();
        }
        this.body = aMorph;
        this.add(this.body);
    }

    // DialogBoxMorph layout

    addShadow() {nop(); }

    removeShadow() {nop(); }

    fixLayout() {
        const th = fontHeight(this.titleFontSize) + this.titlePadding * 2;
        let w;

        if (this.head) {
            this.head.setPosition(this.position().add(new Point(
                this.padding,
                th + this.padding
            )));
            this.silentSetWidth(this.head.width() + this.padding * 2);
            this.silentSetHeight(
                this.head.height()
                    + this.padding * 2
                    + th
            );
        }

        if (this.body) {
            if (this.head) {
                this.body.setPosition(this.head.bottomLeft().add(new Point(
                    0,
                    this.padding
                )));
                this.silentSetWidth(Math.max(
                    this.width(),
                    this.body.width() + this.padding * 2
                ));
                this.silentSetHeight(
                    this.height()
                        + this.body.height()
                        + this.padding
                );
                w = this.width();
                this.head.setLeft(
                    this.left()
                        + Math.round((w - this.head.width()) / 2)
                );
                this.body.setLeft(
                    this.left()
                        + Math.round((w - this.body.width()) / 2)
                );
            } else {
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
        }

        if (this.label) {
            this.label.setCenter(this.center());
            this.label.setTop(this.top() + (th - this.label.height()) / 2);
        }

        if (this.buttons && (this.buttons.children.length > 0)) {
            this.buttons.fixLayout();
            this.silentSetHeight(
                this.height()
                        + this.buttons.height()
                        + this.padding
            );
            this.silentSetWidth(Math.max(
                    this.width(),
                    this.buttons.width()
                            + (2 * this.padding)
                )
            );
            this.buttons.setCenter(this.center());
            this.buttons.setBottom(this.bottom() - this.padding);
        }
    }

    // DialogBoxMorph shadow

    /*
        only take the 'plain' image, so the box rounding doesn't become
        conflicted by the scrolling scripts pane
    */

    shadowImage(off, color) {
        // fallback for Windows Chrome-Shadow bug
        let fb;

        let img;
        let outline;
        let sha;
        let ctx;
        const offset = off || new Point(7, 7);
        const clr = color || new Color(0, 0, 0);
        fb = this.extent();
        img = this.image;
        outline = newCanvas(fb);
        ctx = outline.getContext('2d');
        ctx.drawImage(img, 0, 0);
        ctx.globalCompositeOperation = 'destination-out';
        ctx.drawImage(
            img,
            -offset.x,
            -offset.y
        );
        sha = newCanvas(fb);
        ctx = sha.getContext('2d');
        ctx.drawImage(outline, 0, 0);
        ctx.globalCompositeOperation = 'source-atop';
        ctx.fillStyle = clr.toString();
        ctx.fillRect(0, 0, fb.x, fb.y);
        return sha;
    }

    shadowImageBlurred(off, color) {
        let fb;
        let img;
        let sha;
        let ctx;
        const offset = off || new Point(7, 7);
        const blur = this.shadowBlur;
        const clr = color || new Color(0, 0, 0);
        fb = this.extent().add(blur * 2);
        img = this.image;
        sha = newCanvas(fb);
        ctx = sha.getContext('2d');
        ctx.shadowOffsetX = offset.x;
        ctx.shadowOffsetY = offset.y;
        ctx.shadowBlur = blur;
        ctx.shadowColor = clr.toString();
        ctx.drawImage(
            img,
            blur - offset.x,
            blur - offset.y
        );
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0;
        ctx.globalCompositeOperation = 'destination-out';
        ctx.drawImage(
            img,
            blur - offset.x,
            blur - offset.y
        );
        return sha;
    }

    // DialogBoxMorph keyboard events

    processKeyPress() {nop(); }

    processKeyDown(event) {
        // this.inspectKeyEvent(event);
        switch (event.keyCode) {
        case 13:
            this.ok();
            break;
        case 27:
            this.cancel();
            break;
        default:
            nop();
            // this.inspectKeyEvent(event);
        }
    }

    // DialogBoxMorph drawing

    drawNew() {
        this.fullChanged();
        Morph.prototype.trackChanges = false;
        super.removeShadow.call(this);
        this.fixLayout();

        let context;
        let gradient;
        const w = this.width();
        const h = this.height();

        const th = Math.floor(
            fontHeight(this.titleFontSize) + this.titlePadding * 2
        );

        const shift = this.corner / 2;
        let x;
        let y;
        const isFlat = MorphicPreferences.isFlat && !this.is3D;

        // this.alpha = isFlat ? 0.9 : 1;

        this.image = newCanvas(this.extent());
        context = this.image.getContext('2d');

        // title bar
        if (isFlat) {
            context.fillStyle = this.titleBarColor.toString();
        } else {
            gradient = context.createLinearGradient(0, 0, 0, th);
            gradient.addColorStop(
                0,
                this.titleBarColor.lighter(this.contrast / 2).toString()
            );
            gradient.addColorStop(
                1,
                this.titleBarColor.darker(this.contrast).toString()
            );
            context.fillStyle = gradient;
        }
        context.beginPath();
        this.outlinePathTitle(
            context,
            isFlat ? 0 : this.corner
        );
        context.closePath();
        context.fill();

        // flat shape
        // body
        context.fillStyle = this.color.toString();
        context.beginPath();
        this.outlinePathBody(
            context,
            isFlat ? 0 : this.corner
        );
        context.closePath();
        context.fill();

        if (isFlat) {
            super.addShadow.call(this);
            Morph.prototype.trackChanges = true;
            this.fullChanged();
            return;
        }

        // 3D-effect
        // bottom left corner
        gradient = context.createLinearGradient(
            0,
            h - this.corner,
            0,
            h
        );
        gradient.addColorStop(0, this.color.toString());
        gradient.addColorStop(1, this.color.darker(this.contrast.toString()));

        context.lineWidth = this.corner;
        context.lineCap = 'round';
        context.strokeStyle = gradient;

        context.beginPath();
        context.moveTo(this.corner, h - shift);
        context.lineTo(this.corner + 1, h - shift);
        context.stroke();

        // bottom edge
        gradient = context.createLinearGradient(
            0,
            h - this.corner,
            0,
            h
        );
        gradient.addColorStop(0, this.color.toString());
        gradient.addColorStop(1, this.color.darker(this.contrast.toString()));

        context.lineWidth = this.corner;
        context.lineCap = 'butt';
        context.strokeStyle = gradient;

        context.beginPath();
        context.moveTo(this.corner, h - shift);
        context.lineTo(w - this.corner, h - shift);
        context.stroke();

        // right body edge
        gradient = context.createLinearGradient(
            w - this.corner,
            0,
            w,
            0
        );
        gradient.addColorStop(0, this.color.toString());
        gradient.addColorStop(1, this.color.darker(this.contrast).toString());

        context.lineWidth = this.corner;
        context.lineCap = 'butt';
        context.strokeStyle = gradient;

        context.beginPath();
        context.moveTo(w - shift, th);
        context.lineTo(w - shift, h - this.corner);
        context.stroke();

        // bottom right corner
        x = w - this.corner;
        y = h - this.corner;

        gradient = context.createRadialGradient(
            x,
            y,
            0,
            x,
            y,
            this.corner
        );
        gradient.addColorStop(0, this.color.toString());
        gradient.addColorStop(1, this.color.darker(this.contrast.toString()));

        context.lineCap = 'butt';

        context.strokeStyle = gradient;

        context.beginPath();
        context.arc(
            x,
            y,
            shift,
            radians(90),
            radians(0),
            true
        );
        context.stroke();

        // left body edge
        gradient = context.createLinearGradient(
            0,
            0,
            this.corner,
            0
        );
        gradient.addColorStop(
            0,
            this.color.lighter(this.contrast).toString()
        );
        gradient.addColorStop(1, this.color.toString());

        context.lineCap = 'butt';
        context.strokeStyle = gradient;

        context.beginPath();
        context.moveTo(shift, th);
        context.lineTo(shift, h - this.corner * 2);
        context.stroke();

        // left vertical bottom corner
        gradient = context.createLinearGradient(
            0,
            0,
            this.corner,
            0
        );
        gradient.addColorStop(
            0,
            this.color.lighter(this.contrast).toString()
        );
        gradient.addColorStop(1, this.color.toString());

        context.lineCap = 'round';
        context.strokeStyle = gradient;

        context.beginPath();
        context.moveTo(shift, h - this.corner * 2);
        context.lineTo(shift, h - this.corner - shift);
        context.stroke();

        super.addShadow.call(this);
        Morph.prototype.trackChanges = true;
        this.fullChanged();
    }

    outlinePathTitle(context, radius) {
        const w = this.width();
        const h = Math.ceil(fontHeight(this.titleFontSize)) + this.titlePadding * 2;

        // top left:
        context.arc(
            radius,
            radius,
            radius,
            radians(-180),
            radians(-90),
            false
        );
        // top right:
        context.arc(
            w - radius,
            radius,
            radius,
            radians(-90),
            radians(-0),
            false
        );
        // bottom right:
        context.lineTo(w, h);

        // bottom left:
        context.lineTo(0, h);
    }

    outlinePathBody(context, radius) {
        const w = this.width();
        const h = this.height();

        const th = Math.floor(fontHeight(this.titleFontSize)) +
            this.titlePadding * 2;

        // top left:
        context.moveTo(0, th);

        // top right:
        context.lineTo(w, th);

        // bottom right:
        context.arc(
            w - radius,
            h - radius,
            radius,
            radians(0),
            radians(90),
            false
        );
        // bottom left:
        context.arc(
            radius,
            h - radius,
            radius,
            radians(90),
            radians(180),
            false
        );
    }
}