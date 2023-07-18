/*

    lang-pl.js

    Polish translation for SNAP!

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

    // metainformacje o tłumaczeniach
    'language_name':
        'Polski', // the name as it should appear in the language menu
    'language_translator':
        'Witek Kranas & deKrain & Andrzej Batorski, P1neF0rest935', // your name for the Translators tab
    'translator_e-mail':
        'witek@oeiizk.waw.pl', // optional
    'last_changed':
        '2023-07-18', // this, too, will appear in the Translators tab

    // GUI
    // pasek kontrolny:
    'untitled':
        'bez nazwy',
    'development mode':
        'tryb deweloperski',

    // kategorie:
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
        'Zmienne',
    'Lists':
        'Listy',
    'Other':
        'Inne',

    // edytor:
    'draggable':
        'przeci\u0105galny',

    // zakładki:
    'Scripts':
        'Skrypty',
    'Costumes':
        'Kostiumy',
    'Backgrounds':
        'T\u0142a',
	'Sounds':
        'D\u017Awi\u0119ki',

    // nazwy:
    'Sprite':
        'Duszek',
    'Stage':
        'Scena',

    // style obrotu:
    'don\'t rotate':
        'nie obracaj',
    'can rotate':
        'pe\u0142ny obr\u00F3t',
    'only face left/right':
        'tylko lewo/prawo',

    // przycisk nowych duszków:
    'add a new sprite':
        'dodaj nowego duszka',
    'add a new Turtle sprite':
        'dodaj nowego duszka-\u017C\u00F3\u0142wia',
    'paint a new sprite':
        'namaluj nowego duszka',
    'take a camera snapshot and\nimport it as a new sprite':
        'nowy duszek z kamery',

    // zakładka pomoc
    'costumes tab help':
        'Importuj obrazy z innej strony\n'
            + 'lub z komputera przeci\u0105gaj\u0105c tu',
    'import a sound from your computer\nby dragging it into here':
        'Importuj d\u017Awi\u0119k z komputera\nprzeci\u0105gaj\u0105c tu',

    // bloki podstawowe:

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

    // ruch:
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
    'position':
        'pozycja',
    'x position':
        'pozycja x',
    'y position':
        'pozycja y',
    'direction':
        'kierunek',

    // wygląd:
    'switch to costume %cst':
        'zmie\u0144 kostium na %cst',
    'next costume':
        'nast\u0119pny kostium',
    'costume #':
        'numer kostiumu',
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
        'rozci\u0105gnij %cst x: %n y: %n %',
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
        'przesu\u0144 na %layer',
    'front':
        'wierzch',
    'back':
        'sp\u00F3d',
    'go back %n layers':
        'wr\u00F3\u0107 o %n warstw',

    'development mode \ndebugging primitives:':
        'tryb deweloperski \ndebugowanie blok\u00F3w podstawowych:',
    'console log %mult%s':
        'log konsoli %mult%s',
    'alert %mult%s':
        'alert %mult%s',

    'pixels':
        'piksele',
    'current':
        'aktualny',

    // dźwięk:
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
        'nowy d\u017Awi\u0119k %l cz\u0119stotliwo\u015B\u0107 %rate Hz',
    'play note %note for %n beats':
        'zagraj nut\u0119 %note przez %n takt\u00F3w',
    'set instrument to %inst':
        'ustaw fal\u0119 na %inst',
	'change tempo by %n':
        'zmie\u0144 tempo o %n',
    'set tempo to %n bpm':
        'ustaw tempo na %n',
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
        'zagraj %n Hz przez %n s',

    // fale dźwiękowe:
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
        'ustaw kolor pisaka na %clr',
    'set background color to %clr':
        'ustaw kolor t\u0142a na %clr',
    'change pen %clrdim by %n':
        'zmie\u0144 %clrdim pisaka o %n',
    'change background %clrdim by %n':
        'zmie\u0144 %clrdim t\u0142a o %n',
    'set pen %clrdim to %n':
        'ustaw %clrdim pisaka na %n',
    'set background %clrdim to %n':
        'ustaw %clrdim t\u0142a na %n',
    'pen %pen':
        '%pen pisaka',
    'change pen size by %n':
        'zmie\u0144 rozmiar pisaka o %n',
    'set pen size to %n':
        'ustaw rozmiar pisaka na %n',
    'stamp':
        'stempluj',
    'fill':
        'wype\u0142nij',
    'write %s size %n':
        'napisz %s rozmiar %n',
    'paste on %spr':
        'wklej na %spr',
    'cut from %spr':
        'wytnij z %spr',
    'pen vectors':
        'wektory pisaka',

    // kontrola:
    'when %greenflag clicked':
        'kiedy klikni\u0119to %greenflag',
    'when %keyHat key pressed %keyName':
        'kiedy klawisz %keyHat naci\u015Bni\u0119ty %keyName',
    'when I am %interaction':
        'kiedy ten duszek %interaction',
    'key':
        'klawisz',
    'data':
        'dane',
    'clicked':
        'klikni\u0119ty',
    'pressed':
        'naci\u015Bni\u0119ty',
    'dropped':
        'upuszczony',
    'mouse-entered':
        'najechany',
    'mouse-departed':
        'opuszczony',
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
    'with data':
        'z danymi',
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
        'je\u017Celi %b %c inaczej %c',
    'if %b then %s else %s':
        'je\u017Celi %b to %s inaczej %s',
    'report %s':
        'zg\u0142o\u015B %s',
    'stop %stopChoices':
        'zatrzymaj %stopChoices',
    'all':
        'wszystko',
    'all scenes':
        'wszystkie sceny',
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
        'uruchom %cmdRing %inputs',
    'launch %cmdRing %inputs':
        'rozpocznij %cmdRing %inputs',
    'call %repRing %inputs':
        'wywo\u0142aj %repRing %inputs',
    'pipe %s $arrowRight %mult%repRing':
        'kanalizuj %s $arrowRight %mult%repRing',
    'run %cmdRing w/continuation':
        'uruchom %cmdRing z kontynuacj\u0105',
    'call %cmdRing w/continuation':
        'wywo\u0142aj %cmdRing z kontynuacj\u0105',
    'warp %c':
        'b\u0142yskawicznie %c',
    'when I start as a clone':
        'kiedy zaczynam jako klon',
    'create a clone of %cln':
        'sklonuj %cln',
    'a new clone of %cln':
        'nowy klon %cln',
    'myself':
        'siebie',
    'delete this clone':
        'usu\u0144 tego klona',
    'switch to scene %scn %send':
        'prze\u0142\u0105cz na scen\u0119 %scn %send',
    'and send':
        'i nadaj',
    'next':
        'nast\u0119pna',
    'previous':
        'poprzednia',
    'tell %spr to %cmdRing %inputs':
        'powiedz %spr aby %cmdRing %inputs',
    'ask %spr for %repRing %inputs':
        'zapytaj %spr o %repRing %inputs',
    'when %edit is edited %message':
        'kiedy %edit jest edytowane %message',
    'anything':
        'cokolwiek',
    'define %upvar %s %repRing':
        'definiuj %upvar %s %repRing',
    'delete block %repRing':
        'usu\u0144 blok %repRing',
    'block':
        'blok',
    'set %byob of block %repRing to %s':
        'ustaw %byob bloku %repRing na %s',
    '%block of block %repRing':
        '%block bloku %repRing',
    'label':
        'etykieta',
    'definition':
        'definicja',
    'category':
        'kategoria',
    'custom?':
        'niestandardowy?',
    'global?':
        'globalny?',
    'type':
        'typ',
    'scope':
        'zakres',
    'slots':
        'gniazda',
    'defaults':
        'domy\u015Blne',
    'menus':
        'menu',
    'editables':
        'edytowalne',
    'translations':
        't\u0142umaczenia',

    // czujniki:
    'touching %col ?':
        'dotyka %col ?',
    'touching %clr ?':
        'dotyka %clr ?',
    'color %clr is touching %clr ?':
        'kolor %clr dotyka %clr ?',
    'ask %s and wait':
        'zapytaj %s i czekaj',
    'what\'s your name?':
        'Jak masz na imi\u0119?',
    'answer':
        'odpowied\u017A',
    'mouse position':
        'pozycja myszy',
    'mouse x':
        'x myszy',
    'mouse y':
        'y myszy',
    'mouse down?':
        'klikni\u0119to myszk\u0105?',
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
    'RGBA':
        'RGBA',
    'sprites' :
        'duszki',
    'reset timer':
        'resetuj stoper',
    'timer':
        'stoper',
    '%att of %spr':
        '%att z %spr',
    'my %get':
        'w\u0142a\u015Bciwo\u015B\u0107 %get',
    'object %self':
        'obiekt %self',
    'url %s':
        'url %s',
    'turbo mode':
        'tryb turbo',
    'flat line ends':
        'p\u0142askie ko\u0144ce linii',
    'is %setting on?':
        '%setting jest w\u0142\u0105czony?',
    'set %setting to %b':
        'ustaw %setting na %b',
    'current %dates':
        'obecny %dates',
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
        '%audio mikrofonu',
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
        '%vid wideo na %self',
    'motion':
        'ruch',
    'snap':
        'zdj\u0119cie',
    'set video transparency to %n':
        'ustaw przezroczysto\u015B\u0107 wideo na %n',
    'video capture':
        'nagranie wideo',
    'mirror video':
        'wideo lustrzane',
    'filtered for %clr':
        'filtrowane dla %clr',
    'stack size':
        'rozmiar stosu',
    'frames':
        'klatki',
    'log pen vectors':
        'wektory pisaka',

    // wyrażenia:
    'sum':
        'suma',
    'product':
        'iloczyn',
    'minimum':
        'minimum',
    'maximum':
        'maksimum',
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
        'unicode z %s',
    'unicode %n as letter':
        'unicode %n jako litera',
    'is %s a %typ ?':
        '%s jest %typ ?',
    'is %s identical to %s ?':
        '%s identyczne z %s ?',
    'is %all== ?':
        '%all== ?',
    'identical to':
        'identyczne z',
    'all identical':
        'wszystko identyczne',
    'all <':
        'wszystko <',
    'all >':
        'wszystko >',
    'all \u2264':
        'wszystko \u2264',
    'all \u2265':
        'wszystko \u2265',
    'all =':
        'wszystko =',
    'neighbors \u2260':
        's\u0105siedzi \u2260',
    'JavaScript function ( %mult%s ) { %code }':
        'funkcja JavaScript ( %mult%s ) { %code }',
    'compile %repRing':
    	'kompiluj %repRing',

    'type of %s':
        'typ %s',

    // zmienne:
    'Make a variable':
        'Utw\u00F3rz zmienn\u0105',
    'Variable name':
        'Nazwa zmiennej',
    'Script variable name':
        'Nazwa zmiennej skryptu',
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

    // listy:
    'list %exp':
        'lista %exp',
    'numbers from %n to %n':
        'liczby od %n do %n',
    '%s in front of %l':
        'wstaw %s przed %l',
    'item %idx of %l':
        'element %idx z %l',
    'all but first of %l':
        '%l bez pierwszego',
    '%la of %l':
        '%la z %l',
    'rank':
        'ranga',
    'dimensions':
        'wymiary',
    'flatten':
        'sp\u0142aszczenie',
    'columns':
        'kolumny',
    'distribution':
        'rozk\u0142ad',
    'reverse':
        'odwr\u00F3cenie',
    'lines':
        'linie',
    '%l contains %s':
        '%l zawiera %s',
    'thing':
        'co\u015B',
    'is %l empty?':
        '%l jest pusta?',
    'index of %s in %l':
        'indeks %s w %l',
    'map %repRing over %l':
        'mapuj %repRing na %l',
    'keep items %predRing from %l':
        'zachowaj elementy %predRing z %l',
    'find first item %predRing in %l':
        'znajd\u017A pierwszy %predRing w %l',
    'combine %l using %repRing':
        'po\u0142\u0105cz %l u\u017Cywaj\u0105c %repRing',
    '%blitz map %repRing over %l':
        '%blitz mapuj %repRing na %l',
    '%blitz keep items %predRing from %l':
        '%blitz zachowaj elementy %predRing z %l',
    '%blitz find first item %predRing in %l':
        '%blitz znajd\u017A pierwszy %predRing w %l',
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
        'do\u0142\u0105cz %lists',
    'reshape %l to %nums':
        'przekszta\u0142\u0107 %l do %nums',
    'combinations %lists':
        'kombinacje %lists',
    'add %s to %l':
        'dodaj %s do %l',
    'delete %ida of %l':
        'usu\u0144 %ida z %l',
    'insert %s at %idx of %l':
        'wstaw %s na %idx pozycji z %l',
    'replace item %idx of %l with %s':
        'zamie\u0144 %idx z %l na %s',

    // inne
    'Make a block':
        'Utw\u00F3rz blok',

	'wardrobe':
		'kostiumy',
	'jukebox':
		'd\u017Awi\u0119ki',
	'save %imgsource as costume named %s':
		'zapisz %imgsource jako kostium %s',
	'screenshot':
		'zrzut ekranu',
	'stage image':
		'obraz sceny',
	'processes':
		'procesy',
	'yields':
		'wydajno\u015B\u0107',
	'show table %l':
		'poka\u017C tabel\u0119 %l',
	'%txtfun of %s':
		'%txtfun z %s',

    // menu
    // menu snap
    'About...':
        'O Snap!...',
    'Reference manual':
        'Podr\u0119cznik',
    'Snap! website':
        'Strona Snap!',
    'Download source':
        'Pobierz \u017Ar\u00F3d\u0142o',
    'Switch back to user mode':
        'Do trybu u\u017Cytkownika',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'wy\u0142\u0105cz menu kontekstowe\ndeep-Morphic\ni poka\u017C przyjazne dla u\u017Cytkownika',
    'Switch to dev mode':
        'Do trybu deweloperskiego',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'w\u0142\u0105z Morphic\nmenu kontekstowe\ni inspectors,\nniezbyt przyjazne dla u\u017Cytkownika!',

    // menu projektu
    'Notes...':
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
    'Restore unsaved project':
        'Przywr\u00F3\u0107 niezapisany projekt',
    'Clear backup':
        'Wyczy\u015B\u0107 kopi\u0119 zapasow\u0105',
    'Backup failed.\nThis cannot be undone, proceed anyway?':
        'Kopia zapasowa nie powiod\u0142a si\u0119.\nTego nie da si\u0119 cofn\u0105\u0107, kontynuowa\u0107 mimo to?',
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
    'Hide blocks...':
        'Ukryj bloki...',
    'New category...':
        'Nowa kategoria...',
    'Remove a category...':
        'Usu\u0144 kategori\u0119...',
    'Scenes...':
        'Sceny...',
    'New scene':
        'Nowa scena',
    'Add scene...':
        'Dodaj scen\u0119...',
    'Export summary...':
        'Eksportuj podsumowanie...',
    'save a summary\nof this project':
        'zapisz podsumowanie\ntego projektu',

    'export project media only...':
        'eksportuj tylko media projektu...',
    'export project without media...':
        'eksportuj projekt bez medi\u00F3w...',
    'export project as cloud data...':
        'eksportuj projekt jako dane w chmurze...',
    'open shared project from cloud...':
        'otw\u00F3rz udost\u0119pniony projekt z chmury...',
    'url...':
        'url...',
    'Export summary with drop-shadows...':
        'Eksportuj podsumowanie z cieniami...',
    'download and save\nwith a summary of this project\nwith drop-shadows on all pictures.\nnot supported by all browsers':
        'pobierz i zapisz\nz podsumowaniem tego projektu\nz cieniami na wszystkich obrazach.\nnie obs\u0142ugiwane przez wszystkie przegl\u0105darki',
    'specify the distance the hand has to move\nbefore it picks up an object':
        'okre\u015Bl odleg\u0142o\u015B\u0107, na jak\u0105 musi si\u0119\nprzesun\u0105\u0107 kursor zanim odbierze obiekt',

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

    // biblioteki
    'Import library':
        'Importuj bibliotek\u0119',
    'Loading':
        '\u0141adowanie',
    'Imported':
        'Zaimportowane',
    'Iteration, composition':
        'Iteracja, kompozycja',
    'List utilities':
        'Narz\u0119dzia listy',
    'Colors and Crayons':
        'Kolory i Kredki',
    'Crayons':
        'Kredki',
    'Multi-branched conditional':
        'Tryb wielowarunkowy',
    'Words, sentences':
        'S\u0142owa, zdania',
    'Catch errors':
        'Wychwytywanie b\u0142\u0119d\u00F3w',
    'Text to speech':
        'Tekst na mow\u0119',
    'Web services access (https)':
        'Dost\u0119p do us\u0142ug sieciowych (https)',

    // menu chmury
    'Login...':
        'Logowanie...',
    'Signup...':
        'Rejestracja...',
    'Logout':
        'Wyloguj',
    'Change Password...':
        'Zmie\u0144 Has\u0142o...',
    'Reset Password...':
        'Zresetuj Has\u0142o...',
    'Resend Verification Email...':
        'Wy\u015Blij Ponownie Email Weryfikacyjny...',
    'Open in Community Site':
        'Poka\u017C Stron\u0119 Projektu',

    // menu ustawień
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
        'Dynamiczne etykiety wej\u015B\u0107',
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

    'Input sliders':
        'Suwaki wej\u015Bciowe',
    'uncheck to disable\ninput sliders for\nentry fields':
        'odznacz, aby nie pozwoli\u0107 na suwaki w polach wej\u015Bciowych',
    'check to enable\ninput sliders for\nentry fields':
        'zaznacz, aby pozwoli\u0107 na suwaki w polach wej\u015Bciowych',

    'Clicking sound':
        'D\u017Awi\u0119k klikni\u0119cia',
    'uncheck to turn\nblock clicking\nsound off':
        'odznacz, aby wy\u0142\u0105czy\u0107\nd\u017Awi\u0119k klikni\u0119cia',
    'check to turn\nblock clicking\nsound on':
        'zaznacz, aby w\u0142\u0105czy\u0107\nd\u017Awi\u0119k klikni\u0119cia',
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

    'Keyboard Editing':
        'Edytowanie klawiatur\u0105',
    'Table support':
        'Obs\u0142uga tabel',
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

	'Flat line ends':
        'P\u0142askie ko\u0144ce linii',
    'check for flat ends of lines':
        'zaznacz, aby ko\u0144ce linii\nby\u0142y p\u0142askie',
    'uncheck for round ends of lines':
        'odznacz, aby ko\u0144ce linii\nby\u0142y zaokr\u0105glone',
    'Ternary Boolean slots':
        'Potr\u00F3jne wej\u015Bcia logiczne',
    'Camera support':
        'Obs\u0142uga kamery',
    'Inheritance support':
        'Obs\u0142uga dziedziczenia',

    'Retina display support':
        'Obs\u0142uga wy\u015Bwietlacza Retina',
    'uncheck for lower resolution,\nsaves computing resources':
        'odznacz, aby uzyska\u0107 ni\u017Csz\u0105 rozdzielczo\u015B\u0107\n(mniejsza moc obliczeniowa)',
    'check for higher resolution,\nuses more computing resources':
        'zaznacz, aby uzyska\u0107 wy\u017Csz\u0105 rozdzielczo\u015B\u0107,\n(wi\u0119ksza moc obliczeniowa)',
    'First-Class Sprites':
        'Duszki pierwszej klasy',
    'uncheck to disable support\nfor first-class sprites':
        'odznacz, aby wy\u0142\u0105czy\u0107 obs\u0142ug\u0119\nduszk\u00F3w pierwszej klasy',
    'check to enable support\n for first-class sprite':
        'zaznacz, aby w\u0142\u0105czy\u0107 obs\u0142ug\u0119\nduszk\u00F3w pierwszej klasy',
    'Live coding support':
        'Obs\u0142uga kodowania na \u017Cywo',
    'EXPERIMENTAL! check to enable\n live custom control structures':
        'EKSPERYMENTALNE! zaznacz, aby w\u0142\u0105czy\u0107\nniestandardowe struktury kontrolne na \u017Cywo',
    'EXPERIMENTAL! uncheck to disable live\ncustom control structures':
        'EKSPERYMENTALNE! odznacz, aby wy\u0142\u0105czy\u0107\nniestandardowe struktury kontrolne na \u017Cywo',
    'Persist linked sublist IDs':
        'Zachowaj identyfikatory po\u0142\u0105czonych podlist',
    'check to enable\nsaving linked sublist identities':
        'zaznacz, aby w\u0142\u0105czy\u0107 zapisywanie\nidentyfikator\u00F3w po\u0142\u0105czonych podlist',
    'uncheck to disable\nsaving linked sublist identities':
        'odznacz, aby wy\u0142\u0105czy\u0107 zapisywanie\nidentyfikator\u00F3w po\u0142\u0105czonych podlist',
    'Export all scripts as pic...':
        'Eksportuj wszystkie skrypty jako obraz...',
    'show a picture of all scripts\nand block definitions':
        'poka\u017C obraz wszystkich skrypt\u00F3w\ni definicji blok\u00F3w',
    'Sprite Nesting':
        'Zagnie\u017Cd\u017Canie duszk\u00F3w',
    'uncheck to disable\nsprite composition':
        'odznacz, aby wy\u0142\u0105czy\u0107\nkompozycj\u0119 duszk\u00F3w',
    'Single palette':
        'Pojedyncza paleta',
    'check to show all blocks in a single palette':
        'zaznacz, aby pokazywa\u0107\nwszystkie bloki w jednej palecie',
    'uncheck to show only the selected category\'s blocks':
        'odznacz, aby pokazywa\u0107\nbloki tylko z wybranych kategorii',
    'Show categories':
        'Poka\u017C kategorie',
    'uncheck to hide\ncategory names\nin the palette':
        'odznacz, aby ukryć\nnazwy kategorii\nw palecie',
    'check to show\ncategory names\nin the palette':
        'zaznacz, aby pokaza\u0107\nnazwy kategorii\nw palecie',
    'Show buttons':
        'Poka\u017C przyciski',
    'uncheck to hide buttons\nin the palette':
        'odznacz, aby ukry\u0107\nprzyciski w palecie',
    'check to show buttons\nin the palette':
        'zaznacz, aby pokaza\u0107\nprzyciski w palecie',
    'HSL pen color model':
        'Model HSL koloru pisaka',
     'uncheck to switch pen colors\nand graphic effects to HSV':
        'odznacz, aby prze\u0142\u0105czy\u0107\nkolory pisaka i efekty graficzne na HSV',
    'check to switch pen colors\nand graphic effects to HSL':
        'zaznacz, aby prze\u0142\u0105czy\u0107\nkolory pisaka i efekty graficzne na HSL',
    'Disable click-to-run':
        'Wy\u0142\u0105cz bezpo\u015Brednie uruchamianie',
    'uncheck to enable\ndirectly running blocks\nby clicking on them':
        'odznacz, aby w\u0142\u0105czy\u0107\nbezpo\u015Brednie uruchamianie blok\u00F3w\npoprzez klikni\u0119cie na nie',
    'check to disable\ndirectly running blocks\nby clicking on them':
        'zaznacz, aby wy\u0142\u0105czy\u0107\nbezpo\u015Brednie uruchamianie blok\u00F3w\npoprzez klikni\u0119cie na nie',
    'Disable dragging data':
        'Wy\u0142\u0105cz przeci\u0105ganie danych',
    'uncheck to drag media\nand blocks out of\nwatchers and balloons':
        'odznacz, aby przeci\u0105ga\u0107\nmedia i bloki\nz podgl\u0105d\u00F3w i dymk\u00F3w',
    'disable dragging media\nand blocks out of\nwatchers and balloons':
        'wy\u0142\u0105cz przeci\u0105ganie\nmedi\u00F3w i blok\u00F3w poza\npodgl\u0105dy zmiennych i dymki',
    'Rasterize SVGs':
        'Rasteryzuj grafik\u0119 SVG',
    'check to rasterize\nSVGs on import':
        'zaznacz, aby rasteryzowa\u0107 grafik\u0119 SVG\nprzy importowaniu plik\u00F3w',
    'Dragging threshold...':
        'Pr\u00F3g przeci\u0105gania...',
    'check for multi-column\nlist view support':
        'zaznacz dla obs\u0142ugi\nwidoku listy z wieloma kolumnami',
    'uncheck to disable\nmulti-column list views':
        'odznacz, aby wy\u0142\u0105czy\u0107\nwidok listy z wieloma kolumnami',
    'check for higher contrast\ntable views':
        'zaznacz dla wi\u0119kszego\nkontrastu widoku tabeli',
    'uncheck for less contrast\nmulti-column list views':
        'odznacz dla mniejszego kontrastu\nwidoku listy z wieloma kolumnami',

    'Hyper blocks support':
        'Obs\u0142uga hiperblok\u00F3w',
    'uncheck to disable\nusing operators on lists and tables':
         'odznacz, aby wy\u0142\u0105czy\u0107 u\u017Cywanie\nwyra\u017Ce\u0144 na listach i tabelach',
    'check to enable\nusing operators on lists and tables':
         'zaznacz, aby umo\u017Cliwi\u0107 u\u017Cywanien\nwyra\u017Ce\u0144 na listach i tabelach',
    'Log pen vectors':
        'Zapisuj wektory pisaka',
    'uncheck to turn off\nlogging pen vectors':
        'odznacz, aby wy\u0142\u0105czy\u0107\nzapisywanie wektor\u00F3w pisaka',
    'check to turn on\nlogging pen vectors':
        'zaznacz, aby w\u0142\u0105czy\u0107\nzapisywanie wektor\u00F3w pisaka',
    'Virtual keyboard':
        'Witualna klawiatura',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'odznacz, aby nie u\u017Cywa\u0107 klawiatury\nwirtualnej dla urzdze\u0144 mobilnych',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'zaznacz, aby u\u017Cywa\u0107 klawiatury\nwirtualnej dla urzdze\u0144 mobilnych',
    'Codification support':
        'Kodowanie blok\u00F3w',
    'check for block\nto text mapping features':
        'zaznacz, aby w\u0142\u0105czy\u0107 funkcj\u0119\nmapowania blok\u00F3w na tekst',
    'check for alternative\nGUI design':
        'zaznacz, aby prze\u0142\u0105czy\u0107\nna alternatywny wygl\u0105d GUI',
    'uncheck for default\nGUI design':
        'odznacz, aby przywr\u00F3ci\u0107\nnormalny wygl\u0105d GUI',
    'Prefer smooth animations':
        'Preferuj g\u0142adkie animacje',
    'uncheck for greater speed\nat variable frame rates':
        'odznacz, aby pozwoli\u0107na\nwi\u0119ksz pr\u0119dko\u015B\u0107 ramek animacji',
    'check for smooth, predictable\nanimations across computers':
        'zaznacz, aby zapewni\u0107na\njednakowe, g\u0142adkie animacje',


    // wejścia
    'with inputs':
        'z wej\u015Bciami',
    'input names:':
        'nazwy wej\u015B\u0107:',
    'Input Names:':
        'Nazwy Wej\u015B\u0107:',
    'input list:':
        'lista wej\u015Bciowa:',

    // menu kontekstowe:
    'help':
        'pomoc',

    // paleta:
    'find blocks':
        'znajd\u017A bloki',
    'hide blocks...':
        'ukryj bloki...',
    'Hide blocks in palette':
        'Ukryj bloki w palecie',
    'unused':
        'nieu\u017Cywane',
    'make a category...':
        'utw\u00F3rz kategori\u0119...',
    'New Category':
        'Nowa Kategoria',
    'Blocks category name:':
        'Nazwa kategorii blok\u00F3w:',
    'Category color':
        'Kolor kategorii',
    'red':
        'czerwony',
    'green':
        'zielony',
    'blue':
        'niebieski',
    'delete a category...':
        'usu\u0144 kategori\u0119...',

    // bloki:
    'help...':
        'pomoc...',
    'relabel...':
        'zamie\u0144...',
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
        'obraz skryptu...',
    'save a picture\nof this script':
        'zapisz obraz\ntego skryptu',
    'result pic...':
        'obraz wyniku...',
    'save a picture of both\nthis script and its result':
        'zapisz obraz zar\u00F3wno\ntego skryptu, jak i jego wyniku',
    'ringify':
        'na\u0142\u00F3\u017C pier\u015Bcie\u0144',
    'unringify':
        'zdejmij pier\u015Bcie\u0144',
    'transient':
        'przej\u015Bciowa',
    'uncheck to save contents\nin the project':
        'odznacz, aby zapisa\u0107\nzawarto\u015B\u0107 w projekcie',
    'check to prevent contents\nfrom being saved':
        'zaznacz, aby zapobiec\nzapisaniu zawarto\u015Bci',
    'new line':
        'nowa linia',
    'open a new window\nwith a picture of this script':
        'otw\u00F3rz nowe okno\nz obrazem tego skryptu',

    // bloki niestandardowe:
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
    'Same Named Blocks':
        'Bloki o tej samej nazwie',
    'Another custom block with this name exists.\n':
        'Istnieje inny blok niestandardowy o tej nazwie.\n',
    'Would you like to replace it?':
        'Czy chcia\u0142by\u015B go zast\u0105pi\u0107?',
    'Local Block(s) in Global Definition':
        'Lokalne Bloki w Globalnej Definicji',
    'This global block definition contains one or more\nlocal custom blocks which must be removed first.':
        'Ta globalna definicja bloku zawiera jeden lub wi\u0119cej\nlokalnych blok\u00F3w, kt\u00F3re musz\u0105 by\u0107 najpierw usuni\u0119te',

    // duszki:
    'edit':
        'edytuj',
    'clone':
        'klonuj',
    'move':
        'przesu\u0144',
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
        'rodzic...',
    'current parent':
        'aktualny rodzic',
    'release':
        'wydanie',
    'make temporary and\nhide in the sprite corral':
        'stw\u00F3rz tymczasowego\ni ukryj ikon\u0119',
    '(temporary)':
        '(tymczasowy)',

    // scena:
    'show all':
        'poka\u017C wszystko',
    'pic...':
        'obraz...',
    'save a picture\nof the stage':
        'zapisz obraz\nsceny',
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

    // obszar skryptów
    'clean up':
        'wyczy\u015B\u0107',
    'arrange scripts\nvertically':
        'ustaw skrypty w pionie',
    'add comment':
        'dodaj komentarz',
    'undrop':
        'cofnij',
    'undo the last\nblock drop\nin this pane':
        'cofnij ostatnie upuszczenie\nbloku na tej palecie',
	'redrop':
        'pon\u00F3w',
    'use the keyboard\nto enter blocks':
    	'u\u017Cyj klawiatury,\naby wprowadzi\u0107 bloki',
	'scripts pic...':
        'obraz skrypt\u00F3w...',
    'save a picture\nof all scripts':
        'zapisz obraz\nwszystkich skrypt\u00F3w',
    'make a block...':
        'utw\u00F3rz blok...',

    // kostiumy
    'rename':
        'zmie\u0144 nazw\u0119',
    'export':
        'eksportuj',
    'rename costume':
        'zmie\u0144 nazw\u0119 kostiumu',
    'rename background':
        'zmie\u0144 nazw\u0119 t\u0142a',
    'pen':
        'pisak',
    'tip':
        'ko\u0144c\u00F3wka',
    'middle':
        '\u015Brodek',

    // dźwięki
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

    // listy i tabele
    'list view...':
        'widok listy...',
    'table view...':
        'widok tabeli...',
    'Table view':
        'Widok tabeli',
    'open in dialog...':
        'otw\u00F3rz w oknie dialogowym',
    'open in another dialog...':
        'otw\u00F3rz w innym oknie...',
    'blockify':
        'jako blok',
    'reset columns':
        'zresetuj szeroko\u015B\u0107 kolumn',
    'items':
        'elementy',
    '(in a new window)':
        '(w nowym oknie)',

    // okna dialogowe
    // przyciski
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

    // pomoc
    'Help':
        'Pomoc',

    // rozmiar bloków
    'Zoom blocks':
        'Rozmiar blok\u00F3w',
    'build':
        'zbuduj',
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

    // przygaś bloki
    'Fade blocks':
        'Przyga\u015B bloki',
    'block-solid (0)':
        'normalne (0)',
    'medium (50)':
        '\u015Brednie (50)',
    'light (70)':
        'jasne (70)',
    'shimmering (80)':
        'l\u015Bni\u0105ce (80)',
    'elegant (90)':
        'eleganckie (90)',
    'subtle (95)':
        'subtelne (95)',
    'text-only (100)':
        'tylko tekst (100)',

    // Menadżer projektów
    'find blocks...':
        'znajd\u017A bloki...',
    'Snap!Cloud':
        'Chmura Snap!',
    'Cloud':
        'Chmura',
    'could not connect to:':
        'chmura nie po\u0142\u0105czona z:',
    'Service:':
        'Serwis:',
    'login':
        'zaloguj si\u0119',
    'ERROR: INVALID PASSWORD':
        'B\u0141\u0104D: NIEPRAWID\u0141OWE HAS\u0141O',
    'Browser':
        'Przegl\u0104darka',
    'Sign up':
        'Wyloguj si\u0119',
    'Sign in':
        'Zaloguj si\u0119',
    'Change Password':
        'Zmie\u0144 has\u0142o',
    'Account created.':
        'Konto stworzone.',
    'An e-mail with your password\nhas been sent to the address provided':
        'E-mail z has\u0142em\nzosta\u0142 wys\u0142any na podany adres',
    'now connected.':
        'po\u0142\u0105czono.',
    'disconnected.':
        'po\u0142\u0105czenie przerwane.',
    'saved.':
        'zapisano.',
    'Reset password':
        'Zresetuj has\u0142o',
    'User name:':
        'Nazwa u\u017Cytkownika:',
    'Password:':
        'Has\u0142o:',
    'Old password:':
        'Stare has\u0142o:',
    'New password:':
        'Nowe has\u0142o:',
    'Repeat new password:':
        'Powt\u00F3rz nowe has\u0142o:',
    'Birth date:':
        'Data urodzenia:',
    'January':
        'Stycze\u0144',
    'February':
        'Luty',
    'March':
        'Marzec',
    'April':
        'Kwiecie\u0144',
    'May':
        'Maj',
    'June':
        'Czerwiec',
    'July':
        'Lipiec',
    'August':
        'Siepie\u0144',
    'September':
        'Wrzesie\u0144',
    'October':
        'Pa\u017Adziernik',
    'November':
        'Listopad',
    'December':
        'Grudzie\u0144',
    'year:':
        'rok:',
    ' or before':
        ' lub wcze\u015Bniej',
    'E-mail address:':
        'Adres email:',
    'E-mail address of parent or guardian:':
        'Adres email rodzica lub opiekuna:',
    'Terms of Service...':
        'Warunki us\u0142ugi...',
    'Privacy...':
        'Prywatno\u015B\u0107...',
    'I have read and agree\nto the Terms of Service':
        'Przeczyta\u0142em i akceptuj\u0119\nWarunki us\u0142ugi',
    'stay signed in on this computer\nuntil logging out':
        'pozosta\u0144 zalogowany na tym komputerze\na\u017C do wylogowania',
    'please fill out\nthis field':
        'wype\u0142nij to pole',
    'User name must be four\ncharacters or longer':
        'Nazwa u\u017Cytkownika musi sk\u0142ada\u0107 si\u0119\nz czterech znak\u00F3w lub wi\u0119cej',
    'please provide a valid\nemail address':
        'podaj prawid\u0142owy\nadres email',
    'password must be six\ncharacters or longer':
        'has\u0142o musi zawiera\u0107\nsze\u015B\u0107 znak\u00F3w lub wi\u0119cej',
    'passwords do\nnot match':
        'has\u0142a\nnie s\u0105 zgodne',
    'please agree to\nthe TOS':
        'zapoznaj si\u0119\nz Regulaminem',
    'Computer':
        'Komputer',
    'You are not logged in':
        'Nie zalogowa\u0142e\u015B si\u0119',
    'Opening project...':
        'Otwieranie projektu...',
    'Fetching project\nfrom the cloud...':
        'Wczytywanie projektu\nz chmury...',
    'Saving project\nto the cloud...':
        'Zapisywanie projektu\nw chmurze',
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
        'zmie\u0144 nazw\u0119...',
    'Recover':
        'Odzyskaj',
    'Today':
        'Dzisiaj',
    'Yesterday':
        'Wczoraj',
    'last changed':
        'ostatnio zmieniony',
    'Share Project':
        'Udost\u0119pnij Projekt',
    'Unshare Project':
        'Przerwij Udost\u0119pnianie Projektu',
    'sharing\nproject...':
        'udost\u0119pnianie\nprojektu...',
    'unsharing\nproject...':
        'przerywanie\nudost\u0119pniania projektu...',
    'shared.':
        'udost\u0119pniono.',
    'unshared.':
        'udost\u0119pnianie przerwane.',
    'Are you sure you want to unshare':
        'Czy na pewno chcesz przerwa\u0107 udost\u0119pnianie',
    'Are you sure you want to share':
        'Czy na pewno chcesz udost\u0119pni\u0107 projekt',
    'Publish Project':
        'Opublikuj Projekt',
    'publishing\nproject...':
        'publikowanie\nprojektu...',
    'published.':
        'opublikowano.',
    'Are you sure you want to publish':
        'Czy na pewno chcesz opublikowa\u0107 projekt',
    'Unpublish Project':
        'Cofnij Publikacj\u0119 Projektu',
    'unpublishing\nproject...':
        'cofanie publikacji\nprojektu...',
    'unpublished.':
        'cofni\u0119to publikacj\u0119.',
    'Are you sure you want to unpublish':
        'Czy na pewno chcesz cofn\u0105\u0107 publikacj\u0119',
    'Replace Project':
        'Zamie\u0144 Projekt',
    'Are you sure you want to replace':
        'Czy na pewno chcesz zamieni\u0107 projekt',
    'password has been changed.':
        'has\u0142o zosta\u0142o zmienione.',

    'Examples':
        'Przyk\u0142ady',
    'Share':
        'Udost\u0119pnij',
    'Unshare':
        'Przerwij udost\u0119pnianie',
    'Publish':
        'Opublikuj',
    'Unpublish':
        'Cofnij publikacj\u0119',
    'Updating\nproject list...':
        'Aktualizowanie\nlisty projekt\u00F3w...',


    // edytor kostiumów
    'Costume Editor':
        'Edytor Kostium\u00F3w',
    'Paint Editor':
        'Edytor Grafiki',
    'click or drag crosshairs to move the rotation center':
        'kliknij lub przeci\u0105gnij krzy\u017Cyk, aby przesun\u0105\u0107 \u015Brodek obrotu',
    'undo':
        'cofnij',
    'Vector':
        'Wektor',
    'Bitmap':
        'Bitmapa',
    'Paintbrush tool\n(free draw)':
        'P\u0119dzel\n(swobodne rysowanie)',
    'Stroked Rectangle\n(shift: square)':
        'Prostokąt z obrysem\n(shift: kwadrat)',
    'Stroked Ellipse\n(shift: circle)':
        'Elipsa z obrysem\n(shift: okr\u0105g)',
    'Eraser tool':
        'Gumka',
    'Set the rotation center':
        'Ustaw \u015Brodek obrotu',
    'Line tool\n(shift: vertical/horizontal)':
        'Linia\n(shift: pionowa/pozioma)',
    'Filled Rectangle\n(shift: square)':
        'Wype\u0142niony Prostok\u0105t\n(shift: kwadrat)',
    'Filled Ellipse\n(shift: circle)':
        'Wype\u0142niona Elipsa\n(shift: ko\u0142o)',
    'Fill a region':
        'Wype\u0142nij obszar',
    'Pipette tool\n(pick a color anywhere)':
        'Pipeta\n(wybierz kolor gdziekolwiek)',
    'Brush size':
        'Rozmiar p\u0119dzla',
    'Constrain proportions of shapes?\n(you can also hold shift)':
        'Zachowaj proporcje kszta\u0142t\u00F3w\n(mo\u017Cesz te\u017C przytrzyma\u0107 shift)',
    'grow':
        'zwi\u0119ksz',
    'shrink':
        'zmniejsz',
    'flip horizontal':
        'przerzu\u0107 w poziomie',
    'flip vertical':
        'przerzu\u0107 w pionie',

    'Vector Paint Editor':
        'Edytor Grafiki Wektorowej',
    'Rectangle\n(shift: square)':
        'Prostok\u0105t\n(shift: kwadrat)',
    'Ellipse\n(shift: circle)':
        'Elipsa\n(shift: okr\u0105g)',
    'Selection tool':
        'Narz\u0119dzie do zaznaczania',
    'Line tool\n(shift: constrain to 45º)':
        'Linia\n(shift: zw\u0119\u017Cenie do 45°)',
    'Closed brush\n(free draw)':
        'P\u0119dzel zamykaj\u0105cy\n(swobodne rysowanie)',
    'Polygon':
        'Wielok\u0105t',
    'Paint a shape\n(shift: edge color)':
        'Wype\u0142nij kszta\u0142t\n(shift: kolor linii)',
    'Pipette tool\n(pick a color from anywhere\nshift: fill color)':
        'Pipeta\n(wybierz kolor klikaj\u0105c gdziekolwiek\nshift: kolor wype\u0142nienia)',
    'Edge color\n(left click)':
        'Kolor linii\n(lewy przycisk myszy)',
    'Fill color\n(right click)':
        'Kolor wype\u0142nienia\n(prawy przycisk myszy)',
    'Top':
        'Wierzch',
    'Bottom':
        'Sp\u00F3d',
    'Up':
        'G\u00F3ra',
    'Down':
        'D\u00F3\u0142',
    'This will erase your current drawing.\nAre you sure you want to continue?':
        'Spowoduje to usuni\u0119cie bie\u017C\u0105cego rysunku.\nCzy na pewno chcesz kontynuowa\u0107?',
    'Switch to vector editor?':
        'Prze\u0142\u0105czy\u0107 na edytor wektorowy?',
    'This will convert your vector objects into\nbitmaps, and you will not be able to convert\nthem back into vector drawings.\nAre you sure you want to continue?':
        'Spowoduje to konwersj\u0119 obiekt\u00F3w wektorowych na mapy bitowe,\ni nie b\u0119dzie mo\u017Cna przekonwertowa\u0107 ich z powrotem na obrazy wektorowe.\nCzy na pewno chcesz kontynuowa\u0107?',
    'Convert to bitmap?':
        'Przekonwertowa\u0107 na bitmap\u0119?',


    // Notatki do projektu
    'Notes':
        'Opis projektu',

    // nowy projekt
    'New Project':
        'Nowy projekt',
    'Unsaved Changes!':
        'Niezapisane zmiany!',
    'Replace the current project with a new one?':
        'Zast\u0105pi\u0107 aktualny projekt przez nowy?',
    'Backup failed.\nThis cannot be undone, proceed anyway?':
        'Kopia zapasowa nie jest mo\u017Cliwa.\nCzy mimo to kontynuowa\u0107?',

    // zapisywanie projektu
    'Save Project As...':
        'Zapisz projekt jako...',
    'Save Project':
        'Zapisz projekt',

    // eksportuj bloki
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

    // okno zmiennych
    'for all sprites':
        'dla wszystkich duszk\u00F3w',
    'for this sprite only':
        'tylko dla tego duszka',

    // refaktoryzacja zmiennych
    'rename only\nthis reporter':
        'zmie\u0144 nazw\u0119\ntylko tej zmiennej',
    'rename all...':
        'zmie\u0144 nazw\u0119 wszystkich...',
    'rename all blocks that\naccess this variable':
        'zmie\u0144 nazw\u0119 wszystkich blok\u00F3w,z nazw\u0105 tej zmiennej',


    // okno bloku
    'Change block':
        'Zmie\u0144 blok',
    'Command':
        'Polecenie',
    'Reporter':
        'Funkcja',
    'Predicate':
        'Predykat',

    // edytor bloku
    'Block Editor':
        'Edytor Bloku',
    'Method Editor':
        'Edytor Metody',
	'Apply':
        'Zastosuj',
    'block variables...':
        'zmienne bloku...',
    'remove block variables...':
        'usu\u0144 zmienne bloku...',
    'block variables':
        'zmienne bloku',

    // okno usuwania bloków
    'Delete Custom Block':
        'Usu\u0144 Blok',
    'block deletion dialog text':
        'Czy na pewno usun\u0105\u0107 ten blok\n' +
            'ze wszystkimi wyst\u0105pieniami?',

    // dialog wejścia
    'Create input name':
        'Utw\u00F3rz nazw\u0119 wej\u015Bcia',
    'Edit input name':
        'Edytuj nazw\u0119 wej\u015Bcia',
    'Edit label fragment':
        'Edytuj fragment etykiety',
    'Title text':
        'Tekst tytu\u0142owy',
    'Input name':
        'Nazwa wej\u015Bcia',
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
        'Dowolny typ',
    'Boolean (T/F)':
        'Logiczny (P/F)',
    'Command\n(inline)':
        'Polecenie\n(\u015Br\u00F3dliniowe)',
    'Command\n(C-shape)':
        'Polecenie\n(C-kszta\u0142tne)',
    'Any\n(unevaluated)':
        'Dowolny\n(nieoceniane)',
    'Boolean\n(unevaluated)':
        'Logiczny\n(nieoceniane)',
    'Single input.':
        'Jedno wej\u015Bcie',
    'Default Value:':
        'Warto\u015B\u0107 domy\u015Blna:',
    'Multiple inputs (value is list of inputs)':
        'Wiele wej\u015B\u0107 (jako lista)',
    'Upvar - make internal variable visible to caller':
        'Wewn\u0119trzna zmienna widoczna dla wywo\u0142ywacza',
    'options':
        'opcje',
    'read-only':
        'tylko odczyt',
    'menu':
        'menu',
    'special':
        'specjalne',
    'Input Slot Options':
        'Opcje Gniazda Wej\u015Bciowego',

    // O Snap!
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
        'aktualne wersje modu\u0142\u00F3w',
    'Contributors':
        'Wsp\u00F3\u0142tw\u00F3rcy',
    'Translations':
        'T\u0142umaczenia',

    // wyświetlane zmienne
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

    // wyświetlane listy
    'length: ':
        'd\u0142ugo\u015B\u0107: ',

    // komentarze
    'add comment here...':
        'dodaj komentarz tutaj...',
    'comment pic...':
        'obraz komentarza',
    'save a picture\nof this comment':
        'zapisz obraz\ntego komentarza',

    // listy rozwijane
    // kierunki
    '(90) right':
        '(90) prawo',
    '(-90) left':
        '(-90) lewo',
    '(0) up':
        '(0) g\u00F3ra',
    '(180) down':
        '(180) d\u00F3\u0142',
    'random':
    	'losowy',
     'random position':
     	'losowa pozycja',

    // wykrywanie kolizji
    'mouse-pointer':
        'wska\u017Anik myszy',
    'edge':
        'kraw\u0119d\u017A',
    'pen trails':
        '\u015Blady pisaka',
    'center':
        '\u015Brodek',

    // kostiumy
    'Turtle':
        '\u017B\u00F3\u0142w',
    'Empty':
        'Pusty',
    'Paint a new costume':
        'Namaluj nowy kostium',
    'Import a new costume from your webcam':
        'Nowy kostium z kamery',
    'Camera':
        'Kamera',

    // dźwięki
    'Record a new sound':
        'Nagraj nowy d\u017Awi\u0119k',


    // efekty graficzne, kolory pisaka
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

    // klawisze
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
        'dowolny',
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

    // wiadomości
    'new...':
        'nowa...',

    // funkcje matematyczne
    'abs':
        'warto\u015B\u0107 bezwzgl\u0119dna',
    'ceiling':
        'sufit',
	'floor':
        'pod\u0142oga',
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

    // Wprowadzanie wyrażeń logicznych z klawiatury
    'not':
        'nie',

    // ograniczniki
    'letter':
        'litery',
    'word':
        's\u0142owa',
    'whitespace':
        'spacje',
    'line':
        'linie',
    'tab':
        'tabulatory',
    'cr':
        'ko\u0144ce linii',

    // typy danych
    'number':
        'liczba',
    'text':
        'tekst',
    'Boolean':
        'logiczna',
    'list':
        'lista',
    'command':
        'polecenie',
    'reporter':
        'funkcja',
    'predicate':
        'predykat',
    'sprite':
        'duszek',
	'sound':
        'd\u017Awi\u0119k',
    'ring':
        'pier\u015Bcie\u0144',

    // indeksy listy
    'last':
        'ostatni',
    'any':
        'dowolny',

    // właściwości
    'my':
        'w\u0142a\u015Bciwo\u015Bci',
    'neighbors':
        's\u0105siedzi',
    'self':
        'ja',
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
        'dzieci',
    'clones':
        'klony',
    'other clones':
        'inne klony',
    'dangling?':
        'zawieszony?',
    'draggable?':
        'przeci\u0105galny?',
    'rotation style':
        'styl obrotu',
    'rotation x':
        'obr\u00F3t x',
    'rotation y':
        'obr\u00F3t y',
    'center x':
        '\u015Brodek x',
    'center y':
        '\u015Brodek y',
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
    'categories':
        'kategorie',
    'width':
        'szeroko\u015B\u0107',
    'height':
        'wysoko\u015B\u0107',
    'left':
        'lewa',
    'right':
        'prawa',
    'top':
        'g\u00F3ra',
    'bottom':
        'd\u00F3\u0142',

    // właściwości w rozwijanym menu bloku USTAW
    'my anchor':
        'kotwica',
    'my parent':
        'rodzic',
    'my name':
        'nazwa',
    'my temporary?':
        'tymczasowy?',
    'my dangling?':
        'zawieszony?',
    'my draggable?':
        'przeci\u0105galny?',
    'my rotation style':
        'styl obrotu',
    'my rotation x':
        'obr\u00F3t x',
    'my rotation y':
        'obr\u00F3t y',

    // dziedziczenie
    'inherited':
        'odziedziczone',
    'check to inherit\nfrom':
        'zaznacz, aby dziedziczy\u0107\nod',
    'uncheck to\ndisinherit':
        'odznacz, aby\nnie dziedziczy\u0107',

    // edycja gniazd w wejściach variadic
    'insert a slot':
        'wstaw gniazdo',
    'delete slot':
        'usu\u0144 gniazdo',
    'insert a variable':
        'wstaw zmienn\u0105',
    'delete variable':
        'usu\u0144 zmienn\u0105',
    'variable':
        'zmienna',

    // kodowanie bloków
    'map %cmdRing to %codeKind %code':
        'mapuj %cmdRing na %codeKind %code',
    'map %mapValue to code %code':
        'mapuj %mapValue na kod %code',
    'map %codeListPart of %codeListKind to code %code':
        'mapuj %codeListPart z %codeListKind na kod %code',
    'code of %cmdRing':
        'kod %cmdRing',
    'delimiter':
        'ogranicznik',
    'collection':
        'zbi\u00F3r',
    'variables':
        'zmienne',
    'parameters':
        'parametry',
    'code':
        'kod',
    'header':
        'nag\u0142\u00F3wek',
    'String':
        'Ci\u0105g',
    'header mapping...':
        'mapowanie nag\u0142\u00F3wka...',
    'code mapping...':
        'mapowanie kodu...',
    'Code mapping':
        'Mapowanie kodu',
    'Header mapping':
        'Mapowanie nag\u0142\u00F3wka',
};
