/*

    debugger.js

    breakpoints and step-wise debugging for Snap!

    written by Ed Martin

    Copyright (C) 2026 by Ed Martin

    This file is part of Snap!.

    Snap! is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of
    the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.


    prerequisites:
    --------------
    needs morphic.js, widgets.js, blocks.js, threads.js, objects.js,
    gui.js and byob.js


    I. hierarchy
    -------------
    the following tree lists all constructors hierarchically,
    indentation indicating inheritance. Refer to this list to get a
    contextual overview:

    Morph*
        DebuggerMorph
        DebuggerToolbarMorph
        DebuggerStackRowMorph
        DebuggerVariableRowMorph
    PushButtonMorph**
        DebuggerButtonMorph
    DebuggerFrame

    * from morphic.js
    ** from widgets.js


    II. toc
    -------
    the following list shows the order in which all constructors are
    defined. Use this list to locate code in this document:

    ThreadManager and Process extensions
    DebuggerFrame
    DebuggerMorph
    DebuggerToolbarMorph
    DebuggerButtonMorph
    DebuggerStackRowMorph
    DebuggerVariableRowMorph


    III. overview
    -------------
    A breakpoint is a flag on a block instance (BlockMorph.hasBreakpoint).
    Whenever a Process makes a new Context current it calls
    registerContextPush(), which pauses all processes if that Context's
    block has a breakpoint, or if an in-flight Step Into / Over / Out
    request is satisfied. The paused process becomes the ThreadManager's
    debugProcess.

    While a debug session is active, the DebuggerMorph shows two tabs
    above the corral area: Call Stack, shown in the corral's place, and
    Sprites, showing the corral itself. It polls the ThreadManager every
    step and shows the paused process's call stack and script variables.

*/

/*global modules, Morph, Point, Color, PushButtonMorph, SymbolMorph, Process,
StringMorph, TextMorph, TabMorph, ScrollFrameMorph, ScriptsMorph, BlockMorph,
ThreadManager, IDE_Morph, StageMorph, BlockEditorMorph, CommandSlotMorph, nop,
PrototypeHatBlockMorph, BlockHighlightMorph, SpriteMorph, MorphicPreferences,
localize, contains, AlignmentMorph*/

/*jshint esversion: 11*/

// Global stuff ////////////////////////////////////////////////////////

modules.debugger = '2026-October-02';

var DebuggerFrame;
var DebuggerMorph;
var DebuggerToolbarMorph;
var DebuggerButtonMorph;
var DebuggerStackRowMorph;
var DebuggerVariableRowMorph;

// ThreadManager debugging /////////////////////////////////////////////

ThreadManager.prototype.toggleDebugging = function (stage) {
    Process.prototype.enableDebugging = !Process.prototype.enableDebugging;
    if (!Process.prototype.enableDebugging && this.debugProcess) {
        this.debugContinue(stage);
    }
};

ThreadManager.prototype.isDebugging = function () {
    // answer whether a debug session is in progress, i.e. the debugged
    // process is either paused or carrying out a step request
    var proc = this.debugProcess;
    return Process.prototype.enableDebugging &&
        proc !== null &&
        contains(this.processes, proc) &&
        (proc.isPaused || proc.stepRequest !== null);
};

ThreadManager.prototype.stepInto = function () {
    this.requestStep('into');
};

ThreadManager.prototype.stepOver = function () {
    this.requestStep('over');
};

ThreadManager.prototype.stepOut = function () {
    this.requestStep('out');
};

ThreadManager.prototype.requestStep = function (mode) {
    // resume only the debugged process, all others stay paused
    var proc = this.debugProcess;
    if (!proc || !proc.isPaused || !proc.context) {
        return;
    }
    proc.stepRequest = {
        mode: mode,
        depth: proc.context.stackSize(),
        outer: proc.context.outerContext || null
    };
    proc.isAtBreakpoint = false;
    proc.resume();
};

ThreadManager.prototype.debugContinue = function (stage) {
    // resume all processes until the next breakpoint is hit
    var ide;
    this.processes.forEach(proc => {
        proc.stepRequest = null;
        proc.isAtBreakpoint = false;
    });
    this.debugProcess = null;
    this.resumeAll(stage);
    if (stage) {
        ide = stage.parentThatIsA(IDE_Morph);
        if (ide && ide.controlBar.pauseButton) {
            ide.controlBar.pauseButton.refresh();
        }
    }
};

// Process debugging ///////////////////////////////////////////////////

Process.prototype.registerContextPush = function () {
    // called whenever a new Context becomes current, from pushContext()
    // and from the tail call branch of evaluateSequence(). A breakpoint
    // takes precedence over - and cancels - an in-flight step request
    if (!Process.prototype.enableDebugging || !this.context) {
        return;
    }
    if (!this.checkBreakpointHit()) {
        this.checkStepRequest();
    }
};

Process.prototype.checkBreakpointHit = function () {
    // pausing sets isPaused, which runStep() checks regardless of
    // isAtomic, so a breakpoint inside "warp" still yields
    var expr = this.context.expression;
    if (expr instanceof BlockMorph && expr.hasBreakpoint) {
        this.stepRequest = null;
        this.triggerDebuggerPause(true);
        return true;
    }
    return false;
};

Process.prototype.checkStepRequest = function () {
    // into - stop at the very next Context
    // over - stop at the next Context of the same call, or after
    //        returning from it
    // out  - stop only after returning from the current call
    //
    // Whether two Contexts belong to the same custom block invocation is
    // decided by outerContext identity, not by stack depth: tail call
    // elimination collapses the last statement of a custom block's body
    // onto its caller's depth, but every Context of one invocation
    // shares the same outerContext object.
    var req = this.stepRequest,
        depth,
        sameCall;
    if (!req) {
        return false;
    }
    depth = this.context.stackSize();
    sameCall = req.outer !== null && this.context.outerContext === req.outer;
    if (req.mode === 'into' ||
            (req.mode === 'over' && (sameCall || depth < req.depth)) ||
            (req.mode === 'out' && !sameCall && depth < req.depth)
    ) {
        this.stepRequest = null;
        this.triggerDebuggerPause(false);
        return true;
    }
    return false;
};

Process.prototype.triggerDebuggerPause = function (isBreakpoint) {
    // pause all processes and make this one the focus of the session
    var stage = this.homeContext.receiver &&
            this.homeContext.receiver.parentThatIsA(StageMorph),
        ide;
    this.isAtBreakpoint = isBreakpoint;
    if (stage) {
        stage.threads.debugProcess = this;
        stage.threads.pauseAll(stage);
        ide = stage.parentThatIsA(IDE_Morph);
        if (ide && ide.controlBar.pauseButton) {
            ide.controlBar.pauseButton.refresh();
        }
    } else {
        this.pause();
    }
};

// DebuggerFrame ///////////////////////////////////////////////////////

// I am one entry in the call stack of a paused process

// DebuggerFrame instance creation:

function DebuggerFrame(type, context, block, receiver) {
    this.init(type, context, block, receiver);
}

DebuggerFrame.prototype.init = function (type, context, block, receiver) {
    this.type = type; // 'paused', 'call' or 'hat'
    this.context = context || null;
    this.block = block || null; // paused block, call site or hat block
    this.receiver = this.context ? this.context.receiver : receiver || null;
    this.definition = type === 'call' ? this.definitionFor(block) : null;
    this.innerCallBlock = null; // the call in my script leading inwards
};

DebuggerFrame.prototype.definitionFor = function (callBlock) {
    // resolve local custom blocks the same way evaluateCustomBlock does
    if (callBlock.isGlobal) {
        return callBlock.definition;
    }
    if (this.receiver && this.receiver.getMethod) {
        return this.receiver.getMethod(callBlock.semanticSpec);
    }
    return callBlock.definition;
};

DebuggerFrame.prototype.caption = function (index) {
    if (index === 0) {
        return 'Paused at:';
    }
    if (index === 1) {
        return 'in:';
    }
    return '...which was called by:';
};

DebuggerFrame.prototype.blockMorph = function () {
    // answer a standalone morph showing just my block, or null
    var copy;
    if (this.type === 'call') {
        return this.definition ?
            new PrototypeHatBlockMorph(this.definition)
            : null;
    }
    if (!this.block) {
        return null;
    }
    copy = this.block.fullCopy();
    if (copy.nextBlock && copy.nextBlock()) {
        copy.nextBlock().destroy();
    }
    return copy;
};

DebuggerFrame.prototype.snapshot = function () {
    // answer an inert picture of my block, or null
    var morph = this.blockMorph(),
        img,
        pic;
    if (!morph) {
        return null;
    }
    img = morph.fullImage();
    pic = new Morph();
    pic.isCachingImage = true;
    pic.bounds.setExtent(new Point(img.width, img.height));
    pic.cachedImage = img;
    return pic;
};

// DebuggerMorph ///////////////////////////////////////////////////////

// I am the debugger panel. I take the place of the corral while a debug
// session is active, showing the paused process's call stack and the
// script variables of the selected frame.

// DebuggerMorph inherits from Morph:

DebuggerMorph.prototype = new Morph();
DebuggerMorph.prototype.constructor = DebuggerMorph;
DebuggerMorph.uber = Morph.prototype;

// DebuggerMorph preferences settings:

DebuggerMorph.prototype.padding = 5;
DebuggerMorph.prototype.getRenderColor =
    ScriptsMorph.prototype.getRenderColor;

// DebuggerMorph instance creation:

function DebuggerMorph(ide) {
    this.init(ide);
}

DebuggerMorph.prototype.init = function (ide) {
    // additional properties:
    this.ide = ide;
    this.tabBar = null;
    this.spritesTab = null;
    this.currentTab = 'callStack'; // or 'sprites'
    this.toolbar = null;
    this.stackFrame = null;
    this.selectedContext = null;
    this.highlightedBlock = null;
    this.lastContext = null;
    this.callSiteGlow = [];
    this.isSessionActive = false;
    this.wasCorralVisible = true;

    // initialize inherited properties:
    DebuggerMorph.uber.init.call(this);

    // override inherited properties:
    this.color = ide.groupColor;
    this.hide();

    this.buildPanes();
};

DebuggerMorph.prototype.buildPanes = function () {
    var tabCorner = 15;

    // the Sprites tab shows the corral, so other sprites' scripts can
    // still be reached while paused
    this.tabBar = new AlignmentMorph('row', -tabCorner * 2);
    this.spritesTab = this.createTab('sprites', 'Sprites', tabCorner);
    this.tabBar.add(this.spritesTab);
    this.tabBar.add(this.createTab('callStack', 'Call Stack', tabCorner));
    this.tabBar.fixLayout();
    this.add(this.tabBar);

    this.toolbar = new DebuggerToolbarMorph(this);
    this.add(this.toolbar);

    this.stackFrame = new ScrollFrameMorph(null, null, this.ide.sliderColor);
    this.stackFrame.color = this.color;
    this.stackFrame.acceptsDrops = false;
    this.stackFrame.contents.acceptsDrops = false;
    this.stackFrame.adjustScrollBars = function () {
        // scroll by dragging only, without visible scroll bars
        ScrollFrameMorph.prototype.adjustScrollBars.call(this);
        this.hBar.hide();
        this.vBar.hide();
    };
    this.add(this.stackFrame);
};

DebuggerMorph.prototype.createTab = function (name, label, corner) {
    var tabColors = this.ide.tabColors,
        tab = new TabMorph(
            tabColors,
            this, // target
            () => this.tabTo(name),
            localize(label),
            () => this.currentTab === name // query
        );

    tab.padding = 3;
    tab.corner = corner;
    tab.edge = 1;
    tab.labelShadowOffset = new Point(-1, -1);
    tab.labelShadowColor = tabColors[1];
    tab.labelColor = this.ide.buttonLabelColor;
    tab.fixLayout();
    tab.refresh();
    return tab;
};

// DebuggerMorph tabs:

DebuggerMorph.prototype.tabTo = function (name) {
    this.currentTab = name;
    this.applyTab();
};

DebuggerMorph.prototype.applyTab = function () {
    // show either the call stack, or the corral beneath my tabs
    var ide = this.ide,
        isStack = this.currentTab === 'callStack';

    this.tabBar.children.forEach(tab => tab.refresh());
    [this.toolbar, this.stackFrame].forEach(m => {
        if (isStack) {
            m.show();
        } else {
            m.hide();
        }
    });
    if (isStack) {
        ide.corralBar.hide();
        ide.corral.hide();
    } else {
        ide.corralBar.show();
        ide.corral.show();
    }
    ide.fixLayout();
};

DebuggerMorph.prototype.tabsHeight = function () {
    // answer how far my tabs push the corral down, if shown
    return this.isVisible ? this.tabBar.height() + this.padding : 0;
};

// DebuggerMorph layout:

DebuggerMorph.prototype.fixLayout = function () {
    var pad = this.padding;

    this.tabBar.setPosition(this.position().add(new Point(pad, pad)));
    this.toolbar.setPosition(
        new Point(this.left() + pad, this.tabBar.bottom() + 4)
    );
    this.toolbar.fixLayout(this.width() - pad * 2);
    this.stackFrame.setPosition(
        new Point(this.left() + pad, this.toolbar.bottom() + 4)
    );
    this.stackFrame.setExtent(new Point(
        this.width() - pad * 2,
        Math.max(this.bottom() - this.stackFrame.top() - pad, 40)
    ));
};

// DebuggerMorph stepping:

DebuggerMorph.prototype.step = function () {
    // poll the interpreter for the start and end of a debug session.
    // Note: hidden morphs are stepped, too
    var threads = this.ide.stage ? this.ide.stage.threads : null,
        isActive,
        proc;

    if (!threads) {
        return;
    }
    isActive = threads.isDebugging();
    if (isActive !== this.isSessionActive) {
        this.isSessionActive = isActive;
        if (isActive) {
            this.currentTab = 'callStack';
        } else {
            this.endSession();
        }
    }
    this.showTabs(isActive && !this.ide.isAppMode);
    proc = threads.debugProcess;
    if (isActive && this.isVisible && proc.isPaused &&
            proc.context !== this.lastContext) {
        this.lastContext = proc.context;
        this.refresh();
    }
};

DebuggerMorph.prototype.showTabs = function (bool) {
    // show or hide my tabs above the corral area. Don't offer the Sprites
    // tab if the corral was hidden anyway
    var ide = this.ide;
    if (bool === this.isVisible) {
        return;
    }
    if (bool) {
        if (!this.isSessionActive || this.currentTab === 'callStack') {
            this.wasCorralVisible = ide.corral.isVisible;
        }
        if (this.wasCorralVisible) {
            this.spritesTab.show();
        } else {
            this.spritesTab.hide();
            this.currentTab = 'callStack';
        }
        this.show();
        this.applyTab();
    } else {
        this.hide();
        if (!ide.isAppMode && this.wasCorralVisible) {
            ide.corralBar.show();
            ide.corral.show();
        }
        ide.fixLayout();
    }
};

DebuggerMorph.prototype.endSession = function () {
    this.ide.stage.threads.debugProcess = null;
    this.clearHighlights(this.highlightedBlock);
    this.highlightedBlock = null;
    this.callSiteGlow.forEach(block => this.clearHighlights(block));
    this.callSiteGlow = [];
    this.stackFrame.contents.children.slice().forEach(m => m.destroy());
    this.selectedContext = null;
    this.lastContext = null;
};

// DebuggerMorph session control:

DebuggerMorph.prototype.stepInto = function () {
    this.ide.stage.threads.stepInto();
};

DebuggerMorph.prototype.stepOver = function () {
    this.ide.stage.threads.stepOver();
};

DebuggerMorph.prototype.stepOut = function () {
    this.ide.stage.threads.stepOut();
};

DebuggerMorph.prototype.toggleDebugging = function () {
    var stage = this.ide.stage;
    stage.threads.toggleDebugging(stage);
    this.refreshBreakpointMarkers();
};

DebuggerMorph.prototype.refreshBreakpointMarkers = function () {
    // redraw breakpoint markers in all scripts and custom block
    // definitions of the current scene, and in any open Block Editors.
    // Note: refreshIDE() would lose all breakpoints, they aren't saved
    var ide = this.ide,
        world = this.world(),
        roots = [];

    ide.sprites.asArray().concat([ide.stage]).forEach(obj =>
        roots.push(...obj.allScripts())
    );
    if (world) {
        roots.push(...world.children.filter(m =>
            m instanceof BlockEditorMorph
        ));
    }
    roots.forEach(root => root.forAllChildren(m => {
        if (m instanceof BlockMorph && m.hasBreakpoint) {
            m.rerender();
        }
    }));
};

// DebuggerMorph call stack:

DebuggerMorph.prototype.callStack = function () {
    // answer a list of DebuggerFrames: the paused block, then one frame
    // per enclosing custom block invocation, then the script's hat block
    var proc = this.ide.stage.threads.debugProcess,
        frames = [],
        ctx;

    if (!proc) {
        return frames;
    }
    ctx = proc.context;
    while (ctx && !(ctx.expression instanceof BlockMorph)) {
        ctx = ctx.parentContext;
    }
    if (!ctx) {
        return frames;
    }
    frames.push(new DebuggerFrame('paused', ctx, ctx.expression));

    // start at the paused Context itself: if it is the last statement of
    // a custom block's body tail call elimination has merged it with
    // the Context marking that call
    while (ctx) {
        if (ctx.isCustomBlock && ctx.debugCallBlock) {
            frames.push(new DebuggerFrame('call', ctx, ctx.debugCallBlock));
        }
        ctx = ctx.parentContext;
    }
    if (proc.topBlock instanceof BlockMorph) {
        frames.push(new DebuggerFrame(
            'hat',
            null,
            proc.topBlock,
            proc.homeContext ? proc.homeContext.receiver : null
        ));
    }
    frames.forEach((frame, i) => {
        var inner = frames[i - 1];
        if (inner && inner.type === 'call') {
            frame.innerCallBlock = inner.block;
        }
    });
    return frames;
};

DebuggerMorph.prototype.enclosingCall = function (ctx) {
    // answer the Context marking the custom block invocation ctx is in
    var c = ctx;
    while (c) {
        if (c.isCustomBlock && c.debugCallBlock) {
            return c;
        }
        c = c.parentContext;
    }
    return null;
};

DebuggerMorph.prototype.refresh = function () {
    // rebuild the call stack rows and show the innermost frame
    var frames = this.callStack(),
        contents = this.stackFrame.contents,
        maxWidth = this.stackFrame.width(),
        y = 0,
        rows;

    contents.children.slice().forEach(m => m.destroy());
    rows = frames.map((frame, i) => {
        var row = new DebuggerStackRowMorph(this, frame, i);
        row.setPosition(contents.position().add(new Point(0, y)));
        contents.add(row);
        y += row.height() + 6;
        maxWidth = Math.max(maxWidth, row.width());
        return row;
    });
    contents.setExtent(new Point(maxWidth, y));
    this.fixLayout();
    this.updateStepButtons();

    if (rows.length) {
        this.activateFrame(frames[0]);
    } else {
        this.refreshWatchers(null);
        this.refreshCallSiteGlow(frames);
    }
};

DebuggerMorph.prototype.activateFrame = function (frame) {
    // show a call stack frame's block and variables
    if (frame.type === 'call') {
        this.openEditorFor(frame.definition, frame.receiver);
    } else {
        this.selectRealBlock(frame.block, frame.context, frame.receiver);
    }
    this.selectedContext = frame.context;
    this.refreshWatchers(frame.context);
    this.refreshCallSiteGlow(this.callStack());
};

// DebuggerMorph navigating to blocks:

DebuggerMorph.prototype.openEditorFor = function (definition, receiver) {
    // build the editor directly rather than with the call site's edit(),
    // which fails for call sites not currently shown anywhere.
    // An already open editor for the same definition gets replaced, so
    // keep its position and size
    var world = this.world(),
        instances = world ?
            BlockEditorMorph.prototype.instances[world.stamp] : null,
        existing,
        editor;

    if (!definition || !receiver) {
        return;
    }
    existing = instances ? instances['editBlock' + definition.spec] : null;
    if (existing) {
        definition.editorDimensions = existing.bounds.copy();
    }
    editor = new BlockEditorMorph(definition, receiver);
    editor.popUp();
    editor.changed();

    // opening an editor recolors its blocks, erasing the paused block's
    // flash, so reapply it once the editor has settled
    this.onNextStep = () => this.reflash();
};

DebuggerMorph.prototype.reflash = function () {
    var proc = this.ide.stage.threads.debugProcess;
    if (proc) {
        proc.unflash();
        proc.flashPausedContext();
    }
    this.refreshCallSiteGlow(this.callStack());
};

DebuggerMorph.prototype.selectRealBlock = function (block, ctx, receiver) {
    // bring an actual block into view, opening its custom block's editor
    // or selecting its sprite if necessary, and highlight it
    var call;

    if (!(block instanceof BlockMorph)) {
        return;
    }
    if (!block.world()) {
        call = ctx ? this.enclosingCall(ctx) : null;
        if (call) {
            this.openEditorFor(
                new DebuggerFrame('call', call, call.debugCallBlock)
                    .definition,
                call.receiver
            );
            // a just opened editor needs one step to lay itself out
            this.onNextStep = () => this.highlightBlock(block, true);
            return;
        }
        if (receiver && receiver !== this.ide.currentSprite) {
            this.ide.selectSprite(receiver);
        }
    }
    this.highlightBlock(block, false);
};

DebuggerMorph.prototype.highlightBlock = function (block, isNewEditor) {
    var editor,
        world;

    this.clearHighlights(this.highlightedBlock);
    this.highlightedBlock = null;
    if (block.world()) {
        this.clearHighlights(block);
        block.scrollIntoView();
        editor = block.parentThatIsA(BlockEditorMorph);
        world = block.world();
        if (editor) {
            world.add(editor); // bring to front
            world.keyboardFocus = editor;
        }
        block.addHighlight();
        this.highlightedBlock = block;
    }
    if (isNewEditor) {
        this.reflash();
    }
};

DebuggerMorph.prototype.refreshCallSiteGlow = function (frames) {
    // highlight the call sites leading to the pause wherever they are
    // already visible
    var glowing = [];

    this.callSiteGlow.forEach(block => this.clearHighlights(block));
    frames.forEach(frame => {
        var block = frame.innerCallBlock;
        if (block && block !== this.highlightedBlock && block.world()) {
            this.clearHighlights(block);
            block.addHighlight();
            glowing.push(block);
        }
    });
    this.callSiteGlow = glowing;
};

DebuggerMorph.prototype.clearHighlights = function (block) {
    // remove all highlights, including the ones the ThreadManager adds
    // to running scripts (removeHighlight() only removes one)
    if (!block) {
        return;
    }
    block.children.slice().forEach(child => {
        if (child instanceof BlockHighlightMorph) {
            block.removeChild(child);
        }
    });
    block.afterglow = 0;
    block.fullChanged();
};

// DebuggerMorph step buttons:

DebuggerMorph.prototype.canStepInto = function () {
    // only if the paused block is a custom block or has a non-empty C-slot
    var proc = this.ide.stage.threads.debugProcess,
        block = proc && proc.context ? proc.context.expression : null;

    if (!(block instanceof BlockMorph)) {
        return false;
    }
    if (block.isCustomBlock) {
        return true;
    }
    return block.inputs().some(slot =>
        slot instanceof CommandSlotMorph && slot.nestedBlock()
    );
};

DebuggerMorph.prototype.canStepOut = function () {
    // only from within a custom block
    var proc = this.ide.stage.threads.debugProcess;
    return proc ? this.enclosingCall(proc.context) !== null : false;
};

DebuggerMorph.prototype.updateStepButtons = function () {
    this.toolbar.intoButton.setEnabled(this.canStepInto());
    this.toolbar.outButton.setEnabled(this.canStepOut());
};

// DebuggerMorph script variables:

DebuggerMorph.prototype.refreshWatchers = function (ctx) {
    // show the script variables, parameters and upvars visible from
    // the selected frame beneath the call stack rows
    var contents = this.stackFrame.contents,
        names = [],
        rows = [],
        maxWidth = contents.width(),
        y = 0,
        header;

    contents.children.filter(m =>
        !(m instanceof DebuggerStackRowMorph)
    ).forEach(m => m.destroy());
    contents.children.forEach(m =>
        y = Math.max(y, m.bottom() - contents.top())
    );
    y += 6;

    if (ctx) {
        names = ctx.variables.allNames(
            ctx.receiver ? ctx.receiver.variables : undefined
        );
    }
    if (names.length) {
        header = new TextMorph(localize('Script Variables'), 11, null, true);
        header.setColor(this.ide.buttonLabelColor);
        rows.push(header);
        names.forEach(name =>
            rows.push(new DebuggerVariableRowMorph(
                name,
                ctx,
                this.ide.buttonLabelColor
            ))
        );
    }
    rows.forEach(row => {
        row.setPosition(contents.position().add(new Point(3, y)));
        contents.add(row);
        y += row.height() + 3;
        maxWidth = Math.max(maxWidth, row.right() - contents.left());
    });
    contents.setExtent(new Point(maxWidth, y));
};

// DebuggerToolbarMorph ////////////////////////////////////////////////

// I am the row of Continue and Step buttons in the debugger panel

// DebuggerToolbarMorph inherits from Morph:

DebuggerToolbarMorph.prototype = new Morph();
DebuggerToolbarMorph.prototype.constructor = DebuggerToolbarMorph;
DebuggerToolbarMorph.uber = Morph.prototype;

// DebuggerToolbarMorph instance creation:

function DebuggerToolbarMorph(panel) {
    this.init(panel);
}

DebuggerToolbarMorph.prototype.init = function (panel) {
    var ide = panel.ide;

    // additional properties:
    this.continueButton = new DebuggerButtonMorph(
        ide,
        'togglePauseResume',
        'pointRight',
        null,
        'Continue Running',
        ide
    );
    this.overButton = new DebuggerButtonMorph(
        panel,
        'stepOver',
        'stepForward',
        null,
        'Step forward just one\nblock and pause again',
        ide
    );
    this.intoButton = new DebuggerButtonMorph(
        panel,
        'stepInto',
        'stepIn',
        'Step Into',
        'Step into and pause\ninside this block',
        ide
    );
    this.outButton = new DebuggerButtonMorph(
        panel,
        'stepOut',
        'stepOut',
        'Step Out',
        'Finish this function and\npause where it was called from',
        ide
    );
    this.order = [
        this.continueButton,
        this.overButton,
        this.intoButton,
        this.outButton
    ];

    // initialize inherited properties:
    DebuggerToolbarMorph.uber.init.call(this);

    // override inherited properties:
    this.color = ide.groupColor;

    this.order.forEach(button => this.add(button));
    this.fixLayout();
};

// DebuggerToolbarMorph layout:

DebuggerToolbarMorph.prototype.fixLayout = function (width) {
    // Continue and Step Over are icon-only squares, Step Into and Step
    // Out share the remaining width
    var pad = 6,
        squares = [this.continueButton, this.overButton],
        wides = [this.intoButton, this.outButton],
        w = width || (30 * 2 + 94 * 2 + pad * 3),
        x = this.left(),
        size,
        wideWidth,
        rowHeight;

    squares.forEach(button => this.sizeButton(button, 0, 0));
    size = Math.max(
        squares[0].width(),
        squares[0].height(),
        squares[1].width(),
        squares[1].height()
    );
    squares.forEach(button => this.sizeButton(button, size, size));
    rowHeight = size;

    wideWidth = Math.max(
        30,
        Math.floor(
            (w - size * 2 - pad * (this.order.length - 1)) / wides.length
        )
    );
    wides.forEach(button => {
        this.sizeButton(button, wideWidth, rowHeight);
        rowHeight = Math.max(rowHeight, button.height());
    });

    this.order.forEach(button => {
        button.setPosition(new Point(x, this.top()));
        x += button.width() + pad;
    });
    this.bounds.setWidth(Math.max(w, x - pad - this.left()));
    this.bounds.setHeight(rowHeight);
};

DebuggerToolbarMorph.prototype.sizeButton = function (button, width, height) {
    // make a button this size, unless its label needs more room
    var inset = (button.padding + button.outline + button.edge) * 2;
    button.labelMinExtent = new Point(
        Math.max(0, width - inset),
        Math.max(0, height - inset)
    );
    button.fixLayout();
};

// DebuggerButtonMorph /////////////////////////////////////////////////

// I am a push button showing an icon, optionally followed by text

// DebuggerButtonMorph inherits from PushButtonMorph:

DebuggerButtonMorph.prototype = new PushButtonMorph();
DebuggerButtonMorph.prototype.constructor = DebuggerButtonMorph;
DebuggerButtonMorph.uber = PushButtonMorph.prototype;

// DebuggerButtonMorph instance creation:

function DebuggerButtonMorph(target, action, symbolName, text, hint, ide) {
    this.init(target, action, symbolName, text, hint, ide);
}

DebuggerButtonMorph.prototype.init = function (
    target,
    action,
    symbolName,
    text,
    hint,
    ide
) {
    var colors = ide.isBright ? ide.tabColors : [
            ide.groupColor,
            ide.frameColor.darker(50),
            ide.frameColor.darker(50)
        ];

    // additional properties:
    this.symbolName = symbolName;
    this.enabledColor = colors[0];
    this.enabledHighlightColor = colors[1];
    this.enabledLabelColor = ide.isBright ?
        new Color(220, 185, 0) : new Color(255, 220, 0);
    if (MorphicPreferences.isFlat) {
        // no pill, only the greyed out label shows that I'm disabled
        this.disabledColor = this.enabledColor;
    } else {
        this.disabledColor = ide.isBright ?
            new Color(190, 190, 190) : new Color(70, 70, 70);
    }
    this.disabledLabelColor = ide.isBright ?
        new Color(120, 120, 120) : new Color(150, 150, 150);

    // initialize inherited properties:
    DebuggerButtonMorph.uber.init.call(
        this,
        target,
        action,
        text,
        null,
        hint
    );

    // override inherited properties:
    this.hasNeutralBackground = true;
    this.corner = 14;
    this.padding = 6;
    this.fontSize = 12;
    this.labelShadowOffset = new Point(-1, -1);
    this.labelShadowColor = colors[1];
    this.contrast = ide.buttonContrast;
    this.setEnabled(true);
};

DebuggerButtonMorph.prototype.createLabel = function () {
    var shading = !MorphicPreferences.isFlat || this.is3D,
        icon = new SymbolMorph(this.symbolName, 20),
        text;

    if (this.label !== null) {
        this.label.destroy();
    }
    if (shading) {
        icon.shadowOffset = this.labelShadowOffset;
        icon.shadowColor = this.labelShadowColor;
    }
    icon.color = this.labelColor;
    if (!this.labelString) {
        this.label = icon;
        this.add(this.label);
        return;
    }
    text = new StringMorph(
        localize(this.labelString),
        this.fontSize,
        this.fontStyle,
        true,
        false,
        false,
        shading ? this.labelShadowOffset : null,
        this.labelShadowColor,
        this.labelColor
    );
    this.label = new Morph();
    this.label.alpha = 0;
    this.label.add(icon);
    this.label.add(text);
    text.setCenter(icon.center());
    text.setLeft(icon.right() + 4);
    this.label.bounds = icon.bounds.merge(text.bounds);
    this.label.rerender();
    this.add(this.label);
};

DebuggerButtonMorph.prototype.setEnabled = function (bool) {
    // use solid grey rather than disable(), which only fades me
    this.isDisabled = !bool;
    this.color = bool ? this.enabledColor : this.disabledColor;
    this.highlightColor = bool ? this.enabledHighlightColor
        : this.disabledColor;
    this.pressColor = this.color;
    this.labelColor = bool ? this.enabledLabelColor : this.disabledLabelColor;
    this.createLabel();
    this.fixLayout();
    this.rerender();
};

// DebuggerStackRowMorph ///////////////////////////////////////////////

// I am one row in the debugger's call stack: a caption and a picture of
// the frame's block

// DebuggerStackRowMorph inherits from Morph:

DebuggerStackRowMorph.prototype = new Morph();
DebuggerStackRowMorph.prototype.constructor = DebuggerStackRowMorph;
DebuggerStackRowMorph.uber = Morph.prototype;

// DebuggerStackRowMorph instance creation:

function DebuggerStackRowMorph(panel, frame, index) {
    this.init(panel, frame, index);
}

DebuggerStackRowMorph.prototype.init = function (panel, frame, index) {
    // additional properties:
    this.panel = panel;
    this.frame = frame;
    this.captionLabel = new TextMorph(
        localize(frame.caption(index)),
        10,
        null,
        true
    );
    this.snapshot = frame.snapshot();

    // initialize inherited properties:
    DebuggerStackRowMorph.uber.init.call(this);

    // override inherited properties:
    this.color = panel.color;

    this.add(this.captionLabel);
    if (this.snapshot) {
        this.add(this.snapshot);
    }
    this.captionLabel.setColor(panel.ide.buttonLabelColor);
    this.fixLayout();
};

// DebuggerStackRowMorph layout:

DebuggerStackRowMorph.prototype.fixLayout = function () {
    var width = this.captionLabel.width(),
        bottom;

    this.captionLabel.setPosition(this.position());
    bottom = this.captionLabel.bottom();
    if (this.snapshot) {
        this.snapshot.setPosition(
            new Point(this.left(), this.captionLabel.bottom() + 2)
        );
        width = Math.max(width, this.snapshot.width());
        bottom = this.snapshot.bottom();
    }
    this.bounds.setExtent(new Point(width, bottom - this.top()));
};

// DebuggerStackRowMorph events:

DebuggerStackRowMorph.prototype.mouseClickLeft = function () {
    this.panel.activateFrame(this.frame);
};

DebuggerStackRowMorph.prototype.contextMenu = nop;

// DebuggerVariableRowMorph ////////////////////////////////////////////

// I show a script variable of a paused process and its value. Clicking
// my variable block shows its current value in a speech bubble

// DebuggerVariableRowMorph inherits from Morph:

DebuggerVariableRowMorph.prototype = new Morph();
DebuggerVariableRowMorph.prototype.constructor = DebuggerVariableRowMorph;
DebuggerVariableRowMorph.uber = Morph.prototype;

// DebuggerVariableRowMorph instance creation:

function DebuggerVariableRowMorph(name, context, textColor) {
    this.init(name, context, textColor);
}

DebuggerVariableRowMorph.prototype.init = function (
    name,
    context,
    textColor
) {
    var myself = this;

    // additional properties:
    this.name = name;
    this.context = context;
    this.block = SpriteMorph.prototype.variableBlock(name);
    this.valueLabel = new TextMorph(this.valueText(), 10);

    // initialize inherited properties:
    DebuggerVariableRowMorph.uber.init.call(this);

    // override inherited properties:
    this.alpha = 0;

    // the variable only exists in the paused Context, so evaluating the
    // block the normal way would fail
    this.block.isDraggable = false;
    this.block.isTemplate = true;
    this.block.mouseClickLeft = function () {
        this.showBubble(myself.value(), false, myself.context.receiver);
    };
    this.valueLabel.setColor(textColor);
    this.add(this.block);
    this.add(this.valueLabel);
    this.fixLayout();
};

// DebuggerVariableRowMorph accessing:

DebuggerVariableRowMorph.prototype.value = function () {
    return this.context.variables.getVar(this.name);
};

DebuggerVariableRowMorph.prototype.valueText = function () {
    var value = this.value(),
        text;
    if (value === undefined || value === null) {
        return '';
    }
    try {
        text = value.toString();
    } catch (err) {
        text = String(value);
    }
    return text.length > 40 ? text.slice(0, 40) + '...' : text;
};

// DebuggerVariableRowMorph layout:

DebuggerVariableRowMorph.prototype.fixLayout = function () {
    this.block.setPosition(this.position());
    this.valueLabel.setPosition(new Point(
        this.block.right() + 5,
        this.block.top() +
            (this.block.height() - this.valueLabel.height()) / 2
    ));
    this.bounds.setExtent(new Point(
        this.valueLabel.right() - this.left(),
        this.block.height()
    ));
};
