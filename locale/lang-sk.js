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

SnapTranslator.dict.sk = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    Ä, ä   \u00c4, \u00e4
    Ö, ö   \u00d6, \u00f6
    Ü, ü   \u00dc, \u00fc
    ß      \u00df
*/

    // translations meta information
    'language_name':
        'Sloven\u010Dina', // the name as it should appear in the language menu
    'language_translator':
        'Peter Luka\u010Dovi\u010D', // your name for the Translators tab
    'translator_e-mail':
        'peter_lukacovic@outlook.com', // optional
    'last_changed':
        '2019-12-10', // this, too, will appear in the Translators tab

    // GUI
    // control bar:
    'untitled':
        'Bez n\u00E1zvu',
    'development mode':
        'V\u00FDvojov\u00FD m\u00F3d',

    // categories:
    'Motion':
        'Pohyb',
    'Looks':
        'Vzh\u013Ead',
    'Sound':
        'Zvuk',
    'Pen':
        'Pero',
    'Control':
        'Ovl\u00E1danie',
    'Sensing':
        'Vn\u00EDmanie',
    'Operators':
        'Oper\u00E1tory',
    'Variables':
        'Premenn\u00E9',
    'Lists':
        'Zoznamy',
    'Other':
        'Ostatn\u00E9',

    // editor:
    'draggable':
        'pre\u0165ahovate\u013En\u00FD',

    // tabs:
    'Scripts':
        'Skripty',
    'Costumes':
        'Kost\u00FDmy',
    'Backgrounds':
        'Pozadia',
    'Sounds':
        'Zvuky',

    // names:
    'Sprite':
        'Objekt',
    'Stage':
        'Sc\u00E9na',

    // rotation styles:
    'don\'t rotate':
        'neot\u00E1\u010Da\u0165',
    'can rotate':
        'mo\u017Eno oto\u010Di\u0165',
    'only face left/right':
        'iba v\u013Eavo/vpravo',

    // new sprite button:
    'add a new sprite':
        'prida\u0165 nov\u00FD objekt',
    'add a new Turtle sprite':
        'prida\u0165 nov\u00FD objekt korytna\u010Dky',
    'paint a new sprite':
        'kresli\u0165 nov\u00FD objekt',
    'take a camera snapshot and\nimport it as a new sprite':
        'prida\u0165 nov\u00FD objekt pomocou kamery',
        

    // tab help
    'costumes tab help':
        'Nahrajte obr\u00E1zok odinakia\u013E z webu\n'
            + 'alebo nahrajte s\u00FAbor z V\u00E1\u0161ho po\u010D\u00EDta\u010Da pretiahnut\u00EDm sem.',
    'import a sound from your computer\nby dragging it into here':
        'Nahrajte zvuk z V\u00E1\u0161ho po\u010D\u00EDta\u010Da pretiahnut\u00EDm sem.',

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
        'Vybran\u00E1 sc\u00E9na:'
            + '\u017Eiadne pohybliv\u00E9 bloky',

    'move %n steps':
        'posu\u0148 sa o %n krokov',
    'turn %clockwise %n degrees':
        'oto\u010D sa o %clockwise %n stup\u0148ov',
    'turn %counterclockwise %n degrees':
        'oto\u010D sa o %counterclockwise %n stup\u0148ov',
    'point in direction %dir':
        'zamier smerom %dir',
    'point towards %dst':
        'zamier ku %dst',
    'go to x: %n y: %n':
        'cho\u010F na poz\u00EDciu x: %n y: %n',
    'go to %dst':
        'cho\u010F na %dst',
    'glide %n secs to x: %n y: %n':
        'k\u013A\u017E %n sek\u00FAnd na poz\u00EDciu x: %n y: %n',
    'change x by %n':
        'zme\u0148 x o %n',
    'set x to %n':
        'nastav x na %n',
    'change y by %n':
        'zme\u0148 y o %n',
    'set y to %n':
        'nastav y na %n',
    'if on edge, bounce':
        'ak naraz\u00ED\u0161 na okraj, odraz sa',
    'x position':
        'poz\u00EDcia x',
    'y position':
        'poz\u00EDcia y',
    'direction':
        'smer',

    // looks:
    'switch to costume %cst':
        'oble\u010D kost\u00FDm %cst',
    'next costume':
        '\u010Fal\u0161\u00ED kost\u00FDm',
    'costume #':
        'kost\u00FDm \u010D\u00EDslo',
    'say %s for %n secs':
        'hovor %s nasleduj\u00FAcich %n sek\u00FAnd',
    'say %s':
        'hovor %s',
    'think %s for %n secs':
        'pomysli si %s \u010Fal\u0161\u00EDch %n sek\u00FAnd',
    'think %s':
        'pomysli si %s',
    'Hello!':
        'Ahoj!',
    'Hmm...':
        'Hmm...',
    '%img of costume %cst':
        '%img kost\u00FDmu %cst',
    'new costume %l width %dim height %dim':
        'nov\u00FD kost\u00FDm %l \u0161\u00EDrka %dim v\u00FD\u0161ka %dim',
    'stretch %cst x: %n y: %n %':
        'roztiahni %cst x: %n y: %n %',
    'change %eff effect by %n':
        'zme\u0148 efekt %eff o %n',
    'set %eff effect to %n':
        'nastav efekt %eff na %n',
    'clear graphic effects':
        'odstr\u00E1\u0148 grafick\u00E9 efekty',
    '%eff effect':
        '%eff -efekt',
    'change size by %n':
        'zme\u0148 ve\u013Ekos\u0165 o %n',
    'set size to %n %':
        'zme\u0148 ve\u013Ekos\u0165 na %n %',
    'size':
        've\u013Ekos\u0165',
    'show':
        'uk\u00E1za\u0165',
    'hide':
        'skry\u0165',
    'shown?':
        'zobrazen\u00FD?',
    'go to %layer layer':
        'prejdi na vrstvu %layer',
    'front':
        'dopredu',
    'back':
        'dozadu',
    'go back %n layers':
        'presu\u0148 na pozadie o %n \u00FArovn\u00ED',

    'development mode \ndebugging primitives:':
        'v\u00FDvojov\u00FD m\u00F3d \nladenia primit\u00EDv',
    'console log %mult%s':
        'v\u00FDstup do konzoly: %mult%s',
    'alert %mult%s':
        'Upozornenie: %mult%s',

    'pixels':
        'Pixel',
    'current':
        'aktu\u00E1lny',

    // sound:
    'play sound %snd':
        'hraj zvuk %snd',
    'play sound %snd until done':
        'hraj zvuk %snd a po\u010Dkaj',
    'stop all sounds':
        'vypni v\u0161etky zvuky',
    'rest for %n beats':
            'pauza %n dob(y)',
    'play sound %snd at %rate Hz':
        'hraj zvuk %snd na %rate Hz',
    '%aa of sound %snd':
        '%aa zo zvuku %snd',
    'duration':
        'trvanie',
    'length':
        'd\u013A\u017Eka',
    'number of channels':
        'po\u010Det kan\u00E1lov',
    'new sound %l rate %rate Hz':
        'nov\u00FD zvuk %l r\u00FDchlos\u0165 sn\u00EDmania %rate Hz',
    'play note %note for %n beats':
        'hraj t\u00F3n %note pre %n taktov',
    'set instrument to %inst':
        'nastav n\u00E1stroj na %inst',
    'change tempo by %n':
        'zme\u0148 tempo o %n',
    'set tempo to %n bpm':
        'nastav tempo na %n takty/Min.',
    'tempo':
        'tempo',
    'change volume by %n':
        'zme\u0148 hlasitos\u0165 o %n',
    'set volume to %n %':
        'nastav hlasitos\u0165 na %n %',
    'change balance by %n':
        'zme\u0148 vyv\u00E1\u017Eenie o %n',
    'set balance to %n':
        'nastav vyv\u00E1\u017Eenie na %n',
    'balance':
        'vyv\u00E1\u017Eenie',
    'play frequency %n Hz':
        'hraj frekvenciu %n Hz',
    'stop frequency':
        'zastav frekvenciu',
    'play %n Hz for %n secs':
        'hraj %n Hz po\u010Das %n Sek.',

    // "instruments", i.e. wave forms
    '(1) sine':
        '(1) s\u00EDnus',
    '(2) square':
        '(2) \u0161tvorec',
    '(3) sawtooth':
        '(3) p\u00EDlka',
    '(4) triangle':
        '(4) trojuholn\u00EDk',

    // pen:
    'clear':
        'zma\u017E',
    'pen down':
        'pero dole',
    'pen up':
        'pero nahor',
    'pen down?':
        'pero nadol?',
    'set pen color to %clr':
        'nastavi\u0165 farbu pera na %clr',
    'set background color to %clr':
        'nastav pozadie na %clr',
    'change pen %hsva by %n':
        'zme\u0148 pero %hsva o %n',
    'change background %hsva by %n':
        'zme\u0148 pozadie %hsva o %n',
    'set pen %hsva to %n':
        'nastav pero %hsva na %n',
    'set background %hsva to %n':
        'nastav pozadie %hsva na %n',
    'pen %pen':
        'pero %pen',
    'change pen size by %n':
        'zme\u0148 hr\u00FAbku pera o %n',
    'set pen size to %n':
        'nastav hr\u00FAbku pera na %n',
    'stamp':
        'raz\u00EDtko',
    'fill':
        'vypl\u0148',
    'write %s size %n':
        'p\u00ED\u0161 %s ve\u013Ekos\u0165ou %n',
    'paste on %spr':
        'prilep na %spr',
    'pen vectors':
        'vektorov\u00E9 pero',

    // control:
    'when %greenflag clicked':
        'Po kliknut\u00ED na %greenflag',
    'when %keyHat key pressed':
        'po stla\u010Den\u00ED kl\u00E1vesy %keyHat',
    'when I am %interaction':
        'ke\u010F %interaction',
    'clicked':
        'na m\u0148a klikn\u00FA',
    'pressed':
        'ma stla\u010Dia',
    'dropped':
        'ma upustia',
    'mouse-entered':
        'na m\u0148a nabehne my\u0161',
    'mouse-departed':
        'zo m\u0148a od\u00EDde my\u0161',
   'scrolled-down':
    	'skrolovanie nadol',
    'scrolled-up':
        'skrolovanie nahor',
    'stopped':
        'zastaven\u00FD',
    'when %b':
        'Ke\u010F %b',
    'when I receive %msgHat':
        'po prijat\u00ED spr\u00E1vy %msgHat',
    'broadcast %msg':
        'posla\u0165 v\u0161etk\u00FDm %msg',
    'broadcast %msg and wait':
        'posla\u0165 v\u0161etk\u00FDm %msg a \u010Daka\u0165',
    'Message name':
        'n\u00E1zov spr\u00E1vy',
    'message':
        'spr\u00E1va',
    'any message':
        'ak\u00E1ko\u013Evek spr\u00E1va',
    'wait %n secs':
        '\u010Dakaj %n sek\u00FAnd',
    'wait until %b':
        '\u010Dakaj pokia\u013E nenastane %b',
    'forever %loop':
        'st\u00E1le opakuj %loop',
    'repeat %n %loop':
        'opakuj %n kr\u00E1t %loop',
    'repeat until %b %loop':
        'opakuj pokia\u013E nenastane %b %loop',
    'for %upvar = %n to %n %cla':
        'pre %upvar = %n do %n %cla',
    'if %b %c':
        'ke\u010F %b %c',
    'if %b %c else %c':
        'ke\u010F %b %c inak %c',
    'if %b then %s else %s':
        'ak %b potom %s inak %s',
    'report %s':
        'vr\u00E1ti\u0165 %s',
    'stop %stopChoices':
        'stop %stopChoices',
    'all':
        'v\u0161etko',
    'this script':
        'tento skript',
    'this block':
        'tento blok',
    'stop %stopOthersChoices':
        'stop %stopOthersChoices',
    'all but this script':
        'v\u0161etko okrem tohoto skriptu',
    'other scripts in sprite':
        'in\u00E9 skripty v tomto objekte',
    'pause all %pause':
        'zastav v\u0161etko %pause',
    'run %cmdRing %inputs':
        'spusti\u0165 %cmdRing %inputs',
    'launch %cmdRing %inputs':
        'zah\u00E1ji\u0165 %cmdRing %inputs',
    'call %repRing %inputs':
        'zavola\u0165 %repRing %inputs',
    'run %cmdRing w/continuation':
        'spusti\u0165 %cmdRing s pokra\u010Dovan\u00EDm',
    'call %cmdRing w/continuation':
        'zavola\u0165 %cmdRing s pokra\u010Dovan\u00EDm',
    'warp %c':
        'obal %c',
    'when I start as a clone':
        'za\u010Da\u0165 po naklonovan\u00ED',
    'create a clone of %cln':
        'vytvori\u0165 klon %cln',
    'a new clone of %cln':
        'nov\u00FD klon %cln',
    'myself':
        'sam\u00E9ho seba',
    'delete this clone':
        'odstr\u00E1ni\u0165 klon',
    'tell %spr to %cmdRing %inputs':
        'povedz %spr %cmdRing robi\u0165 %inputs',
    'ask %spr for %repRing %inputs':
        'op\u00FDtaj %spr pre %repRing %inputs',

    // sensing:
    'touching %col ?':
        'dot\u00FDka sa %col ?',
    'touching %clr ?':
        'dot\u00FDka sa farby %clr ?',
    'color %clr is touching %clr ?':
        'farba %clr je na farbe %clr ?',
    'ask %s and wait':
        'op\u00FDtaj sa %s a \u010Dakaj',
    'what\'s your name?':
        'Ako sa vol\u00E1\u0161?',
    'answer':
        'odpove\u010F',
    'mouse x':
        's\u00FAradnice my\u0161i x',
    'mouse y':
        's\u00FAradnice my\u0161i y',
    'mouse down?':
        'stla\u010Den\u00E9 tla\u010D\u00EDtko my\u0161i?',
    'key %key pressed?':
        'stla\u010Den\u00E1 kl\u00E1vesa %key ?',
    '%rel to %dst':
        '%rel ku %dst',
    'distance':
    	'vzdialenos\u0165',
    '%asp at %loc' :
        '%asp pri %loc',
    'r-g-b-a':
        'R-G-B-A farby',
    'sprites' :
        'objekty',
    'reset timer':
        'vynulova\u0165 stopky',
    'timer':
        'stopky',
    '%att of %spr':
        '%att z %spr',
    'my %get':
        'atrib\u00FAt %get',
    'object %self':
        'objekt %self',
    'http:// %s':
        'http:// %s',
    'turbo mode':
        'turbo m\u00F3d',
    'flat line ends':
        'ploch\u00E1 \u010Diara kon\u010D\u00ED',
    'is %setting on?':
        'je %setting nastaven\u00FD?',
    'set %setting to %b':
        'nastavi\u0165 %setting na %b',
    'current %dates':
        'aktu\u00E1lny %dates',
    'year':
        'rok',
    'month':
        'mesiac',
    'date':
        'd\u00E1tum',
    'day of week':
        'de\u0148 v t\u00FD\u017Edni',
    'hour':
        'hodina',
    'minute':
        'min\u00FAta',
    'second':
        'sekunda',
    'time in milliseconds':
        '\u010Das v milisekund\u00E1ch',
    'microphone %audio':
        'Mikrof\u00F3n %audio',
    'volume':
        'hlasitos\u0165',
    'note':
        'nota',
    'frequency':
        'frekvencia',
    'samples':
        'vzorka',
    'sample rate':
        'vzokrovacia frekvencia',
    'spectrum':
        'spektrum',
    'resolution':
        'rozl\u00ED\u0161enie',
    'Microphone resolution...':
        'Rozl\u00ED\u0161enie mikrof\u00F3nu...',
    'Microphone':
        'Mikrof\u00F3n',
    'low':
        'n\u00EDzka',
    'high':
        'vysok\u00E1',
    'max':
        'maxim\u00E1lna',
    'video %vid on %self':
        'Video %vid na %self',
    'motion':
        'pohyb',
    'snap':
        'prichyti\u0165',
    'set video transparency to %n':
        'nastavi\u0165 priesvitnos\u0165 na %n',
    'video capture':
        'video z\u00E1znam',
    'mirror video':
        'zrkadli\u0165 video',
    'filtered for %clr':
        'filtrovan\u00FD pre %clr',
    'stack size':
        've\u013Ekos\u0165 z\u00E1sobn\u00EDku',
    'frames':
        'sn\u00EDmky',
    'log pen vectors':
        'nahra\u0165 vektory',

    // operators:
    '%n mod %n':
        '%n modulo %n',
    'round %n':
        'zaokr\u00FAhli %n',
    '%fun of %n':
        '%fun z %n',
    'pick random %n to %n':
        'zvo\u013E n\u00E1hodn\u00E9 \u010D\u00EDslo od %n do %n',
    '%b and %b':
        '%b a %b',
    '%b or %b':
        '%b alebo %b',
    'not %b':
        'nie je %b',
    'true':
        'pravda',
    'false':
        'nepravda',
    'join %words':
        'spoj %words',
    'split %s by %delim':
        'rozde\u013E %s pomocou %delim',
    'hello':
        'ahoj',
    'world':
        'svet',
    'letter %idx of %s':
        'p\u00EDsmeno %idx z %s',
    'length of %s':
        'd\u013A\u017Eka %s',
    'unicode of %s':
        'Unicode %s',
    'unicode %n as letter':
        'Unicode %n ako znak',
    'is %s a %typ ?':
        'je %s typu %typ ?',
    'is %s identical to %s ?':
        'je %s rovnak\u00FD jako %s ?',
    'JavaScript function ( %mult%s ) { %code }':
        'JavaScript funkcia ( %mult%s ) { %code }',
    'compile %repRing':
    	'kompilova\u0165 %repRing',

    'type of %s':
        'Typ %s',

    // variables:
    'Make a variable':
        'Vytvor premenn\u00FA',
    'Variable name':
        'Meno premennej',
    'Script variable name':
        'Meno skriptovanej premennej',
    'inherit %shd':
        'zdedi\u0165 %shd',
    'Delete a variable':
        'Zma\u017E premenn\u00FA',

    'set %var to %s':
        'nastav %var na %s',
    'change %var by %n':
        'zme\u0148 %var o %n',
    'show variable %var':
        'uk\u00E1\u017E premenn\u00FA %var',
    'hide variable %var':
        'skry premenn\u00FA %var',
    'script variables %scriptVars':
        'Vytvor skriptov\u00E9 premenn\u00E9 %scriptVars',

    // lists:
    'list %exp':
        'zoznam %exp',
    'numbers from %n to %n':
        '\u010D\u00EDsla od %n do %n',
    '%s in front of %l':
        '%s na za\u010Diatok %l',
    'item %idx of %l':
        'polo\u017Eka %idx z %l',
    'all but first of %l':
        'v\u0161etko okrem prvej polo\u017Eky z %l',
    'length of %l':
        'd\u013A\u017Eka %l',
    '%l contains %s':
        '%l obsahuje %s',
    'thing':
        'vec',
    'is %l empty?':
        'je %l pr\u00E1zdny?',
    'map %repRing over %l':
        'pou\u017Ei\u0165 %repRing na %l',
    'keep items %predRing from %l':
        'uchova\u0165 polo\u017Eky %predRing z %l',
    'find first item %predRing in %l':
        'n\u00E1js\u0165 prv\u00FA polo\u017Eku %predRing v %l',
    'combine %l using %repRing':
        'skombinova\u0165 polo\u017Eky z %l s %repRing',
    '%blitz map %repRing over %l':
        '%blitz pou\u017Ei\u0165 %repRing na %l',
    '%blitz keep items %predRing from %l':
        '%blitz uchova\u0165 polo\u017Eky %predRing z %l',
    '%blitz find first item %predRing in %l':
        '%blitz n\u00E1js\u0165 prv\u00FA polo\u017Eku %predRing v %l',
    '%blitz combine %l using %repRing':
        '%blitz kombinova\u0165 polo\u017Eky %l s %repRing',
    'for each %upvar in %l %cla':
        'pre ka\u017Ed\u00FD %upvar z %l %cla',
    'item':
        'polo\u017Eka',
    'value':
        'hodnota',
    'index':
        'index',
    'add %s to %l':
        'prida\u0165 %s do %l',
    'delete %ida of %l':
        'zmaza\u0165 %ida z %l',
    'insert %s at %idx of %l':
        'vlo\u017Ei\u0165 %s na %idx poz\u00EDciu v %l',
    'replace item %idx of %l with %s':
        'nahra\u010F polo\u017Eku %idx v %l hodnotou %s',

    // other
    'Make a block':
        'Vytvor blok',

    // menus
    // snap menu
    'About...':
        'O programe...',
    'Reference manual':
        'Referen\u010Dn\u00FD manu\u00E1l',
    'Snap! website':
        'Str\u00E1nky Snap!',
    'Download source':
        'Stiahnu\u0165 zdrojov\u00E9 k\u00F3dy',
    'Switch back to user mode':
        'prepn\u00FA\u0165 sp\u00E4\u0165 do u\u017Eivate\u013Esk\u00E9ho m\u00F3du',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'zobrazova\u0165 jednoduch\u00E9 menu',
    'Switch to dev mode':
        'prepn\u00FA\u0165 do v\u00FDvoj\u00E1rsk\u00E9ho m\u00F3du',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'zobrazova\u0165 pokro\u010Dil\u00E9 menu',

    // project menu
    'Project notes...':
        'Pozn\u00E1mky k projektu...',
    'New':
        'Nov\u00FD',
    'Open...':
        'Otvori\u0165...',
    'Save':
        'Ulo\u017Eit',
    'Save to disk':
        'Ulo\u017Ei\u0165 na disk',
    'store this project\nin the downloads folder\n(in supporting browsers)':
        'Stiahnu\u0165 tento projekt\ndo lok\u00E1lneho prie\u010Dinku\n'
            + '(iba v prehliada\u010Doch s podporou funkcionality)',
    'Save As...':
        'Ulo\u017Ei\u0165 ako...',
    'Import...':
        'Importova\u0165...',
    'file menu import hint':
        'Na\u010D\u00EDta\u0165 exportovan\u00FD projekt, '
            + 'kni\u017Enicu blokov, kost\u00FDmy alebo zvuky',
    'Export project as plain text...':
        'Exportova\u0165 projekt ako \u010Dist\u00FD text...',
    'Export project...':
        'Exportova\u0165 projekt...',
    'save project data as XML\nto your downloads folder':
        'ulo\u017Ei\u0165 d\u00E1ta projektu ako XML\ndo adres\u00E1ra Stiahnut\u00E9',
    'show project data as XML\nin a new browser window':
        'zobrazi\u0165 d\u00E1ta projektu ako xml  XML\n v novom okne prehliada\u010Da',
    'Export blocks...':
        'Exportova\u0165 bloky...',
    'show global custom block definitions as XML\nin a new browser window':
        'Zobrazi\u0165 defin\u00EDciu vlastn\u00FDch blokov ako\nXML v novom okne prehliada\u010Da',
    'Unused blocks...':
          'Nepou\u017Eit\u00E9 bloky...',
    'find unused global custom blocks\nand remove their definitions':
        'n\u00E1js\u0165 nepou\u017Eit\u00E9 glob\u00E1lne bloky\na odstr\u00E1ni\u0165 ich defin\u00EDcie',
    'Remove unused blocks':
        'Odstr\u00E1ni\u0165 nepou\u017Eit\u00E9 bloky',
    'there are currently no unused\nglobal custom blocks in this project':
        'v tomto projekte sa nenach\u00E1dzaj\u00FA\n\u017Eiadne nepou\u017Eit\u00E9 glob\u00E1lne bloky',
    'unused block(s) removed':
        'nepou\u017Eit\u00E9 blok(y) odstr\u00E1nen\u00E9',
    'Export summary...':
        'Exportova\u0165 zhrnutie...',
    'open a new browser browser window\n with a summary of this project':
        'Otvori\u0165 nov\u00E9 okno prehliada\u010Da\nso zhrnut\u00EDm tohoto projektu',

    'Contents':
        'Obsah',
    'Kind of':
        'Druh',
    'Part of':
        '\u010Das\u0165 z',
    'Parts':
        '\u010Dasti',
    'Blocks':
        'Bloky',
    'For all Sprites':
        'Pre v\u0161etky objekty',
    'Libraries...':
        'Kni\u017Enice...',
    'Select categories of additional blocks to add to this project.':
        'Pripoji\u0165 k projektu dodato\u010Dn\u00FD v\u00FDber tematicky zl\u00FA\u010Den\u00FDch blokov.',
    'Select a costume from the media library':
        'Vybra\u0165 kost\u00FDm z kni\u017Enice m\u00E9di\u00ED',
    'Select a sound from the media library':
        'Vybra\u0165 nahr\u00E1vku z kni\u017Enice m\u00E9di\u00ED',

    //Libraries
    'Import library':
        'Importova\u0165 kni\u017Enicu',
    'Loading':
        'Nahr\u00E1vanie',
    'Imported':
        'Importovan\u00FD',
    'Iteration, composition':
        'Iter\u00E1cia, kompoz\u00EDcia',
    'List utilities':
        '\u00FApravy zoznamu',
    'Variadic reporters':
        'Variadick\u00E9 funkcie',
    'Web services access (https)':
        'Pr\u00EDstup na webov\u00E9 slu\u017Eby (https)',
    'Multi-branched conditional (switch)':
        'Viac vetvov\u00E1 podmienka (Switch)',
    'LEAP Motion controller':
        'LEAP Motion Controller',
    'Words, sentences':
        'Slov\u00E1, vety',
    'Catch errors in a script':
        'Zachyti\u0165 chyby v skripte',
    'Set RGB or HSV pen color':
        'Nastavi\u0165 RGB alebo HSV hodnoty pera',
    'Text to speech':
        'Text na slovo',
    'Provide 100 selected colors':
        '100 vybran\u00FDch farieb',
    'Infinite precision integers, exact rationals, complex':
        'Cel\u00E9 \u010D\u00EDsla s nekone\u010Dnou presnos\u0165ou, racion\u00E1lne \u010D\u00EDsla, komplexn\u00E9 \u010D\u00EDsla',
    'Provide getters and setters for all GUI-controlled global settings':
        'Programov\u00E9 spracovanie GUI elementov',
    'Allow multi-line text input to a block':
        'Povoli\u0165 viac riadkov\u00FD text pre blok',
    'Create variables in program':
        'Vytvori\u0165 premenn\u00E9 v programe',

    // cloud menu
    'Login...':
        'Prihl\u00E1si\u0165...',
    'Signup...':
        'Vytvori\u0165 \u00FA\u010Det...',
    'Logout':
        'Odhl\u00E1si\u0165',
    'Change Password...':
        'Zmeni\u0165 heslo...',
    'Reset Password...':
        'Zmeni\u0165 heslo...',
    'Resend Verification Email...':
        'Prepo\u0161li verifika\u010Dn\u00FD email...',
    'Open in Community Site':
        'Zobrazi\u0165 str\u00E1nku projektu',

    // settings menu
    'Language...':
        'Jazyk...',
    'Zoom blocks...':
        'Ve\u013Ekos\u0165 blokov...',
    'Stage size...':
        'Ve\u013Ekos\u0165 sc\u00E9ny...',
    'Stage size':
        'Ve\u013Ekos\u0165 sc\u00E9ny',
    'Stage width':
        '\u0161\u00EDrka sc\u00E9ny',
    'Stage height':
        'V\u00FD\u0161ka sc\u00E9ny',
    'Default':
        '\u0161tandardn\u00FD',
    'Blurred shadows':
        'M\u00E4kk\u00E9 tiene',
    'uncheck to use solid drop\nshadows and highlights':
        'od\u0161krtnut\u00EDm sa pou\u017Eij\u00FA\nostr\u00E9 tiene a svetl\u00E1',
    'check to use blurred drop\nshadows and highlights':
        'za\u0161krtni pre pou\u017Eitie \nm\u00E4kk\u00FDch tie\u0148ov a svetiel',
    'Zebra coloring':
        'Striedav\u00E9 farby',
    'check to enable alternating\ncolors for nested blocks':
        'Za\u0161krtnutie zapne striedav\u00E9\nfarby pre vlo\u017Een\u00E9 bloky',
    'uncheck to disable alternating\ncolors for nested block':
        'Od\u0161krtnutie zru\u0161\u00ED pou\u017Eitie striedav\u00FDch farieb pre vlo\u017Een\u00E9 bloky',
    'Dynamic input labels':
        'Dynamick\u00E9 popisky vstupu',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'Od\u0161krtnutie zru\u0161\u00ED dynamick\u00E9\npopisky pre variadick\u00E9 vstupy',
    'check to enable dynamic\nlabels for variadic inputs':
        'Za\u0161krtnutie zapne dynamick\u00E9\npopisky pre variaick\u00E9 vstupy',
    'Prefer empty slot drops':
        'Preferova\u0165 pr\u00E1zdny slot pre pustenie',
    'settings menu prefer empty slots hint':
        'Za\u0161krtnut\u00EDm bude preferovan\u00E9 pr\u00E1zdne miesto na umiestnenie',
    'uncheck to allow dropped\nreporters to kick out others':
        'od\u0161krtnut\u00EDm bude uprednost\u0148ovan\u00E9 nahradenie celej podmienky',
    'check to turn on\n visible stepping (slow)':
        'Za\u0161krtnut\u00EDm zapne zobrazenie\nkrokovania programu (pomal\u00E9)',
    'uncheck to turn off\nvisible stepping':
        'od\u0161krtnut\u00EDm vypne zobrazenie\nkrokovania programu',
    'Long form input dialog':
        'Ve\u013Ek\u00E9 formul\u00E1re',
    'Plain prototype labels':
        'Jednoduch\u00E9 nadpisy prototypov',
    'uncheck to always show (+) symbols\nin block prototype labels':
        'od\u0161krtnite pre pou\u017E\u00EDvanie symbolov (+) v editore blokov',
    'check to hide (+) symbols\nin block prototype labels':
        'za\u0161krtnite pre skrytie symbolov (+) v editore blokov',
    'check to always show slot\ntypes in the input dialog':
        'Za\u0161krtnut\u00EDm v\u017Edy zobrazuje\nd\u00E1tov\u00E9 typy vo vstupnom dial\u00F3gu',
    'uncheck to use the input\ndialog in short form':
        'od\u0161krtnite pre zjednodu\u0161en\u00FD vstupn\u00FD dial\u00F3g',
    'Virtual keyboard':
        'Virtu\u00E1lna kl\u00E1vesnica',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'od\u0161krtnutie zak\u00E1\u017Ee\npodporu virtu\u00E1lnej kl\u00E1vesnice\n'
            + 'na mobiln\u00FDch zariadeniach',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'za\u0161krtnutie povol\u00ED pou\u017Eitie virtu\u00E1lnej kl\u00E1vesnice\nna mobiln\u00FDch zariadeniach',
    'Input sliders':
        'Posuvn\u00EDky',
    'uncheck to disable\ninput sliders for\nentry fields':
        'od\u0161krtnutie vypne pou\u017Eitie posuvn\u00EDkov pre vstupn\u00E9 pole',
    'check to enable\ninput sliders for\nentry fields':
        'za\u0161krtnutnie povol\u00ED pou\u017Eitie posuvn\u00EDkov pre vstupn\u00E9 pole',
    'Retina display support':
        'Podpora retina obrazovky',
    'uncheck for lower resolution,\nsaves computing resources':
        'Od\u0161krtnut\u00EDm zn\u00ED\u017Ei rozl\u00ED\u0161enie\npre \u0161etrenie po\u010D\u00EDta\u010Dov\u00FDmi zdrojmi',
    'check for higher resolution,\nuses more computing resources':
        'Za\u0161krtnut\u00EDm zv\u00FD\u0161i rozl\u00ED\u0161enie\ns pou\u017Eit\u00EDm dodato\u010Dn\u00FDch po\u010D\u00EDta\u010Dov\u00FDch zdrojov',
    'Codification support':
        'Kodifik\u00E1cia',
    'Clicking sound':
        'Zvuk kliknutia',
    'uncheck to turn\nblock clicking\nsound off':
        'od\u0161krtnutie vypne zvuk pri pricvaknut\u00ED bloku',
    'check to turn\nblock clicking\nsound on':
        'za\u0161krtnutie zapne zvuk pricvaknutia bloku',
    'Thread safe scripts':
        'Vl\u00E1knovo bezpe\u010Dn\u00E9 skripty',
    'uncheck to allow\nscript reentrance':
        'od\u0161krtnutie povol\u00ED viac vl\u00E1kien',
    'Turbo mode':
        'Turbo m\u00F3d',
    'check to prioritize\nscript execution':
        'Za\u0161krtnutie prioritizuje\nvykon\u00E1vanie skriptov',
    'uncheck to run scripts\nat normal speed':
        'od\u0161krtnutie spust\u00ED skript\nnorm\u00E1lnou r\u00FDchlos\u0165ou',
    'check to enable\nIDE animations':
        'Za\u0161krtnutie povol\u00ED anim\u00E1cie\nu\u017E\u00EDvate\u013Esk\u00E9ho rozhrania',
    'Flat design':
        'Ploch\u00FD dizajn',
    'check for alternative\nGUI design':
        'za\u0161krtnite pre alternat\u00EDvny dizajn GUI',
    'uncheck for default\nGUI design':
        'od\u0161krtnite pro predvolen\u00FD dizajn GUI',
    'Nested auto-wrapping':
        'Vnoren\u00E9 automatick\u00E9 obopnutie',
    'Keyboard Editing':
        'Editacia kl\u00E1vesnicou',
    'Table support':
        'Podpora tabuliek',
    'Table lines':
        'Tabu\u013Eka s \u010Diarami',
    'Visible stepping':
        'Vidite\u013En\u00E9 krokovanie',
    'Thread safe scripts':
        'Vl\u00E1knovo zabezpe\u010Den\u00E9 skripty',
    'uncheck to allow\nscript reentrance':
        'od\u0161krtnite na povolenie\nznovuvst\u00FApenia do skriptu',
    'check to disallow\nscript reentrance':
        'za\u0161krtnite pre z\u00E1kaz\nznovuvst\u00FApenia do skriptu',
    'Prefer smooth animations':
        'Zapn\u00FA\u0165 plynul\u00FA anim\u00E1ciu',
    'uncheck for greater speed\nat variable frame rates':
        'od\u0161krtnite pre vy\u0161\u0161iu r\u00FDchlos\u0165',
    'check for smooth, predictable\nanimations across computers':
        'za\u0161krtnite pre plynul\u00E9, predv\u00EDdate\u013En\u00E9\nanim\u00E1cie naprie\u010D po\u010D\u00EDta\u010Dmi',
    'Flat line ends':
        'Ploch\u00E9 konce \u010Diar',
    'check for flat ends of lines':
        'za\u0161krtnite pre ploch\u00E9 konce \u010Diar',
    'uncheck for round ends of lines':
        'od\u0161krtnite pre zagu\u013Eaten\u00E9 konce \u010Diar',
    'Codification support':
        'Podpora kodifik\u00E1cie',
    'Inheritance support':
        'Podpora dedi\u010Dnosti',
    'uncheck to disable\nsprite inheritance features':
        'od\u0161krtnite pre vypnutie funkci\u00ED\ndedi\u010Dnosti spritov',
    'check for sprite\ninheritance features':
        'za\u0161krtnite pre funkcie\ndedi\u010Dnosti spritov',
    'check to turn on\nlogging pen vectors':
        'za\u0161krtnite pre zapnutie\nlogovanie vektorov\u00FDch pier',


    // inputs
    'with inputs':
        's polo\u017Ekami',
    'input names:':
        'premenn\u00E9:',
    'Input Names:':
        'Premenn\u00E9:',
    'input list:':
        'vstupn\u00FD list:',

    // context menus:
    'help':
        'n\u00E1poveda',
    // palette:
    'find blocks':
        'n\u00E1jdi bloky',
    'hide primitives':
        'skry primit\u00EDvy',
    'show primitives':
        'zobraz primit\u00EDvy',

    // blocks:
    'help...':
        'n\u00E1poveda...',
    'relabel...':
        'Zameni\u0165 blok za...',
    'compile':
        'skompiluj',
    'uncompile':
        'odkompiluj',
    'duplicate':
        'kop\u00EDrova\u0165',
    'make a copy\nand pick it up':
        'vytvori\u0165 k\u00F3piu \na dr\u017Ea\u0165 ju',
    'only duplicate this block':
        'kop\u00EDrova\u0165 len tento blok',
    'delete':
        'zmaza\u0165',
    'script pic...':
        'obr\u00E1zok skriptu...',
    'open a new window\nwith a picture of this script':
        'otevri\u0165 nov\u00E9 okno\ns obr\u00E1zkom tohoto skriptu',
    'ringify':
        'obali\u0165',
    'unringify':
        'zru\u0161i\u0165 zabalenie',
    'transient':
        'do\u010Dasn\u00FD',
    'uncheck to save contents\nin the project':
        'od\u0161krtnuie ulo\u017E\u00ED obsah\n v projekte',
    'check to prevent contents\nfrom being saved':
        'za\u0161krtnutie zabr\u00E1ni ulo\u017Eeniu\nobsahu',
    'new line':
        'neue Zeile',

    // custom blocks:
    'delete block definition...':
        'zmaza\u0165 defin\u00EDciu bloku',
    'duplicate block definition...':
        'skop\u00EDruj defin\u00EDciu bloku...',
    'edit...':
        'upravi\u0165...',

    // sprites:
    'edit':
        'upravi\u0165',
    'clone':
        'klonova\u0165',
    'move':
        'presun\u00FA\u0165',
    'pivot':
        'pivotn\u00FD bod',
    'edit the costume\'s\nrotation center':
        'upravi\u0165 rota\u010Dn\u00FD\nstred kost\u00FDmu',
    'rotate':
    	'rotuj',
    'stick to':
        'pripoj ku',
    'detach from':
        'odpoj od',
    'detach all parts':
        'v\u0161etky \u010Dasti odpoji\u0165',
    'export...':
        'export...',
    'paint a new sprite':
        'nakresli\u0165 nov\u00FD objekt',
    'current parent':
        'aktu\u00E1lny rodi\u010D',
    'release':
        'uvo\u013Eni\u0165',
    'make temporary and\nhide in the sprite corral':
        'premenit na do\u010Dasn\u00FD\na skry\u0165 ikonu',

    // stage:
    'show all':
        'Zobrazit v\u0161etko',
    'pic...':
        'exportova\u0165 obr\u00E1zok...',
    'open a new window\nwith a picture of the stage':
        'otvori\u0165 nov\u00E9 okno\ns obr\u00E1zkom na javisku',
    'svg...':
        'exportova\u0165 SVG...',
    'export pen trails\nline segments as SVG':
        'exportova\u0165 \u0165ahy perom\n ako SVG',
    'there are currently no\nvectorizable pen trail segments':
        'moment\u00E1lne neexistuj\u00FA\n\u0165ahy perom ktor\u00E9 by sa dali vektorizova\u0165',
    'turn all pen trails and stamps\ninto a new background for the stage':
        'v\u0161etky \u0165ahy perom a raz\u00EDtka\nkonvertova\u0165 do nov\u00E9ho pozadia pre javisko',
    'turn all pen trails and stamps\ninto a new costume for the\ncurrently selected sprite':
        'v\u0161etky \u0165ahy perom a raz\u00E1tka\nkonvertova\u0165 do nov\u00E9ho kost\u00FDmu\npre aktu\u00E1lne vybran\u00FD sprite',

    // scripting area
    'clean up':
        'Zrovnat',
    'arrange scripts\nvertically':
        'zarovna\u0165 skripty vertik\u00E1lne',
    'add comment':
        'prida\u0165 koment\u00E1r',
    'undrop':
        'nasp\u00E4\u0165',
    'undo the last\nblock drop\nin this pane':
        'odvola\u0165 nastavenie posledn\u00E9ho bloku',
    'redrop':
        'obnovi\u0165',
    'use the keyboard\nto enter blocks':
    	'pou\u017Ei kl\u00E1vesnicu\npre zad\u00E1vanie bloku',
    'scripts pic...':
        'obr\u00E1zok v\u0161etk\u00FDch skriptov...',
    'open a new window\nwith a picture of all scripts':
        'otvori\u0165 nov\u00E9 okno\nprehliada\u010Da s obr\u00E1zkom v\u0161etk\u00FDch skriptov',
    'make a block...':
        'vytvori\u0165 blok...',

    // costumes
    'rename':
        'premenova\u0165',
    'export':
        'exportova\u0165',
    'rename costume':
        'premenova\u0165 kost\u00FDm',

    // sounds
    'Play sound':
        'spusti\u0165 prehr\u00E1vanie',
    'Stop sound':
        'zastavi\u0165 prehr\u00E1vanie',
    'Stop':
        'zastavi\u0165',
    'Play':
        'spusti\u0165',
    'rename sound':
        'premenova\u0165 zvuk',

    // lists and tables
    'list view...':
        'zobrazi\u0165 zoznam...',
    'table view...':
        'zobrazi\u0165 tabu\u013Eku...',
    'Table view':
        'tabu\u013Eka',
    'open in dialog...':
        'otvori\u0165 v novom okne',
    'reset columns':
        'obnovi\u0165 \u0161\u00EDrku st\u013Apcov',
    'items':
        'polo\u017Eky',

    // dialogs
    // buttons
    'OK':
        'OK',
    'Ok':
        'OK',
    'Cancel':
        'Zru\u0161i\u0165',
    'Yes':
        '\u00E1no',
    'No':
        'Nie',

    // help
    'Help':
        'N\u00E1poveda',

    // zoom blocks
    'Zoom blocks':
        'Ve\u013Ekos\u0165 blokov',
    'build':
        'vytvor si',
    'your own':
        'svoje vlastn\u00E9',
    'blocks':
        'bloky',
    'normal (1x)':
        'norm\u00E1lne (1x)',
    'demo (1.2x)':
        'demo (1.2x)',
    'presentation (1.4x)':
        'prezent\u00E1cia (1.4x)',
    'big (2x)':
        've\u013Ek\u00E9 (2x)',
    'huge (4x)':
        'obrovsk\u00E9 (4x)',
    'giant (8x)':
        'gigantick\u00E9 (8x)',
    'monstrous (10x)':
        'mon\u0161tr\u00F3zne (10x)',

    // Project Manager
    'Untitled':
        'Nepomenovan\u00FD',
    'Open Project':
        'Otevri\u0165 projekt',
    'Open':
        'Otvori\u0165',
    '(empty)':
        '(pr\u00E1zdny)',
    'Saved!':
        'Ulo\u017Een\u00E9!',
    'Delete Project':
        'Zmaza\u0165 projekt',
    'Are you sure you want to delete':
        'Ste si ist\u00FD, \u017Ee chcete projekt zmaza\u0165?',
    'rename...':
        'premenova\u0165...',
    'Examples':
        'Pr\u00EDklady',
    'Share':
        'Zdie\u013Ea\u0165',
    'Unshare':
        'Zru\u0161i\u0165 zdie\u013Eanie',
    'Publish':
        'Publikova\u0165',
    'Unpublish':
        'Zru\u0161i\u0165 publikovanie',
    'Updating\nproject list...':
        'Nahr\u00E1vanie\nzoznamu projektov...',
    'Recover':
        'Obnovenie',
    'Today':
        'Dnes',
    'Yesterday':
        'V\u010Dera',

    // costume editor
    'Costume Editor':
        'Editor kost\u00FDmov',
    'Paint Editor':
        'Editor Farieb',
    'click or drag crosshairs to move the rotation center':
        'klikni alebo pretiahni kr\u00ED\u017E pre presunutie centra ot\u00E1\u010Dania',
    'undo':
        'sp\u00E4\u0165',
    'Vector':
        'Vektor',
    'Paintbrush tool\n(free draw)':
        '\u0161tetec\n(kreslenie rukou)',
    'Stroked Rectangle\n(shift: square)':
        'Obd\u013A\u017Enik\n(shift: \u0161tvorec)',
    'Stroked Ellipse\n(shift: circle)':
        'Elipsa\n(shift: kruh)',
    'Eraser tool':
        'Guma',
    'Set the rotation center':
        'Nastavi\u0165 stred rot\u00E1cie',
    'Line tool\n(shift: vertical/horizontal)':
        '\u010Diara\n(shift: vertik\u00E1lna/horizont\u00E1lna)',
    'Filled Rectangle\n(shift: square)':
        'Vyplnen\u00FD obd\u013A\u017Enik\n(shift: \u0161tvorec)',
    'Filled Ellipse\n(shift: circle)':
        'Vyplnen\u00E1 elipsa\n(shift: kruh)',
    'Fill a region':
        'Vyplni\u0165 oblas\u0165\nybranou farbou',
    'Pipette tool\n(pick a color anywhere)':
        'Pipeta (vyber farbu kdeko\u013Evek)',
    'Brush size':
        '\u0161\u00EDrka \u0161tetca',
    'Constrain proportions of shapes?\n(you can also hold shift)':
        'Definuj proporcie tvaru?\n(mô\u017Ee\u0161 podr\u017Ea\u0165 shift kl\u00E1vesu)',
    //'grow':
    //    'zv\u00E4\u010D\u0161i\u0165',
    //'shrink':
    //    'zmen\u0161i\u0165',
    //'flip ↔':
    //    'oto\u010Di\u0165 ↔',
    //'flip ↕':
    //    'oto\u010Di\u0165 ↕',
    
    'Vector Paint Editor':
        'Vektor Editor',
    'Rectangle\n(shift: square)':
        'Obd\u013A\u017Enik\n(shift: \u0161tvorec)',
    'Ellipse\n(shift: circle)':
        'Elipsa\n(shift: kruh)',
    'Selection tool':
        'V\u00FDber',
    'Line tool\n(shift: constrain to 45º)':
        '\u010Diara\n(shift: obmedzenie na 45°)',
    'Closed brush\n(free draw)':
        'Uzatvoren\u00FD \u0161tetec\n(vo\u013En\u00E9 kreslenie)',
    'Paint a shape\n(shift: secondary color)':
        'Vyfarbi tvar\n(shift: sekund\u00E1rna farba)',
    'Pipette tool\n(pick a color from anywhere\nshift: secondary color)':
        'Pipeta\n(vyber farbu kdeko\u013Evek\nshift: sekund\u00E1rna farba)',
    'Edge color\n(left click)':
        'Farba okraja\n(\u013Eav\u00FD klik)',
    'Fill color\n(right click)':
        'Vypl\u0148 farbou\n(prav\u00FD klik)',
   // 'Top':
   //     'vrch',
   // 'Bottom':
   //     'spodok',
   // 'Up':
   //     'hore',
   // 'Down':
   //     'dole',


    // project notes
    'Project Notes':
        'Pozn\u00E1mky k projektu',

    // new project
    'New Project':
        'Nov\u00FD projekt',
    'Replace the current project with a new one?':
        'Nahradi\u0165 aktu\u00E1lny projekt nov\u00FDm?',

    // save project
    'Save Project As...':
        'Ulo\u017Ei\u0165 projekt ako...',
    'Save Project':
        'Ulo\u017Ei\u0165 projekt',

    // export blocks
    'Export blocks':
        'Export blokov',
    'Import blocks':
        'Importuj bolky',
    'this project doesn\'t have any\ncustom global blocks yet':
        'Tento projekt e\u0161te nem\u00E1 \u017Eiadne vlasnt\u00E9 glob\u00E1lne bloky',
    'select':
        'vybra\u0165',
    'none':
        'ni\u010D',

    // variable dialog
    'for all sprites':
        'pre v\u0161etky objekty',
    'for this sprite only':
        'iba pre tento objekt',

    // variables refactoring
    'rename only\nthis reporter':
        'premenova\u0165 len\ntento blok',
    'rename all...':
        'premenova\u0165 v\u0161etko...',
    'rename all blocks that\naccess this variable':
        'premenova\u0165 v\u0161etky bloky,\nktor\u00E9 pristupuj\u00FA na t\u00FAto premenn\u00FA',


    // block dialog
    'Change block':
        'Zmeni\u0165 blok',
    'Command':
        'Pr\u00EDkaz',
    'Reporter':
        'Funkcia',
    'Predicate':
        'Podmienka',

    // block editor
    'Block Editor':
        'Editor blokov',
    'Method Editor':
        'Editor Met\u00F3d',
    'Apply':
        'Pou\u017Ei\u0165',

    // block deletion dialog
    'Delete Custom Block':
        'zmaza\u0165 vlastn\u00FD blok',
    'block deletion dialog text':
        'Zmazan\u00EDm tohoto bloku sa odstr\u00E1nia v\u0161etky jeho pou\u017Eitia.\n' +
            'Naozaj chcete tento blok zmaza\u0165?',

    // input dialog
    'Create input name':
        'Vytvori\u0165 vstup',
    'Edit input name':
        'Upravi\u0165 vstup',
    'Edit label fragment':
        'Upravi\u0165 n\u00E1pis',
    'Title text':
        'Nadpis',
    'Input name':
        'Vstup',
    'Delete':
        'Zmaza\u0165',
    'Object':
        'Objekt',
    'Number':
        '\u010D\u00EDslo',
    'Text':
        'Text',
    'List':
        'Zoznam',
    'Any type':
        '\u013Eubovo\u013En\u00FD',
    'Boolean (T/F)':
        'Boolean (P/N)',
    'Command\n(inline)':
        'Pr\u00EDkaz\n(vnoren\u00FD)',
    'Command\n(C-shape)':
        'Pr\u00EDkaz\n(C-tvar)',
    'Any\n(unevaluated)':
        '\u010Doko\u013Evek\n(nevyhodnoten\u00E9)',
    'Boolean\n(unevaluated)':
        'Boolean\n(nevyhodnoten\u00E9)',
    'Single input.':
        'Jednoduch\u00FD vstup.',
    'Default Value:':
        'V\u00FDchozia hodnota:',
    'Multiple inputs (value is list of inputs)':
        'Viac vstupov (hodnoty v zozname)',
    'Upvar - make internal variable visible to caller':
        'Vn\u00FAtorn\u00E1 premenn\u00E1 vidite\u013En\u00E1 pre volanie',

    // About Snap
    'About Snap':
        'O programe Snap',
    'Back...':
        'Sp\u00E4\u0165...',
    'License...':
        'Licencia...',
    'Modules...':
        'Moduly...',
    'Credits...':
        'Prispievatelia...',
    'Translators...':
        'Prekladatelia',
    'License':
        'Licencia',
    'current module versions:':
        'aktu\u00E1lne verzie modulov:',
    'Contributors':
        'Prispievatelia',
    'Translations':
        'Preklady',

    // variable watchers
    'normal':
        'norm\u00E1lny',
    'large':
        've\u013Ek\u00FD',
    'slider':
        'posuvn\u00EDk',
    'slider min...':
        'minimum...',
    'slider max...':
        'maximum...',
    'import...':
        'Importova\u0165...',
    'raw data...':
        'surov\u00E9 d\u00E1ta...',
    'import without attempting to\nparse or format data':
        'importova\u0165 bez\nform\u00E1tovania d\u00E1t',
    'Slider minimum value':
        'minim\u00E1lna hodnota posuvn\u00EDku',
    'Slider maximum value':
        'Maxim\u00E1lna hodnota posuvn\u00EDku',

    // list watchers
    'length: ':
        'd\u013A\u017Eka: ',

    // coments
    'add comment here...':
        'prida\u0165 sem koment\u00E1r...',
    'comment pic...':
        'pozn\u00E1mka k obr\u00E1zku...',
    'open a new window\nwith a picture of this comment':
        'otvori\u0165 nov\u00E9 oknons obr\u00E1zkom tejto pozn\u00E1mky',

    // drow downs
    // directions
    '(90) right':
        '(90) doprava',
    '(-90) left':
        '(-90) do\u013Eava',
    '(0) up':
        '(0) hore',
    '(180) down':
        '(180) dole',
    'random':
    	'n\u00E1hodn\u00FD',
     'random position':
     	'n\u00E1hodn\u00E1 poz\u00EDcia',

    // collision detection
    'mouse-pointer':
        'kurzor my\u0161i',
    'edge':
        'okraj',
    'pen trails':
        'stopa pera',
    'center':
        'stred',

    // costumes
    'Turtle':
        'korytna\u010Dka',
    'Empty':
        'Pr\u00E1zdny',
    'Paint a new costume':
        'Nakresli nov\u00FD kost\u00FDm',
    'Import a new costume from your webcam':
        'Importuj nov\u00FD kost\u00FDm z web kamery',
    'Please make sure your web browser is up to date\nand your camera is properly configured. \n\nSome browsers also require you to access Snap!\nthrough HTTPS to use the camera.\n\nPlase replace the "http://" part of the address\nin your browser by "https://" and try again.':
        'Ubezpe\u010D sa pros\u00EDm, \u017Ee Tvoj prehlida\u010D je aktualizovan\u00FD\na kamera je spr8vne nakonfigurovan\u00E1.\n\nNiektor\u00E9 prehliada\u010De vy\u017Eaduj\u00FA pr\u00EDsput ku Snap!\ncez HTTPS pre pou\u017Eitie kamery.\n\nPros\u00EDm prep\u00ED\u0161 "http://" \u010Das\u0165 adresy\nv prehliada\u010Di na "https://" a sk\u00FAs znovu.',
    'Camera':
        'Kamera',
    
    // sounds
    'Record a new sound':
        'Nahraj nov\u00FD zvuk',
    

    // graphical effects, pen color
    'color':
        'farba',
    'hue':
        'odtie\u0148',
    'fisheye':
        'rybie oko',
    'whirl':
        '\u0161pir\u00E1la',
    'pixelate':
        'pixeluj',
    'mosaic':
        'mozajka',
    'saturation':
        'satur\u00E1cia',
    'brightness':
        'jas',
    'transparency':
        'prieh\u013Eadnos\u0165',
    'ghost':
        'duch',
    'negative':
        'negat\u00EDv',
    'comic':
        'moar\u00E9',
    'confetti':
        'farebnos\u0165',

    // keys
    'space':
        'medzern\u00EDk',
    'up arrow':
        '\u0161\u00EDpka hore',
    'down arrow':
        '\u0161\u00EDpka dole',
    'right arrow':
        '\u0161\u00EDpka doprava',
    'left arrow':
        '\u0161\u00EDpka do\u013Eava',
    'any key':
        'ak\u00E1ko\u013Evek kl\u00E1vesa',
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
        'Nov\u00FD...',
    '__shout__go__':
        'kliknutie na zelen\u00FA vlajku',

    // math functions
    'abs':
        'absol\u00FAtna hodnota',
    'ceiling':
        'zaokr\u00FAhli\u0165 nahor',
    'floor':
        'zaokr\u00FAhli\u0165 nadol',
    'sqrt':
        'odmocnina',
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
        'nie',

    // delimiters
    'letter':
        'hl\u00E1ska',
    'word':
        'slovo',
    'whitespace':
        'medzera',
    'line':
        'riadok',
    'tab':
        'tabul\u00E1tor',
    'cr':
        'nov\u00FD riadok',

    // data types
    'number':
        '\u010D\u00EDslo',
    'text':
        'text',
    'Boolean':
        'boolean',
    'list':
        'zoznam',
    'command':
        'blok pr\u00EDkazov',
    'reporter':
        'blok funkci\u00ED',
    'predicate':
        'podmienky',
    'sprite':
        'objekt',

    // list indices
    'last':
        'posledn\u00FD',
    'any':
        'ktor\u00FDko\u013Evek',

    // attributes
    'my':
        'atrib\u00FAt',
    'neighbors':
        'susedia',
    'self':
        's\u00E1m seba',
    'other sprites':
        'in\u00E9 objekty',
    'parts':
        '\u010Dasti',
    'anchor':
        'kotva',
    'parent':
        'predok',
    'temporary?':
        'do\u010Dasn\u00FD?',
    'children':
        'potomkovia',
    'clones':
        'klony',
    'other clones':
        'in\u00E9 klony',
    'dangling?':
        'k\u00FDvaj\u00FAce?',
    'draggable?':
        'potiahnute\u013En\u00E9?',
    'rotation style':
        'rota\u010Dn\u00FD typ',
    'rotation x':
        'rot\u00E1cia x',
    'rotation y':
        'rot\u00E1cia y',
    'center x':
        'centrum x',
    'center y':
        'centrum y',
    'name':
        'meno',
    'costume':
        'kost\u00FDm',
    'stage':
        'javisko',
    'costumes':
        'kost\u00FDmy',
    'sounds':
        'Zvuky',
    'scripts':
        'Skripty',
    'width':
        '\u0161\u00EDrka',
    'height':
        'v\u00FD\u0161ka',
    'left':
        'okraj v\u013Eavo',
    'right':
        'okraj vpravo',
    'top':
        'okraj hore',
    'bottom':
        'okraj dolu',

    // inheritance
    'inherited':
        'zdeden\u00FD',
    'check to inherit\nfrom':
        'za\u0161krtnut\u00EDm zapne dedenie\nz',
    'uncheck to\ndisinherit':
        'od\u0161krtnut\u00EDm\nodstr\u00E1ni dedenie'
};
