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
        '2020-08-03',

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
    'add a new Turtle sprite':
        'Adicionar um novo actor tartaruga.',
    'paint a new sprite':
        'Pintar um novo actor.',
    'take a camera snapshot and\nimport it as a new sprite':
        'Tirar uma fotografia com a câmara\ne importá-la como novo actor.',


    // ajuda nos tabuladores
    'costumes tab help':
        'Importe uma imagem de uma página Web ou de um\n'
            + 'arquivo do seu computador arrastando-a para aqui.',
    'import a sound from your computer\nby dragging it into here':
        'Importe um som do seu computador\narrastando-o para aqui.',

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
    '%img of costume %cst':
        '%img do traje %cst',
    'new costume %l width %dim height %dim':
        'um novo traje com %l de largura %dim e altura %dim',
    'stretch %cst x: %n y: %n %':
        'o traje %cst escalado de (x: %n % , y: %n % )',
    'change %eff effect by %n':
        'adiciona ao efeito %eff o valor %n',
    'set %eff effect to %n':
        'altera o teu efeito %eff para %n',
    'clear graphic effects':
        'limpa os efeitos gráficos',
    '%eff effect':
        'o efeito %eff',
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
    'shown?':
        'estás a ser mostrado',
    'go to %layer layer':
        'vai para %layer',
    'front':
        'a frente',
    'back':
        'trás',
    'go back %n layers':
        'recua %n camadas',

    'development mode \ndebugging primitives:':
        'primitivas de depuração \ndo modo de desenvolvimento:',
    'console log %mult%s':
        'regista %mult%s na consola',
    'alert %mult%s':
        'mostra janela de alerta com %mult%s',

    'pixels':
        'píxeis',
    'current':
        'actual',

    // sons:
    'play sound %snd':
        'toca o som %snd',
    'play sound %snd until done':
        'toca o som %snd até terminar',
    'stop all sounds':
        'pára todos os sons',
    'rest for %n beats':
        'faz uma pausa de %n tempos',
    'play sound %snd at %rate Hz':
        'toca o som %snd a %rate Hz',
    '%aa of sound %snd':
        '%aa do som %snd',
    'duration':
        'a duração',
    'length':
        'o número de amostras',
    'number of channels':
        'o número de canais',
    'new sound %l rate %rate Hz':
        'um novo som com %l e frequência %rate Hz',
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
    'change volume by %n':
        'adiciona %n % ao volume',
    'set volume to %n %':
        'altera o volume para %n %',
    'change balance by %n':
        'adiciona %n ao balanço',
    'set balance to %n':
        'altera o balanço para %n',
    'balance':
        'o balanço',
    'play frequency %n Hz':
        'toca a frequência %n Hz',
    'stop frequency':
        'pára de tocar a frequência',
    'play %n Hz for %n secs':
        'toca a frequência %n Hz durante %n s',

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
    'pen down?':
        'a tua caneta está baixa',
    'set pen color to %clr':
        'altera a cor da tua caneta para %clr',
    'set background color to %clr':
        'altera a cor do fundo para %clr',
    'change pen %hsva by %n':
        'adiciona a %hsva da tua caneta o valor %n',
    'change background %hsva by %n':
        'adiciona a %hsva do fundo o valor %n',
    'set pen %hsva to %n':
        'altera %hsva da tua caneta para %n',
    'set background %hsva to %n':
        'altera %hsva do fundo para %n',
    'pen %pen':
        '%pen da tua caneta',
    'change pen size by %n':
        'adiciona %n à espessura da tua caneta',
    'set pen size to %n':
        'altera a espessura da tua caneta para %n',
    'stamp':
        'carimba-te',
    'fill':
        'enche o palco',
    'write %s size %n':
        'escreve %s com tamanho %n',
    'paste on %spr':
        'carimba-te em %spr',
    'pen vectors':
        'os vectores da caneta',

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
    'stopped':
        'parar',
    'when %b':
        'Quando %b',
    'when I receive %msgHat':
        'Quando receberes a mensagem %msgHat',
    'broadcast %msg':
        'difunde a mensagem %msg',
    'broadcast %msg and wait':
        'difunde a mensagem %msg e espera',
    'send %msg to %spr':
        'envia a mensagem %msg a %spr',
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
    'forever %loop':
        'repete %loop para sempre',
    'repeat %n %loop':
        'repete %n vezes %loop',
    'repeat until %b %loop':
        'até que %b , repete %loop',
    'for %upvar = %n to %n %cla':
        'para %upvar de %n a %n , repete %cla',
    'if %b %c':
        'se %b , então %c',
    'if %b %c else %c':
        'se %b , então %c senão, %c',
    'if %b then %s else %s':
        'se %b então %s , senão %s',
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
    '%asp at %loc' :
        '%asp em %loc',
    'r-g-b-a':
        'os valores de R, G, B e Alpha',
    'sprites' :
        'os actores',
    'reset timer':
        'reinicia o cronómetro',
    'timer':
        'o valor do cronómetro',
    '%att of %spr':
        '%att de %spr',
    'my %get':
        '%get',
    'object %self':
        'o objecto de %self',
    'http:// %s':
        'o recurso http:// %s',
    'turbo mode':
        'turbo',
    'flat line ends':
        'extremos das linhas planos',
    'is %setting on?':
        'o modo %setting está activo',
    'set %setting to %b':
        'altera o modo %setting para %b',
    'current %dates':
        '%dates actual',
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
    'microphone %audio':
        '%audio do microfone',
    'volume':
        'o volume',
    'note':
        'a nota',
    'frequency':
        'a frequência',
    'samples':
        'as amostras',
    'sample rate':
        'a frequência de amostragem',
    'spectrum':
        'o espectro',
    'resolution':
        'a resolução',
    'Microphone resolution...':
        'Resolução do microfone...',
    'Microphone':
        'Microfone',
    'low':
        'baixa',
    'high':
        'alta',
    'max':
        'máxima',
    'video %vid on %self':
        '%vid do vídeo em %self',
    'motion':
        'o movimento',
    'snap':
        'a fotografia',
    'set video transparency to %n':
        'altera a transparência do vídeo para %n',
    'video capture':
        'captura de vídeo',
    'mirror video':
        'vídeo espelhado',
    'filtered for %clr':
        'filtrado para %clr',
    'stack size':
        'altura da pilha',
    'frames':
        'molduras',
    'log pen vectors':
        'registo de vectores da caneta',

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
        'uma lista com os troços de %s por %delim',
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
        'a função JavaScript ( %mult%s ) { %code }',
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
    'numbers from %n to %n':
        'uma lista com os números de %n a %n',
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
    'is %l empty?':
        '%l está vazia',
    'index of %s in %l':
        'o índice de %s em %l',
    'map %repRing over %l':
        'a aplicação de %repRing aos itens de %l',
    'keep items %predRing from %l':
        'os itens tais que %predRing de %l',
    'find first item %predRing in %l':
        'o primeiro item tal que %predRing de %l',
    'combine %l using %repRing':
        'a combinação dos itens de %l com %repRing',
    '%blitz map %repRing over %l':
        '%blitz a aplicação de %repRing aos itens de %l',
    '%blitz keep items %predRing from %l':
        '%blitz os itens tais que %predRing de %l',
    '%blitz find first item %predRing in %l':
        '%blitz o primeiro item tal que %predRing de %l',
    '%blitz combine %l using %repRing':
        '%blitz a combinação dos itens de %l com %repRing',
    'for each %upvar in %l %cla':
        'para cada %upvar de %l , repete %cla',
    'item':
        'o item',
    'value':
        'o valor',
    'index':
        'o índice',
    'append %lists':
        'a concatenação de %lists',
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
        'Criar novo',
    'Open...':
        'Abrir…',
    'Save':
        'Guardar',
    'Save to disk':
        'Guardar no disco',
    'store this project\nin the downloads folder\n(in supporting browsers)':
        'Guardar este projecto\nna sua pasta de descargas\n'
            + '(em navegadores que o suportem).',
    'Save As...':
        'Guardar como…',
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
    'save project data as XML\nto your downloads folder':
        'Guardar os dados do projecto no\nformato XML na sua pasta de descargas.',
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
    'save a summary\nof this project':
        'Guardar um resumo\ndeste projecto',
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
    'Libraries...':
        'Bibliotecas…',
    'Select categories of additional blocks to add to this project.':
        'Seleccionar categorias de blocos adicionais a acrescentar a este projecto.',
    'Select a costume from the media library':
        'Seleccionar um traje da biblioteca de média.',
    'Select a sound from the media library':
        'Seleccionar um som da biblioteca de média.',

    //Bibliotecas
    'Import library':
        'Importar biblioteca',
    'Loading':
        'Carregando',
    'Imported':
        'Importada',
    'Iteration, composition':
        'Iteração e composição',
    'List utilities':
        'Utilitários para listas',
    'Variadic reporters':
        'repórteres variádicos',
    'Web services access (https)':
        'Acesso a serviços web (https)',
    'Multi-branched conditional (switch)':
        'Comandos de selecção com múltiplos ramos',
    'LEAP Motion controller':
        'Controlador LEAP Motion',
    'Words, sentences':
        'Palavras e frases',
    'Catch errors in a script':
        'Capturar erros num guião',
    'Set RGB or HSV pen color':
        'Alterar ou obter corer RGB e HVS da caneta',
    'Text to speech':
        'Texto para fala',
    'Provide 100 selected colors':
        'Trabalhar com 100 cores pré-seleccionadas',
    'Infinite precision integers, exact rationals, complex':
        'Inteiros com precisão infinita, racionais exactos e números complexos',
    'Provide getters and setters for all GUI-controlled global settings':
        'Repórteres para obter e comandos para alterar todas as configurações globais',
    'Allow multi-line text input to a block':
        'Permitir texto com múltiplas linhas como entrada',
    'Create variables in program':
        'Criar variáveis não locais (globais ou de objecto) num guião',

    // menu da nuvem
    'Login...':
        'Entrar na sua conta…',
    'Signup...':
        'Registar uma nova conta…',
    'Logout':
        'Sair',
    'Change Password...':
        'Alterar palavra-passe…',
    'Reset Password...':
        'Recuperar palavra-passe…',
    'Resend Verification Email...':
        'Reenviar Mensagem de Verificação…',
    'Open in Community Site':
        'Abrir na Comunidade Snap!',

    // menu de preferências
    'Language...':
        'Língua…',
    'Zoom blocks...':
        'Ampliação dos blocos…',
    'Fade blocks...':
        'Desvanecimento de blocos…',
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
    'check to turn on\n visible stepping (slow)':
        'Assinalar para activar\nexecução passo a passo visível (lento).',
    'uncheck to turn off\nvisible stepping':
        'desassinalar para desactivar\nexecução passo a passo visível',
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
    'uncheck for lower resolution,\nsaves computing resources':
        'Desassinalar para menor resolução;\npoupa recursos computacionais.',
    'check for higher resolution,\nuses more computing resources':
        'Assinalar para maior resolução;\ngasta mais recursos computacionais.',
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
        'Desassinalar para executar os guiões\nà velocidade normal.',
    'check to enable\nIDE animations':
        'Assinalar para activar\nas animações do AID',
    'Flat design':
        'Design plano',
    'check for alternative\nGUI design':
        'Assinalar para um design alternativo\nda interface gráfica com o utilizador.',
    'uncheck for default\nGUI design':
        'Desassinalar para o design por omissão\nda interface gráfica com o utilizador.',
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
    'Hyper blocks support':
        'Suporte para hiperblocos',
    'uncheck to disable\nusing operators on lists and tables':
         'Desassinalar para desactivar a utilização\nde operadores em listas e tabelas.',
    'check to enable\nusing operators on lists and tables':
         'Assinalar para activar a utilização\nde operadores em listas e tabelas.',
    'Log pen vectors':
        'Registar vectores da caneta',
    'uncheck to turn off\nlogging pen vectors':
        'Desassinalar para desactivar\no registo de vectores da caneta',
    'check to turn on\nlogging pen vectors':
        'Assinalar para activar\no registo de vectores da caneta',


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
    'compile':
        'compilar',
    'uncompile':
        'descompilar',
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
    'save a picture\nof this script':
        'guardar uma fotografia\ndeste guião',
    'result pic...':
        'fotografia do resultado…',
    'save a picture of both\nthis script and its result':
        'Guardar uma fotografia deste\nguião e do seu resultado.',
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
    'duplicate block definition...':
        'duplicar definição do bloco…',
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
    'stick to':
        'prender a',
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
    'svg...':
        'exportar SVG…',
    'export pen trails\nline segments as SVG':
        'exportar os traços da\ncaneta no formato SVG',
    'there are currently no\nvectorizable pen trail segments':
        'de momento não há traços\nda caneta vectorizáveis',
    'turn all pen trails and stamps\ninto a new background for the stage':
        'Transforma todos os traços da caneta e\ncarimbagens num novo cenário do palco.',
    'turn all pen trails and stamps\ninto a new costume for the\ncurrently selected sprite':
        'Transforma todos os traços da caneta e carimbagens num\nnovo traje do actor seleccionado neste momento.',

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

    // sons
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

    // listas e tabelas
    'list view...':
        'vista de lista…',
    'table view...':
        'vista de tabela…',
    'Table view':
        'Vista de tabela',
    'open in dialog...':
        'abrir em caixa de diálogo…',
    'blockify':
        'como bloco',
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

    // desvanecimento de blocos
    'Fade blocks':
        'Desvanecimento de blocos',
    'block-solid (0)':
        'normal (0)',
    'medium (50)':
        'médio (50)',
    'light (70)':
        'leve (70)',
    'cintilante (80)':
        'schimmernd (80)',
    'elegant (90)':
        'elegante (90)',
    'subtle (95)':
        'subtil (95)',
    'text-only (100)':
        'apenas texto (100)',

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
    'Examples':
        'Exemplos',
    'Share':
        'Partilhar',
    'Unshare':
        'Deixar de Partilhar',
    'Publish':
        'Publicar',
    'Unpublish':
        'Deixar de Publicar',
    'Updating\nproject list...':
        'Actualizando a\nlista de projectos…',
    'Recover':
        'Recuperar',
    'Today':
        'Hoje',
    'Yesterday':
        'Ontem',

    // editor de trajes
    'Costume Editor':
        'Editor de Trajes',
    'Paint Editor':
        'Editor de Pintura',
    'click or drag crosshairs to move the rotation center':
        'Clique ou arraste a mira para alterar o centro de rotação.',
    'undo':
        'desfazer',
    'Vector':
        'Vector',
    'Paintbrush tool\n(free draw)':
        'Pincel\n(desenho livre)',
    'Stroked Rectangle\n(shift: square)':
        'Rectângulo\n(shift: quadrado)',
    'Stroked Ellipse\n(shift: circle)':
        'Elipse\n(shift: circunferência)',
    'Eraser tool':
        'Borracha',
    'Set the rotation center':
        'Estabelecer centro de rotação',
    'Line tool\n(shift: vertical/horizontal)':
        'Segmento de recta\n(shift: vertical/horizontal)',
    'Filled Rectangle\n(shift: square)':
        'Rectângulo preenchido\n(shift: quadrado)',
    'Filled Ellipse\n(shift: circle)':
        'Elipse preenchida\n(shift: círculo)',
    'Fill a region':
        'Balde de tinta',
    'Pipette tool\n(pick a color anywhere)':
        'Pipeta\n(recolher uma cor em qualquer lado)',
    'Brush size':
        'Espessura do pincel',
    'Constrain proportions of shapes?\n(you can also hold shift)':
        'Preservar proporções das formas?\n(também pode pressionar shift)',
    'grow':
        'aumentar',
    'shrink':
        'reduzir',
    'flip ↔':
        'inverter ↔',
    'flip ↕':
        'inverter ↕',

    'Vector Paint Editor':
        'Editor de Pintura Vectorial',
    'Rectangle\n(shift: square)':
        'Rectângulo\n(shift: quadrado)',
    'Ellipse\n(shift: circle)':
        'Elipse\n(shift: círculo)',
    'Selection tool':
        'Selecção',
    'Line tool\n(shift: constrain to 45º)':
        'Linha\n(shift: restringe a 45°)',
    'Closed brush\n(free draw)':
        'Pincel fechado\n(desenho livre)',
    'Paint a shape\n(shift: edge color)':
        'Pintar uma forma\n(shift: cor de aresta)',
    'Pipette tool\n(pick a color from anywhere\nshift: fill color)':
        'Pipeta\n(recolher uma cor de qualquer lado\nshift: cor de preenchimento)',
    'Edge color\n(left click)':
        'Cor de aresta\n(clique esquerdo)',
    'Fill color\n(right click)':
        'Cor de preenchimento\n(clique direito)',
   'Top':
       'Topo',
   'Bottom':
       'Base',
   'Up':
       'Cima',
   'Down':
       'Baixo',


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
    'Save Project':
        'Guardar Projecto',

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
    'raw data...':
        'dados em bruto…',
    'import without attempting to\nparse or format data':
        'Importar sem tentar analisar ou formatar os dados',
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
    'comment pic...':
        'fotografia do comentário…',
    'open a new window\nwith a picture of this comment':
        'Abrir uma nova janela com\numa fotografia deste comentário.',

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
        'Tartaruga',
    'Empty':
        'Vazio',
    'Paint a new costume':
        'Pintar um novo traje.',
    'Import a new costume from your webcam':
        'Importar um novo traje da sua câmara.',
    'Please make sure your web browser is up to date\nand your camera is properly configured. \n\nSome browsers also require you to access Snap!\nthrough HTTPS to use the camera.\n\nPlase replace the "http://" part of the address\nin your browser by "https://" and try again.':
        'Por favor assegure-se de que o seu navegador está actualizado\ne de que a sua câmara está correctamente configurada.\n\nAlguns navegadores também exigem que aceda ao Snap!\natravés de HTTPS para usar a câmara.\n\nPor favor substitua a parte "http://" do endereço\nno seu navegador por "https:// e tente de novo."',
    'Camera':
        'Câmara',

    // sons
    'Record a new sound':
        'Gravar um novo som.',


    // efeitos gráficos, cor da caneta
    'color':
        'a cor',
    'hue':
        'o matiz',
    'fisheye':
        'olho-de-peixe',
    'whirl':
        'remoinho',
    'pixelate':
        'pixelização',
    'mosaic':
        'mosaico',
    'saturation':
        'a saturação',
    'brightness':
        'o brilho',
    'transparency':
        'a transparência',
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

    // mensagens
    'new...':
        'Nova…',
    '__shout__go__':
        'bandeira verde clicada',

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
    'word':
        'palavra',
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

    // attributos
    'my':
        'próprios',
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
    'temporary?':
        'és temporário',
    'children':
        'os descendentes',
    'clones':
        'os clones',
    'other clones':
        'os outros clones',
    'dangling?':
        'estás pendurado',
    'draggable?':
        'és arrastável',
    'rotation style':
        'estilo de rotação',
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
    'costume':
        'o traje',
    'stage':
        'o palco',
    'costumes':
        'os trajes',
    'sounds':
        'os sons',
    'scripts':
        'os guiões',
    'width':
        'a largura',
    'height':
        'a altura',
    'left':
        'a coordenada x da esquerda',
    'right':
        'a coordenada x da direita',
    'top':
        'a coordenada y da topo',
    'bottom':
        'a coordenada y da base',

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
    'neg':
        'o simétrico',
    'url %s':
        'o recurso http:// %s',
    'delete %shd':
        'remove %shd',
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
    'Export all scripts as pic...':
        'Exportar todos os guiões como fotografia…',
    'show a picture of all scripts\nand block definitions':
        'Mostra uma imagem com todos\nos guiões e definições de blocos',
    'find blocks...':
        'procurar blocos…',
    'costume name':
        'o nome do traje',
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
    'You are not logged in':
        'Ainda não se autenticou',
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
    'Rasterize SVGs':
        'Transformar SVG em mapas de bits',
    'check to rasterize\nSVGs on import':
        'Assinalar para transformar os arquivos SVG\nem mapas de bits durante a importação.',
    'turn pen trails into new costume...':
        'transformar traços da caneta em novo traje…',
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
    'password has been changed.':
        'a sua palavra-passe foi alterada.',
    'SVG costumes are\nnot yet fully supported\nin every browser':
        'trajes SVG ainda não\nsão totalmente suportados\nem todos os navegadores',
    'script pic with result...':
        'fotografia do guião incluindo resultado…',
    'open a new window\nwith a picture of both\nthis script and its result':
        'Abrir uma nova janela com\numa fotografia tanto deste guião\ncomo do seu resultado.',
    'Import sound':
        'Importar som',
    'Import':
        'Importar',
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

    // Símbolos em blocos personalizados:
    'square':
        'quadrado',
    'pointRight':
        'triângulo para a direita',
    'stepForward':
        'avançar um passo',
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
    'ellipse':
        'elipse',
    'cross':
        'cruz',
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
    'loop':
        'ciclo',
    'turnBack':
        'voltar para trás',
    'turnForward':
        'voltar para a frente',
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
        'robô',
    'magnifyingGlass':
        'lupa',
    'magnifierOutline':
        'contorno de lupa',
    'selection':
        'selecção',
    'polygon':
        'polígono',
    'closedBrush':
        'pincelada fechada',
    'notes':
        'nota',
    'camera':
        'câmara',
    'location':
        'localização',
    'footprints':
        'pegadas',
    'keyboard':
        'teclas',
    'keyboardFilled':
        'teclado',
    'globe':
        'globo',

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
//    'variables':
//        'variáveis',
    'parameters':
        'parâmetros',
    'code':
        'código',
    'recording':
        'Gravação',
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
        'Assinalar para activar\nfuncionalidades de herança de actores.',
    'compile %repRing for %n args':
        'a compilação de %repRing para %n argumentos',
    'Polygon':
        'Polígono',
    'cloud unavailable without a web server.':
        'Nuvem indisponível sem um servidor web.',
    'sound':
        'som',

    // Traduções de blocos personalizados:
    'translations...':
        'traduções…',
    'Custom Block Translations':
        'Traduções do Bloco Personalizado',
    'Enter one translation per line. use colon (":") as lang/spec delimiter\nand underscore ("_") as placeholder for an input, e.g.:\n\nen:say _ for _ secs':
        'Introduza uma tradução por linha.\nUtilize (:) para separar a língua da especificação traduzida do bloco\ne sublinhado (_) nos locais dos parâmetros, por exemplo:\n\n  pt:diz _ durante _ s',

    // Opções de entradas de blocos personalizados:
    'options':
        'opções',
    'Input Slot Options':
        'Opções de Ranhura de Entrada',
    'Enter one option per line.\nOptionally use "=" as key/value delimiter and {} for submenus. e.g.\n   the answer=42':
        'Introduza uma opção por linha.\nOpcionalmente, use "=" como separador entre chave e valor e {} para submenus. E.g.\n   a resposta=42',
    'read-only':
        'apenas leitura',
    '(none)':
        '(nenhum)',
    'messages':
        'as mensagens',
    'objects':
        'os objectos',
    'variables':
        'as variáveis',
    'piano keyboard':
        'um teclado de piano',
    '360° dial':
        'um mostrador de 360°',
    'special':
        'especial',
    'multi-line':
        'multilinha',

    // Libraries:
    'Traditional loop constructs (while, until, etc.) plus the Lisp "named let" (a generalization of FOR) plus functional iteration (repeated invocation of a function) and function composition.':
        'Comandos tradicionais para ciclos (enquanto, até que, etc.), o «named let» do Lisp (uma generalização do ciclo PARA), iteração funcional (invocação repetida de uma função) e composição de funções.',
    'Some standard functions on lists (append, reverse, etc.)':        
        'Algumas funções padrão sobre listas (acrescentar, inverter, etc.)',
    'Streams (lazy lists)':
        'Canais (listas preguiçosas)',
    'A variation on the list data type in which each list item aren\'t computed until it\'s needed, so you can construct million-item lists without really taking up all that time or memory, or even infinite-sized lists.  (A block that reports all the prime numbers is included as an example.)':
        'Uma variação do tipo de dados lista para o qual cada item da lista não é calculado senão quando é necessário, pelo que pode criar listas com milhões de itens sem que isso demore demasiado tempo ou ocupe demasiada memória, ou mesmo listas de comprimento infinito.  (É incluído como exemplo um bloco que reporta todos os números primos.)', 
    'Versions of +, x, AND, and OR that take more than two inputs.':
        'Versões de +, x, E, e OU que aceitam mais do que duas entradas.',
    'An extended version of the HTTP:// block that allows POST, PUT, and DELETE as well as GET requests, allows using the secure HTTPS protocol, and gives control over headers, etc.':
        'Uma versão estendida do bloco HTTP:// que permite realizar pedidos POST, PUT e DELETE, bem como GET, permite utilizar o protocolo seguro HTTPS e dá controlo sobre os cabeçalhos, etc.',
    'One of the big ideas in Logo that they left out of Scratch is thinking of text as structured into words and sentences, rather than just a string of characters.  This library brings back that idea.':
        'Um das grandes ideias do Logo que ficou de fora no Scratch é pensar no texto como estruturado em palavras e frases, em vez de só como uma cadeia de caracteres. Esta biblioteca reintroduz esta ideia.',
    'Like "switch" in C-like languages or "cond" in Lisp.  Thanks to Nathan Dinsmore for inventing the idea of a separate block for each branch!':
        'Tal como o «switch» em linguagens como o C ou o «cond» no Lisp.  Obrigado ao Nathan Dinsmore por inventar a ideia de ter um bloco separado para cada ramo!',
    'Report hand positions from LEAP Motion controller (leapmotion.com).':
        'Reportar posições das mãos dadas pelo controlador LEAP Motion (leapmotion.com).',
    'Text Costumes':
        'Trajes de texto',
    'Generate costumes from letters or words of text.':
        'Gerar trajes a partir de letras ou palavras de texto.',
    'Set or report pen color as RGB (red, green, blue) or HSV (hue, saturation, value).':
        'Alterar ou reportar a cor da caneta nos formatos RGB (vermelho/«red», verde/«green», azul/«blue») ou HSV (matiz/«hue«, saturação/«saturation», brilho/«value»).',
    'Run a script; if an error happens, instead of stopping the script with a red halo, run another script to handle the error. Also includes a block to cause an error with a message given as input. Also includes a block to create a script variable and give it a value.':
        'Execute um guião; se ocorrer um erro, em vez de parar o guião com um halo vermelho, execute outro guião para lidar com o erro. Inclui também um bloco que causa um erro com uma mensagem dada como entrada. Inclui ainda um bloco para criar uma variável de guião inicializando-a imediatamente.',
    'In general, text inputs allow only a single line.  The MULTILINE block accepts multi-line text input and can be used in text input slots of other blocks.':
        'Em geral as entradas de texto permitem apenas uma única linha.  O bloco MULTILINHA aceita texto multilinha na sua entrada e pode ser usado em ranhuras de entradas de texto de outros blocos.',
    'Eisenberg\'s Law: Anything that can be done from the GUI should be doable from the programming language, and vice versa.':
        'Lei de Eisenberg: O quer que se possa fazer através da interface com o utilizador deve ser possível de fazer a partir da linguagem de programação e vice-versa.',
    'The full Scheme numeric tower.  "USE BIGNUMS <True>" to enable.':
        'A torre numérica do Scheme completa. Usar «usa números grandes <verdadeiro>" para activar.',
    'to use instead of hue for better selection':
        'Para usar em vez da matiz de modo a permitir uma melhor selecção.',
    'output text using speech synthesis.':
        'Falar texto usando síntese de voz.',
    'glide, grow and rotate using easing functions.':
        'Deslizar, aumentar e rodar usando funções de forma (de «easing»).',
    'Pixels':
        'Píxeis',
    'manipulate costumes pixel-wise.':
        'Manipular trajes píxel a píxel.',
    'Audio Comp':
        'Computação áudio',
    'analyze, manipulate and generate sound samples.':
        'Analisar, manipular e gerar amostras de som.',
    '"Bigger" Data':
        'Dados «maiores»',
    '[EXPERIMENTAL] crunch large lists very fast':
        '[EXPERIMENTAL] Processar listas grandes de forma muito rápida.',
    'Frequency Distribution Analysis':
        'Análise da distribuição de frequências',
    '[EXPERIMENTAL] analyze data for frequency distribution':
        '[EXPERIMENTAL] Analisar dados para obter a sua distribuição de frequências.',
    'World Map':
        'Mapa do mundo',
    '[EXPERIMENTAL] add interactive maps to projects':
        '[EXPERIMENTAL] Adicionar mapas interactivos a projectos.',
    'Create and manage global/sprite/script variables in a script':
        'Criar e gerir variáveis globais, de objecto e de guião a partir de um guião.',
    'Deal with JSON data':
        'Lidar com dados JSON',
    'Turn JSON strings into lists with the listify block, then retrieve data out of them by using the value at key block.':
        'Converter em listas texto com formato JSON usando o bloco «a lista em» e obter dados dessas listas usando o bloco «o valor com chave em».',
    'Parallelization':
        'Paralelização',
    'Run several scripts in parallel and wait until all are done.':
        'Executar vários guiões em paralelo e esperar que todos eles terminem.',
    'String processing':
        'Processamento de cadeias de caracteres',
    'Extract substrings of a string in various ways':
        'Extrair partes de cadeias de caracteres de formas variadas',

    // Biblioteca Animações:
    'ghost effect':
        'o efeito fantasma',
    'color effect':
        'o efeito cor',
    'saturation effect':
        'o efeito saturação',
    'brightness effect':
        'o efeito brilho',
    'fisheye effect':
        'o efeito olho-de-peixe',
    'whirl effect':
        'o efeito remoinho',
    'pixelate effect':
        'o efeito pixelização',
    'mosaic effect':
        'o efeito mosaico',
    'negative effect':
        'o efeito negativo',
    'linear':
        'linear',
    'quadratic':
        'quadrática',
    'quadratic-in':
        'quadrática à entrada',
    'quadratic-out':
        'quadrática à saída',
    'quadratic-in-out':
        'quadrática à entrada e à saída',
    'cubic':
        'cúbica',
    'cubic-in':
        'cúbica à entrada',
    'cubic-out':
        'cúbica à saída',
    'cubic-in-out':
        'cúbica à entrada e à saída',
    'quart':
        'quártica',
    'quart-in':
        'quártica à entrada',
    'quart-out':
        'quártica à saída',
    'quart-in-out':
        'quártica à entrada e à saída',
    'sinusoidal':
        'sinusoidal',
    'sine-in':
        'sinusoidal à entrada',
    'sine-out':
        'sinusoidal à saída',
    'sine-in-out':
        'sinusoidal à entrada e à saída',
    'elastic':
        'elástica',

    // Biblioteca Eisenberg:
    'Project notes':
        'Notas do projecto',
    'Project name':
        'Nome do projecto',
    'User':
        'Utilizador',
    'Presentation mode':
        'Modo de apresentação',
    'Language':
        'Língua',
    'Stage scale':
        'Escala do palco',
    'Execute on slider change':
        'Executar quando o potenciometro varia',
    'Keyboard edition':
        'Edição com o teclado',
    'Visible palette':
        'Palete visível',

    // Biblioteca Mapa do mundo:
    'OpenStreetMap':
        'OpenStreetMap',
    'Wikimedia':
        'Wikimedia',
    'Watercolor':
        'Aguarela',
    'Toner':
        'Tons',
    'Terrain':
        'Terreno',
    'Topographic':
        'Topográfico',
    'Satellite':
        'Satélite',
    'Streets':
        'Estradas',
    'Shading':
        'Sombreamento',
    'Mapbox (experimental)':
        'Mapbox (experimental)',

    // Biblioteca aritmética do Scheme:
    'number?':
        'é número, o valor',
    'complex?':
        'é complexo, o valor',
    'real?':
        'é real, o valor',
    'rational?':
        'é racional, o valor',
    'integer?':
        'é inteiro, o valor',
    'exact?':
        'é exacto, o valor',
    'inexact?':
        'é inexacto, o valor',
    'exact':
        'a versão exacta',
    'inexact':
        'a versão inexacta',
    'finite?':
        'é finito, o valor',
    'infinite?':
        'é infinito, o valor',
    'nan?':
        'é NaN, o valor',
    'numerator':
        'o numerador',
    'denominator':
        'o denominador',
    'real-part':
        'a parte real',
    'imag-part':
        'a parte imaginária',
    'magnitude':
        'o módulo',
    'angle':
        'o argumento',

    'script pic':
        'fotografia de guião',

    'Enable command drops in all rings':
        'Activar encaixe de comandos em todos os anéis',
    'uncheck to disable\ndropping commands in reporter rings':
        'Desassinalar para desactivar\no encaixe de comandos em anéis de reporter',
    'check to enable\ndropping commands in all rings':
        'Assinalar para activar\no encaixe de comandos em anéis de reporter',
    'JIT compiler support':
        'Suportar compilação JIT',
    'EXPERIMENTAL! uncheck to disable live\nsupport for compiling':
        'EXPERIMENTAL! Desassinalar para desactivar\no suporte da compilação dinâmica.',
    'EXPERIMENTAL! check to enable\nsupport for compiling':
        'EXPERIMENTAL! Assinalar para activar\no suporte da compilação dinâmica.',

    'download script':
        'descarregar guião',
};
