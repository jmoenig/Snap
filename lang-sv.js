/*

    lang-sv.js

    Swedish translation for SNAP!

    written by Erik A Olsson

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

SnapTranslator.dict.sv = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    ¯ , \u00F8
    Ê , \u00E6
    Â , \u00E5
    ÿ , \u00D8
    ∆ ; \u00C6
    ≈ , \u00C5
*/

    // translations meta information
    'language_name':
        'svenska', // the name as it should appear in the language menu
    'language_translator':
        'Erik A Olsson', // your name for the Translators tab
    'translator_e-mail':
        'eolsson@gmail.com', // optional
    'last_changed':
        '2014-11-01', // this, too, will appear in the Translators tab

    // GUI
    // control bar:
    'untitled':
        'namnlös',
    'development mode':
        'utvecklareläge',

    // categories:
    'Motion':
        'Rörelse',
    'Looks':
        'Utseende',
    'Sound':
        'Ljud',
    'Pen':
        'Penna',
    'Control':
        'Kontroll',
    'Sensing':
        'Känna av',
    'Operators':
        'Operatorer',
    'Variables':
        'Variabler',
    'Lists':
        'Listor',
    'Other':
        'Annat',

    // editor:
    'draggable':
        'flyttbar',

    // tabs:
    'Scripts':
        'Skript',
    'Costumes':
        'Kostymer',
    'Sounds':
        'Ljud',

    // names:
    'Sprite':
        'Sprite',
    'Stage':
        'Scen',

    // rotation styles:
    'don\'t rotate':
        'rotera inte',
    'can rotate':
        'rotera',
    'only face left/right':
        'peka bara höger/vänster',

    // new sprite button:
    'add a new Sprite':
        'lägg till ny Sprite',

    // tab help
    'costumes tab help':
        'kostymflikshjälp',

    'import a sound from your computer\nby dragging it into here':
        'importera en ljudfil från din dator\ngenom att dra den hit',

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
        'Scen vald:\ninga standard rörelser'
            + 'finns',
    'move %n steps':
        'gå %n steg',
    'turn %clockwise %n degrees':
        'vänd %clockwise %n grader',
    'turn %counterclockwise %n degrees':
        'vänd %counterclockwise %n grader',
    'point in direction %dir':
        'peka mot riktning %dir',
    'point towards %dst':
        'peka mot %dst',
    'go to x: %n y: %n':
        'gå till x: %n y: %n',
    'go to %dst':
        'gå till %dst',
    'glide %n secs to x: %n y: %n':
        'glid %n sek till x: %n y: %n',
    'change x by %n':
        'ändra x med %n',
    'set x to %n':
        'sätt x till %n',
    'change y by %n':
        'ändra y med %n',
    'set y to %n':
        'sätt y till %n',
    'if on edge, bounce':
        'studsa om vid kanten',
    'x position':
        'x-position',
    'y position':
        'y-position',
    'direction':
        'riktning',

    // looks:
    'switch to costume %cst':
        'byt till kostym %cst',
    'next costume':
        'nästa kostym',
    'costume #':
        'kostym nr.',
    'say %s for %n secs':
        'säg %s i %n sek',
    'say %s':
        'säg %s',
    'think %s for %n secs':
        'tänk %s i %n sek',
    'think %s':
        'tänk %s',
    'Hello!':
        'Hej!',
    'Hmm...':
        'Hmm...',
    'change %eff effect by %n':
        'ändra %eff -effekt med %n',
    'set %eff effect to %n':
        'sätt %eff -effekt til %n',
    'clear graphic effects':
        'nollställ grafiska effekter',
    'change size by %n':
        'ändra storlek med %n',
    'set size to %n %':
        'sätt storlek till %n %',
    'size':
        'storlek',
    'show':
        'visa',
    'hide':
        'göm',
    'go to front':
        'lägg överst',
    'go back %n layers':
        'flytta %n lager bakåt',

    'development mode \ndebugging primitives:':
        'utvecklarläge \nDebugging av block',
    'console log %mult%s':
        'skriv till konsoll: %mult%s',
    'alert %mult%s':
        'Pop-up: %mult%s',

    // sound:
    'play sound %snd':
        'spela ljud %snd',
    'play sound %snd until done':
        'spela ljud %snd tills färdig',
    'stop all sounds':
        'stoppa alla ljud',
    'rest for %n beats':
        'pausa %n slag',
    'play note %n for %n beats':
        'spela ton %n i %n slag',
    'change tempo by %n':
        'ändra tempo med %n',
    'set tempo to %n bpm':
        'sätt tempo till %n bpm',
    'tempo':
        'tempo',

    // pen:
    'clear':
        'rensa',
    'pen down':
        'penna ned',
    'pen up':
        'penna upp',
    'set pen color to %clr':
        'sätt pennfärg till %clr',
    'change pen color by %n':
        'ändra pennfärg till %n',
    'set pen color to %n':
        'sätt penfärg till %n',
    'change pen shade by %n':
        'ändra pennstyrka med %n',
    'set pen shade to %n':
        'sätt pennstyrka till %n',
    'change pen size by %n':
        'ändra penntjocklek med %n',
    'set pen size to %n':
        'sätt penntjocklek til %n',
    'stamp':
        'stämpla',

    // control:
    'when %greenflag clicked':
        'när %greenflag klickas på',
    'when %key key pressed':
        'när tangent %key trycks ned',
    'when I am clicked':
        'när jag klickas',
    'when I receive %msg':
        'när jag tar emot meddelande %msg',
    'broadcast %msg':
        'skicka meddelande %msg',
    'broadcast %msg and wait':
        'skicka meddelande %msg och vänta',
    'Message name':
        'Meddelandets namn',
    'wait %n secs':
        'vänta %n sek',
    'wait until %b':
        'vänta tills %b',
    'forever %c':
        'för alltid %c',
    'repeat %n %c':
        'upprepa %n gånger %c',
    'repeat until %b %c':
        'upprepa tills %b %c',
    'if %b %c':
        'om %b %c',
    'if %b %c else %c':
        'om %b %c då %c',
    'report %s':
        'returnera %s',
    'stop block':
        'stoppa block',
    'stop script':
        'stoppa skript',
    'stop all %stop':
        'stoppa alla %stop',
    'pause all %pause':
        'pausa alla %pause',

    'run %cmdRing %inputs':
        'kör %cmdRing med %inputs',
    'launch %cmdRing %inputs':
        'starta %cmdRing med %inputs',
    'call %repRing %inputs':
        'anropa %repRing med %inputs',
    'run %cmdRing w/continuation':
        'kör %cmdRing och fortsätt',
    'call %cmdRing w/continuation':
        'anropa %cmdRing och fortsätt',
    'when I start as a clone':
        'när jag startar som klon',
    'create a clone of %cln':
        'skapa klon av %cln',
    'myself':
        'mig själv',
    'delete this clone':
        'radera klon',


    'warp %c':
        'warp %c',

    // sensing:
    'touching %col ?':
        'rör %col ?',
    'touching %clr ?':
        'rör %clr ?',
    'color %clr is touching %clr ?':
        'färgen %clr rör %clr ?',
    'ask %s and wait':
        'fråga %s och vänta',
    'what\'s your name?':
        'vad heter du?',
    'answer':
        'svar',
    'mouse x':
        'mus x-pos',
    'mouse y':
        'mus y-pos',
    'mouse down?':
        'musknapp nedtryckt?',
    'key %key pressed?':
        'tangent %key nedtryckt?',
    'distance to %dst':
        'avstånd till %dst',
    'reset timer':
        'nollställ stoppur',
    'timer':
        'stoppur',
    'http:// %s':
        'http:// %s',

    'turbo mode?':
        'turboläge?',
    'set turbo mode to %b':
        'sätt turboläge till %b',


    'filtered for %clr':
        'filtrera på %clr',
    'stack size':
        'stack-storlek',
    'frames':
        'ramar',

    // operators:
    '%n mod %n':
        '%n mod %n',
    'round %n':
        'avrunda %n',
    '%fun av %n':
        '%fun von %n',
    'pick random %n to %n':
        'slumptal från %n till %n',
    '%b and %b':
        '%b och %b',
    '%b or %b':
        '%b eller %b',
    'not %b':
        'inte %b',
    'true':
        'sant',
    'false':
        'falskt',
    'join %words':
        'slå ihop %words',
    'hello':
        'hej',
    'world':
        'världen',
    'letter %n of %s':
        'bokstav %n av %s',
    'length of %s':
        'lengde av %s',
    'unicode of %s':
        'unicode av %s',
    'unicode %n as letter':
        'unicode %n som bokstav',
    'is %s a %typ ?':
        '%s är %typ ?',
    'is %s identical to %s ?':
        '%s identisk med %s ?',

    'type of %s':
        'type %s',

    // variables:
    'Make a variable':
        'Ny variabel',
    'Variable name':
        'Variabelnamn',
    'Delete a variable':
        'Radera variabel',

    'set %var to %s':
        'sätt %var till %s',
    'change %var by %n':
        'ändra %var med %n',
    'show variable %var':
        'visa variabel %var',
    'hide variable %var':
        'göm variabel %var',
    'script variables %scriptVars':
        'skriptvariabel %scriptVars',

    // lists:
    'list %exp':
        'lista %exp',
    '%s in front of %l':
        '%s främst i %l',
    'item %idx of %l':
        'element %idx i %l',
    'all but first of %l':
        'allt utom första i %l',
    'length of %l':
        'längd av %l',
    '%l contains %s':
        '%l innehåller %s',
    'thing':
        'sak',
    'add %s to %l':
        'lägg %s till %l',
    'delete %ida of %l':
        'radera %ida från %l',
    'insert %s at %idx of %l':
        'lägg in %s på plats %idx i lista %l',
    'replace item %idx of %l with %s':
        'ersätt element %idx i %l med %s',

    // other
    'Make a block':
        'Skapa nytt block',

    // menus
    // snap menu
    'About...':
        'Om Snap!...',
    'Snap! website':
        'Snap! webbsida',
    'Download source':
        'Ladda ner källkoden',
    'Switch back to user mode':
        'Tillbaka till användarläge',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'stäng av Morphic\nmenyeroch visa \nanvändarvänliga istället',
    'Switch to dev mode':
        'Byt till utvecklarläge',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'aktivera Morphic menyer\noch inspektorer,\ninte användarvänligt!',

    // project menu
    'Project notes...':
        'Annoteringar...',
    'New':
        'Ny',
    'Open...':
        'Öppna...',
    'Save':
        'Spara',
    'Save As...':
        'Spara som...',
    'Import...':
        'Importera...',
    'file menu import hint':
        'laster inn eksportertes prosjekt,\net bibliotek med '
            + 'blokker\n'
            + 'et kostym eller en lyd',
    'Export project as plain text ...':
        'Exportera projektet som vanlig text...',
    'Export project...':
        'Exportera projekt...',
    'show project data as XML\nin a new browser window':
        'visa projektdata som XML\ni ett ny fönster',
    'Export blocks...':
        'Exportera block...',
    'show global custom block definitions as XML\nin a new browser window':
        'visa globala anpassade blockdefinitioner som XML\ni ett nytt fönster',
    'Import tools...':
        'Importverktyg...',
    'load the official library of\npowerful blocks':
        'ladda ner det officiella\nsuperblock biblioteket ',
    'Libraries...':
        'Biblioteker...',
    'Import library':
        'Importera bibliotek',

 // cloud menu
    'Login...':
        'Logga in...',
    'Registrer deg...':
        'Registrera dig...',

    // settings menu
    'Language...':
        'Språk...',
    'Zoom blocks...':
        'Förstora blocken...',
    'Blurred shadows':
        'Suddade skuggor',
    'uncheck to use solid drop\nshadows and highlights':
        'bocka av för att använda\nfasta skuggor och belysningar',
    'check to use blurred drop\nshadows and highlights':
        'bocka i för att använda\nsuddiga skuggor och belysningar',
    'Zebra coloring':
        'Zebrafärgning',
    'check to enable alternating\ncolors for nested blocks':
        'bocka i för att växla blockfärger\nför nestlade block',
    'uncheck to disable alternating\ncolors for nested block':
        'bocka av för inaktivera växlade\nfärger för nestlade block',
    'Dynamic input labels':
        'Dynamisk namn för indata',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'bocka av för att inaktivera \ndynamiska namn för indata \nmed flera variabelfält',
    'check to enable dynamic\nlabels for variadic inputs':
        'bocka i för att aktivera \ndynamiska namn för indata \nmed flera variabelfält',
    'Prefer empty slot drops':
        'Föredra släpp på tomma utrymmen',
    'settings menu prefer empty slots hint':
        'Inställningar\nföredra tomma utrymmen',
    'uncheck to allow dropped\nreporters to kick out others':
        'kryss vekk for at flyttede reportere vil ta plassen til andre\n',
    'Long form input dialog':
        'Lange dialoger for inndata',
    'check to always show slot\ntypes in the input dialog':
        'kryss av for \u00E5 vise variabelfelttype\ni inndata dialoger',
    'uncheck to use the input\ndialog in short form':
        'kryss vekk for \u00E5 bruke korte inndata\ndialoger',
    'Virtual keyboard':
        'Virtuelt tastatur',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'kryss vekk for \u00E5 sl\u00E5 av virtuelt\ntastatur p\u00E5 mobile enheter',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'kryss av for \u00E5 sl\u00E5 p\u00E5 virtuelt\ntastatur p\u00E5 mobile enheter',
    'Input sliders':
        'Volymkontroll för indata',
    'uncheck to disable\ninput sliders for\nentry fields':
        'kryss vekk for \u00E5 sl\u00E5 av\nskyveknapper i inndatafelt',
    'check to enable\ninput sliders for\nentry fields':
        'kryss av for \u00E5 sl\u00E5 p\u00E5 skyveknapper\ni inndatafelt',
    'Clicking sound':
        'Klickljud',
    'uncheck to turn\nblock clicking\nsound off':
        'kryss vekk for sl\u00E5 av klikkelyd',
    'check to turn\nblock clicking\nsound on':
        'kryss av for \u00E5 sl\u00E5 p\u00E5 klikkelyd',
    'Animations':
        'Animationer',
    'uncheck to disable\nIDE animations':
        'kryss vekk for \u00E5 sl\u00E5 av IDE-animasjoner',
    'Turbo mode':
        'Turboläge',
    'check to enable\nIDE animations':
        'kryss av for \u00E5 sl\u00E5 p\u00E5 IDE-animasjoner',
    'Thread safe scripts':
        'Trådsäker skripting',
    'uncheck to allow\nscript reentrancy':
        'kryss vekk for \u00E5 sl\u00E5 p\u00E5 gjenbruk av p\u00E5begynte skripter',
    'check to disallow\nscript reentrancy':
        'kryss av for \u00E5 sl\u00E5 av gjenbruk av p\u00E5begynte skripter',
    'Prefer smooth animations':
        'Föredra jämna animeringar',
    'uncheck for greater speed\nat variable frame rates':
        'kryss bort for st¯rre fart ved variabel frame rate',
    'check for smooth, predictable\nanimations across computers':
        'kryss av for jevne animasjoner pÂ alle maskinplattformer',
// inputs
    'with inputs':
        'med indata',
    'input names:':
        'indatanamn:',
    'Input Names:':
        'Indatanamn:',
    'input list:':
        'indata lista:',

    // context menus:
    'help':
        'hjälp',

    // blocks:
    'hjelp...':
        'hjälp...',
    'relabel...':
        'döp om...',
    'duplicate':
        'duplicera',
    'make a copy\nand pick it up':
        'gör en kopia\noch plocka upp den',
    'only duplicate this block':
        'duplicera endast detta block',
    'delete':
        'radera',
    'script pic...':
        'skript bild...',
    'open a new window\nwith a picture of this script':
        'öppna ett nytt fönster\nmed en bild av detta skript',
    'ringify':
        'ring runt',
    'unringify':
        'radera ringen runt',

    // custom blocks:
    'delete block definition...':
        'radera blockdefinition...',
    'edit...':
        'redigera...',

    // sprites:
    'edit':
        'redigera',
    'export...':
        'exportera...',

    // stage:
    'show all':
        'visa allt',

    // scripting area
    'clean up':
        'städa',
    'arrange scripts\nvertically':
        'organisera skript\nvertikalt',
    'add comment':
        'lägg till kommentar',
    'make a block...':
        'skapa nytt block...',

    // costumes
    'rename':
        'döp om',
    'export':
        'exportera',
    'rename costume':
        'döp om kostymen',

    // sounds
    'Play sound':
        'Spela ljud',
    'Stop sound':
        'Stoppa ljud',
    'Stop':
        'Stoppa',
    'Play':
        'Starta',
    'rename sound':
        'döp om ljud',

    // dialogs
    // buttons
    'OK':
        'OK',
    'Ok':
        'OK',
    'Cancel':
        'Avbryt',
    'Yes':
        'Ja',
    'No':
        'Nej',

    // help
    'Help':
        'Hjälp',

    // Project Manager
    'Untitled':
        'Namnlös',
    'Open Project':
        'Öppna projekt',
    '(empty)':
        '(tomt)',
    'Saved!':
        'Sparat!',
    'Delete Project':
        'Radera projekt',
    'Are you sure you want to delete':
        'Är du säker på att du vill radera',
    'rename...':
        'döp om...',

    // costume editor
    'Costume Editor':
        'Kostym redigerare',
    'click or drag crosshairs to move the rotation center':
        'Klicka eller dra krysset för att marker mitten',

    // project notes
    'Project Notes':
        'Annoteringar',

    // new project
    'New Project':
        'Nytt projekt',
    'Replace the current project with a new one?':
        'Ersätt aktuella projektet med ett nytt?',

    // save project
    'Save Project As...':
        'Spara projekt som...',

    // export blocks
    'Export blocks':
        'Exportera block',
    'Import blocks':
        'Importera block',
    'this project doesn\'t have any\ncustom global blocks yet':
        'detta projekt har inte ännu\nnågra egna globala block',
    'select':
        'välj',
    'all':
        'allt',
    'none':
        'ingenting',

    // variable dialog
    'for all sprites':
        'för alla sprites',
    'for this sprite only':
        'bara för denna sprite',

    // block dialog
    'Change block':
        'Ändra block',
    'Command':
        'Styring',
    'Reporter':
        'Funksjon',
    'Predicate':
        'Predikat',

    // block editor
    'Block Editor':
        'Blockredigerare',
    'Apply':
        'Verkställ',

    // block deletion dialog
    'Delete Custom Block':
        'Slett custom blokk',
    'block deletion dialog text':
        'Skal denne blokken med alle dens instanser\n' +
            'bli slettet?',

    // input dialog
    'Create input name':
        'Lag inndata navn',
    'Edit input name':
        'Rediger inndata navn',
    'Edit label fragment':
        'Rediger label fragment',
    'Title text':
        'Tittel',
    'Input name':
        'Inndata navn',
    'Delete':
        'Slett',
    'Object':
        'Objekt',
    'Number':
        'Tall',
    'Text':
        'Tekst',
    'List':
        'Liste',
    'Any type':
        'Type valgfritt',
    'Boolean (T/F)':
        'Boolsk (S/U)',
    'Command\n(inline)':
        'Kommando\n(inline)',
    'Command\n(C-shape)':
        'Kommando\n(C-Form)',
    'Any\n(unevaluated)':
        'Hvilken som helst\n(uevaluert)',
    'Boolean\n(unevaluated)':
        'Boolsk\n(uevaluert)',
    'Single input.':
        'Singel inndata.',
    'Default Value:':
        'Standardverdi:',
    'Multiple inputs (value is list of inputs)':
        'Fler-inndata (verdi er liste over inndata)',
    'Upvar - make internal variable visible to caller':
        'Upvar - gj\u00F8r interne variable synlig for den som kaller',

    // About Snap
    'About Snap':
        'Om Snap',
    'Back...':
        'Tillbaka...',
    'License...':
        'Licens...',
    'Modules...':
        'Moduler...',
    'Credits...':
        'Tack till...',
    'Translators...':
        'Översättare',
    'License':
        'Licens',
    'current module versions:':
        'Modulversioner',
    'Contributors':
        'Bidragsgivare',
    'Translations':
        'Översättningar',

    // variable watchers
    'normal':
        'normal',
    'large':
        'stor',
    'slider':
        'volymkontroll',
    'slider min...':
        'volymkontroll min...',
    'slider max...':
        'volymkontroll max...',
    'import...':
        'importera...',
    'Slider minimum value':
        'Volymkontroll - minsta värde',
    'Slider maximum value':
        'volymkontroll - högsta värde',

    // list watchers
    'length: ':
        'längd: ',

    // coments
    'add comment here...':
        'lägg till kommentar här...',

    // drow downs
    // directions
    '(90) right':
        '(90) höger',
    '(-90) left':
        '(-90) vänster',
    '(0) up':
        '(0) upp',
    '(180) down':
        '(180) ned',

    // collision detection
    'mouse-pointer':
        'muspekare',
    'edge':
        'kant',
    'pen trails':
        'pennspår',

    // costumes
    'Turtle':
        'Sköldpadda',

    // graphical effects
    'ghost':
        'genomskinligt',

    // keys
    'space':
        'mellanslag',
    'up arrow':
        'pil upp',
    'down arrow':
        'pil ned',
    'right arrow':
        'pil höger',
    'left arrow':
        'pil vänster',
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
        'abs',
    'sqrt':
        'kvadrat',
    'sin':
        'sin',
    'cos':
        'cos',
    'tan':
        'tan',
    'asin':
        'arc-1',
    'acos':
        'cos-1',
    'atan':
        'tan-1',
    'ln':
        'ln',
    'e^':
        'e^',

    // data types
    'number':
        'tal',
    'text':
        'text',
    'Boolean':
        'boolean',
    'list':
        'lista',
    'command':
        'kommando',
    'reporter':
        'funktionsblock',
    'predicate':
        'predikat',

    // list indices
    'last':
        'sista',
    'any':
        'vilken som helst'
};
