/*

    lang-pt_BR.js

    Brazilian Portuguese translation for SNAP!

    translated by Aldo von Wangenheim

    Copyright (C) 2014 by Aldo von Wangenheim

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

SnapTranslator.dict.pt_BR = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    Ä, ä   \u00c4, \u00e4
    Ö, ö   \u00d6, \u00f6
    Ü, ü   \u00dc, \u00fc
    ß      \u00df
*/

    // meta informação sobre a tradução
    'language_name':
        'Português do Brasil',
    'language_translator':
        'Aldo von Wangenheim',
    'translator_e-mail':
        'awangenh@inf.ufsc.br',
    'last_changed':
        '2014-04-20',

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
        'Controle',
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
        'Roteiros',
    'Costumes':
        'Fantasias',
    'Sounds':
        'Sons',

    // nomes:
    'Sprite':
        'Ator',
    'Stage':
        'Palco',

    // estilos de rotação:
    'don\'t rotate':
        'não rode',
    'can rotate':
        'rode',
    'only face left/right':
        'olhe apenas para a esquerda ou para a direita',

    // botão de criação de novo actor:
    'add a new sprite':
        'adicionar um novo ator',

    // ajuda nos tabuladores
    'costumes tab help':
        'Importa uma imagem de uma página Web ou de um\n'
            + 'arquivo no teu computador arrastando-a para aqui',
    'import a sound from your computer\nby dragging it into here':
        'Importe um som de seu computador\narrastando-o para cá',

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

    // Movimento:
    'Stage selected:\nno motion primitives':
        'Palco selecionado:\nsem primitivas de movimento',


    'move %n steps':
        'mova %n passos',
    'turn %clockwise %n degrees':
        'gire %clockwise %n graus',
    'turn %counterclockwise %n degrees':
        'gire %counterclockwise %n graus',
    'point in direction %dir':
        'aponte para a direção %dir graus',
    'point towards %dst':
        'aponte para %dst',
    'go to x: %n y: %n':
        'vá para x: %n , y: %n ',
    'go to %dst':
        'vá para %dst',
    'glide %n secs to x: %n y: %n':
        'deslize por %n segundos ate x: %n , y: %n ',
    'change x by %n':
        'adicione %n a x',
    'set x to %n':
        'mude x para %n',
    'change y by %n':
        'adicione %n a y',
    'set y to %n':
        'mude y para %n',
    'if on edge, bounce':
        'se tocar na borda, volte',
    'x position':
        'coordenada x da posição',
    'y position':
        'coordenada y da posição',
    'direction':
        'direção',

    // Aparência:
    'switch to costume %cst':
        'mude para a fantasia %cst',
    'next costume':
        'próxima fantasia',
    'costume #':
        'n° da fantasia',
    'say %s for %n secs':
        'diga %s por %n segundos',
    'say %s':
        'diga %s',
    'think %s for %n secs':
        'pense %s por %n segundos',
    'think %s':
        'pense %s',
    'Hello!':
        'Olá!',
    'Hmm...':
        'Hmm…',
    'change %eff effect by %n':
        'adicione ao efeito %eff %n',
    'set %eff effect to %n':
        'mude o efeito %eff para %n',
    'clear graphic effects':
        'apague os efeitos gráficos',
    'change size by %n':
        'adicione %n ao seu tamanho',
    'set size to %n %':
        'mude o tamanho para %n %',
    'size':
        'tamanho',
    'show':
        'mostrar',
    'hide':
        'esconder',
    'go to front':
        'vá para a frente',
    'go back %n layers':
        'vá %n camadas para trás',

    'development mode \ndebugging primitives:':
        'primitivas de depuração \ndo modo de desenvolvimento:',
    'console log %mult%s':
        'registre %mult%s no console',
    'alert %mult%s':
        'mostre janela de alerta com %mult%s',

    // Som:
    'play sound %snd':
        'toque o som %snd',
    'play sound %snd until done':
        'toque o som %snd até o fim',
    'stop all sounds':
        'pare todos os sons',
    'rest for %n beats':
        'silêncio por %n tempos',
    'play note %n for %n beats':
        'toque a nota %n durante %n tempos',
    'change tempo by %n':
        'adicione %n tempos ao andamento',
    'set tempo to %n bpm':
        'altere o andamento para %n tempos',
    'tempo':
        'andamento',

    // Caneta:
    'clear':
        'apague tudo',
    'pen down':
        'use a caneta',
    'pen up':
        'levante a caneta',
    'set pen color to %clr':
        'mude a cor da caneta para %clr',
    'change pen color by %n':
        'adicione %n à cor da caneta',
    'set pen color to %n':
        'mude a cor da caneta para %n',
    'change pen shade by %n':
        'adicione %n à intensidade da caneta',
    'set pen shade to %n':
        'mude a intensidade da caneta para %n',
    'change pen size by %n':
        'adicione %n à espessura da caneta',
    'set pen size to %n':
        'mude a espessura da caneta para %n',
    'stamp':
        'carimbe',

    // Eventos e Controle:
    'when %greenflag clicked':
        'quando clicar em %greenflag',
    'when %keyHat key pressed':
        'quando a tecla %keyHat for pressionada',
    'when I am clicked':
        'quando este ator for clicado',
    'when I receive %msgHat':
        'quando receber %msgHat',
    'broadcast %msg':
        'envie %msg a todos',
    'broadcast %msg and wait':
        'envie %msg a todos e espere',
    'Message name':
        'nome da mensagem',
    'message':
        'mensagem',
    'any message':
        'qualquer mensagem',
    'wait %n secs':
        'espere %n segundos',
    'wait until %b':
        'espere até que %b',
    'forever %loop':
        'sempre %loop',
    'repeat %n %loop':
        'repita %n vezes %loop',
    'repeat until %b %loop':
        'repita até que %b %loop',
    'if %b %c':
        'se %b então %c',
    'if %b %c else %c':
        'se %b então %c senão %c',
    'report %s':
        'reporte %s',
    'stop %stopChoices':
        'pare %stopChoices',
    'all':
        'tudo',
    'this script':
        'este roteiro',
    'this block':
        'este bloco',
    'stop %stopOthersChoices':
        'pare %stopOthersChoices',
    'all but this script':
        'todos os roteiros exceto este',
    'other scripts in sprite':
        'outros roteiros deste ator',
    'pause all %pause':
        'pause tudo %pause',
    'run %cmdRing %inputs':
        'execute %cmdRing %inputs',
    'launch %cmdRing %inputs':
        'inicie execução de %cmdRing %inputs',
    'call %repRing %inputs':
        'chame %repRing %inputs',
    'run %cmdRing w/continuation':
        'execute %cmdRing com continuação',
    'call %cmdRing w/continuation':
        'chame %cmdRing com continuação',
    'warp %c':
        'execute atomicamente %c',
    'when I start as a clone':
        'quando este ator começar como clone',
    'create a clone of %cln':
        'crie clone de %cln',
    'myself':
        'este ator',
    'delete this clone':
        'apague este clone',

    // Sensores:
    'touching %col ?':
        'tocando em %col',
    'touching %clr ?':
        'tocando na cor %clr',
    'color %clr is touching %clr ?':
        'a cor %clr está tocando na cor %clr',
    'ask %s and wait':
        'pergunte %s e espere a resposta',
    'what\'s your name?':
        'qual o seu nome?',
    'answer':
        'resposta',
    'mouse x':
        'posição x do mouse',
    'mouse y':
        'posição y do mouse',
    'mouse down?':
        'mouse pressionado?',
    'key %key pressed?':
        'tecla %key pressionada?',
    'distance to %dst':
        'distância até %dst',
    'reset timer':
        'zere o cronómetro',
    'timer':
        'valor do cronómetro',
    '%att of %spr':
        '%att de %spr',
    'http:// %s':
        'página http:// %s',
    'turbo mode?':
        'modo turbo?',
    'set turbo mode to %b':
        'mude o modo turbo para %b',

    'filtered for %clr':
        'filtrado por %clr',
    'stack size':
        'altura da pilha',
    'frames':
        'quadros',

    // Operadores:
    '%n mod %n':
        'resto de %n por %n',
    'round %n':
        'arredondamento de %n',
    '%fun of %n':
        '%fun de %n',
    'pick random %n to %n':
        'escolha um valor ao acaso entre %n e %n',
    '%b and %b':
        '%b e %b',
    '%b or %b':
        '%b ou %b',
    'not %b':
        'não %b',
    'true':
        'verdadeiro',
    'false':
        'falso',
    'join %words':
        'junte %words',
    'split %s by %delim':
        'separe %s por %delim',
    'hello':
        'Olá',
    'world':
        'mundo',
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

    'type of %s':
        'o tipo de %s',

    // Variáveis:
    'Make a variable':
        'Criar uma variável',
    'Variable name':
        'Nome da variável',
    'Script variable name':
        'Nome da variável de Roteiro',
    'Delete a variable':
        'Remova uma variável',

    'set %var to %s':
        'mude %var para %s',
    'change %var by %n':
        'adicione a %var o valor %n',
    'show variable %var':
        'mostre variável %var',
    'hide variable %var':
        'esconda variável %var',
    'script variables %scriptVars':
        'crie as variáveis de roteiro %scriptVars',

    // listas:
    'list %exp':
        'uma lista com %exp',
    '%s in front of %l':
        '%s inicia %l',
    'item %idx of %l':
        '%idx de %l',
    'all but first of %l':
        'todos elementos de %l menos o primeiro',
    'length of %l':
        'tamanho de %l',
    '%l contains %s':
        '%l contém %s',
    'thing':
        'valor',
    'add %s to %l':
        'adicione %s a %l',
    'delete %ida of %l':
        'apague %ida de %l',
    'insert %s at %idx of %l':
        'insira %s na posição %idx em %l',
    'replace item %idx of %l with %s':
        'substitua o item %idx de %l por %s',

    // Outros
    'Make a block':
        'Criar um bloco',

    // Menus
    // Snap menu
    'About...':
        'Sobre Snap!…',
    'Reference manual':
        'Manual de Referência',
    'Snap! website':
        'Site do Snap!',
    'Download source':
        'Baixar código fonte',
    'Switch back to user mode':
        'Volte ao modo de usuário',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'Desative menus de contexto\nprofundos do Morphic e\nmostrar menus amigáveis.',
    'Switch to dev mode':
        'Mude para modo de desenvolvimento',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'Ativar menus de contexto\ne inspectores não\namigáveis do Morphic!',

    // Menu de projeto
    'Project notes...':
        'Notas deste projeto…',
    'New':
        'Criar um novo projeto',
    'Open...':
        'Abrir um projeto…',
    'Save':
        'Salvar',
    'Save As...':
        'Salvar como…',
    'Import...':
        'Importar…',
    'file menu import hint':
        'Importar para este projecto\num projeto exportado,\n'
            + 'uma biblioteca de blocos,\n'
            + 'um traje ou um som.',
    'Export project as plain text...':
        'Exportar este projeto em modo texto…',
    'Export project...':
        'Exportar este projeto…',
    'show project data as XML\nin a new browser window':
        'Mostrar os dados no\nformato XML numa nova janela do navegador.',
    'Export blocks...':
        'Exportar blocos…',
    'show global custom block definitions as XML\nin a new browser window':
        'Mostrar as definições globais de blocos\npersonalizados no formato\nXML numa nova janela do navegador.',
    'Import tools':
        'Importar ferramentas oficiais',
    'load the official library of\npowerful blocks':
        'Importar a biblioteca\n oficial de blocos.',
    'Libraries...':
        'Bibliotecas...',
    'Import library':
        'Importar biblioteca',

    // Menu da nuvem
    'Login...':
        'Entrar na sua conta…',
    'Signup...':
        'Registar uma nova conta…',

    // menu de preferências
    'Language...':
        'Língua…',
    'Zoom blocks...':
        'Zoom dos blocos…',
    'Blurred shadows':
        'Sombras borradas',
    'uncheck to use solid drop\nshadows and highlights':
        'Desmarque para usar sombras\ne realces nítidos.',
    'check to use blurred drop\nshadows and highlights':
        'Marque para usar sombras\ne realces borrados.',
    'Zebra coloring':
        'Coloração em zebra',
    'check to enable alternating\ncolors for nested blocks':
        'Marque para alternar\nas cores de blocos aninhados.',
    'uncheck to disable alternating\ncolors for nested block':
        'Desmarque para deixar de alternar\nas cores de blocos aninhados.',
    'Dynamic input labels':
        'Nomes de entrada dinâmicos',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'Desmarque para desativar nomes\ndinâmicos nas variáveis de entrada.',
    'check to enable dynamic\nlabels for variadic inputs':
        'Marque para ativar nomes\ndinâmicos nas variáveis de entrada.',
    'Prefer empty slot drops':
        'Procure encaixar blocos de valor (repórteres) em campos vazios ao soltar',
    'settings menu prefer empty slots hint':
        'Marque para focar em campos vazios\nquando  estiver arrastando e '
            + 'soltando blocos de valor (repórteres).',
    'uncheck to allow dropped\nreporters to kick out others':
        'Desmarque para permitir que blocos\nrepórteres soltos em um campo '
            + 'desalojem outros.',
    'Long form input dialog':
        'Forma longa da caixa de diálogo dos parâmetros',
    'Plain prototype labels':
        'Use texto simples para protótipos',
    'uncheck to always show (+) symbols\nin block prototype labels':
        'Desmarque para mostrar sempre os símbolos (+)\nno texto dos protótipos dos blocos',
    'check to hide (+) symbols\nin block prototype labels':
        'Marque para esconder os símbolos (+)\nno texto dos protótipos dos blocos',
    'check to always show slot\ntypes in the input dialog':
        'Marque para sempre mostrar\no tipo dos campos na caixa\nde diálogo dos parâmetros.',
    'uncheck to use the input\ndialog in short form':
        'Desmarque para usar texto abreviado\nda caixa de diálogo dos parâmetros.',
    'Virtual keyboard':
        'Teclado virtual',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'Desmarque para desativar o\nsuporte ao teclado virtual\npara dispositivos '
            + 'móveis.',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'Marque para ativar o\nsuporte ao teclado virtual\npara dispositivos '
            + 'móveis.',
    'Input sliders':
        'Sliders nos campos de entrada',
    'uncheck to disable\ninput sliders for\nentry fields':
        'Desmarque para desativar\nsliders nos campos de entrada dos blocos.',
    'check to enable\ninput sliders for\nentry fields':
        'Marque para ativar\nsliders nos campos de entrada dos blocos.',
    'Clicking sound':
        'Som de cliques',
    'uncheck to turn\nblock clicking\nsound off':
        'Desmarque para desativar o som\nproduzido ao clicar nos blocos.',
    'check to turn\nblock clicking\nsound on':
        'Marque para ativar o som\nproduzido ao clicar nos blocos.',
    'Animations':
        'Animações',
    'uncheck to disable\nIDE animations':
        'Desmarque para desativar\nas animações da interface de usuário.',
    'Turbo mode.':
        'Modo turbo',
    'check to prioritize\nscript execution':
        'Marque para priorizar\na execução de roteiros.',
    'uncheck to run scripts\nat normal speed':
        'Desmarque para executar os roteiros\nna velocidade normal.',
    'check to enable\nIDE animations':
        'Marque para ativar\nas animações da interface de usuário.',
    'Thread safe scripts':
        'Roteiros seguros face a threads',
    'uncheck to allow\nscript reentrance':
        'Desmarque para permitir\nreentrância nos roteiros.',
    'check to disallow\nscript reentrance':
        'Marque para não permitir\nreentrância nos roteiros.',
    'Prefer smooth animations':
        'Prefira animações suaves',
    'uncheck for greater speed\nat variable frame rates':
        'Desmarque para aumentar a velocidade\npermitindo ritmos variáveis das tramas nas animações.',
    'check for smooth, predictable\nanimations across computers':
        'Marque para obter animações mais suaves\ne previsíveis de computador para computador.',

    // Entradas
    'with inputs':
        'com argumentos',
    'input names:':
        'com parâmetros',
    'Input Names:':
        'Parâmetros:',
    'input list:':
        'lista de entradas',

    // menus de contexto:
    'help':
        'ajuda',

    // palette:
    'hide primitives':
        'esconda blocos primitivos',
    'show primitives':
        'mostre blocos primitivos',

    // blocos:
    'help...':
        'ajuda…',
    'relabel...':
        'renomear…',
    'duplicate':
        'duplicar',
    'make a copy\nand pick it up':
        'Faça uma cópia do\nbloco e pegue-a.',
    'only duplicate this block':
        'Duplique apenas este bloco.',
    'delete':
        'apague',
    'script pic...':
        'fotografia do roteiro',
    'open a new window\nwith a picture of this script':
        'Abra uma nova janela com\numa fotografia deste roteiro.',
    'ringify':
        'adicione anel',
    'unringify':
        'apague anel',

    // blocos personalizados:
    'delete block definition...':
        'remova definição do bloco…',
    'edit...':
        'editar…',

    // Atores:
    'edit':
        'editar',
    'detach from':
        'desencaixe de',
    'detach all parts':
        'desencaixe todas as partes',
    'export...':
        'exportar…',

    // palco:
    'show all':
        'mostre todos os atores',
    'pic...':
        'fotografia…',
    'open a new window\nwith a picture of the stage':
        'Abrir uma nova janela com\numa fotografia do palco.',

    // área de Roteiros:
    'clean up':
        'limpar',
    'arrange scripts\nvertically':
        'Organize roteiros\nverticalmente.',
    'add comment':
        'adicione um comentário',
    'undrop':
        'desfaça posicionamento',
    'undo the last\nblock drop\nin this pane':
        'Desfazer o último posicionamento de um bloco\nneste painel.',
    'scripts pic...':
        'fotografe os roteiros…',
    'open a new window\nwith a picture of all scripts':
        'Abra uma nova janela com\numa fotografia de todos os roteiros.',
    'make a block...':
        'crie um bloco…',

    // Fantasias:
    'rename':
        'renomear',
    'export':
        'exportar',
    'rename costume':
        'Qual o novo nome da fantasia?',

    // Sons
    'Play sound':
        'Toque som.',
    'Stop sound':
        'Pare som.',
    'Stop':
        'Parar',
    'Play':
        'Tocar',
    'rename sound':
        'Qual o novo nome do som?',

    // Caixas de diálogo
    // botões
    'OK':
        'OK',
    'Ok':
        'OK',
    'Cancel':
        'Cancela',
    'Yes':
        'Sim',
    'No':
        'Não',

    // ajuda
    'Help':
        'Ajuda',

    // ampliação de blocos
    'Zoom blocks':
        'Zoom dos blocos',
    'build':
        'construa',
    'your own':
        'os seus próprios',
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
        'monstruoso (10x)',

    // Gestor de Projetos
     'Untitled':
        'Sem título',
    'Open Project':
        'Abrir Projeto',
    '(empty)':
        '(vazio)',
    'Saved!':
        'Salvo!',
    'Delete Project':
        'Apague Projeto',
    'Are you sure you want to delete':
        'Tem certeza que deseja apagar?',
    'rename...':
        'alterar o nome…',

    // Editor de fantasias
    'Costume Editor':
        'Editor de Fantasias',
    'click or drag crosshairs to move the rotation center':
        'Clique ou arraste a mira para mudar o centro de rotação.',

    // Anotaes de projeto
    'Project Notes':
        'Notas do Projeto',

    // Novo projeto
    'New Project':
        'Novo Projeto',
    'Replace the current project with a new one?':
        'Substituir este projeto por um novo projeto?',

    // guardar projecto
    'Save Project As...':
        'Salvar Projeto Como…',

    // exportar blocos
    'Export blocks':
        'Exportar blocos',
    'Import blocks':
        'Importar blocos',
    'this project doesn\'t have any\ncustom global blocks yet':
        'Este projeto ainda não possui\nnenhum bloco global personalizado.',
    'select':
        'selecionar',
    'none':
        'nenhum',

    // Caixa de diálogo de variáveis
    'for all sprites':
        'para todos os atores',
    'for this sprite only':
        'apenas para este ator',

    // caixa de diálogo de blocos
    'Change block':
        'Altere o tipo do bloco',
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
        'Remova Bloco Personalizado',
    'block deletion dialog text':
        'Quer mesmo remover este bloco e '
            + 'todas as suas aplicações?',

    // Caixa de diálogo de parâmetros
    'Create input name':
        'Criar parâmetro',
    'Edit input name':
        'Editar parâmetro',
    'Edit label fragment':
        'Editar rótulo',
    'Title text':
        'Nome',
    'Input name':
        'Parâmetro',
    'Delete':
        'Remover',
    'Object':
        'Objeto',
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
        'Comando\n(bloco de repetição)',
    'Any\n(unevaluated)':
        'Repórter\n(forma especial)',
    'Boolean\n(unevaluated)':
        'Predicado\n(forma especial)',
    'Single input.':
        'Parâmetro único.',
    'Default Value:':
        'Valor em caso de omissão:',
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
        'slider',
    'slider min...':
        'mínimo do slider…',
    'slider max...':
        'máximo do slider…',
    'import...':
        'importar…',
    'Slider minimum value':
        'Valor mínimo do potenciómetro deslizante',
    'Slider maximum value':
        'Valor máximo do potenciómetro deslizante',

    // observadores de listas
    'length: ':
        'tamanho: ',

    // comentários
    'add comment here...':
        'coloque aqui um comentário…',

    // drop downs
    // direcções
    '(90) right':
        '90° (direita)',
    '(-90) left':
        '-90° (esquerda)',
    '(0) up':
        '0° (acima)',
    '(180) down':
        '180° (abaixo)',

    // detecção de colisões
    'mouse-pointer':
        'ponteiro do mouse',
    'edge':
        'borda',
    'pen trails':
        'traços da caneta',

    // trajes
    'Turtle':
        'seta',
    'Empty':
        'vazio',

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
    'floor':
        'arredondamento para baixo',
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

    // delimitadores
    'whitespace':
        'espaços em branco',
    'line':
        'avanços de linha',
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

    // índices de listas
    'last':
        'último item',
    'any':
        'um item ao acaso',

    // em falta no ficheiro lang-de.js
    'costume name':
        'nome da fantasia',
    'Open':
        'Abrir',
    'Share':
        'Compartilhar',
    'Cloud':
        'Nuvem',
    'Browser':
        'Navegador',
    'Sign up':
        'Registrar nova conta',
    'Sign in':
        'Entrar',
    'now connected.':
        'entrou.',
    'disconnected.':
        'saiu.',
    'Reset password':
        'Recuperar senha',
    'Reset Password...':
        'Recuperar a sua senha...',
    'User name:':
        'Nome de usuário:',
    'Password:':
        'Senha:',
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
        'Endereço de email:',
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
        'O nome de usuário tem de ter\npelo menos quatro caracteres.',
    'please provide a valid\nemail address':
        'Por favor indique um endereço\nde email válido.',
    'password must be six\ncharacters or longer':
        'A senha tem de ter\npelo menos seis caracteres.',
    'passwords do\nnot match':
        'As senhas\nnão correspondem.',
    'please agree to\nthe TOS':
        'Por favor concorde com\nos Termos do Serviço.',
    'Examples':
        'Exemplos',
    'You are not logged in':
        'Ainda não se autenticou',
    'Updating\nproject list...':
        'Atualizando a\nlista de projetos…',
    'Opening project...':
        'Abrindo o projeto…',
    'Fetching project from the cloud...':
        'Obtendo o projeto da nuvem…',
    'Saving project to the cloud...':
        'Salvando o projeto na nuvem…',
    'Sprite Nesting':
        'Atores aninhados',
    'uncheck to disable\nsprite composition':
        'Desmarque para desativar\na composição de atores.',
    'Codification support':
        'Suportar produção de código',
    'check for block\nto text mapping features':
        'Assinalar para funcionalidades\nde mapeamento entre blocos e texto.',
    'Save to disk':
        'Salvar no disco',
    'experimental - store this project\nin your downloads folder':
        'Experimental - Salvar este projeto\nna sua pasta de downloads.',
    'saved.':
        'salvo.',
    'options...':
        'opções…',
    'read-only':
        'apenas leitura',
    'Input Slot Options':
        'Opções de Campos de Entrada',
    'Enter one option per line.Optionally use "=" as key/value delimiter\ne.g.\n   the answer=42':
        'Entre com uma opção por linha. Opcionalmente, use "=" como separador\nentre chave e valor, e.g.\n   a resposta=42',
    'paint a new sprite':
        'Desenhar um novo ator.',
    'Paint a new costume':
        'Desenhar uma nova fantasia.',
    'add a new Turtle sprite':
        'Adicionar um novo ator.',
    'Flat design':
        'Visual plano',
    'check for alternative\nGUI design':
        'Marque para um design alternativo\nda interface gráfica de usuário.',
    'Rasterize SVGs':
        'Transformar desenhos vetorias (SVG) em mapas de bits',
    'check to rasterize\nSVGs on import':
        'Marque para transformar os arquivos vetoriais SVG\nem mapas de bits durante a importação.',
    'comment pic...':
        'fotografia do comentário…',
    'open a new window\nwith a picture of this comment':
        'Abrir uma nova janela com\numa fotografia deste comentário.'
};
