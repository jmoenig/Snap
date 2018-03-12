/*

    lang-zh_CN.js

    Simplified Chinese translation for Snap!

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
SnapTranslator.dict.zh_CN = {
    metadata: {
        'name': // the name as it should appear in the language menu
            '\u7B80\u4F53\u4E2D\u6587',
        'english_name': // the english name of the language
            'Simplified Chinese',
        'translators': [ // translators authors for the Translators tab
            '\u4E94\u767E\u5200 <ubertao@qq.com>',
            '\u9093\u6C5F\u534E <djh@rhjxx.cn>'
        ],
        'last_changed': // this, too, will appear in the Translators tab
            '2018-01-22',
    },
    strings: {},
};
// ✂ - - - - - - - - - - - - - - - - -  -   -

SnapTranslator.dict.zh_CN.strings = {
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
        '\u753B\u7B14\u8F68\u8FF9',
    'stage image': // blocks.js:821
        '\u821E\u53F0\u56FE\u7247',
    'with inputs': // blocks.js:831
        '\u8F93\u5165\u9879',
    'block variables': // blocks.js:840 byob.js:1053
        '\u79EF\u6728\u53D8\u91CF',
    'Input Names': // blocks.js:844
        '\u8F93\u5165\u9879\uFF1A',
    'input names': // blocks.js:850
        '\u8F93\u5165\u9879\uFF1A',
    'Input name': // blocks.js:902 blocks.js:5344
        '\u8F93\u5165\u9879',
    '(90) right': // blocks.js:935 morphic.js:4888
        '\u53F3(90)',
    '(-90) left': // blocks.js:936 morphic.js:4889
        '\u5DE6(-90)',
    '(0) up': // blocks.js:937 morphic.js:4890
        '\u4E0A(0)',
    '(180) down': // blocks.js:938 morphic.js:4891
        '\u4E0B(180)',
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
        '\u4E00\u6708',
    'February': // blocks.js:969 widgets.js:1942
        '\u4E8C\u6708',
    'March': // blocks.js:970 widgets.js:1943
        '\u4E09\u6708',
    'April': // blocks.js:971 widgets.js:1944
        '\u56DB\u6708',
    'May': // blocks.js:972 widgets.js:1945
        '\u4E94\u6708',
    'June': // blocks.js:973 widgets.js:1946
        '\u516D\u6708',
    'July': // blocks.js:974 widgets.js:1947
        '\u4E03\u6708',
    'August': // blocks.js:975 widgets.js:1948
        '\u516B\u6708',
    'September': // blocks.js:976 widgets.js:1949
        '\u4E5D\u6708',
    'October': // blocks.js:977 widgets.js:1950
        '\u5341\u6708',
    'November': // blocks.js:978 widgets.js:1951
        '\u5341\u4E00\u6708',
    'December': // blocks.js:979 widgets.js:1952
        '\u5341\u4E8C\u6708',
    'clicked': // blocks.js:988
        '\u70B9\u51FB',
    'pressed': // blocks.js:989
        '\u6309\u4E0B',
    'dropped': // blocks.js:990
        '\u653E\u4E0B',
    'mouse-entered': // blocks.js:991
        '\u9F20\u6807\u78B0\u5230',
    'mouse-departed': // blocks.js:992
        '\u9F20\u6807\u79BB\u5F00',
    'scrolled-up': // blocks.js:993
        undefined,
    'scrolled-down': // blocks.js:994
        undefined,
    'year': // blocks.js:1004 widgets.js:2063
        '\u5E74\uFF1A',
    'month': // blocks.js:1005
        '\u6708\u4EFD',
    'date': // blocks.js:1006
        '\u65E5\u671F',
    'day of week': // blocks.js:1007
        '\u661F\u671F\u51E0',
    'hour': // blocks.js:1008
        '\u949F\u70B9',
    'minute': // blocks.js:1009
        '\u5206\u949F',
    'second': // blocks.js:1010
        '\u79D2\u949F',
    'time in milliseconds': // blocks.js:1011
        '\u65F6\u95F4\u6233',
    'letter': // blocks.js:1021
        '\u5B57\u6BCD',
    'whitespace': // blocks.js:1022
        '\u7A7A\u767D',
    'line': // blocks.js:1023 symbols.js:113
        '\u884C',
    'tab': // blocks.js:1024
        '\u5236\u8868\u7B26',
    'cr': // blocks.js:1025
        '\u56DE\u8F66',
    'csv': // blocks.js:1026
        undefined,
    'last': // blocks.js:1036 blocks.js:1048
        '\u6700\u540E',
    'all': // blocks.js:1038 blocks.js:1265 byob.js:3874
        '\u5168\u90E8',
    'any': // blocks.js:1049
        '\u4EFB\u610F',
    'distance': // blocks.js:1058
        undefined,
    'direction': // blocks.js:1059 blocks.js:2483 blocks.js:8556 objects.js:300
        '\u65B9\u5411',
    'color': // blocks.js:1117 morphic.js:4132 morphic.js:4135 morphic.js:12219 morphic.js:12222
        '\u989C\u8272\uFF1A',
    'fisheye': // blocks.js:1118
        undefined,
    'whirl': // blocks.js:1119
        undefined,
    'pixelate': // blocks.js:1120
        undefined,
    'mosaic': // blocks.js:1121
        undefined,
    'duplicate': // blocks.js:1122 blocks.js:2545 blocks.js:11904 gui.js:7368 gui.js:7710 morphic.js:4167 objects.js:3236
        '\u590D\u5236',
    'negative': // blocks.js:1123
        '\u5E95\u7247',
    'comic': // blocks.js:1124
        '\u6F2B\u753B',
    'confetti': // blocks.js:1125
        '\u5F69\u7EB8',
    'saturation': // blocks.js:1126
        undefined,
    'brightness': // blocks.js:1127
        '\u4EAE\u5EA6',
    'ghost': // blocks.js:1128
        '\u900F\u660E',
    'any key': // blocks.js:1146
        '\u4EFB\u610F',
    'up arrow': // blocks.js:1147
        '\u2191',
    'down arrow': // blocks.js:1148
        '\u2193',
    'right arrow': // blocks.js:1149
        '\u2192',
    'left arrow': // blocks.js:1150
        '\u2190',
    'space': // blocks.js:1151
        '\u7A7A\u683C',
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
        '\u7EDD\u5BF9\u503C',
    'ceiling': // blocks.js:1227 morphic.js:7085 morphic.js:7088
        '\u5411\u4E0A\u53D6\u6574',
    'floor': // blocks.js:1228 morphic.js:7069 morphic.js:7072
        '\u5411\u4E0B\u53D6\u6574',
    'sqrt': // blocks.js:1229
        '\u5E73\u65B9\u6839',
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
        '\u8FD9\u4E2A\u811A\u672C',
    'this block': // blocks.js:1267
        '\u8FD9\u5757\u79EF\u6728',
    'all but this script': // blocks.js:1268
        '\u6240\u6709\u5176\u4ED6\u811A\u672C',
    'other scripts in sprite': // blocks.js:1269
        '\u8FD9\u4E2A\u89D2\u8272\u7684\u5176\u4ED6\u811A\u672C',
    'String': // blocks.js:1290
        undefined,
    'Number': // blocks.js:1291 byob.js:3286
        '\u6570\u5B57',
    'true': // blocks.js:1292 blocks.js:9529 blocks.js:9919 objects.js:2979
        '\u771F',
    'false': // blocks.js:1293 blocks.js:9544 blocks.js:9930 objects.js:2979
        '\u5047',
    'code': // blocks.js:1334
        '\u8C03\u7528\u4EE3\u7801',
    'header': // blocks.js:1335
        '\u5B9A\u4E49\u4EE3\u7801',
    'list': // blocks.js:1408 blocks.js:8487
        '\u5217\u8868',
    'item': // blocks.js:1409
        '\u9879',
    'delimiter': // blocks.js:1410
        '\u5206\u9694\u7B26',
    'collection': // blocks.js:1419
        '\u96C6\u5408',
    'variables': // blocks.js:1420
        '\u53D8\u91CF',
    'parameters': // blocks.js:1421
        '\u53C2\u6570',
    'untitled': // blocks.js:1993 blocks.js:2604 blocks.js:6443 blocks.js:11919 byob.js:1037 byob.js:3910 gui.js:979 gui.js:4036 store.js:296
        '\u65E0\u540D\u9879\u76EE',
    '{{ projectName }} script pic': // blocks.js:1993 blocks.js:2602 blocks.js:6441 byob.js:1035
        undefined,
    'script target cannot be found for orphaned block': // blocks.js:2203
        undefined,
    'a {{ className }} ("{{ value }}...")': // blocks.js:2207 morphic.js:8466 morphic.js:9146
        undefined,
    'Variable name': // blocks.js:2377 blocks.js:3262 objects.js:2179 objects.js:7304
        '\u53D8\u91CF\u540D',
    'help': // blocks.js:2386 objects.js:1851 objects.js:2308
        '\u5E2E\u52A9',
    'script pic with result': // blocks.js:2393
        '\u5E26\u7ED3\u679C\u7684\u811A\u672C\u56FE\u7247',
    'open a new window\nwith a picture of both\nthis script and its result': // blocks.js:2397
        '\u6253\u5F00\u4E00\u4E2A\u65B0\u7A97\u53E3\uFF0C\n\u663E\u793A\u8FD9\u4E2A\u811A\u672C\u548C\u8FD0\u884C\u7ED3\u679C\u7684\u56FE\u7247',
    'rename': // blocks.js:2409 blocks.js:2458 blocks.js:2521 gui.js:7708 gui.js:8409 morphic.js:7656
        '\u6539\u540D\u4E3A',
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
        '\u4E0D\u8BB0\u5F55',
    'uncheck to save contents\nin the project': // blocks.js:2453
        '\u5173\uFF1A\u628A\u53D8\u91CF\u5185\u5BB9\u4FDD\u5B58\u5728\u9879\u76EE\u91CC',
    'check to prevent contents\nfrom being saved': // blocks.js:2454
        '\u5F00\uFF1A\u4E0D\u4FDD\u5B58\u53D8\u91CF\u5185\u5BB9',
    'hide': // blocks.js:2472 morphic.js:4214 objects.js:394
        '\u9690\u85CF',
    'x position': // blocks.js:2481 blocks.js:8554 objects.js:288
        'x\u5750\u6807',
    'y position': // blocks.js:2482 blocks.js:8555 objects.js:294
        'y\u5750\u6807',
    'size': // blocks.js:2484 blocks.js:8559 objects.js:382
        '\u5927\u5C0F',
    'costume #': // blocks.js:2485 blocks.js:8557 blocks.js:8561 objects.js:317
        '\u9020\u578B\u7F16\u53F7',
    'header mapping': // blocks.js:2507 blocks.js:2677
        '\u5BF9\u5E94\u7684\u5B9A\u4E49\u4EE3\u7801',
    'code mapping': // blocks.js:2511 blocks.js:2681
        '\u5BF9\u5E94\u7684\u8C03\u7528\u4EE3\u7801',
    'relabel': // blocks.js:2527 blocks.js:2538
        '\u66F4\u6362',
    'make a copy\nand pick it up': // blocks.js:2564 blocks.js:11908 morphic.js:4171
        '\u590D\u5236\u5E76\u6293\u8D77\u8FD9\u4E2A\u79EF\u6728',
    'only duplicate this block': // blocks.js:2586
        '\u590D\u5236\u5355\u4E2A\u79EF\u6728',
    'delete': // blocks.js:2590 blocks.js:11910 gui.js:7372 gui.js:7711 gui.js:8410 morphic.js:4215 objects.js:3242
        '\u5220\u9664',
    'script pic': // blocks.js:2594 byob.js:1030
        '\u663E\u793A\u811A\u672C\u56FE\u7247',
    'open a new window\nwith a picture of this script': // blocks.js:2608 byob.js:1041
        '\u6253\u5F00\u4E00\u4E2A\u65B0\u7A97\u53E3\uFF0C\n\u663E\u793A\u8FD9\u4E2A\u811A\u672C\u7684\u56FE\u7247',
    'download script': // blocks.js:2612
        undefined,
    '{{ name }} script': // blocks.js:2622
        undefined,
    'download this script\nas an XML file': // blocks.js:2627
        undefined,
    'unringify': // blocks.js:2657
        '\u53BB\u6389\u73AF',
    'ringify': // blocks.js:2661 blocks.js:2673
        '\u52A0\u4E0A\u73AF',
    'delete block': // blocks.js:2691
        '\u5220\u9664\u79EF\u6728',
    'spec': // blocks.js:2692 blocks.js:2699
        '\u63CF\u8FF0',
    'Help': // blocks.js:2980 blocks.js:2997
        '\u5E2E\u52A9',
    'Enter code that corresponds to the block\'s definition. Use the formal parameter\nnames as shown and <body> to reference the definition body\'s generated text code.': // blocks.js:3026
        '\u8F93\u5165\u79EF\u6728\u5BF9\u5E94\u7684\u5B9A\u4E49/\u5B9E\u73B0\u90E8\u5206\u4EE3\u7801\u3002\n\u4F7F\u7528\u4E0A\u56FE\u6240\u793A\u7684\u5F62\u53C2\u540D\uFF0C\u4F7F\u7528<body>\u6765\u5F15\u7528\u79EF\u6728\u7684\u5B9A\u4E49\u3002',
    'Enter code that corresponds to the block\'s definition. Choose your own\nformal parameter names (ignoring the ones shown).': // blocks.js:3029
        '\u8F93\u5165\u79EF\u6728\u5BF9\u5E94\u7684\u5B9A\u4E49/\u5B9E\u73B0\u90E8\u5206\u4EE3\u7801\u3002\n\u4F7F\u7528\u81EA\u5DF1\u9009\u62E9\u7684\u5F62\u53C2\u540D\u5B57\uFF08\u5FFD\u7565\u4E0A\u56FE\u6240\u793A\u7684\u5F62\u53C2\u540D\uFF09\u3002',
    'Header mapping': // blocks.js:3043
        '\u5BF9\u5E94\u7684\u5B9A\u4E49\u4EE3\u7801',
    'Code mapping': // blocks.js:3072
        '\u5BF9\u5E94\u7684\u8C03\u7528\u4EE3\u7801',
    'Enter code that corresponds to the block\'s operation (usually a single\nfunction invocation). Use <#n> to reference actual arguments as shown.': // blocks.js:3077
        '\u8F93\u5165\u79EF\u6728\u5BF9\u5E94\u7684\u8C03\u7528\u4EE3\u7801\u3002\n\u7528<#n>\u6765\u5F15\u7528\u4E0A\u56FE\u6240\u793A\u7684\u5B9E\u53C2\u3002',
    'Variable exists': // blocks.js:3292
        undefined,
    'A variable with this name already exists in this context.': // blocks.js:3294
        undefined,
    'A variable with this name already exists as a global variable.': // blocks.js:3396
        undefined,
    'A variable with this name already exists as a sprite local variable.': // blocks.js:3455
        undefined,
    'Block variable name': // blocks.js:5346
        '\u79EF\u6728\u53D8\u91CF\u540D\u5B57',
    'Script variable name': // blocks.js:5348
        '\u811A\u672C\u53D8\u91CF\u540D',
    'undrop': // blocks.js:6320 blocks.js:6709
        '\u6536\u56DE\u79EF\u6728',
    'undo the last\nblock drop\nin this pane': // blocks.js:6324
        '\u6536\u56DE\u521A\u521A\u653E\u4E0B\u7684\u79EF\u6728',
    'redrop': // blocks.js:6335 blocks.js:6722
        undefined,
    'redo the last undone\nblock drop\nin this pane': // blocks.js:6339
        undefined,
    'clear undrop queue': // blocks.js:6345
        undefined,
    'forget recorded block drops\non this pane': // blocks.js:6351
        undefined,
    'clean up': // blocks.js:6359
        '\u6574\u7406',
    'arrange scripts\nvertically': // blocks.js:6359
        '\u5782\u76F4\u6392\u5217\u811A\u672C',
    'add comment': // blocks.js:6360
        '\u6DFB\u52A0\u8BF4\u660E',
    'scripts pic': // blocks.js:6362
        '\u811A\u672C\u56FE\u7247',
    'open a new window\nwith a picture of all scripts': // blocks.js:6364
        '\u6253\u5F00\u4E00\u4E2A\u65B0\u7A97\u53E3\uFF0C\u5C55\u793A\u6240\u6709\u811A\u672C\u7684\u56FE\u7247',
    'make a block': // blocks.js:6380
        '\u5236\u4F5C\u65B0\u79EF\u6728',
    'Make a block': // blocks.js:6398 objects.js:2303 objects.js:2352 objects.js:2411
        '\u5236\u4F5C\u79EF\u6728',
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
        '\u6D88\u606F\u540D\u79F0',
    'any message': // blocks.js:8360
        '\u4EFB\u4F55\u6D88\u606F',
    'mouse-pointer': // blocks.js:8391 blocks.js:8420
        '\u9F20\u6807\u6307\u9488',
    'edge': // blocks.js:8392
        '\u8FB9\u7F18',
    'random position': // blocks.js:8418
        undefined,
    'myself': // blocks.js:8445
        '\u81EA\u5DF1',
    'number': // blocks.js:8484
        '\u6570\u5B57',
    'text': // blocks.js:8485 morphic.js:12305
        '\u6587\u5B57',
    'Boolean': // blocks.js:8486
        '\u5E03\u5C14',
    'sprite': // blocks.js:8490
        '\u89D2\u8272',
    'costume': // blocks.js:8492 objects.js:3069
        undefined,
    'sound': // blocks.js:8493
        undefined,
    'command': // blocks.js:8494
        '\u547D\u4EE4',
    'reporter': // blocks.js:8495
        '\u8BB0\u5F55',
    'predicate': // blocks.js:8496
        '\u5224\u65AD',
    'neighbors': // blocks.js:8502
        '\u90BB\u5C45',
    'self': // blocks.js:8503
        '\u672C\u8EAB',
    'other sprites': // blocks.js:8504
        '\u5176\u4ED6\u89D2\u8272',
    'clones': // blocks.js:8505
        '\u514B\u9686',
    'other clones': // blocks.js:8506
        '\u5176\u4ED6\u514B\u9686',
    'parts': // blocks.js:8508
        '\u7EC4\u4EF6',
    'anchor': // blocks.js:8509
        '\u7EC4\u5408\u540E\u89D2\u8272',
    'stage': // blocks.js:8511 symbols.js:95
        '\u821E\u53F0',
    'children': // blocks.js:8513
        '\u5B50\u89D2\u8272',
    'parent': // blocks.js:8514 gui.js:7178 gui.js:7385
        '\u6BCD\u89D2\u8272',
    'temporary?': // blocks.js:8516
        undefined,
    'name': // blocks.js:8519
        '\u540D\u5B57',
    'costumes': // blocks.js:8520
        undefined,
    'sounds': // blocks.js:8521
        undefined,
    'dangling?': // blocks.js:8522
        '\u662F\u5426\u60AC\u5782\uFF1F',
    'rotation x': // blocks.js:8523
        '\u65CB\u8F6C\u70B9x\u5750\u6807',
    'rotation y': // blocks.js:8524
        '\u65CB\u8F6C\u70B9y\u5750\u6807',
    'center x': // blocks.js:8525
        '\u4E2D\u5FC3\u70B9x\u5750\u6807',
    'center y': // blocks.js:8526
        '\u4E2D\u5FC3\u5E97y\u5750\u6807',
    'costume name': // blocks.js:8558 blocks.js:8562
        '\u9020\u578B\u540D\u79F0',
    'Turtle': // blocks.js:8582 gui.js:7941 objects.js:3166 threads.js:3349
        '\u6D77\u9F9F',
    'Empty': // blocks.js:8584 gui.js:7941 objects.js:3166 threads.js:3350
        '\u7A7A\u767D',
    'code number mapping': // blocks.js:8835
        undefined,
    'code string mapping': // blocks.js:8840
        '\u5B57\u7B26\u4E32\u5BF9\u5E94\u7684\u4EE3\u7801',
    'String <#1>': // blocks.js:8864
        '\u5B57\u7B26\u4E32 <#1>',
    'Code mapping - {{ type }}': // blocks.js:8864 blocks.js:8879
        '\u5BF9\u5E94\u7684\u4EE3\u7801 - {{ type }}',
    'Number <#1>': // blocks.js:8879
        undefined,
    'code true mapping': // blocks.js:9500
        undefined,
    'code false mapping': // blocks.js:9505
        undefined,
    'Code mapping - {{ name }}': // blocks.js:9529 blocks.js:9544 blocks.js:10662
        undefined,
    'code list mapping': // blocks.js:10619
        '\u5217\u8868\u5BF9\u5E94\u7684\u4EE3\u7801',
    'code item mapping': // blocks.js:10623
        '\u5217\u8868\u9879\u5BF9\u5E94\u7684\u4EE3\u7801',
    'code delimiter mapping': // blocks.js:10627
        '\u5217\u8868\u9879\u5206\u9694\u7B26\u5BF9\u5E94\u7684\u4EE3\u7801',
    'list item delimiter': // blocks.js:10642
        '\u5217\u8868\u9879\u5206\u9694\u7B26',
    'list contents <#1>': // blocks.js:10646
        '\u5217\u8868\u5185\u5BB9 <#1>',
    'list item <#1>': // blocks.js:10650
        '\u5217\u8868\u9879 <#1>',
    'input list': // blocks.js:10750
        '\u8F93\u5165\u5217\u8868\uFF1A',
    'add comment here': // blocks.js:11762
        '\u5728\u8FD9\u91CC\u6DFB\u52A0\u8BF4\u660E',
    'comment pic': // blocks.js:11912
        '\u5C55\u793A\u56FE\u7247',
    '{{ projectName }} comment pic': // blocks.js:11917
        undefined,
    'open a new window\nwith a picture of this comment': // blocks.js:11923
        '\u6253\u5F00\u65B0\u7A97\u53E3\uFF0C\u5C55\u793A\u8FD9\u6761\u8BF4\u660E\u7684\u56FE\u7247',
    'Change block': // byob.js:885
        '\u4FEE\u6539\u79EF\u6728',
    '{{ varName }} (temporary)': // byob.js:1011 objects.js:9431 threads.js:1670
        '{{ varName }} (\u4E34\u65F6)',
    'translations': // byob.js:1044
        undefined,
    'experimental': // byob.js:1048 byob.js:1057 byob.js:1065
        undefined,
    'under construction': // byob.js:1048 byob.js:1057 byob.js:1065
        undefined,
    'remove block variables': // byob.js:1061
        '\u5220\u9664\u79EF\u6728\u53D8\u91CF',
    'duplicate block definition': // byob.js:1079
        undefined,
    'delete block definition': // byob.js:1089 byob.js:1133 byob.js:1147
        '\u5220\u9664\u79EF\u6728\u5B9A\u4E49',
    'edit': // byob.js:1157 gui.js:7699 morphic.js:8730 morphic.js:9477 objects.js:3255 objects.js:3261 objects.js:7422
        '\u7F16\u8F91',
    'Delete Custom Block': // byob.js:1228
        '\u5220\u9664\u81EA\u5236\u79EF\u6728',
    'Are you sure you want to delete this\ncustom block and all its instances?': // byob.js:1229
        '\u4F60\u786E\u5B9E\u8981\u5220\u9664\u6240\u6709\u8FD9\u79CD\u81EA\u5236\u79EF\u6728\u548C\u5B83\u7684\u5B9A\u4E49\u5417\uFF1F',
    'OK': // byob.js:1648 byob.js:2117 byob.js:3237 byob.js:3848 gui.js:3713 morphic.js:3958 morphic.js:4028 morphic.js:4054 objects.js:8312 paint.js:161 tables.js:1212 widgets.js:1574 widgets.js:1708 widgets.js:1791 widgets.js:1874 widgets.js:2155 widgets.js:2434
        '\u786E\u5B9A',
    'Cancel': // byob.js:1649 byob.js:2120 byob.js:3243 byob.js:3849 gui.js:3371 gui.js:3714 gui.js:5941 gui.js:6843 gui.js:8996 gui.js:9134 morphic.js:4031 morphic.js:4057 objects.js:8313 paint.js:162 widgets.js:1709 widgets.js:1792 widgets.js:1887 widgets.js:2156
        '\u53D6\u6D88',
    'Command': // byob.js:1770
        '\u547D\u4EE4',
    'Reporter': // byob.js:1779 byob.js:3290
        '\u62A5\u544A',
    'Predicate': // byob.js:1788 byob.js:3291
        '\u5224\u65AD',
    'for all sprites': // byob.js:1850 byob.js:3662
        '\u7ED9\u6240\u6709\u89D2\u8272\u7528',
    'for this sprite only': // byob.js:1855 byob.js:3667
        '\u7ED9\u8FD9\u4E2A\u89D2\u8272\u7528',
    'Block Editor': // byob.js:2065
        '\u79EF\u6728\u7F16\u8F91\u5668',
    'Method Editor': // byob.js:2066
        undefined,
    'Apply': // byob.js:2119
        '\u5E94\u7528',
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
        '\u7F16\u8F91\u6807\u7B7E\u7247\u6BB5',
    'Create input name': // byob.js:2754
        '\u521B\u5EFA\u8F93\u5165\u9879',
    'Edit input name': // byob.js:2755
        '\u7F16\u8F91\u8F93\u5165\u9879',
    'new line': // byob.js:2800 byob.js:3266
        undefined,
    'Title text': // byob.js:3061
        '\u6807\u9898\u6587\u672C',
    'Delete': // byob.js:3239 gui.js:5940
        '\u5220\u9664',
    'Object': // byob.js:3283
        '\u5BF9\u8C61',
    'Text': // byob.js:3284
        '\u6587\u672C',
    'List': // byob.js:3285
        '\u5217\u8868',
    'Any type': // byob.js:3287
        '\u4EFB\u4E00\u7C7B\u578B',
    'Boolean (T/F)': // byob.js:3288
        '\u5E03\u5C14\uFF08\u771F/\u5047\uFF09',
    'Command\n(inline)': // byob.js:3289
        '\u547D\u4EE4\uFF08\u5D4C\u5165\uFF09',
    'Command\n(C-shape)': // byob.js:3292
        '\u547D\u4EE4\uFF08C\u578B\uFF09',
    'Any\n(unevaluated)': // byob.js:3293
        '\u4EFB\u610F\uFF08\u4E0D\u8BA1\u7B97\uFF09',
    'Boolean\n(unevaluated)': // byob.js:3294
        '\u5E03\u5C14\uFF08\u4E0D\u8BA1\u7B97\uFF09',
    'Single input': // byob.js:3299
        '\u8F93\u5165\u5355\u4E2A\u503C',
    'Multiple inputs (value is list of inputs)': // byob.js:3304
        '\u8F93\u5165\u591A\u4E2A\u503C\uFF08\u5217\u8868\uFF09',
    'Upvar - make internal variable visible to caller': // byob.js:3309
        '\u56DE\u4F20\u53D8\u91CF - \u8BA9\u8C03\u7528\u8005\u53EF\u4EE5\u4F7F\u7528\u8FD9\u4E2A\u53D8\u91CF',
    'Default Value': // byob.js:3314
        '\u9ED8\u8BA4\u503C\uFF1A',
    'options': // byob.js:3570
        '\u9009\u9879',
    'read-only': // byob.js:3573
        '\u53EA\u8BFB',
    'Input Slot Options': // byob.js:3593
        '\u8F93\u5165\u9879\u9009\u9879',
    'Enter one option per line.\nOptionally use "=" as key/value delimiter and {} for submenus. e.g.\n   the answer=42': // byob.js:3597
        undefined,
    'Export blocks': // byob.js:3776 byob.js:3914 gui.js:3187 gui.js:3835
        '\u5BFC\u51FA\u79EF\u6728',
    'select': // byob.js:3873
        '\u9009\u62E9',
    'none': // byob.js:3875 objects.js:5421 objects.js:5427
        '\u65E0',
    '{{ projectName }} blocks': // byob.js:3910
        undefined,
    'no blocks were selected': // byob.js:3915 byob.js:4009 byob.js:4102
        undefined,
    'Import blocks': // byob.js:3962 byob.js:3963 byob.js:4008
        '\u5BFC\u5165\u79EF\u6728',
    'Imported Blocks Module': // byob.js:4002 byob.js:4003 gui.js:4355
        undefined,
    'Remove unused blocks': // byob.js:4056 byob.js:4057 byob.js:4101 gui.js:3872
        '\u5220\u9664\u6CA1\u7528\u5230\u7684\u79EF\u6728',
    '{{ count }} unused block(s) removed': // byob.js:4096
        '{{ count }}\u5220\u6389\u4E86\u6CA1\u7528\u5230\u7684\u79EF\u6728',
    'There was an error while trying to access\na {{ cloudName }} service. Please try again later.': // cloud.js:90
        undefined,
    'Cloud Error': // cloud.js:159
        undefined,
    'You are not logged in': // cloud.js:188 cloud.js:436
        '\u4F60\u8FD8\u6CA1\u6709\u767B\u5F55',
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
        '\u4ECE\u4E91\u7AEF\u4E0B\u8F7D\u4E0B\u9879\u76EE',
    'Opening project': // gui.js:430 gui.js:470 gui.js:2627 gui.js:4222
        '\u6B63\u5728\u6253\u5F00\u9879\u76EE',
    'Saved project\n{{ name }}': // gui.js:506
        undefined,
    'Visible stepping': // gui.js:716 gui.js:2756
        undefined,
    'development mode': // gui.js:990 morphic.js:12252
        '\u5F00\u53D1\u8005\u6A21\u5F0F',
    'don\'t rotate': // gui.js:1222
        '\u4E0D\u80FD\u65CB\u8F6C',
    'can rotate': // gui.js:1223
        '\u53EF\u4EE5\u65CB\u8F6C',
    'only face left/right': // gui.js:1224
        '\u53EA\u80FD\u6C34\u5E73\u7FFB\u8F6C',
    'draggable': // gui.js:1329
        '\u5141\u8BB8\u62D6\u52A8',
    'Scripts': // gui.js:1371 gui.js:4179
        '\u811A\u672C',
    'Costumes': // gui.js:1391 gui.js:3252 gui.js:3255 gui.js:4156
        '\u9020\u578B',
    'Backgrounds': // gui.js:1392 gui.js:3252 gui.js:3255
        '\u80CC\u666F',
    'Sounds': // gui.js:1411 gui.js:3262 gui.js:3264 gui.js:4167
        '\u58F0\u97F3',
    'add a new Turtle sprite': // gui.js:1545
        '\u6DFB\u52A0\u4E00\u4E2A\u6D77\u9F9F\u89D2\u8272',
    'paint a new sprite': // gui.js:1567
        '\u753B\u4E00\u4E2A\u65B0\u89D2\u8272',
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
        '\u5173\u4E8ESnap!',
    'Reference manual': // gui.js:2474
        '\u53C2\u8003\u624B\u518C',
    '{{ site }} website': // gui.js:2481
        '{{ site }}\u5B98\u65B9\u7F51\u7AD9',
    'Download source': // gui.js:2487
        '\u4E0B\u8F7D\u6E90\u4EE3\u7801',
    'Switch back to user mode': // gui.js:2498
        '\u56DE\u5230\u7528\u6237\u6A21\u5F0F',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones': // gui.js:2500
        '\u7981\u7528Morphic\u5FEB\u6377\u83DC\u5355\n\u663E\u793A\u6B63\u5E38\u7684\u7528\u6237\u754C\u9762',
    'Switch to dev mode': // gui.js:2507
        '\u5207\u6362\u5230\u5F00\u53D1\u8005\u6A21\u5F0F',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!': // gui.js:2509
        '\u542F\u7528Morphic\u5FEB\u6377\u83DC\u5355\u548C\u67E5\u770B\u5668\n\u7528\u6237\u754C\u9762\u4E0D\u53CB\u597D',
    'Cloud URL': // gui.js:2527 gui.js:5654
        undefined,
    'Login': // gui.js:2536
        '\u767B\u5F55',
    'Signup': // gui.js:2540
        '\u6CE8\u518C',
    'Reset Password': // gui.js:2544
        '\u91CD\u8BBE\u5BC6\u7801',
    'Resend Verification Email': // gui.js:2548
        undefined,
    'Logout {{ username }}': // gui.js:2553
        '\u767B\u51FA{{ username }}',
    'Change Password': // gui.js:2557 gui.js:5420
        '\u4FEE\u6539\u5BC6\u7801',
    'Export project media only': // gui.js:2564
        '\u4EC5\u5BFC\u51FA\u9879\u76EE\u4E2D\u7684\u5A92\u4F53\u6587\u4EF6',
    'Export Project As': // gui.js:2569 gui.js:2583 gui.js:2597 gui.js:3158 gui.js:3176
        '\u628A\u9879\u76EE\u5BFC\u51FA\u5230',
    'Export project without media': // gui.js:2578
        '\u5BFC\u51FA\u9879\u76EE\uFF0C\u4E0D\u542B\u5A92\u4F53',
    'Export project as cloud data': // gui.js:2592
        '\u628A\u9879\u76EE\u4EE5\u4E91\u7AEF\u6570\u636E\u683C\u5F0F\u5BFC\u51FA',
    'Open shared project from cloud': // gui.js:2607
        '\u6253\u5F00\u5171\u4EAB\u5728\u4E91\u7AEF\u7684\u9879\u76EE',
    'Author name': // gui.js:2609
        undefined,
    'Project name': // gui.js:2610
        undefined,
    'Language': // gui.js:2676
        '\u8BED\u8A00',
    'Generate {{ filename }} file': // gui.js:2679 gui.js:5035
        undefined,
    'builds the {{ language }} translation file': // gui.js:2684
        undefined,
    'Zoom blocks': // gui.js:2692 gui.js:5120
        '\u653E\u5927\u79EF\u6728',
    'Stage size': // gui.js:2696 gui.js:5163
        '\u821E\u53F0\u5927\u5C0F',
    'Dragging threshold': // gui.js:2701 gui.js:5226
        '\u62D6\u653E\u6700\u5C0F\u8DDD\u79BB',
    'specify the distance the hand has to move\nbefore it picks up an object': // gui.js:2703
        '\u8981\u6293\u8D77\u4E1C\u897F\n\u9F20\u6807\u9700\u8981\u79FB\u52A8\u7684\u6700\u5C0F\u8DDD\u79BB',
    'Retina display support': // gui.js:2725
        undefined,
    'uncheck for lower resolution,\nsaves computing resources': // gui.js:2728
        undefined,
    'check for higher resolution,\nuses more computing resources': // gui.js:2729
        undefined,
    'Input sliders': // gui.js:2733
        '\u4F7F\u7528\u6E38\u6807',
    'uncheck to disable\ninput sliders for\nentry fields': // gui.js:2736
        '\u5173\uFF1A\u4E0D\u4F7F\u7528\u6E38\u6807\u4FEE\u6539\u8F93\u5165\u5B57\u6BB5',
    'check to enable\ninput sliders for\nentry fields': // gui.js:2737
        '\u5F00\uFF1A\u4F7F\u7528\u6E38\u6807\u4FEE\u6539\u8F93\u5165\u5B57\u6BB5',
    'Execute on slider change': // gui.js:2741
        '\u6E38\u6807\u6539\u53D8\u65F6\u8FD0\u884C\u811A\u672C',
    'uncheck to suppress\nrunning scripts\nwhen moving the slider': // gui.js:2744
        '\u5173\uFF1A\u6ED1\u52A8\u6E38\u6807\u65F6\u6682\u505C\u8FD0\u884C\u811A\u672C',
    'check to run\nthe edited script\nwhen moving the slider': // gui.js:2745
        '\u5F00\uFF1A\u6ED1\u52A8\u6E38\u6807\u65F6\u8FD0\u884C\u6539\u53D8\u7684\u811A\u672C',
    'Turbo mode': // gui.js:2749
        '\u52A0\u901F\u6A21\u5F0F',
    'uncheck to run scripts\nat normal speed': // gui.js:2752
        '\u5173\uFF1A\u6B63\u5E38\u901F\u5EA6\u8FD0\u884C\u811A\u672C',
    'check to prioritize\nscript execution': // gui.js:2753
        '\u5F00\uFF1A\u52A0\u901F\u811A\u672C\u8FD0\u884C',
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
        '\u534A\u900F\u660E\u9634\u5F71',
    'uncheck to use solid drop\nshadows and highlights': // gui.js:2787
        '\u5173\uFF1A\u4F7F\u7528\u4E0D\u900F\u660E\u7684\u9634\u5F71\u548C\u52A0\u4EAE',
    'check to use blurred drop\nshadows and highlights': // gui.js:2788
        '\u5173\uFF1A\u4F7F\u7528\u900F\u660E\u7684\u9634\u5F71\u548C\u52A0\u4EAE',
    'Zebra coloring': // gui.js:2792
        '\u79EF\u6728\u989C\u8272\u76F8\u95F4',
    'uncheck to disable alternating\ncolors for nested block': // gui.js:2795
        '\u5173\uFF1A\u4F7F\u7528\u540C\u6837\u7684\u989C\u8272\n\u663E\u793A\u5D4C\u5957\u7684\u540C\u7C7B\u79EF\u6728',
    'check to enable alternating\ncolors for nested blocks': // gui.js:2796
        '\u5F00\uFF1A\u4F7F\u7528\u6DF1\u6D45\u76F8\u95F4\u7684\u989C\u8272\n\u663E\u793A\u5D4C\u5957\u7684\u540C\u7C7B\u79EF\u6728',
    'Dynamic input labels': // gui.js:2800
        '\u52A8\u6001\u8F93\u5165\u6807\u8BB0',
    'uncheck to disable dynamic\nlabels for variadic inputs': // gui.js:2803
        '\u5173\uFF1A\u53EF\u53D8\u8F93\u5165\u9879\u4E0D\u4F7F\u7528\u52A8\u6001\u6807\u8BB0',
    'check to enable dynamic\nlabels for variadic inputs': // gui.js:2804
        '\u5F00\uFF1A\u53EF\u53D8\u8F93\u5165\u9879\u4F7F\u7528\u52A8\u6001\u6807\u8BB0',
    'Prefer empty slot drops': // gui.js:2808
        '\u53EA\u653E\u7A7A\u767D\u9879',
    'uncheck to allow dropped\nreporters to kick out others': // gui.js:2811
        '\u5173\uFF1A\u201C\u62A5\u544A\u79EF\u6728\u201D\u53EF\u4EE5\n\u8E22\u8D70\u8F93\u5165\u9879\u4E0A\u5DF2\u6709\u7684\u79EF\u6728',
    'check to focus on empty slots\nwhen dragging & dropping reporters': // gui.js:2812
        '\u5F00\uFF1A\u201C\u62A5\u544A\u79EF\u6728\u201D\u4F18\u5148\n\u653E\u5728\u6CA1\u6709\u79EF\u6728\u7684\u8F93\u5165\u9879\u4E0A',
    'Long form input dialog': // gui.js:2816
        '\u8F93\u5165\u7C7B\u578B\u8BF4\u660E',
    'uncheck to use the input\ndialog in short form': // gui.js:2819
        '\u5173\uFF1A\u663E\u793A\u7B80\u6D01\u7684\u8F93\u5165\u9879\u5BF9\u8BDD\u6846',
    'check to always show slot\ntypes in the input dialog': // gui.js:2820
        '\u5F00\uFF1A\u5728\u8F93\u5165\u9879\u5BF9\u8BDD\u6846\u91CC\u663E\u793A\u7C7B\u578B\u8BF4\u660E',
    'Plain prototype labels': // gui.js:2823
        '\u7B80\u6D01\u7684\u8BBE\u8BA1\u56FE',
    'uncheck to always show (+) symbols\nin block prototype labels': // gui.js:2826
        '\u5173\uFF1A\u5728\u79EF\u6728\u8BBE\u8BA1\u56FE\u4E0A\u663E\u793A(+)\u53F7',
    'check to hide (+) symbols\nin block prototype labels': // gui.js:2827
        '\u5F00\uFF1A\u4E0D\u5728\u79EF\u6728\u8BBE\u8BA1\u56FE\u4E0A\u663E\u793A(+)\u53F7',
    'Virtual keyboard': // gui.js:2830
        '\u865A\u62DF\u952E\u76D8',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices': // gui.js:2833
        '\u5173\uFF1A\u4E0D\u4F7F\u7528\u79FB\u52A8\u8BBE\u5907\u7684\u865A\u62DF\u952E\u76D8',
    'check to enable\nvirtual keyboard support\nfor mobile devices': // gui.js:2834
        '\u5F00\uFF1A\u4F7F\u7528\u79FB\u52A8\u8BBE\u5907\u7684\u865A\u62DF\u952E\u76D8',
    'Clicking sound': // gui.js:2838
        '\u70B9\u51FB\u97F3\u6548',
    'uncheck to turn\nblock clicking\nsound off': // gui.js:2848
        '\u5173\uFF1A\u70B9\u51FB\u79EF\u6728\u65F6\u4E0D\u53D1\u51FA\u58F0\u97F3',
    'check to turn\nblock clicking\nsound on': // gui.js:2849
        '\u5F00\uFF1A\u70B9\u51FB\u79EF\u6728\u53D1\u51FA\u58F0\u97F3',
    'Animations': // gui.js:2852
        '\u52A8\u753B',
    'uncheck to disable\nIDE animations': // gui.js:2855
        '\u5173\uFF1A\u4E0D\u663E\u793A\u7F16\u8F91\u5668\u52A8\u753B\u6548\u679C',
    'check to enable\nIDE animations': // gui.js:2856
        '\u5F00\uFF1A\u663E\u793A\u7F16\u8F91\u5668\u52A8\u753B\u6548\u679C',
    'Cache Inputs': // gui.js:2860
        '\u7F13\u5B58\u8F93\u5165\u6570\u636E',
    'uncheck to stop caching\ninputs (for debugging the evaluator)': // gui.js:2866
        '\u5173\uFF1A\u4E0D\u7F13\u5B58\u8F93\u5165\u6570\u636E\n\uFF08\u4EE5\u4FBF\u8C03\u8BD5\u6C42\u503C\u8FC7\u7A0B\uFF09',
    'check to cache inputs\nboosts recursion': // gui.js:2867
        '\u5F00\uFF1A\u7F13\u5B58\u8F93\u5165\u6570\u636E\n\u9012\u5F52\u901F\u5EA6\u66F4\u5FEB',
    'Rasterize SVGs': // gui.js:2871
        'SVG\u70B9\u9635\u5316',
    'uncheck for smooth\nscaling of vector costumes': // gui.js:2877
        '\u5173\uFF1A\u77E2\u91CF\u9020\u578B\u5E73\u6ED1\u7F29\u653E',
    'check to rasterize\nSVGs on import': // gui.js:2878
        '\u5F00\uFF1A\u5BFC\u5165SVG\u65F6\u628A\u5B83\u70B9\u9635\u5316',
    'Flat design': // gui.js:2882
        '\u6241\u5E73\u5916\u89C2',
    'uncheck for default\nGUI design': // gui.js:2890
        '\u5173\uFF1A\u4F7F\u7528\u9ED8\u8BA4\u7684\u7528\u6237\u754C\u9762',
    'check for alternative\nGUI design': // gui.js:2891
        '\u5F00\uFF1A\u4F7F\u7528\u6241\u5E73\u98CE\u683C\u7684\u7528\u6237\u754C\u9762',
    'Nested auto-wrapping': // gui.js:2895
        undefined,
    'uncheck to confine auto-wrapping\nto top-level block stacks': // gui.js:2906
        undefined,
    'check to enable auto-wrapping\ninside nested block stacks': // gui.js:2907
        undefined,
    'Project URLs': // gui.js:2911
        '\u9879\u76EE\u7F51\u5740',
    'uncheck to disable\nproject data in URLs': // gui.js:2921
        '\u5173\uFF1A\u7F51\u5740\u4E0D\u643A\u5E26\u9879\u76EE\u6570\u636E',
    'check to enable\nproject data in URLs': // gui.js:2922
        '\u5F00\uFF1A\u7F51\u5740\u643A\u5E26\u9879\u76EE\u6570\u636E',
    'Sprite Nesting': // gui.js:2926
        '\u89D2\u8272\u7EC4\u5408',
    'uncheck to disable\nsprite composition': // gui.js:2932
        '\u5173\uFF1A\u4E0D\u5141\u8BB8\u89D2\u8272\u7EC4\u5408',
    'check to enable\nsprite composition': // gui.js:2933
        '\u5F00\uFF1A\u5141\u8BB8\u89D2\u8272\u7EC4\u5408',
    'First-Class Sprites': // gui.js:2937
        '\u9AD8\u7B49\u89D2\u8272',
    'uncheck to disable support\nfor first-class sprites': // gui.js:2946
        '\u5173\uFF1A\u4E0D\u4F7F\u7528\u9AD8\u7B49\u89D2\u8272',
    'check to enable support\nfor first-class sprite': // gui.js:2947
        '\u5F00\uFF1A\u4F7F\u7528\u9AD8\u7B49\u89D2\u8272',
    'Keyboard Editing': // gui.js:2951
        '\u952E\u76D8\u7F16\u8F91',
    'uncheck to disable\nkeyboard editing support': // gui.js:2963
        '\u5173\uFF1A\u4E0D\u4F7F\u7528\u952E\u76D8\u7F16\u8F91',
    'check to enable\nkeyboard editing support': // gui.js:2964
        '\u5F00\uFF1A\u4F7F\u7528\u952E\u76D8\u7F16\u8F91',
    'Table support': // gui.js:2968
        '\u4F7F\u7528\u8868\u683C\u529F\u80FD',
    'uncheck to disable\nmulti-column list views': // gui.js:2979
        '\u5173\uFF1A\u4E0D\u4F7F\u7528\u591A\u680F(\u59822\u7EF4)\u5217\u8868',
    'check for multi-column\nlist view support': // gui.js:2980
        '\u5F00\uFF1A\u4F7F\u7528\u591A\u680F(\u59822\u7EF4)\u5217\u8868',
    'Table lines': // gui.js:2985
        '\u8868\u683C\u7EBF',
    'uncheck for less contrast\nmulti-column list views': // gui.js:2996
        '\u5173\uFF1A\u6D45\u8272\u8868\u683C\u7EBF',
    'check for higher contrast\ntable views': // gui.js:2997
        '\u5F00\uFF1A\u6DF1\u8272\u8868\u683C\u7EBF',
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
        '\u7EBF\u7A0B\u5B89\u5168\u7684\u811A\u672C',
    'uncheck to allow\nscript reentrance': // gui.js:3035
        '\u5173\uFF1A\u5141\u8BB8\u811A\u672C\u91CD\u5165',
    'check to disallow\nscript reentrance': // gui.js:3036
        '\u5F00\uFF1A\u4E0D\u5141\u8BB8\u811A\u672C\u91CD\u5165',
    'Prefer smooth animations': // gui.js:3039
        '\u52A8\u753B\u5C3D\u53EF\u80FD\u5E73\u6ED1',
    'uncheck for greater speed\nat variable frame rates': // gui.js:3042
        '\u5173\uFF1A\u6539\u53D8\u5E27\u7387\u4FDD\u8BC1\u64AD\u653E\u901F\u5EA6\n(\u727A\u7272\u5E73\u6ED1\u7A0B\u5EA6)',
    'check for smooth, predictable\nanimations across computers': // gui.js:3043
        '\u5F00\uFF1A\u5E73\u6ED1\u5730\u663E\u793A\u52A8\u753B\n(\u727A\u7272\u64AD\u653E\u901F\u5EA6)',
    'Flat line ends': // gui.js:3047
        '\u5E73\u5934\u7EBF\u6761',
    'uncheck for round ends of lines': // gui.js:3053
        '\u5173\uFF1A\u7EBF\u6761\u7684\u7AEF\u70B9\u662F\u5706\u7684',
    'check for flat ends of lines': // gui.js:3054
        '\u5F00\uFF1A\u7EBF\u6761\u7684\u7AEF\u70B9\u662F\u5E73\u7684',
    'Codification support': // gui.js:3057
        '\u53EF\u8F6C\u6362\u6210\u4EE3\u7801',
    'uncheck to disable\nblock to text mapping features': // gui.js:3066
        '\u4E0D\u9009\uFF1A\u5173\u95ED\u79EF\u6728\u8F6C\u6587\u5B57\u7684\u529F\u80FD',
    'check for block\nto text mapping features': // gui.js:3067
        '\u5F00\uFF1A\u6253\u5F00\u79EF\u6728\u8F6C\u6587\u5B57\u7684\u529F\u80FD',
    'Inheritance support': // gui.js:3071
        '\u6BCD\u5B50\u89D2\u8272(\u7EE7\u627F)',
    'uncheck to disable\nsprite inheritance features': // gui.js:3080
        '\u5173\uFF1A\u89D2\u8272\u4E0D\u53EF\u4EE5\u7EE7\u627F',
    'check for sprite\ninheritance features': // gui.js:3081
        '\u5F00\uFF1A\u89D2\u8272\u53EF\u4EE5\u7EE7\u627F',
    'Persist linked sublist IDs': // gui.js:3085
        '\u4FDD\u5B58\u5B50\u5217\u8868ID',
    'uncheck to disable\nsaving linked sublist identities': // gui.js:3091
        '\u5173\uFF1A\u4E0D\u4FDD\u5B58\u5B50\u5217\u8868\u7684ID',
    'check to enable\nsaving linked sublist identities': // gui.js:3092
        '\u5F00\uFF1A\u4FDD\u5B58\u5B50\u5217\u8868\u7684ID',
    'Project notes': // gui.js:3107
        '\u9879\u76EE\u5907\u6CE8',
    'New': // gui.js:3109
        '\u65B0\u5EFA',
    'Open': // gui.js:3110 gui.js:5924
        '\u6253\u5F00',
    'Save': // gui.js:3111 gui.js:5927 gui.js:8995 gui.js:9133
        '\u4FDD\u5B58',
    'Save As': // gui.js:3112
        '\u53E6\u5B58\u4E3A',
    'Import': // gui.js:3115 gui.js:3370 gui.js:6842
        '\u5BFC\u5165',
    'load an exported project file\nor block library, a costume\nor a sound': // gui.js:3146
        '\u52A0\u8F7D\u5BFC\u51FA\u7684\u9879\u76EE\u3001\u79EF\u6728\u5E93\u3001\u9020\u578B\u6216\u58F0\u97F3',
    'Export project (in a new window)': // gui.js:3153
        '\u5BFC\u51FA\u9879\u76EE (\uFF08\u6253\u5F00\u65B0\u7A97\u53E3\uFF09)',
    'show project data as XML\nin a new browser window': // gui.js:3164
        '\u6253\u5F00\u65B0\u7A97\u53E3\uFF0C\u5C55\u793A\u9879\u76EE\u7684XML\u6570\u636E',
    'Export project as plain text': // gui.js:3170
        '\u7528\u6587\u5B57\u683C\u5F0F\u5BFC\u51FA\u9879\u76EE',
    'Export project': // gui.js:3171
        '\u5BFC\u51FA\u9879\u76EE',
    'save project data as XML\nto your downloads folder': // gui.js:3181
        '\u628A\u9879\u76EE\u6570\u636E\u4EE5XML\u683C\u5F0F\n\u4FDD\u5B58\u5230\u4E0B\u8F7D\u6587\u4EF6\u5939',
    'show global custom block definitions as XML\nin a new browser window': // gui.js:3189
        '\u6253\u5F00\u65B0\u7A97\u53E3\uFF0C\u4EE5XML\u683C\u5F0F\u5C55\u793A\u5168\u5C40\u81EA\u5236\u79EF\u6728',
    'Unused blocks': // gui.js:3193
        '\u6CA1\u7528\u5230\u7684\u79EF\u6728',
    'find unused global custom blocks\nand remove their definitions': // gui.js:3195
        '\u67E5\u627E\u6CA1\u7528\u5230\u7684\u5168\u5C40\u81EA\u5236\u79EF\u6728\uFF0C\n\u5220\u9664\u5B83\u4EEC\u7684\u5B9A\u4E49',
    'Export summary': // gui.js:3201
        '\u5BFC\u51FA\u9879\u76EE\u603B\u7ED3',
    'open a new browser browser window\nwith a summary of this project': // gui.js:3203
        '\u6253\u5F00\u65B0\u7A97\u53E3\uFF0C\u5C55\u793A\u8FD9\u4E2A\u9879\u76EE\u7684\u603B\u7ED3',
    'Export summary with drop-shadows': // gui.js:3208
        '\u5BFC\u51FA\u9879\u76EE\u603B\u7ED3\uFF08\u5E26\u9634\u5F71\uFF09',
    'open a new browser browser window\nwith a summary of this project\nwith drop-shadows on all pictures.\nnot supported by all browsers': // gui.js:3210
        '\u6253\u5F00\u65B0\u7A97\u53E3\uFF0C\u4F7F\u7528\u5E26\u6709\u9634\u5F71\u7684\u56FE\u5F62\n\u5C55\u793A\u8FD9\u4E2A\u9879\u76EE\u7684\u603B\u7ED3\n\uFF08\u53EA\u6709\u90E8\u5206\u6D4F\u89C8\u5668\u53EF\u4EE5\uFF09',
    'Export all scripts as pic': // gui.js:3217
        '\u628A\u6240\u6709\u811A\u672C\u5BFC\u51FA\u4E3A\u56FE\u7247',
    'show a picture of all scripts\nand block definitions': // gui.js:3219
        '\u628A\u6240\u6709\u811A\u672C\u548C\u79EF\u6728\u8BBE\u8BA1\u56FE\u5C55\u793A\u6210\u4E00\u5F20\u56FE\u7247',
    'Import tools': // gui.js:3226
        '\u5BFC\u5165\u5DE5\u5177\u5305',
    'load the official library of\npowerful blocks': // gui.js:3235
        '\u8F7D\u5165\u5F3A\u5927\u7684\u5B98\u65B9\u79EF\u6728\u5E93',
    'Libraries': // gui.js:3238
        '\u79EF\u6728\u5E93',
    'select categories of additional blocks to add to this project': // gui.js:3248
        '\u6311\u9009\u66F4\u591A\u79EF\u6728\uFF0C\u6DFB\u52A0\u5230\u9879\u76EE\u4E2D\u3002',
    'Select a costume from the media library': // gui.js:3259
        '\u4ECE\u5A92\u4F53\u5E93\u4E2D\u6311\u9009\u4E00\u4E2A\u9020\u578B',
    'Select a sound from the media library': // gui.js:3266
        '\u4ECE\u5A92\u4F53\u5E93\u4E2D\u6311\u9009\u4E00\u4E2A\u58F0\u97F3',
    'Opening {{ resource }}': // gui.js:3341
        undefined,
    'License': // gui.js:3529 gui.js:3630
        '\u8BB8\u53EF\u534F\u8BAE',
    'Contributors': // gui.js:3548
        '\u8D21\u732E\u8005\uFF1A',
    'current module versions': // gui.js:3574
        '\u76EE\u524D\u6A21\u5757\u7684\u7248\u672C\uFF1A',
    'Translations': // gui.js:3578
        '\u7FFB\u8BD1\u8005',
    'About Snap': // gui.js:3581
        '\u5173\u4E8E Snap',
    'Translators': // gui.js:3597
        '\u7FFB\u8BD1\u8005',
    'Back': // gui.js:3613
        '\u8FD4\u56DE',
    'Modules': // gui.js:3646
        '\u6A21\u5757',
    'Credits': // gui.js:3662
        '\u5149\u8363\u699C',
    'Project Notes': // gui.js:3709
        '\u9879\u76EE\u5907\u6CE8',
    'Saving': // gui.js:3770
        undefined,
    'Saved': // gui.js:3788 gui.js:3796
        '\u5DF2\u4FDD\u5B58',
    'Save failed': // gui.js:3790
        undefined,
    'Exporting': // gui.js:3811 gui.js:5464 gui.js:5493 gui.js:5503 gui.js:5521 gui.js:5533
        undefined,
    'Exported': // gui.js:3816 gui.js:5471 gui.js:5497 gui.js:5507 gui.js:5527 gui.js:5539
        '\u5BFC\u51FA\u597D\u4E86',
    'Export failed': // gui.js:3819 gui.js:5475 gui.js:5500 gui.js:5530
        undefined,
    'this project doesn\'t have any\ncustom global blocks yet': // gui.js:3836
        '\u8FD9\u4E2A\u9879\u76EE\u6CA1\u6709\u5305\u542B\u5168\u5C40\u6027\u7684\u81EA\u5236',
    'there are currently no unused\nglobal custom blocks in this project': // gui.js:3873
        '\u8FD9\u4E2A\u9879\u76EE\u91CC\u76EE\u524D\u6CA1\u6709\n\u6CA1\u7528\u5230\u7684\u5168\u5C40\u81EA\u5236\u79EF\u6728',
    'Untitled': // gui.js:3937 gui.js:8190 store.js:368 store.js:1651
        '\u65E0\u540D\u9879\u76EE',
    'Variables': // gui.js:3968 objects.js:153
        '\u53D8\u91CF',
    'Blocks': // gui.js:4000
        '\u79EF\u6728',
    'Contents': // gui.js:4103
        '\u5185\u5BB9',
    'Kind of {{ name }}': // gui.js:4132
        '\u7C7B\u578B\uFF1A{{ name }}',
    'Part of {{ name }}': // gui.js:4139
        '\u5C5E\u4E8E\uFF1A{{ name }}',
    'Parts': // gui.js:4144
        '\u7EC4\u4EF6',
    'For all Sprites': // gui.js:4197 gui.js:4201
        '\u5BF9\u6240\u6709\u89D2\u8272',
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
        '\u8FDB\u5165\u7528\u6237\u6A21\u5F0F',
    'entering development mode.\n\nerror catching is turned off,\nuse the browser\'s web console\nto see error messages.': // gui.js:4604
        '\u8FDB\u5165\u5F00\u53D1\u6A21\u5F0F\u3002\n\n\u9519\u8BEF\u6355\u6349\u5DF2\u5173\u95ED\uFF0C\u8BF7\u4F7F\u7528\n\u6D4F\u89C8\u5668\u63A7\u5236\u53F0\u67E5\u770B\u9519\u8BEF\u6D88\u606F\u3002',
    'Replace the current project with a new one?': // gui.js:4914
        '\u4F60\u8981\u653E\u5F03\u6B63\u5728\u7F16\u8F91\u7684\u9879\u76EE\uFF0C\u91CD\u65B0\u5F00\u59CB\u5417\uFF1F',
    'New Project': // gui.js:4915
        '\u65B0\u5EFA\u9879\u76EE',
    'Generating {{ filename }} file': // gui.js:5011
        undefined,
    'Could not generate the language file': // gui.js:5039
        undefined,
    'build': // gui.js:5057
        '\u5EFA\u7ACB',
    'your own': // gui.js:5060
        '\u4F60\u81EA\u5DF1',
    'blocks': // gui.js:5064
        '\u79EF\u6728',
    'normal (1x)': // gui.js:5106
        '\u6807\u51C6 (1x)',
    'demo (1.2x)': // gui.js:5107
        '\u6F14\u793A (1.2\u500D)',
    'presentation (1.4x)': // gui.js:5108
        '\u5E7B\u706F\u7247 (1.4x)',
    'big (2x)': // gui.js:5109
        '\u5927(2x)',
    'huge (4x)': // gui.js:5110
        '\u8D85\u5927 (4x)',
    'giant (8x)': // gui.js:5111
        '\u5DE8\u5927 (8x)',
    'monstrous (10x)': // gui.js:5112
        '\u65E0\u654C (10x)',
    'Stage width': // gui.js:5166
        '\u821E\u53F0\u5BBD\u5EA6',
    'Stage height': // gui.js:5167
        '\u821E\u53F0\u9AD8\u5EA6',
    '{{ count }} days left': // gui.js:5253
        undefined,
    'You are now logged in, and your account\nis enabled for three days.\nPlease use the verification link that\nwas sent to your email address when you\nsigned up.\n\nIf you cannot find that email, please\ncheck your spam folder. If you still\ncannot find it, please use the "Resend\nVerification Email..." option in the cloud\nmenu.\n\nYou have {{ count }} days left.': // gui.js:5254
        undefined,
    'Sign in': // gui.js:5277
        '\u767B\u5F55',
    'stay signed in on this computer\nuntil logging out': // gui.js:5283
        '\u4FDD\u6301\u767B\u5F55\uFF0C\u76F4\u5230\u767B\u51FA',
    'You can now log in': // gui.js:5305
        undefined,
    'Sign up': // gui.js:5314
        '\u6CE8\u518C',
    'Terms of Service': // gui.js:5317
        '\u670D\u52A1\u6761\u6B3E',
    'Privacy': // gui.js:5319
        '\u9690\u79C1\u653F\u7B56',
    'I have read and agree\nto the Terms of Service': // gui.js:5320
        '\u6211\u5DF2\u9605\u8BFB\u5E76\u540C\u610F\u300A\u670D\u52A1\u6761\u6B3E\u300B',
    'An e-mail with a link to\nreset your password\nhas been sent to the address provided': // gui.js:5340
        '\u91CD\u8BBE\u5BC6\u7801\u7684\u7F51\u5740\u5DF2\u53D1\u5F80\u4F60\u7684\u7535\u5B50\u90AE\u4EF6\u5730\u5740',
    'Reset password': // gui.js:5352
        '\u91CD\u8BBE\u5BC6\u7801',
    'An e-mail with a link to\nverify your account\nhas been sent to the address provided': // gui.js:5378
        undefined,
    'Resend verification email': // gui.js:5390
        undefined,
    'password has been changed': // gui.js:5414
        '\u5BC6\u7801\u6539\u597D\u4E86',
    'disconnected': // gui.js:5437 gui.js:5440
        '\u5DF2\u7ECF\u4ECE\u4E91\u7AEF\u767B\u51FA',
    'Saving project\nto the cloud': // gui.js:5448 gui.js:6476
        '\u628A\u9879\u76EE\u4FDD\u5B58\u5230\u4E91\u7AEF',
    'saved': // gui.js:5452 gui.js:6481
        '\u9879\u76EE\u5DF2\u4FDD\u5B58',
    '{{ projectName }} media': // gui.js:5468
        undefined,
    'Cloud Connection': // gui.js:5552
        undefined,
    'Successfully connected to\n{{ url }}': // gui.js:5553
        undefined,
    '{{ server }} (secure)': // gui.js:5646
        undefined,
    'Save Project': // gui.js:5799
        '\u4FDD\u5B58\u9879\u76EE',
    'Open Project': // gui.js:5800
        '\u6253\u5F00\u9879\u76EE',
    'Cloud': // gui.js:5836
        '\u4E91\u7AEF',
    'Browser': // gui.js:5837
        '\u6D4F\u89C8\u5668',
    'Examples': // gui.js:5840 gui.js:6198 gui.js:6254 gui.js:6378
        '\u4F8B\u5B50',
    'Share': // gui.js:5930
        '\u5206\u4EAB',
    'Unshare': // gui.js:5931
        '\u4E0D\u5206\u4EAB',
    '(no matches)': // gui.js:6095
        undefined,
    'Updating\nproject list': // gui.js:6119
        '\u6B63\u5728\u66F4\u65B0\u9879\u76EE\u5217\u8868',
    'last changed\n{{ date }}': // gui.js:6314
        '\u6700\u540E\u4FEE\u6539\n{{ date }}',
    'Are you sure you want to replace\n"{{ projectName }}"?': // gui.js:6436 gui.js:6454
        undefined,
    'Replace Project': // gui.js:6438 gui.js:6456
        undefined,
    'Are you sure you want to delete\n"{{ projectName }}"?': // gui.js:6498 gui.js:6522
        '\u4F60\u786E\u5B9A\u8981\u5220\u9664\n"{{ projectName }}"?',
    'Delete Project': // gui.js:6500 gui.js:6524
        '\u5220\u9664\u9879\u76EE',
    'Are you sure you want to share\n"{{ projectName }}"?': // gui.js:6542
        undefined,
    'Share Project': // gui.js:6544
        '\u5206\u4EAB\u9879\u76EE',
    'sharing\nproject': // gui.js:6546
        '\u6B63\u5728\u5206\u4EAB\u9879\u76EE',
    'shared': // gui.js:6563
        '\u9879\u76EE\u5DF2\u5206\u4EAB\u7ED9\u5176\u4ED6\u4EBA',
    'Are you sure you want to unshare\n"{{ projectName }}"?': // gui.js:6590
        undefined,
    'Unshare Project': // gui.js:6592
        '\u4E0D\u5206\u4EAB\u9879\u76EE',
    'unsharing\nproject': // gui.js:6594
        '\u6B63\u5728\u53D6\u6D88\u9879\u76EE\u5206\u4EAB',
    'unshared': // gui.js:6612
        '\u5176\u4ED6\u4EBA\u5DF2\u770B\u4E0D\u5230\u9879\u76EE',
    'Are you sure you want to publish\n"{{ projectName }}"?': // gui.js:6632
        '\u786E\u5B9A\u8BA9\u5176\u4ED6\u4EBA\u770B\u5230\u9879\u76EE\n"{{ projectName }}"?',
    'Publish Project': // gui.js:6634
        undefined,
    'publishing\nproject': // gui.js:6636
        undefined,
    'published': // gui.js:6651
        undefined,
    'Are you sure you want to unpublish\n"{{ projectName }}"?': // gui.js:6677
        '\u786E\u5B9A\u4E0D\u8BA9\u5176\u4ED6\u4EBA\u770B\u5230\u9879\u76EE\n"{{ projectName }}"?',
    'Unpublish Project': // gui.js:6679
        undefined,
    'unpublishing\nproject': // gui.js:6681
        undefined,
    'unpublished': // gui.js:6696
        undefined,
    'Import library': // gui.js:6828
        '\u5BFC\u5165\u79EF\u6728\u5E93',
    'Loading {{ resource }}': // gui.js:6926 gui.js:7059
        undefined,
    'Imported {{ resource }}': // gui.js:7054
        undefined,
    'pic': // gui.js:7353 morphic.js:4194 objects.js:7425
        '\u5C55\u793A\u56FE\u7247',
    'open a new window\nwith a picture of the stage': // gui.js:7361 objects.js:7432
        '\u6253\u5F00\u4E00\u4E2A\u65B0\u7A97\u53E3\uFF0C\u663E\u793A\u821E\u53F0\u7684\u56FE\u7247',
    'show': // gui.js:7366 morphic.js:7568 objects.js:388
        '\u663E\u793A',
    'clone': // gui.js:7370 objects.js:3238
        undefined,
    'release': // gui.js:7388
        undefined,
    'make temporary and\nhide in the sprite corral': // gui.js:7390
        undefined,
    'detach from {{ name }}': // gui.js:7396 objects.js:3266
        '\u8131\u79BB {{ name }}',
    'detach all parts': // gui.js:7402 objects.js:3271
        '\u62C6\u9664\u6240\u6709\u7EC4\u4EF6',
    'export': // gui.js:7406 gui.js:7713 objects.js:3273 objects.js:9542
        '\u5BFC\u51FA',
    'edit rotation point only': // gui.js:7702
        '\u4FEE\u6539\u65CB\u8F6C\u4E2D\u5FC3\u70B9',
    'rename costume': // gui.js:7755
        '\u7ED9\u9020\u578B\u6539\u540D',
    'rename background': // gui.js:7756
        undefined,
    'default': // gui.js:7893
        undefined,
    'pen': // gui.js:7975 morphic.js:12402
        '\u753B\u7B14',
    'tip': // gui.js:7982
        '\u5C16\u7AEF',
    'middle': // gui.js:7991
        '\u4E2D\u95F4',
    'Paint a new costume': // gui.js:8085
        '\u753B\u4E00\u4E2A\u65B0\u9020\u578B',
    'Import a new costume from your webcam': // gui.js:8110
        undefined,
    'import a picture from another web page or from\na file on your computer by dropping it here': // gui.js:8134
        '\u628A\u7F51\u9875\u6216\u7535\u8111\u4E2D\u7684\u56FE\u7247\u62D6\u5230\u8FD9\u91CC\uFF0C\u53EF\u4EE5\u6DFB\u52A0\u4E00\u4E2A\u9020\u578B',
    'Stop': // gui.js:8345 gui.js:8367
        '\u505C\u6B62',
    'Play': // gui.js:8345 gui.js:8375
        '\u64AD\u653E',
    'Play sound': // gui.js:8348 gui.js:8376
        '\u64AD\u653E\u58F0\u97F3',
    'Stop sound': // gui.js:8368
        '\u505C\u6B62\u58F0\u97F3',
    'rename sound': // gui.js:8432
        '\u7ED9\u58F0\u97F3\u6539\u540D',
    'import a sound from your computer\nby dragging it into here': // gui.js:8526
        '\u628A\u7535\u8111\u4E2D\u7684\u58F0\u97F3\u6587\u4EF6\u62D6\u5230\u8FD9\u91CC\uFF0C\u53EF\u4EE5\u6DFB\u52A0\u4E00\u4E2A\u58F0\u97F3',
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
        '\u9879',
    'length': // lists.js:492 lists.js:703
        '\u957F\u5EA6\uFF1A',
    'table view': // lists.js:807
        '\u5C55\u793A\u4E3A\u8868\u683C',
    'open in dialog': // lists.js:810 tables.js:1036
        '\u5728\u5BF9\u8BDD\u6846\u4E2D\u67E5\u770B',
    'Retina Display Support Problem': // morphic.js:1614
        undefined,
    'Called {{ function }} with {{ count }} arguments': // morphic.js:1676
        undefined,
    'a {{ className }}[{{ count }}]': // morphic.js:2681
        undefined,
    'a {{ className }} {{ count }} {{ bounds }}': // morphic.js:2904
        undefined,
    'user features': // morphic.js:4128
        '\u7528\u6237\u83DC\u5355',
    'choose another color\nfor this morph': // morphic.js:4141
        '\u6307\u5B9Amorph\u7684\u989C\u8272',
    'transparency': // morphic.js:4144
        '\u900F\u660E\u5EA6',
    'alpha value': // morphic.js:4147
        'alpha\u901A\u9053\u503C\uFF1A',
    'set this morph\'s\nalpha value': // morphic.js:4157
        '\u8BBE\u7F6Emorph\u7684alpha\u901A\u9053\u503C',
    'resize': // morphic.js:4160
        '\u6539\u53D8\u5927\u5C0F',
    'show a handle\nwhich can be dragged\nto change this morph\'s extent': // morphic.js:4162
        '\u663E\u793A\u4E00\u4E2A\u628A\u624B\uFF0C\n\u62D6\u52A8\u53EF\u6539\u53D8morph\u5927\u5C0F',
    'pick up': // morphic.js:4174
        '\u6293\u8D77',
    'detach and put\ninto the hand': // morphic.js:4176
        '\u65AD\u5F00\u8FDE\u63A5\u62FF\u8D77morph',
    'attach': // morphic.js:4179
        '\u8FDE\u63A5\u5230',
    'stick this morph\nto another one': // morphic.js:4181
        '\u8FDE\u63A5\u5230\u53E6\u5916\u4E00\u4E2Amorph',
    'move': // morphic.js:4184 objects.js:3243
        '\u79FB\u52A8',
    'show a handle\nwhich can be dragged\nto move this morph': // morphic.js:4186
        '\u663E\u793A\u4E00\u4E2A\u628A\u624B\uFF0C\n\u62D6\u52A8\u53EF\u79FB\u52A8\u8FD9\u4E2Amorph',
    'inspect': // morphic.js:4189 morphic.js:7608 morphic.js:12183
        '\u67E5\u770B',
    'open a window\non all properties': // morphic.js:4191
        '\u6253\u5F00\u67E5\u770B\u5668\u7A97\u53E3\n\u663E\u793A\u6240\u6709\u5C5E\u6027',
    'open a new window\nwith a picture of this morph': // morphic.js:4198 morphic.js:12192
        '\u6253\u5F00\u65B0\u7A97\u53E3\n\u5C55\u793A\u8FD9\u4E2Amorph\u7684\u56FE\u7247',
    'lock': // morphic.js:4203
        '\u9501\u5B9A',
    'make this morph\nunmovable': // morphic.js:4205
        '\u56FA\u5B9Amorph\u4E0D\u53EF\u79FB\u52A8',
    'unlock': // morphic.js:4209
        '\u89E3\u9501',
    'make this morph\nmovable': // morphic.js:4211
        '\u53EF\u4EE5\u79FB\u52A8morph',
    'World': // morphic.js:4219
        'World',
    'show the\n{{ WorldMorph }}\'s menu': // morphic.js:4223
        '\u663E\u793A{{ WorldMorph }}\u83DC\u5355',
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
        '\u8FB9\u6846\u7C97\u7EC6',
    'set the border\'s\nline size': // morphic.js:5908
        '\u8BBE\u7F6E\u8FB9\u6846\u7EBF\u6761\u5C3A\u5BF8',
    'border color': // morphic.js:5911 morphic.js:5914
        '\u8FB9\u6846\u989C\u8272',
    'set the border\'s\nline color': // morphic.js:5920
        '\u8BBE\u7F6E\u8FB9\u6846\u7EBF\u6761\u989C\u8272',
    'corner size': // morphic.js:5923 morphic.js:5926
        '\u5706\u89D2\u5927\u5C0F',
    'set the corner\'s\nradius': // morphic.js:5936
        '\u8BBE\u7F6E\u5706\u89D2\u534A\u5F84',
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
        '\u53D6\u6D88\u81EA\u6709\u5C5E\u6027\u6807\u8BB0',
    'mark own': // morphic.js:7595
        '\u6807\u8BB0\u81EA\u6709\u5C5E\u6027',
    'highlight\n\'own\' properties': // morphic.js:7600
        undefined,
    'in new inspector': // morphic.js:7614
        '\u65B0\u7A97\u53E3',
    'here': // morphic.js:7627
        '\u6B64\u7A97\u53E3',
    '{{ name }}\nis not inspectable': // morphic.js:7635
        undefined,
    'save': // morphic.js:7653
        '\u4FDD\u5B58',
    'accept changes': // morphic.js:7653
        undefined,
    'add property': // morphic.js:7655
        '\u589E\u52A0\u5C5E\u6027',
    'remove': // morphic.js:7657
        '\u5220\u9664',
    'close': // morphic.js:7664 morphic.js:7948
        '\u5173\u95ED',
    'new property name': // morphic.js:7789
        '\u65B0\u5C5E\u6027\u540D\uFF1A',
    'property': // morphic.js:7802
        undefined,
    'property name': // morphic.js:7810
        '\u5C5E\u6027\u540D\uFF1A',
    'font size': // morphic.js:8732 morphic.js:8735 morphic.js:9479 morphic.js:9482
        '\u5B57\u4F53\u5927\u5C0F',
    'set this String\'s\nfont point size': // morphic.js:8745
        '\u8BBE\u7F6E\u5B57\u7B26\u4E32\u7684\u5B57\u4F53\u70B9\u6570',
    'serif': // morphic.js:8748 morphic.js:9505
        '\u886C\u7EBF\u5B57\u4F53',
    'sans-serif': // morphic.js:8751 morphic.js:9508
        '\u65E0\u886C\u7EBF\u5B57\u4F53',
    'normal weight': // morphic.js:8754 morphic.js:9511
        '\u6B63\u5E38\u7C97\u7EC6',
    'bold': // morphic.js:8756 morphic.js:9513
        '\u7C97\u4F53',
    'normal style': // morphic.js:8759 morphic.js:9516
        '\u76F4\u4F53',
    'italic': // morphic.js:8761 morphic.js:9518
        '\u659C\u4F53',
    'hide blanks': // morphic.js:8764
        '\u9690\u85CF\u7A7A\u683C',
    'show blanks': // morphic.js:8766
        '\u663E\u793A\u7A7A\u683C',
    'show characters': // morphic.js:8769
        '\u663E\u793A\u5B57\u7B26',
    'hide characters': // morphic.js:8771
        '\u9690\u85CF\u5B57\u7B26',
    'set this Text\'s\nfont point size': // morphic.js:9492
        undefined,
    'align left': // morphic.js:9495
        '\u9760\u5DE6',
    'align right': // morphic.js:9498
        '\u9760\u53F3',
    'align center': // morphic.js:9501
        '\u5C45\u4E2D',
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
        '\u5168\u90E8\u56F4\u4F4F',
    'keep all submorphs\nwithin and visible': // morphic.js:10305 morphic.js:12180
        '\u56F4\u5165\u6240\u6709\u5B50morph\n\u5168\u90E8\u53EF\u89C1',
    'auto line wrap off': // morphic.js:10685
        '\u4E0D\u81EA\u52A8\u6298\u884C',
    'turn automatic\nline wrapping\noff': // morphic.js:10687
        '\u5173\u95ED\u81EA\u52A8\u6298\u884C\u529F\u80FD',
    'auto line wrap on': // morphic.js:10691
        '\u81EA\u52A8\u6298\u884C',
    'enable automatic\nline wrapping': // morphic.js:10693
        '\u6253\u5F00\u81EA\u52A8\u6298\u884C\u529F\u80FD',
    '(empty)': // morphic.js:10781
        '(\u7A7A\u7684)',
    'Are you sure you want to leave?': // morphic.js:12110
        undefined,
    'demo': // morphic.js:12173
        '\u6F14\u793A',
    'sample morphs': // morphic.js:12173
        '\u5404\u79CDmorph\u793A\u4F8B',
    'hide all': // morphic.js:12175
        '\u5168\u90E8\u9690\u85CF',
    'show all': // morphic.js:12176 objects.js:7423
        '\u663E\u793A\u6240\u6709',
    'open a window on\nall properties': // morphic.js:12185
        undefined,
    'screenshot': // morphic.js:12188 objects.js:413
        '\u5C4F\u5E55\u622A\u56FE',
    'restore display': // morphic.js:12196
        '\u6062\u590D\u663E\u793A',
    'redraw the\nscreen once': // morphic.js:12198
        '\u91CD\u753B\u5C4F\u5E55',
    'fill page': // morphic.js:12201
        '\u586B\u6EE1\u9875\u9762',
    'let the World automatically\nadjust to browser resizing': // morphic.js:12203
        '\u8BA9World\u968F\u6D4F\u89C8\u5668\u6539\u53D8\u5927\u5C0F',
    'sharp shadows': // morphic.js:12207
        '\u9510\u5229\u7684\u9634\u5F71',
    'sharp drop shadows\nuse for old browsers': // morphic.js:12209
        '\u5BF9\u8001\u65E7\u6D4F\u89C8\u5668\n\u4F7F\u7528\u9510\u5229\u7684\u9634\u5F71',
    'blurred shadows': // morphic.js:12213
        '\u6A21\u7CCA\u7684\u9634\u5F71',
    'blurry shades\nuse for new browsers': // morphic.js:12215
        '\u5BF9\u65B0\u6D4F\u89C8\u5668\n\u4F7F\u7528\u6A21\u7CCA\u7684\u9634\u5F71',
    'choose the World\'s\nbackground color': // morphic.js:12228
        '\u9009\u62E9World\u7684\u80CC\u666F\u989C\u8272',
    'touch screen settings': // morphic.js:12232
        '\u9002\u5408\u89E6\u6478\u5C4F',
    'bigger menu fonts\nand sliders': // morphic.js:12234
        '\u4F7F\u7528\u5927\u53F7\u83DC\u5355\u5B57\u4F53\u548C\u6E38\u6807',
    'standard settings': // morphic.js:12238
        '\u9002\u5408\u666E\u901A\u5C4F\u5E55',
    'smaller menu fonts\nand sliders': // morphic.js:12240
        '\u4F7F\u7528\u5C0F\u53F7\u83DC\u5355\u5B57\u4F53\u548C\u6E38\u6807',
    'user mode': // morphic.js:12247
        '\u7528\u6237\u6A21\u5F0F',
    'disable developers\'\ncontext menus': // morphic.js:12249
        '\u7981\u7528\u5F00\u53D1\u8005\u5FEB\u6377\u83DC\u5355',
    'about {{ resource }}': // morphic.js:12254
        '\u5173\u4E8E{{ resource }}',
    'make a morph': // morphic.js:12266
        '\u521B\u5EFAmorph',
    'rectangle': // morphic.js:12267 symbols.js:109
        '\u77E9\u5F62',
    'box': // morphic.js:12270
        '\u5706\u89D2\u6846',
    'circle box': // morphic.js:12273
        '\u5706\u5934\u6846',
    'slider': // morphic.js:12277 objects.js:9461
        '\u6E38\u6807',
    'dial': // morphic.js:12280
        undefined,
    'frame': // morphic.js:12284
        '\u6846\u67B6',
    'scroll frame': // morphic.js:12289
        '\u53EF\u6EDA\u52A8\u6846\u67B6',
    'handle': // morphic.js:12296
        '\u628A\u624B',
    'string': // morphic.js:12300
        '\u5B57\u7B26\u4E32',
    'Hello, World!': // morphic.js:12301 morphic.js:12329
        undefined,
    'speech bubble': // morphic.js:12328
        '\u5BF9\u8BDD\u6C14\u6CE1',
    'gray scale palette': // morphic.js:12333
        '\u7070\u5EA6\u8C03\u8272\u677F',
    'color palette': // morphic.js:12336
        '\u5F69\u8272\u8C03\u8272\u677F',
    'color picker': // morphic.js:12339
        '\u989C\u8272\u9009\u62E9\u5668',
    'sensor demo': // morphic.js:12343
        '\u63A2\u6D4B\u5668\u6F14\u793A',
    'animation demo': // morphic.js:12353
        '\u52A8\u753B\u6F14\u793A',
    'modules': // morphic.js:12444
        undefined,
    'a lively Web GUI\ninspired by Squeak': // morphic.js:12451
        undefined,
    'written by {{ author }}\n{{ email }}': // morphic.js:12453
        undefined,
    'Motion': // objects.js:146
        '\u8FD0\u52A8',
    'Control': // objects.js:147
        '\u63A7\u5236',
    'Looks': // objects.js:148
        '\u5916\u89C2',
    'Sensing': // objects.js:149
        '\u63A2\u6D4B',
    'Sound': // objects.js:150 objects.js:8570
        '\u58F0\u97F3',
    'Operators': // objects.js:151
        '\u8FD0\u7B97',
    'Pen': // objects.js:152
        '\u753B\u7B14',
    'Lists': // objects.js:154
        '\u5217\u8868',
    'Other': // objects.js:155
        '\u5176\u4ED6',
    'move %n steps': // objects.js:201
        '\u79FB\u52A8 %n \u6B69',
    'turn %clockwise %n degrees': // objects.js:208
        '\u65CB\u8F6C %clockwise %n \u5EA6',
    'turn %counterclockwise %n degrees': // objects.js:215
        '\u65CB\u8F6C %counterclockwise %n \u5EA6',
    'point in direction %dir': // objects.js:222
        '\u9762\u5411 %dir \u5EA6',
    'point towards %dst': // objects.js:228
        '\u9762\u5411 %dst',
    'go to x: %n y: %n': // objects.js:234
        '\u79FB\u5230 x: %n y: %n',
    'go to %dst': // objects.js:241
        '\u79FB\u5230 %dst',
    'glide %n secs to x: %n y: %n': // objects.js:247
        '\u5728 %n \u79D2\u949F\u5185\u6ED1\u5230 x: %n y: %n',
    'change x by %n': // objects.js:254
        '\u628Ax\u5750\u6807\u589E\u52A0 %n',
    'set x to %n': // objects.js:261
        '\u628Ax\u5750\u6807\u8BBE\u5B9A\u4E3A %n',
    'change y by %n': // objects.js:268
        '\u628Ay\u5750\u6807\u589E\u52A0 %n',
    'set y to %n': // objects.js:275
        '\u628Ay\u5750\u6807\u8BBE\u5B9A\u4E3A %n',
    'if on edge, bounce': // objects.js:282
        '\u78B0\u5230\u8FB9\u7F18\u5C31\u53CD\u5F39',
    'switch to costume %cst': // objects.js:307
        '\u6362\u6210 %cst \u9020\u578B',
    'next costume': // objects.js:312
        '\u4E0B\u4E00\u4E2A\u9020\u578B',
    'say %s for %n secs': // objects.js:323
        '\u8BF4 %s %n \u79D2',
    'Hello!': // objects.js:324 objects.js:331
        '\u4F60\u597D\uFF01',
    'say %s': // objects.js:330
        '\u8BF4 %s',
    'think %s for %n secs': // objects.js:337
        '\u601D\u8003 %s %n \u79D2',
    'Hmm': // objects.js:338 objects.js:345
        '\u55EF\u2026',
    'think %s': // objects.js:344
        '\u601D\u8003 %s',
    'change %eff effect by %n': // objects.js:350
        '\u628A %eff \u6548\u679C\u589E\u52A0 %n',
    'set %eff effect to %n': // objects.js:356
        '\u628A %eff \u6548\u679C\u8BBE\u5B9A\u4E3A %n',
    'clear graphic effects': // objects.js:362
        '\u6E05\u9664\u6240\u6709\u56FE\u5F62\u6548\u679C',
    'change size by %n': // objects.js:368
        '\u628A\u89D2\u8272\u7684\u5927\u5C0F\u589E\u52A0 %n',
    'set size to %n %': // objects.js:375
        '\u628A\u89D2\u8272\u7684\u5927\u5C0F\u8BBE\u5B9A\u4E3A %n %',
    'go to front': // objects.js:400
        '\u79FB\u81F3\u6700\u4E0A\u5C42',
    'go back %n layers': // objects.js:406
        '\u4E0B\u79FB %n \u5C42',
    'save %imgsource as costume named %s': // objects.js:412
        '\u628A %imgsource \u4FDD\u5B58\u4E3A\u9020\u578B\uFF0C\u547D\u540D\u4E3A %s',
    'wardrobe': // objects.js:421
        '\u5168\u90E8\u9020\u578B',
    'alert %mult%s': // objects.js:428
        '\u8B66\u544A: %mult%s',
    'console log %mult%s': // objects.js:434
        '\u63A7\u5236\u53F0\u65E5\u5FD7 %mult%s',
    'play sound %snd': // objects.js:441
        '\u64AD\u653E\u58F0\u97F3 %snd',
    'play sound %snd until done': // objects.js:446
        '\u64AD\u653E\u58F0\u97F3 %snd \u76F4\u5230\u64AD\u653E\u5B8C\u6BD5',
    'stop all sounds': // objects.js:451
        '\u505C\u6B62\u6240\u6709\u58F0\u97F3',
    'rest for %n beats': // objects.js:456
        '\u505C\u6B62 %n \u62CD',
    'play note %note for %n beats': // objects.js:462
        undefined,
    'set instrument to %inst': // objects.js:468
        '\u5C06\u4E50\u5668\u8BBE\u5B9A\u4E3A %inst',
    'change tempo by %n': // objects.js:474
        '\u628A\u8282\u594F\u52A0\u5FEB %n',
    'set tempo to %n bpm': // objects.js:480
        '\u628A\u8282\u594F\u8BBE\u5B9A\u4E3A %n',
    'tempo': // objects.js:486
        '\u8282\u594F',
    'jukebox': // objects.js:494
        '\u5168\u90E8\u58F0\u97F3',
    'clear': // objects.js:501 paint.js:230
        '\u6E05\u7A7A',
    'pen down': // objects.js:507
        '\u843D\u7B14',
    'pen up': // objects.js:513
        '\u62AC\u7B14',
    'set pen color to %clr': // objects.js:519
        '\u628A\u753B\u7B14\u7684\u989C\u8272\u8BBE\u5B9A\u4E3A %clr',
    'change pen color by %n': // objects.js:525
        '\u628A\u753B\u7B14\u7684\u989C\u8272\u503C\u589E\u52A0 %n',
    'set pen color to %n': // objects.js:532
        '\u628A\u753B\u7B14\u7684\u989C\u8272\u503C\u8BBE\u5B9A\u4E3A %n',
    'change pen shade by %n': // objects.js:539
        '\u628A\u753B\u7B14\u7684\u8272\u5EA6\u589E\u52A0 %n',
    'set pen shade to %n': // objects.js:546
        '\u628A\u753B\u7B14\u7684\u8272\u5EA6\u8BBE\u5B9A\u4E3A %n',
    'change pen size by %n': // objects.js:553
        '\u628A\u753B\u7B14\u7684\u5927\u5C0F\u589E\u52A0 %n',
    'set pen size to %n': // objects.js:560
        '\u628A\u753B\u7B14\u7684\u5927\u5C0F\u8BBE\u5B9A\u4E3A %n',
    'stamp': // objects.js:567
        '\u56FE\u7AE0',
    'fill': // objects.js:573
        '\u586B\u5145',
    'when %greenflag clicked': // objects.js:585
        '\u5F53 %greenflag \u88AB\u70B9\u51FB',
    'when %keyHat key pressed': // objects.js:590
        '\u5F53\u6309\u4E0B %keyHat \u952E',
    'when I am %interaction': // objects.js:595
        '\u5F53 %interaction \u6211',
    'when I receive %msgHat': // objects.js:601
        '\u5F53\u63A5\u6536\u5230 %msgHat',
    'when %b': // objects.js:606
        '\u5F53 %b',
    'broadcast %msg': // objects.js:611
        '\u5E7F\u64AD %msg',
    'broadcast %msg and wait': // objects.js:616
        '\u5E7F\u64AD %msg \u5E76\u7B49\u5F85',
    'message': // objects.js:621
        '\u6D88\u606F',
    'wait %n secs': // objects.js:626
        '\u7B49\u5F85 %n \u79D2',
    'wait until %b': // objects.js:632
        '\u76F4\u5230 %b \u524D\u90FD\u7B49\u5F85',
    'forever %c': // objects.js:637
        '\u91CD\u590D\u6267\u884C %c',
    'repeat %n %c': // objects.js:642
        '\u91CD\u590D\u6267\u884C %n %c',
    'repeat until %b %c': // objects.js:648
        '\u91CD\u590D\u6267\u884C\u76F4\u5230 %b %c',
    'if %b %c': // objects.js:653
        '\u5982\u679C %b %c',
    'if %b %c else %c': // objects.js:658
        '\u5982\u679C %b %c \u5426\u5219 %c',
    'stop %stopChoices': // objects.js:678
        '\u505C\u6B62 %stopChoices',
    'run %cmdRing %inputs': // objects.js:693
        '\u8FD0\u884C %cmdRing %inputs',
    'launch %cmdRing %inputs': // objects.js:698
        '\u542F\u52A8 %cmdRing %inputs',
    'call %repRing %inputs': // objects.js:703
        '\u8C03\u7528 %repRing %inputs',
    'report %s': // objects.js:708
        '\u62A5\u544A %s',
    'run %cmdRing w/continuation': // objects.js:720
        '\u6301\u7EED\u8FD0\u884C %cmdRing',
    'call %cmdRing w/continuation': // objects.js:725
        '\u6301\u7EED\u8C03\u7528 %cmdRing',
    'warp %c': // objects.js:730
        '\u4E00\u6B65\u5B8C\u6210 %c',
    'tell %spr to %cmdRing %inputs': // objects.js:739
        '\u547D\u4EE4 %spr \u8FD0\u884C %cmdRing %inputs',
    'ask %spr for %repRing %inputs': // objects.js:744
        '\u8BF7\u6C42 %spr \u8FD4\u56DE %repRing %inputs',
    'when I start as a clone': // objects.js:752
        '\u5F53\u6211\u88AB\u514B\u9686',
    'create a clone of %cln': // objects.js:757
        '\u514B\u9686\u4E00\u4E2A %cln',
    'a new clone of %cln': // objects.js:762
        '%cln \u7684\u4E00\u4E2A\u65B0\u514B\u9686',
    'delete this clone': // objects.js:768
        '\u5220\u9664\u8FD9\u4E2A\u514B\u9686',
    'pause all %pause': // objects.js:776
        '\u6682\u505C\u6240\u6709\u7684 %pause',
    'touching %col ?': // objects.js:785
        '\u78B0\u5230 %col \uFF1F',
    'touching %clr ?': // objects.js:791
        '\u78B0\u5230\u989C\u8272 %clr \uFF1F',
    'color %clr is touching %clr ?': // objects.js:797
        '\u989C\u8272 %clr \u78B0\u5230\u989C\u8272 %clr \uFF1F',
    'filtered for %clr': // objects.js:803
        '\u7528 %clr \u8FC7\u6EE4\u9020\u578B',
    'stack size': // objects.js:809
        '\u5806\u6808\u5927\u5C0F',
    'frames': // objects.js:815
        '\u6808\u5E27\u5C42\u6570',
    'processes': // objects.js:821
        '\u8FDB\u7A0B\u6570\u91CF',
    'ask %s and wait': // objects.js:826
        '\u8BE2\u95EE %s \u5E76\u7B49\u5F85',
    'what\'s your name?': // objects.js:827
        '\u4F60\u7684\u540D\u5B57\uFF1F',
    'answer': // objects.js:833 objects.js:838
        '\u56DE\u7B54',
    'mouse x': // objects.js:843
        '\u9F20\u6807\u7684x\u5750\u6807',
    'mouse y': // objects.js:848
        '\u9F20\u6807\u7684y\u5750\u6807',
    'mouse down?': // objects.js:853
        '\u6309\u4E0B\u4E86\u9F20\u6807\uFF1F',
    'key %key pressed?': // objects.js:858
        '\u6309\u4E0B\u4E86 %key \u952E\uFF1F',
    '%rel to %dst': // objects.js:871
        undefined,
    'reset timer': // objects.js:877
        '\u8BA1\u65F6\u5668\u5F52\u96F6',
    'timer': // objects.js:883 objects.js:888
        '\u8BA1\u65F6\u5668',
    '%att of %spr': // objects.js:893
        '\u53D6 %att \u4E8E %spr',
    'url %s': // objects.js:899
        undefined,
    'turbo mode?': // objects.js:905
        '\u542F\u52A8\u4E86\u52A0\u901F\uFF1F',
    'set turbo mode to %b': // objects.js:910
        '\u8BBE\u7F6E\u52A0\u901F\u5F00\u5173\u4E3A %b',
    'current %dates': // objects.js:915
        '\u5F53\u524D\u7684 %dates',
    'my %get': // objects.js:920
        '\u6211\u7684 %get',
    'round %n': // objects.js:968
        '\u628A %n \u56DB\u820D\u4E94\u5165',
    '%fun of %n': // objects.js:973
        '%fun %n',
    '%n mod %n': // objects.js:979
        '%n \u9664\u4EE5 %n \u7684\u4F59\u6570',
    'pick random %n to %n': // objects.js:984
        '\u5728 %n \u5230 %n \u95F4\u968F\u673A\u9009\u4E00\u4E2A\u6570',
    '%b and %b': // objects.js:1005
        '%b \u4E14 %b',
    '%b or %b': // objects.js:1010
        '%b \u6216 %b',
    'not %b': // objects.js:1015
        '%b \u4E0D\u6210\u7ACB',
    'join %words': // objects.js:1033
        '\u628A %words \u8FDE\u8D77\u6765',
    'hello': // objects.js:1034 objects.js:1075
        '\u4F60\u597D',
    'world': // objects.js:1034 objects.js:1040 objects.js:1046 objects.js:1075
        '\u4E16\u754C',
    'letter %n of %s': // objects.js:1039
        '\u7B2C %n \u4E2A\u5B57\u7B26\u5728\u6587\u5B57 %s \u4E2D',
    'length of %s': // objects.js:1045
        '%s \u7684\u957F\u5EA6',
    'unicode of %s': // objects.js:1051
        '\u5B57\u7B26 %s \u7684Unicode\u7801',
    'unicode %n as letter': // objects.js:1057
        'Unicode\u7801\u4E3A %n \u7684\u5B57\u7B26',
    'is %s a %typ ?': // objects.js:1063
        '%s \u7684\u7C7B\u578B\u662F %typ \uFF1F',
    'is %s identical to %s ?': // objects.js:1069
        '%s \u4E0E %s \u76F8\u540C\uFF1F',
    'split %s by %delim': // objects.js:1074
        '\u628A %s \u6309 %delim \u5206\u5F00',
    'JavaScript function ( %mult%s ) { %code }': // objects.js:1080
        undefined,
    'type of %s': // objects.js:1086
        '%s \u7684\u7C7B\u578B',
    '%txtfun of %s': // objects.js:1093
        '%txtfun %s',
    'compile %repRing': // objects.js:1099
        undefined,
    'set %var to %s': // objects.js:1119
        '\u628A %var \u8BBE\u5B9A\u4E3A %s',
    'change %var by %n': // objects.js:1125
        '\u628A %var \u589E\u52A0 %n',
    'show variable %var': // objects.js:1131
        '\u663E\u793A\u53D8\u91CF %var',
    'hide variable %var': // objects.js:1136
        '\u9690\u85CF\u53D8\u91CF %var',
    'script variables %scriptVars': // objects.js:1141
        '\u811A\u672C\u53D8\u91CF %scriptVars',
    'inherit %shd': // objects.js:1148
        '\u7EE7\u627F %shd',
    'list %exp': // objects.js:1155
        '\u5217\u8868 %exp',
    '%s in front of %l': // objects.js:1160
        '%s \u653E\u5728 %l \u524D\u9762',
    'item %idx of %l': // objects.js:1165
        '\u7B2C %idx \u9879 %l',
    'all but first of %l': // objects.js:1171
        '%l \u7B2C\u4E00\u9879\u4EE5\u5916',
    'length of %l': // objects.js:1176
        '%l \u7684\u957F\u5EA6',
    '%l contains %s': // objects.js:1181
        '%l \u542B\u6709 %s',
    'thing': // objects.js:1182 objects.js:1188 objects.js:1200 objects.js:1206
        '\u4E1C\u897F',
    'add %s to %l': // objects.js:1187
        '\u628A %s \u653E\u5230 %l \u540E\u9762',
    'delete %ida of %l': // objects.js:1193
        '\u5220\u9664\u7B2C %ida \u9879 %l',
    'insert %s at %idx of %l': // objects.js:1199
        '\u628A %s \u63D2\u5165\u5230\u7B2C %idx \u9879 %l',
    'replace item %idx of %l with %s': // objects.js:1205
        '\u628A\u7B2C %idx \u9879 %l \u66FF\u6362\u4E3A %s',
    'map %repRing over %l': // objects.js:1214
        'map %repRing over %l',
    'for %upvar in %l %cl': // objects.js:1220
        'for %upvar in %l %cl',
    'each item': // objects.js:1221
        '\u6BCF\u4E00\u9879',
    'show table %l': // objects.js:1230
        '\u663E\u793A\u8868\u683C %l',
    'map %cmdRing to %codeKind %code': // objects.js:1237
        '\u628A %cmdRing \u8F6C\u6362\u6210 %codeKind %code',
    'map %mapValue to code %code': // objects.js:1242
        undefined,
    'map %codeListPart of %codeListKind to code %code': // objects.js:1256
        '\u628A %codeListKind \u7684 %codeListPart \u8F6C\u6210\u4EE3\u7801 %code',
    'code of %cmdRing': // objects.js:1261
        '%cmdRing \u7684\u4EE3\u7801',
    'Sprite': // objects.js:1404
        '\u89D2\u8272',
    'that name is already in use': // objects.js:1859 objects.js:7047
        undefined,
    'development mode\ndebugging primitives': // objects.js:1932 objects.js:2089 objects.js:2155 objects.js:2268 objects.js:7085 objects.js:7214 objects.js:7280 objects.js:7376
        '\u5F00\u53D1\u6A21\u5F0F\n\u8C03\u8BD5\u79EF\u6728\uFF1A',
    'Make a variable': // objects.js:2184 objects.js:7309
        '\u65B0\u5EFA\u4E00\u4E2A\u53D8\u91CF',
    'Delete a variable': // objects.js:2205 objects.js:7327
        '\u5220\u9664\u53D8\u91CF',
    'find blocks': // objects.js:2398 objects.js:2469
        '\u627E\u79EF\u6728',
    'hide primitives': // objects.js:2476
        '\u9690\u85CF\u539F\u59CB\u79EF\u6728',
    'show primitives': // objects.js:2494
        '\u663E\u793A\u539F\u59CB\u79EF\u6728',
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
        '\u6BCD\u89D2\u8272',
    'Stage': // objects.js:6315
        '\u821E\u53F0',
    'stop': // objects.js:6770 costumes/COSTUMES:486
        undefined,
    'terminate all running threads': // objects.js:6774
        undefined,
    'Stage selected:\nno motion primitives': // objects.js:7060
        '\u9009\u4E2D\u4E86\u821E\u53F0:\n\u821E\u53F0\u4E0D\u80FD\u4F7F\u7528\u8FD0\u52A8\u79EF\u6728',
    'turn all pen trails and stamps\ninto a new costume for the\ncurrently selected sprite': // objects.js:7445
        '\u628A\u6240\u6709\u7B14\u8FF9\u548C\u56FE\u7AE0\u53D8\u6210\u5F53\u524D\u9009\u4E2D\u89D2\u8272\u7684\u4E00\u4E2A\u65B0\u9020\u578B',
    'turn all pen trails and stamps\ninto a new background for the stage': // objects.js:7447
        undefined,
    'Background': // objects.js:7817
        undefined,
    'a {{ className }}({{ name }})': // objects.js:8096
        undefined,
    'click or drag crosshairs to move the rotation center': // objects.js:8296
        '\u70B9\u51FB\u6216\u62D6\u52A8\u51C6\u661F\uFF0C\u8BBE\u7F6E\u65CB\u8F6C\u4E2D\u5FC3\u70B9',
    'Costume Editor': // objects.js:8308
        '\u9020\u578B\u7F16\u8F91\u5668',
    'an {{ className }}({{ name }})': // objects.js:8395
        undefined,
    'Web Audio API is not supported\nin this browser': // objects.js:8629
        undefined,
    'normal': // objects.js:9452
        '\u6807\u51C6',
    'large': // objects.js:9456
        '\u5927\u578B',
    'slider min': // objects.js:9466
        '\u6E38\u6807\u6700\u5C0F\u503C',
    'slider max': // objects.js:9470
        '\u6E38\u6807\u6700\u5927\u503C',
    'import': // objects.js:9475
        '\u5BFC\u5165',
    'Unable to import': // objects.js:9501
        undefined,
    '{{ appName }} can only import "text" files.\nYou selected a file of type "{{ type }}".': // objects.js:9502
        undefined,
    'Slider minimum value': // objects.js:9588
        '\u6E38\u6807\u7684\u6700\u5C0F\u503C',
    'Slider maximum value': // objects.js:9604
        '\u6E38\u6807\u7684\u6700\u5927\u503C',
    'Paint Editor': // paint.js:111
        '\u753B\u677F',
    'Paintbrush tool\n(free draw)': // paint.js:172
        '\u753B\u7B14(\u9F20\u6807\u4F5C\u753B)',
    'Stroked Rectangle\n(shift: square)': // paint.js:174
        '\u77E9\u5F62\u6846\n(shift: \u6B63\u65B9\u5F62)',
    'Stroked Ellipse\n(shift: circle)': // paint.js:176
        '\u692D\u5706\u5708\n(shift: \u5706\u5708)',
    'Eraser tool': // paint.js:178
        '\u6A61\u76AE',
    'Set the rotation center': // paint.js:180
        '\u8BBE\u5B9A\u65CB\u8F6C\u4E2D\u5FC3\u70B9',
    'Line tool\n(shift: vertical/horizontal)': // paint.js:183
        '\u76F4\u7EBF\n(shift: \u5782\u76F4\u6216\u6C34\u5E73)',
    'Filled Rectangle\n(shift: square)': // paint.js:185
        '\u5B9E\u5FC3\u77E9\u5F62\n(shift: \u6B63\u65B9\u5F62)',
    'Filled Ellipse\n(shift: circle)': // paint.js:187
        '\u5B9E\u5FC3\u692D\u5706\u5F62\n(shift: \u5706\u5F62)',
    'Fill a region': // paint.js:189
        '\u6D82\u6EE1\u4E00\u4E2A\u533A\u57DF',
    'Pipette tool\n(pick a color anywhere)': // paint.js:191
        '\u6EF4\u7BA1\n(\u4ECE\u5C4F\u5E55\u4E0A\u9009\u4E00\u4E2A\u989C\u8272)',
    'undo': // paint.js:225
        '\u64A4\u9500',
    'grow': // paint.js:239
        '\u589E\u5927',
    'shrink': // paint.js:243
        '\u51CF\u5C0F',
    'flip \u2194': // paint.js:247
        '\u2194 \u7FFB',
    'flip \u2195': // paint.js:251
        '\u2195 \u7FFB',
    'Constrain proportions of shapes?\n(you can also hold shift)': // paint.js:407
        '\u53EA\u753B\u6B63\u65B9\u5F62/\u5706\u5F62/\u5782\u76F4\u6216\u6C34\u5E73\u7EBF\n(\u76F8\u5F53\u4E8E\u6309\u4F4Fshift\u952E)',
    'Brush size': // paint.js:413
        '\u753B\u7B14\u7C97\u7EC6',
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
        '\u91CD\u7F6E\u5217',
    'open in another dialog': // tables.js:1027
        '\u5728\u53E6\u4E00\u4E2A\u5BF9\u8BDD\u6846\u4E2D\u67E5\u770B',
    'list view': // tables.js:1034
        '\u5C55\u793A\u4E3A\u5217\u8868',
    'Table view': // tables.js:1186
        '\u67E5\u770B\u8868\u683C',
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
        '\u6B64\u5904\u8981\u6C42\u586B\u5199{{ expected }}\u4E2A\u8F93\u5165\u9879\uFF0C\u4F46\u5B9E\u9645\u5F97\u5230\u8F93\u5165\u9879\u4E2A\u6570\u662F{{ actual }}',
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
        '\u8FD9\u4E2A\u4E0A\u4E0B\u6587\u4E2D\u4E0D\u5B58\u5728\u201C{{ name }}\u201D\u8FD9\u4E2A\u53D8\u91CF',
    'Yes': // widgets.js:1607
        '\u662F',
    'No': // widgets.js:1608
        '\u5426',
    'Default': // widgets.js:1882
        '\u9ED8\u8BA4',
    '{{ year }} or before': // widgets.js:2024
        '{{ year }}\u6216\u66F4\u65E9',
    'User name': // widgets.js:2054 widgets.js:2059 widgets.js:2092
        '\u7528\u6237\u540D\uFF1A',
    'Birth date': // widgets.js:2061
        '\u51FA\u751F\u65E5\u671F\uFF1A',
    'Password': // widgets.js:2071 widgets.js:2078
        '\u5BC6\u7801\uFF1A',
    'Repeat Password': // widgets.js:2073
        undefined,
    'Old password': // widgets.js:2083
        '\u8001\u5BC6\u7801\uFF1A',
    'New password': // widgets.js:2085
        '\u65B0\u5BC6\u7801\uFF1A',
    'Repeat new password': // widgets.js:2087
        '\u91CD\u590D\u4E00\u904D\u65B0\u5BC6\u7801\uFF1A',
    'please fill out\nthis field': // widgets.js:2196
        '\u8BF7\u586B\u5199\u8FD9\u91CC',
    'User name must be four\ncharacters or longer': // widgets.js:2201
        '\u7528\u6237\u540D\u4E0D\u80FD\u5C11\u4E8E4\u4E2A\u5B57\u7B26',
    'please provide a valid\nemail address': // widgets.js:2206
        '\u8BF7\u586B\u5199\u6709\u6548\u7684\u7535\u5B50\u90AE\u4EF6\u5730\u5740',
    'password must be six\ncharacters or longer': // widgets.js:2212
        '\u5BC6\u7801\u4E0D\u80FD\u5C11\u4E8E6\u4E2A\u5B57\u7B26',
    'passwords do\nnot match': // widgets.js:2216
        '\u4E24\u6B21\u586B\u5199\u7684\u5BC6\u7801\u4E0D\u4E00\u81F4',
    'please agree to\nthe TOS': // widgets.js:2222
        '\u8BF7\u540C\u610F\u300A\u670D\u52A1\u6761\u6B3E\u300B',
    'E-mail address of parent or guardian': // widgets.js:2258
        '\u5BB6\u957F\u7535\u5B50\u90AE\u4EF6\uFF1A',
    'E-mail address': // widgets.js:2259
        '\u7535\u5B50\u90AE\u4EF6\uFF1A',
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
SnapTranslator.dict.zh_CN.deprecated = {
    'add a new sprite':
        '\u6DFB\u52A0\u89D2\u8272',
    'disattach and put\ninto the hand':
        '\u65AD\u5F00\u8FDE\u63A5\u62FF\u8D77morph',
    'show the\nWorld\'s menu':
        '\u663E\u793AWorld\u83DC\u5355',
    'alpha\nvalue':
        'alpha\u901A\u9053\u503C\uFF1A',
    'attributes':
        '\u5C5E\u6027',
    'methods':
        '\u65B9\u6CD5',
    'let the World automatically\nadjust to browser resizings':
        '\u8BA9Wolrd\u968F\u6D4F\u89C8\u5668\u6539\u53D8\u5927\u5C0F',
    'blurry shades,\nuse for new browsers':
        '\u5BF9\u65B0\u6D4F\u89C8\u5668\n\u4F7F\u7528\u6A21\u7CCA\u7684\u9634\u5F71',
    'about morphic.js':
        '\u5173\u4E8Emorphic.js',
    'play note %n for %n beats':
        '\u5F39\u594F %n %n \u62CD',
    'stop %stopOthersChoices':
        '\u505C\u6B62 %stopOthersChoices',
    'distance to %dst':
        '\u5230 %dst \u7684\u8DDD\u79BB',
    'http:// %s':
        'http:// %s',
    'Snap! website':
        '\u5B98\u65B9\u7F51\u7AD9',
    'Save to disk':
        '\u5B58\u76D8',
    'store this project\nin the downloads folder\n(in supporting browsers)':
        '\u4FDD\u5B58\u5230\u4E0B\u8F7D\u6587\u4EF6\u5939\n\uFF08\u90E8\u5206\u6D4F\u89C8\u5668\u652F\u6301\uFF09',
    '(in a new window)':
        '\uFF08\u6253\u5F00\u65B0\u7A97\u53E3\uFF09',
    'Exported!':
        '\u5BFC\u51FA\u597D\u4E86\uFF01',
    'unused block(s) removed':
        '\u5220\u6389\u4E86\u6CA1\u7528\u5230\u7684\u79EF\u6728',
    'Kind of':
        '\u7C7B\u578B\uFF1A',
    'Part of':
        '\u5C5E\u4E8E\uFF1A',
    'Select categories of additional blocks to add to this project.':
        '\u6311\u9009\u66F4\u591A\u79EF\u6728\uFF0C\u6DFB\u52A0\u5230\u9879\u76EE\u4E2D\u3002',
    'Logout':
        '\u767B\u51FA',
    'password has been changed.':
        '\u5BC6\u7801\u6539\u597D\u4E86\u3002',
    'url':
        'URL',
    'Service':
        '\u670D\u52A1\uFF1A',
    'export project media only':
        '\u4EC5\u5BFC\u51FA\u9879\u76EE\u4E2D\u7684\u5A92\u4F53\u6587\u4EF6',
    'export project without media':
        '\u5BFC\u51FA\u9879\u76EE\uFF0C\u4E0D\u542B\u5A92\u4F53',
    'export project as cloud data':
        '\u628A\u9879\u76EE\u4EE5\u4E91\u7AEF\u6570\u636E\u683C\u5F0F\u5BFC\u51FA',
    'open shared project from cloud':
        '\u6253\u5F00\u5171\u4EAB\u5728\u4E91\u7AEF\u7684\u9879\u76EE',
    'or before':
        '\u6216\u66F4\u65E9',
    'could not connect to':
        '\u8FDE\u4E0D\u4E0A\u8FD9\u4E2A\u7F51\u7AD9\uFF1A',
    'now connected.':
        '\u5DF2\u7ECF\u767B\u5F55\u5230\u4E91\u7AEF\u3002',
    'disconnected.':
        '\u5DF2\u7ECF\u4ECE\u4E91\u7AEF\u767B\u51FA\u3002',
    'uncheck to supress\nrunning scripts\nwhen moving the slider':
        '\u5173\uFF1A\u6ED1\u52A8\u6E38\u6807\u65F6\u6682\u505C\u8FD0\u884C\u811A\u672C',
    'Enter one option per line.Optionally use "=" as key/value delimiter\ne.g.\n   the answer=42':
        '\u6BCF\u884C\u4E00\u4E2A\u9009\u9879\u3002\u53EF\u4F7F\u7528\u201C=\u201D\u4F5C\u4E3A\u952E\u548C\u503C\u7684\u5206\u9694\u7B26\u3002\u4F8B\u5982\uFF1A\n\u3000\u3000\u3000\u3000\u7B54\u6848=42',
    'Code mapping -':
        '\u5BF9\u5E94\u7684\u4EE3\u7801 -',
    'Code mapping - String <#1>':
        '\u5BF9\u5E94\u7684\u4EE3\u7801 - \u5B57\u7B26\u4E32 <#1>',
    'Code mapping - list contents <#1>':
        '\u5BF9\u5E94\u7684\u4EE3\u7801 - \u5217\u8868\u5185\u5BB9 <#1>',
    'Code mapping - list item <#1>':
        '\u5BF9\u5E94\u7684\u4EE3\u7801 - \u5217\u8868\u9879',
    'Code mapping - list item delimiter':
        '\u5BF9\u5E94\u7684\u4EE3\u7801 - \u5217\u8868\u9879\u5206\u9694\u7B26',
    'map String to code %code':
        '\u628A\u5B57\u7B26\u4E32\u8F6C\u6210\u4EE3\u7801 %code',
    'detach from':
        '\u8131\u79BB',
    'turn pen trails into new costume':
        '\u628A\u7B14\u8FF9\u53D8\u6210\u65B0\u9020\u578B',
    'Ok':
        '\u786E\u5B9A',
    'Saved!':
        '\u5DF2\u4FDD\u5B58\uFF01',
    'Are you sure you want to delete':
        '\u4F60\u786E\u5B9A\u8981\u5220\u9664',
    'Snap!Cloud':
        'Snap\uFF01\u4E91\u7AEF',
    'last changed':
        '\u6700\u540E\u4FEE\u6539',
    'Are you sure you want to publish':
        '\u786E\u5B9A\u8BA9\u5176\u4ED6\u4EBA\u770B\u5230\u9879\u76EE',
    'Are you sure you want to unpublish':
        '\u786E\u5B9A\u4E0D\u8BA9\u5176\u4ED6\u4EBA\u770B\u5230\u9879\u76EE',
    'shared.':
        '\u9879\u76EE\u5DF2\u5206\u4EAB\u7ED9\u5176\u4ED6\u4EBA\u3002',
    'unshared.':
        '\u5176\u4ED6\u4EBA\u5DF2\u770B\u4E0D\u5230\u9879\u76EE\u3002',
    'saved.':
        '\u9879\u76EE\u5DF2\u4FDD\u5B58\u3002',
    'Save Project As':
        '\u9879\u76EE\u53E6\u5B58\u4E3A',
    '(temporary)':
        '(\u4E34\u65F6)',
    'Single input.':
        '\u8F93\u5165\u5355\u4E2A\u503C\u3002',
    'new':
        '\u65B0\u5EFA',
    'character':
        '\u5B57\u7B26',
    'a variable of name \'':
        '\u8FD9\u4E2A\u4E0A\u4E0B\u6587\u4E2D\u4E0D\u5B58\u5728\u201C',
    '\'\ndoes not exist in this context':
        '\u201D\u8FD9\u4E2A\u53D8\u91CF',
    'expecting':
        '\u6B64\u5904\u8981\u6C42\u586B\u5199',
    'input(s), but getting':
        '\u4E2A\u8F93\u5165\u9879\uFF0C\u4F46\u5B9E\u9645\u5F97\u5230\u8F93\u5165\u9879\u4E2A\u6570\u662F',
};
