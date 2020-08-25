# Migrating to Morphic2 and Snap!6

Jens Mönig, July 11, 2020

This document gives a very brief overview of the Morphic changes from v1 to v2 without explaining the architectural changes. It is meant to help you move your existing Morphic application, such as a fork of the Snap! programming environment, to the new Morphic kernel quickly and successfully.

The first section is a list of changes. you don't have to read it to get started migrating. Instead you may refer to it when you feel the need for a - very - slightly deeper insight into the changes that have been made.

The second section is a recipe how to actually migrate your code. It's a list of words to search your code for, with directions what to replace them with. It's best to go through that list in the order it is written down here, file by file. Afterwards your Morphic app or Snap! fork should be able to work with the new Morphic2 kernel.

## Morphic Changes

* `noticesTransparentClick` => `!isFreeForm` (reversed default)
* `drawOn()` / `fullDrawOn()` takes context instead of Canvas as first arg
* `drawNew()` is deprecated => `render()`, also takes context as arg
* new`rerender()` to earmark for rerendering
* `.image`accessing has been turned intoa getter method: `getImage()`
* `.image`property has been deprecated, renamed to `cachedImage`for Morphs that need to check for pixel-wise collision frequently
* new `isCachingImage` flag (default: false)
* new `shouldRerender` flag (default: false)
* `fixLayout()`is now available for all Morphs, determines extent and arranges submorphs, if any, gets called from `setExtent()`
* new `fixHolesLayout()` method  in case your Morphs have untouchable areas ("holes")
* "silent" - functions are no longer needed, e.g. `silentSetExtent()`, `silentMoveBy()`
    - `silentSetExtent`  => use `bounds.setExtent()` to avoid infinite recursion
    - `silentMoveBy` => use `moveBy()`
    - `silentSetPosition`  => use `setPosition()`
    - `silentSetWidth` => use `bounds.setWidth()` to avoid infinite recursion
    - `silentSetHeight` = use `bounds.setHeight()` to avoid infinite recursion
* likewise "silent" parameters to functions are no longer needed and supported and should simply be removed
* `cachedFullImage` has been removed and is no longer available (except internally for the HandMorph) 
* `cachedFullBounds` has been removed and is no longer available (except internally for the HandMorph)
* `trackChanges` and other damage-list housekeeping tweaks are no longer needed and no longer supported, except for the Pen constructor's isWarped property and its methods, such as `startWarp()` and `endWarp()`.
* Pen >> `wantsRedraw` is no longer needed and deprecated
* holes: Morphs can have a list of rectangles representing "untouchable" areas, in this case use `fixHolesLayout()` to arrange them
*  new Morphic constants avoid creating zillions of objects for the same thing, these are
    - `new Point()`, `new Point(0, 0)` => `ZERO`
    - `new Color()`, `new Color(0, 0, 0)` => `BLACK`
    - `new Color(255, 255, 255)` => `WHITE`
* `virtualKeyboard` property in Morphic preference has been deprecated
* `fullImageClassic()` => is now always just `fullImage()`
* `keyboardReceiver` => `keyboardFocus`
* keyboard navigation can be activated for any visible menu by pressing an arbitrary key
* new `noDropShadow` property for Morphs that already have built-in shadows (Menus, SpeechBubbles) 
* new `fullShadowSource` flag for Morphs, default is `true`, turn off (`false`) to only use the simple image instead of `fullImage()`

## Migrating Your Sources

Search your code for these words and replace them according to the instructions. It's best to follow the order given here. The last 3 replacements with constants are optional optimizations and can be left out.

**Words to search your code for:**

* **drawNew**
    - rename method definitions to `render`, notice that the first argument needs to be the 2D context, therefore remove the part in the code that makes a new canvas and queries its context.
    - factor out the parts of the code that determine and set the extent and add or arrange submorphs and move them into a - possibly new - method named `fixLayout()`
    - rename function calls to `drawNew()` to `fixLayout()` and/or `rerender()`, check whether the call is at all needed as it might be redundant in the new system
* **wantsRedraw** => replace with `rerender()` 
* **noticesTransparentClick** => replace with `!isFreeForm`, use with caution, as free forms should also cache their image for performance reason, which in turn strains memory usage 
* **.image** => rename getters to `getImage()`, use with caution because of performance bottlenecks 
* **cachedFullImage** => no longer supported, remove all references
* **fullImageClassic** => rename method calls to just `fullImage()`
* **silentSet**
    - remove method definitions
    - rename method calls:
        - *silentSetExtent*  => use `bounds.setExtent()` to avoid infinite recursion
        - *silentMoveBy* => use `moveBy()`
        - *silentSetPosition*  => use `setPosition()`
        - *silentSetWidth* => use `bounds.setWidth()` to avoid infinite recursion
        - *silentSetHeight* = use `bounds.setHeight()` to avoid infinite recursion
* **silentMove** => replace `silentMoveBy()` with `moveBy()`
* **silentReplace** => (Snap! only) use replace instead
* **silent** => remove parameters named "silent" from function definitions and calls
* **cachedFullBounds** =>  no longer supported, remove all references
* **trackChanges** => no longer supported, remove all references
* **keyboardReceiver** => rename to `keyboardFocus`
* **startLayout** => no longer supported, remove all calls
* **endLayout** => no longer supported, remove all calls
* **new Point(0, 0)** => `ZERO`, but only if the point is not to be mutated
* **new Color() / new Color(0, 0, 0)** => `BLACK`, again, only if the color is not to be mutated
* **new Color(255, 255, 255)** => `WHITE`
