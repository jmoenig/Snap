/*
    paint.js

    a paint editor for Snap!
    inspired by the Scratch paint editor.

    written by Kartik Chandra
    Copyright (C) 2019 by Kartik Chandra

    This file is part of Snap!.

    Snap! is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of
    the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.


    toc
    ---
    the following list shows the order in which all constructors are
    defined. Use this list to locate code in this document:

        PaintEditorMorph
        PaintColorPickerMorph
        PaintCanvasMorph


    credits
    -------
    Nathan Dinsmore contributed a fully working prototype,
    Nathan's brilliant flood-fill tool has been more or less
    directly imported into this paint implementation.

    Jens Mönig has contributed icons and bugfixes and says he has probably
    introduced many other bugs in that process. :-)


    revision history
    ----------------
    May 10 - first full release (Kartik)
    May 14 - bugfixes, Snap integration (Jens)
    May 16 - flat design adjustments (Jens)
    July 12 - pipette tool, code formatting adjustments (Jens)
    Sept 16 - flood fill freeze fix (Kartik)
    Jan 08 - mouse leave dragging fix (Kartik)
    Feb 11 - dynamically adjust to stage dimensions (Jens)
    Apr 30 - localizations (Manuel)
    June 3 - transformations (Kartik)
    June 4 - tweaks (Jens)
    Aug 24 - floodfill alpha-integer issue (Kartik)
    Sep 29 - tweaks (Jens)
    Sep 28 [of the following year :)] - Try to prevent antialiasing (Kartik)
    Oct 02 - revert disable smoothing (Jens)
    Dec 15 - center rotation point on costume creating (Craxic)
    Jan 18 - avoid pixel collision detection in PaintCanvas (Jens)
    Mar 22 - fixed automatic rotation center point mechanism (Jens)
    May 10 - retina display support adjustments (Jens)
    2017
    Apr 10 - getGlobalPixelColor adjustment for Chrome & retina (Jens)
    2018
    Jan 22 - floodfill alpha tweak (Bernat)
    Mar 19 - vector paint editor (Bernat)

    2020 Apr 14 - Morphic2 migration (Jens)
    2020 May 17 - Pipette alpha fix (Joan)
    2020 July 13 - modified scale buttons (Jadga)
*/

/*global Point, Rectangle, DialogBoxMorph, AlignmentMorph, PushButtonMorph,
Color, SymbolMorph, newCanvas, Morph, StringMorph, Costume, SpriteMorph, nop,
localize, InputFieldMorph, SliderMorph, ToggleMorph, ToggleButtonMorph,
BoxMorph, modules, radians, MorphicPreferences, getDocumentPositionOf,
StageMorph, isNil, SVG_Costume*/

// Global stuff ////////////////////////////////////////////////////////

modules.paint = '2020-July-13';

// Declarations

var PaintEditorMorph;
var PaintCanvasMorph;
var PaintColorPickerMorph;

// PaintEditorMorph //////////////////////////

// A complete paint editor

PaintEditorMorph.prototype = new DialogBoxMorph();
PaintEditorMorph.prototype.constructor = PaintEditorMorph;
PaintEditorMorph.uber = DialogBoxMorph.prototype;

PaintEditorMorph.prototype.padding = 10;

function PaintEditorMorph() {
    this.init();
}

PaintEditorMorph.prototype.init = function () {
    // additional properties:
    this.paper = null; // paint canvas
    this.oncancel = null;

    // initialize inherited properties:
    PaintEditorMorph.uber.init.call(this);

    // override inherited properties:
    this.labelString = "Paint Editor";
    this.createLabel();

    // build contents:
    this.buildContents();
};

PaintEditorMorph.prototype.buildContents = function () {
    var myself = this;

    this.paper = new PaintCanvasMorph(function () {return myself.shift; });
    this.paper.setExtent(StageMorph.prototype.dimensions);

    this.addBody(new AlignmentMorph('row', this.padding));
    this.controls = new AlignmentMorph('column', this.padding / 2);
    this.controls.alignment = 'center';

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
};

PaintEditorMorph.prototype.buildToolbox = function () {
    var tools = {
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
        },
        myself = this,
        left = this.toolbox.left(),
        top = this.toolbox.top(),
        padding = 2,
        inset = 5,
        x = 0,
        y = 0;

    Object.keys(tools).forEach(function (tool) {
        var btn = myself.toolButton(tool, tools[tool]);
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
};

PaintEditorMorph.prototype.buildEdits = function () {
    var myself = this,
        paper = this.paper;

    this.edits.add(this.pushButton(
        "undo",
        function () {paper.undo(); }
    ));

    this.edits.add(this.pushButton(
        "clear",
        function () {paper.clearCanvas(); }
    ));
    this.edits.add(this.pushButton(
        'Vector',
        function () {
            if (myself.paper.undoBuffer.length > 0) {
                myself.ide.confirm(
                    'This will erase your current drawing.\n' +
                    'Are you sure you want to continue?',
                    'Switch to vector editor?',
                    () => {
                        setTimeout(() => {myself.switchToVector(); });
                    }
                );
            } else {
                myself.switchToVector();
            }
        }
    ));

    this.edits.fixLayout();
};

PaintEditorMorph.prototype.buildScaleBox = function () {
    var paper = this.paper;
    this.scaleBox.add(this.pushButton(
        new SymbolMorph('grow', 18),
        function () {paper.scale(0.05, 0.05); },
        'grow'
    ));
    this.scaleBox.add(this.pushButton(
        new SymbolMorph('shrink', 18),
        function () {paper.scale(-0.05, -0.05); },
        'shrink'
    ));
    this.scaleBox.add(this.pushButton(
        new SymbolMorph('flipHorizontal', 18),
        function () {paper.scale(-2, 0); },
        'flip horizontal'
    ));
    this.scaleBox.add(this.pushButton(
        new SymbolMorph('flipVertical', 18),
        function () {paper.scale(0, -2); },
        'flip vertical'
    ));
    this.scaleBox.fixLayout();
};

PaintEditorMorph.prototype.openIn = function (
	world,
    oldim,
    oldrc,
    callback,
    anIDE
) {
    var myself = this;
    // Open the editor in a world with an optional image to edit
    this.oldim = oldim;
    this.callback = callback || nop;
    this.ide = anIDE;

    this.processKeyUp = function () {
        myself.shift = false;
        myself.propertiesControls.constrain.refresh();
    };

    this.processKeyDown = function () {
        myself.shift = myself.world().currentKey === 16;
        myself.propertiesControls.constrain.refresh();
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
};

PaintEditorMorph.prototype.fixLayout = function () {
    this.changed();
    if (this.paper) {
        this.paper.buildContents();
        this.paper.drawNew();
    }
    if (this.controls) {this.controls.fixLayout(); }
    if (this.body) {this.body.fixLayout(); }
    PaintEditorMorph.uber.fixLayout.call(this);
    this.changed();
};

PaintEditorMorph.prototype.refreshToolButtons = function () {
    this.toolbox.children.forEach(function (toggle) {
        toggle.refresh();
    });
};

PaintEditorMorph.prototype.ok = function () {
    this.paper.updateAutomaticCenter();
    this.callback(
        this.paper.paper,
        this.paper.rotationCenter
    );
    this.destroy();
};

PaintEditorMorph.prototype.cancel = function () {
    if (this.oncancel) {this.oncancel(); }
    this.destroy();
};

PaintEditorMorph.prototype.switchToVector = function () {

    this.object = new SVG_Costume(new Image(), '', new Point(0,0));
    this.object.edit(
        this.world(),
        this.ide,
        true
    );
};

PaintEditorMorph.prototype.populatePropertiesMenu = function () {
    var c = this.controls,
        myself = this,
        pc = this.propertiesControls,
        alpen = new AlignmentMorph("row", this.padding),
        brushControl = new AlignmentMorph("column", 3);
        
    brushControl.alignment = "left";

    pc.primaryColorViewer = new Morph();
    pc.primaryColorViewer.isCachingImage = true;

    pc.primaryColorViewer.render = function (ctx) {
        var color = myself.paper.settings.primarycolor,
            i,
            j;
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
    };

    pc.primaryColorViewer.setExtent(new Point(180, 40));
    pc.primaryColorViewer.color = new Color(0, 0, 0);

    pc.colorpicker = new PaintColorPickerMorph(
        new Point(180, 100),
        function (color) {
            myself.paper.settings.primarycolor = color;
            pc.primaryColorViewer.rerender();
        }
    );
    pc.colorpicker.isCachingImage = true;
    pc.colorpicker.action(new Color(0, 0, 0));

    pc.penSizeSlider = new SliderMorph(0, 20, 5, 5);
    pc.penSizeSlider.orientation = "horizontal";
    pc.penSizeSlider.setHeight(15);
    pc.penSizeSlider.setWidth(150);
    pc.penSizeSlider.action = function (num) {
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
        var val = parseFloat(pc.penSizeField.getValue());
        pc.penSizeSlider.value = val;
        pc.penSizeSlider.updateValue();
        this.setContents(val);
        myself.paper.settings.linewidth = val;
        this.world().keyboardFocus = myself;
        pc.colorpicker.action(myself.paper.settings.primarycolor);
    };

    alpen.add(pc.penSizeSlider);
    alpen.add(pc.penSizeField);
    alpen.color = myself.color;
    alpen.fixLayout();

    pc.penSizeField.fixLayout();
    pc.constrain = new ToggleMorph(
        "checkbox",
        this,
        function () {myself.shift = !myself.shift; },
        "Constrain proportions of shapes?\n(you can also hold shift)",
        function () {return myself.shift; }
    );
    pc.constrain.label.isBold = false;

    c.add(pc.colorpicker);
    //c.add(pc.primaryColorButton);
    c.add(pc.primaryColorViewer);
    brushControl.add(
        new StringMorph(localize("Brush size") + ":", 10, null, true)
    );
    brushControl.add(alpen);
    brushControl.add(pc.constrain);
    brushControl.fixLayout();
    c.add(brushControl);
};

PaintEditorMorph.prototype.toolButton = function (icon, hint) {
    var button, myself = this;

    button = new ToggleButtonMorph(
        null,
        this,
        function () { // action
            myself.paper.currentTool = icon;
            myself.paper.toolChanged(icon);
            myself.refreshToolButtons();
            if (icon === 'pipette') {
                myself.getUserColor();
            }
        },
        new SymbolMorph(icon, 18),
        function () {return myself.paper.currentTool === icon; }
    );

    button.hint = hint;
    return button;
};

PaintEditorMorph.prototype.pushButton = function (title, action, hint) {
    return new PushButtonMorph(
        this,
        action,
        title,
        null,
        hint
    );
};

PaintEditorMorph.prototype.getUserColor = function () {
    var myself = this,
        world = this.world(),
        hand = world.hand,
        posInDocument = getDocumentPositionOf(world.worldCanvas),
        mouseMoveBak = hand.processMouseMove,
        mouseDownBak = hand.processMouseDown,
        mouseUpBak = hand.processMouseUp;

    hand.processMouseMove = function (event) {
        var color;
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
        color.a = 1;
        myself.propertiesControls.colorpicker.action(color);
    };

    hand.processMouseDown = nop;

    hand.processMouseUp = function () {
        myself.paper.currentTool = 'brush';
        myself.paper.toolChanged('brush');
        myself.refreshToolButtons();
        hand.processMouseMove = mouseMoveBak;
        hand.processMouseDown = mouseDownBak;
        hand.processMouseUp = mouseUpBak;
    };
};

// AdvancedColorPickerMorph //////////////////

// A large hsl color picker

PaintColorPickerMorph.prototype = new Morph();
PaintColorPickerMorph.prototype.constructor = PaintColorPickerMorph;
PaintColorPickerMorph.uber = Morph.prototype;

function PaintColorPickerMorph(extent, action) {
    this.init(extent, action);
}

PaintColorPickerMorph.prototype.init = function (extent, action) {
    this.isCachingImage = true;
    this.setExtent(extent || new Point(200, 100));
    this.action = action || nop;
};

PaintColorPickerMorph.prototype.render = function (ctx) {
    var x = 0,
        y = 0,
        colorselection,
        r;
    for (x = 0; x < this.width(); x += 1) {
        for (y = 0; y < this.height() - 20; y += 1) {
            ctx.fillStyle = "hsl(" +
                (360 * x / this.width()) +
                "," +
                "100%," +
                (y * 100 / (this.height() - 20)) +
                "%)";
            ctx.fillRect(x, y, 1, 1);
        }
    }
    for (x = 0; x < this.width(); x += 1) {
        r = Math.floor(255 * x / this.width());
        ctx.fillStyle = "rgb(" + r + ", " + r + ", " + r + ")";
        ctx.fillRect(x, this.height() - 20, 1, 10);
    }
    colorselection = ["black", "white", "gray"];
    for (x = 0; x < colorselection.length; x += 1) {
        ctx.fillStyle = colorselection[x];
        ctx.fillRect(
            x * this.width() / colorselection.length,
            this.height() - 10,
            this.width() / colorselection.length,
            10
        );
    }
    for (x = this.width() * 2 / 3; x < this.width(); x += 2) {
        for (y = this.height() - 10; y < this.height(); y += 2) {
            if ((x + y) / 2 % 2 === 0) {
                ctx.fillStyle = "#DDD";
                ctx.fillRect(x, y, 2, 2);
            }
        }
    }
};

PaintColorPickerMorph.prototype.mouseDownLeft = function (pos) {
    if ((pos.subtract(this.position()).x > this.width() * 2 / 3) &&
            (pos.subtract(this.position()).y > this.height() - 10)) {
        this.action("transparent");
    } else {
        this.action(this.getPixelColor(pos));
    }
};

PaintColorPickerMorph.prototype.mouseMove =
    PaintColorPickerMorph.prototype.mouseDownLeft;

// PaintCanvasMorph ///////////////////////////
/*
    A canvas which reacts to drag events to
    modify its image, based on a 'tool' property.
*/

PaintCanvasMorph.prototype = new Morph();
PaintCanvasMorph.prototype.constructor = PaintCanvasMorph;
PaintCanvasMorph.uber = Morph.prototype;

function PaintCanvasMorph(shift) {
    this.init(shift);
}

PaintCanvasMorph.prototype.init = function (shift) {
    this.rotationCenter = new Point(240, 180);
    this.dragRect = null;
    this.previousDragPoint = null;
    this.currentTool = "brush";
    this.dragRect = new Rectangle();
    // rectangle with origin being the starting drag position and
    // corner being the current drag position
    this.mask = null; // Temporary canvas
    this.paper = null; // Actual canvas
    this.erasermask = null; // eraser memory
    this.background = null; // checkers
    this.settings = {
        "primarycolor": new Color(0, 0, 0, 255), // usually fill color
        "secondarycolor": new Color(0, 0, 0, 255), // (unused)
        "linewidth": 3 // stroke width
    };
    this.brushBuffer = [];
    this.undoBuffer = [];
    this.isShiftPressed = shift || function () {
        var key = this.world().currentKey;
        return (key === 16);
    };
    // should we calculate the center of the image ourselves,
    // or use the user position
    this.automaticCrosshairs = true;
    this.isCachingImage = true;
    this.buildContents();
    this.drawNew();
};

// Calculate the center of all the non-transparent pixels on the canvas.
PaintCanvasMorph.prototype.calculateCanvasCenter = function(canvas) {
    var canvasBounds = Costume.prototype.canvasBoundingBox(canvas);
    if (canvasBounds === null) {
        return null;
    }
    // Can't use canvasBounds.center(), it rounds down.
    return new Point(
    	(canvasBounds.origin.x + canvasBounds.corner.x) / 2,
        (canvasBounds.origin.y + canvasBounds.corner.y) / 2
    );
};

// If we are in automaticCrosshairs mode, recalculate the rotationCenter.
PaintCanvasMorph.prototype.updateAutomaticCenter = function () {
    if (this.automaticCrosshairs) {
        // Calculate this.rotationCenter from this.paper
        var rotationCenter = this.calculateCanvasCenter(this.paper);
        if (rotationCenter !== null) {
            this.rotationCenter = rotationCenter;
        }
    }
};

PaintCanvasMorph.prototype.scale = function (x, y) {
    this.updateAutomaticCenter();
    this.mask = newCanvas(this.extent(), true);
    var c = newCanvas(this.extent(), true);
    c.getContext("2d").save();
    c.getContext("2d").translate(
        this.rotationCenter.x,
        this.rotationCenter.y
    );
    c.getContext("2d").scale(1 + x, 1 + y);
    c.getContext("2d").drawImage(
        this.paper,
        -this.rotationCenter.x,
        -this.rotationCenter.y
    );
    c.getContext("2d").restore();
    this.paper = c;
    this.drawNew();
    this.changed();
};

PaintCanvasMorph.prototype.cacheUndo = function () {
    var cachecan = newCanvas(this.extent(), true);
    this.merge(this.paper, cachecan);
    this.undoBuffer.push(cachecan);
};

PaintCanvasMorph.prototype.undo = function () {
    if (this.undoBuffer.length > 0) {
        this.paper = newCanvas(this.extent(), true);
        this.mask.width = this.mask.width + 1 - 1;
        this.merge(this.undoBuffer.pop(), this.paper);
        this.drawNew();
        this.changed();
    }
};

PaintCanvasMorph.prototype.merge = function (a, b) {
    b.getContext("2d").drawImage(a, 0, 0);
};

PaintCanvasMorph.prototype.centermerge = function (a, b) {
    b.getContext("2d").drawImage(
        a,
        (b.width - a.width) / 2,
        (b.height - a.height) / 2
    );
};

PaintCanvasMorph.prototype.clearCanvas = function () {
    this.buildContents();
    this.drawNew();
    this.changed();
};

PaintCanvasMorph.prototype.toolChanged = function (tool) {
    this.mask = newCanvas(this.extent(), true, this.mask);
    if (tool === "crosshairs") {
        this.updateAutomaticCenter();
        this.drawcrosshair();
    }
    this.drawNew();
    this.changed();
};

PaintCanvasMorph.prototype.drawcrosshair = function (context) {
    var ctx = context || this.mask.getContext("2d"),
        rp = this.rotationCenter;

    ctx.save();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.clearRect(0, 0, this.mask.width, this.mask.height);

    // draw crosshairs:
    ctx.globalAlpha = 0.5;

    // circle around center:
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(
        rp.x,
        rp.y,
        20,
        radians(0),
        radians(360),
        false
    );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(
        rp.x,
        rp.y,
        10,
        radians(0),
        radians(360),
        false
    );
    ctx.stroke();

    // horizontal line:
    ctx.beginPath();
    ctx.moveTo(0, rp.y);
    ctx.lineTo(this.mask.width, rp.y);
    ctx.stroke();

    // vertical line:
    ctx.beginPath();
    ctx.moveTo(rp.x, 0);
    ctx.lineTo(rp.x, this.mask.height);
    ctx.stroke();

    ctx.restore();

    this.drawNew();
};

PaintCanvasMorph.prototype.floodfill = function (sourcepoint) {
    var width = this.paper.width,
        height = this.paper.height,
        ctx = this.paper.getContext("2d"),
        img = ctx.getImageData(0, 0, width, height),
        data = img.data,
        stack = [Math.round(Math.round(sourcepoint.y) * width + sourcepoint.x)],
        currentpoint,
        read,
        sourcecolor,
        checkpoint;
    read = function (p) {
        var d = p * 4;
        return [data[d], data[d + 1], data[d + 2], data[d + 3]];
    };
    sourcecolor = read(stack[0]);
    checkpoint = function (p) {
        return p[0] === sourcecolor[0] &&
            p[1] === sourcecolor[1] &&
            p[2] === sourcecolor[2] &&
            p[3] === sourcecolor[3];
    };

    // if already filled, abort
    if (sourcecolor[3] === 0 &&
            this.settings.primarycolor === "transparent") {
        return;
    }
    if (sourcecolor[0] === this.settings.primarycolor.r &&
            sourcecolor[1] === this.settings.primarycolor.g &&
            sourcecolor[2] === this.settings.primarycolor.b &&
            sourcecolor[3] === this.settings.primarycolor.a * 255) {
        return;
    }
    if (sourcecolor[3] === 0 && this.settings.primarycolor.a === 0) {
        return;
    }

    while (stack.length > 0) {
        currentpoint = stack.pop();
        if (checkpoint(read(currentpoint))) {
            if (currentpoint % width > 1) {
                stack.push(currentpoint + 1);
                stack.push(currentpoint - 1);
            }
            if (currentpoint > 0 && currentpoint < height * width) {
                stack.push(currentpoint + width);
                stack.push(currentpoint - width);
            }
        }
        if (this.settings.primarycolor === "transparent") {
            data[currentpoint * 4 + 3] = 0;
        } else {
            data[currentpoint * 4] = this.settings.primarycolor.r;
            data[currentpoint * 4 + 1] = this.settings.primarycolor.g;
            data[currentpoint * 4 + 2] = this.settings.primarycolor.b;
            data[currentpoint * 4 + 3] = this.settings.primarycolor.a * 255;
        }
    }
    ctx.putImageData(img, 0, 0);
    this.drawNew();
    this.changed();
};

PaintCanvasMorph.prototype.mouseDownLeft = function (pos) {
    this.cacheUndo();
    this.dragRect.origin = pos.subtract(this.bounds.origin);
    this.dragRect.corner = pos.subtract(this.bounds.origin);
    this.previousDragPoint = this.dragRect.corner.copy();
    if (this.currentTool === 'crosshairs') {
        this.rotationCenter = pos.subtract(this.bounds.origin);
        this.drawcrosshair();
        return;
    }
    if (this.currentTool === "paintbucket") {
        return this.floodfill(pos.subtract(this.bounds.origin));
    }
    if (this.settings.primarycolor === "transparent" &&
            this.currentTool !== "crosshairs") {
        this.erasermask = newCanvas(this.extent(), true, this.erasermask);
        this.merge(this.paper, this.erasermask);
    }
};

PaintCanvasMorph.prototype.mouseMove = function (pos) {
    if (this.currentTool === "paintbucket") {
        return;
    }

    var relpos = pos.subtract(this.bounds.origin),
        mctx = this.mask.getContext("2d"),
        pctx = this.paper.getContext("2d"),
        x = this.dragRect.origin.x, // original drag X
        y = this.dragRect.origin.y, // original drag y
        p = relpos.x,               // current drag x
        q = relpos.y,               // current drag y
        w = (p - x) / 2,            // half the rect width
        h = (q - y) / 2,            // half the rect height
        i,                          // iterator number
        width = this.paper.width;

    mctx.save();
    function newW() {
        return Math.max(Math.abs(w), Math.abs(h)) * (w / Math.abs(w));
    }
    function newH() {
        return Math.max(Math.abs(w), Math.abs(h)) * (h / Math.abs(h));
    }
    this.brushBuffer.push([p, q]);
    mctx.lineWidth = this.settings.linewidth;
    mctx.clearRect(0, 0, this.bounds.width(), this.bounds.height()); // mask

    this.dragRect.corner = relpos.subtract(this.dragRect.origin); // reset crn

    if (this.settings.primarycolor === "transparent" &&
            this.currentTool !== "crosshairs") {
        this.merge(this.erasermask, this.mask);
        pctx.clearRect(0, 0, this.bounds.width(), this.bounds.height());
        mctx.globalCompositeOperation = "destination-out";
    } else {
        mctx.fillStyle = this.settings.primarycolor.toString();
        mctx.strokeStyle = this.settings.primarycolor.toString();
    }
    switch (this.currentTool) {
    case "rectangle":
        if (this.isShiftPressed()) {
            mctx.strokeRect(x, y, newW() * 2, newH() * 2);
        } else {
            mctx.strokeRect(x, y, w * 2, h * 2);
        }
        break;
    case "rectangleSolid":
        if (this.isShiftPressed()) {
            mctx.fillRect(x, y, newW() * 2, newH() * 2);
        } else {
            mctx.fillRect(x, y, w * 2, h * 2);
        }
        break;
    case "brush":
        mctx.lineCap = "round";
        mctx.lineJoin = "round";
        mctx.beginPath();
        mctx.moveTo(this.brushBuffer[0][0], this.brushBuffer[0][1]);
        for (i = 0; i < this.brushBuffer.length; i += 1) {
            mctx.lineTo(this.brushBuffer[i][0], this.brushBuffer[i][1]);
        }
        mctx.stroke();
        break;
    case "line":
        mctx.beginPath();
        mctx.moveTo(x, y);
        if (this.isShiftPressed()) {
            if (Math.abs(h) > Math.abs(w)) {
                mctx.lineTo(x, q);
            } else {
                mctx.lineTo(p, y);
            }
        } else {
            mctx.lineTo(p, q);
        }
        mctx.stroke();
        break;
    case "circle":
    case "circleSolid":
        mctx.beginPath();
        if (this.isShiftPressed()) {
            mctx.arc(
                x,
                y,
                new Point(x, y).distanceTo(new Point(p, q)),
                0,
                Math.PI * 2,
                false
            );
        } else {
            for (i = 0; i < width; i += 1) {
                mctx.lineTo(
                    i,
                    (2 * h) * Math.sqrt(2 - Math.pow(
                        (i - x) / (2 * w),
                        2
                    )) + y
                );
            }
            for (i = width; i > 0; i -= 1) {
                mctx.lineTo(
                    i,
                    -1 * (2 * h) * Math.sqrt(2 - Math.pow(
                        (i - x) / (2 * w),
                        2
                    )) + y
                );
            }
        }
        mctx.closePath();
        if (this.currentTool === "circleSolid") {
            mctx.fill();
        } else {
            if (this.currentTool === "circle") {
                mctx.stroke();
            }
        }
        break;
    case "crosshairs":
        // Disable automatic crosshairs:
        // user has now chosen where they should be.
        this.automaticCrosshairs = false;
        this.rotationCenter = relpos.copy();
        this.drawcrosshair(mctx);
        break;
    case "eraser":
        this.merge(this.paper, this.mask);
        mctx.save();
        mctx.globalCompositeOperation = "destination-out";
        mctx.beginPath();
        mctx.moveTo(this.brushBuffer[0][0], this.brushBuffer[0][1]);
        for (i = 0; i < this.brushBuffer.length; i += 1) {
            mctx.lineTo(this.brushBuffer[i][0], this.brushBuffer[i][1]);
        }
        mctx.stroke();
        mctx.restore();
        this.paper = newCanvas(this.extent(), true);
        this.merge(this.mask, this.paper);
        break;
    default:
        nop();
    }
    this.previousDragPoint = relpos;
    this.drawNew();
    mctx.restore();
    this.changed();
};

PaintCanvasMorph.prototype.mouseClickLeft = function () {
    if (this.currentTool !== "crosshairs") {
        this.merge(this.mask, this.paper);
    }
    this.brushBuffer = [];
};

PaintCanvasMorph.prototype.mouseLeaveDragging
    = PaintCanvasMorph.prototype.mouseClickLeft;

PaintCanvasMorph.prototype.buildContents = function () {
    this.background = newCanvas(this.extent(), false, this.background);
    this.paper = newCanvas(this.extent(), true, this.paper);
    this.mask = newCanvas(this.extent(), true, this.mask);
    this.erasermask = newCanvas(this.extent(), true, this.erasermask);
    var i, j, bkctx = this.background.getContext("2d");
    for (i = 0; i < this.background.width; i += 5) {
        for (j = 0; j < this.background.height; j += 5) {
            if ((i + j) / 5 % 2 === 1) {
                bkctx.fillStyle = "rgba(255, 255, 255, 1)";
            } else {
                bkctx.fillStyle = "rgba(255, 255, 255, 0.3)";
            }
            bkctx.fillRect(i, j, 5, 5);
        }
    }
};

PaintCanvasMorph.prototype.drawNew = function () {
    var can = newCanvas(this.extent(), true, this.cachedImage);
    this.merge(this.background, can);
    this.merge(this.paper, can);
    this.merge(this.mask, can);
    this.cachedImage = can;
    this.drawFrame();
};

PaintCanvasMorph.prototype.rerender // ugly hack, but hey, it works ;-) jens
    = PaintCanvasMorph.prototype.drawNew;

PaintCanvasMorph.prototype.drawFrame = function () {
    var context, borderColor;

    context = this.cachedImage.getContext('2d');
    if (this.parent) {
        this.color = this.parent.color.lighter(this.contrast * 0.75);
        borderColor = this.parent.color;
    } else {
        borderColor = new Color(120, 120, 120);
    }
    context.fillStyle = this.color.toString();

    // cache my border colors
    this.cachedClr = borderColor.toString();
    this.cachedClrBright = borderColor.lighter(this.contrast)
        .toString();
    this.cachedClrDark = borderColor.darker(this.contrast).toString();
    this.drawRectBorder(context);
};

PaintCanvasMorph.prototype.drawRectBorder
    = InputFieldMorph.prototype.drawRectBorder;

PaintCanvasMorph.prototype.edge
    = InputFieldMorph.prototype.edge;

PaintCanvasMorph.prototype.fontSize
    = InputFieldMorph.prototype.fontSize;

PaintCanvasMorph.prototype.typeInPadding
    = InputFieldMorph.prototype.typeInPadding;

PaintCanvasMorph.prototype.contrast
    = InputFieldMorph.prototype.contrast;
