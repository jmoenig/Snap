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
        'V\u00EDctor Manuel Muratalla Morales', // your name for the Translators tab
    'translator_e-mail':
        'victor.muratalla@yahoo.com', // optional
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
        'Objetos',
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
        'importar una foto de otro sitio Webo desde\n'
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
        'Escenario seleccionado:\nno primitivos de movimiento\n'
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
        'cambiar el disfraz a %cst',
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
    'Hello!':
        '\u00A1Hola!',
    'Hmm...':
        'mmm...',
    'change %eff effect by %n':
        'cambiar %eff efecto por %n',
    'set %eff effect to %n':
        'fijar %eff efecto a %n',
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
    'play note %n for %n beats':
        'tocar nota %n por %n pulsos',
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

    // control:
    'when %greenflag clicked':
        'Al presionar %greenflag',
    'when %keyHat key pressed':
        'Al presionar tecla %keyHat',
    'when I am clicked':
        'Al presionar Objeto',
    'when I receive %msgHat':
        'Al recibir %msgHat',
    'broadcast %msg':
        'enviar mensaje %msg',
    'broadcast %msg and wait':
        'enviar mensaje %msg y esperar',
    'Message name':
        'Nombre de mensaje',
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
        '\u00BFCu\u00E1l es tu nombre?',
    'answer':
        'respuesta',
    'mouse x':
        'x del rat\u00F3n',
    'mouse y':
        'y del rat\u00F3n',
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
        '%n mod %n',
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

    'type of %s':
        'tipo de %s',

    // variables:
    'Make a variable':
        'Crear un variable',
    'Variable name':
        'Nombre de variable',
    'Delete a variable':
        'Borrar un variable',

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
        'agregar %s a %l hinzu',
    'delete %ida of %l':
        'borrar %ida de %l',
    'insert %s at %idx of %l':
        'insertar %s en %idx de %l',
    'replace item %idx of %l with %s':
        'remplazar elemento %idx de %l con %s',

    // other
    'Make a block':
        'Crear un bloque',

    // menus
    // snap menu
    'About...':
        'Acerca de...',
    'Snap! website':
        'Sitio web de Snap!',
    'Download source':
        'Bajar recurso',
    'Switch back to user mode':
        'Regresar a modo de usuario',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'inhabilitar M\u00F3rfica-profunda\nmen\u0075s contextuales\ny mostrar unos f\u0061ciles de utilizar',
    'Switch to dev mode':
        'Cambiar a modo de elaborador',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'habilitar men\u0075s \nM\u00F3rficos contextuales\n e inspectores,\n\u00A1no f\u0061ciles de utilizar! ',

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
    'Import tools':
        'Herramientas de importaci\u00F3n',
    'load the official library of\npowerful blocks':
        'cargar la biblioteca oficial de\nbloques poderosos',

    // settings menu
    'Language...':
        'Idioma...',
    'Blurred shadows':
        'Sombras borrosas',
    'uncheck to use solid drop\nshadows and highlights':
        'desmarque para usar sombras s\u00F3lidas \ne iluminaciones',
    'check to use blurred drop\nshadows and highlights':
        'marcar para usar sombras borrosas\ne iluminaciones',
    'Zebra coloring':
        'Coloraci\u00F3n de cebra',
    'check to enable alternating\ncolors for nested blocks':
        'marcar para habilitar alternaci\u00F3n\nde colores para bloques anidados',
    'uncheck to disable alternating\ncolors for nested block':
        'desmarcar para inhabilitar alternaci\u00F3n\nde colores para bloques anidados',
    'Dynamic input labels':
        'Etiquetas de entradas din\u00E1micas',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'desmarcar para inhabilitar etiquetas\ndin\u00E1micas para entradas varidic',
    'check to enable dynamic\nlabels for variadic inputs':
        'marcar para habilitar etiquetas\ndin\u00E1micas para entradas varidic',
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
        'desmarcar para inhabilitar\nanimaciones IDE',
    'check to enable\nIDE animations':
        'marcar para habilitar\nanimaciones IDE',
    'Thread safe scripts':
        'Programas seguros para serie',
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
        's\u00F3lo duplicar este bloque',
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
        'Si',
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
        '\u00BFEst\u00E1s seguro que deseas borrar?',
    'rename...':
        'renombrar...',

    // costume editor
    'Costume Editor':
        'Editor de disfraz',
    'click or drag crosshairs to move the rotation center':
        'da clic o arrastra punto de mira para mover el centro de rotaci\u00F3n',

    // project notes
    'Project Notes':
        'Notas de proyecto',

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
        'este proyecto no tiene ning\u00FAn bloque personalizado todab\u00EDa',
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
        'Predicado',

    // block editor
    'Block Editor':
        'Bloquear editor',
    'Apply':
        'Aplicar',

    // block deletion dialog
    'Delete Custom Block':
        'Borrar Bloque Personalizado',
    'block deletion dialog text':
        'supreci\u00F3n de bloque de texto de di\u00E1logo',

    // input dialog
    'Create input name':
        'Crear nombre de insumo',
    'Edit input name':
        'Editar nombre de insumo',
    'Edit label fragment':
        'Editar fragmento de etiqueta',
    'Title text':
        'Texto de t\u00EDtulo',
    'Input name':
        'Nombre de insumo',
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
        'Crear variable interno visible al llamador',

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
        'Creditos...',
    'Translators...':
        'Traductores',
    'License':
        'Licencia',
    'current module versions:':
        'versiones del m\u00F3dulo actual',
    'Contributors':
        'Contribuidores',
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
        'm\u00EDnimo de deslizador...',
    'slider max...':
        'm\u00E1ximo de deslizador...',
    'Slider minimum value':
        'm\u00EDnimo valor de deslizador',
    'Slider maximum value':
        'm\u00E1ximo valor de deslizador',

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
        'puntero del rat\u00F3n',
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
        'nuevo...',

    // math functions
    'abs':
        'abs',
    'sqrt':
        'ra\u00EDz cuadrada',
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
        'cualquier'
};
