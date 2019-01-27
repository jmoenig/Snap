/*

	lang-si.js

	Slovenian translation for SNAP!

	translated by Sasa Divjak

	Copyright (C) 2012 by Jens Mönig

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
		si - Slovenian => => SnapTranslator.dict.si = {

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
		si - Slovenian => => lang-si.js

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

SnapTranslator.dict.si = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

   Ss ,    \u0160, \u0161
   Cc     \u010C, \u010D
   Zz,   \u017D, \u017E

*/

    // translations meta information
    'language_name':
        'Sloven\u0161\u010Dina', // the name as it should appear in the language menu
    'language_translator':
        'Sasa Divjak, Gorazd Breskvar', // your name for the Translators tab
    'translator_e-mail':
        'sasa.divjak@fri.uni-lj.si', // optional
    'last_changed':
        '2016-04-22', // this, too, will appear in the Translators tab

    // GUI
    // control bar:
    'untitled':
        'Neimenovan',
    'development mode':
        'Razvojni na\u010Din',

    // categories:
    'Motion':
        'Premikanje',
    'Looks':
        'Izgled',
    'Sound':
        'Zvok',
    'Pen':
        'Svin\u010Dnik',
    'Control':
        'Krmiljenje',
    'Sensing':
        'Zaznavanje',
    'Operators':
        'Operatorji',
    'Variables':
        'Spremenljivke',
    'Lists':
        'Seznami',
    'Other':
        'Drugo',

    // editor:
    'draggable':
        'vle\u010Dljiv',

    // tabs:
    'Scripts':
        'Skripte',
    'Costumes':
        'Obleke',
    'Sounds':
        'Zvoki',

    // names:
    'Sprite':
        'Objekt',
    'Stage':
        'Oder',

    // rotation styles:
    'don\'t rotate':
        'ne vrti',
    'can rotate':
        'prosto vrtenje',
    'only face left/right':
        'lahko obrnemo le levo/desno',

    // new sprite button:
    'add a new sprite':
        'dodaj nov objekt',

    // tab help
    'costumes tab help':
        'Slike uvozi\u0161 s povle\u010Denjem iz ene druge\n'
            + 'spletne strani ali ra\u010Dunalnika',
    'import a sound from your computer\nby dragging it into here':
        'Zvok uvozi\u0161 tako, da ga povle\u010De\u0161 sem',

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
        'Oder je izbran:\nni na voljo gibljivih gradnikov',

    'move %n steps':
        'premakni se %n korakov',
    'turn %clockwise %n degrees':
        'obrni se %clockwise %n stopinj',
    'turn %counterclockwise %n degrees':
        'obrni se %counterclockwise %n stopinj',
    'point in direction %dir':
        'obrni se v smeri %dir',
    'point towards %dst':
        'obrni se proti %dst',
    'go to x: %n y: %n':
        'pojdi na x: %n y: %n',
    'go to %dst':
        'pojdi k %dst',
    'glide %n secs to x: %n y: %n':
        'drsi %n sekund do x: %n y: %n',
    'change x by %n':
        'spremeni x za %n',
    'set x to %n':
        'nastavi x na %n',
    'change y by %n':
        'spremeni y za %n',
    'set y to %n':
        'nastavi y na %n',
    'if on edge, bounce':
        'odbij se, \u010De si na robu',
    'x position':
        'polo\u017Eaj x',
    'y position':
        'polo\u017Eaj y',
    'direction':
        'smer',

    // looks:
    'switch to costume %cst':
        'Preklopi na obleko %cst',
    'next costume':
        'naslednja obleka',
    'costume #':
        '\u0160t.obleke',
    'say %s for %n secs':
        'reci %s za %n sekund.',
    'say %s':
        'reci %s',
    'think %s for %n secs':
        'misli %s za %n sekund',
    'think %s':
        'misli %s',
    'Hello!':
        'Halo!',
    'Hmm...':
        'Hmm...',
    'change %eff effect by %n':
        'spremeni u\u010Dinek %eff za %n',
    'set %eff effect to %n':
        'nastavi u\u010Dinek %eff na %n',
    'clear graphic effects':
        'zbri\u0161i grafi\u010Dne u\u010Dinke',
    'change size by %n':
        'spremeni velikost za %n',
    'set size to %n %':
        'nastavi velikost na %n %',
    'size':
        'velikost',
    'show':
        'prika\u017Ei',
    'hide':
        'skrij',
    'go to front':
        'prestavi v ospredje',
    'go back %n layers':
        'prestavi %n ravnin nazaj',

    'development mode \ndebugging primitives:':
        'razvojni na\u010Din \nrazhro\u0161\u010Devanje gradnikov',
    'console log %mult%s':
        'izpi\u0161i na konzolo: %mult%s',
    'alert %mult%s':
        'pozor: %mult%s',

    // sound:
    'play sound %snd':
        'predvajaj zvok %snd',
    'play sound %snd until done':
        'predvajaj zvok %snd do konca',
    'stop all sounds':
        'ustavi vse zvoke',
    'rest for %n beats':
        'po\u010Divaj %n udarcev',
    'play note %n for %n beats':
        'predvajaj noto %n za %n udarcev',
    'change tempo by %n':
        'spremeni tempo za %n',
    'set tempo to %n bpm':
        'nastavi tempo na %n udarcev na minuto.',
    'tempo':
        'tempo',

    // pen:
    'clear':
        'zbri\u0161i',
    'pen down':
        'svin\u010Dnik spu\u0161\u010Den',
    'pen up':
        'svin\u010Dnik dvignjen',
    'set pen color to %clr':
        'nastavi barvo svin\u010Dnika na %clr',
    'change pen color by %n':
        'spremeni barvo svin\u010Dnika za %n',
    'set pen color to %n':
        'nastavi barvo svin\u010Dnika na %n',
    'change pen shade by %n':
        'spremeni senco svin\u010Dnika za %n',
    'set pen shade to %n':
        'nastavi senco svin\u010Dnika na %n',
    'change pen size by %n':
        'spremeni debelino svin\u010Dnika za %n',
    'set pen size to %n':
        'nastavi debelino svin\u010Dnika na %n',
    'stamp':
        '\u0161tampiljka',

    // control:
    'when %greenflag clicked':
        'ko kliknemo na %greenflag',
    'when %keyHat key pressed':
        'ko pritisnemo na tipko %keyHat ',
    'when I am %interaction':
        'Ko je %interaction',
    'clicked':
        'mi\u0161ka kliknjena',
    'pressed':
        'gumb mi\u0161ke pritisnjen',
    'dropped':
        'konec vle\u010Denja',
    'mouse-entered':
        'mi\u0161ka se dotika',
    'mouse-departed':
        'mi\u0161ka se ne dotika ve\u010D',
    'when %b':
        'Ko je %b',
    'when I receive %msgHat':
        'ko sprejmem %msgHat',
    'broadcast %msg':
        'po\u0161lji %msg vsem',
    'broadcast %msg and wait':
        'po\u0161lji vsem %msg in po\u010Dakaj',
    'Message name':
        'Obvestilo',
    'message':
        'sporo\u010Dilo',
    'any message':
        'poljudno sporo\u010Dilo',
    'wait %n secs':
        '\u010Dakaj %n sekund.',
    'wait until %b':
        '\u010Dakaj, dokler %b',
    'forever %loop':
        'za vedno %loop',
    'repeat %n %loop':
        'ponovi %n krat %loop',
    'repeat until %b %loop':
        'ponavljaj, dokler %b %loop',
    'if %b %c':
        '\u010De %b %c',
    'if %b %c else %c':
        '\u010De %b %c sicer %c',
    'report %s':
        'sporo\u010Di %s',
    'stop %stopChoices':
        'ustavi %stopChoices',
    'this script':
        'to skripto',
    'this block':
        'ta blok',
    'stop %stopOthersChoices':
        'ustavi %stopOthersChoices',
    'all but this script':
        'vse razen te skripte',
    'other scripts in sprite':
        'ostale skripte tega objekta',
    'pause all %pause':
        'pavziraj vse %pause',
    'run %cmdRing %inputs':
        'izvajaj %cmdRing  %inputs',
    'launch %cmdRing %inputs':
        'po\u017Eeni %cmdRing %inputs',
    'call %repRing %inputs':
        'pokli\u010Di %repRing  %inputs',
    'run %cmdRing w/continuation':
        'izvajaj %cmdRing z nadaljevanjem',
    'call %cmdRing w/continuation':
        'pokli\u010Di %cmdRing z nadaljevanjem',
    'warp %c':
        'Warp %c',
    'when I start as a clone':
        'ko za\u010Dnem kot klon',
    'create a clone of %cln':
        'kloniraj %cln',
    'myself':
        'sebe',
    'delete this clone':
        'izbri\u0161i ta klon',

    // sensing:
    'touching %col ?':
        'se dotika %col ?',
    'touching %clr ?':
        'se dotika %clr ?',
    'color %clr is touching %clr ?':
        'barva %clr se dotika %clr ?',
    'ask %s and wait':
        'vpra\u0161aj %s in \u010Dakaj',
    'what\'s your name?':
        'Kako ti je ime?',
    'answer':
        'odgovor',
    'mouse x':
        'x polo\u017Eaj mi\u0161ke',
    'mouse y':
        'y polo\u017Eaj mi\u0161ke',
    'mouse down?':
        'gumb mi\u0161ke pritisnjen?',
    'key %key pressed?':
        'tipka %key pritisnjena?',
    'distance to %dst':
        'razdalja do %dst',
    'reset timer':
        'reset \u0161toparice',
    'timer':
        '\u0161toparica',
    'http:// %s':
        'http:// %s',
    'turbo mode?':
        'hitri na\u010Din?',
    'set turbo mode to %b':
        'nastavi hitri na\u010Din na %b',

    'current %dates':
        'trenutni %dates',
    'year':
        'leto',
    'month':
        'mesec',
    'date':
        'dan',
    'day of week':
        'dan v tednu',
    'hour':
        'ura',
    'minute':
        'minuta',
    'second':
        'sekunda',
    'time in milliseconds':
        '\u010Das v tiso\u010Dinkah sekunde',


    'filtered for %clr':
        'filtriran za %clr',
    'stack size':
        'velikost sklada',
    'frames':
        'sli\u010Dice',

    // operators:
    '%n mod %n':
        '%n modulo %n',
    'round %n':
        'zaokro\u017Eeno %n',
    '%fun of %n':
        '%fun von %n',
    'pick random %n to %n':
        'naklju\u010Dno \u0161tevilo od %n do %n',
    '%b and %b':
        '%b in %b',
    '%b or %b':
        '%b ali %b',
    'not %b':
        'ne %b',
    'true':
        'res',
    'false':
        'ni res',
    'join %words':
        'pove\u017Ei %words',
    'split %s by %delim':
        'razdeli %s z %delim',
    'hello':
        'Halo',
    'world':
        'Svet',
    'letter %idx of %s':
        '\u010Drka %idx od %s',
    'length of %s':
        'dol\u017Eina %s',
    'unicode of %s':
        'Unicode vrednost od %s',
    'unicode %n as letter':
        'Unicode %n kot \u010Drka',
    'is %s a %typ ?':
        'je %s tipa %typ ?',
    'is %s identical to %s ?':
        'je %s identi\u010Den %s ?',

    'type of %s':
        'Tip od %s',

    // variables:
    'Make a variable':
        'Nova spremenljivka',
    'Variable name':
        'Ime spremenljivke',
    'Delete a variable':
        'Zbri\u0161i spremenljivko',

    'set %var to %s':
        'nastavi %var na %s',
    'change %var by %n':
        'spremeni spremenljivko %var za %n',
    'show variable %var':
        'prika\u017Ei spremenljivko %var',
    'hide variable %var':
        'skrij spremenljivko %var',
    'script variables %scriptVars':
        'spremenljivke programa %scriptVars',

    // lists:
    'list %exp':
        'Seznam %exp',
    '%s in front of %l':
        '%s na za\u010Detku %l',
    'item %idx of %l':
        'Element %idx od %l',
    'all but first of %l':
        'vsi razen prvega od %l',
    'length of %l':
        'dol\u017Eina %l',
    '%l contains %s':
        '%l vsebuje %s',
    'thing':
        'stvar',
    'add %s to %l':
        'dodaj %s k %l',
    'delete %ida of %l':
        'zbri\u0161i %ida iz %l',
    'insert %s at %idx of %l':
        'vstavi %s na mesto %idx v %l',
    'replace item %idx of %l with %s':
        'zamenjaj element %idx v %l z %s',

    // other
    'Make a block':
        'Nov blok',

    // menus
    // snap menu
    'About...':
        'Nekaj o Snap!...',
    'Reference manual':
        'Uporabni\u0161ka navodila',
    'Snap! website':
        'Spletna stran Snap!',
    'Download source':
        'Nalo\u017Ei izvorno kodo',
    'Switch back to user mode':
        'Preklop nazaj na uporabni\u0161ki na\u010Din',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'izklop Morfic menujev in prikaz uporabni\u0161ko prijaznih',
    'Switch to dev mode':
        'preklop na razvojni na\u010Din',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'omogo\u010Di  Morphic menuje in in\u0161pektorje, \ni uporabniku prijazno',

    // project menu
    'Project notes...':
        'Opis projekta...',
    'New':
        'Nov',
    'Open...':
        'Odpri...',
    'Save':
        'Shrani',
    'Save to disk':
        'Shrani na disk',
    'store this project\nin the downloads folder\n(in supporting browsers)':
        'shrani v mapo Prenosi\n'
            + '(ni na voljo v vseh brkljalnika)',
    'Save As...':
        'Shrani kot...',
    'Import...':
        'Uvozi...',
    'file menu import hint':
        'Nalaganje izvo\u017Eenega projekta,\nknji\u017Enice z '
            + 'bloki\n'
            + 'obleko ali zvokom',
    'Export project as plain text...':
        'Izvozi projekt kot navadno besedilo...',
    'Export project...':
        'Izvozi projekt...',
    'show project data as XML\nin a new browser window':
        'Prikaz projekta kot XML\nv novem oknu brkljalnika',
    'Export blocks...':
        'Izvozi bloke',
    'show global custom block definitions as XML\nin a new browser window':
        'Prikaz definicij globalnih lastnih blokov kot XML\nv novem oknu brkljalnika',
    'Unused blocks...':
          'Neuporabljeni bloki...',
    'find unused global custom blocks\nand remove their definitions':
        'najdi in odstrani uporabni\u0161ke neuporabljene globalne bloke',
    'Remove unused blocks':
        'Odstrani neuporabljene bloke',
    'there are currently no unused\nglobal custom blocks in this project':
        'trenutno ni neuporabljenih globalnih blokov v tem projektu',
    'unused block(s) removed':
        'neuporabljeni bloki so bili odstranjeni',
    'Export summary...':
        'Povzetek izvoza...',
    'Import tools':
        'Uvozi orodja',
    'load the official library of\npowerful blocks':
        'uvozi uradni modul z naprednimi bloki',
    'Libraries...':
        'Knji\u017Enice...',
    'Import library':
        'Nalo\u017Ei knji\u017Enico',

    // cloud menu
    'Login...':
        'Prijava...',
    'Signup...':
        'Registracija...',
    'Reset Password...':
        'Pozabljeno geslo...',

    // settings menu
    'Language...':
        'Jezik...',
    'Zoom blocks...':
        'Pove\u010Daj bloke...',
    'Stage size...':
        'Velikost scene...',
    'Stage size':
        'Velikost scene',
    'Stage width':
        '\u0160irina scene',
    'Stage height':
        'Vi\u0161ina scene',
    'Default':
        'Normalno',
    'Blurred shadows':
        'Mehke sence',
    'uncheck to use solid drop\nshadows and highlights':
        'izklopi za uporabo trdih senc in osvetlitev',
    'check to use blurred drop\nshadows and highlights':
        'vklopi za mehke sence in osvetlitve',
    'Zebra coloring':
        'barvanje kot zebra',
    'check to enable alternating\ncolors for nested blocks':
        'vklopi izmenjujo\u010De barve vgnezdenih blokov',
    'uncheck to disable alternating\ncolors for nested block':
        'izklopi izmenjujo\u010De barve gnezdenih blokov',
    'Prefer empty slot drops':
        'Imejmo raje prazne re\u017Ee',
    'settings menu prefer empty slots hint':
        'vklop raje namiga za prazne re\u017Ee'
            + 'zu bevorzugen',
    'uncheck to allow dropped\nreporters to kick out others':
        'razkljukaj za to, da reporterji odrinejo druge',
    'Long form input dialog':
        'Vhodni dialog dolge oblike',
    'check to always show slot\ntypes in the input dialog':
        'odkljukaj za prikaz tipov v vhodnih dialogih',
    'razkljukaj za uporabo kratke oblike vhodnih dialogov':
        'razkljukaj za uporabo dialoga kratke oblike',
    'Virtual keyboard':
        'Virtualna tipkovnicaa',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'razkljukaj za izklop podpore virtualne tipkovnice za mobilne naprave',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'odkljukaj za vklop podpore z virtualni tipkovnico za mobilne naprave',
    'Input sliders':
        'Vhodni drsniki',
    'uncheck to disable\ninput sliders for\nentry fields':
        'razkljukaj za izklop vhodnih drsnikov',
    'check to enable\ninput sliders for\nentry fields':
        'odkljukaj za aktiviranje vhodnih drsnikov',
    'Clicking sound':
        'Akusti\u010Dno klikanje',
    'uncheck to turn\nblock clicking\nsound off':
        'razkljukaj za deaktiviranje akusti\u010Dnega klikanja',
    'check to turn\nblock clicking\nsound on':
        'odkljukaj za vklop akusti\u010Dnega klikanja',
    'Animations':
        'Animacije',
    'uncheck to disable\nIDE animations':
        'razkljukaj za izklop IDE animacij',
    'Turbo mode':
        'Hitri na\u010Din',
    'check to prioritize\nscript execution':
        'odkljukaj za ve\u010Djo prioriteto izvajanja skript',
    'uncheck to run scripts\nat normal speed':
        'razkljukaj za normalno hitrost izvajanja skript',
    'check to enable\nIDE animations':
        'odkljukaj za IDE animacije',
    'Flat design':
        'Svetli izgled',
    'Keyboard Editing':
        'Urejanje s tipkovnico',
    'Table support':
        'Podpora za tabele',
    'Table lines':
        '\u010Crte med celicami v tabeli',
    'Thread safe scripts':
        'Varnost niti',
    'uncheck to allow\nscript reentrance':
        'razkljukaj za dopu\u0161\u010Danje ve\u010Dkraten vstop skript (reentrancy)',
    'check to disallow\nscript reentrance':
        'odkljukaj za onemogo\u010Danje ve\u010Dkratnega vstopa skript',
    'Prefer smooth animations':
        'Gladka animacija',
    'uncheck for greater speed\nat variable frame rates':
        'razkljukaj za hitrej\u0161e animacije s spremenljivo hitrostjo osve\u017Eevanja',
    'check for smooth, predictable\nanimations across computers':
        'odkljukaj za bolj predvidljivo hitrost animacij med razli\u010Dnimi ra\u010Dunalniki',
    'Flat line ends':
        'Ravni zaklju\u010Dki \u010Drt',
    'check for flat ends of lines':
        'odkljukaj za ravne zaklju\u010Dke \u010Drt',
    'uncheck for round ends of lines':
        'razkljukaj za zaobljene zaklju\u010Dke \u010Drt',
    'Inheritance support':
        'Podpora za dedovanje',

    // inputs
    'with inputs':
        'z vhodi',
    'input names:':
        'imena vhodov:',
    'Input Names:':
        'imena vhodov:',
    'input list:':
        'vhodni seznam:',

    // context menus:
    'help':
        'Pomo\u010D...',

    // palette:
    'hide primitives':
        'skrij osnovne bloke',
    'show primitives':
        'poka\u017Ei osnovne bloke',

    // blocks:
    'help...':
        'pomo\u010D...',
    'relabel...':
        'spremeni tip...',
    'duplicate':
        'podvoji',
    'make a copy\nand pick it up':
        'kopiraj',
    'only duplicate this block':
        'podvoji ta blok',
    'delete':
        'bri\u0161i',
    'script pic...':
        'slika skript...',
    'open a new window\nwith a picture of this script':
        'odpri novo okno s sliko tega skripta',
    'ringify':
        'Obkro\u017Ei',
    'unringify':
        'odstrani obro\u010D',
    'transient':
        'se ne shranjuje',

    // custom blocks:
    'delete block definition...':
        'bri\u0161i definicijo bloka',
    'edit...':
        'uredi...',

    // sprites:
    'edit':
        'uredi',
    'move':
        'premakni',
    'detach from':
        'odklopi',
    'detach all parts':
        'odklopi vse dele',
    'export...':
        'izvozi...',

    // stage:
    'show all':
        'prila\u017Ei vse ',
    'pic...':
        'izvozi sliko...',
    'open a new window\nwith a picture of the stage':
        'odpri novo okno s sliko te scene',

    // scripting area
    'clean up':
        'po\u010Disti',
    'arrange scripts\nvertically':
        'uredi skripte vertikalno',
    'add comment':
        'dodaj komentar',
    'undrop':
        'ponovno povle\u010Di',
    'undo the last\nblock drop\nin this pane':
        'prekli\u010Di dodajanje zadnjega bloka v tem okviru',
    'scripts pic...':
        'slika skript...',
    'open a new window\nwith a picture of all scripts':
        'odpri novo okno s sliko vseh skript',
    'make a block...':
        'Gradnja novega bloka...',

    // costumes
    'rename':
        'preimenuj',
    'export':
        'izvozi',
    'rename costume':
        'preimenuj izgled',

    // sounds
    'Play sound':
        'Predvajaj zvok',
    'Stop sound':
        'Ustavi zvok',
    'Stop':
        'Ustavi',
    'Play':
        'Predvajaj',
    'rename sound':
        'Preimenuj zvok',

    // lists and tables
    'list view...':
        'prika\u017Ei kot seznam...',
    'table view...':
        'prika\u017Ei kot tabelo',
    'open in dialog...':
        'odpri v novem oknu',
    'items':
        'elementi',

    // dialogs
    // buttons
    'OK':
        'V redu',
    'Ok':
        'V redu',
    'Cancel':
        'Prekli\u010Di',
    'Yes':
        'Da',
    'No':
        'Ne',

    // help
    'Help':
        'Pomo\u010D',

    // zoom blocks
    'Zoom blocks':
        'Pove\u010Daj blok',
    'build':
        'zgradi',
    'your own':
        'svoj',
    'blocks':
        'blok',
    'normal (1x)':
        'normalno (1x)',
    'demo (1.2x)':
        'demo (1.2x)',
    'presentation (1.4x)':
        'predstavitev(1.4x)',
    'big (2x)':
        'veliko (2x)',
    'huge (4x)':
        've\u010Dje(4x)',
    'giant (8x)':
        'ogromno (8x)',
    'monstrous (10x)':
        'najve\u010Dje(10x)',

    // Project Manager
    'Untitled':
        'Neimenovano',
    'Open Project':
        'Odpri projekt',
    '(empty)':
        '(prazno)',
    'Saved!':
        'Shranjeno!',
    'Delete Project':
        'Zbri\u0161i projekt',
    'Are you sure you want to delete':
        'Ste prepri\u010Dani da \u017Eelite izbrisati?',
    'rename...':
        'preimenuj...',

    // costume editor
    'Costume Editor':
        'Urejevalnik oblek',
    'click or drag crosshairs to move the rotation center':
        'Klikni ali povle\u010Di kri\u017Eec za premik centra vrtenja',

    // project notes
    'Project Notes':
        'Opis projekta',

    // new project
    'New Project':
        'Nov projekt',
    'Replace the current project with a new one?':
        'Zamenjam trenutni projekt z novim?',

    // save project
    'Save Project As...':
        'Shrani projekt kot...',

    // export blocks
    'Export blocks':
        'Izvoz blokov',
    'Import blocks':
        'Uvoz blokov',
    'this project doesn\'t have any\ncustom global blocks yet':
        'ta projekt \u0161e nima lastnih globalnih blokov',
    'select':
        'izberi',
    'all':
        'vse',
    'none':
        'ni\u010D',

    // variable dialog
    'for all sprites':
        'za vse objekte',
    'for this sprite only':
        'le za ta objekt',

    // block dialog
    'Change block':
        'Spremeni blok',
    'Command':
        'Ukaz',
    'Reporter':
        'Funkcija',
    'Predicate':
        'Predikat',

    // block editor
    'Block Editor':
        'Urejevalnik blokov',
    'Apply':
        'Uporabi',

    // block deletion dialog
    'Delete Custom Block':
        'Zbri\u0161i latni blok',
    'block deletion dialog text':
        'Ali naj res zbri\u0161em ta blok\n' +
            'z vsemi njegovimi primeri?',

    // input dialog
    'Create input name':
        'Tvori ime vhoda',
    'Edit input name':
        'Uredi ime vhoda',
    'Edit label fragment':
        'Uredi ime dela',
    'Title text':
        'Naslovno besedilo',
    'Input name':
        'ime vhoda',
    'Delete':
        'Bri\u0161i',
    'Object':
        'Objekt',
    'Number':
        '\u0160tevilo',
    'Text':
        'Tekst',
    'List':
        'Seznam',
    'Any type':
        'Poljuben tip',
    'Boolean (T/F)':
        'Boolova spr. (W/F)',
    'Command\n(inline)':
        'Ukaz',
    'Command\n(C-shape)':
        'Ukaz\n(C-oblika)',
    'Any\n(unevaluated)':
        'Poljuben\n(neovrednoten)',
    'Boolean\n(unevaluated)':
        'Boolova spr.\n(neovrednotena)',
    'Single input.':
        'En vnos.',
    'Default Value:':
        'Privzeta vrednost:',
    'Multiple inputs (value is list of inputs)':
        'Ve\u010D vnosov (kot seznam)',
    'Upvar - make internal variable visible to caller':
        'interne spremenljivke naj bodo navzven vidne',

    // About Snap
    'About Snap':
        'nekaj o Snap',
    'Back...':
        'Nazaj...',
    'License...':
        'Licenca...',
    'Modules...':
        'Komponente...',
    'Credits...':
        'Sodelujo\u010Di...',
    'Translators...':
        'Prevajalci',
    'License':
        'Licenca',
    'current module versions:':
        'Verzije komponent',
    'Contributors':
        'Prispevali',
    'Translations':
        'prevodi',

    // variable watchers
    'normal':
        'normalen',
    'large':
        'velik',
    'slider':
        'drsnik',
    'slider min...':
        'min vrednost...',
    'slider max...':
        'maks vrednost...',
    'import...':
        'uvozi...',
    'Slider minimum value':
        'Minimalna vrednost drsnika',
    'Slider maximum value':
        'Maksimalna vrednost drsnika',

    // list watchers
    'length: ':
        'Dol\u017Eina: ',

    // coments
    'add comment here...':
        'tu vnese\u0161 komentar',

    // drow downs
    // directions
    '(90) right':
        '(90) desno',
    '(-90) left':
        '(-90) levo',
    '(0) up':
        '(0) gor',
    '(180) right':
        '(180) dol',

    // collision detection
    'mouse-pointer':
        'kazalec mi\u0161ke',
    'edge':
        'rob',
    'pen trails':
        'sledi svin\u010Dnika',

    // costumes
    'Turtle':
        'Kazalec smeri',
    'Empty':
        'Prazno',

    // graphical effects
    'brightness':
        'svetlost',
    'ghost':
        'prosojnost',
    'negative':
        'obratno',
    // keys
    'space':
        'presledek',
    'up arrow':
        'pu\u0161\u010Dica gor',
    'down arrow':
        'pu\u0161\u010Dica dol',
    'right arrow':
        'pu\u0161\u010Dica desno',
    'left arrow':
        'pu\u0161\u010Dica levo',
    'any key':
        'poljuden',
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
        'nov...',

    // math functions
    'abs':
        'abs',
    'ceiling':
        'zaokro\u017Eevanje navzgor',
    'floor':
        'zaokro\u017Eevanje navzdol',
    'sqrt':
        'koren',
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
        '\u010Drke',
    'whitespace':
        'presledki',
    'line':
        'vrstica',
    'tab':
        'tab',

    // data types
    'number':
        '\u0161tevilo',
    'text':
        'Tekst',
    'Boolean':
        'logi\u010Dna spr.',
    'list':
        'seznam',
    'command':
        'ukaz',
    'reporter':
        'funkcijski blok',
    'predicate':
        'Predikat',

    // list indices
    'last':
        'zadnji',
    'any':
        'poljuben'
};
