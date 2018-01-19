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
        '2013-03-25', // this, too, will appear in the Translators tab

    // GUI
    // control bar:
    'untitled':
        'Sin t\u00EDtulo',
    'development mode':
        'modo de desarrollo',

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
    'draggable':
        'arrastrable',

    // tabs:
    'Scripts':
        'Programas',
    'Costumes':
        'Disfraces',
    'Sounds':
        'Sonidos',

    // names:
    'Sprite':
        'Objeto',
    'Stage':
        'Escenario',

    // rotation styles:
    'don\'t rotate':
        'no girar',
    'can rotate':
        'puede girar',
    'only face left/right':
        's\u00F3lo mirar izquierda/derecha',

    // new sprite button:
    'add a new sprite':
        'agregar un nuevo objeto',

    // tab help
    'costumes tab help':
        'importar una foto de otro sitio Web o desde\n'
            + 'su ordenador arrastr\u00E1ndolo hasta aqu\u00ED',
    'import a sound from your computer\nby dragging it into here':
        'importar un sonido desde su ordenador\narrastr\u00E1ndolo hasta aqu\u00ED',

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
        'Escenario seleccionado:\nno hay primitivos de movimiento\n'
            + 'disponibles',

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

    // looks:
    'switch to costume %cst':
        'cambiar al disfraz %cst',
    'next costume':
        'siguiente disfraz',
    'costume #':
        '# de disfraz',
    '%att of %spr':
        '%att de %spr',
    'my %get':
        'mi(s) %get',
    'say %s for %n secs':
        'decir %s por %n segs',
    'say %s':
        'decir %s',
    'think %s for %n secs':
        'pensar %s por %n segs',
    'think %s':
        'pensar %s',
    'Hello!':
        '\u00A1Hola!',
    'Hmm...':
        'mmm...',
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

    'development mode \ndebugging primitives:':
        'modo de desarrollo \nprimitivos de depuraci\u00F3n',
    'console log %mult%s':
        'log de consola: %mult%s',
    'alert %mult%s':
        'alerta: %mult%s',

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


    // control:
    'when %greenflag clicked':
        'Al presionar %greenflag',
    'when %keyHat key pressed':
        'Al presionar tecla %keyHat',
    'when I am clicked':
        'Cuando soy cliqueado',
    'when %b':
        'cuando %b',
    'when I receive %msgHat':
        'Al recibir %msgHat',
    'broadcast %msg':
        'enviar mensaje %msg',
    'broadcast %msg and wait':
        'enviar mensaje %msg y esperar',
    'Message name':
        'Nombre de mensaje',
    'message':
        'mensaje',
    'any message':
        'cualquier mensaje',
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
    'stop block':
        'detener bloque',
    'stop script':
        'detener programa',
    'stop all %stop':
        'detener todo %stop',
    'run %cmdRing %inputs':
        'correr %cmdRing %inputs',
    'launch %cmdRing %inputs':
        'iniciar %cmdRing %inputs',
    'call %repRing %inputs':
        'llamar %repRing %inputs',
    'run %cmdRing w/continuation':
        'correr %cmdRing con continuaci\u00F3n',
    'call %cmdRing w/continuation':
        'llamar %cmdRing con continuaci\u00F3n',
    'warp %c':
        'ejecutar en modo turbo %c',

    // sensing:
    'touching %col ?':
        '\u00BFtocando %col ?',
    'touching %clr ?':
        '\u00BFtocando el color %clr ?',
    'color %clr is touching %clr ?':
        '\u00BFcolor %clr tocando %clr ?',
    'ask %s and wait':
        'preguntar %s y esperar',
    'what\'s your name?':
        '\u00BFC\u00F3mo es tu nombre?',
    'answer':
        'respuesta',
    'mouse x':
        'x del mouse',
    'mouse y':
        'y del mouse',
    'mouse down?':
        '\u00BFrat\u00F3n abajo?',
    'key %key pressed?':
        '\u00BFtecla %key presionada?',
    'distance to %dst':
        'distancia a %dst',
    'reset timer':
        'reiniciar cron\u00F3metro',
    'timer':
        'cron\u00F3metro',
    'http:// %s':
        'http:// %s',

    'filtered for %clr':
        'filtrado para %clr',
    'stack size':
        'tama\u00F1o de pila',
    'frames':
        'marcos',

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
    'hello':
        'hola',
    'world':
        'mundo',
    'split %s by %delim':
        'separar %s por %delim',
    'letter %n of %s':
        'letra %n de %s',
    'length of %s':
        'longitud de %s',
    'unicode of %s':
        'UniC\u00F3digo de  %s',
    'unicode %n as letter':
        'UniC\u00F3digo %n como letra',
    'is %s a %typ ?':
        '\u00BFes %s un %typ ?',
    'is %s identical to %s ?':
        '\u00BFes %s id\u00E9ntico a %s ?',
    'JavaScript function ( %mult%s ) { %code }':
        'Función JavaScript  ( %mult%s ) { %code }',

    'type of %s':
        'tipo de %s',

    // variables:
    'Make a variable':
        'Crear una variable',
    'Variable name':
        'Nombre de variable',
    'Delete a variable':
        'Borrar una variable',

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
    'thing':
        'cosa',
    'add %s to %l':
        'agregar %s a %l',
    'delete %ida of %l':
        'borrar %ida de %l',
    'insert %s at %idx of %l':
        'insertar %s en %idx de %l',
    'replace item %idx of %l with %s':
        'reemplazar elemento %idx de %l con %s',
    'copy of %l':
        'copiar de %l',
    'get text from %l seperated by %s':
        'tomar texto de %l separado por %s',

    // other
    'Make a block':
        'Crear un bloque',

    // menus
    // snap menu
    'About...':
        'Acerca de...',
    'Snap! website':
        'Sitio Web de Snap!',
    'Download source':
        'Bajar recurso',
    'Switch back to user mode':
        'Regresar a modo de usuario',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'inhabilitar men\u0075s contextuales de Morphic\ny mostrar unos f\u0061ciles de utilizar',
    'Switch to dev mode':
        'Cambiar a modo de elaborador',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'habilitar men\u0075s contextuales\n e inspectores de Morphic,\n\u00A1no son f\u0061ciles de utilizar! ',

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
        'men\u00FA de archivo de importaci\u00F3n indirecta',
    'Export project as plain text...':
        'Exportar proyecto como texto...',
    'Export project...':
        'Exportar proyecto...',
    'show project data as XML\nin a new browser window':
        'mostrar informaci\u00F3n de proyecto como XML\nen una nueva ventana',
    'Export blocks...':
        'Exportar bloques...',
    'show global custom block definitions as XML\nin a new browser window':
        'mostrar definiciones de bloques globales personalizados como XML\nen una nueva ventana',
        'Export summary...':
        'Resumen de exportación...',
    'Import tools':
        'Herramientas de importaci\u00F3n',
    'load the official library of\npowerful blocks':
        'cargar la biblioteca oficial de\nbloques potentes',
    'Libraries...':
        'Bibliotecas...',
        
    // settings menu
    'Language...':
        'Idioma...',
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
        'desmarcar para inhabilitar etiquetas\ndin\u00E1micas para entradas vari\u00E1dicas',
    'check to enable dynamic\nlabels for variadic inputs':
        'marcar para habilitar etiquetas\ndin\u00E1micas para entradas vari\u00E1dicas',
    'Prefer empty slot drops':
        'Preferir ranuras de gotas vac\u00EDas',
    'settings menu prefer empty slots hint':
        'men\u00FA de ajustes prefiere pistas de ranuras vac\u00EDas',
    'uncheck to allow dropped\nreporters to kick out others':
        'desmarcar para permitir reporteros\nca\u00EDdos para echar a otros',
    'Long form input dialog':
        'di\u00E1logo de entradas de forma larga',
    'check to always show slot\ntypes in the input dialog':
        'marcar para siempre mostrar tipos\nde espacios en el di\u00E1logo de insumo',
    'uncheck to use the input\ndialog in short form':
        'desmarcar para usar el di\u00E1logo\nde insumo en forma corta',
    'Virtual keyboard':
        'Teclado virtual',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'desmarcar para inhabilitar\nsoporte al teclado virtual\npara dispositivos m\u00F3viles',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'marcar para habilitar\nsoporte para el teclado virtual\npara dispositivos m\u00F3viles',
    'Input sliders':
        'Deslizadores de insumo',
    'uncheck to disable\ninput sliders for\nentry fields':
        'desmarcar para inhabilitar\ndeslizadores de insumo para\ncampos de entrada',
    'check to enable\ninput sliders for\nentry fields':
        'marcar para habilitar\ndeslizadores de entrada para\ncampos de entrada',
    'Clicking sound':
        'Sonido de clic',
    'uncheck to turn\nblock clicking\nsound off':
        'desmarcar para encender\nbloquear clic\napagar sonido',
    'check to turn\nblock clicking\nsound on':
        'marcar para encender\nbloque de clic\nencender sonido',
    'Animations':
        'Animaciones',
    'uncheck to disable\nIDE animations':
        'desmarcar para inhabilitar\nanimaciones del IDE',
    'check to enable\nIDE animations':
        'marcar para habilitar\nanimaciones del IDE',
    'Thread safe scripts':
        'Programas seguros para uso paralelo',
    'uncheck to allow\nscript reentrancy':
        'desmarcar para permitir\nreingreso de programa',
    'check to disallow\nscript reentrancy':
        'marcar para no permitir\nreingreso de programa',

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

    // blocks:
    'help...':
        'ayuda...',
    'relabel...':
        'renombrar...',
    'duplicate':
        'duplicar',
    'make a copy\nand pick it up':
        'crear una copia y recogerla',
    'only duplicate this block':
        'duplicar s\u00F3lo este bloque',
    'delete':
        'borrar',
    'script pic...':
        'foto de programa...',
    'open a new window\nwith a picture of this script':
        'abrir una nueva ventana\ncon una foto de este programa',
    'ringify':
        'zumbar',
    'unringify':
        'deszumbar',

    // custom blocks:
    'delete block definition...':
        'borrar definici\u00F3n de bloque',
    'edit...':
        'editar...',

    // sprites:
    'edit':
        'editar',
    'export...':
        'exportar...',

    // stage:
    'show all':
        'mostrar todos',

    // scripting area
    'clean up':
        'limpiar',
    'arrange scripts\nvertically':
        'alinear programas\nverticalmente',
    'add comment':
        'agregar comentario',
    'make a block...':
        'crear un bloque...',

    // costumes
    'rename':
        'renombrar',
    'export':
        'exportar',
    'rename costume':
        'renombrar disfraz',
        
   // graphical effects
    'color':
        'Color',
    'fisheye':
        'Ojo de pez',
    'whirl':
        'Remolino',
    'pixelate':
        'Pixelado',
    'mosaic':
        'Mosaico',
    'saturation':
        'Saturación',
    'brightness':
        'Brillo',
    'ghost':
        'Fantasma',
    'negative':
        'Negativo',
    'comic':
        'Historieta',
    'confetti':
        'Confite',

    // sounds
    'Play sound':
        'Tocar sonido',
    'Stop sound':
        'Detener sonido',
    'Stop':
        'Detener',
    'Play':
        'Tocar',
    'rename sound':
        'renombrar sonido',

    // dialogs
    // buttons
    'OK':
        'OK',
    'Ok':
        'Ok',
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
    '(empty)':
        '(vacio)',
    'Saved!':
        '\u00A1Guardado!',
    'Delete Project':
        'Borrar Proyecto',
    'Are you sure you want to delete':
        '\u00BFEst\u00E1s seguro de que deseas borrar?',
    'rename...':
        'renombrar...',

    // costume editor
    'Costume Editor':
        'Editor de disfraz',
    'click or drag crosshairs to move the rotation center':
        'haz clic o arrastra punto de mira para mover el centro de rotaci\u00F3n',

    // project notes
    'Project Notes':
        'Notas del proyecto',

    // new project
    'New Project':
        'Nuevo Proyecto',
    'Replace the current project with a new one?':
        '\u00BFReemplazar este proyecto con uno nuevo?',

    // save project
    'Save Project As...':
        'Guardar Proyecto Como...',

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

    // variable dialog
    'for all sprites':
        'para todos los objetos',
    'for this sprite only':
        'para este objeto solamente',

    // block dialog
    'Change block':
        'Cambiar bloque',
    'Command':
        'Comando',
    'Reporter':
        'Reportero',
    'Predicate':
        'Condición',

    // block editor
    'Block Editor':
        'Editor de bloques',
    'Apply':
        'Aplicar',

    // block deletion dialog
    'Delete Custom Block':
        'Borrar Bloque Personalizado',
    'block deletion dialog text':
        'texto de di\u00E1logo de borrado de bloque',

    // input dialog
    'Create input name':
        'Crear nombre de entrada',
    'Edit input name':
        'Editar nombre de entrada',
    'Edit label fragment':
        'Editar fragmento de etiqueta',
    'Title text':
        'Texto de t\u00EDtulo',
    'Input name':
        'Ingresar nombre',
    'Delete':
        'Borrar',
    'Object':
        'Objeto',
    'Number':
        'N\u00FAmero',
    'Text':
        'Texto',
    'List':
        'Lista',
    'Any type':
        'Cualquier tipo',
    'Boolean (T/F)':
        'Booleano (C/F)',
    'Command\n(inline)':
        'Comando\n(en l\u00EDnea)',
    'Command\n(C-shape)':
        'Comando\n(forma C)',
    'Any\n(unevaluated)':
        'Cualquier\n(sin evaluar)',
    'Boolean\n(unevaluated)':
        'Booleano\n(sin evaluar)',
    'Single input.':
        'Entrada sola.',
    'Default Value:':
        'Valor Predeterminado:',
    'Multiple inputs (value is list of inputs)':
        'M\u00FAltiples entradas (valor es lista de insumos)',
    'Upvar - make internal variable visible to caller':
        'Hacer que la variable interna sea visible al llamador',

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
        'valor m\u00EDnimo de deslizador...',
    'slider max...':
        'valor m\u00E1ximo de deslizador...',
    'Slider minimum value':
        'valor m\u00EDnimo valor de deslizador',
    'Slider maximum value':
        'valor m\u00E1ximo valor de deslizador',

    // list watchers
    'length: ':
        'longitud: ',

    // coments
    'add comment here...':
        'agregar comentario aqu\u00ED',

    // drow downs
    // directions
    '(90) right':
        '(90) derecha',
    '(-90) left':
        '(-90) izquierda',
    '(0) up':
        '(0) arriba',
    '(180) down':
        '(180) abajo',

    // collision detection
    'mouse-pointer':
        'puntero del mouse',
    'edge':
        'borde',
    'pen trails':
        'rastro del l\u00E1piz',

    // costumes
    'Turtle':
        'Tortuga',

    // graphical effects
    'ghost':
        'fantasma',

    // keys
    'space':
        'espacio',
    'up arrow':
        'flecha de arriba',
    'down arrow':
        'flecha de abajo',
    'right arrow':
        'flecha derecha',
    'left arrow':
        'flecha izquierda',
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

    // messages
    'new...':
        'crear nuevo mensaje...',

    // math functions
    'abs':
        'abs',
    'ceiling':
        'redondear hacia arriba',
    'floor':
        'redondear hacia abajo',
    'sqrt':
        'ra\u00EDz cuadrada',
    'sin':
        'sen',
    'cos':
        'cos',
    'tan':
        'tan',
    'asin':
        'asen',
    'acos':
        'acos',
    'atan':
        'atan',
    'ln':
        'ln',
    'e^':
        'e^',

     // delimiters
    'letter':
        'Letra',
    'whitespace':
        'Espacio',
    'line':
        'Línea',
    'tab':
        'Tabulador',
    'cr':
        'Retorno de línea',
    'csv':
        'Coma',
        
    // data types
    'number':
        'n\u00FAmero',
    'text':
        'texto',
    'Boolean':
        'Booleano',
    'list':
        'lista',
    'command':
        'comando',
    'reporter':
        'reportero',
    'predicate':
        'predicado',

    // list indices
    'last':
        '\u00FAltimo',
    'any':
        'cualquier',
        
    // attributes
    'neighbors':
        'vecinos',
    'self':
        'yo mismo',
    'other sprites':
        'otros Objetos',
    'parts':
        'partes',
    'anchor':
        'anclaje',
    'parent':
        'padre',
    'children':
        'hijo',
    'clones':
        'clones',
    'other clones':
        'otros clones',
    'dangling?':
        'colgado?',
    'rotation x':
        'rotación x',
    'rotation y':
        'rotación y',
    'center x':
        'centro x',
    'center y':
        'centro y',
    'name':
        'nombre',
    'stage':
        'escenario',
    'costumes':
        'disfraces',
    'sounds':
        'sonidos',
    'scripts':
        'scripts',
        
    // MISSING UPSTREAM:
        
	'when I am %interaction':
		'Cuando soy %interaction',
	'clicked':
        'cliqueado',
    'pressed':
        'presionado',
    'dropped':
        'soltado',
    'mouse-entered':
        'pasado el mouse por encima sin cliquear',
    'mouse-departed':
        'pasado el mouse por encima sin cliquear y luego alejar',
        
    'stop %stopChoices':
        'detener %stopChoices',
    'all':
        'todos',
    'this script':
        'este script',
    'this block':
        'este bloque',
    'stop %stopOthersChoices':
        'detener %stopOthersChoices',
    'all but this script':
        'todos excepto este script',
    'other scripts in sprite':
        'otros scripts del objeto',
    'pause all %pause':
        'pausar todos %pause',
    
      
    'when I start as a clone':
        'Al comenzar como clon',
    'create a clone of %cln':
        'crear clon de %cln',
    'myself':
        'mío',
     'a new clone of %cln':
        'un nuevo clon de %cln',
    'delete this clone':
        'eliminar este clon',
        
    // under "broadcast %msg and wait"
    'message':
        'mensaje',
        
    'turbo mode?':
        'modo turbo?',
    'set turbo mode to %b':
         'fijar modo turbo a %b',
    'current %dates':
         '%dates actual',
    'year':
        'año',
    'month':
        'mes',
    'date':
        'fecha',
    'day of week':
        'día de la semana',
    'hour':
        'hora',
    'minute':
        'minuto',
    'second':
        'segundo',
    'time in milliseconds':
        'tiempo en milisegundos',
        
    // under "graphical effects"
    'brightness':
        'brillo',
    'negative':
        'negativo',
    'comic':
        'historieta',
    'confetti':
        'confite',
        
    // under "Input sliders"
    'Plain prototype labels':
        'Etiquetas de prototipo planas',
    'Turbo mode':
        'Modo turbo',
    'Flat design':
        'Diseño plano',
    'Keyboard Editing':
        'Edición de teclado',
    'Prefer smooth animations':
        'Preferir animaciones suaves',
    'Flat line ends':
        'Bordes de línea planos',
    'Codification support':
        'Soporte de codificación',
    'Inheritance support':
        'Soporte de herencia',
    'Zoom blocks...':
        'Agrandar bloques...',
        
    // SCRIBBLE:
    
    'point to x: %n y: %n':
        'apuntar hacia x: %n y: %n',
    'go to random location':
        'ir a una dirección al azar',
    'point in direction %n':
        'apuntar en dirección %n',
        
    'get pen alpha':
        'tomar lápiz alfa',
    'change pen alpha by %n':
        'cambiar lápiz alfa por %n',
    'set pen alpha to %n':
        'cambiar lápiz alfa a %n',
    'get pen color string':
        'tomar color de lápiz del texto',
    'set pen color string %s':
        'fijar color de lápiz del texto %s',
    'pen down?':
        'lápiz abajo?',
        
    'when %keyHat key released':
        'Al soltar tecla %keyHat',
        
    // text:
    'draw text %s':
		    'dibujar texto %s',
    'set text color to %clr':
		    'setear color texto a %clr',
    'set text color string %n':
		    'setear valor color texto a %n',
    'change text hue by %n':
		    'cambiar luminosidad texto por %n',
    'change text shade by %n':
		    'cambiar sombreado de texto por %n',
    'change text alpha by %n':
		    'cambiar transparencia texto por %n',
    'set text alpha to %s':
            'setear transparencia texto a %s',
    'set text shade to %n':
		    'setear sombreado de texto a %n',
    'set text hue to %n':
		    'setear luminosidad texto a %n',
    'get text hue':
		    'tomar luminosidad texto',
    'get text shade':
		    'tomar sombreado texto',
    'get text alpha':
		    'tomar transparencia texto',
    'get text color string':
		    'tomar texto de color texto',
    'set font to %font':
		    'setear fuente a %font',
    'set font size to %n':
		    'setear tamaño de fuente a %n',
        

    // shapes:
    'start shape':
            'comenzar figura',
    'end shape':
            'finalizar figura',
    'set fill color to %clr':
            'setear color de relleno a %clr',
    'set fill color string %s':
		    'setear texto de color de relleno %s',
    'change fill hue by %n':
		    'cambiar luminosidad de relleno por %n',
    'set fill hue to %n':
		    'seterar luminosidad de relleno a %n',
    'get fill hue':
		    'tomar luminosidad de relleno',
    'change fill shade by %n':
		    'cambiar sombreado de relleno por %n',
    'get fill shade':
		    'tomar sombreado de relleno',
    'set fill shade to %n':
		    'setear sombreado de relleno a %n',
    'change fill alpha by %n':
		    'cambiar alfa relleno por %n',
    'get fill alpha':
		    'obtener alfa relleno',
    'get fill color string':
		    'obtener texto de color de relleno',
    'set fill alpha to %n':
		    'setear alfa relleno a %n',
    'draw circle radius %n':
		    'dibujar círculo de radio %n',
    'draw oval radius %n by %n':
		    'dibujar óvalo de radio %n por %n',
    'draw rectangle %n by %n':
		    'dibujar rectángulo %n por %n',
    'Drawn shapes and pen strokes are\ncleared with the same block. It is\nadded here for convenience:':
		    'Las figuras dibujadas y el relleno de los lápices se\nborran con el mismo bloque. Se agrega \nacá por conveniencia:',
        
    // CELLULAR:
    
    // Titles.
    'Neighbours':
        'Vecinas',
    'Cells':
        'Celdas',
    'Objects':
        'Objetos',
    'Shapes':
        'Figuras',
        
    // Movement:
    'cell X':
        'celda X',
    'cell Y':
        'celda Y',
    'move to nbr cell':
        'mover a celda vecina',
    'move to empty nbr cell':
        'mover a celda vcn vacía',
    'move to any cell':
        'mover a cualquier celda',
    'move to any empty cell':
        'mover a una celda vacía',
    'move to cell at cell x: %n cell y: %n':
        'mover a celda en celda x: %n celda y: %n',
    'snap to centre of cell':
        'ubicar en centro de la celda',
        
    // control:
    'instance count of %cln':
        'cantidad de instancias de %cln',
    'last created clone':
        'último clon creado',
     'tell %spr to %cl':
         'decirle a %spr que %cl',
     'ask %spr for %repRing':
         'pedir a %spr para %repRing',

    // sensing:
    'system time':
        'hora del sistema',

    // cells
    'Make a cell attribute':
        'Crear atributo de celda',
    'Delete a cell attribute':
        'Eliminar atributo de celda',
    
    // "Show [] to []"
    'Show':
        'Mostrar',
    "to": 
        "a",
           
    'cells X':
            'celdas X',
    'cells Y':
            'celdas Y',
    'show cell attribute %clat':
		    'mostrar atributo de celda %clat',
    'hide cell attribute %clat':
		    'ocultar atributo de celda %clat',
    'value of %clat at x: %n y: %n':
		    'valor de %clat en x: %n y: %n',
    'Cell attribute name':
		    'Nombre de atributo de celda',
    'value of %clat at cell x: %n cell y: %n':
		    'valor de %clat en celda x: %n celda y: %n',
    'value of %clat here':
		    'valor de %clat acá',
    'average value of %clat':
		    'valor promedio de %clat',
    'minimum value of %clat':
		    'valor mínimo de %clat',
    'maximum value of %clat':
		    'valor máximo de %clat',
    'set %clat at x: %n y: %n to %n':
		    'setear %clat en x: %n y: %n a %n',
    'set %clat at cell x: %n cell y: %n to %n':
		    'setear %clat en celda x: %n celda y: %n a %n',
    'set %clat here to %n':
		    'setear %clat acá a %n',
    'set %clat everywhere to %n':
		    'setear %clat en todos lados a %n',
    'change %clat at x: %n y: %n by %n':
		    'cambiar %clat en x: %n y: %n por %n',
    'change %clat at cell x: %n cell y: %n by %n':
		    'cambiar %clat en celda x: %n celda y: %n por %n',
    'change %clat here by %n':
		    'cambiar %clat acá por %n',
    'change %clat everywhere by %n':
		    'cambiar %clat en todos lados por %n',

    // objects:
    'nobody':
		    'nadie',
    'this':
		    'este',
    '%obj is this':
		    '%obj es éste',
    '%obj is nobody':
		    '%obj es nadie',
    'set var %s to %s in %obj':
		    'setear var %s a %s en %obj',
    'get var %s in %obj':
		    'tomar var %s en %obj',
    'change var %s by %s in %obj':
		    'cambiar var %s por %s en %obj',
    'scale to cell size':
		    'escalar a tamaño de celda',
    'costume name':
		    'nombre de disfraz',
    'costume name of %obj':
		    'nombre de disfraz de %obj',
    'costume # of %obj':
		    'disfraz # de %obj',
    'type of %obj':
		    'tipo de %obj',
    '%obj is a %spr':
		    '%obj es un %spr',
    'obliterate %obj':
		    'destruir %obj',
    'list of all %cln':
		    'lista de todos los %cln',
    'x position of %obj':
		    'posición x de %obj',
    'y position of %obj':
		    'posición y de %obj',
    'cell x position of %obj':
		    'posición celda x de %obj',
    'cell y position of %obj':
		    'posición celda y de %obj',
    'move %obj to x: %n y: %n':
		    'mover %obj a x: %n y: %n',
    'move %obj to cell x: %n cell y: %n':
		    'mover %obj a celda x: %n celda y: %n',
    'nearest %cln to x: %n y: %n where %predRing':
		    '%cln más cerca de x: %n y: %n donde %predRing',
    'nearest %cln to myself':
		    '%cln más cerca mío',
		
    // neighbours:
    'above':
		    'arriba',
    'top left':
		    'arriba izquierda',
    'top right':
		    'arriba derecha',
    'left':
		    'izquierda',
    'right':
		    'derecha',
    'below':
		    'abajo',
    'bottom left':
		    'abajo izquierda',
    'bottom right':
		    'abajo derecha',
    'object in cell %celldir':
		    'objeto en celda %celldir',
    'object in cell cellX: %n cellY: %n':
		    'objeto en celda cellX: %n cellY: %n',
    'object in cell x: %n y: %n':
		    'objeto en celda x: %n y: %n',
    'objects in cell %celldir':
		    'objetos en celda %celldir',
    'objects in cell cellX: %n cellY: %n':
		    'objetos en celda celdaX: %n celdaY: %n',
    'objects in cell x: %n y: %n':
		    'objetos en celda x: %n y: %n',
    'list of objects in nbr cells':
		    'lista de objetos en celdas vcns',
    '# object %spr in nbr cells':
		    '# objecto %spr en celdas vcns',
    '# costume %cst in nbr cells':
		    '# disfraz %cst en celdas vcns',
    'is costume %cst in cell %celldir':
		    'hay un disfraz %cst en celda %celldir',
    'is object %spr in cell %celldir':
		    'hay un objeto %spr en celda %celldir',
    'is any object in cell %celldir':
		    'hay algún objeto en celda %celldir',
    'is costume %cst in all nbr cells':
		    'hay disfraz %cst en todas las celdas vcns',
		
    'is object %spr in all nbr cells':
     		'es objeto %spr en todas las celdas vcns', 
    'is an object in every nbr cell':
		    'es objeto en cada celda vcn',
    'number of filled nbr cells':
     		'cantidad de celdas vcns llenas',

    // New variable dialog "global" type radio button.
    "global": "para todos los objetos",
    
    // New variable dialog "for each instance of this sprite" type radio button.
    "for each instance of this sprite": "para cada instancia de este objeto",
    
    // to plot the value of a variable
    "plot": "graficar",
    
    // used to plot the value of a variable (show variable, right click on the little watcher, "plot...")
    "plot...": "graficar...",
    
    // Default name of a variable in the Objects panel.
    "varName": "NomVar",
    
    // default cell attribute name
    "CellAttr1": "AtrCelda1",
        
    // hover text for draw button under stage
    "draw to cell attributes": "pintar atributo en celdas",
    
    // label for setting draw brush radius
    "cell radius:": "radio de celda:",
    
    // hover text for setting draw brush radius
    "brush size (in cells)": "tamaño pincel (en celdas)",
    
    // label for setting brush hardness
    "hard:": "trazo:",
    
    // hover text for setting brush hardness
    "brush hardness (0-1)": "dureza trazo (0-1)",
    
    // label for setting brush value
    "value:": "valor:",
    
    // hover text for setting brush value
    "brush value": "valor pincel",
    
    // label for setting brush attribute
    "attribute:": "atributo:",
    
    // hover text for setting brush attribute
    "attribute": "atributo",
    
    // label for setting grid size
    "grid size:": "tamaño grilla:",
    
    // hover text for setting grid size
    "grid size": "tamaño grilla",
    
    // hover text for clear button
    "clear current cell attribute": "borrar atributo actual de celda",
    
    // default cell query text
    "(hover to query)": "(mouse encima para ver valor)",
    
    // the "at" in "CellAttr1 at (1, 2) = 30". Used in query text.
    "at": "en",
};
