# Snap<em>!</em> (BYOB) History

## in development

* New Features:
    * export 1- /2- dimensional lists with atomic data as CSV
    * export n-dimensional lists with atomic data as JSON
    * import CSV, Text, or JSON via drag & drop
    * parse JSON using the SPLIT reporter
    * new "aspect AT location" reporter in Sensing category for sniffing colors and sprites
    * new blocks for setting and changing the stage's background color
    * new "object" reporter in the Sensing category for getting a sprite by its name
    * blocks for changing and querying the "flat line ends" setting 
    * selectors for changing and querying "draggable" and "rotation style" settings
    * multi-line and monospaced "code" input slots for custom blocks
    * new "string" library, thanks, Brian
    * added "neg" selector to monadic function reporter in "Operators" category
    * enhances support for embedding Snap in other website, thanks, Bernat!
    * export sounds
* Notable Changes:
    * added third hsv dimension to pen colors, changed SET and CHANGE pen blocks
    * added transparency (alpha) to pen colors
    * new drop-down options for sprite-layer control ("GO TO front/back")
    * "loop arrow" symbol for primitive loops, also available for custom blocks
    * optimized in-project storage of atomic-data lists (more efficient, less space) 
    * remove all clones when the Green Flag is clicked
* Notable Fixes:
    * "relabel" blocks with translated drop-down choices
    * transforming arrayed to linked lists without loosing the last element
    * using "inherit" no longer un-hides the palette in presentation mode
* Translation Updates:
    * Chinese, thanks, Simon!
    * Turkish, thanks, Turgut!
    * Indonesian, thanks, Emanuella!
    * Greek, thanks, Alexandros!
    * German

### 2019-02-01
* BYOB: new experimental feature: special multi-line and monospaced input slot types

### 2019-01-28
* Threads, Objects: new "object" reporter in the Sensing category
* Blocks, Objects, Threads: added "flat line ends" option to "turbo mode" accessor blocks
* Blocks, Threads: added 'draggable' and 'rotation style' selectors to accessor blocks
* Greek translation update, thanks, Alexandros!
* German translation update
* pushed version to "Beta"

### 2019-01-25
* Threads: tweaked CSV-parser to handle \r-only record delimiters
* Cloud, GUI: Decouple cloud access from GUI, thanks, Michael and Bernat!
* GUI: added ability to export sounds

### 2019-01-24
* Turkish translation update, thanks, Turgut!
* updated audio-comp library blocks with new loop-arrow symbols

### 2019-01-23
* Objects, Threads: new blocks for setting and changing the stage's background color
* Store: save stage's background color in project
* updated German translation
* Blocks: Tweaked rendering of C-shaped slots in predicates 
* updated cases library blocks with new loop-arrow symbols
* updated animation library blocks with new loop-arrow symbols, tweaked FOR block

### 2019-01-22
* Objects: Remove all clones when the Green Flag is clicked
* Blocks: adjust label row below C-Slot to accomodate loop icon, if any
* updated iteration-composition library blocks with new loop-arrow symbols
* updated list-utilities library blocks with new loop-arrow symbols
* Threads: cleaned up CSV parser
* Objects: fixed pen hsv-cache invalidation for clones

### 2019-01-21
* let users make C-shape slots with loop arrow symbols. Sigh.
* updated internal "for each" primitive block with new arrow symbol. Sigh. 
* updated Indonesian translation, thanks, Emmanuella Rumanti 
* updated FOR and FOREACH in tools library with new new loop-arrow symbols

### 2019-01-19
* fixed "Staatsgalerie bug" - relabel did not restore drop-down choice when localized

### 2019-01-17
* Greek translation update, thanks, Alexandros Prekates!
* cloud: user role support, thanks, Bernat

### 2019-01-16
* suppress 'loop' arrow symbol where label text follow the C-slot in translations

### 2019-01-15
* updated German translation
* updated all translations for the new %loop slot

### 2019-01-14
* Symbols: added 'loop' arrow symbol
* Blocks, Objects, Store: added 'loop' symbol to primitive loop blocks
* pushed dev version to 5.0

### 2019-01-12
* Threads: try to identify Brian's problem with parsing a CSV

### 2019-01-11
* Chinese translation update, thanks, Simon!
* Turkish translation update, thanks, Turgut Guneysu!
* new string library, thanks, Brian!
* project renaming and remixing support, thanks, Bernat!
* pushed dev version to 4.3

### 2019-01-10
* Morphic: recognize data sets in dropped text files (csv, json)
* Lists: updated list documentation, enabled table support by default
* GUI: import & examine data sets and text files via drag'n'drop or "import" menu
* updated German translation

### 2019-01-09
* Store: tweaked format for serializing atomic data lists
* Morphic: added option to include alpha in color comparison
* Objects: fixed "set pen color (color picker)" to observe, i.e. overwrite transparency
* Lists, Threads, Objects: added (Bernat's) JSON parser to SPLIT block
* Lists, Objects: added "export as JSON" capability
* Lists, Objects: automatically parse json files on import 
* Lists: prevent Booleans in CSVs

### 2019-01-08
* Objects: automatically parse csv files on import, experimental "raw data" and "parse" ops
* Lists: fixed an off-by-one error in becomeLinked()
* Store: optimized serialization of lists with atomic data in project files
* Blocks, Objects, Threads: renamed "color" to "hue" in pen-blocks and in location sensor
* updated German translation

### 2019-01-07
* Lists, Objects: directly export and import lists as csv files, under construction

### 2019-01-04
* Objects, Blocks, Threads: new feature/block: sense colors and sprites anywhere
* updated German translation 
* Objects: fixed pixel color sensing for stage pen trails 

### 2019-01-02
* Objects, Blocks, Threads, GUI, Store: added third color dimension and transparency to pen
* renamed help screens for "setHue" to "setPenHSVA" and "changeHue" to "changePenHSVA"
* pushed dev version to 4.2.3
* updated German translation

### 2019-01-01
* Morphic: added HSL color conversion support
* Morphic: fixed glitch in WorldMorph >> getGlobalPixelColor

### 2018-12-28
* Blocks, Threads: added 'neg' selector to monad operator dropdown
* Blocks, Objects, Threads: added "front/back" options to "go to front" layer primitive
* updated German translation
* renamed help screen for layer primitive
* fixed #2294

### 2018-12-07
* GUI: fixed #2284 (executing "inherit" should not un-hide palette in presentation mode)

## v4.2.2.9
### 2018-11-29
* GUI: prepared release
* GUI: fixed offline version (avoid sessionStorage access)

### 2018-11-28
* Objects: added special checks to make imporing text-based files into vars easier in Windows
* GUI: allow smaller stage extent in embed mode (for social website)

### 2018-11-27
* Objects: Cache stage>>penTrailsMorph to optimize collision detection
* Objects: Fixed a collision detection errror when objects are sub-pixel sized
* Objects: made importing files into variable watchers more lenient wrt to file types
* Objects: added "open anyway?" option to "unable to import" dialog for variables

## v4.2.2.8
### 2018-11-21
* Tools library: Fixed LABEL block to again allow printing both text and numbers
* Frequency Distribution Analysis library: Added histogram and plot blocks

### 2018-11-13
* Blocks: fixed #2261 (check for selectedBlock before declaring an InputSlotMorph to be "empty")

### 2018-11-12
* new dev version
* BYOB: updated version date
* Objects: fixed #2250
* Frequency Distribution Analysis library: added "pipe" and "lower case" blocks
* Store, XML: fixed #2251 (sorta, load project anyway even though costumes / sounds are missing)
* BYOB: fixed #2260

## v4.2.2.6
### 2018-11-06
* prepared release

### 2018-11-06
* new dev version
* Blocks: fixed a scope issue introduced in v4.2.2.4
* Blocks: enabled "duplicate block definition" in the palette
* updated German translation

## v4.2.2.5
### 2018-11-02
* new library: Frequency Distribution Analysis, separated from "Bigger Data"
* Objects: avoid rendering graphic effects for null-extent canvasses

## v4.2.2.4
### 2018-10-29
* Blocks: fixed #2234 (display all reachable local variables in drop-down menu)
* new "does variable _ exist" predicate in var-library, thanks, Brian!

## v4.2.2.3
* New Features:
    * new fast atomic "analyze" and "group" reporters in the "Bigger Data" library
* Notable Changes:
    * don't stamp if the canvas is too small, avoid a JS error message
    * changed "csv" option in SPLIT to comply with RFC 4180 and parse the whole table
* Notable Fix:
    * help for local custom blocks 
* Translation Update:
    * Japanese, thanks Yoshiteru Nakamura!

### 2018-10-26
* Blocks, Threads: changed SPLIT "csv" to comply with RFC 4180, took out others options
* fixed #2235 (help for local custom blocks)

### 2018-10-24
* Blocks, Threads: added "csv records" to SPLIT options, renamed "csv" to "csv fields"

### 2018-10-23
* Objects: Don't stamp if the canvas is too small (and would throw an error)
* Threads: New "reportAtomicGroup" HOF primitive using the JIT compiler
* "Bigger Data" library: Added "group" function for fast data drill-down analyses
* Japanese translation updates, thanks, Yoshiteru Nakamura!

### 2018-10-22
* "Bigger Data" library: Added "analyze" function for fast frequency distributions

## v4.2.2.2
### 2018-10-19
* Threads: fixed #2227 - capture argument reporter's lexical environment in JIT-compiler

## v4.2.2.1
### 2018-10-16
* New translation for Ukrainian, thanks, Serhiy Kryzhanovsky, for the contribution!
* added timed FOR-loop to Animation library

## v4.2.2
* New Feature:
    * support for stand-alone offline usage (open file snap.html in a web browser)
* Notable Changes:
    * renamed github repo to "Snap"
    * reorganized source code files and translations into a subfolder structure
    * SET PEN COLOR TO (number) now wraps the hue around for numbers < 0 and > 100
* Notable Fixes:
    * restore propagation of inherited attributes when loading 
    * support for older versions of Chrome, thanks, Michael! 
    * fixed "letter of" primitive for numeric input, thanks, Michael and Dan!

### 2018-10-07
* renamed repo to "Snap"

### 2018-10-05
* Objects: Adjusted pen hue wrapping and took out pen shade wrapping
* Store: Fixed #1918 - escape options in block drop downs #2174, thanks, Michael!

### 2018-10-04
* GUI, Cloud: improved UX when running Snap! locally without a web server
* pushed dev-version to v4.2.2
* added OFFLINE.md
* Objects: made SET PEN COLOR and SET PEN SHADE inputs wrap around

### 2018-10-03
* Threads: fixed "letter of" primitive for numeric input, thanks, Michael and Dan!

### 2018-10-02
* new dev version
* Store: fixed #2219 - properly restore propagation of inherited attributes when loading
* Cloud: fixed cloud check, thanks, Michael!
* deduped tools, thanks, Michael!
* moved translations into subfolder "locale"
* removed obsolete doc files
* moved *.js files into subfolder "src" (and edited gui.js to deal with ypr.js)
* moved media files (icon, logo, click sound) into "src" subfolder

## v4.2.1.4
### 2018-09-09
* new dev version
* Threads: fixed #2176 ('arguments' not found for calling empty multi-slots)
* Blocks: enabled drop-down for "inherit" command for clone-initialization scripts

## v4.2.1.3
### 2018-07-19
* Threads: fixed a regression conflict between "when I am stopped" and broadcasts

## v4.2.1.2
* New Feature:
	* new "&lang=nn" url parameter for specifying a session translation in a web-link
* Changed:
	* smart ternary Boolean slots - only 2 states except inside rings and in the palette
	* made project dialog wider to accommodate translations for the "recover" button
* Fixes:
	* corrected scope for outer script variables in inter-sprite messages (TELL, ASK, OF)
	* eliminated false "reporter didn't report" error messages

### 2018-07-13
* Blocks: enabled smart ternary Boolean slots by default

### 2018-07-12
* Threads: tweaked outer script variable scope for TELL/ASK and OF
* Blocks: fixed #2145 - newlines in block labels conflict with input declarations
* GUI: increased project dialog width to accommodate translations for the "recover" button

### 2018-07-11
* GUI: added support for "&lang=nn" url parameter, made it non-permanent
* Threads: fixed outer script variable scope for TELL/ASK and OF
* Tools: fixed JOIN WORDS and LIST -> SENTENCE

### 2018-07-10
* Threads, GUI: fixed #712 - false "reporter didn't report" error messages

## v4.2.1.1
### 2018-07-10
* Threads, GUI: reverted Cache-Control header for HTTP requests b/c of CORS issues

## v4.2.1
* New Features:
    * new libraries for parallelization and JSON support
    * new "loudness" reporter in audio comp library, thanks, Bernat!
* Notable Changes:
    * significant speed-up for HTTP based robot APIs such as the Hummingbird kit
* Notable Fixes:
    * "When I am stopped" hat block now also works for stacks of HTTP based robot commands
    * resolved name conflicts in pixels and audio comp libraries
* Translation Updates:
    * New Basque translation, thanks, Asier Iturralde Sarasola!
    * Portuguese, thanks, Manuel!
    * French, thanks, Nathalie and Joan!
    * Spanish, Catalan and French translations of the tools library, thanks, Nathalie and Joan!

### 2018-07-09
* Portuguese translation update, thanks, Manuel!
* New Basque translation, thanks, Asier Iturralde Sarasola!
* French translation update, thanks, Nathalie and Joan!
* Spanish, Catalan and French translations of the tools library, thanks, Joan!
* New JSON library, thanks, Bernat!
* URL cache issue fix, thanks, Joan!

### 2018-07-06
* Objects: fixed #2142 - search and keyboard entry support for custom block translations

### 2018-07-05
* Threads: added JIT compiler support for "change variable" primitive
* Threads: optimized RUN with reportURL (fire-and-forget)

### 2018-07-03
* speed up HTTP based hardware APIs (by not waiting for the result if the URL reporter is used inside a REPORT block within a custom COMMAND block definition)

## v4.2 "Solstice"
* New Features:
    * "recover project" feature, (cloud backups), thanks, Bernat Romagosa!
    * vector paint editor, thanks, Carles Paredes and Bernat Romagosa!
    * "When I am stopped" event option, runs one atomic frame before terminating, use-case: stop robots when a user hits the stop button
    * experimental JIT compiler for atomic HOFs, used in new "Bigger Data" library
    * new library for programmatically creating variables, thanks, Brian Harvey!
    * added options for sprite attributes to the SET block
    * new "webcam snap" reporter in the "Pixels" library
    * new "record" reporter in the "Audio Comp" library
    * added "name" selector to the "Pixels" library
    * added drop-down menu to "letter _ of _ ", adjusted all translations (thanks, Joan!)
* Notable Changes:
    * hidden sprites can no longer be collision detected (but can test for other sprites)
    * new sprites created by pressing the arrow button no point in random directions (unless you hold down the shift-key)
    * new "center" option for location blocks (GO TO, POINT TOWARDS, DISTANCE TO and DIRECTION TO)
    * disabled keyboard shortcuts for green-flag (cmd-enter) and stop (esc) in presentation mode
* Notable Fixes:
    * rearranging and scrolling sound icons
    * rendering and layout of variadic C-shaped input slots
    * when collapsing ring-typed multi-arg slots only filled rings are preserved
    * support for numerical custom block input names
    * no more "leftover" clones when pressing the stop button or executing the STOP block
* Translation Updates:
    * German, thanks, Jadga!
    * Portuguese, thanks, Manuel!
    * Catalan, thanks, Joan!

### 2018-06-21
* Threads, Objects: made "When I am stopped" scripts atomic, so you can use loops

### 2018-06-20
* Sketch: enable right-click to select secondary color in vector paint editor
* GUI: allow only one instance of Camera and Sound Recorder to open
* new "webcam snap" reporter in the "Pixels" library
* new "record" reporter in the "Audio Comp" library

### 2018-06-18
* Threads: added capability to JIT-compile command scripts to JS

### 2018-06-17
* GUI: fixed cloud scope issues

### 2018-06-15
* BYOB: fixed #2043 (regression)

## v4.2 Release Candidate
### 2018-06-14
* Threads: Prevent terminated threads from launching new ones

### 2018-06-12
* Renamed vectorPaint.js to sketch.js
* GUI: updated credits for Carles Paredes
* "Pixels" library: Enabled multiple references to the same pixel (variable)

### 2018-06-11
* Objects, Threads: fixed #2108 (added drop-down menu to "letter _ of _ ")
* German translation update

### 2018-06-09
* Objects, Threads: Also trigger "When I am stopped" when programmatically calling "stop all"

### 2018-06-08
* Blocks, Objects: new experimental "When I am stopped" event option
* Threads: Prevent terminated threads from forking new ones and from cloning

### 2018-06-06
* updated German translation, thanks, Jadga!
* updated Portuguese translation, thanks, Manuel!
* new Project Cloud Backups feature, thanks, Bernat!
* BYOB, Blocks, Threads, Store: fixed support for numerical custom block input names

### 2018-06-05
* VectorPaint: fixed rotation center editing for existing costumes
* VectorPaint: fixed initial rendering, so costumes can be re-opened after saving
* Symbols: fixed 'polygon' symbol rendering

### 2018-06-04
* Blocks: tweaked layout of variadic C-shaped input slots

### 2018-05-24
* Blocks: fixed rendering and layout of variadic C-shaped input slots

### 2018-05-08
* Threads: tweaked JS-Compiler to better handle process related ops

### 2018-05-03
* GUI: (again) randomize pen color when creating a new sprite

### 2018-05-02
* Blocks, Threads: added "center" to drop-down options of location blocks (GO TO, POINT TOWARDS, DISTANCE TO and DIRECTION TO)
* updated German translation
* disabled keyboard shortcuts for green-flag (cmd-enter) and stop (esc) in presentation mode
* Blocks, Threads: added options for sprite attributes to the SET block

### 2018-04-27
* GUI: when creating a new sprite only randomize color and direction when shift-clicking

### 2018-04-25
* GUI: fixed rearranging sound icons in the jukebox
* GUI: fixed scrolling for the jukebox (updating the sounds list version)
* GUI: only randomize position when shift-clicking on new turtle-sprite button

### 2018-04-24
* added 'name' selector to pixel library

### 2018-04-16
* Blocks: only preserve filled rings when collapsing ring-typed multi-arg-slots
* Blocks: minor tweaks

### 2018-04-13
* Objects: added implicit parameter count to experimental JIT compile reporter

### 2018-04-12
* Threads: disable detecting collision with hidden sprites

### 2018-03-23
* Threads: new experimental atomic COMBINE utilizing JIT compiler
* added atomic COMBINE to new experimental "Bigger Data" library
* removed unused blocks from the audio comp library
* added and removed atomic FOR EACH to new experimental "Bigger Data" library

### 2018-03-22
* Threads: extended implicit parameters handling for experimental JS-Compiler
* Threads: new experimental atomic HOFs utilizing JIT compilation (MAP, KEEP, SORT)
* new experimental "Big Data" library using JIT compiler

### 2018-03-20
* Threads: refactored experimental JS-compiler
* Threads: enabled variables access for experimental JS-compiler

### 2018-03-19
* new Vector Paint Editor, thanks, Carles Paredes and Bernat Romagosa!

## v4.1.2.7
### 2018-03-19
* Threads: initialize Process>>gensyms with null (because it's hardly ever needed)
* Objects: remove obsolete STOP primitive from the stage's palette

### 2018-03-16
* Threads: experimental JIT compiler support for multi-word formal parameters and a single implicit formal parameter mapped to all empty input slots

## v4.1.2.6
### 2018-03-14
* Threads: changed testing order for type inference, speeds up list operations significantly
* Cloud: remix project method, thanks, Bernat!

## v4.1.2.5
### 2018-03-13
* Objects: draw a "dot" pentrail when moving zero steps while the pen is down

## v4.1.2.4
### 2018-03-09
* Blocks, Objects, Threads: added "random" option for "go to", "point towards" and "point in direction" primitives

### 2018-03-08
* Objects: fixed #2053
* GUI: fixed #2052

## v4.1.2.3
### 2018-03-05
* cloud tweaks, thanks, Bernat and Michael!
* fixed "join words" in the tools, library, thanks, Brian, for reporting the bug!
* added new "text to speech" library
* made sure sound data is always stored in the project (not referenced)
* added capability to compile input slot options to experimental JIT
* Spanish and German translation updates

## v4.1.2.2
### 2018-02-22
* crayons library: fixed "nearest crayon to" reporter

## v4.1.2.1
* Notable Changes:
    * account verification
    * optimized "broadcast and wait" for atomic subroutines
    * changed leap motion library to https
* Translation Updates:
    * Spanish

### 2018-02-20
* Libraries: Changed LeapMotion library source to https
* account verification

### 2018-02-19
* GUI, snap.html: started v4.1.2.1 development
* Threads: optimized "broadcast and wait" for atomic subroutines
* Spanish translation update

## v4.1.2
### 2018-02-17
* Notable Changes:
    * new cloud backend
* New Features:
    * experimental JIT compiler (in progress)
* Translation Updates:
    * new Catalan-Valencia translation
    * Catalan
    * German

### 2018-02-15
* Threads, Blocks, Objects: experimental JIT compiler

### 2018-02-12
* Threads: Allow JS-functions for invoke()
* Threads, Objects: Small compilation experiment

### 2018-02-09
* Store, GUI: small tweaks
* new Valencian Catalan translation, thanks, Jose A. Múrcia!!

### 2018-02-08
* Cloud, GUI, Widgets: New Cloud API, thanks, Bernat!
* GUI: fixed a url-bar refresh bug introduced by the new cloud mechanism
* GUI: made sure user names are lower case when sent to the cloud
* Cloud: made sure project thumbnails are normalized when saved
* Cloud: warn user if overwriting an existing project with another one

### 2018-02-06
* GUI: start developing v4.1.2
* Morphic: roll back temporary rectangle filling workaround for a bug in Chrome v57

## v4.1.1
* New Features:
    * translation support for custom blocks
    * new "direction to..." primitive as variant of "distance to..." in "Sensing"
    * included local methods in the OF-block's left drop-down menu
    * added "width" and "height" selectors to Pixels library
    * added scroll events, thanks, Bernat!
    * new dial widget POINT IN DIRECTION's drop-down menu
    * new "rotate" option for sprite context menu
    * new sound recorder, thanks, Bernat!
    * new "Crayons" library, thanks, Brian!
* Notable Changes:
    * global and local variables are now separat in the palette, each sorted alphabetically, local vars marked with location pin (only in palette)
    * keyboard events are now always thread safe (the same as in Scratch nowadays)
    * the OF-block auto-unringifies when being dropped on ring-slots, such as in CALL
    * accidentally clicking on a custom block definition no longer fires up the Block Dialog
* Notable Fixes:
    * scroll menus if they are taller than the world
    * enabled color picker for pen trails on stage
    * track keyboard events after accepting ASK using the keyboard
    * improved support for emojis, thanks, Michael!
    * avoid occasional stuck text cursors, thanks, Bernat!
    * paint editor flood fill alpha issue, thanks, Bernat!
    * implicit parameter binding in visible stepping, thanks, Joan!
    * when deleting a temporary clone, detach all its parts and delete the temporary ones
    * new release protocol to avoid browser caching related version conflicts
* Translation Updates:
    * German
    * Greek
    * Turkish
    * Chinese
    * Spanish
    * Russian

### 2018-02-05
* Russian translation update, thanks, temap!

### 2018-02-02
* Libraries: Crayons library, thanks, Brian!

### 2018-02-01
* GUI: encode recorded sounds to base64
* snap.html: added version queries to script urls

### 2018-01-25
* Morphic: new DialMorph widget
* Blocks: added dial widget to POINT IN DIRECTION's drop-down menu
* Objects: added "rotate" option to Sprite context menu
* Threads, Blocks: fixed Joan's fix for #1972, because it broke HOFs
* new Sound Recorder, yay!! Thanks, Bernat!
* Blocks: fixed a glitch in the error-bubble handling mechanism

### 2018-01-23
* fixed #1972, thanks, Joan!
* Objects, GUI: When deleting a temporary clone, detach all its parts and delete the temporary ones

### 2018-01-22
* Morphic: fixed occasional stuck cursors, thanks, Bernat!
* Paint: fixed a flood-fill alpha issue, thanks, Bernat!I
* Blocks, GUI: minor fixes, contributed by the community
* various Translation updates, contributed by the community
* Blocks, Objects, Threads: separated global and local variables in the palette, marked local ones with location pin
* Blocks, Objects: added scroll events, thanks, Bernat!

### 2018-01-21
* Threads: fixed a scope-glitch in the new OF-block's drop-down mechanism
* Blocks: made the OF-block auto-unringify when dropped on ring-slots
* Blocks: disabled firing the Custom-Block-Dialog when accidentall clicking on a custom block definition script

### 2018-01-19
* merged a bunch of pull requests (unicode support for emojis, translation updates)

### 2018-01-18
* Blocks, Threads, BYOB, Store: included local methods in the OF-block's left drop-down menu

### 2018-01-17
* Objects: made keyboard events always be thread safe (same as in Scratch nowadays)

### 2018-01-04
* Objects: fixed #1979 - make sure to always re-focus the world-canvas

### 2018-01-04
* Morphic: scroll menus if they are taller than the world
* Morphic: added keyboard navigation for menus that scroll
* added "width" and "height" selectors to Pixels library

### 2018-01-02
* new "direction to..." primitive as variant of "distance to..." in "Sensing"

### 2017-12-12
* fixed #1963

### 2017-12-01
* GUI: started development on v 4.1.1
* BYOB, Store, Threads: Localization support for custom blocks (experimental)
* Tools: German translation of tools (experimental)

## v4.1.0.5
### 2017-11-26
* GUI: fixed #1933 - avoid creating "obsolete" blocks by not copying method blocks into sprites that don't understand them
* Store: fixed #1937 - allow stage width to be a minimum of 240 pixels

## v4.1.0.4
### 2017-11-16
* Threads: suppress "exit" context when forking a process while single-stepping, this avoids a false "reporter didn't report" error message
* Blocks: avoid coloring the block-highlight when re-coloring a syntax element, this prevents highlighted blocks inside LAUNCH statements to expand when repeatedly single-stepped.

## v4.1.0.3
### 2017-11-15
* Portuguese & Polish translation updates, thanks, Witek and Manuel!!
* escape xml attribute contents, thanks, Brian Broll!
* changed minimum stage width to 240
* new Audio Comp library for Guzdial-style sound samples fun

## v4.1.0.2
### 2017-10-28
* Store: fixed a glitch that raised an error instead of creating an “obsolete” block

## v4.1.0.1
### 2017-10-28
* Store: fixed a glitch when loading method blocks stored in sprite-local vars
* Objects: sped up "turbo" mode frame rate (slowing down "turbo" but making it more generally usable)
* Chinese and Catalan translation updates

### 2017-10-20
* fixed SVG encoding, thanks, Joan for the contribution!
* German translation update

## v4.1 "New York"
* Features:
    * polymorphic sprite-local custom blocks
    * inheritance of sprite-local custom blocks
    * inheritance of sprite attributes (x, y, direction, size, costumes, costume #, sounds, scripts)
    * first-class costumes and sounds
    * visual indicator (map-pin icon) for sprite-local custom blocks (i.e. methods)
    * camera snapshots for costumes and new sprites
    * localization support when typing expressions
    * support for user-forced line-breaks in custom block labels
    * ternary Boolean slot setting: support to limit Boolean input slots to “true/false” outside of rings and in palette
    * support for default values in custom block Boolean slots
    * experimental: duplicate block definition (hidden in shift-click context menu)
    * support for codification of String, Number and Boolean value types
    * costume icons indicate svg costumes
    * sprites’s rotation centers can be adjusted onstage
    * clones share their original sprite’s scripts, not a shallow-copy of them
    * a highlight-colored balloon indicates the number of active processes per shared script
    * new musical “notes”, "location", "footprints", "cross" and "keyboard" symbols
    * new “visible stepping” toggle button in the control bar
    * new "keyboard entry" toggle button in the scripts tool bar
    * turn on the “Inheritance support” setting per default
    * Assert data types to list operations for more meaningful error messages
    * programmatically hide and show primitives in the palette
    * new "pen trails" reporter primitive and stage context menu entry
    * two-item lists as x-y coordinate arguments for "point towards”, "go to" and “distance to” primitives
    * Piano keyboard as drop-down menu for entering musical notes, Thanks, Lucas and Michael!
    * Basic “instruments” support: sine, square, sawtooth and triangle waves
    * Support https in “url” reporter
    * splitting csv-text
    * prevent context menu and dragging for stage watchers in presentation mode
    * "floating" search and make-a-block buttons in the blocks palette
    * "Make a block" button in every category
    * experimental "download script" feature
    * new "Animation" library
    * new "Pixels" library for MediaComp
    * double-clicking a corral sprite icon flashes the sprite onstage
* Fixes:
    * changed keyboard shortcut indicator for “find blocks” to “^”
    * prevent Snap from “hanging” when encountering certain errors in visible stepping
    * only mark implicit parameters if no formal ones exist
    * optimized thread-launch and script highlighting to a single frame instead of formerly two
    * changed direction attribute of sprites to automatically confine to 0-360 degrees
    * fixed rotation-bug when flipping costumes in "only turn left/right" mode"
    * fixed variable renaming (“refactoring”) bugs, thanks, Bernat!
    * fixed “fill” block crash when applying the same color twice
    * fixed occasional empty drop-down menu items named “close”
    * fixed some typos
    * limited sprites' direction and coordinates to finite numbers
    * made block vars transient for block libraries
    * keep “undo” and “redo” buttons at the same location
    * fixed SVG encoding for exporting vector costumes

### 2017-10-17
* Blocks: keep “undo” and “redo” buttons at the same location
* Objects, Threads: added "with inpus" to TELL and ASK prims, changed TELL's C-shape to command-style input
* Objects: moved TELL and ASK templates in the palette up underneath RUN CALL
* Blocks: show all own vars and attributes in INHERIT drop-down when inside a ring
* Objects: made 'myself' default input for "a new clone of" reporter
* German translation update
* GUI, Objects: double-clicking a corral sprite icon flashes the sprite onstage

### 2017-10-12
* Threads: make sure to retain the current instrument when launching a new thread
* Threads: retain the current receiver when launching a new thread

### 2017-10-11
* Objects: make sure to fully remove parts from their anchor when deleting them
* Objects: fixed a bounding-box-detection bug in Costumes. Thanks, Simon Mong!
* Objects: fixed a flood-fill rounding bug. Thanks, Simon Mong!

### 2017-10-10
* Blocks: fixed #1885

### 2017-10-09
* changed label of "BYOB4 (Snap) history
* changed label of "Method" to "Method Editor", thanks, Brian!

### 2017-10-06
* Esperanto translate update, thanks, Sebastian!

### 2017-10-04
* Objects: limited sprites' direction and coordinates to finite numbers
* Store, BYOB: made block vars transient for block libraries
* updated “Animation” library

### 2017-09-28
* GUI: enable experimental setting for "ternary Boolean slots"
* GUI, Blocks: experimental feature: Download script, thanks, Bernat!
* Blocks: made "import script" undoable
* Objects: make sure inheritance hierarchies are consistently made temporary
* new "Animation" library
* new "Pixels" library for MediaComp

## v4.1 release candidate
### 2017-09-26
* Symbols: added 'keyboard' and 'keyboardFilled' icons
* GUI: fixed camera support for Safari, thanks, Bernat!
* Morphic: added stopEditing() event for keyboardReceiver
* Blocks: added floating toggle for keyboard entry to scripts toolbar
* GUI: make Snap! work in Safari 11 offline (file:// protocol) again, Sheesh
* GUI, Blocks: Support "Keyboard Editing" setting in scripts toolbar

### 2017-09-25
* GUI, Symbols: added “visible stepping” toggle button to the control bar
* fixed camera retina issues, thanks, Bernat!!
* Widgets: inverted property name for “enabled” to “isDisabled” for PushButtons
* GUI: hiding camera support (again), because of issues with Safari
* Objects: added "Make a block" button to every category
* Symbols, Objects: new "floating" make-a-block button in the palette

### 2017-09-21
* GUI, Objects: added floating search button to search palette to take the user back

### 2017-09-19
* BYOB: added “inherited” option to inheritable method templates’ context menu in the palette
* fixes for exporting resources, thanks, Michael!
* GUI: let costume icons indicate svg icons (again! how come this was lost?!, I hate Git!!)
* Objects, etc.: added floating search button to blocks palette

### 2017-09-18
* Symbols: added ‘location’ icon (map-pin)
* Blocks: added visual “map-pin” icon to indicate local method blocks

### 2017-09-14
* Blocks, Objects: added “inherited” option to inheritable variable templates’ context menu in the palette
* Objects: disabled context menu and dragging for watchers in presentation mode

### 2017-09-14
* GUI: disable camera (but make it accessible as hidden setting) because of retina issues

### 2017-09-08
* GUI, Objects, Widgets, Symbols: Camera Snapshot Dialog. Thank you, Bernat!!

### 2017-09-06
* Blocks, Threads: added “csv” option to the SPLIT primitive
* Threads: allow https query from locally loaded sources (thanks, Michael, for the hint!)

### 2017-09-05
* German translation update
* Threads, Objects: Renamed “http” block to “url”, use location.protocol (support https)

### 2017-09-04
* Blocks, Objects: fixed #1339

### 2017-08-30
* Blocks, Threads: Confine programmatically setting the “temporary?” attribute to dev mode
* BYOB: enable exporting script pics of custom blocks in the newest Chrome version, which disables opening tabs on dataURLs
* Morphic, Objects: fixed #1843
* Croation translation update, thanks, Zeljko Hrvoj!

### 2017-08-29
* Threads: allow two-item lists as x-y coordinate arguments for “distance to” reporter
* GUI, Objects: enable exporting costumes and variable-data in the newest Chrome version, which disables opening tabs on dataURLs
* Blocks, Threads: added “temporary?” as gettable and settable attribute for clones

### 2017-08-04
* GUI: enable exporting project summaries in the newest Chrome version, which disables opening tabs on dataURLs

### 2017-08-03
* enable exporting script pics in the newest Chrome version, which disables opening tabs on dataURLs

### 2017-08-02
* Blocks: Improve PianoKeyboard for keyboard navigation & entry
* Blocks, Widgets: Moved PianoKeyboard code to widgets.js
* Blocks, Widgets: Added sound feedback to PianoKeyboard
* New file: symbols.js (moved out of blocks.js)
* Updated credits to reflect Michael’s piano keyboard design contribution
* Threads: simplified “instrument” access
* Threads: enable multiple instruments per sprite in parallel threads
* GUI, Widgets: Changed piano keyboard design credits to  Lucas Karahadian
* GUI: fixed #1820

### 2017-08-01
* Morphic: Tweaks by Craig Latta (thanks!)

### 2017-07-31
* Blocks, Objects: fixed PianoMenu to work with block zoom etc.
* Threads, Objects, Blocks, Store: added “instruments”: sine, square, sawtooth, triangle waves

### 2017-07-27
* Objects: don't shadow costume # when editing a costume
* Blocks, Objects: remodeled context menu for inheritance to use check-boxes
* Blocks, Objects, Threads: fold two "stop" commands into one
* Objects: Allow two-item lists as arguments for "point towards" and "go to" primitives

### 2017-07-26
* Threads: programmatically hide and show primitives in the palette. Thanks, Cynthia Solomon, for this idea!
* Objects: added "pen trails" reporter primitive and stage context menu entry
* Threads, Blocks: added 'costume' and 'sound' as first-class data types
* Lists, Store, Objects, Threads: enable type-assertion for list elements (costumes, sounds)

### 2017-07-25
* Objects: fixed rotation-bug when flipping costumes in "only turn left/right" mode"
* BYOB: changed Block Editor label to "Method" for methods
* GUI: moved settings 'Keyboard Editing', 'Nested auto-wrapping', "Table support" and "Table lines" to hidden (default is "on" for all)

### 2017-07-15
* BYOB: shadow inherited scripts when changing the category of an inherited method

### 2017-07-12
* Blocks: fixed #1800. Thanks, Ken, for the bug report!
* Objects, Threads: “new clone of ...” primitive, made TELL, ASK primitives official
* Objects: only refresh certain propagated inherited attributes on being dropped
* Objects: renamed “delete” primitive to “inherit”

### 2017-07-11
* Objects: fixed an inheritance glitch for clones
* Objects: fixed variable inheritance for traditional Scratch-like clones
* Objects: tweaked inheritance indication for stage watchers
* Objects: fixed custom block inheritance for traditional Scratch-like clones
* Objects: optimized deleting traditional Scratch-like cones

### 2017-07-09
* Objects, Threads: added experimental (only shown in dev mode) “tell ... to ..." and “ask ... for ...” primitives

### 2017-07-08
* Threads: Assert data types to list operations -> meaningful error messages
* GUI: enable inheritance per default, must be user-enabled for existing projects

### 2017-07-07
* Objects, GUI, Store: tweak naming of instantiating to “clone”, enable inheritance by default
* Objects, GUI: run “When I start as clone” scripts when manually cloning a sprite, only position at hand pointer if no such scripts exist
* Morphic, Objects: confine turtle direction readout to 0-360 degrees, thanks, Cynthia for the bug report!!

### 2017-07-05
* Objects, GUI: UI for OOP

### 2017-07-04
* Morphic: Simplify contains()
* Unify Scratch-style clones and Snap-specimens, part 1: implement clones as specimens

### 2017-07-03
* Objects, Threads, GUI, Blocks, YPR: renamed Sprite::isClone to Sprite:isTemporary

### 2017-06-30
* Objects: reflect attribute inheritance status by ghosting / un-ghosting stage monitors
* Objects: migrate experimental “jukebox” reporters to the new “my sounds” reporter

### 2017-06-29
* Objects: manage inheritance relationships when setting a prototype or deleting a sprite

### 2017-06-27
* Objects: Inheritance of costumes and sounds - propagate changes
* Store: Tweaked loading sprites with inherited complex attributes (costumes, sounds)

### 2017-06-26
* Objects, Blocks, Threads, Tables, Store: First-Class Sounds
* Block: new musical “notes” symbol
* Objects, Blocks, Threads, GUI: inheritance support for sounds

### 2017-06-24
* Threads: tweaked error-catching & handling for receiver-less scripts
* Blocks: experimented with first-class sounds, deferred for now
* corrected a typo in the German translation. Thanks, Jadga, for reporting this!

### 2017-06-23
* Blocks: shadow inherited scripts on deleting blocks and comments via the context menu
* Blocks: shadow inherited scripts on “clean up”
* Blocks, Objects: shadow inherited scripts on keyboard entry
* Blocks: shadow inherited scripts on input edit, ringify/unringify, relabel action

### 2017-06-22
* Morphic: support for copy-on-write worlds (“selectForEdit”)
* Blocks, Objects: shadow inherited scripts on dragging & dropping blocks and comments

### 2017-06-21
* objects: stop all scripts for a sprite when shadowing or inheriting its scripts

### 2017-06-20
* threads, blocks, ide: make sure to stop active processes when deleting a block
* objects: migrate experimental “wardrobe” reporters to the new “my costumes” reporter

### 2017-06-19
* threads: fixed #1767 (optimized thread-launch and highlighting)
* threads, blocks: optimized thread count indicator for “glow” halos

### 2017-06-02
* added a thread count indicator to shared-script highlights

### 2017-05-31
* added inheritance support for scripts, partly done, copy-on-write is still missing

### 2017-05-30
* let clones share the orginal’s scripts without shallow-copying them

### 2017-05-12
* exposed ‘costumes’ as an attribute
* added inheritance support for the wardrobe (‘costumes’)
* added inheritance support for ‘costume #’

### 2017-05-09
* added tools to the library browser
* added attributes to the “delete” block’s drop-down menu

### 2017-05-05
* attribute inheritance support for ‘x’, ‘y’, ‘dir’ and ‘size’

### 2017-04-11
* Objects: export text from variable watchers to new browser tab by default

## v4.0.10.1
### 2017-04-10
* Revert to 4.0.10 to prepare for newly surfaced bug in the Chrome browser
* fixed #1707 (new Chrome blitting issue)

### 2017-03-22
* sprite-local custom block inheritance, first pass, still under heavy development

### 2017-03-21
* Change: Methods (sprite-local custom blocks) can no longer have block (instance) vars

### 2017-03-07
* Morphic, Objects, translation: let sprites’s rotation centers be adjusted onstage
* BYOB: added attributes for dynamic method definition lookup
* BYOB, Blocks, Objects, GUI: distinguish custom blocks by shared “isCustomBlock” attribute

### 2017-03-01
* Objects: experiment with new dynamic method (cache) updating
* Objects, Blocks, BYOB, Store, Threads, GUI: roll-back double-pointer container cache for methods

### 2017-02-27
* Objects: experiment with new “methods” attribute

### 2017-02-16
* turn “definition” property of custom block instances into a double-pointer (Variable) structure, in preparation for OOP (method inheritance)

### 2017-02-14
* Lists: remove experimental methods for object-use
* Objects, BYOB: disable (comment out) experimental block inheritance for now

### 2017-02-09
* Blocks: fixed #1406

### 2017-02-09
* Blocks: prevent Snap from “hanging” when encountering certain errors in visible stepping mode
* Threads: fixed #1618 - only mark implicit parameters if no formal ones exist

### 2017-02-07
* Blocks: catch block label part issues, prevent palette from not showing

### 2017-02-02
* Objects, BYOB: highly experimental custom block inheritance, under construction…
* Blocks: fixed #1650

### 2017-02-01
* GUI: let costume icons indicate svg costumes

### 2017-01-31
* Lists: experimental methods for use as objects (hierarchical dictionaries)

### 2017-01-30
* Store: fixed #1645

### 2017-01-27
* Blocks, Objects, Threads, Store: added support for codification of String, Number and Boolean value types

### 2017-01-24
* BYOB: changed “new line” symbol to $nl
* German translation update
* BYOB: new experimental feature: duplicate block definition (hidden in shift-click context menu)

### 2017-01-23
* BYOB, Blocks, Store: added support for default values in custom block Boolean slots
* GUI, Blocks, Store: allow project-setting “Ternary Boolean slots” to be switched off
* German translation update

### 2017-01-20
* Blocks: improved inspectability of local variables
* GUI: improved library browser, thanks, Michael!
* BYOB: support user-forced line-breaks in custom block labels
* Blocks: limit Boolean input slots to “true/false” unless inside a ring or in the palette

### 2017-01-19
* GUI: began new development version
* Blocks: fixed #1630
* Objects: support localization when typing expressions
* German translation update
* Blocks: changed keyboard shortcut indicator for “find blocks” to “^”
* GUI: fixed #1631

### 2017-01-13
* GUI: added "savingPreferences" flag for bh's "Eisenbergification" library, sigh.

## v4.0.10
* Features:
    * auto-wrapping of C-slots
    * undo / redo for blocks, unlimited, but has some issues
    * search field for projects, thanks, Bernat!!
    * basic typography support for custom block labels, thanks, Bernat!!
    * treat JS-function reporters the same as variable getters wrt rings
    * new url switch #dl: for downloading raw shared projects
    * new url option switch: &noExitWarning
    * svg support for images from the web (svg files have been supported for a long time)
    * use media dialog for browsing and importing sounds
    * highly experimental infix-expression-to-reporter parser. Thanks, Bernat, for the brilliant idea to add it to the search-blocks field!
    * hierarchical menus, also for custom blocks, thanks, Brian!
    * variable refactoring, thanks, Bernat!
    * “#run:” flags (same as “#present:”): ’editMode’, ‘noRun’, ‘hideControls’, thanks, Brian!
    * Libraries Browser, thanks, Michael!
* Fixes:
    * Music (play note) to work again in new and recent browser versions (Chrome 55)
    * IDE layout: fixed resizing issues when the window becomes too small
    * Keep left-over blocks from “relabel” around
    * Evaluate the generic WHEN-hat block’s predicate and first step of the attached script in the same atom
    * “go back _ layers” to work with out-of bounds numbers, thanks, Brian Broll!
    * Translation updates (Russian, Polish, Danish, Portuguese, Catalan, German)

### 2017-01-11
* Error handling improvements for custom drop-down submenus and generic WHEN hats

### 2017-01-10
* German translation update

### 2017-01-09
* GUI: “#run:” flags, thanks, Brian!
* GUI: Libraries Browser, thanks, Michael!
* Blocks: Fixed out of bounds issue with “go back _ layers”, thanks, Brian Broll!

### 2017-01-08
* Blocks: fixed #1608

### 2017-01-05
* Blocks: refactored variable refactoring code
* fixed #1604
* Blocks, GUI: changed shortcut symbol for “Ctrl” key to ^
* Blocks: fixed #696 - Keep left-over blocks from “relabel” around

### 2017-01-04
* Variable refactoring, yay! Thanks, Bernat!!
* Threads: fixed #1602

### 2017-01-03
* Hierarchical menus, thanks, Brian!
* Tweaks to hierarchical menus

### 2017-01-02
* Morphic: use animations to schedule tool tips

### 2016-12-31
* Morphic: support for menu shortcuts (ongoing)
* GUI, Blocks: menu shortcuts (experimental)

### 2016-12-29
* BYOB: Disabled hover-help for custom blocks (some people find it annoying)
* GUI: Hide setting for “prefer smooth animations” (now - mostly - redundant)

### 2016-12-27
* GUI, Threads, Objects, Store: Disable JS-Functions, to protect users from malicious scripts, commented out for now

### 2016-12-25
* GUI: update undrop controls when switching sprites and display modes

### 2016-12-23
* Objects: tweaked reporterize infixParser

### 2016-12-22
* Objects: simplified reporterize>>blockFromAST
* Threads: prevented color slots from flashing. Good catch, thanks, Joan!

### 2016-12-21
* Objects: added Boolean operators to “reporterize”

### 2016-12-20
* Objects: tweaked “reporterize”

### 2016-12-19
* GUI: new url-switch: &noExitWarning
* Blocks, Objects: highly experimental infix-expression-to-reporter parser

### 2016-12-13
* Catalan translation update, thanks, @jguille2 !

### 2016-12-12
* fixed #1560
* Morphic: added a few in-/out- only easing functions for animations
* Morphic: added easeOutElastic function thanks to @joshmarinacci’s excellent blog post

### 2016-12-09
* Translation updates (Russian, Polish, Danish, Portuguese)

### 2016-12-08
* GUI: use media dialog for browsing and importing sounds

### 2016-12-07
* Morphic, GUI: URI-encode SVG data for Firefox-compatibility

### 2016-12-06
* GUI: Switch to asynchronous loading of resources (costumes, sounds, libraries etc.)
* Morphic: Added support for dropping links to SVGs from other web pages onto the World
* GUI: Support importing unrasterized SVG_Costumes from the “Costumes” and “Backgrounds” dialog

### 2016-12-05
* Objects: fixed #1543

### 2016-12-01
* GUI: fixed #1540
* Morphic, Blocks, GUI: Filter Project Names in the “open” dialog, thanks, Bernat!!
* GUI: update scrollbars of the project dialog as the project list is filtered
* Blocks: fixed #1522

### 2016-11-29
* Blocks: added undo / redo icons to scripts pane context menu
* Blocks: added hidden “clear undrop queue” option to scripts pane context menu

### 2016-11-28
* Objects, Blocks: map keyboard shortcut ctr-y to “undrop” (in addition to shift-ctrl-z)
* Blocks: added symbols for “turnBack” and “turnForward”
* Morphic: added support for floating tool bars in scroll frames
* Blocks: added dynamic “undo” / “redo” buttons to each scripting pane
* GUI, Blocks: Enable nested auto-wrapping by default

### 2016-11-25
* Morphic: First-class animations
* Blocks, Objects, GUI: Switch to new animation mechanism, add a few

### 2016-11-24
* Morphic, Store: work around a dreaded FF NS_ERROR_FAILURE for supporting retina
* Blocks: drag-origin support for blocks and comments duplicated inside a block editor

### 2016-11-23
* Blocks, Morphic: “Undrop / Redrop” support for sticky comments

### 2016-11-22
* Blocks, GUI: “Undrop / Redrop” for deleting blocks via the context menu or in keyboard edit mode
* Morphic: support “onBeforeDrop” callback parameter in slideBackTo()

### 2016-11-21
* Blocks: Delete variable getter blocks if the user drops them on template slots (e.g. script vars)

### 2016-11-14
* Blocks, Objects: Unlimited “Undrop / Redrop” of block drops per script pane and session (under construction)
* GUI: new url switch #dl: for downloading raw shared projects

### 2016-11-09
* Blocks, GUI: preference setting to enable auto-wrapping inside nested block stacks
* Blocks: Treat JS-function reporters the same as variable getters wrt rings
* German translation update

### 2016-11-07
* New C-Slot auto-wrapping / snapping feature (similar to Scratch)

# v4.0.9.2
### 2016-11-10
* new Galician translation, yay!! Thanks, tecnoloxia.org!
* Italian translation update
* German translation update

## v4.0.9.1
## v4.0.9
### 2016-10-27

### 2016-10-24
* Text Editing Tweaks, thanks, Bernat!!
* Store: fixed #1472
* Threads: Tweak continuations

### 2016-10-21
* Threads: Fixed #1422

### 2016-10-20
* Blocks: Tweak Keyboard-Entry

### 2016-10-11
* Objects: fixed #1456 (collect message names from all scripts, including custom block definitions)

### 2016-10-11
* Blocks: make sure to fix multi-args when deleting a custom reporter definition

### 2016-10-10
* Morphic: configure autoscrolling
* GUI: suppress autoscrolling for the palette and the project dialog

### 2016-10-07
* Blocks: [Keyboard-Entry] if an inserted block has inputs, go to the first one

### 2016-09-29
* Objects: fixed #1437

### 2016-09-24
* don’t update the recursion cache when updating a custom block definition

### 2016-09-23
* custom block execution: only yield if directly recursive and unwrapped (“speed up”)
* new feature: “wait 0” or “wait `<empty>`” now yields once, unless warped
* revert treating visual stepping as thread safe, because of music scheduling

### 2016-09-22
* renamed “single stepping” to “visible stepping”, thanks, Brian!
* updated German translation

### 2016-09-21
* remove shift-click-to-forward-one-frame option for the “resume” button

### 2016-09-20
* atomic synching of single-stepping

### 2016-09-19
* new “stepForward” symbol
* dragging the single-step speed slider all the way to the left turns the “resume” side of the “pause” button into “stepForward”

### 2016-09-18
* Treat single-stepping as thread safe (reverted on 160923)
* Allow user to trigger one step at a time, both in normal and single-stepping mode

### 2016-09-16
* enable single stepping for clone-scripts w. multiple blocks flashing per script
* enable single stepping for custom block definitions
* Objects: fixed #1410 (duplicating a sprite does not duplicate its sounds)

### 2016-09-15
* new single stepping feature (like Scratch 1.4) with flashing blocks
* slider for single-stepping speed
* pausing now flashes the currently active blocks

## v4.0.8.7
### 2016-08-12
* Threads: for hidden sprites display ASK questions in the input box
* Morphic: replace deprecated KeyboardEvent.keyIdentifier with .key

## v4.0.8.6
### 2016-08-03
* Store: restore implicit formal parameters for serialized lambdas

## v4.0.8.5
### 2016-07-31
* GUI: fixed #1348 - opening projects from url not working in non-English

## v4.0.8.4
### 2016-07-20
* GUI: fixed #1333 - paint a new costume not working in retina mode in FF and Edge

## v4.0.8.3
### 2016-07-19
* Morphic: avoid blitting artifacts for non-integer devicePixelRatios in Firefox
* Widgets: fixed 3D corners for buttons in Firefox for Windows
* Objects: fixed color collision detection for retina mode
* Threads: enable broadcasts to be sent to specific sprites (experimental)

## v4.0.8.2
### 2016-07-17
* Morphic: fixed collision detection for non-integer devicePixelRatios

## v4.0.8.1
### 2016-07-15
* Blocks: activate generic hat blocks inserted via keyboard editing

## v4.0.8
### 2016-07-14
* New Features
  - Retina Display Support, thanks, Bartosz Leper!!
  - Additional Graphic Effects, thanks, Dylan Servilla!!
  - Interactive Toggle Switches for Boolean Slots and Literals
  - Resizable Palette (double-click on resizers to slide back to normal)
* New Default Settings (now enabled by default)
  - Keyboard Editing
  - Tables Support
* Bugfixes (most notable only):
  - reject dropping hat-blocks into block editor scripting areas
  - accept multi-line inputs (e.g. in JS-functions or code-mapping blocks) with shift-enter
  - prevent “make a block” dialog from being closed by pressing “OK” if no label text has been specified
  - show error message balloons happening in other sprites next to their icon in the sprite-corral
  - (again) enable recursive cloning
  - prevent expandable blocks from expanding / collapsing inside the palette
* Translation updates
  - Italian
  - Swedish
  - Chinese
  - Russian
  - Catalan
  - German

## v4.0.7.2
### 2016-05-09
* Threads: fixed #1212 - Null continuation doesn't escape from calling context.
* Updated Simplified Chinese translation, thanks to @ubertao!
* Media import dialog with thumbnail, thanks to @ubertao!

## v4.0.7.1
* cloning speed-up

### 2016-05-04
* Morphic, Objects, Blocks, Threads, GUI: Partially shallow-copy clones for speed
* new Estonian translation! Yay!! Thanks, Hasso Tepper!


## v4.0.7
### 2016-05-02
* first class sprites, new MY reporter block and extended functionality of TOUCHING
* fixed switching from list watcher to table view inside sprite speech bubbles
* fixed paint editor automatic rotation center issue
* enhanced functionality to SET a sprite’s attributes
* execute clone initialization scripts’ first step in the same frame as the clone command
* auto-repair (sorta) certain broken project files
* Threads: More aggressive emergency yielding
* “corpsify” deleted sprites, which might still be referred to by variables and lists
* Blocks: simplify block copying
* experimental hidden “live-coding support” preference
* updated penTrails library to shrinkWrap generated costumes
* demos from the documentation:
    * http://snap.berkeley.edu/run#cloud:Username=jens&ProjectName=population
    * http://snap.berkeley.edu/run#present:Username=jens&ProjectName=Woodworm
    * http://snap.berkeley.edu/run#present:Username=jens&ProjectName=Ferris%20Wheel%202016
    * http://snap.berkeley.edu/run#cloud:Username=jens&ProjectName=PathFollower
    * http://snap.berkeley.edu/run#present:Username=jens&ProjectName=cartwheel
    * http://snap.berkeley.edu/run#cloud:Username=jens&ProjectName=rotation
* new Indonesian translation. Yay!! Thank you, Alexander Liu!!
* Translation updates: Slovenian, Portuguese, Chinese
* minor bug fixes

## v4.0.6
### 2016-03-16
* Store, Objects, GUI: fixed #99 (saving linked lists)
* Objects: fixed #1163
* added web api / https reporter library
* Blocks, Store: New “transient variable” feature
* German translation update

### 2016-03-06
* Objects: Reenable custom hat blocks when dropping a sprite

## v4.0.5
### 2016-02-24
* table views

### 2016-01-22
* Blocks: Fixed a slight rendering glitch when deleting reporters via the context menu

### 2016-01-19
* Threads, Store: Throw an error for “obsolete” blocks instead of (forever) doing nothing (and thus often freezing and crashing). Thanks, Paul, for helping identify this!

### 2016-01-18
* Paint: avoid pixel collision detection in PaintCanvas (optimization)
* BYOB: fixed a zebra coloring glitch in the block editor

### 2016-01-17
* BYOB: preserve custom block instances’ block var values when editing their definition

### 2016-01-16
* Blocks: fixed a multi-line input slot layout glitch

### 2016-01-11
* BYOB: fixed #1107

### 2016-01-08
* BYOB: fixed #1098
* Threads: remove a redundant yield from the fork primitive
* GUI: fixed #1099, thanks, Michael!
* Portuguese translation update, thanks, Manuel!

### 2015-12-23
* Morphic: fixed #1083

### 2015-12-22
* Blocks, Objects, Threads, Locale: revert to ’any key’ in the key-pressed menu
* GUI: Improve sorting and tab switching in the Project Dialog, Thanks, Michael!

### 2015-12-21
* Morphic: Native Copy & Paste support, thanks, @cyderize, for this contribution!!
* GUI: Code tweaks
* Portuguese translation update, thanks, Manuel!

### 2015-12-19
* Objects: Optimization: Don’t redraw unrotateable sprites on TURN

### 2015-12-18
* new Arabic translation, yay!! Thanks Tarek Galal!!!

### 2015-12-17
* Threads: fixed #1071 “length of list” type error possibility by no longer guaranteeing that the red “length of” reporter also works on text input

## v4.0.4 (draft):
* Show result bubble when the user clicks on a command script that uses REPORT (You can now click on REPORT and it actually does something)
* New generic “When” hat block, enhances red stop button behavior
* New block (instance) variables feature (experimental)
* evaluator performance optimizations
* Morphic grab-threshold fix for scroll frames
* fixed several block rendering glitches
* List category LENGTH reporter now also works on text
* Changed “any” to “random” (in English only)
* new FILL primitive in the Pen category
* switched to animation frame scheduling, please use TURBO for music
* Updated German translation

### 2015-12-15
* snap.html: switch to animation frame scheduling because Chrome sucks sooooo much!!!!
* GUI: pushed version to 4.0.4

### 2015-12-15
* Cloud: 10 MB cloud upload limit for media per project
* Objects, Paint: Automatic Sprite Center Detection, Thanks, Craxic!!
* Morphic: Handling of diacritics, [Alt] + key in input fields (Windows), Thanks, DanDoro!!
* NL translation update
* Use Blob API to Save Files (to Disk), Thanks, Michael!!

### 2015-12-14
* Objects: added “fill” primitive to the Pen category
* Updated German translation
* GUI: Directly download projects from cloud by holding shift while opening - commented out
* GUI, Cloud: show size of uploaded / downloaded projects
* GUI, Cloud: upload size limit of 5 MB - commented out

### 2015-12-12
* Locale: change English ‘any’ (in “item of”) to ‘random’ because teachers

### 2015-12-11
* Threads: extend red LENGTH reporter to also work on Text
* GUI, Objects, Blocks: extend the red stop button to reflect whether custom hat blocks are paused (indicated by a red square instead of the stop sign)
* Blocks: Tweak C-Slots to better fit inside reporters

### 2015-12-10
* Store: persist block (instance) vars
* Threads: only show result bubble on user-clicked scripts if “Report” is in the lexical script (not inside a reporter block definition)
* Morphic: obey grab threshold when dragging inside scroll frames

### 2015-12-09
* Threads: allow invoke() to operate on both blocks and rings with arguments
* Blocks: cache reporter slot specs for evaluation performance (30% speedup)

### 2015-12-08
* Objects, Blocks, Threads, GUI, Store, Locale: Automatically enable/disable custom hat blocks when they’re used in a project
* BYOB: initialize custom block vars on every definition-refresh

### 2015-12-07
* Threads, GUI: Stop button stops / restarts custom hat blocks, green flag starts custom hat blocks

### 2015-12-02
* Threads: Only support block vars for blocks that actually define any, to avoid race conditions among parallel global blocks with the same definition that also access sprite-local variables

### 2015-12-01
* BYOB, Blocks: Fix BlockMorph.fullCopy() for block vars

### 2015-11-28
* BYOB, Store: Fix some bugs related to block vars (zebra coloring etc.)

### 2015-11-27
* Blocks, BYOB, Store: new experimental block variables feature
* BYOB: more prototype label rendering fixes

### 2015-11-26
* Threads, Blocks: Performance optimizations (replace “contains” with chained tests)
* German translation update (for custom hat blocks)

### 2015-11-25
* Threads, Objects, GUI, Store: Generic “When” hat block
* BYOB: fixed a rendering bug when using plain prototype labels

### 2015-11-24
* Blocks: fix a re-rendering glitch when changing block specs in dev mode
* Threads: add optional receiver (environment) to invoke() function

### 2015-11-21
* Threads: Show result bubble when the user clicks on a command script that uses REPORT (You can now click on REPORT and it actually does something)

### 2015-12-04
* Cloud: doubled the number of supported backend slices
* Cloud, GUI: support new “raw” cloud project services

### 2015-11-20
* Lists: fixed linked lists identity loss when showing watchers

### 2015-11-17
* Blocks: fixed a zebra-coloring glitch for BooleanSlotMorph

## v4.0.3 (unreleased)
### 2015-11-16
* Blocks, GUI: Slightly less transparency for dragged reporters and sprite icons
* new Bulgarian and Romanian translations contributed!
* fix for IE backspace and tab errors contributed!
* better resource loading mechanism contributed!

### 2015-11-14
* Frames, snap.html, snap_slo.html: remove initial version for now, needs more low-levelish rewrite (Map-based “shortcut” design doesn’t cut it).

### 2015-11-13
* Frames, snap.html: initial version of a new general purpose prototypal single inheritance object system
* snap_slo.html: alternative animation-frame based outer scheduler, experimental
* Threads: added optional timeout to the new synchronous invoke(block) function
* Blocks: fixed too brutally optimized redraw for “ringify” and “unringify”

### 2015-11-12
* Blocks, Objects, Threads: new internal slot type: %cl for auto-reifying C-slots that reject reporter drops. Changed (hidden) “for each” to reject reporters in C-slot

### 2015-11-11
* Objects: fixed a between slideBackTo() and possible running scripts in sprites, thanks, Paul, for reporting it!

### 2015-10-09
* Morphic: cache fullImage and fullBounds when dragging
* Blocks: make reporters semi-transparent while dragging
* GUI: make SpriteIcons semi-transparent while dragging
* Blocks: make it harder to drop reporters onto filled custom C-slots and variadic slot arrows
* Blocks: make ScriptsMorphs notice transparent clicks (addresses #997)
* Blocks: fixed “undrop” for replacing C-slots with reporters
* BYOB: fixed ctrl-f for the BlockEditor in all situations

### 2015-11-07
* Threads: invoke a block synchronously

### 2015-11-04
* Morphic: new grabTheshold preference to suppress accidental grabbing through micro-movements of the hand
* GUI: hidden (shift-click) option to adjust the grabThreshold for the current session
* Lists, Blocks: Expand list watchers inside result bubbles to show everything
* Objects: Expand list watchers inside speech/thought bubbles to show everything
* Morphic: fixed a bug that occasionally expanded the Hand’s bounds when dragging morphs

### 2015-11-01
* BYOB: Script pic: Always export comments attached to custom block definitions
* Blocks: fixed #982 (made %interaction slot static)
* Morphic: removed an obsolete line (“dragOrigin”)
* BYOB: make block editor big enough to show the whole definition, if possible
* BYOB: remember user-set position and size of block editor when pressing “OK”, per session (not serialized in project)
* Blocks: speed up stacking of commands (also when done programmatically) by suppressing redraws
* Morphic, Blocks, BYOB: Suppress redundant redraws

### 2015-10-30
* Blocks: Tweak precision of rendering of transparent “holes”
* updated Czech translation
* Morphic: Streamlined nop-stepping
* Blocks: Let SyntaxElements step (again), for better input slot editing experience

### 2015-10-07
* BYOB, Objects, GUI: New “Remove Unused Global Blocks” Feature
* GUI, Lists: “Export Project Summary” improvements:
  - show variable values as watcher pics
  - expand list watcher pics to show their complete contents (1. level)
  - url for shared projects
  - table of contents
  - basic support for sprite nesting and inheritance
  - make the summary “browsable” instead of editable
  - outline around sprite / stage snapshots
  - experimental hidden (shift-click) “drop-shadows” option
* GUI: Rearrange project menu, only show global blocks-related ops if there are any
* GUI: Remove URL location.hash information when loading a new project
* Store: Fix deserialization support for projects using inheritance
* German translation update

### 2015-10-02
* GUI, Blocks, BYOB: New “Export Project Summary” Feature, also: exporting script pics now includes attached comments
* Blocks, Objects, Threads: Key hat block and key sensor support for “any” key
* German translation update

### 2015-09-23
* Morphic, Objects: Improve display precision (stop rounding display coordinates)
* Added “ceiling” function, thanks, Michael
* Updated various translations

### 2015-09-15
* new Croatian translation. Yay!! Thanks, Zeljko Hrvoj!
* fixed #925

### 2015-08-14
* Blocks: fixed #907

### 2015-08-09
* Interlingua support, yay!! thanks, Ken Dickey!

## v4.0.2
### 2015-08-06
* Polish & German translation updates

### 2015-07-30
* Blocks: improve keyboard editing for embedded rings

### 2015-07-28
* GUI: fixed relative urls, thanks, Michael!
* Morphic: escalate origin with “accept” and “cancel” events from text cursors
* BYOB: keep BlockEditors open when <enter> or <esc> keys are pressed
* GUI: stop keyboard editing of blocks when selecting another sprite

### 2015-07-27
* Polish translation update, thanks, Bartosz Leper!
* Turkish translation. Yay!! Thanks, Hakan Ataş!
* Hungarian translation. Yay!! Thanks, Makány György!
* GUI: relative-url fixes, Thanks, Michael!
* Morphic: enable exporting a screenshot of the World
* Morphic: enable more fine-grained control over dragging position correction
* Morphic: enable all Morphs to “scrollIntoView()”
* Morpic: keyboard accessibility for menus
* Objects: fixes and enhancements for nested sprites
* Blocks, Objects, BYOB, GUI: keyboard editing support
* Objects, Blocks, Threads, GUI, Store, Widgets: Prototypal inheritance for sprite-local variables
* Objects, Blocks: enable monitoring closurized non-locals and thread-temporaries (script vars of running processes)
* GUI: stage resizing handle

### 2015-06-26
* Morphic: Fix Inspector duplication, update documentation

## v4.0.1 (unreleased)
### 2015-06-25
* Morphic, Objects, Blocks, XML: Optimizations and dramatic speed-up. Thanks, Nathan!!
* Objects: push maximum clone count up to 1000, tweak Note::play

### 2015-06-08
* Blocks: Fixed #820

### 2015-05-23
* BYOB: Fix encoding glitch

### 2015-05-21
* BYOB: Fix encoding for exported libraries of global blocks

### 2015-05-18
* Objects, GUI: Fix encoding for exported sprites (esp. comments)
* Portuguese translation update, thanks, Manuel!!

## v4.0
### 2015-05-01
* Morphic, Blocks: select all text when first clicking an input slot
* BYOB: indicate numeric inputs in the block prototype with the # sign
* Threads: return empty string when querying first letter of a list
* GUI: hide “save to disk” option behind shift-click again (has issues in Chrome)
* GUI: parameters for embedding projects in iFrames, thanks, Bernat!

### 2015-04-26
* Store: fixed #784

### 2015-04-15
* Threads: flush Stage>>keysPressed when prompting the user
* Objects: fixed #770

### 2015-03-25
* Threads: fixed #752

### 2015-03-15
* Store: fixed #743
* GUI, html: switch from beta to release candidate

### 2015-03-09
* Blocks: fixed #738
* GUI, Blocks: Only enable input caching for blocks

### 2015-03-06
* Blocks: fixed #736

### 2015-03-02
* BYOB: fixed #730

### 2015-02-28
* Blocks, Store, GUI: Cache inputs, accelerates evaluating recursive reporters and warped / turbo recursive commands by up to 40%
* Objects: slightly optimize warped / turbo execution
* Threads: fixed #715
* BYOB: fixed #716

### 2015-02-24
* Store: fixed #725

### 2015-02-23
* Blocks, Objects: Add user-interaction choices to the “When I am ...” hat block
* Update German translation
* Store: Avoid incompatibility warning for very old (pre-earmarked) projects

### 2015-02-20
* Malayam, Tamil and Telagu translations, thanks, Vinay Kumar!!
* Un-hide “Save to disk” feature (currently supported by both Chrome and Firefox, but not by Safari)
* Update German translation
* GUI: Make “project data in URLs” a hidden dev option (prevent long urls per default)

### 2015-02-06
* GUI: Added url switch #cloud: to open a shared project in edit mode

### 2015-01-28
* Objects: Fixed #710

### 2015-01-21
* Objects: Keep layering of nested sprites thru drag & drop
* GUI, Store, BYOB: Generate ScriptsPaneTexture programmatically
* GUI: Fix Zoom Dialog’s sample background in “flat” design
* Updated Korean and Catalan translations, thanks, Yunjae Jang and Bernat Romagosa!
* Objects: Fix speech bubbles of dragged nested sprites

### 2015-01-13
* BYOB: fixed #702
* GUI: fixed #680

### 2015-01-12
* Cloud, GUI: Backend load balancing support, eliminate now obsolete authentication roundtrip, Cloud error message tweaks
* Store: notify users of potential incompatibilities when opening projects created in other forks (e.g. BeetleBlocks)
* Threads: Don’t highlight scripts running inside clones (boosts performance), Thanks, @aranlunzer, for the hint!
* Objects: Disable clones from being edited via their context menus or double-click
* Italian translation update, thanks, Alberto Firpo!
* GUI: add additional yields to nextSteps() (work around a bug in Chrome)

### 2014-12-17
* Objects, Store: Experimental “processes” count watcher (hidden in dev mode)
* Threads: Remove terminated processes from expired clones
* Threads: Let “zombifying” scripts access receivers’ local vars

### 2014-12-15
* New Swedish translation! Yay!! Thanks, Erik A Olsson!

### 2014-12-11
* Threads: yield after each cycle in the experimental “forEach” primitive

### 2014-12-06
* Store: Fixed #668

### 2014-12-05
* Morphic: Avoid auto-scaling artefacts in Safari on retina displays (resulting in “traces” when dragging items)

### 2014-12-04
* Threads, Objects: Experimental “ForEach” primitive (hidden in dev mode)
* GUI: Another attempt at pointing the project dialog to the cloud if signed in

### 2014-12-03
* Morphic: Cache actual bounding box of the Pen arrow shape
* Threads, Objects: Improve edge-collision detection of default sprite “arrow” shape

### 2014-12-02
* New Kannada translation. Yay!! Thanks, Vinayakumar R!!

### 2014-12-01
* Objects: Hide hidden elements in the project thumbnail
* GUI: Point project dialog to cloud if already signed in, thanks, Michael!
* favicon: Transparent background, thanks, Michael!

### 2014-11-225
* Threads: Fixed #656

### 2014-11-225
* Threads: Evaluator optimizations (reducing the stack size for reporters)
* Threads: Full TCO (tail-call-elimination), now Snap! *is* Scheme :-)

### 2014-11-224
* Threads: Fixed #318
* Objects: Fixed #416
* Objects: Fixed #372
* Threads: Fixed #644
* Store: Fixed #34
* Threads: Fixed #131
* snap.html, favicon.ico: new Favicon, thanks, Michael!
* Threads: improved whitespace detection for “split” primitive, thanks, Michael!
* Threads: tail-call-elimination for reporters experiment (commented out, under construction)

### 2014-11-213
* Threads: Fix “stop this block” primitive for tail-call-elimination

### 2014-11-21
* Threads, Blocks: Fix STOP THIS BLOCK’s lexical awareness

### 2014-11-20
* Lists: Fixed #642 avoid “freezing” when calling CONS on non-list/null
* Threads: Fixed #364 avoid “freezing” when calling LAUNCH on empty ring
* Threads: Added optional “onComplete” callback to Process, thanks, @bromagosa!
* GUI: Set Default Save location to Cloud on load, thanks, @cycomachead!
* GUI: Updated the “About” Dialog with a mention of support from CDG (SAP Labs)
* BYOB: Percent sign fix for block labels, thanks, @natashasandy!
* Threads: fix ‘line’ option in ‘split’ block for Windows files, thanks, @brianharvey!
* Morphic: fix slider range 1, thanks, @tonychenr !
* translation update, thanks, Manuel!

### 2014-11-17
* Threads, Blocks: Treat REPORT blocks inside custom command definitions as STOP THIS BLOCK / IGNORE INPUTS

### 2014-11-14
* Threads, Store: Fix reporting out of nested custom C-shaped blocks

### 2014-11-06
* Morphic: Enable mouseMove events with right button pressed

### 2014-10-08
* Objects: fixed #608, #610

### 2014-10-06
* GUI, Objects: fixed #604. Thanks, @Gubolin!

### 2014-10-02
* GUI: New feature - minimal stage mode (shift-click on small-stage button)

### 2014-10-01
* Threads: workaround for some REPORT issues
* Objects: fixed #599 (disable IDE keyboard shortcuts in presentation mode)
* Blocks: correctly display symbol for %obj type input slots in the prototype template
* Portuguese translation update, thanks, Manuel!

### 2014-09-30
* Objects: fixed #593 match broadcast numbers with event hat blocks containing strings that can be parsed as numbers
* BYOB: allow percent symbols in custom block texts (fix #361), thanks, @Gubolin!!
* Morphic: allow negative min/max values for sliders (fix #285), thanks, @Gubolin!!
* Objects: fixed #378 (disable context menus for boolean representations)
* Blocks: fixed #584

### 2014-09-29
* Threads: fixed #591 fully copy local variables for sprite duplicates and (Scratch-like) clones
* Portuguese translation update, thanks, Manuel!
* fixed #590 (Russian translation syntax glitches) Thanks @alexf2000 !
* Paint: flood fill issue fixed, thanks, Kartik!

### 2014-09-22
* Blocks: Make upvars mutable
* GUI: fixed #585 (sprite name conflict with stage). Thanks, Michael, for the report!

### 2014-09-18
* Threads: fixed #174, replace UpvarReferences with references to Variable objects, fixes upvar scope issues

### 2014-09-17
* Threads, Objects, Store: Refactor variables handling, introducing Variable objects, all functionality stays the same

### 2014-08-13
* Threads, Blocks: enable Zombiefication of JS-Functions
* Morphic: Fix #563 (Paste into Chrome), thanks, @Muon, for the hint!

### 2014-07-30
* Objects: propagate HIDE and SHOW to nested sprite parts
* GUI: propagate DELETE to nested sprite parts
* Blocks, Threads: export script pic with result bubble (shift-context-menu of reporter scripts)
* updated Portuguese translation, thanks, Manuel!

### 2014-07-29
* fixed #526, thanks, Bernat, for reporting it!
* Objects, GUI: duplicate and clone nested sprites
* GUI, Store: export and import nested sprites
* Objects: double clicking on a sprite in the stage selects it in the IDE
* Objects: added ‘move’ option to the sprite context menu, lets the user move (nested) sprites in edit mode without changing their layering, and also sprites marked “undraggable”
* updated Portuguese translation, thanks, Manuel!
* updated German translation
* Morphic: fixed #497 (prevent bubble shadows from getting cut-off)
* Blocks: keep result-bubbles within the enclosing scripting pane

### 2014-07-28
* Lists: fixed "Load Failed Type Error Cannot read property 'isLinked' of null"
* Threads: enable “JS function” block to create custom control structures and HOFs

### 2014-07-25
* Objects, Threads: new “JavaScript function” primitive. Go figure…
* GUI: updated Credits

### 2014-07-24
* Objects: fixed “lost sprites bug” - ensure duplicated sprites keep wearing their current costume through save and re-load
* GUI, Objects: improve unique sprite- and costume names
* Threads: Display “empty” Contexts (e.g. continuations) as empty rings

### 2014-07-23
* Objects: Scale down oversized images to current stage dimensions. Thanks, Dan, for reporting this!

### 2014-07-22
* Objects, Threads: fixed #521 (deleting variable watchers by dropping them on the palette results in wrong ones to be created when showing them again)

### 2014-07-21
* fixed #518

### 2014-07-18
* Lists: incorporate Brian’s adhoc fixes, thanks, Brian!
* GUI: Use new mechanism for unique costume names on the paint editor, renamed costumes and costumes dragged and dropped onto sprite icons
* add “letter” option to the split block’s list of delimiters, Thanks, Michael!
* update German translation

### 2014-07-17
* new translation into Bangla (Bengali)!!! Yay, thanks, Mokter!!
* Lists: make internal list ops iterative (instead of recursive), thanks, Brian!
* Objects, Blocks: new feature (hidden in dev mode): Save screenshot, thanks, Viraj!
* GUI: Use new mechanism for unique costume names on imported costumes as well

### 2014-07-11
* Morphic: keyboard shortcut ctrl/cmd-shift-a for ‘@‘
* Morphic: allow directly editing properties in inspector widgets
* Blocks: change the color of the %pause symbol to be more yellowish
* Threads: fixed #506, thanks @haritop, for both the report and for providing the fix!!
* GUI: fixed #412 (incomplete sprite-removal)
* GUI: fixed #507 (limit persistent block zoom to 12x), thanks Michael!
* Morphic, GUI, Objects: fixed #508 (don’t popup empty menus), thanks Michael!

### 2014-07-08
* Threads: show error messages for custom blocks (propagating to the script’s top block)
* Threads: adjust to Doug Crockford’s latest infuriating nitpickings in JSLint
* GUI: show username in ‘logout’ entry of cloud menu
* GUI, Objects: fixed scrolling glitch in the palette, thanks, Kunal!
* GUI, Objects: add keyboard shortcut for “new project”: ctr-n
* revert changes made for JSLint’s sake after the issue was fixed in JSLint
* Blocks: change “delete” behavior in context menus to only delete this particular blocks (and reconnect the next block to the previous one)
* fixed #490

### 2014-07-06
* Blocks: add “ringify” to every context menu that already has “unringify”

### 2014-06-23
* Morphic: Inspector enhancements (dynamic property update, keyboard shortcuts)
* GUI: update visibility of share/unshare buttons, Thanks, Kunal!

### 2014-06-05
* Objects: gracefully hide & show the stage, fixed #281
* Objects: add hide and show blocks to the stage’s “looks” category
* Objects: added more relabelling options to SAY and THINK variants
* Blocks, objects: enable relabelling blocks with C-Slots
* Blocks: enable relabelling blocks across categories
* Objects: more relabelling options for SAY, THINK, ASK
* BYOB, Blocks: relabelling custom blocks (experimental)

### 2014-06-05
* Objects: stop replacing the empty string with the number zero in watchers
* Threads: initialize new variables with zero (instead of null)
* Objects: fixed #465
* Objects: fixed #457

### 2014-06-04
* Blocks: refactor “script pics” feature
* BYOB: new scriptsPicture() method for custom block definitions
* GUI: new (hidden) feature: “Export all scripts as pic” (including custom block refs)
* Graphic effects!!! Yay, thanks, Yuan!
* Bug fixes from Nathan, yay, thanks, Nathan!!
* German translation update
* Paint Editor transforms, yay, thanks, Kartik!!

### 2014-05-26
* Objects: Fixed #445 (minor search + zoom issues)
* Localization additions and Portuguese translation update, thanks, Manuel!
* GUI, cloud: Show last-changed-timestamp when opening cloud projects

### 2014-05-20
* Morphic: Prevent default action for ctrl-/cmd-key event
* Snap.html: Focus the world canvas on startup, so Snap reacts to keyboard events right away
* Threads: new Variable data structure, for refactoring upvar references, not yet used anywhere
* Objects, GUI: Search Blocks, feature. Thanks, Kyle, for architecting and designing this!!!
* Objects, GUI: Keyboard-shortcuts for opening (cmd-o), saving (cmd-s) projects and for finding blocks (cmd-f)

### 2014-05-02
* error message when trying to import a non-text file into a variable, thanks, Nate!
* fixed #407 (custom-block coloring w/ zebra off)

### 2014-04-30
* new Finnish translation, yay! Thanks, Jouni!
* new Brazilian Portuguese translation, yay! Thanks, Aldo!
* Russian translation update
* Portuguese translation update
* additional localisations, thanks, Manuel!
* text-encoding fix for exporting variable contents, thanks, Blob!
* set turbo mode block fix, thanks, Michael and Nathan!
* enable storage and retrieval of first-class costumes in both file formats

### 2014-03-31
* Objects: experimental “wardrobe” and “jukebox” reporters in dev mode
* Blocks, Objects: display costume thumbnails in speech/thought/value bubbles and watcher cells
* Objects: let “switch to costume” block accept actual costume objects (in addition to names and numbers)

### 2014-02-13
* GUI, Store: constrain minimum stage size to 480 x 180
* GUI: Fixed #322, #324
* Widgets: new “promptVector” dialog box feature
* GUI: Use new vector prompter for stage dimensions
* German translation update

### 2014-02-11
* GUI: Set stage dimensions arbitrarily (new entries in the settings menu when holding shift)
* Store: Saving & Loading for arbitrary stage dimensions in the project data
* new Date block, thanks, Michael!!!

### 2014-02-05
* Objects, Paint: One-stop-shopping for stage dimensions (changing the stage dimensions in line 3720 of objects.js takes care of everything)

### 2014-02-04
* GUI: Import costumes and backgrounds from the project menu, thanks, Brian, for the changeset!
* GUI: Import sounds from the project menu, thanks, Brian, for the changeset!
* Objects, Store, GUI: Flat line end option in the settings menu, saved with the project
* German translation update
* Objects: Enable playing sounds and notes on Firefox, thanks, Dean Brettle, for this fix!!
* Update Portuguese translation, thanks, Manuel!
* Update French translation, thanks, grego!

### 2014-02-03
* Threads: Fixed #313. “Block of sprite” now works for interpolated (“timed”) blocks and for reporters (i.e. SAY FOR, THINK FOR, GLIDE, ASK etc.)
* Morphic: replace deprecated DOM “body” references with “documentElement”

### 2014-01-10
* Threads: Revert pull request #295 (xhr-headers), breaks existing installations
* BYOB: Fixed #292 (pulldowns loose lines when exported as library)
* BYOB: Fixed #291 (readonly custom menus become non-readonly when block is edited)

### 2014-01-09
* Objects: Mechanism for migrating blocks in existing projects to newer versions
* Blocks, Objects, Threads: Collapse old STOP primitives into a single one with a dropdown of options
* German translation update for new (migrated) STOP block
* Morphic: Fixed updateReferences() (how could nobody notice so long?!)
* XML: resolved unexpected assignment expressions (conform to the latest JSLint quibbles)
* validated all source files against the latest JSLint version

### 2014-01-08
* Threads, Blocks, Objects: The FOR reporter’s first input now also accepts blocks and scripts („rings“), and reports a copy that is bound to the sprite indicated by the second input. This lets you „zombify“ (or remote-control) sprites (and create custom TELL and ASK blocks)
* Blocks: initial support for „sensing“ sprite-only custom block definitions, commented out for now
* Paint: Add mouseLeaveDragging() event behavior, thanks, Kartik, for this fix!
* Objects: Only shrink-wrap sprite costumes, thanks, Kartik, for this fix!
* Threads: Added xhr-headers to HTTP block, thanks, Tim!
* Threads, Blocks, Objects: Added StopOthers primitive, thanks, Kartik!
* Added „all but this option“ to StopOthers primitive, fixed the implementation
* Updated German translation with new strings

### 2013-12-19
* Objects: stage watchers for „mouse x“ and „mouse y“ sensing reporters. Thanks, Michael!
* Store: fixed saving/loading/localisation of new mouse coordinate stage watchers

### 2013-12-12
* Objects, Morphic: fixed #277, #279 (blitting null-canvasses fails)

### 2013-12-11
* Threads: accept lists as inputs to the green (text) LENGTH OF reporter

### 2013-12-05
* Threads: fixed literal-to-non-literal zero-value comparison bug
* Objects: fixed #264 (mapped `<ctrl-enter>` to green-flag instead of `<enter>`)

### 2013-12-04
* Threads: handle text comparisons case-insensitive (again)
* Lists: harmonize equality testing and List CONTAINS testing
* French translation update, thanks, Martin!
* Threads: fixed #261 (less tolerant null-value-to-number-coercion)

### 2013-11-26
* Cloud: fixed #125 (encode email address when signing up), thanks, Nathan!
* Threads: fixed #207 (stricter comparison of strings vs. numbers). Some edge cases remain, such as empty string equals zero and disregarding trailing / leading blanks. These are intentional. Please don’t nitpick and spare me the fundamentalism :-)
* Threads: fixed #245 (consistently auto-convert empty strings to zeroes)
* Localization and Portuguese translation updates, thanks, Manuel!
* Catalan translation update, thanks, Bernat!!
* Threads: Text comparisons are now case-sensitive („fixes“ #175)
* Threads: fixed #179 - don’t identify primitive (static) C-Slots as implicit formal parameters
* Threads: fixed #249 - preserve variable value types with edge cases (empty string, Boolean false)
* Threads: fixed #133 - preserve edge-cased argument types (empty string, Boolean false)
* Fixed issue #244 (relabelling now preserves empty input slots), thanks, Nathan!

### 2013-11-22
* Morphic: Don’t trigger events for eclipsed morphs (whose parent-chain contains a hidden morph)
* Blocks: Prevent „hide“ menu option for non-palette template blocks
* new Catalan translation! Yay, thanks, Bernat Romagosa Carrasquer!!

### 2013-11-15
* Blocks, BYOB, Store: „read-only“ option for editable custom block input slots
* BYOB, Blocks: custom block input slots reverting to default now show their default value
* Blocks: fixed read-only input slot coloring glitch, thanks Bernat, for reporting it!
* Objects: fixed #231 (watcher-display of Booleans)

### 2013-11-12
* Blocks, BYOB, Store: customizable drop-down menus for input slots
* Objects: fixed wrong NaN display for variable watchers
* Blocks: left-align multi-line text in value-bubbles
* Portuguese translation update, thanks, Manuel!

### 2013-11-07
* GUI, Cloud: transmission integrity check

### 2013-11-04
* GUI: filter quotation marks from project names (for backend index)
* BYOB: only show symbol menu for label fragments
* BYOB: customizable drop-down menus for input slots (experimental, commented out)

### 2013-10-25
* Blocks: enable Costumes as Symbols and Symbols as custom block label parts
* BYOB: Symbol selection menu for BlockLabelFragmentMorphs
* Portuguese translation update
* Widgets: enable Symbols in InputField drop down menus
* BYOB: enable Symbols in InputSlotDialog Morph’s drop down menu

### 2013-10-17
* Threads: fixed #213 - Empty else block breaks return to caller

### 2013-10-15
* Morphic: further condense damage list by merging nearby rectangles, thanks, Craxic!

### 2013-10-14
* Morphic: Condense damage list by merging overlapping dirty rectangles, thanks, Craxic!
* Objects: Increase maximum clone count from 128 to 300
* Portuguese translation update, thanks, Manuel!!

### 2013-10-10
* Cloud: added "sanity check" to cloud-saving mechanism that errors if the serialized project data is corrupt and cannot be parsed as XML, addresses #203, #200, #171

### 2013-10-09
* Theads: added a variant for linked lists to the experimental MAP primitive reporter

### 2013-10-08
* Lists: fixed type-issue for linked list indices (thanks, Nate, for reporting it!)
* Threads, Objects: experimental MAP primitive reporter in lists category, visible in dev mode
* Blocks: fixed #199 (can't delete reporter with attached comment via context menu)

### 2013-10-04
* Threads: Type-check the SPLIT block's input before eval'ing it
* Objects: Prevent watcher cells from growing wider as their contents becomes taller
* Objects: Keep watchers onstage when hiding/showing them, fixes #195
* BYOB, GUI, locale: New preference setting for plain block prototype labels

### 2013-10-01
* Objects: smooth numerical values displayed in watchers

### 2013-09-30
* Blocks: fixed #186 (can't duplicate blocks with anchored comments)

### 2013-09-20
* Morphic: fixed #172, Rectangle.amountToTranslateWithin() for IF ON EDGE, BOUNCE

### 2013-09-18
* Objects, GUI: prevent costumes with CORS-tainted canvases, expected to fix #155, #154, #151, #148, #147, #127 for future projects
* BYOB: Prevent local custom blocks in global custom block definitions, fixes #167 for future projects

### 2013-09-19
* Objects: fixed #169 (sprites are sometimes off-placed when the project is loaded)
* Objects, GUI: fixed #146 (filter out empty costumes)

### 2013-09-17
* Cloud: encodeDict() fix and new parseDict() method - used for accessing shared projects
* GUI: fixed #119, #149 (accessing a shared projects requires lowercasing the username)
* Portuguese translation update for SPLIT block, thanks, Manuel!
* Store, Objects: prevent costumes from being drawn while they are loading, fixes parts of #154

### 2013-09-16
* new Danish translation, yay!! thanks, Morten and Hanne!
* new Greek translation, yay!! thanks, Ino!
* Portuguese translation update, thanks, Manuel!
* French translation update,
* Norwegian translation update
* threads: minor custom block evaluation scope fix
* paint: flood fill freeze fix, thanks for the contribution, Kartik!
* objects: new SPLIT primitive reporter
* German translation update for new SPLIT primitive and delimiter options
* GUI: getPublicProject adjustments (lowercase username)
* GUI: prompt() - invocation fixes (null-choices)
* GUI: synchronous URL fetching simplifications for libraries and example projects
* GUI: fixed #115 - prevent loading several instances of the same block definition

### 2013-08-17
* Norwegian translation, yay!! thanks, Olav Marschall!
* "Dynamic" library list, thanks, Brian

### 2013-08-14
* Traditional Chinese translation, yay!! thanks, Chu-Ching-Huang!

### 2013-08-12
* Objects, Threads: Nestable Sprites Collision Detection & fixes
* Dutch translation update

### 2013-08-10
* Objects, GUI: Nestable Sprites fixes
* German translation update

### 2013-08-09
* GUI: Nested Sprite Rotation style buttons on corral icons
* Store, Objects: Nested Sprite saving / loading

### 2013-08-08
* Objects: Nested Sprite Scaling
* Objects: Nested Sprite Rotation
* Objects: Nested Sprite synchronous / independent rotation
* Dutch translation update, thanks, Sjoerd Dirk Meijer!

### 2013-08-07
* Objects, GUI: Sprite Nesting preliminaries
* Objects: Fixed stage costume scaling & misplacing bug. Thanks, Josh, for the report!
* Objects, GUI: Sprite Nesting GUI
* Objects: Nested Sprite Motion

### 2013-08-05
* Polish translation, yay!! Thanks, Witek Kranas!
* Morphic: mouseEnterDragging fix

### 2013-08-02
* Blocks: Undrop Reporters feature tweaks
* Blocks: Undrop Comments feature
* Blocks: Undrop Commands feature
* German translation update (for Undrop feature)

### 2013-08-01
* Blocks, Threads: "whitespace" & other options in SPLIT reporter's dropdown
* Blocks: Italicize editable input options (e.g. for the SPLT block)
* Blocks: Undrop Reporters feature (in script areas' context menus)

### 2013-07-31
* Blocks, Threads, Objects: experimental text SPLIT primitive in the operators category

### 2013-07-30
* Blocks: Made it harder to drop reporters on the variadic input per se (as opposed to into one of its slots) in (default) "prefer empty slot drops" setting
* Blocks, Threads, Objects: PAUSE primitive command block
* GUI: fixed #104 (storing a cloud project under another name causes media loss)

### 2013-07-24
* Dutch translation, yay!! Thanks, Frank Sierens

### 2013-07-15
* Objects: increased palette's vertical growth by scrollBarSize
* Objects, Blocks, Threads: experimental text-function primitive (hidden, shown only in dev mode)

### 2013-07-13
* Paint: fixed pipette tool for floodfill

### 2013-07-12
* Blocks: Pipette symbol
* Paint: Pipette tool

### 2013-07-11
* Blocks: fixed occasional flickering in scripting areas (caused by deleted feedback morphs, a bug that surfaced in Chrome 28 on OSX and may be due to a possible Chrome GC issue)
* Blocks: preserve nested blocks in the scripting area when replacing a variadic input list with another input ("kick out" the nested blocks instead of "swallowing" them)
* Blocks, Threads: new floor() function in monadic math reporter's drop-down

### 2013-07-10
* GUI: Reset hidden primitives and code mappings upon loading a new project

### 2013-07-09
* Objects, Blocks, Threads: Collapsed codification primitives (code, header) into a single block
* Blocks: Added isEmptySlot() to BooleanArgMorph (thanks, Brian, for the bug report!)

### 2013-07-08
* Store: fixed serialization placement-bug for sprites

### 2013-07-05
* Blocks: fixed CommentMorph hiding/showing bug when switching to / from presentation mode

### 2013-07-04
* Codification (text code mapping and block header support)

### 2013-07-02
* Objects: took out "security margin" in Costume's shrinkWrap() method b/c Chrome no longer needs it -> fixed empty costume bug when drawing over the paint editor's bounds
* GUI: Import libraries feature (in the project menu)

### 2013-06-28
* Morphic, GUI: improved importing costumes by dragging in pictures from other web pages

### 2013-06-27
* Objects: fixed speech bubble scaling when sprite is not onstage (reported in the forums)

### 2013-06-26
* GUI: fixed #100 saving costumes to the cloud

### 2013-06-25
* Widgets, Blocks: code mapping dialog input is now multi-line monospaced

### 2013-06-24
* Objects, Blocks: pretty printing for mapped code, now supporting Python mappings

### 2013-06-21
* Morphic, Blocks: "flat" design fix: Handle manually "unshadowed" StringMorphs
* Objects, Blocks: %code input slot - multi-line, monospaced, type-in slot for code mappings

### 2013-06-20
* GUI: add code mapping preference to persistent settings
* Blocks, BYOB, Lists, Objects: "flat" design enhancements for blocks and watchers
* Blocks: Multi-line input slots (TextSlotMorphs - %mlt)
* Objects: doMapCode() primitive now uses a multi-line input slot

### 2013-06-19
* Store: persisting code mappings in project and block library files

### 2013-06-18
* Code mapping (generating textual code from blocks), first iteration

### 2013-06-06
* BYOB: Newly created custom reporters now have an initial default REPORT block as definition body

* Morphic: focus World canvas on mouse down (otherwise prevent default)

### 2013-06-05
* Objects: fix for hiding 'getLastAnswer' and 'getTimer' primitives

### 2013-06-04
* Morphic: Prevent undesired native dragstart events (introduced in Chrome 27)

### 2013-05-17
* GUI: user preferences (settings) are now made persistent in localStorage

### 2013-05-16
* "flat" GUI design preference (in the settings menu)

### 2013-05-15
* Objects: Costume shrinkWrap adjustments
* Morphic: Flat design preference introduced (default is off)
* Widgets: preparing for "flat GUI skins"

### 2013-05-14
* paint.js: Paint editor, first version, contributed by Kartik Chandra, Yay!!
* Threads, Objects, Blocks: Broadcast & message enhancements: When I receive `<any msg>`, and getLastMessage reporter + watcher

### 2013-05-10
* Reset Password via e-mailed link (frontend only)

### 2013-05-06
* Reset Password feature (frontend only)

### 2013-04-30
* Objects: Costume shrink-wrapping
* Morphic: Allow triggers to be dragged if so specified (#83)
* GUI: select dragged costume
* Blocks: eraser symbol for paint editor
* Morphic: ScrollFrame scrollY() fix (fixes #24)

### 2013-04-29
* Blocks: symbols for solid rectangles and circles

### 2013-04-27
* Blocks: paint bucket symbol
* highlight adjustments when merging scripts (#70)

### 2013-04-26
* Morphic: ensure unique World stamps
* Blocks: symbols for paint editor

### 2013-04-25
* Objects, Blocks, GUI, Store: Hide primitives feature
* Morphic: Introducing World.stamp as reference in multi-World setups
* Widgets: restore multi-dialog restrictions for multi-world setups
* Translation update for "hide primitives" feature

### 2013-04-24
* Widgets, BYOB, GUI: prevent multiple block editors on the same block definition, allow multiple dialogs on different objects, handle dialog instances in DialogBoxMorph.prototype

### 2013-04-23
* Lists, Objects: Circularity no longer breaks watchers
* Widgets: Multiple Dialogs of the same kind are prevented except for a few (e.g. BlockEditor). Thanks for this fix, Nathan! (and for the many little UI things you've fixed as well)
* German translation update

### 2013-04-22
* GUI: Double clicking support for cloud side of project dialog

### 2013-04-21
* using the percent character in variable names is now safe (fixes Github issue #65)
* Morphic: added Doubleclick support, example: inspectors
* GUI: Double clicking a project in the project dialog performs the dialog's action on it (open / save)

### 2013-04-19
* German translation update for "scripts pic" feature

### 2013-04-18
* plenty of bug fixes from Nathan. Yay, you go!!

### 2013-04-17
* Blocks: "scripts pic" option in the ScriptsMorph's userMenu lets you export a picture of all scripts (including comments)

### 2013-04-16
* Cloud, GUI: additional dev settings

### 2013-04-15
* Blocks: place sticky comments on World layer on dragging their anchor block

### 2013-04-12
* Lists: fix for typecasting bug in CONTAINS
* BYOB: Tooltips for custom block templates (sitting in the palette): mousing over a custom block in the palette pops up its definition hat comment in a comment-colored speech bubble
* GUI: Sharing/Unsharing/Deleting now available in all version of the project dialog

### 2013-04-11
* Morphic: virtual keyboard enhancements (see Morphic.js)
* GUI: disabled localStorage (as in I9 running locally) no longer prevents Snap! from loading

### 2013-04-10
* Fixes for type casting and dragging dialogs by buttons, thanks, Nathan!
* Fix for loading shared projects in different formats (cloud data and plain project data)

### 2013-04-09
* various formatting and encoding normalizations
* Morphic: Formatting options for Triggers and MenuItems (and ListItems): bold, italic
* Morphic: ListMorph (items) manipulation capabilites
* GUI: display shared project names bold typed in the project dialog
* GUI: Feedback msg when sharing / unsharing projects
* GUI: Shield (hide) IDE while opening a shared project for presentation
* GUI: Support for debugging shared projects

### 2013-04-08
* Cloud, GUI: Sharing / Unsharing projects finalization
* Lists: Adjust initial list watcher size to blocks' zoom scale
* Portuguese and Italian translations update, thanks, Manuel and Stefano!
* GUI fix: switch to edit mode and tab to scripts when loading a project,
* Objects: new feature (hidden in shift-clicked stage context menu): turn pen trails into new costume

### 2013-04-05
* renaming variable blobs now features a drop-down with reachable variable names and a picture of the block to be renamed

### 2013-04-04
* loading shared projects in presentation mode, exporting URL for shared projects
* Selecting "Help" for a custom block now pops up the comment attached to its definition's prototype hat, if any
* BYOB fix for detaching comments from prototype hat blocks

### 2013-04-03
* YPR converter fix: No more text area in upper left corner of the Snap! IDE
* Blocks, BYOB, Store: PrototypeHatBlocks in the BlockEditor accept anchored comments

### 2013-04-02
* Japanese translations update, thanks, Kazuhiro Abe!
* Content-type support for Cloud backend
* sharing / unsharing projects support and GUI
* the Block Editor now allows anchored comments
* duplicating a block / script / sprite now also duplicates anchored comments
* deleting a block / script now also deletes anchored comments

### 2013-03-25
* Spanish translation! Yay, thanks, Victor Muratalla!!
* Objects: Boolean value block representations are now translated, thanks, Victor, for the report
* Simplified Chinese translation update, thanks 邓江华 !!

### 2013-03-22
* Widgets: optional sliders and "lively" graphics for numerical prompters
* Blocks, GUI: "Zoom blocks…" feature in the settings menu (no longer hidden)
* Objects: numeric prompters for watcher's sliderMin/Max
* translation updates
* Objects: 'pic…' screenshot feature for the stage
* GUI, Cloud: Fallback message support before showing an error

### 2013-03-21
* Cloud: allow every XMLHttpRequest to transport cookies (withCredentials = true)

### 2013-03-20
* GUI: deactivated motd and cloudmsg mechanism for now (has some issues)
* Updated Portuguese translation, thanks, Manuel!
* Updated all translations for %keyHat and %msgHat specs
* YPR: fixed turnLeft / turnRight swap bug

### 2013-03-19
* Blocks: SyntaxElementMorph fixLayout() optimization for active highlights
* Russian translation!! Yay, thanks, Svetlana Ptashnaya!!
* Store, GUI, Blocks: Scaling support for Comments and serialization/deserialization
* GUI: motd support: On startup Snap! looks for http://snap.berkeley.edu/motd.txt, if it exists it is shown in a dialog box
* GUI: fix for #run: URL switch
* GUI: cloudmsg support: cloud related notifications can be put into http://snap.berkeley.edu/cloudmsg.txt

### 2013-03-18
* GUI, Blocks, BYOB, Widgets: Scaling Blocks and Scripts (shift-click on settings menu)
* Widets: numerical prompts
* GUI: #signup URL switch
* Blocks: adjusting highlights when modifying active scripts

### 2013-03-14
* GUI: When logged into the Cloud, "cloud" becomes default in the project dialog
* Store: local custom blocks can now store their definition receiver directly as value (avoiding turning them into "Obsolete!" blocks when re-opening the project), this is important for reified blocks assigned to variables elsewhere, and such for the part of OOP we can already do now.

### 2013-03-13
* Store: context receiver persistence fix (for reified scripts)
* Threads: Execute reified blocks in the callee's context (not in the caller's)

### 2013-03-12
* Threads: OR, AND are now special form primitives ("lazy")
* Threads: fix for minor pen optimization glitch (catching the stage)
* Lists, Objects: Resizing list watchers no longer makes them "tremble"

### 2013-03-11
* Czech translation update, thanks, Michael!
* Morphic: "pic..." fix for scroll panes, thanks, Davide!
* Morphic fix: Clicking on editable text once again moves the caret to the mouse cursor

### 2013-02-28
* "Updating..." message while updating the cloud project list
* Morphic: Clipboard "paste" text support (works currently only in Chrome)

### 2013-02-27
* Morphic: onNextStep and nextSteps() mechanism
* GUI, Cloud: Ersatz-progress-bar-messages, using nextSteps()

### 2013-02-25
* Extended Signup dialog (COPPA-conforming, I hope)
* Morphic: mouse click event bubbling for input fields
* Widgets: Optional drop-downs for input fields

### 2013-02-22
* Objects: Fix for playNote distortion issue in Chrome

### 2013-02-21
* Cloud work: Connect / Reconnect mechanism and password hashing "salt"
* Exporting SVG_Costumes

### 2013-02-18
* SVG_Costumes (partial)
* Cloud work
* scaling during WARP glitch fix

### 2013-02-15
* Store: Sprites are now first class stored objects (can be "values"), needed for OF block
* Blocks, GUI, Threads: "Turtle" and "Empty" costume names, gosh, Brian!
* Threads: Error messages fix

### 2013-02-14
* clone drop-down menu fix (removed "close" entry)
* auto switching to small stage mode if the window gets narrow. Commented out b/c I don't like it
* changed costume name 'Turtle' to 'default'
* link to s.b.e/tos.html in signup dialog
* "Save project to disk" experimental feature (works currently only in Chrome)
* RUN variable OF sprite fix

### 2013-02-13
* GUI, Widgets: Cloud frontend complete
* OF reporter block in the sensor palette (Scratch functionality, not yet BYOB)
* CLONE block now takes sprite name or 'myself' as input, drop-down menu
* FAST TRACKING renamed to TURBO MODE
* unscheduled execution again made the default.
* "Prefer smooth animations" setting, runs strictly scheduled at around 30 fps max.
* scheduling mode saved in project data
* Settings menu clean-up
* Input slots in Hat blocks are now static (cannot receive reporters drops)

### 2013-02-11
* Fixed / Variable Frame Rate option in the settings menu (default is fixed, as in Scratch)

### 2013-02-05
* Cloning collision detection refinements, still *very* experimental

### 2013-02-05
* Cloning, basic Scratch style, still *very* experimental

### 2013-02-04
* fast tracking, a.k.a. "Turbo Mode"

### 2013-02-02
* Morphic, Objects, GUI, Store: "turtle costume pen" options (tip, middle)

### 2013-02-01
* Blocks: Context-menu-delete fix for CommandBlocks inside C-Slots: userDestroy()
* Morphic: Pen-redraw() optimization for warp() fix
* Cloud: Dual-component project optimization
* GUI: `<enter>` key now works with ProjectDialog

### 2013-01-29
* Cloud: persistent log-in and auto-log-in
* GUI, Widgets: Cloud work...
* Morphic: "pic..." generic exporting feature

### 2013-01-25
* Morphic: Better padding support for ScrollFrames
* Morphic: Better resizing & re-rendering support for Menus and ListMorphs
* Morphic: Inspection improvements for Menus and ListMorphs
* Morphic: Text scrolling improvements (scrollCursorIntoView())
* Widgets: Rendering improvements for InputFields
* BYOB: changed all 'Ok' occurrences to 'OK'
* Threads, Lists: JOIN zero / false bug fix
* GUI: new ProjectDialogMorph

### 2013-01-23
* Import / Export text files from variable watchers (context menu)
* Max. size of displayed text in CellMorphs and value bubbles set to 500 characters

### 2013-01-22
* Symbols for local storage and for examples
* Cannot evaluate to null or undefined within an argument -> use empty string instead

### 2013-01-21
* Threads: No more type coercion when setting a variable's value, instead only when incrementing it

### 2013-01-18
* new YPR version. Thanks, Nathan!
* Blocks: fixed "sometimes list watchers can be dragged out of value feedback bubbles"
* BYOB/Blocks: fixed restoring existing inputs and upvar names when editing custom blocks

### 2013-01-17
* "Reference Manual" entry in the Snap! Menu
* BYOB: Editing custom-block-prototypes only changes the prototype in the block editor (no longer every instance of the block), pressing OK or APPLY propagates changes to all block instances, pressing CANCEL does nothing (no longer reverts previously edited slots in instances back to their default state)

### 2013-01-16
* Store, GUI: Cloud Data Format support
* Lists: CONS fix for zero CAR value

### 2013-01-15
* Threads, Blocks: Continuations tweaks (enabling reporter - CATCH / THROW)

### 2013-01-11
* Morphic: StringMorph leftClick event error catch

### 2013-01-10
* "input list:" (with colon)
* Blocks: Drawn symbols for TURN RIGHT / LEFT
* continuations tweaks
* revert of "returning 'undefined' to parent frame fix" (121204), breaks call/cc
* ScriptPane cleanUp tweak for attached comments

### 2013-01-08
* Blocks: ArgLabelMorph. Dynamic labels for "kicked out" variadic inputs ("input list")
* Dynamic input label support in BLOCKS, STORE, THREADS, BYOB, GUI and LOCALE
* Blocks, BYOB: Zebra coloring fix for rings in grey blocks

### 2013-01-07
* Slovenian translation!! Yay, thanks, Sasa!!! (Snap now supports a dozen languages!)
* list-colored drop "halo" for variadic inputs
* most modules: space / tab white space reformatting
* help screens!! Thanks, Brian!!!
* help screen API for custom blocks (currently only for the tools library)
* importing libraries is now "silent", i.e. it doesn't show a dialog letting you select which blocks to import anymore.

### 2012-12-19
* Threads, Cloud: switched most XMLHttpRequests to asynchronous (except URL switches)
* Morphic: Allow StringMorphs to hide their characters for password input
* Widgets: Login-Prompter
* cloud api work

### 2012-12-17
* cloud api work
* Morphic: auto-text selection fix
* all modules: replaced tabs for spaces
* "Clean up" now arranges sticky comments correctly

### 2012-12-13
* "elastic" anchor lines for sticky comments
* cloud api work

### 2012-12-11
* better alignment for sticky comments
* cloud api work

### 2012-12-10
* Sticky comments (attachable to blocks in main scripting area)

### 2012-12-08
* Objects: SAY nothing bug fix. Thanks, Brian!

### 2012-12-07
* Blocks: Drop target feedback for comments (in preparation for sticky ones)
* Objects: redraw turtle on pen color change, disable clicking on watchers

### 2012-12-05
* Morphic: trigger "reactToEdit()" when tabbing among text fields
* GUI: display tool's name when importing the module

### 2012-12-04
* Morphic: text element mouse event propagation fix (list boxes)
* Lists: Empty list element follow-up fix
* Threads: Returning "undefined" to parent frame fix (caused type errors)

### 2012-12-03
* GUI, BYOB: tools module can be imported from the project menu
* Morphic: enhancement for editing non-left-aligned texts
* Morphic: minor text element fix for initial mouse down behavior
* Lists, Objects: text elements in list watcher cells are now editable
* Lists fix: comparing something with a non-existent list element no longer produces an infinite loop, thanks, Aleks, for reporting this!
* dynamically load ypr.js when first needed
* minor translation strings updates

### 2012-11-29
* Store: Cloud Data Format now references media by its name, obliterating the need to re-save media when reordering wardrobes or jukeboxes, but relying on unique names (within each sprite or the stage)
* Store: serializing / de-serializing of media in different receptacles
* Morphic: CTR-Z / CMD-Z for undo in text input fields
* Morphic: SHIFT-arrows selects text in input fields
* Morphic: new global method sizeOf(object) returns number of keys
* Morphic: redundant (quasi-inherited) code taken out of TextMorph
* GUI: "hasChangedMedia" property for IDE_Morph (Cloud Data Format support)
* GUI: When a sprite's current costume is deleted, it switches to the default one

### 2012-11-28
* Morphic: Interactive Tooltips ("isClickable" and resizing support for SpeechBubbleMorphs)
* Blocks: list watchers inside evaluation bubbles are now interactive
* Store: The user-edited name for the stage is now persistent
* Store: Cloud Data Format fix - mediaIDs are now independent of sprite sorting and layer
* French translation update

### 2012-11-27
* Morphic: SpeechBubbleMorph shadow artefact fix
* Morphic: Backtab support & entry field tabbing ("wrapping") fix
* Objects: List watchers inside speech bubbles are resizable again
* Store, GUI: Cloud data formats (separating media from program data)
* Store: Fix for saved "obsolete" blocks (projects can be re-loaded)
* new Operators primitive: IS IDENTICAL TO?
* new translation string for new primitive
* Simplified Chinese translation update
* BYOB, Objects: global custom block refresh fix

### 2012-11-23
* Blocks: C-Slot rendering fix (eliminate occasional transparent line)
* Store, GUI: Beginnings of the Cloud data format (in progress...)

### 2012-11-22
* Blocks: right click delete reporter fix (restores slot), thanks, Ryan!
* Blocks: restore zero-value default fix
* Objects Fix: Variable blobs become undraggable on save / load. Thanks, Ryan!
* Morphic: enable all keys for text input (take out legacy browser support)
* new "Animations" option in the settings menu
* zooming the stage in & out now animates depending on the user's preference

### 2012-11-21
* Morphic: fixed reactToEdit() event trigger -> fixes scrambled sprite names
* Threads: hide / show variable watcher fix for watchers on globals
* Threads: Process reentrancy fix for played notes in non-thread-safe mode
* Store: global watcher load fix
* Store: Sprite ordering fix for Safari
* Objects / GUI / Blocks: fix for "relabel"

### 2012-11-20
* major refactoring of blocks dict and blocks generation code
* new "show all entry in the stage's context menu

### 2012-11-19
* blocks context menu: duplicate "this block only" feature
* blocks context menu: relabel feature
* blocks context menu: ringify / unringify misplacement fix
* Morphic: MenuItem icon shadow dimension adjustments
* store: fixes STOP ALL block spec
* added some more translation strings
* updated Korean translation

### 2012-11-16
* Esperanto translation! Woohoooo, thanks Sebastian Cyprych!
* a few additional localizable strings
* store.js: "Obsolete!" Reporter fix, thanks, Nathan!
* Morphic.js: support for dropped binary files
* .ypr project loading, Whoa! Awesome, Nathan!!
* French translation stub! Thanks, Jean-Jacques Valliet!

### 2012-11-15
* WARP block moved up in Control palette (for better discoverability)

### 2012-11-14
* first experimental Web Audio API version, sine-wave only. Thanks, Achal!
* new blocks: TEMPO, REST FOR n BEATS, PLAY NOTE, CHANGE TEMPO, SET TEMPO
* currently only fully supported by Safari

### 2012-11-12
* Simplified Chinese translation! Wohoo, thanks, 邓江华 !

### 2012-11-09
* Widgets: fixed minor rendering bugs for dialog boxes
* GUI, Blocks: changed control bar layout, added cloud button (under construction...)
* new module stub: cloud.js (likewise under construction)

### 2012-11-07
* Morphic: new slider edit event, updated documentation (text editing)
* blocks, GUI: New "Execute on slider change" option for "live coding"

### 2012-11-06
* Morphic: Menu re-vamp, now supporting multi-line items, icons, and icon-text pairs

### 2012-11-05
* GUI, Objects: Pressing `<enter>` triggers the green flag, <esc> the red stop sign

### 2012-10-30
* Morphic: allow edited text scrolling to be disabled

### 2012-10-29
* Czech translation! Woohooo, thanks, Michael Moc!
* translations now dynamically load and unload. Thanks, Nathan, for the hint!
* Morphic now supports `<cmd>` + a on Macs, thanks, Davide!

### 2012-10-26
* fix: Process inputOption() backward compatibility for localizable drop-down options

### 2012-10-25
* Korean translation! Woohooo, thanks, Yunjae Jang!
* Portuguese translation! Wohoo, thanks, Manuel Menezes de Sequeira!
* Morphic optimizations in FrameMorph and InspectorMorph, thanks, Davide!
* removed defunct "Open Projekt" entry in lang-de.js, thanks, Manuel!

### 2012-10-24
* sprite sequence in corral can be ordered via drag & drop (& persists)

### 2012-10-23
* added "Edit label fragment" to translator dictionary
* minor fix in language changing mechanism
* minor fix re. block rendering (hole erasing) b/c of new ascenders
* minor fix re. dialog box rendering b/c of new ascenders
* minor fix re. dialog box shadow rendering. Thanks, Brian, for spotting this!

### 2012-10-22
* Japanese(Kanji and Hiragana) translations! Woohooo, thanks, Kazuhiro Abe!
* IF ON EDGE BOUNCE fix. Thanks, Stefano!
* additional localization strings and snap.html fix, thanks, Kazuhiro Abe!
* global / local watcher label fix. Thanks, Nathan!
* Morphic: Text scrolling when editing. Thanks, Nathan and Stefano!
* Morphic: Took out WorldMorph.trailsCanvas handling, thanks, Davide!
* Morphic text rendering ascender space fix (+ adjustments mostly everywhere)

### 2012-10-19
* the costumes tab now also displays the default "Turtle" icon symbols
* fixed a small scoping bug in Morphic's touched event (thanks, Davide!)
* new version of lang-it.js (thanks, Stefano!)

### 2012-10-18
* minimal translation dict updates ('rename costume' and 'rename sound')

### 2012-10-17
* Italian translation! Woohooo, thanks, Stefano!
* added "unringify" to translator dictionary, thanks, Stefano!
* fixed a require() bug in XML, thanks, Nathan!
* fixed #run: URL switch. #run: is now officially supported!

### 2012-10-16
* fixed clicking sound entry in the settings menu
* input slots are now deselected on losing focus
* fix: Cannot delete the only label part in a custom block prototype anymore
* button acknowledgement label now spells 'OK' instead of 'Ok'
* fix: Cannot create unnamed ('') variables anymore
* fix: ScriptVariables' names' spaces are now normalized & can't be set to empty ('')
* changed wording of "Import" tooltip
* Thanks, Nathan, for spotting and reporting these bugs!
* added localization for block definition deletion and about dialogs
* edits in the sprite name field no longer need to be acknowledged by pressing `<enter>`
* new file: Translation Guide (translating Snap.txt)

### 2012-10-15
* Morphic: New "reactToKeystroke()" events are escalated when editing strings/texts
* Blocks, Threads, Objects, Store: InputSlots now have localizable menu options
* GUI, Locale, lang-de: localization re-organized (now considered complete for LTR)

### 2012-10-10
* generalized localization hooks merged into Morphic.js and Widgets.js
* Morphic: TextMorphs (multi-line strings) now support text shadows (used in widgets)

### 2012-10-04
* Morphic: triggering "reactToEdit" when text editing is terminated

### 2012-10-02
* basic localization mechanism, use settings menu to switch languages
* German translation (for testing), #lang:de launches Snap! localized

### 2012-09-25
* xml.js: escape tilde character to avoid file corruption thru serializer.store()

### 2012-09-24
* threads.js fix for REPORT inside C-Slots (pop another frame under certain conditions)

### 2012-09-20
* js: blocks, byob, morphic, objects, threads, widgets edited for latest JSLint

### 2012-09-19
* store.js: minor fixes
* gui.js: URL #open: feature now works with all importable resources (e.g. blocks)

### 2012-09-18
* comments (non-sticky)
* ScriptsMorph duplicating fix
* block editor cleanUp fix (prototype hat always stays on top)
* block editor persistence of free-floating objects (scripts, comments)

### 2012-09-14
* store.js: fix for loading variables containing reporters and unevaluated inputs

### 2012-09-13
* morphic.js: Refactoring to conform with JSHint's line breaking checks
* new morphic.txt documentation version
* new version of "Contributing to BYOB4" guideline with section on coding style
* exporting & importing sprites

### 2012-09-12
* serialization adjustments (app attribute in top-level XML node)
* same-named custom block conflict detection and resolution
* overloading of custom blocks with samed-named imported ones
* cascaded block library support (block sets depending on each other)

### 2012-09-11
* exorting & importing global custom blocks

### 2012-09-10
* exporting global custom blocks (beginning)
* byob.js: BlockExportDialogMorph (beginning)

### 2012-08-30
* custom block definition export (disabled for now)
* zebra-coloring fix (for Hummingbird-video bug)
* any number of script vars possible

### 2012-08-16
* SNAP! Connection Strategy
* OS-native File Dialog for importing projects, pictures, sounds (also for Safari 6)

### 2012-08-15
* octagonal stop sign symbol
* cache manifest
* SWITCH TO COSTUME (-1) goes back one costume in the list & wraps around
* Variable blobs can be renamed

### 2012-08-14
* fix: disappearing and undraggable sprite bug (thanks, Kirk!)
* widgets: ToggleMophs can now have two different labels/symbols to reflect their state
* gui/blocks: switching symbols for all toggles, re-introducing the green flag symbol

### 2012-08-13
* dev-mode reporter for FRAMES for thread performance monitoring
* minor refactoring of store.js to conform with the latest JSLint

### 2012-08-10
* blocks: bug fix for input accessing in variable drop-downs
* dev-mode reporter for STACK SIZE for tail-call-elimination monitoring

### 2012-08-09
* Pause button: Pauses/resumes all currently active stage processes (scripts)
* blocks: minor performance tweaks

### 2012-08-08
* Morphic, GUI, blocks, BYOB: More "gentle" font control (can be overridden by browser)
* BYOB: new "Apply" button in the block editor (updates definition keeping editor open)
* BYOB: editing custom block prototpyes preserves existing inputs in custom block instances

### 2012-08-07
* SymbolMorphs for object type slot and identifier, and for "new sprite" button
* Verdana font preference for block labels (wider)
* store fix: Watcher label for "answer" now survives save/load (Thanks, Tom!)

### 2012-08-06
* blocks: SymbolMorph replaces Unicode characters for "green flag" and "stop" signs
* widgets: allow SymbolMorphs as button labels, new layout rule: minLabelExtent for buttons
* gui: button layouts moved to minLabelExtent rule
* fix: prevent drops on multi-arg arrows
* SymbolMorphs for all items in the GUI's tool bar

### 2012-08-03
* blocks fix: enable reporter drops on empty rings in "prefer empty slot drops" mode

### 2012-08-02
* threads: Invoking a lambda with empty input slots without arguments binds them to ''
* blocks/gui/byob: MultiArg layout fix
* "Clicking sound" option in the settings menu

### 2012-08-01
* JOIN can now have any number of input slots, and be CALLed with an input list

### 2012-07-31
* lists fix: preserve zero/false values when assigned in list blocks
* threads refactored (eliminated now redundant context.isInsideCustomBlock attribute)
* blocks/byob: mutable formal parameters for custom block definitions and rings
* threads: CHANGE VAR typecasting bug fixed

### 2012-07-30
* adjust REPORT / STOP BLOCK semantics (special case implicit C-shaped slot lambdas)

### 2012-07-28
* speech bubble scaling
* Boolean value representations in operator color (green)
* eliminated "ring" type

### 2012-07-26
* REPORT primitive moved to STOP blocks in palette
* graphical representation of Boolean values in watchers and bubbles
* fix: empty numerical input slots evaluate to zero (thanks, Stephen!)

### 2012-07-25
* fix: SET PEN COLOR no longer offsets the sprite
* settings menu: optional input sliders (for Android)

### 2012-07-24
* Color collision detection & thumbnail adjustments and fixes, incl. helpscreens

### 2012-07-23
* Color collision detection (first rough pass)

### 2012-07-20
* fix: textify zero and false values in JOIN primitive (don't skip)

### 2012-07-19
* graphic effects (currently only "ghost") for the stage
* new feature: Pen trails collision detection
* fix: Keystroke detection

### 2012-07-18
* fix: catch nil inputs in motion and looks primitives
* fix: answer variable value Boolean false not as zero
* GUI: window-reflow adjustments
* store fix: Booleans retain their type thru save/load (not converted to Strings)
* threads fix: using REPORT/STOP BLOCK inside a WARP block now stops warping

### 2012-07-17
* costumes/sounds: omit filename suffixes when importing
* costumes/sounds: rename via context menu
* costumes: export via context menu
* thumbnails: are now centered within their widgets

### 2012-07-16
* Morphic scroll frames: customizable "growth" property, used in scripting panes
* store: Sprites' visibility state gets persisted thru save/load
* store: Watchers' visibility attribute format now same as sprites' (hidden="true")
* BYOB fix: Custom block prototype rendering fix when opening a Block Editor instance
* blocks fix: Predicate slots no longer turn into reporter slots upon save/load
* blocks fix: made dropping reporters into empty slots easier when preferring empty slots

### 2012-07-13
* objects fix: zero values now show up in watchers (are no longer blank)
* objects fix: dragged sprites now keep their correct relative stage coordinates
* threads fix: dragged sprites are identifiable by running scripts

### 2012-07-12
* small stage mode (for bigger scripting area, e.g. in lectures or on mobiles)

### 2012-07-11
* app mode: arbitrary stage scaling (auto-resizes to fill the browser's client area)

### 2012-07-10
* app mode related adjustments to blocks.js, gui.js and threads.js
* fix: line breaks in project notes are now preserved thru export/import (xml)

### 2012-07-09
* xml decoding fix
* app mode, first rough pass (no stage scaling yet)

### 2012-07-05
* store: stage watchers monitoring lists remember their dimensions

### 2012-07-04
* major refactoring of serialization (new xml.js, store.js)

### 2012-07-03
* GUI: open a project from URL via #open:URL
* GUI: run a project from data via #run:XML or from URL via #run:URL

### 2012-07-02
* store fix: Newly loaded projects did not get keyboard events (now they do)
* threads fix: Evaluating STOP ALL did not stop sounds (now it does)

### 2012-06-29
* Morphic: StringMorphs now have the option to visualize blanks (as colored dots)
* Blocks: all input slots (in blocks) are now visualizing blanks
* GUI: re-ordering sounds via drag & drop
* GUI copying sounds among sprites via drag & drops on corral icons

### 2012-06-28
* GUI: re-ordering costumes via drag & drop
* GUI: copying costumes among sprites via drag & drop on corral icons

### 2012-06-27
* blocks/store/objects/threads fix: STOP BLOCK gets converted to REPORT on save/reload
* byob/GUI: new entry in the settings menu to always show input dialog in long form
* blocks/GUI: new entry in the settings menu to prefer empty slots for reporter drops
* blocks: in scripting areas rings and variable reporters can be nested inside each other
* in general rings will not vanish on ring/var drop if already inside other rings
* context menu help feature for blocks

### 2012-06-26
* blocks/threads fix: "any unevaluated" slots now reify their typed-in input values
* byob/threads fix: custom block definition reification now ignores empty-slot bindings
* GUI: copying scripts among sprites via drag & drop on corral icons (first rough version)

### 2012-06-25
* objects fix: changing pen properties sometimes offsets the sprite
* blocks: variable slots no longer accept reporter drops (Jens regrets but doesn't agree to auto-ringify dropped variable blobs at this stage of development)
* blocks: better (yet) control over where reporters can be dropped
* blocks fix: sometimes reporters cannot be dropped into slots in the block editor
* threads: comparing strings (the = block) is now case-insensitive
* threads/blocks: multi-args can now be eval'ed with variadic inputs
* lists: equality testing fix for mixed linked/arrayed lists (thanks, Brian!)
* LIST primitive with new, static input spec
* store: stage watcher styles (small, large, slider) are now persistent thru save/re-load
* objects: stage watcher slider min/max is now settable thru context menu
* store: stage watcher slider min/max are now persistent through save/re-load

### 2012-06-22
* changed license to AGPL (all modules and documentation)

### 2012-06-21
* POINT TOWARDS and GO TO primitive command blocks in the motion category

### 2012-06-20
* Morphic/Blocks: More precise control over where reporters are dropped and snap
* Morphic documentation update

### 2012-06-19
* store.js fixes for empty, non-editable input slots (e.g. list and boolean slots)
* objects.js/byob.js fixes for editing recursive custom blocks

### 2012-06-18
* GUI: Screenshot feature
* GUI, store.js: Error catching turned off in dev mode (for debugging store.js)
* store.js: saving / loading of sprites' scale, draggability and rotation style
* Morphic/GUI: Virtual keyboard support can be toggled (to hide caret in Opera etc.)
* GUI, store.js: Saving / loading of "thread safety" setting
* blocks caching limited to primitives
* introducing palette caching

### 2012-06-15
* store.js: Stage vars (watchers) fix
* store.js: Empty (bodiless) custom blocks fix
* store.js: Global custom blocks support

### 2012-06-14
* store.js: Global vars fix (xml.js deprecated)

### 2012-06-13
* new module: xml.js, a simple XML DOM/encoder/parser for Morphic.js

### 2012-06-12
* global custom blocks (first pass, no serialization yet)

### 2012-06-11
* Morphic: auto-detect Chrome issue 90001 and set "useBlurredShadows" appropriately
* Blocks: solid block highlighting (as in Scratch 1.4) when "useBlurredShadows == false"
* GUI: Settings menu entry for blurred / solid shadows and highlights
* Threads: Type checking, <IS [] A [] ?> primitive in the operators category

### 2012-05-25
* late-binding custom blocks, changes in threads.js, byob.js and store.js (et al.)

### 2012-05-23
* Morphic: single-touch-and-hold pops up the context menu
* Morphic: pinch-zoom and virtual keyboard improvements

### 2012-05-22
* Morphic/Blocks: SlideBackToFormerSituation

### 2012-05-21
* Pinch-Zoom for touchscreen devices
* Virtual keyboard for touchscreen devices

### 2012-05-18
* Morphic: better keystroke detection
* new interpolating HTTP reporter in the sensor palette

### 2012-05-16
* monadic OF primitive block in the operators category

### 2012-05-15
* GUI: disabled file dialog for now due to some issues
* Blocks/BYOB: Prototype block zebra coloring adjustment
* Store: minor fixes in the blocks dictionary

### 2012-05-14
* Morphic: droppedText() event
* GUI: opening project files via drag & drop
* GUI: invoking the file dialog to open projects, import costumes and sounds
* Threads: nested upvar fix
* Threads: hybrid variable scope taken out (it's all lexical again for now)
* Blocks/BYOB: zebra-coloring related fixes

### 2012-05-09
* exporting projects (holding the shift key URI-encodes the XML)

### 2012-05-07
* reification: omit empty slots inside nested lambdas for implicit parameters
* display fixes for rings inside rings
* DISTANCE TO reporter block primitive in the sprite's sensing category

### 2012-05-04
* rotation style support for sprite "turtle" costume
* rotation style buttons hidden for stage
* export background-less pictures of scripts
* sprite draggability control checkbox (in the IDE's sprite bar)

### 2012-05-03
* text- and object- type slots (and hints)
* zebra coloring fixes for input slots with pull-down menus
* costume flipping
* rotation styles

### 2012-05-02
* settings menu item for toggling zebra coloring
* new thumbnail() for StageMorph
* store.js: Fixes for local storage in local instance ("airplane saving")

### 2012-04-25
* unringify menu item for Blocks
* evaluator: variable setters can refer to variables by their reified getters

### 2012-04-30
* zebra coloring (first pass)

### 2012-04-24
* Rings (first pass completed)

### 2012-04-20
* Rings (basics)

### 2012-04-17
* Snap! Build Your Own Blocks. Alpha

### 2012-04-16
* custom block prototype slot type and default value indicators
* Sounds, first pass (thanks, Ian!)

### 2012-04-03
* ASK/ANSWER for the stage

### 2012-04-06
* ASK/ANSWER for sprites

### 2012-04-03
* minWidth property for SyntaxElements

### 2012-04-02
* pressing the stop sign makes all speech bubbles disappear
* null continuations now behave the same as STOP SCRIPT blocks

### 2012-04-01
* settings menu: touchscreen settings
* thread safety option
* store.js: Costumes & pen trails support. Thanks, Nathan!
* context menus for watchers (thx, Nathan!)

### 2012-03-31
* Stage: extra pen trail layer
* Morphic: texture handling (eliminating canvas patterns b/c of Chrome problems)
* Objects: motion precision fixes

### 2012-03-29
* Sprites: the rotation center now is the pen tip

### 2012-03-28
* Costumes: rotation center functionality

### 2012-03-27
* Costumes, first iteration

### 2012-03-23
* Morphic: handle multiple image file drops

### 2012-03-22
* GUI: WardrobeMorph
* Slider and ScrollFrame colors

### 2012-03-21
* Costume, CostumeEditorMorph, CostumeIconMorph

### 2012-03-20
* Morphic: droppedImage() event

### 2012-03-19
* THREADS: unevaluated inputs
* Morphic: detect and respect minimum font size renderable
* Morphic: text selection display fix for FF

### 2012-03-16
* long form input dialog speedup (pictograms are now plain pictures instead of Toggles)
* Morphic: Morphs behind another one no longer receive mouseEnter/mouseLeave events
* Blocks: ScriptPanes behind other Morphs no longer show drop target feedbacks

### 2012-03-15
* Morphic: colored shadows
* Widgets: ToggleMorph with embedded toggle elements
* pictographic slot type buttons in the long form input dialog
* palette speedup
* Error message when RUN/CALL/LAUNCHing a block w/o passing the expected no. of inputs
* Illegal drops prevented in user mode (enabled in dev mode)

### 2012-03-14
* JOIN becomes variadic (Jens isn't enthusiastic about it)
* About text changed according to Mitch's suggestion
* BYOB: JaggedBlockMorph
* pictographic type buttons in the short form input dialog

### 2012-03-13
* Widgets: ToggleElementMorph, TabMorph
* BlockEditor: Pictographic type buttons
* IDE: Tabs for scripts/costumes/sounds

### 2012-03-09
* SAY _ FOR _ SECS primitive command block for Sprites
* Morphic: thought bubble display variant of SpeechBubbleMorph
* THINK and THINK FOR SECS primitive command blocks for Sprites
* STAMP primitive command block for Sprites
* ROUND, JOIN, LETTER OF, LENGTH OF, UNICODE OF and UNICODE AS LETTER primitive reporters

### 2012-03-08
* Morphic: SpeechBubbleMorph orientation left/right
* Threads: empty block definitions no longer raise an exception
* SAY primitive command block for Sprites

### 2012-03-07
* object collision detection (TOUCHING? predicate block for Sprites)
* poly-key state detection

### 2012-03-06
* Morphic: prevent text edits from reversing
* added "WITH INPUT LIST" variants for RUN/LAUNCH/CALL primitives - commented out
* changed '%inputs' slot type to non-static (makes "w/input list" redundant)
* Threads: fixed tail-call optimization induced bug in pushContext()
* WHEN I AM CLICKED hat block (control)
* WHEN KEY PRESSED hat block (control)
* MOUSE DOWN? predicate (sensing)
* KEY PRESSED? predicate (sensing)

### 2012-03-05
* upvars
* globals vars serialization fix
* MultiArgs: shift-clicking on an arrow repeats action 3 times

### 2012-03-01
* store.js: color slot and global vars patch (thanks, Nathan!)
* blocks.js: bug fix for drop-down menus (wouldn't allow selecting empty)

### 2012-02-29
* global variables
* hybrid lists CDR fix (thanks, Brian!)
* debugging primitives (alert, console.log) in development mode
* all libraries edited to conform to JsLint's latest petty rules ('else' after 'return')

### 2012-02-26
* primitive control structures adjusted to new REPORT rule

### 2012-02-24
* STOP BLOCK primitive
* error catching turns off in development mode (on in user mode)

### 2012-02-22
* Morphic: Tabbing among input fields fix
* Threads: REPORT primitive fix

### 2012-02-21
* user and development modes (shift-click on Snap! logo)
* Open Project dialog (thanks, Nathan)
* blocks caching for primitives and custom blocks
* custom block prototype edits visible in the palette while editing
* sprite duplication
* custom block definition duplication and re-binding
* the only sprite in the IDE is now deletable
* primitive blocks for GHOST effect

### 2012-02-17
* Morphic: introducing combined mouse-keyboard events
* GUI: Project label

### 2012-02-16
* saving & loading, xml serialization, thanks, Nathan!

### 2012-02-15
* scriptable and programmable stage, selectable in the corral
* stage watchers with "active", auto-updating object name labels
* IF ON EDGE BOUNCE primitive, still buggy
* GUI fixes, all frame morphs in the corral now reject object drops

### 2012-02-14
* multiple sprites & lots of new stuff in all modules
* Morphic: dragging optimization
* Nathan's fixes to Morphic (shadow fix, mouse wheel fix)

### 2012-02-09
* Morphic: formatting capabilities for Menus and ListMorphs
* Morphic: optional 'own properties' highlighting in the Inspector's "show" menu

### 2012-02-08
* categories and block type editing for existing custom blocks

### 2012-02-07
* BYOB: categories (colors) for new custom blocks

### 2012-02-06
* Morphic: color specifiable in String() constructor
* Widgets: ToggleButtonMorphs
* Objects: block categories
* GUI: tabbed palette mock-up (not yet within a real GUI)

### 2012-02-03
* Morphic: horizontal mouse wheel scrolling (thanks for this fix, Nathan!)
* more primitives in the Pen category

### 2012-02-02
* more primitives in Motion, Looks and Pen categories

### 2012-02-01
* upvars in %var slot drop-down menu

### 2012-01-31
* upvar GUI in input slot long form dialog (w/o upvar functionality)

### 2012-01-30
* input slot long form dialog - multiple inputs
* input slot long form dialog - default input values

### 2012-01-27
* input slot long form dialog - basic (single) input types

### 2012-01-25
* STORE: serializing, saving and loading projects, first pass, all by Nathan
* HatBlock bezier curve fixed width
* settings for AlignmentMorph regarding handling of hidden Morphs
* GUI enhancements
* input slot long form dialog variant outline
* pointless filters in most FORINS in response to Nathan's derogatory comments :-)

### 2012-01-23
* Threads: tail call elimination

### 2012-01-20
* Morphic: question mark input for WebKIT 2 compatibility (does it break on Windows?)
* Morphic: turtle tracks round endings for WebKIT 2 compatibility (cannot use closePath())

### 2012-01-19
* MOD, TRUE and FALSE reporter blocks
* AND, OR, NOT reporter blocks
* BROADCAST AND WAIT command block

### 2012-01-15
* BlockLabelPlaceHolderMorphs
* BlockInputDialogMorph (short form)

### 2012-01-09
* Morphic: single quote input for WebKIT 2 compatibility
* BYOB: BlockInputFragmentMorphs

### 2012-01-06
* InputSlotEditor basics
* bigger tick for radio buttons
* PushButtons redone for WebKIT 2 compatibility

### 2011-12-14
* feature: deleting block instances and custom block definitions

### 2011-12-13
* call/cc for lambdas and custom blocks

### 2011-12-12
* BlockDialogMorph (basics)
* CustomReporterBlockMorph

### 2011-12-09
* BlockEditor basics for CustomCommandBlocks

### 2011-12-07
* byob.js (CustomBlockDefinition, CustomCommandBlockMorph)

### 2011-12-05
* new primitives: MOUSE X, MOUSE Y, TIMER, RESET TIMER

### 2011-12-02
* Widgets: InputFieldMorphs
* Prompters based on DialogBoxes
* Renaming of input templates
* Morphic keyboard enhancements

### 2011-11-30
* Widgets: AlignmentMorphs
* keyboard events for DialogBoxMorphs

### 2011-11-29
* Widgets: DialogBoxMorph basics

### 2011-11-28
* layout optimization merged into Morphic.js -> trackChanges

### 2011-11-24
* layout optimization for dropped and snapping blocks (thanks, John!)
* Equality testing for lists (thanks, Brian!)

### 2011-11-23
* hybrid lists (arrayed and linked)
* CONS and CDR

### 2011-11-21
* Atomicity (WARP)
* REPEAT UNTIL
* WAIT UNTIL

### 2011-11-18
* Lists: watcher shows list range (speed-up, stability)

### 2011-11-16
* Lists: conservative watcher updating (speed-up)
* GUI: logo pane and 'about' box

### 2011-11-15
* Morphic: more tolerant grabbing
* Lists: synchronized Watcher updating (speed-up)

### 2011-11-14
* Morphic: fullImageClassic() for ListWatcherMorphs
* Threads: MultiArgMorph now use Lists instead of JS-Arrays
* List Blocks
* GUI: adding/removing variables doesn't make the palette jump to the top
* Blocks: list type slots

### 2011-11-11
* Morphic: visibleBounds() bug fix

### 2011-11-09
* ListWatchers (basics)

### 2011-11-08
* Lists

### 2011-11-03
* widgets: ToggleMorphs (check boxes and radio buttons)
* non-variable watchers
* checkbox toggling for variable watchers

### 2011-11-02
* Morphic: StringMorph shadows

### 2011-10-31
* new: widgets.js
* PushButtons

### 2011-10-27
* more extensive Error catching
* slider for numerical text entries in "mobile mode"
* bigger blocks in "mobile mode"

### 2011-10-26
* Blocks: empty choice for input drop down menus
* automatic positioning of new watchers
* watchers on temporary variables are deleted by HIDE VARIABLE block (not hidden)
* HIDE VARIABLE with empty input deletes all watchers on temporary vars

### 2011-10-25
* GUI: WatcherMorphs
* SHOW VARIABLE, HIDE VARIABLE blocks

### 2011-10-21
* GUI: CellMorphs (for stage watchers)

### 2011-10-20
* unevaluated FunctionSlotMorphs (%f)
* autolambdafying ReporterSlotMorphs (%r, %p)

### 2011-10-19
* Morphic: scrolling speedup

### 2011-10-17
* another take on continuations

### 2011-10-12
* autolambdafying CSlotMorphs (C-shaped) and CommandSlotMorphs (inline)
* Morphic: right mouse click emulation for Mac

### 2011-10-10
* hybrid scope

### 2011-10-09
* call/cc

### 2011-10-07
* swooshy hat block tops (instead of circle segments)

### 2011-10-06
* force yield after timeout

### 2011-09-28
* GLIDE block

### 2011-09-27
* WAIT block

### 2011-09-26
* basic message broadcasting
* thread forking (LAUNCH block)

### 2011-09-23
* error catching for block evaluation

### 2011-09-22
* implicit parameters

### 2011-09-19
* formal parameters
* recursion
* closures

### 2011-09-14
* c-slots in primitives are now static by default
* basic THE BLOCK, CALL and REPORT

### 2011-09-13
* basic Lambda primitives
* basic Lambda visualization (showBubble)

### 2011-09-12
* Threads: renamed StackFrame to Context
* Blocks: persistent input default values

### 2011-09-11
* Morphic: PenMorph.setHeading() fixed

### 2011-08-26
* TemplateSlotMorphs (%t, %mult%t, %scriptVars)
* script variables
* lockable inputs

### 2011-08-24
* numerical virtual keyboard (pop-up-sliders - taken out again)
* sliders now work with negative floor numbers
* mouse wheel scroll events (thanks, Nathan!)

### 2011-08-23
* Sprite-scoped variables

### 2011-08-18
* optimizations for menu bubble help and Blocks layout

### 2011-08-17
* Threads: evaluating reporters
* showValue bubbles

### 2011-08-16
* Morphic: SpeechBubbleMorphs and bubble help for menus/buttons

### 2011-08-11
* Morphic: broken rect fix for float-positioned Morphs
* Blocks: straight bottom edges for stop-blocks
* PenMorph: round line ends

### 2011-08-10
* nasciturus: objects, gui

### 2011-08-04
* evaluator: ThreadManager, Process, StackFrame, VariableFrame

### 2011-07-27
* Morphic: fullBounds() now ignores hidden submorphs
* MultiArgMorphs: Optional label and minimum inputs settings, '%inputs'
* Morphic: simplified BoxMorph rendering
* Same-colored (white), semi-transparent reporter drop feedbacks

### 2011-07-26
* MultiArgMorphs (%mult%x)

### 2011-07-22
* stringField settable as numeric, supresses textual input
* editable numeric input slots supress textual type-in
* evaluation helper methods and properties
* collision detection

### 2011-07-21
* scrollBarSize can now optionally be specified individually
* block highlighting
* specs for any-unevaluated and Boolean-unevaluated inputs

### 2011-07-20
* HatBlocks

### 2011-07-19
* high-level documentation and code comments
* optional blurred slot shades (off by default)

### 2011-07-18
* ColorSlotMorphs (%clr)
* collision detection groundwork

### 2011-07-14
* optional drop-down menu for type-in slots
* read-only menus for type-in slots (%inst, %var, %lst, %obj, %eff,
  %dir, %cst, %snd, %key, %idx, %msg, %att, %fun, %typ)
* global pixel color sensing
* renamed TypeInSlotMorph to InputSlotMorph

### 2011-07-12
* rectangular reporter layout
* label mutli-line wrapping for reporters
* user-definable label line breaks (%br)
* font size customizable for individual menus
* ArrowMorphs

### 2011-07-11
* optional intra-block-label word wrap (flag) layout setting

### 2011-07-08
* extrapolate blockSpec upon label part drop

### 2011-07-07
* BlockMorph color changing
* entry field tabbing (Firefox and Opera only)
* label multi-line wrapping for command blocks

### 2011-07-06
* BooleanSlotMorphs (%b)
* Color mixing
* contrast setting for SyntaxElementMorphs
* exit confirmation

### 2011-07-05
* block specs

### 2011-06-30
* StringMorphs and TextMorph notify their parents of layout changes
* TypeInSlotMorphs (round - %n - and rectangular - %s -)

### 2011-06-28
* World menu in every Morph's developersMenu
* changed the standard to "sharp shadows" because of Firefox5 bug

### 2011-05-31
* ReporterBlockMorphs

### 2011-05-30
* C-slots only attach to blocks' tops (no longer also to bottoms)

### 2011-05-27
* Templates
* Padding for ScrollFrames

### 2011-05-24
* CommandSlotMorphs (%c)

### 2011-05-18
* Textures

### 2011-05-16
* Autoscrolling

### 2011-05-11
* Scrolling by dragging
* Scrolling by dragging velocity
