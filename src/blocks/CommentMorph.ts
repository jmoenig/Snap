// CommentMorph //////////////////////////////////////////////////////////

/*
    I am an editable, multi-line non-scrolling text window. I can be collapsed
    to a single abbreviated line or expanded to full. My width can be adjusted
    by the user, by height is determined by the size of my text body. I can be
    either placed in a scripting area or "stuck" to a block.
*/

import BoxMorph from "./BoxMorph"; // TODO

// CommentMorph preferences settings (pseudo-inherited from SyntaxElement):

CommentMorph.prototype.refreshScale = () => {
    CommentMorph.prototype.fontSize = SyntaxElementMorph.prototype.fontSize;
    CommentMorph.prototype.padding = 5 * SyntaxElementMorph.prototype.scale;
    CommentMorph.prototype.rounding = 8 * SyntaxElementMorph.prototype.scale;
};

CommentMorph.prototype.refreshScale();

// CommentMorph instance creation:

class CommentMorph extends BoxMorph {
    constructor(contents) {
        this.init(contents);
    }

    init(contents) {
        const myself = this;
        const scale = SyntaxElementMorph.prototype.scale;
        this.block = null; // optional anchor block
        this.stickyOffset = null; // not to be persisted
        this.isCollapsed = false;
        this.titleBar = new BoxMorph(
            this.rounding,
            1.000001 * scale, // shadow bug in Chrome,
            new Color(255, 255, 180)
        );
        this.titleBar.color = new Color(255, 255, 180);
        this.titleBar.setHeight(fontHeight(this.fontSize) + this.padding);
        this.title = null;
        this.arrow = new ArrowMorph(
            'down',
            this.fontSize
        );
        this.arrow.noticesTransparentClick = true;
        this.arrow.mouseClickLeft = () => {myself.toggleExpand(); };
        this.contents = new TextMorph(
            contents || localize('add comment here...'),
            this.fontSize
        );
        this.contents.isEditable = true;
        this.contents.enableSelecting();
        this.contents.maxWidth = 90 * scale;
        this.contents.drawNew();
        this.handle = new HandleMorph(
            this.contents,
            80,
            this.fontSize * 2,
            -2,
            -2
        );
        this.handle.setExtent(new Point(11 * scale, 11 * scale));
        this.anchor = null;

        super.init.call(
            this,
            this.rounding,
            1.000001 * scale, // shadow bug in Chrome,
            new Color(255, 255, 180)
        );
        this.color = new Color(255, 255, 220);
        this.isDraggable = true;
        this.add(this.titleBar);
        this.add(this.arrow);
        this.add(this.contents);
        this.add(this.handle);

        this.fixLayout();
    }

    // CommentMorph ops:

    fullCopy() {
        const cpy = new CommentMorph(this.contents.text);
        cpy.isCollapsed = this.isCollapsed;
        cpy.setTextWidth(this.textWidth());
        if (this.selectionID) { // for copy on write
            cpy.selectionID = true;
        }
        return cpy;
    }

    setTextWidth(pixels) {
        this.contents.maxWidth = pixels;
        this.contents.drawNew();
        this.fixLayout();
    }

    textWidth() {
        return this.contents.maxWidth;
    }

    text() {
        return this.contents.text;
    }

    toggleExpand() {
        this.isCollapsed = !this.isCollapsed;
        this.fixLayout();
        this.align();
    }

    // CommentMorph layout:

    layoutChanged() {
        // react to a change of the contents area
        this.fixLayout();
        this.align();
    }

    fixLayout() {
        let label;
        const tw = this.contents.width() + 2 * this.padding;
        const myself = this;
        const oldFlag = Morph.prototype.trackChanges;

        Morph.prototype.trackChanges = false;

        if (this.title) {
            this.title.destroy();
            this.title = null;
        }
        if (this.isCollapsed) {
            this.contents.hide();
            this.title = new FrameMorph();
            this.title.alpha = 0;
            this.title.acceptsDrops = false;
            label = new StringMorph(
                this.contents.text,
                this.fontSize,
                null, // style (sans-serif)
                true // bold
            );
            label.rootForGrab = () => myself;
            this.title.add(label);
            this.title.setHeight(label.height());
            this.title.setWidth(
                tw - this.arrow.width() - this.padding * 2 - this.rounding
            );
            this.add(this.title);
        } else {
            this.contents.show();
        }
        this.titleBar.setWidth(tw);
        this.contents.setLeft(this.titleBar.left() + this.padding);
        this.contents.setTop(this.titleBar.bottom() + this.padding);
        this.arrow.direction = this.isCollapsed ? 'right' : 'down';
        this.arrow.drawNew();
        this.arrow.setCenter(this.titleBar.center());
        this.arrow.setLeft(this.titleBar.left() + this.padding);
        if (this.title) {
            this.title.setPosition(
                this.arrow.topRight().add(new Point(this.padding, 0))
            );
        }
        Morph.prototype.trackChanges = oldFlag;
        this.changed();
        this.silentSetHeight(
            this.titleBar.height()
                + (this.isCollapsed ? 0 :
                        this.padding
                            + this.contents.height()
                            + this.padding)
        );
        this.silentSetWidth(this.titleBar.width());
        this.drawNew();
        this.handle.drawNew();
        this.changed();
    }

    // CommentMorph menu:

    userMenu() {
        const menu = new MenuMorph(this);
        const myself = this;

        menu.addItem(
            "duplicate",
            () => {
                myself.fullCopy().pickUp(myself.world());
            },
            'make a copy\nand pick it up'
        );
        menu.addItem("delete", 'userDestroy');
        menu.addItem(
            "comment pic...",
            () => {
                const ide = myself.parentThatIsA(IDE_Morph);
                ide.saveCanvasAs(
                    myself.fullImageClassic(),
                    `${ide.projetName || localize('untitled')} ${localize('comment pic')}`,
                    false // request new window
                );
            },
            'open a new window\nwith a picture of this comment'
        );
        return menu;
    }

    userDestroy() {
        this.selectForEdit().destroy(); // enable copy-on-edit
    }

    // CommentMorph hiding and showing:

    /*
        override the inherited behavior to recursively hide/show all
        children, so that my instances get restored correctly when
        switching back out of app mode.
    */

    hide() {
        this.isVisible = false;
        this.changed();
    }

    show() {
        this.isVisible = true;
        this.changed();
    }

    // CommentMorph dragging & dropping

    prepareToBeGrabbed(hand) {
        // disassociate from the block I'm posted to
        if (this.block) {
            this.block.comment = null;
            this.block = null;
        }
        if (this.anchor) {
            this.anchor.destroy();
            this.anchor = null;
            // fix shadow, because it was added earlier
            this.removeShadow();
            this.addShadow();
        }
    }

    snap(hand) {
        // passing the hand is optional (for when blocks are dragged & dropped)
        const scripts = this.parent;

        let target;

        if (!(scripts instanceof ScriptsMorph)) {
            return null;
        }
        scripts.clearDropInfo();
        target = scripts.closestBlock(this, hand);
        if (target !== null) {
            target.comment = this;
            this.block = target;
            if (this.snapSound) {
                this.snapSound.play();
            }
            scripts.lastDropTarget = {element: target};
        }
        this.align();
        scripts.lastDroppedBlock = this;
        if (hand) {
            scripts.recordDrop(hand.grabOrigin);
        }
    }

    // CommentMorph sticking to blocks

    align(topBlock, ignoreLayer) {
        if (this.block) {
            const top = topBlock || this.block.topBlock();
            let affectedBlocks;
            let tp;
            let bottom;
            let rightMost;
            const scripts = top.parentThatIsA(ScriptsMorph);
            this.setTop(this.block.top() + this.block.corner);
            tp = this.top();
            bottom = this.bottom();
            affectedBlocks = top.allChildren().filter(child => child instanceof BlockMorph &&
                child.bottom() > tp &&
                child.top() < bottom);
            rightMost = Math.max.apply(
                null,
                affectedBlocks.map(block => block.right())
            );

            this.setLeft(rightMost + 5);
            if (!ignoreLayer && scripts) {
                scripts.addBack(this); // push to back and show
            }

            if (!this.anchor) {
                this.anchor = new Morph();
                this.anchor.color = this.titleBar.color;
            }
            this.anchor.silentSetPosition(new Point(
                this.block.right(),
                this.top() + this.edge
            ));
            this.anchor.bounds.corner = new Point(
                this.left(),
                this.top() + this.edge + 1
            );
            this.anchor.drawNew();
            this.addBack(this.anchor);
            this.anchor.changed();
        }
    }

    startFollowing(topBlock, world) {
        this.align(topBlock);
        world.add(this);
        this.addShadow();
        this.stickyOffset = this.position().subtract(this.block.position());
        this.step = function () {
            if (!this.block) { // kludge - only needed for "redo"
                this.stopFollowing();
                return;
            }
            this.setPosition(this.block.position().add(this.stickyOffset));
        };
    }

    stopFollowing() {
        this.removeShadow();
        delete this.step;
    }

    destroy() {
        if (this.block) {
            this.block.comment = null;
        }
        super.destroy.call(this);
    }

    stackHeight() {
        return this.height();
    }
}

CommentMorph.prototype.selectForEdit =
    SyntaxElementMorph.prototype.selectForEdit;