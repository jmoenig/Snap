/**
 * The changes in this file is to add a hidden textarea as the editing engine
 * for text editing, so that Snap can make use of the browser's support for
 * IME.
 *
 * The design is as follows:
 * - The textarea handles all keyboard events: navigation, control and
 *   character insertion.
 *
 * - After each keydown event, the content and selection status is copied to
 *   the target morph, and the caret position is copied to the cursor morph.
 *
 * - The target morph handles the mouse events
 *
 * - After each mouse events, the selection status, the position of cursor are
 *   copied to the textarea.
 *
 * Improvements made by this change:
 * - The main goal:
 *   * Allow user to input texts in languages that needs an input method.
 * - As side effects, two bugs are fixed:
 *   * Shift+click does not select text as expected
 *   * Numeric input slots accept invalid inputs like "10-2" (but treat it as
 *     10, which is the returned value by parseFloat, I guess), "10.0.2"
 *
 * - Behavior change that might affect other part of system:
 *   * WorldMorph.edit: I added a guard at the start of the function, so that
 *     a new cursor morph is created only if the target morph is different
 *     from the one that is currently being edited. This is related to the
 *     above mentioned "shift-click" bug, which is caused by creating a new
 *     cursor morph for the current editing target.
 *
 * - Not ported features
 *   * In the handling of ctrl(cmd)-keys, some special combinations are
 *     supported, for example ctrl + F12 (keycode 123) will insert '{'. Is there
 *     any device that needs these combinations? If needed, I think they can
 *     be ported using synthetic events.
 */
CursorMorph.prototype.init = function (aStringOrTextMorph) {
    var ls;

    // additional properties:
    this.keyDownEventUsed = false;
    this.target = aStringOrTextMorph;
    this.originalContents = this.target.text;
    this.originalAlignment = this.target.alignment;
    this.slot = this.target.text.length;
    CursorMorph.uber.init.call(this);
    ls = fontHeight(this.target.fontSize);
    this.setExtent(new Point(Math.max(Math.floor(ls / 20), 1), ls));
    this.drawNew();
    this.image.getContext('2d').font = this.target.font();
    if (this.target instanceof TextMorph &&
            (this.target.alignment !== 'left')) {
        this.target.setAlignmentToLeft();
    }
    this.gotoSlot(this.slot);

    this.textarea = document.createElement('textarea');
    this.textarea.style.zIndex = -1;
    document.body.appendChild(this.textarea);
    this.initializeTextarea(this.target.fontSize);
};

CursorMorph.prototype.initializeTextarea = function (fontSize) {
    var myself = this;
    this.textarea.style.position = 'absolute';
    this.textarea.wrap = "off";
    this.textarea.style.overflow = "hidden";
    this.textarea.style.fontSize = fontSize + 'px';
    this.textarea.autofocus = true;
    this.textarea.value = this.target.text;
    this.updateTextAreaPosition();
    /* The following keyboard events has special meaning in Snap, so we must
    handler them before the textarea:

    - tab: goto next text field
    - enter / shift+enter: accept the editing
    - esc: discard the editing
    - ctrl-d, ctrl-i and ctrl-p: doit, inspect it and print it

    We also take the chance to filter out invalid inputs for numeric fields.
    */
    this.textarea.addEventListener('keydown', function (event) {
        // The following line is copied from the "keydown" event handler of
        // canvas (world). There are other actions in that handler, but since
        // we are in between of editing, we don't need to do the other
        // actions. We need this one to allow shift+click works.
        myself.world().currentKey = event.keyCode;

        var keyName = event.key;
        var isValidInput = (
            // non-numeric morph can accept any input
            !myself.target.isNumeric  ||
            // control keys
            keyName.length > 1      ||
            // digits, is it safe to use '0' <= keyName <= '9'?
            !Number.isNaN(parseFloat(keyName)) ||
            // at most one '.'
            (keyName === '.' && myself.textarea.value.indexOf('.')===-1) ||
            // or '-' as first char
            (keyName === '-' && myself.textarea.selectionStart === 0)
        );

        // Make sure tab prevents default
        if (keyName === 'U+0009' || keyName === 'Tab') {
            event.preventDefault();
            myself.target.escalateEvent('reactToEdit', myself.target);
            if (event.shiftKey) {
                myself.target.backTab(myself.target);
            }
            myself.target.tab(myself.target);
        } else if (!isNil(myself.target.receiver) &&
                    (event.ctrlKey || event.metaKey)) {
            if (keyName === 'd') {
                myself.target.doIt();
            } else if (keyName === 'i') {
                myself.target.inspectIt();
            } else if (keyName === 'p') {
                myself.target.showIt();
            }
            event.preventDefault();
        } else if (isValidInput) {
            switch (event.keyCode) {
                case 13:
                    if ((myself.target instanceof StringMorph) || shift) {
                        myself.accept();
                    }
                    break;
                case 27:
                    myself.cancel();
                    break;
                default:
                    nop();
            }
            myself.target.escalateEvent('reactToKeystroke', event);
        } else {
            event.preventDefault();
        }
    });

    /* All other key events are handled by the textarea. Only after that, we
       update the state of target morph and cursor morph.
       - target morph: copy the content and selection status to the target.
       - cursor morph: copy the caret position to cursor morph.
     */
    this.textarea.addEventListener('keyup', function (event) {
        myself.world().currentKey = null;

        var target = myself.target;
        var textarea = myself.textarea;

        target.text = textarea.value;
        if (textarea.selectionStart === textarea.selectionEnd) {
            target.startMark = null;
            target.endMark = null;
        } else {
            if (textarea.selectionDirection === 'backward') {
                target.startMark = textarea.selectionEnd;
                target.endMark = textarea.selectionStart;
            } else {
                target.startMark = textarea.selectionStart;
                target.endMark = textarea.selectionEnd;
            }
        }
        target.changed();
        target.drawNew();
        target.changed();

        myself.gotoSlot(textarea.selectionStart);

        myself.updateTextAreaPosition();
        target.escalateEvent('reactToKeystroke', event);
    });
};

CursorMorph.prototype.updateTextAreaPosition = function () {
    function number2px (n) {
        return Math.ceil(n) + 'px';
    }
    var origin = this.target.bounds.origin;
    this.textarea.style.top = number2px(origin.y);
    this.textarea.style.left = number2px(origin.x);
};

CursorMorph.prototype.processKeyPress = function (event) {
};

CursorMorph.prototype.processKeyDown = function (event) {
};

CursorMorph.prototype.syncTextareaSelectionWith = function (targetMorph) {
    var start = targetMorph.startMark;
    var end = targetMorph.endMark;

    if (start <= end) {
        this.textarea.setSelectionRange(start, end, 'forward');
    } else {
        this.textarea.setSelectionRange(end, start, 'backward');
    }
    this.textarea.focus();
};

CursorMorph.prototype.destroy = function () {
    if (this.target.alignment !== this.originalAlignment) {
        this.target.alignment = this.originalAlignment;
        this.target.drawNew();
        this.target.changed();
    }
    this.destroyTextarea();
    CursorMorph.uber.destroy.call(this);
};

CursorMorph.prototype.destroyTextarea = function () {
    document.body.removeChild(this.textarea);
    this.textarea = null;
};

StringMorph.prototype.clearSelection = function () {
    if (!this.currentlySelecting &&
            isNil(this.startMark) &&
            isNil(this.endMark)) {
        return;
    }
    this.currentlySelecting = false;
    this.startMark = null;
    this.endMark = null;
    this.drawNew();
    this.changed();
};

StringMorph.prototype.selectAll = function () {
    var cursor;
    if (this.isEditable) {
        this.startMark = 0;
        this.endMark = this.text.length;
        cursor = this.root().cursor;
        if (cursor) {
            cursor.gotoSlot(this.text.length);
            cursor.syncTextareaSelectionWith(this);
        }
        this.drawNew();
        this.changed();
    }
};


StringMorph.prototype.shiftClick = function (pos) {
    var cursor = this.root().cursor;

    if (cursor) {
        if (!this.startMark) {
            this.startMark = cursor.slot;
        }
        cursor.gotoPos(pos);
        this.endMark = cursor.slot;
        cursor.syncTextareaSelectionWith(this);
        this.drawNew();
        this.changed();
    }
    this.currentlySelecting = false;
    this.escalateEvent('mouseDownLeft', pos);
};

StringMorph.prototype.mouseDoubleClick = function (pos) {
    // selects the word at pos if there is no word, we select whatever is
    // between the previous and next words
    var slot = this.slotAt(pos);

    if (this.isEditable) {
        this.edit();

        if (slot === this.text.length) {
            slot -= 1;
        }

        if (this.text[slot] && isWordChar(this.text[slot])) {
            this.selectWordAt(slot);
        } else if (this.text[slot]) {
            this.selectBetweenWordsAt(slot);
        } else {
            // special case for when we click right after the last slot in
            // multi line TextMorphs
            this.selectAll();
        }
        this.root().cursor.syncTextareaSelectionWith(this);
    } else {
        this.escalateEvent('mouseDoubleClick', pos);
    }
};

StringMorph.prototype.enableSelecting = function () {
    this.mouseDownLeft = function (pos) {
        var crs = this.root().cursor;
        var already = crs ? crs.target === this : false;
        if (this.world().currentKey === 16) {
            this.shiftClick(pos);
        } else {
            this.clearSelection();
            if (this.isEditable && (!this.isDraggable)) {
                this.edit();
                this.root().cursor.gotoPos(pos);
                this.startMark = this.slotAt(pos);
                this.endMark = this.startMark;
                this.currentlySelecting = true;
                this.root().cursor.syncTextareaSelectionWith(this);
                if (!already) {this.escalateEvent('mouseDownLeft', pos); }
            }
        }
    };
    this.mouseMove = function (pos) {
        if (this.isEditable &&
                this.currentlySelecting &&
                (!this.isDraggable)) {
            var newMark = this.slotAt(pos);
            if (newMark !== this.endMark) {
                this.endMark = newMark;
                var cursor = this.root().cursor;
                if (cursor) {
                    cursor.syncTextareaSelectionWith(this);
                }
                this.drawNew();
                this.changed();
            }
        }
    };
};

WorldMorph.prototype.edit = function (aStringOrTextMorph) {
    if (this.cursor && this.cursor.target === aStringOrTextMorph) {
        return;
    }

    var pos = getDocumentPositionOf(this.worldCanvas);

    if (!aStringOrTextMorph.isEditable) {
        return null;
    }
    if (this.cursor) {
        this.cursor.destroy();
    }
    this.cursor = new CursorMorph(aStringOrTextMorph);
    aStringOrTextMorph.parent.add(this.cursor);
    this.keyboardReceiver = this.cursor;

    this.initVirtualKeyboard();
    if (MorphicPreferences.isTouchDevice
            && MorphicPreferences.useVirtualKeyboard) {
        this.virtualKeyboard.style.top = this.cursor.top() + pos.y + "px";
        this.virtualKeyboard.style.left = this.cursor.left() + pos.x + "px";
        this.virtualKeyboard.focus();
    }

    if (MorphicPreferences.useSliderForInput) {
        if (!aStringOrTextMorph.parentThatIsA(MenuMorph)) {
            this.slide(aStringOrTextMorph);
        }
    }

    if (this.lastEditedText !== aStringOrTextMorph) {
        aStringOrTextMorph.escalateEvent('freshTextEdit', aStringOrTextMorph);
    }
    this.lastEditedText = aStringOrTextMorph;
};
