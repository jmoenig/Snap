/*

    lang-de.js

    German translation for SNAP!

    written by Jens Mönig

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

SnapTranslator.dict.pl = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)
	Ą, ą	\u0104,	\u0105
	Ć, ć	\u0106,	\u0107
	Ę, ę	\u0118,	\u0119
	Ł, ł	\u0141, \u0142
	Ń, ń	\u0143, \u0144\u0105
	Ś, ś	\u015A, \u015B
	Ó, ó	\u00D3, \u00F3
	Ź, ź	\u0179,	\u017A
	Ż, ż	\u017B, \u017C
*/

    // translations meta information
    'language_name':
        'Polski', // the name as it should appear in the language menu
    'language_translator':
        'Witek Kranas & deKrain & Andrzej Batorski', // your name for the Translators tab
    'translator_e-mail':
        'witek@oeiizk.waw.pl', // optional
    'last_changed':
        '2021-05-15', // this, too, will appear in the Translators tab

    // GUI
    // control bar:
    'untitled':
        'bez nazwy',
    'development mode':
        'tryb budowania',

    // categories:
    'Motion':
        'Ruch',
    'Looks':
        'Wygl\u0105d',
    'Sound':
        'D\u017Awi\u0119k',
    'Pen':
        'Pisak',
    'Control':
        'Kontrola',
    'Sensing':
        'Czujniki',
    'Operators':
        'Wyra\u017Cenia',
    'Variables':
        'Dane',
    'Lists':
        'Listy',
    'Other':
        'Inne',

    // editor:
    'draggable':
        'przeci\u0105ganie',

    // tabs:
    'Scripts':
        'Skrypty',
    'Costumes':
        'Kostiumy',
    'Backgrounds':
        'T\u0142a',
	'Sounds':
        'D\u017Awi\u0119ki',

    // names:
    'Sprite':
        'Duszek',
    'Stage':
        'Scena',

    // rotation styles:
    'don\'t rotate':
        'nie obracaj',
    'can rotate':
        'dowolny obr\u00F3t',
    'only face left/right':
        'tylko lewo/prawo',

    // new sprite button:
    'add a new sprite':
        'dodaj nowego duszka',
    'add a new Turtle sprite':
        'dodaj nowego duszka-\u017C\u00F3\u0142wia',
    'paint a new sprite':
        'namaluj nowego duszka',
    'take a camera snapshot and\nimport it as a new sprite':
        'nowy duszek z kamery',
    

    // tab help
    'costumes tab help':
        'Importuj obrazy z innej strony\n'
            + 'lub z komputera przeci\u0105gaj\u0105c tu',
    'import a sound from your computer\nby dragging it into here':
        'Importuj d\u017Awi\u0119k z komputera\nprzeci\u0105gaj\u0105c tu',

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
        'Wybrana scena:\nnie ma blok\u00F3w ruchu',

    'move %n steps':
        'przesu\u0144 o %n krok\u00F3w',
    'turn %clockwise %n degrees':
        'obr\u00F3\u0107 %clockwise o %n stopni',
    'turn %counterclockwise %n degrees':
        'obr\u00F3\u0107 %counterclockwise o %n stopni',
    'point in direction %dir':
        'ustaw kierunek na %dir',
    'point towards %dst':
        'ustaw w stron\u0119 %dst',
    'go to x: %n y: %n':
        'id\u017A do x: %n y: %n',
    'go to %dst':
        'id\u017A do %dst',
    'glide %n secs to x: %n y: %n':
        'le\u0107 przez %n s do x: %n y: %n',
    'change x by %n':
        'zmie\u0144 x o %n',
    'set x to %n':
        'ustaw x na %n',
    'change y by %n':
        'zmie\u0144 y o %n',
    'set y to %n':
        'ustaw y na %n',
    'if on edge, bounce':
        'je\u017Celi na brzegu, odbij si\u0119',
    'x position':
        'pozycja X',
    'y position':
        'pozycja Y',
    'direction':
        'kierunek',

    // wyglad:
    'switch to costume %cst':
        'zmie\u0144 kostium na %cst',
    'next costume':
        'nast\u0119pny kostium',
    'costume #':
        'kostium nr ',
    'say %s for %n secs':
        'powiedz %s przez %n s',
    'say %s':
        'powiedz %s',
    'think %s for %n secs':
        'pomy\u015Bl %s przez %n s',
    'think %s':
        'pomy\u015Bl %s',
    'Hello!':
        'Cze\u015B\u0107!',
    'Hmm...':
        'Hmm...',
    '%img of costume %cst':
        '%img kostiumu %cst',
    'new costume %l width %dim height %dim':
        'nowy kostium %l szeroko\u015B\u0107 %dim wysoko\u015B\u0107 %dim',
    'stretch %cst x: %n y: %n %':
        'zmie\u0144 rozmiar %cst x: %n y: %n %',
    'change %eff effect by %n':
        'zmie\u0144 efekt %eff o %n',
    'set %eff effect to %n':
        'ustaw efekt %eff na %n',
    'clear graphic effects':
        'wyczy\u015B\u0107 efekty graficzne',
    '%eff effect':
        'efekt %eff',
    'change size by %n':
        'zmie\u0144 rozmiar o %n',
    'set size to %n %':
        'ustaw rozmiar na %n %',
    'size':
        'rozmiar',
    'show':
        'poka\u017C',
    'hide':
        'ukryj',
    'shown?':
        'pokazany?',
    'go to %layer layer':
        'id\u017A do %layer',
    'front':
        'na wierzchu',
    'back':
        'w g\u0142\u0119bi',
    'go back %n layers':
        'wr\u00F3\u0107 o %n poziom\u00F3w',

    'development mode \ndebugging primitives:':
        'tryb budowania \ndebugowanie procedur pierwotnych',
    'console log %mult%s':
        'log konsoli: %mult%s',
    'alert %mult%s':
        'alert: %mult%s',

    'pixels':
        'piksele',
    'current':
        'obecny',

    // dzwiek:
    'play sound %snd':
        'zagraj d\u017Awi\u0119k %snd',
    'play sound %snd until done':
        'zagraj d\u017Awi\u0119k %snd i czekaj',
    'stop all sounds':
        'zatrzymaj wszystkie d\u017Awi\u0119ki',
    'rest for %n beats':
        'pauzuj przez %n takt\u00F3w',
    'play sound %snd at %rate Hz':
        'zagraj d\u017Awi\u0119k %snd z %rate Hz',
    '%aa of sound %snd':
        '%aa d\u017Awi\u0119ku %snd',
    'duration':
        'czas trwania',
    'length':
        'd\u0142ugo\u015B\u0107',
    'number of channels':
        'liczba kana\u0142\u00F3w',
    'new sound %l rate %rate Hz':
        'nowy d\u017Awi\u0119k %l pr\u00F3bkowanie %rate Hz',
    'play note %note for %n beats':
        'zagraj nut\u0119 %note przez %n takt\u00F3w',
    'set instrument to %inst':
        'ustaw instrument (fal\u0119) na %inst',
	'change tempo by %n':
        'zmie\u0144 tempo o %n',
    'set tempo to %n bpm':
        'ustaw tempo na %n takt\u00F3w na min.',
    'tempo':
        'tempo',
    'change volume by %n':
        'zmie\u0144 g\u0142o\u015Bno\u015B\u0107 o %n',
    'set volume to %n %':
        'ustaw g\u0142o\u015Bno\u015B\u0107 na %n %',
    'change balance by %n':
        'zmie\u0144 balans o %n',
    'set balance to %n':
        'ustaw balans na %n',
    'balance':
        'balans',
    'play frequency %n Hz':
        'zagraj cz\u0119stotliwo\u015B\u0107 %n Hz',
    'stop frequency':
        'zatrzymaj cz\u0119stotliwo\u015B\u0107',
    'play %n Hz for %n secs':
        'zagraj %n Hz przez %n s.',

    // "instrumenty", i.e. wave forms
    '(1) sine':
        '(1) sinusoidalna',
    '(2) square':
        '(2) prostok\u0105tna',
    '(3) sawtooth':
        '(3) pi\u0142okszta\u0142tna',
    '(4) triangle':
        '(4) tr\u00F3jk\u0105tna',

	// pisak:
    'clear':
        'wyczy\u015B\u0107',
    'pen down':
        'przy\u0142\u00F3\u017C pisak',
    'pen up':
        'podnie\u015B pisak',
    'pen down?':
        'pisak przy\u0142o\u017Cony?',
    'set pen color to %clr':
        'ustaw kolor pisaka %clr',
    'set background color to %clr':
        'ustaw kolor t\u0142a %clr',
    'change pen %clrdim by %n':
        'zmie\u0144 pisak %clrdim o %n',
    'change background %clrdim by %n':
        'zmie\u0144 t\u0142o %clrdim o %n',
    'set pen %clrdim to %n':
        'ustaw pisak %clrdim na %n',
    'set background %clrdim to %n':
        'ustaw t\u0142o %clrdim na %n',
    'pen %pen':
        'pisak %pen',
    'change pen size by %n':
        'zmie\u0144 rozmiar pisaka o %n',
    'set pen size to %n':
        'ustaw rozmiar pisaka na %n',
    'stamp':
        'stempluj',
    'fill':
        'wype\u0142nij',
    'write %s size %n':
        'pisz %s rozmiar %n',
    'paste on %spr':
        'wklej na %spr',
    'cut from %spr':
        'wytnij z %spr',
    'pen vectors':
        'wektory pisaka',

    // control:
    'when %greenflag clicked':
        'kiedy klikni\u0119to %greenflag',
    'when %keyHat key pressed %keyName':
        'kiedy klawisz %keyHat naci\u015Bni\u0119ty %keyName',
    'when I am %interaction':
        'kiedy zostan\u0119 %interaction',
    'clicked':
        'klikni\u0119ty',
    'pressed':
        'naci\u015Bni\u0119ty',
    'dropped':
        'upuszczony',
    'mouse-entered':
        'najechany przez kursor myszy',
    'mouse-departed':
        'opuszczony przez kursor myszy',
    'scrolled-down':
    	'przewijany w d\u00F3\u0142',
    'scrolled-up':
        'przewijany w g\u00F3r\u0119',
    'stopped':
        'zatrzymany',
    'when %b':
        'kiedy %b',
    'when I receive %msgHat %message':
        'kiedy otrzymam %msgHat %message',
    'broadcast %msg %receive':
        'nadaj %msg %receive',
    'broadcast %msg %receive and wait':
        'nadaj %msg %receive i czekaj',
    'to':
        'do',
    'send %msg to %spr':
        'nadaj %msg do %spr',
    'Message name':
        'Nazwa wiadomo\u015Bci',
    'message':
        'wiadomo\u015B\u0107',
    'any message':
        'dowolna wiadomo\u015B\u0107',
    'wait %n secs':
        'czekaj %n s',
    'wait until %b':
        'czekaj a\u017C %b',
    'forever %loop':
        'zawsze %loop',
    'repeat %n %loop':
        'powt\u00F3rz %n razy %loop',
    'repeat until %b %loop':
        'powtarzaj a\u017C %b %loop',
    'for %upvar = %n to %n %cla':
        'dla %upvar = %n do %n %cla',
    'if %b %c':
        'je\u017Celi %b %c',
    'if %b %c else %c':
        'je\u017Celi %b %c w przeciwnym razie %c',
    'if %b then %s else %s':
        'je\u017Celi %b to %s w przeciwnym razie %s',
    'report %s':
        'wynik %s',
    'stop %stopChoices':
        'zatrzymaj %stopChoices',
    'all':
        'wszystkich',
    'this script':
        'ten skrypt',
    'this block':
        'ten blok',
    'stop %stopOthersChoices':
        'zatrzymaj %stopOthersChoices',
    'all but this script':
        'wszystko opr\u00F3cz tego skryptu',
    'other scripts in sprite':
        'inne skrypty tego duszka',
    'pause all %pause':
        'pauzuj wszystko %pause',
    'run %cmdRing %inputs':
        'uruchom %cmdRing z %inputs',
    'launch %cmdRing %inputs':
        'zacznij %cmdRing %inputs',
    'call %repRing %inputs':
        'wywo\u0142aj %repRing z %inputs',
    'run %cmdRing w/continuation':
        'uruchom %cmdRing z kontynuacj\u0105',
    'call %cmdRing w/continuation':
        'wywo\u0142aj %cmdRing z kontynuacj\u0105',
    'warp %c':
        'wykonaj b\u0142yskawicznie %c',
    'when I start as a clone':
        'kiedy zaczynam jako klon',
    'create a clone of %cln':
        'sklonuj %cln',
    'a new clone of %cln':
        'nowy klon %cln',
    'myself':
        'ja',
    'delete this clone':
        'usu\u0144 tego klona',
	'tell %spr to %cmdRing %inputs':
        'powiedz %spr do %cmdRing %inputs',
    'ask %spr for %repRing %inputs':
        'zapytaj %spr o %repRing %inputs',

    // sensing:
    'touching %col ?':
        'dotyka %col ?',
    'touching %clr ?':
        'dotyka koloru %clr ?',
    'color %clr is touching %clr ?':
        'czy kolor %clr dotyka %clr ?',
    'ask %s and wait':
        'zapytaj %s i czekaj',
    'what\'s your name?':
        'Jak masz na imi\u0119?',
    'answer':
        'odpowied\u017A',
    'mouse x':
        'x myszy',
    'mouse y':
        'y myszy',
    'mouse down?':
        'przycisk myszy naci\u015Bni\u0119ty?',
    'key %key pressed?':
        'klawisz %key naci\u015Bni\u0119ty?',
    '%rel to %dst':
        '%rel do %dst',
    'distance':
    	'odleg\u0142o\u015B\u0107',
    'ray length':
        'd\u0142ugo\u015B\u0107 promienia',
    '%asp at %loc' :
        '%asp w %loc',
    'r-g-b-a':
        'R-G-B-A',
    'sprites' :
        'duszki',
    'reset timer':
        'kasuj zegar',
    'timer':
        'czasomierz',
    '%att of %spr':
        '%att z %spr',
    'my %get':
        'ja %get',
    'object %self':
        'obiekt %self',
    'http:// %s':
        'http:// %s',
    'turbo mode':
        'tryb turbo',
    'flat line ends':
        'p\u0142askie ko\u0144ce linii',
    'is %setting on?':
        '%setting w\u0142\u0105czone?',
    'set %setting to %b':
        'ustaw %setting na %b',
    'current %dates':
        'obecnie %dates',
    'year':
        'rok',
    'month':
        'miesi\u0105c',
    'date':
        'dzie\u0144',
    'day of week':
        'dzie\u0144 tygodnia',
    'hour':
        'godzina',
    'minute':
        'minuta',
    'second':
        'sekunda',
    'time in milliseconds':
        'czas w milisekundach',
    'microphone %audio':
        'mikrofon %audio',
    'volume':
        'g\u0142o\u015Bno\u015B\u0107',
    'note':
        'nuta',
    'frequency':
        'cz\u0119stotliwo\u015B\u0107',
    'samples':
        'pr\u00F3bki',
    'sample rate':
        'cz\u0119stotliwo\u015B\u0107 pr\u00F3bkowania',
    'spectrum':
        'widmo',
    'resolution':
        'rozdzielczo\u015B\u0107',
    'Microphone resolution...':
        'Rozdzielczo\u015B\u0107 mikrofonu...',
    'Microphone':
        'Mikrofon',
    'low':
        'niska',
    'high':
        'wysoka',
    'max':
        'max',
    'video %vid on %self':
        'wideo %vid na %self',
    'motion':
        'ruch',
    'snap':
        'fotka',
    'set video transparency to %n':
        'ustaw przezroczysto\u015B\u0107 wideo na %n',
    'video capture':
        'nagranie wideo',
    'mirror video':
        'wideo lustrzane',
    'filtered for %clr':
        'przefiltrowane dla %clr',
    'stack size':
        'rozmiar stosu',
    'frames':
        'klatki',
    'log pen vectors':
        'zapis wektorowy',

    // operators:
    '%n mod %n':
        '%n modulo %n',
    'round %n':
        'zaokr\u0105glij %n',
    '%fun of %n':
        '%fun z %n',
    'pick random %n to %n':
        'losuj od %n do %n',
    'and':
        'i',
    'or':
        'lub',
    'not %b':
        'nie %b',
    'true':
        'prawda',
    'false':
        'fa\u0142sz',
    'join %words':
        'po\u0142\u0105cz %words',
    'split %s by %delim':
        'podziel %s na %delim',
    'hello':
        'witaj',
    'world':
        '\u015Bwiecie',
    'letter %ix of %s':
        'litera %ix z %s',
    'length of %s':
        'd\u0142ugo\u015B\u0107 %s',
    'unicode of %s':
        'Unicode z %s',
    'unicode %n as letter':
        'Unicode %n jako litera',
    'is %s a %typ ?':
        'jest %s typu %typ ?',
    'is %s identical to %s ?':
        'jest %s identyczne z %s ?',
    'is %all== ?':
        'jest %all== ?',
    'identical to':
        'identyczne z',
    'all identical':
        'all identical',
    'all <':
        'all <',
    'all >':
        'all >',
    'all \u2264':
        'all \u2264',
    'all \u2265':
        'all \u2265',
    'all =':
        'all =',
    'neighbors \u2260':
        'neighbors \u2260',
    'JavaScript function ( %mult%s ) { %code }':
        'funkcja JavaScript ( %mult%s ) { %code }',
    'compile %repRing':
    	'skompiluj %repRing',

    'type of %s':
        'typ %s',

    // variables:
    'Make a variable':
        'Utw\u00F3rz zmienn\u0105',
    'Variable name':
        'nazwa zmiennej',
    'Script variable name':
        'nazwa zmiennej skryptu',
    'inherit %shd':
        'dziedzicz %shd',
    'Delete a variable':
        'Usu\u0144 zmienn\u0105',

    'set %var to %s':
        'ustaw %var na %s',
    'change %var by %n':
        'zmie\u0144 %var o %n',
    'show variable %var':
        'poka\u017C zmienn\u0105 %var',
    'hide variable %var':
        'ukryj zmienn\u0105 %var',
    'script variables %scriptVars':
        'zmienne skryptu %scriptVars',

    // lists:
    'list %exp':
        'lista %exp',
    'numbers from %n to %n':
        'liczby od %n do %n',
    '%s in front of %l':
        'wstaw %s przed %l',
    'item %idx of %l':
        'element %idx z %l',
    'all but first of %l':
        'bez pierwszego z %l',
    '%la of %l':
        '%la z %l',
    'rank':
        'ranga',
    'dimensions':
        'wymiary',
    'flatten':
        'sp\u0142aszcz',
    'columns':
        'kolumny',
    'reverse':
        'odwr\u00F3cenie',
    'lines':
        'linie',
    '%l contains %s':
        '%l zawiera %s',
    'thing':
        'co\u015B',
    'is %l empty?':
        'czy %l jest puste?',
    'index of %s in %l':
        'indeks %s w %l',
    'map %repRing over %l':
        'mapuj %repRing na %l',
    'keep items %predRing from %l':
        'zachowaj elementy %predRing od %l',
    'find first item %predRing in %l':
        'znajd\u017A pierwszy element %predRing w %l',
    'combine %l using %repRing':
        'po\u0142\u0105cz %l u\u017Cywaj\u0105c %repRing',
    '%blitz map %repRing over %l':
        '%blitz mapuj %repRing na %l',
    '%blitz keep items %predRing from %l':
        '%blitz zachowaj elementy %predRing od %l',
    '%blitz find first item %predRing in %l':
        '%blitz znajd\u017A pierwszy element %predRing w %l',
    '%blitz combine %l using %repRing':
        '%blitz po\u0142\u0105cz %l u\u017Cywaj\u0105c %repRing',
    'for each %upvar in %l %cla':
        'dla ka\u017Cdego %upvar z %l %cla',
    'item':
        'element',
    'value':
        'warto\u015B\u0107',
    'index':
        'indeks',
    'append %lists':
        'przy\u0142\u0105cz %lists',
    'reshape %l to %nums':
        'przebuduj %l do %nums',
    'add %s to %l':
        'dodaj %s do %l',
    'delete %ida of %l':
        'usu\u0144 %ida z %l',
    'insert %s at %idx of %l':
        'wstaw %s na pozycji %idx do %l',
    'replace item %idx of %l with %s':
        'zamie\u0144 element %idx z %l na %s',

    // other
    'Make a block':
        'Nowy blok',

    // menus
    // snap menu
    'About...':
        'O Snap!...',
    'Reference manual':
        'Podr\u0119cznik',
    'Snap! website':
        'Strona Snap!',
    'Download source':
        'Pobierz \u017Ar\u00F3d\u0142o',
    'Switch back to user mode':
        'Prze\u0142\u0105cz do trybu u\u017Cytkownika',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'wy\u0142\u0105cz menu kontekstowe\ndeep-Morphic\ni poka\u017C przyjazne dla u\u017Cytkownika',
    'Switch to dev mode':
        'do trybu budowania',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'w\u0142\u0105z Morphic\nmenu kontekstowe\ni inspectors,\nniezbyt przyjazne dla u\u017Cytkownika!',

    // project menu
    'Project notes...':
        'O projekcie...',
    'New':
        'Nowy',
    'Open...':
        'Otw\u00F3rz...',
    'Save':
        'Zapisz',
    'Save to disk':
        'Zapisz na dysku',
    'store this project\nin the downloads folder\n(in supporting browsers)':
        'pobierz ten projekt\ni zapisz go lokalnie\n'
            + '(nieobs\u0142ugiwane przez wszystkie przegl\u0105darki)',
    'Save As...':
        'Zapisz jako...',
    'Import...':
        'Importuj...',
    'file menu import hint':
        '\u0142aduje wyeksportowany projekt\n'
            + 'biblitek\u0119 '
            + 'kostium lub d\u017Awi\u0119k',
    'Export project as plain text...':
        'Eksportuj projekt jako tekst...',
    'Export Project As...':
        'Eksportuj projekt jako...',
    'Export project...':
        'Eksportuj projekt...',
    'save project data as XML\nto your downloads folder':
        'zapisz dane projektu jako XML\nw folderze \u0142adowania',
    'show project data as XML\nin a new browser window':
        'poka\u017C projekt jako XML\nw nowej karcie',
    'Export blocks...':
        'Eksportuj bloki...',
    'save global custom block\ndefinitions as XML':
        'zapisz definicje blok\u00F3w\njako XML',
    'Unused blocks...':
          'Niewykorzystane bloki...',
    'find unused global custom blocks\nand remove their definitions':
        'znajd\u017A i usu\u0144\nniewykorzystane bloki',
    'Remove unused blocks':
        'Usu\u0144 niewykorzystane bloki',
    'there are currently no unused\nglobal custom blocks in this project':
        'obecnie nie ma niewykorzystanych\nblok\u00F3w w tym projekcie',
    'unused block(s) removed':
        'usuni\u0119to niewykorzystane bloki',
    'Export summary...':
        'Eksport podsumowania...',
    'save a summary\nof this project':
        'zapisz podsumowanie\ntego projektu',
    'Contents':
        'Zawarto\u015B\u0107',
    'Kind of':
        'Rodzaj',
    'Part of':
        'Cz\u0119\u015B\u0107',
    'Parts':
        'Cz\u0119\u015Bci',
    'Blocks':
        'Bloki',
    'For all Sprites':
        'Dla wszystkich duszk\u00F3w',
    'Libraries...':
        'Biblioteki...',
    'Select categories of additional blocks to add to this project.':
        'Wybierz kategorie dodatkowych blok\u00F3w,\nkt\u00F3re chcesz doda\u0107 do tego projektu.',
    'Select a costume from the media library':
        'Wybierz kostium z biblioteki multimedi\u00F3w',
    'Select a sound from the media library':
        'Wybierz d\u017Awi\u0119k z biblioteki multimedi\u00F3w',
    'Undelete sprites...':
        'Przywr\u00F3\u0107 duszki...',
    'Bring back deleted sprites':
        'Odzyskaj usuni\u0119te duszki',
    'trash is empty':
        'kosz jest pusty',

    //Libraries
    'Import library':
        'Importuj bibliotek\u0119',
    'Loading':
        '\u0141adowanie',
    'Imported':
        'Zaimportowane',
    'Iteration, composition':
        'Iteracja, kompozycja',
    'List utilities':
        'Metody listy',
    'Variadic reporters':
        'Zmienna liczba argument\u00F3w',
    'Web services access (https)':
        'Dost\u0119p do us\u0142ug sieciowych (https)',
    'Multi-branched conditional (switch)':
        'Tryb wieloargumentowy (switch)',
    'LEAP Motion controller':
        'Kontroler ruchu LEAP',
    'Words, sentences':
        'S\u0142owa, zdania',
    'Catch errors in a script':
        'Z\u0142ap b\u0142\u0119dy w skrypcie',
    'Set RGB or HSV pen color':
        'Ustaw kolor pisaka RGB lub HSV',
    'Text to speech':
        'Tekst na mow\u0119',
    'Provide 100 selected colors':
        '100 wybranych kolor\u00F3w',
    'Infinite precision integers, exact rationals, complex':
        'Liczby ca\u0142kowite niesko\u0144czonej precyzji, dok\u0142adne liczby wymierne, liczby zespolone',
    'Provide getters and setters for all GUI-controlled global settings':
        'Dostarcz gettery i settery (pobieraj\u0105ce i ustawiaj\u0105ce) dla wszystkich globalnych ustawie\u0144 kontrolowanych przez GUI',
    'Allow multi-line text input to a block':
        'Zezwalaj na wprowadzanie tekstu wielowierszowego do bloku',
    'Create variables in program':
        'Utw\u00F3rz zmienne w skrypcie',

    // cloud menu
    'Login...':
        'Logowanie...',
    'Signup...':
        'Rejestracja...',
    'Logout':
        'Wyloguj',
    'Change Password...':
        'Zmie\u0144 has\u0142o...',
    'Reset Password...':
        'Zresetuj has\u0142o...',
    'Resend Verification Email...':
        'Wy\u015Blij ponownie email weryfikacyjny...',
    'Open in Community Site':
        'Poka\u017C stron\u0119 projektu',

    // settings menu
    'Language...':
        'J\u0119zyk...',
    'Zoom blocks...':
        'Powi\u0119ksz bloki...',
    'Fade blocks...':
        'Przyga\u015B bloki...',
    'Stage size...':
        'Rozmiar sceny...',
    'Stage size':
        'Rozmiar sceny',
    'Stage width':
        'Szeroko\u015B\u0107 sceny',
    'Stage height':
        'Wysoko\u015B\u0107 sceny',
    'Default':
        'Domy\u015Blny',
    'Blurred shadows':
        'Rozmyte cienie',
    'uncheck to use solid drop\nshadows and highlights':
        'odznacz, aby uzyska\u0107\nmocne cienie i granice',
    'check to use blurred drop\nshadows and highlights':
        'zaznacz, aby uzyska\u0107\rozmyte cienie i granice',
    'Zebra coloring':
        'Kolorowanie zebr\u0105',
    'check to enable alternating\ncolors for nested blocks':
        'zaznacz, aby pozowli\u0107 na zmian\u0119\nbarw zagnie\u017Cd\u017Conych blok\u00F3w',
    'uncheck to disable alternating\ncolors for nested block':
        'odznacz, aby nie pozowli\u0107 na zmian\u0119\nbarw zagnie\u017Cd\u017Conych blok\u00F3w',
    'Dynamic input labels':
        'Dynamiczne opisy parametr\u00F3w',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'odznacz, aby wy\u0142\u0105czy\u0107 dynamiczne\nopisy dla wej\u015B\u0107 variadic',
    'check to enable dynamic\nlabels for variadic inputs':
        'zaznacz, aby w\u0142\u0105czy\u0107 dynamiczne\nopisy dla wej\u015B\u0107 variadic',
    'Prefer empty slot drops':
        'Preferuj puste gniazda',
    'settings menu prefer empty slots hint':
        'w\u0142\u0105cz, aby preferowa\u0107 puste\ngniazda podczas upuszczania'
            + 'blok\u00F3w',
    'uncheck to allow dropped\nreporters to kick out others':
        'odznacz, aby umo\u017Cliwi\u0107 blokom\nzast\u0119powanie innych po zwolnieniu',
    'check to turn on\n visible stepping (slow)':
        'zaznacz, aby w\u0142\u0105czy\u0107\nwidoczne kroki (wolne)',
    'uncheck to turn off\nvisible stepping':
        'odznacz, aby wy\u0142\u0105czy\u0107\nwidoczne kroki',
    'Long form input dialog':
        'D\u0142uga forma dialogu wej\u015Bcia',
    'Plain prototype labels':
        'Prosta etykieta prototypu',
    'uncheck to always show (+) symbols\nin block prototype labels':
        'odznacz, aby pokazywa\u0107 symbol (+)\nna etykietach prototypowych blok\u00F3w',
    'check to hide (+) symbols\nin block prototype labels':
        'zaznacz, aby ukry\u0107 symbol (+)\nna etykietach prototypowych blok\u00F3w',
    'check to always show slot\ntypes in the input dialog':
        'zaznacz, aby w\u0142\u0105czy\u0107 d\u0142ug\u0105\nform\u0119 dialogu wej\u015Bcia',
    'uncheck to use the input\ndialog in short form':
        'odznacz, aby u\u017Cywa\u0107 dialogu\nwej\u015Bcia w kr\u00F3tkiej formie',
    'Virtual keyboard':
        'Witualna klawiatura',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'odznacz, aby nie u\u017Cywa\u0107 klawiatury\nwirtualnej dla urzdze\u0144 mobilnych',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'zaznacz, aby u\u017Cywa\u0107 klawiatury\nwirtualnej dla urzdze\u0144 mobilnych',
    'Input sliders':
        'Suwaki wej\u015Bciowe',
    'uncheck to disable\ninput sliders for\nentry fields':
        'odznacz, aby nie pozwoli\u0107 na suwaki w polach wej\u015Bciowych',
    'check to enable\ninput sliders for\nentry fields':
        'zaznacz, aby pozwoli\u0107 na suwaki w polach wej\u015Bciowych',
    'Retina display support':
        'Wsparcie wy\u015Bwietlacza Retina',
    'uncheck for lower resolution,\nsaves computing resources':
        'odznacz, aby uzyska\u0107 ni\u017Csz\u0105 rozdzielczo\u015B\u0107\n(mniejsza moc obliczeniowa)',
    'check for higher resolution,\nuses more computing resources':
        'zaznacz, aby uzyska\u0107 wy\u017Csz\u0105 rozdzielczo\u015B\u0107,\n(wi\u0119ksza moc obliczeniowa)',
    'Codification support':
        'Kodowanie blok\u00F3w',
    'Clicking sound':
        'D\u017Awi\u0119k klikni\u0119cia',
    'uncheck to turn\nblock clicking\nsound off':
        'odznacz, aby wy\u0142\u0105czy\u0107\nd\u017Awi\u0119k klikni\u017Acia',
    'check to turn\nblock clicking\nsound on':
        'zaznacz, aby w\u0142\u0105czy\u0107\nd\u017Awi\u0119k klikni\u017Acia',
    'Animations':
        'Animacje',
    'uncheck to disable\nIDE animations':
        'odznacz, aby nie pozwoli\u0107\nna animacje IDE',
    'Turbo mode':
        'Tryb turbo',
    'check to prioritize\nscript execution':
        'zaznacz, aby nada\u0107 priorytet\nwykonaniu skryptu',
    'uncheck to run scripts\nat normal speed':
        'odznacz, aby wykona\u0107 skrypt\nz normaln\u0105 szybko\u015Bci\u0105',
    'check to enable\nIDE animations':
        'zaznacz, aby pozwoli\u0107\nna animacje IDE',
    'Flat design':
        'Prosty wygl\u0105d',
    'check for alternative\nGUI design':
        'zaznacz, aby prze\u0142\u0105czy\u0107\nna alternatywny wygl\u0105d GUI',
    'uncheck for default\nGUI design':
        'odznacz, aby przywr\u00F3ci\u0107\nnormalny wygl\u0105d GUI',
    'Nested auto-wrapping':
        'Przyleganie do kompletnych skrypt\u00F3w',
    'Keyboard Editing':
        'Edytowanie Klawiatur\u0105',
    'Table support':
        'Tablice 2D',
    'Table lines':
        'Tabele z liniami',
    'Visible stepping':
        'Debugowanie krokowe',
    'Thread safe scripts':
        'Omijaj bezpieczne skrypty',
    'uncheck to allow\nscript reentrance':
        'odznacz, aby pozwoli\u0107\nna restartowanie skryptu',
    'check to disallow\nscript reentrance':
        'zaznacz, aby nie pozwoli\u0107\nna restartowanie skryptu',
    'Prefer smooth animations':
        'Preferuj g\u0142adkie animacje',
    'uncheck for greater speed\nat variable frame rates':
        'odznacz, aby pozwoli\u0107na\nwi\u0119ksz pr\u0119dko\u015B\u0107 ramek animacji',
    'check for smooth, predictable\nanimations across computers':
        'zaznacz, aby zapewni\u0107na\njednakowe, g\u0142adkie animacje',
	'Flat line ends':
        'P\u0142askie ko\u0144ce linii',
    'check for flat ends of lines':
        'zaznacz, aby ko\u0144ce linii\nby\u0142y p\u0142askie',
    'uncheck for round ends of lines':
        'odznacz, aby ko\u0144ce linii\nby\u0142y zaokr\u0105glone',
    'Ternary Boolean slots':
        'Potr\u00F3jne wej\u015Bcia boolowskie',
    'Inheritance support':
        'Podtrzymywanie dziedziczenia',
    'Hyper blocks support':
        'Obs\u0142uga hiperblok\u00F3w',
    'uncheck to disable\nusing operators on lists and tables':
         'odznacz, aby wy\u0142\u0105czy\u0107 u\u017Cywanie\nwyra\u017Ce\u0144 na listach i tabelach',
    'check to enable\nusing operators on lists and tables':
         'zaznacz, aby umo\u017Cliwi\u0107 u\u017Cywanien\nwyra\u017Ce\u0144 na listach i tabelach',
    'Log pen vectors':
        'Zapis wektorowy pisaka',
    'uncheck to turn off\nlogging pen vectors':
        'odznacz, aby wy\u0142\u0105czy\u0107\nzapis wektorowy pisaka',
    'check to turn on\nlogging pen vectors':
        'zaznacz, aby w\u0142\u0105czy\u0107\nzapis wektorowy pisaka',


    // inputs
    'with inputs':
        'z parametrami',
    'input names:':
        'nazwy parametr\u00F3w:',
    'Input Names:':
        'Nazwy Parametr\u00F3w:',
    'input list:':
        'parametr - lista:',

    // context menus:
    'help':
        'pomoc',

    // palette:
    'find blocks':
        'znajd\u017A bloki',
	'hide primitives':
        'ukryj pierwotne',
    'show primitives':
        'poka\u017C pierwotne',

    // blocks:
    'help...':
        'pomoc...',
    'relabel...':
        'przemianuj...',
    'compile':
        'kompiluj',
    'uncompile':
        'odkompiluj',
    'duplicate':
        'powiel',
    'make a copy\nand pick it up':
        'wykonaj i we\u017A kopi\u0119',
    'only duplicate this block':
        'powiel tylko ten blok',
    'extract':
        'wyodr\u0119bnij',
    'only grab this block':
        'chwy\u0107 tylko ten blok',
    'delete':
        'usu\u0144',
    'senders...':
        'nadawcy...',
    'receivers...':
        'odbiorcy...',
    'script pic...':
        'obrazek skryptu...',
    'save a picture\nof this script':
        'zapisz obrazek\ntego skryptu',
    'result pic...':
        'obrazek wyniku...',
    'save a picture of both\nthis script and its result':
        'zapisz obrazek zar\u00F3wno\ntego skryptu, jak i jego wyniku',
    'ringify':
        'obwiednia',
    'unringify':
        'bez obwiedni',
    'transient':
        'chwilowo',
    'uncheck to save contents\nin the project':
        'odznacz, aby zapisa\u0107\nzawarto\u015B\u0107 w projekcie',
    'check to prevent contents\nfrom being saved':
        'zaznacz, aby zapobiec\nzapisaniu zawarto\u015Bci',
    'new line':
        'nowa linia',

    // custom blocks:
    'delete block definition...':
        'usu\u0144 definicj\u0119 bloku',
    'duplicate block definition...':
        'powiel definicj\u0119 bloku...',
    'export block definition...':
        'eksportuj definicj\u0119 bloku...',
    'including dependencies':
        'w tym zale\u017Cno\u015Bci',
    'edit...':
        'edytuj...',

    // sprites:
    'edit':
        'edytuj',
    'clone':
        'klonuj',
    'move':
        'porusz',
    'pivot':
        'o\u015B',
    'edit the costume\'s\nrotation center':
        'edytuj \u015Brodek\nobrotu kostiumu',
    'rotate':
    	'obr\u00F3\u0107',
    'stick to':
        'przyczep do',
    'detach from':
        'od\u0142\u0105cz od',
    'detach all parts':
        'od\u0142\u0105cz wszystkie cz\u0119\u015Bci',
    'export...':
        'eksportuj...',
	'parent...':
        'pierwowz\u00F3r...',
    'current parent':
        'aktualny pierwowz\u00F3r',
    'release':
        'wydanie',
    'make temporary and\nhide in the sprite corral':
        'zr\u00F3b tymczasowy\ni ukryj ikon\u0119',

    // stage:
    'show all':
        'poka\u017C wszystko',
    'pic...':
        'obrazek...',
    'save a picture\nof the stage':
        'zapisz obrazek\nsceny',
    'svg...':
        'eksportuj SVG...',
    'export pen trails\nline segments as SVG':
        'eksportuj \u015Blady pisaka\njako grafik\u0119 wektorow\u0105',
    'there are currently no\nvectorizable pen trail segments':
        'obecnie nie ma odcink\u00F3w \u015Bladu\npisak\u00F3w, kt\u00F3re mo\u017Cna wektoryzowa\u0107',
    'turn all pen trails and stamps\ninto a new background for the stage':
        'zamie\u0144 wszystkie \u015Blady pisaka i\nstemple w nowe t\u0142o dla sceny',
    'turn all pen trails and stamps\ninto a new costume for the\ncurrently selected sprite':
        'zamie\u0144 wszystkie \u015Blady pisaka i stemple\nw nowy kostium dla aktualnie wybranego duszka',

    // scripting area
    'clean up':
        'wyczy\u015B\u0107',
    'arrange scripts\nvertically':
        'ustaw skrypty w pionie',
    'add comment':
        'dodaj komentarz',
    'undrop':
        'odklej',
    'undo the last\nblock drop\nin this pane':
        'cofnij ostatnie upuszczenie\nbloku na tej planszy',
	'redrop':
        'ponownie upu\u015B\u0107',
    'use the keyboard\nto enter blocks':
    	'u\u017Cyj klawiatury,\naby wprowadzi\u0107 bloki',
	'scripts pic...':
        'obrazek skryptu...',
    'save a picture\nof all scripts':
        'zapisz obrazek\nwszystkich skrypt\u00F3w',
    'make a block...':
        'buduj nowy blok...',

    // costumes
    'rename':
        'zmie\u0144 nazw\u0119',
    'export':
        'eksportuj',
    'rename costume':
        'zmie\u0144 nazw\u0119 kostiumu',
    'rename background':
        'zmie\u0144 nazw\u0119 t\u0142a',

    // sounds
    'Play sound':
        'Zagraj d\u017Cwi\u0119k',
    'Stop sound':
        'Zatrzymaj d\u017Cwi\u0119k',
    'Stop':
        'Stop',
    'Play':
        'Graj',
    'rename sound':
        'zmie\u0144 nazw\u0119 d\u017Cwi\u0119ku',

    // lists and tables
    'list view...':
        'widok listy...',
    'table view...':
        'widok tabeli...',
    'Table view':
        'Widok tabeli',
    'open in dialog...':
        'otw\u00F3rz w nowym oknie dialogowym',
    'blockify':
        'jako blok',
    'reset columns':
        'zresetuj szeroko\u015B\u0107 kolumn',
    'items':
        'pozycje',

    // dialogs
    // buttons
    'OK':
        'OK',
    'Ok':
        'Ok',
    'Cancel':
        'Anuluj',
    'Yes':
        'Tak',
    'No':
        'Nie',

    // help
    'Help':
        'Pomoc',

    // zoom blocks
    'Zoom blocks':
        'Zoom blok\u00F3w',
    'build':
        'buduj',
    'your own':
        'swoje',
    'blocks':
        'bloki',
    'normal (1x)':
        'normalne (1x)',
    'demo (1.2x)':
        'demo (1.2x)',
    'presentation (1.4x)':
        'prezentacja (1.4x)',
    'big (2x)':
        'du\u017Ce (2x)',
    'huge (4x)':
        'ogromne (4x)',
    'giant (8x)':
        'gigantyczne (8x)',
    'monstrous (10x)':
        'monstrualne (10x)',

    // fade blocks
    'Fade blocks':
        'Przyga\u015B bloki',
    'block-solid (0)':
        'normalny (0)',
    'medium (50)':
        '\u015Bredni (50)',
    'light (70)':
        'jasny (70)',
    'shimmering (80)':
        'l\u015Bni\u0105cy (80)',
    'elegant (90)':
        'elegancki (90)',
    'subtle (95)':
        'subtelny (95)',
    'text-only (100)':
        'tylko tekst (100)',

    // Project Manager
    'Untitled':
        'Bez nazwy',
    'Open Project':
        'Otw\u00F3rz projekt',
    'Open':
        'Otw\u00F3rz',
    '(empty)':
        '(puste)',
    'Saved!':
        'Zapisane!',
    'Delete Project':
        'Usu\u0144 projekt',
    'Are you sure you want to delete':
        'Czy napewno chcesz usun\u0105\u0107?',
    'rename...':
        'przemianuj...',
    'Examples':
        'Przyk\u0142ady',
    'Share':
        'Udost\u0119pnij',
    'Unshare':
        'Wy\u0142\u0105cz udost\u0119pnianie',
    'Publish':
        'Publikuj',
    'Unpublish':
        'Cofnij publikacj\u0119',
    'Updating\nproject list...':
        'Aktualizuj\u0119\nlist\u0119 projekt\u00F3w...',
    'Recover':
        'Odzyskaj',
    'Today':
        'Dzisiaj',
    'Yesterday':
        'Wczoraj',

    // costume editor
    'Costume Editor':
        'Edytor kostium\u00F3w',
    'Paint Editor':
        'Edytor grafiki rastrowej',
    'click or drag crosshairs to move the rotation center':
        'kliknij lub przeci\u0105gnij krzy\u017Cyk, aby przesun\u0105\u0107 \u015Brodek obrotu',
    'undo':
        'cofnij',
    'Vector':
        'wektor',
    'Bitmap':
        'bitmapa',		
    'Paintbrush tool\n(free draw)':
        'P\u0119dzel\n(swobodne rysowanie)',
    'Stroked Rectangle\n(shift: square)':
        'Brzeg prostok\u0105ta\n(+shift: kwadratu)',
    'Stroked Ellipse\n(shift: circle)':
        'Elipsa\n(+shift: okr\u0105g)',
    'Eraser tool':
        'Gumka',
    'Set the rotation center':
        'Ustaw \u015Brodek obrotu',
    'Line tool\n(shift: vertical/horizontal)':
        'Odcinek\n(+shift: pionowy/poziomy)',
    'Filled Rectangle\n(shift: square)':
        'Prostok\u0105t\n(+shift: kwadrat)',
    'Filled Ellipse\n(shift: circle)':
        'Wype\u0142niona elipsa\n(+shift: ko\u0142o)',
    'Fill a region':
        'Wype\u0142nij obszar\nwybranym kolorem',
    'Pipette tool\n(pick a color anywhere)':
        'Pipeta\n(wybierz kolor w dowolnym miejscu)',
    'Brush size':
        'Rozmiar p\u0119dzla',
    'Constrain proportions of shapes?\n(you can also hold shift)':
        'Zachowaj proporcje kszta\u0142t\u00F3w\n(mo\u017Cesz te\u017C przytrzyma\u0107 shift)',
    'grow':
        'wi\u0119kszy',
    'shrink':
        'mniejszy',
    'flip horizontal':
        'przerzu\u0107 \u2194',
    'flip vertical':
        'przerzu\u0107 \u2195',
    
    'Vector Paint Editor':
        'Edytor grafiki wektorowej',
    'Rectangle\n(shift: square)':
        'Brzeg prostok\u0105ta\n(+shift: kwadratu)',
    'Ellipse\n(shift: circle)':
        'Elipsa\n(+shift: okr\u0105g)',
    'Selection tool':
        'Narz\u0119dzie do zaznaczania',
    'Line tool\n(shift: constrain to 45º)':
        'Odcinek\n(+shift: nachylenie co 45°)',
    'Closed brush\n(free draw)':
        'P\u0119dzel zamykaj\u0105cy krzywe\n(swobodne rysowanie)',
    'Polygon':
        'Wielok\u0105t',
    'Paint a shape\n(shift: edge color)':
        'Wype\u0142nij obszar wybranym kolorem\n(+shift: kolor linii)',
    'Pipette tool\n(pick a color from anywhere\nshift: fill color)':
        'Pipeta\nwybierz kolor klikaj\u0105c w dowolnym\nmiejscu (+shift: kolor wype\u0142nienia)',
    'Edge color\n(left click)':
        'Kolor linii\n(lewy przycisk myszy)',
    'Fill color\n(right click)':
        'Kolor wype\u0142nienia\n(prawy przycisk myszy)',
    'Top':
        'wierzch',
    'Bottom':
        'sp\u00F3d',
    'Up':
        'w g\u00F3r\u0119',
    'Down':
        'w d\u00F3\u0142',


    // project notes
    'Project Notes':
        'Opis projektu',

    // new project
    'New Project':
        'Nowy projekt',
    'Unsaved Changes!':
        'Niezapisane zmiany!',
    'Replace the current project with a new one?':
        'Zast\u0105pi\u0107 aktualny projekt przez nowy?',
    'Backup failed.\nThis cannot be undone, proceed anyway?':
        'Kopia zapasowa nie jest mo\u017Cliwa.\nCzy mimo to kontynuowa\u0107?',

    // save project
    'Save Project As...':
        'Zapisz projekt jako...',
    'Save Project':
        'Zapisz projekt',

    // export blocks
    'Export blocks':
        'Eksportuj bloki',
    'Import blocks':
        'Importuj bloki',
    'this project doesn\'t have any\ncustom global blocks yet':
        'ten projekt nie ma jeszcze\nw\u0142asnych globalnych blok\u00F3w',
    'select':
        'wybierz',
    'none':
        'nic',

    // variable dialog
    'for all sprites':
        'dla wszystkich duszk\u00F3w',
    'for this sprite only':
        'tylko dla tego duszka',

    // variables refactoring
    'rename only\nthis reporter':
        'zmie\u0144 nazw\u0119\ntylko tej zmiennej',
    'rename all...':
        'zmie\u0144 nazwy wszystkich...',
    'rename all blocks that\naccess this variable':
        'zmie\u0144 nazwy wszystkich blok\u00F3w,z nazw\u0105 tej zmiennej',


    // block dialog
    'Change block':
        'Zmie\u0144 blok',
    'Command':
        'Komenda',
    'Reporter':
        'Funkcja',
    'Predicate':
        'Predykat',

    // block editor
    'Block Editor':
        'Edytor blok\u00F3w',
    'Method Editor':
        'Edytor metod',
	'Apply':
        'Zastosuj',

    // block deletion dialog
    'Delete Custom Block':
        'Usu\u0144 w\u0142asny blok',
    'block deletion dialog text':
        'czy ten blok ze wszystkimi wyst\u0105pieniami\n' +
            'rzeczywi\u015Bcie usun\u0105\u0107?',

    // input dialog
    'Create input name':
        'Utw\u00F3rz nazw\u0119 parametru',
    'Edit input name':
        'Edytuj nazw\u0119 parametru',
    'Edit label fragment':
        'Edytuj opis parametru',
    'Title text':
        'Tekst tytu\u0142owy',
    'Input name':
        'Nazwa',
    'Delete':
        'Usu\u0144',
    'Object':
        'Obiekt',
    'Number':
        'Liczba',
    'Text':
        'Tekst',
    'List':
        'Lista',
    'Any type':
        'Dowolnego rodzaju',
    'Boolean (T/F)':
        'Logiczny (P/F)',
    'Command\n(inline)':
        'Komenda',
    'Command\n(C-shape)':
        'Komenda\n(C-Form)',
    'Any\n(unevaluated)':
        'Dowolny\n(nieokre\u015Blony)',
    'Boolean\n(unevaluated)':
        'Logiczny\n(nieokre\u015Blony)',
    'Single input.':
        'Jeden parametr.',
    'Default Value:':
        'Warto\u015B\u0107 standardowa:',
    'Multiple inputs (value is list of inputs)':
        'Wiele parametr\u00F3w (jako lista)',
    'Upvar - make internal variable visible to caller':
        'Wewn\u0119trzna zmienna widoczna dla wywo\u0142ania',

    // About Snap
    'About Snap':
        'O Snap',
    'Back...':
        'Wstecz...',
    'License...':
        'Licencja...',
    'Modules...':
        'Modu\u0142y...',
    'Credits...':
        'Podzi\u0119kowania...',
    'Translators...':
        'T\u0142umacze',
    'License':
        'Licencja',
    'current module versions:':
        'aktualna wersja modu\u0142\u00F3w',
    'Contributors':
        'Wsp\u00F3\u0142pracownicy',
    'Translations':
        'T\u0142umaczenia',

    // variable watchers
    'normal':
        'normalny',
    'large':
        'wielki',
    'slider':
        'suwak',
    'slider min...':
        'minimum suwaka...',
    'slider max...':
        'maksimum suwaka...',
    'import...':
        'importuj...',
    'raw data...':
        'surowe dane...',
    'import without attempting to\nparse or format data':
        'Importuj dane\nniesformatowane',
    'Slider minimum value':
        'Minimalna warto\u015B\u0107 suwaka',
    'Slider maximum value':
        'Maksymalna warto\u015B\u0107 suwaka',

    // list watchers
    'length: ':
        'd\u0142ugo\u015B\u0107: ',

    // comments
    'add comment here...':
        'dodaj komentarz tutaj...',
    'comment pic...':
        'obrazek komentarza',
    'save a picture\nof this comment':
        'zapisz obrazek\ntego komentarza',

    // drow downs
    // directions
    '(90) right':
        '(90) prawo',
    '(-90) left':
        '(-90) lewo',
    '(0) up':
        '(0) g\u00F3ra',
    '(180) down':
        '(180) d\u00F3\u0142',
    'random':
    	'losowo',
     'random position':
     	'losowa pozycja',

    // collision detection
    'mouse-pointer':
        'wska\u017Anik myszy',
    'edge':
        'kraw\u0119dzie',
    'pen trails':
        '\u015Blady pisaka',
    'center':
        '\u015Brodek',

    // costumes
    'Turtle':
        '\u017B\u00F3\u0142w',
    'Empty':
        'Pusty',
    'Paint a new costume':
        'Narysuj nowy kostium',
    'Import a new costume from your webcam':
        'Nowy kostium z kamery',
    'Please make sure your web browser is up to date\nand your camera is properly configured. \n\nSome browsers also require you to access Snap!\nthrough HTTPS to use the camera.\n\nPlase replace the "http://" part of the address\nin your browser by "https://" and try again.':
        'Überprüfe, ob der Browser auf dem aktuellsten Stand \nund die Webcam korrekt konfiguriert ist.\n\nFür einige Browser muss Snap! mit HTTPS geöffnet\nwerden, um auf die Kamera zuzugreifen.\n\nErsetze dafür den "http://"-Teil in der Adresszeile mit"https://"',
    'Camera':
        'Kamera',
    
    // sounds
    'Record a new sound':
        'Nagraj nowy d\u017Awi\u0119k',
    

    // graphical effects, pen color
    'color':
        'kolor',
    'hue':
        'odcie\u0144',
    'fisheye':
        'rybie oko',
    'whirl':
        'wir',
    'pixelate':
        'pikselizacja',
    'mosaic':
        'mozaika',
    'saturation':
        'nasycenie',
    'brightness':
        'jasno\u015B\u0107',
    'transparency':
        'przezroczysto\u015B\u0107',
    'ghost':
        'duch',
	'negative':
        'negatyw',
    'comic':
        'mora ',
    'confetti':
        'konfetti',

    // keys
    'space':
        'spacja',
    'up arrow':
        'strza\u0142ka w g\u00F3r\u0119',
    'down arrow':
        'strza\u0142ka w d\u00F3\u0142',
    'right arrow':
        'strza\u0142ka w prawo',
    'left arrow':
        'strza\u0142ka w lewo',
    'any key':
        'dowolny klawisz',
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
        'nowy...',
    '__shout__go__':
        'klikni\u0119to zielon\u0105 flag\u0119',

    // math functions
    'abs':
        'modu\u0142',
    'ceiling':
        'zaokr\u0105glenie w g\u00F3r\u0119',
	'floor':
        'zaokr\u0105glenie w d\u00F3\u0142',
    'sqrt':
        'pierwiastek kwadratowy',
    'sin':
        'sin',
    'cos':
        'cos',
    'tan':
        'tg',
    'asin':
        'arcsin',
    'acos':
        'arccos',
    'atan':
        'arctg',
    'ln':
        'ln',
    'e^':
        'e^',

    // Boolean expressions keyboard entry
    'not':
        'nie',

    // delimiters
    'letter':
        'litera',
    'word':
        's\u0142owo',
    'whitespace':
        'spacja',
    'line':
        'linia',
    'tab':
        'tabulator',
    'cr':
        'koniec linii',

    // data types
    'number':
        'liczba',
    'text':
        'tekst',
    'Boolean':
        'logiczna',
    'list':
        'lista',
    'command':
        'komenda',
    'reporter':
        'funkcja',
    'predicate':
        'predykat',
    'sprite':
        'duszek',
	'sound':
        'd\u017Awi\u0119k',
		
    // list indices
    'last':
        'ostatni',
    'any':
        'dowolny',

    // attributes
    'my':
        'moje',
    'neighbors':
        's\u0105siedzi',
    'self':
        'sam',
    'other sprites':
        'inne duszki',
    'parts':
        'cz\u0119\u015Bci',
    'anchor':
        'kotwica',
    'parent':
        'rodzic',
    'temporary?':
        'tymczasowy?',
    'children':
        'potomstwo',
    'clones':
        'klony',
    'other clones':
        'inne klony',
    'dangling?':
        'wisz\u0105cy?',
    'draggable?':
        'przeci\u0105galny?',
    'rotation style':
        'typ obrotu',
    'rotation x':
        'obr\u00F3t x',
    'rotation y':
        'obr\u00F3t y',
    'center x':
        'x \u015Brodka',
    'center y':
        'y \u015Brodka',
    'name':
        'nazwa',
    'costume':
        'kostium',
    'costume name':
        'nazwa kostiumu',
    'stage':
        'scena',
    'costumes':
        'kostiumy',
    'sounds':
        'd\u017Awi\u0119ki',
    'scripts':
        'skrypty',
    'width':
        'szeroko\u015B\u0107',
    'height':
        'wysoko\u015B\u0107',
    'left':
        'lewa kraw\u0119d\u017A',
    'right':
        'prawa kraw\u0119d\u017A',
    'top':
        'g\u00F3rna kraw\u0119d\u017A',
    'bottom':
        'dolna kraw\u0119d\u017A',

    // attributes in the SET block's dropdown
    'my anchor':
        'moja kotwica',
    'my parent':
        'm\u00F3j rodzic',
    'my name':
        'moja nazwa',
    'my temporary?':
        'ja tymczasowy?',
    'my dangling?':
        'ja wisz\u0105cy?',
    'my draggable?':
        'ja przeci\u0105galny?',
    'my rotation style':
        'm\u00F3j typ obrotu',
    'my rotation x':
        'm\u00F3j obr\u00F3t x',
    'my rotation y':
        'm\u00F3j obr\u00F3t y',

    // inheritance
    'inherited':
        'odziedziczone',
    'check to inherit\nfrom':
        'zaznacz, \u017Ceby dziedziczy\u0107\nod',
    'uncheck to\ndisinherit':
        'odznacz, \u017Ceby\nnie dziedziczy\u0107'
};
