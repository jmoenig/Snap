// MenuMorph ///////////////////////////////////////////////////////////

import BoxMorph from "./BoxMorph";
import MenuItemMorph from "./MenuItemMorph";

// MenuMorph: referenced constructors

// MenuMorph instance creation:

export default class MenuMorph extends BoxMorph {
    constructor(target, title, environment?, fontSize?) {
        this.init(target, title, environment, fontSize);

        /*
        if target is a function, use it as callback:
        execute target as callback function with the action property
        of the triggered MenuItem as argument.
        Use the environment, if it is specified.
        Note: if action is also a function, instead of becoming
        the argument itself it will be called to answer the argument.
        For selections, Yes/No Choices etc.

        else (if target is not a function):

            if action is a function:
            execute the action with target as environment (can be null)
            for lambdafied (inline) actions

            else if action is a String:
            treat it as function property of target and execute it
            for selector-like actions
        */
    }

    init(target, title, environment, fontSize) {
        // additional properties:
        this.target = target;
        this.title = title || null;
        this.environment = environment || null;
        this.fontSize = fontSize || null;
        this.items = [];
        this.label = null;
        this.world = null;
        this.isListContents = false;
        this.hasFocus = false;
        this.selection = null;
        this.submenu = null;

        // initialize inherited properties:
        super.init.call(this);

        // override inherited properties:
        this.isDraggable = false;

        // immutable properties:
        this.border = null;
        this.edge = null;
    }

    addItem(
        labelString,
        action?,
        hint?,
        color?,
        // bool
        bold?,
        // bool
        italic?,
        // optional, when used as list contents
        doubleClickAction?,
        // optional string, icon (Morph or Canvas) or tuple [icon, string]
        shortcut?) {
        /*
        labelString is normally a single-line string. But it can also be one
        of the following:

            * a multi-line string (containing line breaks)
            * an icon (either a Morph or a Canvas)
            * a tuple of format: [icon, string]
        */
        this.items.push([
            localize(labelString || 'close'),
            action || nop,
            hint,
            color,
            bold || false,
            italic || false,
            doubleClickAction,
            shortcut]);
    }

    addMenu(label, aMenu, indicator?) {
        this.addPair(label, aMenu, isNil(indicator) ? '\u25ba' : indicator);
    }

    addPair(label, action, shortcut, hint) {
        this.addItem(label, action, hint, null, null, null, null, shortcut);
    }

    addLine(width = 1) {
        this.items.push([0, width]);
    }

    createLabel() {
        let text;
        if (this.label !== null) {
            this.label.destroy();
        }
        text = new TextMorph(
            localize(this.title),
            this.fontSize || MorphicPreferences.menuFontSize,
            MorphicPreferences.menuFontName,
            true,
            false,
            'center'
        );
        text.alignment = 'center';
        text.color = new Color(255, 255, 255);
        text.backgroundColor = this.borderColor;
        text.drawNew();
        this.label = new BoxMorph(3, 0);
        if (MorphicPreferences.isFlat) {
            this.label.edge = 0;
        }
        this.label.color = this.borderColor;
        this.label.borderColor = this.borderColor;
        this.label.setExtent(text.extent().add(4));
        this.label.drawNew();
        this.label.add(text);
        this.label.text = text;
    }

    drawNew() {
        const myself = this;
        let item;
        let fb;
        let x;
        let y;
        let isLine = false;

        this.children.forEach(m => {
            m.destroy();
        });
        this.children = [];
        if (!this.isListContents) {
            this.edge = MorphicPreferences.isFlat ? 0 : 5;
            this.border = MorphicPreferences.isFlat ? 1 : 2;
        }
        this.color = new Color(255, 255, 255);
        this.borderColor = new Color(60, 60, 60);
        this.silentSetExtent(new Point(0, 0));

        y = 2;
        x = this.left() + 4;
        if (!this.isListContents) {
            if (this.title) {
                this.createLabel();
                this.label.setPosition(this.bounds.origin.add(4));
                this.add(this.label);
                y = this.label.bottom();
            } else {
                y = this.top() + 4;
            }
        }
        y += 1;
        this.items.forEach(tuple => {
            isLine = false;
            if (tuple instanceof StringFieldMorph ||
                    tuple instanceof ColorPickerMorph ||
                    tuple instanceof SliderMorph) {
                item = tuple;
            } else if (tuple[0] === 0) {
                isLine = true;
                item = new Morph();
                item.color = myself.borderColor;
                item.setHeight(tuple[1]);
            } else {
                item = new MenuItemMorph(
                    myself.target,
                    tuple[1],
                    tuple[0],
                    myself.fontSize || MorphicPreferences.menuFontSize,
                    MorphicPreferences.menuFontName,
                    myself.environment,
                    tuple[2], // bubble help hint
                    tuple[3], // color
                    tuple[4], // bold
                    tuple[5], // italic
                    tuple[6], // doubleclick action
                    tuple[7] // shortcut
                );
            }
            if (isLine) {
                y += 1;
            }
            item.setPosition(new Point(x, y));
            myself.add(item);
            y = y + item.height();
            if (isLine) {
                y += 1;
            }
        });

        fb = this.fullBounds();
        this.silentSetExtent(fb.extent().add(4));
        this.adjustWidths();
        super.drawNew.call(this);
    }

    maxWidth() {
        let w = 0;

        if (this.parent instanceof FrameMorph) {
            if (this.parent.scrollFrame instanceof ScrollFrameMorph) {
                w = this.parent.scrollFrame.width();
            }
        }
        this.children.forEach(item => {
            if (item instanceof MenuItemMorph) {
                w = Math.max(
                    w,
                    item.label.width() + 8 +
                        (item.shortcut ? item.shortcut.width() + 4 : 0)
                );
            } else if ((item instanceof StringFieldMorph) ||
                    (item instanceof ColorPickerMorph) ||
                    (item instanceof SliderMorph)) {
                w = Math.max(w, item.width());
            }
        });
        if (this.label) {
            w = Math.max(w, this.label.width());
        }
        return w;
    }

    adjustWidths() {
        const w = this.maxWidth();
        let isSelected;
        const myself = this;
        this.children.forEach(item => {
            item.silentSetWidth(w);
            if (item instanceof MenuItemMorph) {
                item.fixLayout();
                isSelected = (item.image === item.pressImage);
                item.createBackgrounds();
                if (isSelected) {
                    item.image = item.pressImage;
                }
            } else {
                item.drawNew();
                if (item === myself.label) {
                    item.text.setPosition(
                        item.center().subtract(
                            item.text.extent().floorDivideBy(2)
                        )
                    );
                }
            }
        });
    }

    unselectAllItems() {
        this.children.forEach(item => {
            if (item instanceof MenuItemMorph) {
                item.image = item.normalImage;
            }
        });
        this.changed();
    }

    popup(world, pos) {
        this.drawNew();
        this.setPosition(pos);
        this.addShadow(new Point(2, 2), 80);
        this.keepWithin(world);
        if (world.activeMenu) {
            world.activeMenu.destroy();
        }
        if (this.items.length < 1 && !this.title) { // don't show empty menus
            return;
        }
        world.add(this);
        world.activeMenu = this;
        this.world = world; // optionally enable keyboard support
        this.fullChanged();
    }

    popUpAtHand(world) {
        const wrrld = world || this.world;
        this.popup(wrrld, wrrld.hand.position());
    }

    popUpCenteredAtHand(world) {
        const wrrld = world || this.world;
        this.drawNew();
        this.popup(
            wrrld,
            wrrld.hand.position().subtract(
                this.extent().floorDivideBy(2)
            )
        );
    }

    popUpCenteredInWorld(world) {
        const wrrld = world || this.world;
        this.drawNew();
        this.popup(
            wrrld,
            wrrld.center().subtract(
                this.extent().floorDivideBy(2)
            )
        );
    }

    // MenuMorph submenus

    closeRootMenu() {
        if (this.parent instanceof MenuMorph) {
            this.parent.closeRootMenu();
        } else {
            this.destroy();
        }
    }

    closeSubmenu() {
        if (this.submenu) {
            this.submenu.destroy();
            this.submenu = null;
            this.unselectAllItems();
        }
    }

    // MenuMorph keyboard accessibility

    getFocus() {
        this.world.keyboardReceiver = this;
        this.selection = null;
        this.selectFirst();
        this.hasFocus = true;
    }

    processKeyDown(event) {
        // console.log(event.keyCode);
        switch (event.keyCode) {
        case 13: // 'enter'
        case 32: // 'space'
            if (this.selection) {
                this.selection.mouseClickLeft();
                if (this.submenu) {
                    this.submenu.getFocus();
                }
            }
            return;
        case 27: // 'esc'
            return this.destroy();
        case 37: // 'left arrow'
            return this.leaveSubmenu();
        case 38: // 'up arrow'
            return this.selectUp();
        case 39: // 'right arrow'
            return this.enterSubmenu();
        case 40: // 'down arrow'
            return this.selectDown();
        default:
            nop();
        }
    }

    processKeyUp(event) {
        nop(event);
    }

    processKeyPress(event) {
        nop(event);
    }

    selectFirst() {
        let i;
        for (i = 0; i < this.children.length; i += 1) {
            if (this.children[i] instanceof MenuItemMorph) {
                this.select(this.children[i]);
                return;
            }
        }
    }

    selectUp() {
        let triggers;
        let idx;

        triggers = this.children.filter(each => each instanceof MenuItemMorph);
        if (!this.selection) {
            if (triggers.length) {
                this.select(triggers[0]);
            }
            return;
        }
        idx = triggers.indexOf(this.selection) - 1;
        if (idx < 0) {
            idx = triggers.length - 1;
        }
        this.select(triggers[idx]);
    }

    selectDown() {
        let triggers;
        let idx;

        triggers = this.children.filter(each => each instanceof MenuItemMorph);
        if (!this.selection) {
            if (triggers.length) {
                this.select(triggers[0]);
            }
            return;
        }
        idx = triggers.indexOf(this.selection) + 1;
        if (idx >= triggers.length) {
            idx = 0;
        }
        this.select(triggers[idx]);
    }

    enterSubmenu() {
        if (this.selection && this.selection.action instanceof MenuMorph) {
            this.selection.popUpSubmenu();
            if (this.submenu) {
                this.submenu.getFocus();
            }
        }
    }

    leaveSubmenu() {
        const menu = this.parent;
        if (this.parent instanceof MenuMorph) {
            menu.submenu = null;
            menu.hasFocus = true;
            this.destroy();
            menu.world.keyboardReceiver = menu;
        }
    }

    select(aMenuItem) {
        this.unselectAllItems();
        aMenuItem.image = aMenuItem.highlightImage;
        aMenuItem.changed();
        this.selection = aMenuItem;
    }

    destroy() {
        if (this.hasFocus) {
            this.world.keyboardReceiver = null;
        }
        super.destroy.call(this);
    }
}