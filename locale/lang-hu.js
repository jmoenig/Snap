/*

    lang-hu.js

    A SNAP! magyar fordítása

    written by Makány György

    Copyright (C) 2015 by Makány György

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
        'Makány György', // your name for the Translators tab
    'translator_e-mail':
        'makany.gyorgy@gmail.com', // optional
    'last_changed':
        '2015-07-26', // this, too, will appear in the Translators tab

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
        'vonszolható',

    // tabs:
    'Scripts':
        'Feladatok',
    'Costumes':
        'Jelmezek',
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
        'ha szélen vagy, pattanj vissza',
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
    'change %eff effect by %n':
        '%eff hatás változzon %n',
    'set %eff effect to %n':
        '%eff hatás legyen %n',
    'clear graphic effects':
        'töröld a grafikus hatásokat',
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
    'go to front':
        'kerülj legelőre',
    'go back %n layers':
        'kerülj %n szinttel hátrébb',

    'development mode \ndebugging primitives:':
        'Fejlesztő mód \nblokkok hibakeresése',
    'console log %mult%s':
        'konzolra írás: %mult%',
    'alert %mult%s':
        'Felbukkanó: %mult%',

    // sound:
    'play sound %snd':
        'játszd le: %snd',
    'play sound %snd until done':
        'játszd le: %snd és várd meg',
    'stop all sounds':
        'minden hangot állíts le',
    'rest for %n beats':
        'szünetelj %n ütemet',
    'play note %n for %n beats':
        'szóljon %n %n ütemig',
    'change tempo by %n':
        'a tempó változzon: %n',
    'set tempo to %n bpm':
        'a tempó legyen %n ütem/perc',
    'tempo':
        'tempó',

    // pen:
    'clear':
        'töröld a rajzokat',
    'pen down':
        'tollat le',
    'pen up':
        'tollat fel',
    'set pen color to %clr':
        'a tollszín legyen %clr',
    'change pen color by %n':
        'a tollszín változzon %n',
    'set pen color to %n':
        'a tollszín legyen %n',
    'change pen shade by %n':
        'a tollárnyalat változzon %n',
    'set pen shade to %n':
        'a tollárnyalat legyen %n',
    'change pen size by %n':
        'a tollméret változzon %n',
    'set pen size to %n':
        'a tollméret legyen %n',
    'stamp':
        'készíts lenyomatot',

    // control:
    'when %greenflag clicked':
        '%greenflag -ra kattintáskor',
    'when %keyHat key pressed':
        '%keyHat lenyomásakor',
    'when I am %interaction':
        'amikor %interaction ',
    'clicked':
        'rám kattintanak',
    'pressed':
        'gombnyomás történik',
    'dropped':
        'leejtenek',
    'mouse-entered':
        'az egér fölém kerül',
    'mouse-departed':
        'az egér lemegy rólam',
    'when I receive %msgHat':
        '%msgHat üzenet érkezésekor',
    'broadcast %msg':
        'küldj mindenkinek %msg üzenetet',
    'broadcast %msg and wait':
        'küldj mindenkinek %msg üzenetet és várj',
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
    'forever %c':
        'mindig %c',
    'repeat %n %c':
        'ismételd %n -szer %c',
    'repeat until %b %c':
        'ismételd amíg %b %c',
    'if %b %c':
        'ha %b %c',
    'if %b %c else %c':
        'ha %b %c különben %c',
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
        'Várakozzon minden %pause',
    'run %cmdRing %inputs':
        'futtasd %cmdRing %inputs értékkel',
    'launch %cmdRing %inputs':
        'induljon %cmdRing %inputs',
    'call %repRing %inputs':
        'hívd %repRing auf %inputs',
    'run %cmdRing w/continuation':
        'futtatás %cmdRing folytatásával',
    'call %cmdRing w/continuation':
        'hívd meg %cmdRing folytatásával',
    'warp %c':
        'Warp %c',
    'when I start as a clone':
        'másolatként indítva',
    'create a clone of %cln':
        'készíts másolatot %cln',
    'myself':
        'magadról',
    'delete this clone':
        'töröld ezt a másolatot',

    // sensing:
    'touching %col ?':
        'érint %col színt?',
    'touching %clr ?':
        'érint %clr színt?',
    'color %clr is touching %clr ?':
        '%clr szín érint %clr színt?',
    'ask %s and wait':
        'Kérdezd meg %s és várj',
    'what\'s your name?':
        'Mi a neved?',
    'answer':
        'Válasz',
    'mouse x':
        'egér x',
    'mouse y':
        'egér y',
    'mouse down?':
        'Egér lenyomva?',
    'key %key pressed?':
        '%key gomb lenyomva?',
    'distance to %dst':
        'távolság: %dst',
    'reset timer':
        'Nullázd az órát',
    'timer':
        'Stopper',
    '%att of %spr':
        '%att %spr objektumérték',
    'http:// %s':
        'http:// %s',
    'turbo mode?':
        'Turbó mód?',
    'set turbo mode to %b':
        '%b turbó módjának bekapcsolása',

    'filtered for %clr':
        '%clr szín szűrése',
    'stack size':
        'Veremméret',
    'frames':
        'Keretek',

    // operators:
    '%n mod %n':
        '%n osztva %n maradéka',
    'round %n':
        '%n kerekítve',
    '%fun of %n':
        '%fun %n',
    'pick random %n to %n':
        'véletlen %n és %n között',
    '%b and %b':
        '%b ÉS %b',
    '%b or %b':
        '%b VAGY %b',
    'not %b':
        'NEM %b',
    'true':
        'igaz',
    'false':
        'hamis',
    'join %words':
        'összefűz %words',
    'split %s by %delim':
        '%s szétvágása %delim jeleknél',
    'hello':
        'szia',
    'world':
        'világ',
    'letter %idx of %s':
        '%idx karaktere ennek: %s',
    'length of %s':
        '%s hossza',
    'unicode of %s':
        '%s Unicode-ra alakítva',
    'unicode %n as letter':
        'Unicode %n betűként',
    'is %s a %typ ?':
        '%s egy %typ ?',
    'is %s identical to %s ?':
        '%s ugyanaz, mint %s ?',

    'type of %s':
        'típus: %s',

    // variables:
    'Make a variable':
        'Új változó',
    'Variable name':
        'Változónév',
    'Script variable name':
        'Feladatváltozó név',
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
    '%s in front of %l':
        '%s megelőzi %l',
    'item %idx of %l':
        '%idx eleme a %l listának',
    'all but first of %l':
        '%l elsőnkívüli elemei',
    'length of %l':
        '%l hossza',
    '%l contains %s':
        '%l tartalmazza %s -t',
    'thing':
        'dolog',
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
    'show project data as XML\nin a new browser window':
        'a projekt adatainak megtekintése\negy új böngészőablakban',
    'Export blocks...':
        'Blokk exportálása...',
    'show global custom block definitions as XML\nin a new browser window':
        'globális felhasználói blokk definíciók\nmegtekintése egy új böngészőablakban',
    'Import tools':
        'Eszközök importálása',
    'load the official library of\npowerful blocks':
        'a hivatalos könyvtári\nblokkok betöltése',
    'Libraries...':
        'Modulkönyvtárak...',
    'Import library':
        'Modulkönyvtár importálása',

    // cloud menu
    'Login...':
        'Belépés...',
    'Signup...':
        'Feliratkozás...',

    // settings menu
    'Language...':
        'Nyelv...',
    'Zoom blocks...':
        'Blokkok bővítése...',
    'Stage size...':
        'A játéktér mérete...',
    'Stage size':
        'A játéktér mérete',
    'Stage width':
        'A játéktér szélessége',
    'Stage height':
        'A játéktér magassága',
    'Default':
        'Alapérték',
    'Blurred shadows':
        'Elmosódó árnyékok',
    'uncheck to use solid drop\nshadows and highlights':
        'vegye ki a jelölést, ha éles árnyékokat\nés kiemeléseket kíván használni',
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
        'Szóköz használata üres karakterként',
    'settings menu prefer empty slots hint':
        'einschalten um leere Platzhalter\nbeim Platzieren von Bl\u00f6cken'
            + 'zu bevorzugen',
    'uncheck to allow dropped\nreporters to kick out others':
        'ausschalten um das "Rauskicken"\nvon platzierten Bl\u00f6cken\n'
            + 'zu erm\u00f6glichen',
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
    'Virtual keyboard':
        'Virtuális billentyűzet',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'kikapcsolva letiltja a virtuális\nbillentyűzetet a mobil eszközökön',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'bejelölve engedélyezi a virtuális\nbillentyűzetet a mobil eszközökön',
    'Input sliders':
        'Beviteli csúszkák',
    'uncheck to disable\ninput sliders for\nentry fields':
        'kikapcsolva letiltja a csúszkákat\na beviteli mezőknél',
    'check to enable\ninput sliders for\nentry fields':
        'bekapcsolva engedélyezi a csúszkákat\na beviteli mezőknél',
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
    'Thread safe scripts':
        'Biztonságos programszálak',
    'uncheck to allow\nscript reentrance':
        'kikapcsolva engedélyezi a programok\n többszörös végrehajtását',
    'check to disallow\nscript reentrance':
        'bekapcsolva engedélyezi a programok\n többszörös végrehajtását',
    'Prefer smooth animations':
        'Finom animációk',
    'uncheck for greater speed\nat variable frame rates':
        'kapcsolja ki, ha nagyobb sebességet\nakar változtatható képfrissítéseknél',
    'check for smooth, predictable\nanimations across computers':
        'kapcsolja be, ha finomabb, kiszámíthatóbb\nanimációkat akar minden számítógépen',
    'Flat line ends':
        'Egyszerű vonalvégződés',
    'check for flat ends of lines':
        'kapcsolja be az\negyszerű vonalvégződéshez',
    'uncheck for round ends of lines':
        'kapcsolja ki a\nlekerekített vonalvégződésekhez',

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
    'hide primitives':
        'az alapvetők elrejtése',
    'show primitives':
        'az alapvetők megjelentése',

    // blocks:
    'help...':
        'Súgó...',
    'relabel...':
        'átcimkézés...',
    'duplicate':
        'megkettőzés',
    'make a copy\nand pick it up':
        'másolat felvétele',
    'only duplicate this block':
        'csak készítsen egy másolatot\nerről a blokkról',
    'delete':
        'törlés',
    'script pic...':
        'Program képe...',
    'open a new window\nwith a picture of this script':
        'új böngészőablak megnyitása\nennek a programnak a képével',
    'ringify':
        'körülvesz',
    'unringify':
        'körülfogás megszüntetése',

    // custom blocks:
    'delete block definition...':
        'blokkdefiníció törlése',
    'edit...':
        'szerkesztés...',

    // sprites:
    'edit':
        'szerkesztés',
    'move':
        'mozgatás',
    'detach from':
        'leválasztás erről',
    'detach all parts':
        'minden rész szétválasztása',
    'export...':
        'exportálás...',

    // stage:
    'show all':
        'mindent mutat',
    'pic...':
        'kép exportálása...',
    'open a new window\nwith a picture of the stage':
        'új ablak nyitása a színpad képével',

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
    'scripts pic...':
        'minden feladat képpé...',
    'open a new window\nwith a picture of all scripts':
        'új ablak nyitása\naz összes program képével',
    'make a block...':
        'blokk létrehozása...',

    // costumes
    'rename':
        'átnevezés',
    'export':
        'exportálás',
    'rename costume':
        'a jelmez átnevezése',
    'Paint a new costume':
        'Új jelmez rajzolása',

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

    // Project Manager
    'Untitled':
        'Névtelen',
    'Open Project':
        'Projekt megnyitása',
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

    // costume editor
    'Costume Editor':
        'Jelmezszerkesztő',
    'click or drag crosshairs to move the rotation center':
        'kattints oda vagy vidd a szálkeresztet a forgás középpontjába',

    // project notes
    'Project Notes':
        'A projekt tudnivalói',

    // new project
    'New Project':
        'Új projekt',
    'Replace the current project with a new one?':
        'Felülírja az aktuális projektet egy újjal?',

    // save project
    'Save Project As...':
        'Projekt mentése másként...',

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
        'Blokk szerkesztő',
    'Apply':
        'Alkalmazás',

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
    'List':
        'Lista',
    'Any type':
        'Bármilyen típus',
    'Boolean (T/F)':
        'Logikai (I/H)',
    'Command\n(inline)':
        'Parancs\n(inline)',
    'Command\n(C-shape)':
        'Parancs\n(C-Form)',
    'Any\n(unevaluated)':
        'Bármilyen\n(nem kiértékelt)',
    'Boolean\n(unevaluated)':
        'Logikai(nem kiértékelt)',
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
    'Slider minimum value':
        'A csúszka minimális értéke',
    'Slider maximum value':
        'A csúszka maximális értéke',

    // list watchers
    'length: ':
        'Hossz: ',

    // coments
    'add comment here...':
        'tegye ide a megjegyzést',

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

    // collision detection
    'mouse-pointer':
        'egérmutató',
    'edge':
        'csúcs',
    'pen trails':
        'ceruza nyomvonalak',

    // costumes
    'Turtle':
        'Teknős',
    'Empty':
        'Üres',

    // graphical effects
    'brightness':
        'világosság',
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

    // math functions
    'abs':
        'abszolútérték',
    'floor':
        'egészrész',
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

    // delimiters
    'letter':
        'betű',
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

    // list indices
    'last':
        'utolsó',
    'any':
        'bármilyen',
    // Ez kimaradt a német nyelvi fájlból
    'grow':
        'növekedés',
    'shrink':
        'kicsinyítés',
    'flip ↔':
        'tükrözés ↔',
    'flip ↕':
        'tükrözés ↕',
    'Export all scripts as pic...':
        'Minden feladat exportálása képként…',
    'show a picture of all scripts\nand block definitions':
        'minden feladat és blokk\ndefinícióról készült kép mutatása',
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
    'find blocks...':
        'blokkok keresése…',
    'costume name':
        'a jelmez neve',
    'Open':
        'Megnyitás',
    'Share':
        'Megosztás',
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
    'Logout':
        'Kijelentkezés',
    'Change Password...':
        'Jelszó megváltoztatása…',
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
    'Reset Password...':
        'A jelszó alaphelyzetre állítása…',
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
        'Felhasználási feltételek…',
    'Privacy...':
        'Jogvédelem…',
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
    'Examples':
        'Példák',
    'You are not logged in':
        'Még nem lépett be',
    'Updating\nproject list...':
        'A projeklista frissítése…',
    'Opening project...':
        'Projekt megnyitása…',
    'Fetching project\nfrom the cloud...':
        'Projekt letöltése\na felhőből…',
    'Saving project\nto the cloud...':
        'Projekt mentése\na felhőbe…',
    'Sprite Nesting':
        'Szereplők összefűzése',
    'uncheck to disable\nsprite composition':
        'kapcsolja ki a szereplők összefűzésének megakadályozásához.',
    'Codification support':
        'A kodifikáció támogatása',
    'check for block\nto text mapping features':
        'Assinalar para funcionalidades\nde mapeamento entre blocos e texto.',
    'saved.':
        'mentve.',
    'options...':
        'beállítások…',
    'read-only':
        'csak olvasható',
    'Input Slot Options':
        'Bemenő adat csatlakozási lehetőségek',
    'Enter one option per line.Optionally use "=" as key/value delimiter\ne.g.\n   the answer=42':
        'Soronként egy lehetőséget írjon be.\nSzükség esetén használhatja az "=" jelet\nkulcs/érték pár elválasztására, pl.\na válasz=42',
    'paint a new sprite':
        'új alakzat rajzolása',
    'Paint a new costume':
        'Új jelmez rajzolása',
    'add a new Turtle sprite':
        'új teknőc rajzának hozzáadása',
    'Flat design':
        'Síkbeli tervezés',
    'check for alternative\nGUI design':
        'más grafikus felület ellenőrzése',
    'Rasterize SVGs':
        'SVG átalakítása bittérképbe',
    'check to rasterize\nSVGs on import':
        'SVG bittérképpé alakíthatóságának\nellenőrzése az importálás során',
    'comment pic...':
        'megjegyzés képe…',
    'open a new window\nwith a picture of this comment':
        'új ablak megnyitása\nennek a megjegyzésnek a képével',
    'undo':
        'visszavon',
    'Brush size':
        'Ecsetméret',
    'Constrain proportions of shapes?\n(you can also hold shift)':
        'Megmaradjanak az alakzat arányai?\n(ehhez használhatja a SHIFT billentyűt is)',
    'Eraser tool':
        'Törlő eszköz',
    'Paintbrush tool\n(free draw)':
        'Festőecset eszköz\n(szabadkézi rajz)',
    'Line tool\n(shift: vertical/horizontal)':
        'Vonalrajzoló eszköz\n(shift: függőleges/vízszintes)',
    'Stroked Rectangle\n(shift: square)':
        'Téglalap\n(shift: négyzet)',
    'Filled Rectangle\n(shift: square)':
        'Kitöltött téglalap\n(shift: négyzet)',
    'Stroked Ellipse\n(shift: circle)':
        'Ellipszis\n(shift: kör)',
    'Filled Ellipse\n(shift: circle)':
        'Kitöltött ellipszis\n(shift: kör)',
    'Fill a region':
        'Terület kitöltése',
    'Set the rotation center':
        'A forgatás középpontjának beállítása',
    'Pipette tool\n(pick a color anywhere)':
        'Pipetta\n(szín felvétele bárhonnan)',
    'Paint Editor':
        'Képszerkesztő',
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
        'kis színpad',
    'normalStage':
        'normál színpad',
    'turtle':
        'teknős',
    'stage':
        'színpad',
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
        'a toll beállításainak alkalmazása egy új jelmezre…',
    'turn all pen trails and stamps\ninto a new costume for the\ncurrently selected sprite':
        'minden tollbeállítás átállítása\nés átvitele az aktuális\nalak egy új jelmezébe',
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
        'a projekt\nmegosztása…',
    'unsharing\nproject...':
        'a projekt megosztásának\nmegszüntetése…',
    'shared.':
        'megosztva.',
    'unshared.':
        'nincs megosztva.',
    'Unshare':
        'Nincs megosztás',
    'password has been changed.':
        'a jelszó megváltozott.',
    'SVG costumes are\nnot yet fully supported\nin every browser':
        'Az SVG ábrákat nem minden böngésző támogatja',
    'Save Project':
        'A projekt mentése',
    'script pic with result...':
        'a program képe az eredménnyel…',
    'open a new window\nwith a picture of both\nthis script and its result':
        'Új böngészőablak megnyitása a programnak és eredményének képével.',
    'JavaScript function ( %mult%s ) { %code }':
        'JavaScript függvény ( %mult%s ) { %code }',
    'Select categories of additional blocks to add to this project.':
        'Válassza ki a projekthez adandó blokkok kategóriáit.',
    'Import sound':
        'Hang importálása',
    'Select a sound from the media library':
        'Válasszon ki egy hangot a médiakönyvtárból.',
    'Import':
        'Import',
    'Select a costume from the media library':
        'Válasszon ki egy jelmezt a médiakönyvtárból.',
    'edit rotation point only...':
        'csak a forgáspont szerkesztése…',
    'Export Project As...':
        'Projekt exportálása mint…',
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

    // kódolás
    'map %cmdRing to %codeKind %code':
        'mapear %cmdRing no %codeKind %code',
    'map String to code %code':
        'mapear texto no código %code',
    'map %codeListPart of %codeListKind to code %code':
        'mapear %codeListPart de %codeListKind no código %code',
    'code of %cmdRing':
        '%cmdRing kódja',
    'delimiter':
        'határoló',
    'collection':
        'gyűjtemény',
    'variables':
        'változók',
    'parameters':
        'paraméterek',
    'code':
        'kód',
    'header':
        'fejléc',
    'header mapping...':
        'mapeamento para cabeçalho…',
    'code mapping...':
        'kód leképezés…',
    'Code mapping':
        'Kód leképezés',
    'Header mapping':
        'A fejléc leképezése',
    'Enter code that corresponds to the block\'s definition. Use the formal parameter\nnames as shown and <body> to reference the definition body\'s generated text code.':
        'Gépelje be a blokk definíciójának megfelelő programkódot. Használja a látható formális paramétereket és a <body> referenciát a törzs generált szövegkódjához.',
    'Enter code that corresponds to the block\'s definition. Choose your own\nformal parameter names (ignoring the ones shown).':
        'Gépelje be a blokk definíciójának megfelelő programkódot. Használja a saját formális paramétereit (hagyja figyelmen kívül a láthatókat).',
    'Enter code that corresponds to the block\'s operation (usually a single\nfunction invocation). Use <#n> to reference actual arguments as shown.':
        'Gépelje be a blokk működésének megfelelő programkódot (általában egy függvény bevezetésével). Használja a <#n> hivatkozási helyen látható aktuális argumentumokat.'
};
