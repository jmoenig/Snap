/*

	lang-cs.js

	Czech translation for SNAP!

	written by Michal Moc

	Copyright (C) 2012 by Michal Moc

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

SnapTranslator.dict.cs = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    Ä, ä   \u00c4, \u00e4
    Ö, ö   \u00d6, \u00f6
    Ü, ü   \u00dc, \u00fc
    ß      \u00df
*/

    // translations meta information
    'language_name':
        'Česky', // the name as it should appear in the language menu
    'language_translator':
        'Michal Moc, Jan Tomsa', // your name for the Translators tab
    'translator_e-mail':
        'info@iguru.eu, jan.tomsa.1976@gmail.com', // optional
    'last_changed':
        '2015-11-16', // this, too, will appear in the Translators tab

    // GUI
    // control bar:
    'untitled':
        'Bez názvu',
    'development mode':
        'Vývojový mód',

    // categories:
    'Motion':
        'Pohyb',
    'Looks':
        'Vzhled',
    'Sound':
        'Zvuk',
    'Pen':
        'Pero',
    'Control':
        'Ovládání',
    'Sensing':
        'Vnímání',
    'Operators':
        'Operátory',
    'Variables':
        'Proměnné',
    'Lists':
        'Seznamy',
    'Other':
        'Ostatní',

    // editor:
    'draggable':
        'přetahovatelný',

    // tabs:
    'Scripts':
        'Skripty',
    'Costumes':
        'Kostýmy',
    'Sounds':
        'Zvuky',

    // names:
    'Sprite':
        'Sprite',
    'Stage':
        'Scéna',

    // rotation styles:
    'don\'t rotate':
        'neotáčet',
    'can rotate':
        'lze otočit',
    'only face left/right':
        'jen vlevo/vpravo',

    // new sprite button:
    'add a new sprite':
        'přidat nový sprite',
    'add a new Turtle sprite':
        'přidat nový sprite želvy',

    // tab help
    'costumes tab help':
        'Nahrajte obrázek odjinud z webu\n'
            + 'nebo nahrajte soubor z Vašeho počítače přetažením sem.',
    'import a sound from your computer\nby dragging it into here':
        'Nahrajte zvuk z Vašeho počítače přetažením sem.',

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
        'Vybraná scéna:'
            + 'žádné pohybové bloky',

    'move %n steps':
        'posuň se o %n kroků',
    'turn %clockwise %n degrees':
        'otoč se o %clockwise %n stupňů',
    'turn %counterclockwise %n degrees':
        'otoč se o %counterclockwise %n stupňů',
    'point in direction %dir':
        'zamiř směrem %dir',
    'point towards %dst':
        'zamiř k %dst',
    'go to x: %n y: %n':
        'jdi na pozici x: %n y: %n',
    'go to %dst':
        'jdi na %dst',
    'glide %n secs to x: %n y: %n':
        'plachti %n sekund na pozici x: %n y: %n',
    'change x by %n':
        'změň x o %n',
    'set x to %n':
        'nastav x na %n',
    'change y by %n':
        'změň y o %n',
    'set y to %n':
        'nastav y na %n',
    'if on edge, bounce':
        'pokud narazíš na okraj, odskoč',
    'x position':
        'pozice x',
    'y position':
        'pozice y',
    'direction':
        'směr',

    // looks:
    'switch to costume %cst':
        'oblékni kostým %cst',
    'next costume':
        'další kostým',
    'costume #':
        'kostým číslo',
    'say %s for %n secs':
        'povídej %s příštích %n sekund',
    'say %s':
        'povídej %s',
    'think %s for %n secs':
        'pomysli si %s dalších %n sekund',
    'think %s':
        'pomysli si %s',
    'Hello!':
        'Ahoj!',
    'Hmm...':
        'Hmm...',
    'change %eff effect by %n':
        'změň efekt %eff o %n',
    'set %eff effect to %n':
        'nastav efekt %eff na %n',
    'clear graphic effects':
        'odstraň grafické efekty',
    'change size by %n':
        'změň velikost o %n',
    'set size to %n %':
        'změň velikost na %n %',
    'size':
        'velikost',
    'show':
        'ukaž se',
    'hide':
        'schovej se',
    'go to front':
        'jdi do popředí',
    'go back %n layers':
        'jdi do pozadí o %n úrovní',
    'development mode \ndebugging primitives:':
        'vývojový mód \nladění primitiv',
    'console log %mult%s':
        'výstup do konsole: %mult%s',
    'alert %mult%s':
        'Upozornění: %mult%s',

    // sound:
    'play sound %snd':
        'hraj zvuk %snd',
    'play sound %snd until done':
        'hraj zvuk %snd a počkej',
    'stop all sounds':
        'vypni všechny zvuky',
    'rest for %n beats':
            'pauza %n dob(y)',
        'play note %n for %n beats':
            'zahraj tón %n po %n dob(y)',
        'change tempo by %n':
            'změň tempo o %n',
        'set tempo to %n bpm':
            'nastav tempo na %n bpm.',
        'tempo':
            'tempo',

    // pen:
    'clear':
        'smaž',
    'pen down':
        'pero dolů',
    'pen up':
        'pero nahoru',
    'set pen color to %clr':
        'nastavit barvu pera na %clr',
    'change pen color by %n':
        'změň barvu pera o %n',
    'set pen color to %n':
        'nastav barvu pera na %n',
    'change pen shade by %n':
        'změň odstín pera o %n',
    'set pen shade to %n':
        'nastav odstín pera na %n',
    'change pen size by %n':
        'změň tloušťku pera o %n',
    'set pen size to %n':
        'nastav tloušťku pera na %n',
    'stamp':
        'razítko',

    // control:
    'when %greenflag clicked':
        'Po klepnutí na %greenflag',
    'when %keyHat key pressed':
        'po stisku klávesy %keyHat',
    'when I am %interaction':
        'když %interaction',
    'clicked':
        'na mě kliknou',
    'pressed':
        'mě stisknou',
    'dropped':
        'mě upustí',
    'mouse-entered':
        'na mě najede myš',
    'mouse-departed':
        'ze mě sjede myš',
    'when I receive %msgHat':
        'po přijetí zprávy %msgHat',
    'broadcast %msg':
        'poslat všem %msg',
    'broadcast %msg and wait':
        'poslat všem %msg a čekat',
    'Message name':
        'název zprávy',
    'message':
        'zpráva',
    'any message':
        'jakákoli zpráva',
    'wait %n secs':
        'čekej %n sekund',
    'wait until %b':
        'čekej dokud nenastane %b',
    'forever %loop':
        'stále opakuj %loop',
    'repeat %n %loop':
        'opakuj %n krát %loop',
    'repeat until %b %loop':
        'opakuj dokud nenastane %b %loop',
    'if %b %c':
        'když %b %c',
    'if %b %c else %c':
        'když %b %c jinak %c',
    'report %s':
        'vrátit %s',
    'stop %stopChoices':
        'stop %stopChoices',
    'all':
        'vše',
    'this script':
        'tento skript',
    'this block':
        'tento blok',
    'stop %stopOthersChoices':
        'stop %stopOthersChoices',
    'run %cmdRing %inputs':
        'spusť %cmdRing %inputs',
    'launch %cmdRing %inputs':
        'zahájit %cmdRing %inputs',
    'call %repRing %inputs':
        'zavolat %repRing %inputs',
    'run %cmdRing w/continuation':
        'spustit %cmdRing s pokračováním',
    'call %cmdRing w/continuation':
        'zavolat %cmdRing s pokračováním',
    'warp %c':
        'obal %c',
    'when I start as a clone':
        'začít po naklonování',
    'create a clone of %cln':
        'vytvořit klon %cln',
    'myself':
        'sama sebe',
    'delete this clone':
        'odstranit klon',
    'all but this script':
        'vše kromě tohoto skriptu',
    'other scripts in sprite':
        'ostatní skripty tohoto objektu',
    'pause all %pause':
        'zastavit vše %pause',


    // sensing:
    'touching %col ?':
        'dotýká se %col ?',
    'touching %clr ?':
        'dotýká se barvy %clr ?',
    'color %clr is touching %clr ?':
        'barva %clr je na barvě %clr ?',
    'ask %s and wait':
        'zeptej se %s a čekej',
    'what\'s your name?':
        'Jak se jmenuješ?',
    'answer':
        'odpověď',
    'mouse x':
        'souřadnice myši x',
    'mouse y':
        'souřadnice myši y',
    'mouse down?':
        'stisknuto tlačítko myši?',
    'key %key pressed?':
        'stisknuta klávesa %key ?',
    'distance to %dst':
        'vzdálenost od %dst',
    'reset timer':
        'vynulovat stopky',
    'timer':
        'stopky',
    '%att of %spr':
        '%att z %spr',
    'http:// %s':
        'http:// %s',
    'turbo mode?':
        'turbo mód?',
    'set turbo mode to %b':
        'nastavit turbo mód na %b',
    'current %dates':
        'aktuální %dates',
            'year' : 'rok',
            'month' : 'měsíc',
            'date' : 'datum',
            'day of week' : 'den v týdnu',
            'hour' : 'hodina',
            'minute' : 'minuta',
            'second' : 'sekunda',
            'time in milliseconds' : 'čas v milisekundách',

    'filtered for %clr':
        'filtrovaný pro %clr',
    'stack size':
        'velikost zásobníku',
    'frames':
        'snímky',

    // operators:
    '%n mod %n':
        '%n modulo %n',
    'round %n':
        'zaokrouhli %n',
    '%fun of %n':
        '%fun z %n',
    'pick random %n to %n':
        'zvol náhodné číslo od %n do %n',
    '%b and %b':
        '%b a %b',
    '%b or %b':
        '%b nebo %b',
    'not %b':
        'není %b',
    'true':
        'pravda',
    'false':
        'nepravda',
    'join %words':
        'spoj %words',
    'hello':
        'ahoj',
    'world':
        'světe',
    'split %s by %delim':
        'rozděl %s podle %delim',
    'letter %idx of %s':
        'písmeno %idx z %s',
    'length of %s':
        'délka %s',
    'unicode of %s':
        'Unicode %s',
    'unicode %n as letter':
        'Unicode %n jako znak',
    'is %s a %typ ?':
        'je %s typu %typ ?',
    'is %s identical to %s ?':
        'je %s stejný jako %s ?',

    'type of %s':
        'Typ %s',

    // variables:
    'Make a variable':
        'Vytvoř proměnnou',
    'Variable name':
        'Jméno proměnné',
    'Script variable name':
        'Jméno skriptové proměnné',
    'Delete a variable':
        'Smaž proměnnou',

    'set %var to %s':
        'nastav %var na %s',
    'change %var by %n':
        'změň %var o %n',
    'show variable %var':
        'ukaž proměnnou %var',
    'hide variable %var':
        'schovej proměnnou %var',
    'script variables %scriptVars':
        'Vytvoř skriptové proměnné %scriptVars',

    // lists:
    'list %exp':
        'seznam %exp',
    '%s in front of %l':
        '%s na začátek %l',
    'item %idx of %l':
        'položka %idx z %l',
    'all but first of %l':
        'vše kromě první položky z %l',
    'length of %l':
        'délka %l',
    '%l contains %s':
        '%l obsahuje %s',
    'thing':
        'věc',
    'add %s to %l':
        'přidat %s do %l',
    'delete %ida of %l':
        'smazat %ida z %l',
    'insert %s at %idx of %l':
        'vložit %s na %idx pozici v %l',
    'replace item %idx of %l with %s':
        'nahraď položku %idx v %l hodnotou %s',

    // other
    'Make a block':
        'Vytvoř blok',

    // menus
    // snap menu
    'About...':
        'O programu...',
    'Snap! website':
        'Stránky Snap!',
    'Download source':
        'Stáhnout zdrojové kódy',
    'Switch back to user mode':
        'přepnout zpět do uživatelského módu',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'zobrazovat jednoduché menu',
    'Switch to dev mode':
        'přepnout do vývojářského módu',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'zobrazovat pokročilé menu',
    'Reference manual':
        'Referenční příručka',

    // project menu
    'Project notes...':
        'Poznámky k projektu...',
    'New':
        'Nový',
    'Open...':
        'Otevřít...',
    'Save':
        'Uložit',
    'Save As...':
        'Uložit jako...',
    'Import...':
        'Importovat...',
    'file menu import hint':
        'Načíst exportovaný projekt, '
            + 'knihovnu bloků, kostýmy nebo zvuky',
    'Export project as plain text...':
        'Exportovat projekt jako prostý text...',
    'Export project...':
        'Exportovat projekt...',
    'show project data as XML\nin a new browser window':
        'zobrazit data projektu jako xml  XML\n v novém okně prohlížeče',
    'Export blocks...':
        'Exportovat bloky...',
    'show global custom block definitions as XML\nin a new browser window':
        'Zobrazit definici vlastních bloků jako\nXML v novém okně prohlížeče',
    'Import tools':
        'Importovat nástroje',
    'load the official library of\npowerful blocks':
        'nahraje oficialní knihovnu\npokročilých bloků',
    'Libraries...':
        'Knihovny...',
    'Import library':
        'Importovat knihovnu',
        
	  'Select a costume from the media library':
		    'Vyberte kostým z knihovny médií',
    'Select a sound from the media library':
        'Vyberte si zvuk z knihovny médií',

    // cloud menu
    'Login...':
        'Přihlásit...',
    'Signup...':
        'Vytvořit účet...',
    'Reset Password...':
        'Resetovat heslo...',

    'Sign in':
        'Přihlásit se',
    'User name:':
        'Uživatelské jméno:',
    'Password:':
        'Heslo:',
    'stay signed in on this computer\nuntil logging out':
        'zůstaň přihlášen na tomto počítači\naž do odhlášení',
    'Reset password':
        'Resetuj heslo',
    'Sign up':
        'Vytvořit účet',
    'Birth date:':
        'Datum narození:',
    'year:':
        'rok:',
    'E-mail address:':
        'E-mailová adresa:',
    'E-mail address of parent or guardian:':
        'E-mailová adresa rodiče či opatrovníka:',
    'Terms of Service...':
        'Podmínky služby...',
    'Privacy...':
        'Politika soukromí...',
    'I have read and agree\nto the Terms of Service':
        'Četl jsem a souhlasím s podímkami služby',
    'January':
        'leden',
    'February':
        'únor',
    'March':
        'březen',
    'April':
        'duben',
    'May':
        'květen',
    'June':
        'červen',
    'July':
        'červenec',
    'August':
        'srpen',
    'September':
        'září',
    'October':
        'říjen',
    'November':
        'listopad',
    'December':
        'prosinec',
    'please fill out\nthis field':
        'prosím vyplňte\ntoto pole',
    'please agree to\nthe TOS':
        'prosím zaškrtněte souhlas\ns Podmínkami služby',
    'User name must be four\ncharacters or longer':
        'Uživatelské jméno musí být\ndlouhé alespoň čtyři znaky.',
    'please provide a valid\nemail address':
        'Zadejte, prosím, platnou emailovou adresu.',
    'password must be six\ncharacters or longer':
        'Heslo musí být dlouhé\nalespoň šest znaků.',
    'passwords do\nnot match':
        'Hesla se neshodují.',
                        
    // settings menu
    'Language...':
        'Jazyk...',
    'Zoom blocks...':
        'Velikost bloků...',
    'Stage size...':
        'Velikost scény...',
    'Stage size':
        'Velikost scény',
    'Stage width':
        'Šířka scény',
    'Stage height':
        'Výška scény',
    'Blurred shadows':
        'Měkké stíny',
    'uncheck to use solid drop\nshadows and highlights':
        'odškrtnutím se použijí\nostré stíny a světla',
    'check to use blurred drop\nshadows and highlights':
        'zaškrtni pro použití \nměkkých stínů a světel',
    'Zebra coloring':
        'Střídavé barvy',
    'check to enable alternating\ncolors for nested blocks':
        'Zaškrtnutí zapne střídavé\nbarvy pro vložené bloky',
    'uncheck to disable alternating\ncolors for nested block':
        'Odškrtnutí zruší použití střídavých barev pro vložené bloky',
    'Prefer empty slot drops':
        'Preferovat prázdný slot pro puštění',
    'settings menu prefer empty slots hint':
        'Zaškrtnutím bude preferováno prázdné místo na umístění',
    'uncheck to allow dropped\nreporters to kick out others':
        'odškrtnutím bude upřednostňováno nahrazení celé podmínky',
    'Long form input dialog':
        'Velké formuláře',
    'check to always show slot\ntypes in the input dialog':
        'Zaškrtnutím povolit zobrazování typů slotů ve vstupním dialogu',
    'uncheck to use the input\ndialog in short form':
        'odškrtnutí použije vstupní dialogy v krátké formě',
    'Plain prototype labels':
        'Prosté nadpisy prototypů',
    'uncheck to always show (+) symbols\nin block prototype labels':
        'odškrtněte pro používání symbolů (+) v editoru bloků',
    'check to hide (+) symbols\nin block prototype labels':
        'zaškrtněte pro skrytí symbolů (+) v editoru bloků',
    'Virtual keyboard':
        'Virtuální klávesnice',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'odškrtnutí zakáže\npodporu virtuální klávesnice\n'
            + 'na mobilních zařízeních',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'zaškrtnutí povolí použití virtuální klávesnice\nna mobilních zařízeních',
    'Input sliders':
        'Posuvníky',
    'uncheck to disable\ninput sliders for\nentry fields':
        'odškrtnutí vypne použití posuvníků pro vstupní pole',
    'check to enable\ninput sliders for\nentry fields':
        'zaškrtnutní povolí použití posuvníků pro vstupní pole',
    'Clicking sound':
        'Zvuk kliknutí',
    'uncheck to turn\nblock clicking\nsound off':
        'odškrtnutí vypne zvuk při přicvaknutí bloku',
    'check to turn\nblock clicking\nsound on':
        'zaškrtnutí zapne zvuk přicvaknutí bloku',
    'Thread safe scripts':
        'Vláknově bezpečné skripty',
    'uncheck to allow\nscript reentrance':
        'odškrtnutí povolí více vláken',
    'check to disallow\nscript reentrance':
        'zaškrtnutí zakáže více vláken',
    'Turbo mode':
        'Turbo mód',
    'uncheck to run scripts\nat normal speed':
        'odškrtnutí spustí skript\nnormální rychlostí',
    'check to prioritize\nscript execution':
        'zaškrtnutí spustí skripty\nzvýšenou rychlostí',
    'Flat design':
        'Plochý design',
    'check for alternative\nGUI design':
        'zaškrtněte pro alternativní design GUI',
    'uncheck for default\nGUI design':
        'odškrtněte pro výchozí design GUI',
    'Keyboard Editing':
        'Editace klávesnicí',
    'uncheck to disable\nkeyboard editing support':
        'odškrtněte pro vypnutí podpory editace klávesnicí',
    'check to enable\nkeyboard editing support':
        'zaškrtněte pro podporu editace klávesnicí',
    'Prefer smooth animations':
        'Zapnout plynulou animaci',
    'uncheck for greater speed\nat variable frame rates':
        'odškrtněte pro vyšší rychlost',
    'check for smooth, predictable\nanimations across computers':
        'zaškrtněte pro plynulé, předvídatelné\nanimace napříč počítači',
    'Flat line ends':
        'Ploché konce čar',
    'check for flat ends of lines':
        'zaškrtněte pro ploché konce čar',
    'uncheck for round ends of lines':
        'odškrtněte pro zakulacené konce čar',
    'Codification support':
        'Podpora kodifikace',
    'uncheck to disable\nblock to text mapping features':
        'odškrtněte pro vypnutí funkcí\nmapování bloků na text',
    'check for block\nto text mapping features':
        'zaškrtněte pro funkce\nmapování bloků na text',
    'Inheritance support':
        'Podpora dědičnosti',
    'uncheck to disable\nsprite inheritance features':
        'odškrtněte pro vypnutí funkcí\ndědičnosti spritů',
    'check for sprite\ninheritance features':
        'zaškrtněte pro funkce\ndědičnosti spritů',

    // inputs
    'with inputs':
        's položkami',
    'input names:':
        'proměnné:',
    'Input Names:':
        'Proměnné:',

    // context menus:
    'help':
        'nápověda',

    // blocks:
    'help...':
        'nápověda...',
    'relabel...':
            'Zaměnit blok za...',
    'duplicate':
        'kopírovat',
    'make a copy\nand pick it up':
        'vytvořit kopii a držet ji',
    'only duplicate this block':
            'kopírovat pouze tento blok',
    'delete':
        'smazat',
    'script pic...':
        'obrázek skriptu...',
    'open a new window\nwith a picture of this script':
        'otevřít nové okno\ns obrázkem tohoto skriptu',
    'ringify':
        'obalit',
    'unringify':
        'zrušit zabalení',

    // custom blocks:
    'delete block definition...':
        'smazat definici bloku',
    'edit...':
        'upravit...',

    // sprites:
    'edit':
        'upravit',
    'move':
        'přesunout',
    'export...':
        'export...',
    'paint a new sprite':
        'nakreslit nový sprite',

      // stage:
    'show all':
        'Zobrazit vše',

    // scripting area
    'clean up':
        'Srovnat',
    'arrange scripts\nvertically':
        'zarovnat skripty vertikálně',
    'add comment':
        'přidat komentář',
    'make a block...':
        'vytvořit blok...',

    // costumes
    'rename':
        'přejmenovat',
    'export':
        'exportovat',
    'rename costume':
        'přejmenovat kostým',
    'Paint a new costume':
        'Nakresli nový kostým',

    // sounds
    'Play sound':
        'spustit přehrávání',
    'Stop sound':
        'zastavit přehrávání',
    'Stop':
        'zastavit',
    'Play':
        'spustit',
    'rename sound':
        'přejmenovat zvuk',

    // dialogs
    // buttons
    'OK':
        'OK',
    'Ok':
        'OK',
    'Cancel':
        'Zrušit',
    'Yes':
        'Ano',
    'No':
        'Ne',

    // help
    'Help':
        'Nápověda',

    // zoom blocks
    'Zoom blocks':
        'Velikost bloků',
    'build':
        'vytvoř si',
    'your own':
        'své vlastní',
    'blocks':
        'bloky',
    'normal (1x)':
        'normální (1x)',
    'demo (1.2x)':
        'demo (1.2x)',
    'presentation (1.4x)':
        'prezentace (1.4x)',
    'big (2x)':
        'velké (2x)',
    'huge (4x)':
        'obrovské (4x)',
    'giant (8x)':
        'gigantické (8x)',
    'monstrous (10x)':
        'monstrózní (10x)',

    // Project Manager
    'Untitled':
        'Nepojmenovaný',
    'Open Project':
        'Otevřít projekt',
    '(empty)':
        '(prázdný)',
    'Saved!':
        'Uloženo!',
    'Delete Project':
        'Smazat projekt',
    'Are you sure you want to delete':
        'Jste si jisti, že chcete projekt smazat?',
    'rename...':
        'přejmenovat...',

    // costume editor
    'Costume Editor':
        'Editor kostýmů',
    'click or drag crosshairs to move the rotation center':
        'klikni nebo přetáhni kříž pro přesunutí centra otáčení',

    // project notes
    'Project Notes':
        'Poznámky k projektu',

    // new project
    'New Project':
        'Nový projekt',
    'Replace the current project with a new one?':
        'Nahradit stávající projekt novým?',

    // save project
    'Save Project As...':
        'Uložit projekt jako...',

    // export blocks
    'Export blocks':
        'Export bloků',
    'this project doesn\'t have any\ncustom global blocks yet':
        'Tento projekt nyní nemá žádné globální bloky',
    'select':
        'vybrat',
    'all':
        'vše',
    'none':
        'nic',

    // variable dialog
    'for all sprites':
        'pro všechny sprite',
    'for this sprite only':
        'pouze pro tento sprite',

    // block dialog
    'Change block':
        'Změnit blok',
    'Command':
        'Příkaz',
    'Reporter':
        'Funkce',
    'Predicate':
        'Podmínka',

    // block editor
    'Block Editor':
        'Editor bloků',
    'Apply':
        'Použít',

    // block deletion dialog
    'Delete Custom Block':
        'smazat vlastní blok',
    'block deletion dialog text':
        'Smazáním tohoto bloku se odstraní všechna jeho použití.\n' +
            'Opravdu chcete tento blok smazat?',

    // input dialog
    'Create input name':
        'Vytvořit vstup',
    'Edit input name':
        'Upravit vstup',
    'Edit label fragment':
        'Upravit nápis',
    'Title text':
        'Nadpis',
    'Input name':
        'Vstup',
    'Delete':
        'Smazat',
    'Object':
        'Objekt',
    'Number':
        'Číslo',
    'Text':
        'Text',
    'List':
        'Seznam',
    'Any type':
        'Libovolný',
    'Boolean (T/F)':
        'Boolean (P/N)',
    'Command\n(inline)':
        'Příkaz\n(vnořený)',
    'Command\n(C-shape)':
        'Příkaz\n(C-tvar)',
    'Any\n(unevaluated)':
        'Cokoliv\n(nevyhodnoceno)',
    'Boolean\n(unevaluated)':
        'Boolean\n(nevyhodnoceno)',
    'Single input.':
        'Jednoduchý vstup.',
    'Default Value:':
        'Výchozí hodnota:',
    'Multiple inputs (value is list of inputs)':
        'Více vstupů (hodnoty v seznamu)',
    'Upvar - make internal variable visible to caller':
        'Vnitřní proměnná viditelná pro volání',

    // About Snap
    'About Snap':
        'O programu Snap',
    'Back...':
        'Zpět...',
    'License...':
        'Licence...',
    'Modules...':
        'Moduly...',
    'Credits...':
        'Přispěvatelé...',
    'Translators...':
        'Překladatelé',
    'License':
        'Licence',
    'current module versions:':
        'aktuální verze modulů:',
    'Contributors':
        'Přispěvatelé',
    'Translations':
        'Překlady',

    // variable watchers
    'normal':
        'normální',
    'large':
        'velký',
    'slider':
        'posuvník',
    'slider min...':
        'minimum...',
    'slider max...':
        'maximum...',
    'Slider minimum value':
        'minimální hodnota posuvníku',
    'Slider maximum value':
        'Maximální hodnota posuvníku',

    // list watchers
    'length: ':
        'délka: ',

    // coments
    'add comment here...':
        'přidat sem komentář...',

    // drow downs
    // directions
    '(90) right':
        '(90) doprava',
    '(-90) left':
        '(-90) doleva',
    '(0) up':
        '(0) nahoru',
    '(180) down':
        '(180) dolů',

    // collision detection
    'mouse-pointer':
        'kurzor myši',
    'edge':
        'okraj',
    'pen trails':
        'stopa pera',

    // costumes
    'Turtle':
        'želva',

    // graphical effects
    'brightness':
        'jas',
    'ghost':
        'duch',
    'negative':
        'negativ',
    'comic':
        'moaré',
    'confetti':
        'barevnost',


    // keys
    'space':
        'mezerník',
    'up arrow':
        'šipka nahoru',
    'down arrow':
        'šipka dolů',
    'right arrow':
        'šipka doprava',
    'left arrow':
        'šipka doleva',
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
        'Nový...',

    // math functions
    'abs':
        'absolutní hodnota',
    'ceiling':
        'zaokrouhlit nahoru',
    'floor':
        'zaokrouhlit dolů',
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

    // data types
    'number':
        'číslo',
    'text':
        'text',
    'Boolean':
        'boolean',
    'list':
        'seznam',
    'command':
        'blok příkazů',
    'reporter':
        'blok funkcí',
    'predicate':
        'podmínky',

    // list indices
    'last':
        'poslední',
    'any':
        'kterákoli'
};
