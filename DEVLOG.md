# Snap! (BYOB) Dev History

## in development:
* **New Features:**
    1. OOP 2.0
        * new list-dictionary based object system with data scope and Lieberman style prototypical inheritance
        * new OOP library
        * new "parent" selector for accessing list items, points to entry at ellipsis "..."
        * change: "primitive" variable accessor blocks now accept reporters in their first input field expecting a variable name
        * change: ringified variable getters can be dropped into "primitive" variable accessor inputs expecting a variable name
        * change: variable getters become automatically ringified when dropped into such accessor slots
    2. support for input-groups in custom blocks
        * new "group" option in custom block slot type editor's special settings menu for multiple inputs
        * metaprogramming support for input groups (represented by a list of slot types)
    3. UI Looks
        * flat / default (skeuomorphic) design
        * bright / dark (color) theme
* **Notable Changes:**
    * variadic slots in custom blocks now support '%nl' as separators and expansion labels
    * Boolean input slot default values can be specified through metaprogramming
    * variadic Boolean input slot defaults can be specified both in the UI and through metaprogramming
* **Translation Updates:**
    * German

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
