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
        'V\u00EDctor Manuel Muratalla Morales y Cristián Rizzi Iribarren', // your name for the Translators tab
    'translator_e-mail':
        'victor.muratalla@yahoo.com / rizzi.cristian@gmail.com', // optional
    'last_changed':
        '2018-01-22', // this, too, will appear in the Translators tab

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
        'Otro',

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
        'Pincel\n(dibujo libre)',
    'Stroked Rectangle\n(shift: square)':
        'Rect\u00E1ngulo\n(\u21E7 = cuadrado)',
    'Stroked Ellipse\n(shift: circle)':
        'Elipse\n(\u21E7 = c\u00EDrculo)',
    'Eraser tool':
        'Goma de borrar',
    'Set the rotation center':
        'Establecer centro de rotaci\u00F3n',
    'Line tool\n(shift: vertical/horizontal)':
        'L\u00EDnea\n(\u21E7 = vertical/horizontal)',
    'Filled Rectangle\n(shift: square)':
        'Rect\u00E1ngulo relleno\n(\u21E7 = cuadrado)',
    'Filled Ellipse\n(shift: circle)':
        'Elipse rellena\n(\u21E7 = c\u00EDrculo)',
    'Fill a region':
        'Bote de pintura',
    'Pipette tool\n(pick a color anywhere)':
        'Cuentagotas\n(obtiene colores de cualquier lugar)',
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
        'a\u00F1adir una nueva tortuga',
    'paint a new sprite':
        'dibujar un nuevo objeto',
    'take a camera snapshot and\nimport it as a new sprite':
        'hacer una captura de c\u00E1mara\ne importarla como nuevo objeto',

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
        'buscar bloques',
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
        'deslizar %n segs a x: %n y: %n',
    'change x by %n':
        'cambiar x por %n',
    'set x to %n':
        'fijar x a %n',
    'change y by %n':
        'cambiar y por %n',
    'set y to %n':
        'fijar y a %n',
    'if on edge, bounce':
        'rebotar si est\u0061 tocando un borde',
    'x position':
        'posici\u00F3n en x',
    'y position':
        'posici\u00F3n en y',
    'direction':
        'direcci\u00F3n',

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
    'say %s for %n secs':
        'decir %s por %n segs',
    'say %s':
        'decir %s',
    'think %s for %n secs':
        'pensar %s por %n segs',
    'think %s':
        'pensar %s',
    'change %eff effect by %n':
        'cambiar efecto %eff por %n',
    'set %eff effect to %n':
        'fijar efecto %eff a %n',
    'clear graphic effects':
        'quitar efectos gr\u00E1ficos',
    'change size by %n':
        'cambiar tama\u00F1o por %n',
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
        'enviar hacia atr\u00E1s %n capas',

    // looks' development mode primitives:
    'console log %mult%s':
        'registrar en consola %mult%s',
    'alert %mult%s':
        'alerta %mult%s',
    'save %imgsource as costume named %s':
        'guardar %imgsource en disfraz %s',

    // default values for (say %s):
    'Hello!':
        '\u00A1Hola!',

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
    'ghost':
        'fantasma',

    // %imgsource values for (save %imgsource as costume named %s):
    'pen trails':
        'rastro del l\u00E1piz',
    'stage image':
        'imagen del escenario',

    // sound:
    'play sound %snd':
        'tocar sonido %snd',
    'play sound %snd until done':
        'tocar sonido %snd y esperar',
    'stop all sounds':
        'detener todos los sonidos',
    'rest for %n beats':
        'silencio por %n pulsos',
    'play note %note for %n beats':
        'tocar nota %note por %n pulsos',
    'set instrument to %inst':
        'fijar instrumento a %inst',
    'change tempo by %n':
        'cambiar tempo por %n',
    'set tempo to %n bpm':
        'fijar tempo a %n',
    'tempo':
        'tempo',

    // %note values for (play note %note for %n beats):
    // Notes can be translated indeed but do it would break the piano layout
    // example:
    // 'Eb (63)':
    //    '(63) Mi♭',

    // %inst values for (set instrument to %inst):
    '(1) sine':
        '(1) \u223F\u223F onda sinusoidal',
    '(2) square':
        '(2) \u238D\u238D onda cuadrada',
    '(3) sawtooth':
        '(3) \u2A58\u2A58 onda dentada',
    '(4) triangle':
        '(4) \u22C0\u22C0 onda triangular',

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
        'cambiar color de l\u00E1piz por %n',
    'set pen color to %n':
        'fijar color de l\u00E1piz a %n',
    'change pen shade by %n':
        'cambiar intensidad de l\u00E1piz por %n',
    'set pen shade to %n':
        'fijar intensidad de l\u00E1piz a %n',
    'change pen size by %n':
        'cambiar tama\u00F1o de l\u00E1piz por %n',
    'set pen size to %n':
        'fijar tama\u00F1o de l\u00E1piz a %n',
    'stamp':
        'sellar',
    'fill':
        'llenar',
    'pen trails':
        'rastro del l\u00E1piz',

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
        'ejecutar en modo turbo %c',
    'wait %n secs':
        'esperar %n segs',
    'wait until %b':
        'esperar hasta que %b',
    'forever %c':
        'por siempre %c',
    'repeat %n %c':
        'repetir %n %c',
    'repeat until %b %c':
        'repetir hasta que %b %c',
    'if %b %c':
        'si %b %c',
    'if %b %c else %c':
        'si %b %c si no %c',
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
    // In spanish read as "Cuando me %interaction"
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
    'pen trails':
        'rastro del l\u00E1piz',

    // default value for (ask %s and wait):
    'what\'s your name?':
        '\u00BFCu\u00E1l es tu nombre?',

    // %rel values for (%rel to %dst):
    'distance':
        'distancia',
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
        'cierto',
    'false':
        'falso',
    'join %words':
        'unir %words',
    'split %s by %delim':
        'separar %s por %delim',
    'letter %n of %s':
        'letra %n de %s',
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
        'función JavaScript ( %mult%s ) { %code }',

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
        'redondeo por arriba',
    'floor':
        'redondeo por abajo',
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
        'log neperiano',
    'log':
        'log₁₀',
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
        'Crear una variable',
    'Script variable name':
        'Nombre de variable de programa',
    'Variable name':
        'Nombre de variable',
    'Delete a variable':
        'Borrar una variable',

    'transient':
        'excluir al guardar',
    'uncheck to save contents\nin the project':
        'desmarcar para guardar\nel contenido junto con el proyecto',
    'check to prevent contents\nfrom being saved':
        'marcar para no guardar\nel contenido junto con el proyecto',

    'set %var to %s':
        'fijar %var a %s',
    'change %var by %n':
        'cambiar %var por %n',
    'show variable %var':
        'mostrar variable %var',
    'hide variable %var':
        'esconder variable %var',
    'script variables %scriptVars':
        'variables de programa %scriptVars',
    'inherit %shd':
        'heredar %shd',

    // lists:
    'list %exp':
        'lista %exp',
    '%s in front of %l':
        '%s en frente de %l',
    'item %idx of %l':
        'elemento %idx de %l',
    'all but first of %l':
        'todo menos la primera de %l',
    'length of %l':
        'longitud de %l',
    '%l contains %s':
        '%l contiene %s',
    'add %s to %l':
        'agregar %s a %l',
    'delete %ida of %l':
        'borrar %ida de %l',
    'insert %s at %idx of %l':
        'insertar %s en %idx de %l',
    'replace item %idx of %l with %s':
        'reemplazar elemento %idx de %l con %s',

    // lists' development mode blocks:
    'map %repRing over %l':
        'mapear %repRing sobre %l',
    'for %upvar in %l %cl':
        'para %upvar en %l %cl',
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

    // other
    'Make a block':
        'Crear un bloque',

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
        'inhabilitar men\u0075s contextuales de Morphic\ny mostrar unos f\u00E1ciles de utilizar',
    'Switch to dev mode':
        'Cambiar a modo desarrollador',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'habilitar men\u0075s contextuales\n e inspectores de Morphic,\n\u00A1no son f\u00E1ciles de utilizar!',

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
        'importa proyectos, bloques,\nim\u00E1genes o sonidos',

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
        'busca bloques personalizados\nque no se est\u00E9n usando\ny borra sus definiciones',

    'Export summary...':
        'Exportar resumen...',
    'open a new browser browser window\n with a summary of this project':
        'muestra un resumen de este proyecto\nen una nueva ventana del navegador',

    'Export summary with drop-shadows...':
        'Exportar resumen (im\u00E1genes con sombra)...',
    'open a new browser browser window\nwith a summary of this project\nwith drop-shadows on all pictures.\nnot supported by all browsers':
        'muestra un resumen de este proyecto\ndonde las im\u00E1genes tienen sombra\nen una nueva ventana del navegador.\nno funciona en todos los navegadores',

    'Export all scripts as pic...':
        'Exportar todos los programas como imagen',
    'show a picture of all scripts\nand block definitions':
        'muestra una imagen con todos\nlos programas y definiciones de bloques',

    'Import tools':
        'Importar utilidades',
    'load the official library of\npowerful blocks':
        'carga la biblioteca oficial de\nbloques potentes',

    'Libraries...':
        'Bibliotecas...',
    'Select categories of additional blocks to add to this project.':
        'a\u00F1ade bloques adicionales\npor categor\u00EDas a este proyecto',

    'Costumes':
        'Disfraces',
    'Select a costume from the media library':
        'a\u00F1ade un disfraz desde la biblioteca',

    'Sounds':
       'Sonidos',
    'Select a sound from the media library':
        'a\u00F1ade un sonido desde la biblioteca',

    // export project as... dialog
    'Export Project As...':
        'Exportar proyecto como...',

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
        'Exportar solamente medios del proyecto...',
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

    // open shared project in cloud dialog
    'Author name\u2026':
        'Nombre del autor...',
    'Project name...':
        'Nombre del proyecto...',
    'Fetching project\nfrom the cloud...':
        'Descargando proyecto\ndesde la nube...',
    'Opening project...':
        'Abriendo proyecto...',

    // settings menu
    'Language...':
        'Idioma...',
    'Zoom blocks...':
        'Agrandar bloques...',
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
        'desmarcar para restringir\nlos huecos booleanos a cierto / falso',
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
        'Coloraci\u00F3n de cebra',
    'check to enable alternating\ncolors for nested blocks':
        'marcar para habilitar alternaci\u00F3n\nde colores para bloques anidados',
    'uncheck to disable alternating\ncolors for nested block':
        'desmarcar para inhabilitar alternaci\u00F3n\nde colores para bloques anidados',

    'Dynamic input labels':
        'Etiquetas de entrada din\u00E1micas',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'desmarcar para inhabilitar etiquetas\ndin\u00E1micas para entradas variables',
    'check to enable dynamic\nlabels for variadic inputs':
        'marcar para habilitar etiquetas\ndin\u00E1micas para entradas variables',

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
        'desmarcar para inhabilitar\nel soporte del teclado virtual\npara dispositivos m\u00F3viles',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'marcar para habilitar\nel soporte del teclado virtual\npara dispositivos m\u00F3viles',

    'Clicking sound':
        'Sonido de clic',
    'uncheck to turn\nblock clicking\nsound off':
        'desmarcar para que no suene un "clic"\ncuando se coloca un bloque',
    'check to turn\nblock clicking\nsound on':
        'marcar para que suene un "clic"\ncuando se coloca un bloque',

    'Animations':
        'Animaciones',
    'uncheck to disable\nIDE animations':
        'desmarcar para inhabilitar\nanimaciones del IDE',
    'check to enable\nIDE animations':
        'marcar para habilitar\nanimaciones del IDE',

    'Cache Inputs':
        'Cachear entradas',
    'uncheck to stop caching\ninputs (for debugging the evaluator)':
        'desmarcar para no cachear entradas\n(para depurar el evaluador)',
    'check to cache inputs\nboosts recursion':
        'marcar para cachear entradas\n(dispara la recusi\u00F3n)',

    'Rasterize SVGs':
        'Rasterizar SVGs',
    'uncheck for smooth\nscaling of vector costumes':
        'desmarcar para usar\nescalado suave en im\u00E1genes vectoriales',
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
        'desmarcar para que bloques tipo C\nsolo puedan encapsular a otros m\u00E1s externos',
    'check to enable auto-wrapping\ninside nested block stacks':
        'marcar para permitir que bloques tipo C\npuedan encapsular a otros m\u00E1s internos',

    'Project URLs':
        'URLs de proyecto',
    'uncheck to disable\nproject data in URLs':
        'desmarcar para no incluir\ndatos de proyecto en las URLs',
    'check to enable\nproject data in URLs':
        'marcar para incluir\ndatos de proyecto en las URLs',

    'Sprite Nesting':
        'Anidamiento de objetos',
    'uncheck to disable\nsprite composition':
        'desmarcar para desactivar\nla composici\u00F3n de objetos',
    'check to enable\nsprite composition':
        'marcar para activar\nla composici\u00F3n de objetos',

    'First-Class Sprites':
        'Objetos de primera clase',
    'uncheck to disable support\nfor first-class sprites':
        'desmarcar para inhabilitar el\nsoporte para objectos de primera clase',
    'check to enable support\n for first-class sprite':
        'marcar para habilitar el\nsoporte para objectos de primera clase',

    'Keyboard Editing':
        'Edici\u00F3n de teclado',
    'uncheck to disable\nkeyboard editing support':
        'desmarcar para inhabilitar\nel soporte de edici\u00F3n de teclado',
    'check to enable\nkeyboard editing support':
        'marcar para habilitar\nel soporte de edici\u00F3n de teclado',

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
        '\u00A1EXPERIMENTAL! desmarcar para inhabilitar las\nestructuras de control personalizadas en vivo',
    'EXPERIMENTAL! check to enable\n live custom control structures':
        '\u00A1EXPERIMENTAL! marcar para habilitar las\nestructuras de control personalizadas en vivo',

    'Thread safe scripts':
        'Programas seguros para uso paralelo',
    'uncheck to allow\nscript reentrance':
        'desmarcar para permitir\nla reentrada de programas',
    'check to disallow\nscript reentrance':
        'marcar para no permitir\nla reentrada de programas',

    'Prefer smooth animations':
        'Preferir animaciones suaves',
    'uncheck for greater speed\nat variable frame rates':
        'desmarcar para mayor velocidad\na cuadros por segundo variables',
    'check for smooth, predictable\nanimations across computers':
        'marcar para animaciones suaves y predecibles entre ordenadores',

    'Flat line ends':
        'Extremos de l\u00EDnea rectos',
    'uncheck for round ends of lines':
        'desmarcar para dibujar l\u00EDneas\ncon extremos redondeados',
    'check for flat ends of lines':
        'marcar para dibujar l\u00EDneas\ncon extremos rectos',

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
        'Agrandar bloques',

    // stage size dialog
    'Stage size':
        'Tama\u00F1o del escenario',
    'Stage width':
        'Anchura del escenario',
    'Stage height':
        'Altura del escenario',

    // dragging threshold dialog
    'Dragging threshold':
        'Umbral de arrastre',

    // inputs
    'with inputs':
        'con entradas',
    'input names:':
        'nombres de entradas:',
    'Input Names:':
        'Nombres de entradas:',
    'input list:':
        'lista de entradas:',

    // context menus:
    'help':
        'ayuda',

    // blocks context menus:
    'help...':
        'ayuda...',
    'relabel...':
        'renombrar...',
    'duplicate':
        'duplicar',
    'make a copy\nand pick it up':
        'crea una copia y\npermite moverla a otra parte',
    'only duplicate this block':
        'duplica solamente este bloque',
    'delete':
        'borrar',

    'script pic...':
        'imagen de programa...',
    'open a new window\nwith a picture of this script':
        'abre una nueva ventana\ncon una imagen de este programa',

    'ringify':
        'encapsular',
    'unringify':
        'desencapsular',

    // custom blocks context menus:
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

    // sprites:
    'edit':
        'editar',
    'clone':
        'clonar',
    'parent...':
        'padre...',
    'export...':
        'exportar...',

    // stage:
    'show all':
        'mostrar todos',
    'pic...':
        'imagen...',
    'open a new window\nwith a picture of the stage':
        'abre una nueva ventana\ncon una imagen del escenario',
    'pen trails':
        'rastro del l\u00E1piz',
    'turn all pen trails and stamps\ninto a new costume for the\ncurrently selected sprite':
        'convierte todo rastro del l\u00E1piz\nen un nuevo disfraz para el objeto\nactualmente seleccionado',
    'turn all pen trails and stamps\ninto a new background for the stage':
        'convierte todo rastro del l\u00E1piz\nen un nuevo fondo para el escenario',

    // scripting area:
    'undrop':
        'deshacer',
    'undo the last\nblock drop\nin this pane':
        'deshace el \u00FAltimo cambio\nhecho con bloques',
    'redrop':
        'rehacer',
    'redo the last undone\nblock drop\nin this pane':
        'rehace el \u00FAltimo cambio\ndeshecho con bloques',
    'clean up':
        'ordenar',
    'arrange scripts\nvertically':
        'alinea los programas\nverticalmente',
    'add comment':
        'a\u00F1adir comentario',
    'scripts pic...':
        'imagen de programas...',
    'open a new window\nwith a picture of all scripts':
        'abre una nueva ventana\ncon una imagen de todos los programas',
    'make a block...':
        'crear bloque...',
    'use the keyboard\nto enter blocks':
        'usar el teclado\npara escribir bloques',

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

    // rename costume dialog:
    'rename background':
        'Renombrar disfraz',

    // rename sound dialog:
    'rename sound':
        'Renombrar sonido',

    // dialogs
    // buttons
    'OK':
        'Aceptar',
    'Ok':
        'Aceptar',
    'Cancel':
        'Cancelar',
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
        'Abrir Proyecto',
    'Save Project':
        'Guardar proyecto',
    'Save Project As...':
        'Guardar proyecto como...',
    '(empty)':
        '(vac\u00EDo)',
    'Open':
        'Abrir',
    'Delete':
        'Eliminar',
    'Saved!':
        '\u00A1Guardado!',
    'Delete Project':
        'Eliminar proyecto',
    'Are you sure you want to delete':
        '\u00BFEst\u00E1s seguro de que deseas eliminar',
    'Cloud':
        'Nube',
    'Browser':
        'Navegador',
    'Examples':
        'Ejemplos',

    // costume editor
    'Costume Editor':
        'Editor de disfraz',
    'click or drag crosshairs to move the rotation center':
        'haz clic o arrastra el punto de mira\npara mover el centro de rotaci\u00F3n',

    // project notes dialog:
    'Project Notes':
        'Notas del proyecto',

    // new project dialog:
    'New Project':
        'Nuevo proyecto',
    'Replace the current project with a new one?':
        '\u00BFReemplazar este proyecto con uno nuevo?',

    // export blocks
    'Export blocks':
        'Exportar bloques',
    'Import blocks':
        'Importar bloques',
    'this project doesn\'t have any\ncustom global blocks yet':
        'este proyecto no tiene ning\u00FAn bloque personalizado todav\u00EDa',
    'select':
        'seleccionar',
    'all':
        'todos',
    'none':
        'ninguno',

    // variable dialog:
    'for all sprites':
        'para todos los objetos',
    'for this sprite only':
        's\u00F3lo para este objeto',

    // block dialog
    'Change block':
        'Cambiar bloque',
    'Command':
        'Comando',
    'Reporter':
        'Reportero',
    'Predicate':
        'Predicado',

    // block editor
    'Block Editor':
        'Editor de bloques',
    'Apply':
        'Aplicar',
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
        '\u00BFEst\u00E1s seguro de que quieres eliminar\neste bloque personalizado y todas sus instancias?',

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
    'Delete':
        'Borrar',

    'Object':
        'Objeto',
    'Text':
        'Texto',
    'List':
        'Lista',
    'Number':
        'N\u00FAmero',
    'Any type':
        'Cualquier tipo',
    'Boolean (T/F)':
        'Booleano (V/F)',
    'Command\n(inline)':
        'Comando\n(en l\u00EDnea)',
    'Reporter':
        'Reportero',
    'Predicate':
        'Predicado',
    'Command\n(C-shape)':
        'Comando\n(forma C)',
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
        'Escribe cada opci\u00F3n en una l\u00EDnea.\nUsa "=" para asignar un valor y {} para submen\u00FAs, por ejemplo:\n  respuesta=42',

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
        'Créditos...',
    'Translators...':
        'Traductores',
    'License':
        'Licencia',
    'current module versions:':
        'versiones del m\u00F3dulo actual',
    'Contributors':
        'Colaboradores',
    'Translations':
        'Traducciones',

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

    // coments
    'add comment here...':
        'añadir comentario aqu\u00ED...',

    //libraries
    'Tools':
        'Utilidades',
    'Standard library of powerful blocks (for, map, etc.)':
        'Biblioteca est\u00E1ndar de bloques potentes (for, map, etc...)',

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
        'Una variaci\u00F3n del tipo de dato lista en el que cada elemento se calcula solo cuando es necesario, as\u00ED que puedes construir listas de un mill\u00F3n de elementos sin gastar tiempo o memoria, o incluso listas infinitas. (Un bloque que reporta todos los n\u00FAmeros primos viene incluido como ejemplo.)',

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
    'One of the big ideas in Logo that they left out of Scratch is thinking of text as structured into words and sentences, rather than just a string of characters.  This library (along with the JOIN WORDS block in the Tools library) brings back that idea.':
        'Una de las mejores ideas de Logo no inclu\u00EDda en Scratch es la de considerar un texto como estructurado en palabras y frases, en lugar de simplemente una cadena de caracteres. Esta biblioteca (junto al bloque UNIR de la biblioteca Utilidades) recupera esa idea.',

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
    'Set or report pen color as RGB (red, blue, green) or HSV (hue, saturation, value).':
        'Fija o devuelve el color del l\u00E1piz como RGB (rojo, azul, verde) o HSV (luminosidad, saturaci\u00F3n, valor).',

    'Catch errors in a script':
        'Captura de errores en programas',
    'Run a script; if an error happens, instead of stopping the script with a red halo, run another script to handle the error. Also includes a block to cause an error with a message given as input. Also includes a block to create a script variable and give it a value.':
        'Ejecuta un programa. Si ocurre alg\u00FAn error, en lugar de detener la ejecuci\u00F3n el programa con un mensaje en rojo puedes ejecutar otro programa para tratar el error. Tambi\u00E9n incluye un bloque para lanzar un error con un mensaje. Tambi\u00E9n incluye un bloque para crear una variable de programa y darle un valor.',

    'Allow multi-line text input to a block':
        'Texto multilinea',
    'In general, text inputs allow only a single line.  The MULTILINE block accepts multi-line text input and can be used in text input slots of other blocks.':
        'En general, las entradas de texto solo aceptan una \u00FAnica l\u00EDnea. El bloque MULTILINEA acepta texto en varias l\u00EDneas y puede ser usado como texto de entrada en otros bloques',

    'Provide getters and setters for all GUI-controlled global settings':
        'Manejo de opciones globales',

    'Infinite precision integers, exact rationals, complex':
        'Precisi\u00F3n arbitraria, racionales exactos, n\u00FAmeros complejos',
    'The full Scheme numeric tower.  "USE BIGNUMS <True>" to enable.':
        'La torre num\u00E9rica completa de Scheme. "UTILIZAR BIGNUMS <Verdad>" para activarla.',

    'Provide 100 selected colors':
        'Paleta de 100 colores preseleccionados',
    'to use instead of hue for better selection':
        'para usar en lugar de la luminosidad para una mejor selecci\u00F3n',

    'Animation':
        'Animaci\u00F3n',
    'glide, grow and rotate using easing functions.':
        'deslizamientos, zooms y rotaciones utilizando funciones curva.',

    'Pixels':
        'P\u00EDxeles',
    'manipulate costumes pixel-wise.':
        'manipula disfraces a nivel de pixel.',

    'Audio Comp':
        'Audio',
    'analyze, manipulate and generate sound samples.':
        'analiza, manipula y genera muestras de sonido',

    // library dialog
    'Import library':
        'Importar biblioteca',
    'Import':
        'Importar',
    'Imported':
        'Se ha importado',
    'Loading':
        'Cargando',
};
