# Snap! (BYOB) Dev History

## in development:
* **New Features:**
    * dynamic (scriptable) drop down menus for custom block input slots
    * new "scripted" menu option for custom block input slots
    * new "When slot (slot) menu clicked" hat block for use inside custom block editors, has to report a list of drop-down menu items
    * metaprogramming support for scriptable input slot menus
    * custom block instance scripting support
    * new "When slot (slot) edited" hat block for use inside custom block editors
    * new "set slot (slot) to ..." commmand block for use inside custom block editors in "when (slot) edited" hatted scripts 
    * new "expand (input) to (n) slots" command block for use inside custo block editors in "when (slot) edited" hatted scripts
* **Notable Changes:**
    * changed "my (attribute)" primitive to report an empty list instead of an empty (scalar) value in case of no existing block, costumes, etc.
* **Translation Updates:**
    * German

### 2024-11-05
* blocks, threads: extended "When (slot) edited" event to variadic inputs, fires when a subslot is edited or when the user changes the arity

### 2024-11-04
* threads: added access to global custom block instance variables to "When slot ..." scripts inside definitions
* blocks: slightly refactored dynamicMenu()
* German translation update for the new v10.2 blocks
* updated dev version

### 2024-11-02
* objects, blocks, byob: new "When (slot) edited" hat block for use inside custom block editors
* objects, blocks, byob, threads: new "set (slot) slot to ..." commmand block for use inside custom block editors in "when (slot) edited" hatted scripts
* objects: changed wordings for slot-based primitives
* threads: changed "my (attribute)" primitive to report an empty list instead of an empty (scalar) value in case of no existing block, costumes, etc.
* objects, blocks, threads: new "expand (input) to (n) slots" command block for use inside custo block editors in "when (slot) edited" hatted scripts
* updated dev version

### 2024-10-31
* objects: changed wording for "when ... menu clicked" hat block
* blocks: fixed skipping evaluation of nested reporters for dynamicMenu()
* byob: enabled visible stepping of input menu scripts inside the block editor
* blocks, threads: fully evaluate the custom block's inputs (including reporters) before running the menu-generator script
* updated dev version

### 2024-10-30
* objects: changed wording for "when ... menu" hat block
* byob: changed wording in the ui for dynamic menus to "scripted"
* objects: changed wording for "when ... input menu" hat block
* threads: metaprogramming support for dynamic drop down menus
* updated dev version
* blocks: tweaked menuSelectorsMenu() to scan the block editor's current prototype declarations instead of the (changed) definition

### 2024-10-29
* new dev version
* threads: fixed a context-binding glitch in invoke()
* byob: dynamic drop down menu option for custom block input slots
* threads, blocks, objects: new "When ... menu is clicked" hat block for use inside custom block editors
* blocks: support for nested dynamic drop down menus
* objects: changed wording for "when ... menu clicked" hat block
