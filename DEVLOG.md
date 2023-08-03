# Snap! (BYOB) Dev History

## in development:
* **New Features:**
    * color type input slots for custom blocks
    * metaprogramming support for clor type input slots (number: 13, spec: "clr", mnemonic: "color")
    * variadic variables type input slots for custom blocks
    * metaprogramming support for clor type variadic variables slots (number: 14, spec: "scriptVars", mnemonic: "vars")
    * destinations dropdown menu for custom blocks
* **Notable Changes:**
* **Notable Fixes:**
* **Documentation Updates:**
* **Translation Updates:**

### 2023-08-03
* byob: made distancesMenu() available for custom blocks
* blocks, byob: renamed distancesMenu() into destinationsMenu()

### 2023-08-02
* new dev branch and version
* blocks, byob: made %clr input slots available for custom blocks
* threads: metaprogramming support for color type input slots
* byob: made %scriptVars input slots available for custom blocks
* threads: metaprogramming support for %scriptVars input slots
* threads: moved script var declaration to multi-arg evaluation, eliminates necessity for doDeclareVariables()
