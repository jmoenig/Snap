/*

    lang-hi.js

    Hindi translation for SNAP!

    written by Barthdry (Barath Kumar)

    Copyright (C) 2021 by Jens Mönig

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

SnapTranslator.dict.hi = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)
	अ, आ      \u0905, \u0906
	According to the \uXXXX
	\u09 Assigned for Hindi
*/

    // translations meta information
    'language_name':
        'हिंदी', // the name as it should appear in the language menu
    'language_translator':
        'Barthdry', // your name for the Translators tab
    'translator_e-mail':
        'barathkumarbasker2007@gmail.com', // optional
    'last_changed':
        '2021-05-08', // this, too, will appear in the Translators tab

    // GUI
    // control bar:
    'untitled':
        'शीर्षकहीन',
    'development mode':
        'विकास मोड',

    // categories:
    'Motion':
        'प्रस्ताव',
    'Looks':
        'नज़र',
    'Sound':
        'आवाज़',
    'Pen':
        'कलम',
    'Control':
        'नियंत्रण',
    'Sensing':
        'संवेदन',
    'Operators':
        'ऑपरेटर',
    'Variables':
        'चर',
    'Lists':
        'सूची',
    'Other':
        'अन्य',

    // editor:
    'draggable':
        'खींचने योग्य',

    // tabs:
    'Scripts':
        'स्क्रिप्ट',
    'Costumes':
        'पोशाक',
    'Backgrounds':
        'पृष्ठभूमि',
    'Sounds':
        'आवाज़',

    // names:
    'Sprite':
        'स्प्राइट',
    'Stage':
        'मंच',

    // rotation styles:
    'don\'t rotate':
        'घुमाएँ नहीं',
    'can rotate':
        'घुमा सकते हैं',
    'only face left/right':
        'केवल बाएं / दाएं चेहरा',

    // new sprite button:
    'add a new sprite':
        'एक नया स्प्राइट जोड़ें',
    'add a new Turtle sprite':
        'एक नया दिशा सूचक स्प्राइट जोड़ें',
    'paint a new sprite':
        'एक नया स्प्राइट पेंट करें',
    'take a camera snapshot and\nimport it as a new sprite':
        'एक कैमरा स्नैपशॉट लें और इसे एक नए स्प्राइट के रूप में आयात करें',
    

    // tab help
    'costumes tab help': //Import a picture from another web page or from your computer by dropping it here.
        'किसी अन्य वेब पेज से या अपने कंप्यूटर\n'
            + 'से चित्र को यहां ड्रॉप करके आयात करें',
    'import a sound from your computer\nby dragging it into here':
        'इसे यहां खींचकर अपने\n कंप्यूटर से ध्वनि आयात करें',

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
        'चरण चयनित: \nकोई गति आदिम नहीं',

    'move %n steps':
        '%n कदम चलें',
    'turn %clockwise %n degrees':
        '%clockwise %n डिग्री बारी',
    'turn %counterclockwise %n degrees':
        '%counterclockwise %n डिग्री बारी',
    'point in direction %dir':
        '%dir दिशा में इंगित करें',
    'point towards %dst':
        '%dst की ओर इशारा',
    'go to x: %n y: %n':
        'जाओ x: %n y: %n',
    'go to %dst':
        '%dst जाओ',
    'glide %n secs to x: %n y: %n':
        'फिसलन %n सेकंड. to x: %n y: %n',
    'change x by %n':
        'परिवर्तन x बदल दो %n',
    'set x to %n':
        'सेट x से %n',
    'change y by %n':
        'परिवर्तन y बदल दो %n',
    'set y to %n':
        'सेट y से %n',
    'if on edge, bounce':
        'अगर किनारे पर है तो उछाल',
    'x position':
        'x स्थिति',
    'y position':
        'y स्थिति',
    'direction':
        'दिशा',

    // looks:
    'switch to costume %cst':
        '%cst कॉस्ट्यूम पर स्विच करें',
    'next costume':
        'अगली पोशाक',
    'costume #':
        'पोशाक #',
    'say %s for %n secs':
        'कहो %s तक %n सेकंड',
    'say %s':
        'कहो %s',
    'think %s for %n secs':
        'सोचो %s तक %n सेकंड',
    'think %s':
        'सोचो %s',
    'Hello!':
        'नमस्ते!',
    'Hmm...':
        'हम्म....',
    '%img of costume %cst':
        '%img की पोशाक %cst',
    'new costume %l width %dim height %dim':
        'नई पोशाक %l चौड़ाई %dim ऊंचाई %dim',
    'stretch %cst x: %n y: %n %':
        'खिंचाव %cst x: %n y: %n %',
    'change %eff effect by %n':
        'परिवर्तन %eff द्वारा प्रभाव %n',
    'set %eff effect to %n':
        'सेट %eff -Effekt auf %n',
    'clear graphic effects':
        'स्पष्ट ग्राफिक प्रभाव',
    '%eff effect':
        '%eff प्रभाव',
    'change size by %n':
        'द्वारा आकार बदलें %n',
    'set size to %n %':
        'आकार निर्धारित करें %n %',
    'size':
        'आकार',
    'show':
        'प्रदर्शन',
    'hide':
        'छिपाना',
    'shown?':
        'दिखाया?',
    'go to %layer layer':
        'जाओ %layer परत',
    'front':
        'सामने',
    'back':
        'पीछे',
    'go back %n layers':
        'पीछे जाओ %n परतों',

    'development mode \ndebugging primitives:':
        'development mode \ndebugging primitives:',
    'console log %mult%s':
        'console.log %mult%s',
    'alert %mult%s':
        'window.alert %mult%s',

    'pixels':
        'पिक्सल',
    'current':
        'वर्तमान',

    // sound:
    'play sound %snd':
        'आवाज़ बजाना %snd',
    'play sound %snd until done':
        'आवाज़ बजाना %snd जब तक किया गया',
    'stop all sounds':
        'सभी आवाज़ बंद करो',
    'rest for %n beats':
        'विश्राम करना %n बीट्स',
    'play sound %snd at %rate Hz':
        'आवाज़ बजाना %snd पर %rate हेटर्स',
    '%aa of sound %snd':
        '%aa की आवाज़ %snd',
    'duration':
        'समयांतराल',
    'length':
        'लंबाई',
    'number of channels':
        'चैनलों की संख्या',
    'new sound %l rate %rate Hz':
        'नया आवाज़ %l मूल्यांकन %rate हेटर्स',
    'play note %note for %n beats':
        'संगीत नोट चलाएं %note तक %n बीट्स',
    'set instrument to %inst':
        'करने के लिए उपकरण सेट करें %inst',
    'change tempo by %n':
        'द्वारा गति बदलें %n बी पी एम',
    'set tempo to %n bpm':
        'के लिए टेम्पो सेट करें %n बी पी एम',
    'tempo':
        'टेम्पो',
    'change volume by %n':
        'द्वारा मात्रा बदलें %n',
    'set volume to %n %':
        'की मात्रा निर्धारित करें %n %',
    'change balance by %n':
        'द्वारा संतुलन में बदलाव %n',
    'set balance to %n':
        'के लिए संतुलन सेट करें %n',
    'balance':
        'संतुलन',
    'play frequency %n Hz':
        'संगीत प्ले आवृत्ति %n हेटर्स',
    'stop frequency':
        'रुकें आवृत्ति',
    'play %n Hz for %n secs':
        'सचलाएं %n हेटर्स for %n सेकंड',

    // "instruments", i.e. wave forms
    '(1) sine':
        '(1) सिने',
    '(2) square':
        '(2) स्क्वायर',
    '(3) sawtooth':
        '(3) आराघर का गिटार',
    '(4) triangle':
        '(4) त्रिकोण साधन',

    // pen:
    'clear':
        'सब कुछ मिटा दें',
    'pen down':
        'नीचे कलम',
    'pen up':
        'कलम ऊपर',
    'pen down?':
        'नीचे कलम?',
    'set pen color to %clr':
        'पेन रंग सेट करें %clr',
    'set background color to %clr':
        'पकरने के लिए पृष्ठभूमि रंग सेट %clr',
    'change pen %hsva by %n':
        'कलम बदल दो %hsva से %n',
    'change background %hsva by %n':
        'पृष्ठभूमि का रंग बदलें %hsva से %n',
    'set pen %hsva to %n':
        ' पेन सेट %hsva सेवा मेरे %n',
    'set background %hsva to %n':
        'पृष्ठभूमि सेट %hsva सेवा मेरे %n',
    'pen %pen':
        'कलम %pen',
    'change pen size by %n':
        'द्वारा लिंग का आकार बदलें %n',
    'set pen size to %n':
        'पेन का आकार निर्धारित करें %n',
    'stamp':
        'स्टाम्प',
    'fill':
        'भरण',
    'write %s size %n':
        'लिखना %s आकार %n',
    'paste on %spr':
        'पर पेस्ट करें %spr',
    'cut from %spr':
        'से काटो %spr',
    'pen vectors':
        'पेन वेक्टर',

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
    'send %msg to %spr':
        'sende %msg an %spr',
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
        'Wenn ich als Klon starte',
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
    'ray length':
        'Strahlenlänge',
    '%asp at %loc' :
        '%asp bei %loc',
    'r-g-b-a':
        'R-G-B-A Farbwerte',
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
    'object %self':
        'Objekt %self',
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
    'video %vid on %self':
        'Video %vid auf %self',
    'motion':
        'Bewegung',
    'snap':
        'Snap',
    'set video transparency to %n':
        'setze Videotransparenz auf %n',
    'video capture':
        'Videoaufnahme',
    'mirror video':
        'Video gespiegelt',
    'filtered for %clr':
        'nach %clr gefiltert',
    'stack size':
        'Stapelgr\u00f6\u00dfe',
    'frames':
        'Rahmenz\u00e4hler',
    'log pen vectors':
        'Vektoraufzeichnung',

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
        'L\u00e4nge von Text %s',
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
    '%la of %l':
        '%la von %l',
    'rank':
        'Rang',
    'dimensions':
        'Dimensionen',
    'flatten':
        'Auflistung',
    'columns':
        'Spalten',
    'reverse':
        'Umkehrung',
    'lines':
        'Textzeilen',
    '%l contains %s':
        '%l enth\u00e4lt %s',
    'thing':
        'etwas',
    'is %l empty?':
        'ist %l leer?',
    'index of %s in %l':
        'Index von %s in %l',
    'map %repRing over %l':
        'wende %repRing an auf %l',
    'keep items %predRing from %l':
        'behalte Elemente, die %predRing aus %l',
    'find first item %predRing in %l':
        'finde das erste Element, das %predRing in %l',
    'combine %l using %repRing':
        'kombiniere die Elemente von %l mit %repRing',
    '%blitz map %repRing over %l':
        '%blitz wende %repRing an auf %l',
    '%blitz keep items %predRing from %l':
        '%blitz behalte Elemente, die %predRing aus %l',
    '%blitz find first item %predRing in %l':
        '%blitz finde das erste Element, das %predRing in %l',
    '%blitz combine %l using %repRing':
        '%blitz kombiniere die Elemente von %l mit %repRing',
    'for each %upvar in %l %cla':
        'für jedes %upvar von %l %cla',
    'item':
        'Element',
    'value':
        'Wert',
    'index':
        'Index',
    'append %lists':
        'verbinde %lists',
    'reshape %l to %nums':
        'strukturiere %l in %nums',
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
    'save global custom block\ndefinitions as XML':
        'globale Benutzerblockdefinitionen\nals XML-Datei speichern',
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
    'save a summary\nof this project':
        'eine Zusammenfassung\ndieses Projekts speichern',
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
    'Undelete sprites...':
        'Objekte wiederherstellen...',
    'Bring back deleted sprites':
        'Gelöschte Objekte zurückholen',
    'trash is empty':
        'der Mülleimer ist leer',

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
    'Create variables in program':
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
    'Open in Community Site':
        'Projektseite anzeigen',

    // settings menu
    'Language...':
        'Sprache...',
    'Zoom blocks...':
        'Bl\u00f6cke vergr\u00f6\u00dfern...',
    'Fade blocks...':
        'Bl\u00f6cke ausblenden...',
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
    'Hyper blocks support':
        'Hyper-Blöcke',
    'uncheck to disable\nusing operators on lists and tables':
         'erweiterte Anwendung von Operatoren\nauf Listen und Tabellen',
    'check to enable\nusing operators on lists and tables':
         'erweiterte Anwendung von Operatoren\nauf Listen und Tabellen',
    'Log pen vectors':
        'Malstiftvektoren aufzeichnen',
    'uncheck to turn off\nlogging pen vectors':
        'ausschalten, um Malstiftbewegungen\nnicht mehr aufzuzeichnen',
    'check to turn on\nlogging pen vectors':
        'einschalten, um Malstiftbewegungen\nals Vektor aufzuzeichnen',


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
    'compile':
        'Kompilieren',
    'uncompile':
        'Entkompilieren',
    'duplicate':
        'Duplizieren',
    'make a copy\nand pick it up':
        'eine Kopie aufnehmen',
    'only duplicate this block':
        'nur diesen Block duplizieren',
    'extract':
        'herausziehen',
    'only grab this block':
        'nur diesen Block bewegen',
    'delete':
        'L\u00f6schen',
    'senders...':
        'Sender...',
    'receivers...':
        'Empfänger...',
    'script pic...':
        'Skriptbild...',
    'save a picture\nof this script':
        'ein Bild dieses\nSkripts speichern',
    'result pic...':
        'Ergebnisbild...',
    'save a picture of both\nthis script and its result':
        'ein Bild dieses Skripts mit\nseinem Ergebnis speichern',
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
    'export block definition...':
        'Blockdefinition exportieren...',
    'including dependencies':
        'mit allen verwendeten Blöcken',
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
    'save a picture\nof the stage':
        'ein Bild der\nBühne speichern',
    'svg...':
        'SVG exportieren...',
    'export pen trails\nline segments as SVG':
        'Striche in Malspuren als\nVektorgraphik exportieren',
    'there are currently no\nvectorizable pen trail segments':
        'momentan gibt es keine\nvektorisierbaren Malspuren',
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
    'save a picture\nof all scripts':
        'ein Bild aller\nSkripte speichern',
    'make a block...':
        'Neuen Block bauen...',

    // costumes
    'rename':
        'Umbenennen',
    'export':
        'Exportieren',
    'rename costume':
        'Kost\u00fcm umbenennen',
    'rename background':
        'Hintergrund umbenennen',

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
    'blockify':
        'als Block',
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

    // fade blocks
    'Fade blocks':
        'Bl\u00f6cke ausblenden',
    'block-solid (0)':
        'normal (0)',
    'medium (50)':
        'mittel (50)',
    'light (70)':
        'leicht (70)',
    'shimmering (80)':
        'schimmernd (80)',
    'elegant (90)':
        'elegant (90)',
    'subtle (95)':
        'angedeutet (95)',
    'text-only (100)':
        'nur Text (100)',

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
    'Unsaved Changes!':
        'Ungespeicherte Änderungen!',
    'Replace the current project with a new one?':
        'Das aktuelle Projekt durch ein neues ersetzen?',
    'Backup failed.\nThis cannot be undone, proceed anyway?':
        'Backup nicht möglich.\nTrotzdem fortfahren?',

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
        'स्नैप के बारे में',
    'Back...':
        'वापस....',
    'License...':
        'लाइसेंस....',
    'Modules...':
        'मॉड्यूल....',
    'Credits...':
        'क्रेडिट....',
    'Translators...':
        'अनुवादकों',
    'License':
        'लाइसेंस',
    'current module versions:':
        'Komponenten-Versionen',
    'Contributors':
        'योगदानवाला',
    'Translations':
        'अनुवाद',

    // variable watchers
    'normal':
        'साधारण',
    'large':
        'big',
    'slider':
        'स्लाइडर',
    'slider min...':
        'स्लाइडर न्यूनतम',
    'slider max...':
        'स्लाइडर अधिकतम',
    'import...':
        'आयात....',
    'raw data...':
        'कच्चा डेटा....',
    'import without attempting to\nparse or format data':
        'डेटा स्वरूपित करने के\n प्रयास के बिना आयात',
    'Slider minimum value':
        'स्लाइडर न्यूनतम मूल्य',
    'Slider maximum value':
        'स्लाइडर अधिकतम मूल्य',

    // list watchers
    'length: ':
        'लंबाई: ',

    // comments
    'add comment here...':
        'टिप्पणी यहाँ जोड़ें....',
    'comment pic...':
        'टिप्पणी की तस्वीर....',
    'save a picture\nof this comment':
        'इस टिप्पणी की\n एक तस्वीर को बचाओ',

    // drow downs
    // directions
    '(90) right':
        '(90) दाईं',
    '(-90) left':
        '(-90) बाएं',
    '(0) up':
        '(0) ऊपर',
    '(180) down':
        '(180) नीचे',
    'random':
    	'यादृच्छिक',
     'random position':
     	'यादृच्छिक स्थान',

    // collision detection
    'mouse-pointer':
        'माऊस पाइंटर',
    'edge':
        'एज',
    'pen trails':
        'कलम का निशान',
    'center':
        'मध्य',

    // costumes
    'Turtle':
        'दिशा सूचक',
    'Empty':
        'खाली',
    'Paint a new costume':
        'एक नई पोशाक पेंट करें',
    'Import a new costume from your webcam':
        'अपने वेबकैम से एक नई पोशाक आयात करें',
    'Please make sure your web browser is up to date\nand your camera is properly configured. \n\nSome browsers also require you to access Snap!\nthrough HTTPS to use the camera.\n\nPlase replace the "http://" part of the address\nin your browser by "https://" and try again.':
        'Please make sure your web browser is up to date\nand your camera is properly configured. \n\nSome browsers also require you to access Snap!\nthrough HTTPS to use the camera.\n\nPlase replace the "http://" part of the address\nin your browser by "https://" and try again.',
    'Camera':
        'कैमरा',
    
    // sounds
    'Record a new sound':
        'एक नई ध्वनि रिकॉर्ड करें',
    

    // graphical effects, pen color
    'color':
        'रंग',
    'hue':
        ' विविध रंग',
    'fisheye':
        'मछली की आँख',
    'whirl':
        'चक्कर',
    'pixelate':
        'पिक्सेलेट',
    'mosaic':
        'मौज़ेक',
    'saturation':
        'परिपूर्णता',
    'brightness':
        'चमक',
    'transparency':
        'पारदर्शिता',
    'ghost':
        'भूत',
    'negative':
        'नकारात्मक',
    'comic':
        'हास्य',
    'confetti':
        'कंफ़ेद्दी',

    // keys
    'space':
        'स्पेस बार',
    'up arrow':
        'ऊपर ऐरो कुंजी',
    'down arrow':
        'नीचे ऐरो कुंजी',
    'right arrow':
        'दाईं ऐरो कुंजी',
    'left arrow':
        'बाईं ऐरो कुंजी',
    'any key':
        'कोई भी कुंजी',
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
        'नया....',
    '__shout__go__':
        '__shout__go__',

    // math functions (I made to Full Form for Understanding)
    'abs':
        'absolute',
    'ceiling':
        'ceiling',
    'floor':
        'floor',
    'sqrt':
        'वर्गमूल',
    'sin':
        'sine',
    'cos':
        'cosine',
    'tan':
        'tangent',
    'asin':
        'asine',
    'acos':
        'acosine',
    'atan':
        'atangent',
    'ln':
        'ln',
    'e^':
        'e^',

    // Boolean expressions keyboard entry
    'not':
        'नहीं',

    // delimiters
    'letter':
        'वर्ण',
    'word':
        'शब्द',
    'whitespace':
        'खाली स्थान के',
    'line':
        'लाइन',
    'tab':
        'टैबुलाटर',
    'cr':
        'cr',

    // data types
    'number':
        'संख्या',
    'text':
        'टेक्स्ट',
    'Boolean':
        'बूलियन',
    'list':
        'सूची',
    'command':
        'आदेश',
    'reporter':
        'रिपोर्टर',
    'predicate':
        'विधेय',
    'sprite':
        'स्प्राइट',

    // list indices
    'last':
        'पिछले',
    'any':
        'कोई भी',

    // attributes
    'my':
        'मेरे',
    'neighbors':
        'पड़ोसी',
    'self':
        'स्वयं',
    'other sprites':
        'अन्य स्प्राइट्स',
    'parts':
        'पार्ट्स',
    'anchor':
        'ऐंकर',
    'parent':
        'माता-पिता',
    'temporary?':
        'अस्थायी?',
    'children':
        'बच्चे',
    'clones':
        'क्लोन',
    'other clones':
        'अन्य क्लोन',
    'dangling?':
        'झूलने?',
    'draggable?':
        'खींचने योग्य?',
    'rotation style':
        'रोटेशन अंदाज',
    'rotation x':
        'रोटेशन x',
    'rotation y':
        'रोटेशन y',
    'center x':
        'केन्द्र x',
    'center y':
        'केन्द्र y',
    'name':
        'नाम',
    'costume':
        'पोशाक',
    'stage':
        'मंच',
    'costumes':
        'पोशाक',
    'sounds':
        'आवाज़',
    'scripts':
        'स्क्रिप्ट',
    'width':
        'चौड़ाई',
    'height':
        'ऊंचाई',
    'left':
        'बाएं',
    'right':
        'दाईं',
    'top':
        'ऊपर',
    'bottom':
        'तल',

    // attributes in the SET block's dropdown
    'my anchor':
        'मेरे लंगर',
    'my parent':
        'मेरे माता पिता',
    'my name':
        'मेरा नाम',
    'my temporary?':
        'मेरा अस्थायी?',
    'my dangling?':
        'मेरी झूलने?',
    'my draggable?':
        'मेरी खींचने योग्य?',
    'my rotation style':
        'मेरी रोटेशन शैली',
    'my rotation x':
        'मेरा रोटेशन x',
    'my rotation y':
        'मेरा रोटेशन y',

    // inheritance
    'inherited':
        'विरासत में मिला',
    'check to inherit\nfrom':
        'विरासत की जाँच करें\nसे',
    'uncheck to\ndisinherit':
        'डिस्चार्ज करने से\nअनचेक करें'
};
