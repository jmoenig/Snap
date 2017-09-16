// HandleMorph ////////////////////////////////////////////////////////

// I am a resize / move handle that can be attached to any Morph

import Morph from "./Morph";
import {MorphicPreferences} from "../settings";
import {newCanvas, nop, radians} from "../util";
import Point from "../Point";
import WorldMorph from "./WorldMorph";
import MenuMorph from "./MenuMorph";

// HandleMorph instance creation:

export default class HandleMorph extends Morph {
    public minExtent: Point;
    public inset: Point;

    public isDraggable = false;
    public noticesTransparentClick = true;

    public normalImage: HTMLCanvasElement;
    public highlightImage: HTMLCanvasElement;

    constructor(public target: Morph = null, minX = 0, minY = 0, insetX = 0, insetY = 0,
                public type: "resize" | "move" | "moveCenter" | "movePivot" = "resize") {
        super();

        // if insetY is missing, it will be the same as insetX
        let size = MorphicPreferences.handleSize;
        this.minExtent = new Point(minX, minY);
        this.inset = new Point(insetX, insetY || insetX);
        this.color = new Color(255, 255, 255);

        if (this.type === 'movePivot') {
            size *= 2;
        }
        this.setExtent(new Point(size, size));
    }

    // HandleMorph drawing:

    drawNew() {
        this.normalImage = newCanvas(this.extent());
        this.highlightImage = newCanvas(this.extent());
        if (this.type === 'movePivot') {
            this.drawCrosshairsOnCanvas(this.normalImage, 0.6);
            this.drawCrosshairsOnCanvas(this.highlightImage, 0.5);
        } else {
            this.drawOnCanvas(
                this.normalImage,
                this.color,
                new Color(100, 100, 100)
            );
            this.drawOnCanvas(
                this.highlightImage,
                new Color(100, 100, 255),
                new Color(255, 255, 255)
            );
        }
        this.image = this.normalImage;
        if (this.target) {
            if (this.type === 'moveCenter') {
                this.setCenter(this.target.center());
            } else if (this.type === 'movePivot') {
                this.setCenter(this.target.rotationCenter()); // TODO
            } else { // 'resize', 'move'
                this.setPosition(
                    this.target.bottomRight().subtract(
                        this.extent().add(this.inset)
                    )
                );
            }
            this.target.add(this);
            this.target.changed();
        }
    }

    drawCrosshairsOnCanvas(aCanvas: HTMLCanvasElement, fract: number) {
        const ctx = aCanvas.getContext('2d');
        const r = aCanvas.width / 2;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.arc(r, r, r * 0.9, radians(0), radians(360), false);
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(r, r, r * fract, radians(0), radians(360), false);
        ctx.stroke();
        ctx.moveTo(0, r);
        ctx.lineTo(aCanvas.width, r);
        ctx.stroke();
        ctx.moveTo(r, 0);
        ctx.lineTo(r, aCanvas.height);
        ctx.stroke();
    }

    drawOnCanvas(aCanvas: HTMLCanvasElement, color: Color, shadowColor: Color) {
        const context = aCanvas.getContext('2d');
        const isSquare = (this.type.indexOf('move') === 0);
        let p1;
        let p11;
        let p2;
        let p22;
        let i;

        context.lineWidth = 1;
        context.lineCap = 'round';

        context.strokeStyle = color.toString();

        if (isSquare) {

            p1 = this.bottomLeft().subtract(this.position());
            p11 = p1.copy();
            p2 = this.topRight().subtract(this.position());
            p22 = p2.copy();

            for (i = 0; i <= this.height(); i = i + 6) {
                p11.y = p1.y - i;
                p22.y = p2.y - i;

                context.beginPath();
                context.moveTo(p11.x, p11.y);
                context.lineTo(p22.x, p22.y);
                context.closePath();
                context.stroke();
            }
        }

        p1 = this.bottomLeft().subtract(this.position());
        p11 = p1.copy();
        p2 = this.topRight().subtract(this.position());
        p22 = p2.copy();

        for (i = 0; i <= this.width(); i = i + 6) {
            p11.x = p1.x + i;
            p22.x = p2.x + i;

            context.beginPath();
            context.moveTo(p11.x, p11.y);
            context.lineTo(p22.x, p22.y);
            context.closePath();
            context.stroke();
        }

        context.strokeStyle = shadowColor.toString();

        if (isSquare) {

            p1 = this.bottomLeft().subtract(this.position());
            p11 = p1.copy();
            p2 = this.topRight().subtract(this.position());
            p22 = p2.copy();

            for (i = -2; i <= this.height(); i = i + 6) {
                p11.y = p1.y - i;
                p22.y = p2.y - i;

                context.beginPath();
                context.moveTo(p11.x, p11.y);
                context.lineTo(p22.x, p22.y);
                context.closePath();
                context.stroke();
            }
        }

        p1 = this.bottomLeft().subtract(this.position());
        p11 = p1.copy();
        p2 = this.topRight().subtract(this.position());
        p22 = p2.copy();

        for (i = 2; i <= this.width(); i = i + 6) {
            p11.x = p1.x + i;
            p22.x = p2.x + i;

            context.beginPath();
            context.moveTo(p11.x, p11.y);
            context.lineTo(p22.x, p22.y);
            context.closePath();
            context.stroke();
        }
    }

    mouseDownLeft(pos: Point) {
        const world = <WorldMorph> this.root();
        let offset: Point;
        const myself = this;

        if (!this.target) {
            return;
        }
        if (this.type.indexOf('move') === 0) {
            offset = pos.subtract(this.center());
        } else {
            offset = pos.subtract(this.bounds.origin);
        }
        this.step = function () {
            let newPos;
            let newExt;
            if (world.hand.mouseButton) {
                newPos = world.hand.bounds.origin.copy().subtract(offset);
                if (this.type === 'resize') {
                    newExt = newPos.add(
                        myself.extent().add(myself.inset)
                    ).subtract(myself.target.bounds.origin);
                    newExt = newExt.max(myself.minExtent);
                    myself.target.setExtent(newExt);

                    myself.setPosition(
                        myself.target.bottomRight().subtract(
                            myself.extent().add(myself.inset)
                        )
                    );
                } else if (this.type === 'moveCenter') {
                    myself.target.setCenter(newPos);
                } else if (this.type === 'movePivot') {
                    myself.target.setPivot(newPos);
                    myself.setCenter(this.target.rotationCenter());
                } else { // type === 'move'
                    myself.target.setPosition(
                        newPos.subtract(this.target.extent())
                            .add(this.extent())
                    );
                }
            } else {
                this.step = null;
            }
        };
        if (!this.target.step) {
            this.target.step = () => {
                // nop();
            };
        }
    }

    // HandleMorph dragging and dropping:

    rootForGrab() {
        return this;
    }

    // HandleMorph events:

    mouseEnter() {
        this.image = this.highlightImage;
        this.changed();
    }

    mouseLeave() {
        this.image = this.normalImage;
        this.changed();
    }

    // HandleMorph menu:

    attach() {
        const choices = this.overlappedMorphs();
        const menu = new MenuMorph(this, 'choose target:');
        const myself = this;

        choices.forEach(each => {
            menu.addItem(each.toString().slice(0, 50), () => {
                myself.isDraggable = false;
                myself.target = each;
                myself.drawNew();
                myself.noticesTransparentClick = true;
            });
        });
        if (choices.length > 0) {
            menu.popUpAtHand(this.world());
        }
    }
}

// HandleMorph stepping:

HandleMorph.prototype.step = null;