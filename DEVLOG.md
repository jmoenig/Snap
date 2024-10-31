# Snap! (BYOB) Dev History

## in development:
* **New Features:**
    * dynamic (scriptable) drop down menus for custom block input slots
    * new "scripted" menu option for custom block input slots
    * new "When ... menu clicked" hat block for use inside custom block editors, has to report a list of drop-down menu items
    * metaprogramming support for scriptable input slot menus

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
