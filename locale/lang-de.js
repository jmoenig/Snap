/*

    lang-de.js

    German translation for SNAP!

    written by Jens Mönig

    Copyright (C) 2019 by Jens Mönig

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

SnapTranslator.dict.de = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    Ä, ä   \u00c4, \u00e4
    Ö, ö   \u00d6, \u00f6
    Ü, ü   \u00dc, \u00fc
    ß      \u00df
*/

    // translations meta information
    'language_name':
        'Deutsch', // the name as it should appear in the language menu
    'language_translator':
        'Jens M\u00F6nig, Jadga H\u00fcgle', // your name for the Translators tab
    'translator_e-mail':
        'jens@moenig.org, jadga.huegle@sap.com', // optional
    'last_changed':
        '2019-04-27', // this, too, will appear in the Translators tab

    // GUI
    // control bar:
    'untitled':
        'Unbenannt',
    'development mode':
        'Hackermodus',

    // categories:
    'Motion':
        'Bewegung',
    'Looks':
        'Aussehen',
    'Sound':
        'Klang',
    'Pen':
        'Stift',
    'Control':
        'Steuerung',
    'Sensing':
        'F\u00fchlen',
    'Operators':
        'Operatoren',
    'Variables':
        'Variablen',
    'Lists':
        'Listen',
    'Other':
        'Andere',

    // editor:
    'draggable':
        'greifbar',

    // tabs:
    'Scripts':
        'Skripte',
    'Costumes':
        'Kost\u00fcme',
    'Backgrounds':
        'Hintergr\u00fcnde',
    'Sounds':
        'Kl\u00e4nge',

    // names:
    'Sprite':
        'Objekt',
    'Stage':
        'B\u00fchne',

    // rotation styles:
    'don\'t rotate':
        'nicht drehbar',
    'can rotate':
        'frei drehbar',
    'only face left/right':
        'kann sich nur nach\nlinks/rechts drehen',

    // new sprite button:
    'add a new sprite':
        'ein neues Objekt\nhinzuf\u00fcgen',
    'add a new Turtle sprite':
        'neues Objekt hinzufügen',
    'paint a new sprite':
        'neues Objekt zeichnen',
    'take a camera snapshot and\nimport it as a new sprite':
        'neues Objekt mit Webcam-Kostüm hinzufügen',
    

    // tab help
    'costumes tab help':
        'Bilder durch Hereinziehen von einer anderen\n'
            + 'Webseite oder vom Computer importieren',
    'import a sound from your computer\nby dragging it into here':
        'Kl\u00e4nge durch Hereinziehen importieren',

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
        'gehe %n Schritte',
    'turn %clockwise %n degrees':
        'drehe %clockwise %n Grad',
    'turn %counterclockwise %n degrees':
        'drehe %counterclockwise %n Grad',
    'point in direction %dir':
        'zeige Richtung %dir',
    'point towards %dst':
        'zeige auf %dst',
    'go to x: %n y: %n':
        'gehe zu x: %n y: %n',
    'go to %dst':
        'gehe zu %dst',
    'glide %n secs to x: %n y: %n':
        'gleite %n Sek. zu x: %n y: %n',
    'change x by %n':
        '\u00e4ndere x um %n',
    'set x to %n':
        'setze x auf %n',
    'change y by %n':
        '\u00e4ndere y um %n',
    'set y to %n':
        'setze y auf %n',
    'if on edge, bounce':
        'pralle vom Rand ab',
    'x position':
        'x-Position',
    'y position':
        'y-Position',
    'direction':
        'Richtung',

    // looks:
    'switch to costume %cst':
        'ziehe Kost\u00fcm %cst an',
    'next costume':
        'n\u00e4chstes Kost\u00fcm',
    'costume #':
        'Kost\u00fcm Nr.',
    'say %s for %n secs':
        'sage %s f\u00fcr %n Sek.',
    'say %s':
        'sage %s',
    'think %s for %n secs':
        'denke %s f\u00fcr %n Sek.',
    'think %s':
        'denke %s',
    'Hello!':
        'Hallo!',
    'Hmm...':
        'Hmm...',
    '%img of costume %cst':
        '%img von Kostüm %cst',
    'stretch %cst x: %n y: %n %':
        'strecke %cst x: %n y: %n %',
    'change %eff effect by %n':
        '\u00e4ndere %eff -Effekt um %n',
    'set %eff effect to %n':
        'setze %eff -Effekt auf %n',
    'clear graphic effects':
        'schalte Grafikeffekte aus',
    '%eff effect':
        '%eff -Effekt',
    'change size by %n':
        '\u00e4ndere Gr\u00f6\u00dfe um %n',
    'set size to %n %':
        'setze Gr\u00f6\u00dfe auf %n %',
    'size':
        'Gr\u00f6\u00dfe',
    'show':
        'anzeigen',
    'hide':
        'verstecken',
    'go to %layer layer':
        'gehe nach %layer',
    'front':
        'vorn',
    'back':
        'hinten',
    'go back %n layers':
        'gehe %n Ebenen zur\u00fcck',

    'development mode \ndebugging primitives:':
        'Hackermodus \nDebugging-Bl\u00f6cke',
    'console log %mult%s':
        'schreibe in die Konsole: %mult%s',
    'alert %mult%s':
        'Pop-up: %mult%s',

    'pixels':
        'Pixel',
    'current':
        'aktuell',

    // sound:
    'play sound %snd':
        'spiele Klang %snd',
    'play sound %snd until done':
        'spiele Klang %snd ganz',
    'stop all sounds':
        'stoppe alle Kl\u00e4nge',
    'rest for %n beats':
        'spiele Pause f\u00fcr %n Schl\u00e4ge',
    'play sound %snd at %rate hz':
        'spiele Klang %snd mit %rate hz',
    '%aa of sound %snd':
        '%aa von Klang %snd',
    'duration':
        'Dauer',
    'length':
        'Länge',
    'number of channels':
        'Anzahl Kanäle',
    'play note %note for %n beats':
        'spiele Note %note f\u00fcr %n Schl\u00e4ge',
    'set instrument to %inst':
        'setze Instrument auf %inst',
    'change tempo by %n':
        '\u00e4ndere Tempo um %n',
    'set tempo to %n bpm':
        'setze Tempo auf %n Schl\u00e4ge/Min.',
    'tempo':
        'Tempo',
    'change volume by %n':
        'ändere Lautstärke um %n',
    'set volume to %n %':
        'setze Lautstärke auf %n %',
    'change balance by %n':
        'ändere Balance um %n',
    'set balance to %n':
        'setze Balance auf %n',
    'balance':
        'Balance',
    'play frequency %n hz':
        'spiele Frequenz %n hz',
    'stop frequency':
        'stoppe Frequenz',
    'play %n hz for %n secs':
        'spiele %n hz f\u00fcr %n Sek.',

    // "instruments", i.e. wave forms
    '(1) sine':
        '(1) Sinus',
    '(2) square':
        '(2) Quadrat',
    '(3) sawtooth':
        '(3) Sägeblatt',
    '(4) triangle':
        '(4) Dreieck',

    // pen:
    'clear':
        'wische',
    'pen down':
        'Stift runter',
    'pen up':
        'Stift hoch',
    'set pen color to %clr':
        'setze Stiftfarbe auf %clr',
    'set background color to %clr':
        'setze Hintergrundfarbe auf %clr',
    'change pen %hsva by %n':
        '\u00e4ndere Stift %hsva um %n',
    'change background %hsva by %n':
        '\u00e4ndere Hintergrund %hsva um %n',
    'set pen %hsva to %n':
        'setze Stift %hsva auf %n',
    'set background %hsva to %n':
        'setze Hintergrund %hsva auf %n',
    'pen %pen':
        'Stift %pen',
    'change pen size by %n':
        '\u00e4ndere Stiftdicke um %n',
    'set pen size to %n':
        'setze Stiftdicke auf %n',
    'stamp':
        'stemple',
    'fill':
        'male aus',
    'write %s size %n':
        'schreibe %s Größe %n',

    // control:
    'when %greenflag clicked':
        'Wenn %greenflag angeklickt',
    'when %keyHat key pressed':
        'Wenn Taste %keyHat gedr\u00fcckt',
    'when I am %interaction':
        'Wenn ich %interaction werde',
    'clicked':
        'angeklickt',
    'pressed':
        'gedr\u00fcckt',
    'dropped':
        'abgestellt',
    'mouse-entered':
        'vom Mauszeiger betreten',
    'mouse-departed':
        'vom Mauszeiger verlassen',
    'scrolled-down':
    	'nach unten gescrollt',
    'scrolled-up':
        'nach oben gescrollt',
    'stopped':
        'gestoppt',
    'when %b':
        'Wenn %b',
    'when I receive %msgHat':
        'Wenn ich %msgHat empfange',
    'broadcast %msg':
        'sende %msg an alle',
    'broadcast %msg and wait':
        'sende %msg an alle und warte',
    'Message name':
        'Nachricht',
    'message':
        'Nachricht',
    'any message':
        'eine beliebige Nachricht',
    'wait %n secs':
        'warte %n Sek.',
    'wait until %b':
        'warte bis %b',
    'forever %loop':
        'fortlaufend %loop',
    'repeat %n %loop':
        'wiederhole %n mal %loop',
    'repeat until %b %loop':
        'wiederhole bis %b %loop',
    'for %upvar = %n to %n %cla':
        'für %upvar = %n bis %n %cla',
    'if %b %c':
        'falls %b %c',
    'if %b %c else %c':
        'falls %b %c sonst %c',
    'if %b then %s else %s':
        'falls %b dann %s sonst %s',
    'report %s':
        'berichte %s',
    'stop %stopChoices':
        'stoppe %stopChoices',
    'all':
        'alles',
    'this script':
        'dieses Skript',
    'this block':
        'diesen Block',
    'stop %stopOthersChoices':
        'stoppe %stopOthersChoices',
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
    'a new clone of %cln':
        'neuer Klon von %cln',
    'myself':
        'selbst',
    'delete this clone':
        'entferne diesen Klon',
    'tell %spr to %cmdRing %inputs':
        'lasse %spr %cmdRing tun %inputs',
    'ask %spr for %repRing %inputs':
        'frage %spr nach %repRing %inputs',

    // sensing:
    'touching %col ?':
        'ber\u00fchre %col ?',
    'touching %clr ?':
        'ber\u00fchre %clr ?',
    'color %clr is touching %clr ?':
        'Farbe %clr ber\u00fchrt %clr ?',
    'ask %s and wait':
        'frage %s und warte',
    'what\'s your name?':
        'Wie hei\u00dft Du?',
    'answer':
        'Antwort',
    'mouse x':
        'Maus x-Position',
    'mouse y':
        'Maus y-Position',
    'mouse down?':
        'Maustaste gedr\u00fcckt?',
    'key %key pressed?':
        'Taste %key gedr\u00fcckt?',
    '%rel to %dst':
        '%rel zu %dst',
    'distance':
    	'Entfernung',
    '%asp at %loc' :
        '%asp bei %loc',
    'sprites' :
        'Objekte',
    'reset timer':
        'starte Stoppuhr neu',
    'timer':
        'Stoppuhr',
    '%att of %spr':
        '%att von %spr',
    'my %get':
        'Attribut %get',
    'object %spr':
        'Objekt %spr',
    'http:// %s':
        'http:// %s',
    'turbo mode':
        'Turbomodus',
    'flat line ends':
        'flache Pinselstriche',
    'is %setting on?':
        'ist %setting an?',
    'set %setting to %b':
        'setze %setting auf %b',
    'current %dates':
        'Kalender %dates',
    'year':
        'Jahr',
    'month':
        'Monat',
    'date':
        'Datum',
    'day of week':
        'Wochentag',
    'hour':
        'Stunde',
    'minute':
        'Minute',
    'second':
        'Sekunde',
    'time in milliseconds':
        'Zeit in Millisekunden',
    'microphone %audio':
        'Mikrofon %audio',
    'volume':
        'Lautstärke',
    'note':
        'Note',
    'frequency':
        'Frequenz',
    'samples':
        'Signale',
    'sample rate':
        'Abtastrate',
    'spectrum':
        'Frequenzspektrum',
    'resolution':
        'Auflösung',
    'Microphone resolution...':
        'Mikrofonauflösung...',
    'Microphone':
        'Mikrofon',
    'low':
        'niedrig',
    'high':
        'hoch',
    'max':
        'max',
    'filtered for %clr':
        'nach %clr gefiltert',
    'stack size':
        'Stapelgr\u00f6\u00dfe',
    'frames':
        'Rahmenz\u00e4hler',

    // operators:
    '%n mod %n':
        '%n modulo %n',
    'round %n':
        '%n gerundet',
    '%fun of %n':
        '%fun von %n',
    'pick random %n to %n':
        'Zufallszahl von %n bis %n',
    '%b and %b':
        '%b und %b',
    '%b or %b':
        '%b oder %b',
    'not %b':
        'nicht %b',
    'true':
        'wahr',
    'false':
        'falsch',
    'join %words':
        'verbinde %words',
    'split %s by %delim':
        'trenne %s nach %delim',
    'hello':
        'Hallo',
    'world':
        'Welt',
    'letter %idx of %s':
        'Zeichen %idx von %s',
    'length of %s':
        'L\u00e4nge von %s',
    'unicode of %s':
        'Unicode Wert von %s',
    'unicode %n as letter':
        'Unicode %n als Buchstabe',
    'is %s a %typ ?':
        'ist %s ein(e) %typ ?',
    'is %s identical to %s ?':
        'ist %s identisch mit %s ?',
    'JavaScript function ( %mult%s ) { %code }':
        'JavaScript Funktion ( %mult%s ) { %code }',
    'compile %repRing':
    	'kompiliere %repRing',

    'type of %s':
        'Typ von %s',

    // variables:
    'Make a variable':
        'Neue Variable',
    'Variable name':
        'Variablenname',
    'Script variable name':
        'Skriptvariablenname',
    'inherit %shd':
        'erbe %shd',
    'Delete a variable':
        'Variable l\u00f6schen',

    'set %var to %s':
        'setze %var auf %s',
    'change %var by %n':
        '\u00e4ndere %var um %n',
    'show variable %var':
        'zeige Variable %var',
    'hide variable %var':
        'verstecke Variable %var',
    'script variables %scriptVars':
        'Skriptvariablen %scriptVars',

    // lists:
    'list %exp':
        'Liste %exp',
    'numbers from %n to %n':
        'Zahlen von %n bis %n',
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
    'is %l empty?':
        'ist %l leer?',
    'map %repRing over %l':
        'wende %repRing an auf %l',
    'keep items such that %predRing from %l':
        'behalte Elemente, die %predRing aus %l',
    'combine with %repRing items of %l':
        'kombiniere mit %repRing die Elemente von %l',
    'for each %upvar in %l %cla':
        'für jedes %upvar von %l %cla',
    'item':
        'Element',
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
        'Projektanmerkungen...',
    'New':
        'Neu',
    'Open...':
        '\u00d6ffnen...',
    'Save':
        'Sichern',
    'Save to disk':
        'Abpeichern',
    'store this project\nin the downloads folder\n(in supporting browsers)':
        'dieses Projekt herunterladen\nund lokal speichern\n'
            + '(nicht von allen Browsern unters\u00fctzt)',
    'Save As...':
        'Sichern als...',
    'Import...':
        'Importieren...',
    'file menu import hint':
        'l\u00e4dt ein exportiertes Projekt,\neine Bibliothek mit '
            + 'Bl\u00f6cken,\n'
            + 'ein Kost\u00fcm oder einen Klang',
    'Export project as plain text...':
        'Projekt als normalen Text exportieren...',
    'Export project...':
        'Projekt exportieren...',
    'save project data as XML\nto your downloads folder':
        'Projekt als XML-Datei in den Download-\nOrdner des Browsers speichern',
    'show project data as XML\nin a new browser window':
        'zeigt das Projekt als XML\nin einem neuen Browserfenster an',
    'Export blocks...':
        'Bl\u00f6cke exportieren...',
    'show global custom block definitions as XML\nin a new browser window':
        'zeigt globale Benutzerblockdefinitionen\nals XML im Browser an',
    'Unused blocks...':
          'nicht verwendete Bl\u00f6cke...',
    'find unused global custom blocks\nand remove their definitions':
        'nicht verwendete Bl\u00f6cke finden\nund entfernen',
    'Remove unused blocks':
        'nicht verwendete Bl\u00f6cke entfernen',
    'there are currently no unused\nglobal custom blocks in this project':
        'momentan keine nicht verwendeten\nBl\u00f6cke in diesem Projekt',
    'unused block(s) removed':
        'nicht verwendete Bl\u00f6cke entfernt',
    'Export summary...':
        'Zusammenfassung exportieren...',
    'open a new browser browser window\n with a summary of this project':
        'eine Zusammenfassung dieses Projekts\nin einem neuen Browserfenster'
            + 'anzeigen',
    'Contents':
        'Inhalt',
    'Kind of':
        'Eine Art',
    'Part of':
        'Ein Teil von',
    'Parts':
        'Teile',
    'Blocks':
        'Bausteine',
    'For all Sprites':
        'Allen gemeinsam',
    'Libraries...':
        'Module...',
    'Select categories of additional blocks to add to this project.':
        'Zusätzliche Auswahl thematisch gruppierter\nBlöcke zu diesem Projekt hinzufügen',
    'Select a costume from the media library':
        'Kostüm aus der Medienbibliothek auswählen',
    'Select a sound from the media library':
        'Klang aus der Medienbibliothek auswählen',

    //Libraries
    'Import library':
        'Modul laden',
    'Loading':
        'Lädt',
    'Imported':
        'Importiert',
    'Iteration, composition':
        'Iteration, Komposition',
    'List utilities':
        'Listen bearbeiten',
    'Variadic reporters':
        'Variadische Funktionen',
    'Web services access (https)':
        'Zugriff auf Webservices',
    'Multi-branched conditional (switch)':
        'Mehrfach verzweigte Conditionals (Switch)',
    'LEAP Motion controller':
        'LEAP Motion Controller',
    'Words, sentences':
        'Wörter, Sätze',
    'Catch errors in a script':
        'Fehlerhandhabung im Skript',
    'Set RGB or HSV pen color':
        'Stiftfarbe auf RGB oder HSV Werte setzen',
    'Text to speech':
        'Sprachausgabe',
    'Provide 100 selected colors':
        '100 ausgewählte Farben',
    'Infinite precision integers, exact rationals, complex':
        'Beliebig präzise Ganzzahlen, exakte rationale Zahlen, komplexe Zahlen',
    'Provide getters and setters for all GUI-controlled global settings':
        'GUI Elemente programmatisch bearbeiten',
    'Allow multi-line text input to a block':
        'Mehrzeiliger Text als Eingabe für Blöcke',
    'create variables in program':
        'Variablen im Skript erstellen',

    // cloud menu
    'Login...':
        'Anmelden...',
    'Signup...':
        'Benutzerkonto einrichten...',
    'Logout':
        'Abmelden',
    'Change Password...':
        'Passwort ändern...',
    'Reset Password...':
        'Passwort zurücksetzen...',
    'Resend Verification Email...':
        'Bestätigungsmail nochmal senden...',

    // settings menu
    'Language...':
        'Sprache...',
    'Zoom blocks...':
        'Bl\u00f6cke vergr\u00f6\u00dfern...',
    'Stage size...':
        'B\u00fchnengr\u00f6\u00dfe...',
    'Stage size':
        'B\u00fchnengr\u00f6\u00dfe',
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
    'check to turn on\n visible stepping (slow)':
        'einschalten um Programmausführung\nzu verfolgen (schrittweise)',
    'uncheck to turn off\nvisible stepping':
        'ausschalten um Programmausführung\nnicht mehr zu verfolgen',
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
    'Retina display support':
        'Retina Bildschirmauflösung',
    'uncheck for lower resolution,\nsaves computing resources':
        'ausschalten um eine niedrigere Auflösung zu erhalten\nund weniger Rechenleistung zu benötigen',
    'check for higher resolution,\nuses more computing resources':
        'einschalten um eine höhere Auflösung zu erhalten,\nbenötigt mehr Rechenleistung',
    'Codification support':
        'Kodifikation',
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
    'Flat design':
        'Helles Design',
    'check for alternative\nGUI design':
        'einschalten für alternative Nutzeroberfläche',
    'uncheck for default\nGUI design':
        'ausschalten für Standard-Nutzeroberfläche',
    'Nested auto-wrapping':
        'Automatisches Umklammern',
    'Keyboard Editing':
        'Tastaturunterstützung',
    'Table support':
        'Tabellenunterstützung',
    'Table lines':
        'Tabellen mit Linien',
    'Visible stepping':
        'Programmausführung verfolgen',
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
    'Ternary Boolean slots':
        'Ternäre Bool\'sche Inputs',
    'Inheritance support':
        'Prototypische Vererbung',

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
        'Hilfe',

    // palette:
    'find blocks':
        'Blöcke finden',
    'hide primitives':
        'Basisbl\u00f6cke ausblenden',
    'show primitives':
        'Basisbl\u00f6cke anzeigen',

    // blocks:
    'help...':
        'Hilfe...',
    'relabel...':
        'Umbenennen...',
    'duplicate':
        'Duplizieren',
    'make a copy\nand pick it up':
        'eine Kopie aufnehmen',
    'only duplicate this block':
        'nur diesen Block duplizieren',
    'delete':
        'L\u00f6schen',
    'script pic...':
        'Skriptbild...',
    'open a new window\nwith a picture of this script':
        'ein neues Browserfenster mit einem\nBild dieses Skripts \u00f6ffnen',
    'ringify':
        'Umringen',
    'unringify':
        'Entringen',
    'transient':
        'nicht persistent',
    'uncheck to save contents\nin the project':
        'ausschalten, um den Inhalt\nim Projekt zu speichern',
    'check to prevent contents\nfrom being saved':
        'einschalten, um das Speichern des Inhalts\nim Projekt zu verhindern',
    'new line':
        'neue Zeile',

    // custom blocks:
    'delete block definition...':
        'Blockdefinition l\u00f6schen...',
    'duplicate block definition...':
        'Blockdefinition duplizieren...',
    'edit...':
        'Bearbeiten...',

    // sprites:
    'edit':
        'Bearbeiten',
    'clone':
        'Klonen',
    'move':
        'Verschieben',
    'pivot':
        'Angelpunkt',
    'edit the costume\'s\nrotation center':
        'Drehpunkt des Kostüms\nanzeigen und verschieben',
    'rotate':
    	'Drehen',
    'stick to':
        'Befestigen an',
    'detach from':
        'Abtrennen von',
    'detach all parts':
        'Alle Teile abtrennen',
    'export...':
        'Exportieren...',
    'parent...':
        'Vorfahr...',
    'current parent':
        'aktueller Vorfahr',
    'release':
        'Entlassen',
    'make temporary and\nhide in the sprite corral':
        'temporär machen\nund Icon verstecken',

    // stage:
    'show all':
        'Alles zeigen',
    'pic...':
        'Bild exportieren...',
    'open a new window\nwith a picture of the stage':
        'ein neues Browserfenster mit einem\nBild der B\u00fchne \u00f6ffnen',
    'turn all pen trails and stamps\ninto a new background for the stage':
        'Hintergrund aus allen Malspuren und\nStempelabdrücken auf der Bühne erstellen',
    'turn all pen trails and stamps\ninto a new costume for the\ncurrently selected sprite':
        'aus allen Malspuren und Stempelabdrücken ein\nKostüm für die momentan ausgewählte Figur erstellen',

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
    'redrop':
        'Wiederherstellen',
    'use the keyboard\nto enter blocks':
    	'Blöcke per Tastatur\neingeben',
    'scripts pic...':
        'Bild aller Skripte...',
    'open a new window\nwith a picture of all scripts':
        'ein neues Browserfenster mit einem\nBild aller Skripte \u00f6ffnen',
    'make a block...':
        'Neuen Block bauen...',

    // costumes
    'rename':
        'Umbenennen',
    'export':
        'Exportieren',
    'rename costume':
        'Kost\u00fcm umbenennen',

    // sounds
    'Play sound':
        'Klang\nabspielen',
    'Stop sound':
        'Klang\nanhalten',
    'Stop':
        'Halt',
    'Play':
        'Los',
    'rename sound':
        'Klang umbenennen',

    // lists and tables
    'list view...':
        'Listenansicht...',
    'table view...':
        'tabellarische Ansicht...',
    'Table view':
        'Tabelle',
    'open in dialog...':
        'in neuem Fenster \u00f6ffnen',
    'reset columns':
        'Spaltenbreiten zur\u00fccksetzen',
    'items':
        'Elemente',

    // dialogs
    // buttons
    'OK':
        'OK',
    'Ok':
        'OK',
    'Cancel':
        'Abbrechen',
    'Yes':
        'Ja',
    'No':
        'Nein',

    // help
    'Help':
        'Hilfe',

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
        'Projekt \u00f6ffnen',
    'Open':
        '\u00d6ffnen',
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
    'Examples':
        'Beispiele',
    'Share':
        'Teilen',
    'Unshare':
        'Nicht mehr teilen',
    'Publish':
        'Veröffentlichen',
    'Unpublish':
        'Nicht mehr veröffentlichen',
    'Updating\nproject list...':
        'Projektliste laden',
    'Recover':
        'Wiederherstellen',
    'Today':
        'Heute',
    'Yesterday':
        'Gestern',

    // costume editor
    'Costume Editor':
        'Kost\u00fcmeditor',
    'Paint Editor':
        'Kostümeditor',
    'click or drag crosshairs to move the rotation center':
        'Fadenkreuz anklicken oder bewegen um den Drehpunkt zu setzen',
    'undo':
        'rückgängig',
    'Vector':
        'Vektor',
    'Paintbrush tool\n(free draw)':
        'Pinsel\n(freies Zeichnen)',
    'Stroked Rectangle\n(shift: square)':
        'Rechteck\n(Shift: Quadrat)',
    'Stroked Ellipse\n(shift: circle)':
        'Ellipse\n(Shift: Kreis)',
    'Eraser tool':
        'Radiergummi',
    'Set the rotation center':
        'Drehpunkt setzen',
    'Line tool\n(shift: vertical/horizontal)':
        'Linie\n(Shift: vertikal/horizontal)',
    'Filled Rectangle\n(shift: square)':
        'gefülltes Rechteck\n(Shift: Quadrat)',
    'Filled Ellipse\n(shift: circle)':
        'gefüllte Ellipse\n(Shift: Kreis)',
    'Fill a region':
        'fülle einen Bereich mit\nder gewählten Farbe',
    'Pipette tool\n(pick a color anywhere)':
        'Pipette (klicke irgendwo auf die gewünschte\nFarbe, um sie aufzunehmen)',
    'Brush size':
        'Pinselstärke',
    'Constrain proportions of shapes?\n(you can also hold shift)':
        'Proportionen festlegen\n(auch über Shift-Taste)',
    //'grow':
    //    'größer',
    //'shrink':
    //    'kleiner',
    //'flip ↔':
    //    'drehen ↔',
    //'flip ↕':
    //    'drehen ↕',
    
    'Vector Paint Editor':
        'Vektor-Editor',
    'Rectangle\n(shift: square)':
        'Rechteck\n(Shift: Quadrat)',
    'Ellipse\n(shift: circle)':
        'Ellipse\n(Shift: Kreis)',
    'Selection tool':
        'Auswählen',
    'Line tool\n(shift: constrain to 45º)':
        'Linie\n(Shift: Vielfache von 45°)',
    'Closed brush\n(free draw)':
        'geschlossene, gefüllte Form\n(freies Zeichnen)',
    'Paint a shape\n(shift: secondary color)':
        'fülle einen Bereich mit der gewählten Farbe\n(Shift: Sekundärfarbe)',
    'Pipette tool\n(pick a color from anywhere\nshift: secondary color)':
        'Pipette\nklicke irgendwo auf die gewünschte Farbe\n um sie aufzunehmen (Shift: Sekundärfarbe)',
    'Edge color\n(left click)':
        'Randfarbe\n(Linksklick)',
    'Fill color\n(right click)':
        'Füllfarbe\n(Rechtsklick)',
   // 'Top':
   //     'oben',
   // 'Bottom':
   //     'unten',
   // 'Up':
   //     'nach oben',
   // 'Down':
   //     'nach unten',


    // project notes
    'Project Notes':
        'Projektanmerkungen',

    // new project
    'New Project':
        'Neues Projekt',
    'Replace the current project with a new one?':
        'Das aktuelle Projekt durch ein neues ersetzen?',

    // save project
    'Save Project As...':
        'Projekt Sichern Als...',
    'Save Project':
        'Projekt sichern',

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

    // variables refactoring
    'rename only\nthis reporter':
        'nur diesen Block\numbenennen',
    'rename all...':
        'alle umbenennen...',
    'rename all blocks that\naccess this variable':
        'alle Blöcke umbenennen,\ndie diese Variable referenzieren',


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
    'Method Editor':
        'Methodeneditor',
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

    // comments
    'add comment here...':
        'Anmerkung hier hinzuf\u00fcgen',
    'comment pic...':
        'Kommentarbild',
    'open a new window\nwith a picture of this comment':
        'neues Fenster mit dem Bild\ndieses Kommentars öffnen',

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
    'random':
    	'zufällig',
     'random position':
     	'zufällige Position',

    // collision detection
    'mouse-pointer':
        'Mauszeiger',
    'edge':
        'Kante',
    'pen trails':
        'Malspuren',
    'center':
        'Mitte',

    // costumes
    'Turtle':
        'Richtungszeiger',
    'Empty':
        'Leer',
    'Paint a new costume':
        'neues Kostüm zeichnen',
    'Import a new costume from your webcam':
        'neues Kostüm mit der Webcam aufnehmen',
    'Please make sure your web browser is up to date\nand your camera is properly configured. \n\nSome browsers also require you to access Snap!\nthrough HTTPS to use the camera.\n\nPlase replace the "http://" part of the address\nin your browser by "https://" and try again.':
        'Überprüfe, ob der Browser auf dem aktuellsten Stand \nund die Webcam korrekt konfiguriert ist.\n\nFür einige Browser muss Snap! mit HTTPS geöffnet\nwerden, um auf die Kamera zuzugreifen.\n\nErsetze dafür den "http://"-Teil in der Adresszeile mit"https://"',
    'Camera':
        'Kamera',
    
    // sounds
    'Record a new sound':
        'neuen Klang aufnehmen',
    

    // graphical effects, pen color
    'color':
        'Farbe',
    'hue':
        'Farbton',
    'fisheye':
        'Fischauge',
    'whirl':
        'Wirbel',
    'pixelate':
        'Pixel',
    'mosaic':
        'Mosaik',
    'saturation':
        'Sättigung',
    'brightness':
        'Helligeit',
    'transparency':
        'Transparenz',
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
    'any key':
        'beliebige Taste',
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
    'ceiling':
        'Aufgerundet',
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

    // Boolean expressions keyboard entry
    'not':
        'nicht',

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
    'sprite':
        'Objekt',

    // list indices
    'last':
        'letztes',
    'any':
        'beliebig',

    // attributes
    'my':
        'Attribut',
    'neighbors':
        'Nachbarn',
    'self':
        'selbst',
    'other sprites':
        'andere Objekte',
    'parts':
        'Teile',
    'anchor':
        'Verankerung',
    'parent':
        'Vorfahr',
    'children':
        'Abkömmlinge',
    'clones':
        'Klone',
    'other clones':
        'andere Klone',
    'dangling?':
        'Baumeln?',
    'draggable?':
        'greifbar?',
    'rotation style':
        'Drehtyp',
    'rotation x':
        'Drehpunkt x',
    'rotation y':
        'Drehpunkt y',
    'center x':
        'Mittelpunkt x',
    'center y':
        'Mittelpunkt y',
    'name':
        'Name',
    'stage':
        'B\u00fchne',
    'costumes':
        'Kostüme',
    'sounds':
        'Klänge',
    'scripts':
        'Skripte',
    'width':
        'Breite',
    'height':
        'Höhe',

    // inheritance
    'inherited':
        'geerbt',
    'check to inherit\nfrom':
        'einschalten, um zu erben\nvon',
    'uncheck to\ndisinherit':
        'ausschalten, um \nnicht mehr zu erben'
};
