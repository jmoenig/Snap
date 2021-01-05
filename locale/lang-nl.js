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

    Ä, ä   \u00c4, \u00e4	ï \u00ef
    Ö, ö   \u00d6, \u00f6
    Ü, ü   \u00dc, \u00fc
    ß      \u00df
*/

    // translations meta information
    'language_name':
        'Nederlands', // the name as it should appear in the language menu
    'language_translator':
        'Joek van Montfort, Sjoerd Dirk Meijer, Frank Sierens, Jan-Gerard van der Toorn', // your name for the Translators tab
    'translator_e-mail':
        'joek@xota.nl, sjoerddirk@fromScratchEd.nl, frank.sierens@telenet.be, jg.2019@xs4all.nl', // optional
    'last_changed':
        '2020-12-15', // this, too, will appear in the Translators tab

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
    'add a new Turtle sprite':
        'een nieuw object toevoegen',
    'paint a new sprite':
        'teken een nieuwe sprite',
    'take a camera snapshot and\nimport it as a new sprite':
        'nieuw object met webcam-uiterlijk toevoegen',

    // tab help
    'costumes tab help':
        'je kunt afbeeldingen van een andere website of je\n'
            + 'eigen computer naar dit werkblad slepen',
    'import a sound from your computer\nby dragging it into here':
        'importeer een geluid vanaf je computer\ndoor deze naar dit werkblad te slepen',

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
        'Speelveld geselecteerd:\ngeen bewegingsblokken beschikbaar',

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
        'volgend uiterlijk',
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
    '%img of costume %cst':
        '%img van uiterlijk %cst',
    'new costume %l width %dim height %dim':
        'nieuw uiterlijk %l breedte %dim hoogte %dim',
    'stretch %cst x: %n y: %n %':
        'rek uit %cst x: %n y: %n %',
    'change %eff effect by %n':
        'verander %eff -effect met %n',
    'set %eff effect to %n':
        'maak %eff -effect %n',
    'clear graphic effects':
        'zet grafische effecten uit',
    '%eff effect':
        '%eff -effect',
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
    'shown?':
        'getoond?',
    'go to %layer layer':
        'ga naar %layer laag',
    'front':
        'voorste',
    'back':
        'achterste',
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

    'pixels':
        'pixels',
    'current':
        'huidige',

    // sound:
    'play sound %snd':
        'speel geluid %snd',
    'play sound %snd until done':
        'speel geluid %snd en wacht',
    'stop all sounds':
        'stop alle geluiden',
    'rest for %n beats':
        'pauzeer %n tellen',
    'play sound %snd at %rate Hz':
        'speel geluid %snd op %rate Hz',
    '%aa of sound %snd':
        '%aa van geluid %snd',
    'duration':
        'duur',
    'length':
        'lengte',
    'number of channels':
        'aantal kanalen',
    'new sound %l rate %rate Hz':
        'nieuw geluid %l op %rate Hz',
    'play note %note for %n beats':
        'speel noot %note %n tellen',
    'set instrument to %inst':
        'zet klank op %inst',
    'change tempo by %n':
        'verander tempo met %n',
    'set tempo to %n bpm':
        'maak tempo %n bpm',
    'tempo':
        'tempo',
   'change volume by %n':
        'verander volume met %n',
    'set volume to %n %':
        'zet volume op %n %',
    'change balance by %n':
        'verander balans met %n',
    'set balance to %n':
        'zet balans op %n',
    'balance':
        'balans',
    'play frequency %n Hz':
        'speel frequentie %n Hz',
    'stop frequency':
        'stop afspelen frequentie',
    'play %n Hz for %n secs':
        'speel %n Hz gedurende %n Sek.',

    // "instruments", i.e. wave forms
    '(1) sine':
        '(1) sinus',
    '(2) square':
        '(2) blokgolf',
    '(3) sawtooth':
        '(3) zaagtand',
    '(4) triangle':
        '(4) driehoek',

    // pen:
    'clear':
        'wissen',
    'pen down':
        'pen neer',
    'pen up':
        'pen omhoog',
    'pen down?':
        'pen neer?',
    'set pen color to %clr':
        'maak penkleur %clr',
    'set background color to %clr':
        'maak achtergrondkleur %clr',
    'change pen %hsva by %n':
        'verander pen %hsva met %n',
    'set pen %hsva to %n':
        'maak pen %hsva %n',
    'change achtergrondkleur %hsva by %n':
        'verander pen %hsva met %n',
    'set achtergrondkleur %hsva to %n':
        'maak pen %hsva %n',
    'pen %pen':
        'pen %pen',
    'change pen size by %n':
        'verander pengrootte met %n',
    'set pen size to %n':
        'maak pengrootte %n',
    'stamp':
        'stempel',
    'fill':
        'vul',
    'write %s size %n':
        'schrijf %s grootte %n',
    'paste on %spr':
        'plak op %spr',
    'cut from %spr':
        'knip uit %spr',
    'pen vectors':
        'pen vectoren',

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
        'aangeraakt door de muis',
    'mouse-departed':
        'niet meer door de muis aangeraakt',
    'scrolled-down':
    	'naar beneden gescrollt',
    'scrolled-up':
        'naar boven gescrollt',
    'stopped':
        'gestopt',
    'when %b':
        'wanneer %b',
    'when I receive %msgHat':
        'wanneer ik %msgHat ontvang',
    'broadcast %msg':
        'zend signaal %msg',
    'broadcast %msg and wait':
        'zend signaal %msg en wacht',
    'send %msg to %spr':
        'zend %msg naar %spr',
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
    'for %upvar = %n to %n %cla':
        'voor %upvar = %n tot %n %cla',
    'if %b %c':
        'als %b %c',
    'if %b %c else %c':
        'als %b %c anders %c',
    'if %b then %s else %s':
        'als %b dan %s anders %s',
    'report %s':
        'rapporteer %s',
    'stop %stopChoices':
        'stop %stopChoices',
    'all':
        'alles',
    'this script':
        'dit script',
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
    'a new clone of %cln':
        'nieuwe kloon van %cln',
    'myself':
        'mijzelf',
    'delete this clone':
        'verwijder deze kloon',
    'tell %spr to %cmdRing %inputs':
        'zeg %spr %cmdRing te doen %inputs',
    'ask %spr for %repRing %inputs':
        'vraag %spr naar %repRing %inputs',

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
    '%rel to %dst':
        '%rel tot %dst',
    'distance':
    	'afstand',
    'ray length':
        'straallengte',
    '%asp at %loc' :
        '%asp op %loc',
    'r-g-b-a':
        'R-G-B-A kleurcode',
    'sprites' :
        'objecten',
    'reset timer':
        'zet tijd op nul',
    'timer':
        'tijd',
    '%att of %spr':
        '%att van %spr',
    'my %get':
        'mijn %get',
    'object %self':
        'object %self',
    'http:// %s':
        'http:// %s',
   'turbo mode':
        'turbomodus',
    'flat line ends':
        'rechte lijneindes',
    'is %setting on?':
        'is %setting aan?',
    'set %setting to %b':
        'zet %setting op %b',
    'current %dates':
        'huidig(e) %dates',
    'year':
        'jaar',
    'month':
        'maand',
    'date':
        'datum',
    'day of week':
        'weekdag',
    'hour':
        'uur',
    'minute':
        'minuut',
    'second':
        'seconde',
    'time in milliseconds':
        'tijd in millisecondes',
    'microphone %audio':
        'microfoon %audio',
    'volume':
        'volume',
    'note':
        'noot',
    'frequency':
        'frequentie',
    'samples':
        'samples',
    'sample rate':
        'sample rate',
    'spectrum':
        'frequentie spectrum',
    'resolution':
        'resolutie',
    'Microphone resolution...':
        'Microfoon resolutie...',
    'Microphone':
        'Microfoon',
    'low':
        'laag',
    'high':
        'hoog',
    'max':
        'max',
    'video %vid on %self':
        'video %vid op %self',
    'motion':
        'beweging',
    'snap':
        'beeld',
    'set video transparency to %n':
        'zet videotransparantie op %n',
    'video capture':
        'videoopname',
    'mirror video':
        'spiegel video',
    'filtered for %clr':
        'gefilterd op %clr',
    'stack size':
        'stapelgrootte',
    'frames':
        'beelden',
    'log pen vectors':
        'vectortekening',

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
        'is %s identiek aan %s ?',
    'JavaScript function ( %mult%s ) { %code }':
        'JavaScript functie ( %mult%s ) { %code }',
    'compile %repRing':
    	'compileer %repRing',

    'type of %s':
        'type van %s',

    // variables:
    'Make a variable':
        'Maak een variabele',
    'Variable name':
        'Variabelenaam',
    'Script variable name':
        'Scriptvariabelenaam',
    'inherit %shd':
        'erf %shd van ouder',
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
    'numbers from %n to %n':
        'getallen van %n tot %n',
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
    'is %l empty?':
        'is %l leeg?',
    'index of %s in %l':
        'index van %s in %l',
    'map %repRing over %l':
        'map %repRing over %l',
    'keep items %predRing from %l':
        'behoud elementen met %predRing uit %l',
    'find first item %predRing in %l':
        'vind eerste element met %predRing in %l',
    'combine %l using %repRing':
        'combineer elementen van %l met %repRing',
    '%blitz map %repRing over %l':
        '%blitz map %repRing over %l',
    '%blitz keep items %predRing from %l':
        '%blitz behoud elementen met %predRing uit %l',
    '%blitz find first item %predRing in %l':
        '%blitz vind eerste element met %predRing in %l',
    '%blitz combine %l using %repRing':
        '%blitz combineer elementen van %l met %repRing',
    'for each %upvar in %l %cla':
        'voor iedere %upvar van %l %cla',
    'item':
        'element',
    'value':
        'waarde',
    'index':
        'index',
    'append %lists':
        'voeg %lists samen',
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
        'Over Snap!...',
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
        'naar ontwikkelmodus wisselen',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'gebruik Morphic\nniet gebruikersvriendelijk!',

    // project menu
    'Project notes...':
        'Notities...',
    'New':
        'Nieuw',
    'Open...':
        'Open...',
    'Save':
        'Bewaar',
    'Save to disk':
        'Opslaan op schijf',
    'store this project\nin the downloads folder\n(in supporting browsers)':
        'Sla dit projekt op\nin de downloads folder\n(alleen voor browsers die dit ondersteunen)',
    'Save As...':
        'Bewaar als...',
    'Import...':
        'Importeer...',
    'file menu import hint':
        'importeer een project,\neen bibliotheek met '
            + 'blokken,\n'
            + 'een uiterlijk of een geluid',
    'Export project as plain text...':
        'Project exporteren als tekst...',
    'Export project...':
        'Project exporteren...',
    'save project data as XML\nto your downloads folder':
        'Bewaar project als XML-file in map Downloads',
    'show project data as XML\nin a new browser window':
        'Toon projectdata als XML\nin een nieuw browservenster',
    'Export blocks...':
        'Blokken exporteren...',
    'show global custom block definitions as XML\nin a new browser window':
        'toon globale zelfgemaakte blokdefinities\nals XML in browser',
    'Unused blocks...':
          'Ongebruikte blokken...',
    'find unused global custom blocks\nand remove their definitions':
        'zoek ongebruikte globale zelfgemaakte blokken\nen ruim ze op',
    'Remove unused blocks':
        'Ruim ongebruikte blokken op',
    'there are currently no unused\nglobal custom blocks in this project':
        'er zijn nu geen ongebruikte globale\nzelfgemaakte blokken in dit project',
    'unused block(s) removed':
        'ongebruikte blokken opgeruimd',
    'Export summary...':
        'Exporteer samenvatting...',
    'save a summary\nof this project':
        'Bewaar samenvatting van project \nin map Downloads',
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
    'Libraries...':
        'Bibliotheken...',
    'Select categories of additional blocks to add to this project.':
        'Selecteer een groep van extra blokken \nom aan dit project toe te voegen',
    'Select a costume from the media library':
        'Kies een uiterlijk uit de bibliotheek met uiterlijken',
    'Select a sound from the media library':
        'Kies een geluid uit de bibliotheek met geluiden',

    //Libraries
    'Import library':
        'Bibliotheek laden',
    'Loading':
        'Aan het laden',
    'Imported':
        'Ge\u00efmporteerd',
    'Iteration, composition':
        'Herhaling, Samenstelling',
    'List utilities':
        'Lijst gereedschappen',
    'Variadic reporters':
        'Variadische functies',
    'Web services access (https)':
        'Verbinding met Webservices',
    'Multi-branched conditional (switch)':
        'Meervoudige voorwaarden (switch)',
    'LEAP Motion controller':
        'LEAP Motion Controller',
    'Words, sentences':
        'Woorden en zinnen',
    'Catch errors in a script':
        'Foutafhandeling in script',
    'Set RGB or HSV pen color':
        'Penkleuren instellen op RGB of HSV waarde',
    'Text to speech':
        'Tekst naar spraak',
    'Provide 100 selected colors':
        '100 uitgezochte kleuren',
    'Infinite precision integers, exact rationals, complex':
        'Oneindige precisie met gehele getallen, exacte breuken, complexe getallen',
    'Provide getters and setters for all GUI-controlled global settings':
        'Blokken om interface instellingen op te vragen en in  te stellen',
    'Allow multi-line text input to a block':
        'Meerregelige tekst invoer in blokken',
    'Create variables in program':
        'Maak variabelen met een script',

    // cloud menu
    'Login...':
        'Inloggen...',
    'Signup...':
        'Registreren...',
    'Logout':
        'Uitloggen',
    'Change Password...':
        'Wachtwoord wijzigen...',
    'Reset Password...':
        'Wachtwoord herstellen...',
    'Resend Verification Email...':
        'Stuur bevestigingsmail nogmaals...',
    'Open in Community Site':
        'Ga naar projectpagina',

    // settings menu
    'Language...':
        'Taal...',
    'Zoom blocks...':
        'Blokken inzoomen...',
    'Fade blocks...':
        'Blokken dimmen...',
    'Stage size...':
        'Afmeting speelveld...',
    'Stage size':
        'Speelveld afmeting',
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
        'uitschakelen om toe te staan dat lege functies\n anderen uitsluiten',
    'check to turn on\n visible stepping (slow)':
        'aanvinken om programma stap-voor-stap te volgen (langzaam)',
    'uncheck to turn off\nvisible stepping':
        'uitvinken om programma niet meer stap-voor-stap te volgen',
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
        'uitvinken om het virtueel\ntoetsenbord uit te schakelen\nvoor mobiele apparaten',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'aanvinken om het virtueel\ntoetsenbord in te schakelen\nvoor mobiele apparaten',
    'Input sliders':
        'Invoer schuifbalk',
    'uncheck to disable\ninput sliders for\nentry fields':
        'uitvinken om\nschuifbalken voor invoer\nuit te schakelen',
    'check to enable\ninput sliders for\nentry fields':
        'aanvinken om\nschuifbalken voor invoer\nin te schakelen',
    'Retina display support':
        'Retina beeldscherm ondersteuning',
    'uncheck for lower resolution,\nsaves computing resources':
        'uitvinken voor een lagere beeldschermresolutie\nmaakt programma sneller',
    'check for higher resolution,\nuses more computing resources':
        'aanvinken voor een hogere beeldschermresolutie\nmaakt programma langzamer',
    'Codification support':
        'Ondersteuning voor codificatie',
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
    'check for alternative\nGUI design':
        'aanvinken voor alternatieve weergave',
    'uncheck for default\nGUI design':
        'uitvinken voor de standaard weergave',
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
    'Ternary Boolean slots':
        'Drieledige invoer van Booleans',
    'Inheritance support':
        'Gebruik overerving',
    'Hyper blocks support':
        'Hyperblokken',
    'uncheck to disable\nusing operators on lists and tables':
         'uitvinken om operatoren niet op lijsten en tabellen te laten werken',
    'check to enable\nusing operators on lists and tables':
         'aanvinken om operatoren ook op lijsten en tabellen te laten werken',
    'Log pen vectors':
        'Log pen als vector',
    'uncheck to turn off\nlogging pen vectors':
        'uitvinken om pensporen niet op te slaan',
    'check to turn on\nlogging pen vectors':
        'aanvinken om pensporen als vector op te slaan',

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
    'find blocks':
        'vind blokken',
    'hide primitives':
        'basisblokken verbergen',
    'show primitives':
        'basisblokken tonen',

    // blocks:
    'help...':
        'help...',
    'relabel...':
        'label hernoemen...',
    'compile':
        'compileren',
    'uncompile':
        'decompileren',
    'duplicate':
        'kopieer',
    'make a copy\nand pick it up':
        'maak een kopie\nen gebruikt het',
    'only duplicate this block':
        'alleen dit blok kopi\u00EBren',
    'extract':
        'onttrekken',
    'only grab this block':
        'alleen dit blok oppakken',
    'delete':
        'verwijder',
    'senders...':
        'zenders...',
    'receivers...':
        'ontvangers...',
    'script pic...':
        'scriptafbeelding...',
    'save a picture\nof this script':
        'bewaar een afbeelding \nvan dit script',
    'result pic...':
        'script en resultaat...',
    'save a picture of both\nthis script and its result':
        'bewaar een afbeelding van dit script met het resultaat',
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
    'new line':
        'nieuwe regel',

    // custom blocks:
    'delete block definition...':
        'verwijder blokdefinitie',
    'duplicate block definition...':
        'kopi\u00eber blokdefinitie...',
    'export block definition...':
        'exporteer blokdefinitie...',
    'including dependencies':
        'inclusief alle gebruikte blokken',
    'edit...':
        'bewerken...',

    // sprites:
    'edit':
        'bewerken',
    'clone':
        'klonen',
    'move':
        'verplaatsen',
    'pivot':
        'draaipunt',
    'edit the costume\'s\nrotation center':
        'draaipunt van uiterlijk tonen en aanpassen',
    'rotate':
    	'draaien',
    'stick to':
        'vastmaken aan',
    'detach from':
        'losmaken van',
    'detach all parts':
        'alle onderdelen losmaken',
    'export...':
        'exporteren...',
    'parent...':
        'ouder...',
    'current parent':
        'huidige ouder',
    'release':
        'loslaten',
    'make temporary and\nhide in the sprite corral':
        'maak tijdelijk\nen verberg icoon',

    // stage:
    'show all':
        'toon alles',
    'pic...':
        'afbeelding...',
    'save a picture\nof the stage':
        'ein Bild der\nBühne speichern',
    'svg...':
        'SVG exporteren...',
    'export pen trails\nline segments as SVG':
        'exporteer pensporen als\nvektorafbeelding (SVG)',
    'there are currently no\nvectorizable pen trail segments':
        'er zijn nu geen vertoriseerbare pensporen',
    'turn all pen trails and stamps\ninto a new background for the stage':
        'gebruik pensporen en stempels als \nnieuwe achtergrond van het speelveld',
    'turn all pen trails and stamps\ninto a new costume for the\ncurrently selected sprite':
        'gebruik pensporen en stempels als nieuw \nuiterlijk van de geselecteerde sprite',

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
    'use the keyboard\nto enter blocks':
    	'gebruik toetsenbord om blokken te verplaatsen',
    'scripts pic...':
        'Afbeelding van alle scripts...',
    'save a picture\nof all scripts':
        'bewaar een afbeelding van alle scripts',
    'make a block...':
        'maak een blok...',

    // costumes
    'rename':
        'hernoemen',
    'export':
        'exporteren',
    'rename costume':
        'uiterlijk hernoemen',
    'rename background':
        'achtergrond hernoemen',

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
    'Table view':
        'Tabelweergave',
    'open in dialog...':
        'in nieuw venster openen...',
    'blockify':
        'als blok',
    'reset columns':
        'kolombreedte terugzetten',
    'items':
        'elementen',

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

    // fade blocks
    'Fade blocks':
        'Blokken dimmen',
    'block-solid (0)':
        'normaal (0)',
    'medium (50)':
        'half (50)',
    'light (70)':
        'licht (70)',
    'shimmering (80)':
        'schemerend (80)',
    'elegant (90)':
        'elegant (90)',
    'subtle (95)':
        'subtiel (95)',
    'text-only (100)':
        'alleen tekst (100)',

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
    'Examples':
        'Voorbeelden',
    'Share':
        'Delen',
    'Unshare':
        'Niet meer delen',
    'Publish':
        'Publiek maken',
    'Unpublish':
        'Privé maken',
    'Updating\nproject list...':
        'Lijst van projecten laden',
    'Recover':
        'Herstellen',
    'Today':
        'Vandaag',
    'Yesterday':
        'Gisteren',

    // costume editor
    'Costume Editor':
        'Uiterlijk bewerken',
    'Paint Editor':
        'Tekenprogramma',
    'click or drag crosshairs to move the rotation center':
        'Klik of sleep de kruisdraden om het rotatiecentrum te verplaatsen',
    'undo':
        'maak ongedaan',
    'Vector':
        'Vector',
    'Paintbrush tool\n(free draw)':
        'Kwast\n(vrij tekenen)',
    'Stroked Rectangle\n(shift: square)':
        'Rechthoek\n(Shift: vierkant)',
    'Stroked Ellipse\n(shift: circle)':
        'Ellips\n(Shift: cirkel)',
    'Eraser tool':
        'Gum',
    'Set the rotation center':
        'Draaipunt instellen',
    'Line tool\n(shift: vertical/horizontal)':
        'Lijn\n(Shift: vertikal / horizontaal)',
    'Filled Rectangle\n(shift: square)':
        'Gevulde rechthoek\n(Shift: vierkant)',
    'Filled Ellipse\n(shift: circle)':
        'Gevulde ellips\n(Shift: cirkel)',
    'Fill a region':
        'Vul een gedeelte',
    'Pipette tool\n(pick a color anywhere)':
        'Pipet (klik ergens op de gewenste kleur)',
    'Brush size':
        'Kwastdikte',
    'Constrain proportions of shapes?\n(you can also hold shift)':
        'Vorm vasthouden?\n(kan ook met Shift-toets)',
    'grow':
       'groter',
    'shrink':
       'kleiner',
    'flip horizontal':
       'spiegelen ↔',
    'flip vertical':
       'spiegelen ↕',
    
    'Vector Paint Editor':
        'Vector Tekenprogramma',
    'Rectangle\n(shift: square)':
        'Rechthoek\n(Shift: vierkant)',
    'Ellipse\n(shift: circle)':
        'Ellips\n(Shift: cirkel)',
    'Selection tool':
        'Selecteer',
    'Line tool\n(shift: constrain to 45º)':
        'Lijn\n(Shift: veelvouden van 45°)',
    'Closed brush\n(free draw)':
        'gesloten gevulde vorm\n(vrij tekenen)',
    'Paint a shape\n(shift: edge color)':
        'vul een vorm\n(Shift: randkleur)',
    'Pipette tool\n(pick a color from anywhere\nshift: secondary color)':
        'Pipet\nklik ergens op de gewenste kleur (Shift: secundaire kleur)',
    'Edge color\n(left click)':
        'Randkleur\n(Linksklik)',
    'Fill color\n(right click)':
        'Vulkleur\n(Rechtsklik)',
   'Top':
       'voor',
   'Bottom':
       'achter',
   'Up':
       'naar voren',
   'Down':
       'naar achter',

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
        'dit project\nbevat nog geen zelfgemaakte \nglobale blokken',
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
        'Opdracht',
    'Reporter':
        'Functie',
    'Predicate':
        'Predicaat',

    // block editor
    'Block Editor':
        'Blok bewerken',
    'Method Editor':
        'Methode editor',
    'Apply':
        'Toepassen',

    // block deletion dialog
    'Delete Custom Block':
        'Verwijder zelfgemaakt blok',
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
        'Booleaans (waar / onwaar)',
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
        'Modules...',
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
    'raw data...':
        'ruwe gegevens...',
    'import without attempting to\nparse or format data':
        'gegevens importeren zonder poging te bewerken',
    'Slider minimum value':
        'Minimumwaarde van schuifbalk',
    'Slider maximum value':
        'Maximumwaarde van schuifbalk',

    // list watchers
    'length: ':
        'lengte: ',

    // comments
    'add comment here...':
        'hier opmerking toevoegen',
    'comment pic...':
        'beeld van opmerking',
    'save a picture\nof this comment':
        'bewaar een beeld \nvan deze opmerking',

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
    'random':
    	'willekeurig',
     'random position':
     	'willekeurige positie',

    // collision detection
    'mouse-pointer':
        'muisaanwijzer',
    'edge':
        'rand',
    'pen trails':
        'penspoor',
    'center':
        'midden',

    // costumes
    'Turtle':
        'Schildpad',
    'Empty':
        'leeg',
    'Paint a new costume':
        'Teken een nieuw uiterlijk',
    'Import a new costume from your webcam':
        'Maak nieuw uiterlijk met de webcam',
    'Please make sure your web browser is up to date\nand your camera is properly configured. \n\nSome browsers also require you to access Snap!\nthrough HTTPS to use the camera.\n\nPlase replace the "http://" part of the address\nin your browser by "https://" and try again.':
        'Controleer of je webbrowser is bijgewerkt \nen de webcam goed geconfigureerd is.\n\nIn sommige browsers moet Snap! met HTTPS ge\u00f6pend\nworden, om de webcam aan te kunnen gebruiken.\n\nVervang daartoe het "http://"-deel in de adresbalk door "https://"',
    'Camera':
        'Camera',
    
    // sounds
    'Record a new sound':
        'Neem een nieuw geluid op',
    

    // graphical effects, pen color
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
    'transparency':
        'transparantie',
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
    '__shout__go__':
        'groene vlag geklikt',

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

    // Boolean expressions keyboard entry
    'not':
        'niet',

    // delimiters
    'letter':
        'letter',
    'word':
        'Wort',
    'whitespace':
        'witruimte',
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
        'opdracht',
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
    'my':
        'eigenschap',
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
    'temporary?':
        'tijdelijk?',
    'children':
        'kinderen',
    'clones':
        'kloon',
    'other clones':
        'andere klonen',
    'dangling?':
        'slingeren?',
    'draggable?':
        'versleepbaar?',
    'rotation style':
        'draaistijl',
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
    'costume':
        'uiterlijk',
    'stage':
        'speelveld',
    'costumes':
        'uiterlijken',
    'sounds':
        'geluiden',
    'scripts':
        'scripts',
    'width':
        'breedte',
    'height':
        'hoogte',
    'left':
        'ruimte links',
    'right':
        'ruimte rechts',
    'top':
        'ruimte boven',
    'bottom':
        'ruimte onder',

    // attributes in the SET block's dropdown
    'my anchor':
        'eigenschap verankering',
    'my parent':
        'eigenschap ouder',
    'my name':
        'eigenschap naam',
    'my temporary?':
        'eigenschap tijdelijk?',
    'my dangling?':
        'eigenschap slingerend?',
    'my draggable?':
        'eigenschap versleepbaar?',
    'my rotation style':
        'eigenschap draaistijl',
    'my rotation x':
        'eigenschap draaipunt x',
    'my rotation y':
        'eigenschap draaipunt y',

    // inheritance
    'inherited':
        'ge\u00ebrfd',
    'check to inherit\nfrom':
        'aanvinken, om te erven\nvan',
    'uncheck to\ndisinherit':
        'uitvinken, om \nniet meer te erven'
};
