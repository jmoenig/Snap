// CircleBoxMorph //////////////////////////////////////////////////////

// I can be used for sliders

import Morph from "./Morph";
import Point from "../Point";
import {newCanvas} from "../util";
import Rectangle from "../Rectangle";

export default class CircleBoxMorph extends Morph {
    public autoOrient = true;

    constructor(public orientation: "horizontal" | "vertical" = "vertical") {
        super();
        this.setExtent(new Point(20, 100));
    }

    autoOrientation() {
        if (this.height() > this.width()) {
            this.orientation = 'vertical';
        } else {
            this.orientation = 'horizontal';
        }
    }

    drawNew() {
        let radius: number;
        let center1: Point;
        let center2: Point;
        let rect: Rectangle;
        let points: Point[];
        let x: number;
        let y: number;
        let ext: Point;
        const myself = this;

        if (this.autoOrient) {
            this.autoOrientation();
        }
        this.image = newCanvas(this.extent());
        const context = this.image.getContext('2d');

        if (this.orientation === 'vertical') {
            radius = this.width() / 2;
            x = this.center().x;
            center1 = new Point(x, this.top() + radius);
            center2 = new Point(x, this.bottom() - radius);
            rect = this.bounds.origin.add(new Point(0, radius)).corner(
                this.bounds.corner.subtract(new Point(0, radius))
            );
        } else {
            radius = this.height() / 2;
            y = this.center().y;
            center1 = new Point(this.left() + radius, y);
            center2 = new Point(this.right() - radius, y);
            rect = this.bounds.origin.add(new Point(radius, 0)).corner(
                this.bounds.corner.subtract(new Point(radius, 0))
            );
        }
        points = [ center1.subtract(this.bounds.origin),
            center2.subtract(this.bounds.origin)];
        points.forEach(center => {
            context.fillStyle = myself.color.toString();
            context.beginPath();
            context.arc(
                center.x,
                center.y,
                radius,
                0,
                2 * Math.PI,
                false
            );
            context.closePath();
            context.fill();
        });
        rect = rect.translateBy(this.bounds.origin.neg());
        ext = rect.extent();
        if (ext.x > 0 && ext.y > 0) {
            context.fillRect(
                rect.origin.x,
                rect.origin.y,
                rect.width(),
                rect.height()
            );
        }
    }

    // CircleBoxMorph menu:

    developersMenu() {
        const menu = super.developersMenu.call(this);
        menu.addLine();
        if (this.orientation === 'vertical') {
            menu.addItem(
                "horizontal...",
                'toggleOrientation',
                'toggle the\norientation'
            );
        } else {
            menu.addItem(
                "vertical...",
                'toggleOrientation',
                'toggle the\norientation'
            );
        }
        return menu;
    }

    toggleOrientation() {
        const center = this.center();
        this.changed();
        if (this.orientation === 'vertical') {
            this.orientation = 'horizontal';
        } else {
            this.orientation = 'vertical';
        }
        this.silentSetExtent(new Point(this.height(), this.width()));
        this.setCenter(center);
        this.drawNew();
        this.changed();
    }
}