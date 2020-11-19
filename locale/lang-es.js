/*

    lang-es.js

    Spanish translation for SNAP!

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

SnapTranslator.dict.es = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    Ä, ä   \u00c4, \u00e4
    Ö, ö   \u00d6, \u00f6
    Ü, ü   \u00dc, \u00fc
    ß      \u00df
*/

    // translations meta information
    'language_name':
        'Espa\u00F1ol', // the name as it should appear in the language menu
    'language_translator':
        'V\u00EDctor Manuel Muratalla Morales / Cristi\u00E1n Rizzi Iribarren / Alfonso Ruzafa', // your name for the Translators tab
    'translator_e-mail':
        'victor.muratalla@yahoo.com / rizzi.cristian@gmail.com', // optional
    'last_changed':
        '2020-11-19', // this, too, will appear in the Translators tab

    // GUI
    // control bar:
    'untitled':
        'Sin t\u00EDtulo',
    'development mode':
        'modo desarrollador',

    // categories:
    'Motion':
        'Movimiento',
    'Looks':
        'Apariencia',
    'Sound':
        'Sonido',
    'Pen':
        'L\u00E1piz',
    'Control':
        'Control',
    'Sensing':
        'Sensores',
    'Operators':
        'Operadores',
    'Variables':
        'Variables',
    'Lists':
        'Listas',
    'Other':
        'Otros',

    // editor:
    'don\'t rotate':
        'no girar',
    'can rotate':
        'puede girar',
    'only face left/right':
        's\u00F3lo mirar a izquierda y derecha',
    'draggable':
        'arrastrable',

    // tabs:
    'Scripts':
        'Programas',
    'Backgrounds':
        'Fondos de escenario',
    'Costumes':
        'Disfraces',
    'Sounds':
        'Sonidos',

    // names:
    'Sprite':
        'Objeto',
    'Stage':
        'Escenario',
    'Turtle':
        'Tortuga',

    // stage tab:
    'Empty':
        'Vac\u00EDo',

    // costumes tab:
    'Paint a new costume':
        'dibujar un nuevo disfraz',
    'Import a new costume from your webcam':
        'importar un nuevo disfraz desde la c\u00E1mara',
    'costumes tab help':
        'Puedes importar un disfraz de otro sitio web\no desde tu ordenador arrastr\u00E1ndolo hasta aqu\u00ED',

    // paint editor dialog:
    'Paint Editor':
        'Editor gr\u00E1fico',
    'undo':
        'deshacer',
    'Paintbrush tool\n(free draw)':
        'pincel\n(dibujo libre)',
    'Stroked Rectangle\n(shift: square)':
        'rect\u00E1ngulo\n(\u21E7 = cuadrado)',
    'Stroked Ellipse\n(shift: circle)':
        'elipse\n(\u21E7 = c\u00EDrculo)',
    'Eraser tool':
        'goma de borrar',
    'Set the rotation center':
        'establecer\ncentro de rotaci\u00F3n',
    'Line tool\n(shift: vertical/horizontal)':
        'l\u00EDnea\n(\u21E7 = vertical/horizontal)',
    'Filled Rectangle\n(shift: square)':
        'rect\u00E1ngulo relleno\n(\u21E7 = cuadrado)',
    'Filled Ellipse\n(shift: circle)':
        'elipse rellena\n(\u21E7 = c\u00EDrculo)',
    'Fill a region':
        'bote de pintura',
    'Pipette tool\n(pick a color anywhere)':
        'cuentagotas\n(funciona dentro y fuera del editor)',
    'grow':
        'ampliar',
    'shrink':
        'reducir',
    'flip \u2194':
        'voltear \u2194',
    'flip \u2195':
        'voltear \u2195',
    'Brush size':
        'Tama\u00F1o de pincel',
    'Constrain proportions of shapes?\n(you can also hold shift)':
        'Figuras proporcionales\n(o mant\u00E9n pulsado \u21E7)',

    // camera dialog:
    'Camera':
        'C\u00E1mara',
    'Camera not supported':
        'C\u00E1mara no soportada',
    'Please make sure your web browser is up to date\nand your camera is properly configured. \n\nSome browsers also require you to access Snap!\nthrough HTTPS to use the camera.\n\nPlase replace the "http://" part of the address\nin your browser by "https://" and try again.':
        'Por favor, comprueba que tu navegador est\u00E9 actualizado\ny tu c\u00E1mara configurada correctamente.\n\nAlgunos navegadores necesitan que accedas a Snap!\na trav\u00E9s de HTTPS para usar la c\u00E1mara.\n\nPor favor, reemplaza el "http://" en la barra de direcciones\nde tu navegador por "https://" y vuelve a intentarlo.',
    'camera':
        'c\u00E1mara',

    // sound tab:
    'Record a new sound':
        'grabar un nuevo sonido',
    'import a sound from your computer\nby dragging it into here':
        'Puedes importar un sonido desde tu ordenador\narrastr\u00E1ndolo hasta aqu\u00ED',

    // sound recorder dialog:
    'Sound Recorder':
        'Grabador de sonidos',

    // stage & sprite corral:
    'add a new Turtle sprite':
        'a\u00F1ade una nueva tortuga',
    'paint a new sprite':
        'dibuja un nuevo objeto',
    'take a camera snapshot and\nimport it as a new sprite':
        'hace una captura de c\u00E1mara\n y la importa como nuevo objeto',

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

    // shared messages:
    'development mode \ndebugging primitives:':
        'primitivas de depuraci\u00F3n\ndel modo desarrollador:',
    'find blocks':
        'busca bloques',
    'show primitives':
        'mostrar primitivas',
    'hide primitives':
        'ocultar primitivas',

    // motion:
    'Stage selected:\nno motion primitives':
        'Escenario seleccionado:\nno hay primitivas de movimiento\ndisponibles',

    'move %n steps':
        'mover %n pasos',
    'turn %clockwise %n degrees':
        'girar %clockwise %n grados',
    'turn %counterclockwise %n degrees':
        'girar %counterclockwise %n grados',
    'point in direction %dir':
        'apuntar en direcci\u00F3n %dir',
    'point towards %dst':
        'apuntar hacia %dst',
    'go to x: %n y: %n':
        'ir a x: %n y: %n',
    'go to %dst':
        'ir a %dst',
    'glide %n secs to x: %n y: %n':
        'deslizar en %n segs a x: %n y: %n',
    'change x by %n':
        'cambiar x en %n',
    'set x to %n':
        'fijar x a %n',
    'change y by %n':
        'cambiar y en %n',
    'set y to %n':
        'fijar y a %n',
    'if on edge, bounce':
        'rebotar si toca un borde',
    'x position':
        'posici\u00F3n x',
    'y position':
        'posici\u00F3n y',
    // already defined
    // 'direction':
    //    'direcci\u00F3n',

    // %dir values for (point in direction %dir):
    '(90) right':
        '(90) derecha',
    '(-90) left':
        '(-90) izquierda',
    '(0) up':
        '(0) arriba',
    '(180) down':
        '(180) abajo',

    // looks:
    'switch to costume %cst':
        'cambiar al disfraz %cst',
    'next costume':
        'siguiente disfraz',
    'costume #':
        '# de disfraz',
    'costume name':
        'nombre del disfraz',
    'say %s for %n secs':
        'decir %s por %n segs',
    'say %s':
        'decir %s',
    'think %s for %n secs':
        'pensar %s por %n segs',
    'think %s':
        'pensar %s',
    'change %eff effect by %n':
        'cambiar efecto %eff en %n',
    'set %eff effect to %n':
        'fijar efecto %eff a %n',
    'clear graphic effects':
        'quitar efectos gr\u00E1ficos',
    'change size by %n':
        'cambiar tama\u00F1o en %n',
    'set size to %n %':
        'fijar tama\u00F1o a %n %',
    'size':
        'tama\u00F1o',
    'show':
        'mostrar',
    'hide':
        'esconder',
    'go to front':
        'enviar al frente',
    'go back %n layers':
        'enviar %n capas hacia atr\u00E1s',

    // looks' development mode primitives:
    'wardrobe': // objects.js:401
        'guardarropa',
    'console log %mult%s':
        'registrar en consola %mult%s',
    'alert %mult%s':
        'mostrar mensaje %mult%s',
    'save %imgsource as costume named %s':
        'guardar %imgsource en disfraz %s',

    // default values for (say %s):
    'Hello!':
        '\u00A1Hola!',
    'Hello, World!':
        '\u00A1Hola, Mundo!',

    // default values for (think %s):
    'Hmm...':
        'Mmm...',

    // %eff values for (change %eff effect by %n):
    'color':
        'color',
    'fisheye':
        'ojo de pez',
    'whirl':
        'remolino',
    'pixelate':
        'pixelado',
    'mosaic':
        'mosaico',
    'duplicate':
        'duplicar',
    'negative':
        'negativo',
    'comic':
        'historieta',
    'confetti':
        'confeti',
    'saturation':
        'saturaci\u00F3n',
    'brightness':
        'brillo',
    'transparency':
        'transparencia',
    'ghost':
        'fantasma',

    // %imgsource values for (save %imgsource as costume named %s):
    'pen trails':
        'rastro del l\u00E1piz',
    'stage image':
        'imagen del escenario',

    // sound:
    'play sound %snd':
        'reproducir sonido %snd',
    'play sound %snd until done':
        'reproducir sonido %snd y esperar',
    'stop all sounds':
        'detener todos los sonidos',
    'rest for %n beats':
        'silencio por %n pulsos',
    'play note %note for %n beats':
        'tocar nota %note por %n pulsos',
    'set instrument to %inst':
        'fijar instrumento a %inst',
    'change tempo by %n':
        'cambiar tempo en %n',
    'set tempo to %n bpm':
        'fijar tempo a %n',
    'tempo':
        'tempo',

    // sound development mode blocks
    'jukebox': // objects.js:474
        'gramola',

    // %note values for (play note %note for %n beats):
    // Notes can be translated indeed but do it would break the piano layout
    // example:
    // 'Eb (63)':
    //    '(63) Mi♭',

    // %inst values for (set instrument to %inst):
    '(1) sine':
        '(1) \u223F\u223F (onda sinusoidal)',
    '(2) square':
        '(2) \u238D\u238D (onda cuadrada)',
    '(3) sawtooth':
        '(3) \u2A58\u2A58 (onda dentada)',
    '(4) triangle':
        '(4) \u22C0\u22C0 (onda triangular)',

    // pen:
    'clear':
        'borrar',
    'pen down':
        'bajar l\u00E1piz',
    'pen up':
        'subir l\u00E1piz',
    'set pen color to %clr':
        'fijar color de l\u00E1piz a %clr',
    'change pen color by %n':
        'cambiar color de l\u00E1piz en %n',
    'set pen color to %n':
        'fijar color de l\u00E1piz a %n',
    'change pen shade by %n':
        'cambiar brillo de l\u00E1piz en %n',
    'set pen shade to %n':
        'fijar brillo de l\u00E1piz a %n',
    'change pen size by %n':
        'cambiar tama\u00F1o de l\u00E1piz en %n',
    'set pen size to %n':
        'fijar tama\u00F1o de l\u00E1piz a %n',
    'stamp':
        'sellar',
    'fill':
        'llenar',
    // already defined
    // 'pen trails':
    //    'rastro del l\u00E1piz',

    // control:
    'when %greenflag clicked':
        'cuando se pulse %greenflag',
    'when %keyHat key pressed':
        'cuando se pulse la tecla %keyHat',
    'when I am %interaction':
        'cuando me %interaction',
    'when %b':
        'cuando %b',
    'when I receive %msgHat':
        'cuando me llegue %msgHat',
    'broadcast %msg':
        'enviar mensaje %msg',
    'broadcast %msg and wait':
        'enviar mensaje %msg y esperar',
    'message':
        'mensaje',
    'warp %c':
        'instrucci\u00F3n at\u00F3mica %c',
    'wait %n secs':
        'esperar %n segs',
    'wait until %b':
        'esperar hasta que %b',
    'forever %loop':
        'por siempre %loop',
    'repeat %n %loop':
        'repetir %n %loop',
    'repeat until %b %loop':
        'repetir hasta que %b %loop',
    'for %upvar = %n to %n %cla':
        'para %upvar = %n hasta %n %cla',
    'if %b %c':
        'si %b %c',
    'if %b %c else %c':
        'si %b %c sino %c',
    'if %b then %s else %s':
        'si %b entonces %s sino %s',
    'report %s':
        'reportar %s',
    'stop %stopChoices':
        'detener %stopChoices',

    'run %cmdRing %inputs':
        'ejecutar %cmdRing %inputs',
    'launch %cmdRing %inputs':
        'iniciar %cmdRing %inputs',
    'call %repRing %inputs':
        'llamar %repRing %inputs',
    'tell %spr to %cmdRing %inputs':
        'decir a %spr que %cmdRing %inputs',
    'ask %spr for %repRing %inputs':
        'preguntar a %spr por %repRing %inputs',
    'run %cmdRing w/continuation':
        'ejecutar %cmdRing con continuaci\u00F3n',
    'call %cmdRing w/continuation':
        'llamar %cmdRing con continuaci\u00F3n',
    'with inputs':
        'con argumentos',
    'input names:':
        'par\u00E1metros:',
    'Input Names:':
        'Nombres de entradas:',
    'input list:':
        'con lista de argumentos:',

    'when I start as a clone':
        'cuando comience como clon',
    'create a clone of %cln':
        'crear clon de %cln',
    'a new clone of %cln':
        'un nuevo clon de %cln',
    'delete this clone':
        'eliminar este clon',
    'pause all %pause':
        'pausar todos %pause',

    // %keyHat values for (when %keyHat key pressed):
    'space':
        'espacio',
    'up arrow':
        '↑ (flecha arriba)',
    'down arrow':
        '↓ (flecha abajo)',
    'right arrow':
        '→ (flecha derecha)',
    'left arrow':
        '← (flecha izquierda)',
    'any key':
        'cualquier tecla',
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

    // %interaction values for (when I am %interaction):
    // In spanish read as "cuando me %interaction"
    'clicked':
        'hagan clic',
    'pressed':
        'pulsen',
    'dropped':
        'arrastren y me suelten',
    'mouse-entered':
        'toquen con el rat\u00F3n',
    'mouse-departed':
        'dejen de tocar con el rat\u00F3n',
    'scrolled-up':
        'giren la rueda del rat\u00F3n hacia abajo',
    'scrolled-down':
        'giren la rueda del rat\u00F3n hacia arriba',

    // "any message" for (when I receive %msgHat):
    'any message':
        'cualquier mensaje',

    // "new..." for (broadcast %msg):
    'new...':
        'nuevo mensaje...',

    // %stopChoices values for (stop %stopChoices):
    'all':
        'todos',
    'this script':
        'este programa',
    'this block':
        'este bloque',
    'all but this script':
        'todos los programas excepto este',
    'other scripts in sprite':
        'el resto de programas del objeto',

    // "myself" for (create a clone of %cln)
    'myself':
        'm\u00ED mismo',

    // New message name dialog:
    'Message name':
        'Nombre de mensaje',

    // sensing:
    'touching %col ?':
        '\u00BFtocando %col ?',
    'touching %clr ?':
        '\u00BFtocando el color %clr ?',
    'color %clr is touching %clr ?':
        '\u00BFcolor %clr tocando %clr ?',
    'ask %s and wait':
        'preguntar %s y esperar',
    'answer':
        'respuesta',
    'mouse x':
        'rat\u00F3n x',
    'mouse y':
        'rat\u00F3n y',
    'mouse down?':
        '\u00BFrat\u00F3n pulsado?',
    'key %key pressed?':
        '\u00BFtecla %key pulsada?',
    '%rel to %dst':
        '%rel a %dst',
    'reset timer':
        'reiniciar cron\u00F3metro',
    'timer':
        'cron\u00F3metro',
    '%att of %spr':
        '%att de %spr',
    'my %get':
        'mi(s) %get',
    'url %s':
        'url %s',
    'turbo mode?':
        '\u00BFmodo turbo?',
    'set turbo mode to %b':
         'fijar modo turbo a %b',
    'current %dates':
         '%dates actual',

    // sensing's development mode primitives:
    'processes':
        'procesos',
    'filtered for %clr':
        'filtrado por %clr',
    'stack size':
        'tama\u00F1o de pila',
    'frames':
        'cuadros',

    // %col values for (touching %col ?):
    'mouse-pointer':
        'puntero del rat\u00F3n',
    'edge':
        'borde del escenario',
    // already defined
    // 'pen trails':
    //    'rastro del l\u00E1piz',

    // default value for (ask %s and wait):
    'what\'s your name?':
        '\u00BFCu\u00E1l es tu nombre?',

    // %rel values for (%rel to %dst):
    'distance':
        'distancia',
    // already defined
    'direction':
        'direcci\u00F3n',

    // %get values for (my %get):
    'neighbors':
        'vecinos',
    'self':
        'mismo',
    'other sprites':
        'otros objetos',
    'clones':
        'clones',
    'other clones':
        'otros clones',
    'parts':
        'partes',
    'anchor':
        'anclaje',
    'stage':
        'escenario',
    'children':
        'hijos',
    'parent':
        'padre',
    'temporary?':
        '\u00BFsoy temporal?',
    'name':
        'nombre',
    'costumes':
        'disfraces',
    'sounds':
        'sonidos',
    'dangling?':
        '\u00BFcuelgo de otro objeto?',
    'rotation x':
        'rotaci\u00F3n x',
    'rotation y':
        'rotaci\u00F3n y',
    'center x':
        'centro x',
    'center y':
        'centro y',

    // %dates values for (current %dates):
    'year':
        'a\u00F1o',
    'month':
        'mes',
    'date':
        'd\u00EDa',
    'day of week':
        'd\u00EDa de la semana',
    'hour':
        'hora',
    'minute':
        'minuto',
    'second':
        'segundo',
    'time in milliseconds':
        'tiempo en milisegundos',

    // operators:
    '%n mod %n':
        '%n m\u00F3dulo %n',
    'round %n':
        'redondear %n',
    '%fun of %n':
        '%fun de %n',
    'pick random %n to %n':
        'n\u00FAmero al azar entre %n y %n',
    '%b and %b':
        '%b y %b',
    '%b or %b':
        '%b o %b',
    'not %b':
        'no %b',
    'true':
        'verdadero',
    'false':
        'falso',
    'join %words':
        'unir %words',
    'split %s by %delim':
        'separar %s por %delim',
    'letter %idx of %s':
        'letra %idx de %s',
    'length of %s':
        'longitud de %s',
    'unicode of %s':
        'unic\u00F3digo de %s',
    'unicode %n as letter':
        'unic\u00F3digo %n como letra',
    'is %s a %typ ?':
        '\u00BFes %s un %typ ?',
    'is %s identical to %s ?':
        '\u00BFes %s id\u00E9ntico a %s ?',
    'JavaScript function ( %mult%s ) { %code }':
        'funci\u00F3n JavaScript ( %mult%s ) { %code }',

    // operators' developer mode primitives:
    'type of %s':
        'tipo de %s',
    '%txtfun of %s':
        '%txtfun de %s',
    'compile %repRing':
        'compilar %repRing',

    // %fun values for (%fun of %n):
    'abs':
        'valor absoluto',
    'ceiling':
        'techo', // https://es.wikipedia.org/wiki/Funciones_de_parte_entera
    'floor':
        'suelo',
    'sqrt':
        'ra\u00EDz cuadrada',
    'sin':
        'seno',
    'cos':
        'coseno',
    'tan':
        'tangente',
    'asin':
        'arcoseno',
    'acos':
        'arcocoseno',
    'atan':
        'arcotangente',
    'ln':
        'ln',
    'log':
        'log',
    'e^':
        'e^',
    '10^':
        '10^',

    // default values for (join %words):
    'hello':
        'hola',
    'world':
        'mundo',

    // %delim values (split by %delim)
   'letter':
       'letra',
   'whitespace':
       'espacio',
   'line':
       'l\u00EDnea',
   'tab':
       'tabulador',
   'cr':
       'retorno de carro',
   'csv':
       'coma',

    // %typ values for (is %s a %typ ?)
    'number':
        'n\u00FAmero',
    'text':
        'texto',
    'Boolean':
        'booleano',
    'list':
        'lista',
    'sprite':
        'objeto',
    'costume':
        'disfraz',
    'sound':
        'sonido',
    'command':
        'comando',
    'reporter':
        'reportero',
    'predicate':
        'predicado',

    // %txtfun values for (%txtfun of %s):
    'encode URI':
        'codificar URI',
    'decode URI':
        'decodificar URI',
    'encode URI component':
        'codificar componente URI',
    'decode URI component':
        'decodificar componente URI',
    'XML escape':
        'escapar XML',
    'XML unescape':
        'desescapar XML',
    'hex sha512 hash':
        'hash sha512 (hexadecimal)',

    // variables:
    'Make a variable':
        'Declarar variable',
    'Script variable name':
        'Nombre de variable de programa',
    'Variable name':
        'Nombre de variable',
    'Delete a variable':
        'Borrar variable',

    'set %var to %s':
        'asignar a %var el valor %s',
    'change %var by %n':
        'incrementar %var en %n',
    'show variable %var':
        'mostrar variable %var',
    'hide variable %var':
        'esconder variable %var',
    'script variables %scriptVars':
        'variables de programa %scriptVars',
    'inherit %shd':
        'heredar %shd',
    'a variable of name \'':
        'no existe ninguna variable llamada\n\'',
    '\'\ndoes not exist in this context':
        '\'\nen este contexto',

    // lists:
    'list %exp':
        'lista %exp',
    'numbers from %n to %n':
        'números de %n a %n',
    '%s in front of %l':
        '%s delante de %l',
    'item %idx of %l':
        'elemento %idx de %l',
    'all but first of %l':
        '%l sin el primer elemento',
    'length of %l':
        'longitud de %l',
    '%l contains %s':
        '\u00BF %l contiene %s ?',
    'is %l empty?':
        '¿%l vacía?',
    'map %repRing over %l':
        'mapear %repRing sobre %l',
    'keep items %predRing from %l':
        'mantener los elementos donde %predRing de %l',
    'combine %l using %repRing':
        'combinar los elementos de %l con %repRing',
    '%blitz map %repRing over %l':
        '%blitz mapear %repRing sobre %l',
    '%blitz keep items %predRing from %l':
        '%blitz mantener los elementos donde %predRing de %l',
    '%blitz combine %l using %repRing':
        '%blitz combinar los elementos de %l con %repRing',
    'for each %upvar in %l %cla':
        'para cada %upvar de %l %cla',
    'item':
        'elemento',
    'add %s to %l':
        'a\u00F1adir %s a %l',
    'delete %ida of %l':
        'borrar %ida de %l',
    'insert %s at %idx of %l':
        'insertar %s en %idx de %l',
    'replace item %idx of %l with %s':
        'reemplazar elemento %idx de %l con %s',

    // lists' development mode blocks:
    'show table %l':
        'mostrar tabla %l',

    // %idx values for (item %idx of %l):
    'last':
        '\u00FAltimo',
    'any':
        'aleatorio',

    // default value for (%l contains %s):
    'thing':
        'cosa',

    // table view dialog:
    'Table view':
        'Visor de tablas',

    // variable watchers
    'normal':
        'normal',
    'large':
        'grande',
    'slider':
        'deslizador',
    'slider min...':
        'm\u00EDnimo valor del deslizador...',
    'slider max...':
        'm\u00E1ximo valor del deslizador...',
    'import...':
        'importar...',

    // slider dialog:
    'Slider minimum value':
        'M\u00EDnimo valor del deslizador',
    'Slider maximum value':
        'M\u00E1ximo valor del deslizador',

    // list watchers
    'length: ':
        'longitud: ',

    // other
    'Make a block':
        'Crear bloque',

    // other development mode blocks:
    'code of %cmdRing':
        'c\u00F3digo de %cmdRing',
    'map %cmdRing to %codeKind %code':
        'mapear %cmdRing a %codeKind %code',
    'map %mapValue to code %code':
        'mapear %mapValue a c\u00F3digo %code',
    'map %codeListPart of %codeListKind to code %code':
        'mapear %codeListPart de %codeListKind a c\u00F3digo %code',

    // %cmdRing values for (map %cmdRing to %codeKind %code):
    'String':
        'String',
    'Number':
        'n\u00FAmero',
    // already defined
    // 'true':
    //     'verdadero',
    // 'false':
    //     'falso',

    // %codeKind values for (map %cmdRing to %codeKind %code)
    'code':
        'c\u00F3digo',
    'header':
        'cabecera',

    // %mapValue values for (map %mapValue to code %code):
    // already defined
    // 'list':
    //    'lista',
    'delimiter':
        'delimitador',

    // $codeListKind values for (map %codeListPart of %codeListKind to code %code)
    'collection':
        'colecci\u00F3n',
    'variables':
        'variables',
    'parameters':
        'par\u00E1metros',

    // menus
    // snap menu
    'About...':
        'Acerca de...',
    'Reference manual':
        'Manual de referencia',
    'Snap! website':
        'Sitio web de Snap!',
    'Download source':
        'Descargar c\u00F3digo fuente',
    'Switch back to user mode':
        'Regresar a modo usuario',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'desactiva los men\u0075s contextuales de Morphic\ny muestra unos m\u00E1s f\u00E1ciles de utilizar',
    'Switch to dev mode':
        'Cambiar a modo desarrollador',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'activa los men\u0075s contextuales\n e inspectores de Morphic\n(\u00A1no son f\u00E1ciles de utilizar)',
    'entering development mode.\n\nerror catching is turned off,\nuse the browser\'s web console\nto see error messages.':
        'Se ha activado el modo desarrollador.\n\nEl cacheo de errores est\u00E1 desactivado,\nusa la consola del navegador\npara ver mensajes de error.',
    'entering user mode':
        'Se ha activado el modo usuario.',

    // project menu
    'Project notes...':
        'Notas del proyecto...',
    'New':
        'Nuevo',
    'Open...':
        'Abrir...',
    'Save':
        'Guardar',
    'Save As...':
        'Guardar como...',

    'Import...':
        'Importar...',
    'file menu import hint':
        'importa proyectos, bloques,\ndisfraces o sonidos',

    'Export project...':
        'Exportar proyecto...',
    '(in a new window)':
        '(en una nueva ventana)',
    'save project data as XML\nto your downloads folder':
        'guarda el proyecto en XML\nen tu carpeta de descargas',
    'show project data as XML\nin a new browser window':
        'muestra el proyecto en XML\nen una nueva ventana del navegador',

    'Export project as plain text...':
        'Exportar proyecto como texto...',

    'Export blocks...':
        'Exportar bloques...',
    'show global custom block definitions as XML\nin a new browser window':
        'muestra definiciones de\nbloques personalizados en XML\nen una nueva ventana',

    'Unused blocks...':
        'Bloques no utilizados...',
    'find unused global custom blocks\nand remove their definitions':
        'busca bloques personalizados\nque no se est\u00E9n siendo utilizados\ny borra sus definiciones',

    'Export summary...':
        'Exportar resumen...',
    'open a new browser browser window\n with a summary of this project':
        'muestra un resumen de este proyecto\nen una nueva ventana del navegador',

    'Export summary with drop-shadows...':
        'Exportar resumen (im\u00E1genes con sombra)...',
    'open a new browser browser window\nwith a summary of this project\nwith drop-shadows on all pictures.\nnot supported by all browsers':
        'muestra un resumen de este proyecto\ndonde las im\u00E1genes tienen sombra\nen una nueva ventana del navegador\n(no funciona en todos los navegadores)',

    'Export all scripts as pic...':
        'Exportar todos los programas como imagen',
    'show a picture of all scripts\nand block definitions':
        'muestra una imagen con todos\nlos programas y definiciones de bloques',

    'Opening blocks...':
        'Abriendo bloques...',

    'Libraries...':
        'Bibliotecas...',
    'Select categories of additional blocks to add to this project.':
        'a\u00F1ade bloques adicionales\npor categor\u00EDas a este proyecto',

    // already defined
    // 'Costumes':
    //    'Disfraces',
    'Select a costume from the media library':
        'a\u00F1ade un disfraz desde la biblioteca',

    // already defined
    // 'Sounds':
    //    'Sonidos',
    'Select a sound from the media library':
        'a\u00F1ade un sonido desde la biblioteca',

    // export project as... dialog
    'Export Project As...':
        'Exportar proyecto como...',

    // remove unused blocks dialog:
    'Remove unused blocks':
        'Borrar bloques no utilizados',
    'there are currently no unused\nglobal custom blocks in this project':
        'No hay bloques personalizados\nno utilizados en este proyecto',
    'unused block(s) removed':
        'bloque(s) no utilizado(s) eliminados',

    // cloud menu
    'Login...':
        'Iniciar sesi\u00F3n...',
    'Signup...':
        'Registrarse...',
    'Reset Password...':
        'Reiniciar contrase\u00F1a...',
    'Resend Verification Email...':
        'Reenviar correo de verificaci\u00F3n...',

    'Logout':
        'Cerrar sesi\u00F3n',
    'Change Password...':
        'Cambiar contrase\u00F1a',

    'url...':
        'Url...',
    'export project media only...':
        'Exportar s\u00F3lo medios del proyecto...',
    'export project without media...':
        'Exportar proyecto sin medios...',
    'export project as cloud data...':
        'Exportar proyecto como datos en la nube...',
    'open shared project from cloud...':
        'Abrir proyecto compartido en la nube...',

    // cloud url dialog
    'Cloud URL':
        'URL de la nube',
    'Snap!Cloud':
        'Snap!Cloud',
    'localhost':
        'localhost',
    'localhost (secure)':
        'localhost (seguro)',

    // signup dialog
    'Sign up':
        'Registro',
    'User name:':
        'Nombre de usuario:',
    'Birth date:':
        'Fecha de nacimiento:',
    'year:':
        'a\u00F1o:',
    'E-mail address:':
        'Correo electr\u00F3nico:',
    'E-mail address of parent or guardian:':
        'Correo electr\u00F3nico del padre/madre o tutor legal',
    'Password:':
        'Contrase\u00F1a:',
    'Repeat Password:':
        'Repetir contrase\u00F1a',
    'Terms of Service...':
        'T\u00E9rminos y condiciones de uso...',
    'Privacy...':
        'Privacidad...',
    'I have read and agree\nto the Terms of Service':
        'He le\u00EDdo y acepto los t\u00E9rminos\n y condiciones de uso',

    'January':
        'Enero',
    'February':
        'Febrero',
    'March':
        'Marzo',
    'April':
        'Abril',
    'May':
        'Mayo',
    'June':
        'Junio',
    'July':
        'Julio',
    'August':
        'Agosto',
    'September':
        'Septiembre',
    'October':
        'Octubre',
    'November':
        'Noviembre',
    'December':
        'Diciembre',
    'or before':
        'o antes',

    'please fill out\nthis field':
        'por favor,\ncompleta este campo',
    'User name must be four\ncharacters or longer':
        'el nombre de usuario ha de tener\ncomo m\u00EDnimo 4 caracteres',
    'please provide a valid\nemail address':
        'por favor, escribe\nuna direcci\u00F3n de correo v\u00E1lida',
    'password must be six\ncharacters or longer':
        'la contrase\u00F1a ha de tener\ncomo m\u00EDnimo 6 caracteres',
    'passwords do\nnot match':
        'las contrase\u00F1a no coindicen',
    'please agree to\nthe TOS':
        'por favor, acepta los\nt\u00E9rminos y condiciones de uso',

    // signin dialog
    'Sign in':
        'Iniciar sesi\u00F3n',
    'stay signed in on this computer\nuntil logging out':
        'Mantener la sesi\u00F3n iniciada en este ordenador',

    // reset password dialog
    'Reset password':
        'Reiniciar contrase\u00F1a',

    // resend verification email dialog
    'Resend verification email':
        'Reenviar correo de verificaci\u00F3n',

    // change password dialog
    'Change Password':
        'Cambiar contrase\u00F1a',
    'Old password:':
        'Contrase\u00F1a actual:',
    'New password:':
        'Nueva contrase\u00F1a:',
    'Repeat new password:':
        'Repetir nueva contrase\u00F1a:',
    'password has been changed.':
        'Contrase\u00F1a cambiada.',

    // open shared project in cloud dialog
    'Author name\u2026':
        'Nombre del autor...',
    'Project name...':
        'Nombre del proyecto...',
    'Fetching project\nfrom the cloud...':
        'Descargando proyecto\ndesde la nube...',
    'Opening project...':
        'Abriendo proyecto...',

    'Cloud Connection':
        'Conexi\u00F3n con la nube',
    'Successfully connected to:':     // would this be translated? (gui.js:5439)
        'Conectado correctamente a:',
    'disconnected.':
        'Desconectado.',
    'You are not logged in':
        'No has iniciado sesi\u00F3n',

    // settings menu
    'Language...':
        'Idioma...',
    'Zoom blocks...':
        'Tama\u00F1o de bloque...',
    'Stage size...':
        'Tama\u00F1o del escenario...',

    'Dragging threshold...':
        'Umbral de arrastre...',
    'specify the distance the hand has to move\nbefore it picks up an object':
        'especifica cu\u00E1nto hay que arrastrar\nun objeto para comenzar a moverlo',

    'Retina display support':
        'Soporte para pantallas Retina',
    'uncheck for lower resolution,\nsaves computing resources':
        'desmarcar para una menor resoluci\u00F3n\n(ahorra recursos de computaci\u00F3n)',
    'check for higher resolution,\nuses more computing resources':
        'marcar para una mayor resoluci\u00F3n\n(usa m\u00E1s recursos de computaci\u00F3n)',

    'Input sliders':
        'Deslizadores en campos de entrada',
    'uncheck to disable\ninput sliders for\nentry fields':
        'desmarcar para desactivar\nlos deslizadores\nen los campos de entrada',
    'check to enable\ninput sliders for\nentry fields':
        'marcar para activar\nlos deslizadores\nen los campos de entrada',

    'Execute on slider change':
        'Ejecutar cuando un deslizador cambie',
    'uncheck to suppress\nrunning scripts\nwhen moving the slider':
        'desmarcar para no ejecutar el programa\ncuando se mueva el deslizador',
    'check to run\nthe edited script\nwhen moving the slider':
        'marcar para ejecutar el programa\ncuando se mueva el deslizador',

    'Turbo mode':
        'Modo turbo',
    'uncheck to run scripts\nat normal speed':
        'desmarcar para ejecutar\nlos programas a velocidad normal',
    'check to prioritize\nscript execution':
        'marcar para priorizar\nla ejecuci\u00F3n del programa',

    'Visible stepping':
        'Depuraci\u00F3n paso a paso',
    'uncheck to turn off\nvisible stepping':
        'desmarcar para desactivar\nla depuraci\u00F3n paso a paso',
    'check to turn on\n visible stepping (slow)':
        'marcar para activar\nla depuraci\u00F3n paso a paso (lento)',

    'Ternary Boolean slots':
        'Huecos booleanos triestado',
    'uncheck to limit\nBoolean slots to true / false':
        'desmarcar para restringir\nlos huecos booleanos a verdadero / falso',
    'check to allow\nempty Boolean slots':
        'marcar para permitir\nhuecos booleanos vac\u00EDos',

    'Camera support':
        'Soporte para c\u00E1mara',
    'uncheck to disable\ncamera support':
        'desmarcar para desactivar\nel soporte de c\u00E1mara',
    'check to enable\ncamera support':
        'marcar para activar\nel soporte de c\u00E1mara',

    'Blurred shadows':
        'Sombras difuminadas',
    'uncheck to use solid drop\nshadows and highlights':
        'desmarcar para usar sombras\ny brillos s\u00F3lidos',
    'check to use blurred drop\nshadows and highlights':
        'marcar para usar sombras\ny brillos difuminados',

    'Zebra coloring':
        'Coloreado de cebra',
    'check to enable alternating\ncolors for nested blocks':
        'marcar para activar\nla alternaci\u00F3n\nde colores\npara bloques anidados',
    'uncheck to disable alternating\ncolors for nested block':
        'desmarcar para desactivar\nla alternaci\u00F3n de colores\npara bloques anidados',

    'Dynamic input labels':
        'Etiquetas de entrada din\u00E1micas',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'desmarcar para desactivar\nlas etiquetas din\u00E1micas\npara entradas variables',
    'check to enable dynamic\nlabels for variadic inputs':
        'marcar para activar\nlas etiquetas din\u00E1micas\npara entradas variables',

    'Prefer empty slot drops':
        'Dar preferencia a huecos vac\u00EDos',
    'settings menu prefer empty slots hint':
        'marcar para impedir que los bloques puedan\nocupar el lugar de otros al ser soltados',
    'uncheck to allow dropped\nreporters to kick out others':
        'desmarcar para permitir que los bloques puedan\nocupar el lugar de otros al ser soltados',

    'Long form input dialog':
        'Editor de par\u00E1metros extendido',
    'uncheck to use the input\ndialog in short form':
        'desmarcar para ocultar autom\u00E1ticamente\nlos tipos en el editor de par\u00E1metros',
    'check to always show slot\ntypes in the input dialog':
        'marcar para mostrar autom\u00E1ticamente\nlos tipos en el editor de par\u00E1metros',

    'Plain prototype labels':
        'Etiquetas planas',
    'uncheck to always show (+) symbols\nin block prototype labels':
        'desmarcar para mostrar los (+)\ndurante la definici\u00F3n de bloques',
    'check to hide (+) symbols\nin block prototype labels':
        'marcar para ocultar los (+)\ndurante la definici\u00F3n de bloques',

    'Virtual keyboard':
        'Teclado virtual',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'desmarcar para desactivar\nel soporte de teclado virtual\npara dispositivos m\u00F3viles',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'marcar para activar\nel soporte de teclado virtual\npara dispositivos m\u00F3viles',

    'Clicking sound':
        'Sonido de clic',
    'uncheck to turn\nblock clicking\nsound off':
        'desmarcar para que no suene un "clic"\ncuando se coloca un bloque',
    'check to turn\nblock clicking\nsound on':
        'marcar para que suene un "clic"\ncuando se coloca un bloque',

    'Animations':
        'Animaciones',
    'uncheck to disable\nIDE animations':
        'desmarcar para desactivar\nlas animaciones del IDE',
    'check to enable\nIDE animations':
        'marcar para activar\nlas animaciones del IDE',

    'Cache Inputs':
        'Cachear entradas',
    'uncheck to stop caching\ninputs (for debugging the evaluator)':
        'desmarcar para no cachear entradas\n(para depurar el evaluador)',
    'check to cache inputs\nboosts recursion':
        'marcar para cachear entradas\n(dispara la recusi\u00F3n)',

    'Rasterize SVGs':
        'Rasterizar SVGs',
    'uncheck for smooth\nscaling of vector costumes':
        'desmarcar para usar escalado suave\nen im\u00E1genes vectoriales',
    'check to rasterize\nSVGs on import':
        'marcar para rasterizar los SVGs\ntras haberlos importado',

    'Flat design':
        'Dise\u00F1o plano',
    'uncheck for default\nGUI design':
        'desmarcar para utilizar\nla interfaz predeterminada',
    'check for alternative\nGUI design':
        'marcar para utilizar\nla interfaz alternativa',

    'Nested auto-wrapping':
        'Encapsular bloques internos',
    'uncheck to confine auto-wrapping\nto top-level block stacks':
        'desmarcar para que bloques tipo C\ns\u00F3lo puedan encapsular a otros m\u00E1s externos',
    'check to enable auto-wrapping\ninside nested block stacks':
        'marcar para permitir que bloques tipo C\npuedan encapsular a otros m\u00E1s internos',

    'Project URLs':
        'URLs con datos de proyecto',
    'uncheck to disable\nproject data in URLs':
        'desmarcar para no incluir\ndatos del proyecto en las URLs',
    'check to enable\nproject data in URLs':
        'marcar para incluir\ndatos del proyecto en las URLs',

    'Sprite Nesting':
        'Anidamiento de objetos',
    'uncheck to disable\nsprite composition':
        'desmarcar para desactivar\nla composici\u00F3n de objetos',
    'check to enable\nsprite composition':
        'marcar para activar\nla composici\u00F3n de objetos',

    'First-Class Sprites':
        'Objetos de primera clase',
    'uncheck to disable support\nfor first-class sprites':
        'desmarcar para desactivar\nel soporte de objetos de primera clase',
    'check to enable support\n for first-class sprite':
        'marcar para activar\nel soporte de objetos de primera clase',

    'Keyboard Editing':
        'Edici\u00F3n de teclado',
    'uncheck to disable\nkeyboard editing support':
        'desmarcar para desactivar\nel soporte de edici\u00F3n de teclado',
    'check to enable\nkeyboard editing support':
        'marcar para activar\nel soporte de edici\u00F3n de teclado',

    'Table support':
        'Soporte para tablas',
    'uncheck to disable\nmulti-column list views':
        'desmarcar para no visualizar\nlistas multicolumna como tablas',
    'check for multi-column\nlist view support':
        'marcar para visualizar\nlistas multicolumna como tablas',

    'Table lines':
        'L\u00EDneas de tablas',
    'uncheck for less contrast\nmulti-column list views':
        'desmarcar para ver tablas\n con un menor contraste',
    'check for higher contrast\ntable views':
        'marcar para ver tablas\ncon un mayor contraste',

    'Live coding support':
        'Soporte para programaci\u00F3n en vivo',
    'EXPERIMENTAL! uncheck to disable live\ncustom control structures':
        '\u00A1EXPERIMENTAL! desmarcar para desactivar las\nestructuras de control personalizadas en vivo',
    'EXPERIMENTAL! check to enable\n live custom control structures':
        '\u00A1EXPERIMENTAL! marcar para activar las\nestructuras de control personalizadas en vivo',

    'Thread safe scripts':
        'Hilos de ejecuci\u00F3n seguros',
    'uncheck to allow\nscript reentrance':
        'desmarcar para permitir\nla reentrada de programas',
    'check to disallow\nscript reentrance':
        'marcar para no permitir\nla reentrada de programas',

    'Prefer smooth animations':
        'Preferir animaciones suaves',
    'uncheck for greater speed\nat variable frame rates':
        'desmarcar para una mayor velocidad\na cuadros por segundo variables',
    'check for smooth, predictable\nanimations across computers':
        'marcar para unas animaciones suaves\ny predecibles entre ordenadores',

    'Flat line ends':
        'Extremos de l\u00EDnea rectos',
    'uncheck for round ends of lines':
        'desmarcar para dibujar\nl\u00EDneas con extremos redondeados',
    'check for flat ends of lines':
        'marcar para dibujar\nl\u00EDneas con extremos rectos',

    'Codification support':
        'Soporte de codificaci\u00F3n',
    'uncheck to disable\nblock to text mapping features':
        'desmarcar para desactivar el soporte\nde conversi\u00F3n de bloques a c\u00F3digo',
    'check for block\nto text mapping features':
        'marcar para activar el soporte\nde conversi\u00F3n de bloques a c\u00F3digo',

    'Inheritance support':
        'Soporte de herencia',
    'uncheck to disable\nsprite inheritance features':
        'desmarcar para desactivar\nel soporte de herencia de objetos',
    'check for sprite\ninheritance features':
        'marcar para activar\nel soporte de herencia de objetos',

    'Persist linked sublist IDs':
        'IDs de sublistas enlazadas persistentes',
    'uncheck to disable\nsaving linked sublist identities':
        'desmarcar para impedir guardar\nlas identidades de sublistas enlazadas',
    'check to enable\nsaving linked sublist identities':
        'marcar para permitir guardar\nlas identidades de sublistas enlazadas',

    // zoom blocks dialog
    'Zoom blocks':
        'Tama\u00F1o de bloque',
    'build':
        'construye',
    'your own':
        'tus propios',
    'blocks':
        'bloques',
    'normal (1x)':
        'normal (1x)',
    'demo (1.2x)':
        'demo (1.2x)',
    'presentation (1.4x)':
        'presentaci\u00F3n (1.4x)',
    'big (2x)':
        'grande (2x)',
    'huge (4x)':
        'enorme (4x)',
    'giant (8x)':
        'gigantesco (8x)',
    'monstrous (10x)':
        'monstruoso (10x)',

    // stage size dialog:
    'Stage size':
        'Tama\u00F1o del escenario',
    'Stage width':
        'Anchura del escenario',
    'Stage height':
        'Altura del escenario',

    // dragging threshold dialog:
    'Dragging threshold':
        'Umbral de arrastre',

    // context menu:
    'help':
        'ayuda',

    // blocks context menu:
    'help...':
        'ayuda...',
    'relabel...':
        'renombrar...',
    // already defined
    // 'duplicate':
    //     'duplicar',
    'make a copy\nand pick it up':
        'crea una copia y\npermite moverla a otra parte',
    'only duplicate this block':
        'duplica s\u00F3lo este bloque',
    'delete':
        'eliminar',

    'script pic...':
        'imagen de programa...',
    'open a new window\nwith a picture of this script':
        'abre una nueva ventana\ncon una imagen de este programa',

    'download script':
        'descargar programa',
    'download this script\nas an XML file':
        'descarga este programa en XML',

    'script pic with result...':
        'imagen de programa con resultado...',
    'open a new window\nwith a picture of both\nthis script and its result':
        'abre una nueva ventana\ncon una imagen de este programa\ny su resultado',

    'ringify':
        'encapsular',
    'unringify':
        'desencapsular',

    'header mapping...':
        'mapeo a cabecera...',
    'code mapping...':
        'mapeo a c\u00F3digo...',

    // Map to header/code dialog:
    'Header mapping':
        'Mapeo a cabecera',
    'Enter code that corresponds to the block\'s definition. Use the formal parameter\nnames as shown and <body> to reference the definition body\'s generated text code.':
        'Escribe el c\u00F3digo correspondiente a la definici\u00F3n del bloque.\nUsa los nombres de los par\u00E1metros formales aqu\u00ED mostrados\ny <body> para referenciar el c\u00F3digo generado del cuerpo de la definici\u00F3n.',
    'Enter code that corresponds to the block\'s definition. Choose your own\nformal parameter names (ignoring the ones shown).':
        'Escribe el c\u00F3digo correspondiente a la definici\u00F3n del bloque.\nPuedes usar tus propios par\u00E1metros formales (ignora los aqu\u00ED mostrados).',
    'Code mapping':
        'Mapeo a c\u00F3digo',
    'Enter code that corresponds to the block\'s operation (usually a single\nfunction invocation). Use <#n> to reference actual arguments as shown.':
        'Escribe el c\u00F3digo correspondiente a la implementaci\u00F3n del bloque\n(normalmente una \u00FAnica llamada a funci\u00F3n).\nUsa <#n> para referenciar los argumentos aqu\u00ED mostrados.',

    // custom blocks context menu:
    'delete block definition...':
        'eliminar definici\u00F3n de bloque...',
    'edit...':
        'editar...',
    'rename...':
        'renombrar...',
    'rename all...':
        'renombrar todos...',
    'translations...':
        'traducciones...',
    'block variables...':
        'variables de bloque...',
    'remove block variables...':
        'eliminar variables de bloque...',
    'experimental -\nunder construction':
        'experimental\n(en construcci\u00F3n)',

    // sprites context menu:
    'edit':
        'editar',
    'rotate':
        'rotar',
    'move':
        'mover',
    'clone':
        'clonar',
    'parent...':
        'padre...',
    'current parent':
        'padre actual',
    'none':
        'ninguno',
    'release':
        'liberar',
    'make temporary and\nhide in the sprite corral':
        'lo hace temporal y oculta\nen el corral de objetos',
    'make permanent and\nshow in the sprite corral':
        'lo hace permanente y\nlo muestra en el corral de objetos',
    'detach from':
        'desvincular de',
    'detach all parts':
        'desvincular todo',
    'export...':
        'exportar...',

    // stage context menu:
    'show all':
        'mostrar todos',

    'pic...':
        'imagen...',
    'open a new window\nwith a picture of the stage':
        'abre una nueva ventana\ncon una imagen del escenario',

    // already defined
    // 'pen trails':
    //    'rastro del l\u00E1piz',
    'turn all pen trails and stamps\ninto a new costume for the\ncurrently selected sprite':
        'convierte todo rastro del l\u00E1piz\nen un nuevo disfraz para el objeto\nactualmente seleccionado',
    'turn all pen trails and stamps\ninto a new background for the stage':
        'convierte todo rastro del l\u00E1piz\nen un nuevo fondo para el escenario',

    // scripting area context menu:
    'undrop':
        'deshacer',
    'undo the last\nblock drop\nin this pane':
        'deshace el \u00FAltimo cambio\nhecho con bloques',

    'redrop':
        'rehacer',
    'redo the last undone\nblock drop\nin this pane':
        'rehace el \u00FAltimo cambio\ndeshecho con bloques',

    'clear undrop queue':
        'vaciar historial de cambios',
    'forget recorded block drops\non this pane':
        'olvida el historial\nde cambios hechos con bloques',

    'clean up':
        'ordenar',
    'arrange scripts\nvertically':
        'alinea los programas\nverticalmente',

    'add comment':
        'a\u00F1adir comentario',
    // comment default text:
    'add comment here...':
        'a\u00F1adir comentario aqu\u00ED...',

    'scripts pic...':
        'imagen de programas...',
    'open a new window\nwith a picture of all scripts':
        'abre una nueva ventana\ncon una imagen de todos los programas',

    'make a block...':
        'crear bloque...',

    'use the keyboard\nto enter blocks':
        'permite utilizar el teclado\npara escribir bloques',

    // costumes
    'rename':
        'renombrar',
    'export':
        'exportar',
    'rename costume':
        'renombrar disfraz',

    // input context menu
    'options...':
        'opciones...',
    'read-only':
        'solo lectura',
        
    // sounds
    'Play':
        'Reproducir',
    'Play sound':
        'reproduce este sonido',
    'Stop':
        'Detener',
    'Stop sound':
        'detiene este sonido',

    // variables context menu
    'transient':
        'excluir al guardar',
    'uncheck to save contents\nin the project':
        'desmarcar para guardar\nel contenido junto con el proyecto',
    'check to prevent contents\nfrom being saved':
        'marcar para no guardar\nel contenido junto con el proyecto',

    // already defined
    // 'rename...':
    //     'renombrar...',
    'rename only\nthis reporter':
        'renombra s\u00F3lo\neste reportero',
    // already defined
    // 'rename all...':
    //     'renombrar todos...',
    'rename all blocks that\naccess this variable':
        'renombra todos los bloques\nque acceden a esta variable',
    'inherited':
        'herencia',
    'uncheck to\ndisinherit':
        'desmarcar para no heredar',
    'check to inherit\nfrom':
        'marcar para heredar de',

    // lists context menu
    'items':
        'elementos',
    'reset columns':
        'reiniciar columnas',
    'open in another dialog...':
        'abrir en otro di\u00E1logo',
    'table view...':
        'ver como tabla...',
    'list view...':
        'ver como lista...',
    'open in dialog...':
        'abrir en di\u00E1logo...',

    // rename costume dialog:
    'rename background':
        'Renombrar disfraz',

    // rename sound dialog:
    'rename sound':
        'Renombrar sonido',

    // comments context menu:
    'comment pic...':
        'imagen de comentario...',
    'open a new window\nwith a picture of this comment':
        'abre una nueva ventana\ncon una imagen de este comentario',

    // morph context menu:
    'user features':
        'opciones de usuario',

    'color...':
        'color...',
    '\ncolor:':
        '\ncolor:',
    'choose another color \nfor this morph':
        'cambia el color\nde este morph',

    'transparency...':
        'transparencia...',
    '\nalpha\nvalue:':
        '\nvalor alfa',
    'set this morph\'s\nalpha value':
        'establece el valor alfa\nde este morph',

    'resize...':
        'redimensionar...',
    'show a handle\nwhich can be dragged\nto change this morph\'s extent':
        'muestra una muesca que puede ser arrastrada\npara cambiar el tama\u00F1o de este morph',

    // already defined
    // 'duplicate':
    //     'duplicar',
    // 'make a copy\nand pick it up':
    //     'crea una copia y\npermite moverla a otro lugar',

    'pick up':
        'coger',
    'detach and put \ninto the hand':
        'permite moverlo a otro lugar',

    'attach...':
        'vincular',
    'stick this morph\nto another one':
        'pega este morph a otro',

    'move...':
        'mover...',
    'show a handle\nwhich can be dragged\nto move this morph':
        'muestra una muesca que puede ser\narrastrada para mover este morph',

    'inspect...':
        'inspeccionar',
    'open a window\non all properties':
        'abre una ventana\ncon todas las propiedades',
    'open a window on\nall properties':
        'abre una ventana\ncon todas las propiedades',

    // already defined
    // 'pic...':
    //     'imagen...',
    'open a new window\nwith a picture of this morph':
        'abre una nueva ventana\ncon una image de este morph',

    'lock':
        'bloquear',
    'make this morph\nunmovable':
        'impide que este morph\nse pueda mover',

    'unlock':
        'desbloquear',
    'make this morph\nmovable':
        'permite que este morph\nse pueda mover',

    // already defined
    // 'hide':
    //     'ocultar',
    // 'delete':
    //     'eliminar',

    'World...':
        'Mundo...',
    'show the\nWorld\'s menu':
        'muestra el men\u00FA del Mundo',

    'set rotation':
        'rotar',
    'interactively turn this morph\nusing a dial widget':
        'gira este morph\nutilizando un control de disco',

    'edit rotation point only...':
        'editar s\u00F3lo punto de rotaci\u00F3n...',

    'pivot':
        'pivote',
    'edit the costume\'s\nrotation center':
        'edita el centro\nde rotaci\u00F3n del disfraz',

    // already defined
    // 'edit':
    //     'editar',

    'move all inside...':
        'mover todos dentro...',
    'keep all submorphs\nwithin and visible':
        'retiene dentro y hace visibles\ntodos los sub-morphs',

    'stop':
        'detener',
    'terminate all running threads':
        'termina todos los hilos en ejecuci\u00F3n',

    'auto line wrap off...':
        'desactivar ajuste de l\u00EDnea...',
    'turn automatic\nline wrapping\noff':
        'desactiva el ajuste\nde l\u00EDnea autom\u00E1tico',
    'auto line wrap on...':
        'activar ajuste de l\u00EDnea...',
    'enable automatic\nline wrapping':
        'activa el ajuste\nde l\u00EDnea autom\u00E1tico',

    'delete block':
        'eliminar bloque',
    'spec...':
        'definici\u00F3n...',

    'font size...':
        'tama\u00F1o de fuente...',
    'set this String\'s\nfont point size':
        'establece el tama\u00F1o de fuente\nde este texto',

    'serif':
        'serif',
    'sans-serif':
        'sans-serif',
    'normal weight':
        'grosor normal',
    'bold':
        'negrita',
    'normal style':
        'estilo normal',
    'italic':
        'cursiva',
    'hide blanks':
        'ocultar espacios',
    'show blanks':
        'mostrar espacios',
    'show characters':
        'mostrar caracteres',
    'hide characters':
        'ocultar caracteres',

    'middle':
        'mitad',
    'tip':
        'punta',

    'screenshot':
        'imagen',

    'make a morph':
        'crear un morph',

    // WorldMorph context menu
    'demo...':
        'demo...',
    'sample morphs':
        'morphs de muestra',
    'hide all...':
        'ocultar todos...',
    'show all...':
        'mostrar todos...',
    'screenshot...':
        'captura de pantalla...',
    'restore display':
        'restaurar pantalla',
    'redraw the\nscreen once':
        'redibuja la pantalla',
    'fill page...':
        'llenar p\u00E1gina',
    'let the World automatically\nadjust to browser resizing':
        'hace que el Mundo se ajuste\nautom\u00E1ticamente cuando\nse redimensiona el navegador', // @todo
    'sharp shadows...':
        'sombras n\u00EDtidas...',
    'sharp drop shadows\nuse for old browsers':
        'sombras n\u00EDtidas\n(para navegadores antiguos)',
    'blurred shadows...':
        'sombras difuminadas...',
    'blurry shades,\n use for new browsers':
        'sombras difuminadas\n(para navegadores modernos)',
    // already defined
    // 'color...':
    //     'color...',
    'choose the World\'s\nbackground color':
        'selecciona el color\nde fondo del Mundo',
    'touch screen settings':
        'perfil de pantallas t\u00E1ctiles',
    'bigger menu fonts\nand sliders':
        'fuentes y deslizadores\nm\u00E1s grandes',
    'standard settings':
        'perfil de ordenador',
    'smaller menu fonts\nand sliders':
        'fuentes y deslizadores m\u00E1s peque\u00F1os',
    'user mode...':
        'modo usuario...',
    'disable developers\'\ncontext menus':
        'desactiva los men\u00FAs\ncontextuales de desarrollador',
    'development mode...':
        'modo desarrollador...',
    'about morphic.js...':
        'acerca de morphic.js',

    // morph samples
    'rectangle':
        'rect\u00E1ngulo',
    'box':
        'caja',
    'circle box':
        'caja circular',
    // already defined
    // 'slider':
    //     'deslizador',
    'dial':
        'disco',
    'frame':
        'panel',
    'scroll frame':
        'panel con deslizadores',
    'handle':
        'muesca',
    'string':
        'string',
    // already defined
    // 'text':
    //     'texto',
    'speech bubble':
        'mensaje popup',
    'gray scale palette':
        'paleta de grises',
    'color palette':
        'paleta de color',
    'color picker':
        'medidor de color',
    'sensor demo':
        'demo: sensor',
    'animation demo':
        'demo: animaci\u00F3n',
    'pen':
        'tortuga',

    // custom block's text fragment symbols:
    'square':
        'cuadrado',
    'pointRight':
        'apuntar a la derecha',
    'stepForward':
        'siguiente paso',
    'gears':
        'engranaje',
    'file':
        'fichero',
    'fullScreen':
        'pantalla completa',
    'normalScreen':
        'pantalla normal',
    'smallStage':
        'escenario peque\u00F1o',
    'normalStage':
        'escenario normal',
    'turtle':
        'tortuga',
    // already defined
    // 'stage':
    //     'escenario',
    'turtleOutline':
        'tortuga (contorno)',
    'pause':
        'pausa',
    'flag':
        'bander\u00EDn',
    'octagon':
        'oct\u00F3gono',
    'cloud':
        'nube',
    'cloudOutline':
        'nube (contorno)',
    'cloudGradient':
        'nube (degradado)',
    'turnRight':
        'giro a la derecha',
    'turnLeft':
        'giro a la izquierda',
    'storage':
        'almacenamiento',
    'poster':
        'p\u00F3ster',
    'flash':
        'rel\u00E1mpago',
    'brush':
        'pincel',
    // already defined
    // 'rectangle':
    //     'rect\u00E1ngulo',
    'rectangleSolid':
        'rect\u00E1ngulo (s\u00F3lido)',
    'circle':
        'c\u00EDrculo',
    'circleSolid':
        'c\u00EDrculo (s\u00F3lido)',
    // already defined
    // 'line':
    //     'l\u00EDnea',
    'cross':
        'cruz',
    'crosshairs':
        'punto de mira',
    'paintbucket':
        'bote de pintura',
    'eraser':
        'goma de borrar',
    'pipette':
        'cuentagotas',
    'speechBubble':
        'bocadillo',
    'speechBubbleOutline':
        'bocadillo (contorno)',
    'turnBack':
        'ir atr\u00E1s',
    'turnForward':
        'ir adelante',
    'arrowUp':
        'flecha arriba',
    'arrowUpOutline':
        'flecha arriba (contorno)',
    'arrowLeft':
        'flecha izquierda',
    'arrowLeftOutline':
        'flecha izquierda (contorno)',
    'arrowDown':
        'flecha abajo',
    'arrowDownOutline':
        'flecha abajo (contorno)',
    'arrowRight':
        'flecha derecha',
    'arrowRightOutline':
        'flecha derecha (contorno)',
    'robot':
        'robot',
    'magnifyingGlass':
        'lupa',
    'magnifierOutline':
        'lupa (contorno)',
    'notes':
        'notas musicales',
    // already defined
    // 'camera':
    //     'c\u00E1mara',
    'location':
        'ubicaci\u00F3n',
    'footprints':
        'huellas de pasos',
    'keyboard':
        'teclado',
    'keyboardFilled':
        'teclado (s\u00F3lido)',
    'new line':
        'nueva l\u00EDnea',

    // dialogs
    // buttons
    'OK':
        'Aceptar',
    'Ok':
        'Aceptar',
    'Cancel':
        'Cancelar',
    'Apply':
        'Aplicar',
    'Default':
        'Predeterminado',
    'Yes':
        'S\u00ED',
    'No':
        'No',

    // help
    'Help':
        'Ayuda',

    // Project Manager
    'Untitled':
        'Sin T\u00EDtulo',
    'Open Project':
        'Abrir proyecto',
    'Save Project':
        'Guardar proyecto',
    'Save Project As...':
        'Guardar proyecto como...',
    '(empty)':
        '(vac\u00EDo)',
    '(no matches)':
        '(ninguna coincidencia)',
    'Open':
        'Abrir',
    'Delete':
        'Eliminar',
    'Share':
        'Compartir',
    'Share Project':
        'Compartir',
    'Unshare':
        'No compartir',
    'Unshare Project':
        'Dejar de compartir',
    'Saved!':
        '\u00A1Guardado!',
    'Delete Project':
        'Eliminar proyecto',
    'Are you sure you want to delete': // + proyect name?
        '\u00BFSeguro que quieres eliminar', // + proyect name?
    'Cloud':
        'Nube',
    'Browser':
        'Navegador',
    'Examples':
        'Ejemplos',
    'Updating\nproject list...':
        'Actualizando\nlista de proyectos...',
    'Saving project\nto the cloud...':
        'Guardando proyecto\nen la nube...',
    'saved.':
        'Guardado.',
    'last changed':
        '\u00FAltima modificaci\u00F3n',
    'Are you sure you want to share': // + project name?
        '\u00BFSeguro que quieres\ncompartir', // + project name?
    'Are you sure you want to unshare': // + project name?
        '\u00BFSeguro que quieres\ndejar de compartir', // + project name?
    'sharing\nproject...':
        'Compartiendo proyecto...',
    'shared.':
        'Compartido.',
    'unsharing\nproject...':
        'Dejando de compartir...',
    'unshared.':
        'No compartido.',
    'Are you sure you want to publish':
        '\u00BFSeguro que quieres\npublicar', // + project name?
    'Are you sure you want to unpublish':
        '\u00BFSeguro que quieres\ndejar de publicar', // + project name?
    'Publish Project':
        'Publicar proyecto',
    'Unpublish Project':
        'Dejar de publicar',
    'publishing\nproject...':
        'Publicando proyecto...',
    'unpublishing\nproject...':
        'Cancelando publicaci\u00F3n...',
    'published.':
        'Publicado.',
    'unpublished.':
        'No publicado',
    'Recover':
        'Recuperar',
    'Today, ':
        'Hoy, ',
    'Yesterday, ':
        'Ayer, ',

    // costume editor @todo (wasn't this superseed by paint editor?)
    'Costume Editor':
        'Editor de disfraces',
    'click or drag crosshairs to move the rotation center':
        'haz clic o arrastra el punto de mira\npara mover el centro de rotaci\u00F3n',

    // project notes dialog:
    'Project Notes':
        'Notas del proyecto',

    // new project dialog:
    'New Project':
        'Nuevo proyecto',
    'Replace the current project with a new one?':
        '\u00BFSeguro que quieres\ndescartar el actual proyecto\ny empezar un proyecto nuevo?',

    // export blocks
    'Export blocks':
        'Exportar bloques',
    'Import blocks':
        'Importar bloques',
    'this project doesn\'t have any\ncustom global blocks yet':
        'este proyecto no tiene ning\u00FAn bloque personalizado todav\u00EDa',
    'no blocks were selected':
        'No se ha seleccionado ning\u00FAn bloque',
    'select':
        'seleccionar',
    // already defined
    // 'all':
    //     'todos',
    // 'none':
    //     'ninguno',

    // variable dialog:
    'for all sprites':
        'para todos los objetos',
    'for this sprite only':
        's\u00F3lo para este objeto',

    // block editor dialog:
    'Block Editor':
        'Editor de bloques',
    'Method Editor':
        'Editor de m\u00E9todos',
    'Change block':
        'Cambiar bloque',
    'Command':
        'Comando',
    'Reporter':
        'Reportero',
    'Predicate':
        'Predicado',
    'block variables':
        'variables de bloque',

    // custom block translations dialog:
    'Custom Block Translations':
        'Traducciones del bloque personalizado',
    'Enter one translation per line. use colon (":") as lang/spec delimiter\nand underscore ("_") as placeholder for an input, e.g.:\n\nen:say _ for _ secs':
        'Escribe cada traducci\u00F3n en una l\u00EDnea.\nUtiliza (:) para separar el idioma y el mensaje\ny (_) para argumentos de entrada, por ejemplo:\n\n  es:decir _ durante _ segs',

    // block deletion dialog:
    'Delete Custom Block':
        'Eliminar bloque personalizado',
    'block deletion dialog text':
        '\u00BFSeguro que quieres eliminar\neste bloque personalizado\ny todas sus instancias?',

    // input dialog:
    'Create input name':
        'Crear par\u00E1metro',
    'Edit input name':
        'Editar par\u00E1metro',
    'Edit label fragment':
        'Editar fragmento de texto',
    'Title text':
        'Texto',
    'Input name':
        'Par\u00E1metro',
    // already defined
    // 'Delete':
    //     'Eliminar',

    'Object':
        'Objeto',
    'Text':
        'Texto',
    'List':
        'Lista',
    // already defined
    // 'Number':
    //     'N\u00FAmero',
    'Any type':
        'Cualquier tipo',
    'Boolean (T/F)':
        'Booleano (V/F)',
    'Command\n(inline)':
        'Comando\n(en l\u00EDnea)',
    // already defined
    // 'Reporter':
    //     'Reportero',
    // 'Predicate':
    //     'Predicado',
    'Command\n(C-shape)':
        'Comando\n(tipo C)',
    'Any\n(unevaluated)':
        'Cualquier tipo\n(no evaluado)',
    'Boolean\n(unevaluated)':
        'Booleano\n(no evaluado)',

    'Single input.':
        'Entrada simple.',
    'Default Value:':
        'Valor predeterminado:',
    'Multiple inputs (value is list of inputs)':
        'Entrada m\u00FAltiple (valores accesibles como lista)',
    'Upvar - make internal variable visible to caller':
        'Salida (hace visible una variable interna)',

    'Input Slot Options':
        'Opciones de par\u00E1metro de entrada',
    'Enter one option per line.\nOptionally use "=" as key/value delimiter and {} for submenus. e.g.\n   the answer=42':
        'Escribe cada opci\u00F3n en una l\u00EDnea.\nUsa (=) para asignar un valor y {} para submen\u00FAs, por ejemplo:\n  respuesta=42',

    // About Snap
    'About Snap':
        'Acerca de Snap',
    'Back...':
        'Atr\u00E1s...',
    'License...':
        'Licencia...',
    'Modules...':
        'M\u00F3dulos...',
    'Credits...':
        'Cr\u00E9ditos...',
    'Translators...':
        'Traductores...',
    'License':
        'Licencia',
    'current module versions:':
        'Versiones actuales de los m\u00F3dulos:',
    'Contributors':
        'Colaboradores',
    'Translations':
        'Traducciones',

    // exported summary in HTML:
    'Contents':
        'Contenido',
    'Kind of':
        'Clase de',
    'Part of':
        'Parte de',
    'Parts':
        'Partes',
    // already defined
    // 'Costumes':
    //     'Disfraces',
    // 'Sounds':
    //     'Sonidos',
    // 'Scripts':
    //     'Programas',
    'For all Sprites':
        'Para todos los objetos',
    'Blocks':
        'Bloques',
    // already defined
    // 'Variables':
    //     'Variables',

    // exported summary dialog
    'Could not export':
        'No se ha podido exportar',
    'unable to export text':
        'No se ha podido exportar el texto',

    //libraries
    'Iteration, composition':
        'Iteraci\u00F3n, composici\u00F3n',
    'Traditional loop constructs (while, until, etc.) plus the Lisp "named let" (a generalization of FOR) plus functional iteration (repeated invocation of a function) and function composition.':
        'Bucles tradicionales (while, until, etc...) + el "named let" de Lisp (una generalizaci\u00F3n del for) + iteraci\u00F3n funcional (invocaci\u00F3n repetida de una funci\u00F3n) y composici\u00F3n de funciones.',

    'List utilities':
        'Utilidades de lista',
    'Some standard functions on lists (append, reverse, etc.)':
        'Algunas funciones est\u00E1ndar de listas (append, reverse, etc...)',

    'Streams (lazy lists)':
        'Streams (listas perezosas)',
    'A variation on the list data type in which each list item aren\'t computed until it\'s needed, so you can construct million-item lists without really taking up all that time or memory, or even infinite-sized lists.  (A block that reports all the prime numbers is included as an example.)':
        'Una variaci\u00F3n del tipo de dato lista en el que cada elemento se calcula s\u00F3lo cuando es necesario, as\u00ED que puedes construir listas de un mill\u00F3n de elementos sin gastar tiempo o memoria, o incluso listas infinitas. (Se incluye un bloque de ejemplo que reporta todos los n\u00FAmeros primos)',

    'Variadic reporters':
        'Reporteros de aridad variable',
    'Versions of +, x, AND, and OR that take more than two inputs.':
        'Versiones de +, x, AND, y OR que toman m\u00E1s de dos argumentos.',

    'Web services access (https)':
        'Acceso a servicios web (https)',
    'An extended version of the HTTP:// block that allows POST, PUT, and DELETE as well as GET requests, allows using the secure HTTPS protocol, and gives control over headers, etc.':
        'Una versi\u00F3n extendida del bloque HTTP:// que permite hacer peticiones POST, PUT y DELETE adem\u00E1s de GET, utilizar el protocolo HTTPS, controlar cabeceras, etc...',

    'Words, sentences':
        'Palabras, frases',
    'One of the big ideas in Logo that they left out of Scratch is thinking of text as structured into words and sentences, rather than just a string of characters.  This library brings back that idea.':
        'Una de las mejores ideas de Logo no inclu\u00EDda en Scratch es la de considerar un texto como una secuencia de palabras y frases, en lugar de simplemente una cadena de caracteres. Esta biblioteca recupera esa idea.',

    'Multi-branched conditional (switch)':
        'Condicionales multirama (switch)',
    'Like "switch" in C-like languages or "cond" in Lisp.  Thanks to Nathan Dinsmore for inventing the idea of a separate block for each branch!':
        'Como el "switch" de C o el "cond" de Lisp. \u00A1Gracias a Nathan Dinsmore por inventar la idea de un bloque separado para cada rama!',

    'LEAP Motion controller':
        'Control gestual (LEAP)',
    'Report hand positions from LEAP Motion controller (leapmotion.com).':
        'Reporta las posiciones de las manos desde el controlador de LEAP Motion (leapmotion.com).',

    'Set RGB or HSV pen color':
        'Colores RGB o HSV',
    'Set or report pen color as RGB (red, green, blue) or HSV (hue, saturation, value).':
        'Fija o devuelve el color del l\u00E1piz como RGB (rojo, verde, azul) o HSV (matiz, saturaci\u00F3n, valor).',

    'Catch errors in a script':
        'Captura de errores en programas',
    'Run a script; if an error happens, instead of stopping the script with a red halo, run another script to handle the error. Also includes a block to cause an error with a message given as input. Also includes a block to create a script variable and give it a value.':
        'Ejecuta un programa. Si ocurre alg\u00FAn error, en lugar de detener la ejecuci\u00F3n el programa con un mensaje en rojo puedes ejecutar otro programa para tratar el error. Tambi\u00E9n incluye un bloque para lanzar un error con un mensaje, un bloque para crear una variable de programa y darle un valor.',

    'Allow multi-line text input to a block':
        'Texto multilinea',
    'In general, text inputs allow only a single line.  The MULTILINE block accepts multi-line text input and can be used in text input slots of other blocks.':
        'En general, las entradas de texto s\u00F3lo aceptan una \u00FAnica l\u00EDnea. El bloque MULTILINEA acepta texto en varias l\u00EDneas y puede ser usado como texto de entrada en otros bloques.',

    'Provide getters and setters for all GUI-controlled global settings':
        'Manejo de opciones globales',
    'Eisenberg\'s Law: Anything that can be done from the GUI should be doable from the programming language, and vice versa.':
        'Ley de Eisenberg: Cualquier cosa que pueda hacerse desde la interfaz gr\u00E1fica tambi\u00E9n deber\u00EDa de poder hacerse desde el lenguaje de programaci\u00F3n y viceversa.',

    'Infinite precision integers, exact rationals, complex':
        'Precisi\u00F3n arbitraria, racionales exactos, n\u00FAmeros complejos.',
    'The full Scheme numeric tower.  "USE BIGNUMS <True>" to enable.':
        'La torre num\u00E9rica completa de Scheme. "UTILIZAR BIGNUMS <verdadero>" para activarla.',

    'Provide 100 selected colors':
        'Paleta de 100 colores preseleccionados',
    'to use instead of hue for better selection':
        'Para seleccionar un color por nombre en lugar de por su matiz.',

    'Animation':
        'Animaci\u00F3n',
    'glide, grow and rotate using easing functions.':
        'Deslizamientos, zooms y rotaciones utilizando funciones curva.',

    'Pixels':
        'P\u00EDxeles',
    'manipulate costumes pixel-wise.':
        'Manipula disfraces a nivel de pixel.',

    'Audio Comp':
        'Audio',
    'analyze, manipulate and generate sound samples.':
        'Analiza, manipula y genera muestras de sonido.',

    // library dialog:
    'Import library':
        'Importar biblioteca',
    'Import':
        'Importar',
    'Imported':
        'Se ha importado',
    'Loading':
        'Cargando',

    // need to be relocated:
    'expecting':
        'se esperaban las entradas',
    'input(s), but getting':
        'pero se ha encontrado',
    '(temporary)':
        '(temporal)',
    'random':
        'aleatorio',
    'random position':
        'cualquier posición',
    'center':
        'centro',
    'width':
        'ancho',
    'height':
        'alto',
    '%img of costume %cst':
        '%img del disfraz %cst',
    'stretch %cst x: %n y: %n %':
        'estira %cst a x: %n y: %n %',
    'current':
        'actual',
    'new costume %l width %dim height %dim':
        'nuevo disfraz %l con ancho %dim y alto %dim',
    '%eff effect':
        'efecto %eff',
    'shown?':
        '¿visible?',
    'go to %layer layer':
        'enviar a la capa %layer',
    'back':
        'trasera',
    'front':
        'delantera',
    'play sound %snd at %rate Hz':
        'reproducir sonido %snd a %rate Hz',
    '%aa of sound %snd':
        '%aa del sonido %snd',
    'duration':
        'duración',
    'length':
        'longitud',
    'number of channels':
        'número de canales',
    'frequency':
        'frecuencia',
    'sample rate':
        'frecuencia de muestreo',
    'samples':
        'muestras',
    'spectrum':
        'espectro',
    'resolution':
        'resolución',
    'new sound %l rate %rate Hz':
        'nuevo sonido %l a %rate Hz',
    'change volume by %n':
        'cambiar volumen en %n',
    'set volume to %n %':
        'fijar volumen a %n %',
    'change balance by %n':
        'cambiar balance en %n',
    'set balance to %n':
        'fijar balance a %n',
    'balance':
        'balance',
    'volume':
        'volumen',
    'play frequency %n Hz':
        'reproducir frecuencia %n Hz',
    'stop frequency':
        'parar la freqüència',
    'pen down?':
        '¿lápiz bajado?',
    'hue':
        'tonalidad',
    'change pen %hsva by %n':
        'cambiar %hsva del lápiz en %n',
    'set pen %hsva to %n':
        'fijar %hsva del lápiz a %n',
    'write %s size %n':
        'escribir %s con tamaño %n',
    'paste on %spr':
        'estampa sobre %spr',
    'cut from %':
        'copia desde',
    'cut from %spr':
        'recorta desde %spr',
    'send %msg to %spr':
        'enviar %msg a %spr',
    'stopped':
        'paren',
    'sprites':
        'objetos',
    'top':
        'superior',
    'bottom':
        'inferior',
    'left':
        'izquierda',
    'right':
        'derecha',
    'draggable?':
        '¿arrastrable?',
    'rotation style':
        'estilo de rotación',
//mico
    'microphone %audio':
        '%audio del micro',
    'volume':
        'volumen',
    'note':
        'nota',
    'pitch':
        'tono',
    'signals':
        'señales',
    'frequencies':
        'frecuencias',
    'bins':
        'resolución',
    'Microphone resolution...':
        'Resolución del micro...',
    'low':
        'baja',
    'normal':
        'normal',
    'high':
        'alta',
    'max':
        'máxima',
//
    'video %vid on %self':
        '%vid del vídeo en %self',
    'motion':
        'movimiento',
    'snap':
        'instantánea',
    'set video transparency to %n':
        'fijar la transparencia del vídeo a %n',
    'video capture':
        'captura de vídeo',
    'mirror video':
        'espejo sobre el vídeo',
    'is %setting on?':
        '¿parámetro %setting activo?',
    'set %setting to %b':
        'fijar el parámetro %setting a %b',
    'turbo mode':
        'modo turbo',
    'flat line ends':
        'punta de lápiz plana',
    'index of %s in %l':
        'índice de %s en %l',
    'find first item %predRing in %l':
        'primer elemento donde %predRing en %l',
    'value':
        'valor',
    'index':
        'índice',
    'append %lists':
        'anexar %lists',
    'pen vectors':
        'vectores dibujados',
    'Log pen vectors':
        'Registrar los dibujos como vectores',
    'log pen vectors':
        'registrar los dibujos como vectores'
};
