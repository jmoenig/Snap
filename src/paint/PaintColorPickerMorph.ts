// AdvancedColorPickerMorph //////////////////

// A large hsl color picker

import Morph from "../morphic/morph/Morph";

export default class PaintColorPickerMorph extends Morph {
    constructor(extent, action) {
        this.init(extent, action);
    }

    init(extent, action) {
        this.setExtent(extent || new Point(200, 100));
        this.action = action || nop;
        this.drawNew();
    }

    drawNew() {
        let x = 0;
        let y = 0;
        const can = newCanvas(this.extent());
        const ctx = can.getContext("2d");
        let colorselection;
        let r;
        for (x = 0; x < this.width(); x += 1) {
            for (y = 0; y < this.height() - 20; y += 1) {
                ctx.fillStyle = `hsl(${360 * x / this.width()},100%,${y * 100 / (this.height() - 20)}%)`;
                ctx.fillRect(x, y, 1, 1);
            }
        }
        for (x = 0; x < this.width(); x += 1) {
            r = Math.floor(255 * x / this.width());
            ctx.fillStyle = `rgb(${r}, ${r}, ${r})`;
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
    }

    mouseDownLeft(pos) {
        if ((pos.subtract(this.position()).x > this.width() * 2 / 3) &&
                (pos.subtract(this.position()).y > this.height() - 10)) {
            this.action("transparent");
        } else {
            this.action(this.getPixelColor(pos));
        }
    }
}

PaintColorPickerMorph.prototype.mouseMove =
    PaintColorPickerMorph.prototype.mouseDownLeft;

