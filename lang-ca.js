/*

    lang-ca.js

    Catalan translation for SNAP!

    written by Jens Mönig

    Copyright (C) 2013 by Jens Mönig

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
        'Bernat Romagosa Carrasquer', // your name for the Translators tab
    'translator_e-mail':
        'tibabenfortlapalanca@gmail.com', // optional
    'last_changed':
        '2013-11-26', // this, too, will appear in the Translators tab

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
    'Sounds':
        'Sons',

    // names:
    'Sprite':
        'Objecte',
    'Stage':
        'Escenari',

    // rotation styles:
    'don\'t rotate':
        'no girar',
    'can rotate':
        'pot girar',
    'only face left/right':
        'només mirar esquerra/dreta',

    // new sprite button:
    'add a new sprite':
        'afegir un nou objecte',

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
        'Escenari seleccionat:\nno hi ha primitives de moviment\n'
            + 'disponibles',

    'move %n steps':
        'moure %n passos',
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
    'play note %n for %n beats':
        'toca la nota %n durant %n temps',
    'change tempo by %n':
        'augmenta el tempo en %n',
    'set tempo to %n bpm':
        'fixa el tempo a %n',
    'tempo':
        'tempo',

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

    // control:
    'when %greenflag clicked':
        'Quan la %greenflag es premi',
    'when %keyHat key pressed':
        'Quan la tecla %keyHat es premi',
    'when I am clicked':
        'Quan es cliqui aquest personatge',
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
    'stop block':
        'atura el bloc',
    'stop script':
        'atura aquest programa',
    'stop all %stop':
        'atura-ho tot %stop',
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
    'myself':
        'mi mateix',
    'delete this clone':
        'esborra aquest clon',


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
        'Valor Unicode de %s',
    'unicode %n as letter':
        'Lletra amb valor Unicode %n',
    'is %s a %typ ?':
        'És %s un %typ ?',
    'is %s identical to %s ?':
        'És %s idèntic a %s ?',

    'type of %s':
        'tipus de %s',

    // variables:
    'Make a variable':
        'Crear una variable',
    'Variable name':
        'Nom de variable',
    'Script variable name':
        'Nom de la variable de programa',
    'Delete a variable':
        'Esborrar una variable',

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
        '%s afegir davant de %l',
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
        'Descarregar codi font',
    'Switch back to user mode':
        'Tornar a mode d\'usuari',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'canviar menús contextuals\nprimitius de Morphic\nper menús més amigables',
    'Switch to dev mode':
        'Canviar a mode desenvolupador',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'habilitar menús\ncontextuals de\nMorphic i inspectors,\nmode expert!',

    // project menu
    'Project notes...':
        'Notes del projecte...',
    'New':
        'Nou',
    'Open...':
        'Obrir...',
    'Save':
        'Desar',
    'Save As...':
        'Desar com...',
    'Import...':
        'Importar...',
    'file menu import hint':
        'pistes del menú d\'importació',
    'Export project as plain text...':
        'Exportar projecte en text pla...',
    'Export project...':
        'Exportar projecte...',
    'show project data as XML\nin a new browser window':
        'mostrar tot el projecte en format XML\nen una altra finestra del navegador',
    'Export blocks...':
        'Exportar blocs...',
    'show global custom block definitions as XML\nin a new browser window':
        'mostrar definicions de blocs personalitzats\nen format XML en una altra finestra del\nnavegador',
    'Import tools':
        'Importar eines',
    'load the official library of\npowerful blocks':
        'carregar la llibreria\noficial de blocs avançats',
    'Libraries...':
        'Llibreries...',
    'Import library':
        'Importar llibreria',

    // cloud menu
    'Login...':
        'Iniciar sessió...',
    'Signup...':
        'Registrar-se...',

    // settings menu
    'Language...':
        'Idioma...',
    'Zoom blocks...':
        'Mida dels blocs...',
    'Blurred shadows':
        'Ombres suavitzades',
    'uncheck to use solid drop\nshadows and highlights':
        'desmarca\'m per utilitzar\nombres i realçats sòlids',
    'check to use blurred drop\nshadows and highlights':
        'marca\'m per utilitzar\nombres i realçats suavitzats',
    'Zebra coloring':
        'Coloració en zebra',
    'check to enable alternating\ncolors for nested blocks':
        'marca\'m per habilitar la coloració\nalternada per a blocs imbricats',
    'uncheck to disable alternating\ncolors for nested block':
        'desmarca\'m per deshabilitar la coloració\nalternada per a blocs imbricats',
    'Dynamic input labels':
        'Etiquetes d\'entrada dinàmiques',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'desmarca\'m per inhabilitar les\netiquetes dinàmiques d\'entrada de variables',
    'check to enable dynamic\nlabels for variadic inputs':
        'marca\'m per habilitar les\netiquetes dinàmiques d\'entrada de variables',
    'Prefer empty slot drops':
        'Dóna preferència a les ranures buides',
    'settings menu prefer empty slots hint':
        'marca\'m per a fer que les ranures\nbuides tinguin preferència sobre les plenes\na l\'hora de deixar-hi caure peces',
    'uncheck to allow dropped\nreporters to kick out others':
        'marca\'m per a fer que les ranures\nbuides tinguin la mateixa preferència que les\nplenes a l\'hora de deixar-hi caure peces',
    'Long form input dialog':
        'Forçar diàleg de selecció de tipus',
	'Plain prototype labels':
        'Etiquetes de prototip simples',
    'uncheck to always show (+) symbols\nin block prototype labels':
        'desmarca\'m per mostrar sempre el\nsímbol (+) en les etiquetes de prototip\nde bloc (a l\'editor de blocs)',
    'check to hide (+) symbols\nin block prototype labels':
        'desmarca\'m per amagar el símbol (+)\nen les etiquetes de prototip\nde bloc (a l\'editor de blocs)',
    'check to always show slot\ntypes in the input dialog':
        'marca\'m per a mostrar sempre\nel diàleg de selecció de tipus\nen afegir paràmetres als blocs\npersonalitzats',
    'uncheck to use the input\ndialog in short form':
        'desmarca\'m per a no mostrar\nautomàticament el diàleg de selecció\nde tipus en afegir paràmetres\nals blocs personalitzats',
    'Virtual keyboard':
        'Teclat virtual',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'desmarca\'m per inhabilitar\nel suport per al teclat virtual\nen dispositius mòbils',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'marca\'m per habilitar\nel suport per al teclat virtual\nen dispositius mòbils',
    'Input sliders':
        'Lliscadors d\'entrada',
    'uncheck to disable\ninput sliders for\nentry fields':
        'desmarca\'m per deshabilitar\nels lliscadors per als camps\nd\'entrada',
    'check to enable\ninput sliders for\nentry fields':
        'marca\'m per habilitar\nels lliscadors per als camps\nd\'entrada',
    'Clicking sound':
        'So de clic',
    'uncheck to turn\nblock clicking\nsound off':
        'desmarca\'m per deshabilitar\nel so de clic en clicar sobre\nels blocs',
    'check to turn\nblock clicking\nsound on':
        'marca\'m per habilitar\nel so de clic en clicar sobre\nels blocs',
    'Animations':
        'Animacions',
    'uncheck to disable\nIDE animations':
        'desmarca\'m per deshabilitar\nles animacions de la interfície',
    'Turbo mode':
        'Mode turbo',
    'check to prioritize\nscript execution':
        'marca\'m per activar el mode de\nprioritat en l\'execució de programes',
    'uncheck to run scripts\nat normal speed':
        'desmarca\'m per executar\nels programes a la velocitat\nnormal',
    'check to enable\nIDE animations':
        'marca\'m per habilitar\nles animacions de la interfície',
    'Thread safe scripts':
        'Fil d\'execució segur',
    'uncheck to allow\nscript reentrancy':
        'desmarca\'m per permetre\nla re-entrada als programes',
    'check to disallow\nscript reentrancy':
        'marca\'m per no permetre\nla re-entrada als programes',
    'Prefer smooth animations':
        'Suavitza les animacions',
    'uncheck for greater speed\nat variable frame rates':
        'desmarca\'m per augmentar la velocitat de\nles animacions fins la màxima capacitat d\'aquesta màquina',
    'check for smooth, predictable\nanimations across computers':
        'marca\'m per aconseguir unes animacions\nmés suaus i a velocitat predible en màquines diferents',

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
    'hide primitives':
        'amaga blocs primitius',
    'show primitives':
        'mostra blocs primitius',

    // blocks:
    'help...':
        'ajuda...',
    'relabel...':
        'canvia\'m el nom...',
    'duplicate':
        'duplica\'m',
    'make a copy\nand pick it up':
        'crea una còpia\ni agafa-la',
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

    // custom blocks:
    'delete block definition...':
        'esborra la definició d\'aquest bloc',
    'edit...':
        'edita...',

    // sprites:
    'edit':
        'editar',
    'detach from':
        'desenganxa de',
    'detach all parts':
        'desenganxa totes les parts',
    'export...':
        'exportar...',

    // stage:
    'show all':
        'mostrar-los tots',
    'pic...':
        'exportar com a imatge...',
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
        'recupera bloc',
    'undo the last\nblock drop\nin this pane':
        'recupera l\'últim bloc\nque s\'hagi llençat',
    'scripts pic...':
        'exportar com a imatge...',
    'open a new window\nwith a picture of all scripts':
        'obre una nova finestra\namb una foto d\'aquests programes',
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
        'fes',
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
    'Open Project':
        'Obre projecte',
    '(empty)':
        '(buit)',
    'Saved!':
        'Desat!',
    'Delete Project':
        'Esborra projecte',
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
			'Anomena i desa projecte...',

    // export blocks
    'Export blocks':
        'Exporta blocs',
    'Import blocks':
        'Importa blocs',
    'this project doesn\'t have any\ncustom global blocks yet':
        'aquest projecte encara no\nté cap bloc personalitzat',
    'select':
        'seleccionar',
    'all':
        'tots els blocs',
    'none':
        'cap bloc',

    // variable dialog
    'for all sprites':
        'per a tots els objectes',
    'for this sprite only':
        'només per a aquest objecte',

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
    'Apply':
        'Aplica',

    // block deletion dialog
    'Delete Custom Block':
        'Esborrar un bloc personalitzat',
    'block deletion dialog text':
        'Segur que vols esborrar la definició\nd\'aquest bloc?',

    // input dialog
    'Create input name':
        'Crear ranura',
    'Edit input name':
        'Editar ranura',
    'Edit label fragment':
        'Editar fragment d\'etiqueta',
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
        'Qualsevol\n(sense evaluar)',
    'Boolean\n(unevaluated)':
        'Booleà\n(sense evaluar)',
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
        'Enrera...',
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
        'versions del mòdul actual',
    'Contributors':
        'Contribuïdors',
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
        'afegir un comentari aquí...',

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
        'rastre del llapis',

    // costumes
    'Turtle':
        'Tortuga',
    'Empty':
        'Buit',

    // graphical effects
    'ghost':
        'fantasma',

    // keys
    'space':
        'espai',
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
        'abs',
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

    // delimiters
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
        'reporter',
    'predicate':
        'predicat',

    // list indices
    'last':
        'últim',
    'any':
        'qualsevol'
};
