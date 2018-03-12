/*

    lang-ca.js

    Catalan translation for Snap!

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
SnapTranslator.dict.ca = {
    metadata: {
        'name': // the name as it should appear in the language menu
            'Catal\u00E0',
        'english_name': // the english name of the language
            'Catalan',
        'translators': [ // translators authors for the Translators tab
            'Bernat Romagosa Carrasquer <bernat@snap4arduino.rocks>',
            'Joan Guill\u00E9n i Pelegay <jguille2@xtec.cat>'
        ],
        'last_changed': // this, too, will appear in the Translators tab
            '2017-11-15',
    },
    strings: {},
};
// ✂ - - - - - - - - - - - - - - - - -  -   -

SnapTranslator.dict.ca.strings = {
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
        'dibuix sobre l\'escenari',
    'stage image': // blocks.js:821
        'imatge de l\'escenari',
    'with inputs': // blocks.js:831
        'amb entrades',
    'block variables': // blocks.js:840 byob.js:1053
        'variables del bloc',
    'Input Names': // blocks.js:844
        'Noms d\'entrades',
    'input names': // blocks.js:850
        'noms d\'entrades',
    'Input name': // blocks.js:902 blocks.js:5344
        'Nom de la ranura',
    '(90) right': // blocks.js:935 morphic.js:4888
        '(90) dreta',
    '(-90) left': // blocks.js:936 morphic.js:4889
        '(-90) esquerra',
    '(0) up': // blocks.js:937 morphic.js:4890
        '(0) amunt',
    '(180) down': // blocks.js:938 morphic.js:4891
        '(180) avall',
    'random': // blocks.js:939
        undefined,
    '(1) sine': // blocks.js:956
        '(1) sinus',
    '(2) square': // blocks.js:957
        '(2) quadrat',
    '(3) sawtooth': // blocks.js:958
        '(3) dent de serra',
    '(4) triangle': // blocks.js:959
        '(4) triangle',
    'January': // blocks.js:968 widgets.js:1941
        'gener',
    'February': // blocks.js:969 widgets.js:1942
        'febrer',
    'March': // blocks.js:970 widgets.js:1943
        'mar\u00E7',
    'April': // blocks.js:971 widgets.js:1944
        'abril',
    'May': // blocks.js:972 widgets.js:1945
        'maig',
    'June': // blocks.js:973 widgets.js:1946
        'juny',
    'July': // blocks.js:974 widgets.js:1947
        'juliol',
    'August': // blocks.js:975 widgets.js:1948
        'agost',
    'September': // blocks.js:976 widgets.js:1949
        'setembre',
    'October': // blocks.js:977 widgets.js:1950
        'octubre',
    'November': // blocks.js:978 widgets.js:1951
        'novembre',
    'December': // blocks.js:979 widgets.js:1952
        'desembre',
    'clicked': // blocks.js:988
        'es cliqui',
    'pressed': // blocks.js:989
        'es premi',
    'dropped': // blocks.js:990
        'es deixi anar',
    'mouse-entered': // blocks.js:991
        'el ratol\u00ED toqui',
    'mouse-departed': // blocks.js:992
        'el ratol\u00ED surti d\'',
    'scrolled-up': // blocks.js:993
        undefined,
    'scrolled-down': // blocks.js:994
        undefined,
    'year': // blocks.js:1004 widgets.js:2063
        'any',
    'month': // blocks.js:1005
        'mes',
    'date': // blocks.js:1006
        'dia',
    'day of week': // blocks.js:1007
        'dia de la setmana',
    'hour': // blocks.js:1008
        'hora',
    'minute': // blocks.js:1009
        'minut',
    'second': // blocks.js:1010
        'segon',
    'time in milliseconds': // blocks.js:1011
        'temps (milisegons)',
    'letter': // blocks.js:1021
        'lletra',
    'whitespace': // blocks.js:1022
        'espai en blanc',
    'line': // blocks.js:1023 symbols.js:113
        'l\u00EDnia',
    'tab': // blocks.js:1024
        'tabulador',
    'cr': // blocks.js:1025
        'retorn de carro',
    'csv': // blocks.js:1026
        undefined,
    'last': // blocks.js:1036 blocks.js:1048
        '\u00FAltim',
    'all': // blocks.js:1038 blocks.js:1265 byob.js:3874
        'tot',
    'any': // blocks.js:1049
        'qualsevol',
    'distance': // blocks.js:1058
        undefined,
    'direction': // blocks.js:1059 blocks.js:2483 blocks.js:8556 objects.js:300
        'direcci\u00F3',
    'color': // blocks.js:1117 morphic.js:4132 morphic.js:4135 morphic.js:12219 morphic.js:12222
        'color',
    'fisheye': // blocks.js:1118
        'ull de peix',
    'whirl': // blocks.js:1119
        'remol\u00ED',
    'pixelate': // blocks.js:1120
        'pixelat',
    'mosaic': // blocks.js:1121
        'mosaic',
    'duplicate': // blocks.js:1122 blocks.js:2545 blocks.js:11904 gui.js:7368 gui.js:7710 morphic.js:4167 objects.js:3236
        'duplica',
    'negative': // blocks.js:1123
        'negatiu',
    'comic': // blocks.js:1124
        'c\u00F2mic',
    'confetti': // blocks.js:1125
        'confeti',
    'saturation': // blocks.js:1126
        'saturaci\u00F3',
    'brightness': // blocks.js:1127
        'brillantor',
    'ghost': // blocks.js:1128
        'fantasma',
    'any key': // blocks.js:1146
        'qualsevol tecla',
    'up arrow': // blocks.js:1147
        'fletxa amunt',
    'down arrow': // blocks.js:1148
        'fletxa avall',
    'right arrow': // blocks.js:1149
        'fletxa dreta',
    'left arrow': // blocks.js:1150
        'fletxa esquerra',
    'space': // blocks.js:1151
        'espai',
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
        'valor absolut',
    'ceiling': // blocks.js:1227 morphic.js:7085 morphic.js:7088
        'sostre',
    'floor': // blocks.js:1228 morphic.js:7069 morphic.js:7072
        'part entera',
    'sqrt': // blocks.js:1229
        'arrel quadrada',
    'sin': // blocks.js:1230
        'sin',
    'cos': // blocks.js:1231
        'cos',
    'tan': // blocks.js:1232
        'tan',
    'asin': // blocks.js:1233
        'asin',
    'acos': // blocks.js:1234
        'acos',
    'atan': // blocks.js:1235
        'atan',
    'ln': // blocks.js:1236
        'ln',
    'log': // blocks.js:1237
        undefined,
    'e^': // blocks.js:1238
        'e^',
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
        'aquest programa',
    'this block': // blocks.js:1267
        'aquest block',
    'all but this script': // blocks.js:1268
        'tot excepte aquest programa',
    'other scripts in sprite': // blocks.js:1269
        'els altres programes d\'aquest objecte',
    'String': // blocks.js:1290
        undefined,
    'Number': // blocks.js:1291 byob.js:3286
        'Nombre',
    'true': // blocks.js:1292 blocks.js:9529 blocks.js:9919 objects.js:2979
        'cert',
    'false': // blocks.js:1293 blocks.js:9544 blocks.js:9930 objects.js:2979
        'fals',
    'code': // blocks.js:1334
        'codi',
    'header': // blocks.js:1335
        'cap\u00E7alera',
    'list': // blocks.js:1408 blocks.js:8487
        'llista',
    'item': // blocks.js:1409
        undefined,
    'delimiter': // blocks.js:1410
        'limitaodr',
    'collection': // blocks.js:1419
        'col\u00B7lecci\u00F3',
    'variables': // blocks.js:1420
        'variables',
    'parameters': // blocks.js:1421
        'par\u00E0metres',
    'untitled': // blocks.js:1993 blocks.js:2604 blocks.js:6443 blocks.js:11919 byob.js:1037 byob.js:3910 gui.js:979 gui.js:4036 store.js:296
        'Sense t\u00EDtol',
    '{{ projectName }} script pic': // blocks.js:1993 blocks.js:2602 blocks.js:6441 byob.js:1035
        undefined,
    'script target cannot be found for orphaned block': // blocks.js:2203
        undefined,
    'a {{ className }} ("{{ value }}...")': // blocks.js:2207 morphic.js:8466 morphic.js:9146
        undefined,
    'Variable name': // blocks.js:2377 blocks.js:3262 objects.js:2179 objects.js:7304
        'Nom de variable',
    'help': // blocks.js:2386 objects.js:1851 objects.js:2308
        'ajuda',
    'script pic with result': // blocks.js:2393
        'imatge del programa i del resultat',
    'open a new window\nwith a picture of both\nthis script and its result': // blocks.js:2397
        'obre una finestra\namb el programa i el resultat',
    'rename': // blocks.js:2409 blocks.js:2458 blocks.js:2521 gui.js:7708 gui.js:8409 morphic.js:7656
        'canvia el nom',
    'rename only\nthis reporter': // blocks.js:2413 blocks.js:2462 blocks.js:2523
        'reanomena nom\u00E9s\naquesta inst\u00E0ncia',
    'rename all': // blocks.js:2416 blocks.js:2465
        'reanomena arreu',
    'rename all blocks that\naccess this variable': // blocks.js:2418 blocks.js:2467
        'reanomena totes les inst\u00E0ncies\nd\'aquesta variable',
    'inherited': // blocks.js:2426 blocks.js:2437 blocks.js:2490 blocks.js:6370 byob.js:1099 byob.js:1121
        'heretat',
    'uncheck to\ndisinherit': // blocks.js:2431 blocks.js:2495 blocks.js:6375 byob.js:1113
        'desmarqueu per a\ndesheretar',
    'check to inherit\nfrom {{ name }}': // blocks.js:2443 blocks.js:2496 blocks.js:6376 byob.js:1125
        'marqueu per heretar\nde {{ name }}',
    'transient': // blocks.js:2450
        'no persistent',
    'uncheck to save contents\nin the project': // blocks.js:2453
        'desactiveu l\'opci\u00F3 per desar els continguts\nen el projecte',
    'check to prevent contents\nfrom being saved': // blocks.js:2454
        'activeu l\'opci\u00F3 per evitar que els continguts\nes desin',
    'hide': // blocks.js:2472 morphic.js:4214 objects.js:394
        'amaga',
    'x position': // blocks.js:2481 blocks.js:8554 objects.js:288
        'posici\u00F3 x',
    'y position': // blocks.js:2482 blocks.js:8555 objects.js:294
        'posici\u00F3 y',
    'size': // blocks.js:2484 blocks.js:8559 objects.js:382
        'mida',
    'costume #': // blocks.js:2485 blocks.js:8557 blocks.js:8561 objects.js:317
        'n\u00FAmero de vestit',
    'header mapping': // blocks.js:2507 blocks.js:2677
        'mapejant la cap\u00E7alera',
    'code mapping': // blocks.js:2511 blocks.js:2681
        'mapejant el codi',
    'relabel': // blocks.js:2527 blocks.js:2538
        'blocs similars',
    'make a copy\nand pick it up': // blocks.js:2564 blocks.js:11908 morphic.js:4171
        'f\u00E9s una c\u00F2pia\ni pren-la',
    'only duplicate this block': // blocks.js:2586
        'duplica nom\u00E9s aquest bloc',
    'delete': // blocks.js:2590 blocks.js:11910 gui.js:7372 gui.js:7711 gui.js:8410 morphic.js:4215 objects.js:3242
        'esborra\'m',
    'script pic': // blocks.js:2594 byob.js:1030
        'mostra la meva imatge',
    'open a new window\nwith a picture of this script': // blocks.js:2608 byob.js:1041
        'obre una nova finestra\namb una imatge d\'aquest programa',
    'download script': // blocks.js:2612
        undefined,
    '{{ name }} script': // blocks.js:2622
        undefined,
    'download this script\nas an XML file': // blocks.js:2627
        undefined,
    'unringify': // blocks.js:2657
        'des-encapsula\'m',
    'ringify': // blocks.js:2661 blocks.js:2673
        'encapsula\'m',
    'delete block': // blocks.js:2691
        undefined,
    'spec': // blocks.js:2692 blocks.js:2699
        undefined,
    'Help': // blocks.js:2980 blocks.js:2997
        'Ajuda',
    'Enter code that corresponds to the block\'s definition. Use the formal parameter\nnames as shown and <body> to reference the definition body\'s generated text code.': // blocks.js:3026
        'Introdueix el codi que correspon a la definici\u00F3 del bloc. Utilitza els noms\ndels par\u00E0metres per mostrar-los i <body> per referenciar el codi generat per la definici\u00F3 del cos',
    'Enter code that corresponds to the block\'s definition. Choose your own\nformal parameter names (ignoring the ones shown).': // blocks.js:3029
        'Introdueix el codi que correspon a la definici\u00F3 del bloc. Tria els teus\npropis noms (ignorant els que es mostren).',
    'Header mapping': // blocks.js:3043
        'Mapeig de la cap\u00E7alera',
    'Code mapping': // blocks.js:3072
        'Mapeig del codi',
    'Enter code that corresponds to the block\'s operation (usually a single\nfunction invocation). Use <#n> to reference actual arguments as shown.': // blocks.js:3077
        'Introdueix el codi que correspon a l\'operaci\u00F3 del bloc (normalment nom\u00E9s una funci\u00F3). Utilitza <#n> per referenciar els par\u00E0metres actuals tal com es mostren.',
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
        'Nom de la variable de programa',
    'undrop': // blocks.js:6320 blocks.js:6709
        'desf\u00E9s',
    'undo the last\nblock drop\nin this pane': // blocks.js:6324
        'desf\u00E9s l\'\u00FAltim moviment\nde blocs',
    'redrop': // blocks.js:6335 blocks.js:6722
        'ref\u00E9s',
    'redo the last undone\nblock drop\nin this pane': // blocks.js:6339
        'ref\u00E9s l\'\u00FAltim moviment\nde blocs desfet',
    'clear undrop queue': // blocks.js:6345
        undefined,
    'forget recorded block drops\non this pane': // blocks.js:6351
        undefined,
    'clean up': // blocks.js:6359
        'neteja',
    'arrange scripts\nvertically': // blocks.js:6359
        'alinea els programes\nverticalment',
    'add comment': // blocks.js:6360
        'afegeix un comentari',
    'scripts pic': // blocks.js:6362
        'exporta com a imatge',
    'open a new window\nwith a picture of all scripts': // blocks.js:6364
        'obre una nova finestra\namb la imatge d\'aquests programes',
    'make a block': // blocks.js:6380
        'crea un bloc',
    'Make a block': // blocks.js:6398 objects.js:2303 objects.js:2352 objects.js:2411
        'Crea un bloc',
    'nothing to undrop': // blocks.js:6549
        undefined,
    'unsupported action for {{ morph }}': // blocks.js:6640
        undefined,
    'use the keyboard\nto enter blocks': // blocks.js:6747
        'utilitza el teclat\nper escriure els blocs',
    'script target cannot be found for orphaned scripts': // blocks.js:6925
        undefined,
    'choose new parent': // blocks.js:7225 morphic.js:4253
        undefined,
    'new message': // blocks.js:8338 blocks.js:8370
        undefined,
    'Message name': // blocks.js:8345 blocks.js:8377
        'Nom del missatge',
    'any message': // blocks.js:8360
        'qualsevol missatge',
    'mouse-pointer': // blocks.js:8391 blocks.js:8420
        'punter del ratol\u00ED',
    'edge': // blocks.js:8392
        'vora',
    'random position': // blocks.js:8418
        undefined,
    'myself': // blocks.js:8445
        'mi mateix',
    'number': // blocks.js:8484
        'nombre',
    'text': // blocks.js:8485 morphic.js:12305
        'text',
    'Boolean': // blocks.js:8486
        'Boole\u00E0',
    'sprite': // blocks.js:8490
        'objecte',
    'costume': // blocks.js:8492 objects.js:3069
        undefined,
    'sound': // blocks.js:8493
        undefined,
    'command': // blocks.js:8494
        'comanda',
    'reporter': // blocks.js:8495
        'reportador',
    'predicate': // blocks.js:8496
        'predicat',
    'neighbors': // blocks.js:8502
        'veins',
    'self': // blocks.js:8503
        'un mateix',
    'other sprites': // blocks.js:8504
        'els altres objectes',
    'clones': // blocks.js:8505
        'clons',
    'other clones': // blocks.js:8506
        'altres clons',
    'parts': // blocks.js:8508
        'parts',
    'anchor': // blocks.js:8509
        '\u00E0ncora',
    'stage': // blocks.js:8511 symbols.js:95
        'escenari',
    'children': // blocks.js:8513
        'fill',
    'parent': // blocks.js:8514 gui.js:7178 gui.js:7385
        'pare',
    'temporary?': // blocks.js:8516
        undefined,
    'name': // blocks.js:8519
        'nom',
    'costumes': // blocks.js:8520
        'vestits',
    'sounds': // blocks.js:8521
        'sons',
    'dangling?': // blocks.js:8522
        'penjat?',
    'rotation x': // blocks.js:8523
        'rotaci\u00F3 x',
    'rotation y': // blocks.js:8524
        'rotaci\u00F3 y',
    'center x': // blocks.js:8525
        'centre x',
    'center y': // blocks.js:8526
        'centre y',
    'costume name': // blocks.js:8558 blocks.js:8562
        'nom del vestit',
    'Turtle': // blocks.js:8582 gui.js:7941 objects.js:3166 threads.js:3349
        'Tortuga',
    'Empty': // blocks.js:8584 gui.js:7941 objects.js:3166 threads.js:3350
        'Buit',
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
        'llista d\'entrades',
    'add comment here': // blocks.js:11762
        'afegeix un comentari aqu\u00ED',
    'comment pic': // blocks.js:11912
        'imatge del comentari',
    '{{ projectName }} comment pic': // blocks.js:11917
        undefined,
    'open a new window\nwith a picture of this comment': // blocks.js:11923
        'obre una finestra\namb una imatge del comentari',
    'Change block': // byob.js:885
        'Canvia el bloc',
    '{{ varName }} (temporary)': // byob.js:1011 objects.js:9431 threads.js:1670
        '{{ varName }} (temporal)',
    'translations': // byob.js:1044
        undefined,
    'experimental': // byob.js:1048 byob.js:1057 byob.js:1065
        'experimental',
    'under construction': // byob.js:1048 byob.js:1057 byob.js:1065
        'under construction',
    'remove block variables': // byob.js:1061
        'resborra les variables del bloc',
    'duplicate block definition': // byob.js:1079
        undefined,
    'delete block definition': // byob.js:1089 byob.js:1133 byob.js:1147
        'esborra la definici\u00F3 d\'aquest bloc',
    'edit': // byob.js:1157 gui.js:7699 morphic.js:8730 morphic.js:9477 objects.js:3255 objects.js:3261 objects.js:7422
        'edita',
    'Delete Custom Block': // byob.js:1228
        'Esborra el bloc personalitzat',
    'Are you sure you want to delete this\ncustom block and all its instances?': // byob.js:1229
        'Segur que vols esborrar la definici\u00F3\nd\'aquest bloc?',
    'OK': // byob.js:1648 byob.js:2117 byob.js:3237 byob.js:3848 gui.js:3713 morphic.js:3958 morphic.js:4028 morphic.js:4054 objects.js:8312 paint.js:161 tables.js:1212 widgets.js:1574 widgets.js:1708 widgets.js:1791 widgets.js:1874 widgets.js:2155 widgets.js:2434
        'D\'acord',
    'Cancel': // byob.js:1649 byob.js:2120 byob.js:3243 byob.js:3849 gui.js:3371 gui.js:3714 gui.js:5941 gui.js:6843 gui.js:8996 gui.js:9134 morphic.js:4031 morphic.js:4057 objects.js:8313 paint.js:162 widgets.js:1709 widgets.js:1792 widgets.js:1887 widgets.js:2156
        'Cancel\u00B7la',
    'Command': // byob.js:1770
        'Comanda',
    'Reporter': // byob.js:1779 byob.js:3290
        'Reportador',
    'Predicate': // byob.js:1788 byob.js:3291
        'Predicat',
    'for all sprites': // byob.js:1850 byob.js:3662
        'per a tots els objectes',
    'for this sprite only': // byob.js:1855 byob.js:3667
        'nom\u00E9s per a aquest objecte',
    'Block Editor': // byob.js:2065
        'Editor de blocs',
    'Method Editor': // byob.js:2066
        'Editor de funcions',
    'Apply': // byob.js:2119
        'Aplica',
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
        'Edita el fragment d\'etiqueta',
    'Create input name': // byob.js:2754
        'Crea una ranura',
    'Edit input name': // byob.js:2755
        'Edita la ranura',
    'new line': // byob.js:2800 byob.js:3266
        'nova l\u00EDnia',
    'Title text': // byob.js:3061
        'Text del t\u00EDtol',
    'Delete': // byob.js:3239 gui.js:5940
        'Esborra',
    'Object': // byob.js:3283
        'Objecte',
    'Text': // byob.js:3284
        'Text',
    'List': // byob.js:3285
        'Llista',
    'Any type': // byob.js:3287
        'Qualsevol tipus',
    'Boolean (T/F)': // byob.js:3288
        'Boole\u00E0 (C/F)',
    'Command\n(inline)': // byob.js:3289
        'Comanda\n(inserida)',
    'Command\n(C-shape)': // byob.js:3292
        'Comanda\n(en forma de C)',
    'Any\n(unevaluated)': // byob.js:3293
        'Qualsevol\n(sense avaluar)',
    'Boolean\n(unevaluated)': // byob.js:3294
        'Boole\u00E0\n(sense avaluar)',
    'Single input': // byob.js:3299
        'Entrada \u00FAnica',
    'Multiple inputs (value is list of inputs)': // byob.js:3304
        'Entrades m\u00FAltiples (el valor \u00E9s una llista d\'entrades)',
    'Upvar - make internal variable visible to caller': // byob.js:3309
        'Variable interna visible des de l\'exterior',
    'Default Value': // byob.js:3314
        'Valor predeterminat',
    'options': // byob.js:3570
        'opcions',
    'read-only': // byob.js:3573
        'nom\u00E9s de lectura',
    'Input Slot Options': // byob.js:3593
        'Opcions de la ranura',
    'Enter one option per line.\nOptionally use "=" as key/value delimiter and {} for submenus. e.g.\n   the answer=42': // byob.js:3597
        undefined,
    'Export blocks': // byob.js:3776 byob.js:3914 gui.js:3187 gui.js:3835
        'Exporta blocs',
    'select': // byob.js:3873
        'selecciona',
    'none': // byob.js:3875 objects.js:5421 objects.js:5427
        'cap bloc',
    '{{ projectName }} blocks': // byob.js:3910
        undefined,
    'no blocks were selected': // byob.js:3915 byob.js:4009 byob.js:4102
        undefined,
    'Import blocks': // byob.js:3962 byob.js:3963 byob.js:4008
        'Importa blocs',
    'Imported Blocks Module': // byob.js:4002 byob.js:4003 gui.js:4355
        undefined,
    'Remove unused blocks': // byob.js:4056 byob.js:4057 byob.js:4101 gui.js:3872
        'Esborra blocs no utilitzats',
    '{{ count }} unused block(s) removed': // byob.js:4096
        '{{ count }} bloc(s) personalitzats no utilitzats esborrats',
    'There was an error while trying to access\na {{ cloudName }} service. Please try again later.': // cloud.js:90
        undefined,
    'Cloud Error': // cloud.js:159
        undefined,
    'You are not logged in': // cloud.js:188 cloud.js:436
        'No esteu validats',
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
        'Descarregant el projecte\ndes del n\u00FAvol',
    'Opening project': // gui.js:430 gui.js:470 gui.js:2627 gui.js:4222
        'Obrint el projecte',
    'Saved project\n{{ name }}': // gui.js:506
        undefined,
    'Visible stepping': // gui.js:716 gui.js:2756
        'Monitoritzar pas a pas',
    'development mode': // gui.js:990 morphic.js:12252
        'mode de desenvolupament',
    'don\'t rotate': // gui.js:1222
        'no gira',
    'can rotate': // gui.js:1223
        'pot girar',
    'only face left/right': // gui.js:1224
        'nom\u00E9s mira a esquerra/dreta',
    'draggable': // gui.js:1329
        'arrossegable',
    'Scripts': // gui.js:1371 gui.js:4179
        'Programes',
    'Costumes': // gui.js:1391 gui.js:3252 gui.js:3255 gui.js:4156
        'Vestits',
    'Backgrounds': // gui.js:1392 gui.js:3252 gui.js:3255
        'Fons',
    'Sounds': // gui.js:1411 gui.js:3262 gui.js:3264 gui.js:4167
        'Sons',
    'add a new Turtle sprite': // gui.js:1545
        'afegeix un nou objecte',
    'paint a new sprite': // gui.js:1567
        'Pinta un nou objecte',
    'take a camera snapshot and\nimport it as a new sprite': // gui.js:1592
        'pren una imatge amb la c\u00E0mera\ni importa-la com un nou vestit',
    'Unable to import this image': // gui.js:1906
        undefined,
    'The picture you wish to import has been\ntainted by a restrictive cross-origin policy\nmaking it unusable for costumes in {{ appName }}.\n\nTry downloading this picture first to your\ncomputer, and import it from there.': // gui.js:1907
        undefined,
    'Serialization failed': // gui.js:2138 gui.js:4684 gui.js:4980 gui.js:5139
        undefined,
    'recording': // gui.js:2353
        undefined,
    'About': // gui.js:2471
        'Sobre Snap!',
    'Reference manual': // gui.js:2474
        'Manual de refer\u00E8ncia',
    '{{ site }} website': // gui.js:2481
        'Web de {{ site }}',
    'Download source': // gui.js:2487
        'Descarrega el codi font',
    'Switch back to user mode': // gui.js:2498
        'Torna a mode d\'usuari',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones': // gui.js:2500
        'canvia els men\u00FAs contextuals\nprimitius de Morphic\nper men\u00FAs m\u00E9s amigables',
    'Switch to dev mode': // gui.js:2507
        'Canvia a mode desenvolupador',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!': // gui.js:2509
        'habilita els men\u00FAs\ncontextuals de\nMorphic i inspectors,\nmode expert!',
    'Cloud URL': // gui.js:2527 gui.js:5654
        undefined,
    'Login': // gui.js:2536
        'Inicia la sessi\u00F3',
    'Signup': // gui.js:2540
        'Registra\'t',
    'Reset Password': // gui.js:2544
        'Recupera la contrasenya',
    'Resend Verification Email': // gui.js:2548
        undefined,
    'Logout {{ username }}': // gui.js:2553
        'Surt {{ username }}',
    'Change Password': // gui.js:2557 gui.js:5420
        'Canvia la contrasenya',
    'Export project media only': // gui.js:2564
        'Exporta nom\u00E9s els sons i imatges del projecte',
    'Export Project As': // gui.js:2569 gui.js:2583 gui.js:2597 gui.js:3158 gui.js:3176
        'Exporta el Projecte com',
    'Export project without media': // gui.js:2578
        'Exporta el projecte sense sons ni imatges',
    'Export project as cloud data': // gui.js:2592
        'Exporta el projecte com a dades en el n\u00FAvol',
    'Open shared project from cloud': // gui.js:2607
        'Obre un projecte compartit en el n\u00FAvol',
    'Author name': // gui.js:2609
        undefined,
    'Project name': // gui.js:2610
        undefined,
    'Language': // gui.js:2676
        'Llengua',
    'Generate {{ filename }} file': // gui.js:2679 gui.js:5035
        undefined,
    'builds the {{ language }} translation file': // gui.js:2684
        undefined,
    'Zoom blocks': // gui.js:2692 gui.js:5120
        'Canvia la mida dels blocs',
    'Stage size': // gui.js:2696 gui.js:5163
        'Mida de l\'escenari',
    'Dragging threshold': // gui.js:2701 gui.js:5226
        'Llindar per l\'arrossegament',
    'specify the distance the hand has to move\nbefore it picks up an object': // gui.js:2703
        'especifica a qu\u00E8 dist\u00E0ncia\ns\'han d\'arrossegar els blocs\nper a que es moguin',
    'Retina display support': // gui.js:2725
        'Suport per pantalles Retina',
    'uncheck for lower resolution,\nsaves computing resources': // gui.js:2728
        'desmarqueu per obtenir una resoluci\u00F3 m\u00E9s baixa;\nimplicar\u00E0 menys consum de mem\u00F2ria.',
    'check for higher resolution,\nuses more computing resources': // gui.js:2729
        'marqueu per obtenir una resoluci\u00F3 me\u015B alta;\nimplicar\u00E0 m\u00E9s consum de mem\u00F2ria..',
    'Input sliders': // gui.js:2733
        'Lliscadors d\'entrada',
    'uncheck to disable\ninput sliders for\nentry fields': // gui.js:2736
        'desmarqueu per deshabilitar\nels lliscadors per als camps\nd\'entrada',
    'check to enable\ninput sliders for\nentry fields': // gui.js:2737
        'marqueu per habilitar\nels lliscadors per als camps\nd\'entrada',
    'Execute on slider change': // gui.js:2741
        'Executa en utilitzar els lliscadors',
    'uncheck to suppress\nrunning scripts\nwhen moving the slider': // gui.js:2744
        'desmarqueu per no llan\u00E7ar\nl\'execuci\u00F3 dels programes\nen utilitzar els seus lliscadors',
    'check to run\nthe edited script\nwhen moving the slider': // gui.js:2745
        'marqueu per habilitar\nl\'execuci\u00F3 dels programes\nen utilitzar els seus lliscadors',
    'Turbo mode': // gui.js:2749
        'Mode turbo',
    'uncheck to run scripts\nat normal speed': // gui.js:2752
        'desmarqueu per executar\nels programes a la velocitat\nnormal',
    'check to prioritize\nscript execution': // gui.js:2753
        'marqueu per activar el mode de\nprioritat en l\'execuci\u00F3 de programes',
    'uncheck to turn off\nvisible stepping': // gui.js:2759
        'desmarqueu per deshabilitar\nla monitoritzaci\u00F3 pas a pas',
    'check to turn on\nvisible stepping (slow)': // gui.js:2760
        'marqueu per monitoritzar la\nprogramaci\u00F3 per pas a pas (alenteix)',
    'Ternary Boolean slots': // gui.js:2764
        'Tres opcions per a les ranures booleanes',
    'uncheck to limit\nBoolean slots to true / false': // gui.js:2770
        'desmarqueu per commutar les ranures\nbooleanes nom\u00E9s entre cert i fals',
    'check to allow\nempty Boolean slots': // gui.js:2771
        'marqueu per permetre tornar a\ndeixar buides les ranures booleanes',
    'Camera support': // gui.js:2775
        'Suport per a c\u00E0mera',
    'uncheck to disable\ncamera support': // gui.js:2778
        'desmarqueu per deshabilitar\nel suport per a c\u00E0meres',
    'check to enable\ncamera support': // gui.js:2779
        'marqueu per habilitar\nel suport a c\u00E0meres',
    'Blurred shadows': // gui.js:2784
        'Ombres suavitzades',
    'uncheck to use solid drop\nshadows and highlights': // gui.js:2787
        'desmarqueu per utilitzar\nombres i real\u00E7ats s\u00F2lids',
    'check to use blurred drop\nshadows and highlights': // gui.js:2788
        'marqueu per utilitzar\nombres i real\u00E7ats suavitzats',
    'Zebra coloring': // gui.js:2792
        'Coloraci\u00F3 en zebra',
    'uncheck to disable alternating\ncolors for nested block': // gui.js:2795
        'desmarqueu per deshabilitar la coloraci\u00F3\nalternada per a blocs imbricats',
    'check to enable alternating\ncolors for nested blocks': // gui.js:2796
        'marqueu per habilitar la coloraci\u00F3\nalternada per a blocs imbricats',
    'Dynamic input labels': // gui.js:2800
        'Etiquetes de camps d\'entrada din\u00E0mics',
    'uncheck to disable dynamic\nlabels for variadic inputs': // gui.js:2803
        'desmarqueu per desactivar les\netiquetes din\u00E0miques en camps variables',
    'check to enable dynamic\nlabels for variadic inputs': // gui.js:2804
        'marqueu per habilitar les\netiquetes din\u00E0miques en camps variables',
    'Prefer empty slot drops': // gui.js:2808
        'D\u00F3na prefer\u00E8ncia a les ranures buides',
    'uncheck to allow dropped\nreporters to kick out others': // gui.js:2811
        'desmarqueu per a fer que les ranures\nbuides tinguin la mateixa prefer\u00E8ncia que les\nplenes a l\'hora de deixar-hi caure peces',
    'check to focus on empty slots\nwhen dragging & dropping reporters': // gui.js:2812
        'marqueu per a fer que les ranures\nbuides tinguin prefer\u00E8ncia sobre les plenes\na l\'hora de deixar-hi caure peces',
    'Long form input dialog': // gui.js:2816
        'For\u00E7a el di\u00E0leg de selecci\u00F3 de tipus',
    'uncheck to use the input\ndialog in short form': // gui.js:2819
        'desmarqueu per a no mostrar\nautom\u00E0ticament el di\u00E0leg de selecci\u00F3\nde tipus en afegir par\u00E0metres\nals blocs personalitzats',
    'check to always show slot\ntypes in the input dialog': // gui.js:2820
        'marqueu per a mostrar sempre\nel di\u00E0leg de selecci\u00F3 de tipus\nen afegir par\u00E0metres als blocs\npersonalitzats',
    'Plain prototype labels': // gui.js:2823
        'Etiquetes de prototip simples',
    'uncheck to always show (+) symbols\nin block prototype labels': // gui.js:2826
        'desmarqueu per mostrar sempre el\ns\u00EDmbol (+) en les etiquetes de prototip\nde bloc (a l\'editor de blocs)',
    'check to hide (+) symbols\nin block prototype labels': // gui.js:2827
        'marqueu per amagar el s\u00EDmbol (+)\nen les etiquetes de prototip\nde bloc (a l\'editor de blocs)',
    'Virtual keyboard': // gui.js:2830
        'Teclat virtual',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices': // gui.js:2833
        'desmarqueu per inhabilitar\nel suport per al teclat virtual\nen dispositius m\u00F2bils',
    'check to enable\nvirtual keyboard support\nfor mobile devices': // gui.js:2834
        'marqueu per habilitar\nel suport per al teclat virtual\nen dispositius m\u00F2bils',
    'Clicking sound': // gui.js:2838
        'So de clic',
    'uncheck to turn\nblock clicking\nsound off': // gui.js:2848
        'desmarqueu per deshabilitar\nel so de clic en clicar sobre\nels blocs',
    'check to turn\nblock clicking\nsound on': // gui.js:2849
        'marqueu per habilitar\nel so de clic en clicar sobre\nels blocs',
    'Animations': // gui.js:2852
        'Animacions',
    'uncheck to disable\nIDE animations': // gui.js:2855
        'desmarqueu per deshabilitar\nles animacions de la interf\u00EDcie',
    'check to enable\nIDE animations': // gui.js:2856
        'marqueu per habilitar\nles animacions de la interf\u00EDcie',
    'Cache Inputs': // gui.js:2860
        'Entrades a la Mem\u00F2ria Cau',
    'uncheck to stop caching\ninputs (for debugging the evaluator)': // gui.js:2866
        'desmarqueu per no desar les entrades\na la mem\u00F2ria cau (per depurar l\'avaluador)',
    'check to cache inputs\nboosts recursion': // gui.js:2867
        'marqueu per a desar les entrades\na la mem\u00F2ria cau (accelera la recursivitat)',
    'Rasterize SVGs': // gui.js:2871
        'Transforma SVG en mapa de bits',
    'uncheck for smooth\nscaling of vector costumes': // gui.js:2877
        'desmarqueu per atenuar\nescalant les imatges vectorials',
    'check to rasterize\nSVGs on import': // gui.js:2878
        'marqueu per transformar els\nSVG a mapa de bits en importar',
    'Flat design': // gui.js:2882
        'Disseny pla',
    'uncheck for default\nGUI design': // gui.js:2890
        'desmarqueu per obtenir la\ninterf\u00EDcie gr\u00E0fica per defecte',
    'check for alternative\nGUI design': // gui.js:2891
        'marqueu per obtenir una\ninterf\u00EDcie gr\u00E0fica alternativa',
    'Nested auto-wrapping': // gui.js:2895
        'Engloba blocs interns',
    'uncheck to confine auto-wrapping\nto top-level block stacks': // gui.js:2906
        'desmarqueu per restringir\nl\'englobament de blocs a les piles senceres',
    'check to enable auto-wrapping\ninside nested block stacks': // gui.js:2907
        'marqueu per habilitar\nl\'englobament de blocs interns',
    'Project URLs': // gui.js:2911
        'URL del projecte',
    'uncheck to disable\nproject data in URLs': // gui.js:2921
        'desmarqueu per deshabilitar\nles dades del projecte a la URL',
    'check to enable\nproject data in URLs': // gui.js:2922
        'marqueu per habilitar\nles dades del projecte a la URL',
    'Sprite Nesting': // gui.js:2926
        'Ancoratge d\'objectes',
    'uncheck to disable\nsprite composition': // gui.js:2932
        'desmarqueu per deshabilitar\nl\'ancoratge d\'objectes',
    'check to enable\nsprite composition': // gui.js:2933
        'marqueu per habilitar\nl\'ancoratge d\'objectes',
    'First-Class Sprites': // gui.js:2937
        'Objectes de primera classe',
    'uncheck to disable support\nfor first-class sprites': // gui.js:2946
        'desmarqueu per deshabilitar el suport\nals objectes de primera classe.',
    'check to enable support\nfor first-class sprite': // gui.js:2947
        'marqueu per habilitar el suport\nals objectes de primera classe.',
    'Keyboard Editing': // gui.js:2951
        'Edici\u00F3 per teclat',
    'uncheck to disable\nkeyboard editing support': // gui.js:2963
        'desmarqueu per deshabilitar\nel suport a l\'edici\u00F3 per teclat',
    'check to enable\nkeyboard editing support': // gui.js:2964
        'marqueu per habilitar\nel suport a l\'edici\u00F3 per teclat',
    'Table support': // gui.js:2968
        'Edici\u00F3 de taules',
    'uncheck to disable\nmulti-column list views': // gui.js:2979
        'desmarqueu per a deshabilitar\nla vista de llista amb multicolumnes',
    'check for multi-column\nlist view support': // gui.js:2980
        'marqueu per habilitar el suport\na la vista de llista amb multicolumnes',
    'Table lines': // gui.js:2985
        'L\u00EDnies de taules',
    'uncheck for less contrast\nmulti-column list views': // gui.js:2996
        'desmarqueu per a tenir un baix contrast\na la vista de llista amb multicolumnes',
    'check for higher contrast\ntable views': // gui.js:2997
        'marqueu per obtenir un contrast m\u00E9s alt\na la vista de taula',
    'Live coding support': // gui.js:3002
        'Suport per a la programaci\u00F3 din\u00E0mica',
    'EXPERIMENTAL!': // gui.js:3008 gui.js:3010 gui.js:3024 gui.js:3026
        'EXPERIMENTAL!',
    'uncheck to disable live\ncustom control structures': // gui.js:3009
        'desmarqueu per deshabilitar\nel control din\u00E0mic d\'estructures personalitzades',
    'check to enable\nlive custom control structures': // gui.js:3011
        'marqueu per habilitar\nel control din\u00E0mic d\'estructures personalitzades',
    'JIT compiler support': // gui.js:3015
        undefined,
    'uncheck to disable live\nsupport for compiling': // gui.js:3025
        undefined,
    'check to enable\nsupport for compiling': // gui.js:3027
        undefined,
    'Thread safe scripts': // gui.js:3032
        'Fil d\'execuci\u00F3 segur',
    'uncheck to allow\nscript reentrance': // gui.js:3035
        'desmarqueu per permetre\nla re-entrada als programes',
    'check to disallow\nscript reentrance': // gui.js:3036
        'marqueu per no permetre\nla re-entrada als programes',
    'Prefer smooth animations': // gui.js:3039
        'Suavitza les animacions',
    'uncheck for greater speed\nat variable frame rates': // gui.js:3042
        'desmarqueu per augmentar la velocitat de\nles animacions fins la m\u00E0xima capacitat d\'aquesta m\u00E0quina',
    'check for smooth, predictable\nanimations across computers': // gui.js:3043
        'marqueu per aconseguir unes animacions\nm\u00E9s suaus i a velocitat previsible en m\u00E0quines diferents',
    'Flat line ends': // gui.js:3047
        'L\u00EDnies del llapis rectes',
    'uncheck for round ends of lines': // gui.js:3053
        'desmarqueu per fer que\nels extrems de les l\u00EDnies\ndel llapis siguin arrodonides',
    'check for flat ends of lines': // gui.js:3054
        'marqueu per fer que els\nextrems de les l\u00EDnies del\nllapis siguin rectes',
    'Codification support': // gui.js:3057
        'Suport pel mapeig de codi',
    'uncheck to disable\nblock to text mapping features': // gui.js:3066
        'demarqueu per deshabilitar les\nfuncionalitats de mapeig de blocs en codi',
    'check for block\nto text mapping features': // gui.js:3067
        'marqueu per habilitar les funcionalitats\nde mapeig de blocs en codi',
    'Inheritance support': // gui.js:3071
        'Suport a l\'her\u00E8ncia d\'objectes',
    'uncheck to disable\nsprite inheritance features': // gui.js:3080
        'desmarqueu per deshabilitar les\nfuncionalitats relatives a l\'her\u00E8ncia d\'objectes',
    'check for sprite\ninheritance features': // gui.js:3081
        'marqueu per habilitar les\nfuncionalitats relatives a l\'her\u00E8ncia d\'objectes',
    'Persist linked sublist IDs': // gui.js:3085
        'Desar mantenint les ID enlla\u00E7ades a les subllistes',
    'uncheck to disable\nsaving linked sublist identities': // gui.js:3091
        'desmarqueu per deshabilitar\nl\'emmagatzament de les ID enlla\u00E7ades a les subllistes.',
    'check to enable\nsaving linked sublist identities': // gui.js:3092
        'marqueu per habilitar\nl\'emmagatzament de les ID enlla\u00E7ades a les subllistes.',
    'Project notes': // gui.js:3107
        'Notes del projecte',
    'New': // gui.js:3109
        'Nou',
    'Open': // gui.js:3110 gui.js:5924
        'Obre',
    'Save': // gui.js:3111 gui.js:5927 gui.js:8995 gui.js:9133
        'Desa',
    'Save As': // gui.js:3112
        'Anomena i desa',
    'Import': // gui.js:3115 gui.js:3370 gui.js:6842
        'Importa',
    'load an exported project file\nor block library, a costume\nor a sound': // gui.js:3146
        'Importa projectes, blocs,\nimatges o sons',
    'Export project (in a new window)': // gui.js:3153
        'Exporta el projecte (dins una nova finestra)',
    'show project data as XML\nin a new browser window': // gui.js:3164
        'mostra tot el projecte en format XML\nen una altra finestra del navegador',
    'Export project as plain text': // gui.js:3170
        'Exporta el projecte',
    'Export project': // gui.js:3171
        'Exporta el projecte',
    'save project data as XML\nto your downloads folder': // gui.js:3181
        'Exporta el projecte en un arxiu\nen format XML',
    'show global custom block definitions as XML\nin a new browser window': // gui.js:3189
        'exporta els blocs personalitzats que triis\nen un arxiu en format XML',
    'Unused blocks': // gui.js:3193
        'Blocs no utilitzats',
    'find unused global custom blocks\nand remove their definitions': // gui.js:3195
        'cerca els blocs personalitzats globals\nque no s\'utilitzan per poder esborrar-los',
    'Export summary': // gui.js:3201
        'Exporta el resum',
    'open a new browser browser window\nwith a summary of this project': // gui.js:3203
        'Obre una finestra del navegador\namb un resum d\'aquest projecte',
    'Export summary with drop-shadows': // gui.js:3208
        'Exporta el resum amb les imatges ombrejades',
    'open a new browser browser window\nwith a summary of this project\nwith drop-shadows on all pictures.\nnot supported by all browsers': // gui.js:3210
        'Obre una finestra del navegador\namb un resum del projecte i\namb totes les imatges ombrejades.\nNo tots els navegadors suporten aquesta funcionalitat',
    'Export all scripts as pic': // gui.js:3217
        'Exporta tots els programes com una imatge',
    'show a picture of all scripts\nand block definitions': // gui.js:3219
        'mostra una imatge de tots els programes\ni les definicions de blocs',
    'Import tools': // gui.js:3226
        'Importa eines',
    'load the official library of\npowerful blocks': // gui.js:3235
        'Carrega la llibreria\noficial de blocs avan\u00E7ats',
    'Libraries': // gui.js:3238
        'Llibreries',
    'select categories of additional blocks to add to this project': // gui.js:3248
        'Trieu conjunts de blocs addicionals per afegir a aquest projecte.',
    'Select a costume from the media library': // gui.js:3259
        'Trieu un vestit de la biblioteca',
    'Select a sound from the media library': // gui.js:3266
        'Trieu un so de la biblioteca',
    'Opening {{ resource }}': // gui.js:3341
        undefined,
    'License': // gui.js:3529 gui.js:3630
        'Llic\u00E8ncia',
    'Contributors': // gui.js:3548
        'Col\u00B7laboradors',
    'current module versions': // gui.js:3574
        'versions actuals dels m\u00F2duls',
    'Translations': // gui.js:3578
        'Traduccions',
    'About Snap': // gui.js:3581
        'Sobre Snap',
    'Translators': // gui.js:3597
        'Traductors',
    'Back': // gui.js:3613
        'Enrere',
    'Modules': // gui.js:3646
        'M\u00F2duls',
    'Credits': // gui.js:3662
        'Cr\u00E8dits',
    'Project Notes': // gui.js:3709
        'Notes del projecte',
    'Saving': // gui.js:3770
        undefined,
    'Saved': // gui.js:3788 gui.js:3796
        'Desat',
    'Save failed': // gui.js:3790
        undefined,
    'Exporting': // gui.js:3811 gui.js:5464 gui.js:5493 gui.js:5503 gui.js:5521 gui.js:5533
        undefined,
    'Exported': // gui.js:3816 gui.js:5471 gui.js:5497 gui.js:5507 gui.js:5527 gui.js:5539
        undefined,
    'Export failed': // gui.js:3819 gui.js:5475 gui.js:5500 gui.js:5530
        undefined,
    'this project doesn\'t have any\ncustom global blocks yet': // gui.js:3836
        'aquest projecte encara no\nt\u00E9 cap bloc personalitzat',
    'there are currently no unused\nglobal custom blocks in this project': // gui.js:3873
        'no hi ha cap bloc\npersonalitzat no utilitzat\nen aquest projecte',
    'Untitled': // gui.js:3937 gui.js:8190 store.js:368 store.js:1651
        'Sense t\u00EDtol',
    'Variables': // gui.js:3968 objects.js:153
        'Variables',
    'Blocks': // gui.js:4000
        'Blocs',
    'Contents': // gui.js:4103
        'Continguts',
    'Kind of {{ name }}': // gui.js:4132
        'Esp\u00E8cie de {{ name }}',
    'Part of {{ name }}': // gui.js:4139
        'Part de {{ name }}',
    'Parts': // gui.js:4144
        'Parts',
    'For all Sprites': // gui.js:4197 gui.js:4201
        'Per a tots els objectes',
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
        'entrant en mode d\'usuari',
    'entering development mode.\n\nerror catching is turned off,\nuse the browser\'s web console\nto see error messages.': // gui.js:4604
        'entrant en mode desenvolupador.\n\ndeshabilitada la captura d\'errades,\nutilitzeu la consola del navegador\nper veure els errors.',
    'Replace the current project with a new one?': // gui.js:4914
        'Vols substituir el projecte actual per un de nou?',
    'New Project': // gui.js:4915
        'Nou projecte',
    'Generating {{ filename }} file': // gui.js:5011
        undefined,
    'Could not generate the language file': // gui.js:5039
        undefined,
    'build': // gui.js:5057
        'construeix',
    'your own': // gui.js:5060
        'els teus propis',
    'blocks': // gui.js:5064
        'blocs',
    'normal (1x)': // gui.js:5106
        'normal (1x)',
    'demo (1.2x)': // gui.js:5107
        'demostraci\u00F3 (1.2x)',
    'presentation (1.4x)': // gui.js:5108
        'presentaci\u00F3 (1.4x)',
    'big (2x)': // gui.js:5109
        'gran (2x)',
    'huge (4x)': // gui.js:5110
        'immens (4x)',
    'giant (8x)': // gui.js:5111
        'gegant (8x)',
    'monstrous (10x)': // gui.js:5112
        'monstru\u00F3s (10x)',
    'Stage width': // gui.js:5166
        'Amplada de l\'escenari',
    'Stage height': // gui.js:5167
        'Al\u00E7ada de l\'escenari',
    '{{ count }} days left': // gui.js:5253
        undefined,
    'You are now logged in, and your account\nis enabled for three days.\nPlease use the verification link that\nwas sent to your email address when you\nsigned up.\n\nIf you cannot find that email, please\ncheck your spam folder. If you still\ncannot find it, please use the "Resend\nVerification Email..." option in the cloud\nmenu.\n\nYou have {{ count }} days left.': // gui.js:5254
        undefined,
    'Sign in': // gui.js:5277
        'Inicia la sessi\u00F3',
    'stay signed in on this computer\nuntil logging out': // gui.js:5283
        'mantenir-me autenticat en aquest ordinador\nfins que em desconnecti',
    'You can now log in': // gui.js:5305
        undefined,
    'Sign up': // gui.js:5314
        'Registra\'t',
    'Terms of Service': // gui.js:5317
        'Condicions d\'\u00FAs',
    'Privacy': // gui.js:5319
        'Privacitat',
    'I have read and agree\nto the Terms of Service': // gui.js:5320
        'He llegit i accepto\nles condicions d\'\u00FAs',
    'An e-mail with a link to\nreset your password\nhas been sent to the address provided': // gui.js:5340
        undefined,
    'Reset password': // gui.js:5352
        'Recupera la contrasenya',
    'An e-mail with a link to\nverify your account\nhas been sent to the address provided': // gui.js:5378
        undefined,
    'Resend verification email': // gui.js:5390
        undefined,
    'password has been changed': // gui.js:5414
        's\'ha canviat la contrasenya',
    'disconnected': // gui.js:5437 gui.js:5440
        'desconnectats',
    'Saving project\nto the cloud': // gui.js:5448 gui.js:6476
        'Desant el projecte\nal n\u00FAvol',
    'saved': // gui.js:5452 gui.js:6481
        'desat',
    '{{ projectName }} media': // gui.js:5468
        undefined,
    'Cloud Connection': // gui.js:5552
        undefined,
    'Successfully connected to\n{{ url }}': // gui.js:5553
        undefined,
    '{{ server }} (secure)': // gui.js:5646
        undefined,
    'Save Project': // gui.js:5799
        'Desa el Projecte',
    'Open Project': // gui.js:5800
        undefined,
    'Cloud': // gui.js:5836
        'N\u00FAvol',
    'Browser': // gui.js:5837
        'Navegador',
    'Examples': // gui.js:5840 gui.js:6198 gui.js:6254 gui.js:6378
        'Exemples',
    'Share': // gui.js:5930
        'Comparteix',
    'Unshare': // gui.js:5931
        'Deixa de compartir',
    '(no matches)': // gui.js:6095
        '(cap resultat)',
    'Updating\nproject list': // gui.js:6119
        'Actualizant\nla llista de projectes',
    'last changed\n{{ date }}': // gui.js:6314
        'el darrer modificat\n{{ date }}',
    'Are you sure you want to replace\n"{{ projectName }}"?': // gui.js:6436 gui.js:6454
        undefined,
    'Replace Project': // gui.js:6438 gui.js:6456
        undefined,
    'Are you sure you want to delete\n"{{ projectName }}"?': // gui.js:6498 gui.js:6522
        'Segur que vols esborrar\n"{{ projectName }}"?',
    'Delete Project': // gui.js:6500 gui.js:6524
        'Esborra un projecte',
    'Are you sure you want to share\n"{{ projectName }}"?': // gui.js:6542
        undefined,
    'Share Project': // gui.js:6544
        'Comparteix el Projecte',
    'sharing\nproject': // gui.js:6546
        'compartint\nel projecte',
    'shared': // gui.js:6563
        'compartit',
    'Are you sure you want to unshare\n"{{ projectName }}"?': // gui.js:6590
        undefined,
    'Unshare Project': // gui.js:6592
        'Deixa de compartir el Projecte',
    'unsharing\nproject': // gui.js:6594
        'deixant de compartir\nel projecte',
    'unshared': // gui.js:6612
        'no compartit',
    'Are you sure you want to publish\n"{{ projectName }}"?': // gui.js:6632
        'Segur que vols compartir-ho?\n"{{ projectName }}"?',
    'Publish Project': // gui.js:6634
        undefined,
    'publishing\nproject': // gui.js:6636
        undefined,
    'published': // gui.js:6651
        undefined,
    'Are you sure you want to unpublish\n"{{ projectName }}"?': // gui.js:6677
        'Segur que vols deixar-ho de compartir?\n"{{ projectName }}"?',
    'Unpublish Project': // gui.js:6679
        undefined,
    'unpublishing\nproject': // gui.js:6681
        undefined,
    'unpublished': // gui.js:6696
        undefined,
    'Import library': // gui.js:6828
        'Importa una llibreria',
    'Loading {{ resource }}': // gui.js:6926 gui.js:7059
        'S\'est\u00E0 carregant {{ resource }}',
    'Imported {{ resource }}': // gui.js:7054
        'S\'ha importat {{ resource }}',
    'pic': // gui.js:7353 morphic.js:4194 objects.js:7425
        'imatge',
    'open a new window\nwith a picture of the stage': // gui.js:7361 objects.js:7432
        'obre una nova finestra\namb una foto de l\'escenari',
    'show': // gui.js:7366 morphic.js:7568 objects.js:388
        'mostra',
    'clone': // gui.js:7370 objects.js:3238
        'clona',
    'release': // gui.js:7388
        'allibera',
    'make temporary and\nhide in the sprite corral': // gui.js:7390
        'transforma\'l en temporal i\ntreu-lo de l\'\u00E0rea dels objectes',
    'detach from {{ name }}': // gui.js:7396 objects.js:3266
        'desenganxa de {{ name }}',
    'detach all parts': // gui.js:7402 objects.js:3271
        'desenganxa totes les parts',
    'export': // gui.js:7406 gui.js:7713 objects.js:3273 objects.js:9542
        'exporta',
    'edit rotation point only': // gui.js:7702
        'edita nom\u00E9s el centre de rotaci\u00F3',
    'rename costume': // gui.js:7755
        'canvia el nom del vestit',
    'rename background': // gui.js:7756
        'canvia el nom del fons',
    'default': // gui.js:7893
        undefined,
    'pen': // gui.js:7975 morphic.js:12402
        'llapis',
    'tip': // gui.js:7982
        'punta',
    'middle': // gui.js:7991
        'mig',
    'Paint a new costume': // gui.js:8085
        'Pinta un nou vestit.',
    'Import a new costume from your webcam': // gui.js:8110
        'Importa un nou vestit amb la webcam',
    'import a picture from another web page or from\na file on your computer by dropping it here': // gui.js:8134
        'podeu importar una imatge des d\'un altre lloc Web o des del\nvostre ordinador arrossegant-la fins aqu\u00ED',
    'Stop': // gui.js:8345 gui.js:8367
        'Atura',
    'Play': // gui.js:8345 gui.js:8375
        'Toca',
    'Play sound': // gui.js:8348 gui.js:8376
        'Toca el so',
    'Stop sound': // gui.js:8368
        'Atura el so',
    'rename sound': // gui.js:8432
        'canvia el nom del so',
    'import a sound from your computer\nby dragging it into here': // gui.js:8526
        'podeu importar un so des del vostre ordinador\narrossegant-lo fins aqu\u00ED',
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
        'elements',
    'length': // lists.js:492 lists.js:703
        'longitud',
    'table view': // lists.js:807
        'vista en format de taula',
    'open in dialog': // lists.js:810 tables.js:1036
        'obre en una finestra',
    'Retina Display Support Problem': // morphic.js:1614
        undefined,
    'Called {{ function }} with {{ count }} arguments': // morphic.js:1676
        undefined,
    'a {{ className }}[{{ count }}]': // morphic.js:2681
        undefined,
    'a {{ className }} {{ count }} {{ bounds }}': // morphic.js:2904
        undefined,
    'user features': // morphic.js:4128
        'opcions d\'usuari',
    'choose another color\nfor this morph': // morphic.js:4141
        'trieu un altre color\nper aquest \'morph\'',
    'transparency': // morphic.js:4144
        'transpar\u00E8ncia',
    'alpha value': // morphic.js:4147
        'valor del\ncanal alfa',
    'set this morph\'s\nalpha value': // morphic.js:4157
        'fixeu el valor del canal\nalfa per aquest \'morph\'',
    'resize': // morphic.js:4160
        'redimensiona',
    'show a handle\nwhich can be dragged\nto change this morph\'s extent': // morphic.js:4162
        'mostra una nansa per\npoder-la arrossegar i canviar\nla mida d\'aquest \'morph\'',
    'pick up': // morphic.js:4174
        'pren aquest \'morph\'',
    'detach and put\ninto the hand': // morphic.js:4176
        'arrossega i mou\namb el punter',
    'attach': // morphic.js:4179
        'enganxa',
    'stick this morph\nto another one': // morphic.js:4181
        'enganxa aquest \'morph\' a un altre',
    'move': // morphic.js:4184 objects.js:3243
        'mou',
    'show a handle\nwhich can be dragged\nto move this morph': // morphic.js:4186
        'mostra una nansa per\npoder-la arrossegar i\nmoure aquest \'morph\'',
    'inspect': // morphic.js:4189 morphic.js:7608 morphic.js:12183
        'examina',
    'open a window\non all properties': // morphic.js:4191
        'obre una finestra\namb totes les propietats',
    'open a new window\nwith a picture of this morph': // morphic.js:4198 morphic.js:12192
        'obre una finestra\namb la imatge del M\u00F3n',
    'lock': // morphic.js:4203
        'bloqueja',
    'make this morph\nunmovable': // morphic.js:4205
        'f\u00E9s que aquest \'morph\'\nno es pugui moure',
    'unlock': // morphic.js:4209
        'desbloqueja',
    'make this morph\nmovable': // morphic.js:4211
        'f\u00E9s que aquest \'morph\'\nes pugui moure',
    'World': // morphic.js:4219
        'M\u00F3n',
    'show the\n{{ WorldMorph }}\'s menu': // morphic.js:4223
        'mostra el men\u00FA del {{ WorldMorph }}',
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
        'mou tot a dins',
    'keep all submorphs\nwithin and visible': // morphic.js:10305 morphic.js:12180
        'mant\u00E9 tots els \'submorphs\'\na dins i visibles',
    'auto line wrap off': // morphic.js:10685
        undefined,
    'turn automatic\nline wrapping\noff': // morphic.js:10687
        undefined,
    'auto line wrap on': // morphic.js:10691
        undefined,
    'enable automatic\nline wrapping': // morphic.js:10693
        undefined,
    '(empty)': // morphic.js:10781
        '(buit)',
    'Are you sure you want to leave?': // morphic.js:12110
        undefined,
    'demo': // morphic.js:12173
        'exemple',
    'sample morphs': // morphic.js:12173
        'crea un \'morph\' de mostra',
    'hide all': // morphic.js:12175
        'amaga-ho tot',
    'show all': // morphic.js:12176 objects.js:7423
        'mostra-ho tot',
    'open a window on\nall properties': // morphic.js:12185
        'obre una finestra\namb totes les propietats',
    'screenshot': // morphic.js:12188 objects.js:413
        'captura de pantalla',
    'restore display': // morphic.js:12196
        'reestableix la visualitzaci\u00F3',
    'redraw the\nscreen once': // morphic.js:12198
        'repinta la pantalla\nuna vegada',
    'fill page': // morphic.js:12201
        'omple la finestra',
    'let the World automatically\nadjust to browser resizing': // morphic.js:12203
        'permet que el M\u00F3n s\'ajusti\nautom\u00E0ticament al canvi de mida de la finestra',
    'sharp shadows': // morphic.js:12207
        'ombres contrastades',
    'sharp drop shadows\nuse for old browsers': // morphic.js:12209
        'utilitza ombres contrastades\nper a navegadors antics',
    'blurred shadows': // morphic.js:12213
        'ombres degradades',
    'blurry shades\nuse for new browsers': // morphic.js:12215
        'utilitza ombres degradades\nper a navegadors moderns',
    'choose the World\'s\nbackground color': // morphic.js:12228
        'tria el color de\nfons del M\u00F3n',
    'touch screen settings': // morphic.js:12232
        'configuraci\u00F3 per pantalla t\u00E0ctil',
    'bigger menu fonts\nand sliders': // morphic.js:12234
        'fa m\u00E9s grans els lliscadors i els men\u00FAs',
    'standard settings': // morphic.js:12238
        'configuraci\u00F3 est\u00E0ndard',
    'smaller menu fonts\nand sliders': // morphic.js:12240
        'fa m\u00E9s petits els lliscadors i els men\u00FAs',
    'user mode': // morphic.js:12247
        'mode d\'usuari',
    'disable developers\'\ncontext menus': // morphic.js:12249
        'desabilita els men\u00FAs\ndel mode de desenvolupament',
    'about {{ resource }}': // morphic.js:12254
        'sobre {{ resource }}',
    'make a morph': // morphic.js:12266
        'crea un \'morph\'',
    'rectangle': // morphic.js:12267 symbols.js:109
        'rectangle',
    'box': // morphic.js:12270
        'caixa',
    'circle box': // morphic.js:12273
        'caixa circular',
    'slider': // morphic.js:12277 objects.js:9461
        'lliscador',
    'dial': // morphic.js:12280
        undefined,
    'frame': // morphic.js:12284
        'marc',
    'scroll frame': // morphic.js:12289
        'marc amb despla\u00E7ament',
    'handle': // morphic.js:12296
        'nansa',
    'string': // morphic.js:12300
        'cadena',
    'Hello, World!': // morphic.js:12301 morphic.js:12329
        'Hola M\u00F3n!',
    'speech bubble': // morphic.js:12328
        'bafarada',
    'gray scale palette': // morphic.js:12333
        'paleta d\'escala de grisos',
    'color palette': // morphic.js:12336
        'paleta de colors',
    'color picker': // morphic.js:12339
        'selector de color',
    'sensor demo': // morphic.js:12343
        'exemple de sensor',
    'animation demo': // morphic.js:12353
        'exemple d\'animaci\u00F3',
    'modules': // morphic.js:12444
        undefined,
    'a lively Web GUI\ninspired by Squeak': // morphic.js:12451
        undefined,
    'written by {{ author }}\n{{ email }}': // morphic.js:12453
        undefined,
    'Motion': // objects.js:146
        'Moviment',
    'Control': // objects.js:147
        'Control',
    'Looks': // objects.js:148
        'Aparen\u00E7a',
    'Sensing': // objects.js:149
        'Sensors',
    'Sound': // objects.js:150 objects.js:8570
        'So',
    'Operators': // objects.js:151
        'Operadors',
    'Pen': // objects.js:152
        'Llapis',
    'Lists': // objects.js:154
        'Llistes',
    'Other': // objects.js:155
        'Altres',
    'move %n steps': // objects.js:201
        'mou-te %n passos',
    'turn %clockwise %n degrees': // objects.js:208
        'gira %clockwise %n graus',
    'turn %counterclockwise %n degrees': // objects.js:215
        'gira %counterclockwise %n graus',
    'point in direction %dir': // objects.js:222
        'apunta en direcci\u00F3 %dir',
    'point towards %dst': // objects.js:228
        'apunta cap a %dst',
    'go to x: %n y: %n': // objects.js:234
        'v\u00E9s a x: %n y: %n',
    'go to %dst': // objects.js:241
        'v\u00E9s a %dst',
    'glide %n secs to x: %n y: %n': // objects.js:247
        'llisca en %n segons fins a x: %n y: %n',
    'change x by %n': // objects.js:254
        'suma %n a x',
    'set x to %n': // objects.js:261
        'assigna el valor %n a x',
    'change y by %n': // objects.js:268
        'suma %n a y',
    'set y to %n': // objects.js:275
        'assigna el valor %n a y',
    'if on edge, bounce': // objects.js:282
        'rebota en tocar una vora',
    'switch to costume %cst': // objects.js:307
        'canvia el vestit a %cst',
    'next costume': // objects.js:312
        'seg\u00FCent vestit',
    'say %s for %n secs': // objects.js:323
        'digues %s durant %n segons',
    'Hello!': // objects.js:324 objects.js:331
        'Hola!',
    'say %s': // objects.js:330
        'digues %s',
    'think %s for %n secs': // objects.js:337
        'pensa %s durant %n segons',
    'Hmm': // objects.js:338 objects.js:345
        'Hmm',
    'think %s': // objects.js:344
        'pensa %s',
    'change %eff effect by %n': // objects.js:350
        'augmenta l\'efecte %eff en %n',
    'set %eff effect to %n': // objects.js:356
        'fixa l\'efecte %eff a %n',
    'clear graphic effects': // objects.js:362
        'treu els efectes gr\u00E0fics',
    'change size by %n': // objects.js:368
        'augmenta %n la mida',
    'set size to %n %': // objects.js:375
        'fixa la mida a %n %',
    'go to front': // objects.js:400
        'v\u00E9s al front',
    'go back %n layers': // objects.js:406
        'v\u00E9s %n capes darrera',
    'save %imgsource as costume named %s': // objects.js:412
        'desa %imgsource com a vestit amb nom %s',
    'wardrobe': // objects.js:421
        'vestits',
    'alert %mult%s': // objects.js:428
        'alerta: %mult%s',
    'console log %mult%s': // objects.js:434
        'log per consola: %mult%s',
    'play sound %snd': // objects.js:441
        'toca el so %snd',
    'play sound %snd until done': // objects.js:446
        'toca el so %snd fins que acabi',
    'stop all sounds': // objects.js:451
        'atura tots els sons',
    'rest for %n beats': // objects.js:456
        'fes silenci durant %n temps',
    'play note %note for %n beats': // objects.js:462
        'toca la nota %note durant %n temps',
    'set instrument to %inst': // objects.js:468
        'fixa l\'instrument a %inst',
    'change tempo by %n': // objects.js:474
        'augmenta el tempo en %n',
    'set tempo to %n bpm': // objects.js:480
        'fixa el tempo a %n',
    'tempo': // objects.js:486
        'tempo',
    'jukebox': // objects.js:494
        'sons',
    'clear': // objects.js:501 paint.js:230
        'neteja',
    'pen down': // objects.js:507
        'baixa el llapis',
    'pen up': // objects.js:513
        'puja el llapis',
    'set pen color to %clr': // objects.js:519
        'fixa el color del llapis a %clr',
    'change pen color by %n': // objects.js:525
        'augmenta en %n el color del llapis',
    'set pen color to %n': // objects.js:532
        'fixa el color del llapis a %n',
    'change pen shade by %n': // objects.js:539
        'augmenta en %n la intensitat del llapis',
    'set pen shade to %n': // objects.js:546
        'fixa la intensitat del llapis a %n',
    'change pen size by %n': // objects.js:553
        'augmenta en %n la mida del llapis',
    'set pen size to %n': // objects.js:560
        'fixa la mida del llapis en %n',
    'stamp': // objects.js:567
        'estampa',
    'fill': // objects.js:573
        'omple',
    'when %greenflag clicked': // objects.js:585
        'Quan la %greenflag es premi',
    'when %keyHat key pressed': // objects.js:590
        'Quan la tecla %keyHat es premi',
    'when I am %interaction': // objects.js:595
        'Quan %interaction aquest personatge',
    'when I receive %msgHat': // objects.js:601
        'Quan rebi %msgHat',
    'when %b': // objects.js:606
        'quan %b',
    'broadcast %msg': // objects.js:611
        'Envia a tots %msg',
    'broadcast %msg and wait': // objects.js:616
        'Envia a tots %msg i espera',
    'message': // objects.js:621
        'missatge',
    'wait %n secs': // objects.js:626
        'espera %n segons',
    'wait until %b': // objects.js:632
        'espera fins %b',
    'forever %c': // objects.js:637
        'per sempre %c',
    'repeat %n %c': // objects.js:642
        'repeteix %n vegades %c',
    'repeat until %b %c': // objects.js:648
        'repeteix fins %b %c',
    'if %b %c': // objects.js:653
        'si %b llavors %c',
    'if %b %c else %c': // objects.js:658
        'si %b llavors %c si no %c',
    'stop %stopChoices': // objects.js:678
        'atura %stopChoices',
    'run %cmdRing %inputs': // objects.js:693
        'executa %cmdRing %inputs',
    'launch %cmdRing %inputs': // objects.js:698
        'llan\u00E7a %cmdRing %inputs',
    'call %repRing %inputs': // objects.js:703
        'crida %repRing %inputs',
    'report %s': // objects.js:708
        'retorna %s',
    'run %cmdRing w/continuation': // objects.js:720
        'executa %cmdRing amb continuaci\u00F3',
    'call %cmdRing w/continuation': // objects.js:725
        'crida %cmdRing amb continuaci\u00F3',
    'warp %c': // objects.js:730
        'executa de cop %c',
    'tell %spr to %cmdRing %inputs': // objects.js:739
        'digues a %spr que faci %cmdRing %inputs',
    'ask %spr for %repRing %inputs': // objects.js:744
        'pregunta a %spr per %repRing %inputs',
    'when I start as a clone': // objects.js:752
        'quan una c\u00F2pia meva comenci',
    'create a clone of %cln': // objects.js:757
        'crea un clon de %cln',
    'a new clone of %cln': // objects.js:762
        'un nou clon de %cln',
    'delete this clone': // objects.js:768
        'esborra aquest clon',
    'pause all %pause': // objects.js:776
        'pausa-ho tot %pause',
    'touching %col ?': // objects.js:785
        'tocant %col ?',
    'touching %clr ?': // objects.js:791
        'tocant el color %clr ?',
    'color %clr is touching %clr ?': // objects.js:797
        'color %clr sobre %clr ?',
    'filtered for %clr': // objects.js:803
        'filtrat per a %clr',
    'stack size': // objects.js:809
        'mida de la pila',
    'frames': // objects.js:815
        'frames',
    'processes': // objects.js:821
        'processos',
    'ask %s and wait': // objects.js:826
        'pregunta %s i espera',
    'what\'s your name?': // objects.js:827
        'Com et dius?',
    'answer': // objects.js:833 objects.js:838
        'resposta',
    'mouse x': // objects.js:843
        'ratol\u00ED x',
    'mouse y': // objects.js:848
        'ratol\u00ED y',
    'mouse down?': // objects.js:853
        'ratol\u00ED clicat?',
    'key %key pressed?': // objects.js:858
        'tecla %key premuda?',
    '%rel to %dst': // objects.js:871
        undefined,
    'reset timer': // objects.js:877
        'reinicia el cron\u00F2metre',
    'timer': // objects.js:883 objects.js:888
        'cron\u00F2metre',
    '%att of %spr': // objects.js:893
        '%att de %spr',
    'url %s': // objects.js:899
        undefined,
    'turbo mode?': // objects.js:905
        'mode turbo?',
    'set turbo mode to %b': // objects.js:910
        'posa el mode turbo a %b',
    'current %dates': // objects.js:915
        '%dates actual',
    'my %get': // objects.js:920
        'atribut %get',
    'round %n': // objects.js:968
        'arrodoneix %n',
    '%fun of %n': // objects.js:973
        '%fun de %n',
    '%n mod %n': // objects.js:979
        'residu de dividir %n entre %n',
    'pick random %n to %n': // objects.js:984
        'nombre a l\'atzar entre %n i %n',
    '%b and %b': // objects.js:1005
        '%b i %b',
    '%b or %b': // objects.js:1010
        '%b o %b',
    'not %b': // objects.js:1015
        'no %b',
    'join %words': // objects.js:1033
        'unir %words',
    'hello': // objects.js:1034 objects.js:1075
        'hola',
    'world': // objects.js:1034 objects.js:1040 objects.js:1046 objects.js:1075
        'm\u00F3n',
    'letter %n of %s': // objects.js:1039
        'lletra %n de %s',
    'length of %s': // objects.js:1045
        'longitud de %s',
    'unicode of %s': // objects.js:1051
        'valor Unicode de %s',
    'unicode %n as letter': // objects.js:1057
        'lletra amb valor Unicode %n',
    'is %s a %typ ?': // objects.js:1063
        '\u00E9s %s un %typ ?',
    'is %s identical to %s ?': // objects.js:1069
        '\u00E9s %s id\u00E8ntic a %s ?',
    'split %s by %delim': // objects.js:1074
        'divideix %s per %delim',
    'JavaScript function ( %mult%s ) { %code }': // objects.js:1080
        'JavaScript function ( %mult%s ) { %code }',
    'type of %s': // objects.js:1086
        'tipus de %s',
    '%txtfun of %s': // objects.js:1093
        '%txtfun de %s',
    'compile %repRing': // objects.js:1099
        undefined,
    'set %var to %s': // objects.js:1119
        'assigna a %var el valor %s',
    'change %var by %n': // objects.js:1125
        'augmenta %var en %n',
    'show variable %var': // objects.js:1131
        'mostra la variable %var',
    'hide variable %var': // objects.js:1136
        'amaga la variable %var',
    'script variables %scriptVars': // objects.js:1141
        'variables de programa %scriptVars',
    'inherit %shd': // objects.js:1148
        'hereta %shd',
    'list %exp': // objects.js:1155
        'llista %exp',
    '%s in front of %l': // objects.js:1160
        'afegeix %s davant de %l',
    'item %idx of %l': // objects.js:1165
        'element %idx de %l',
    'all but first of %l': // objects.js:1171
        '%l sense el primer element',
    'length of %l': // objects.js:1176
        'longitud de %l',
    '%l contains %s': // objects.js:1181
        '%l cont\u00E9 %s',
    'thing': // objects.js:1182 objects.js:1188 objects.js:1200 objects.js:1206
        'cosa',
    'add %s to %l': // objects.js:1187
        'afegeix %s a %l',
    'delete %ida of %l': // objects.js:1193
        'esborra %ida de %l',
    'insert %s at %idx of %l': // objects.js:1199
        'insereix %s a la posici\u00F3 %idx de %l',
    'replace item %idx of %l with %s': // objects.js:1205
        'substitueix l\'element %idx de %l per %s',
    'map %repRing over %l': // objects.js:1214
        'mapeja %repRing sobre %l',
    'for %upvar in %l %cl': // objects.js:1220
        'per cada %upvar dins %l %cl',
    'each item': // objects.js:1221
        undefined,
    'show table %l': // objects.js:1230
        'mostra la taula %l',
    'map %cmdRing to %codeKind %code': // objects.js:1237
        'mapeja %cmdRing com a %codeKind %code',
    'map %mapValue to code %code': // objects.js:1242
        undefined,
    'map %codeListPart of %codeListKind to code %code': // objects.js:1256
        'mapeja %codeListPart de %codeListKind no com a codi %code',
    'code of %cmdRing': // objects.js:1261
        'codi de %cmdRing',
    'Sprite': // objects.js:1404
        'Objecte',
    'that name is already in use': // objects.js:1859 objects.js:7047
        undefined,
    'development mode\ndebugging primitives': // objects.js:1932 objects.js:2089 objects.js:2155 objects.js:2268 objects.js:7085 objects.js:7214 objects.js:7280 objects.js:7376
        'mode de desenvolupament\nprimitives de depuraci\u00F3',
    'Make a variable': // objects.js:2184 objects.js:7309
        'Crea una variable',
    'Delete a variable': // objects.js:2205 objects.js:7327
        'Esborra una variable',
    'find blocks': // objects.js:2398 objects.js:2469
        'cerca blocs',
    'hide primitives': // objects.js:2476
        'amaga els blocs primitius',
    'show primitives': // objects.js:2494
        'mostra els blocs primitius',
    'rotate': // objects.js:3244
        undefined,
    'pivot': // objects.js:3247
        'pivota',
    'edit the costume\'s\nrotation center': // objects.js:3249
        'canvia el centre de\nrotaci\u00F3 del vestit',
    'make permanent and\nshow in the sprite corral': // objects.js:3257
        undefined,
    'exceeding maximum number of clones': // objects.js:3355
        undefined,
    'Costume': // objects.js:4338
        undefined,
    'setting the rotation center requires a costume': // objects.js:4679
        undefined,
    'current parent': // objects.js:5420
        'pare actual',
    'Stage': // objects.js:6315
        'Escenari',
    'stop': // objects.js:6770 costumes/COSTUMES:486
        undefined,
    'terminate all running threads': // objects.js:6774
        undefined,
    'Stage selected:\nno motion primitives': // objects.js:7060
        'Esteu a l\'Escenari:\nno hi ha primitives de moviment\ndisponibles',
    'turn all pen trails and stamps\ninto a new costume for the\ncurrently selected sprite': // objects.js:7445
        'crea un nou vestit per l\'actual objecte\namb la imatge dibuixada',
    'turn all pen trails and stamps\ninto a new background for the stage': // objects.js:7447
        'crea un nou fons d\'escenari\namb la imatge dibuixada',
    'Background': // objects.js:7817
        undefined,
    'a {{ className }}({{ name }})': // objects.js:8096
        undefined,
    'click or drag crosshairs to move the rotation center': // objects.js:8296
        'clica o arrossega la creueta per moure el centre de rotaci\u00F3',
    'Costume Editor': // objects.js:8308
        'Editor de vestits',
    'an {{ className }}({{ name }})': // objects.js:8395
        undefined,
    'Web Audio API is not supported\nin this browser': // objects.js:8629
        undefined,
    'normal': // objects.js:9452
        'normal',
    'large': // objects.js:9456
        'gran',
    'slider min': // objects.js:9466
        'valor m\u00EDnim del lliscador',
    'slider max': // objects.js:9470
        'valor m\u00E0xim del lliscador',
    'import': // objects.js:9475
        'importa',
    'Unable to import': // objects.js:9501
        undefined,
    '{{ appName }} can only import "text" files.\nYou selected a file of type "{{ type }}".': // objects.js:9502
        undefined,
    'Slider minimum value': // objects.js:9588
        'Valor m\u00EDnim del lliscador',
    'Slider maximum value': // objects.js:9604
        'Valor m\u00E0xim del lliscador',
    'Paint Editor': // paint.js:111
        'Editor d\'imatges',
    'Paintbrush tool\n(free draw)': // paint.js:172
        'Pinzell\n(dibuix lliure)',
    'Stroked Rectangle\n(shift: square)': // paint.js:174
        'Rectangle tra\u00E7at\n(maj\u00FAscula: quadrat)',
    'Stroked Ellipse\n(shift: circle)': // paint.js:176
        'El\u00B7lipse tra\u00E7ada\n(maj\u00FAscula: circumfer\u00E8ncia)',
    'Eraser tool': // paint.js:178
        'Goma d\'esborrar',
    'Set the rotation center': // paint.js:180
        'Estableix el centre de rotaci\u00F3',
    'Line tool\n(shift: vertical/horizontal)': // paint.js:183
        'L\u00EDnies\n(maj\u00FAscula: vertical/horitzontal)',
    'Filled Rectangle\n(shift: square)': // paint.js:185
        'Rectangle ple\n(maj\u00FAscula: quadrat)',
    'Filled Ellipse\n(shift: circle)': // paint.js:187
        'El\u00B7lipse plena\n(maj\u00FAscula: cercle)',
    'Fill a region': // paint.js:189
        'Ompla l\'\u00E0rea',
    'Pipette tool\n(pick a color anywhere)': // paint.js:191
        'Capturador de color\n(captura el color de qualsevol lloc)',
    'undo': // paint.js:225
        'desf\u00E9s',
    'grow': // paint.js:239
        'augmentar',
    'shrink': // paint.js:243
        'disminuir',
    'flip \u2194': // paint.js:247
        'invertir \u2194',
    'flip \u2195': // paint.js:251
        'invertir \u2195',
    'Constrain proportions of shapes?\n(you can also hold shift)': // paint.js:407
        'Mant\u00E9 la proporci\u00F3 de les formes?\n(tamb\u00E9 es pot fer prement la tecla "maj\u00FAscules")',
    'Brush size': // paint.js:413
        'Gruix del pinzell',
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
        'quadrat',
    'pointRight': // symbols.js:86
        'punter',
    'stepForward': // symbols.js:87
        undefined,
    'gears': // symbols.js:88
        'engranatge',
    'file': // symbols.js:89
        'arxiu',
    'fullScreen': // symbols.js:90
        'pantalla sencera',
    'normalScreen': // symbols.js:91
        'pantalla normal',
    'smallStage': // symbols.js:92
        'escenari petit',
    'normalStage': // symbols.js:93
        'escenari normal',
    'turtle': // symbols.js:94
        'tortuga',
    'turtleOutline': // symbols.js:96
        'contorn de la tortuga',
    'pause': // symbols.js:97
        'pausa',
    'flag': // symbols.js:98
        'bandera',
    'octagon': // symbols.js:99
        'oct\u00E0gon',
    'cloud': // symbols.js:100 costumes/COSTUMES:170
        'n\u00FAvol',
    'cloudOutline': // symbols.js:101
        'contor de n\u00FAvol',
    'cloudGradient': // symbols.js:102
        'n\u00FAvol amb gradient',
    'turnRight': // symbols.js:103
        'girant a la dreta',
    'turnLeft': // symbols.js:104
        'girant a l\'esquerra',
    'storage': // symbols.js:105
        'emmagatzament',
    'poster': // symbols.js:106
        'p\u00F3ster',
    'flash': // symbols.js:107
        'llamp',
    'brush': // symbols.js:108
        'pinzell',
    'rectangleSolid': // symbols.js:110
        'rect\u00E0ngle s\u00F2lid',
    'circle': // symbols.js:111
        'circumfer\u00E8ncia',
    'circleSolid': // symbols.js:112
        'cercle',
    'cross': // symbols.js:114
        undefined,
    'crosshairs': // symbols.js:115
        'punt de mira',
    'paintbucket': // symbols.js:116
        'pot de pintura',
    'eraser': // symbols.js:117
        'goma d\'esborrar',
    'pipette': // symbols.js:118
        'pipeta',
    'speechBubble': // symbols.js:119
        'bafarada',
    'speechBubbleOutline': // symbols.js:120
        'contorn de bafarada',
    'turnBack': // symbols.js:121
        undefined,
    'turnForward': // symbols.js:122
        undefined,
    'arrowUp': // symbols.js:123
        'fletxa amunt',
    'arrowUpOutline': // symbols.js:124
        'contorn de fletxa amunt',
    'arrowLeft': // symbols.js:125
        'fletxa a l\'esquerra',
    'arrowLeftOutline': // symbols.js:126
        'contorn de fletxa a l\'esquerra',
    'arrowDown': // symbols.js:127
        'fletxa avall',
    'arrowDownOutline': // symbols.js:128
        'contorn de fletxa avall',
    'arrowRight': // symbols.js:129
        'fletxa a la dreta',
    'arrowRightOutline': // symbols.js:130
        'contorn de fletxa a la dreta',
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
        'reinicialitza les columnes',
    'open in another dialog': // tables.js:1027
        'obriu en un altre formulari',
    'list view': // tables.js:1034
        'vista en format de llista',
    'Table view': // tables.js:1186
        'Vista de tabla',
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
        'esperant {{ expected }} com a entrada(s), per\u00F2 s\'ha rebut {{ actual }}',
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
        'una variable de nom \'{{ name }}\'\nno existeix en aquest context',
    'Yes': // widgets.js:1607
        'S\u00ED',
    'No': // widgets.js:1608
        'No',
    'Default': // widgets.js:1882
        'Per defecte',
    '{{ year }} or before': // widgets.js:2024
        '{{ year }} o abans de',
    'User name': // widgets.js:2054 widgets.js:2059 widgets.js:2092
        'Nom d\'usuari',
    'Birth date': // widgets.js:2061
        'Data de naixement',
    'Password': // widgets.js:2071 widgets.js:2078
        'Contrasenya',
    'Repeat Password': // widgets.js:2073
        undefined,
    'Old password': // widgets.js:2083
        'Contrasenya actual',
    'New password': // widgets.js:2085
        'Nova contrasenya',
    'Repeat new password': // widgets.js:2087
        'Torna a escriure la nova contrasenya',
    'please fill out\nthis field': // widgets.js:2196
        's\'ha d\'omplir aquest camp.',
    'User name must be four\ncharacters or longer': // widgets.js:2201
        'El nom d\'usuari ha de tenir\nalmenys 4 car\u00E0cters.',
    'please provide a valid\nemail address': // widgets.js:2206
        's\'ha de introduir un correu v\u00E0lid.',
    'password must be six\ncharacters or longer': // widgets.js:2212
        'la contrasenya ha de tenir\nalmenys sis car\u00E0cters.',
    'passwords do\nnot match': // widgets.js:2216
        'les contrasenyes\nno coincideixen.',
    'please agree to\nthe TOS': // widgets.js:2222
        's\'han d\'acceptarles condicions d\'\u00FAs.',
    'E-mail address of parent or guardian': // widgets.js:2258
        'Adre\u00E7a de correu electr\u00F2nic del tutor o educador',
    'E-mail address': // widgets.js:2259
        'Adre\u00E7a de correu electr\u00F2nic',
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
        'Iteracions i composici\u00F3',
    'Traditional loop constructs (while, until, etc.) plus the Lisp "named let" (a generalization of FOR) plus functional iteration (repeated invocation of a function) and function composition.': // libraries/LIBRARIES:2
        undefined,
    'List utilities': // libraries/LIBRARIES:3
        'Utilitats per a llistes',
    'Some standard functions on lists (append, reverse, etc.)': // libraries/LIBRARIES:3
        undefined,
    'Streams (lazy lists)': // libraries/LIBRARIES:4
        'Streams (llistes presconstruides)',
    'A variation on the list data type in which each list item aren\'t computed until it\'s needed, so you can construct million-item lists without really taking up all that time or memory, or even infinite-sized lists. (A block that reports all the prime numbers is included as an example.)': // libraries/LIBRARIES:4
        undefined,
    'Variadic reporters': // libraries/LIBRARIES:5
        'C\u00E0lculs multientrada',
    'Versions of +, x, AND, and OR that take more than two inputs.': // libraries/LIBRARIES:5
        undefined,
    'Web services access (https)': // libraries/LIBRARIES:6
        'Acc\u00E9s a serveis Web (https)',
    'An extended version of the HTTP:// block that allows POST, PUT, and DELETE as well as GET requests, allows using the secure HTTPS protocol, and gives control over headers, etc.': // libraries/LIBRARIES:6
        undefined,
    'Words, sentences': // libraries/LIBRARIES:7
        'Paraules i frases',
    'One of the big ideas in Logo that they left out of Scratch is thinking of text as structured into words and sentences, rather than just a string of characters. This library (along with the JOIN WORDS block in the Tools library) brings back that idea.': // libraries/LIBRARIES:7
        undefined,
    'Multi-branched conditional (switch)': // libraries/LIBRARIES:8
        'Condicionals compostos (switch)',
    'Like "switch" in C-like languages or "cond" in Lisp. Thanks to Nathan Dinsmore for inventing the idea of a separate block for each branch!': // libraries/LIBRARIES:8
        undefined,
    'LEAP Motion controller': // libraries/LIBRARIES:9
        'Controladors per a LEAP Motion',
    'Report hand positions from LEAP Motion controller (leapmotion.com).': // libraries/LIBRARIES:9
        undefined,
    'Set RGB or HSV pen color': // libraries/LIBRARIES:10
        'Acoloriment del llapis per RGB o HSV',
    'Set or report pen color as RGB (red, green, blue) or HSV (hue, saturation, value).': // libraries/LIBRARIES:10
        undefined,
    'Catch errors in a script': // libraries/LIBRARIES:11
        'Alternatives per les errades dels programes',
    'Run a script; if an error happens, instead of stopping the script with a red halo, run another script to handle the error. Also includes a block to cause an error with a message given as input. Also includes a block to create a script variable and give it a value.': // libraries/LIBRARIES:11
        undefined,
    'Allow multi-line text input to a block': // libraries/LIBRARIES:12
        'Entrades multil\u00EDnia',
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
SnapTranslator.dict.ca.deprecated = {
    'add a new sprite':
        'afegeix un nou objecte',
    'stop %stopOthersChoices':
        'atura %stopOthersChoices',
    'distance to %dst':
        'dist\u00E0ncia a %dst',
    'http:// %s':
        'http:// %s',
    'Snap! website':
        'Web de Snap!',
    'Save to disk':
        'Desa al disc',
    'store this project\nin the downloads folder\n(in supporting browsers)':
        'desa aquest projecte\na la carpeta de desc\u00E0rregues\n(en navegadors que ho suportin)',
    'unused block(s) removed':
        'bloc(s) personalitzats no utilitzats esborrats',
    'Kind of':
        'Esp\u00E8cie de',
    'Part of':
        'Part de',
    'detach from':
        'desenganxa de',
    'Ok':
        'D\'acord',
    'Open un Project':
        'Obre projecte',
    'Saved!':
        'Desat!',
    'Are you sure you want to delete':
        'Segur que vols esborrar',
    'Save Project As':
        'Anomena i desa el projecte',
    'Single input.':
        'Entrada \u00FAnica.',
    'new':
        'nou',
    'not':
        'no',
    'scripts':
        'programes',
    'check to inherit\nfrom':
        'marqueu per heretar\nde',
    'delete %shd':
        'esborra %shd',
    'EXPERIMENTAL! check to enable\nlive custom control structures':
        'EXPERIMENTAL! marqueu per habilitar\nel control din\u00E0mic d\'estructures personalitzades.',
    'EXPERIMENTAL! uncheck to disable live\ncustom control structures':
        'EXPERIMENTAL! desmarqueu per deshabilitar\nel control din\u00E0mic d\'estructures personalitzades.',
    'Snap!Cloud':
        'N\u00FAvol d\'Snap!',
    'could not connect to':
        'no es pot connectar a',
    'Service':
        'Servei',
    'login':
        'autenticaci\u00F3',
    'ERROR: INVALID PASSWORD':
        'ERROR: CONTRASENYA NO V\u00C0LIDA',
    'Logout':
        'Surt',
    'Account created.':
        'Compte creat.',
    'An e-mail with your password\nhas been sent to the address provided':
        'S\'ha enviat un correu electr\u00F2nic\namb la contrasenya d\'acc\u00E9s.',
    'now connected.':
        'heu entrat.',
    'disconnected.':
        'desconnectats.',
    'or before':
        'o abans de',
    'saved.':
        'desat.',
    'Enter one option per line.Optionally use "=" as key/value delimiter\ne.g.\n   the answer=42':
        'Escriviu cada opci\u00F3 en una l\u00EDnia.\nTamb\u00E9 podeu fer servir "=" com a separador entre\nclau i valor, per exemple resposta=42',
    'turn pen trails into new costume':
        'crea un nou vestit amb la imatge dibuixada',
    'last changed':
        'el darrer modificat',
    'Are you sure you want to publish':
        'Segur que vols compartir-ho?',
    'Are you sure you want to unpublish':
        'Segur que vols deixar-ho de compartir?',
    'shared.':
        'compartit.',
    'unshared.':
        'no compartit.',
    'password has been changed.':
        's\'ha canviat la contrasenya.',
    'SVG costumes are\nnot yet fully supported\nin every browser':
        'els vestits SVG encara\no s\u00F3n suportatsper tots els navegadors',
    'Select categories of additional blocks to add to this project.':
        'Trieu conjunts de blocs addicionals per afegir a aquest projecte.',
    'Import sound':
        'Importa sons',
    'a variable of name \'':
        'una variable de nom \'',
    '\'\ndoes not exist in this context':
        '\'\nno existeix en aquest context',
    '(temporary)':
        '(temporal)',
    'expecting':
        'esperant',
    'input(s), but getting':
        'com a entrada(s), per\u00F2 s\'ha rebut',
    'export project media only':
        'exporta nom\u00E9s els sons i imatges del projecte',
    'export project without media':
        'exporta el projecte sense sons ni imatges',
    'export project as cloud data':
        'exporta el projecte com a dades en el n\u00FAvol',
    'open shared project from cloud':
        'obre un projecte compartit en el n\u00FAvol',
    'url':
        'URL',
    'experimental -\nunder construction':
        'Experimental -\nen construcci\u00F3',
    '(in a new window)':
        '(dins una nova finestra)',
    'map String to code %code':
        'mapeja un text com a codi %code',
    'dragging threshold':
        'llindar per l\'arrossegament',
    'redo the last undone block drop in this pane':
        'ref\u00E9s l\'\u00FAltim moviment\nde blocs desfet',
    'turn pen trails into new background':
        'crea un nou fons amb la imatge dibuixada',
    '\ncolor':
        '\ncolor',
    '\nalpha\nvalue':
        '\nvalor del\ncanal alfa',
    'show the\nWorld\'s menu':
        'mostra el men\u00FA del M\u00F3n',
    'blurry shades,\nuse for new browsers':
        'utilitza ombres degradades\nper a navegadors moderns',
    'about morphic.js':
        'sobre morphic.js',
    'uncheck to disable support for\nnative JavaScript functions':
        'desmarqueu per deshabilitar\nl\'execuci\u00F3 de Javascript',
    'check to support\nnative JavaScript functions':
        'marqueu per habilitar\nl\'execuci\u00F3 de Javascript',
    'JavaScript is not enabled':
        'l\'execuci\u00F3 de Javascript est\u00E0 deshabilitada',
    'Loading':
        'S\'est\u00E0 carregant',
    'Imported':
        'S\'ha importat',
    'Save and restore pictures drawn by pen':
        'Gesti\u00F3 de les captures d\'imatges dibuixades',
};
