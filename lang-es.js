/*

    lang-es.js

    Spanish translation for Snap!

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
SnapTranslator.dict.es = {
    metadata: {
        'name': // the name as it should appear in the language menu
            'Espa\u00F1ol',
        'english_name': // the english name of the language
            'Spanish',
        'translators': [ // translators authors for the Translators tab
            'V\u00EDctor Manuel Muratalla Morales <victor.muratalla@yahoo.com>',
            'Cristi\u00E1n Rizzi Iribarren <rizzi.cristian@gmail.com>',
            'Alfonso Ruzafa <superruzafa@gmail.com>'
        ],
        'last_changed': // this, too, will appear in the Translators tab
            '2018-02-19',
    },
    strings: {},
};
// ✂ - - - - - - - - - - - - - - - - -  -   -

SnapTranslator.dict.es.strings = {
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
        'El tama\u00F1o de las entradas cacheadas no coincide',
    'cached input does not match': // blocks.js:347
        'Las entradas cacheadas no coinciden',
    'pen trails': // blocks.js:820 blocks.js:8393 objects.js:578 objects.js:7436
        'rastro del l\u00E1piz',
    'stage image': // blocks.js:821
        'imagen del escenario',
    'with inputs': // blocks.js:831
        'con argumentos',
    'block variables': // blocks.js:840 byob.js:1053
        'variables de bloque',
    'Input Names': // blocks.js:844
        'Nombres de entradas',
    'input names': // blocks.js:850
        'par\u00E1metros',
    'Input name': // blocks.js:902 blocks.js:5344
        'Par\u00E1metro',
    '(90) right': // blocks.js:935 morphic.js:4888
        '(90) derecha',
    '(-90) left': // blocks.js:936 morphic.js:4889
        '(-90) izquierda',
    '(0) up': // blocks.js:937 morphic.js:4890
        '(0) arriba',
    '(180) down': // blocks.js:938 morphic.js:4891
        '(180) abajo',
    'random': // blocks.js:939
        'aleatorio',
    '(1) sine': // blocks.js:956
        '(1) \u223F\u223F (onda sinusoidal)',
    '(2) square': // blocks.js:957
        '(2) \u238D\u238D (onda cuadrada)',
    '(3) sawtooth': // blocks.js:958
        '(3) \u2A58\u2A58 (onda dentada)',
    '(4) triangle': // blocks.js:959
        '(4) \u22C0\u22C0 (onda triangular)',
    'January': // blocks.js:968 widgets.js:1941
        'Enero',
    'February': // blocks.js:969 widgets.js:1942
        'Febrero',
    'March': // blocks.js:970 widgets.js:1943
        'Marzo',
    'April': // blocks.js:971 widgets.js:1944
        'Abril',
    'May': // blocks.js:972 widgets.js:1945
        'Mayo',
    'June': // blocks.js:973 widgets.js:1946
        'Junio',
    'July': // blocks.js:974 widgets.js:1947
        'Julio',
    'August': // blocks.js:975 widgets.js:1948
        'Agosto',
    'September': // blocks.js:976 widgets.js:1949
        'Septiembre',
    'October': // blocks.js:977 widgets.js:1950
        'Octubre',
    'November': // blocks.js:978 widgets.js:1951
        'Noviembre',
    'December': // blocks.js:979 widgets.js:1952
        'Diciembre',
    'clicked': // blocks.js:988
        'hagan clic',
    'pressed': // blocks.js:989
        'pulsen',
    'dropped': // blocks.js:990
        'arrastren y me suelten',
    'mouse-entered': // blocks.js:991
        'toquen con el rat\u00F3n',
    'mouse-departed': // blocks.js:992
        'dejen de tocar con el rat\u00F3n',
    'scrolled-up': // blocks.js:993
        'giren la rueda del rat\u00F3n hacia abajo',
    'scrolled-down': // blocks.js:994
        'giren la rueda del rat\u00F3n hacia arriba',
    'year': // blocks.js:1004 widgets.js:2063
        'a\u00F1o',
    'month': // blocks.js:1005
        'mes',
    'date': // blocks.js:1006
        'd\u00EDa',
    'day of week': // blocks.js:1007
        'd\u00EDa de la semana',
    'hour': // blocks.js:1008
        'hora',
    'minute': // blocks.js:1009
        'minuto',
    'second': // blocks.js:1010
        'segundo',
    'time in milliseconds': // blocks.js:1011
        'tiempo en milisegundos',
    'letter': // blocks.js:1021
        'letra',
    'whitespace': // blocks.js:1022
        'espacio',
    'line': // blocks.js:1023 symbols.js:113
        'l\u00EDnea',
    'tab': // blocks.js:1024
        'tabulador',
    'cr': // blocks.js:1025
        'retorno de carro',
    'csv': // blocks.js:1026
        'coma',
    'last': // blocks.js:1036 blocks.js:1048
        '\u00FAltimo',
    'all': // blocks.js:1038 blocks.js:1265 byob.js:3874
        'todos',
    'any': // blocks.js:1049
        'aleatorio',
    'distance': // blocks.js:1058
        'distancia',
    'direction': // blocks.js:1059 blocks.js:2483 blocks.js:8556 objects.js:300
        'direcci\u00F3n',
    'color': // blocks.js:1117 morphic.js:4132 morphic.js:4135 morphic.js:12219 morphic.js:12222
        'color',
    'fisheye': // blocks.js:1118
        'ojo de pez',
    'whirl': // blocks.js:1119
        'remolino',
    'pixelate': // blocks.js:1120
        'pixelado',
    'mosaic': // blocks.js:1121
        'mosaico',
    'duplicate': // blocks.js:1122 blocks.js:2545 blocks.js:11904 gui.js:7368 gui.js:7710 morphic.js:4167 objects.js:3236
        'duplicar',
    'negative': // blocks.js:1123
        'negativo',
    'comic': // blocks.js:1124
        'historieta',
    'confetti': // blocks.js:1125
        'confeti',
    'saturation': // blocks.js:1126
        'saturaci\u00F3n',
    'brightness': // blocks.js:1127
        'brillo',
    'ghost': // blocks.js:1128
        'fantasma',
    'any key': // blocks.js:1146
        'cualquier tecla',
    'up arrow': // blocks.js:1147
        '\u2191 (flecha arriba)',
    'down arrow': // blocks.js:1148
        '\u2193 (flecha abajo)',
    'right arrow': // blocks.js:1149
        '\u2192 (flecha derecha)',
    'left arrow': // blocks.js:1150
        '\u2190 (flecha izquierda)',
    'space': // blocks.js:1151
        'espacio',
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
        'valor absoluto',
    'ceiling': // blocks.js:1227 morphic.js:7085 morphic.js:7088
        'techo',
    'floor': // blocks.js:1228 morphic.js:7069 morphic.js:7072
        'suelo',
    'sqrt': // blocks.js:1229
        'ra\u00EDz cuadrada',
    'sin': // blocks.js:1230
        'seno',
    'cos': // blocks.js:1231
        'coseno',
    'tan': // blocks.js:1232
        'tangente',
    'asin': // blocks.js:1233
        'arcoseno',
    'acos': // blocks.js:1234
        'arcocoseno',
    'atan': // blocks.js:1235
        'arcotangente',
    'ln': // blocks.js:1236
        'ln',
    'log': // blocks.js:1237
        'log',
    'e^': // blocks.js:1238
        'e^',
    '10^': // blocks.js:1239
        '10^',
    'encode URI': // blocks.js:1249
        'codificar URI',
    'decode URI': // blocks.js:1250
        'decodificar URI',
    'encode URI component': // blocks.js:1251
        'codificar componente URI',
    'decode URI component': // blocks.js:1252
        'decodificar componente URI',
    'XML escape': // blocks.js:1253
        'escapar XML',
    'XML unescape': // blocks.js:1254
        'desescapar XML',
    'hex sha512 hash': // blocks.js:1255
        'hash sha512 (hexadecimal)',
    'this script': // blocks.js:1266
        'este programa',
    'this block': // blocks.js:1267
        'este bloque',
    'all but this script': // blocks.js:1268
        'todos los programas excepto este',
    'other scripts in sprite': // blocks.js:1269
        'el resto de programas del objeto',
    'String': // blocks.js:1290
        'String',
    'Number': // blocks.js:1291 byob.js:3286
        'N\u00FAmero',
    'true': // blocks.js:1292 blocks.js:9529 blocks.js:9919 objects.js:2979
        'verdadero',
    'false': // blocks.js:1293 blocks.js:9544 blocks.js:9930 objects.js:2979
        'falso',
    'code': // blocks.js:1334
        'c\u00F3digo',
    'header': // blocks.js:1335
        'cabecera',
    'list': // blocks.js:1408 blocks.js:8487
        'lista',
    'item': // blocks.js:1409
        'elemento',
    'delimiter': // blocks.js:1410
        'delimitador',
    'collection': // blocks.js:1419
        'colecci\u00F3n',
    'variables': // blocks.js:1420
        'variables',
    'parameters': // blocks.js:1421
        'par\u00E1metros',
    'untitled': // blocks.js:1993 blocks.js:2604 blocks.js:6443 blocks.js:11919 byob.js:1037 byob.js:3910 gui.js:979 gui.js:4036 store.js:296
        'Sin t\u00EDtulo',
    '{{ projectName }} script pic': // blocks.js:1993 blocks.js:2602 blocks.js:6441 byob.js:1035
        'imagen de programa de {{ projectName }}',
    'script target cannot be found for orphaned block': // blocks.js:2203
        'No se pudo encontrar el programa objetivo para el bloque hu\u00E9rfano',
    'a {{ className }} ("{{ value }}...")': // blocks.js:2207 morphic.js:8466 morphic.js:9146
        undefined,
    'Variable name': // blocks.js:2377 blocks.js:3262 objects.js:2179 objects.js:7304
        'Nombre de variable',
    'help': // blocks.js:2386 objects.js:1851 objects.js:2308
        'ayuda',
    'script pic with result': // blocks.js:2393
        'imagen de programa con resultado',
    'open a new window\nwith a picture of both\nthis script and its result': // blocks.js:2397
        'abre una nueva ventana\ncon una imagen de este programa\ny su resultado',
    'rename': // blocks.js:2409 blocks.js:2458 blocks.js:2521 gui.js:7708 gui.js:8409 morphic.js:7656
        'renombrar',
    'rename only\nthis reporter': // blocks.js:2413 blocks.js:2462 blocks.js:2523
        'renombra s\u00F3lo\neste reportero',
    'rename all': // blocks.js:2416 blocks.js:2465
        'renombrar todos',
    'rename all blocks that\naccess this variable': // blocks.js:2418 blocks.js:2467
        'renombra todos los bloques\nque acceden a esta variable',
    'inherited': // blocks.js:2426 blocks.js:2437 blocks.js:2490 blocks.js:6370 byob.js:1099 byob.js:1121
        'herencia',
    'uncheck to\ndisinherit': // blocks.js:2431 blocks.js:2495 blocks.js:6375 byob.js:1113
        'desmarcar para no heredar',
    'check to inherit\nfrom {{ name }}': // blocks.js:2443 blocks.js:2496 blocks.js:6376 byob.js:1125
        'marcar para heredar\nde {{ name }}',
    'transient': // blocks.js:2450
        'transitoria',
    'uncheck to save contents\nin the project': // blocks.js:2453
        'desmarcar para guardar\nel contenido junto con el proyecto',
    'check to prevent contents\nfrom being saved': // blocks.js:2454
        'marcar para no guardar\nel contenido junto con el proyecto',
    'hide': // blocks.js:2472 morphic.js:4214 objects.js:394
        'esconder',
    'x position': // blocks.js:2481 blocks.js:8554 objects.js:288
        'posici\u00F3n x',
    'y position': // blocks.js:2482 blocks.js:8555 objects.js:294
        'posici\u00F3n y',
    'size': // blocks.js:2484 blocks.js:8559 objects.js:382
        'tama\u00F1o',
    'costume #': // blocks.js:2485 blocks.js:8557 blocks.js:8561 objects.js:317
        '# de disfraz',
    'header mapping': // blocks.js:2507 blocks.js:2677
        'mapeo a cabecera',
    'code mapping': // blocks.js:2511 blocks.js:2681
        'mapeo a c\u00F3digo',
    'relabel': // blocks.js:2527 blocks.js:2538
        'renombrar',
    'make a copy\nand pick it up': // blocks.js:2564 blocks.js:11908 morphic.js:4171
        'crea una copia y\npermite moverla a otra parte',
    'only duplicate this block': // blocks.js:2586
        'duplica s\u00F3lo este bloque',
    'delete': // blocks.js:2590 blocks.js:11910 gui.js:7372 gui.js:7711 gui.js:8410 morphic.js:4215 objects.js:3242
        'eliminar',
    'script pic': // blocks.js:2594 byob.js:1030
        'imagen de programa',
    'open a new window\nwith a picture of this script': // blocks.js:2608 byob.js:1041
        'abre una nueva ventana\ncon una imagen de este programa',
    'download script': // blocks.js:2612
        'descargar programa',
    '{{ name }} script': // blocks.js:2622
        'programa {{ name }}',
    'download this script\nas an XML file': // blocks.js:2627
        'descarga este programa en XML',
    'unringify': // blocks.js:2657
        'desencapsular',
    'ringify': // blocks.js:2661 blocks.js:2673
        'encapsular',
    'delete block': // blocks.js:2691
        'eliminar bloque',
    'spec': // blocks.js:2692 blocks.js:2699
        'definici\u00F3n',
    'Help': // blocks.js:2980 blocks.js:2997
        'Ayuda',
    'Enter code that corresponds to the block\'s definition. Use the formal parameter\nnames as shown and <body> to reference the definition body\'s generated text code.': // blocks.js:3026
        'Escribe el c\u00F3digo correspondiente a la definici\u00F3n del bloque.\nUsa los nombres de los par\u00E1metros formales aqu\u00ED mostrados\ny <body> para referenciar el c\u00F3digo generado del cuerpo de la definici\u00F3n.',
    'Enter code that corresponds to the block\'s definition. Choose your own\nformal parameter names (ignoring the ones shown).': // blocks.js:3029
        'Escribe el c\u00F3digo correspondiente a la definici\u00F3n del bloque.\nPuedes usar tus propios par\u00E1metros formales (ignora los aqu\u00ED mostrados).',
    'Header mapping': // blocks.js:3043
        'Mapeo a cabecera',
    'Code mapping': // blocks.js:3072
        'Mapeo a c\u00F3digo',
    'Enter code that corresponds to the block\'s operation (usually a single\nfunction invocation). Use <#n> to reference actual arguments as shown.': // blocks.js:3077
        'Escribe el c\u00F3digo correspondiente a la implementaci\u00F3n del bloque\n(normalmente una \u00FAnica llamada a funci\u00F3n).\nUsa <#n> para referenciar los argumentos aqu\u00ED mostrados.',
    'Variable exists': // blocks.js:3292
        'Variable ya existente',
    'A variable with this name already exists in this context.': // blocks.js:3294
        'Ya existe una variable con este nombre en este contexto.',
    'A variable with this name already exists as a global variable.': // blocks.js:3396
        'Ya existe una variable con este nombre como variable global.',
    'A variable with this name already exists as a sprite local variable.': // blocks.js:3455
        'Ya existe una variable con este nombre como variable local de objeto',
    'Block variable name': // blocks.js:5346
        'Nombre de variable de bloque',
    'Script variable name': // blocks.js:5348
        'Nombre de variable de programa',
    'undrop': // blocks.js:6320 blocks.js:6709
        'deshacer',
    'undo the last\nblock drop\nin this pane': // blocks.js:6324
        'deshace el \u00FAltimo cambio\nhecho con bloques',
    'redrop': // blocks.js:6335 blocks.js:6722
        'rehacer',
    'redo the last undone\nblock drop\nin this pane': // blocks.js:6339
        'rehace el \u00FAltimo cambio\ndeshecho con bloques',
    'clear undrop queue': // blocks.js:6345
        'vaciar historial de cambios',
    'forget recorded block drops\non this pane': // blocks.js:6351
        'olvida el historial\nde cambios hechos con bloques',
    'clean up': // blocks.js:6359
        'ordenar',
    'arrange scripts\nvertically': // blocks.js:6359
        'alinea los programas\nverticalmente',
    'add comment': // blocks.js:6360
        'a\u00F1adir comentario',
    'scripts pic': // blocks.js:6362
        'imagen de programas',
    'open a new window\nwith a picture of all scripts': // blocks.js:6364
        'abre una nueva ventana\ncon una imagen de todos los programas',
    'make a block': // blocks.js:6380
        'crear bloque',
    'Make a block': // blocks.js:6398 objects.js:2303 objects.js:2352 objects.js:2411
        'Crear bloque',
    'nothing to undrop': // blocks.js:6549
        'nada que deshacer',
    'unsupported action for {{ morph }}': // blocks.js:6640
        'Acci\u00F3n no soportada para {{ morph }}',
    'use the keyboard\nto enter blocks': // blocks.js:6747
        'permite utilizar el teclado\npara escribir bloques',
    'script target cannot be found for orphaned scripts': // blocks.js:6925
        'No se encuentra el programa objetivo para los programas hu\u00E9rfanos',
    'choose new parent': // blocks.js:7225 morphic.js:4253
        'elegir nuevo padre',
    'new message': // blocks.js:8338 blocks.js:8370
        'nuevo mensaje',
    'Message name': // blocks.js:8345 blocks.js:8377
        'Nombre de mensaje',
    'any message': // blocks.js:8360
        'cualquier mensaje',
    'mouse-pointer': // blocks.js:8391 blocks.js:8420
        'puntero del rat\u00F3n',
    'edge': // blocks.js:8392
        'borde del escenario',
    'random position': // blocks.js:8418
        'posición aleatoria',
    'myself': // blocks.js:8445
        'm\u00ED mismo',
    'number': // blocks.js:8484
        'n\u00FAmero',
    'text': // blocks.js:8485 morphic.js:12305
        'texto',
    'Boolean': // blocks.js:8486
        'booleano',
    'sprite': // blocks.js:8490
        'objeto',
    'costume': // blocks.js:8492 objects.js:3069
        'disfraz',
    'sound': // blocks.js:8493
        'sonido',
    'command': // blocks.js:8494
        'comando',
    'reporter': // blocks.js:8495
        'reportero',
    'predicate': // blocks.js:8496
        'predicado',
    'neighbors': // blocks.js:8502
        'vecinos',
    'self': // blocks.js:8503
        'mismo',
    'other sprites': // blocks.js:8504
        'otros objetos',
    'clones': // blocks.js:8505
        'clones',
    'other clones': // blocks.js:8506
        'otros clones',
    'parts': // blocks.js:8508
        'partes',
    'anchor': // blocks.js:8509
        'anclaje',
    'stage': // blocks.js:8511 symbols.js:95
        'escenario',
    'children': // blocks.js:8513
        'hijos',
    'parent': // blocks.js:8514 gui.js:7178 gui.js:7385
        'padre',
    'temporary?': // blocks.js:8516
        '\u00BFsoy temporal?',
    'name': // blocks.js:8519
        'nombre',
    'costumes': // blocks.js:8520
        'disfraces',
    'sounds': // blocks.js:8521
        'sonidos',
    'dangling?': // blocks.js:8522
        '\u00BFcuelgo de otro objeto?',
    'rotation x': // blocks.js:8523
        'rotaci\u00F3n x',
    'rotation y': // blocks.js:8524
        'rotaci\u00F3n y',
    'center x': // blocks.js:8525
        'centro x',
    'center y': // blocks.js:8526
        'centro y',
    'costume name': // blocks.js:8558 blocks.js:8562
        'nombre del disfraz',
    'Turtle': // blocks.js:8582 gui.js:7941 objects.js:3166 threads.js:3349
        'Tortuga',
    'Empty': // blocks.js:8584 gui.js:7941 objects.js:3166 threads.js:3350
        'Vac\u00EDo',
    'code number mapping': // blocks.js:8835
        'mapear n\u00FAmero a c\u00F3digo',
    'code string mapping': // blocks.js:8840
        'mapear cadena de caracteres a c\u00F3digo',
    'String <#1>': // blocks.js:8864
        'Cadena de caracteres <#1>',
    'Code mapping - {{ type }}': // blocks.js:8864 blocks.js:8879
        'Mapeo a c\u00F3digo - {{ type }}',
    'Number <#1>': // blocks.js:8879
        'N\u00FAmero <#1>',
    'code true mapping': // blocks.js:9500
        'mapear verdadero a c\u00F3digo',
    'code false mapping': // blocks.js:9505
        'mapear falso a c\u00F3digo',
    'Code mapping - {{ name }}': // blocks.js:9529 blocks.js:9544 blocks.js:10662
        'Mapeo a c\u00F3digo - {{ name }}',
    'code list mapping': // blocks.js:10619
        'mapear lista a c\u00F3digo',
    'code item mapping': // blocks.js:10623
        'mapear elemento a c\u00F3digo',
    'code delimiter mapping': // blocks.js:10627
        'mapear delimitador a c\u00F3digo',
    'list item delimiter': // blocks.js:10642
        'delimitador de elemento de lista',
    'list contents <#1>': // blocks.js:10646
        'contenido de lista <#1>',
    'list item <#1>': // blocks.js:10650
        'elemento de lista <#1>',
    'input list': // blocks.js:10750
        'con lista de argumentos',
    'add comment here': // blocks.js:11762
        'a\u00F1adir comentario aqu\u00ED',
    'comment pic': // blocks.js:11912
        'imagen de comentario',
    '{{ projectName }} comment pic': // blocks.js:11917
        'imagen de comentario de {{ projectName }}',
    'open a new window\nwith a picture of this comment': // blocks.js:11923
        'abre una nueva ventana\ncon una imagen de este comentario',
    'Change block': // byob.js:885
        'Cambiar bloque',
    '{{ varName }} (temporary)': // byob.js:1011 objects.js:9431 threads.js:1670
        '{{ varName }} (temporal)',
    'translations': // byob.js:1044
        'traducciones',
    'experimental': // byob.js:1048 byob.js:1057 byob.js:1065
        'experimental',
    'under construction': // byob.js:1048 byob.js:1057 byob.js:1065
        'en construcción',
    'remove block variables': // byob.js:1061
        'eliminar variables de bloque',
    'duplicate block definition': // byob.js:1079
        'duplicar definici\u00F3n de bloque',
    'delete block definition': // byob.js:1089 byob.js:1133 byob.js:1147
        'eliminar definici\u00F3n de bloque',
    'edit': // byob.js:1157 gui.js:7699 morphic.js:8730 morphic.js:9477 objects.js:3255 objects.js:3261 objects.js:7422
        'editar',
    'Delete Custom Block': // byob.js:1228
        'Eliminar bloque personalizado',
    'Are you sure you want to delete this\ncustom block and all its instances?': // byob.js:1229
        '\u00BFSeguro que quieres eliminar\neste bloque personalizado\ny todas sus instancias?',
    'OK': // byob.js:1648 byob.js:2117 byob.js:3237 byob.js:3848 gui.js:3713 morphic.js:3958 morphic.js:4028 morphic.js:4054 objects.js:8312 paint.js:161 tables.js:1212 widgets.js:1574 widgets.js:1708 widgets.js:1791 widgets.js:1874 widgets.js:2155 widgets.js:2434
        'Aceptar',
    'Cancel': // byob.js:1649 byob.js:2120 byob.js:3243 byob.js:3849 gui.js:3371 gui.js:3714 gui.js:5941 gui.js:6843 gui.js:8996 gui.js:9134 morphic.js:4031 morphic.js:4057 objects.js:8313 paint.js:162 widgets.js:1709 widgets.js:1792 widgets.js:1887 widgets.js:2156
        'Cancelar',
    'Command': // byob.js:1770
        'Comando',
    'Reporter': // byob.js:1779 byob.js:3290
        'Reportero',
    'Predicate': // byob.js:1788 byob.js:3291
        'Predicado',
    'for all sprites': // byob.js:1850 byob.js:3662
        'para todos los objetos',
    'for this sprite only': // byob.js:1855 byob.js:3667
        's\u00F3lo para este objeto',
    'Block Editor': // byob.js:2065
        'Editor de bloques',
    'Method Editor': // byob.js:2066
        'Editor de m\u00E9todos',
    'Apply': // byob.js:2119
        'Aplicar',
    'Local Block(s) in Global Definition': // byob.js:2204
        'Bloque(s) local(es) en definici\u00F3n global',
    'This global block definition contains one or more\nlocal custom blocks which must be removed first.': // byob.js:2205
        'Esta definici\u00F3n de bloque global contiene\nuno o m\u00E1s bloques personalizados locales que deben ser eliminados primero.',
    'Same Named Blocks': // byob.js:2221
        'Bloques con mismo nombre',
    'Another custom block with this name exists.\nWould you like to replace it?': // byob.js:2222
        'Ya existe otro bloque personalizado con este nombre.\n\u00BFQuieres reemplazarlo?',
    'Custom Block Translations': // byob.js:2373
        'Traducciones del bloque personalizado',
    'Enter one translation per line. use colon (":") as lang/spec delimiter\nand underscore ("_") as placeholder for an input, e.g.:\n\nen:say _ for _ secs': // byob.js:2379
        'Escribe cada traducci\u00F3n en una l\u00EDnea.\nUtiliza (:) para separar el idioma y el mensaje\ny (_) para argumentos de entrada, por ejemplo:\n\n  es:decir _ durante _ segs',
    'Edit label fragment': // byob.js:2752
        'Editar fragmento de texto',
    'Create input name': // byob.js:2754
        'Crear par\u00E1metro',
    'Edit input name': // byob.js:2755
        'Editar par\u00E1metro',
    'new line': // byob.js:2800 byob.js:3266
        'nueva l\u00EDnea',
    'Title text': // byob.js:3061
        'Texto',
    'Delete': // byob.js:3239 gui.js:5940
        'Eliminar',
    'Object': // byob.js:3283
        'Objeto',
    'Text': // byob.js:3284
        'Texto',
    'List': // byob.js:3285
        'Lista',
    'Any type': // byob.js:3287
        'Cualquier tipo',
    'Boolean (T/F)': // byob.js:3288
        'Booleano (V/F)',
    'Command\n(inline)': // byob.js:3289
        'Comando\n(en l\u00EDnea)',
    'Command\n(C-shape)': // byob.js:3292
        'Comando\n(tipo C)',
    'Any\n(unevaluated)': // byob.js:3293
        'Cualquier tipo\n(no evaluado)',
    'Boolean\n(unevaluated)': // byob.js:3294
        'Booleano\n(no evaluado)',
    'Single input': // byob.js:3299
        'Entrada simple',
    'Multiple inputs (value is list of inputs)': // byob.js:3304
        'Entrada m\u00FAltiple (valores accesibles como lista)',
    'Upvar - make internal variable visible to caller': // byob.js:3309
        'Salida (hace visible una variable interna)',
    'Default Value': // byob.js:3314
        'Valor predeterminado',
    'options': // byob.js:3570
        'opciones',
    'read-only': // byob.js:3573
        'solo lectura',
    'Input Slot Options': // byob.js:3593
        'Opciones de par\u00E1metro de entrada',
    'Enter one option per line.\nOptionally use "=" as key/value delimiter and {} for submenus. e.g.\n   the answer=42': // byob.js:3597
        'Escribe cada opci\u00F3n en una l\u00EDnea.\nUsa (=) para asignar un valor y {} para submen\u00FAs, por ejemplo:\n  respuesta=42',
    'Export blocks': // byob.js:3776 byob.js:3914 gui.js:3187 gui.js:3835
        'Exportar bloques',
    'select': // byob.js:3873
        'seleccionar',
    'none': // byob.js:3875 objects.js:5421 objects.js:5427
        'ninguno',
    '{{ projectName }} blocks': // byob.js:3910
        'bloques de {{ projectName }}',
    'no blocks were selected': // byob.js:3915 byob.js:4009 byob.js:4102
        'No se ha seleccionado ning\u00FAn bloque',
    'Import blocks': // byob.js:3962 byob.js:3963 byob.js:4008
        'Importar bloques',
    'Imported Blocks Module': // byob.js:4002 byob.js:4003 gui.js:4355
        'M\u00F3dulo de bloques importado',
    'Remove unused blocks': // byob.js:4056 byob.js:4057 byob.js:4101 gui.js:3872
        'Eliminar bloques no utilizados',
    '{{ count }} unused block(s) removed': // byob.js:4096
        'Eliminado(s) {{ count }} bloque(s) no utilizado(s)',
    'There was an error while trying to access\na {{ cloudName }} service. Please try again later.': // cloud.js:90
        'Ocurri\u00F3 un error mientras se intentaba acceder\na un servicio de {{ cloudName }}.\nPor favor, int\u00E9ntalo de nuevo m\u00E1s tarde',
    'Cloud Error': // cloud.js:159
        'Error de la nube',
    'You are not logged in': // cloud.js:188 cloud.js:436
        'No has iniciado sesi\u00F3n',
    'Could not retrieve current user': // cloud.js:237
        'No se pudo recuperar el usuario actual',
    'Could not retrieve user': // cloud.js:247
        'No se pudo recuperar el usuario',
    'logout failed': // cloud.js:258
        'Fallo al cerrar sesi\u00F3n',
    'login failed': // cloud.js:280
        'Fallo al iniciar sesi\u00F3n',
    'signup failed': // cloud.js:303
        'Fallo al registrarse',
    'Could not change password': // cloud.js:323
        'No se pudo cambiar la contrase\u00F1a',
    'Password reset request failed': // cloud.js:334
        'Fallo al solicitar el reinicio de contrase\u00F1a',
    'Could not send verification email': // cloud.js:344
        'No se pudo enviar el correo de verificaci\u00F3n',
    'Cannot Save Project': // cloud.js:378
        'No se pudo guardar el proyecto',
    'The media inside this project exceeds {{ size }}.\nPlease reduce the size of costumes or sounds.\n': // cloud.js:379
        'Los medios de este proyecto exceden los {{ size }}.\nPor favor, reduce el tama\u00F1o de disfraces y sonidos',
    'Project media exceeds {{ size }} size limit': // cloud.js:387
        'Los medios del proyecto exceden el l\u00EDmite de {{ size }}',
    'Serialization of program data failed': // cloud.js:398 cloud.js:401
        'Fallo en la serializaci\u00F3n de los datos de programa',
    'Serialization of media failed': // cloud.js:409 cloud.js:412
        'Fallo en la serializaci\u00F3n de los medios del programa',
    'Uploading {{ size }}': // cloud.js:419
        'Subiendo {{ size }}',
    'Project could not be saved': // cloud.js:429
        'No se pudo guardar el proyecto',
    'Could not fetch projects': // cloud.js:456 cloud.js:490
        'No se pudieron recuperar los proyectos',
    'Could not fetch thumbnail': // cloud.js:509
        'No se pudo recuperar la miniatura',
    'Could not fetch project {{ name }}': // cloud.js:520 cloud.js:536
        'No se pudo recuperar el proyecto {{ name }}',
    'Could not fetch metadata for {{ name }}': // cloud.js:552
        'No se pudieron recuperar los metadatos para {{ name }}',
    'Could not delete project': // cloud.js:568
        'No se pudo eliminar el proyecto',
    'Could not share project': // cloud.js:586
        'No se pudo compartir el proyecto',
    'Could not unshare project': // cloud.js:604
        'No se pudo dejar de compartir el proyecto',
    'Could not publish project': // cloud.js:622
        'No se pudo publicar el proyecto',
    'Could not unpublish project': // cloud.js:640
        'No se pudo dejar de publicar el proyecto',
    'Could not update project notes': // cloud.js:655
        'No se pudieron actualizar las notas del proyecto',
    'Unverified account': // gui.js:281 gui.js:5252
        'Cuenta no verificada',
    'Your account is still unverified.\nPlease use the verification link that\nwas sent to your email address when you\nsigned up.\n\nIf you cannot find that email, please\ncheck your spam folder. If you still\ncannot find it, please use the "Resend\nVerification Email..." option in the cloud\nmenu.': // gui.js:282
        'Tu cuenta a\u00FAn no ha sido verificada.\nPor favor, usa el enlace de verificaci\u00F3n\nque fue enviado a tu direcci\u00F3n de correo\ncuando te registraste.\n\nSi no puedes encontrar dicho correo, por favor,\ncomprueba tu carpeta de spam.\nSi a\u00FAn as\u00ED no lo puedes encontrar, por favor,\nutiliza la opci\u00F3n "Reenviar correo de verificaci\u00F3n..."\nen el men\u00FA de nube.',
    'unable to retrieve {{ resource }}': // gui.js:337 gui.js:5689 gui.js:5700 morphic.js:11546
        'No se pudo recuperar {{ resource }}',
    'unable to retrieve project': // gui.js:339
        'No se pudo recuperar el proyecto',
    'Fetching project\nfrom the cloud': // gui.js:417 gui.js:458 gui.js:494 gui.js:2612 gui.js:6391
        'Descargando proyecto\ndesde la nube',
    'Opening project': // gui.js:430 gui.js:470 gui.js:2627 gui.js:4222
        'Abriendo proyecto',
    'Saved project\n{{ name }}': // gui.js:506
        'Proyecto guardado\n{{ name }}',
    'Visible stepping': // gui.js:716 gui.js:2756
        'Depuraci\u00F3n paso a paso',
    'development mode': // gui.js:990 morphic.js:12252
        'modo desarrollador',
    'don\'t rotate': // gui.js:1222
        'no girar',
    'can rotate': // gui.js:1223
        'puede girar',
    'only face left/right': // gui.js:1224
        's\u00F3lo mirar a izquierda y derecha',
    'draggable': // gui.js:1329
        'arrastrable',
    'Scripts': // gui.js:1371 gui.js:4179
        'Programas',
    'Costumes': // gui.js:1391 gui.js:3252 gui.js:3255 gui.js:4156
        'Disfraces',
    'Backgrounds': // gui.js:1392 gui.js:3252 gui.js:3255
        'Fondos de escenario',
    'Sounds': // gui.js:1411 gui.js:3262 gui.js:3264 gui.js:4167
        'Sonidos',
    'add a new Turtle sprite': // gui.js:1545
        'a\u00F1ade una nueva tortuga',
    'paint a new sprite': // gui.js:1567
        'dibuja un nuevo objeto',
    'take a camera snapshot and\nimport it as a new sprite': // gui.js:1592
        'hace una captura de c\u00E1mara\n y la importa como nuevo objeto',
    'Unable to import this image': // gui.js:1906
        'No se pudo importar esta imagen',
    'The picture you wish to import has been\ntainted by a restrictive cross-origin policy\nmaking it unusable for costumes in {{ appName }}.\n\nTry downloading this picture first to your\ncomputer, and import it from there.': // gui.js:1907
        'La imagen que quieres importar ha sido corrompida\npor una pol\u00EDtica restrictiva de control de acceso,\nhaci\u00E9ndola inutilizable para disfraces en {{ appName }}.\n\nPrueba a descargar esta imagen primero a tu ordenador\ne imp\u00F3rtala desde ah\u00ED.',
    'Serialization failed': // gui.js:2138 gui.js:4684 gui.js:4980 gui.js:5139
        'Fallo en la serializaci\u00F3n',
    'recording': // gui.js:2353
        'Grabaci\u00F3n',
    'About': // gui.js:2471
        'Acerca de',
    'Reference manual': // gui.js:2474
        'Manual de referencia',
    '{{ site }} website': // gui.js:2481
        'Sitio web de {{ site }}',
    'Download source': // gui.js:2487
        'Descargar c\u00F3digo fuente',
    'Switch back to user mode': // gui.js:2498
        'Regresar a modo usuario',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones': // gui.js:2500
        'desactiva los menus contextuales de Morphic\ny muestra unos m\u00E1s f\u00E1ciles de utilizar',
    'Switch to dev mode': // gui.js:2507
        'Cambiar a modo desarrollador',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!': // gui.js:2509
        'activa los menus contextuales\n e inspectores de Morphic\n(\u00A1no son f\u00E1ciles de utilizar)',
    'Cloud URL': // gui.js:2527 gui.js:5654
        'URL de la nube',
    'Login': // gui.js:2536
        'Iniciar sesi\u00F3n',
    'Signup': // gui.js:2540
        'Registrarse',
    'Reset Password': // gui.js:2544
        'Reiniciar contrase\u00F1a',
    'Resend Verification Email': // gui.js:2548
        'Reenviar correo de verificaci\u00F3n',
    'Logout {{ username }}': // gui.js:2553
        'Cerrar sesi\u00F3n {{ username }}',
    'Change Password': // gui.js:2557 gui.js:5420
        'Cambiar contrase\u00F1a',
    'Export project media only': // gui.js:2564
        'Exportar s\u00F3lo medios del proyecto',
    'Export Project As': // gui.js:2569 gui.js:2583 gui.js:2597 gui.js:3158 gui.js:3176
        'Exportar proyecto como',
    'Export project without media': // gui.js:2578
        'Exportar proyecto sin medios',
    'Export project as cloud data': // gui.js:2592
        'Exportar proyecto como datos de la nube',
    'Open shared project from cloud': // gui.js:2607
        'Abrir proyecto compartido en la nube',
    'Author name': // gui.js:2609
        'Nombre de autor',
    'Project name': // gui.js:2610
        'Nombre del proyecto',
    'Language': // gui.js:2676
        'Idioma',
    'Generate {{ filename }} file': // gui.js:2679 gui.js:5035
        'Generar fichero {{ filename }}',
    'builds the {{ language }} translation file': // gui.js:2684
        'construye el fichero de traducci\u00F3n al {{ language }}',
    'Zoom blocks': // gui.js:2692 gui.js:5120
        'Tama\u00F1o de bloque',
    'Stage size': // gui.js:2696 gui.js:5163
        'Tama\u00F1o del escenario',
    'Dragging threshold': // gui.js:2701 gui.js:5226
        'Umbral de arrastre',
    'specify the distance the hand has to move\nbefore it picks up an object': // gui.js:2703
        'especifica cu\u00E1nto hay que arrastrar\nun objeto para comenzar a moverlo',
    'Retina display support': // gui.js:2725
        'Soporte para pantallas Retina',
    'uncheck for lower resolution,\nsaves computing resources': // gui.js:2728
        'desmarcar para una menor resoluci\u00F3n\n(ahorra recursos de computaci\u00F3n)',
    'check for higher resolution,\nuses more computing resources': // gui.js:2729
        'marcar para una mayor resoluci\u00F3n\n(usa m\u00E1s recursos de computaci\u00F3n)',
    'Input sliders': // gui.js:2733
        'Deslizadores en campos de entrada',
    'uncheck to disable\ninput sliders for\nentry fields': // gui.js:2736
        'desmarcar para desactivar\nlos deslizadores\nen los campos de entrada',
    'check to enable\ninput sliders for\nentry fields': // gui.js:2737
        'marcar para activar\nlos deslizadores\nen los campos de entrada',
    'Execute on slider change': // gui.js:2741
        'Ejecutar cuando un deslizador cambie',
    'uncheck to suppress\nrunning scripts\nwhen moving the slider': // gui.js:2744
        'desmarcar para no ejecutar el programa\ncuando se mueva el deslizador',
    'check to run\nthe edited script\nwhen moving the slider': // gui.js:2745
        'marcar para ejecutar el programa\ncuando se mueva el deslizador',
    'Turbo mode': // gui.js:2749
        'Modo turbo',
    'uncheck to run scripts\nat normal speed': // gui.js:2752
        'desmarcar para ejecutar\nlos programas a velocidad normal',
    'check to prioritize\nscript execution': // gui.js:2753
        'marcar para priorizar\nla ejecuci\u00F3n del programa',
    'uncheck to turn off\nvisible stepping': // gui.js:2759
        'desmarcar para desactivar\nla depuraci\u00F3n paso a paso',
    'check to turn on\nvisible stepping (slow)': // gui.js:2760
        'marcar para activar\nla depuraci\u00F3n paso a paso (lento)',
    'Ternary Boolean slots': // gui.js:2764
        'Huecos booleanos triestado',
    'uncheck to limit\nBoolean slots to true / false': // gui.js:2770
        'desmarcar para restringir\nlos huecos booleanos a verdadero / falso',
    'check to allow\nempty Boolean slots': // gui.js:2771
        'marcar para permitir\nhuecos booleanos vac\u00EDos',
    'Camera support': // gui.js:2775
        'Soporte para c\u00E1mara',
    'uncheck to disable\ncamera support': // gui.js:2778
        'desmarcar para desactivar\nel soporte para c\u00E1mara',
    'check to enable\ncamera support': // gui.js:2779
        'marcar para activar\nel soporte para c\u00E1mara',
    'Blurred shadows': // gui.js:2784
        'Sombras difuminadas',
    'uncheck to use solid drop\nshadows and highlights': // gui.js:2787
        'desmarcar para usar sombras\ny brillos s\u00F3lidos',
    'check to use blurred drop\nshadows and highlights': // gui.js:2788
        'marcar para usar sombras\ny brillos difuminados',
    'Zebra coloring': // gui.js:2792
        'Coloreado de cebra',
    'uncheck to disable alternating\ncolors for nested block': // gui.js:2795
        'desmarcar para desactivar\nla alternaci\u00F3n de colores\npara bloques anidados',
    'check to enable alternating\ncolors for nested blocks': // gui.js:2796
        'marcar para activar\nla alternaci\u00F3n\nde colores\npara bloques anidados',
    'Dynamic input labels': // gui.js:2800
        'Etiquetas de entrada din\u00E1micas',
    'uncheck to disable dynamic\nlabels for variadic inputs': // gui.js:2803
        'desmarcar para desactivar\nlas etiquetas din\u00E1micas\npara entradas variables',
    'check to enable dynamic\nlabels for variadic inputs': // gui.js:2804
        'marcar para activar\nlas etiquetas din\u00E1micas\npara entradas variables',
    'Prefer empty slot drops': // gui.js:2808
        'Dar preferencia a huecos vac\u00EDos',
    'uncheck to allow dropped\nreporters to kick out others': // gui.js:2811
        'desmarcar para permitir que los bloques puedan\nocupar el lugar de otros al ser soltados',
    'check to focus on empty slots\nwhen dragging & dropping reporters': // gui.js:2812
        'marcar para impedir que los bloques puedan\nocupar el lugar de otros al ser soltados',
    'Long form input dialog': // gui.js:2816
        'Editor de par\u00E1metros extendido',
    'uncheck to use the input\ndialog in short form': // gui.js:2819
        'desmarcar para ocultar autom\u00E1ticamente\nlos tipos en el editor de par\u00E1metros',
    'check to always show slot\ntypes in the input dialog': // gui.js:2820
        'marcar para mostrar autom\u00E1ticamente\nlos tipos en el editor de par\u00E1metros',
    'Plain prototype labels': // gui.js:2823
        'Etiquetas planas',
    'uncheck to always show (+) symbols\nin block prototype labels': // gui.js:2826
        'desmarcar para mostrar los (+)\ndurante la definici\u00F3n de bloques',
    'check to hide (+) symbols\nin block prototype labels': // gui.js:2827
        'marcar para ocultar los (+)\ndurante la definici\u00F3n de bloques',
    'Virtual keyboard': // gui.js:2830
        'Teclado virtual',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices': // gui.js:2833
        'desmarcar para desactivar\nel soporte para teclado virtual\npara dispositivos m\u00F3viles',
    'check to enable\nvirtual keyboard support\nfor mobile devices': // gui.js:2834
        'marcar para activar\nel soporte para teclado virtual\npara dispositivos m\u00F3viles',
    'Clicking sound': // gui.js:2838
        'Sonido de clic',
    'uncheck to turn\nblock clicking\nsound off': // gui.js:2848
        'desmarcar para que no suene un "clic"\ncuando se coloca un bloque',
    'check to turn\nblock clicking\nsound on': // gui.js:2849
        'marcar para que suene un "clic"\ncuando se coloca un bloque',
    'Animations': // gui.js:2852
        'Animaciones',
    'uncheck to disable\nIDE animations': // gui.js:2855
        'desmarcar para desactivar\nlas animaciones del IDE',
    'check to enable\nIDE animations': // gui.js:2856
        'marcar para activar\nlas animaciones del IDE',
    'Cache Inputs': // gui.js:2860
        'Cachear entradas',
    'uncheck to stop caching\ninputs (for debugging the evaluator)': // gui.js:2866
        'desmarcar para no cachear entradas\n(para depurar el evaluador)',
    'check to cache inputs\nboosts recursion': // gui.js:2867
        'marcar para cachear entradas\n(dispara la recusi\u00F3n)',
    'Rasterize SVGs': // gui.js:2871
        'Rasterizar SVGs',
    'uncheck for smooth\nscaling of vector costumes': // gui.js:2877
        'desmarcar para usar escalado suave\nen im\u00E1genes vectoriales',
    'check to rasterize\nSVGs on import': // gui.js:2878
        'marcar para rasterizar los SVGs\ntras haberlos importado',
    'Flat design': // gui.js:2882
        'Dise\u00F1o plano',
    'uncheck for default\nGUI design': // gui.js:2890
        'desmarcar para utilizar\nla interfaz predeterminada',
    'check for alternative\nGUI design': // gui.js:2891
        'marcar para utilizar\nla interfaz alternativa',
    'Nested auto-wrapping': // gui.js:2895
        'Encapsular bloques internos',
    'uncheck to confine auto-wrapping\nto top-level block stacks': // gui.js:2906
        'desmarcar para que bloques tipo C\ns\u00F3lo puedan encapsular a otros m\u00E1s externos',
    'check to enable auto-wrapping\ninside nested block stacks': // gui.js:2907
        'marcar para permitir que bloques tipo C\npuedan encapsular a otros m\u00E1s internos',
    'Project URLs': // gui.js:2911
        'URLs con datos de proyecto',
    'uncheck to disable\nproject data in URLs': // gui.js:2921
        'desmarcar para no incluir\ndatos del proyecto en las URLs',
    'check to enable\nproject data in URLs': // gui.js:2922
        'marcar para incluir\ndatos del proyecto en las URLs',
    'Sprite Nesting': // gui.js:2926
        'Anidamiento de objetos',
    'uncheck to disable\nsprite composition': // gui.js:2932
        'desmarcar para desactivar\nla composici\u00F3n de objetos',
    'check to enable\nsprite composition': // gui.js:2933
        'marcar para activar\nla composici\u00F3n de objetos',
    'First-Class Sprites': // gui.js:2937
        'Objetos de primera clase',
    'uncheck to disable support\nfor first-class sprites': // gui.js:2946
        'desmarcar para desactivar\nel soporte para objetos de primera clase',
    'check to enable support\nfor first-class sprite': // gui.js:2947
        'marcar para activar\nel soporte para objetos de primera clase',
    'Keyboard Editing': // gui.js:2951
        'Edici\u00F3n de teclado',
    'uncheck to disable\nkeyboard editing support': // gui.js:2963
        'desmarcar para desactivar\nel soporte para edici\u00F3n de teclado',
    'check to enable\nkeyboard editing support': // gui.js:2964
        'marcar para activar\nel soporte para edici\u00F3n de teclado',
    'Table support': // gui.js:2968
        'Soporte para tablas',
    'uncheck to disable\nmulti-column list views': // gui.js:2979
        'desmarcar para no visualizar\nlistas multicolumna como tablas',
    'check for multi-column\nlist view support': // gui.js:2980
        'marcar para visualizar\nlistas multicolumna como tablas',
    'Table lines': // gui.js:2985
        'L\u00EDneas de tablas',
    'uncheck for less contrast\nmulti-column list views': // gui.js:2996
        'desmarcar para ver tablas\n con un menor contraste',
    'check for higher contrast\ntable views': // gui.js:2997
        'marcar para ver tablas\ncon un mayor contraste',
    'Live coding support': // gui.js:3002
        'Soporte para programaci\u00F3n en vivo',
    'EXPERIMENTAL!': // gui.js:3008 gui.js:3010 gui.js:3024 gui.js:3026
        '\u00A1EXPERIMENTAL!',
    'uncheck to disable live\ncustom control structures': // gui.js:3009
        'desmarcar para desactivar las\nestructuras de control personalizadas en vivo',
    'check to enable\nlive custom control structures': // gui.js:3011
        'marcar para activar las\nestructuras de control personalizadas en vivo',
    'JIT compiler support': // gui.js:3015
        'Soporte para compilaci\u00F3n JIT',
    'uncheck to disable live\nsupport for compiling': // gui.js:3025
        'desmarcar para desactivar\nel soporte para compilaci\u00F3n en tiempo de ejecuci\u00F3n',
    'check to enable\nsupport for compiling': // gui.js:3027
        'marcar para activar\nel soporte para compilaci\u00F3n en tiempo de ejecuci\u00F3n',
    'Thread safe scripts': // gui.js:3032
        'Hilos de ejecuci\u00F3n seguros',
    'uncheck to allow\nscript reentrance': // gui.js:3035
        'desmarcar para permitir\nla reentrada de programas',
    'check to disallow\nscript reentrance': // gui.js:3036
        'marcar para no permitir\nla reentrada de programas',
    'Prefer smooth animations': // gui.js:3039
        'Preferir animaciones suaves',
    'uncheck for greater speed\nat variable frame rates': // gui.js:3042
        'desmarcar para una mayor velocidad\na cuadros por segundo variables',
    'check for smooth, predictable\nanimations across computers': // gui.js:3043
        'marcar para unas animaciones suaves\ny predecibles entre ordenadores',
    'Flat line ends': // gui.js:3047
        'Extremos de l\u00EDnea rectos',
    'uncheck for round ends of lines': // gui.js:3053
        'desmarcar para dibujar\nl\u00EDneas con extremos redondeados',
    'check for flat ends of lines': // gui.js:3054
        'marcar para dibujar\nl\u00EDneas con extremos rectos',
    'Codification support': // gui.js:3057
        'Soporte para mapeo a c\u00F3digo',
    'uncheck to disable\nblock to text mapping features': // gui.js:3066
        'desmarcar para desactivar el soporte\npara conversi\u00F3n de bloques a c\u00F3digo',
    'check for block\nto text mapping features': // gui.js:3067
        'marcar para activar el soporte\npara conversi\u00F3n de bloques a c\u00F3digo',
    'Inheritance support': // gui.js:3071
        'Soporte para herencia',
    'uncheck to disable\nsprite inheritance features': // gui.js:3080
        'desmarcar para desactivar\nel soporte para herencia de objetos',
    'check for sprite\ninheritance features': // gui.js:3081
        'marcar para activar\nel soporte para herencia de objetos',
    'Persist linked sublist IDs': // gui.js:3085
        'IDs de sublistas enlazadas persistentes',
    'uncheck to disable\nsaving linked sublist identities': // gui.js:3091
        'desmarcar para impedir guardar\nlas identidades de sublistas enlazadas',
    'check to enable\nsaving linked sublist identities': // gui.js:3092
        'marcar para permitir guardar\nlas identidades de sublistas enlazadas',
    'Project notes': // gui.js:3107
        'Notas del proyecto',
    'New': // gui.js:3109
        'Nuevo',
    'Open': // gui.js:3110 gui.js:5924
        'Abrir',
    'Save': // gui.js:3111 gui.js:5927 gui.js:8995 gui.js:9133
        'Guardar',
    'Save As': // gui.js:3112
        'Guardar como',
    'Import': // gui.js:3115 gui.js:3370 gui.js:6842
        'Importar',
    'load an exported project file\nor block library, a costume\nor a sound': // gui.js:3146
        'importa proyectos, bloques,\ndisfraces o sonidos',
    'Export project (in a new window)': // gui.js:3153
        'Exportar proyecto (en una nueva ventana)',
    'show project data as XML\nin a new browser window': // gui.js:3164
        'muestra el proyecto en XML\nen una nueva ventana del navegador',
    'Export project as plain text': // gui.js:3170
        'Exportar proyecto como texto',
    'Export project': // gui.js:3171
        'Exportar proyecto',
    'save project data as XML\nto your downloads folder': // gui.js:3181
        'guarda el proyecto en XML\nen tu carpeta de descargas',
    'show global custom block definitions as XML\nin a new browser window': // gui.js:3189
        'muestra definiciones de\nbloques personalizados en XML\nen una nueva ventana',
    'Unused blocks': // gui.js:3193
        'Bloques no utilizados',
    'find unused global custom blocks\nand remove their definitions': // gui.js:3195
        'busca bloques personalizados\nque no se est\u00E9n siendo utilizados\ny borra sus definiciones',
    'Export summary': // gui.js:3201
        'Exportar resumen',
    'open a new browser browser window\nwith a summary of this project': // gui.js:3203
        'muestra un resumen de este proyecto\nen una nueva ventana del navegador',
    'Export summary with drop-shadows': // gui.js:3208
        'Exportar resumen (im\u00E1genes con sombra)',
    'open a new browser browser window\nwith a summary of this project\nwith drop-shadows on all pictures.\nnot supported by all browsers': // gui.js:3210
        'muestra un resumen de este proyecto\ndonde las im\u00E1genes tienen sombra\nen una nueva ventana del navegador\n(no funciona en todos los navegadores)',
    'Export all scripts as pic': // gui.js:3217
        'Exportar todos los programas como imagen',
    'show a picture of all scripts\nand block definitions': // gui.js:3219
        'muestra una imagen con todos\nlos programas y definiciones de bloques',
    'Import tools': // gui.js:3226
        'Importar utilidades',
    'load the official library of\npowerful blocks': // gui.js:3235
        'carga la biblioteca oficial de\nbloques avanzados',
    'Libraries': // gui.js:3238
        'Bibliotecas',
    'select categories of additional blocks to add to this project': // gui.js:3248
        'a\u00F1ade bloques adicionales\npor categor\u00EDas a este proyecto',
    'Select a costume from the media library': // gui.js:3259
        'a\u00F1ade un disfraz desde la biblioteca',
    'Select a sound from the media library': // gui.js:3266
        'a\u00F1ade un sonido desde la biblioteca',
    'Opening {{ resource }}': // gui.js:3341
        'Abriendo {{ resource }}',
    'License': // gui.js:3529 gui.js:3630
        'Licencia',
    'Contributors': // gui.js:3548
        'Colaboradores',
    'current module versions': // gui.js:3574
        'Versiones actuales de los m\u00F3dulos',
    'Translations': // gui.js:3578
        'Traducciones',
    'About Snap': // gui.js:3581
        'Acerca de Snap',
    'Translators': // gui.js:3597
        'Traductores',
    'Back': // gui.js:3613
        'Atr\u00E1s',
    'Modules': // gui.js:3646
        'M\u00F3dulos',
    'Credits': // gui.js:3662
        'Cr\u00E9ditos',
    'Project Notes': // gui.js:3709
        'Notas del proyecto',
    'Saving': // gui.js:3770
        'Guardando',
    'Saved': // gui.js:3788 gui.js:3796
        'Guardado',
    'Save failed': // gui.js:3790
        'Fallo al guardar',
    'Exporting': // gui.js:3811 gui.js:5464 gui.js:5493 gui.js:5503 gui.js:5521 gui.js:5533
        'Exportando',
    'Exported': // gui.js:3816 gui.js:5471 gui.js:5497 gui.js:5507 gui.js:5527 gui.js:5539
        'Exportado',
    'Export failed': // gui.js:3819 gui.js:5475 gui.js:5500 gui.js:5530
        'Fallo al exportar',
    'this project doesn\'t have any\ncustom global blocks yet': // gui.js:3836
        'este proyecto no tiene ning\u00FAn bloque personalizado todav\u00EDa',
    'there are currently no unused\nglobal custom blocks in this project': // gui.js:3873
        'No hay bloques personalizados\nno utilizados en este proyecto',
    'Untitled': // gui.js:3937 gui.js:8190 store.js:368 store.js:1651
        'Sin T\u00EDtulo',
    'Variables': // gui.js:3968 objects.js:153
        'Variables',
    'Blocks': // gui.js:4000
        'Bloques',
    'Contents': // gui.js:4103
        'Contenido',
    'Kind of {{ name }}': // gui.js:4132
        'Clase de {{ name }}',
    'Part of {{ name }}': // gui.js:4139
        'Parte de {{ name }}',
    'Parts': // gui.js:4144
        'Partes',
    'For all Sprites': // gui.js:4197 gui.js:4201
        'Para todos los objetos',
    'Load failed': // gui.js:4251 gui.js:4302 gui.js:4341 gui.js:4384 gui.js:4394 gui.js:4427
        'Fallo al cargar',
    'Opening project\n{{ size }}': // gui.js:4269
        'Abriendo proyecto\n{{ size }}',
    'Opening blocks': // gui.js:4322
        'Abriendo bloques',
    'Imported Blocks Module: {{ name }}': // gui.js:4354
        'M\u00F3dulo de bloques importado: {{ name }}',
    'Opening sprite': // gui.js:4368
        'Abriendo objeto',
    'Imported Media Module': // gui.js:4398
        'M\u00F3dulo de medios importado',
    'Opening script': // gui.js:4406
        'Abriendo programa',
    'Imported Script': // gui.js:4442
        'Programa importado',
    'opening project\n{{ name }}': // gui.js:4448
        'Abriendo proyecto\n{{ name }}',
    'Could not export {{ name }}': // gui.js:4519
        'No se pudo exportar {{ name }}',
    'This item could not be exported from {{ appName }}.\nIt\'s likely that your project may contain a lot of media (sounds and images) or that you are using an older browser.\nPlease try using a recent version of Chrome, Firefox, or Safari.': // gui.js:4520
        'No se pudo exportar este elemento desde {{ appName }}.\nParece que tu proyecto contiene muchos medios (sonidos e im\u00E1genes)\no que est\u00E1s utilizando un navegador antiguo.\nPor favor, prueba con una versi\u00F3n reciente de Chrome, Firefox o Safari.',
    'entering user mode': // gui.js:4585
        'Se ha activado el modo usuario.',
    'entering development mode.\n\nerror catching is turned off,\nuse the browser\'s web console\nto see error messages.': // gui.js:4604
        'Se ha activado el modo desarrollador.\n\nEl cacheo de errores est\u00E1 desactivado,\nusa la consola del navegador\npara ver mensajes de error.',
    'Replace the current project with a new one?': // gui.js:4914
        '\u00BFSeguro que quieres\ndescartar el actual proyecto\ny empezar un proyecto nuevo?',
    'New Project': // gui.js:4915
        'Nuevo proyecto',
    'Generating {{ filename }} file': // gui.js:5011
        'Generando fichero {{ filename }}',
    'Could not generate the language file': // gui.js:5039
        'No se pudo general el fichero de idioma',
    'build': // gui.js:5057
        'construye',
    'your own': // gui.js:5060
        'tus propios',
    'blocks': // gui.js:5064
        'bloques',
    'normal (1x)': // gui.js:5106
        'normal (1x)',
    'demo (1.2x)': // gui.js:5107
        'demo (1.2x)',
    'presentation (1.4x)': // gui.js:5108
        'presentaci\u00F3n (1.4x)',
    'big (2x)': // gui.js:5109
        'grande (2x)',
    'huge (4x)': // gui.js:5110
        'enorme (4x)',
    'giant (8x)': // gui.js:5111
        'gigantesco (8x)',
    'monstrous (10x)': // gui.js:5112
        'monstruoso (10x)',
    'Stage width': // gui.js:5166
        'Anchura del escenario',
    'Stage height': // gui.js:5167
        'Altura del escenario',
    '{{ count }} days left': // gui.js:5253
        '{{ count }} d\u00EDas restantes',
    'You are now logged in, and your account\nis enabled for three days.\nPlease use the verification link that\nwas sent to your email address when you\nsigned up.\n\nIf you cannot find that email, please\ncheck your spam folder. If you still\ncannot find it, please use the "Resend\nVerification Email..." option in the cloud\nmenu.\n\nYou have {{ count }} days left.': // gui.js:5254
        '{{ count }} d\u00EDas restantes',
    'Sign in': // gui.js:5277
        'Iniciar sesi\u00F3n',
    'stay signed in on this computer\nuntil logging out': // gui.js:5283
        'Mantener la sesi\u00F3n iniciada en este ordenador',
    'You can now log in': // gui.js:5305
        'Ahora puedes iniciar sesi\u00F3n',
    'Sign up': // gui.js:5314
        'Registro',
    'Terms of Service': // gui.js:5317
        'T\u00E9rminos y condiciones de uso',
    'Privacy': // gui.js:5319
        'Privacidad',
    'I have read and agree\nto the Terms of Service': // gui.js:5320
        'He le\u00EDdo y acepto los t\u00E9rminos\n y condiciones de uso',
    'An e-mail with a link to\nreset your password\nhas been sent to the address provided': // gui.js:5340
        'Se ha enviado un correo a la direcci\u00F3n facilitada\ncon un enlace para reiniciar tu contrase\u00F1a',
    'Reset password': // gui.js:5352
        'Reiniciar contrase\u00F1a',
    'An e-mail with a link to\nverify your account\nhas been sent to the address provided': // gui.js:5378
        'Se ha enviado un correo a la direcci\u00F3n facilitada\ncon un enlace para verificar tu cuenta',
    'Resend verification email': // gui.js:5390
        'Reenviar correo de verificaci\u00F3n',
    'password has been changed': // gui.js:5414
        'La contrase\u00F1a ha sido cambiada',
    'disconnected': // gui.js:5437 gui.js:5440
        'Desconectado',
    'Saving project\nto the cloud': // gui.js:5448 gui.js:6476
        'Guardando proyecto\nen la nube',
    'saved': // gui.js:5452 gui.js:6481
        'Guardado',
    '{{ projectName }} media': // gui.js:5468
        'medio de {{ projectName }}',
    'Cloud Connection': // gui.js:5552
        'Conexi\u00F3n con la nube',
    'Successfully connected to\n{{ url }}': // gui.js:5553
        'Conectado correctamente a\n{{ url }}',
    '{{ server }} (secure)': // gui.js:5646
        '{{ server }} (seguro)',
    'Save Project': // gui.js:5799
        'Guardar proyecto',
    'Open Project': // gui.js:5800
        'Abrir proyecto',
    'Cloud': // gui.js:5836
        'Nube',
    'Browser': // gui.js:5837
        'Navegador',
    'Examples': // gui.js:5840 gui.js:6198 gui.js:6254 gui.js:6378
        'Ejemplos',
    'Share': // gui.js:5930
        'Compartir',
    'Unshare': // gui.js:5931
        'No compartir',
    '(no matches)': // gui.js:6095
        '(ninguna coincidencia)',
    'Updating\nproject list': // gui.js:6119
        'Actualizando\nlista de proyectos',
    'last changed\n{{ date }}': // gui.js:6314
        '\u00FAltima modificaci\u00F3n\n{{ date\u00A0}}',
    'Are you sure you want to replace\n"{{ projectName }}"?': // gui.js:6436 gui.js:6454
        '\u00BFSeguro que quieres reemplazar\n"{{ projectName }}"?',
    'Replace Project': // gui.js:6438 gui.js:6456
        'Reemplazar proyecto',
    'Are you sure you want to delete\n"{{ projectName }}"?': // gui.js:6498 gui.js:6522
        '\u00BFSeguro que quieres eliminar\n"{{ projectName }}"?',
    'Delete Project': // gui.js:6500 gui.js:6524
        'Eliminar proyecto',
    'Are you sure you want to share\n"{{ projectName }}"?': // gui.js:6542
        '\u00BFSeguro que quieres compartir\n"{{ projectName }}"?',
    'Share Project': // gui.js:6544
        'Compartir',
    'sharing\nproject': // gui.js:6546
        'Compartiendo proyecto',
    'shared': // gui.js:6563
        'Compartido',
    'Are you sure you want to unshare\n"{{ projectName }}"?': // gui.js:6590
        '\u00BFSeguro que quieres dejar de compartir\n"{{ projectName }}"?',
    'Unshare Project': // gui.js:6592
        'Dejar de compartir',
    'unsharing\nproject': // gui.js:6594
        'Dejando de compartir',
    'unshared': // gui.js:6612
        'No compartido',
    'Are you sure you want to publish\n"{{ projectName }}"?': // gui.js:6632
        '\u00BFSeguro que quieres publicar\n"{{ projectName }}"?',
    'Publish Project': // gui.js:6634
        'Publicar proyecto',
    'publishing\nproject': // gui.js:6636
        'Publicando proyecto',
    'published': // gui.js:6651
        'Publicado',
    'Are you sure you want to unpublish\n"{{ projectName }}"?': // gui.js:6677
        '\u00BFSeguro que quieres dejar de publicar\n"{{ projectName }}"?',
    'Unpublish Project': // gui.js:6679
        'Dejar de publicar',
    'unpublishing\nproject': // gui.js:6681
        'Cancelando publicaci\u00F3n',
    'unpublished': // gui.js:6696
        'No publicado',
    'Import library': // gui.js:6828
        'Importar biblioteca',
    'Loading {{ resource }}': // gui.js:6926 gui.js:7059
        'Cargando {{ resource }}',
    'Imported {{ resource }}': // gui.js:7054
        '{{ resource }} importado',
    'pic': // gui.js:7353 morphic.js:4194 objects.js:7425
        'imagen',
    'open a new window\nwith a picture of the stage': // gui.js:7361 objects.js:7432
        'abre una nueva ventana\ncon una imagen del escenario',
    'show': // gui.js:7366 morphic.js:7568 objects.js:388
        'mostrar',
    'clone': // gui.js:7370 objects.js:3238
        'clonar',
    'release': // gui.js:7388
        'liberar',
    'make temporary and\nhide in the sprite corral': // gui.js:7390
        'lo hace temporal y oculta\nen el corral de objetos',
    'detach from {{ name }}': // gui.js:7396 objects.js:3266
        'desenganchar de {{ name }}',
    'detach all parts': // gui.js:7402 objects.js:3271
        'desenganchar todo',
    'export': // gui.js:7406 gui.js:7713 objects.js:3273 objects.js:9542
        'exportar',
    'edit rotation point only': // gui.js:7702
        'editar s\u00F3lo punto de rotaci\u00F3n',
    'rename costume': // gui.js:7755
        'renombrar disfraz',
    'rename background': // gui.js:7756
        'Renombrar disfraz',
    'default': // gui.js:7893
        'predeterminado',
    'pen': // gui.js:7975 morphic.js:12402
        'tortuga',
    'tip': // gui.js:7982
        'punta',
    'middle': // gui.js:7991
        'mitad',
    'Paint a new costume': // gui.js:8085
        'dibujar un nuevo disfraz',
    'Import a new costume from your webcam': // gui.js:8110
        'importar un nuevo disfraz desde la c\u00E1mara',
    'import a picture from another web page or from\na file on your computer by dropping it here': // gui.js:8134
        'Puedes importar un disfraz de otro sitio web\no desde tu ordenador arrastr\u00E1ndolo hasta aqu\u00ED',
    'Stop': // gui.js:8345 gui.js:8367
        'Detener',
    'Play': // gui.js:8345 gui.js:8375
        'Reproducir',
    'Play sound': // gui.js:8348 gui.js:8376
        'reproduce este sonido',
    'Stop sound': // gui.js:8368
        'detiene este sonido',
    'rename sound': // gui.js:8432
        'Renombrar sonido',
    'import a sound from your computer\nby dragging it into here': // gui.js:8526
        'Puedes importar un sonido desde tu ordenador\narrastr\u00E1ndolo hasta aqu\u00ED',
    'Record a new sound': // gui.js:8549
        'grabar un nuevo sonido',
    'Please make sure your web browser is up to date\nand your camera is properly configured.\n\nSome browsers also require you to access {{ appName }}\nthrough HTTPS to use the camera.\n\nPlease replace the "http://" part of the address\nin your browser by "https://" and try again.': // gui.js:8874
        'Por favor, comprueba que tu navegador est\u00E9 actualizado\ny tu c\u00E1mara configurada correctamente.\n\nAlgunos navegadores necesitan que accedas a {{ appName }}\na trav\u00E9s de HTTPS para usar la c\u00E1mara.\n\nPor favor, reemplaza el "http://" en la barra de direcciones\nde tu navegador por "https://" y vuelve a intentarlo.',
    'Camera': // gui.js:8905
        'C\u00E1mara',
    'Camera not supported': // gui.js:8917
        'C\u00E1mara no soportada',
    'Sound Recorder': // gui.js:9067
        'Grabador de sonidos',
    'a {{ className }} [{{ count }} elements]': // lists.js:123
        undefined,
    'cdr isn\'t a list': // lists.js:143
        'cdr no es una lista',
    'items': // lists.js:264
        'elementos',
    'length': // lists.js:492 lists.js:703
        'longitud',
    'table view': // lists.js:807
        'ver como tabla',
    'open in dialog': // lists.js:810 tables.js:1036
        'abrir en di\u00E1logo',
    'Retina Display Support Problem': // morphic.js:1614
        'Problema de soporta para pantallas Retina',
    'Called {{ function }} with {{ count }} arguments': // morphic.js:1676
        'Se llam\u00F3 a {{ function }} con {{ count }} arguments',
    'a {{ className }}[{{ count }}]': // morphic.js:2681
        undefined,
    'a {{ className }} {{ count }} {{ bounds }}': // morphic.js:2904
        undefined,
    'user features': // morphic.js:4128
        'men\u00FA de usuario',
    'choose another color\nfor this morph': // morphic.js:4141
        'permite cambiar\nel color de este morph',
    'transparency': // morphic.js:4144
        'transparencia',
    'alpha value': // morphic.js:4147
        'valor alfa',
    'set this morph\'s\nalpha value': // morphic.js:4157
        'establece el valor alfa\nde este morph',
    'resize': // morphic.js:4160
        'redimensionar',
    'show a handle\nwhich can be dragged\nto change this morph\'s extent': // morphic.js:4162
        'muestra una muesca que puede ser arrastrada\npara cambiar el tama\u00F1o de este morph',
    'pick up': // morphic.js:4174
        'coger',
    'detach and put\ninto the hand': // morphic.js:4176
        'permite moverlo a otro lugar',
    'attach': // morphic.js:4179
        'enganchar',
    'stick this morph\nto another one': // morphic.js:4181
        'pega este morph a otro',
    'move': // morphic.js:4184 objects.js:3243
        'mover',
    'show a handle\nwhich can be dragged\nto move this morph': // morphic.js:4186
        'muestra una muesca que puede ser\narrastrada para mover este morph',
    'inspect': // morphic.js:4189 morphic.js:7608 morphic.js:12183
        'inspeccionar',
    'open a window\non all properties': // morphic.js:4191
        'abre una ventana\ncon todas las propiedades',
    'open a new window\nwith a picture of this morph': // morphic.js:4198 morphic.js:12192
        'abre una nueva ventana\ncon una image de este morph',
    'lock': // morphic.js:4203
        'bloquear',
    'make this morph\nunmovable': // morphic.js:4205
        'impide que este morph\nse pueda mover',
    'unlock': // morphic.js:4209
        'desbloquear',
    'make this morph\nmovable': // morphic.js:4211
        'permite que este morph\nse pueda mover',
    'World': // morphic.js:4219
        'Mundo',
    'show the\n{{ WorldMorph }}\'s menu': // morphic.js:4223
        'muestra el men\u00FA de {{ WorldMorph }}',
    'choose target': // morphic.js:4721 morphic.js:5102 morphic.js:6562 morphic.js:7200
        'elegir objetivo',
    'set rotation': // morphic.js:4868
        'rotar',
    'interactively turn this morph\nusing a dial widget': // morphic.js:4870
        'gira este morph\nutilizando un control de disco',
    'set target': // morphic.js:5092 morphic.js:6552 morphic.js:7118
        'establecer objetivo',
    'choose another morph\nwhose color property\nwill be controlled by this one': // morphic.js:5094
        'elige otro morph\ncuya propiedad "color"\nser\u00E1 controlada por este',
    'choose target property': // morphic.js:5122 morphic.js:6582 morphic.js:7220
        'elige la propiedad objetivo',
    'border width': // morphic.js:5895 morphic.js:5898
        'anchura de borde',
    'set the border\'s\nline size': // morphic.js:5908
        'establece el tama\u00F1o\ndel borde',
    'border color': // morphic.js:5911 morphic.js:5914
        'color de borde',
    'set the border\'s\nline color': // morphic.js:5920
        'establece el color\ndel borde',
    'corner size': // morphic.js:5923 morphic.js:5926
        'tama\u00F1o de esquina',
    'set the corner\'s\nradius': // morphic.js:5936
        'establece el\nradio de la esquina',
    'select another morph\nwhose numerical property\nwill be controlled by this one': // morphic.js:6554 morphic.js:7120
        'elige otro morph\ncuya propiedad num\u00E9rica\nser\u00E1 controlada por este',
    'horizontal': // morphic.js:6701
        'horizontal',
    'toggle the\norientation': // morphic.js:6703 morphic.js:6709
        'intercambia la\norientaci\u00F3n',
    'vertical': // morphic.js:6707
        'vertical',
    'show value': // morphic.js:7064
        'mostrar valor',
    'display a dialog box\nshowing the selected number': // morphic.js:7066
        'muestra un cuadro de di\u00E1logo\nmostrando el n\u00FAmero seleccionado',
    'set the minimum value\nwhich can be selected': // morphic.js:7082
        'establece el m\u00EDnimo\nvalor seleccionable',
    'set the maximum value\nwhich can be selected': // morphic.js:7098
        'establece el m\u00E1ximo\nvalor seleccionable',
    'button size': // morphic.js:7101 morphic.js:7104
        'tama\u00F1o de bot\u00F3n',
    'set the range\ncovered by\nthe slider button': // morphic.js:7114
        'establece el rango\ncubierto por este deslizador',
    'un-mark own': // morphic.js:7595
        'desmarcar propios',
    'mark own': // morphic.js:7595
        'marcar propios',
    'highlight\n\'own\' properties': // morphic.js:7600
        'resaltar propiedades propias',
    'in new inspector': // morphic.js:7614
        'en un nuevo inspector',
    'here': // morphic.js:7627
        'aqu\u00ED',
    '{{ name }}\nis not inspectable': // morphic.js:7635
        '{{ name }}\nno es inspeccionable',
    'save': // morphic.js:7653
        'guardar',
    'accept changes': // morphic.js:7653
        'aceptar cambios',
    'add property': // morphic.js:7655
        'a\u00F1adir propiedad',
    'remove': // morphic.js:7657
        'eliminar',
    'close': // morphic.js:7664 morphic.js:7948
        'cerrar',
    'new property name': // morphic.js:7789
        'nombre de nueva propiedad',
    'property': // morphic.js:7802
        'propiedad',
    'property name': // morphic.js:7810
        'nombre de propiedad',
    'font size': // morphic.js:8732 morphic.js:8735 morphic.js:9479 morphic.js:9482
        'tama\u00F1o de fuente',
    'set this String\'s\nfont point size': // morphic.js:8745
        'establece el tama\u00F1o de fuente\nde este texto',
    'serif': // morphic.js:8748 morphic.js:9505
        'serif',
    'sans-serif': // morphic.js:8751 morphic.js:9508
        'sans-serif',
    'normal weight': // morphic.js:8754 morphic.js:9511
        'grosor normal',
    'bold': // morphic.js:8756 morphic.js:9513
        'negrita',
    'normal style': // morphic.js:8759 morphic.js:9516
        'estilo normal',
    'italic': // morphic.js:8761 morphic.js:9518
        'cursiva',
    'hide blanks': // morphic.js:8764
        'ocultar espacios',
    'show blanks': // morphic.js:8766
        'mostrar espacios',
    'show characters': // morphic.js:8769
        'mostrar caracteres',
    'hide characters': // morphic.js:8771
        'ocultar caracteres',
    'set this Text\'s\nfont point size': // morphic.js:9492
        'establece el\ntama\u00F1o de fuente\nde este Text',
    'align left': // morphic.js:9495
        'alinear a la izquierda',
    'align right': // morphic.js:9498
        'alinear a la derecha',
    'align center': // morphic.js:9501
        'centrado',
    'do it': // morphic.js:9563
        'evaluar',
    'evaluate the\nselected expression': // morphic.js:9565
        'evalua la expresi\u00F3n seleccionada',
    'show it': // morphic.js:9568
        'mostrar',
    'evaluate the\nselected expression\nand show the result': // morphic.js:9570
        'evalua la expresi\u00F3n seleccionada\ny muestra el resultado',
    'inspect it': // morphic.js:9573
        'inspeccionar',
    'evaluate the\nselected expression\nand inspect the result': // morphic.js:9575
        'evalua la expresi\u00F3n seleccionada\ne inspecciona el resultado',
    'select all': // morphic.js:9578
        'seleccionar todo',
    'move all inside': // morphic.js:10303 morphic.js:12178
        'mover todos dentro',
    'keep all submorphs\nwithin and visible': // morphic.js:10305 morphic.js:12180
        'retiene dentro y hace visibles\ntodos los sub-morphs',
    'auto line wrap off': // morphic.js:10685
        'desactivar ajuste de l\u00EDnea',
    'turn automatic\nline wrapping\noff': // morphic.js:10687
        'desactiva el ajuste\nde l\u00EDnea autom\u00E1tico',
    'auto line wrap on': // morphic.js:10691
        'activar ajuste de l\u00EDnea',
    'enable automatic\nline wrapping': // morphic.js:10693
        'activa el ajuste\nde l\u00EDnea autom\u00E1tico',
    '(empty)': // morphic.js:10781
        '(vac\u00EDo)',
    'Are you sure you want to leave?': // morphic.js:12110
        '\u00BFSeguro que quieres salir?',
    'demo': // morphic.js:12173
        'demo',
    'sample morphs': // morphic.js:12173
        'morphs de muestra',
    'hide all': // morphic.js:12175
        'ocultar todos',
    'show all': // morphic.js:12176 objects.js:7423
        'mostrar todos',
    'open a window on\nall properties': // morphic.js:12185
        'abre una ventana\ncon todas las propiedades',
    'screenshot': // morphic.js:12188 objects.js:413
        'captura de pantalla',
    'restore display': // morphic.js:12196
        'restaurar pantalla',
    'redraw the\nscreen once': // morphic.js:12198
        'redibuja la pantalla',
    'fill page': // morphic.js:12201
        'llenar p\u00E1gina',
    'let the World automatically\nadjust to browser resizing': // morphic.js:12203
        'hace que el Mundo se ajuste\nautom\u00E1ticamente cuando\nse redimensiona el navegador',
    'sharp shadows': // morphic.js:12207
        'sombras n\u00EDtidas',
    'sharp drop shadows\nuse for old browsers': // morphic.js:12209
        'usar sombras n\u00EDtidas\npara navegadores antiguos',
    'blurred shadows': // morphic.js:12213
        'sombras difuminadas',
    'blurry shades\nuse for new browsers': // morphic.js:12215
        'usar sombras difuminadas\npara navegadores modernos',
    'choose the World\'s\nbackground color': // morphic.js:12228
        'selecciona el color\nde fondo del Mundo',
    'touch screen settings': // morphic.js:12232
        'perfil de pantallas t\u00E1ctiles',
    'bigger menu fonts\nand sliders': // morphic.js:12234
        'fuentes y deslizadores\nm\u00E1s grandes',
    'standard settings': // morphic.js:12238
        'perfil de ordenador',
    'smaller menu fonts\nand sliders': // morphic.js:12240
        'fuentes y deslizadores m\u00E1s peque\u00F1os',
    'user mode': // morphic.js:12247
        'modo usuario',
    'disable developers\'\ncontext menus': // morphic.js:12249
        'desactiva los men\u00FAs\ncontextuales de desarrollador',
    'about {{ resource }}': // morphic.js:12254
        'acerca de {{ resource }}',
    'make a morph': // morphic.js:12266
        'crear un morph',
    'rectangle': // morphic.js:12267 symbols.js:109
        'rect\u00E1ngulo',
    'box': // morphic.js:12270
        'caja',
    'circle box': // morphic.js:12273
        'caja circular',
    'slider': // morphic.js:12277 objects.js:9461
        'deslizador',
    'dial': // morphic.js:12280
        'disco',
    'frame': // morphic.js:12284
        'panel',
    'scroll frame': // morphic.js:12289
        'panel con deslizadores',
    'handle': // morphic.js:12296
        'muesca',
    'string': // morphic.js:12300
        'string',
    'Hello, World!': // morphic.js:12301 morphic.js:12329
        '\u00A1Hola, Mundo!',
    'speech bubble': // morphic.js:12328
        'mensaje popup',
    'gray scale palette': // morphic.js:12333
        'paleta de grises',
    'color palette': // morphic.js:12336
        'paleta de color',
    'color picker': // morphic.js:12339
        'medidor de color',
    'sensor demo': // morphic.js:12343
        'demo: sensor',
    'animation demo': // morphic.js:12353
        'demo: animaci\u00F3n',
    'modules': // morphic.js:12444
        'm\u00F3dulos',
    'a lively Web GUI\ninspired by Squeak': // morphic.js:12451
        'una interfaz web animada\ninspirada por Squeak',
    'written by {{ author }}\n{{ email }}': // morphic.js:12453
        'escrito por {{ author }}\n{{ email }}',
    'Motion': // objects.js:146
        'Movimiento',
    'Control': // objects.js:147
        'Control',
    'Looks': // objects.js:148
        'Apariencia',
    'Sensing': // objects.js:149
        'Sensores',
    'Sound': // objects.js:150 objects.js:8570
        'Sonido',
    'Operators': // objects.js:151
        'Operadores',
    'Pen': // objects.js:152
        'L\u00E1piz',
    'Lists': // objects.js:154
        'Listas',
    'Other': // objects.js:155
        'Otros',
    'move %n steps': // objects.js:201
        'mover %n pasos',
    'turn %clockwise %n degrees': // objects.js:208
        'girar %clockwise %n grados',
    'turn %counterclockwise %n degrees': // objects.js:215
        'girar %counterclockwise %n grados',
    'point in direction %dir': // objects.js:222
        'apuntar en direcci\u00F3n %dir',
    'point towards %dst': // objects.js:228
        'apuntar hacia %dst',
    'go to x: %n y: %n': // objects.js:234
        'ir a x: %n y: %n',
    'go to %dst': // objects.js:241
        'ir a %dst',
    'glide %n secs to x: %n y: %n': // objects.js:247
        'deslizar en %n segs a x: %n y: %n',
    'change x by %n': // objects.js:254
        'cambiar x en %n',
    'set x to %n': // objects.js:261
        'fijar x a %n',
    'change y by %n': // objects.js:268
        'cambiar y en %n',
    'set y to %n': // objects.js:275
        'fijar y a %n',
    'if on edge, bounce': // objects.js:282
        'rebotar si toca un borde',
    'switch to costume %cst': // objects.js:307
        'cambiar al disfraz %cst',
    'next costume': // objects.js:312
        'siguiente disfraz',
    'say %s for %n secs': // objects.js:323
        'decir %s por %n segs',
    'Hello!': // objects.js:324 objects.js:331
        '\u00A1Hola!',
    'say %s': // objects.js:330
        'decir %s',
    'think %s for %n secs': // objects.js:337
        'pensar %s por %n segs',
    'Hmm': // objects.js:338 objects.js:345
        'Mmm',
    'think %s': // objects.js:344
        'pensar %s',
    'change %eff effect by %n': // objects.js:350
        'cambiar efecto %eff en %n',
    'set %eff effect to %n': // objects.js:356
        'fijar efecto %eff a %n',
    'clear graphic effects': // objects.js:362
        'quitar efectos gr\u00E1ficos',
    'change size by %n': // objects.js:368
        'cambiar tama\u00F1o en %n',
    'set size to %n %': // objects.js:375
        'fijar tama\u00F1o a %n %',
    'go to front': // objects.js:400
        'enviar al frente',
    'go back %n layers': // objects.js:406
        'enviar %n capas hacia atr\u00E1s',
    'save %imgsource as costume named %s': // objects.js:412
        'guardar %imgsource en disfraz %s',
    'wardrobe': // objects.js:421
        'guardarropa',
    'alert %mult%s': // objects.js:428
        'mostrar mensaje %mult%s',
    'console log %mult%s': // objects.js:434
        'registrar en consola %mult%s',
    'play sound %snd': // objects.js:441
        'reproducir sonido %snd',
    'play sound %snd until done': // objects.js:446
        'reproducir sonido %snd y esperar',
    'stop all sounds': // objects.js:451
        'detener todos los sonidos',
    'rest for %n beats': // objects.js:456
        'silencio por %n pulsos',
    'play note %note for %n beats': // objects.js:462
        'tocar nota %note por %n pulsos',
    'set instrument to %inst': // objects.js:468
        'fijar instrumento a %inst',
    'change tempo by %n': // objects.js:474
        'cambiar tempo en %n',
    'set tempo to %n bpm': // objects.js:480
        'fijar tempo a %n',
    'tempo': // objects.js:486
        'tempo',
    'jukebox': // objects.js:494
        'gramola',
    'clear': // objects.js:501 paint.js:230
        'borrar',
    'pen down': // objects.js:507
        'bajar l\u00E1piz',
    'pen up': // objects.js:513
        'subir l\u00E1piz',
    'set pen color to %clr': // objects.js:519
        'fijar color de l\u00E1piz a %clr',
    'change pen color by %n': // objects.js:525
        'cambiar color de l\u00E1piz en %n',
    'set pen color to %n': // objects.js:532
        'fijar color de l\u00E1piz a %n',
    'change pen shade by %n': // objects.js:539
        'cambiar brillo de l\u00E1piz en %n',
    'set pen shade to %n': // objects.js:546
        'fijar brillo de l\u00E1piz a %n',
    'change pen size by %n': // objects.js:553
        'cambiar tama\u00F1o de l\u00E1piz en %n',
    'set pen size to %n': // objects.js:560
        'fijar tama\u00F1o de l\u00E1piz a %n',
    'stamp': // objects.js:567
        'sellar',
    'fill': // objects.js:573
        'llenar',
    'when %greenflag clicked': // objects.js:585
        'cuando se pulse %greenflag',
    'when %keyHat key pressed': // objects.js:590
        'cuando se pulse la tecla %keyHat',
    'when I am %interaction': // objects.js:595
        'cuando me %interaction',
    'when I receive %msgHat': // objects.js:601
        'cuando me llegue %msgHat',
    'when %b': // objects.js:606
        'cuando %b',
    'broadcast %msg': // objects.js:611
        'enviar mensaje %msg',
    'broadcast %msg and wait': // objects.js:616
        'enviar mensaje %msg y esperar',
    'message': // objects.js:621
        'mensaje',
    'wait %n secs': // objects.js:626
        'esperar %n segs',
    'wait until %b': // objects.js:632
        'esperar hasta que %b',
    'forever %c': // objects.js:637
        'por siempre %c',
    'repeat %n %c': // objects.js:642
        'repetir %n %c',
    'repeat until %b %c': // objects.js:648
        'repetir hasta que %b %c',
    'if %b %c': // objects.js:653
        'si %b %c',
    'if %b %c else %c': // objects.js:658
        'si %b %c sino %c',
    'stop %stopChoices': // objects.js:678
        'detener %stopChoices',
    'run %cmdRing %inputs': // objects.js:693
        'ejecutar %cmdRing %inputs',
    'launch %cmdRing %inputs': // objects.js:698
        'iniciar %cmdRing %inputs',
    'call %repRing %inputs': // objects.js:703
        'llamar %repRing %inputs',
    'report %s': // objects.js:708
        'reportar %s',
    'run %cmdRing w/continuation': // objects.js:720
        'ejecutar %cmdRing con continuaci\u00F3n',
    'call %cmdRing w/continuation': // objects.js:725
        'llamar %cmdRing con continuaci\u00F3n',
    'warp %c': // objects.js:730
        'instrucci\u00F3n at\u00F3mica %c',
    'tell %spr to %cmdRing %inputs': // objects.js:739
        'decir a %spr que %cmdRing %inputs',
    'ask %spr for %repRing %inputs': // objects.js:744
        'preguntar a %spr por %repRing %inputs',
    'when I start as a clone': // objects.js:752
        'cuando comience como clon',
    'create a clone of %cln': // objects.js:757
        'crear clon de %cln',
    'a new clone of %cln': // objects.js:762
        'un nuevo clon de %cln',
    'delete this clone': // objects.js:768
        'eliminar este clon',
    'pause all %pause': // objects.js:776
        'pausar todos %pause',
    'touching %col ?': // objects.js:785
        '\u00BFtocando %col ?',
    'touching %clr ?': // objects.js:791
        '\u00BFtocando el color %clr ?',
    'color %clr is touching %clr ?': // objects.js:797
        '\u00BFcolor %clr tocando %clr ?',
    'filtered for %clr': // objects.js:803
        'filtrado por %clr',
    'stack size': // objects.js:809
        'tama\u00F1o de pila',
    'frames': // objects.js:815
        'cuadros',
    'processes': // objects.js:821
        'procesos',
    'ask %s and wait': // objects.js:826
        'preguntar %s y esperar',
    'what\'s your name?': // objects.js:827
        '\u00BFCu\u00E1l es tu nombre?',
    'answer': // objects.js:833 objects.js:838
        'respuesta',
    'mouse x': // objects.js:843
        'rat\u00F3n x',
    'mouse y': // objects.js:848
        'rat\u00F3n y',
    'mouse down?': // objects.js:853
        '\u00BFrat\u00F3n pulsado?',
    'key %key pressed?': // objects.js:858
        '\u00BFtecla %key pulsada?',
    '%rel to %dst': // objects.js:871
        '%rel a %dst',
    'reset timer': // objects.js:877
        'reiniciar cron\u00F3metro',
    'timer': // objects.js:883 objects.js:888
        'cron\u00F3metro',
    '%att of %spr': // objects.js:893
        '%att de %spr',
    'url %s': // objects.js:899
        'url %s',
    'turbo mode?': // objects.js:905
        '\u00BFmodo turbo?',
    'set turbo mode to %b': // objects.js:910
        'fijar modo turbo a %b',
    'current %dates': // objects.js:915
        '%dates actual',
    'my %get': // objects.js:920
        'mi(s) %get',
    'round %n': // objects.js:968
        'redondear %n',
    '%fun of %n': // objects.js:973
        '%fun de %n',
    '%n mod %n': // objects.js:979
        '%n m\u00F3dulo %n',
    'pick random %n to %n': // objects.js:984
        'n\u00FAmero aleatorio entre %n y %n',
    '%b and %b': // objects.js:1005
        '%b y %b',
    '%b or %b': // objects.js:1010
        '%b o %b',
    'not %b': // objects.js:1015
        'no %b',
    'join %words': // objects.js:1033
        'unir %words',
    'hello': // objects.js:1034 objects.js:1075
        'hola',
    'world': // objects.js:1034 objects.js:1040 objects.js:1046 objects.js:1075
        'mundo',
    'letter %n of %s': // objects.js:1039
        'letra %n de %s',
    'length of %s': // objects.js:1045
        'longitud de %s',
    'unicode of %s': // objects.js:1051
        'unic\u00F3digo de %s',
    'unicode %n as letter': // objects.js:1057
        'unic\u00F3digo %n como letra',
    'is %s a %typ ?': // objects.js:1063
        '\u00BFes %s un %typ ?',
    'is %s identical to %s ?': // objects.js:1069
        '\u00BFes %s id\u00E9ntico a %s ?',
    'split %s by %delim': // objects.js:1074
        'separar %s por %delim',
    'JavaScript function ( %mult%s ) { %code }': // objects.js:1080
        'funci\u00F3n JavaScript ( %mult%s ) { %code }',
    'type of %s': // objects.js:1086
        'tipo de %s',
    '%txtfun of %s': // objects.js:1093
        '%txtfun de %s',
    'compile %repRing': // objects.js:1099
        'compilar %repRing',
    'set %var to %s': // objects.js:1119
        'asignar a %var el valor %s',
    'change %var by %n': // objects.js:1125
        'incrementar %var en %n',
    'show variable %var': // objects.js:1131
        'mostrar variable %var',
    'hide variable %var': // objects.js:1136
        'esconder variable %var',
    'script variables %scriptVars': // objects.js:1141
        'variables de programa %scriptVars',
    'inherit %shd': // objects.js:1148
        'heredar %shd',
    'list %exp': // objects.js:1155
        'lista %exp',
    '%s in front of %l': // objects.js:1160
        '%s delante de %l',
    'item %idx of %l': // objects.js:1165
        'elemento %idx de %l',
    'all but first of %l': // objects.js:1171
        '%l sin el primer elemento',
    'length of %l': // objects.js:1176
        'longitud de %l',
    '%l contains %s': // objects.js:1181
        '\u00BF %l contiene %s ?',
    'thing': // objects.js:1182 objects.js:1188 objects.js:1200 objects.js:1206
        'cosa',
    'add %s to %l': // objects.js:1187
        'a\u00F1adir %s a %l',
    'delete %ida of %l': // objects.js:1193
        'borrar %ida de %l',
    'insert %s at %idx of %l': // objects.js:1199
        'insertar %s en %idx de %l',
    'replace item %idx of %l with %s': // objects.js:1205
        'reemplazar elemento %idx de %l con %s',
    'map %repRing over %l': // objects.js:1214
        'mapear %repRing sobre %l',
    'for %upvar in %l %cl': // objects.js:1220
        'para %upvar en %l %cl',
    'each item': // objects.js:1221
        'cada elemento',
    'show table %l': // objects.js:1230
        'mostrar tabla %l',
    'map %cmdRing to %codeKind %code': // objects.js:1237
        'mapear %cmdRing a %codeKind %code',
    'map %mapValue to code %code': // objects.js:1242
        'mapear %mapValue a c\u00F3digo %code',
    'map %codeListPart of %codeListKind to code %code': // objects.js:1256
        'mapear %codeListPart de %codeListKind a c\u00F3digo %code',
    'code of %cmdRing': // objects.js:1261
        'c\u00F3digo de %cmdRing',
    'Sprite': // objects.js:1404
        'Objeto',
    'that name is already in use': // objects.js:1859 objects.js:7047
        'ese nombre ya est\u00E1 en uso',
    'development mode\ndebugging primitives': // objects.js:1932 objects.js:2089 objects.js:2155 objects.js:2268 objects.js:7085 objects.js:7214 objects.js:7280 objects.js:7376
        'primitivas de depuraci\u00F3n\ndel modo desarrollador',
    'Make a variable': // objects.js:2184 objects.js:7309
        'Declarar variable',
    'Delete a variable': // objects.js:2205 objects.js:7327
        'Borrar variable',
    'find blocks': // objects.js:2398 objects.js:2469
        'busca bloques',
    'hide primitives': // objects.js:2476
        'ocultar primitivas',
    'show primitives': // objects.js:2494
        'mostrar primitivas',
    'rotate': // objects.js:3244
        'rotar',
    'pivot': // objects.js:3247
        'pivote',
    'edit the costume\'s\nrotation center': // objects.js:3249
        'edita el centro\nde rotaci\u00F3n del disfraz',
    'make permanent and\nshow in the sprite corral': // objects.js:3257
        'lo hace permanente y\nlo muestra en el corral de objetos',
    'exceeding maximum number of clones': // objects.js:3355
        'Se ha excedido el n\u00FAmero m\u00E1ximo de clones',
    'Costume': // objects.js:4338
        'Disfraz',
    'setting the rotation center requires a costume': // objects.js:4679
        'Se necesita un disfraz para establecer el centro de rotaci\u00F3n',
    'current parent': // objects.js:5420
        'padre actual',
    'Stage': // objects.js:6315
        'Escenario',
    'stop': // objects.js:6770 costumes/COSTUMES:486
        'detener',
    'terminate all running threads': // objects.js:6774
        'termina todos los hilos en ejecuci\u00F3n',
    'Stage selected:\nno motion primitives': // objects.js:7060
        'Escenario seleccionado:\nno hay primitivas de movimiento\ndisponibles',
    'turn all pen trails and stamps\ninto a new costume for the\ncurrently selected sprite': // objects.js:7445
        'convierte todo rastro del l\u00E1piz\nen un nuevo disfraz para el objeto\nactualmente seleccionado',
    'turn all pen trails and stamps\ninto a new background for the stage': // objects.js:7447
        'convierte todo rastro del l\u00E1piz\nen un nuevo fondo para el escenario',
    'Background': // objects.js:7817
        'Escenario',
    'a {{ className }}({{ name }})': // objects.js:8096
        undefined,
    'click or drag crosshairs to move the rotation center': // objects.js:8296
        'haz clic o arrastra el punto de mira\npara mover el centro de rotaci\u00F3n',
    'Costume Editor': // objects.js:8308
        'Editor de disfraces',
    'an {{ className }}({{ name }})': // objects.js:8395
        undefined,
    'Web Audio API is not supported\nin this browser': // objects.js:8629
        'Este navegador no tiene soporte\npara Web Audio API',
    'normal': // objects.js:9452
        'normal',
    'large': // objects.js:9456
        'grande',
    'slider min': // objects.js:9466
        'm\u00EDnimo valor del deslizador',
    'slider max': // objects.js:9470
        'm\u00E1ximo valor del deslizador',
    'import': // objects.js:9475
        'importar',
    'Unable to import': // objects.js:9501
        'No se pudo importar',
    '{{ appName }} can only import "text" files.\nYou selected a file of type "{{ type }}".': // objects.js:9502
        '{{ appName }} s\u00F3lo puede importar ficheros de texto.\nEl que has seleccionado es de tipo {{ type }}.',
    'Slider minimum value': // objects.js:9588
        'M\u00EDnimo valor del deslizador',
    'Slider maximum value': // objects.js:9604
        'M\u00E1ximo valor del deslizador',
    'Paint Editor': // paint.js:111
        'Editor gr\u00E1fico',
    'Paintbrush tool\n(free draw)': // paint.js:172
        'pincel\n(dibujo libre)',
    'Stroked Rectangle\n(shift: square)': // paint.js:174
        'rect\u00E1ngulo\n(\u21E7 = cuadrado)',
    'Stroked Ellipse\n(shift: circle)': // paint.js:176
        'elipse\n(\u21E7 = c\u00EDrculo)',
    'Eraser tool': // paint.js:178
        'goma de borrar',
    'Set the rotation center': // paint.js:180
        'establecer\ncentro de rotaci\u00F3n',
    'Line tool\n(shift: vertical/horizontal)': // paint.js:183
        'l\u00EDnea\n(\u21E7 = vertical/horizontal)',
    'Filled Rectangle\n(shift: square)': // paint.js:185
        'rect\u00E1ngulo relleno\n(\u21E7 = cuadrado)',
    'Filled Ellipse\n(shift: circle)': // paint.js:187
        'elipse rellena\n(\u21E7 = c\u00EDrculo)',
    'Fill a region': // paint.js:189
        'bote de pintura',
    'Pipette tool\n(pick a color anywhere)': // paint.js:191
        'cuentagotas\n(funciona dentro y fuera del editor)',
    'undo': // paint.js:225
        'deshacer',
    'grow': // paint.js:239
        'ampliar',
    'shrink': // paint.js:243
        'reducir',
    'flip \u2194': // paint.js:247
        'voltear \u2194',
    'flip \u2195': // paint.js:251
        'voltear \u2195',
    'Constrain proportions of shapes?\n(you can also hold shift)': // paint.js:407
        'Figuras proporcionales\n(o mant\u00E9n pulsado \u21E7)',
    'Brush size': // paint.js:413
        'Tama\u00F1o de pincel',
    'loading should be implemented in heir of XML_Serializer': // store.js:235
        'La carga deber\u00EDa de implementarse en la clase derivada de XML_Serializer',
    '{{ appName }} Project': // store.js:328
        'Proyecto de {{ appName }}',
    'This project has been created by a different app:\n\n{{ appName }}\n\nand may be incompatible or fail to load here.': // store.js:329
        'Este proyecto ha sido creado con una aplicaci\u00F3n diferente:\n\n{{ appName }}\n\ny puede ser incompatible o imposible de cargar aqu\u00ED.',
    'Project uses newer version of Serializer': // store.js:351
        'El proyecto usa una versi\u00F3n m\u00E1s reciente de Serializer',
    'Module uses newer version of Serializer': // store.js:630 store.js:662 store.js:743
        'El m\u00F3dulo usa una versi\u00F3n m\u00E1s moderna de Serializer',
    'expecting a command but getting a reporter': // store.js:1076
        'Se esperaba un comando pero se obtuvo un reportero',
    'Obsolete!': // store.js:1198
        '\u00A1Obsoleto!',
    'expecting a reference id': // store.js:1282
        'se esperaba un ID de referencia',
    'square': // symbols.js:85
        'cuadrado',
    'pointRight': // symbols.js:86
        'apuntar a la derecha',
    'stepForward': // symbols.js:87
        'siguiente paso',
    'gears': // symbols.js:88
        'engranaje',
    'file': // symbols.js:89
        'fichero',
    'fullScreen': // symbols.js:90
        'pantalla completa',
    'normalScreen': // symbols.js:91
        'pantalla normal',
    'smallStage': // symbols.js:92
        'escenario peque\u00F1o',
    'normalStage': // symbols.js:93
        'escenario normal',
    'turtle': // symbols.js:94
        'tortuga',
    'turtleOutline': // symbols.js:96
        'tortuga (contorno)',
    'pause': // symbols.js:97
        'pausa',
    'flag': // symbols.js:98
        'bander\u00EDn',
    'octagon': // symbols.js:99
        'oct\u00F3gono',
    'cloud': // symbols.js:100 costumes/COSTUMES:170
        'nube',
    'cloudOutline': // symbols.js:101
        'nube (contorno)',
    'cloudGradient': // symbols.js:102
        'nube (degradado)',
    'turnRight': // symbols.js:103
        'giro a la derecha',
    'turnLeft': // symbols.js:104
        'giro a la izquierda',
    'storage': // symbols.js:105
        'almacenamiento',
    'poster': // symbols.js:106
        'p\u00F3ster',
    'flash': // symbols.js:107
        'rel\u00E1mpago',
    'brush': // symbols.js:108
        'pincel',
    'rectangleSolid': // symbols.js:110
        'rect\u00E1ngulo (s\u00F3lido)',
    'circle': // symbols.js:111
        'c\u00EDrculo',
    'circleSolid': // symbols.js:112
        'c\u00EDrculo (s\u00F3lido)',
    'cross': // symbols.js:114
        'cruz',
    'crosshairs': // symbols.js:115
        'punto de mira',
    'paintbucket': // symbols.js:116
        'bote de pintura',
    'eraser': // symbols.js:117
        'goma de borrar',
    'pipette': // symbols.js:118
        'cuentagotas',
    'speechBubble': // symbols.js:119
        'bocadillo',
    'speechBubbleOutline': // symbols.js:120
        'bocadillo (contorno)',
    'turnBack': // symbols.js:121
        'ir atr\u00E1s',
    'turnForward': // symbols.js:122
        'ir adelante',
    'arrowUp': // symbols.js:123
        'flecha arriba',
    'arrowUpOutline': // symbols.js:124
        'flecha arriba (contorno)',
    'arrowLeft': // symbols.js:125
        'flecha izquierda',
    'arrowLeftOutline': // symbols.js:126
        'flecha izquierda (contorno)',
    'arrowDown': // symbols.js:127
        'flecha abajo',
    'arrowDownOutline': // symbols.js:128
        'flecha abajo (contorno)',
    'arrowRight': // symbols.js:129
        'flecha derecha',
    'arrowRightOutline': // symbols.js:130
        'flecha derecha (contorno)',
    'robot': // symbols.js:131
        'robot',
    'magnifyingGlass': // symbols.js:132
        'lupa',
    'magnifierOutline': // symbols.js:133
        'lupa (contorno)',
    'notes': // symbols.js:134
        'notas musicales',
    'camera': // symbols.js:135
        'c\u00E1mara',
    'location': // symbols.js:136
        'ubicaci\u00F3n',
    'footprints': // symbols.js:137
        'huellas de pasos',
    'keyboard': // symbols.js:138
        'teclado',
    'keyboardFilled': // symbols.js:139
        'teclado (s\u00F3lido)',
    'reset columns': // tables.js:1024 tables.js:1032
        'reiniciar columnas',
    'open in another dialog': // tables.js:1027
        'abrir en otro di\u00E1logo',
    'list view': // tables.js:1034
        'ver como lista',
    'Table view': // tables.js:1186
        'Visor de tablas',
    'expecting a receiver but getting {{ actual }}': // threads.js:145
        'Se esperaba un receptor pero se obtuvo {{ actual }}',
    'expecting a block or ring but getting {{ actual }}': // threads.js:160
        'Se esperaba un bloque o c\u00E1psula pero se obtuvo {{ actual }}',
    'a synchronous {{ appName }} script has timed out': // threads.js:172
        'Un programa s\u00EDncrono de {{ appName }} ha expirado',
    'the predicate takes\ntoo long for a\ncustom hat block': // threads.js:428
        'El predicado tarda demasiado\npara ser un bloque sombrero personalizado',
    'compiling does not yet support\nvariables that are not\nformal parameters': // threads.js:758
        'La compilaci\u00F3n a\u00FAn no soporta variables\nque no sean par\u00E1metros formales',
    'compiling does not yet support\ncustom blocks': // threads.js:785
        'La compilaci\u00F3n a\u00FAn no soporta\nbloques personalizados',
    'compiling does not yet support\nimplicit parameters\n(empty input slots)': // threads.js:818
        'La compilaci\u00F3n a\u00FAn no soporta\npar\u00E1metros impl\u00EDcitos\n(huecos vac\u00EDos)',
    'compiling does not yet support\ninputs of type\n{{ type }}': // threads.js:845
        'La compilaci\u00F3n a\u00FAn no soporta\nentradas de tipo\n{{ type }}',
    'compiling does not yet support\ninput slots of type\n{{ type }}': // threads.js:858
        'La compilaci\u00F3n a\u00FAn no soporta\nhuecos de tipo\n{{ type }}',
    'reporter didn\'t report': // threads.js:1087
        'El reportero no report\u00F3 nada',
    'Inside': // threads.js:1100
        'Dentro de',
    'a custom block definition is missing': // threads.js:1107
        'No se encuentra la definici\u00F3n un bloque personalizado',
    'expecting a ring but getting {{ actual }}': // threads.js:1202 threads.js:1316
        'Se esperaba una c\u00E1psula pero se obtuvo {{ actual }}',
    'expecting {{ expected }} input(s), but getting {{ actual }}': // threads.js:1265 threads.js:1366
        'Se esperaba(n) {{ expected }} entrada(s) pero se obtuvo/ieron {{ actual }}',
    'continuations cannot be forked': // threads.js:1312
        'Las continuaciones no pueden ser bifurcadas',
    'expecting {{ expected }} but getting {{ actual }}': // threads.js:2538
        'Se esperaba {{ expected }} pero se obtuvo {{ actual }}',
    'cannot operate on a deleted sprite': // threads.js:2546
        'No se puede operar sobre un objeto borrado',
    'expecting text instead of a {{ type }}': // threads.js:2862
        'Se esperaba texto en lugar de un {{ type }}',
    'expecting a text delimiter instead of a {{ type }}': // threads.js:2868
        'Se esperaba un delimitador de texto en lugar de un {{ type }}',
    'unsupported attribute': // threads.js:3448
        'Attributo no soportado',
    'unable to nest\n(disabled or circular?)': // threads.js:3462
        'No se pudo anidar\n(\u00BFdesactivado o circular?)',
    '"{{ name }}" is read-only': // threads.js:3505
        '"{{ name }}" es de s\u00F3lo lectura',
    '"{{ name }}"\nis not a valid option': // threads.js:3642
        '"{{ name }}"\nno es una opci\u00F3n v\u00E1lida',
    'unsupported data type {{ type }}': // threads.js:3677
        'Tipo de dato {{ type }} no soportado',
    '{{ className }} >> {{ expression }} {{ variables }}': // threads.js:3958
        undefined,
    'a transient {{ className }} [{{ value }}]': // threads.js:4122
        undefined,
    'a {{ className }} [{{ value }}]': // threads.js:4123
        undefined,
    'a {{ className }} {{{ value }}}': // threads.js:4139
        undefined,
    'a variable of name "{{ name }}"\ndoes not exist in this context': // threads.js:4176 threads.js:4257
        'No existe ninguna variable\nllamada "{{ name }}" en este contexto',
    'Yes': // widgets.js:1607
        'S\u00ED',
    'No': // widgets.js:1608
        'No',
    'Default': // widgets.js:1882
        'Predeterminado',
    '{{ year }} or before': // widgets.js:2024
        '{{ year }} o antes',
    'User name': // widgets.js:2054 widgets.js:2059 widgets.js:2092
        'Nombre de usuario',
    'Birth date': // widgets.js:2061
        'Fecha de nacimiento',
    'Password': // widgets.js:2071 widgets.js:2078
        'Contrase\u00F1a',
    'Repeat Password': // widgets.js:2073
        'Repetir contrase\u00F1a',
    'Old password': // widgets.js:2083
        'Contrase\u00F1a actual',
    'New password': // widgets.js:2085
        'Nueva contrase\u00F1a',
    'Repeat new password': // widgets.js:2087
        'Repetir nueva contrase\u00F1a',
    'please fill out\nthis field': // widgets.js:2196
        'por favor,\ncompleta este campo',
    'User name must be four\ncharacters or longer': // widgets.js:2201
        'el nombre de usuario ha de tener\ncomo m\u00EDnimo 4 caracteres',
    'please provide a valid\nemail address': // widgets.js:2206
        'por favor, escribe\nuna direcci\u00F3n de correo v\u00E1lida',
    'password must be six\ncharacters or longer': // widgets.js:2212
        'la contrase\u00F1a ha de tener\ncomo m\u00EDnimo 6 caracteres',
    'passwords do\nnot match': // widgets.js:2216
        'las contrase\u00F1a no coindicen',
    'please agree to\nthe TOS': // widgets.js:2222
        'por favor, acepta los\nt\u00E9rminos y condiciones de uso',
    'E-mail address of parent or guardian': // widgets.js:2258
        'Correo electr\u00F3nico del padre/madre o tutor legal',
    'E-mail address': // widgets.js:2259
        'Correo electr\u00F3nico',
    'Missing required element <{{ tagName }}>!': // xml.js:186
        'No se encuentra el elemento requerido <{{ tagName }}>',
    'Expected "=" after attribute name': // xml.js:341
        'Se esperaba "=" tras el nombre de atributo',
    'Expected single- or double-quoted attribute value': // xml.js:347
        'Se esperaba un valor de atributo simple o doblemente entrecomillado',
    'Expected ">" after "/" in empty tag': // xml.js:361
        'Se esperaba ">" tras "/" en etiqueta vac\u00EDa',
    'Expected ">" after tag name and attributes': // xml.js:367
        'Se esperaba ">" tras el nombre de etiqueta y atributos',
    'Expected to close {{ tagName }}': // xml.js:379
        'Se esperaba que se cerrase {{ tagName }}',
    'Tools': // libraries/LIBRARIES:1
        'Utilidades',
    'Standard library of powerful blocks (for, map, etc.)': // libraries/LIBRARIES:1
        'Biblioteca est\u00E1ndar de bloques avanzados (for, map, etc...)',
    'Iteration, composition': // libraries/LIBRARIES:2
        'Iteraci\u00F3n, composici\u00F3n',
    'Traditional loop constructs (while, until, etc.) plus the Lisp "named let" (a generalization of FOR) plus functional iteration (repeated invocation of a function) and function composition.': // libraries/LIBRARIES:2
        'Bucles tradicionales (while, until, etc...) + el "named let" de Lisp (una generalizaci\u00F3n del for) + iteraci\u00F3n funcional (invocaci\u00F3n repetida de una funci\u00F3n) y composici\u00F3n de funciones.',
    'List utilities': // libraries/LIBRARIES:3
        'Utilidades de lista',
    'Some standard functions on lists (append, reverse, etc.)': // libraries/LIBRARIES:3
        'Algunas funciones est\u00E1ndar de listas (append, reverse, etc...)',
    'Streams (lazy lists)': // libraries/LIBRARIES:4
        'Streams (listas perezosas)',
    'A variation on the list data type in which each list item aren\'t computed until it\'s needed, so you can construct million-item lists without really taking up all that time or memory, or even infinite-sized lists. (A block that reports all the prime numbers is included as an example.)': // libraries/LIBRARIES:4
        'Una variaci\u00F3n del tipo de dato lista en el que cada elemento se calcula s\u00F3lo cuando es necesario, as\u00ED que puedes construir listas de un mill\u00F3n de elementos sin gastar tiempo o memoria, o incluso listas infinitas. (Se incluye un bloque de ejemplo que reporta todos los n\u00FAmeros primos)',
    'Variadic reporters': // libraries/LIBRARIES:5
        'Reporteros de aridad variable',
    'Versions of +, x, AND, and OR that take more than two inputs.': // libraries/LIBRARIES:5
        'Versiones de +, x, AND, y OR que toman m\u00E1s de dos argumentos.',
    'Web services access (https)': // libraries/LIBRARIES:6
        'Acceso a servicios web (https)',
    'An extended version of the HTTP:// block that allows POST, PUT, and DELETE as well as GET requests, allows using the secure HTTPS protocol, and gives control over headers, etc.': // libraries/LIBRARIES:6
        'Una versi\u00F3n extendida del bloque HTTP:// que permite hacer peticiones POST, PUT y DELETE adem\u00E1s de GET, utilizar el protocolo HTTPS, controlar cabeceras, etc',
    'Words, sentences': // libraries/LIBRARIES:7
        'Palabras, frases',
    'One of the big ideas in Logo that they left out of Scratch is thinking of text as structured into words and sentences, rather than just a string of characters. This library (along with the JOIN WORDS block in the Tools library) brings back that idea.': // libraries/LIBRARIES:7
        'Una de las mejores ideas de Logo no inclu\u00EDda en Scratch es la de considerar un texto como una secuencia de palabras y frases, en lugar de simplemente una cadena de caracteres. Esta biblioteca (junto al bloque UNIR de la biblioteca Utilidades) recupera esa idea.',
    'Multi-branched conditional (switch)': // libraries/LIBRARIES:8
        'Condicionales multirama (switch)',
    'Like "switch" in C-like languages or "cond" in Lisp. Thanks to Nathan Dinsmore for inventing the idea of a separate block for each branch!': // libraries/LIBRARIES:8
        'Como el "switch" de C o el "cond" de Lisp. \u00A1Gracias a Nathan Dinsmore por inventar la idea de un bloque separado para cada rama!',
    'LEAP Motion controller': // libraries/LIBRARIES:9
        'Control gestual (LEAP)',
    'Report hand positions from LEAP Motion controller (leapmotion.com).': // libraries/LIBRARIES:9
        'Reporta las posiciones de las manos desde el controlador de LEAP Motion (leapmotion.com).',
    'Set RGB or HSV pen color': // libraries/LIBRARIES:10
        'Colores RGB o HSV',
    'Set or report pen color as RGB (red, green, blue) or HSV (hue, saturation, value).': // libraries/LIBRARIES:10
        'Fija o devuelve el color del l\u00E1piz como RGB (rojo, verde, azul) o HSV (matiz, saturaci\u00F3n, valor).',
    'Catch errors in a script': // libraries/LIBRARIES:11
        'Captura de errores en programas',
    'Run a script; if an error happens, instead of stopping the script with a red halo, run another script to handle the error. Also includes a block to cause an error with a message given as input. Also includes a block to create a script variable and give it a value.': // libraries/LIBRARIES:11
        'Ejecuta un programa. Si ocurre alg\u00FAn error, en lugar de detener la ejecuci\u00F3n el programa con un mensaje en rojo puedes ejecutar otro programa para tratar el error. Tambi\u00E9n incluye un bloque para lanzar un error con un mensaje, un bloque para crear una variable de programa y darle un valor.',
    'Allow multi-line text input to a block': // libraries/LIBRARIES:12
        'Texto multilinea',
    'In general, text inputs allow only a single line. The MULTILINE block accepts multi-line text input and can be used in text input slots of other blocks.': // libraries/LIBRARIES:12
        'En general, las entradas de texto s\u00F3lo aceptan una \u00FAnica l\u00EDnea. El bloque MULTILINEA acepta texto en varias l\u00EDneas y puede ser usado como texto de entrada en otros bloques.',
    'Provide getters and setters for all GUI-controlled global settings': // libraries/LIBRARIES:13
        'Manejo de opciones globales',
    'Eisenberg\'s Law: Anything that can be done from the GUI should be doable from the programming language, and vice versa.': // libraries/LIBRARIES:13
        'Ley de Eisenberg: Cualquier cosa que pueda hacerse desde la interfaz gr\u00E1fica tambi\u00E9n deber\u00EDa de poder hacerse desde el lenguaje de programaci\u00F3n y viceversa.',
    'Infinite precision integers, exact rationals, complex': // libraries/LIBRARIES:14
        'Precisi\u00F3n arbitraria, racionales exactos, n\u00FAmeros complejos.',
    'The full Scheme numeric tower. "USE BIGNUMS <True>" to enable.': // libraries/LIBRARIES:14
        'La torre num\u00E9rica completa de Scheme. "UTILIZAR BIGNUMS <verdadero>" para activarla.',
    'Provide 100 selected colors': // libraries/LIBRARIES:15
        'Paleta de 100 colores preseleccionados',
    'to use instead of hue for better selection': // libraries/LIBRARIES:15
        'Para seleccionar un color por nombre en lugar de por su matiz.',
    'Text to speech': // libraries/LIBRARIES:16
        'Texto a voz',
    'output text using speech synthesis.': // libraries/LIBRARIES:16
        'Salida de texto utilizando s\u00EDntesis de voz',
    'Animation': // libraries/LIBRARIES:17
        'Animaci\u00F3n',
    'glide, grow and rotate using easing functions.': // libraries/LIBRARIES:17
        'Deslizamientos, zooms y rotaciones utilizando funciones curva.',
    'Pixels': // libraries/LIBRARIES:18
        'P\u00EDxeles',
    'manipulate costumes pixel-wise.': // libraries/LIBRARIES:18
        'Manipula disfraces a nivel de pixel.',
    'Audio Comp': // libraries/LIBRARIES:19
        'Audio',
    'analyze, manipulate and generate sound samples.': // libraries/LIBRARIES:19
        'Analiza, manipula y genera muestras de sonido.',
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
SnapTranslator.dict.es.deprecated = {
    'Please make sure your web browser is up to date\nand your camera is properly configured.\n\nSome browsers also require you to access Snap!\nthrough HTTPS to use the camera.\n\nPlease replace the "http://" part of the address\nin your browser by "https://" and try again.':
        'Por favor, comprueba que tu navegador est\u00E9 actualizado\ny tu c\u00E1mara configurada correctamente.\n\nAlgunos navegadores necesitan que accedas a Snap!\na trav\u00E9s de HTTPS para usar la c\u00E1mara.\n\nPor favor, reemplaza el "http://" en la barra de direcciones\nde tu navegador por "https://" y vuelve a intentarlo.',
    'new':
        'nuevo mensaje',
    'a variable of name \'':
        'no existe ninguna variable llamada\n\'',
    '\'\ndoes not exist in this context':
        '\'\nen este contexto',
    'Snap! website':
        'Sitio web de Snap!',
    '(in a new window)':
        '(en una nueva ventana)',
    'Select categories of additional blocks to add to this project.':
        'a\u00F1ade bloques adicionales\npor categor\u00EDas a este proyecto',
    'unused block(s) removed':
        'bloque(s) no utilizado(s) eliminados',
    'Logout':
        'Cerrar sesi\u00F3n',
    'url':
        'Url',
    'export project media only':
        'Exportar s\u00F3lo medios del proyecto',
    'export project without media':
        'Exportar proyecto sin medios',
    'export project as cloud data':
        'Exportar proyecto como datos en la nube',
    'open shared project from cloud':
        'Abrir proyecto compartido en la nube',
    'Snap!Cloud':
        'Snap!Cloud',
    'localhost':
        'localhost',
    'localhost (secure)':
        'localhost (seguro)',
    'or before':
        'o antes',
    'password has been changed.':
        'Contrase\u00F1a cambiada.',
    'Author name\u2026':
        'Nombre del autor',
    'Successfully connected to':
        'Conectado correctamente a',
    'disconnected.':
        'Desconectado.',
    'EXPERIMENTAL! uncheck to disable live\ncustom control structures':
        '\u00A1EXPERIMENTAL! desmarcar para desactivar las\nestructuras de control personalizadas en vivo',
    'EXPERIMENTAL! check to enable\nlive custom control structures':
        '\u00A1EXPERIMENTAL! marcar para activar las\nestructuras de control personalizadas en vivo',
    'experimental -\nunder construction':
        'experimental\n(en construcci\u00F3n)',
    'detach from':
        'desvincular de',
    'check to inherit\nfrom':
        'marcar para heredar de',
    '\ncolor':
        '\ncolor',
    '\nalpha\nvalue':
        '\nvalor alfa',
    'show the\nWorld\'s menu':
        'muestra el men\u00FA del Mundo',
    'blurry shades,\nuse for new browsers':
        'sombras difuminadas\n(para navegadores modernos)',
    'about morphic.js':
        'acerca de morphic.js',
    'Ok':
        'Aceptar',
    'Save Project As':
        'Guardar proyecto como',
    'Saved!':
        '\u00A1Guardado!',
    'Are you sure you want to delete':
        '\u00BFSeguro que quieres eliminar',
    'saved.':
        'Guardado.',
    'last changed':
        '\u00FAltima modificaci\u00F3n',
    'Are you sure you want to share':
        '\u00BFSeguro que quieres\ncompartir',
    'Are you sure you want to unshare':
        '\u00BFSeguro que quieres\ndejar de compartir',
    'shared.':
        'Compartido.',
    'unshared.':
        'No compartido.',
    'Are you sure you want to publish':
        '\u00BFSeguro que quieres\npublicar',
    'Are you sure you want to unpublish':
        '\u00BFSeguro que quieres\ndejar de publicar',
    'published.':
        'Publicado.',
    'unpublished.':
        'No publicado',
    'Single input.':
        'Entrada simple.',
    'Kind of':
        'Clase de',
    'Part of':
        'Parte de',
    'Could not export':
        'No se ha podido exportar',
    'This item could not be exported from Snap!.\nIt\'s likely that your project may contain a lot of media (sounds and images) or that you are using an older browser.\nPlease try using a recent version of Chrome, Firefox, or Safari.':
        'No se ha podido exportar el texto',
    'Imported':
        'Se ha importado',
    'Loading':
        'Cargando',
    'expecting':
        'se esperaban las entradas',
    'input(s), but getting':
        'pero se ha encontrado',
    '(temporary)':
        '(temporal)',
};
