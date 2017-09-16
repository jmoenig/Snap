// ScriptFocusMorph //////////////////////////////////////////////////////////

/*
    I offer keyboard navigation for syntax elements, blocks and scripts:

    activate:
      - shift + click on a scripting pane's background
      - shift + click on any block
      - shift + enter in the IDE's edit mode

    stop editing:
      - left-click on scripting pane's background
      - esc

    navigate among scripts:
      - tab: next script
      - backtab (shift + tab): last script

    start editing a new script:
      - shift + enter

    navigate among commands within a script:
      - down arrow: next command
      - up arrow: last command

    navigate among all elements within a script:
      - right arrow: next element (block or input)
      - left arrow: last element

    move the currently edited script (stack of blocks):
      - shift + arrow keys (left, right, up, down)

    editing scripts:

      - backspace:
        * delete currently focused reporter
        * delete command above current insertion mark (blinking)
        * collapse currently focused variadic input by one element

      - enter:
        * edit currently focused input slot
        * expand currently focused variadic input by one element

      - space:
        * activate currently focused input slot's pull-down menu, if any
        * show a menu of reachable variables for the focused input or reporter

      - any other key:
        start searching for insertable matching blocks

      - in menus triggered by this feature:
        * navigate with up / down arrow keys
        * trigger selection with enter
        * cancel menu with esc

      - in the search bar triggered b this feature:
        * keep typing / deleting to narrow and update matches
        * navigate among shown matches with up / down arrow keys
        * insert selected match at the focus' position with enter
        * cancel searching and inserting with esc

    running the currently edited script:
        * shift+ctrl+enter simulates clicking the edited script with the mouse
*/

// ScriptFocusMorph instance creation:

export default class ScriptFocusMorph extends BoxMorph { // TODO
    constructor(editor, initialElement, position) {
        this.init(editor, initialElement, position);
    }

    init(editor, initialElement, position) {
        this.editor = editor; // a ScriptsMorph
        this.element = initialElement;
        this.atEnd = false;
        super.init.call(this);
        if (this.element instanceof ScriptsMorph) {
            this.setPosition(position);
        }
    }

    // ScriptFocusMorph keyboard focus:

    getFocus(world) {
        if (!world) {world = this.world(); }
        if (world && world.keyboardReceiver !== this) {
            world.stopEditing();
        }
        world.keyboardReceiver = this;
        this.fixLayout();
    }

    // ScriptFocusMorph layout:

    fixLayout() {
        this.changed();
        if (this.element instanceof CommandBlockMorph ||
                this.element instanceof CommandSlotMorph ||
                this.element instanceof ScriptsMorph) {
            this.manifestStatement();
        } else {
            this.manifestExpression();
        }
        this.editor.add(this); // come to front
        this.scrollIntoView();
        this.changed();
    }

    manifestStatement() {
        const newScript = this.element instanceof ScriptsMorph;
        let y = this.element.top();
        this.border = 0;
        this.edge = 0;
        this.alpha = 1;
        this.color = this.editor.feedbackColor;
        this.setExtent(new Point(
            newScript ?
                    SyntaxElementMorph.prototype.hatWidth : this.element.width(),
            Math.max(
                SyntaxElementMorph.prototype.corner,
                SyntaxElementMorph.prototype.feedbackMinHeight
            )
        ));
        if (this.element instanceof CommandSlotMorph) {
            y += SyntaxElementMorph.prototype.corner;
        } else if (this.atEnd) {
            y = this.element.bottom();
        }
        if (!newScript) {
            this.setPosition(new Point(
                this.element.left(),
                y
            ));
        }
        this.fps = 2;
        this.show();
        this.step = function () {
            this.toggleVisibility();
        };
    }

    manifestExpression() {
        this.edge = SyntaxElementMorph.prototype.rounding;
        this.border = Math.max(
            SyntaxElementMorph.prototype.edge,
            3
        );
        this.color = this.editor.feedbackColor.copy();
        this.color.a = 0.5;
        this.borderColor = this.editor.feedbackColor;

        this.bounds = this.element.fullBounds()
            .expandBy(Math.max(
                SyntaxElementMorph.prototype.edge * 2,
                SyntaxElementMorph.prototype.reporterDropFeedbackPadding
            ));
        this.drawNew();
        delete this.fps;
        delete this.step;
        this.show();
    }

    // ScriptFocusMorph editing

    trigger() {
        const current = this.element;
        if (current instanceof MultiArgMorph) {
            if (current.arrows().children[1].isVisible) {
                current.addInput();
                this.fixLayout();
            }
            return;
        }
        if (current.parent instanceof TemplateSlotMorph) {
            current.mouseClickLeft();
            return;
        }
        if (current instanceof BooleanSlotMorph) {
            current.toggleValue();
            return;
        }
        if (current instanceof InputSlotMorph) {
            if (!current.isReadOnly) {
                delete this.fps;
                delete this.step;
                this.hide();
                this.world().onNextStep = () => {
                    current.contents().edit();
                    current.contents().selectAll();
                };
            } else if (current.choices) {
                current.dropDownMenu(true);
                delete this.fps;
                delete this.step;
                this.hide();
            }
        }
    }

    menu() {
        const current = this.element;
        if (current instanceof InputSlotMorph && current.choices) {
            current.dropDownMenu(true);
            delete this.fps;
            delete this.step;
            this.hide();
        } else {
            this.insertVariableGetter();
        }
    }

    deleteLastElement() {
        const current = this.element;
        if (current.parent instanceof ScriptsMorph) {
            if (this.atEnd || current instanceof ReporterBlockMorph) {
                current.destroy();
                this.element = this.editor;
                this.atEnd = false;
            }
        } else if (current instanceof MultiArgMorph) {
            if (current.arrows().children[0].isVisible) {
                current.removeInput();
            }
        } else if (current instanceof BooleanSlotMorph) {
            if (!current.isStatic) {
                current.setContents(null);
            }
        } else if (current instanceof ReporterBlockMorph) {
            if (!current.isTemplate) {
                this.lastElement();
                current.prepareToBeGrabbed();
                current.destroy();
            }
        } else if (current instanceof CommandBlockMorph) {
            if (this.atEnd) {
                this.element = current.parent;
                current.userDestroy();
            } else {
                if (current.parent instanceof CommandBlockMorph) {
                    current.parent.userDestroy();
                }
            }
        }
        this.editor.adjustBounds();
        this.fixLayout();
    }

    insertBlock(block) {
        let pb;
        let stage;
        let ide;
        let rcvr;
        block.isTemplate = false;
        block.isDraggable = true;

        if (block.snapSound) {
            block.snapSound.play();
        }

        if (this.element instanceof ScriptsMorph) {
            this.editor.add(block);
            this.element = block;
            if (block instanceof CommandBlockMorph) {
                block.setLeft(this.left());
                if (block.isStop()) {
                    block.setTop(this.top());
                } else {
                    block.setBottom(this.top());
                    this.atEnd = true;
                }
            } else {
                block.setCenter(this.center());
                block.setLeft(this.left());
            }
        } else if (this.element instanceof CommandBlockMorph) {
            if (this.atEnd) {
                this.element.nextBlock(block);
                this.element = block;
                this.fixLayout();
            } else {
                // to be done: special case if block.isStop()
                pb = this.element.parent;
                if (pb instanceof ScriptsMorph) { // top block
                    block.setLeft(this.element.left());
                    block.setBottom(this.element.top() + this.element.corner);
                    this.editor.add(block);
                    block.nextBlock(this.element);
                    this.fixLayout();
                } else if (pb instanceof CommandSlotMorph) {
                    pb.nestedBlock(block);
                } else if (pb instanceof CommandBlockMorph) {
                    pb.nextBlock(block);
                }
            }
        } else if (this.element instanceof CommandSlotMorph) {
            // to be done: special case if block.isStop()
            this.element.nestedBlock(block);
            this.element = block;
            this.atEnd = true;
        } else {
            pb = this.element.parent;
            if (pb instanceof ScriptsMorph) {
                this.editor.add(block);
                block.setPosition(this.element.position());
                this.element.destroy();
            } else {
                pb.replaceInput(this.element, block);
            }
            this.element = block;
        }
        block.fixBlockColor();
        this.editor.adjustBounds();
        // block.scrollIntoView();
        this.fixLayout();

        // register generic hat blocks
        if (block.selector === 'receiveCondition') {
            rcvr = this.editor.scriptTarget();
            if (rcvr) {
                stage = rcvr.parentThatIsA(StageMorph);
                if (stage) {
                    stage.enableCustomHatBlocks = true;
                    stage.threads.pauseCustomHatBlocks = false;
                    ide = stage.parentThatIsA(IDE_Morph);
                    if (ide) {
                        ide.controlBar.stopButton.refresh();
                    }
                }
            }
        }

        // experimental: if the inserted block has inputs, go to the first one
        if (block.inputs && block.inputs().length) {
            this.element = block;
            this.atEnd = false;
            this.nextElement();
        }
    }

    insertVariableGetter() {
        const types = this.blockTypes();
        let vars;
        const myself = this;
        const menu = new MenuMorph();
        if (!types || !contains(types, 'reporter')) {
            return;
        }
        vars = InputSlotMorph.prototype.getVarNamesDict.call(this.element);
        Object.keys(vars).forEach(vName => {
            const block = SpriteMorph.prototype.variableBlock(vName);
            block.addShadow(new Point(3, 3));
            menu.addItem(
                block,
                () => {
                    block.removeShadow();
                    myself.insertBlock(block);
                }
            );
        });
        if (menu.items.length > 0) {
            menu.popup(this.world(), this.element.bottomLeft());
            menu.getFocus();
        }
    }

    stopEditing() {
        this.editor.focus = null;
        this.world().keyboardReceiver = null;
        this.destroy();
    }

    // ScriptFocusMorph navigation

    lastElement() {
        const items = this.items();
        let idx;
        if (!items.length) {
            this.shiftScript(new Point(-50, 0));
            return;
        }
        if (this.atEnd) {
            this.element = items[items.length - 1];
            this.atEnd = false;
        } else {
            idx = items.indexOf(this.element) - 1;
            if (idx < 0) {idx = items.length - 1; }
            this.element = items[idx];
        }
        if (this.element instanceof CommandSlotMorph &&
                this.element.nestedBlock()) {
            this.lastElement();
        } else if (this.element instanceof HatBlockMorph) {
            if (items.length > 1) {
                this.lastElement();
            } else {
                this.atEnd = true;
            }
        }
        this.fixLayout();
    }

    nextElement() {
        const items = this.items();
        let idx;
        let nb;
        if (!items.length) {
            this.shiftScript(new Point(50, 0));
            return;
        }
        idx = items.indexOf(this.element) + 1;
        if (idx >= items.length) {
            idx = 0;
        }
        this.atEnd = false;
        this.element = items[idx];
        if (this.element instanceof CommandSlotMorph) {
            nb = this.element.nestedBlock();
            if (nb) {this.element = nb; }
        } else if (this.element instanceof HatBlockMorph) {
            if (items.length === 1) {
                this.atEnd = true;
            } else {
                this.nextElement();
            }
        }
        this.fixLayout();
    }

    lastCommand() {
        const cm = this.element.parentThatIsA(CommandBlockMorph);
        let pb;
        if (!cm) {
            if (this.element instanceof ScriptsMorph) {
                this.shiftScript(new Point(0, -50));
            }
            return;
        }
        if (this.element instanceof CommandBlockMorph) {
            if (this.atEnd) {
                this.atEnd = false;
            } else {
                pb = cm.parent.parentThatIsA(CommandBlockMorph);
                if (pb) {
                    this.element = pb;
                } else {
                    pb = cm.topBlock().bottomBlock();
                    if (pb) {
                        this.element = pb;
                        this.atEnd = true;
                    }
                }
            }
        } else {
            this.element = cm;
            this.atEnd = false;
        }
        if (this.element instanceof HatBlockMorph && !this.atEnd) {
            this.lastCommand();
        }
        this.fixLayout();
    }

    nextCommand() {
        let cm = this.element;
        let tb;
        let nb;
        let cs;
        if (cm instanceof ScriptsMorph) {
            this.shiftScript(new Point(0, 50));
            return;
        }
        while (!(cm instanceof CommandBlockMorph)) {
            cm = cm.parent;
            if (cm instanceof ScriptsMorph) {
                return;
            }
        }
        if (this.atEnd) {
            cs = cm.parentThatIsA(CommandSlotMorph);
            if (cs) {
                this.element = cs.parentThatIsA(CommandBlockMorph);
                this.atEnd = false;
                this.nextCommand();
            } else {
                tb = cm.topBlock().parentThatIsA(CommandBlockMorph);
                if (tb) {
                    this.element = tb;
                    this.atEnd = false;
                    if (this.element instanceof HatBlockMorph) {
                        this.nextCommand();
                    }
                }
            }
        } else {
            nb = cm.nextBlock();
            if (nb) {
                this.element = nb;
            } else {
                this.element = cm;
                this.atEnd = true;
            }
        }
        this.fixLayout();
    }

    nextScript() {
        const scripts = this.sortedScripts();
        let idx;
        if (scripts.length < 1) {return; }
        if (this.element instanceof ScriptsMorph) {
            this.element = scripts[0];
        }
        idx = scripts.indexOf(this.element.topBlock()) + 1;
        if (idx >= scripts.length) {idx = 0; }
        this.element = scripts[idx];
        this.element.scrollIntoView();
        this.atEnd = false;
        if (this.element instanceof HatBlockMorph) {
            return this.nextElement();
        }
        this.fixLayout();
    }

    lastScript() {
        const scripts = this.sortedScripts();
        let idx;
        if (scripts.length < 1) {return; }
        if (this.element instanceof ScriptsMorph) {
            this.element = scripts[0];
        }
        idx = scripts.indexOf(this.element.topBlock()) - 1;
        if (idx < 0) {idx = scripts.length - 1; }
        this.element = scripts[idx];
        this.element.scrollIntoView();
        this.atEnd = false;
        if (this.element instanceof HatBlockMorph) {
            return this.nextElement();
        }
        this.fixLayout();
    }

    shiftScript(deltaPoint) {
        let tb;
        if (this.element instanceof ScriptsMorph) {
            this.moveBy(deltaPoint);
        } else {
            tb = this.element.topBlock();
            if (tb && !(tb instanceof PrototypeHatBlockMorph)) {
                tb.moveBy(deltaPoint);
            }
        }
        this.editor.adjustBounds();
        this.fixLayout();
    }

    newScript() {
        let pos = this.position();
        if (!(this.element instanceof ScriptsMorph)) {
            pos = this.element.topBlock().fullBounds().bottomLeft().add(
                new Point(0, 50)
            );
        }
        this.setPosition(pos);
        this.element = this.editor;
        this.editor.adjustBounds();
        this.fixLayout();
    }

    runScript() {
        if (this.element instanceof ScriptsMorph) {return; }
        this.element.topBlock().mouseClickLeft();
    }

    items() {
        if (this.element instanceof ScriptsMorph) {return []; }
        const script = this.element.topBlock();
        return script.allChildren().filter(each => each instanceof SyntaxElementMorph &&
            !(each instanceof TemplateSlotMorph) &&
            (!each.isStatic ||
                each.choices ||
                each instanceof BooleanSlotMorph ||
                each instanceof RingMorph ||
                each instanceof MultiArgMorph ||
                each instanceof CommandSlotMorph));
    }

    sortedScripts() {
        const scripts = this.editor.children.filter(each => each instanceof BlockMorph);
        scripts.sort((a, b) => // make sure the prototype hat block always stays on top
        (a instanceof PrototypeHatBlockMorph ? 0 : a.top() - b.top()));
        return scripts;
    }

    // ScriptFocusMorph undo / redo

    undrop() {
        this.editor.undrop();
    }

    redrop() {
        this.editor.redrop();
    }

    // ScriptFocusMorph block types

    blockTypes() {
        // answer an array of possible block types that fit into
        // the current situation, NULL if no block can be inserted

        if (this.element.isTemplate) {return null; }
        if (this.element instanceof ScriptsMorph) {
            return ['hat', 'command', 'reporter', 'predicate', 'ring'];
        }
        if (this.element instanceof HatBlockMorph ||
                this.element instanceof CommandSlotMorph) {
            return ['command'];
        }
        if (this.element instanceof CommandBlockMorph) {
            if (this.atEnd && this.element.isStop()) {
                return null;
            }
            if (this.element.parent instanceof ScriptsMorph) {
                return ['hat', 'command'];
            }
            return ['command'];
        }
        if (this.element instanceof ReporterBlockMorph) {
            if (this.element.getSlotSpec() === '%n') {
                return ['reporter'];
            }
            return ['reporter', 'predicate', 'ring'];
        }
        if (this.element.getSpec() === '%n') {
            return ['reporter'];
        }
        if (this.element.isStatic) {
            return null;
        }
        return ['reporter', 'predicate', 'ring'];
    }

    // ScriptFocusMorph keyboard events

    processKeyDown(event) {
        this.processKeyEvent(
            event,
            this.reactToKeyEvent
        );
    }

    processKeyUp(event) {
        nop(event);
    }

    processKeyPress(event) {
        nop(event);
    }

    processKeyEvent(event, action) {
        let keyName;
        let ctrl;
        let shift;

        //console.log(event.keyCode);
        this.world().hand.destroyTemporaries(); // remove result bubbles, if any
        switch (event.keyCode) {
        case 8:
            keyName = 'backspace';
            break;
        case 9:
            keyName = 'tab';
            break;
        case 13:
            keyName = 'enter';
            break;
        case 16:
        case 17:
        case 18:
            return;
        case 27:
            keyName = 'esc';
            break;
        case 32:
            keyName = 'space';
            break;
        case 37:
            keyName = 'left arrow';
            break;
        case 39:
            keyName = 'right arrow';
            break;
        case 38:
            keyName = 'up arrow';
            break;
        case 40:
            keyName = 'down arrow';
            break;
        default:
            keyName = String.fromCharCode(event.keyCode || event.charCode);
        }
        ctrl = (event.ctrlKey || event.metaKey) ? 'ctrl ' : '';
        shift = event.shiftKey ? 'shift ' : '';
        keyName = ctrl + shift + keyName;
        action.call(this, keyName);
    }

    reactToKeyEvent(key) {
        const evt = key.toLowerCase();
        const shift = 50;
        let types;
        let vNames;

        // console.log(evt);
        switch (evt) {
        case 'esc':
            return this.stopEditing();
        case 'enter':
            return this.trigger();
        case 'shift enter':
            return this.newScript();
        case 'ctrl shift enter':
            return this.runScript();
        case 'space':
            return this.menu();
        case 'left arrow':
            return this.lastElement();
        case 'shift left arrow':
            return this.shiftScript(new Point(-shift, 0));
        case 'right arrow':
            return this.nextElement();
        case 'shift right arrow':
            return this.shiftScript(new Point(shift, 0));
        case 'up arrow':
            return this.lastCommand();
        case 'shift up arrow':
            return this.shiftScript(new Point(0, -shift));
        case 'down arrow':
            return this.nextCommand();
        case 'shift down arrow':
            return this.shiftScript(new Point(0, shift));
        case 'tab':
            return this.nextScript();
        case 'shift tab':
            return this.lastScript();
        case 'backspace':
            return this.deleteLastElement();
        case 'ctrl z':
            return this.undrop();
        case 'ctrl y':
        case 'ctrl shift z':
            return this.redrop();
        case 'ctrl [': // ignore the first press of the Mac cmd key
            return;
        default:
            types = this.blockTypes();
            if (!(this.element instanceof ScriptsMorph) &&
                    types && contains(types, 'reporter')) {
                vNames = Object.keys(this.element.getVarNamesDict());
            }
            if (types) {
                delete this.fps;
                delete this.step;
                this.show();
                this.editor.scriptTarget().searchBlocks(
                    key,
                    types,
                    vNames,
                    this
                );
            }
        }
    }
}

