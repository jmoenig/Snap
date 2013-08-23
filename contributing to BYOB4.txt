*****************************
Contributing to BYOB4 / Snap!
by Jens Mönig
last changed: 12/09/14
*****************************

Attached is the current development code base for BYOB4 a.k.a. Snap. It consists of
several JavaScript, HTML and text files, and while some of it may be functional
most parts will be in flux and subject to frequent, even fundamental modifications.
This document lays out a few simple guidelines ensuring that collaborative code
contribution works out.


Working with changesets
-----------------------
You'll often want to change or add code in existing JS files. Please don't. Instead
use a changeset. The way I always do it myself is to copy the empty

	changeset.js

file and rename it to something like

	JensChangesToMorphic.js

Into this file I write all the functions I want to add to Morphic. If I want to
change a function in Morphic.js I copy it to the changeset and edit it there. Then
I always validate the changeset with

	JSLint.com

Please check your code frequently with JSLint!

For our Snap code set JSLint's settings to:

	assume a browser
	tolerate missing 'use strict' pragma

	[4] indentation
	[78] maximum line length

If you're working on the core Morphic library you can also

	tolerate eval
	tolerate unfiltered for in

although you'll probably not ever going to need either EVAL or FORIN in your
changesets anyway.

There are, of course, other tools - like JSHint and Firebug - that help you debug
your code. Feel free to use whichever suits you best, but let's all agree on
JSLint's (nitpicky!) formatting rules so we get code that's well readable and
easily shareable among ourselves.


Coding style
------------
Snap's codebase is both big and fast moving. We'll continue to churn out several
builds per day for a long time, hunting bugs and adding features throughout the
whole application. We'll also need to be able to get our heads around the whole
codebase. Being able to read and to quickly understand the code is most important,
much more so than mathematical elegance.

Let me really stress this point: In creating Snap we're neither playing "Code Golf"
(solving a problem using the least number of keystrokes) nor are we trying to
outsmart Knuth. Instead we're maintaining a large number of small interchangeable
code chunks, therefore:


Avoid
-----
	* accessing the DOM

	* frameworks (e.g. JQuery)

	* modules and namespaces (e.g. IIFE)

		- all of Snap is a single "World" with unique names for everything

        - remember: Changesets contain "small interchangeable code chunks"...

	* passing "thisArg" to functions like map(), filter() or forEach()

		- except in call()
		- always use "myself" to reference "this" in an outer scope instead

	* meta-class systems

		- use Morphic's way of creating class-like constructors instead

		- initialize all attributes either in the constructor or in an init()
		  method, so you now the object's structure by casting a single look
		  upon it. Avoid adding adding attributes elsewhere, or if you do,
		  initialize them explicitly to "null" in the constructor or init()
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


Testing your code
------------------
(don't worry, I'm not talking about formal UnitTest Suites or other BDSM software
fetishes, just about playing with what you're creating while you're doing it)

To test your changesets just add another line in the html stub file with your
changeset. Make sure to put your changeset /after/ Morphic.js and Blocks.js and
whichever libraries are already included, so it'll actually get used.

In your changeset override the world's

	customMorphs

function so it returns a list of instances of your Morphs. For "Blocks.js" that
code is:

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

Just modify this code so it returns your list of sample Morphs instead of
BlockMorph and ScriptsMorph instances.

Once you've added this code to your changeset you can open your sample html file
in your browser, and you'll find your sample Morphs in the World's DEMO menu.


Inspectors
----------
To actually test play with your Morphs you can right-click on them and open an
inspector on them. You can open more than one inspector on each object. The
inspector pretty much works the same as in Smalltalk. It even has an evaluation
pane at the bottom, in which you can type in any JS code, mark it with your mouse
(or select all with ctrl-a), righ-click on the selection and either "do it", "show
it" or "inspect it" (again, like in Squeak).

Needless to say, in the evaluation pane "this" always refers to the inspected
object.


Source Code Mgmt
-----------------
The good thing about changesets is that you can continue working on them regardless
of new dev releases that happen in the meantime. When you feel you've got something
that's finished just send me your changeset, and I'll work all the changesets into
the Snap codebase and release another dev version. That way there will always (and
frequently) be a harmonized common code base.

Thanks!

--Jens
