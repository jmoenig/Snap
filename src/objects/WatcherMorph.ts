// WatcherMorph //////////////////////////////////////////////////////////

/*
    I am a little window which observes some value and continuously
    updates itself accordingly.

    My target can be either a SpriteMorph or a VariableFrame.
*/

import BoxMorph from "../morphic/morph/BoxMorph";

// WatcherMorph instance creation:

export default class WatcherMorph extends BoxMorph {
    constructor(label, color, target, getter, isHidden) {
        this.init(label, color, target, getter, isHidden);
    }

    init(label, color, target, getter, isHidden) {
        // additional properties
        this.labelText = label || '';
        this.version = null;
        this.objName = '';

        // initialize inherited properties
        super.init.call(
            this,
            SyntaxElementMorph.prototype.rounding,
            1.000001, // shadow bug in Chrome,
            new Color(120, 120, 120)
        );

        // override inherited behavior
        this.color = new Color(220, 220, 220);
        this.readoutColor = color;
        this.style = 'normal';
        this.target = target || null; // target obj (Sprite) or VariableFrame
        this.getter = getter || null; // callback or variable name (string)
        this.currentValue = null;
        this.labelMorph = null;
        this.sliderMorph = null;
        this.cellMorph = null;
        this.isDraggable = true;
        this.fixLayout();
        this.update();
        if (isHidden) { // for de-serializing
            this.hide();
        }
    }

    // WatcherMorph accessing:

    isTemporary() {
        const stage = this.parentThatIsA(StageMorph);
        if (this.target instanceof VariableFrame) {
            if (stage) {
                if (this.target === stage.variables.parentFrame) {
                    return false; // global
                }
            }
            return this.target.owner === null;
        }
        return false;
    }

    object() {
        // answer the actual sprite I refer to
        return this.target instanceof VariableFrame ?
                this.target.owner : this.target;
    }

    isGlobal(selector) {
        return contains(
            ['getLastAnswer', 'getLastMessage', 'getTempo', 'getTimer',
                 'reportMouseX', 'reportMouseY', 'reportThreadCount'],
            selector
        );
    }

    // WatcherMorph slider accessing:

    setSliderMin(num, noUpdate) {
        if (this.target instanceof VariableFrame) {
            this.sliderMorph.setSize(1, noUpdate);
            this.sliderMorph.setStart(num, noUpdate);
            this.sliderMorph.setSize(this.sliderMorph.rangeSize() / 5, noUpdate);
        }
    }

    setSliderMax(num, noUpdate) {
        if (this.target instanceof VariableFrame) {
            this.sliderMorph.setSize(1, noUpdate);
            this.sliderMorph.setStop(num, noUpdate);
            this.sliderMorph.setSize(this.sliderMorph.rangeSize() / 5, noUpdate);
        }
    }

    // WatcherMorph updating:

    update() {
        let newValue;
        let sprite;
        let num;
        let att;
        let isGhosted = false;

        if (this.target && this.getter) {
            this.updateLabel();
            if (this.target instanceof VariableFrame) {
                newValue = this.target.vars[this.getter] ?
                        this.target.vars[this.getter].value : undefined;
                if (newValue === undefined && this.target.owner) {
                    sprite = this.target.owner;
                    if (contains(sprite.inheritedVariableNames(), this.getter)) {
                        newValue = this.target.getVar(this.getter);
                        // ghost cell color
                        this.cellMorph.setColor(
                            SpriteMorph.prototype.blockColor.variables
                                .lighter(35)
                        );
                    } else {
                        this.destroy();
                        return;
                    }
                } else {
                    // un-ghost the cell color
                    this.cellMorph.setColor(
                        SpriteMorph.prototype.blockColor.variables
                    );
                }
            } else {
                newValue = this.target[this.getter]();

                // determine whether my getter is an inherited attribute
                att = {
                    xPosition: 'x position',
                    yPosition: 'y position',
                    direction: 'direction',
                    getCostumeIdx: 'costume #',
                    getScale: 'size'} [this.getter];
                isGhosted = att ? this.target.inheritsAttribute(att) : false;
            }
            if (newValue !== '' && !isNil(newValue)) {
                num = +newValue;
                if (typeof newValue !== 'boolean' && !isNaN(num)) {
                    newValue = Math.round(newValue * 1000000000) / 1000000000;
                }
            }
            if (newValue !== this.currentValue) {
                this.changed();
                this.cellMorph.contents = newValue;
                if (isSnapObject(this.target)) {
                    if (isGhosted) {
                        this.cellMorph.setColor(this.readoutColor.lighter(35));
                    } else {
                        this.cellMorph.setColor(this.readoutColor);
                    }
                }
                this.cellMorph.drawNew();
                if (!isNaN(newValue)) {
                    this.sliderMorph.value = newValue;
                    this.sliderMorph.drawNew();
                }
                this.fixLayout();
                this.currentValue = newValue;
            }
        }
        if (this.cellMorph.contentsMorph instanceof ListWatcherMorph) {
            this.cellMorph.contentsMorph.update();
        } else if (isSnapObject(this.cellMorph.contents)) {
            this.cellMorph.update();
        }
    }

    updateLabel() {
        // check whether the target object's name has been changed
        const obj = this.object();

        if (!obj || this.isGlobal(this.getter)) { return; }
        if (obj.version !== this.version) {
            this.objName = obj.name ? `${obj.name} ` : ' ';
            if (this.labelMorph) {
                this.labelMorph.destroy();
                this.labelMorph = null;
                this.fixLayout();
            }
        }
    }

    // WatcherMorph layout:

    fixLayout() {
        const fontSize = SyntaxElementMorph.prototype.fontSize;
        let isList;
        const myself = this;

        this.changed();

        // create my parts
        if (this.labelMorph === null) {
            this.labelMorph = new StringMorph(
                this.objName + this.labelText,
                fontSize,
                null,
                true,
                false,
                false,
                MorphicPreferences.isFlat ? new Point() : new Point(1, 1),
                new Color(255, 255, 255)
            );
            this.add(this.labelMorph);
        }
        if (this.cellMorph === null) {
            this.cellMorph = new CellMorph('', this.readoutColor);
            this.add(this.cellMorph);
        }
        if (this.sliderMorph === null) {
            this.sliderMorph = new SliderMorph(
                0,
                100,
                0,
                20,
                'horizontal'
            );
            this.sliderMorph.alpha = 1;
            this.sliderMorph.button.color = this.color.darker();
            this.sliderMorph.color = this.color.lighter(60);
            this.sliderMorph.button.highlightColor = this.color.darker();
            this.sliderMorph.button.highlightColor.b += 50;
            this.sliderMorph.button.pressColor = this.color.darker();
            this.sliderMorph.button.pressColor.b += 100;
            this.sliderMorph.setHeight(fontSize);
            this.sliderMorph.action = num => {
                myself.target.setVar(
                    myself.getter,
                    Math.round(num),
                    myself.target.owner
                );
            };
            this.add(this.sliderMorph);
        }

        // adjust my layout
        isList = this.cellMorph.contents instanceof List;
        if (isList) { this.style = 'normal'; }

        if (this.style === 'large') {
            this.labelMorph.hide();
            this.sliderMorph.hide();
            this.cellMorph.big();
            this.cellMorph.setPosition(this.position());
            this.setExtent(this.cellMorph.extent().subtract(1));
            return;
        }

        this.labelMorph.show();
        this.sliderMorph.show();
        this.cellMorph.normal();
        this.labelMorph.setPosition(this.position().add(new Point(
            this.edge,
            this.border + SyntaxElementMorph.prototype.typeInPadding
        )));

        if (isList) {
            this.cellMorph.setPosition(this.labelMorph.bottomLeft().add(
                new Point(0, SyntaxElementMorph.prototype.typeInPadding)
            ));
        } else {
            this.cellMorph.setPosition(this.labelMorph.topRight().add(new Point(
                fontSize / 3,
                0
            )));
            this.labelMorph.setTop(
                this.cellMorph.top()
                    + (this.cellMorph.height() - this.labelMorph.height()) / 2
            );
        }

        if (this.style === 'slider') {
            this.sliderMorph.silentSetPosition(new Point(
                this.labelMorph.left(),
                this.cellMorph.bottom()
                    + SyntaxElementMorph.prototype.typeInPadding
            ));
            this.sliderMorph.setWidth(this.cellMorph.right()
                - this.labelMorph.left());
            this.silentSetHeight(
                this.cellMorph.height()
                    + this.sliderMorph.height()
                    + this.border * 2
                    + SyntaxElementMorph.prototype.typeInPadding * 3
            );
        } else {
            this.sliderMorph.hide();
            this.bounds.corner.y = this.cellMorph.bottom()
                + this.border
                + SyntaxElementMorph.prototype.typeInPadding;
        }
        this.bounds.corner.x = Math.max(
            this.cellMorph.right(),
            this.labelMorph.right()
        ) + this.edge
            + SyntaxElementMorph.prototype.typeInPadding;
        this.drawNew();
        this.changed();
    }

    // WatcherMorph events:

    mouseDoubleClick(pos) {
        if (List.prototype.enableTables &&
                this.currentValue instanceof List) {
            new TableDialogMorph(this.currentValue).popUp(this.world());
        } else {
            this.escalateEvent('mouseDoubleClick', pos);
        }
    }

    // WatcherMorph dragging and dropping:

    rootForGrab() {
        // prevent watchers to be dragged in presentation mode
        const ide = this.parentThatIsA(IDE_Morph);
        if (ide && ide.isAppMode) {
            return ide;
        }
        return this;
    }

    /*
    // Scratch-like watcher-toggling, commented out b/c we have a drop-down menu

    WatcherMorph.prototype.mouseClickLeft = function () {
        if (this.style === 'normal') {
            if (this.target instanceof VariableFrame) {
                this.style = 'slider';
            } else {
                this.style = 'large';
            }
        } else if (this.style === 'slider') {
            this.style = 'large';
        } else {
            this.style = 'normal';
        }
        this.fixLayout();
    };
    */

    // WatcherMorph user menu:

    userMenu() {
        const myself = this;
        const ide = this.parentThatIsA(IDE_Morph);
        const menu = new MenuMorph(this);
        const on = '\u25CF';
        const off = '\u25CB';
        let vNames;

        function monitor(vName) {
            const stage = myself.parentThatIsA(StageMorph);
            const varFrame = myself.currentValue.outerContext.variables;
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

        if (ide && ide.isAppMode) { // prevent context menu in app mode
            return;
        }

        menu.addItem(
            `${this.style === 'normal' ? on : off} ${localize('normal')}`,
            'styleNormal'
        );
        menu.addItem(
            `${this.style === 'large' ? on : off} ${localize('large')}`,
            'styleLarge'
        );
        if (this.target instanceof VariableFrame) {
            menu.addItem(
                `${this.style === 'slider' ? on : off} ${localize('slider')}`,
                'styleSlider'
            );
            menu.addLine();
            menu.addItem(
                'slider min...',
                'userSetSliderMin'
            );
            menu.addItem(
                'slider max...',
                'userSetSliderMax'
            );
            menu.addLine();
            menu.addItem(
                'import...',
                () => {
                    const inp = document.createElement('input');
                    const ide = myself.parentThatIsA(IDE_Morph);
                    if (ide.filePicker) {
                        document.body.removeChild(ide.filePicker);
                        ide.filePicker = null;
                    }
                    inp.type = 'file';
                    inp.style.color = "transparent";
                    inp.style.backgroundColor = "transparent";
                    inp.style.border = "none";
                    inp.style.outline = "none";
                    inp.style.position = "absolute";
                    inp.style.top = "0px";
                    inp.style.left = "0px";
                    inp.style.width = "0px";
                    inp.style.height = "0px";
                    inp.style.display = "none";
                    inp.addEventListener(
                        "change",
                        () => {
                            let file;

                            function txtOnlyMsg(ftype) {
                                ide.inform(
                                    'Unable to import',
                                    `Snap! can only import "text" files.\nYou selected a file of type "${ftype}".`
                                );
                            }

                            function readText(aFile) {
                                const frd = new FileReader();
                                frd.onloadend = e => {
                                    myself.target.setVar(
                                        myself.getter,
                                        e.target.result
                                    );
                                };

                                if (aFile.type.indexOf("text") === 0) {
                                    frd.readAsText(aFile);
                                } else {
                                    txtOnlyMsg(aFile.type);
                                }
                            }

                            document.body.removeChild(inp);
                            ide.filePicker = null;
                            if (inp.files.length > 0) {
                                file = inp.files[inp.files.length - 1];
                                readText(file);
                            }
                        },
                        false
                    );
                    document.body.appendChild(inp);
                    ide.filePicker = inp;
                    inp.click();
                }
            );
            if (this.currentValue &&
                    (isString(this.currentValue) || !isNaN(+this.currentValue))) {
                menu.addItem(
                    'export...',
                    () => {
                        const ide = myself.parentThatIsA(IDE_Morph);
                        ide.saveFileAs(
                            myself.currentValue.toString(),
                            'text/plain;charset=utf-8',
                            myself.getter, // variable name
                            false
                        );
                    }
                );
            } else if (this.currentValue instanceof Context) {
                vNames = this.currentValue.outerContext.variables.names();
                if (vNames.length) {
                    menu.addLine();
                    vNames.forEach(vName => {
                        monitor(vName);
                    });
                }
            }
        }
        return menu;
    }

    setStyle(style) {
        this.style = style;
        this.fixLayout();
    }

    styleNormal() {
        this.setStyle('normal');
    }

    styleLarge() {
        this.setStyle('large');
    }

    styleSlider() {
        this.setStyle('slider');
    }

    userSetSliderMin() {
        new DialogBoxMorph(
            this,
            this.setSliderMin,
            this
        ).prompt(
            "Slider minimum value",
            this.sliderMorph.start.toString(),
            this.world(),
            null, // pic
            null, // choices
            null, // read only
            true // numeric
        );
    }

    userSetSliderMax() {
        new DialogBoxMorph(
            this,
            this.setSliderMax,
            this
        ).prompt(
            "Slider maximum value",
            this.sliderMorph.stop.toString(),
            this.world(),
            null, // pic
            null, // choices
            null, // read only
            true // numeric
        );
    }

    // WatcherMorph drawing:

    drawNew() {
        let context;
        let gradient;
        this.image = newCanvas(this.extent());
        context = this.image.getContext('2d');
        if (MorphicPreferences.isFlat || (this.edge === 0 && this.border === 0)) {
            BoxMorph.uber.drawNew.call(this);
            return;
        }
        gradient = context.createLinearGradient(0, 0, 0, this.height());
        gradient.addColorStop(0, this.color.lighter().toString());
        gradient.addColorStop(1, this.color.darker().toString());
        context.fillStyle = gradient;
        context.beginPath();
        this.outlinePath(
            context,
            Math.max(this.edge - this.border, 0),
            this.border
        );
        context.closePath();
        context.fill();
        if (this.border > 0) {
            gradient = context.createLinearGradient(0, 0, 0, this.height());
            gradient.addColorStop(0, this.borderColor.lighter().toString());
            gradient.addColorStop(1, this.borderColor.darker().toString());
            context.lineWidth = this.border;
            context.strokeStyle = gradient;
            context.beginPath();
            this.outlinePath(context, this.edge, this.border / 2);
            context.closePath();
            context.stroke();
        }
    }
}