# Snap! (BYOB) Dev History

## in development:
* **New Features:**
    1. OOP 2.0
        * new list-dictionary based object system with data scope and Lieberman style prototypical inheritance
        * new "parent" selector for accessing list items, points to entry at ellipsis "..."
        * new "object" item in the THIS (runtime environment) primitive reporter's dropdown menu
        * new OOP library
    2. support for input-groups in custom blocks
        * new "group" option in custom block slot type editor's special settings menu for multiple inputs
        * metaprogramming support for input groups (represented by a list of slot types)
        * new "Declare & Initialize Script Variables" library
    3. UI Looks
        * flat / default (skeuomorphic) design
        * bright / dark (color) theme
        * new "theme" configuration key in the API
        * new "cube" and "cubeSolid" symbols
    4. Other
        * new Continuations library for run/cc and call/cc
* **Notable Changes:**
    * preserve the order of items when using lists as dictionaries or data objects
    * variadic slots in custom blocks now support '%nl' as separators and expansion labels
    * Boolean input slot default values can be specified through metaprogramming
    * variadic Boolean input slot defaults can be specified both in the UI and through metaprogramming
    * added an official "Restore primitives" item to the project menu, if a project / scene has customized prims
    * default values and expansion labels of variadic input slots in custom blocks are now translatable by prefixing them with $-underscore
* **Notable Fixes:**
    * exclude variables declared inside input rings from the dropdown menu of reachable variables
    * automatically declare variadic upvars inside custom blocks when evaluating them
    * fixed a LISP-encoding conflict between a variadic expression and formal ring parameters
* **Documentation Updates:**
    * updated API.md with new "theme" configuration key for "bright" or "dark" UI modes
    * updated LISP syntax documentation for script parameters
* **Translation Updates:**
    * German

### 2024-09-10
* threads: changed evaluation of input groups to return a 2D (or empty) list
* objects: adjusted LISP formulation of primitive IF block to the new input group evaluation
* byob: for input groups set "initial slots" to the length of the group
* libraries: adjusted variable declaration module to the new input group evaluation
* libraries: adjusted OOP module to the new input group evaluation
* html: adjusted obsolete "apple" meta tags for mobile sites
* reduced and re-activated pwa service worker
* reduced number of pwa-cached files
* added everything except libraries to pwa cache
* added everything except some libraries to pwa cache
* added Beetle and MQTT libraries to pwa cache
* added Tunescope library to pwa cache
* added SciSnap library to pwa cache
* removed SciSnap library from pwa cache (again)
* added SciSnap library to pwa cache (again), except for the costume js file
* new "Continuations" library
* updated "iteration / composition" library with new continuation blocks
* updated dev version
* v10.1-rc1

### 2024-09-09
* updated from master branch

### 2024-09-18
* blocks: fixed unevaluated slots for input groups
* updated OOP library
* updated dev version
* threads: added read-only access to global variables to unbound data objects

### 2024-09-17
* blocks, threads: new "object" item in the THIS (runtime environment) primitive reporter's dropdown menu
* updated German translation for "object" string
* updated dev version
* updated from master branch - fixed canvasBoundingBox() bug
* updated dev version

### 2024-09-16
* lists: preserve the order of items when using lists as dictionaries or data objects 
* updated from master branch
* updated dev version

### 2024-09-14
* blocks, byob: made default values and expansion labels of variadic input slots in custom blocks translatable
* German translation update for "field" (in the OOP library)
* updated OOP library with German translation
* updated variable declaration library with German translation
* updated dev version

### 2024-09-13
* updated from master branch
* updated dev version
* updated OOP library: added "FIELD OF" reporter
* symbols: new "cube" and "cubeSolid" symbols

### 2024-09-12
* threads: fixed #3394 - LISP-encoding conflict between a variadic expression and formal ring parameters
* updated LISP syntax documentation for script parameters
* changed dev version to 10.1
* updated dev version
* gui: added an official "Restore primitives" item to the project menu, if a project / scene has customized prims

### 2024-09-11
* threads: bind looked up variables inside objects to their receiver ("self")

### 2024-09-10
* threads: bind rings to object scope when INSERT / REPLACE -ing them into an object-list
* updated OOP library: added "ADD field" command
* updated dev version

### 2024-09-09
* blocks: disabled experimental change allowing dropping reporters into variable accessor input slots and auto-ringification
* blocks, morphic: exclude variables declared inside input rings from the dropdown menu of reachable variables
* threads: automatically declare variadic upvars inside custom blocks when evaluating them
* threads: automatically declare upvars inside custom block input groups
* updated OOP library
* new "Declare & Initialize Script Variables" library
* updated dev version

### 2024-09-06
* API: new "theme" configuration key for "bright" or "dark" GUI theme
* updated pyret transpilation study with new "bright" theme configuration
* updated dev from master (pulled Polish translation update v10.0.7)
* updated dev version

### 2024-09-05
* blocks: auto-ringify variable getter reporters when they are dropped into the variable (name) slot of variable accessor commands
* blocks: support for setting (variadic) Boolean input slot defaults

### 2024-09-03
* gui, objects, blocks, byob: decoupled skeuomorphic/flat UI design from dark/bright UI theme
* German translation update for UI Looks
* updated dev version
* threads: reverted to ringified variable blobs as valid inputs for variable setters

### 2024-09-02
* lists: let list-based objects inherit variables from both other lists and also sprites and the stage, including from global variable scope

### 2024-08-29
* blocks: avoid errors when specifying default values for non-editable slots
* updated dev from master (pulled Catalan translation update v10.0.6)
* store: updated file version to 11-dev
* updated dev version

### 2024-08-28
* threads: added metaprogramming support for input groups
* updated dev version

### 2024-08-27
* blocks, threads: new localized "parent" selector for accessing list items, points to entry at ellipsis "..."
* byob: use slot numbers and support mnemonics for input groups
* updated dev version

### 2024-08-26
* new list-dictionary based object system with data scope and prototypical inheritance
* new OOP library
* updated dev version

### 2024-08-20
* new dev version
