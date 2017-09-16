// Costume /////////////////////////////////////////////////////////////

/*
    I am a picture that's "wearable" by a sprite. My rotationCenter is
    relative to my contents position.
*/

// Costume instance creation

class Costume {
    constructor(canvas, name, rotationCenter) {
        this.contents = canvas ? normalizeCanvas(canvas, true)
                : newCanvas(null, true);
        this.shrinkToFit(this.maxExtent());
        this.name = name || null;
        this.rotationCenter = rotationCenter || this.center();
        this.version = Date.now(); // for observer optimization
        this.loaded = null; // for de-serialization only
    }

    maxExtent() {
        return StageMorph.prototype.dimensions;
    }

    toString() {
        return `a Costume(${this.name})`;
    }

    // Costume dimensions - all relative

    extent() {
        return new Point(this.contents.width, this.contents.height);
    }

    center() {
        return this.extent().divideBy(2);
    }

    width() {
        return this.contents.width;
    }

    height() {
        return this.contents.height;
    }

    bounds() {
        return new Rectangle(0, 0, this.width(), this.height());
    }

    // Costume shrink-wrapping

    shrinkWrap() {
        // adjust my contents'  bounds to my visible bounding box
        const bb = this.boundingBox();

        const ext = bb.extent();
        const pic = newCanvas(ext, true);
        const ctx = pic.getContext('2d');

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
    }

    canvasBoundingBox(pic) {
        // answer the rectangle surrounding my contents' non-transparent pixels
        let row;

        let col;
        const w = pic.width;
        const h = pic.height;
        const ctx = pic.getContext('2d');
        const dta = ctx.getImageData(0, 0, w, h);

        function getAlpha(x, y) {
            return dta.data[((y * w * 4) + (x * 4)) + 3];
        }

        function getLeft() {
            for (col = 0; col <= w; col += 1) {
                for (row = 0; row <= h; row += 1) {
                    if (getAlpha(col, row)) {
                        return col;
                    }
                }
            }
            return 0;
        }

        function getTop() {
            for (row = 0; row <= h; row += 1) {
                for (col = 0; col <= h; col += 1) {
                    if (getAlpha(col, row)) {
                        return row;
                    }
                }
            }
            return 0;
        }

        function getRight() {
            for (col = w; col >= 0; col -= 1) {
                for (row = h; row >= 0; row -= 1) {
                    if (getAlpha(col, row)) {
                        return Math.min(col + 1, w);
                    }
                }
            }
            return w;
        }

        function getBottom() {
            for (row = h; row >= 0; row -= 1) {
                for (col = w; col >= 0; col -= 1) {
                    if (getAlpha(col, row)) {
                        return Math.min(row + 1, h);
                    }
                }
            }
            return h;
        }

        return new Rectangle(getLeft(), getTop(), getRight(), getBottom());
    }

    boundingBox() {
        return this.canvasBoundingBox(this.contents);
    }

    // Costume duplication

    copy() {
        const canvas = newCanvas(this.extent(), true);
        let cpy;
        let ctx;
        ctx = canvas.getContext('2d');
        ctx.drawImage(this.contents, 0, 0);
        cpy = new Costume(canvas, this.name ? copy(this.name) : null);
        cpy.rotationCenter = this.rotationCenter.copy();
        return cpy;
    }

    // Costume flipping

    flipped() {
        /*
            answer a copy of myself flipped horizontally
            (mirrored along a vertical axis), used for
            SpriteMorph's rotation style type 2
        */
        const canvas = newCanvas(this.extent(), true);

        const ctx = canvas.getContext('2d');
        let flipped;

        ctx.translate(this.width(), 0);
        ctx.scale(-1, 1);
        ctx.drawImage(this.contents, 0, 0);
        flipped = new Costume(
            canvas,
            this.name,
            new Point(
                this.width() - this.rotationCenter.x,
                this.rotationCenter.y
            )
        );
        return flipped;
    }

    // Costume actions

    edit(aWorld, anIDE, isnew, oncancel, onsubmit) {
        const myself = this;
        const editor = new PaintEditorMorph();
        editor.oncancel = oncancel || nop;
        editor.openIn(
            aWorld,
            isnew ?
                    newCanvas(StageMorph.prototype.dimensions, true) :
                    this.contents,
            isnew ?
                    null :
                    this.rotationCenter,
            (img, rc) => {
                myself.contents = img;
                myself.rotationCenter = rc;
                myself.version = Date.now();
                aWorld.changed();
                if (anIDE) {
                    if (anIDE.currentSprite instanceof SpriteMorph) {
                        // don't shrinkwrap stage costumes
                        myself.shrinkWrap();
                    }
                    anIDE.currentSprite.wearCostume(myself, true); // don't shadow
                    anIDE.hasChangedMedia = true;
                }
                (onsubmit || nop)();
            }
        );
    }

    editRotationPointOnly(aWorld) {
        const editor = new CostumeEditorMorph(this);
        let action;
        let dialog;
        let txt;

        action = () => {editor.accept(); };
        dialog = new DialogBoxMorph(this, action);
        txt = new TextMorph(
            localize('click or drag crosshairs to move the rotation center'),
            dialog.fontSize,
            dialog.fontStyle,
            true,
            false,
            'center',
            null,
            null,
            new Point(1, 1),
            new Color(255, 255, 255)
        );

        dialog.labelString = 'Costume Editor';
        dialog.createLabel();
        dialog.setPicture(editor);
        dialog.addBody(txt);
        dialog.addButton('ok', 'Ok');
        dialog.addButton('cancel', 'Cancel');
        dialog.fixLayout();
        dialog.drawNew();
        dialog.fixLayout();
        dialog.popUp(aWorld);
    }

    // Costume thumbnail

    shrinkToFit(extentPoint) {
        if (extentPoint.x < this.width() || (extentPoint.y < this.height())) {
            this.contents = this.thumbnail(extentPoint);
        }
    }

    thumbnail(extentPoint) {
        /*
            answer a new Canvas of extentPoint dimensions containing
            my thumbnail representation keeping the originial aspect ratio
        */
        const // at this time sprites aren't composite morphs
        src = this.contents;

        const scale = Math.min(
            (extentPoint.x / src.width),
            (extentPoint.y / src.height)
        );

        const xOffset = (extentPoint.x - (src.width * scale)) / 2;
        const yOffset = (extentPoint.y - (src.height * scale)) / 2;
        const trg = newCanvas(extentPoint);
        const ctx = trg.getContext('2d');

        if (!src || src.width + src.height === 0) {return trg; }
        ctx.scale(scale, scale);
        ctx.drawImage(
            src,
            Math.floor(xOffset / scale),
            Math.floor(yOffset / scale)
        );
        return trg;
    }

    // Costume catching "tainted" canvases

    isTainted() {
        // find out whether the canvas has been tainted by cross-origin data
        // assumes that if reading image data throws an error it is tainted
        try {
            this.contents.getContext('2d').getImageData(
                0,
                0,
                this.contents.width,
                this.contents.height
            );
        } catch (err) {
            return true;
        }
        return false;
    }
}