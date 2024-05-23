# Snap! (BYOB) Dev History

## in development:
* **New Features:**
    * new "Code to Blocks to Code" library, translates text code to blocks and vice-versa
    * new 3D Beetle Geometry extension, thank you, Bernat!
    * custom blocks can be rearranged in the palette via their context menu, thanks, Simon Mong for pioneering this!
    * custom blocks can be grouped in the palette by adding vertical spaces in between them
    * new "Blocks all the way" setting, if enabled all blocks in the palette are now custom blocks, except hat blocks and rings
    * new "changeBy(data, delta)" extension primitive
    * new LISP-like text syntax for blocks and scripts
    * copy text from variable watchers, block result bubbles and sprite speech/thought balloons to the clipboard
    * allow (nested) lists of block label parts in the DEFINE command to express multi-line block labels
    * new Metaprogramming library
    * color type input slots for custom blocks
    * metaprogramming support for color type input slots (number: 13, spec: "clr", mnemonic: "color")
    * variadic variables type input slots for custom blocks
    * metaprogramming support for color type variadic variables slots (number: 14, spec: "scriptVars", mnemonic: "vars")
    * destinations, locations, keys, data types, objects + self, sprites + self, collidables, object attributes, microphone, scenes, primitives, properties and extensions dropdown menus for custom blocks
    * upvars in custom blocks can now have different default names than their formal parameter names
    * "collapse" label support for variadic inputs in custom blocks
    * metaprogramming support for "collapse" labels in variadic inputs
    * metaprogramming support for c-slots with loop arrows (number: 15, spec: "ca", mnemonic: "loop")
    * variadic "collapse" (prefix label) support for custom blocks
    * metaprogramming support for "expand" (slot prefix) labels in variadic inputs
    * default values for variadic slots inside custom blocks
    * metaprogramming support for default values of variadic inputs
    * initial subslot number support for variadic inputs
    * metaprogramming support for initial variadic subslots
    * new "skew" primitive block for costumes
    * special "receivers" type input slots for custom blocks (as in the "broadcast" primitive)
    * metaprogramming support for message-receiver type multi-slots (number: 16, spec: "receive", mnemonic: "receivers")
    * special "send data" type input slots for custom blocks (as in the "switch to scene" primitive)
    * metaprogramming support for send-data type multi-slots (number: 17, spec: "send")
    * max/min subslot number support for variadic inputs in custom blocks + metapgrogramming
    * new "snap" category with new "snap_block_selectors" extension primitive
    * lazy translation support for data
    * bootstrap global custom blocks as primitives
    * new "bootstrap" and "un-bootstrap" extension primitives
    * new "snap_yield" extension primitive
    * new "input names" selector in the (attribute OF target) primitive reporter
    * new "primitive" (pragma) block for custom block definitions
    * support for associating custom block definitions with primitives
    * new "bootstrapped(block)?" extension primitive
    * metaprogramming support for newlines in custom block labels ("$nl")
    * support for overloading primitives with custom block definitions and organizing them in libraries
    * new extension primitives for encoding / decoding blocks to and from xml
    * prefixing a default text value in the slot-type dialog with dollar-underscore tags it as translateable selector
    * support translating custom drop-downs by prefixing items with "$_"
    * new experimental (hidden) option to bulk-toggle the use-primitive switch in all customized primitives
    * new "sigmoid" easing function in the animations library
    * new EDC Early Maths Microworlds, thanks, Zak Kolar and Bernat!
    * new "writing and formating" library, thanks, Tethrarxitet!
    * new "Lisp code..." entry in blocks context menu
    * new "code..." entry to blocks context menu if "Codification support" setting is enabled
    * new live coding "performer mode" (currently hidden behind shift-click) setting, thank you, Bernat!
    * new API configuration option to hide the project name, thanks, Bernat!
    * new API configuration option to hide project specific entries in the file/project menu
    * new 'xhr_binary(url, webIDL_type)' extension primitive
    * new "binary data from (url) type (webIDL)" reporter in the web-services library
    * new "a new clone of 'Turtle sprite'" feature - makes a new temporary Turtle sprite that does not inherit anything
    * export vector pen trails as embroidery files (experimental)
    * pixels library: new "grayscales of (costume)" reporter
    * new "Outlines and Halos" library
    * piyels library: new "rectangle costume" reporter
    * New Search feature for the library browser
    * new "svg poly" export format for vector pen trails, optimized for speed and laser-cutting
    * added pen trails export options to the project ("file") menu
* **Notable Changes:**
    * the "change by" command for variables is now hyperized and even recursively mutates (!) data
    * splitting a LISP-formatted text by "blocks" returns a block-syntax tree
    * converting a block-syntax tree to "text" using the list-selectors reporters reeturns LISP code
    * drawing a dot when moving zero steps now observes the flat-line-ends settings and draws a centered square or rhombus the size of current pen and in its direction
    * automatically add generic inputs in DEFINE matching the number of placeholders in the label
    * when querying the defintion of a block via metaprogramming the number of inputs of the resulting ring now matches that of the header expression
    * keep the order & position of existing custom blocks in the project palette when overloading them with imported blocks
    * block label symbols are now shown with their name prefixed by "$" instead of an underscore to avoid confusing them with inputs when metaprogramming
    * the metaprogramming getter for "translations" block attribute selector now always returns a list
    * custom block definition comments can now be deleted by setting them to nothing (empty string, zero or false)
    * the "define" block now always creates a new custom block definition instead of sometimes modifying the definition body of an existing one with a matching label
    * support for multiple separator lines in input slot dropdown menus
    * support for smooth animations in recursive control structures defined using metaprogramming
    * optimized FOR-loop and FOR-EACH-loop for speed
    * renamed "primitive" blocks into "extension"
    * scroll long text inside result balloons instead of shortening it
    * When programmatically setting the "slots", "defaults", "menus", "editables" or "replaceables" of a custom block to a non-list type, apply the type to all slots instead of just the first one.
    * Libraries (and Costumes, etc) media files are now in a JSON format, which supports translation and additional search metadata.
* **Notable Fixes:**
    * fixed a type error when using metaprogramming to copy default inputs from a primitive over to a custom block definition
    * fixed referencing system drop-down menus in metaprogramming
    * fixed correctly evaluating (reifying) static (irreplaceable) C-slots inside custom blocks
    * only capture the caller once in repeating recursive calls
* **Documentation Updates:**
    * new Snap! Lisp Syntax documentation
    * updated extensions.md
* **Translation Updates:**
    * German

### 2024-05-23
* updated extensions.md
* extensions: removed "blocks all the way" requirement for bootstrapping customized primitives, highly experimental

### 2024-05-21
* threads: only capture the caller once in repeating recursive calls
* gui: added svg poly, dst, exp trails export options to the Stage icon's context menu
* gui: added pen trails export options to the project ("file") menu
* German translation update for "export pen trails" menu options
* incremented dev version
* added "call stack" reporter and dynamic variable scope getters / setters to the "Metaprogramming" library

### 2024-05-19
* objects: new "svg poly" export format for vector pen trails, optimized for speed and laser-cutting

### 2024-05-14
* incremented dev version

### 2024-05-10
* gui: fixed experimental export/import of customized primitives palette
* pixels library: added "grayscales of (costume)" reporter
* new "Outlines and Halos" library
* new "rectangle costume" reporter in the Pixels library

### 2024-05-09
* blocks, threads, byob, objects: "a new clone of 'Turtle sprite'" feature
* German translation update for "Turtle sprite"
* embroider, gui, objects: initial pen-trails-to-embroidery feature (experimental)
* incremented dev version

### 2024-05-08
* extensions: new 'xhr_binary(url, webIDL_type)' extension primitive
* web-services library: new "binary data from (url) type (webIDL)" reporter
* incremented dev version

### 2024-04-30
* threads: When programmatically setting the "slots" of a custom block to a non-list type, apply the type to all slots instead of just the first one.
* threads: dito for slot defaults, menus, editables and replaceables
* incremented dev version

### 2024-04-24
* threads: allow (nested) lists of block label parts in the DEFINE command to express multi-line block labels
* byob: automatically add generic inputs in DEFINE matching the number of placeholders in the label
* gui: new API configuration option to hide the project name, thanks, Bernat!
* gui: new API configuration option to hide project specific entries in the file/project menu
* merged patch from main to dev
* incremented dev version

### 2024-04-17
* merged patch from main to dev
* incremented dev version
* blocks: fixed #3326
* fixed textifying an empty ring to LISP

### 2024-04-11
* threads: allow Lisp code to be parsed if it starts with a comment

### 2024-04-10
* objects: added "back" code alias for "goBack" primitive
* objects: changed "gotoXY" code alias to "go"
* objects: changed code aliases for setter and changer primitives
* added appendix with primitive block names to syntax documentation
* incremented dev version

### 2024-04-09
* threads: added "ring" as metaprogramming mnemonic for "repRing"
* new Snap! Lisp Syntax documentation
* incremented dev version

### 2024-04-08
* threads: made Lisp syntax case insensitive for block names
* objects: added alias for "answer"
* lists: made Lisp syntax for empty slots (nil) case-insensitive
* lists, threaes: made Lisp syntax for Boolean literals case-insensitive

### 2024-04-05
* gui: restore scripts pane alpha when toggling out of performer mode
* gui: automatically toggle out of performer mode when changing the stage dimensions
* merged patch from main to dev

### 2024-04-04
* gui, objects, store, threads, stdlib: integrated Lisp-syntax primitives into the blocks dictionary
* objects: added codification shortcuts to Lisp syntax: transpile, literal, delimit, encode
* gui, objects, blocks, store: performer mode, thank you, Bernat!

### 2024-04-02
* byob, gui, objects, store, extensions: refactored bootstrapped primitives organization
* threads, objects: integrated code keys into blocks dictionary
* incremented dev version

### 2024-03-28
* blocks: tweaked bubble alignment for code display
* threads: updated some block aliases
* incremented dev version
* blocks: scroll long text inside result balloons instead of shortening it

### 2024-03-27
* blocks, store: moved Block >> toLISP() to blocks.js
* blocks: added "Lisp code..." entry to blocks context menu
* blocks: added "code..." entry to blocks context menu if "Codification support" setting is enabled

### 2024-03-26
* threads: tweaked metaprogramming custom block attribute access for list comparison
* updated "scriptify" reporter in the metaprogramming library
* incremented dev version
* store: added experimental Block >> toLISP() method

### 2024-03-25
* threads: added block syntax alias "fn" for "reportMonadic"
* lists: added "nil" as LISP text syntax representing an empty slot (synonym to double-double quote "")

### 2024-03-24
* merged patch from main to dev
* incremented dev version

### 2024-03-22
* merged beetle dev, thanks, Bernat!
* added new "inject into" block to the metaprogramming library
* new "writing and formating" library, thanks, Tethrarxitet!
* incremented dev version

### 2024-03-18
* merged patch from main to dev

### 2024-03-17
* merged patch from main to dev

### 2024-03-01
* merged Morphic changes into dev
* incremented dev version
* beetle fixes, thanks, Bernat!

### 2024-02-22
* integrated EDC Early Maths Microworlds, thanks, Zak Kolar!
* incremented dev version

### 2024-02-21
* threads: added more primitive aliases
* objects, gui: copy text from sprite speech/thought balloons to the clipboard
* blocks: copy text from block result balloons to the clipboard
* objects: copy text from variable watchers to the clipboard
* German translation update for "copy" to clipboard feature
* incremented dev version
* new Metaprogramming library

### 2024-02-20
* merged API changes to dev
* threads: added primitive aliases

### 2024-02-19
* byob: added divider line in custom blocks palette context menu
* byob, objects: let users add spaces between custom blocks in the palette
* store: added persistence for "spaceAbove" attribute in custom block definitions
* German translation update for custom block palette spacers
* incremented dev version
* threads: tweaked text syntax generation for custom blocks

### 2024-02-14
* blocks: fixed LISP-parsing of IF (BlockMorph.copyWithInputs())
* lists: added comment (semi-colon) to LISP-parser
* 3D Beetle extension extruding fix, thanks, Bernat!
* incremented dev version

### 2024-02-13
* merged main branch (v9.2.6)
* threads: fixed blockToken() lookup for custom blocks
* lists: encode Boolean values as t and f
* lists: escape "t" and "f" words
* threads: parse "t" and "f" inputs into Booleans
* lists: tweaked parsing quoted empty tokens

### 2024-02-12
* lists: improved parser
* lists: improved encoder for parens

### 2024-02-12
* threads, lists: 2-way block alias look-up for text-to-blocks
* blocks, threads: new "code" selector in the SPLIT reporter parses LISP syntax into a block-syntax tree
* blocks, threads: splitting a LISP-formatted text by "blocks" returns a block-syntax tree
* threads: converting a block-syntax tree to "text" using the list-selectors reporters reeturns LISP code
* merged main branch (v9.2.5)
* merged 3D Beetle extension
* added Beetle files to PWA cache
* added code2blocks library

### 2024-02-10
* threads: made unique block aliases unique

### 2024-02-09
* threads: partial syntax tree to text encoding
* lists: renamed parseString() to parse()
* lists: syntax tree to LISP text encoding
* lists: pretty printing options for generated LISP code

### 2024-02-08
* lists: new experimental text syntax for primitive blocks
* threads, lists: refactored syntax tree generation from parsed text
* threads: extended text syntax for custom blocks
* threads: added aliases for blocks
* threads: added aliases for rings

### 2024-01-21
* theads: hyperized "change (var) by (delta)" for scalars
* incremented dev version

### 2024-01-20
* threads: hyperized "change (var) by (delta)" primitive, (recursively) mutates (!) a data structure
* extensions: new "changeBy(data, delta)" extension primitive
* incremented dev version

### 2024-01-19
* merged main branch (v9.2.2)
* incremented dev version

### 2024-01-15
* merged main branch (v9.2.1)
* incremented dev version

### 2024-01-11
* merged main branch (v9.2.1)
* incremented dev version

### 2023-12-22
* added "sigmoid" easing function to the animation library, refactored easing reporter

### 2023-12-21
* blocks, byob, objects: include customized quasi-primitive dependencies in libraries and exported scripts / smart images
* objects, gui: refactored primitive blocks dictionary initialization
* store: soft-fail loading customized primitives
* gui: added "Blocks all the way" setting
* German translation update for "Blocks all the way"
* incremented dev version
* gui, objects: experimental (hidden) option to bulk-toggle the use-primitive switch in all customized primitives
* incremented dev version

### 2023-12-19
* blocks: fixed codification dialogs to work with customized primitives
* incremented dev version

### 2023-12-14
* byob: let users rearrange custom blocks in the palette, thanks, Simon M. for pioneering this!
* gui: added Simon M. to the credits tab of the "about Snap!" dialog
* German translation update for rearranging custom blocks in the palette
* incremented dev version
* byob: removed obsolete symbols context menu for BlockLabelFragments

### 2023-12-13
* byob, objects: ignore bootstrapped dependencies when exporting custom blocks
* incremented dev version

### 2023-12-12
* merged main branch (v9.1.1)
* objects: keep the order & position of existing custom blocks in the project palette when overloading them with imported blocks

### 2023-11-21
* merged main branch (v9.1)

### 2023-11-21
* blocks: fixed restoring properties of variadic slots in custom blocks

### 2023-11-20
* blocks: tweaked variadic inputs for expansion labels

### 2023-11-07
* incremented dev version for global color sensing patch

### 2023-11-02
* incremented dev version for localized blocks search patch

### 2023-10-30
* merged main branch
* incremented dev version

### 2023-10-27
* blocks, threads, gui: tweaked meta-programming features for variadic slots

### 2023-10-27
* blocks: tweaked BooleanSlotMorph >> isWide()
* threads, objects, byob, blocks: added definition >> usePrimitive mechanism
* updated stdlib
* byob, threads: tweaked usePrimitive mechanism
* updated stdlib
* incremented dev version

### 2023-10-25
* stdlib: fixed initial sub-slot number for PIPE
* incremented dev version

### 2023-10-20
* updated dev branch with v9.0.8 main branch patch

### 2023-10-18
* updated stdlib (alternative code for sprite layer control)
* updated stdlib (decustomized "rest for beats" and fixed "point in direction")
* objects: refactored doDrawDot() out of forward(), enhanced with flat-line-ends setting
* incremented dev version

### 2023-10-17
* byob: fixed a bug that assigned default values to prototype input fragments in customized primitives
* incremented dev version

### 2023-10-16
* byob: tweaked localizing customized primitives
* byob: tweaked decoding choices for costomized primitives
* byob: made collidablesMenu() available for custom blocks
* stdlib: updated stdlib (translation support for dropdowns and default values, correct distribution of default values in variadic inputs)
* byob: tweaked relabelling customized primitives
* blocks, byob: translate default values for customized primitives
* German translation update
* gui: refresh customized palette blocks when changing the language or the block zoom
* incremented dev version

### 2023-10-15
* blocks, objects: selectorized default values, fixed distribution of variadic slot defaults
* byob: selectorized drop-down menus in customized primitives

### 2023-10-14
* byob: tag a default text value to behave as translateable "selector" by prefixing it with dollar-underscore
* byob: support translating custom drop-downs by prefixing items with "$_"

### 2023-10-13
* blocks: fixed a glitch when relabelling custom blocks
* store: fixed overloading customized primitives with a library
* stdlib: selected a compromise of which primitives to bootstrap as custom blocks
* updated dev version date

### 2023-10-12
* byob: made attributesMenu() available for custom blocks

### 2023-10-10
* stdlib: new preloaded palette blocks definitions module
* include new stdlib module in the pwa cache
* gui: refactored palette blocks mode selection
* byob: disable deleting bootstrapped palette blocks in the context menu
* blocks: enable help screens for bootstrapped custom blocks
* objects: added experimental "primitify" dev helper method

### 2023-10-10
* objects: added hyperZip stub to blocks dictionary
* store: load libraries with customized primitives
* blocks, byob: metaprogramming support for newlines in custom block labels
* bocks, extensions: new extension primitives for encoding / decoding blocks to and from xml

### 2023-10-09
* gui: tweaked exporting customized primitives
* store: refactored populateCustomBlocks()

### 2023-09-22
* gui: new experimental hidden "customize primitives" mode setting
* gui: new experimental hidden "export customized primitives" feature

### 2023-09-14
* byob: support for translating bootstrapped custom block definitions using already existing language packs
* threads: fixed a typo in a comment

### 2023-09-13
* byob: relabelling support for bootstrapped custom blocks shadowing primitives

### 2023-09-11
* objects: fixed block migrations for bootstrapped custom blocks
* byob: metaprogramming support for associating custom block definitions with primitives
* threads: added internal data type support for new "selector" type
* byob: fixed a primitive-customization glitch
* extensions: new "bootstrapped(block)?" extension primitive
* threads: added "doPrimitive" block support to queried definitions of primitives and custom blocks associated with a primitive
* gui, store, sw: pushed version to 10-230911-dev

### 2023-09-08
* byob: primitives and extensions menus for custom blocks
* byob: support for running primitives inside custom block definitions
* store: serialization of custom block definition primitives

### 2023-09-07
* blocks, objects, threads: new "primitive" (pragma) block

### 2023-09-06
* byob: fixed selectorsMenu
* objects, blocks: renamed "primitive" blocks into "extension"
* byob, objects: added "primitive" property to custom block definitions

### 2023-09-05
* objects, threads: reverted reformulation of special form primitives (for a better plan)
* threads: refactored isAutoLambda(inputSlot)
* threads: added custom exceptions to isAutoLambda()
* objects, threads: adjusted block spec for doUntil() to reflect the unevaluated condition
* objects, threads: adjusted block spec for doWaitUntil() to reflect the unevaluated condition
* threads: adjusted isAutoLambda() for doIfElse()
* threads: adjusted isAutoLambda() for doWarp()
* objects, blocks: adjusted block spec for reportIfElse() to reflect the unevaluated branch cases
* threads: optimized FOR-loop for speed
* threads: optimized FOR-EACH-loop for speed

### 2023-09-04
* objects, threads: reformulated REPEAT UNTIL as special form primitive
* objects, threads: reformulated WAIT UNTIL as special form primitive
* objects, threads: reformulated FOREVER as special form primitive
* objects, threads: reformulated REPEAT as special form primitive
* threads: prepared reformulation of doIfElse as special form primitive

### 2023-09-01
* blocks: tweaked c-slots to mostly always evaluate to lambdas
* blocks, objects, threads: reversed lambdafication of low-level primitive control structures for performance

### 2023-08-31
* objects, threads: turned C-slot of FOREVER primitive into a full lambda with its own scope
* objects, threads: turned C-slot of REPEAT primitive into a full lambda with its own scope
* objects, threads: turned C-slot of REPEAT UNTIL primitive into a full lambda with its own scope
* objects, threads: refactored doIfElse()
* blocks, objects: refactored unwinding / rewinding blocks for renaming variables in scope

### 2023-08-30
* objects, byob, gui: generate custom block definition headers for all standard library block descriptions

### 2023-08-27
* objects: added "reportHyperZip" entry in the blocks dictionary to support bootstrapping
* gui: removed redundant blocks dictionary initializations

### 2023-08-24
* threads: support smooth animations in recursive control structures defined using metaprogramming
* threads, blocks: new "input names" selector in the (attribute OF target) primitive reporter

### 2023-08-23
* extensions: added new "snap_yield" extension primitive

### 2023-08-22
* objects, byob, store: refresh standard library custom block definitions

### 2023-08-21
* extensions: new "bootstrap" extension primitive
* extensions: new "un-bootstrap" extension primitive

### 2023-08-20
* objects: tweaked bootstrapped custom block palette templates to be undraggable

### 2023-08-19
* store: treat a bootstrapped custom block as if it were a built-in primitive

### 2023-08-18
* byob: added GUI method for editing the "selector" attribute of global custom block definitions
* byob, objects: bootstrap global custom blocks as primitives
* byob: added graphical drop-down menu for "selector" setting in the prototype-hat-block

### 2023-08-17
* blocks, byob, extensions, threades, store: added "selector" attribute to (global) custom block definitions to support overloading primitives
* tables: fixed a lazy translation bug for table cells

### 2023-08-16
* byob, threads: special "receivers" type input slots for custom blocks (as in the "broadcast" primitive)
* byob, threads: metaprogramming support for message-receiver type multi-slots (number: 16, spec: "receive", mnemonic: "receivers")
* byob, threads: special "send data" type input slots for custom blocks (as in the "switch to scene" primitive)
* byob, threads: metaprogramming support for send-data type multi-slots (number: 17, spec: "send")
* byob, threads: special "conditionals" type input slots for custom blocks (as in the "if ... else if ..." primitive)
* byob, threads: metaprogramming support for conditionals type multi-slots (number: 18, spec: "elseif", mnemonic: "conditionals")
* blocks, byob, threads, store: max/min subslot number support for variadic inputs in custom blocks + metapgrogramming
* extensions: new "snap" category with new "snap_block_selectors" extension primitive
* locale: lazy translation support
* objects: lazy translation support for variable + list watchers and speech balloons
* blocks: lazy translation support for result bubbles
* tables: lazy translation support for table views

### 2023-08-14
* byob: made default value/name label in slot type dialog dynamic for upvar / slot
* objects, threads: new "skew" primitive block for costumes
* objects: relabel options for "stretch" and "skew"
* German translation update for new "skew" primitive

### 2023-08-11
* blocks: only repeat-wrap default values in variadic slots with input groups
* threads: added metaprogramming support for default values of variadic inputs
* byob, blocks: initial subslot number support for variadic inputs
* store: serialization support for initial variadic subslots in custom block definitions
* blocks, byob: added metaprogramming support for initial variadic subslots

### 2023-08-10
* blocks, threads: metaprogramming support for "expand" (slot prefix) labels in variadic inputs
* blocks: added support for multiple separator lines in input slot dropdown menus
* blocks: added separator line in dropdown menu for variadic input selectors
* blocks, byob: added support for default values for variadic slots inside custom blocks

### 2023-08-09
* blocks, byob, store: badded variadic "collapse" (prefix label) support for custom blocks

### 2023-08-08
* threads: changed "define" block to always create a new custom block definition rather than modify the definition body of an existing one with matching label
* threads: fixed correctly evaluating (reifying) static (irreplaceable) C-slots inside custom blocks
* byob, threads: metaprogramming support for c-slots with loop arrows (number: 15, spec: "ca", mnemonic: "loop")

### 2023-08-07
* byob: added "collapse" label support for variadic inputs in custom blocks
* blocks, threads: added metaprogramming support for 'collapse' labels in variadic inputs

### 2023-08-06
* byob: added support giving upvars in custom blocks different default names than their formal parameter names
* byob: made typesMenu() available for custom blocks
* byob: made objectsMenuWithSelf() available for custom blocks
* byob: made clonablesMenu() available for custom blocks
* byob: made keysMenu() available for custom blocks
* byob: made locationMenu() available for custom blocks
* byob: made gettablesMenu() available for custom blocks
* byob: made audioMenu() available for custom blocks
* byob: made scenesMenu() available for custom blocks
* threads: added ability to delete custom block comments by setting them to nothing (empty string, zero or false)

### 2023-08-05
* threads: tweaked metaprogramming getter for "translations" block attribute selector to always return a list

### 2023-08-04
* blocks, byob, objects: changed prefix for predefined block label symbols from "%" (%greenflag, %pause etc.) to "$" ($greenflag, $pause etc.)
* blocks: adjusted translation mechanism to new block label symbol prefix format
* threads: tweaked metaprogramming support for %scriptVars input slots

### 2023-08-03
* byob: made distancesMenu() available for custom blocks
* blocks, byob: renamed distancesMenu() into destinationsMenu()
* threads: fixed a type error when using metaprogramming to copy default inputs from a primitive over to a custom block definition
* threads: when querying the defintion of a block via metaprogramming make sure the number of inputs of the resulting ring matches that of the header expression
* byob, threads: tweaked some metaprogramming edge cases
* threads: fixed referencing system drop-down menus in metaprogramming

### 2023-08-02
* new dev branch and version
* blocks, byob: made %clr input slots available for custom blocks
* threads: metaprogramming support for color type input slots
* byob: made %scriptVars input slots available for custom blocks
* threads: metaprogramming support for %scriptVars input slots
* threads: moved script var declaration to multi-arg evaluation, eliminates necessity for doDeclareVariables()
