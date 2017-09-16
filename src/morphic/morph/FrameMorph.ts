// FrameMorph //////////////////////////////////////////////////////////

import Morph from "./Morph";

// I clip my submorphs at my bounds

export default class FrameMorph extends Morph {
    constructor(aScrollFrame) {
        this.init(aScrollFrame);
    }

    init(aScrollFrame) {
        this.scrollFrame = aScrollFrame || null;

        super.init.call(this);
        this.color = new Color(255, 250, 245);
        this.drawNew();
        this.acceptsDrops = true;

        if (this.scrollFrame) {
            this.isDraggable = false;
            this.noticesTransparentClick = false;
            this.alpha = 0;
        }
    }

    fullBounds() {
        const shadow = this.getShadow();
        if (shadow !== null) {
            return this.bounds.merge(shadow.bounds);
        }
        return this.bounds;
    }

    fullImage() {
        // use only for shadows
        return this.image;
    }

    fullDrawOn(aCanvas, aRect) {
        let rectangle;
        let dirty;
        if (!this.isVisible) {
            return null;
        }
        rectangle = aRect || this.fullBounds();
        dirty = this.bounds.intersect(rectangle);
        if (!dirty.extent().gt(new Point(0, 0))) {
            return null;
        }
        this.drawOn(aCanvas, dirty);
        this.children.forEach(child => {
            if (child instanceof ShadowMorph) {
                child.fullDrawOn(aCanvas, rectangle);
            } else {
                child.fullDrawOn(aCanvas, dirty);
            }
        });
    }

    // FrameMorph navigation:

    topMorphAt(point) {
        let i;
        let result;
        if (!(this.isVisible && this.bounds.containsPoint(point))) {
            return null;
        }
        for (i = this.children.length - 1; i >= 0; i -= 1) {
            result = this.children[i].topMorphAt(point);
            if (result) {return result; }
        }
        return this.noticesTransparentClick ||
            !this.isTransparentAt(point) ? this : null;
    }

    // FrameMorph scrolling support:

    submorphBounds() {
        let result = null;

        if (this.children.length > 0) {
            result = this.children[0].bounds;
            this.children.forEach(child => {
                result = result.merge(child.fullBounds());
            });
        }
        return result;
    }

    keepInScrollFrame() {
        if (this.scrollFrame === null) {
            return null;
        }
        if (this.left() > this.scrollFrame.left()) {
            this.moveBy(
                new Point(this.scrollFrame.left() - this.left(), 0)
            );
        }
        if (this.right() < this.scrollFrame.right()) {
            this.moveBy(
                new Point(this.scrollFrame.right() - this.right(), 0)
            );
        }
        if (this.top() > this.scrollFrame.top()) {
            this.moveBy(
                new Point(0, this.scrollFrame.top() - this.top())
            );
        }
        if (this.bottom() < this.scrollFrame.bottom()) {
            this.moveBy(
                0,
                new Point(this.scrollFrame.bottom() - this.bottom(), 0)
            );
        }
    }

    adjustBounds() {
        let subBounds;
        let newBounds;
        const myself = this;

        if (this.scrollFrame === null) {
            return null;
        }

        subBounds = this.submorphBounds();
        if (subBounds && (!this.scrollFrame.isTextLineWrapping)) {
            newBounds = subBounds
                .expandBy(this.scrollFrame.padding)
                .growBy(this.scrollFrame.growth)
                .merge(this.scrollFrame.bounds);
        } else {
            newBounds = this.scrollFrame.bounds.copy();
        }
        if (!this.bounds.eq(newBounds)) {
            this.bounds = newBounds;
            this.drawNew();
            this.keepInScrollFrame();
        }

        if (this.scrollFrame.isTextLineWrapping) {
            this.children.forEach(morph => {
                if (morph instanceof TextMorph) {
                    morph.setWidth(myself.width());
                    myself.setHeight(
                        Math.max(morph.height(), myself.scrollFrame.height())
                    );
                }
            });
        }

        this.scrollFrame.adjustScrollBars();
    }

    // FrameMorph dragging & dropping of contents:

    reactToDropOf() {
        this.adjustBounds();
    }

    reactToGrabOf() {
        this.adjustBounds();
    }

    // FrameMorph menus:

    developersMenu() {
        const menu = super.developersMenu.call(this);
        if (this.children.length > 0) {
            menu.addLine();
            menu.addItem(
                "move all inside...",
                'keepAllSubmorphsWithin',
                'keep all submorphs\nwithin and visible'
            );
        }
        return menu;
    }

    keepAllSubmorphsWithin() {
        const myself = this;
        this.children.forEach(m => {
            m.keepWithin(myself);
        });
    }
}