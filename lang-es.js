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
        'Importar herramientas',
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
        '¡EXPERIMENTAL! desmarcar para inhabilitar las\nestructuras de control personalizadas en vivo',
    'EXPERIMENTAL! check to enable\n live custom control structures':
        '¡EXPERIMENTAL! marcar para habilitar las\nestructuras de control personalizadas en vivo',

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
        'Tamaño del escenario',
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
};
