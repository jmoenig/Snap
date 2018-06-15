/*

    lang-pt.js

    Portuguese (literary) translation for SNAP!

    translated by Manuel Menezes de Sequeira

    Copyright (C) 2016 by Manuel Menezes de Sequeira

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
        'Português',
    'language_translator':
        'Manuel Menezes de Sequeira',
    'translator_e-mail':
        'mmsequeira@gmail.com',
    'last_changed':
        '2017-10-30',

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
    'Backgrounds':
        'Cenários',
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
    'play note %note for %n beats':
        'toca a nota %note durante %n tempos',
    'set instrument to %inst':
        'altera o teu instrumento para %inst',
    'change tempo by %n':
        'adiciona %n bpm ao teu andamento',
    'set tempo to %n bpm':
        'altera o teu andamento para %n bpm',
    'tempo':
        'o andamento',

    // "instrumento", i.e. formas de onda:
    '(1) sine':
        '(1) sinusoisal',
    '(2) square':
        '(2) quadrada',
    '(3) sawtooth':
        '(3) dente de serra',
    '(4) triangle':
        '(4) triangular',

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
    'fill':
        'enche o palco',

    // controlo:
    'when %greenflag clicked':
        'Quando alguém clicar em %greenflag',
    'when %keyHat key pressed':
        'Quando alguém pressionar a tecla %keyHat',
    'when I am %interaction':
        'Quando o rato %interaction',
    'clicked':
        'clicar em ti',
    'pressed':
        'pressionar em ti',
    'dropped':
        'te largar',
    'mouse-entered':
        'entrar em ti',
    'mouse-departed':
        'sair de ti',
    'scrolled-down':
        'rolar para baixo',
    'scrolled-up':
        'rolar para cima',
    'when %b':
        'Quando %b',
    'when I receive %msgHat':
        'Quando receberes a mensagem %msgHat',
    'broadcast %msg':
        'difunde a mensagem %msg',
    'broadcast %msg and wait':
        'difunde a mensagem %msg e espera',
    'Message name':
        'Qual o nome da mensagem?',
    'message':
        'a mensagem',
    'any message':
        'qualquer mensagem',
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
    'stop %stopChoices':
        'pára %stopChoices',
    'all':
        'tudo',
    'this script':
        'este guião de objecto',
    'this block':
        'este guião de bloco',
    'stop %stopOthersChoices':
        'pára %stopOthersChoices',
    'all but this script':
        'todos os guiões de objecto excepto este',
    'other scripts in sprite':
        'os outros guiões deste objecto',
    'pause all %pause':
        'faz pausa em tudo %pause',
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
        'cria um novo clone de %cln',
    'a new clone of %cln':
        'um novo clone de %cln',
    'myself':
        'ti',
    'delete this clone':
        'remove-te',
    'tell %spr to %cmdRing %inputs':
        'diz a %spr para executar %cmdRing %inputs',
    'ask %spr for %repRing %inputs':
        'o resultado de %spr invocar %repRing %inputs',

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
    '%rel to %dst':
        '%rel até %dst',
    'distance':
        'a distância',
    'reset timer':
        'reinicia o cronómetro',
    'timer':
        'o valor do cronómetro',
    '%att of %spr':
        '%att de %spr',
    'my %get':
        '%get',
    'http:// %s':
        'o recurso http:// %s',
    'turbo mode?':
        'o modo turbo está activo',
    'set turbo mode to %b':
        'alterar o modo turbo para %b',
    'current %dates':
        '%dates corrente',
    'year':
        'o ano',
    'month':
        'o mês',
    'date':
        'o dia',
    'day of week':
        'o dia da semana',
    'hour':
        'a hora',
    'minute':
        'o minuto',
    'second':
        'o segundo',
    'time in milliseconds':
        'o tempo (em milisegundos)',

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
    'split %s by %delim':
        'uma lista com os troços de %s entre %delim',
    'hello':
        'Olá',
    'world':
        'mundo!',
    'letter %idx of %s':
        'o caractere %idx de %s',
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
    'JavaScript function ( %mult%s ) { %code }':
        'função JavaScript ( %mult%s ) { %code }',
    'compile %repRing':
        'a compilação de %repRing',

    'type of %s':
        'o tipo de %s',

    // variáveis:
    'Make a variable':
        'Criar uma variável',
    'Variable name':
        'Qual o nome da variável?',
    'Script variable name':
        'Qual o nome da variável de guião?',
    'inherit %shd':
        'herda %shd do teu progenitor',
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
        'uma lista com %exp',
    '%s in front of %l':
        'a prefixação de %s a %l',
    'item %idx of %l':
        '%idx de %l',
    'all but first of %l':
        'uma lista com os itens de %l menos o primeiro',
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
        'insere %s como %idx de %l',
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
    'Save to disk':
        'Guardar no disco',
    'store this project\nin the downloads folder\n(in supporting browsers)':
        'Guardar este projecto\nna sua pasta de descargas\n'
            + '(em navegadores que o suportem).',
    'Save As...':
        'Guardar este projecto como…',
    'Import...':
        'Importar…',
    'file menu import hint':
        'Abrir um projecto exportado,\nsubstitundo o projecto corrente, ou\n'
            + 'importar uma biblioteca de blocos, um\n'
            + 'traje ou um som para o projecto corrente.',
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
    'Unused blocks...':
          'Blocos não usados…',
    'find unused global custom blocks\nand remove their definitions':
        'Procurar os blocos personalizados globais\nnão usados e remover as suas definições',
    'Remove unused blocks':
        'Remover blocos não usados',
    'there are currently no unused\nglobal custom blocks in this project':
        'de momento não há blocos personalizados\nglobais não usados neste projecto',
    'unused block(s) removed':
        'blocos não usados removidos',
    'Export summary...':
        'Exportar resumo…',
    'open a new browser browser window\n with a summary of this project':
        'Abrir uma nova janela no navegador\ncontendo um resumo deste projecto',

    'Contents':
        'Índice',
    'Kind of':
        'Do tipo de',
    'Part of':
        'Uma parte de',
    'Parts':
        'Partes',
    'Blocks':
        'Blocos',
    'For all Sprites':
        'Para todos os Actores',
    'Import tools':
        'Importar as ferramentas oficiais para este projecto',
    'load the official library of\npowerful blocks':
        'Importar para este projecto\na biblioteca oficial de blocos.',
    'Libraries...':
        'Bibliotecas...',
    'Import library':
        'Importar biblioteca',

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
    'Stage size...':
        'Tamanho do palco…',
    'Stage size':
        'Tamanho do palco',
    'Stage width':
        'Largura do palco',
    'Stage height':
        'Altura do palco',
    'Default':
        'Normal',
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
    'Plain prototype labels':
        'Texto dos protótipos simples',
    'uncheck to always show (+) symbols\nin block prototype labels':
        'Desassinalar para mostrar sempre os símbolos (+)\nno texto dos protótipos dos blocos',
    'check to hide (+) symbols\nin block prototype labels':
        'Assinalar para esconder os símbolos (+)\nno texto dos protótipos dos blocos',
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
    'Retina display support':
        'Suporte para o ecrã retina',
    'Codification support':
        'Suportar produção de código',
    'Clicking sound':
        'Som de cliques',
    'uncheck to turn\nblock clicking\nsound off':
        'Desassinalar para desactivar o som\nproduzido ao clicar nos blocos.',
    'check to turn\nblock clicking\nsound on':
        'Assinalar para activar o som\nproduzido ao clicar nos blocos.',
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
    'Flat design':
        'Design plano',
    'Nested auto-wrapping':
        'Quebras de linha aninhadas',
    'Keyboard Editing':
        'Edição usando o teclado',
    'Table support':
        'Suporte de tabelas',
    'Table lines':
        'Tabelas com linhas',
    'Visible stepping':
        'Traçado passo a passo visível',
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
    'Flat line ends':
        'Extremos das linhas planos',
    'check for flat ends of lines':
        'Assinalar para que os extremos das linhas\ndesenhadas pela caneta sejam planos.',
    'uncheck for round ends of lines':
        'Desassinalar para que os extremos das linhas\ndesenhadas pela caneta sejam redondos.',
    'Ternary Boolean slots':
        'Ranhuras booleanas ternárias',
    'Inheritance support':
        'Suporte para herança',

    // entradas
    'with inputs':
        'com argumentos',
    'input names:':
        'com parâmetros',
    'Input Names:':
        'Parâmetros:',
    'input list:':
        'os itens de',

    // menus de contexto:
    'help':
        'ajuda',

    // palette:
    'find blocks':
        'procurar blocos',
    'hide primitives':
        'esconder blocos primitivos',
    'show primitives':
        'mostrar blocos primitivos',

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
        'fotografia do guião…',
    'open a new window\nwith a picture of this script':
        'Abrir uma nova janela com\numa fotografia deste guião.',
    'ringify':
        'adicionar anel',
    'unringify':
        'remover anel',
    'transient':
        'transiente',
    'uncheck to save contents\nin the project':
        'Desassinalar para guardar\no conteúdo no projecto',
    'check to prevent contents\nfrom being saved':
        'Assinalar para não guardar\no conteúdo no projecto',
    'new line':
        'nova linha',

    // blocos personalizados:
    'delete block definition...':
        'remover definição do bloco…',
    'edit...':
        'editar…',

    // actores:
    'edit':
        'editar',
    'clone':
        'clonar',
    'move':
        'mover',
    'pivot':
        'editar centro de rotação',
    'edit the costume\'s\nrotation center':
        'Drehpunkt des Kostüms\nanzeigen und verschieben',
    'rotate':
        'rodar',
    'detach from':
        'soltar de',
    'detach all parts':
        'soltar todas as partes',
    'export...':
        'exportar…',
    'parent...':
        'progenitor…',
    'current parent':
        'progenitor actual',
    'release':
        'tornar clone temporário',
    'make temporary and\nhide in the sprite corral':
        'tornar temporário e\nesconder da lista de actores',

    // palco:
    'show all':
        'mostrar todos os actores',
    'pic...':
        'fotografia…',
    'open a new window\nwith a picture of the stage':
        'Abrir uma nova janela com\numa fotografia do palco.',

    // área de guiões:
    'clean up':
        'arrumar',
    'arrange scripts\nvertically':
        'Organizar os guiões\nverticalmente.',
    'add comment':
        'adicionar comentário',
    'undrop':
        'desfazer última largada',
    'undo the last\nblock drop\nin this pane':
        'Desfazer a última largada de um bloco\nneste separador.',
    'redrop':
        'refazer última largada',
    'use the keyboard\nto enter blocks':
        'usar o teclado\npara introduzir blocos',
    'scripts pic...':
        'fotografia dos guiões…',
    'open a new window\nwith a picture of all scripts':
        'Abrir uma nova janela com\numa fotografia de todos os guiões.',
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

    // lists and tables
    'list view...':
        'vista de lista…',
    'table view...':
        'vista de tabela…',
    'open in dialog...':
        'abrir em caixa de diálogo…',
    'reset columns':
        'reiniciar colunas',
    'items':
        'itens',

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
    'Open':
        'Abrir',
    '(empty)':
        '(nada)',
    'Saved!':
        'Guardado!',
    'Delete Project':
        'Remover Projecto',
    'Are you sure you want to delete':
        'Quer mesmo remover',
    'rename...':
        'alterar o nome…',

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
    'none':
        'nenhum',

    // caixa de diálogo de variáveis
    'for all sprites':
        'para todos os objectos',
    'for this sprite only':
        'apenas para este objecto',

    // refactorização de variáveis
    'rename only\nthis reporter':
        'alterar o nome\napenas neste repórter',
    'rename all...':
        'alterar o nome em todo o lado…',
    'rename all blocks that\naccess this variable':
        'alterar todos os blocos que\nusam esta variável',


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
    'Method Editor':
        'Editor de Métodos',
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

    // monitores de variáveis
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

    // monitores de listas
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
    'random':
        'um valor ao acaso',
     'random position':
        'um ponto ao acaso',

    // detecção de colisões
    'mouse-pointer':
        'o ponteiro do rato',
    'edge':
        'a borda',
    'pen trails':
        'os traços da caneta',
    'center':
        'o centro',

    // trajes
    'Turtle':
        'tartaruga',
    'Empty':
        'vazio',

    // efeitos gráficos
    'color':
        'cor',
    'fisheye':
        'olho-de-peixe',
    'whirl':
        'remoinho',
    'pixelate':
        'pixelização',
    'mosaic':
        'mosaico',
    'saturation':
        'saturação',
    'brightness':
        'brilho',
    'ghost':
        'fantasma',
    'negative':
        'negativo',
    'comic':
        'ondeado',
    'confetti':
        'confetes',

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
    'any key':
        'qualquer',
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
        'o valor absoluto',
    'ceiling':
        'o arredondamento para cima',
    'floor':
        'o arredondamento para baixo',
    'sqrt':
        'a raiz quadrada',
    'sin':
        'o seno',
    'cos':
        'o cosseno',
    'tan':
        'a tangente',
    'asin':
        'o arco-seno',
    'acos':
        'o arco-cosseno',
    'atan':
        'o arco-tangente',
    'ln':
        'o logaritmo natural',
    'e^':
        'a exponencial',

    // Introdução pelo teclado de expressões booleanas
    'not':
        'é falso que',

    // delimitadores
    'letter':
        'letra',
    'whitespace':
        'espaços em branco',
    'line':
        'linha',
    'tab':
        'tabuladores',
    'cr':
        'retornos',

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
    'sprite':
        'actor',

    // índices de listas
    'last':
        'o último item',
    'any':
        'um item ao acaso',

    // attributes
    'my':
        '',
    'neighbors':
        'os vizinhos',
    'self':
        'tu próprio',
    'other sprites':
        'os outros actores',
    'parts':
        'as partes',
    'anchor':
        'a âncora',
    'parent':
        'o progenitor',
    'children':
        'os descendentes',
    'clones':
        'os clones',
    'other clones':
        'os outros clones',
    'dangling?':
        'estás pendurado',
    'rotation x':
        'a coordenada x de rotação',
    'rotation y':
        'a coordenada y de rotação',
    'center x':
        'a coordenada x do centro',
    'center y':
        'a coordenada y do centro',
    'name':
        'o nome',
    'stage':
        'o palco',
    'costumes':
        'os trajes',
    'sounds':
        'os sons',
    'scripts':
        'os guiões',

    // herança
    'inherited':
        'herdado',
    'check to inherit\nfrom':
        'assinalar para\nherdar de',
    'uncheck to\ndisinherit':
        'desassinalar para\nnão herdar',

    // em falta no ficheiro lang-de.js
    'log':
        'o logaritmo',
    'url %s':
        'o recurso http:// %s',
    'delete %shd':
        'remove %shd',
    'uncheck for lower resolution,\nsaves computing resources':
        'Desassinalar para menor resolução;\npoupa recursos computacionais.',
    'check for higher resolution,\nuses more computing resources':
        'Assinalar para maior resolução;\ngasta mais recursos computacionais.',
    'First-Class Sprites':
        'Actores de primeira classe',
    'uncheck to disable support\nfor first-class sprites':
        'Desassinalar para desactivar o suporte\nde actores de primeira classe.',
    'check to enable support\n for first-class sprite':
        'Assinalar para activar o suporte\nde actores de primeira classe.',
    'Live coding support':
        'Suporte de programação ao vivo',
    'EXPERIMENTAL! check to enable\n live custom control structures':
        'EXPERIMENTAL! Assinalar para activar estruturas\nde controlo personalizadas ao vivo.',
    'EXPERIMENTAL! uncheck to disable live\ncustom control structures':
        'EXPERIMENTAL! Desassinalar para desactivar estruturas\nde controlo personalizadas ao vivo.',
    'Persist linked sublist IDs':
        'Persistir ID de sublistas ligadas',
    'check to enable\nsaving linked sublist identities':
        'Assinalar para activar o\narmazenamento das identidades de sublistas ligadas.',
    'uncheck to disable\nsaving linked sublist identities':
        'Desassinalar para desactivar o\narmazenamento das identidades de sublistas ligadas.',
    'grow':
        'aumentar',
    'shrink':
        'reduzir',
    'flip ↔':
        'inverter ↔',
    'flip ↕':
        'inverter ↕',
    'Export all scripts as pic...':
        'Exportar todos os guiões como fotografia…',
    'show a picture of all scripts\nand block definitions':
        'Mostra uma imagem com todos\nos guiões e definições de blocos',
    'find blocks...':
        'procurar blocos…',
    'costume name':
        'o nome do traje',
    'Share':
        'Partilhar',
    'Snap!Cloud':
        'Snap!Nuvem',
    'Cloud':
        'Nuvem',
    'could not connect to:':
        'Não foi possível ligar a:',
    'Service:':
        'Serviço:',
    'login':
        'autenticação',
    'ERROR: INVALID PASSWORD':
        'ERRO: PALAVRA-PASSE INVÁLIDA',
    'Browser':
        'Navegador',
    'Sign up':
        'Registar nova conta',
    'Signup':
        'Registo de nova conta',
    'Sign in':
        'Entrar',
    'Logout':
        'Sair',
    'Change Password...':
        'Alterar palavra-passe…',
    'Change Password':
        'Alterar palavra-passe',
    'Account created.':
        'Conta criada.',
    'An e-mail with your password\nhas been sent to the address provided':
        'Foi enviada uma mensagem para\no endereço disponibilizado\ncontendo a sua palavra-passe.',
    'now connected.':
        'entrou.',
    'disconnected.':
        'saiu.',
    'Reset password':
        'Recuperar palavra-passe',
    'Reset Password...':
        'Recuperar palavra-passe…',
    'User name:':
        'Nome de utilizador:',
    'Password:':
        'Palavra-passe:',
    'Old password:':
        'Palavra-passe actual:',
    'New password:':
        'Nova palavra-passe:',
    'Repeat new password:':
        'Repita a nova palavra-passe:',
    'Birth date:':
        'Data de nascimento:',
    'January':
        'Janeiro',
    'February':
        'Fevereiro',
    'March':
        'Março',
    'April':
        'Abril',
    'May':
        'Maio',
    'June':
        'Junho',
    'July':
        'Julho',
    'August':
        'Agosto',
    'September':
        'Setembro',
    'October':
        'Outubro',
    'November':
        'Novembro',
    'December':
        'Dezembro',
    'year:':
        'ano:',
    ' or before':
        ' ou antes',
    'E-mail address:':
        'Endereço de correio electrónico:',
    'E-mail address of parent or guardian:':
        'Endereço de encarregado de educação:',
    'Terms of Service...':
        'Termos do Serviço…',
    'Privacy...':
        'Privacidade…',
    'I have read and agree\nto the Terms of Service':
        'Li e declaro concordar\ncom os Termos do Serviço',
    'stay signed in on this computer\nuntil logging out':
        'manter-me autenticado neste\ncomputador até que saia',
    'please fill out\nthis field':
        'Por favor preencha\neste campo.',
    'User name must be four\ncharacters or longer':
        'O nome de utilizador tem de ter\npelo menos quatro caracteres.',
    'please provide a valid\nemail address':
        'Por favor indique um endereço\nde correio electrónico válido.',
    'password must be six\ncharacters or longer':
        'A palavra-passe tem de ter\npelo menos seis caracteres.',
    'passwords do\nnot match':
        'As palavras-passe\nnão correspondem.',
    'please agree to\nthe TOS':
        'Por favor concorde com\nos Termos do Serviço.',
    'Examples':
        'Exemplos',
    'You are not logged in':
        'Ainda não se autenticou',
    'Updating\nproject list...':
        'Actualizando a\nlista de projectos…',
    'Opening project...':
        'Abrindo o projecto…',
    'Fetching project\nfrom the cloud...':
        'Obtendo o projecto\nda nuvem…',
    'Saving project\nto the cloud...':
        'Guardando o projecto\nna nuvem…',
    'Sprite Nesting':
        'Actores compostos',
    'uncheck to disable\nsprite composition':
        'Desassinalar para desactivar\na composição de actores.',
    'check for block\nto text mapping features':
        'Assinalar para funcionalidades\nde mapeamento entre blocos e texto.',
    'saved.':
        'guardado.',
    'options...':
        'opções…',
    'read-only':
        'apenas leitura',
    'Input Slot Options':
        'Opções de Ranhura de Entrada',
    'Enter one option per line.Optionally use "=" as key/value delimiter\ne.g.\n   the answer=42':
        'Introduza uma opção por linha. Opcionalmente, use "=" como separador\nentre chave e valor, e.g.\n   a resposta=42',
    'paint a new sprite':
        'Pintar um novo actor.',
    'Paint a new costume':
        'Pintar um novo traje.',
    'add a new Turtle sprite':
        'Adicionar um novo actor.',
    'check for alternative\nGUI design':
        'Assinalar para um design alternativo\nda interface gráfica com o utilizador.',
    'Rasterize SVGs':
        'Transformar SVG em mapas de bits',
    'check to rasterize\nSVGs on import':
        'Assinalar para transformar os arquivos SVG\nem mapas de bits durante a importação.',
    'comment pic...':
        'fotografia do comentário…',
    'open a new window\nwith a picture of this comment':
        'Abrir uma nova janela com\numa fotografia deste comentário.',
    'undo':
        'desfazer',
    'Brush size':
        'Espessura do pincel',
    'Constrain proportions of shapes?\n(you can also hold shift)':
        'Preservar proporções das formas?\n(também pode pressionar shift)',
    'Eraser tool':
        'Borracha',
    'Paintbrush tool\n(free draw)':
        'Pincel\n(desenho livre)',
    'Line tool\n(shift: vertical/horizontal)':
        'Segmento de recta\n(shift: vertical/horizontal)',
    'Stroked Rectangle\n(shift: square)':
        'Rectângulo\n(shift: quadrado)',
    'Filled Rectangle\n(shift: square)':
        'Rectângulo preenchido\n(shift: quadrado)',
    'Stroked Ellipse\n(shift: circle)':
        'Elipse\n(shift: circunferência)',
    'Filled Ellipse\n(shift: circle)':
        'Elipse preenchida\n(shift: círculo)',
    'Fill a region':
        'Balde de tinta',
    'Set the rotation center':
        'Estabelecer centro de rotação',
    'Pipette tool\n(pick a color anywhere)':
        'Pipeta\n(recolher uma cor em qualquer lado)',
    'Paint Editor':
        'Editor de Pintura',
    'square':
        'quadrado',
    'pointRight':
        'triângulo para a direita',
    'gears':
        'roda dentada',
    'file':
        'arquivo',
    'fullScreen':
        'ecrã inteiro',
    'normalScreen':
        'ecrã normal',
    'smallStage':
        'palco pequeno',
    'normalStage':
        'palco normal',
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
        'nuvem',
    'cloudOutline':
        'contorno de nuvem',
    'cloudGradient':
        'nuvem com gradiente',
    'turnRight':
        'girar à direita',
    'turnLeft':
        'girar à esquerda',
    'storage':
        'armazenagem',
    'poster':
        'póster',
    'flash':
        'relâmpago',
    'brush':
        'pincel',
    'rectangle':
        'rectângulo',
    'rectangleSolid':
        'rectângulo preenchido',
    'circle':
        'circunferência',
    'circleSolid':
        'círculo',
    'crosshairs':
        'mira',
    'paintbucket':
        'balde de tinta',
    'eraser':
        'borracha',
    'pipette':
        'pipeta',
    'speechBubble':
        'balão de fala',
    'speechBubbleOutline':
        'contorno de balão de fala',
    'arrowUp':
        'seta para cima',
    'arrowUpOutline':
        'contorno de seta para cima',
    'arrowLeft':
        'seta para a esquerda',
    'arrowLeftOutline':
        'contorno de seta para a esquerda',
    'arrowDown':
        'seta para baixo',
    'arrowDownOutline':
        'contorno de seta para baixo',
    'arrowRight':
        'seta para a direita',
    'arrowRightOutline':
        'contorno de seta para a direita',
    'robot':
        'robot',
    'turn pen trails into new costume...':
        'transformar traços da caneta em novo traje…',
    'turn all pen trails and stamps\ninto a new costume for the\ncurrently selected sprite':
        'Transforma todos os traços da caneta\ne carimbagens num novo traje\n'
            + 'do actor seleccionado neste momento',
    'pen':
        'caneta',
    'tip':
        'ponta',
    'middle':
        'meio',
    'last changed':
        'alterado pela última vez em',
    'Are you sure you want to publish':
        'Quer mesmo publicar',
    'Are you sure you want to unpublish':
        'Quer mesmo deixar de publicar',
    'Share Project':
        'Partilhar Projecto',
    'Unshare Project':
        'Deixar de Partilhar Projecto',
    'sharing\nproject...':
        'partilhando\nprojecto…',
    'unsharing\nproject...':
        'deixando de partilhar\nprojecto…',
    'shared.':
        'partilhado.',
    'unshared.':
        'deixado de partilhar.',
    'Unshare':
        'Não Partilhar',
    'password has been changed.':
        'a sua palavra-passe foi alterada.',
    'SVG costumes are\nnot yet fully supported\nin every browser':
        'trajes SVG ainda não\nsão totalmente suportados\nem todos os navegadores',
    'Save Project':
        'Guardar Projecto',
    'script pic with result...':
        'fotografia do guião incluindo resultado…',
    'open a new window\nwith a picture of both\nthis script and its result':
        'Abrir uma nova janela com\numa fotografia tanto deste guião\ncomo do seu resultado.',
    'Select categories of additional blocks to add to this project.':
        'Seleccionar categorias de blocos adicionais a acrescentar a este projecto.',
    'Import sound':
        'Importar som',
    'Select a sound from the media library':
        'Seleccionar um som da biblioteca de média.',
    'Import':
        'Importar',
    'Select a costume from the media library':
        'Seleccionar um traje da biblioteca de média.',
    'edit rotation point only...':
        'editar apenas ponto de rotação…',
    'Export Project As...':
        'Exportar Projecto Como…',
    'a variable of name \'':
        'não existe uma variável «',
    '\'\ndoes not exist in this context':
        '»\nneste contexto',
    '(temporary)':
        '(temporária)',
    'expecting':
        'esperavam-se',
    'input(s), but getting':
        'argumento(s), mas foram passados',
    'Dragging threshold...':
        'Limiar de arrastamento…',
    'Cache Inputs':
        'Memorizar entradas',
    'uncheck to stop caching\ninputs (for debugging the evaluator)':
        'Desassinalar para parar de memorizar\nentradas (para depurar o avaliador).',
    'check to cache inputs\nboosts recursion':
        'Assinalar para memorizar as entradas\n(acelera recursividade).',
    'Project URLs':
        'URL de projecto',
    'check to enable\nproject data in URLs':
        'Assinalar para activar dados\ndo projecto nos URL.',
    'uncheck to disable\nproject data in URLs':
        'Desassinalar para desactivar\ndados do projecto nos URL.',
    'export project media only...':
        'Exportar apenas os média do projecto…',
    'export project without media...':
        'Exportar projecto sem os média…',
    'export project as cloud data...':
        'Exportar projecto como dados da nuvem…',
    'open shared project from cloud...':
        'Abrir projecto partilhado a partir da nuvem…',
    'url...':
        'URL…',
    'Export summary with drop-shadows...':
        'Exportar resumo com sombreamento…',
    'open a new browser browser window\nwith a summary of this project\nwith drop-shadows on all pictures.\nnot supported by all browsers':
        'Abrir uma nova janela no navegador\ncontendo um resumo deste projecto\n'
        + 'com sombreamento em todas as imagens\n(não suportado em todos os navegadores)',
    'specify the distance the hand has to move\nbefore it picks up an object':
        'Especificar a distância que mão tem de se\nmover antes de agarrar algum objecto',
    'block variables...':
        'adicionar variáveis de bloco…',
    'remove block variables...':
        'remover variáveis de bloco…',
    'block variables':
        'com variáveis de bloco',
    'experimental -\nunder construction':
        'Experimental – em construção',
    'Table view':
        'Vista de tabela',
    'open in another dialog...':
        'abrir noutra caixa de diálogo…',
    'check for multi-column\nlist view support':
        'Assinalar para suporte de\nvistas multicoluna de listas.',
    'uncheck to disable\nmulti-column list views':
        'Desassinalar para desactivar\nvistas multicoluna de listas.',
    'check for higher contrast\ntable views':
        'Assinalar para vistas de\ntabela com maior contraste.',
    'uncheck for less contrast\nmulti-column list views':
        'Desassinalar para vistas multicoluna\nde listas com menor contraste.',
    '(in a new window)':
        '(numa nova janela)',
    'save project data as XML\nto your downloads folder':
        'Guardar dados do projecto como XML\nna sua pasta de descarregamentos.',

    // produção de código
    'map %cmdRing to %codeKind %code':
        'mapear %cmdRing no %codeKind %code',
    'map %mapValue to code %code':
        'mapear %mapValue no código %code',
    'map %codeListPart of %codeListKind to code %code':
        'mapear %codeListPart de %codeListKind no código %code',
    'code of %cmdRing':
        'o código de %cmdRing',
    'String':
        'texto',
    'delimiter':
        'delimitador',
    'collection':
        'colecção',
    'variables':
        'variáveis',
    'parameters':
        'parâmetros',
    'code':
        'código',
    'header':
        'cabeçalho',
    'header mapping...':
        'mapeamento para cabeçalho…',
    'code mapping...':
        'mapeamento para código…',
    'Code mapping':
        'Mapeamento para código',
    'Header mapping':
        'Mapeamento para cabeçalho',
    'Enter code that corresponds to the block\'s definition. Use the formal parameter\nnames as shown and <body> to reference the definition body\'s generated text code.':
        'Introduza o código correspondente à definição do bloco. Use os nomes dos parâmetros\n'
            + 'tal como mostrados e use <body> para referenciar o código gerado da definição do corpo',
    'Enter code that corresponds to the block\'s definition. Choose your own\nformal parameter names (ignoring the ones shown).':
        'Introduza o código correspondente à definição do bloco. Escolha os seus próprios\n'
            + 'nomes para os parâmetros (ignorando os nomes mostrados).',
    'Enter code that corresponds to the block\'s operation (usually a single\nfunction invocation). Use <#n> to reference actual arguments as shown.':
        'Introduza o código que corresponda à operação do bloco (normalmente uma simples\n'
            + 'invocação de rotina). Use <#n> para referenciar os argumentos tal como mostrado',
    'uncheck to disable\nkeyboard editing support':
        'Desassinalar para desactivar\na edição usando o teclado.',
    'check to enable\nkeyboard editing support':
        'Assinalar para activar\na edição usando o teclado.',
    'check to turn on\nvisible stepping (slow)':
        'assinalar para activar\nexecução passo a passo visível (lento)',
    'uncheck to turn off\nvisible stepping':
        'desassinalar para desactivar\nexecução passo a passo visível',
    'check to allow\nempty Boolean slots':
        'assinalar para permitir\nranhuras booleanas vazias',
    'uncheck to limit\nBoolean slots to true / false':
        'desassinalar para limitar\nas ranhuras booleanas aos valores verdadeiro / falso',
    'Camera support':
        'Suporte para câmara',
    'check to enable\ncamera support':
        'assinalar para activar\no suporte para a câmara',
    'uncheck to disable\ncamera support':
        'desassinalar para desactivar\no suporte para a câmara',
    'check to enable auto-wrapping\ninside nested block stacks':
        'assinalar para activar as quebras de linha\nem pilhas de blocos aninhadas',
    'uncheck to confine auto-wrapping\nto top-level block stacks':
        'desassinalar para limitar as quebras de linha\nàs pilhas de blocos do nível de topo',
    'uncheck to disable\nsprite inheritance features':
        'Desassinalar para desactivar\nfuncionalidades de herança de actores.',
    'check for sprite\ninheritance features':
        'Assinalar para activar\nfuncionalidades de herança de actores.'
};
