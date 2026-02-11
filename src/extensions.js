/*

    extensions.js

    additional primitives for SNAP!

    written by Jens Mönig

    Copyright (C) 2026 by Jens Mönig

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

*/

// Global settings /////////////////////////////////////////////////////

/*global modules, List, StageMorph, Costume, SpeechSynthesisUtterance, Sound,
IDE_Morph, CamSnapshotDialogMorph, SoundRecorderDialogMorph, isSnapObject, nop,
Color, Process, contains, localize, SnapTranslator, isString, detect, Point,
SVG_Costume, newCanvas, WatcherMorph, BlockMorph, HatBlockMorph, invoke, isNil,
BigUint64Array, DeviceOrientationEvent, DialogBoxMorph, Animation, TableMorph,
TableFrameMorph, console, Morph*/

/*jshint esversion: 11, bitwise: false*/

modules.extensions = '2026-February-11';

// Global stuff

var SnapExtensions = {
    primitives: new Map(),
    menus: new Map(),
    buttons: {
        palette: []
    },
    scripts: [],
    urls: [ // allow-list of trusted servers
        'libraries/',
        'https://snap.berkeley.edu/',
        'https://bjc.berkeley.edu/',
        'https://cs10.org/',
        'https://ecraft2learn.github.io/ai/', // Uni-Oxford, Ken Kahn
        'https://microworld.edc.org/', // EDC, E. Paul Goldenberg
        'https://birdbraintechnologies.com/', // BirdBrain technologies, Tom Lauwers
        'https://www.birdbraintechnologies.com/' // compatibility
    ]
};

/*
    SnapExtensions is a set of three global dictionaries of named functions to
    be used as extension primitives for blocks, dynamic dropdown menus and
    custom push-buttons inside block palette categories. Block extensions are
    stored in the "primitives" dictionary of SnapExtensions, dynamic dropdown
    menus in the "menus" section and custom palette push-buttons in the
    "buttons" collection.

    You can also extend Snap! with your own externally hosted JavaScript file(s)
    and have them add your own extension primitives, menus and buttons to the
    global SnapExtensions dictionaries. This lets you provide libraries to
    support special APIs and custom hardware.


    1. Primitives (additional blocks)
    =================================
    The names under which primitives are stored will apear in the dropdown
    menus of the hidden extension "primitive" blocks sorted alphabetically.
    (You can find those extension primitives in Snap's search bar or in dev
    mode. There are two version of the primitive block, a command version and
    a reporter one, both show the same list of available extensions.

    naming conventions
    ------------------
    domain-prefix_function-name(parameter-list)
    example: 'lst_sort(list, fn)'

    - domain-prefix:    max 3-letter lowercase identifier
                        followed by an underscore
               e.g.:    err_, lst_, txt_, dta_, map_, tts_, xhr_, geo_, mda_

    - function-name: short, single word if possible, lowercase
    - parameter-list: comma separated names or type indicators

    function semantics
    ------------------
    - functions are called by the "primitive" blocks with any arguments provided
    - use the "function () {}" notation to define functions, not the ES6 arrow
      notation, otherwise "this" will not get scoped correctly
    - "this" refers to the current snap object (sprite or stage) at call-time
    - a reference to the current process is always passed as last argument


    2. Menus (for input slots)
    ==========================
    The names of the available dynamic drowdown menus can be written into the
    "options" dialog when defining an input slot. Additionally you can choose
    from a list of available menus when holding down the shift-key while
    clicking on the partial-gear button in Snap's input-slot dialog.

    naming conventions
    ------------------
    domain-prefix_function-name
    example: 'clr_number'

    - domain-prefix:    max 3-letter lowercase identifier
                        followed by an underscore
               e.g.:    clr_, txt_, lst_

    - function-name: short, single word if possible, lowercase
    - NOTE: dynamic menu functions cannot have any inputs

    function semantics
    ------------------
    - use the "function () {}" notation to define functions, not the ES6 arrow
      notation, otherwise "this" will not get scoped correctly
    - "this" refers to the current input-slot at call-time (when the menu is
      requested by the user by clicking on the down-arrow symbol)
    - to get a handle on the current block use "this.parentThatIsA(BlockMorph)"
    - likewise to get a handle on the current sprite use
      "this.parentThatIsA(IDE_Morph).currentSprite"
    - if you want the menu of one input slot to depend on the contents of
      another input slot of the same block, you can get a handle to the block
      using the above method, and then access all inputs by calling
      "block.inputs()". This will give you an array of all input slots.
      You can access the contents of an input slot by calling "slot.evaluate()"


    3. Buttons
    ==========
    You can have your extension add buttons at the top of the palette in a
    particular category. Usually, you will want to add these buttons to the
    category created by your XML library.

    To do so, just add a button entry in your JS extension file:

    SnapExtensions.buttons.palette.push(
        {
            category: 'My Extension',
            label: 'Do Something',
            action: function () { doYourStuffWith(this); },
            hint: 'This button does things',
            hideable: false
        }
    );

    Inside the action, "this" points to the currently selected object, be it a
    sprite or the Stage.

    The "hideable" attribute defines whether the button will be hidden when
    turning off "Show buttons" in single palette mode. By default, extension
    buttons will not be hidden.


    4. External JavaScript files
    ============================
    You can provide extensions for your custom hardware or for arbitrary APIs
    or extend Snap! with JavaScript libraries from other parties. You can
    load additional JavaScript files using the

        src_load(url)

    extension primitive inside Snap, which you can find using Snap's search bar
    in the IDE. The loading primitive will wait until the source file has fully
    loaded and its defined functions are ready to be called.
    Snap remembers the external extensions that have been already loaded and
    will ignore any subsequent calls to load the same external extension again.
    This lets you lazily initialize your extension by simply adding a
    "src_load(url)" command for your external JS file before calling any of its
    added functions.


    5. Miscellaneous
    ================

    calling extension primitives in other JavaScript functions
    ----------------------------------------------------------
    you can call other extension primitives from your own JavaScript functions,
    especially if you want to reuse them in your own extensions. Just make sure
    to use apply() instead of calling them directly, so "this" gets scoped
    correctly, e.g.:

        SnapExtensions.primitives.get('var_declare(scope, name)').apply(
            this,
            ['global', '_my var', proc]
        );

    Don't forget to pass in a reference to the current process as last parameter
    in case the callee requires it.

    adding primitives to SnapExtensions
    -----------------------------------
    It is the suggested best practice to expose your own extension primitives
    by adding them to the global SnapExtensions libraries (for primitives and
    menus) using the very same conventions described herein, and then to offer
    a library of custom blocks that make calls to your additional operations.

    developing an extension
    -----------------------
    Running the "src_load(url)" primitive will throw an error unless you first
    check the "Enable JavaScript extensions" setting in Snap's preferences menu,
    or if your JavaScript extension comes from a list of trusted hosts.
    While you develop your JavaScript extension it's recommended to turn on the
    "Enable JavaScript extensions" setting to load the extension once, and
    then to turn it off again, so you can make sure your custom blocks are not
    using any "JS Function" blocks (because those will be caught if the
    preference is turned off).

    publishing an extension
    -----------------------
    When you're ready to publish your extension you can contact us to allow-list
    the url hosting your JS file, or you can send me a Github pull-request to
    include it in the main Snap branch.
    We recommend submitting your extensions to the main Snap! Github repository
    so they can be made available in the offline versions (source download
    and PWA).
    External extensions are a powerful tools to change, override and generally
    mold Snap into anything you want, so please use these capabilities sensibly.
    We look forward to your innovations and don't plan to restrict the scope of
    what extensions are allowed to modify. For security reasons we do ask you to
    refrain from exposing any form of JS eval(), including "new Function()" to
    end users (if you want to use eval() internally in your extension we'll
    frown on you but not reject your contribution).
*/

// Primitives

// meta utils (snap_):

SnapExtensions.primitives.set(
    'snap_yield',
    function (proc) {
        if (!proc.isAtomic) {
            proc.readyToYield = true;
        }
    }
);

SnapExtensions.primitives.set(
    'snap_xml_encode(script)',
    function (script, proc) {
        proc.assertType(script, ['command', 'reporter', 'predicate', 'hat']);
        return script.expression.toXMLString(this);
    }
);

SnapExtensions.primitives.set(
    'snap_xml_decode(txt)',
    function (xml, proc) {
        proc.assertType(xml, 'text');
        return this.parentThatIsA(IDE_Morph).deserializeScriptString(xml).reify();
    }
);

SnapExtensions.primitives.set(
    'snap_bootstrap(block)',
    function (script, proc) {
        proc.assertType(script, ['command', 'reporter', 'predicate']);
        var block = script.expression;
        if (block.isCustomBlock &&
            block.definition.isGlobal &&
            block.definition.selector &&
            !block.definition.isBootstrapped()
            /* // require "blocks all the way" to be enabled, commented out
            &&
            SpriteMorph.prototype.blocks[
                block.definition.selector
            ].definition !== undefined
            */
        ) {
            block.definition.bootstrap(proc.blockReceiver());
        }
    }
);

SnapExtensions.primitives.set(
    'snap_un-bootstrap(block)',
    function (script, proc) {
        proc.assertType(script, ['command', 'reporter', 'predicate']);
        var block = script.expression;
        if (block.isCustomBlock &&
            block.definition.isGlobal &&
            block.definition.isBootstrapped()
        ) {
            block.definition.unBootstrap(proc.blockReceiver());
        }
    }
);

SnapExtensions.primitives.set(
    'snap_bootstrapped(block)?',
    function (script, proc) {
        proc.assertType(script, ['command', 'reporter', 'predicate']);
        var block = script.expression;
        return block.isCustomBlock &&
            block.definition.isGlobal &&
            block.definition.isBootstrapped();
    }
);

SnapExtensions.primitives.set(
    'snap_block_selectors',
    function () {
        return new List([
            ['label'],
            ['definition'],
            ['comment'],
            ['category'],
            ['type'],
            ['scope'],
            ['selector'],
            ['slots'],
            ['defaults'],
            ['menus'],
            ['editables'],
            ['replaceables'],
            ['separators'],
            ['collapses'],
            ['expands'],
            ['initial slots'],
            ['min slots'],
            ['max slots'],
            ['translations']
        ]);
    }
);

SnapExtensions.primitives.set(
    'snap_threadsafe?',
    function () {
        return this.parentThatIsA(StageMorph).isThreadSafe;
    }
);

SnapExtensions.primitives.set(
    'snap_threadsafe(on?)',
    function (bool) {
        this.parentThatIsA(StageMorph).isThreadSafe = (bool === true);
    }
);

SnapExtensions.primitives.set(
    'snap_quicksteps?',
    function () {
        return StageMorph.prototype.enableQuicksteps;
    }
);

SnapExtensions.primitives.set(
    'snap_quicksteps(on?)',
    function (bool) {
        StageMorph.prototype.enableQuicksteps = (bool === true);
    }
);

SnapExtensions.primitives.set(
    'snap_extensionexists(prim)',
    function (prim) {
        return !isNil(SnapExtensions.primitives.get(prim));
    }
);

// errors & exceptions (err_):

SnapExtensions.primitives.set(
    'err_error(msg)',
    function (msg) {
        throw new Error(msg, {cause: 'user'});
    }
);

SnapExtensions.primitives.set(
    'err_try(cmd, catch, err)',
    function (action, exception, errVarName, proc) {
        proc.tryCatch(action, exception, errVarName);
    }
);

SnapExtensions.primitives.set(
    'err_reset',
    function (proc) {
        proc.resetErrorHandling();
    }
);

SnapExtensions.primitives.set(
    'err_ignore',
    nop
);

// list utils (lst_):

SnapExtensions.primitives.set(
    'lst_sort(list, fn)',
    function (data, fn, proc) {
        return proc.reportAtomicSort(data, fn);
    }
);

SnapExtensions.primitives.set(
    'lst_linked(list)',
    function (data) {
        return data.isLinked;
    }
);

// text utils (txt_):

SnapExtensions.primitives.set(
    'txt_lowercase(txt)',
    function (txt) {
        return txt.toLowerCase();
    }
);

SnapExtensions.primitives.set(
    'txt_indexof(sub, txt)',
    function (sub, txt) {
        return txt.indexOf(sub) + 1;
    }
);

SnapExtensions.primitives.set(
    'txt_to_utf8(txt)',
    function (txt) {
        var lst = new List(Array.from(new TextEncoder().encode(txt)));
        // lst.type = 'number';
        return lst;
    }
);

SnapExtensions.primitives.set(
    'txt_from_utf8(utf8List)',
    function (utf8List) {
        var arr = utf8List.itemsArray();
        if (!(arr instanceof Uint8Array)) {
            arr = new Uint8Array(arr);
        }
        return new TextDecoder("utf-8").decode(arr);
    }
);

SnapExtensions.primitives.set(
    'txt_width(txt, fontsize)',
    function (text, size) {
        // answer the width of the given text and size in the writing font
        // also works for hacks that abuse the size paramter
        // for fancy typography, as in the "writing and formatting" library
        if (typeof text !== 'string' && typeof text !== 'number') {
            throw new Error(
                localize('can only write text or numbers, not a') + ' ' +
                typeof text
            );
        }

        var stage = this.parentThatIsA(StageMorph),
            context = stage.penTrails().getContext('2d'),
            len;

        context.save();
        context.font = size + 'px monospace';
        context.textAlign = 'left';
        context.textBaseline = 'alphabetic';
        len = context.measureText(text).width;
        context.restore();
        return len;
    }
);

SnapExtensions.primitives.set(
    'txt_transform(name, txt)',
    /*
        supported transformation names:
        -------------------------------
        select
        unselect
        encode URI
        decode URI
        encode URI component
        decode URI component
        XML escape
        XML unescape
        JS escape
        hex sha512 hash
    */
    function (name, txt) {
        return Process.prototype.reportTextFunction(name, txt);
    }
);

SnapExtensions.primitives.set(
    'txt_export(txt, name)',
    function (txt, name, proc) {
        var ide = this.parentThatIsA(IDE_Morph);
        proc.assertType(txt, ['text', 'number']);
        name = name || localize('data');
        proc.assertType(name, ['text', 'number']);
        name = name.toString();
        ide.saveFileAs(txt.toString(), 'text/txt', name);
    }
);

// bitwise operations

SnapExtensions.primitives.set(
    'bit_and(a, b)',
    function (a, b, proc) {
        return proc.hyper(((a, b) => a & b), a, b);
    }
);

SnapExtensions.primitives.set(
    'bit_or(a, b)',
    function (a, b, proc) {
        return proc.hyper(((a, b) => a | b), a, b);
    }
);

SnapExtensions.primitives.set(
    'bit_xor(a, b)',
    function (a, b, proc) {
        return proc.hyper(((a, b) => a ^ b), a, b);
    }
);

SnapExtensions.primitives.set(
    'bit_not(a)',
    function (a, proc) {
        return proc.hyper(n => ~ n, a);
    }
);

SnapExtensions.primitives.set(
    'bit_left_shift(a, b)',
    function (a, b, proc) {
        return proc.hyper(((a, b) => a << b), a, b);
    }
);

SnapExtensions.primitives.set(
    'bit_right_shift(a, b)',
    function (a, b, proc) {
        return proc.hyper(((a, b) => a >> b), a, b);
    }
);

SnapExtensions.primitives.set(
    'bit_unsigned_right_shift(a, b)',
    function (a, b, proc) {
        return proc.hyper(((a, b) => a >>> b), a, b);
    }
);

// data sciene & frequency distribution analysis (dta_):

SnapExtensions.primitives.set(
    'dta_analyze(list)',
    function (list, proc) {
        var dict = new Map(),
            result = [],
            data = list.itemsArray(),
            len = data.length,
            item, i;
        for (i = 0; i < len; i += 1) {
            item = proc.reportIsA(data[i], 'number') ?
                data[i].toString() : data[i];
            if (dict.has(item)) {
                dict.set(item, dict.get(item) + 1);
            } else {
                dict.set(item, 1);
            }
        }
        dict.forEach(function (value, key) {
            result.push(new List([key, value]));
        });
        return new List(result);
    }
);

SnapExtensions.primitives.set(
    'dta_group(list, fn)',
    function (data, fn, proc) {
        return proc.reportAtomicGroup(data, fn);
    }
);

SnapExtensions.primitives.set(
    'dta_transpose(list)',
    function (data, proc) {
        proc.assertType(data, 'list');
        return data.transpose();
    }
);

SnapExtensions.primitives.set(
    // no longer needed because it's a regular primitive now
    'dta_crossproduct(list)',
    function (data, proc) {
        proc.assertType(data, 'list');
        return data.crossproduct();
    }
);

SnapExtensions.primitives.set(
    'dta_zip(list)',
    function (data, proc) {
        var zip, i, len,
            join = (a, b) => [a, b],
            append = (a, b) => {a.push(b); return a; },
            merge = atom => atom instanceof Array ? new List(atom) : atom;
        proc.assertType(data, 'list');
        len = data.length();
        if (len < 2) {
            return data.at(1);
        }
        zip = proc.hyperDyadic(join, data.at(1), data.at(2));
        for (i = 3; i <= len; i += 1) {
            zip = proc.hyperDyadic(append, zip, data.at(i));
        }
        return proc.hyperMonadic(merge, zip);
    }
);

SnapExtensions.primitives.set(
    'dta_changeBy(data, delta)',
    function (data, delta, proc) {
        proc.assertType(data, 'list');
        proc.hyperChangeBy(data, delta);
    }
);

SnapExtensions.primitives.set(
    'dta_export(data, name, type)',
    function (data, mime, name, proc) {
        var ide = this.parentThatIsA(IDE_Morph),
            type = mime.toString() || 'text/txt'; // also for 'text/csv' etc.
        name = name || localize('data');
        name = name.toString();
        ide.saveFileAs(data, type, name);
    }
);

SnapExtensions.primitives.set(
    'dta_import(raw?)',
    function (raw, proc) {
        // raw is a Boolean flag selecting to keep the data unparsed
        var ide = this.parentThatIsA(IDE_Morph),
            wrld = ide.world(),
            acc = proc.context.accumulator,
            inp;

        function userImport() {

            function txtOnlyMsg(ftype, anyway) {
                ide.confirm(
                    localize(
                        'Can only import "text" files. ' +
                            'You selected a file of type "' +
                            ftype +
                            '".'
                    ) + '\n\n' + localize('Open anyway?'),
                    'Unable to import',
                    anyway // callback
                );
            }

            function readText(aFile) {
                var frd = new FileReader(),
                    ext = aFile.name.split('.').pop().toLowerCase();

                function isTextFile(aFile) {
                    // special cases for Windows
                    // check the file extension for text-like-ness
                    return aFile.type.indexOf('text') !== -1 ||
                        contains(['txt', 'csv', 'xml', 'json', 'tsv'], ext);
                }

                function isType(aFile, string) {
                    return aFile.type.indexOf(string) !== -1 ||
                        (ext === string);
                }

                frd.onloadend = function (e) {
                    if (!raw && isType(aFile, 'csv')) {
                        acc.data = Process.prototype.parseCSV(e.target.result);
                    } else if (!raw && isType(aFile, 'json')) {
                        acc.data = Process.prototype.parseJSON(e.target.result);
                    } else {
                        acc.data = e.target.result;
                    }
                };

                if (raw || isTextFile(aFile)) {
                    frd.readAsText(aFile);
                } else {
                    // show a warning and an option
                    // letting the user load the file anyway
                    txtOnlyMsg(
                        aFile.type,
                        () => frd.readAsText(aFile)
                    );
                }
            }

            document.body.removeChild(inp);
            ide.filePicker = null;
            if (inp.files.length > 0) {
                readText(inp.files[inp.files.length - 1]);
            }
        }

        if (!acc) {
            acc = proc.context.accumulator = {
                data: null
            };
            if (ide.filePicker) {
                document.body.removeChild(ide.filePicker);
                ide.filePicker = null;
            }
            inp = document.createElement('input');
            inp.type = 'file';
            inp.style.color = "transparent";
            inp.style.backgroundColor = "transparent";
            inp.style.border = "none";
            inp.style.outline = "none";
            inp.style.position = "absolute";
            inp.style.top = "0px";
            inp.style.left = "0px";
            inp.style.width = wrld.width() + 'px';
            inp.style.height = wrld.height() + 'px';
            inp.addEventListener(
                "change",
                userImport,
                false
            );
            inp.addEventListener(
                "cancel",
                () => {
                    acc.data = '';
                    document.body.removeChild(inp);
                    ide.filePicker = null;
                },
                false
            );
            document.body.appendChild(inp);
            ide.filePicker = inp;
            inp.click();
        } else if (acc.data !== null) {
            return acc.data;
        }
        proc.pushContext('doYield');
        proc.pushContext();
    }
);

// Custom Data Types (adt_):

SnapExtensions.primitives.set(
    'adt_table(data)',
    function (data, proc) {
        proc.assertType(data, 'list');
        return new TableFrameMorph(
            new TableMorph(
                data.lookup('cells').asTable(data.lookup('header'))
            )
        );
    }
);

// World map (map_):

SnapExtensions.primitives.set(
    'map_zoom',
    function () {
        return this.parentThatIsA(StageMorph).worldMap.zoom;
    }
);

SnapExtensions.primitives.set(
    'map_zoom(n)',
    function (num) {
        this.parentThatIsA(StageMorph).worldMap.setZoom(num);
    }
);

SnapExtensions.primitives.set(
    'map_lon(x)',
    function (x) {
        return this.parentThatIsA(StageMorph).worldMap.lonFromSnapX(x);
    }
);

SnapExtensions.primitives.set(
    'map_lat(y)',
    function (y) {
        return this.parentThatIsA(StageMorph).worldMap.latFromSnapY(y);
    }
);

SnapExtensions.primitives.set(
    'map_view(lon, lat)',
    function (lon, lat) {
        this.parentThatIsA(StageMorph).worldMap.setView(lon, lat);
    }
);

SnapExtensions.primitives.set(
    'map_y(lat)',
    function (lat) {
        return this.parentThatIsA(StageMorph).worldMap.snapYfromLat(lat);
    }
);

SnapExtensions.primitives.set(
    'map_x(lon)',
    function (lon) {
        return this.parentThatIsA(StageMorph).worldMap.snapXfromLon(lon);
    }
);

SnapExtensions.primitives.set(
    'map_pan(x, y)',
    function (x, y) {
        this.parentThatIsA(StageMorph).worldMap.panBy(x, y);
    }
);

SnapExtensions.primitives.set(
    'map_dist(lat1, lon1, lat2, lon2)',
    function (lat1, lon1, lat2, lon2) {
        return this.parentThatIsA(StageMorph).worldMap.distanceInKm(
            lat1,
            lon1,
            lat2,
            lon2
        );
    }
);

SnapExtensions.primitives.set(
    'map_update',
    function () {
        var stage = this.parentThatIsA(StageMorph);
        stage.worldMap.extent = stage.dimensions;
        stage.worldMap.render();
    }
);

SnapExtensions.primitives.set(
    'map_loaded',
    function () {
        return !this.parentThatIsA(StageMorph).worldMap.loading;
    }
);

SnapExtensions.primitives.set(
    'map_costume',
    function () {
        return new Costume(
            this.parentThatIsA(StageMorph).worldMap.canvas,
            'map'
        );
    }
);

SnapExtensions.primitives.set(
    'map_style(name)',
    function (name) {
        this.parentThatIsA(StageMorph).worldMap.setHost(name);
    }
);

// text-to-speech, voice-to-text (tts_):

SnapExtensions.primitives.set(
    'tts_speak(txt, lang, pitch, rate)',
    function (msg, accent, pitch, rate) {
        var utter = new SpeechSynthesisUtterance(msg),
            isDone = false;
        utter.lang = accent;
        utter.pitch = pitch;
        utter.rate = rate;
        utter.onend = () => isDone = true;
        window.speechSynthesis.speak(utter);
        return () => isDone;
    }
);

SnapExtensions.primitives.set(
    'tts_activate(msg)',
    function (label, proc) {
        // create a DOM button element covering the stage displaying the
        // given label text, if any, blocking the current script's
        // execution until the user has clicked the button, which will
        // enable speech synthesis on stupid iOS / iPadOS devices,
        // where Apple forgot to activate speech synthesis when the user
        // interacts with a canvas element. Sigh.
        var button = document.getElementById('morphic_speechActivator'),
            area = this.parentThatIsA(StageMorph).extent(),
            center = this.worldPoint(new Point(0, 0)),
            acc = proc.context.accumulator;
        if (button) {
            acc = proc.context.accumulator = { blocking: true };
            proc.pushContext('doYield');
            proc.pushContext();
        } else if (!acc?.blocking) {
            acc = proc.context.accumulator = { blocking: true };
            button = document.createElement("button");
            button.setAttribute('id', 'morphic_speechActivator');
            button.textContent = label;
            button.style.position = 'absolute';
            button.style.width = Math.max(20, area.x) + 'px';
            button.style.height = Math.max(10, area.y) + 'px';

            button.onclick = () => {
                window.speechSynthesis.speak(new SpeechSynthesisUtterance());
                document.body.removeChild(button);
                acc.blocking = false;
            };

            document.body.appendChild(button);
            button.style.left = center.x - (button.offsetWidth / 2) + 'px';
            button.style.top = center.y - (button.offsetHeight / 2) + 'px';
            button.focus();
            proc.pushContext('doYield');
            proc.pushContext();
        }
    }
);

SnapExtensions.primitives.set(
    'tts_recognize',
    function (proc) {
        var sprec, done,
            acc = proc.context.accumulator;
        if (!acc) {
            sprec = window.SpeechRecognition ||
                window.webkitSpeechRecognition ||
                window.mozSpeechRecognition ||
                window.msSpeechRecognition;
            if (!sprec) {
                throw new Error('Speech Recognition is unavailable');
            }
            acc = proc.context.accumulator = {
                start: false,
                voice: new sprec(),
                text: null
            };
            acc.voice.onresult = (event) => {
                acc.text = event.results[0][0].transcript;
            };
            acc.voice.onspeechstart = () => acc.start = true;
            done = () => acc.text = '';
            acc.voice.onnomatch = done;
            acc.voice.orreror = done;
            acc.voice.start();
        } else if (acc.text !== null) {
            return acc.text;
        }
        proc.pushContext('doYield');
        proc.pushContext();
    }
);

SnapExtensions.primitives.set(
    'tts_started',
    function () {
        var started = false;
        this.parentThatIsA(StageMorph).threads.processes.forEach(proc => {
            if (proc?.context?.accumulator?.voice) {
                started = proc.context.accumulator.start;
            }
        });
        return started;
    }
);

SnapExtensions.primitives.set(
    'tts_stop',
    function () {
        this.parentThatIsA(StageMorph).threads.processes.forEach(proc => {
            if (proc?.context?.accumulator?.voice) {
                proc.context.accumulator.text = '';
            }
        });
    }
);

// XHR:

SnapExtensions.primitives.set(
    'xhr_binary(url, webIDL_type)',
    function (url, idl, proc) {
        var response, buffer;
        url = decodeURI(url);
        proc.checkURLAllowed(url);
        if (!proc.httpRequest) {
            proc.httpRequest = new XMLHttpRequest();
            proc.httpRequest.open("GET", url, true);
            proc.httpRequest.responseType = "arraybuffer";
            proc.httpRequest.send(null);
        } else if (proc.httpRequest.readyState === 4) {
            buffer = proc.httpRequest.response;
            switch (idl) {
                case 'byte':
                    response = new List(new Int8Array(buffer));
                    break;
                case 'short':
                    response = new List(new Int16Array(buffer));
                    break;
                case 'unsigned short':
                    response = new List(new Uint16Array(buffer));
                    break;
                case 'long':
                    response = new List(new Int32Array(buffer));
                    break;
                case 'unsigned long':
                    response = new List(new Uint32Array(buffer));
                    break;
                case 'unrestricted float':
                    response = new List(new Float32Array(buffer));
                    break;
                case 'unrestricted double':
                    response = new List(new Float64Array(buffer));
                    break;
                case 'bigint':
                    response = new List(new BigUint64Array(buffer));
                    break;
                case 'octet':
                default:
                    response = new List(new Uint8Array(buffer));
            }
            proc.httpRequest = null;
            return response;
        }
        proc.pushContext('doYield');
        proc.pushContext();
    }
);

SnapExtensions.primitives.set(
    'xhr_request(mth, url, dta, hdrs)',
    function (method, url, data, headers, proc) {
        var response, i, header;
        url = decodeURI(url);
        Process.prototype.checkURLAllowed(url);
        if (!proc.httpRequest) {
            proc.httpRequest = new XMLHttpRequest();
            proc.httpRequest.open(method, url, true);
            proc.assertType(headers, 'list');
            for (i = 1; i <= headers.length(); i += 1) {
                header = headers.at(i);
                proc.assertType(header, 'list');
                proc.httpRequest.setRequestHeader(
                    header.at(1),
                    header.at(2)
                );
            }
            proc.httpRequest.send(data || null);
        } else if (proc.httpRequest.readyState === 4) {
            response = proc.httpRequest.responseText;
            proc.httpRequest = null;
            return response;
        }
        proc.pushContext('doYield');
        proc.pushContext();
    }
);

// Geo-location (geo_):

SnapExtensions.primitives.set(
    'geo_location(acc?)',
    function (includeAccuracy) {
        var crd = new List(),
            myself = this,
            options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };

        function success(pos) {
            crd = new List([
                pos.coords.latitude,
                pos.coords.longitude
            ]);
            if (includeAccuracy) {
                crd.add(pos.coords.accuracy);
            }
        }

        function error(err) {
            crd = new List([37.872099, -122.257852]);
            myself.inform('Warning:\nGeolocation failed.');
        }

        navigator.geolocation.getCurrentPosition(
            success,
            error,
            options
        );
        return () => crd;
    }
);

// Device Orientation (ori_ "tilt")

SnapExtensions.primitives.set(
    'ori_tilt(xyz)',
    function (axis) {
        var ide = this.parentThatIsA(IDE_Morph),
            isPortrait = window.matchMedia("(orientation: portrait)").matches,
            myself = this,
            x, y, z;

        function updateTilt(event) {
            var z = event.alpha || 0;
            ide.tilt.put(event.gamma || 0, 1);
            ide.tilt.put(-(event.beta || 0), 2);
            ide.tilt.put(z >= 180 ? 360 - z : -z, 3);
        }

        function userTriggerTilt() {
            DeviceOrientationEvent.requestPermission().then(response => {
                if (response === 'granted') {
                    // Permission granted
                    window.addEventListener(
                        'deviceorientation',
                        updateTilt
                    );
                } else {
                    // Permission denied
                    myself.inform('Warning:\nDevice orientation failed.');
                }
            }).catch(console.error);
        }

        function activate() {
            if (typeof(DeviceOrientationEvent) !== 'undefined' &&
                typeof(DeviceOrientationEvent.requestPermission) === 'function'
            ) {
                ide.confirm(
                    'Activate device orientation',
                    'Tilt Sensor',
                    userTriggerTilt
                );
            } else {
                // other devices
                window.addEventListener('deviceorientation', updateTilt);
            }
        }

        if (!ide.tilt) {
            ide.tilt = new List([0, 0, 0]);
            activate();
        }

        x = isPortrait ? ide.tilt.at(1) : -ide.tilt.at(2);
        y = ide.tilt.at(isPortrait ? 2 : 1);
        z = ide.tilt.at(3);
        if (!isPortrait) {
            z = (z > 90 ? z - 180 : z + 90);
        }
        switch (axis) {
            case 'x':
                return x;
            case 'y':
                return y;
            case 'z':
                return z;
            default:
                return isPortrait ? ide.tilt : new List([x, y, z]);
        }
    }
);

// MediaComp (mda_)

SnapExtensions.primitives.set(
    'mda_snap',
    function () {
        var camDialog,
            result = false;
        camDialog = new CamSnapshotDialogMorph(
            this.parentThatIsA(IDE_Morph),
            this,
            () => result = null,
            function (costume) {
                result = costume;
                this.close();
            }
        );
        camDialog.key = 'camera';
        camDialog.popUp(this.world());
        return () => result;
    }
);

SnapExtensions.primitives.set(
    'mda_record',
    function () {
        var soundRecorder,
            result = false;
        soundRecorder = new SoundRecorderDialogMorph(
            function (audio) {
                if (audio) {
                    result = new Sound(audio, 'recording');
                } else {
                    result = null;
                    this.destroy();
                }
            }
        );

        soundRecorder.cancel = function () {
            result = null;
            this.destroy();
        };

        soundRecorder.key = 'microphone';
        soundRecorder.popUp(this.world());
        return () => result;
    }
);

SnapExtensions.primitives.set(
    'mda_set_mic_resolution(idx)',
    function (idx, proc) {
        proc.assertType(+idx, 'number');
        var microphone = this.parentThatIsA(StageMorph).microphone;
        microphone.setResolution(+idx);
    }
);

// Database (db_):

SnapExtensions.primitives.set(
    'db_store(key, val)',
    function (key, value, proc) {
        proc.assertType(key, ['text', 'number']);
        proc.assertType(value, ['text', 'number']);
        window.localStorage.setItem('-snap-project-' + key, '' + value);
    }
);

SnapExtensions.primitives.set(
    'db_getall',
    function () {
        var str = window.localStorage,
            len = str.length,
            result = [],
            key,
            i;
        for (i = 0; i < len; i += 1) {
            key = str.key(i);
            if (key.startsWith('-snap-project-')) {
                result.push(new List([key.slice(14), str.getItem(key)]));
            }
        }
        return new List(result);
    }
);

SnapExtensions.primitives.set(
    'db_remove(key)',
    function (key, proc) {
        proc.assertType(key, ['text', 'number']);
        window.localStorage.removeItem('-snap-project-' + key);
    }
);

SnapExtensions.primitives.set(
    'db_get(key)',
    function (key) {
        var str = window.localStorage,
            result = str.getItem('-snap-project-'+key);
        if (!result) {
           return false;
        }
        return result;
    }
);

// Object properties (obj_):

SnapExtensions.primitives.set(
    'obj_name(obj, name)',
    function (obj, name, proc) {
        var ide = this.parentThatIsA(IDE_Morph);
        proc.assertType(obj, ['sprite', 'stage', 'costume', 'sound']);
        name = name.toString();
        if (isSnapObject(obj)) {
            obj.setName(ide.newSpriteName(name, obj));
        } else if (obj instanceof Costume) {
            obj.name = this.newCostumeName(name, obj);
            obj.version = Date.now();
            ide.hasChangedMedia = true;
            ide.recordUnsavedChanges();
        } else if (obj instanceof Sound) {
            obj.name = ide.newSoundName(name);
            ide.hasChangedMedia = true;
            ide.recordUnsavedChanges();
        }
    }
);

SnapExtensions.primitives.set(
    'obj_version(obj)',
    function (obj) {
        return +(obj instanceof List ? obj.lastChanged : obj?.version) || 0;
    }
);

// Costumes (cst_):

SnapExtensions.primitives.set(
    'cst_load(url)',
    function (url, proc) {
        if (!proc.context.accumulator) {
            proc.context.accumulator = {
                img: new Image(),
                cst: null,
            };
            proc.context.accumulator.img.onload = function () {
                var canvas = newCanvas(new Point(this.width, this.height));
                canvas.getContext('2d').drawImage(this, 0, 0);
                proc.context.accumulator.cst = new Costume(canvas);
            };
            proc.context.accumulator.img.src = url;
        } else if (proc.context.accumulator.cst) {
            return proc.context.accumulator.cst;
        }
        proc.pushContext('doYield');
        proc.pushContext();
    }
);

SnapExtensions.primitives.set(
    'cst_export(cst, name)',
    function (cst, name, proc) {
        var ide = this.parentThatIsA(IDE_Morph);
        proc.assertType(cst, 'costume');
        name = name || cst.name || localize('costume');
        proc.assertType(name, ['text', 'number']);
        name = name.toString();
        if (cst instanceof SVG_Costume) {
            ide.saveFileAs(cst.contents.src, 'text/svg', name);
        } else if (cst.embeddedData) {
            // embed payload data (e.g blocks)  inside the PNG image data
            ide.saveFileAs(cst.pngData(), 'image/png', name);
        } else { // rasterized Costume
            ide.saveCanvasAs(cst.contents, name);
        }
    }
);

SnapExtensions.primitives.set(
    // experimental, will probably be taken out again, don't rely on this
    'cst_embed(cst, data)',
    function (cst, data, proc) {
        var ide = this.parentThatIsA(IDE_Morph);
        proc.assertType(cst, 'costume');
        proc.assertType(data, 'text');
        if (cst instanceof SVG_Costume) {
            throw new Error('option currently not supported for SVG costumes');
        }
        cst.embeddedData = data || null;
        cst.version = Date.now();
        ide.recordUnsavedChanges();
    }
);

SnapExtensions.primitives.set(
    'cst_morph(cst)',
    function (costume, proc) {
        var m = new Morph(),
            img;
        proc.assertType(costume, 'costume');
        img = costume.contents;
        m.isCachingImage = true;
        m.bounds.setWidth(img.width);
        m.bounds.setHeight(img.height);
        m.cachedImage = img;
        return m;
    }
);

// Variables (var_):

SnapExtensions.primitives.set(
    'var_declare(scope, name)',
    function (scope, name, proc) {
        var ide, frame;
        proc.assertType(name, ['text', 'number']);
        if (name === '') {return; }
        if (scope === 'script') {
            frame = proc.context.isInCustomBlock() ?
                        proc.homeContext.variables
                        : proc.context.outerContext.variables;
        } else if (scope === 'sprite') {
            frame = this.variables;
        } else {
            frame = this.globalVariables();
        }
        if (frame.vars[name] === undefined) {
            frame.addVar(name);
            ide = this.parentThatIsA(IDE_Morph);
            ide.flushBlocksCache('variables'); // b/c of inheritance
            ide.refreshPalette();
        }
    }
);

SnapExtensions.primitives.set(
    'var_names(scope)',
    function (scope, proc) {
        var frame;
        if (scope === 'script') {
            frame = proc.context.isInCustomBlock() ?
                        proc.homeContext.variables
                        : proc.context.outerContext.variables;
        } else if (scope === 'sprite') {
            frame = this.variables;
        } else {
            frame = this.globalVariables();
        }
        return new List(frame.allNames());
    }
);

SnapExtensions.primitives.set(
    'var_delete(name)',
    function (name, proc) {
        var local;
        proc.assertType(name, ['text', 'number']);
        name = name.toString();
        if (name === '') {return; }
        local = proc.context.isInCustomBlock() ?
                        proc.homeContext.variables
                        : proc.context.outerContext.variables;
        if (local.vars[name] !== undefined) {
            delete local.vars[name];
        } else if (this.deletableVariableNames().indexOf(name) > -1) {
            this.deleteVariable(name);
        }
    }
);

SnapExtensions.primitives.set(
    'var_get(name)',
    function (name, proc) {
        proc.assertType(name, ['text', 'number']);
        return proc.homeContext.variables.getVar(name);
    }
);

SnapExtensions.primitives.set(
    'var_set(name, val)',
    function (name, val, proc) {
        var local;
        proc.assertType(name, ['text', 'number']);
        if (name === '') {return; }
        local = proc.context.isInCustomBlock() ?
                        proc.homeContext.variables
                        : proc.context.outerContext.variables;
        local.setVar(name, val);
    }
);

SnapExtensions.primitives.set(
    'var_show(name)',
    function (name, proc) {
        proc.doShowVar(
            name,
            proc.context.isInCustomBlock() ?
                proc.homeContext
                : proc.context.outerContext
        );
    }
);

SnapExtensions.primitives.set(
    'var_hide(name)',
    function (name, proc) {
        proc.doHideVar(
            name,
            proc.context.isInCustomBlock() ?
                proc.homeContext
                : proc.context.outerContext
        );
    }
);

SnapExtensions.primitives.set(
    'var_showing(name)?',
    function (name, proc) {
        var stage = this.parentThatIsA(StageMorph),
            frame = proc.context.isInCustomBlock() ?
                        proc.homeContext.variables
                        : proc.context.outerContext.variables,
            target = frame.silentFind(name),
            watcher;

        if (!target) {return false; }
        watcher = detect(
            stage.children,
            morph => morph instanceof WatcherMorph &&
                morph.target === target &&
                    morph.getter === name
        );
        return watcher ? watcher.isVisible : false;
    }
);

// IDE (ide_):

// Returns all blocks of the current sprite, regardless of visibility
SnapExtensions.primitives.set(
    'ide_blocks',
    function () {
        return new List(
            this.allPaletteBlocks().filter(
                each => each instanceof BlockMorph &&
                    !(each instanceof HatBlockMorph)
            ).map(block => {
                let instance = block.fullCopy();
                instance.isTemplate = false;
                return instance.reify();
            })
        );
    }
);

SnapExtensions.primitives.set(
    'ide_hide(block)',
    function (context, proc) {
        var ide = this.parentThatIsA(IDE_Morph);
        proc.assertType(context, ['command', 'reporter', 'predicate', 'hat']);
        this.changeBlockVisibility(context.expression, true);
        ide.flushBlocksCache();
        ide.refreshPalette();
        ide.refreshEmptyCategories();
    }
);

SnapExtensions.primitives.set(
    'ide_show(block)',
    function (context, proc) {
        var ide = this.parentThatIsA(IDE_Morph);
        proc.assertType(context, ['command', 'reporter', 'predicate', 'hat']);
        this.changeBlockVisibility(context.expression, false);
        ide.flushBlocksCache();
        ide.refreshPalette();
        ide.refreshEmptyCategories();
    }
);

/*
SnapExtensions.primitives.set(
    // not needed right now, commented out for possibly later
    'ide_refreshpalette(name)',
    function (name) {
        var ide = this.parentThatIsA(IDE_Morph);
        if (name !== 'variables') {
            ide.flushBlocksCache(name);
        }
        ide.flushBlocksCache('variables'); // b/c of inheritance
        ide.refreshPalette();
    }
);
*/

SnapExtensions.primitives.set(
    'ide_translate(text)',
    function (text, proc) {
        return proc.hyper(
            txt => {
                proc.assertType(txt, ['text', 'number']);
                return localize(txt);
            },
            text
        );
    }
);

SnapExtensions.primitives.set(
    'ide_translateback(text)',
    function (text, proc) {
        var dict = SnapTranslator.dict[SnapTranslator.language];
        return proc.hyper(
            txt => {
                proc.assertType(txt, ['text', 'number']);
                return detect(
                    Object.keys(dict),
                    key => dict[key] === txt
                ) || txt;
            },
            text
        );
    }
);

SnapExtensions.primitives.set(
    'ide_language',
    function () {
        return SnapTranslator.language;
    }
);

SnapExtensions.primitives.set(
    'ide_setlang(language, [msg])',
    function (lang, msg, proc) {
        var ide = this.parentThatIsA(IDE_Morph),
            disabled = ['receiveGo', 'receiveCondition', 'receiveMessage'],
            flag = ide.isAppMode,
            restoreMode = () => {
                ide.toggleAppMode(flag);
                ide.stage.fireUserEditEvent(
                    ide.currentSprite.name,
                        ['project', 'language', lang],
                        ide.version
                    );
                },
            callback = restoreMode;
        proc.assertType(lang, 'text');
        ide.loadNewProject = false;
        if (isString(msg) && !contains(disabled, proc.topBlock.selector)) {
            // require an explicit user input to trigger a project reload
            callback = () => {
                restoreMode();
                ide.broadcast(msg);
            };
        }
        ide.setLanguage(lang, callback, true); // don't save language setting
    }
);

SnapExtensions.primitives.set(
    'ide_translations',
    function () {
        return new List(
            SnapTranslator.languages().map(lang =>
                new List([SnapTranslator.languageName(lang), lang])
            )
        );
    }
);

SnapExtensions.primitives.set(
    'ide_translation_dict',
    function () {
        var dict = SnapTranslator.dict[SnapTranslator.language];
        return new List(
            Object.keys(dict).slice().sort().map(key =>
                new List([key, dict[key]]))
        );
    }
);

SnapExtensions.primitives.set(
    'ide_set_translation_dict(data)',
    function (data, proc) {
        var ide = this.parentThatIsA(IDE_Morph),
            dict = {};
        proc.assertType(data, 'list');
        data.map(eachRow => dict[eachRow.at(1)] = eachRow.at(2));
        SnapTranslator.dict[SnapTranslator.language] = dict;
        ide.reflectLanguage(SnapTranslator.language);
    }
);

// Tutorials & Cloned Scenes (scn_)

SnapExtensions.primitives.set(
    'scn_exit',
    function () {
        var stage = this.parentThatIsA(StageMorph);
        if (!stage.tutorialMode) {return; }
        stage.parentThatIsA(DialogBoxMorph).ok();
    }
);

SnapExtensions.primitives.set(
    'scn_scale(num)',
    function (scale, proc) {
        var wrld = this.world(),
            stage = this.parentThatIsA(StageMorph),
            acc = proc.context.accumulator,
            dlg, center;
        if (!stage.tutorialMode) {return; }
        if (!scale) {return stage.scale; }
        dlg = stage.parentThatIsA(DialogBoxMorph);
        center = dlg.center();
        if (dlg.ide.isAnimating) {
            if (!proc.context.accumulator) {
                acc = proc.context.accumulator = {progress: true };
                wrld.animations.push(new Animation(
                    s => { // setter
                        stage.setScale(s);
                        dlg.fixLayout();
                        dlg.setCenter(center);
                        dlg.keepWithin(wrld);
                        center = dlg.center();
                    },
                    () => stage.scale, // getter
                    Math.max(scale, dlg.minScale) - stage.scale, // delta
                    300, // duration in ms
                    t => Math.pow(t, 6), // easing
                    () => acc.progress = false // null // onComplete
                ));
            } else if (!acc.progress) {
                return;
            }
            proc.pushContext('doYield');
            proc.pushContext();
        } else {
            stage.setScale(scale);
            dlg.fixLayout();
            dlg.setCenter(center);
            dlg.keepWithin(wrld);
        }
    }
);

SnapExtensions.primitives.set(
    'scn_position(pane, x, y)',
    function (pane, x = 0, y = 0, proc = null) {
        var stage = this.parentThatIsA(StageMorph),
            acc = proc.context.accumulator,
            dlg, rect, area, target;

        if (!stage.tutorialMode) {return; }
        dlg = stage.parentThatIsA(DialogBoxMorph);

        switch(pane.toLowerCase()) {
        case 'ide':
            rect = dlg.ide.bounds;
            break;
        case 'stage':
            rect = dlg.ide.stage.bounds;
            break;
        case 'palette':
            rect = dlg.ide.palette.bounds;
            break;
        case 'corral':
            rect = dlg.ide.corral.bounds;
            break;
        case 'scripts':
            rect = dlg.ide.spriteEditor.bounds;
            break;
        default:
            return;
        }
        area = rect.extent().subtract(dlg.extent());
        target = rect.origin.add(
            area.multiplyBy(new Point(+x, -(+y)).add(1).divideBy(2))
        );

        if (dlg.ide.isAnimating) {
            if (!proc.context.accumulator) {
                acc = proc.context.accumulator = {progress: true };
                dlg.glideTo(
                    target,
                    300, // msecs
                    t => Math.pow(t, 6), // easing
                    () => {
                        // dlg.keepWithin(wrld);
                        acc.progress = false;
                    }
                );
            } else if (!acc.progress) {
                return;
            }
            proc.pushContext('doYield');
            proc.pushContext();
        } else {
            dlg.setPosition(target);
        }
    }
);

SnapExtensions.primitives.set(
    'scn_dimensions(pane)',
    function (pane) {
        var stage = this.parentThatIsA(StageMorph),
            dlg, rect;

        if (!stage.tutorialMode) {return ''; }
        dlg = stage.parentThatIsA(DialogBoxMorph);

        switch(pane.toLowerCase()) {
        case 'ide':
            rect = dlg.ide.bounds;
            break;
        case 'stage':
            rect = dlg.ide.stage.bounds;
            break;
        case 'palette':
            rect = dlg.ide.palette.bounds;
            break;
        case 'corral':
            rect = dlg.ide.corral.bounds;
            break;
        case 'scripts':
            rect = dlg.ide.spriteEditor.bounds;
            break;
        case 'tutorial':
            rect = dlg.bounds;
            break;
        default:
            return;
        }
        return new List([rect.left(), rect.top(), rect.right(), rect.bottom()]);
    }
);

// Autograding / Code-critique / structural help - mostly for tutorials (meta_)

SnapExtensions.primitives.set(
    'meta_current(asset)', // sprite, sprites, stage, scripts, category, tab
    function (choice, proc) {
        var stage = this.parentThatIsA(StageMorph),
            dlg, ide;
        if (!stage.tutorialMode) {return; }
        dlg = stage.parentThatIsA(DialogBoxMorph);
        ide = dlg ? dlg.ide : stage.parentThatIsA(IDE_Morph);
        if (!ide) {return ''; }

        switch (choice) {
        case 'scripts':
            return new List(
                ide.currentSprite.scripts.sortedElements().filter(
                    each => each instanceof BlockMorph
                ).map(
                    each => each.fullCopy().reify()
                )
            );
        case 'sprites':
            return ide.sprites;
        case 'stage':
            return ide.stage;
        case 'tab':
            return ide.currentTab;
        case 'category':
            return ide.categories.buttons.find(each =>
                each.state).category;
        default: // 'sprite'
            return ide.currentSprite;
        }
    }
);

SnapExtensions.primitives.set(
    'meta_current_sprite',
    function (proc) {
        var stage = this.parentThatIsA(StageMorph),
            dlg, ide;
        if (!stage.tutorialMode) {return; }
        dlg = stage.parentThatIsA(DialogBoxMorph);
        ide = dlg ? dlg.ide : stage.parentThatIsA(IDE_Morph);
        if (!ide) {return ''; }
        return ide.currentSprite;
    }
);

// Synchronization

SnapExtensions.primitives.set(
    'syn_scripts([xml])',
    function (xml, proc) {
        if (xml instanceof Process) {
            return this.scriptsOnlyXML();
        }
        proc.assertType(xml, 'text');
        this.synchScriptsFrom(xml);
    }
);

// Pen - drawing shapes

SnapExtensions.primitives.set(
    'pen_path(points, [fill, close])',
    function (points, fill, close, proc) {
        proc.assertType(this, 'sprite');
        proc.assertType(points, 'list');
        if (points.itemsArray().some(any => !proc.isCoordinate(any))) {
            throw new Error('expecting a list of x/y coordinates');
        }
        this.drawPath(points, fill, close);
    }
);

// Colors (clr_):

SnapExtensions.primitives.set(
    'clr_rgba(r, g, b, a)',
    function (r, g, b, a) {
        return new Color(r, g, b, a);
    }
);

SnapExtensions.primitives.set(
    'clr_channel(clr, rgba)',
    function (clr, rgba) {
        if (contains(['r', 'g', 'b', 'a'], rgba)) {
            return clr[rgba];
        }
        throw new Error('unknown rgba color channel "' + rgba + '"');
    }
);

SnapExtensions.primitives.set(
    'clr_hsv(clr)',
    function (clr) {
        return new List(clr.hsv());
    }
);

SnapExtensions.primitives.set(
    'clr_hsv(h, s, v)',
    function (h, s, v) {
        var c = new Color();
        c.set_hsv(h, s, v);
        return c;
    }
);

SnapExtensions.primitives.set(
    'clr_hsl(clr)',
    function (clr) {
        return new List(clr.hsl());
    }
);

SnapExtensions.primitives.set(
    'clr_hsl(h, s, l)',
    function (h, s, l) {
        var c = new Color();
        c.set_hsl(h, s, l);
        return c;
    }
);

SnapExtensions.primitives.set(
    'clr_setpen(clr)',
    function (clr) {
        this.setColor(clr);
    }
);

SnapExtensions.primitives.set(
    'clr_pen',
    function () {
        return this.color;
    }
);

// web serial (srl_):

SnapExtensions.primitives.set(
    'srl_open(baud, buffer)',
    function (baud, buf, proc) {
        var acc = proc.context.accumulator,
            stage = this.parentThatIsA(StageMorph),
            world = stage.world(),
            snapProcessBlockDef =
                stage.globalBlocks.find(
                    def => def.spec == '__mb_process_data__'
                );

        function readCallback (port) {
            var block = snapProcessBlockDef.blockInstance();
            if (block && port?.connected && port?.writable) {
                block.parent = stage;
                try {
                    invoke(
                        block,
                        null,  // args
                        stage  // receiver
                    );
                    world.schedule(() => readCallback(port));
                } catch (err) {
                    throw(err);
                }
            }
        }

        async function forceClose(port){
            try {
                if (!port?.writable) {return; } // already closed
                // console.log("force close...", port);
                if (port._reader) {await port._reader.cancel(); }
                if (port?.readable) {await port.readable.cancel(); }
                if (port?.writable) {await port.writable.abort(); }
                if (port?.writable) {await port.close(); } // close if open
            } catch (e) {
                // console.log( e);
                acc.result = e;
            }
        }

        if (!acc) {
            acc = proc.context.accumulator = {result: false};
            (async function (baud) {
                try {
                    var port;
                    port = await navigator.serial.requestPort();
                    await forceClose(port);
                    await port.open({
                        baudRate: baud,
                        bufferSize: buf || 15000
                    });
                    acc.result = port;
                    port._bklog = [];//backlog
                } catch(e) {
                    acc.result = e;
                }
            }) (baud || 115200);
        } else if (acc.result !== false) {
            if (acc.result instanceof Error) {
                throw acc.result;
            }
            if (snapProcessBlockDef) {
                readCallback(acc.result);
            }
            return acc.result;
        }
        proc.pushContext('doYield');
        proc.pushContext();
    }
);

SnapExtensions.primitives.set(
    'srl_close(port)',
    function (port, proc) {
        var acc = proc.context.accumulator;

        if (!acc) {
            acc = proc.context.accumulator = {result: false};
            (async function (port) {
                try {
                    // console.log("pending close...", port);
                    if (port._reader) {await port._reader.cancel(); }
                    if (port?.readable) {await port.readable.cancel(); }
                    if (port?.writable) {await port.writable.abort(); }
                    if (port?.readable || port?.writable) {await port.close(); }
                    acc.result =  true;
                } catch (e) {
                    // console.log(e);
                    acc.result = e;
                }
            }) (port);
        } else if (acc.result !== false) {
            if (acc.result instanceof  Error) {
                throw acc.result;
            }
            return;
        }
        proc.pushContext('doYield');
        proc.pushContext();
    }
);

SnapExtensions.primitives.set(
    'srl_read(port)',
    function (port, proc) {
        var acc = {result: false};
        if(!port?.readable) {throw Error( "Port not opened."); }
        if( port.readable?.locked){ //No reentry
            return (port._bklog?.length > 0) ? port._bklog.splice(0) : true;
        }
        (async function (port) {
            var reader, data;
            try {
                reader = port._reader = port.readable.getReader();
                data = await reader.read();
                delete port._reader;
                if( data.value){
                    port._bklog.push( ...data.value);
                }
            } catch (e) {
                await reader.cancel();
                acc.result = e;
            }
            if (reader) {await reader.releaseLock(); }
        }) (port);

        if (acc.result !== false) {
            if (acc.result instanceof  Error) {
                throw acc.result;
            }
            return acc.result;
        }

        return (port._bklog?.length > 0) ?
            new List( Array.from( port._bklog.splice(0)))
            : true;
    }
);

SnapExtensions.primitives.set(
    'srl_write(port, bytes)',
    function (port, bytes, proc) {
        var acc = proc.context.accumulator;

        if (!acc) {
            acc = proc.context.accumulator = {result: false};
            (async function (port, bytes) {
                var writer;
                try {
                    if (!port?.writable) {throw Error( "Port not opened."); }
                    try {
                        writer = port.writable.getWriter();
                        await writer.write(Uint8Array.from( bytes.itemsArray()));
                        acc.result =  true;
                    } finally {
                        await writer.close();
                    }
                } catch(e) {
                    acc.result = e;
                }
            }) (port, bytes);

        } else if (acc.result !== false) {
            if (acc.result instanceof  Error) {
                throw acc.result;
            }
            return;
        }
        proc.pushContext('doYield');
        proc.pushContext();
    }
);

// loading external scripts (src_):

SnapExtensions.primitives.set(
    'src_load(url)',
    function (url, proc) {
        var scriptElement;
        if (!proc.context.accumulator) {
            proc.context.accumulator = {done: false};
            if (contains(SnapExtensions.scripts, url)) {
                return;
            }
            if (Process.prototype.enableJS || SnapExtensions.urls.some(
                any => url.indexOf(any) === 0)
            ) {
                scriptElement = document.createElement('script');
                scriptElement.onload = () => {
                    SnapExtensions.scripts.push(url);
                    proc.context.accumulator.done = true;
                };
                document.head.appendChild(scriptElement);
                scriptElement.src = url;
            } else {
                throw new Error(
                    'unlisted extension url:\n"' + url + '"\n' +
                    'JavaScript extensions for Snap!\nare turned off'
                );
            }
        } else if (proc.context.accumulator.done) {
            return;
        }
        proc.pushContext('doYield');
        proc.pushContext();
    }
);

// Menus

SnapExtensions.menus.set(
    'clr_numbers', // Brian's browns and oranges, sigh...
    function () {
        var menuName = this.parent.inputs()[0].evaluate(), // first slot
            output,
            menus = {
                'color number': [
                    "0 black=0",
                    "14 white=14",
                    "20 spectral red=20",
                    "25 darkest red=25",
                    "30 saddle brown=30",
                    "35 darkest brown=35",
                    "40 spectral orange=40",
                    "45 darkest orange=45",
                    "50 spectral yellow=50",
                    "55 darkest yellow=55",
                    "60 spectral green=60",
                    "65 darkest green=65",
                    "70 spectral cyan=70",
                    "75 darkest cyan=75",
                    "80 spectral blue=80",
                    "85 darkest blue=85",
                    "90 spectral violet=90",
                    "95 magenta=95"
                ],
                'fair hue': [
                    "0 red=0",
                    "12.5 brown=12.5",
                    "25 orange=25",
                    "37.5 yellow=37.5",
                    "50 green=50",
                    "62.5 cyan=62.5",
                    "75 blue=75",
                    "87.5 violet=87.5"
                ],
                'crayon': [
                    "grays",
                    [
                        "0 black #000000=0",
                        "1 gray7 #121212=1",
                        "2 gray14 #242424=2",
                        "3 gray21 #363636=3",
                        "4 gray28 #484848=4",
                        "5 gray36 #5c5c5c=5",
                        "6 gray43 #6d6d6d=6",
                        "7 gray50 #7f7f7f=7",
                        "8 gray57 #919191=8",
                        "9 gray64 #a3a3a3=9",
                        "10 gray71 #b5b5b5=10",
                        "11 gray78 #c8c8c8=11",
                        "12 gray85 #dadada=12",
                        "13 gray92 #ececec=13",
                        "14 white #ffffff=14"
                    ],
                    "pinks",
                    [
                        "15 deep pink #ff1493=15",
                        "16 hot pink #ff69b4=16",
                        "17 bright pink #ff007f=17",
                        "18 raspberry #e30b5d=18",
                        "19 amaranth #e52b50=19"
                    ],
                    "reds",
                    [
                        "20 red #ff0000=20",
                        "21 burgundy #900020=21",
                        "22 cherry #990000=22",
                        "23 dark candy apple red #a40000=23",
                        "24 sanguine #c00000=24",
                        "25 maroon #800000=25",
                        "26 crimson #c90016=26",
                        "27 Lists #d94d11=27",
                        "28 candy apple red #ff0800=28",
                        "29 coquelicot #ff3800=29"
                    ],
                    "browns",
                    [
                        "30 saddle brown #8b4513=30",
                        "31 chocolate #7b3f00=31",
                        "32 kobicha #6b4423=32",
                        "33 sepia #704214=33",
                        "34 chestnut #954535=34",
                        "35 dark brown #654321=35",
                        "36 brown #964b00=36",
                        "37 golden brown #996515=37",
                        "38 cinnamon #b87333=38",
                        "39 copper #d2691e=39"
                    ],
                    "oranges",
                    [
                        "40 orange #ff7f00=40",
                        "41 Pantone orange #ff5800=41",
                        "42 pumpkin #ff7518=42",
                        "43 Variables #f3761d=43",
                        "44 Spanish orange #e86100=44",
                        "45 burnt orange #cc5500=45",
                        "46 sinopia #cb410b=46",
                        "47 ochre #cc7722=47",
                        "48 carrot #ed9121=48",
                        "49 tangerine #f28500=49"
                    ],
                    "yellows",
                    [
                        "50 yellow #ffff00=50",
                        "51 Control #e6a822=51",
                        "52 dark goldenrod #b8860b=52",
                        "53 goldenrod #daa520=53",
                        "54 saffron #f4c430=54",
                        "55 sandstorm #ecd540=55",
                        "56 mustard #ffdb58=56",
                        "57 gold #ffd700=57",
                        "58 egg yolk #fee33e=58",
                        "59 rubber duck #fbe108=59"
                    ],
                    "greens",
                    [
                        "60 lime #00ff00=60",
                        "61 apple green #8db600=61",
                        "62 Operators #62c213=62",
                        "63 forest green #228b22=63",
                        "64 green #008000=64",
                        "65 dark green #006400=65",
                        "66 dark pastel green #03c03c=66",
                        "67 emerald #50c878=67",
                        "68 mint #3eb489=68",
                        "69 Pen #00a178=69"
                    ],
                    "cyans",
                    [
                        "70 aqua (cyan) #00ffff=70",
                        "71 dark cyan #008b8b=71",
                        "72 cerulean #007ba7=72",
                        "73 iceberg #71a6d2=73",
                        "74 Sensing #0494dc=74",
                        "75 teal #008080=75",
                        "76 light sky blue #87cefa=76",
                        "77 deep sky blue #00bfff=77",
                        "78 dodger blue #1e90ff=78",
                        "79 azure #007fff=79"
                    ],
                    "blues",
                    [
                        "80 blue #0000ff=80",
                        "81 midnight blue #191970=81",
                        "82 dark powder blue #003399=82",
                        "83 cobalt #0047ab=83",
                        "84 denim #1560bd=84",
                        "85 navy blue #000080=85",
                        "86 steel blue #4682b4=86",
                        "87 Motion #4a6cd4=87",
                        "88 cornflower #6495ed=88",
                        "89 slate blue #6a5acd=89"
                    ],
                    "purples",
                    [
                        "90 violet #8000ff=90",
                        "91 Looks #8f56e3=91",
                        "92 grape #6f2da8=92",
                        "93 indigo #4b0082=93",
                        "94 x11 purple #a020f0=94",
                        "95 magenta (fuchia) #ff00ff=95",
                        "96 dark orchid #9932cc=96",
                        "97 Sound #cf4ad9=97",
                        "98 purple #7f007f=98",
                        "99 dark magenta #8b008b=99"
                    ]
                ]
            };

        function makeMenuHelper(items, output) {
            // in an array, walk through the items in pairs
            var i = 0,
                label, possiblyNested, hasEquals, nestingOutput;
            while (i < items.length) {
                label = items[i];
                possiblyNested = items[i + 1];
                // if possiblyNested is array, it is a nest under label
                // if possiblyNested is string, it is just a sibling
                if (possiblyNested === undefined) {
                    // label is actually the last element of the list
                    hasEquals = label.split("=");
                    if (hasEquals.length === 2) {
                        output[hasEquals[0]] = hasEquals[1];
                        i += 1;
                    } else if (hasEquals.length === 3) {
                        output[
                            hasEquals[0]+"\u00A0"+"="+"\u00A0"+hasEquals[2]
                        ] = hasEquals[0]+"\u00A0"+"="+"\u00A0"+hasEquals[2];
                        i += 1;
                    } else {
                        output[label] = label;
                        i += 1;
                    }
                } else if (typeof possiblyNested == "string") {
                    hasEquals = label.split("=");
                    if (hasEquals.length == 2) {
                        output[hasEquals[0]] = hasEquals[1];
                        i += 1;
                    } else if (hasEquals.length == 3) {
                        output[
                            hasEquals[0]+"\u00A0"+"="+"\u00A0"+hasEquals[2]
                        ] = hasEquals[0]+"\u00A0"+"="+"\u00A0"+hasEquals[2];
                        i += 1;
                    } else {
                        output[label] = label;
                        i += 1;
                    }
                } else if (Array.isArray(possiblyNested)) {
                    nestingOutput = {};
                    makeMenuHelper(possiblyNested, nestingOutput);
                    output[label] = nestingOutput;
                    i += 2;
                } else {
                    throw new Error("Bad value at index " + i);
                }
            }
        }

        try {
            output = {};
            makeMenuHelper(menus[menuName], output);
            return output;
        } catch(err) {
            nop(err);
        }
    }
);
