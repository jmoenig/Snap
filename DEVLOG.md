# Snap! (BYOB) Dev History

## in development:
* **New Features:**
    1. OOP 2.0
        * new list-dictionary based object system with data scope and prototypical inheritance
        * new OOP library
        * new "parent" selector for accessing list items, points to entry at ellipsis "..."
        * change: "primitive" variable accessor blocks now accept reporters in their first input field expecting a variable name
        * change: variable getters can be dropped into "primitive" variable accessor inputs expecting a variable name
    2. support for input-groups in custom blocks
        * new "group" option in custom block slot type editor's special settings menu for multiple inputs
        * metaprogramming support for input groups (represented by a list of slot types)
* **Notable Changes:**
    * variadic slots in custom blocks now support '%nl' as separators and expansion labels
    
### 2024-08-28
* threads: added metaprogramming support for input groups

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
