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
        'Frank Sierens', // your name for the Translators tab
    'translator_e-mail':
        'frank.sierens@telenet.be', // optional
    'last_changed':
        '2013-07-24', // this, too, will appear in the Translators tab

    // GUI
    // control bar:
    'untitled':
        'Zonder titel',
    'development mode':
        'Hackermode',

    // categories:
    'Motion':
        'Beweging',
    'Looks':
        'Uitzicht',
    'Sound':
        'Klank',
    'Pen':
        'Pen',
    'Control':
        'Sturing',
    'Sensing':
        'Voelen',
    'Operators':
        'Operatoren',
    'Variables':
        'Variabelen',
    'Lists':
        'Lijsten',
    'Other':
        'Andere',

    // editor:
    'draggable':
        'versleepbaar',

    // tabs:
    'Scripts':
        'Scripts',
    'Costumes':
        'Kostuums',
    'Sounds':
        'Geluiden',

    // names:
    'Sprite':
        'Object',
    'Stage':
        'Toneel',

    // rotation styles:
    'don\'t rotate':
        'niet draaibaar',
    'can rotate':
        'draaibaar',
    'only face left/right':
        'kan alleen links/rechts draaien',

    // new sprite button:
    'add a new sprite':
        'een nieuw object toevoegen',

    // tab help
    'costumes tab help':
        'Kostuum tab help',
    'import a sound from your computer\nby dragging it into here':
        'Geluiden importeren',

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
        'Toneel geselecteerd: geen standaardbeweging mogelijk',

    'move %n steps':
        'verplaats %n Stappen',
    'turn %clockwise %n degrees':
        'draai %clockwise %n Graden',
    'turn %counterclockwise %n degrees':
        'draai %counterclockwise %n Graden',
    'point in direction %dir':
        'Wijs in Richting %dir',
    'point towards %dst':
        'wijs naar %dst',
    'go to x: %n y: %n':
        'ga naar x: %n y: %n',
    'go to %dst':
        'ga naar %dst',
    'glide %n secs to x: %n y: %n':
        'glijd %n Sec. naar x: %n y: %n',
    'change x by %n':
        'Wijzig x met %n',
    'set x to %n':
        'Maak x gelijk aan %n',
    'change y by %n':
        'Wijzig y met %n',
    'set y to %n':
        'Maak y gelijk aan %n',
    'if on edge, bounce':
        'indien tegen de rand, kaats terug',
    'x position':
        'x-Positie',
    'y position':
        'y-Positie',
    'direction':
        'Richting',

    // looks:
    'switch to costume %cst':
        'Kies kostuum %cst',
    'next costume':
        'volgend kostuum',
    'costume #':
        'Kostuum Nr.',
    'say %s for %n secs':
        'zeg %s gedurende %n Sec.',
    'say %s':
        'zeg %s',
    'think %s for %n secs':
        'denk %s gedurende %n Sec.',
    'think %s':
        'denk %s',
    'Hello!':
        'Hallo!',
    'Hmm...':
        'Hmm...',
    'change %eff effect by %n':
        'Wijzig %eff -Effect met %n',
    'set %eff effect to %n':
        'Maak %eff -Effect gelijk aan %n',
    'clear graphic effects':
        'Wis grafische effecten',
    'change size by %n':
        'Wijzig grootte met %n',
    'set size to %n %':
        'Maak grootte gelijk aan %n %',
    'size':
        'Grootte',
    'show':
        'Toon',
    'hide':
        'Verberg',
    'go to front':
        'Ga naar voor',
    'go back %n layers':
        'Ga %n lagen terug',

    'development mode \ndebugging primitives:':
        'Hackermode \nDebugging-Blokken',
    'console log %mult%s':
        'Schrijf naar de console: %mult%s',
    'alert %mult%s':
        'Pop-up: %mult%s',

    // sound:
    'play sound %snd':
        'speel geluid %snd',
    'play sound %snd until done':
        'speel geluid %snd volledig',
    'stop all sounds':
        'stop alle geluid',
    'rest for %n beats':
        'Pauzeer gedurende %n maten',
    'play note %n for %n beats':
        'speel noot %n gedurende %n maten',
    'change tempo by %n':
        'Wijzig tempo naar %n',
    'set tempo to %n bpm':
        'Maak tempo gelijk aan %n bpm',
    'tempo':
        'Tempo',

    // pen:
    'clear':
        'wis',
    'pen down':
        'Pen neer',
    'pen up':
        'Pen omhoog',
    'set pen color to %clr':
        'Maak penkleur gelijk aan %clr',
    'change pen color by %n':
        'Wijzig penkleur naar %n',
    'set pen color to %n':
        'Maak penkleur gelijk aan %n',
    'change pen shade by %n':
        'Wijzig penschaduw naar %n',
    'set pen shade to %n':
        'Maak penschaduw gelijk aan %n',
    'change pen size by %n':
        'Verander pengrootte naar %n',
    'set pen size to %n':
        'Maak pengrootte gelijk aan %n',
    'stamp':
        'stempel',

    // control:
    'when %greenflag clicked':
        'Wanneer %greenflag aangeklikt is',
    'when %keyHat key pressed':
        'Wanneer toets %keyHat ingedrukt is',
    'when I am clicked':
        'Wanneer er op mij geklikt is',
    'when I receive %msgHat':
        'Wanneer ik %msgHat ontvang',
    'broadcast %msg':
        'stuur %msg naar iedereen',
    'broadcast %msg and wait':
        'stuur %msg naar iedereen en wacht',
    'Message name':
        'Bericht naam',
    'message':
        'Bericht',
    'any message':
        'gelijk welk bericht',
    'wait %n secs':
        'wacht %n sec.',
    'wait until %b':
        'wacht tot %b',
    'forever %c':
        'doorlopend %c',
    'repeat %n %c':
        'Herhaal %n keer %c',
    'repeat until %b %c':
        'herhaal tot %b %c',
    'if %b %c':
        'als %b %c',
    'if %b %c else %c':
        'als %b %c anders %c',
    'report %s':
        'rapporteer %s',
    'stop block':
        'stop blok',
    'stop script':
        'stop script',
    'stop all %stop':
        'stop alle %stop',
    'run %cmdRing %inputs':
        'Voer %cmdRing uit %inputs',
    'launch %cmdRing %inputs':
        'start %cmdRing %inputs',
    'call %repRing %inputs':
        'aanroepen %repRing op %inputs',
    'run %cmdRing w/continuation':
        'Voer %cmdRing uit met voortgang',
    'call %cmdRing w/continuation':
        'aanroepen %cmdRing met voortgang',
    'warp %c':
        'Warp %c',
    'when I start as a clone':
        'Wanneer ik start als kloon',
    'create a clone of %cln':
        'maak een kloon van %cln',
    'myself':
        'mezelf',
    'delete this clone':
        'wis deze kloon',

    // sensing:
    'touching %col ?':
        'contact met %col ?',
    'touching %clr ?':
        'contact met %clr ?',
    'color %clr is touching %clr ?':
        'kleur %clr maakt contact met %clr ?',
    'ask %s and wait':
        'vraag %s en wacht',
    'what\'s your name?':
        'Hoe heet je?',
    'answer':
        'Antwoord',
    'mouse x':
        'Muis x-Positie',
    'mouse y':
        'Muis y-Positie',
    'mouse down?':
        'muisknop ingedrukt?',
    'key %key pressed?':
        'Toest %key ingedrukt?',
    'distance to %dst':
        'Afstand tot %dst',
    'reset timer':
        'herstart timer',
    'timer':
        'timer',
    '%att of %spr':
        '%att van %spr',
    'http:// %s':
        'http:// %s',
    'turbo mode?':
        'Turbomode?',
    'set turbo mode to %b':
        'Zet Turbomode op %b',

    'filtered for %clr':
        'volgens %clr gefiltert',
    'stack size':
        'Stapelgrootte',
    'frames':
        'beelden',

    // operators:
    '%n mod %n':
        '%n modulo %n',
    'round %n':
        '%n afgerond',
    '%fun of %n':
        '%fun van %n',
    'pick random %n to %n':
        'willekeurig getal van %n tot %n',
    '%b and %b':
        '%b en %b',
    '%b or %b':
        '%b of %b',
    'not %b':
        'niet %b',
    'true':
        'waar',
    'false':
        'vals',
    'join %words':
        'verbind %words',
    'hello':
        'Hallo',
    'world':
        'Wereld',
    'letter %n of %s':
        'Letter %n van %s',
    'length of %s':
        'Lengte van %s',
    'unicode of %s':
        'Unicode waarde van %s',
    'unicode %n as letter':
        'Unicode %n als hoofdletter',
    'type of %s':
        'Type van %s',

    // variables:
    'Make a variable':
        'Maak een variabele',
    'Variable name':
        'variabelenaam',
    'Script variable name':
        'Scriptvariabelenaam',
    'Delete a variable':
        'Variabele wissen',

    'set %var to %s':
        'stel %var gelijk aan %s',
    'change %var by %n':
        'Wijzig %var met %n',
    'show variable %var':
        'toon variabele %var',
    'hide variable %var':
        'verberg variabele %var',
    'script variables %scriptVars':
        'scriptvariabelen %scriptVars',

    // lists:
    'list %exp':
        'Lijst %exp',
    '%s in front of %l':
        '%s voor %l',
    'item %idx of %l':
        'Element %idx van %l',
    'all but first of %l':
        'alle behalve de eerste van %l',
    'length of %l':
        'lengte van %l',
    '%l contains %s':
        '%l bevat %s',
    'thing':
        'ding',
    'add %s to %l':
        'Tel %s bij %l op',
    'delete %ida of %l':
        'verwijder %ida van %l',
    'insert %s at %idx of %l':
        'Voeg %s op plaats %idx aan %l toe',
    'replace item %idx of %l with %s':
        'vervang element %idx in %l door %s',

    // other
    'Make a block':
        'maak een blok',

    // menus
    // snap menu
    'About...':
        'Over Snap!...',
    'Reference manual':
        'Handboek',
    'Snap! website':
        'Snap! Website',
    'Download source':
        'broncode downloaden',
    'Switch back to user mode':
        'terug naar gebruikersmode',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'verlaat Morphic context menus\nen toon gebruiksvriendelijke menus',
    'Switch to dev mode':
        'overschakelen naar hackermode',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'gebruik Morphic\ncontext menus\nen inspectors,\nniet gebruiksvriendelijk!',

    // project menu
    'Project notes...':
        'Projektnotities...',
    'New':
        'Nieuw',
    'Open...':
        'Openen...',
    'Save':
        'opslaan',
    'Save As...':
        'Opslaan als...',
    'Import...':
        'Importeren...',
    'file menu import hint':
        'bestandsmenu import hint',
    'Export project as plain text...':
        'Project exporteren als tekst...',
    'Export project...':
        'Project exporteren...',
    'show project data as XML\nin a new browser window':
        'Toon project gegevens als XML\nin een nieuw browservenster',
    'Export blocks...':
        'Blokken exporteren...',
    'show global custom block definitions as XML\nin a new browser window':
        'Toon globale custom blokdefinities\nals XML in browser',
    'Import tools':
        'Tools laden',
    'load the official library of\npowerful blocks':
        'laden van officiele bibliotheek\nmet krachtige blokken',
    'Libraries...':
        'Bibiliotheek...',
    'Import library':
        'Bibliotheek importeren',

    // cloud menu
    'Login...':
        'Aanmelden...',
    'Signup...':
        'Gebruikersaccount aanmaken...',

    // settings menu
    'Language...':
        'Taal...',
    'Zoom blocks...':
        'Blokken inzoomen...',
    'Blurred shadows':
        'Onscherpe schaduwen',
    'uncheck to use solid drop\nshadows and highlights':
        'Uitvinken om volle schaduwen \nen highlights te krijgen',
    'check to use blurred drop\nshadows and highlights':
        'Aanvinken om onscherpe schaduwen \nen highlights te krijgen',
    'Zebra coloring':
        'Zebrakleuren',
    'check to enable alternating\ncolors for nested blocks':
        'Aanvinken voor afwisselende kleuren\n voor geneste blokken',
    'uncheck to disable alternating\ncolors for nested block':
        'Uitvinken om afwisselende \nkleuren voor geneste blokken uit te schakelen',
    'Dynamic input labels':
        'Dynamische input labels',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'Uitvinken verhindert dynamische labels\nvoor meervaksingave',
    'check to enable dynamic\nlabels for variadic inputs':
        'Aanvinken voor dynamische labels\nvoor meervaksingave',
    'Prefer empty slot drops':
        'Voorkeur voor lege plaatshouders',
    'settings menu prefer empty slots hint':
        'Instellingen menu voorkeuren lege plaasthouders',
    'uncheck to allow dropped\nreporters to kick out others':
        'Uitschakelen opm toe te laten dat lege reporters\n anderen buitengooit',
    'Long form input dialog':
        'Lang formulier input dialoog',
    'check to always show slot\ntypes in the input dialog':
        'aanvinken om data type in\ninputdialoog te zien',
    'uncheck to use the input\ndialog in short form':
        'uitvinken voor verkorte inputdialoog',
    'Virtual keyboard':
        'Virtueel toetsenbord',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'uitvinken om het virtueel toetsenbord uit te schakelen voor mobiele toestellen',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'aanvinken om het virtueel toetsenbord in te schekelen voor mobiele toestellen',
    'Input sliders':
        'invoer schuifbalk',
    'uncheck to disable\ninput sliders for\nentry fields':
        'uitvinken om schuifbalken voor invoer uit te schakelen',
    'check to enable\ninput sliders for\nentry fields':
        'aanvinken om schuifbalken voor invoer in te schakelen',
    'Clicking sound':
        'Klikgeluid',
    'uncheck to turn\nblock clicking\nsound off':
        'uitvinken om klikgeluiden uit te schakelen',
    'check to turn\nblock clicking\nsound on':
        'aanvinken om geluid bij blokrotatie in te schakelen',
    'Animations':
        'Animaties',
    'uncheck to disable\nIDE animations':
        'uitvinken om IDE animaties uit te schakelen',
    'Turbo mode':
        'Turbomode',
    'check to prioritize\nscript execution':
        'aanvinken om scriptuitvoering prioriteit te geven',
    'uncheck to run scripts\nat normal speed':
        'uitvinken voor scripuitvoering op normale snelheid',
    'check to enable\nIDE animations':
        'aanvinken om IDE animaties toe te laten',
    'Thread safe scripts':
        'Thread veilige scripts',
    'uncheck to allow\nscript reentrance':
        'uitvinken om toe te laten dat\nniet afgewerkte scripts opnieuw gestart worden',
    'check to disallow\nscript reentrance':
        'aanvinken om te verhinderen dat\nniet afgewerkte scripts opnieuw gestart worden',
    'Prefer smooth animations':
        'Voorkeur voor vloeiende animatie',
    'uncheck for greater speed\nat variable frame rates':
        'uitvinken voor groetere snelheid\nbij variabele frame rates',
    'check for smooth, predictable\nanimations across computers':
        'aanvinken voor vloeiende\nvoorspelbare animaties tussen computers',

    // inputs
    'with inputs':
        'met inputs',
    'input names:':
        'input namen:',
    'Input Names:':
        'Input Namen:',
    'input list:':
        'inputlijst:',

    // context menus:
    'help':
        'Help',

    // palette:
    'hide primitives':
        'basisblokken verbergen',
    'show primitives':
        'basisblokken tonen',

    // blocks:
    'help...':
        'Help...',
    'relabel...':
        'Herbenoemen...',
    'duplicate':
        'Dupliceren',
    'make a copy\nand pick it up':
        'maak een kopie en selecteer dit blok',
    'only duplicate this block':
        'blok alleen dupliceren',
    'delete':
        'Wissen',
    'script pic...':
        'Scriptafbeelding...',
    'open a new window\nwith a picture of this script':
        'open een nieuw venster\nmet de afbeelding van dit script',
    'ringify':
        'ringify',
    'unringify':
        'unringify',

    // custom blocks:
    'delete block definition...':
        'Wis blokdefinitie',
    'edit...':
        'editeren...',

    // sprites:
    'edit':
        'Editeren',
    'export...':
        'Exporteren...',

    // stage:
    'show all':
        'Toon alles',
    'pic...':
        'afbeelding...',
    'open a new window\nwith a picture of the stage':
        'open een nieuw browservenster met een afbeelding op het toneel',

    // scripting area
    'clean up':
        'Opruimen',
    'arrange scripts\nvertically':
        'scripts verticaal ordenen',
    'add comment':
        'opmerking toevoegen',
    'scripts pic...':
        'afbeelding voor scripts...',
    'open a new window\nwith a picture of all scripts':
        'open een nieuw venster met \nscriptafbeelding op het toneel',
    'make a block...':
        'blok aanmaken...',

    // costumes
    'rename':
        'Hernoemen',
    'export':
        'Exporteren',
    'rename costume':
        'Kostuum hernoemen',

    // sounds
    'Play sound':
        'geluid afspelen',
    'Stop sound':
        'geluid stoppen',
    'Stop':
        'Stop',
    'Play':
        'Speel',
    'rename sound':
        'Geluid hernoemen',

    // dialogs
    // buttons
    'OK':
        'OK',
    'Ok':
        'OK',
    'Cancel':
        'Annuleren',
    'Yes':
        'Ja',
    'No':
        'Neen',

    // help
    'Help':
        'Help',

    // zoom blocks
    'Zoom blocks':
        'Blok inzoomen',
    'build':
        'bouwen',
    'your own':
        'eigen',
    'blocks':
        'Blokken',
    'normal (1x)':
        'normaal (1x)',
    'demo (1.2x)':
        'Demo (1.2x)',
    'presentation (1.4x)':
        'Presentatie (1.4x)',
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
        'Onbenoemd',
    'Open Project':
        'Project openen',
    '(empty)':
        '(leeg)',
    'Saved!':
        'Opgeslagen!',
    'Delete Project':
        'Projekt wissen',
    'Are you sure you want to delete':
        'Ben je zeker dat je wilt wissen?',
    'rename...':
        'Hernoemen...',

    // costume editor
    'Costume Editor':
        'Kostuumeditor',
    'click or drag crosshairs to move the rotation center':
        'Klik of sleep kruisdraden om rotatiecentrum te verplaatsen',

    // project notes
    'Project Notes':
        'Projectnotities',

    // new project
    'New Project':
        'Nieuw Project',
    'Replace the current project with a new one?':
        'Vervang huidig project door een nieuw?',

    // save project
    'Save Project As...':
        'Project opslaan als...',

    // export blocks
    'Export blocks':
        'Blokken exporteren',
    'Import blocks':
        'Blokken importeren',
    'this project doesn\'t have any\ncustom global blocks yet':
        'Dit project bevat nog geen \nglobale blokken',
    'select':
        'Kiezen',
    'all':
        'alle',
    'none':
        'niets',

    // variable dialog
    'for all sprites':
        'met alle objecten',
    'for this sprite only':
        'alleen met dit object',

    // block dialog
    'Change block':
        'Blok aanpassen',
    'Command':
        'Opdracht',
    'Reporter':
        'Functie',
    'Predicate':
        'Predicaat',

    // block editor
    'Block Editor':
        'Blokeditor',
    'Apply':
        'Toepassen',

    // block deletion dialog
    'Delete Custom Block':
        'Blok wissen',
    'block deletion dialog text':
        'Moet dit blok met al zijn instanties gewist worden?',

    // input dialog
    'Create input name':
        'invoernaam',
    'Edit input name':
        'invoernaam bewerken',
    'Edit label fragment':
        'label fragment bewerken',
    'Title text':
        'Titel',
    'Input name':
        'Invoernaam',
    'Delete':
        'Wissen',
    'Object':
        'Object',
    'Number':
        'getal',
    'Text':
        'Tekst',
    'List':
        'Lijst',
    'Any type':
        'Elk type',
    'Boolean (T/F)':
        'Booleaans (W/V)',
    'Command\n(inline)':
        'Opdracht (inline)',
    'Command\n(C-shape)':
        'Opdracht (C-Form)',
    'Any\n(unevaluated)':
        'Alle\n(ongeevalueerd)',
    'Boolean\n(unevaluated)':
        'Booleaans\n(ongeevalueerd)',
    'Single input.':
        'Enkelvoudige invoer.',
    'Default Value:':
        'Standaardwaarde:',
    'Multiple inputs (value is list of inputs)':
        'Meervoudige invoer (als Lijst)',
    'Upvar - make internal variable visible to caller':
        'Interne Variabele zichtbaar maken',

    // About Snap
    'About Snap':
        'Over Snap',
    'Back...':
        'Terug...',
    'License...':
        'Licentie...',
    'Modules...':
        'Componenten...',
    'Credits...':
        'Credits...',
    'Translators...':
        'Vertalers',
    'License':
        'Licentie',
    'current module versions:':
        'huidige Component-Versies',
    'Contributors':
        'Medewerkers',
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
        'Minimale waarde...',
    'slider max...':
        'Maximale waarde...',
    'import...':
        'Importiren...',
    'Slider minimum value':
        'Minimumlwaarde van de schuifbalk',
    'Slider maximum value':
        'Maximumwaarde van de schuifbalk',

    // list watchers
    'length: ':
        'Lengte: ',

    // coments
    'add comment here...':
        'commentaar hier toevoegen',

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
        'Muisaanwijzer',
    'edge':
        'Rand',
    'pen trails':
        'Penspoor',

    // costumes
    'Turtle':
        'schildpad',
    'Empty':
        'Leeg',

    // graphical effects
    'ghost':
        'Doorzichtigheid',

    // keys
    'space':
        'Spatie',
    'up arrow':
        'Pijl omhoog',
    'down arrow':
        'Pijl omlaag',
    'right arrow':
        'Pijl naar rechts',
    'left arrow':
        'Pijl naar links',
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
        'Nieuw...',

    // math functions
    'abs':
        'Geheel',
    'floor':
        'Afgerond',
    'sqrt':
        'Vierkantswortel',
    'sin':
        'sin',
    'cos':
        'cos',
    'tan':
        'tan',
    'asin':
        'bgsin',
    'acos':
        'bgcos',
    'atan':
        'bgtan',
    'ln':
        'ln',
    'e^':
        'e^',

    // data types
    'number':
        'Getal',
    'text':
        'Tekst',
    'Boolean':
        'Booleaans',
    'list':
        'Lijst',
    'command':
        'Opdracht',
    'reporter':
        'Functie',
    'predicate':
        'Predicaat',

    // list indices
    'last':
        'laatste',
    'any':
        'alle'
};

