/*

    lang-pt.js

    Portuguese (literary) translation for SNAP!

    translated by Manuel Menezes de Sequeira

    Copyright (C) 2012 by Manuel Menezes de Sequeira

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

SnapTranslator.dict.pt = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    Ä, ä   \u00c4, \u00e4
    Ö, ö   \u00d6, \u00f6
    Ü, ü   \u00dc, \u00fc
    ß      \u00df
*/

    // meta informação sobre a tradução
    'language_name':
        'Português (literário)',
    'language_translator':
        'Manuel Menezes de Sequeira',
    'translator_e-mail':
        'mmsequeira@gmail.com',
    'last_changed':
        '2013-03-22',

    // GUI
    // control bar:
    'untitled':
        'Sem título',
    'development mode':
        'modo de desenvolvimento',

    // categorias:
    'Motion':
        'Movimento',
    'Looks':
        'Aparência',
    'Sound':
        'Som',
    'Pen':
        'Caneta',
    'Control':
        'Controlo',
    'Sensing':
        'Sensores',
    'Operators':
        'Operadores',
    'Variables':
        'Variáveis',
    'Lists':
        'Listas',
    'Other':
        'Outros',

    // editor:
    'draggable':
        'arrastável',

    // separadores:
    'Scripts':
        'Guiões',
    'Costumes':
        'Trajes',
    'Sounds':
        'Sons',

    // nomes:
    'Sprite':
        'o actor',
    'Stage':
        'o palco',

    // estilos de rotação:
    'don\'t rotate':
        'não roda',
    'can rotate':
        'roda',
    'only face left/right':
        'olha apenas para a esquerda ou para a direita',

    // botão de criação de novo actor:
    'add a new sprite':
        'adicionar um novo actor',

    // ajuda nos tabuladores
    'costumes tab help':
        'Importa uma imagem de uma página Web ou de um\n'
            + 'arquivo no teu computador arrastando-a para aqui',
    'import a sound from your computer\nby dragging it into here':
        'Importa um som do teu computador\narrastando-o para aqui',

    // blocos primitivos:

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

    // movimento:
    'Stage selected:\nno motion primitives':
        'Palco seleccionado:\nsem primitivas de movimento',


    'move %n steps':
        'anda %n passos',
    'turn %clockwise %n degrees':
        'gira %clockwise %n °',
    'turn %counterclockwise %n degrees':
        'gira %counterclockwise %n °',
    'point in direction %dir':
        'altera a tua direcção para %dir °',
    'point towards %dst':
        'aponta em direcção a %dst',
    'go to x: %n y: %n':
        'vai para as coordenadas (x: %n , y: %n )',
    'go to %dst':
        'vai para a posição de %dst',
    'glide %n secs to x: %n y: %n':
        'desliza em %n s para as coordenadas (x: %n , y: %n )',
    'change x by %n':
        'adiciona %n à tua coordenada x',
    'set x to %n':
        'altera a tua coordenada x para %n',
    'change y by %n':
        'adiciona %n à tua coordenada y',
    'set y to %n':
        'altera a tua coordenada y para %n',
    'if on edge, bounce':
        'se estiveres a bater na borda, ressalta',
    'x position':
        'a coordenada x da posição',
    'y position':
        'a coordenada y da posição',
    'direction':
        'a direcção',

    // aparência:
    'switch to costume %cst':
        'muda o traje para %cst',
    'next costume':
        'passa para o próximo traje',
    'costume #':
        'o número do traje',
    'costume name':
        'o nome do traje',
    'say %s for %n secs':
        'diz %s durante %n s',
    'say %s':
        'diz %s',
    'think %s for %n secs':
        'pensa %s durante %n s',
    'think %s':
        'pensa %s',
    'Hello!':
        'Olá!',
    'Hmm...':
        'Hmm…',
    'change %eff effect by %n':
        'adiciona ao efeito %eff o valor %n',
    'set %eff effect to %n':
        'altera o teu efeito %eff para %n',
    'clear graphic effects':
        'limpa os efeitos gráficos',
    'change size by %n':
        'adiciona %n % ao teu tamanho',
    'set size to %n %':
        'altera o teu tamanho para %n %',
    'size':
        'o tamanho',
    'show':
        'mostra-te',
    'hide':
        'esconde-te',
    'go to front':
        'vem para a frente',
    'go back %n layers':
        'recua %n camadas',

    'development mode \ndebugging primitives:':
        'primitivas de depuração \ndo modo de desenvolvimento:',
    'console log %mult%s':
        'regista %mult%s na consola',
    'alert %mult%s':
        'mostra janela de alerta com %mult%s',

    // sons:
    'play sound %snd':
        'toca o som %snd',
    'play sound %snd until done':
        'toca o som %snd até terminar',
    'stop all sounds':
        'pára todos os sons',
    'rest for %n beats':
        'faz uma pausa de %n tempos',
    'play note %n for %n beats':
        'toca a nota %n durante %n tempos',
    'change tempo by %n':
        'adiciona %n bpm ao teu andamento',
    'set tempo to %n bpm':
        'altera o teu andamento para %n bpm',
    'tempo':
        'o andamento',

    // caneta:
    'clear':
        'apaga tudo do palco',
    'pen down':
        'baixa a tua caneta',
    'pen up':
        'levanta a tua caneta',
    'set pen color to %clr':
        'altera a cor da tua caneta para %clr',
    'change pen color by %n':
        'adiciona %n à cor da tua caneta',
    'set pen color to %n':
        'altera a cor da tua caneta para %n',
    'change pen shade by %n':
        'adiciona %n ao tom da tua caneta',
    'set pen shade to %n':
        'altera o tom da tua caneta para %n',
    'change pen size by %n':
        'adiciona %n à espessura da tua caneta',
    'set pen size to %n':
        'altera a espessura da tua caneta para %n',
    'stamp':
        'carimba-te',

    // controlo:
    'when %greenflag clicked':
        'Quando alguém clicar em %greenflag',
    'when %keyHat key pressed':
        'Quando alguém pressionar a tecla %keyHat',
    'when I am clicked':
        'Quando alguém clicar em ti',
    'when I receive %msgHat':
        'Quando receberes a mensagem %msgHat',
    'broadcast %msg':
        'difunde a mensagem %msg',
    'broadcast %msg and wait':
        'difunde a mensagem %msg e espera',
    'Message name':
        'Qual o nome da mensagem?',
    'wait %n secs':
        'espera %n s',
    'wait until %b':
        'espera até que %b',
    'forever %c':
        'repete %c para sempre',
    'repeat %n %c':
        'repete %n vezes %c',
    'repeat until %b %c':
        'até que %b , repete %c',
    'if %b %c':
        'se %b , então %c',
    'if %b %c else %c':
        'se %b , então %c senão, %c',
    'report %s':
        'reporta %s',
    'stop block':
        'pára este guião de bloco',
    'stop script':
        'pára este guião de actor',
    'stop all %stop':
        'pára tudo %stop',
    'run %cmdRing %inputs':
        'executa %cmdRing %inputs',
    'launch %cmdRing %inputs':
        'lança execução de %cmdRing %inputs',
    'call %repRing %inputs':
        'o resultado da invocação de %repRing %inputs',
    'run %cmdRing w/continuation':
        'executa %cmdRing com continuação',
    'call %cmdRing w/continuation':
        'o resultado da invocação de %cmdRing com continuação',
    'warp %c':
        'executa atomicamente %c',
    'when I start as a clone':
        'Quando fores criado como clone',
    'create a clone of %cln':
        'clona o actor %cln',
    'myself':
        'tu próprio',
    'delete this clone':
        'remove-te',

    // sensores:
    'touching %col ?':
        'estás a tocar em %col',
    'touching %clr ?':
        'estás a tocar na cor %clr',
    'color %clr is touching %clr ?':
        'a cor %clr está a tocar na cor %clr',
    'ask %s and wait':
        'pergunta %s e espera pela resposta',
    'what\'s your name?':
        'Como te chamas?',
    'answer':
        'a resposta dada',
    'mouse x':
        'a coordenada x do rato',
    'mouse y':
        'a coordenada y do rato',
    'mouse down?':
        'o botão do rato está pressionado',
    'key %key pressed?':
        'a tecla %key está a ser pressionada',
    'distance to %dst':
        'a distância até %dst',
    'reset timer':
        'reinicia o cronómetro',
    'timer':
        'o valor do cronómetro',
    '%att of %spr':
        '%att de %spr',
    'http:// %s':
        'http:// %s',
    'turbo mode?':
        'o modo turbo está activo',
    'set turbo mode to %b':
        'alterar o modo turbo para %b',

    'filtered for %clr':
        'filtrado para %clr',
    'stack size':
        'altura da pilha',
    'frames':
        'molduras',

    // operadores:
    '%n mod %n':
        'o resto de %n a dividir por %n',
    'round %n':
        'o arredondamento de %n',
    '%fun of %n':
        '%fun de %n',
    'pick random %n to %n':
        'um valor ao acaso entre %n e %n',
    '%b and %b':
        '%b e %b',
    '%b or %b':
        '%b ou %b',
    'not %b':
        'é falso que %b',
    'true':
        'verdadeiro',
    'false':
        'falso',
    'join %words':
        'a junção de %words',
    'hello':
        'Olá',
    'world':
        'mundo!',
    'letter %n of %s':
        'o caractere %n de %s',
    'length of %s':
        'o comprimento de %s',
    'unicode of %s':
        'o código Unicode do caractere %s',
    'unicode %n as letter':
        'o caractere cujo código Unicode é %n',
    'is %s a %typ ?':
        '%s é um/uma %typ',
    'is %s identical to %s ?':
        '%s é idêntico a %s',

    'type of %s':
        'o tipo de %s',

    // variáveis:
    'Make a variable':
        'Criar uma variável',
    'Variable name':
        'Qual o nome da variável?',
    'Delete a variable':
        'Remover uma variável',

    'set %var to %s':
        'altera %var para %s',
    'change %var by %n':
        'adiciona a %var o valor %n',
    'show variable %var':
        'mostra a variável %var',
    'hide variable %var':
        'esconde a variável %var',
    'script variables %scriptVars':
        'cria as variáveis de guião %scriptVars',

    // listas:
    'list %exp':
        'uma nova lista com %exp',
    '%s in front of %l':
        'a prefixação de %s a %l',
    'item %idx of %l':
        '%idx de %l',
    'all but first of %l':
        'uma nova lista com todos menos o primeiro item de %l',
    'length of %l':
        'o comprimento de %l',
    '%l contains %s':
        '%l contém %s',
    'thing':
        'um valor',
    'add %s to %l':
        'acrescenta %s a %l',
    'delete %ida of %l':
        'remove %ida de %l',
    'insert %s at %idx of %l':
        'insere %s antes de %idx de %l',
    'replace item %idx of %l with %s':
        'substitui %idx de %l por %s',

    // outros
    'Make a block':
        'Criar um bloco',

    // menus
    // snap menu
    'About...':
        'Acerca do Snap!…',
    'Reference manual':
        'Ler o Manual de referência',
    'Snap! website':
        'Ir para o sítio Web do Snap!',
    'Download source':
        'Descarregar o código fonte',
    'Switch back to user mode':
        'Regressar ao modo de utilizador',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'Desactivar menus de contexto\nprofundos do Morphic e\nmostrar menus amigáveis.',
    'Switch to dev mode':
        'Passar ao modo de desenvolvimento',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'Activar menus de contexto\ne inspectores não\namigáveis do Morphic!',

    // menu de projecto
    'Project notes...':
        'Notas deste projecto…',
    'New':
        'Criar um novo projecto',
    'Open...':
        'Abrir um projecto…',
    'Save':
        'Guardar este projecto',
    'Save As...':
        'Guardar este projecto como…',
    'Import...':
        'Importar para este projecto…',
    'file menu import hint':
        'Importar para este projecto\num projecto exportado,\n'
            + 'uma biblioteca de blocos,\n'
            + 'um traje ou um som.',
    'Export project as plain text...':
        'Exportar este projecto como texto simples…',
    'Export project...':
        'Exportar este projecto…',
    'show project data as XML\nin a new browser window':
        'Mostrar os dados do projecto no\nformato XML numa nova janela do navegador.',
    'Export blocks...':
        'Exportar blocos deste projecto…',
    'show global custom block definitions as XML\nin a new browser window':
        'Mostrar as definições de blocos\npersonalizados globais no formato\nXML numa nova janela do navegador.',
    'Import tools':
        'Importar as ferramentas oficiais para este projecto',
    'load the official library of\npowerful blocks':
        'Importar para este projecto\na biblioteca oficial de blocos.',

    // menu da nuvem
    'Login...':
        'Entrar na sua conta…',
    'Signup...':
        'Registar uma nova conta…',

    // menu de preferências
    'Language...':
        'Língua…',
    'Zoom blocks...':
        'Ampliação dos blocos…',
    'Blurred shadows':
        'Sombras desfocadas',
    'uncheck to use solid drop\nshadows and highlights':
        'Desassinalar para usar sombras\ne realces nítidos.',
    'check to use blurred drop\nshadows and highlights':
        'Assinalar para usar sombras\ne realces desfocados.',
    'Zebra coloring':
        'Coloração em zebra',
    'check to enable alternating\ncolors for nested blocks':
        'Assinalar para alternar\nas cores de blocos aninhados.',
    'uncheck to disable alternating\ncolors for nested block':
        'Desassinalar para deixar de alternar\nas cores de blocos aninhados.',
    'Dynamic input labels':
        'Etiquetas de entrada dinâmicas',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'Desassinalar para desactivar etiquetas\ndinâmicas nas entradas variádicas.',
    'check to enable dynamic\nlabels for variadic inputs':
        'Assinalar para activar etiquetas\ndinâmicas nas entradas variádicas.',
    'Prefer empty slot drops':
        'Preferir largadas em ranhuras vazias',
    'settings menu prefer empty slots hint':
        'Assinalar para focar em ranhuras vazias\nquando arrastando e '
            + 'largando repórteres.',
    'uncheck to allow dropped\nreporters to kick out others':
        'Desassinalar para permitir que\nrepórteres largados '
            + 'desalojem outros.',
    'Long form input dialog':
        'Forma longa da caixa de diálogo dos parâmetros',
    'check to always show slot\ntypes in the input dialog':
        'Assinalar para mostrar sempre\no tipo das ranhuras na caixa\nde diálogo dos parâmetros.',
    'uncheck to use the input\ndialog in short form':
        'Desassinalar para usar a forma curta\nda caixa de diálogo dos parâmetros.',
    'Virtual keyboard':
        'Teclado virtual',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'Desassinalar para desactivar o\nsuporte do teclado virtual\npara dispositivos '
            + 'móveis.',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'Assinalar para activar o\nsuporte do teclado virtual\npara dispositivos '
            + 'móveis.',
    'Input sliders':
        'Deslizadores nas ranhuras',
    'uncheck to disable\ninput sliders for\nentry fields':
        'Desassinalar para desactivar\ndeslizadores nas ranhuras dos blocos.',
    'check to enable\ninput sliders for\nentry fields':
        'Assinalar para activar deslizadores\nnas ranhuras dos blocos.',
    'Clicking sound':
        'Som de cliques',
    'uncheck to turn\nblock clicking\nsound off':
        'Desassinalar para desactivar o som\nproduzido ao clicar nos blocos.',
    'check to turn\nblock clicking\nsound on':
        'Assinar para activar o som\nproduzido ao clicar nos blocos.',
    'Animations':
        'Animações',
    'uncheck to disable\nIDE animations':
        'Desassinalar para desactivar\nas animações do AID',
    'Turbo mode':
        'Modo turbo',
    'check to prioritize\nscript execution':
        'Assinalar para dar prioridade\nà execução de guiões.',
    'uncheck to run scripts\nat normal speed':
        'Desssinalar para executar os guiões\nà velocidade normal.',
    'check to enable\nIDE animations':
        'Assinalar para activar\nas animações do AID',
    'Thread safe scripts':
        'Guiões seguros face a threads',
    'uncheck to allow\nscript reentrance':
        'Desassinar para permitir\nreentrância nos guiões.',
    'check to disallow\nscript reentrance':
        'Assinar para não permitir\nreentrância nos guiões.',
    'Prefer smooth animations':
        'Preferir animações suaves',
    'uncheck for greater speed\nat variable frame rates':
        'Desassinalar para aumentar a velocidade\npermitindo ritmos variáveis das tramas.',
    'check for smooth, predictable\nanimations across computers':
        'Assinalar para obter animações mais suaves\ne previsíveis de computador para computador.',

    // entradas
    'with inputs':
        'com argumentos',
    'input names:':
        'com parâmetros',
    'Input Names:':
        'Parâmetros:',
    'input list:':
        'lista de argumentos:',

    // menus de contexto:
    'help':
        'ajuda',

    // blocos:
    'help...':
        'ajuda…',
    'relabel...':
        'mudar para outro bloco…',
    'duplicate':
        'duplicar',
    'make a copy\nand pick it up':
        'Fazer uma cópia do\nbloco e agarrá-la.',
    'only duplicate this block':
        'Duplicar apenas este bloco.',
    'delete':
        'remover',
    'script pic...':
        'imagem do guião…',
    'open a new window\nwith a picture of this script':
        'Abrir uma nova janela com\numa imagem deste guião.',
    'ringify':
        'adicionar anel',
    'unringify':
        'remover anel',

    // blocos personalizados:
    'delete block definition...':
        'remover definição do bloco…',
    'edit...':
        'editar…',

    // actores:
    'edit':
        'editar',
    'export...':
        'exportar…',

    // palco:
    'show all':
        'mostrar todos os actores',
    'pic...':
        'fotografar...',
    'open a new window\nwith a picture of the stage':
        'Abre uma nova janela com\numa fotografia do palco.',

    // área de guiões:
    'clean up':
        'arrumar',
    'arrange scripts\nvertically':
        'Organizar os guiões\nverticalmente.',
    'add comment':
        'adicionar comentário',
    'make a block...':
        'criar um bloco…',

    // trajes:
    'rename':
        'alterar o nome',
    'export':
        'exportar',
    'rename costume':
        'Qual o novo nome do traje?',

    // sounds
    'Play sound':
        'Tocar som.',
    'Stop sound':
        'Parar som.',
    'Stop':
        'Parar',
    'Play':
        'Tocar',
    'rename sound':
        'Qual o novo nome do som?',

    // caixas de diálogo
    // botões
    'OK':
        'OK',
    'Ok':
        'OK',
    'Cancel':
        'Cancelar',
    'Yes':
        'Sim',
    'No':
        'Não',
    'Open':
        'Abrir',
    'Share':
        'Partilhar',

    // ajuda
    'Help':
        'Ajuda',

    // ampliação de blocos
    'Zoom blocks':
        'Ampliação de blocos',
    'build':
        'cria',
    'your own':
        'os teus próprios',
    'blocks':
        'blocos',
    'normal (1x)':
        'normal (1x)',
    'demo (1.2x)':
        'demonstração (1.2x)',
    'presentation (1.4x)':
        'apresentação (1.4x)',
    'big (2x)':
        'grande (2x)',
    'huge (4x)':
        'enorme (4x)',
    'giant (8x)':
        'gigante (8x)',
    'monstrous (10x)':
        'monstruosa (10x)',

    // Gestor de Projectos
     'Untitled':
        'Sem título',
    'Open Project':
        'Abrir Projecto',
    '(empty)':
        '(nada)',
    'Saved!':
        'Guardado!',
    'Delete Project':
        'Remover Projecto',
    'Are you sure you want to delete':
        'Quer mesmo remover?',
    'rename...':
        'alterar o nome…',
    'Cloud':
        'Nuvem',
    'Browser':
        'Navegador',
    'Examples':
        'Exemplos',
    'You are not logged in':
        'Ainda não se autenticou',
    'Updating project list...':
        'Actualizando a lista de projectos…',
    'Opening project...':
        'Abrindo o projecto…',
    'Fetching project from the cloud...':
        'Obtendo o projecto da nuvem…',
    'Saving project to the cloud...':
        'Guardando o projecto na nuvem…',
    'saved.':
        'guardado.',

    // editor de trajes
    'Costume Editor':
        'Editor de Trajes',
    'click or drag crosshairs to move the rotation center':
        'Clique ou arraste a mira para alterar o centro de rotação.',

    // notas de projecto
    'Project Notes':
        'Notas do Projecto',

    // novo projecto
    'New Project':
        'Novo Projecto',
    'Replace the current project with a new one?':
        'Substituir este projecto por um novo projecto?',

    // guardar projecto
    'Save Project As...':
        'Guardar Projecto Como…',

    // exportar blocos
    'Export blocks':
        'Exportar blocos',
    'Import blocks':
        'Importar blocos',
    'this project doesn\'t have any\ncustom global blocks yet':
        'Este projecto ainda não tem\nnenhum bloco personalizado global.',
    'select':
        'seleccionar',
    'all':
        'todos',
    'none':
        'nenhum',

    // caixa de diálogo de variáveis
    'for all sprites':
        'para todos os objectos',
    'for this sprite only':
        'apenas para este objecto',

    // caixa de diálogo de blocos
    'Change block':
        'Alterar tipo de bloco',
    'Command':
        'Comando',
    'Reporter':
        'Repórter',
    'Predicate':
        'Predicado',

    // editor de blocos
    'Block Editor':
        'Editor de Blocos',
    'Apply':
        'Aplicar',

    // caixa de diálogo de remoção de bloco
    'Delete Custom Block':
        'Remover Bloco Personalizado',
    'block deletion dialog text':
        'Quer mesmo remover este bloco e '
            + 'todas as suas utilizações?',

    // caixa de diálogo de parâmetros
    'Create input name':
        'Criar parâmetro',
    'Edit input name':
        'Editar parâmetro',
    'Edit label fragment':
        'Editar etiqueta',
    'Title text':
        'Etiqueta',
    'Input name':
        'Parâmetro',
    'Delete':
        'Remover',
    'Object':
        'Objecto',
    'Number':
        'Número',
    'Text':
        'Texto',
    'List':
        'Lista',
    'Any type':
        'Qualquer tipo',
    'Boolean (T/F)':
        'Booleano (V/F)',
    'Command\n(inline)':
        'Comando\n(em linha)',
    'Command\n(C-shape)':
        'Comando\n(em forquilha)',
    'Any\n(unevaluated)':
        'Repórter\n(forma especial)',
    'Boolean\n(unevaluated)':
        'Predicado\n(forma especial)',
    'Single input.':
        'Parâmetro único.',
    'Default Value:':
        'Valor em caso de omissão do argumento:',
    'Multiple inputs (value is list of inputs)':
        'Múltiplos argumentos (o valor do parâmetro é a lista dos argumentos).',
    'Upvar - make internal variable visible to caller':
        'Tornar o parâmetro visível ao invocador.',

    // Acerca do Snap
    'About Snap':
        'Sobre o Snap!',
    'Back...':
        'Para trás…',
    'License...':
        'Licença…',
    'Modules...':
        'Módulos…',
    'Credits...':
        'Créditos…',
    'Translators...':
        'Tradutores…',
    'License':
        'Licença',
    'current module versions:':
        'versões actuais dos módulos',
    'Contributors':
        'Contribuidores',
    'Translations':
        'Traduções',

    // observadores de variáveis
    'normal':
        'normal',
    'large':
        'grande',
    'slider':
        'deslizador',
    'slider min...':
        'mínimmo do deslizador…',
    'slider max...':
        'máximo do deslizador…',
    'import...':
        'importar…',
    'Slider minimum value':
        'Valor mínimo do deslizador',
    'Slider maximum value':
        'Valor máximo do deslizador',

    // observadores de listas
    'length: ':
        'comprimento: ',

    // comentários
    'add comment here...':
        'colocar aqui um comentário…',

    // drop downs
    // direcções
    '(90) right':
        '90° (direita)',
    '(-90) left':
        '-90° (esquerda)',
    '(0) up':
        '0° (cima)',
    '(180) down':
        '180° (baixo)',

    // detecção de colisões
    'mouse-pointer':
        'ponteiro do rato',
    'edge':
        'borda',
    'pen trails':
        'traços da caneta',

    // trajes
    'Turtle':
        'Seta',
    'Empty':
        'Vazio',

    // efeitos gráficos
    'ghost':
        'fantasma',

    // teclas
    'space':
        'espaço',
    'up arrow':
        'seta para cima',
    'down arrow':
        'seta para baixo',
    'right arrow':
        'seta para a direita',
    'left arrow':
        'seta para a esquerda',
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

    // messagens
    'new...':
        'Nova…',

    // funções matemáticas
    'abs':
        'valor absoluto',
    'sqrt':
        'raiz quadrada',
    'sin':
        'seno',
    'cos':
        'cosseno',
    'tan':
        'tangente',
    'asin':
        'arco-seno',
    'acos':
        'arco-cosseno',
    'atan':
        'arco-tangente',
    'ln':
        'logaritmo natural',
    'e^':
        'exponencial',

    // tipos de dados
    'number':
        'número',
    'text':
        'texto',
    'Boolean':
        'booleano',
    'list':
        'lista',
    'command':
        'comando',
    'reporter':
        'repórter',
    'predicate':
        'predicado',

    // índices de listas
    'last':
        'o fim',
    'any':
        'qualquer dos itens'
};
