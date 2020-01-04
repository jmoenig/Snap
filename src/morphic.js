/*

    morphic.js

    a lively Web-GUI
    inspired by Squeak

    written by Jens Mönig
    jens@moenig.org

    Copyright (C) 2010-2020 by Jens Mönig

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


    documentation contents
    ----------------------
    I. inheritance hierarchy
    II. object definition toc
    III. yet to implement
    IV. open issues
    V. browser compatibility
    VI. the big picture
    VII. programming guide
        (1) setting up a web page
            (a) single world
            (b) multiple worlds
            (c) an application
        (2) manipulating morphs
        (3) events
            (a) mouse events
            (b) context menu
            (c) dragging
            (d) dropping
            (e) keyboard events
            (f) resize event
            (g) combined mouse-keyboard events
            (h) text editing events
        (4) stepping
        (5) creating new kinds of morphs
        (6) development and user modes
        (7) turtle graphics
        (8) damage list housekeeping
        (9) supporting high-resolution "retina" screens
        (10 animations
        (11) minifying morphic.js
    VIII. acknowledgements
    IX. contributors


    I. hierarchy
    -------------
    the following tree lists all constructors hierarchically,
    indentation indicating inheritance. Refer to this list to get a
    contextual overview:

    Animation
    Color
    Node
        Morph
            BlinkerMorph
                CursorMorph
            BouncerMorph*
            BoxMorph
                InspectorMorph
                MenuMorph
                MouseSensorMorph*
                SpeechBubbleMorph
            CircleBoxMorph
                SliderButtonMorph
                SliderMorph
            ColorPaletteMorph
                GrayPaletteMorph
            ColorPickerMorph
            DialMorph
            FrameMorph
                ScrollFrameMorph
                    ListMorph
                StringFieldMorph
                WorldMorph
            HandleMorph
            HandMorph
            PenMorph
            ShadowMorph
            StringMorph
            TextMorph
            TriggerMorph
                MenuItemMorph
    Point
    Rectangle


    II. toc
    -------
    the following list shows the order in which all constructors are
    defined. Use this list to locate code in this document:

    Global settings
    Global functions

    Animation
    Color
    Point
    Rectangle
    Node
    Morph
    ShadowMorph
    HandleMorph
    PenMorph
    ColorPaletteMorph
    GrayPaletteMorph
    ColorPickerMorph
    BlinkerMorph
    CursorMorph
    BoxMorph
    SpeechBubbleMorph
    DialMorph
    CircleBoxMorph
    SliderButtonMorph
    SliderMorph
    MouseSensorMorph*
    InspectorMorph
    MenuMorph
    StringMorph
    TextMorph
    TriggerMorph
    MenuItemMorph
    FrameMorph
    ScrollFrameMorph
    ListMorph
    StringFieldMorph
    BouncerMorph*
    HandMorph
    WorldMorph

    * included only for demo purposes


    III. yet to implement
    ---------------------
    - keyboard support for scroll frames and lists
    - full keyboard support for menus (partial support exists)
    - virtual keyboard support for Android and IE


    IV. open issues
    ----------------
    - clipboard support (copy & paste) for non-textual data


    V. browser compatibility
    ------------------------
    I have taken great care and considerable effort to make morphic.js
    runnable and appearing exactly the same on all current browsers
    available to me:

    - Firefox for Windows
    - Firefox for Mac
    - Firefox for Android
    - Chrome for Windows
    - Chrome for Mac
    - Chrome for Android
    - Safari for Windows (deprecated)
    - safari for Mac
    - Safari for iOS (mobile)
    - IE for Windows (partial support)
    - Edge for Windows
    - Opera for Windows
    - Opera for Mac


    VI. the big picture
    -------------------
    Morphic.js is completely based on Canvas and JavaScript, it is just
    Morphic, nothing else. Morphic.js is very basic and covers only the
    bare essentials:

        * a stepping mechanism (a time-sharing multiplexer for lively
          user interaction ontop of a single OS/browser thread)
        * progressive display updates (only dirty rectangles are
          redrawn in each display cycle)
        * a tree structure
        * a single World per Canvas element (although you can have
          multiple worlds in multiple Canvas elements on the same web
          page)
        * a single Hand per World (but you can support multi-touch
          events)
        * a single text entry focus per World

    In its current state morphic.js doesn't support Transforms (you
    cannot rotate Morphs), but with PenMorph there already is a simple
    LOGO-like turtle that you can use to draw onto any Morph it is
    attached to. I'm planning to add special Morphs that support these
    operations later on, but not for every Morph in the system.
    Therefore these additions ("sprites" etc.) are likely to be part of
    other libraries ("microworld.js") in separate files.

    the purpose of morphic.js is to provide a malleable framework that
    will let me experiment with lively GUIs for my hobby horse, which
    is drag-and-drop, blocks based programming languages. Those things
    (BYOB4 - http://byob.berkeley.edu) will be written using morphic.js
    as a library.


    VII. programming guide
    ----------------------
    Morphic.js provides a library for lively GUIs inside single HTML
    Canvas elements. Each such canvas element functions as a "world" in
    which other visible shapes ("morphs") can be positioned and
    manipulated, often directly and interactively by the user. Morphs
    are tree nodes and may contain any number of submorphs ("children").

    All things visible in a morphic World are morphs themselves, i.e.
    all text rendering, blinking cursors, entry fields, menus, buttons,
    sliders, windows and dialog boxes etc. are created with morphic.js
    rather than using HTML DOM elements, and as a consequence can be
    changed and adjusted by the programmer regardless of proprietary
    browser behavior.

    Each World has an - invisible - "Hand" resembling the mouse cursor
    (or the user's finger on touch screens) which handles mouse events,
    and may also have a keyboardReceiver to handle key events.

    The basic idea of Morphic is to continuously run display cycles and
    to incrementally update the screen by only redrawing those  World
    regions    which have been "dirtied" since the last redraw. Before
    each shape is processed for redisplay it gets the chance to perform
    a "step" procedure, thus allowing for an illusion of concurrency.


    (1) setting up a web page
    -------------------------
    Setting up a web page for Morphic always involves three steps:
    adding one or more Canvas elements, defining one or more worlds,
    initializing and starting the main loop.


    (a) single world
    -----------------
    Most commonly you will want your World to fill the browsers's whole
    client area. This default situation is easiest and most straight
    forward.

    example html file:

    <!DOCTYPE html>
    <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <title>Morphic!</title>
            <script type="text/javascript" src="morphic.js"></script>
            <script type="text/javascript">
                var world;

                window.onload = function () {
                    world = new WorldMorph(document.getElementById('world'));
                    world.worldCanvas.focus();
                    world.isDevMode = true;
                    loop();
                };

                function loop() {
                    requestAnimationFrame(loop);
                    world.doOneCycle();
                }
            </script>
        </head>
        <body style="margin: 0;">
            <canvas id="world" tabindex="1" width="800" height="600"
                style="position: absolute;" />
        </body>
    </html>

    if you use ScrollFrames or otherwise plan to support mouse wheel
    scrolling events, make sure to add the following inline-CSS
    attribute to the Canvas element:

        style="position: absolute;"

    which will prevent the World to be scrolled around instead of the
    elements inside of it in some browsers.


    (b) multiple worlds
    -------------------
    If you wish to create a web page with more than one world, make
    sure to prevent each world from auto-filling the whole page and
    include    it in the main loop. It's also a good idea to give each
    world its own tabindex:

    example html file:

    <!DOCTYPE html>
    <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <title>Morphic!</title>
            <script type="text/javascript" src="morphic.js"></script>
            <script type="text/javascript">
                var world1, world2;

                window.onload = function () {
                    disableRetinaSupport();
                    world1 = new WorldMorph(
                        document.getElementById('world1'), false);
                    world2 = new WorldMorph(
                        document.getElementById('world2'), false);
                    loop();
                };

                function loop() {
                    requestAnimationFrame(loop);
                    world1.doOneCycle();
                    world2.doOneCycle();
                }
            </script>
        </head>
        <body>
            <p>first world:</p>
            <canvas id="world1" tabindex="1" width="600" height="400" />
            <p>second world:</p>
            <canvas id="world2" tabindex="2" width="400" height="600" />
        </body>
    </html>


    (c) an application
    -------------------
    Of course, most of the time you don't want to just plain use the
    standard Morphic World "as is" out of the box, but write your own
    application (something like Scratch!) in it. For such an
    application you'll create your own morph prototypes, perhaps
    assemble your own "window frame" and bring it all to life in a
    customized World state. the following example creates a simple
    snake-like mouse drawing game.

    example html file:

    <!DOCTYPE html>
    <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <title>touch me!</title>
            <script type="text/javascript" src="morphic.js"></script>
            <script type="text/javascript">
                var worldCanvas, sensor;

                window.onload = function () {
                    var x, y, w, h;

                    worldCanvas = document.getElementById('world');
                    world = new WorldMorph(worldCanvas);
                    world.worldCanvas.focus();
                    world.isDevMode = false;
                    world.setColor(new Color());

                    w = 100;
                    h = 100;

                    x = 0;
                    y = 0;

                    while ((y * h) < world.height()) {
                        while ((x * w) < world.width()) {
                            sensor = new MouseSensorMorph();
                            sensor.setPosition(new Point(x * w, y * h));
                            sensor.alpha = 0;
                            sensor.setExtent(new Point(w, h));
                            world.add(sensor);
                            x += 1;
                        }
                        x = 0;
                        y += 1;
                    }
                    loop();
                };

                function loop() {
                    requestAnimationFrame(loop);
                    world.doOneCycle();
                }
            </script>
        </head>
        <body bgcolor='black' style="margin: 0;">
            <canvas id="world" width="800" height="600"
                style="position: absolute;" />
        </body>
    </html>

    To get an idea how you can craft your own custom morph prototypes
    I've included two examples which should give you an idea how to add
    properties, override inherited methods and use the stepping
    mechanism for "livelyness":

        BouncerMorph
        MouseSensorMorph

    For the sake of sharing a single file I've included those examples
    in morphic.js itself. Usually you'll define your additions in a
    separate file and keep morphic.js untouched.


    (2) manipulating morphs
    -----------------------
    There are many methods to programmatically manipulate morphs. Among
    the most important and common ones among all morphs are the
    following nine:

    * hide()
    * show()

    * setPosition(aPoint)
    * setExtent(aPoint)
    * setColor(aColor)

    * add(submorph)            - attaches submorph ontop
    * addBack(submorph)        - attaches submorph underneath

    * fullCopy()               - duplication
    * destroy()                - deletion


    (3) events
    ----------
    All user (and system) interaction is triggered by events, which are
    passed on from the root element - the World - to its submorphs. The
    World contains a list of system (browser) events it reacts to in its

        initEventListeners()

    method. Currently there are

        - mouse
        - drop
        - keyboard
        - (window) resize

    events.

    These system events are dispatched within the morphic World by the
    World's Hand and its keyboardReceiver (usually the active text
    cursor).


    (a) mouse events:
    -----------------
    The Hand dispatches the following mouse events to relevant morphs:

        mouseDownLeft
        mouseDownRight
        mouseClickLeft
        mouseClickRight
        mouseDoubleClick
        mouseEnter
        mouseLeave
        mouseEnterDragging
        mouseLeaveDragging
        mouseMove
        mouseScroll

    If you wish your morph to react to any such event, simply add a
    method of the same name as the event, e.g:

        MyMorph.prototype.mouseMove = function(pos) {};

    All of these methods have as optional parameter a Point object
    indicating the current position of the Hand inside the World's
    coordinate system. The

        mouseMove(pos, button)

    event method has an additional optional parameter indicating the
    currently pressed mouse button, which is either 'left' or 'right'.
    You can use this to let users interact with 3D environments.

    Events may be "bubbled" up a morph's owner chain by calling

        this.escalateEvent(functionName, arg)

    in the event handler method's code.

    Likewise, removing the event handler method will render your morph
    passive to the event in question.


    (b) context menu:
    -----------------
    By default right-clicking (or single-finger tap-and-hold) on a morph
    also invokes its context menu (in addition to firing the
    mouseClickRight event). A morph's context menu can be customized by
    assigning a Menu instance to its

        customContextMenu

    property, or altogether suppressed by overriding its inherited

        contextMenu()

    method.


    (c) dragging:
    -------------
    Dragging a morph is initiated when the left mouse button is pressed,
    held and the mouse is moved.

    You can control whether a morph is draggable by setting its

        isDraggable

    property either to false or true. If a morph isn't draggable itself
    it will pass the pick-up request up its owner chain. This lets you
    create draggable composite morphs like Windows, DialogBoxes,
    Sliders etc.

    Sometimes it is desireable to make "template" shapes which cannot be
    moved themselves, but from which instead duplicates can be peeled
    off. This is especially useful for building blocks in construction
    kits, e.g. the MIT-Scratch palette. Morphic.js lets you control this
    functionality by setting the

        isTemplate

    property flag to true for any morph whose "isDraggable" property is
    turned off. When dragging such a Morph the hand will instead grab
    a duplicate of the template whose "isDraggable" flag is true and
    whose "isTemplate" flag is false, in other words: a non-template.

    When creating a copy from a template, the copy's

        reactToTemplateCopy

    is invoked, if it is present.

    Dragging is indicated by adding a drop shadow to the morph in hand.
    If a morph follows the hand without displaying a drop shadow it is
    merely being moved about without changing its parent (owner morph),
    e.g. when "dragging" a morph handle to resize its owner, or when
    "dragging" a slider button.

    Right before a morph is picked up its

        selectForEdit

    and

        prepareToBeGrabbed(handMorph)

    methods are invoked, each if it is present. the optional

        selectForEdit

    if implemented, must return the object that is to be picked up.
    In addition to just returning the original object chosen by the user
    your method can also modify the target's environment and instead return
    a copy of the selected morph if, for example, you would like to implement
    a copy-on-write mechanism such as in Snap.

    Immediately after the pick-up the former parent's

        reactToGrabOf(grabbedMorph)

    method is called, again only if it exists.

    Similar to events, these  methods are optional and don't exist by
    default. For a simple example of how they can be used to adjust
    scroll bars in a scroll frame please have a look at their
    implementation in FrameMorph.


    (d) dropping:
    -------------
    Dropping is triggered when the left mouse button is either pressed
    or released while the Hand is dragging a morph.

    Dropping a morph causes it to become embedded in a new owner morph.
    You can control this embedding behavior by setting the prospective
    drop target's

        acceptsDrops

    property to either true or false, or by overriding its inherited

        wantsDropOf(aMorph)

    method.

    Right before dropping a morph the designated new parent's optional

        selectForEdit

    method is invoked if it is present. Again, if implemented this method
    must return the new parent for the morph that is about to be dropped.
    Again, in addition to just returning the designeted drop-target
    your method can also modify its environment and instead return
    a copy of the new parent if, for example, you would like to implement
    a copy-on-write mechanism such as in Snap.

    Right after a morph has been dropped its

        justDropped(handMorph)

    method is called, and its new parent's

        reactToDropOf(droppedMorph, handMorph)

    method is invoked, again only if each method exists.

    Similar to events, these  methods are optional and by default are
    not present in morphs by default (watch out for inheritance,
    though!). For a simple example of how they can be used to adjust
    scroll bars in a scroll frame please have a look at their
    implementation in FrameMorph.

    Drops of image elements from outside the world canvas are dispatched as

        droppedImage(aCanvas, name)
        droppedSVG(anImage, name)

    events to interested Morphs at the mouse pointer. If you want you Morph
    to e.g. import outside images you can add the droppedImage() and / or the
    droppedSVG() methods to it. The parameter passed to the event handles is
    a new offscreen canvas element representing a copy of the original image
    element which can be directly used, e.g. by assigning it to another
    Morph's image property. In the case of a dropped SVG it is an image
    element (not a canvas), which has to be rasterized onto a canvas before
    it can be used. The benefit of handling SVGs as image elements is that
    rasterization can be deferred until the destination scale is known, taking
    advantage of SVG's ability for smooth scaling. If instead SVGs are to be
    rasterized right away, you can set the

        MorphicPreferences.rasterizeSVGs

    preference to <true>. In this case dropped SVGs also trigger the
    droppedImage() event with a canvas containing a rasterized version of the
    SVG.

    The same applies to drops of audio or text files from outside the world
    canvas.

    Those are dispatched as

        droppedAudio(anAudio, name)
        droppedText(aString, name, type)

    events to interested Morphs at the mouse pointer.

    if none of the above content types can be determined, the file contents
    is dispatched as an ArrayBuffer to interested Morphs:

        droppedBinary(anArrayBuffer, name)


    (e) keyboard events
    -------------------
    The World dispatches the following key events to its active
    keyboardReceiver:

        keypress
        keydown
        keyup

    Currently the only morph which acts as keyboard receiver is
    CursorMorph, the basic text editing widget. If you wish to add
    keyboard support to your morph you need to add event handling
    methods for

        processKeyPress(event)
        processKeyDown(event)
        processKeyUp(event)

    and activate them by assigning your morph to the World's

        keyboardReceiver

    property.

    Note that processKeyUp() is optional and doesn't have to be present
    if your morph doesn't require it.


    (f) resize event
    ----------------
    The Window resize event is handled by the World and allows the
    World's extent to be adjusted so that it always completely fills
    the browser's visible page. You can turn off this default behavior
    by setting the World's

        useFillPage

    property to false.

    Alternatively you can also initialize the World with the
    useFillPage switch turned off from the beginning by passing the
    false value as second parameter to the World's constructor:

        world = new World(aCanvas, false);

    Use this when creating a web page with multiple Worlds.

    if "useFillPage" is turned on the World dispatches an

        reactToWorldResize(newBounds)

    events to all of its children (toplevel only), allowing each to
    adjust to the new World bounds by implementing a corresponding
    method, the passed argument being the World's new dimensions after
    completing the resize. By default, the "reactToWorldResize" Method
    does not exist.

    Example:

    Add the following method to your Morph to let it automatically
    fill the whole World, but leave a 10 pixel border uncovered:

        MyMorph.prototype.reactToWorldResize = function (rect) {
            this.changed();
            this.bounds = rect.insetBy(10);
            this.drawNew();
            this.changed();
        };


    (g) combined mouse-keyboard events
    ----------------------------------
    Occasionally you'll want an object to react differently to a mouse
    click or to some other mouse event while the user holds down a key
    on the keyboard. Such "shift-click", "ctl-click", or "alt-click"
    events can be implemented by querying the World's

        currentKey

    property inside the function that reacts to the mouse event. This
    property stores the keyCode of the key that's currently pressed.
    Once the key is released by the user it reverts to null.


    (h) text editing events
    -----------------------
    Much of Morphic's "liveliness" comes out of allowing text elements
    (instances of either single-lined StringMorph or multi-lined TextMorph)
    to be directly manipulated and edited by users. This requires other
    objects which may have an interest in the text element's state to react
    appropriately. Therefore text elements and their manipulators emit
    a stream of events, mostly by "bubbling" them up the text element's
    owner chain. Text elements' parents are notified about the following
    events:

    Whenever the user presses a key on the keyboard while a text element
    is being edited, first a

        reactToKeystroke(event)

    is escalated up its parent chain, the "event" parameter being the
    original one received by the World.

    Whenever the input changes, by adding or removing one or more characters,
    an additional

        reactToInput(event)

    is escalated up its parent chain, the "event" parameter again being the
    original one received by the World or by the IME element.

    Note that the "reactToKeystroke" event gets triggered before the input
    changes, and thus befgore the "reactToInput" event fires.

    Once the user has completed the edit, the following events are
    dispatched:

        accept() - <enter> was pressed on a single line of text
        cancel() - <esc> was pressed on any text element

    Note that "accept" only gets triggered by single-line texte elements,
    as the <enter> key is used to insert line breaks in multi-line
    elements. Therefore, whenever a text edit is terminated by the user
    (accepted, cancelled or otherwise),

        reactToEdit(StringOrTextMorph)

    is triggered.

    If the MorphicPreference's

        useSliderForInput

    setting is turned on, a slider is popped up underneath the currently
    edited text element letting the user insert numbers out of the given
    slider range. Whenever this happens, i.e. whenever the slider is moved
    or while the slider button is pressed, a stream of

        reactToSliderEdit(StringOrTextMorph)

    events is dispatched, allowing for "Bret-Victor" style "live coding"
    applications.

    In addition to user-initiated events text elements also emit
    change notifications to their direct parents whenever their drawNew()
    method is invoked. That way complex Morphs containing text elements
    get a chance to react if something about the embedded text has been
    modified programmatically. These events are:

        layoutChanged() - sent from instances of TextMorph
        fixLayout() - sent from instances of StringMorph

    they are different so that Morphs which contain both multi-line and
    single-line text elements can hold them apart.


    (4) stepping
    ------------
    Stepping is what makes Morphic "magical". Two properties control
    a morph's stepping behavior: the fps attribute and the step()
    method.

    By default the

        step()

    method does nothing. As you can see in the examples of BouncerMorph
    and MouseSensorMorph you can easily override this inherited method
    to suit your needs.

    By default the step() method is called once per display cycle.
    Depending on the number of actively stepping morphs and the
    complexity of your step() methods this can cause quite a strain on
    your CPU, and also result in your application behaving differently
    on slower computers than on fast ones.

    setting

        myMorph.fps

    to a number lower than the interval for the main loop lets you free
    system resources (albeit at the cost of a less responsive or slower
    behavior for this particular morph).


    (5) creating new kinds of morphs
    --------------------------------
    The real fun begins when you start to create new kinds of morphs
    with customized shapes. Imagine, e.g. jigsaw puzzle pieces or
    musical notes. For this you have to override the default

        drawNew()

    method.

    This method creates a new offscreen Canvas and stores it in
    the morph's

        image

    property.

    Use the following template for a start:

        MyMorph.prototype.drawNew = function() {
            var context;
            this.image = newCanvas(this.extent());
            context = this.image.getContext('2d');
            // use context to paint stuff here
        };

    If your new morph stores or references to other morphs outside of
    the submorph tree in other properties, be sure to also override the
    default

        updateReferences()

    method if you want it to support duplication.


    (6) development and user modes
    ------------------------------
    When working with Squeak on Scratch or BYOB among the features I
    like the best and use the most is inspecting what's going on in
    the World while it is up and running. That's what development mode
    is for (you could also call it debug mode). In essence development
    mode controls which context menu shows up. In user mode right
    clicking (or double finger tapping) a morph invokes its

        customContextMenu

    property, whereas in development mode only the general

        developersMenu()

    method is called and the resulting menu invoked. The developers'
    menu features Gui-Builder-wise functionality to directly inspect,
    take apart, reassamble and otherwise manipulate morphs and their
    contents.

    Instead of using the "customContextMenu" property you can also
    assign a more dynamic contextMenu by overriding the general

        userMenu()

    method with a customized menu constructor. The difference between
    the customContextMenu property and the userMenu() method is that
    the former is also present in development mode and overrides the
    developersMenu() result. For an example of how to use the
    customContextMenu property have a look at TextMorph's evaluation
    menu, which is used for the Inspector's evaluation pane.

    When in development mode you can inspect every Morph's properties
    with the inspector, including all of its methods. The inspector
    also lets you add, remove and rename properties, and even edit
    their values at runtime. Like in a Smalltalk environment the inspect
    features an evaluation pane into which you can type in arbitrary
    JavaScript code and evaluate it in the context of the inspectee.

    Use switching between user and development modes while you are
    developing an application and disable switching to development once
    you're done and deploying, because generally you don't want to
    confuse end-users with inspectors and meta-level stuff.


    (7) turtle graphics
    -------------------

    The basic Morphic kernel features a simple LOGO turtle constructor
    called

        PenMorph

    which you can use to draw onto its parent Morph. By default every
    Morph in the system (including the World) is able to act as turtle
    canvas and can display pen trails. Pen trails will be lost whenever
    the trails morph (the pen's parent) performs a "drawNew()"
    operation. If you want to create your own pen trails canvas, you
    may wish to modify its

        penTrails()

    property, so that it keeps a separate offscreen canvas for pen
    trails (and doesn't loose these on redraw).

    the following properties of PenMorph are relevant for turtle
    graphics:

        color        - a Color
        size        - line width of pen trails
        heading        - degrees
        isDown        - drawing state

    the following commands can be used to actually draw something:

        up()        - lift the pen up, further movements leave no trails
        down()        - set down, further movements leave trails
        clear()        - remove all trails from the current parent
        forward(n)    - move n steps in the current direction (heading)
        turn(n)        - turn right n degrees

    Turtle graphics can best be explored interactively by creating a
    new PenMorph object and by manipulating it with the inspector
    widget.

    NOTE: PenMorph has a special optimization for recursive operations
    called

        warp(function)

    You can significantly speed up recursive ops and increase the depth
    of recursion that's displayable by wrapping WARP around your
    recursive function call:

    example:

        myPen.warp(function () {
            myPen.tree(12, 120, 20);
        })

    will be much faster than just invoking the tree function, because it
    prevents the parent's parent from keeping track of every single line
    segment and instead redraws the outcome in a single pass.


    (8) damage list housekeeping
    ----------------------------
    Morphic's progressive display update comes at the cost of having to
    cycle through a list of "broken rectangles" every display cycle. If
    this list gets very long working this damage list can lead to a
    seemingly dramatic slow-down of the Morphic system. Typically this
    occurs when updating the layout of complex Morphs with very many
    submorphs, e.g. when resizing an inspector window.

    An effective strategy to cope with this is to use the inherited

        trackChanges

    property of the Morph prototype for damage list housekeeping.

    The trackChanges property of the Morph prototype is a Boolean switch
    that determines whether the World's damage list ('broken' rectangles)
    tracks changes. By default the switch is always on. If set to false
    changes are not stored. This can be very useful for housekeeping of
    the damage list in situations where a large number of (sub-) morphs
    are changed more or less at once. Instead of keeping track of every
    single submorph's changes tremendous performance improvements can be
    achieved by setting the trackChanges flag to false before propagating
    the layout changes, setting it to true again and then storing the full
    bounds of the surrounding morph. As an example refer to the

        moveBy()

    method of HandMorph, and to the

        fixLayout()

    method of InspectorMorph, or the

        startLayout()
        endLayout()

    methods of SyntaxElementMorph in the Snap application.


    (9) supporting high-resolution "retina" screens
    -----------------------------------------------
    By default retina support gets installed when Morphic.js loads. There
    are two global functions that let you test for retina availability:

        isRetinaSupported() - Bool, answers if retina support is available
        isRetinaEnabled()   - Bool, answers if currently in retina mode

    and two more functions that let you control retina support if it is
    available:

        enableRetinaSupport()
        disableRetinaSupport()

    Both of these internally test whether retina is available, so they are
    safe to call directly. For an example how to make retina support
    user-specifiable refer to

        Snap! >> guis.js >> toggleRetina()

    Even when in retina mode it often makes sense to use normal-resolution
    canvasses for simple shapes in order to save system resources and
    optimize performance. Examples are costumes and backgrounds in Snap.
    In Morphic you can create new canvas elements using

        newCanvas(extentPoint [, nonRetinaFlag])

    If retina support is enabled such new canvasses will automatically be
    high-resolution canvasses, unless the newCanvas() function is given an
    otherwise optional second Boolean <true> argument that explicitly makes
    it a non-retina canvas.

    Not the whole canvas API is supported by Morphic's retina utilities.
    Especially if your code uses putImageData() you will want to "downgrade"
    a target high-resolution canvas to a normal-resolution ("non-retina")
    one before using

        normalizeCanvas(aCanvas [, copyFlag])

    This will change the target canvas' resolution in place (!). If you
    pass in the optional second Boolean <true> flag the function returns
    a non-retina copy and leaves the target canvas unchanged. An example
    of this normalize mechanism is converting the penTrails layer of Snap's
    stage (high-resolution) into a sprite-costume (normal resolution).


    (10) animations
    ---------------
    Animations handle gradual transitions between one state and another over a
    period of time. Transition effects can be specified using easing functions.
    An easing function maps a fraction of the transition time to a fraction of
    the state delta. This way accelerating / decelerating and bouncing sliding
    effects can be accomplished.

    Animations are generic and not limited to motion, i.e. they can also handle
    other transitions such as color changes, transparency fadings, growing,
    shrinking, turning etc.

    Animations need to be stepped by a scheduler, e. g. an interval function.
    In Morphic the preferred way to run an animation is to register it with
    the World by adding it to the World's animation queue. The World steps each
    registered animation once per display cycle independently of the Morphic
    stepping mechanism.

    For an example how to use animations look at how the Morph's methods

        glideTo()
        fadeTo()

    and

        slideBackTo()

    are implemented.


    (11) minifying morphic.js
    -------------------------
    Coming from Smalltalk and being a Squeaker at heart I am a huge fan
    of browsing the code itself to make sense of it. Therefore I have
    included this documentation and (too little) inline comments so all
    you need to get going is this very file.

    Nowadays with live streaming HD video even on mobile phones 250 KB
    shouldn't be a big strain on bandwith, still minifying and even
    compressing morphic.js down do about 100 KB may sometimes improve
    performance in production use.

    Being an attorney-at-law myself you programmer folk keep harassing
    me with rabulistic nitpickings about free software licenses. I'm
    releasing morphic.js under an AGPL license. Therefore please make
    sure to adhere to that license in any minified or compressed version.


    VIII. acknowledgements
    ----------------------
    The original Morphic was designed and written by Randy Smith and
    John Maloney for the SELF programming language, and later ported to
    Squeak (Smalltalk) by John Maloney and Dan Ingalls, who has also
    ported it to JavaScript (the Lively Kernel), once again setting
    a "Gold Standard" for self sustaining systems which morphic.js
    cannot and does not aspire to meet.

    This Morphic implementation for JavaScript is not a direct port of
    Squeak's Morphic, but still many individual functions have been
    ported almost literally from Squeak, sometimes even including their
    comments, e.g. the morph duplication mechanism fullCopy(). Squeak
    has been a treasure trove, and if morphic.js looks, feels and
    smells a lot like Squeak, I'll take it as a compliment.

    Evelyn Eastmond has inspired and encouraged me with her wonderful
    implementation of DesignBlocksJS. Thanks for sharing code, ideas
    and enthusiasm for programming.

    John Maloney has been my mentor and my source of inspiration for
    these Morphic experiments. Thanks for the critique, the suggestions
    and explanations for all things Morphic and for being my all time
    programming hero.

    I have originally written morphic.js in Florian Balmer's Notepad2
    editor for Windows, later switched to Apple's Dashcode and later
    still to Apple's Xcode. I've also come to depend on both Douglas
    Crockford's JSLint and later the JSHint project, as well as on
    Mozilla's Firebug and Google's Chrome to get it right.


    IX. contributors
    ----------------------
    Joe Otto found and fixed many early bugs and taught me some tricks.
    Nathan Dinsmore contributed mouse wheel scrolling, cached
    background texture handling, countless bug fixes and optimizations.
    Ian Reynolds contributed backspace key handling for Chrome.
    Davide Della Casa contributed performance optimizations for Firefox.
    Jason N (@cyderize) contributed native copy & paste for text editing.
    Bartosz Leper contributed retina display support.
    Zhenlei Jia and Dariusz Dorożalski pioneered IME text editing.
    Bernat Romagosa contributed to text editing and to the core design.
    Michael Ball found and fixed a longstanding scrolling bug.
    Brian Harvey contributed to the design and implementation of submenus.
    Ken Kahn contributed to Chinese keboard entry and Android support.
    Brian Broll contributed clickable URLs in text elements.

    - Jens Mönig
*/

// Global settings /////////////////////////////////////////////////////

/*global window, HTMLCanvasElement, FileReader, Audio, FileList, Map*/

var morphicVersion = '2020-January-04';
var modules = {}; // keep track of additional loaded modules
var useBlurredShadows = getBlurredShadowSupport(); // check for Chrome-bug

var standardSettings = {
    minimumFontHeight: getMinimumFontHeight(), // browser settings
    globalFontFamily: '',
    menuFontName: 'sans-serif',
    menuFontSize: 12,
    bubbleHelpFontSize: 10,
    prompterFontName: 'sans-serif',
    prompterFontSize: 12,
    prompterSliderSize: 10,
    handleSize: 15,
    scrollBarSize: 12,
    mouseScrollAmount: 40,
    useSliderForInput: false,
    useVirtualKeyboard: true,
    isTouchDevice: false, // turned on by touch events, don't set
    rasterizeSVGs: false,
    isFlat: false,
    grabThreshold: 5
};

var touchScreenSettings = {
    minimumFontHeight: standardSettings.minimumFontHeight,
    globalFontFamily: '',
    menuFontName: 'sans-serif',
    menuFontSize: 24,
    bubbleHelpFontSize: 18,
    prompterFontName: 'sans-serif',
    prompterFontSize: 24,
    prompterSliderSize: 20,
    handleSize: 26,
    scrollBarSize: 24,
    mouseScrollAmount: 40,
    useSliderForInput: true,
    useVirtualKeyboard: true,
    isTouchDevice: false,
    rasterizeSVGs: false,
    isFlat: false,
    grabThreshold: 5
};

var MorphicPreferences = standardSettings;

// first, try enabling support for retina displays - can be turned off later

/*
    Support for retina displays has been pioneered and contributed by
    Bartosz Leper.

    NOTE: this will make changes to the HTMLCanvasElement that - mostly -
    make Morphic usable on retina displays in very high resolution mode
    with crisp fonts and clear fine lines without you (the programmer)
    needing to know any specifics, provided both the display and the browser
    support these (Safari currently doesn't), otherwise these utilities will
    not be installed.
    If you don't want your Morphic application to support retina resolutions
    you don't have to edit this morphic.js file to comment out the next line
    of code, instead you can simply call

        disableRetinaSupport();

    before you create your World(s) in the html page. Disabling retina
    support also will simply do nothing if retina support is not possible
    or already disabled, so it's equally safe to call.

    For an example how to make retina support user-specifiable refer to
    Snap! >> guis.js >> toggleRetina()
*/

enableRetinaSupport();

// Global Functions ////////////////////////////////////////////////////

function nop() {
    // do explicitly nothing
    return null;
}

function localize(string) {
    // override this function with custom localizations
    return string;
}

function isNil(thing) {
    return thing === undefined || thing === null;
}

function contains(list, element) {
    // answer true if element is a member of list
    return list.indexOf(element) !== -1;
}

function detect(list, predicate) {
    // answer the first element of list for which predicate evaluates
    // true, otherwise answer null
    var i, size = list.length;
    for (i = 0; i < size; i += 1) {
        if (predicate.call(null, list[i])) {
            return list[i];
        }
    }
    return null;
}

function sizeOf(object) {
    // answer the number of own properties
    var size = 0, key;
    for (key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            size += 1;
        }
    }
    return size;
}

function isString(target) {
    return typeof target === 'string' || target instanceof String;
}

function isObject(target) {
    return target !== null &&
        (typeof target === 'object' || target instanceof Object);
}

function radians(degrees) {
    return degrees * Math.PI / 180;
}

function degrees(radians) {
    return radians * 180 / Math.PI;
}

function fontHeight(height) {
    var minHeight = Math.max(height, MorphicPreferences.minimumFontHeight);
    return minHeight * 1.2; // assuming 1/5 font size for ascenders
}

function isWordChar(aCharacter) {
    // can't use \b or \w because they ignore diacritics
    return aCharacter.match(/[A-zÀ-ÿ0-9]/);
}

function isURLChar(aCharacter) {
    return aCharacter.match(/[A-z0-9./:?&_+%-]/);
}

function isURL(text) {
    return /^https?:\/\//.test(text);
}

function newCanvas(extentPoint, nonRetina, recycleMe) {
    // answer a new empty instance of Canvas, don't display anywhere
    // nonRetina - optional Boolean "false"
    // by default retina support is automatic
    // optional existing canvas to be used again, unless it is marked as
    // being shared among Morphs (dataset property "morphicShare")
    var canvas, ext;
    nonRetina = nonRetina || false;
    ext = (extentPoint ||
            (recycleMe ? new Point(recycleMe.width, recycleMe.height)
                : new Point(0, 0))).floor();
    if (recycleMe &&
            !recycleMe.dataset.morphicShare &&
            (recycleMe.isRetinaEnabled || false) !== nonRetina &&
            ext.x === recycleMe.width && ext.y === recycleMe.height
    ) {
        canvas = recycleMe;
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        return canvas;
    } else {
        canvas = document.createElement('canvas');
        canvas.width = ext.x;
        canvas.height = ext.y;
    }
    if (nonRetina && canvas.isRetinaEnabled) {
        canvas.isRetinaEnabled = false;
    }
    return canvas;
}

function copyCanvas(aCanvas) {
    // answer a deep copy of a canvas element respecting its retina status
    var c;
    if (aCanvas && aCanvas.width && aCanvas.height) {
        c = newCanvas(
            new Point(aCanvas.width, aCanvas.height),
            !aCanvas.isRetinaEnabled
        );
        c.getContext("2d").drawImage(aCanvas, 0, 0);
        return c;
    }
    return aCanvas;
}

function getMinimumFontHeight() {
    // answer the height of the smallest font renderable in pixels
    var str = 'I',
        size = 50,
        canvas = document.createElement('canvas'),
        ctx,
        maxX,
        data,
        x,
        y;
    canvas.width = size;
    canvas.height = size;
    ctx = canvas.getContext('2d');
    ctx.font = '1px serif';
    maxX = ctx.measureText(str).width;
    ctx.fillStyle = 'black';
    ctx.textBaseline = 'bottom';
    ctx.fillText(str, 0, size);
    for (y = 0; y < size; y += 1) {
        for (x = 0; x < maxX; x += 1) {
            data = ctx.getImageData(x, y, 1, 1);
            if (data.data[3] !== 0) {
                return size - y + 1;
            }
        }
    }
    return 0;
}

function getBlurredShadowSupport() {
    // check for Chrome issue 90001
    // http://code.google.com/p/chromium/issues/detail?id=90001
    var source, target, ctx;
    source = document.createElement('canvas');
    source.width = 10;
    source.height = 10;
    ctx = source.getContext('2d');
    ctx.fillStyle = 'rgb(255, 0, 0)';
    ctx.beginPath();
    ctx.arc(5, 5, 5, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    target = document.createElement('canvas');
    target.width = 10;
    target.height = 10;
    ctx = target.getContext('2d');
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(0, 0, 255, 1)';
    ctx.drawImage(source, 0, 0);
    return ctx.getImageData(0, 0, 1, 1).data[3] ? true : false;
}

function getDocumentPositionOf(aDOMelement) {
    // answer the absolute coordinates of a DOM element in the document
    var pos, offsetParent;
    if (aDOMelement === null) {
        return {x: 0, y: 0};
    }
    pos = {x: aDOMelement.offsetLeft, y: aDOMelement.offsetTop};
    offsetParent = aDOMelement.offsetParent;
    while (offsetParent !== null) {
        pos.x += offsetParent.offsetLeft;
        pos.y += offsetParent.offsetTop;
        if (offsetParent !== document.body &&
                offsetParent !== document.documentElement) {
            pos.x -= offsetParent.scrollLeft;
            pos.y -= offsetParent.scrollTop;
        }
        offsetParent = offsetParent.offsetParent;
    }
    return pos;
}

function copy(target) {
    // answer a shallow copy of target
    var value, c, property, keys, l, i;
    if (typeof target !== 'object') {
        return target;
    }
    value = target.valueOf();
    if (target !== value) {
        return new target.constructor(value);
    }
    if (target instanceof target.constructor &&
            target.constructor !== Object) {
        c = Object.create(target.constructor.prototype);
        keys = Object.keys(target);
        for (l = keys.length, i = 0; i < l; i += 1) {
            property = keys[i];
            if (target[property] instanceof HTMLCanvasElement) {
                // tag canvas elements as being shared,
                // so the next time when rerendering a Morph
                // instead of recycling the shared canvas a
                // new unshared one get created
                // see newCanvas() function
                target[property].dataset.morphicShare = 'true';
            }
            c[property] = target[property];
        }
    } else {
        c = {};
        for (property in target) {
            c[property] = target[property];
        }
    }
    return c;
}

// Retina Display Support //////////////////////////////////////////////

/*
    By default retina support gets installed when Morphic.js loads. There
    are two global functions that let you test for retina availability:

        isRetinaSupported() - Boolean, whether retina support is available
        isRetinaEnabled()   - Boolean, whether currently in retina mode

    and two more functions that let you control retina support if it is
    available:

        enableRetinaSupport()
        disableRetinaSupport()

    Both of these internally test whether retina is available, so they are
    safe to call directly.

    Even when in retina mode it often makes sense to use non-high-resolution
    canvasses for simple shapes in order to save system resources and
    optimize performance. Examples are costumes and backgrounds in Snap.
    In Morphic you can create new canvas elements using

        newCanvas(extentPoint [, nonRetinaFlag])

    If retina support is enabled such new canvasses will automatically be
    high-resolution canvasses, unless the newCanvas() function is given an
    otherwise optional second Boolean <true> argument that explicitly makes
    it a non-retina canvas.

    Not the whole canvas API is supported by Morphic's retina utilities.
    Especially if your code uses putImageData() you will want to "downgrade"
    a target high-resolution canvas to a normal-resolution ("non-retina")
    one before using

        normalizeCanvas(aCanvas [, copyFlag])

    This will change the target canvas' resolution in place (!). If you
    pass in the optional second Boolean <true> flag the function returns
    a non-retina copy and leaves the target canvas unchanged. An example
    of this normalize mechanism is converting the penTrails layer of Snap's
    stage (high-resolution) into a sprite-costume (normal resolution).
*/

function enableRetinaSupport() {
/*
    === contributed by Bartosz Leper ===

    This installs a series of utilities that allow using Canvas the same way
    on retina and non-retina displays. If the display is a retina one, the
    underlying dimensions of the Canvas elements are doubled, but this will
    be transparent to the code that uses Canvas. All dimensions read or
    written to the Canvas element will be scaled appropriately.

    NOTE: This implementation is not exhaustive; it only implements what is
    needed by the Snap! UI.

    [Jens]: like all other retina screen support implementations I've seen
    Bartosz's patch also does not address putImageData() compatibility when
    mixing retina-enabled and non-retina canvasses. If you need to manipulate
    pixels in such mixed canvasses, make sure to "downgrade" them all using
    normalizeCanvas() below.
*/

    // Get the window's pixel ratio for canvas elements.
    // See: http://www.html5rocks.com/en/tutorials/canvas/hidpi/
    var ctx = document.createElement("canvas").getContext("2d"),
        backingStorePixelRatio = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1,

    // Unfortunately, it's really hard to make this work well when changing
    // zoom level, so let's leave it like this right now, and stick to
    // whatever the ratio was in the beginning.

        // originalDevicePixelRatio = window.devicePixelRatio,

    // [Jens]: As of summer 2016 non-integer devicePixelRatios lead to
    // artifacts when blitting images onto canvas elements in all browsers
    // except Chrome, especially Firefox, Edge, IE (Safari doesn't even
    // support retina mode as implemented here).
    // therefore - to ensure crisp fonts - use the ceiling of whatever
    // the devicePixelRatio is. This needs more memory, but looks nicer.

        originalDevicePixelRatio = Math.ceil(window.devicePixelRatio),

        canvasProto = HTMLCanvasElement.prototype,
        contextProto = CanvasRenderingContext2D.prototype,

    // [Jens]: keep track of original properties in a dictionary
    // so they can be iterated over and restored
        uber = {
            drawImage: contextProto.drawImage,
            getImageData: contextProto.getImageData,

            width: Object.getOwnPropertyDescriptor(
                canvasProto,
                'width'
            ),
            height: Object.getOwnPropertyDescriptor(
                canvasProto,
                'height'
            ),
            shadowOffsetX: Object.getOwnPropertyDescriptor(
                contextProto,
                'shadowOffsetX'
            ),
            shadowOffsetY: Object.getOwnPropertyDescriptor(
                contextProto,
                'shadowOffsetY'
            ),
            shadowBlur: Object.getOwnPropertyDescriptor(
                contextProto,
                'shadowBlur'
            )
        };

    // [Jens]: only install retina utilities if the display supports them
    if (backingStorePixelRatio === originalDevicePixelRatio) {return; }
    // [Jens]: check whether properties can be overridden, needed for Safari
    if (Object.keys(uber).some(function (any) {
        var prop = uber[any];
        return prop.hasOwnProperty('configurable') && (!prop.configurable);
    })) {return; }

    function getPixelRatio(imageSource) {
        return imageSource.isRetinaEnabled ?
            (originalDevicePixelRatio || 1) / backingStorePixelRatio : 1;
    }

    canvasProto._isRetinaEnabled = true;
    // [Jens]: remember the original non-retina properties,
    // so they can be restored again
    canvasProto._bak = uber;

    Object.defineProperty(canvasProto, 'isRetinaEnabled', {
        get: function() {
            return this._isRetinaEnabled;
        },
        set: function(enabled) {
            var prevPixelRatio = getPixelRatio(this),
                prevWidth = this.width,
                prevHeight = this.height;

            this._isRetinaEnabled = enabled;
            if (getPixelRatio(this) != prevPixelRatio) {
                this.width = prevWidth;
                this.height = prevHeight;
            }
        },
        configurable: true // [Jens]: allow to be deleted an reconfigured
    });

    Object.defineProperty(canvasProto, 'width', {
        get: function() {
            return uber.width.get.call(this) / getPixelRatio(this);
        },
        set: function(width) {
            try { // workaround one of FF's dreaded NS_ERROR_FAILURE bugs
                // this should be taken out as soon as FF gets fixed again
                var pixelRatio = getPixelRatio(this),
                    context;
                uber.width.set.call(this, width * pixelRatio);
                context = this.getContext('2d');
                context.restore();
                context.save();
                context.scale(pixelRatio, pixelRatio);
            } catch (err) {
                console.log('Retina Display Support Problem', err);
                uber.width.set.call(this, width);
            }
        }
    });

    Object.defineProperty(canvasProto, 'height', {
        get: function() {
            return uber.height.get.call(this) / getPixelRatio(this);
        },
        set: function(height) {
            var pixelRatio = getPixelRatio(this),
                context;
            uber.height.set.call(this, height * pixelRatio);
            context = this.getContext('2d');
            context.restore();
            context.save();
            context.scale(pixelRatio, pixelRatio);
        }
    });

    contextProto.drawImage = function(image) {
        var pixelRatio = getPixelRatio(image),
            sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight;

        // Different signatures of drawImage() method have different
        // parameter assignments.
        switch (arguments.length) {
            case 9:
                sx = arguments[1];
                sy = arguments[2];
                sWidth = arguments[3];
                sHeight = arguments[4];
                dx = arguments[5];
                dy = arguments[6];
                dWidth = arguments[7];
                dHeight = arguments[8];
                break;

            case 5:
                sx = 0;
                sy = 0;
                sWidth = image.width;
                sHeight = image.height;
                dx = arguments[1];
                dy = arguments[2];
                dWidth = arguments[3];
                dHeight = arguments[4];
                break;

            case 3:
                sx = 0;
                sy = 0;
                sWidth = image.width;
                sHeight = image.height;
                dx = arguments[1];
                dy = arguments[2];
                dWidth = image.width;
                dHeight = image.height;
                break;

            default:
                throw Error('Called drawImage() with ' + arguments.length +
                        ' arguments');
        }
        uber.drawImage.call(
                this, image,
                sx * pixelRatio, sy * pixelRatio,
                sWidth * pixelRatio, sHeight * pixelRatio,
                dx, dy,
                dWidth, dHeight);
    };

    contextProto.getImageData = function(sx, sy, sw, sh) {
        var pixelRatio = getPixelRatio(this.canvas);
        return uber.getImageData.call(
                this,
                sx * pixelRatio, sy * pixelRatio,
                sw * pixelRatio, sh * pixelRatio);
    };

    Object.defineProperty(contextProto, 'shadowOffsetX', {
        get: function() {
            return uber.shadowOffsetX.get.call(this) /
                getPixelRatio(this.canvas);
        },
        set: function(offset) {
            var pixelRatio = getPixelRatio(this.canvas);
            uber.shadowOffsetX.set.call(this, offset * pixelRatio);
        }
    });

    Object.defineProperty(contextProto, 'shadowOffsetY', {
        get: function() {
            return uber.shadowOffsetY.get.call(this) /
                getPixelRatio(this.canvas);
        },
        set: function(offset) {
            var pixelRatio = getPixelRatio(this.canvas);
            uber.shadowOffsetY.set.call(this, offset * pixelRatio);
        }
    });

    Object.defineProperty(contextProto, 'shadowBlur', {
        get: function() {
            return uber.shadowBlur.get.call(this) /
                getPixelRatio(this.canvas);
        },
        set: function(blur) {
            var pixelRatio = getPixelRatio(this.canvas);
            uber.shadowBlur.set.call(this, blur * pixelRatio);
        }
    });
}

function isRetinaSupported () {
    var ctx = document.createElement("canvas").getContext("2d"),
        backingStorePixelRatio = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1,
        canvasProto = HTMLCanvasElement.prototype,
        contextProto = CanvasRenderingContext2D.prototype,
        uber = {
            drawImage: contextProto.drawImage,
            getImageData: contextProto.getImageData,

            width: Object.getOwnPropertyDescriptor(
                canvasProto,
                'width'
            ),
            height: Object.getOwnPropertyDescriptor(
                canvasProto,
                'height'
            ),
            shadowOffsetX: Object.getOwnPropertyDescriptor(
                contextProto,
                'shadowOffsetX'
            ),
            shadowOffsetY: Object.getOwnPropertyDescriptor(
                contextProto,
                'shadowOffsetY'
            ),
            shadowBlur: Object.getOwnPropertyDescriptor(
                contextProto,
                'shadowBlur'
            )
        };
    return backingStorePixelRatio !== window.devicePixelRatio &&
        !(Object.keys(uber).some(function (any) {
            var prop = uber[any];
            return prop.hasOwnProperty('configurable') && (!prop.configurable);
        })
    );
}

function isRetinaEnabled () {
    return HTMLCanvasElement.prototype.hasOwnProperty('_isRetinaEnabled');
}

function disableRetinaSupport() {
    // uninstalls Retina utilities. Make sure to re-create every Canvas
    // element afterwards
    var canvasProto, contextProto, uber;
    if (!isRetinaEnabled()) {return; }
    canvasProto = HTMLCanvasElement.prototype;
    contextProto = CanvasRenderingContext2D.prototype;
    uber = canvasProto._bak;
    Object.defineProperty(canvasProto, 'width', uber.width);
    Object.defineProperty(canvasProto, 'height', uber.height);
    contextProto.drawImage = uber.drawImage;
    contextProto.getImageData = uber.getImageData;
    Object.defineProperty(contextProto, 'shadowOffsetX', uber.shadowOffsetX);
    Object.defineProperty(contextProto, 'shadowOffsetY', uber.shadowOffsetY);
    Object.defineProperty(contextProto, 'shadowBlur', uber.shadowBlur);
    delete canvasProto._isRetinaEnabled;
    delete canvasProto.isRetinaEnabled;
    delete canvasProto._bak;
}

function normalizeCanvas(aCanvas, getCopy) {
    // make sure aCanvas is non-retina, otherwise convert it in place (!)
    // or answer a normalized copy if the "getCopy" flag is <true>
    var cpy;
    if (!aCanvas.isRetinaEnabled) {return aCanvas; }
    cpy = newCanvas(new Point(aCanvas.width, aCanvas.height), true);
    cpy.getContext('2d').drawImage(aCanvas, 0, 0);
    if (getCopy) {return cpy; }
    aCanvas.isRetinaEnabled = false;
    aCanvas.width = cpy.width;
    aCanvas.height = cpy.height;
    aCanvas.getContext('2d').drawImage(cpy, 0, 0);
    return aCanvas;
}

// Animations //////////////////////////////////////////////////////////////

/*
    Animations handle gradual transitions between one state and another over a
    period of time. Transition effects can be specified using easing functions.
    An easing function maps a fraction of the transition time to a fraction of
    the state delta. This way accelerating / decelerating and bouncing sliding
    effects can be accomplished.

    Animations are generic and not limited to motion, i.e. they can also handle
    other transitions such as color changes, transparency fadings, growing,
    shrinking, turning etc.

    Animations need to be stepped by a scheduler, e. g. an interval function.
    In Morphic the preferred way to run an animation is to register it with
    the World by adding it to the World's animation queue. The World steps each
    registered animation once per display cycle independently of the Morphic
    stepping mechanism.

    For an example how to use animations look at how the Morph's methods

        glideTo()
        fadeTo()

    and

        slideBackTo()

    are implemented.
*/

// Animation instance creation:

function Animation(setter, getter, delta, duration, easing, onComplete) {
    this.setter = setter; // function
    this.getter = getter; // function
    this.delta = delta || 0; // number
    this.duration = duration || 0; // milliseconds
    this.easing = isString(easing) ? // string or function
            this.easings[easing] || this.easings.sinusoidal
                : easing || this.easings.sinusoidal;
    this.onComplete = onComplete || null; // optional callback
    this.endTime = null;
    this.destination = null;
    this.isActive = false;
    this.start();
}

Animation.prototype.easings = {
    // dictionary of a few pre-defined easing functions used to transition
    // two states

    // ease both in and out:
    linear: function (t) {return t; },
    sinusoidal: function (t) {return 1 - Math.cos(radians(t * 90)); },
    quadratic: function (t) {
        return t < 0.5 ?
                2 * t * t
                    : ((4 - (2 * t)) * t) - 1;
    },
    cubic: function (t) {
        return t < 0.5 ?
                4 * t * t * t
                    : ((t - 1) * ((2 * t) - 2) * ((2 * t) - 2)) + 1;
    },
    elastic: function (t) {
        return (t -= 0.5) < 0 ?
            (0.01 + 0.01 / t) * Math.sin(50 * t)
                : (0.02 - 0.01 / t) * Math.sin(50 * t) + 1;
    },

    // ease in only:
    sine_in: function (t) {return 1 - Math.sin(radians(90 + (t * 90))); },
    quad_in: function (t) {return t * t; },
    cubic_in: function (t) {return t * t * t; },
    elastic_in: function (t) {
        return (0.04 - 0.04 / t) * Math.sin(25 * t) + 1;
    },

    // ease out only:
    sine_out: function (t) {return Math.sin(radians(t * 90)); },
    quad_out: function (t) {return t * (2 - t); },
    elastic_out: function (t) {return 0.04 * t / (--t) * Math.sin(25 * t); }
};

Animation.prototype.start = function () {
    // (re-) activate the animation, e.g. if is has previously completed,
    // make sure to plug it into something that repeatedly triggers step(),
    // e.g. the World's animations queue
    this.endTime = Date.now() + this.duration;
    this.destination = this.getter.call(this) + this.delta;
    this.isActive = true;
};

Animation.prototype.step = function () {
    if (!this.isActive) {return; }
    var now = Date.now();
    if (now > this.endTime) {
        this.setter(this.destination);
        this.isActive = false;
        if (this.onComplete) {this.onComplete(); }
    } else {
        this.setter(
            this.destination -
                (this.delta * this.easing((this.endTime - now) / this.duration))
        );
    }
};

// Colors //////////////////////////////////////////////////////////////

// Color instance creation:

function Color(r, g, b, a) {
    // all values are optional, just (r, g, b) is fine
    this.r = r || 0;
    this.g = g || 0;
    this.b = b || 0;
    this.a = a || ((a === 0) ? 0 : 1);
}

// Color string representation: e.g. 'rgba(255,165,0,1)'

Color.prototype.toString = function () {
    return 'rgba(' +
        Math.round(this.r) + ',' +
        Math.round(this.g) + ',' +
        Math.round(this.b) + ',' +
        this.a + ')';
};

Color.prototype.toRGBstring = function () {
    return 'rgb(' +
        Math.round(this.r) + ',' +
        Math.round(this.g) + ',' +
        Math.round(this.b) + ')';
};

Color.fromString = function (aString) {
    // I parse rgb/rgba strings into a Color object
    var components = aString.split(/[\(),]/).slice(1,5);
    return new Color(components[0], components[1], components[2], components[3]);
};

// Color copying:

Color.prototype.copy = function () {
    return new Color(
        this.r,
        this.g,
        this.b,
        this.a
    );
};

// Color comparison:

Color.prototype.eq = function (aColor, observeAlpha) {
    // ==
    return aColor &&
        this.r === aColor.r &&
        this.g === aColor.g &&
        this.b === aColor.b &&
        (observeAlpha ? this.a === aColor.a : true);
};

Color.prototype.isCloseTo = function (aColor, observeAlpha, tolerance) {
    // experimental - answer whether a color is "close" to another one by
    // a given percentage. tolerance is the percentage by which each color
    // channel may diverge, alpha needs to be the exact same unless ignored
    var thres = 2.55 * (tolerance || 10);

    function dist(a, b) {
        var diff = a - b;
        return diff < 0 ? 255 + diff : diff;
    }

    return aColor &&
        dist(this.r, aColor.r) < thres &&
        dist(this.g, aColor.g) < thres &&
        dist(this.b, aColor.b) < thres &&
        (observeAlpha ? this.a === aColor.a : true);
};

// Color conversion (hsv):

Color.prototype.hsv = function () {
    // ignore alpha
    var max, min, h, s, v, d,
        rr = this.r / 255,
        gg = this.g / 255,
        bb = this.b / 255;
    max = Math.max(rr, gg, bb);
    min = Math.min(rr, gg, bb);
    h = max;
    s = max;
    v = max;
    d = max - min;
    s = max === 0 ? 0 : d / max;
    if (max === min) {
        h = 0;
    } else {
        switch (max) {
        case rr:
            h = (gg - bb) / d + (gg < bb ? 6 : 0);
            break;
        case gg:
            h = (bb - rr) / d + 2;
            break;
        case bb:
            h = (rr - gg) / d + 4;
            break;
        }
        h /= 6;
    }
    return [h, s, v];
};

Color.prototype.set_hsv = function (h, s, v) {
    // ignore alpha, h, s and v are to be within [0, 1]
    var i, f, p, q, t;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
    case 0:
        this.r = v;
        this.g = t;
        this.b = p;
        break;
    case 1:
        this.r = q;
        this.g = v;
        this.b = p;
        break;
    case 2:
        this.r = p;
        this.g = v;
        this.b = t;
        break;
    case 3:
        this.r = p;
        this.g = q;
        this.b = v;
        break;
    case 4:
        this.r = t;
        this.g = p;
        this.b = v;
        break;
    case 5:
        this.r = v;
        this.g = p;
        this.b = q;
        break;
    }

    this.r *= 255;
    this.g *= 255;
    this.b *= 255;

};

// Color conversion (hsl):

Color.prototype.hsl = function () {
    // ignore alpha
    var rr = this.r / 255,
        gg = this.g / 255,
        bb = this.b / 255,
        max = Math.max(rr, gg, bb), min = Math.min(rr, gg, bb),
        h,
        s,
        l = (max + min) / 2,
        d;
    if (max === min) { // achromatic
        h = 0;
        s = 0;
    } else {
        d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
        case rr:
            h = (gg - bb) / d + (gg < bb ? 6 : 0);
            break;
        case gg:
            h = (bb - rr) / d + 2;
            break;
        case bb:
            h = (rr - gg) / d + 4;
            break;
        }
        h /= 6;
    }
    return [h, s, l];
};

Color.prototype.set_hsl = function (h, s, l) {
    // ignore alpha, h, s and l are to be within [0, 1]
    var q, p;

    function hue2rgb(p, q, t) {
        if (t < 0) {
            t += 1;
        }
        if (t > 1) {
            t -= 1;
        }
        if (t < 1/6) {
            return p + (q - p) * 6 * t;
        }
        if (t < 1/2) {
            return q;
        }
        if (t < 2/3) {
            return p + (q - p) * (2/3 - t) * 6;
        }
        return p;
    }

    if (s == 0) { // achromatic
        this.r = l;
        this.g = l;
        this.b = l;
    } else {
        q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        p = 2 * l - q;
        this.r = hue2rgb(p, q, h + 1/3);
        this.g = hue2rgb(p, q, h);
        this.b = hue2rgb(p, q, h - 1/3);
    }

    this.r *= 255;
    this.g *= 255;
    this.b *= 255;
};

// Color mixing:

Color.prototype.mixed = function (proportion, otherColor) {
    // answer a copy of this color mixed with another color, ignore alpha
    var frac1 = Math.min(Math.max(proportion, 0), 1),
        frac2 = 1 - frac1;
    return new Color(
        this.r * frac1 + otherColor.r * frac2,
        this.g * frac1 + otherColor.g * frac2,
        this.b * frac1 + otherColor.b * frac2
    );
};

Color.prototype.darker = function (percent) {
    // return an rgb-interpolated darker copy of me, ignore alpha
    var fract = 0.8333;
    if (percent) {
        fract = (100 - percent) / 100;
    }
    return this.mixed(fract, new Color(0, 0, 0));
};

Color.prototype.lighter = function (percent) {
    // return an rgb-interpolated lighter copy of me, ignore alpha
    var fract = 0.8333;
    if (percent) {
        fract = (100 - percent) / 100;
    }
    return this.mixed(fract, new Color(255, 255, 255));
};

Color.prototype.dansDarker = function () {
    // return an hsv-interpolated darker copy of me, ignore alpha
    var hsv = this.hsv(),
        result = new Color(),
        vv = Math.max(hsv[2] - 0.16, 0);
    result.set_hsv(hsv[0], hsv[1], vv);
    return result;
};

Color.prototype.inverted = function () {
    return new Color(
        255 - this.r,
        255 - this.g,
        255 - this.b
    );
};

// Points //////////////////////////////////////////////////////////////

// Point instance creation:

function Point(x, y) {
    this.x = x || 0;
    this.y = y || 0;
}

// Point string representation: e.g. '12@68'

Point.prototype.toString = function () {
    return Math.round(this.x.toString()) +
        '@' + Math.round(this.y.toString());
};

// Point copying:

Point.prototype.copy = function () {
    return new Point(this.x, this.y);
};

// Point comparison:

Point.prototype.eq = function (aPoint) {
    // ==
    return this.x === aPoint.x && this.y === aPoint.y;
};

Point.prototype.lt = function (aPoint) {
    // <
    return this.x < aPoint.x && this.y < aPoint.y;
};

Point.prototype.gt = function (aPoint) {
    // >
    return this.x > aPoint.x && this.y > aPoint.y;
};

Point.prototype.ge = function (aPoint) {
    // >=
    return this.x >= aPoint.x && this.y >= aPoint.y;
};

Point.prototype.le = function (aPoint) {
    // <=
    return this.x <= aPoint.x && this.y <= aPoint.y;
};

Point.prototype.max = function (aPoint) {
    return new Point(Math.max(this.x, aPoint.x),
        Math.max(this.y, aPoint.y));
};

Point.prototype.min = function (aPoint) {
    return new Point(Math.min(this.x, aPoint.x),
        Math.min(this.y, aPoint.y));
};

// Point conversion:

Point.prototype.round = function () {
    return new Point(Math.round(this.x), Math.round(this.y));
};

Point.prototype.abs = function () {
    return new Point(Math.abs(this.x), Math.abs(this.y));
};

Point.prototype.neg = function () {
    return new Point(-this.x, -this.y);
};

Point.prototype.mirror = function () {
    return new Point(this.y, this.x);
};

Point.prototype.floor = function () {
    return new Point(
        Math.max(Math.floor(this.x), 0),
        Math.max(Math.floor(this.y), 0)
    );
};

Point.prototype.ceil = function () {
    return new Point(Math.ceil(this.x), Math.ceil(this.y));
};

// Point arithmetic:

Point.prototype.add = function (other) {
    if (other instanceof Point) {
        return new Point(this.x + other.x, this.y + other.y);
    }
    return new Point(this.x + other, this.y + other);
};

Point.prototype.subtract = function (other) {
    if (other instanceof Point) {
        return new Point(this.x - other.x, this.y - other.y);
    }
    return new Point(this.x - other, this.y - other);
};

Point.prototype.multiplyBy = function (other) {
    if (other instanceof Point) {
        return new Point(this.x * other.x, this.y * other.y);
    }
    return new Point(this.x * other, this.y * other);
};

Point.prototype.divideBy = function (other) {
    if (other instanceof Point) {
        return new Point(this.x / other.x, this.y / other.y);
    }
    return new Point(this.x / other, this.y / other);
};

Point.prototype.floorDivideBy = function (other) {
    if (other instanceof Point) {
        return new Point(Math.floor(this.x / other.x),
            Math.floor(this.y / other.y));
    }
    return new Point(Math.floor(this.x / other),
        Math.floor(this.y / other));
};

// Point polar coordinates:

Point.prototype.r = function () {
    var t = (this.multiplyBy(this));
    return Math.sqrt(t.x + t.y);
};

Point.prototype.degrees = function () {
/*
    answer the angle I make with origin in degrees.
    Right is 0, down is 90
*/
    var tan, theta;

    if (this.x === 0) {
        if (this.y >= 0) {
            return 90;
        }
        return 270;
    }
    tan = this.y / this.x;
    theta = Math.atan(tan);
    if (this.x >= 0) {
        if (this.y >= 0) {
            return degrees(theta);
        }
        return 360 + (degrees(theta));
    }
    return 180 + degrees(theta);
};

Point.prototype.theta = function () {
/*
    answer the angle I make with origin in radians.
    Right is 0, down is 90
*/
    var tan, theta;

    if (this.x === 0) {
        if (this.y >= 0) {
            return radians(90);
        }
        return radians(270);
    }
    tan = this.y / this.x;
    theta = Math.atan(tan);
    if (this.x >= 0) {
        if (this.y >= 0) {
            return theta;
        }
        return radians(360) + theta;
    }
    return radians(180) + theta;
};

// Point functions:

Point.prototype.crossProduct = function (aPoint) {
    return this.multiplyBy(aPoint.mirror());
};

Point.prototype.distanceTo = function (aPoint) {
    return (aPoint.subtract(this)).r();
};

Point.prototype.rotate = function (direction, center) {
    // direction must be 'right', 'left' or 'pi'
    var offset = this.subtract(center);
    if (direction === 'right') {
        return new Point(-offset.y, offset.y).add(center);
    }
    if (direction === 'left') {
        return new Point(offset.y, -offset.y).add(center);
    }
    // direction === 'pi'
    return center.subtract(offset);
};

Point.prototype.flip = function (direction, center) {
    // direction must be 'vertical' or 'horizontal'
    if (direction === 'vertical') {
        return new Point(this.x, center.y * 2 - this.y);
    }
    // direction === 'horizontal'
    return new Point(center.x * 2 - this.x, this.y);
};

Point.prototype.distanceAngle = function (dist, angle) {
    var deg = angle, x, y;
    if (deg > 270) {
        deg = deg - 360;
    } else if (deg < -270) {
        deg = deg + 360;
    }
    if (-90 <= deg && deg <= 90) {
        x = Math.sin(radians(deg)) * dist;
        y = Math.sqrt((dist * dist) - (x * x));
        return new Point(x + this.x, this.y - y);
    }
    x = Math.sin(radians(180 - deg)) * dist;
    y = Math.sqrt((dist * dist) - (x * x));
    return new Point(x + this.x, this.y + y);
};

// Point transforming:

Point.prototype.scaleBy = function (scalePoint) {
    return this.multiplyBy(scalePoint);
};

Point.prototype.translateBy = function (deltaPoint) {
    return this.add(deltaPoint);
};

Point.prototype.rotateBy = function (angle, centerPoint) {
    var center = centerPoint || new Point(0, 0),
        p = this.subtract(center),
        r = p.r(),
        theta = angle - p.theta();
    return new Point(
        center.x + (r * Math.cos(theta)),
        center.y - (r * Math.sin(theta))
    );
};

// Point conversion:

Point.prototype.asArray = function () {
    return [this.x, this.y];
};

// Rectangles //////////////////////////////////////////////////////////

// Rectangle instance creation:

function Rectangle(left, top, right, bottom) {
    this.init(new Point((left || 0), (top || 0)),
            new Point((right || 0), (bottom || 0)));
}

Rectangle.prototype.init = function (originPoint, cornerPoint) {
    this.origin = originPoint;
    this.corner = cornerPoint;
};

// Rectangle string representation: e.g. '[0@0 | 160@80]'

Rectangle.prototype.toString = function () {
    return '[' + this.origin.toString() + ' | ' +
        this.extent().toString() + ']';
};

// Rectangle copying:

Rectangle.prototype.copy = function () {
    return new Rectangle(
        this.left(),
        this.top(),
        this.right(),
        this.bottom()
    );
};

// creating Rectangle instances from Points:

Point.prototype.corner = function (cornerPoint) {
    // answer a new Rectangle
    return new Rectangle(
        this.x,
        this.y,
        cornerPoint.x,
        cornerPoint.y
    );
};

Point.prototype.rectangle = function (aPoint) {
    // answer a new Rectangle
    var org, crn;
    org = this.min(aPoint);
    crn = this.max(aPoint);
    return new Rectangle(org.x, org.y, crn.x, crn.y);
};

Point.prototype.extent = function (aPoint) {
    //answer a new Rectangle
    var crn = this.add(aPoint);
    return new Rectangle(this.x, this.y, crn.x, crn.y);
};

// Rectangle accessing - setting:

Rectangle.prototype.setTo = function (left, top, right, bottom) {
    // note: all inputs are optional and can be omitted

    this.origin = new Point(
        left || ((left === 0) ? 0 : this.left()),
        top || ((top === 0) ? 0 : this.top())
    );

    this.corner = new Point(
        right || ((right === 0) ? 0 : this.right()),
        bottom || ((bottom === 0) ? 0 : this.bottom())
    );
};

// Rectangle accessing - getting:

Rectangle.prototype.area = function () {
    //requires width() and height() to be defined
    var w = this.width();
    if (w < 0) {
        return 0;
    }
    return Math.max(w * this.height(), 0);
};

Rectangle.prototype.bottom = function () {
    return this.corner.y;
};

Rectangle.prototype.bottomCenter = function () {
    return new Point(this.center().x, this.bottom());
};

Rectangle.prototype.bottomLeft = function () {
    return new Point(this.origin.x, this.corner.y);
};

Rectangle.prototype.bottomRight = function () {
    return this.corner.copy();
};

Rectangle.prototype.boundingBox = function () {
    return this;
};

Rectangle.prototype.center = function () {
    return this.origin.add(
        this.corner.subtract(this.origin).floorDivideBy(2)
    );
};

Rectangle.prototype.corners = function () {
    return [this.origin,
        this.bottomLeft(),
        this.corner,
        this.topRight()];
};

Rectangle.prototype.extent = function () {
    return this.corner.subtract(this.origin);
};

Rectangle.prototype.height = function () {
    return this.corner.y - this.origin.y;
};

Rectangle.prototype.left = function () {
    return this.origin.x;
};

Rectangle.prototype.leftCenter = function () {
    return new Point(this.left(), this.center().y);
};

Rectangle.prototype.right = function () {
    return this.corner.x;
};

Rectangle.prototype.rightCenter = function () {
    return new Point(this.right(), this.center().y);
};

Rectangle.prototype.top = function () {
    return this.origin.y;
};

Rectangle.prototype.topCenter = function () {
    return new Point(this.center().x, this.top());
};

Rectangle.prototype.topLeft = function () {
    return this.origin;
};

Rectangle.prototype.topRight = function () {
    return new Point(this.corner.x, this.origin.y);
};

Rectangle.prototype.width = function () {
    return this.corner.x - this.origin.x;
};

Rectangle.prototype.position = function () {
    return this.origin;
};

// Rectangle comparison:

Rectangle.prototype.eq = function (aRect) {
    return this.origin.eq(aRect.origin) &&
        this.corner.eq(aRect.corner);
};

Rectangle.prototype.abs = function () {
    var newOrigin, newCorner;

    newOrigin = this.origin.abs();
    newCorner = this.corner.max(newOrigin);
    return newOrigin.corner(newCorner);
};

// Rectangle functions:

Rectangle.prototype.insetBy = function (delta) {
    // delta can be either a Point or a Number
    var result = new Rectangle();
    result.origin = this.origin.add(delta);
    result.corner = this.corner.subtract(delta);
    return result;
};

Rectangle.prototype.expandBy = function (delta) {
    // delta can be either a Point or a Number
    var result = new Rectangle();
    result.origin = this.origin.subtract(delta);
    result.corner = this.corner.add(delta);
    return result;
};

Rectangle.prototype.growBy = function (delta) {
    // delta can be either a Point or a Number
    var result = new Rectangle();
    result.origin = this.origin.copy();
    result.corner = this.corner.add(delta);
    return result;
};

Rectangle.prototype.intersect = function (aRect) {
    var result = new Rectangle();
    result.origin = this.origin.max(aRect.origin);
    result.corner = this.corner.min(aRect.corner);
    return result;
};

Rectangle.prototype.merge = function (aRect) {
    var result = new Rectangle();
    result.origin = this.origin.min(aRect.origin);
    result.corner = this.corner.max(aRect.corner);
    return result;
};

Rectangle.prototype.mergeWith = function (aRect) {
    // mutates myself
    this.origin = this.origin.min(aRect.origin);
    this.corner = this.corner.max(aRect.corner);
};

Rectangle.prototype.round = function () {
    return this.origin.round().corner(this.corner.round());
};

Rectangle.prototype.spread = function () {
    // round me by applying floor() to my origin and ceil() to my corner
    // expand by 1 to be on the safe side, this eliminates rounding
    // artifacts caused by Safari's auto-scaling on retina displays
    return this.origin.floor().corner(this.corner.ceil()).expandBy(1);
};

Rectangle.prototype.amountToTranslateWithin = function (aRect) {
/*
    Answer a Point, delta, such that self + delta is forced within
    aRectangle. when all of me cannot be made to fit, prefer to keep
    my topLeft inside. Taken from Squeak.
*/
    var dx = 0, dy = 0;

    if (this.right() > aRect.right()) {
        dx = aRect.right() - this.right();
    }
    if (this.bottom() > aRect.bottom()) {
        dy = aRect.bottom() - this.bottom();
    }
    if ((this.left() + dx) < aRect.left()) {
        dx = aRect.left() - this.left();
    }
    if ((this.top() + dy) < aRect.top()) {
        dy = aRect.top() - this.top();
    }
    return new Point(dx, dy);
};

// Rectangle testing:

Rectangle.prototype.containsPoint = function (aPoint) {
    return this.origin.le(aPoint) && aPoint.lt(this.corner);
};

Rectangle.prototype.containsRectangle = function (aRect) {
    return aRect.origin.gt(this.origin) &&
        aRect.corner.lt(this.corner);
};

Rectangle.prototype.intersects = function (aRect) {
    var ro = aRect.origin, rc = aRect.corner;
    return (rc.x >= this.origin.x) &&
        (rc.y >= this.origin.y) &&
        (ro.x <= this.corner.x) &&
        (ro.y <= this.corner.y);
};

Rectangle.prototype.isNearTo = function (aRect, threshold) {
    var ro = aRect.origin, rc = aRect.corner, border = threshold || 0;
    return (rc.x + border >= this.origin.x) &&
        (rc.y  + border >= this.origin.y) &&
        (ro.x - border <= this.corner.x) &&
        (ro.y - border <= this.corner.y);
};

// Rectangle transforming:

Rectangle.prototype.scaleBy = function (scale) {
    // scale can be either a Point or a scalar
    var o = this.origin.multiplyBy(scale),
        c = this.corner.multiplyBy(scale);
    return new Rectangle(o.x, o.y, c.x, c.y);
};

Rectangle.prototype.translateBy = function (factor) {
    // factor can be either a Point or a scalar
    var o = this.origin.add(factor),
        c = this.corner.add(factor);
    return new Rectangle(o.x, o.y, c.x, c.y);
};

// Rectangle converting:

Rectangle.prototype.asArray = function () {
    return [this.left(), this.top(), this.right(), this.bottom()];
};

Rectangle.prototype.asArray_xywh = function () {
    return [this.left(), this.top(), this.width(), this.height()];
};

// Nodes ///////////////////////////////////////////////////////////////

// Node instance creation:

function Node(parent, childrenArray) {
    this.init(parent || null, childrenArray || []);
}

Node.prototype.init = function (parent, childrenArray) {
    this.parent = parent || null;
    this.children = childrenArray || [];
};

// Node string representation: e.g. 'a Node[3]'

Node.prototype.toString = function () {
    return 'a Node' + '[' + this.children.length.toString() + ']';
};

// Node accessing:

Node.prototype.addChild = function (aNode) {
    this.children.push(aNode);
    aNode.parent = this;
};

Node.prototype.addChildFirst = function (aNode) {
    this.children.splice(0, null, aNode);
    aNode.parent = this;
};

Node.prototype.removeChild = function (aNode) {
    var idx = this.children.indexOf(aNode);
    if (idx !== -1) {
        this.children.splice(idx, 1);
    }
};

// Node functions:

Node.prototype.root = function () {
    if (this.parent === null) {
        return this;
    }
    return this.parent.root();
};

Node.prototype.depth = function () {
    if (this.parent === null) {
        return 0;
    }
    return this.parent.depth() + 1;
};

Node.prototype.allChildren = function () {
    // includes myself
    var result = [this];
    this.children.forEach(function (child) {
        result = result.concat(child.allChildren());
    });
    return result;
};

Node.prototype.forAllChildren = function (aFunction) {
    if (this.children.length > 0) {
        this.children.forEach(function (child) {
            child.forAllChildren(aFunction);
        });
    }
    aFunction.call(null, this);
};

Node.prototype.anyChild = function (aPredicate) {
    // includes myself
    var i;
    if (aPredicate.call(null, this)) {
        return true;
    }
    for (i = 0; i < this.children.length; i += 1) {
        if (this.children[i].anyChild(aPredicate)) {
            return true;
        }
    }
    return false;
};

Node.prototype.allLeafs = function () {
    var result = [];
    this.allChildren().forEach(function (element) {
        if (element.children.length === 0) {
            result.push(element);
        }
    });
    return result;
};

Node.prototype.allParents = function () {
    // includes myself
    var result = [this];
    if (this.parent !== null) {
        result = result.concat(this.parent.allParents());
    }
    return result;
};

Node.prototype.siblings = function () {
    var myself = this;
    if (this.parent === null) {
        return [];
    }
    return this.parent.children.filter(function (child) {
        return child !== myself;
    });
};

Node.prototype.parentThatIsA = function () {
    // including myself
    // Note: you can pass in multiple constructors to test for
    var i;
    for (i = 0; i < arguments.length; i += 1) {
        if (this instanceof arguments[i]) {
            return this;
        }
    }
    if (!this.parent) {
        return null;
    }
    return this.parentThatIsA.apply(this.parent, arguments);
};

Node.prototype.parentThatIsAnyOf = function (constructors) {
    // deprecated, use parentThatIsA instead
    return this.parentThatIsA.apply(this, constructors);
};

// Morphs //////////////////////////////////////////////////////////////

// Morph: referenced constructors

var Morph;
var WorldMorph;
var HandMorph;
var ShadowMorph;
var FrameMorph;
var MenuMorph;
var HandleMorph;
var StringFieldMorph;
var ColorPickerMorph;
var SliderMorph;
var ScrollFrameMorph;
var InspectorMorph;
var StringMorph;
var TextMorph;

// Morph inherits from Node:

Morph.prototype = new Node();
Morph.prototype.constructor = Morph;
Morph.uber = Node.prototype;

// Morph settings:

/*
    damage list housekeeping

    the trackChanges property of the Morph prototype is a Boolean switch
    that determines whether the World's damage list ('broken' rectangles)
    tracks changes. By default the switch is always on. If set to false
    changes are not stored. This can be very useful for housekeeping of
    the damage list in situations where a large number of (sub-) morphs
    are changed more or less at once. Instead of keeping track of every
    single submorph's changes tremendous performance improvements can be
    achieved by setting the trackChanges flag to false before propagating
    the layout changes, setting it to true again and then storing the full
    bounds of the surrounding morph. As an example refer to the

        fixLayout()

    method of InspectorMorph, or the

        startLayout()
        endLayout()

    methods of SyntaxElementMorph in the Snap application.
*/

Morph.prototype.trackChanges = true;
Morph.prototype.shadowBlur = 4;

// Morph instance creation:

function Morph() {
    this.init();
}

// Morph initialization:

Morph.prototype.init = function (noDraw) {
    Morph.uber.init.call(this);
    this.isMorph = true;
    this.image = null;
    this.bounds = new Rectangle(0, 0, 50, 40);
    this.cachedFullImage = null;
    this.cachedFullBounds = null;
    this.color = new Color(80, 80, 80);
    this.texture = null; // optional url of a fill-image
    this.cachedTexture = null; // internal cache of actual bg image
    this.alpha = 1;
    this.isVisible = true;
    this.isDraggable = false;
    this.isTemplate = false;
    this.acceptsDrops = false;
    this.noticesTransparentClick = false;
    if (!noDraw) {this.drawNew(); }
    this.fps = 0;
    this.customContextMenu = null;
    this.lastTime = Date.now();
    this.onNextStep = null; // optional function to be run once
};

// Morph string representation: e.g. 'a Morph 2 [20@45 | 130@250]'

Morph.prototype.toString = function () {
    return 'a ' +
        (this.constructor.name ||
            this.constructor.toString().split(' ')[1].split('(')[0]) +
        ' ' +
        this.children.length.toString() + ' ' +
        this.bounds;
};

// Morph deleting:

Morph.prototype.destroy = function () {
    if (this.parent !== null) {
        this.fullChanged();
        this.parent.removeChild(this);
    }
};

// Morph stepping:

Morph.prototype.stepFrame = function () {
    if (!this.step) {
        return null;
    }
    var current, elapsed, leftover, nxt;
    current = Date.now();
    elapsed = current - this.lastTime;
    if (this.fps > 0) {
        leftover = (1000 / this.fps) - elapsed;
    } else {
        leftover = 0;
    }
    if (leftover < 1) {
        this.lastTime = current;
        if (this.onNextStep) {
            nxt = this.onNextStep;
            this.onNextStep = null;
            nxt.call(this);
        }
        this.step();
        this.children.forEach(function (child) {
            child.stepFrame();
        });
    }
};

Morph.prototype.nextSteps = function (arrayOfFunctions) {
    var lst = arrayOfFunctions || [],
        nxt = lst.shift(),
        myself = this;
    if (nxt) {
        this.onNextStep = function () {
            nxt.call(myself);
            myself.nextSteps(lst);
        };
    }
};

Morph.prototype.step = nop;

// Morph accessing - geometry getting:

Morph.prototype.left = function () {
    return this.bounds.left();
};

Morph.prototype.right = function () {
    return this.bounds.right();
};

Morph.prototype.top = function () {
    return this.bounds.top();
};

Morph.prototype.bottom = function () {
    return this.bounds.bottom();
};

Morph.prototype.center = function () {
    return this.bounds.center();
};

Morph.prototype.bottomCenter = function () {
    return this.bounds.bottomCenter();
};

Morph.prototype.bottomLeft = function () {
    return this.bounds.bottomLeft();
};

Morph.prototype.bottomRight = function () {
    return this.bounds.bottomRight();
};

Morph.prototype.boundingBox = function () {
    return this.bounds;
};

Morph.prototype.corners = function () {
    return this.bounds.corners();
};

Morph.prototype.leftCenter = function () {
    return this.bounds.leftCenter();
};

Morph.prototype.rightCenter = function () {
    return this.bounds.rightCenter();
};

Morph.prototype.topCenter = function () {
    return this.bounds.topCenter();
};

Morph.prototype.topLeft = function () {
    return this.bounds.topLeft();
};

Morph.prototype.topRight = function () {
    return this.bounds.topRight();
};
Morph.prototype.position = function () {
    return this.bounds.origin;
};

Morph.prototype.extent = function () {
    return this.bounds.extent();
};

Morph.prototype.width = function () {
    return this.bounds.width();
};

Morph.prototype.height = function () {
    return this.bounds.height();
};

Morph.prototype.fullBounds = function () {
    var result;
    result = this.bounds;
    this.children.forEach(function (child) {
        if (child.isVisible) {
            result = result.merge(child.fullBounds());
        }
    });
    return result;
};

Morph.prototype.fullBoundsNoShadow = function () {
    // answer my full bounds but ignore any shadow
    var result;
    result = this.bounds;
    this.children.forEach(function (child) {
        if (!(child instanceof ShadowMorph) && (child.isVisible)) {
            result = result.merge(child.fullBounds());
        }
    });
    return result;
};

Morph.prototype.visibleBounds = function () {
    // answer which part of me is not clipped by a Frame
    var visible = this.bounds,
        frames = this.allParents().filter(function (p) {
            return p instanceof FrameMorph;
        });
    frames.forEach(function (f) {
        visible = visible.intersect(f.bounds);
    });
    return visible;
};

// Morph accessing - simple changes:

Morph.prototype.moveBy = function (delta) {
    this.fullChanged();
    this.silentMoveBy(delta);
    this.fullChanged();
};

Morph.prototype.silentMoveBy = function (delta) {
    var children = this.children,
        i = children.length;
    this.bounds = this.bounds.translateBy(delta);
    if (this.cachedFullBounds) {
        this.cachedFullBounds = this.cachedFullBounds.translateBy(delta);
    }
    // ugly optimization avoiding forEach()
    for (i; i > 0; i -= 1) {
        children[i - 1].silentMoveBy(delta);
    }
};

Morph.prototype.setPosition = function (aPoint) {
    var delta = aPoint.subtract(this.topLeft());
    if ((delta.x !== 0) || (delta.y !== 0)) {
        this.moveBy(delta);
    }
};

Morph.prototype.silentSetPosition = function (aPoint) {
    var delta = aPoint.subtract(this.topLeft());
    if ((delta.x !== 0) || (delta.y !== 0)) {
        this.silentMoveBy(delta);
    }
};

Morph.prototype.setLeft = function (x) {
    this.setPosition(
        new Point(
            x,
            this.top()
        )
    );
};

Morph.prototype.setRight = function (x) {
    this.setPosition(
        new Point(
            x - this.width(),
            this.top()
        )
    );
};

Morph.prototype.setTop = function (y) {
    this.setPosition(
        new Point(
            this.left(),
            y
        )
    );
};

Morph.prototype.setBottom = function (y) {
    this.setPosition(
        new Point(
            this.left(),
            y - this.height()
        )
    );
};

Morph.prototype.setCenter = function (aPoint) {
    this.setPosition(
        aPoint.subtract(
            this.extent().floorDivideBy(2)
        )
    );
};

Morph.prototype.setFullCenter = function (aPoint) {
    this.setPosition(
        aPoint.subtract(
            this.fullBounds().extent().floorDivideBy(2)
        )
    );
};

Morph.prototype.keepWithin = function (aMorph) {
    // make sure I am completely within another Morph's bounds
    var leftOff, rightOff, topOff, bottomOff;
    rightOff = this.fullBounds().right() - aMorph.right();
    if (rightOff > 0) {
        this.moveBy(new Point(-rightOff, 0));
    }
    leftOff = this.fullBounds().left() - aMorph.left();
    if (leftOff < 0) {
        this.moveBy(new Point(-leftOff, 0));
    }
    bottomOff = this.fullBounds().bottom() - aMorph.bottom();
    if (bottomOff > 0) {
        this.moveBy(new Point(0, -bottomOff));
    }
    topOff = this.fullBounds().top() - aMorph.top();
    if (topOff < 0) {
        this.moveBy(new Point(0, -topOff));
    }
};

Morph.prototype.scrollIntoView = function () {
    var leftOff, rightOff, topOff, bottomOff,
        sf = this.parentThatIsA(ScrollFrameMorph);
    if (!sf) {return; }
    rightOff = Math.min(
        this.fullBounds().right() - sf.right(),
        sf.contents.right() - sf.right()
    );
    if (rightOff > 0) {
        sf.contents.moveBy(new Point(-rightOff, 0));
    }
    leftOff = this.fullBounds().left() - sf.left();
    if (leftOff < 0) {
        sf.contents.moveBy(new Point(-leftOff, 0));
    }
    topOff = this.fullBounds().top() - sf.top();
    if (topOff < 0) {
        sf.contents.moveBy(new Point(0, -topOff));
    }
    bottomOff = this.fullBounds().bottom() - sf.bottom();
    if (bottomOff > 0) {
        sf.contents.moveBy(new Point(0, -bottomOff));
    }
    sf.adjustScrollBars();
};

// Morph accessing - dimensional changes requiring a complete redraw

Morph.prototype.setExtent = function (aPoint, silently) {
    // silently avoids redrawing the receiver
    if (silently) {
        this.silentSetExtent(aPoint);
        return;
    }
    if (!aPoint.eq(this.extent())) {
        this.changed();
        this.silentSetExtent(aPoint);
        this.changed();
        this.drawNew();
    }
};

Morph.prototype.silentSetExtent = function (aPoint) {
    var ext, newWidth, newHeight;
    ext = aPoint.round();
    newWidth = Math.max(ext.x, 0);
    newHeight = Math.max(ext.y, 0);
    this.bounds.corner = new Point(
        this.bounds.origin.x + newWidth,
        this.bounds.origin.y + newHeight
    );
};

Morph.prototype.setWidth = function (width) {
    this.setExtent(new Point(width || 0, this.height()));
};

Morph.prototype.silentSetWidth = function (width) {
    // do not drawNew() just yet
    var w = Math.max(Math.round(width || 0), 0);
    this.bounds.corner = new Point(
        this.bounds.origin.x + w,
        this.bounds.corner.y
    );
};

Morph.prototype.setHeight = function (height) {
    this.setExtent(new Point(this.width(), height || 0));
};

Morph.prototype.silentSetHeight = function (height) {
    // do not drawNew() just yet
    var h = Math.max(Math.round(height || 0), 0);
    this.bounds.corner = new Point(
        this.bounds.corner.x,
        this.bounds.origin.y + h
    );
};

Morph.prototype.setColor = function (aColor) {
    if (aColor) {
        if (!this.color.eq(aColor)) {
            this.color = aColor;
            this.changed();
            this.drawNew();
        }
    }
};

// Morph displaying:

Morph.prototype.drawNew = function () {
    // initialize my surface property
    this.image = newCanvas(this.extent(), false, this.image);
    var context = this.image.getContext('2d');
    context.fillStyle = this.color.toString();
    context.fillRect(0, 0, this.width(), this.height());
    if (this.cachedTexture) {
        this.drawCachedTexture();
    } else if (this.texture) {
        this.drawTexture(this.texture);
    }
};

Morph.prototype.drawTexture = function (url) {
    var myself = this;
    this.cachedTexture = new Image();
    this.cachedTexture.onload = function () {
        myself.drawCachedTexture();
    };
    this.cachedTexture.src = this.texture = url; // make absolute
};

Morph.prototype.drawCachedTexture = function () {
    var bg = this.cachedTexture,
        cols = Math.floor(this.image.width / bg.width),
        lines = Math.floor(this.image.height / bg.height),
        x,
        y,
        context = this.image.getContext('2d');

    for (y = 0; y <= lines; y += 1) {
        for (x = 0; x <= cols; x += 1) {
            context.drawImage(bg, x * bg.width, y * bg.height);
        }
    }
    this.changed();
};

/*
Morph.prototype.drawCachedTexture = function () {
    var context = this.image.getContext('2d'),
        pattern = context.createPattern(this.cachedTexture, 'repeat');
    context.fillStyle = pattern;
    context.fillRect(0, 0, this.image.width, this.image.height);
    this.changed();
};
*/

Morph.prototype.drawOn = function (aCanvas, aRect) {
    var rectangle, area, delta, src, context, w, h, sl, st,
        pic = this.cachedFullImage || this.image,
        bounds = this.cachedFullBounds || this.bounds;
    if (!this.isVisible) {
        return null;
    }
    rectangle = aRect || bounds;
    area = rectangle.intersect(bounds);
    if (area.extent().gt(new Point(0, 0))) {
        delta = bounds.position().neg();
        src = area.copy().translateBy(delta);
        context = aCanvas.getContext('2d');
        context.globalAlpha = this.alpha;

        sl = src.left();
        st = src.top();
        w = Math.min(src.width(), pic.width - sl);
        h = Math.min(src.height(), pic.height - st);

        if (w < 1 || h < 1) {
            return null;
        }

        context.drawImage(
            pic,
            sl,
            st,
            w,
            h,
            area.left(),
            area.top(),
            w,
            h
        );
    }
};

Morph.prototype.fullDrawOn = function (aCanvas, aRect) {
    var rectangle;
    if (!this.isVisible) {
        return null;
    }
    rectangle = aRect || this.cachedFullBounds || this.fullBounds();
    this.drawOn(aCanvas, rectangle);
    if (this.cachedFullImage) {return; }
    this.children.forEach(function (child) {
        child.fullDrawOn(aCanvas, rectangle);
    });
};

Morph.prototype.hide = function () {
    this.isVisible = false;
    this.changed();
    this.children.forEach(function (child) {
        child.hide();
    });
};

Morph.prototype.show = function () {
    this.isVisible = true;
    this.changed();
    this.children.forEach(function (child) {
        child.show();
    });
};

Morph.prototype.toggleVisibility = function () {
    this.isVisible = (!this.isVisible);
    this.changed();
    this.children.forEach(function (child) {
        child.toggleVisibility();
    });
};

// Morph full image:

Morph.prototype.fullImageClassic = function () {
    // use the cache since fullDrawOn() will
    var fb = this.cachedFullBounds || this.fullBounds(),
        img = newCanvas(fb.extent()),
        ctx = img.getContext('2d');
    ctx.translate(-fb.origin.x, -fb.origin.y);
    this.fullDrawOn(img, fb);
    img.globalAlpha = this.alpha;
    return img;
};

Morph.prototype.fullImage = function () {
    var img, ctx, fb;
    img = newCanvas(this.fullBounds().extent());
    ctx = img.getContext('2d');
    fb = this.fullBounds();
    this.allChildren().forEach(function (morph) {
        if (morph.isVisible) {
            ctx.globalAlpha = morph.alpha;
            if (morph.image.width && morph.image.height) {
                ctx.drawImage(
                    morph.image,
                    morph.bounds.origin.x - fb.origin.x,
                    morph.bounds.origin.y - fb.origin.y
                );
            }
        }
    });
    return img;
};

// Morph shadow:

Morph.prototype.shadowImage = function (off, color) {
    // fallback for Windows Chrome-Shadow bug
    var fb, img, outline, sha, ctx,
        offset = off || new Point(7, 7),
        clr = color || new Color(0, 0, 0);
    fb = this.fullBounds().extent();
    img = this.fullImage();
    outline = newCanvas(fb);
    ctx = outline.getContext('2d');
    ctx.drawImage(img, 0, 0);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.drawImage(
        img,
        -offset.x,
        -offset.y
    );
    sha = newCanvas(fb);
    ctx = sha.getContext('2d');
    ctx.drawImage(outline, 0, 0);
    ctx.globalCompositeOperation = 'source-atop';
    ctx.fillStyle = clr.toString();
    ctx.fillRect(0, 0, fb.x, fb.y);
    return sha;
};

Morph.prototype.shadowImageBlurred = function (off, color) {
    var fb, img, sha, ctx,
        offset = off || new Point(7, 7),
        blur = this.shadowBlur,
        clr = color || new Color(0, 0, 0);
    fb = this.fullBounds().extent().add(blur * 2);
    img = this.fullImage();
    sha = newCanvas(fb);
    ctx = sha.getContext('2d');
    ctx.shadowOffsetX = offset.x;
    ctx.shadowOffsetY = offset.y;
    ctx.shadowBlur = blur;
    ctx.shadowColor = clr.toString();
    ctx.drawImage(
        img,
        blur - offset.x,
        blur - offset.y
    );
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.drawImage(
        img,
        blur - offset.x,
        blur - offset.y
    );
    return sha;
};

Morph.prototype.shadow = function (off, a, color) {
    var shadow = new ShadowMorph(),
        offset = off || new Point(7, 7),
        alpha = a || ((a === 0) ? 0 : 0.2),
        fb = this.fullBounds();
    shadow.setExtent(fb.extent().add(this.shadowBlur * 2));
    if (useBlurredShadows && !MorphicPreferences.isFlat) {
        shadow.image = this.shadowImageBlurred(offset, color);
        shadow.alpha = alpha;
        shadow.setPosition(fb.origin.add(offset).subtract(this.shadowBlur));
    } else {
        shadow.image = this.shadowImage(offset, color);
        shadow.alpha = alpha;
        shadow.setPosition(fb.origin.add(offset));
    }
    return shadow;
};

Morph.prototype.addShadow = function (off, a, color) {
    var shadow,
        offset = off || new Point(7, 7),
        alpha = a || ((a === 0) ? 0 : 0.2);
    shadow = this.shadow(offset, alpha, color);
    this.addBack(shadow);
    this.fullChanged();
    return shadow;
};

Morph.prototype.getShadow = function () {
    var shadows;
    shadows = this.children.slice(0).reverse().filter(
        function (child) {
            return child instanceof ShadowMorph;
        }
    );
    if (shadows.length !== 0) {
        return shadows[0];
    }
    return null;
};

Morph.prototype.removeShadow = function () {
    var shadow = this.getShadow();
    if (shadow !== null) {
        this.fullChanged();
        this.removeChild(shadow);
    }
};

// Morph pen trails:

Morph.prototype.penTrails = function () {
    // answer my pen trails canvas. default is to answer my image
    return this.image;
};

// Morph updating:

Morph.prototype.changed = function () {
    if (this.trackChanges) {
        var w = this.root();
        if (w instanceof WorldMorph) {
            w.broken.push(this.visibleBounds().spread());
        }
    }
    if (this.parent) {
        this.parent.childChanged(this);
    }
};

Morph.prototype.fullChanged = function () {
    if (this.trackChanges) {
        var w = this.root();
        if (w instanceof WorldMorph) {
            w.broken.push(
                (this.cachedFullBounds || this.fullBounds()).spread()
            );
        }
    }
};

Morph.prototype.childChanged = function () {
    // react to a change in one of my children,
    // default is to just pass this message on upwards
    // override this method for Morphs that need to adjust accordingly
    if (this.parent) {
        this.parent.childChanged(this);
    }
};

// Morph accessing - structure:

Morph.prototype.world = function () {
    var root = this.root();
    if (root instanceof WorldMorph) {
        return root;
    }
    if (root instanceof HandMorph) {
        return root.world;
    }
    return null;
};

Morph.prototype.add = function (aMorph) {
    var owner = aMorph.parent;
    if (owner !== null) {
        owner.removeChild(aMorph);
    }
    this.addChild(aMorph);
};

Morph.prototype.addBack = function (aMorph) {
    var owner = aMorph.parent;
    if (owner !== null) {
        owner.removeChild(aMorph);
    }
    this.addChildFirst(aMorph);
};

Morph.prototype.topMorphAt = function (point) {
    var i, result;
    if (!this.isVisible) {return null; }
    for (i = this.children.length - 1; i >= 0; i -= 1) {
        result = this.children[i].topMorphAt(point);
        if (result) {return result; }
    }
    return this.bounds.containsPoint(point) &&
        (this.noticesTransparentClick || !this.isTransparentAt(point)) ? this
              : null;
};

Morph.prototype.topMorphSuchThat = function (predicate) {
    var next;
    if (predicate.call(null, this)) {
        next = detect(
            this.children.slice(0).reverse(),
            predicate
        );
        if (next) {
            return next.topMorphSuchThat(predicate);
        }
        return this;
    }
    return null;
};

Morph.prototype.overlappedMorphs = function () {
    //exclude the World
    var world = this.world(),
        fb = this.fullBounds(),
        myself = this,
        allParents = this.allParents(),
        allChildren = this.allChildren(),
        morphs;

    morphs = world.allChildren();
    return morphs.filter(function (m) {
        return m.isVisible &&
            m !== myself &&
            m !== world &&
            !contains(allParents, m) &&
            !contains(allChildren, m) &&
            m.fullBounds().intersects(fb);
    });
};

// Morph pixel access:

Morph.prototype.getPixelColor = function (aPoint) {
    var point, context, data;
    point = aPoint.subtract(this.bounds.origin);
    context = this.image.getContext('2d');
    data = context.getImageData(point.x, point.y, 1, 1);
    return new Color(
        data.data[0],
        data.data[1],
        data.data[2],
        data.data[3] / 255
    );
};

Morph.prototype.isTransparentAt = function (aPoint) {
    var point, context, data;
    if (this.bounds.containsPoint(aPoint)) {
        if (this.texture) {
            return false;
        }
        point = aPoint.subtract(this.bounds.origin);
        context = this.image.getContext('2d');
        data = context.getImageData(
            Math.floor(point.x),
            Math.floor(point.y),
            1,
            1
        );
        return data.data[3] === 0;
    }
    return false;
};

// Morph duplicating:

Morph.prototype.copy = function () {
    var c = copy(this);
    c.parent = null;
    c.children = [];
    c.bounds = this.bounds.copy();
    return c;
};

Morph.prototype.fullCopy = function () {
    /*
    Produce a copy of me with my entire tree of submorphs. Morphs
    mentioned more than once are all directed to a single new copy.
    Other properties are also *shallow* copied, so you must override
    to deep copy Arrays and (complex) Objects
    */
    var map = new Map(), c;
    c = this.copyRecordingReferences(map);
    c.forAllChildren(function (m) {
        m.updateReferences(map);
    });
    return c;
};

Morph.prototype.copyRecordingReferences = function (map) {
    /*
    Recursively copy this entire composite morph, recording the
    correspondence between old and new morphs in the given dictionary.
    This dictionary will be used to update intra-composite references
    in the copy. See updateReferences().

    Note: This default implementation copies ONLY morphs. If a morph
    stores morphs in other properties that it wants to copy, then it
    should override this method to do so. The same goes for morphs that
    contain other complex data that should be copied when the morph is
    duplicated.
    */
    var c = this.copy();
    map.set(this, c);
    this.children.forEach(function (m) {
        c.add(m.copyRecordingReferences(map));
    });
    return c;
};

Morph.prototype.updateReferences = function (map) {
    /*
    Update intra-morph references within a composite morph that has
    been copied. For example, if a button refers to morph X in the
    orginal composite then the copy of that button in the new composite
    should refer to the copy of X in new composite, not the original X.
    */
    var properties = Object.keys(this),
        l = properties.length,
        property,
        value,
        reference,
        i;
    for (i = 0; i < l; i += 1) {
        property = properties[i];
        value = this[property];
        if (value && value.isMorph) {
            reference = map.get(value);
            if (reference) { this[property] = reference; }
        }
    }
};

// Morph dragging and dropping:

Morph.prototype.rootForGrab = function () {
    if (this instanceof ShadowMorph) {
        return this.parent.rootForGrab();
    }
    if (this.parent instanceof ScrollFrameMorph) {
        return this.parent;
    }
    if (this.parent === null ||
            this.parent instanceof WorldMorph ||
            this.parent instanceof FrameMorph ||
            this.isDraggable === true) {
        return this;
    }
    return this.parent.rootForGrab();
};

Morph.prototype.isCorrectingOutsideDrag = function () {
    // make sure I don't "trail behind" the hand when dragged
    // override for morphs that you want to be dragged outside
    // their full bounds
    return true;
};

Morph.prototype.wantsDropOf = function (aMorph) {
    // default is to answer the general flag - change for my heirs
    if ((aMorph instanceof HandleMorph) ||
            (aMorph instanceof MenuMorph) ||
            (aMorph instanceof InspectorMorph)) {
        return false;
    }
    return this.acceptsDrops;
};

Morph.prototype.pickUp = function (wrrld) {
    var world = wrrld || this.world();
    this.setPosition(
        world.hand.position().subtract(
            this.extent().floorDivideBy(2)
        )
    );
    world.hand.grab(this);
};

Morph.prototype.isPickedUp = function () {
    return this.parentThatIsA(HandMorph) !== null;
};

Morph.prototype.situation = function () {
    // answer a dictionary specifying where I am right now, so
    // I can slide back to it if I'm dropped somewhere else
    if (this.parent) {
        return {
            origin: this.parent,
            position: this.position().subtract(this.parent.position())
        };
    }
    return null;
};

Morph.prototype.slideBackTo = function (
    situation,
    msecs,
    onBeforeDrop,
    onComplete
) {
    var pos = situation.origin.position().add(situation.position),
        myself = this;
    this.glideTo(
        pos,
        msecs,
        null, // easing
        function () {
            situation.origin.add(myself);
            if (onBeforeDrop) {onBeforeDrop(); }
            if (myself.justDropped) {myself.justDropped(); }
            if (situation.origin.reactToDropOf) {
                situation.origin.reactToDropOf(myself);
            }
            if (onComplete) {onComplete(); }
        }
    );
};

// Morph animating:

Morph.prototype.glideTo = function (endPoint, msecs, easing, onComplete) {
    var world = this.world(),
        myself = this,
        horizontal = new Animation(
            function (x) {myself.setLeft(x); },
            function () {return myself.left(); },
            -(this.left() - endPoint.x),
            msecs || 100,
            easing
        );
    world.animations.push(horizontal);
    world.animations.push(new Animation(
        function (y) {myself.setTop(y); },
        function () {return myself.top(); },
        -(this.top() - endPoint.y),
        msecs || 100,
        easing,
        function () {
            horizontal.setter(horizontal.destination);
            horizontal.isActive = false;
            onComplete();
        }

    ));
};

Morph.prototype.fadeTo = function (endAlpha, msecs, easing, onComplete) {
    // include all my children, restore all original transparencies
    // on completion, so I can be recovered
    var world = this.world(),
        myself = this,
        oldAlpha = this.alpha;
    this.children.forEach(function (child) {
        child.fadeTo(endAlpha, msecs, easing);
    });
    world.animations.push(new Animation(
        function (n) {
            myself.alpha = n;
            myself.changed();
        },
        function () {return myself.alpha; },
        endAlpha - this.alpha,
        msecs || 200,
        easing,
        function () {
            myself.alpha = oldAlpha;
            if (onComplete) {onComplete(); }
        }
    ));
};

Morph.prototype.perish = function (msecs, onComplete) {
    var myself = this;
    this.fadeTo(
        0,
        msecs || 100,
        null,
        function () {
            myself.destroy();
            if (onComplete) {onComplete(); }
        }
    );
};

// Morph utilities:

Morph.prototype.nop = nop;

Morph.prototype.resize = function () {
    this.world().activeHandle = new HandleMorph(this);
};

Morph.prototype.move = function () {
    this.world().activeHandle = new HandleMorph(
        this,
        null,
        null,
        null,
        null,
        'move'
    );
};

Morph.prototype.moveCenter = function () {
    this.world().activeHandle = new HandleMorph(
        this,
        null,
        null,
        null,
        null,
        'moveCenter'
    );
};

Morph.prototype.hint = function (msg) {
    var m, text;
    text = msg;
    if (msg) {
        if (msg.toString) {
            text = msg.toString();
        }
    } else {
        text = 'NULL';
    }
    m = new MenuMorph(this, text);
    m.isDraggable = true;
    m.popUpCenteredAtHand(this.world());
};

Morph.prototype.inform = function (msg) {
    var m, text;
    text = msg;
    if (msg) {
        if (msg.toString) {
            text = msg.toString();
        }
    } else {
        text = 'NULL';
    }
    m = new MenuMorph(this, text);
    m.addItem("Ok");
    m.isDraggable = true;
    m.popUpCenteredAtHand(this.world());
};

Morph.prototype.prompt = function (
    msg,
    callback,
    environment,
    defaultContents,
    width,
    floorNum,
    ceilingNum,
    isRounded
) {
    var menu, entryField, slider, isNumeric;
    if (ceilingNum) {
        isNumeric = true;
    }
    menu = new MenuMorph(
        callback || null,
        msg || '',
        environment || null
    );
    entryField = new StringFieldMorph(
        defaultContents || '',
        width || 100,
        MorphicPreferences.prompterFontSize,
        MorphicPreferences.prompterFontName,
        false,
        false,
        isNumeric
    );
    menu.items.push(entryField);
    if (ceilingNum || MorphicPreferences.useSliderForInput) {
        slider = new SliderMorph(
            floorNum || 0,
            ceilingNum,
            parseFloat(defaultContents),
            Math.floor((ceilingNum - floorNum) / 4),
            'horizontal'
        );
        slider.alpha = 1;
        slider.color = new Color(225, 225, 225);
        slider.button.color = menu.borderColor;
        slider.button.highlightColor = slider.button.color.copy();
        slider.button.highlightColor.b += 100;
        slider.button.pressColor = slider.button.color.copy();
        slider.button.pressColor.b += 150;
        slider.setHeight(MorphicPreferences.prompterSliderSize);
        if (isRounded) {
            slider.action = function (num) {
                entryField.changed();
                entryField.text.text = Math.round(num).toString();
                entryField.text.drawNew();
                entryField.text.changed();
                entryField.text.edit();
            };
        } else {
            slider.action = function (num) {
                entryField.changed();
                entryField.text.text = num.toString();
                entryField.text.drawNew();
                entryField.text.changed();
            };
        }
        menu.items.push(slider);
    }

    menu.addLine(2);
    menu.addItem('Ok', function () {
        return entryField.string();
    });
    menu.addItem('Cancel', function () {
        return null;
    });
    menu.isDraggable = true;
    menu.popUpAtHand(this.world());
    entryField.text.edit();
};

Morph.prototype.pickColor = function (
    msg,
    callback,
    environment,
    defaultContents
) {
    var menu, colorPicker;
    menu = new MenuMorph(
        callback || null,
        msg || '',
        environment || null
    );
    colorPicker = new ColorPickerMorph(defaultContents);
    menu.items.push(colorPicker);
    menu.addLine(2);
    menu.addItem('Ok', function () {
        return colorPicker.getChoice();
    });
    menu.addItem('Cancel', function () {
        return null;
    });
    menu.isDraggable = true;
    menu.popUpAtHand(this.world());
};

Morph.prototype.inspect = function (anotherObject) {
    var world = this.world instanceof Function ?
            this.world() : this.root() || this.world,
        inspector,
        inspectee = this;

    if (anotherObject) {
        inspectee = anotherObject;
    }
    inspector = new InspectorMorph(inspectee);
    inspector.setPosition(world.hand.position());
    inspector.keepWithin(world);
    world.add(inspector);
    inspector.changed();
};

// Morph menus:

Morph.prototype.contextMenu = function () {
    var world;

    if (this.customContextMenu) {
        return this.customContextMenu;
    }
    world = this.world instanceof Function ? this.world() : this.world;
    if (world && world.isDevMode) {
        if (this.parent === world) {
            return this.developersMenu();
        }
        return this.hierarchyMenu();
    }
    return this.userMenu() ||
        (this.parent && this.parent.userMenu());
};

Morph.prototype.hierarchyMenu = function () {
    var parents = this.allParents(),
        world = this.world instanceof Function ? this.world() : this.world,
        menu = new MenuMorph(this, null);

    parents.forEach(function (each) {
        if (each.developersMenu && (each !== world)) {
            menu.addMenu(
                each.toString().slice(0, 50),
                each.developersMenu()
            );
        /*
            menu.addItem(each.toString().slice(0, 50), function () {
                each.developersMenu().popUpAtHand(world);
            });
        */
        }
    });
    return menu;
};

Morph.prototype.developersMenu = function () {
    // 'name' is not an official property of a function, hence:
    var world = this.world instanceof Function ? this.world() : this.world,
        userMenu = this.userMenu() ||
            (this.parent && this.parent.userMenu()),
        menu = new MenuMorph(this, this.constructor.name ||
            this.constructor.toString().split(' ')[1].split('(')[0]);
    if (userMenu) {
        menu.addMenu('user features', userMenu);
        menu.addLine();
    }
    menu.addItem(
        "color...",
        function () {
            this.pickColor(
                menu.title + localize('\ncolor:'),
                this.setColor,
                this,
                this.color
            );
        },
        'choose another color \nfor this morph'
    );
    menu.addItem(
        "transparency...",
        function () {
            this.prompt(
                menu.title + localize('\nalpha\nvalue:'),
                this.setAlphaScaled,
                this,
                (this.alpha * 100).toString(),
                null,
                1,
                100,
                true
            );
        },
        'set this morph\'s\nalpha value'
    );
    menu.addItem(
        "resize...",
        'resize',
        'show a handle\nwhich can be dragged\nto change this morph\'s' +
            ' extent'
    );
    menu.addLine();
    menu.addItem(
        "duplicate",
        function () {
            this.fullCopy().pickUp(this.world());
        },
        'make a copy\nand pick it up'
    );
    menu.addItem(
        "pick up",
        'pickUp',
        'detach and put \ninto the hand'
    );
    menu.addItem(
        "attach...",
        'attach',
        'stick this morph\nto another one'
    );
    menu.addItem(
        "move...",
        'move',
        'show a handle\nwhich can be dragged\nto move this morph'
    );
    menu.addItem(
        "inspect...",
        'inspect',
        'open a window\non all properties'
    );
    menu.addItem(
        "pic...",
        function () {
            window.open(this.fullImageClassic().toDataURL());
        },
        'open a new window\nwith a picture of this morph'
    );
    menu.addLine();
    if (this.isDraggable) {
        menu.addItem(
            "lock",
            'toggleIsDraggable',
            'make this morph\nunmovable'
        );
    } else {
        menu.addItem(
            "unlock",
            'toggleIsDraggable',
            'make this morph\nmovable'
        );
    }
    menu.addItem("hide", 'hide');
    menu.addItem("delete", 'destroy');
    if (!(this instanceof WorldMorph)) {
        menu.addLine();
        menu.addItem(
            "World...",
            function () {
                world.contextMenu().popUpAtHand(world);
            },
            'show the\nWorld\'s menu'
        );
    }
    return menu;
};

Morph.prototype.userMenu = function () {
    return null;
};

// Morph menu actions

Morph.prototype.setAlphaScaled = function (alpha) {
    // for context menu demo purposes
    var newAlpha, unscaled;
    if (typeof alpha === 'number') {
        unscaled = alpha / 100;
        this.alpha = Math.min(Math.max(unscaled, 0.1), 1);
    } else {
        newAlpha = parseFloat(alpha);
        if (!isNaN(newAlpha)) {
            unscaled = newAlpha / 100;
            this.alpha = Math.min(Math.max(unscaled, 0.1), 1);
        }
    }
    this.changed();
};

Morph.prototype.attach = function () {
    var choices = this.overlappedMorphs(),
        menu = new MenuMorph(this, 'choose new parent:'),
        myself = this;

    choices.forEach(function (each) {
        menu.addItem(each.toString().slice(0, 50), function () {
            each.add(myself);
            myself.isDraggable = false;
        });
    });
    if (choices.length > 0) {
        menu.popUpAtHand(this.world());
    }
};

Morph.prototype.toggleIsDraggable = function () {
    // for context menu demo purposes
    this.isDraggable = !this.isDraggable;
};

Morph.prototype.colorSetters = function () {
    // for context menu demo purposes
    return ['color'];
};

Morph.prototype.numericalSetters = function () {
    // for context menu demo purposes
    return [
        'setLeft',
        'setTop',
        'setWidth',
        'setHeight',
        'setAlphaScaled'
    ];
};

// Morph entry field tabbing:

Morph.prototype.allEntryFields = function () {
    return this.allChildren().filter(function (each) {
        return each.isEditable &&
            (each instanceof StringMorph ||
                each instanceof TextMorph);
    });
};

Morph.prototype.nextEntryField = function (current) {
    var fields = this.allEntryFields(),
        idx = fields.indexOf(current);
    if (idx !== -1) {
        if (fields.length > idx + 1) {
            return fields[idx + 1];
        }
    }
    return fields[0];
};

Morph.prototype.previousEntryField = function (current) {
    var fields = this.allEntryFields(),
        idx = fields.indexOf(current);
    if (idx !== -1) {
        if (idx > 0) {
            return fields[idx - 1];
        }
        return fields[fields.length - 1];
    }
    return fields[0];
};

Morph.prototype.tab = function (editField) {
/*
    the <tab> key was pressed in one of my edit fields.
    invoke my "nextTab()" function if it exists, else
    propagate it up my owner chain.
*/
    if (this.nextTab) {
        this.nextTab(editField);
    } else if (this.parent) {
        this.parent.tab(editField);
    }
};

Morph.prototype.backTab = function (editField) {
/*
    the <back tab> key was pressed in one of my edit fields.
    invoke my "previousTab()" function if it exists, else
    propagate it up my owner chain.
*/
    if (this.previousTab) {
        this.previousTab(editField);
    } else if (this.parent) {
        this.parent.backTab(editField);
    }
};

/*
    the following are examples of what the navigation methods should
    look like. Insert these at the World level for fallback, and at lower
    levels in the Morphic tree (e.g. dialog boxes) for a more fine-grained
    control over the tabbing cycle.

Morph.prototype.nextTab = function (editField) {
    var next = this.nextEntryField(editField);
    editField.clearSelection();
    next.selectAll();
    next.edit();
};

Morph.prototype.previousTab = function (editField) {
    var prev = this.previousEntryField(editField);
    editField.clearSelection();
    prev.selectAll();
    prev.edit();
};

*/

// Morph events:

Morph.prototype.escalateEvent = function (functionName, arg) {
    var handler = this.parent;
    while (!handler[functionName] && handler.parent !== null) {
        handler = handler.parent;
    }
    if (handler[functionName]) {
        handler[functionName](arg);
    }
};

// Morph eval:

Morph.prototype.evaluateString = function (code) {
    var result;

    try {
        result = eval(code);
        this.drawNew();
        this.changed();
    } catch (err) {
        this.inform(err);
    }
    return result;
};

// Morph collision detection:

Morph.prototype.isTouching = function (otherMorph) {
    var data = this.overlappingPixels(otherMorph),
        len, i;

    if (!data) {return false; }
    len = data[0].length;
    for (i = 3; i < len; i += 4) {
        if (data[0][i] && data[1][i]) {return true; }
    }
    return false;
};

Morph.prototype.overlappingPixels = function (otherMorph) {
    var fb = this.fullBounds(),
        otherFb = otherMorph.fullBounds(),
        oRect = fb.intersect(otherFb),
        thisImg, thatImg;

    if (oRect.width() < 1 || oRect.height() < 1 ||
        !this.image || !otherMorph.image ||
        !this.image.width || !this.image.height ||
        !otherMorph.image.width || !otherMorph.image.height
    ) {
        return false;
    }
    thisImg = this.fullImage();
    thatImg = otherMorph.fullImage();
    if (thisImg.isRetinaEnabled !== thatImg.isRetinaEnabled) {
        thisImg = normalizeCanvas(thisImg, true);
        thatImg = normalizeCanvas(thatImg, true);
    }
    return [
        thisImg.getContext("2d").getImageData(
            oRect.left() - this.left(),
            oRect.top() - this.top(),
            oRect.width(),
            oRect.height()
        ).data,
        thatImg.getContext("2d").getImageData(
            oRect.left() - otherMorph.left(),
            oRect.top() - otherMorph.top(),
            oRect.width(),
            oRect.height()
        ).data
    ];
};

// ShadowMorph /////////////////////////////////////////////////////////

// ShadowMorph inherits from Morph:

ShadowMorph.prototype = new Morph();
ShadowMorph.prototype.constructor = ShadowMorph;
ShadowMorph.uber = Morph.prototype;

// ShadowMorph instance creation:

function ShadowMorph() {
    this.init();
}

ShadowMorph.prototype.topMorphAt = function () {
    return null;
};

// HandleMorph ////////////////////////////////////////////////////////

// I am a resize / move handle that can be attached to any Morph

// HandleMorph inherits from Morph:

HandleMorph.prototype = new Morph();
HandleMorph.prototype.constructor = HandleMorph;
HandleMorph.uber = Morph.prototype;

// HandleMorph instance creation:

function HandleMorph(target, minX, minY, insetX, insetY, type) {
    // if insetY is missing, it will be the same as insetX
    this.init(target, minX, minY, insetX, insetY, type);
}

HandleMorph.prototype.init = function (
    target,
    minX,
    minY,
    insetX,
    insetY,
    type
) {
    var size = MorphicPreferences.handleSize;
    this.target = target || null;
    this.minExtent = new Point(minX || 0, minY || 0);
    this.inset = new Point(insetX || 0, insetY || insetX || 0);
    this.type =  type || 'resize'; // also: 'move', 'moveCenter', 'movePivot'
    HandleMorph.uber.init.call(this);
    this.color = new Color(255, 255, 255);
    this.isDraggable = false;
    this.noticesTransparentClick = true;
    if (this.type === 'movePivot') {
        size *= 2;
    }
    this.setExtent(new Point(size, size));
};

// HandleMorph drawing:

HandleMorph.prototype.drawNew = function () {
    this.normalImage = newCanvas(this.extent(), false, this.normalImage);
    this.highlightImage = newCanvas(this.extent(), false, this.highlightImage);
    if (this.type === 'movePivot') {
        this.drawCrosshairsOnCanvas(this.normalImage, 0.6);
        this.drawCrosshairsOnCanvas(this.highlightImage, 0.5);
    } else {
        this.drawOnCanvas(
            this.normalImage,
            this.color,
            new Color(100, 100, 100)
        );
        this.drawOnCanvas(
            this.highlightImage,
            new Color(100, 100, 255),
            new Color(255, 255, 255)
        );
    }
    this.image = this.normalImage;
    if (this.target) {
        if (this.type === 'moveCenter') {
            this.setCenter(this.target.center());
        } else if (this.type === 'movePivot') {
            this.setCenter(this.target.rotationCenter());
        } else { // 'resize', 'move'
            this.setPosition(
                this.target.bottomRight().subtract(
                    this.extent().add(this.inset)
                )
            );
        }
        this.target.add(this);
        this.target.changed();
    }
};

HandleMorph.prototype.drawCrosshairsOnCanvas = function (aCanvas, fract) {
    var ctx = aCanvas.getContext('2d'),
        r = aCanvas.width / 2;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.arc(r, r, r * 0.9, radians(0), radians(360), false);
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(r, r, r * fract, radians(0), radians(360), false);
    ctx.stroke();
    ctx.moveTo(0, r);
    ctx.lineTo(aCanvas.width, r);
    ctx.stroke();
    ctx.moveTo(r, 0);
    ctx.lineTo(r, aCanvas.height);
    ctx.stroke();
};

HandleMorph.prototype.drawOnCanvas = function (
    aCanvas,
    color,
    shadowColor
) {
    var context = aCanvas.getContext('2d'),
        isSquare = (this.type.indexOf('move') === 0),
        p1,
        p11,
        p2,
        p22,
        i;

    context.lineWidth = 1;
    context.lineCap = 'round';

    context.strokeStyle = color.toString();

    if (isSquare) {

        p1 = this.bottomLeft().subtract(this.position());
        p11 = p1.copy();
        p2 = this.topRight().subtract(this.position());
        p22 = p2.copy();

        for (i = 0; i <= this.height(); i = i + 6) {
            p11.y = p1.y - i;
            p22.y = p2.y - i;

            context.beginPath();
            context.moveTo(p11.x, p11.y);
            context.lineTo(p22.x, p22.y);
            context.closePath();
            context.stroke();
        }
    }

    p1 = this.bottomLeft().subtract(this.position());
    p11 = p1.copy();
    p2 = this.topRight().subtract(this.position());
    p22 = p2.copy();

    for (i = 0; i <= this.width(); i = i + 6) {
        p11.x = p1.x + i;
        p22.x = p2.x + i;

        context.beginPath();
        context.moveTo(p11.x, p11.y);
        context.lineTo(p22.x, p22.y);
        context.closePath();
        context.stroke();
    }

    context.strokeStyle = shadowColor.toString();

    if (isSquare) {

        p1 = this.bottomLeft().subtract(this.position());
        p11 = p1.copy();
        p2 = this.topRight().subtract(this.position());
        p22 = p2.copy();

        for (i = -2; i <= this.height(); i = i + 6) {
            p11.y = p1.y - i;
            p22.y = p2.y - i;

            context.beginPath();
            context.moveTo(p11.x, p11.y);
            context.lineTo(p22.x, p22.y);
            context.closePath();
            context.stroke();
        }
    }

    p1 = this.bottomLeft().subtract(this.position());
    p11 = p1.copy();
    p2 = this.topRight().subtract(this.position());
    p22 = p2.copy();

    for (i = 2; i <= this.width(); i = i + 6) {
        p11.x = p1.x + i;
        p22.x = p2.x + i;

        context.beginPath();
        context.moveTo(p11.x, p11.y);
        context.lineTo(p22.x, p22.y);
        context.closePath();
        context.stroke();
    }
};

// HandleMorph stepping:

HandleMorph.prototype.step = null;

HandleMorph.prototype.mouseDownLeft = function (pos) {
    var world = this.root(),
        offset,
        myself = this;

    if (!this.target) {
        return null;
    }
    if (this.type.indexOf('move') === 0) {
        offset = pos.subtract(this.center());
    } else {
        offset = pos.subtract(this.bounds.origin);
    }
    this.step = function () {
        var newPos, newExt;
        if (world.hand.mouseButton) {
            newPos = world.hand.bounds.origin.copy().subtract(offset);
            if (this.type === 'resize') {
                newExt = newPos.add(
                    myself.extent().add(myself.inset)
                ).subtract(myself.target.bounds.origin);
                newExt = newExt.max(myself.minExtent);
                myself.target.setExtent(newExt);

                myself.setPosition(
                    myself.target.bottomRight().subtract(
                        myself.extent().add(myself.inset)
                    )
                );
            } else if (this.type === 'moveCenter') {
                myself.target.setCenter(newPos);
            } else if (this.type === 'movePivot') {
                myself.target.setPivot(newPos);
                myself.setCenter(this.target.rotationCenter());
            } else { // type === 'move'
                myself.target.setPosition(
                    newPos.subtract(this.target.extent())
                        .add(this.extent())
                );
            }
        } else {
            this.step = null;
        }
    };
    if (!this.target.step) {
        this.target.step = function () {
            nop();
        };
    }
};

// HandleMorph dragging and dropping:

HandleMorph.prototype.rootForGrab = function () {
    return this;
};

// HandleMorph events:

HandleMorph.prototype.mouseEnter = function () {
    this.image = this.highlightImage;
    this.changed();
};

HandleMorph.prototype.mouseLeave = function () {
    this.image = this.normalImage;
    this.changed();
};

// HandleMorph menu:

HandleMorph.prototype.attach = function () {
    var choices = this.overlappedMorphs(),
        menu = new MenuMorph(this, 'choose target:'),
        myself = this;

    choices.forEach(function (each) {
        menu.addItem(each.toString().slice(0, 50), function () {
            myself.isDraggable = false;
            myself.target = each;
            myself.drawNew();
            myself.noticesTransparentClick = true;
        });
    });
    if (choices.length > 0) {
        menu.popUpAtHand(this.world());
    }
};

// PenMorph ////////////////////////////////////////////////////////////

// I am a simple LOGO-wise turtle.

// PenMorph: referenced constructors

var PenMorph;

// PenMorph inherits from Morph:

PenMorph.prototype = new Morph();
PenMorph.prototype.constructor = PenMorph;
PenMorph.uber = Morph.prototype;

// PenMorph instance creation:

function PenMorph() {
    this.init();
}

PenMorph.prototype.init = function () {
    var size = MorphicPreferences.handleSize * 4;

    // additional properties:
    this.isWarped = false; // internal optimization
    this.heading = 0;
    this.isDown = true;
    this.size = 1;
    this.wantsRedraw = false;
    this.penPoint = 'tip'; // or 'center"
    this.penBounds = null; // rect around the visible arrow shape

    HandleMorph.uber.init.call(this);
    this.setExtent(new Point(size, size));
};

// PenMorph updating - optimized for warping, i.e atomic recursion

PenMorph.prototype.changed = function () {
    if (this.isWarped === false) {
        var w = this.root();
        if (w instanceof WorldMorph) {
            w.broken.push(this.visibleBounds().spread());
        }
        if (this.parent) {
            this.parent.childChanged(this);
        }
    }
};

// PenMorph display:

PenMorph.prototype.drawNew = function (facing, recycleImage) {
    // my orientation can be overridden with the "facing" parameter to
    // implement Scratch-style rotation styles
    // if a recycleImage canvas is given, it will be reused
    // instead of creating a new one

    var context, start, dest, left, right, len,
        direction = facing || this.heading;

    if (this.isWarped) {
        this.wantsRedraw = true;
        return;
    }

    this.image = newCanvas(this.extent(), null, recycleImage);
    context = this.image.getContext('2d');
    len = this.width() / 2;
    start = this.center().subtract(this.bounds.origin);

    if (this.penPoint === 'tip') {
        dest = start.distanceAngle(len * 0.75, direction - 180);
        left = start.distanceAngle(len, direction + 195);
        right = start.distanceAngle(len, direction - 195);
    } else { // 'middle'
        dest = start.distanceAngle(len * 0.75, direction);
        left = start.distanceAngle(len * 0.33, direction + 230);
        right = start.distanceAngle(len * 0.33, direction - 230);
    }

    // cache penBounds
    this.penBounds = new Rectangle(
        Math.min(start.x, dest.x, left.x, right.x),
        Math.min(start.y, dest.y, left.y, right.y),
        Math.max(start.x, dest.x, left.x, right.x),
        Math.max(start.y, dest.y, left.y, right.y)
    );

    // draw arrow shape
    context.fillStyle = this.color.toString();
    context.beginPath();

    context.moveTo(start.x, start.y);
    context.lineTo(left.x, left.y);
    context.lineTo(dest.x, dest.y);
    context.lineTo(right.x, right.y);

    context.closePath();
    context.strokeStyle = 'white';
    context.lineWidth = 3;
    context.stroke();
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    context.stroke();
    context.fill();
};

// PenMorph access:

PenMorph.prototype.setHeading = function (degrees) {
    this.heading = ((+degrees % 360) + 360) % 360;
    this.drawNew();
    this.changed();
};

PenMorph.prototype.numericalSetters = function () {
    // for context menu demo purposes
    return [
        'setLeft',
        'setTop',
        'setWidth',
        'setHeight',
        'setAlphaScaled',
        'setHeading'
    ];
};

// PenMorph menu:

PenMorph.prototype.developersMenu = function () {
    var menu = PenMorph.uber.developersMenu.call(this);
    menu.addLine();
    menu.addItem(
        'set rotation',
        "setRotation",
        'interactively turn this morph\nusing a dial widget'
    );
    return menu;
};

PenMorph.prototype.setRotation = function () {
    var menu, dial,
    	name = this.name || this.constructor.name;
    if (name.length > 10) {
    	name = name.slice(0, 9) + '...';
    }
    menu = new MenuMorph(this, name);
    dial = new DialMorph(null, null, this.heading);
    dial.rootForGrab = function () {return this; };
    dial.target = this;
    dial.action = 'setHeading';
    menu.items.push(dial);
    menu.addLine();
    menu.addItem('(90) right', function () {this.setHeading(90); });
    menu.addItem('(-90) left', function () {this.setHeading(-90); });
    menu.addItem('(0) up', function () {this.setHeading(0); });
    menu.addItem('(180) down', function () {this.setHeading(180); });
    menu.isDraggable = true;
    menu.popUpAtHand(this.world());
};

// PenMorph drawing:

PenMorph.prototype.drawLine = function (start, dest) {
    var context = this.parent.penTrails().getContext('2d'),
        from = start.subtract(this.parent.bounds.origin),
        to = dest.subtract(this.parent.bounds.origin);
    if (this.isDown) {
        context.lineWidth = this.size;
        context.strokeStyle = this.color.toString();
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.beginPath();
        context.moveTo(from.x, from.y);
        context.lineTo(to.x, to.y);
        context.stroke();
        if (this.isWarped === false) {
            this.world().broken.push(
                start.rectangle(dest).expandBy(
                    Math.max(this.size / 2, 1)
                ).intersect(this.parent.visibleBounds()).spread()
            );
        }
    }
};

// PenMorph turtle ops:

PenMorph.prototype.turn = function (degrees) {
    this.setHeading(this.heading + parseFloat(degrees));
};

PenMorph.prototype.forward = function (steps) {
    var start = this.center(),
        dest,
        dist = parseFloat(steps);
    if (dist >= 0) {
        dest = this.position().distanceAngle(dist, this.heading);
    } else {
        dest = this.position().distanceAngle(
            Math.abs(dist),
            (this.heading - 180)
        );
    }
    this.setPosition(dest);
    this.drawLine(start, this.center());
};

PenMorph.prototype.down = function () {
    this.isDown = true;
};

PenMorph.prototype.up = function () {
    this.isDown = false;
};

PenMorph.prototype.clear = function () {
    this.parent.drawNew();
    this.parent.changed();
};

// PenMorph optimization for atomic recursion:

PenMorph.prototype.startWarp = function () {
    this.wantsRedraw = false;
    this.isWarped = true;
};

PenMorph.prototype.endWarp = function () {
    this.isWarped = false;
    if (this.wantsRedraw) {
        this.drawNew();
        this.wantsRedraw = false;
    }
    this.parent.changed();
};

PenMorph.prototype.warp = function (fun) {
    this.startWarp();
    fun.call(this);
    this.endWarp();
};

PenMorph.prototype.warpOp = function (selector, argsArray) {
    this.startWarp();
    this[selector].apply(this, argsArray);
    this.endWarp();
};

// PenMorph demo ops:
// try these with WARP eg.: this.warp(function () {tree(12, 120, 20)})

PenMorph.prototype.warpSierpinski = function (length, min) {
    this.warpOp('sierpinski', [length, min]);
};

PenMorph.prototype.sierpinski = function (length, min) {
    var i;
    if (length > min) {
        for (i = 0; i < 3; i += 1) {
            this.sierpinski(length * 0.5, min);
            this.turn(120);
            this.forward(length);
        }
    }
};

PenMorph.prototype.warpTree = function (level, length, angle) {
    this.warpOp('tree', [level, length, angle]);
};

PenMorph.prototype.tree = function (level, length, angle) {
    if (level > 0) {
        this.size = level;
        this.forward(length);
        this.turn(angle);
        this.tree(level - 1, length * 0.75, angle);
        this.turn(angle * -2);
        this.tree(level - 1, length * 0.75, angle);
        this.turn(angle);
        this.forward(-length);
    }
};

// ColorPaletteMorph ///////////////////////////////////////////////////

var ColorPaletteMorph;

// ColorPaletteMorph inherits from Morph:

ColorPaletteMorph.prototype = new Morph();
ColorPaletteMorph.prototype.constructor = ColorPaletteMorph;
ColorPaletteMorph.uber = Morph.prototype;

// ColorPaletteMorph instance creation:

function ColorPaletteMorph(target, sizePoint) {
    this.init(
        target || null,
        sizePoint || new Point(80, 50)
    );
}

ColorPaletteMorph.prototype.init = function (target, size) {
    ColorPaletteMorph.uber.init.call(this);
    this.target = target;
    this.targetSetter = 'color';
    this.silentSetExtent(size);
    this.choice = null;
    this.drawNew();
};

ColorPaletteMorph.prototype.drawNew = function () {
    var context, ext, x, y, h, l;

    ext = this.extent();
    this.image = newCanvas(this.extent(), false, this.image);
    context = this.image.getContext('2d');
    this.choice = new Color();
    for (x = 0; x <= ext.x; x += 1) {
        h = 360 * x / ext.x;
        for (y = 0; y <= ext.y; y += 1) {
            l = 100 - (y / ext.y * 100);
            context.fillStyle = 'hsl(' + h + ',100%,' + l + '%)';
            context.fillRect(x, y, 1, 1);
        }
    }
};

ColorPaletteMorph.prototype.mouseMove = function (pos) {
    this.choice = this.getPixelColor(pos);
    this.updateTarget();
};

ColorPaletteMorph.prototype.mouseDownLeft = function (pos) {
    this.choice = this.getPixelColor(pos);
    this.updateTarget();
};

ColorPaletteMorph.prototype.updateTarget = function () {
    if (this.target instanceof Morph && this.choice !== null) {
        if (this.target[this.targetSetter] instanceof Function) {
            this.target[this.targetSetter](this.choice);
        } else {
            this.target[this.targetSetter] = this.choice;
            this.target.drawNew();
            this.target.changed();
        }
    }
};

// ColorPaletteMorph menu:

ColorPaletteMorph.prototype.developersMenu = function () {
    var menu = ColorPaletteMorph.uber.developersMenu.call(this);
    menu.addLine();
    menu.addItem(
        'set target',
        "setTarget",
        'choose another morph\nwhose color property\n will be' +
            ' controlled by this one'
    );
    return menu;
};

ColorPaletteMorph.prototype.setTarget = function () {
    var choices = this.overlappedMorphs(),
        menu = new MenuMorph(this, 'choose target:'),
        myself = this;

    choices.push(this.world());
    choices.forEach(function (each) {
        menu.addItem(each.toString().slice(0, 50), function () {
            myself.target = each;
            myself.setTargetSetter();
        });
    });
    if (choices.length === 1) {
        this.target = choices[0];
        this.setTargetSetter();
    } else if (choices.length > 0) {
        menu.popUpAtHand(this.world());
    }
};

ColorPaletteMorph.prototype.setTargetSetter = function () {
    var choices = this.target.colorSetters(),
        menu = new MenuMorph(this, 'choose target property:'),
        myself = this;

    choices.forEach(function (each) {
        menu.addItem(each, function () {
            myself.targetSetter = each;
        });
    });
    if (choices.length === 1) {
        this.targetSetter = choices[0];
    } else if (choices.length > 0) {
        menu.popUpAtHand(this.world());
    }
};

// GrayPaletteMorph ///////////////////////////////////////////////////

var GrayPaletteMorph;

// GrayPaletteMorph inherits from ColorPaletteMorph:

GrayPaletteMorph.prototype = new ColorPaletteMorph();
GrayPaletteMorph.prototype.constructor = GrayPaletteMorph;
GrayPaletteMorph.uber = ColorPaletteMorph.prototype;

// GrayPaletteMorph instance creation:

function GrayPaletteMorph(target, sizePoint) {
    this.init(
        target || null,
        sizePoint || new Point(80, 10)
    );
}

GrayPaletteMorph.prototype.drawNew = function () {
    var context, ext, gradient;

    ext = this.extent();
    this.image = newCanvas(this.extent(), false, this.image);
    context = this.image.getContext('2d');
    this.choice = new Color();
    gradient = context.createLinearGradient(0, 0, ext.x, ext.y);
    gradient.addColorStop(0, 'black');
    gradient.addColorStop(1, 'white');
    context.fillStyle = gradient;
    context.fillRect(0, 0, ext.x, ext.y);
};

// ColorPickerMorph ///////////////////////////////////////////////////

// ColorPickerMorph inherits from Morph:

ColorPickerMorph.prototype = new Morph();
ColorPickerMorph.prototype.constructor = ColorPickerMorph;
ColorPickerMorph.uber = Morph.prototype;

// ColorPickerMorph instance creation:

function ColorPickerMorph(defaultColor) {
    this.init(defaultColor || new Color(255, 255, 255));
}

ColorPickerMorph.prototype.init = function (defaultColor) {
    this.choice = defaultColor;
    ColorPickerMorph.uber.init.call(this);
    this.color = new Color(255, 255, 255);
    this.silentSetExtent(new Point(80, 80));
    this.drawNew();
};

ColorPickerMorph.prototype.drawNew = function () {
    ColorPickerMorph.uber.drawNew.call(this);
    this.buildSubmorphs();
};

ColorPickerMorph.prototype.buildSubmorphs = function () {
    var cpal, gpal, x, y;

    this.children.forEach(function (child) {
        child.destroy();
    });
    this.children = [];
    this.feedback = new Morph();
    this.feedback.color = this.choice;
    this.feedback.setExtent(new Point(20, 20));
    cpal = new ColorPaletteMorph(
        this.feedback,
        new Point(this.width(), 50)
    );
    gpal = new GrayPaletteMorph(
        this.feedback,
        new Point(this.width(), 5)
    );
    cpal.setPosition(this.bounds.origin);
    this.add(cpal);
    gpal.setPosition(cpal.bottomLeft());
    this.add(gpal);
    x = (gpal.left() +
        Math.floor((gpal.width() - this.feedback.width()) / 2));
    y = gpal.bottom() + Math.floor((this.bottom() -
        gpal.bottom() - this.feedback.height()) / 2);
    this.feedback.setPosition(new Point(x, y));
    this.add(this.feedback);
};

ColorPickerMorph.prototype.getChoice = function () {
    return this.feedback.color;
};

ColorPickerMorph.prototype.rootForGrab = function () {
    return this;
};

// BlinkerMorph ////////////////////////////////////////////////////////

// can be used for text cursors

var BlinkerMorph;

// BlinkerMorph inherits from Morph:

BlinkerMorph.prototype = new Morph();
BlinkerMorph.prototype.constructor = BlinkerMorph;
BlinkerMorph.uber = Morph.prototype;

// BlinkerMorph instance creation:

function BlinkerMorph(rate) {
    this.init(rate);
}

BlinkerMorph.prototype.init = function (rate) {
    BlinkerMorph.uber.init.call(this);
    this.color = new Color(0, 0, 0);
    this.fps = rate || 2;
    this.drawNew();
};

// BlinkerMorph stepping:

BlinkerMorph.prototype.step = function () {
    this.toggleVisibility();
};

// CursorMorph /////////////////////////////////////////////////////////

// I am a String/Text editing widget

// CursorMorph: referenced constructors

var CursorMorph;

// CursorMorph inherits from BlinkerMorph:

CursorMorph.prototype = new BlinkerMorph();
CursorMorph.prototype.constructor = CursorMorph;
CursorMorph.uber = BlinkerMorph.prototype;

// CursorMorph preferences settings:

CursorMorph.prototype.viewPadding = 1;

// CursorMorph instance creation:

function CursorMorph(aStringOrTextMorph) {
    this.init(aStringOrTextMorph);
}

CursorMorph.prototype.init = function (aStringOrTextMorph) {
    var ls;

    // additional properties:
    this.keyDownEventUsed = false;
    this.target = aStringOrTextMorph;
    this.originalContents = this.target.text;
    this.originalAlignment = this.target.alignment;
    this.slot = this.target.text.length;
    this.textarea = null;

    CursorMorph.uber.init.call(this);

    // override inherited defaults
    ls = fontHeight(this.target.fontSize);
    this.setExtent(new Point(Math.max(Math.floor(ls / 20), 1), ls));
    this.drawNew();
    this.image.getContext('2d').font = this.target.font();
    if (this.target instanceof TextMorph &&
            (this.target.alignment !== 'left')) {
        this.target.setAlignmentToLeft();
    }
    this.gotoSlot(this.slot);
    this.initializeTextarea();
};

CursorMorph.prototype.initializeTextarea = function () {
    var myself = this;

    this.textarea = document.createElement('textarea');
    this.textarea.style.zIndex = -1;
    this.textarea.style.position = 'absolute';
    this.textarea.wrap = "off";
    this.textarea.style.overflow = "hidden";
    this.textarea.style.fontSize = this.target.fontSize + 'px';
    this.textarea.autofocus = true;
    this.textarea.value = this.target.text;
    document.body.appendChild(this.textarea);
    this.updateTextAreaPosition();
    this.syncTextareaSelectionWith(this.target);


    /*
        There are three cases when the textarea gets inputs:

        1. Inputs that represent special shortcuts of Snap!, so we
        don't want the textarea to handle it. These events are captured in
        "keydown" event handler.

        2. inputs that change the content of the textarea, we need to update
        the content of its target morph accordingly. This is handled in
        the "input" event handler.

        3. input that change the textarea without triggering an "input" event,
        e.g. selection change, cursor movements. These are handled in the
        "keyup" event handler.

        Note that some changes in case 2 are not caused by keyboards (for
        example, select a word by clicking in IME window), so there are overlaps
        between case 2 and case 3. but no one can replace the other.
    */

    this.textarea.addEventListener('keydown', function (event) {
        /* Special shortcuts for Snap! system.
            - ctrl-d, ctrl-i and ctrl-p: doit, inspect it and print it
            - tab: goto next text field
            - esc: discard the editing
            - enter / shift+enter: accept the editing
        */
        var keyName = event.key,
            shift = event.shiftKey,
            singleLineText = myself.target instanceof StringMorph;

        // other parts of the world need to know the current key
        myself.world().currentKey = event.keyCode;

        if (!isNil(myself.target.receiver) &&
                    (event.ctrlKey || event.metaKey)) {
            if (keyName === 'd') {
                myself.target.doIt();
            } else if (keyName === 'i') {
                myself.target.inspectIt();
            } else if (keyName === 'p') {
                myself.target.showIt();
            }
            event.preventDefault();
        } else if (keyName === 'Tab' || keyName === 'U+0009') {
            if (shift) {
                myself.target.backTab(myself.target);
            } else {
                myself.target.tab(myself.target);
            }
            event.preventDefault();
            myself.target.escalateEvent('reactToEdit', myself.target);
        } else if (keyName === 'Escape') {
            myself.cancel();
        } else if (keyName === "Enter" && (singleLineText || shift)) {
            myself.accept();
        } else {
            myself.target.escalateEvent('reactToKeystroke', event);
        }
    });

    this.textarea.addEventListener('input', function (event) {
        // handle content change.
        var target = myself.target,
            textarea = myself.textarea,
            filteredContent,
            caret;

        myself.world().currentKey = null;

        // filter invalid chars for numeric fields
        function filterText (content) {
            var points = 0,
                result = '',
                i, ch, valid;
            for (i = 0; i < content.length; i += 1) {
                ch = content.charAt(i);
                valid = (
                    ('0' <= ch && ch <= '9') || // digits
                    (i === 0 && ch === '-')  || // leading '-'
                    (ch === '.' && points === 0) // at most '.'
                );
                if (valid) {
                    result += ch;
                    if (ch === '.') {
                        points += 1;
                    }
                }
            }
            return result;
        }

        if (target.isNumeric) {
            filteredContent = filterText(textarea.value);
        } else {
            filteredContent = textarea.value;
        }

        if (filteredContent.length < textarea.value.length) {
            textarea.value = filteredContent;
            caret = Math.min(textarea.selectionStart, filteredContent.length);
            textarea.selectionEnd = caret;
            textarea.selectionStart = caret;
        }
        // target morph: copy the content and selection status to the target.
        target.text = filteredContent;

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

        // cursor morph: copy the caret position to cursor morph.
        myself.gotoSlot(textarea.selectionStart);

        myself.updateTextAreaPosition();

        // the "reactToInput" event gets triggered AFTER "reactToKeystroke"
        myself.target.escalateEvent('reactToInput', event);

    });

    this.textarea.addEventListener('keyup', function (event) {
        // handle selection change and cursor position change.
        var textarea = myself.textarea,
            target = myself.target;

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
        myself.gotoSlot(textarea.selectionEnd);
    });
};

CursorMorph.prototype.updateTextAreaPosition = function () {
    var origin = this.target.bounds.origin;

    function number2px (n) {
        return Math.ceil(n) + 'px';
    }

    this.textarea.style.top = number2px(origin.y);
    this.textarea.style.left = number2px(origin.x);
};

CursorMorph.prototype.syncTextareaSelectionWith = function (targetMorph) {
    var start = targetMorph.startMark,
        end = targetMorph.endMark;

    if (start === end) {
        this.textarea.setSelectionRange(this.slot, this.slot, 'none');
    } else if (start < end) {
        this.textarea.setSelectionRange(start, end, 'forward');
    } else {
        this.textarea.setSelectionRange(end, start, 'backward');
    }
    this.textarea.focus();
};

// CursorMorph event processing:

CursorMorph.prototype.processKeyPress = function (event) {
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
};

CursorMorph.prototype.processKeyDown = function (event) {
    // this.inspectKeyEvent(event);
    var shift = event.shiftKey,
        wordNavigation = event.ctrlKey || event.altKey,
        selecting = this.target.selection().length > 0;

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
};

// CursorMorph navigation:

/*
// original non-scrolling code, commented out in case we need to fall back:

CursorMorph.prototype.gotoSlot = function (newSlot) {
    this.setPosition(this.target.slotPosition(newSlot));
    this.slot = Math.max(newSlot, 0);
};
*/

CursorMorph.prototype.gotoSlot = function (slot) {
    var length = this.target.text.length,
        pos = this.target.slotPosition(slot),
        right,
        left;
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
};

CursorMorph.prototype.goLeft = function (shift, howMany) {
    this.updateSelection(shift);
    this.gotoSlot(this.slot - (howMany || 1));
    this.updateSelection(shift);
};

CursorMorph.prototype.goRight = function (shift, howMany) {
    this.updateSelection(shift);
    this.gotoSlot(this.slot + (howMany || 1));
    this.updateSelection(shift);
};

CursorMorph.prototype.goUp = function (shift) {
    this.updateSelection(shift);
    this.gotoSlot(this.target.upFrom(this.slot));
    this.updateSelection(shift);
};

CursorMorph.prototype.goDown = function (shift) {
    this.updateSelection(shift);
    this.gotoSlot(this.target.downFrom(this.slot));
    this.updateSelection(shift);
};

CursorMorph.prototype.goHome = function (shift) {
    this.updateSelection(shift);
    this.gotoSlot(this.target.startOfLine(this.slot));
    this.updateSelection(shift);
};

CursorMorph.prototype.goEnd = function (shift) {
    this.updateSelection(shift);
    this.gotoSlot(this.target.endOfLine(this.slot));
    this.updateSelection(shift);
};

CursorMorph.prototype.gotoPos = function (aPoint) {
    this.gotoSlot(this.target.slotAt(aPoint));
    this.show();
};

// CursorMorph selecting:

CursorMorph.prototype.updateSelection = function (shift) {
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
};

// CursorMorph editing:

CursorMorph.prototype.accept = function () {
    var world = this.root();
    if (world) {
        world.stopEditing();
    }
    this.escalateEvent('accept', this);
};

CursorMorph.prototype.cancel = function () {
    var world = this.root();
    this.undo();
    if (world) {
        world.stopEditing();
    }
    this.escalateEvent('cancel', this);
};

CursorMorph.prototype.undo = function () {
    this.target.text = this.originalContents;
    this.target.changed();
    this.target.drawNew();
    this.target.changed();
    this.gotoSlot(0);
};

CursorMorph.prototype.insert = function (aChar, shiftKey) {
    var text;
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
};

CursorMorph.prototype.ctrl = function (aChar, shiftKey) {
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


};

CursorMorph.prototype.cmd = function (aChar, shiftKey) {
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
};

CursorMorph.prototype.deleteRight = function () {
    var text;
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
};

CursorMorph.prototype.deleteLeft = function () {
    var text;
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
};

// CursorMorph destroying:

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

// CursorMorph utilities:

CursorMorph.prototype.inspectKeyEvent = function (event) {
    // private
    this.inform(
        'Key pressed: ' +
            String.fromCharCode(event.charCode) +
            '\n------------------------' +
            '\ncharCode: ' +
            event.charCode.toString() +
            '\nkeyCode: ' +
            event.keyCode.toString() +
            '\nkey: ' +
            event.key.toString() +
            '\nshiftKey: ' +
            event.shiftKey.toString() +
            '\naltKey: ' +
            event.altKey.toString() +
            '\nctrlKey: ' +
            event.ctrlKey.toString() +
            '\ncmdKey: ' +
            event.metaKey.toString()
    );
};

// BoxMorph ////////////////////////////////////////////////////////////

// I can have an optionally rounded border

var BoxMorph;

// BoxMorph inherits from Morph:

BoxMorph.prototype = new Morph();
BoxMorph.prototype.constructor = BoxMorph;
BoxMorph.uber = Morph.prototype;

// BoxMorph instance creation:

function BoxMorph(edge, border, borderColor) {
    this.init(edge, border, borderColor);
}

BoxMorph.prototype.init = function (edge, border, borderColor) {
    this.edge = edge || 4;
    this.border = border || ((border === 0) ? 0 : 2);
    this.borderColor = borderColor || new Color();
    BoxMorph.uber.init.call(this);
};

// BoxMorph drawing:

BoxMorph.prototype.drawNew = function () {
    var context;

    this.image = newCanvas(this.extent(), false, this.image);
    context = this.image.getContext('2d');
    if ((this.edge === 0) && (this.border === 0)) {
        BoxMorph.uber.drawNew.call(this);
        return null;
    }
    context.fillStyle = this.color.toString();
    context.beginPath();
    this.outlinePath(
        context,
        Math.max(this.edge - this.border, 0),
        this.border
    );
    context.closePath();
    context.fill();
    if (this.border > 0) {
        context.lineWidth = this.border;
        context.strokeStyle = this.borderColor.toString();
        context.beginPath();
        this.outlinePath(context, this.edge, this.border / 2);
        context.closePath();
        context.stroke();
    }
};

BoxMorph.prototype.outlinePath = function (context, radius, inset) {
    var offset = radius + inset,
        w = this.width(),
        h = this.height();

    // top left:
    context.arc(
        offset,
        offset,
        radius,
        radians(-180),
        radians(-90),
        false
    );
    // top right:
    context.arc(
        w - offset,
        offset,
        radius,
        radians(-90),
        radians(-0),
        false
    );
    // bottom right:
    context.arc(
        w - offset,
        h - offset,
        radius,
        radians(0),
        radians(90),
        false
    );
    // bottom left:
    context.arc(
        offset,
        h - offset,
        radius,
        radians(90),
        radians(180),
        false
    );
};


// BoxMorph menus:

BoxMorph.prototype.developersMenu = function () {
    var menu = BoxMorph.uber.developersMenu.call(this);
    menu.addLine();
    menu.addItem(
        "border width...",
        function () {
            this.prompt(
                menu.title + '\nborder\nwidth:',
                this.setBorderWidth,
                this,
                this.border.toString(),
                null,
                0,
                100,
                true
            );
        },
        'set the border\'s\nline size'
    );
    menu.addItem(
        "border color...",
        function () {
            this.pickColor(
                menu.title + '\nborder color:',
                this.setBorderColor,
                this,
                this.borderColor
            );
        },
        'set the border\'s\nline color'
    );
    menu.addItem(
        "corner size...",
        function () {
            this.prompt(
                menu.title + '\ncorner\nsize:',
                this.setCornerSize,
                this,
                this.edge.toString(),
                null,
                0,
                100,
                true
            );
        },
        'set the corner\'s\nradius'
    );
    return menu;
};

BoxMorph.prototype.setBorderWidth = function (size) {
    // for context menu demo purposes
    var newSize;
    if (typeof size === 'number') {
        this.border = Math.max(size, 0);
    } else {
        newSize = parseFloat(size);
        if (!isNaN(newSize)) {
            this.border = Math.max(newSize, 0);
        }
    }
    this.drawNew();
    this.changed();
};

BoxMorph.prototype.setBorderColor = function (color) {
    // for context menu demo purposes
    if (color) {
        this.borderColor = color;
        this.drawNew();
        this.changed();
    }
};

BoxMorph.prototype.setCornerSize = function (size) {
    // for context menu demo purposes
    var newSize;
    if (typeof size === 'number') {
        this.edge = Math.max(size, 0);
    } else {
        newSize = parseFloat(size);
        if (!isNaN(newSize)) {
            this.edge = Math.max(newSize, 0);
        }
    }
    this.drawNew();
    this.changed();
};

BoxMorph.prototype.colorSetters = function () {
    // for context menu demo purposes
    return ['color', 'borderColor'];
};

BoxMorph.prototype.numericalSetters = function () {
    // for context menu demo purposes
    var list = BoxMorph.uber.numericalSetters.call(this);
    list.push('setBorderWidth', 'setCornerSize');
    return list;
};

// SpeechBubbleMorph ///////////////////////////////////////////////////

/*
    I am a comic-style speech bubble that can display either a string,
    a Morph, a Canvas or a toString() representation of anything else.
    If I am invoked using popUp() I behave like a tool tip.
*/

// SpeechBubbleMorph: referenced constructors

var SpeechBubbleMorph;

// SpeechBubbleMorph inherits from BoxMorph:

SpeechBubbleMorph.prototype = new BoxMorph();
SpeechBubbleMorph.prototype.constructor = SpeechBubbleMorph;
SpeechBubbleMorph.uber = BoxMorph.prototype;

// SpeechBubbleMorph instance creation:

function SpeechBubbleMorph(
    contents,
    color,
    edge,
    border,
    borderColor,
    padding,
    isThought
) {
    this.init(contents, color, edge, border, borderColor, padding, isThought);
}

SpeechBubbleMorph.prototype.init = function (
    contents,
    color,
    edge,
    border,
    borderColor,
    padding,
    isThought // bool or anything but "true" to draw no hook at all
) {
    this.isPointingRight = true; // orientation of text
    this.contents = contents || '';
    this.padding = padding || 0; // additional vertical pixels
    this.isThought = isThought || false; // draw "think" bubble
    this.isClickable = false;
    SpeechBubbleMorph.uber.init.call(
        this,
        edge || 6,
        border || ((border === 0) ? 0 : 1),
        borderColor || new Color(140, 140, 140)
    );
    this.color = color || new Color(230, 230, 230);
    this.drawNew();
};

// SpeechBubbleMorph invoking:

SpeechBubbleMorph.prototype.popUp = function (world, pos, isClickable) {
    this.drawNew();
    this.setPosition(pos.subtract(new Point(0, this.height())));
    this.addShadow(new Point(2, 2), 80);
    this.keepWithin(world);
    world.add(this);
    this.fullChanged();
    world.hand.destroyTemporaries();
    world.hand.temporaries.push(this);

    if (!isClickable) {
        this.mouseEnter = function () {
            this.destroy();
        };
    } else {
        this.isClickable = true;
    }
};

// SpeechBubbleMorph drawing:

SpeechBubbleMorph.prototype.drawNew = function () {
    // re-build my contents
    if (this.contentsMorph) {
        this.contentsMorph.destroy();
    }
    if (this.contents instanceof Morph) {
        this.contentsMorph = this.contents;
    } else if (isString(this.contents)) {
        this.contentsMorph = new TextMorph(
            this.contents,
            MorphicPreferences.bubbleHelpFontSize,
            null,
            false,
            true,
            'center'
        );
    } else if (this.contents instanceof HTMLCanvasElement) {
        this.contentsMorph = new Morph();
        this.contentsMorph.silentSetWidth(this.contents.width);
        this.contentsMorph.silentSetHeight(this.contents.height);
        this.contentsMorph.image = this.contents;
    } else {
        this.contentsMorph = new TextMorph(
            this.contents.toString(),
            MorphicPreferences.bubbleHelpFontSize,
            null,
            false,
            true,
            'center'
        );
    }
    this.add(this.contentsMorph);

    // adjust my layout
    this.silentSetWidth(this.contentsMorph.width() +
        (this.padding ? this.padding * 2 : this.edge * 2));
    this.silentSetHeight(this.contentsMorph.height() +
        this.edge +
        this.border * 2 +
        this.padding * 2 +
        2);

    // draw my outline
    SpeechBubbleMorph.uber.drawNew.call(this);

    // position my contents
    this.contentsMorph.setPosition(this.position().add(
        new Point(
            this.padding || this.edge,
            this.border + this.padding + 1
        )
    ));
};

SpeechBubbleMorph.prototype.outlinePath = function (
    context,
    radius,
    inset
) {
    var offset = radius + inset,
        w = this.width(),
        h = this.height(),
        rad;

    function circle(x, y, r) {
        context.moveTo(x + r, y);
        context.arc(x, y, r, radians(0), radians(360));
    }

    // top left:
    context.arc(
        offset,
        offset,
        radius,
        radians(-180),
        radians(-90),
        false
    );
    // top right:
    context.arc(
        w - offset,
        offset,
        radius,
        radians(-90),
        radians(-0),
        false
    );
    // bottom right:
    context.arc(
        w - offset,
        h - offset - radius,
        radius,
        radians(0),
        radians(90),
        false
    );
    if (!this.isThought) { // draw speech bubble hook
        if (this.isPointingRight) {
            context.lineTo(
                offset + radius,
                h - offset
            );
            context.lineTo(
                radius / 2 + inset,
                h - inset
            );
        } else { // pointing left
            context.lineTo(
                w - (radius / 2 + inset),
                h - inset
            );
            context.lineTo(
                w - (offset + radius),
                h - offset
            );
        }
    }
    // bottom left:
    context.arc(
        offset,
        h - offset - radius,
        radius,
        radians(90),
        radians(180),
        false
    );
    if (this.isThought === true) { // use anything but "true" to draw nothing
        // close large bubble:
        context.lineTo(
            inset,
            offset
        );
        // draw thought bubbles:
        if (this.isPointingRight) {
            // tip bubble:
            rad = radius / 4;
            circle(rad + inset, h - rad - inset, rad);
            // middle bubble:
            rad = radius / 3.2;
            circle(rad * 2 + inset, h - rad - inset * 2, rad);
            // top bubble:
            rad = radius / 2.8;
            circle(rad * 3 + inset * 2, h - rad - inset * 4, rad);
        } else { // pointing left
            // tip bubble:
            rad = radius / 4;
            circle(w - (rad + inset), h - rad - inset, rad);
            // middle bubble:
            rad = radius / 3.2;
            circle(w - (rad * 2 + inset), h - rad - inset * 2, rad);
            // top bubble:
            rad = radius / 2.8;
            circle(w - (rad * 3 + inset * 2), h - rad - inset * 4, rad);
        }
    }
};

// SpeechBubbleMorph shadow

/*
    only take the 'plain' image, so the box rounding and the
    shadow doesn't become conflicted by embedded scrolling panes
*/

SpeechBubbleMorph.prototype.shadowImage = function (off, color) {
    // fallback for Windows Chrome-Shadow bug
    var fb, img, outline, sha, ctx,
        offset = off || new Point(7, 7),
        clr = color || new Color(0, 0, 0);
    fb = this.extent();
    img = this.image;
    outline = newCanvas(fb);
    ctx = outline.getContext('2d');
    ctx.drawImage(img, 0, 0);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.drawImage(
        img,
        -offset.x,
        -offset.y
    );
    sha = newCanvas(fb);
    ctx = sha.getContext('2d');
    ctx.drawImage(outline, 0, 0);
    ctx.globalCompositeOperation = 'source-atop';
    ctx.fillStyle = clr.toString();
    ctx.fillRect(0, 0, fb.x, fb.y);
    return sha;
};

SpeechBubbleMorph.prototype.shadowImageBlurred = function (off, color) {
    var fb, img, sha, ctx,
        offset = off || new Point(7, 7),
        blur = this.shadowBlur,
        clr = color || new Color(0, 0, 0);
    fb = this.extent().add(blur * 2);
    img = this.image;
    sha = newCanvas(fb);
    ctx = sha.getContext('2d');
    ctx.shadowOffsetX = offset.x;
    ctx.shadowOffsetY = offset.y;
    ctx.shadowBlur = blur;
    ctx.shadowColor = clr.toString();
    ctx.drawImage(
        img,
        blur - offset.x,
        blur - offset.y
    );
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.drawImage(
        img,
        blur - offset.x,
        blur - offset.y
    );
    return sha;
};

// SpeechBubbleMorph resizing

SpeechBubbleMorph.prototype.fixLayout = function () {
    this.removeShadow();
    this.drawNew();
    this.addShadow(new Point(2, 2), 80);
};

// DialMorph //////////////////////////////////////////////////////

// I am a knob than can be turned to select a number

var DialMorph;

// DialMorph inherits from Morph:

DialMorph.prototype = new Morph();
DialMorph.prototype.constructor = DialMorph;
DialMorph.uber = Morph.prototype;

function DialMorph(min, max, value, tick, radius) {
    this.init(min, max, value, tick, radius);
}

DialMorph.prototype.init = function (min, max, value, tick, radius) {
    this.target = null;
    this.action = null;
    this.min = min || 0;
    this.max = max || 360;
    this.value = Math.max(this.min, (value || 0) % this.max);
    this.tick = tick || 15;
    this.fillColor = null;

    DialMorph.uber.init.call(this);

    this.color = new Color(230, 230, 230);
    this.noticesTransparentClick = true;
    this.setRadius(radius || MorphicPreferences.menuFontSize * 4);
};

DialMorph.prototype.setRadius = function (radius) {
	this.radius = radius;
    this.setExtent(new Point(this.radius * 2, this.radius * 2));
};

DialMorph.prototype.setValue = function (value, snapToTick, noUpdate) {
	var range = this.max - this.min;
 	value = value || 0;
    this.value = this.min + (((+value % range) + range) % range);
    if (snapToTick) {
    	if (this.value < this.tick) {
     		this.value = this.min;
       	} else {
    		this.value -= this.value % this.tick % this.value;
        }
    }
	this.drawNew();
 	this.changed();
  	if (noUpdate) {return; }
  	this.updateTarget();
};

DialMorph.prototype.getValueOf = function (point) {
    var range = this.max - this.min,
    	center = this.center(),
        deltaX = point.x - center.x,
        deltaY = center.y - point.y,
        angle = Math.abs(deltaX) < 0.001 ? (deltaY < 0 ? 90 : 270)
                : Math.round(
                (deltaX >= 0 ? 0 : 180)
                    - (Math.atan(deltaY / deltaX) * 57.2957795131)
        		),
        value = angle + 90 % 360,
        ratio = value / 360;
    return range * ratio + this.min;
};

DialMorph.prototype.setExtent = function (aPoint) {
	var size = Math.min(aPoint.x, aPoint.y);
	this.radius = size / 2;
    DialMorph.uber.setExtent.call(this, new Point(size, size));
};

DialMorph.prototype.drawNew = function () {
    var ctx, i, angle, x1, y1, x2, y2,
    	light = this.color.lighter().toString(),
    	range = this.max - this.min,
     	ticks = range / this.tick,
      	face = this.radius * 0.75,
      	inner = face * 0.85,
       	outer = face * 0.95;

    this.image = newCanvas(this.extent(), false, this.image);
    ctx = this.image.getContext('2d');

    // draw a light border:
    ctx.fillStyle = light;
    ctx.beginPath();
    ctx.arc(
        this.radius,
        this.radius,
        face + Math.min(1, this.radius - face),
        0,
        2 * Math.PI,
        false
    );
    ctx.closePath();
    ctx.fill();

	// fill circle:
    ctx.fillStyle = this.color.toString();
    ctx.beginPath();
    ctx.arc(
        this.radius,
        this.radius,
        face,
        0,
        2 * Math.PI,
        false
    );
    ctx.closePath();
    ctx.fill();

    // fill value
    angle = (this.value - this.min) * (Math.PI * 2) / range - Math.PI / 2;
    ctx.fillStyle = (this.fillColor || this.color.darker()).toString();
    ctx.beginPath();
    ctx.arc(
    	this.radius,
     	this.radius,
      	face,
       	Math.PI / -2,
        angle,
        false
    );
    ctx.lineTo(this.radius, this.radius);
    ctx.closePath();
    ctx.fill();

	// draw ticks:
 	ctx.strokeStyle = new Color(35, 35, 35).toString();
  	ctx.lineWidth = 1;
 	for (i = 0; i < ticks; i += 1) {
  		angle = (i - 3) * (Math.PI * 2) / ticks - Math.PI / 2;
    	ctx.beginPath();
     	x1 = this.radius + Math.cos(angle) * inner;
      	y1 = this.radius + Math.sin(angle) * inner;
       	x2 = this.radius + Math.cos(angle) * outer;
        y2 = this.radius + Math.sin(angle) * outer;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
	}

	// draw a filled center:
    inner = face * 0.05;
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(
        this.radius,
        this.radius,
        inner,
        0,
        2 * Math.PI,
        false
    );
    ctx.closePath();
    ctx.fill();

    // draw the inner hand:
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    angle = (this.value - this.min) * (Math.PI * 2) / range - Math.PI / 2;
    outer = face * 0.8;
    x1 = this.radius + Math.cos(angle) * inner;
    y1 = this.radius + Math.sin(angle) * inner;
    x2 = this.radius + Math.cos(angle) * outer;
	y2 = this.radius + Math.sin(angle) * outer;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // draw a read-out circle:
    inner = inner * 2;
    x2 = this.radius + Math.cos(angle) * (outer + inner);
    y2 = this.radius + Math.sin(angle) * (outer + inner);
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(
        x2,
        y2,
        inner,
        0,
        2 * Math.PI,
        false
    );
    ctx.closePath();
    ctx.stroke();

    // draw the outer hand:
    angle = (this.value - this.min) * (Math.PI * 2) / range - Math.PI / 2;
    x1 = this.radius + Math.cos(angle) * face;
    y1 = this.radius + Math.sin(angle) * face;
    x2 = this.radius + Math.cos(angle) * (this.radius - 1);
    y2 = this.radius + Math.sin(angle) * (this.radius - 1);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
	ctx.lineWidth = 3;
 	ctx.strokeStyle = light;
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.stroke();

    // draw arrow tip:
	angle = radians(degrees(angle) - 4);
    x1 = this.radius + Math.cos(angle) * this.radius * 0.9;
    y1 = this.radius + Math.sin(angle) * this.radius * 0.9;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    angle = radians(degrees(angle) + 8);
    x1 = this.radius + Math.cos(angle) * this.radius * 0.9;
    y1 = this.radius + Math.sin(angle) * this.radius * 0.9;
    ctx.lineTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = light;
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.fill();
};

// DialMorph stepping:

DialMorph.prototype.step = null;

DialMorph.prototype.mouseDownLeft = function (pos) {
    var world, myself = this;
    world = this.root();
    this.step = function () {
        if (world.hand.mouseButton) {
            myself.setValue(
            	myself.getValueOf(world.hand.bounds.origin),
             	world.currentKey !== 16 // snap to tick
            );
        } else {
            this.step = null;
        }
    };
};

// DialMorph menu:

DialMorph.prototype.developersMenu = function () {
    var menu = DialMorph.uber.developersMenu.call(this);
    menu.addLine();
    menu.addItem(
        'set target',
        "setTarget",
        'select another morph\nwhose numerical property\nwill be ' +
            'controlled by this one'
    );
    return menu;
};

DialMorph.prototype.setTarget = function () {
    var choices = this.overlappedMorphs(),
        menu = new MenuMorph(this, 'choose target:'),
        myself = this;

    choices.push(this.world());
    choices.forEach(function (each) {
        menu.addItem(each.toString().slice(0, 50), function () {
            myself.target = each;
            myself.setTargetSetter();
        });
    });
    if (choices.length === 1) {
        this.target = choices[0];
        this.setTargetSetter();
    } else if (choices.length > 0) {
        menu.popUpAtHand(this.world());
    }
};

DialMorph.prototype.setTargetSetter = function () {
    var choices = this.target.numericalSetters(),
        menu = new MenuMorph(this, 'choose target property:'),
        myself = this;

    choices.forEach(function (each) {
        menu.addItem(each, function () {
            myself.action = each;
        });
    });
    if (choices.length === 1) {
        this.action = choices[0];
    } else if (choices.length > 0) {
        menu.popUpAtHand(this.world());
    }
};

DialMorph.prototype.updateTarget = function () {
    if (this.action) {
        if (typeof this.action === 'function') {
            this.action.call(this.target, this.value);
        } else { // assume it's a String
            this.target[this.action](this.value);
        }
    }
};

// CircleBoxMorph //////////////////////////////////////////////////////

// I can be used for sliders

var CircleBoxMorph;

// CircleBoxMorph inherits from Morph:

CircleBoxMorph.prototype = new Morph();
CircleBoxMorph.prototype.constructor = CircleBoxMorph;
CircleBoxMorph.uber = Morph.prototype;

function CircleBoxMorph(orientation) {
    this.init(orientation || 'vertical');
}

CircleBoxMorph.prototype.init = function (orientation) {
    CircleBoxMorph.uber.init.call(this);
    this.orientation = orientation;
    this.autoOrient = true;
    this.setExtent(new Point(20, 100));
};

CircleBoxMorph.prototype.autoOrientation = function () {
    if (this.height() > this.width()) {
        this.orientation = 'vertical';
    } else {
        this.orientation = 'horizontal';
    }
};

CircleBoxMorph.prototype.drawNew = function () {
    var radius, center1, center2, rect, points, x, y,
        context, ext,
        myself = this;

    if (this.autoOrient) {
        this.autoOrientation();
    }
    this.image = newCanvas(this.extent(), false, this.image);
    context = this.image.getContext('2d');

    if (this.orientation === 'vertical') {
        radius = this.width() / 2;
        x = this.center().x;
        center1 = new Point(x, this.top() + radius);
        center2 = new Point(x, this.bottom() - radius);
        rect = this.bounds.origin.add(new Point(0, radius)).corner(
            this.bounds.corner.subtract(new Point(0, radius))
        );
    } else {
        radius = this.height() / 2;
        y = this.center().y;
        center1 = new Point(this.left() + radius, y);
        center2 = new Point(this.right() - radius, y);
        rect = this.bounds.origin.add(new Point(radius, 0)).corner(
            this.bounds.corner.subtract(new Point(radius, 0))
        );
    }
    points = [ center1.subtract(this.bounds.origin),
        center2.subtract(this.bounds.origin)];
    points.forEach(function (center) {
        context.fillStyle = myself.color.toString();
        context.beginPath();
        context.arc(
            center.x,
            center.y,
            radius,
            0,
            2 * Math.PI,
            false
        );
        context.closePath();
        context.fill();
    });
    rect = rect.translateBy(this.bounds.origin.neg());
    ext = rect.extent();
    if (ext.x > 0 && ext.y > 0) {
        context.fillRect(
            rect.origin.x,
            rect.origin.y,
            rect.width(),
            rect.height()
        );
    }
};

// CircleBoxMorph menu:

CircleBoxMorph.prototype.developersMenu = function () {
    var menu = CircleBoxMorph.uber.developersMenu.call(this);
    menu.addLine();
    if (this.orientation === 'vertical') {
        menu.addItem(
            "horizontal...",
            'toggleOrientation',
            'toggle the\norientation'
        );
    } else {
        menu.addItem(
            "vertical...",
            'toggleOrientation',
            'toggle the\norientation'
        );
    }
    return menu;
};

CircleBoxMorph.prototype.toggleOrientation = function () {
    var center = this.center();
    this.changed();
    if (this.orientation === 'vertical') {
        this.orientation = 'horizontal';
    } else {
        this.orientation = 'vertical';
    }
    this.silentSetExtent(new Point(this.height(), this.width()));
    this.setCenter(center);
    this.drawNew();
    this.changed();
};

// SliderButtonMorph ///////////////////////////////////////////////////

var SliderButtonMorph;

// SliderButtonMorph inherits from CircleBoxMorph:

SliderButtonMorph.prototype = new CircleBoxMorph();
SliderButtonMorph.prototype.constructor = SliderButtonMorph;
SliderButtonMorph.uber = CircleBoxMorph.prototype;

function SliderButtonMorph(orientation) {
    this.init(orientation);
}

SliderButtonMorph.prototype.init = function (orientation) {
    this.color = new Color(80, 80, 80);
    this.highlightColor = new Color(90, 90, 140);
    this.pressColor = new Color(80, 80, 160);
    this.is3D = false;
    this.hasMiddleDip = true;
    SliderButtonMorph.uber.init.call(this, orientation);
};

SliderButtonMorph.prototype.autoOrientation = nop;

SliderButtonMorph.prototype.drawNew = function () {
    var colorBak = this.color.copy();

    SliderButtonMorph.uber.drawNew.call(this);
    if (this.is3D || !MorphicPreferences.isFlat) {
        this.drawEdges();
    }
    this.normalImage = this.image;

    this.image = null; // make sure not to reuse ther image canvas
    this.color = this.highlightColor.copy();
    SliderButtonMorph.uber.drawNew.call(this);
    if (this.is3D || !MorphicPreferences.isFlat) {
        this.drawEdges();
    }
    this.highlightImage = this.image;

    this.image = null; // make sure not to reuse ther image canvas
    this.color = this.pressColor.copy();
    SliderButtonMorph.uber.drawNew.call(this);
    if (this.is3D || !MorphicPreferences.isFlat) {
        this.drawEdges();
    }
    this.pressImage = this.image;

    this.color = colorBak;
    this.image = this.normalImage;

};

SliderButtonMorph.prototype.drawEdges = function () {
    var context = this.image.getContext('2d'),
        gradient,
        radius,
        w = this.width(),
        h = this.height();

    context.lineJoin = 'round';
    context.lineCap = 'round';

    if (this.orientation === 'vertical') {
        context.lineWidth = w / 3;
        gradient = context.createLinearGradient(
            0,
            0,
            context.lineWidth,
            0
        );
        gradient.addColorStop(0, 'white');
        gradient.addColorStop(1, this.color.toString());

        context.strokeStyle = gradient;
        context.beginPath();
        context.moveTo(context.lineWidth * 0.5, w / 2);
        context.lineTo(context.lineWidth * 0.5, h - w / 2);
        context.stroke();

        gradient = context.createLinearGradient(
            w - context.lineWidth,
            0,
            w,
            0
        );
        gradient.addColorStop(0, this.color.toString());
        gradient.addColorStop(1, 'black');

        context.strokeStyle = gradient;
        context.beginPath();
        context.moveTo(w - context.lineWidth * 0.5, w / 2);
        context.lineTo(w - context.lineWidth * 0.5, h - w / 2);
        context.stroke();

        if (this.hasMiddleDip) {
            gradient = context.createLinearGradient(
                context.lineWidth,
                0,
                w - context.lineWidth,
                0
            );

            radius = w / 4;
            gradient.addColorStop(0, 'black');
            gradient.addColorStop(0.35, this.color.toString());
            gradient.addColorStop(0.65, this.color.toString());
            gradient.addColorStop(1, 'white');

            context.fillStyle = gradient;
            context.beginPath();
            context.arc(
                w / 2,
                h / 2,
                radius,
                radians(0),
                radians(360),
                false
            );
            context.closePath();
            context.fill();
        }
    } else if (this.orientation === 'horizontal') {
        context.lineWidth = h / 3;
        gradient = context.createLinearGradient(
            0,
            0,
            0,
            context.lineWidth
        );
        gradient.addColorStop(0, 'white');
        gradient.addColorStop(1, this.color.toString());

        context.strokeStyle = gradient;
        context.beginPath();
        context.moveTo(h / 2, context.lineWidth * 0.5);
        context.lineTo(w - h / 2, context.lineWidth * 0.5);
        context.stroke();

        gradient = context.createLinearGradient(
            0,
            h - context.lineWidth,
            0,
            h
        );
        gradient.addColorStop(0, this.color.toString());
        gradient.addColorStop(1, 'black');

        context.strokeStyle = gradient;
        context.beginPath();
        context.moveTo(h / 2, h - context.lineWidth * 0.5);
        context.lineTo(w - h / 2, h - context.lineWidth * 0.5);
        context.stroke();

        if (this.hasMiddleDip) {
            gradient = context.createLinearGradient(
                0,
                context.lineWidth,
                0,
                h - context.lineWidth
            );

            radius = h / 4;
            gradient.addColorStop(0, 'black');
            gradient.addColorStop(0.35, this.color.toString());
            gradient.addColorStop(0.65, this.color.toString());
            gradient.addColorStop(1, 'white');

            context.fillStyle = gradient;
            context.beginPath();
            context.arc(
                this.width() / 2,
                this.height() / 2,
                radius,
                radians(0),
                radians(360),
                false
            );
            context.closePath();
            context.fill();
        }
    }
};

//SliderButtonMorph events:

SliderButtonMorph.prototype.mouseEnter = function () {
    this.image = this.highlightImage;
    this.changed();
};

SliderButtonMorph.prototype.mouseLeave = function () {
    this.image = this.normalImage;
    this.changed();
};

SliderButtonMorph.prototype.mouseDownLeft = function (pos) {
    this.image = this.pressImage;
    this.changed();
    this.escalateEvent('mouseDownLeft', pos);
};

SliderButtonMorph.prototype.mouseClickLeft = function () {
    this.image = this.highlightImage;
    this.changed();
};

SliderButtonMorph.prototype.mouseMove = function () {
    // prevent my parent from getting picked up
    nop();
};

// SliderMorph ///////////////////////////////////////////////////

// SliderMorph inherits from CircleBoxMorph:

SliderMorph.prototype = new CircleBoxMorph();
SliderMorph.prototype.constructor = SliderMorph;
SliderMorph.uber = CircleBoxMorph.prototype;

function SliderMorph(start, stop, value, size, orientation, color) {
    this.init(
        start || 1,
        stop || 100,
        value || 50,
        size || 10,
        orientation || 'vertical',
        color
    );
}

SliderMorph.prototype.init = function (
    start,
    stop,
    value,
    size,
    orientation,
    color
) {
    this.target = null;
    this.action = null;
    this.start = start;
    this.stop = stop;
    this.value = value;
    this.size = size;
    this.offset = null;
    this.button = new SliderButtonMorph();
    this.button.isDraggable = false;
    this.button.color = new Color(200, 200, 200);
    this.button.highlightColor = new Color(210, 210, 255);
    this.button.pressColor = new Color(180, 180, 255);
    SliderMorph.uber.init.call(this, orientation);
    this.add(this.button);
    this.alpha = 0.3;
    this.color = color || new Color(0, 0, 0);
    this.setExtent(new Point(20, 100));
    // this.drawNew();
};

SliderMorph.prototype.autoOrientation = nop;

SliderMorph.prototype.rangeSize = function () {
    return this.stop - this.start;
};

SliderMorph.prototype.ratio = function () {
    return this.size / (this.rangeSize() + 1);
};

SliderMorph.prototype.unitSize = function () {
    if (this.orientation === 'vertical') {
        return (this.height() - this.button.height()) /
            this.rangeSize();
    }
    return (this.width() - this.button.width()) /
        this.rangeSize();
};

SliderMorph.prototype.drawNew = function () {
    var bw, bh, posX, posY;

    SliderMorph.uber.drawNew.call(this);
    this.button.orientation = this.orientation;
    if (this.orientation === 'vertical') {
        bw  = this.width() - 2;
        bh = Math.max(bw, Math.round(this.height() * this.ratio()));
        this.button.silentSetExtent(new Point(bw, bh));
        posX = 1;
        posY = Math.min(
            Math.round((this.value - this.start) * this.unitSize()),
            this.height() - this.button.height()
        );
    } else {
        bh = this.height() - 2;
        bw  = Math.max(bh, Math.round(this.width() * this.ratio()));
        this.button.silentSetExtent(new Point(bw, bh));
        posY = 1;
        posX = Math.min(
            Math.round((this.value - this.start) * this.unitSize()),
            this.width() - this.button.width()
        );
    }
    this.button.setPosition(
        new Point(posX, posY).add(this.bounds.origin)
    );
    this.button.drawNew();
    this.button.changed();
};

SliderMorph.prototype.updateValue = function () {
    var relPos;
    if (this.orientation === 'vertical') {
        relPos = this.button.top() - this.top();
    } else {
        relPos = this.button.left() - this.left();
    }
    this.value = Math.round(relPos / this.unitSize() + this.start);
    this.updateTarget();
};

SliderMorph.prototype.updateTarget = function () {
    if (this.action) {
        if (typeof this.action === 'function') {
            this.action.call(this.target, this.value);
        } else { // assume it's a String
            this.target[this.action](this.value);
        }
    }
};

// SliderMorph menu:

SliderMorph.prototype.developersMenu = function () {
    var menu = SliderMorph.uber.developersMenu.call(this);
    menu.addItem(
        "show value...",
        'showValue',
        'display a dialog box\nshowing the selected number'
    );
    menu.addItem(
        "floor...",
        function () {
            this.prompt(
                menu.title + '\nfloor:',
                this.setStart,
                this,
                this.start.toString(),
                null,
                0,
                this.stop - this.size,
                true
            );
        },
        'set the minimum value\nwhich can be selected'
    );
    menu.addItem(
        "ceiling...",
        function () {
            this.prompt(
                menu.title + '\nceiling:',
                this.setStop,
                this,
                this.stop.toString(),
                null,
                this.start + this.size,
                this.size * 100,
                true
            );
        },
        'set the maximum value\nwhich can be selected'
    );
    menu.addItem(
        "button size...",
        function () {
            this.prompt(
                menu.title + '\nbutton size:',
                this.setSize,
                this,
                this.size.toString(),
                null,
                1,
                this.stop - this.start,
                true
            );
        },
        'set the range\ncovered by\nthe slider button'
    );
    menu.addLine();
    menu.addItem(
        'set target',
        "setTarget",
        'select another morph\nwhose numerical property\nwill be ' +
            'controlled by this one'
    );
    return menu;
};

SliderMorph.prototype.showValue = function () {
    this.inform(this.value);
};

SliderMorph.prototype.userSetStart = function (num) {
    // for context menu demo purposes
    this.start = Math.max(num, this.stop);
};

SliderMorph.prototype.setStart = function (num, noUpdate) {
    // for context menu demo purposes
    var newStart;
    if (typeof num === 'number') {
        this.start = Math.min(
            num,
            this.stop - this.size
        );
    } else {
        newStart = parseFloat(num);
        if (!isNaN(newStart)) {
            this.start = Math.min(
                newStart,
                this.stop - this.size
            );
        }
    }
    this.value = Math.max(this.value, this.start);
    if (!noUpdate) {this.updateTarget(); }
    this.drawNew();
    this.changed();
};

SliderMorph.prototype.setStop = function (num, noUpdate) {
    // for context menu demo purposes
    var newStop;
    if (typeof num === 'number') {
        this.stop = Math.max(num, this.start + this.size);
    } else {
        newStop = parseFloat(num);
        if (!isNaN(newStop)) {
            this.stop = Math.max(newStop, this.start + this.size);
        }
    }
    this.value = Math.min(this.value, this.stop);
    if (!noUpdate) {this.updateTarget(); }
    this.drawNew();
    this.changed();
};

SliderMorph.prototype.setSize = function (num, noUpdate) {
    // for context menu demo purposes
    var newSize;
    if (typeof num === 'number') {
        this.size = Math.min(
            Math.max(num, 1),
            this.stop - this.start
        );
    } else {
        newSize = parseFloat(num);
        if (!isNaN(newSize)) {
            this.size = Math.min(
                Math.max(newSize, 1),
                this.stop - this.start
            );
        }
    }
    this.value = Math.min(this.value, this.stop - this.size);
    if (!noUpdate) {this.updateTarget(); }
    this.drawNew();
    this.changed();
};

SliderMorph.prototype.setTarget = function () {
    var choices = this.overlappedMorphs(),
        menu = new MenuMorph(this, 'choose target:'),
        myself = this;

    choices.push(this.world());
    choices.forEach(function (each) {
        menu.addItem(each.toString().slice(0, 50), function () {
            myself.target = each;
            myself.setTargetSetter();
        });
    });
    if (choices.length === 1) {
        this.target = choices[0];
        this.setTargetSetter();
    } else if (choices.length > 0) {
        menu.popUpAtHand(this.world());
    }
};

SliderMorph.prototype.setTargetSetter = function () {
    var choices = this.target.numericalSetters(),
        menu = new MenuMorph(this, 'choose target property:'),
        myself = this;

    choices.forEach(function (each) {
        menu.addItem(each, function () {
            myself.action = each;
        });
    });
    if (choices.length === 1) {
        this.action = choices[0];
    } else if (choices.length > 0) {
        menu.popUpAtHand(this.world());
    }
};

SliderMorph.prototype.numericalSetters = function () {
    // for context menu demo purposes
    var list = SliderMorph.uber.numericalSetters.call(this);
    list.push('setStart', 'setStop', 'setSize');
    return list;
};

// SliderMorph stepping:

SliderMorph.prototype.step = null;

SliderMorph.prototype.mouseDownLeft = function (pos) {
    var world, myself = this;

    if (!this.button.bounds.containsPoint(pos)) {
        this.offset = new Point(); // return null;
    } else {
        this.offset = pos.subtract(this.button.bounds.origin);
    }
    world = this.root();
    this.step = function () {
        var mousePos, newX, newY;
        if (world.hand.mouseButton) {
            mousePos = world.hand.bounds.origin;
            if (myself.orientation === 'vertical') {
                newX = myself.button.bounds.origin.x;
                newY = Math.max(
                    Math.min(
                        mousePos.y - myself.offset.y,
                        myself.bottom() - myself.button.height()
                    ),
                    myself.top()
                );
            } else {
                newY = myself.button.bounds.origin.y;
                newX = Math.max(
                    Math.min(
                        mousePos.x - myself.offset.x,
                        myself.right() - myself.button.width()
                    ),
                    myself.left()
                );
            }
            myself.button.setPosition(new Point(newX, newY));
            myself.updateValue();
        } else {
            this.step = null;
        }
    };
};

// MouseSensorMorph ////////////////////////////////////////////////////

// for demo and debuggin purposes only, to be removed later

var MouseSensorMorph;

// MouseSensorMorph inherits from BoxMorph:

MouseSensorMorph.prototype = new BoxMorph();
MouseSensorMorph.prototype.constructor = MouseSensorMorph;
MouseSensorMorph.uber = BoxMorph.prototype;

// MouseSensorMorph instance creation:

function MouseSensorMorph(edge, border, borderColor) {
    this.init(edge, border, borderColor);
}

MouseSensorMorph.prototype.init = function (edge, border, borderColor) {
    MouseSensorMorph.uber.init.call(this);
    this.edge = edge || 4;
    this.border = border || 2;
    this.color = new Color(255, 255, 255);
    this.borderColor = borderColor || new Color();
    this.isTouched = false;
    this.upStep = 0.05;
    this.downStep = 0.02;
    this.noticesTransparentClick = false;
    this.drawNew();
};

MouseSensorMorph.prototype.touch = function () {
    var myself = this;
    if (!this.isTouched) {
        this.isTouched = true;
        this.alpha = 0.6;

        this.step = function () {
            if (myself.isTouched) {
                if (myself.alpha < 1) {
                    myself.alpha = myself.alpha + myself.upStep;
                }
            } else if (myself.alpha > (myself.downStep)) {
                myself.alpha = myself.alpha - myself.downStep;
            } else {
                myself.alpha = 0;
                myself.step = null;
            }
            myself.changed();
        };
    }
};

MouseSensorMorph.prototype.unTouch = function () {
    this.isTouched = false;
};

MouseSensorMorph.prototype.mouseEnter = function () {
    this.touch();
};

MouseSensorMorph.prototype.mouseLeave = function () {
    this.unTouch();
};

MouseSensorMorph.prototype.mouseDownLeft = function () {
    this.touch();
};

MouseSensorMorph.prototype.mouseClickLeft = function () {
    this.unTouch();
};

// InspectorMorph //////////////////////////////////////////////////////

// InspectorMorph: referenced constructors

var ListMorph;
var TriggerMorph;

// InspectorMorph inherits from BoxMorph:

InspectorMorph.prototype = new BoxMorph();
InspectorMorph.prototype.constructor = InspectorMorph;
InspectorMorph.uber = BoxMorph.prototype;

// InspectorMorph instance creation:

function InspectorMorph(target) {
    this.init(target);
}

InspectorMorph.prototype.init = function (target) {
    // additional properties:
    this.target = target;
    this.currentProperty = null;
    this.showing = 'attributes';
    this.markOwnProperties = false;
    this.hasUserEditedDetails = false;

    // initialize inherited properties:
    InspectorMorph.uber.init.call(this);

    // override inherited properties:
    this.silentSetExtent(
        new Point(
            MorphicPreferences.handleSize * 20,
            MorphicPreferences.handleSize * 20 * 2 / 3
        )
    );
    this.isDraggable = true;
    this.border = 1;
    this.edge = MorphicPreferences.isFlat ? 1 : 5;
    this.color = new Color(60, 60, 60);
    this.borderColor = new Color(95, 95, 95);
    this.fps = 25;
    this.drawNew();

    // panes:
    this.label = null;
    this.list = null;
    this.detail = null;
    this.work = null;
    this.buttonInspect = null;
    this.buttonClose = null;
    this.buttonSubset = null;
    this.buttonEdit = null;
    this.resizer = null;

    if (this.target) {
        this.buildPanes();
    }
};

InspectorMorph.prototype.setTarget = function (target) {
    this.target = target;
    this.currentProperty = null;
    this.buildPanes();
};

InspectorMorph.prototype.updateCurrentSelection = function () {
    var val, txt, cnts,
        sel = this.list.selected,
        currentTxt = this.detail.contents.children[0],
        root = this.root();

    if (root &&
            (root.keyboardReceiver instanceof CursorMorph) &&
            (root.keyboardReceiver.target === currentTxt)) {
        this.hasUserEditedDetails = true;
        return;
    }
    if (isNil(sel) || this.hasUserEditedDetails) {return; }
    val = this.target[sel];
    this.currentProperty = val;
    if (isNil(val)) {
        txt = 'NULL';
    } else if (isString(val)) {
        txt = val;
    } else {
        txt = val.toString();
    }
    if (currentTxt.text === txt) {return; }
    cnts = new TextMorph(txt);
    cnts.isEditable = true;
    cnts.enableSelecting();
    cnts.setReceiver(this.target);
    this.detail.setContents(cnts);
};

InspectorMorph.prototype.buildPanes = function () {
    var attribs = [], property, myself = this, ctrl, ev, doubleClickAction;

    // remove existing panes
    this.children.forEach(function (m) {
        if (m !== this.work) { // keep work pane around
            m.destroy();
        }
    });
    this.children = [];

    // label
    this.label = new TextMorph(this.target.toString());
    this.label.fontSize = MorphicPreferences.menuFontSize;
    this.label.isBold = true;
    this.label.color = new Color(255, 255, 255);
    this.label.drawNew();
    this.add(this.label);

    // properties list
    for (property in this.target) {
        if (property) { // dummy condition, to be refined
            attribs.push(property);
        }
    }
    if (this.showing === 'attributes') {
        attribs = attribs.filter(function (prop) {
            return typeof myself.target[prop] !== 'function';
        });
    } else if (this.showing === 'methods') {
        attribs = attribs.filter(function (prop) {
            return typeof myself.target[prop] === 'function';
        });
    } // otherwise show all properties

    doubleClickAction = function () {
        var world, inspector;
        if (!isObject(myself.currentProperty)) {return; }
        world = myself.world();
        inspector = new InspectorMorph(
            myself.currentProperty
        );
        inspector.setPosition(world.hand.position());
        inspector.keepWithin(world);
        world.add(inspector);
        inspector.changed();
    };

    this.list = new ListMorph(
        this.target instanceof Array ? attribs : attribs.sort(),
        null, // label getter
        this.markOwnProperties ?
                [ // format list
                    [ // format element: [color, predicate(element]
                        new Color(0, 0, 180),
                        function (element) {
                            return Object.prototype.hasOwnProperty.call(
                                myself.target,
                                element
                            );
                        }
                    ]
                ]
                : null,
        doubleClickAction
    );

    this.list.action = function () {
        myself.hasUserEditedDetails = false;
        myself.updateCurrentSelection();
    };

    this.list.hBar.alpha = 0.6;
    this.list.vBar.alpha = 0.6;
    this.list.contents.step = null;
    this.add(this.list);

    // details pane
    this.detail = new ScrollFrameMorph();
    this.detail.acceptsDrops = false;
    this.detail.contents.acceptsDrops = false;
    this.detail.isTextLineWrapping = true;
    this.detail.color = new Color(255, 255, 255);
    this.detail.hBar.alpha = 0.6;
    this.detail.vBar.alpha = 0.6;
    ctrl = new TextMorph('');
    ctrl.isEditable = true;
    ctrl.enableSelecting();
    ctrl.setReceiver(this.target);
    this.detail.setContents(ctrl);
    this.add(this.detail);

    // work ('evaluation') pane
    // don't refresh the work pane if it already exists
    if (this.work === null) {
        this.work = new ScrollFrameMorph();
        this.work.acceptsDrops = false;
        this.work.contents.acceptsDrops = false;
        this.work.isTextLineWrapping = true;
        this.work.color = new Color(255, 255, 255);
        this.work.hBar.alpha = 0.6;
        this.work.vBar.alpha = 0.6;
        ev = new TextMorph('');
        ev.isEditable = true;
        ev.enableSelecting();
        ev.setReceiver(this.target);
        this.work.setContents(ev);
    }
    this.add(this.work);

    // properties button
    this.buttonSubset = new TriggerMorph();
    this.buttonSubset.labelString = 'show...';
    this.buttonSubset.action = function () {
        var menu;
        menu = new MenuMorph();
        menu.addItem(
            'attributes',
            function () {
                myself.showing = 'attributes';
                myself.buildPanes();
            }
        );
        menu.addItem(
            'methods',
            function () {
                myself.showing = 'methods';
                myself.buildPanes();
            }
        );
        menu.addItem(
            'all',
            function () {
                myself.showing = 'all';
                myself.buildPanes();
            }
        );
        menu.addLine();
        menu.addItem(
            (myself.markOwnProperties ?
                    'un-mark own' : 'mark own'),
            function () {
                myself.markOwnProperties = !myself.markOwnProperties;
                myself.buildPanes();
            },
            'highlight\n\'own\' properties'
        );
        menu.popUpAtHand(myself.world());
    };
    this.add(this.buttonSubset);

    // inspect button
    this.buttonInspect = new TriggerMorph();
    this.buttonInspect.labelString = 'inspect...';
    this.buttonInspect.action = function () {
        var menu, world, inspector;
        if (isObject(myself.currentProperty)) {
            menu = new MenuMorph();
            menu.addItem(
                'in new inspector...',
                function () {
                    world = myself.world();
                    inspector = new InspectorMorph(
                        myself.currentProperty
                    );
                    inspector.setPosition(world.hand.position());
                    inspector.keepWithin(world);
                    world.add(inspector);
                    inspector.changed();
                }
            );
            menu.addItem(
                'here...',
                function () {
                    myself.setTarget(myself.currentProperty);
                }
            );
            menu.popUpAtHand(myself.world());
        } else {
            myself.inform(
                (myself.currentProperty === null ?
                        'null' : typeof myself.currentProperty) +
                            '\nis not inspectable'
            );
        }
    };
    this.add(this.buttonInspect);

    // edit button

    this.buttonEdit = new TriggerMorph();
    this.buttonEdit.labelString = 'edit...';
    this.buttonEdit.action = function () {
        var menu;
        menu = new MenuMorph(myself);
        menu.addItem("save", 'save', 'accept changes');
        menu.addLine();
        menu.addItem("add property...", 'addProperty');
        menu.addItem("rename...", 'renameProperty');
        menu.addItem("remove...", 'removeProperty');
        menu.popUpAtHand(myself.world());
    };
    this.add(this.buttonEdit);

    // close button
    this.buttonClose = new TriggerMorph();
    this.buttonClose.labelString = 'close';
    this.buttonClose.action = function () {
        myself.destroy();
    };
    this.add(this.buttonClose);

    // resizer
    this.resizer = new HandleMorph(
        this,
        150,
        100,
        this.edge,
        this.edge
    );

    // update layout
    this.fixLayout();
};

InspectorMorph.prototype.fixLayout = function () {
    var x, y, r, b, w, h;

    Morph.prototype.trackChanges = false;

    // label
    x = this.left() + this.edge;
    y = this.top() + this.edge;
    r = this.right() - this.edge;
    w = r - x;
    this.label.setPosition(new Point(x, y));
    this.label.setWidth(w);
    if (this.label.height() > (this.height() - 50)) {
        this.silentSetHeight(this.label.height() + 50);
        this.drawNew();
        this.changed();
        this.resizer.drawNew();
    }

    // list
    y = this.label.bottom() + 2;
    w = Math.min(
        Math.floor(this.width() / 3),
        this.list.listContents.width()
    );

    w -= this.edge;
    b = this.bottom() - (2 * this.edge) -
        MorphicPreferences.handleSize;
    h = b - y;
    this.list.setPosition(new Point(x, y));
    this.list.setExtent(new Point(w, h));

    // detail
    x = this.list.right() + this.edge;
    r = this.right() - this.edge;
    w = r - x;
    this.detail.setPosition(new Point(x, y));
    this.detail.setExtent(new Point(w, (h * 2 / 3) - this.edge));

    // work
    y = this.detail.bottom() + this.edge;
    this.work.setPosition(new Point(x, y));
    this.work.setExtent(new Point(w, h / 3));

    // properties button
    x = this.list.left();
    y = this.list.bottom() + this.edge;
    w = this.list.width();
    h = MorphicPreferences.handleSize;
    this.buttonSubset.setPosition(new Point(x, y));
    this.buttonSubset.setExtent(new Point(w, h));

    // inspect button
    x = this.detail.left();
    w = this.detail.width() - this.edge -
        MorphicPreferences.handleSize;
    w = w / 3 - this.edge / 3;
    this.buttonInspect.setPosition(new Point(x, y));
    this.buttonInspect.setExtent(new Point(w, h));

    // edit button
    x = this.buttonInspect.right() + this.edge;
    this.buttonEdit.setPosition(new Point(x, y));
    this.buttonEdit.setExtent(new Point(w, h));

    // close button
    x = this.buttonEdit.right() + this.edge;
    r = this.detail.right() - this.edge -
        MorphicPreferences.handleSize;
    w = r - x;
    this.buttonClose.setPosition(new Point(x, y));
    this.buttonClose.setExtent(new Point(w, h));

    Morph.prototype.trackChanges = true;
    this.changed();

};

InspectorMorph.prototype.setExtent = function (aPoint) {
    InspectorMorph.uber.setExtent.call(this, aPoint);
    this.fixLayout();
};

// InspectorMorph editing ops:

InspectorMorph.prototype.save = function () {
    var txt = this.detail.contents.children[0].text.toString(),
        prop = this.list.selected;
    try {
        // this.target[prop] = evaluate(txt);
        this.target.evaluateString('this.' + prop + ' = ' + txt);
        this.hasUserEditedDetails = false;
        if (this.target.drawNew) {
            this.target.changed();
            this.target.drawNew();
            this.target.changed();
        }
    } catch (err) {
        this.inform(err);
    }
};

InspectorMorph.prototype.addProperty = function () {
    var myself = this;
    this.prompt(
        'new property name:',
        function (prop) {
            if (prop) {
                myself.target[prop] = null;
                myself.buildPanes();
                if (myself.target.drawNew) {
                    myself.target.changed();
                    myself.target.drawNew();
                    myself.target.changed();
                }
            }
        },
        this,
        'property' // Chrome cannot handle empty strings (others do)
    );
};

InspectorMorph.prototype.renameProperty = function () {
    var myself = this,
        propertyName = this.list.selected;
    this.prompt(
        'property name:',
        function (prop) {
            try {
                delete (myself.target[propertyName]);
                myself.target[prop] = myself.currentProperty;
            } catch (err) {
                myself.inform(err);
            }
            myself.buildPanes();
            if (myself.target.drawNew) {
                myself.target.changed();
                myself.target.drawNew();
                myself.target.changed();
            }
        },
        this,
        propertyName
    );
};

InspectorMorph.prototype.removeProperty = function () {
    var prop = this.list.selected;
    try {
        delete (this.target[prop]);
        this.currentProperty = null;
        this.buildPanes();
        if (this.target.drawNew) {
            this.target.changed();
            this.target.drawNew();
            this.target.changed();
        }
    } catch (err) {
        this.inform(err);
    }
};

// InspectorMorph stepping

InspectorMorph.prototype.step = function () {
    this.updateCurrentSelection();
    var lbl = this.target.toString();
    if (this.label.text === lbl) {return; }
    this.label.text = lbl;
    this.label.drawNew();
    this.fixLayout();
};

// InspectorMorph duplicating:

InspectorMorph.prototype.updateReferences = function (map) {
    var active = this.list.activeIndex();
    InspectorMorph.uber.updateReferences.call(this, map);
    this.buildPanes();
    this.list.activateIndex(active);
};

// MenuMorph ///////////////////////////////////////////////////////////

// MenuMorph: referenced constructors

var MenuItemMorph;

// MenuMorph inherits from BoxMorph:

MenuMorph.prototype = new BoxMorph();
MenuMorph.prototype.constructor = MenuMorph;
MenuMorph.uber = BoxMorph.prototype;

// MenuMorph instance creation:

function MenuMorph(target, title, environment, fontSize) {
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

MenuMorph.prototype.init = function (target, title, environment, fontSize) {
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
    MenuMorph.uber.init.call(this);

    // override inherited properties:
    this.isDraggable = false;

    // immutable properties:
    this.border = null;
    this.edge = null;
};

MenuMorph.prototype.addItem = function (
    labelString,
    action,
    hint,
    color,
    bold, // bool
    italic, // bool
    doubleClickAction, // optional, when used as list contents
    shortcut, // optional string, icon (Morph or Canvas) or tuple [icon, string]
    verbatim // optional bool, don't translate if true
) {
    /*
    labelString is normally a single-line string. But it can also be one
    of the following:

        * a multi-line string (containing line breaks)
        * an icon (either a Morph or a Canvas)
        * a tuple of format: [icon, string]
    */
    this.items.push([
        verbatim ? labelString || 'close' : localize(labelString || 'close'),
        action || nop,
        hint,
        color,
        bold || false,
        italic || false,
        doubleClickAction,
        shortcut,
        verbatim]);
};

MenuMorph.prototype.addMenu = function (label, aMenu, indicator, verbatim) {
    this.addPair(
        label,
        aMenu,
        isNil(indicator) ? '\u25ba' : indicator,
        null,
        verbatim // don't translate
    );
};

MenuMorph.prototype.addPair = function (
    label,
    action,
    shortcut,
    hint,
    verbatim // don't translate
) {
    this.addItem(
        label,
        action,
        hint,
        null,
        null,
        null,
        null,
        shortcut,
        verbatim
    );
};

MenuMorph.prototype.addLine = function (width) {
    this.items.push([0, width || 1]);
};

MenuMorph.prototype.createLabel = function () {
    var text;
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
};

MenuMorph.prototype.drawNew = function () {
    var myself = this,
        item,
        fb,
        x,
        y,
        isLine = false;

    this.children.forEach(function (m) {
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
    this.items.forEach(function (tuple) {
        isLine = false;
        if (tuple instanceof StringFieldMorph ||
                tuple instanceof ColorPickerMorph ||
                tuple instanceof SliderMorph ||
                tuple instanceof DialMorph) {
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
    MenuMorph.uber.drawNew.call(this);
};

MenuMorph.prototype.maxWidth = function () {
    var w = 0;

    if (this.parent instanceof FrameMorph) {
        if (this.parent.scrollFrame instanceof ScrollFrameMorph) {
            w = this.parent.scrollFrame.width();
        }
    }
    this.children.forEach(function (item) {
        if (item instanceof MenuItemMorph) {
            w = Math.max(
                w,
                item.label.width() + 8 +
                    (item.shortcut ? item.shortcut.width() + 4 : 0)
            );
        } else if ((item instanceof StringFieldMorph) ||
                (item instanceof ColorPickerMorph) ||
                (item instanceof SliderMorph) ||
                (item instanceof DialMorph)) {
            w = Math.max(w, item.width());
        }
    });
    if (this.label) {
        w = Math.max(w, this.label.width());
    }
    return w;
};

MenuMorph.prototype.adjustWidths = function () {
    var w = this.maxWidth(),
        isSelected,
        myself = this;
    this.children.forEach(function (item) {
    	if (!(item instanceof DialMorph)) {
        	item.silentSetWidth(w);
        }
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
};

MenuMorph.prototype.unselectAllItems = function () {
    this.children.forEach(function (item) {
        if (item instanceof MenuItemMorph) {
            item.image = item.normalImage;
        } else if (item instanceof ScrollFrameMorph) {
        	item.contents.children.forEach(function (morph) {
         		if (morph instanceof MenuItemMorph) {
           			morph.image = morph.normalImage;
              	}
         	});
        }
    });
    this.changed();
};

// MenuMorph popping up

MenuMorph.prototype.popup = function (world, pos) {
	var scroller;

    this.drawNew();
    this.setPosition(pos);
    this.addShadow(new Point(2, 2), 80);
    this.keepWithin(world);

    if (this.bottom() > world.bottom()) {
    	// scroll menu items if the menu is taller than the world
    	this.removeShadow();
        scroller = this.scroll();
        this.bounds.corner.y = world.bottom() - 2;
        MenuMorph.uber.drawNew.call(this);
        this.addShadow(new Point(2, 2), 80);
        scroller.setHeight(world.bottom() - scroller.top() - 6);
        scroller.adjustScrollBars(); // ?
     }

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
};

MenuMorph.prototype.scroll = function () {
    // private - move all items into a scroll frame
     var scroller = new ScrollFrameMorph(),
          start = this.label ? 1 : 0,
        first = this.children[start];

    scroller.setPosition(first.position());
      this.children.slice(start).forEach(function (morph) {
        scroller.addContents(morph);
    });
    this.add(scroller);
    scroller.setWidth(first.width());
    return scroller;
};

MenuMorph.prototype.popUpAtHand = function (world) {
    var wrrld = world || this.world;
    this.popup(wrrld, wrrld.hand.position());
};

MenuMorph.prototype.popUpCenteredAtHand = function (world) {
    var wrrld = world || this.world;
    this.drawNew();
    this.popup(
        wrrld,
        wrrld.hand.position().subtract(
            this.extent().floorDivideBy(2)
        )
    );
};

MenuMorph.prototype.popUpCenteredInWorld = function (world) {
    var wrrld = world || this.world;
    this.drawNew();
    this.popup(
        wrrld,
        wrrld.center().subtract(
            this.extent().floorDivideBy(2)
        )
    );
};

// MenuMorph submenus

MenuMorph.prototype.closeRootMenu = function () {
    if (this.parent instanceof MenuMorph) {
        this.parent.closeRootMenu();
    } else {
        this.destroy();
    }
};

MenuMorph.prototype.closeSubmenu = function () {
    if (this.submenu) {
        this.submenu.destroy();
        this.submenu = null;
        this.unselectAllItems();
    }
};

// MenuMorph keyboard accessibility

MenuMorph.prototype.getFocus = function () {
    this.world.keyboardReceiver = this;
    this.selection = null;
    this.selectFirst();
    this.hasFocus = true;
};

MenuMorph.prototype.processKeyDown = function (event) {
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
};

MenuMorph.prototype.processKeyUp = function (event) {
    nop(event);
};

MenuMorph.prototype.processKeyPress = function (event) {
    nop(event);
};

MenuMorph.prototype.selectFirst = function () {
    var scroller, items, i;

    scroller = detect(this.children, function (morph) {
         return morph instanceof ScrollFrameMorph;
    });
    items = scroller ? scroller.contents.children : this.children;
    for (i = 0; i < items.length; i += 1) {
        if (items[i] instanceof MenuItemMorph) {
            this.select(items[i]);
            return;
    	}
	}
};

MenuMorph.prototype.selectUp = function () {
    var scroller, triggers, idx;

	scroller = detect(this.children, function (morph) {
 		return morph instanceof ScrollFrameMorph;
    });
    triggers = (scroller ? scroller.contents.children : this.children).filter(
    	function (each) {
        	return each instanceof MenuItemMorph;
    	}
    );
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
};

MenuMorph.prototype.selectDown = function () {
    var scroller, triggers, idx;

    scroller = detect(this.children, function (morph) {
         return morph instanceof ScrollFrameMorph;
    });
    triggers = (scroller ? scroller.contents.children : this.children).filter(
        function (each) {
            return each instanceof MenuItemMorph;
        }
    );
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
};

MenuMorph.prototype.enterSubmenu = function () {
    if (this.selection && this.selection.action instanceof MenuMorph) {
        this.selection.popUpSubmenu();
        if (this.submenu) {
            this.submenu.getFocus();
        }
    }
};

MenuMorph.prototype.leaveSubmenu = function () {
    var menu = this.parent;
    if (this.parent instanceof MenuMorph) {
        menu.submenu = null;
        menu.hasFocus = true;
        this.destroy();
        menu.world.keyboardReceiver = menu;
    }
};

MenuMorph.prototype.select = function (aMenuItem) {
    this.unselectAllItems();
    aMenuItem.image = aMenuItem.highlightImage;
    aMenuItem.changed();
    aMenuItem.scrollIntoView();
    this.selection = aMenuItem;
};

MenuMorph.prototype.destroy = function () {
    if (this.hasFocus) {
        this.world.keyboardReceiver = null;
    }
    MenuMorph.uber.destroy.call(this);
};

// StringMorph /////////////////////////////////////////////////////////

// I am a single line of text

// StringMorph inherits from Morph:

StringMorph.prototype = new Morph();
StringMorph.prototype.constructor = StringMorph;
StringMorph.uber = Morph.prototype;

// StringMorph shared properties:

// context for measuring text dimensions, used by StringMorphs and TextMorphs
StringMorph.prototype.measureCtx = newCanvas().getContext("2d");

// StringMorph instance creation:

function StringMorph(
    text,
    fontSize,
    fontStyle,
    bold,
    italic,
    isNumeric,
    shadowOffset,
    shadowColor,
    color,
    fontName
) {
    this.init(
        text,
        fontSize,
        fontStyle,
        bold,
        italic,
        isNumeric,
        shadowOffset,
        shadowColor,
        color,
        fontName
    );
}

StringMorph.prototype.init = function (
    text,
    fontSize,
    fontStyle,
    bold,
    italic,
    isNumeric,
    shadowOffset,
    shadowColor,
    color,
    fontName
) {
    // additional properties:
    this.text = text || ((text === '') ? '' : 'StringMorph');
    this.fontSize = fontSize || 12;
    this.fontName = fontName || MorphicPreferences.globalFontFamily;
    this.fontStyle = fontStyle || 'sans-serif';
    this.isBold = bold || false;
    this.isItalic = italic || false;
    this.isEditable = false;
    this.enableLinks = false; // set to "true" if I can contain clickable URLs
    this.isNumeric = isNumeric || false;
    this.isPassword = false;
    this.shadowOffset = shadowOffset || new Point(0, 0);
    this.shadowColor = shadowColor || null;
    this.isShowingBlanks = false;
    this.blanksColor = new Color(180, 140, 140);

    // additional properties for text-editing:
    this.isScrollable = true; // scrolls into view when edited
    this.currentlySelecting = false;
    this.startMark = 0;
    this.endMark = 0;
    this.markedTextColor = new Color(255, 255, 255);
    this.markedBackgoundColor = new Color(60, 60, 120);

    // initialize inherited properties:
    StringMorph.uber.init.call(this, true);

    // override inherited properites:
    this.color = color || new Color(0, 0, 0);
    this.noticesTransparentClick = true;
    this.drawNew();
};

StringMorph.prototype.toString = function () {
    // e.g. 'a StringMorph("Hello World")'
    return 'a ' +
        (this.constructor.name ||
            this.constructor.toString().split(' ')[1].split('(')[0]) +
        '("' + this.text.slice(0, 30) + '...")';
};

StringMorph.prototype.password = function (letter, length) {
    var ans = '',
        i;
    for (i = 0; i < length; i += 1) {
        ans += letter;
    }
    return ans;
};

StringMorph.prototype.font = function () {
    // answer a font string, e.g. 'bold italic 12px sans-serif'
    var font = '';
    if (this.isBold) {
        font = font + 'bold ';
    }
    if (this.isItalic) {
        font = font + 'italic ';
    }
    return font +
        this.fontSize + 'px ' +
        (this.fontName ? this.fontName + ', ' : '') +
        this.fontStyle;
};

StringMorph.prototype.drawNew = function () {
    var context, width, start, stop, i, p, c, x, y,
        shadowOffset = this.shadowOffset || new Point(),
        txt = this.isPassword ?
                this.password('*', this.text.length) : this.text;

    // determine my extent
    this.measureCtx.font = this.font();
    width = Math.max(
        this.measureCtx.measureText(txt).width + Math.abs(shadowOffset.x),
        1
    );
    this.bounds.corner = this.bounds.origin.add(
        new Point(
            width,
            fontHeight(this.fontSize) + Math.abs(shadowOffset.y)
        )
    );

    // initialize my surface property
    this.image = newCanvas(this.extent(), false, this.image);
    context = this.image.getContext('2d');

    // prepare context for drawing text
    context.font = this.font();
    context.textAlign = 'left';
    context.textBaseline = 'bottom';

    // first draw the shadow, if any
    if (this.shadowColor) {
        x = Math.max(shadowOffset.x, 0);
        y = Math.max(shadowOffset.y, 0);
        context.fillStyle = this.shadowColor.toString();
        context.fillText(txt, x, fontHeight(this.fontSize) + y);
    }

    // now draw the actual text
    x = Math.abs(Math.min(shadowOffset.x, 0));
    y = Math.abs(Math.min(shadowOffset.y, 0));
    context.fillStyle = this.color.toString();

    if (this.isShowingBlanks) {
        this.renderWithBlanks(context, x, fontHeight(this.fontSize) + y);
    } else {
        context.fillText(txt, x, fontHeight(this.fontSize) + y);
    }

    // draw the selection
    start = Math.min(this.startMark, this.endMark);
    stop = Math.max(this.startMark, this.endMark);
    for (i = start; i < stop; i += 1) {
        p = this.slotPosition(i).subtract(this.position());
        c = txt.charAt(i);
        context.fillStyle = this.markedBackgoundColor.toString();
        context.fillRect(p.x, p.y, context.measureText(c).width + 1 + x,
            fontHeight(this.fontSize) + y);
        context.fillStyle = this.markedTextColor.toString();
        context.fillText(c, p.x + x, fontHeight(this.fontSize) + y);
    }

    // notify my parent of layout change
    if (this.parent) {
        if (this.parent.fixLayout) {
            this.parent.fixLayout();
        }
    }
};

StringMorph.prototype.renderWithBlanks = function (context, startX, y) {
    var space = context.measureText(' ').width,
        blank = newCanvas(new Point(space, this.height())),
        ctx = blank.getContext('2d'),
        words = this.text.split(' '),
        x = startX || 0,
        isFirst = true;

    // create the blank form
    ctx.fillStyle = this.blanksColor.toString();
    ctx.arc(
        space / 2,
        blank.height / 2,
        space / 2,
        radians(0),
        radians(360)
    );
    ctx.fill();

    function drawBlank() {
        context.drawImage(blank, x, 0);
        x += space;
    }

    // render my text inserting blanks
    words.forEach(function (word) {
        if (!isFirst) {
            drawBlank();
        }
        isFirst = false;
        if (word !== '') {
            context.fillText(word, x, y);
            x += context.measureText(word).width;
        }
    });
};

// StringMorph measuring:

StringMorph.prototype.slotPosition = function (slot) {
    // answer the position point of the given index ("slot")
    // where the cursor should be placed
    var txt = this.isPassword ?
                this.password('*', this.text.length) : this.text,
        dest = Math.min(Math.max(slot, 0), txt.length),
        context = this.image.getContext('2d'),
        xOffset,
        x,
        y,
        idx;

    xOffset = 0;
    for (idx = 0; idx < dest; idx += 1) {
        xOffset += context.measureText(txt[idx]).width;
    }
    this.pos = dest;
    x = this.left() + xOffset;
    y = this.top();
    return new Point(x, y);
};

StringMorph.prototype.slotAt = function (aPoint) {
    // answer the slot (index) closest to the given point taking
    // in account how far from the middle of the character it is,
    // so the cursor can be moved accordingly

    var txt = this.isPassword ?
                this.password('*', this.text.length) : this.text,
        idx = 0,
        charX = 0,
        context = this.image.getContext('2d');

    while (aPoint.x - this.left() > charX) {
        charX += context.measureText(txt[idx]).width;
        idx += 1;
        if (idx === txt.length) {
            if ((context.measureText(txt).width -
                    (context.measureText(txt[idx - 1]).width / 2)) <
                    (aPoint.x - this.left())) {
                return idx;
            }
        }
    }

    // see where our click fell with respect to the middle of the char
    if (aPoint.x - this.left() >
            charX - context.measureText(txt[idx - 1]).width / 2) {
        return idx;
    } else {
        return idx - 1;
    }
};

StringMorph.prototype.upFrom = function (slot) {
    // answer the slot above the given one
    return slot;
};

StringMorph.prototype.downFrom = function (slot) {
    // answer the slot below the given one
    return slot;
};

StringMorph.prototype.startOfLine = function () {
    // answer the first slot (index) of the line for the given slot
    return 0;
};

StringMorph.prototype.endOfLine = function () {
    // answer the slot (index) indicating the EOL for the given slot
    return this.text.length;
};

StringMorph.prototype.previousWordFrom = function (aSlot) {
    // answer the slot (index) slots indicating the position of the
    // previous word to the left of aSlot
    var index = aSlot - 1;

    // while the current character is non-word one, we skip it, so that
    // if we are in the middle of a non-alphanumeric sequence, we'll get
    // right to the beginning of the previous word
    while (index > 0 && !isWordChar(this.text[index])) {
        index -= 1;
    }

    // while the current character is a word one, we skip it until we
    // find the beginning of the current word
    while (index > 0 && isWordChar(this.text[index - 1])) {
        index -= 1;
    }

    return index;
};

StringMorph.prototype.nextWordFrom = function (aSlot) {
    var index = aSlot;

    while (index < this.endOfLine() && !isWordChar(this.text[index])) {
        index += 1;
    }

    while (index < this.endOfLine() && isWordChar(this.text[index])) {
        index += 1;
    }

    return index;
};

StringMorph.prototype.rawHeight = function () {
    // answer my corrected fontSize
    return this.height() / 1.2;
};

// StringMorph menus:

StringMorph.prototype.developersMenu = function () {
    var menu = StringMorph.uber.developersMenu.call(this);

    menu.addLine();
    menu.addItem("edit", 'edit');
    menu.addItem(
        "font size...",
        function () {
            this.prompt(
                menu.title + '\nfont\nsize:',
                this.setFontSize,
                this,
                this.fontSize.toString(),
                null,
                6,
                500,
                true
            );
        },
        'set this String\'s\nfont point size'
    );
    if (this.fontStyle !== 'serif') {
        menu.addItem("serif", 'setSerif');
    }
    if (this.fontStyle !== 'sans-serif') {
        menu.addItem("sans-serif", 'setSansSerif');
    }
    if (this.isBold) {
        menu.addItem("normal weight", 'toggleWeight');
    } else {
        menu.addItem("bold", 'toggleWeight');
    }
    if (this.isItalic) {
        menu.addItem("normal style", 'toggleItalic');
    } else {
        menu.addItem("italic", 'toggleItalic');
    }
    if (this.isShowingBlanks) {
        menu.addItem("hide blanks", 'toggleShowBlanks');
    } else {
        menu.addItem("show blanks", 'toggleShowBlanks');
    }
    if (this.isPassword) {
        menu.addItem("show characters", 'toggleIsPassword');
    } else {
        menu.addItem("hide characters", 'toggleIsPassword');
    }
    return menu;
};

StringMorph.prototype.toggleIsDraggable = function () {
    // for context menu demo purposes
    this.isDraggable = !this.isDraggable;
    if (this.isDraggable) {
        this.disableSelecting();
    } else {
        this.enableSelecting();
    }
};

StringMorph.prototype.toggleShowBlanks = function () {
    this.isShowingBlanks = !this.isShowingBlanks;
    this.changed();
    this.drawNew();
    this.changed();
};

StringMorph.prototype.toggleWeight = function () {
    this.isBold = !this.isBold;
    this.changed();
    this.drawNew();
    this.changed();
};

StringMorph.prototype.toggleItalic = function () {
    this.isItalic = !this.isItalic;
    this.changed();
    this.drawNew();
    this.changed();
};

StringMorph.prototype.toggleIsPassword = function () {
    this.isPassword = !this.isPassword;
    this.changed();
    this.drawNew();
    this.changed();
};

StringMorph.prototype.setSerif = function () {
    this.fontStyle = 'serif';
    this.changed();
    this.drawNew();
    this.changed();
};

StringMorph.prototype.setSansSerif = function () {
    this.fontStyle = 'sans-serif';
    this.changed();
    this.drawNew();
    this.changed();
};

StringMorph.prototype.setFontSize = function (size) {
    // for context menu demo purposes
    var newSize;
    if (typeof size === 'number') {
        this.fontSize = Math.round(Math.min(Math.max(size, 4), 500));
    } else {
        newSize = parseFloat(size);
        if (!isNaN(newSize)) {
            this.fontSize = Math.round(
                Math.min(Math.max(newSize, 4), 500)
            );
        }
    }
    this.changed();
    this.drawNew();
    this.changed();
};

StringMorph.prototype.setText = function (size) {
    // for context menu demo purposes
    this.text = Math.round(size).toString();
    this.changed();
    this.drawNew();
    this.changed();
};

StringMorph.prototype.numericalSetters = function () {
    // for context menu demo purposes
    return [
        'setLeft',
        'setTop',
        'setAlphaScaled',
        'setFontSize',
        'setText'
    ];
};

// StringMorph editing:

StringMorph.prototype.edit = function () {
    this.root().edit(this);
};

StringMorph.prototype.selection = function () {
    var start, stop;
    start = Math.min(this.startMark, this.endMark);
    stop = Math.max(this.startMark, this.endMark);
    return this.text.slice(start, stop);
};

StringMorph.prototype.selectionStartSlot = function () {
    return Math.min(this.startMark, this.endMark);
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

StringMorph.prototype.deleteSelection = function () {
    var start, stop, text;
    text = this.text;
    start = Math.min(this.startMark, this.endMark);
    stop = Math.max(this.startMark, this.endMark);
    this.text = text.slice(0, start) + text.slice(stop);
    this.changed();
    this.clearSelection();
};

StringMorph.prototype.selectAll = function () {
    var cursor;
    if (this.isEditable) {
        this.startMark = 0;
        cursor = this.root().cursor;
        this.endMark = this.text.length;
        if (cursor) {
            cursor.gotoSlot(this.text.length);
            cursor.syncTextareaSelectionWith(this);
        }
        this.drawNew();
        this.changed();
    }
};

StringMorph.prototype.mouseDownLeft = function (pos) {
    if (this.world().currentKey === 16) {
        this.shiftClick(pos);
    } else if (this.isEditable) {
        this.clearSelection();
    } else {
        this.escalateEvent('mouseDownLeft', pos);
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

StringMorph.prototype.mouseClickLeft = function (pos) {
    var cursor;
    if (this.isEditable) {
        if (!this.currentlySelecting) {
            this.edit(); // creates a new cursor
        }
        cursor = this.root().cursor;
        if (cursor) {
            cursor.gotoPos(pos);
        }
        this.currentlySelecting = true;
    } else if (this.enableLinks) {
        var slot = this.slotAt(pos),
            clickedText,
            startMark,
            endMark;

        if (slot === this.text.length) {
            slot -= 1;
        }

        startMark = slot;
        while (startMark > 1 && isURLChar(this.text[startMark-1])) {
            startMark -= 1;
        }

        endMark = slot;
        while (endMark < this.text.length - 1 &&
                isURLChar(this.text[endMark + 1])) {
            endMark += 1;
        }

        clickedText = this.text.substring(startMark, endMark + 1);
        if (isURL(clickedText)) {
            window.open(clickedText, '_blank');
        } else {
            this.escalateEvent('mouseClickLeft', pos);
        }
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
        this.root().cursor.syncTextareaSelectionWith(this);
    } else {
        this.escalateEvent('mouseDoubleClick', pos);
    }
};

StringMorph.prototype.selectWordAt = function (slot) {
    var cursor = this.root().cursor;

    if (slot === 0 || isWordChar(this.text[slot - 1])) {
        cursor.gotoSlot(this.previousWordFrom(slot));
        this.startMark = cursor.slot;
        this.endMark = this.nextWordFrom(cursor.slot);
    } else {
        cursor.gotoSlot(slot);
        this.startMark = slot;
        this.endMark = this.nextWordFrom(slot);
    }

    this.drawNew();
    this.changed();
};

StringMorph.prototype.selectBetweenWordsAt = function (slot) {
    var cursor = this.root().cursor;

    cursor.gotoSlot(this.nextWordFrom(this.previousWordFrom(slot)));
    this.startMark = cursor.slot;
    this.endMark = cursor.slot;

    while (this.endMark < this.text.length
            && !isWordChar(this.text[this.endMark])) {
        this.endMark += 1;
    }

    this.drawNew();
    this.changed();
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
                this.root().cursor.syncTextareaSelectionWith(this);
                this.drawNew();
                this.changed();
            }
        }
    };
};

StringMorph.prototype.disableSelecting = function () {
    this.mouseDownLeft = StringMorph.prototype.mouseDownLeft;
    delete this.mouseMove;
};

// TextMorph ////////////////////////////////////////////////////////////////

// I am a multi-line, word-wrapping String, quasi-inheriting from StringMorph

// TextMorph inherits from Morph:

TextMorph.prototype = new Morph();
TextMorph.prototype.constructor = TextMorph;
TextMorph.uber = Morph.prototype;

// TextMorph shared properties:

// context for measuring text dimensions, shared with StringMorph prototype
TextMorph.prototype.measureCtx = StringMorph.prototype.measureCtx;

// TextMorph instance creation:

function TextMorph(
    text,
    fontSize,
    fontStyle,
    bold,
    italic,
    alignment,
    width,
    fontName,
    shadowOffset,
    shadowColor
) {
    this.init(text,
        fontSize,
        fontStyle,
        bold,
        italic,
        alignment,
        width,
        fontName,
        shadowOffset,
        shadowColor);
}

TextMorph.prototype.init = function (
    text,
    fontSize,
    fontStyle,
    bold,
    italic,
    alignment,
    width,
    fontName,
    shadowOffset,
    shadowColor
) {
    // additional properties:
    this.text = text || (text === '' ? text : 'TextMorph');
    this.words = [];
    this.lines = [];
    this.lineSlots = [];
    this.fontSize = fontSize || 12;
    this.fontName = fontName || MorphicPreferences.globalFontFamily;
    this.fontStyle = fontStyle || 'sans-serif';
    this.isBold = bold || false;
    this.isItalic = italic || false;
    this.alignment = alignment || 'left';
    this.shadowOffset = shadowOffset || new Point(0, 0);
    this.shadowColor = shadowColor || null;
    this.maxWidth = width || 0;
    this.maxLineWidth = 0;
    this.backgroundColor = null;
    this.isEditable = false;
    this.enableLinks = false; // set to "true" if I can contain clickable URLs

    //additional properties for ad-hoc evaluation:
    this.receiver = null;

    // additional properties for text-editing:
    this.isScrollable = true; // scrolls into view when edited
    this.currentlySelecting = false;
    this.startMark = 0;
    this.endMark = 0;
    this.markedTextColor = new Color(255, 255, 255);
    this.markedBackgoundColor = new Color(60, 60, 120);

    // initialize inherited properties:
    TextMorph.uber.init.call(this);

    // override inherited properites:
    this.color = new Color(0, 0, 0);
    this.noticesTransparentClick = true;
    this.drawNew();
};

TextMorph.prototype.toString = function () {
    // e.g. 'a TextMorph("Hello World")'
    return 'a TextMorph' + '("' + this.text.slice(0, 30) + '...")';
};

TextMorph.prototype.font = StringMorph.prototype.font;

TextMorph.prototype.parse = function () {
    var myself = this,
        paragraphs = this.text.split('\n'),
        context = this.measureCtx,
        oldline = '',
        newline,
        w,
        slot = 0;

    context.font = this.font();
    this.maxLineWidth = 0;
    this.lines = [];
    this.lineSlots = [0];
    this.words = [];

    paragraphs.forEach(function (p) {
        myself.words = myself.words.concat(p.split(' '));
        myself.words.push('\n');
    });

    this.words.forEach(function (word) {
        if (word === '\n') {
            myself.lines.push(oldline);
            myself.lineSlots.push(slot);
            myself.maxLineWidth = Math.max(
                myself.maxLineWidth,
                context.measureText(oldline).width
            );
            oldline = '';
        } else {
            if (myself.maxWidth > 0) {
                newline = oldline + word + ' ';
                w = context.measureText(newline).width;
                if (w > myself.maxWidth) {
                    myself.lines.push(oldline);
                    myself.lineSlots.push(slot);
                    myself.maxLineWidth = Math.max(
                        myself.maxLineWidth,
                        context.measureText(oldline).width
                    );
                    oldline = word + ' ';
                } else {
                    oldline = newline;
                }
            } else {
                oldline = oldline + word + ' ';
            }
            slot += word.length + 1;
        }
    });
};

TextMorph.prototype.drawNew = function () {
    var context, height, i, line, width, shadowHeight, shadowWidth,
        offx, offy, x, y, start, stop, p, c;

    this.parse();

    // set my extent
    shadowWidth = Math.abs(this.shadowOffset.x);
    shadowHeight = Math.abs(this.shadowOffset.y);
    height = this.lines.length * (fontHeight(this.fontSize) + shadowHeight);
    if (this.maxWidth === 0) {
        this.bounds = this.bounds.origin.extent(
            new Point(this.maxLineWidth + shadowWidth, height)
        );
    } else {
        this.bounds = this.bounds.origin.extent(
            new Point(this.maxWidth + shadowWidth, height)
        );
    }

    this.image = newCanvas(this.extent(), false, this.image);

    // prepare context for drawing text
    context = this.image.getContext('2d');
    context.font = this.font();
    context.textAlign = 'left';
    context.textBaseline = 'bottom';

    // fill the background, if desired
    if (this.backgroundColor) {
        context.fillStyle = this.backgroundColor.toString();
        context.fillRect(0, 0, this.width(), this.height());
    }

    // draw the shadow, if any
    if (this.shadowColor) {
        offx = Math.max(this.shadowOffset.x, 0);
        offy = Math.max(this.shadowOffset.y, 0);
        context.fillStyle = this.shadowColor.toString();

        for (i = 0; i < this.lines.length; i = i + 1) {
            line = this.lines[i];
            width = context.measureText(line).width + shadowWidth;
            if (this.alignment === 'right') {
                x = this.width() - width;
            } else if (this.alignment === 'center') {
                x = (this.width() - width) / 2;
            } else { // 'left'
                x = 0;
            }
            y = (i + 1) * (fontHeight(this.fontSize) + shadowHeight)
                - shadowHeight;
            context.fillText(line, x + offx, y + offy);
        }
    }

    // now draw the actual text
    offx = Math.abs(Math.min(this.shadowOffset.x, 0));
    offy = Math.abs(Math.min(this.shadowOffset.y, 0));
    context.fillStyle = this.color.toString();

    for (i = 0; i < this.lines.length; i = i + 1) {
        line = this.lines[i];
        width = context.measureText(line).width + shadowWidth;
        if (this.alignment === 'right') {
            x = this.width() - width;
        } else if (this.alignment === 'center') {
            x = (this.width() - width) / 2;
        } else { // 'left'
            x = 0;
        }
        y = (i + 1) * (fontHeight(this.fontSize) + shadowHeight)
            - shadowHeight;
        context.fillText(line, x + offx, y + offy);
    }

    // draw the selection
    start = Math.min(this.startMark, this.endMark);
    stop = Math.max(this.startMark, this.endMark);
    for (i = start; i < stop; i += 1) {
        p = this.slotPosition(i).subtract(this.position());
        c = this.text.charAt(i);
        context.fillStyle = this.markedBackgoundColor.toString();
        context.fillRect(p.x, p.y, context.measureText(c).width + 1,
            fontHeight(this.fontSize));
        context.fillStyle = this.markedTextColor.toString();
        context.fillText(c, p.x, p.y + fontHeight(this.fontSize));
    }

    // notify my parent of layout change
    if (this.parent) {
        if (this.parent.layoutChanged) {
            this.parent.layoutChanged();
        }
    }
};

TextMorph.prototype.setExtent = function (aPoint) {
    this.maxWidth = Math.max(aPoint.x, 0);
    this.changed();
    this.drawNew();
};

// TextMorph mesuring:

TextMorph.prototype.columnRow = function (slot) {
    // answer the logical position point of the given index ("slot")
    var row,
        col,
        idx = 0;

    for (row = 0; row < this.lines.length; row += 1) {
        idx = this.lineSlots[row];
        for (col = 0; col < this.lines[row].length; col += 1) {
            if (idx === slot) {
                return new Point(col, row);
            }
            idx += 1;
        }
    }
    // return new Point(0, 0);
    return new Point(
        this.lines[this.lines.length - 1].length - 1,
        this.lines.length - 1
    );
};

TextMorph.prototype.slotPosition = function (slot) {
    // answer the physical position point of the given index ("slot")
    // where the cursor should be placed
    var colRow = this.columnRow(slot),
        context = this.image.getContext('2d'),
        shadowHeight = Math.abs(this.shadowOffset.y),
        xOffset = 0,
        yOffset,
        x,
        y,
        idx;

    yOffset = colRow.y * (fontHeight(this.fontSize) + shadowHeight);
    for (idx = 0; idx < colRow.x; idx += 1) {
        xOffset += context.measureText(this.lines[colRow.y][idx]).width;
    }
    x = this.left() + xOffset;
    y = this.top() + yOffset;
    return new Point(x, y);
};

TextMorph.prototype.slotAt = function (aPoint) {
    // answer the slot (index) closest to the given point taking
    // in account how far from the middle of the character it is,
    // so the cursor can be moved accordingly

    var charX,
        row = 0,
        col = 0,
        columnLength,
        shadowHeight = Math.abs(this.shadowOffset.y),
        context = this.image.getContext('2d'),
        textWidth;

    while (aPoint.y - this.top() >
            ((fontHeight(this.fontSize) + shadowHeight) * row)) {
        row += 1;
    }
    row = Math.max(row, 1);

    textWidth = context.measureText(this.lines[row - 1]).width;
    if (this.alignment === 'right') {
        charX = this.width() - textWidth;
    } else if (this.alignment === 'center') {
        charX = (this.width() - textWidth) / 2;
    } else { // 'left'
        charX = 0;
    }
    columnLength = this.lines[row - 1].length;
    while (col < columnLength - 2 && aPoint.x - this.left() > charX) {
        charX += context.measureText(this.lines[row - 1][col]).width;
        col += 1;
    }

    // see where our click fell with respect to the middle of the char
    if (aPoint.x - this.left() >
            charX - context.measureText(this.lines[row - 1][col]).width / 2) {
        return this.lineSlots[Math.max(row - 1, 0)] + col;
    } else {
        return this.lineSlots[Math.max(row - 1, 0)] + col - 1;
    }
};

TextMorph.prototype.upFrom = function (slot) {
    // answer the slot above the given one
    var above,
        colRow = this.columnRow(slot);
    if (colRow.y < 1) {
        return slot;
    }
    above = this.lines[colRow.y - 1];
    if (above.length < colRow.x - 1) {
        return this.lineSlots[colRow.y - 1] + above.length;
    }
    return this.lineSlots[colRow.y - 1] + colRow.x;
};

TextMorph.prototype.downFrom = function (slot) {
    // answer the slot below the given one
    var below,
        colRow = this.columnRow(slot);
    if (colRow.y > this.lines.length - 2) {
        return slot;
    }
    below = this.lines[colRow.y + 1];
    if (below.length < colRow.x - 1) {
        return this.lineSlots[colRow.y + 1] + below.length;
    }
    return this.lineSlots[colRow.y + 1] + colRow.x;
};

TextMorph.prototype.startOfLine = function (slot) {
    // answer the first slot (index) of the line for the given slot
    return this.lineSlots[this.columnRow(slot).y];
};

TextMorph.prototype.endOfLine = function (slot) {
    // answer the slot (index) indicating the EOL for the given slot
    return this.startOfLine(slot) +
        this.lines[this.columnRow(slot).y].length - 1;
};

TextMorph.prototype.previousWordFrom = StringMorph.prototype.previousWordFrom;

TextMorph.prototype.nextWordFrom = StringMorph.prototype.nextWordFrom;

// TextMorph editing:

TextMorph.prototype.edit = StringMorph.prototype.edit;

TextMorph.prototype.selection = StringMorph.prototype.selection;

TextMorph.prototype.selectionStartSlot
    = StringMorph.prototype.selectionStartSlot;

TextMorph.prototype.clearSelection = StringMorph.prototype.clearSelection;

TextMorph.prototype.deleteSelection = StringMorph.prototype.deleteSelection;

TextMorph.prototype.selectAll = StringMorph.prototype.selectAll;

TextMorph.prototype.mouseDownLeft = StringMorph.prototype.mouseDownLeft;

TextMorph.prototype.shiftClick = StringMorph.prototype.shiftClick;

TextMorph.prototype.mouseClickLeft = StringMorph.prototype.mouseClickLeft;

TextMorph.prototype.mouseDoubleClick = StringMorph.prototype.mouseDoubleClick;

TextMorph.prototype.selectWordAt = StringMorph.prototype.selectWordAt;

TextMorph.prototype.selectBetweenWordsAt
    = StringMorph.prototype.selectBetweenWordsAt;

TextMorph.prototype.enableSelecting = StringMorph.prototype.enableSelecting;

TextMorph.prototype.disableSelecting = StringMorph.prototype.disableSelecting;

TextMorph.prototype.selectAllAndEdit = function () {
    this.edit();
    this.selectAll();
};

// TextMorph menus:

TextMorph.prototype.developersMenu = function () {
    var menu = TextMorph.uber.developersMenu.call(this);
    menu.addLine();
    menu.addItem("edit", 'edit');
    menu.addItem(
        "font size...",
        function () {
            this.prompt(
                menu.title + '\nfont\nsize:',
                this.setFontSize,
                this,
                this.fontSize.toString(),
                null,
                6,
                100,
                true
            );
        },
        'set this Text\'s\nfont point size'
    );
    if (this.alignment !== 'left') {
        menu.addItem("align left", 'setAlignmentToLeft');
    }
    if (this.alignment !== 'right') {
        menu.addItem("align right", 'setAlignmentToRight');
    }
    if (this.alignment !== 'center') {
        menu.addItem("align center", 'setAlignmentToCenter');
    }
    menu.addLine();
    if (this.fontStyle !== 'serif') {
        menu.addItem("serif", 'setSerif');
    }
    if (this.fontStyle !== 'sans-serif') {
        menu.addItem("sans-serif", 'setSansSerif');
    }
    if (this.isBold) {
        menu.addItem("normal weight", 'toggleWeight');
    } else {
        menu.addItem("bold", 'toggleWeight');
    }
    if (this.isItalic) {
        menu.addItem("normal style", 'toggleItalic');
    } else {
        menu.addItem("italic", 'toggleItalic');
    }
    return menu;
};

TextMorph.prototype.setAlignmentToLeft = function () {
    this.alignment = 'left';
    this.drawNew();
    this.changed();
};

TextMorph.prototype.setAlignmentToRight = function () {
    this.alignment = 'right';
    this.drawNew();
    this.changed();
};

TextMorph.prototype.setAlignmentToCenter = function () {
    this.alignment = 'center';
    this.drawNew();
    this.changed();
};

TextMorph.prototype.toggleIsDraggable
    = StringMorph.prototype.toggleIsDraggable;

TextMorph.prototype.toggleWeight = StringMorph.prototype.toggleWeight;

TextMorph.prototype.toggleItalic = StringMorph.prototype.toggleItalic;

TextMorph.prototype.setSerif = StringMorph.prototype.setSerif;

TextMorph.prototype.setSansSerif = StringMorph.prototype.setSansSerif;

TextMorph.prototype.setText = StringMorph.prototype.setText;

TextMorph.prototype.setFontSize = StringMorph.prototype.setFontSize;

TextMorph.prototype.numericalSetters = StringMorph.prototype.numericalSetters;

// TextMorph evaluation:

TextMorph.prototype.evaluationMenu = function () {
    var menu = new MenuMorph(this, null);
    menu.addItem(
        "do it",
        'doIt',
        'evaluate the\nselected expression'
    );
    menu.addItem(
        "show it",
        'showIt',
        'evaluate the\nselected expression\nand show the result'
    );
    menu.addItem(
        "inspect it",
        'inspectIt',
        'evaluate the\nselected expression\nand inspect the result'
    );
    menu.addLine();
    menu.addItem("select all", 'selectAllAndEdit');
    return menu;
};

TextMorph.prototype.setReceiver = function (obj) {
    this.receiver = obj;
    this.customContextMenu = this.evaluationMenu();
};

TextMorph.prototype.doIt = function () {
    this.receiver.evaluateString(this.selection());
    this.edit();
};

TextMorph.prototype.showIt = function () {
    var result = this.receiver.evaluateString(this.selection());
    if (result !== null) {
        this.inform(result);
    }
};

TextMorph.prototype.inspectIt = function () {
    var result = this.receiver.evaluateString(this.selection()),
        world = this.world(),
        inspector;
    if (isObject(result)) {
        inspector = new InspectorMorph(result);
        inspector.setPosition(world.hand.position());
        inspector.keepWithin(world);
        world.add(inspector);
        inspector.changed();
    }
};

// TriggerMorph ////////////////////////////////////////////////////////

// I provide basic button functionality

// TriggerMorph inherits from Morph:

TriggerMorph.prototype = new Morph();
TriggerMorph.prototype.constructor = TriggerMorph;
TriggerMorph.uber = Morph.prototype;

// TriggerMorph instance creation:

function TriggerMorph(
    target,
    action,
    labelString,
    fontSize,
    fontStyle,
    environment,
    hint,
    labelColor,
    labelBold,
    labelItalic,
    doubleClickAction
) {
    this.init(
        target,
        action,
        labelString,
        fontSize,
        fontStyle,
        environment,
        hint,
        labelColor,
        labelBold,
        labelItalic,
        doubleClickAction
    );
}

TriggerMorph.prototype.init = function (
    target,
    action,
    labelString,
    fontSize,
    fontStyle,
    environment,
    hint,
    labelColor,
    labelBold,
    labelItalic,
    doubleClickAction
) {
    // additional properties:
    this.target = target || null;
    this.action = action || null;
    this.doubleClickAction = doubleClickAction || null;
    this.environment = environment || null;
    this.labelString = labelString || null;
    this.label = null;
    this.hint = hint || null; // null, String, or Function
    this.schedule = null; // animation slot for displaying hints
    this.fontSize = fontSize || MorphicPreferences.menuFontSize;
    this.fontStyle = fontStyle || 'sans-serif';
    this.highlightColor = new Color(192, 192, 192);
    this.pressColor = new Color(128, 128, 128);
    this.labelColor = labelColor || new Color(0, 0, 0);
    this.labelBold = labelBold || false;
    this.labelItalic = labelItalic || false;

    // initialize inherited properties:
    TriggerMorph.uber.init.call(this);

    // override inherited properites:
    this.color = new Color(255, 255, 255);
    this.drawNew();
};

// TriggerMorph drawing:

TriggerMorph.prototype.drawNew = function () {
    this.createBackgrounds();
    if (this.labelString !== null) {
        this.createLabel();
    }
};

TriggerMorph.prototype.createBackgrounds = function () {
    var context,
        ext = this.extent();

    this.normalImage = newCanvas(ext, false, this.normalImage);
    context = this.normalImage.getContext('2d');
    context.fillStyle = this.color.toString();
    context.fillRect(0, 0, ext.x, ext.y);

    this.highlightImage = newCanvas(ext, false, this.highlightImage);
    context = this.highlightImage.getContext('2d');
    context.fillStyle = this.highlightColor.toString();
    context.fillRect(0, 0, ext.x, ext.y);

    this.pressImage = newCanvas(ext, false, this.pressImage);
    context = this.pressImage.getContext('2d');
    context.fillStyle = this.pressColor.toString();
    context.fillRect(0, 0, ext.x, ext.y);

    this.image = this.normalImage;
};

TriggerMorph.prototype.createLabel = function () {
    if (this.label !== null) {
        this.label.destroy();
    }
    this.label = new StringMorph(
        this.labelString,
        this.fontSize,
        this.fontStyle,
        this.labelBold,
        this.labelItalic,
        false, // numeric
        null, // shadow offset
        null, // shadow color
        this.labelColor
    );
    this.label.setPosition(
        this.center().subtract(
            this.label.extent().floorDivideBy(2)
        )
    );
    this.add(this.label);
};

// TriggerMorph action:

TriggerMorph.prototype.trigger = function () {
    /*
    if target is a function, use it as callback:
    execute target as callback function with action as argument
    in the environment as optionally specified.
    Note: if action is also a function, instead of becoming
    the argument itself it will be called to answer the argument.
    for selections, Yes/No Choices etc. As second argument pass
    myself, so I can be modified to reflect status changes, e.g.
    inside a list box:

    else (if target is not a function):

        if action is a function:
        execute the action with target as environment (can be null)
        for lambdafied (inline) actions

        else if action is a String:
        treat it as function property of target and execute it
        for selector-like actions
    */
    if (this.schedule) {
        this.schedule.isActive = false;
    }
    if (typeof this.target === 'function') {
        if (typeof this.action === 'function') {
            this.target.call(this.environment, this.action.call(), this);
        } else {
            this.target.call(this.environment, this.action, this);
        }
    } else {
        if (typeof this.action === 'function') {
            this.action.call(this.target);
        } else { // assume it's a String
            this.target[this.action]();
        }
    }
};

TriggerMorph.prototype.triggerDoubleClick = function () {
    // same as trigger() but use doubleClickAction instead of action property
    // note that specifying a doubleClickAction is optional
    if (!this.doubleClickAction) {return; }
    if (this.schedule) {
        this.schedule.isActive = false;
    }
    if (typeof this.target === 'function') {
        if (typeof this.doubleClickAction === 'function') {
            this.target.call(
                this.environment,
                this.doubleClickAction.call(),
                this
            );
        } else {
            this.target.call(this.environment, this.doubleClickAction, this);
        }
    } else {
        if (typeof this.doubleClickAction === 'function') {
            this.doubleClickAction.call(this.target);
        } else { // assume it's a String
            this.target[this.doubleClickAction]();
        }
    }
};

// TriggerMorph events:

TriggerMorph.prototype.mouseEnter = function () {
    var contents = this.hint instanceof Function ? this.hint() : this.hint;
    this.image = this.highlightImage;
    this.changed();
    if (contents) {
        this.bubbleHelp(contents);
    }
};

TriggerMorph.prototype.mouseLeave = function () {
    this.image = this.normalImage;
    this.changed();
    if (this.schedule) {
        this.schedule.isActive = false;
    }
    if (this.hint) {
        this.world().hand.destroyTemporaries();
    }
};

TriggerMorph.prototype.mouseDownLeft = function () {
    this.image = this.pressImage;
    this.changed();
};

TriggerMorph.prototype.mouseClickLeft = function () {
    this.image = this.highlightImage;
    this.changed();
    this.trigger();
};

TriggerMorph.prototype.mouseDoubleClick = function () {
    this.triggerDoubleClick();
};

TriggerMorph.prototype.rootForGrab = function () {
    return this.isDraggable ? TriggerMorph.uber.rootForGrab.call(this) : null;
};

// TriggerMorph bubble help:

TriggerMorph.prototype.bubbleHelp = function (contents) {
    var world = this.world(),
        myself = this;
    this.schedule = new Animation(
        nop,
        nop,
        0,
        500,
        nop,
        function () {myself.popUpbubbleHelp(contents); }
    );
    world.animations.push(this.schedule);
};

TriggerMorph.prototype.popUpbubbleHelp = function (contents) {
    new SpeechBubbleMorph(
        localize(contents),
        null,
        null,
        1
    ).popUp(this.world(), this.rightCenter().add(new Point(-8, 0)));
};

// MenuItemMorph ///////////////////////////////////////////////////////

// I automatically determine my bounds

var MenuItemMorph;

// MenuItemMorph inherits from TriggerMorph:

MenuItemMorph.prototype = new TriggerMorph();
MenuItemMorph.prototype.constructor = MenuItemMorph;
MenuItemMorph.uber = TriggerMorph.prototype;

// MenuItemMorph instance creation:

function MenuItemMorph(
    target,
    action,
    labelString, // can also be a Morph or a Canvas or a tuple: [icon, string]
    fontSize,
    fontStyle,
    environment,
    hint,
    color,
    bold,
    italic,
    doubleClickAction, // optional when used as list morph item
    shortcut // optional string, Morph, Canvas or tuple: [icon, string]
) {
    // additional properties:
    this.shortcutString = shortcut || null;
    this.shortcut = null;

    // initialize inherited properties:
    this.init(
        target,
        action,
        labelString,
        fontSize,
        fontStyle,
        environment,
        hint,
        color,
        bold,
        italic,
        doubleClickAction
    );
}

MenuItemMorph.prototype.createLabel = function () {
    var w, h;
    if (this.label) {
        this.label.destroy();
    }
    this.label = this.createLabelPart(this.labelString);
    this.add(this.label);
    w = this.label.width();
    h = this.label.height();
    if (this.shortcut) {
        this.shortcut.destroy();
    }
    if (this.shortcutString) {
        this.shortcut = this.createLabelPart(this.shortcutString);
        w += this.shortcut.width() + 4;
        h = Math.max(h, this.shortcut.height());
        this.add(this.shortcut);
    }
    this.silentSetExtent(new Point(w + 8, h));
    this.fixLayout();
};

MenuItemMorph.prototype.fixLayout = function () {
    var cntr = this.center();
    this.label.setCenter(cntr);
    this.label.setLeft(this.left() + 4);
    if (this.shortcut) {
        this.shortcut.setCenter(cntr);
        this.shortcut.setRight(this.right() - 4);
    }
};

MenuItemMorph.prototype.createLabelPart = function (source) {
    var part, icon, lbl;
    if (isString(source)) {
        return this.createLabelString(source);
    }
    if (source instanceof Array) {
        // assume its pattern is: [icon, string]
        part = new Morph();
        part.alpha = 0; // transparent
        icon = this.createIcon(source[0]);
        part.add(icon);
        lbl = this.createLabelString(source[1]);
        part.add(lbl);
        lbl.setCenter(icon.center());
        lbl.setLeft(icon.right() + 4);
        part.bounds = (icon.bounds.merge(lbl.bounds));
        part.drawNew();
        return part;
    }
    // assume it's either a Morph or a Canvas
    return this.createIcon(source);
};

MenuItemMorph.prototype.createIcon = function (source) {
    // source can be either a Morph or an HTMLCanvasElement
    var icon = new Morph(),
        src;
    icon.image = source instanceof Morph ? source.fullImage() : source;
    // adjust shadow dimensions
    if (source instanceof Morph && source.getShadow()) {
        src = icon.image;
        icon.image = newCanvas(
            source.fullBounds().extent().subtract(
                this.shadowBlur * (useBlurredShadows ? 1 : 2)
            )
        );
        icon.image.getContext('2d').drawImage(src, 0, 0);
    }
    icon.silentSetWidth(icon.image.width);
    icon.silentSetHeight(icon.image.height);
    return icon;
};

MenuItemMorph.prototype.createLabelString = function (string) {
    var lbl = new TextMorph(
        string,
        this.fontSize,
        this.fontStyle,
        this.labelBold,
        this.labelItalic
    );
    lbl.setColor(this.labelColor);
    return lbl;
};

// MenuItemMorph events:

MenuItemMorph.prototype.mouseEnter = function () {
    var menu = this.parentThatIsA(MenuMorph);
    if (this.isShowingSubmenu()) {
        return;
    }
    if (menu) {
        menu.closeSubmenu();
    }
    if (!this.isListItem()) {
        this.image = this.highlightImage;
        this.changed();
    }
    if (this.action instanceof MenuMorph) {
        this.delaySubmenu();
    } else if (this.hint) {
        this.bubbleHelp(this.hint);
    }
};

MenuItemMorph.prototype.mouseLeave = function () {
    if (!this.isListItem()) {
        if (this.isShowingSubmenu()) {
            this.image = this.highlightImage;
        } else {
            this.image = this.normalImage;
        }
        this.changed();
    }
    if (this.schedule) {
        this.schedule.isActive = false;
    }
    if (this.hint) {
        this.world().hand.destroyTemporaries();
    }
};

MenuItemMorph.prototype.mouseDownLeft = function (pos) {
    if (this.isListItem()) {
        this.parentThatIsA(MenuMorph).unselectAllItems();
        this.escalateEvent('mouseDownLeft', pos);
    }
    this.image = this.pressImage;
    this.changed();
};

MenuItemMorph.prototype.mouseMove = function () {
    if (this.isListItem()) {
        this.escalateEvent('mouseMove');
    }
};

MenuItemMorph.prototype.mouseClickLeft = function () {
    if (this.action instanceof MenuMorph) {
        this.popUpSubmenu();
    } else {
        if (!this.isListItem()) {
            this.parentThatIsA(MenuMorph).closeRootMenu();
            this.world().activeMenu = null;
        }
        this.trigger();
    }
};

MenuItemMorph.prototype.isListItem = function () {
	var menu = this.parentThatIsA(MenuMorph);
    if (menu) {
        return menu.isListContents;
    }
    return false;
};

MenuItemMorph.prototype.isSelectedListItem = function () {
    if (this.isListItem()) {
        return this.image === this.pressImage;
    }
    return false;
};

MenuItemMorph.prototype.isShowingSubmenu = function () {
    var menu = this.parentThatIsA(MenuMorph);
    if (menu && (this.action instanceof MenuMorph)) {
        return menu.submenu === this.action;
    }
    return false;
};

// MenuItemMorph submenus:

MenuItemMorph.prototype.delaySubmenu = function () {
    var world = this.world(),
        myself = this;
    this.schedule = new Animation(
        nop,
        nop,
        0,
        500,
        nop,
        function () {myself.popUpSubmenu(); }
    );
    world.animations.push(this.schedule);
};

MenuItemMorph.prototype.popUpSubmenu = function () {
    var menu = this.parentThatIsA(MenuMorph);
    if (!(this.action instanceof MenuMorph)) {return; }
    this.action.drawNew();
    this.action.setPosition(this.topRight().subtract(new Point(0, 5)));
    this.action.addShadow(new Point(2, 2), 80);
    this.action.keepWithin(this.world());
    if (this.action.items.length < 1 && !this.action.title) {return; }
    menu.add(this.action);
    menu.submenu = this.action;
    menu.submenu.world = menu.world; // keyboard control
    this.action.fullChanged();
};

// FrameMorph //////////////////////////////////////////////////////////

// I clip my submorphs at my bounds

// Frames inherit from Morph:

FrameMorph.prototype = new Morph();
FrameMorph.prototype.constructor = FrameMorph;
FrameMorph.uber = Morph.prototype;

function FrameMorph(aScrollFrame) {
    this.init(aScrollFrame);
}

FrameMorph.prototype.init = function (aScrollFrame) {
    this.scrollFrame = aScrollFrame || null;

    FrameMorph.uber.init.call(this);
    this.color = new Color(255, 250, 245);
    this.drawNew();
    this.acceptsDrops = true;

    if (this.scrollFrame) {
        this.isDraggable = false;
        this.noticesTransparentClick = false;
        this.alpha = 0;
    }
};

FrameMorph.prototype.fullBounds = function () {
    var shadow = this.getShadow();
    if (shadow !== null) {
        return this.bounds.merge(shadow.bounds);
    }
    return this.bounds;
};

FrameMorph.prototype.fullImage = function () {
    // use only for shadows
    return this.image;
};

FrameMorph.prototype.fullDrawOn = function (aCanvas, aRect) {
    var rectangle, dirty;
    if (!this.isVisible) {
        return null;
    }
    rectangle = aRect || this.fullBounds();
    dirty = this.bounds.intersect(rectangle);
    if (!dirty.extent().gt(new Point(0, 0))) {
        return null;
    }
    this.drawOn(aCanvas, dirty);
    this.children.forEach(function (child) {
        if (child instanceof ShadowMorph) {
            child.fullDrawOn(aCanvas, rectangle);
        } else {
            child.fullDrawOn(aCanvas, dirty);
        }
    });
};

// FrameMorph navigation:

FrameMorph.prototype.topMorphAt = function (point) {
    var i, result;
    if (!(this.isVisible && this.bounds.containsPoint(point))) {
        return null;
    }
    for (i = this.children.length - 1; i >= 0; i -= 1) {
        result = this.children[i].topMorphAt(point);
        if (result) {return result; }
    }
    return this.noticesTransparentClick ||
        !this.isTransparentAt(point) ? this : null;
};

// FrameMorph scrolling support:

FrameMorph.prototype.submorphBounds = function () {
    var result = null;

    if (this.children.length > 0) {
        result = this.children[0].bounds;
        this.children.forEach(function (child) {
            result = result.merge(child.fullBounds());
        });
    }
    return result;
};

FrameMorph.prototype.keepInScrollFrame = function () {
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
};

FrameMorph.prototype.adjustBounds = function () {
    var subBounds,
        newBounds,
        myself = this;

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
        this.children.forEach(function (morph) {
            if (morph instanceof TextMorph) {
                morph.setWidth(myself.width());
                myself.setHeight(
                    Math.max(morph.height(), myself.scrollFrame.height())
                );
            }
        });
    }

    this.scrollFrame.adjustScrollBars();
};

// FrameMorph dragging & dropping of contents:

FrameMorph.prototype.reactToDropOf = function () {
    this.adjustBounds();
};

FrameMorph.prototype.reactToGrabOf = function () {
    this.adjustBounds();
};

// FrameMorph menus:

FrameMorph.prototype.developersMenu = function () {
    var menu = FrameMorph.uber.developersMenu.call(this);
    if (this.children.length > 0) {
        menu.addLine();
        menu.addItem(
            "move all inside...",
            'keepAllSubmorphsWithin',
            'keep all submorphs\nwithin and visible'
        );
    }
    return menu;
};

FrameMorph.prototype.keepAllSubmorphsWithin = function () {
    var myself = this;
    this.children.forEach(function (m) {
        m.keepWithin(myself);
    });
};

// ScrollFrameMorph ////////////////////////////////////////////////////

ScrollFrameMorph.prototype = new FrameMorph();
ScrollFrameMorph.prototype.constructor = ScrollFrameMorph;
ScrollFrameMorph.uber = FrameMorph.prototype;

function ScrollFrameMorph(scroller, size, sliderColor) {
    this.init(scroller, size, sliderColor);
}

ScrollFrameMorph.prototype.init = function (scroller, size, sliderColor) {
    var myself = this;

    ScrollFrameMorph.uber.init.call(this);
    this.scrollBarSize = size || MorphicPreferences.scrollBarSize;
    this.autoScrollTrigger = null;
    this.enableAutoScrolling = true; // change to suppress
    this.isScrollingByDragging = true; // change to suppress
    this.hasVelocity = true; // dto.
    this.padding = 0; // around the scrollable area
    this.growth = 0; // pixels or Point to grow right/left when near edge
    this.isTextLineWrapping = false;
    this.contents = scroller || new FrameMorph(this);
    this.add(this.contents);
    this.hBar = new SliderMorph(
        null, // start
        null, // stop
        null, // value
        null, // size
        'horizontal',
        sliderColor
    );
    this.hBar.setHeight(this.scrollBarSize);
    this.hBar.action = function (num) {
        myself.contents.setPosition(
            new Point(
                myself.left() - num,
                myself.contents.position().y
            )
        );
    };
    this.hBar.isDraggable = false;
    this.add(this.hBar);
    this.vBar = new SliderMorph(
        null, // start
        null, // stop
        null, // value
        null, // size
        'vertical',
        sliderColor
    );
    this.vBar.setWidth(this.scrollBarSize);
    this.vBar.action = function (num) {
        myself.contents.setPosition(
            new Point(
                myself.contents.position().x,
                myself.top() - num
            )
        );
    };
    this.vBar.isDraggable = false;
    this.add(this.vBar);
    this.toolBar = null; // optional slot
};

ScrollFrameMorph.prototype.adjustScrollBars = function () {
    var hWidth = this.width() - this.scrollBarSize,
        vHeight = this.height() - this.scrollBarSize;

    this.changed();
    if (this.contents.width() > this.width()) {
        this.hBar.show();
        if (this.hBar.width() !== hWidth) {
            this.hBar.setWidth(hWidth);
        }

        this.hBar.setPosition(
            new Point(
                this.left(),
                this.bottom() - this.hBar.height()
            )
        );
        this.hBar.start = 0;
        this.hBar.stop = this.contents.width() - this.width() + this.scrollBarSize;
        this.hBar.size =
            this.width() / this.contents.width() * this.hBar.stop;
        this.hBar.value = this.left() - this.contents.left();
        this.hBar.drawNew();
    } else {
        this.hBar.hide();
    }

    if (this.contents.height() > this.height()) {
        this.vBar.show();
        if (this.vBar.height() !== vHeight) {
            this.vBar.setHeight(vHeight);
        }

        this.vBar.setPosition(
            new Point(
                this.right() - this.vBar.width(),
                this.top()
            )
        );
        this.vBar.start = 0;
        this.vBar.stop = this.contents.height() - this.height() + this.scrollBarSize;
        this.vBar.size =
            this.height() / this.contents.height() * this.vBar.stop;
        this.vBar.value = this.top() - this.contents.top();
        this.vBar.drawNew();
    } else {
        this.vBar.hide();
    }
    this.adjustToolBar();
};

ScrollFrameMorph.prototype.adjustToolBar = function () {
    var padding = 3;
    if (this.toolBar) {
        this.toolBar.setTop(this.top() + padding);
        this.toolBar.setRight(
            (this.vBar.isVisible ? this.vBar.left() : this.right()) - padding
        );
    }
};

ScrollFrameMorph.prototype.addContents = function (aMorph) {
    this.contents.add(aMorph);
    this.contents.adjustBounds();
};

ScrollFrameMorph.prototype.setContents = function (aMorph) {
    this.contents.children.forEach(function (m) {
        m.destroy();
    });
    this.contents.children = [];
    aMorph.setPosition(this.position().add(this.padding + 2));
    this.addContents(aMorph);
};

ScrollFrameMorph.prototype.setExtent = function (aPoint) {
    if (this.isTextLineWrapping) {
        this.contents.setPosition(this.position().copy());
    }
    ScrollFrameMorph.uber.setExtent.call(this, aPoint);
    this.contents.adjustBounds();
};

// ScrollFrameMorph scrolling by dragging:

ScrollFrameMorph.prototype.scrollX = function (steps) {
    var cl = this.contents.left(),
        l = this.left(),
        cw = this.contents.width(),
        r = this.right(),
        newX;

    if (this.vBar.isVisible) {
        r -= this.scrollBarSize;
    }

    newX = cl + steps;
    if (newX + cw < r) {
        newX = r - cw;
    }
    if (newX > l) {
        newX = l;
    }
    if (newX !== cl) {
        this.contents.setLeft(newX);
    }
};

ScrollFrameMorph.prototype.scrollY = function (steps) {
    var ct = this.contents.top(),
        t = this.top(),
        ch = this.contents.height(),
        b = this.bottom(),
        newY;

    if (this.hBar.isVisible) {
        b -= this.scrollBarSize;
    }

    newY = ct + steps;
    if (newY + ch < b) {
        newY = b - ch;
    }
    if (newY > t) {
        newY = t;
    }
    if (newY !== ct) {
        this.contents.setTop(newY);
    }
};

ScrollFrameMorph.prototype.step = nop;

ScrollFrameMorph.prototype.mouseDownLeft = function (pos) {
    if (!this.isScrollingByDragging) {
        return null;
    }
    var world = this.root(),
        hand = world.hand,
        oldPos = pos,
        myself = this,
        deltaX = 0,
        deltaY = 0,
        friction = 0.8;

    this.step = function () {
        var newPos;
        if (hand.mouseButton &&
                (hand.children.length === 0) &&
                (myself.bounds.containsPoint(hand.bounds.origin))) {

            if (hand.grabPosition &&
                (hand.grabPosition.distanceTo(hand.position()) <=
                    MorphicPreferences.grabThreshold)) {
                // still within the grab threshold
                return null;
            }

            newPos = hand.bounds.origin;
            deltaX = newPos.x - oldPos.x;
            if (deltaX !== 0) {
                myself.scrollX(deltaX);
            }
            deltaY = newPos.y - oldPos.y;
            if (deltaY !== 0) {
                myself.scrollY(deltaY);
            }
            oldPos = newPos;
        } else {
            if (!myself.hasVelocity) {
                myself.step = function () {
                    nop();
                };
            } else {
                if ((Math.abs(deltaX) < 0.5) &&
                        (Math.abs(deltaY) < 0.5)) {
                    myself.step = function () {
                        nop();
                    };
                } else {
                    deltaX = deltaX * friction;
                    myself.scrollX(Math.round(deltaX));
                    deltaY = deltaY * friction;
                    myself.scrollY(Math.round(deltaY));
                }
            }
        }
        this.adjustScrollBars();
    };
};

ScrollFrameMorph.prototype.startAutoScrolling = function () {
    var myself = this,
        inset = MorphicPreferences.scrollBarSize * 3,
        world = this.world(),
        hand,
        inner,
        pos;

    if (!world) {
        return null;
    }
    hand = world.hand;
    if (!this.autoScrollTrigger) {
        this.autoScrollTrigger = Date.now();
    }
    this.step = function () {
        pos = hand.bounds.origin;
        inner = myself.bounds.insetBy(inset);
        if ((myself.bounds.containsPoint(pos)) &&
                (!(inner.containsPoint(pos))) &&
                (hand.children.length > 0)) {
            myself.autoScroll(pos);
        } else {
            myself.step = function () {
                nop();
            };
            myself.autoScrollTrigger = null;
        }
    };
};

ScrollFrameMorph.prototype.autoScroll = function (pos) {
    var inset, area;

    if (Date.now() - this.autoScrollTrigger < 500) {
        return null;
    }

    inset = MorphicPreferences.scrollBarSize * 3;
    area = this.topLeft().extent(new Point(this.width(), inset));
    if (area.containsPoint(pos)) {
        this.scrollY(inset - (pos.y - this.top()));
    }
    area = this.topLeft().extent(new Point(inset, this.height()));
    if (area.containsPoint(pos)) {
        this.scrollX(inset - (pos.x - this.left()));
    }
    area = (new Point(this.right() - inset, this.top()))
        .extent(new Point(inset, this.height()));
    if (area.containsPoint(pos)) {
        this.scrollX(-(inset - (this.right() - pos.x)));
    }
    area = (new Point(this.left(), this.bottom() - inset))
        .extent(new Point(this.width(), inset));
    if (area.containsPoint(pos)) {
        this.scrollY(-(inset - (this.bottom() - pos.y)));
    }
    this.adjustScrollBars();
};

// ScrollFrameMorph scrolling by editing text:

ScrollFrameMorph.prototype.scrollCursorIntoView = function (morph) {
    var txt = morph.target,
        offset = txt.position().subtract(this.contents.position()),
        ft = this.top() + this.padding,
        fb = this.bottom() - this.padding;
    this.contents.setExtent(txt.extent().add(offset).add(this.padding));
    if (morph.top() < ft) {
        this.contents.setTop(this.contents.top() + ft - morph.top());
        morph.setTop(ft);
    } else if (morph.bottom() > fb) {
        this.contents.setBottom(this.contents.bottom() + fb - morph.bottom());
        morph.setBottom(fb);
    }
    this.adjustScrollBars();
};

// ScrollFrameMorph events:

ScrollFrameMorph.prototype.mouseScroll = function (y, x) {
    if (y) {
        this.scrollY(y * MorphicPreferences.mouseScrollAmount);
    }
    if (x) {
        this.scrollX(x * MorphicPreferences.mouseScrollAmount);
    }
    this.adjustScrollBars();
};

// ScrollFrameMorph duplicating:

ScrollFrameMorph.prototype.updateReferences = function (map) {
    var myself = this;
    ScrollFrameMorph.uber.updateReferences.call(this, map);
    if (this.hBar) {
        this.hBar.action = function (num) {
            myself.contents.setPosition(
                new Point(myself.left() - num, myself.contents.position().y)
            );
        };
    }
    if (this.vBar) {
        this.vBar.action = function (num) {
            myself.contents.setPosition(
                new Point(myself.contents.position().x, myself.top() - num)
            );
        };
    }
};

// ScrollFrameMorph menu:

ScrollFrameMorph.prototype.developersMenu = function () {
    var menu = ScrollFrameMorph.uber.developersMenu.call(this);
    if (this.isTextLineWrapping) {
        menu.addItem(
            "auto line wrap off...",
            'toggleTextLineWrapping',
            'turn automatic\nline wrapping\noff'
        );
    } else {
        menu.addItem(
            "auto line wrap on...",
            'toggleTextLineWrapping',
            'enable automatic\nline wrapping'
        );
    }
    return menu;
};

ScrollFrameMorph.prototype.toggleTextLineWrapping = function () {
    this.isTextLineWrapping = !this.isTextLineWrapping;
};

// ListMorph ///////////////////////////////////////////////////////////

ListMorph.prototype = new ScrollFrameMorph();
ListMorph.prototype.constructor = ListMorph;
ListMorph.uber = ScrollFrameMorph.prototype;

function ListMorph(elements, labelGetter, format, doubleClickAction) {
/*
    passing a format is optional. If the format parameter is specified
    it has to be of the following pattern:

        [
            [<color>, <single-argument predicate>],
            ['bold', <single-argument predicate>],
            ['italic', <single-argument predicate>],
            ...
        ]

    multiple conditions can be passed in such a format list, the
    last predicate to evaluate true when given the list element sets
    the given format category (color, bold, italic).
    If no condition is met, the default format (color black, non-bold,
    non-italic) will be assigned.

    An example of how to use fomats can be found in the InspectorMorph's
    "markOwnProperties" mechanism.
*/
    this.init(
        elements || [],
        labelGetter || function (element) {
            if (isString(element)) {
                return element;
            }
            if (element.toSource) {
                return element.toSource();
            }
            return element.toString();
        },
        format || [],
        doubleClickAction // optional callback
    );
}

ListMorph.prototype.init = function (
    elements,
    labelGetter,
    format,
    doubleClickAction
) {
    ListMorph.uber.init.call(this);

    this.contents.acceptsDrops = false;
    this.color = new Color(255, 255, 255);
    this.hBar.alpha = 0.6;
    this.vBar.alpha = 0.6;
    this.elements = elements || [];
    this.labelGetter = labelGetter;
    this.format = format;
    this.listContents = null;
    this.selected = null; // actual element currently selected
    this.active = null; // menu item representing the selected element
    this.action = null;
    this.doubleClickAction = doubleClickAction || null;
    this.acceptsDrops = false;
    this.buildListContents();
};

ListMorph.prototype.buildListContents = function () {
    var myself = this;
    if (this.listContents) {
        this.listContents.destroy();
    }
    this.listContents = new MenuMorph(
        this.select,
        null,
        this
    );
    if (this.elements.length === 0) {
        this.elements = ['(empty)'];
    }
    this.elements.forEach(function (element) {
        var color = null,
            bold = false,
            italic = false;

        myself.format.forEach(function (pair) {
            if (pair[1].call(null, element)) {
                if (pair[0] === 'bold') {
                    bold = true;
                } else if (pair[0] === 'italic') {
                    italic = true;
                } else { // assume it's a color
                    color = pair[0];
                }
            }
        });
        myself.listContents.addItem(
            myself.labelGetter(element), // label string
            element, // action
            null, // hint
            color,
            bold,
            italic,
            myself.doubleClickAction
        );
    });
    this.listContents.isListContents = true;
    this.listContents.drawNew();
    this.listContents.setPosition(this.contents.position());
    this.addContents(this.listContents);
};

ListMorph.prototype.select = function (item, trigger) {
    if (isNil(item)) {return; }
    this.selected = item;
    this.active = trigger;
    if (this.action) {
        this.action.call(null, item);
    }
};

ListMorph.prototype.setExtent = function (aPoint) {
    var lb = this.listContents.bounds,
        nb = this.bounds.origin.copy().corner(
            this.bounds.origin.add(aPoint)
        );

    if (nb.right() > lb.right() && nb.width() <= lb.width()) {
        this.listContents.setRight(nb.right());
    }
    if (nb.bottom() > lb.bottom() && nb.height() <= lb.height()) {
        this.listContents.setBottom(nb.bottom());
    }
    ListMorph.uber.setExtent.call(this, aPoint);
};

ListMorph.prototype.activeIndex = function () {
    return this.listContents.children.indexOf(this.active);
};

ListMorph.prototype.activateIndex = function (idx) {
    var item = this.listContents.children[idx];
    if (!item) {return; }
    item.image = item.pressImage;
    item.changed();
    item.trigger();
};

// StringFieldMorph ////////////////////////////////////////////////////

// StringFieldMorph inherit from FrameMorph:

StringFieldMorph.prototype = new FrameMorph();
StringFieldMorph.prototype.constructor = StringFieldMorph;
StringFieldMorph.uber = FrameMorph.prototype;

function StringFieldMorph(
    defaultContents,
    minWidth,
    fontSize,
    fontStyle,
    bold,
    italic,
    isNumeric
) {
    this.init(
        defaultContents || '',
        minWidth || 100,
        fontSize || 12,
        fontStyle || 'sans-serif',
        bold || false,
        italic || false,
        isNumeric
    );
}

StringFieldMorph.prototype.init = function (
    defaultContents,
    minWidth,
    fontSize,
    fontStyle,
    bold,
    italic,
    isNumeric
) {
    this.defaultContents = defaultContents;
    this.minWidth = minWidth;
    this.fontSize = fontSize;
    this.fontStyle = fontStyle;
    this.isBold = bold;
    this.isItalic = italic;
    this.isNumeric = isNumeric || false;
    this.text = null;
    StringFieldMorph.uber.init.call(this);
    this.color = new Color(255, 255, 255);
    this.isEditable = true;
    this.acceptsDrops = false;
    this.drawNew();
};

StringFieldMorph.prototype.drawNew = function () {
    var txt;
    txt = this.text ? this.string() : this.defaultContents;
    this.text = null;
    this.children.forEach(function (child) {
        child.destroy();
    });
    this.children = [];
    this.text = new StringMorph(
        txt,
        this.fontSize,
        this.fontStyle,
        this.isBold,
        this.isItalic,
        this.isNumeric
    );

    this.text.isNumeric = this.isNumeric; // for whichever reason...
    this.text.setPosition(this.bounds.origin.copy());
    this.text.isEditable = this.isEditable;
    this.text.isDraggable = false;
    this.text.enableSelecting();
    this.silentSetExtent(
        new Point(
            Math.max(this.width(), this.minWidth),
            this.text.height()
        )
    );
    StringFieldMorph.uber.drawNew.call(this);
    this.add(this.text);
};

StringFieldMorph.prototype.string = function () {
    return this.text.text;
};

StringFieldMorph.prototype.mouseClickLeft = function (pos) {
    if (this.isEditable) {
        this.text.edit();
    } else {
        this.escalateEvent('mouseClickLeft', pos);
    }
};

// BouncerMorph ////////////////////////////////////////////////////////

// I am a Demo of a stepping custom Morph

var BouncerMorph;

// Bouncers inherit from Morph:

BouncerMorph.prototype = new Morph();
BouncerMorph.prototype.constructor = BouncerMorph;
BouncerMorph.uber = Morph.prototype;

// BouncerMorph instance creation:

function BouncerMorph() {
    this.init();
}

// BouncerMorph initialization:

BouncerMorph.prototype.init = function (type, speed) {
    BouncerMorph.uber.init.call(this);
    this.fps = 50;

    // additional properties:
    this.isStopped = false;
    this.type = type || 'vertical';
    if (this.type === 'vertical') {
        this.direction = 'down';
    } else {
        this.direction = 'right';
    }
    this.speed = speed || 1;
};

// BouncerMorph moving:

BouncerMorph.prototype.moveUp = function () {
    this.moveBy(new Point(0, -this.speed));
};

BouncerMorph.prototype.moveDown = function () {
    this.moveBy(new Point(0, this.speed));
};

BouncerMorph.prototype.moveRight = function () {
    this.moveBy(new Point(this.speed, 0));
};

BouncerMorph.prototype.moveLeft = function () {
    this.moveBy(new Point(-this.speed, 0));
};

// BouncerMorph stepping:

BouncerMorph.prototype.step = function () {
    if (!this.isStopped) {
        if (this.type === 'vertical') {
            if (this.direction === 'down') {
                this.moveDown();
            } else {
                this.moveUp();
            }
            if (this.fullBounds().top() < this.parent.top() &&
                    this.direction === 'up') {
                this.direction = 'down';
            }
            if (this.fullBounds().bottom() > this.parent.bottom() &&
                    this.direction === 'down') {
                this.direction = 'up';
            }
        } else if (this.type === 'horizontal') {
            if (this.direction === 'right') {
                this.moveRight();
            } else {
                this.moveLeft();
            }
            if (this.fullBounds().left() < this.parent.left() &&
                    this.direction === 'left') {
                this.direction = 'right';
            }
            if (this.fullBounds().right() > this.parent.right() &&
                    this.direction === 'right') {
                this.direction = 'left';
            }
        }
    }
};

// HandMorph ///////////////////////////////////////////////////////////

// I represent the Mouse cursor

// HandMorph inherits from Morph:

HandMorph.prototype = new Morph();
HandMorph.prototype.constructor = HandMorph;
HandMorph.uber = Morph.prototype;

// HandMorph instance creation:

function HandMorph(aWorld) {
    this.init(aWorld);
}

// HandMorph initialization:

HandMorph.prototype.init = function (aWorld) {
    HandMorph.uber.init.call(this, true);
    this.bounds = new Rectangle();

    // additional properties:
    this.world = aWorld;
    this.mouseButton = null;
    this.mouseOverList = [];
    this.morphToGrab = null;
    this.grabPosition = null;
    this.grabOrigin = null;
    this.temporaries = [];
    this.touchHoldTimeout = null;
    this.contextMenuEnabled = false;
};

HandMorph.prototype.changed = function () {
    var b;
    if (this.world !== null) {
        b = this.fullBounds();
        if (!b.extent().eq(new Point())) {
            this.world.broken.push(b.spread());
        }
    }
};

HandMorph.prototype.fullChanged = HandMorph.prototype.changed;

// HandMorph navigation:

HandMorph.prototype.morphAtPointer = function () {
    return this.world.topMorphAt(this.bounds.origin) || this.world;
};

HandMorph.prototype.allMorphsAtPointer = function () {
    var morphs = this.world.allChildren(),
        myself = this;
    return morphs.filter(function (m) {
        return m.isVisible &&
            m.visibleBounds().containsPoint(myself.bounds.origin);
    });
};

// HandMorph dragging and dropping:
/*
    drag 'n' drop events, method(arg) -> receiver:

        prepareToBeGrabbed(handMorph) -> grabTarget
        reactToGrabOf(grabbedMorph) -> oldParent
        wantsDropOf(morphToDrop) ->  newParent
        justDropped(handMorph) -> droppedMorph
        reactToDropOf(droppedMorph, handMorph) -> newParent
*/

HandMorph.prototype.dropTargetFor = function (aMorph) {
    var target = this.morphAtPointer();
    while (!target.wantsDropOf(aMorph)) {
        target = target.parent;
    }
    return target;
};

HandMorph.prototype.grab = function (aMorph) {
    var oldParent = aMorph.parent;
    if (aMorph instanceof WorldMorph) {
        return null;
    }
    if (this.children.length === 0) {
        this.world.stopEditing();
        this.grabOrigin = aMorph.situation();
        if (!(aMorph instanceof MenuMorph)) {
        	aMorph.addShadow();
        }
        if (aMorph.prepareToBeGrabbed) {
            aMorph.prepareToBeGrabbed(this);
        }
        aMorph.cachedFullImage = aMorph.fullImageClassic();
        aMorph.cachedFullBounds = aMorph.fullBounds();
        this.add(aMorph);
        this.changed();
        if (oldParent && oldParent.reactToGrabOf) {
            oldParent.reactToGrabOf(aMorph);
        }
    }
};

HandMorph.prototype.drop = function () {
    var target, morphToDrop;
    if (this.children.length !== 0) {
        morphToDrop = this.children[0];
        target = this.dropTargetFor(morphToDrop);
        target = target.selectForEdit ? target.selectForEdit() : target;
        this.changed();
        target.add(morphToDrop);
        morphToDrop.cachedFullImage = null;
        morphToDrop.cachedFullBounds = null;
        morphToDrop.changed();
        if (!(morphToDrop instanceof MenuMorph)) {
	        morphToDrop.removeShadow();
        }
        this.children = [];
        this.setExtent(new Point());
        if (morphToDrop.justDropped) {
            morphToDrop.justDropped(this);
        }
        if (target.reactToDropOf) {
            target.reactToDropOf(morphToDrop, this);
        }
    }
};

// HandMorph event dispatching:
/*
    mouse events:

        mouseDownLeft
        mouseDownRight
        mouseClickLeft
        mouseClickRight
        mouseDoubleClick
        mouseEnter
        mouseLeave
        mouseEnterDragging
        mouseLeaveDragging
        mouseMove
        mouseScroll
*/

HandMorph.prototype.processMouseDown = function (event) {
    var morph, actualClick;

    this.destroyTemporaries();
    this.contextMenuEnabled = true;
    this.morphToGrab = null;
    this.grabPosition = null;
    if (this.children.length !== 0) {
        this.drop();
        this.mouseButton = null;
    } else {
        morph = this.morphAtPointer();
        if (this.world.activeMenu) {
            if (!contains(
                    morph.allParents(),
                    this.world.activeMenu
                )) {
                this.world.activeMenu.destroy();
            } else {
                clearInterval(this.touchHoldTimeout);
            }
        }
        if (this.world.activeHandle) {
            if (morph !== this.world.activeHandle) {
                this.world.activeHandle.destroy();
            }
        }
        if (this.world.cursor) {
            if (morph !== this.world.cursor.target) {
                this.world.stopEditing();
            }
        }
        if (!morph.mouseMove) {
            this.morphToGrab = morph.rootForGrab();
            this.grabPosition = this.bounds.origin.copy();
        }
        if (event.button === 2 || event.ctrlKey) {
            this.mouseButton = 'right';
            actualClick = 'mouseDownRight';
        } else {
            this.mouseButton = 'left';
            actualClick = 'mouseDownLeft';
        }
        while (!morph[actualClick]) {
            morph = morph.parent;
        }
        morph[actualClick](this.bounds.origin);
    }
};

HandMorph.prototype.processTouchStart = function (event) {
    var myself = this;
    MorphicPreferences.isTouchDevice = true;
    clearInterval(this.touchHoldTimeout);
    if (event.touches.length === 1) {
        this.touchHoldTimeout = setInterval( // simulate mouseRightClick
            function () {
                myself.processMouseDown({button: 2});
                myself.processMouseUp({button: 2});
                event.preventDefault();
                clearInterval(myself.touchHoldTimeout);
            },
            400
        );
        this.processMouseMove(event.touches[0]); // update my position
        this.processMouseDown({button: 0});
        event.preventDefault();
    }
};

HandMorph.prototype.processTouchMove = function (event) {
    MorphicPreferences.isTouchDevice = true;
    if (event.touches.length === 1) {
        var touch = event.touches[0];
        this.processMouseMove(touch);
        clearInterval(this.touchHoldTimeout);
    }
};

HandMorph.prototype.processTouchEnd = function (event) {
    MorphicPreferences.isTouchDevice = true;
    clearInterval(this.touchHoldTimeout);
    nop(event);
    this.processMouseUp({button: 0});
};

HandMorph.prototype.processMouseUp = function () {
    var morph = this.morphAtPointer(),
        context,
        contextMenu,
        expectedClick;

    this.destroyTemporaries();
    if (this.children.length !== 0) {
        this.drop();
    } else {
        if (this.mouseButton === 'left') {
            expectedClick = 'mouseClickLeft';
        } else {
            expectedClick = 'mouseClickRight';
            if (this.mouseButton && this.contextMenuEnabled) {
                context = morph;
                contextMenu = context.contextMenu();
                while ((!contextMenu) &&
                        context.parent) {
                    context = context.parent;
                    contextMenu = context.contextMenu();
                }
                if (contextMenu) {
                    contextMenu.popUpAtHand(this.world);
                }
            }
        }
        while (!morph[expectedClick]) {
            morph = morph.parent;
        }
        morph[expectedClick](this.bounds.origin);
    }
    this.mouseButton = null;
};

HandMorph.prototype.processDoubleClick = function () {
    var morph = this.morphAtPointer();

    this.destroyTemporaries();
    if (this.children.length !== 0) {
        this.drop();
    } else {
        while (morph && !morph.mouseDoubleClick) {
            morph = morph.parent;
        }
        if (morph) {
            morph.mouseDoubleClick(this.bounds.origin);
        }
    }
    this.mouseButton = null;
};

HandMorph.prototype.processMouseMove = function (event) {
    var pos,
        posInDocument = getDocumentPositionOf(this.world.worldCanvas),
        mouseOverNew,
        myself = this,
        morph,
        topMorph;

    pos = new Point(
        event.pageX - posInDocument.x,
        event.pageY - posInDocument.y
    );

    this.setPosition(pos);

    // determine the new mouse-over-list:
    // mouseOverNew = this.allMorphsAtPointer();
    mouseOverNew = this.morphAtPointer().allParents();

    if (!this.children.length && this.mouseButton) {
        topMorph = this.morphAtPointer();
        morph = topMorph.rootForGrab();
        if (topMorph.mouseMove) {
            topMorph.mouseMove(pos, this.mouseButton);
            if (this.mouseButton === 'right') {
                this.contextMenuEnabled = false;
            }
        }

        // if a morph is marked for grabbing, just grab it
        if (this.mouseButton === 'left' &&
                this.morphToGrab &&
                (this.grabPosition.distanceTo(this.bounds.origin) >
                    MorphicPreferences.grabThreshold)) {
            this.setPosition(this.grabPosition);
            if (this.morphToGrab.isDraggable) {
                morph = this.morphToGrab.selectForEdit ?
                        this.morphToGrab.selectForEdit() : this.morphToGrab;
                this.grab(morph);
            } else if (this.morphToGrab.isTemplate) {
                this.world.stopEditing();
                morph = this.morphToGrab.fullCopy();
                morph.isTemplate = false;
                morph.isDraggable = true;
                if (morph.reactToTemplateCopy) {
                    morph.reactToTemplateCopy();
                }
                this.grab(morph);
                this.grabOrigin = this.morphToGrab.situation();
            }
            this.setPosition(pos);
        }
    }

    this.mouseOverList.forEach(function (old) {
        if (!contains(mouseOverNew, old)) {
            if (old.mouseLeave) {
                old.mouseLeave();
            }
            if (old.mouseLeaveDragging && myself.mouseButton) {
                old.mouseLeaveDragging();
            }
        }
    });
    mouseOverNew.forEach(function (newMorph) {
        if (!contains(myself.mouseOverList, newMorph)) {
            if (newMorph.mouseEnter) {
                newMorph.mouseEnter();
            }
            if (newMorph.mouseEnterDragging && myself.mouseButton) {
                newMorph.mouseEnterDragging();
            }
        }

        // autoScrolling support:
        if (myself.children.length > 0) {
            if (newMorph instanceof ScrollFrameMorph &&
                    newMorph.enableAutoScrolling &&
                    newMorph.contents.allChildren().some(function (any) {
                        return any.wantsDropOf(myself.children[0]);
                    })
            ) {
                if (!newMorph.bounds.insetBy(
                        MorphicPreferences.scrollBarSize * 3
                    ).containsPoint(myself.bounds.origin)) {
                    newMorph.startAutoScrolling();
                }
            }
        }
    });
    this.mouseOverList = mouseOverNew;
};

HandMorph.prototype.processMouseScroll = function (event) {
    var morph = this.morphAtPointer();
    while (morph && !morph.mouseScroll) {
        morph = morph.parent;
    }
    if (morph) {
        morph.mouseScroll(
            (event.detail / -3) || (
                Object.prototype.hasOwnProperty.call(
                    event,
                    'wheelDeltaY'
                ) ?
                        event.wheelDeltaY / 120 :
                        event.wheelDelta / 120
            ),
            event.wheelDeltaX / 120 || 0
        );
    }
};

/*
    drop event:

        droppedImage
        droppedSVG
        droppedAudio
        droppedText
*/

HandMorph.prototype.processDrop = function (event) {
/*
    find out whether an external image or audio file was dropped
    onto the world canvas, turn it into an offscreen canvas or audio
    element and dispatch the

        droppedImage(canvas, name)
        droppedSVG(image, name)
        droppedAudio(audio, name)
        droppedText(text, name, type)

    events to interested Morphs at the mouse pointer
*/
    var files = event instanceof FileList ? event
                : event.target.files || event.dataTransfer.files,
        file,
        url = event.dataTransfer ?
                event.dataTransfer.getData('URL') : null,
        txt = event.dataTransfer ?
                event.dataTransfer.getData('Text/HTML') : null,
        suffix,
        src,
        target = this.morphAtPointer(),
        img = new Image(),
        canvas,
        i;

    function readSVG(aFile) {
        var pic = new Image(),
            frd = new FileReader();
        while (!target.droppedSVG) {
            target = target.parent;
        }
        pic.onload = function () {
            target.droppedSVG(pic, aFile.name);
        };
        frd = new FileReader();
        frd.onloadend = function (e) {
            pic.src = e.target.result;
        };
        frd.readAsDataURL(aFile);
    }

    function readImage(aFile) {
        var pic = new Image(),
            frd = new FileReader();
        while (!target.droppedImage) {
            target = target.parent;
        }
        pic.onload = function () {
            canvas = newCanvas(new Point(pic.width, pic.height), true);
            canvas.getContext('2d').drawImage(pic, 0, 0);
            target.droppedImage(canvas, aFile.name);
        };
        frd = new FileReader();
        frd.onloadend = function (e) {
            pic.src = e.target.result;
        };
        frd.readAsDataURL(aFile);
    }

    function readAudio(aFile) {
        var snd = new Audio(),
            frd = new FileReader();
        while (!target.droppedAudio) {
            target = target.parent;
        }
        frd.onloadend = function (e) {
            snd.src = e.target.result;
            target.droppedAudio(snd, aFile.name);
        };
        frd.readAsDataURL(aFile);
    }

    function readText(aFile) {
        var frd = new FileReader();
        while (!target.droppedText) {
            target = target.parent;
        }
        frd.onloadend = function (e) {
            target.droppedText(e.target.result, aFile.name, aFile.type);
        };
        frd.readAsText(aFile);
    }

    function readBinary(aFile) {
        var frd = new FileReader();
        while (!target.droppedBinary) {
            target = target.parent;
        }
        frd.onloadend = function (e) {
            target.droppedBinary(e.target.result, aFile.name);
        };
        frd.readAsArrayBuffer(aFile);
    }

    function readURL(url, callback) {
        var request = new XMLHttpRequest();
        request.open('GET', url);
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.responseText) {
                    callback(request.responseText);
                } else {
                    throw new Error('unable to retrieve ' + url);
                }
            }
        };
        request.send();
    }

    function parseImgURL(html) {
        var iurl = '',
            idx,
            c,
            start = html.indexOf('<img src="');
        if (start === -1) {return null; }
        start += 10;
        for (idx = start; idx < html.length; idx += 1) {
            c = html[idx];
            if (c === '"') {
                return iurl;
            }
            iurl = iurl.concat(c);
        }
        return null;
    }

    if (files.length > 0) {
        for (i = 0; i < files.length; i += 1) {
            file = files[i];
            suffix = file.name.slice(
                file.name.lastIndexOf('.') + 1
            ).toLowerCase();
            if (file.type.indexOf("svg") !== -1
                    && !MorphicPreferences.rasterizeSVGs) {
                readSVG(file);
            } else if (file.type.indexOf("image") === 0) {
                readImage(file);
            } else if (file.type.indexOf("audio") === 0 ||
                    file.type.indexOf("ogg") > -1) {
                    // check the file-extension because Firefox
                    // thinks OGGs are videos
                readAudio(file);
            } else if ((file.type.indexOf("text") === 0) ||
                    contains(['txt', 'csv', 'json'], suffix)) {
                    // check the file-extension because Windows
                    // doesn't specify CSVs to be text/csv, sigh
                readText(file);
            } else { // assume it's meant to be binary
                readBinary(file);
            }
        }
    } else if (url) {
        suffix = url.slice(url.lastIndexOf('.') + 1).toLowerCase();
        if (
            contains(
                ['gif', 'png', 'jpg', 'jpeg', 'bmp'],
                suffix
            )
        ) {
            while (!target.droppedImage) {
                target = target.parent;
            }
            img = new Image();
            img.onload = function () {
                canvas = newCanvas(new Point(img.width, img.height), true);
                canvas.getContext('2d').drawImage(img, 0, 0);
                target.droppedImage(canvas);
            };
            img.src = url;
        } else if (suffix === 'svg' && !MorphicPreferences.rasterizeSVGs) {
            while (!target.droppedSVG) {
                target = target.parent;
            }
            readURL(
                url,
                function (txt) {
                    var pic = new Image();
                    pic.onload = function () {
                        target.droppedSVG(
                            pic,
                            url.slice(
                                url.lastIndexOf('/') + 1,
                                url.lastIndexOf('.')
                            )
                        );
                    };
                    pic.src = 'data:image/svg+xml;utf8,' +
                        encodeURIComponent(txt);
                }
            );
        }
    } else if (txt) {
        while (!target.droppedImage) {
            target = target.parent;
        }
        img = new Image();
        img.onload = function () {
            canvas = newCanvas(new Point(img.width, img.height), true);
            canvas.getContext('2d').drawImage(img, 0, 0);
            target.droppedImage(canvas);
        };
        src = parseImgURL(txt);
        if (src) {img.src = src; }
    }
};

// HandMorph tools

HandMorph.prototype.destroyTemporaries = function () {
/*
    temporaries are just an array of morphs which will be deleted upon
    the next mouse click, or whenever another temporary Morph decides
    that it needs to remove them. The primary purpose of temporaries is
    to display tools tips of speech bubble help.
*/
    var myself = this;
    this.temporaries.forEach(function (morph) {
        if (!(morph.isClickable
                && morph.bounds.containsPoint(myself.position()))) {
            morph.destroy();
            myself.temporaries.splice(myself.temporaries.indexOf(morph), 1);
        }
    });
};

// WorldMorph //////////////////////////////////////////////////////////

// I represent the <canvas> element

// WorldMorph inherits from FrameMorph:

WorldMorph.prototype = new FrameMorph();
WorldMorph.prototype.constructor = WorldMorph;
WorldMorph.uber = FrameMorph.prototype;

// WorldMorph instance creation:

function WorldMorph(aCanvas, fillPage) {
    this.init(aCanvas, fillPage);
}

// WorldMorph initialization:

WorldMorph.prototype.init = function (aCanvas, fillPage) {
    WorldMorph.uber.init.call(this);
    this.color = new Color(205, 205, 205); // (130, 130, 130)
    this.alpha = 1;
    this.bounds = new Rectangle(0, 0, aCanvas.width, aCanvas.height);
    this.drawNew();
    this.isVisible = true;
    this.isDraggable = false;
    this.currentKey = null; // currently pressed key code
    this.worldCanvas = aCanvas;
    this.noticesTransparentClick = true;

    // additional properties:
    this.stamp = Date.now(); // reference in multi-world setups
    while (this.stamp === Date.now()) {nop(); }
    this.stamp = Date.now();

    this.useFillPage = fillPage;
    if (this.useFillPage === undefined) {
        this.useFillPage = true;
    }
    this.isDevMode = false;
    this.broken = [];
    this.animations = [];
    this.hand = new HandMorph(this);
    this.keyboardReceiver = null;
    this.cursor = null;
    this.lastEditedText = null;
    this.activeMenu = null;
    this.activeHandle = null;
    this.virtualKeyboard = null;

    this.initEventListeners();
};

// World Morph display:

WorldMorph.prototype.brokenFor = function (aMorph) {
    // private
    var fb = aMorph.fullBounds();
    return this.broken.filter(function (rect) {
        return rect.intersects(fb);
    });
};

WorldMorph.prototype.fullDrawOn = function (aCanvas, aRect) {
    WorldMorph.uber.fullDrawOn.call(this, aCanvas, aRect);
    this.hand.fullDrawOn(aCanvas, aRect);
};

WorldMorph.prototype.updateBroken = function () {
    var myself = this;
    this.condenseDamages();
    this.broken.forEach(function (rect) {
        if (rect.extent().gt(new Point(0, 0))) {
            myself.fullDrawOn(myself.worldCanvas, rect);
        }
    });
    this.broken = [];
};

WorldMorph.prototype.stepAnimations = function () {
    this.animations.forEach(function (anim) {anim.step(); });
    this.animations = this.animations.filter(function (anim) {
        return anim.isActive;
    });
};

WorldMorph.prototype.condenseDamages = function () {
    // collapse clustered damaged rectangles into their unions,
    // thereby reducing the array of brokens to a manageable size

    function condense(src) {
        var trgt = [], hit;
        src.forEach(function (rect) {
            hit = detect(
                trgt,
                function (each) {return each.isNearTo(rect, 20); }
            );
            if (hit) {
                hit.mergeWith(rect);
            } else {
                trgt.push(rect);
            }
        });
        return trgt;
    }

    var again = true, size = this.broken.length;
    while (again) {
        this.broken = condense(this.broken);
        again = (this.broken.length < size);
        size = this.broken.length;
    }
};

WorldMorph.prototype.doOneCycle = function () {
    this.stepFrame();
    this.stepAnimations();
    this.updateBroken();
};

WorldMorph.prototype.fillPage = function () {
    var clientHeight = window.innerHeight,
        clientWidth = window.innerWidth,
        myself = this;

    this.worldCanvas.style.position = "absolute";
    this.worldCanvas.style.left = "0px";
    this.worldCanvas.style.right = "0px";
    this.worldCanvas.style.width = "100%";
    this.worldCanvas.style.height = "100%";

    if (document.documentElement.scrollTop) {
        // scrolled down b/c of viewport scaling
        clientHeight = document.documentElement.clientHeight;
    }
    if (document.documentElement.scrollLeft) {
        // scrolled left b/c of viewport scaling
        clientWidth = document.documentElement.clientWidth;
    }
    if (this.worldCanvas.width !== clientWidth) {
        this.worldCanvas.width = clientWidth;
        this.setWidth(clientWidth);
    }
    if (this.worldCanvas.height !== clientHeight) {
        this.worldCanvas.height = clientHeight;
        this.setHeight(clientHeight);
    }
    this.children.forEach(function (child) {
        if (child.reactToWorldResize) {
            child.reactToWorldResize(myself.bounds.copy());
        }
    });
};

// WorldMorph global pixel access:

WorldMorph.prototype.getGlobalPixelColor = function (point) {
    // answer the color at the given point.

/*
    // original method, now deprecated as of 4/4/2017 because Chrome
    // "taints" the on-screen canvas as soon as its image data is
    // requested, significantly slowing down subsequent blittings

    var dta = this.worldCanvas.getContext('2d').getImageData(
        point.x,
        point.y,
        1,
        1
    ).data;
    return new Color(dta[0], dta[1], dta[2]);
*/

    var clr = this.topMorphAt(point).getPixelColor(point);
    // IMPORTANT:
    // all callers of getGlobalPixelColor should make provisions for retina
    // display support, which gets null-pixels interlaced with non-null ones:
    // if (!clr.a) {/* ignore */ }
    return clr;
};

// WorldMorph events:

WorldMorph.prototype.initVirtualKeyboard = function () {
    var myself = this;

    if (this.virtualKeyboard) {
        document.body.removeChild(this.virtualKeyboard);
        this.virtualKeyboard = null;
    }
    if (!MorphicPreferences.isTouchDevice
            || !MorphicPreferences.useVirtualKeyboard) {
        return;
    }
    this.virtualKeyboard = document.createElement("input");
    this.virtualKeyboard.type = "text";
    this.virtualKeyboard.style.color = "transparent";
    this.virtualKeyboard.style.backgroundColor = "transparent";
    this.virtualKeyboard.style.border = "none";
    this.virtualKeyboard.style.outline = "none";
    this.virtualKeyboard.style.position = "absolute";
    this.virtualKeyboard.style.top = "0px";
    this.virtualKeyboard.style.left = "0px";
    this.virtualKeyboard.style.width = "0px";
    this.virtualKeyboard.style.height = "0px";
    this.virtualKeyboard.autocapitalize = "none"; // iOS specific
    document.body.appendChild(this.virtualKeyboard);

    this.virtualKeyboard.addEventListener(
        "keydown",
        function (event) {
            // remember the keyCode in the world's currentKey property
            myself.currentKey = event.keyCode;
            if (myself.keyboardReceiver) {
                myself.keyboardReceiver.processKeyDown(event);
            }
            // supress backspace override
            if (event.keyCode === 8) {
                event.preventDefault();
            }
            // supress tab override and make sure tab gets
            // received by all browsers
            if (event.keyCode === 9) {
                if (myself.keyboardReceiver) {
                    myself.keyboardReceiver.processKeyPress(event);
                }
                event.preventDefault();
            }
        },
        false
    );

    this.virtualKeyboard.addEventListener(
        "keyup",
        function (event) {
            // flush the world's currentKey property
            myself.currentKey = null;
            // dispatch to keyboard receiver
            if (myself.keyboardReceiver) {
                if (myself.keyboardReceiver.processKeyUp) {
                    myself.keyboardReceiver.processKeyUp(event);
                }
            }
            event.preventDefault();
        },
        false
    );

    this.virtualKeyboard.addEventListener(
        "keypress",
        function (event) {
            if (myself.keyboardReceiver) {
                myself.keyboardReceiver.processKeyPress(event);
            }
            event.preventDefault();
        },
        false
    );
};

WorldMorph.prototype.initEventListeners = function () {
    var canvas = this.worldCanvas, myself = this;

    if (myself.useFillPage) {
        myself.fillPage();
    } else {
        this.changed();
    }

    canvas.addEventListener(
        "mousedown",
        function (event) {
            event.preventDefault();
            canvas.focus();
            myself.hand.processMouseDown(event);
        },
        false
    );

    canvas.addEventListener(
        "touchstart",
        function (event) {
            myself.hand.processTouchStart(event);
        },
        false
    );

    canvas.addEventListener(
        "mouseup",
        function (event) {
            event.preventDefault();
            myself.hand.processMouseUp(event);
        },
        false
    );

    canvas.addEventListener(
        "dblclick",
        function (event) {
            event.preventDefault();
            myself.hand.processDoubleClick(event);
        },
        false
    );

    canvas.addEventListener(
        "touchend",
        function (event) {
            myself.hand.processTouchEnd(event);
        },
        false
    );

    canvas.addEventListener(
        "mousemove",
        function (event) {
            myself.hand.processMouseMove(event);
        },
        false
    );

    canvas.addEventListener(
        "touchmove",
        function (event) {
            myself.hand.processTouchMove(event);
        },
        false
    );

    canvas.addEventListener(
        "contextmenu",
        function (event) {
            // suppress context menu for Mac-Firefox
            event.preventDefault();
        },
        false
    );

    canvas.addEventListener(
        "keydown",
        function (event) {
            // remember the keyCode in the world's currentKey property
            myself.currentKey = event.keyCode;
            if (myself.keyboardReceiver) {
                myself.keyboardReceiver.processKeyDown(event);
            }
            // supress backspace override
            if (event.keyCode === 8) {
                event.preventDefault();
            }
            // supress tab override and make sure tab gets
            // received by all browsers
            if (event.keyCode === 9) {
                if (myself.keyboardReceiver) {
                    myself.keyboardReceiver.processKeyPress(event);
                }
                event.preventDefault();
            }
            if ((event.ctrlKey && (!event.altKey) || event.metaKey) &&
                    (event.keyCode !== 86)) { // allow pasting-in
                event.preventDefault();
            }
        },
        false
    );

    canvas.addEventListener(
        "keyup",
        function (event) {
            // flush the world's currentKey property
            myself.currentKey = null;
            // dispatch to keyboard receiver
            if (myself.keyboardReceiver) {
                if (myself.keyboardReceiver.processKeyUp) {
                    myself.keyboardReceiver.processKeyUp(event);
                }
            }
            event.preventDefault();
        },
        false
    );

    canvas.addEventListener(
        "keypress",
        function (event) {
            if (myself.keyboardReceiver) {
                myself.keyboardReceiver.processKeyPress(event);
            }
            event.preventDefault();
        },
        false
    );

    canvas.addEventListener( // Safari, Chrome
        "mousewheel",
        function (event) {
            myself.hand.processMouseScroll(event);
            event.preventDefault();
        },
        false
    );
    canvas.addEventListener( // Firefox
        "DOMMouseScroll",
        function (event) {
            myself.hand.processMouseScroll(event);
            event.preventDefault();
        },
        false
    );

    document.body.addEventListener(
        "paste",
        function (event) {
            var txt = event.clipboardData.getData("Text");
            if (txt && myself.cursor) {
                myself.cursor.insert(txt);
            }
        },
        false
    );

    window.addEventListener(
        "dragover",
        function (event) {
            event.preventDefault();
        },
        false
    );
    window.addEventListener(
        "drop",
        function (event) {
            myself.hand.processDrop(event);
            event.preventDefault();
        },
        false
    );

    window.addEventListener(
        "resize",
        function () {
            if (myself.useFillPage) {
                myself.fillPage();
            }
        },
        false
    );

    window.onbeforeunload = function (evt) {
        var e = evt || window.event,
            msg = "Are you sure you want to leave?";
        // For IE and Firefox
        if (e) {
            e.returnValue = msg;
        }
        // For Safari / chrome
        return msg;
    };
};

WorldMorph.prototype.mouseDownLeft = nop;

WorldMorph.prototype.mouseClickLeft = nop;

WorldMorph.prototype.mouseDownRight = nop;

WorldMorph.prototype.mouseClickRight = nop;

WorldMorph.prototype.wantsDropOf = function () {
    // allow handle drops if any drops are allowed
    return this.acceptsDrops;
};

WorldMorph.prototype.droppedImage = function () {
    return null;
};

WorldMorph.prototype.droppedSVG = function () {
    return null;
};

// WorldMorph text field tabbing:

WorldMorph.prototype.nextTab = function (editField) {
    var next = this.nextEntryField(editField);
    if (next) {
        editField.clearSelection();
        next.selectAll();
        next.edit();
    }
};

WorldMorph.prototype.previousTab = function (editField) {
    var prev = this.previousEntryField(editField);
    if (prev) {
        editField.clearSelection();
        prev.selectAll();
        prev.edit();
    }
};

// WorldMorph menu:

WorldMorph.prototype.contextMenu = function () {
    var menu;

    if (this.isDevMode) {
        menu = new MenuMorph(this, this.constructor.name ||
            this.constructor.toString().split(' ')[1].split('(')[0]);
    } else {
        menu = new MenuMorph(this, 'Morphic');
    }
    if (this.isDevMode) {
        menu.addItem("demo...", 'userCreateMorph', 'sample morphs');
        menu.addLine();
        menu.addItem("hide all...", 'hideAll');
        menu.addItem("show all...", 'showAllHiddens');
        menu.addItem(
            "move all inside...",
            'keepAllSubmorphsWithin',
            'keep all submorphs\nwithin and visible'
        );
        menu.addItem(
            "inspect...",
            'inspect',
            'open a window on\nall properties'
        );
        menu.addItem(
            "screenshot...",
            function () {
                window.open(this.fullImageClassic().toDataURL());
            },
            'open a new window\nwith a picture of this morph'
        );
        menu.addLine();
        menu.addItem(
            "restore display",
            'changed',
            'redraw the\nscreen once'
        );
        menu.addItem(
            "fill page...",
            'fillPage',
            'let the World automatically\nadjust to browser resizing'
        );
        if (useBlurredShadows) {
            menu.addItem(
                "sharp shadows...",
                'toggleBlurredShadows',
                'sharp drop shadows\nuse for old browsers'
            );
        } else {
            menu.addItem(
                "blurred shadows...",
                'toggleBlurredShadows',
                'blurry shades,\n use for new browsers'
            );
        }
        menu.addItem(
            "color...",
            function () {
                this.pickColor(
                    menu.title + localize('\ncolor:'),
                    this.setColor,
                    this,
                    this.color
                );
            },
            'choose the World\'s\nbackground color'
        );
        if (MorphicPreferences === standardSettings) {
            menu.addItem(
                "touch screen settings",
                'togglePreferences',
                'bigger menu fonts\nand sliders'
            );
        } else {
            menu.addItem(
                "standard settings",
                'togglePreferences',
                'smaller menu fonts\nand sliders'
            );
        }
        menu.addLine();
    }
    if (this.isDevMode) {
        menu.addItem(
            "user mode...",
            'toggleDevMode',
            'disable developers\'\ncontext menus'
        );
    } else {
        menu.addItem("development mode...", 'toggleDevMode');
    }
    menu.addItem("about morphic.js...", 'about');
    return menu;
};

WorldMorph.prototype.userCreateMorph = function () {
    var myself = this, menu, newMorph;

    function create(aMorph) {
        aMorph.isDraggable = true;
        aMorph.pickUp(myself);
    }

    menu = new MenuMorph(this, 'make a morph');
    menu.addItem('rectangle', function () {
        create(new Morph());
    });
    menu.addItem('box', function () {
        create(new BoxMorph());
    });
    menu.addItem('circle box', function () {
        create(new CircleBoxMorph());
    });
    menu.addLine();
    menu.addItem('slider', function () {
        create(new SliderMorph());
    });
    menu.addItem('dial', function () {
    	newMorph = new DialMorph();
     	newMorph.pickUp(this);
    });
    menu.addItem('frame', function () {
        newMorph = new FrameMorph();
        newMorph.setExtent(new Point(350, 250));
        create(newMorph);
    });
    menu.addItem('scroll frame', function () {
        newMorph = new ScrollFrameMorph();
        newMorph.contents.acceptsDrops = true;
        newMorph.contents.adjustBounds();
        newMorph.setExtent(new Point(350, 250));
        create(newMorph);
    });
    menu.addItem('handle', function () {
        create(new HandleMorph());
    });
    menu.addLine();
    menu.addItem('string', function () {
        newMorph = new StringMorph('Hello, World!');
        newMorph.isEditable = true;
        create(newMorph);
    });
    menu.addItem('text', function () {
        newMorph = new TextMorph(
            "Ich wei\u00DF nicht, was soll es bedeuten, dass ich so " +
                "traurig bin, ein M\u00E4rchen aus uralten Zeiten, das " +
                "kommt mir nicht aus dem Sinn. Die Luft ist k\u00FChl " +
                "und es dunkelt, und ruhig flie\u00DFt der Rhein; der " +
                "Gipfel des Berges funkelt im Abendsonnenschein. " +
                "Die sch\u00F6nste Jungfrau sitzet dort oben wunderbar, " +
                "ihr gold'nes Geschmeide blitzet, sie k\u00E4mmt ihr " +
                "goldenes Haar, sie k\u00E4mmt es mit goldenem Kamme, " +
                "und singt ein Lied dabei; das hat eine wundersame, " +
                "gewalt'ge Melodei. Den Schiffer im kleinen " +
                "Schiffe, ergreift es mit wildem Weh; er schaut " +
                "nicht die Felsenriffe, er schaut nur hinauf in " +
                "die H\u00F6h'. Ich glaube, die Wellen verschlingen " +
                "am Ende Schiffer und Kahn, und das hat mit ihrem " +
                "Singen, die Loreley getan."
        );
        newMorph.isEditable = true;
        newMorph.maxWidth = 300;
        newMorph.drawNew();
        create(newMorph);
    });
    menu.addItem('speech bubble', function () {
        newMorph = new SpeechBubbleMorph('Hello, World!');
        create(newMorph);
    });
    menu.addLine();
    menu.addItem('gray scale palette', function () {
        create(new GrayPaletteMorph());
    });
    menu.addItem('color palette', function () {
        create(new ColorPaletteMorph());
    });
    menu.addItem('color picker', function () {
        create(new ColorPickerMorph());
    });
    menu.addLine();
    menu.addItem('sensor demo', function () {
        newMorph = new MouseSensorMorph();
        newMorph.setColor(new Color(230, 200, 100));
        newMorph.edge = 35;
        newMorph.border = 15;
        newMorph.borderColor = new Color(200, 100, 50);
        newMorph.alpha = 0.2;
        newMorph.setExtent(new Point(100, 100));
        create(newMorph);
    });
    menu.addItem('animation demo', function () {
        var foo, bar, baz, garply, fred;

        foo = new BouncerMorph();
        foo.setPosition(new Point(50, 20));
        foo.setExtent(new Point(300, 200));
        foo.alpha = 0.9;
        foo.speed = 3;

        bar = new BouncerMorph();
        bar.setColor(new Color(50, 50, 50));
        bar.setPosition(new Point(80, 80));
        bar.setExtent(new Point(80, 250));
        bar.type = 'horizontal';
        bar.direction = 'right';
        bar.alpha = 0.9;
        bar.speed = 5;

        baz = new BouncerMorph();
        baz.setColor(new Color(20, 20, 20));
        baz.setPosition(new Point(90, 140));
        baz.setExtent(new Point(40, 30));
        baz.type = 'horizontal';
        baz.direction = 'right';
        baz.speed = 3;

        garply = new BouncerMorph();
        garply.setColor(new Color(200, 20, 20));
        garply.setPosition(new Point(90, 140));
        garply.setExtent(new Point(20, 20));
        garply.type = 'vertical';
        garply.direction = 'up';
        garply.speed = 8;

        fred = new BouncerMorph();
        fred.setColor(new Color(20, 200, 20));
        fred.setPosition(new Point(120, 140));
        fred.setExtent(new Point(20, 20));
        fred.type = 'vertical';
        fred.direction = 'down';
        fred.speed = 4;

        bar.add(garply);
        bar.add(baz);
        foo.add(fred);
        foo.add(bar);

        create(foo);
    });
    menu.addItem('pen', function () {
        create(new PenMorph());
    });
    if (myself.customMorphs) {
        menu.addLine();
        myself.customMorphs().forEach(function (morph) {
            menu.addItem(morph.toString(), function () {
                create(morph);
            });
        });
    }
    menu.popUpAtHand(this);
};

WorldMorph.prototype.toggleDevMode = function () {
    this.isDevMode = !this.isDevMode;
};

WorldMorph.prototype.hideAll = function () {
    this.children.forEach(function (child) {
        child.hide();
    });
};

WorldMorph.prototype.showAllHiddens = function () {
    this.forAllChildren(function (child) {
        if (!child.isVisible) {
            child.show();
        }
    });
};

WorldMorph.prototype.about = function () {
    var versions = '', module;

    for (module in modules) {
        if (Object.prototype.hasOwnProperty.call(modules, module)) {
            versions += ('\n' + module + ' (' + modules[module] + ')');
        }
    }
    if (versions !== '') {
        versions = '\n\nmodules:\n\n' +
            'morphic (' + morphicVersion + ')' +
            versions;
    }

    this.inform(
        'morphic.js\n\n' +
            'a lively Web GUI\ninspired by Squeak\n' +
            morphicVersion +
            '\n\nwritten by Jens M\u00F6nig\njens@moenig.org' +
            versions
    );
};

WorldMorph.prototype.edit = function (aStringOrTextMorph) {
    if (this.lastEditedText === aStringOrTextMorph) {
        return;
    }
    if (!isNil(this.lastEditedText)) {
        this.stopEditing();
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

WorldMorph.prototype.slide = function (aStringOrTextMorph) {
    // display a slider for numeric text entries
    var val = parseFloat(aStringOrTextMorph.text),
        menu,
        slider;

    if (isNaN(val)) {
        val = 0;
    }
    menu = new MenuMorph();
    slider = new SliderMorph(
        val - 25,
        val + 25,
        val,
        10,
        'horizontal'
    );
    slider.alpha = 1;
    slider.color = new Color(225, 225, 225);
    slider.button.color = menu.borderColor;
    slider.button.highlightColor = slider.button.color.copy();
    slider.button.highlightColor.b += 100;
    slider.button.pressColor = slider.button.color.copy();
    slider.button.pressColor.b += 150;
    slider.silentSetHeight(MorphicPreferences.scrollBarSize);
    slider.silentSetWidth(MorphicPreferences.menuFontSize * 10);
    slider.drawNew();
    slider.action = function (num) {
        aStringOrTextMorph.changed();
        aStringOrTextMorph.text = Math.round(num).toString();
        aStringOrTextMorph.drawNew();
        aStringOrTextMorph.changed();
        aStringOrTextMorph.escalateEvent(
            'reactToSliderEdit',
            aStringOrTextMorph
        );
    };
    menu.items.push(slider);
    menu.popup(this, aStringOrTextMorph.bottomLeft().add(new Point(0, 5)));
};

WorldMorph.prototype.stopEditing = function () {
    if (this.cursor) {
        this.cursor.target.escalateEvent('reactToEdit', this.cursor.target);
        this.cursor.target.clearSelection();
        this.cursor.destroy();
        this.cursor = null;
    }
    if (this.keyboardReceiver && this.keyboardReceiver.stopEditing) {
    	this.keyboardReceiver.stopEditing();
    }
    this.keyboardReceiver = null;
    if (this.virtualKeyboard) {
        this.virtualKeyboard.blur();
        document.body.removeChild(this.virtualKeyboard);
        this.virtualKeyboard = null;
    }
    this.lastEditedText = null;
    this.worldCanvas.focus();
};

WorldMorph.prototype.toggleBlurredShadows = function () {
    useBlurredShadows = !useBlurredShadows;
};

WorldMorph.prototype.togglePreferences = function () {
    if (MorphicPreferences === standardSettings) {
        MorphicPreferences = touchScreenSettings;
    } else {
        MorphicPreferences = standardSettings;
    }
};
