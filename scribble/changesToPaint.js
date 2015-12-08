/**
 * Until the user selects the CrossHairs tool, the PaintCanvasMorph will automatically decide where the center of the
 * painting is.
 * @type {boolean}
 */
PaintCanvasMorph.prototype.automaticCrosshairs = true;

// If the user ever selects the "crosshairs" tool (that allows the sprite center to be selected), assume the user has
// now decided where the center will go, and we should no longer automatically update it.
PaintCanvasMorph.prototype.uberToolChanged = PaintCanvasMorph.prototype.toolChanged;
PaintCanvasMorph.prototype.toolChanged = function (tool) {
    var retVal = this.uberToolChanged(tool);
    if (tool === "crosshairs") {
        this.automaticCrosshairs = false;
    }
    return retVal;
};

// Returns a rectangle that encloses all the non-transparent pixels on the canvas.
PaintCanvasMorph.prototype.calculateCanvasBounds = function(canvas) {
    var context = canvas.getContext("2d");
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var imageDataBuffer = imageData.data;

    var minX = null, minY = null, maxX = null, maxY = null;

    for (var y = 0; y < canvas.height; y++) {
        for (var x = 0; x < canvas.width; x++) {
            var alphaValue = imageDataBuffer[(y * canvas.width + x) * 4 + 3];
            if (alphaValue > 0) {
                if (minX == null) {
                    minX = maxX = x;
                    minY = maxY = y;
                } else {
                    if (x > maxX) {
                        maxX = x;
                    } else if (x < minX) {
                        minX = x;
                    }
                    if (y > maxY) {
                        maxY = y;
                    } else if (y < minY) {
                        minY = y;
                    }
                }
            }
        }
    }


    if (minX == null) {
        return null;
    }
    return new Rectangle(minX, minY, maxX, maxY);
};

// Calculate the center of all the non-transparent pixels on the canvas.
PaintCanvasMorph.prototype.calculateCanvasCenter = function(canvas) {
    var canvasBounds = this.calculateCanvasBounds(canvas);
    if (canvasBounds == null) {
        return null;
    }
    return canvasBounds.center();
};

// If we are in automaticCrosshairs mode, recalculate the rotationCenter.
PaintCanvasMorph.prototype.updateAutomaticCenter = function () {
    if (this.automaticCrosshairs) {
        // Calculate this.rotationCenter from this.paper
        var rotationCenter = this.calculateCanvasCenter(this.paper);
        if (rotationCenter != null) {
            this.rotationCenter = rotationCenter;
        }
    }
};

// Recalculate the rotationCenter if we're scaling (flip, grow, shrink)
PaintCanvasMorph.prototype.uberScale = PaintCanvasMorph.prototype.scale;
PaintCanvasMorph.prototype.scale = function (x, y) {
    this.updateAutomaticCenter();
    return this.uberScale(x, y);
};

// Recalculate the rotationCenter if we're about to return.
PaintEditorMorph.prototype.uberOk = PaintEditorMorph.prototype.ok;
PaintEditorMorph.prototype.ok = function() {
    this.paper.updateAutomaticCenter();
    return this.uberOk();
};