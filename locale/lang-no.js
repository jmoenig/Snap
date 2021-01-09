/*

    lang-no.js

    Norwegian translation for SNAP!

    written by Olav A Marschall

    Copyright (C) 2020 by Jens Mönig

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

SnapTranslator.dict.no = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    ø , \u00F8
    æ , \u00E6
    å , \u00E5
    Ø , \u00D8
    Æ ; \u00C6
    Å , \u00C5
*/

    // translations meta information
    'language_name':
        'Norsk', // the name as it should appear in the language menu
    'language_translator':
        'Olav A Marschall', // your name for the Translators tab
    'translator_e-mail':
        'olavmarschall@gmail.com', // optional
    'last_changed':
        '2020-08-19', // this, too, will appear in the Translators tab

    // GUI
    // control bar:
    'untitled':
        'uten navn',
    'development mode':
        'utviklermodus',

    // categories:
    'Motion':
        'Bevegelse',
    'Looks':
        'Utseende',
    'Sound':
        'Lyd',
    'Pen':
        'Penn',
    'Control':
        'Styring',
    'Sensing':
        'Sansning',
    'Operators':
        'Operatorer',
    'Variables':
        'Variabler',
    'Lists':
        'Lister',
    'Other':
        'Andre',

    // editor:
    'draggable':
        'flyttbar',

    // tabs:
    'Scripts':
        'Skripter',
    'Costumes':
        'Drakter',
    'Backgrounds':
        'Bakgrunner',
    'Sounds':
        'Lyder',

    // names:
    'Sprite':
        'Figur',
    'Stage':
        'Scene',

    // rotation styles:
    'don\'t rotate':
        'roterer ikke',
    'can rotate':
        'roterer',
    'only face left/right':
        'kun mot venstre/h\u00F8yre',

    // new sprite button:
    'add a new sprite':
        'legg til ny figur',
    'add a new Turtle sprite':
        'legg til ny figur med retningspeker',
    'paint a new sprite':
        'tegn ny figur',
    'take a camera snapshot and\nimport it as a new sprite':
        'legg til ny figur med webcam snapshot',
    

    // tab help
    'costumes tab help':
        'Drakter tab-panel hjelp',
    'import a sound from your computer\nby dragging it into here':
        'importere lyder ved \u00E5 dra over',

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
        'Scene gjeldende:\ningen standard bevegelser:',
    'move %n steps':
        'g\u00E5 %n steg',
    'turn %clockwise %n degrees':
        'drei %clockwise %n grader',
    'turn %counterclockwise %n degrees':
        'drei %counterclockwise %n grader',
    'point in direction %dir':
        'pek i retning %dir',
    'point towards %dst':
        'pek mot %dst',
    'go to x: %n y: %n':
        'g\u00E5 til x: %n y: %n',
    'go to %dst':
        'g\u00E5 til %dst',
    'glide %n secs to x: %n y: %n':
        'glide %n sek til x: %n y: %n',
    'change x by %n':
        'endre x med %n',
    'set x to %n':
        'sett x til %n',
    'change y by %n':
        'endre y med %n',
    'set y to %n':
        'sett y til %n',
    'if on edge, bounce':
        'sprett tilbake fra kanten',
    'x position':
        'x-posisjon',
    'y position':
        'y-posisjon',
    'direction':
        'retning',

    // looks:
    'switch to costume %cst':
        'bytt til drakt %cst',
    'next costume':
        'neste drakt',
    'costume #':
        'drakt nr.',
    'say %s for %n secs':
        'si %s i %n sek',
    'say %s':
        'si %s',
    'think %s for %n secs':
        'tenk %s i %n sek',
    'think %s':
        'tenk %s',
    'Hello!':
        'Hallo!',
    'Hmm...':
        'Hmm...',
    '%img of costume %cst':
        '%img for drakt %cst',
    'new costume %l width %dim height %dim':
        'ny drakt %l bredde %dim h\u00F8yde %dim',
    'stretch %cst x: %n y: %n %':
        'forlenge %cst x: %n y: %n %',
    'change %eff effect by %n':
        'endre %eff -effekt med %n',
    'set %eff effect to %n':
        'sett %eff -effekt til %n',
    'clear graphic effects':
        'nullstill grafiske effekter',
    '%eff effect':
        '%eff -effekt',
    'change size by %n':
        'endre st\u00F8rrelse med %n',
    'set size to %n %':
        'set st\u00F8rrelse til %n %',
    'size':
        'st\u00F8rrelse',
    'show':
        'vis',
    'hide':
        'skjul',
    'shown?':
        'synlig?',
    'go to %layer layer':
        'g\u00E5 til lag %layer',
    'front':
        'fremst',
    'back':
        'bakerst',
    'go back %n layers':
        'g\u00E5 tilbake %n lag',

    'development mode \ndebugging primitives:':
        'utviklermodus \nDebugging-blokker',
    'console log %mult%s':
        'skriv i konsoll: %mult%s',
    'alert %mult%s':
        'pop-up: %mult%s',

    'pixels':
        'pixler',
    'current':
        'gjeldende',

    // sound:
    'play sound %snd':
        'spill lyd %snd',
    'play sound %snd until done':
        'spill hele lyden %snd',
    'stop all sounds':
        'stoppe alle lyder',
    'rest for %n beats':
        'pause for %n slag',
    'play sound %snd at %rate Hz':
        'spill lyd %snd med %rate Hz',
    '%aa of sound %snd':
        '%aa fra lyd %snd',
    'duration':
        'lengde i sek',
    'length':
        'lengde i # samples',
    'number of channels':
        'antall kanaler',
    'new sound %l rate %rate Hz':
        'ny lyd %l %rate Hz',
    'play note %note for %n beats':
        'spill note %note for %n slag',
    'set instrument to %inst':
        'sett instrument til %inst',
    'change tempo by %n':
        'endre tempo med %n',
    'set tempo to %n bpm':
        'sett tempo til %n slag/min.',
    'tempo':
        'tempo',
    'change volume by %n':
        'endre volum med %n',
    'set volume to %n %':
        'sett volum til %n %',
    'change balance by %n':
        'endre balanse med %n',
    'set balance to %n':
        'sett balanse til %n',
    'balance':
        'balanse',
    'play frequency %n Hz':
        'spill frekvens %n Hz',
    'stop frequency':
        'stopp frekvens',
    'play %n Hz for %n secs':
        'spill %n Hz i %n sek',

    // "instruments", i.e. wave forms
    '(1) sine':
        '(1) sinus',
    '(2) square':
        '(2) kvadrat',
    '(3) sawtooth':
        '(3) sagtann',
    '(4) triangle':
        '(4) trekant',

    // pen:
    'clear':
        'slett',
    'pen down':
        'penn ned',
    'pen up':
        'penn opp',
    'pen down?':
        'penn nede?',
    'set pen color to %clr':
        'sett pennfarge til %clr',
    'set background color to %clr':
        'sett bakgrunnsfarge til %clr',
    'change pen %hsva by %n':
        'endre penn %hsva med %n',
    'change background %hsva by %n':
        'endre bakgrunn %hsva med %n',
    'set pen %hsva to %n':
        'sett penn %hsva til %n',
    'set background %hsva to %n':
        'sett bakgrunn %hsva til %n',
    'pen %pen':
        'penn %pen',
    'change pen size by %n':
        'endre pennbredde med %n',
    'set pen size to %n':
        'sett pennbredde til %n',
    'stamp':
        'stemple',
    'fill':
        'fyll',
    'write %s size %n':
        'skriv %s st\u00F8rrelse %n',
    'paste on %spr':
        'lim inn p\u00E5 %spr',
    'pen vectors':
        'penn vektorer',

    // control:
    'when %greenflag clicked':
        'n\u00E5r %greenflag klikket',
    'when %keyHat key pressed':
        'n\u00E5r tast %keyHat trykket',
    'when I am %interaction':
        'n\u00E5r jeg blir %interaction',
    'clicked':
        'klikket',
    'pressed':
        'trykket',
    'dropped':
        'sluppet',
    'mouse-entered':
        'mus over',
    'mouse-departed':
        'mus ut av',
    'scrolled-down':
    	'bladd ned',
    'scrolled-up':
        'bladd opp',
    'stopped':
        'stoppet',
    'when %b':
        'n\u00E5r %b',
    'when I receive %msgHat':
        'n\u00E5r jeg mottar %msgHat',
    'broadcast %msg':
        'kringkast %msg',
    'broadcast %msg and wait':
        'kringkast %msg og vent',
    'send %msg to %spr':
        'send %msg til %spr',
    'Message name':
        'melding navn',
    'message':
        'melding',
    'any message':
        'melding...',
    'wait %n secs':
        'vent %n sek',
    'wait until %b':
        'vent til %b',
    'forever %loop':
        'for alltid %loop',
    'repeat %n %loop':
        '%n ganger %loop',
    'repeat until %b %loop':
        'gjenta til %b %loop',
    'for %upvar = %n to %n %cla':
        'for %upvar = %n til %n %cla',
    'if %b %c':
        'hvis %b %c',
    'if %b %c else %c':
        'hvis %b %c ellers %c',
    'if %b then %s else %s':
        'hvis %b s\u00E5 %s ellers %s',
    'report %s':
        'rapporterer %s',
    'stop %stopChoices':
        'stopp %stopChoices',
    'all':
        'alle',
    'this script':
        'dette skriptet',
    'this block':
        'denne blokken',
    'stop %stopOthersChoices':
        'stopp %stopOthersChoices',
    'all but this script':
        'alle unntatt dette skriptet',
    'other scripts in sprite':
        'andre skripter i figuren',
    'pause all %pause':
        'pause (alle) %pause',
    'run %cmdRing %inputs':
        'kj\u00F8r %cmdRing med %inputs',
    'launch %cmdRing %inputs':
        'start %cmdRing %inputs',
    'call %repRing %inputs':
        'kall %repRing med %inputs',
    'run %cmdRing w/continuation':
        'kj\u00F8r %cmdRing med kontinuering',
    'call %cmdRing w/continuation':
        'kall %cmdRing med kontinuering',
    'warp %c':
        'warp %c',
    'when I start as a clone':
        'n\u00E5r jeg starter som klon',
    'create a clone of %cln':
        'klon %cln',
    'a new clone of %cln':
        'ny klon av %cln',
    'myself':
        'meg',
    'delete this clone':
        'slett denne klon',
    'tell %spr to %cmdRing %inputs':
        'be %spr gj\u00F8re %cmdRing %inputs',
    'ask %spr for %repRing %inputs':
        'sp\u00F8 %spr om %repRing %inputs',

    // sensing:
    'touching %col ?':
        'ber\u00F8rer %col ?',
    'touching %clr ?':
        'ber\u00F8rer %clr ?',
    'color %clr is touching %clr ?':
        'farge %clr ber\u00F8rer %clr ?',
    'ask %s and wait':
        'sp\u00F8r %s og vent',
    'what\'s your name?':
        'hva heter du?',
    'answer':
        'svar',
    'mouse x':
        'mus x-posisjon',
    'mouse y':
        'mus y-posisjon',
    'mouse down?':
        'mustast trykket?',
    'key %key pressed?':
        'tast %key trykket?',
    '%rel to %dst':
        '%rel til %dst',
    'distance':
    	'avstand',
    '%asp at %loc' :
        '%asp ved %loc',
    'r-g-b-a':
        'R-G-B-A fargeverdier',
    'sprites' :
        'figurer',
    'reset timer':
        'nullstille timer',
    'timer':
        'timer',
    '%att of %spr':
        '%att til %spr',
    'my %get':
        'min(e) %get',
    'object %self':
        'figur %self',
    'http:// %s':
        'http:// %s',
    'turbo mode':
        'turbomodus',
    'flat line ends':
        'flate pennlinjeavslutninger',
    'is %setting on?':
        '%setting p\u00E5?',
    'set %setting to %b':
        'sett %setting til %b',
    'current %dates':
        'n\u00E5v\u00E6rende %dates',
    'year':
        '\u00E5r',
    'month':
        'm\u00E5ned',
    'date':
        'dato',
    'day of week':
        'ukedag',
    'hour':
        'time',
    'minute':
        'minutt',
    'second':
        'sekund',
    'time in milliseconds':
        'tid i millisekunder',
    'microphone %audio':
        'mikrofon %audio',
    'volume':
        'volum',
    'note':
        'note',
    'frequency':
        'frekvens',
    'samples':
        'samples',
    'sample rate':
        'samplerate',
    'spectrum':
        'frekvensspektrum',
    'resolution':
        'oppl\u00F8sning',
    'Microphone resolution...':
        'Mikrofonoppl\u00F8sning...',
    'Microphone':
        'mikrofon',
    'low':
        'lav',
    'high':
        'h\u00F8y',
    'max':
        'max',
    'video %vid on %self':
        'video %vid av %self',
    'motion':
        'bevegelse',
    'snap':
        'snap',
    'set video transparency to %n':
        'sett videotransparens til %n',
    'video capture':
        'videoopptak',
    'mirror video':
        'video speilet',
    'filtered for %clr':
        'filtrert med %clr',
    'stack size':
        'stack st\u00F8rrelse ',
    'frames':
        'frames',
    'log pen vectors':
        'logg penn vektorer',

    // operators:
    '%n mod %n':
        '%n mod %n',
    'round %n':
        'avrund %n',
    '%fun of %n':
        '%fun av %n',
    'pick random %n to %n':
        'tilfeldig tall fra %n til %n',
    '%b and %b':
        '%b OG %b',
    '%b or %b':
        '%b ELLER %b',
    'not %b':
        'IKKE %b',
    'true':
        'SANN',
    'false':
        'USANN',
    'join %words':
        'skj\u00F8t %words',
    'split %s by %delim':
        'splitt %s gitt %delim',
    'hello':
        'hallo',
    'world':
        'verden',
    'letter %idx of %s':
        'tegn %idx av %s',
    'length of %s':
        'lengde av %s',
    'unicode of %s':
        'unicode til %s',
    'unicode %n as letter':
        'unicode %n som bokstav',
    'is %s a %typ ?':
        'er %s type %typ ?',
    'is %s identical to %s ?':
        'er %s identisk %s ?',
    'JavaScript function ( %mult%s ) { %code }':
        'JavaScript funktion ( %mult%s ) { %code }',
    'compile %repRing':
    	'kompiler %repRing',

    'type of %s':
        'type av %s',

    // variables:
    'Make a variable':
        'Ny variabel',
    'Variable name':
        'variabelnavn',
    'Script variable name':
        'skriptvariabel navn',
    'inherit %shd':
        'arver %shd',
    'Delete a variable':
        'Slett variabel',

    'set %var to %s':
        'sett %var til %s',
    'change %var by %n':
        'endre %var med %n',
    'show variable %var':
        'vis variabel %var',
    'hide variable %var':
        'skjul variabel %var',
    'script variables %scriptVars':
        'skript variabler %scriptVars',

    // lists:
    'list %exp':
        'liste %exp',
    'numbers from %n to %n':
        'tall fra %n til %n',
    '%s in front of %l':
        '%s først i %l',
    'item %idx of %l':
        'element %idx fra %l',
    'all but first of %l':
        'alle f\u00F8rste i %l',
    'length of %l':
        'lengde til %l',
    '%l contains %s':
        '%l inneholder %s',
    'thing':
        'noe',
    'is %l empty?':
        'er %l tom?',
    'index of %s in %l':
        'indeks til %s i %l',
    'map %repRing over %l':
        'MAP %repRing p\u00E5 %l',
    'keep items %predRing from %l':
        'KEEP el. som %predRing i %l',
    'find first item %predRing in %l':
        'FINN f\u00F8rste el. som %predRing i %l',
    'combine %l using %repRing':
        'COMBINE el. i %l med %repRing',
    '%blitz map %repRing over %l':
        '%blitz MAP %repRing p\u00E5 %l',
    '%blitz keep items %predRing from %l':
        '%blitz KEEP el. som %predRing i %l',
    '%blitz find first item %predRing in %l':
        '%blitz FINN f\u00F8rste el. som %predRing i %l',
    '%blitz combine %l using %repRing':
        '%blitz COMBINE el. i %l med %repRing',
    'for each %upvar in %l %cla':
        'for hver %upvar i %l %cla',
    'item':
        'element',
    'value':
        'verdi',
    'index':
        'indeks',
    'append %lists':
        'sl\u00E5 sammen %lists',
    'add %s to %l':
        'legg til %s til %l',
    'delete %ida of %l':
        'slett %ida fra %l',
    'insert %s at %idx of %l':
        'sett inn %s som %idx i %l',
    'replace item %idx of %l with %s':
        'erstatt el. %idx i %l med %s',

    // other
    'Make a block':
        'Ny blokk',

    // menus
    // snap menu
    'About...':
        'Om Snap!...',
    'Reference manual':
        'Snap Manual',
    'Snap! website':
        'Snap! webbside',
    'Download source':
        'laste ned kildekode',
    'Switch back to user mode':
        'bytt tilbake til brukermodus',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'ut av Morphic\nkontekst menyer\nog vis brukervennlige',
    'Switch to dev mode':
        'bytt til utviklermodus',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'sl\u00E5 p\u00E5 Morphic funksjoner',

    // project menu
    'Project notes...':
        'Prosjekt notater...',
    'New':
        'Ny',
    'Open...':
        '\u00C5pne...',
    'Save':
        'Lagre',
    'Save to disk':
        'Lagre til disk',
    'store this project\nin the downloads folder\n(in supporting browsers)':
        'Last ned prosjektet\n lokal lagring\n'
            + '(kun i noen browsere mulig!)',
    'Save As...':
        'Lagre som...',
    'Import...':
        'Importer...',
    'file menu import hint':
        'fil meny import hint',
    'Export project as plain text...':
        'Eksporter prosjekt som tekst...',
    'Export project...':
        'Eksporter prosjekt...',
    'save project data as XML\nto your downloads folder':
        'Lagre prosjekt som XML\ni Downloadmappe',
    'show project data as XML\nin a new browser window':
        'Vis prosjektdata som XML\ni et nytt nettleservindu',
    'Export blocks...':
        'Eksporter blokker...',
    'save global custom block\ndefinitions as XML':
        'Lagre globale brukerblokkdefinisjoner\nsom XML',
    'Unused blocks...':
          'Ikke brukte blokker...',
    'find unused global custom blocks\nand remove their definitions':
        'Finn ikke brukte blokker\nog fjern',
    'Remove unused blocks':
        'Fjern ikke brukte blokker',
    'there are currently no unused\nglobal custom blocks in this project':
        'det er ingen ubrukte\nglobale og bruker definerte blokker i prosjektet',
    'unused block(s) removed':
        'ikke brukte blokker er fjernet',
    'Export summary...':
        'Eksporter sammendraget...',
    'save a summary\nof this project':
        'Lagre sammendraget til prosjektet',
    'Contents':
        'Innhold',
    'Kind of':
        'Slags',
    'Part of':
        'Del av',
    'Parts':
        'Deler',
    'Blocks':
        'Blokker',
    'For all Sprites':
        'For alle figurer',
    'Libraries...':
        'Biblioteker...',
    'Select categories of additional blocks to add to this project.':
        'Velg kategorier for tilleggsblokker i prosjektet',
    'Select a costume from the media library':
        'Velg drakt fra mediabiblioteket',
    'Select a sound from the media library':
        'Velg lyd fra mediabiblioteket',

    //Libraries
    'Import library':
        'Importer bibliotek',
    'Loading':
        'Laster ned',
    'Imported':
        'Importert',
    'Iteration, composition':
        'Iterasjon, komposisjon',
    'List utilities':
        'Liste verkt\u00F8y',
    'Variadic reporters':
        'Variadiske funksjoner',
    'Web services access (https)':
        'Webservices tilgang (htpps)',
    'Multi-branched conditional (switch)':
        'Fler-grenete betingelser (Switch)',
    'LEAP Motion controller':
        'LEAP Motion Controller',
    'Words, sentences':
        'Ord, setninger',
    'Catch errors in a script':
        'Feilh\u00E5ndtering i skript',
    'Set RGB or HSV pen color':
        'Sett pennfarge RGB eller HSV',
    'Text to speech':
        'Tekst til tale',
    'Provide 100 selected colors':
        '100 utvalgte farger',
    'Infinite precision integers, exact rationals, complex':
        'Ubegrenset presisjons heltall, eksakt rasjonelle tall, komplekse tall',
    'Provide getters and setters for all GUI-controlled global settings':
        'GUI elementer i egne programmer',
    'Allow multi-line text input to a block':
        'Tillat fler-linjet tekst inputt i blokker',
    'Create variables in program':
        'Lag variabler i skripter',

    // cloud menu
    'Login...':
        'Loginn...',
    'Signup...':
        'Lag brukerkonto...',
    'Logout':
        'Logg ut',
    'Change Password...':
        'Endre passord...',
    'Reset Password...':
        'Tilbakestill passord...',
    'Resend Verification Email...':
        'Send verifikasjonsmail p\u00E5 nytt...',
    'Open in Community Site':
        '\u00C5pne i Community Site',

    
    // settings menu
    'Language...':
        'Spr\u00E5k...',
    'Zoom blocks...':
        'Zoom blokker...',
    'Fade blocks...':
        'Fade ut blokkene...',
    'Stage size...':
        'Scene st\u00F8rrelse...',
    'Stage size':
        'Scene st\u00F8rrelse',
    'Stage width':
        'Scene bredde',
    'Stage height':
        'Scene h\u00F8yde',
    'Default':
        'Default',
    'Blurred shadows':
        'Mindre skarpe skygger',
    'uncheck to use solid drop\nshadows and highlights':
        'AV skarpe skygger\nog highlights',
    'check to use blurred drop\nshadows and highlights':
        'P\u00C5 skarpe skygger\nog highlights',
    'Zebra coloring':
        'Sebrafarger',
    'check to enable alternating\ncolors for nested blocks':
        'P\u00C5 alternerende fargenyanser\ni nestete blokker',
    'uncheck to disable alternating\ncolors for nested block':
        'AV alternerende fargenyanser\ni nestete blokker',
    'Dynamic input labels':
        'Dynamiske innputtnavn',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'AV dynamiske navn for flersvarinputt',
    'check to enable dynamic\nlabels for variadic inputs':
        'P\u00C5 dynamiske navn for flersvarinputt',
    'Prefer empty slot drops':
        'Preferanse for tomme slots ',
    'settings menu prefer empty slots hint':
        'settings meny preferanser tom slots hint',
    'uncheck to allow dropped\nreporters to kick out others':
        'AV tillat droppete\nreportere kikker ut andre',
    'check to turn on\n visible stepping (slow)':
        'P\u00C5 sl\u00E5 p\u00E5\n programstegkj\u00F8ring (slow)',
    'uncheck to turn off\nvisible stepping':
        'AV slå av\nprogramstegkj\u00F8ring',
    'Long form input dialog':
        'Lange inputt dialogvindu',
    'Plain prototype labels':
        'Enkle prototype navn',
    'uncheck to always show (+) symbols\nin block prototype labels':
        'AV vis alltid (+) symboler\ni prototype navn',
    'check to hide (+) symbols\nin block prototype labels':
        'P\u00C5 vis (+) symboler\ni blokk prototype navn',
    'check to always show slot\ntypes in the input dialog':
        'P\u00C5 alltid vis slot\ntyper i inputt dialoger',
    'uncheck to use the input\ndialog in short form':
        'AV bruk inputt\ndialoger i kort format',
    'Virtual keyboard':
        'Virtuelt keyboard',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'AV ikke bruk\nvirtuell tastatur support\nfor mobile enheter',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'P\u00C5 bruk\nvirtuell tastatur support\nfor mobile enheter',
    'Input sliders':
        'Input slidere',
    'uncheck to disable\ninput sliders for\nentry fields':
        'AV ikke bruk\ninputt sliders for\ninputt felt',
    'check to enable\ninput sliders for\nentry fields':
        'P\u00C5 bruk\ninputt sliders for\inputt felt',
    'Retina display support':
        'Retina skjermst\u00F8tte',
    'uncheck for lower resolution,\nsaves computing resources':
        'AV gir lavere oppl\u00F8sning,\nbruker mindre regnekapasitet',
    'check for higher resolution,\nuses more computing resources':
        'P\u00C5 for h\u00F8yere oppl\u00F8sning,\nbruker st\u00F8rre regnekapasitet',
    'Codification support':
        'Kodifikasjonsst\u00F8tte',
    'Clicking sound':
        'H\u00F8rbar klikkelyd',
    'uncheck to turn\nblock clicking\nsound off':
        'AV sl\u00E5\nblock klikke\nlyd av',
    'check to turn\nblock clicking\nsound on':
        'P\u00C5 sl\u00E5\nblock klikke\nlyd p\u00E5',
    'Animations':
        'Animasjoner',
    'uncheck to disable\nIDE animations':
        'AV sl\u00E5 av\nIDE animasjoner',
    'Turbo mode':
        'Turbomodus',
    'check to prioritize\nscript execution':
        'P\u00C5 Prioriter\nscript kj\u00F8ring',
    'uncheck to run scripts\nat normal speed':
        'AV kj\u00F8r skripter\nmed normal hastighet',
    'check to enable\nIDE animations':
        'P\u00C5 to enable\nIDE animations',
    'Flat design':
        'Flat design',
    'check for alternative\nGUI design':
        'P\u00C5 for alternativ\nGUI design',
    'uncheck for default\nGUI design':
        'AV for default\nGUI design',
    'Nested auto-wrapping':
        'Nestet auto-wrapping',
    'Keyboard Editing':
        'Tastatur editing',
    'Table support':
        'Tabell st\u00F8tte',
    'Table lines':
        'Tabeller med linjer',
    'Visible stepping':
        'Vis trinn-for-trinn (stepping) programkj\u00F8ring',
    'Thread safe scripts':
        'Thread-sikre skripter',
    'uncheck to allow\nscript reentrance':
        'AV tillat\nskript reentrance',
    'check to disallow\nskript reentrance':
        'P\u00C5 tillat ikke\nscript reentrance',
    'Prefer smooth animations':
        'Preferanse for jevne animasjoner',
    'uncheck for greater speed\nat variable frame rates':
        'AV raskere\nat variable frame rates',
    'check for smooth, predictable\nanimations across computers':
        'P\u00C5 for jevne, forutsigbare\nanimasjoner jevnt over datamaskinen',
    'Flat line ends':
        'Flate linje avslutninger',
    'check for flat ends of lines':
        'P\u00C5 flate linje avslutninger',
    'uncheck for round ends of lines':
        'AV Avrundete linje avslutninger',
    'Ternary Boolean slots':
        'Tern\u00E6re Boolske inputt',
    'Inheritance support':
        'Prototypisk arving st\u00F8tte',
    'Hyper blocks support':
        'Hyper-blokker st\u00F8tte',
    'uncheck to disable\nusing operators on lists and tables':
         'AV Ikke bruk\noperatorer p\u00E5 lister og tabeller',
    'check to enable\nusing operators on lists and tables':
         'P\u00C5 bruk\noperatorer p\u00E5 lister og tabeller',
    'Log pen vectors':
        'Logg penn vektorer',
    'uncheck to turn off\nlogging pen vectors':
        'AV ikke\nlogging penn vektorer',
    'check to turn on\nlogging pen vectors':
        'P\u00C5 bruk\nlogging penn vektorer',


    // inputs
    'with inputs':
        'med inndata',
    'input names:':
        'inndata navn:',
    'Input Names:':
        'Inndata Navn:',
    'input list:':
        'inndata liste:',

    // context menus:
    'help':
        'hjelp',

    // palette:
    'find blocks':
        'finn bokker',
    'hide primitives':
        'skjul basisblokker',
    'show primitives':
        'vis basisblokker',

    // blocks:
    'help...':
        'Hjelp...',
    'relabel...':
        'gi nytt navn...',
    'compile':
        'kompiler',
    'uncompile':
        'dekompiler',
    'duplicate':
        'duplisere',
    'make a copy\nand pick it up':
        'lag en kopi\nog ta den med',
    'only duplicate this block':
        'kun denne blokken dupliseres',
    'delete':
        'slett',
    'script pic...':
        'skript bilde...',
    'save a picture\nof this script':
        'lagre bilde\av dette skriptet',
    'result pic...':
        'resultatbilde...',
    'save a picture of both\nthis script and its result':
        'lagre bilde av b\u00E5de\ndette skript og resultatet',
    'ringify':
        'omringe',
    'unringify':
        'fjernring',
    'transient':
        'transient',
    'uncheck to save contents\nin the project':
        'AV, lagre innhold\ni prosjektet',
    'check to prevent contents\nfrom being saved':
        'P\u00C5 unng\u00E5 lagring av innhold\ni prosjektet',
    'new line':
        'ny linje',

    // custom blocks:
    'delete block definition...':
        'slett blokkdefinisjoner...',
    'duplicate block definition...':
        'dupliser blokkdefinisjoner...',
    'edit...':
        'editer...',

    // sprites:
    'edit':
        'editer',
    'clone':
        'klone',
    'move':
        'bevege',
    'pivot':
        'senterpunkt',
    'edit the costume\'s\nrotation center':
        'endre draktens rotasjonspunkt',
    'rotate':
    	'roter',
    'stick to':
        'lim til',
    'detach from':
        'separer fra',
    'detach all parts':
        'separer alle deler',
    'export...':
        'eksporter...',
    'parent...':
        'forelder...',
    'current parent':
        'gjeldende forelder',
    'release':
        'slipp',
    'make temporary and\nhide in the sprite corral':
        'lag midlertidig\nog skjul i figur corral',

    // stage:
    'show all':
        'vis alle',
    'pic...':
        'eksporter bilde...',
    'save a picture\nof the stage':
        'lagre et bilde av scenen',
    'svg...':
        'SVG eksport...',
    'export pen trails\nline segments as SVG':
        'eksporter pennespor\som SVG',
    'there are currently no\nvectorizable pen trail segments':
        'det finnes ingen tilgjengelige\nvektoriserbare pennespor',
    'turn all pen trails and stamps\ninto a new background for the stage':
        'gj\u00F8r alle pennespor og trykk\ntil en ny bakgrunn',
    'turn all pen trails and stamps\ninto a new costume for the\ncurrently selected sprite':
        'gj\u00F8r alle pennespor og trykk\ntil en ny drakt for valgte figur',

    // scripting area
    'clean up':
        'rydd opp',
    'arrange scripts\nvertically':
        'ordne skripter vertikalt',
    'add comment':
        'legg til kommentar',
    'undrop':
        'un-dropp',
    'undo the last\nblock drop\nin this pane':
        'gj\u00F8r om siste blokk dropp\ni dette panelet',
    'redrop':
        're-dropp',
    'use the keyboard\nto enter blocks':
    	'bruk tastatur\ntil \u00E5 lage blokker',
    'scripts pic...':
        'skript bilde...',
    'save a picture\nof all scripts':
        'lagre et bilde av samtlige skripter',
    'make a block...':
        'lag ny blokk...',

    // costumes
    'rename':
        'endre navn',
    'export':
        'eksporter',
    'rename costume':
        'endre draktnavn',

    // sounds
    'Play sound':
        'Spill lyd',
    'Stop sound':
        'Stopp lyd',
    'Stop':
        'Stopp',
    'Play':
        'Play',
    'rename sound':
        'endre lydnavn',

    // lists and tables
    'list view...':
        'liste visning...',
    'table view...':
        'tabell visning...',
    'Table view':
        'Tabellvisning',
    'open in dialog...':
        '\u00E5pne med dialogvindu',
    'blockify':
        'som blokk',
    'reset columns':
        'tilbakestill kolonner',
    'items':
        'elementer',

    // dialogs
    // buttons
    'OK':
        'OK',
    'Ok':
        'Ok',
    'Cancel':
        'Avbryt',
    'Yes':
        'Ja',
    'No':
        'Nei',

    // help
    'Help':
        'Hjelp',

    // zoom blocks
    'Zoom blocks':
        'Zoom in blokker',
    'build':
        'bygge',
    'your own':
        'egne',
    'blocks':
        'blokker',
    'normal (1x)':
        'normal (1x)',
    'demo (1.2x)':
        'demo (1.2x)',
    'presentation (1.4x)':
        'presentasjon (1.4x)',
    'big (2x)':
        'stor (2x)',
    'huge (4x)':
        'kjempestor (4x)',
    'giant (8x)':
        'gigantisk (8x)',
    'monstrous (10x)':
        'monsterstort (10x)',

    // fade blocks
    'Fade blocks':
        'Fade ut blokker',
    'block-solid (0)':
        'normal (0)',
    'medium (50)':
        'middels (50)',
    'light (70)':
        'lett (70)',
    'shimmering (80)':
        'skimrende (80)',
    'elegant (90)':
        'elegant (90)',
    'subtle (95)':
        'subtil (95)',
    'text-only (100)':
        'bare tekst (100)',

    // Project Manager
    'Untitled':
        'Uten navn',
    'Open Project':
        '\u00C5pne prosjekt',
    'Open':
        '\u00C5pne',
    '(empty)':
        '(tomt)',
    'Saved!':
        'Lagret!',
    'Delete Project':
        'Slett prosjekt',
    'Are you sure you want to delete':
        'Er du sikker om sletting?',
    'rename...':
        'nytt navn...',
    'Examples':
        'Eksempler',
    'Share':
        'Dele',
    'Unshare':
        'Ikke lenger dele',
    'Publish':
        'Publiser',
    'Unpublish':
        'Ikke lenger publisere',
    'Updating\nproject list...':
        'Oppdatere prosjektliste...',
    'Recover':
        'Tilbakestille',
    'Today':
        'I dag',
    'Yesterday':
        'I g\u00E5r',

    // costume editor
    'Costume Editor':
        'Drakteditor',
    'Paint Editor':
        'Tegne editor',
    'click or drag crosshairs to move the rotation center':
        'klikk kors og dra for \u00E5 flytte rotasjonssenteret',
    'undo':
        'gj\u00F8r om',
    'Vector':
        'Vektor',
    'Paintbrush tool\n(free draw)':
        'Penselverkt\u00F8y\n(fri tegning)',
    'Stroked Rectangle\n(shift: square)':
        'Stroked rektangel\n(Skift: kvadrat)',
    'Stroked Ellipse\n(shift: circle)':
        'Stroked ellipse\n(Skift: sirkel)',
    'Eraser tool':
        'Viskel\u00E6r',
    'Set the rotation center':
        'Sett rotasjonssenteret',
    'Line tool\n(shift: vertical/horizontal)':
        'Linieverkt\u00F8y\n(Skift: vertikal/horisontal)',
    'Filled Rectangle\n(shift: square)':
        'fylt rektangel\n(Skift: kvadrat)',
    'Filled Ellipse\n(shift: circle)':
        'gefüllte Ellipse\n(Shift: Kreis)',
    'Fill a region':
        'fyll omr\u00E5de med\n valgt farge',
    'Pipette tool\n(pick a color anywhere)':
        'Pipette (klikk for henting av \u00F8nsket farge)',
    'Brush size':
        'Penselsize',
    'Constrain proportions of shapes?\n(you can also hold shift)':
        'Fastsett proporsjoner til formene\n(Skift-tast)',
    //'grow':
    //    'st\u00F8rre',
    //'shrink':
    //    'mindre',
    //'flip ↔':
    //    'dreie ↔',
    //'flip ↕':
    //    'dreie ↕',
    
    'Vector Paint Editor':
        'Vektor-Editor',
    'Rectangle\n(shift: square)':
        'Rektangel\n(Skift: kvadrat)',
    'Ellipse\n(shift: circle)':
        'Ellipse\n(Skift: sirkel)',
    'Selection tool':
        'Markeringsverkt\u00F8y',
    'Line tool\n(shift: constrain to 45º)':
        'Linieverkt\u00F8y\n(Skift: Multippel av 45°)',
    'Closed brush\n(free draw)':
        'Lukket og fylt form\n(fritegning)',
    'Paint a shape\n(shift: secondary color)':
        'fyll omr\u00E5det med \u00F8nsket farge\n(Skift: Sekund\u00E6rfarge)',
    'Pipette tool\n(pick a color from anywhere\nshift: secondary color)':
        'Pipetteverkt\u00F8y\n(klikk for henting av \u00F8nsket farge) (Skift: Sekund\u00E6rfarge)',
    'Edge color\n(left click)':
        'Kantfarge\n(klikk venstre)',
    'Fill color\n(right click)':
        'Fyllfarge\n(klikk h\u00F8yre)',
   // 'Top':
   //     'Topp',
   // 'Bottom':
   //     'Bunn',
   // 'Up':
   //     'Opp',
   // 'Down':
   //     'Ned',


    // project notes
    'Project Notes':
        'Prosjektnotater',

    // new project
    'New Project':
        'Nytt prosjekt',
    'Replace the current project with a new one?':
        'Erstatt dette prosjekt med et nytt',

    // save project
    'Save Project As...':
        'Lagre prosjekt som...',
    'Save Project':
        'Lagre prosjekt',

    // export blocks
    'Export blocks':
        'Eksporter blokker',
    'Import blocks':
        'Importer blokker',
    'this project doesn\'t have any\ncustom global blocks yet':
        'dette prosjektet har ikke\negne globale blokker enda',
    'select':
        'velge',
    'none':
        'ingen',

    // variable dialog
    'for all sprites':
        'for alle figurer',
    'for this sprite only':
        'kun for denne figur',

    // variables refactoring
    'rename only\nthis reporter':
        'endre navn kun\nfor denne funksjonen',
    'rename all...':
        'endre navn p\u00E5 alle...',
    'rename all blocks that\naccess this variable':
        'endre navn til alle blokker,\nsom refererer til denne variabelen',


    // block dialog
    'Change block':
        'Endre blokken',
    'Command':
        'Command',
    'Reporter':
        'Funksjon',
    'Predicate':
        'Predikat',

    // block editor
    'Block Editor':
        'Blokk editor',
    'Method Editor':
        'Metode editor',
    'Apply':
        'Anvende',

    // block deletion dialog
    'Delete Custom Block':
        'Slett blokken',
    'block deletion dialog text':
        'Slette denne blokken med alle dens brukene?',

    // input dialog
    'Create input name':
        'Lag input navn',
    'Edit input name':
        'Endre input navn',
    'Edit label fragment':
        'Endre navn',
    'Title text':
        'Tittel tekst',
    'Input name':
        'Input navn',
    'Delete':
        'Slette',
    'Object':
        'Figur',
    'Number':
        'Tall',
    'Text':
        'Tekst',
    'List':
        'Liste',
    'Any type':
        'Hvilken som helst type',
    'Boolean (T/F)':
        'Boolsk (S/U)',
    'Command\n(inline)':
        'Command',
    'Command\n(C-shape)':
        'Command\n(C-Form)',
    'Any\n(unevaluated)':
        'Hvilken som helst\n(uevaluert)',
    'Boolean\n(unevaluated)':
        'Boolsk\n(uevaluert)',
    'Single input.':
        'Singel input.',
    'Default Value:':
        'Default verdi:',
    'Multiple inputs (value is list of inputs)':
        'Flere input (som liste)',
    'Upvar - make internal variable visible to caller':
        'Interne variable - synlig for den som kaller',

    // About Snap
    'About Snap':
        'Om Snap',
    'Back...':
        'Tilbake...',
    'License...':
        'Lisens...',
    'Modules...':
        'Moduler...',
    'Credits...':
        'Takk til...',
    'Translators...':
        'Oversettere',
    'License':
        'Lisens',
    'current module versions:':
        'gjeldende modulversjon:',
    'Contributors':
        'Bidragsytere',
    'Translations':
        'Oversettelser',

    // variable watchers
    'normal':
        'normal',
    'large':
        'stor',
    'slider':
        'slider',
    'slider min...':
        'min.verdi...',
    'slider max...':
        'max.verdi...',
    'import...':
        'Importer...',
    'raw data...':
        'basisdata...',
    'import without attempting to\nparse or format data':
        'importer uformatert (uten parsing)',
    'Slider minimum value':
        'Min-verdi slider',
    'Slider maximum value':
        'Max-verdi slider',

    // list watchers
    'length: ':
        'lengde: ',

    // comments
    'add comment here...':
        'legg til kommentar her...',
    'comment pic...':
        'kommentarbilde...',
    'save a picture\nof this comment':
        'lagre et bilde av kommentaren',

    // drow downs
    // directions
    '(90) right':
        '(90) h\u00F8yre',
    '(-90) left':
        '(-90) venstre',
    '(0) up':
        '(0) oppe',
    '(180) down':
        '(180) nede',
    'random':
    	'tilfeldig',
     'random position':
     	'tilfeldig posisjon',

    // collision detection
    'mouse-pointer':
        'muspeker',
    'edge':
        'kant',
    'pen trails':
        'pennsporer',
    'center':
        'senter',

    // costumes
    'Turtle':
        'retningspeker',
    'Empty':
        'Tomt',
    'Paint a new costume':
        'Tegn ny drakt',
    'Import a new costume from your webcam':
        'Importer ny drakt med webcam',
    'Please make sure your web browser is up to date\nand your camera is properly configured. \n\nSome browsers also require you to access Snap!\nthrough HTTPS to use the camera.\n\nPlase replace the "http://" part of the address\nin your browser by "https://" and try again.':
        'Sjekk om nettleser er oppdatert\nog om Webcam er konfigurert.\n\nFor noen nettlesere m\u00E5 Snap! \u00E5pnes med HTTPS \n, for bruk av kamera.\n\nErstatt "http://"-delen med "https://"',
    'Camera':
        'Kamera',
    
    // sounds
    'Record a new sound':
        'Ta opp ny lyd',
    

    // graphical effects, pen color
    'color':
        'farge',
    'hue':
        'fargetone',
    'fisheye':
        'fiske\u00F8ye',
    'whirl':
        'virvel',
    'pixelate':
        'pixler',
    'mosaic':
        'mosaik',
    'saturation':
        'mettning',
    'brightness':
        'lysstyrke',
    'transparency':
        'transparens',
    'ghost':
        'gjennomsiktighet',
    'negative':
        'fargenegativ',
    'comic':
        'moire',
    'confetti':
        'fargeforskyvninger',

    // keys
    'space':
        'mellomrom',
    'up arrow':
        'pil opp',
    'down arrow':
        'pil ned',
    'right arrow':
        'pil h\u00F8yre',
    'left arrow':
        'pil venstre',
    'any key':
        'hvilken som helst tast',
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
    '__shout__go__':
        'gr\u00F8nt flagg klikket',

    // math functions
    'abs':
        'abs',
    'ceiling':
        'rundet opp',
    'floor':
        'rundet ned',
    'sqrt':
        'kvadratrot',
    'sin':
        'sin',
    'cos':
        'cos',
    'tan':
        'tan',
    'asin':
        'sin-1',
    'acos':
        'cos-1',
    'atan':
        'tan-1',
    'ln':
        'ln',
    'e^':
        'e^',

    // Boolean expressions keyboard entry
    'not':
        'IKKE',

    // delimiters
    'letter':
        'bokstav',
    'word':
        'ord',
    'whitespace':
        'mellomrom',
    'line':
        'nylinje',
    'tab':
        'tabulator',
    'cr':
        'CR',

    // data types
    'number':
        'Tall',
    'text':
        'Tekst',
    'Boolean':
        'Boolsk',
    'list':
        'Liste',
    'command':
        'Command',
    'reporter':
        'Funksjon',
    'predicate':
        'Predikat',
    'sprite':
        'Figur',

    // list indices
    'last':
        'siste',
    'any':
        'tilfeldig',

    // attributes
    'my':
        'attributt',
    'neighbors':
        'naboer',
    'self':
        'selv',
    'other sprites':
        'andre figurer',
    'parts':
        'deler',
    'anchor':
        'anker',
    'parent':
        'forelder',
    'temporary?':
        'midlertidig?',
    'children':
        'barn',
    'clones':
        'klon',
    'other clones':
        'andre kloner',
    'dangling?':
        'hengende??',
    'draggable?':
        'kan dras?',
    'rotation style':
        'rotasjonsstil',
    'rotation x':
        'rotasjon x',
    'rotation y':
        'rotasjon y',
    'center x':
        'senter x',
    'center y':
        'senter y',
    'name':
        'navn',
    'costume':
        'Drakt',
    'stage':
        'Scene',
    'costumes':
        'Drakter',
    'sounds':
        'Lyder',
    'scripts':
        'Skripter',
    'width':
        'bredde',
    'height':
        'h\u00F8yde',
    'left':
        'venstre kant',
    'right':
        'h\u00F8yde kant',
    'top':
        'topp kant',
    'bottom':
        'bunn kant',

    // inheritance
    'inherited':
        'arvet',
    'check to inherit\nfrom':
        'P\u00C5 for \u00E5 arve\nfra',
    'uncheck to\ndisinherit':
        'AV for ikke lenger\narve fra'
};
