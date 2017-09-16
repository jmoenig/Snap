// ColorPaletteMorph ///////////////////////////////////////////////////

import Morph from "./Morph";

// ColorPaletteMorph inherits from Morph:

// ColorPaletteMorph instance creation:

export default class ColorPaletteMorph extends Morph {
    constructor(target, sizePoint) {
        this.init(
            target || null,
            sizePoint || new Point(80, 50)
        );
    }

    init(target, size) {
        super.init.call(this);
        this.target = target;
        this.targetSetter = 'color';
        this.silentSetExtent(size);
        this.choice = null;
        this.drawNew();
    }

    drawNew() {
        let context;
        let ext;
        let x;
        let y;
        let h;
        let l;

        ext = this.extent();
        this.image = newCanvas(this.extent());
        context = this.image.getContext('2d');
        this.choice = new Color();
        for (x = 0; x <= ext.x; x += 1) {
            h = 360 * x / ext.x;
            for (y = 0; y <= ext.y; y += 1) {
                l = 100 - (y / ext.y * 100);
                context.fillStyle = `hsl(${h},100%,${l}%)`;
                context.fillRect(x, y, 1, 1);
            }
        }
    }

    mouseMove(pos) {
        this.choice = this.getPixelColor(pos);
        this.updateTarget();
    }

    mouseDownLeft(pos) {
        this.choice = this.getPixelColor(pos);
        this.updateTarget();
    }

    updateTarget() {
        if (this.target instanceof Morph && this.choice !== null) {
            if (this.target[this.targetSetter] instanceof Function) {
                this.target[this.targetSetter](this.choice);
            } else {
                this.target[this.targetSetter] = this.choice;
                this.target.drawNew();
                this.target.changed();
            }
        }
    }

    // ColorPaletteMorph menu:

    developersMenu() {
        const menu = super.developersMenu.call(this);
        menu.addLine();
        menu.addItem(
            'set target',
            "setTarget",
            'choose another morph\nwhose color property\n will be' +
                ' controlled by this one'
        );
        return menu;
    }

    setTarget() {
        const choices = this.overlappedMorphs();
        const menu = new MenuMorph(this, 'choose target:');
        const myself = this;

        choices.push(this.world());
        choices.forEach(each => {
            menu.addItem(each.toString().slice(0, 50), () => {
                myself.target = each;
                myself.setTargetSetter();
            });
        });
        if (choices.length === 1) {
            this.target = choices[0];
            this.setTargetSetter();
        } else if (choices.length > 0) {
            menu.popUpAtHand(this.world());
        }
    }

    setTargetSetter() {
        const choices = this.target.colorSetters();
        const menu = new MenuMorph(this, 'choose target property:');
        const myself = this;

        choices.forEach(each => {
            menu.addItem(each, () => {
                myself.targetSetter = each;
            });
        });
        if (choices.length === 1) {
            this.targetSetter = choices[0];
        } else if (choices.length > 0) {
            menu.popUpAtHand(this.world());
        }
    }
}