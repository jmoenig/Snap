/*

	lang-pt.js

	Portuguese (literary) translation for SNAP!

	translated by Manuel Menezes de Sequeira

	Copyright (C) 2012 by Manuel Menezes de Sequeira
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

    // translations meta information
    'language_name':
        'Português (literário)',
    'language_translator':
        'Manuel Menezes de Sequeira',
    'translator_e-mail':
        'mmsequeira@gmail.com',
    'last_changed':
        '2012-10-23',

    // GUI
    // control bar:
    'untitled':
        'Sem título',
    'development mode':
        'modo de desenvolvimento',

    // categories:
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

    // tabs:
    'Scripts':
        'Guiões',
    'Costumes':
        'Trajes',
    'Sounds':
        'Sons',

    // names:
    'Sprite':
        'o actor',
    'Stage':
        'o palco',

    // rotation styles:
    'don\'t rotate':
        'não pode rodar',
    'can rotate':
        'pode rodar',
    'only face left/right':
        'pode apenas olhar para a esquerda ou para a direita',

    // new sprite button:
    'add a new Sprite':
        'adicionar um novo actor',

    // tab help
    'costumes tab help':
        'Importa uma imagem de uma página Web ou de um\n'
            + 'arquivo no teu computador arrastando-a para aqui',
    'import a sound from your computer\nby dragging it into here':
        'Importa um som do teu computador\narrastando-o para aqui',

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
        'Palco seleccionado\nnenhuma primitiva de movimento',

    'move %n steps':
        'anda %n passos',
    'turn %clockwise %n degrees':
        'gira %clockwise %n graus',
    'turn %counterclockwise %n degrees':
        'gira %counterclockwise %n graus',
    'point in direction %dir':
        'altera a tua direcção para %dir',
    'point towards %dst':
        'aponta em direcção a %dst',
    'go to x: %n y: %n':
        'vai para as coordenadas x: %n y: %n',
    'go to %dst':
        'vai para a posição de %dst',
    'glide %n secs to x: %n y: %n':
        'desliza em %n s para as coordenadas x: %n y: %n',
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

    // looks:
    'switch to costume %cst':
        'muda para o traje %cst',
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
        'Hmm...',
    'change %eff effect by %n':
        'adiciona ao efeito %eff o valor %n',
    'set %eff effect to %n':
        'altera o teu efeito %eff para %n',
    'clear graphic effects':
        'limpa os efeitos gráficos',
    'change size by %n':
        'adiciona %n ao teu tamanho',
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
        'primitivas de depuração \ndo modo de desenvolvimento',
    'console log %mult%s':
        'regista %mult%s na consola',
    'alert %mult%s':
        'mostra janela de alerta com %mult%s',

    // sound:
    'play sound %snd':
        'toca o som %snd',
    'play sound %snd until done':
        'toca o som %snd até terminar',
    'stop all sounds':
        'pára todos os sons',

    // pen:
    'clear':
        'apaga tudo',
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
        'adiciona %n ao tamanho da tua caneta',
    'set pen size to %n':
        'altera o tamanho da tua caneta para %n',
    'stamp':
        'carimba-te',

    // control:
    'when %greenflag clicked':
        'quando alguém clicar em %greenflag',
    'when %key key pressed':
        'quando alguém pressionar a tecla %key',
    'when I am clicked':
        'quando alguém clicar em ti',
    'when I receive %msg':
        'quando receberes a mensagem %msg',
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
        'para sempre, %c',
    'repeat %n %c':
        'repete %n vezes %c',
    'repeat until %b %c':
        'até que %b . repete %c',
    'if %b %c':
        'se %b , então %c',
    'if %b %c else %c':
        'se %b , então %c senão, %c',
    'report %s':
        'reporta %s',
    'stop block':
        'pára o bloco',
    'stop script':
        'pára o guião',
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

    // sensing:
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
        'o cronómetro',
    'http:// %s':
        'http:// %s',

    'filtered for %clr':
        'filtrado para %clr',
    'stack size':
        'tamanho da pilha',
    'frames':
        'frames',

    // operators:
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
        'olá',
    'world':
        'mundo',
    'letter %n of %s':
        'o caractere %n de %s',
    'length of %s':
        'o comprimento de %s',
    'unicode of %s':
        'o código Unicode do caractere %s',
    'unicode %n as letter':
        'o caractere cujo código Unicode é %n',
    'is %s a %typ ?':
        '%s é um(a) %typ',

    'type of %s':
        'o tipo de %s',

    // variables:
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

    // lists:
    'list %exp':
        'a lista %exp',
    '%s in front of %l':
        'a prefixação de %s a %l',
    'item %idx of %l':
        '%idx de %l',
    'all but first of %l':
        'todos menos o primeiro item de %l',
    'length of %l':
        'o comprimento de %l',
    '%l contains %s':
        '%l contém %s',
    'thing':
        'coisa',
    'add %s to %l':
        'acrescenta %s a %l',
    'delete %ida of %l':
        'remove %ida de %l',
    'insert %s at %idx of %l':
        'insere %s antes de %idx de %l',
    'replace item %idx of %l with %s':
        'substitui %idx de %l por %s',

    // other
    'Make a block':
        'Criar um bloco',

    // menus
    // snap menu
    'About...':
        'Sobre o Snap!...',
    'Snap! website':
        'Sítio Web do Snap!',
    'Download source':
        'Descarregar código fonte',
    'Switch back to user mode':
        'Regressar ao modo de utilizador',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'Desactivar menus de contexto\nprofundos do Morphic e\nmostrar menus amigáveis.',
    'Switch to dev mode':
        'Passar ao modo de desenvolvimento',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'Activar menus de contexto e inspectores não amigáveis do Morphic!',

    // project menu
    'Project Notes...':
        'Notas do projecto...',
    'New':
        'Novo',
    'Open...':
        'Abrir...',
    'Save':
        'Guardar',
    'Save As...':
        'Guardar como...',
    'Import...':
        'Importar...',
    'file menu import hint':
        'Carregar um projecto exportado,\n'
            + 'uma biblioteca de blocos,\n'
            + 'um traje ou um som.',
    'Export project as plain text ...':
        'Exportar projecto como texto simples...',
    'Export project...':
        'Exportar projecto...',
    'show project data as XML\nin a new browser window':
        'Mostrar os dados do projecto no\nformato XML numa nova janela do navegador.',
    'Export blocks ...':
        'Exportar blocos',
    'show global custom block definitions as XML\nin a new browser window':
        'Mostrar as definições de blocos personalizados globais\n no formato XML numa nova janela do navegador.',

    // settings menu
    'Language...':
        'Língua...',
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
    'Prefer empty slot drops':
        'Preferir largadas em ranhuras vazias',
    'settings menu prefer empty slots hint':
        'Assinalar para focar em ranhuras vazias\nquando arrastando e largando repórteres.',
    'uncheck to allow dropped\nreporters to kick out others':
        'Desassinalar para permitir que\nrepórteres largados desalojem outros.',
    'Long form input dialog':
        'Forma longa da caixa de diálogo das entradas',
    'check to always show slot\ntypes in the input dialog':
        'Assinalar para mostrar sempre\no tipo das ranhuras na caixa\nde diálogo das entradas.',
    'uncheck to use the input\ndialog in short form':
        'Desassinalar para usar a forma curta\nda caixa de diálogo das entradas.',
    'Virtual keyboard':
        'Teclado virtual',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'Desassinalar para desactivar o\nsuporte do teclado virtual\npara dispositivos móveis.',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'Assinalar para activar o\nsuporte do teclado virtual\npara dispositivos móveis.',
    'Input sliders':
        'Deslizadores de entrada',
    'uncheck to disable\ninput sliders for\nentry fields':
        'Desassinalar para desactivar\ndeslizadores nos campos de entrada.',
    'check to enable\ninput sliders for\nentry fields':
        'Assinalar para activar deslizadores\nnos campos de entrada.',
    'Clicking sound':
        'Som de cliques',
    'uncheck to turn\nblock clicking\nsound off':
        'Desassinar para desactivar o som produzido ao clicar nos blocos.',
    'check to turn\nblock clicking\nsound on':
        'Assinar para activar o som produzido ao clicar nos blocos.',
    'Thread safe scripts':
        'Guiões thread-safe',
    'uncheck to allow\nscript reentrancy':
        'Desassinar para permitir\nreentrância nos guiões.',
    'check to disallow\nscript reentrancy':
        'Assinar para não permitir\nreentrância nos guiões.',

    // inputs
    'with inputs':
        'com entradas',
    'input names:':
        'nomes das entradas:',
    'Input Names:':
        'Nomes das entradas:',

    // context menus:
    'help':
        'ajuda',

    // blocks:
    'help...':
        'ajuda...',
    'duplicate':
        'duplicar',
    'make a copy\nand pick it up':
        'fazer uma cópia\ne recolhê-la',
    'delete':
        'remover',
    'script pic...':
        'imagem do guião...',
    'open a new window\nwith a picture of this script':
        'Abrir uma nova janela com uma imagem deste guião.',
    'ringify':
        'adicionar anel',
    'unringify':
        'remover anel',

    // custom blocks:
    'delete block definition...':
        'remover definição do bloco...',
    'edit...':
        'editar...',

    // sprites:
    'edit':
        'editar',
    'export...':
        'exportar...',

    // scripting area
    'clean up':
        'organizar',
    'arrange scripts\nvertically':
        'Organiza os guiões\nverticalmente.',
    'add comment':
        'adicionar comentário',
    'make a block...':
        'criar um bloco...',

    // costumes
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

    // dialogs
    // buttons
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

    // help
    'Help':
        'Ajuda',

    // Project Manager
    'Untitled':
        'Sem título',
    'Open Project':
        'Abrir Projecto',
    '(empty)':
        '(vazio)',
    'Saved!':
        'Guardado!',
    'Delete Project':
        'Remover Projecto',
    'Are you sure you want to delete':
        'Quer mesmo remover?',
    'rename...':
        'alterar o nome...',

    // costume editor
    'Costume Editor':
        'Editor de Trajes',
    'click or drag crosshairs to move the rotation center':
        'Clique ou arraste a mira para alterar o centro de rotação.',

    // project notes
    'Project Notes':
        'Notas do Projecto',

    // new project
    'New Project':
        'Novo Projecto',
    'Replace the current project with a new one?':
        'Substituir o projecto actual por um novo projecto?',

    // save project
    'Save Project As...':
        'Guardar Projeto ...',

    // export blocks
    'Export blocks':
        'Exportar blocos',
    'this project doesn\'t have any\ncustom global blocks yet':
        'este projecto ainda não tem nenhum bloco personalizado global',
    'select':
        'seleccionar',
    'all':
        'todos',
    'none':
        'nenhum',

    // variable dialog
    'for all sprites':
        'para todos os actores',
    'for this sprite only':
        'apenas para este actor',

    // block dialog
    'Change block':
        'Alterar bloco',
    'Command':
        'Comando',
    'Reporter':
        'Repórter',
    'Predicate':
        'Predicado',

    // block editor
    'Block Editor':
        'Editor de Blocos',
    'Apply':
        'Aplicar',

    // block deletion dialog
    'Delete Custom Block':
        'Remover Bloco Personalizado',
    'block deletion dialog text':
        'Quer mesmo remover este bloco e todas as suas utilizações?',

    // input dialog
    'Create input name':
        'Criar nome de entrada',
    'Edit input name':
        'Editar nome da entrada',
    'Title text':
        'Texto de título',
    'Input name':
        'Nome de entrada',
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
        'Qualquer\n(por calcular)',
    'Boolean\n(unevaluated)':
        'Booleano\n(por calcular)',
    'Single input.':
        'Entrada única.',
    'Default Value:':
        'Valor por omissão:',
    'Multiple inputs (value is list of inputs)':
        'Múltiplas entradas (valor é uma lista das entradas)',
    'Upvar - make internal variable visible to caller':
        'Tornar a variável interna visível pelo invocador',

    // About Snap
    'About Snap':
        'Sobre o Snap!',
    'Back...':
        'Para trás...',
    'License...':
        'Licensa...',
    'Modules...':
        'Módulos...',
    'Credits...':
        'Créditos...',
    'Translators...':
        'Tradutores',
    'License':
        'Licença',
    'current module versions:':
        'versões actuais dos módulos',
    'Contributors':
        'Contribuidores',
    'Translations':
        'Traduções',

    // variable watchers
    'normal':
        'normal',
    'large':
        'grande',
    'slider':
        'deslizador',
    'slider min...':
        'mínimmo do deslizador...',
    'slider max...':
        'máximo do deslizador...',
    'Slider minimum value':
        'Valor mínimo do deslizador',
    'Slider maximum value':
        'Valor máximo do deslizador',

    // list watchers
    'length: ':
        'comprimento: ',

    // coments
    'add comment here...':
        'adicionar um comentário aqui...',

    // drow downs
    // directions
    '(90) right':
        '(90) direita',
    '(-90) left':
        '(-90) esquerda',
    '(0) up':
        '(0) cima',
    '(180) down':
        '(180) baixo',

    // collision detection
    'mouse-pointer':
        'ponteiro do rato',
    'edge':
        'borda',
    'pen trails':
        'traços da caneta',

    // costumes
    'Turtle':
        'Tartaruga',

    // graphical effects
    'ghost':
        'fantasma',

    // keys
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

    // messages
    'new...':
        'nova...',

    // math functions
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

    // data types
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

    // list indices
    'last':
        'o fim',
    'any':
        'qualquer dos itens'
};
