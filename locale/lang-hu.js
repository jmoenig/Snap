/*

    lang-hu.js

    A SNAP! magyar fordítása

    written by Makány György, Faragó Attila

    Copyright (C) 2015-2022 by Makány György, Faragó Attila

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

SnapTranslator.dict.hu = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    Ä, ä   \u00c4, \u00e4
    Ö, ö   \u00d6, \u00f6
    Ü, ü   \u00dc, \u00fc
    ß      \u00df
*/

    // translations meta information
    'language_name':
        'Magyar', // the name as it should appear in the language menu
    'language_translator':
        'Makány György, Faragó Attila', // your name for the Translators tab
    'translator_e-mail':
        'makany.gyorgy@gmail.com, attila.farago@sap.com', // optional
    'last_changed':
        '2022-01-25', // this, too, will appear in the Translators tab

    // GUI
    // control bar:
    'untitled':
        'névtelen',
    'development mode':
        'fejlesztői mód',

    // categories:
    'Motion':
        'Mozgás',
    'Looks':
        'Kinézet',
    'Sound':
        'Hang',
    'Pen':
        'Toll',
    'Control':
        'Vezérlés',
    'Sensing':
        'Érzékelés',
    'Operators':
        'Műveletek',
    'Variables':
        'Változók',
    'Lists':
        'Listák',
    'Other':
        'Egyebek',

    // editor:
    'draggable':
        'húzható',

    // tabs:
    'Scripts':
        'Feladatok',
    'Costumes':
        'Jelmezek',
    'Backgrounds':
        'Hátterek',
    'Sounds':
        'Hangok',

    // names:
    'Sprite':
        'Szereplő',
    'Stage':
        'Játéktér',

    // rotation styles:
    'don\'t rotate':
        'nem foroghat',
    'can rotate':
        'foroghat',
    'only face left/right':
        'jobbra-balra fordulhat',

    // new sprite button:
    'add a new sprite':
        'Új szereplő',

    'add a new Turtle sprite':
        'új teknőc rajzának hozzáadása',
    'paint a new sprite':
        'új alakzat rajzolása',
    'take a camera snapshot and\nimport it as a new sprite':
        'készíts fotót a webkamerával és\nimportáld új szereplőként',
    

    // tab help
    'costumes tab help':
        'Kép importálása egy webhelyről vagy a számítógépről',
    'import a sound from your computer\nby dragging it into here':
        'Hang importálása egy webhelyről vagy a számítógépről',

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
        'Választott játéktér:\nnincs mozgó elem',

    'move %n steps':
        'menj %n lépést',
    'turn %clockwise %n degrees':
        'fordulj %clockwise %n fokot',
    'turn %counterclockwise %n degrees':
        'fordulj %counterclockwise %n fokot',
    'point in direction %dir':
        'nézz %dir fokos irányba',
    'point towards %dst':
        'nézz %dst irányába',
    'go to x: %n y: %n':
        'ugorj x: %n y: %n',
    'go to %dst':
        'ugorj %dst helyére',
    'glide %n secs to x: %n y: %n':
        'csússz %n mp-ig x: %n y: %n',
    'change x by %n':
        'x változzon: %n',
    'set x to %n':
        'x legyen %n',
    'change y by %n':
        'y változzon: %n',
    'set y to %n':
        'y legyen %n',
    'if on edge, bounce':
        'ha szélén vagy, pattanj vissza',
    'x position':
        'x hely',
    'y position':
        'y hely',
    'direction':
        'irány',

    // looks:
    'switch to costume %cst':
        'a jelmez legyen %cst',
    'next costume':
        'a következő jelmez',
    'costume #':
        'a jelmez sorszáma',
    'say %s for %n secs':
        'mondd %s %n mp-ig',
    'say %s':
        'mondd %s',
    'think %s for %n secs':
        'gondold %s %n mp-ig',
    'think %s':
        'gondold %s',
    'Hello!':
        'Szia!',
    'Hmm...':
        'Hmm...',
    '%img of costume %cst':
        '%img jelmez %cst',
    'new costume %l width %dim height %dim':
        'új jelmez %l szélesség %dim magasság %dim',
    'stretch %cst x: %n y: %n %':
        'nyújtsd %cst x: %n y: %n %',
    'change %eff effect by %n':
        '%eff hatás változzon %n',
    'set %eff effect to %n':
        '%eff hatás legyen %n',
    'clear graphic effects':
        'töröld a grafikus hatásokat',
    '%eff effect':
        '%eff hatás',
    'change size by %n':
        'a méret változzon %n',
    'set size to %n %':
        'a méret legyen %n %',
    'size':
        'méret',
    'show':
        'jelenj meg',
    'hide':
        'tűnj el',
    'shown?': 
        'látható?',
    'go to %layer layer': 
        'kerülj %layer',
    'front': 
        'előre',
    'back': 
        'hátulra',
    'go back %n layers':
        'kerülj %n szinttel hátrébb',

    'development mode \ndebugging primitives:':
        'fejlesztő mód \nblokkok hibakeresése',
    'console log %mult%s':
        'konzolra írás: %mult%',
    'alert %mult%s':
        'felbukkanó: %mult%',

    'pixels': 
        'pixelek',
    'current':
        'jelenlegi',

    // sound:
    'play sound %snd':
        'játszd le: %snd',
    'play sound %snd until done':
        'játszd le: %snd és várd meg',
    'stop all sounds':
        'minden hangot állíts le',
    'rest for %n beats':
        'szünetelj %n ütemet',
    'play sound %snd at %rate Hz':
        'játszd le %snd hangot %rate Hz mintavételezéssel',
    '%aa of sound %snd':
        'hangminta %aa %snd',
    'duration':
        'hossz',
    'length':
        'elemek száma',
    'number of channels':
        'csatornák száma',
    'new sound %l rate %rate Hz':
        'új hang %l mintavételezéssel %rate Hz',
    'play note %note for %n beats':
        'játszd le a %note hangot %n ütemig',
    'set instrument to %inst':
        'hangeszközt állítsd: %inst',
    'change tempo by %n':
        'a tempó változzon: %n',
    'set tempo to %n bpm':
        'a tempó legyen %n ütem/perc',
    'tempo':
        'tempó',

    'change volume by %n':
        'hangerő változzon: %n',
    'set volume to %n %':
        'hangerő legyen %n %',
    'change balance by %n':
        'hangmérleg változzon: %n',
    'set balance to %n':
        'hangmérleg legyen %n',
    'balance':
        'hangmérleg',
    'play frequency %n Hz':
        'játszt le frekvenciát %n Hz',
    'stop frequency':
        'állítsd le a frekvenciát',
    'play %n Hz for %n secs':
        'játssz %n Hz %n mp hosszan',

    // "instruments", i.e. wave forms
    '(1) sine':
        '(1) szinusz',
    '(2) square':
        '(2) négyzetes',
    '(3) sawtooth':
        '(3) fűrészfog',
    '(4) triangle':
        '(4) háromszög',

    // pen:
    'clear':
        'töröld a rajzokat',
    'pen down':
        'tollat le',
    'pen up':
        'tollat fel',
    'pen down?':
        'toll lent?',
    'set pen color to %clr':
        'tollszín legyen %clr',
    'set background color to %clr':
        'hátteret állítsd %clr',
    'change pen %clrdim by %n':
        'toll %clrdim változzon %n',
    'change background %clrdim by %n':
        'háttér %clrdim változzon %n',
    'set pen %clrdim to %n':
        'toll %clrdim legyen a %n',
    'set background %clrdim to %n':
        'háttér %clrdim legyen a %n',
    'pen %pen':
        'toll %pen',
    'change pen size by %n':
        'tollméret változzon %n',
    'set pen size to %n':
        'tollméret legyen %n',
    'stamp':
        'készíts lenyomatot',

    'fill':
        'kitöltés',
    'write %s size %n':
        'írd %s mérettel %n',
    'paste on %spr':
        'nyomtasd erre %spr',
    'cut from %spr':
        'vágd ki innen %spr',
    'pen vectors':
        'toll vektor',

    // control:
    'when %greenflag clicked':
        '%greenflag -ra kattintáskor',
    'when %keyHat key pressed %keyName':
        '%keyHat lenyomásakor %keyName',
    'when I am %interaction':
        'amikor %interaction ',
    'clicked':
        'rám kattintanak',
    'pressed':
        'gombnyomásra',
    'dropped':
        'leejtenek',
    'mouse-entered':
        'az egér fölém kerül',
    'mouse-departed':
        'az egér lemegy rólam',
    'scrolled-down':
    	'lefelé görgetnek',
    'scrolled-up':
        'felfelé görgetnek',
    'stopped':
        'megállítottak',
    'when %b':
        'amikor %b',
    'when I receive %msgHat %message':
        '%msgHat üzenet érkezésekor %message',
    'broadcast %msg %receive':
        'küldj mindenkinek %msg %receive üzenetet',
    'broadcast %msg %receive and wait':
        'küldj mindenkinek %msg %receive üzenetet és várj',
    'send %msg to %spr':
        'küldd %msg a szereplőnek %spr',
    'Message name':
        'Az üzenet neve',
    'message':
        'üzenet',
    'any message':
        'bármilyen üzenet',
    'wait %n secs':
        'várj %n mp-et',
    'wait until %b':
        'várj amíg %b',
    'forever %loop':
        'mindig %loop',
    'repeat %n %loop':
        'ismételd %n -szer %loop',
    'repeat until %b %loop':
        'ismételd amíg %b %loop',
    'for %upvar = %n to %n %cla':
        'ciklus %upvar = %n tól %n ig %cla',
    'if %b %c':
        'ha %b %c',
    'if %b %c else %c':
        'ha %b %c különben %c',
    'if %b then %s else %s':
        'ha %b %s különben %s',
    'report %s':
        'jelents %s',
    'stop %stopChoices':
        '%stopChoices álljon le',
    'all':
        'minden feladat',
    'this script':
        'ez a feladat',
    'this block':
        'ez a blokk',
    'stop %stopOthersChoices':
        '%stopOthersChoices álljon le',
    'all but this script':
        'minden más feladat',
    'other scripts in sprite':
        'ennek a szereplőnek minden más feladata',
    'pause all %pause':
        'várakozz %pause',
    'run %cmdRing %inputs':
        'futtasd %cmdRing %inputs értékkel',
    'launch %cmdRing %inputs':
        'induljon %cmdRing %inputs',
    'call %repRing %inputs':
        'hívd %repRing %inputs',
    'run %cmdRing w/continuation':
        'futtasd %cmdRing folytatással',
    'call %cmdRing w/continuation':
        'hívd meg %cmdRing folytatással',
    'warp %c':
        'gyorsítva %c',
    'when I start as a clone':
        'másolatként indítva',
    'create a clone of %cln':
        'készíts másolatot %cln',
    'a new clone of %cln':
        'új másolat %cln',
    'myself':
        'magam',
    'delete this clone':
        'töröld ezt a másolatot',
    'switch to scene %scn %send':
        'válts jelenetet %scn %send',
    'and send':
        'és küldd',
    'next':
        'következő',
    'previous':
        'előző',

    'tell %spr to %cmdRing %inputs':
        'hajtsd végre %spr %cmdRing %inputs',
    'ask %spr for %repRing %inputs':
        'kérdezd le %spr %repRing %inputs',

    // sensing:
    'touching %col ?':
        'érint %col ?',
    'touching %clr ?':
        'érint %clr színt?',
    'color %clr is touching %clr ?':
        '%clr szín érint %clr színt?',
    'ask %s and wait':
        'kérdezd meg %s és várj',
    'what\'s your name?':
        'Mi a neved?',
    'answer':
        'válasz',
    'mouse x':
        'egér x',
    'mouse y':
        'egér y',
    'mouse down?':
        'egér lenyomva?',
    'key %key pressed?':
        '%key gomb lenyomva?',
    '%rel to %dst': 
        '%rel ehhez %dst',
    'distance':
    	'távolság',
    'ray length':
        'távolság a széléig',
    '%asp at %loc' :
        '%asp itt %loc',
    'r-g-b-a':
        'r-g-b-a szín',
    'sprites' :
        'Objekte',
    'reset timer':
        'nullázd az órát',
    'timer':
        'stopper',
    '%att of %spr':
        '%att itt %spr',
    'my %get':
        'saját %get',
    'object %self':
        'objektum %self',
    'http:// %s':
        'http:// %s',
    'turbo mode':
        'turbo mód',
    'flat line ends':
        'egyszerű vonalvégződés',
    'is %setting on?':
        '%setting bállítás bekapcsolva?',
    'set %setting to %b':
        'legyen %setting beállítás %b',
    'current %dates':
        'aktuális %dates',
    'year':
        'év',
    'month':
        'hónap',
    'date':
        'nap',
    'day of week':
        'a hét napja',
    'hour':
        'óra',
    'minute':
        'perc',
    'second':
        'másodperc',
    'time in milliseconds':
        'idő (ezredmásodpercben)',
    'microphone %audio':
        'mikrofon %audio',
    'volume':
        'hangerő',
    'note':
        'hangjegy',
    'frequency':
        'frekvencia',
    'samples':
        'hangminta',
    'sample rate':
        'mintavétel',
    'spectrum':
        'frekvenciaspektrum',
    'resolution':
        'felbontás',
    'Microphone resolution...':
        'Mikrofon felbontás...',
    'Microphone':
        'Mikrofon',
    'low':
        'alacsony',
    'high':
        'magas',
    'max':
        'max',
    'video %vid on %self':
        'video %vid ezen %self',
    'motion':
        'mozgás',
    'snap':
        'pillanatfelvétel',
    'set video transparency to %n':
        'legyen video átlátszósága %n',
    'video capture':
        'video felvétel',
    'mirror video':
        'video tükrözése',
    'filtered for %clr':
        '%clr szín szűrése',
    'stack size':
        'veremméret',
    'frames':
        'keretek',
    'log pen vectors':
        'toll vektorok mentése',
    '%block of block %repRing':
        'blokk %block %repRing',
    'definition':
        'definíció',
    'custom?':
        'egyedi?',
    'global?':
        'globális?',

    // operators:
    '%n mod %n':
        '%n osztva %n maradéka',
    'round %n':
        '%n kerekítve',
    '%fun of %n':
        '%fun %n',
    'pick random %n to %n':
        'véletlen %n és %n között',
    'and':
        'és',
    'or':
        'vagy',
    'not %b':
        'nem %b',
    'true':
        'igaz',
    'false':
        'hamis',
    'join %words':
        'összefűz %words',
    'split %s by %delim':
        '%s szétvágása %delim jeleknél',
    'hello':
        'hello',
    'world':
        'világ',
    'letter %ix of %s':
        '%ix karaktere ennek: %s',
    'length of %s':
        '%s hossza',
    'unicode of %s':
        '%s Unicode-ra alakítva',
    'unicode %n as letter':
        'unicode %n betűként',
    'is %s a %typ ?':
        '%s egy %typ ?',
    'is %all== ?':
        '%all== ?',
    'identical to':
        'ugyanaz, mint',
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
        'JavaScript függvény ( %mult%s ) { %code }',
    'compile %repRing':
    	'fordítsd %repRing',

    'type of %s':
        'típus: %s',

    // variables:
    'Make a variable':
        'Új változó',
    'Variable name':
        'Változónév',
    'Script variable name':
        'Feladatváltozó név',
    'inherit %shd':
        'örököld %shd',
    'Delete a variable':
        'Változó törlése',

    'set %var to %s':
        '%var legyen %s',
    'change %var by %n':
        '%var változzon ennyivel: %n',
    'show variable %var':
        'írd ki: %var',
    'hide variable %var':
        'rejtsd el: %var',
    'script variables %scriptVars':
        'feladatváltozó: %scriptVars',

    // lists:
    'list %exp':
        'lista %exp',
    'numbers from %n to %n':
        'számok ettől %n eddig %n',
    '%s in front of %l':
        '%s megelőzi %l',
    'item %idx of %l':
        '%idx eleme a %l listának',
    'all but first of %l':
        '%l elsőnkívüli elemei',
    '%la of %l':
        '%la itt %l',
    'rank':
        'rang',
    'dimensions':
        'dimenziók',
    'flatten':
        'laposít',
    'columns':
        'oszlopok',
    'reverse':
        'visszafelé',
    'lines':
        'sorok',
    '%l contains %s':
        '%l tartalmazza %s',
    'thing':
        'dolog',
    'is %l empty?':
        'üres %l ?',
    'index of %s in %l':
        'index %s itt %l',
    'map %repRing over %l':
        'képezd le %repRing erre %l',
    'keep items %predRing from %l':
        'válogasd ki az ilyen %predRing elemeket ebből %l',
    'find first item %predRing in %l':
        'keresd ki az első %predRing elemet ebből %l',
    'combine %l using %repRing':
        'kombináld %l így %repRing',
    '%blitz map %repRing over %l':
        '%blitz képezd le %repRing erre %l',
    '%blitz keep items %predRing from %l':
        '%blitz válogasd ki az ilyen %predRing elemeket ebből %l',
    '%blitz find first item %predRing in %l':
        '%blitz keresd ki az első %predRing elemet ebből %l',
    '%blitz combine %l using %repRing':
        '%blitz kombináld %l így %repRing',
    'for each %upvar in %l %cla':
        'minden elemre %upvar ebből %l %cla',
    'item':
        'elem',
    'value':
        'érték',
    'index':
        'index',
    'append %lists':
        'fűzd hozzá %lists',
    'reshape %l to %nums':
        'formáld át %l így %nums',
    'add %s to %l':
        '%s hozzáadása %l listához',
    'delete %ida of %l':
        '%ida elem törlése %l listából',
    'insert %s at %idx of %l':
        '%s beszúrása %idx . pozícióba ebbe: %l',
    'replace item %idx of %l with %s':
        '%idx helyettesítése %l listában erre: %s',

    // other
    'Make a block':
        'Blokk készítése',

    // menus
    // snap menu
    'About...':
        'A Snap! névjegye...',
    'Reference manual':
        'Kézikönyv',
    'Snap! website':
        'A Snap! webhelye',
    'Download source':
        'A forráskód letöltése',
    'Switch back to user mode':
        'Vissza a felhasználói üzemmódra',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'A deep-Morphic\nhelyzetérzékeny menük\nés a felhasználóbarát menük kikapcsolása',
    'Switch to dev mode':
        'Átkapcsolás fejlesztői módba',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'A Morphic helyzetérzékeny menük, nyomkövetők\nés a nem felhasználóbarát mód bekapcsolása',

    // project menu
    'Project notes...':
        'Projektadatok...',
    'New':
        'Új',
    'Open...':
        'Megnyitás...',
    'Save':
        'Mentés',
    'Save to disk':
        'Lemezre írás',
    'store this project\nin the downloads folder\n(in supporting browsers)':
        'a projekt tárolása\na letöltési mappába\n(ha a böngésző engedi)',
    'Save As...':
        'Mentés másként...',
    'Import...':
        'Importálás...',
    'file menu import hint':
        'egy exportált projekt, feladatkönyvtár,\njelmez vagy hang betöltése',
    'Export project as plain text...':
        'Projekt exportálása egyszerű szövegként...',
    'Export project...':
        'Projekt exportálása...',
    'save project data as XML\nto your downloads folder':
        'mentsd le a projektet XML formátumban\na letöltés mappába',
    'show project data as XML\nin a new browser window':
        'a projekt adatainak megtekintése\negy új böngészőablakban',
    'Export blocks...':
        'Blokk exportálása...',
    'save global custom block\ndefinitions as XML':
        'mentsd el a saját blokkokat\nXML formátumban',
    'Unused blocks...':
          'Nem használt blokkok...',
    'find unused global custom blocks\nand remove their definitions':
        'keresd meg a nem használt blokkokat\nés töröld a definícióikat',
    'Remove unused blocks':
        'Töröld a nem használt blokkokat',
    'there are currently no unused\nglobal custom blocks in this project':
        'nem találtam nem használt saját blokkot a projektben',
    'unused block(s) removed':
        'nem használt blokkok törölve',
    'Hide blocks...':
        'Blokkok elrejtése...',
    'New category...':
        'Új kategória...',
    'Remove a category...':
        'Kategória törlése...',
    'Scenes...':
        'Jelenetek...',
    'New scene':
        'Új jelenet',
    'Add scene...':
        'Jelenet hozzáadása...',
    'Export summary...':
        'Összefoglaló exportálása...',
    'save a summary\nof this project':
        'mentsd el a projekt összefoglalóját',
    'Contents':
        'Tartalom',
    'Kind of':
        'Típus',
    'Part of':
        'Része',
    'Parts':
        'Részei',
    'Blocks':
        'Blokkok',
    'For all Sprites':
        'Minden szereplőre',
    'Libraries...':
        'Modulkönyvtárak...',
    'Select categories of additional blocks to add to this project.':
        'Válassza ki a projekthez adandó blokkok kategóriáit.',
    'Select a costume from the media library':
        'Válasszon ki egy jelmezt a médiakönyvtárból.',
    'Select a sound from the media library':
        'Válasszon ki egy hangot a médiakönyvtárból.',
    'Undelete sprites...':
        'Szereplők visszaállítása...',
    'Bring back deleted sprites':
        'Állítsd vissza a törölt szereplőket',
    'trash is empty':
        'üres a kuka',

    'Import library':
        'Modulkönyvtár importálása',

    'Loading':
        'Betöltés',
    'Imported':
        'Importálva',
    'Iteration, composition':
        'Ismétlés, Kompozíció',
    'List utilities':
        'Lista eszközök',
    'Variadic reporters':
        'Változó függvények',
    'Web services access (https)':
        'Web service hozzáférés (https)',
    'Multi-branched conditional (switch)':
        'Több-ágú feltételes blokk (elágazás)',
    'LEAP Motion controller':
        'LEAP mozgásvezérlő',
    'Words, sentences':
        'Szavak, mondatok',
    'Catch errors in a script':
        'Programban hibák elkapása',
    'Set RGB or HSV pen color':
        'Toll RGB vagy HSV szín szerint',
    'Text to speech':
        'Szöveg beszéddé',
    'Provide 100 selected colors':
        '100 kiválasztott szín',
    'Infinite precision integers, exact rationals, complex':
        'Végtelen pontosság a számokban',
    'Provide getters and setters for all GUI-controlled global settings':
        'Érték-olvasó és -író minden felületen megjelenő beállításhoz',
    'Allow multi-line text input to a block':
        'Többsoros szövegbevitel megengedése',
    'Create variables in program':
        'Programban változók létrehozása',

    // cloud menu
    'Login...':
        'Belépés...',
    'Signup...':
        'Feliratkozás...',

    'Logout':
        'Kijelentkezés',
    'Change Password...':
        'Jelszó megváltoztatása...',
    'Reset Password...':
        'A jelszó alaphelyzetre állítása...',
    'Resend Verification Email...':
        'Ellenörző e-mail újraküldése...',
    'Open in Community Site':
        'Projektoldalon megnyítás',

    // settings menu
    'Language...':
        'Nyelv...',
    'Zoom blocks...':
        'Blokkok nagyítása...',
    'Fade blocks...':
        'Blokkok átlátszósága...',
    'Stage size...':
        'Játéktér mérete...',
    'Stage size':
        'Játéktér mérete',
    'Stage width':
        'Játéktér szélessége',
    'Stage height':
        'Játéktér magassága',
    'Default':
        'Alapérték',
    'Blurred shadows':
        'Elmosódó árnyékok',
    'uncheck to use solid drop\nshadows and highlights':
        'vedd ki a jelölést, ha éles árnyékokat\nés kiemeléseket kíván használni',
    'check to use blurred drop\nshadows and highlights':
        'jelölje be, ha elmosódó árnyékokat\nés kiemeléseket kíván használni',
    'Zebra coloring':
        'Zebra színezés',
    'check to enable alternating\ncolors for nested blocks':
        'engedélyezi a beágyazott blokkok\neltérő színezését',
    'uncheck to disable alternating\ncolors for nested block':
        'tiltja a beágyazott blokkok\neltérő színezését',
    'Dynamic input labels':
        'Dinamikus beviteli feliratok',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'üresen hagyva tiltja a többszörös\nbeviteli mezők dinamikus feliratait',
    'check to enable dynamic\nlabels for variadic inputs':
        'bejelölve engedélyezi a többszörös\nbeviteli mezők dinamikus feliratait',
    'Prefer empty slot drops':
        'Üres helyre ejt először',
    'settings menu prefer empty slots hint':
        'bekapcsolva az üres helyre ejti\nelőször a behúzott blokkot',
    'uncheck to allow dropped\nreporters to kick out others':
        'kikapcsolva engedélyezed,\nhogy a behúzott blokk kirúgjon más blokkokat',
    'check to turn on\n visible stepping (slow)':
        'bekapcsolva lassítva láthatod a program lépéseit',
    'uncheck to turn off\nvisible stepping':
        'kikapcsolva nem látod már\nlassítva láthatod a program lépéseit',
    'Long form input dialog':
        'Hosszú formátumú beviteli párbeszéd',
    'Plain prototype labels':
        'Egyszerű blokk prototípus címkék',
    'uncheck to always show (+) symbols\nin block prototype labels':
        'üresen hagyva mindig látszik a (+) jel\na blokk prototípus cimkéjében',
    'check to hide (+) symbols\nin block prototype labels':
        'bejelölve látszik a (+) jel\na blokk prototípus cimkéjében',
    'check to always show slot\ntypes in the input dialog':
        'bejelölve mindig látszik a csatlakozás típusa a beviteli párbeszédablakban',
    'uncheck to use the input\ndialog in short form':
        'kapcsolja ki, ha rövidített\npárbeszédablakot akar használni',
    'JavaScript extensions':
        'JavaScript kiegészítők',
    'check to support\nnative JavaScript functions':
        'bekapcsolva a natív\nJavaScript függvények elérhetőek',
    'uncheck to disable support for\nnative JavaScript functions':
        'kikapcsolva a natív\nJavaScript függvények nem elérhetőek',
    'JavaScript extensions for Snap!\nare turned off':
        'JavaScript natív függvények\nkikapcsolva',
    'Extension blocks':
        'Kiegészítő blokkok',
    'uncheck to hide extension\nprimitives in the palette':
        'kikapcsolva a kiegészítő blokkokat\nelrejti a palettáról',
    'check to show extension\nprimitives in the palette':
        'bekapcsolva a kiegészítő blokkokat\nmegjeleníti a palettán',
    'Input sliders':
        'Beviteli csúszkák',
    'uncheck to disable\ninput sliders for\nentry fields':
        'kikapcsolva letiltja a csúszkákat\na beviteli mezőknél',
    'check to enable\ninput sliders for\nentry fields':
        'bekapcsolva engedélyezi a csúszkákat\na beviteli mezőknél',
    'Retina display support':
        'Retina felbontás támogatása',
    'uncheck for lower resolution,\nsaves computing resources':
        'kikapcsolva alacsonyabb felbontást mutat\nés kíméli az erőforrásokat',
    'check for higher resolution,\nuses more computing resources':
        'bekapcsolva magasabb felbontást mutat\nés több erőforrást használ',
    'Codification support':
        'A kodifikáció támogatása',
    'Clicking sound':
        'A kattintás hangja',
    'uncheck to turn\nblock clicking\nsound off':
        'kikapcsolva letiltja a blokkra kattintás hangját',
    'check to turn\nblock clicking\nsound on':
        'bekapcsolva engedélyezi a blokkra kattintás hangját',
    'Animations':
        'Animációk',
    'uncheck to disable\nIDE animations':
        'kikapcsolva letiltja\naz IDE animációit',
    'Turbo mode':
        'Turbó mód',
    'check to prioritize\nscript execution':
        'bekapcsolva a programozott\nvégrehajtás lesz az elsődleges',
    'uncheck to run scripts\nat normal speed':
        'kikapcsolva normál sebességen\nfutnak a programok',
    'check to enable\nIDE animations':
        'bekapcsolva engedélyezi\naz IDE animációit',
    'Flat design':
        'Flat design',
    'check for alternative\nGUI design':
        'bekapcsolva más kinézetű grafikus felületet látsz',
    'uncheck for default\nGUI design':
        'kikapcsolva a normál grafikus felületet látod',
    'Nested auto-wrapping':
        'Automatikus beágyazás',
    'Keyboard Editing':
        'Billentyűzet Szerkesztés',
    'Table support':
        'Táblázat támogatás',
    'Table lines':
        'Táblázat sorok',
    'Visible stepping':
        'Léptetés látható',
    'Thread safe scripts':
        'Biztonságos programszálak',
    'uncheck to allow\nscript reentrance':
        'kikapcsolva engedélyezi a programok\n többszörös végrehajtását',
    'check to disallow\nscript reentrance':
        'bekapcsolva engedélyezi a programok\n többszörös végrehajtását',
    'Flat line ends':
        'Egyszerű vonalvégződés',
    'check for flat ends of lines':
        'kapcsolja be az\negyszerű vonalvégződéshez',
    'uncheck for round ends of lines':
        'kapcsolja ki a\nlekerekített vonalvégződésekhez',

    'Ternary Boolean slots':
        'Ternary boolean támogatás',
    'Inheritance support':
        'Öröklődés támogatás',
    'Hyper blocks support':
        'Hyper blokk támogatás',
    'uncheck to disable\nusing operators on lists and tables':
         'kapcsold ki, hogy letiltsd\na műveleteket listákon és táblázatokon',
    'check to enable\nusing operators on lists and tables':
         'jelöld be, hogy engedélyezd\na műveleteket listákon és táblázatokon',
    'Log pen vectors':
        'Toll vektorok mentése',
    'uncheck to turn off\nlogging pen vectors':
        'kapcsold ki, hogy a\ntoll vektorok mentését leáálítsd',
    'check to turn on\nlogging pen vectors':
        'kapcsold be, hogy a\ntoll vektorok mentését elindítsd',
    'Single palette':
        'Egyesített paletta',
    'check to show all blocks in a single palette':
        'bekapcsolva minden blokkot egy palettán mutat',
    'uncheck to show only the selected category\'s blocks':
        'kikapcsolva csak a kiválasztott kategóriához tartozó blokkokat mutatja',
    'Show categories':
        'Kategóriák kijelzése',
    'uncheck to hide\ncategory names\nin the palette':
        'kikacsolva elrejti\na kategóriák neveit a palettáról',
    'check to show\ncategory names\nin the palette':
        'bekapcsolva megjeleníti\na kategóriák neveit a palettán',
    'Show buttons':
        'Gombok megjelenítése',
    'uncheck to hide buttons\nin the palette':
        'kikapcsolva elrejti\na gombokat a palettáról',
    'check to show buttons\nin the palette':
        'bekapcsolva megjeleníti\na gombokat a palettán',
    'HSL pen color model':
        'HSL színmodell',
    'uncheck to switch pen colors\nand graphic effects to HSV':
        'kikapcsolva a toll színekhez\nés a grafikai hatásokhoz a HSV színmodellt használja',
    'check to switch pen colors\nand graphic effects to HSL':
        'bekapcsolva a toll színekhez\nés a grafikai hatásokhoz a HSL színmodellt használja',
    'Disable click-to-run':
        'Blokkon-kattintáskor-futtatás tiltása',
    'uncheck to enable\ndirectly running blocks\nby clicking on them':
        'kikapcsolva a blokkon kattintva\na hozzá tartozó kód futtatása',
    'check to disable\ndirectly running blocks\nby clicking on them':
        'bekapcsolva a blokkon kattintva\na hozzá tartozó kód futtatása nem indul el',

    // inputs
    'with inputs':
        'bevitelekkel',
    'input names:':
        'beviteli név:',
    'Input Names:':
        'Beviteli név:',
    'input list:':
        'Beviteli lista:',

    // context menus:
    'help':
        'Súgó',

    // palette:
    'find blocks':
        'blokk keresése',
    'hide blocks...':
        'blokkok elrejtése...',
    'Hide blocks in palette':
        'Blokkok elrejtése a palettáról',
    'unused':
        'nem használt',
    'make a category...':
        'új kategória...',
    'New Category':
        'Új kategória',
    'Blocks category name:':
        'Új kategória neve:',
    'Category color':
        'Kategória színe',
    'red':
        'piros',
    'green':
        'zöld',
    'blue':
        'kék',
    'delete a category...':
        'kategória törlése...',

    // blocks:
    'help...':
        'Súgó...',
    'relabel...':
        'átcimkézés...',
    'compile':
        'fordítás',
    'uncompile':
        'fordítás visszavonása',
    'duplicate':
        'megkettőzés',
    'make a copy\nand pick it up':
        'másolat felvétele',
    'only duplicate this block':
        'csak készítsen egy másolatot\nerről a blokkról',
    'extract':
        'emeld ki',
    'only grab this block':
        'csak ezt a blokkot fogd meg',
    'delete':
        'törlés',
    'senders...':
        'küldők...',
    'receivers...':
        'fogadók...',
    'script pic...':
        'program képe...',
    'save a picture\nof this script':
        'mentsd le a képét\nennek a programnak',
    'result pic...':
        'kép...',
    'save a picture of both\nthis script and its result':
        'mentsd le a képét ennek a programnak\naz eredményével együtt',
    'ringify':
        'körülfog',
    'unringify':
        'körülfogás megszüntetése',

    'transient':
        'átmeneti',
    'uncheck to save contents\nin the project':
        'kikapcsolva elmenti\na változó értékét a projekttel',
    'check to prevent contents\nfrom being saved':
        'bekapcsolva nem menti el\na változó értékét a projekttel',
    'new line':
        'új sor',

    // custom blocks:
    'delete block definition...':
        'blokkdefiníció törlése',
    'duplicate block definition...':
        'blokk definíció másolása...',
    'export block definition...':
        'blokk definíció exportálása...',
    'including dependencies':
        'függőségekkel együtt',
    'edit...':
        'szerkesztés...',
    'translations...':
        'fordítások...',
    'block variables...':
        'blokk változók...',
    'in palette':
        'a palettán',

    /* additional, missing from lang-de */
    'block variables':
        'blokk változók',
    'Block variable name':
        'Blokk változó neve',
    'remove block variables...':
        'blokk változók törlése...',

    // sprites:
    'edit':
        'szerkesztés',
    'clone':
        'másolás',
    'move':
        'mozgatás',
    'pivot':
        'forgatás',
    'edit the costume\'s\nrotation center':
        'szerkezd a jelmez\nforgatási középpontját',
    'rotate':
    	'forgatás',
    'stick to':
        'tapadjon',
    'detach from':
        'leválasztás erről',
    'detach all parts':
        'minden rész szétválasztása',
    'export...':
        'exportálás...',

    'parent...':
        'szülő...',
    'current parent':
        'aktuális szülő',
    'release':
        'engedd el',
    'make temporary and\nhide in the sprite corral':
        'tedd ideiglenessé\nés rejtsd el a szereplők közül',

    // stage:
    'show all':
        'mindent mutat',
    'pic...':
        'kép exportálása...',
    'save a picture\nof the stage':
        'mentsd el a játéktér képét',
    'svg...':
        'svg...',
    'export pen trails\nline segments as SVG':
        'toll vonalak exportálása\nSVG forámumba',
    'there are currently no\nvectorizable pen trail segments':
        'jelenleg nincs vektoros toll vonal',
    'turn all pen trails and stamps\ninto a new background for the stage':
        'játéktér háttérképévé változtasd\naz összes tollvonás és békyegzőt',
    'turn all pen trails and stamps\ninto a new costume for the\ncurrently selected sprite':
        'minden tollbeállítás átállítása\nés átvitele az aktuális\nalak egy új jelmezébe',
    // scripting area
    'clean up':
        'törlés',
    'arrange scripts\nvertically':
        'a program függőleges átméretezése',
    'add comment':
        'megjegyzés hozzáadása',
    'undrop':
        'visszavétel',
    'undo the last\nblock drop\nin this pane':
        'az utolsó blokk visszavétele erről a lapról',
    'redrop':
        'újra',
    'use the keyboard\nto enter blocks':
    	'a billenytűzet segítségével\nhozz létre blokkokat',
    'scripts pic...':
        'minden feladat képpé...',
    'save a picture\nof all scripts':
        'mentsd el minden program képét',
    'make a block...':
        'blokk létrehozása...',

    // costumes
    'rename':
        'átnevezés',
    'export':
        'exportálás',
    'rename costume':
        'jelmez átnevezése',
    'rename background':
        'háttér átnevezése',

    // sounds
    'Play sound':
        'Hang lejátszása',
    'Stop sound':
        'A hang leállítása',
    'Stop':
        'Állj',
    'Play':
        'Lejátszás',
    'rename sound':
        'A hang átnevezése',

    // lists and tables
    'list view...':
        'lista nézet...',
    'table view...':
        'tábla nézet...',
    'Table view':
        'Tábla nézet',
    'open in dialog...':
        'nyisd meg párbeszédablakban...',
    'blockify':
        'blokkosdítsd',
    'reset columns':
        'oszlopok visszaállítása',
    'items':
        'elemek',

    // dialogs
    // buttons
    'OK':
        'OK',
    'Ok':
        'Ok',
    'Cancel':
        'Mégsem',
    'Yes':
        'Igen',
    'No':
        'Nem',

    // help
    'Help':
        'Súgó',

    // zoom blocks
    'Zoom blocks':
        'Blokkokra közelítés',
    'build':
        'építés',
    'your own':
        'saját',
    'blocks':
        'blokkok',
    'normal (1x)':
        'normál (1x)',
    'demo (1.2x)':
        'Demó (1.2x)',
    'presentation (1.4x)':
        'Prezentáció (1.4x)',
    'big (2x)':
        'nagy (2x)',
    'huge (4x)':
        'óriási (4x)',
    'giant (8x)':
        'gigantikus (8x)',
    'monstrous (10x)':
        'szörnyeteg (10x)',

    // fade blocks
    'Fade blocks':
        'Blokkok átlátszósága',
    'block-solid (0)':
        'normál (0)',
    'medium (50)':
        'közepes (50)',
    'light (70)':
        'halvány (70)',
    'shimmering (80)':
        'csillámló (80)',
    'elegant (90)':
        'elegáns (90)',
    'subtle (95)':
        'kifinomult (95)',
    'text-only (100)':
        'csak szöveg (100)',

    // Project Manager
    'Untitled':
        'Névtelen',
    'Open Project':
        'Projekt megnyitása',
    'Open':
        'Megnyitás',
    '(empty)':
        '(üres)',
    'Saved!':
        'Mentve!',
    'Delete Project':
        'Projekt törlése',
    'Are you sure you want to delete':
        'Biztos, hogy törlöd?',
    'rename...':
        'átnevezés...',

    'Examples':
        'Példák',
    'Share':
        'Megosztás',
    'Unshare':
        'Nincs megosztás',
    'Publish':
        'Publikálás',
    'Unpublish':
        'Publikálás visszavonása',
    'Updating\nproject list...':
        'A projeklista frissítése...',
    'Recover':
        'Visszaállítás',
    'Today':
        'Ma',
    'Yesterday':
        'Tegnap',

    // costume editor
    'Costume Editor':
        'Jelmezszerkesztő',
    'Paint Editor':
        'Képszerkesztő',
    'click or drag crosshairs to move the rotation center':
        'kattints oda vagy vidd a szálkeresztet a forgás középpontjába',

    'undo':
        'visszavon',
    'Vector':
        'Vektor',
    'Paintbrush tool\n(free draw)':
        'Festőecset eszköz\n(szabadkézi rajz)',
    'Stroked Rectangle\n(shift: square)':
        'Téglalap\n(shift: négyzet)',
    'Stroked Ellipse\n(shift: circle)':
        'Ellipszis\n(shift: kör)',
    'Eraser tool':
        'Törlő eszköz',
    'Set the rotation center':
        'A forgatás középpontjának beállítása',
    'Line tool\n(shift: vertical/horizontal)':
        'Vonalrajzoló eszköz\n(shift: függőleges/vízszintes)',
    'Filled Rectangle\n(shift: square)':
        'Kitöltött téglalap\n(shift: négyzet)',
    'Filled Ellipse\n(shift: circle)':
        'Kitöltött ellipszis\n(shift: kör)',
    'Fill a region':
        'Terület kitöltése',
    'Pipette tool\n(pick a color anywhere)':
        'Pipetta\n(szín felvétele bárhonnan)',
    'Brush size':
        'Ecsetméret',
    'Constrain proportions of shapes?\n(you can also hold shift)':
        'Megmaradjanak az alakzat arányai?\n(ehhez használhatja a SHIFT billentyűt is)',
    'Vector Paint Editor':
        'Vektor Szerkesztő',
    'Rectangle\n(shift: square)':
        'Négyszög\n(Shift: négyzet)',
    'Ellipse\n(shift: circle)':
        'Ellipszis\n(Shift: kör)',
    'Selection tool':
        'Kijelölő',
    'Line tool\n(shift: constrain to 45º)':
        'Vonal\n(Shift: korlátozza 45°)',
    'Closed brush\n(free draw)':
        'Kitöltött ecset\n(szabad rajz)',
    'Paint a shape\n(shift: secondary color)':
        'Minta kitöltése\n(Shift: másodlagos színnel)',
    'Pipette tool\n(pick a color from anywhere\nshift: secondary color)':
        'Pipetta eszköz\n(Tetszőleges hlyről szín felszedése\nshift: másodlagos színnel)',
    'Edge color\n(left click)':
        'Vonal színe\n(bal gomb)',
    'Fill color\n(right click)':
        'Kitöltő szín\n(jobb klikk)',
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
        'A projekt jegyzetei',
    /* additional, missing from lang-de */
    'Notes...':
        'A projekt jegyzetei',

    // new project
    'New Project':
        'Új projekt',
    'Unsaved Changes!':
        'Nem mentett változások!',
    'Replace the current project with a new one?':
        'Felülírja az aktuális projektet egy újjal?',

    'Backup failed.\nThis cannot be undone, proceed anyway?':
        'Sikertelen biztonsági mentés.\nNem visszavonható, folytatod?',

    // save project
    'Save Project As...':
        'Projekt mentése másként...',

    'Save Project':
        'A projekt mentése',
    // export blocks
    'Export blocks':
        'Blokkok exportja',
    'Import blocks':
        'Blokkok importja',
    'this project doesn\'t have any\ncustom global blocks yet':
        'ennek a projektnek még nincs globális felhasználói blokkjai',
    'select':
        'választás',
    'none':
        'egyik sem',

    // variable dialog
    'for all sprites':
        'minden alakzatra',
    'for this sprite only':
        'csak erre az alakzatra',

    // variables refactoring
    'rename only\nthis reporter':
        'nevezd át \ncsak ezt a függvényt',
    'rename all...':
        'mindegyik átnevezése...',
    'rename all blocks that\naccess this variable':
        'minden blokk átnevezése\namely ezt a változót használja',


    // block dialog
    'Change block':
        'Blokk változtatása',
    'Command':
        'Parancs',
    'Reporter':
        'Függvény',
    'Predicate':
        'Kijelentés',

    // block editor
    'Block Editor':
        'Blokk Szerkesztő',
    'Method Editor':
        'Függvény Szekesztő',
    'Apply':
        'Alkalmaz',

    // block deletion dialog
    'Delete Custom Block':
        'Felhasználói blokk törlése',
    'block deletion dialog text':
        'Biztos, hogy eltávolítja ezt\na blokkot és minden példányát?',

    // input dialog
    'Create input name':
        'A bevitel nevének létrehozása',
    'Edit input name':
        'A bevitel nevének szerkesztése',
    'Edit label fragment':
        'A címke rész szerkesztése',
    'Title text':
        'A cím szövege',
    'Input name':
        'A bevitel neve',
    'Delete':
        'Törlés',
    'Object':
        'Objektum',
    'Number':
        'Szám',
    'Text':
        'Szöveg',
    'String':
        'Szöveg',
    'List':
        'Lista',
    'Any type':
        'Bármilyen típus',
    'Boolean (T/F)':
        'Logikai (I/H)',
    'Command\n(inline)':
        'Parancs\n(egysoros)',
    'Command\n(C-shape)':
        'Parancs\n(C-forma)',
    'Any\n(unevaluated)':
        'Bármilyen\n(nem kiértékelt)',
    'Boolean\n(unevaluated)':
        'Logikai\n(nem kiértékelt)',
    'Single input.':
        'Egyszerű bevitel.',
    'Default Value:':
        'Alapérték:',
    'Multiple inputs (value is list of inputs)':
        'Több érték bevitele (az érték a bevitelek listája)',
    'Upvar - make internal variable visible to caller':
        'A belső változók láthatóvá tétele a hívó számára',

    // About Snap
    'About Snap':
        'A Snap névjegye',
    'Back...':
        'Vissza...',
    'License...':
        'Licenc...',
    'Modules...':
        'Modulok...',
    'Credits...':
        'Közreműködők...',
    'Translators...':
        'Fordítók',
    'License':
        'Licenc',
    'current module versions:':
        'a jelenlegi modulverziók',
    'Contributors':
        'Közreműködők',
    'Translations':
        'Fordítások',

    // variable watchers
    'normal':
        'normál',
    'large':
        'nagy',
    'slider':
        'csúszka',
    'slider min...':
        'a csúszka minimuma...',
    'slider max...':
        'a csúszka maximuma...',
    'import...':
        'importálás...',
    'raw data...':
        'nyers adat...',
    'import without attempting to\nparse or format data':
        'importálj anélkül, hogy megpróbálnád\értelmezni vagy formázni az adatot',
    'Slider minimum value':
        'Csúszka minimális értéke',
    'Slider maximum value':
        'Csúszka maximális értéke',

    // list watchers
    'length: ':
        'hossz: ',

    // coments
    'add comment here...':
        'tegye ide a megjegyzést',

    'comment pic...':
        'megjegyzés képe...',
    'save a picture\nof this comment':
        'kép erről a megjegyzésről',

    // drow downs
    // directions
    '(90) right':
        '(90) jobbra',
    '(-90) left':
        '(-90) balra',
    '(0) up':
        '(0) fel',
    '(180) down':
        '(180) le',

    'random':
    	'véletlen',
    'random position':
     	'véletlenszerű hely',

    // collision detection
    'mouse-pointer':
        'egérmutató',
    'edge':
        'játéktér széle',
    'pen trails':
        'ceruza nyomvonala',

    'center':
        'közép',

    // costumes
    'Turtle':
        'Teknős',
    'Empty':
        'Üres',

    'Paint a new costume':
        'Új jelmez rajzolása',
    'Import a new costume from your webcam':
        'Új jelmez importálása a webkamerával',
    'Please make sure your web browser is up to date\nand your camera is properly configured. \n\nSome browsers also require you to access Snap!\nthrough HTTPS to use the camera.\n\nPlase replace the "http://" part of the address\nin your browser by "https://" and try again.':
        'Győződj meg arról, hogy a böngésződ naprakész\nés a kamerát is megfelelően beállítottad. \n\nPár böngésző megköveteli, hogy HTTPS kapcsolaton\nkeresztül nyisd meg a Snap oldalát\n\nPróbáld meg kicserélni a cím "http://" részét\n"https://" előtagra és próbáld meg újra!',
    'Camera':
        'Kamera',
    
    // sounds
    'Record a new sound':
        'Új hang felvétele',
    

    // graphical effects, pen color
    'color':
        'szín',
    'hue':
        'árnyalat',
    'fisheye':
        'halszem',
    'whirl':
        'örvény',
    'pixelate':
        'pixeles',
    'mosaic':
        'mozaik',
    'saturation':
        'színtelítettség',
    // graphical effects
    'brightness':
        'világosság',
    'transparency':
        'áttetszőség',
    'ghost':
        'átlátszóság',
    'negative':
        'negatív',
    'comic':
        'moáré',
    'confetti':
        'konfetti',

    // keys
    'space':
        'szóköz',
    'up arrow':
        'felfelé nyíl',
    'down arrow':
        'lefelé nyíl',
    'right arrow':
        'jobbra nyíl',
    'left arrow':
        'balra nyíl',
    'any key':
        'bármelyik gomb',
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
        'új...',

    '__shout__go__':
        '__zöld__zászló__',

    // math functions
    'abs':
        'abszolútérték',
    'ceiling':
        'felső egészrész',
    'floor':
        'alsó egészrész',
    'sqrt':
        'négyzetgyök',
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
        'nem',

    // delimiters
    'letter':
        'betű',
    'word':
        'szó',
    'whitespace':
        'szóköz',
    'line':
        'újsor',
    'tab':
        'tabulátor',
    'cr':
        'kocsivissza',

    // data types
    'number':
        'szám',
    'text':
        'szöveg',
    'Boolean':
        'logikai',
    'list':
        'lista',
    'command':
        'parancsblokk',
    'reporter':
        'függvényblokk',
    'predicate':
        'kijelentés',

    'sprite':
        'szereplő',
    'ring':
        'gyűrű',
    'nothing':
        'semmi',

    // list indices
    'last':
        'utolsó',
    'any':
        'valamelyik',
    // attributes
    'my':
        'saját',
    'neighbors':
        'szomszéd',
    'self':
        'saját',
    'other sprites':
        'más szereplők',
    'parts':
        'részek',
    'anchor':
        'horgony',
    'parent':
        'szülő',
    'temporary?':
        'ideiglenes?',
    'children':
        'gyermek',
    'clones':
        'másolat',
    'other clones':
        'többi másolat',
    'dangling?':
        'külön forgó?',
    'draggable?':
        'húzható?',
    'rotation style':
        'forgási stílus',
    'rotation x':
        'forgatás x',
    'rotation y':
        'forgatás y',
    'center x':
        'középpont x',
    'center y':
        'középpont y',
    'name':
        'név',
    'costume':
        'jelmez',
    'stage':
        'játéktér',
    'costumes':
        'jelmezek',
    'sounds':
        'hangok',
    'scripts':
        'programok',
    'width':
        'szélesség',
    'height':
        'magasság',
    'left':
        'bal',
    'right':
        'jobb',
    'top':
        'teteje',
    'bottom':
        'alja',

    // attributes in the SET block's dropdown
    'my anchor':
        'horgonyom',
    'my parent':
        'szülőm',
    'my name':
        'nevem',
    'my temporary?':
        'ideiglenes vagyok?',
    'my dangling?':
        'külön forgok?',
    'my draggable?':
        'húzható vagyok?',
    'my rotation style':
        'forgatási stílusom',
    'my rotation x':
        'forgatás x attribútumom',
    'my rotation y':
        'forgatás y attribútumom',

    // inheritance
    'inherited':
        'örökölt',
    'check to inherit\nfrom':
        'bekapcsolva öröklődik\ninnen',
    'uncheck to\ndisinherit':
        'kikapcsolva nem öröklődik tovább',

    // error messages
    'Error':
        'Hiba',
    'a variable of name \'':
        'a változó \'',
    '\'\ndoes not exist in this context':
        '\'\nnem található ebben környzetben',
    'expecting a':
        'Számítunk egy',
    'but getting a':
        'helyette találtunk egy',
    'expecting':
        'számítunk',
    'input(s), but getting':
        'bevitel(ek)re, de helyette',
    'Inside a custom block':
        'Egy egyedi blokkban',
    'The error occured at':
        'Hiba történt ezen a',
    'continuations cannot be forked':
        'Folytatásokat nem tudom indítani',
    'unable to convert to':
        'nem tudom konvertálni',
    'Request blocked':
        'Kérés blokkolva',
    'cannot operate on a deleted sprite':
        'nem tudok törölt szereplővel dolgozni',
    'cannot send media,\nsprites or procedures\nto another scene':
        'nem lehetséges média,\n szerepl[ vagy eljárás küldése\nmásik jelenetbe',
    'unsupported attribute':
        'nem támogatott tulajdonság',
    'unable to nest\n(disabled or circular?)':
        'nem lehet beágyazni\n(inaktív vagy körkörös hivatkozás?)',
    'unable to inherit\n(disabled or circular?)':
        'nem örökölhető\n(inaktív vagy körkörös hivatkozás?)',
    'is read-only':
        'csak olvasható',
    'is not a valid option':
        'nem választható',
    'unsupported data type':
        'nem támogatott adattípus',
    'expecting a finite number\nbut getting Infinity or NaN':
        'véges számot várunk\nhelyette végtelen vagy NaN érkezett',
    'the predicate takes\ntoo long for a\ncustom hat block':
        'az előzmény túl hosszú ideig fut\negy egyedi kalap blokkhoz',
    'missing / unspecified extension':
        'Hiányzó vagy nem specifikált kiegészítő',
    'reporter didn\'t report':
        'a függvény érték nélkül tért vissza',
    'a custom block definition is missing':
        'hiányzó egyedi blokk definíció',
    'exceeding maximum number of clones':
        'meghaladta a maximális másolatok számát',
    'can only write text or numbers, not a':
        'csak szöveget vagy számot adhatsz meg, ezt nem érvényes',
    'unsupported graphic effect':
        'nem támogatott grafikai hatás',
    'setting the rotation center requires a costume':
        'a forgáspont beállításához szükség van egy jelmezre',
    'Web Audio API is not supported\nin this browser':
        'a Web Audio API nem\ntámogatott ezen a böngészőn',


	/* ::DELETED, BUT TO BE KEPT */
    'costume name':
        'a jelmez neve',
    'read-only':
        'csak olvasható',
    'variables':
        'változók',

    /* additional, missing from lang-de */
    'grow':
        'növekedés',
    'shrink':
        'kicsinyítés',
    'flip ↔':
        'tükrözés ↔',
    'flip ↕':
        'tükrözés ↕',
    'Export all scripts as pic...':
        'Minden feladat exportálása képként...',
    'show a picture of all scripts\nand block definitions':
        'minden feladat és blokk\ndefinícióról készült kép mutatása',
    'find blocks...':
        'blokkok keresése...',
    'Snap!Cloud':
        'Snap!Felhő',
    'Cloud':
        'Felhő',
    'could not connect to:':
        'nem tud csatlakozni ide:',
    'Service:':
        'Szolgáltatás:',
    'login':
        'bejelentkezés',
    'ERROR: INVALID PASSWORD':
        'HIBA: ÉRVÉNYTELEN JELSZÓ',
    'Browser':
        'Böngésző',
    'Sign up':
        'Újként regisztrálni',
    'Signup':
        'Új regisztráció',
    'Sign in':
        'Regisztráció',
    'Change Password':
        'Jelszó megváltoztatása',
    'Account created.':
        'Az azonosító létrejött.',
    'An e-mail with your password\nhas been sent to the address provided':
        'A megadott címre e-mailben elküldtük a jelszavát.',
    'now connected.':
        'csatlakozva.',
    'disconnected.':
        'leválasztva.',
    'Reset password':
        'A jelszó alaphelyzetre állítása',
    'User name:':
        'Felhasználói név:',
    'Password:':
        'Jelszó:',
    'Old password:':
        'A jelenlegi jelszó:',
    'New password:':
        'Új jelszó:',
    'Repeat new password:':
        'Az új jelszó ismét:',
    'Birth date:':
        'Születési idő:',
    'January':
        'január',
    'February':
        'február',
    'March':
        'március',
    'April':
        'április',
    'May':
        'május',
    'June':
        'június',
    'July':
        'július',
    'August':
        'augusztus',
    'September':
        'szeptember',
    'October':
        'október',
    'November':
        'november',
    'December':
        'december',
    'year:':
        'év:',
    ' or before':
        ' vagy előtte',
    'E-mail address:':
        'E-mail cím:',
    'E-mail address of parent or guardian:':
        'A szülő vagy gondozó email címe:',
    'Terms of Service...':
        'Felhasználási feltételek...',
    'Privacy...':
        'Jogvédelem...',
    'I have read and agree\nto the Terms of Service':
        'Elolvastam és egyetértek\na felhasználási feltételekkel',
    'stay signed in on this computer\nuntil logging out':
        'maradjon bejelentkezve, amíg ki nem jelentkezem a számítógépről',
    'please fill out\nthis field':
        'kérem, töltse ki\nezt a mezőt.',
    'User name must be four\ncharacters or longer':
        'A felhasználói név legalább\nnégy karakteres legyen.',
    'please provide a valid\nemail address':
        'kérem, adjon meg egy\nérvényes email címet.',
    'password must be six\ncharacters or longer':
        'a jelszó legyen legalább\nhat karakter hosszú.',
    'passwords do\nnot match':
        'A jelszavak nem egyeznek.',
    'please agree to\nthe TOS':
        'fogadja el a felhasználási feltételeket.',
    'You are not logged in':
        'Még nem lépett be',
    'Opening project...':
        'Projekt megnyitása...',
    'Fetching project\nfrom the cloud...':
        'Projekt letöltése\na felhőből...',
    'Saving project\nto the cloud...':
        'Projekt mentése\na felhőbe...',
    'Sprite Nesting':
        'Szereplők összefűzése',
    'uncheck to disable\nsprite composition':
        'kapcsolja ki a szereplők összefűzésének megakadályozásához.',
    'check for block\nto text mapping features':
        'Assinalar para funcionalidades\nde mapeamento entre blocos e texto.',
    'saved.':
        'mentve.',
    'Input Slot Options':
        'Bemenő adat csatlakozási lehetőségek',
    'Enter one option per line.Optionally use "=" as key/value delimiter\ne.g.\n   the answer=42':
        'Soronként egy lehetőséget írjon be.\nSzükség esetén használhatja az "=" jelet\nkulcs/érték pár elválasztására, pl.\na válasz=42',
    'Rasterize SVGs':
        'SVG átalakítása bittérképbe',
    'check to rasterize\nSVGs on import':
        'SVG bittérképpé alakíthatóságának\nellenőrzése az importálás során',
    'open a new window\nwith a picture of this comment':
        'új ablak megnyitása\nennek a megjegyzésnek a képével',
    'square':
        'négyzet',
    'pointRight':
        'háromszög jobbra',
    'gears':
        'fogaskerék',
    'file':
        'állomány',
    'fullScreen':
        'teljes képernyő',
    'normalScreen':
        'normál képernyő',
    'smallStage':
        'kis játéktér',
    'normalStage':
        'normál játéktér',
    'turtle':
        'teknős',
    'turtleOutline':
        'a teknős körvonala',
    'pause':
        'szünet',
    'flag':
        'zászló',
    'octagon':
        'nyolcszög',
    'cloud':
        'felhő',
    'cloudOutline':
        'a felhő körvonala',
    'cloudGradient':
        'a felhő áttetszősége',
    'turnRight':
        'fordulj jobbra',
    'turnLeft':
        'fordulj balra',
    'storage':
        'tárolás',
    'poster':
        'háttérkép',
    'flash':
        'villám',
    'brush':
        'ecset',
    'rectangle':
        'téglalap',
    'rectangleSolid':
        'kitöltött téglalap',
    'circle':
        'kör',
    'circleSolid':
        'kitöltött kör',
    'crosshairs':
        'szálkereszt',
    'paintbucket':
        'festékesvödör',
    'eraser':
        'radír',
    'pipette':
        'pipetta',
    'speechBubble':
        'buborék',
    'speechBubbleOutline':
        'a buborék körvonala',
    'arrowUp':
        'felfelé nyíl',
    'arrowUpOutline':
        'a felfelényíl körvonala',
    'arrowLeft':
        'balra nyíl',
    'arrowLeftOutline':
        'a balra nyíl körvonala',
    'arrowDown':
        'lefelé nyíl',
    'arrowDownOutline':
        'a lefelényíl körvonala',
    'arrowRight':
        'jobbra nyíl',
    'arrowRightOutline':
        'a jobbranyíl körvonala',
    'robot':
        'robot',
    'turn pen trails into new costume...':
        'a toll beállításainak alkalmazása egy új jelmezre...',
    'pen':
        'toll',
    'tip':
        'tipp',
    'middle':
        'közép',
    'last changed':
        'utoljára változtatva',
    'Are you sure you want to publish':
        'Biztosan nyilvánossá teszi',
    'Are you sure you want to unpublish':
        'Biztos, hogy nemnyilvánossá teszi',
    'Share Project':
        'A projekt megosztása',
    'Unshare Project':
        'A projekt megosztásának megszüntetése',
    'sharing\nproject...':
        'a projekt\nmegosztása...',
    'unsharing\nproject...':
        'a projekt megosztásának\nmegszüntetése...',
    'shared.':
        'megosztva.',
    'unshared.':
        'nincs megosztva.',
    'password has been changed.':
        'a jelszó megváltozott.',
    'SVG costumes are\nnot yet fully supported\nin every browser':
        'Az SVG ábrákat nem minden böngésző támogatja',
    'script pic with result...':
        'a program képe az eredménnyel...',
    'open a new window\nwith a picture of both\nthis script and its result':
        'Új böngészőablak megnyitása a programnak és eredményének képével.',
    'Import sound':
        'Hang importálása',
    'Import':
        'Import',
    'edit rotation point only...':
        'csak a forgáspont szerkesztése...',
    'Export Project As...':
        'Projekt exportálása mint...',
    'a variable of name \'':
        'ilyen nevű változó «',
    '\'\ndoes not exist in this context':
        '»\nnincs ebben a környezetben',
    '(temporary)':
        '(ideiglenes)',
    'expecting':
        'kötelező',
    'input(s), but getting':
        'adatbevitel, de ez érkezett',

    // kódolás - "Codification”
    'map %cmdRing to %codeKind %code':
        'képezd le %cmdRing erre %codeKind %code',
    'map %mapValue to code %code':
        'képezd le %mapValue kódra %code',
    'map %codeListPart of %codeListKind to code %code':
        'képezd le %codeListPart ebben %codeListKind erre a kódre %code',
    'code of %cmdRing':
        '%cmdRing kódja',
    'delimiter':
        'határoló',
    'collection':
        'gyűjtemény',
    'parameters':
        'paraméterek',
    'code':
        'kód',
    'header':
        'fejléc',
    'header mapping...':
        'fejléc leképezés...',
    'code mapping...':
        'kód leképezés...',
    'Code mapping':
        'Kód leképezés',
    'Header mapping':
        'A fejléc leképezése',
    'Enter code that corresponds to the block\'s definition. Use the formal parameter\nnames as shown and <body> to reference the definition body\'s generated text code.':
        'Gépeld be a blokk definíciójának megfelelő programkódot. Használd a látható formális paramétereket\nés a <body> referenciát a törzs generált szövegkódodhoz.',
    'Enter code that corresponds to the block\'s definition. Choose your own\nformal parameter names (ignoring the ones shown).':
        'Gépeld be a blokk definíciójának megfelelő programkódot. Használd a saját\nformális paramétereit (hagyd figyelmen kívül a példákat).',
    'Enter code that corresponds to the block\'s operation (usually a single\nfunction invocation). Use <#n> to reference actual arguments as shown.':
        'Gépeld be a blokk működésének megfelelő programkódot (általában egy függvény\nbevezetésével). Használd a <#n> hivatkozási helyen látható aktuális argumentumokat.'
};
