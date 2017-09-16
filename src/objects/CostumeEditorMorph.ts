// CostumeEditorMorph ////////////////////////////////////////////////////////

import Morph from "../morphic/morph/Morph";

// CostumeEditorMorph preferences settings:
CostumeEditorMorph.prototype.size = Costume.prototype.maxExtent();

// CostumeEditorMorph instance creation

export default class CostumeEditorMorph extends Morph {
    constructor(costume) {
        this.init(costume);
    }

    init(costume) {
        this.costume = costume || new Costume();
        this.rotationCenter = this.costume.rotationCenter.copy();
        this.margin = new Point(0, 0);
        super.init.call(this);
        this.noticesTransparentClick = true;
    }

    // CostumeEditorMorph edit ops

    accept() {
        this.costume.rotationCenter = this.rotationCenter.copy();
        this.costume.version = Date.now();
    }

    // CostumeEditorMorph displaying

    drawNew() {
        let rp;
        let ctx;

        this.margin = this.size.subtract(this.costume.extent()).divideBy(2);
        rp = this.rotationCenter.add(this.margin);

        this.silentSetExtent(this.size);

        this.image = newCanvas(this.extent());

        // draw the background
        if (!this.cachedTexture) {
            this.cachedTexture = this.createTexture();

        }
        this.drawCachedTexture();

        /*
            pattern = ctx.createPattern(this.background, 'repeat');
            ctx.fillStyle = pattern;
            ctx.fillRect(0, 0, this.size.x, this.size.y);
        */

        ctx = this.image.getContext('2d');

        // draw the costume
        ctx.drawImage(this.costume.contents, this.margin.x, this.margin.y);

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
        ctx.lineTo(this.costume.width() + this.margin.x * 2, rp.y);
        ctx.stroke();

        // vertical line:
        ctx.beginPath();
        ctx.moveTo(rp.x, 0);
        ctx.lineTo(rp.x, this.costume.height() + this.margin.y * 2);
        ctx.stroke();
    }

    createTexture() {
        const size = 5;
        const texture = newCanvas(new Point(size * 2, size * 2));
        const ctx = texture.getContext('2d');
        const grey = new Color(230, 230, 230);

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, size * 2, size * 2);
        ctx.fillStyle = grey.toString();
        ctx.fillRect(0, 0, size, size);
        ctx.fillRect(size, size, size, size);
        return texture;
    }

    // CostumeEditorMorph events

    mouseDownLeft(pos) {
        this.rotationCenter = pos.subtract(
            this.position().add(this.margin)
        );
        this.drawNew();
        this.changed();
    }
}

CostumeEditorMorph.prototype.mouseMove
    = CostumeEditorMorph.prototype.mouseDownLeft;

