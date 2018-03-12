/*

    lang-pt.js

    Portuguese translation for Snap!

    originally written by Jens Mönig
    rewritten by Alfonso Ruzafa

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


    1. Create a translation from scratch:

    Switch to the english version of Snap! (or choose one of the available
    languages you are more comfortable with):

        Settings > Language... > English

    While holding the shift key, press the Settings button again. A dev-only
    option will be shown: "Generate lang-XX.js file...". Click it and you will
    download a file containing all Snap! translatable strings along with the
    available translations for the language you choosed above and "undefined"
    for those strings not yet translated.

    Note that the Snap! original strings are written in english so no english
    translation file is needed. That's because the lang-en.js will be full of
    "undefined" translations. This is a good start point if you want to start
    translating Snap! from scratch!


    2. Edit

    Edit the translation file with a regular text editor, or with your
    favorite JavaScript editor.

    Replace all occurrences of the "XX" from SnapTranslator.dict["XX"]
    in the file with the two-letter ISO 639-1 code for your language,
    e.g.

        fr - French => SnapTranslator.dict['fr'] = {
        it - Italian => SnapTranslator.dict['it'] = {
        pl - Polish => SnapTranslator.dict['pl'] = {
        pt - Portuguese => SnapTranslator.dict['pt'] = {
        es - Spanish => SnapTranslator.dict['es'] = {
        el - Greek => => SnapTranslator.dict['el'] = {

    etc. (see <http://en.wikipedia.org/wiki/ISO_639-1>)

    Also change the header file fields and the metadata... language name,
    name in english and your contact info using the following format
    (only the name is mandatory):

        Your name <your@email.com> (your.homepage.com)

    IMPORTANT:

        Once edited, you MUST copy the metadata definition snippet and
        paste at the end of the locale.js file. This will activate the support
        for your language.

        Rename the file you downloaded to lang-XX.js, with XX being the two
        letter code you used previously.

        Go back to to Snap! and reload the page. An entry with the name of
        your language should be shown under the Languages menu.


    3. Translate

    Then work through the dictionary, providing your own translations as
    values for the english key strings. The dictionary is a straight-forward
    JavaScript ad-hoc object, for review purposes it should be formatted
    as follows:

        {
            'English string': // morphic.js:783
                'Translation string',
            'last key':
                undefined,
            'a key with a {{ placeholder }}':
                'this translation a {{ placeholder }} has',
        }

    and you only edit the indented value strings. Note that each key-value
    pair needs to be delimited by a comma, but that there shouldn't be a comma
    after the last pair (again, just overwrite the template file and you'll be
    fine).

    Placeholders are strings automatically provided by Snap! in runtime.
    You are allowed to place in the most natural way in your translation,
    or even ignore it completely if it's justified.

    Also, note that is OK if you left an english string untranslated, that is,
    its value set to "undefined". So you don't need to delete that key/value
    pairs. Maybe a future translator would find a suitable translation for it.

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
        and: <https://r12a.github.io/apps/conversion/>


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

    When you're done, send the lang-XX.js file to me for inclusion in the
    official Snap! distribution.
    Once your translation has been included, Your name will the shown in the
    "Translators" tab in the "About Snap!" dialog box, and you will be able to
    directly launch a translated version of Snap! in your browser by appending

        lang:XX

    to the URL, XX representing your translations two-letter code.


    7. Known issues

    In some browsers accents or ornaments located in typographic ascenders
    above the cap height are currently (partially) cut-off.

    Enjoy!
    -Jens

*/

/* global SnapTranslator */

// Copy the following code snippet and paste it in the locale.js file:
// ✂ - - - - - - - - - - - - - - - - -  -   -
SnapTranslator.dict.pt = {
    metadata: {
        'name': // the name as it should appear in the language menu
            'Portugu\u00EAs',
        'english_name': // the english name of the language
            'Portuguese',
        'translators': [ // translators authors for the Translators tab
            'Manuel Menezes de Sequeira <mmsequeira@gmail.com>'
        ],
        'last_changed': // this, too, will appear in the Translators tab
            '2017-10-30',
    },
    strings: {},
};
// ✂ - - - - - - - - - - - - - - - - -  -   -

SnapTranslator.dict.pt.strings = {
    '0': // blocks.js:1178
        '0',
    '1': // blocks.js:1179
        '1',
    '2': // blocks.js:1180
        '2',
    '3': // blocks.js:1181
        '3',
    '4': // blocks.js:1182
        '4',
    '5': // blocks.js:1183
        '5',
    '6': // blocks.js:1184
        '6',
    '7': // blocks.js:1185
        '7',
    '8': // blocks.js:1186
        '8',
    '9': // blocks.js:1187
        '9',
    'cached inputs size do not match': // blocks.js:341
        undefined,
    'cached input does not match': // blocks.js:347
        undefined,
    'pen trails': // blocks.js:820 blocks.js:8393 objects.js:578 objects.js:7436
        'os tra\u00E7os da caneta',
    'stage image': // blocks.js:821
        undefined,
    'with inputs': // blocks.js:831
        'com argumentos',
    'block variables': // blocks.js:840 byob.js:1053
        'com vari\u00E1veis de bloco',
    'Input Names': // blocks.js:844
        'Par\u00E2metros',
    'input names': // blocks.js:850
        'com par\u00E2metros',
    'Input name': // blocks.js:902 blocks.js:5344
        'Par\u00E2metro',
    '(90) right': // blocks.js:935 morphic.js:4888
        '90\u00B0 (direita)',
    '(-90) left': // blocks.js:936 morphic.js:4889
        '-90\u00B0 (esquerda)',
    '(0) up': // blocks.js:937 morphic.js:4890
        '0\u00B0 (cima)',
    '(180) down': // blocks.js:938 morphic.js:4891
        '180\u00B0 (baixo)',
    'random': // blocks.js:939
        undefined,
    '(1) sine': // blocks.js:956
        '(1) sinusoisal',
    '(2) square': // blocks.js:957
        '(2) quadrada',
    '(3) sawtooth': // blocks.js:958
        '(3) dente de serra',
    '(4) triangle': // blocks.js:959
        '(4) triangular',
    'January': // blocks.js:968 widgets.js:1941
        'Janeiro',
    'February': // blocks.js:969 widgets.js:1942
        'Fevereiro',
    'March': // blocks.js:970 widgets.js:1943
        'Mar\u00E7o',
    'April': // blocks.js:971 widgets.js:1944
        'Abril',
    'May': // blocks.js:972 widgets.js:1945
        'Maio',
    'June': // blocks.js:973 widgets.js:1946
        'Junho',
    'July': // blocks.js:974 widgets.js:1947
        'Julho',
    'August': // blocks.js:975 widgets.js:1948
        'Agosto',
    'September': // blocks.js:976 widgets.js:1949
        'Setembro',
    'October': // blocks.js:977 widgets.js:1950
        'Outubro',
    'November': // blocks.js:978 widgets.js:1951
        'Novembro',
    'December': // blocks.js:979 widgets.js:1952
        'Dezembro',
    'clicked': // blocks.js:988
        'clicar em ti',
    'pressed': // blocks.js:989
        'pressionar em ti',
    'dropped': // blocks.js:990
        'te largar',
    'mouse-entered': // blocks.js:991
        'entrar em ti',
    'mouse-departed': // blocks.js:992
        'sair de ti',
    'scrolled-up': // blocks.js:993
        undefined,
    'scrolled-down': // blocks.js:994
        undefined,
    'year': // blocks.js:1004 widgets.js:2063
        'ano',
    'month': // blocks.js:1005
        'o m\u00EAs',
    'date': // blocks.js:1006
        'o dia',
    'day of week': // blocks.js:1007
        'o dia da semana',
    'hour': // blocks.js:1008
        'a hora',
    'minute': // blocks.js:1009
        'o minuto',
    'second': // blocks.js:1010
        'o segundo',
    'time in milliseconds': // blocks.js:1011
        'o tempo (em milisegundos)',
    'letter': // blocks.js:1021
        'letra',
    'whitespace': // blocks.js:1022
        'espa\u00E7os em branco',
    'line': // blocks.js:1023 symbols.js:113
        'linha',
    'tab': // blocks.js:1024
        'tabuladores',
    'cr': // blocks.js:1025
        'retornos',
    'csv': // blocks.js:1026
        undefined,
    'last': // blocks.js:1036 blocks.js:1048
        'o \u00FAltimo item',
    'all': // blocks.js:1038 blocks.js:1265 byob.js:3874
        'tudo',
    'any': // blocks.js:1049
        'um item ao acaso',
    'distance': // blocks.js:1058
        undefined,
    'direction': // blocks.js:1059 blocks.js:2483 blocks.js:8556 objects.js:300
        'a direc\u00E7\u00E3o',
    'color': // blocks.js:1117 morphic.js:4132 morphic.js:4135 morphic.js:12219 morphic.js:12222
        'cor',
    'fisheye': // blocks.js:1118
        'olho-de-peixe',
    'whirl': // blocks.js:1119
        'remoinho',
    'pixelate': // blocks.js:1120
        'pixeliza\u00E7\u00E3o',
    'mosaic': // blocks.js:1121
        'mosaico',
    'duplicate': // blocks.js:1122 blocks.js:2545 blocks.js:11904 gui.js:7368 gui.js:7710 morphic.js:4167 objects.js:3236
        'duplicar',
    'negative': // blocks.js:1123
        'negativo',
    'comic': // blocks.js:1124
        'ondeado',
    'confetti': // blocks.js:1125
        'confetes',
    'saturation': // blocks.js:1126
        'satura\u00E7\u00E3o',
    'brightness': // blocks.js:1127
        'brilho',
    'ghost': // blocks.js:1128
        'fantasma',
    'any key': // blocks.js:1146
        'qualquer',
    'up arrow': // blocks.js:1147
        'seta para cima',
    'down arrow': // blocks.js:1148
        'seta para baixo',
    'right arrow': // blocks.js:1149
        'seta para a direita',
    'left arrow': // blocks.js:1150
        'seta para a esquerda',
    'space': // blocks.js:1151
        'espa\u00E7o',
    'a': // blocks.js:1152
        'a',
    'b': // blocks.js:1153
        'b',
    'c': // blocks.js:1154
        'c',
    'd': // blocks.js:1155
        'd',
    'e': // blocks.js:1156
        'e',
    'f': // blocks.js:1157
        'f',
    'g': // blocks.js:1158
        'g',
    'h': // blocks.js:1159
        'h',
    'i': // blocks.js:1160
        'i',
    'j': // blocks.js:1161
        'j',
    'k': // blocks.js:1162
        'k',
    'l': // blocks.js:1163
        'l',
    'm': // blocks.js:1164
        'm',
    'n': // blocks.js:1165
        'n',
    'o': // blocks.js:1166
        'o',
    'p': // blocks.js:1167
        'p',
    'q': // blocks.js:1168
        'q',
    'r': // blocks.js:1169
        'r',
    's': // blocks.js:1170
        's',
    't': // blocks.js:1171
        't',
    'u': // blocks.js:1172
        'u',
    'v': // blocks.js:1173
        'v',
    'w': // blocks.js:1174
        'w',
    'x': // blocks.js:1175
        'x',
    'y': // blocks.js:1176
        'y',
    'z': // blocks.js:1177
        'z',
    'abs': // blocks.js:1226
        'o valor absoluto',
    'ceiling': // blocks.js:1227 morphic.js:7085 morphic.js:7088
        'o arredondamento para cima',
    'floor': // blocks.js:1228 morphic.js:7069 morphic.js:7072
        'o arredondamento para baixo',
    'sqrt': // blocks.js:1229
        'a raiz quadrada',
    'sin': // blocks.js:1230
        'o seno',
    'cos': // blocks.js:1231
        'o cosseno',
    'tan': // blocks.js:1232
        'a tangente',
    'asin': // blocks.js:1233
        'o arco-seno',
    'acos': // blocks.js:1234
        'o arco-cosseno',
    'atan': // blocks.js:1235
        'o arco-tangente',
    'ln': // blocks.js:1236
        'o logaritmo natural',
    'log': // blocks.js:1237
        'o logaritmo',
    'e^': // blocks.js:1238
        'a exponencial',
    '10^': // blocks.js:1239
        undefined,
    'encode URI': // blocks.js:1249
        undefined,
    'decode URI': // blocks.js:1250
        undefined,
    'encode URI component': // blocks.js:1251
        undefined,
    'decode URI component': // blocks.js:1252
        undefined,
    'XML escape': // blocks.js:1253
        undefined,
    'XML unescape': // blocks.js:1254
        undefined,
    'hex sha512 hash': // blocks.js:1255
        undefined,
    'this script': // blocks.js:1266
        'este gui\u00E3o de objecto',
    'this block': // blocks.js:1267
        'este gui\u00E3o de bloco',
    'all but this script': // blocks.js:1268
        'todos os gui\u00F5es de objecto excepto este',
    'other scripts in sprite': // blocks.js:1269
        'os outros gui\u00F5es deste objecto',
    'String': // blocks.js:1290
        'texto',
    'Number': // blocks.js:1291 byob.js:3286
        'N\u00FAmero',
    'true': // blocks.js:1292 blocks.js:9529 blocks.js:9919 objects.js:2979
        'verdadeiro',
    'false': // blocks.js:1293 blocks.js:9544 blocks.js:9930 objects.js:2979
        'falso',
    'code': // blocks.js:1334
        'c\u00F3digo',
    'header': // blocks.js:1335
        'cabe\u00E7alho',
    'list': // blocks.js:1408 blocks.js:8487
        'lista',
    'item': // blocks.js:1409
        undefined,
    'delimiter': // blocks.js:1410
        'delimitador',
    'collection': // blocks.js:1419
        'colec\u00E7\u00E3o',
    'variables': // blocks.js:1420
        'vari\u00E1veis',
    'parameters': // blocks.js:1421
        'par\u00E2metros',
    'untitled': // blocks.js:1993 blocks.js:2604 blocks.js:6443 blocks.js:11919 byob.js:1037 byob.js:3910 gui.js:979 gui.js:4036 store.js:296
        'Sem t\u00EDtulo',
    '{{ projectName }} script pic': // blocks.js:1993 blocks.js:2602 blocks.js:6441 byob.js:1035
        undefined,
    'script target cannot be found for orphaned block': // blocks.js:2203
        undefined,
    'a {{ className }} ("{{ value }}...")': // blocks.js:2207 morphic.js:8466 morphic.js:9146
        undefined,
    'Variable name': // blocks.js:2377 blocks.js:3262 objects.js:2179 objects.js:7304
        'Qual o nome da vari\u00E1vel?',
    'help': // blocks.js:2386 objects.js:1851 objects.js:2308
        'ajuda',
    'script pic with result': // blocks.js:2393
        'fotografia do gui\u00E3o incluindo resultado',
    'open a new window\nwith a picture of both\nthis script and its result': // blocks.js:2397
        'Abrir uma nova janela com\numa fotografia tanto deste gui\u00E3o\ncomo do seu resultado.',
    'rename': // blocks.js:2409 blocks.js:2458 blocks.js:2521 gui.js:7708 gui.js:8409 morphic.js:7656
        'alterar o nome',
    'rename only\nthis reporter': // blocks.js:2413 blocks.js:2462 blocks.js:2523
        'alterar o nome\napenas neste rep\u00F3rter',
    'rename all': // blocks.js:2416 blocks.js:2465
        'alterar o nome em todo o lado',
    'rename all blocks that\naccess this variable': // blocks.js:2418 blocks.js:2467
        'alterar todos os blocos que\nusam esta vari\u00E1vel',
    'inherited': // blocks.js:2426 blocks.js:2437 blocks.js:2490 blocks.js:6370 byob.js:1099 byob.js:1121
        'herdado',
    'uncheck to\ndisinherit': // blocks.js:2431 blocks.js:2495 blocks.js:6375 byob.js:1113
        'desassinalar para\nn\u00E3o herdar',
    'check to inherit\nfrom {{ name }}': // blocks.js:2443 blocks.js:2496 blocks.js:6376 byob.js:1125
        undefined,
    'transient': // blocks.js:2450
        'transiente',
    'uncheck to save contents\nin the project': // blocks.js:2453
        'Desassinalar para guardar\no conte\u00FAdo no projecto',
    'check to prevent contents\nfrom being saved': // blocks.js:2454
        'Assinalar para n\u00E3o guardar\no conte\u00FAdo no projecto',
    'hide': // blocks.js:2472 morphic.js:4214 objects.js:394
        'esconde-te',
    'x position': // blocks.js:2481 blocks.js:8554 objects.js:288
        'a coordenada x da posi\u00E7\u00E3o',
    'y position': // blocks.js:2482 blocks.js:8555 objects.js:294
        'a coordenada y da posi\u00E7\u00E3o',
    'size': // blocks.js:2484 blocks.js:8559 objects.js:382
        'o tamanho',
    'costume #': // blocks.js:2485 blocks.js:8557 blocks.js:8561 objects.js:317
        'o n\u00FAmero do traje',
    'header mapping': // blocks.js:2507 blocks.js:2677
        'mapeamento para cabe\u00E7alho',
    'code mapping': // blocks.js:2511 blocks.js:2681
        'mapeamento para c\u00F3digo',
    'relabel': // blocks.js:2527 blocks.js:2538
        'mudar para outro bloco',
    'make a copy\nand pick it up': // blocks.js:2564 blocks.js:11908 morphic.js:4171
        'Fazer uma c\u00F3pia do\nbloco e agarr\u00E1-la.',
    'only duplicate this block': // blocks.js:2586
        'Duplicar apenas este bloco.',
    'delete': // blocks.js:2590 blocks.js:11910 gui.js:7372 gui.js:7711 gui.js:8410 morphic.js:4215 objects.js:3242
        'remover',
    'script pic': // blocks.js:2594 byob.js:1030
        'fotografia do gui\u00E3o',
    'open a new window\nwith a picture of this script': // blocks.js:2608 byob.js:1041
        'Abrir uma nova janela com\numa fotografia deste gui\u00E3o.',
    'download script': // blocks.js:2612
        undefined,
    '{{ name }} script': // blocks.js:2622
        undefined,
    'download this script\nas an XML file': // blocks.js:2627
        undefined,
    'unringify': // blocks.js:2657
        'remover anel',
    'ringify': // blocks.js:2661 blocks.js:2673
        'adicionar anel',
    'delete block': // blocks.js:2691
        undefined,
    'spec': // blocks.js:2692 blocks.js:2699
        undefined,
    'Help': // blocks.js:2980 blocks.js:2997
        'Ajuda',
    'Enter code that corresponds to the block\'s definition. Use the formal parameter\nnames as shown and <body> to reference the definition body\'s generated text code.': // blocks.js:3026
        'Introduza o c\u00F3digo correspondente \u00E0 defini\u00E7\u00E3o do bloco. Use os nomes dos par\u00E2metros\ntal como mostrados e use <body> para referenciar o c\u00F3digo gerado da defini\u00E7\u00E3o do corpo',
    'Enter code that corresponds to the block\'s definition. Choose your own\nformal parameter names (ignoring the ones shown).': // blocks.js:3029
        'Introduza o c\u00F3digo correspondente \u00E0 defini\u00E7\u00E3o do bloco. Escolha os seus pr\u00F3prios\nnomes para os par\u00E2metros (ignorando os nomes mostrados).',
    'Header mapping': // blocks.js:3043
        'Mapeamento para cabe\u00E7alho',
    'Code mapping': // blocks.js:3072
        'Mapeamento para c\u00F3digo',
    'Enter code that corresponds to the block\'s operation (usually a single\nfunction invocation). Use <#n> to reference actual arguments as shown.': // blocks.js:3077
        'Introduza o c\u00F3digo que corresponda \u00E0 opera\u00E7\u00E3o do bloco (normalmente uma simples\ninvoca\u00E7\u00E3o de rotina). Use <#n> para referenciar os argumentos tal como mostrado',
    'Variable exists': // blocks.js:3292
        undefined,
    'A variable with this name already exists in this context.': // blocks.js:3294
        undefined,
    'A variable with this name already exists as a global variable.': // blocks.js:3396
        undefined,
    'A variable with this name already exists as a sprite local variable.': // blocks.js:3455
        undefined,
    'Block variable name': // blocks.js:5346
        undefined,
    'Script variable name': // blocks.js:5348
        'Qual o nome da vari\u00E1vel de gui\u00E3o?',
    'undrop': // blocks.js:6320 blocks.js:6709
        'desfazer \u00FAltima largada',
    'undo the last\nblock drop\nin this pane': // blocks.js:6324
        'Desfazer a \u00FAltima largada de um bloco\nneste separador.',
    'redrop': // blocks.js:6335 blocks.js:6722
        'refazer \u00FAltima largada',
    'redo the last undone\nblock drop\nin this pane': // blocks.js:6339
        undefined,
    'clear undrop queue': // blocks.js:6345
        undefined,
    'forget recorded block drops\non this pane': // blocks.js:6351
        undefined,
    'clean up': // blocks.js:6359
        'arrumar',
    'arrange scripts\nvertically': // blocks.js:6359
        'Organizar os gui\u00F5es\nverticalmente.',
    'add comment': // blocks.js:6360
        'adicionar coment\u00E1rio',
    'scripts pic': // blocks.js:6362
        'fotografia dos gui\u00F5es',
    'open a new window\nwith a picture of all scripts': // blocks.js:6364
        'Abrir uma nova janela com\numa fotografia de todos os gui\u00F5es.',
    'make a block': // blocks.js:6380
        'criar um bloco',
    'Make a block': // blocks.js:6398 objects.js:2303 objects.js:2352 objects.js:2411
        'Criar um bloco',
    'nothing to undrop': // blocks.js:6549
        undefined,
    'unsupported action for {{ morph }}': // blocks.js:6640
        undefined,
    'use the keyboard\nto enter blocks': // blocks.js:6747
        'usar o teclado\npara introduzir blocos',
    'script target cannot be found for orphaned scripts': // blocks.js:6925
        undefined,
    'choose new parent': // blocks.js:7225 morphic.js:4253
        undefined,
    'new message': // blocks.js:8338 blocks.js:8370
        undefined,
    'Message name': // blocks.js:8345 blocks.js:8377
        'Qual o nome da mensagem?',
    'any message': // blocks.js:8360
        'qualquer mensagem',
    'mouse-pointer': // blocks.js:8391 blocks.js:8420
        'o ponteiro do rato',
    'edge': // blocks.js:8392
        'a borda',
    'random position': // blocks.js:8418
        undefined,
    'myself': // blocks.js:8445
        'ti',
    'number': // blocks.js:8484
        'n\u00FAmero',
    'text': // blocks.js:8485 morphic.js:12305
        'texto',
    'Boolean': // blocks.js:8486
        'booleano',
    'sprite': // blocks.js:8490
        'actor',
    'costume': // blocks.js:8492 objects.js:3069
        undefined,
    'sound': // blocks.js:8493
        undefined,
    'command': // blocks.js:8494
        'comando',
    'reporter': // blocks.js:8495
        'rep\u00F3rter',
    'predicate': // blocks.js:8496
        'predicado',
    'neighbors': // blocks.js:8502
        'os vizinhos',
    'self': // blocks.js:8503
        'tu pr\u00F3prio',
    'other sprites': // blocks.js:8504
        'os outros actores',
    'clones': // blocks.js:8505
        'os clones',
    'other clones': // blocks.js:8506
        'os outros clones',
    'parts': // blocks.js:8508
        'as partes',
    'anchor': // blocks.js:8509
        'a \u00E2ncora',
    'stage': // blocks.js:8511 symbols.js:95
        'o palco',
    'children': // blocks.js:8513
        'os descendentes',
    'parent': // blocks.js:8514 gui.js:7178 gui.js:7385
        'o progenitor',
    'temporary?': // blocks.js:8516
        undefined,
    'name': // blocks.js:8519
        'o nome',
    'costumes': // blocks.js:8520
        'os trajes',
    'sounds': // blocks.js:8521
        'os sons',
    'dangling?': // blocks.js:8522
        'est\u00E1s pendurado',
    'rotation x': // blocks.js:8523
        'a coordenada x de rota\u00E7\u00E3o',
    'rotation y': // blocks.js:8524
        'a coordenada y de rota\u00E7\u00E3o',
    'center x': // blocks.js:8525
        'a coordenada x do centro',
    'center y': // blocks.js:8526
        'a coordenada y do centro',
    'costume name': // blocks.js:8558 blocks.js:8562
        'o nome do traje',
    'Turtle': // blocks.js:8582 gui.js:7941 objects.js:3166 threads.js:3349
        'tartaruga',
    'Empty': // blocks.js:8584 gui.js:7941 objects.js:3166 threads.js:3350
        'vazio',
    'code number mapping': // blocks.js:8835
        undefined,
    'code string mapping': // blocks.js:8840
        undefined,
    'String <#1>': // blocks.js:8864
        undefined,
    'Code mapping - {{ type }}': // blocks.js:8864 blocks.js:8879
        undefined,
    'Number <#1>': // blocks.js:8879
        undefined,
    'code true mapping': // blocks.js:9500
        undefined,
    'code false mapping': // blocks.js:9505
        undefined,
    'Code mapping - {{ name }}': // blocks.js:9529 blocks.js:9544 blocks.js:10662
        undefined,
    'code list mapping': // blocks.js:10619
        undefined,
    'code item mapping': // blocks.js:10623
        undefined,
    'code delimiter mapping': // blocks.js:10627
        undefined,
    'list item delimiter': // blocks.js:10642
        undefined,
    'list contents <#1>': // blocks.js:10646
        undefined,
    'list item <#1>': // blocks.js:10650
        undefined,
    'input list': // blocks.js:10750
        'os itens de',
    'add comment here': // blocks.js:11762
        'colocar aqui um coment\u00E1rio',
    'comment pic': // blocks.js:11912
        'fotografia do coment\u00E1rio',
    '{{ projectName }} comment pic': // blocks.js:11917
        undefined,
    'open a new window\nwith a picture of this comment': // blocks.js:11923
        'Abrir uma nova janela com\numa fotografia deste coment\u00E1rio.',
    'Change block': // byob.js:885
        'Alterar tipo de bloco',
    '{{ varName }} (temporary)': // byob.js:1011 objects.js:9431 threads.js:1670
        undefined,
    'translations': // byob.js:1044
        undefined,
    'experimental': // byob.js:1048 byob.js:1057 byob.js:1065
        undefined,
    'under construction': // byob.js:1048 byob.js:1057 byob.js:1065
        undefined,
    'remove block variables': // byob.js:1061
        'remover vari\u00E1veis de bloco',
    'duplicate block definition': // byob.js:1079
        undefined,
    'delete block definition': // byob.js:1089 byob.js:1133 byob.js:1147
        'remover defini\u00E7\u00E3o do bloco',
    'edit': // byob.js:1157 gui.js:7699 morphic.js:8730 morphic.js:9477 objects.js:3255 objects.js:3261 objects.js:7422
        'editar',
    'Delete Custom Block': // byob.js:1228
        'Remover Bloco Personalizado',
    'Are you sure you want to delete this\ncustom block and all its instances?': // byob.js:1229
        'Quer mesmo remover este bloco e todas as suas utiliza\u00E7\u00F5es?',
    'OK': // byob.js:1648 byob.js:2117 byob.js:3237 byob.js:3848 gui.js:3713 morphic.js:3958 morphic.js:4028 morphic.js:4054 objects.js:8312 paint.js:161 tables.js:1212 widgets.js:1574 widgets.js:1708 widgets.js:1791 widgets.js:1874 widgets.js:2155 widgets.js:2434
        'OK',
    'Cancel': // byob.js:1649 byob.js:2120 byob.js:3243 byob.js:3849 gui.js:3371 gui.js:3714 gui.js:5941 gui.js:6843 gui.js:8996 gui.js:9134 morphic.js:4031 morphic.js:4057 objects.js:8313 paint.js:162 widgets.js:1709 widgets.js:1792 widgets.js:1887 widgets.js:2156
        'Cancelar',
    'Command': // byob.js:1770
        'Comando',
    'Reporter': // byob.js:1779 byob.js:3290
        'Rep\u00F3rter',
    'Predicate': // byob.js:1788 byob.js:3291
        'Predicado',
    'for all sprites': // byob.js:1850 byob.js:3662
        'para todos os objectos',
    'for this sprite only': // byob.js:1855 byob.js:3667
        'apenas para este objecto',
    'Block Editor': // byob.js:2065
        'Editor de Blocos',
    'Method Editor': // byob.js:2066
        'Editor de M\u00E9todos',
    'Apply': // byob.js:2119
        'Aplicar',
    'Local Block(s) in Global Definition': // byob.js:2204
        undefined,
    'This global block definition contains one or more\nlocal custom blocks which must be removed first.': // byob.js:2205
        undefined,
    'Same Named Blocks': // byob.js:2221
        undefined,
    'Another custom block with this name exists.\nWould you like to replace it?': // byob.js:2222
        undefined,
    'Custom Block Translations': // byob.js:2373
        undefined,
    'Enter one translation per line. use colon (":") as lang/spec delimiter\nand underscore ("_") as placeholder for an input, e.g.:\n\nen:say _ for _ secs': // byob.js:2379
        undefined,
    'Edit label fragment': // byob.js:2752
        'Editar etiqueta',
    'Create input name': // byob.js:2754
        'Criar par\u00E2metro',
    'Edit input name': // byob.js:2755
        'Editar par\u00E2metro',
    'new line': // byob.js:2800 byob.js:3266
        'nova linha',
    'Title text': // byob.js:3061
        'Etiqueta',
    'Delete': // byob.js:3239 gui.js:5940
        'Remover',
    'Object': // byob.js:3283
        'Objecto',
    'Text': // byob.js:3284
        'Texto',
    'List': // byob.js:3285
        'Lista',
    'Any type': // byob.js:3287
        'Qualquer tipo',
    'Boolean (T/F)': // byob.js:3288
        'Booleano (V/F)',
    'Command\n(inline)': // byob.js:3289
        'Comando\n(em linha)',
    'Command\n(C-shape)': // byob.js:3292
        'Comando\n(em forquilha)',
    'Any\n(unevaluated)': // byob.js:3293
        'Rep\u00F3rter\n(forma especial)',
    'Boolean\n(unevaluated)': // byob.js:3294
        'Predicado\n(forma especial)',
    'Single input': // byob.js:3299
        undefined,
    'Multiple inputs (value is list of inputs)': // byob.js:3304
        'M\u00FAltiplos argumentos (o valor do par\u00E2metro \u00E9 a lista dos argumentos).',
    'Upvar - make internal variable visible to caller': // byob.js:3309
        'Tornar o par\u00E2metro vis\u00EDvel ao invocador.',
    'Default Value': // byob.js:3314
        'Valor em caso de omiss\u00E3o do argumento',
    'options': // byob.js:3570
        'op\u00E7\u00F5es',
    'read-only': // byob.js:3573
        'apenas leitura',
    'Input Slot Options': // byob.js:3593
        'Op\u00E7\u00F5es de Ranhura de Entrada',
    'Enter one option per line.\nOptionally use "=" as key/value delimiter and {} for submenus. e.g.\n   the answer=42': // byob.js:3597
        undefined,
    'Export blocks': // byob.js:3776 byob.js:3914 gui.js:3187 gui.js:3835
        'Exportar blocos',
    'select': // byob.js:3873
        'seleccionar',
    'none': // byob.js:3875 objects.js:5421 objects.js:5427
        'nenhum',
    '{{ projectName }} blocks': // byob.js:3910
        undefined,
    'no blocks were selected': // byob.js:3915 byob.js:4009 byob.js:4102
        undefined,
    'Import blocks': // byob.js:3962 byob.js:3963 byob.js:4008
        'Importar blocos',
    'Imported Blocks Module': // byob.js:4002 byob.js:4003 gui.js:4355
        undefined,
    'Remove unused blocks': // byob.js:4056 byob.js:4057 byob.js:4101 gui.js:3872
        'Remover blocos n\u00E3o usados',
    '{{ count }} unused block(s) removed': // byob.js:4096
        undefined,
    'There was an error while trying to access\na {{ cloudName }} service. Please try again later.': // cloud.js:90
        undefined,
    'Cloud Error': // cloud.js:159
        undefined,
    'You are not logged in': // cloud.js:188 cloud.js:436
        'Ainda n\u00E3o se autenticou',
    'Could not retrieve current user': // cloud.js:237
        undefined,
    'Could not retrieve user': // cloud.js:247
        undefined,
    'logout failed': // cloud.js:258
        undefined,
    'login failed': // cloud.js:280
        undefined,
    'signup failed': // cloud.js:303
        undefined,
    'Could not change password': // cloud.js:323
        undefined,
    'Password reset request failed': // cloud.js:334
        undefined,
    'Could not send verification email': // cloud.js:344
        undefined,
    'Cannot Save Project': // cloud.js:378
        undefined,
    'The media inside this project exceeds {{ size }}.\nPlease reduce the size of costumes or sounds.\n': // cloud.js:379
        undefined,
    'Project media exceeds {{ size }} size limit': // cloud.js:387
        undefined,
    'Serialization of program data failed': // cloud.js:398 cloud.js:401
        undefined,
    'Serialization of media failed': // cloud.js:409 cloud.js:412
        undefined,
    'Uploading {{ size }}': // cloud.js:419
        undefined,
    'Project could not be saved': // cloud.js:429
        undefined,
    'Could not fetch projects': // cloud.js:456 cloud.js:490
        undefined,
    'Could not fetch thumbnail': // cloud.js:509
        undefined,
    'Could not fetch project {{ name }}': // cloud.js:520 cloud.js:536
        undefined,
    'Could not fetch metadata for {{ name }}': // cloud.js:552
        undefined,
    'Could not delete project': // cloud.js:568
        undefined,
    'Could not share project': // cloud.js:586
        undefined,
    'Could not unshare project': // cloud.js:604
        undefined,
    'Could not publish project': // cloud.js:622
        undefined,
    'Could not unpublish project': // cloud.js:640
        undefined,
    'Could not update project notes': // cloud.js:655
        undefined,
    'Unverified account': // gui.js:281 gui.js:5252
        undefined,
    'Your account is still unverified.\nPlease use the verification link that\nwas sent to your email address when you\nsigned up.\n\nIf you cannot find that email, please\ncheck your spam folder. If you still\ncannot find it, please use the "Resend\nVerification Email..." option in the cloud\nmenu.': // gui.js:282
        undefined,
    'unable to retrieve {{ resource }}': // gui.js:337 gui.js:5689 gui.js:5700 morphic.js:11546
        undefined,
    'unable to retrieve project': // gui.js:339
        undefined,
    'Fetching project\nfrom the cloud': // gui.js:417 gui.js:458 gui.js:494 gui.js:2612 gui.js:6391
        'Obtendo o projecto\nda nuvem',
    'Opening project': // gui.js:430 gui.js:470 gui.js:2627 gui.js:4222
        'Abrindo o projecto',
    'Saved project\n{{ name }}': // gui.js:506
        undefined,
    'Visible stepping': // gui.js:716 gui.js:2756
        'Tra\u00E7ado passo a passo vis\u00EDvel',
    'development mode': // gui.js:990 morphic.js:12252
        'modo de desenvolvimento',
    'don\'t rotate': // gui.js:1222
        'n\u00E3o roda',
    'can rotate': // gui.js:1223
        'roda',
    'only face left/right': // gui.js:1224
        'olha apenas para a esquerda ou para a direita',
    'draggable': // gui.js:1329
        'arrast\u00E1vel',
    'Scripts': // gui.js:1371 gui.js:4179
        'Gui\u00F5es',
    'Costumes': // gui.js:1391 gui.js:3252 gui.js:3255 gui.js:4156
        'Trajes',
    'Backgrounds': // gui.js:1392 gui.js:3252 gui.js:3255
        'Cen\u00E1rios',
    'Sounds': // gui.js:1411 gui.js:3262 gui.js:3264 gui.js:4167
        'Sons',
    'add a new Turtle sprite': // gui.js:1545
        'Adicionar um novo actor.',
    'paint a new sprite': // gui.js:1567
        'Pintar um novo actor.',
    'take a camera snapshot and\nimport it as a new sprite': // gui.js:1592
        undefined,
    'Unable to import this image': // gui.js:1906
        undefined,
    'The picture you wish to import has been\ntainted by a restrictive cross-origin policy\nmaking it unusable for costumes in {{ appName }}.\n\nTry downloading this picture first to your\ncomputer, and import it from there.': // gui.js:1907
        undefined,
    'Serialization failed': // gui.js:2138 gui.js:4684 gui.js:4980 gui.js:5139
        undefined,
    'recording': // gui.js:2353
        undefined,
    'About': // gui.js:2471
        'Acerca do Snap!',
    'Reference manual': // gui.js:2474
        'Ler o Manual de refer\u00EAncia',
    '{{ site }} website': // gui.js:2481
        undefined,
    'Download source': // gui.js:2487
        'Descarregar o c\u00F3digo fonte',
    'Switch back to user mode': // gui.js:2498
        'Regressar ao modo de utilizador',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones': // gui.js:2500
        'Desactivar menus de contexto\nprofundos do Morphic e\nmostrar menus amig\u00E1veis.',
    'Switch to dev mode': // gui.js:2507
        'Passar ao modo de desenvolvimento',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!': // gui.js:2509
        'Activar menus de contexto\ne inspectores n\u00E3o\namig\u00E1veis do Morphic!',
    'Cloud URL': // gui.js:2527 gui.js:5654
        undefined,
    'Login': // gui.js:2536
        'Entrar na sua conta',
    'Signup': // gui.js:2540
        'Registo de nova conta',
    'Reset Password': // gui.js:2544
        'Recuperar palavra-passe',
    'Resend Verification Email': // gui.js:2548
        undefined,
    'Logout {{ username }}': // gui.js:2553
        undefined,
    'Change Password': // gui.js:2557 gui.js:5420
        'Alterar palavra-passe',
    'Export project media only': // gui.js:2564
        undefined,
    'Export Project As': // gui.js:2569 gui.js:2583 gui.js:2597 gui.js:3158 gui.js:3176
        'Exportar Projecto Como',
    'Export project without media': // gui.js:2578
        undefined,
    'Export project as cloud data': // gui.js:2592
        undefined,
    'Open shared project from cloud': // gui.js:2607
        undefined,
    'Author name': // gui.js:2609
        undefined,
    'Project name': // gui.js:2610
        undefined,
    'Language': // gui.js:2676
        'L\u00EDngua',
    'Generate {{ filename }} file': // gui.js:2679 gui.js:5035
        undefined,
    'builds the {{ language }} translation file': // gui.js:2684
        undefined,
    'Zoom blocks': // gui.js:2692 gui.js:5120
        'Amplia\u00E7\u00E3o de blocos',
    'Stage size': // gui.js:2696 gui.js:5163
        'Tamanho do palco',
    'Dragging threshold': // gui.js:2701 gui.js:5226
        'Limiar de arrastamento',
    'specify the distance the hand has to move\nbefore it picks up an object': // gui.js:2703
        'Especificar a dist\u00E2ncia que m\u00E3o tem de se\nmover antes de agarrar algum objecto',
    'Retina display support': // gui.js:2725
        'Suporte para o ecr\u00E3 retina',
    'uncheck for lower resolution,\nsaves computing resources': // gui.js:2728
        'Desassinalar para menor resolu\u00E7\u00E3o;\npoupa recursos computacionais.',
    'check for higher resolution,\nuses more computing resources': // gui.js:2729
        'Assinalar para maior resolu\u00E7\u00E3o;\ngasta mais recursos computacionais.',
    'Input sliders': // gui.js:2733
        'Deslizadores nas ranhuras',
    'uncheck to disable\ninput sliders for\nentry fields': // gui.js:2736
        'Desassinalar para desactivar\ndeslizadores nas ranhuras dos blocos.',
    'check to enable\ninput sliders for\nentry fields': // gui.js:2737
        'Assinalar para activar deslizadores\nnas ranhuras dos blocos.',
    'Execute on slider change': // gui.js:2741
        undefined,
    'uncheck to suppress\nrunning scripts\nwhen moving the slider': // gui.js:2744
        undefined,
    'check to run\nthe edited script\nwhen moving the slider': // gui.js:2745
        undefined,
    'Turbo mode': // gui.js:2749
        'Modo turbo',
    'uncheck to run scripts\nat normal speed': // gui.js:2752
        'Desssinalar para executar os gui\u00F5es\n\u00E0 velocidade normal.',
    'check to prioritize\nscript execution': // gui.js:2753
        'Assinalar para dar prioridade\n\u00E0 execu\u00E7\u00E3o de gui\u00F5es.',
    'uncheck to turn off\nvisible stepping': // gui.js:2759
        'desassinalar para desactivar\nexecu\u00E7\u00E3o passo a passo vis\u00EDvel',
    'check to turn on\nvisible stepping (slow)': // gui.js:2760
        'assinalar para activar\nexecu\u00E7\u00E3o passo a passo vis\u00EDvel (lento)',
    'Ternary Boolean slots': // gui.js:2764
        'Ranhuras booleanas tern\u00E1rias',
    'uncheck to limit\nBoolean slots to true / false': // gui.js:2770
        'desassinalar para limitar\nas ranhuras booleanas aos valores verdadeiro / falso',
    'check to allow\nempty Boolean slots': // gui.js:2771
        'assinalar para permitir\nranhuras booleanas vazias',
    'Camera support': // gui.js:2775
        'Suporte para c\u00E2mara',
    'uncheck to disable\ncamera support': // gui.js:2778
        'desassinalar para desactivar\no suporte para a c\u00E2mara',
    'check to enable\ncamera support': // gui.js:2779
        'assinalar para activar\no suporte para a c\u00E2mara',
    'Blurred shadows': // gui.js:2784
        'Sombras desfocadas',
    'uncheck to use solid drop\nshadows and highlights': // gui.js:2787
        'Desassinalar para usar sombras\ne realces n\u00EDtidos.',
    'check to use blurred drop\nshadows and highlights': // gui.js:2788
        'Assinalar para usar sombras\ne realces desfocados.',
    'Zebra coloring': // gui.js:2792
        'Colora\u00E7\u00E3o em zebra',
    'uncheck to disable alternating\ncolors for nested block': // gui.js:2795
        'Desassinalar para deixar de alternar\nas cores de blocos aninhados.',
    'check to enable alternating\ncolors for nested blocks': // gui.js:2796
        'Assinalar para alternar\nas cores de blocos aninhados.',
    'Dynamic input labels': // gui.js:2800
        'Etiquetas de entrada din\u00E2micas',
    'uncheck to disable dynamic\nlabels for variadic inputs': // gui.js:2803
        'Desassinalar para desactivar etiquetas\ndin\u00E2micas nas entradas vari\u00E1dicas.',
    'check to enable dynamic\nlabels for variadic inputs': // gui.js:2804
        'Assinalar para activar etiquetas\ndin\u00E2micas nas entradas vari\u00E1dicas.',
    'Prefer empty slot drops': // gui.js:2808
        'Preferir largadas em ranhuras vazias',
    'uncheck to allow dropped\nreporters to kick out others': // gui.js:2811
        'Desassinalar para permitir que\nrep\u00F3rteres largados desalojem outros.',
    'check to focus on empty slots\nwhen dragging & dropping reporters': // gui.js:2812
        'Assinalar para focar em ranhuras vazias\nquando arrastando e largando rep\u00F3rteres.',
    'Long form input dialog': // gui.js:2816
        'Forma longa da caixa de di\u00E1logo dos par\u00E2metros',
    'uncheck to use the input\ndialog in short form': // gui.js:2819
        'Desassinalar para usar a forma curta\nda caixa de di\u00E1logo dos par\u00E2metros.',
    'check to always show slot\ntypes in the input dialog': // gui.js:2820
        'Assinalar para mostrar sempre\no tipo das ranhuras na caixa\nde di\u00E1logo dos par\u00E2metros.',
    'Plain prototype labels': // gui.js:2823
        'Texto dos prot\u00F3tipos simples',
    'uncheck to always show (+) symbols\nin block prototype labels': // gui.js:2826
        'Desassinalar para mostrar sempre os s\u00EDmbolos (+)\nno texto dos prot\u00F3tipos dos blocos',
    'check to hide (+) symbols\nin block prototype labels': // gui.js:2827
        'Assinalar para esconder os s\u00EDmbolos (+)\nno texto dos prot\u00F3tipos dos blocos',
    'Virtual keyboard': // gui.js:2830
        'Teclado virtual',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices': // gui.js:2833
        'Desassinalar para desactivar o\nsuporte do teclado virtual\npara dispositivos m\u00F3veis.',
    'check to enable\nvirtual keyboard support\nfor mobile devices': // gui.js:2834
        'Assinalar para activar o\nsuporte do teclado virtual\npara dispositivos m\u00F3veis.',
    'Clicking sound': // gui.js:2838
        'Som de cliques',
    'uncheck to turn\nblock clicking\nsound off': // gui.js:2848
        'Desassinalar para desactivar o som\nproduzido ao clicar nos blocos.',
    'check to turn\nblock clicking\nsound on': // gui.js:2849
        'Assinalar para activar o som\nproduzido ao clicar nos blocos.',
    'Animations': // gui.js:2852
        'Anima\u00E7\u00F5es',
    'uncheck to disable\nIDE animations': // gui.js:2855
        'Desassinalar para desactivar\nas anima\u00E7\u00F5es do AID',
    'check to enable\nIDE animations': // gui.js:2856
        'Assinalar para activar\nas anima\u00E7\u00F5es do AID',
    'Cache Inputs': // gui.js:2860
        'Memorizar entradas',
    'uncheck to stop caching\ninputs (for debugging the evaluator)': // gui.js:2866
        'Desassinalar para parar de memorizar\nentradas (para depurar o avaliador).',
    'check to cache inputs\nboosts recursion': // gui.js:2867
        'Assinalar para memorizar as entradas\n(acelera recursividade).',
    'Rasterize SVGs': // gui.js:2871
        'Transformar SVG em mapas de bits',
    'uncheck for smooth\nscaling of vector costumes': // gui.js:2877
        undefined,
    'check to rasterize\nSVGs on import': // gui.js:2878
        'Assinalar para transformar os arquivos SVG\nem mapas de bits durante a importa\u00E7\u00E3o.',
    'Flat design': // gui.js:2882
        'Design plano',
    'uncheck for default\nGUI design': // gui.js:2890
        undefined,
    'check for alternative\nGUI design': // gui.js:2891
        'Assinalar para um design alternativo\nda interface gr\u00E1fica com o utilizador.',
    'Nested auto-wrapping': // gui.js:2895
        'Quebras de linha aninhadas',
    'uncheck to confine auto-wrapping\nto top-level block stacks': // gui.js:2906
        'desassinalar para limitar as quebras de linha\n\u00E0s pilhas de blocos do n\u00EDvel de topo',
    'check to enable auto-wrapping\ninside nested block stacks': // gui.js:2907
        'assinalar para activar as quebras de linha\nem pilhas de blocos aninhadas',
    'Project URLs': // gui.js:2911
        'URL de projecto',
    'uncheck to disable\nproject data in URLs': // gui.js:2921
        'Desassinalar para desactivar\ndados do projecto nos URL.',
    'check to enable\nproject data in URLs': // gui.js:2922
        'Assinalar para activar dados\ndo projecto nos URL.',
    'Sprite Nesting': // gui.js:2926
        'Actores compostos',
    'uncheck to disable\nsprite composition': // gui.js:2932
        'Desassinalar para desactivar\na composi\u00E7\u00E3o de actores.',
    'check to enable\nsprite composition': // gui.js:2933
        undefined,
    'First-Class Sprites': // gui.js:2937
        'Actores de primeira classe',
    'uncheck to disable support\nfor first-class sprites': // gui.js:2946
        'Desassinalar para desactivar o suporte\nde actores de primeira classe.',
    'check to enable support\nfor first-class sprite': // gui.js:2947
        'Assinalar para activar o suporte\nde actores de primeira classe.',
    'Keyboard Editing': // gui.js:2951
        'Edi\u00E7\u00E3o usando o teclado',
    'uncheck to disable\nkeyboard editing support': // gui.js:2963
        'Desassinalar para desactivar\na edi\u00E7\u00E3o usando o teclado.',
    'check to enable\nkeyboard editing support': // gui.js:2964
        'Assinalar para activar\na edi\u00E7\u00E3o usando o teclado.',
    'Table support': // gui.js:2968
        'Suporte de tabelas',
    'uncheck to disable\nmulti-column list views': // gui.js:2979
        'Desassinalar para desactivar\nvistas multicoluna de listas.',
    'check for multi-column\nlist view support': // gui.js:2980
        'Assinalar para suporte de\nvistas multicoluna de listas.',
    'Table lines': // gui.js:2985
        'Tabelas com linhas',
    'uncheck for less contrast\nmulti-column list views': // gui.js:2996
        'Desassinalar para vistas multicoluna\nde listas com menor contraste.',
    'check for higher contrast\ntable views': // gui.js:2997
        'Assinalar para vistas de\ntabela com maior contraste.',
    'Live coding support': // gui.js:3002
        'Suporte de programa\u00E7\u00E3o ao vivo',
    'EXPERIMENTAL!': // gui.js:3008 gui.js:3010 gui.js:3024 gui.js:3026
        undefined,
    'uncheck to disable live\ncustom control structures': // gui.js:3009
        undefined,
    'check to enable\nlive custom control structures': // gui.js:3011
        undefined,
    'JIT compiler support': // gui.js:3015
        undefined,
    'uncheck to disable live\nsupport for compiling': // gui.js:3025
        undefined,
    'check to enable\nsupport for compiling': // gui.js:3027
        undefined,
    'Thread safe scripts': // gui.js:3032
        'Gui\u00F5es seguros face a threads',
    'uncheck to allow\nscript reentrance': // gui.js:3035
        'Desassinar para permitir\nreentr\u00E2ncia nos gui\u00F5es.',
    'check to disallow\nscript reentrance': // gui.js:3036
        'Assinar para n\u00E3o permitir\nreentr\u00E2ncia nos gui\u00F5es.',
    'Prefer smooth animations': // gui.js:3039
        'Preferir anima\u00E7\u00F5es suaves',
    'uncheck for greater speed\nat variable frame rates': // gui.js:3042
        'Desassinalar para aumentar a velocidade\npermitindo ritmos vari\u00E1veis das tramas.',
    'check for smooth, predictable\nanimations across computers': // gui.js:3043
        'Assinalar para obter anima\u00E7\u00F5es mais suaves\ne previs\u00EDveis de computador para computador.',
    'Flat line ends': // gui.js:3047
        'Extremos das linhas planos',
    'uncheck for round ends of lines': // gui.js:3053
        'Desassinalar para que os extremos das linhas\ndesenhadas pela caneta sejam redondos.',
    'check for flat ends of lines': // gui.js:3054
        'Assinalar para que os extremos das linhas\ndesenhadas pela caneta sejam planos.',
    'Codification support': // gui.js:3057
        'Suportar produ\u00E7\u00E3o de c\u00F3digo',
    'uncheck to disable\nblock to text mapping features': // gui.js:3066
        undefined,
    'check for block\nto text mapping features': // gui.js:3067
        'Assinalar para funcionalidades\nde mapeamento entre blocos e texto.',
    'Inheritance support': // gui.js:3071
        'Suporte para heran\u00E7a',
    'uncheck to disable\nsprite inheritance features': // gui.js:3080
        'Desassinalar para desactivar\nfuncionalidades de heran\u00E7a de actores.',
    'check for sprite\ninheritance features': // gui.js:3081
        'Assinalar para activar\nfuncionalidades de heran\u00E7a de actores.',
    'Persist linked sublist IDs': // gui.js:3085
        'Persistir ID de sublistas ligadas',
    'uncheck to disable\nsaving linked sublist identities': // gui.js:3091
        'Desassinalar para desactivar o\narmazenamento das identidades de sublistas ligadas.',
    'check to enable\nsaving linked sublist identities': // gui.js:3092
        'Assinalar para activar o\narmazenamento das identidades de sublistas ligadas.',
    'Project notes': // gui.js:3107
        'Notas deste projecto',
    'New': // gui.js:3109
        'Criar um novo projecto',
    'Open': // gui.js:3110 gui.js:5924
        'Abrir',
    'Save': // gui.js:3111 gui.js:5927 gui.js:8995 gui.js:9133
        'Guardar este projecto',
    'Save As': // gui.js:3112
        'Guardar este projecto como',
    'Import': // gui.js:3115 gui.js:3370 gui.js:6842
        'Importar',
    'load an exported project file\nor block library, a costume\nor a sound': // gui.js:3146
        'Abrir um projecto exportado,\nsubstitundo o projecto corrente, ou\nimportar uma biblioteca de blocos, um\ntraje ou um som para o projecto corrente.',
    'Export project (in a new window)': // gui.js:3153
        undefined,
    'show project data as XML\nin a new browser window': // gui.js:3164
        'Mostrar os dados do projecto no\nformato XML numa nova janela do navegador.',
    'Export project as plain text': // gui.js:3170
        'Exportar este projecto como texto simples',
    'Export project': // gui.js:3171
        'Exportar este projecto',
    'save project data as XML\nto your downloads folder': // gui.js:3181
        'Guardar dados do projecto como XML\nna sua pasta de descarregamentos.',
    'show global custom block definitions as XML\nin a new browser window': // gui.js:3189
        'Mostrar as defini\u00E7\u00F5es de blocos\npersonalizados globais no formato\nXML numa nova janela do navegador.',
    'Unused blocks': // gui.js:3193
        'Blocos n\u00E3o usados',
    'find unused global custom blocks\nand remove their definitions': // gui.js:3195
        'Procurar os blocos personalizados globais\nn\u00E3o usados e remover as suas defini\u00E7\u00F5es',
    'Export summary': // gui.js:3201
        'Exportar resumo',
    'open a new browser browser window\nwith a summary of this project': // gui.js:3203
        'Abrir uma nova janela no navegador\ncontendo um resumo deste projecto',
    'Export summary with drop-shadows': // gui.js:3208
        'Exportar resumo com sombreamento',
    'open a new browser browser window\nwith a summary of this project\nwith drop-shadows on all pictures.\nnot supported by all browsers': // gui.js:3210
        'Abrir uma nova janela no navegador\ncontendo um resumo deste projecto\ncom sombreamento em todas as imagens\n(n\u00E3o suportado em todos os navegadores)',
    'Export all scripts as pic': // gui.js:3217
        'Exportar todos os gui\u00F5es como fotografia',
    'show a picture of all scripts\nand block definitions': // gui.js:3219
        'Mostra uma imagem com todos\nos gui\u00F5es e defini\u00E7\u00F5es de blocos',
    'Import tools': // gui.js:3226
        'Importar as ferramentas oficiais para este projecto',
    'load the official library of\npowerful blocks': // gui.js:3235
        'Importar para este projecto\na biblioteca oficial de blocos.',
    'Libraries': // gui.js:3238
        'Bibliotecas',
    'select categories of additional blocks to add to this project': // gui.js:3248
        undefined,
    'Select a costume from the media library': // gui.js:3259
        'Seleccionar um traje da biblioteca de m\u00E9dia.',
    'Select a sound from the media library': // gui.js:3266
        'Seleccionar um som da biblioteca de m\u00E9dia.',
    'Opening {{ resource }}': // gui.js:3341
        undefined,
    'License': // gui.js:3529 gui.js:3630
        'Licen\u00E7a',
    'Contributors': // gui.js:3548
        'Contribuidores',
    'current module versions': // gui.js:3574
        'vers\u00F5es actuais dos m\u00F3dulos',
    'Translations': // gui.js:3578
        'Tradu\u00E7\u00F5es',
    'About Snap': // gui.js:3581
        'Sobre o Snap!',
    'Translators': // gui.js:3597
        'Tradutores',
    'Back': // gui.js:3613
        'Para tr\u00E1s',
    'Modules': // gui.js:3646
        'M\u00F3dulos',
    'Credits': // gui.js:3662
        'Cr\u00E9ditos',
    'Project Notes': // gui.js:3709
        'Notas do Projecto',
    'Saving': // gui.js:3770
        undefined,
    'Saved': // gui.js:3788 gui.js:3796
        undefined,
    'Save failed': // gui.js:3790
        undefined,
    'Exporting': // gui.js:3811 gui.js:5464 gui.js:5493 gui.js:5503 gui.js:5521 gui.js:5533
        undefined,
    'Exported': // gui.js:3816 gui.js:5471 gui.js:5497 gui.js:5507 gui.js:5527 gui.js:5539
        undefined,
    'Export failed': // gui.js:3819 gui.js:5475 gui.js:5500 gui.js:5530
        undefined,
    'this project doesn\'t have any\ncustom global blocks yet': // gui.js:3836
        'Este projecto ainda n\u00E3o tem\nnenhum bloco personalizado global.',
    'there are currently no unused\nglobal custom blocks in this project': // gui.js:3873
        'de momento n\u00E3o h\u00E1 blocos personalizados\nglobais n\u00E3o usados neste projecto',
    'Untitled': // gui.js:3937 gui.js:8190 store.js:368 store.js:1651
        'Sem t\u00EDtulo',
    'Variables': // gui.js:3968 objects.js:153
        'Vari\u00E1veis',
    'Blocks': // gui.js:4000
        'Blocos',
    'Contents': // gui.js:4103
        '\u00CDndice',
    'Kind of {{ name }}': // gui.js:4132
        undefined,
    'Part of {{ name }}': // gui.js:4139
        undefined,
    'Parts': // gui.js:4144
        'Partes',
    'For all Sprites': // gui.js:4197 gui.js:4201
        'Para todos os Actores',
    'Load failed': // gui.js:4251 gui.js:4302 gui.js:4341 gui.js:4384 gui.js:4394 gui.js:4427
        undefined,
    'Opening project\n{{ size }}': // gui.js:4269
        undefined,
    'Opening blocks': // gui.js:4322
        undefined,
    'Imported Blocks Module: {{ name }}': // gui.js:4354
        undefined,
    'Opening sprite': // gui.js:4368
        undefined,
    'Imported Media Module': // gui.js:4398
        undefined,
    'Opening script': // gui.js:4406
        undefined,
    'Imported Script': // gui.js:4442
        undefined,
    'opening project\n{{ name }}': // gui.js:4448
        undefined,
    'Could not export {{ name }}': // gui.js:4519
        undefined,
    'This item could not be exported from {{ appName }}.\nIt\'s likely that your project may contain a lot of media (sounds and images) or that you are using an older browser.\nPlease try using a recent version of Chrome, Firefox, or Safari.': // gui.js:4520
        undefined,
    'entering user mode': // gui.js:4585
        undefined,
    'entering development mode.\n\nerror catching is turned off,\nuse the browser\'s web console\nto see error messages.': // gui.js:4604
        undefined,
    'Replace the current project with a new one?': // gui.js:4914
        'Substituir este projecto por um novo projecto?',
    'New Project': // gui.js:4915
        'Novo Projecto',
    'Generating {{ filename }} file': // gui.js:5011
        undefined,
    'Could not generate the language file': // gui.js:5039
        undefined,
    'build': // gui.js:5057
        'cria',
    'your own': // gui.js:5060
        'os teus pr\u00F3prios',
    'blocks': // gui.js:5064
        'blocos',
    'normal (1x)': // gui.js:5106
        'normal (1x)',
    'demo (1.2x)': // gui.js:5107
        'demonstra\u00E7\u00E3o (1.2x)',
    'presentation (1.4x)': // gui.js:5108
        'apresenta\u00E7\u00E3o (1.4x)',
    'big (2x)': // gui.js:5109
        'grande (2x)',
    'huge (4x)': // gui.js:5110
        'enorme (4x)',
    'giant (8x)': // gui.js:5111
        'gigante (8x)',
    'monstrous (10x)': // gui.js:5112
        'monstruosa (10x)',
    'Stage width': // gui.js:5166
        'Largura do palco',
    'Stage height': // gui.js:5167
        'Altura do palco',
    '{{ count }} days left': // gui.js:5253
        undefined,
    'You are now logged in, and your account\nis enabled for three days.\nPlease use the verification link that\nwas sent to your email address when you\nsigned up.\n\nIf you cannot find that email, please\ncheck your spam folder. If you still\ncannot find it, please use the "Resend\nVerification Email..." option in the cloud\nmenu.\n\nYou have {{ count }} days left.': // gui.js:5254
        undefined,
    'Sign in': // gui.js:5277
        'Entrar',
    'stay signed in on this computer\nuntil logging out': // gui.js:5283
        'manter-me autenticado neste\ncomputador at\u00E9 que saia',
    'You can now log in': // gui.js:5305
        undefined,
    'Sign up': // gui.js:5314
        'Registar nova conta',
    'Terms of Service': // gui.js:5317
        'Termos do Servi\u00E7o',
    'Privacy': // gui.js:5319
        'Privacidade',
    'I have read and agree\nto the Terms of Service': // gui.js:5320
        'Li e declaro concordar\ncom os Termos do Servi\u00E7o',
    'An e-mail with a link to\nreset your password\nhas been sent to the address provided': // gui.js:5340
        undefined,
    'Reset password': // gui.js:5352
        'Recuperar palavra-passe',
    'An e-mail with a link to\nverify your account\nhas been sent to the address provided': // gui.js:5378
        undefined,
    'Resend verification email': // gui.js:5390
        undefined,
    'password has been changed': // gui.js:5414
        undefined,
    'disconnected': // gui.js:5437 gui.js:5440
        undefined,
    'Saving project\nto the cloud': // gui.js:5448 gui.js:6476
        'Guardando o projecto\nna nuvem',
    'saved': // gui.js:5452 gui.js:6481
        undefined,
    '{{ projectName }} media': // gui.js:5468
        undefined,
    'Cloud Connection': // gui.js:5552
        undefined,
    'Successfully connected to\n{{ url }}': // gui.js:5553
        undefined,
    '{{ server }} (secure)': // gui.js:5646
        undefined,
    'Save Project': // gui.js:5799
        'Guardar Projecto',
    'Open Project': // gui.js:5800
        'Abrir Projecto',
    'Cloud': // gui.js:5836
        'Nuvem',
    'Browser': // gui.js:5837
        'Navegador',
    'Examples': // gui.js:5840 gui.js:6198 gui.js:6254 gui.js:6378
        'Exemplos',
    'Share': // gui.js:5930
        'Partilhar',
    'Unshare': // gui.js:5931
        'N\u00E3o Partilhar',
    '(no matches)': // gui.js:6095
        undefined,
    'Updating\nproject list': // gui.js:6119
        'Actualizando a\nlista de projectos',
    'last changed\n{{ date }}': // gui.js:6314
        undefined,
    'Are you sure you want to replace\n"{{ projectName }}"?': // gui.js:6436 gui.js:6454
        undefined,
    'Replace Project': // gui.js:6438 gui.js:6456
        undefined,
    'Are you sure you want to delete\n"{{ projectName }}"?': // gui.js:6498 gui.js:6522
        undefined,
    'Delete Project': // gui.js:6500 gui.js:6524
        'Remover Projecto',
    'Are you sure you want to share\n"{{ projectName }}"?': // gui.js:6542
        undefined,
    'Share Project': // gui.js:6544
        'Partilhar Projecto',
    'sharing\nproject': // gui.js:6546
        'partilhando\nprojecto',
    'shared': // gui.js:6563
        undefined,
    'Are you sure you want to unshare\n"{{ projectName }}"?': // gui.js:6590
        undefined,
    'Unshare Project': // gui.js:6592
        'Deixar de Partilhar Projecto',
    'unsharing\nproject': // gui.js:6594
        'deixando de partilhar\nprojecto',
    'unshared': // gui.js:6612
        undefined,
    'Are you sure you want to publish\n"{{ projectName }}"?': // gui.js:6632
        undefined,
    'Publish Project': // gui.js:6634
        undefined,
    'publishing\nproject': // gui.js:6636
        undefined,
    'published': // gui.js:6651
        undefined,
    'Are you sure you want to unpublish\n"{{ projectName }}"?': // gui.js:6677
        undefined,
    'Unpublish Project': // gui.js:6679
        undefined,
    'unpublishing\nproject': // gui.js:6681
        undefined,
    'unpublished': // gui.js:6696
        undefined,
    'Import library': // gui.js:6828
        'Importar biblioteca',
    'Loading {{ resource }}': // gui.js:6926 gui.js:7059
        undefined,
    'Imported {{ resource }}': // gui.js:7054
        undefined,
    'pic': // gui.js:7353 morphic.js:4194 objects.js:7425
        'fotografia',
    'open a new window\nwith a picture of the stage': // gui.js:7361 objects.js:7432
        'Abrir uma nova janela com\numa fotografia do palco.',
    'show': // gui.js:7366 morphic.js:7568 objects.js:388
        'mostra-te',
    'clone': // gui.js:7370 objects.js:3238
        'clonar',
    'release': // gui.js:7388
        'tornar clone tempor\u00E1rio',
    'make temporary and\nhide in the sprite corral': // gui.js:7390
        'tornar tempor\u00E1rio e\nesconder da lista de actores',
    'detach from {{ name }}': // gui.js:7396 objects.js:3266
        undefined,
    'detach all parts': // gui.js:7402 objects.js:3271
        'soltar todas as partes',
    'export': // gui.js:7406 gui.js:7713 objects.js:3273 objects.js:9542
        'exportar',
    'edit rotation point only': // gui.js:7702
        'editar apenas ponto de rota\u00E7\u00E3o',
    'rename costume': // gui.js:7755
        'Qual o novo nome do traje?',
    'rename background': // gui.js:7756
        undefined,
    'default': // gui.js:7893
        undefined,
    'pen': // gui.js:7975 morphic.js:12402
        'caneta',
    'tip': // gui.js:7982
        'ponta',
    'middle': // gui.js:7991
        'meio',
    'Paint a new costume': // gui.js:8085
        'Pintar um novo traje.',
    'Import a new costume from your webcam': // gui.js:8110
        undefined,
    'import a picture from another web page or from\na file on your computer by dropping it here': // gui.js:8134
        'Importa uma imagem de uma p\u00E1gina Web ou de um\narquivo no teu computador arrastando-a para aqui',
    'Stop': // gui.js:8345 gui.js:8367
        'Parar',
    'Play': // gui.js:8345 gui.js:8375
        'Tocar',
    'Play sound': // gui.js:8348 gui.js:8376
        'Tocar som.',
    'Stop sound': // gui.js:8368
        'Parar som.',
    'rename sound': // gui.js:8432
        'Qual o novo nome do som?',
    'import a sound from your computer\nby dragging it into here': // gui.js:8526
        'Importa um som do teu computador\narrastando-o para aqui',
    'Record a new sound': // gui.js:8549
        undefined,
    'Please make sure your web browser is up to date\nand your camera is properly configured.\n\nSome browsers also require you to access {{ appName }}\nthrough HTTPS to use the camera.\n\nPlease replace the "http://" part of the address\nin your browser by "https://" and try again.': // gui.js:8874
        undefined,
    'Camera': // gui.js:8905
        undefined,
    'Camera not supported': // gui.js:8917
        undefined,
    'Sound Recorder': // gui.js:9067
        undefined,
    'a {{ className }} [{{ count }} elements]': // lists.js:123
        undefined,
    'cdr isn\'t a list': // lists.js:143
        undefined,
    'items': // lists.js:264
        'itens',
    'length': // lists.js:492 lists.js:703
        'comprimento',
    'table view': // lists.js:807
        'vista de tabela',
    'open in dialog': // lists.js:810 tables.js:1036
        'abrir em caixa de di\u00E1logo',
    'Retina Display Support Problem': // morphic.js:1614
        undefined,
    'Called {{ function }} with {{ count }} arguments': // morphic.js:1676
        undefined,
    'a {{ className }}[{{ count }}]': // morphic.js:2681
        undefined,
    'a {{ className }} {{ count }} {{ bounds }}': // morphic.js:2904
        undefined,
    'user features': // morphic.js:4128
        undefined,
    'choose another color\nfor this morph': // morphic.js:4141
        undefined,
    'transparency': // morphic.js:4144
        undefined,
    'alpha value': // morphic.js:4147
        undefined,
    'set this morph\'s\nalpha value': // morphic.js:4157
        undefined,
    'resize': // morphic.js:4160
        undefined,
    'show a handle\nwhich can be dragged\nto change this morph\'s extent': // morphic.js:4162
        undefined,
    'pick up': // morphic.js:4174
        undefined,
    'detach and put\ninto the hand': // morphic.js:4176
        undefined,
    'attach': // morphic.js:4179
        undefined,
    'stick this morph\nto another one': // morphic.js:4181
        undefined,
    'move': // morphic.js:4184 objects.js:3243
        'mover',
    'show a handle\nwhich can be dragged\nto move this morph': // morphic.js:4186
        undefined,
    'inspect': // morphic.js:4189 morphic.js:7608 morphic.js:12183
        undefined,
    'open a window\non all properties': // morphic.js:4191
        undefined,
    'open a new window\nwith a picture of this morph': // morphic.js:4198 morphic.js:12192
        undefined,
    'lock': // morphic.js:4203
        undefined,
    'make this morph\nunmovable': // morphic.js:4205
        undefined,
    'unlock': // morphic.js:4209
        undefined,
    'make this morph\nmovable': // morphic.js:4211
        undefined,
    'World': // morphic.js:4219
        undefined,
    'show the\n{{ WorldMorph }}\'s menu': // morphic.js:4223
        undefined,
    'choose target': // morphic.js:4721 morphic.js:5102 morphic.js:6562 morphic.js:7200
        undefined,
    'set rotation': // morphic.js:4868
        undefined,
    'interactively turn this morph\nusing a dial widget': // morphic.js:4870
        undefined,
    'set target': // morphic.js:5092 morphic.js:6552 morphic.js:7118
        undefined,
    'choose another morph\nwhose color property\nwill be controlled by this one': // morphic.js:5094
        undefined,
    'choose target property': // morphic.js:5122 morphic.js:6582 morphic.js:7220
        undefined,
    'border width': // morphic.js:5895 morphic.js:5898
        undefined,
    'set the border\'s\nline size': // morphic.js:5908
        undefined,
    'border color': // morphic.js:5911 morphic.js:5914
        undefined,
    'set the border\'s\nline color': // morphic.js:5920
        undefined,
    'corner size': // morphic.js:5923 morphic.js:5926
        undefined,
    'set the corner\'s\nradius': // morphic.js:5936
        undefined,
    'select another morph\nwhose numerical property\nwill be controlled by this one': // morphic.js:6554 morphic.js:7120
        undefined,
    'horizontal': // morphic.js:6701
        undefined,
    'toggle the\norientation': // morphic.js:6703 morphic.js:6709
        undefined,
    'vertical': // morphic.js:6707
        undefined,
    'show value': // morphic.js:7064
        undefined,
    'display a dialog box\nshowing the selected number': // morphic.js:7066
        undefined,
    'set the minimum value\nwhich can be selected': // morphic.js:7082
        undefined,
    'set the maximum value\nwhich can be selected': // morphic.js:7098
        undefined,
    'button size': // morphic.js:7101 morphic.js:7104
        undefined,
    'set the range\ncovered by\nthe slider button': // morphic.js:7114
        undefined,
    'un-mark own': // morphic.js:7595
        undefined,
    'mark own': // morphic.js:7595
        undefined,
    'highlight\n\'own\' properties': // morphic.js:7600
        undefined,
    'in new inspector': // morphic.js:7614
        undefined,
    'here': // morphic.js:7627
        undefined,
    '{{ name }}\nis not inspectable': // morphic.js:7635
        undefined,
    'save': // morphic.js:7653
        undefined,
    'accept changes': // morphic.js:7653
        undefined,
    'add property': // morphic.js:7655
        undefined,
    'remove': // morphic.js:7657
        undefined,
    'close': // morphic.js:7664 morphic.js:7948
        undefined,
    'new property name': // morphic.js:7789
        undefined,
    'property': // morphic.js:7802
        undefined,
    'property name': // morphic.js:7810
        undefined,
    'font size': // morphic.js:8732 morphic.js:8735 morphic.js:9479 morphic.js:9482
        undefined,
    'set this String\'s\nfont point size': // morphic.js:8745
        undefined,
    'serif': // morphic.js:8748 morphic.js:9505
        undefined,
    'sans-serif': // morphic.js:8751 morphic.js:9508
        undefined,
    'normal weight': // morphic.js:8754 morphic.js:9511
        undefined,
    'bold': // morphic.js:8756 morphic.js:9513
        undefined,
    'normal style': // morphic.js:8759 morphic.js:9516
        undefined,
    'italic': // morphic.js:8761 morphic.js:9518
        undefined,
    'hide blanks': // morphic.js:8764
        undefined,
    'show blanks': // morphic.js:8766
        undefined,
    'show characters': // morphic.js:8769
        undefined,
    'hide characters': // morphic.js:8771
        undefined,
    'set this Text\'s\nfont point size': // morphic.js:9492
        undefined,
    'align left': // morphic.js:9495
        undefined,
    'align right': // morphic.js:9498
        undefined,
    'align center': // morphic.js:9501
        undefined,
    'do it': // morphic.js:9563
        undefined,
    'evaluate the\nselected expression': // morphic.js:9565
        undefined,
    'show it': // morphic.js:9568
        undefined,
    'evaluate the\nselected expression\nand show the result': // morphic.js:9570
        undefined,
    'inspect it': // morphic.js:9573
        undefined,
    'evaluate the\nselected expression\nand inspect the result': // morphic.js:9575
        undefined,
    'select all': // morphic.js:9578
        undefined,
    'move all inside': // morphic.js:10303 morphic.js:12178
        undefined,
    'keep all submorphs\nwithin and visible': // morphic.js:10305 morphic.js:12180
        undefined,
    'auto line wrap off': // morphic.js:10685
        undefined,
    'turn automatic\nline wrapping\noff': // morphic.js:10687
        undefined,
    'auto line wrap on': // morphic.js:10691
        undefined,
    'enable automatic\nline wrapping': // morphic.js:10693
        undefined,
    '(empty)': // morphic.js:10781
        '(nada)',
    'Are you sure you want to leave?': // morphic.js:12110
        undefined,
    'demo': // morphic.js:12173
        undefined,
    'sample morphs': // morphic.js:12173
        undefined,
    'hide all': // morphic.js:12175
        undefined,
    'show all': // morphic.js:12176 objects.js:7423
        'mostrar todos os actores',
    'open a window on\nall properties': // morphic.js:12185
        undefined,
    'screenshot': // morphic.js:12188 objects.js:413
        undefined,
    'restore display': // morphic.js:12196
        undefined,
    'redraw the\nscreen once': // morphic.js:12198
        undefined,
    'fill page': // morphic.js:12201
        undefined,
    'let the World automatically\nadjust to browser resizing': // morphic.js:12203
        undefined,
    'sharp shadows': // morphic.js:12207
        undefined,
    'sharp drop shadows\nuse for old browsers': // morphic.js:12209
        undefined,
    'blurred shadows': // morphic.js:12213
        undefined,
    'blurry shades\nuse for new browsers': // morphic.js:12215
        undefined,
    'choose the World\'s\nbackground color': // morphic.js:12228
        undefined,
    'touch screen settings': // morphic.js:12232
        undefined,
    'bigger menu fonts\nand sliders': // morphic.js:12234
        undefined,
    'standard settings': // morphic.js:12238
        undefined,
    'smaller menu fonts\nand sliders': // morphic.js:12240
        undefined,
    'user mode': // morphic.js:12247
        undefined,
    'disable developers\'\ncontext menus': // morphic.js:12249
        undefined,
    'about {{ resource }}': // morphic.js:12254
        undefined,
    'make a morph': // morphic.js:12266
        undefined,
    'rectangle': // morphic.js:12267 symbols.js:109
        'rect\u00E2ngulo',
    'box': // morphic.js:12270
        undefined,
    'circle box': // morphic.js:12273
        undefined,
    'slider': // morphic.js:12277 objects.js:9461
        'potenci\u00F3metro',
    'dial': // morphic.js:12280
        undefined,
    'frame': // morphic.js:12284
        undefined,
    'scroll frame': // morphic.js:12289
        undefined,
    'handle': // morphic.js:12296
        undefined,
    'string': // morphic.js:12300
        undefined,
    'Hello, World!': // morphic.js:12301 morphic.js:12329
        undefined,
    'speech bubble': // morphic.js:12328
        undefined,
    'gray scale palette': // morphic.js:12333
        undefined,
    'color palette': // morphic.js:12336
        undefined,
    'color picker': // morphic.js:12339
        undefined,
    'sensor demo': // morphic.js:12343
        undefined,
    'animation demo': // morphic.js:12353
        undefined,
    'modules': // morphic.js:12444
        undefined,
    'a lively Web GUI\ninspired by Squeak': // morphic.js:12451
        undefined,
    'written by {{ author }}\n{{ email }}': // morphic.js:12453
        undefined,
    'Motion': // objects.js:146
        'Movimento',
    'Control': // objects.js:147
        'Controlo',
    'Looks': // objects.js:148
        'Apar\u00EAncia',
    'Sensing': // objects.js:149
        'Sensores',
    'Sound': // objects.js:150 objects.js:8570
        'Som',
    'Operators': // objects.js:151
        'Operadores',
    'Pen': // objects.js:152
        'Caneta',
    'Lists': // objects.js:154
        'Listas',
    'Other': // objects.js:155
        'Outros',
    'move %n steps': // objects.js:201
        'anda %n passos',
    'turn %clockwise %n degrees': // objects.js:208
        'gira %clockwise %n \u00B0',
    'turn %counterclockwise %n degrees': // objects.js:215
        'gira %counterclockwise %n \u00B0',
    'point in direction %dir': // objects.js:222
        'altera a tua direc\u00E7\u00E3o para %dir \u00B0',
    'point towards %dst': // objects.js:228
        'aponta em direc\u00E7\u00E3o a %dst',
    'go to x: %n y: %n': // objects.js:234
        'vai para as coordenadas (x: %n , y: %n )',
    'go to %dst': // objects.js:241
        'vai para a posi\u00E7\u00E3o de %dst',
    'glide %n secs to x: %n y: %n': // objects.js:247
        'desliza em %n s para as coordenadas (x: %n , y: %n )',
    'change x by %n': // objects.js:254
        'adiciona %n \u00E0 tua coordenada x',
    'set x to %n': // objects.js:261
        'altera a tua coordenada x para %n',
    'change y by %n': // objects.js:268
        'adiciona %n \u00E0 tua coordenada y',
    'set y to %n': // objects.js:275
        'altera a tua coordenada y para %n',
    'if on edge, bounce': // objects.js:282
        'se estiveres a bater na borda, ressalta',
    'switch to costume %cst': // objects.js:307
        'muda o traje para %cst',
    'next costume': // objects.js:312
        'passa para o pr\u00F3ximo traje',
    'say %s for %n secs': // objects.js:323
        'diz %s durante %n s',
    'Hello!': // objects.js:324 objects.js:331
        'Ol\u00E1!',
    'say %s': // objects.js:330
        'diz %s',
    'think %s for %n secs': // objects.js:337
        'pensa %s durante %n s',
    'Hmm': // objects.js:338 objects.js:345
        'Hmm',
    'think %s': // objects.js:344
        'pensa %s',
    'change %eff effect by %n': // objects.js:350
        'adiciona ao efeito %eff o valor %n',
    'set %eff effect to %n': // objects.js:356
        'altera o teu efeito %eff para %n',
    'clear graphic effects': // objects.js:362
        'limpa os efeitos gr\u00E1ficos',
    'change size by %n': // objects.js:368
        'adiciona %n % ao teu tamanho',
    'set size to %n %': // objects.js:375
        'altera o teu tamanho para %n %',
    'go to front': // objects.js:400
        'vem para a frente',
    'go back %n layers': // objects.js:406
        'recua %n camadas',
    'save %imgsource as costume named %s': // objects.js:412
        undefined,
    'wardrobe': // objects.js:421
        undefined,
    'alert %mult%s': // objects.js:428
        'mostra janela de alerta com %mult%s',
    'console log %mult%s': // objects.js:434
        'regista %mult%s na consola',
    'play sound %snd': // objects.js:441
        'toca o som %snd',
    'play sound %snd until done': // objects.js:446
        'toca o som %snd at\u00E9 terminar',
    'stop all sounds': // objects.js:451
        'p\u00E1ra todos os sons',
    'rest for %n beats': // objects.js:456
        'faz uma pausa de %n tempos',
    'play note %note for %n beats': // objects.js:462
        'toca a nota %note durante %n tempos',
    'set instrument to %inst': // objects.js:468
        'altera o teu instrumento para %inst',
    'change tempo by %n': // objects.js:474
        'adiciona %n bpm ao teu andamento',
    'set tempo to %n bpm': // objects.js:480
        'altera o teu andamento para %n bpm',
    'tempo': // objects.js:486
        'o andamento',
    'jukebox': // objects.js:494
        undefined,
    'clear': // objects.js:501 paint.js:230
        'apaga tudo do palco',
    'pen down': // objects.js:507
        'baixa a tua caneta',
    'pen up': // objects.js:513
        'levanta a tua caneta',
    'set pen color to %clr': // objects.js:519
        'altera a cor da tua caneta para %clr',
    'change pen color by %n': // objects.js:525
        'adiciona %n \u00E0 cor da tua caneta',
    'set pen color to %n': // objects.js:532
        'altera a cor da tua caneta para %n',
    'change pen shade by %n': // objects.js:539
        'adiciona %n ao tom da tua caneta',
    'set pen shade to %n': // objects.js:546
        'altera o tom da tua caneta para %n',
    'change pen size by %n': // objects.js:553
        'adiciona %n \u00E0 espessura da tua caneta',
    'set pen size to %n': // objects.js:560
        'altera a espessura da tua caneta para %n',
    'stamp': // objects.js:567
        'carimba-te',
    'fill': // objects.js:573
        'enche o palco',
    'when %greenflag clicked': // objects.js:585
        'Quando algu\u00E9m clicar em %greenflag',
    'when %keyHat key pressed': // objects.js:590
        'Quando algu\u00E9m pressionar a tecla %keyHat',
    'when I am %interaction': // objects.js:595
        'Quando o rato %interaction',
    'when I receive %msgHat': // objects.js:601
        'Quando receberes a mensagem %msgHat',
    'when %b': // objects.js:606
        'Quando %b',
    'broadcast %msg': // objects.js:611
        'difunde a mensagem %msg',
    'broadcast %msg and wait': // objects.js:616
        'difunde a mensagem %msg e espera',
    'message': // objects.js:621
        'a mensagem',
    'wait %n secs': // objects.js:626
        'espera %n s',
    'wait until %b': // objects.js:632
        'espera at\u00E9 que %b',
    'forever %c': // objects.js:637
        'repete %c para sempre',
    'repeat %n %c': // objects.js:642
        'repete %n vezes %c',
    'repeat until %b %c': // objects.js:648
        'at\u00E9 que %b , repete %c',
    'if %b %c': // objects.js:653
        'se %b , ent\u00E3o %c',
    'if %b %c else %c': // objects.js:658
        'se %b , ent\u00E3o %c sen\u00E3o, %c',
    'stop %stopChoices': // objects.js:678
        'p\u00E1ra %stopChoices',
    'run %cmdRing %inputs': // objects.js:693
        'executa %cmdRing %inputs',
    'launch %cmdRing %inputs': // objects.js:698
        'lan\u00E7a execu\u00E7\u00E3o de %cmdRing %inputs',
    'call %repRing %inputs': // objects.js:703
        'o resultado da invoca\u00E7\u00E3o de %repRing %inputs',
    'report %s': // objects.js:708
        'reporta %s',
    'run %cmdRing w/continuation': // objects.js:720
        'executa %cmdRing com continua\u00E7\u00E3o',
    'call %cmdRing w/continuation': // objects.js:725
        'o resultado da invoca\u00E7\u00E3o de %cmdRing com continua\u00E7\u00E3o',
    'warp %c': // objects.js:730
        'executa atomicamente %c',
    'tell %spr to %cmdRing %inputs': // objects.js:739
        'diz a %spr para executar %cmdRing %inputs',
    'ask %spr for %repRing %inputs': // objects.js:744
        'o resultado de %spr invocar %repRing %inputs',
    'when I start as a clone': // objects.js:752
        'Quando fores criado como clone',
    'create a clone of %cln': // objects.js:757
        'cria um novo clone de %cln',
    'a new clone of %cln': // objects.js:762
        'um novo clone de %cln',
    'delete this clone': // objects.js:768
        'remove-te',
    'pause all %pause': // objects.js:776
        'faz pausa em tudo %pause',
    'touching %col ?': // objects.js:785
        'est\u00E1s a tocar em %col',
    'touching %clr ?': // objects.js:791
        'est\u00E1s a tocar na cor %clr',
    'color %clr is touching %clr ?': // objects.js:797
        'a cor %clr est\u00E1 a tocar na cor %clr',
    'filtered for %clr': // objects.js:803
        'filtrado para %clr',
    'stack size': // objects.js:809
        'altura da pilha',
    'frames': // objects.js:815
        'molduras',
    'processes': // objects.js:821
        undefined,
    'ask %s and wait': // objects.js:826
        'pergunta %s e espera pela resposta',
    'what\'s your name?': // objects.js:827
        'Como te chamas?',
    'answer': // objects.js:833 objects.js:838
        'a resposta dada',
    'mouse x': // objects.js:843
        'a coordenada x do rato',
    'mouse y': // objects.js:848
        'a coordenada y do rato',
    'mouse down?': // objects.js:853
        'o bot\u00E3o do rato est\u00E1 pressionado',
    'key %key pressed?': // objects.js:858
        'a tecla %key est\u00E1 a ser pressionada',
    '%rel to %dst': // objects.js:871
        undefined,
    'reset timer': // objects.js:877
        'reinicia o cron\u00F3metro',
    'timer': // objects.js:883 objects.js:888
        'o valor do cron\u00F3metro',
    '%att of %spr': // objects.js:893
        '%att de %spr',
    'url %s': // objects.js:899
        'o recurso http:// %s',
    'turbo mode?': // objects.js:905
        'o modo turbo est\u00E1 activo',
    'set turbo mode to %b': // objects.js:910
        'alterar o modo turbo para %b',
    'current %dates': // objects.js:915
        '%dates corrente',
    'my %get': // objects.js:920
        '%get',
    'round %n': // objects.js:968
        'o arredondamento de %n',
    '%fun of %n': // objects.js:973
        '%fun de %n',
    '%n mod %n': // objects.js:979
        'o resto de %n a dividir por %n',
    'pick random %n to %n': // objects.js:984
        'um valor ao acaso entre %n e %n',
    '%b and %b': // objects.js:1005
        '%b e %b',
    '%b or %b': // objects.js:1010
        '%b ou %b',
    'not %b': // objects.js:1015
        '\u00E9 falso que %b',
    'join %words': // objects.js:1033
        'a jun\u00E7\u00E3o de %words',
    'hello': // objects.js:1034 objects.js:1075
        'Ol\u00E1',
    'world': // objects.js:1034 objects.js:1040 objects.js:1046 objects.js:1075
        'mundo!',
    'letter %n of %s': // objects.js:1039
        'o caractere %n de %s',
    'length of %s': // objects.js:1045
        'o comprimento de %s',
    'unicode of %s': // objects.js:1051
        'o c\u00F3digo Unicode do caractere %s',
    'unicode %n as letter': // objects.js:1057
        'o caractere cujo c\u00F3digo Unicode \u00E9 %n',
    'is %s a %typ ?': // objects.js:1063
        '%s \u00E9 um/uma %typ',
    'is %s identical to %s ?': // objects.js:1069
        '%s \u00E9 id\u00EAntico a %s',
    'split %s by %delim': // objects.js:1074
        'uma lista com os tro\u00E7os de %s entre %delim',
    'JavaScript function ( %mult%s ) { %code }': // objects.js:1080
        'fun\u00E7\u00E3o JavaScript ( %mult%s ) { %code }',
    'type of %s': // objects.js:1086
        'o tipo de %s',
    '%txtfun of %s': // objects.js:1093
        undefined,
    'compile %repRing': // objects.js:1099
        undefined,
    'set %var to %s': // objects.js:1119
        'altera %var para %s',
    'change %var by %n': // objects.js:1125
        'adiciona a %var o valor %n',
    'show variable %var': // objects.js:1131
        'mostra a vari\u00E1vel %var',
    'hide variable %var': // objects.js:1136
        'esconde a vari\u00E1vel %var',
    'script variables %scriptVars': // objects.js:1141
        'cria as vari\u00E1veis de gui\u00E3o %scriptVars',
    'inherit %shd': // objects.js:1148
        'herda %shd do teu progenitor',
    'list %exp': // objects.js:1155
        'uma lista com %exp',
    '%s in front of %l': // objects.js:1160
        'a prefixa\u00E7\u00E3o de %s a %l',
    'item %idx of %l': // objects.js:1165
        '%idx de %l',
    'all but first of %l': // objects.js:1171
        'uma lista com os itens de %l menos o primeiro',
    'length of %l': // objects.js:1176
        'o comprimento de %l',
    '%l contains %s': // objects.js:1181
        '%l cont\u00E9m %s',
    'thing': // objects.js:1182 objects.js:1188 objects.js:1200 objects.js:1206
        'um valor',
    'add %s to %l': // objects.js:1187
        'acrescenta %s a %l',
    'delete %ida of %l': // objects.js:1193
        'remove %ida de %l',
    'insert %s at %idx of %l': // objects.js:1199
        'insere %s como %idx de %l',
    'replace item %idx of %l with %s': // objects.js:1205
        'substitui %idx de %l por %s',
    'map %repRing over %l': // objects.js:1214
        undefined,
    'for %upvar in %l %cl': // objects.js:1220
        undefined,
    'each item': // objects.js:1221
        undefined,
    'show table %l': // objects.js:1230
        undefined,
    'map %cmdRing to %codeKind %code': // objects.js:1237
        'mapear %cmdRing no %codeKind %code',
    'map %mapValue to code %code': // objects.js:1242
        'mapear %mapValue no c\u00F3digo %code',
    'map %codeListPart of %codeListKind to code %code': // objects.js:1256
        'mapear %codeListPart de %codeListKind no c\u00F3digo %code',
    'code of %cmdRing': // objects.js:1261
        'o c\u00F3digo de %cmdRing',
    'Sprite': // objects.js:1404
        'o actor',
    'that name is already in use': // objects.js:1859 objects.js:7047
        undefined,
    'development mode\ndebugging primitives': // objects.js:1932 objects.js:2089 objects.js:2155 objects.js:2268 objects.js:7085 objects.js:7214 objects.js:7280 objects.js:7376
        'primitivas de depura\u00E7\u00E3o\ndo modo de desenvolvimento',
    'Make a variable': // objects.js:2184 objects.js:7309
        'Criar uma vari\u00E1vel',
    'Delete a variable': // objects.js:2205 objects.js:7327
        'Remover uma vari\u00E1vel',
    'find blocks': // objects.js:2398 objects.js:2469
        'procurar blocos',
    'hide primitives': // objects.js:2476
        'esconder blocos primitivos',
    'show primitives': // objects.js:2494
        'mostrar blocos primitivos',
    'rotate': // objects.js:3244
        undefined,
    'pivot': // objects.js:3247
        'editar centro de rota\u00E7\u00E3o',
    'edit the costume\'s\nrotation center': // objects.js:3249
        'Drehpunkt des Kost\u00FCms\nanzeigen und verschieben',
    'make permanent and\nshow in the sprite corral': // objects.js:3257
        undefined,
    'exceeding maximum number of clones': // objects.js:3355
        undefined,
    'Costume': // objects.js:4338
        undefined,
    'setting the rotation center requires a costume': // objects.js:4679
        undefined,
    'current parent': // objects.js:5420
        'progenitor actual',
    'Stage': // objects.js:6315
        'o palco',
    'stop': // objects.js:6770 costumes/COSTUMES:486
        undefined,
    'terminate all running threads': // objects.js:6774
        undefined,
    'Stage selected:\nno motion primitives': // objects.js:7060
        'Palco seleccionado:\nsem primitivas de movimento',
    'turn all pen trails and stamps\ninto a new costume for the\ncurrently selected sprite': // objects.js:7445
        'Transforma todos os tra\u00E7os da caneta\ne carimbagens num novo traje\ndo actor seleccionado neste momento',
    'turn all pen trails and stamps\ninto a new background for the stage': // objects.js:7447
        undefined,
    'Background': // objects.js:7817
        undefined,
    'a {{ className }}({{ name }})': // objects.js:8096
        undefined,
    'click or drag crosshairs to move the rotation center': // objects.js:8296
        'Clique ou arraste a mira para alterar o centro de rota\u00E7\u00E3o.',
    'Costume Editor': // objects.js:8308
        'Editor de Trajes',
    'an {{ className }}({{ name }})': // objects.js:8395
        undefined,
    'Web Audio API is not supported\nin this browser': // objects.js:8629
        undefined,
    'normal': // objects.js:9452
        'normal',
    'large': // objects.js:9456
        'grande',
    'slider min': // objects.js:9466
        'm\u00EDnimo do potenci\u00F3metro',
    'slider max': // objects.js:9470
        'm\u00E1ximo do potenci\u00F3metro',
    'import': // objects.js:9475
        'importar',
    'Unable to import': // objects.js:9501
        undefined,
    '{{ appName }} can only import "text" files.\nYou selected a file of type "{{ type }}".': // objects.js:9502
        undefined,
    'Slider minimum value': // objects.js:9588
        'Valor m\u00EDnimo do potenci\u00F3metro',
    'Slider maximum value': // objects.js:9604
        'Valor m\u00E1ximo do potenci\u00F3metro',
    'Paint Editor': // paint.js:111
        'Editor de Pintura',
    'Paintbrush tool\n(free draw)': // paint.js:172
        'Pincel\n(desenho livre)',
    'Stroked Rectangle\n(shift: square)': // paint.js:174
        'Rect\u00E2ngulo\n(shift: quadrado)',
    'Stroked Ellipse\n(shift: circle)': // paint.js:176
        'Elipse\n(shift: circunfer\u00EAncia)',
    'Eraser tool': // paint.js:178
        'Borracha',
    'Set the rotation center': // paint.js:180
        'Estabelecer centro de rota\u00E7\u00E3o',
    'Line tool\n(shift: vertical/horizontal)': // paint.js:183
        'Segmento de recta\n(shift: vertical/horizontal)',
    'Filled Rectangle\n(shift: square)': // paint.js:185
        'Rect\u00E2ngulo preenchido\n(shift: quadrado)',
    'Filled Ellipse\n(shift: circle)': // paint.js:187
        'Elipse preenchida\n(shift: c\u00EDrculo)',
    'Fill a region': // paint.js:189
        'Balde de tinta',
    'Pipette tool\n(pick a color anywhere)': // paint.js:191
        'Pipeta\n(recolher uma cor em qualquer lado)',
    'undo': // paint.js:225
        'desfazer',
    'grow': // paint.js:239
        'aumentar',
    'shrink': // paint.js:243
        'reduzir',
    'flip \u2194': // paint.js:247
        'inverter \u2194',
    'flip \u2195': // paint.js:251
        'inverter \u2195',
    'Constrain proportions of shapes?\n(you can also hold shift)': // paint.js:407
        'Preservar propor\u00E7\u00F5es das formas?\n(tamb\u00E9m pode pressionar shift)',
    'Brush size': // paint.js:413
        'Espessura do pincel',
    'loading should be implemented in heir of XML_Serializer': // store.js:235
        undefined,
    '{{ appName }} Project': // store.js:328
        undefined,
    'This project has been created by a different app:\n\n{{ appName }}\n\nand may be incompatible or fail to load here.': // store.js:329
        undefined,
    'Project uses newer version of Serializer': // store.js:351
        undefined,
    'Module uses newer version of Serializer': // store.js:630 store.js:662 store.js:743
        undefined,
    'expecting a command but getting a reporter': // store.js:1076
        undefined,
    'Obsolete!': // store.js:1198
        undefined,
    'expecting a reference id': // store.js:1282
        undefined,
    'square': // symbols.js:85
        'quadrado',
    'pointRight': // symbols.js:86
        'tri\u00E2ngulo para a direita',
    'stepForward': // symbols.js:87
        undefined,
    'gears': // symbols.js:88
        'roda dentada',
    'file': // symbols.js:89
        'arquivo',
    'fullScreen': // symbols.js:90
        'ecr\u00E3 inteiro',
    'normalScreen': // symbols.js:91
        'ecr\u00E3 normal',
    'smallStage': // symbols.js:92
        'palco pequeno',
    'normalStage': // symbols.js:93
        'palco normal',
    'turtle': // symbols.js:94
        'tartaruga',
    'turtleOutline': // symbols.js:96
        'contorno de tartaruga',
    'pause': // symbols.js:97
        'pausa',
    'flag': // symbols.js:98
        'bandeira',
    'octagon': // symbols.js:99
        'oct\u00F3gono',
    'cloud': // symbols.js:100 costumes/COSTUMES:170
        'nuvem',
    'cloudOutline': // symbols.js:101
        'contorno de nuvem',
    'cloudGradient': // symbols.js:102
        'nuvem com gradiente',
    'turnRight': // symbols.js:103
        'girar \u00E0 direita',
    'turnLeft': // symbols.js:104
        'girar \u00E0 esquerda',
    'storage': // symbols.js:105
        'armazenagem',
    'poster': // symbols.js:106
        'p\u00F3ster',
    'flash': // symbols.js:107
        'rel\u00E2mpago',
    'brush': // symbols.js:108
        'pincel',
    'rectangleSolid': // symbols.js:110
        'rect\u00E2ngulo preenchido',
    'circle': // symbols.js:111
        'circunfer\u00EAncia',
    'circleSolid': // symbols.js:112
        'c\u00EDrculo',
    'cross': // symbols.js:114
        undefined,
    'crosshairs': // symbols.js:115
        'mira',
    'paintbucket': // symbols.js:116
        'balde de tinta',
    'eraser': // symbols.js:117
        'borracha',
    'pipette': // symbols.js:118
        'pipeta',
    'speechBubble': // symbols.js:119
        'bal\u00E3o de fala',
    'speechBubbleOutline': // symbols.js:120
        'contorno de bal\u00E3o de fala',
    'turnBack': // symbols.js:121
        undefined,
    'turnForward': // symbols.js:122
        undefined,
    'arrowUp': // symbols.js:123
        'seta para cima',
    'arrowUpOutline': // symbols.js:124
        'contorno de seta para cima',
    'arrowLeft': // symbols.js:125
        'seta para a esquerda',
    'arrowLeftOutline': // symbols.js:126
        'contorno de seta para a esquerda',
    'arrowDown': // symbols.js:127
        'seta para baixo',
    'arrowDownOutline': // symbols.js:128
        'contorno de seta para baixo',
    'arrowRight': // symbols.js:129
        'seta para a direita',
    'arrowRightOutline': // symbols.js:130
        'contorno de seta para a direita',
    'robot': // symbols.js:131
        'robot',
    'magnifyingGlass': // symbols.js:132
        undefined,
    'magnifierOutline': // symbols.js:133
        undefined,
    'notes': // symbols.js:134
        undefined,
    'camera': // symbols.js:135
        undefined,
    'location': // symbols.js:136
        undefined,
    'footprints': // symbols.js:137
        undefined,
    'keyboard': // symbols.js:138
        undefined,
    'keyboardFilled': // symbols.js:139
        undefined,
    'reset columns': // tables.js:1024 tables.js:1032
        'reiniciar colunas',
    'open in another dialog': // tables.js:1027
        'abrir noutra caixa de di\u00E1logo',
    'list view': // tables.js:1034
        'vista de lista',
    'Table view': // tables.js:1186
        'Vista de tabela',
    'expecting a receiver but getting {{ actual }}': // threads.js:145
        undefined,
    'expecting a block or ring but getting {{ actual }}': // threads.js:160
        undefined,
    'a synchronous {{ appName }} script has timed out': // threads.js:172
        undefined,
    'the predicate takes\ntoo long for a\ncustom hat block': // threads.js:428
        undefined,
    'compiling does not yet support\nvariables that are not\nformal parameters': // threads.js:758
        undefined,
    'compiling does not yet support\ncustom blocks': // threads.js:785
        undefined,
    'compiling does not yet support\nimplicit parameters\n(empty input slots)': // threads.js:818
        undefined,
    'compiling does not yet support\ninputs of type\n{{ type }}': // threads.js:845
        undefined,
    'compiling does not yet support\ninput slots of type\n{{ type }}': // threads.js:858
        undefined,
    'reporter didn\'t report': // threads.js:1087
        undefined,
    'Inside': // threads.js:1100
        undefined,
    'a custom block definition is missing': // threads.js:1107
        undefined,
    'expecting a ring but getting {{ actual }}': // threads.js:1202 threads.js:1316
        undefined,
    'expecting {{ expected }} input(s), but getting {{ actual }}': // threads.js:1265 threads.js:1366
        undefined,
    'continuations cannot be forked': // threads.js:1312
        undefined,
    'expecting {{ expected }} but getting {{ actual }}': // threads.js:2538
        undefined,
    'cannot operate on a deleted sprite': // threads.js:2546
        undefined,
    'expecting text instead of a {{ type }}': // threads.js:2862
        undefined,
    'expecting a text delimiter instead of a {{ type }}': // threads.js:2868
        undefined,
    'unsupported attribute': // threads.js:3448
        undefined,
    'unable to nest\n(disabled or circular?)': // threads.js:3462
        undefined,
    '"{{ name }}" is read-only': // threads.js:3505
        undefined,
    '"{{ name }}"\nis not a valid option': // threads.js:3642
        undefined,
    'unsupported data type {{ type }}': // threads.js:3677
        undefined,
    '{{ className }} >> {{ expression }} {{ variables }}': // threads.js:3958
        undefined,
    'a transient {{ className }} [{{ value }}]': // threads.js:4122
        undefined,
    'a {{ className }} [{{ value }}]': // threads.js:4123
        undefined,
    'a {{ className }} {{{ value }}}': // threads.js:4139
        undefined,
    'a variable of name "{{ name }}"\ndoes not exist in this context': // threads.js:4176 threads.js:4257
        undefined,
    'Yes': // widgets.js:1607
        'Sim',
    'No': // widgets.js:1608
        'N\u00E3o',
    'Default': // widgets.js:1882
        'Normal',
    '{{ year }} or before': // widgets.js:2024
        undefined,
    'User name': // widgets.js:2054 widgets.js:2059 widgets.js:2092
        'Nome de utilizador',
    'Birth date': // widgets.js:2061
        'Data de nascimento',
    'Password': // widgets.js:2071 widgets.js:2078
        'Palavra-passe',
    'Repeat Password': // widgets.js:2073
        undefined,
    'Old password': // widgets.js:2083
        'Palavra-passe actual',
    'New password': // widgets.js:2085
        'Nova palavra-passe',
    'Repeat new password': // widgets.js:2087
        'Repita a nova palavra-passe',
    'please fill out\nthis field': // widgets.js:2196
        'Por favor preencha\neste campo.',
    'User name must be four\ncharacters or longer': // widgets.js:2201
        'O nome de utilizador tem de ter\npelo menos quatro caracteres.',
    'please provide a valid\nemail address': // widgets.js:2206
        'Por favor indique um endere\u00E7o\nde correio electr\u00F3nico v\u00E1lido.',
    'password must be six\ncharacters or longer': // widgets.js:2212
        'A palavra-passe tem de ter\npelo menos seis caracteres.',
    'passwords do\nnot match': // widgets.js:2216
        'As palavras-passe\nn\u00E3o correspondem.',
    'please agree to\nthe TOS': // widgets.js:2222
        'Por favor concorde com\nos Termos do Servi\u00E7o.',
    'E-mail address of parent or guardian': // widgets.js:2258
        'Endere\u00E7o de encarregado de educa\u00E7\u00E3o',
    'E-mail address': // widgets.js:2259
        'Endere\u00E7o de correio electr\u00F3nico',
    'Missing required element <{{ tagName }}>!': // xml.js:186
        undefined,
    'Expected "=" after attribute name': // xml.js:341
        undefined,
    'Expected single- or double-quoted attribute value': // xml.js:347
        undefined,
    'Expected ">" after "/" in empty tag': // xml.js:361
        undefined,
    'Expected ">" after tag name and attributes': // xml.js:367
        undefined,
    'Expected to close {{ tagName }}': // xml.js:379
        undefined,
    'Tools': // libraries/LIBRARIES:1
        undefined,
    'Standard library of powerful blocks (for, map, etc.)': // libraries/LIBRARIES:1
        undefined,
    'Iteration, composition': // libraries/LIBRARIES:2
        undefined,
    'Traditional loop constructs (while, until, etc.) plus the Lisp "named let" (a generalization of FOR) plus functional iteration (repeated invocation of a function) and function composition.': // libraries/LIBRARIES:2
        undefined,
    'List utilities': // libraries/LIBRARIES:3
        undefined,
    'Some standard functions on lists (append, reverse, etc.)': // libraries/LIBRARIES:3
        undefined,
    'Streams (lazy lists)': // libraries/LIBRARIES:4
        undefined,
    'A variation on the list data type in which each list item aren\'t computed until it\'s needed, so you can construct million-item lists without really taking up all that time or memory, or even infinite-sized lists. (A block that reports all the prime numbers is included as an example.)': // libraries/LIBRARIES:4
        undefined,
    'Variadic reporters': // libraries/LIBRARIES:5
        undefined,
    'Versions of +, x, AND, and OR that take more than two inputs.': // libraries/LIBRARIES:5
        undefined,
    'Web services access (https)': // libraries/LIBRARIES:6
        undefined,
    'An extended version of the HTTP:// block that allows POST, PUT, and DELETE as well as GET requests, allows using the secure HTTPS protocol, and gives control over headers, etc.': // libraries/LIBRARIES:6
        undefined,
    'Words, sentences': // libraries/LIBRARIES:7
        undefined,
    'One of the big ideas in Logo that they left out of Scratch is thinking of text as structured into words and sentences, rather than just a string of characters. This library (along with the JOIN WORDS block in the Tools library) brings back that idea.': // libraries/LIBRARIES:7
        undefined,
    'Multi-branched conditional (switch)': // libraries/LIBRARIES:8
        undefined,
    'Like "switch" in C-like languages or "cond" in Lisp. Thanks to Nathan Dinsmore for inventing the idea of a separate block for each branch!': // libraries/LIBRARIES:8
        undefined,
    'LEAP Motion controller': // libraries/LIBRARIES:9
        undefined,
    'Report hand positions from LEAP Motion controller (leapmotion.com).': // libraries/LIBRARIES:9
        undefined,
    'Set RGB or HSV pen color': // libraries/LIBRARIES:10
        undefined,
    'Set or report pen color as RGB (red, green, blue) or HSV (hue, saturation, value).': // libraries/LIBRARIES:10
        undefined,
    'Catch errors in a script': // libraries/LIBRARIES:11
        undefined,
    'Run a script; if an error happens, instead of stopping the script with a red halo, run another script to handle the error. Also includes a block to cause an error with a message given as input. Also includes a block to create a script variable and give it a value.': // libraries/LIBRARIES:11
        undefined,
    'Allow multi-line text input to a block': // libraries/LIBRARIES:12
        undefined,
    'In general, text inputs allow only a single line. The MULTILINE block accepts multi-line text input and can be used in text input slots of other blocks.': // libraries/LIBRARIES:12
        undefined,
    'Provide getters and setters for all GUI-controlled global settings': // libraries/LIBRARIES:13
        undefined,
    'Eisenberg\'s Law: Anything that can be done from the GUI should be doable from the programming language, and vice versa.': // libraries/LIBRARIES:13
        undefined,
    'Infinite precision integers, exact rationals, complex': // libraries/LIBRARIES:14
        undefined,
    'The full Scheme numeric tower. "USE BIGNUMS <True>" to enable.': // libraries/LIBRARIES:14
        undefined,
    'Provide 100 selected colors': // libraries/LIBRARIES:15
        undefined,
    'to use instead of hue for better selection': // libraries/LIBRARIES:15
        undefined,
    'Text to speech': // libraries/LIBRARIES:16
        undefined,
    'output text using speech synthesis.': // libraries/LIBRARIES:16
        undefined,
    'Animation': // libraries/LIBRARIES:17
        undefined,
    'glide, grow and rotate using easing functions.': // libraries/LIBRARIES:17
        undefined,
    'Pixels': // libraries/LIBRARIES:18
        undefined,
    'manipulate costumes pixel-wise.': // libraries/LIBRARIES:18
        undefined,
    'Audio Comp': // libraries/LIBRARIES:19
        undefined,
    'analyze, manipulate and generate sound samples.': // libraries/LIBRARIES:19
        undefined,
    'Atom Playground': // backgrounds/BACKGROUNDS:1
        undefined,
    'Bedroom 1': // backgrounds/BACKGROUNDS:2
        undefined,
    'Bedroom 2': // backgrounds/BACKGROUNDS:3
        undefined,
    'Berkeley Mural': // backgrounds/BACKGROUNDS:4
        undefined,
    'Brick Wall and Stairs': // backgrounds/BACKGROUNDS:5
        undefined,
    'Brick Wall 1': // backgrounds/BACKGROUNDS:6
        undefined,
    'Brick Wall 2': // backgrounds/BACKGROUNDS:7
        undefined,
    'Desert': // backgrounds/BACKGROUNDS:8
        undefined,
    'Night City with Street': // backgrounds/BACKGROUNDS:9
        undefined,
    'Party Room': // backgrounds/BACKGROUNDS:10
        undefined,
    'Pathway': // backgrounds/BACKGROUNDS:11
        undefined,
    'XY Grid': // backgrounds/BACKGROUNDS:12
        undefined,
    'abby a': // costumes/COSTUMES:1
        undefined,
    'abby b': // costumes/COSTUMES:2
        undefined,
    'abby c': // costumes/COSTUMES:3
        undefined,
    'abby d': // costumes/COSTUMES:4
        undefined,
    'airplane2': // costumes/COSTUMES:5
        undefined,
    'alonzo': // costumes/COSTUMES:6
        undefined,
    'alonzo (3D)': // costumes/COSTUMES:7
        undefined,
    'alonzo (vector)': // costumes/COSTUMES:8
        undefined,
    'amon': // costumes/COSTUMES:9
        undefined,
    'anina pop down': // costumes/COSTUMES:10
        undefined,
    'anina pop front': // costumes/COSTUMES:11
        undefined,
    'anina pop L arm': // costumes/COSTUMES:12
        undefined,
    'anina pop left': // costumes/COSTUMES:13
        undefined,
    'anina pop R arm': // costumes/COSTUMES:14
        undefined,
    'anina pop right': // costumes/COSTUMES:15
        undefined,
    'anina pop stand': // costumes/COSTUMES:16
        undefined,
    'anina R cross': // costumes/COSTUMES:17
        undefined,
    'anina stance': // costumes/COSTUMES:18
        undefined,
    'anina top freeze': // costumes/COSTUMES:19
        undefined,
    'anina top L step': // costumes/COSTUMES:20
        undefined,
    'anina top R step': // costumes/COSTUMES:21
        undefined,
    'anina top stand': // costumes/COSTUMES:22
        undefined,
    'anna01': // costumes/COSTUMES:23
        undefined,
    'anna02': // costumes/COSTUMES:24
        undefined,
    'anna03': // costumes/COSTUMES:25
        undefined,
    'anna04': // costumes/COSTUMES:26
        undefined,
    'anna05': // costumes/COSTUMES:27
        undefined,
    'anna06': // costumes/COSTUMES:28
        undefined,
    'anna07b': // costumes/COSTUMES:29
        undefined,
    'anna07c': // costumes/COSTUMES:30
        undefined,
    'anna07': // costumes/COSTUMES:31
        undefined,
    'anna08': // costumes/COSTUMES:32
        undefined,
    'anna09': // costumes/COSTUMES:33
        undefined,
    'anna10': // costumes/COSTUMES:34
        undefined,
    'anna11': // costumes/COSTUMES:35
        undefined,
    'anna12': // costumes/COSTUMES:36
        undefined,
    'anna a': // costumes/COSTUMES:37
        undefined,
    'anna b': // costumes/COSTUMES:38
        undefined,
    'apple': // costumes/COSTUMES:39
        undefined,
    'arrow1 a': // costumes/COSTUMES:40
        undefined,
    'arrow1 b': // costumes/COSTUMES:41
        undefined,
    'arrow1 c': // costumes/COSTUMES:42
        undefined,
    'arrow1 d': // costumes/COSTUMES:43
        undefined,
    'avery a': // costumes/COSTUMES:44
        undefined,
    'avery b': // costumes/COSTUMES:45
        undefined,
    'avery walking a': // costumes/COSTUMES:46
        undefined,
    'avery walking b': // costumes/COSTUMES:47
        undefined,
    'avery walking c': // costumes/COSTUMES:48
        undefined,
    'avery walking d': // costumes/COSTUMES:49
        undefined,
    'AZ pop down': // costumes/COSTUMES:50
        undefined,
    'AZ pop front': // costumes/COSTUMES:51
        undefined,
    'AZ pop L arm': // costumes/COSTUMES:52
        undefined,
    'AZ pop left': // costumes/COSTUMES:53
        undefined,
    'AZ pop R arm': // costumes/COSTUMES:54
        undefined,
    'AZ pop right': // costumes/COSTUMES:55
        undefined,
    'AZ pop stand': // costumes/COSTUMES:56
        undefined,
    'AZ stance': // costumes/COSTUMES:57
        undefined,
    'AZ top freeze': // costumes/COSTUMES:58
        undefined,
    'AZ top L step': // costumes/COSTUMES:59
        undefined,
    'AZ top R cross': // costumes/COSTUMES:60
        undefined,
    'AZ top R step': // costumes/COSTUMES:61
        undefined,
    'AZ top stand': // costumes/COSTUMES:62
        undefined,
    'ball a': // costumes/COSTUMES:63
        undefined,
    'ball b': // costumes/COSTUMES:64
        undefined,
    'ball c': // costumes/COSTUMES:65
        undefined,
    'ball d': // costumes/COSTUMES:66
        undefined,
    'ballerina a': // costumes/COSTUMES:67
        undefined,
    'ballerina b': // costumes/COSTUMES:68
        undefined,
    'ballerina c': // costumes/COSTUMES:69
        undefined,
    'ballerina d': // costumes/COSTUMES:70
        undefined,
    'ball e': // costumes/COSTUMES:71
        undefined,
    'balloon1 a': // costumes/COSTUMES:72
        undefined,
    'balloon1 b': // costumes/COSTUMES:73
        undefined,
    'balloon1 c': // costumes/COSTUMES:74
        undefined,
    'ball soccer': // costumes/COSTUMES:75
        undefined,
    'bananas': // costumes/COSTUMES:76
        undefined,
    'baseball': // costumes/COSTUMES:77
        undefined,
    'basketball': // costumes/COSTUMES:78
        undefined,
    'bass': // costumes/COSTUMES:79
        undefined,
    'bat1 a': // costumes/COSTUMES:80
        undefined,
    'bat1 a ': // costumes/COSTUMES:81
        undefined,
    'bat1 b': // costumes/COSTUMES:82
        undefined,
    'bat1 b ': // costumes/COSTUMES:83
        undefined,
    'bat2 a': // costumes/COSTUMES:84
        undefined,
    'bat2 a ': // costumes/COSTUMES:85
        undefined,
    'bat2 b': // costumes/COSTUMES:86
        undefined,
    'bat2 b ': // costumes/COSTUMES:87
        undefined,
    'b block': // costumes/COSTUMES:88
        undefined,
    'beachball': // costumes/COSTUMES:89
        undefined,
    'bear1 a': // costumes/COSTUMES:90
        undefined,
    'bear1 b': // costumes/COSTUMES:91
        undefined,
    'bear2 a': // costumes/COSTUMES:92
        undefined,
    'bear2 b': // costumes/COSTUMES:93
        undefined,
    'beetle': // costumes/COSTUMES:94
        undefined,
    'bell1': // costumes/COSTUMES:95
        undefined,
    'bells a': // costumes/COSTUMES:96
        undefined,
    'bells b': // costumes/COSTUMES:97
        undefined,
    'bowl a': // costumes/COSTUMES:98
        undefined,
    'bowtie a': // costumes/COSTUMES:99
        undefined,
    'bowtie b': // costumes/COSTUMES:100
        undefined,
    'boy1 standing': // costumes/COSTUMES:101
        undefined,
    'boy1 walking': // costumes/COSTUMES:102
        undefined,
    'boy2': // costumes/COSTUMES:103
        undefined,
    'boy3': // costumes/COSTUMES:104
        undefined,
    'breakdancer1 a': // costumes/COSTUMES:105
        undefined,
    'breakdancer1 b': // costumes/COSTUMES:106
        undefined,
    'breakdancer1 c': // costumes/COSTUMES:107
        undefined,
    'building a': // costumes/COSTUMES:108
        undefined,
    'building b': // costumes/COSTUMES:109
        undefined,
    'building c': // costumes/COSTUMES:110
        undefined,
    'building d': // costumes/COSTUMES:111
        undefined,
    'building e': // costumes/COSTUMES:112
        undefined,
    'building f': // costumes/COSTUMES:113
        undefined,
    'building g': // costumes/COSTUMES:114
        undefined,
    'building h': // costumes/COSTUMES:115
        undefined,
    'building i': // costumes/COSTUMES:116
        undefined,
    'building j': // costumes/COSTUMES:117
        undefined,
    'bus': // costumes/COSTUMES:118
        undefined,
    'butterfly1 a': // costumes/COSTUMES:119
        undefined,
    'butterfly1 b ': // costumes/COSTUMES:120
        undefined,
    'butterfly2 ': // costumes/COSTUMES:121
        undefined,
    'butterfly3 ': // costumes/COSTUMES:122
        undefined,
    'button1': // costumes/COSTUMES:123
        undefined,
    'button2 a': // costumes/COSTUMES:124
        undefined,
    'button2 b': // costumes/COSTUMES:125
        undefined,
    'button3 a': // costumes/COSTUMES:126
        undefined,
    'button3 b': // costumes/COSTUMES:127
        undefined,
    'button4 a': // costumes/COSTUMES:128
        undefined,
    'button4 b': // costumes/COSTUMES:129
        undefined,
    'button5 a': // costumes/COSTUMES:130
        undefined,
    'button5 b': // costumes/COSTUMES:131
        undefined,
    'cake a': // costumes/COSTUMES:132
        undefined,
    'cake b': // costumes/COSTUMES:133
        undefined,
    'calvrett jumping': // costumes/COSTUMES:134
        undefined,
    'calvrett thinking': // costumes/COSTUMES:135
        undefined,
    'candle1 a': // costumes/COSTUMES:136
        undefined,
    'candle1 b': // costumes/COSTUMES:137
        undefined,
    'candles1': // costumes/COSTUMES:138
        undefined,
    'candles2': // costumes/COSTUMES:139
        undefined,
    'car bug': // costumes/COSTUMES:140
        undefined,
    'cassy a': // costumes/COSTUMES:141
        undefined,
    'cassy b': // costumes/COSTUMES:142
        undefined,
    'cassy c': // costumes/COSTUMES:143
        undefined,
    'cassy dance a': // costumes/COSTUMES:144
        undefined,
    'cassy dance b': // costumes/COSTUMES:145
        undefined,
    'cassy dance c': // costumes/COSTUMES:146
        undefined,
    'cassy dance d': // costumes/COSTUMES:147
        undefined,
    'cassy d': // costumes/COSTUMES:148
        undefined,
    'cat2': // costumes/COSTUMES:149 costumes/COSTUMES:150
        undefined,
    'cat3': // costumes/COSTUMES:151
        undefined,
    'cat4': // costumes/COSTUMES:152
        undefined,
    'cat5': // costumes/COSTUMES:153
        undefined,
    'catherine a': // costumes/COSTUMES:154
        undefined,
    'catherine b': // costumes/COSTUMES:155
        undefined,
    'catherine c': // costumes/COSTUMES:156
        undefined,
    'catherine d': // costumes/COSTUMES:157
        undefined,
    'champ99 a': // costumes/COSTUMES:158
        undefined,
    'champ99 b': // costumes/COSTUMES:159
        undefined,
    'champ99 c': // costumes/COSTUMES:160
        undefined,
    'champ99 d': // costumes/COSTUMES:161
        undefined,
    'champ99 e': // costumes/COSTUMES:162
        undefined,
    'champ99 f': // costumes/COSTUMES:163
        undefined,
    'champ99 g': // costumes/COSTUMES:164
        undefined,
    'cheesy puffs': // costumes/COSTUMES:165
        undefined,
    'cloud a': // costumes/COSTUMES:166
        undefined,
    'cloud b': // costumes/COSTUMES:167
        undefined,
    'cloud c': // costumes/COSTUMES:168
        undefined,
    'cloud d': // costumes/COSTUMES:169
        undefined,
    'cm pop L arm': // costumes/COSTUMES:171
        undefined,
    'cm pop R arm': // costumes/COSTUMES:172
        undefined,
    'cm top L cross': // costumes/COSTUMES:173
        undefined,
    'cm top L leg': // costumes/COSTUMES:174
        undefined,
    'cm top R cross': // costumes/COSTUMES:175
        undefined,
    'cm top ready': // costumes/COSTUMES:176
        undefined,
    'cm top R leg': // costumes/COSTUMES:177
        undefined,
    'cm top stand': // costumes/COSTUMES:178
        undefined,
    'convertible1': // costumes/COSTUMES:179
        undefined,
    'convertible2': // costumes/COSTUMES:180
        undefined,
    'convertible3': // costumes/COSTUMES:181
        undefined,
    'cowbell': // costumes/COSTUMES:182
        undefined,
    'crab a': // costumes/COSTUMES:183
        undefined,
    'crab b': // costumes/COSTUMES:184
        undefined,
    'creature1 a': // costumes/COSTUMES:185
        undefined,
    'creature1 b': // costumes/COSTUMES:186
        undefined,
    'creature1 c': // costumes/COSTUMES:187
        undefined,
    'cymbal a': // costumes/COSTUMES:188
        undefined,
    'cymbal b': // costumes/COSTUMES:189
        undefined,
    'dan a': // costumes/COSTUMES:190
        undefined,
    'dan b': // costumes/COSTUMES:191
        undefined,
    'dani a': // costumes/COSTUMES:192
        undefined,
    'dani b': // costumes/COSTUMES:193
        undefined,
    'dani c': // costumes/COSTUMES:194
        undefined,
    'dee a': // costumes/COSTUMES:195
        undefined,
    'dee b': // costumes/COSTUMES:196
        undefined,
    'dee c': // costumes/COSTUMES:197
        undefined,
    'dee d': // costumes/COSTUMES:198
        undefined,
    'dee e': // costumes/COSTUMES:199
        undefined,
    'devin a': // costumes/COSTUMES:200
        undefined,
    'devin b': // costumes/COSTUMES:201
        undefined,
    'devin c': // costumes/COSTUMES:202
        undefined,
    'devin d': // costumes/COSTUMES:203
        undefined,
    'dinosaur1 a': // costumes/COSTUMES:204
        undefined,
    'dinosaur1 b': // costumes/COSTUMES:205
        undefined,
    'dinosaur1 c': // costumes/COSTUMES:206
        undefined,
    'dinosaur1 d': // costumes/COSTUMES:207
        undefined,
    'dinosaur1 e': // costumes/COSTUMES:208
        undefined,
    'dinosaur1 f': // costumes/COSTUMES:209
        undefined,
    'dinosaur1 g': // costumes/COSTUMES:210
        undefined,
    'dinosaur2 a': // costumes/COSTUMES:211
        undefined,
    'dinosaur2 b': // costumes/COSTUMES:212
        undefined,
    'dinosaur3': // costumes/COSTUMES:213
        undefined,
    'diver1': // costumes/COSTUMES:214
        undefined,
    'diver2': // costumes/COSTUMES:215
        undefined,
    'dm freeze': // costumes/COSTUMES:216
        undefined,
    'dm pop down': // costumes/COSTUMES:217
        undefined,
    'dm pop front': // costumes/COSTUMES:218
        undefined,
    'dm pop L arm': // costumes/COSTUMES:219
        undefined,
    'dm pop left': // costumes/COSTUMES:220
        undefined,
    'dm pop R arm': // costumes/COSTUMES:221
        undefined,
    'dm pop right': // costumes/COSTUMES:222
        undefined,
    'dm pop stand': // costumes/COSTUMES:223
        undefined,
    'dm stance': // costumes/COSTUMES:224
        undefined,
    'dm top L leg': // costumes/COSTUMES:225
        undefined,
    'dm top R leg': // costumes/COSTUMES:226
        undefined,
    'dm top stand': // costumes/COSTUMES:227
        undefined,
    'dog1 a': // costumes/COSTUMES:228 costumes/COSTUMES:229
        undefined,
    'dog1 b': // costumes/COSTUMES:230 costumes/COSTUMES:231
        undefined,
    'dog2 a': // costumes/COSTUMES:232 costumes/COSTUMES:233
        undefined,
    'dog2 b': // costumes/COSTUMES:234 costumes/COSTUMES:235
        undefined,
    'dog2 c': // costumes/COSTUMES:236 costumes/COSTUMES:237
        undefined,
    'dog puppy back': // costumes/COSTUMES:238
        undefined,
    'dog puppy right': // costumes/COSTUMES:239
        undefined,
    'dog puppy side': // costumes/COSTUMES:240
        undefined,
    'dog puppy sit': // costumes/COSTUMES:241
        undefined,
    'donut': // costumes/COSTUMES:242
        undefined,
    'dove1 a': // costumes/COSTUMES:243
        undefined,
    'dove1 b': // costumes/COSTUMES:244
        undefined,
    'dove2 a': // costumes/COSTUMES:245
        undefined,
    'dove2 b': // costumes/COSTUMES:246
        undefined,
    'dragon1 a': // costumes/COSTUMES:247 costumes/COSTUMES:248
        undefined,
    'dragon1 b': // costumes/COSTUMES:249 costumes/COSTUMES:250
        undefined,
    'dragon2': // costumes/COSTUMES:251
        undefined,
    'drum1 a': // costumes/COSTUMES:252
        undefined,
    'drum1 b': // costumes/COSTUMES:253
        undefined,
    'drum2 a': // costumes/COSTUMES:254
        undefined,
    'drum2 b': // costumes/COSTUMES:255
        undefined,
    'drum bass a': // costumes/COSTUMES:256
        undefined,
    'drum bass b': // costumes/COSTUMES:257
        undefined,
    'drums conga a': // costumes/COSTUMES:258
        undefined,
    'drums conga b': // costumes/COSTUMES:259
        undefined,
    'drum snare a': // costumes/COSTUMES:260
        undefined,
    'drum snare b': // costumes/COSTUMES:261
        undefined,
    'duck': // costumes/COSTUMES:262
        undefined,
    'earth': // costumes/COSTUMES:263
        undefined,
    'elephant a ': // costumes/COSTUMES:264
        undefined,
    'elephant b ': // costumes/COSTUMES:265
        undefined,
    'fire hydrant': // costumes/COSTUMES:266
        undefined,
    'fish1': // costumes/COSTUMES:267
        undefined,
    'fish2': // costumes/COSTUMES:268
        undefined,
    'fish3': // costumes/COSTUMES:269
        undefined,
    'flower shape': // costumes/COSTUMES:270
        undefined,
    'football running': // costumes/COSTUMES:271
        undefined,
    'football standing': // costumes/COSTUMES:272
        undefined,
    'fortunecookie': // costumes/COSTUMES:273
        undefined,
    'fox': // costumes/COSTUMES:274
        undefined,
    'frog': // costumes/COSTUMES:275
        undefined,
    'fruit platter': // costumes/COSTUMES:276
        undefined,
    'fruitsalad': // costumes/COSTUMES:277
        undefined,
    'ghost1 ': // costumes/COSTUMES:278
        undefined,
    'ghost2 a': // costumes/COSTUMES:279
        undefined,
    'ghost2 b': // costumes/COSTUMES:280
        undefined,
    'ghoul a': // costumes/COSTUMES:281
        undefined,
    'ghoul b': // costumes/COSTUMES:282
        undefined,
    'gift a': // costumes/COSTUMES:283
        undefined,
    'gift b': // costumes/COSTUMES:284
        undefined,
    'girl1 standing': // costumes/COSTUMES:285
        undefined,
    'girl1 walking': // costumes/COSTUMES:286
        undefined,
    'girl2 shouting': // costumes/COSTUMES:287
        undefined,
    'girl2 standing': // costumes/COSTUMES:288
        undefined,
    'girl3 basketball': // costumes/COSTUMES:289
        undefined,
    'girl3 running': // costumes/COSTUMES:290
        undefined,
    'girl3 standing': // costumes/COSTUMES:291
        undefined,
    'glasses': // costumes/COSTUMES:292
        undefined,
    'glass water a': // costumes/COSTUMES:293
        undefined,
    'glass water b': // costumes/COSTUMES:294
        undefined,
    'green flag': // costumes/COSTUMES:295
        undefined,
    'guitar bass': // costumes/COSTUMES:296
        undefined,
    'guitar electric': // costumes/COSTUMES:297
        undefined,
    'guitar': // costumes/COSTUMES:298
        undefined,
    'hannah a': // costumes/COSTUMES:299
        undefined,
    'hannah b': // costumes/COSTUMES:300
        undefined,
    'hannah c': // costumes/COSTUMES:301
        undefined,
    'hat beanie': // costumes/COSTUMES:302
        undefined,
    'hat party2 a': // costumes/COSTUMES:303
        undefined,
    'Hat': // costumes/COSTUMES:304
        undefined,
    'hat winter': // costumes/COSTUMES:305
        undefined,
    'hat wizard': // costumes/COSTUMES:306
        undefined,
    'headband': // costumes/COSTUMES:307
        undefined,
    'heart code': // costumes/COSTUMES:308
        undefined,
    'heart face': // costumes/COSTUMES:309
        undefined,
    'heart love it': // costumes/COSTUMES:310
        undefined,
    'heart purple': // costumes/COSTUMES:311
        undefined,
    'heart red': // costumes/COSTUMES:312
        undefined,
    'heart smile': // costumes/COSTUMES:313
        undefined,
    'heart sweet': // costumes/COSTUMES:314
        undefined,
    'helicopter': // costumes/COSTUMES:315
        undefined,
    'hippo1 a': // costumes/COSTUMES:316
        undefined,
    'hippo1 b': // costumes/COSTUMES:317
        undefined,
    'holly1': // costumes/COSTUMES:318
        undefined,
    'holly2': // costumes/COSTUMES:319
        undefined,
    'home button': // costumes/COSTUMES:320
        undefined,
    'horse1 a': // costumes/COSTUMES:321
        undefined,
    'horse1 b': // costumes/COSTUMES:322
        undefined,
    'jaime a': // costumes/COSTUMES:323
        undefined,
    'jaime b': // costumes/COSTUMES:324
        undefined,
    'jaime walking a': // costumes/COSTUMES:325
        undefined,
    'jaime walking b': // costumes/COSTUMES:326
        undefined,
    'jaime walking c': // costumes/COSTUMES:327
        undefined,
    'jaime walking d': // costumes/COSTUMES:328
        undefined,
    'jaime walking e': // costumes/COSTUMES:329
        undefined,
    'jay': // costumes/COSTUMES:330
        undefined,
    'jeans a': // costumes/COSTUMES:331
        undefined,
    'jeans b': // costumes/COSTUMES:332
        undefined,
    'jodi': // costumes/COSTUMES:333
        undefined,
    'jo pop down': // costumes/COSTUMES:334
        undefined,
    'jo pop front': // costumes/COSTUMES:335
        undefined,
    'jo pop L arm': // costumes/COSTUMES:336
        undefined,
    'jo pop left': // costumes/COSTUMES:337
        undefined,
    'jo pop R arm': // costumes/COSTUMES:338
        undefined,
    'jo pop right': // costumes/COSTUMES:339
        undefined,
    'jo pop stand': // costumes/COSTUMES:340
        undefined,
    'jo stance': // costumes/COSTUMES:341
        undefined,
    'jo top L cross': // costumes/COSTUMES:342
        undefined,
    'jo top L leg': // costumes/COSTUMES:343
        undefined,
    'jo top R cross': // costumes/COSTUMES:344
        undefined,
    'jo top R leg': // costumes/COSTUMES:345
        undefined,
    'jo top stand': // costumes/COSTUMES:346
        undefined,
    'kai a': // costumes/COSTUMES:347
        undefined,
    'kai b': // costumes/COSTUMES:348
        undefined,
    'keyboard a': // costumes/COSTUMES:349
        undefined,
    'keyboard b': // costumes/COSTUMES:350
        undefined,
    'keyboard c': // costumes/COSTUMES:351
        undefined,
    'keyboard d': // costumes/COSTUMES:352
        undefined,
    'key': // costumes/COSTUMES:353
        undefined,
    'khalid a': // costumes/COSTUMES:354
        undefined,
    'Khalid b': // costumes/COSTUMES:355
        undefined,
    'khalid c': // costumes/COSTUMES:356
        undefined,
    'khalid d': // costumes/COSTUMES:357
        undefined,
    'knight': // costumes/COSTUMES:358
        undefined,
    'ladybug2 a': // costumes/COSTUMES:359
        undefined,
    'ladybug2 b': // costumes/COSTUMES:360
        undefined,
    'ladybug2': // costumes/COSTUMES:361
        undefined,
    'lamp': // costumes/COSTUMES:362
        undefined,
    'laptop': // costumes/COSTUMES:363
        undefined,
    'lb pop down': // costumes/COSTUMES:364
        undefined,
    'lb pop front': // costumes/COSTUMES:365
        undefined,
    'lb pop L arm': // costumes/COSTUMES:366
        undefined,
    'lb pop left': // costumes/COSTUMES:367
        undefined,
    'lb pop R arm': // costumes/COSTUMES:368
        undefined,
    'lb pop right': // costumes/COSTUMES:369
        undefined,
    'lb pop stand': // costumes/COSTUMES:370
        undefined,
    'lb stance': // costumes/COSTUMES:371
        undefined,
    'lb top L cross': // costumes/COSTUMES:372
        undefined,
    'lb top L leg': // costumes/COSTUMES:373
        undefined,
    'lb top R cross': // costumes/COSTUMES:374
        undefined,
    'lb top R leg': // costumes/COSTUMES:375
        undefined,
    'lb top stand': // costumes/COSTUMES:376
        undefined,
    'lightning': // costumes/COSTUMES:377
        undefined,
    'lion a': // costumes/COSTUMES:378
        undefined,
    'lion b': // costumes/COSTUMES:379
        undefined,
    'lioness': // costumes/COSTUMES:380
        undefined,
    'lorenz01': // costumes/COSTUMES:381
        undefined,
    'lorenz02': // costumes/COSTUMES:382
        undefined,
    'lorenz03': // costumes/COSTUMES:383
        undefined,
    'lorenz04': // costumes/COSTUMES:384
        undefined,
    'lorenz05': // costumes/COSTUMES:385
        undefined,
    'lorenz06': // costumes/COSTUMES:386
        undefined,
    'lorenz07b': // costumes/COSTUMES:387
        undefined,
    'lorenz07': // costumes/COSTUMES:388
        undefined,
    'magiccarpet': // costumes/COSTUMES:389
        undefined,
    'magicwand': // costumes/COSTUMES:390
        undefined,
    'marble building': // costumes/COSTUMES:391
        undefined,
    'marissa crouching': // costumes/COSTUMES:392
        undefined,
    'marissa': // costumes/COSTUMES:393
        undefined,
    'marissa sitting': // costumes/COSTUMES:394
        undefined,
    'maya': // costumes/COSTUMES:395
        undefined,
    'microphonestand': // costumes/COSTUMES:396
        undefined,
    'microphone': // costumes/COSTUMES:397
        undefined,
    'monkey1 a': // costumes/COSTUMES:398
        undefined,
    'monkey1 b': // costumes/COSTUMES:399
        undefined,
    'monkey2 a': // costumes/COSTUMES:400
        undefined,
    'monkey2 b': // costumes/COSTUMES:401
        undefined,
    'monkey2 c': // costumes/COSTUMES:402
        undefined,
    'mori': // costumes/COSTUMES:403
        undefined,
    'mouse1 a': // costumes/COSTUMES:404
        undefined,
    'mouse1 b': // costumes/COSTUMES:405
        undefined,
    'muffin a': // costumes/COSTUMES:406
        undefined,
    'muffin b': // costumes/COSTUMES:407
        undefined,
    'octopus a': // costumes/COSTUMES:408
        undefined,
    'octopus b': // costumes/COSTUMES:409
        undefined,
    'orange2 a': // costumes/COSTUMES:410
        undefined,
    'orange2 b': // costumes/COSTUMES:411
        undefined,
    'orange2 c': // costumes/COSTUMES:412
        undefined,
    'orange': // costumes/COSTUMES:413
        undefined,
    'paddle': // costumes/COSTUMES:414
        undefined,
    'palmtree': // costumes/COSTUMES:415
        undefined,
    'parrot2 a': // costumes/COSTUMES:416
        undefined,
    'parrot2 b': // costumes/COSTUMES:417
        undefined,
    'parrot a': // costumes/COSTUMES:418
        undefined,
    'parrot b': // costumes/COSTUMES:419
        undefined,
    'partyhat1': // costumes/COSTUMES:420
        undefined,
    'paul': // costumes/COSTUMES:421
        undefined,
    'pencil a': // costumes/COSTUMES:422
        undefined,
    'pencil b': // costumes/COSTUMES:423
        undefined,
    'penguin1': // costumes/COSTUMES:424
        undefined,
    'penguin1 talk a': // costumes/COSTUMES:425
        undefined,
    'penguin1 talk b': // costumes/COSTUMES:426
        undefined,
    'penguin2': // costumes/COSTUMES:427
        undefined,
    'penguin2 talk a': // costumes/COSTUMES:428
        undefined,
    'penguin2 talk b': // costumes/COSTUMES:429
        undefined,
    'penguin3 a': // costumes/COSTUMES:430
        undefined,
    'penguin3 b': // costumes/COSTUMES:431
        undefined,
    'penguin3 c': // costumes/COSTUMES:432
        undefined,
    'piano': // costumes/COSTUMES:433
        undefined,
    'planet2': // costumes/COSTUMES:434
        undefined,
    'princess': // costumes/COSTUMES:435
        undefined,
    'prince': // costumes/COSTUMES:436
        undefined,
    'rainbow': // costumes/COSTUMES:437
        undefined,
    'referee': // costumes/COSTUMES:438
        undefined,
    'reindeer': // costumes/COSTUMES:439
        undefined,
    'robot1': // costumes/COSTUMES:440
        undefined,
    'rocks': // costumes/COSTUMES:441
        undefined,
    'rory': // costumes/COSTUMES:442
        undefined,
    'ruby a': // costumes/COSTUMES:443
        undefined,
    'ruby b': // costumes/COSTUMES:444
        undefined,
    'sail boat': // costumes/COSTUMES:445
        undefined,
    'sam': // costumes/COSTUMES:446
        undefined,
    'saxophone a': // costumes/COSTUMES:447
        undefined,
    'saxophone b': // costumes/COSTUMES:448
        undefined,
    'scarf1': // costumes/COSTUMES:449
        undefined,
    'scarf2': // costumes/COSTUMES:450
        undefined,
    'shark a ': // costumes/COSTUMES:451
        undefined,
    'shark b ': // costumes/COSTUMES:452
        undefined,
    'shark c ': // costumes/COSTUMES:453
        undefined,
    'shirt2 a2': // costumes/COSTUMES:454
        undefined,
    'shirt2 a': // costumes/COSTUMES:455
        undefined,
    'shirt a': // costumes/COSTUMES:456
        undefined,
    'shirt blouse': // costumes/COSTUMES:457
        undefined,
    'shirt b': // costumes/COSTUMES:458
        undefined,
    'shirt collar a': // costumes/COSTUMES:459
        undefined,
    'shirt collar b': // costumes/COSTUMES:460
        undefined,
    'shirt collar c': // costumes/COSTUMES:461
        undefined,
    'shoes1': // costumes/COSTUMES:462
        undefined,
    'shoes2': // costumes/COSTUMES:463
        undefined,
    'Singer1': // costumes/COSTUMES:464
        undefined,
    'skates': // costumes/COSTUMES:465
        undefined,
    'sl pop L arm': // costumes/COSTUMES:466
        undefined,
    'sl pop R arm': // costumes/COSTUMES:467
        undefined,
    'sl top L cross': // costumes/COSTUMES:468
        undefined,
    'sl top L leg': // costumes/COSTUMES:469
        undefined,
    'sl top R cross': // costumes/COSTUMES:470
        undefined,
    'sl top ready': // costumes/COSTUMES:471
        undefined,
    'sl top R leg': // costumes/COSTUMES:472
        undefined,
    'sl top stand': // costumes/COSTUMES:473
        undefined,
    'snowflake': // costumes/COSTUMES:474
        undefined,
    'snowman': // costumes/COSTUMES:475
        undefined,
    'spaceship a': // costumes/COSTUMES:476
        undefined,
    'spaceship b': // costumes/COSTUMES:477
        undefined,
    'speaker': // costumes/COSTUMES:478
        undefined,
    'squirrel1': // costumes/COSTUMES:479
        undefined,
    'star1': // costumes/COSTUMES:480
        undefined,
    'star2': // costumes/COSTUMES:481
        undefined,
    'star3 a': // costumes/COSTUMES:482
        undefined,
    'star3 b': // costumes/COSTUMES:483
        undefined,
    'starfish a': // costumes/COSTUMES:484
        undefined,
    'starfish b ': // costumes/COSTUMES:485
        undefined,
    'street cleaner mit': // costumes/COSTUMES:487
        undefined,
    'sunglasses1': // costumes/COSTUMES:488
        undefined,
    'sunglasses2': // costumes/COSTUMES:489
        undefined,
    'sun': // costumes/COSTUMES:490
        undefined,
    'tabla a': // costumes/COSTUMES:491
        undefined,
    'tabla b': // costumes/COSTUMES:492
        undefined,
    'taco a': // costumes/COSTUMES:493
        undefined,
    'taco b': // costumes/COSTUMES:494
        undefined,
    'tennisball': // costumes/COSTUMES:495
        undefined,
    'text awesome': // costumes/COSTUMES:496
        undefined,
    'text Halloween': // costumes/COSTUMES:497
        undefined,
    'trampoline': // costumes/COSTUMES:498
        undefined,
    'tree1': // costumes/COSTUMES:499
        undefined,
    'tree2': // costumes/COSTUMES:500
        undefined,
    'tree lights a': // costumes/COSTUMES:501
        undefined,
    'tree lights b': // costumes/COSTUMES:502
        undefined,
    'trees a': // costumes/COSTUMES:503
        undefined,
    'trees b': // costumes/COSTUMES:504
        undefined,
    'trombone a': // costumes/COSTUMES:505
        undefined,
    'trombone b': // costumes/COSTUMES:506
        undefined,
    'trumpet a2': // costumes/COSTUMES:507
        undefined,
    'trumpet a': // costumes/COSTUMES:508
        undefined,
    'ukulele': // costumes/COSTUMES:509
        undefined,
    'umbrella': // costumes/COSTUMES:510
        undefined,
    'unicorn1': // costumes/COSTUMES:511
        undefined,
    'unicorn': // costumes/COSTUMES:512
        undefined,
    'vest a': // costumes/COSTUMES:513
        undefined,
    'vest b': // costumes/COSTUMES:514
        undefined,
    'wanda': // costumes/COSTUMES:515
        undefined,
    'watermelon a': // costumes/COSTUMES:516
        undefined,
    'watermelon b': // costumes/COSTUMES:517
        undefined,
    'watermelon c': // costumes/COSTUMES:518
        undefined,
    'witch': // costumes/COSTUMES:519
        undefined,
    'wizard1': // costumes/COSTUMES:520
        undefined,
    'wizard2': // costumes/COSTUMES:521
        undefined,
    'wizard': // costumes/COSTUMES:522
        undefined,
    'Cat': // sounds/SOUNDS:1
        undefined,
    'Chord': // sounds/SOUNDS:2
        undefined,
    'Dog 1': // sounds/SOUNDS:3
        undefined,
    'Dog 2': // sounds/SOUNDS:4
        undefined,
    'Finger Snap': // sounds/SOUNDS:5
        undefined,
    'Kitten': // sounds/SOUNDS:6
        undefined,
    'Laugh Female': // sounds/SOUNDS:7
        undefined,
    'Laugh Male 1': // sounds/SOUNDS:8
        undefined,
    'Laugh Male 2': // sounds/SOUNDS:9
        undefined,
    'Laugh Male 3': // sounds/SOUNDS:10
        undefined,
    'Meow': // sounds/SOUNDS:11
        undefined,
    'Pop': // sounds/SOUNDS:12
        undefined,
};

// ✂ - - - - - - - - - - - - - - - - -  -   -
// The following are strings that were used once by Snap! but not anymore
// (or just mispelled strings)
// Feel free to delete or keep them for future references
SnapTranslator.dict.pt.deprecated = {
    'add a new sprite':
        'adicionar um novo actor',
    'stop %stopOthersChoices':
        'p\u00E1ra %stopOthersChoices',
    'distance to %dst':
        'a dist\u00E2ncia at\u00E9 %dst',
    'http:// %s':
        'o recurso http:// %s',
    'Snap! website':
        'Ir para o s\u00EDtio Web do Snap!',
    'Save to disk':
        'Guardar no disco',
    'store this project\nin the downloads folder\n(in supporting browsers)':
        'Guardar este projecto\nna sua pasta de descargas\n(em navegadores que o suportem).',
    'unused block(s) removed':
        'blocos n\u00E3o usados removidos',
    'Kind of':
        'Do tipo de',
    'Part of':
        'Uma parte de',
    'detach from':
        'soltar de',
    'Ok':
        'OK',
    'Saved!':
        'Guardado!',
    'Are you sure you want to delete':
        'Quer mesmo remover',
    'Save Project As':
        'Guardar Projecto Como',
    'Single input.':
        'Par\u00E2metro \u00FAnico.',
    'new':
        'Nova',
    'not':
        '\u00E9 falso que',
    'scripts':
        'os gui\u00F5es',
    'check to inherit\nfrom':
        'assinalar para\nherdar de',
    'delete %shd':
        'remove %shd',
    'EXPERIMENTAL! check to enable\nlive custom control structures':
        'EXPERIMENTAL! Assinalar para activar estruturas\nde controlo personalizadas ao vivo.',
    'EXPERIMENTAL! uncheck to disable live\ncustom control structures':
        'EXPERIMENTAL! Desassinalar para desactivar estruturas\nde controlo personalizadas ao vivo.',
    'Snap!Cloud':
        'Snap!Nuvem',
    'could not connect to':
        'N\u00E3o foi poss\u00EDvel ligar a',
    'Service':
        'Servi\u00E7o',
    'login':
        'autentica\u00E7\u00E3o',
    'ERROR: INVALID PASSWORD':
        'ERRO: PALAVRA-PASSE INV\u00C1LIDA',
    'Logout':
        'Sair',
    'Account created.':
        'Conta criada.',
    'An e-mail with your password\nhas been sent to the address provided':
        'Foi enviada uma mensagem para\no endere\u00E7o disponibilizado\ncontendo a sua palavra-passe.',
    'now connected.':
        'entrou.',
    'disconnected.':
        'saiu.',
    'or before':
        'ou antes',
    'saved.':
        'guardado.',
    'Enter one option per line.Optionally use "=" as key/value delimiter\ne.g.\n   the answer=42':
        'Introduza uma op\u00E7\u00E3o por linha. Opcionalmente, use "=" como separador\nentre chave e valor, e.g.\n   a resposta=42',
    'turn pen trails into new costume':
        'transformar tra\u00E7os da caneta em novo traje',
    'last changed':
        'alterado pela \u00FAltima vez em',
    'Are you sure you want to publish':
        'Quer mesmo publicar',
    'Are you sure you want to unpublish':
        'Quer mesmo deixar de publicar',
    'shared.':
        'partilhado.',
    'unshared.':
        'deixado de partilhar.',
    'password has been changed.':
        'a sua palavra-passe foi alterada.',
    'SVG costumes are\nnot yet fully supported\nin every browser':
        'trajes SVG ainda n\u00E3o\ns\u00E3o totalmente suportados\nem todos os navegadores',
    'Select categories of additional blocks to add to this project.':
        'Seleccionar categorias de blocos adicionais a acrescentar a este projecto.',
    'Import sound':
        'Importar som',
    'a variable of name \'':
        'n\u00E3o existe uma vari\u00E1vel \u00AB',
    '\'\ndoes not exist in this context':
        '\u00BB\nneste contexto',
    '(temporary)':
        '(tempor\u00E1ria)',
    'expecting':
        'esperavam-se',
    'input(s), but getting':
        'argumento(s), mas foram passados',
    'export project media only':
        'Exportar apenas os m\u00E9dia do projecto',
    'export project without media':
        'Exportar projecto sem os m\u00E9dia',
    'export project as cloud data':
        'Exportar projecto como dados da nuvem',
    'open shared project from cloud':
        'Abrir projecto partilhado a partir da nuvem',
    'url':
        'URL',
    'experimental -\nunder construction':
        'Experimental \u2013 em constru\u00E7\u00E3o',
    '(in a new window)':
        '(numa nova janela)',
};
