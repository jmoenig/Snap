# Snap! (BYOB) Dev History

## in development:
* **New Features:**
    * color type input slots for custom blocks
    * metaprogramming support for color type input slots (number: 13, spec: "clr", mnemonic: "color")
    * variadic variables type input slots for custom blocks
    * metaprogramming support for color type variadic variables slots (number: 14, spec: "scriptVars", mnemonic: "vars")
    * destinations, locations, keys, data types, objects + self, sprites + self, object attributes, microphone and scenes dropdown menus for custom blocks
    * upvars in custom blocks can now have different default names than their formal parameter names
    * "collapse" label support for variadic inputs in custom blocks
    * metaprogramming support for "collapse" labels in variadic inputs
    * metaprogramming support for c-slots with loop arrows (number: 15, spec: "ca", mnemonic: "loop")
    * variadic "collapse" (prefix label) support for custom blocks
* **Notable Changes:**
    * when querying the defintion of a block via metaprogramming the number of inputs of the resulting ring now matches that of the header expression
    * block label symbols are now shown with their name prefixed by "$" instead of an underscore to avoid confusing them with inputs when metaprogramming
    * the metaprogramming getter for "translations" block attribute selector now always returns a list
    * custom block definition comments can now be deleted by setting them to nothing (empty string, zero or false)
    * the "define" block now always creates a new custom block definition instead of sometimes modifying the definition body of an existing one with a matching label
* **Notable Fixes:**
    * fixed a type error when using metaprogramming to copy default inputs from a primitive over to a custom block definition
    * fixed referencing system drop-down menus in metaprogramming
    * fixed correctly evaluating (reifying) static (irreplaceable) C-slots inside custom blocks
* **Documentation Updates:**
* **Translation Updates:**

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
* byob: made typessMenu() available for custom blocks
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

