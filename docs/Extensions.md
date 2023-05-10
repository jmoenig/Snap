# Snap! Extensions

> Last updated October 19, 2022

Snap! Extensions take the idea of a library, and expand it by allowing you to add your own JavaScript code.
Much of the work happens through two (hidden) primitive blocks.

## Enable Extensions Blocks
Go to the Settings Menu (the cog) and turn on "Extension Blocks".
You now have two new blocks in the _Other_ category title called `primitive`.

The first argument is a dropdown menu which contains list of allowed JavaScript calls, showing the function signature.
The second argument is a variadic input to pass data to the selected JavaScript function.
Both the reporter and command block have access to the same set of functions, you can use whichever is necessary.

It is expected that you'll use the `primitive` block directly in a library, but you'll want to wrap it inside a custom block.

## Adding New Primitive Functions

The built-in set of primitives will get you a lot of functionality, but you'll likely want to do something more.
You can also extend Snap! with your own externally hosted JavaScript file(s)
and have them add your own extension primitives and menus to the global
SnapExtensions dictionaries. This lets you provide libraries to support
special APIs and custom hardware.

### 1. Primitives (additional blocks)

The names under which primitives are stored will apear in the dropdown
menus of the hidden extension "primitive" blocks sorted alphabetically.
(You can find those extension primitives in Snap's search bar or in dev
mode. There are two version of the primitive block, a command version and
a reporter one, both show the same list of available extensions.)

#### naming conventions
`domain-prefix_function-name(parameter-list)`
example: 'lst_sort(list, fn)'
- domain-prefix:    max 3-letter lowercase identifier
                    followed by an underscore
            e.g.:    err_, lst_, txt_, dta_, map_, tts_, xhr_, geo_, mda_
- function-name: short, single word if possible, lowercase
- parameter-list: comma separated names or type indicators

#### function semantics
- functions are called by the "primitive" blocks with any arguments provided
- use the "function () {}" notation to define functions, not the ES6 arrow
  notation, otherwise "this" will not get scoped correctly
- "this" refers to the current snap object (sprite or stage) at call-time
- a reference to the current process is always passed as last argument

### 2. Menus (for input slots)

The names of the available dynamic drowdown menus can be written into the
"options" dialog when defining an input slot. Additionally you can choose
from a list of available menus when holding down the shift-key while
clicking on the partial-gear button in Snap's input-slot dialog.

#### naming conventions
`domain-prefix_function-name`
example: 'clr_number'
- domain-prefix:    max 3-letter lowercase identifier
                    followed by an underscore
            e.g.:    clr_, txt_, lst_
- function-name: short, single word if possible, lowercase
- NOTE: dynamic menu functions cannot have any inputs

#### function semantics
- use the "function () {}" notation to define functions, not the ES6 arrow
  notation, otherwise "this" will not get scoped correctly
- "this" refers to the current input-slot at call-time (when the menu is
  requested by the user by clicking on the down-arrow symbol)
- to get a handle on the current block use "this.parentThatIsA(BlockMorph)"
- likewise to get a handle on the current sprite use
  "this.parentThatIsA(IDE_Morph).currentSprite"
- if you want the menu of one input slot to depend on the contents of
  another input slot of the same block, you can get a handle to the block
  using the above method, and then access all inputs by calling
  "block.inputs()". This will give you an array of all input slots.
  You can access the contents of an input slot by calling "slot.evaluate()"

### 3. Buttons (in the palette)

You can have your extension add buttons at the top of the palette in a
particular category. Usually, you will want to add these buttons to the
category created by your XML library.

To do so, just add a button entry in your JS extension file:

```js
    SnapExtensions.buttons.palette.push(
        {
            category: 'My Extension',
            label: 'Do Something',
            action: function () { doYourStuffWith(this); },
            hint: 'This button does things',
            hideable: false
        }
    );
```

Inside the action, "this" points to the currently selected object, be it a
sprite or the Stage.

The `hideable` attribute defines whether the button will be hidden when
turning off "Show buttons" in single palette mode. By default, extension
buttons will not be hidden.

### 4. External JavaScript files

You can provide extensions for your custom hardware or for arbitrary APIs
or extend Snap! with JavaScript libraries from other parties. You can
load additional JavaScript files using the

    src_load(url)

extension primitive inside Snap, which you can find using Snap's search bar
in the IDE. The loading primitive will wait until the source file has fully
loaded and its defined functions are ready to be called.
Snap remembers the external extensions that have been already loaded and
will ignore any subsequent calls to load the same external extension again.
This lets you lazily initialize your extension by simply adding a
"src_load(url)" command for your external JS file before calling any of its
added functions.

### 5. Miscellaneous

#### calling extension primitives in other JavaScript functions

You can call other extension primitives from your own JavaScript functions,
especially if you want to reuse them in your own extensions. Just make sure
to use `apply()` instead of calling them directly, so "this" gets scoped
correctly, e.g.:

```js
    SnapExtensions.primitives.get('var_declare(scope, name)').apply(
        this,
        ['global', '_my var', proc]
    );
```
Don't forget to pass in a reference to the current process as last parameter
in case the callee requires it.

#### adding primitives to SnapExtensions

It is the suggested best practice to expose your own extension primitives
by adding them to the global SnapExtensions libraries (for primitives and
menus) using the very same conventions described herein, and then to offer
a library of custom blocks that make calls to your additional operations.

#### developing an extension

Running the "src_load(url)" primitive will throw an error unless you first
check the "Enable JavaScript extensions" setting in Snap's preferences menu,
or if your JavaScript extension comes from a list of trusted hosts.
While you develop your JavaScript extension it's recommended to turn on the
"Enable JavaScript extensions" setting to load the extension once, and
then to turn it off again, so you can make sure your custom blocks are not
using any "JS Function" blocks (because those will be caught if the
preference is turned off).

#### Publishing an Extension

When you're ready to publish your extension you can contact us to allow-list
the url hosting your JS file, or you can send me a Github pull-request to
include it in the main Snap branch.
We recommend submitting your extensions to the main Snap! Github repository
so they can be made available in the offline versions (source download
and PWA).

External extensions are a powerful tools to change, override and generally
mold Snap into anything you want, so please use these capabilities sensibly.
We look forward to your innovations and don't plan to restrict the scope of
what extensions are allowed to modify. For security reasons we do ask you to
refrain from exposing any form of JS eval(), including "new Function()" to
end users (if you want to use eval() internally in your extension we'll
frown on you but not reject your contribution).

## Examples

SciSnap v2, TuneScope, and MQTT are some of the libraries that make excellent use of extensions APIs.
