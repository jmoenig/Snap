/*

    lang-gl.js

    galician translation for SNAP!

    written by Jens Mönig

    Copyright (C) 2019 by Jens Mönig

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
        gl - Galician  => => SnapTranslator.dict.gl = {

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
        gl - Galician => => lang-gl.js

    and send it to me emfor inclusion in the official Snap! distribution.
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

SnapTranslator.dict.gl = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    Ä, ä   \u00c4, \u00e4
    Ö, ö   \u00d6, \u00f6
    Ü, ü   \u00dc, \u00fc
    ß      \u00df
*/

    // translations meta information
    'language_name':
        'Galego', // the name as it should appear in the language menu
    'language_translator':
        'tecnoloxia <2016>,Miguel A. Bouzada <2019>', // your name for the Translators tab
    'translator_e-mail':
        'mbouzada@gmail.com, ', // optional
    'last_changed':
        '2019-07-29', // this, too, will appear in the Translators tab

    // GUI
    // control bar:
    'untitled':
        'sen título',
    'development mode':
        'modo de desenvolvemento',

    // categories:
    'Motion':
        'Movemento',
    'Looks':
        'Aparencia',
    'Sound':
        'Son',
    'Pen':
        'Lapis',
    'Control':
        'Control',
    'Sensing':
        'Sensores',
    'Operators':
        'Operadores',
    'Variables':
        'Variábeis',
    'Lists':
        'Listas',
    'Other':
        'Outros',

    // editor:
    'draggable':
        'arrastrábel',

    // tabs:
    'Scripts':
        'Programas',
    'Costumes':
        'Vestimentas',
    'Backgrounds':
        'Fondos',
    'Sounds':
        'Sons',

    // names:
    'Sprite':
        'Obxecto',
    'Stage':
        'Escenario',

    // rotation styles:
    'don\'t rotate':
        'non xira',
    'can rotate':
        'pode xirar',
    'only face left/right':
        'só mira á esquerda ou á dereita',

    // new sprite button:
    'add a new sprite':
        'engadir un novo obxecto',

    // tab help
    'costumes tab help':
        'Podes importar unha imaxe doutro sitio web ou do \n'
            + 'teu computador arrastrándoa aquí',
    'import a sound from your computer\nby dragging it into here':
        'Podes importar un son do teu computador arrastrándoo aquí',

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
        'Escenario seleccionado:\nnon hai primitivas de movemento\n'
            + 'dispoñíbeis',

    'move %n steps':
        'mover %n pasos',
    'turn %clockwise %n degrees':
        'xirar %clockwise %n graos',
    'turn %counterclockwise %n degrees':
        'xirar %counterclockwise %n graos',
    'point in direction %dir':
        'apuntar na dirección %dir',
    'point towards %dst':
        'apuntar cara a %dst',
    'go to x: %n y: %n':
        'ir a x: %n y: %n',
    'go to %dst':
        'ir a %dst',
    'glide %n secs to x: %n y: %n':
        'esvarar %n seg cara a x: %n y: %n',
    'change x by %n':
        'engadir %n á coordenada x',
    'set x to %n':
        'fixar x en %n',
    'change y by %n':
        'engadir %n á coordenada y',
    'set y to %n':
        'fixar y en %n',
    'if on edge, bounce':
        'rebotar se toca nun bordo',
    'x position':
        'posición x',
    'y position':
        'posición y',
    'direction':
        'dirección',

    // #Osix@

    'switch to costume %cst':
        'cambiar a vestimenta a %cst',
    'next costume':
        'seguinte vestimenta',
    'costume #':
        'vestimenta núm.',
    'say %s for %n secs':
        'dicir %s durante %n segs.',
    'say %s':
        'dicir %s',
    'think %s for %n secs':
        'pensar %s durante %n segs.',
    'think %s':
        'pensar %s',
    'Hello!':
        'Ola!',
    'Hmm...':
        'Mmm…',
    'change %eff effect by %n':
        'engadir ao efecto %eff o valor %n',
    'set %eff effect to %n':
        'fixar efecto %eff a %n',
    'clear graphic effects':
        'eliminar efectos gráficos',
    'change size by %n':
        'engadir %n % ao tamaño',
    'set size to %n %':
        'fixar o tamaño a %n %',
    'size':
        'tamaño',
    'show':
        'amosar',
    'hide':
        'agochar',
    'shown?':
        'visíbel?',
    'go to %layer layer':
        'enviar á capa %layer',
    'go back %n layers':
        'enviar atrás %n capas',

    'development mode \ndebugging primitives:':
        'Primitivas de depuración \ndo modo de desenvolvemento:',
    'console log %mult%s':
        'rexistrar %mult%s na consola',
    'alert %mult%s':
        'Amosar alerta con %mult%s',

    // sound:
    'play sound %snd':
        'reproducir son %snd',
    'play sound %snd until done':
        'reproducir son %snd ata rematar',
    'stop all sounds':
        'parar todos os sons',
    'rest for %n beats':
        'silencio durante %n pulsos',
    'play note %n for %n beats':
        'reproducir a nota %n durante %n pulsos',
    'set instrument to %inst':
        'fixar o instrumento a %inst',
    'change tempo by %n':
        'aumentar o tempo en %n',
    'set tempo to %n bpm':
        'fixar o tempo a %n bpm',
    'tempo':
        'tempo',

    // "instruments", i.e. wave forms
    '(1) sine':
        '(1) \u223F\u223F (onda sinusoidal)',
    '(2) square':
        '(2) \u238D\u238D (onda cadrada)',
    '(3) sawtooth':
        '(3) \u2A58\u2A58 (onda dente de serra)',
    '(4) triangle':
        '(4) \u22C0\u22C0 (onda triangular)',

    // pen:
    'clear':
        'limpar',
    'pen down':
        'baixar lapis',
    'pen up':
        'subir lapis',
    'pen down?':
        'lapis abaixo?',
    'set pen color to %clr':
        'fixar a cor do lapis a %clr',
    'change pen color by %n':
        'cambiar á cor do lapis a %n',
    'set pen color to %n':
        'fixar a cor do lapis a %n',
    'change pen %hsva by %n':
        'cambiar %hsva do lapis a %n',
    'set pen %hsva to %n':
        'fixar %hsva do lapis a %n',
    'change pen shade by %n':
        'cambiar á intensidade do lapis en %n',
    'set pen shade to %n':
        'fixar a intensidade en %n',
    'change pen size by %n':
        'cambiar o tamaño do lapis en %n',
    'set pen size to %n':
        'fixar o tamaño do lapis en %n',
    'set background color to %clr':
        'fixar a cor do fondo a %clr',
    'change background %hsva by %n':
        'cambiar %hsva do fondo en %n',
    'set background %hsva to %n':
        'fixar %hsva do fondo a %n',
    'stamp':
        'selar',
    'fill':
        'encher',

    // control:
    'when %greenflag clicked':
        'ao facer clic en %greenflag',
    'when %keyHat key pressed':
        'ao premer a tecla %keyHat',
    'when I am %interaction':
        'ao %interaction nesta personaxe',
    'clicked':
        'facer clic',
    'pressed':
        'premer',
    'dropped':
        'arrastrar e soltar',
    'mouse-entered':
        'tocar co rato',
    'mouse-departed':
        'separar o rato',
    'when %b':
        'cando %b',
    'when I receive %msgHat':
        'ao recibir %msgHat',
    'broadcast %msg':
        'enviar a todos %msg',
    'broadcast %msg and wait':
        'enviar a todos %msg e agardar',
    'Message name':
        'Nome da mensaxe',
    'message':
        'Mensaxe',
    'any message':
        'calquera mensaxe',
    'wait %n secs':
        'agardar %n s',
    'wait until %b':
        'agardar ata %b',
    'forever %loop':
        'por sempre %loop',
    'repeat %n %loop':
        'repetir %n %loop',
    'repeat until %b %loop':
        'repetir ata %b %loop',
    'for %upvar = %n to %n %cla':
        'para %upvar = %n ata %n %cla',
    'if %b %c':
        'se %b %c',
    'if %b %c else %c':
        'se %b %c se non %c',
    'if %b then %s else %s':
        'se %b entón %s se non %s',
    'report %s':
        'reportar %s',
    'stop %stopChoices':
        'parar %stopChoices',
    'all':
        'todo',
    'this script':
        'este programa',
    'this block':
        'este bloque',
    'stop %stopOthersChoices':
        'parar %stopOthersChoices',
    'all but this script':
        'todos os programas agás este',
    'other scripts in sprite':
        'outros programas no obxecto',
    'pause all %pause':
        'poñer en pausa todo %pause',
    'run %cmdRing %inputs':
        'executar %cmdRing %inputs',
    'launch %cmdRing %inputs':
        'iniciar %cmdRing %inputs',
    'call %repRing %inputs':
        'chamar %repRing %inputs',
    'run %cmdRing w/continuation':
        'executar %cmdRing con continuación',
    'call %cmdRing w/continuation':
        'chamar %cmdRing con continuación',
    'warp %c':
        'Executar %c de súpeto',
    'when I start as a clone':
        'cando comece como clon',
    'create a clone of %cln':
        'crear un clon de %cln',
    'a new clone of %cln':
        'un novo clon de %cln',
    'myself':
        'eu mesmo',
    'delete this clone':
        'eliminar este clon',
    'tell %spr to %cmdRing %inputs':
        'dicir a %spr que %cmdRing %inputs',
    'ask %spr for %repRing %inputs':
        'preguntar a %spr por %repRing %inputs',

    // sensing:
    'touching %col ?':
        'tocando %col ?',
    'touching %clr ?':
        'tocando na cor %clr ?',
    'color %clr is touching %clr ?':
        'a cor %clr está a tocar na cor %clr ?',
    'ask %s and wait':
        'preguntar %s e agardar pola resposta',
    'what\'s your name?':
        'como te chamas?',
    'answer':
        'resposta',
    'mouse x':
        'coordenada x do rato',
    'mouse y':
        'coordenada y do rato',
    'mouse down?':
        'botón do rato premido?',
    'key %key pressed?':
        'tecla %key premida?',
    'distance to %dst':
        'distancia ata %dst',
    'reset timer':
        'reiniciar o cronómetro',
    'timer':
        'cronómetro',
    '%att of %spr':
        '%att de %spr',
    'my %get':
        'o() meu(s) %get',
    'http:// %s':
        'o recurso http:// %s',
    'turbo mode?':
        'modo turbo?',
    'set turbo mode to %b':
        'cambiar o modo turbo a %b',
    'is %setting on?':
        'está o parámetro %setting activado?',
    'set %setting to %b':
        'fixar o parámetro %setting a %b',
    'turbo mode':
        'modo turbo',
    'flat line ends':
        'puntas do lapis rectas',
    'video %vid on %self':
        '%vid do vídeo en %self',
    'motion':
        'movemento',
    'snap':
        'instantánea',
    'set video transparency to %n':
        'fixar a transparencia do vídeo a %n',
    'video capture':
        'captura de vídeo',
    'mirror video':
        'espello sobre o vídeo',
    'filtered for %clr':
        'filtrado para %clr',
    'stack size':
        'altura da morea',
    'frames':
        'marcos',
    'object %self':
        'obxecto %self',

    // operators:
    '%n mod %n':
        'o resto de %n ao dividilo entre %n',
    'round %n':
        'arredondar %n',
    '%fun of %n':
        '%fun de %n',
    'pick random %n to %n':
        'número ao chou entre %n e %n',
    '%b and %b':
        '%b e %b',
    '%b or %b':
        '%b ou %b',
    'not %b':
        'non %b',
    'true':
        'verdadeiro',
    'false':
        'falso',
    'join %words':
        'xuntar %words',
    'split %s by %delim':
        'lista cos anacos de %s entre %delim',
    'hello':
        'ola',
    'world':
        'mundo',
    'letter %idx of %s':
        'letra %idx de %s',
    'length of %s':
        'lonxitude de %s',
    'unicode of %s':
        'código Unicode do carácter %s',
    'unicode %n as letter':
        'carácter cuxo código Unicode é %n',
    'is %s a %typ ?':
        '%s é un/unha %typ ?',
    'is %s identical to %s ?':
        '%s é idéntico a %s ?',

    'type of %s':
        'tipo de %s',

    // variables:
    'Make a variable':
        'Crear unha variábel',
    'Variable name':
        'Nome da variábel',
    'Script variable name':
        'Nome da variábel do programa',
    'inherit %shd':
        'herdar %shd',
    'Delete a variable':
        'Eliminar unha variábel',

    'set %var to %s':
        'fixar %var a %s',
    'change %var by %n':
        'aumentar %var en %n',
    'show variable %var':
        'amosar a variábel %var',
    'hide variable %var':
        'agochar a variábel %var',
    'script variables %scriptVars':
        'variábeis de programa %scriptVars',

    // lists:
    'list %exp':
        'lista %exp',
    'numbers from %n to %n':
        'números dende %n a %n',
    '%s in front of %l':
        'inserir %s ao principio de %l',
    'item %idx of %l':
        'elemento %idx de %l',
    'all but first of %l':
        '%l sen o primeiro elemento',
    'length of %l':
        'lonxitude de %l',
    '%l contains %s':
        '%l contén %s',
    'thing':
        'cousa',
    'is %l empty?':
        '%l baleira?',
    'map %repRing over %l':
        'asignar %repRing sobre %l',
    'keep items %predRing from %l':
        'manter os elementos onde %predRing de %l',
    'find first item %predRing in %l':
        'primeiro elemento onde %predRing de %l',
    'combine %l using %repRing':
        'combina os elementos de %l con %repRing',
    '%blitz map %repRing over %l':
        '%blitz asignar %repRing sobre %l',
    '%blitz keep items %predRing from %l':
        '%blitz mantér os elementos onde %predRing de %l',
    '%blitz find first item %predRing in %l':
        '%blitz primeiro elemento onde %predRing de %l',
    '%blitz combine %l using %repRing':
        '%blitz combinar os elementos de %l con %repRing',
    'for each %upvar in %l %cla':
        'para cada %upvar de %l %cla',
    'item':
        'elemento',
    'add %s to %l':
        'engadir %s á lista %l',
    'delete %ida of %l':
        'eliminar %ida da lista %l',
    'insert %s at %idx of %l':
        'inserir %s na posición %idx de %l',
    'replace item %idx of %l with %s':
        'substituír %idx de %l por %s',

    // other
    'Make a block':
        'Crear un bloque',

    // menus
    // snap menu
    'About...':
        'Sobre…',
    'Reference manual':
        'Manual de referencia',
    'Snap! website':
        'Sitio web do Snap!',
    'Download source':
        'Descargar o código fonte',
    'Switch back to user mode':
        'Volver ao modo usuario/a',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'Desactivar os menús de\ncontextodo «Morphic»\nprofundo e amosar menús\namigábeis.',
    'Switch to dev mode':
        'Cambiar a modo de desenvolvemento',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'Activar os menús\nde contexto e\n os inspectores do «Morphic»,\nnon amigábeis.',

    // project menu
    'Project notes...':
        'Notas do proxecto…',
    'New':
        'Novo',
    'Open...':
        'Abrir…',
    'Save':
        'Gardar',
    'Save to disk':
        'Gardar no disco',
    'store this project\nin the downloads folder\n(in supporting browsers)':
        'Gardar este proxecto\nno cartafol de descargas\n'
            + '(nos navegadores que o admitan).',
    'Save As...':
        'Gardar como…',
    'Import...':
        'Importar…',
    'file menu import hint':
        'Importar proxectos, bloques,\nvestimentas ou sons',


    'Export project as plain text...':
        'Exportar o proxecto como texto…',
    'Export project...':
        'Exportar o proxecto…',
    'show project data as XML\nin a new browser window':
        'Amosar a información do proxecto\ncomo XML nunha nova xanela',
    'Export blocks...':
        'Exportar bloques…',
    'show global custom block definitions as XML\nin a new browser window':
        'Amosar definicións de bloques globais\npersonalizados como XML nunha\nnova xanela',
    'Unused blocks...':
          'Bloques non utilizados…',
    'find unused global custom blocks\nand remove their definitions':
        'Atopar bloques globais personalizados\nsen usar e retirar as súas definicións',
    'Remove unused blocks':
        'Retirar bloques non utilizados',
    'there are currently no unused\nglobal custom blocks in this project':
        'Actualmente non hai bloques globais\npersonalizados sen usar neste proxecto',
    'unused block(s) removed':
        'Retirados os bloques non utilizados',
    'Export summary...':
        'Exportar o resumo…',
    'open a new browser browser window\n with a summary of this project':
        'Abre unha xanela do navegador\n cun resumo deste proxecto',

    'Contents':
        'Contidos',
    'Kind of':
        'Do tipo de',
    'Part of':
        'Parte de',
    'Parts':
        'Partes',
    'Blocks':
        'Bloques',
    'For all Sprites':
        'Para todos os obxectos',
    'Libraries...':
        'Bibliotecas…',
    'Import library':
        'Importar biblioteca',

    // cloud menu
    'Login...':
        'Acceder…',
    'Signup...':
        'Rexistrar unha nova conta…',

    // settings menu
    'Language...':
        'Idioma…',
    'Zoom blocks...':
        'Ampliación dos bloques…',
    'Stage size...':
        'Tamaño do escenario…',
    'Stage size':
        'Tamaño do escenario',
    'Stage width':
        'Largura do escenario',
    'Stage height':
        'Altura do escenario',
    'Default':
        'Predeterminado',
    'Blurred shadows':
        'Sombras difusas',
    'uncheck to use solid drop\nshadows and highlights':
        'Desmarcar para usar sombras\ne realces nidios',
    'check to use blurred drop\nshadows and highlights':
        'Marcar para usar sombras\ne realces difusos',
    'Zebra coloring':
        'Coloración de cebra',
    'check to enable alternating\ncolors for nested blocks':
        'Marcar para alternar as\ncores dos bloques aniñados',
    'uncheck to disable alternating\ncolors for nested block':
        'Desmarcar para deixar de alternar\nas cores dos bloques aniñados',
    'Dynamic input labels':
        'Etiquetas de entrada dinámicas',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'Desmarcar para desactivar as etiquetas\ndinámicas para entradas de\nariedade variábel',
    'check to enable dynamic\nlabels for variadic inputs':
        'Marcar para activar etiquetas\ndinámicas para entradas de\nariedade variábel',
    'Prefer empty slot drops':
        'Dar preferencia ás rañuras baleiras',
    'settings menu prefer empty slots hint':
        'Marcar para impedir que os bloques poidan\nocupar o lugar doutros a seren soltados',

    'uncheck to allow dropped\nreporters to kick out others':
        'Desmarcar para permitir que os bloques poidan\nocupar o lugar doutros ao seren soltados',

    'Long form input dialog':
        'Forma longa da caixa de diálogo dos parámetros',
    'Plain prototype labels':
        'Etiquetas dos prototipos simples',
    'uncheck to always show (+) symbols\nin block prototype labels':
        'Desmarcar para amosar os símbolos (+)\nno texto dos prototipos dos bloques',
    'check to hide (+) symbols\nin block prototype labels':
        'Marcar para agochar os símbolos (+)\nno texto dos prototipos dos bloques',
    'check to always show slot\ntypes in the input dialog':
        'Marcar para amosar sempre os tipos de espazos na caixa de diálogo',
    'uncheck to use the input\ndialog in short form':
        'Desmarcar para usar a forma curta da caixa de diálogo',
    'Virtual keyboard':
        'Teclado virtual',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'Desmarcar para desactivar\na compatibilidade do teclado virtual\npara dispositivos móbiles',

    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'Marcar para activar\na compatibilidade para teclado virtual\npara dispositivos móbiles',

    'Input sliders':
        'Potenciómetros de entrada',
    'uncheck to disable\ninput sliders for\nentry fields':
        'Desmarcar para desactivar\nos potenciómetros de entrada.',
    'check to enable\ninput sliders for\nentry fields':
        'Marcar para activar\nos potenciómetros de entrada.',
    'Clicking sound':
        'Son do clic',
    'uncheck to turn\nblock clicking\nsound off':
        'Desmarcar para desactivar\no son ao facer clic',
    'check to turn\nblock clicking\nsound on':
        'Marcar para activar o son\nao facer clic',
    'Animations':
        'Animacións',
    'uncheck to disable\nIDE animations':
        'Desmarcar para desactivar\n as animacións da interface',
    'Turbo mode':
        'Modo turbo',
    'check to prioritize\nscript execution':
        'Marcar para priorizar a\nexecución dos programa',
    'uncheck to run scripts\nat normal speed':
        'Desmarcar para executar os\nprogramas á velocidade normal',
    'check to enable\nIDE animations':
        'Marcar para activar\n as animacións da interface',
    'Flat design':
        'Deseño recto',
    'Nested auto-wrapping':
        'Encapsular bloques internos',
    'Keyboard Editing':
        'Edición usando teclado',
    'Table support':
        'Edición de táboas',
    'Table lines':
        'Liñas de táboas',
    'Visible stepping':
        'Trazado paso a paso visíbel',
    'Thread safe scripts':
        'Fíos de execución seguros',
    'uncheck to allow\nscript reentrance':
        'Desmarcar para permitir a reentrada nos programas',
    'check to disallow\nscript reentrance':
        'Marcar para denegar a reentrada nos programas',
    'Prefer smooth animations':
        'Preferir animacións suaves',
    'uncheck for greater speed\nat variable frame rates':
        'Desmarcar para aumentar a velocidade\na cadros por segundo variábeis',
    'check for smooth, predictable\nanimations across computers':
        'Marcar para obter animacións máis suaves\ne previsíbeis entre computadoras',
    'Flat line ends':
        'Extremos das liñas rectos',
    'check for flat ends of lines':
        'Marcar para facer que os\nextremos das liñas sexan rectos',
    'uncheck for round ends of lines':
        'Desmarcar para facer que os\nextremos das liñas sexan arredondados',
    'Ternary Boolean slots':
        'Tres opcións para as rañuras booleanas',
    'Camera support':
        'Compatibilidade coa cámara',
    'Inheritance support':
        'Compatibilidade coa a herdanza de obxectos',

    // inputs
    'with inputs':
        'con entradas',
    'input names:':
        'nomes de entradas:',
    'Input Names:':
        'Nomes de entradas:',
    'input list:':
        'Lista de entradas:',

    // context menus:
    'help':
        'Axuda',

    // palette:
    'find blocks':
        'Buscar bloques',
    'hide primitives':
        'Agochar os bloques primitivos',
    'show primitives':
        'Amosar os bloques primitivos',

    // blocks:
    'help...':
        'Axuda…',
    'relabel...':
        'volver etiquetar…',
    'compile':
        'compilar',
    'experimental!\nmake this reporter fast and uninterruptable\nCAUTION: Errors in the ring\ncan break your Snap! session!':
    'experimental!\nfaga este reporteiro rápido e ininterrompíbel\nPRECAUCIÓN: Os erros do anel poden\nquebrar a súa sesión do Snap!',
    'uncompile':
        'descompilar',
    'duplicate':
        'Duplicar',
    'make a copy\nand pick it up':
        'Facer unha copia do bloque\ne collela',
    'only duplicate this block':
        'Duplicar só este bloque',
    'delete':
        'Eliminar',
    'script pic...':
        'Imaxe do programa…',
    'open a new window\nwith a picture of this script':
        'Abrir unha nova xanela\ncunha imaxe deste programa',
    'ringify':
        'Engadir anel',
    'unringify':
        'Eliminar anel',
    'transient':
        'Transitorio',
    'uncheck to save contents\nin the project':
        'Desmarcar para gardar\no contido no proxecto',
    'check to prevent contents\nfrom being saved':
        'Marcar para non gardar\no contido no proxecto',
    'new line':
        'Nova liña',

    // custom blocks:
    'delete block definition...':
        'Eliminar a definición do bloque…',
    'edit...':
        'Editar…',
    'duplicate block definition...':
        'Duplicar a definición deste bloque…',
    'Same Named Blocks':
        'Bloques co mesmo nome',
    'Another custom block with this name exists.\n':
        'Xa existe outro bloque personalizado co mesmo nome.\n',
    'Would you like to replace it?':
        'Queres substituílo?',
    'Local Block(s) in Global Definition':
        'Bloques locais nunha definición global',
    'This global block definition contains one or more\nlocal custom blocks which must be removed first.':
        'Esta definición de bloque global contén un ou máis\nbloques personalizados locais que hai que\neliminar primeiro.',

    // sprites:
    'edit':
        'editar',
    'clone':
        'clonar',
    'move':
        'mover',
    'pivot':
        'pivotar',
    'edit the costume\'s\nrotation center':
        'Cambiar o centro de rotación da vestimenta',
    'detach from':
        'soltar de',
    'detach all parts':
        'soltar todas as partes',
    'export...':
        'exportar…',
    'parent...':
        'proxenitor…',
    'current parent':
        'proxenitor actual',
    'release':
        'liberar',
    'make temporary and\nhide in the sprite corral':
        'faino temporal e agóchao\nna área dos obxectos',

    // stage:
    'show all':
        'amosar todos',
    'pic...':
        'imaxe…',
    'open a new window\nwith a picture of the stage':
        'Abrir unha nova xanela cunha imaxe do escenario',

    // scripting area
    'clean up':
        'limpar',
    'arrange scripts\nvertically':
        'Organizar os programas\nverticalmente',
    'add comment':
        'Engadir un comentario',
    'undrop':
        'Desfacer',
    'undo the last\nblock drop\nin this pane':
        'Desfacer a última\nacción nun bloque\nneste panel',
    'redrop':
        'refacer',
    'use the keyboard\nto enter blocks':
    	'Utilizar o teclado\npara escribir os bloques',
    'scripts pic...':
        'Imaxe de programas…',
    'open a new window\nwith a picture of all scripts':
        'Abre unha nova xanela\ncunha imaxe de todos\nos programas',
    'make a block...':
        'Crear un bloque…',

    // costumes
    'rename':
        'Renomear',
    'export':
        'Exportar',
    'rename costume':
        'Renomear a vestimenta',

    // sounds
    'Play sound':
        'Reproducir o son',
    'Stop sound':
        'Parar o son',
    'Stop':
        'Parar',
    'Play':
        'Reproducir',
    'rename sound':
        'Renomear o son',

    // lists and tables
    'list view...':
        'ver como lista…',
    'table view...':
        'ver como táboa…',
    'open in dialog...':
        'abrir nunha caixa de diálogo…',
    'reset columns':
        'reiniciar columnas',
    'items':
        'elementos',

    // dialogs
    // buttons
    'OK':
        'Aceptar',
    'Ok':
        'Aceptar',
    'Cancel':
        'Cancelar',
    'Yes':
        'Si',
    'No':
        'Non',

    // help
    'Help':
        'Axuda',

    // zoom blocks
    'Zoom blocks':
        'Ampliación dos bloques',
    'build':
        'Constrúe',
    'your own':
        'os teus propios',
    'blocks':
        'bloques',
    'normal (1x)':
        'normal (1x)',
    'demo (1.2x)':
        'demostración (1.2x)',
    'presentation (1.4x)':
        'presentación (1.4x)',
    'big (2x)':
        'grande (2x)',
    'huge (4x)':
        'enorme (4x)',
    'giant (8x)':
        'xigante (8x)',
    'monstrous (10x)':
        'monstruoso (10x)',

    // Project Manager
    'Untitled':
        'Sen título',
    'Open Project':
        'Abrir proxecto',
    '(empty)':
        '(baleiro)',
    'Saved!':
        'Gardado!',
    'Delete Project':
        'Eliminar proxecto',
    'Are you sure you want to delete':
        'Confirmas que queres eliminalo?',
    'rename...':
        'renomear…',
    'Recover':
        'Recuperar',
    'Today, ':
        'Hoxe, ',
    'Yesterday, ':
        'Onte, ',

    // costume editor
    'Costume Editor':
        'Editor de vestimentas',
    'click or drag crosshairs to move the rotation center':
        'facer clic e arrastrar a mira para alterar o centro de rotación',

    // project notes
    'Project Notes':
        'Notas do proxecto',

    // new project
    'New Project':
        'Novo proxecto',
    'Replace the current project with a new one?':
        'Substituír o proxecto actual por un novo?',

    // save project
    'Save Project As...':
        'Gardar o proxecto como…',

    // export blocks
    'Export blocks':
        'Exportar bloques',
    'Import blocks':
        'Importar bloques',
    'this project doesn\'t have any\ncustom global blocks yet':
        'Este proxecto aínda non ten\nningún bloque personalizado global',
    'select':
        'seleccionar',
    'none':
        'ningún',

    // variable dialog
    'for all sprites':
        'para todos os obxectos',
    'for this sprite only':
        'só para este obxecto',

    // variables refactoring
    'rename only\nthis reporter':
        'renomear só\neste reporteiro',
    'rename all...':
        'renomear todo…',
    'rename all blocks that\naccess this variable':
        'renomear todos os bloques\nque acceden a esta variábel',

    // block dialog
    'Change block':
        'Cambiar tipo de bloque',
    'Command':
        'Orde',
    'Reporter':
        'Reporteiro',
    'Predicate':
        'Predicado',

    // block editor
    'Block Editor':
        'Editor de bloques',
    'Method Editor':
        'Editor de métodos',
    'Apply':
        'Aplicar',

    // block deletion dialog
    'Delete Custom Block':
        'Eliminar o bloque personalizado',
    'block deletion dialog text':
        'Confirmas que queres eliminar\neste bloque personalizado e\ntodas as súas instancias?',

    // input dialog
    'Create input name':
        'Crear unha rañura',
    'Edit input name':
        'Editar a rañura',
    'Edit label fragment':
        'Editar fragmento de etiqueta',
    'Title text':
        'Texto do título',
    'Input name':
        'Nome da rañura',
    'Delete':
        'Eliminar',
    'Object':
        'Obxecto',
    'Number':
        'Número',
    'Text':
        'Texto',
    'List':
        'Lista',
    'Any type':
        'Calquera tipo',
    'Boolean (T/F)':
        'Booleano (V/F)',
    'Command\n(inline)':
        'Orde\n(en liña)',
    'Command\n(C-shape)':
        'Orde\n(forma C)',
    'Any\n(unevaluated)':
        'Calquera\n(sen avaliar)',
    'Boolean\n(unevaluated)':
        'Booleano\n(sen avaliar)',
    'Single input.':
        'Entrada única',
    'Default Value:':
        'Valor predeterminado:',
    'Multiple inputs (value is list of inputs)':
        'Entradas múltiples (o valor é unha lista de entradas)',
    'Upvar - make internal variable visible to caller':
        'Saída; fai visíbel unha variábel interna ao chamador',

    // About Snap
    'About Snap':
        'Sobre o Snap!',
    'Back...':
        'Atrás…',
    'License...':
        'Licenza…',
    'Modules...':
        'Módulos…',
    'Credits...':
        'Créditos…',
    'Translators...':
        'Tradutores…',
    'License':
        'Licenza',
    'current module versions:':
        'Versións actuais dos módulos',
    'Contributors':
        'Colaboradores',
    'Translations':
        'Traduccións',

    // variable watchers
    'normal':
        'normal',
    'large':
        'grande',
    'slider':
        'potenciómetro',
    'slider min...':
        'mínimo do potenciómetro…',
    'slider max...':
        'máximo do potenciómetro…',
    'import...':
        'importar…',
    'Slider minimum value':
        'Valor mínimo do potenciómetro',
    'Slider maximum value':
        'Valor máximo do potenciómetro',
    'raw data...':
        'datos en bruto…',
    'import without attempting to\nparse or format data':
        'Importar sen tentar analizar\nou formatar os datos',

    // list watchers
    'length: ':
        'lonxitude: ',

    // coments
    'add comment here...':
        'Engade aquí un comentario…',

    // drow downs
    // directions
    '(90) right':
        '(90) dereita',
    '(-90) left':
        '(-90) esquerda',
    '(0) up':
        '(0) arriba',
    '(180) down':
        '(180) abaixo',

    // collision detection
    'mouse-pointer':
        'punteiro do rato',
    'edge':
        'bordo',
    'pen trails':
        'riscos do lapis',

    // costumes
    'Turtle':
        'Tartaruga',
    'Empty':
        'baleiro',

    'front':
        'diante',
    'back':
        'atrás',

    // pen
    'hue':
        'tonalidade',
    'transparency':
        'transparencia',

    // graphical effects
    'color':
        'cor',
    'fisheye':
        'ollo de peixe',
    'whirl':
        'remuíño',
    'pixelate':
        'pixelado',
    'mosaic':
        'mosaico',
    'saturation':
        'saturación',
    'brightness':
        'brillo',
    'ghost':
        'pantasma',
    'negative':
        'negativo',
    'comic':
        'historieta',
    'confetti':
        'confeti',

    // keys
    'space':
        'espazo',
    'any key':
        'calquera tecla',
    'up arrow':
        'frecha arriba',
    'down arrow':
        'frecha abaixo',
    'right arrow':
        'frecha dereita',
    'left arrow':
        'frecha esquerda',
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
        'Nova…',

    // math functions
    'abs':
        'abs (valor absoluto)',
    'ceiling':
        'arredondar por riba',
    'floor':
        'arredondar por abaixo',
    'sqrt':
        'sqrt (raíz cadrada)',
    'sin':
        'sin (seno)',
    'cos':
        'cos (coseno)',
    'tan':
        'tan (tanxente)',
    'asin':
        'asin (arco-seno)',
    'acos':
        'acos (arco-coseno)',
    'atan':
        'atan (arco-tanxente)',
    'ln':
        'ln (logaritmo neperiano)',
    'e^':
        'e^ (exponencial)',

    // Boolean expressions keyboard entry
    'not':
        'non',

    // delimiters
    'letter':
        'letra',
    'word':
        'palabra',
    'whitespace':
        'espazo en branco',
    'line':
        'liña',
    'tab':
        'tabulador',
    'cr':
        'retorno de carro',

    // data types
    'number':
        'número',
    'text':
        'texto',
    'Boolean':
        'Booleano',
    'list':
        'lista',
    'command':
        'orde',
    'reporter':
        'reporteiro',
    'predicate':
        'predicado',
    'sprite':
        'obxecto',

    // list indices
    'last':
        'último',
    'any':
        'calquera',

    // attributes
    'neighbors':
        'os veciños',
    'self':
        'eu mesmo',
    'other sprites':
        'outros obxectos',
    'parts':
        'as partes',
    'anchor':
        'a áncora',
    'parent':
        'o proxenitor',
    'temporary?':
        'temporal?',
    'children':
        'os descendentes',
    'clones':
        'os clons',
    'other clones':
        'outros clons',
    'dangling?':
        'pendurado doutro?',
    'draggable':
        'arrastrábel?',
    'rotation style':
        'estilo de rotación',
    'rotation x':
        'rotación x',
    'rotation y':
        'rotación y',
    'center x':
        'centro x',
    'center y':
        'centro y',
    'name':
        'nome',
    'stage':
        'escenario',
    'costumes':
        'vestimentas',
    'sounds':
        'sons',
    'scripts':
        'programas',

    // inheritance
    'inherited':
        'herdado',
    'check to inherit\nfrom':
        'Marcar para herdar\n de',
    'uncheck to\ndisinherit':
        'Desmarcar para\ndesherdar',

    // missing in lang-de.js - copied from lang-pt.js
    'delete %shd':
        'eliminar %shd',
    'Retina display support':
        'Compatibilidade para pantallas Retina',
    'uncheck for lower resolution,\nsaves computing resources':
        'Desmarcar para menor resolución;\nmellora os recursos computacionais.',
    'check for higher resolution,\nuses more computing resources':
        'Marcar para maior resolución;\nconsume máis recursos computacionais.',
    'First-Class Sprites':
        'Obxectos de primeira clase',
    'uncheck to disable support\nfor first-class sprites':
        'Desmarcar para desactivar a compatibilidade\nde obxectos de primeira clase.',
    'check to enable support\n for first-class sprite':
        'Marcar para activar a compatibilidade\n de obxectos de primeira clase.',
    'Live coding support':
        'Compatibilidade de programación ao vivo',
    'EXPERIMENTAL! check to enable\n live custom control structures':
        'EXPERIMENTAL! Marcar para activar estruturas\n de control personalizadas ao vivo.',
    'EXPERIMENTAL! uncheck to disable live\ncustom control structures':
        'EXPERIMENTAL! Desmarcar para desactivar estruturas\nde control personalizadas ao vivo.',
    'Persist linked sublist IDs':
        'Persistencia dos ID de sublistas ligadas',
    'check to enable\nsaving linked sublist identities':
        'Marcar para activar o\nalmacenamento das identidades de sublistas ligadas.',
    'uncheck to disable\nsaving linked sublist identities':
        'Desmarcar para desactivar o\nalmacenamento das identidades de sublistas ligadas.',
    'grow':
        'aumentar',
    'shrink':
        'reducir',
    'flip ↔':
        'inverter ↔',
    'flip ↕':
        'inverter ↕',
    'Export all scripts as pic...':
        'Exportar todos os obxectos como imaxe…',
    'show a picture of all scripts\nand block definitions':
        'Amosa unha imaxe con todos\nos obxectos e definicións de bloques',
    'current %dates':
        '%dates actuais',
    'year':
        'ano',
    'month':
        'mes',
    'date':
        'día',
    'day of week':
        'día da semana',
    'hour':
        'hora',
    'minute':
        'minuto',
    'second':
        'segundo',
    'time in milliseconds':
        'tempo (en milisegundos)',
    'find blocks...':
        'buscar bloques…',
    'costume name':
        'nome da vestimenta',
    'Open':
        'Abrir',
    'Share':
        'Compartir',
    'Snap!Cloud':
        'NubeSnap!',
    'Cloud':
        'Nube',
    'could not connect to:':
        'Non foi posíbel conectar con:',
    'Service:':
        'Servizo:',
    'login':
        'acceso',
    'ERROR: INVALID PASSWORD':
        'ERRO: CONTRASINAL INCORRECTO',
    'Browser':
        'Navegador',
    'Sign up':
        'Rexistrar nova conta',
    'Signup':
        'Rexistro de nova conta',
    'Sign in':
        'Acceder',
    'Logout':
        'Saír',
    'Change Password...':
        'Cambiar o contrasinal…',
    'Change Password':
        'Cambiar o contrasinal',
    'Account created.':
        'Conta creada.',
    'An e-mail with your password\nhas been sent to the address provided':
        'Enviouseche un correo-e, ao enderezo\nfornecido, co teu contrasinal.',
    'now connected.':
        'estás conectado.',
    'disconnected.':
        'estás desconectado.',
    'Reset password':
        'Recuperar o contrasinal',
    'Reset Password...':
        'Recuperar o contrasinal…',
    'User name:':
        'Nome de usuario/a:',
    'Password:':
        'Contrasinal:',
    'Old password:':
        'Contrasinal actual:',
    'New password:':
        'Novo contrasinal:',
    'Repeat new password:':
        'Repita o contrasinal:',
    'Birth date:':
        'Data de nacemento:',
    'January':
        'xaneiro',
    'February':
        'febreiro',
    'March':
        'marzo',
    'April':
        'abril',
    'May':
        'maio',
    'June':
        'xuño',
    'July':
        'xullo',
    'August':
        'agosto',
    'September':
        'setembro',
    'October':
        'outubro',
    'November':
        'novembro',
    'December':
        'decembro',
    'year:':
        'ano:',
    ' or before':
        ' ou antes',
    'E-mail address:':
        'Enderezo de correo-e:',
    'E-mail address of parent or guardian:':
        'Enderezo de correo dos pais ou titores:',
    'Terms of Service...':
        'Termos do servizo…',
    'Privacy...':
        'Privacidade…',
    'I have read and agree\nto the Terms of Service':
        'Lin e declaro aceptar\nos Termos do servizo',
    'stay signed in on this computer\nuntil logging out':
        'Manterme autenticado neste\ncomputador ata que saia',
    'please fill out\nthis field':
        'Cubre este campo.',
    'User name must be four\ncharacters or longer':
        'O nome de usuario/a ten que ter\npolo menos catro caracteres.',
    'please provide a valid\nemail address':
        'Indica un enderezo\nde correo-e válido.',
    'password must be six\ncharacters or longer':
        'O contrasinal ten que ter\npolo menos seis caracteres.',
    'passwords do\nnot match':
        'os contrasinais\nnon coinciden.',
    'please agree to\nthe TOS':
        'Acepta os\nTermos do servizo.',
    'Examples':
        'Exemplos',
    'You are not logged in':
        'Aínda non te autenticaches',
    'Updating\nproject list...':
        'Actualizando a\nlista de proxectos…',
    'Opening project...':
        'Abrindo o proxecto…',
    'Fetching project\nfrom the cloud...':
        'Obtendo o proxecto\nda nube…',
    'Saving project\nto the cloud...':
        'Gardando o proxecto\nna nube…',
    'Sprite Nesting':
        'Obxectos compostos',
    'uncheck to disable\nsprite composition':
        'Desmarcar para desactivar\na composición de obxectos.',
    'Codification support':
        'Compatibilidade da produción de código',
    'check for block\nto text mapping features':
        'Desmarcar para funcionalidades\nde asignación entre bloques e texto.',
    'saved.':
        'gardado.',
    'options...':
        'opcións…',
    'read-only':
        'só lectura',
    'Input Slot Options':
        'Opcións de rañura de entrada',
    'Enter one option per line.Optionally use "=" as key/value delimiter\ne.g.\n   the answer=42':
        'Introduce unha opción por liña. Opcionalmente, use «=» como separador\nentre chave e valor, e.g.\n   a resposta=42',
    'paint a new sprite':
        'Pintar un novo obxecto.',
    'Paint a new costume':
        'Pintar unha nova vestimenta.',
    'add a new Turtle sprite':
        'Engadir un novo obxecto.',
    'check for alternative\nGUI design':
        'Marcar para obter unha\ninterface gráfica alternativa.',
    'Rasterize SVGs':
        'Transformar SVG en mapas de bits',
    'check to rasterize\nSVGs on import':
        'Marcar para transformar os ficheiros SVG\nen mapas de bits durante a importación.',
    'comment pic...':
        'imaxe do comentario…',
    'open a new window\nwith a picture of this comment':
        'Abrir unha nova xanela cunha\nimaxe deste comentario.',
    'undo':
        'desfacer',
//Paint editors
    'Vector Paint Editor':
        'Editor vectorial de imaxes',
    'Brush size':
        'Tamaño do pincel',
    'Constrain proportions of shapes?\n(you can also hold shift)':
        'Preservar proporcións das formas?\n(tamén pode premer a tecla «maiúsculas»)',
    'Eraser tool':
        'Goma de borrar',
    'Paintbrush tool\n(free draw)':
        'Pincel\n(man alzada)',
    'Line tool\n(shift: vertical/horizontal)':
        'Liñas\n(maiúsculas: vertical/horizontal)',
    'Line tool\n(shift: constrain to 45º)':
        'Liñas\n(maiúsculas: só ángulos de 45º)',
    'Stroked Rectangle\n(shift: square)':
        'Rectángulo\n(maiúsculas: cadrado)',
    'Filled Rectangle\n(shift: square)':
        'Rectángulo cheo\n(maiúsculas: cadrado)',
    'Rectangle\n(shift: square)':
        'Rectángulo\n(maiúsculaa: cadrado)',
    'Stroked Ellipse\n(shift: circle)':
        'Elipse\n(maiúsculas: círculo)',
    'Filled Ellipse\n(shift: circle)':
        'Elipse chea\n(maiúsculas: círculo)',
    'Ellipse\n(shift: circle)':
        'Elipse\n(maiúsculas: círculo)',
    'Selection tool':
        'Ferramenta de selección',
    'Closed brush\n(free draw)':
        'Pincel pechado\n(man alzada)',
    'Paint a shape\n(shift: edge color)':
        'Pintar a forma\n(maiúsculas: cor do bordo)',
    'Fill a region':
        'Encher a área',
    'Set the rotation center':
        'Estabelecer o centro de rotación',
    'Pipette tool\n(pick a color anywhere)':
        'Pipeta\n(recoller unha cor en calquera sitio)',
    'Polygon':
        'Polígono',
    'Paint Editor':
        'Editor de pintura',
    'square':
        'cadrado' ,
    'pointRight':
        'punteiro cara a dereita',
    'gears':
        'engrenaxes',
    'file':
        'ficheiro',
    'fullScreen':
        'pantalla completa',
    'normalScreen':
        'pantalla normal',
    'smallStage':
        'escenario pequeno',
    'normalStage':
        'escenario normal',
    'turtle':
        'tartaruga',
    'turtleOutline':
        'contorno de tartaruga',
    'pause':
        'pausa',
    'flag':
        'bandeira',
    'octagon':
        'octógono',
    'cloud':
        'nube',
    'cloudOutline':
        'contorno de nube',
    'cloudGradient':
        'nube con degradado',
    'turnRight':
        'xirar á dereita',
    'turnLeft':
        'xirar á esquerda',
    'storage':
        'almacenaxe',
    'poster':
        'póster',
    'flash':
        'flash',
    'brush':
        'pincel',
    'rectangle':
        'rectángulo',
    'rectangleSolid':
        'rectángulo cheo',
    'circle':
        'circunferencia',
    'circleSolid':
        'círculo',
    'crosshairs':
        'punto de mira',
    'paintbucket':
        'balde de tinta',
    'eraser':
        'borrador',
    'pipette':
        'pipeta',
    'Pipette tool\n(pick a color from anywhere\nshift: fill color)':
        'Recolector de cor\n(recolle unha cor de calquera lugar,\nmaiúsculas: para a cor de enchido)',
    'Edge color\n(left click)':
        'Cor do bordo\n(botón esquerdo)',
    'Fill color\n(right click)':
        'Cor de enchido\n(botón dereito)',
    'Bitmap':
        'Mapa de bits',
    'Top':
        'Arriba',
    'Bottom':
        'Abaixo',
    'Up':
        'Subir',
    'Down':
        'Baixar',
    'This will erase your current drawing.\n':
        'O cambio de editor borrará o debuxo actual.\n',
    'Are you sure you want to continue?':
        'Confirmas que queres continuar?',
    'Switch to vector editor?':
        'Queres cambiar para o editor vectorial?',
    'This will convert your vector objects into\nbitmaps,':
        'O cambio converterá os obxectos vectoriais nun\nmapa de bits,',
    ' and you will not be able to convert\nthem back into vector drawings.\n':
        ' e non poderás convertelos de novo a\ndebuxos vectoriais..\n',
    'Convert to bitmap?':
        'Queres cambiar a mapa de bits?',
// more simbols
    'speechBubble':
        'globo (de diálogo)',
    'speechBubbleOutline':
        'contorno de globo (de diálogo)',
    'arrowUp':
        'frecha arriba',
    'arrowUpOutline':
        'contorno de frecha arriba',
    'arrowLeft':
        'frecha esquerda',
    'arrowLeftOutline':
        'contorno de frecha esquerda',
    'arrowDown':
        'frecha abaixo',
    'arrowDownOutline':
        'contorno de frecha abaixo',
    'arrowRight':
        'frecha dereita',
    'arrowRightOutline':
        'contorno de frecha dereita',
    'robot':
        'robot',
    'globe':
        'globo terráqueo',
    'stepForward':
        'paso adiante',
    'cross':
        'cruz',
    'loop':
        'bucle',
    'turnBack':
        'ir cara atrás',
    'turnForward':
        'ir cara adiante',
    'magnifyingGlass':
        'lupa',
    'magnifierOutline':
        'contorno de lupa',
    'selection':
        'selección',
    'polygon':
        'polígono',
    'closedBrush':
        'pincel pechado',
    'camera':
        'cámara',
    'location':
        'localización',
    'footprints':
        'pegadas',
    'keyboard':
        'teclado',
    'keyboardFilled':
        'teclado',
//
    'turn pen trails into new costume...':
        'Transformar trazos do lapis nunha nova vestimenta...',
    'turn all pen trails and stamps\ninto a new costume for the\ncurrently selected sprite':
        'Transforma todos os trazos do lapis\ne selos nunha nova vestimenta\ndo obxecto seleccionado neste momento',
    'pen':
        'lapis',
    'tip':
        'punta',
    'middle':
        'medio',
    'last changed':
        'última modificación',
    'Share Project':
        'Compartir o proxecto',
    'Unshare Project':
        'Deixar de compartir o proxecto',
    'sharing\nproject...':
        'compartindo\no proxecto…',
    'unsharing\nproject...':
        'deixando de compartir\no proxecto…',
    'shared.':
        'compartido.',
    'unshared.':
        'non compartido.',
    'Unshare':
        'Deixar de compartir',
    'Are you sure you want to unshare':
        'Confirmas que queres deixar de compartir',
    'Are you sure you want to share':
        'Confirmas que queres compartir',
    'Publish Project':
        'Publicar o proxecto',
    'publishing\nproject...':
        'publicando\no proxecto…',
    'published.':
        'publicado.',
    'Are you sure you want to publish':
        'Confirmas que queres publicar?',
    'Unpublish Project':
        'Deixar de publicar o proxecto',
    'unpublishing\nproject...':
        'deixando de publicar\no proxecto…',
    'unpublished.':
        'non publicado',
    'Publish':
        'Publicar',
    'Unpublish':
        'Deixar de publicar',
    'Are you sure you want to unpublish':
        'Confirmas que queres deixar de publicar?',
    'Replace Project':
        'Substituír o proxecto',
    'Are you sure you want to replace':
        'Confirmas que queres substituír o proxecto orixinal?',
    'Open Project':
        'Abrir o proxecto',
    'password has been changed.':
        'o seu contrasinal foi cambiado.',
    'SVG costumes are\nnot yet fully supported\nin every browser':
        'As vestimentas SVG aínda non\nson totalmente compatíbeis en todos\nos navegadores',
    'Save Project':
        'Gardar proxecto',
    'script pic with result...':
        'imaxe do programa incluíndo o resultado…',
    'open a new window\nwith a picture of both\nthis script and its result':
        'Abrir unha nova xanela cunha\nimaxe tanto deste programa\ncomo do seu resultado.',
    'JavaScript function ( %mult%s ) { %code }':
        'función JavaScript ( %mult%s ) { %code }',
    'Select categories of additional blocks to add to this project.':
        'Seleccionar categorías de bloques adicionais a engadir a este proxecto.',
    'Import sound':
        'Importar son',
    'Select a sound from the media library':
        'Seleccionar un son da mediateca.',
    'Import':
        'Importar',
    'Select a costume from the media library':
        'Seleccionar unha vestimenta da mediateca.',
    'edit rotation point only...':
        'editar só o punto de rotación…',
    'Export Project As...':
        'Exportar o proxecto como…',
    'a variable of name \'':
        'A variábel chamada «',
    '\'\ndoes not exist in this context':
        '»\nnon existe neste contexto',
    '(temporary)':
        '(temporal)',
    'expecting':
        'Agardando',
    'input(s), but getting':
        'argumento(s), mais pasaron',
    'parent...':
        'proxenitor…',
    'Dragging threshold...':
        'Limiar de arrastre…',
    'Cache Inputs':
        'Entradas á memoria caché',
    'uncheck to stop caching\ninputs (for debugging the evaluator)':
        'Desmarcar para non memorizar\nentradas na caché (para depurar o avaliador).',
    'check to cache inputs\nboosts recursion':
        'Marcar para memorizar as entradas\nna caché (acelera a recursividade).',
    'Project URLs':
        'URL do proxectomostra',
    'check to enable\nproject data in URLs':
        'Marcar para activar os datos\ndo proxecto nos URL.',
    'uncheck to disable\nproject data in URLs':
        'Desmarcar para desactivar\nos datos do proxecto nos URL.',
    'export project media only...':
        'Exportar só os medios do proxecto…',
    'export project without media...':
        'Exportar proxecto sen os medios…',
    'export project as cloud data...':
        'Exportar proxecto como datos da nube…',
    'open shared project from cloud...':
        'Abrir proxecto compartido a partir da nube…',
    'url...':
        'URL…',
    'Export summary with drop-shadows...':
        'Exportar resumo coas imaxes sombreadas…',
    'open a new browser browser window\nwith a summary of this project\nwith drop-shadows on all pictures.\nnot supported by all browsers':
        'Abrir unha nova xanela no navegador\ncontendo un resumo deste proxecto\nco todas as imaxes sombreadas\n(non admitido en todos os navegadores)',
    'specify the distance the hand has to move\nbefore it picks up an object':
        'Especificar a distancia que ten que se mover\na man antes de coller algún obxecto',
    'block variables...':
        'variábeis de bloque…',
    'remove block variables...':
        'retirar variábeis de bloque…',
    'block variables':
        'variábeis de bloque',
    'experimental -\nunder construction':
        'Experimental – \nen construción',
    'Table view':
        'Ver como táboa',
    'open in another dialog...':
        'Abrir noutra caixa de diálogo…',
    'check for multi-column\nlist view support':
        'Marcar para a compatibilidade de\nvistas multicolumna de listas.',
    'uncheck to disable\nmulti-column list views':
        'Desmarcar para desactivar\nvistas multicolumna de listas.',
    'check for higher contrast\ntable views':
        'Marcar para vistas de\ntáboa con maior contraste.',
    'uncheck for less contrast\nmulti-column list views':
        'Desmarcar para vistas multicolumna\nde listas con menor contraste.',
    '(in a new window)':
        '(nunha nova xanela)',
    'save project data as XML\nto your downloads folder':
        'Gardar os datos do proxecto como\nXML no seu cartafol de descargas.',

    // producción de código     // més cadenes...
    'map %cmdRing to %codeKind %code':
        'asignar %cmdRing no %codeKind %code',
    'map String to code %code':
        'asignar texto no código %code',
    'map %codeListPart of %codeListKind to code %code':
        'asignar %codeListPart de %codeListKind no código %code',
    'code of %cmdRing':
        'o código de %cmdRing',
    'delimiter':
        'delimitador',
    'collection':
        'colección',
    'variables':
        'variábeis',
    'parameters':
        'parámetros',
    'code':
        'código',
    'header':
        'encabezamento',
    'header mapping...':
        'asignando o encabezamento…',
    'code mapping...':
        'asignando o código…',
    'Code mapping':
        'Asignando o código',
    'Header mapping':
        'Asignando o encabezamento',
    'Enter code that corresponds to the block\'s definition. Use the formal parameter\nnames as shown and <body> to reference the definition body\'s generated text code.':
        'Introduce o código correspondente á definición do bloque. Use os nomes dos parámetros\ntal como son amosados e empregue <body> para referenciar o código xerado da definición do corpo',
    'Enter code that corresponds to the block\'s definition. Choose your own\nformal parameter names (ignoring the ones shown).':
        'Introduce o código correspondente á definición do bloque. Escolla os seus propios\nnomes para os parámetros (ignorando os nomes amosados).',
    'Enter code that corresponds to the block\'s operation (usually a single\nfunction invocation). Use <#n> to reference actual arguments as shown.':
        'Introduce o código que corresponda á operación do bloque (normalmente unha simple\ninvocación de rutina). Use <#n> para referenciar os argumentos tal como son amosados',
    'uncheck to disable\nkeyboard editing support':
        'Desmarcar para desactivar\na edición usando o teclado.',
    'check to enable\nkeyboard editing support':
        'Marcar para activar\na edición usando o teclado.',
    'uncheck to disable\nsprite inheritance features':
        'Desmarcar para desactivar\nfuncionalidades de herdanza de obxectos.',
    'check for sprite\ninheritance features':
        'Marcar para activar\nfuncionalidades de herdanza de obxectos.',

//More strings missed in de and pt translations

//Mode developer blocks
	'wardrobe':
		'vestimentas',
	'jukebox':
		'sons',
	'save %imgsource as costume named %s':
		'gardar %imgsource coma unha vestimenta co nome %s',
	'screenshot':
		'captura de pantalla',
	'stage image':
		'imaxe do escenario',
	'processes':
		'procesos',
	'show table %l':
		'a mosar a táboa %l',
	'%txtfun of %s':
		'%txtfun de %s',
    'stick to':
        'ancora a',
//IDE Messages
	'entering development mode.\n\nerror catching is turned off,\nuse the browser\'s web console\nto see error messages.':
		'Entrando no modo de desenvolvemento.\n\nA captura de erros está desconectada,\nempregue a consola web do navegador\npara ver as mensaxes de erro.',
	'entering user mode':
		'Entrando no modo de usuario',
	'dragging threshold':
		'limiar para o arrastre',
	'redo the last undone block drop in this pane':
		'Refacer o último movemento de bloques desfeito',
    'cloud unavailable without a web server.':
        'A nube non está dispoñíbel sen un servidor web.',

//costumes and backgrounds
	'rename background':
		'renomear o fondo',
	'turn pen trails into new background...':
		'Crear un novo fondo a partires da imaxe debuxada…',
	'turn all pen trails and stamps\ninto a new background for the stage':
		'Crea un novo fondo de escenario a partires da imaxe debuxada e dos selos',

//Helping text for menu options
	'uncheck for default\nGUI design':
		'Desmarcar para o deseño \nda IGU predeterminada',
	'uncheck to confine auto-wrapping\nto top-level block stacks':
		'Desmarcar para limitar a envoltura automática\na moreas de bloques de nivel superior',
	'check to enable auto-wrapping\ninside nested block stacks':
		'Marcar para activar a envoltura\nautomática dentro de moreas aniñadas',
	'check to turn on\n visible stepping (slow)':
		'Marcar para activar a\nexecución paso a paso visíbel (lento)',
	'uncheck to turn off\nvisible stepping':
		'Desarcar para activar a\n execución paso a paso visíbel',
    'check to allow\nempty Boolean slots':
        'Marcar para permitir\nrañuras booleanas baleiras',
    'uncheck to limit\nBoolean slots to true / false':
        'Desmarcar para limitar as\nrañuras booleanas aos valores verdadeiro / falso',
    'uncheck to disable\ncamera support':
        'Desmarcar para desactivar\na compatibilidade da cámara',
    'check to enable\ncamera support':
        'Marcar para activar a\ncompatibilidade da cámara',
	'uncheck to disable\nblock to text mapping features':
		'Desmarcar para desactivar\nas funcións de asignación de bloque a texto',
	'uncheck for smooth\nscaling of vector costumes':
		'Desmarcar para un escalado\nsuave das vestimentas vectoriais',
	'check to enable\nsprite composition':
		'Marcar para activar a\ncomposición de obxectos',

	'Execute on slider change':
		'Executar cando hai cambios no potenciómetro',
	'uncheck to suppress\nrunning scripts\nwhen moving the slider':
		'Desmarcar para non iniciar\na execución dos programas\nao mover o potenciómetro',
	'check to run\nthe edited script\nwhen moving the slider':
		'Marcar para activar\na execución dos programas\ao mover o potenciómetro',
    'Enable command drops in all rings':
        'Activar o arrastre de ordes a todos os aneis',
    'uncheck to disable\ndropping commands in reporter rings':
        'Desmarcar para desactivar\no arrastre de ordes nos\naneis reporteiros',
    'check to enable\ndropping commands in all rings':
        'Marcar para activar\no arrastre de ordes en\ntodos os aneis',
//Developer mode menus
	'user features...':
		'características do usuario…',
	'color...':
		'cor…',
	'\ncolor:':
		'\ncor:',
	'choose another color \nfor this morph':
		'Escolle outra cor para este «morph»',
	'transparency...':
		'transparencia…',
	'\nalpha\nvalue:':
		'\nvalor d\ncanle alfa:',
	'set this morph\'s\nalpha value':
		'Fixa o valor da canle\nalfa para este «morph»',
	'resize...':
		'redimensionar…',
	'show a handle\nwhich can be dragged\nto change this morph\'s extent':
		'Amosa un asa que\nse pode arrastrar para\ncambiar o límite deste «morph»',
	'duplicate':
		'duplicar',
	'make a copy\nand pick it up':
		'Facer unha copia\ne collela',
	'pick up':
		'coller este «morph»',
	'detach and put \ninto the hand':
		'Arrastrar e mover\nco punteiro',
	'attach...':
		'xuntar…',
	'stick this morph\nto another one':
		'Pega este morph»\na outro',
	'move...':
		'mover…',
	'show a handle\nwhich can be dragged\nto move this morph':
		'Amosa un asa que\nse pode arrastrar para\nmover este «morph»',
	'inspect...':
		'examinar…',
	'open a window\non all properties':
		'Abre unha xanela\ncon todas as propiedades',
	'pic...':
		'imaxe…',
	'open a new window\nwith a picture of this morph':
		'Abre unha xanela\ncunha imaxe deste «morph»',
	'lock':
		'bloquear',
	'make this morph\nunmovable':
		'Fai que este «morph»\nnon poida ser movido',
	'unlock':
		'desbloquear',
	'make this morph\nmovable':
		'Fai que este «morph»\npoida ser movido',
	'World...':
		'Mundo…',
	'show the\nWorld\'s menu':
		'Amosa o menú do Mundo',
	//World options
	'demo...':
		'exemplo…',
	'sample morphs':
		'Crea un «morph» de mostra',
	'hide all...':
		'agochalo todo…',
	'show all...':
		'amosalo todo…',
	'move all inside...':
		'mover todo para dentro…',
	'keep all submorphs\nwithin and visible':
		'Mantér todos os «submorph»\ndentro e deixalos visíbeis',
	'open a window on\nall properties':
		'Abre unha xanela con\ntodas as propiedades',
	'screenshot...':
		'captura de pantalla…',
	'open a new window\nwith a picture of this morph':
		'Abre unha xanela\ncunha imaxe deste «morph»',
	'restore display':
		'restabelecer a vista',
	'redraw the\nscreen once':
		'Volve debuxar a\npantalla unha vez',
	'fill page...':
		'encher a páxina…',
	'let the World automatically\nadjust to browser resizing':
		'Permite que o Mundo se axuste\nautomaticamente ao cambio de tamaño do navegador',
	'sharp shadows...':
		'sombras contrastadas…',
	'sharp drop shadows\nuse for old browsers':
		'Usar sombras contrastadas\npara navegadores antigos',
	'blurred shadows...':
		'sombras difusas…',
	'blurry shades,\n use for new browsers':
		'Usar sombras difusas\npara navegadores modernos',
	'choose the World\'s\nbackground color':
		'Escolle a cor de\nfondo do Mundo',
	'touch screen settings':
		'axustes para pantalla táctil',
	'bigger menu fonts\nand sliders':
		'Fai máis grandes os potenciómetros e os menús',
	'standard settings':
		'axustes estándar',
	'smaller menu fonts\nand sliders':
		'Fai máis pequenos os potenciómetros e os menús',
	'user mode...':
		'modo de usuario…',
	'disable developers\'\ncontext menus':
		'Desactiva os menús\ndo modo de desenvolvemento',
	'development mode...':
		'modo de desenvolvemento…',
	'about morphic.js...':
		'sobre o morphic.js…',
	//Make a Morph
	'make a morph':
		'crear un «morph»',
	'rectangle':
		'rectangulo',
	'box':
		'caixa',
	'circle box':
		'caixa circular',
	'frame':
		'marco',
	'scroll frame':
		'marco con desprazamento',
	'handle':
		'asa',
	'string':
		'cadea',
	'Hello, World!':
		'Ola mundo',
	'speech bubble':
		'globo (de diálogo)',
	'gray scale palette':
		'paleta de escala de grises',
	'color palette':
		'paleta de cores',
	'color picker':
		'selector de cor',
	'sensor demo':
		'exemplo de sensor',
	'animation demo':
		'exemplo de animación',

//future JS options
	'uncheck to disable support for\nnative JavaScript functions':
		'Desmarcar para desactivar\na execución de Javascript',
	'check to support\nnative JavaScript functions':
		'Marcar para activar\na execución de Javascript',
	'JavaScript is not enabled':
		'A execución de Javascript está desactivada',

//Libraries
	'Loading':
		'Cargando',
	'Imported':
		'Importado',
	'Iteration, composition':
		'Iteracións e composición',
	'List utilities':
		'Utilidades para listas',
	'Streams (lazy lists)':
		'Fluxos (listas preguizosas)',
	'Variadic reporters':
		'Reporteiros de ariedade variábel',
	'Web services access (https)':
		'Acceso a servizos web (https)',
	'Words, sentences':
		'Palabras e frases',
	'Multi-branched conditional (switch)':
		'Condicionais compostos (conmutador)',
	'LEAP Motion controller':
		'Controlador para LEAP Motion',
	'Set RGB or HSV pen color':
		'Estabelecer a cor RGB ou HSV do lapis',
	'Save and restore pictures drawn by pen':
		'Gardar e restaurar as imaxes debuxadas co lapis',
	'Catch errors in a script':
		'Capturar erros nun programa',
	'Allow multi-line text input to a block':
		'Permitir texto con múltiples liñas de entrada',
//
	'(no matches)':
		'(sen resultados)',
    'take a camera snapshot and\nimport it as a new sprite':
        'tirar unha foto coa cámara\ne importala como un novo obxecto',
    'Import a new costume from your webcam':
        'Importar unha nova vestimenta coa webcam',
    'random':
        'ao chou',
    'random position':
        'posición ao chou',
    'center':
        'centro',
    '%rel to %dst':
        '%rel a %dst',
    'distance':
        'distancia',
    'costume':
        'vestimenta',
    'sound':
        'son',
    'Record a new sound':
        'Gravar un novo son',
    'Sound Recorder':
        'Gravadora de son',
    'recording':
        'gravación',
    'JIT compiler support':
        'Compatibilidade coa compilación JIT',
    'EXPERIMENTAL! uncheck to disable live\nsupport for compiling':
        'EXPERIMENTAL! Desmarque para desactivar\na compatibilidade coa compilación dinámica',
    'EXPERIMENTAL! check to enable\nsupport for compiling':
        'EXPERIMENTAL! Marcar para activar\na compatibilidade coa compilación',
    'compile %repRing for %n args':
        'compilar %repRing para %n argumentos',
    'rotate':
        'xirar',
    'stopped':
        'detido',
    'scrolled-up':
        'desprazar cara arriba',
    'scrolled-down':
        'desprazar cara abaixo',
    'Resend Verification Email...':
        'Enviar de novo o correo de verificación…',
    'Resend verification email':
        'Enviar de novo o correo de verificación',
    'User name:':
        'Nome do usuario:',
    'Camera not supported':
        'Cámara non compatíbel',
	'Please make sure your web browser is up to date\nand your camera is properly configured. \n\nSome browsers also require you to access Snap!\nthrough HTTPS to use the camera.\n\nPlase replace the "http://" part of the address\nin your browser by "https://" and try again.':
        'Comprobe que o navegador está actualizado\ne a webcam ben configurada.\n\nAlgúns navegadores tamén requiren\nHTTPS para empregar a cámara.\n\nPode probalo cambiando o enderezo «http://»\npor «https://»".',
    'Uploading ':
        'Enviando',
    'Repeat Password:':
        'Repite o contrasinal:',
    '%asp at %loc':
        '%asp en %loc' ,
    'sprites':
        'obxectos',
//Cloud messages
    'Unverified account: ':
        'Conta sen verificar: ',
    ' days left':
        ' días restantes',
    'You are now logged in, and your account\nis enabled for three days.\n':
        'Agora estás conectado e a túa conta estará\nactivada só durante tres días.\n',
    'Please use the verification link that\nwas sent to your email address when you\nsigned up.\n\n':
        'Utilice a ligazón de verificación que se lle\nenviou ao seu enderezo de correo-e cando se inscribiu.\n\n',
    'If you cannot find that email, please\ncheck your spam folder.':
        'Se non atopa o correo, comprobe\nprimeiro o cartafol do correo lixo.',
    'If you still\ncannot find it, please use the "Resend\nVerification Email..." option in the cloud\nmenu.\n\n':
        'E se non\npode atopalo, empregue a opción de «Enviar de\nnovo o correo de verificación…» nas opcións da\nnube do menú do Snap!\n\n',
    'You have ':
        'Ten ',
    ' days left.':
        ' dias restantes.',
//micròfon
    'microphone %audio':
        '%audio do micrófono',
    'volume':
        'volume',
    'note':
        'nota',
    'pitch':
        'ton',
    'signals':
        'sinais',
    'frequencies':
        'frecuencias',
    'bins':
        'compartimentos',
    'Microphone resolution...':
        'Resolución do micrófono…',
    'low':
        'baixa',
    'normal':
        'normal',
    'high':
        'alta',
    'max':
        'máxima',
//
    'play %n Hz for %n secs':
        'reproducir %n Hz durante %n segundos',
//bibliotecas
    'Text Costumes':
        'Traxes de texto',
    'Provide getters and setters for all GUI-controlled global settings':
        'Fornece «getters» e «setters» para todos os axustes globais controlados pola IGU',
    'Infinite precision integers, exact rationals, complex':
        'Números enteiros de precisión infinita, racionais exactos e complexos',
    'Provide 100 selected colors':
        'Fornece unha paleta de 100 cores\nseleccionadas',
    'Text to speech':
        'Texto a voz',
    'Animation':
        'Animacións',
    'Pixels':
        'Píxeles',
    'Audio Comp':
        'Composición de son',
    '"Bigger" Data':
        'Traballando con «Big Data»',
    'Frequency Distribution Analysis':
        'Analise da distribución de frecuencias',
    'World Map':
        'Mapa do mundo',
    'create variables in program':
        'Creando variábeis dende o programa',
    'Deal with JSON data':
        'Tratar con datos JSON',
    'Parallelization':
        'Paralelización',
    'String processing':
        'Procesamento de cadeas de texto',
    'Standard library of powerful blocks (for, map, etc.)':
        'Biblioteca estándar de potentes bloques (for, map, etc.)',
    'Traditional loop constructs (while, until, etc.) plus the Lisp "named let" (a generalization of FOR) plus functional iteration (repeated invocation of a function) and function composition.':
        'Construcción de bucles estándar (while, until, etc.), construcións «named let« propias de Lisp (unha xeneralización dos bucles «for»), iteración funcional (repeticións de chamadas a unha función) e composición de funcións.',
    'Some standard functions on lists (append, reverse, etc.)':
        'Algunhas funcións estándar para listas (append, reverse, etc.)',
    'A variation on the list data type in which each list item aren\'t computed until it\'s needed, so you can construct million-item lists without really taking up all that time or memory, or even infinite-sized lists.  (A block that reports all the prime numbers is included as an example.)':
        'Unha variación do tipo de dato «lista» no que cada elemento calculase só cando é necesario. Deste xeito poden construírse listas dun millón de elementos sen gastar tempo ou memoria, ou incluso listas infinitas. (Inclúese un bloque de exemplo que informa de todos os números primos.)',
    'Versions of +, x, AND, and OR that take more than two inputs.':
        'Versións de +, x, AND, e OR que toman máis de dúas rañuras.',
    'An extended version of the HTTP:// block that allows POST, PUT, and DELETE as well as GET requests, allows using the secure HTTPS protocol, and gives control over headers, etc.':
        'Unha versión ampliada do bloque «HTTP://» que permite facer peticións «POST», «PUT», «DELETE» e «GET», utilizar o protocolo seguro «HTTPS» e controlar as cabeceiras, etc.',
    'One of the big ideas in Logo that they left out of Scratch is thinking of text as structured into words and sentences, rather than just a string of characters.  This library brings back that idea.':
        'Unha das mellores ideas de Logo non incluída no Scratch é a de considerar un texto como unha secuencia de palabras e frases, no canto de simplemente unha cadea de caracteres. Esta biblioteca recupera esa idea.',
    'Like "switch" in C-like languages or "cond" in Lisp.  Thanks to Nathan Dinsmore for inventing the idea of a separate block for each branch!':
        'Como o «switch» de C ou o «cond» de Lisp. Grazas a Nathan Dinsmore por desenvolver a idea dun bloque separado para cada rama!',
    'Report hand positions from LEAP Motion controller (leapmotion.com).':
        'Informa da posición das mans dende un controlador de movemento LEAP (leapmotion.com).',
    'Generate costumes from letters or words of text.':
        'Xerar traxes a partires de letras ou palabras… ou calquera texto.',
    'Set or report pen color as RGB (red, green, blue) or HSV (hue, saturation, value).':
        'Fixa ou informa da cor do lapis en RGB (vermello, verde e azul) ou en HSV (tonalidade, saturación e valor).',
    'Run a script; if an error happens, instead of stopping the script with a red halo, run another script to handle the error. Also includes a block to cause an error with a message given as input. Also includes a block to create a script variable and give it a value.':
        'Executa un programa; se ocorre un erro, no canto de deter o programa cun aviso vermello, permite executar outro programa para xestionar o erro. Inclúe tamén un bloque para enviar un erro cunha mensaxe dada como entrada e tamén un bloque para crear unha variábel do programa e darlle un valor.',
    'In general, text inputs allow only a single line.  The MULTILINE block accepts multi-line text input and can be used in text input slots of other blocks.':
        'En xeral, as entradas de texto só aceptan unha única liña. O bloque MULTILIÑA acepta texto en varias liñas e pode empregarse como texto de entrada noutros bloques.',
    'Eisenberg\'s Law: Anything that can be done from the GUI should be doable from the programming language, and vice versa.':
        'A lei de Eisenberg di: Calquer cousa que poida facerse dende a interface gráfica tamén deberá poder facerse dende a linguaxe de programación e viceversa.',
    'The full Scheme numeric tower.  "USE BIGNUMS <True>" to enable.':
        'A torre numérica completa do «Scheme». Empregar «USE BIGNUMS <True>>» para activala.',
    'to use instead of hue for better selection':
        'Para seleccionar unha cor polo nome e non polo matiz.',
    'output text using speech synthesis.':
        'Gracias á síntese de voz computerizada, podemos obter son a partires dun texto',
    'glide, grow and rotate using easing functions.':
        'Facer esvarar, medrar e xirar obxectos usando formas e filtros diferentes nas animacións',
    'manipulate costumes pixel-wise.':
        'Manipula vestimentas a nivel de píxel.',
    'analyze, manipulate and generate sound samples.':
        'Analiza, manipula e xera mostras de son',
    '[EXPERIMENTAL] crunch large lists very fast':
        '[EXPERIMENTAL] Procesar listas grandes de forma moi rápida.',
    '[EXPERIMENTAL] analyze data for frequency distribution':
        '[EXPERIMENTAL] Analizar datos para obter a súa distribución de frecuencias.',
    'declare global or sprite-local variables in a script':
        'Declarar variábeis globais ou de obxecto a partires dun programa.',
    'Turn JSON strings into lists with the listify block, then retrieve data out of them by using the value at key block.':
        'Transforma as cadeas JSON en listas co bloque «listify» (listar), e após recupera datos delas usando o valor do bloque de chaves.',
    'Run several scripts in parallel and wait until all are done.':
        'Executar varios programas en paralelo e agardar que todos eles rematen.',
    'Extract substrings of a string in various ways':
        'Extrae subcadeas dunha cadea de varias formas',
//
    'translations...':
         'traducions…',
    'width':
        'largo',
    'height':
        'alto',
    'pixel':
        'píxel',
    'pixels':
        'píxeles',
    '%img of costume %cst':
        '%img da vestimenta %cst',
    'stretch %cst x: %n y: %n %':
        'estricar %cst a x: %n y: %n %',
    '%eff effect':
        'efecto %eff',
    'current':
        'actual',
    'play sound %snd at %rate Hz':
        'reproducir o son %snd a %rate Hz',
    '%aa of sound %snd':
        '%aa do son %snd',
    'duration':
        'duración',
    'length':
        'lonxitude',
    'number of channels':
        'número de canles',
    'sample rate':
        'frecuencia de mostraxe',
    'samples':
        'mostras',
    'change volume by %n':
        'aumentar o volume en %n',
    'set volume to %n %':
        'fixar o volume a %n %',
    'change balance by %n':
        'aumentar o balance en %n',
    'set balance to %n':
        'fixar o balance a %n',
    'balance':
        'balance',
    'play frequency %n Hz':
        'reproducir a frecuencia %n Hz',
    'stop frequency':
        'para a frecuencia',
    'pen %pen':
        '%pen do lapis',
    'write %s size %n':
        'escribir %s de tamaño %n',
    'draggable?':
        'arrastrábel?',
    'frequency':
        'frecuencia',
    'spectrum':
        'espectro',
    'resolution':
        'resolución',
    'neg':
        'oposto'

};
