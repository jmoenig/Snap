/*

    lang-de.js

    German translation for SNAP!

    written by Jens Mönig

    Copyright (C) 2014 by Jens Mönig

    This file is part of Snap!.

    Snap! is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of
    the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.



    Note to Translators:
    --------------------
    At this stage of development, Snap! can be translated to any LTR language
    maintaining the current order of inputs (formal parameters in blocks).

    Translating Snap! is easy:


    1. Download

    Download the sources and extract them into a local folder on your
    computer:

        <http://snap.berkeley.edu/snapsource/snap.zip>

    Use the German translation file (named 'lang-de.js') as template for your
    own translations. Start with editing the original file, because that way
    you will be able to immediately check the results in your browsers while
    you're working on your translation (keep the local copy of snap.html open
    in your web browser, and refresh it as you progress with your
    translation).


    2. Edit

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


    3. Translate

    Then work through the dictionary, replacing the German strings against
    your translations. The dictionary is a straight-forward JavaScript ad-hoc
    object, for review purposes it should be formatted as follows:

        {
            'English string':
                'Translation string',
            'last key':
        }       'last value'

    and you only edit the indented value strings. Note that each key-value
    pair needs to be delimited by a comma, but that there shouldn't be a comma
    after the last pair (again, just overwrite the template file and you'll be
    fine).

    If something doesn't work, or if you're unsure about the formalities you
    should check your file with

        <http://JSLint.com>

    This will inform you about any missed commas etc.


    4. Accented characters

    Depending on which text editor and which file encoding you use you can
    directly enter special characters (e.g. Umlaut, accented characters) on
    your keyboard. However, I've noticed that some browsers may not display
    special characters correctly, even if other browsers do. So it's best to
    check your results in several browsers. If you want to be on the safe
    side, it's even better to escape these characters using Unicode.

        see: <http://0xcc.net/jsescape/>


    5. Block specs:

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


    6. Submit

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

    to the URL, xx representing your translations two-letter code.


    7. Known issues

    In some browsers accents or ornaments located in typographic ascenders
    above the cap height are currently (partially) cut-off.

    Enjoy!
    -Jens
*/

/*global SnapTranslator*/

SnapTranslator.dict.ml = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    Ä, ä   \u00c4, \u00e4
    Ö, ö   \u00d6, \u00f6
    Ü, ü   \u00dc, \u00fc
    ß      \u00df
*/

    // translations meta information
    'language_name':
        'Malayalam', // the name as it should appear in the language menu
    'language_translator':
        'vinayakumar R', // your name for the Translators tab
    'translator_e-mail':
        'vnkmr7620@gmail.com', // optional
    'last_changed':
        '2015-02-20', // this, too, will appear in the Translators tab

    // GUI
    // control bar:
    'untitled':
        'തലക്കെട്ടില്ലാത്ത',
    'development mode':
        'വികസനം സമ്പ്രദായം',

    // categories:
    'Motion':
        'ചലനം',
    'Looks':
        'കാഴ്‌ച',
    'Sound':
        'ശബ്‌ദം',
    'Pen':
        'പേന',
    'Control':
        'നിയന്ത്രണം',
    'Sensing':
        'ഗ്രഹണം',
    'Operators':
        'ക്രിയകള്',
    'Variables':
        'ചരങ്ങള്‍',
    'Lists':
        'പട്ടിക',
    'Other':
        'വേറൊന്ന്',

    // editor:
    'draggable':
        'വലിച്ചിഴയ്‌ക്കുക',

    // tabs:
    'Scripts':
        'ലിപികള്‍',
    'Costumes':
        'വേഷം',
    'Sounds':
        'ശബ്‌ദകള്‍',

    // names:
    'Sprite':
        'ദേവത',
    'Stage':
        'നില',

    // rotation styles:
    'don\'t rotate':
        'തിരികരുത്',
    'can rotate':
         'തിരിക്കാന്‍ കഴിയും',
    'only face left/right':
        'മാത്രം നോകുക ഇടത്‌/വലത്ത്',

    // new sprite button:
    'add a new sprite':
         'പുതിയ ദേവത ചേര്‍ക്കുക',

    // tab help
    'costumes tab help':
         'വേഷം ലഘുപട്ടിക സഹായം',
    'import a sound from your computer\nby dragging it into here':
        'കമ്പ്യൂട്ടറില്‍ നിന്നും ശബ്തം ഇറക്കുമതി\n ഇവിടെ വലിച്ചിട്ടുക',

    // primitive blocks:

    /*
        Attention Translators:
        ----------------------
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
    */

    // motion:
    'Stage selected:\nno motion primitives':
        'B\u00fchne ausgew\u00e4hlt:\nkeine Standardbewegungsbl\u00f6cke\n'
            + 'vorhanden',

    'move %n steps':
        'ചലിക്കുക %n പടികള്',
    'turn %clockwise %n degrees':
        'drehe %clockwise %n Grad',
    'turn %counterclockwise %n degrees':
        'drehe %counterclockwise %n Grad',
    'point in direction %dir':
        'ലേക്ക് തിരിയുക %dir',
    'point towards %dst':
        'ലേക്ക് തിരിയുക %dst',
    'go to x: %n y: %n':
        'ലേക്ക് പോവുക x: %n y: %n',
    'go to %dst':
        'ലേക്ക് പോവുക %dst',
    'glide %n secs to x: %n y: %n':
        'സെകന്റില്‍ %n ലേക്ക് നീങ്ങുക x: %n y: %n',
    'change x by %n':
        'xനെ %n കൊണ്ട് മാറ്റുക',
    'set x to %n':
        'xനെ %n ആക്കുക',
    'change y by %n':
        'yനെ %n കൊണ്ട് മാറ്റുക',
    'set y to %n':
        'yനെ %n ആക്കുക',
    'if on edge, bounce':
        'അറ്റത്താണെങ്കില്‍ തിരിച്ചു നടക്കുക',
    'x position':
        'xസ്ഥാന',
    'y position':
        'yസ്ഥാനം',
    'direction':
        'ദിശ',

    // looks:
    'switch to costume %cst':
        'മത്തെ രൂപമാക്കുക %cst',
    'next costume':
        'അടുത്ത രൂപം',
    'costume #':
        'രൂപ #',
    'say %s for %n secs':
        '%s %n സെകന്റ് പറയുക',
    'say %s':
        '%s പറയുക',
    'think %s for %n secs':
        '%n സെകന്റ് %s ചിന്തിക്കുക',
    'think %s':
        '%s ചിന്തിക്കുക',
    'Hello!':
        'ഹലോ!',
    'Hmm...':
        'ഹ് മ് മും...',
    'change %eff effect by %n':
        '%eff നെ %n കൊണ്ട് മാറ്റുക',
    'set %eff effect to %n':
        '%eff എന്ന സ്പെഷല്‍ എഫെക്റ്റ് %n ആക്കുക',
    'clear graphic effects':
        'ഗ്രാഫിക്‌ ഇഫെക്റ്റ്സ് മാറ്റുക',
    'change size by %n':
        'വലിപ്പം %n കൊണ്ട് മാറ്റുക',
    'set size to %n %':
        'വലിപ്പം %n % ആക്കുക',
    'size':
        'വലിപ്',
    'show':
        'പ്രത്യക്ഷമാവുക',
    'hide':
        'ഒളിക്കുക',
    'go to front':
        'ഉപരിതലത്തിലോട്ടു വരിക',
    'go back %n layers':
        '%n പാളി അകത്തേക്ക് പോവുക',

    'development mode \ndebugging primitives:':
        'Hackermodus \nDebugging-Bl\u00f6cke',
    'console log %mult%s':
        'schreibe in die Konsole: %mult%s',
    'alert %mult%s':
        'Pop-up: %mult%s',

    // sound:
    'play sound %snd':
        '%snd ശബ്ദമുണ്ടാക്കുക',
    'play sound %snd until done':
        'തീരുന്നതു വരെ %snd ശബ്ദമുണ്ടാക്കുക',
    'stop all sounds':
        'stoppe alle Kl\u00e4nge',
    'rest for %n beats':
        '%n ബീറ്റ് സമയം കാത്തിരിക്കുക',
    'play note %n for %n beats':
        '%n മത്തെ സ്വരം %n ബീറ്റ്സ് അവതരിപ്പിക്കുക',
    'change tempo by %n':
        'ടെംപോ %n കൊണ്ട് മാറ്റുക',
    'set tempo to %n bpm':
        'ടെംപോ %n ബീറ്റ്സ്/മിനിറ്റ് ആക്കുക',
    'tempo':
        'ടെംപ',

    // pen:
    'clear':
        'മായ്ക്കുക',
    'pen down':
        'വരയ്ക്കാന്‍ തുടങ്ങുക',
    'pen up':
        'വരയുന്നത് നിര്‍ത്തുക',
    'set pen color to %clr':
        'പേനയുടെ നിറം %clr ആക്കുക',
    'change pen color by %n':
        'പേനയുടെ നിറം %n കൊണ്ട് മാറ്റുക',
    'set pen color to %n':
        'പേനയുടെ നിറം %n ആക്കുക',
    'change pen shade by %n':
        'പേനയുടെ ഷേഡ് %n കൊണ്ട് മാറ്റുക',
    'set pen shade to %n':
        'പേനയുടെ ഷേഡ് %n ആക്കുക',
    'change pen size by %n':
        'പേനയുടെ വലിപ്പം %n കൊണ്ട് മാറ്റുക',
    'set pen size to %n':
        'പേനയുടെ വലിപ്പം %n ആക്കുക',
    'stamp':
        'ഒട്ടിക്കുക',

    // control:
    'when %greenflag clicked':
        '%greenflag ക്ലിക്ക് ചെയ്യുമ്പോള്‍',
    'when %keyHat key pressed':
        '%keyHat കീ അമര്‍ത്തുമ്പോള്‍',
    'when I am clicked':
        'Wenn ich angeklickt werde',
    'when I receive %msgHat':
        'ഞാന്‍ %msgHat സ്വീകരിക്കുമ്പോള്‍',
    'broadcast %msg':
        '%msg വിളംബരം ചെയ്യുക',
    'broadcast %msg and wait':
        '%msg വിളംബരം ചെയ്തു കാത്തിരിക്കുക',
    'Message name':
        'സന്ദേശത്തിന്റെ പേര്',
    'message':
        'സന്ദേശത്തിന്റ',
    'any message':
        'eine beliebige Nachricht',
    'wait %n secs':
        '%n സെകന്റ് കാത്തിരിക്കുക',
    'wait until %b':
        '%b ആവുന്നത് വരെ കാത്തിരിക്കുക',
    'forever %c':
        'എല്ലായ്പ്പോഴു %c',
    'repeat %n %c':
        'തവണ ആവര്‍ത്തിക്കുക %n %c',
    'repeat until %b %c':
        '%b %c ആവുന്നത് വരെ ആവര്‍ത്തിക്കുക',
    'if %b %c':
        '%b %c ആണെങ്കില്‍',
    'if %b %c else %c':
        '%b %c ആണെങ്കില്‍ അല്ലെങ്കില്‍ %c',
    'report %s':
        'berichte %s',
    'stop %stopChoices':
        'നിര്‍ത്തുക %stopChoices',
    'all':
        'എല്ലാ',
    'this script':
        'ഈ സീരിയല്‍ ',
    'this block':
        'ഈ ബ്ലോക്കുകള്‍',
    'stop %stopOthersChoices':
        'നിര്‍ത്തുക %stopOthersChoices',
    'all but this script':
        'alles au\u00dfer diesem Skript',
    'other scripts in sprite':
        'andere Skripte in diesem Objekt',
    'pause all %pause':
        'pausiere alles %pause',
    'run %cmdRing %inputs':
        'f\u00fchre %cmdRing aus %inputs',
    'launch %cmdRing %inputs':
        'starte %cmdRing %inputs',
    'call %repRing %inputs':
        'rufe %repRing auf %inputs',
    'run %cmdRing w/continuation':
        'f\u00fchre %cmdRing mit Continuation aus',
    'call %cmdRing w/continuation':
        'rufe %cmdRing mit Continuation auf',
    'warp %c':
        'Warp %c',
    'when I start as a clone':
        'Wenn ich geklont werde',
    'create a clone of %cln':
        'klone %cln',
    'myself':
        'mich',
    'delete this clone':
        'entferne diesen Klon',

    // sensing:
    'touching %col ?':
        '%col തൊടുന്നുണ്ടോ?',
    'touching %clr ?':
        '%clr തൊടുന്നുണ്ടോ?',
    'color %clr is touching %clr ?':
        '%clr കളര്‍ %clr നെ തൊടുന്നുണ്ടോ?',
    'ask %s and wait':
        '%s ചോദിച്ചു കാത്തിരിക്കുക',
    'what\'s your name?':
        'താങ്കളുടെ പേര് എന്താണ്?',
    'answer':
        'ഉത്തര',
    'mouse x':
        'മൗസിന്റെ x സ്ഥാന',
    'mouse y':
        'മൗസിന്റെ y സ്ഥാന',
    'mouse down?':
        'മൗസ് താഴെയാണോ?',
    'key %key pressed?':
        '%key കീ അമര്‍ത്തിയോ?',
    'distance to %dst':
        '%dst ലേക്കുള്ള ദൂരം',
    'reset timer':
        'ടൈമര്‍ വീണ്ടും തുടങ്ങുക',
    'timer':
        'ടൈമര്‍',
    '%att of %spr':
        '%att ന്‍റ %spr',
    'http:// %s':
        'http:// %s',
    'turbo mode?':
        'Turbomodus?',
    'set turbo mode to %b':
        'setze Turbomodus auf %b',

    'filtered for %clr':
        'nach %clr gefiltert',
    'stack size':
        'Stapelgr\u00f6\u00dfe',
    'frames':
        'Rahmenz\u00e4hler',

    // operators:
    '%n mod %n':
        '%n ശിഷ് %n',
    'round %n':
        '%n റൗണ്ട് ചെയ്യുക',
    '%fun of %n':
        '%fun ന്‍റ %n',
    'pick random %n to %n':
        '%n മുതല്‍ %n വരെയുള്ള ഏതെങ്കിലും സംഖ്യ എടുക്കുക',
    '%b and %b':
        '%b കൂടാത %b',
    '%b or %b':
        '%b അഥവ %b',
    'not %b':
        '%b അല്ല',
    'true':
        'ശര',
    'false':
        'തെറ്റ്',
    'join %words':
        'മായി യോജിപ്പിക്കുക %words',
    'split %s by %delim':
        'trenne %s nach %delim',
    'hello':
        'ഹലോ',
    'world':
        'ലോകം',
    'letter %idx of %s':
        '%idx ന്‍റെ %n മത്തെ അക്ഷരം',
    'length of %s':
        '%s ന്‍റെ നീള',
    'unicode of %s':
        'Unicode Wert von %s',
    'unicode %n as letter':
        'Unicode %n als Buchstabe',
    'is %s a %typ ?':
        'ist %s ein(e) %typ ?',
    'is %s identical to %s ?':
        'ist %s identisch mit %s ?',

    'type of %s':
        'Typ von %s',

    // variables:
    'Make a variable':
        'ഒരു ചരം ഉണ്ടാക്കുക',
    'Variable name':
        'ചരത്തിന്റെ പേര്',
    'Script variable name':
        'കോഡ് ചരത്തിന്റെ പേര്',
    'Delete a variable':
        'ഒരു ചരം ഡിലീറ്റ് ചെയ്യുക',

    'set %var to %s':
        '%var നെ %s ആക്കി മാറ്റുക',
    'change %var by %n':
        '%var നെ %n കൊണ്ട് മാറ്റുക',
    'show variable %var':
        '%var എന്ന ചരം കാണിക്കുക',
    'hide variable %var':
        '%var എന്ന ചരത്തെ ഒളിപ്പിച്ചു വയ്ക്കുക',
    'script variables %scriptVars':
        'Skriptvariablen %scriptVars',

    // lists:
    'list %exp':
        'Liste %exp',
    '%s in front of %l':
        '%s am Anfang von %l',
    'item %idx of %l':
        'Element %idx von %l',
    'all but first of %l':
        'alles au\u00dfer dem ersten von %l',
    'length of %l':
        'L\u00e4nge von %l',
    '%l contains %s':
        '%l enth\u00e4lt %s',
    'thing':
        'etwas',
    'add %s to %l':
        'f\u00fcge %s zu %l hinzu',
    'delete %ida of %l':
        'entferne %ida aus %l',
    'insert %s at %idx of %l':
        'f\u00fcge %s als %idx in %l ein',
    'replace item %idx of %l with %s':
        'ersetze Element %idx in %l durch %s',

    // other
    'Make a block':
        'Neuer Block',

    // menus
    // snap menu
    'About...':
        '\u00dcber Snap!...',
    'Reference manual':
        'Handbuch lesen',
    'Snap! website':
        'Snap! Webseite',
    'Download source':
        'Quellcode runterladen',
    'Switch back to user mode':
        'zur\u00fcck zum Benutzermodus',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'verl\u00e4sst Morphic',
    'Switch to dev mode':
        'zum Hackermodus wechseln',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'erm\u00f6glicht Morphic Funktionen',

    // project menu
    'Project notes...':
        'പ്രോജെക്റ്റ്‌ കുറിപ്പുകള്‍....',
    'New':
        'പുതിയ',
    'Open...':
        'ഓപ്പണ്‍ ചെയ്യുക...',
    'Save':
        'സേവ് ചെയ്യുക',
    'Save As...':
        'എന്ന് സേവ് ചെയ്യുക...',
    'Import...':
        'കൊണ്ടുവരിക...',
    'file menu import hint':
        'l\u00e4dt ein exportiertes Projekt,\neine Bibliothek mit '
            + 'Bl\u00f6cken\n'
            + 'ein Kost\u00fcm oder einen Klang',
    'Export project as plain text...':
        'Projekt als normalen Text exportieren...',
    'Export project...':
        'Projekt exportieren...',
    'show project data as XML\nin a new browser window':
        'zeigt das Projekt als XML\nin einem neuen Browserfenster an',
    'Export blocks...':
        'Bl\u00f6cke exportieren...',
    'show global custom block definitions as XML\nin a new browser window':
        'zeigt globale Benutzerblockdefinitionen\nals XML im Browser an',
    'Import tools':
        'Tools laden',
    'load the official library of\npowerful blocks':
        'das offizielle Modul mit\nm\u00e4chtigen Bl\u00f6cken laden',
    'Libraries...':
        'Module...',
    'Import library':
        'Modul laden',

    // cloud menu
    'Login...':
        'Anmelden...',
    'Signup...':
        'Benutzerkonto einrichten...',

    // settings menu
    'Language...':
        'ഭാഷ...',
    'Zoom blocks...':
        'Bl\u00f6cke vergr\u00f6\u00dfern...',
    'Stage size...':
        'സ്റ്റേജ് വലിപ്...',
    'Stage size':
        'സ്റ്റേജ് വലിപ്',
    'Stage width':
        'B\u00fchnenbreite',
    'Stage height':
        'B\u00fchnenh\u00f6he',
    'Default':
        'Normal',
    'Blurred shadows':
        'Weiche Schatten',
    'uncheck to use solid drop\nshadows and highlights':
        'abschalten f\u00fcr harte Schatten\nund Beleuchtung',
    'check to use blurred drop\nshadows and highlights':
        'einschalten f\u00fcr harte Schatten\nund Beleuchtung',
    'Zebra coloring':
        'Zebrafarben',
    'check to enable alternating\ncolors for nested blocks':
        'einschalten \u00fcr abwechselnde Farbnuancen\nin Bl\u00f6cken',
    'uncheck to disable alternating\ncolors for nested block':
        'ausschalten verhindert abwechselnde\nFarbnuancen in Bl\u00f6cken',
    'Dynamic input labels':
        'Eingabenbeschriftung',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'ausschalten verhindert Beschriftung\nvon Mehrfacheingaben',
    'check to enable dynamic\nlabels for variadic inputs':
        'einschalten um Mehrfacheingabefelder\nautomatisch zu beschriften',
    'Prefer empty slot drops':
        'Leere Platzhalter bevorzugen',
    'settings menu prefer empty slots hint':
        'einschalten um leere Platzhalter\nbeim Platzieren von Bl\u00f6cken'
            + 'zu bevorzugen',
    'uncheck to allow dropped\nreporters to kick out others':
        'ausschalten um das "Rauskicken"\nvon platzierten Bl\u00f6cken\n'
            + 'zu erm\u00f6glichen',
    'Long form input dialog':
        'Ausf\u00fchrlicher Input-Dialog',
    'Plain prototype labels':
        'Einfache Prototyp-Beschriftung',
    'uncheck to always show (+) symbols\nin block prototype labels':
        'ausschalten, um (+) Zeichen\nim Blockeditor zu verbergen',
    'check to hide (+) symbols\nin block prototype labels':
        'einschalten, um (+) Zeichen\nim Blockeditor immer anzuzeigen',
    'check to always show slot\ntypes in the input dialog':
        'einschalten, um immer die Datentypen\nim Input-Dialog zu sehen',
    'uncheck to use the input\ndialog in short form':
        'ausschalten f\u00fcr kurzen\nInput-Dialog',
    'Virtual keyboard':
        'Virtuelle Tastatur',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'ausschalten um die virtuelle\nTastatur auf mobilen Ger\u00e4ten\n'
            + 'zu sperren',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'einschalten um die virtuelle\nTastatur auf mobilen Ger\u00e4ten\n'
            + 'zu erm\u00f6glichen',
    'Input sliders':
        'Eingabeschieber',
    'uncheck to disable\ninput sliders for\nentry fields':
        'ausschalten um Schieber\nin Eingabefeldern zu verhindern',
    'check to enable\ninput sliders for\nentry fields':
        'einschalten um Schieber\nin Eingabefeldern zu aktivieren',
    'Clicking sound':
        'Akustisches Klicken',
    'uncheck to turn\nblock clicking\nsound off':
        'ausschalten um akustisches\nKlicken zu deaktivieren',
    'check to turn\nblock clicking\nsound on':
        'einschalten um akustisches\nKlicken zu aktivieren',
    'Animations':
        'Animationen',
    'uncheck to disable\nIDE animations':
        'ausschalten um IDE-\nAnimationen zu verhindern',
    'Turbo mode':
        'Turbomodus',
    'check to prioritize\nscript execution':
        'einschalten, um Skripte\nzu priorisieren',
    'uncheck to run scripts\nat normal speed':
        'ausschalten, um Skripte\nnormal auszuf\u00fchren',
    'check to enable\nIDE animations':
        'einschalten um IDE-\nAnimationen zu erlauben',
    'Thread safe scripts':
        'Threadsicherheit',
    'uncheck to allow\nscript reentrance':
        'verhindert, dass unvollendete\nSkripte erneut gestartet werden',
    'check to disallow\nscript reentrance':
        'verhindert, dass unvollendete\nSkripte erneut gestartet werden',
    'Prefer smooth animations':
        'Fixe Framerate',
    'uncheck for greater speed\nat variable frame rates':
        'ausschalten, um Animationen \ndynamischer auszuf\u00fchren',
    'check for smooth, predictable\nanimations across computers':
        'einschalten, damit Animationen\n\u00fcberall gleich laufen',
    'Flat line ends':
        'Flache Pinselstriche',
    'check for flat ends of lines':
        'einschalten f\u00fcr flache\nPinselstrichenden',
    'uncheck for round ends of lines':
        'auschalten f\u00fcr runde\nPinselstrichenden',

    // inputs
    'with inputs':
        'mit Eingaben',
    'input names:':
        'Eingaben:',
    'Input Names:':
        'Eingaben:',
    'input list:':
        'Eingabeliste:',

    // context menus:
    'help':
        'സഹായ',

    // palette:
    'hide primitives':
        'Basisbl\u00f6cke ausblenden',
    'show primitives':
        'Basisbl\u00f6cke anzeigen',

    // blocks:
    'help...':
        'സഹായ...',
    'relabel...':
        'Umbenennen...',
    'duplicate':
        'ഡ്യൂപ്ലിക്കേറ്റ്‌',
    'make a copy\nand pick it up':
        'eine Kopie aufnehmen',
    'only duplicate this block':
        'nur diesen Block duplizieren',
    'delete':
        'ഡിലീറ്റ് ചെയ്യുക',
    'script pic...':
        'Skriptbild...',
    'open a new window\nwith a picture of this script':
        'ein neues Browserfenster mit einem\nBild dieses Skripts \u00f6ffnen',
    'ringify':
        'Umringen',
    'unringify':
        'Entringen',

    // custom blocks:
    'delete block definition...':
        'Blockdefinition l\u00f6schen',
    'edit...':
        'Bearbeiten...',

    // sprites:
    'edit':
        'എഡിറ്റ്‌',
    'move':
        'നീങ്ങുക',
    'detach from':
        'Abtrennen von',
    'detach all parts':
        'Alle Teile abtrennen',
    'export...':
        'കൊടുത്തയയ്ക്കുക...',

    // stage:
    'show all':
        'Alles zeigen',
    'pic...':
        'Bild exportieren...',
    'open a new window\nwith a picture of the stage':
        'ein neues Browserfenster mit einem\nBild der B\u00fchne \u00f6ffnen',

    // scripting area
    'clean up':
        'Aufr\u00e4umen',
    'arrange scripts\nvertically':
        'Skripte der Reihe nach\nanordnen',
    'add comment':
        'Anmerkung hinzuf\u00fcgen',
    'undrop':
        'R\u00fcckg\u00e4ngig',
    'undo the last\nblock drop\nin this pane':
        'Setzen des letzten Blocks\nwiderrufen',
    'scripts pic...':
        'Bild aller Scripte...',
    'open a new window\nwith a picture of all scripts':
        'ein neues Browserfenster mit einem\nBild aller Skripte \u00f6ffnen',
    'make a block...':
        'Neuen Block bauen...',

    // costumes
    'rename':
        'Umbenennen',
    'export':
        'കൊടുത്തയയ്ക്കുക',
    'rename costume':
        'Kost\u00fcm umbenennen',

    // sounds
    'Play sound':
        'ശബ്ദമുണ്ടാക്കുക',
    'Stop sound':
        'Klang\nanhalten',
    'Stop':
        'Halt',
    'Play':
        'തുടങ്ങുക',
    'rename sound':
        'Klang umbenennen',

    // dialogs
    // buttons
    'OK':
        'ഓക',
    'Ok':
        'ഓക',
    'Cancel':
        'ക്യാന്‍സല്‍ ചെയ്യുക',
    'Yes':
        'അതെ',
    'No':
        'അല്ല',

    // help
    'Help':
        'സഹായ',

    // zoom blocks
    'Zoom blocks':
        'Bl\u00f6cke vergr\u00f6\u00dfern',
    'build':
        'baue',
    'your own':
        'eigene',
    'blocks':
        'Bl\u00f6cke',
    'normal (1x)':
        'normal (1x)',
    'demo (1.2x)':
        'Demo (1.2x)',
    'presentation (1.4x)':
        'Pr\u00e4sentation (1.4x)',
    'big (2x)':
        'gro\u00df (2x)',
    'huge (4x)':
        'riesig (4x)',
    'giant (8x)':
        'gigantisch (8x)',
    'monstrous (10x)':
        'ungeheuerlich (10x)',

    // Project Manager
    'Untitled':
        'Unbenannt',
    'Open Project':
        'പ്രോജെക്റ്റ്‌ ഓപ്പണ്‍ ചെയ്യുക',
    '(empty)':
        '(leer)',
    'Saved!':
        'Gesichert!',
    'Delete Project':
        'Projekt l\u00f6schen',
    'Are you sure you want to delete':
        'Wirklich l\u00f6schen?',
    'rename...':
        'Umbenennen...',

    // costume editor
    'Costume Editor':
        'Kost\u00fcmeditor',
    'click or drag crosshairs to move the rotation center':
        'Fadenkreuz anklicken oder bewegen um den Drehpunkt zu setzen',

    // project notes
    'Project Notes':
        'പ്രോജെക്റ്റ്‌ കുറിപ്പുകള്‍',

    // new project
    'New Project':
        'Neues Projekt',
    'Replace the current project with a new one?':
        'Das aktuelle Projekt durch ein neues ersetzen?',

    // save project
    'Save Project As...':
        'Projekt Sichern Als...',

    // export blocks
    'Export blocks':
        'Bl\u00f6cke exportieren',
    'Import blocks':
        'Bl\u00f6cke importieren',
    'this project doesn\'t have any\ncustom global blocks yet':
        'in diesem Projekt gibt es noch keine\nglobalen Bl\u00f6cke',
    'select':
        'ausw\u00e4hlen',
    'none':
        'nichts',

    // variable dialog
    'for all sprites':
        'f\u00fcr alle',
    'for this sprite only':
        'nur f\u00fcr dieses Objekt',

    // block dialog
    'Change block':
        'Block ver\u00e4ndern',
    'Command':
        'Befehl',
    'Reporter':
        'Funktion',
    'Predicate':
        'Pr\u00e4dikat',

    // block editor
    'Block Editor':
        'Blockeditor',
    'Apply':
        'Anwenden',

    // block deletion dialog
    'Delete Custom Block':
        'Block L\u00f6schen',
    'block deletion dialog text':
        'Soll dieser Block mit allen seinen Exemplare\n' +
            'wirklich gel\u00f6scht werden?',

    // input dialog
    'Create input name':
        'Eingabe erstellen',
    'Edit input name':
        'Eingabe bearbeiten',
    'Edit label fragment':
        'Beschriftung bearbeiten',
    'Title text':
        'Beschriftung',
    'Input name':
        'Eingabe',
    'Delete':
        'L\u00f6schen',
    'Object':
        'Objekt',
    'Number':
        'Zahl',
    'Text':
        'Text',
    'List':
        'Liste',
    'Any type':
        'Beliebig',
    'Boolean (T/F)':
        'Boolsch (W/F)',
    'Command\n(inline)':
        'Befehl',
    'Command\n(C-shape)':
        'Befehl\n(C-Form)',
    'Any\n(unevaluated)':
        'Beliebig\n(zitiert)',
    'Boolean\n(unevaluated)':
        'Boolsch\n(zitiert)',
    'Single input.':
        'Einzeleingabe.',
    'Default Value:':
        'Standardwert:',
    'Multiple inputs (value is list of inputs)':
        'Mehrere Eingaben (als Liste)',
    'Upvar - make internal variable visible to caller':
        'Interne Variable au\u00dfen sichtbar machen',

    // About Snap
    'About Snap':
        '\u00dcber Snap',
    'Back...':
        'Zur\u00fcck...',
    'License...':
        'Lizenz...',
    'Modules...':
        'Komponenten...',
    'Credits...':
        'Mitwirkende...',
    'Translators...':
        '\u00dcbersetzer',
    'License':
        'Lizenz',
    'current module versions:':
        'Komponenten-Versionen',
    'Contributors':
        'Mitwirkende',
    'Translations':
        '\u00dcbersetzungen',

    // variable watchers
    'normal':
        'normal',
    'large':
        'gro\u00df',
    'slider':
        'Regler',
    'slider min...':
        'Minimalwert...',
    'slider max...':
        'Maximalwert...',
    'import...':
        'Importieren...',
    'Slider minimum value':
        'Minimalwert des Reglers',
    'Slider maximum value':
        'Maximalwert des Reglers',

    // list watchers
    'length: ':
        'L\u00e4nge: ',

    // coments
    'add comment here...':
        'Anmerkung hier hinzuf\u00fcgen',

    // drow downs
    // directions
    '(90) right':
        '(90) rechts',
    '(-90) left':
        '(-90) links',
    '(0) up':
        '(0) oben',
    '(180) down':
        '(180) unten',

    // collision detection
    'mouse-pointer':
        'Mauszeiger',
    'edge':
        'Kante',
    'pen trails':
        'Malspuren',

    // costumes
    'Turtle':
        'Richtungszeiger',
    'Empty':
        'Leer',

    // graphical effects
    'brightness':
        'Helligeit',
    'ghost':
        'Durchsichtigkeit',
    'negative':
        'Farbumkehr',
    'comic':
        'Moire',
    'confetti':
        'Farbverschiebung',

    // keys
    'space':
        'Leertaste',
    'up arrow':
        'Pfeil nach oben',
    'down arrow':
        'Pfeil nach unten',
    'right arrow':
        'Pfeil nach rechts',
    'left arrow':
        'Pfeil nach links',
    'a':
        'a',
    'b':
        'b',
    'c':
        'c',
    'd':
        'd',
    'e':
        'e',
    'f':
        'f',
    'g':
        'g',
    'h':
        'h',
    'i':
        'i',
    'j':
        'j',
    'k':
        'k',
    'l':
        'l',
    'm':
        'm',
    'n':
        'n',
    'o':
        'o',
    'p':
        'p',
    'q':
        'q',
    'r':
        'r',
    's':
        's',
    't':
        't',
    'u':
        'u',
    'v':
        'v',
    'w':
        'w',
    'x':
        'x',
    'y':
        'y',
    'z':
        'z',
    '0':
        '0',
    '1':
        '1',
    '2':
        '2',
    '3':
        '3',
    '4':
        '4',
    '5':
        '5',
    '6':
        '6',
    '7':
        '7',
    '8':
        '8',
    '9':
        '9',

    // messages
    'new...':
        'Neu...',

    // math functions
    'abs':
        'Betrag',
    'floor':
        'Abgerundet',
    'sqrt':
        'Wurzel',
    'sin':
        'sin',
    'cos':
        'cos',
    'tan':
        'tan',
    'asin':
        'asin',
    'acos':
        'acos',
    'atan':
        'atan',
    'ln':
        'ln',
    'e^':
        'e^',

    // delimiters
    'letter':
        'Buchstabe',
    'whitespace':
        'Leerraum',
    'line':
        'Zeilenvorschub',
    'tab':
        'Tabulator',
    'cr':
        'Wagenr\u00fccklauf',

    // data types
    'number':
        'Zahl',
    'text':
        'Text',
    'Boolean':
        'Boole',
    'list':
        'Liste',
    'command':
        'Befehlsblock',
    'reporter':
        'Funktionsblock',
    'predicate':
        'Pr\u00e4dikat',

    // list indices
    'last':
        'letztes',
    'any':
        'beliebiges'
};
