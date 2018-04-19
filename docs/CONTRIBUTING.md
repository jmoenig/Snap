# How to contribute

Attached is the current development code base for BYOB4 a.k.a. Snap. It consists of
several JavaScript, HTML and text files, and while some of it may be functional
most parts will be in flux and subject to frequent, even fundamental modifications.
This document lays out a few simple guidelines ensuring that collaborative code
contribution works out.


## Coding


### Working with changesets

You'll often want to change or add code in existing JS files. Please don't. Instead
use a changeset. The way I always do it myself is to copy the empty `changeset.js`
file and rename it to something like `JensChangesToMorphic.js`.

Into this file I write all the functions I want to add to Morphic. If I want to
change a function in Morphic.js I copy it to the changeset and edit it there. Then
I always validate the changeset with JSLint.com.

Please check your code frequently with JSLint!

For our Snap code set JSLint's settings to:

* assume a browser
* tolerate missing 'use strict' pragma
* `4` indentation
* `78` maximum line length

If you're working on the core Morphic library you can also

* tolerate eval
* tolerate unfiltered for in

although you'll probably not ever going to need either EVAL or FORIN in your
changesets anyway.

There are, of course, other tools - like JSHint and browser debug tools - that
help you debug your code. Feel free to use whichever suits you best, but let's
all agree on JSLint's (nitpicky!) formatting rules so we get code that's well
readable and easily shareable among ourselves.


### Coding style

Snap's codebase is both big and fast moving. We'll continue to churn out several
builds per day for a long time, hunting bugs and adding features throughout the
whole application. We'll also need to be able to get our heads around the whole
codebase. Being able to read and to quickly understand the code is most important,
much more so than mathematical elegance.

Let me really stress this point: In creating Snap we're neither playing "Code Golf"
(solving a problem using the least number of keystrokes) nor are we trying to
outsmart Knuth. Instead we're maintaining a large number of small interchangeable
code chunks, therefore:


### Avoid

* accessing the DOM
* frameworks (e.g. JQuery)
* modules and namespaces (e.g. IIFE)
	- all of Snap is a single "World" with unique names for everything
		- remember: Changesets contain "small interchangeable code chunks"...
* passing "thisArg" to functions like `map()`, `filter()` or `forEach()`
	- except in `call()`
	- always use `myself` to reference `this` in an outer scope instead
* meta-class systems
	- use Morphic's way of creating class-like constructors instead
		- initialize all attributes either in the constructor or in an `init()`
		  method, so you now the object's structure by casting a single look
		  upon it. Avoid adding adding attributes elsewhere, or if you do,
		  initialize them explicitly to "null" in the constructor or `init()`
		  code
* nested ternary operators
* RegEx
* overwriting existing definitions
	- except in changesets, duh :-)
	- create new constructors instead
* non-descriptive names for variables, functions, objects
* giant functions
	- which often are "modules in disguise",
	  especially if they define local helper functions
	- create a new constructor instead


### Testing your code

(don't worry, I'm not talking about formal UnitTest Suites or other BDSM software
fetishes, just about playing with what you're creating while you're doing it)

To test your changesets just add another line in the html stub file with your
changeset. Make sure to put your changeset **after** Morphic.js and Blocks.js and
whichever libraries are already included, so it'll actually get used.

In your changeset override the world's `customMorphs` function so it returns a
list of instances of your Morphs. For `Blocks.js` that code is:

```javascript
var BlockMorph;
var ScriptsMorph;

WorldMorph.prototype.customMorphs = function () {
	var sm = new ScriptsMorph();
	sm.setExtent(new Point(800, 600));
	return [
		new BlockMorph(),
		sm
	];
};
```

Just modify this code so it returns your list of sample Morphs instead of
`BlockMorph` and `ScriptsMorph` instances.

Once you've added this code to your changeset you can open your sample html file
in your browser, and you'll find your sample Morphs in the World's DEMO menu.


### Inspectors

To actually test play with your Morphs you can right-click on them and open an
inspector on them. You can open more than one inspector on each object. The
inspector pretty much works the same as in Smalltalk. It even has an evaluation
pane at the bottom, in which you can type in any JS code, mark it with your mouse
(or select all with ctrl-a), righ-click on the selection and either "do it", "show
it" or "inspect it" (again, like in Squeak).

Needless to say, in the evaluation pane `this` always refers to the inspected
object.


### Source Code Mgmt

The good thing about changesets is that you can continue working on them regardless
of new dev releases that happen in the meantime. When you feel you've got something
that's finished just send me your changeset, and I'll work all the changesets into
the Snap codebase and release another dev version. That way there will always (and
frequently) be a harmonized common code base.

---


## Translating Snap!

At this stage of development, Snap! can be translated to any LTR language
maintaining the current order of inputs (formal parameters in blocks).

Translating Snap! is easy:


### 1. Download

Download the sources and extract them into a local folder on your
computer: https://snap.berkeley.edu/snapsource/snap.zip.

Use the German translation file (named 'lang-de.js') as template for your
own translations. Start with editing the original file, because that way
you will be able to immediately check the results in your browsers while
you're working on your translation (keep the local copy of snap.html open
in your web browser, and refresh it as you progress with your
translation).


### 2. Edit

Edit the translation file with a regular text editor, or with your
favorite JavaScript editor.

In the first non-commented line (the one right below this
note) replace "de" with the two-letter ISO 639-1 code for your language,
e.g.

    fr - French => SnapTranslator.dict.fr = {
    it - Italian => SnapTranslator.dict.it = {
    pl - Polish => SnapTranslator.dict.pl = {
    pt - Portuguese => SnapTranslator.dict.pt = {
    es - Spanish => SnapTranslator.dict.es = {
    el - Greek => => SnapTranslator.dict.el = {

etc. (see <http://en.wikipedia.org/wiki/ISO_639-1>)


### 3. Translate

Then work through the dictionary, replacing the German strings against
your translations. The dictionary is a straight-forward JavaScript ad-hoc
object, for review purposes it should be formatted as follows:

```
{
    'English string':
        'Translation string',
    'last key':
}       'last value'
```

and you only edit the indented value strings. Note that each key-value
pair needs to be delimited by a comma, but that there shouldn't be a comma
after the last pair (again, just overwrite the template file and you'll be
fine).

If something doesn't work, or if you're unsure about the formalities you
should check your file with [JSLint](https://JSLint.com)

This will inform you about any missed commas etc.


### 4. Accented characters

Depending on which text editor and which file encoding you use you can
directly enter special characters (e.g. Umlaut, accented characters) on
your keyboard. However, I've noticed that some browsers may not display
special characters correctly, even if other browsers do. So it's best to
check your results in several browsers. If you want to be on the safe
side, it's even better to escape these characters using Unicode.

See this collection of JavaScript utilities: http://0xcc.net/jsescape/


### 5. Block specs

At this time your translation of block specs will only work
correctly, if the order of formal parameters and their types
are unchanged. Placeholders for inputs (formal parameters) are
indicated by a preceding % prefix and followed by a type
abbreviation.

For example:

    'say %s for %n secs'

can currently not be changed into

    'say %n secs long %s'

and still work as intended.

Similarly

    'point towards %dst'

cannot be changed into

    'point towards %cst'

without breaking its functionality.


### 6. Submit

When you're done, rename the edited file by replacing the "de" part of the
filename with the two-letter ISO 639-1 code for your language, e.g.

    fr - French => lang-fr.js
    it - Italian => lang-it.js
    pl - Polish => lang-pl.js
    pt - Portuguese => lang-pt.js
    es - Spanish => lang-es.js
    el - Greek => => lang-el.js

and send it to me for inclusion in the official Snap! distribution.
Once your translation has been included, Your name will the shown in the
"Translators" tab in the "About Snap!" dialog box, and you will be able to
directly launch a translated version of Snap! in your browser by appending

    lang:xx

to the URL, `xx` representing your translations two-letter code.


### 7. Known issues

In some browsers accents or ornaments located in typographic ascenders
above the cap height are currently (partially) cut-off.

---

Enjoy!

-Jens
