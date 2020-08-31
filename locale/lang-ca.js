/*

    lang-ca.js

    Catalan translation for SNAP!

    written by Jens Mönig

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

SnapTranslator.dict.ca = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    Ä, ä   \u00c4, \u00e4
    Ö, ö   \u00d6, \u00f6
    Ü, ü   \u00dc, \u00fc
    ß      \u00df
*/

    // translations meta information
    'language_name':
        'Català', // the name as it should appear in the language menu
    'language_translator':
        'Bernat Romagosa Carrasquer, Joan Guillén i Pelegay', // your name for the Translators tab
    'translator_e-mail':
        'bernat@snap4arduino.rocks, jguille2@xtec.cat', // optional
    'last_changed':
        '2020-08-31', // this, too, will appear in the Translators tab

    // GUI
    // control bar:
    'untitled':
        'Sense títol',
    'development mode':
        'mode de desenvolupament',

    // categories:
    'Motion':
        'Moviment',
    'Looks':
        'Aparença',
    'Sound':
        'So',
    'Pen':
        'Llapis',
    'Control':
        'Control',
    'Sensing':
        'Sensors',
    'Operators':
        'Operadors',
    'Variables':
        'Variables',
    'Lists':
        'Llistes',
    'Other':
        'Altres',

    // editor:
    'draggable':
        'arrossegable',

    // tabs:
    'Scripts':
        'Programes',
    'Costumes':
        'Vestits',
    'Backgrounds':
        'Fons',
    'Sounds':
        'Sons',

    // names:
    'Sprite':
        'Objecte',
    'Stage':
        'Escenari',

    // rotation styles:
    'don\'t rotate':
        'no gira',
    'can rotate':
        'pot girar',
    'only face left/right':
        'només mira a esquerra/dreta',

    // new sprite button:
    'add a new sprite':
        'afegeix un nou objecte',

    // tab help
    'costumes tab help':
        'podeu importar una imatge des d\'un altre lloc Web o des del\n'
            + 'vostre ordinador arrossegant-la fins aquí',
    'import a sound from your computer\nby dragging it into here':
        'podeu importar un so des del vostre ordinador\narrossegant-lo fins aquí',

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
        'Esteu a l\'Escenari:\nno hi ha primitives de moviment\n'
            + 'disponibles',

    'move %n steps':
        'mou-te %n passos',
    'turn %clockwise %n degrees':
        'gira %clockwise %n graus',
    'turn %counterclockwise %n degrees':
        'gira %counterclockwise %n graus',
    'point in direction %dir':
        'apunta en direcció %dir',
    'point towards %dst':
        'apunta cap a %dst',
    'go to x: %n y: %n':
        'vés a x: %n y: %n',
    'go to %dst':
        'vés a %dst',
    'glide %n secs to x: %n y: %n':
        'llisca en %n segons fins a x: %n y: %n',
    'change x by %n':
        'suma %n a x',
    'set x to %n':
        'assigna el valor %n a x',
    'change y by %n':
        'suma %n a y',
    'set y to %n':
        'assigna el valor %n a y',
    'if on edge, bounce':
        'rebota en tocar una vora',
    'x position':
        'posició x',
    'y position':
        'posició y',
    'direction':
        'direcció',

    // looks:
    'switch to costume %cst':
        'canvia el vestit a %cst',
    'next costume':
        'següent vestit',
    'costume #':
        'número de vestit',
    'say %s for %n secs':
        'digues %s durant %n segons',
    'say %s':
        'digues %s',
    'think %s for %n secs':
        'pensa %s durant %n segons',
    'think %s':
        'pensa %s',
    'Hello!':
        'Hola!',
    'Hmm...':
        'Hmm...',
    '%img of costume %cst':
        '%img del vestit %cst',
    'stretch %cst x: %n y: %n %':
        'estira %cst a x: %n y: %n %',
    'new costume %l width %dim height %dim':
        'nou vestit %l d\'amplada %dim i alçada %dim',
    'change %eff effect by %n':
        'augmenta l\'efecte %eff en %n',
    'set %eff effect to %n':
        'fixa l\'efecte %eff a %n',
    'clear graphic effects':
        'treu els efectes gràfics',
    '%eff effect':
        'efecte %eff',
    'change size by %n':
        'augmenta %n la mida',
    'set size to %n %':
        'fixa la mida a %n %',
    'size':
        'mida',
    'show':
        'mostra',
    'hide':
        'amaga',
    'shown?':
        'visible?',
    'go to %layer layer':
        'vés a la capa del %layer',
    'go back %n layers':
        'vés %n capes darrera',

    'development mode \ndebugging primitives:':
        'mode de desenvolupament \nprimitives de depuració',
    'console log %mult%s':
        'log per consola: %mult%s',
    'alert %mult%s':
        'alerta: %mult%s',

    // sound:
    'play sound %snd':
        'toca el so %snd',
    'play sound %snd until done':
        'toca el so %snd fins que acabi',
    'stop all sounds':
        'atura tots els sons',
    'play sound %snd at %rate Hz':
        'toca el so %snd a %rate Hz',
    '%aa of sound %snd':
        '%aa del so %snd',
    'new sound %l rate %rate Hz':
        'nou so %l a %rate Hz',
    'rest for %n beats':
        'fes silenci durant %n temps',
    'play note %note for %n beats':
        'toca la nota %note durant %n temps',
    'set instrument to %inst':
        'fixa l\'instrument a %inst',
    'change tempo by %n':
        'augmenta el tempo en %n',
    'set tempo to %n bpm':
        'fixa el tempo a %n',
    'tempo':
        'tempo',

    // "instruments", i.e. wave forms
    '(1) sine':
        '(1) sinus',
    '(2) square':
        '(2) quadrat',
    '(3) sawtooth':
        '(3) dent de serra',
    '(4) triangle':
        '(4) triangle',

    // pen:
    'clear':
        'neteja',
    'pen down':
        'baixa el llapis',
    'pen up':
        'puja el llapis',
    'pen down?':
        'llapis abaixat?',
    'set pen color to %clr':
        'fixa el color del llapis a %clr',
    'change pen color by %n':
        'augmenta en %n el color del llapis',
    'set pen color to %n':
        'fixa el color del llapis a %n',
    'change pen %hsva by %n':
        'augmenta %hsva del llapis en %n',
    'set pen %hsva to %n':
        'fixa %hsva del llapis a %n',
    'change pen shade by %n':
        'augmenta en %n la intensitat del llapis',
    'set pen shade to %n':
        'fixa la intensitat del llapis a %n',
    'change pen size by %n':
        'augmenta en %n la mida del llapis',
    'set pen size to %n':
        'fixa la mida del llapis en %n',
    'set background color to %clr':
        'fixa el color del fons a %clr',
    'change background %hsva by %n':
        'augmenta %hsva del fons en %n',
    'set background %hsva to %n':
        'fixa %hsva del fons a %n',
    'stamp':
        'estampa',
    'fill':
        'omple',
    'paste on %spr':
        'estampa sobre %spr',

    // control:
    'when %greenflag clicked':
        'Quan la %greenflag es premi',
    'when %keyHat key pressed':
        'Quan la tecla %keyHat es premi',
    'when I am %interaction':
        'Quan %interaction aquest personatge',
    'clicked':
        'es cliqui',
    'pressed':
        'es premi',
    'dropped':
        'es deixi anar',
    'mouse-entered':
        'el ratolí toqui',
    'mouse-departed':
        'el ratolí surti d\'',
    'when %b':
        'quan %b',
    'when I receive %msgHat':
        'Quan rebi %msgHat',
    'broadcast %msg':
        'Envia a tots %msg',
    'broadcast %msg and wait':
        'Envia a tots %msg i espera',
    'send %msg to %spr':
        'envia %msg a %spr',
    'Message name':
        'Nom del missatge',
    'message':
        'missatge',
    'any message':
        'qualsevol missatge',
    'wait %n secs':
        'espera %n segons',
    'wait until %b':
        'espera fins %b',
    'forever %loop':
        'per sempre %loop',
    'repeat %n %loop':
        'repeteix %n vegades %loop',
    'repeat until %b %loop':
        'repeteix fins %b %loop',
    'for %upvar = %n to %n %cla':
        'per %upvar = %n fins %n %cla',
    'if %b %c':
        'si %b llavors %c',
    'if %b %c else %c':
        'si %b llavors %c si no %c',
    'if %b then %s else %s':
        'si %b llavors %s si no %s',
    'report %s':
        'retorna %s',
    'stop %stopChoices':
        'atura %stopChoices',
    'all':
        'tot',
    'this script':
        'aquest programa',
    'this block':
        'aquest block',
    'stop %stopOthersChoices':
        'atura %stopOthersChoices',
    'all but this script':
        'tot excepte aquest programa',
    'other scripts in sprite':
        'els altres programes d\'aquest objecte',
    'pause all %pause':
        'pausa-ho tot %pause',
    'run %cmdRing %inputs':
        'executa %cmdRing %inputs',
    'launch %cmdRing %inputs':
        'llança %cmdRing %inputs',
    'call %repRing %inputs':
        'crida %repRing %inputs',
    'run %cmdRing w/continuation':
        'executa %cmdRing amb continuació',
    'call %cmdRing w/continuation':
        'crida %cmdRing amb continuació',
    'warp %c':
        'executa de cop %c',
    'when I start as a clone':
        'quan una còpia meva comenci',
    'create a clone of %cln':
        'crea un clon de %cln',
    'a new clone of %cln':
        'un nou clon de %cln',
    'myself':
        'mi mateix',
    'delete this clone':
        'esborra aquest clon',
    'tell %spr to %cmdRing %inputs':
        'digues a %spr que faci %cmdRing %inputs',
    'ask %spr for %repRing %inputs':
        'pregunta a %spr per %repRing %inputs',

    // sensing:
    'touching %col ?':
        'tocant %col ?',
    'touching %clr ?':
        'tocant el color %clr ?',
    'color %clr is touching %clr ?':
        'color %clr sobre %clr ?',
    'ask %s and wait':
        'pregunta %s i espera',
    'what\'s your name?':
        'Com et dius?',
    'answer':
        'resposta',
    'mouse x':
        'ratolí x',
    'mouse y':
        'ratolí y',
    'mouse down?':
        'ratolí clicat?',
    'key %key pressed?':
        'tecla %key premuda?',
    'distance to %dst':
        'distància a %dst',
    'reset timer':
        'reinicia el cronòmetre',
    'timer':
        'cronòmetre',
    '%att of %spr':
        '%att de %spr',
    'my %get':
        'atribut %get',
    'http:// %s':
        'http:// %s',
    'turbo mode?':
        'mode turbo?',
    'set turbo mode to %b':
        'posa el mode turbo a %b',
    'is %setting on?':
        'paràmetre %setting actiu?',
    'set %setting to %b':
        'fixa el paràmetre %setting a %b',
    'turbo mode':
        'mode turbo',
    'flat line ends':
        'puntes de llapis planes',
    'video %vid on %self':
        '%vid del vídeo en %self',
    'motion':
        'moviment',
    'snap':
        'instantània',
    'set video transparency to %n':
        'fixa la transparència del vídeo a %n',
    'video capture':
        'captura de vídeo',
    'mirror video':
        'mirall sobre el vídeo',
    'filtered for %clr':
        'filtrat per a %clr',
    'stack size':
        'mida de la pila',
    'frames':
        'frames',
    'object %self':
        'objecte %self',
    'r-g-b-a':
        'color RGBA',

    // operators:
    '%n mod %n':
        'residu de dividir %n entre %n',
    'round %n':
        'arrodoneix %n',
    '%fun of %n':
        '%fun de %n',
    'pick random %n to %n':
        'nombre a l\'atzar entre %n i %n',
    '%b and %b':
        '%b i %b',
    '%b or %b':
        '%b o %b',
    'not %b':
        'no %b',
    'true':
        'cert',
    'false':
        'fals',
    'join %words':
        'uneix %words',
    'split %s by %delim':
        'divideix %s per %delim',
    'hello':
        'hola',
    'world':
        'món',
    'letter %idx of %s':
        'lletra %idx de %s',
    'length of %s':
        'longitud del text %s',
    'unicode of %s':
        'valor Unicode de %s',
    'unicode %n as letter':
        'lletra amb valor Unicode %n',
    'is %s a %typ ?':
        'és %s un %typ ?',
    'is %s identical to %s ?':
        'és %s idèntic a %s ?',

    'type of %s':
        'tipus de %s',

    // variables:
    'Make a variable':
        'Crea una variable',
    'Variable name':
        'Nom de variable',
    'Script variable name':
        'Nom de la variable de programa',
    'inherit %shd':
        'hereta %shd',
    'Delete a variable':
        'Esborra una variable',

    'set %var to %s':
        'assigna a %var el valor %s',
    'change %var by %n':
        'augmenta %var en %n',
    'show variable %var':
        'mostra la variable %var',
    'hide variable %var':
        'amaga la variable %var',
    'script variables %scriptVars':
        'variables de programa %scriptVars',

    'my':
        'atribut',

    // lists:
    'list %exp':
        'llista %exp',
    'numbers from %n to %n':
        'nombres des de %n a %n',
    '%s in front of %l':
        'afegeix %s davant de %l',
    'item %idx of %l':
        'element %idx de %l',
    'all but first of %l':
        '%l sense el primer element',
    'length of %l':
        'longitud de %l',
    '%l contains %s':
        '%l conté %s',
    'thing':
        'cosa',
    'is %l empty?':
        '%l buida?',
    'index of %s in %l':
        'índex de %s a %l',
    'map %repRing over %l':
        'mapeja %repRing sobre %l',
    'keep items %predRing from %l':
        'manté els elements on %predRing de %l',
    'find first item %predRing in %l':
        'primer element on %predRing de %l',
    'value':
        'valor',
    'index':
        'índex',
    'combine %l using %repRing':
        'combina els elements de %l amb %repRing',
    '%blitz map %repRing over %l':
        '%blitz mapeja %repRing sobre %l',
    '%blitz keep items %predRing from %l':
        '%blitz manté els elements on %predRing de %l',
    '%blitz find first item %predRing in %l':
        '%blitz primer element on %predRing de %l',
    '%blitz combine %l using %repRing':
        '%blitz combina els elements de %l amb %repRing',
    'for each %upvar in %l %cla':
        'per cada %upvar de %l %cla',
    'item':
        'element',
    'append %lists':
        'annexa %lists',
    'add %s to %l':
        'afegeix %s a %l',
    'delete %ida of %l':
        'esborra %ida de %l',
    'insert %s at %idx of %l':
        'insereix %s a la posició %idx de %l',
    'replace item %idx of %l with %s':
        'substitueix l\'element %idx de %l per %s',

    // other
    'Make a block':
        'Crea un bloc',

    // menus
    // snap menu
    'About...':
        'Sobre Snap!',
    'Reference manual':
        'Manual de referència',
    'Snap! website':
        'Web de Snap!',
    'Download source':
        'Descarrega el codi font',
    'Switch back to user mode':
        'Torna a mode d\'usuari',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'canvia els menús contextuals\nprimitius de Morphic\nper menús més amigables',
    'Switch to dev mode':
        'Canvia a mode desenvolupador',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'habilita els menús\ncontextuals de\nMorphic i inspectors,\nmode expert!',

    // project menu
    'Project notes...':
        'Notes del projecte...',
    'New':
        'Nou',
    'Open...':
        'Obre...',
    'Save':
        'Desa',
    'Save to disk':
        'Desa al disc',
    'store this project\nin the downloads folder\n(in supporting browsers)':
        'desa aquest projecte\na la carpeta de descàrregues\n'
            + '(en navegadors que ho suportin)',
    'Save As...':
        'Anomena i desa...',
    'Import...':
        'Importa...',
    'file menu import hint':
        'Importa projectes, blocs,\nimatges o sons',


    'Export project as plain text...':
        'Exporta el projecte...',
    'Export project...':
        'Exporta el projecte...',
    'show project data as XML\nin a new browser window':
        'mostra tot el projecte en format XML\nen una altra finestra del navegador',
    'Export blocks...':
        'Exporta els blocs...',
    'save global custom block\ndefinitions as XML':
        'desa els blocs personalitzats globals\nen format XML',
    'Unused blocks...':
        'Blocs no utilitzats...',
    'find unused global custom blocks\nand remove their definitions':
        'cerca els blocs personalitzats globals\nque no s\'utilitzan per poder esborrar-los',
    'Remove unused blocks':
        'Esborra blocs no utilitzats',
    'there are currently no unused\nglobal custom blocks in this project':
        'no hi ha cap bloc\npersonalitzat no utilitzat\nen aquest projecte',
    'unused block(s) removed':
        'bloc(s) personalitzats no utilitzats esborrats',
    'Export summary...':
        'Exporta el resum...',
    'save a summary\nof this project':
        'Desa un resum\nd\'aquest projecte',

    'Contents':
        'Continguts',
    'Kind of':
        'Espècie de',
    'Part of':
        'Part de',
    'Parts':
        'Parts',
    'Blocks':
        'Blocs',
    'For all Sprites':
        'Per a tots els objectes', 
    'Libraries...':
        'Llibreries...',
    'Import library':
        'Importa una llibreria',

    // cloud menu
    'Login...':
        'Inicia la sessió...',
    'Signup...':
        'Registra\'t...',

    // settings menu
    'Language...':
        'Llengua...',
    'Zoom blocks...':
        'Mida dels blocs...',
    'Fade blocks...':
        'Esvaeix els blocs...',
    'Stage size...':
        'Mida de l\'escenari...',
    'Stage size':
        'Mida de l\'escenari',
    'Stage width':
        'Amplada de l\'escenari',
    'Stage height':
        'Alçada de l\'escenari',
    'Default':
        'Per defecte',
    'Blurred shadows':
        'Ombres suavitzades',
    'uncheck to use solid drop\nshadows and highlights':
        'desmarqueu per utilitzar\nombres i realçats sòlids',
    'check to use blurred drop\nshadows and highlights':
        'marqueu per utilitzar\nombres i realçats suavitzats',
    'Zebra coloring':
        'Coloració en zebra',
    'check to enable alternating\ncolors for nested blocks':
        'marqueu per habilitar la coloració\nalternada per a blocs imbricats',
    'uncheck to disable alternating\ncolors for nested block':
        'desmarqueu per deshabilitar la coloració\nalternada per a blocs imbricats',
    'Dynamic input labels':
        'Etiquetes de camps d\'entrada dinàmics',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'desmarqueu per desactivar les\netiquetes dinàmiques en camps variables',
    'check to enable dynamic\nlabels for variadic inputs':
        'marqueu per habilitar les\netiquetes dinàmiques en camps variables',
    'Prefer empty slot drops':
        'Dóna preferència a les ranures buides',
    'settings menu prefer empty slots hint':
        'marqueu per a fer que les ranures\nbuides tinguin preferència sobre les plenes\na l\'hora de deixar-hi caure peces',

    'uncheck to allow dropped\nreporters to kick out others':
        'desmarqueu per a fer que les ranures\nbuides tinguin la mateixa preferència que les\nplenes a l\'hora de deixar-hi caure peces',

    'Long form input dialog':
        'Força el diàleg de selecció de tipus',
    'Plain prototype labels':
        'Etiquetes de prototip simples',
    'uncheck to always show (+) symbols\nin block prototype labels':
        'desmarqueu per mostrar sempre el\nsímbol (+) en les etiquetes de prototip\nde bloc (a l\'editor de blocs)',
    'check to hide (+) symbols\nin block prototype labels':
        'marqueu per amagar el símbol (+)\nen les etiquetes de prototip\nde bloc (a l\'editor de blocs)',
    'check to always show slot\ntypes in the input dialog':
        'marqueu per a mostrar sempre\nel diàleg de selecció de tipus\nen afegir paràmetres als blocs\npersonalitzats',
    'uncheck to use the input\ndialog in short form':
        'desmarqueu per a no mostrar\nautomàticament el diàleg de selecció\nde tipus en afegir paràmetres\nals blocs personalitzats',
    'Virtual keyboard':
        'Teclat virtual',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'desmarqueu per inhabilitar\nel suport per al teclat virtual\nen dispositius mòbils',

    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'marqueu per habilitar\nel suport per al teclat virtual\nen dispositius mòbils',

    'Input sliders':
        'Lliscadors d\'entrada',
    'uncheck to disable\ninput sliders for\nentry fields':
        'desmarqueu per deshabilitar\nels lliscadors per als camps\nd\'entrada',
    'check to enable\ninput sliders for\nentry fields':
        'marqueu per habilitar\nels lliscadors per als camps\nd\'entrada',
    'Clicking sound':
        'So de clic',
    'uncheck to turn\nblock clicking\nsound off':
        'desmarqueu per deshabilitar\nel so de clic en clicar sobre\nels blocs',
    'check to turn\nblock clicking\nsound on':
        'marqueu per habilitar\nel so de clic en clicar sobre\nels blocs',
    'Animations':
        'Animacions',
    'uncheck to disable\nIDE animations':
        'desmarqueu per deshabilitar\nles animacions de la interfície',
    'Turbo mode':
        'Mode turbo',
    'check to prioritize\nscript execution':
        'marqueu per activar el mode de\nprioritat en l\'execució de programes',
    'uncheck to run scripts\nat normal speed':
        'desmarqueu per executar\nels programes a la velocitat\nnormal',
    'check to enable\nIDE animations':
        'marqueu per habilitar\nles animacions de la interfície',
    'Flat design':
        'Disseny pla',
    'Nested auto-wrapping':
        'Engloba blocs interns',
    'Keyboard Editing':
        'Edició per teclat',
    'Table support':
        'Edició de taules',
    'Table lines':
        'Línies de taules',
    'Visible stepping':
        'Monitoritzar pas a pas',
    'Thread safe scripts':
        'Fil d\'execució segur',
    'uncheck to allow\nscript reentrance':
        'desmarqueu per permetre\nla re-entrada als programes',
    'check to disallow\nscript reentrance':
        'marqueu per no permetre\nla re-entrada als programes',
    'Prefer smooth animations':
        'Suavitza les animacions',
    'uncheck for greater speed\nat variable frame rates':
        'desmarqueu per augmentar la velocitat de\nles animacions fins la màxima capacitat d\'aquesta màquina',
    'check for smooth, predictable\nanimations across computers':
        'marqueu per aconseguir unes animacions\nmés suaus i a velocitat previsible en màquines diferents',
    'Flat line ends':
        'Puntes de llapis planes',
    'check for flat ends of lines':
        'marqueu per fer que\nles puntes dels llapis\nsiguin planes',
    'uncheck for round ends of lines':
        'desmarqueu per fer que\nles puntes dels llapis\nsiguin arrodonides',
    'Ternary Boolean slots':
        'Tres opcions per a les ranures booleanes',
    'Camera support':
        'Suport per a càmera',
    'Inheritance support':
        'Suport a l\'herència d\'objectes',

    // inputs
    'with inputs':
        'amb entrades',
    'input names:':
        'noms d\'entrades:',
    'Input Names:':
        'Noms d\'entrades:',
    'input list:':
        'llista d\'entrades:',

    // context menus:
    'help':
        'ajuda',

    // palette:
    'find blocks':
        'Cerca blocs',
    'hide primitives':
        'amaga els blocs primitius',
    'show primitives':
        'mostra els blocs primitius',

    // blocks:
    'help...':
        'ajuda...',
    'relabel...':
        'blocs similars...',
    'compile':
        'compila',
    'experimental!\nmake this reporter fast and uninterruptable\nCAUTION: Errors in the ring\ncan break your Snap! session!':
    'és experimental!\naccelera aquest reportador executant-lo ininterrompudament\nCOMPTE: Errades en les condicions d\'entrada\npodrien penjar la sessió d\'Snap!',
    'uncompile':
        'descompila',
     'duplicate':
        'duplica\'m',
    'make a copy\nand pick it up':
        'crea una còpia\ni fes-la servir',
    'only duplicate this block':
        'duplica només aquest bloc',
    'delete':
        'esborra\'m',
    'script pic...':
        'mostra la meva imatge...',
    'save a picture\nof this script':
        'desa una imatge d\'aquest programa',
    'ringify':
        'encapsula\'m',
    'unringify':
        'des-encapsula\'m',
    'transient':
        'no persistent',
    'uncheck to save contents\nin the project':
        'desactiveu l\'opció per desar els continguts\nen el projecte',
    'check to prevent contents\nfrom being saved':
        'activeu l\'opció per evitar que els continguts\nes desin',
    'new line':
        'nova línia',

    // custom blocks:
    'delete block definition...':
        'esborra la definició d\'aquest bloc',
    'edit...':
        'edita...',
    'duplicate block definition...':
        'duplica la definició d\'aquest bloc',
    'Same Named Blocks':
        'Blocs amb el mateix nom',
    'Another custom block with this name exists.\n':
        'Ja existeix un altre block personalitzat amb el mateix nom.\n',
    'Would you like to replace it?':
        'Esteu segur que voleu reemplaçar-lo?',
    'Local Block(s) in Global Definition':
        'Blocs locals en una definició global',
    'This global block definition contains one or more\nlocal custom blocks which must be removed first.':
        'Aquest bloc global té un o més\nblocs locals. No poden estar dins la definició del bloc global.',

    // sprites:
    'edit':
        'edita',
    'clone':
        'clona',
    'move':
        'mou',
    'pivot':
        'pivota',
    'edit the costume\'s\nrotation center':
        'canvia el centre de\nrotació del vestit',
    'detach from':
        'desenganxa de',
    'detach all parts':
        'desenganxa totes les parts',
    'export...':
        'exporta...',
    'parent...':
        'pare...',
    'current parent':
        'pare actual',
    'release':
        'allibera',
    'make temporary and\nhide in the sprite corral':
        'transforma\'l en temporal i\ntreu-lo de l\'àrea dels objectes',

    // stage:
    'show all':
        'mostra\'ls tots',
    'pic...':
        'exporta com a imatge...',
    'save a picture\nof the stage':
        'desa una imatge\nde l\'escenari',

    // scripting area
    'clean up':
        'neteja',
    'arrange scripts\nvertically':
        'alinea els programes\nverticalment',
    'add comment':
        'afegeix un comentari',
    'undrop':
        'desfés',
    'undo the last\nblock drop\nin this pane':
        'desfés l\'últim moviment\nde blocs',
    'redrop':
        'refés',
    'use the keyboard\nto enter blocks':
    	'utilitza el teclat\nper escriure els blocs',
    'scripts pic...':
        'exporta com a imatge...',
    'save a picture\nof all scripts':
        'desa una imatge de tots els blocs de programes',
    'make a block...':
        'crea un bloc...',

    // costumes
    'rename':
        'canvia de nom',
    'export':
        'exporta',
    'rename costume':
        'canvia el nom del vestit',

    // sounds
    'Play sound':
        'Toca el so',
    'Stop sound':
        'Atura el so',
    'Stop':
        'Atura',
    'Play':
        'Toca',
    'rename sound':
        'canvia el nom del so',

    // lists and tables
    'list view...':
        'vista en format de llista...',
    'table view...':
        'vista en format de taula...',
    'open in dialog...':
        'obre en una finestra...',
    'reset columns':
        'reinicialitza les columnes',
    'items':
        'elements',

    // dialogs
    // buttons
    'OK':
        'D\'acord',
    'Ok':
        'D\'acord',
    'Cancel':
        'Cancel·la',
    'Yes':
        'Sí',
    'No':
        'No',

    // help
    'Help':
        'Ajuda',

    // zoom blocks
    'Zoom blocks':
         'Canvia la mida dels blocs',
    'build':
        'construeix',
    'your own':
        'els teus propis',
    'blocks':
        'blocs',
    'normal (1x)':
        'normal (1x)',
    'demo (1.2x)':
        'demostració (1.2x)',
    'presentation (1.4x)':
        'presentació (1.4x)',
    'big (2x)':
        'gran (2x)',
    'huge (4x)':
        'immens (4x)',
    'giant (8x)':
        'gegant (8x)',
    'monstrous (10x)':
        'monstruós (10x)',

    // fade blocks
    'Fade blocks':
        'Esvaïment dels blocs',
    'block-solid (0)':
        'normal (0)',
    'medium (50)':
        'mitjà (50)',
    'light (70)':
        'clar (70)',
    'shimmering (80)':
        'brillant (80)',
    'elegant (90)':
        'elegant (90)',
    'subtle (95)':
        'subtil (95)',
    'text-only (100)':
        'només text (100)',

    // Project Manager
    'Untitled':
        'Sense títol',
    'Open Project':
        'Obre un projecte',
    '(empty)':
        '(buit)',
    'Saved!':
        'Desat!',
    'Delete Project':
        'Esborra un projecte',
    'Are you sure you want to delete':
        'Esteu segur que voleu esborrar',
    'rename...':
        'canvia el nom...',
    'Recover':
        'Recupera',
    'Today, ':
        'Avui, ',
    'Yesterday, ':
        'Ahir, ',

    // costume editor
    'Costume Editor':
        'Editor de vestits',
    'click or drag crosshairs to move the rotation center':
        'clica o arrossega la creueta per moure el centre de rotació',

    // project notes
    'Project Notes':
        'Notes del projecte',

    // new project
    'New Project':
        'Nou projecte',
    'Replace the current project with a new one?':
        'Vols substituir el projecte actual per un de nou?',

    // save project
    'Save Project As...':
        'Anomena i desa el projecte...',

    // export blocks
    'Export blocks':
        'Exporta blocs',
    'Import blocks':
        'Importa blocs',
    'this project doesn\'t have any\ncustom global blocks yet':
        'aquest projecte encara no\nté cap bloc personalitzat',
    'select':
        'selecciona',
    'none':
        'cap bloc',

    // variable dialog
    'for all sprites':
        'per a tots els objectes',
    'for this sprite only':
        'només per a aquest objecte',

    // variables refactoring
    'rename only\nthis reporter':
        'reanomena només\naquesta instància',
    'rename all...':
        'reanomena arreu...',
    'rename all blocks that\naccess this variable':
        'reanomena totes les instàncies\nd\'aquesta variable',


    // block dialog
    'Change block':
        'Canvia el bloc',
    'Command':
        'Comanda',
    'Reporter':
        'Reportador',
    'Predicate':
        'Predicat',

    // block editor
    'Block Editor':
        'Editor de blocs',
    'Method Editor':
        'Editor de funcions',
    'Apply':
        'Aplica',

    // block deletion dialog
    'Delete Custom Block':
        'Esborra el bloc personalitzat',
    'block deletion dialog text':
        'Esteu segur que voleu esborrar la definició\nd\'aquest bloc?',


    // input dialog
    'Create input name':
        'Crea una ranura',
    'Edit input name':
        'Edita la ranura',
    'Edit label fragment':
        'Edita el fragment d\'etiqueta',
    'Title text':
        'Text del títol',
    'Input name':
        'Nom de la ranura',
    'Delete':
        'Esborra',
    'Object':
        'Objecte',
    'Number':
        'Nombre',
    'Text':
        'Text',
    'List':
        'Llista',
    'Any type':
        'Qualsevol tipus',
    'Boolean (T/F)':
        'Booleà (C/F)',
    'Command\n(inline)':
        'Comanda\n(inserida)',
    'Command\n(C-shape)':
        'Comanda\n(en forma de C)',
    'Any\n(unevaluated)':
        'Qualsevol\n(sense avaluar)',
    'Boolean\n(unevaluated)':
        'Booleà\n(sense avaluar)',
    'Single input.':
        'Entrada única.',
    'Default Value:':
        'Valor predeterminat:',
    'Multiple inputs (value is list of inputs)':
        'Entrades múltiples (el valor és una llista d\'entrades)',
    'Upvar - make internal variable visible to caller':
        'Variable interna visible des de l\'exterior',

    // About Snap
    'About Snap':
        'Sobre Snap',
    'Back...':
        'Enrere...',
    'License...':
        'Llicència...',
    'Modules...':
        'Mòduls...',
    'Credits...':
        'Crèdits...',
    'Translators...':
        'Traductors',
    'License':
        'Llicència',
    'current module versions:':
        'versions actuals dels mòduls',
    'Contributors':
        'Col·laboradors',
    'Translations':
        'Traduccions',

    // variable watchers
    'normal':
        'normal',
    'large':
        'gran',
    'slider':
        'lliscador',
    'slider min...':
        'valor mínim del lliscador...',
    'slider max...':
        'valor màxim del lliscador...',
    'import...':
        'importa...',
    'Slider minimum value':
        'Valor mínim del lliscador...',
    'Slider maximum value':
        'Valor màxim del lliscador...',
    'raw data...':
        'importa sense processar...',
    'import without attempting to\nparse or format data':
        'importa contingut sense tractar-lo ni donar-li format',

    // list watchers
    'length: ':
        'longitud: ',

    // coments
    'add comment here...':
        'afegeix un comentari aquí...',

    // drow downs
    // directions
    '(90) right':
        '(90) dreta',
    '(-90) left':
        '(-90) esquerra',
    '(0) up':
        '(0) amunt',
    '(180) down':
        '(180) avall',

    // collision detection
    'mouse-pointer':
        'punter del ratolí',
    'edge':
        'vora',
    'pen trails':
        'dibuix sobre l\'escenari',

    // costumes
    'Turtle':
        'Tortuga',
    'Empty':
        'Buit',

    'front':
        'davant',
    'back':
        'darrere',

    // pen
    'hue':
        'tonalitat',
    'transparency':
        'transparència',
    // graphical effects
    'color':
        'color',
    'fisheye':
        'ull de peix',
    'whirl':
        'remolí',
    'pixelate':
        'pixelat',
    'mosaic':
        'mosaic',
    'saturation':
        'saturació',
    'brightness':
        'brillantor',
    'ghost':
        'fantasma',
    'negative':
        'negatiu',
    'comic':
        'còmic',
    'confetti':
        'confeti',

    // keys
    'space':
        'espai',
    'any key':
        'qualsevol tecla',
    'up arrow':
        'fletxa amunt',
    'down arrow':
        'fletxa avall',
    'right arrow':
        'fletxa dreta',
    'left arrow':
        'fletxa esquerra',
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
        'nou...',

    // math functions
    'abs':
        'valor absolut',
    'ceiling':
        'sostre',
    'floor':
        'part entera',
    'sqrt':
        'arrel quadrada',
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
        'no',

    // delimiters
    'letter':
        'lletra',
    'word':
        'paraula',
    'whitespace':
        'espai en blanc',
    'line':
        'línia',
    'tab':
        'tabulador',
    'cr':
        'retorn de carro',

    // data types
    'number':
        'nombre',
    'text':
        'text',
    'Boolean':
        'Booleà',
    'list':
        'llista',
    'command':
        'comanda',
    'reporter':
        'reportador',
    'predicate':
        'predicat',
    'sprite':
        'objecte',

    // list indices
    'last':
        'últim',
    'any':
        'qualsevol',

    // attributes
    'neighbors':
        'veins',
    'self':
        'un mateix',
    'other sprites':
        'els altres objectes',
    'parts':
        'parts',
    'anchor':
        'àncora',
    'parent':
        'pare',
    'temporary?':
        'temporal?',
    'children':
        'fill',
    'clones':
        'clons',
    'other clones':
        'altres clons',
    'dangling?':
        'penjat?',
    'draggable':
        'arrossegable?',
    'rotation style':
        'estil de rotació',
    'rotation x':
        'rotació x',
    'rotation y':
        'rotació y',
    'center x':
        'centre x',
    'center y':
        'centre y',
    'name':
        'nom',
    'stage':
        'escenari',
    'costumes':
        'vestits',
    'sounds':
        'sons',
    'scripts':
        'programes',

    // inheritance
    'inherited':
        'heretat',
    'check to inherit\nfrom':
        'marqueu per heretar\n de',
    'uncheck to\ndisinherit':
        'desmarqueu per a\ndesheretar',

    // missing in lang-de.js - copied from lang-pt.js
    'delete %shd':
        'esborra %shd',
    'Retina display support':
        'Suport per pantalles Retina',
    'uncheck for lower resolution,\nsaves computing resources':
        'desmarqueu per obtenir una resolució més baixa;\nimplicarà menys consum de memòria.',
    'check for higher resolution,\nuses more computing resources':
        'marqueu per obtenir una resolució meś alta;\nimplicarà més consum de memòria..',
    'First-Class Sprites':
        'Objectes de primera classe',
    'uncheck to disable support\nfor first-class sprites':
        'desmarqueu per deshabilitar el suport\nals objectes de primera classe.',
    'check to enable support\n for first-class sprite':
        'marqueu per habilitar el suport\nals objectes de primera classe.',
    'Live coding support':
        'Suport per a la programació dinàmica',
    'EXPERIMENTAL! check to enable\n live custom control structures':
        'EXPERIMENTAL! marqueu per habilitar\nel control dinàmic d\'estructures personalitzades.',
    'EXPERIMENTAL! uncheck to disable live\ncustom control structures':
        'EXPERIMENTAL! desmarqueu per deshabilitar\nel control dinàmic d\'estructures personalitzades.',
    'Persist linked sublist IDs':
        'Desar mantenint les ID enllaçades a les subllistes',
    'check to enable\nsaving linked sublist identities':
        'marqueu per habilitar\nl\'emmagatzament de les ID enllaçades a les subllistes.',
    'uncheck to disable\nsaving linked sublist identities':
        'desmarqueu per deshabilitar\nl\'emmagatzament de les ID enllaçades a les subllistes.',
    'grow':
        'augmentar',
    'shrink':
        'disminuir',
    'flip ↔':
        'invertir ↔',
    'flip ↕':
        'invertir ↕',
    'Export all scripts as pic...':
        'Exporta tots els programes com una imatge…',
    'show a picture of all scripts\nand block definitions':
        'mostra una imatge de tots els programes\ni les definicions de blocs',
    'current %dates':
        '%dates actual',
    'year':
        'any',
    'month':
        'mes',
    'date':
        'dia',
    'day of week':
        'dia de la setmana',
    'hour':
        'hora',
    'minute':
        'minut',
    'second':
        'segon',
    'time in milliseconds':
        'temps (milisegons)',
    'find blocks...':
        'cerca blocs…',
    'costume name':
        'nom del vestit',
    'Open':
        'Obre',
    'Share':
        'Comparteix',
    'Snap!Cloud':
        'Núvol d\'Snap!',
    'Cloud':
        'Núvol',
    'could not connect to:':
        'no es pot connectar a:',
    'Service:':
        'Servei:',
    'login':
        'autenticació',
    'ERROR: INVALID PASSWORD':
        'ERROR: CONTRASENYA NO VÀLIDA',
    'Browser':
        'Navegador',
    'Sign up':
        'Registra\'t',
    'Signup':
        'Registra\'t',
    'Sign in':
        'Inicia la sessió',
    'Logout':
        'Surt',
    'Change Password...':
        'Canvia la contrasenya…',
    'Change Password':
        'Canvia la contrasenya',
    'Account created.':
        'Compte creat.',
    'An e-mail with your password\nhas been sent to the address provided':
        'S\'ha enviat un correu electrònic\namb la contrasenya d\'accés.',
    'now connected.':
        'heu entrat.',
    'disconnected.':
        'desconnectat.',
    'Reset password':
        'Recupera la contrasenya',
    'Reset Password...':
        'Recupera la contrasenya…',
    'User name:':
        'Nom d\'usuari:',
    'Password:':
        'Contrasenya:',
    'Old password:':
        'Contrasenya actual:',
    'New password:':
        'Nova contrasenya:',
    'Repeat new password:':
        'Torna a escriure la nova contrasenya:',
    'Birth date:':
        'Data de naixement:',
    'January':
        'gener',
    'February':
        'febrer',
    'March':
        'març',
    'April':
        'abril',
    'May':
        'maig',
    'June':
        'juny',
    'July':
        'juliol',
    'August':
        'agost',
    'September':
        'setembre',
    'October':
        'octubre',
    'November':
        'novembre',
    'December':
        'desembre',
    'year:':
        'any:',
    ' or before':
        ' o abans de',
    'E-mail address:':
        'Adreça de correu electrònic:',
    'E-mail address of parent or guardian:':
        'Adreça de correu electrònic del tutor o educador:',
    'Terms of Service...':
        'Condicions d\'ús…',
    'Privacy...':
        'Privacitat…',
    'I have read and agree\nto the Terms of Service':
        'He llegit i accepto\nles condicions d\'ús',
    'stay signed in on this computer\nuntil logging out':
        'mantenir-me autenticat en aquest ordinador\nfins que em desconnecti',
    'please fill out\nthis field':
        's\'ha d\'omplir aquest camp.',
    'User name must be four\ncharacters or longer':
        'El nom d\'usuari ha de tenir\nalmenys 4 caràcters.',
    'please provide a valid\nemail address':
        's\'ha de introduir un correu vàlid.',
    'password must be six\ncharacters or longer':
        'la contrasenya ha de tenir\nalmenys sis caràcters.',
    'passwords do\nnot match':
        'les contrasenyes\nno coincideixen.',
    'please agree to\nthe TOS':
        's\'han d\'acceptar\les condicions d\'ús.',
    'Examples':
        'Exemples',
    'Computer':
        'Ordinador',
    'You are not logged in':
        'No esteu validats',
    'Updating\nproject list...':
        'Actualizant \nla llista de projectes…',
    'Opening project...':
        'Obrint el projecte…',
    'Fetching project\nfrom the cloud...':
        'Descarregant el projecte\ndes del núvol…',
    'Saving project\nto the cloud...':
        'Desant el projecte\nal núvol…',
    'Sprite Nesting':
        'Ancoratge d\'objectes',
    'uncheck to disable\nsprite composition':
        'desmarqueu per deshabilitar\nl\'ancoratge d\'objectes',
    'Codification support':
        'Suport pel mapeig de codi',
    'check for block\nto text mapping features':
        'marqueu per habilitar les funcionalitats\nde mapeig de blocs en codi',
    'saved.':
        'desat.',
    'options...':
        'opcions…',
    'read-only':
        'només de lectura',
    'Input Slot Options':
        'Opcions de la ranura',
    'Enter one option per line.Optionally use "=" as key/value delimiter\ne.g.\n   the answer=42':
        'Escriviu cada opció en una línia.\nTambé podeu fer servir "=" com a separador entre\nclau i valor, per exemple resposta=42',
    'paint a new sprite':
        'Pinta un nou objecte',
    'Paint a new costume':
        'Pinta un nou vestit.',
    'add a new Turtle sprite':
        'afegeix un nou objecte',
    'check for alternative\nGUI design':
        'marqueu per obtenir una\ninterfície gràfica alternativa',
    'Rasterize SVGs':
        'Transforma SVG en mapa de bits',
    'check to rasterize\nSVGs on import':
        'marqueu per transformar els\nSVG a mapa de bits en importar',
    'comment pic...':
        'imatge del comentari…',
    'save a picture\nof this comment':
        'desa una imatge\ndel comentari',
    'undo':
        'desfés',
//Paint editors
    'Vector Paint Editor':
        'Editor vectorial d\'imatges',
    'Brush size':
        'Gruix del pinzell',
    'Constrain proportions of shapes?\n(you can also hold shift)':
        'Manté la proporció de les formes?\n(també es pot fer prement la tecla "majúscules")',
    'Eraser tool':
        'Goma d\'esborrar',
    'Paintbrush tool\n(free draw)':
        'Pinzell\n(dibuix lliure)',
    'Line tool\n(shift: vertical/horizontal)':
        'Línies\n(majúscula: vertical/horitzontal)',
    'Line tool\n(shift: constrain to 45º)':
        'Línies\n(majúscula: només angles de 45º)',
    'Stroked Rectangle\n(shift: square)':
        'Rectangle traçat\n(majúscula: quadrat)',
    'Filled Rectangle\n(shift: square)':
        'Rectangle ple\n(majúscula: quadrat)',
    'Rectangle\n(shift: square)':
        'Rectangle\n(majúscula: quadrat)',
    'Stroked Ellipse\n(shift: circle)':
        'El·lipse traçada\n(majúscula: circumferència)',
    'Filled Ellipse\n(shift: circle)':
        'El·lipse plena\n(majúscula: cercle)',
    'Ellipse\n(shift: circle)':
        'El·lipse\n(majúscula: cercle)',
    'Selection tool':
        'Eina de selecció',
    'Closed brush\n(free draw)':
        'Dibuix tancat\n(pinzell lliure)',
    'Paint a shape\n(shift: edge color)':
        'Coloreja la forma\n(majúscula: el traçat)',
    'Fill a region':
        'Ompla l\'àrea',
    'Set the rotation center':
        'Estableix el centre de rotació',
    'Pipette tool\n(pick a color anywhere)':
        'Capturador de color\n(captura el color de qualsevol lloc)',
    'Polygon':
        'Polígon',
    'Paint Editor':
        'Editor d\'imatges',
    'square':
        'quadrat',
    'pointRight':
        'punter',
    'gears':
        'engranatge',
    'file':
        'arxiu',
    'fullScreen':
        'pantalla sencera',
    'normalScreen':
        'pantalla normal',
    'smallStage':
        'escenari petit',
    'normalStage':
        'escenari normal',
    'turtle':
        'tortuga',
    'turtleOutline':
        'contorn de la tortuga',
    'pause':
        'pausa',
    'flag':
        'bandera',
    'octagon':
        'octàgon',
    'cloud':
        'núvol',
    'cloudOutline':
        'contor de núvol',
    'cloudGradient':
        'núvol amb gradient',
    'turnRight':
        'girant a la dreta',
    'turnLeft':
        'girant a l\'esquerra',
    'storage':
        'emmagatzament',
    'poster':
        'póster',
    'flash':
        'llamp',
    'brush':
        'pinzell',
    'rectangle':
        'rectangle',
    'rectangleSolid':
        'rectàngle sòlid',
    'circle':
        'circumferència',
    'circleSolid':
        'cercle',
    'crosshairs':
        'punt de mira',
    'paintbucket':
        'pot de pintura',
    'eraser':
        'goma d\'esborrar',
    'pipette':
        'pipeta',
    'Pipette tool\n(pick a color from anywhere\nshift: fill color)':
        'Capturador de color\n(captura un color de qualsevol lloc\nMajúscules: pel color d\'emplenament)',
    'Edge color\n(left click)':
        'Color del Traç\n(botó esquerre)',
    'Fill color\n(right click)':
        'Color d\'Emplenament\n(botó dret)',
    'Bitmap':
        'Mapa de bits',
    'Top':
        'A dalt',
    'Bottom':
        'A baix',
    'Up':
        'Amunt',
    'Down':
        'Avall',
    'top':
        'superior',
    'bottom':
        'inferior',
    'left':
        'esquerra',
    'right':
        'dreta',
    'This will erase your current drawing.\n':
        'El canvi d\'editor esborrarà el dibuix actual.\n',
    'Are you sure you want to continue?':
        'Esteu segur que voleu continuar?',
    'Switch to vector editor?':
        'Voleu canviar a l\'editor vectorial?',
    'This will convert your vector objects into\nbitmaps,':
        'El canvi convertirà els objectes vectorials en\nun mapa de bits,',
    ' and you will not be able to convert\nthem back into vector drawings.\n':
        ' i no es podrà tornar enrere\nni recuperar els objectes vectorials.\n',
    'Convert to bitmap?':
        'Voleu canviar a mapa de bits?',
// més símbols
    'speechBubble':
        'bafarada',
    'speechBubbleOutline':
        'contorn de bafarada',
    'arrowUp':
        'fletxa amunt',
    'arrowUpOutline':
        'contorn de fletxa amunt',
    'arrowLeft':
        'fletxa a l\'esquerra',
    'arrowLeftOutline':
        'contorn de fletxa a l\'esquerra',
    'arrowDown':
        'fletxa avall',
    'arrowDownOutline':
        'contorn de fletxa avall',
    'arrowRight':
        'fletxa a la dreta',
    'arrowRightOutline':
        'contorn de fletxa a la dreta',
    'robot':
        'robot',
    'globe':
        'món',
    'stepForward':
        'pas endavant',
    'cross':
        'creu',
    'loop':
        'bucle',
    'turnBack':
        'torna enrere',
    'turnForward':
        'torna endavant',
    'magnifyingGlass':
        'lupa',
    'magnifierOutline':
        'contorn de lupa',
    'selection':
        'selecció',
    'polygon':
        'polígon',
    'closedBrush':
        'pinzell tancat',
    'camera':
        'càmera',
    'location':
        'localització',
    'footprints':
        'petjades',
    'keyboard':
        'teclat',
    'keyboardFilled':
        'plantilla de teclat',
//
    'turn pen trails into new costume...':
        'crea un nou vestit amb la imatge dibuixada…',
    'turn all pen trails and stamps\ninto a new costume for the\ncurrently selected sprite':
        'crea un nou vestit per l\'actual objecte\namb la imatge dibuixada',
    'pen':
        'llapis',
    'tip':
        'punta',
    'middle':
        'mig',
    'last changed':
        'el darrer modificat',
    'Share Project':
        'Comparteix el Projecte',
    'Unshare Project':
        'Deixa de compartir el Projecte',
    'sharing\nproject...':
        'compartint\nel projecte…',
    'unsharing\nproject...':
        'deixant de compartir\nel projecte…',
    'shared.':
        'compartit.',
    'unshared.':
        'no compartit.',
    'Unshare':
        'Deixa de compartir',
    'Are you sure you want to unshare':
        'Esteu segur que voleu deixar de compartir',
    'Are you sure you want to share':
        'Esteu segur que voleu compartir',
    'Publish Project':
        'Publica el Projecte',
    'publishing\nproject...':
        'publicant\nel projecte...',
    'published.':
        'publicat.',
    'Are you sure you want to publish':
        'Esteu segur que voleu publicar',
    'Unpublish Project':
        'Deixar de publicar el Projecte',
    'unpublishing\nproject...':
        'deixant de publicar\nel projecte...',
    'unpublished.':
        'no publicat',
    'Publish':
        'Publica',
    'Unpublish':
        'Despublica',
    'Are you sure you want to unpublish':
        'Esteu segur que voleu deixar de publicar',
    'Replace Project':
        'Substitueix el Projecte',
    'Are you sure you want to replace':
        'Esteu segur que voleu substituir el projecte original',
    'password has been changed.':
        's\'ha canviat la contrasenya.',
    'SVG costumes are\nnot yet fully supported\nin every browser':
        'els vestits SVG encara\no són suportats\per tots els navegadors',
    'Save Project':
        'Desa el Projecte',
    'script pic with result...':
        'imatge del programa i del resultat…',
    'result pic...':
        'imatge del resultat...',
    'save a picture of both\nthis script and its result':
        'desa una imatge\ndels blocs amb el resultat',
    'JavaScript function ( %mult%s ) { %code }':
        'JavaScript function ( %mult%s ) { %code }',
    'Select categories of additional blocks to add to this project.':
        'Trieu conjunts de blocs addicionals per afegir a aquest projecte.',
    'Import sound':
        'Importa sons',
    'Select a sound from the media library':
        'Trieu un so de la biblioteca',
    'Import':
        'Importa',
    'Select a costume from the media library':
        'Trieu un vestit de la biblioteca',
    'edit rotation point only...':
        'edita només el centre de rotació…',
    'Export Project As...':
        'Exporta el Projecte com…',
    'a variable of name \'':
        'una variable de nom \'',
    '\'\ndoes not exist in this context':
        '\'\nno existeix en aquest context',
    '(temporary)':
        '(temporal)',
    'expecting':
        'esperant',
    'input(s), but getting':
        'com a entrada(s), però s\'ha rebut',
    'parent...':
        'pare…',
    'Dragging threshold...':
        'Llindar per l\'arrossegament…',
    'Cache Inputs':
        'Entrades a la Memòria Cau',
    'uncheck to stop caching\ninputs (for debugging the evaluator)':
        'desmarqueu per no desar les entrades\na la memòria cau (per depurar l\'avaluador)',
    'check to cache inputs\nboosts recursion':
        'marqueu per a desar les entrades\na la memòria cau (accelera la recursivitat)',
    'Project URLs':
        'URL del projecte',
    'check to enable\nproject data in URLs':
        'marqueu per habilitar\nles dades del projecte a la URL',
    'uncheck to disable\nproject data in URLs':
        'desmarqueu per deshabilitar\nles dades del projecte a la URL',
    'export project media only...':
        'exporta només els sons i imatges del projecte…',
    'export project without media...':
        'exporta el projecte sense sons ni imatges…',
    'export project as cloud data...':
        'exporta el projecte com a dades en el núvol…',
    'open shared project from cloud...':
        'obre un projecte compartit en el núvol…',
    'url...':
        'URL…',
    'Export summary with drop-shadows...':
        'Exporta el resum amb les imatges ombrejades…',
    'download and save\nwith a summary of this project\nwith drop-shadows on all pictures.\nnot supported by all browsers':
        'Desa i descarrega\nun resum del projecte\namb totes les imatges ombrejades.\n No tots els navegadors suporten aquesta funcionalitat',
    'specify the distance the hand has to move\nbefore it picks up an object':
        'especifica a què distància\ns\'han d\'arrossegar els blocs\nper a que es moguin',
    'block variables...':
        'variables del bloc…',
    'remove block variables...':
        'resborra les variables del bloc…',
    'block variables':
        'variables del bloc',
    'experimental -\nunder construction':
        'Experimental -\nen construcció',
    'Table view':
        'Vista de taula',
    'open in another dialog...':
        'obriu en un altre formulari…',
    'check for multi-column\nlist view support':
        'marqueu per habilitar el suport\na la vista de llista amb multicolumnes',
    'uncheck to disable\nmulti-column list views':
        'desmarqueu per a deshabilitar\nla vista de llista amb multicolumnes',
    'check for higher contrast\ntable views':
        'marqueu per obtenir un contrast més alt\n a la vista de taula',
    'uncheck for less contrast\nmulti-column list views':
        'desmarqueu per a tenir un baix contrast\na la vista de llista amb multicolumnes',
    '(in a new window)':
        '(dins una nova finestra)',
    'save project data as XML\nto your downloads folder':
        'Exporta el projecte en un arxiu\nen format XML',

    // més cadenes...
    'map %cmdRing to %codeKind %code':
        'mapeja %cmdRing com a %codeKind %code',
    'map String to code %code':
        'mapeja un text com a codi %code',
    'map %codeListPart of %codeListKind to code %code':
        'mapeja %codeListPart de %codeListKind no com a codi %code',
    'code of %cmdRing':
        'codi de %cmdRing',
    'delimiter':
        'limitaodr',
    'collection':
        'col·lecció',
    'variables':
        'variables',
    'parameters':
        'paràmetres',
    'code':
        'codi',
    'header':
        'capçalera',
    'header mapping...':
        'mapejant la capçalera…',
    'code mapping...':
        'mapejant el codi…',
    'Code mapping':
        'Mapeig del codi',
    'Header mapping':
        'Mapeig de la capçalera',
    'Enter code that corresponds to the block\'s definition. Use the formal parameter\nnames as shown and <body> to reference the definition body\'s generated text code.':
        'Introdueix el codi que correspon a la definició del bloc. Utilitza els noms\ndels paràmetres per mostrar-los i <body> per referenciar el codi generat per la definició del cos',
    'Enter code that corresponds to the block\'s definition. Choose your own\nformal parameter names (ignoring the ones shown).':
        'Introdueix el codi que correspon a la definició del bloc. Tria els teus\npropis noms (ignorant els que es mostren).',
    'Enter code that corresponds to the block\'s operation (usually a single\nfunction invocation). Use <#n> to reference actual arguments as shown.':
        'Introdueix el codi que correspon a l\'operació del bloc (normalment només una funció). Utilitza <#n> per referenciar els paràmetres actuals tal com es mostren.',
    'uncheck to disable\nkeyboard editing support':
        'desmarqueu per deshabilitar\nel suport a l\'edició per teclat',
    'check to enable\nkeyboard editing support':
        'marqueu per habilitar\nel suport a l\'edició per teclat',
    'uncheck to disable\nsprite inheritance features':
        'desmarqueu per deshabilitar les\nfuncionalitats relatives a l\'herència d\'objectes',
    'check for sprite\ninheritance features':
        'marqueu per habilitar les\nfuncionalitats relatives a l\'herència d\'objectes',

//More strings missed in de and pt translations

//Mode developer blocks
	'wardrobe':
		'vestits',
	'jukebox':
		'sons',
	'save %imgsource as costume named %s':
		'desa %imgsource com a vestit amb nom %s',
	'screenshot':
		'captura de pantalla',
	'stage image':
		'imatge de l\'escenari',
	'processes':
		'processos',
	'show table %l':
		'mostra la taula %l',
	'%txtfun of %s':
		'%txtfun de %s',
    'stick to':
        'ancora a',
//IDE Messages
	'entering development mode.\n\nerror catching is turned off,\nuse the browser\'s web console\nto see error messages.':
		'entrant en mode desenvolupador.\n\ndeshabilitada la captura d\'errades,\nutilitzeu la consola del navegador\nper veure els errors.',
	'entering user mode':
		'entrant en mode d\'usuari',
	'dragging threshold':
		'llindar per l\'arrossegament',
	'redo the last undone block drop in this pane':
		'refés l\'últim moviment\nde blocs desfet',
    'cloud unavailable without a web server.':
        'el núvol no està disponible sense un servidor web.',

//costumes and backgrounds
	'rename background':
		'canvia el nom del fons',
	'turn pen trails into new background...':
		'crea un nou fons amb la imatge dibuixada…',
	'turn all pen trails and stamps\ninto a new background for the stage':
		'crea un nou fons d\'escenari\namb la imatge dibuixada',

//Helping text for menu options
	'uncheck for default\nGUI design':
		'desmarqueu per obtenir la\ninterfície gràfica per defecte',
	'uncheck to confine auto-wrapping\nto top-level block stacks':
		'desmarqueu per restringir\nl\'englobament de blocs a les piles senceres',
	'check to enable auto-wrapping\ninside nested block stacks':
		'marqueu per habilitar\nl\'englobament de blocs interns',
	'check to turn on\n visible stepping (slow)':
		'marqueu per monitoritzar la\nprogramació per pas a pas (alenteix)',
	'uncheck to turn off\nvisible stepping':
		'desmarqueu per deshabilitar\nla monitorització pas a pas',
    'check to allow\nempty Boolean slots':
        'marqueu per permetre tornar a\ndeixar buides les ranures booleanes',
    'uncheck to limit\nBoolean slots to true / false':
        'desmarqueu per commutar les ranures\nbooleanes només entre cert i fals',
    'uncheck to disable\ncamera support':
        'desmarqueu per deshabilitar\nel suport per a càmeres',
    'check to enable\ncamera support':
        'marqueu per habilitar\nel suport a càmeres',
	'uncheck to disable\nblock to text mapping features':
		'demarqueu per deshabilitar les\nfuncionalitats de mapeig de blocs en codi',
	'uncheck for smooth\nscaling of vector costumes':
		'desmarqueu per atenuar\nescalant les imatges vectorials',
	'check to enable\nsprite composition':
		'marqueu per habilitar\nl\'ancoratge d\'objectes',

	'Execute on slider change':
		'Executa en utilitzar els lliscadors',
	'uncheck to suppress\nrunning scripts\nwhen moving the slider':
		'desmarqueu per no llançar\nl\'execució dels programes\nen utilitzar els seus lliscadors',
	'check to run\nthe edited script\nwhen moving the slider':
		'marqueu per habilitar\nl\'execució dels programes\nen utilitzar els seus lliscadors',
    'Enable command drops in all rings':
        'Permet arrossegar les comandes dins tots els encapsulaments',
    'uncheck to disable\ndropping commands in reporter rings':
        'desmarqueu per deshabilitar\nl\'arrossegament de comandes en\nencapsulaments reportadors',
    'check to enable\ndropping commands in all rings':
        'marqueu per habilitar\nl\'arrossegament de comandes en\ntots els encapsulaments',
//Developer mode menus
	'user features...':
		'opcions d\'usuari...',
	'color...':
		'color...',
	'\ncolor:':
		'\ncolor:',
	'choose another color \nfor this morph':
		'trieu un altre color\nper aquest \'morph\'',
	'transparency...':
		'transparència...',
	'\nalpha\nvalue:':
		'\nvalor del\ncanal alfa:',
	'set this morph\'s\nalpha value':
		'fixeu el valor del canal\nalfa per aquest \'morph\'',
	'resize...':
		'redimensiona...',
	'show a handle\nwhich can be dragged\nto change this morph\'s extent':
		'mostra una nansa per\npoder-la arrossegar i canviar\nla mida d\'aquest \'morph\'',
	'duplicate':
		'duplica',
	'make a copy\nand pick it up':
		'fés una còpia\ni pren-la',
	'pick up':
		'pren aquest \'morph\'',
	'detach and put \ninto the hand':
		'arrossega i mou\namb el punter',
	'attach...':
		'enganxa...',
	'stick this morph\nto another one':
		'enganxa aquest \'morph\' a un altre',
	'move...':
		'mou...',
	'show a handle\nwhich can be dragged\nto move this morph':
		'mostra una nansa per\npoder-la arrossegar i\nmoure aquest \'morph\'',
	'inspect...':
		'examina...',
	'open a window\non all properties':
		'obre una finestra\namb totes les propietats',
	'pic...':
		'imatge...',
	'open a new window\nwith a picture of this morph':
		'obre una finestra amb\nuna imatge d\'aquest \'morph\'',
	'lock':
		'bloqueja',
	'make this morph\nunmovable':
		'fés que aquest \'morph\'\nno es pugui moure',
	'unlock':
		'desbloqueja',
	'make this morph\nmovable':
		'fés que aquest \'morph\'\nes pugui moure',
	'World...':
		'Món...',
	'show the\nWorld\'s menu':
		'mostra el menú del Món',
	//World options
	'demo...':
		'exemple...',
	'sample morphs':
		'crea un \'morph\' de mostra',
	'hide all...':
		'amaga-ho tot',
	'show all...':
		'mostra-ho tot',
	'move all inside...':
		'mou tot a dins',
	'keep all submorphs\nwithin and visible':
		'manté tots els \'submorphs\'\na dins i visibles',
	'open a window on\nall properties':
		'obre una finestra\namb totes les propietats',
	'screenshot...':
		'captura de pantalla...',
	'open a new window\nwith a picture of this morph':
		'obre una finestra\n amb la imatge del Món',
	'restore display':
		'reestableix la visualització',
	'redraw the\nscreen once':
		'repinta la pantalla\nuna vegada',
	'fill page...':
		'omple la finestra...',
	'let the World automatically\nadjust to browser resizing':
		'permet que el Món s\'ajusti\nautomàticament al canvi de mida de la finestra',
	'sharp shadows...':
		'ombres contrastades...',
	'sharp drop shadows\nuse for old browsers':
		'utilitza ombres contrastades\nper a navegadors antics',
	'blurred shadows...':
		'ombres degradades...',
	'blurry shades,\n use for new browsers':
		'utilitza ombres degradades\n per a navegadors moderns',
	'choose the World\'s\nbackground color':
		'tria el color de\nfons del Món',
	'touch screen settings':
		'configuració per pantalla tàctil',
	'bigger menu fonts\nand sliders':
		'fa més grans els lliscadors i els menús',
	'standard settings':
		'configuració estàndard',
	'smaller menu fonts\nand sliders':
		'fa més petits els lliscadors i els menús',
	'user mode...':
		'mode d\'usuari...',
	'disable developers\'\ncontext menus':
		'desabilita els menús\ndel mode de desenvolupament',
	'development mode...':
		'mode de desenvolupament',
	'about morphic.js...':
		'sobre morphic.js...',
	//Make a Morph
	'make a morph':
		'crea un \'morph\'',
	'rectangle':
		'rectangle',
	'box':
		'caixa',
	'circle box':
		'caixa circular',
	'frame':
		'marc',
	'scroll frame':
		'marc amb desplaçament',
	'handle':
		'nansa',
	'string':
		'cadena',
	'Hello, World!':
		'Hola Món!',
	'speech bubble':
		'bafarada',
	'gray scale palette':
		'paleta d\'escala de grisos',
	'color palette':
		'paleta de colors',
	'color picker':
		'selector de color',
	'sensor demo':
		'exemple de sensor',
	'animation demo':
		'exemple d\'animació',

//future JS options
	'uncheck to disable support for\nnative JavaScript functions':
		'desmarqueu per deshabilitar\nl\'execució de Javascript',
	'check to support\nnative JavaScript functions':
		'marqueu per habilitar\nl\'execució de Javascript',
	'JavaScript is not enabled':
		'l\'execució de Javascript està deshabilitada',

//Libraries
	'Loading':
		'S\'està carregant',
	'Imported':
		'S\'ha importat',

	'Iteration, composition':
		'Iteracions i composició',
    'Traditional loop constructs (while, until, etc.) plus the Lisp "named let" (a generalization of FOR) plus functional iteration (repeated invocation of a function) and function composition.':
        'Construcció de bucles estàndard (while, until, etc.), construccions "named let" pròpies de Lisp (una generalització dels bucles "for"), iteració funcional (repeticions de crides a una funció) i composició de funcions.',
	'List utilities':
		'Utilitats per a llistes',
    'Some standard functions on lists (reverse, sort, etc.)':
        'Funcions estàndard per a llistes (capgira, ordena, etc.)',
    'Colors and Crayons':
        'Colors i Paletes',
    'Incorporates the former crayon and set RGB libraries.  Implements fair hues (more orange, less green, adds brown) and a linear color scale including grayscale and fair-hue-based shades.':
        'Incorpora les llibreries inicials de Paletes de color i Colors RGB. Utilitza tonalitats més ajustades (més taronges, menys verds, afegeix marrons) i una escala de color lineal que inclou escala de grisos i més matisos de tonalitat.',
    'Bignums, rationals, complex #s':
        'Números sencers de precisió infinita, racionals exactes i complexos',
    'The full Scheme numeric tower.  "USE BIGNUMS <True>" to enable.':
        'Ens ofereix la implementació numèrica de Scheme. Cal habilitar els "Big Nums" (amb el bloc "USE BIGNUMS" a cert) per utilitzar-ho',
	'Multi-branched conditional':
		'Condicionals compostos',
    'Like "switch" in C-like languages or "cond" in Lisp.  Thanks to Nathan Dinsmore for inventing the idea of a separate block for each branch!':
        'La mateixa idea que la comanda "switch" en llenguatges tipus C o "cond" en Lisp. Gràcies a Nathan Dinsmore per inventar la idea de tenir un bloc separat per a cada branca!',
	'Catch errors':
		'Detecta errors',
    'Run a script; if an error happens, instead of stopping the script with a red halo, run another script to handle the error. Also includes a block to cause an error with a message given as input. Also includes a block to create a script variable and give it a value.':
        'Executa un programa i, si troba alguna errada, no atura el programa reportant un avís vermell sobre el bloc, sinó que permet definir un altre programa que pugui evitar aquesta errada. També inclou un bloc per enviar missatges d\'errades i també un altre per crear variables de programa i assignar el seu valor.',
    'Parallelization':
        'Processos en paral·lel',
    'Run several scripts in parallel and wait until all are done.':
        'Executa diversos scripts en paral·lel, i espera que hagin acabat tots els processos abans d\'aturar-se',
    'Getters and setters':
        'Llegir i establir paràmetres del sistema',
    'Eisenberg\'s Law: Anything that can be done from the GUI should be doable from the programming language, and vice versa.':
        'La llei de Eisenberg diu: Des de la programació s\'hauria de poder fer tot allò que es faci des de l\'entorn i les seves funcionalitats i configuració. I viceversa!',
	'Variadic reporters':
		'Càlculs multientrada',
    'Versions of +, x, AND, and OR that take more than two inputs.':
        'Versions dels blocs +, x, AND i OR que tenen més de dues ranures',

    'World Map':
        'Mapa del món',
    'Add interactive maps to projects':
        'Afegeix mapes interactius als projectes.',
    'Text Costumes':
        'Text als vestits',
    'Generate costumes from letters or words of text.':
        'Genera vestits utilitzant lletres, paraules... o qualevol text.',
    'Text to Speech':
        'Lector de text',
    'Output text using speech synthesis.':
        'Utilitza la síntesi de veu per crear so des d\'un text',
    'Animation':
        'Animacions',
    'Glide, grow and rotate using easing functions.':
        'Fés lliscar, crèixer i girar els objectes utilitzant diferents formes i filtres a les animacions',
    'Pixels':
        'Píxels',
    'Manipulate costumes pixel-wise.':
        'Manipulem els píxels dels vestits',
    'Audio Comp':
        'Composició d\'audio',
    'Analyze, manipulate and generate sound samples.':
        'Analitza, manipula i genera mostres de so',
    'Frequency Distribution Analysis':
        'Anàlisi de la distribució de freqüències',
    'Analyze data for frequency distribution':
        'Analitza les dades de distribució de freqüències.',
    'Database':
        'Base de dades',
    'Persistent key-value storage across Snap! sessions in the same browser':
        'Desa al navegador dades (clau-valor) persistents entre sessions d\'Snap!',

	'Words, sentences':
		'Paraules i frases',
   'One of the big ideas in Logo that they left out of Scratch is thinking of text as structured into words and sentences, rather than just a string of characters.  This library brings back that idea.':
        'Una de les idees importants en Logo que no va ser inclosa a Scratch era pensar en els textos com a una estructura de paraules i frases, més que no com una llista de caràcters. Aquesta llibreria torna a desenvolupar aquesta idea.',
    'Strings, Multi-line input':
        'Operadors de text i entrades multilínia',
    'Extract substrings of a string in various ways. In general, text inputs allow only a single line.  The MULTILINE block accepts multi-line text input and can be used in text input slots of other blocks.':
        'Extreu part de cadenes de text amb diversos criteris. El bloc "multilínia" permet afegir entrades de text multilínia en qualsevol entrada de blocs',
    'APL primitives':
        'Primitives APL',
    'Adds features from the APL language supporting hyperblocks.':
        'Afegeix funcionalitats del llenguatge APL als hiper-blocs.',
	'Streams (lazy lists)':
		'Streams (llistes presconstruides)',
    'A variation on the list data type in which each list item isn\'t computed until it\'s needed, so you can construct million-item lists without really taking up all that time or memory, or even infinite-sized lists.  (A block that reports all the prime numbers is included as an example.)  See SICP 3.5 for a tutorial.':
        'Variació del tipus de dades "llistes" on els elements de la llista no són avaluats fins que s\'utilitzen. D\'aquesta manera es poden construir llistes amb milions d\'elements sense un gran consum de memòria i fins i tot construir llistes de mida infinita. (S\'inclou un bloc d\'exemple que reporta tots els números primers.) Veieu el tutorial a SICP 3.5.',
    'Bar charts':
        'Gràfics de barres',
    'Takes a table (typically from a CSV data set) as input and reports a summary of the table grouped by the field in the specified column number.  The remaining three inputs are used only if the field values are numbers, in which case they can be grouped into buckets (e.g., decades, centuries, etc.).  Those three inputs specify the smallest and largest values of interest and, most importantly, the width of a bucket (10 for decades, 100 for centuries).  If the field isn\'t numeric, leave these three inputs empty or set them to zero.  In that case, each string value of the field is its own bucket, and they appear sorted alphabetically.  The block reports a new table with three columns.  The first column contains the bucket name or smallest number.  The second column contains a nonnegative integer that says how many records in the input table fall into this bucket.  The third column is a subtable containing the actual records from the original table that fall into the bucket.  If your buckets aren\'t of constant width, or you want to group by some function of more than one field, load the "Frequency Distribution Analysis" library instead.':
        'Agafa una taula (normalment obtinguda des d\'un fitxer CSV) com a entrada i obté un resum de la taula agrupant les dades pel camp especificat pel número de columna. Les altres tres entrades només s\'utilitzen si els valors d\'aquest camp són nombres, i llavors permet agrupar-los (per exemple en dècades, segles...). Aquestes tres entrades indiquen els valors més petits i més grans dels grups i, més important, la longitud de l\'agrupació (10 per dècades, 100 per segles). Si el camp no és numèric, cal deixar aquests tres camps buits o a zero. En aquest darrer cas, cada valor de text farà una agrupació (una dada a representar) i apareixerà en ordre alfabètic. El bloc retorna una nova taula amb tres columnes. La primera té el nom del grup. La segona el número de registres que té cada grup. I la tercera té una altra taula amb els registres originals que s\'han agrupat. Si les agrupacions no tenen una amplada constant o es vol agrupar per alguna funció o per més d\'un camp, cal utilitzar la llibreria "Anàlisi de la distribució de freqüències".',
	'Web services access (https)':
		'Accés a serveis Web (https)',
    'An extended version of the URL block that allows POST, PUT, and DELETE as well as GET requests, allows using the secure HTTPS protocol, and gives control over headers, etc.  Also parses JSON data.':
        'Una versió ampliada del bloc URL que permet treballar amb  crides "POST", "PUT", "DELETE" i "GET" i també triar el protocol "HTTP-HTTPS" i controlar les capçaleres. També permet treballar amb dades JSON.',
    'Create variables':
        'Crea variables',
    'Create and manage global/sprite/script variables in a script':
        'Crea i gestiona variables de tipus global/sprite/script dins els programes',

    'Hummingbird robotics':
        'Hummingbird robòtics',
    'Control the Hummingbird robotics kit processor':
        'Control per als kits Hummingbird.',
	'LEAP Motion controller':
		'Controladors per a LEAP Motion',
    'Report hand positions from LEAP Motion controller (leapmotion.com).':
        'Reporta la posició de les mans des de un controlador de moviment LEAP (leapmotion.com).',

//
	'(no matches)':
		'(cap resultat)',
    'take a camera snapshot and\nimport it as a new sprite':
        'pren una imatge amb la càmera\ni importa-la com un nou vestit',
    'Import a new costume from your webcam':
        'Importa un nou vestit amb la webcam',
    'random':
        'qualsevol',
    'random position':
        'qualsevol posició',
    'center':
        'centre',
    '%rel to %dst':
        '%rel a %dst',
    'distance':
        'distància',
    'costume':
        'vestit',
    'sound':
        'so',
    'Record a new sound':
        'Grava un so nou',
    'Sound Recorder':
        'Gravadora de So',
    'recording':
        'gravació',
    'JIT compiler support':
        'Suport a la compilació JIT',
    'EXPERIMENTAL! uncheck to disable live\nsupport for compiling':
        'EXPERIMENTAL! Desmarqueu per deshabilitar el\nsuport a la compilació dinàmica',
    'EXPERIMENTAL! check to enable\nsupport for compiling':
        'EXPERIMENTAL! Marqueu per habilitar\nel suport a la compilació',
    'compile %repRing for %n args':
        'compila %repRing per %n arguments',
    'rotate':
        'gira',
    'stopped':
        'pari',
    'scrolled-up':
        'faci scroll amunt',
    'scrolled-down':
        'faci scroll avall',
    'Resend Verification Email...':
        'Torna a enviar l\'email de verificació...',
    'Open in Community Site':
        'Obre en el Web Social',
    'Resend verification email':
        'Reenviament del mail',
    'User name:':
        'Nom d\'usuari:',
    'Camera not supported':
        'Webcam no disponible',
	'Please make sure your web browser is up to date\nand your camera is properly configured. \n\nSome browsers also require you to access Snap!\nthrough HTTPS to use the camera.\n\nPlase replace the "http://" part of the address\nin your browser by "https://" and try again.':
        'Comproveu que el navegador està actualitzat\ni la webcam ben configurada. \n\nAlguns navegadors també requereixen\nHTTPS per a utilitzar la càmera.\n\nPodeu provar canviant a l\'adreça el "http://"\nper "https://".',
    'Uploading ':
        'Pujant ',
    'Repeat Password:':
        'Repeteix la contrasenya:',
    '%asp at %loc' :
        '%asp en %loc' ,
    'sprites':
        'objectes',
//Cloud messages
    'Unverified account: ':
        'Compte no verificat: ',
    ' days left':
        ' dies de termini',
    'You are now logged in, and your account\nis enabled for three days.\n':
        'Ara esteu validats, però el vostre compte\nés només vàlid per 3 dies.\n',
    'Please use the verification link that\nwas sent to your email address when you\nsigned up.\n\n':
        'Cal usar l\'enllaç de verificació que\ns\'ha enviat al vostre correu quan\nvau registrar l\'usuari',
    'If you cannot find that email, please\ncheck your spam folder.':
        'Si no l\'heu rebut,\ncomproveu primer el correu brossa.',
    'If you still\ncannot find it, please use the "Resend\nVerification Email..." option in the cloud\nmenu.\n\n':
        'I si no\npodeu trobar-ho, utilitzeu l\'opció de "Torna a enviar\nl\'email de verificació" a les opcions del Núvol\ndel menú d\'Snap!\n\n',
    'You have ':
        'Teniu ',
    ' days left.':
        ' dies de termini.',
//micròfon
    'microphone %audio':
        '%audio del micròfon',
    'volume':
        'volum',
    'note':
        'nota',
    'pitch':
        'to',
    'signals':
        'senyals',
    'frequencies':
        'freqüències',
    'bins':
        'resolució',
    'Microphone resolution...':
        'Resolució del micròfon...',
    'low':
        'baixa',
    'normal':
        'normal',
    'high':
        'alta',
    'max':
        'màxima',
//
    'play %n Hz for %n secs':
        'toca %n Hz durant %n segons',
//
    'translations...':
         'traduccions...',
    'width':
        'amplada',
    'height':
        'alçada',
    'pixel':
        'píxel',
    'pixels':
        'píxels',
    'current':
        'actual',
    'duration':
        'durada',
    'length':
        'longitud',
    'number of channels':
        'número de canals',
    'sample rate':
        'freqüència de mostreig',
    'samples':
        'mostres',
    'change volume by %n':
        'augmenta el volum en %n',
    'set volume to %n %':
        'fixa el volum a %n %',
    'change balance by %n':
        'augmenta el balanç en %n',
    'set balance to %n':
        'fixa el balanç a %n',
    'balance':
        'balanç',
    'play frequency %n Hz':
        'toca la freqüència %n Hz',
    'stop frequency':
        'atura la freqüència',
    'pen %pen':
        '%pen del llapis',
    'write %s size %n':
        'escriu %s de mida %n',
    'draggable?':
        'arrossegable?',
    'frequency':
        'freqüència',
    'spectrum':
        'espectre',
    'resolution':
        'resolució',
    'neg':
        'oposat',
    '__shout__go__':
        'bandera verda premuda',
    'download script':
        'descarrega el programa',
    'pen vectors':
        'vectors dibuixats',
    'Log pen vectors':
        'Enregistra els dibuixos com a vectors',
    'log pen vectors':
        'enregistra els dibuixos com a vectors',
    'uncheck to turn off\nlogging pen vectors':
        'desmarqueu per aturar l\'enregistrament\ndels dibuixos com a vectors',
    'check to turn on\nlogging pen vectors':
        'marqueu per iniciar l\'enregistrament\ndels dibuixos com a vectors',
    'there are currently no\nvectorizable pen trail segments':
        'no hi ha cap vector dibuixat enregistrat',
    'svg...':
        'exporta vectors com a svg',
    'export pen trails\nline segments as SVG':
        'exporta els vectors dibuixats com a fitxer SVG',
    'blockify':
        'en forma de blocs',
    'Hyper blocks support':
        'Suport a hiperblocs',
    'uncheck to disable\nusing operators on lists and tables':
         'desmarqueu per deshabilitar\nla utilització dels operadors\nsobre llistes i taules',
    'check to enable\nusing operators on lists and tables':
         'marqueu per habilitar\nla utilització dels operadors\nsobre llistes i taules',
//
    'senders...':
        'emissors...',
    'receivers...':
        'receptors...'

};
