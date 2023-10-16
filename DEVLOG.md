# Snap! (BYOB) Dev History

## in development:
* **New Features:**
    * all blocks in the palette are now custom blocks, except hat blocks and rings
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
* **Notable Changes:**
    * when querying the defintion of a block via metaprogramming the number of inputs of the resulting ring now matches that of the header expression
    * block label symbols are now shown with their name prefixed by "$" instead of an underscore to avoid confusing them with inputs when metaprogramming
    * the metaprogramming getter for "translations" block attribute selector now always returns a list
    * custom block definition comments can now be deleted by setting them to nothing (empty string, zero or false)
    * the "define" block now always creates a new custom block definition instead of sometimes modifying the definition body of an existing one with a matching label
    * support for multiple separator lines in input slot dropdown menus
    * support for smooth animations in recursive control structures defined using metaprogramming
    * optimized FOR-loop and FOR-EACH-loop for speed
    * renamed "primitive" blocks into "extension"
* **Notable Fixes:**
    * fixed a type error when using metaprogramming to copy default inputs from a primitive over to a custom block definition
    * fixed referencing system drop-down menus in metaprogramming
    * fixed correctly evaluating (reifying) static (irreplaceable) C-slots inside custom blocks
* **Documentation Updates:**
* **Translation Updates:**
    * German

### 2023-10-16
* byob: tweaked localizing customized primitives
* byob: tweaked decoding choices for costomized primitives
* byob: made collidablesMenu() available for custom blocks
* stdlib: updated stdlib (translation support for dropdowns and default values, correct distribution of default values in variadic inputs)
* byob: tweaked relabelling customized primitives

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

