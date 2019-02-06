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
    this.initializeTextarea();
    document.body.appendChild(this.textarea);
    this.updateTextAreaPosition();
    this.textarea.focus();
    console.log("focused on textarea");
};

CursorMorph.prototype.initializeTextarea = function () {
    var myself = this;
    this.textarea.style.zIndex = 1001;
    this.textarea.style.position = 'absolute';
    this.textarea.wrap = "off";
    this.textarea.style.overflow = "hidden";
    this.textarea.autofocus = true;
    this.textarea.value = this.target.text;
    this.textarea.setSelectionRange(0, this.target.text.length);
    /* The following keyboard events must be handlered before the textarea got them,
    otherwise we will have no chance to get access to them:
        - tab: default is to jump to next field, but we want to disable this behavior.
        - enter / shift+enter: accept the editing
        - esc: discard the editing
    */
    this.textarea.addEventListener('keydown', function (event) {
        // The following line is copied from the "keydown" event handler of canvas (world).
        // There are other actions in that handler, but since we are in the process of editing,
        // I think we don't need to do the other options. We need this one to allow shift+click
        // works.
        myself.world().currentKey = event.keyCode;

        // Make sure tab prevents default
        if (event.key === 'U+0009' ||
                event.key === 'Tab') {
            event.preventDefault();
            myself.target.escalateEvent('reactToEdit', myself.target);
            if (event.shiftKey) {
                return myself.target.backTab(myself.target);
            }
            return myself.target.tab(myself.target);
        } else {
            switch (event.keyCode) {
                case 13:
                    if ((myself.target instanceof StringMorph) || shift) {
                        myself.accept();
                        return false;
                    }
                    break;
                case 27:
                    console.log("editing canceled.");
                    myself.cancel();
                    break;
                default:
                    nop();
            }
            myself.target.escalateEvent('reactToKeystroke', event);
        }
    })

    /* Other editing keyboard events should be handled by the textarea first, so we
    can grab the effect of the editing after textarea handled the event. */
    this.textarea.addEventListener('keyup', function (event) {
        myself.world().currentKey = null;

        var redrawTarget = false;
        var target = myself.target;
        var textarea = myself.textarea;
        if (target.text !== textarea.value) {
            target.text = textarea.value;
            redrawTarget = true;
        }
        if (textarea.selectionStart === textarea.selectionEnd) {
            target.startMark = null;
            target.endMark = null;
            redrawTarget = true;
        } else {
            if (textarea.selectionDirection === 'backward') {
                if (target.startMark !== textarea.selectionEnd || target.endMark !== textarea.selectionStart) {
                    target.startMark = textarea.selectionEnd;
                    target.endMark = textarea.selectionStart;
                    redrawTarget = true;
                }
            } else {
                if (target.startMark !== textarea.selectionStart || target.endMark !== textarea.selectionEnd) {
                    target.startMark = textarea.selectionStart;
                    target.endMark = textarea.selectionEnd;
                    redrawTarget = true;
                }
            }
        }
        if (redrawTarget) {
            target.changed();
            target.drawNew();
            target.changed();
        }
        if (myself.slot !== textarea.selectionStart) {
            myself.gotoSlot(textarea.selectionStart);
        }
        myself.updateTextAreaPosition();
        target.escalateEvent('reactToKeystroke', event);
    })
};
function number2px (n) {
    return Math.ceil(n) + "px";
}
CursorMorph.prototype.updateTextAreaPosition = function () {
    var origin = this.target.bounds.origin;
    this.textarea.style.top = number2px(origin.y+30)
    this.textarea.style.left = number2px(origin.x);
}

CursorMorph.prototype.processKeyPress = function (event) {
}

CursorMorph.prototype.processKeyDown = function (event) {
}

CursorMorph.prototype.setTextareaSelection = function (start, end) {
    if (start <= end) {
        console.log(start, end, 'forward');
        this.textarea.setSelectionRange(start, end, 'forward');
    } else {
        console.log(end, start, 'backward');
        this.textarea.setSelectionRange(end, start, 'backward');
    }
    this.textarea.focus();
}

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
    console.log("destroying editor");
  document.body.removeChild(this.textarea);
  this.textarea = null;
}

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

StringMorph.prototype.shiftClick = function (pos) {
    var cursor = this.root().cursor;

    if (cursor) {
        if (!this.startMark) {
            this.startMark = cursor.slot;
        }
        cursor.gotoPos(pos);
        this.endMark = cursor.slot;
        cursor.setTextareaSelection(this.startMark, this.endMark);
        this.drawNew();
        this.changed();
        cursor.textarea.focus();
    }
    this.currentlySelecting = true;
    this.escalateEvent('mouseDownLeft', pos);
};

StringMorph.prototype.mouseClickLeft = function (pos) {
    var cursor;
    if (this.isEditable) {
        this.edit(); // creates a new cursor if not editing 'this'
        cursor = this.root().cursor;
        if (cursor) {
            cursor.gotoPos(pos);
            if (!this.startMark) {
                this.startMark = cursor.slot;
            }
        }
        this.currentlySelecting = true;
    } else {
        this.escalateEvent('mouseClickLeft', pos);
    }
};

StringMorph.prototype.mouseDoubleClick = function (pos) {
    // selects the word at pos
    // if there is no word, we select whatever is between
    // the previous and next words
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
            // special case for when we click right after the
            // last slot in multi line TextMorphs
            this.selectAll();
        }
        this.root().cursor.setTextareaSelection(this.startMark, this.endMark);
    } else {
        this.escalateEvent('mouseDoubleClick', pos);
    }
};

StringMorph.prototype.enableSelecting = function () {
    this.mouseDownLeft = function (pos) {
        var crs = this.root().cursor,
            already = crs ? crs.target === this : false;
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
                    cursor.setTextareaSelection(this.startMark, this.endMark);
                }
                this.drawNew();
                this.changed();
            }
        }
    };
};

WorldMorph.prototype.edit = function (aStringOrTextMorph) {
    if (this.cursor && this.cursor.target === aStringOrTextMorph) {
        return
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
