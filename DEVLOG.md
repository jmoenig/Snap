# Snap! (BYOB) Dev History

## in development:
* **New Features:**
    1. OOP 2.0
        * new list-dictionary based object system with data scope and Lieberman style prototypical inheritance
        * new OOP library
        * new "parent" selector for accessing list items, points to entry at ellipsis "..."
    2. support for input-groups in custom blocks
        * new "group" option in custom block slot type editor's special settings menu for multiple inputs
        * metaprogramming support for input groups (represented by a list of slot types)
        * new "Declare & Initialize Script Variables" library
    3. UI Looks
        * flat / default (skeuomorphic) design
        * bright / dark (color) theme
        * new "theme" configuration key in the API
* **Notable Changes:**
    * variadic slots in custom blocks now support '%nl' as separators and expansion labels
    * Boolean input slot default values can be specified through metaprogramming
    * variadic Boolean input slot defaults can be specified both in the UI and through metaprogramming
* **Notable Fixes:**
    * exclude variables declared inside input rings from the dropdown menu of reachable variables
    * automatically declare variadic upvars inside custom blocks when evaluating them
* **Documentation Updates:**
    * updated API.md with new "theme" configuration key for "bright" or "dark" UI modes
* **Translation Updates:**
    * German

### 2024-09-09
* threads: bind rings to object scope when INSERT / REPLACE -ing them into an object-list

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
