/*

    lang-eu.js

    Basque translation for SNAP!

    written by Jens Mönig

    Copyright (C) 2018 by Jens Mönig

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

SnapTranslator.dict.eu = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    Ä, ä   \u00c4, \u00e4
    Ö, ö   \u00d6, \u00f6
    Ü, ü   \u00dc, \u00fc
    ß      \u00df
*/

    // translations meta information
    'language_name':
        'Euskara', // the name as it should appear in the language menu
    'language_translator':
        'Asier Iturralde Sarasola', // your name for the Translators tab
    'translator_e-mail':
        'aiturralde@iametza.eus', // optional
    'last_changed':
        '2018-06-26', // this, too, will appear in the Translators tab

    // GUI
    // control bar:
    'untitled':
        'izengabea',
    'development mode':
        'garapeneko modua',

    // categories:
    'Motion':
        'Mugimendua',
    'Looks':
        'Itxura',
    'Sound':
        'Soinua',
    'Pen':
        'Arkatza',
    'Control':
        'Kontrola',
    'Sensing':
        'Sentsoreak',
    'Operators':
        'Eragiketak',
    'Variables':
        'Aldagaiak',
    'Lists':
        'Zerrendak',
    'Other':
        'Besteak',

    // editor:
    'draggable':
        'Arrastagarria',

    // tabs:
    'Scripts':
        'Programak',
    'Costumes':
        'Mozorroak',
    'Backgrounds':
        'Atzeko planoak',
    'Sounds':
        'Soinuak',

    // names:
    'Sprite':
        'Objektua',
    'Stage':
        'Agertokia',
    
    // costumes tab:
    'Paint a new costume':
        'Marraztu mozorro berria',
    'Import a new costume from your webcam':
        'inportatu mozorro berria web-kameratik',
    'costumes tab help':
        'Mozorroa zure ordenagailutik edo beste webgune batetik\ninporta dezakezu hona arrastatuz',
    
    // paint editor dialog:
    'Paint Editor':
        'Editore grafikoa',
    'undo':
        'desegin',
    'Vector':
        'Bektorea',
    'Bitmap':
        'Bit-mapa',
    'Paintbrush tool\n(free draw)':
        'Pintzela\n(marrazki librea)',
    'Stroked Rectangle\n(shift: square)':
        'Laukizuzena\n(maius \u21E7 = karratua)',
    'Stroked Ellipse\n(shift: circle)':
        'Elipsea\n(maius \u21E7 = zirkulua)',
    'Eraser tool':
        'Borragoma',
    'Set the rotation center':
        'Ezarri biraketa zentroa',
    'Line tool\n(shift: vertical/horizontal)':
        'Lerroa\n(maius \u21E7 = bertikala/horizontala)',
    'Filled Rectangle\n(shift: square)':
        'Laukizuzen betea\n(maius \u21E7 = karratua)',
    'Filled Ellipse\n(shift: circle)':
        'elipse betea\n(maius \u21E7 = zirkulua)',
    'Fill a region':
        'Betetzeko tresna',
    'Pipette tool\n(pick a color anywhere)':
        'Tanta-kontagailua\n(hautatu kolore bat edonon)',
    'grow':
        'handitu',
    'shrink':
        'txikiagotu',
    'flip \u2194':
        'irauli \u2194',
    'flip \u2195':
        'irauli \u2195',
    'Brush size':
        'Pintzelaren tamaina',
    'Constrain proportions of shapes?\n(you can also hold shift)':
        'Mantendu formen proportzioak\n(edo mantendu maius \u21E7 sakatuta)',
    
    'Vector Paint Editor':
        'Bektore editore grafikoa',
    'Rectangle\n(shift: square)':
        'Laukizuzena\n(maius \u21E7 = karratua)',
    'Ellipse\n(shift: circle)':
        'Elipsea\n(maius \u21E7 = zirkulua)',
    'Selection tool':
        'Hautapen tresna',
    'Line tool\n(shift: constrain to 45º)':
        'Lerroa\n(maius \u21E7 = mugatu 45°ra)',
    'Closed brush\n(free draw)':
        'Pintzel itxia\n(marrazki librea)',
    'Paint a shape\n(shift: secondary color)':
        'Marraztu forma\n(maius \u21E7 = kolore sekundarioa)',
    'Pipette tool\n(pick a color from anywhere\nshift: secondary color)':
        'Tanta-kontagailua\n(hautatu kolorea edonondik\nmaius \u21E7 = kolore sekundarioa)',
    'Primary color      Secondary color':
        'Kolore primarioa Kolore sekundarioa',
    'Top':
        'Goia',
    'Bottom':
        'Behea',
    'Up':
        'Gora',
    'Down':
        'Behera',
    'Polygon':
        'Poligonoa',

    // camera dialog:
    'Camera':
        'Kamera',
    'Camera not supported':
        'Kamera ezin da erabili',
    'Please make sure your web browser is up to date\nand your camera is properly configured. \n\nSome browsers also require you to access Snap!\nthrough HTTPS to use the camera.\n\nPlase replace the "http://" part of the address\nin your browser by "https://" and try again.':
        'Mesedez, egiaztatu nabigatzailea eguneratuta dagoela\neta kamera behar bezala konfiguratuta dagoela.\n\nZenbait nabigatzailek Snap!-era HTTPS bidez\nsartzea eskatzen dute kamera erabiltzeko.\n\nMesedez, ordezkatu helbideko "http://"\n"https://"-rekin eta saiatu berriro.',
    'camera':
        'kamera',

    // sound tab:
    'Record a new sound':
        'Grabatu soinu berria',
    'import a sound from your computer\nby dragging it into here':
        'inportatu soinua zure ordenagailutik\nhona arrastatuz',

    // sound recorder dialog:
    'Sound Recorder':
        'Soinu grabagailua',

    // stage & sprite corral:
    'add a new Turtle sprite':
        'gehitu dortoka objektu berria',
    'paint a new sprite':
        'marraztu objektu berria',
    'take a camera snapshot and\nimport it as a new sprite':
        'egin argazki berria eta\ninportatu objektu berri bezala',
        
    // rotation styles:
    'don\'t rotate':
        'ez biratu',
    'can rotate':
        'biragarria',
    'only face left/right':
        'begiratu ezkerrera/eskuinera soilik',

    // new sprite button:
    'add a new sprite':
        'gehitu objektu berri bat',

    // tab help
    'costumes tab help':
        'inportatu mozorro bat ordenagailutik\nhona arrastatuz',
    'import a sound from your computer\nby dragging it into here':
        'inportatu soinu bat ordenagailutik\nhona arrastatuz',

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
        'Agertokia hautatuta:\nmugimendu primitiborik ez',

    'move %n steps':
        'mugitu %n pauso',
    'turn %clockwise %n degrees':
        'biratu %clockwise %n gradu',
    'turn %counterclockwise %n degrees':
        'biratu %counterclockwise %n gradu',
    'point in direction %dir':
        'apuntatu norabidea %dir',
    'point towards %dst':
        'apuntatu hona %dst',
    'go to x: %n y: %n':
        'joan x: %n y: %n',
    'go to %dst':
        'joan %dst',
    'glide %n secs to x: %n y: %n':
        'irristatu %n segundotan x: %n y: %n',
    'change x by %n':
        'aldatu x %n',
    'set x to %n':
        'ezarri x %n',
    'change y by %n':
        'aldatu y %n',
    'set y to %n':
        'ezarri y %n',
    'if on edge, bounce':
        'ertzean egin punpa',
    'x position':
        'x posizioa',
    'y position':
        'y posizioa',
    'direction':
        'norabidea',

    // looks:
    'switch to costume %cst':
        'aldatu mozorroa %cst',
    'next costume':
        'hurrengo mozorroa',
    'costume #':
        'mozorroa',
    'costume name':
        'mozorroaren izena',
    'say %s for %n secs':
        'esan %s %n segundoz',
    'say %s':
        'esan %s',
    'think %s for %n secs':
        'pentsatu %s %n segundoz',
    'think %s':
        'pentsatu %s',
    'Hello!':
        'Kaixo!',
    'Hmm...':
        'Umm...',
    'change %eff effect by %n':
        'aldatu %eff efektua %n',
    'set %eff effect to %n':
        'ezarri %eff efektua %n',
    'clear graphic effects':
        'garbitu efektu grafikoak',
    'change size by %n':
        'aldatu tamaina %n',
    'set size to %n %':
        'ezarri tamaina %n %',
    'size':
        'tamaina',
    'show':
        'erakutsi',
    'hide':
        'ezkutatu',
    'go to front':
        'joan aurreko planora',
    'go back %n layers':
        'joan atzera %n geruza',

    'development mode \ndebugging primitives:':
        'garapen modua \nprimitiboak arazten:',
    'console log %mult%s':
        'idatzi kontsolan %mult%s',
    'alert %mult%s':
        'alerta %mult%s',

    // sound:
    'play sound %snd':
        'jo %snd soinua',
    'play sound %snd until done':
        'jo %snd soinua amaitu arte',
    'stop all sounds':
        'gelditu soinu guztiak',
    'rest for %n beats':
        'itxaron %n aldiz',
    'play note %note for %n beats':
        'jo %note nota %n aldiz',
    'set instrument to %inst':
        'ezarri instrumentua %inst',
    'change tempo by %n':
        'aldatu tempoa %n',
    'set tempo to %n bpm':
        'ezarri tempoa %n',
    'tempo':
        'tempoa',

    // "instruments", i.e. wave forms
    '(1) sine':
        '(1) \u223F\u223F sinua',
    '(2) square':
        '(2) \u238D\u238D karratua',
    '(3) sawtooth':
        '(3) \u2A58\u2A58 zerra',
    '(4) triangle':
        '(4) \u22C0\u22C0 triangulua',

    // pen:
    'clear':
        'garbitu',
    'pen down':
        'arkatza behera',
    'pen up':
        'arkatza gora',
    'set pen color to %clr':
        'ezarri arkatzaren kolorea %clr',
    'change pen color by %n':
        'aldatu arkatzaren kolorea %n',
    'set pen color to %n':
        'ezarri arkatzaren kolorea %n',
    'change pen shade by %n':
        'aldatu arkatzaren \u00F1abardura %n',
    'set pen shade to %n':
        'ezarri arkatzaren \u00F1abardura %n',
    'change pen size by %n':
        'aldatu arkatzaren tamaina %n',
    'set pen size to %n':
        'ezarri arkatzaren tamaina %n',
    'stamp':
        'zigilua',
    'fill':
        'bete',

    // control:
    'when %greenflag clicked':
        '%greenflag klik egitean',
    'when %keyHat key pressed':
        '%keyHat tekla sakatzean',
    'when I am %interaction':
        'niri %interaction',
    'clicked':
        'klik egitean',
    'pressed':
        'sakatzean',
    'dropped':
        'jaregitean',
    'mouse-entered':
        'sagua gainean jartzean',
    'mouse-departed':
        'sagua gainetik kentzean',
    'scrolled-down':
    	'beherantz korritzean',
    'scrolled-up':
        'gorantz korritzean',
    'when %b':
        '%b denean',
    'when I receive %msgHat':
        '%msgHat jasotzen dudanean',
    'broadcast %msg':
        'igorri %msg',
    'broadcast %msg and wait':
        'igorri %msg eta itxaron',
    'Message name':
        'Mezuaren izena',
    'message':
        'mezua',
    'any message':
        'edozein mezu',
    'wait %n secs':
        'itxaron %n segundo',
    'wait until %b':
        'itxaron %b arte',
    'forever %loop':
        'beti %loop',
    'repeat %n %loop':
        'errepikatu %n aldiz %loop',
    'repeat until %b %loop':
        'errepikatu %b den arte %loop',
    'if %b %c':
        'baldin %b %c',
    'if %b %c else %c':
        'baldin %b %c bestela %c',
    'report %s':
        'aurkeztu %s',
    'stop %stopChoices':
        'gelditu %stopChoices',
    'all':
        'guztiak',
    'this script':
        'programa hau',
    'this block':
        'bloke hau',
    'stop %stopOthersChoices':
        'gelditu %stopOthersChoices',
    'all but this script':
        'dena programa hau ezik',
    'other scripts in sprite':
        'objektuaren beste programak',
    'pause all %pause':
        'pausatu guztiak %pause',
    'run %cmdRing %inputs':
        'exekutatu %cmdRing %inputs',
    'launch %cmdRing %inputs':
        'abiarazi %cmdRing %inputs',
    'call %repRing %inputs':
        'deitu %repRing %inputs',
    'run %cmdRing w/continuation':
        'exekutatu %cmdRing jarraipenarekin',
    'call %cmdRing w/continuation':
        'deitu %cmdRing jarraipenarekin',
    'warp %c':
        'exekutatu jarraian %c',
    'when I start as a clone':
        'klon bezala hasten naizenean',
    'create a clone of %cln':
        'sortu klon bat %cln',
    'a new clone of %cln':
        'honen klon berri bat %cln',
    'myself':
        'ni neu',
    'delete this clone':
        'ezabatu klon hau',
    'tell %spr to %cmdRing %inputs':
        'esan honi %spr %cmdRing %inputs',
    'ask %spr for %repRing %inputs':
        'eskatu honi %spr %repRing %inputs',

    // sensing:
    'touching %col ?':
        '%col ukitzen?',
    'touching %clr ?':
        '%clr ukitzen?',
    'color %clr is touching %clr ?':
        '%clr kolorea %clr ukitzen?',
    'ask %s and wait':
        'galdetu %s eta itxaron',
    'what\'s your name?':
        'nola izena duzu?',
    'answer':
        'erantzuna',
    'mouse x':
        'saguaren x',
    'mouse y':
        'saguaren y',
    'mouse down?':
        'sagua sakatuta?',
    'key %key pressed?':
        '%key tekla sakatuta?',
    '%rel to %dst':
        '%rel hona %dst',
    'distance':
    	'distantzia',
    'reset timer':
        'berrezarri kronometroa',
    'timer':
        'kronometroa',
    '%att of %spr':
        '%att honena %spr',
    'my %get':
        'nire %get',
    'http:// %s':
        'http:// %s',
    'turbo mode?':
        'turbo modua?',
    'set turbo mode to %b':
        'ezarri turbo modua %b',
    'current %dates':
        'uneko %dates',
    'year':
        'urtea',
    'month':
        'hilabetea',
    'date':
        'data',
    'day of week':
        'asteko eguna',
    'hour':
        'ordua',
    'minute':
        'minutua',
    'second':
        'segundoa',
    'time in milliseconds':
        'denbora milisegundotan',

    'filtered for %clr':
        'iragazi %clr',
    'stack size':
        'pilaren tamaina',
    'frames':
        'fotogramak',

    // operators:
    '%n mod %n':
        '%n modulu %n',
    'round %n':
        'borobildu %n',
    '%fun of %n':
        '%fun %n',
    'pick random %n to %n':
        'hartu ausaz %n eta %n artean',
    '%b and %b':
        '%b eta %b',
    '%b or %b':
        '%b edo %b',
    'not %b':
        'ez %b',
    'true':
        'egia',
    'false':
        'gezurra',
    'join %words':
        'batu %words',
    'split %s by %delim':
        'banatu %s honekin %delim',
    'hello':
        'kaixo',
    'world':
        'mundua',
    'letter %idx of %s':
        '%idx . letra hemendik %s',
    'length of %s':
        'honen luzera %s',
    'unicode of %s':
        'honen unicode %s',
    'unicode %n as letter':
        'unicode %n letra bezala',
    'is %s a %typ ?':
        '%s %typ da?',
    'is %s identical to %s ?':
        '%s eta %s berdinak dira?',
    'JavaScript function ( %mult%s ) { %code }':
        'JavaScript funtzioa ( %mult%s ) { %code }',
    'compile %repRing':
    	'konpilatu %repRing',

    'type of %s':
        'honen mota %s',

    // variables:
    'Make a variable':
        'Sortu aldagaia',
    'Variable name':
        'Aldagaiaren izena',
    'Script variable name':
        'Programaren aldagaiaren izena',
    'inherit %shd':
        'heredatu %shd',
    'Delete a variable':
        'Ezabatu aldagaia',

    'set %var to %s':
        'ezarri %var %s',
    'change %var by %n':
        'aldatu %var honela %n',
    'show variable %var':
        'erakutsi %var aldagaia',
    'hide variable %var':
        'ezkutatu %var aldagaia',
    'script variables %scriptVars':
        'programaren aldagaiak %scriptVars',

    // lists:
    'list %exp':
        'zerrenda %exp',
    '%s in front of %l':
        '%s %l ren aurrean',
    'item %idx of %l':
        '%idx elementua %l tik',
    'all but first of %l':
        'guztiak lehena ezik %l',
    'length of %l':
        '%l ren luzera',
    '%l contains %s':
        '%l k barne dauka %s',
    'thing':
        'gauza',
    'add %s to %l':
        'gehitu %s %l ri',
    'delete %ida of %l':
        'ezabatu %ida %l tik',
    'insert %s at %idx of %l':
        'txertatu %s %idx posizioan %l n',
    'replace item %idx of %l with %s':
        'ordezkatu %idx elementua %l n honekin %s',

    // other
    'Make a block':
        'Sortu blokea',

    // menus
    // snap menu
    'About...':
        'Honi buruz...',
    'Reference manual':
        'Erreferentzia eskuliburua',
    'Snap! website':
        'Snap! webgunea',
    'Download source':
        'Deskargatu iturburu-kodea',
    'Switch back to user mode':
        'Itzuli erabiltzaile modura',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'desgaitu itxura sakoneko\nlaster-menuak\neta erakutsi erabilerrazak',
    'Switch to dev mode':
        'Aldatu garatzaile modura',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'gaitu itxura sakoneko\laster-menuak\neta ikuskatzaileak,\nez erabilerrazak',
    'entering development mode.\n\nerror catching is turned off,\nuse the browser\'s web console\nto see error messages.':
        'Garatzaile moduan sartzen.\n\nErroreak atzematea desgaituta dago,\nerabili nabigatzailearen web kontsola\nerrore-mezuak ikusteko.',
    'entering user mode':
        'Erabiltzaile moduan sartzen',

    // project menu
    'Project notes...':
        'Proiektuaren oharrak...',
    'New':
        'Berria',
    'Open...':
        'Ireki...',
    'Save':
        'Gorde',
    'Save to disk':
        'Gorde diskoan',
    'store this project\nin the downloads folder\n(in supporting browsers)':
        'gorde proiektu hau\nDeskargak karpetan\n(euskarria duten nabigatzaileetan)',
    'Save As...':
        'Gorde honela...',
    'Import...':
        'Inportatu...',
    'file menu import hint':
        'inportatu proiektuak, blokeak, irudiak edo soinuak',
    'Export project as plain text...':
        'Esportatu proiektua testu arrunt bezala...',
    'Export project...':
        'Esportatu proiektua...',
    '(in a new window)':
        '(leiho berri batean)',
    'save project data as XML\nto your downloads folder':
        'gorde proiektuaren datuak\nXML bezala Deskargak karpetan',
    'show project data as XML\nin a new browser window':
        'erakutsi proiektuaren datuak XML bezala\nnabigatzailearen leiho berri batean',
    'Export blocks...':
        'Esportatu blokeak...',
    'show global custom block definitions as XML\nin a new browser window':
        'erakutsi bloke pertsonalizatuen definizio globalak\nXML bezala nabigatzailearen leiho berri batean',
    'Unused blocks...':
          'Erabili gabeko blokeak...',
    'find unused global custom blocks\nand remove their definitions':
        'bilatu erabili gabeko bloke pertsonalizatu globalak\neta kendu beren definizioak',
    'Remove unused blocks':
        'Kendu erabili gabeko blokeak',
    'there are currently no unused\nglobal custom blocks in this project':
        'une honetan ez dago erabili gabeko\nbloke pertsonalizatu globalik proiektu honetan',
    'unused block(s) removed':
        'erabili gabeko bloke kendu d(ir)a',
    'Export summary...':
        'Esportatu laburpena...',
    'open a new browser browser window\n with a summary of this project':
        'ireki nabigatzailearen leiho berri bat\nproiektu honen laburpenarekin',
    'Export summary with drop-shadows...':
        'Esportatu laburpena itzaldun irudiekin...',
    'open a new browser browser window\nwith a summary of this project\nwith drop-shadows on all pictures.\nnot supported by all browsers':
        'ireki nabigatzailearen leiho berri bat irudi guztietan\nitzalak dituen proiektu honen laburpenarekin.\nEz du nabigatzaile guztietan funtzionatzen',

    'Export all scripts as pic...':
        'Esportatu programa guztiak irudi bezala...',
    'show a picture of all scripts\nand block definitions':
        'erakutsi programa eta bloke definizio\nguztien irudi bat',
    'Contents':
        'Edukiak',
    'Kind of':
        'Mota',
    'Part of':
        'Honen zatia',
    'Parts':
        'Zatiak',
    'Blocks':
        'Blokeak',
    'For all Sprites':
        'Objektu guztientzat',
    'Import tools':
        'Inportatu tresnak',
    'load the official library of\npowerful blocks':
        'kargatu bloke ahaltsuak dituen\nliburutegi ofiziala',
    'Libraries...':
        'Liburutegiak...',
    'Import library':
        'Inportatu liburutegia',
    'Select categories of additional blocks to add to this project.':
        'hautatu bloke gehigarrien kategoriak proiektu honi gehitzeko.',
    'Select a costume from the media library':
        'hautatu mozorro bat multimedia liburutegitik',
    'Select a sound from the media library':
        'hautatu soinu bat multimedia liburutegitik',
    'Opening blocks...':
        'Blokeak irekitzen...',
        
    // cloud menu
    'Login...':
        'Hasi saioa...',
    'Signup...':
        'Erregistratu...',
    'Reset Password...':
        'Berrezarri pasahitza...',
    'Resend Verification Email...':
        'Bidali berriz egiaztapen posta elektronikoa...',
    'Cloud':
        'Hodeia',
    'Browser':
        'Nabigatzailea',
    'Examples':
        'Adibideak',
    'Updating\nproject list...':
        'Proiektuen zerrenda\neguneratzen...',

    'url...':
        'URLa...',
    'export project media only...':
        'esportatu proiektuaren soinu eta irudiak soilik',
    'export project without media...':
        'esportatu proiektua soinu eta irudirik gabe...',
    'export project as cloud data...':
        'esportatu proiektua hodeiko datu bezala...',
    'open shared project from cloud...':
        'ireki partekatutako proiektua hodeitik...',
    'Export Project As...':
        'esportatu proiektua honela...',
    
    // cloud url dialog
    'Cloud URL':
        'Hodeiko URLa',
    'Snap!Cloud':
        'Snap!Cloud',
    'localhost':
        'localhost',
    'localhost (secure)':
        'localhost (segurua)',
    'Exported!':
        'Esportatuta!',

    // signup dialog
    'Sign up':
        'Erregistratu',
    'User name:':
        'Erabiltzaile-izena:',
    'Birth date:':
        'Jaiotza-data:',
    'year:':
        'urtea:',
    'E-mail address:':
        'Helbide elektronikoa:',
    'E-mail address of parent or guardian:':
        'Guraso edo tutorearen helbide elektronikoa',
    'Password:':
        'Pasahitza:',
    'Repeat Password:':
        'Errepikatu pasahitza',
    'Terms of Service...':
        'Zerbitzu-baldintzak...',
    'Privacy...':
        'Pribatutasuna...',
    'I have read and agree\nto the Terms of Service':
        'Irakurri ditut eta onartzen ditut zerbitzu-baldintzak',
    
    'January':
        'Urtarrila',
    'February':
        'Otsaila',
    'March':
        'Martxoa',
    'April':
        'Apirila',
    'May':
        'Maiatza',
    'June':
        'Ekaina',
    'July':
        'Uztaila',
    'August':
        'Abuztua',
    'September':
        'Iraila',
    'October':
        'Urria',
    'November':
        'Azaroa',
    'December':
        'Abendua',
    'or before':
        'edo lehenago',
    
    'please fill out\nthis field':
        'mesedez bete eremu hau',
    'User name must be four\ncharacters or longer':
        'erabiltzaile-izenak lau karaktere\nedo gehiago izan behar ditu',
    'please provide a valid\nemail address':
        'mesedez idatzi baliozko\nhelbide elektroniko bat',
    'password must be six\ncharacters or longer':
        'pasahitzak sei karaktere\nedo gehiago izan behar ditu',
    'passwords do\nnot match':
        'pasahitzak ez datoz bat',
    'please agree to\nthe TOS':
        'mesedez onartu zerbitzu-baldintzak',
    
    // signin dialog
    'Sign in':
        'Hasi saioa',
    'stay signed in on this computer\nuntil logging out':
        'mantendu saioa hasita ordenagailu honetan',
    
    // reset password dialog
    'Reset password':
        'Berrezarri pasahitza',
    
    // resend verification email dialog
    'Resend verification email':
        'Bidali berriz egiaztapen-mezua',

    // change password dialog
    'Change Password':
        'Aldatu pasahitza',
    'Old password:':
        'Pasahitz zaharra:',
    'New password:':
        'Pasahitz berria:',
    'Repeat new password:':
        'Errepikatu pasahitz berria:',
    'password has been changed.':
        'Pasahitza aldatu da.',

    // open shared project in cloud dialog
    'Author name\u2026':
        'Egilearen izena...',
    'Project name...':
        'Proiektuaren izena...',
    'Fetching project\nfrom the cloud...':
        'Proiektua hodeitik eskuratzen...',
    'Opening project...':
        'Proiektua irekitzen...',

    'Cloud Connection':
        'Hodeiko konexioa',
    'Successfully connected to:':     // would this be translated? (gui.js:5439)
        'Behar bezala konektatuta:',
    'disconnected.':
        'Deskonektatuta.',
    'You are not logged in':
        'Ez duzu saioa hasi',
    
    // settings menu
    'Language...':
        'Hizkuntza...',
    'Zoom blocks...':
        'Handitu blokeak',
    'Stage size...':
        'Agertokiaren tamaina...',
    'Stage size':
        'Agertokiaren tamaina',
    'Stage width':
        'Agertokiaren zabalera',
    'Stage height':
        'Agertokiaren altuera',
    'Default':
        'Lehenetsia',
    'Dragging threshold...':
        'Arrastatzeko atalasea...',
    'Dragging threshold':
        'Arrastatzeko atalasea',
    'specify the distance the hand has to move\nbefore it picks up an object':
        'zehaztu objektu bat arrastatzen hasteko\neskuarekin egin beharreko distantzia',
    'Blurred shadows':
        'Lausotutako itzalak',
    'uncheck to use solid drop\nshadows and highlights':
        'kendu marka itzal eta nabarmentze\nsolidoak erabiltzeko ',
    'check to use blurred drop\nshadows and highlights':
        'markatu itzal eta nabarmentze\nlausotuak erabiltzeko',
    'Zebra coloring':
        'Zebra koloreak',
    'check to enable alternating\ncolors for nested blocks':
        'markatu bloke habiaratuetan\ntxandakako koloreak gaitzeko',
    'uncheck to disable alternating\ncolors for nested block':
        'kendu marka bloke habiaratuetan\ntxandakako koloreak desgaitzeko',
    'Dynamic input labels':
        'Sarrera etiketa dinamikoak',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'kendu marka argumentu kopuru aldakorreko\nsarreretan etiketa dinamikoak desgaitzeko',
    'check to enable dynamic\nlabels for variadic inputs':
        'markatu argumentu kopuru aldakorreko\nsarreretan etiketa dinamikoak gaitzeko',
    'Prefer empty slot drops':
        'Lehenetsi erreten hutsak jaregitean',
    'settings menu prefer empty slots hint':
        'markatu jaregindako blokeek\nbesteak ordezkatzea galarazteko',
    'uncheck to allow dropped\nreporters to kick out others':
        'kendu marka jaregindako blokeek\nbesteak ordezkatzea baimentzeko',
    'Long form input dialog':
        'Sarreren elkarrizketa-koadro hedatua',
    'uncheck to use the input\ndialog in short form':
        'kendu marka sarreren\nelkarrizketa-koadro sinplea erabiltzeko',
    'check to always show slot\ntypes in the input dialog':
        'markatu sarreren elkarrizketa-koadroan\nerreten motak beti bistaratzeko',
    'Plain prototype labels':
        'Prototipoen etiketa lauak',
    'uncheck to always show (+) symbols\nin block prototype labels':
        'kendu marka blokeen prototipoen etiketetan\n(+) sinboloa beti bistaratzeko',
    'check to hide (+) symbols\nin block prototype labels':
        'markatu blokeen prototipoen etiketetan\n(+) sinboloa ezkutatzeko',
    'Virtual keyboard':
        'Teklatu birtuala',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'kendu marka gailu mugikorretan\nteklatu birtualaren\neuskarria desgaitzeko',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'markatu gailu mugikorretan\nteklatu birtualaren\neuskarria gaitzeko',
    'Input sliders':
        'Graduatzaile sarrerak',
    'uncheck to disable\ninput sliders for\nentry fields':
        'kendu marka\nsarrerako eremuetako\ngraduatzaileak desgaitzeko',
    'check to enable\ninput sliders for\nentry fields':
        'markatu sarrerako eremuetako\ngraduatzaileak desgaitzeko',
    'Retina display support':
        'Retina pantailen euskarria',
    'uncheck for lower resolution,\nsaves computing resources':
        'kendu marka bereizmen baxuagoa erabiltzeko\n(baliabideak aurrezten ditu)',
    'check for higher resolution,\nuses more computing resources':
        'markatu bereizmen altuagoa erabiltzeko\n(baliabide gehiago erabiltzen ditu)',
    'Codification support':
        'Soporte de codificaci\u00F3n',
    'uncheck to disable\nblock to text mapping features':
        'kendu marka blokeetatik testura\nbihurtzea desgaitzeko',
    'check for block\nto text mapping features':
        'markatu blokeetatik testura\nbihurtzea gaitzeko',
    'Clicking sound':
        'Klik egitean soinua',
    'uncheck to turn\nblock clicking\nsound off':
        'kendu marka blokeak kokatzean\nklik soinurik ez egiteko',
    'check to turn\nblock clicking\nsound on':
        'markatu blokeak kokatzean\nklik soinua egiteko',
    'Animations':
        'Animazioak',
    'uncheck to disable\nIDE animations':
        'kendu marka IDEaren animazioak desgaitzeko',
    'check to enable\nIDE animations':
        'markatu IDEaren animazioak gaitzeko',
    'Turbo mode':
        'Turbo modua',
    'check to prioritize\nscript execution':
        'markatu programen exekuzioa lehenesteko',
    'uncheck to run scripts\nat normal speed':
        'kendu marka programak\nabiadura normalean exekutatzeko',
    'Flat design':
        'Diseinu laua',
    'uncheck for default\nGUI design':
        'kendu marka erabiltzaile interfaze\nlehenetsia erabiltzeko',
    'check for alternative\nGUI design':
        'markatu erabiltzaile interfaze\nalternatiboa erabiltzeko',
    'Nested auto-wrapping':
        'Habiaratutakoak automatikoki biltzea',
    'uncheck to confine auto-wrapping\nto top-level block stacks':
        'kendu marka goi mailako bloke pilak\nsoilik biltzeko automatikoki',
    'check to enable auto-wrapping\ninside nested block stacks':
        'markatu habiratutako bloke pilak\nautomatikoki biltzea gaitzeko',
    'Keyboard Editing':
        'Teklatu edizioa',
    'uncheck to disable\nkeyboard editing support':
        'kendu marka teklatu edizioaren\neuskarria desgaitzeko',
    'check to enable\nkeyboard editing support':
        'markatu teklatu edizioaren\neuskarria gaitzeko',
    'Table support':
        'Taulen euskarria',
    'check for multi-column\nlist view support':
        'markatu zerrenda ikuspegian\nhainbat zutaberen euskarria gaitzeko',
    'uncheck to disable\nmulti-column list views':
        'kendu marka zerrenda ikuspegian\nhainbat zutaberen euskarria desgaitzeko',
    'Table lines':
        'Taula lerroak',
    'check for higher contrast\ntable views':
        'markatu kontraste handiagoko\ntaula ikuspegia gaitzeko',
    'uncheck for less contrast\nmulti-column list views':
        'kendu marka kontraste handiagoko\ntaula ikuspegia desgaitzeko',
    'Visible stepping':
        'Pausoz pauso ikusgai',
    'check to turn on\n visible stepping (slow)':
		'markatu programan pausoz pauso joateko (mantsoa)',
    'uncheck to turn off\nvisible stepping':
		'kendu marka programan pausoz pauso joatea desgaitzeko',
    'Thread safe scripts':
        'Programa hari seguruak',
    'uncheck to allow\nscript reentrance':
        'kendu marka programetara\nberriz sartzea desgaitzeko',
    'check to disallow\nscript reentrance':
        'markatu programetara\nberriz sartzea gaitzeko',
    'Prefer smooth animations':
        'Hobetsi animazio leunak',
    'uncheck for greater speed\nat variable frame rates':
        'kendu marka fotograma-abiadura\naldakorrekin abiadura handiagoa izateko',
    'check for smooth, predictable\nanimations across computers':
        'markatu ordenagailu desberdinetan animazio\nleun eta aurreikusteko modukoak izateko',
    'Flat line ends':
        'Arkatzaren arrastoen amaiera zuzenak',
    'check for flat ends of lines':
        'markatu arrastoek\namaiera zuzenak izateko',
    'uncheck for round ends of lines':
        'kendu marka arrastoek\namaiera borobilduak izateko',
    'Ternary Boolean slots':
        'Erreten boolear hirutarrak',
    'check to allow\nempty Boolean slots':
        'markatu erreten boolear\nhutsak onartzeko',
    'uncheck to limit\nBoolean slots to true / false':
        'kendu marka erreten boolearrak\negia / gezurra balioetara mugatzeko',
    'Camera support':
        'Kameraren euskarria',
    'uncheck to disable\ncamera support':
        'kendu marka kameraren\neuskarria desgaitzeko',
    'check to enable\ncamera support':
        'markatu kameraren\neuskarria gaitzeko',
    'Cache Inputs':
        'Sarreren cache-a',
    'uncheck to stop caching\ninputs (for debugging the evaluator)':
        'kendu marka sarrerak cache-an\nez gordetzeko (ebaluatzailea arazteko)',
    'check to cache inputs\nboosts recursion':
        'markatu sarrerak cache-an gordetzeko\n(errekurtsioa azkartzen du)',
    'Rasterize SVGs':
        'Sortu SVGen bilbea',
    'uncheck for smooth\nscaling of vector costumes':
        'kendu marka mozorro\nbektorialen eskalatze leunerako',
    'check to rasterize\nSVGs on import':
        'markatu SVGak inportatzean\nbilbea sortzeko',
    'Project URLs':
        'Proiektuaren URLak',
    'uncheck to disable\nproject data in URLs':
        'kendu marka proiektuen datuak\nURLean ez gehitzeko',
    'check to enable\nproject data in URLs':
        'markatu proiektuen datuak\nURLean gehitzeko',
    'Sprite Nesting':
        'Objektuak habiaratzea',
    'uncheck to disable\nsprite composition':
        'kendu marka objektuen\nkonposizioa desgaitzeko',
    'check to enable\nsprite composition':
        'markatu objektuen\nkonposizioa gaitzeko',
    'First-Class Sprites':
        'Lehen mailako objektuak',
    'uncheck to disable support\nfor first-class sprites':
        'kendu marka lehen mailako\nobjektuen euskarria desgaitzeko',
    'check to enable support\n for first-class sprite':
        'markatu lehen mailako\nobjektuen euskarria gaitzeko',
    'Live coding support':
        'Zuzenean programatzeko euskarria',
    'EXPERIMENTAL! uncheck to disable live\ncustom control structures':
        'ESPERIMENTALA! kendu marka zuzeneko\nkontrol egitura pertsonalizatuak desgaitzeko',
    'EXPERIMENTAL! check to enable\n live custom control structures':
        'ESPERIMENTALA! markatu zuzeneko\nkontrol egitura pertsonalizatuak gaitzeko',
    'JIT compiler support':
        'JIT konpiladorearen euskarria',
    'EXPERIMENTAL! uncheck to disable live\nsupport for compiling':
        'ESPERIMENTALA! kendu marka zuzenean konpilatzeko\neuskarria desgaitzeko',
    'EXPERIMENTAL! check to enable\nsupport for compiling':
        'ESPERIMENTALA! markatu konpilatzeko\neuskarria gaitzeko',
    'Inheritance support':
        'Herentziaren euskarria',
    'uncheck to disable\nsprite inheritance features':
        'kendu marka objektuen\nherentzia ezaugarriak desgaitzeko',
    'check for sprite\ninheritance features':
        'markatu objektuen\nherentzia ezaugarriak gaitzeko',
    'Persist linked sublist IDs':
        'Estekatutako azpi-zerrenda ID iraunkorrak',
    'uncheck to disable\nsaving linked sublist identities':
        'kendu marka estekatutako azpi-zerrenden\nidentitateak gordetzea desgaitzeko',
    'check to enable\nsaving linked sublist identities':
        'markatu estekatutako azpi-zerrenden\nidentitateak gordetzea gaitzeko',

    // inputs
    'with inputs':
        'sarrerekin',
    'input names:':
        'sarreren izenak:',
    'Input Names:':
        'Sarreren izenak:',
    'input list:':
        'Sarrera zerrenda:',

    // context menus:
    'help':
        'laguntza',

    // palette:
    'find blocks':
        'bilatu blokeak',
    'hide primitives':
        'ezkutatu primitiboak',
    'show primitives':
        'erakutsi primitiboak',

    // blocks:
    'help...':
        'laguntza...',
    'relabel...':
        'aldatu izena...',
    'duplicate':
        'bikoiztu',
    'make a copy\nand pick it up':
        'egin kopia\neta hartu',
    'only duplicate this block':
        'bikoiztu soilik bloke hau',
    'delete':
        'ezabatu',
    'script pic...':
        'programaren argazkia...',
    'open a new window\nwith a picture of this script':
        'ireki programa honen argazkia\nleiho berri batean',
    'ringify':
        'eraztundu',
    'unringify':
        'deseraztundu',
    'transient':
        'behin-behinekoa',
    'uncheck to save contents\nin the project':
        'kendu marka proiektuaren\nedukiak gordetzeko',
    'check to prevent contents\nfrom being saved':
        'markatu edukiak\ngordetzea eragozteko',
    'new line':
        'lerro berria',

    // custom blocks:
    'delete block definition...':
        'ezabatu blokearen definizioa...',
    'duplicate block definition...':
        'bikoiztu blokearen definizioa...',
    'Same Named Blocks':
        'Izen bereko blokeak',
    'Another custom block with this name exists.\nWould you like to replace it?':
        'Izen bereko bloke pertsonalizatu bat dago.\nOrdezkatu nahi duzu?',
    'edit...':
        'editatu...',
    'rename...':
        'aldatu izena...',
    'rename all...':
        'aldatu izena guztiei...',
    'translations...':
        'itzulpenak...',
    'block variables...':
        'blokearen aldagaiak...',
    'remove block variables...':
        'kendu blokearen aldagaiak...',
    'experimental -\nunder construction':
        'esperimentala -\eraikitzen',

    // sprites:
    'edit':
        'editatu',
    'clone':
        'klonatu',
    'move':
        'mugitu',
    'pivot':
        'ardatza',
    'edit the costume\'s\nrotation center':
        'editatu mozorroaren\nbiraketa-zentroa',
    'rotate':
    	'biratu',
    'detach from':
        'bereizi hemendik',
    'detach all parts':
        'bereizi zati guztiak',
    'export...':
        'esportatu...',
    'parent...':
        'gurasoa...',
    'current parent':
        'uneko gurasoa',
    'release':
        'askatu',
    'make temporary and\nhide in the sprite corral':
        'bihurtu behin-behineko eta\nezkutatu objektuen multzotik',
    'make permanent and\nshow in the sprite corral':
        'bihurtu behin-betiko eta\nerakutsi objektuen multzoan',

    // stage:
    'show all':
        'erakutsi guztiak',
    'pic...':
        'argazkia...',
    'open a new window\nwith a picture of the stage':
        'ireki agertokiaren argazki bat\nleiho berrian',

    // scripting area
    'clean up':
        'garbitu',
    'arrange scripts\nvertically':
        'antolatu programak\nbertikalki',
    'add comment':
        'gehitu iruzkina',
    'undrop':
        'desegin jaregitea',
    'undo the last\nblock drop\nin this pane':
        'desegin panel honetan\nazken blokea jaregitea',
    'redrop':
        'berriz jaregin',
    'use the keyboard\nto enter blocks':
    	'erabili teklatua\nblokeak sartzeko',
    'scripts pic...':
        'programen argazkiak...',
    'open a new window\nwith a picture of all scripts':
        'ireki programa guztien\nargazkiak leiho berrian',
    'make a block...':
        'sortu blokea...',

    // costumes
    'rename':
        'aldatu izena',
    'export':
        'esportatu',
    'rename costume':
        'aldatu izena mozorroari',

    // sounds
    'Play sound':
        'Erreproduzitu soinua',
    'Stop sound':
        'Gelditu soinua',
    'Stop':
        'Gelditu',
    'Play':
        'Erreproduzitu',
    'rename sound':
        'Aldatu izena soinuari',

    // lists and tables
    'list view...':
        'zerrenda ikuspegia...',
    'table view...':
        'taula ikuspegia...',
    'open in dialog...':
        'ireki elkarrizketa-koadroan...',
    'reset columns':
        'berrezarri zutabeak',
    'items':
        'elementuak',
    
    // custom block's text fragment symbols:
    'square':
        'karratua',
    'pointRight':
        'eskuinera',
    'stepForward':
        'hurrengo pausoa',
    'gears':
        'engranajeak',
    'file':
        'fitxategia',
    'fullScreen':
        'pantaila osoa',
    'normalScreen':
        'pantaila normala',
    'smallStage':
        'agertoki txikia',
    'normalStage':
        'agertoki handia',
    'turtle':
        'dortoka',
    // already defined
    // 'stage':
    //     'agertokia',
    'turtleOutline':
        'dortoka (silueta)',
    'pause':
        'pausatu',
    'flag':
        'bandera',
    'octagon':
        'oktogonoa',
    'cloud':
        'hodeia',
    'cloudOutline':
        'hodeia (silueta)',
    'cloudGradient':
        'hodeia (gradientea)',
    'turnRight':
        'biratu eskuinera',
    'turnLeft':
        'biratu ezkerrera',
    'storage':
        'biltegiratzea',
    'poster':
        'posterra',
    'flash':
        'tximista',
    'brush':
        'pintzela',
    'rectangle':
         'laukizuzena',
    'rectangleSolid':
        'laukizuzena (betea)',
    'circle':
        'zirkulua',
    'circleSolid':
        'zirkulua (betea)',
    'ellipse':
        'elipsea',
    // already defined
    // 'line':
    //     'lerroa',
    'cross':
        'gurutzea',
    'crosshairs':
        'mira',
    'paintbucket':
        'pintura',
    'eraser':
        'borragoma',
    'pipette':
        'tanta-kontagailua',
    'speechBubble':
        'bunbuiloa',
    'speechBubbleOutline':
        'bunbuiloa (silueta)',
    'turnBack':
        'atzera',
    'turnForward':
        'aurrera',
    'arrowUp':
        'gezia gora',
    'arrowUpOutline':
        'gezia gora (silueta)',
    'arrowLeft':
        'gezia ezkerrera',
    'arrowLeftOutline':
        'gezia ezkerrera (silueta)',
    'arrowDown':
        'gezia behera',
    'arrowDownOutline':
        'gezia behera (silueta)',
    'arrowRight':
        'gezia eskuinera',
    'arrowRightOutline':
        'gezia eskuinera (silueta)',
    'robot':
        'robota',
    'magnifyingGlass':
        'lupa',
    'magnifierOutline':
        'lupa (silueta)',
    'selection':
        'hautapena',
    'polygon':
        'poligonoa',
    'closedBrush':
        'pintzel itxia',
    'notes':
        'musika nota',
    // already defined
    // 'camera':
    //     'kamera',
    'location':
        'kokapena',
    'footprints':
        'oinatzak',
    'keyboard':
        'teklatua',
    'keyboardFilled':
        'teklatua (betea)',
    'new line':
        'lerro berria',
        
    // dialogs
    // buttons
    'OK':
        'Ados',
    'Ok':
        'Ados',
    'Cancel':
        'Utzi',
    'Yes':
        'Bai',
    'No':
        'Ez',
    'Import':
        'Inportatu',

    // help
    'Help':
        'Laguntza',

    // zoom blocks
    'Zoom blocks':
        'Handitu blokeak',
    'build':
        'eraiki',
    'your own':
        'zure',
    'blocks':
        'blokeak',
    'normal (1x)':
        'normala (1x)',
    'demo (1.2x)':
        'demoa (1.2x)',
    'presentation (1.4x)':
        'aurkezpena (1.4x)',
    'big (2x)':
        'handia (2x)',
    'huge (4x)':
        'oso handia (4x)',
    'giant (8x)':
        'erraldoia (8x)',
    'monstrous (10x)':
        'ikaragarria (10x)',

    // Project Manager
    'Untitled':
        'Izenik gabea',
    'Open Project':
        'Ireki proiektua',
    'Open':
        'Ireki',
    '(empty)':
        '(hutsa)',
    'Saved!':
        'Gordeta!',
    'Delete Project':
        'Ezabatu proiektua',
    'Are you sure you want to delete':
        'Ziur zaude ezabatu nahi duzula?',
    'rename...':
        'aldatu izena...',

    // costume editor
    'Costume Editor':
        'Mozorro editorea',
    'click or drag crosshairs to move the rotation center':
        'egin klik edo arrastatu mira biraketa zentroa mugitzeko',

    // project notes
    'Project Notes':
        'Proiektuaren oharrak',

    // new project
    'New Project':
        'Proiektu berria',
    'Replace the current project with a new one?':
        'Uneko proiektua berriarekin ordezkatu nahi duzu?',

    // save project
    'Save Project':
        'Gorde proiektua',
    'Save Project As...':
        'Gorde proiektua honela...',

    // export blocks
    'Export blocks':
        'Esportatu blokeak',
    'Import blocks':
        'Inportatu blokeak',
    'this project doesn\'t have any\ncustom global blocks yet':
        'proiektu honek oraindik\nez dauka bloke pertsonalizaturik',
    'select':
        'hautatu',
    'none':
        'bat ere ez',

    // variable dialog
    'for all sprites':
        'objektu guztientzat',
    'for this sprite only':
        'objektu honentzat bakarrik',

    // variables refactoring
    'rename only\nthis reporter':
        'aldatu izena\nberriemaile honi',
    'rename all...':
        'aldatu izena guztiei...',
    'rename all blocks that\naccess this variable':
        'aldatu izena aldagai hau\natzitzen duten bloke guztiei',


    // block dialog
    'Change block':
        'Aldatu blokea',
    'Command':
        'Komandoa:',
    'Reporter':
        'Berriemailea',
    'Predicate':
        'Predikatua',

    // block editor
    'Block Editor':
        'Bloke editorea',
    'Method Editor':
        'Metodo editorea',
    'Apply':
        'Aplikatu',

    // block deletion dialog
    'Delete Custom Block':
        'Ezabatu bloke pertsonalizatua',
    'block deletion dialog text':
        'Ziur zaude bloke pertsonalizatu hau\neta bere instantzia guztiak\nezabatu nahi dituzula?',

    // input dialog
    'Create input name':
        'Sortu sarrera',
    'Edit input name':
        'Editatu sarrera',
    'Edit label fragment':
        'Editatu etiketaren zatia',
    'Title text':
        'Izenburua',
    'Input name':
        'Sarrera',
    'Delete':
        'Ezabatu',
    'Object':
        'Objektua',
    'Number':
        'Zenbakia',
    'Text':
        'Testua',
    'List':
        'Zerrenda',
    'Any type':
        'Edozein mota',
    'Boolean (T/F)':
        'Boolearra (E/G)',
    'Command\n(inline)':
        'Komandoa\n(linean)',
    'Command\n(C-shape)':
        'Komandoa\n(C itxura)',
    'Any\n(unevaluated)':
        'Edozein\n(ez ebaluatua)',
    'Boolean\n(unevaluated)':
        'Boolearra\n(ez ebaluatua)',
    'Single input.':
        'Sarrera bakarra.',
    'Default Value:':
        'Balio lehenetsia:',
    'Multiple inputs (value is list of inputs)':
        'Hainbat sarrera (balioa sarreren zerrenda da)',
    'Upvar - make internal variable visible to caller':
        'Upvar - egin barne aldagaia ikusgai deitzaileari',

    // About Snap
    'About Snap':
        'Snap-i buruz',
    'Back...':
        'Atzera...',
    'License...':
        'Lizentzia...',
    'Modules...':
        'Modulua...',
    'Credits...':
        'Kredituak...',
    'Translators...':
        'Itzultzaileak',
    'License':
        'Lizentzia',
    'current module versions:':
        'Uneko moduluen bertsioak',
    'Contributors':
        'Laguntzaileak',
    'Translations':
        'Itzulpenak',

    // variable watchers
    'normal':
        'normala',
    'large':
        'handia',
    'slider':
        'graduatzailea',
    'slider min...':
        'graduatzailea min...',
    'slider max...':
        'graduatzailea max...',
    'import...':
        'inportatu...',
    'Slider minimum value':
        'Graduatzailearen balio minimoa',
    'Slider maximum value':
        'Graduatzailearen balio maximoa',

    // list watchers
    'length: ':
        'luzera: ',

    // coments
    'add comment here...':
        'gehitu iruzkina hemen...',

    // drow downs
    // directions
    '(90) right':
        '(90) eskuinera',
    '(-90) left':
        '(-90) ezkerrera',
    '(0) up':
        '(0) gora',
    '(180) down':
        '(180) behera',
    'random':
    	'ausazkoa',
     'random position':
     	'ausazko posizioa',

    // collision detection
    'mouse-pointer':
        'saguaren erakuslea',
    'edge':
        'ertza',
    'pen trails':
        'arkatzaren arrastoak',

    // costumes
    'Turtle':
        'Dortoka',
    'Empty':
        'Hutsa',

    // graphical effects
    'color':
        'kolorea',
    'fisheye':
        'arrain begia',
    'whirl':
        'zurrunbiloa',
    'pixelate':
        'pixelatu',
    'mosaic':
        'mosaikoa',
    'saturation':
        'saturazioa',
    'brightness':
        'distira',
    'ghost':
        'mamua',
    'negative':
        'negatiboa',
    'comic':
        'komikia',
    'confetti':
        'konfetia',

    // keys
    'space':
        'zuriunea',
    'up arrow':
        'gora gezia',
    'down arrow':
        'behera gezia',
    'right arrow':
        'eskuinera gezia',
    'left arrow':
        'ezkerrera gezia',
    'any key':
        'edozein tekla',
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
        'berria...',

    // math functions
    'abs':
        'Betrag',
    'ceiling':
        'sabaia',
    'floor':
        'lurra',
    'sqrt':
        'erroa',
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
        'ez',

    // delimiters
    'letter':
        'letra',
    'whitespace':
        'zuriunea',
    'line':
        'lerroa',
    'tab':
        'tabuladorea',
    'cr':
        'orga-itzulera',

    // data types
    'number':
        'zenbakia',
    'text':
        'testua',
    'Boolean':
        'boolearra',
    'list':
        'zerrenda',
    'command':
        'komandoa',
    'reporter':
        'berriemailea',
    'predicate':
        'predikatua',
    'sprite':
        'objektua',

    // list indices
    'last':
        'azkena',
    'any':
        'edozein',

    // attributes
    'neighbors':
        'auzokoak',
    'self':
        'norbera',
    'other sprites':
        'beste objektuak',
    'parts':
        'zatiak',
    'anchor':
        'aingura',
    'parent':
        'gurasoa',
    'children':
        'umea',
    'clones':
        'klonak',
    'other clones':
        'beste klonak',
    'dangling?':
        'zintzilik?',
    'rotation x':
        'x biraketa',
    'rotation y':
        'y biraketa',
    'center x':
        'x erdia',
    'center y':
        'y erdia',
    'name':
        'izena',
    'stage':
        'agertokia',
    'costumes':
        'mozorroak',
    'sounds':
        'soinuak',
    'scripts':
        'programak',
    
    'pen':
        'arkatza',
    'middle':
        'erdia',
    'tip':
        'punta',
        
    'center':
        'erdia',
    
    // inheritance
    'inherited':
        'heredatua',
    'check to inherit\nfrom':
        'markatu hemendik\nheredatzeko',
    'uncheck to\ndisinherit':
        'kendu marka\nheredentzia kentzeko',
    
    //costumes and backgrounds
	'rename background':
		'aldatu izena atzeko planoari',
	'turn pen trails into new background...':
		'sortu atzeko plano berria arkatzaren arrastoetatik',
	'turn all pen trails and stamps\ninto a new background for the stage':
		'sortu atzeko plano berria agertoki honentzat\narkatzaren arrastoetatik eta zigiluetatik',
    
    //libraries
    'Tools':
        'Tresnak',
    'Standard library of powerful blocks (for, map, etc.)':
        'Bloke aurreratuen liburutegi estandarra (for, map...)',

    'Iteration, composition':
        'Iterazioa, konposizioa',
    'Traditional loop constructs (while, until, etc.) plus the Lisp "named let" (a generalization of FOR) plus functional iteration (repeated invocation of a function) and function composition.':
        'Begizta egitura tradizionalak (while, until...) + Lisp-eko "named let" (for-aren orokortze bat) + iterazio funtzionala (funtzio bat modu errepikatuan deitzea) eta funtzioen konposizioa.',

    'List utilities':
        'Zerrenden utilitateak',
    'Some standard functions on lists (append, reverse, etc.)':
        'Zerrenden funtzio estandar batzuk (append, reverse...)',

    'Streams (lazy lists)':
        'Jarioak (zerrenda alferrak)',
    'A variation on the list data type in which each list item aren\'t computed until it\'s needed, so you can construct million-item lists without really taking up all that time or memory, or even infinite-sized lists.  (A block that reports all the prime numbers is included as an example.)':
        'Zerrenda datu motaren aldaera bat, non zerrendako elementu bakoitza ez den kalkulatzen behar den arte. Horri esker, milioi bat elementuko, edo tamaina infinitoko, zerrendak sor ditzakezu, beharrezkoa dena baino denbora edo memoria gehiago erabili gabe. (Zenbaki lehen guztiak itzultzen dituen bloke bat gehitu da adibide bezala).',

    'Variadic reporters':
        'Argumentu kopuru aldakorreko berriemaileak',
    'Versions of +, x, AND, and OR that take more than two inputs.':
        'Bi sarrera baino gehiago hartzen dituzten +, x, AND, eta OR-en aldaerak.',

    'Web services access (https)':
        'Web zerbitzuak atzitzea (https)',
    'An extended version of the HTTP:// block that allows POST, PUT, and DELETE as well as GET requests, allows using the secure HTTPS protocol, and gives control over headers, etc.':
        'GET, POST, PUT eta DELETE eskaerak egiteko aukera ematen duen HTTP:// blokearen hedapena. HTTPS protokolo segurua erabiltzeko aukera eta goiburuen gaineko kontrola ere ematen du...',

    'Words, sentences':
        'Hitzak, esaldiak',
    'One of the big ideas in Logo that they left out of Scratch is thinking of text as structured into words and sentences, rather than just a string of characters.  This library (along with the JOIN WORDS block in the Tools library) brings back that idea.':
        'Testuak karaktere-kate soil gisa hartu ordez hitz eta esaldietan egituratutzea da, Scratch-en ez dagoen, Logo-ren ideia handietako bat. Liburutegi honek, Tresnak liburutegiko JOIN WORDS blokearekin batera, ideia hori berreskuratzen du.',

    'Multi-branched conditional (switch)':
        'Adar anitzeko baldintzak (switch)',
    'Like "switch" in C-like languages or "cond" in Lisp.  Thanks to Nathan Dinsmore for inventing the idea of a separate block for each branch!':
        'C bezalako lengoaietako "switch" edo Lisp-eko "cond"-en modukoa. Mila esker Nathan Dinsmore adar bakoitzerako bloke bereizia erabiltzeko ideia izateagatik!',

    'LEAP Motion controller':
        'LEAP mugimendu kontrolatzailea',
    'Report hand positions from LEAP Motion controller (leapmotion.com).':
        'Eskuen kokapena lortu LEAP mugimendu kontrolatzailea erabiliz (leapmotion.com).',

    'Set RGB or HSV pen color':
        'Ezarri RGB edo HSV arkatz koloreak',
    'Set or report pen color as RGB (red, green, blue) or HSV (hue, saturation, value).':
        'Arkatzaren kolorea ezarri edo itzultzen du RGB (gorria, berdea, urdina) edo HSV (ñabardura, saturazioa, balioa) bezala',

    'Catch errors in a script':
        'Atzeman programa bateko erroreak',
    'Run a script; if an error happens, instead of stopping the script with a red halo, run another script to handle the error. Also includes a block to cause an error with a message given as input. Also includes a block to create a script variable and give it a value.':
        'Exekutatu programa bat; Errore bat gertatzen bada, programa gelditu eta gorriz nabarmendu ordez, beste programa bat exekuta dezakezu errorea maneiatzeko. Sarrera bezala mezu bat jasotzen duen errore-bloke bat ere badakar eta programa aldagai bat sortu eta balioa emateko beste bloke bat ere bai.',

    'Allow multi-line text input to a block':
        'Lerro anitzeko testu sarrera blokeetan',
    'In general, text inputs allow only a single line.  The MULTILINE block accepts multi-line text input and can be used in text input slots of other blocks.':
        'Orokorrean, testu sarrerek lerro bakarra izaten dute. Bloke honek hainbat lerrotako testu sarrerak edukitzeko aukera ematen dizu. Testu sarrera erretenetan edo bestelako blokeetan erabil daiteke.',

    'Provide getters and setters for all GUI-controlled global settings':
        'GUI bidez kontrolatutako aukera global guztientzako getter eta setter-ak',
    'Eisenberg\'s Law: Anything that can be done from the GUI should be doable from the programming language, and vice versa.':
        'Eisenberg-en legea: Erabiltzaile interfaze grafiko bidez egin daitekeen edozein gauza programazio lengoaia erabiliz ere egin daiteke, eta alderantziz.',

    'Infinite precision integers, exact rationals, complex':
        'Zehaztasun infinituko zenbaki osoak, arrazional zehatzak, konplexuak',
    'The full Scheme numeric tower.  "USE BIGNUMS <True>" to enable.':
        'Scheme-ren dorre numeriko osoa. "USE BIGNUMS <True>" aktibatzeko.',

    'Provide 100 selected colors':
        'Hautatutako 100 koloreko paleta',
    'to use instead of hue for better selection':
        'Hautatzea errazte aldera ñabarduraren ordez erabiltzeko',

    'Animation':
        'Animazioa',
    'glide, grow and rotate using easing functions.':
        'Irristatu, egin zoom eta biratu easing funtzioak erabiliz.',

    'Pixels':
        'Pixelak',
    'manipulate costumes pixel-wise.':
        'Manipulatu mozorroak pixel mailan.',

    'Audio Comp':
        'Audioa',
    'analyze, manipulate and generate sound samples.':
        'Analizatu, manipulatu eta sortu audio laginak.',
};
