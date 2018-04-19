/*

    lang-ca.js

    Catalan translation for SNAP!

    written by Jens Mönig

    Copyright (C) 2016 by Jens Mönig

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
        '2017-11-15', // this, too, will appear in the Translators tab

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
    'change %eff effect by %n':
        'augmenta l\'efecte %eff en %n',
    'set %eff effect to %n':
        'fixa l\'efecte %eff a %n',
    'clear graphic effects':
        'treu els efectes gràfics',
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
    'go to front':
        'vés al front',
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
    'set pen color to %clr':
        'fixa el color del llapis a %clr',
    'change pen color by %n':
        'augmenta en %n el color del llapis',
    'set pen color to %n':
        'fixa el color del llapis a %n',
    'change pen shade by %n':
        'augmenta en %n la intensitat del llapis',
    'set pen shade to %n':
        'fixa la intensitat del llapis a %n',
    'change pen size by %n':
        'augmenta en %n la mida del llapis',
    'set pen size to %n':
        'fixa la mida del llapis en %n',
    'stamp':
        'estampa',
    'fill':
        'omple',

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
    'forever %c':
        'per sempre %c',
    'repeat %n %c':
        'repeteix %n vegades %c',
    'repeat until %b %c':
        'repeteix fins %b %c',
    'if %b %c':
        'si %b llavors %c',
    'if %b %c else %c':
        'si %b llavors %c si no %c',
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

    'filtered for %clr':
        'filtrat per a %clr',
    'stack size':
        'mida de la pila',
    'frames':
        'frames',

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
        'unir %words',
    'split %s by %delim':
        'divideix %s per %delim',
    'hello':
        'hola',
    'world':
        'món',
    'letter %n of %s':
        'lletra %n de %s',
    'length of %s':
        'longitud de %s',
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

    // lists:
    'list %exp':
        'llista %exp',
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
    'show global custom block definitions as XML\nin a new browser window':
        'exporta els blocs personalitzats que triis\nen un arxiu en format XML',
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
    'open a new browser browser window\n with a summary of this project':
        'Obre una finestra del navegador\namb un resum d\'aquest projecte',

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
    'Import tools':
        'Importa eines',
    'load the official library of\npowerful blocks':
        'Carrega la llibreria\noficial de blocs avançats',
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
        'Línies del llapis rectes',
    'check for flat ends of lines':
        'marqueu per fer que els\nextrems de les línies del\nllapis siguin rectes',
    'uncheck for round ends of lines':
        'desmarqueu per fer que\nels extrems de les línies\ndel llapis siguin arrodonides',
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
    'open a new window\nwith a picture of this script':
        'obre una nova finestra\namb una imatge d\'aquest programa',
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
    'open a new window\nwith a picture of the stage':
        'obre una nova finestra\namb una foto de l\'escenari',

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
    'open a new window\nwith a picture of all scripts':
        'obre una nova finestra\namb la imatge d\'aquests programes',
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

    // Project Manager
    'Untitled':
        'Sense títol',
    'Open un Project':
        'Obre projecte',
    '(empty)':
        '(buit)',
    'Saved!':
        'Desat!',
    'Delete Project':
        'Esborra un projecte',
    'Are you sure you want to delete':
        'Segur que vols esborrar',
    'rename...':
        'canvia el nom...',

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
        'Segur que vols esborrar la definició\nd\'aquest bloc?',


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
    'children':
        'fill',
    'clones':
        'clons',
    'other clones':
        'altres clons',
    'dangling?':
        'penjat?',
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
        'desconnectats.',
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
    'open a new window\nwith a picture of this comment':
        'obre una finestra\namb una imatge del comentari',
    'undo':
        'desfés',
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
    'Stroked Rectangle\n(shift: square)':
        'Rectangle traçat\n(majúscula: quadrat)',
    'Filled Rectangle\n(shift: square)':
        'Rectangle ple\n(majúscula: quadrat)',
    'Stroked Ellipse\n(shift: circle)':
        'El·lipse traçada\n(majúscula: circumferència)',
    'Filled Ellipse\n(shift: circle)':
        'El·lipse plena\n(majúscula: cercle)',
    'Fill a region':
        'Ompla l\'àrea',
    'Set the rotation center':
        'Estableix el centre de rotació',
    'Pipette tool\n(pick a color anywhere)':
        'Capturador de color\n(captura el color de qualsevol lloc)',
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
    'Are you sure you want to publish':
        'Segur que vols compartir-ho?',
    'Are you sure you want to unpublish':
        'Segur que vols deixar-ho de compartir?',
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
    'password has been changed.':
        's\'ha canviat la contrasenya.',
    'SVG costumes are\nnot yet fully supported\nin every browser':
        'els vestits SVG encara\no són suportats\per tots els navegadors',
    'Save Project':
        'Desa el Projecte',
    'script pic with result...':
        'imatge del programa i del resultat…',
    'open a new window\nwith a picture of both\nthis script and its result':
        'obre una finestra\n amb el programa i el resultat',
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
    'open a new browser browser window\nwith a summary of this project\nwith drop-shadows on all pictures.\nnot supported by all browsers':
        'Obre una finestra del navegador\namb un resum del projecte i\namb totes les imatges ombrejades.\n No tots els navegadors suporten aquesta funcionalitat',
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
        'Vista de tabla',
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
	'map %repRing over %l':
		'mapeja %repRing sobre %l',
	'for %upvar in %l %cl':
		'per cada %upvar dins %l %cl',
	'show table %l':
		'mostra la taula %l',
	'%txtfun of %s':
		'%txtfun de %s',

//IDE Messages
	'entering development mode.\n\nerror catching is turned off,\nuse the browser\'s web console\nto see error messages.':
		'entrant en mode desenvolupador.\n\ndeshabilitada la captura d\'errades,\nutilitzeu la consola del navegador\nper veure els errors.',
	'entering user mode':
		'entrant en mode d\'usuari',
	'dragging threshold':
		'llindar per l\'arrossegament',
	'redo the last undone block drop in this pane':
		'refés l\'últim moviment\nde blocs desfet',

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
	'List utilities':
		'Utilitats per a llistes',
	'Streams (lazy lists)':
		'Streams (llistes presconstruides)',
	'Variadic reporters':
		'Càlculs multientrada',
	'Web services access (https)':
		'Accés a serveis Web (https)',
	'Words, sentences':
		'Paraules i frases',
	'Multi-branched conditional (switch)':
		'Condicionals compostos (switch)',
	'LEAP Motion controller':
		'Controladors per a LEAP Motion',
	'Set RGB or HSV pen color':
		'Acoloriment del llapis per RGB o HSV',
	'Save and restore pictures drawn by pen':
		'Gestió de les captures d\'imatges dibuixades',
	'Catch errors in a script':
		'Alternatives per les errades dels programes',
	'Allow multi-line text input to a block':
		'Entrades multilínia',
//
	'(no matches)':
		'(cap resultat)',
    'take a camera snapshot and\nimport it as a new sprite':
        'pren una imatge amb la càmera\ni importa-la com un nou vestit',
    'Import a new costume from your webcam':
        'Importa un nou vestit amb la webcam'
};
