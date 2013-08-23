/*

    lang-pl.js

    Polskie tłumaczenie SNAP!

    Podziękowania dla Jensa Möniga

    za przygotowanie mechanizmu tłumaczenia

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
	Ń, ń	\u0143, \u0144
	Ś, ś	\u015A, \u015B
	Ó, ó	\u00D3, \u00F3
	Ź, ź	\u0179,	\u017A
	Ż, ż	\u017B, \u017C
	
*/

    // translations meta information
    'language_name':
        'Polski', // the name as it should appear in the language menu
    'language_translator':
        'Witek Kranas', // your name for the Translators tab
    'translator_e-mail':
        'witek@oeiizk.waw.pl', // optional
    'last_changed':
        '2013-08-05', // this, too, will appear in the Translators tab

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
        'dowolny obrót',
    'only face left/right':
        'tylko lewo/prawo',

    // new sprite button:
    'add a new sprite':
        'dodaj nowego duszka',

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
        'Wybrana scena\nnie ma blok\u00F3w ruchu',

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
        'nast\u0118pny kostium',
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
        'Hallo!',
    'Hmm...':
        'Hmm...',
    'change %eff effect by %n':
        'zmie\u0144 efekt %eff o %n',
    'set %eff effect to %n':
        'ustaw efekt %eff na %n',
    'clear graphic effects':
        'wyczy\u015B\u0107 efekty graficzne',
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
    'go to front':
        'na wierzch',
    'go back %n layers':
        'wr\u00F3\u0107 o %n poziom\u00F3w',

    'development mode \ndebugging primitives:':
        'tryb budowania \ndebugowanie procedur pierwotnych',
    'console log %mult%s':
        'log konsoli: %mult%s',
    'alert %mult%s':
        'alert: %mult%s',

    // dzwiek:
    'play sound %snd':
        'zagraj d\u017Awi\u0119k %snd',
    'play sound %snd until done':
        'zagraj d\u017Awi\u0119k %snd i czekaj',
    'stop all sounds':
        'zatrzymaj wszystkie d\u017Awi\u0119ki',
    'rest for %n beats':
        'pauzuj przez %n takt\u00F3w',
    'play note %n for %n beats':
        'zagraj nut\u0119 %n przez %n takt\u00F3w',
    'change tempo by %n':
        'zmie\u0144 tempo o %n',
    'set tempo to %n bpm':
        'ustaw tempo na %n takt\u00F3w na min.',
    'tempo':
        'tempo',

    // pisak:
    'clear':
        'wyczy\u015B\u0107',
    'pen down':
        'przy\u0142\u00F3\u017C pisak',
    'pen up':
        'podnie\u015B pisak',
    'set pen color to %clr':
        'ustaw kolor piaka na %clr',
    'change pen color by %n':
        'zmie\u0144 kolor pisaka o %n',
    'set pen color to %n':
        'ustaw kolor pisaka na %n',
    'change pen shade by %n':
        'zmie\u0144 odcie\u0144 pisaka o %n',
    'set pen shade to %n':
        'ustaw odcie\u0144 pisaka na %n',
    'change pen size by %n':
        'zmie\u0144 rozmiar pisaka o %n',
    'set pen size to %n':
        'ustaw rozmiar pisaka na %n',
    'stamp':
        'stempluj',

    // control:
    'when %greenflag clicked':
        'kiedy klikni\u0119to %greenflag',
    'when %keyHat key pressed':
        'kiedy klawisz %keyHat naci\u015Bni\u0119ty',
    'when I am clicked':
        'kiedy duszek klikni\u0119ty',
    'when I receive %msgHat':
        'kiedy otrzymam %msgHat',
    'broadcast %msg':
        'nadaj %msg do wszystkich',
    'broadcast %msg and wait':
        'nadaj %msg do wszystkich i czekaj',
    'Message name':
        'nazwa wiadomo\u015Bci',
    'message':
        'wiadomo\u015B\u0107',
    'any message':
        'dowolna wiadomo\u015B\u0107',
    'wait %n secs':
        'czekaj %n s',
    'wait until %b':
        'czekaj a\u017C %b',
    'forever %c':
        'zawsze %c',
    'repeat %n %c':
        'powt\u00F3rz %n razy %c',
    'repeat until %b %c':
        'powtarzaj a\u017C %b %c',
    'if %b %c':
        'je\u017Celi %b to %c',
    'if %b %c else %c':
        'je\u017Celi %b to %c w przeciwnym razie %c',
    'report %s':
        'zwr\u00F3\u0107 %s',
    'stop block':
        'zatrzymaj ten blok',
    'stop script':
        'zatrzymaj ten skrypt',
    'stop all %stop':
        'zatrzymaj wszystko %stop',
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
        'warp %c',
    'when I start as a clone':
        'kiedy zaczynam jako klon',
    'create a clone of %cln':
        'sklonuj %cln',
    'myself':
        'ja',
    'delete this clone':
        'usu\u0144 tego klona',

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
        'przycisk myszy naci\u015Bni\u0119ty',
    'key %key pressed?':
        'klawisz %key naci\u015Bni\u0119ty?',
    'distance to %dst':
        'odleg\u0142o\u015B\u0107 do %dst',
    'reset timer':
        'kasuj zegar',
    'timer':
        'czasomierz',
    '%att of %spr':
        '%att z %spr',
    'http:// %s':
        'http:// %s',
    'turbo mode?':
        'tryb turbo?',
    'set turbo mode to %b':
        'ustaw tryb turbo na %b',

    'filtered for %clr':
        'przefiltrowane dla %clr',
    'stack size':
        'rozmiar stosu',
    'frames':
        'klatki',

    // operators:
    '%n mod %n':
        '%n modulo %n',
    'round %n':
        'zaokr\u0105glij %n',
    '%fun of %n':
        '%fun z %n',
    'pick random %n to %n':
        'losuj od %n do %n',
    '%b and %b':
        '%b i %b',
    '%b or %b':
        '%b lub %b',
    'not %b':
        'nie %b',
    'true':
        'prawda',
    'false':
        'fa\u0142sz',
    'join %words':
        'po\u0142\u0105cz %words',
    'hello':
        'Hallo',
    'world':
        's\u0142owo',
    'letter %n of %s':
        'litera %n z %s',
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

    'type of %s':
        'typ %s',

    // variables:
    'Make a variable':
        'Stw\u00F3rz zmienn\u0105',
    'Variable name':
        'nazwa zmiennej',
    'Script variable name':
        'nazwa zmiennej skryptu',
    'Delete a variable':
        'usu\u0144 zmienn\u0105',

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
    '%s in front of %l':
        'wstaw %s przed %l',
    'item %idx of %l':
        'element %idx z %l',
    'all but first of %l':
        'bez pierwszego z %l',
    'length of %l':
        'd\u0142ugo\u015B\u0107 %l',
    '%l contains %s':
        '%l zawiera %s',
    'thing':
        'co\u015B',
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
        'nowy blok',

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
        'disable Morphic',
    'Switch to dev mode':
        'do trybu budowania',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'enable Morphic',

    // project menu
    'Project notes...':
        'O projekcie...',
    'New':
        'Nowy',
    'Open...':
        'Otw\u00F3rz...',
    'Save':
        'Zapisz',
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
    'Export project...':
        'Eksportuj projekt...',
    'show project data as XML\nin a new browser window':
        'poka\u017C projekt jako XML\nin w nowej karcie',
    'Export blocks...':
        'Eksportuj bloki...',
    'show global custom block definitions as XML\nin a new browser window':
        'poka\u017C definicje blok\u00F3w jako XML/min w nowej karcie',
    'Import tools':
        'Importuj narz\u0119dzia',
    'load the official library of\npowerful blocks':
        'za\u0142aduj oficjaln\u0105 bibliotek\u0119 blok\u00F3w',
    'Libraries...':
        'Biblioteka...',
    'Import library':
        'Importuj bibliotek\u0119',

    // cloud menu
    'Login...':
        'Logowanie...',
    'Signup...':
        'Rejestracja...',

    // settings menu
    'Language...':
        'J\u0119zyk...',
    'Zoom blocks...':
        'Powi\u0119ksz bloki...',
    'Blurred shadows':
        'Rozmyte cienie',
    'uncheck to use solid drop\nshadows and highlights':
        'Odznacz, aby uzyska\u0107\nmocne cienie i granice',
    'check to use blurred drop\nshadows and highlights':
        'Zaznacz, aby uzyska\u0107\rozmyte cienie i granice',
    'Zebra coloring':
        'Kolorowanie zebr\u0105',
    'check to enable alternating\ncolors for nested blocks':
        'zaznacz, aby pozowli\u0107 na zmian\u0119\nbarw zagnie\u017Cd\u017Conych blok\u00F3w',
    'uncheck to disable alternating\ncolors for nested block':
        'odznacz, aby nie pozowli\u0107 na zmian\u0119\nbarw zagnie\u017Cd\u017Conych blok\u00F3w',
    'Dynamic input labels':
        'Dynamiczne opisy parametr\u00F3w',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'odznacz to disable dynamic\nlabels for variadic inputs',
    'check to enable dynamic\nlabels for variadic inputs':
        'zaznacz to enable dynamic\nlabels for variadic inputs',
    'Prefer empty slot drops':
        'Preferuj empty slot drops',
    'settings menu prefer empty slots hint':
        'menu ustawie\u0144 prefer empty slots hint',
    'uncheck to allow dropped\nreporters to kick out others':
        'odznacz to allow dropped\nreporters to kick out others',
    'Long form input dialog':
        'D\u0142uga forma dialogu wej\u015Bcia',
    'check to always show slot\ntypes in the input dialog':
        'zaznacz to always show slot\ntypes in the input dialog',
    'uncheck to use the input\ndialog in short form':
        'odznacz to use the input\ndialog in short form',
    'Virtual keyboard':
        'Witualna klawiatura',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'odznacz, aby nie u\u017Cywa\u0107 klawiatury\nwirtualnej dla urzdze\u0144 mobilnych',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'zaznacz, aby u\u017Cywa\u0107 klawiatury\nwirtualnej dla urzdze\u0144 mobilnych',
    'uncheck to disable\ninput sliders for\nentry fields':
        'odznacz, aby nie pozwoli\u0107 na suwaki w polach wej\u015Bciowych',
    'check to enable\ninput sliders for\nentry fields':
        'zaznacz, aby pozwoli\u0107 na suwaki w polach wej\u015Bciowych',
    'Clicking sound':
        'D\u017Awi\u0119k klikni\u0119cia',
	'uncheck to turn\nblock clicking\nsound off':
		'odznacz, aby wy\u0142\u0105czy\u0107 \nd\u017Awi\u0119k klikni\u0119cia',
	'check to turn\nblock clicking\nsound on':
		'zaznacz, aby w\u0142\u0105czy\u0107 \nd\u017Awi\u0119k klikni\u0119cia',
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
    'hide primitives':
        'ukryj pierwotne',
    'show primitives':
        'poka\u017C pierwotne',

    // blocks:
    'help...':
        'pomoc...',
    'relabel...':
        'przemianuj...',
    'duplicate':
        'powiel',
    'make a copy\nand pick it up':
        'wykonaj i we\u017A kopi\u0119',
    'only duplicate this block':
        'powiel tylko ten blok',
    'delete':
        'usu\u0144',
    'script pic...':
        'obrazek skryptu...',
    'open a new window\nwith a picture of this script':
        'otw\u00F3rz nowe okno\nz obrazkiem tego skryptu',
    'ringify':
        'obwiednia',
    'unringify':
        'bez obwiedni',

    // custom blocks:
    'delete block definition...':
        'usu\u0144 definicj\u0119 bloku',
    'edit...':
        'edytuj...',

    // sprites:
    'edit':
        'edytuj',
    'export...':
        'eksportuj...',

    // stage:
    'show all':
        'poka\u017C wszystko',
    'pic...':
        'obrazek...',
    'open a new window\nwith a picture of the stage':
        'otw\u00F3rz w nowym oknie\nz obrazkiem sceny',

    // scripting area
    'clean up':
        'wyczy\u015B\u0107',
    'arrange scripts\nvertically':
        'ustaw skrypty pionowo',
    'add comment':
        'dodaj komentarz',
    'undrop':
        'odklej',
    'undo the last\nblock drop\nin this pane':
        'cofnij ostatnie upuszczenie\nbloku na tej planszy',
	'scripts pic...':
        'obrazek skryptu...',
    'open a new window\nwith a picture of all scripts':
        'otw\u00F3rz nowe okno\nz obrazkami wszystkich skrypt\u00F3w',
    'make a block...':
        'buduj nowy blok...',

    // costumes
    'rename':
        'zmie\u0144 nazw\u0119',
    'export':
        'eksportuj',
    'rename costume':
        'zmie\u0144 nazw\u0119 kostiumu',

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

    // dialogs
    // buttons
    'OK':
        'OK',
    'Ok':
        'Ok',
    'Cancel':
        'Poniechaj',
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

    // Project Manager
    'Untitled':
        'Bez nazwy',
    'Open Project':
        'Otw\u00F3rz projekt',
    '(empty)':
        '(puste)',
    'Saved!':
        'Zapisane!',
    'Delete Project':
        'Usu\u0144 projekt',
    'Are you sure you want to delete':
        'Czy napewno chcesz usun\u0105\u0107?',
    'rename...':
        'przemianuj',

    // costume editor
    'Costume Editor':
        'Edytor kostium\u00F3w',
    'click or drag crosshairs to move the rotation center':
        'Kliknij lub przeci\u0105gnij krzy\u017Cyk, aby ustawi\u0107 centrum obrotu',

    // project notes
    'Project Notes':
        'Opis projektu',

    // new project
    'New Project':
        'Nowy projekt',
    'Replace the current project with a new one?':
        'Zast\u0105pi\u0107 aktualny projekt przez nowy?',

    // save project
    'Save Project As...':
        'Zapisz projekt jako...',

    // export blocks
    'Export blocks':
        'Eksportuj bloki',
    'Import blocks':
        'Importuj bloki',
    'this project doesn\'t have any\ncustom global blocks yet':
        'ten projekt nie ma jeszcze\nw\u0142asnych globalnych blok\u00F3w',
    'select':
        'wybierz',
    'all':
        'wszystko',
    'none':
        'nic',

    // variable dialog
    'for all sprites':
        'dla wszystkich duszk\u00F3w',
    'for this sprite only':
        'tylko dla tego duszka',

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
        'Tekst tutu\u0142owy',
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
    'Slider minimum value':
        'Minimalna warto\u015B\u0107 suwaka',
    'Slider maximum value':
        'Maksymalna warto\u015B\u0107 suwaka',

    // list watchers
    'length: ':
        'du\u0142go\u015B\u0107: ',

    // coments
    'add comment here...':
        'dodaj komentarz tutaj...',

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

    // collision detection
    'mouse-pointer':
        'Wska\u017Anik myszy',
    'edge':
        'Kraw\u0119dzie',
    'pen trails':
        '\u015Alady pisaka',

    // costumes
    'Turtle':
        'Duszek',
    'Empty':
        'Pusty',

    // graphical effects
    'ghost':
        'duch',

    // keys
    'space':
        'spacja',
    'up arrow':
        'strz\u0142aka w g\u00F3r\u0119',
    'down arrow':
        'strz\u0142aka w d\u00F3\u0142',
    'right arrow':
        'strz\u0142aka w prawo',
    'left arrow':
        'strz\u0142aka w lewo',
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

    // math functions
    'abs':
        'modu\u0142',
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

    // list indices
    'last':
        'ostatni',
    'any':
        'dowolny'
};
