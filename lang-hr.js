/*

    lang-hr.js

    Croatian translation for SNAP!

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

SnapTranslator.dict.hr = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    Ä, ä   \u00c4, \u00e4
    Ö, ö   \u00d6, \u00f6
    Ü, ü   \u00dc, \u00fc
    ß      \u00df
*/

    // translations meta information 4.0.2.IMA NOVA VERZIJA
    'language_name':
        'Hrvatski', // the name as it should appear in the language menu
    'language_translator':
        '\u017Deljko Hrvoj', // your name for the Translators tab
    'translator_e-mail':
        'zeljko.hrvoj@zg.t-com.hr', // optional
    'last_changed':
        '2015-09-15', // this, too, will appear in the Translators tab

    // GUI
    // control bar:
    'untitled':
        'bez imena',
    'development mode':
        'razvojni na\u010Din',

    // categories:
    'Motion':
        'Kretanje',
    'Looks':
        'Izgled',
    'Sound':
        'Zvuk',
    'Pen':
        'Olovka',
    'Control':
        'Upravljanje',
    'Sensing':
        'Osjetila',
    'Operators':
        'Operatori',
    'Variables':
        'Varijable',
    'Lists':
        'Popisi',
    'Other':
        'Ostalo',

    // editor:
    'draggable':
        'povla\u010Div',

    // tabs:
    'Scripts':
        'Skripte',
    'Costumes':
        'Kostimi',
    'Sounds':
        'Zvukovi',

    // names:
    'Sprite':
        'Objekt',
    'Stage':
        'Scena',

    // rotation styles:
    'don\'t rotate':
        'ne rotiraj',
    'can rotate':
        'mo\u017Ee se rotirati',
    'only face left/right':
        'gledaj samo lijevo-desno',

    // new sprite button:
    'add a new sprite':
        'dodaj novi objekt',

    // tab help
    'costumes tab help':
        'Slike uvozi\u0161 povla\u010Denjem s jedne druge\n'
            + 'web stranice ili ra\u010Dunala',
    'import a sound from your computer\nby dragging it into here':
        'Zvuk uvozi\u0161 tako, da ga povu\u010De\u0161 ovdje',

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
        'Scena je izabrana, ali je\njo\u0161 bez blokova '
            + 'kretanja',

    'move %n steps':
        'pomakni se %n koraka',
    'turn %clockwise %n degrees':
        'okreni se %clockwise %n stupnjeva',
    'turn %counterclockwise %n degrees':
        'okreni se %counterclockwise %n stupnjeva',
    'point in direction %dir':
        'okreni se u smjeru %dir',
    'point towards %dst':
        'okreni se prema %dst',
    'go to x: %n y: %n':
        'kreni prema x: %n y: %n',
    'go to %dst':
        'kreni prema %dst',
    'glide %n secs to x: %n y: %n':
        'kli\u017Ei %n s do x: %n y: %n',
    'change x by %n':
        'promijeni x za %n',
    'set x to %n':
        'postavi x na %n',
    'change y by %n':
        'promijeni y za %n',
    'set y to %n':
        'postavi y na %n',
    'if on edge, bounce':
        'kad bude\u0161 na rubu, odbij se',
    'x position':
        'polo\u017Eaj x',
    'y position':
        'polo\u017Eaj y',
    'direction':
        'smjer',

    // looks:
    'switch to costume %cst':
        'prebaci na kostim %cst',
    'next costume':
        'idu\u0107i kostim',
    'costume #':
        'kostim br.',
    'say %s for %n secs':
        'reci %s tokom %n s',
    'say %s':
        'reci %s',
    'think %s for %n secs':
        'razmi\u0161ljaj %s tokom %n s',
    'think %s':
        'razmi\u0161ljaj %s',
    'Hello!':
        'Pozdrav!',
    'Hmm...':
        'Hmm...',
    'change %eff effect by %n':
        'promijeni efekt %eff za %n',
    'set %eff effect to %n':
        'postavi efekt %eff na %n',
    'clear graphic effects':
        'isklju\u010Di grafi\u010Dke efekte',
    'change size by %n':
        'promijeni veli\u010Dinu za %n',
    'set size to %n %':
        'postavi veli\u010Dinu na %n %',
    'size':
        'veli\u010Dina',
    'show':
        'pogledaj',
    'hide':
        'sakrij',
    'go to front':
        'prebaci u prednji plan',
    'go back %n layers':
        'idi natrag %n slojeva',

    'development mode \ndebugging primitives:':
        'razvojni na\u010Din \ndebagiranje osnovnih blokova',
    'console log %mult%s':
        'ispi\u0161i na konzolu %mult%s',
    'alert %mult%s':
        'upozorenje: %mult%s',

    // sound:
    'play sound %snd':
        'odsviraj zvuk %snd',
    'play sound %snd until done':
        'odsviraj zvuk %snd do kraja',
    'stop all sounds':
        'zaustavi sve zvukove',
    'rest for %n beats':
        'sviraj pauzu tokom %n udaraca',
    'play note %n for %n beats':
        'sviraj notu %n tokom %n udaraca',
    'change tempo by %n':
        'promijeni tempo za %n',
    'set tempo to %n bpm':
        'postavi tempo na %n udar./min.',
    'tempo':
        'Tempo',

    // pen:
    'clear':
        'obri\u0161i',
    'pen down':
        'olovku pritisni',
    'pen up':
        'olovku digni',
    'set pen color to %clr':
        'postavi boju olovke na %clr',
    'change pen color by %n':
        'promijeni boju olovke za %n',
    'set pen color to %n':
        'postavi boju olovke na %n',
    'change pen shade by %n':
        'promijeni sjenu olovke za %n',
    'set pen shade to %n':
        'postavi sjenu olovke na %n',
    'change pen size by %n':
        'promijeni veli\u010Dinu olovke za %n',
    'set pen size to %n':
        'postavi veli\u010Dinu olovke na %n',
    'stamp':
        'pe\u010Dat',

    // control:
    'when %greenflag clicked':
        'kad kliknem na %greenflag',
    'when %keyHat key pressed':
        'kad pritisnem tipku %keyHat',
    'when I am %interaction':
        'kad me %interaction',
    'clicked':
        'klikne\u0161',
    'pressed':
        'pritisne\u0161',
    'dropped':
        'ispusti\u0161',
    'mouse-entered':
        'mi\u0161 posjeti',
    'mouse-departed':
        'mi\u0161 napusti',
    'when I receive %msgHat':
        'kad \u010Dujem %msgHat',
    'broadcast %msg':
        'razglasi %msg',
    'broadcast %msg and wait':
        'razglasi %msg i \u010Dekaj odg.',
    'Message name':
        'Ime poruke',
    'message':
        'poruka',
    'any message':
        'bilo koja poruka',
    'wait %n secs':
        '\u010Dekaj %n s',
    'wait until %b':
        '\u010Dekaj dok je %b',
    'forever %c':
        'zauvijek %c',
    'repeat %n %c':
        'ponavljaj %n %c',
    'repeat until %b %c':
        'ponavljaj dok ne bude %b %c',
    'if %b %c':
        'ako %b %c',
    'if %b %c else %c':
        'ako %b %c ina\u010De %c',
    'report %s':
        'izvje\u0161\u0107e %s',
    'stop %stopChoices':
        'zaustavi %stopChoices',
    'all':
        'sve',
    'this script':
        'ovu skriptu',
    'this block':
        'ovaj blok',
    'stop %stopOthersChoices':
        'zaustavi %stopOthersChoices',
    'all but this script':
        'sve osim ove skripte',
    'other scripts in sprite':
        'ostale skripte objekta',
    'pause all %pause':
        'pauziraj sve %pause',
    'run %cmdRing %inputs':
        'pokreni %cmdRing  %inputs',
    'launch %cmdRing %inputs':
        'startaj %cmdRing %inputs',
    'call %repRing %inputs':
        'pozovi %repRing  %inputs',
    'run %cmdRing w/continuation':
        'pokreni %cmdRing s nastavkom',
    'call %cmdRing w/continuation':
        'pozovi %cmdRing s nastavkom',
    'warp %c':
        'warp %c',
    'when I start as a clone':
        'kad startam kao klon',
    'create a clone of %cln':
        'stvori klona od %cln',
    'myself':
        'mene',
    'delete this clone':
        'obri\u0161i ovog klona',

    // sensing:
    'touching %col ?':
        'dodiruje %col ?',
    'touching %clr ?':
        'dodiruje %clr ?',
    'color %clr is touching %clr ?':
        'boja %clr dodiruje %clr ?',
    'ask %s and wait':
        'pitaj %s i \u010Dekaj',
    'what\'s your name?':
        'kako ti je ime?',
    'answer':
        'odgovor',
    'mouse x':
        'x polo\u017Eaj mi\u0161a',
    'mouse y':
        'y polo\u017Eaj mi\u0161a',
    'mouse down?':
        'gumb mi\u0161a pritisnut?',
    'key %key pressed?':
        'tipka %key pritisnuta?',
    'distance to %dst':
        'udaljenost do %dst',
    'reset timer':
        'resetiraj timer',
    'timer':
        'timer',
    '%att of %spr':
        '%att od %spr',
    'http:// %s':
        'http:// %s',
    'turbo mode?':
        'turbo na\u010Din?',
    'set turbo mode to %b':
        'postavi turbo na\u010Din na %b',

    'filtered for %clr':
        'filtrirano za %clr',
    'stack size':
        'veli\u010Dina stoga',
    'frames':
        'sli\u010Dice',

    // operators:
    '%n mod %n':
        '%n modul %n',
    'round %n':
        'round %n',
    '%fun of %n':
        '%fun od %n',
    'pick random %n to %n':
        'slu\u010Dajni broj od %n do %n',
    '%b and %b':
        '%b i %b',
    '%b or %b':
        '%b ili %b',
    'not %b':
        'ne %b',
    'true':
        'istina',
    'false':
        'la\u017E',
    'join %words':
        'spoji %words',
    'split %s by %delim':
        'razdvoji %s kod %delim',
    'hello':
        'pozdrav',
    'world':
        'svijet',
    'letter %n of %s':
        'slovo %n od %s',
    'length of %s':
        'duljina od %s',
    'unicode of %s':
        'unicode vrijednost od %s',
    'unicode %n as letter':
        'unicode %n kao znak',
    'is %s a %typ ?':
        'da li je %s tipa %typ ?',
    'is %s identical to %s ?':
        'da li je %s isti kao %s ?',

    'type of %s':
        'tip od %s',

    // variables:
    'Make a variable':
        'Napravi varijablu',
    'Variable name':
        'Ime varijable',
    'Script variable name':
        'Ime skriptne varijable',
    'Delete a variable':
        'Obri\u0161i varijablu',

    'set %var to %s':
        'postavi %var na %s',
    'change %var by %n':
        'promijeni varijablu %var za %n',
    'show variable %var':
        'prika\u017Ei varijablu %var',
    'hide variable %var':
        'sakrij varijablu %var',
    'script variables %scriptVars':
        'skriptne varijable %scriptVars',

    // lists:
    'list %exp':
        'popis %exp',
    '%s in front of %l':
        '%s ispred %l',
    'item %idx of %l':
        'element %idx od %l',
    'all but first of %l':
        'svi osim prvog od %l',
    'length of %l':
        'duljina od %l',
    '%l contains %s':
        '%l sadr\u017Ei %s',
    'thing':
        'stvar',
    'add %s to %l':
        'dodaj %s na %l',
    'delete %ida of %l':
        'obri\u0161i %ida od %l',
    'insert %s at %idx of %l':
        'ubaci %s na mjesto %idx od %l',
    'replace item %idx of %l with %s':
        'zamijeni element %idx od %l sa %s',

    // other
    'Make a block':
        'Napravi blok',

    // menus
    // snap menu
    'About...':
        'O programu...',
    'Reference manual':
        'Korisni\u010Dki priru\u010Dnik',
    'Snap! website':
        'Snap! web stranica',
    'Download source':
        'Skini izvorni kod',
    'Switch back to user mode':
        'Prebaci natrag na korisni\u0161ki na\u010Din',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'onemogu\u0107i deep-Morphic\nkontekstne menije\ni koristi user-friendly menije',
    'Switch to dev mode':
        'Prebaci na razvojni na\u010Din',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'omogu\u0107i Morphic\nkontekstne menije\ni inspektore,\nnisu ba\u0161 user-friendly',

    // project menu
    'Project notes...':
        'Napomene o projektu...',
    'New':
        'Novi',
    'Open...':
        'Otvori...',
    'Save':
        'Spremi',
    'Save to disk':
        'Spremi na disk',
    'store this project\nin the downloads folder\n(in supporting browsers)':
        'spremi ovaj projekt u Download mapu'
            + '(nije podr\u017Eano ba\u0161 kod svih preglednika)',
    'Save As...':
        'Spremi kao...',
    'Import...':
        'Uvezi...',
    'file menu import hint':
        'uvoz izvezenog projekta tj.\nbiblioteke s '
            + 'blokovima, '
            + 'kostimima i/ili zvukovima',
    'Export project as plain text...':
        'Izvezi projekt kao obi\u010Dni tekst...',
    'Export project...':
        'Izvoz projekta...',
    'show project data as XML\nin a new browser window':
        'prikaz projekta u XML obliku\nu novom prozoru preglednika',
    'Export blocks...':
        'Izvoz blokova',
    'show global custom block definitions as XML\nin a new browser window':
        'prikaz globalnih definicija korisni\u010Dkih blokova u XML obliku\nu novom prozoru preglednika',
    'Import tools':
        'Uvezi alate',
    'load the official library of\npowerful blocks':
        'u\u010Ditaj slu\u017Ebenu biblioteku\ns naprednim blokovima',
    'Libraries...':
        'Biblioteke...',
    'Import library':
        'Uvezi bibloteku',

    // cloud menu
    'Login...':
        'Prijava...',
    'Signup...':
        'Registracija ra\u010Duna...',

    // settings menu
    'Language...':
        'Jezik...',
    'Zoom blocks...':
        'Zumiraj blokove...',
    'Stage size...':
        'Veli\u010Dina scene...',
    'Stage size':
        'Veli\u010Dina scene',
    'Stage width':
        '\u0160irina scene',
    'Stage height':
        'Visina scene',
    'Default':
        'Default',
    'Blurred shadows':
        'Zamagljene sjene',
    'uncheck to use solid drop\nshadows and highlights':
        'odzna\u010Di za \u010Dvrste\nsjene i osvjetljenja',
    'check to use blurred drop\nshadows and highlights':
        'ozna\u010Di za zamagljene\nsjene i osvjetljenja',
    'Zebra coloring':
        'Zebra boje',
    'check to enable alternating\ncolors for nested blocks':
        'ozna\u010Di za nijansiranje\nboja ugnje\u017E\u0111enih blokova',
    'uncheck to disable alternating\ncolors for nested block':
        'odzna\u010Di da ne nijansiram\nboje ugnje\u017E\u0111enih blokova',
    'Dynamic input labels':
        'Dinami\u010Dke oznake parametara',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'odzna\u010Di za isklju\u010Diti\ndinami\u010Dke oznake',
    'check to enable dynamic\nlabels for variadic inputs':
        'ozna\u010Di za omogu\u0107iti \ndinami\u010Dke oznake',
    'Prefer empty slot drops':
        'Preferiraj spu\u0161tanje u prazne utore',
    'settings menu prefer empty slots hint':
        'uklju\u010Di da se blokovi radije\nspu\u0161taju na slobodna mjesta pri '
            + 'postavljanju',
    'uncheck to allow dropped\nreporters to kick out others':
        'odzna\u010Di za to da ispu\u0161tene\nvrijednosti izbacuju druge',
    'Long form input dialog':
        'Du\u017Ei dijalog parametara',
    'Plain prototype labels':
        'Ozna\u010Davanje blokova',
    'uncheck to always show (+) symbols\nin block prototype labels':
        'odzna\u010Di za uvijek prikazati (+) simbol\nu oznakama novih blokova',
    'check to hide (+) symbols\nin block prototype labels':
        'ozna\u010Di za sakriti (+) simbol\nu oznakama novih blokova',
    'check to always show slot\ntypes in the input dialog':
        'ozna\u010Di da bi uvijek pokazao\nsve opcije u dijalogu\nparametara',
    'uncheck to use the input\ndialog in short form':
        'odzna\u010Di za kratke dijaloge parametara',
    'Virtual keyboard':
        'Virtualna tipkovnica',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'odzna\u010Di da se\nne koristi virtualna\ntipkovnica za mobilne ure\u0111aje',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'ozna\u010Di da se\nmo\u017Ee koristiti virtualna\ntipkovnica za mobilne ure\u0111aje',
    'Input sliders':
        'Kliza\u010Di za parametre',
    'uncheck to disable\ninput sliders for\nentry fields':
        'odzna\u010Di da isklju\u010Di\u0161\nkliza\u010De vrijednosti\nkod parametara',
    'check to enable\ninput sliders for\nentry fields':
        'ozna\u010Di da uklju\u010Di\u0161\nkliza\u010De vrijednosti\n kod parametara',
    'Clicking sound':
        'Zvuk klikanja',
    'uncheck to turn\nblock clicking\nsound off':
        'odzna\u010Di da\nisklju\u010Di\u0161 zvuk\nklikanja bloka',
    'check to turn\nblock clicking\nsound on':
        'ozna\u010Di da\nuklju\u010Di\u0161 zvuk\nklikanja bloka',
    'Animations':
        'Animacije',
    'uncheck to disable\nIDE animations':
        'odzna\u010Di da onemogu\u0107i\u0161 IDE-\nanimacije',
    'Turbo mode':
        'Turbo na\u010Din',
    'check to prioritize\nscript execution':
        'ozna\u010Di da da\u0161 prioritet izvr\u0161avanju skripti',
    'uncheck to run scripts\nat normal speed':
        'odzna\u010Di za normalni prioritet izvr\u0161avanja skripti',
    'check to enable\nIDE animations':
        'ozna\u010Di da se omogu\u0107i\u0161 IDE-\nanimacije',
    'Flat design':
        'Flat design',
    'Keyboard Editing':
        'Ure\u0111ivanje tipkovnicom',
    'Thread safe scripts':
        'Skripte - vi\u0161estrukost',
    'uncheck to allow\nscript reentrance':
        'odzna\u010Di da dopusti\u0161\nvi\u0161ekratni poziv skripti',
    'check to disallow\nscript reentrance':
        'ozna\u010Di da zabrani\u0161\nvi\u0161ekratni poziv skripti',
    'Prefer smooth animations':
        'Preferiraj glatke animacije',
    'uncheck for greater speed\nat variable frame rates':
        'odzna\u010Di za ve\u0107u brzinu kod\npromjenljive frekvencije osvje\u017Eavanja',
    'check for smooth, predictable\nanimations across computers':
        'ozna\u010Di za glatke, predvidive animacije na raznim ra\u010Dunalima',
    'Flat line ends':
        'Ravni zavr\u0161eci linija',
    'check for flat ends of lines':
        'ozna\u010Di za ravne zavr\u0161etke linija',
    'uncheck for round ends of lines':
        'odzna\u010Di za zaobljene zavr\u0161etke linija',
    'Inheritance support':
        'Podr\u017Ei naslje\u0111ivanje',

    // inputs
    'with inputs':
        's parametrima',
    'input names:':
        'imena parametara:',
    'Input Names:':
        'Imena parametara:',
    'input list:':
        'popis parametara:',

    // context menus:
    'help':
        'Pomo\u0107',

    // palette:
    'hide primitives':
        'sakrij osnovne blokove',
    'show primitives':
        'poka\u017Ei osnovne blokove',

    // blocks:
    'help...':
        'pomo\u0107...',
    'relabel...':
        'promijeni tip...',
    'duplicate':
        'dupliciraj',
    'make a copy\nand pick it up':
        'napravi kopiju\ni pokupi',
    'only duplicate this block':
        'dupliciraj samo taj blok',
    'delete':
        'izbri\u0161i',
    'script pic...':
        'slikaj skriptu...',
    'open a new window\nwith a picture of this script':
        'otvori novi prozor\nsa slikom te skripte',
    'ringify':
        'opkru\u017Ei',
    'unringify':
        'odstrani obru\u010D',

    // custom blocks:
    'delete block definition...':
        'obri\u0161i definiciju bloka',
    'edit...':
        'uredi...',

    // sprites:
    'edit':
        'uredi',
    'move':
        'pomakni',
    'detach from':
        'odlijepi od',
    'detach all parts':
        'odlijepi sve dijelove',
    'export...':
        'izvezi...',

    // stage:
    'show all':
        'poka\u017Ei sve',
    'pic...':
        'slikaj...',
    'open a new window\nwith a picture of the stage':
        'otvori novi prozor\nsa slikom scene',

    // scripting area
    'clean up':
        'poslo\u017Ei',
    'arrange scripts\nvertically':
        'poslo\u017Ei skripte\nokomito',
    'add comment':
        'dodaj komentar',
    'undrop':
        'poni\u0161ti ispu\u0161tanje',
    'undo the last\nblock drop\nin this pane':
        'poni\u0161ti zadnje ispu\u0161tanje\nbloka u tom okviru',
    'scripts pic...':
        'slikaj skriptu...',
    'open a new window\nwith a picture of all scripts':
        'otvori novi prozor\nsa slikom svih skripti',
    'make a block...':
        'napravi blok...',

    // costumes
    'rename':
        'preimenuj',
    'export':
        'izvezi',
    'rename costume':
        'preimenuj kostim',

    // sounds
    'Play sound':
        'Sviraj zvuk',
    'Stop sound':
        'Zaustavi zvuk',
    'Stop':
        'Zaustavi',
    'Play':
        'Sviraj',
    'rename sound':
        'preimenuj zvuk',

    // dialogs
    // buttons
    'OK':
        'OK',
    'Ok':
        'Ok',
    'Cancel':
        'Odustani',
    'Yes':
        'Da',
    'No':
        'Ne',

    // help
    'Help':
        'Pomo\u0107',

    // zoom blocks
    'Zoom blocks':
        'Zumiraj blok',
    'build':
        'napravi',
    'your own':
        'svoje vlastite',
    'blocks':
        'blokove',
    'normal (1x)':
        'normal (1x)',
    'demo (1.2x)':
        'demo (1.2x)',
    'presentation (1.4x)':
        'prezentacija (1.4x)',
    'big (2x)':
        'velik (2x)',
    'huge (4x)':
        'ogroman (4x)',
    'giant (8x)':
        'gigantski (8x)',
    'monstrous (10x)':
        'monstruozni (10x)',

    // Project Manager
    'Untitled':
        'Bez imena',
    'Open Project':
        'Otvori projekt',
    '(empty)':
        '(prazno)',
    'Saved!':
        'Spremljeno!',
    'Delete Project':
        'Izbrisati projekt',
    'Are you sure you want to delete':
        'Jesi siguran da \u017Eeli\u0161 izbrisati?',
    'rename...':
        'preimenuj...',

    // costume editor
    'Costume Editor':
        'Ure\u0111iva\u010D kostima',
    'click or drag crosshairs to move the rotation center':
        'Klikni ili povuci kri\u017Ei\u0107 za promjenu centra rotacije',

    // project notes
    'Project Notes':
        'Napomene o projektu',

    // new project
    'New Project':
        'Novi projekt',
    'Replace the current project with a new one?':
        'Zamijeniti trenutni projekt s novim?',

    // save project
    'Save Project As...':
        'Spremi projekt kao...',

    // export blocks
    'Export blocks':
        'Izvezi blokove',
    'Import blocks':
        'Uvezi blokove',
    'this project doesn\'t have any\ncustom global blocks yet':
        'ovaj projekt nema jo\u0161 nijedan korisni\u010Dki globalni blok',
    'select':
        'izaberi',
    'none':
        'nijedan',

    // variable dialog
    'for all sprites':
        'za sve objekte',
    'for this sprite only':
        'samo za taj objekt',

    // block dialog
    'Change block':
        'Promijeni blok',
    'Command':
        'Naredba',
    'Reporter':
        'Vrijednost',
    'Predicate':
        'Tvrdnja',

    // block editor
    'Block Editor':
        'Ure\u0111iva\u010D blokova',
    'Apply':
        'Primijeni',

    // block deletion dialog
    'Delete Custom Block':
        'Obri\u0161i korisni\u010Dki blok',
    'block deletion dialog text':
        'Da li da obri\u0161em taj blok\n' +
            'sa svim primjerima?',

    // input dialog
    'Create input name':
        'Kreiraj ime parametra',
    'Edit input name':
        'Uredi ime parametra',
    'Edit label fragment':
        'Uredi oznaku',
    'Title text':
        'Tekst naslova',
    'Input name':
        'Ime parametra',
    'Delete':
        'Obri\u0161i',
    'Object':
        'Objekt',
    'Number':
        'Broj',
    'Text':
        'Tekst',
    'List':
        'Popis',
    'Any type':
        'Bilo koji tip',
    'Boolean (T/F)':
        'Logi\u010Dki (T/F)',
    'Command\n(inline)':
        'Naredba\n(u liniji)',
    'Command\n(C-shape)':
        'Naredba\n(C-oblika)',
    'Any\n(unevaluated)':
        'Bilo koji\n(neizra\u010Dunat)',
    'Boolean\n(unevaluated)':
        'Logi\u010Dki\n(neizra\u010Dunat)',
    'Single input.':
        'Jedan parametar.',
    'Default Value:':
        'Default vrijednost:',
    'Multiple inputs (value is list of inputs)':
        'Vi\u0161e parametara (vrijednost je popis parametara)',
    'Upvar - make internal variable visible to caller':
        'Interna varijabla vidljiva pozivaocu',

    // About Snap
    'About Snap':
        'O Snap-u',
    'Back...':
        'Natrag...',
    'License...':
        'Licenca...',
    'Modules...':
        'Moduli...',
    'Credits...':
        'Suradnici...',
    'Translators...':
        'Prevoditelji',
    'License':
        'Licenca',
    'current module versions:':
        'Verzije u\u010Ditanih modula:',
    'Contributors':
        'Doprinosioci',
    'Translations':
        'Prijevodi',

    // variable watchers
    'normal':
        'normalno',
    'large':
        'veliko',
    'slider':
        'kliza\u010D',
    'slider min...':
        'kliza\u010D min...',
    'slider max...':
        'kliza\u010D max...',
    'import...':
        'uvezi...',
    'Slider minimum value':
        'Minimalna vrijednost kliza\u010Da',
    'Slider maximum value':
        'Maksimalna vrijednost kliza\u010Da',

    // list watchers
    'length: ':
        'duljina: ',

    // coments
    'add comment here...':
        'ovdje dodaj komentar...',

    // drow downs
    // directions
    '(90) right':
        '(90) desno',
    '(-90) left':
        '(-90) lijevo',
    '(0) up':
        '(0) gore',
    '(180) down':
        '(180) dolje',

    // collision detection
    'mouse-pointer':
        'strelica mi\u0161a',
    'edge':
        'rub',
    'pen trails':
        'tragovi olovke',

    // costumes
    'Turtle':
        'Kostim zero',
    'Empty':
        'Prazno',

    // graphical effects
    'brightness':
        'svjetlina',
    'ghost':
        'prozirnost',
    'negative':
        'negativ',
    'comic':
        'komi\u010Dno',
    'confetti':
        '\u0161areno',

    // keys
    'space':
        'razmaknica',
    'up arrow':
        'strelica gore',
    'down arrow':
        'strelica dolje',
    'right arrow':
        'strelica desno',
    'left arrow':
        'strelica lijevo',
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
        'novo...',

    // math functions
    'abs':
        'abs',
    'floor':
        'floor',
    'sqrt':
        'sqrt',
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
        'slovo',
    'whitespace':
        'razmak',
    'line':
        'linija',
    'tab':
        'tabulator',
    'cr':
        'novi red',

    // data types
    'number':
        'brojka',
    'text':
        'tekst',
    'Boolean':
        'logi\u010Dki',
    'list':
        'popis',
    'command':
        'naredba',
    'reporter':
        'vrijednost',
    'predicate':
        'tvrdnja',

    // list indices
    'last':
        'zadnji',
    'any':
        'bilo koji'
};
