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

    å , \u00E5
    ä , \u00E4
    ö , \u00F6
    Å , \u00C5
    Ä ; \u00C4
    Ö , \u00D6
*/

    // translations meta information
    'language_name':
        'svenska', // the name as it should appear in the language menu
    'language_translator':
        'Erik A Olsson', // your name for the Translators tab
    'translator_e-mail':
        'eolsson@gmail.com', // optional
    'last_changed':
        '2016-06-09', // this, too, will appear in the Translators tab

    // GUI
    // control bar:
    'untitled':
        'namnl\u00F6s',
    'development mode':
        'utvecklarel\u00E4ge',

    // categories:
    'Motion':
        'R\u00F6relse',
    'Looks':
        'Utseende',
    'Sound':
        'Ljud',
    'Pen':
        'Penna',
    'Control':
        'Kontroll',
    'Sensing':
        'K\u00E4nna av',
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
        'peka bara h\u00F6ger/v\u00E4nster',

    // new sprite button:
    'add a new Sprite':
        'l\u00E4gg till ny Sprite',

    // tab help
    'costumes tab help':
        'importera en bild fr\u00E5n en annan webbsida eller fr\u00E5n\nen fil p\u00E5 din dator genom att dra den hit',

    'import a sound from your computer\nby dragging it into here':
        'importera en ljudfil fr\u00E5n din dator\ngenom att dra den hit',

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
        'Scen vald:\ninga standard r\u00F6relser'
            + 'finns',
    'move %n steps':
        'g\u00E5 %n steg',
    'turn %clockwise %n degrees':
        'v\u00E4nd %clockwise %n grader',
    'turn %counterclockwise %n degrees':
        'v\u00E4nd %counterclockwise %n grader',
    'point in direction %dir':
        'peka mot riktning %dir',
    'point towards %dst':
        'peka mot %dst',
    'go to x: %n y: %n':
        'g\u00E5 till x: %n y: %n',
    'go to %dst':
        'g\u00E5 till %dst',
    'glide %n secs to x: %n y: %n':
        'glid %n sek till x: %n y: %n',
    'change x by %n':
        '\u00E4ndra x med %n',
    'set x to %n':
        's\u00E4tt x till %n',
    'change y by %n':
        '\u00E4ndra y med %n',
    'set y to %n':
        's\u00E4tt y till %n',
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
        'n\u00E4sta kostym',
    'costume #':
        'kostym nr.',
    'costume name':
        'kostymnamn',
    'say %s for %n secs':
        's\u00E4g %s i %n sek',
    'say %s':
        's\u00E4g %s',
    'think %s for %n secs':
        't\u00E4nk %s i %n sek',
    'think %s':
        't\u00E4nk %s',
    'Hello!':
        'Hej!',
    'Hmm...':
        'Hmm...',
    'change %eff effect by %n':
        '\u00E4ndra %eff -effekt med %n',
    'set %eff effect to %n':
        's\u00E4tt %eff -effekt til %n',
    'clear graphic effects':
        'nollst\u00E4ll grafiska effekter',
    'change size by %n':
        '\u00E4ndra storlek med %n',
    'set size to %n %':
        's\u00E4tt storlek till %n %',
    'size':
        'storlek',
    'show':
        'visa',
    'hide':
        'g\u00F6m',
    'go to front':
        'l\u00E4gg \u00F6verst',
    'go back %n layers':
        'flytta %n lager bak\u00E5t',

    'development mode \ndebugging primitives:':
        'utvecklarl\u00E4ge \nDebugging av block',
    'console log %mult%s':
        'skriv till konsoll: %mult%s',
    'alert %mult%s':
        'Pop-up: %mult%s',

    // sound:
    'play sound %snd':
        'spela ljud %snd',
    'play sound %snd until done':
        'spela ljud %snd tills f\u00E4rdig',
    'stop all sounds':
        'stoppa alla ljud',
    'rest for %n beats':
        'pausa %n slag',
    'play note %n for %n beats':
        'spela ton %n i %n slag',
    'change tempo by %n':
        '\u00E4ndra tempo med %n',
    'set tempo to %n bpm':
        's\u00E4tt tempo till %n bpm',
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
        's\u00E4tt pennf\u00E4rg till %clr',
    'change pen color by %n':
        '\u00E4ndra pennf\u00E4rg till %n',
    'set pen color to %n':
        's\u00E4tt penf\u00E4rg till %n',
    'change pen shade by %n':
        '\u00E4ndra pennstyrka med %n',
    'set pen shade to %n':
        's\u00E4tt pennstyrka till %n',
    'change pen size by %n':
        '\u00E4ndra penntjocklek med %n',
    'set pen size to %n':
        's\u00E4tt penntjocklek til %n',
    'stamp':
        'st\u00E4mpla',
    'fill':
        'fyll',

    // control:
    'when %greenflag clicked':
        'n\u00E4r %greenflag klickas p\u00E5',
    'when %key key pressed':
        'n\u00E4r tangent %key trycks ned',
    'when I am clicked':
        'n\u00E4r jag klickas p\u00E5',
    'when I receive %msg':
        'n\u00E4r jag tar emot meddelande %msg',
    'broadcast %msg':
        'skicka meddelande %msg',
    'broadcast %msg and wait':
        'skicka meddelande %msg och v\u00E4nta',
    'Message name':
        'Meddelandets namn',
    'wait %n secs':
        'v\u00E4nta %n sek',
    'wait until %b':
        'v\u00E4nta tills %b',
    'forever %c':
        'f\u00F6r alltid %c',
    'repeat %n %c':
        'upprepa %n g\u00E5nger %c',
    'repeat until %b %c':
        'upprepa tills %b %c',
    'if %b %c':
        'om %b %c',
    'if %b %c else %c':
        'om %b %c d\u00E5 %c',
    'report %s':
        'rapportera %s',
    'stop block':
        'stoppa block',
    'stop script':
        'stoppa skript',
    'stop all %stop':
        'stoppa alla %stop',
    'pause all %pause':
        'pausa alla %pause',

    'run %cmdRing %inputs':
        'k\u00F6r %cmdRing med %inputs',
    'launch %cmdRing %inputs':
        'starta %cmdRing med %inputs',
    'call %repRing %inputs':
        'anropa %repRing med %inputs',
    'run %cmdRing w/continuation':
        'k\u00F6r %cmdRing och forts\u00E4tt',
    'call %cmdRing w/continuation':
        'anropa %cmdRing och forts\u00E4tt',
    'when I start as a clone':
        'n\u00E4r jag startar som klon',
    'create a clone of %cln':
        'skapa klon av %cln',
    'myself':
        'mig sj\u00E4lv',
    'delete this clone':
        'radera klon',
    'when I am %interaction':
        'n\u00E4r jag %interaction',
    'when %b':
        'n\u00E4r %b',
    'clicked':
        'klickas p\u00E5',
    'pressed':
        'trycks ned',
    'dropped':
        'sl\u00E4pps ned',
    'mouse-entered':
        'f\u00E5r muspekaren \u00F6ver mig',
    'mouse-departed':
        'inte l\u00E4ngre har muspekaren \u00F6ver mig',
    'when I am clicked':
        'n\u00E4r jag klickas p\u00E5',
    'when I receive %msgHat':
        'n\u00E4r jag tar emot %msgHat',
        


    'warp %c':
        'warp %c',

    // sensing:
    'touching %col ?':
        'r\u00F6r %col ?',
    'touching %clr ?':
        'r\u00F6r f\u00E4rgen %clr ?',
    'color %clr is touching %clr ?':
        'f\u00E4rgen %clr r\u00F6r %clr ?',
    'ask %s and wait':
        'fr\u00E5ga %s och v\u00E4nta',
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
        'avst\u00E5nd till %dst',
    'reset timer':
        'nollst\u00E4ll stoppur',
    'timer':
        'stoppur',
    'http:// %s':
        'http:// %s',

    'turbo mode?':
        'turbol\u00E4ge?',
    'set turbo mode to %b':
        's\u00E4tt turbol\u00E4ge till %b',


    'filtered for %clr':
        'filtrera p\u00E5 %clr',
    'stack size':
        'stack-storlek',
    'frames':
        'ramar',
        
    
    '%att of %spr':
        '%att av %spr',
    'my %get':
        'attribut %get',

        
    'current %dates':
        '%dates just nu',
        
    'year':
          '\u00E5ret',
    'month':
          'm\u00E5naden',
    'date':
          'datum',
    'hour':
          'timmen',
    'minute':
          'minuten',
    'second':
          'sekunden',
    'time in milliseconds':
        'tiden i millisekunder',
    'day of week':
        'veckodagen',
        

    // operators:
    '%n mod %n':
        '%n mod %n',
    'round %n':
        'avrunda %n',
    '%fun of %n':
        '%fun av %n',
    'pick random %n to %n':
        'slumptal fr\u00E5n %n till %n',
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
        'sl\u00E5 ihop %words',
    'hello':
        'hej',
    'world':
        'v\u00E4rlden',
    'letter %n of %s':
        'bokstav %n av %s',
    'length of %s':
        'l\u00E4ngden av %s',
    'unicode of %s':
        'unicode av %s',
    'unicode %n as letter':
        'unicode %n som bokstav',
    'is %s a %typ ?':
        '%s \u00E4r %typ ?',
    'is %s identical to %s ?':
        '%s identisk med %s ?',

    'type of %s':
        'typ %s',

    // variables:
    'Make a variable':
        'Ny variabel',
    'Variable name':
        'Variabelnamn',
    'Delete a variable':
        'Radera variabel',

    'set %var to %s':
        's\u00E4tt %var till %s',
    'change %var by %n':
        '\u00E4ndra %var med %n',
    'show variable %var':
        'visa variabel %var',
    'hide variable %var':
        'g\u00F6m variabel %var',
    'script variables %scriptVars':
        'skriptvariabel %scriptVars',

    // lists:
    'list %exp':
        'lista %exp',
    '%s in front of %l':
        '%s fr\u00E4mst i %l',
    'item %idx of %l':
        'element %idx i %l',
    'all but first of %l':
        'allt utom f\u00F6rsta i %l',
    'length of %l':
        'l\u00E4ngd av %l',
    '%l contains %s':
        '%l inneh\u00E5ller %s',
    'thing':
        'sak',
    'add %s to %l':
        'l\u00E4gg %s till %l',
    'delete %ida of %l':
        'radera %ida fr\u00E5n %l',
    'insert %s at %idx of %l':
        'l\u00E4gg in %s p\u00E5 plats %idx i lista %l',
    'replace item %idx of %l with %s':
        'ers\u00E4tt element %idx i %l med %s',

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
        'Ladda ner k\u00E4llkoden',
    'Switch back to user mode':
        'Tillbaka till anv\u00E4ndarl\u00E4ge',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'st\u00E4ng av Morphic\nmenyeroch visa \nanv\u00E4ndarv\u00E4nliga ist\u00E4llet',
    'Switch to dev mode':
        'Byt till utvecklarl\u00E4ge',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'aktivera Morphic menyer\noch inspektorer,\ninte anv\u00E4ndarv\u00E4nligt!',

    // project menu
    'Project notes...':
        'Annoteringar...',
    'New':
        'Ny',
    'Open...':
        '\u00D6ppna...',
    'Save':
        'Spara',
    'Save As...':
        'Spara som...',
    'Import...':
        'Importera...',
    'file menu import hint':
        'l\u00E4ser in ett exporterat projekt,\nett bibliotek med block,\nen kostym, eller ett ljud',
    'Export project as plain text ...':
        'Exportera projektet som vanlig text...',
    'Export project...':
        'Exportera projekt...',
    'show project data as XML\nin a new browser window':
        'visa projektdata som XML\ni ett ny f\u00F6nster',
    'Export blocks...':
        'Exportera block...',
    'show global custom block definitions as XML\nin a new browser window':
        'visa globala anpassade blockdefinitioner som XML\ni ett nytt f\u00F6nster',
    'Import tools...':
        'Importverktyg...',
    'load the official library of\npowerful blocks':
        'ladda ner det officiella\nsuperblock biblioteket ',
    'Libraries...':
        'Bibliotek...',
    'Import library':
        'Importera bibliotek',

 // cloud menu
    'Login...':
        'Logga in...',
    'Registrer deg...':
        'Registrera dig...',

    // settings menu
    'Language...':
        'Spr\u00E5k...',
    'Zoom blocks...':
        'F\u00F6rstora blocken...',
    'Blurred shadows':
        'Suddade skuggor',
    'uncheck to use solid drop\nshadows and highlights':
        'avmarkera f\u00F6r att anv\u00E4nda\nifyllda skuggor och belysningar',
    'check to use blurred drop\nshadows and highlights':
        'kryssa f\u00F6r att anv\u00E4nda\nsuddiga skuggor och belysningar',
    'Zebra coloring':
        'Zebraf\u00E4rg',
    'check to enable alternating\ncolors for nested blocks':
        'kryssa f\u00F6r att v\u00E4xla blockf\u00E4rger\ni nestlade block',
    'uncheck to disable alternating\ncolors for nested block':
        'avmarkera f\u00F6r att inaktivera v\u00E4xlade\nf\u00E4rger i nestlade block',
    'Dynamic input labels':
        'Dynamiska namn f\u00F6r indata',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'avmarkera f\u00F6r att inaktivera \ndynamiska namn f\u00F6r indata \nmed flera variabelf\u00E4lt',
    'check to enable dynamic\nlabels for variadic inputs':
        'kryssa f\u00F6r att aktivera \ndynamiska namn f\u00F6r indata \nmed flera variabelf\u00E4lt',
    'Prefer empty slot drops':
        'F\u00F6redra sl\u00E4pp p\u00E5 tomma utrymmen',
    'settings menu prefer empty slots hint':
        'Inst\u00E4llningar\nf\u00F6redra sl\u00E4pp p\u00E5 tomma utrymmen',
    'uncheck to allow dropped\nreporters to kick out others':
        'avmarkera f\u00F6r att till\u00E5ta placerade\n rappporterare att flytta ut andra',
    'Long form input dialog':
        'Komplett inmatningsf\u00F6nster',
    'check to always show slot\ntypes in the input dialog':
        'kryssa f\u00F6r att alltid visa\n alla typer i inmatningsf\u00F6nstret',
    'uncheck to use the input\ndialog in short form':
        'avmarkera f\u00F6r att visa lilla inmatningsf\u00F6nstret',
    'Virtual keyboard':
        'Virtuellt tangentbord',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'avmarkera f\u00F6r att inaktivera\nst\u00F6d f\u00F6r virtuellt \ntangentbord p\u00E5 mobila enheter',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'kryssa f\u00F6r att aktivera\nst\u00F6d f\u00F6r virtuellt \ntangentbord p\u00E5 mobila enheter',
    'Input sliders':
        'Volymkontroller',
    'uncheck to disable\ninput sliders for\nentry fields':
        'avmarkera f\u00F6r att inaktivera \nvolymkontroller f\u00F6r inmatningsf\u00E4lt',
    'check to enable\ninput sliders for\nentry fields':
        'kryssa f\u00F6r att aktivera \nvolymkontroller f\u00F6r inmatningsf\u00E4lt',
    'Clicking sound':
        'Klickljud',
    'uncheck to turn\nblock clicking\nsound off':
        'avmarkera f\u00F6r att\n inaktivera klickljud',
    'check to turn\nblock clicking\nsound on':
        'kryssa f\u00F6r att aktivera klickljud',
    'Animations':
        'Animationer',
    'uncheck to disable\nIDE animations':
        'avmarkera f\u00F6r att st\u00E4nga\n av IDE-animationer',
    'Turbo mode':
        'Turbol\u00E4ge',
    'check to enable\nIDE animations':
        'kryssa f\u00F6r att aktivera\n IDE-animationer',
    'Thread safe scripts':
        'Tr\u00E5ds\u00E4kra skript',
    'uncheck to allow\nscript reentrancy':
        'avmarkera f\u00F6r att till\u00E5ta \nskript att \u00E5terintr\u00E4da',
    'check to disallow\nscript reentrancy':
        'kryssa f\u00F6r att f\u00F6rbjuda \nskript att \u00E5terintr\u00E4da',
    'Prefer smooth animations':
        'J\u00E4mna animeringar',
    'uncheck for greater speed\nat variable frame rates':
        'avmarkera f\u00F6r h\u00F6gre fart \nvid variabel frame rate',
    'check for smooth, predictable\nanimations across computers':
        'kryssa f\u00F6r j\u00E4mna animeringar\n p\u00E5 alla plattformar',
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
        'hj\u00E4lp',

    // blocks:
    'hjelp...':
        'hj\u00E4lp...',
    'relabel...':
        'd\u00F6p om...',
    'duplicate':
        'duplicera',
    'make a copy\nand pick it up':
        'g\u00F6r en kopia\noch plocka upp den',
    'only duplicate this block':
        'duplicera endast detta block',
    'delete':
        'radera',
    'script pic...':
        'skript bild...',
    'open a new window\nwith a picture of this script':
        '\u00F6ppna ett nytt f\u00F6nster\nmed en bild av detta skript',
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
    'parent...':
        'f\u00F6r\u00E4lder...',
    'current parent':
        'nuvarande f\u00F6r\u00E4lder',

    // stage:
    'show all':
        'visa allt',

    // scripting area
    'clean up':
        'st\u00E4da',
    'arrange scripts\nvertically':
        'organisera skript\nvertikalt',
    'add comment':
        'l\u00E4gg till kommentar',
    'make a block...':
        'skapa nytt block...',

    // costumes
    'rename':
        'd\u00F6p om',
    'export':
        'exportera',
    'rename costume':
        'd\u00F6p om kostymen',

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
        'd\u00F6p om ljud',

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
        'Hj\u00E4lp',

    // Project Manager
    'Untitled':
        'Namnl\u00F6s',
    'Open Project':
        '\u00D6ppna projekt',
    '(empty)':
        '(tomt)',
    'Saved!':
        'Sparat!',
    'Delete Project':
        'Radera projekt',
    'Are you sure you want to delete':
        '\u00C4r du s\u00E4ker p\u00E5 att du vill radera',
    'rename...':
        'd\u00F6p om...',

    // costume editor
    'Costume Editor':
        'Kostymredigerare',
    'click or drag crosshairs to move the rotation center':
        'Klicka eller dra krysset f\u00F6r att markera mitten',

    // project notes
    'Project Notes':
        'Annoteringar',

    // new project
    'New Project':
        'Nytt projekt',
    'Replace the current project with a new one?':
        'Ers\u00E4tt aktuella projektet med ett nytt?',

    // save project
    'Save Project As...':
        'Spara projekt som...',

    // export blocks
    'Export blocks':
        'Exportera block',
    'Import blocks':
        'Importera block',
    'this project doesn\'t have any\ncustom global blocks yet':
        'Detta projekt saknar\negna globala block',
    'select':
        'v\u00E4lj',
    'all':
        'allt',
    'none':
        'ingenting',

    // variable dialog
    'for all sprites':
        'f\u00F6r alla sprites',
    'for this sprite only':
        'bara f\u00F6r denna sprite',

    // block dialog
    'Change block':
        '\u00C4ndra block',
    'Command':
        'Kommando',
    'Reporter':
        'Funktion',
    'Predicate':
        'Predikat',

    // block editor
    'Block Editor':
        'Blockredigerare',
    'Apply':
        'Verkst\u00E4ll',

    // block deletion dialog
    'Delete Custom Block':
        'Radera block',
    'block deletion dialog text':
        'Ska detta block med alla dess instanser\n' +
            'tas bort?',

    // input dialog
    'Create input name':
        'Skapa indata-namn',
    'Edit input name':
        'Redigera indata-namn',
    'Edit label fragment':
        'Redigera etikettdel',
    'Title text':
        'Titel',
    'Input name':
        'Indata-namn',
    'Delete':
        'Radera',
    'Object':
        'Objekt',
    'Number':
        'Nummer',
    'Text':
        'Text',
    'List':
        'Lista',
    'Any type':
        'Valfri typ',
    'Boolean (T/F)':
        'Boolean (S/F)',
    'Command\n(inline)':
        'Kommando\n(inline)',
    'Command\n(C-shape)':
        'Kommando\n(C-Form)',
    'Any\n(unevaluated)':
        'Vilken som helst\n(oevaluerad)',
    'Boolean\n(unevaluated)':
        'Boolean\n(oevaluerad)',
    'Single input.':
        'Enkel indata.',
    'Default Value:':
        'Standardv\u00E4rde:',
    'Multiple inputs (value is list of inputs)':
        'Flera indata (v\u00E4rdet \u00E4r en lista av indata)',
    'Upvar - make internal variable visible to caller':
        'Upvar - g\u00F6r internal variabel synlig f\u00F6r anroparen',

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
        '\u00D6vers\u00E4ttare',
    'License':
        'Licens',
    'current module versions:':
        'Modulversioner',
    'Contributors':
        'Bidragsgivare',
    'Translations':
        '\u00D6vers\u00E4ttningar',

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
        'Volymkontroll - minsta v\u00E4rde',
    'Slider maximum value':
        'volymkontroll - h\u00F6gsta v\u00E4rde',

    // list watchers
    'length: ':
        'l\u00E4ngd: ',

    // coments
    'add comment here...':
        'l\u00E4gg till kommentar h\u00E4r...',

    // drow downs
    // directions
    '(90) right':
        '(90) h\u00F6ger',
    '(-90) left':
        '(-90) v\u00E4nster',
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
        'pennsp\u00E5r',

    // costumes
    'Turtle':
        'Sk\u00F6ldpadda',

    // graphical effects
    'ghost':
        'sp\u00F6k',

    // keys
    'space':
        'mellanslag',
    'up arrow':
        'pil upp',
    'down arrow':
        'pil ned',
    'right arrow':
        'pil h\u00F6ger',
    'left arrow':
        'pil v\u00E4nster',
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
        'kvadratrot',
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
    'floor':
        'golv',
    'ceiling':  
        'tak',

    // data types
    'number':
        'nummer',
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
        'vilken som helst',
    

    // attributes
    'neighbors':
        'grannar',
    'self':
        'mig sj\u00E4lv',
    'other sprites':
        'andra sprites',
    'parts':
        'delar',
    'anchor':
        'ankare',
    'parent':
        'f\u00F6r\u00E4ldrar',
    'children':
        'barn',
    'clones':
        'kloner',
    'other clones':
        'andra kloner',
    'dangling?':
        'h\u00E4ngande?',
    'rotation x':
        'rotation x',
    'rotation y':
        'rotation y',
    'center x':
        'mittpunkt x',
    'center y':
        'mittpunkt y',
    'name':
        'namn',
    'stage':
        'scen',    
        
    // missing labels from initial translation added below
    'add a new sprite':
        'ny sprite',
    'when %keyHat key pressed':
        'n\u00E4r tangent %keyHat trycks ned',
    'when I receive %msgHat':
        'n\u00E4r jag tar emot %msgHat',
    'message':
        'meddelande',
    'any message':
        'n\u00E5got meddelande',
    'stop %stopChoices':
        'stoppa %stopChoices',
    'this script':
        'detta skript',
    'this block':
        'detta block',
    'stop %stopOthersChoices':
        'stoppa %stopOthersChoices',
    'all but this script':
        'alla f\u00F6rutom detta skript',
    'other scripts in sprite':
        'andra skript i denna sprite',
    '%att of %spr':
        '%att av %spr',
    '%fun of %n':
        '%fun av %n',
    'split %s by %delim':
        'dela %s med tecken %delim',
    'Script variable name':
        'Skriptvariabelnamn',
    'Reference manual':
        'Referensbok',
    'Export project as plain text...':
        'Exportera projektet som vanlig text...',
    'Import tools':
        'Importverktyg',
    'Signup...':
        'Registrera...',
    'Stage size...':
        'Scenstorlek...',
    'Stage size':
        'Scenstorlek',
    'Stage width':
        'Scenbredd',
    'Stage height':
        'Scenh\u00F6jd',
    'Default':
        'Standard',
    'Plain prototype labels':
        'Vanliga prototypetiketter',
    'uncheck to always show (+) symbols\nin block prototype labels':
        'avmarkera f\u00F6r att visa (+) symboler \n i blockprototypetiketter',
    'check to hide (+) symbols\nin block prototype labels':
        'kryssa f\u00F6r att visa (+) symboler \n i blockprototypetiketter',
    'check to prioritize\nscript execution':
        'kryssa f\u00F6r att prioritera \nskriptexekvering',
    'uncheck to run scripts\nat normal speed':
        'avmarkera f\u00F6r att k\u00F6ra \nskript vid normal hastighet',
    'uncheck to allow\nscript reentrance':
        'avmarkera f\u00F6r att till\u00E5ta \nskript att \u00E5tertilltr\u00E4da',
    'check to disallow\nscript reentrance':
        'kryssa f\u00F6r att f\u00F6rbjuda \nskript att \u00E5tertilltr\u00E4da',
    'Flat line ends':
        'Platta streckslut',
    'check for flat ends of lines':
        'kryssa f\u00F6r platta streckslut',
    'uncheck for round ends of lines':
        'avmarkera f\u00F6r avrundade streckslut',
    'hide primitives':
        'g\u00F6m primitiva',
    'show primitives':
        'visa primitiva',
    'help...':
        'hj\u00E4lp...',
    'move':
        'flytta',
    'detach from':
        'koppla bort',
    'detach all parts':
        'koppla bort alla delar',
    'pic...':
        'bild...',
    'open a new window\nwith a picture of the stage':
        '\u00F6ppna ett nytt f\u00F6nster\nmed en bild av scenen',
    'undrop':
        '\u00E5ngra sl\u00E4pp',
    'undo the last\nblock drop\nin this pane':
        '\u00E5ngra sista \nblocksl\u00E4ppet i\ndetta omr\u00E5de',
    'scripts pic...':
        'skriptbild...',
    'open a new window\nwith a picture of all scripts':
        '\u00F6ppna ett nytt f\u00F6nster\nmed en bild p\u00E5 alla skript',
    'Zoom blocks':
        'F\u00F6rstora blocken',
    'build':
        'bygg',
    'your own':
        'dina egna',
    'blocks':
        'block',
    'normal (1x)':
        'normal (1x)',
    'demo (1.2x)':
        'demo (1.2x)',
    'presentation (1.4x)':
        'presentation (1.4x)',
    'big (2x)':
        'stor (2x)',
    'huge (4x)':
        'j\u00E4ttestor (4x)',
    'giant (8x)':
        'enorm (8x)',
    'monstrous (10x)':
        'gigantisk (10x)',
    'Empty':
        'Tom',
    'brightness':
        'ljusstyrka',
    'negative':
        'negativ',
    'comic':
        'komisk',
    'confetti':
        'konfetti',
    'letter':
        'bokstav',
    'whitespace':
        'mellanslag',
    'line':
        'rad',
    'tab':
        'tab',
    'cr':
        'retur',
    'warp %c':
        'snabbspola %c',
    'Reset Password...':
        'Nollst\u00E4ll l\u00F6senord...',
    'Codification support':
        'St\u00F6d f\u00F6r textprogrammering',
    'Flat design':
        'Platt utseende',
    'Keyboard Editing':
        'Tangentbordsredigering',
    'Table support':
        'Tabellstöd',
    'Inheritance support':
        'Arv',
    'uncheck to disable\nsprite inheritance features':
        'avmarkera f\u00F6r att inaktivera\nst\u00F6d f\u00F6r arv mellan sprites',
    'check for sprite\ninheritance features':
        'kryssa f\u00F6r att aktivera\nst\u00F6d f\u00F6r arv mellan sprites',
    'uncheck to disable\nmulti-column list views':
        'avmarkera f\u00F6r att inaktivera\nst\u00F6d f\u00F6r redigering av listor i flera kolumner',
    'check for multi-column\nlist view support':
        'kryssa f\u00F6r att aktivera\nst\u00F6d f\u00F6r redigering av listor i flera kolumner',
    'check to enable\nkeyboard editing support':    
        'kryssa f\u00F6r att aktivera\ntangentbordsredigering',
    'uncheck to disable\nkeyboard editing support':
        'avmarkera f\u00F6r att inaktivera\ntangentbordsredigering',
    'check for block\nto text mapping features':
        'kryssa f\u00F6r att aktivera\nblock-till-text funktioner',
    'uncheck to disable\nblock to text mapping features':
        'avmarkera f\u00F6r att inaktivera\nblock-till-text funktioner',
    'check for alternative\nGUI design':
        'kryssa f\u00F6r att aktivera ett\nalternativt utseende',
    'uncheck for default\nGUI design':
        'avmarkera f\u00F6r att byta\ntill standardutseendet',
    'Select categories of additional blocks to add to this project.':
        'v\u00E4lj grupper av extrablock att l\u00E4gga till i projektet',
    'Select a costume from the media library':
        'v\u00E4lj en kostym fr\u00E5n mediabiblioteket',
    'Select a sound from the media library':
        'v\u00E4lj ett ljud fr\u00E5n mediabiblioteket',
    'Iteration, composition':
        'Upprepning, komposition',
    'List utilities':
        'Listverktyg',
    'Streams (lazy lists)':
        'Str\u00F6mmar (lata listor)',
    'Variadic reporters':
        'Variabla rapporterare',
    'Words, sentences':
        'Ord, meningar',
    'Paint a new costume':
        'Rita en ny kostym',
    'add a new Turtle sprite':
        'l\u00E4gg till en ny Sk\u00F6ldpadda-sprite',
    'paint a new sprite':
        'rita en ny sprite',
    'Paint Editor':
        'Rita',
    'undo':
        '\u00E5ngra',
    'grow':
        'st\u00F6rre',
    'shrink':
        'mindre',
    'flip ↔':
        'v\u00E4nd ↔',
    'flip ↕':
        'v\u00E4nd ↕',
    'Brush size':
        'Pennstorlek',
    'Constrain proportions of shapes?\n(you can also hold shift)':
        'Beh\u00E5ll figurernas proportioner?\n(du kan ocks\u00E5 h\u00E5lla skift nedtryckt)'
        
};
