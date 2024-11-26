# Snap! (BYOB) Dev History

## in development:
* **New Features:**
    * Custom Hat Blocks, expressed as predicate defining a condition that fires the event
    * Custom Hat Blocks can choose to be "events" reacting to a state change (default) or "rules" observing state (indicated by an infinity symbol) 
    * new "Events" library featuring custom hat blocks reacting to various state changes
    * new data type: "hat"
    * new "obj_version(obj)" extension for observing compound structures (lists, actors, scripts)
    * new "infinity" / chain link symbol
    * new "relabel" option for generic "When" hat block lets you switch between "event" (new default) and old "rule" semantics, indicated by the infinity symbol
* **Notable Changes:**
    * directly clicking on a generic or custom hat block runs it no matter what
    * "rule" hat blocks (that always fire when their condition is true) are indicated by an infinity symbol
    * the generic "When" hat block in the palette now has "event" semantics and only fires on state change, blocks in existing projects keep their "rule" semantics
    * changed positioning of local method icon (location pin) to be vertically centered
* **Notable Fixes:**
    * fixed generic and custom hat block scheduling for turbo mode
    * fixed "expand _ to _ slots" block in the metapgroamming libary to be able to fully collapse
    * fixed contrast for local method icon (location pin) in bright ui theme
* **Translation Updates:**
    * German

### 2024-11-26
* byob: fixed a layout glitch in the input slot dialog
* byob: renamed the block type button in the make-a-block dialog to "Event Hat"
* boyb: fully integrated custom hat block type into the block dialog, so users can switch from an to any other block type 
* German translation update

### 2024-11-25
* gui: fixed contrast for local method icon (location pin) in bright ui theme
* blocks: tweaked vertical positioning of method icon in local custom hat blocks
* byob: introduced "semantics" property to distinguish between "event" and "rule" custom hat blocks
* store: added support for "semantics" property of custom block definitions
* blocks: changed positioning of local method icon (location pin) to be vertically centered
* threads: new "event" semantics (default) for custom hat blocks
* blocks, byob: refactored HatBlock >> isLoaded
* threads: new generic "receiveEventCondition" primitive for generic hat blocks
* blocks, objects, threads: replaced generic "When" hat in the palette with event semantics version
* objects: added "relabel" options to generic "When" hat block to switch between "event" and "rule" semantics
* updated "Events" library with new event semantics
* duplicated help screen for generic "When" hat
* updated dev version

### 2024-11-24
* symbols: new "infinity" / chain link symbol
* blocks, byob: mark "rule" hat blocks with an infinity symbol to distinguish them from "event" hats 
* updated dev version

### 2024-11-22
* fixed "expand _ to _ slots" block in the metapgroamming libary to be able to fully collapse

### 2024-11-21
* byob: fixed custom hat block prototype attach points (there should be none)
* threads: directly clicking on a generic or custom hat block runs it no matter what
* objects: fixed generic and custom hat block scheduling for turbo mode
* blocks, byob, threads: basic metaprogramming support for custom hat blocks
* extensions: new "obj_version(obj)" extension for observing compound structures (lists, actors, scripts)
* updated dev version

### 2024-11-20
* libraries: new "Events" library featuring custom hat blocks reacting to various state changes
* updated dev version

### 2024-11-19
* byob, blocks, objects, threads, store: Custom Event Hat Blocks, expressed as predicate defining a condition that fires the event
* updated dev version

### 2024-11-18
* new dev version
