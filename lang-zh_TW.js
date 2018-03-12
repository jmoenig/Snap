/*

    lang-zh_TW.js

    Traditional Chinese translation for Snap!

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
SnapTranslator.dict.zh_TW = {
    metadata: {
        'name': // the name as it should appear in the language menu
            '\u7E41\u9AD4\u4E2D\u6587',
        'english_name': // the english name of the language
            'Traditional Chinese',
        'translators': [ // translators authors for the Translators tab
            'cch <cchuang2009@gmail.com>'
        ],
        'last_changed': // this, too, will appear in the Translators tab
            '2013-8-14',
    },
    strings: {},
};
// ✂ - - - - - - - - - - - - - - - - -  -   -

SnapTranslator.dict.zh_TW.strings = {
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
        '\u756B\u7B46\u8ECC\u8DE1',
    'stage image': // blocks.js:821
        undefined,
    'with inputs': // blocks.js:831
        '\u53C3\u6578',
    'block variables': // blocks.js:840 byob.js:1053
        undefined,
    'Input Names': // blocks.js:844
        '\u53C3\u6578\u540D',
    'input names': // blocks.js:850
        '\u53C3\u6578\u540D',
    'Input name': // blocks.js:902 blocks.js:5344
        '\u53C3\u6578\u540D',
    '(90) right': // blocks.js:935 morphic.js:4888
        '(90) \u53F3',
    '(-90) left': // blocks.js:936 morphic.js:4889
        '(-90) \u5DE6',
    '(0) up': // blocks.js:937 morphic.js:4890
        '(0) \u4E0A',
    '(180) down': // blocks.js:938 morphic.js:4891
        '(180) \u4E0B',
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
        undefined,
    'month': // blocks.js:1005
        undefined,
    'date': // blocks.js:1006
        undefined,
    'day of week': // blocks.js:1007
        undefined,
    'hour': // blocks.js:1008
        undefined,
    'minute': // blocks.js:1009
        undefined,
    'second': // blocks.js:1010
        undefined,
    'time in milliseconds': // blocks.js:1011
        undefined,
    'letter': // blocks.js:1021
        undefined,
    'whitespace': // blocks.js:1022
        undefined,
    'line': // blocks.js:1023 symbols.js:113
        undefined,
    'tab': // blocks.js:1024
        undefined,
    'cr': // blocks.js:1025
        undefined,
    'csv': // blocks.js:1026
        undefined,
    'last': // blocks.js:1036 blocks.js:1048
        '\u6700\u5F8C',
    'all': // blocks.js:1038 blocks.js:1265 byob.js:3874
        '\u5168\u90E8',
    'any': // blocks.js:1049
        '\u4EFB\u610F',
    'distance': // blocks.js:1058
        undefined,
    'direction': // blocks.js:1059 blocks.js:2483 blocks.js:8556 objects.js:300
        '\u65B9\u5411',
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
        '\u8907\u88FD',
    'negative': // blocks.js:1123
        undefined,
    'comic': // blocks.js:1124
        undefined,
    'confetti': // blocks.js:1125
        undefined,
    'saturation': // blocks.js:1126
        undefined,
    'brightness': // blocks.js:1127
        undefined,
    'ghost': // blocks.js:1128
        '\u9B3C\u5F71',
    'any key': // blocks.js:1146
        undefined,
    'up arrow': // blocks.js:1147
        '\u4E0A\u79FB\u9375',
    'down arrow': // blocks.js:1148
        '\u4E0B\u79FB\u9375',
    'right arrow': // blocks.js:1149
        '\u53F3\u79FB\u9375',
    'left arrow': // blocks.js:1150
        '\u5DE6\u79FB\u9375',
    'space': // blocks.js:1151
        '\u7A7A\u767D\u9375',
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
        'abs',
    'ceiling': // blocks.js:1227 morphic.js:7085 morphic.js:7088
        undefined,
    'floor': // blocks.js:1228 morphic.js:7069 morphic.js:7072
        undefined,
    'sqrt': // blocks.js:1229
        'sqrt',
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
        undefined,
    'this block': // blocks.js:1267
        undefined,
    'all but this script': // blocks.js:1268
        undefined,
    'other scripts in sprite': // blocks.js:1269
        undefined,
    'String': // blocks.js:1290
        undefined,
    'Number': // blocks.js:1291 byob.js:3286
        '\u6578\u5B57',
    'true': // blocks.js:1292 blocks.js:9529 blocks.js:9919 objects.js:2979
        '\u6210\u7ACB',
    'false': // blocks.js:1293 blocks.js:9544 blocks.js:9930 objects.js:2979
        '\u4E0D\u6210\u7ACB',
    'code': // blocks.js:1334
        undefined,
    'header': // blocks.js:1335
        undefined,
    'list': // blocks.js:1408 blocks.js:8487
        '\u8868\u5217',
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
        '\u7121\u6A19\u984C',
    '{{ projectName }} script pic': // blocks.js:1993 blocks.js:2602 blocks.js:6441 byob.js:1035
        undefined,
    'script target cannot be found for orphaned block': // blocks.js:2203
        undefined,
    'a {{ className }} ("{{ value }}...")': // blocks.js:2207 morphic.js:8466 morphic.js:9146
        undefined,
    'Variable name': // blocks.js:2377 blocks.js:3262 objects.js:2179 objects.js:7304
        '\u8B8A\u6578\u540D',
    'help': // blocks.js:2386 objects.js:1851 objects.js:2308
        '\u8AAC\u660E',
    'script pic with result': // blocks.js:2393
        undefined,
    'open a new window\nwith a picture of both\nthis script and its result': // blocks.js:2397
        undefined,
    'rename': // blocks.js:2409 blocks.js:2458 blocks.js:2521 gui.js:7708 gui.js:8409 morphic.js:7656
        '\u91CD\u547D\u540D\u70BA',
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
        '\u96B1\u85CF',
    'x position': // blocks.js:2481 blocks.js:8554 objects.js:288
        'x \u5EA7\u6A19',
    'y position': // blocks.js:2482 blocks.js:8555 objects.js:294
        'y \u5EA7\u6A19',
    'size': // blocks.js:2484 blocks.js:8559 objects.js:382
        '\u5927\u5C0F',
    'costume #': // blocks.js:2485 blocks.js:8557 blocks.js:8561 objects.js:317
        '\u9020\u578B\u7DE8\u865F',
    'header mapping': // blocks.js:2507 blocks.js:2677
        undefined,
    'code mapping': // blocks.js:2511 blocks.js:2681
        undefined,
    'relabel': // blocks.js:2527 blocks.js:2538
        '\u91CD\u65B0\u6A19\u8A18',
    'make a copy\nand pick it up': // blocks.js:2564 blocks.js:11908 morphic.js:4171
        '\u5275\u5EFA\u4E00\u500B\u526F\u672C\u4E26\u6293\u8D77',
    'only duplicate this block': // blocks.js:2586
        '\u53EA\u8907\u88FD\u6B64\u584A',
    'delete': // blocks.js:2590 blocks.js:11910 gui.js:7372 gui.js:7711 gui.js:8410 morphic.js:4215 objects.js:3242
        '\u522A\u9664',
    'script pic': // blocks.js:2594 byob.js:1030
        '\u5C07\u8173\u672C\u5B58\u70BA\u5716\u50CF',
    'open a new window\nwith a picture of this script': // blocks.js:2608 byob.js:1041
        '\u65B0\u6D41\u89BD\u8996\u7A97\u4E2D\u6253\u958B\u8173\u672C\u7684\u5716\u7247',
    'download script': // blocks.js:2612
        undefined,
    '{{ name }} script': // blocks.js:2622
        undefined,
    'download this script\nas an XML file': // blocks.js:2627
        undefined,
    'unringify': // blocks.js:2657
        '\u522A\u9664\u74B0',
    'ringify': // blocks.js:2661 blocks.js:2673
        '\u74B0',
    'delete block': // blocks.js:2691
        undefined,
    'spec': // blocks.js:2692 blocks.js:2699
        undefined,
    'Help': // blocks.js:2980 blocks.js:2997
        '\u8AAC\u660E',
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
        undefined,
    'undo the last\nblock drop\nin this pane': // blocks.js:6324
        undefined,
    'redrop': // blocks.js:6335 blocks.js:6722
        undefined,
    'redo the last undone\nblock drop\nin this pane': // blocks.js:6339
        undefined,
    'clear undrop queue': // blocks.js:6345
        undefined,
    'forget recorded block drops\non this pane': // blocks.js:6351
        undefined,
    'clean up': // blocks.js:6359
        '\u6E05\u9664',
    'arrange scripts\nvertically': // blocks.js:6359
        '\u6574\u7406\u8173\u672C\uFF0C\u5782\u76F4\u6392\u5217',
    'add comment': // blocks.js:6360
        '\u6DFB\u52A0\u6CE8\u91CB',
    'scripts pic': // blocks.js:6362
        undefined,
    'open a new window\nwith a picture of all scripts': // blocks.js:6364
        undefined,
    'make a block': // blocks.js:6380
        '\u5275\u5EFA\u7A0B\u5F0F\u584A',
    'Make a block': // blocks.js:6398 objects.js:2303 objects.js:2352 objects.js:2411
        '\u65B0\u5EFA\u7A0B\u5F0F\u584A',
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
        '\u8CC7\u8A0A\u540D\u7A31',
    'any message': // blocks.js:8360
        undefined,
    'mouse-pointer': // blocks.js:8391 blocks.js:8420
        '\u6ED1\u9F20\u6307\u6A19',
    'edge': // blocks.js:8392
        '\u908A\u7DE3',
    'random position': // blocks.js:8418
        undefined,
    'myself': // blocks.js:8445
        '\u81EA\u8EAB',
    'number': // blocks.js:8484
        '\u6578\u5B57',
    'text': // blocks.js:8485 morphic.js:12305
        '\u6587\u5B57',
    'Boolean': // blocks.js:8486
        '\u5E03\u6797\u503C',
    'sprite': // blocks.js:8490
        undefined,
    'costume': // blocks.js:8492 objects.js:3069
        undefined,
    'sound': // blocks.js:8493
        undefined,
    'command': // blocks.js:8494
        '\u547D\u4EE4',
    'reporter': // blocks.js:8495
        '\u8A18\u9304',
    'predicate': // blocks.js:8496
        '\u8B02\u8A9E',
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
        '\u6D77\u9F9C',
    'Empty': // blocks.js:8584 gui.js:7941 objects.js:3166 threads.js:3350
        undefined,
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
        '\u8F38\u5165\u5217\u8868',
    'add comment here': // blocks.js:11762
        '\u5728\u9019\u88CF\u6DFB\u52A0\u6CE8\u91CB',
    'comment pic': // blocks.js:11912
        undefined,
    '{{ projectName }} comment pic': // blocks.js:11917
        undefined,
    'open a new window\nwith a picture of this comment': // blocks.js:11923
        undefined,
    'Change block': // byob.js:885
        '\u4FEE\u6539\u7A0B\u5F0F\u584A',
    '{{ varName }} (temporary)': // byob.js:1011 objects.js:9431 threads.js:1670
        undefined,
    'translations': // byob.js:1044
        undefined,
    'experimental': // byob.js:1048 byob.js:1057 byob.js:1065
        undefined,
    'under construction': // byob.js:1048 byob.js:1057 byob.js:1065
        undefined,
    'remove block variables': // byob.js:1061
        undefined,
    'duplicate block definition': // byob.js:1079
        undefined,
    'delete block definition': // byob.js:1089 byob.js:1133 byob.js:1147
        '\u522A\u9664\u81EA\u5B9A\u7FA9\u7A0B\u5F0F\u584A',
    'edit': // byob.js:1157 gui.js:7699 morphic.js:8730 morphic.js:9477 objects.js:3255 objects.js:3261 objects.js:7422
        '\u7DE8\u8F2F',
    'Delete Custom Block': // byob.js:1228
        '\u522A\u9664\u81EA\u5B9A\u7FA9\u7A0B\u5F0F\u584A',
    'Are you sure you want to delete this\ncustom block and all its instances?': // byob.js:1229
        '\u4F60\u78BA\u5B9A\u8981\u522A\u9664\u81EA\u5B9A\u7FA9\u7A0B\u5F0F\u584A\u53CA\u6240\u6709\u5BE6\u4F8B\u55CE\uFF1F',
    'OK': // byob.js:1648 byob.js:2117 byob.js:3237 byob.js:3848 gui.js:3713 morphic.js:3958 morphic.js:4028 morphic.js:4054 objects.js:8312 paint.js:161 tables.js:1212 widgets.js:1574 widgets.js:1708 widgets.js:1791 widgets.js:1874 widgets.js:2155 widgets.js:2434
        '\u78BA\u5B9A',
    'Cancel': // byob.js:1649 byob.js:2120 byob.js:3243 byob.js:3849 gui.js:3371 gui.js:3714 gui.js:5941 gui.js:6843 gui.js:8996 gui.js:9134 morphic.js:4031 morphic.js:4057 objects.js:8313 paint.js:162 widgets.js:1709 widgets.js:1792 widgets.js:1887 widgets.js:2156
        '\u53D6\u6D88',
    'Command': // byob.js:1770
        '\u547D\u4EE4',
    'Reporter': // byob.js:1779 byob.js:3290
        '\u8A18\u9304',
    'Predicate': // byob.js:1788 byob.js:3291
        '\u8B02\u8A9E',
    'for all sprites': // byob.js:1850 byob.js:3662
        '\u5C0D\u6240\u6709\u7684\u89D2\u8272',
    'for this sprite only': // byob.js:1855 byob.js:3667
        '\u53EA\u5C0D\u9019\u500B\u89D2\u8272',
    'Block Editor': // byob.js:2065
        '\u7A0B\u5F0F\u584A\u7DE8\u8F2F\u5668',
    'Method Editor': // byob.js:2066
        undefined,
    'Apply': // byob.js:2119
        '\u61C9\u7528',
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
        '\u7DE8\u8F2F\u6A19\u7C64\u7247\u6BB5',
    'Create input name': // byob.js:2754
        '\u5275\u5EFA\u53C3\u6578\u540D',
    'Edit input name': // byob.js:2755
        '\u7DE8\u8F2F\u53C3\u6578\u540D',
    'new line': // byob.js:2800 byob.js:3266
        undefined,
    'Title text': // byob.js:3061
        '\u6A19\u984C\u6587\u672C',
    'Delete': // byob.js:3239 gui.js:5940
        '\u522A\u9664',
    'Object': // byob.js:3283
        '\u5C0D\u8C61',
    'Text': // byob.js:3284
        '\u6587\u672C',
    'List': // byob.js:3285
        '\u93C8\u8868',
    'Any type': // byob.js:3287
        '\u6240\u6709\u985E\u578B',
    'Boolean (T/F)': // byob.js:3288
        '\u5E03\u6797\u503C\uFF08\u662F/\u5426\uFF09',
    'Command\n(inline)': // byob.js:3289
        '\u547D\u4EE4\uFF08\u5167\u7F6E\uFF09',
    'Command\n(C-shape)': // byob.js:3292
        '\u547D\u4EE4(C\u578B)',
    'Any\n(unevaluated)': // byob.js:3293
        '\u4EFB\u610F(\u672A\u8A55\u50F9)',
    'Boolean\n(unevaluated)': // byob.js:3294
        '\u5E03\u6797\uFF08\u8A55\u50F9\uFF09',
    'Single input': // byob.js:3299
        '\u55AE\u4E00\u53C3\u6578',
    'Multiple inputs (value is list of inputs)': // byob.js:3304
        '\u591A\u884C\u8F38\u5165\uFF08\u503C\u70BA\u53C3\u6578\u5217\u8868\uFF09',
    'Upvar - make internal variable visible to caller': // byob.js:3309
        '\u4E0A\u50B3\u8B8A\u6578 - \u4F7F\u5167\u90E8\u8B8A\u6578\u5C0D\u8ABF\u7528\u8005\u53EF\u898B',
    'Default Value': // byob.js:3314
        '\u9810\u8A2D\u503C',
    'options': // byob.js:3570
        undefined,
    'read-only': // byob.js:3573
        undefined,
    'Input Slot Options': // byob.js:3593
        undefined,
    'Enter one option per line.\nOptionally use "=" as key/value delimiter and {} for submenus. e.g.\n   the answer=42': // byob.js:3597
        undefined,
    'Export blocks': // byob.js:3776 byob.js:3914 gui.js:3187 gui.js:3835
        '\u5C0E\u51FA\u7A0B\u5F0F\u584A',
    'select': // byob.js:3873
        '\u9078\u64C7',
    'none': // byob.js:3875 objects.js:5421 objects.js:5427
        '\u7121',
    '{{ projectName }} blocks': // byob.js:3910
        undefined,
    'no blocks were selected': // byob.js:3915 byob.js:4009 byob.js:4102
        undefined,
    'Import blocks': // byob.js:3962 byob.js:3963 byob.js:4008
        '\u5C0E\u5165\u7A0B\u5F0F\u584A',
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
        '\u958B\u767C\u6A21\u5F0F',
    'don\'t rotate': // gui.js:1222
        '\u4E0D\u80FD\u65CB\u8F49',
    'can rotate': // gui.js:1223
        '\u53EF\u4EE5\u65CB\u8F49',
    'only face left/right': // gui.js:1224
        '\u53EA\u80FD\u5DE6\u53F3\u7FFB\u8F49',
    'draggable': // gui.js:1329
        '\u53EF\u62D6\u52D5',
    'Scripts': // gui.js:1371 gui.js:4179
        '\u8173\u672C',
    'Costumes': // gui.js:1391 gui.js:3252 gui.js:3255 gui.js:4156
        '\u9020\u578B',
    'Backgrounds': // gui.js:1392 gui.js:3252 gui.js:3255
        undefined,
    'Sounds': // gui.js:1411 gui.js:3262 gui.js:3264 gui.js:4167
        '\u8072\u97F3',
    'add a new Turtle sprite': // gui.js:1545
        undefined,
    'paint a new sprite': // gui.js:1567
        undefined,
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
        '\u95DC\u65BCSnap!',
    'Reference manual': // gui.js:2474
        '\u53C3\u8003\u624B\u518A',
    '{{ site }} website': // gui.js:2481
        '{{ site }}\u5B98\u65B9\u7DB2\u7AD9',
    'Download source': // gui.js:2487
        '\u4E0B\u8F09\u6E90\u78BC',
    'Switch back to user mode': // gui.js:2498
        '\u5207\u63DB\u5230\u4F7F\u7528\u8005\u6A21\u5F0F',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones': // gui.js:2500
        '\u505C\u7528 \u8B8A\u5F62\u8A9E\u5F0F\n\u5FEB\u986F\u529F\u80FD\u8868\n\n\u8207\u975E\n\u53CB\u597D\u4F7F\u7528\u8005\u4ECB\u9762',
    'Switch to dev mode': // gui.js:2507
        '\u5207\u63DB\u5230\u958B\u767C\u4EBA\u54E1\u6A21\u5F0F',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!': // gui.js:2509
        '\u555F\u7528 \u6B63\u5E38\u8A9E\u5F0F\n\u5FEB\u986F\u529F\u80FD\u8868\n\u8207\u975E\u6AA2\u67E5\n\u53CB\u597D\u4F7F\u7528\u8005\u4ECB\u9762',
    'Cloud URL': // gui.js:2527 gui.js:5654
        undefined,
    'Login': // gui.js:2536
        '\u767B\u9304',
    'Signup': // gui.js:2540
        '\u8A3B\u518A',
    'Reset Password': // gui.js:2544
        undefined,
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
        '\u8A9E\u8A00\u9078\u64C7',
    'Generate {{ filename }} file': // gui.js:2679 gui.js:5035
        undefined,
    'builds the {{ language }} translation file': // gui.js:2684
        undefined,
    'Zoom blocks': // gui.js:2692 gui.js:5120
        '\u653E\u5927\u7A0B\u5F0F\u584A',
    'Stage size': // gui.js:2696 gui.js:5163
        undefined,
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
        '\u8F38\u5165\u6ED1\u584A',
    'uncheck to disable\ninput sliders for\nentry fields': // gui.js:2736
        '\u53D6\u6D88\u9078\u4E2D \u7981\u7528\u8F38\u5165\u6ED1\u584A\u3001\u8F38\u5165\u6B04\u4F4D',
    'check to enable\ninput sliders for\nentry fields': // gui.js:2737
        '\u6AA2\u67E5 \u4F7F\u7528\u8F38\u5165\u6ED1\u584A\u3001\u8F38\u5165\u6B04\u4F4D',
    'Execute on slider change': // gui.js:2741
        undefined,
    'uncheck to suppress\nrunning scripts\nwhen moving the slider': // gui.js:2744
        undefined,
    'check to run\nthe edited script\nwhen moving the slider': // gui.js:2745
        undefined,
    'Turbo mode': // gui.js:2749
        'Turbo\u6A21\u5F0F',
    'uncheck to run scripts\nat normal speed': // gui.js:2752
        '\u53D6\u6D88\u9078\u4E2D\u6B63\u5E38\u901F\u5EA6\u904B\u884C\u8173\u672C',
    'check to prioritize\nscript execution': // gui.js:2753
        '\u6AA2\u67E5\u7684\u512A\u5148\u57F7\u884C\u8173\u672C\u9806\u5E8F',
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
        '\u534A\u900F\u660E\u9670\u5F71',
    'uncheck to use solid drop\nshadows and highlights': // gui.js:2787
        '\u53D6\u6D88\u9078\u4E2D \u964D\u4F4E\u9670\u5F71\u548C\u9AD8\u4EAE\u7684\u6E05\u6670\u5EA6',
    'check to use blurred drop\nshadows and highlights': // gui.js:2788
        '\u6AA2\u6E2C \u964D\u4F4E\u9670\u5F71\u548C\u9AD8\u4EAE\u7684\u6A21\u7CCA\u5EA6',
    'Zebra coloring': // gui.js:2792
        '\u6591\u99AC\u8457\u8272',
    'uncheck to disable alternating\ncolors for nested block': // gui.js:2795
        '\u53D6\u6D88\u9078\u4E2D \u4F7F\u5D4C\u5957\u584A\u7684\u984F\u8272\u4EA4\u63DB',
    'check to enable alternating\ncolors for nested blocks': // gui.js:2796
        '\u6AA2\u6E2C \u4F7F\u5D4C\u5957\u584A\u7684\u984F\u8272\u4EA4\u63DB',
    'Dynamic input labels': // gui.js:2800
        '\u52D5\u614B\u8F38\u5165\u6A19\u7C64',
    'uncheck to disable dynamic\nlabels for variadic inputs': // gui.js:2803
        '\u53D6\u6D88\u9078\u4E2D\u8981\u7981\u7528\u52D5\u614B\u53EF\u8B8A\u53C3\u6578\u8F38\u5165\u6A19\u7C64',
    'check to enable dynamic\nlabels for variadic inputs': // gui.js:2804
        undefined,
    'Prefer empty slot drops': // gui.js:2808
        '\u559C\u6B61\u6E1B\u5C11\u7A7A\u69FD',
    'uncheck to allow dropped\nreporters to kick out others': // gui.js:2811
        '\u53D6\u6D88\u9078\u4E2D \u5141\u8A31\u4E0B\u964D\u5831\u544A\u4E26\u53D6\u6D88\u5176\u4ED6\u5831\u544A',
    'check to focus on empty slots\nwhen dragging & dropping reporters': // gui.js:2812
        '\u559C\u6B61\u7A7A\u69FD\u8A2D\u7F6E\u83DC\u55AE',
    'Long form input dialog': // gui.js:2816
        '\u9577\u5F62\u5F0F\u8F38\u5165\u5C0D\u8A71\u65B9\u584A',
    'uncheck to use the input\ndialog in short form': // gui.js:2819
        '\u53D6\u6D88\u9078\u64C7 \u8F38\u5165\u7A97\u4E26\u986F\u793A\u7C21\u6F54\u5C0D\u8A71\u65B9\u584A',
    'check to always show slot\ntypes in the input dialog': // gui.js:2820
        '\u6AA2\u67E5\u986F\u793A\u63D2\u69FD\u5728\u8F38\u5165\u5C0D\u8A71\u65B9\u584A\u4E2D\u7684\u985E\u578B',
    'Plain prototype labels': // gui.js:2823
        undefined,
    'uncheck to always show (+) symbols\nin block prototype labels': // gui.js:2826
        undefined,
    'check to hide (+) symbols\nin block prototype labels': // gui.js:2827
        undefined,
    'Virtual keyboard': // gui.js:2830
        '\u865B\u64EC\u9375\u76E4',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices': // gui.js:2833
        '\u53D6\u6D88\u9078\u4E2D \u7981\u7528\u865B\u64EC\u9375\u76E4\u3001\u53EF\u79FB\u52D5\u8A2D\u5099',
    'check to enable\nvirtual keyboard support\nfor mobile devices': // gui.js:2834
        '\u6AA2\u67E5 \u4F7F\u7528\u865B\u64EC\u9375\u3001\u53EF\u79FB\u52D5\u8A2D\u5099',
    'Clicking sound': // gui.js:2838
        '\u9EDE\u64CA\u8072\u97F3',
    'uncheck to turn\nblock clicking\nsound off': // gui.js:2848
        '\u53D6\u6D88\u9078\u4E2D \u95DC\u9589\u9EDE\u64CA\u7A0B\u5F0F\u584A\u7684\u8072\u97F3',
    'check to turn\nblock clicking\nsound on': // gui.js:2849
        '\u6AA2\u67E5 \u95DC\u9589\u9EDE\u64CA\u7A0B\u5F0F\u584A\u7684\u8072\u97F3',
    'Animations': // gui.js:2852
        '\u52D5\u756B',
    'uncheck to disable\nIDE animations': // gui.js:2855
        '\u53D6\u6D88\u9078\u4E2D\u7981\u7528IDE\u52D5\u756B',
    'check to enable\nIDE animations': // gui.js:2856
        '\u6AA2\u67E5\u555F\u7528IDE\u52D5\u756B',
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
        undefined,
    'uncheck for default\nGUI design': // gui.js:2890
        undefined,
    'check for alternative\nGUI design': // gui.js:2891
        undefined,
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
        undefined,
    'uncheck to disable\nsprite composition': // gui.js:2932
        undefined,
    'check to enable\nsprite composition': // gui.js:2933
        undefined,
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
        '\u7DDA\u7A0B\u5B89\u5168\u7684\u8173\u672C',
    'uncheck to allow\nscript reentrance': // gui.js:3035
        '\u53D6\u6D88\u9078\u4E2D \u5141\u8A31\u8173\u672C\u91CD\u65B0\u8F09\u5165',
    'check to disallow\nscript reentrance': // gui.js:3036
        '\u6AA2\u67E5 \u4E0D\u5141\u8A31\u8173\u672C\u91CD\u65B0\u8F09\u5165',
    'Prefer smooth animations': // gui.js:3039
        '\u4E0D\u6D41\u66A2\u7684\u52D5\u756B',
    'uncheck for greater speed\nat variable frame rates': // gui.js:3042
        '\u53D6\u6D88\u9078\u4E2D\u5728\u53EF\u8B8A\u5E40\u983B\u66F4\u5FEB\u7684\u901F\u5EA6',
    'check for smooth, predictable\nanimations across computers': // gui.js:3043
        '\u6AA2\u67E5\u662F\u5426\u5E73\u6ED1\uFF0C\u53EF\u9810\u898B\u7684\u591A\u53F0\u96FB\u8166\u52D5\u756B',
    'Flat line ends': // gui.js:3047
        undefined,
    'uncheck for round ends of lines': // gui.js:3053
        undefined,
    'check for flat ends of lines': // gui.js:3054
        undefined,
    'Codification support': // gui.js:3057
        undefined,
    'uncheck to disable\nblock to text mapping features': // gui.js:3066
        undefined,
    'check for block\nto text mapping features': // gui.js:3067
        undefined,
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
        '\u5C08\u6848\u8AAA\u660E',
    'New': // gui.js:3109
        '\u65B0\u5EFA',
    'Open': // gui.js:3110 gui.js:5924
        '\u6253\u958B',
    'Save': // gui.js:3111 gui.js:5927 gui.js:8995 gui.js:9133
        '\u5B58',
    'Save As': // gui.js:3112
        '\u53E6\u5B58\u70BA',
    'Import': // gui.js:3115 gui.js:3370 gui.js:6842
        '\u5C0E\u5165',
    'load an exported project file\nor block library, a costume\nor a sound': // gui.js:3146
        '\u7576\u4F60\u62D6\u52D5\u5230\u7CFB\u7D71\uFF0C\u6CE8\u610F\u67E5\u770B\u6AA2\u67E5\u5831\u544A\n\u8981\u6CE8\u610F\u6AA2\u67E5\u5831\u544A\u70BA\u7A7A\n\n\u6709\u4E00\u4E9B\u6D41\u89BD\u5668\u4E0D\u652F\u6301\u9019\u4E00\u529F\u80FD',
    'Export project (in a new window)': // gui.js:3153
        undefined,
    'show project data as XML\nin a new browser window': // gui.js:3164
        '\u65B0\u700F\u89BD\u8996\u7A97\u4EE5XML\u683C\u5F0F\u986F\u793A\u5C08\u6848',
    'Export project as plain text': // gui.js:3170
        '\u7D14\u6587\u672C\u683C\u5F0F\u5C0E\u51FA\u5C08\u6848',
    'Export project': // gui.js:3171
        '\u5C0E\u51FA\u9805\u76EE',
    'save project data as XML\nto your downloads folder': // gui.js:3181
        undefined,
    'show global custom block definitions as XML\nin a new browser window': // gui.js:3189
        '\u65B0\u700F\u89BD\u8996\u7A97\u4EE5XML\u683C\u5F0F\u986F\u793A\u5168\u5C40\u81EA\u5B9A\u7FA9\u7A0B\u5F0F\u584A',
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
        undefined,
    'show a picture of all scripts\nand block definitions': // gui.js:3219
        undefined,
    'Import tools': // gui.js:3226
        '\u5C0E\u5165\u5DE5\u5177\u5305',
    'load the official library of\npowerful blocks': // gui.js:3235
        '\u8F09\u5165\u5B98\u65B9\u5EAB\u548C\u5F37\u5927\u7684\u7A0B\u5F0F\u584A',
    'Libraries': // gui.js:3238
        undefined,
    'select categories of additional blocks to add to this project': // gui.js:3248
        undefined,
    'Select a costume from the media library': // gui.js:3259
        undefined,
    'Select a sound from the media library': // gui.js:3266
        undefined,
    'Opening {{ resource }}': // gui.js:3341
        undefined,
    'License': // gui.js:3529 gui.js:3630
        '\u7248\u6B0A',
    'Contributors': // gui.js:3548
        '\u8CA2\u737B\u8005',
    'current module versions': // gui.js:3574
        '\u76EE\u524D\u6A21\u7D44\u7248\u672C',
    'Translations': // gui.js:3578
        '\u7FFB\u8B6F\u8005',
    'About Snap': // gui.js:3581
        '\u95DC\u65BC Snap',
    'Translators': // gui.js:3597
        '\u7FFB\u8B6F\u8005',
    'Back': // gui.js:3613
        '\u8FD4\u56DE',
    'Modules': // gui.js:3646
        '\u6A21\u7D44',
    'Credits': // gui.js:3662
        '\u5149\u69AE\u699C',
    'Project Notes': // gui.js:3709
        '\u9805\u76EE\u6CE8\u91CB',
    'Saving': // gui.js:3770
        undefined,
    'Saved': // gui.js:3788 gui.js:3796
        '\u5DF2\u4FDD\u5B58',
    'Save failed': // gui.js:3790
        undefined,
    'Exporting': // gui.js:3811 gui.js:5464 gui.js:5493 gui.js:5503 gui.js:5521 gui.js:5533
        undefined,
    'Exported': // gui.js:3816 gui.js:5471 gui.js:5497 gui.js:5507 gui.js:5527 gui.js:5539
        undefined,
    'Export failed': // gui.js:3819 gui.js:5475 gui.js:5500 gui.js:5530
        undefined,
    'this project doesn\'t have any\ncustom global blocks yet': // gui.js:3836
        '\u9019\u500B\u9805\u76EE\u6C92\u6709\u5305\u542B\u5168\u5C40\u6027\u7684\u81EA\u5B9A\u7FA9\u7A0B\u5F0F\u584A',
    'there are currently no unused\nglobal custom blocks in this project': // gui.js:3873
        undefined,
    'Untitled': // gui.js:3937 gui.js:8190 store.js:368 store.js:1651
        '\u7121\u6A19\u984C',
    'Variables': // gui.js:3968 objects.js:153
        '\u8B8A\u6578',
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
        '\u4F60\u8981\u53D6\u6D88\u7576\u524D\u7DE8\u8F2F\u7684\u5C08\u6848\uFF0C\u91CD\u65B0\u5EFA\u7ACB\u5C08\u6848\u55CE\uFF1F',
    'New Project': // gui.js:4915
        '\u65B0\u5EFA\u9805\u76EE',
    'Generating {{ filename }} file': // gui.js:5011
        undefined,
    'Could not generate the language file': // gui.js:5039
        undefined,
    'build': // gui.js:5057
        '\u5EFA\u7ACB',
    'your own': // gui.js:5060
        '\u4F60\u81EA\u5DF1',
    'blocks': // gui.js:5064
        '\u7A0B\u5F0F\u584A',
    'normal (1x)': // gui.js:5106
        '\u6A19\u6E96 (1x)',
    'demo (1.2x)': // gui.js:5107
        '\u6F14\u793A (1.2x)',
    'presentation (1.4x)': // gui.js:5108
        '\u6F14\u793A\u6587\u7A3F (1.4x)',
    'big (2x)': // gui.js:5109
        '\u5927(2x)',
    'huge (4x)': // gui.js:5110
        '\u8D85\u5927\u578B (4x)',
    'giant (8x)': // gui.js:5111
        '\u5DE8\u4EBA\u578B (8x)',
    'monstrous (10x)': // gui.js:5112
        '\u7121\u6575\u578B (10x)',
    'Stage width': // gui.js:5166
        undefined,
    'Stage height': // gui.js:5167
        undefined,
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
        '\u6253\u958B\u5C08\u6848',
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
        '\u78BA\u5B9A\u8981\u522A\u9664\u55CE\uFF1F\n"{{ projectName }}"?',
    'Delete Project': // gui.js:6500 gui.js:6524
        '\u522A\u9664\u9805\u76EE',
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
        undefined,
    'Loading {{ resource }}': // gui.js:6926 gui.js:7059
        undefined,
    'Imported {{ resource }}': // gui.js:7054
        undefined,
    'pic': // gui.js:7353 morphic.js:4194 objects.js:7425
        '\u5C0E\u51FA\u5716\u50CF',
    'open a new window\nwith a picture of the stage': // gui.js:7361 objects.js:7432
        '\u6253\u958B\u4E00\u5F35\u5716\u7247\u821E\u81FA\u7684\u65B0\u8996\u7A97\uFF0C',
    'show': // gui.js:7366 morphic.js:7568 objects.js:388
        '\u986F\u793A',
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
        '\u5C0E\u51FA',
    'edit rotation point only': // gui.js:7702
        undefined,
    'rename costume': // gui.js:7755
        '\u91CD\u547D\u540D\u9020\u578B',
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
        undefined,
    'Import a new costume from your webcam': // gui.js:8110
        undefined,
    'import a picture from another web page or from\na file on your computer by dropping it here': // gui.js:8134
        '\u9020\u578B\u9078\u5361\u5E6B\u52A9\n\u8981\u4F7F\u7528\u53E6\u5916\u7DB2\u7AD9\u4E0A\u7684\u5716\u7247\u6216\u96FB\u8166\u4E2D\u7684\u5716\u50CF\u53EA\u9700\u62D6\u5230\u5716\u50CF\u5230\u9019\u88CF\u5373\u53EF',
    'Stop': // gui.js:8345 gui.js:8367
        '\u505C\u6B62',
    'Play': // gui.js:8345 gui.js:8375
        '\u64AD\u653E',
    'Play sound': // gui.js:8348 gui.js:8376
        '\u64AD\u653E\u8072\u97F3',
    'Stop sound': // gui.js:8368
        '\u505C\u6B62\u8072\u97F3',
    'rename sound': // gui.js:8432
        '\u91CD\u547D\u540D\u8072\u97F3',
    'import a sound from your computer\nby dragging it into here': // gui.js:8526
        '\u5F9E\u96FB\u8166\u4E2D\u5C0E\u5165\u97F3\u6548\u6A94\u6848\n\u53EA\u9700\u62D6\u52D5\u97F3\u6548\u6A94\u6848\u5230\u9019\u88CF\u5373\u53EF',
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
        '\u9577\u5EA6',
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
        '(\u7A7A)',
    'Are you sure you want to leave?': // morphic.js:12110
        undefined,
    'demo': // morphic.js:12173
        undefined,
    'sample morphs': // morphic.js:12173
        undefined,
    'hide all': // morphic.js:12175
        undefined,
    'show all': // morphic.js:12176 objects.js:7423
        '\u986F\u793A\u6240\u6709',
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
        '\u6ED1\u584A',
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
        '\u52D5\u4F5C',
    'Control': // objects.js:147
        '\u63A7\u5236',
    'Looks': // objects.js:148
        '\u5916\u89C0',
    'Sensing': // objects.js:149
        '\u5075\u6E2C',
    'Sound': // objects.js:150 objects.js:8570
        '\u8072\u97F3',
    'Operators': // objects.js:151
        '\u904B\u7B97',
    'Pen': // objects.js:152
        '\u756B\u7B46',
    'Lists': // objects.js:154
        '\u93C8\u8868',
    'Other': // objects.js:155
        '\u5176\u4ED6',
    'move %n steps': // objects.js:201
        '\u79FB\u52D5 %n \u6B69',
    'turn %clockwise %n degrees': // objects.js:208
        '\u9806\u6642\u9418\u65CB\u8F49 %clockwise %n \u5EA6',
    'turn %counterclockwise %n degrees': // objects.js:215
        '\u9006\u6642\u9418\u65CB\u8F49 %counterclockwise %n \u5EA6',
    'point in direction %dir': // objects.js:222
        '\u9762\u5411 %dir \u5EA6',
    'point towards %dst': // objects.js:228
        '\u9762\u5411 %dst',
    'go to x: %n y: %n': // objects.js:234
        '\u79FB\u5230 x: %n y: %n',
    'go to %dst': // objects.js:241
        '\u79FB\u5230 %dst',
    'glide %n secs to x: %n y: %n': // objects.js:247
        '%n \u79D2\u5167\uFF0C\u79FB\u5230 x: %n y: %n',
    'change x by %n': // objects.js:254
        '\u589E\u52A0 x \u5EA7\u6A19 %n',
    'set x to %n': // objects.js:261
        '\u8A2D\u5B9A x \u5EA7\u6A19\u70BA %n',
    'change y by %n': // objects.js:268
        '\u589E\u52A0 y \u5EA7\u6A19 %n',
    'set y to %n': // objects.js:275
        '\u8A2D\u5B9A y \u5EA7\u6A19\u70BA %n',
    'if on edge, bounce': // objects.js:282
        '\u78B0\u5230\u908A\u7DE3\u5C31\u53CD\u5F48',
    'switch to costume %cst': // objects.js:307
        '\u5207\u63DB\u5230\u9020\u578B %cst',
    'next costume': // objects.js:312
        '\u4E0B\u4E00\u500B\u9020\u578B',
    'say %s for %n secs': // objects.js:323
        '\u8AAA %s %n \u79D2',
    'Hello!': // objects.js:324 objects.js:331
        '\u4F60\u597D\uFF01',
    'say %s': // objects.js:330
        '\u8AAA %s',
    'think %s for %n secs': // objects.js:337
        '\u601D\u8003 %s %n \u79D2',
    'Hmm': // objects.js:338 objects.js:345
        '\u55EF',
    'think %s': // objects.js:344
        '\u601D\u8003 %s',
    'change %eff effect by %n': // objects.js:350
        '\u5C07 %eff \u7279\u6548\u589E\u52A0 %n',
    'set %eff effect to %n': // objects.js:356
        '\u5C07 %eff \u7279\u6548\u8A2D\u5B9A\u70BA %n',
    'clear graphic effects': // objects.js:362
        '\u6E05\u9664\u6240\u6709\u5716\u5F62\u7279\u6548',
    'change size by %n': // objects.js:368
        '\u589E\u52A0\u89D2\u8272\u7684\u5927\u5C0F %n',
    'set size to %n %': // objects.js:375
        '\u8A2D\u5B9A\u89D2\u8272\u7684\u5927\u5C0F\u70BA %n',
    'go to front': // objects.js:400
        '\u79FB\u81F3\u6700\u4E0A\u5C64',
    'go back %n layers': // objects.js:406
        '\u4E0B\u79FB %n \u5C64',
    'save %imgsource as costume named %s': // objects.js:412
        undefined,
    'wardrobe': // objects.js:421
        undefined,
    'alert %mult%s': // objects.js:428
        '\u8B66\u544A: %mult%s',
    'console log %mult%s': // objects.js:434
        '\u63A7\u5236\u81FA\u65E5\u8A8C %mult%s',
    'play sound %snd': // objects.js:441
        '\u64AD\u653E\u8072\u97F3 %snd',
    'play sound %snd until done': // objects.js:446
        '\u64AD\u653E\u8072\u97F3 %snd \u76F4\u5230\u64AD\u653E\u5B8C\u7562',
    'stop all sounds': // objects.js:451
        '\u505C\u6B62\u6240\u6709\u8072\u97F3',
    'rest for %n beats': // objects.js:456
        '\u505C\u6B62 %n \u79D2',
    'play note %note for %n beats': // objects.js:462
        undefined,
    'set instrument to %inst': // objects.js:468
        undefined,
    'change tempo by %n': // objects.js:474
        '\u52A0\u5FEB\u7BC0\u594F %n',
    'set tempo to %n bpm': // objects.js:480
        '\u8A2D\u5B9A\u7BC0\u594F\u70BA %n',
    'tempo': // objects.js:486
        '\u7BC0\u594F',
    'jukebox': // objects.js:494
        undefined,
    'clear': // objects.js:501 paint.js:230
        '\u6E05\u9664\u6240\u6709\u756B\u7B46',
    'pen down': // objects.js:507
        '\u843D\u7B46',
    'pen up': // objects.js:513
        '\u62AC\u7B46',
    'set pen color to %clr': // objects.js:519
        '\u8A2D\u5B9A\u756B\u7B46\u984F\u8272\u70BA %clr',
    'change pen color by %n': // objects.js:525
        '\u589E\u52A0\u756B\u7B46\u984F\u8272\u503C %n',
    'set pen color to %n': // objects.js:532
        '\u8A2D\u5B9A\u756B\u7B46\u984F\u8272\u503C\u70BA %n',
    'change pen shade by %n': // objects.js:539
        '\u589E\u52A0\u756B\u7B46\u8272\u5EA6 %n',
    'set pen shade to %n': // objects.js:546
        '\u8A2D\u5B9A\u756B\u7B46\u8272\u5EA6\u70BA %n',
    'change pen size by %n': // objects.js:553
        '\u589E\u52A0\u756B\u7B46\u7C97\u7D30 %n',
    'set pen size to %n': // objects.js:560
        '\u8A2D\u5B9A\u756B\u7B46\u7684\u7C97\u7D30\u70BA %n',
    'stamp': // objects.js:567
        '\u5716\u7AE0',
    'fill': // objects.js:573
        undefined,
    'when %greenflag clicked': // objects.js:585
        '\u7576 %greenflag \u88AB\u9EDE\u64CA',
    'when %keyHat key pressed': // objects.js:590
        '\u7576\u6309\u4E0B %keyHat',
    'when I am %interaction': // objects.js:595
        undefined,
    'when I receive %msgHat': // objects.js:601
        '\u7576\u63A5\u6536\u5230 %msgHat',
    'when %b': // objects.js:606
        undefined,
    'broadcast %msg': // objects.js:611
        '\u5EE3\u64AD %msg',
    'broadcast %msg and wait': // objects.js:616
        '\u5EE3\u64AD %msg \u4E26\u7B49\u5F85',
    'message': // objects.js:621
        undefined,
    'wait %n secs': // objects.js:626
        '\u7B49\u5F85 %n \u79D2',
    'wait until %b': // objects.js:632
        '\u76F4\u5230 %b \u524D\u90FD\u7B49\u5F85\u95D0',
    'forever %c': // objects.js:637
        '\u91CD\u8907\u57F7\u884C %c',
    'repeat %n %c': // objects.js:642
        '\u91CD\u8907\u57F7\u884C %n %c',
    'repeat until %b %c': // objects.js:648
        '\u91CD\u8907\u57F7\u884C\u76F4\u5230 %b %c',
    'if %b %c': // objects.js:653
        '\u5982\u679C %b %c',
    'if %b %c else %c': // objects.js:658
        '\u5982\u679C %b %c \u5426\u5247 %c',
    'stop %stopChoices': // objects.js:678
        undefined,
    'run %cmdRing %inputs': // objects.js:693
        '\u884C %cmdRing %inputs',
    'launch %cmdRing %inputs': // objects.js:698
        '\u555F\u52D5 %cmdRing %inputs',
    'call %repRing %inputs': // objects.js:703
        '\u8ABF\u7528 %repRing %inputs',
    'report %s': // objects.js:708
        '\u5831\u544A %s',
    'run %cmdRing w/continuation': // objects.js:720
        undefined,
    'call %cmdRing w/continuation': // objects.js:725
        '\u6301\u7E8C\u8ABF\u7528 %cmdRing',
    'warp %c': // objects.js:730
        '\u76F4\u63A5\u904B\u884C %c',
    'tell %spr to %cmdRing %inputs': // objects.js:739
        undefined,
    'ask %spr for %repRing %inputs': // objects.js:744
        undefined,
    'when I start as a clone': // objects.js:752
        '\u4EE5\u8907\u88FD\u8EAB\u4EFD\u958B\u59CB',
    'create a clone of %cln': // objects.js:757
        '\u8907\u88FD %cln',
    'a new clone of %cln': // objects.js:762
        undefined,
    'delete this clone': // objects.js:768
        '\u522A\u9664\u9019\u500B\u8907\u88FD',
    'pause all %pause': // objects.js:776
        undefined,
    'touching %col ?': // objects.js:785
        '\u78B0\u5230 %col',
    'touching %clr ?': // objects.js:791
        '\u78B0\u5230\u984F\u8272 %clr',
    'color %clr is touching %clr ?': // objects.js:797
        '\u984F\u8272 %clr \u78B0\u5230\u4E86\u984F\u8272 %clr \uFF1F',
    'filtered for %clr': // objects.js:803
        '\u9078\u64C7\u984F\u8272 %clr',
    'stack size': // objects.js:809
        '\u5806\u758A\u5927\u5C0F',
    'frames': // objects.js:815
        '\u6846\u67B6',
    'processes': // objects.js:821
        undefined,
    'ask %s and wait': // objects.js:826
        '\u8A62\u554F %s \u4E26\u7B49\u5F85',
    'what\'s your name?': // objects.js:827
        '\u4F60\u7684\u540D\u5B57?',
    'answer': // objects.js:833 objects.js:838
        '\u56DE\u7B54',
    'mouse x': // objects.js:843
        '\u6ED1\u9F20\u7684 x \u5EA7\u6A19',
    'mouse y': // objects.js:848
        '\u6ED1\u9F20\u7684 y \u5EA7\u6A19',
    'mouse down?': // objects.js:853
        '\u6309\u4E0B\u6ED1\u9F20\uFF1F',
    'key %key pressed?': // objects.js:858
        '\u6309\u9375 %key \u662F\u5426\u6309\u4E0B\uFF1F',
    '%rel to %dst': // objects.js:871
        undefined,
    'reset timer': // objects.js:877
        '\u8A08\u6642\u5668\u6B78\u96F6',
    'timer': // objects.js:883 objects.js:888
        '\u8A08\u6642\u5668',
    '%att of %spr': // objects.js:893
        undefined,
    'url %s': // objects.js:899
        undefined,
    'turbo mode?': // objects.js:905
        'Turbo\u6A21\u5F0F',
    'set turbo mode to %b': // objects.js:910
        '\u8A2D\u7F6E Turbo \u6A21\u5F0F %b',
    'current %dates': // objects.js:915
        undefined,
    'my %get': // objects.js:920
        undefined,
    'round %n': // objects.js:968
        '\u5C07 %n \u56DB\u6368\u4E94\u5165',
    '%fun of %n': // objects.js:973
        '%fun %n',
    '%n mod %n': // objects.js:979
        '%n \u9664\u4EE5 %n \u7684\u9918\u6578',
    'pick random %n to %n': // objects.js:984
        '\u96A8\u6A5F\u5728 %n \u5230 %n \u9593\u9078\u4E00\u500B\u6578',
    '%b and %b': // objects.js:1005
        '%b \u4E14 %b',
    '%b or %b': // objects.js:1010
        '%b \u6216 %b',
    'not %b': // objects.js:1015
        '%b \u4E0D\u6210\u7ACB',
    'join %words': // objects.js:1033
        '\u5C07 %words \u52A0\u5165\u5230',
    'hello': // objects.js:1034 objects.js:1075
        '\u6B61\u8FCE',
    'world': // objects.js:1034 objects.js:1040 objects.js:1046 objects.js:1075
        '\u5149\u81E8',
    'letter %n of %s': // objects.js:1039
        '\u7B2C %n \u4F4D\u5143\u5728\u6587\u5B57 %s \u4E2D',
    'length of %s': // objects.js:1045
        '%s \u7684\u9577\u5EA6',
    'unicode of %s': // objects.js:1051
        '\u5B57\u5143 %s \u7684Unicode\u7DE8\u78BC\u503C',
    'unicode %n as letter': // objects.js:1057
        'Unicode\u7DE8\u78BC\u503C\u70BA %n \u7684\u5B57\u5143',
    'is %s a %typ ?': // objects.js:1063
        '%s \u662F %typ \u985E\u578B\uFF1F',
    'is %s identical to %s ?': // objects.js:1069
        '%s \u8207 %s \u76F8\u540C\u55CE\uFF1F',
    'split %s by %delim': // objects.js:1074
        undefined,
    'JavaScript function ( %mult%s ) { %code }': // objects.js:1080
        undefined,
    'type of %s': // objects.js:1086
        '%s \u985E\u578B',
    '%txtfun of %s': // objects.js:1093
        undefined,
    'compile %repRing': // objects.js:1099
        undefined,
    'set %var to %s': // objects.js:1119
        '\u8A2D\u5B9A\u8B8A\u6578 %var \u7684\u503C\u70BA %s',
    'change %var by %n': // objects.js:1125
        '\u589E\u52A0\u8B8A\u6578 %var \u7684\u503C %n',
    'show variable %var': // objects.js:1131
        '\u986F\u793A\u8B8A\u6578 %var',
    'hide variable %var': // objects.js:1136
        '\u96B1\u85CF\u8B8A\u6578 %var',
    'script variables %scriptVars': // objects.js:1141
        '\u8173\u672C\u8B8A\u6578 %scriptVars',
    'inherit %shd': // objects.js:1148
        undefined,
    'list %exp': // objects.js:1155
        '\u8868\u5217 %exp',
    '%s in front of %l': // objects.js:1160
        '\u8A2D\u5B9A %s \u70BA %l \u7B2C\u4E00\u9805',
    'item %idx of %l': // objects.js:1165
        '\u7B2C %idx \u9805\u5728 %l \u4E2D',
    'all but first of %l': // objects.js:1171
        '%l \u4E2D\u9664\u7B2C\u4E00\u9805\u4E4B\u5916\u5167\u5BB9',
    'length of %l': // objects.js:1176
        '%l \u7684\u5927\u5C0F',
    '%l contains %s': // objects.js:1181
        '%l \u5305\u542B %s',
    'thing': // objects.js:1182 objects.js:1188 objects.js:1200 objects.js:1206
        '\u4E8B\u9805',
    'add %s to %l': // objects.js:1187
        '\u5C07 %s \u52A0\u5165 %l',
    'delete %ida of %l': // objects.js:1193
        '\u522A\u9664 %ida \u7B2C %l \u9805',
    'insert %s at %idx of %l': // objects.js:1199
        '\u63D2\u5165 %s \u5230\u7B2C %idx \u9805\u5728 %l \u4E2D',
    'replace item %idx of %l with %s': // objects.js:1205
        '\u66FF\u63DB\u7B2C %idx \u9805\u5728 %l \u4E2D\u70BA %s',
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
        '\u89D2\u8272',
    'that name is already in use': // objects.js:1859 objects.js:7047
        undefined,
    'development mode\ndebugging primitives': // objects.js:1932 objects.js:2089 objects.js:2155 objects.js:2268 objects.js:7085 objects.js:7214 objects.js:7280 objects.js:7376
        '\u958B\u767C\u6A21\u5F0F\n\u8ABF\u5F0F\u7A0B\u5F0F\u8A9E\u8A00',
    'Make a variable': // objects.js:2184 objects.js:7309
        '\u65B0\u5EFA\u8B8A\u6578',
    'Delete a variable': // objects.js:2205 objects.js:7327
        '\u522A\u9664\u8B8A\u6578',
    'find blocks': // objects.js:2398 objects.js:2469
        undefined,
    'hide primitives': // objects.js:2476
        undefined,
    'show primitives': // objects.js:2494
        undefined,
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
        '\u821E\u81FA',
    'stop': // objects.js:6770 costumes/COSTUMES:486
        undefined,
    'terminate all running threads': // objects.js:6774
        undefined,
    'Stage selected:\nno motion primitives': // objects.js:7060
        '\u821E\u81FA\u9078\u64C7:\n\u6C92\u6709\u52D5\u4F5C\u7A0B\u5F0F\u8A9E\u8A00',
    'turn all pen trails and stamps\ninto a new costume for the\ncurrently selected sprite': // objects.js:7445
        undefined,
    'turn all pen trails and stamps\ninto a new background for the stage': // objects.js:7447
        undefined,
    'Background': // objects.js:7817
        undefined,
    'a {{ className }}({{ name }})': // objects.js:8096
        undefined,
    'click or drag crosshairs to move the rotation center': // objects.js:8296
        '\u9EDE\u64CA\u6216\u62D6\u52D5\u5341\u5B57\u51C6\u7DDA\uFF0C\u8A2D\u7F6E\u65CB\u8F49\u4E2D\u5FC3',
    'Costume Editor': // objects.js:8308
        '\u9020\u578B\u7DE8\u8F2F\u5668',
    'an {{ className }}({{ name }})': // objects.js:8395
        undefined,
    'Web Audio API is not supported\nin this browser': // objects.js:8629
        undefined,
    'normal': // objects.js:9452
        '\u6A19\u6E96',
    'large': // objects.js:9456
        '\u5927\u578B',
    'slider min': // objects.js:9466
        '\u6ED1\u584A\u7684\u6700\u5C0F\u503C',
    'slider max': // objects.js:9470
        '\u6ED1\u584A\u7684\u6700\u5927\u503C',
    'import': // objects.js:9475
        '\u5C0E\u5165',
    'Unable to import': // objects.js:9501
        undefined,
    '{{ appName }} can only import "text" files.\nYou selected a file of type "{{ type }}".': // objects.js:9502
        undefined,
    'Slider minimum value': // objects.js:9588
        '\u6ED1\u584A\u7684\u6700\u5C0F\u503C',
    'Slider maximum value': // objects.js:9604
        '\u6ED1\u584A\u7684\u6700\u5927\u503C',
    'Paint Editor': // paint.js:111
        undefined,
    'Paintbrush tool\n(free draw)': // paint.js:172
        undefined,
    'Stroked Rectangle\n(shift: square)': // paint.js:174
        undefined,
    'Stroked Ellipse\n(shift: circle)': // paint.js:176
        undefined,
    'Eraser tool': // paint.js:178
        undefined,
    'Set the rotation center': // paint.js:180
        undefined,
    'Line tool\n(shift: vertical/horizontal)': // paint.js:183
        undefined,
    'Filled Rectangle\n(shift: square)': // paint.js:185
        undefined,
    'Filled Ellipse\n(shift: circle)': // paint.js:187
        undefined,
    'Fill a region': // paint.js:189
        undefined,
    'Pipette tool\n(pick a color anywhere)': // paint.js:191
        undefined,
    'undo': // paint.js:225
        undefined,
    'grow': // paint.js:239
        undefined,
    'shrink': // paint.js:243
        undefined,
    'flip \u2194': // paint.js:247
        undefined,
    'flip \u2195': // paint.js:251
        undefined,
    'Constrain proportions of shapes?\n(you can also hold shift)': // paint.js:407
        undefined,
    'Brush size': // paint.js:413
        undefined,
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
        '\u662F',
    'No': // widgets.js:1608
        '\u5426',
    'Default': // widgets.js:1882
        undefined,
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
SnapTranslator.dict.zh_TW.deprecated = {
    'add a new sprite':
        '\u65B0\u589E\u89D2\u8272',
    'play note %n for %n beats':
        '\u5F48\u594F %n %n \u62CD',
    'when I am clicked':
        '\u7576\u89D2\u8272\u88AB\u9EDE\u64CA',
    'stop block':
        '\u505C\u6B62\u7A0B\u5F0F\u584A',
    'stop script':
        '\u505C\u6B62\u8173\u672C',
    'stop all %stop':
        '\u5168\u90E8\u505C\u6B62 %stop',
    'run %cmdRing/continuation':
        '\u6301\u7E8C\u57F7\u884C %cmdRing',
    'distance to %dst':
        '\u5230 %dst \u7684\u8DDD\u96E2',
    'http:// %s':
        'http:// %s',
    'Snap! website':
        '\u5B98\u65B9\u7DB2\u7AD9',
    '\u6AA2\u67E5\u555F\u7528\u52D5\u614B\u53EF\u8B8A\u53C3\u6578\u8F38\u5165\u6A19\u7C64':
        'marcar para habilitar etiquetas\ndin\u00E1micas para entradas varidic',
    'Saved!':
        '\u5DF2\u4FDD\u5B58\uFF01',
    'Are you sure you want to delete':
        '\u78BA\u5B9A\u8981\u522A\u9664\u55CE\uFF1F',
    'Open Projekt':
        '\u6253\u958B\u9805\u76EE',
    'Save Project As':
        '\u9805\u76EE\u53E6\u5B58\u70BA',
    'Single input.':
        '\u55AE\u4E00\u53C3\u6578.',
    '(180) right':
        '(180) \u53F3',
    'new':
        '\u65B0\u589E',
    'Ok':
        '\u78BA\u5B9A',
};
