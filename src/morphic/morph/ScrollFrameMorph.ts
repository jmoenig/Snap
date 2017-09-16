// ScrollFrameMorph ////////////////////////////////////////////////////

import FrameMorph from "./FrameMorph";

export default class ScrollFrameMorph extends FrameMorph {
    constructor(scroller, size, sliderColor) {
        this.init(scroller, size, sliderColor);
    }

    init(scroller, size, sliderColor) {
        const myself = this;

        super.init.call(this);
        this.scrollBarSize = size || MorphicPreferences.scrollBarSize;
        this.autoScrollTrigger = null;
        this.enableAutoScrolling = true; // change to suppress
        this.isScrollingByDragging = true; // change to suppress
        this.hasVelocity = true; // dto.
        this.padding = 0; // around the scrollable area
        this.growth = 0; // pixels or Point to grow right/left when near edge
        this.isTextLineWrapping = false;
        this.contents = scroller || new FrameMorph(this);
        this.add(this.contents);
        this.hBar = new SliderMorph(
            null, // start
            null, // stop
            null, // value
            null, // size
            'horizontal',
            sliderColor
        );
        this.hBar.setHeight(this.scrollBarSize);
        this.hBar.action = num => {
            myself.contents.setPosition(
                new Point(
                    myself.left() - num,
                    myself.contents.position().y
                )
            );
        };
        this.hBar.isDraggable = false;
        this.add(this.hBar);
        this.vBar = new SliderMorph(
            null, // start
            null, // stop
            null, // value
            null, // size
            'vertical',
            sliderColor
        );
        this.vBar.setWidth(this.scrollBarSize);
        this.vBar.action = num => {
            myself.contents.setPosition(
                new Point(
                    myself.contents.position().x,
                    myself.top() - num
                )
            );
        };
        this.vBar.isDraggable = false;
        this.add(this.vBar);
        this.toolBar = null; // optional slot
    }

    adjustScrollBars() {
        const hWidth = this.width() - this.scrollBarSize;
        const vHeight = this.height() - this.scrollBarSize;

        this.changed();
        if (this.contents.width() > this.width() +
                MorphicPreferences.scrollBarSize) {
            this.hBar.show();
            if (this.hBar.width() !== hWidth) {
                this.hBar.setWidth(hWidth);
            }

            this.hBar.setPosition(
                new Point(
                    this.left(),
                    this.bottom() - this.hBar.height()
                )
            );
            this.hBar.start = 0;
            this.hBar.stop = this.contents.width() - this.width();
            this.hBar.size =
                this.width() / this.contents.width() * this.hBar.stop;
            this.hBar.value = this.left() - this.contents.left();
            this.hBar.drawNew();
        } else {
            this.hBar.hide();
        }

        if (this.contents.height() > this.height() +
                this.scrollBarSize) {
            this.vBar.show();
            if (this.vBar.height() !== vHeight) {
                this.vBar.setHeight(vHeight);
            }

            this.vBar.setPosition(
                new Point(
                    this.right() - this.vBar.width(),
                    this.top()
                )
            );
            this.vBar.start = 0;
            this.vBar.stop = this.contents.height() - this.height();
            this.vBar.size =
                this.height() / this.contents.height() * this.vBar.stop;
            this.vBar.value = this.top() - this.contents.top();
            this.vBar.drawNew();
        } else {
            this.vBar.hide();
        }
        this.adjustToolBar();
    }

    adjustToolBar() {
        const padding = 3;
        if (this.toolBar) {
            this.toolBar.setTop(this.top() + padding);
            this.toolBar.setRight(
                (this.vBar.isVisible ? this.vBar.left() : this.right()) - padding
            );
        }
    }

    addContents(aMorph) {
        this.contents.add(aMorph);
        this.contents.adjustBounds();
    }

    setContents(aMorph) {
        this.contents.children.forEach(m => {
            m.destroy();
        });
        this.contents.children = [];
        aMorph.setPosition(this.position().add(this.padding + 2));
        this.addContents(aMorph);
    }

    setExtent(aPoint) {
        if (this.isTextLineWrapping) {
            this.contents.setPosition(this.position().copy());
        }
        super.setExtent.call(this, aPoint);
        this.contents.adjustBounds();
    }

    // ScrollFrameMorph scrolling by dragging:

    scrollX(steps) {
        const cl = this.contents.left();
        const l = this.left();
        const cw = this.contents.width();
        const r = this.right();
        let newX;

        newX = cl + steps;
        if (newX + cw < r) {
            newX = r - cw;
        }
        if (newX > l) {
            newX = l;
        }
        if (newX !== cl) {
            this.contents.setLeft(newX);
        }
    }

    scrollY(steps) {
        const ct = this.contents.top();
        const t = this.top();
        const ch = this.contents.height();
        const b = this.bottom();
        let newY;

        newY = ct + steps;
        if (newY + ch < b) {
            newY = b - ch;
        }
        if (newY > t) {
            newY = t;
        }
        if (newY !== ct) {
            this.contents.setTop(newY);
        }
    }

    mouseDownLeft(pos) {
        if (!this.isScrollingByDragging) {
            return null;
        }
        const world = this.root();
        const hand = world.hand;
        let oldPos = pos;
        const myself = this;
        let deltaX = 0;
        let deltaY = 0;
        const friction = 0.8;

        this.step = function () {
            let newPos;
            if (hand.mouseButton &&
                    (hand.children.length === 0) &&
                    (myself.bounds.containsPoint(hand.bounds.origin))) {

                if (hand.grabPosition &&
                    (hand.grabPosition.distanceTo(hand.position()) <=
                        MorphicPreferences.grabThreshold)) {
                    // still within the grab threshold
                    return null;
                }

                newPos = hand.bounds.origin;
                deltaX = newPos.x - oldPos.x;
                if (deltaX !== 0) {
                    myself.scrollX(deltaX);
                }
                deltaY = newPos.y - oldPos.y;
                if (deltaY !== 0) {
                    myself.scrollY(deltaY);
                }
                oldPos = newPos;
            } else {
                if (!myself.hasVelocity) {
                    myself.step = () => {
                        nop();
                    };
                } else {
                    if ((Math.abs(deltaX) < 0.5) &&
                            (Math.abs(deltaY) < 0.5)) {
                        myself.step = () => {
                            nop();
                        };
                    } else {
                        deltaX = deltaX * friction;
                        myself.scrollX(Math.round(deltaX));
                        deltaY = deltaY * friction;
                        myself.scrollY(Math.round(deltaY));
                    }
                }
            }
            this.adjustScrollBars();
        };
    }

    startAutoScrolling() {
        const myself = this;
        const inset = MorphicPreferences.scrollBarSize * 3;
        const world = this.world();
        let hand;
        let inner;
        let pos;

        if (!world) {
            return null;
        }
        hand = world.hand;
        if (!this.autoScrollTrigger) {
            this.autoScrollTrigger = Date.now();
        }
        this.step = () => {
            pos = hand.bounds.origin;
            inner = myself.bounds.insetBy(inset);
            if ((myself.bounds.containsPoint(pos)) &&
                    (!(inner.containsPoint(pos))) &&
                    (hand.children.length > 0)) {
                myself.autoScroll(pos);
            } else {
                myself.step = () => {
                    nop();
                };
                myself.autoScrollTrigger = null;
            }
        };
    }

    autoScroll(pos) {
        let inset;
        let area;

        if (Date.now() - this.autoScrollTrigger < 500) {
            return null;
        }

        inset = MorphicPreferences.scrollBarSize * 3;
        area = this.topLeft().extent(new Point(this.width(), inset));
        if (area.containsPoint(pos)) {
            this.scrollY(inset - (pos.y - this.top()));
        }
        area = this.topLeft().extent(new Point(inset, this.height()));
        if (area.containsPoint(pos)) {
            this.scrollX(inset - (pos.x - this.left()));
        }
        area = (new Point(this.right() - inset, this.top()))
            .extent(new Point(inset, this.height()));
        if (area.containsPoint(pos)) {
            this.scrollX(-(inset - (this.right() - pos.x)));
        }
        area = (new Point(this.left(), this.bottom() - inset))
            .extent(new Point(this.width(), inset));
        if (area.containsPoint(pos)) {
            this.scrollY(-(inset - (this.bottom() - pos.y)));
        }
        this.adjustScrollBars();
    }

    // ScrollFrameMorph scrolling by editing text:

    scrollCursorIntoView(morph) {
        const txt = morph.target;
        const offset = txt.position().subtract(this.contents.position());
        const ft = this.top() + this.padding;
        const fb = this.bottom() - this.padding;
        this.contents.setExtent(txt.extent().add(offset).add(this.padding));
        if (morph.top() < ft) {
            this.contents.setTop(this.contents.top() + ft - morph.top());
            morph.setTop(ft);
        } else if (morph.bottom() > fb) {
            this.contents.setBottom(this.contents.bottom() + fb - morph.bottom());
            morph.setBottom(fb);
        }
        this.adjustScrollBars();
    }

    // ScrollFrameMorph events:

    mouseScroll(y, x) {
        if (y) {
            this.scrollY(y * MorphicPreferences.mouseScrollAmount);
        }
        if (x) {
            this.scrollX(x * MorphicPreferences.mouseScrollAmount);
        }
        this.adjustScrollBars();
    }

    // ScrollFrameMorph duplicating:

    updateReferences(map) {
        const myself = this;
        super.updateReferences.call(this, map);
        if (this.hBar) {
            this.hBar.action = num => {
                myself.contents.setPosition(
                    new Point(myself.left() - num, myself.contents.position().y)
                );
            };
        }
        if (this.vBar) {
            this.vBar.action = num => {
                myself.contents.setPosition(
                    new Point(myself.contents.position().x, myself.top() - num)
                );
            };
        }
    }

    // ScrollFrameMorph menu:

    developersMenu() {
        const menu = super.developersMenu.call(this);
        if (this.isTextLineWrapping) {
            menu.addItem(
                "auto line wrap off...",
                'toggleTextLineWrapping',
                'turn automatic\nline wrapping\noff'
            );
        } else {
            menu.addItem(
                "auto line wrap on...",
                'toggleTextLineWrapping',
                'enable automatic\nline wrapping'
            );
        }
        return menu;
    }

    toggleTextLineWrapping() {
        this.isTextLineWrapping = !this.isTextLineWrapping;
    }
}

ScrollFrameMorph.prototype.step = nop;