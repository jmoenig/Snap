/*

    lang-dk.js

    Danish translation for SNAP!

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
        'FAB, Pelle Hjek', // your name for the Translators tab
    'translator_e-mail':
        'fab@nielsen.mail.dk, hjek@mail.com', // optional
    'last_changed':
        '2016-11-16', // this, too, will appear in the Translators tab

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
        'Udseende',
    'Sound':
        'Lyd',
    'Pen':
        'Pensel',
    'Control':
        'Styring',
    'Sensing':
        'Sansning',
    'Operators':
        'Operatorer',
    'Variables':
        'Variable',
    'Lists':
        'Lister',
    'Other':
        'Andet',

    // editor:
    'draggable':
        'kan tr\u00E6kkes',

    // tabs:
    'Scripts':
        'Scripts',
    'Costumes':
        'Kostumer',
    'Sounds':
        'Lyde',

    // names:
    'Sprite':
        'Figur',
    'Stage':
        'Scene',

    // rotation styles:
    'don\'t rotate':
        'roter ikke',
    'can rotate':
        'kan rotere',
    'only face left/right':
        'vend kun mod h\u00F8jre/venstre',

    // new sprite button:
    'add a new Turtle sprite':
        'Tilf\u00F8j en ny Skildpaddefigur',

    // tab help
    'costumes tab help':
        'Importer et billede fra din computer eller en webside\n'
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
        'Scene valgt:\ningen bev\u00E6gelsesblokke\n',

    'move %n steps':
        'g\u00E5 %n trin',
    'turn %clockwise %n degrees':
        'drej %clockwise %n grader',
    'turn %counterclockwise %n degrees':
        'drej %counterclockwise %n grader',
    'point in direction %dir':
        'peg i retning %dir',
    'point towards %dst':
        'peg mod %dst',
    'go to x: %n y: %n':
        'g\u00E5 til x: %n y: %n',
    'go to %dst':
        'g\u00E5 til %dst',
    'glide %n secs to x: %n y: %n':
        'sv\u00E6v i %n sekunder til x: %n y: %n',
    'change x by %n':
        '\u00E6ndr x med %n',
    'set x to %n':
        's\u00E6t x til %n',
    'change y by %n':
        '\u00E6ndr y med %n',
    'set y to %n':
        's\u00E6t y til %n',
    'if on edge, bounce':
        'hop tilbage ved kanten',
    'x position':
        'x-position',
    'y position':
        'y-position',
    'direction':
        'retning',

    // looks:
    'switch to costume %cst':
        'skift til kostume %cst',
    'next costume':
        'n\u00E6ste kostume',
    'costume #':
        'kostume nummer',
    'say %s for %n secs':
        'sig %s i %n sekunder',
    'say %s':
        'sig %s',
    'think %s for %n secs':
        't\u00E6nk %s i %n sekunder',
    'think %s':
        't\u00E6nk %s',
    'Hello!':
        'Hej!',
    'Hmm...':
        'Hmm...',
    'change %eff effect by %n':
        '\u00E6ndr effekten %eff med %n',
    'set %eff effect to %n':
        's\u00E6t effekten %eff til %n',
    'clear graphic effects':
        'ryd grafiske effekter',
    'change size by %n':
        '\u00E6ndr st\u00F8rrelse med %n',
    'set size to %n %':
        's\u00E6t st\u00F8rrelse til %n %',
    'size':
        'st\u00F8rrelse',
    'show':
        'vis',
    'hide':
        'skjul',
    'go to front':
        'kom forrest',
    'go back %n layers':
        'smut %n lag tilbage',

    'development mode \ndebugging primitives:':
        'udviklertilstand \nfejlfindingsenheder',
    'console log %mult%s':
        'skriv i konsollen: %mult%s',
    'alert %mult%s':
        'alarm %mult%s',

    // sound:
    'play sound %snd':
        'afspil lyd %snd',
    'play sound %snd until done':
        'afspil lyd %snd indtil f\u00E6rdig',
    'stop all sounds':
        'stop alle lyde',
    'rest for %n beats':
        'hvil i %n slag',
    'play note %n for %n beats':
        'afspil node %n i %n slag',
    'change tempo by %n':
        '\u00E6ndr tempoet med %n',
    'set tempo to %n bpm':
        's\u00E6t tempoet til %n slag per minut',
    'tempo':
        'tempo',

    // pen:
    'clear':
        'ryd',
    'pen down':
        'pensel ned',
    'pen up':
        'pensel op',
    'set pen color to %clr':
        's\u00E6t penselfarve til %clr',
    'change pen color by %n':
        '\u00E6ndr penselfarven med %n',
    'set pen color to %n':
        's\u00E6t penselfarven til %n',
    'change pen shade by %n':
        '\u00E6ndr penselskyggen med %n',
    'set pen shade to %n':
        's\u00E6t penselskyggen til %n',
    'change pen size by %n':
        '\u00E6ndr penselst\u00F8rrelsen med %n',
    'set pen size to %n':
        's\u00E6t penselst\u00F8rrelsen til %n',
    'stamp':
        'stempel',
    'fill':
        'fyld',

    // control:
    'when %greenflag clicked':
        'n\u00E5r %greenflag klikkes',
    'when %keyHat key pressed':
        'n\u00E5r %keyHat trykkes',
    'when I am clicked':
        'n\u00E5r jeg klikkes',
    'when I receive %msgHat':
        'n\u00E5r jeg modtager %msgHat',
    'broadcast %msg':
        'send %msg',
    'broadcast %msg and wait':
        'send %msg og vent',
    'Message name':
        'Beskednavn',
    'wait %n secs':
        'vent i %n sekunder',
    'wait until %b':
        'Vent indtil %b',
    'forever %c':
        'for evigt %c',
    'repeat %n %c':
        'gentag %n gange %c',
    'repeat until %b %c':
        'gentag indtil %b %c',
    'if %b %c':
        'hvis %b %c',
    'if %b %c else %c':
        'hvis %b %c ellers %c',
    'report %s':
        'papporter %s',
    'stop':
        'stop',
    'stop block':
        'stop blok',
    'stop script':
        'stop script',
    'stop all %stop':
        'stop alt %stop',
    'run %cmdRing %inputs':
        'k\u00F8r %cmdRing %inputs',
    'launch %cmdRing %inputs':
        'igangs\u00E6t %cmdRing %inputs',
    'call %repRing %inputs':
        'kald %repRing %inputs',
    'run %cmdRing w/continuation':
        'k\u00F8r %cmdRing med forts\u00E6ttelse ',
    'call %cmdRing w/continuation':
        'kald %cmdRing med forts\u00E6ttelse',
    'warp %c':
        'forskyd %c',
    'when I start as a clone':
        'n\u00E5r jeg starter som klon',
    'create a clone of %cln':
        'lav en klon af %cln',
    'myself':
        'migselv',
    'delete this clone':
        'slet denne klon',
    'pause all':
        's\u00E6t alt p\u00E5 pause',

    // sensing:
    'touching %col ?':
        'r\u00F8rer ved %col ?',
    'touching %clr ?':
        'r\u00F8rer ved %clr ?',
    'color %clr is touching %clr ?':
        'r\u00F8rer farven %clr ved farven %clr ?',
    'ask %s and wait':
        'sp\u00F8rg %s og vent',
    'what\'s your name?':
        'hvad hedder du?',
    'answer':
        'svar',
    'mouse x':
        'mus x',
    'mouse y':
        'mus y',
    'mouse down?':
        'mus nede?',
    'key %key pressed?':
        'tast %key trykket ned?',
    'distance to %dst':
        'afstand til %dst',
    'reset timer':
        'nulstil ur',
    'timer':
        'ur',
    '%att of %spr':
        '%att af %spr',
    'http:// %s':
        'http:// %s',
    'turbo mode?':
        'turbotilstand?',
    'set turbo mode to %b':
        's\u00E6t turbotilstand til %b',

    'filtered for %clr':
        'renset for %clr',
    'stack size':
        'stakst\u00F8rrelse',
    'frames':
        'billeder',

    // operators:
    '%n mod %n':
        '%n modulo %n',
    'round %n':
        'afrund %n',
    '%fun of %n':
        '%fun af %n',
    'pick random %n to %n':
        'v\u00E6lg tilf\u00E6ldig %n til %n',
    '%b and %b':
        '%b og %b',
    '%b or %b':
        '%b eller %b',
    'not %b':
        'ikke %b',
    'true':
        'sandt',
    'false':
        'falsk',
    'join %words':
        'forbind %words',
    'hello':
        'hej',
    'world':
        'verden',
    'letter %n of %s':
        'bogstav %n af %s',
    'length of %s':
        'l\u00E6ngde af %s',
    'unicode of %s':
        'unicode af %s',
    'unicode %n as letter':
        'unicode %n som bogstav',
    'is %s a %typ ?':
        'er %s et %typ ?',
    'is %s identical to %s ?':
        'er %s identisk med %s ?',

    'type of %s':
        'type af %s',

    // variables:
    'Make a variable':
        'lav en variabel',
    'Variable name':
        'variabelnavn',
    'Delete a variable':
        'slet en variabel',

    'set %var to %s':
        's\u00E6t %var til %s',
    'change %var by %n':
        '\u00E6ndr %var med %n',
    'show variable %var':
        'vis variabel %var',
    'hide variable %var':
        'skjul variabel %var',
// hvad er "script" paa dansk?
    'script variables %scriptVars':
        'scriptvariable %scriptVars',

    // lists:
    'list %exp':
        'liste %exp',
    '%s in front of %l':
        '%s foran %l',
    'item %idx of %l':
        'genstand %idx af %l',
    'all but first of %l':
        'alle undtagen den f\u00F8rste af %l',
    'length of %l':
        'l\u00E6ngde af %l',
    '%l contains %s':
        '%l indeholder %s',
    'thing':
        'ting',
    'add %s to %l':
        'tilf\u00F8j %s til %l',
    'delete %ida of %l':
        'slet %ida fra %l',
    'insert %s at %idx of %l':
        'inds\u00E6t %s ved %idx i %l',
    'replace item %idx of %l with %s':
        'erstat genstand %idx af %l med %s',

    // other
    'Make a block':
        'Lav en blok',

    // menus
    // snap menu
    'About...':
        'Om...',
    'Reference manual':
        'Referencemanual',
    'Snap! website':
        'Snap! hjemmeside',
    'Download source':
        'Hent kildekode',
    'Switch back to user mode':
        'Skift tilbage til brugertilstand',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'sl\u00E5 deep-Morphics kontekstmenuer fra \nog vis brugervenlige \ni stedet',
    'Switch to dev mode':
        'Skift til udviklertilstand',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        's\u00E6t deep-Morphics kontekstmenuer til \nog vis brugervenlige \ni stedet',

    // project menu
    'Project Notes...':
        'Projektnoter...',
    'New':
        'Ny',
    'Open...':
        '\u00C5bn...',
    'Save':
        'Gem',
    'Save As...':
        'Gem som...',
    'Import...':
        'Importer...',
    'file menu import hint':
        'Importer et eksporteret projekt,'
            + 'et blokbibliotek, et kostume'
            + 'eller en lydfil',
    'Export project as plain text ...':
        'Eksporter projekt som ren tekst...',
    'Export project...':
        'Eksporter projekt...',
    'Export summary...':
        'Eksporter opsummering...',
    'show project data as XML\nin a new browser window':
        'Vis projekt som XML\ni et nyt browservindue',
    'Export blocks ...':
        'Eksporter blokke...',
    'show global custom block definitions as XML\nin a new browser window':
        'Vis globale tilpassede blokdefinitioner som XML\ni et nyt browser-vindue',
    'Import tools':
        'Importer v\u00E6rkt\u00F8jer...',
    'load the official library of\npowerful blocks':
        'Indl\u00E6s det officielle bibliotek med \nkraftfulde blokke',
    'Libraries...':
        'Biblioteker...',
    'Import library':
        'Importer bibliotek',

    // cloud menu
    'Login...':
        'Login...',
    'Signup...':
        'Registrer...',
    'Reset Password...':
        'Nulstil kodeord...',

    // settings menu
    'Language...':
        'Sprog...',
    'Zoom blocks...':
        'Forst\u00F8r blokke...',
    'Stage size...':
        'Scenest\u00F8rrelse...',
    'Stage size':
        'Scenest\u00F8rrelse',
    'Stage width':
        'Scenebredde',
    'Stage height':
        'Sceneh\u00F8jde',
    'Blurred shadows':
        'Sl\u00F8rede skygger',
    'uncheck to use solid drop\nshadows and highlights':
        'afmarker for at bruge h\u00E5rde skygger og fremh\u00E6velser',
    'check to use blurred drop\nshadows and highlights':
        'marker for at bruge bl\u00F8de \nskygger og fremh\u00E6velser',
    'Zebra coloring':
        'Zebrafarvning',
    'check to enable alternating\ncolors for nested blocks':
        'marker for at vise skiftende \nfarver for blokke inden i hinanden',
    'uncheck to disable alternating\ncolors for nested block':
        'afmarker for ikke at vise skiftende \nfarver for blokke inden i hinanden',
    'Dynamic input labels':
        'Dynamiske inputm\u00E6rkater',
    'uncheck to disable dynamic\nlabels for variadic inputs':
// what does variadic even mean?
        'afmarker for ikke at vise dynamiske \nm\u00E6rkater til varierende input',
    'check to enable dynamic\nlabels for variadic inputs':
        'marker for at vise dynamiske \nm\u00E6rkater til varierende input',
    'Prefer empty slot drops':
        'Foretr\u00E6k tomme hylstre',
    'settings menu prefer empty slots hint':
        'indstillingsmenu foretr\u00E6kker tomme hylstre',
    'uncheck to allow dropped\nreporters to kick out others':
        'afmarker for at lade indsatte rapport\u00F8rer sparke andre ud',
    'Long form input dialog':
        'Lang formularinputdialog',
    'Plain prototype labels':
        'Klare prototypem\u00E6rkater',
    'check to always show slot\ntypes in the input dialog':
        'marker for \naltid at vise hylstertyper i inputdialog',
    'uncheck to use the input\ndialog in short form':
        'afmarker for at bruge inputsdialogen i kort form',
    'Virtual keyboard':
        'Virtuelt tastatur',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'afmarker for at fjerne underst\u00F8ttelse \naf virtuelt tastetur til mobile enheder',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'marker for at bruge underst\u00F8ttelse \naf virtuelt tastetur til mobile enheder ',
    'Input sliders':
        'Indtastningsskydeknapper',
    'uncheck to disable\ninput sliders for\nentry fields':
        'afmarker \nfor at fjerne \nskydeknapper i inputfelter',
    'check to enable\ninput sliders for\nentry fields':
        'marker \nfor at vise \nskydeknapper i inputfelter',
    'Clicking sound':
        'Kliklyd',
    'uncheck to turn\nblock clicking\nsound off':
        'afmarker for \nat slukke for blokkliklyd',
    'check to turn\nblock clicking\nsound on':
        'marker til for at t\u00E6nde for blokkliklyd',
    'Animations':
        'Animationer',
    'uncheck to disable\nIDE animations':
        'afmarker for at fjerne IDE-animationer',
    'Flat design':
        'Fladt udseende',
    'check for alternative GUI design':
        'marker for alternativ grafisk brugerflade',
    'uncheck for default GUI design':
        'afmarker for s\u00E6dvanlig brugerflade',
    'Nested auto-wrapping':
        'Automatisk omklamring',
    'Keyboard Editing':
        'Tastaturredigering',
    'Table support':
        'Tabelunderst\u00F8ttelse',
    'Table lines':
        'Tabeller med linjer',
    'Visible stepping':
        'Synlig gennemgang',
    'Turbo mode':
        'Hurtig gennemgang',
    'check to prioritize\nscript execution':
        'marker for at prioritere scriptudf\u00F8rsel',
    'uncheck to run scripts\nat normal speed':
        'afmarker for at afvikle scriptet i normal hastighed',
    'check to enable\nIDE animations':
        'marker for at bruge IDE-animationer',
    'Thread safe scripts':
        'Tr\u00E5dsikre scripts',
    'uncheck to allow\nscript reentrance':
        'afmarker for at tillade scriptgenindgang',
    'check to disallow\nscript reentrance':
        'marker for at forbyde scriptgenindgang',
    'Prefer smooth animations':
        'Foretr\u00E6k flydende animationer',
    'uncheck for greater speed\nat variable frame rates':
        'afmarker for \u00F8get afspildningshastighed ved variabel billedfrekvens',
    'check for smooth, predictable\nanimations across computers':
        'marker for flydende, forudsigelige animationer p\u00E5 forskellige computere',
    'Flat line ends':
        'Flade penselstr\u00F8g',
    'check for flat ends of lines':
        'marker for flade\npenselstr\u00F8g',
    'uncheck for round ends of lines':
        'afmarker for afrundede linjespidser',
    'Codification support':
        'Afkodningsunderst\u00F8ttelse',
    'Inheritance support':
        'Nedarvningsunderst\u00F8gttelse',


    // inputs
    'with inputs':
        'med input',
    'input names:':
        'inputnavne:',
    'Input Names:':
        'Inputnavne:',
    'input list:':
        'inputliste:',

    // context menus:
    'help':
        'hj\u00E6lp',

    // blocks:
    'help...':
        'hj\u00E6lp...',
    'relabel...':
        'nyt m\u00E6rkat...',
    'duplicate':
        'dupliker',
    'make a copy\nand pick it up':
        'lav en kopi og saml den op',
    'only duplicate this block':
        'dupliker kun denne blok',
    'delete':
        'slet',
    'script pic...':
        'scriptbillede...',
    'open a new window\nwith a picture of this script':
        '\u00E5bn et nyt vindue \nmed et billede af dette script',
    'ringify':
        'omring',
    'unringify':
        'fjern omringning',

    // custom blocks:
    'delete block definition...':
        'slet blokdefinitionen...',
    'edit...':
        'rediger...',

    // sprites:
    'edit':
        'rediger',
    'move':
        'flyt',
    'detach from':
        'l\u00F8sriv fra',
    'detach all parts':
        'L\u00F8sriv alle dele',
    'export...':
        'eksporter...',
    'paint a new sprite':
        'mal en ny figur',

    // stage:
    'show all':
        'vis alle',

    // scripting area
    'clean up':
        'ryd op',
    'arrange scripts\nvertically':
        'arranger scripts \nlodret',
    'add comment':
        'tilf\u00F8j kommentar',
    'make a block...':
        'lav en blok...',

    // costumes
    'rename':
        'skift navn',
    'export':
        'eksporter',
    'rename costume':
        'skift kostumenavn',

    // sounds
    'Play sound':
        'Afspil lyd',
    'Stop sound':
        'Stop lyd',
    'Stop':
        'Stop',
    'Play':
        'Afspil',
    'rename sound':
        'skift lydens navn',

    // dialogs
    // buttons
    'OK':
        'OK',
    'Ok':
        'OK',
    'Cancel':
        'Annuller',
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
        '\u00C5bn projekt',
    '(empty)':
        '(tom)',
    'Saved!':
        'Gemt!',
    'Delete Project':
        'Slet projekt',
    'Are you sure you want to delete':
        'Er du sikker p\u00E5 at du vil slette',
    'rename...':
        'skift navn...',

    // costume editor
    'Costume Editor':
        'Kostumev\u00E6rkt\u00F8j',
    'click or drag crosshairs to move the rotation center':
        'klik eller tr\00E6k med sigtekornet for at flytte omdrejningspunktet',

    // project notes
    'Project notes...':
        'Projektnoter...',

    // new project
    'New Project':
        'Nyt projekt',
    'Replace the current project with a new one?':
        'Erstat det nuv\u00E6rende projekt med et nyt et?',

    // save project
    'Save Project As...':
        'Gem projekt som...',

    // export blocks
    'Export blocks':
        'Eksporter blokke',
    'Import blocks':
        'Importer blokke',
    'this project doesn\'t have any\ncustom global blocks yet':
        'dette projekt har ingen tilpassede globale blokke endnu',
    'select':
        'v\u00E6lg',
    'all':
        'alle',
    'none':
        'ingen',

    // variable dialog
    'for all sprites':
        'for alle figurer',
    'for this sprite only':
        'kun for denne figur',

    // block dialog
    'Change block':
        'Skift blok',
    'Command':
        'Kommando',
    'Reporter':
        'Rapport\u00F8r',
    'Predicate':
        'Pr\u00E6dikat',

    // block editor
    'Block Editor':
        'Blokv\u00E6rkt\u00F8j',
    'Apply':
        'Anvend',

    // block deletion dialog
    'Delete Custom Block':
        'Slet tilpasset blok',
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
        'Titelstekst',
    'Input name':
        'inputnavn',
    'Delete':
        'Slet',
    'Object':
        'Objekt',
    'Number':
        'Tal',
    'Text':
        'Tekst',
    'List':
        'Liste',
    'Any type':
        'Hvad som helst',
    'Boolean (T/F)':
        'Boolsk (S/F)',
    'Command\n(inline)':
        'Kommando\n(integreret)',
    'Command\n(C-shape)':
        'Kommando\n(C-form)',
    'Any\n(unevaluated)':
        'Hvad som helst\n(uevalueret)',
    'Boolean\n(unevaluated)':
        'Boolsk\n(uevalueret)',
    'Single input.':
        'Enkel input.',
    'Default Value:':
        'V\u00E6rdi som udgangspunkt:',
    'Multiple inputs (value is list of inputs)':
        'Flere inputs (v\u00E6rdi er liste af inputs)',
    'Upvar - make internal variable visible to caller':
        'Opvar - g\u00F8r interne variable synlige for kalderen',

    // About Snap
    'About Snap':
        'Om Snap',
    'Back...':
        'Tilbage...',
    'License...':
        'Lisens...',
    'Modules...':
        'Moduler...',
    'Credits...':
        'Anerkendelse...',
    'Translators...':
        'Overs\u00E6ttere',
    'License':
        'Licens',
    'current module versions:':
        'Nuv\u00E6rende modulversioner',
    'Contributors':
        'Bidragydere',
    'Translations':
        'Overs\u00E6ttelser',

    // variable watchers
    'normal':
        'normal',
    'large':
        'stor',
    'slider':
        'skydeknap',
    'slider min...':
        'skydeknap minimum...',
    'slider max...':
        'skydeknap maksimum...',
    'import...':
        'importer...',
    'Slider minimum value':
        'skydeknap minimumsv\u00E6rdi:',
    'Slider maximum value':
        'skydeknap maksimumsv\u00E6rdi:',

    // list watchers
    'length: ':
        'l\u00E6ngde: ',

    // coments
    'add comment here...':
        'tilf\u00F8j kommentar her...',

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
        'musemark\u00F8r',
    'edge':
        'kant',
    'pen trails':
        'penselspor',

    // costumes
    'Turtle':
        'Skildpadde',
    'Empty':
        'Tom',

    // graphical effects
    'ghost':
        'sp\u00F8gelse',
    'color':
        'farve',
    'fisheye':
        'fiske\u00F8je',
    'whirl':
        'hvirvel',
    'pixelate':
        'pixeler',
    'mosaic':
        'mosaik',
    'negative':
        'negativ',
    'comic':
        'tegneserie',
    'confetti':
        'konfetti',
    'saturation':
        'm\u00E6tning',
    'brightness':
        'lysstyrke',

    // keys
    'space':
        'mellemrum',
    'up arrow':
        'pil op',
    'down arrow':
        'pil ned',
    'right arrow':
        'pil h\u00F8jre',
    'left arrow':
        'pil venstre',
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
        'ny...',

    // math functions
    'abs':
        'absolut',
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
        'tal',
    'text':
        'tekst',
    'Boolean':
        'boolsk',
    'list':
        'liste',
    'command':
        'kommando',
    'reporter':
        'rapport\u00F8r',
    'predicate':
        'pr\u00e4dikat',

    // list indices
    'last':
        'sidste',
    'any':
        'hvilken som helst'
};
