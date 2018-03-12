/*

    lang-ko.js

    Korean translation for Snap!

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
SnapTranslator.dict.ko = {
    metadata: {
        'name': // the name as it should appear in the language menu
            '\uD55C\uAD6D\uC5B4',
        'english_name': // the english name of the language
            'Korean',
        'translators': [ // translators authors for the Translators tab
            'Yunjae Jang <janggoons@gmail.com>'
        ],
        'last_changed': // this, too, will appear in the Translators tab
            '2015-01-21',
    },
    strings: {},
};
// ✂ - - - - - - - - - - - - - - - - -  -   -

SnapTranslator.dict.ko.strings = {
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
        '\uD39C\uC758 \uADA4\uC801',
    'stage image': // blocks.js:821
        undefined,
    'with inputs': // blocks.js:831
        '\uB9E4\uAC1C\uBCC0\uC218',
    'block variables': // blocks.js:840 byob.js:1053
        undefined,
    'Input Names': // blocks.js:844
        '\uB9E4\uAC1C\uBCC0\uC218\uC774\uB984',
    'input names': // blocks.js:850
        '\uB9E4\uAC1C\uBCC0\uC218\uC774\uB984',
    'Input name': // blocks.js:902 blocks.js:5344
        '\uC785\uB825 \uC774\uB984',
    '(90) right': // blocks.js:935 morphic.js:4888
        '(90) \uC624\uB978\uCABD',
    '(-90) left': // blocks.js:936 morphic.js:4889
        '(-90) \uC67C\uCABD',
    '(0) up': // blocks.js:937 morphic.js:4890
        '(0) \uC704',
    '(180) down': // blocks.js:938 morphic.js:4891
        '(180) \uC544\uB798',
    'random': // blocks.js:939
        undefined,
    '(1) sine': // blocks.js:956
        undefined,
    '(2) square': // blocks.js:957
        undefined,
    '(3) sawtooth': // blocks.js:958
        undefined,
    '(4) triangle': // blocks.js:959
        undefined,
    'January': // blocks.js:968 widgets.js:1941
        undefined,
    'February': // blocks.js:969 widgets.js:1942
        undefined,
    'March': // blocks.js:970 widgets.js:1943
        undefined,
    'April': // blocks.js:971 widgets.js:1944
        undefined,
    'May': // blocks.js:972 widgets.js:1945
        undefined,
    'June': // blocks.js:973 widgets.js:1946
        undefined,
    'July': // blocks.js:974 widgets.js:1947
        undefined,
    'August': // blocks.js:975 widgets.js:1948
        undefined,
    'September': // blocks.js:976 widgets.js:1949
        undefined,
    'October': // blocks.js:977 widgets.js:1950
        undefined,
    'November': // blocks.js:978 widgets.js:1951
        undefined,
    'December': // blocks.js:979 widgets.js:1952
        undefined,
    'clicked': // blocks.js:988
        undefined,
    'pressed': // blocks.js:989
        undefined,
    'dropped': // blocks.js:990
        undefined,
    'mouse-entered': // blocks.js:991
        undefined,
    'mouse-departed': // blocks.js:992
        undefined,
    'scrolled-up': // blocks.js:993
        undefined,
    'scrolled-down': // blocks.js:994
        undefined,
    'year': // blocks.js:1004 widgets.js:2063
        '\uC5F0\uB3C4',
    'month': // blocks.js:1005
        '\uC6D4',
    'date': // blocks.js:1006
        '\uC77C',
    'day of week': // blocks.js:1007
        '\uC694\uC77C(1~7)',
    'hour': // blocks.js:1008
        '\uC2DC\uAC04',
    'minute': // blocks.js:1009
        '\uBD84',
    'second': // blocks.js:1010
        '\uCD08',
    'time in milliseconds': // blocks.js:1011
        '\uBC00\uB9AC\uC138\uCEE8\uB4DC\uCD08',
    'letter': // blocks.js:1021
        '\uAE00\uC790',
    'whitespace': // blocks.js:1022
        '\uBE48\uCE78',
    'line': // blocks.js:1023 symbols.js:113
        '\uC904',
    'tab': // blocks.js:1024
        '\uD0ED',
    'cr': // blocks.js:1025
        '\uC0C8\uC904(cr)',
    'csv': // blocks.js:1026
        undefined,
    'last': // blocks.js:1036 blocks.js:1048
        '\uB9C8\uC9C0\uB9C9',
    'all': // blocks.js:1038 blocks.js:1265 byob.js:3874
        '\uBAA8\uB450',
    'any': // blocks.js:1049
        '\uC784\uC758',
    'distance': // blocks.js:1058
        undefined,
    'direction': // blocks.js:1059 blocks.js:2483 blocks.js:8556 objects.js:300
        '\uBC29\uD5A5',
    'color': // blocks.js:1117 morphic.js:4132 morphic.js:4135 morphic.js:12219 morphic.js:12222
        undefined,
    'fisheye': // blocks.js:1118
        undefined,
    'whirl': // blocks.js:1119
        undefined,
    'pixelate': // blocks.js:1120
        undefined,
    'mosaic': // blocks.js:1121
        undefined,
    'duplicate': // blocks.js:1122 blocks.js:2545 blocks.js:11904 gui.js:7368 gui.js:7710 morphic.js:4167 objects.js:3236
        '\uBCF5\uC0AC\uD558\uAE30',
    'negative': // blocks.js:1123
        '\uBC18\uC804',
    'comic': // blocks.js:1124
        '\uCF54\uBBF9',
    'confetti': // blocks.js:1125
        '\uC0C9\uC885\uC774',
    'saturation': // blocks.js:1126
        undefined,
    'brightness': // blocks.js:1127
        '\uBC1D\uAE30',
    'ghost': // blocks.js:1128
        '\uC720\uB839',
    'any key': // blocks.js:1146
        undefined,
    'up arrow': // blocks.js:1147
        '\uC704\uCABD \uD654\uC0B4\uD45C',
    'down arrow': // blocks.js:1148
        '\uC544\uB798\uCABD \uD654\uC0B4\uD45C',
    'right arrow': // blocks.js:1149
        '\uC624\uB978\uCABD \uD654\uC0B4\uD45C',
    'left arrow': // blocks.js:1150
        '\uC67C\uCABD \uD654\uC0B4\uD45C',
    'space': // blocks.js:1151
        '\uC2A4\uD398\uC774\uC2A4',
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
        '\uC808\uB300\uAC12(abs)',
    'ceiling': // blocks.js:1227 morphic.js:7085 morphic.js:7088
        undefined,
    'floor': // blocks.js:1228 morphic.js:7069 morphic.js:7072
        '\uBC14\uB2E5(floor)',
    'sqrt': // blocks.js:1229
        '\uC81C\uACF1\uADFC(sqrt)',
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
        '\uC774 \uC2A4\uD06C\uB9BD\uD2B8',
    'this block': // blocks.js:1267
        '\uC774 \uBE14\uB85D',
    'all but this script': // blocks.js:1268
        '\uC774 \uC2A4\uD06C\uB9BD\uD2B8\uB97C \uC81C\uC678\uD55C \uBAA8\uB450',
    'other scripts in sprite': // blocks.js:1269
        '\uC774 \uC2A4\uD504\uB77C\uC774\uD2B8\uC5D0 \uC788\uB294 \uB2E4\uB978 \uC2A4\uD06C\uB9BD\uD2B8',
    'String': // blocks.js:1290
        undefined,
    'Number': // blocks.js:1291 byob.js:3286
        '\uC22B\uC790',
    'true': // blocks.js:1292 blocks.js:9529 blocks.js:9919 objects.js:2979
        '\uCC38',
    'false': // blocks.js:1293 blocks.js:9544 blocks.js:9930 objects.js:2979
        '\uAC70\uC9D3',
    'code': // blocks.js:1334
        undefined,
    'header': // blocks.js:1335
        undefined,
    'list': // blocks.js:1408 blocks.js:8487
        '\uB9AC\uC2A4\uD2B8',
    'item': // blocks.js:1409
        undefined,
    'delimiter': // blocks.js:1410
        undefined,
    'collection': // blocks.js:1419
        undefined,
    'variables': // blocks.js:1420
        undefined,
    'parameters': // blocks.js:1421
        undefined,
    'untitled': // blocks.js:1993 blocks.js:2604 blocks.js:6443 blocks.js:11919 byob.js:1037 byob.js:3910 gui.js:979 gui.js:4036 store.js:296
        '\uC774\uB984\uC5C6\uC74C',
    '{{ projectName }} script pic': // blocks.js:1993 blocks.js:2602 blocks.js:6441 byob.js:1035
        undefined,
    'script target cannot be found for orphaned block': // blocks.js:2203
        undefined,
    'a {{ className }} ("{{ value }}...")': // blocks.js:2207 morphic.js:8466 morphic.js:9146
        undefined,
    'Variable name': // blocks.js:2377 blocks.js:3262 objects.js:2179 objects.js:7304
        '\uBCC0\uC218 \uC774\uB984',
    'help': // blocks.js:2386 objects.js:1851 objects.js:2308
        '\uBE14\uB85D \uB3C4\uC6C0\uB9D0',
    'script pic with result': // blocks.js:2393
        undefined,
    'open a new window\nwith a picture of both\nthis script and its result': // blocks.js:2397
        undefined,
    'rename': // blocks.js:2409 blocks.js:2458 blocks.js:2521 gui.js:7708 gui.js:8409 morphic.js:7656
        '\uC774\uB984\uC218\uC815',
    'rename only\nthis reporter': // blocks.js:2413 blocks.js:2462 blocks.js:2523
        undefined,
    'rename all': // blocks.js:2416 blocks.js:2465
        undefined,
    'rename all blocks that\naccess this variable': // blocks.js:2418 blocks.js:2467
        undefined,
    'inherited': // blocks.js:2426 blocks.js:2437 blocks.js:2490 blocks.js:6370 byob.js:1099 byob.js:1121
        undefined,
    'uncheck to\ndisinherit': // blocks.js:2431 blocks.js:2495 blocks.js:6375 byob.js:1113
        undefined,
    'check to inherit\nfrom {{ name }}': // blocks.js:2443 blocks.js:2496 blocks.js:6376 byob.js:1125
        undefined,
    'transient': // blocks.js:2450
        undefined,
    'uncheck to save contents\nin the project': // blocks.js:2453
        undefined,
    'check to prevent contents\nfrom being saved': // blocks.js:2454
        undefined,
    'hide': // blocks.js:2472 morphic.js:4214 objects.js:394
        '\uC228\uAE30\uAE30',
    'x position': // blocks.js:2481 blocks.js:8554 objects.js:288
        'x\uC88C\uD45C',
    'y position': // blocks.js:2482 blocks.js:8555 objects.js:294
        'y\uC88C\uD45C',
    'size': // blocks.js:2484 blocks.js:8559 objects.js:382
        '\uD06C\uAE30',
    'costume #': // blocks.js:2485 blocks.js:8557 blocks.js:8561 objects.js:317
        '\uBAA8\uC591 \uBC88\uD638',
    'header mapping': // blocks.js:2507 blocks.js:2677
        undefined,
    'code mapping': // blocks.js:2511 blocks.js:2681
        undefined,
    'relabel': // blocks.js:2527 blocks.js:2538
        '\uBE14\uB85D \uBC14\uAFB8\uAE30',
    'make a copy\nand pick it up': // blocks.js:2564 blocks.js:11908 morphic.js:4171
        '\uBCF5\uC0AC\uD574\uC11C\n\uB4E4\uACE0 \uC788\uC2B5\uB2C8\uB2E4.',
    'only duplicate this block': // blocks.js:2586
        undefined,
    'delete': // blocks.js:2590 blocks.js:11910 gui.js:7372 gui.js:7711 gui.js:8410 morphic.js:4215 objects.js:3242
        '\uC0AD\uC81C\uD558\uAE30',
    'script pic': // blocks.js:2594 byob.js:1030
        '\uC774 \uC2A4\uD06C\uB9BD\uD2B8\uB97C \uADF8\uB9BC\uD30C\uC77C\uB85C \uB0B4\uBCF4\uB0B4\uAE30',
    'open a new window\nwith a picture of this script': // blocks.js:2608 byob.js:1041
        '\uC774 \uC2A4\uD06C\uB9BD\uD2B8 \uADF8\uB9BC\uC744\n\uC0C8\uB85C\uC6B4 \uC708\uB3C4\uC6B0\uC5D0\uC11C \uC5FD\uB2C8\uB2E4.',
    'download script': // blocks.js:2612
        undefined,
    '{{ name }} script': // blocks.js:2622
        undefined,
    'download this script\nas an XML file': // blocks.js:2627
        undefined,
    'unringify': // blocks.js:2657
        '\uBE14\uB85D\uD615\uD0DC\uBCC0\uD658 \uCDE8\uC18C\uD558\uAE30',
    'ringify': // blocks.js:2661 blocks.js:2673
        '\uBE14\uB85D\uD615\uD0DC \uBCC0\uD658\uD558\uAE30',
    'delete block': // blocks.js:2691
        undefined,
    'spec': // blocks.js:2692 blocks.js:2699
        undefined,
    'Help': // blocks.js:2980 blocks.js:2997
        '\uB3C4\uC6C0\uB9D0',
    'Enter code that corresponds to the block\'s definition. Use the formal parameter\nnames as shown and <body> to reference the definition body\'s generated text code.': // blocks.js:3026
        undefined,
    'Enter code that corresponds to the block\'s definition. Choose your own\nformal parameter names (ignoring the ones shown).': // blocks.js:3029
        undefined,
    'Header mapping': // blocks.js:3043
        undefined,
    'Code mapping': // blocks.js:3072
        undefined,
    'Enter code that corresponds to the block\'s operation (usually a single\nfunction invocation). Use <#n> to reference actual arguments as shown.': // blocks.js:3077
        undefined,
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
        undefined,
    'undrop': // blocks.js:6320 blocks.js:6709
        '\uB9C8\uC9C0\uB9C9\uC73C\uB85C \uAC00\uC838\uC628 \uBE14\uB85D',
    'undo the last\nblock drop\nin this pane': // blocks.js:6324
        '\uB9C8\uC9C0\uB9C9\uC73C\uB85C\n\uAC00\uC838\uC628 \uBE14\uB85D\uC744\n\uD655\uC778\uD55C\uB2E4.',
    'redrop': // blocks.js:6335 blocks.js:6722
        undefined,
    'redo the last undone\nblock drop\nin this pane': // blocks.js:6339
        undefined,
    'clear undrop queue': // blocks.js:6345
        undefined,
    'forget recorded block drops\non this pane': // blocks.js:6351
        undefined,
    'clean up': // blocks.js:6359
        '\uC2A4\uD06C\uB9BD\uD2B8 \uC815\uB9AC\uD558\uAE30',
    'arrange scripts\nvertically': // blocks.js:6359
        '\uC2A4\uD06C\uB9BD\uD2B8\uB97C\n\uC218\uC9C1\uC73C\uB85C \uC815\uB82C\uD55C\uB2E4.',
    'add comment': // blocks.js:6360
        '\uC8FC\uC11D \uCD94\uAC00\uD558\uAE30',
    'scripts pic': // blocks.js:6362
        '\uBAA8\uB4E0 \uC2A4\uD06C\uB9BD\uD2B8\uB97C \uADF8\uB9BC\uD30C\uC77C\uB85C \uB0B4\uBCF4\uB0B4\uAE30',
    'open a new window\nwith a picture of all scripts': // blocks.js:6364
        '\uC0C8\uB85C\uC6B4 \uCC3D\uC744 \uC5F4\uC5B4\uC11C\n\uBAA8\uB4E0 \uC2A4\uD06C\uB9BD\uD2B8\uB97C\n\uADF8\uB9BC\uC73C\uB85C \uC800\uC7A5\uD55C\uB2E4.',
    'make a block': // blocks.js:6380
        '\uBE14\uB85D \uB9CC\uB4E4\uAE30',
    'Make a block': // blocks.js:6398 objects.js:2303 objects.js:2352 objects.js:2411
        '\uBE14\uB85D \uB9CC\uB4E4\uAE30',
    'nothing to undrop': // blocks.js:6549
        undefined,
    'unsupported action for {{ morph }}': // blocks.js:6640
        undefined,
    'use the keyboard\nto enter blocks': // blocks.js:6747
        undefined,
    'script target cannot be found for orphaned scripts': // blocks.js:6925
        undefined,
    'choose new parent': // blocks.js:7225 morphic.js:4253
        undefined,
    'new message': // blocks.js:8338 blocks.js:8370
        undefined,
    'Message name': // blocks.js:8345 blocks.js:8377
        '\uBA54\uC2DC\uC9C0 \uC774\uB984',
    'any message': // blocks.js:8360
        '\uC5B4\uB5A4 \uBA54\uC2DC\uC9C0',
    'mouse-pointer': // blocks.js:8391 blocks.js:8420
        '\uB9C8\uC6B0\uC2A4\uC758 \uD3EC\uC778\uD130',
    'edge': // blocks.js:8392
        '\uBCBD',
    'random position': // blocks.js:8418
        undefined,
    'myself': // blocks.js:8445
        '\uB098 \uC790\uC2E0',
    'number': // blocks.js:8484
        '\uC22B\uC790',
    'text': // blocks.js:8485 morphic.js:12305
        '\uBB38\uC790',
    'Boolean': // blocks.js:8486
        '\uBD88\uB9AC\uC5B8',
    'sprite': // blocks.js:8490
        undefined,
    'costume': // blocks.js:8492 objects.js:3069
        undefined,
    'sound': // blocks.js:8493
        undefined,
    'command': // blocks.js:8494
        '\uCEE4\uB9E8\uB4DC',
    'reporter': // blocks.js:8495
        '\uB9AC\uD3EC\uD130',
    'predicate': // blocks.js:8496
        '\uD504\uB808\uB514\uD0A4\uD2B8',
    'neighbors': // blocks.js:8502
        undefined,
    'self': // blocks.js:8503
        undefined,
    'other sprites': // blocks.js:8504
        undefined,
    'clones': // blocks.js:8505
        undefined,
    'other clones': // blocks.js:8506
        undefined,
    'parts': // blocks.js:8508
        undefined,
    'anchor': // blocks.js:8509
        undefined,
    'stage': // blocks.js:8511 symbols.js:95
        undefined,
    'children': // blocks.js:8513
        undefined,
    'parent': // blocks.js:8514 gui.js:7178 gui.js:7385
        undefined,
    'temporary?': // blocks.js:8516
        undefined,
    'name': // blocks.js:8519
        undefined,
    'costumes': // blocks.js:8520
        undefined,
    'sounds': // blocks.js:8521
        undefined,
    'dangling?': // blocks.js:8522
        undefined,
    'rotation x': // blocks.js:8523
        undefined,
    'rotation y': // blocks.js:8524
        undefined,
    'center x': // blocks.js:8525
        undefined,
    'center y': // blocks.js:8526
        undefined,
    'costume name': // blocks.js:8558 blocks.js:8562
        undefined,
    'Turtle': // blocks.js:8582 gui.js:7941 objects.js:3166 threads.js:3349
        '\uD654\uC0B4\uD45C',
    'Empty': // blocks.js:8584 gui.js:7941 objects.js:3166 threads.js:3350
        'Leer',
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
        undefined,
    'add comment here': // blocks.js:11762
        '\uC5EC\uAE30\uC5D0 \uC8FC\uC11D \uCD94\uAC00',
    'comment pic': // blocks.js:11912
        '\uC8FC\uC11D\uC744 \uADF8\uB9BC\uD30C\uC77C\uB85C \uB0B4\uBCF4\uB0B4\uAE30',
    '{{ projectName }} comment pic': // blocks.js:11917
        undefined,
    'open a new window\nwith a picture of this comment': // blocks.js:11923
        undefined,
    'Change block': // byob.js:885
        '\uBE14\uB85D \uBCC0\uACBD',
    '{{ varName }} (temporary)': // byob.js:1011 objects.js:9431 threads.js:1670
        undefined,
    'translations': // byob.js:1044
        undefined,
    'experimental': // byob.js:1048 byob.js:1057 byob.js:1065
        '\uC2E4\uD5D8\uC801',
    'under construction': // byob.js:1048 byob.js:1057 byob.js:1065
        undefined,
    'remove block variables': // byob.js:1061
        undefined,
    'duplicate block definition': // byob.js:1079
        undefined,
    'delete block definition': // byob.js:1089 byob.js:1133 byob.js:1147
        '\uBE14\uB85D \uC0AD\uC81C\uD558\uAE30',
    'edit': // byob.js:1157 gui.js:7699 morphic.js:8730 morphic.js:9477 objects.js:3255 objects.js:3261 objects.js:7422
        '\uC2A4\uD06C\uB9BD\uD2B8 \uD3B8\uC9D1\uD558\uAE30',
    'Delete Custom Block': // byob.js:1228
        '\uBE14\uB85D \uC0AD\uC81C\uD558\uAE30',
    'Are you sure you want to delete this\ncustom block and all its instances?': // byob.js:1229
        '\uC774 \uBE14\uB85D\uACFC \uBAA8\uB4E0 \uC778\uC2A4\uD134\uC2A4\uB97C\n\uC0AD\uC81C\uD574\uB3C4 \uAD1C\uCC2E\uC2B5\uB2C8\uAE4C?',
    'OK': // byob.js:1648 byob.js:2117 byob.js:3237 byob.js:3848 gui.js:3713 morphic.js:3958 morphic.js:4028 morphic.js:4054 objects.js:8312 paint.js:161 tables.js:1212 widgets.js:1574 widgets.js:1708 widgets.js:1791 widgets.js:1874 widgets.js:2155 widgets.js:2434
        '\uD655\uC778',
    'Cancel': // byob.js:1649 byob.js:2120 byob.js:3243 byob.js:3849 gui.js:3371 gui.js:3714 gui.js:5941 gui.js:6843 gui.js:8996 gui.js:9134 morphic.js:4031 morphic.js:4057 objects.js:8313 paint.js:162 widgets.js:1709 widgets.js:1792 widgets.js:1887 widgets.js:2156
        '\uCDE8\uC18C',
    'Command': // byob.js:1770
        '\uCEE4\uB9E8\uB4DC',
    'Reporter': // byob.js:1779 byob.js:3290
        '\uB9AC\uD3EC\uD130',
    'Predicate': // byob.js:1788 byob.js:3291
        '\uD504\uB808\uB514\uD0A4\uD2B8',
    'for all sprites': // byob.js:1850 byob.js:3662
        '\uBAA8\uB4E0 \uC2A4\uD504\uB77C\uC774\uD2B8\uC5D0 \uB300\uD574',
    'for this sprite only': // byob.js:1855 byob.js:3667
        '\uC774 \uC2A4\uD504\uB77C\uC774\uD2B8\uC5D0 \uB300\uD574',
    'Block Editor': // byob.js:2065
        '\uBE14\uB85D \uD3B8\uC9D1\uAE30',
    'Method Editor': // byob.js:2066
        undefined,
    'Apply': // byob.js:2119
        '\uC801\uC6A9',
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
        undefined,
    'Create input name': // byob.js:2754
        '\uC785\uB825 \uC774\uB984 \uC0DD\uC131',
    'Edit input name': // byob.js:2755
        '\uC785\uB825 \uC774\uB984 \uD3B8\uC9D1',
    'new line': // byob.js:2800 byob.js:3266
        undefined,
    'Title text': // byob.js:3061
        '\uC81C\uBAA9 \uD14D\uC2A4\uD2B8',
    'Delete': // byob.js:3239 gui.js:5940
        '\uC0AD\uC81C',
    'Object': // byob.js:3283
        '\uAC1D\uCCB4',
    'Text': // byob.js:3284
        '\uD14D\uC2A4\uD2B8',
    'List': // byob.js:3285
        '\uB9AC\uC2A4\uD2B8',
    'Any type': // byob.js:3287
        '\uC544\uBB34\uD0C0\uC785',
    'Boolean (T/F)': // byob.js:3288
        '\uBD88\uB9AC\uC5B8 (\uCC38/\uAC70\uC9D3)',
    'Command\n(inline)': // byob.js:3289
        '\uCEE4\uB9E8\uB4DC\n(\uC778\uB77C\uC778)',
    'Command\n(C-shape)': // byob.js:3292
        '\uCEE4\uB9E8\uB4DC\n(C-\uBAA8\uC591)',
    'Any\n(unevaluated)': // byob.js:3293
        '\uC544\uBB34\uAC12\n(\uD3C9\uAC00\uB418\uC9C0 \uC54A\uC74C)',
    'Boolean\n(unevaluated)': // byob.js:3294
        '\uBD88\uB9AC\uC5B8\n(\uD3C9\uAC00\uB418\uC9C0 \uC54A\uC74C)',
    'Single input': // byob.js:3299
        '\uB2E8\uC77C \uC785\uB825',
    'Multiple inputs (value is list of inputs)': // byob.js:3304
        '\uB2E4\uC911 \uC785\uB825 (\uAC12\uC740 \uB9AC\uC2A4\uD2B8\uC758 \uC785\uB825\uAC12\uC785\uB2C8\uB2E4)',
    'Upvar - make internal variable visible to caller': // byob.js:3309
        'Upvar - \uD638\uCD9C\uC790\uC5D0\uAC8C \uB0B4\uBD80 \uBCC0\uC218 \uBCF4\uC774\uAC8C \uB9CC\uB4E4\uAE30',
    'Default Value': // byob.js:3314
        '\uAE30\uBCF8 \uAC12',
    'options': // byob.js:3570
        undefined,
    'read-only': // byob.js:3573
        undefined,
    'Input Slot Options': // byob.js:3593
        undefined,
    'Enter one option per line.\nOptionally use "=" as key/value delimiter and {} for submenus. e.g.\n   the answer=42': // byob.js:3597
        undefined,
    'Export blocks': // byob.js:3776 byob.js:3914 gui.js:3187 gui.js:3835
        '\uBE14\uB85D \uB0B4\uBCF4\uB0B4\uAE30',
    'select': // byob.js:3873
        '\uC120\uD0DD',
    'none': // byob.js:3875 objects.js:5421 objects.js:5427
        '\uBAA8\uB450 \uCDE8\uC18C',
    '{{ projectName }} blocks': // byob.js:3910
        undefined,
    'no blocks were selected': // byob.js:3915 byob.js:4009 byob.js:4102
        undefined,
    'Import blocks': // byob.js:3962 byob.js:3963 byob.js:4008
        undefined,
    'Imported Blocks Module': // byob.js:4002 byob.js:4003 gui.js:4355
        undefined,
    'Remove unused blocks': // byob.js:4056 byob.js:4057 byob.js:4101 gui.js:3872
        undefined,
    '{{ count }} unused block(s) removed': // byob.js:4096
        undefined,
    'There was an error while trying to access\na {{ cloudName }} service. Please try again later.': // cloud.js:90
        undefined,
    'Cloud Error': // cloud.js:159
        undefined,
    'You are not logged in': // cloud.js:188 cloud.js:436
        undefined,
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
        undefined,
    'Opening project': // gui.js:430 gui.js:470 gui.js:2627 gui.js:4222
        undefined,
    'Saved project\n{{ name }}': // gui.js:506
        undefined,
    'Visible stepping': // gui.js:716 gui.js:2756
        undefined,
    'development mode': // gui.js:990 morphic.js:12252
        '\uAC1C\uBC1C\uC790 \uBAA8\uB4DC',
    'don\'t rotate': // gui.js:1222
        '\uD68C\uC804\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4',
    'can rotate': // gui.js:1223
        '\uD68C\uC804\uAC00\uB2A5',
    'only face left/right': // gui.js:1224
        '\uC67C\uCABD\uC5D0\uC11C \uC624\uB978\uCABD\uC73C\uB85C\uB9CC',
    'draggable': // gui.js:1329
        '\uB9C8\uC6B0\uC2A4\uB85C \uC9C1\uC811 \uC6C0\uC9C1\uC774\uAE30',
    'Scripts': // gui.js:1371 gui.js:4179
        '\uC2A4\uD06C\uB9BD\uD2B8',
    'Costumes': // gui.js:1391 gui.js:3252 gui.js:3255 gui.js:4156
        '\uBAA8\uC591',
    'Backgrounds': // gui.js:1392 gui.js:3252 gui.js:3255
        undefined,
    'Sounds': // gui.js:1411 gui.js:3262 gui.js:3264 gui.js:4167
        '\uC18C\uB9AC',
    'add a new Turtle sprite': // gui.js:1545
        '\uC0C8\uB85C\uC6B4 \uC2A4\uD504\uB77C\uC774\uD2B8 \uCD94\uAC00\uD558\uAE30',
    'paint a new sprite': // gui.js:1567
        '\uC0C8\uB85C\uC6B4 \uC2A4\uD504\uB77C\uC774\uD2B8 \uADF8\uB9AC\uAE30',
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
        'Snap! \uC5D0 \uB300\uD574\uC11C',
    'Reference manual': // gui.js:2474
        '\uCC38\uACE0\uC790\uB8CC \uB2E4\uC6B4\uB85C\uB4DC',
    '{{ site }} website': // gui.js:2481
        '{{ site }} \uC6F9\uC0AC\uC774\uD2B8',
    'Download source': // gui.js:2487
        '\uC18C\uC2A4\uCF54\uB4DC \uB2E4\uC6B4\uB85C\uB4DC',
    'Switch back to user mode': // gui.js:2498
        '\uC0AC\uC6A9\uC790 \uBAA8\uB4DC\uB85C \uC804\uD658',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones': // gui.js:2500
        '\uACE0\uB3C4\uC758 \uBAA8\uD53D \uCEE8\uD14D\uC2A4\uD2B8 \uBA54\uB274\uB97C \uC228\uACA8 \uC0AC\uC6A9\uC790 \uCE5C\uD654\uC801\uC73C\uB85C \uBCF4\uC5EC\uC90D\uB2C8\uB2E4.',
    'Switch to dev mode': // gui.js:2507
        '\uAC1C\uBC1C\uC790 \uBAA8\uB4DC\uB85C \uC804\uD658',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!': // gui.js:2509
        '\uBAA8\uD53D \uCEE8\uD14D\uC2A4\uD2B8 \uBA54\uB274\uC640 \uC778\uC2A4\uD399\uD130\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC788\uC73C\uB098, \uC0AC\uC6A9\uC790 \uCE5C\uD654\uC801\uC774\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4!',
    'Cloud URL': // gui.js:2527 gui.js:5654
        undefined,
    'Login': // gui.js:2536
        '\uB85C\uADF8\uC778',
    'Signup': // gui.js:2540
        '\uACC4\uC815\uB9CC\uB4E4\uAE30',
    'Reset Password': // gui.js:2544
        '\uBE44\uBC00\uBC88\uD638 \uC7AC\uC124\uC815',
    'Resend Verification Email': // gui.js:2548
        undefined,
    'Logout {{ username }}': // gui.js:2553
        undefined,
    'Change Password': // gui.js:2557 gui.js:5420
        undefined,
    'Export project media only': // gui.js:2564
        undefined,
    'Export Project As': // gui.js:2569 gui.js:2583 gui.js:2597 gui.js:3158 gui.js:3176
        undefined,
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
        '\uC5B8\uC5B4\uC120\uD0DD',
    'Generate {{ filename }} file': // gui.js:2679 gui.js:5035
        undefined,
    'builds the {{ language }} translation file': // gui.js:2684
        undefined,
    'Zoom blocks': // gui.js:2692 gui.js:5120
        '\uBE14\uB85D \uD06C\uAE30 \uC124\uC815',
    'Stage size': // gui.js:2696 gui.js:5163
        '\uBB34\uB300 \uD06C\uAE30',
    'Dragging threshold': // gui.js:2701 gui.js:5226
        undefined,
    'specify the distance the hand has to move\nbefore it picks up an object': // gui.js:2703
        undefined,
    'Retina display support': // gui.js:2725
        undefined,
    'uncheck for lower resolution,\nsaves computing resources': // gui.js:2728
        undefined,
    'check for higher resolution,\nuses more computing resources': // gui.js:2729
        undefined,
    'Input sliders': // gui.js:2733
        '\uC785\uB825\uCC3D\uC5D0\uC11C \uC2AC\uB77C\uC774\uB354 \uC0AC\uC6A9',
    'uncheck to disable\ninput sliders for\nentry fields': // gui.js:2736
        '\uCCB4\uD06C\uD574\uC81C\uD558\uBA74, \uC785\uB825\uCC3D\uC5D0\uC11C\n\uC2AC\uB77C\uC774\uB354\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.',
    'check to enable\ninput sliders for\nentry fields': // gui.js:2737
        '\uCCB4\uD06C\uD558\uBA74, \uC785\uB825\uCC3D\uC5D0\uC11C\n\uC2AC\uB77C\uC774\uB354\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.',
    'Execute on slider change': // gui.js:2741
        undefined,
    'uncheck to suppress\nrunning scripts\nwhen moving the slider': // gui.js:2744
        undefined,
    'check to run\nthe edited script\nwhen moving the slider': // gui.js:2745
        undefined,
    'Turbo mode': // gui.js:2749
        '\uD130\uBCF4 \uBAA8\uB4DC',
    'uncheck to run scripts\nat normal speed': // gui.js:2752
        '\uCCB4\uD06C\uD574\uC81C\uD558\uBA74, \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC18D\uB3C4\uB97C\n\uBCF4\uD1B5\uC73C\uB85C \uD569\uB2C8\uB2E4.',
    'check to prioritize\nscript execution': // gui.js:2753
        '\uCCB4\uD06C\uD558\uBA74, \uC2A4\uD06C\uB9BD\uD2B8\uB97C\n\uBE60\uB974\uAC8C \uC2E4\uD589\uD569\uB2C8\uB2E4.',
    'uncheck to turn off\nvisible stepping': // gui.js:2759
        undefined,
    'check to turn on\nvisible stepping (slow)': // gui.js:2760
        undefined,
    'Ternary Boolean slots': // gui.js:2764
        undefined,
    'uncheck to limit\nBoolean slots to true / false': // gui.js:2770
        undefined,
    'check to allow\nempty Boolean slots': // gui.js:2771
        undefined,
    'Camera support': // gui.js:2775
        undefined,
    'uncheck to disable\ncamera support': // gui.js:2778
        undefined,
    'check to enable\ncamera support': // gui.js:2779
        undefined,
    'Blurred shadows': // gui.js:2784
        '\uBC18\uD22C\uBA85 \uADF8\uB9BC\uC790',
    'uncheck to use solid drop\nshadows and highlights': // gui.js:2787
        '\uCCB4\uD06C\uD574\uC81C\uD558\uBA74, \uADF8\uB9BC\uC790\uC640 \uD558\uC774\uB77C\uC774\uD2B8\uAC00\n\uBD88\uD22C\uBA85 \uC0C1\uD0DC\uB85C \uB429\uB2C8\uB2E4.',
    'check to use blurred drop\nshadows and highlights': // gui.js:2788
        '\uCCB4\uD06C\uD558\uBA74, \uADF8\uB9BC\uC790\uC640 \uD558\uC774\uB77C\uC774\uD2B8\uAC00\n\uBC18\uD22C\uBA85 \uC0C1\uD0DC\uB85C \uB429\uB2C8\uB2E4.',
    'Zebra coloring': // gui.js:2792
        '\uC911\uCCA9 \uBE14\uB85D \uAD6C\uBD84\uD558\uAE30',
    'uncheck to disable alternating\ncolors for nested block': // gui.js:2795
        '\uCCB4\uD06C\uD574\uC81C\uD558\uBA74, \uC911\uCCA9\uB41C \uBE14\uB85D\uC744\n\uB2E4\uB978 \uC0C9\uC73C\uB85C \uAD6C\uBD84\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.',
    'check to enable alternating\ncolors for nested blocks': // gui.js:2796
        '\uCCB4\uD06C\uD558\uBA74, \uC911\uCCA9\uB41C \uBE14\uB85D\uC744\n\uB2E4\uB978 \uC0C9\uC73C\uB85C \uAD6C\uBD84\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.',
    'Dynamic input labels': // gui.js:2800
        'Dynamic input labels',
    'uncheck to disable dynamic\nlabels for variadic inputs': // gui.js:2803
        'uncheck to disable dynamic\nlabels for variadic inputs',
    'check to enable dynamic\nlabels for variadic inputs': // gui.js:2804
        'check to enable dynamic\nlabels for variadic inputs',
    'Prefer empty slot drops': // gui.js:2808
        '\uBE48 \uC2AC\uB86F\uC5D0 \uC785\uB825 \uAC00\uB2A5',
    'uncheck to allow dropped\nreporters to kick out others': // gui.js:2811
        '\uCCB4\uD06C\uD574\uC81C\uD558\uBA74, \uAE30\uC874 \uB9AC\uD3EC\uD130 \uBE14\uB85D\uC5D0\n\uC0C8\uB85C\uC6B4 \uB9AC\uD3EC\uD130 \uBE14\uB85D\uC73C\uB85C \uB300\uCCB4\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.',
    'check to focus on empty slots\nwhen dragging & dropping reporters': // gui.js:2812
        '\uC124\uC815 \uBA54\uB274\uC5D0 \uBE48 \uC2AC\uB86F\uC758\n\uD78C\uD2B8\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.',
    'Long form input dialog': // gui.js:2816
        '\uAE34 \uD615\uD0DC\uC758 \uC785\uB825 \uB300\uD654\uCC3D',
    'uncheck to use the input\ndialog in short form': // gui.js:2819
        '\uCCB4\uD06C\uD574\uC81C\uD558\uBA74, \uC785\uB825 \uB300\uD654\uCC3D\uC744\n\uC9E7\uC740 \uD615\uD0DC\uB85C \uC0AC\uC6A9\uD569\uB2C8\uB2E4.',
    'check to always show slot\ntypes in the input dialog': // gui.js:2820
        '\uCCB4\uD06C\uD558\uBA74, \uC785\uB825 \uB300\uD654\uCC3D\uC5D0\n\uD56D\uC0C1 \uC2AC\uB86F\uC758 \uD615\uD0DC\uB97C \uBCF4\uC5EC\uC90D\uB2C8\uB2E4.',
    'Plain prototype labels': // gui.js:2823
        '\uC0C8\uB85C \uB9CC\uB4E0 \uBE14\uB85D \uC778\uC218 \uC124\uC815',
    'uncheck to always show (+) symbols\nin block prototype labels': // gui.js:2826
        '\uCCB4\uD06C\uD574\uC81C\uD558\uBA74, \uBE14\uB85D \uD3B8\uC9D1\uAE30\uC5D0\uC11C\n\uBE14\uB85D \uC778\uC218 \uCD94\uAC00 \uBC84\uD2BC(+)\uC744\n\uBCF4\uC785\uB2C8\uB2E4.',
    'check to hide (+) symbols\nin block prototype labels': // gui.js:2827
        '\uCCB4\uD06C\uD558\uBA74, \uBE14\uB85D \uD3B8\uC9D1\uAE30\uC5D0\uC11C\n\uBE14\uB85D \uC778\uC218 \uCD94\uAC00 \uBC84\uD2BC(+)\uC744\n\uC228\uAE41\uB2C8\uB2E4.',
    'Virtual keyboard': // gui.js:2830
        '\uAC00\uC0C1 \uD0A4\uBCF4\uB4DC',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices': // gui.js:2833
        '\uCCB4\uD06C\uD574\uC81C\uD558\uBA74, \uBAA8\uBC14\uC77C \uAE30\uAE30\uC5D0\uC11C\n\uAC00\uC0C1 \uD0A4\uBCF4\uB4DC\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.',
    'check to enable\nvirtual keyboard support\nfor mobile devices': // gui.js:2834
        '\uCCB4\uD06C\uD558\uBA74, \uBAA8\uBC14\uC77C \uAE30\uAE30\uC5D0\uC11C\n\uAC00\uC0C1 \uD0A4\uBCF4\uB4DC\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.',
    'Clicking sound': // gui.js:2838
        '\uBE14\uB85D \uD074\uB9AD\uC2DC \uC18C\uB9AC',
    'uncheck to turn\nblock clicking\nsound off': // gui.js:2848
        '\uCCB4\uD06C\uD574\uC81C\uD558\uBA74, \uBE14\uB85D \uD074\uB9AD\uC2DC\n\uC18C\uB9AC\uAC00 \uAEBC\uC9D1\uB2C8\uB2E4.',
    'check to turn\nblock clicking\nsound on': // gui.js:2849
        '\uCCB4\uD06C\uD558\uBA74, \uBE14\uB85D \uD074\uB9AD\uC2DC\n\uC18C\uB9AC\uAC00 \uCF1C\uC9D1\uB2C8\uB2E4.',
    'Animations': // gui.js:2852
        '\uC560\uB2C8\uBA54\uC774\uC158',
    'uncheck to disable\nIDE animations': // gui.js:2855
        '\uCCB4\uD06C\uD574\uC81C\uD558\uBA74, IDE \uC560\uB2C8\uBA54\uC774\uC158\uC744\n\uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.',
    'check to enable\nIDE animations': // gui.js:2856
        undefined,
    'Cache Inputs': // gui.js:2860
        undefined,
    'uncheck to stop caching\ninputs (for debugging the evaluator)': // gui.js:2866
        undefined,
    'check to cache inputs\nboosts recursion': // gui.js:2867
        undefined,
    'Rasterize SVGs': // gui.js:2871
        undefined,
    'uncheck for smooth\nscaling of vector costumes': // gui.js:2877
        undefined,
    'check to rasterize\nSVGs on import': // gui.js:2878
        undefined,
    'Flat design': // gui.js:2882
        '\uD50C\uB7AB(Flat) \uB514\uC790\uC778',
    'uncheck for default\nGUI design': // gui.js:2890
        '\uCCB4\uD06C\uD574\uC81C\uD558\uBA74,\n\uAE30\uBCF8 GUI \uB514\uC790\uC778\uC73C\uB85C\n\uBCC0\uACBD\uD569\uB2C8\uB2E4.',
    'check for alternative\nGUI design': // gui.js:2891
        '\uCCB4\uD06C\uD558\uBA74, \uD50C\uB7AB(Flat)\n\uB514\uC790\uC778\uC73C\uB85C \uBCC0\uACBD\uD569\uB2C8\uB2E4.',
    'Nested auto-wrapping': // gui.js:2895
        undefined,
    'uncheck to confine auto-wrapping\nto top-level block stacks': // gui.js:2906
        undefined,
    'check to enable auto-wrapping\ninside nested block stacks': // gui.js:2907
        undefined,
    'Project URLs': // gui.js:2911
        undefined,
    'uncheck to disable\nproject data in URLs': // gui.js:2921
        undefined,
    'check to enable\nproject data in URLs': // gui.js:2922
        undefined,
    'Sprite Nesting': // gui.js:2926
        'Sprite Nesting',
    'uncheck to disable\nsprite composition': // gui.js:2932
        'uncheck to disable\nsprite composition',
    'check to enable\nsprite composition': // gui.js:2933
        'check to enable\nsprite composition',
    'First-Class Sprites': // gui.js:2937
        undefined,
    'uncheck to disable support\nfor first-class sprites': // gui.js:2946
        undefined,
    'check to enable support\nfor first-class sprite': // gui.js:2947
        undefined,
    'Keyboard Editing': // gui.js:2951
        undefined,
    'uncheck to disable\nkeyboard editing support': // gui.js:2963
        undefined,
    'check to enable\nkeyboard editing support': // gui.js:2964
        undefined,
    'Table support': // gui.js:2968
        undefined,
    'uncheck to disable\nmulti-column list views': // gui.js:2979
        undefined,
    'check for multi-column\nlist view support': // gui.js:2980
        undefined,
    'Table lines': // gui.js:2985
        undefined,
    'uncheck for less contrast\nmulti-column list views': // gui.js:2996
        undefined,
    'check for higher contrast\ntable views': // gui.js:2997
        undefined,
    'Live coding support': // gui.js:3002
        undefined,
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
        '\uC2A4\uB808\uB4DC \uC548\uC804 \uC2A4\uD06C\uB9BD\uD2B8',
    'uncheck to allow\nscript reentrance': // gui.js:3035
        '\uCCB4\uD06C\uD574\uC81C\uD558\uBA74, \uC2A4\uD06C\uB9BD\uD2B8\n\uC7AC\uC9C4\uC785\uC131\uC744 \uD5C8\uB77D\uD569\uB2C8\uB2E4.',
    'check to disallow\nscript reentrance': // gui.js:3036
        '\uCCB4\uD06C\uD558\uBA74, \uC2A4\uD06C\uB9BD\uD2B8\n\uC7AC\uC9C4\uC785\uC131\uC744 \uD5C8\uB77D\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.',
    'Prefer smooth animations': // gui.js:3039
        '\uC790\uC5F0\uC2A4\uB7EC\uC6B4 \uC560\uB2C8\uBA54\uC774\uC158',
    'uncheck for greater speed\nat variable frame rates': // gui.js:3042
        '\uCCB4\uD06C\uD574\uC81C\uD558\uBA74, \uD504\uB808\uC784\n\uC804\uD658 \uBE44\uC728\uC774 \uBE68\uB77C\uC9D1\uB2C8\uB2E4.',
    'check for smooth, predictable\nanimations across computers': // gui.js:3043
        '\uCCB4\uD06C\uD558\uBA74, \uC560\uB2C8\uBA54\uC774\uC158\uC774\n\uC790\uC5F0\uC2A4\uB7EC\uC6CC \uC9D1\uB2C8\uB2E4.',
    'Flat line ends': // gui.js:3047
        '\uC120 \uB05D\uC744 \uD3C9\uD3C9\uD558\uAC8C \uB9CC\uB4E4\uAE30',
    'uncheck for round ends of lines': // gui.js:3053
        '\uCCB4\uD06C\uD574\uC81C\uD558\uBA74, \uC120 \uB05D\uC744\n\uB465\uAE00\uAC8C \uB9CC\uB4ED\uB2C8\uB2E4.',
    'check for flat ends of lines': // gui.js:3054
        '\uCCB4\uD06C\uD558\uBA74, \uC120 \uB05D\uC744\n\uD3C9\uD3C9\uD558\uAC8C \uB9CC\uB4ED\uB2C8\uB2E4.',
    'Codification support': // gui.js:3057
        '\uCCB4\uACC4\uD654 \uC9C0\uC6D0',
    'uncheck to disable\nblock to text mapping features': // gui.js:3066
        'uncheck to disable\nblock to text mapping features',
    'check for block\nto text mapping features': // gui.js:3067
        '\uCCB4\uD06C\uD558\uBA74, check for block\nto text mapping features',
    'Inheritance support': // gui.js:3071
        undefined,
    'uncheck to disable\nsprite inheritance features': // gui.js:3080
        undefined,
    'check for sprite\ninheritance features': // gui.js:3081
        undefined,
    'Persist linked sublist IDs': // gui.js:3085
        undefined,
    'uncheck to disable\nsaving linked sublist identities': // gui.js:3091
        undefined,
    'check to enable\nsaving linked sublist identities': // gui.js:3092
        undefined,
    'Project notes': // gui.js:3107
        '\uD504\uB85C\uC81D\uD2B8 \uBA54\uBAA8',
    'New': // gui.js:3109
        '\uC0C8\uB85C \uB9CC\uB4E4\uAE30',
    'Open': // gui.js:3110 gui.js:5924
        '\uC5F4\uAE30',
    'Save': // gui.js:3111 gui.js:5927 gui.js:8995 gui.js:9133
        '\uC800\uC7A5\uD558\uAE30',
    'Save As': // gui.js:3112
        '\uB2E4\uB978 \uC774\uB984\uC73C\uB85C \uC800\uC7A5\uD558\uAE30',
    'Import': // gui.js:3115 gui.js:3370 gui.js:6842
        '\uAC00\uC838\uC624\uAE30',
    'load an exported project file\nor block library, a costume\nor a sound': // gui.js:3146
        '\uB0B4\uBCF4\uB0B8 \uD504\uB85C\uC81D\uD2B8 \uD30C\uC77C, \uBE14\uB85D \uB77C\uC774\uBE0C\uB7EC\uB9AC\n\uC2A4\uD504\uB77C\uC774\uD2B8 \uBAA8\uC591 \uB610\uB294 \uC18C\uB9AC\uB97C \uAC00\uC838\uC635\uB2C8\uB2E4.',
    'Export project (in a new window)': // gui.js:3153
        undefined,
    'show project data as XML\nin a new browser window': // gui.js:3164
        '\uD504\uB85C\uC81D\uD2B8 \uB370\uC774\uD130\uB97C\n\uC0C8\uB85C\uC6B4 \uC708\uB3C4\uC6B0\uC5D0 XML \uD615\uD0DC\uB85C \uBCF4\uC5EC\uC8FC\uAE30',
    'Export project as plain text': // gui.js:3170
        '\uD504\uB85C\uC81D\uD2B8\uB97C \uD14D\uC2A4\uD2B8 \uD30C\uC77C\uB85C \uB0B4\uBCF4\uB0B4\uAE30',
    'Export project': // gui.js:3171
        '\uD504\uB85C\uC81D\uD2B8 \uB0B4\uBCF4\uB0B4\uAE30',
    'save project data as XML\nto your downloads folder': // gui.js:3181
        undefined,
    'show global custom block definitions as XML\nin a new browser window': // gui.js:3189
        '\uC0C8\uB86D\uAC8C \uC815\uC758\uD55C \uC804\uC5ED \uBE14\uB85D \uB370\uC774\uD130\uB97C\n\uC0C8\uB85C\uC6B4 \uC708\uB3C4\uC6B0\uC5D0 XML \uD615\uD0DC\uB85C \uBCF4\uC5EC\uC8FC\uAE30',
    'Unused blocks': // gui.js:3193
        undefined,
    'find unused global custom blocks\nand remove their definitions': // gui.js:3195
        undefined,
    'Export summary': // gui.js:3201
        undefined,
    'open a new browser browser window\nwith a summary of this project': // gui.js:3203
        undefined,
    'Export summary with drop-shadows': // gui.js:3208
        undefined,
    'open a new browser browser window\nwith a summary of this project\nwith drop-shadows on all pictures.\nnot supported by all browsers': // gui.js:3210
        undefined,
    'Export all scripts as pic': // gui.js:3217
        '\uBAA8\uB4E0 \uC2A4\uD06C\uB9BD\uD2B8\uB97C \uADF8\uB9BC\uD30C\uC77C\uB85C \uB0B4\uBCF4\uB0B4\uAE30',
    'show a picture of all scripts\nand block definitions': // gui.js:3219
        '\uBAA8\uB4E0 \uC2A4\uD06C\uB9BD\uD2B8\uC640 \uC815\uC758\uB41C \uBE14\uB85D\uC744 \uADF8\uB9BC\uD30C\uC77C\uB85C \uBCF4\uC5EC\uC90D\uB2C8\uB2E4.',
    'Import tools': // gui.js:3226
        '\uCD94\uAC00 \uB3C4\uAD6C \uAC00\uC838\uC624\uAE30',
    'load the official library of\npowerful blocks': // gui.js:3235
        '\uAC15\uB825\uD55C \uAE30\uB2A5\uC744 \uC81C\uACF5\uD558\uB294\n\uBE14\uB85D\uB4E4\uC744 \uAC00\uC838\uC635\uB2C8\uB2E4.',
    'Libraries': // gui.js:3238
        '\uB77C\uC774\uBE0C\uB7EC\uB9AC',
    'select categories of additional blocks to add to this project': // gui.js:3248
        '\uCD94\uAC00\uC801\uC778 \uBE14\uB85D\uC744 \uC120\uD0DD\uD574\uC11C\n\uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.',
    'Select a costume from the media library': // gui.js:3259
        undefined,
    'Select a sound from the media library': // gui.js:3266
        undefined,
    'Opening {{ resource }}': // gui.js:3341
        undefined,
    'License': // gui.js:3529 gui.js:3630
        '\uB77C\uC774\uC13C\uC2A4',
    'Contributors': // gui.js:3548
        '\uAE30\uC5EC\uC790',
    'current module versions': // gui.js:3574
        '\uD604\uC7AC \uBAA8\uB4C8 \uBC84\uC804',
    'Translations': // gui.js:3578
        '\uBC88\uC5ED',
    'About Snap': // gui.js:3581
        'Snap\uC5D0 \uB300\uD574\uC11C',
    'Translators': // gui.js:3597
        '\uBC88\uC5ED\uC790',
    'Back': // gui.js:3613
        '\uB4A4\uB85C',
    'Modules': // gui.js:3646
        '\uBAA8\uB4C8',
    'Credits': // gui.js:3662
        '\uD06C\uB808\uB514\uD2B8',
    'Project Notes': // gui.js:3709
        '\uD504\uB85C\uC81D\uD2B8 \uBA54\uBAA8',
    'Saving': // gui.js:3770
        undefined,
    'Saved': // gui.js:3788 gui.js:3796
        '\uC800\uC7A5\uD588\uC2B5\uB2C8\uB2E4',
    'Save failed': // gui.js:3790
        undefined,
    'Exporting': // gui.js:3811 gui.js:5464 gui.js:5493 gui.js:5503 gui.js:5521 gui.js:5533
        undefined,
    'Exported': // gui.js:3816 gui.js:5471 gui.js:5497 gui.js:5507 gui.js:5527 gui.js:5539
        undefined,
    'Export failed': // gui.js:3819 gui.js:5475 gui.js:5500 gui.js:5530
        undefined,
    'this project doesn\'t have any\ncustom global blocks yet': // gui.js:3836
        '\uC774 \uD504\uB85C\uC81D\uD2B8\uC5D0\uB294 \uC544\uC9C1 \uC0C8\uB85C \uB9CC\uB4E0 \uC804\uC5ED \uBE14\uB85D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.',
    'there are currently no unused\nglobal custom blocks in this project': // gui.js:3873
        undefined,
    'Untitled': // gui.js:3937 gui.js:8190 store.js:368 store.js:1651
        '\uC774\uB984\uC5C6\uC74C',
    'Variables': // gui.js:3968 objects.js:153
        '\uBCC0\uC218',
    'Blocks': // gui.js:4000
        undefined,
    'Contents': // gui.js:4103
        undefined,
    'Kind of {{ name }}': // gui.js:4132
        undefined,
    'Part of {{ name }}': // gui.js:4139
        undefined,
    'Parts': // gui.js:4144
        undefined,
    'For all Sprites': // gui.js:4197 gui.js:4201
        undefined,
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
        '\uD604\uC7AC \uD504\uB85C\uC81D\uD2B8\uB97C \uC0C8\uB85C\uC6B4 \uD504\uB85C\uC81D\uD2B8\uB85C \uAD50\uCCB4\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?',
    'New Project': // gui.js:4915
        '\uC0C8\uB85C\uC6B4 \uD504\uB85C\uC81D\uD2B8',
    'Generating {{ filename }} file': // gui.js:5011
        undefined,
    'Could not generate the language file': // gui.js:5039
        undefined,
    'build': // gui.js:5057
        '\uB9CC\uB4E4\uAE30',
    'your own': // gui.js:5060
        '\uB098\uB9CC\uC758',
    'blocks': // gui.js:5064
        '\uBE14\uB85D',
    'normal (1x)': // gui.js:5106
        '\uAE30\uBCF8 \uD06C\uAE30 (1x)',
    'demo (1.2x)': // gui.js:5107
        '\uB370\uBAA8 \uD06C\uAE30 (1.2x)',
    'presentation (1.4x)': // gui.js:5108
        '\uBC1C\uD45C\uC6A9 \uD06C\uAE30 (1.4x)',
    'big (2x)': // gui.js:5109
        '\uD070 \uD06C\uAE30 (2x)',
    'huge (4x)': // gui.js:5110
        '\uB9E4\uC6B0 \uD070 \uD06C\uAE30(4x)',
    'giant (8x)': // gui.js:5111
        '\uC815\uB9D0 \uD070 \uD06C\uAE30 (8x)',
    'monstrous (10x)': // gui.js:5112
        '\uBBFF\uC744 \uC218 \uC5C6\uB294 \uD06C\uAE30 (10x)',
    'Stage width': // gui.js:5166
        '\uAC00\uB85C(\uB108\uBE44)',
    'Stage height': // gui.js:5167
        '\uC138\uB85C(\uB192\uC774)',
    '{{ count }} days left': // gui.js:5253
        undefined,
    'You are now logged in, and your account\nis enabled for three days.\nPlease use the verification link that\nwas sent to your email address when you\nsigned up.\n\nIf you cannot find that email, please\ncheck your spam folder. If you still\ncannot find it, please use the "Resend\nVerification Email..." option in the cloud\nmenu.\n\nYou have {{ count }} days left.': // gui.js:5254
        undefined,
    'Sign in': // gui.js:5277
        undefined,
    'stay signed in on this computer\nuntil logging out': // gui.js:5283
        undefined,
    'You can now log in': // gui.js:5305
        undefined,
    'Sign up': // gui.js:5314
        undefined,
    'Terms of Service': // gui.js:5317
        undefined,
    'Privacy': // gui.js:5319
        undefined,
    'I have read and agree\nto the Terms of Service': // gui.js:5320
        undefined,
    'An e-mail with a link to\nreset your password\nhas been sent to the address provided': // gui.js:5340
        undefined,
    'Reset password': // gui.js:5352
        undefined,
    'An e-mail with a link to\nverify your account\nhas been sent to the address provided': // gui.js:5378
        undefined,
    'Resend verification email': // gui.js:5390
        undefined,
    'password has been changed': // gui.js:5414
        undefined,
    'disconnected': // gui.js:5437 gui.js:5440
        undefined,
    'Saving project\nto the cloud': // gui.js:5448 gui.js:6476
        undefined,
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
        undefined,
    'Open Project': // gui.js:5800
        '\uD504\uB85C\uC81D\uD2B8 \uC5F4\uAE30',
    'Cloud': // gui.js:5836
        undefined,
    'Browser': // gui.js:5837
        undefined,
    'Examples': // gui.js:5840 gui.js:6198 gui.js:6254 gui.js:6378
        undefined,
    'Share': // gui.js:5930
        undefined,
    'Unshare': // gui.js:5931
        undefined,
    '(no matches)': // gui.js:6095
        undefined,
    'Updating\nproject list': // gui.js:6119
        undefined,
    'last changed\n{{ date }}': // gui.js:6314
        undefined,
    'Are you sure you want to replace\n"{{ projectName }}"?': // gui.js:6436 gui.js:6454
        undefined,
    'Replace Project': // gui.js:6438 gui.js:6456
        undefined,
    'Are you sure you want to delete\n"{{ projectName }}"?': // gui.js:6498 gui.js:6522
        '\uC815\uB9D0\uB85C \uC0AD\uC81C\uD569\uB2C8\uAE4C?\n"{{ projectName }}"?',
    'Delete Project': // gui.js:6500 gui.js:6524
        '\uD504\uB85C\uC81D\uD2B8 \uC0AD\uC81C',
    'Are you sure you want to share\n"{{ projectName }}"?': // gui.js:6542
        undefined,
    'Share Project': // gui.js:6544
        undefined,
    'sharing\nproject': // gui.js:6546
        undefined,
    'shared': // gui.js:6563
        undefined,
    'Are you sure you want to unshare\n"{{ projectName }}"?': // gui.js:6590
        undefined,
    'Unshare Project': // gui.js:6592
        undefined,
    'unsharing\nproject': // gui.js:6594
        undefined,
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
        '\uB77C\uC774\uBE0C\uB7EC\uB9AC \uAC00\uC838\uC624\uAE30',
    'Loading {{ resource }}': // gui.js:6926 gui.js:7059
        undefined,
    'Imported {{ resource }}': // gui.js:7054
        undefined,
    'pic': // gui.js:7353 morphic.js:4194 objects.js:7425
        '\uADF8\uB9BC\uD30C\uC77C\uB85C \uB0B4\uBCF4\uB0B4\uAE30',
    'open a new window\nwith a picture of the stage': // gui.js:7361 objects.js:7432
        '\uC0C8\uB85C\uC6B4 \uCC3D\uC744 \uC5F4\uACE0\n\uBB34\uB300\uC758 \uD654\uBA74\uC744\n\uADF8\uB9BC\uD30C\uC77C\uB85C \uC800\uC7A5\uD55C\uB2E4.',
    'show': // gui.js:7366 morphic.js:7568 objects.js:388
        '\uBCF4\uC774\uAE30',
    'clone': // gui.js:7370 objects.js:3238
        undefined,
    'release': // gui.js:7388
        undefined,
    'make temporary and\nhide in the sprite corral': // gui.js:7390
        undefined,
    'detach from {{ name }}': // gui.js:7396 objects.js:3266
        undefined,
    'detach all parts': // gui.js:7402 objects.js:3271
        undefined,
    'export': // gui.js:7406 gui.js:7713 objects.js:3273 objects.js:9542
        '\uB0B4\uBCF4\uB0B4\uAE30',
    'edit rotation point only': // gui.js:7702
        undefined,
    'rename costume': // gui.js:7755
        undefined,
    'rename background': // gui.js:7756
        undefined,
    'default': // gui.js:7893
        undefined,
    'pen': // gui.js:7975 morphic.js:12402
        undefined,
    'tip': // gui.js:7982
        undefined,
    'middle': // gui.js:7991
        undefined,
    'Paint a new costume': // gui.js:8085
        '\uC0C8\uB85C\uC6B4 \uBAA8\uC591 \uADF8\uB9AC\uAE30',
    'Import a new costume from your webcam': // gui.js:8110
        undefined,
    'import a picture from another web page or from\na file on your computer by dropping it here': // gui.js:8134
        '\uB2E4\uB978 \uC6F9\uD398\uC774\uC9C0\uB098 \uCEF4\uD4E8\uD130\uC5D0 \uC788\uB294 \uC774\uBBF8\uC9C0 \uD30C\uC77C\uC744\n\uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8\uD574\uC11C \uAC00\uC838\uC635\uB2C8\uB2E4.',
    'Stop': // gui.js:8345 gui.js:8367
        '\uC815\uC9C0',
    'Play': // gui.js:8345 gui.js:8375
        '\uC7AC\uC0DD',
    'Play sound': // gui.js:8348 gui.js:8376
        '\uC18C\uB9AC \uC7AC\uC0DD',
    'Stop sound': // gui.js:8368
        '\uC18C\uB9AC \uC815\uC9C0',
    'rename sound': // gui.js:8432
        undefined,
    'import a sound from your computer\nby dragging it into here': // gui.js:8526
        '\uCEF4\uD4E8\uD130\uC5D0 \uC788\uB294 \uC18C\uB9AC \uD30C\uC77C\uC744\n\uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8\uD574\uC11C \uAC00\uC838\uC635\uB2C8\uB2E4.',
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
        undefined,
    'length': // lists.js:492 lists.js:703
        '\uAE38\uC774',
    'table view': // lists.js:807
        undefined,
    'open in dialog': // lists.js:810 tables.js:1036
        undefined,
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
        undefined,
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
        '(\uACF5\uB780)',
    'Are you sure you want to leave?': // morphic.js:12110
        undefined,
    'demo': // morphic.js:12173
        undefined,
    'sample morphs': // morphic.js:12173
        undefined,
    'hide all': // morphic.js:12175
        undefined,
    'show all': // morphic.js:12176 objects.js:7423
        '\uBAA8\uB4E0 \uC2A4\uD504\uB77C\uC774\uD2B8 \uB098\uD0C0\uB0B4\uAE30',
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
        undefined,
    'box': // morphic.js:12270
        undefined,
    'circle box': // morphic.js:12273
        undefined,
    'slider': // morphic.js:12277 objects.js:9461
        '\uC2AC\uB77C\uC774\uB354',
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
        '\uB3D9\uC791',
    'Control': // objects.js:147
        '\uC81C\uC5B4',
    'Looks': // objects.js:148
        '\uD615\uD0DC',
    'Sensing': // objects.js:149
        '\uAD00\uCC30',
    'Sound': // objects.js:150 objects.js:8570
        '\uC18C\uB9AC',
    'Operators': // objects.js:151
        '\uC5F0\uC0B0',
    'Pen': // objects.js:152
        '\uD39C',
    'Lists': // objects.js:154
        '\uB9AC\uC2A4\uD2B8',
    'Other': // objects.js:155
        '\uAE30\uD0C0',
    'move %n steps': // objects.js:201
        '%n \uB9CC\uD07C \uC6C0\uC9C1\uC774\uAE30',
    'turn %clockwise %n degrees': // objects.js:208
        '%clockwise %n \uB3C4 \uB3CC\uAE30',
    'turn %counterclockwise %n degrees': // objects.js:215
        '%counterclockwise %n \uB3C4 \uB3CC\uAE30',
    'point in direction %dir': // objects.js:222
        '%dir \uB3C4 \uBC29\uD5A5 \uBCF4\uAE30',
    'point towards %dst': // objects.js:228
        '%dst \uCABD \uBCF4\uAE30',
    'go to x: %n y: %n': // objects.js:234
        'x: %n \u3001y: %n \uCABD\uC73C\uB85C \uC774\uB3D9\uD558\uAE30',
    'go to %dst': // objects.js:241
        '%dst \uC704\uCE58\uB85C \uC774\uB3D9\uD558\uAE30',
    'glide %n secs to x: %n y: %n': // objects.js:247
        '%n \uCD08 \uB3D9\uC548 x: %n \u3001y: %n \uCABD\uC73C\uB85C \uC774\uB3D9\uD558\uAE30',
    'change x by %n': // objects.js:254
        'x\uC88C\uD45C %n \uB9CC\uD07C \uBC14\uAFB8\uAE30',
    'set x to %n': // objects.js:261
        'x\uC88C\uD45C %n (\uC73C)\uB85C \uC815\uD558\uAE30',
    'change y by %n': // objects.js:268
        'y\uC88C\uD45C %n \uB9CC\uD07C \uBC14\uAFB8\uAE30',
    'set y to %n': // objects.js:275
        'y\uC88C\uD45C %n (\uC73C)\uB85C \uC815\uD558\uAE30',
    'if on edge, bounce': // objects.js:282
        '\uBCBD\uC5D0 \uB2FF\uC73C\uBA74 \uD295\uAE30\uAE30',
    'switch to costume %cst': // objects.js:307
        '\uBAA8\uC591 %cst \uB85C \uBC14\uAFB8\uAE30',
    'next costume': // objects.js:312
        '\uB2E4\uC74C \uBAA8\uC591',
    'say %s for %n secs': // objects.js:323
        '%s \uC744(\uB97C) %n \uCD08 \uB3D9\uC548 \uB9D0\uD558\uAE30',
    'Hello!': // objects.js:324 objects.js:331
        '\uC548\uB155!',
    'say %s': // objects.js:330
        '%s \uB9D0\uD558\uAE30',
    'think %s for %n secs': // objects.js:337
        '%s \uC744(\uB97C) %n \uCD08 \uB3D9\uC548 \uC0DD\uAC01\uD558\uAE30',
    'Hmm': // objects.js:338 objects.js:345
        '\uD760',
    'think %s': // objects.js:344
        '%s \uC0DD\uAC01\uD558\uAE30',
    'change %eff effect by %n': // objects.js:350
        '%eff \uD6A8\uACFC\uB97C %n \uB9CC\uD07C \uBC14\uAFB8\uAE30',
    'set %eff effect to %n': // objects.js:356
        '%eff \uD6A8\uACFC\uB97C %n \uB9CC\uD07C \uC815\uD558\uAE30',
    'clear graphic effects': // objects.js:362
        '\uADF8\uB798\uD53D \uD6A8\uACFC \uC9C0\uC6B0\uAE30',
    'change size by %n': // objects.js:368
        '\uD06C\uAE30\uB97C %n \uB9CC\uD07C \uBC14\uAFB8\uAE30',
    'set size to %n %': // objects.js:375
        '\uD06C\uAE30\uB97C %n % \uB85C \uC815\uD558\uAE30',
    'go to front': // objects.js:400
        '\uB9E8 \uC55E\uC73C\uB85C \uB098\uC624\uAE30',
    'go back %n layers': // objects.js:406
        '%n \uBC88\uC9F8\uB85C \uBB3C\uB7EC\uB098\uAE30',
    'save %imgsource as costume named %s': // objects.js:412
        undefined,
    'wardrobe': // objects.js:421
        undefined,
    'alert %mult%s': // objects.js:428
        '\uACBD\uACE0: %mult%s',
    'console log %mult%s': // objects.js:434
        '\uCF58\uC194 \uB85C\uADF8 %mult%s',
    'play sound %snd': // objects.js:441
        '%snd \uC18C\uB9AC\uB0B4\uAE30',
    'play sound %snd until done': // objects.js:446
        '%snd \uC744(\uB97C) \uB05D\uAE4C\uC9C0 \uC18C\uB9AC\uB0B4\uAE30',
    'stop all sounds': // objects.js:451
        '\uBAA8\uB4E0 \uC18C\uB9AC \uB044\uAE30',
    'rest for %n beats': // objects.js:456
        '%n \uBC15\uC790 \uB3D9\uC548 \uC26C\uAE30',
    'play note %note for %n beats': // objects.js:462
        undefined,
    'set instrument to %inst': // objects.js:468
        undefined,
    'change tempo by %n': // objects.js:474
        '\uBE60\uB974\uAE30\uB97C %n \uB9CC\uD07C \uBC14\uAFB8\uAE30',
    'set tempo to %n bpm': // objects.js:480
        '\uBE60\uB974\uAE30\uB97C %n bpm\uC73C\uB85C \uC815\uD558\uAE30',
    'tempo': // objects.js:486
        '\uBE60\uB974\uAE30',
    'jukebox': // objects.js:494
        undefined,
    'clear': // objects.js:501 paint.js:230
        '\uD39C \uC790\uAD6D \uC9C0\uC6B0\uAE30',
    'pen down': // objects.js:507
        '\uD39C \uB0B4\uB9AC\uAE30',
    'pen up': // objects.js:513
        '\uD39C \uC62C\uB9AC\uAE30',
    'set pen color to %clr': // objects.js:519
        '\uD39C \uC0C9\uAE54\uC744 %clr \uC73C\uB85C \uC815\uD558\uAE30',
    'change pen color by %n': // objects.js:525
        '\uD39C \uC0C9\uAE54\uC744 %n \uB9CC\uD07C \uBC14\uAFB8\uAE30',
    'set pen color to %n': // objects.js:532
        '\uD39C \uC0C9\uAE54\uC744 %n (\uC73C)\uB85C \uC815\uD558\uAE30',
    'change pen shade by %n': // objects.js:539
        '\uD39C \uC74C\uC601\uC744 %n \uB9CC\uD07C \uBC14\uAFB8\uAE30',
    'set pen shade to %n': // objects.js:546
        '\uD39C \uC74C\uC601\uC744 %n \uC73C\uB85C \uC815\uD558\uAE30',
    'change pen size by %n': // objects.js:553
        '\uD39C \uAD75\uAE30\uB97C %n \uB9CC\uD07C \uBC14\uAFB8\uAE30',
    'set pen size to %n': // objects.js:560
        '\uD39C \uAD75\uAE30\uB97C %n (\uC73C)\uB85C \uC815\uD558\uAE30',
    'stamp': // objects.js:567
        '\uB3C4\uC7A5\uCC0D\uAE30',
    'fill': // objects.js:573
        undefined,
    'when %greenflag clicked': // objects.js:585
        '%greenflag \uD074\uB9AD\uD588\uC744 \uB54C',
    'when %keyHat key pressed': // objects.js:590
        '%keyHat \uD0A4\uB97C \uB20C\uB800\uC744 \uB54C',
    'when I am %interaction': // objects.js:595
        undefined,
    'when I receive %msgHat': // objects.js:601
        '%msgHat \uC744(\uB97C) \uBC1B\uC558\uC744 \uB54C',
    'when %b': // objects.js:606
        undefined,
    'broadcast %msg': // objects.js:611
        '%msg \uBC29\uC1A1\uD558\uAE30',
    'broadcast %msg and wait': // objects.js:616
        '%msg \uBC29\uC1A1\uD558\uACE0 \uAE30\uB2E4\uB9AC\uAE30',
    'message': // objects.js:621
        '\uBA54\uC2DC\uC9C0',
    'wait %n secs': // objects.js:626
        '%n \uCD08 \uAE30\uB2E4\uB9AC\uAE30',
    'wait until %b': // objects.js:632
        '%b \uAE4C\uC9C0 \uAE30\uB2E4\uB9AC\uAE30',
    'forever %c': // objects.js:637
        '\uBB34\uD55C \uBC18\uBCF5\uD558\uAE30 %c',
    'repeat %n %c': // objects.js:642
        '%n \uBC88 \uBC18\uBCF5\uD558\uAE30 %c',
    'repeat until %b %c': // objects.js:648
        '%b \uAE4C\uC9C0 \uBC18\uBCF5\uD558\uAE30 %c',
    'if %b %c': // objects.js:653
        '\uB9CC\uC57D %b \uB77C\uBA74 %c',
    'if %b %c else %c': // objects.js:658
        '\uB9CC\uC57D %b \uB77C\uBA74 %c \uC544\uB2C8\uBA74 %c',
    'stop %stopChoices': // objects.js:678
        '%stopChoices \uBA48\uCD94\uAE30',
    'run %cmdRing %inputs': // objects.js:693
        '%cmdRing \uC744(\uB97C) %inputs \uC73C\uB85C \uC2E4\uD589\uD558\uAE30',
    'launch %cmdRing %inputs': // objects.js:698
        '%cmdRing \uC744(\uB97C) %inputs \uC73C\uB85C \uB3D9\uC2DC\uC2E4\uD589\uD558\uAE30',
    'call %repRing %inputs': // objects.js:703
        '%repRing \uC744(\uB97C) %inputs \uC73C\uB85C \uD638\uCD9C\uD558\uAE30',
    'report %s': // objects.js:708
        '%s \uCD9C\uB825\uD558\uAE30',
    'run %cmdRing w/continuation': // objects.js:720
        '\uBC18\uBCF5\uD574\uC11C %cmdRing \uC744(\uB97C) \uC2E4\uD589\uD558\uAE30',
    'call %cmdRing w/continuation': // objects.js:725
        '\uBC18\uBCF5\uD574\uC11C %cmdRing \uC744(\uB97C) \uD638\uCD9C\uD558\uAE30',
    'warp %c': // objects.js:730
        '\uC6CC\uD504 %c',
    'tell %spr to %cmdRing %inputs': // objects.js:739
        undefined,
    'ask %spr for %repRing %inputs': // objects.js:744
        undefined,
    'when I start as a clone': // objects.js:752
        '\uBCF5\uC81C\uB418\uC5C8\uC744 \uB54C',
    'create a clone of %cln': // objects.js:757
        '%cln \uC744(\uB97C) \uBCF5\uC81C\uD558\uAE30',
    'a new clone of %cln': // objects.js:762
        undefined,
    'delete this clone': // objects.js:768
        '\uC774 \uBCF5\uC81C\uBCF8 \uC0AD\uC81C\uD558\uAE30',
    'pause all %pause': // objects.js:776
        '\uBAA8\uB450 \uC7A0\uC2DC \uBA48\uCD94\uAE30 %pause',
    'touching %col ?': // objects.js:785
        '%col \uC5D0 \uB2FF\uC558\uB294\uAC00?',
    'touching %clr ?': // objects.js:791
        '%clr \uC0C9\uC5D0 \uB2FF\uC558\uB294\uAC00?',
    'color %clr is touching %clr ?': // objects.js:797
        '%clr \uC0C9\uC774 %clr \uC0C9\uC5D0 \uB2FF\uC558\uB294\uAC00?',
    'filtered for %clr': // objects.js:803
        '%clr \uC0C9 \uCD94\uCD9C\uD558\uAE30',
    'stack size': // objects.js:809
        '\uC2A4\uD0DD \uD06C\uAE30',
    'frames': // objects.js:815
        '\uD504\uB808\uC784',
    'processes': // objects.js:821
        undefined,
    'ask %s and wait': // objects.js:826
        '%s \uC744(\uB97C) \uBB3B\uACE0 \uAE30\uB2E4\uB9AC\uAE30',
    'what\'s your name?': // objects.js:827
        '\uB2F9\uC2E0\uC758 \uC774\uB984\uC740?',
    'answer': // objects.js:833 objects.js:838
        '\uB300\uB2F5',
    'mouse x': // objects.js:843
        '\uB9C8\uC6B0\uC2A4\uC758 x\uC88C\uD45C',
    'mouse y': // objects.js:848
        '\uB9C8\uC6B0\uC2A4\uC758 y\uC88C\uD45C',
    'mouse down?': // objects.js:853
        '\uB9C8\uC6B0\uC2A4\uB97C \uD074\uB9AD\uD588\uB294\uAC00?',
    'key %key pressed?': // objects.js:858
        '%key \uD0A4\uB97C \uB20C\uB800\uB294\uAC00?',
    '%rel to %dst': // objects.js:871
        undefined,
    'reset timer': // objects.js:877
        '\uD0C0\uC774\uBA38 \uCD08\uAE30\uD654',
    'timer': // objects.js:883 objects.js:888
        '\uD0C0\uC774\uBA38',
    '%att of %spr': // objects.js:893
        '%att ( %spr \uC5D0 \uB300\uD55C)',
    'url %s': // objects.js:899
        undefined,
    'turbo mode?': // objects.js:905
        '\uD130\uBCF4 \uBAA8\uB4DC\uC778\uAC00?',
    'set turbo mode to %b': // objects.js:910
        '\uD130\uBCF4 \uBAA8\uB4DC %b \uC73C\uB85C \uC124\uC815\uD558\uAE30',
    'current %dates': // objects.js:915
        '\uD604\uC7AC %dates',
    'my %get': // objects.js:920
        undefined,
    'round %n': // objects.js:968
        '%n \uBC18\uC62C\uB9BC',
    '%fun of %n': // objects.js:973
        '%fun ( %n \uC5D0 \uB300\uD55C)',
    '%n mod %n': // objects.js:979
        '( %n / %n ) \uC758 \uB098\uBA38\uC9C0',
    'pick random %n to %n': // objects.js:984
        '%n \uBD80\uD130 %n \uC0AC\uC774\uC758 \uB09C\uC218',
    '%b and %b': // objects.js:1005
        '%b \uADF8\uB9AC\uACE0 %b',
    '%b or %b': // objects.js:1010
        '%b \uB610\uB294 %b',
    'not %b': // objects.js:1015
        '%b \uC774(\uAC00) \uC544\uB2C8\uB2E4',
    'join %words': // objects.js:1033
        '%words \uACB0\uD569\uD558\uAE30',
    'hello': // objects.js:1034 objects.js:1075
        '\uC548\uB155',
    'world': // objects.js:1034 objects.js:1040 objects.js:1046 objects.js:1075
        '\uC138\uC0C1',
    'letter %n of %s': // objects.js:1039
        '%n \uBC88\uC9F8 \uAE00\uC790 ( %s \uC5D0 \uB300\uD55C)',
    'length of %s': // objects.js:1045
        '%s \uC758 \uAE38\uC774',
    'unicode of %s': // objects.js:1051
        '%s \uC758 \uC720\uB2C8\uCF54\uB4DC',
    'unicode %n as letter': // objects.js:1057
        '\uC720\uB2C8\uCF54\uB4DC %n \uC5D0 \uB300\uD55C \uBB38\uC790',
    'is %s a %typ ?': // objects.js:1063
        '%s \uC774(\uAC00) %typ \uC778\uAC00?',
    'is %s identical to %s ?': // objects.js:1069
        '%s \uC640(\uACFC) %s \uAC00 \uB3D9\uC77C\uD55C\uAC00?',
    'split %s by %delim': // objects.js:1074
        '%s \uB97C %delim \uAE30\uC900\uC73C\uB85C \uB098\uB204\uAE30',
    'JavaScript function ( %mult%s ) { %code }': // objects.js:1080
        undefined,
    'type of %s': // objects.js:1086
        '%s \uC758 \uD0C0\uC785',
    '%txtfun of %s': // objects.js:1093
        undefined,
    'compile %repRing': // objects.js:1099
        undefined,
    'set %var to %s': // objects.js:1119
        '\uBCC0\uC218 %var \uC5D0 %s \uC800\uC7A5\uD558\uAE30',
    'change %var by %n': // objects.js:1125
        '\uBCC0\uC218 %var \uC744(\uB97C) %n \uB9CC\uD07C \uBC14\uAFB8\uAE30',
    'show variable %var': // objects.js:1131
        '\uBCC0\uC218 %var \uBCF4\uC774\uAE30',
    'hide variable %var': // objects.js:1136
        '\uBCC0\uC218 %var \uC228\uAE30\uAE30',
    'script variables %scriptVars': // objects.js:1141
        '\uC2A4\uD06C\uB9BD\uD2B8 \uBCC0\uC218 %scriptVars',
    'inherit %shd': // objects.js:1148
        undefined,
    'list %exp': // objects.js:1155
        '\uB9AC\uC2A4\uD2B8 %exp',
    '%s in front of %l': // objects.js:1160
        '%s \uC744(\uB97C) \uB9AC\uC2A4\uD2B8 %l \uC758 \uB9E8 \uC55E\uC5D0 \uCD94\uAC00\uD558\uAE30',
    'item %idx of %l': // objects.js:1165
        '%idx \uBC88\uC9F8 \uD56D\uBAA9 (\uB9AC\uC2A4\uD2B8 %l \uC5D0 \uB300\uD55C)',
    'all but first of %l': // objects.js:1171
        '\uB9AC\uC2A4\uD2B8 %l \uC5D0\uC11C \uCCAB \uBC88\uC9F8 \uD56D\uBAA9 \uC81C\uC678\uD558\uAE30',
    'length of %l': // objects.js:1176
        '\uB9AC\uC2A4\uD2B8 %l \uC758 \uD56D\uBAA9 \uAC2F\uC218',
    '%l contains %s': // objects.js:1181
        '\uB9AC\uC2A4\uD2B8 %l \uC5D0 %s \uD3EC\uD568\uB418\uC5C8\uB294\uAC00?',
    'thing': // objects.js:1182 objects.js:1188 objects.js:1200 objects.js:1206
        '\uC5B4\uB5A4 \uAC83',
    'add %s to %l': // objects.js:1187
        '%s \uC744(\uB97C) \uB9AC\uC2A4\uD2B8 %l \uC758 \uB9C8\uC9C0\uB9C9\uC5D0 \uCD94\uAC00\uD558\uAE30',
    'delete %ida of %l': // objects.js:1193
        '%ida \uBC88\uC9F8 \uD56D\uBAA9 \uC0AD\uC81C\uD558\uAE30 (\uB9AC\uC2A4\uD2B8 %l \uC5D0 \uB300\uD55C)',
    'insert %s at %idx of %l': // objects.js:1199
        '%s \uC744(\uB97C) %idx \uC704\uCE58\uC5D0 \uCD94\uAC00\uD558\uAE30 (\uB9AC\uC2A4\uD2B8 %l \uC5D0 \uB300\uD55C)',
    'replace item %idx of %l with %s': // objects.js:1205
        '%idx \uBC88\uC9F8 (\uB9AC\uC2A4\uD2B8 %l \uC5D0 \uB300\uD55C) \uB97C %s (\uC73C)\uB85C \uBC14\uAFB8\uAE30',
    'map %repRing over %l': // objects.js:1214
        undefined,
    'for %upvar in %l %cl': // objects.js:1220
        undefined,
    'each item': // objects.js:1221
        undefined,
    'show table %l': // objects.js:1230
        undefined,
    'map %cmdRing to %codeKind %code': // objects.js:1237
        undefined,
    'map %mapValue to code %code': // objects.js:1242
        undefined,
    'map %codeListPart of %codeListKind to code %code': // objects.js:1256
        undefined,
    'code of %cmdRing': // objects.js:1261
        undefined,
    'Sprite': // objects.js:1404
        '\uC2A4\uD504\uB77C\uC774\uD2B8',
    'that name is already in use': // objects.js:1859 objects.js:7047
        undefined,
    'development mode\ndebugging primitives': // objects.js:1932 objects.js:2089 objects.js:2155 objects.js:2268 objects.js:7085 objects.js:7214 objects.js:7280 objects.js:7376
        '\uAC1C\uBC1C\uC790 \uBAA8\uB4DC\n\uB514\uBC84\uAE45 \uD504\uB9AC\uBBF8\uD2F0\uBE0C',
    'Make a variable': // objects.js:2184 objects.js:7309
        '\uBCC0\uC218 \uB9CC\uB4E4\uAE30',
    'Delete a variable': // objects.js:2205 objects.js:7327
        '\uBCC0\uC218 \uC0AD\uC81C\uD558\uAE30',
    'find blocks': // objects.js:2398 objects.js:2469
        '\uBE14\uB85D \uCC3E\uAE30',
    'hide primitives': // objects.js:2476
        '\uAE30\uBCF8 \uBE14\uB85D \uC228\uAE30\uAE30',
    'show primitives': // objects.js:2494
        '\uAE30\uBCF8 \uBE14\uB85D \uBCF4\uC774\uAE30',
    'rotate': // objects.js:3244
        undefined,
    'pivot': // objects.js:3247
        undefined,
    'edit the costume\'s\nrotation center': // objects.js:3249
        undefined,
    'make permanent and\nshow in the sprite corral': // objects.js:3257
        undefined,
    'exceeding maximum number of clones': // objects.js:3355
        undefined,
    'Costume': // objects.js:4338
        undefined,
    'setting the rotation center requires a costume': // objects.js:4679
        undefined,
    'current parent': // objects.js:5420
        undefined,
    'Stage': // objects.js:6315
        '\uBB34\uB300',
    'stop': // objects.js:6770 costumes/COSTUMES:486
        undefined,
    'terminate all running threads': // objects.js:6774
        undefined,
    'Stage selected:\nno motion primitives': // objects.js:7060
        '\uBB34\uB300 \uC120\uD0DD: \uC0AC\uC6A9 \uAC00\uB2A5\uD55C \uB3D9\uC791 \uBE14\uB85D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.',
    'turn all pen trails and stamps\ninto a new costume for the\ncurrently selected sprite': // objects.js:7445
        undefined,
    'turn all pen trails and stamps\ninto a new background for the stage': // objects.js:7447
        undefined,
    'Background': // objects.js:7817
        undefined,
    'a {{ className }}({{ name }})': // objects.js:8096
        undefined,
    'click or drag crosshairs to move the rotation center': // objects.js:8296
        '\uD074\uB9AD \uB610\uB294 \uB4DC\uB798\uADF8 \uD574\uC11C \uD68C\uC804 \uC911\uC2EC \uC124\uC815\uD558\uAE30',
    'Costume Editor': // objects.js:8308
        '\uBAA8\uC591 \uD3B8\uC9D1\uAE30',
    'an {{ className }}({{ name }})': // objects.js:8395
        undefined,
    'Web Audio API is not supported\nin this browser': // objects.js:8629
        undefined,
    'normal': // objects.js:9452
        '\uBCF4\uD1B5 \uC77D\uAE30',
    'large': // objects.js:9456
        '\uD06C\uAC8C \uBCF4\uAE30',
    'slider min': // objects.js:9466
        '\uC2AC\uB77C\uC774\uB354 \uCD5C\uC18C\uAC12 \uC124\uC815',
    'slider max': // objects.js:9470
        '\uC2AC\uB77C\uC774\uB354 \uCD5C\uB300\uAC12 \uC124\uC815',
    'import': // objects.js:9475
        undefined,
    'Unable to import': // objects.js:9501
        undefined,
    '{{ appName }} can only import "text" files.\nYou selected a file of type "{{ type }}".': // objects.js:9502
        undefined,
    'Slider minimum value': // objects.js:9588
        '\uC2AC\uB77C\uC774\uB354 \uCD5C\uC18C\uAC12 \uC124\uC815',
    'Slider maximum value': // objects.js:9604
        '\uC2AC\uB77C\uC774\uB354 \uCD5C\uB300\uAC12 \uC124\uC815',
    'Paint Editor': // paint.js:111
        '\uADF8\uB9BC \uD3B8\uC9D1\uAE30',
    'Paintbrush tool\n(free draw)': // paint.js:172
        '\uBD93 \uB3C4\uAD6C',
    'Stroked Rectangle\n(shift: square)': // paint.js:174
        '\uC0AC\uAC01\uD615 \uADF8\uB9AC\uAE30 \uB3C4\uAD6C\n(shift: \uC815\uC0AC\uAC01\uD615)',
    'Stroked Ellipse\n(shift: circle)': // paint.js:176
        '\uD0C0\uC6D0 \uADF8\uB9AC\uAE30 \uB3C4\uAD6C\n(shift: \uC6D0)',
    'Eraser tool': // paint.js:178
        '\uC9C0\uC6B0\uAC1C \uB3C4\uAD6C',
    'Set the rotation center': // paint.js:180
        '\uD68C\uC804\uCD95 \uC124\uC815\uD558\uAE30',
    'Line tool\n(shift: vertical/horizontal)': // paint.js:183
        '\uC120 \uADF8\uB9AC\uAE30 \uB3C4\uAD6C\n(shift: \uC218\uD3C9/\uC218\uC9C1)',
    'Filled Rectangle\n(shift: square)': // paint.js:185
        '\uCC44\uC6CC\uC9C4 \uC0AC\uAC01\uD615 \uADF8\uB9AC\uAE30 \uB3C4\uAD6C\n(shift: \uC815\uC0AC\uAC01\uD615)',
    'Filled Ellipse\n(shift: circle)': // paint.js:187
        '\uCC44\uC6CC\uC9C4 \uD0C0\uC6D0 \uADF8\uB9AC\uAE30 \uB3C4\uAD6C\n(shift: \uC6D0)',
    'Fill a region': // paint.js:189
        '\uC0C9 \uCC44\uC6B0\uAE30',
    'Pipette tool\n(pick a color anywhere)': // paint.js:191
        '\uC2A4\uD3EC\uC774\uB4DC \uB3C4\uAD6C\n(\uC6D0\uD558\uB294 \uC0C9 \uC120\uD0DD\uD558\uAE30)',
    'undo': // paint.js:225
        '\uB418\uB3CC\uB9AC\uAE30',
    'grow': // paint.js:239
        '\uD655\uB300',
    'shrink': // paint.js:243
        '\uCD95\uC18C',
    'flip \u2194': // paint.js:247
        '\u2194 \uBC18\uC804',
    'flip \u2195': // paint.js:251
        '\u2195 \uBC18\uC804',
    'Constrain proportions of shapes?\n(you can also hold shift)': // paint.js:407
        '\uB3C4\uD615 \uD06C\uAE30 \uBE44\uC728\uC744 \uACE0\uC815\uD558\uB294\uAC00?\n(shift \uD0A4\uB97C \uB20C\uB7EC\uC11C \uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.)',
    'Brush size': // paint.js:413
        '\uD39C \uD06C\uAE30',
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
        undefined,
    'pointRight': // symbols.js:86
        undefined,
    'stepForward': // symbols.js:87
        undefined,
    'gears': // symbols.js:88
        undefined,
    'file': // symbols.js:89
        undefined,
    'fullScreen': // symbols.js:90
        undefined,
    'normalScreen': // symbols.js:91
        undefined,
    'smallStage': // symbols.js:92
        undefined,
    'normalStage': // symbols.js:93
        undefined,
    'turtle': // symbols.js:94
        undefined,
    'turtleOutline': // symbols.js:96
        undefined,
    'pause': // symbols.js:97
        undefined,
    'flag': // symbols.js:98
        undefined,
    'octagon': // symbols.js:99
        undefined,
    'cloud': // symbols.js:100 costumes/COSTUMES:170
        undefined,
    'cloudOutline': // symbols.js:101
        undefined,
    'cloudGradient': // symbols.js:102
        undefined,
    'turnRight': // symbols.js:103
        undefined,
    'turnLeft': // symbols.js:104
        undefined,
    'storage': // symbols.js:105
        undefined,
    'poster': // symbols.js:106
        undefined,
    'flash': // symbols.js:107
        undefined,
    'brush': // symbols.js:108
        undefined,
    'rectangleSolid': // symbols.js:110
        undefined,
    'circle': // symbols.js:111
        undefined,
    'circleSolid': // symbols.js:112
        undefined,
    'cross': // symbols.js:114
        undefined,
    'crosshairs': // symbols.js:115
        undefined,
    'paintbucket': // symbols.js:116
        undefined,
    'eraser': // symbols.js:117
        undefined,
    'pipette': // symbols.js:118
        undefined,
    'speechBubble': // symbols.js:119
        undefined,
    'speechBubbleOutline': // symbols.js:120
        undefined,
    'turnBack': // symbols.js:121
        undefined,
    'turnForward': // symbols.js:122
        undefined,
    'arrowUp': // symbols.js:123
        undefined,
    'arrowUpOutline': // symbols.js:124
        undefined,
    'arrowLeft': // symbols.js:125
        undefined,
    'arrowLeftOutline': // symbols.js:126
        undefined,
    'arrowDown': // symbols.js:127
        undefined,
    'arrowDownOutline': // symbols.js:128
        undefined,
    'arrowRight': // symbols.js:129
        undefined,
    'arrowRightOutline': // symbols.js:130
        undefined,
    'robot': // symbols.js:131
        undefined,
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
        undefined,
    'open in another dialog': // tables.js:1027
        undefined,
    'list view': // tables.js:1034
        undefined,
    'Table view': // tables.js:1186
        undefined,
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
        '\uC608',
    'No': // widgets.js:1608
        '\uC544\uB2C8\uC624',
    'Default': // widgets.js:1882
        '\uAE30\uBCF8\uC124\uC815',
    '{{ year }} or before': // widgets.js:2024
        undefined,
    'User name': // widgets.js:2054 widgets.js:2059 widgets.js:2092
        undefined,
    'Birth date': // widgets.js:2061
        undefined,
    'Password': // widgets.js:2071 widgets.js:2078
        undefined,
    'Repeat Password': // widgets.js:2073
        undefined,
    'Old password': // widgets.js:2083
        undefined,
    'New password': // widgets.js:2085
        undefined,
    'Repeat new password': // widgets.js:2087
        undefined,
    'please fill out\nthis field': // widgets.js:2196
        undefined,
    'User name must be four\ncharacters or longer': // widgets.js:2201
        undefined,
    'please provide a valid\nemail address': // widgets.js:2206
        undefined,
    'password must be six\ncharacters or longer': // widgets.js:2212
        undefined,
    'passwords do\nnot match': // widgets.js:2216
        undefined,
    'please agree to\nthe TOS': // widgets.js:2222
        undefined,
    'E-mail address of parent or guardian': // widgets.js:2258
        undefined,
    'E-mail address': // widgets.js:2259
        undefined,
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
};

// ✂ - - - - - - - - - - - - - - - - -  -   -
// The following are strings that were used once by Snap! but not anymore
// (or just mispelled strings)
// Feel free to delete or keep them for future references
SnapTranslator.dict.ko.deprecated = {
    'play note %n for %n beats':
        '%n \uC74C\uC744 %n \uBC15\uC790\uB85C \uC5F0\uC8FC\uD558\uAE30',
    'when I am clicked':
        '\uC774 \uC2A4\uD504\uB77C\uC774\uD2B8\uB97C \uD074\uB9AD\uD588\uC744 \uB54C',
    'stop %stopOthersChoices':
        '%stopOthersChoices \uBA48\uCD94\uAE30',
    'distance to %dst':
        '%dst \uAE4C\uC9C0 \uAC70\uB9AC',
    'http:// %s':
        'http:// %s',
    'Snap! website':
        'Snap! \uC6F9\uC0AC\uC774\uD2B8',
    'Save to disk':
        '\uB0B4 \uCEF4\uD4E8\uD130\uC5D0 \uC800\uC7A5\uD558\uAE30',
    'experimental - store this project\nin your downloads folder':
        '\uC2E4\uD5D8\uC801 - \uC774 \uD504\uB85C\uC81D\uD2B8\uB97C\n\uB2E4\uC6B4\uB85C\uB4DC \uD3F4\uB354\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4.',
    'Select categories of additional blocks to add to this project.':
        '\uCD94\uAC00\uC801\uC778 \uBE14\uB85D\uC744 \uC120\uD0DD\uD574\uC11C\n\uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.',
    'url':
        'url',
    'export project media only':
        'export project media only',
    'export project without media':
        'export project without media',
    'export project as cloud data':
        'export project as cloud data',
    'open shared project from cloud':
        'open shared project from cloud',
    'Ok':
        '\uD655\uC778',
    'Open Projekt':
        '\uD504\uB85C\uC81D\uD2B8 \uC5F4\uAE30',
    'Save Project As':
        '\uD504\uB85C\uC81D\uD2B8 \uC800\uC7A5',
    'Single input.':
        '\uB2E8\uC77C \uC785\uB825',
    '(180) right':
        '(180) \uC544\uB798',
    'new':
        '\uC0C8\uB85C \uB9CC\uB4E4\uAE30',
    'Saved!':
        '\uC800\uC7A5\uD588\uC2B5\uB2C8\uB2E4!',
    'Are you sure you want to delete':
        '\uC815\uB9D0\uB85C \uC0AD\uC81C\uD569\uB2C8\uAE4C?',
};
