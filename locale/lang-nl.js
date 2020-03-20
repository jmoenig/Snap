/*

    lang-nl.js

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

SnapTranslator.dict.nl = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    Ä, ä   \u00c4, \u00e4
    Ö, ö   \u00d6, \u00f6
    Ü, ü   \u00dc, \u00fc
    ß      \u00df
*/

    // translations meta information
    'language_name':
        'Nederlands', // the name as it should appear in the language menu
    'language_translator':
        'Sjoerd Dirk Meijer, Frank Sierens, Jan-Gerard van der Toorn', // your name for the Translators tab
    'translator_e-mail':
        'sjoerddirk@fromScratchEd.nl, frank.sierens@telenet.be, jg.2019@xs4all.nl', // optional
    'last_changed':
        '2017-09-01', // this, too, will appear in the Translators tab

    // GUI
    // control bar:
    'untitled':
        'zonder titel',
    'development mode':
        'ontwikkelmodus',

    // categories:
    'Motion':
        'Bewegen',
    'Looks':
        'Uiterlijk',
    'Sound':
        'Geluid',
    'Pen':
        'Pen',
    'Control':
        'Besturen',
    'Sensing':
        'Waarnemen',
    'Operators':
        'Functies',
    'Variables':
        'Variabelen',
    'Lists':
        'Lijsten',
    'Other':
        'Overig',

    // editor:
    'draggable':
        'versleepbaar',

    // tabs:
    'Scripts':
        'Scripts',
    'Costumes':
        'Uiterlijken',
    'Backgrounds':
        'Achtergronden',
    'Sounds':
        'Geluiden',

    // names:
    'Sprite':
        'Object',
    'Stage':
        'Speelveld',

    // rotation styles:
    'don\'t rotate':
        'niet draaibaar',
    'can rotate':
        'draaibaar',
    'only face left/right':
        'alleen links/rechts draaibaar',

    // new sprite button:
    'add a new sprite':
        'een nieuw object toevoegen',

    // tab help
    'costumes tab help':
        'help uiterlijkentab',
    'import a sound from your computer\nby dragging it into here':
        'importeer een geluid vanaf je computer\ndoor deze hierin te slepen',

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
        'Speelveld geselecteerd: geen standaardbeweging mogelijk',

    'move %n steps':
        'neem %n stappen',
    'turn %clockwise %n degrees':
        'draai %clockwise %n graden',
    'turn %counterclockwise %n degrees':
        'draai %counterclockwise %n graden',
    'point in direction %dir':
        'wijs naar richting %dir',
    'point towards %dst':
        'richt naar %dst',
    'go to x: %n y: %n':
        'ga naar x: %n y: %n',
    'go to %dst':
        'ga naar %dst',
    'glide %n secs to x: %n y: %n':
        'glijd in %n sec. naar x: %n y: %n',
    'change x by %n':
        'verander x met %n',
    'set x to %n':
        'maak x %n',
    'change y by %n':
        'verander y met %n',
    'set y to %n':
        'maak y %n',
    'if on edge, bounce':
        'aan de rand, keer om',
    'x position':
        'x-positie',
    'y position':
        'y-positie',
    'direction':
        'richting',

    // looks:
    'switch to costume %cst':
        'wissel naar uiterlijk %cst',
    'next costume':
        'volgende uiterlijk',
    'costume #':
        'uiterlijk #',
    'say %s for %n secs':
        'zeg %s gedurende %n sec.',
    'say %s':
        'zeg %s',
    'think %s for %n secs':
        'denk %s gedurende %n sec.',
    'think %s':
        'denk %s',
    'Hello!':
        'Hallo!',
    'Hmm...':
        'Hmm...',
    'change %eff effect by %n':
        'verander %eff -effect met %n',
    'set %eff effect to %n':
        'maak %eff -effect %n',
    'clear graphic effects':
        'zet grafische effecten uit',
    'change size by %n':
        'verander grootte met %n',
    'set size to %n %':
        'maak grootte %n %',
    'size':
        'grootte',
    'show':
        'verschijn',
    'hide':
        'verdwijn',
    'go to front':
        'ga naar voorgrond',
    'go back %n layers':
        'ga %n lagen terug',

    'development mode \ndebugging primitives:':
        'ontwikkelmodus \ndebugging basisblokken',
    'console log %mult%s':
        'console log %mult%s',
    'alert %mult%s':
        'waarschuwing %mult%s',

    // sound:
    'play sound %snd':
        'start geluid %snd',
    'play sound %snd until done':
        'start geluid %snd en wacht',
    'stop all sounds':
        'stop alle geluiden',
    'rest for %n beats':
        'pauzeer %n tellen',
    'play note %n for %n beats':
        'speel noot %n %n tellen',
    'change tempo by %n':
        'verander tempo met %n',
    'set tempo to %n bpm':
        'maak tempo %n bpm',
    'tempo':
        'tempo',

    // pen:
    'clear':
        'wissen',
    'pen down':
        'pen neer',
    'pen up':
        'pen omhoog',
    'set pen color to %clr':
        'maak penkleur %clr',
    'change pen color by %n':
        'verander penkleur met %n',
    'set pen color to %n':
        'maak penkleur %n',
    'change pen shade by %n':
        'verander penschaduw met %n',
    'set pen shade to %n':
        'maak penschaduw %n',
    'change pen size by %n':
        'verander pengrootte met %n',
    'set pen size to %n':
        'maak pengrootte %n',
    'stamp':
        'stempel',
    'fill':
        'vul',

    // control:
    'when %greenflag clicked':
        'wanneer %greenflag wordt aangeklikt',
    'when %keyHat key pressed':
        'wanneer %keyHat wordt ingedrukt',
    'when I am %interaction':
        'wanneer ik %interaction word',
    'clicked':
        'aangeklikt',
    'pressed':
        'ingedrukt',
    'dropped':
        'losgelaten',
    'mouse-entered':
        'aangeraakt met de muis',
    'mouse-departed':
        'niet meer met de muis aangeraakt',
    'when %b':
        'wanneer %b',
    'when I receive %msgHat':
        'wanneer ik %msgHat ontvang',
    'broadcast %msg':
        'zend signaal %msg',
    'broadcast %msg and wait':
        'zend signaal %msg en wacht',
    'Message name':
        'signaalnaam',
    'message':
        'signaal',
    'any message':
        'elk signaal',
    'wait %n secs':
        'wacht %n sec.',
    'wait until %b':
        'wacht tot %b',
    'forever %loop':
        'herhaal %loop',
    'repeat %n %loop':
        'herhaal %n keer %loop',
    'repeat until %b %loop':
        'herhaal tot %b %loop',
    'if %b %c':
        'als %b %c',
    'if %b %c else %c':
        'als %b %c anders %c',
    'report %s':
        'rapporteer %s',
    'stop %stopChoices':
        'stop %stopChoices',
    'all':
        'alles',
    'this script':
        'dit Script',
    'this block':
        'dit blok',
    'stop %stopOthersChoices':
        'stop %stopOthersChoices',
    'all but this script':
        'alle scripts behalve deze',
    'other scripts in sprite':
        'andere scripts van dit object',
    'pause all %pause':
        'pauzeer alles %pause',
    'run %cmdRing %inputs':
        'voer %cmdRing uit %inputs',
    'launch %cmdRing %inputs':
        'start %cmdRing %inputs',
    'call %repRing %inputs':
        'roep %repRing aan %inputs',
    'run %cmdRing w/continuation':
        'voer %cmdRing uit en ga door',
    'call %cmdRing w/continuation':
        'roep %cmdRing aan en ga door',
    'warp %c':
        'warp %c',
    'when I start as a clone':
        'wanneer ik als kloon start',
    'create a clone of %cln':
        'maak kloon van %cln',
    'myself':
        'mijzelf',
    'delete this clone':
        'verwijder deze kloon',

    // sensing:
    'touching %col ?':
        'raak ik %col ?',
    'touching %clr ?':
        'raak ik kleur %clr ?',
    'color %clr is touching %clr ?':
        'kleur %clr raakt %clr ?',
    'ask %s and wait':
        'vraag %s en wacht',
    'what\'s your name?':
        'Hoe heet je?',
    'answer':
        'antwoord',
    'mouse x':
        'muis x',
    'mouse y':
        'muis y',
    'mouse down?':
        'muis ingedrukt?',
    'key %key pressed?':
        'toets %key ingedrukt?',
    'distance to %dst':
        'afstand tot %dst',
    'reset timer':
        'zet tijd op nul',
    'timer':
        'tijd',
    '%att of %spr':
        '%att van %spr',
    'my %get':
        'Eigenschap %get',
    'http:// %s':
        'http:// %s',
    'turbo mode?':
        'turbomodus?',
    'set turbo mode to %b':
        'zet turbomodus op %b',

    'filtered for %clr':
        'gefilterd op %clr',
    'stack size':
        'stapelgrootte',
    'frames':
        'beelden',

    // operators:
    '%n mod %n':
        '%n modulo %n',
    'round %n':
        'afgerond %n',
    '%fun of %n':
        '%fun van %n',
    'pick random %n to %n':
        'willekeurig getal tussen %n en %n',
    '%b and %b':
        '%b en %b',
    '%b or %b':
        '%b of %b',
    'not %b':
        'niet %b',
    'true':
        'waar',
    'false':
        'onwaar',
    'join %words':
        'voeg %words samen',
    'split %s by %delim':
        'splits %s bij %delim',
    'hello':
        'hallo',
    'world':
        'wereld',
    'letter %idx of %s':
        'letter %idx van %s',
    'length of %s':
        'lengte van %s',
    'unicode of %s':
        'unicode waarde van %s',
    'unicode %n as letter':
        'unicode %n als letter',
    'is %s a %typ ?':
        'is %s een %typ ?',
    'is %s identical to %s ?':
        'is %s gelijk aan %s ?',
    'type of %s':
        'type van %s',

    // variables:
    'Make a variable':
        'Maak een variabele',
    'Variable name':
        'Variabelenaam',
    'Script variable name':
        'Scriptvariabelenaam',
    'Delete a variable':
        'Variabele wissen',

    'set %var to %s':
        'maak %var %s',
    'change %var by %n':
        'verander %var met %n',
    'show variable %var':
        'toon variabele %var',
    'hide variable %var':
        'verberg variabele %var',
    'script variables %scriptVars':
        'scriptvariabelen %scriptVars',

    // lists:
    'list %exp':
        'lijst %exp',
    '%s in front of %l':
        '%s voor %l',
    'item %idx of %l':
        'item %idx van %l',
    'all but first of %l':
        'alles, behalve de eerste van %l',
    'length of %l':
        'lengte van %l',
    '%l contains %s':
        '%l bevat %s',
    'thing':
        'ding',
    'add %s to %l':
        'voeg %s in op %l',
    'delete %ida of %l':
        'verwijder %ida van %l',
    'insert %s at %idx of %l':
        'voeg %s op %idx aan %l toe',
    'replace item %idx of %l with %s':
        'vervang item %idx van %l door %s',

    // other
    'Make a block':
        'Maak een blok',

    // menus
    // snap menu
    'About...':
        'Over...',
    'Reference manual':
        'Handleiding',
    'Snap! website':
        'Snap!-website',
    'Download source':
        'Broncode downloaden',
    'Switch back to user mode':
        'Terug naar gebruikersmodus',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'verlaat Morphic',
    'Switch to dev mode':
        'Naar ontwikkelmodus wisselen',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'gebruik Morphic\nniet gebruikersvriendelijk!',

    // project menu
    'Project notes...':
        'Notities...',
    'New':
        'Nieuw',
    'Open...':
        'Openen...',
    'Save':
        'opslaan',
    'Save to disk':
        'Opslaan op schijf',
    'store this project\nin the downloads folder\n(in supporting browsers)':
        'Sla dit projekt op\nin de downloads folder\n(allen voor browsers die dit ondersteunen)',
    'Save As...':
        'Opslaan als...',
    'Import...':
        'Importeren...',
    'file menu import hint':
        'importeer een project,\neen bibliotheek met blokken,\neen uiterlijk of een geluid',
    'Export project as plain text...':
        'Project exporteren als tekst...',
    'Export project...':
        'Project exporteren...',
    'show project data as XML\nin a new browser window':
        'Toon projectdata als XML\nin een nieuw browservenster',
    'Export blocks...':
        'Blokken exporteren...',
    'show global custom block definitions as XML\nin a new browser window':
        'toon globale aangepaste blokdefinities\nals XML in browser',
    'Unused blocks...':
          'Ongebruikte blokken...',
    'find unused global custom blocks\nand remove their definitions':
        'zoek ongebruikte globale aangepaste blokken\nen ruim ze op',
    'Remove unused blocks':
        'Ruim ongebruikte blokken op',
    'there are currently no unused\nglobal custom blocks in this project':
        'er zijn nu geen ongebruikge globale\naangepaste blokkenin dit project',
    'unused block(s) removed':
        'ongebruikte blokken opgeruimd',
    'Export summary...':
        'Exporteer samenvatting...',
    'open a new browser browser window\n with a summary of this project':
        'open een nieuw browser scherm\nmet een samenvatting van dit project',
    'Contents':
        'inhoud',
    'Kind of':
        'Soort van',
    'Part of':
        'Een onderdeel van',
    'Parts':
        'Onderdelen',
    'Blocks':
        'Blokken',
    'For all Sprites':
        'Voor alle objecten',
    'Import tools':
        'Importeer tools',
    'load the official library of\npowerful blocks':
        'laad de officiele bibliotheek\nmet krachtige blokken',
    'Libraries...':
        'Bibliotheken...',
    'Import library':
        'Importeer bibliotheek',

    // cloud menu
    'Login...':
        'Inloggen...',
    'Signup...':
        'Registeren...',

    // settings menu
    'Language...':
        'Taal...',
    'Zoom blocks...':
        'Blokken inzoomen...',
    'Stage size...':
        'Afmeting speelveld...',
    'Stage size':
        'Sspeelveld afmeting',
    'Stage width':
        'Speelveld breedte',
    'Stage height':
        'Speelveld hoogte',
    'Default':
        'Standaard',
    'Blurred shadows':
        'Onscherpe schaduwen',
    'uncheck to use solid drop\nshadows and highlights':
        'uitvinken om scherpe schaduwen\nen uitlichtingen te krijgen',
    'check to use blurred drop\nshadows and highlights':
        'aanvinken om onscherpe schaduwen\nen uitlichtingen te krijgen',
    'Zebra coloring':
        'Zebrakleuren',
    'check to enable alternating\ncolors for nested blocks':
        'afwisselende kleuren voor\ngeneste blokken aanzetten',
    'uncheck to disable alternating\ncolors for nested block':
        'afwisselende kleuren voor\ngeneste blokken uitzetten',
    'Dynamic input labels':
        'Dynamische inputlabels',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'dynamische labels voor\nmeervaksinvoer uitzetten',
    'check to enable dynamic\nlabels for variadic inputs':
        'dynamische labels voor\nmeervaksinvoer aanzetten',
    'Prefer empty slot drops':
        'Voorkeur voor lege plaatshouders',
    'settings menu prefer empty slots hint':
        'lege plaatshouders in instellingenmenu',
    'uncheck to allow dropped\nreporters to kick out others':
        'uitschakelen om lege functies\n anderen uit te sluiten',
    'Long form input dialog':
        'Lang formulier-invoerscherm',
    'Plain prototype labels':
        'Eenvoudige protoype-labels',
    'uncheck to always show (+) symbols\nin block prototype labels':
        'uitvinken om altijd (+) symbolen\nte tonen in blok prototype labels',
    'check to hide (+) symbols\nin block prototype labels':
        'aanvinken om (+) symbolen in\nblock prototye labels te verbergen',
    'check to always show slot\ntypes in the input dialog':
        'aanvinken om data type in\ninvoerscherm te zien',
    'uncheck to use the input\ndialog in short form':
        'uitvinken voor verkort invoerscherm',
    'Virtual keyboard':
        'Virtueel toetsenbord',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'uitvinken om het virtueel\ntoetsenbord uit te schakelen\nvoor mobiele toestellen',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'aanvinken om het virtueel\ntoetsenbord in te schakelen\nvoor mobiele toestellen',
    'Input sliders':
        'Invoer schuifbalk',
    'uncheck to disable\ninput sliders for\nentry fields':
        'uitvinken om\nschuifbalken voor invoer\nuit te schakelen',
    'check to enable\ninput sliders for\nentry fields':
        'aanvinken om\nschuifbalken voor invoer\nin te schakelen',
    'Clicking sound':
        'Klikgeluid',
    'uncheck to turn\nblock clicking\nsound off':
        'uitvinken om\nklikgeluiden uit te\nschakelen',
    'check to turn\nblock clicking\nsound on':
        'aanvinken om\nklikgeluid in te\nschakelen',
    'Animations':
        'Animaties',
    'uncheck to disable\nIDE animations':
        'IDE-animaties\nuitschakelen',
    'Turbo mode':
        'Turbomodus',
    'check to prioritize\nscript execution':
        'aanvinken om scriptuitvoering\nprioriteit te geven',
    'uncheck to run scripts\nat normal speed':
        'uitvinken voor scripuitvoering\nop normale snelheid',
    'check to enable\nIDE animations':
        'aanvinken om IDE-animaties\ntoe te laten',
    'Flat design':
        'Eenvoudige layout',
    'Nested auto-wrapping':
        'Automatisch omvatten',
    'Keyboard Editing':
        'Bewerken met toetsenbord',
    'Table support':
        'Gebruik tabellen',
    'Table lines':
        'Tabellen met lijntjes',
    'Visible stepping':
        'Stapsgewijs programma verloop',
    'Thread safe scripts':
        'Thread-veilige scripts',
    'uncheck to allow\nscript reentrance':
        'uitvinken om niet-\nafgewerkte scripts opnieuw\nte starten',
    'check to disallow\nscript reentrance':
        'aanvinken om niet-\nafgewerkte scripts niet opnieuw\n te starten',
    'Prefer smooth animations':
        'Voorkeur voor vloeiende animatie',
    'uncheck for greater speed\nat variable frame rates':
        'uitvinken voor hogere snelheid\nbij variabele framerates',
    'check for smooth, predictable\nanimations across computers':
        'aanvinken voor vloeiende,\nvoorspelbare animaties tussen computers',
    'Flat line ends':
        'Rechte lijn uiteinden',
    'check for flat ends of lines':
        'aanvinken voor rechte\nuiteinden van lijnen',
    'uncheck for round ends of lines':
        'uitvinken voor ronde\nuiteinden van lijnen',
    'Inheritance support':
        'Gebruik overerving',

    // inputs
    'with inputs':
        'met invoer',
    'input names:':
        'invoernamen:',
    'Input Names:':
        'Invoernamen:',
    'input list:':
        'invoerlijst:',

    // context menus:
    'help':
        'help',

    // palette:
    'hide primitives':
        'basisblokken verbergen',
    'show primitives':
        'basisblokken tonen',

    // blocks:
    'help...':
        'help...',
    'relabel...':
        'label hernoemen...',
    'duplicate':
        'kopieer',
    'make a copy\nand pick it up':
        'maak een kopie\nen gebruikt het',
    'only duplicate this block':
        'alleen dit blok kopi\u00EBren',
    'delete':
        'verwijder',
    'script pic...':
        'scriptafbeelding...',
    'open a new window\nwith a picture of this script':
        'open een nieuw venster\nmet de afbeelding van dit script',
    'ringify':
        'omringen',
    'unringify':
        'niet omringen',
    'transient':
        'niet blijvend',
    'uncheck to save contents\nin the project':
        'uitvinken om de inhoud\nin het project op te slaan',
    'check to prevent contents\nfrom being saved':
        'aanvinken om te verhinderen dat\nde inhoud wordt opgeslagen',

    // custom blocks:
    'delete block definition...':
        'verwijder blokdefinitie',
    'edit...':
        'bewerken...',

    // sprites:
    'edit':
        'bewerken',
    'move':
        'verplaatsen',
    'detach from':
        'losmaken van',
    'detach all parts':
        'alle onderdelen losmaken',
    'export...':
        'exporteren...',

    // stage:
    'show all':
        'toon alles',
    'pic...':
        'afbeelding...',
    'open a new window\nwith a picture of the stage':
        'open een nieuw\nbrowservenster met een\nafbeelding van het\nspeelveld',

    // scripting area
    'clean up':
        'opruimen',
    'arrange scripts\nvertically':
        'scripts verticaal\nordenen',
    'add comment':
        'opmerking toevoegen',
    'undrop':
        'ongedaan maken',
    'undo the last\nblock drop\nin this pane':
        'de laatste blokbeweging\nongedaan maken',
    'redrop':
        'opnieuw uitvoeren',
    'scripts pic...':
        'scripts-afbeelding...',
    'open a new window\nwith a picture of all scripts':
        'open een nieuw venster\nmet een afbeelding\nvan alle scripts',
    'make a block...':
        'maak een blok...',

    // costumes
    'rename':
        'hernoemen',
    'export':
        'exporteren',
    'rename costume':
        'uiterlijk hernoemen',

    // sounds
    'Play sound':
        'Geluid afspelen',
    'Stop sound':
        'Geluid stoppen',
    'Stop':
        'Stop',
    'Play':
        'Speel',
    'rename sound':
        'geluid hernoemen',

    // lists and tables
    'list view...':
        'lijstweergave...',
    'table view...':
        'tabelweergave...',
    'open in dialog...':
        'in nieuw venster openen...',
    'reset columns':
        'kolommen terugzetten',
    'items':
        'elementen',

    // dialogs
    // buttons
    'OK':
        'OK',
    'Ok':
        'Ok',
    'Cancel':
        'Annuleren',
    'Yes':
        'Ja',
    'No':
        'Nee',

    // help
    'Help':
        'Help',

    // zoom blocks
    'Zoom blocks':
        'Blokken inzoomen',
    'build':
        'bouw',
    'your own':
        'je eigen',
    'blocks':
        'blokken',
    'normal (1x)':
        'normaal (1x)',
    'demo (1.2x)':
        'demo (1.2x)',
    'presentation (1.4x)':
        'presentatie (1.4x)',
    'big (2x)':
        'groot (2x)',
    'huge (4x)':
        'enorm (4x)',
    'giant (8x)':
        'gigantisch (8x)',
    'monstrous (10x)':
        'monsterlijk (10x)',

    // Project Manager
    'Untitled':
        'Zonder titel',
    'Open Project':
        'Project openen',
    '(empty)':
        '(leeg)',
    'Saved!':
        'Opgeslagen!',
    'Delete Project':
        'Projekt verwijderen',
    'Are you sure you want to delete':
        'Weet je zeker dat je wilt verwijderen?',
    'rename...':
        'hernoemen...',

    // costume editor
    'Costume Editor':
        'Uiterlijk bewerken',
    'click or drag crosshairs to move the rotation center':
        'Klik of sleep de kruisdraden om het rotatiecentrum te verplaatsen',

    // project notes
    'Project Notes':
        'Projectnotities',

    // new project
    'New Project':
        'Nieuw project',
    'Replace the current project with a new one?':
        'Vervang het huidige project door een nieuwe?',

    // save project
    'Save Project As...':
        'Project opslaan als...',

    // export blocks
    'Export blocks':
        'Exporteer blokkken',
    'Import blocks':
        'Importeer blokken',
    'this project doesn\'t have any\ncustom global blocks yet':
        'dit project\nbevat nog geen \nglobale blokken',
    'select':
        'selecteer',
    'all':
        'alle',
    'none':
        'niets',

    // variable dialog
    'for all sprites':
        'voor alle objecten',
    'for this sprite only':
        'alleen voor dit object',

    // variables refactoring
    'rename only\nthis reporter':
        'hernoem alleen\ndit blok',
    'rename all...':
        'hernoem alle...',
    'rename all blocks that\naccess this variable':
        'alle blokken hernoemen,\ndie naar deze variabele verwijzen',

    // block dialog
    'Change block':
        'Blok veranderen',
    'Command':
        'Commando',
    'Reporter':
        'Functie',
    'Predicate':
        'Predicaat',

    // block editor
    'Block Editor':
        'Blok bewerken',
    'Apply':
        'Toepassen',

    // block deletion dialog
    'Delete Custom Block':
        'Verwijder aangepast blok',
    'block deletion dialog text':
        'Moet dit blok met al zijn\ninstanties verwijderd worden?',

    // input dialog
    'Create input name':
        'Maak invoernaam',
    'Edit input name':
        'Invoernaam bewerken',
    'Edit label fragment':
        'Labelfragment bewerken',
    'Title text':
        'Titel',
    'Input name':
        'Invoernaam',
    'Delete':
        'Verwijder',
    'Object':
        'Object',
    'Number':
        'Getal',
    'Text':
        'Tekst',
    'List':
        'Lijst',
    'Any type':
        'Elk type',
    'Boolean (T/F)':
        'Booleaans (waar/niet waar)',
    'Command\n(inline)':
        'Opdracht\n(inline)',
    'Command\n(C-shape)':
        'Opdracht\n(C-vorm)',
    'Any\n(unevaluated)':
        'Willekeurig\n(onge\u00EBvalueerd)',
    'Boolean\n(unevaluated)':
        'Booleaans\n(onge\u00EBvalueerd)',
    'Single input.':
        'Enkelvoudige invoer.',
    'Default Value:':
        'Standaardwaarde:',
    'Multiple inputs (value is list of inputs)':
        'Meervoudige invoer (als lijst)',
    'Upvar - make internal variable visible to caller':
        'Upvar - maak interne variabele zichtbaar voor aanroeper',

    // About Snap
    'About Snap':
        'Over Snap',
    'Back...':
        'Vorige...',
    'License...':
        'Licentie...',
    'Modules...':
        'Module...',
    'Credits...':
        'Credits...',
    'Translators...':
        'Vertalers...',
    'License':
        'Licentie',
    'current module versions:':
        'huidige moduleversies',
    'Contributors':
        'Bijdragers',
    'Translations':
        'Vertalingen',

    // variable watchers
    'normal':
        'normaal',
    'large':
        'groot',
    'slider':
        'schuifbalk',
    'slider min...':
        'schuif min...',
    'slider max...':
        'schuif max...',
    'import...':
        'importeren...',
    'Slider minimum value':
        'Minimumwaarde van schuifbalk',
    'Slider maximum value':
        'Maximumwaarde van schuifbalk',

    // list watchers
    'length: ':
        'lengte: ',

    // coments
    'add comment here...':
        'hier commentaar invoegen',

    // drow downs
    // directions
    '(90) right':
        '(90) rechts',
    '(-90) left':
        '(-90) links',
    '(0) up':
        '(0) omhoog',
    '(180) down':
        '(180) omlaag',

    // collision detection
    'mouse-pointer':
        'muisaanwijzer',
    'edge':
        'rand',
    'pen trails':
        'penspoor',

    // costumes
    'Turtle':
        'Schildpad',
    'Empty':
        'Leeg',

    // graphical effects
    'color':
        'kleur',
    'fisheye':
        'vissenoog',
    'whirl':
        'draaikolk',
    'pixelate':
        'blokkig',
    'mosaic':
        'mosaiek',
    'saturation':
        'verzadiging',
    'brightness':
        'helderheid',
    'ghost':
        'spook',
    'negative':
        'negatief',
    'comic':
        'strepenpatroon',
    'confetti':
        'kleureffect',

    // keys
    'space':
        'spatiebalk',
    'up arrow':
        'pijltje omhoog',
    'down arrow':
        'pijltje omlaag',
    'right arrow':
        'pijltje naar rechts',
    'left arrow':
        'pijltje naar links',
    'any key':
        'willekeurige toets',
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
        'nieuw...',

    // math functions
    'abs':
        'abs',
    'ceiling':
        'afgerond omhoog',
    'floor':
        'afgerond omlaag',
    'sqrt':
        'wortel',
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
        'letter',
    'whitespace':
        'spatie',
    'line':
        'regel',
    'tab':
        'tab',
    'cr':
        'regelterugloop',

    // data types
    'number':
        'getal',
    'text':
        'tekst',
    'Boolean':
        'booleaans',
    'list':
        'lijst',
    'command':
        'commando',
    'reporter':
        'functie',
    'predicate':
        'predicaat',
    'sprite':
        'object',

    // list indices
    'last':
        'laatste',
    'any':
        'willekeurig',

    // attributes
    'neighbors':
        'buren',
    'self':
        'zelf',
    'other sprites':
        'andere objecten',
    'parts':
        'onderdelen',
    'anchor':
        'ankerpunt',
    'parent':
        'ouder',
    'children':
        'kind',
    'clones':
        'kloon',
    'other clones':
        'andere klonen',
    'dangling?':
        'slingeren?',
    'rotation x':
        'draaipunt x',
    'rotation y':
        'draaipunt y',
    'center x':
        'middelpunt x',
    'center y':
        'middelpunt y',
    'name':
        'naam',
    'stage':
        'speelveld',
};
