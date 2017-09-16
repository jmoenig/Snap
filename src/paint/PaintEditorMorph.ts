// PaintEditorMorph //////////////////////////

// A complete paint editor

// TODO

PaintEditorMorph.prototype.padding = 10;

export default class PaintEditorMorph extends DialogBoxMorph {
    constructor() {
        this.init();
    }

    init() {
        // additional properties:
        this.paper = null; // paint canvas
        this.oncancel = null;

        // initialize inherited properties:
        super.init.call(this);

        // override inherited properties:
        this.labelString = "Paint Editor";
        this.createLabel();

        // build contents:
        this.buildContents();
    }

    buildContents() {
        const myself = this;

        this.paper = new PaintCanvasMorph(() => myself.shift);
        this.paper.setExtent(StageMorph.prototype.dimensions);

        this.addBody(new AlignmentMorph('row', this.padding));
        this.controls = new AlignmentMorph('column', this.padding / 2);
        this.controls.alignment = 'left';

        this.edits = new AlignmentMorph('row', this.padding / 2);
        this.buildEdits();
        this.controls.add(this.edits);

        this.body.color = this.color;

        this.body.add(this.controls);
        this.body.add(this.paper);

        this.toolbox = new BoxMorph();
        this.toolbox.color = SpriteMorph.prototype.paletteColor.lighter(8);
        this.toolbox.borderColor = this.toolbox.color.lighter(40);
        if (MorphicPreferences.isFlat) {
            this.toolbox.edge = 0;
        }

        this.buildToolbox();
        this.controls.add(this.toolbox);

        this.scaleBox = new AlignmentMorph('row', this.padding / 2);
        this.buildScaleBox();
        this.controls.add(this.scaleBox);

        this.propertiesControls = {
            colorpicker: null,
            penSizeSlider: null,
            penSizeField: null,
            primaryColorButton: null,
            primaryColorViewer: null,
            constrain: null
        };
        this.populatePropertiesMenu();

        this.addButton("ok", "OK");
        this.addButton("cancel", "Cancel");

        this.refreshToolButtons();
        this.fixLayout();
        this.drawNew();
    }

    buildToolbox() {
        const tools = {
                brush:
                    "Paintbrush tool\n(free draw)",
                rectangle:
                    "Stroked Rectangle\n(shift: square)",
                circle:
                    "Stroked Ellipse\n(shift: circle)",
                eraser:
                    "Eraser tool",
                crosshairs:
                    "Set the rotation center",

                line:
                    "Line tool\n(shift: vertical/horizontal)",
                rectangleSolid:
                    "Filled Rectangle\n(shift: square)",
                circleSolid:
                    "Filled Ellipse\n(shift: circle)",
                paintbucket:
                    "Fill a region",
                pipette:
                    "Pipette tool\n(pick a color anywhere)"
            };

        const myself = this;
        const left = this.toolbox.left();
        const top = this.toolbox.top();
        const padding = 2;
        const inset = 5;
        let x = 0;
        let y = 0;

        Object.keys(tools).forEach(tool => {
            const btn = myself.toolButton(tool, tools[tool]);
            btn.setPosition(new Point(
                left + x,
                top + y
            ));
            x += btn.width() + padding;
            if (tool === "crosshairs") {
                x = 0;
                y += btn.height() + padding;
                myself.paper.drawcrosshair();
            }
            myself.toolbox[tool] = btn;
            myself.toolbox.add(btn);
        });

        this.toolbox.bounds = this.toolbox.fullBounds().expandBy(inset * 2);
        this.toolbox.drawNew();
    }

    buildEdits() {
        const paper = this.paper;

        this.edits.add(this.pushButton(
            "undo",
            () => {paper.undo(); }
        ));

        this.edits.add(this.pushButton(
            "clear",
            () => {paper.clearCanvas(); }
        ));
        this.edits.fixLayout();
    }

    buildScaleBox() {
        const paper = this.paper;
        this.scaleBox.add(this.pushButton(
            "grow",
            () => {paper.scale(0.05, 0.05); }
        ));
        this.scaleBox.add(this.pushButton(
            "shrink",
            () => {paper.scale(-0.05, -0.05); }
        ));
        this.scaleBox.add(this.pushButton(
            "flip ↔",
            () => {paper.scale(-2, 0); }
        ));
        this.scaleBox.add(this.pushButton(
            "flip ↕",
            () => {paper.scale(0, -2); }
        ));
        this.scaleBox.fixLayout();
    }

    openIn(world, oldim, oldrc, callback) {
        // Open the editor in a world with an optional image to edit
        this.oldim = oldim;
        this.callback = callback || nop;

        this.processKeyUp = function () {
            this.shift = false;
            this.propertiesControls.constrain.refresh();
        };

        this.processKeyDown = function () {
            this.shift = this.world().currentKey === 16;
            this.propertiesControls.constrain.refresh();
        };

        //merge oldim:
        if (this.oldim) {
            this.paper.automaticCrosshairs = isNil(oldrc);
            this.paper.centermerge(this.oldim, this.paper.paper);
            this.paper.rotationCenter =
                (oldrc || new Point(0, 0)).add(
                    new Point(
                        (this.paper.paper.width - this.oldim.width) / 2,
                        (this.paper.paper.height - this.oldim.height) / 2
                    )
                );
            this.paper.drawNew();
        }

        this.key = 'paint';
        this.popUp(world);
    }

    fixLayout() {
        let oldFlag = Morph.prototype.trackChanges;

        this.changed();
        oldFlag = Morph.prototype.trackChanges;
        Morph.prototype.trackChanges = false;

        if (this.paper) {
            this.paper.buildContents();
            this.paper.drawNew();
        }
        if (this.controls) {this.controls.fixLayout(); }
        if (this.body) {this.body.fixLayout(); }
        super.fixLayout.call(this);

        Morph.prototype.trackChanges = oldFlag;
        this.changed();
    }

    refreshToolButtons() {
        this.toolbox.children.forEach(toggle => {
            toggle.refresh();
        });
    }

    ok() {
        this.paper.updateAutomaticCenter();
        this.callback(
            this.paper.paper,
            this.paper.rotationCenter
        );
        this.destroy();
    }

    cancel() {
        if (this.oncancel) {this.oncancel(); }
        this.destroy();
    }

    populatePropertiesMenu() {
        const c = this.controls;
        const myself = this;
        const pc = this.propertiesControls;
        const alpen = new AlignmentMorph("row", this.padding);

        pc.primaryColorViewer = new Morph();
        pc.primaryColorViewer.setExtent(new Point(180, 50));
        pc.primaryColorViewer.color = new Color(0, 0, 0);
        pc.colorpicker = new PaintColorPickerMorph(
            new Point(180, 100),
            color => {
                const ni = newCanvas(pc.primaryColorViewer.extent());
                const ctx = ni.getContext("2d");
                let i;
                let j;
                myself.paper.settings.primarycolor = color;
                if (color === "transparent") {
                    for (i = 0; i < 180; i += 5) {
                        for (j = 0; j < 15; j += 5) {
                            ctx.fillStyle =
                                ((j + i) / 5) % 2 === 0 ?
                                                "rgba(0, 0, 0, 0.2)" :
                                                "rgba(0, 0, 0, 0.5)";
                            ctx.fillRect(i, j, 5, 5);

                        }
                    }
                } else {
                    ctx.fillStyle = color.toString();
                    ctx.fillRect(0, 0, 180, 15);
                }
                ctx.strokeStyle = "black";
                ctx.lineWidth = Math.min(myself.paper.settings.linewidth, 20);
                ctx.beginPath();
                ctx.lineCap = "round";
                ctx.moveTo(20, 30);
                ctx.lineTo(160, 30);
                ctx.stroke();
                pc.primaryColorViewer.image = ni;
                pc.primaryColorViewer.changed();
            }
        );
        pc.colorpicker.action(new Color(0, 0, 0));

        pc.penSizeSlider = new SliderMorph(0, 20, 5, 5);
        pc.penSizeSlider.orientation = "horizontal";
        pc.penSizeSlider.setHeight(15);
        pc.penSizeSlider.setWidth(150);
        pc.penSizeSlider.action = num => {
            if (pc.penSizeField) {
                pc.penSizeField.setContents(num);
            }
            myself.paper.settings.linewidth = num;
            pc.colorpicker.action(myself.paper.settings.primarycolor);
        };
        pc.penSizeField = new InputFieldMorph("5", true, null, false);
        pc.penSizeField.contents().minWidth = 20;
        pc.penSizeField.setWidth(25);
        pc.penSizeField.accept = function () {
            const val = parseFloat(pc.penSizeField.getValue());
            pc.penSizeSlider.value = val;
            pc.penSizeSlider.drawNew();
            pc.penSizeSlider.updateValue();
            this.setContents(val);
            myself.paper.settings.linewidth = val;
            this.world().keyboardReceiver = myself;
            pc.colorpicker.action(myself.paper.settings.primarycolor);
        };
        alpen.add(pc.penSizeSlider);
        alpen.add(pc.penSizeField);
        alpen.color = myself.color;
        alpen.fixLayout();
        pc.penSizeField.drawNew();
        pc.constrain = new ToggleMorph(
            "checkbox",
            this,
            () => {myself.shift = !myself.shift; },
            "Constrain proportions of shapes?\n(you can also hold shift)",
            () => myself.shift
        );
        c.add(pc.colorpicker);
        //c.add(pc.primaryColorButton);
        c.add(pc.primaryColorViewer);
        c.add(new TextMorph(localize("Brush size")));
        c.add(alpen);
        c.add(pc.constrain);
    }

    toolButton(icon, hint) {
        let button;
        const myself = this;

        button = new ToggleButtonMorph(
            null,
            this,
            () => { // action
                myself.paper.currentTool = icon;
                myself.paper.toolChanged(icon);
                myself.refreshToolButtons();
                if (icon === 'pipette') {
                    myself.getUserColor();
                }
            },
            new SymbolMorph(icon, 18),
            () => myself.paper.currentTool === icon
        );

        button.hint = hint;
        button.drawNew();
        button.fixLayout();
        return button;
    }

    pushButton(title, action, hint) {
        return new PushButtonMorph(
            this,
            action,
            title,
            null,
            hint
        );
    }

    getUserColor() {
        const myself = this;
        const world = this.world();
        const hand = world.hand;
        const posInDocument = getDocumentPositionOf(world.worldCanvas);
        const mouseMoveBak = hand.processMouseMove;
        const mouseDownBak = hand.processMouseDown;
        const mouseUpBak = hand.processMouseUp;

        hand.processMouseMove = event => {
            let color;
            hand.setPosition(new Point(
                event.pageX - posInDocument.x,
                event.pageY - posInDocument.y
            ));
            color = world.getGlobalPixelColor(hand.position());
            if (!color.a) {
                // ignore transparent,
                // needed for retina-display support
                return;
            }
            color.a = 255;
            myself.propertiesControls.colorpicker.action(color);
        };

        hand.processMouseDown = nop;

        hand.processMouseUp = () => {
            myself.paper.currentTool = 'brush';
            myself.paper.toolChanged('brush');
            myself.refreshToolButtons();
            hand.processMouseMove = mouseMoveBak;
            hand.processMouseDown = mouseDownBak;
            hand.processMouseUp = mouseUpBak;
        };
    }
}