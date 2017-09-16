// ListWatcherMorph ////////////////////////////////////////////////////

/*
    I am a little window which observes a list and continuously
    updates itself accordingly
*/

// ListWatcherMorph default settings

ListWatcherMorph.prototype.cellColor =
    SpriteMorph.prototype.blockColor.lists;

// ListWatcherMorph instance creation:

class ListWatcherMorph extends BoxMorph {
    constructor(list, parentCell) {
        this.init(list, parentCell);
    }

    init(list, parentCell) {
        const myself = this;

        this.list = list || new List();
        this.start = 1;
        this.range = 100;
        this.lastUpdated = Date.now();
        this.lastCell = null;
        this.parentCell = parentCell || null; // for circularity detection

        // elements declarations
        this.label = new StringMorph(
            localize('length: ') + this.list.length(),
            SyntaxElementMorph.prototype.fontSize,
            null,
            false,
            false,
            false,
            MorphicPreferences.isFlat ? new Point() : new Point(1, 1),
            new Color(255, 255, 255)
        );
        this.label.mouseClickLeft = () => {myself.startIndexMenu(); };


        this.frame = new ScrollFrameMorph(null, 10);
        this.frame.alpha = 0;
        this.frame.acceptsDrops = false;
        this.frame.contents.acceptsDrops = false;

        this.handle = new HandleMorph(
            this,
            80,
            70,
            3,
            3
        );
        this.handle.setExtent(new Point(13, 13));

        this.arrow = new ArrowMorph(
            'down',
            SyntaxElementMorph.prototype.fontSize
        );
        this.arrow.mouseClickLeft = () => {myself.startIndexMenu(); };
        this.arrow.setRight(this.handle.right());
        this.arrow.setBottom(this.handle.top());
        this.handle.add(this.arrow);

        this.plusButton = new PushButtonMorph(
            this.list,
            'add',
            '+'
        );
        this.plusButton.padding = 0;
        this.plusButton.edge = 0;
        this.plusButton.outlineColor = this.color;
        this.plusButton.drawNew();
        this.plusButton.fixLayout();

        super.init.call(
            this,
            SyntaxElementMorph.prototype.rounding,
            1.000001, // shadow bug in Chrome,
            new Color(120, 120, 120)
        );

        this.color = new Color(220, 220, 220);
        this.isDraggable = false;
        this.setExtent(new Point(80, 70).multiplyBy(
            SyntaxElementMorph.prototype.scale
        ));
        this.add(this.label);
        this.add(this.frame);
        this.add(this.plusButton);
        this.add(this.handle);
        this.handle.drawNew();
        this.update();
        this.fixLayout();
    }

    // ListWatcherMorph updating:

    update(anyway) {
        let i;
        let idx;
        let ceil;
        let morphs;
        let cell;
        let cnts;
        let label;
        let button;
        let max;
        let starttime;
        const maxtime = 1000;

        this.frame.contents.children.forEach(m => {
            if (m instanceof CellMorph) {
                if (m.contentsMorph instanceof ListWatcherMorph) {
                    m.contentsMorph.update();
                } else if (isSnapObject(m.contents)) {
                    m.update();
                }
            }
        });

        if (this.lastUpdated === this.list.lastChanged && !anyway) {
            return null;
        }

        this.updateLength(true);

        // adjust start index to current list length
        this.start = Math.max(
            Math.min(
                this.start,
                Math.floor((this.list.length() - 1) / this.range)
                    * this.range + 1
            ),
            1
        );

        // refresh existing cells
        // highest index shown:
        max = Math.min(
            this.start + this.range - 1,
            this.list.length()
        );

        // number of morphs available for refreshing
        ceil = Math.min(
            (max - this.start + 1) * 3,
            this.frame.contents.children.length
        );

        for (i = 0; i < ceil; i += 3) {
            idx = this.start + (i / 3);

            cell = this.frame.contents.children[i];
            label = this.frame.contents.children[i + 1];
            button = this.frame.contents.children[i + 2];
            cnts = this.list.at(idx);

            if (cell.contents !== cnts) {
                cell.contents = cnts;
                cell.drawNew();
                if (this.lastCell) {
                    cell.setLeft(this.lastCell.left());
                }
            }
            this.lastCell = cell;

            if (label.text !== idx.toString()) {
                label.text = idx.toString();
                label.drawNew();
            }

            button.action = idx;
        }

        // remove excess cells
        // number of morphs to be shown
        morphs = (max - this.start + 1) * 3;

        while (this.frame.contents.children.length > morphs) {
            this.frame.contents.children[morphs].destroy();
        }

        // add additional cells
        ceil = morphs; //max * 3;
        i = this.frame.contents.children.length;

        starttime = Date.now();
        if (ceil > i + 1) {
            for (i; i < ceil; i += 3) {
                if (Date.now() - starttime > maxtime) {
                    this.fixLayout();
                    this.frame.contents.adjustBounds();
                    this.frame.contents.setLeft(this.frame.left());
                    return null;
                }
                idx = this.start + (i / 3);
                label = new StringMorph(
                    idx.toString(),
                    SyntaxElementMorph.prototype.fontSize,
                    null,
                    false,
                    false,
                    false,
                    MorphicPreferences.isFlat ? new Point() : new Point(1, 1),
                    new Color(255, 255, 255)
                );
                cell = new CellMorph(
                    this.list.at(idx),
                    this.cellColor,
                    idx,
                    this.parentCell
                );
                button = new PushButtonMorph(
                    this.list.remove,
                    idx,
                    '-',
                    this.list
                );
                button.padding = 1;
                button.edge = 0;
                button.corner = 1;
                button.outlineColor = this.color.darker();
                button.drawNew();
                button.fixLayout();

                this.frame.contents.add(cell);
                if (this.lastCell) {
                    cell.setPosition(this.lastCell.bottomLeft());
                } else {
                    cell.setTop(this.frame.contents.top());
                }
                this.lastCell = cell;
                label.setCenter(cell.center());
                label.setRight(cell.left() - 2);
                this.frame.contents.add(label);
                this.frame.contents.add(button);
            }
        }
        this.lastCell = null;

        this.fixLayout();
        this.frame.contents.adjustBounds();
        this.frame.contents.setLeft(this.frame.left());
        this.updateLength();
        this.lastUpdated = this.list.lastChanged;
    }

    updateLength(notDone) {
        this.label.text = localize('length: ') + this.list.length();
        if (notDone) {
            this.label.color = new Color(0, 0, 100);
        } else {
            this.label.color = new Color(0, 0, 0);
        }
        this.label.drawNew();
        this.label.setCenter(this.center());
        this.label.setBottom(this.bottom() - 3);
    }

    startIndexMenu() {
        let i;
        let range;
        const myself = this;
        const items = Math.ceil(this.list.length() / this.range);

        const menu = new MenuMorph(
            idx => {myself.setStartIndex(idx); },
            null,
            myself
        );

        menu.addItem('1...', 1);
        for (i = 1; i < items; i += 1) {
            range = i * 100 + 1;
            menu.addItem(`${range}...`, range);
        }
        menu.popUpAtHand(this.world());
    }

    setStartIndex(index) {
        this.start = index;
        this.list.changed();
    }

    fixLayout() {
        if (!this.label) {return; }
        Morph.prototype.trackChanges = false;
        if (this.frame) {
            this.arrangeCells();
            this.frame.silentSetPosition(this.position().add(3));
            this.frame.bounds.corner = this.bounds.corner.subtract(new Point(
                3,
                17
            ));
            this.frame.drawNew();
            this.frame.contents.adjustBounds();
        }

        this.label.setCenter(this.center());
        this.label.setBottom(this.bottom() - 3);
        this.plusButton.setLeft(this.left() + 3);
        this.plusButton.setBottom(this.bottom() - 3);

        Morph.prototype.trackChanges = true;
        this.changed();

        if (this.parent && this.parent.fixLayout) {
            this.parent.fixLayout();
        }
    }

    arrangeCells() {
        let i;
        let cell;
        let label;
        let button;
        let lastCell;
        const end = this.frame.contents.children.length;
        for (i = 0; i < end; i += 3) {
            cell = this.frame.contents.children[i];
            label = this.frame.contents.children[i + 1];
            button = this.frame.contents.children[i + 2];
            if (lastCell) {
                cell.setTop(lastCell.bottom());
            }
            if (label) {
                label.setTop(cell.center().y - label.height() / 2);
                label.setRight(cell.left() - 2);
            }
            if (button) {
                button.setCenter(cell.center());
                button.setLeft(cell.right() + 2);
            }
            lastCell = cell;
        }
        this.frame.contents.adjustBounds();
    }

    expand(maxExtent) {
        // make sure to show all (first 100) cells
        const fe = this.frame.contents.extent();

        let ext = new Point(fe.x + 6, fe.y + this.label.height() + 6);
        if (maxExtent) {
            ext = ext.min(maxExtent);
        }
        this.setExtent(ext);
        this.handle.setRight(this.right() - 3);
        this.handle.setBottom(this.bottom() - 3);
    }

    // ListWatcherMorph context menu

    userMenu() {
        if (!List.prototype.enableTables) {
            return this.escalateEvent('userMenu');
        }
        const menu = new MenuMorph(this);
        const myself = this;
        menu.addItem('table view...', 'showTableView');
        menu.addLine();
        menu.addItem(
            'open in dialog...',
            () => {
                new TableDialogMorph(myself.list).popUp(myself.world());
            }
        );
        return menu;
    }

    showTableView() {
        const view = this.parentThatIsAnyOf([
            SpriteBubbleMorph,
            SpeechBubbleMorph,
            CellMorph
        ]);
        if (!view) {return; }
        if (view instanceof SpriteBubbleMorph) {
            view.changed();
            view.drawNew(true);
        } else if (view instanceof SpeechBubbleMorph) {
            view.contents = new TableFrameMorph(new TableMorph(this.list, 10));
            view.contents.expand(this.extent());
            view.drawNew(true);
        } else { // watcher cell
            view.drawNew(true, 'table');
            view.contentsMorph.expand(this.extent());
        }
        view.fixLayout();
    }

    // ListWatcherMorph events:

    mouseDoubleClick(pos) {
        if (List.prototype.enableTables) {
            new TableDialogMorph(this.list).popUp(this.world());
        } else {
            this.escalateEvent('mouseDoubleClick', pos);
        }
    }

    // ListWatcherMorph hiding/showing:

    show() {
        super.show.call(this);
        this.frame.contents.adjustBounds();
    }

    // ListWatcherMorph drawing:

    drawNew() {
        WatcherMorph.prototype.drawNew.call(this);
        this.fixLayout();
    }
}