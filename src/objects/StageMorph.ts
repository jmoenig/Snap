// StageMorph /////////////////////////////////////////////////////////

import FrameMorph from "../morphic/morph/FrameMorph";

/*
    I inherit from FrameMorph and copy from SpriteMorph.
*/

// StageMorph preferences settings

StageMorph.prototype.dimensions = new Point(480, 360); // unscaled extent
StageMorph.prototype.frameRate = 0; // unscheduled per default

StageMorph.prototype.isCachingPrimitives
    = SpriteMorph.prototype.isCachingPrimitives;

StageMorph.prototype.sliderColor
    = SpriteMorph.prototype.sliderColor;

StageMorph.prototype.paletteTextColor
    = SpriteMorph.prototype.paletteTextColor;

StageMorph.prototype.hiddenPrimitives = {};
StageMorph.prototype.codeMappings = {};
StageMorph.prototype.codeHeaders = {};
StageMorph.prototype.enableCodeMapping = false;
StageMorph.prototype.enableInheritance = true;
StageMorph.prototype.enableSublistIDs = false;

// StageMorph instance creation

export default class StageMorph extends FrameMorph {
    constructor(globals) {
        this.init(globals);
    }

    init(globals) {
        this.name = localize('Stage');
        this.instrument = null;
        this.threads = new ThreadManager();
        this.variables = new VariableFrame(globals || null, this);
        this.scripts = new ScriptsMorph();
        this.customBlocks = [];
        this.globalBlocks = [];
        this.costumes = new List();
        this.costume = null;
        this.sounds = new List();
        this.version = Date.now(); // for observers
        this.isFastTracked = false;
        this.enableCustomHatBlocks = true;
        this.cloneCount = 0;

        this.timerStart = Date.now();
        this.tempo = 60; // bpm
        this.lastMessage = '';

        this.watcherUpdateFrequency = 2;
        this.lastWatcherUpdate = Date.now();

        this.scale = 1; // for display modes, do not persist

        this.keysPressed = {}; // for handling keyboard events, do not persist
        this.blocksCache = {}; // not to be serialized (!)
        this.paletteCache = {}; // not to be serialized (!)
        this.lastAnswer = ''; // last user input, do not persist
        this.activeSounds = []; // do not persist

        this.trailsCanvas = null;
        this.isThreadSafe = false;

        this.graphicsValues = {
            'color': 0,
            'fisheye': 0,
            'whirl': 0,
            'pixelate': 0,
            'mosaic': 0,
            'duplicate': 0,
            'negative': 0,
            'comic': 0,
            'confetti': 0,
            'saturation': 0,
            'brightness': 0
        };

        super.init.call(this);

        this.acceptsDrops = false;
        this.setColor(new Color(255, 255, 255));
        this.fps = this.frameRate;
    }

    // StageMorph scaling

    setScale(number) {
        const delta = number / this.scale;
        const pos = this.position();
        let relativePos;
        let bubble;
        const oldFlag = Morph.prototype.trackChanges;
        const myself = this;

        if (delta === 1) {return; }
        Morph.prototype.trackChanges = false;
        this.scale = number;
        this.setExtent(this.dimensions.multiplyBy(number));

        // now move and resize all children - sprites, bubbles, watchers etc..
        this.children.forEach(morph => {
            relativePos = morph.position().subtract(pos);
            morph.drawNew();
            morph.setPosition(
                relativePos.multiplyBy(delta).add(pos),
                true // just me (for nested sprites)
            );
            if (morph instanceof SpriteMorph) {
                bubble = morph.talkBubble();
                if (bubble) {
                    bubble.setScale(number);
                    morph.positionTalkBubble();
                }
            } else if (morph instanceof StagePrompterMorph) {
                if (myself.scale < 1) {
                    morph.setWidth(myself.width() - 10);
                } else {
                    morph.setWidth(myself.dimensions.x - 20);
                }
                morph.fixLayout();
                morph.setCenter(myself.center());
                morph.setBottom(myself.bottom());
            }
        });
        Morph.prototype.trackChanges = oldFlag;
        this.changed();
    }

    // StageMorph rendering

    drawNew() {
        let ctx;
        super.drawNew.call(this);
        if (this.costume) {
            ctx = this.image.getContext('2d');
            ctx.scale(this.scale, this.scale);
            ctx.drawImage(
                this.costume.contents,
                (this.width() / this.scale - this.costume.width()) / 2,
                (this.height() / this.scale - this.costume.height()) / 2
            );
            this.image = this.applyGraphicsEffects(this.image);
        }
        this.version = Date.now(); // for observer optimization
    }

    drawOn(aCanvas, aRect) {
        // make sure to draw the pen trails canvas as well
        let rectangle;

        let area;
        let delta;
        let src;
        let context;
        let w;
        let h;
        let sl;
        let st;
        let ws;
        let hs;
        if (!this.isVisible) {
            return null;
        }
        rectangle = aRect || this.bounds;
        area = rectangle.intersect(this.bounds);
        if (area.extent().gt(new Point(0, 0))) {
            delta = this.position().neg();
            src = area.copy().translateBy(delta);
            context = aCanvas.getContext('2d');
            context.globalAlpha = this.alpha;

            sl = src.left();
            st = src.top();
            w = Math.min(src.width(), this.image.width - sl);
            h = Math.min(src.height(), this.image.height - st);

            if (w < 1 || h < 1) {
                return null;
            }
            context.drawImage(
                this.image,
                sl,
                st,
                w,
                h,
                area.left(),
                area.top(),
                w,
                h
            );

            // pen trails
            ws = w / this.scale;
            hs = h / this.scale;
            context.save();
            context.scale(this.scale, this.scale);
            try {
                context.drawImage(
                    this.penTrails(),
                    sl / this.scale,
                    st / this.scale,
                    ws,
                    hs,
                    area.left() / this.scale,
                    area.top() / this.scale,
                    ws,
                    hs
                );
            } catch (err) { // sometimes triggered only by Firefox
                // console.log(err);
                context.restore();
                context.drawImage(
                    this.penTrails(),
                    0,
                    0,
                    this.dimensions.x,
                    this.dimensions.y,
                    this.left(),
                    this.top(),
                    this.dimensions.x * this.scale,
                    this.dimensions.y * this.scale
                );
            }
            context.restore();
        }
    }

    clearPenTrails() {
        this.trailsCanvas = newCanvas(this.dimensions);
        this.changed();
    }

    penTrails() {
        if (!this.trailsCanvas) {
            this.trailsCanvas = newCanvas(this.dimensions);
        }
        return this.trailsCanvas;
    }

    penTrailsMorph() {
        // for collision detection purposes
        const morph = new Morph();

        const trails = this.penTrails();
        let ctx;
        morph.bounds = this.bounds.copy();
        morph.image = newCanvas(this.extent());
        ctx = morph.image.getContext('2d');
        ctx.drawImage(
            trails,
            0,
            0,
            trails.width,
            trails.height,
            0,
            0,
            this.image.width,
            this.image.height
        );
        return morph;
    }

    colorFiltered(aColor, excludedSprite) {
        // answer a new Morph containing my image filtered by aColor
        // ignore the excludedSprite, because its collision is checked
        // ignore transparency (alpha)
        const morph = new Morph();

        const ext = this.extent();
        const img = this.thumbnail(ext, excludedSprite);
        let ctx;
        let src;
        let clr;
        let i;
        let dta;

        src = normalizeCanvas(img, true).getContext('2d').getImageData(
            0,
            0,
            ext.x,
            ext.y
        );
        morph.bounds = this.bounds.copy();
        morph.image = newCanvas(ext, true);
        ctx = morph.image.getContext('2d');
        dta = ctx.createImageData(ext.x, ext.y);
        for (i = 0; i < ext.x * ext.y * 4; i += 4) {
            clr = new Color(
                src.data[i],
                src.data[i + 1],
                src.data[i + 2]
            );
            if (clr.eq(aColor)) {
                dta.data[i] = src.data[i];
                dta.data[i + 1] = src.data[i + 1];
                dta.data[i + 2] = src.data[i + 2];
                dta.data[i + 3] = 255;
            }
        }
        ctx.putImageData(dta, 0, 0);
        return morph;
    }

    // StageMorph accessing

    watchers(leftPos) {
    /*
        answer an array of all currently visible watchers.
        If leftPos is specified, filter the list for all
        shown or hidden watchers whose left side equals
        the given border (for automatic positioning)
    */
        return this.children.filter(morph => {
            if (morph instanceof WatcherMorph) {
                if (leftPos) {
                    return morph.left() === leftPos;
                }
                return morph.isVisible;
            }
            return false;
        });
    }

    // StageMorph timer

    resetTimer() {
        this.timerStart = Date.now();
    }

    getTimer() {
        const elapsed = Math.floor((Date.now() - this.timerStart) / 100);
        return elapsed / 10;
    }

    // StageMorph tempo

    setTempo(bpm) {
        this.tempo = Math.max(20, (+bpm || 0));
    }

    changeTempo(delta) {
        this.setTempo(this.getTempo() + (+delta || 0));
    }

    getTempo() {
        return +this.tempo;
    }

    // StageMorph messages

    getLastMessage() {
        return this.lastMessage || '';
    }

    // StageMorph Mouse Coordinates

    reportMouseX() {
        const world = this.world();
        if (world) {
            return (world.hand.position().x - this.center().x) / this.scale;
        }
        return 0;
    }

    reportMouseY() {
        const world = this.world();
        if (world) {
            return (this.center().y - world.hand.position().y) / this.scale;
        }
        return 0;
    }

    // StageMorph drag & drop

    wantsDropOf(aMorph) {
        return aMorph instanceof SpriteMorph ||
            aMorph instanceof WatcherMorph ||
            aMorph instanceof ListWatcherMorph ||
            aMorph instanceof SpriteIconMorph;
    }

    reactToDropOf(morph, hand) {
        if (morph instanceof SpriteIconMorph) { // detach sprite from anchor
            if (morph.object.anchor) {
                morph.object.anchor.detachPart(morph.object);
            }
            this.world().add(morph);
            morph.slideBackTo(hand.grabOrigin);
        }
    }

    // StageMorph stepping

    step() {
        let current;
        let elapsed;
        let leftover;
        let ide;
        const world = this.world();

        // handle keyboard events
        if (world.keyboardReceiver === null) {
            world.keyboardReceiver = this;
        }
        if (world.currentKey === null) {
            this.keyPressed = null;
        }

        // manage threads
        if (this.enableCustomHatBlocks) {
            this.stepGenericConditions();
        }
        if (this.isFastTracked && this.threads.processes.length) {
            this.children.forEach(morph => {
                if (morph instanceof SpriteMorph) {
                    morph.wasWarped = morph.isWarped;
                    if (!morph.isWarped) {
                        morph.startWarp();
                    }
                }
            });
            while ((Date.now() - this.lastTime) < 100) {
                this.threads.step();
            }
            this.children.forEach(morph => {
                if (morph instanceof SpriteMorph) {
                    if (!morph.wasWarped) {
                        morph.endWarp();
                    }
                }
            });
            this.changed();
        } else {
            this.threads.step();

            // single-stepping hook:
            if (this.threads.wantsToPause) {
                ide = this.parentThatIsA(IDE_Morph);
                if (ide) {
                    ide.controlBar.pauseButton.refresh();
                }
            }
        }

        // update watchers
        current = Date.now();
        elapsed = current - this.lastWatcherUpdate;
        leftover = (1000 / this.watcherUpdateFrequency) - elapsed;
        if (leftover < 1) {
            this.watchers().forEach(w => {
                w.update();
            });
            this.lastWatcherUpdate = Date.now();
        }
    }

    stepGenericConditions(stopAll) {
        let hatCount = 0;
        const myself = this;
        let ide;
        this.children.concat(this).forEach(morph => {
            if (isSnapObject(morph)) {
                morph.allGenericHatBlocks().forEach(block => {
                    hatCount += 1;
                    myself.threads.doWhen(block, morph, stopAll);
                });
            }
        });
        if (!hatCount) {
            this.enableCustomHatBlocks = false;
            ide = this.parentThatIsA(IDE_Morph);
            if (ide) {
                ide.controlBar.stopButton.refresh();
            }
        }
    }

    developersMenu() {
        const myself = this;
        const menu = super.developersMenu.call(this);
        menu.addItem(
            "stop",
            () => {
                myself.threads.stopAll();
            },
            'terminate all running threads'
        );
        return menu;
    }

    // StageMorph keyboard events

    processKeyDown(event) {
        this.processKeyEvent(
            event,
            this.fireKeyEvent
        );
    }

    processKeyUp(event) {
        this.processKeyEvent(
            event,
            this.removePressedKey
        );
    }

    processKeyEvent(event, action) {
        let keyName;

        // this.inspectKeyEvent(event);
        switch (event.keyCode) {
        case 13:
            keyName = 'enter';
            if (event.ctrlKey || event.metaKey) {
                keyName = 'ctrl enter';
            } else if (event.shiftKey) {
                keyName = 'shift enter';
            }
            break;
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
            if (event.ctrlKey || event.metaKey) {
                keyName = `ctrl ${event.shiftKey ? 'shift ' : ''}${keyName}`;
            }
        }
        action.call(this, keyName);
    }

    fireKeyEvent(key) {
        const evt = key.toLowerCase();
        const procs = [];
        const ide = this.parentThatIsA(IDE_Morph);
        const myself = this;

        this.keysPressed[evt] = true;
        if (evt === 'ctrl enter') {
            return this.fireGreenFlagEvent();
        }
        if (evt === 'shift enter') {
            return this.editScripts();
        }
        if (evt === 'ctrl f') {
            if (!ide.isAppMode) {ide.currentSprite.searchBlocks(); }
            return;
        }
        if (evt === 'ctrl z') {
            if (!ide.isAppMode) {ide.currentSprite.scripts.undrop(); }
             return;
        }
        if (evt === 'ctrl shift z' || (evt === 'ctrl y')) {
            if (!ide.isAppMode) {ide.currentSprite.scripts.redrop(); }
             return;
        }
        if (evt === 'ctrl n') {
            if (!ide.isAppMode) {ide.createNewProject(); }
            return;
        }
        if (evt === 'ctrl o') {
            if (!ide.isAppMode) {ide.openProjectsBrowser(); }
            return;
        }
        if (evt === 'ctrl s') {
            if (!ide.isAppMode) {ide.save(); }
            return;
        }
        if (evt === 'ctrl shift s') {
            if (!ide.isAppMode) {return ide.saveProjectsBrowser(); }
            return;
        }
        if (evt === 'esc') {
            return this.fireStopAllEvent();
        }
        this.children.concat(this).forEach(morph => {
            if (isSnapObject(morph)) {
                morph.allHatBlocksForKey(evt).forEach(block => {
                    procs.push(myself.threads.startProcess(
                        block,
                        morph,
                        myself.isThreadSafe
                    ));
                });
            }
        });
        return procs;
    }

    removePressedKey(key) {
        delete this.keysPressed[key.toLowerCase()];
    }

    processKeyPress(event) {
        nop(event);
    }

    fireGreenFlagEvent() {
        const procs = [];
        const ide = this.parentThatIsA(IDE_Morph);
        const myself = this;

        this.children.concat(this).forEach(morph => {
            if (isSnapObject(morph)) {
                morph.allHatBlocksFor('__shout__go__').forEach(block => {
                    procs.push(myself.threads.startProcess(
                        block,
                        morph,
                        myself.isThreadSafe
                    ));
                });
            }
        });
        if (ide) {
            ide.controlBar.pauseButton.refresh();
        }
        return procs;
    }

    fireStopAllEvent() {
        const ide = this.parentThatIsA(IDE_Morph);
        this.threads.resumeAll(this.stage);
        this.keysPressed = {};
        this.threads.stopAll();
        this.stopAllActiveSounds();
        this.children.forEach(morph => {
            if (morph.stopTalking) {
                morph.stopTalking();
            }
        });
        this.removeAllClones();
        if (ide) {
            ide.nextSteps([
                nop,
                () => {ide.controlBar.pauseButton.refresh(); }
            ]);
        }
    }

    removeAllClones() {
        const myself = this;

        const clones = this.children.filter(
            morph => morph instanceof SpriteMorph && morph.isTemporary
        );

        clones.forEach(clone => {
            myself.threads.stopAllForReceiver(clone);
            clone.detachFromAnchor();
            clone.corpsify();
            clone.destroy();
        });
        this.cloneCount = 0;
    }

    editScripts() {
        const ide = this.parentThatIsA(IDE_Morph);
        let scripts;
        let sorted;
        if (ide.isAppMode || !ScriptsMorph.prototype.enableKeyboard) {return; }
        scripts = this.parentThatIsA(
            IDE_Morph
        ).currentSprite.scripts.selectForEdit(); // shadow on edit, if inherited
        scripts.edit(scripts.position());
        sorted = scripts.focus.sortedScripts();
        if (sorted.length) {
            scripts.focus.element = sorted[0];
            if (scripts.focus.element instanceof HatBlockMorph) {
                scripts.focus.nextCommand();
            }
        } else {
            scripts.focus.moveBy(new Point(50, 50));
        }
        scripts.focus.fixLayout();
    }

    // StageMorph block templates

    blockTemplates(category) {
        const blocks = [];
        const myself = this;
        let varNames;
        let button;
        const cat = category || 'motion';
        let txt;

        function block(selector) {
            if (myself.hiddenPrimitives[selector]) {
                return null;
            }
            const newBlock = SpriteMorph.prototype.blockForSelector(selector, true);
            newBlock.isTemplate = true;
            return newBlock;
        }

        function variableBlock(varName) {
            const newBlock = SpriteMorph.prototype.variableBlock(varName);
            newBlock.isDraggable = false;
            newBlock.isTemplate = true;
            return newBlock;
        }

        function watcherToggle(selector) {
            if (myself.hiddenPrimitives[selector]) {
                return null;
            }
            const info = SpriteMorph.prototype.blocks[selector];
            return new ToggleMorph(
                'checkbox',
                this,
                () => {
                    myself.toggleWatcher(
                        selector,
                        localize(info.spec),
                        myself.blockColor[info.category]
                    );
                },
                null,
                () => myself.showingWatcher(selector),
                null
            );
        }

        function variableWatcherToggle(varName) {
            return new ToggleMorph(
                'checkbox',
                this,
                () => {
                    myself.toggleVariableWatcher(varName);
                },
                null,
                () => myself.showingVariableWatcher(varName),
                null
            );
        }

        function addVar(pair) {
            if (pair) {
                if (myself.isVariableNameInUse(pair[0])) {
                    myself.inform('that name is already in use');
                } else {
                    myself.addVariable(pair[0], pair[1]);
                    myself.toggleVariableWatcher(pair[0], pair[1]);
                    myself.blocksCache[cat] = null;
                    myself.paletteCache[cat] = null;
                    myself.parentThatIsA(IDE_Morph).refreshPalette();
                }
            }
        }

        if (cat === 'motion') {

            txt = new TextMorph(localize(
                'Stage selected:\nno motion primitives'
            ));
            txt.fontSize = 9;
            txt.setColor(this.paletteTextColor);
            blocks.push(txt);

        } else if (cat === 'looks') {

            blocks.push(block('doSwitchToCostume'));
            blocks.push(block('doWearNextCostume'));
            blocks.push(watcherToggle('getCostumeIdx'));
            blocks.push(block('getCostumeIdx'));
            blocks.push('-');
            blocks.push(block('changeEffect'));
            blocks.push(block('setEffect'));
            blocks.push(block('clearEffects'));
            blocks.push('-');
            blocks.push(block('show'));
            blocks.push(block('hide'));

        // for debugging: ///////////////

            if (this.world().isDevMode) {
                blocks.push('-');
                txt = new TextMorph(localize(
                    'development mode \ndebugging primitives:'
                ));
                txt.fontSize = 9;
                txt.setColor(this.paletteTextColor);
                blocks.push(txt);
                blocks.push('-');
                blocks.push(block('log'));
                blocks.push(block('alert'));
                blocks.push('-');
                blocks.push(block('doScreenshot'));
            }

        /////////////////////////////////

        } else if (cat === 'sound') {

            blocks.push(block('playSound'));
            blocks.push(block('doPlaySoundUntilDone'));
            blocks.push(block('doStopAllSounds'));
            blocks.push('-');
            blocks.push(block('doRest'));
            blocks.push(block('doPlayNote'));
            blocks.push(block('doSetInstrument'));
            blocks.push('-');
            blocks.push(block('doChangeTempo'));
            blocks.push(block('doSetTempo'));
            blocks.push(watcherToggle('getTempo'));
            blocks.push(block('getTempo'));

        } else if (cat === 'pen') {

            blocks.push(block('clear'));
            blocks.push(block('reportPenTrailsAsCostume'));

        } else if (cat === 'control') {

            blocks.push(block('receiveGo'));
            blocks.push(block('receiveKey'));
            blocks.push(block('receiveInteraction'));
            blocks.push(block('receiveCondition'));
            blocks.push(block('receiveMessage'));
            blocks.push('-');
            blocks.push(block('doBroadcast'));
            blocks.push(block('doBroadcastAndWait'));
            blocks.push(watcherToggle('getLastMessage'));
            blocks.push(block('getLastMessage'));
            blocks.push('-');
            blocks.push(block('doWarp'));
            blocks.push('-');
            blocks.push(block('doWait'));
            blocks.push(block('doWaitUntil'));
            blocks.push('-');
            blocks.push(block('doForever'));
            blocks.push(block('doRepeat'));
            blocks.push(block('doUntil'));
            blocks.push('-');
            blocks.push(block('doIf'));
            blocks.push(block('doIfElse'));
            blocks.push('-');
            blocks.push(block('doReport'));
        /*
        // old STOP variants, migrated to a newer version, now redundant
            blocks.push(block('doStopBlock'));
            blocks.push(block('doStop'));
            blocks.push(block('doStopAll'));
        */
            blocks.push(block('doStopThis'));
            blocks.push(block('doStopOthers'));
            blocks.push('-');
            blocks.push(block('doRun'));
            blocks.push(block('fork'));
            blocks.push(block('evaluate'));
            blocks.push('-');
        /*
        // list variants commented out for now (redundant)
            blocks.push(block('doRunWithInputList'));
            blocks.push(block('forkWithInputList'));
            blocks.push(block('evaluateWithInputList'));
            blocks.push('-');
        */
            blocks.push(block('doCallCC'));
            blocks.push(block('reportCallCC'));
            blocks.push('-');
            blocks.push(block('createClone'));
            blocks.push(block('newClone'));
            blocks.push('-');
            blocks.push(block('doPauseAll'));
            blocks.push('-');
            blocks.push(block('doTellTo'));
            blocks.push(block('reportAskFor'));

        } else if (cat === 'sensing') {

            blocks.push(block('doAsk'));
            blocks.push(watcherToggle('getLastAnswer'));
            blocks.push(block('getLastAnswer'));
            blocks.push('-');
            blocks.push(watcherToggle('reportMouseX'));
            blocks.push(block('reportMouseX'));
            blocks.push(watcherToggle('reportMouseY'));
            blocks.push(block('reportMouseY'));
            blocks.push(block('reportMouseDown'));
            blocks.push('-');
            blocks.push(block('reportKeyPressed'));
            blocks.push('-');
            blocks.push(block('doResetTimer'));
            blocks.push(watcherToggle('getTimer'));
            blocks.push(block('getTimer'));
            blocks.push('-');
            blocks.push(block('reportAttributeOf'));

            if (SpriteMorph.prototype.enableFirstClass) {
                blocks.push(block('reportGet'));
            }
            blocks.push('-');

            blocks.push(block('reportURL'));
            blocks.push('-');
            blocks.push(block('reportIsFastTracking'));
            blocks.push(block('doSetFastTracking'));
            blocks.push('-');
            blocks.push(block('reportDate'));

        // for debugging: ///////////////

            if (this.world().isDevMode) {

                blocks.push('-');
                txt = new TextMorph(localize(
                    'development mode \ndebugging primitives:'
                ));
                txt.fontSize = 9;
                txt.setColor(this.paletteTextColor);
                blocks.push(txt);
                blocks.push('-');
                blocks.push(watcherToggle('reportThreadCount'));
                blocks.push(block('reportThreadCount'));
                blocks.push(block('colorFiltered'));
                blocks.push(block('reportStackSize'));
                blocks.push(block('reportFrameCount'));
            }

        /////////////////////////////////

        } else if (cat === 'operators') {

            blocks.push(block('reifyScript'));
            blocks.push(block('reifyReporter'));
            blocks.push(block('reifyPredicate'));
            blocks.push('#');
            blocks.push('-');
            blocks.push(block('reportSum'));
            blocks.push(block('reportDifference'));
            blocks.push(block('reportProduct'));
            blocks.push(block('reportQuotient'));
            blocks.push('-');
            blocks.push(block('reportModulus'));
            blocks.push(block('reportRound'));
            blocks.push(block('reportMonadic'));
            blocks.push(block('reportRandom'));
            blocks.push('-');
            blocks.push(block('reportLessThan'));
            blocks.push(block('reportEquals'));
            blocks.push(block('reportGreaterThan'));
            blocks.push('-');
            blocks.push(block('reportAnd'));
            blocks.push(block('reportOr'));
            blocks.push(block('reportNot'));
            blocks.push(block('reportBoolean'));
            blocks.push('-');
            blocks.push(block('reportJoinWords'));
            blocks.push(block('reportTextSplit'));
            blocks.push(block('reportLetter'));
            blocks.push(block('reportStringSize'));
            blocks.push('-');
            blocks.push(block('reportUnicode'));
            blocks.push(block('reportUnicodeAsLetter'));
            blocks.push('-');
            blocks.push(block('reportIsA'));
            blocks.push(block('reportIsIdentical'));

            if (true) { // (Process.prototype.enableJS) {
                blocks.push('-');
                blocks.push(block('reportJSFunction'));
            }

        // for debugging: ///////////////

            if (this.world().isDevMode) {
                blocks.push('-');
                txt = new TextMorph(
                    'development mode \ndebugging primitives:'
                );
                txt.fontSize = 9;
                txt.setColor(this.paletteTextColor);
                blocks.push(txt);
                blocks.push('-');
                blocks.push(block('reportTypeOf'));
                blocks.push(block('reportTextFunction'));
            }

        //////////////////////////////////

        } else if (cat === 'variables') {

            button = new PushButtonMorph(
                null,
                () => {
                    new VariableDialogMorph(
                        null,
                        addVar,
                        myself
                    ).prompt(
                        'Variable name',
                        null,
                        myself.world()
                    );
                },
                'Make a variable'
            );
            blocks.push(button);

            if (this.variables.allNames().length > 0) {
                button = new PushButtonMorph(
                    null,
                    () => {
                        const menu = new MenuMorph(
                            myself.deleteVariable,
                            null,
                            myself
                        );
                        myself.variables.allNames().forEach(name => {
                            menu.addItem(name, name);
                        });
                        menu.popUpAtHand(myself.world());
                    },
                    'Delete a variable'
                );
                blocks.push(button);
            }

            blocks.push('-');

            varNames = this.variables.allNames();
            if (varNames.length > 0) {
                varNames.forEach(name => {
                    blocks.push(variableWatcherToggle(name));
                    blocks.push(variableBlock(name));
                });
                blocks.push('-');
            }

            blocks.push(block('doSetVar'));
            blocks.push(block('doChangeVar'));
            blocks.push(block('doShowVar'));
            blocks.push(block('doHideVar'));
            blocks.push(block('doDeclareVariables'));
            blocks.push('=');
            blocks.push(block('reportNewList'));
            blocks.push('-');
            blocks.push(block('reportCONS'));
            blocks.push(block('reportListItem'));
            blocks.push(block('reportCDR'));
            blocks.push('-');
            blocks.push(block('reportListLength'));
            blocks.push(block('reportListContainsItem'));
            blocks.push('-');
            blocks.push(block('doAddToList'));
            blocks.push(block('doDeleteFromList'));
            blocks.push(block('doInsertInList'));
            blocks.push(block('doReplaceInList'));

        // for debugging: ///////////////

            if (this.world().isDevMode) {
                blocks.push('-');
                txt = new TextMorph(localize(
                    'development mode \ndebugging primitives:'
                ));
                txt.fontSize = 9;
                txt.setColor(this.paletteTextColor);
                blocks.push(txt);
                blocks.push('-');
                blocks.push(block('reportMap'));
                blocks.push('-');
                blocks.push(block('doForEach'));
                blocks.push(block('doShowTable'));
            }

        /////////////////////////////////

            blocks.push('=');

            if (StageMorph.prototype.enableCodeMapping) {
                blocks.push(block('doMapCodeOrHeader'));
                blocks.push(block('doMapValueCode'));
                blocks.push(block('doMapListCode'));
                blocks.push('-');
                blocks.push(block('reportMappedCode'));
                blocks.push('=');
            }

            button = new PushButtonMorph(
                null,
                () => {
                    const ide = myself.parentThatIsA(IDE_Morph);
                    new BlockDialogMorph(
                        null,
                        definition => {
                            if (definition.spec !== '') {
                                if (definition.isGlobal) {
                                    myself.globalBlocks.push(definition);
                                } else {
                                    myself.customBlocks.push(definition);
                                }
                                ide.flushPaletteCache();
                                ide.refreshPalette();
                                new BlockEditorMorph(definition, myself).popUp();
                            }
                        },
                        myself
                    ).prompt(
                        'Make a block',
                        null,
                        myself.world()
                    );
                },
                'Make a block'
            );
            blocks.push(button);
        }
        return blocks;
    }

    // StageMorph primitives

    clear() {
        this.clearPenTrails();
    }

    // StageMorph user menu

    userMenu() {
        const ide = this.parentThatIsA(IDE_Morph);
        const menu = new MenuMorph(this);
        const myself = this;

        if (ide && ide.isAppMode) {
            // menu.addItem('help', 'nop');
            return menu;
        }
        menu.addItem("edit", 'edit');
        menu.addItem("show all", 'showAll');
        menu.addItem(
            "pic...",
            () => {
                ide.saveCanvasAs(
                    myself.fullImageClassic(),
                    myself.name,
                    true // open as new window
                );
            },
            'open a new window\nwith a picture of the stage'
        );
        menu.addLine();
        menu.addItem(
            'pen trails',
            () => {
                const costume = ide.currentSprite.reportPenTrailsAsCostume().copy();
                ide.currentSprite.addCostume(costume);
                ide.currentSprite.wearCostume(costume);
                ide.hasChangedMedia = true;
                ide.spriteBar.tabBar.tabTo('costumes');
            },
            ide.currentSprite instanceof SpriteMorph ?
                'turn all pen trails and stamps\n' +
                    'into a new costume for the\ncurrently selected sprite'
                        : 'turn all pen trails and stamps\n' +
                            'into a new background for the stage'
        );
        return menu;
    }

    showAll() {
        const myself = this;
        this.children.forEach(m => {
            if (m instanceof SpriteMorph) {
                if (!m.anchor) {
                    m.show();
                    m.keepWithin(myself);
                }
            } else {
                m.show();
                m.keepWithin(myself);
                if (m.fixLayout) {m.fixLayout(); }
            }
        });
    }

    // StageMorph thumbnail

    thumbnail(extentPoint, excludedSprite) {
        /*
            answer a new Canvas of extentPoint dimensions containing
            my thumbnail representation keeping the originial aspect ratio
        */
        const myself = this;

        const src = this.image;

        const scale = Math.min(
            (extentPoint.x / src.width),
            (extentPoint.y / src.height)
        );

        const trg = newCanvas(extentPoint);
        const ctx = trg.getContext('2d');
        let fb;
        let fimg;

        ctx.scale(scale, scale);
        ctx.drawImage(
            src,
            0,
            0
        );
        ctx.drawImage(
            this.penTrails(),
            0,
            0,
            this.dimensions.x * this.scale,
            this.dimensions.y * this.scale
        );
        this.children.forEach(morph => {
            if (morph.isVisible && (morph !== excludedSprite)) {
                fb = morph.fullBounds();
                fimg = morph.fullImage();
                if (fimg.width && fimg.height) {
                    ctx.drawImage(
                        morph.fullImage(),
                        fb.origin.x - myself.bounds.origin.x,
                        fb.origin.y - myself.bounds.origin.y
                    );
                }
            }
        });
        return trg;
    }

    // StageMorph hiding and showing:

    /*
        override the inherited behavior to recursively hide/show all
        children.
    */

    hide() {
        this.isVisible = false;
        this.changed();
    }

    show() {
        this.isVisible = true;
        this.changed();
    }

    stopAllActiveSounds() {
        this.activeSounds.forEach(audio => {
            audio.pause();
        });
        this.activeSounds = [];
    }

    pauseAllActiveSounds() {
        this.activeSounds.forEach(audio => {
            audio.pause();
        });
    }

    resumeAllActiveSounds() {
        this.activeSounds.forEach(audio => {
            audio.play();
        });
    }

    mouseLeave() {
        this.receiveUserInteraction('mouse-departed');
    }

    // StageMorph inheritance support - general

    specimens() {
        return [];
    }

    allSpecimens() {
        return [];
    }

    // StageMorph inheritance support - attributes

    inheritsAttribute() {
        return false;
    }

    inheritedVariableNames() {
        return [];
    }

    allBlocks(valuesOnly) {
        const dict = this.ownBlocks();
        if (valuesOnly) {
            return Object.keys(dict).map(key => dict[key]);
        }
        return dict;
    }

    inheritedBlocks() {
        return [];
    }

    // StageMorph pen trails as costume

    reportPenTrailsAsCostume() {
        return new Costume(
            this.trailsCanvas,
            this.newCostumeName(localize('Background'))
        );
    }
}

StageMorph.prototype.inspectKeyEvent
    = CursorMorph.prototype.inspectKeyEvent;

StageMorph.prototype.edit = SpriteMorph.prototype.edit;

// StageMorph cloning override

StageMorph.prototype.createClone = nop;

// StageMorph pseudo-inherited behavior

StageMorph.prototype.categories = SpriteMorph.prototype.categories;
StageMorph.prototype.blockColor = SpriteMorph.prototype.blockColor;
StageMorph.prototype.paletteColor = SpriteMorph.prototype.paletteColor;
StageMorph.prototype.setName = SpriteMorph.prototype.setName;
StageMorph.prototype.palette = SpriteMorph.prototype.palette;
StageMorph.prototype.freshPalette = SpriteMorph.prototype.freshPalette;
StageMorph.prototype.blocksMatching = SpriteMorph.prototype.blocksMatching;
StageMorph.prototype.searchBlocks = SpriteMorph.prototype.searchBlocks;
StageMorph.prototype.reporterize = SpriteMorph.prototype.reporterize;
StageMorph.prototype.showingWatcher = SpriteMorph.prototype.showingWatcher;
StageMorph.prototype.addVariable = SpriteMorph.prototype.addVariable;
StageMorph.prototype.deleteVariable = SpriteMorph.prototype.deleteVariable;

// StageMorph block rendering

StageMorph.prototype.doScreenshot
    = SpriteMorph.prototype.doScreenshot;

StageMorph.prototype.newCostumeName
    = SpriteMorph.prototype.newCostumeName;

StageMorph.prototype.blockForSelector
    = SpriteMorph.prototype.blockForSelector;

// StageMorph variable watchers (for palette checkbox toggling)

StageMorph.prototype.findVariableWatcher
    = SpriteMorph.prototype.findVariableWatcher;

StageMorph.prototype.toggleVariableWatcher
    = SpriteMorph.prototype.toggleVariableWatcher;

StageMorph.prototype.showingVariableWatcher
    = SpriteMorph.prototype.showingVariableWatcher;

StageMorph.prototype.deleteVariableWatcher
    = SpriteMorph.prototype.deleteVariableWatcher;

// StageMorph background management

StageMorph.prototype.addCostume
    = SpriteMorph.prototype.addCostume;

StageMorph.prototype.wearCostume
    = SpriteMorph.prototype.wearCostume;

StageMorph.prototype.getCostumeIdx
    = SpriteMorph.prototype.getCostumeIdx;

StageMorph.prototype.doWearNextCostume
    = SpriteMorph.prototype.doWearNextCostume;

StageMorph.prototype.doWearPreviousCostume
    = SpriteMorph.prototype.doWearPreviousCostume;

StageMorph.prototype.doSwitchToCostume
    = SpriteMorph.prototype.doSwitchToCostume;

StageMorph.prototype.reportCostumes
    = SpriteMorph.prototype.reportCostumes;

// StageMorph graphic effects

StageMorph.prototype.graphicsChanged
    = SpriteMorph.prototype.graphicsChanged;

StageMorph.prototype.applyGraphicsEffects
    = SpriteMorph.prototype.applyGraphicsEffects;

StageMorph.prototype.setEffect
    = SpriteMorph.prototype.setEffect;

StageMorph.prototype.getGhostEffect
    = SpriteMorph.prototype.getGhostEffect;

StageMorph.prototype.changeEffect
    = SpriteMorph.prototype.changeEffect;

StageMorph.prototype.clearEffects
    = SpriteMorph.prototype.clearEffects;

// StageMorph sound management

StageMorph.prototype.addSound
    = SpriteMorph.prototype.addSound;

StageMorph.prototype.playSound
    = SpriteMorph.prototype.playSound;

StageMorph.prototype.reportSounds
    = SpriteMorph.prototype.reportSounds;

// StageMorph non-variable watchers

StageMorph.prototype.toggleWatcher
    = SpriteMorph.prototype.toggleWatcher;

StageMorph.prototype.showingWatcher
    = SpriteMorph.prototype.showingWatcher;

StageMorph.prototype.watcherFor =
    SpriteMorph.prototype.watcherFor;

StageMorph.prototype.getLastAnswer
    = SpriteMorph.prototype.getLastAnswer;

StageMorph.prototype.reportThreadCount
    = SpriteMorph.prototype.reportThreadCount;

// StageMorph message broadcasting

StageMorph.prototype.allMessageNames
    = SpriteMorph.prototype.allMessageNames;

StageMorph.prototype.allHatBlocksFor
    = SpriteMorph.prototype.allHatBlocksFor;

StageMorph.prototype.allHatBlocksForKey
    = SpriteMorph.prototype.allHatBlocksForKey;

StageMorph.prototype.allHatBlocksForInteraction
    = SpriteMorph.prototype.allHatBlocksForInteraction;

StageMorph.prototype.allGenericHatBlocks
    = SpriteMorph.prototype.allGenericHatBlocks;

// StageMorph events

StageMorph.prototype.mouseClickLeft
    = SpriteMorph.prototype.mouseClickLeft;

StageMorph.prototype.mouseEnter
    = SpriteMorph.prototype.mouseEnter;

StageMorph.prototype.mouseDownLeft
    = SpriteMorph.prototype.mouseDownLeft;

StageMorph.prototype.receiveUserInteraction
    = SpriteMorph.prototype.receiveUserInteraction;

// StageMorph custom blocks

StageMorph.prototype.deleteAllBlockInstances
    = SpriteMorph.prototype.deleteAllBlockInstances;

StageMorph.prototype.allBlockInstances
    = SpriteMorph.prototype.allBlockInstances;

StageMorph.prototype.allLocalBlockInstances
    = SpriteMorph.prototype.allLocalBlockInstances;

StageMorph.prototype.allEditorBlockInstances
    = SpriteMorph.prototype.allEditorBlockInstances;

StageMorph.prototype.paletteBlockInstance
    = SpriteMorph.prototype.paletteBlockInstance;

StageMorph.prototype.usesBlockInstance
    = SpriteMorph.prototype.usesBlockInstance;

StageMorph.prototype.doubleDefinitionsFor
    = SpriteMorph.prototype.doubleDefinitionsFor;

StageMorph.prototype.replaceDoubleDefinitionsFor
    = SpriteMorph.prototype.replaceDoubleDefinitionsFor;

StageMorph.prototype.allInvocationsOf
    = SpriteMorph.prototype.allInvocationsOf;

StageMorph.prototype.allIndependentInvocationsOf
    = SpriteMorph.prototype.allInvocationsOf;

StageMorph.prototype.allDependentInvocationsOf
    = SpriteMorph.prototype.allInvocationsOf;

StageMorph.prototype.shadowAttribute = nop;

// StageMorph inheritance support - variables

StageMorph.prototype.isVariableNameInUse
    = SpriteMorph.prototype.isVariableNameInUse;

StageMorph.prototype.globalVariables
    = SpriteMorph.prototype.globalVariables;

// StageMorph inheritance - custom blocks

StageMorph.prototype.getMethod
    = SpriteMorph.prototype.getMethod;

StageMorph.prototype.getLocalMethod
    = SpriteMorph.prototype.getLocalMethod;

StageMorph.prototype.ownBlocks
    = SpriteMorph.prototype.ownBlocks;

// StageMorph variable refactoring

StageMorph.prototype.hasSpriteVariable
    = SpriteMorph.prototype.hasSpriteVariable;

StageMorph.prototype.refactorVariableInstances
    = SpriteMorph.prototype.refactorVariableInstances;