/*

    lang-ro.js

    Romanian translation for SNAP!

    written by Jens Mönig & Cristian Macarascu

    Copyright (C) 2015 by Jens Mönig & Cristian Macarascu

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

SnapTranslator.dict.ro = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    Ä, ä   \u00c4, \u00e4
    Ö, ö   \u00d6, \u00f6
    Ü, ü   \u00dc, \u00fc
    ß      \u00df
*/

    // translations meta information
    'language_name':
        'Romanian', // the name as it should appear in the language menu
    'language_translator':
        'Cristian Macarascu', // your name for the Translators tab
    'translator_e-mail':
        '', // optional
    'last_changed':
        '2015-10-24', // this, too, will appear in the Translators tab

    // GUI
    // control bar:
    'untitled':
        'fara nume',
    'development mode':
        'modul dezvoltare',

    // categories:
    'Motion':
        'Miscare',
    'Looks':
        'Infatisare',
    'Sound':
        'Sunet',
    'Pen':
        'Scriere',
    'Control':
        'Control',
    'Sensing':
        'Interactiune',
    'Operators':
        'Operatori',
    'Variables':
        'Variabile',
    'Lists':
        'Liste',
    'Other':
        'Altele',

    // editor:
    'draggable':
        'poate fi mutat',

    // tabs:
    'Scripts':
        'Scripturi',
    'Costumes':
        'Costume',
    'Sounds':
        'Sunete',

    // names:
    'Sprite':
        'Animatie',
    'Stage':
        'Scena',

    // rotation styles:
    'don\'t rotate':
        'fara rotire',
    'can rotate':
        'rotire libera',
    'only face left/right':
        'doar stanga/dreapta',

    // new sprite button:
    'add a new sprite':
        'adauga o noua animatie',

    // tab help
    'costumes tab help':
        'ajutor pentru costume',
    'import a sound from your computer\nby dragging it into here':
        'adauga un sunet tragandu-l aici',

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
        'Scena selectata:\nfara primitive de miscare',

    'move %n steps':
        'inainteaza %n pasi',
    'turn %clockwise %n degrees':
        'roteste %clockwise %n grade',
    'turn %counterclockwise %n degrees':
        'roteste %counterclockwise %n grade',
    'point in direction %dir':
        'arata spre directia %dir',
    'point towards %dst':
        'arata spre %dst',
    'go to x: %n y: %n':
        'mergi la x: %n y: %n',
    'go to %dst':
        'mergi la %dst',
    'glide %n secs to x: %n y: %n':
        'mergi in %n secunde la x: %n y: %n',
    'change x by %n':
        'modifica x cu %n',
    'set x to %n':
        'schimba x in %n',
    'change y by %n':
        'modifica y cu %n',
    'set y to %n':
        'schimba y in %n',
    'if on edge, bounce':
        'daca esti pe margine, sari',
    'x position':
        'pozitia x',
    'y position':
        'pozitia y',
    'direction':
        'directia',

    // looks:
    'switch to costume %cst':
        'schimba-te in costumul %cst',
    'next costume':
        'urmatorul costum',
    'costume #':
        'costumul nr',
    'say %s for %n secs':
        'spune %s pentru %n secunde',
    'say %s':
        'spune %s',
    'think %s for %n secs':
        'gandeste %s pentru %n secunde',
    'think %s':
        'gandeste %s',
    'Hello!':
        'Salut!',
    'Hmm...':
        'Hmmm...',
    'change %eff effect by %n':
        'modifica efectul %eff cu %n',
    'set %eff effect to %n':
        'schimba efectul %eff in %n',
    'clear graphic effects':
        'anuleaza efectele grafice',
    'change size by %n':
        'modifica marimea cu %n',
    'set size to %n %':
        'schimba marimea la %n %',
    'size':
        'marime',
    'show':
        'afiseaza',
    'hide':
        'ascunde',
    'go to front':
        'adu in fata',
    'go back %n layers':
        'muta spre spate %n niveluri',

    'development mode \ndebugging primitives:':
        'Modul dezvoltare \nprimitive de debug:',
    'console log %mult%s':
        'jurnal consola: %mult%',
    'alert %mult%s':
        'anunta %mult%',

    // sound:
    'play sound %snd':
        'scoate sunetul %snd',
    'play sound %snd until done':
        'scoate sunetul %snd pana termini',
    'stop all sounds':
        'opreste toate sunetele',
    'rest for %n beats':
        'pauza pentru %n masuri',
    'play note %n for %n beats':
        'canta nota %n pentru %n masuri',
    'change tempo by %n':
        'modifica tempoul cu %n',
    'set tempo to %n bpm':
        'schimba tempoul in %n bpm',
    'tempo':
        'tempo',

    // pen:
    'clear':
        'sterge',
    'pen down':
        'stiloul jos',
    'pen up':
        'stiloul sus',
    'set pen color to %clr':
        'schimba culoarea stiloului in %clr',
    'change pen color by %n':
        'modifica culoarea stiloului cu %n',
    'set pen color to %n':
        'schimba culoarea stiloului in  %n',
    'change pen shade by %n':
        'modifica umbra stiloului cu %n',
    'set pen shade to %n':
        'schimba umbra stiloului in %n',
    'change pen size by %n':
        'modifica grosimea penitei cu %n',
    'set pen size to %n':
        'schimba grosimea penitei in %n',
    'stamp':
        'stampila',

    // control:
    'when %greenflag clicked':
        'cand se apasa %greenflag',
    'when %keyHat key pressed':
        'cand se apasa tasta %keyHat',
    'when I am %interaction':
        'cand sunt %interaction',
    'clicked':
        'apasat',
    'pressed':
        'tinut apasat',
    'dropped':
        'eliberat',
    'mouse-entered':
        'in contact cu mouse-ul',
    'mouse-departed':
        'indepratat de langa mouse',
    'when I receive %msgHat':
        'cand primesc %msgHat',
    'broadcast %msg':
        'trimite mesajul %msg tuturor',
    'broadcast %msg and wait':
        'trimite mesajul %msg tuturor si asteapta',
    'Message name':
        'Mesaj',
    'message':
        'mesaj',
    'any message':
        'orice mesaj',
    'wait %n secs':
        'asteapta %n secunde',
    'wait until %b':
        'asteapta pana cand %b',
    'forever %c':
        'la infinit %c',
    'repeat %n %c':
        'repeta de %n ori %c',
    'repeat until %b %c':
        'repeta pana cand %b %c',
    'if %b %c':
        'daca %b fa %c',
    'if %b %c else %c':
        'daca %b fa %c altfel fa %c',
    'report %s':
        'anunta %s',
    'stop %stopChoices':
        'opreste %stopChoices',
    'all':
        'toate',
    'this script':
        'acest script',
    'this block':
        'acest bloc',
    'stop %stopOthersChoices':
        'opreste %stopOthersChoices',
    'all but this script':
        'toate scripturile, mai putin pe acesta',
    'other scripts in sprite':
        'toate scripturile din animatie',
    'pause all %pause':
        'pune pauza pentru %pause',
    'run %cmdRing %inputs':
        'ruleaza %cmdRing cu %inputs',
    'launch %cmdRing %inputs':
        'porneste %cmdRing cu %inputs',
    'call %repRing %inputs':
        'apeleaza %repRing cu %inputs',
    'run %cmdRing w/continuation':
        'ruleaza %cmdRing cu Continuation',
    'call %cmdRing w/continuation':
        'apeleaza %cmdRing cu Continuation',
    'warp %c':
        'warp %c',
    'when I start as a clone':
        'cand sunt pornit ca o clona',
    'create a clone of %cln':
        'creaza o clona a %cln',
    'myself':
        'eu insumi',
    'delete this clone':
        'sterge aceasta clona',

    // sensing:
    'touching %col ?':
        'atinge %col ?',
    'touching %clr ?':
        'atinge %clr ?',
    'color %clr is touching %clr ?':
        'culoarea %clr atinge %clr ?',
    'ask %s and wait':
        'intreaba %s si asteapta',
    'what\'s your name?':
        'care e numele tau?',
    'answer':
        'raspuns',
    'mouse x':
        'pozitia x a mouseului',
    'mouse y':
        'pozitia y a mouseului',
    'mouse down?':
        'este mouseul apasat?',
    'key %key pressed?':
        'este tasta %key apasata?',
    'distance to %dst':
        'distanta pana la %dst',
    'reset timer':
        'restarteaza cronometrul',
    'timer':
        'cronometrul',
    '%att of %spr':
        '%att al %spr',
    'http:// %s':
        'http:// %s',
    'turbo mode?':
        'modul turbo?',
    'set turbo mode to %b':
        'seteaza modul turbo la %b',

    'filtered for %clr':
        'filtrat pentru %clr',
    'stack size':
        'marimea stivei',
    'frames':
        'cadre',

    // operators:
    '%n mod %n':
        '%n modulo %n',
    'round %n':
        '%n rotunjit',
    '%fun of %n':
        '%fun din %n',
    'pick random %n to %n':
        'alege aleator de la %n la %n',
    '%b and %b':
        '%b si %b',
    '%b or %b':
        '%b sau %b',
    'not %b':
        'not %b',
    'true':
        'adevarat',
    'false':
        'fals',
    'join %words':
        'lipeste %words',
    'split %s by %delim':
        'desparte %s folosind %delim',
    'hello':
        'salut',
    'world':
        'lume',
    'letter %n of %s':
        'litera %n din %s',
    'length of %s':
        'lungimea lui %s',
    'unicode of %s':
        'codul Unicode al %s',
    'unicode %n as letter':
        'codul Unicode %n ca litera',
    'is %s a %typ ?':
        'este %s un/o %typ ?',
    'is %s identical to %s ?':
        'este %s identic cu %s ?',

    'type of %s':
        'tipul lui %s',

    // variables:
    'Make a variable':
        'creaza o variabila',
    'Variable name':
        'numele variabilei',
    'Script variable name':
        'variabila script ',
    'Delete a variable':
        'sterge o variabila',

    'set %var to %s':
        'schimba %var in %s',
    'change %var by %n':
        'modifica %var cu %n',
    'show variable %var':
        'afiseaza variabila %var',
    'hide variable %var':
        'ascunde variabila %var',
    'script variables %scriptVars':
        'variabilele script %scriptVars',

    // lists:
    'list %exp':
        'lista %exp',
    '%s in front of %l':
        '%s in fata %l',
    'item %idx of %l':
        'elementul %idx din %l',
    'all but first of %l':
        'toate, mai putin primul din %l',
    'length of %l':
        'lungimea %l',
    '%l contains %s':
        '%l contine %s',
    'thing':
        'lucru',
    'add %s to %l':
        'adauga %s la %l',
    'delete %ida of %l':
        'sterge %ida din %l',
    'insert %s at %idx of %l':
        'adauga %s la pozitia %idx in %l',
    'replace item %idx of %l with %s':
        'inlocuieste elementul %idx din %l cu %s',

    // other
    'Make a block':
        'creaza bloc',

    // menus
    // snap menu
    'About...':
        'Despre Snap!...',
    'Reference manual':
        'Manual utilizator',
    'Snap! website':
        'Siteul Snap!',
    'Download source':
        'Descarca codul sursa',
    'Switch back to user mode':
        'Treci in modul utilizator',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'Afiseaza meniuri simplificate in locul celor morfice',
    'Switch to dev mode':
        'Treci in modul dezvoltator',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'Afiseaza meniuri morfice in locul celor simplificate',

    // project menu
    'Project notes...':
        'Note de proiect...',
    'New':
        'Nou',
    'Open...':
        'Deschide...',
    'Save':
        'Salveaza',
    'Save to disk':
        'Salveaza pe disc',
    'store this project\nin the downloads folder\n(in supporting browsers)':
        'Salveaza proiectul\nin meniul Descarcari\n(functie de browser)',
    'Save As...':
        'Salveaza sub numele...',
    'Import...':
        'Importa...',
    'file menu import hint':
        'indiciu import meniul fisiere',
    'Export project as plain text...':
        'Exporta proiectul ca text...',
    'Export project...':
        'Exporta proiectul...',
    'show project data as XML\nin a new browser window':
        'afiseaza continut proiect ca XML\nin fereastra noua de browser',
    'Export blocks...':
        'Exporta blocurile...',
    'show global custom block definitions as XML\nin a new browser window':
        ' afiseaza definitiile blocurilor ca XML\n intr-o fereastra noua de browser',
    'Unused blocks...':
          'Blocuri nefolosite...',
    'find unused global custom blocks\nand remove their definitions':
        'cauta blocuri utilizator nefolosite\nsi sterge-le',
    'Remove unused blocks':
        'Sterge blocurile nefolosite',
    'there are currently no unused\nglobal custom blocks in this project':
        'nu exista blocuri utilizator nefolosite\nin acest proiect',
    'unused block(s) removed':
        'blocuri nefolosite eliminate',
    'Export summary...':
        'Exporta sumarul...',
    'open a new browser browser window\n with a summary of this project':
        'Deschide o noua fereastra de browser\ncu sumarul acestui proiect',
    'Contents':
        'Continut',
    'Kind of':
        'De tipul',
    'Part of':
        'Parte din',
    'Parts':
        'Parti',
    'Blocks':
        'Blocuri',
    'For all Sprites':
        'Pentru toate animatiile',
    'Import tools':
        'Importa unelte',
    'load the official library of\npowerful blocks':
        'incarca biblioteca oficiala\nde blocuri importante',
    'Libraries...':
        'Biblioteci...',
    'Import library':
        'Importa biblioteca',

    // cloud menu
    'Login...':
        'Autentificare...',
    'Signup...':
        'Creaza-ti cont...',

    // settings menu
    'Language...':
        'Selecteaza limba...',
    'Zoom blocks...':
        'Marimeblocuri...',
    'Stage size...':
        'Marime scena...',
    'Stage size':
        'Marime scena',
    'Stage width':
        'Latime scena',
    'Stage height':
        'Inaltime scena',
    'Default':
        'Implicit',
    'Blurred shadows':
        'Umbre neclare',
    'uncheck to use solid drop\nshadows and highlights':
        'debifeaza pentru a utiliza\numbre clare si evidentieri',
    'check to use blurred drop\nshadows and highlights':
        'bifeaza pentru a utiliza\numbre neclare si evidentieri',
    'Zebra coloring':
        'Culoare zebra',
    'check to enable alternating\ncolors for nested blocks':
        'bifeaza pentru a folosi culori\nalternative in blocurile imbricate',
    'uncheck to disable alternating\ncolors for nested block':
        'debifeaza pentru a folosi culori\nobisnuite in blocurile imbricate',
    'Dynamic input labels':
        'Etichete intrare dinamice',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'debifeaza pentru a renunta la\netichete dinamice pentru intrari variabile',
    'check to enable dynamic\nlabels for variadic inputs':
        'difeaza pentru a folosi etichete\n dinamice pentru intrari variabile',
    'Prefer empty slot drops':
        'Foloseste slot drops goale',
    'settings menu prefer empty slots hint':
        'indicii de slot goale in meniul setari',
    'uncheck to allow dropped\nreporters to kick out others':
        'debifeaza pentru a folosi\nreporteri pentru a elimina altii',
    'Long form input dialog':
        'Dialoguri lungi',
    'Plain prototype labels':
        'Etichete simple',
    'uncheck to always show (+) symbols\nin block prototype labels':
        'debifeaza pentru a folosi (+) \nin blocurile eticheta',
    'check to hide (+) symbols\nin block prototype labels':
        'bifeaza pentru a ascunde (+) \nin blocurile eticheta',
    'check to always show slot\ntypes in the input dialog':
        'bifeaza pentru a afisa tipuri slot\N in dialoguri de intrare',
    'uncheck to use the input\ndialog in short form':
        'debifeaza pentru a afisa dialoguri\n de intrare in forma scurta',
    'Virtual keyboard':
        'Tastatura pe ecran',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'debifeaza pentru a ascunde\ntastatura de pe ecranul\nechipamentelor mobile',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'bifeaza pentru a afisa\ntastatura pe ecranul\nechipamentelor mobile',
    'Input sliders':
        'Slidere pentru intrare',
    'uncheck to disable\ninput sliders for\nentry fields':
        'debifeaza pentru a ascunde\nsliderele campurilor de intrare',
    'check to enable\ninput sliders for\nentry fields':
        'bifeaza pentru a afisa\nslidere in campurile de intrare',
    'Clicking sound':
        'Sunet la apasarea tastelor',
    'uncheck to turn\nblock clicking\nsound off':
        'debifeaza pentru a opri\nsunete la schimbarea blocurilor',
    'check to turn\nblock clicking\nsound on':
        'bifeaza pentru sunete\n la schimbare blocuri',
    'Animations':
        'Animatii',
    'uncheck to disable\nIDE animations':
        'debifeaza pentru a dezactiva\nanimatiile IDE',
    'Turbo mode':
        'Modul turbo',
    'check to prioritize\nscript execution':
        'bifeaza pentru a da prioritate\nexecutiei scripului',
    'uncheck to run scripts\nat normal speed':
        'debifeaza pentru a rula scripul\nla viteza normala',
    'check to enable\nIDE animations':
        'bifeaza pentru a activa\nanimatiile IDE',
    'Flat design':
        'Design cu colturi',
    'Keyboard Editing':
        'Editare tastatura',
    'Thread safe scripts':
        'Scripturi thread-safe',
    'uncheck to allow\nscript reentrance':
        'debifeaza pentru a permite\nreentranta in scripturi',
    'check to disallow\nscript reentrance':
        'bifeaza pentru a interzice\nreentranta in scripturi',
    'Prefer smooth animations':
        'Animatii fluide',
    'uncheck for greater speed\nat variable frame rates':
        'debifeaza pentru viteza mai mare\nin detrimentul afisarii pe ecran',
    'check for smooth, predictable\nanimations across computers':
        'bifeaza pentru afisare fluida pe ecran\n in detrimentul vitezei',
    'Flat line ends':
        'Sfarsit de linii cu colturi',
    'check for flat ends of lines':
        'bifeaza pentru sfarsit\nde linii cu colturi',
    'uncheck for round ends of lines':
        'debifeaza pentru sfarsit\nde linii rotunjite',
    'Inheritance support':
        'Suport pentru mostenire',

    // inputs
    'with inputs':
        'cu intrari',
    'input names:':
        'numele intrarii:',
    'Input Names:':
        'Numele intrarii:',
    'input list:':
        'lista intrare:',

    // context menus:
    'help':
        'ajutor',

    // palette:
    'hide primitives':
        'Ascunde primitivele',
    'show primitives':
        'Afiseaza primitivele',

    // blocks:
    'help...':
        'ajutor...',
    'relabel...':
        'redenumeste...',
    'duplicate':
        'duplica',
    'make a copy\nand pick it up':
        'fa o copie si selecteaz-o',
    'only duplicate this block':
        'duplica doar acest bloc',
    'delete':
        'sterge',
    'script pic...':
        'imagine script...',
    'open a new window\nwith a picture of this script':
        'deschide fereastra noua\ncu imaginea acestui script',
    'ringify':
        'ringify',
    'unringify':
        'unringify',

    // custom blocks:
    'delete block definition...':
        'sterge definitia blocului....',
    'edit...':
        'modifica...',

    // sprites:
    'edit':
        'modifica',
    'move':
        'muta',
    'detach from':
        'desparte',
    'detach all parts':
        'desparte toate bucatile',
    'export...':
        'exporta...',

    // stage:
    'show all':
        'afiseaza tot',
    'pic...':
        'imagine...',
    'open a new window\nwith a picture of the stage':
        'deschide o imagine a scenei\nintr-o fereastra noua',

    // scripting area
    'clean up':
        'curata',
    'arrange scripts\nvertically':
        'Afiseaza scripturile\nvertical',
    'add comment':
        'adauga comentariu',
    'undrop':
        'undrop',
    'undo the last\nblock drop\nin this pane':
        'renunta la ultimul drop\nde block in aceasta fereastra',
    'scripts pic...':
        'imagine scripturi...',
    'open a new window\nwith a picture of all scripts':
        'afiseaza imaginea scripturilor\nintr-o noua fereastra',
    'make a block...':
        'creaza bloc...',

    // costumes
    'rename':
        'redenumeste',
    'export':
        'exporta',
    'rename costume':
        'redenumeste costum',

    // sounds
    'Play sound':
        'Ruleaza sunet',
    'Stop sound':
        'Opreste sunet',
    'Stop':
        'Opreste',
    'Play':
        'Ruleaza',
    'rename sound':
        'redenumeste sunet',

    // dialogs
    // buttons
    'OK':
        'OK',
    'Ok':
        'OK',
    'Cancel':
        'Renunta',
    'Yes':
        'Da',
    'No':
        'Nu',

    // help
    'Help':
        'Ajutor',

    // zoom blocks
    'Zoom blocks':
        'Nivel zoom blocuri',
    'build':
        'build',
    'your own':
        'al tau',
    'blocks':
        'blocuri',
    'normal (1x)':
        'normal (1x)',
    'demo (1.2x)':
        'demonstratie (1.2x)',
    'presentation (1.4x)':
        'prezentare (1.4x)',
    'big (2x)':
        'mare (2x)',
    'huge (4x)':
        'enorm (4x)',
    'giant (8x)':
        'gigant (8x)',
    'monstrous (10x)':
        'monstruos (10x)',

    // Project Manager
    'Untitled':
        'fara nume',
    'Open Project':
        'Deschide proiect',
    '(empty)':
        '(gol)',
    'Saved!':
        'Salvat!',
    'Delete Project':
        'Sterge proiect',
    'Are you sure you want to delete':
        'Esti sigur ca vrei sa stergi?',
    'rename...':
        'redenumeste...',

    // costume editor
    'Costume Editor':
        'Modificare costume',
    'click or drag crosshairs to move the rotation center':
        'apasa mouseul sau trage de cursor pentru a muta centrul de rotatie',

    // project notes
    'Project Notes':
        'Note de proiect',

    // new project
    'New Project':
        'Proiect nou',
    'Replace the current project with a new one?':
        'Inlocuieste proiectul cu un altul?',

    // save project
    'Save Project As...':
        'Salveaza proiectul sub alt nume...',

    // export blocks
    'Export blocks':
        'Exporta blocurile',
    'Import blocks':
        'Importa blocurile',
    'this project doesn\'t have any\ncustom global blocks yet':
        'acest proiect nu are\nblocuri globale',
    'select':
        'selecteaza',
    'none':
        'nici un/o',

    // variable dialog
    'for all sprites':
        'pentru toate animatiile',
    'for this sprite only':
        'doar pentru aceasta animatie',

    // block dialog
    'Change block':
        'Schimba blocul',
    'Command':
        'Comanda',
    'Reporter':
        'Reporter',
    'Predicate':
        'Predicat',

    // block editor
    'Block Editor':
        'Editor de blocuri',
    'Apply':
        'Aplica actiunea',

    // block deletion dialog
    'Delete Custom Block':
        'Sterge blocul utilizator',
    'block deletion dialog text':
        'textul pentru stergerea unui bloc',

    // input dialog
    'Create input name':
        'Creaza nume',
    'Edit input name':
        'Schimba nume',
    'Edit label fragment':
        'Schimba eticheta',
    'Title text':
        'Text titlu',
    'Input name':
        'Nume',
    'Delete':
        'Sterge',
    'Object':
        'Obiect',
    'Number':
        'Nume',
    'Text':
        'Text',
    'List':
        'Lista',
    'Any type':
        'Orice tip',
    'Boolean (T/F)':
        'Boolean (Adevarat/Fals)',
    'Command\n(inline)':
        'Comanda\n(pe acelasi rand)',
    'Command\n(C-shape)':
        'Comanda\n(in forma de C)',
    'Any\n(unevaluated)':
        'Orice\n(necalculat)',
    'Boolean\n(unevaluated)':
        'Boolean\n(necalculat)',
    'Single input.':
        'Intrare.',
    'Default Value:':
        'Valoare implicita:',
    'Multiple inputs (value is list of inputs)':
        'Intrari multiple (dintr-o lista)',
    'Upvar - make internal variable visible to caller':
        'Fa variabilele locale vizibile blocului chemator',

    // About Snap
    'About Snap':
        'Despre Snap',
    'Back...':
        'Inapoi...',
    'License...':
        'Licenta...',
    'Modules...':
        'Componente...',
    'Credits...':
        'Multumiri...',
    'Translators...':
        'Traducatori',
    'License':
        'Licenta',
    'current module versions:':
        'versiuni componente:',
    'Contributors':
        'Contribuitori',
    'Translations':
        'Traduceri',

    // variable watchers
    'normal':
        'normal',
    'large':
        'mare',
    'slider':
        'slider',
    'slider min...':
        'slider minim...',
    'slider max...':
        'slider maxim...',
    'import...':
        'importa...',
    'Slider minimum value':
        'Valoare minima slidere',
    'Slider maximum value':
        'Valoare maxima slidere',

    // list watchers
    'length: ':
        'lungime: ',

    // coments
    'add comment here...':
        'adauga comentariu...',

    // drow downs
    // directions
    '(90) right':
        '(90) dreapta',
    '(-90) left':
        '(-90) stanga',
    '(0) up':
        '(0) sus',
    '(180) down':
        '(180) jos',

    // collision detection
    'mouse-pointer':
        'cursor mouse',
    'edge':
        'margine',
    'pen trails':
        'urme stilou',

    // costumes
    'Turtle':
        'Broasca',
    'Empty':
        'Gol',

    // graphical effects
    'brightness':
        'luminozitate',
    'ghost':
        'umbra',
    'negative':
        'negativ',
    'comic':
        'glumet',
    'confetti':
        'contetti',

    // keys
    'space':
        'spatiu',
    'up arrow':
        'sageata sus',
    'down arrow':
        'sageata jos',
    'right arrow':
        'sageata dreapta',
    'left arrow':
        'sageata stanga',
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
        'nou...',

    // math functions
    'abs':
        'val absoluta',
    'ceiling':
        'rotunjire in sus',
    'floor':
        'rotunjire in jos',
    'sqrt':
        'radical',
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
        'litera',
    'whitespace':
        'spatiu',
    'line':
        'linie',
    'tab':
        'tab',
    'cr':
        'enter',

    // data types
    'number':
        'numar',
    'text':
        'test',
    'Boolean':
        'boolean',
    'list':
        'lista',
    'command':
        'comanda',
    'reporter':
        'reporter',
    'predicate':
        'predicat',

    // list indices
    'last':
        'ultimul',
    'any':
        'oricare'
};
