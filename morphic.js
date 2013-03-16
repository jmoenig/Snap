/*

    morphic.js

    a lively Web-GUI
    inspired by Squeak

    written by Jens Mšnig
    jens@moenig.org

    Copyright (C) 2013 by Jens Mšnig

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
        (9) minifying morphic.js
    VIII. acknowledgements
    IX. contributors


    I. hierarchy
    -------------
    the following tree lists all constructors hierarchically,
    indentation indicating inheritance. Refer to this list to get a
    contextual overview:

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


    IV. open issues
    ----------------
    - blurry shadows don't work well in Chrome


    V. browser compatibility
    ------------------------
    I have taken great care and considerable effort to make morphic.js
    runnable and appearing exactly the same on all current browsers
    available to me:

    - Firefox for Windows
    - Firefox for Mac
    - Chrome for Windows (blurry shadows have some issues)
    - Chrome for Mac
    - Safari for Windows
    - safari for Mac
    - Safari for iOS (mobile)
    - IE for Windows
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
            <title>Morphic!</title>
            <script type="text/javascript" src="morphic.js"></script>
            <script type="text/javascript">
                var world;

                window.onload = function () {
                    world = new WorldMorph(
                        document.getElementById('world'));
                    setInterval(loop, 50);
                };

                function loop() {
                    world.doOneCycle();
                }
            </script>
        </head>
        <body>
            <canvas id="world" tabindex="1" width="800" height="600">
                <p>Your browser doesn't support canvas.</p>
            </canvas>
        </body>
    </html>

    if you use ScrollFrames or otherwise plan to support mouse wheel
    scrolling events, you might also add the following inline-CSS
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
            <title>Morphic!</title>
            <script type="text/javascript" src="morphic.js"></script>
            <script type="text/javascript">
                var world1, world2;

                window.onload = function () {
                    world1 = new WorldMorph(
                        document.getElementById('world1'), false);
                    world2 = new WorldMorph(
                        document.getElementById('world2'), false);
                    setInterval(loop, 50);
                };

                function loop() {
                    world1.doOneCycle();
                    world2.doOneCycle();
                }
            </script>
        </head>
        <body>
            <p>first world:</p>
            <canvas id="world1" tabindex="1" width="600" height="400">
                <p>Your browser doesn't support canvas.</p>
            </canvas>
            <p>second world:</p>
            <canvas id="world2" tabindex="2" width="400" height="600">
                <p>Your browser doesn't support canvas.</p>
            </canvas>
        </body>
    </html>


    (c) an application
    -------------------
    Of course, most of the time you don't want to just plain use the
    standard Morhic World "as is" out of the box, but write your own
    application (something like Scratch!) in it. For such an
    application you'll create your own morph prototypes, perhaps
    assemble your own "window frame" and bring it all to life in a
    customized World state. the following example creates a simple
    snake-like mouse drawing game.

    example html file:

    <!DOCTYPE html>
    <html>
        <head>
            <title>touch me!</title>
            <script type="text/javascript" src="morphic.js"></script>
            <script type="text/javascript">
                var worldCanvas, sensor;

                window.onload = function () {
                    var x, y, w, h;

                    worldCanvas = document.getElementById('world');
                    world = new WorldMorph(worldCanvas);
                    world.isDevMode = false;
                    world.color = new Color();

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
                    setInterval(loop, 50);
                };

                function loop() {
                    world.doOneCycle();
                }
            </script>
        </head>
        <body bgcolor='black'>
            <canvas id="world" width="800" height="600">
                <p>Your browser doesn't support canvas.</p>
            </canvas>
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

    * fullCopy()            - duplication
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
        mouseEnter
        mouseLeave
        mouseEnterDragging
        mouseLeaveDragging
        mouseMove
        mouseScroll

    If you wish your morph to react to any such event, simply add a
    method of the same name as the event, e.g:

        MyMorph.prototype.mouseMove = function(pos) {};

    The only optional parameter of such a method is a Point object
    indicating the current position of the Hand inside the World's
    coordinate system.

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

    Dragging is indicated by adding a drop shadow to the morph in hand.
    If a morph follows the hand without displaying a drop shadow it is
    merely being moved about without changing its parent (owner morph),
    e.g. when "dragging" a morph handle to resize its owner, or when
    "dragging" a slider button.

    Right before a morph is picked up its

        prepareToBeGrabbed(handMorph)

    method is invoked, if it is present. Immediately after the pick-up
    the former parent's

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
        droppedText(aString, name)

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
    is being edited, a
    
        reactToKeystroke(event)

    is escalated up its parent chain, the "event" parameter being the
    original one received by the World.
    
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

    If your new morph stores or references other morphs outside of the
    submorph tree in other properties, be sure to also override the
    default

        copyRecordingReferences()

    method accordingly if you want it to support duplication.


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
    bounds of the surrounding morph. An an example refer to the
    
        moveBy()
    
    method of HandMorph, and to the

        fixLayout()
        
    method of InspectorMorph, or the
    
        startLayout()
        endLayout()

    methods of SyntaxElementMorph in the Snap application.    
    

    (9) minifying morphic.js
    ------------------------
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
    editor for Windows and later switched to Apple's Dashcode. I've also
    come to depend on both Douglas Crockford's JSLint, Mozilla's Firebug
    and Google's Chrome to get it right.


    IX. contributors
    ----------------------
    Joe Otto found and fixed many early bugs and taught me some tricks.
    Nathan Dinsmore contributed mouse wheel scrolling, cached
    background texture handling and countless bug fixes.
    Ian Reynolds contributed backspace key handling for Chrome.
    Davide Della Casa contributed performance optimizations for Firefox.

    - Jens Mšnig
*/

// Global settings /////////////////////////////////////////////////////

/*global window, HTMLCanvasElement, getMinimumFontHeight, FileReader, Audio,
FileList, getBlurredShadowSupport*/

var morphicVersion = '2013-March-11';
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
    rasterizeSVGs: false
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
    rasterizeSVGs: false
};

var MorphicPreferences = standardSettings;

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
    return list.some(function (any) {
        return any === element;
    });
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
        if (object.hasOwnProperty(key)) {
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

function newCanvas(extentPoint) {
    // answer a new empty instance of Canvas, don't display anywhere
    var canvas, ext;
    ext = extentPoint || {x: 0, y: 0};
    canvas = document.createElement('canvas');
    canvas.width = ext.x;
    canvas.height = ext.y;
    return canvas;
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

function clone(target) {
    // answer a new instance of target's type
    if (typeof target === 'object') {
        var Clone = function () {};
        Clone.prototype = target;
        return new Clone();
    }
    return target;
}

function copy(target) {
    // answer a shallow copy of target
    var value, c, property;

    if (typeof target !== 'object') {
        return target;
    }
    value = target.valueOf();
    if (target !== value) {
        return new target.constructor(value);
    }
    if (target instanceof target.constructor &&
            target.constructor !== Object) {
        c = clone(target.constructor.prototype);
        for (property in target) {
            if (target.hasOwnProperty(property)) {
                c[property] = target[property];
            }
        }
    } else {
        c = {};
        for (property in target) {
            if (!c[property]) {
                c[property] = target[property];
            }
        }
    }
    return c;
}

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

Color.prototype.eq = function (aColor) {
    // ==
    return aColor &&
        this.r === aColor.r &&
        this.g === aColor.g &&
        this.b === aColor.b;
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

Rectangle.prototype.round = function () {
    return this.origin.round().corner(this.corner.round());
};

Rectangle.prototype.spread = function () {
    // round me by applying floor() to my origin and ceil() to my corner
    return this.origin.floor().corner(this.corner.ceil());
};

Rectangle.prototype.amountToTranslateWithin = function (aRect) {
/*
    Answer a Point, delta, such that self + delta is forced within
    aRectangle. when all of me cannot be made to fit, prefer to keep
    my topLeft inside. Taken from Squeak.
*/
    var dx, dy;

    if (this.right() > aRect.right()) {
        dx = aRect.right() - this.right();
    }
    if (this.bottom() > aRect.bottom()) {
        dy = aRect.bottom() - this.bottom();
    }
    if ((this.left() + dx) < aRect.left()) {
        dx = aRect.left() - this.right();
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

Node.prototype.parentThatIsA = function (constructor) {
    // including myself
    if (this instanceof constructor) {
        return this;
    }
    if (!this.parent) {
        return null;
    }
    return this.parent.parentThatIsA(constructor);
};

Node.prototype.parentThatIsAnyOf = function (constructors) {
    // including myself
    var yup = false,
        myself = this;
    constructors.forEach(function (each) {
        if (myself.constructor === each) {
            yup = true;
            return;
        }
    });
    if (yup) {
        return this;
    }
    if (!this.parent) {
        return null;
    }
    return this.parent.parentThatIsAnyOf(constructors);
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
    bounds of the surrounding morph. An an example refer to the

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

Morph.prototype.init = function () {
    Morph.uber.init.call(this);
    this.isMorph = true;
    this.bounds = new Rectangle(0, 0, 50, 40);
    this.color = new Color(80, 80, 80);
    this.texture = null; // optional url of a fill-image
    this.cachedTexture = null; // internal cache of actual bg image
    this.alpha = 1;
    this.isVisible = true;
    this.isDraggable = false;
    this.isTemplate = false;
    this.acceptsDrops = false;
    this.noticesTransparentClick = false;
    this.drawNew();
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

Morph.prototype.step = function () {
    nop();
};

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
    this.changed();
    this.bounds = this.bounds.translateBy(delta);
    this.children.forEach(function (child) {
        child.moveBy(delta);
    });
    this.changed();
};

Morph.prototype.silentMoveBy = function (delta) {
    this.bounds = this.bounds.translateBy(delta);
    this.children.forEach(function (child) {
        child.silentMoveBy(delta);
    });
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
    leftOff = this.fullBounds().left() - aMorph.left();
    if (leftOff < 0) {
        this.moveBy(new Point(-leftOff, 0));
    }
    rightOff = this.fullBounds().right() - aMorph.right();
    if (rightOff > 0) {
        this.moveBy(new Point(-rightOff, 0));
    }
    topOff = this.fullBounds().top() - aMorph.top();
    if (topOff < 0) {
        this.moveBy(new Point(0, -topOff));
    }
    bottomOff = this.fullBounds().bottom() - aMorph.bottom();
    if (bottomOff > 0) {
        this.moveBy(new Point(0, -bottomOff));
    }
};

// Morph accessing - dimensional changes requiring a complete redraw

Morph.prototype.setExtent = function (aPoint) {
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
    this.image = newCanvas(this.extent());
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
    var rectangle, area, delta, src, context, w, h, sl, st;
    if (!this.isVisible) {
        return null;
    }
    rectangle = aRect || this.bounds();
    area = rectangle.intersect(this.bounds).round();
    if (area.extent().gt(new Point(0, 0))) {
        delta = this.position().neg();
        src = area.copy().translateBy(delta).round();
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
            src.left(),
            src.top(),
            w,
            h,
            area.left(),
            area.top(),
            w,
            h
        );

    /* "for debugging purposes:"

        try {
            context.drawImage(
                this.image,
                src.left(),
                src.top(),
                w,
                h,
                area.left(),
                area.top(),
                w,
                h
            );
        } catch (err) {
            alert('internal error\n\n' + err
                + '\n ---'
                + '\n canvas: ' + aCanvas
                + '\n canvas.width: ' + aCanvas.width
                + '\n canvas.height: ' + aCanvas.height
                + '\n ---'
                + '\n image: ' + this.image
                + '\n image.width: ' + this.image.width
                + '\n image.height: ' + this.image.height
                + '\n ---'
                + '\n w: ' + w
                + '\n h: ' + h
                + '\n sl: ' + sl
                + '\n st: ' + st
                + '\n area.left: ' + area.left()
                + '\n area.top ' + area.top()
                );
        }
    */

    }
};

Morph.prototype.fullDrawOn = function (aCanvas, aRect) {
    var rectangle;
    if (!this.isVisible) {
        return null;
    }
    rectangle = aRect || this.fullBounds();
    this.drawOn(aCanvas, rectangle);
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
    // why doesn't this work for all Morphs?
    var fb = this.fullBounds(),
        img = newCanvas(fb.extent()),
        ctx = img.getContext('2d');
    ctx.translate(-this.bounds.origin.x, -this.bounds.origin.y);
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
            ctx.drawImage(
                morph.image,
                morph.bounds.origin.x - fb.origin.x,
                morph.bounds.origin.y - fb.origin.y
            );
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
    if (useBlurredShadows) {
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
            w.broken.push(this.fullBounds().spread());
        }
    }
};

Morph.prototype.childChanged = function () {
    // react to a  change in one of my children,
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

Morph.prototype.morphAt = function (aPoint) {
    var morphs = this.allChildren().slice(0).reverse(),
        result = null;
    morphs.forEach(function (m) {
        if (m.fullBounds().containsPoint(aPoint) &&
                (result === null)) {
            result = m;
        }
    });
    return result;
};

/*
    alternative -  more elegant and possibly more
    performant - solution for morphAt.
    Has some issues, commented out for now

Morph.prototype.morphAt = function (aPoint) {
    return this.topMorphSuchThat(function (m) {
        return m.fullBounds().containsPoint(aPoint);
    });
};
*/

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
        data.data[3]
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
    var dict = {}, c;
    c = this.copyRecordingReferences(dict);
    c.forAllChildren(function (m) {
        m.updateReferences(dict);
    });
    return c;
};

Morph.prototype.copyRecordingReferences = function (dict) {
    /*
    Recursively copy this entire composite morph, recording the
    correspondence between old and new morphs in the given dictionary.
    This dictionary will be used to update intra-composite references
    in the copy. See updateReferences().
    Note: This default implementation copies ONLY morphs in the
    submorph hierarchy. If a morph stores morphs in other properties
    that it wants to copy, then it should override this method to do so.
    The same goes for morphs that contain other complex data that
    should be copied when the morph is duplicated.
    */
    var c = this.copy();
    dict[this] = c;
    this.children.forEach(function (m) {
        c.add(m.copyRecordingReferences(dict));
    });
    return c;
};

Morph.prototype.updateReferences = function (dict) {
    /*
    Update intra-morph references within a composite morph that has
    been copied. For example, if a button refers to morph X in the
    orginal composite then the copy of that button in the new composite
    should refer to the copy of X in new composite, not the original X.
    */
    var property;
    for (property in this) {
        if (property.isMorph && dict[property]) {
            this[property] = dict[property];
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

Morph.prototype.slideBackTo = function (situation, inSteps) {
    var steps = inSteps || 5,
        pos = situation.origin.position().add(situation.position),
        xStep = -(this.left() - pos.x) / steps,
        yStep = -(this.top() - pos.y) / steps,
        stepCount = 0,
        oldStep = this.step,
        oldFps = this.fps,
        myself = this;

    this.fps = 0;
    this.step = function () {
        myself.fullChanged();
        myself.silentMoveBy(new Point(xStep, yStep));
        myself.fullChanged();
        stepCount += 1;
        if (stepCount === steps) {
            situation.origin.add(myself);
            if (situation.origin.reactToDropOf) {
                situation.origin.reactToDropOf(myself);
            }
            myself.step = oldStep;
            myself.fps = oldFps;
        }
    };
};

// Morph utilities:

Morph.prototype.nop = function () {
    nop();
};

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
            menu.addItem(each.toString().slice(0, 50), function () {
                each.developersMenu().popUpAtHand(world);
            });
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
        menu.addItem(
            'user features...',
            function () {
                userMenu.popUpAtHand(world);
            }
        );
        menu.addLine();
    }
    menu.addItem(
        "color...",
        function () {
            this.pickColor(
                menu.title + '\ncolor:',
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
                menu.title + '\nalpha\nvalue:',
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
        'disattach and put \ninto the hand'
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
    var oImg = this.overlappingImage(otherMorph),
        data = oImg.getContext('2d')
            .getImageData(1, 1, oImg.width, oImg.height)
            .data;
    return detect(
        data,
        function (each) {
            return each !== 0;
        }
    ) !== null;
};

Morph.prototype.overlappingImage = function (otherMorph) {
    var fb = this.fullBounds(),
        otherFb = otherMorph.fullBounds(),
        oRect = fb.intersect(otherFb),
        oImg = newCanvas(oRect.extent()),
        ctx = oImg.getContext('2d');
    if (oRect.width() < 1 || oRect.height() < 1) {
        return newCanvas(new Point(1, 1));
    }
    ctx.drawImage(
        this.fullImage(),
        oRect.origin.x - fb.origin.x,
        oRect.origin.y - fb.origin.y
    );
    ctx.globalCompositeOperation = 'source-in';
    ctx.drawImage(
        otherMorph.fullImage(),
        otherFb.origin.x - oRect.origin.x,
        otherFb.origin.y - oRect.origin.y
    );
    return oImg;
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
    this.type =  type || 'resize'; // can also be 'move'
    HandleMorph.uber.init.call(this);
    this.color = new Color(255, 255, 255);
    this.isDraggable = false;
    this.noticesTransparentClick = true;
    this.setExtent(new Point(size, size));
};

// HandleMorph drawing:

HandleMorph.prototype.drawNew = function () {
    this.normalImage = newCanvas(this.extent());
    this.highlightImage = newCanvas(this.extent());
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
    this.image = this.normalImage;
    if (this.target) {
        this.setPosition(
            this.target.bottomRight().subtract(
                this.extent().add(this.inset)
            )
        );
        this.target.add(this);
        this.target.changed();
    }
};

HandleMorph.prototype.drawOnCanvas = function (
    aCanvas,
    color,
    shadowColor
) {
    var context = aCanvas.getContext('2d'),
        p1,
        p11,
        p2,
        p22,
        i;

    context.lineWidth = 1;
    context.lineCap = 'round';

    context.strokeStyle = color.toString();

    if (this.type === 'move') {

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

    if (this.type === 'move') {

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
        offset = pos.subtract(this.bounds.origin),
        myself = this;

    if (!this.target) {
        return null;
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

// HandleMorph duplicating:

HandleMorph.prototype.copyRecordingReferences = function (dict) {
    // inherited, see comment in Morph
    var c = HandleMorph.uber.copyRecordingReferences.call(
        this,
        dict
    );
    if (c.target && dict[this.target]) {
        c.target = (dict[this.target]);
    }
    return c;
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

PenMorph.prototype.drawNew = function (facing) {
/*
    my orientation can be overridden with the "facing" parameter to
    implement Scratch-style rotation styles
    
*/
    var context, start, dest, left, right, len,
        direction = facing || this.heading;

    if (this.isWarped) {
        this.wantsRedraw = true;
        return;
    }
    this.image = newCanvas(this.extent());
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
    this.heading = parseFloat(degrees) % 360;
    this.drawNew();
    this.changed();
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
    this.image = newCanvas(this.extent());
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

// ColorPaletteMorph duplicating:

ColorPaletteMorph.prototype.copyRecordingReferences = function (dict) {
    // inherited, see comment in Morph
    var c = ColorPaletteMorph.uber.copyRecordingReferences.call(
        this,
        dict
    );
    if (c.target && dict[this.target]) {
        c.target = (dict[this.target]);
    }
    return c;
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
    this.image = newCanvas(this.extent());
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
        if (event.ctrlKey) {
            this.ctrl(event.keyCode);
        } else if (event.metaKey) {
            this.cmd(event.keyCode);
        } else {
            this.insert(
                String.fromCharCode(event.keyCode),
                event.shiftKey
            );
        }
    } else if (event.charCode) { // all other browsers
        if (event.ctrlKey) {
            this.ctrl(event.charCode);
        } else if (event.metaKey) {
            this.cmd(event.keyCode);
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
    var shift = event.shiftKey;
    this.keyDownEventUsed = false;
    if (event.ctrlKey) {
        this.ctrl(event.keyCode);
        // notify target's parent of key event
        this.target.escalateEvent('reactToKeystroke', event);
        return;
    }
    if (event.metaKey) {
        this.cmd(event.keyCode);
        // notify target's parent of key event
        this.target.escalateEvent('reactToKeystroke', event);
        return;
    }

    switch (event.keyCode) {
    case 37:
        this.goLeft(shift);
        this.keyDownEventUsed = true;
        break;
    case 39:
        this.goRight(shift);
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
        if (this.target instanceof StringMorph) {
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

CursorMorph.prototype.goLeft = function (shift) {
    this.updateSelection(shift);
    this.gotoSlot(this.slot - 1);
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
        if (!this.target.endMark && !this.target.startMark) {
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
    this.escalateEvent('accept', null);
};

CursorMorph.prototype.cancel = function () {
    var world = this.root();
    this.undo();
    if (world) {
        world.stopEditing();
    }
    this.escalateEvent('cancel', null);
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

CursorMorph.prototype.ctrl = function (aChar) {
    if ((aChar === 97) || (aChar === 65)) {
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
    } else if (aChar === 64) {
        this.insert('@');
    }

};

CursorMorph.prototype.cmd = function (aChar) {
    if (aChar === 65) {
        this.target.selectAll();
    } else if (aChar === 90) {
        this.undo();
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
    CursorMorph.uber.destroy.call(this);
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

    this.image = newCanvas(this.extent());
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
    isThought
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
    this.changed();
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
    if (this.isThought) {
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
    this.image = newCanvas(this.extent());
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
    this.is3D = true;
    this.hasMiddleDip = true;
    SliderButtonMorph.uber.init.call(this, orientation);
};

SliderButtonMorph.prototype.autoOrientation = function () {
    nop();
};

SliderButtonMorph.prototype.drawNew = function () {
    var colorBak = this.color.copy();

    SliderButtonMorph.uber.drawNew.call(this);
    if (this.is3D) {
        this.drawEdges();
    }
    this.normalImage = this.image;

    this.color = this.highlightColor.copy();
    SliderButtonMorph.uber.drawNew.call(this);
    if (this.is3D) {
        this.drawEdges();
    }
    this.highlightImage = this.image;

    this.color = this.pressColor.copy();
    SliderButtonMorph.uber.drawNew.call(this);
    if (this.is3D) {
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

SliderMorph.prototype.autoOrientation = function () {
    nop();
};

SliderMorph.prototype.rangeSize = function () {
    return this.stop - this.start;
};

SliderMorph.prototype.ratio = function () {
    return this.size / this.rangeSize();
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

// SliderMorph duplicating:

SliderMorph.prototype.copyRecordingReferences = function (dict) {
    // inherited, see comment in Morph
    var c = SliderMorph.uber.copyRecordingReferences.call(
        this,
        dict
    );
    if (c.target && dict[this.target]) {
        c.target = (dict[this.target]);
    }
    if (c.button && dict[this.button]) {
        c.button = (dict[this.button]);
    }
    return c;
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

SliderMorph.prototype.setStart = function (num) {
    // for context menu demo purposes
    var newStart;
    if (typeof num === 'number') {
        this.start = Math.min(
            Math.max(num, 0),
            this.stop - this.size
        );
    } else {
        newStart = parseFloat(num);
        if (!isNaN(newStart)) {
            this.start = Math.min(
                Math.max(newStart, 0),
                this.stop - this.size
            );
        }
    }
    this.value = Math.max(this.value, this.start);
    this.updateTarget();
    this.drawNew();
    this.changed();
};

SliderMorph.prototype.setStop = function (num) {
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
    this.updateTarget();
    this.drawNew();
    this.changed();
};

SliderMorph.prototype.setSize = function (num) {
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
    this.updateTarget();
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
    this.edge = 5;
    this.color = new Color(60, 60, 60);
    this.borderColor = new Color(95, 95, 95);
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

InspectorMorph.prototype.buildPanes = function () {
    var attribs = [], property, myself = this, ctrl, ev;

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
    this.list = new ListMorph(
        this.target instanceof Array ? attribs : attribs.sort(),
        null, // label getter
        this.markOwnProperties ?
                [ // format list
                    [ // format element: [color, predicate(element]
                        new Color(0, 0, 180),
                        function (element) {
                            return myself.target.hasOwnProperty(element);
                        }
                    ]
                ]
                : null
    );
    this.list.action = function (selected) {
        var val, txt, cnts;
        val = myself.target[selected];
        myself.currentProperty = val;
        if (val === null) {
            txt = 'NULL';
        } else if (isString(val)) {
            txt = val;
        } else {
            txt = val.toString();
        }
        cnts = new TextMorph(txt);
        cnts.isEditable = true;
        cnts.enableSelecting();
        cnts.setReceiver(myself.target);
        myself.detail.setContents(cnts);
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

//InspectorMorph editing ops:

InspectorMorph.prototype.save = function () {
    var txt = this.detail.contents.children[0].text.toString(),
        prop = this.list.selected;
    try {
        // this.target[prop] = evaluate(txt);
        this.target.evaluateString('this.' + prop + ' = ' + txt);
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

    // initialize inherited properties:
    MenuMorph.uber.init.call(this);

    // override inherited properties:
    this.isDraggable = false;

    // immutable properties:
    this.border = null;
    this.edge = null;
};

MenuMorph.prototype.addItem = function (labelString, action, hint, color) {
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
        color]);
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
        this.edge = 5;
        this.border = 2;
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
                tuple[3] // color
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
            w = Math.max(w, item.children[0].width() + 8);
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
};

MenuMorph.prototype.adjustWidths = function () {
    var w = this.maxWidth(),
        isSelected,
        myself = this;
    this.children.forEach(function (item) {
        item.silentSetWidth(w);
        if (item instanceof MenuItemMorph) {
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
        }
    });
    this.changed();
};

MenuMorph.prototype.popup = function (world, pos) {
    this.drawNew();
    this.setPosition(pos);
    this.addShadow(new Point(2, 2), 80);
    this.keepWithin(world);
    if (world.activeMenu) {
        world.activeMenu.destroy();
    }
    world.add(this);
    world.activeMenu = this;
    this.fullChanged();
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

// StringMorph /////////////////////////////////////////////////////////

// I am a single line of text

// StringMorph inherits from Morph:

StringMorph.prototype = new Morph();
StringMorph.prototype.constructor = StringMorph;
StringMorph.uber = Morph.prototype;

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
    StringMorph.uber.init.call(this);

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
        txt = this.isPassword ?
                this.password('*', this.text.length) : this.text;

    // initialize my surface property
    this.image = newCanvas();
    context = this.image.getContext('2d');
    context.font = this.font();

    // set my extent
    width = Math.max(
        context.measureText(txt).width +
            Math.abs(this.shadowOffset.x),
        1
    );
    this.bounds.corner = this.bounds.origin.add(
        new Point(
            width,
            fontHeight(this.fontSize) + Math.abs(this.shadowOffset.y)
        )
    );
    this.image.width = width;
    this.image.height = this.height();

    // prepare context for drawing text
    context.font = this.font();
    context.textAlign = 'left';
    context.textBaseline = 'bottom';

    // first draw the shadow, if any
    if (this.shadowColor) {
        x = Math.max(this.shadowOffset.x, 0);
        y = Math.max(this.shadowOffset.y, 0);
        context.fillStyle = this.shadowColor.toString();
        context.fillText(txt, x, fontHeight(this.fontSize) + y);
    }

    // now draw the actual text
    x = Math.abs(Math.min(this.shadowOffset.x, 0));
    y = Math.abs(Math.min(this.shadowOffset.y, 0));
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

// StringMorph mesuring:

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
    // answer the slot (index) closest to the given point
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
    return idx - 1;
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
    this.currentlySelecting = false;
    this.startMark = 0;
    this.endMark = 0;
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
    if (this.isEditable) {
        this.startMark = 0;
        this.endMark = this.text.length;
        this.drawNew();
        this.changed();
    }
};

StringMorph.prototype.mouseDownLeft = function (pos) {
    if (this.isEditable) {
        this.clearSelection();
    } else {
        this.escalateEvent('mouseDownLeft', pos);
    }
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
    } else {
        this.escalateEvent('mouseClickLeft', pos);
    }
};

StringMorph.prototype.enableSelecting = function () {
    this.mouseDownLeft = function (pos) {
        this.clearSelection();
        if (this.isEditable && (!this.isDraggable)) {
            this.edit();
            this.root().cursor.gotoPos(pos);
            this.startMark = this.slotAt(pos);
            this.endMark = this.startMark;
            this.currentlySelecting = true;
        }
    };
    this.mouseMove = function (pos) {
        if (this.isEditable &&
                this.currentlySelecting &&
                (!this.isDraggable)) {
            var newMark = this.slotAt(pos);
            if (newMark !== this.endMark) {
                this.endMark = newMark;
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
        canvas = newCanvas(),
        context = canvas.getContext('2d'),
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

    this.image = newCanvas();
    context = this.image.getContext('2d');
    context.font = this.font();
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
    this.image.width = this.width();
    this.image.height = this.height();

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
    // answer the slot (index) closest to the given point
    // so the cursor can be moved accordingly
    var charX = 0,
        row = 0,
        col = 0,
        shadowHeight = Math.abs(this.shadowOffset.y),
        context = this.image.getContext('2d');

    while (aPoint.y - this.top() >
            ((fontHeight(this.fontSize) + shadowHeight) * row)) {
        row += 1;
    }
    row = Math.max(row, 1);
    while (aPoint.x - this.left() > charX) {
        charX += context.measureText(this.lines[row - 1][col]).width;
        col += 1;
    }
    return this.lineSlots[Math.max(row - 1, 0)] + col - 1;
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

// TextMorph editing:

TextMorph.prototype.edit = StringMorph.prototype.edit;

TextMorph.prototype.selection = StringMorph.prototype.selection;

TextMorph.prototype.selectionStartSlot
    = StringMorph.prototype.selectionStartSlot;

TextMorph.prototype.clearSelection = StringMorph.prototype.clearSelection;

TextMorph.prototype.deleteSelection = StringMorph.prototype.deleteSelection;

TextMorph.prototype.selectAll = StringMorph.prototype.selectAll;

TextMorph.prototype.mouseDownLeft = StringMorph.prototype.mouseDownLeft;

TextMorph.prototype.mouseClickLeft = StringMorph.prototype.mouseClickLeft;

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
    if (result !== null) {
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
    labelColor
) {
    this.init(
        target,
        action,
        labelString,
        fontSize,
        fontStyle,
        environment,
        hint,
        labelColor
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
    labelColor
) {
    // additional properties:
    this.target = target || null;
    this.action = action || null;
    this.environment = environment || null;
    this.labelString = labelString || null;
    this.label = null;
    this.hint = hint || null;
    this.fontSize = fontSize || MorphicPreferences.menuFontSize;
    this.fontStyle = fontStyle || 'sans-serif';
    this.highlightColor = new Color(192, 192, 192);
    this.pressColor = new Color(128, 128, 128);
    this.labelColor = labelColor || new Color(0, 0, 0);

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

    this.normalImage = newCanvas(ext);
    context = this.normalImage.getContext('2d');
    context.fillStyle = this.color.toString();
    context.fillRect(0, 0, ext.x, ext.y);

    this.highlightImage = newCanvas(ext);
    context = this.highlightImage.getContext('2d');
    context.fillStyle = this.highlightColor.toString();
    context.fillRect(0, 0, ext.x, ext.y);

    this.pressImage = newCanvas(ext);
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
        false, // bold
        false, // italic
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

// TriggerMorph duplicating:

TriggerMorph.prototype.copyRecordingReferences = function (dict) {
    // inherited, see comment in Morph
    var c = TriggerMorph.uber.copyRecordingReferences.call(
        this,
        dict
    );
    if (c.label && dict[this.label]) {
        c.label = (dict[this.label]);
    }
    return c;
};

// TriggerMorph action:

TriggerMorph.prototype.trigger = function () {
    /*
    if target is a function, use it as callback:
    execute target as callback function with action as argument
    in the environment as optionally specified.
    Note: if action is also a function, instead of becoming
    the argument itself it will be called to answer the argument.
    for selections, Yes/No Choices etc:

    else (if target is not a function):

        if action is a function:
        execute the action with target as environment (can be null)
        for lambdafied (inline) actions

        else if action is a String:
        treat it as function property of target and execute it
        for selector-like actions
    */
    if (typeof this.target === 'function') {
        if (typeof this.action === 'function') {
            this.target.call(this.environment, this.action.call());
        } else {
            this.target.call(this.environment, this.action);
        }
    } else {
        if (typeof this.action === 'function') {
            this.action.call(this.target);
        } else { // assume it's a String
            this.target[this.action]();
        }
    }
};

// TriggerMorph events:

TriggerMorph.prototype.mouseEnter = function () {
    this.image = this.highlightImage;
    this.changed();
    if (this.hint) {
        this.bubbleHelp(this.hint);
    }
};

TriggerMorph.prototype.mouseLeave = function () {
    this.image = this.normalImage;
    this.changed();
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

// TriggerMorph bubble help:

TriggerMorph.prototype.bubbleHelp = function (contents) {
    var myself = this;
    this.fps = 2;
    this.step = function () {
        if (this.bounds.containsPoint(this.world().hand.position())) {
            myself.popUpbubbleHelp(contents);
        }
        myself.fps = 0;
        delete myself.step;
    };
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
    color
) {
    this.init(
        target,
        action,
        labelString,
        fontSize,
        fontStyle,
        environment,
        hint,
        color
    );
}

MenuItemMorph.prototype.createLabel = function () {
    var icon, lbl, np;
    if (this.label !== null) {
        this.label.destroy();
    }
    if (isString(this.labelString)) {
        this.label = this.createLabelString(this.labelString);
    } else if (this.labelString instanceof Array) {
        // assume its pattern is: [icon, string] 
        this.label = new Morph();
        this.label.alpha = 0; // transparent
        this.label.add(icon = this.createIcon(this.labelString[0]));
        this.label.add(lbl = this.createLabelString(this.labelString[1]));
        lbl.setCenter(icon.center());
        lbl.setLeft(icon.right() + 4);
        this.label.bounds = (icon.bounds.merge(lbl.bounds));
        this.label.drawNew();
    } else { // assume it's either a Morph or a Canvas
        this.label = this.createIcon(this.labelString);
    }
    this.silentSetExtent(this.label.extent().add(new Point(8, 0)));
    np = this.position().add(new Point(4, 0));
    this.label.bounds = np.extent(this.label.extent());
    this.add(this.label);
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
        this.fontStyle
    );
    lbl.setColor(this.labelColor);
    return lbl;
};

// MenuItemMorph events:

MenuItemMorph.prototype.mouseEnter = function () {
    if (!this.isListItem()) {
        this.image = this.highlightImage;
        this.changed();
    }
    if (this.hint) {
        this.bubbleHelp(this.hint);
    }
};

MenuItemMorph.prototype.mouseLeave = function () {
    if (!this.isListItem()) {
        this.image = this.normalImage;
        this.changed();
    }
    if (this.hint) {
        this.world().hand.destroyTemporaries();
    }
};

MenuItemMorph.prototype.mouseDownLeft = function (pos) {
    if (this.isListItem()) {
        this.parent.unselectAllItems();
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
    if (!this.isListItem()) {
        this.parent.destroy();
        this.root().activeMenu = null;
    }
    this.trigger();
};

MenuItemMorph.prototype.isListItem = function () {
    if (this.parent) {
        return this.parent.isListContents;
    }
    return false;
};

MenuItemMorph.prototype.isSelectedListItem = function () {
    if (this.isListItem()) {
        return this.image === this.pressImage;
    }
    return false;
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

// FrameMorph scrolling optimization:

FrameMorph.prototype.moveBy = function (delta) {
    this.changed();
    this.bounds = this.bounds.translateBy(delta);
    this.children.forEach(function (child) {
        child.silentMoveBy(delta);
    });
    this.changed();
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

// FrameMorph duplicating:

FrameMorph.prototype.copyRecordingReferences = function (dict) {
    // inherited, see comment in Morph
    var c = FrameMorph.uber.copyRecordingReferences.call(
        this,
        dict
    );
    if (c.frame && dict[this.scrollFrame]) {
        c.frame = (dict[this.scrollFrame]);
    }
    return c;
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
    this.isScrollingByDragging = true;    // change if desired
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
};

ScrollFrameMorph.prototype.adjustScrollBars = function () {
    var hWidth = this.width() - this.scrollBarSize,
        vHeight = this.height() - this.scrollBarSize;

    this.changed();
    if (this.contents.width() > this.width() +
            MorphicPreferences.scrollBarSize) {
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
        this.hBar.stop = this.contents.width() - this.width();
        this.hBar.size =
            this.width() / this.contents.width() * this.hBar.stop;
        this.hBar.value = this.left() - this.contents.left();
        this.hBar.drawNew();
    } else {
        this.hBar.hide();
    }

    if (this.contents.height() > this.height() +
            this.scrollBarSize) {
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
        this.vBar.stop = this.contents.height() - this.height();
        this.vBar.size =
            this.height() / this.contents.height() * this.vBar.stop;
        this.vBar.value = this.top() - this.contents.top();
        this.vBar.drawNew();
    } else {
        this.vBar.hide();
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

    newX = cl + steps;
    if (newX > l) {
        newX = l;
    }
    if (newX + cw < r) {
        newX = r - cw;
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

    newY = ct + steps;
    if (newY > t) {
        newY = t;
    }
    if (newY + ch < b) {
        newY = b - ch;
    }
    if (newY !== ct) {
        this.contents.setTop(newY);
    }
};

ScrollFrameMorph.prototype.step = function () {
    nop();
};

ScrollFrameMorph.prototype.mouseDownLeft = function (pos) {
    if (!this.isScrollingByDragging) {
        return null;
    }
    var world = this.root(),
        oldPos = pos,
        myself = this,
        deltaX = 0,
        deltaY = 0,
        friction = 0.8;

    this.step = function () {
        var newPos;
        if (world.hand.mouseButton &&
                (world.hand.children.length === 0) &&
                (myself.bounds.containsPoint(world.hand.position()))) {
            newPos = world.hand.bounds.origin;
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

ScrollFrameMorph.prototype.copyRecordingReferences = function (dict) {
    // inherited, see comment in Morph
    var c = ScrollFrameMorph.uber.copyRecordingReferences.call(
        this,
        dict
    );
    if (c.contents && dict[this.contents]) {
        c.contents = (dict[this.contents]);
    }
    if (c.hBar && dict[this.hBar]) {
        c.hBar = (dict[this.hBar]);
        c.hBar.action = function (num) {
            c.contents.setPosition(
                new Point(c.left() - num, c.contents.position().y)
            );
        };
    }
    if (c.vBar && dict[this.vBar]) {
        c.vBar = (dict[this.vBar]);
        c.vBar.action = function (num) {
            c.contents.setPosition(
                new Point(c.contents.position().x, c.top() - num)
            );
        };
    }
    return c;
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

function ListMorph(elements, labelGetter, format) {
/*
    passing a format is optional. If the format parameter is specified
    it has to be of the following pattern:

        [
            [<color>, <single-argument predicate>],
            ...
        ]

    multiple color conditions can be passed in such a format list, the
    last predicate to evaluate true when given the list element sets
    the given color. If no condition is met, the default color (black)
    will be assigned.
    
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
        format || []
    );
}

ListMorph.prototype.init = function (elements, labelGetter, format) {
    ListMorph.uber.init.call(this);

    this.contents.acceptsDrops = false;
    this.color = new Color(255, 255, 255);
    this.hBar.alpha = 0.6;
    this.vBar.alpha = 0.6;
    this.elements = elements || [];
    this.labelGetter = labelGetter;
    this.format = format;
    this.listContents = null;
    this.selected = null;
    this.action = null;
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
        var color = null;

        myself.format.forEach(function (pair) {
            if (pair[1].call(null, element)) {
                color = pair[0];
            }
        });
        myself.listContents.addItem(
            myself.labelGetter(element), // label string
            element, // action
            null, // hint
            color
        );
    });
    this.listContents.setPosition(this.contents.position());
    this.listContents.isListContents = true;
    this.listContents.drawNew();
    this.addContents(this.listContents);
};

ListMorph.prototype.select = function (item) {
    this.selected = item;
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

// StringFieldMorph duplicating:

StringFieldMorph.prototype.copyRecordingReferences = function (dict) {
    // inherited, see comment in Morph
    var c = StringFieldMorph.uber.copyRecordingReferences.call(
        this,
        dict
    );
    if (c.text && dict[this.text]) {
        c.text = (dict[this.text]);
    }
    return c;
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
    HandMorph.uber.init.call(this);
    this.bounds = new Rectangle();

    // additional properties:
    this.world = aWorld;
    this.mouseButton = null;
    this.mouseOverList = [];
    this.mouseDownMorph = null;
    this.morphToGrab = null;
    this.grabOrigin = null;
    this.temporaries = [];
    this.touchHoldTimeout = null;
};

HandMorph.prototype.changed = function () {
    var b;
    if (this.world !== null) {
        b = this.fullBounds();
        if (!b.extent().eq(new Point())) {
            this.world.broken.push(this.fullBounds().spread());
        }
    }

};

// HandMorph navigation:

HandMorph.prototype.morphAtPointer = function () {
    var morphs = this.world.allChildren().slice(0).reverse(),
        myself = this,
        result = null;

    morphs.forEach(function (m) {
        if (m.visibleBounds().containsPoint(myself.bounds.origin) &&
                result === null &&
                m.isVisible &&
                (m.noticesTransparentClick ||
                    (!m.isTransparentAt(myself.bounds.origin))) &&
                (!(m instanceof ShadowMorph))) {
            result = m;
        }
    });
    if (result !== null) {
        return result;
    }
    return this.world;
};

/*
    alternative -  more elegant and possibly more
    performant - solution for morphAtPointer.
    Has some issues, commented out for now

HandMorph.prototype.morphAtPointer = function () {
    var myself = this;
    return this.world.topMorphSuchThat(function (m) {
        return m.visibleBounds().containsPoint(myself.bounds.origin) &&
            m.isVisible &&
            (m.noticesTransparentClick ||
                (! m.isTransparentAt(myself.bounds.origin))) &&
            (! (m instanceof ShadowMorph));
    });
};
*/

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
        aMorph.addShadow();
        if (aMorph.prepareToBeGrabbed) {
            aMorph.prepareToBeGrabbed(this);
        }
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
        this.changed();
        target.add(morphToDrop);
        morphToDrop.changed();
        morphToDrop.removeShadow();
        this.children = [];
        this.setExtent(new Point());
        if (morphToDrop.justDropped) {
            morphToDrop.justDropped(this);
        }
        if (target.reactToDropOf) {
            target.reactToDropOf(morphToDrop, this);
        }
        this.dragOrigin = null;
    }
};

// HandMorph event dispatching:
/*
    mouse events:

        mouseDownLeft
        mouseDownRight
        mouseClickLeft
        mouseClickRight
        mouseEnter
        mouseLeave
        mouseEnterDragging
        mouseLeaveDragging
        mouseMove
        mouseScroll
*/

HandMorph.prototype.processMouseDown = function (event) {
    var morph, expectedClick, actualClick;

    this.destroyTemporaries();
    this.morphToGrab = null;
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
        }
        if (event.button === 2 || event.ctrlKey) {
            this.mouseButton = 'right';
            actualClick = 'mouseDownRight';
            expectedClick = 'mouseClickRight';
        } else {
            this.mouseButton = 'left';
            actualClick = 'mouseDownLeft';
            expectedClick = 'mouseClickLeft';
        }
        this.mouseDownMorph = morph;
        while (!this.mouseDownMorph[expectedClick]) {
            this.mouseDownMorph = this.mouseDownMorph.parent;
        }
        while (!morph[actualClick]) {
            morph = morph.parent;
        }
        morph[actualClick](this.bounds.origin);
    }
};

HandMorph.prototype.processTouchStart = function (event) {
    var myself = this;
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
    if (event.touches.length === 1) {
        var touch = event.touches[0];
        this.processMouseMove(touch);
        clearInterval(this.touchHoldTimeout);
    }
};

HandMorph.prototype.processTouchEnd = function (event) {
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
            if (this.mouseButton) {
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

HandMorph.prototype.processMouseMove = function (event) {
    var pos,
        posInDocument = getDocumentPositionOf(this.world.worldCanvas),
        mouseOverNew,
        myself = this,
        morph,
        topMorph,
        fb;

    pos = new Point(
        event.pageX - posInDocument.x,
        event.pageY - posInDocument.y
    );

    this.setPosition(pos);

    // determine the new mouse-over-list:
    // mouseOverNew = this.allMorphsAtPointer();
    mouseOverNew = this.morphAtPointer().allParents();

    if ((this.children.length === 0) &&
            (this.mouseButton === 'left')) {
        topMorph = this.morphAtPointer();
        morph = topMorph.rootForGrab();
        if (topMorph.mouseMove) {
            topMorph.mouseMove(pos);
        }

        // if a morph is marked for grabbing, just grab it
        if (this.morphToGrab) {
            if (this.morphToGrab.isDraggable) {
                morph = this.morphToGrab;
                this.grab(morph);
            } else if (this.morphToGrab.isTemplate) {
                morph = this.morphToGrab.fullCopy();
                morph.isTemplate = false;
                morph.isDraggable = true;
                this.grab(morph);
                this.grabOrigin = this.morphToGrab.situation();
            }
            // if the mouse has left its fullBounds, center it
            fb = morph.fullBounds();
            if (!fb.containsPoint(pos)) {
                this.bounds.origin = fb.center();
                this.grab(morph);
                this.setPosition(pos);
            }

        }

/*
    original, more cautious code for grabbing Morphs,
    retained in case of needing    to fall back:

        if (morph === this.morphToGrab) {
            if (morph.isDraggable) {
                this.grab(morph);
            } else if (morph.isTemplate) {
                morph = morph.fullCopy();
                morph.isTemplate = false;
                morph.isDraggable = true;
                this.grab(morph);
            }
        }
*/

    }

    this.mouseOverList.forEach(function (old) {
        if (!contains(mouseOverNew, old)) {
            if (old.mouseLeave) {
                old.mouseLeave();
            }
            if (old.mouseLeaveDragging && this.mouseButton) {
                old.mouseLeaveDragging();
            }
        }
    });
    mouseOverNew.forEach(function (newMorph) {
        if (!contains(myself.mouseOverList, newMorph)) {
            if (newMorph.mouseEnter) {
                newMorph.mouseEnter();
            }
            if (newMorph.mouseEnterDragging && this.mouseButton) {
                newMorph.mouseEnterDragging();
            }
        }

        // autoScrolling support:
        if (myself.children.length > 0) {
            if (newMorph instanceof ScrollFrameMorph) {
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
                event.hasOwnProperty('wheelDeltaY') ?
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
    
    events to interested Morphs at the mouse pointer
*/
    var files = event instanceof FileList ? event
                : event.target.files || event.dataTransfer.files,
        file,
        txt = event.dataTransfer ?
                event.dataTransfer.getData('Text/HTML') : null,
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
            canvas = newCanvas(new Point(pic.width, pic.height));
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
            target.droppedText(e.target.result, aFile.name);
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

    function parseImgURL(html) {
        var url = '',
            i,
            c,
            start = html.indexOf('<img src="');
        if (start === -1) {return null; }
        start += 10;
        for (i = start; i < html.length; i += 1) {
            c = html[i];
            if (c === '"') {
                return url;
            }
            url = url.concat(c);
        }
        return null;
    }

    if (files.length > 0) {
        for (i = 0; i < files.length; i += 1) {
            file = files[i];
            if (file.type.indexOf("svg") !== -1
                    && !MorphicPreferences.rasterizeSVGs) {
                readSVG(file);
            } else if (file.type.indexOf("image") === 0) {
                readImage(file);
            } else if (file.type.indexOf("audio") === 0) {
                readAudio(file);
            } else if (file.type.indexOf("text") === 0) {
                readText(file);
            } else { // assume it's meant to be binary
                readBinary(file);
            }
        }
    } else if (txt) {
        while (!target.droppedImage) {
            target = target.parent;
        }
        img = new Image();
        img.onload = function () {
            canvas = newCanvas(new Point(img.width, img.height));
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

// HandMorph dragging optimization

HandMorph.prototype.moveBy = function (delta) {
    Morph.prototype.trackChanges = false;
    HandMorph.uber.moveBy.call(this, delta);
    Morph.prototype.trackChanges = true;
    this.fullChanged();
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

    // additional properties:
    this.useFillPage = fillPage;
    if (this.useFillPage === undefined) {
        this.useFillPage = true;
    }
    this.isDevMode = false;
    this.broken = [];
    this.hand = new HandMorph(this);
    this.keyboardReceiver = null;
    this.lastEditedText = null;
    this.cursor = null;
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
    this.broken.forEach(function (rect) {
        if (rect.extent().gt(new Point(0, 0))) {
            myself.fullDrawOn(myself.worldCanvas, rect);
        }
    });
    this.broken = [];
};

WorldMorph.prototype.doOneCycle = function () {
    this.stepFrame();
    this.updateBroken();
};

WorldMorph.prototype.fillPage = function () {
    var pos = getDocumentPositionOf(this.worldCanvas),
        clientHeight = window.innerHeight,
        clientWidth = window.innerWidth,
        myself = this;


    if (pos.x > 0) {
        this.worldCanvas.style.position = "absolute";
        this.worldCanvas.style.left = "0px";
        pos.x = 0;
    }
    if (pos.y > 0) {
        this.worldCanvas.style.position = "absolute";
        this.worldCanvas.style.top = "0px";
        pos.y = 0;
    }
    if (document.body.scrollTop) { // scrolled down b/c of viewport scaling
        clientHeight = document.documentElement.clientHeight;
    }
    if (document.body.scrollLeft) { // scrolled left b/c of viewport scaling
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
/*
    answer the color at the given point.

    Note: for some strange reason this method works fine if the page is
    opened via HTTP, but *not*, if it is opened from a local uri
    (e.g. from a directory), in which case it's always null.

    This behavior is consistent throughout several browsers. I have no
    clue what's behind this, apparently the imageData attribute of
    canvas context only gets filled with meaningful data if transferred
    via HTTP ???

    This is somewhat of a showstopper for color detection in a planned
    offline version of Snap.

    The issue has also been discussed at: (join lines before pasting)
    http://stackoverflow.com/questions/4069400/
    canvas-getimagedata-doesnt-work-when-running-locally-on-windows-
    security-excep

    The suggestion solution appears to work, since the settings are
    applied globally.
*/
    var dta = this.worldCanvas.getContext('2d').getImageData(
        point.x,
        point.y,
        1,
        1
    ).data;
    return new Color(dta[0], dta[1], dta[2]);
};

// WorldMorph events:

WorldMorph.prototype.initVirtualKeyboard = function () {
    var myself = this;

    if (this.virtualKeyboard) {
        document.body.removeChild(this.virtualKeyboard);
        this.virtualKeyboard = null;
    }
    if (!MorphicPreferences.useVirtualKeyboard) {
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
            if (event.keyIdentifier === 'U+0008' ||
                    event.keyIdentifier === 'Backspace') {
                event.preventDefault();
            }
            // supress tab override and make sure tab gets
            // received by all browsers
            if (event.keyIdentifier === 'U+0009' ||
                    event.keyIdentifier === 'Tab') {
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
            if (event.keyIdentifier === 'U+0008' ||
                    event.keyIdentifier === 'Backspace') {
                event.preventDefault();
            }
            // supress tab override and make sure tab gets
            // received by all browsers
            if (event.keyIdentifier === 'U+0009' ||
                    event.keyIdentifier === 'Tab') {
                if (myself.keyboardReceiver) {
                    myself.keyboardReceiver.processKeyPress(event);
                }
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

WorldMorph.prototype.mouseDownLeft = function () {
    nop();
};

WorldMorph.prototype.mouseClickLeft = function () {
    nop();
};

WorldMorph.prototype.mouseDownRight = function () {
    nop();
};

WorldMorph.prototype.mouseClickRight = function () {
    nop();
};

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
        menu.addLine();
        menu.addItem(
            "restore display",
            'changed',
            'redraw the\nscreen once'
        );
        menu.addItem(
            "fill page...",
            'fillPage',
            'let the World automatically\nadjust to browser resizings'
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
                    menu.title + '\ncolor:',
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
        if (modules.hasOwnProperty(module)) {
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
    var pos = getDocumentPositionOf(this.worldCanvas);

    if (!aStringOrTextMorph.isEditable) {
        return null;
    }
    if (this.cursor) {
        this.cursor.destroy();
    }
    if (this.lastEditedText) {
        this.lastEditedText.clearSelection();
    }
    this.cursor = new CursorMorph(aStringOrTextMorph);
    aStringOrTextMorph.parent.add(this.cursor);
    this.keyboardReceiver = this.cursor;

    this.initVirtualKeyboard();
    if (MorphicPreferences.useVirtualKeyboard) {
        this.virtualKeyboard.style.top = this.cursor.top() + pos.y + "px";
        this.virtualKeyboard.style.left = this.cursor.left() + pos.x + "px";
        this.virtualKeyboard.focus();
    }

    if (MorphicPreferences.useSliderForInput) {
        if (!aStringOrTextMorph.parentThatIsA(MenuMorph)) {
            this.slide(aStringOrTextMorph);
        }
    }
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
        this.lastEditedText = this.cursor.target;
        this.cursor.destroy();
        this.cursor = null;
        this.lastEditedText.escalateEvent('reactToEdit', this.lastEditedText);
    }
    this.keyboardReceiver = null;
    if (this.virtualKeyboard) {
        this.virtualKeyboard.blur();
        document.body.removeChild(this.virtualKeyboard);
        this.virtualKeyboard = null;
    }
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
