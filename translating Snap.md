*****************************
Translating BYOB4 / Snap!

by Jens Moenig, Simon Claessens

last changed: 13/12/27
*****************************

Translation
===========

Translating Snap! is easy with the web-based translation platform [Transifex](https://www.transifex.com/projects/p/snap-build-your-own-blocks/).

You have to create an accout on Transifex.


Online translation
------------------

You can easily add or edit any languages from the Transifex web interface.
This interface allow to see and edit all string from English. The interface
are intuitive so use them or read before the [web editor help](http://support.transifex.com/customer/portal/articles/972120-introduction-to-the-web-editor).


Offline translation
-------------------

Because you can't see directly the changment on the Snap interface, sometime
it is preferable to get offline the translation.

Offline translation allow more power but with great power comes great
responsibility. Because when you pull a language, all untranslated string
are replaced by the English string so even if you don't translate
every string, when you push back the file, all string are marked as
translated.

So I recommend to edit translation only with the web interface.

If you still want to translate offline you must remove all untranslated
string from the source file before pushing the file on Transifex.

### Download Snap ###

Download the sources and extract them into a local folder on your
computer: http://snap.berkeley.edu/snapsource/snap.zip

### Transifex client ###

Download the Transifex client. This is a CLI python program to communicate
with the Transifex server.

* [on Mac OS X and Linux](http://support.transifex.com/customer/portal/articles/995605-installation-on-linux-and-mac-os-x-): `pip install transifex-client`
* [on windows](http://support.transifex.com/customer/portal/articles/998120-client-on-windows): download http://files.transifex.com/transifex-client/0.10/tx.exe inside Snap

We must now [configure the client](http://support.transifex.com/customer/portal/articles/1000855-configuring-the-client). Create a `.transifexrc` file inside
your home (Mac OS X and Linux) or inside the Snap directory with
folowing informations:

```
[https://www.transifex.com]
username = user
token =
password = p@ssw0rd
hostname = https://www.transifex.com
```

Change `username` and `password`. The token variable should be left blank.

### Get translation ###

within the Snap directory execute `tx pull -a` to fetch all translation
files from server.

keep the local copy of snap.html open in your web browser, and refresh it
as you progress with your translation.

Edit the translation file with a regular text editor, or with your
favorite JavaScript editor.

Don't forget that if you translate directly json files and you want
to push the to Transifex, all strings even if you leave the English
default string will be marked as translated. So be careful!


Translation informations
========================

Accented characters
-------------------

Depending on which text editor and which file encoding you use you can
directly enter special characters (e.g. Umlaut, accented characters) on
your keyboard. However, I've noticed that some browsers may not display
special characters correctly, even if other browsers do. So it's best to
check your results in several browsers. If you want to be on the safe
side, it's even better to escape these characters using Unicode.

    see: <http://0xcc.net/jsescape/>


Block specs
-----------

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


Known issues
------------

In some browsers accents or ornaments located in typographic ascenders
above the cap height are currently (partially) cut-off.


LTR only
--------

At this stage of development, Snap! can be translated to any LTR language
maintaining the current order of inputs (formal parameters in blocks).


Add new language
================

In addition of the translation, you want also add some meta data
in `locale.js`. Copy and then edit the English meta data.

```js
    SnapTranslator.dict.en = {
        // meta information
        'language_name': 'English',
        'language_translator': 'Jens M\u00F6nig',
        'translator_e-mail': 'jens@moenig.org',
        'last_changed': '2012-10-16',
    };
```

Don't forget to change the `en` of the variable definition with
the two-letter ISO 639-1 code for your language.

Send it to me `locale.js` for inclusion in the official Snap! distribution.
Once your translation has been included, Your name will the shown in the
"Translators" tab in the "About Snap!" dialog box, and you will be able to
directly launch a translated version of Snap! in your browser by appending
`lang:xx` to the URL, xx representing your translations two-letter code.


Add new translatable string
===========================

If when you add some functionalities on Snap, you must add translatable
strings. The method is easy:

Into `locales/lang-en.json` add key-value pairs with `key` are the short
English sentence find in the source code of your new fonctionality and
`value` are the same or a longer sentence.

If something doesn't work, or if you're unsure about the formalities you
should check your file with [JSLint](http://JSLint.com). This will
inform you about any missed commas etc.

When you are done, push these new strings to Transifex `tx push -s`


Enjoy!

-Jens & Simon
