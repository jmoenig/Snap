/*
 paint.js
 Paint editor for Snap!
 Inspired by the Scratch paint editor.
 
 written by Kartik Chandra
 
 Latest revision: May 10 (Kartik)
 
 This file is part of Snap!.
 
 --current changes
    Shrinkwrap
    Draw crosshairs immediately
    TRANSPARENT PAINT
    Line width viewer
 
 --To-Do list (in rough order of priority):
    Eraser tool

    After release:
    --
    rgba sliders
    Import image
    Zoom/pan/Selection tools
    Pick color from canvas
 */

/*global Point, Rectangle, DialogBoxMorph, fontHeight, AlignmentMorph,
 FrameMorph, PushButtonMorph, Color, SymbolMorph, newCanvas, Morph, TextMorph,
 CostumeIconMorph, IDE_Morph, Costume, SpriteMorph, nop, Image, WardrobeMorph,
 TurtleIconMorph, localize, MenuMorph, InputFieldMorph, SliderMorph,
 ToggleMorph, ToggleButtonMorph, BoxMorph
 */

// Global definitions
var PaintEditorMorph;
var PaintCanvasMorph;
var PaintColorPickerMorph;

// PaintEditorMorph //////////////////////////
// A complete paint editor
//////////////////////////////////////////////

PaintEditorMorph.prototype = new DialogBoxMorph();
PaintEditorMorph.prototype.constructor = PaintEditorMorph;
PaintEditorMorph.uber = DialogBoxMorph.prototype;

PaintEditorMorph.prototype.padding = 10;

function PaintEditorMorph() {
    this.init();
}

PaintEditorMorph.prototype.init = function() {
    // additional properties:
    this.paper = null; // paint canvas

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

    this.paper = new PaintCanvasMorph(function() {return myself.shift; });

    this.addBody(new AlignmentMorph('row', this.padding));
    this.controls = new AlignmentMorph('column', this.padding);
    this.controls.alignment = 'left';

    this.edits = new AlignmentMorph('row', this.padding);
    this.buildEdits();
    this.controls.add(this.edits);

    this.body.color = this.color;

    this.body.add(this.controls);
    this.body.add(this.paper);

    this.toolbox = new BoxMorph();
    this.toolbox.color = SpriteMorph.prototype.paletteColor.lighter(8);
    this.toolbox.borderColor = this.toolbox.color.lighter(40);

    this.buildToolbox();
    this.controls.add(this.toolbox);

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
};

PaintEditorMorph.prototype.buildToolbox = function() {
    var tools = {
            brush:
                "Paintbrush tool (free draw)",
            rectangle:
                "Stroked Rectangle (shift: square)",
            circle:
                "Stroked Ellipse (shift: circle)",
            eraser:
                "Eraser tool",
            crosshairs:
                "Set the rotation center",

            line:
                "Line tool (shift: vertical/horizontal)",
            rectangleSolid:
                "Filled Rectangle (shift: square)",
            circleSolid:
                "Filled Ellipse (shift: circle)",
            paintbucket:
                "Fill a region"
        },
        myself = this,
        left = this.toolbox.left(),
        top = this.toolbox.top(),
        padding = 2,
        inset = 5,
        x = 0,
        y = 0;

    Object.keys(tools).forEach(function(tool) {
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
    this.toolbox.drawNew();
};

PaintEditorMorph.prototype.buildEdits = function() {
    var paper = this.paper;

    this.edits.add(this.pushButton(
        "undo",
        function () {paper.undo(); },
        "Undo last action"
    ));

    this.edits.add(this.pushButton(
        "clear",
        function () {paper.clearCanvas(); },
        "Clear the paper"
    ));
    this.edits.fixLayout();
};


// Open the editor in a world with an optional image to edit
PaintEditorMorph.prototype.openIn = function(world, oldim, oldrc, callback) {
    this.setCenter(world.center());
    this.oldim = oldim;
    this.oldrc = oldrc.copy();
    this.callback = callback || nop;
    world.add(this);
    this.world().keyboardReceiver = this;
    this.processKeyUp = function() {
        this.shift = false;
        this.propertiesControls.constrain.refresh();
    };
    this.processKeyDown = function() {
        this.shift = this.world().currentKey === 16;
        this.propertiesControls.constrain.refresh();
    };
    this.fixLayout(); // merge oldim - factor out into separate function
    this.changed();
};

PaintEditorMorph.prototype.fixLayout = function() {
    if (this.paper) {
        this.paper.setExtent(new Point(480, 360));
        this.paper.fixLayout();
        if (this.oldim) {
            this.paper.centermerge(this.oldim, this.paper.paper);
            this.paper.rotationCenter =
                this.oldrc.add(
                    new Point(
                        (this.paper.paper.width - this.oldim.width) / 2,
                        (this.paper.paper.height - this.oldim.height) / 2
                    )
                );
        }
        this.paper.drawNew();
    }
    if (this.controls) {this.controls.fixLayout(); }
    if (this.body) {this.body.fixLayout(); }
    PaintEditorMorph.uber.fixLayout.call(this);
};

PaintEditorMorph.prototype.refreshToolButtons = function() {
    this.toolbox.children.forEach(function (toggle) {
        toggle.refresh();
    });
};

PaintEditorMorph.prototype.ok = function() {
    this.callback(
        this.paper.paper,
        this.paper.rotationCenter
    );
    this.destroy();
};

PaintEditorMorph.prototype.populatePropertiesMenu = function() {
    var c = this.controls,
        myself = this,
        pc = this.propertiesControls,
        alpen = new AlignmentMorph("row", this.padding);

    pc.primaryColorViewer = new Morph();
    pc.primaryColorViewer.setExtent(new Point(180, 50));
    pc.primaryColorViewer.color = new Color(0, 0, 0);
    pc.colorpicker = new PaintColorPickerMorph(
        new Point(180, 100),
        function(color) {
            var ni = newCanvas(pc.primaryColorViewer.extent()),
                ctx = ni.getContext("2d"),
                i,
                j;
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
    pc.penSizeSlider.action = function(num) {
        if (pc.penSizeField) {
            pc.penSizeField.setContents(num);
        }
        myself.paper.settings.linewidth = num;
        pc.colorpicker.action(myself.paper.settings.primarycolor);
    };
    pc.penSizeField = new InputFieldMorph("5", true, null, false);
    pc.penSizeField.contents().minWidth = 20;
    pc.penSizeField.setWidth(25);
    pc.penSizeField.accept = function() {
        var val = parseFloat(pc.penSizeField.getValue());
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
        function() {myself.shift = !myself.shift; },
        "Constrain proportions of shapes?\n(you can also hold shift)",
        function() {return myself.shift; }
    );
    c.add(pc.colorpicker);
    //c.add(pc.primaryColorButton);
    c.add(pc.primaryColorViewer);
    c.add(new TextMorph("Pen size"));
    c.add(alpen);
    c.add(pc.constrain);
};

PaintEditorMorph.prototype.toolButton = function(icon, hint) {
    var button, myself = this;

    button = new ToggleButtonMorph(
        null,
        this,
        function () { // action
            myself.paper.currentTool = icon;
            myself.paper.toolChanged(icon);
            myself.refreshToolButtons();
        },
        new SymbolMorph(icon, 18),
        function () {return myself.paper.currentTool === icon; }
    );

    button.hint = hint;
    button.drawNew();
    button.fixLayout();
    return button;
};

PaintEditorMorph.prototype.pushButton = function(title, action, hint) {
    return new PushButtonMorph(
        this,
        action,
        title,
        null,
        hint
    );
};

// AdvancedColorPickerMorph //////////////////
// A large hsl color picker
//////////////////////////////////////////////

PaintColorPickerMorph.prototype = new Morph();
PaintColorPickerMorph.prototype.constructor = PaintColorPickerMorph;
PaintColorPickerMorph.uber = Morph.prototype;

function PaintColorPickerMorph(extent, action) {
    this.init(extent, action);
}

PaintColorPickerMorph.prototype.init = function(extent, action) {
    this.setExtent(extent || new Point(200, 100));
    this.action = action || nop;
    this.drawNew();
};

PaintColorPickerMorph.prototype.drawNew = function() {
    var x = 0,
        y = 0,
        can = newCanvas(this.extent()),
        ctx = can.getContext("2d"),
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
    this.image = can;
};

PaintColorPickerMorph.prototype.mouseDownLeft = function(pos) {
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
// A canvas which reacts to drag events to
// modify its image, based on a 'tool' property.
///////////////////////////////////////////////

PaintCanvasMorph.prototype = new Morph();
PaintCanvasMorph.prototype.constructor = PaintCanvasMorph;
PaintCanvasMorph.uber = Morph.prototype;

function PaintCanvasMorph(shift) {
    this.init(shift);
}

PaintCanvasMorph.prototype.init = function(shift) {
    this.fixLayout();
    this.rotationCenter = new Point(240, 180);
    this.dragRect = null;
    this.previousDragPoint = null;
    this.currentTool = "brush";
    this.dragRect = new Rectangle();
    // rectangle with origin being the starting drag position and
    // corner being the current drag position
    this.mask = newCanvas(this.extent()); // Temporary canvas
    this.paper = newCanvas(this.extent()); // Actual canvas
    this.erasermask = newCanvas(this.extent()); // eraser memory
    this.background = newCanvas(this.extent()); // checkers
    this.settings = {
        "primarycolor": new Color(0, 0, 0, 255), // usually fill color
        "secondarycolor": new Color(0, 0, 0, 255), // (unused)
        "linewidth": 3 // stroke width
    };
    this.brushBuffer = [];
    this.undoBuffer = [];
    this.isShiftPressed = shift || function() {
        var key = this.world().currentKey;
        return (key === 16);
    };
};

PaintCanvasMorph.prototype.cacheUndo = function() {
    var cachecan = newCanvas(this.extent());
    this.merge(this.paper, cachecan);
    this.undoBuffer.push(cachecan);
};

PaintCanvasMorph.prototype.undo = function() {
    if (this.undoBuffer.length > 0) {
        this.paper = newCanvas(this.extent());
        this.mask.width = this.mask.width + 1 - 1;
        this.merge(this.undoBuffer.pop(), this.paper);
        this.drawNew();
        this.changed();
    }
};

PaintCanvasMorph.prototype.merge = function(a, b) {
    b.getContext("2d").drawImage(a, 0, 0);
};
PaintCanvasMorph.prototype.centermerge = function(a, b) {
    b.getContext("2d").drawImage(
        a,
        (b.width - a.width) / 2,
        (b.height - a.height) / 2
    );
};

PaintCanvasMorph.prototype.clearCanvas = function() {
    this.fixLayout();
    this.drawNew();
    this.changed();
};

PaintCanvasMorph.prototype.toolChanged = function(tool) {
    this.mask = newCanvas(this.extent());
    if (tool === "crosshairs") {
        this.drawcrosshair();
    }
    this.drawNew();
    this.changed();
};

PaintCanvasMorph.prototype.drawcrosshair = function() {
    var mctx = this.mask.getContext("2d"),
        pos = this.rotationCenter;

    mctx.strokeStyle = "rgba(0,0,0,0.6)";
    mctx.lineWidth = 5;
    mctx.beginPath();
    mctx.moveTo(pos.x, 0);
    mctx.lineTo(pos.x, this.extent().y);
    mctx.moveTo(0, pos.y);
    mctx.lineTo(this.extent().x, pos.y);
    mctx.stroke();

    mctx.strokeStyle = "rgba(255,255,255,0.6)";
    mctx.lineWidth = 1;
    mctx.beginPath();
    mctx.moveTo(pos.x, 0);
    mctx.lineTo(pos.x, this.extent().y);
    mctx.moveTo(0, pos.y);
    mctx.lineTo(this.extent().x, pos.y);
    mctx.stroke();

    this.drawNew();
    this.changed();
};

PaintCanvasMorph.prototype.floodfill = function(sourcepoint) {
    var width = this.paper.width,
        height = this.paper.height,
        ctx = this.paper.getContext("2d"),
        img = ctx.getImageData(0, 0, width, height),
        data = img.data,
        stack = [Math.round(sourcepoint.y) * width + sourcepoint.x],
        currentpoint,
        read,
        sourcecolor,
        checkpoint;
    read = function (p) {
        var d = p * 4;
        return [data[d], data[d + 1], data[d + 2], data[d + 3]];
    };
    sourcecolor = read(stack[0]);
    checkpoint = function(p) {
        return p[0] === sourcecolor[0] &&
            p[1] === sourcecolor[1] &&
            p[2] === sourcecolor[2] &&
            p[3] === sourcecolor[3];
    };
    while (stack.length > 0) {
        currentpoint = stack.pop();
        if (checkpoint(read(currentpoint))) {
            if (currentpoint % 480 > 1) {
                stack.push(currentpoint + 1);
                stack.push(currentpoint - 1);
            }
            if (currentpoint > 0 && currentpoint < 360 * 480) {
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
            data[currentpoint * 4 + 3] = this.settings.primarycolor.a;
        }
    }
    ctx.putImageData(img, 0, 0);
};

PaintCanvasMorph.prototype.mouseDownLeft = function(pos) {
    this.cacheUndo();
    this.dragRect.origin = pos.subtract(this.bounds.origin);
    this.dragRect.corner = pos.subtract(this.bounds.origin);
    this.previousDragPoint = this.dragRect.corner.copy();
    if (this.currentTool === "paintbucket") {
        this.floodfill(pos.subtract(this.bounds.origin));
    }
    if (this.settings.primarycolor === "transparent" &&
            this.currentTool !== "crosshairs") {
        this.erasermask = newCanvas(this.extent());
        this.merge(this.paper, this.erasermask);
    }
};

PaintCanvasMorph.prototype.mouseMove = function(pos) {
    var relpos = pos.subtract(this.bounds.origin),
        mctx = this.mask.getContext("2d"),
        pctx = this.paper.getContext("2d"),
        x = this.dragRect.origin.x, // original drag X
        y = this.dragRect.origin.y, // original drag y
        p = relpos.x,               // current drag x
        q = relpos.y,               // current drag y
        w = (p - x) / 2,            // half the rect width
        h = (q - y) / 2,            // half the rect height
        i;                          // iterator number
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
            for (i = 0; i < 480; i += 1) {
                mctx.lineTo(
                    i,
                    (2 * h) * Math.sqrt(2 - Math.pow(
                        (i - x) / (2 * w),
                        2
                    )) + y
                );
            }
            for (i = 480; i > 0; i -= 1) {
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
        mctx.save();
        mctx.globalCompositeOperation = "source-over";
        mctx.strokeStyle = "rgba(0,0,0,0.6)";
        mctx.lineWidth = 5;
        mctx.beginPath();
        mctx.moveTo(p, 0);
        mctx.lineTo(p, this.extent().y);
        mctx.moveTo(0, q);
        mctx.lineTo(this.extent().x, q);
        mctx.stroke();
        mctx.strokeStyle = "rgba(255,255,255,0.6)";
        mctx.lineWidth = 1;
        mctx.beginPath();
        mctx.moveTo(p, 0);
        mctx.lineTo(p, this.extent().y);
        mctx.moveTo(0, q);
        mctx.lineTo(this.extent().x, q);
        mctx.stroke();
        this.rotationCenter = relpos.copy();
        mctx.restore();
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
        this.paper = newCanvas(this.extent());
        this.merge(this.mask, this.paper);
        break;
    default:
        nop();
    }
    this.previousDragPoint = relpos;
    this.drawNew();
    this.changed();
    mctx.restore();
};

PaintCanvasMorph.prototype.mouseClickLeft = function() {
    if (this.currentTool !== "crosshairs") {
        this.merge(this.mask, this.paper);
    }
    this.brushBuffer = [];
};

PaintCanvasMorph.prototype.fixLayout = function() {
    this.background = newCanvas(this.extent());
    this.paper = newCanvas(this.extent());
    this.mask = newCanvas(this.extent());
    this.erasermask = newCanvas(this.extent());
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

PaintCanvasMorph.prototype.drawNew = function() {
    var can = newCanvas(this.extent());
    this.merge(this.background, can);
    this.merge(this.paper, can);
    this.merge(this.mask, can);
    this.image = can;
    this.drawFrame();
};

PaintCanvasMorph.prototype.drawFrame = function () {
    var context, borderColor;

    context = this.image.getContext('2d');
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

// Changes to gui.js and object.js (temporarily here) //////////////////
// These will be incorporated into the respective files later
// They add costume editing functionality to Snap!.
////////////////////////////////////////////////////////////////////////
CostumeIconMorph.prototype.editCostume = function () {
    var ide = this.parentThatIsA(IDE_Morph);
    this.object.edit(this.world(), ide);
};

Costume.prototype.edit = function (aWorld, anIDE, isnew, oncancel, onsubmit) {
    var myself = this,
        editor = new PaintEditorMorph();
    editor.oncancel = oncancel || nop;
    editor.openIn(
        aWorld,
        isnew ?
                newCanvas(new Point(480, 360)) :
                this.contents,
        isnew ?
                new Point(240, 180) :
                this.rotationCenter,
        function (img, rc) {
            myself.contents = img;
            myself.rotationCenter = rc;
            myself.shrinkWrap();
            myself.version = Date.now();
            aWorld.changed();
            if (anIDE) {
                anIDE.currentSprite.wearCostume(myself);
                anIDE.hasChangedMedia = true;
            }
            (onsubmit || nop)();
        }
    );
};




IDE_Morph.prototype.createCorralBar = function () {
    // assumes the stage has already been created
    var padding = 5,
        newbutton,
        paintbutton,
        colors = [
            this.groupColor,
            this.frameColor.darker(50),
            this.frameColor.darker(50)
        ];
    if (this.corralBar) {
        this.corralBar.destroy();
    }
    this.corralBar = new Morph();
    this.corralBar.color = this.frameColor;
    this.corralBar.setHeight(this.logo.height()); // height is fixed
    this.add(this.corralBar);
    // new sprite button
    newbutton = new PushButtonMorph(
        this,
        "addNewSprite",
        new SymbolMorph("turtle", 14)
    );
    newbutton.corner = 12;
    newbutton.color = colors[0];
    newbutton.highlightColor = colors[1];
    newbutton.pressColor = colors[2];
    newbutton.labelMinExtent = new Point(36, 18);
    newbutton.padding = 0;
    newbutton.labelShadowOffset = new Point(-1, -1);
    newbutton.labelShadowColor = colors[1];
    newbutton.labelColor = new Color(255, 255, 255);
    newbutton.contrast = this.buttonContrast;
    newbutton.drawNew();
    newbutton.hint = "add a new Turtle sprite";
    newbutton.fixLayout();
    newbutton.setCenter(this.corralBar.center());
    newbutton.setLeft(this.corralBar.left() + padding);
    this.corralBar.add(newbutton);
    paintbutton = new PushButtonMorph(
        this,
        "paintNewSprite",
        new SymbolMorph("brush", 15)
    );
    paintbutton.corner = 12;
    paintbutton.color = colors[0];
    paintbutton.highlightColor = colors[1];
    paintbutton.pressColor = colors[2];
    paintbutton.labelMinExtent = new Point(36, 18);
    paintbutton.padding = 0;
    paintbutton.labelShadowOffset = new Point(-1, -1);
    paintbutton.labelShadowColor = colors[1];
    paintbutton.labelColor = new Color(255, 255, 255);
    paintbutton.contrast = this.buttonContrast;
    paintbutton.drawNew();
    paintbutton.hint = "paint a new sprite";
    paintbutton.fixLayout();
    paintbutton.setCenter(this.corralBar.center());
    paintbutton.setLeft(
        this.corralBar.left() + padding + newbutton.width() + padding
    );
    this.corralBar.add(paintbutton);
};

IDE_Morph.prototype.paintNewSprite = function() {
    var sprite = new SpriteMorph(this.globalVariables),
        cos = new Costume();
    sprite.name = sprite.name +
        (this.corral.frame.contents.children.length + 1);
    sprite.setCenter(this.stage.center());
    this.stage.add(sprite);
    this.sprites.add(sprite);
    this.corral.addSprite(sprite);
    this.selectSprite(sprite);
    cos.edit(this.world(), this, true, function() {sprite.remove(); });
    sprite.addCostume(cos);
};

WardrobeMorph.prototype.updateList = function () {
    var myself = this,
        x = this.left() + 5,
        y = this.top() + 5,
        padding = 4,
        oldFlag = Morph.prototype.trackChanges,
        oldPos = this.contents.position(),
        icon,
        template,
        txt,
        paintbutton,
        colors = [
            new Color(50, 50, 50, 1),
            new Color(60, 60, 60, 1),
            new Color(70, 70, 70, 1)
        ];
    this.changed();
    oldFlag = Morph.prototype.trackChanges;
    Morph.prototype.trackChanges = false;
    this.contents.destroy();
    this.contents = new FrameMorph(this);
    this.contents.acceptsDrops = false;
    this.contents.reactToDropOf = function (icon) {
        myself.reactToDropOf(icon);
    };
    this.addBack(this.contents);
    icon = new TurtleIconMorph(this.sprite);
    icon.setPosition(new Point(x, y));
    myself.addContents(icon);
    y = icon.bottom() + padding;

    paintbutton = new PushButtonMorph(
        this,
        "paintNew",
        new SymbolMorph("brush", 15)
    );
    paintbutton.padding = 5;
    paintbutton.corner = 12;
    paintbutton.color = colors[0];
    paintbutton.highlightColor = colors[1];
    paintbutton.pressColor = colors[2];
    paintbutton.labelMinExtent = new Point(36, 18);
    paintbutton.labelShadowOffset = new Point(-1, -1);
    paintbutton.labelShadowColor = colors[1];
    paintbutton.labelColor = new Color(255, 255, 255);
    paintbutton.contrast = this.buttonContrast;
    paintbutton.drawNew();
    paintbutton.hint = "Paint a new costume";
    paintbutton.setPosition(new Point(x, y));
    paintbutton.fixLayout();

    this.addContents(paintbutton);
    y = paintbutton.bottom() + padding;
    txt = new TextMorph(localize(
        "costumes tab help" // look up long string in translator
    ));
    txt.fontSize = 9;
    txt.setColor(new Color(230, 230, 230));
    txt.setPosition(new Point(x, y));
    this.addContents(txt);
    y = txt.bottom() + padding;
    this.sprite.costumes.asArray().forEach(function (costume) {
        template = icon = new CostumeIconMorph(costume, template);
        icon.setPosition(new Point(x, y));
        myself.addContents(icon);
        y = icon.bottom() + padding;
    });
    this.costumesVersion = this.sprite.costumes.lastChanged;
    this.contents.setPosition(oldPos);
    this.adjustScrollBars();
    Morph.prototype.trackChanges = oldFlag;
    this.changed();
    this.updateSelection();
};

WardrobeMorph.prototype.paintNew = function() {
    var cos = new Costume(newCanvas(), "Untitled"),
        myself = this;
    cos.edit(this.world(), null, true, null, function() {
        myself.sprite.addCostume(cos);
        myself.updateList();
        if (myself.parentThatIsA(IDE_Morph)) {
            myself.parentThatIsA(IDE_Morph).currentSprite.wearCostume(cos);
        }
    });
};

CostumeIconMorph.prototype.userMenu = function () {
    var menu = new MenuMorph(this);
    if (!(this.object instanceof Costume)) {return null; }
    menu.addItem("edit", "editCostume");
    menu.addItem("rename", "renameCostume");
    menu.addLine();
    menu.addItem("duplicate", "duplicateCostume");
    menu.addItem("delete", "removeCostume");
    menu.addLine();
    menu.addItem("export", "exportCostume");
    return menu;
};

CostumeIconMorph.prototype.duplicateCostume = function() {
    var wardrobe = this.parentThatIsA(WardrobeMorph),
        ide = this.parentThatIsA(IDE_Morph),
        newcos = this.object.copy(),
        split = newcos.name.split(" ");
    if (split[split.length - 1] === "copy") {
        newcos.name += " 2";
    } else if (isNaN(split[split.length - 1])) {
        newcos.name = newcos.name + " copy";
    } else {
        split[split.length - 1] = Number(split[split.length - 1]) + 1;
        newcos.name = split.join(" ");
    }
    wardrobe.sprite.addCostume(newcos);
    wardrobe.updateList();
    if (ide) {
        ide.currentSprite.wearCostume(newcos);
    }
};


// I had to change this because adding a "paint new" button changed the offset
// of the costume (so the 5th child would be the 3rd costume, not the 4th as
// it was before with only the text morph child).
CostumeIconMorph.prototype.removeCostume = function () {
    var wardrobe = this.parentThatIsA(WardrobeMorph),
        idx = this.parent.children.indexOf(this),
        ide = this.parentThatIsA(IDE_Morph);
    wardrobe.removeCostumeAt(idx - 2);
    if (ide.currentSprite.costume === this.object) {
        ide.currentSprite.wearCostume(null);
    }
};


Costume.prototype.shrinkWrap = function () {
    // adjust my contents'  bounds to my visible bounding box
    var bb = this.boundingBox(),
        ext = bb.extent(),
        pic = newCanvas(ext),
        ctx = pic.getContext('2d');

    ctx.drawImage(
        this.contents,
        bb.origin.x,
        bb.origin.y,
        ext.x,
        ext.y,
        0,
        0,
        ext.x,
        ext.y
    );
    this.rotationCenter = this.rotationCenter.subtract(bb.origin);
    this.contents = pic;
    this.version = Date.now();
};