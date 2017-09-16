// SliderMorph ///////////////////////////////////////////////////

import CircleBoxMorph from "./CircleBoxMorph";
import SliderButtonMorph from "./SliderButtonMorph";
import Point from "../Point";
import MenuMorph from "./MenuMorph";
import Node from "../Node";
import Morph from "./Morph";
import WorldMorph from "./WorldMorph";

export default class SliderMorph extends CircleBoxMorph {
    public target: Morph = null;
    public action: Function | string = null;
    public offset: Point = null;
    public button = new SliderButtonMorph();

    constructor(public start = 1, public stop = 100, public value = 50, public size = 10,
                orientation: "horizontal" | "vertical" = "vertical", color?: Color) {
        super(orientation);

        this.button.isDraggable = false;
        this.button.color = new Color(200, 200, 200);
        this.button.highlightColor = new Color(210, 210, 255);
        this.button.pressColor = new Color(180, 180, 255);
        this.add(this.button);
        this.alpha = 0.3;
        this.color = color || new Color(0, 0, 0);
        this.setExtent(new Point(20, 100));
        // this.drawNew();
    }

    rangeSize() {
        return this.stop - this.start;
    }

    ratio() {
        return this.size / (this.rangeSize() + 1);
    }

    unitSize() {
        if (this.orientation === 'vertical') {
            return (this.height() - this.button.height()) /
                this.rangeSize();
        }
        return (this.width() - this.button.width()) /
            this.rangeSize();
    }

    drawNew() {
        let bw;
        let bh;
        let posX;
        let posY;

        super.drawNew.call(this);
        this.button.orientation = this.orientation;
        if (this.orientation === 'vertical') {
            bw  = this.width() - 2;
            bh = Math.max(bw, Math.round(this.height() * this.ratio()));
            this.button.silentSetExtent(new Point(bw, bh));
            posX = 1;
            posY = Math.min(
                Math.round((this.value - this.start) * this.unitSize()),
                this.height() - this.button.height()
            );
        } else {
            bh = this.height() - 2;
            bw  = Math.max(bh, Math.round(this.width() * this.ratio()));
            this.button.silentSetExtent(new Point(bw, bh));
            posY = 1;
            posX = Math.min(
                Math.round((this.value - this.start) * this.unitSize()),
                this.width() - this.button.width()
            );
        }
        this.button.setPosition(
            new Point(posX, posY).add(this.bounds.origin)
        );
        this.button.drawNew();
        this.button.changed();
    }

    updateValue() {
        let relPos;
        if (this.orientation === 'vertical') {
            relPos = this.button.top() - this.top();
        } else {
            relPos = this.button.left() - this.left();
        }
        this.value = Math.round(relPos / this.unitSize() + this.start);
        this.updateTarget();
    }

    updateTarget() {
        if (this.action) {
            if (typeof this.action === 'function') {
                this.action.call(this.target, this.value);
            } else { // assume it's a String
                (<any> this.target)[this.action](this.value);
            }
        }
    }

    // SliderMorph menu:

    developersMenu() {
        const menu = super.developersMenu.call(this);
        menu.addItem(
            "show value...",
            'showValue',
            'display a dialog box\nshowing the selected number'
        );
        menu.addItem(
            "floor...",
            function () {
                this.prompt(
                    `${menu.title}\nfloor:`,
                    this.setStart,
                    this,
                    this.start.toString(),
                    null,
                    0,
                    this.stop - this.size,
                    true
                );
            },
            'set the minimum value\nwhich can be selected'
        );
        menu.addItem(
            "ceiling...",
            function () {
                this.prompt(
                    `${menu.title}\nceiling:`,
                    this.setStop,
                    this,
                    this.stop.toString(),
                    null,
                    this.start + this.size,
                    this.size * 100,
                    true
                );
            },
            'set the maximum value\nwhich can be selected'
        );
        menu.addItem(
            "button size...",
            function () {
                this.prompt(
                    `${menu.title}\nbutton size:`,
                    this.setSize,
                    this,
                    this.size.toString(),
                    null,
                    1,
                    this.stop - this.start,
                    true
                );
            },
            'set the range\ncovered by\nthe slider button'
        );
        menu.addLine();
        menu.addItem(
            'set target',
            "setTarget",
            'select another morph\nwhose numerical property\nwill be ' +
                'controlled by this one'
        );
        return menu;
    }

    showValue() {
        this.inform(this.value.toString());
    }

    userSetStart(num: number) {
        // for context menu demo purposes
        this.start = Math.max(num, this.stop);
    }

    setStart(num: number | string, noUpdate?: boolean) {
        // for context menu demo purposes
        let newStart;
        if (typeof num === 'number') {
            this.start = Math.min(
                num,
                this.stop - this.size
            );
        } else {
            newStart = parseFloat(num);
            if (!isNaN(newStart)) {
                this.start = Math.min(
                    newStart,
                    this.stop - this.size
                );
            }
        }
        this.value = Math.max(this.value, this.start);
        if (!noUpdate) {this.updateTarget(); }
        this.drawNew();
        this.changed();
    }

    setStop(num: number | string, noUpdate?: boolean) {
        // for context menu demo purposes
        let newStop;
        if (typeof num === 'number') {
            this.stop = Math.max(num, this.start + this.size);
        } else {
            newStop = parseFloat(num);
            if (!isNaN(newStop)) {
                this.stop = Math.max(newStop, this.start + this.size);
            }
        }
        this.value = Math.min(this.value, this.stop);
        if (!noUpdate) {this.updateTarget(); }
        this.drawNew();
        this.changed();
    }

    setSize(num: number | string, noUpdate?: boolean) {
        // for context menu demo purposes
        let newSize;
        if (typeof num === 'number') {
            this.size = Math.min(
                Math.max(num, 1),
                this.stop - this.start
            );
        } else {
            newSize = parseFloat(num);
            if (!isNaN(newSize)) {
                this.size = Math.min(
                    Math.max(newSize, 1),
                    this.stop - this.start
                );
            }
        }
        this.value = Math.min(this.value, this.stop - this.size);
        if (!noUpdate) {this.updateTarget(); }
        this.drawNew();
        this.changed();
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
        const choices = this.target.numericalSetters();
        const menu = new MenuMorph(this, 'choose target property:');
        const myself = this;

        choices.forEach(each => {
            menu.addItem(each, () => {
                myself.action = each;
            });
        });
        if (choices.length === 1) {
            this.action = choices[0];
        } else if (choices.length > 0) {
            menu.popUpAtHand(this.world());
        }
    }

    numericalSetters() {
        // for context menu demo purposes
        const list = super.numericalSetters.call(this);
        list.push('setStart', 'setStop', 'setSize');
        return list;
    }

    mouseDownLeft(pos: Point) {
        const myself = this;

        if (!this.button.bounds.containsPoint(pos)) {
            this.offset = new Point(); // return null;
        } else {
            this.offset = pos.subtract(this.button.bounds.origin);
        }
        const world = <WorldMorph> this.root();
        this.step = function () {
            let mousePos;
            let newX;
            let newY;
            if (world.hand.mouseButton) {
                mousePos = world.hand.bounds.origin;
                if (myself.orientation === 'vertical') {
                    newX = myself.button.bounds.origin.x;
                    newY = Math.max(
                        Math.min(
                            mousePos.y - myself.offset.y,
                            myself.bottom() - myself.button.height()
                        ),
                        myself.top()
                    );
                } else {
                    newY = myself.button.bounds.origin.y;
                    newX = Math.max(
                        Math.min(
                            mousePos.x - myself.offset.x,
                            myself.right() - myself.button.width()
                        ),
                        myself.left()
                    );
                }
                myself.button.setPosition(new Point(newX, newY));
                myself.updateValue();
            } else {
                this.step = null;
            }
        };
    }


    autoOrientation() {
        // nop
    }
}

// SliderMorph stepping:

SliderMorph.prototype.step = null;