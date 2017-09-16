// PaintCanvasMorph ///////////////////////////
/*
    A canvas which reacts to drag events to
    modify its image, based on a 'tool' property.
*/

import Morph from "../morphic/morph/Morph";

export default class PaintCanvasMorph extends Morph {
    constructor(shift) {
        this.init(shift);
    }

    init(shift) {
        this.rotationCenter = new Point(240, 180);
        this.dragRect = null;
        this.previousDragPoint = null;
        this.currentTool = "brush";
        this.dragRect = new Rectangle();
        // rectangle with origin being the starting drag position and
        // corner being the current drag position
        this.mask = newCanvas(this.extent(), true); // Temporary canvas
        this.paper = newCanvas(this.extent(), true); // Actual canvas
        this.erasermask = newCanvas(this.extent(), true); // eraser memory
        this.background = newCanvas(this.extent()); // checkers
        this.settings = {
            "primarycolor": new Color(0, 0, 0, 255), // usually fill color
            "secondarycolor": new Color(0, 0, 0, 255), // (unused)
            "linewidth": 3 // stroke width
        };
        this.brushBuffer = [];
        this.undoBuffer = [];
        this.isShiftPressed = shift || function () {
            const key = this.world().currentKey;
            return (key === 16);
        };
        // should we calculate the center of the image ourselves,
        // or use the user position
        this.automaticCrosshairs = true;
        this.noticesTransparentClick = true; // optimization
        this.buildContents();
    }

    // Calculate the center of all the non-transparent pixels on the canvas.
    calculateCanvasCenter(canvas) {
        const canvasBounds = Costume.prototype.canvasBoundingBox(canvas);
        if (canvasBounds === null) {
            return null;
        }
        // Can't use canvasBounds.center(), it rounds down.
        return new Point((canvasBounds.origin.x + canvasBounds.corner.x) / 2, (canvasBounds.origin.y + canvasBounds.corner.y) / 2);
    }

    // If we are in automaticCrosshairs mode, recalculate the rotationCenter.
    updateAutomaticCenter() {
        if (this.automaticCrosshairs) {
            // Calculate this.rotationCenter from this.paper
            const rotationCenter = this.calculateCanvasCenter(this.paper);
            if (rotationCenter !== null) {
                this.rotationCenter = rotationCenter;
            }
        }
    }

    scale(x, y) {
        this.updateAutomaticCenter();
        this.mask = newCanvas(this.extent(), true);
        const c = newCanvas(this.extent(), true);
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
    }

    cacheUndo() {
        const cachecan = newCanvas(this.extent(), true);
        this.merge(this.paper, cachecan);
        this.undoBuffer.push(cachecan);
    }

    undo() {
        if (this.undoBuffer.length > 0) {
            this.paper = newCanvas(this.extent(), true);
            this.mask.width = this.mask.width + 1 - 1;
            this.merge(this.undoBuffer.pop(), this.paper);
            this.drawNew();
            this.changed();
        }
    }

    merge(a, b) {
        b.getContext("2d").drawImage(a, 0, 0);
    }

    centermerge(a, b) {
        b.getContext("2d").drawImage(
            a,
            (b.width - a.width) / 2,
            (b.height - a.height) / 2
        );
    }

    clearCanvas() {
        this.buildContents();
        this.drawNew();
        this.changed();
    }

    toolChanged(tool) {
        this.mask = newCanvas(this.extent(), true);
        if (tool === "crosshairs") {
            this.updateAutomaticCenter();
            this.drawcrosshair();
        }
        this.drawNew();
        this.changed();
    }

    drawcrosshair(context) {
        const ctx = context || this.mask.getContext("2d");
        const rp = this.rotationCenter;

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

        this.drawNew();
        this.changed();
    }

    floodfill(sourcepoint) {
        const width = this.paper.width;
        const height = this.paper.height;
        const ctx = this.paper.getContext("2d");
        const img = ctx.getImageData(0, 0, width, height);
        const data = img.data;
        const stack = [Math.round(Math.round(sourcepoint.y) * width + sourcepoint.x)];
        let currentpoint;
        let read;
        let sourcecolor;
        let checkpoint;
        read = p => {
            const d = p * 4;
            return [data[d], data[d + 1], data[d + 2], data[d + 3]];
        };
        sourcecolor = read(stack[0]);
        checkpoint = p => p[0] === sourcecolor[0] &&
            p[1] === sourcecolor[1] &&
            p[2] === sourcecolor[2] &&
            p[3] === sourcecolor[3];

        // if already filled, abort
        if (sourcecolor[3] === 0 &&
                this.settings.primarycolor === "transparent") {
            return;
        }
        if (sourcecolor[0] === this.settings.primarycolor.r &&
                sourcecolor[1] === this.settings.primarycolor.g &&
                sourcecolor[2] === this.settings.primarycolor.b &&
                sourcecolor[3] === this.settings.primarycolor.a) {
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
    }

    mouseDownLeft(pos) {
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
            this.erasermask = newCanvas(this.extent(), true);
            this.merge(this.paper, this.erasermask);
        }
    }

    mouseMove(pos) {
        if (this.currentTool === "paintbucket") {
            return;
        }

        const relpos = pos.subtract(this.bounds.origin);
        const mctx = this.mask.getContext("2d");
        const pctx = this.paper.getContext("2d");

        const // original drag X
        x = this.dragRect.origin.x;

        const // original drag y
        y = this.dragRect.origin.y;

        const // current drag x
        p = relpos.x;

        const // current drag y
        q = relpos.y;

        const // half the rect width
        w = (p - x) / 2;

        const // half the rect height
        h = (q - y) / 2;

        let // iterator number
        i;

        const width = this.paper.width;

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
                        (2 * h) * Math.sqrt(2 - (i - x) / (2 * w) ** 2) + y
                    );
                }
                for (i = width; i > 0; i -= 1) {
                    mctx.lineTo(
                        i,
                        -1 * (2 * h) * Math.sqrt(2 - (i - x) / (2 * w) ** 2) + y
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
            // Disable automatic crosshairs: user has now chosen where they should be.
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
        this.changed();
        mctx.restore();
    }

    mouseClickLeft() {
        if (this.currentTool !== "crosshairs") {
            this.merge(this.mask, this.paper);
        }
        this.brushBuffer = [];
    }

    buildContents() {
        this.background = newCanvas(this.extent());
        this.paper = newCanvas(this.extent(), true);
        this.mask = newCanvas(this.extent(), true);
        this.erasermask = newCanvas(this.extent(), true);
        let i;
        let j;
        const bkctx = this.background.getContext("2d");
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
    }

    drawNew() {
        const can = newCanvas(this.extent(), true);
        this.merge(this.background, can);
        this.merge(this.paper, can);
        this.merge(this.mask, can);
        this.image = can;
        this.drawFrame();
    }

    drawFrame() {
        let context;
        let borderColor;

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
    }
}

PaintCanvasMorph.prototype.mouseLeaveDragging
    = PaintCanvasMorph.prototype.mouseClickLeft;

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