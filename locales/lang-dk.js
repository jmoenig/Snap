/*

    lang-dk.js

    German translation for SNAP!

    written by FAB

    Copyright (C) 2013 by FAB

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

SnapTranslator.dict.dk = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    €, Š   \u00c4, \u00e4
    …, š   \u00d6, \u00f6
    †, Ÿ   \u00dc, \u00fc
    §      \u00df
    Æ,æ  	\u00C6,\u00E6
    Ø,ø	\u00D8,\u00F8
    Å,å	\u00C5,\u00E5

*/

    // translations meta information
    'language_name':
        'Dansk', // the name as it should appear in the language menu
    'language_translator':
        'FAB', // your name for the Translators tab
    'translator_e-mail':
        'fab@nielsen.mail.dk', // optional
    'last_changed':
        '2013-09-16', // this, too, will appear in the Translators tab

    // GUI
    // control bar:
    'untitled':
        'unavngivet',
    'development mode':
        'udviklertilstand',

    // categories:
    'Motion':
        'Bev\u00E6gelse',
    'Looks':
        'Udseender',
    'Sound':
        'Lyd',
    'Pen':
        'Pensel',
    'Control':
        'Kontrol',
    'Sensing':
        'Sensorer',
    'Operators':
        'Operationer',
    'Variables':
        'Variabler',
    'Lists':
        'H\u00F8relse',
    'Other':
        'Andet',

    // editor:
    'draggable':
        'tr\u00E6kbar',

    // tabs:
    'Scripts':
        'Programmer',
    'Costumes':
        'Udseender',
    'Sounds':
        'Lyde',

    // names:
    'Sprite':
        'Figur',
    'Stage':
        'Stadie',

    // rotation styles:
    'don\'t rotate':
        'Ingen rotation',
    'can rotate':
        'Fri rotation',
    'only face left/right':
        'Drej kun mod h\u00F8jre/venstre',

    // new sprite button:
    'add a new Sprite':
        'Tilf\u00F8j en ny figur',

    // tab help
    'costumes tab help':
        'Importer et billede fra din computer\n'
            + 'ved at tr\u00E6kke det her hen',
    'import a sound from your computer\nby dragging it into here':
        'Importer en lyd fra din computer ved at tr\u00E6kke den her hen',

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
        'B\u00fchne ausgew\u00e4hlt:\nkeine Standardbewegungsbl\u00f6cke\n'
            + 'vorhanden',

    'move %n steps':
        'Flyt %n trin',
    'turn %clockwise %n degrees':
        'Drej %clockwise %n grader',
    'turn %counterclockwise %n degrees':
        'Drej %counterclockwise %n grader',
    'point in direction %dir':
        'Skift retning %dir',
    'point towards %dst':
        'Se mod %dst',
    'go to x: %n y: %n':
        'G\u00E5 til x: %n y: %n',
    'go to %dst':
        'G\u00E5 til %dst',
    'glide %n secs to x: %n y: %n':
        'Bev\u00E6g dig %n sek. til x: %n y: %n',
    'change x by %n':
        'L\u00E6g %n til x',
    'set x to %n':
        'S\u00E6t x til %n',
    'change y by %n':
        'L\u00E6g %n til y',
    'set y to %n':
        'S\u00E6t y til %n',
    'if on edge, bounce':
        'Undvig v\u00E6g',
    'x position':
        'x-position',
    'y position':
        'y-position',
    'direction':
        'Retning',

    // looks:
    'switch to costume %cst':
        'Skift til udseende %cst',
    'next costume':
        'N\u00E6ste udseende',
    'costume #':
        'Udseende nr.',
    'say %s for %n secs':
        'Sig %s i %n sek.',
    'say %s':
        'Sig %s',
    'think %s for %n secs':
        'T\u00E6nk %s i %n sek.',
    'think %s':
        'T\u00E6nk %s',
    'Hello!':
        'Hej!',
    'Hmm...':
        'Hmm...',
    'change %eff effect by %n':
        'Skift %eff -effekt i %n',
    'set %eff effect to %n':
        'S\u00E6t %eff -effekt til %n',
    'clear graphic effects':
        'Ryd grafiske effekter',
    'change size by %n':
        'Skift st\u00F8rrelse med %n',
    'set size to %n %':
        'S\u00E6t st\u00F8rrelse til %n %',
    'size':
        'St\u00F8rrelse',
    'show':
        'Vis',
    'hide':
        'Skjul',
    'go to front':
        'G\u00E5 til forsiden',
    'go back %n layers':
        'G\u00E5 %n lag tilbage',

    'development mode \ndebugging primitives:':
        'Udviklertilstand \nfejlfindingsenheder',
    'console log %mult%s':
        'Skriv i konsollen: %mult%s',
    'alert %mult%s':
        'Alarmer: %mult%s',

    // sound:
    'play sound %snd':
        'Spil lyd %snd',
    'play sound %snd until done':
        'Spil lyd %snd til den er f\u00E6rdig',
    'stop all sounds':
        'Stop alle lyde',
    'rest for %n beats':
        'Pause lyd i %n slag',
    'play note %n for %n beats':
        'Spil node %n i %n slag',
    'change tempo by %n':
        'Skift tempoet med %n',
    'set tempo to %n bpm':
        'S\u00E6t tempoet til %n slag/min.',
    'tempo':
        'Tempo',

    // pen:
    'clear':
        'Ryd',
    'pen down':
        'Pensel op',
    'pen up':
        'Pensel ned',
    'set pen color to %clr':
        'Penselfarve %clr',
    'change pen color by %n':
        '\u00C6ndr penselfarven med %n',
    'set pen color to %n':
        'Skift penselfarven til %n',
    'change pen shade by %n':
        '\u00C6ndr penselskyggen med %n',
    'set pen shade to %n':
        'Skift penselskyggen til %n',
    'change pen size by %n':
        '\u00C6ndr penselst\u00F8rrelsen med %n',
    'set pen size to %n':
        '\u00C6ndr penselst\u00F8rrelsen til %n',
    'stamp':
        'Stempel',

    // control:
    'when %greenflag clicked':
        'N\u00E5r %greenflag klikkes',
    'when %keyHat key pressed':
        'N\u00E5r der tastes %keyHat',
    'when I am clicked':
        'N\u00E5r jeg klikkes',
    'when I receive %msgHat':
        'N\u00E5r jeg modtager %msgHat',
    'broadcast %msg':
        'Send %msg',
    'broadcast %msg and wait':
        'Send %msg og vent',
    'Message name':
        'Beskednavn',
    'wait %n secs':
        'Vent i %n sek.',
    'wait until %b':
        'Vent indtid %b',
    'forever %c':
        'Altid %c',
    'repeat %n %c':
        'Gentag %n mal %c',
    'repeat until %b %c':
        'Gentag indtil %b %c',
    'if %b %c':
        'Hvis %b %c',
    'if %b %c else %c':
        'Hvis %b %c sonst %c',
    'report %s':
        'Rapporter %s',
    'stop block':
        'Stop denne blok',
    'stop script':
        'Stop programmet',
    'stop all %stop':
        'Stop alt %stop',
    'run %cmdRing %inputs':
        'Udf\u00F8r %cmdRing %inputs',
    'launch %cmdRing %inputs':
        'Aktiver %cmdRing %inputs',
    'call %repRing %inputs':
        'Hent %repRing auf %inputs',
    'run %cmdRing w/continuation':
        'K\u00F8r %cmdRing med kontinuitet',
    'call %cmdRing w/continuation':
        'Hent %cmdRing med kontinuitet',
    'warp %c':
        'Genvej %c',
    'when I start as a clone':
        'N\u00E5r jeg starter som klon',
    'create a clone of %cln':
        'Opret klon %cln',
    'myself':
        'Mig',
    'delete this clone':
        'Slet denne klon',

    // sensing:
    'touching %col ?':
        'R\u00F8r ved %col ?',
    'touching %clr ?':
        'R\u00F8r ved %clr ?',
    'color %clr is touching %clr ?':
        'r\u00F8r farven %clr ved farven %clr ?',
    'ask %s and wait':
        'Sp\u00F8rg %s og vent',
    'what\'s your name?':
        'Hvad hedder du?',
    'answer':
        'Svar',
    'mouse x':
        'Mus x-position',
    'mouse y':
        'Mus y-Position',
    'mouse down?':
        'Mus aktiveret?',
    'key %key pressed?':
        'Tast %key aktiveret?',
    'distance to %dst':
        'Afstand til %dst',
    'reset timer':
        'Nulstil timer',
    'timer':
        'Timer',
    '%att of %spr':
        '%att af %spr',
    'http:// %s':
        'http:// %s',
    'turbo mode?':
        'Turbotilstand?',
    'set turbo mode to %b':
        'S\u00E6t turbotilstand til %b',

    'filtered for %clr':
        'Rens for %clr',
    'stack size':
        'Stabelst\u00F8rrelse',
    'frames':
        'Ramme',

    // operators:
    '%n mod %n':
        '%n mod %n',
    'round %n':
        'Afrund %n',
    '%fun of %n':
        '%fun af %n',
    'pick random %n to %n':
        'V\u00E6lg tilf\u00E6ldigt tal mellem %n og %n',
    '%b and %b':
        '%b og %b',
    '%b or %b':
        '%b eller %b',
    'not %b':
        'Forskellig fra %b',
    'true':
        'Sandt',
    'false':
        'Falsk',
    'join %words':
        'Sammens\u00E6t %words',
    'hello':
        'Hej',
    'world':
        'Verden',
    'letter %n of %s':
        'Bogstav %n af %s',
    'length of %s':
        'L\u00E6ngde af %s',
    'unicode of %s':
        'Unicode af %s',
    'unicode %n as letter':
        'Unicode %n som bogstav',
    'is %s a %typ ?':
        'Er %s et %typ ?',
    'is %s identical to %s ?':
        'Er %s identisk med %s ?',

    'type of %s':
        'Type af %s',

    // variables:
    'Make a variable':
        'Ny variabel',
    'Variable name':
        'Variabelnavn',
    'Delete a variable':
        'Slet variabel',

    'set %var to %s':
        'S\u00E6t %var til %s',
    'change %var by %n':
        '\u00C6ndr %var med %n',
    'show variable %var':
        'Vis variabel %var',
    'hide variable %var':
        'Skjul variabel %var',
    'script variables %scriptVars':
        'Programvariabler %scriptVars',

    // lists:
    'list %exp':
        'Liste %exp',
    '%s in front of %l':
        '%s foran %l',
    'item %idx of %l':
        'Element %idx af %l',
    'all but first of %l':
        'Alle, undtagen det f\u00F8rste af %l',
    'length of %l':
        'L\u00E6ngde af %l',
    '%l contains %s':
        '%l indeholder %s',
    'thing':
        'ting',
    'add %s to %l':
        'Tilf\u00F8j %s til %l',
    'delete %ida of %l':
        'Slet %ida fra %l',
    'insert %s at %idx of %l':
        'Inds\u00E6t %s ved %idx i %l ein',
    'replace item %idx of %l with %s':
        'Erstat element %idx af %l med %s',

    // other
    'Make a block':
        'Ny blok',

    // menus
    // snap menu
    'About...':
        'Om Snap!...',
    'Reference manual':
        'Manual',
    'Snap! website':
        'Snap! Hjemmeside',
    'Download source':
        'Hent kildekode',
    'Switch back to user mode':
        'Skift til brugertilstand',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'Sl\u00E5 Morphics fra \nog vis brugervenlige \ni stedet',
    'Switch to dev mode':
        'Skift til udviklertilstand',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'erm\u00f6glicht Morphic Funktionen',

    // project menu
    'Project Notes...':
        'Projektnoter...',
    'New':
        'Ny',
    'Open...':
        '\u00C5ben...',
    'Save':
        'Gem',
    'Save As...':
        'Gem som...',
    'Import...':
        'Importer...',
    'file menu import hint':
        'Importer et eksporteret projekt,'
            + 'et blokbibliotek, et udseende'
            + 'eller en lydfil',
    'Export project as plain text ...':
        'Eksporter projekt som ren tekst...',
    'Export project...':
        'Eksporter projekt...',
    'show project data as XML\nin a new browser window':
        'Vis projekt som XML\ni et nyt browservindue',
    'Export blocks ...':
        'Eksporter blokke...',
    'show global custom block definitions as XML\nin a new browser window':
        'Vis global udseendeblok-definition som XML/i et nyt browservindue',
    'Import tools...':
        'Importer v\u00E6rkt\u00F8jer...',
    'load the official library of\npowerful blocks':
        'Hent det officielle bibliotek med \neffektive blokke',

    // cloud menu
    'Login...':
        'Login...',
    'Signup...':
        'Registrer...',

    // settings menu
    'Language...':
        'Sprog...',
    'Blurred shadows':
        'Sl\u00F8rrede skygger',
    'uncheck to use solid drop\nshadows and highlights':
        'Fjern flueben for solide skygger og fremh\u00E6velser',
    'check to use blurred drop\nshadows and highlights':
        'S\u00E6t flueben for sl\u00F8rrede \nskygger og fremh\u00E6velser',
    'Zebra coloring':
        'Zebrafarver',
    'check to enable alternating\ncolors for nested blocks':
        'S\u00E6t flueben for at \u00E6ndre \nfarven af indlejrede blokke',
    'uncheck to disable alternating\ncolors for nested block':
        'Fjern flueben for at forhindre \n\u00E6ndring i farven af indlejrede blokke',
    'Dynamic input labels':
        'Dynamiske inputm\u00E6rkater',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'Fjen flueben for at forhindre \nm\u00E6rkater til variable input',
    'check to enable dynamic\nlabels for variadic inputs':
        'S\u00E6t flueben for at forhindre \nm\u00E6rkater til variable input',
    'Prefer empty slot drops':
        'Foretr\u00E6k tomme slot drops',
    'settings menu prefer empty slots hint':
        'Settingen foretr\u00E6kker tomme slot hints',
    'uncheck to allow dropped\nreporters to kick out others':
        'Fjern flueben for at tillade indsatte rapporter at fjerne andre',
    'Long form input dialog':
        'Lang form input-dialog',
    'check to always show slot\ntypes in the input dialog':
        'S\u00E6t flueben for \naltid at vise slottyper i input-dialog',
    'uncheck to use the input\ndialog in short form':
        'Fjern flueben for at anvende input-dialog i kort format',
    'Virtual keyboard':
        'Virtuel tastatur',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'Fjern flueben for at forhindre brug \naf virtuel tastetur til mobile enheder',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'S\u00E6t flueben for at tillade brug \naf virtuel tastetur til mobile enheder ',
    'Input sliders':
        'Input sliders',
    'uncheck to disable\ninput sliders for\nentry fields':
        'Fjern flueben \nfor ikke at tillade \nsliders i inputfelter',
    'check to enable\ninput sliders for\nentry fields':
        'S\u00E6t flueben \nfor at tillade \nsliders i inputfelter',
    'Clicking sound':
        'Kliklyd',
    'uncheck to turn\nblock clicking\nsound off':
        'Fjern flueben for \nat fjerne blokkliklyden',
    'check to turn\nblock clicking\nsound on':
        'S\u00E6t flueben ',
    'Animations':
        'Animationer',
    'uncheck to disable\nIDE animations':
        'Fjern flueben for at deaktivere IDE-animationer',
    'Turbo mode':
        'Turbotilstand',
    'check to prioritize\nscript execution':
        'S\u00E6t flueben for at prioritere dette program',
    'uncheck to run scripts\nat normal speed':
        'Fjern flueben for at afvikle programmet i almindeligt tempo',
    'check to enable\nIDE animations':
        'S\u00E6t flueben for at tillade IDE-animationer',
    'Thread safe scripts':
        'Thread safe programmer',
    'uncheck to allow\nscript reentrance':
        'Fjern flueben for at tillade program\u00E6ndringer',
    'check to disallow\nscript reentrance':
        'S\u00E6t flueben for at forhindre program\u00E6ndringer ',
    'Prefer smooth animations':
        'Foretr\u00E6k flydende animationer',
    'uncheck for greater speed\nat variable frame rates':
        'Fjern flueben for \u00F8get framehastighed',
    'check for smooth, predictable\nanimations across computers':
        'Kontroller at animationerne k\u00E6rer ordenligt',

    // inputs
    'with inputs':
        'Med inputs',
    'input names:':
        'Inputnavne:',
    'Input Names:':
        'Inputnavne:',
    'input list:':
        'Inputliste:',

    // context menus:
    'help':
        'Hj\u00E6lp',

    // blocks:
    'help...':
        'Hj\u00E6lp...',
    'relabel...':
        'Nyt m\u00E6rkat...',
    'duplicate':
        'Dupliker',
    'make a copy\nand pick it up':
        'Lav en kopi og saml den op',
    'only duplicate this block':
        'Dupliker kun denne blok',
    'delete':
        'Slet',
    'script pic...':
        'Programbilled...',
    'open a new window\nwith a picture of this script':
        '\u00C5ben et nyt vindue \nmed et billede af dette program',
    'ringify':
        'Omkrans',
    'unringify':
        'Fjern omringning',

    // custom blocks:
    'delete block definition...':
        'Slet blokdefinitionen',
    'edit...':
        'Rediger...',

    // sprites:
    'edit':
        'Rediger',
    'export...':
        'Eksporter...',

    // stage:
    'show all':
        'Vis alle',

    // scripting area
    'clean up':
        'Ryd op',
    'arrange scripts\nvertically':
        'Arranger programmer \nvertikalt',
    'add comment':
        'Tilf\u00F8j kommentar',
    'make a block...':
        'Lav en ny blok…',

    // costumes
    'rename':
        'Skift navn',
    'export':
        'Eksporter',
    'rename costume':
        'Skift costumenavn',

    // sounds
    'Play sound':
        'Spil lyd',
    'Stop sound':
        'Stop lyd',
    'Stop':
        'Stop',
    'Play':
        'Spil',
    'rename sound':
        'Skift lydens navn',

    // dialogs
    // buttons
    'OK':
        'OK',
    'Ok':
        'OK',
    'Cancel':
        'Luk',
    'Yes':
        'Ja',
    'No':
        'Nej',

    // help
    'Help':
        'Hj\u00F6lp',

    // Project Manager
    'Untitled':
        'Unavngivet',
    'Open Project':
        '\u00C5ben projekt',
    '(empty)':
        '(tom)',
    'Saved!':
        'Gemt!',
    'Delete Project':
        'Slet projekt',
    'Are you sure you want to delete':
        'Er du sikker p\u00E5 at du vil slette projektet?',
    'rename...':
        'Skift navn...',

    // costume editor
    'Costume Editor':
        'Udseendedesigner',
    'click or drag crosshairs to move the rotation center':
        'Tryk og tr\00E6k med krydset for at flytte omdrejningscentrum',

    // project notes
    'Project Notes':
        'Projektnoter',

    // new project
    'New Project':
        'Nyt projekt',
    'Replace the current project with a new one?':
        'Erstat det nuv\u00E6rende projekt med et nyt?',

    // save project
    'Save Project As...':
        'Gem projektet som...',

    // export blocks
    'Export blocks':
        'Eksporter blokke',
    'Import blocks':
        'Importer blokke',
    'this project doesn\'t have any\ncustom global blocks yet':
        'Dette projekt har ikke nogen unikke globale blokke endnu',
    'select':
        'V\u00E6lg',
    'all':
        'Alle',
    'none':
        'Ingen',

    // variable dialog
    'for all sprites':
        'For alle figurer',
    'for this sprite only':
        'Kun for denne figur',

    // block dialog
    'Change block':
        'Skift blok',
    'Command':
        'Kommando',
    'Reporter':
        'Funktion',
    'Predicate':
        'Pr\u00E5tegning',

    // block editor
    'Block Editor':
        'Blokdesigner',
    'Apply':
        'Anvend',

    // block deletion dialog
    'Delete Custom Block':
        'Slet unik blok',
    'block deletion dialog text':
        'Skal denne blok virkelig slettes?',

    // input dialog
    'Create input name':
        'Lav inputnavn',
    'Edit input name':
        'Rediger inputnavn',
    'Edit label fragment':
        'Rediger m\u00E6rkat',
    'Title text':
        'Overskiftstekst',
    'Input name':
        'Imputnavn',
    'Delete':
        'Slet',
    'Object':
        'Objekt',
    'Number':
        'Nummer',
    'Text':
        'Tekst',
    'List':
        'Liste',
    'Any type':
        'Tilf\u00E6ldig skriftstype',
    'Boolean (T/F)':
        'Boolsk (W/F)',
    'Command\n(inline)':
        'Befehl',
    'Command\n(C-shape)':
        'Befehl\n(C-Form)',
    'Any\n(unevaluated)':
        'Tilf\u00E5ldig\n(uevalueret)',
    'Boolean\n(unevaluated)':
        'Boolsk\n(zitiert)',
    'Single input.':
        'Enkelt input.',
    'Default Value:':
        'Startv\u00E6rdi:',
    'Multiple inputs (value is list of inputs)':
        'Flere input (v\u00E6rdier fra liste)',
    'Upvar - make internal variable visible to caller':
        'G\u00F8r interne variabler synlige',

    // About Snap
    'About Snap':
        'Om  Snap',
    'Back...':
        'Tilbage...',
    'License...':
        'Licens...',
    'Modules...':
        'Komponenter...',
    'Credits...':
        'Medvirkende...',
    'Translators...':
        'Overs\u00E6ttere',
    'License':
        'Licens',
    'current module versions:':
        'Komponentversion',
    'Contributors':
        'Medvirkende',
    'Translations':
        'Overs\u00E6ttere',

    // variable watchers
    'normal':
        'Normal',
    'large':
        'Stor',
    'slider':
        'Skydeknap',
    'slider min...':
        'Skydeknap minimum...',
    'slider max...':
        'Skydeknap maksimum...',
    'import...':
        'Importer...',
    'Slider minimum value':
        'Skydeknap minimumsv\u00E6rdi:',
    'Slider maximum value':
        'Skydeknap maksimumsv\u00E6rdi:',

    // list watchers
    'length: ':
        'L\u00E6ngde: ',

    // coments
    'add comment here...':
        'Tilf\u00F8j kommentar',

    // drow downs
    // directions
    '(90) right':
        '(90) h\u00F8jre',
    '(-90) left':
        '(-90) venstre',
    '(0) up':
        '(0) op',
    '(180) down':
        '(180) ned',

    // collision detection
    'mouse-pointer':
        'Musemark\u00F8r',
    'edge':
        'Kant',
    'pen trails':
        'Penselspor',

    // costumes
    'Turtle':
        'Mark\u00F8r',
    'Empty':
        'Tom',

    // graphical effects
    'ghost':
        'Sp\u00F8gelseseffekt',

    // keys
    'space':
        'Mellemrum',
    'up arrow':
        'Pil op',
    'down arrow':
        'Pil ned',
    'right arrow':
        'Pil h\u00F8jre',
    'left arrow':
        'Pil venstre',
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
        'Ny...',

    // math functions
    'abs':
        'absolut v\u00E6rdi',
    'sqrt':
        'kvadratrod',
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
        'Tal',
    'text':
        'Tekst',
    'Boolean':
        'Boolsk',
    'list':
        'Liste',
    'command':
        'Kommando',
    'reporter':
        'Funktionsblok',
    'predicate':
        'Pr\u00e4dikat',

    // list indices
    'last':
        'Sidst',
    'any':
        'Tilf\u00E6ldig'
};
