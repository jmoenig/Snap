// CursorMorph /////////////////////////////////////////////////////////

// I am a String/Text editing widget

import BlinkerMorph from "./BlinkerMorph";
import {contains, fontHeight, isNil} from "../util";
import TextMorph from "./TextMorph";
import Point from "../Point";
import StringMorph from "./StringMorph";

// CursorMorph: referenced constructors

// CursorMorph preferences settings:

CursorMorph.prototype.viewPadding = 1;

// CursorMorph instance creation:

export default class CursorMorph extends BlinkerMorph {
    public keyDownEventUsed = false;
    public target: StringMorph | TextMorph;
    public originalContents: string;
    public originalAlignment: "left" | "right" | "center";


    constructor(aStringOrTextMorph: StringMorph | TextMorph) {
        super();

        let ls;

        // additional properties:
        this.target = aStringOrTextMorph;
        this.originalContents = this.target.text; // TODO: ???
        this.originalAlignment = this.target.alignment;
        this.slot = this.target.text.length;
        super.init.call(this);
        ls = fontHeight(this.target.fontSize);
        this.setExtent(new Point(Math.max(Math.floor(ls / 20), 1), ls));
        this.drawNew();
        this.image.getContext('2d').font = this.target.font();
        if (this.target instanceof TextMorph &&
            (this.target.alignment !== 'left')) {
            this.target.setAlignmentToLeft();
        }
        this.gotoSlot(this.slot);
        this.initializeClipboardHandler();
    }

    initializeClipboardHandler() {
        // Add hidden text box for copying and pasting
        const myself = this;

        const wrrld = this.target.world();

        this.clipboardHandler = document.createElement('textarea');
        this.clipboardHandler.style.position = 'absolute';
        this.clipboardHandler.style.top = window.outerHeight;
        this.clipboardHandler.style.right = '101%'; // placed just out of view

        document.body.appendChild(this.clipboardHandler);

        this.clipboardHandler.value = this.target.selection();
        this.clipboardHandler.focus();
        this.clipboardHandler.select();

        this.clipboardHandler.addEventListener(
            'keypress',
            function (event) {
                myself.processKeyPress(event);
                this.value = myself.target.selection();
                this.select();
            },
            false
        );

        this.clipboardHandler.addEventListener(
            'keydown',
            function (event) {
                myself.processKeyDown(event);
                if (event.shiftKey) {
                    wrrld.currentKey = 16;
                }
                this.value = myself.target.selection();
                this.select();

                // Make sure tab prevents default
                if (event.key === 'U+0009' ||
                        event.key === 'Tab') {
                    myself.processKeyPress(event);
                    event.preventDefault();
                }
            },
            false
        );

        this.clipboardHandler.addEventListener(
            'keyup',
            event => {
                wrrld.currentKey = null;
            },
            false
        );

        this.clipboardHandler.addEventListener(
            'input',
            function (event) {
                if (this.value === '') {
                    myself.gotoSlot(myself.target.selectionStartSlot());
                    myself.target.deleteSelection();
                }
            },
            false
        );
    }

    // CursorMorph event processing:

    processKeyPress(event) {
        // this.inspectKeyEvent(event);
        if (this.keyDownEventUsed) {
            this.keyDownEventUsed = false;
            return null;
        }
        if ((event.keyCode === 40) || event.charCode === 40) {
            this.insert('(');
            return null;
        }
        if ((event.keyCode === 37) || event.charCode === 37) {
            this.insert('%');
            return null;
        }
        if (event.keyCode) { // Opera doesn't support charCode
            if (event.ctrlKey && (!event.altKey)) {
                this.ctrl(event.keyCode, event.shiftKey);
            } else if (event.metaKey) {
                this.cmd(event.keyCode, event.shiftKey);
            } else {
                this.insert(
                    String.fromCharCode(event.keyCode),
                    event.shiftKey
                );
            }
        } else if (event.charCode) { // all other browsers
            if (event.ctrlKey && (!event.altKey)) {
                this.ctrl(event.charCode, event.shiftKey);
            } else if (event.metaKey) {
                this.cmd(event.charCode, event.shiftKey);
            } else {
                this.insert(
                    String.fromCharCode(event.charCode),
                    event.shiftKey
                );
            }
        }
        // notify target's parent of key event
        this.target.escalateEvent('reactToKeystroke', event);
    }

    processKeyDown(event) {
        // this.inspectKeyEvent(event);
        const shift = event.shiftKey;

        const wordNavigation = event.ctrlKey || event.altKey;
        const selecting = this.target.selection().length > 0;

        this.keyDownEventUsed = false;
        if (event.ctrlKey && (!event.altKey)) {
            this.ctrl(event.keyCode, event.shiftKey);
            // notify target's parent of key event
            this.target.escalateEvent('reactToKeystroke', event);
        }
        if (event.metaKey) {
            this.cmd(event.keyCode, event.shiftKey);
            // notify target's parent of key event
            this.target.escalateEvent('reactToKeystroke', event);
        }

        switch (event.keyCode) {
        case 37:
            if (selecting && !shift && !wordNavigation) {
                this.gotoSlot(Math.min(this.target.startMark, this.target.endMark));
                this.target.clearSelection();
            } else {
                this.goLeft(
                        shift,
                        wordNavigation ?
                            this.slot - this.target.previousWordFrom(this.slot)
                            : 1);
            }
            this.keyDownEventUsed = true;
            break;
        case 39:
            if (selecting && !shift && !wordNavigation) {
                this.gotoSlot(Math.max(this.target.startMark, this.target.endMark));
                this.target.clearSelection();
            } else {
                this.goRight(
                        shift,
                        wordNavigation ?
                            this.target.nextWordFrom(this.slot) - this.slot
                            : 1);
            }
            this.keyDownEventUsed = true;
            break;
        case 38:
            this.goUp(shift);
            this.keyDownEventUsed = true;
            break;
        case 40:
            this.goDown(shift);
            this.keyDownEventUsed = true;
            break;
        case 36:
            this.goHome(shift);
            this.keyDownEventUsed = true;
            break;
        case 35:
            this.goEnd(shift);
            this.keyDownEventUsed = true;
            break;
        case 46:
            this.deleteRight();
            this.keyDownEventUsed = true;
            break;
        case 8:
            this.deleteLeft();
            this.keyDownEventUsed = true;
            break;
        case 13:
            if ((this.target instanceof StringMorph) || shift) {
                this.accept();
            } else {
                this.insert('\n');
            }
            this.keyDownEventUsed = true;
            break;
        case 27:
            this.cancel();
            this.keyDownEventUsed = true;
            break;
        default:
            nop();
            // this.inspectKeyEvent(event);
        }
        // notify target's parent of key event
        this.target.escalateEvent('reactToKeystroke', event);
    }

    // CursorMorph navigation:

    /*
    // original non-scrolling code, commented out in case we need to fall back:

    CursorMorph.prototype.gotoSlot = function (newSlot) {
        this.setPosition(this.target.slotPosition(newSlot));
        this.slot = Math.max(newSlot, 0);
    };
    */

    gotoSlot(slot) {
        const length = this.target.text.length;
        const pos = this.target.slotPosition(slot);
        let right;
        let left;
        this.slot = slot < 0 ? 0 : slot > length ? length : slot;
        if (this.parent && this.target.isScrollable) {
            right = this.parent.right() - this.viewPadding;
            left = this.parent.left() + this.viewPadding;
            if (pos.x > right) {
                this.target.setLeft(this.target.left() + right - pos.x);
                pos.x = right;
            }
            if (pos.x < left) {
                left = Math.min(this.parent.left(), left);
                this.target.setLeft(this.target.left() + left - pos.x);
                pos.x = left;
            }
            if (this.target.right() < right &&
                    right - this.target.width() < left) {
                pos.x += right - this.target.right();
                this.target.setRight(right);
            }
        }
        this.show();
        this.setPosition(pos);
        if (this.parent
                && this.parent.parent instanceof ScrollFrameMorph
                && this.target.isScrollable) {
            this.parent.parent.scrollCursorIntoView(this);
        }
    }

    goLeft(shift, howMany) {
        this.updateSelection(shift);
        this.gotoSlot(this.slot - (howMany || 1));
        this.updateSelection(shift);
    }

    goRight(shift, howMany) {
        this.updateSelection(shift);
        this.gotoSlot(this.slot + (howMany || 1));
        this.updateSelection(shift);
    }

    goUp(shift) {
        this.updateSelection(shift);
        this.gotoSlot(this.target.upFrom(this.slot));
        this.updateSelection(shift);
    }

    goDown(shift) {
        this.updateSelection(shift);
        this.gotoSlot(this.target.downFrom(this.slot));
        this.updateSelection(shift);
    }

    goHome(shift) {
        this.updateSelection(shift);
        this.gotoSlot(this.target.startOfLine(this.slot));
        this.updateSelection(shift);
    }

    goEnd(shift) {
        this.updateSelection(shift);
        this.gotoSlot(this.target.endOfLine(this.slot));
        this.updateSelection(shift);
    }

    gotoPos(aPoint: Point) {
        this.gotoSlot(this.target.slotAt(aPoint));
        this.show();
    }

    // CursorMorph selecting:

    updateSelection(shift) {
        if (shift) {
            if (isNil(this.target.endMark) && isNil(this.target.startMark)) {
                this.target.startMark = this.slot;
                this.target.endMark = this.slot;
            } else if (this.target.endMark !== this.slot) {
                this.target.endMark = this.slot;
                this.target.drawNew();
                this.target.changed();
            }
        } else {
            this.target.clearSelection();
        }
    }

    // CursorMorph editing:

    accept() {
        const world = this.root();
        if (world) {
            world.stopEditing();
        }
        this.escalateEvent('accept', this);
    }

    cancel() {
        const world = this.root();
        this.undo();
        if (world) {
            world.stopEditing();
        }
        this.escalateEvent('cancel', this);
    }

    undo() {
        this.target.text = this.originalContents;
        this.target.changed();
        this.target.drawNew();
        this.target.changed();
        this.gotoSlot(0);
    }

    insert(aChar, shiftKey?) {
        let text;
        if (aChar === '\u0009') {
            this.target.escalateEvent('reactToEdit', this.target);
            if (shiftKey) {
                return this.target.backTab(this.target);
            }
            return this.target.tab(this.target);
        }
        if (!this.target.isNumeric ||
                !isNaN(parseFloat(aChar)) ||
                contains(['-', '.'], aChar)) {
            if (this.target.selection() !== '') {
                this.gotoSlot(this.target.selectionStartSlot());
                this.target.deleteSelection();
            }
            text = this.target.text;
            text = text.slice(0, this.slot) +
                aChar +
                text.slice(this.slot);
            this.target.text = text;
            this.target.drawNew();
            this.target.changed();
            this.goRight(false, aChar.length);
        }
    }

    ctrl(aChar, shiftKey) {
        if (aChar === 64 || (aChar === 65 && shiftKey)) {
            this.insert('@');
        } else if (aChar === 65) {
            this.target.selectAll();
        } else if (aChar === 90) {
            this.undo();
        } else if (aChar === 123) {
            this.insert('{');
        } else if (aChar === 125) {
            this.insert('}');
        } else if (aChar === 91) {
            this.insert('[');
        } else if (aChar === 93) {
            this.insert(']');
        } else if (!isNil(this.target.receiver)) {
            if (aChar === 68) {
                this.target.doIt();
            } else if (aChar === 73) {
                this.target.inspectIt();
            } else if (aChar === 80) {
                this.target.showIt();
            }
        }


    }

    cmd(aChar, shiftKey) {
        if (aChar === 64 || (aChar === 65 && shiftKey)) {
            this.insert('@');
        } else if (aChar === 65) {
            this.target.selectAll();
        } else if (aChar === 90) {
            this.undo();
        } else if (!isNil(this.target.receiver)) {
            if (aChar === 68) {
                this.target.doIt();
            } else if (aChar === 73) {
                this.target.inspectIt();
            } else if (aChar === 80) {
                this.target.showIt();
            }
        }
    }

    deleteRight() {
        let text;
        if (this.target.selection() !== '') {
            this.gotoSlot(this.target.selectionStartSlot());
            this.target.deleteSelection();
        } else {
            text = this.target.text;
            this.target.changed();
            text = text.slice(0, this.slot) + text.slice(this.slot + 1);
            this.target.text = text;
            this.target.drawNew();
        }
    }

    deleteLeft() {
        let text;
        if (this.target.selection()) {
            this.gotoSlot(this.target.selectionStartSlot());
            return this.target.deleteSelection();
        }
        text = this.target.text;
        this.target.changed();
        this.target.text = text.substring(0, this.slot - 1) +
            text.substr(this.slot);
        this.target.drawNew();
        this.goLeft();
    }

    // CursorMorph destroying:

    destroy() {
        if (this.target.alignment !== this.originalAlignment) {
            this.target.alignment = this.originalAlignment;
            this.target.drawNew();
            this.target.changed();
        }
        this.destroyClipboardHandler();
        super.destroy.call(this);
    }

    destroyClipboardHandler() {
        const nodes = document.body.children;
        let each;
        let i;
        if (this.clipboardHandler) {
            for (i = 0; i < nodes.length; i += 1) {
                each = nodes[i];
                if (each === this.clipboardHandler) {
                    document.body.removeChild(this.clipboardHandler);
                    this.clipboardHandler = null;
                }
            }
        }
    }

    // CursorMorph utilities:

    inspectKeyEvent(event) {
        // private
        this.inform(
            `Key pressed: ${String.fromCharCode(event.charCode)}\n------------------------\ncharCode: ${event.charCode.toString()}\nkeyCode: ${event.keyCode.toString()}\nshiftKey: ${event.shiftKey.toString()}\naltKey: ${event.altKey.toString()}\nctrlKey: ${event.ctrlKey.toString()}\ncmdKey: ${event.metaKey.toString()}`
        );
    }
}

