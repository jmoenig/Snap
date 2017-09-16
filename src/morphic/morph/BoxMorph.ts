// BoxMorph ////////////////////////////////////////////////////////////

// I can have an optionally rounded border

import Morph from "./Morph";

// BoxMorph instance creation:

export default class BoxMorph extends Morph {
    constructor(edge?, border?, borderColor?) {
        this.init(edge, border, borderColor);
    }

    init(edge, border, borderColor) {
        this.edge = edge || 4;
        this.border = border || ((border === 0) ? 0 : 2);
        this.borderColor = borderColor || new Color();
        super.init.call(this);
    }

    // BoxMorph drawing:

    drawNew() {
        let context;

        this.image = newCanvas(this.extent());
        context = this.image.getContext('2d');
        if ((this.edge === 0) && (this.border === 0)) {
            super.drawNew.call(this);
            return null;
        }
        context.fillStyle = this.color.toString();
        context.beginPath();
        this.outlinePath(
            context,
            Math.max(this.edge - this.border, 0),
            this.border
        );
        context.closePath();
        context.fill();
        if (this.border > 0) {
            context.lineWidth = this.border;
            context.strokeStyle = this.borderColor.toString();
            context.beginPath();
            this.outlinePath(context, this.edge, this.border / 2);
            context.closePath();
            context.stroke();
        }
    }

    outlinePath(context, radius, inset) {
        const offset = radius + inset;
        const w = this.width();
        const h = this.height();

        // top left:
        context.arc(
            offset,
            offset,
            radius,
            radians(-180),
            radians(-90),
            false
        );
        // top right:
        context.arc(
            w - offset,
            offset,
            radius,
            radians(-90),
            radians(-0),
            false
        );
        // bottom right:
        context.arc(
            w - offset,
            h - offset,
            radius,
            radians(0),
            radians(90),
            false
        );
        // bottom left:
        context.arc(
            offset,
            h - offset,
            radius,
            radians(90),
            radians(180),
            false
        );
    }

    // BoxMorph menus:

    developersMenu() {
        const menu = super.developersMenu.call(this);
        menu.addLine();
        menu.addItem(
            "border width...",
            function () {
                this.prompt(
                    `${menu.title}\nborder\nwidth:`,
                    this.setBorderWidth,
                    this,
                    this.border.toString(),
                    null,
                    0,
                    100,
                    true
                );
            },
            'set the border\'s\nline size'
        );
        menu.addItem(
            "border color...",
            function () {
                this.pickColor(
                    `${menu.title}\nborder color:`,
                    this.setBorderColor,
                    this,
                    this.borderColor
                );
            },
            'set the border\'s\nline color'
        );
        menu.addItem(
            "corner size...",
            function () {
                this.prompt(
                    `${menu.title}\ncorner\nsize:`,
                    this.setCornerSize,
                    this,
                    this.edge.toString(),
                    null,
                    0,
                    100,
                    true
                );
            },
            'set the corner\'s\nradius'
        );
        return menu;
    }

    setBorderWidth(size) {
        // for context menu demo purposes
        let newSize;
        if (typeof size === 'number') {
            this.border = Math.max(size, 0);
        } else {
            newSize = parseFloat(size);
            if (!isNaN(newSize)) {
                this.border = Math.max(newSize, 0);
            }
        }
        this.drawNew();
        this.changed();
    }

    setBorderColor(color) {
        // for context menu demo purposes
        if (color) {
            this.borderColor = color;
            this.drawNew();
            this.changed();
        }
    }

    setCornerSize(size) {
        // for context menu demo purposes
        let newSize;
        if (typeof size === 'number') {
            this.edge = Math.max(size, 0);
        } else {
            newSize = parseFloat(size);
            if (!isNaN(newSize)) {
                this.edge = Math.max(newSize, 0);
            }
        }
        this.drawNew();
        this.changed();
    }

    colorSetters() {
        // for context menu demo purposes
        return ['color', 'borderColor'];
    }

    numericalSetters() {
        // for context menu demo purposes
        const list = super.numericalSetters.call(this);
        list.push('setBorderWidth', 'setCornerSize');
        return list;
    }
}