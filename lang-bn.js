/*

    lang-bn.js

    Bengali translation for Snap!

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
SnapTranslator.dict.bn = {
    metadata: {
        'name': // the name as it should appear in the language menu
            '\u09AC\u09BE\u0982\u09B2\u09BE',
        'english_name': // the english name of the language
            'Bengali',
        'translators': [ // translators authors for the Translators tab
            'Dr. Mokter Hossain <mokter@gmail.com>'
        ],
        'last_changed': // this, too, will appear in the Translators tab
            '2014-07-02',
    },
    strings: {},
};
// ✂ - - - - - - - - - - - - - - - - -  -   -

SnapTranslator.dict.bn.strings = {
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
        '\u0995\u09B2\u09AE \u09AD\u09CD\u09B0\u09AE\u09A3',
    'stage image': // blocks.js:821
        undefined,
    'with inputs': // blocks.js:831
        '\u0987\u09A8\u09AA\u09C1\u099F \u09A6\u09CD\u09AC\u09BE\u09B0\u09BE',
    'block variables': // blocks.js:840 byob.js:1053
        undefined,
    'Input Names': // blocks.js:844
        '\u0987\u09A8\u09AA\u09C1\u099F \u09A8\u09BE\u09AE',
    'input names': // blocks.js:850
        '\u0987\u09A8\u09AA\u09C1\u099F \u09A8\u09BE\u09AE',
    'Input name': // blocks.js:902 blocks.js:5344
        '\u0987\u09A8\u09AA\u09C1\u099F \u09A8\u09BE\u09AE',
    '(90) right': // blocks.js:935 morphic.js:4888
        '(90) \u09A1\u09BF\u0997\u09CD\u09B0\u09C0 \u09A1\u09BE\u09A8',
    '(-90) left': // blocks.js:936 morphic.js:4889
        '(-90) \u09A1\u09BF\u0997\u09CD\u09B0\u09C0 \u09AC\u09BE\u09AE\u09C7',
    '(0) up': // blocks.js:937 morphic.js:4890
        '(0) \u0989\u09AA\u09B0\u09C7',
    '(180) down': // blocks.js:938 morphic.js:4891
        '(180) \u09A8\u09BF\u099A\u09C7',
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
        '\u09B8\u09B0\u09CD\u09AC\u09B6\u09C7\u09B7',
    'all': // blocks.js:1038 blocks.js:1265 byob.js:3874
        '\u09B8\u0995\u09B2',
    'any': // blocks.js:1049
        '\u09AF\u09C7\u0995\u09CB\u09A8\u09CB',
    'distance': // blocks.js:1058
        undefined,
    'direction': // blocks.js:1059 blocks.js:2483 blocks.js:8556 objects.js:300
        '\u098F\u09B0 \u0997\u09A4\u09BF\u09AA\u09A5',
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
        '\u098F\u099F\u09BF\u09B0 \u09AA\u09CD\u09B0\u09A4\u09BF\u09B2\u09BF\u09AA\u09BF \u09A4\u09C8\u09B0\u09C0 \u0995\u09B0',
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
        '\u0989\u09AA\u099A\u09CD\u099B\u09BE\u09AF\u09BC\u09BE',
    'any key': // blocks.js:1146
        undefined,
    'up arrow': // blocks.js:1147
        '\u0986\u09AA \u0985\u09CD\u09AF\u09BE\u09B0\u09CB',
    'down arrow': // blocks.js:1148
        '\u09A1\u09BE\u0989\u09A8 \u0985\u09CD\u09AF\u09BE\u09B0\u09CB',
    'right arrow': // blocks.js:1149
        '\u09B0\u09BE\u0987\u099F \u0985\u09CD\u09AF\u09BE\u09B0\u09CB',
    'left arrow': // blocks.js:1150
        '\u09B2\u09C7\u09AB\u099F \u0985\u09CD\u09AF\u09BE\u09B0\u09CB',
    'space': // blocks.js:1151
        '\u09B8\u09CD\u09AA\u09C7\u09B8\u09AC\u09BE\u09B0',
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
        undefined,
    'ceiling': // blocks.js:1227 morphic.js:7085 morphic.js:7088
        undefined,
    'floor': // blocks.js:1228 morphic.js:7069 morphic.js:7072
        undefined,
    'sqrt': // blocks.js:1229
        '\u09AC\u09B0\u09CD\u0997\u09AE\u09C2\u09B2',
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
        '\u09B8\u0982\u0996\u09CD\u09AF\u09BE',
    'true': // blocks.js:1292 blocks.js:9529 blocks.js:9919 objects.js:2979
        '\u09B8\u09A4\u09CD\u09AF',
    'false': // blocks.js:1293 blocks.js:9544 blocks.js:9930 objects.js:2979
        '\u09AE\u09BF\u09A5\u09CD\u09AF\u09BE',
    'code': // blocks.js:1334
        undefined,
    'header': // blocks.js:1335
        undefined,
    'list': // blocks.js:1408 blocks.js:8487
        '\u09A4\u09BE\u09B2\u09BF\u0995\u09BE',
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
        '\u09B6\u09BF\u09B0\u09CB\u09A8\u09BE\u09AE\u09B9\u09C0\u09A8',
    '{{ projectName }} script pic': // blocks.js:1993 blocks.js:2602 blocks.js:6441 byob.js:1035
        undefined,
    'script target cannot be found for orphaned block': // blocks.js:2203
        undefined,
    'a {{ className }} ("{{ value }}...")': // blocks.js:2207 morphic.js:8466 morphic.js:9146
        undefined,
    'Variable name': // blocks.js:2377 blocks.js:3262 objects.js:2179 objects.js:7304
        '\u099A\u09B2\u0995\u09C7\u09B0 \u09A8\u09BE\u09AE',
    'help': // blocks.js:2386 objects.js:1851 objects.js:2308
        '\u09B8\u09BE\u09B9\u09BE\u09AF\u09CD\u09AF \u0995\u09B0',
    'script pic with result': // blocks.js:2393
        undefined,
    'open a new window\nwith a picture of both\nthis script and its result': // blocks.js:2397
        undefined,
    'rename': // blocks.js:2409 blocks.js:2458 blocks.js:2521 gui.js:7708 gui.js:8409 morphic.js:7656
        '\u09A8\u09A4\u09C1\u09A8 \u09A8\u09BE\u09AE\u0995\u09B0\u09A3 \u0995\u09B0',
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
        '\u0997\u09C7\u09BE\u09AA\u09A8 \u0995\u09B0',
    'x position': // blocks.js:2481 blocks.js:8554 objects.js:288
        '\u098F\u09B0 x \u0985\u09AC\u09B8\u09CD\u09A5\u09BE\u09A8',
    'y position': // blocks.js:2482 blocks.js:8555 objects.js:294
        '\u098F\u09B0 y \u0985\u09AC\u09B8\u09CD\u09A5\u09BE\u09A8',
    'size': // blocks.js:2484 blocks.js:8559 objects.js:382
        '\u098F\u09B0 \u0986\u0995\u09BE\u09B0',
    'costume #': // blocks.js:2485 blocks.js:8557 blocks.js:8561 objects.js:317
        '\u098F\u09B0 \u09AA\u09B0\u09BF\u099A\u09CD\u099B\u09A6 #',
    'header mapping': // blocks.js:2507 blocks.js:2677
        undefined,
    'code mapping': // blocks.js:2511 blocks.js:2681
        undefined,
    'relabel': // blocks.js:2527 blocks.js:2538
        '\u09A8\u09BE\u09AE\u09BE\u09A8\u09CD\u09A4\u09B0 \u0995\u09B0',
    'make a copy\nand pick it up': // blocks.js:2564 blocks.js:11908 morphic.js:4171
        '\u098F\u099F\u09BF \u0995\u09AA\u09BF \u0995\u09B0 \u098F\u09AC\u0982 \u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u099A\u09A8 \u0995\u09B0',
    'only duplicate this block': // blocks.js:2586
        '\u09B6\u09C1\u09A7\u09C1\u09AE\u09BE\u09A4\u09CD\u09B0 \u098F\u0987 \u09AC\u09CD\u09B2\u0995\u09C7\u09B0 \u09AA\u09CD\u09B0\u09A4\u09BF\u09B2\u09BF\u09AA\u09BF \u09A4\u09C8\u09B0\u09C0 \u0995\u09B0',
    'delete': // blocks.js:2590 blocks.js:11910 gui.js:7372 gui.js:7711 gui.js:8410 morphic.js:4215 objects.js:3242
        '\u098F\u099F\u09BF \u09AE\u09C1\u099B\u09C7 \u09AB\u09C7\u09B2',
    'script pic': // blocks.js:2594 byob.js:1030
        '\u09B8\u09CD\u0995\u09CD\u09B0\u09BF\u09AA\u09CD\u099F \u099B\u09AC\u09BF',
    'open a new window\nwith a picture of this script': // blocks.js:2608 byob.js:1041
        '\u098F\u0987 \u09B8\u09CD\u0995\u09CD\u09B0\u09BF\u09AA\u09CD\u099F\u09B0 \u099B\u09AC\u09BF \u09A6\u09BF\u09AF\u09BC\u09C7 \u098F\u0995\u099F\u09BE \u09A8\u09A4\u09C1\u09A8 \u0989\u0987\u09A8\u09CD\u09A1\u09CB \u0996\u09CB\u09B2',
    'download script': // blocks.js:2612
        undefined,
    '{{ name }} script': // blocks.js:2622
        undefined,
    'download this script\nas an XML file': // blocks.js:2627
        undefined,
    'unringify': // blocks.js:2657
        '\u09AA\u09B0\u09BF\u09AC\u09C7\u09B7\u09CD\u099F\u09A8\u09AE\u09C1\u0995\u09CD\u09A4 \u0995\u09B0\u09BE',
    'ringify': // blocks.js:2661 blocks.js:2673
        '\u09AA\u09B0\u09BF\u09AC\u09C7\u09B7\u09CD\u099F\u09A8 \u0995\u09B0',
    'delete block': // blocks.js:2691
        undefined,
    'spec': // blocks.js:2692 blocks.js:2699
        undefined,
    'Help': // blocks.js:2980 blocks.js:2997
        '\u09B8\u09BE\u09B9\u09BE\u09AF\u09CD\u09AF \u0995\u09B0',
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
        '\u09AA\u09B0\u09BF\u09B7\u09CD\u0995\u09BE\u09B0-\u09AA\u09B0\u09BF\u099A\u09CD\u099B\u09A8\u09CD\u09A8 \u0995\u09B0',
    'arrange scripts\nvertically': // blocks.js:6359
        '\u0989\u09B2\u09CD\u09B2\u09AE\u09CD\u09AC\u09AD\u09BE\u09AC\u09C7\n\u09B8\u09CD\u0995\u09CD\u09B0\u09BF\u09AA\u09CD\u099F\u09B8 \u09B8\u09C1\u09AC\u09BF\u09A8\u09CD\u09AF\u09B8\u09CD\u09A4 \u0995\u09B0',
    'add comment': // blocks.js:6360
        '\u09AE\u09A8\u09CD\u09A4\u09AC\u09CD\u09AF \u09AF\u09CB\u0997 \u0995\u09B0',
    'scripts pic': // blocks.js:6362
        undefined,
    'open a new window\nwith a picture of all scripts': // blocks.js:6364
        undefined,
    'make a block': // blocks.js:6380
        '\u098F\u0995\u099F\u09BF \u09AC\u09CD\u09B2\u0995 \u09A4\u09C8\u09B0\u09C0 \u0995\u09B0',
    'Make a block': // blocks.js:6398 objects.js:2303 objects.js:2352 objects.js:2411
        '\u098F\u0995\u099F\u09BF \u09AC\u09CD\u09B2\u0995 \u09A4\u09C8\u09B0\u09C0 \u0995\u09B0',
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
        '\u09AC\u09BE\u09B0\u09CD\u09A4\u09BE \u09B2\u09BF\u0996',
    'any message': // blocks.js:8360
        '\u09AF\u09C7 \u0995\u09CB\u09A8 \u09AC\u09BE\u09B0\u09CD\u09A4\u09BE',
    'mouse-pointer': // blocks.js:8391 blocks.js:8420
        '\u09AE\u09BE\u0989\u09B8-\u09AA\u09DF\u09C7\u09A8\u09CD\u099F\u09BE\u09B0',
    'edge': // blocks.js:8392
        '\u09AA\u09CD\u09B0\u09BE\u09A8\u09CD\u09A4',
    'random position': // blocks.js:8418
        undefined,
    'myself': // blocks.js:8445
        '\u09B8\u09CD\u09AC\u09C0\u09AF\u09BC',
    'number': // blocks.js:8484
        '\u09B8\u0982\u0996\u09CD\u09AF\u09BE',
    'text': // blocks.js:8485 morphic.js:12305
        '\u09AC\u09B0\u09CD\u09A3',
    'Boolean': // blocks.js:8486
        '\u09AC\u09C1\u09B2\u09BF\u09DF\u09BE\u09A8',
    'sprite': // blocks.js:8490
        undefined,
    'costume': // blocks.js:8492 objects.js:3069
        undefined,
    'sound': // blocks.js:8493
        undefined,
    'command': // blocks.js:8494
        '\u09A8\u09BF\u09B0\u09CD\u09A6\u09C7\u09B6',
    'reporter': // blocks.js:8495
        '\u09B0\u09BF\u09AA\u09CB\u09B0\u09CD\u099F\u09BE\u09B0',
    'predicate': // blocks.js:8496
        '\u09B8\u09C2\u09A4\u09CD\u09B0\u09C7\u09B0 \u09AC\u09BF\u09A7\u09C7\u09DF',
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
        '\u0995\u099A\u09CD\u099B\u09AA',
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
        '\u0987\u09A8\u09AA\u09C1\u099F \u09A4\u09BE\u09B2\u09BF\u0995\u09BE',
    'add comment here': // blocks.js:11762
        '\u098F\u0996\u09BE\u09A8\u09C7 \u09AE\u09A8\u09CD\u09A4\u09AC\u09CD\u09AF \u09AF\u09CB\u0997 \u0995\u09B0',
    'comment pic': // blocks.js:11912
        undefined,
    '{{ projectName }} comment pic': // blocks.js:11917
        undefined,
    'open a new window\nwith a picture of this comment': // blocks.js:11923
        undefined,
    'Change block': // byob.js:885
        '\u09AC\u09CD\u09B2\u0995 \u09AA\u09B0\u09BF\u09AC\u09B0\u09CD\u09A4\u09A8 \u09AC\u09CD\u09B2\u0995',
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
        '\u09AC\u09CD\u09B2\u0995 \u09B8\u0982\u099C\u09CD\u099E\u09BE \u09AE\u09C1\u099B\u09C7 \u09AB\u09C7\u09B2',
    'edit': // byob.js:1157 gui.js:7699 morphic.js:8730 morphic.js:9477 objects.js:3255 objects.js:3261 objects.js:7422
        '\u09B8\u09AE\u09CD\u09AA\u09BE\u09A6\u09A8 \u0995\u09B0',
    'Delete Custom Block': // byob.js:1228
        '\u0995\u09BE\u09B8\u09CD\u099F\u09AE \u09AC\u09CD\u09B2\u0995 \u09AE\u09C1\u099B\u09C7 \u09A6\u09BE\u0993',
    'Are you sure you want to delete this\ncustom block and all its instances?': // byob.js:1229
        '\u09A4\u09C1\u09AE\u09BF \u0995\u09BF \u098F\u0987 \u0995\u09BE\u09B8\u09CD\u099F\u09AE \u09AC\u09CD\u09B2\u0995 \u098F\u09AC\u0982 \u09B8\u0982\u09B6\u09CD\u09B2\u09BF\u09B7\u09CD\u099F \u09B8\u0995\u09B2 \u0989\u09AA\u09BE\u09A6\u09BE\u09A8 \u09AE\u09C1\u099B\u09C7 \u09A6\u09C7\u0993\u09AF\u09BC\u09BE\u09B0 \u099C\u09A8\u09CD\u09AF \u09A8\u09BF\u09B6\u09CD\u099A\u09BF\u09A4?',
    'OK': // byob.js:1648 byob.js:2117 byob.js:3237 byob.js:3848 gui.js:3713 morphic.js:3958 morphic.js:4028 morphic.js:4054 objects.js:8312 paint.js:161 tables.js:1212 widgets.js:1574 widgets.js:1708 widgets.js:1791 widgets.js:1874 widgets.js:2155 widgets.js:2434
        '\u09A0\u09BF\u0995 \u0986\u099B\u09C7',
    'Cancel': // byob.js:1649 byob.js:2120 byob.js:3243 byob.js:3849 gui.js:3371 gui.js:3714 gui.js:5941 gui.js:6843 gui.js:8996 gui.js:9134 morphic.js:4031 morphic.js:4057 objects.js:8313 paint.js:162 widgets.js:1709 widgets.js:1792 widgets.js:1887 widgets.js:2156
        '\u09AC\u09BE\u09A4\u09BF\u09B2 \u0995\u09B0',
    'Command': // byob.js:1770
        '\u0986\u09A6\u09C7\u09B6',
    'Reporter': // byob.js:1779 byob.js:3290
        '\u09AA\u09CD\u09B0\u09A4\u09BF\u09AC\u09C7\u09A6\u0995',
    'Predicate': // byob.js:1788 byob.js:3291
        '\u09B8\u09C2\u09A4\u09CD\u09B0\u09C7\u09B0 \u09AC\u09BF\u09A7\u09C7\u09AF\u09BC',
    'for all sprites': // byob.js:1850 byob.js:3662
        '\u09B8\u09AC \u09B8\u09CD\u09AA\u09BE\u0987\u099F\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF',
    'for this sprite only': // byob.js:1855 byob.js:3667
        '\u09B6\u09C1\u09A7\u09C1\u09AE\u09BE\u09A4\u09CD\u09B0 \u098F\u0987 \u09B8\u09CD\u09AA\u09BE\u0987\u099F\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF',
    'Block Editor': // byob.js:2065
        '\u09AC\u09CD\u09B2\u0995 \u09B8\u09AE\u09CD\u09AA\u09BE\u09A6\u09A8\u0995\u09BE\u09B0\u09C0',
    'Method Editor': // byob.js:2066
        undefined,
    'Apply': // byob.js:2119
        '\u09AA\u09CD\u09B0\u09AF\u09BC\u09C7\u09BE\u0997 \u0995\u09B0',
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
        '\u09B2\u09C7\u09AC\u09C7\u09B2 \u099F\u09C1\u0995\u09B0\u09BE \u09B8\u09AE\u09CD\u09AA\u09BE\u09A6\u09A8\u09BE \u0995\u09B0',
    'Create input name': // byob.js:2754
        '\u0987\u09A8\u09AA\u09C1\u099F \u09A8\u09BE\u09AE \u09A4\u09C8\u09B0\u09BF \u0995\u09B0',
    'Edit input name': // byob.js:2755
        '\u0987\u09A8\u09AA\u09C1\u099F \u09A8\u09BE\u09AE \u09B8\u09AE\u09CD\u09AA\u09BE\u09A6\u09A8\u09BE \u0995\u09B0',
    'new line': // byob.js:2800 byob.js:3266
        undefined,
    'Title text': // byob.js:3061
        '\u09B6\u09BF\u09B0\u09CB\u09A8\u09BE\u09AE \u09AA\u09BE\u09A0\u09CD\u09AF',
    'Delete': // byob.js:3239 gui.js:5940
        '\u09AE\u09C1\u099B\u09C7 \u09AB\u09C7\u09B2',
    'Object': // byob.js:3283
        '\u09B2\u0995\u09CD\u09B7\u09CD\u09AF\u09AC\u09B8\u09CD\u09A4\u09C1',
    'Text': // byob.js:3284
        '\u09AC\u09B0\u09CD\u09A3',
    'List': // byob.js:3285
        '\u09A4\u09BE\u09B2\u09BF\u0995\u09BE',
    'Any type': // byob.js:3287
        '\u09AF\u09C7\u0995\u09CB\u09A8 \u09AA\u09CD\u09B0\u0995\u09BE\u09B0',
    'Boolean (T/F)': // byob.js:3288
        '\u09AC\u09C1\u09B2\u09BF\u09AF\u09BC\u09BE\u09A8 (\u09B8\u09A4\u09CD\u09AF/\u09AE\u09BF\u09A5\u09CD\u09AF\u09BE)',
    'Command\n(inline)': // byob.js:3289
        '\u0986\u09A6\u09C7\u09B6\n(\u0987\u09A8\u09B2\u09BE\u0987\u09A8)',
    'Command\n(C-shape)': // byob.js:3292
        '\u0986\u09A6\u09C7\u09B6\n(C-\u0986\u0995\u09C3\u09A4\u09BF)',
    'Any\n(unevaluated)': // byob.js:3293
        '\u09AF\u09C7\u0995\u09CB\u09A8\n(\u09B8\u0982\u0996\u09CD\u09AF\u09BE \u0985\u09A8\u09BF\u09B0\u09CD\u09A3\u09AF\u09BC \u0995\u09B0\u09BE)',
    'Boolean\n(unevaluated)': // byob.js:3294
        '\u09AC\u09C1\u09B2\u09BF\u09AF\u09BC\u09BE\u09A8\n(\u09B8\u0982\u0996\u09CD\u09AF\u09BE \u0985\u09A8\u09BF\u09B0\u09CD\u09A3\u09AF\u09BC \u0995\u09B0\u09BE)',
    'Single input': // byob.js:3299
        '\u098F\u0995\u0995 \u0987\u09A8\u09AA\u09C1\u099F',
    'Multiple inputs (value is list of inputs)': // byob.js:3304
        '\u098F\u0995\u09BE\u09A7\u09BF\u0995 \u0987\u09A8\u09AA\u09C1\u099F (\u09AE\u09BE\u09A8 \u0987\u09A8\u09AA\u09C1\u099F \u09A4\u09BE\u09B2\u09BF\u0995\u09BE)',
    'Upvar - make internal variable visible to caller': // byob.js:3309
        '\u0985\u09AD\u09CD\u09AF\u09A8\u09CD\u09A4\u09B0\u09C0\u09A3 \u099A\u09B2\u0995 \u0986\u09B9\u09CD\u09AC\u09BE\u09A8\u0995\u09BE\u09B0\u09C0\u0995\u09C7 \u09A6\u09C3\u09B6\u09CD\u09AF\u09AE\u09BE\u09A8 \u0995\u09B0',
    'Default Value': // byob.js:3314
        '\u09A1\u09BF\u09AB\u09B2\u09CD\u099F (\u0985\u09A8\u09C1\u09AA\u09B8\u09CD\u09A5\u09BF\u09A4)\u09AE\u09BE\u09A8',
    'options': // byob.js:3570
        undefined,
    'read-only': // byob.js:3573
        undefined,
    'Input Slot Options': // byob.js:3593
        undefined,
    'Enter one option per line.\nOptionally use "=" as key/value delimiter and {} for submenus. e.g.\n   the answer=42': // byob.js:3597
        undefined,
    'Export blocks': // byob.js:3776 byob.js:3914 gui.js:3187 gui.js:3835
        '\u09AC\u09CD\u09B2\u0995 \u098F\u0995\u09CD\u09B8\u09AA\u09CB\u09B0\u09CD\u099F \u0995\u09B0',
    'select': // byob.js:3873
        '\u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u099A\u09A8 \u0995\u09B0',
    'none': // byob.js:3875 objects.js:5421 objects.js:5427
        '\u0995\u09CB\u09A8\u09CB\u099F\u09BE\u0987 \u09A8\u09BE',
    '{{ projectName }} blocks': // byob.js:3910
        undefined,
    'no blocks were selected': // byob.js:3915 byob.js:4009 byob.js:4102
        undefined,
    'Import blocks': // byob.js:3962 byob.js:3963 byob.js:4008
        '\u09AC\u09CD\u09B2\u0995 \u0987\u09AE\u09CD\u09AA\u09CB\u09B0\u09CD\u099F \u0995\u09B0',
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
        '\u0989\u09A8\u09CD\u09A8\u09AF\u09BC\u09A8 \u09AE\u09CB\u09A1',
    'don\'t rotate': // gui.js:1222
        '\u0998\u09CB\u09B0\u09A4\u09C7 \u09AA\u09BE\u09B0\u09C7 \u09A8\u09BE',
    'can rotate': // gui.js:1223
        '\u0998\u09CB\u09B0\u09A4\u09C7 \u09AA\u09BE\u09B0\u09C7',
    'only face left/right': // gui.js:1224
        '\u098F\u0995\u09AE\u09BE\u09A4\u09CD\u09B0 \u09A1\u09BE\u09A8\u09C7/\u09AC\u09BE\u09AE\u09C7 \u09AE\u09C1\u0996',
    'draggable': // gui.js:1329
        '\u099F\u09C7\u09A8\u09C7 \u0986\u09A8\u09BE\u09B0 \u09AF\u09CB\u0997\u09CD\u09AF',
    'Scripts': // gui.js:1371 gui.js:4179
        '\u09AA\u09CD\u09B0\u09CB\u0997\u09CD\u09B0\u09BE\u09AE \u09B8\u09CD\u0995\u09CD\u09B0\u09BF\u09AA\u09CD\u099F (Scripts)',
    'Costumes': // gui.js:1391 gui.js:3252 gui.js:3255 gui.js:4156
        '\u09AA\u09B0\u09BF\u099A\u09CD\u099B\u09A6 \u09B2\u09CB\u09A1 \u0995\u09B0',
    'Backgrounds': // gui.js:1392 gui.js:3252 gui.js:3255
        undefined,
    'Sounds': // gui.js:1411 gui.js:3262 gui.js:3264 gui.js:4167
        '\u09B6\u09AC\u09CD\u09A6\u09C7\u09B0 \u09AB\u09BE\u0987\u09B2 \u09B2\u09CB\u09A1 \u0995\u09B0',
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
        'Snap! \u09B8\u09AE\u09CD\u09AA\u09B0\u09CD\u0995\u09BF\u09A4 \u09A4\u09A5\u09CD\u09AF',
    'Reference manual': // gui.js:2474
        'Snap! \u09B0\u09C7\u09AB\u09BE\u09B0\u09C7\u09A8\u09CD\u09B8 \u09AE\u09CD\u09AF\u09BE\u09A8\u09C1\u09AF\u09BC\u09BE\u09B2',
    '{{ site }} website': // gui.js:2481
        '{{ site }} \u0993\u09DF\u09C7\u09AC\u09B8\u09BE\u0987\u099F',
    'Download source': // gui.js:2487
        'Snap! \u09B8\u09CB\u09B0\u09CD\u09B8\u0995\u09CB\u09A1',
    'Switch back to user mode': // gui.js:2498
        '\u0987\u0989\u099C\u09BE\u09B0 \u09AE\u09CB\u09A1\u09C7 \u09AB\u09BF\u09B0\u09C7 \u09AF\u09BE\u0993',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones': // gui.js:2500
        '\u09A6\u09C0\u09B0\u09CD\u0998-\u09AE\u09B0\u09AB\u09BF\u0995 \u09AA\u09CD\u09B0\u09B8\u0999\u09CD\u0997 \u09A4\u09BE\u09B2\u09BF\u0995\u09BE \u098F\u09AC\u0982\u09AA\u09B0\u09BF\u09A6\u09B0\u09CD\u09B6\u0995 \u09A8\u09BF\u09B8\u09CD\u0995\u09CD\u09B0\u09BF\u09DF \u0995\u09B0\u09C7 \u098F\u0995\u099F\u09BF \u09AC\u09CD\u09AF\u09AC\u09B9\u09BE\u09B0\u0995\u09BE\u09B0\u09C0 \u09AC\u09BE\u09A8\u09CD\u09A7\u09AC \u09A4\u09BE\u09B2\u09BF\u0995\u09BE \u09A6\u09C7\u0996\u09BE\u0993',
    'Switch to dev mode': // gui.js:2507
        '\u09A1\u09C7\u09AD\u09C7\u09B2\u09AA\u09BE\u09B0 \u09AE\u09CB\u09A1\u09C7 \u09AB\u09BF\u09B0\u09C7 \u09AF\u09BE\u0993',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!': // gui.js:2509
        '\u09AE\u09B0\u09AB\u09BF\u0995 \u09AA\u09CD\u09B0\u09B8\u0999\u09CD\u0997 \u09A4\u09BE\u09B2\u09BF\u0995\u09BE \u098F\u09AC\u0982\u09AA\u09B0\u09BF\u09A6\u09B0\u09CD\u09B6\u0995 \u09B8\u0995\u09CD\u09B0\u09BF\u09AF\u09BC \u0995\u09B0,\u09A4\u09AC\u09C7 \u098F\u099F\u09BF \u09AC\u09CD\u09AF\u09AC\u09B9\u09BE\u09B0\u0995\u09BE\u09B0\u09C0 \u09AC\u09BE\u09A8\u09CD\u09A7\u09AC \u09A8\u09B9\u09C7!',
    'Cloud URL': // gui.js:2527 gui.js:5654
        undefined,
    'Login': // gui.js:2536
        '\u0995\u09CD\u09B2\u09BE\u0989\u09A1 \u09B2\u0997 \u0987\u09A8',
    'Signup': // gui.js:2540
        '\u0995\u09CD\u09B2\u09BE\u0989\u09A1 \u09B8\u09BE\u0987\u09A8 \u0986\u09AA',
    'Reset Password': // gui.js:2544
        '\u09AA\u09BE\u09B8\u0993\u09AF\u09BC\u09BE\u09B0\u09CD\u09A1 \u09AA\u09B0\u09BF\u09AC\u09B0\u09CD\u09A4\u09A8 \u0995\u09B0',
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
        '\u09AD\u09BE\u09B7\u09BE \u09AA\u09B0\u09BF\u09AC\u09B0\u09CD\u09A4\u09A8 \u0995\u09B0',
    'Generate {{ filename }} file': // gui.js:2679 gui.js:5035
        undefined,
    'builds the {{ language }} translation file': // gui.js:2684
        undefined,
    'Zoom blocks': // gui.js:2692 gui.js:5120
        '\u09AC\u09CD\u09B2\u0995\u09B8\u09AE\u09C2\u09B9 \u099C\u09C1\u09AE\u09CD \u0995\u09B0',
    'Stage size': // gui.js:2696 gui.js:5163
        '\u09A6\u09C3\u09B6\u09CD\u09AF\u09B8\u09CD\u09A5\u09B2\u09C7\u09B0 \u0986\u0995\u09BE\u09B0 \u09AA\u09B0\u09BF\u09AC\u09B0\u09CD\u09A4\u09A8 \u0995\u09B0',
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
        '\u0987\u09A8\u09AA\u09C1\u099F \u09B8\u09CD\u09B2\u09BE\u0987\u09A1\u09BE\u09B0',
    'uncheck to disable\ninput sliders for\nentry fields': // gui.js:2736
        '\u098F\u09A8\u09CD\u099F\u09CD\u09B0\u09BF \u09AB\u09BF\u09B2\u09CD\u09A1\u09C7 \u0987\u09A8\u09AA\u09C1\u099F \u09B8\u09CD\u09B2\u09BE\u0987\u09A1\u09BE\u09B0 \u09A8\u09BF\u09B8\u09CD\u0995\u09CD\u09B0\u09BF\u09DF \u0995\u09B0\u09BE\u09B0 \u099C\u09A8\u09CD\u09AF \u0986\u09A8\u099A\u09C7\u0995 \u0995\u09B0',
    'check to enable\ninput sliders for\nentry fields': // gui.js:2737
        '\u098F\u09A8\u09CD\u099F\u09CD\u09B0\u09BF \u09AB\u09BF\u09B2\u09CD\u09A1\u09C7 \u0987\u09A8\u09AA\u09C1\u099F \u09B8\u09CD\u09B2\u09BE\u0987\u09A1\u09BE\u09B0 \u09B8\u0995\u09CD\u09B0\u09BF\u09AF\u09BC \u0995\u09B0\u09BE\u09B0 \u099C\u09A8\u09CD\u09AF \u099A\u09C7\u0995 \u0995\u09B0',
    'Execute on slider change': // gui.js:2741
        undefined,
    'uncheck to suppress\nrunning scripts\nwhen moving the slider': // gui.js:2744
        undefined,
    'check to run\nthe edited script\nwhen moving the slider': // gui.js:2745
        undefined,
    'Turbo mode': // gui.js:2749
        '\u099F\u09BE\u09B0\u09CD\u09AC\u09CB \u09AE\u09CB\u09A1',
    'uncheck to run scripts\nat normal speed': // gui.js:2752
        undefined,
    'check to prioritize\nscript execution': // gui.js:2753
        undefined,
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
        '\u099D\u09BE\u09AA\u09B8\u09BE \u099B\u09BE\u09AF\u09BC\u09BE',
    'uncheck to use solid drop\nshadows and highlights': // gui.js:2787
        '\u09A8\u09BF\u09B0\u09C7\u099F \u09A1\u09CD\u09B0\u09AA \u099B\u09BE\u09AF\u09BC\u09BE \u098F\u09AC\u0982 \u09B9\u09BE\u0987\u09B2\u09BE\u0987\u099F \u09AC\u09CD\u09AF\u09AC\u09B9\u09BE\u09B0 \u0986\u09A8\u099A\u09C7\u0995 \u0995\u09B0',
    'check to use blurred drop\nshadows and highlights': // gui.js:2788
        '\u099D\u09BE\u09AA\u09B8\u09BE \u099B\u09BE\u09AF\u09BC\u09BE \u098F\u09AC\u0982 \u09B9\u09BE\u0987\u09B2\u09BE\u0987\u099F \u09AC\u09CD\u09AF\u09AC\u09B9\u09BE\u09B0 \u099A\u09C7\u0995 \u0995\u09B0',
    'Zebra coloring': // gui.js:2792
        '\u099C\u09C7\u09AC\u09CD\u09B0\u09BE \u099A\u09C7\u09B9\u09BE\u09B0\u09BE',
    'uncheck to disable alternating\ncolors for nested block': // gui.js:2795
        '\u09A8\u09C7\u09B8\u09CD\u099F\u09C7\u09A1 \u09AC\u09CD\u09B2\u0995\u09C7\u09B0 \u09AA\u09B0\u09BF\u09AC\u09B0\u09CD\u09A4\u09BF\u09A4 \u09B0\u0999 \u09A8\u09BF\u09B8\u09CD\u0995\u09CD\u09B0\u09BF\u09DF \u0995\u09B0\u09BE\u09B0 \u099C\u09A8\u09CD\u09AF \u0986\u09A8\u099A\u09C7\u0995 \u0995\u09B0',
    'check to enable alternating\ncolors for nested blocks': // gui.js:2796
        '\u09A8\u09C7\u09B8\u09CD\u099F\u09C7\u09A1 \u09AC\u09CD\u09B2\u0995\u09C7\u09B0 \u09AA\u09B0\u09BF\u09AC\u09B0\u09CD\u09A4\u09BF\u09A4 \u09B0\u0999 \u09B8\u0995\u09CD\u09B0\u09BF\u09AF\u09BC \u0995\u09B0\u09BE\u09B0 \u099C\u09A8\u09CD\u09AF \u099A\u09C7\u0995 \u0995\u09B0',
    'Dynamic input labels': // gui.js:2800
        '\u0997\u09A4\u09BF\u09B6\u09C0\u09B2 \u0987\u09A8\u09AA\u09C1\u099F \u09B2\u09C7\u09AC\u09C7\u09B2',
    'uncheck to disable dynamic\nlabels for variadic inputs': // gui.js:2803
        '\u09AD\u09BE\u09B0\u09BF\u09DF\u09BE\u09A6\u09BF\u0995 \u0987\u09A8\u09AA\u09C1\u099F \u098F\u09B0 \u0997\u09A4\u09BF\u09B6\u09C0\u09B2 \u09B2\u09C7\u09AC\u09C7\u09B2 \u09A8\u09BF\u09B8\u09CD\u0995\u09CD\u09B0\u09BF\u09DF \u0995\u09B0\u09BE\u09B0 \u099C\u09A8\u09CD\u09AF \u0986\u09A8\u099A\u09C7\u0995 \u0995\u09B0',
    'check to enable dynamic\nlabels for variadic inputs': // gui.js:2804
        '\u09AD\u09BE\u09B0\u09BF\u09DF\u09BE\u09A6\u09BF\u0995 \u0987\u09A8\u09AA\u09C1\u099F \u098F\u09B0 \u0997\u09A4\u09BF\u09B6\u09C0\u09B2 \u09B2\u09C7\u09AC\u09C7\u09B2 \u09B8\u0995\u09CD\u09B0\u09BF\u09AF\u09BC \u0995\u09B0\u09BE\u09B0 \u099C\u09A8\u09CD\u09AF \u099A\u09C7\u0995 \u0995\u09B0',
    'Prefer empty slot drops': // gui.js:2808
        '\u0996\u09BE\u09B2\u09BF \u09B8\u09CD\u09B2\u099F \u09A1\u09CD\u09B0\u09AA \u09AA\u099B\u09A8\u09CD\u09A6 \u0995\u09B0',
    'uncheck to allow dropped\nreporters to kick out others': // gui.js:2811
        '\u099D\u09B0\u09C7 \u09AA\u09B0\u09BE \u09B0\u09BF\u09AA\u09CB\u09B0\u09CD\u099F\u09BE\u09B0\u09B8\u09AE\u09C2\u09B9 \u0985\u09A8\u09CD\u09AF\u09A6\u09C7\u09B0 \u09AC\u09C7\u09B0 \u0995\u09B0\u09C7 \u09A6\u09C7\u0993\u09DF\u09BE\u09B0 \u099C\u09A8\u09CD\u09AF \u0986\u09A8\u099A\u09C7\u0995 \u0995\u09B0',
    'check to focus on empty slots\nwhen dragging & dropping reporters': // gui.js:2812
        '\u0996\u09BE\u09B2\u09BF \u09B8\u09CD\u09B2\u099F \u09AE\u09C7\u09A8\u09C1 \u09B8\u09CD\u09A5\u09BE\u09AA\u09A8 \u0995\u09B0\u09BE\u09B0 \u09B8\u09BE\u09B9\u09BE\u09AF\u09CD\u09AF\u09AA\u09C2\u09B0\u09CD\u09A3 \u0987\u0999\u09CD\u0997\u09BF\u09A4',
    'Long form input dialog': // gui.js:2816
        '\u09A6\u09C0\u09B0\u09CD\u0998 \u0986\u0995\u09BE\u09B0\u09C7\u09B0 \u09A1\u09BE\u09AF\u09BC\u09B2\u0997 \u0987\u09A8\u09AA\u09C1\u099F',
    'uncheck to use the input\ndialog in short form': // gui.js:2819
        '\u09B8\u0982\u0995\u09CD\u09B7\u09BF\u09AA\u09CD\u09A4 \u0986\u0995\u09BE\u09B0\u09C7\u09B0 \u0987\u09A8\u09AA\u09C1\u099F \u09A1\u09BE\u09AF\u09BC\u09B2\u0997 \u09AC\u09CD\u09AF\u09AC\u09B9\u09BE\u09B0\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF \u0986\u09A8\u099A\u09C7\u0995 \u0995\u09B0',
    'check to always show slot\ntypes in the input dialog': // gui.js:2820
        '\u09B8\u09B0\u09CD\u09AC\u09A6\u09BE \u0987\u09A8\u09AA\u09C1\u099F \u09A1\u09BE\u09AF\u09BC\u09B2\u0997\u09C7 \u09B8\u09CD\u09B2\u099F \u098F\u09B0 \u09A7\u09B0\u09A8 \u09A6\u09C7\u0996\u09BE\u09A8\u09CB\u09B0 \u099C\u09A8\u09CD\u09AF \u099A\u09C7\u0995 \u0995\u09B0',
    'Plain prototype labels': // gui.js:2823
        '\u09B8\u09BE\u09A7\u09BE\u09B0\u09A3 \u09AA\u09CD\u09B0\u09CB\u099F\u09CB\u099F\u09BE\u0987\u09AA \u09B2\u09C7\u09AC\u09C7\u09B2',
    'uncheck to always show (+) symbols\nin block prototype labels': // gui.js:2826
        undefined,
    'check to hide (+) symbols\nin block prototype labels': // gui.js:2827
        undefined,
    'Virtual keyboard': // gui.js:2830
        '\u09AD\u09BE\u09B0\u09CD\u099A\u09C1\u09AF\u09BC\u09BE\u09B2 \u0995\u09BF\u09AC\u09CB\u09B0\u09CD\u09A1',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices': // gui.js:2833
        '\u09AE\u09CB\u09AC\u09BE\u0987\u09B2 \u09A1\u09BF\u09AD\u09BE\u0987\u09B8\u09C7 \u09AD\u09BE\u09B0\u09CD\u099A\u09C1\u09AF\u09BC\u09BE\u09B2 \u0995\u09BF\u09AC\u09CB\u09B0\u09CD\u09A1 \u09B8\u09B9\u09BE\u09AF\u09BC\u09A4\u09BE \u09A8\u09BF\u09B8\u09CD\u0995\u09CD\u09B0\u09BF\u09DF \u0995\u09B0\u09BE\u09B0 \u099C\u09A8\u09CD\u09AF \u099A\u09C7\u0995 \u0995\u09B0',
    'check to enable\nvirtual keyboard support\nfor mobile devices': // gui.js:2834
        '\u09AE\u09CB\u09AC\u09BE\u0987\u09B2 \u09A1\u09BF\u09AD\u09BE\u0987\u09B8\u09C7 \u09AD\u09BE\u09B0\u09CD\u099A\u09C1\u09AF\u09BC\u09BE\u09B2 \u0995\u09BF\u09AC\u09CB\u09B0\u09CD\u09A1 \u09B8\u09B9\u09BE\u09AF\u09BC\u09A4\u09BE \u09B8\u0995\u09CD\u09B0\u09BF\u09AF\u09BC \u0995\u09B0\u09BE\u09B0 \u099C\u09A8\u09CD\u09AF \u099A\u09C7\u0995 \u0995\u09B0',
    'Clicking sound': // gui.js:2838
        '\u0995\u09CD\u09B2\u09BF\u0995 \u09B6\u09AC\u09CD\u09A6',
    'uncheck to turn\nblock clicking\nsound off': // gui.js:2848
        '\u0995\u09CD\u09B2\u09BF\u0995 \u09B6\u09AC\u09CD\u09A6 \u09AC\u09A8\u09CD\u09A7 \u0995\u09B0\u09BE\u09B0 \u099C\u09A8\u09CD\u09AF \u0986\u09A8\u099A\u09C7\u0995 \u0995\u09B0',
    'check to turn\nblock clicking\nsound on': // gui.js:2849
        '\u0995\u09CD\u09B2\u09BF\u0995 \u09B6\u09AC\u09CD\u09A6 \u099A\u09BE\u09B2\u09C1 \u0995\u09B0\u09BE\u09B0 \u099C\u09A8\u09CD\u09AF \u099A\u09C7\u0995 \u0995\u09B0',
    'Animations': // gui.js:2852
        '\u09AA\u09CD\u09B0\u09BE\u09A3\u09AC\u09A8\u09CD\u09A4\u09A4\u09BE',
    'uncheck to disable\nIDE animations': // gui.js:2855
        'IDE \u09AA\u09CD\u09B0\u09BE\u09A3\u09AC\u09A8\u09CD\u09A4\u09A4\u09BE \u09AC\u09A8\u09CD\u09A7 \u0995\u09B0\u09BE\u09B0 \u099C\u09A8\u09CD\u09AF \u0986\u09A8\u099A\u09C7\u0995 \u0995\u09B0',
    'check to enable\nIDE animations': // gui.js:2856
        'IDE \u09AA\u09CD\u09B0\u09BE\u09A3\u09AC\u09A8\u09CD\u09A4\u09A4\u09BE \u099A\u09BE\u09B2\u09C1 \u0995\u09B0\u09BE\u09B0 \u099C\u09A8\u09CD\u09AF \u099A\u09C7\u0995 \u0995\u09B0',
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
        '\u09AB\u09CD\u09B2\u09BE\u099F \u09A1\u09BF\u099C\u09BE\u0987\u09A8',
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
        '\u09A8\u09BF\u09B0\u09CD\u09AC\u09BF\u0998\u09CD\u09A8 \u09AC\u09B0\u09CD\u09A3\u09A8\u09BE \u09AF\u09C7\u09BE\u0997\u09B8\u09C2\u09A4\u09CD\u09B0',
    'uncheck to allow\nscript reentrance': // gui.js:3035
        undefined,
    'check to disallow\nscript reentrance': // gui.js:3036
        undefined,
    'Prefer smooth animations': // gui.js:3039
        '\u09AE\u09B8\u09C3\u09A3 \u0985\u09CD\u09AF\u09BE\u09A8\u09BF\u09AE\u09C7\u09B6\u09A8 \u09AA\u099B\u09A8\u09CD\u09A6 \u0995\u09B0',
    'uncheck for greater speed\nat variable frame rates': // gui.js:3042
        undefined,
    'check for smooth, predictable\nanimations across computers': // gui.js:3043
        undefined,
    'Flat line ends': // gui.js:3047
        '\u09AB\u09CD\u09B2\u09BE\u099F \u09B2\u09BE\u0987\u09A8\u09C7\u09B0 \u09B8\u09AE\u09BE\u09AA\u09CD\u09A4\u09BF',
    'uncheck for round ends of lines': // gui.js:3053
        undefined,
    'check for flat ends of lines': // gui.js:3054
        undefined,
    'Codification support': // gui.js:3057
        '\u09B8\u09BE\u09B0\u09B8\u0982\u0997\u09CD\u09B0\u09B9 \u09B8\u09AE\u09B0\u09CD\u09A5\u09A8 ',
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
        '\u09AA\u09CD\u09B0\u0995\u09B2\u09CD\u09AA \u09B8\u09AE\u09CD\u09AA\u09B0\u09CD\u0995\u09BF\u09A4 \u09AE\u09A8\u09CD\u09A4\u09AC\u09CD\u09AF',
    'New': // gui.js:3109
        '\u09A8\u09A4\u09C1\u09A8 \u09AA\u09CD\u09B0\u0995\u09B2\u09CD\u09AA \u09A4\u09C8\u09B0\u09C0 \u0995\u09B0',
    'Open': // gui.js:3110 gui.js:5924
        '\u0996\u09CB\u09B2',
    'Save': // gui.js:3111 gui.js:5927 gui.js:8995 gui.js:9133
        '\u09AA\u09CD\u09B0\u0995\u09B2\u09CD\u09AA\u099F\u09BF \u09B8\u0982\u09B0\u0995\u09CD\u09B7\u09A3 \u0995\u09B0',
    'Save As': // gui.js:3112
        '\u09AA\u09CD\u09B0\u0995\u09B2\u09CD\u09AA\u099F\u09BF\u09B0 \u09A8\u09BE\u09AE\u09BE\u09A8\u09CD\u09A4\u09B0 \u0995\u09B0',
    'Import': // gui.js:3115 gui.js:3370 gui.js:6842
        '\u09AA\u09CD\u09B0\u0995\u09B2\u09CD\u09AA \u0987\u09AE\u09CD\u09AA\u09CB\u09B0\u09CD\u099F \u0995\u09B0',
    'load an exported project file\nor block library, a costume\nor a sound': // gui.js:3146
        'XML\u09AB\u09BE\u0987\u09B2 \u09B9\u09BF\u09B8\u09C7\u09AC\u09C7 \u09B8\u0982\u09B0\u0995\u09CD\u09B7\u09BF\u09A4 \u0995\u09CB\u09A8 \u09AA\u09CD\u09B0\u0995\u09B2\u09CD\u09AA \u0987\u09AE\u09CD\u09AA\u09CB\u09B0\u09CD\u099F \u0995\u09B0',
    'Export project (in a new window)': // gui.js:3153
        undefined,
    'show project data as XML\nin a new browser window': // gui.js:3164
        '\u09AA\u09CD\u09B0\u0995\u09B2\u09CD\u09AA \u0989\u09AA\u09BE\u09A4\u09CD\u09A4 \u098F\u0995\u099F\u09BF \u09A8\u09A4\u09C1\u09A8 \u09AC\u09CD\u09B0\u09BE\u0989\u099C\u09BE\u09B0 \u0989\u0987\u09A8\u09CD\u09A1\u09CB\u09A4\u09C7 XML\u09AB\u09BE\u0987\u09B2 \u09B9\u09BF\u09B8\u09C7\u09AC\u09C7 \u09AA\u09CD\u09B0\u09A6\u09B0\u09CD\u09B6\u09A8 \u0995\u09B0',
    'Export project as plain text': // gui.js:3170
        '\u09AA\u09CD\u09B0\u0995\u09B2\u09CD\u09AA\u099F\u09BF \u09AA\u09CD\u09B2\u09C7\u0987\u09A8 \u099F\u09C7\u0995\u09CD\u09B8\u099F \u09B9\u09BF\u09B8\u09BE\u09AC\u09C7 \u098F\u0995\u09CD\u09B8\u09AA\u09CB\u09B0\u09CD\u099F \u0995\u09B0',
    'Export project': // gui.js:3171
        '\u09AA\u09CD\u09B0\u0995\u09B2\u09CD\u09AA\u099F\u09BF \u098F\u0995\u09CD\u09B8\u09AA\u09CB\u09B0\u09CD\u099F \u0995\u09B0',
    'save project data as XML\nto your downloads folder': // gui.js:3181
        undefined,
    'show global custom block definitions as XML\nin a new browser window': // gui.js:3189
        '\u09B8\u09BE\u09B0\u09CD\u09AC\u099C\u09A8\u09C0\u09A8 \u0995\u09BE\u09B8\u09CD\u099F\u09AE \u09AC\u09CD\u09B2\u0995 \u09B8\u0982\u099C\u09CD\u099E\u09BE\u09B0\u09CD\u09A5 \u098F\u0995\u099F\u09BF \u09A8\u09A4\u09C1\u09A8 \u09AC\u09CD\u09B0\u09BE\u0989\u099C\u09BE\u09B0 \u0989\u0987\u09A8\u09CD\u09A1\u09CB\u09A4\u09C7 XML\u09AB\u09BE\u0987\u09B2 \u09B9\u09BF\u09B8\u09C7\u09AC\u09C7 \u09AA\u09CD\u09B0\u09A6\u09B0\u09CD\u09B6\u09A8 \u0995\u09B0',
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
        '\u09AF\u09A8\u09CD\u09A4\u09CD\u09B0\u09AA\u09BE\u09A4\u09BF \u0987\u09AE\u09CD\u09AA\u09CB\u09B0\u09CD\u099F \u0995\u09B0',
    'load the official library of\npowerful blocks': // gui.js:3235
        '\u09B6\u0995\u09CD\u09A4\u09BF\u09B6\u09BE\u09B2\u09C0 \u09AC\u09CD\u09B2\u0995\u09C7\u09B0 \u0985\u09AB\u09BF\u09B8\u09BF\u09DF\u09BE\u09B2 \u09B2\u09BE\u0987\u09AC\u09CD\u09B0\u09C7\u09B0\u09BF \u09B2\u09CB\u09A1 \u0995\u09B0',
    'Libraries': // gui.js:3238
        '\u09B2\u09BE\u0987\u09AC\u09CD\u09B0\u09C7\u09B0\u09BF \u09B2\u09CB\u09A1 \u0995\u09B0',
    'select categories of additional blocks to add to this project': // gui.js:3248
        undefined,
    'Select a costume from the media library': // gui.js:3259
        undefined,
    'Select a sound from the media library': // gui.js:3266
        undefined,
    'Opening {{ resource }}': // gui.js:3341
        undefined,
    'License': // gui.js:3529 gui.js:3630
        '\u09B2\u09BE\u0987\u09B8\u09C7\u09A8\u09CD\u09B8',
    'Contributors': // gui.js:3548
        '\u09B8\u09BE\u09B9\u09BE\u09AF\u09CD\u09AF\u0995\u09BE\u09B0\u09C0\u09AC\u09C3\u09A8\u09CD\u09A6',
    'current module versions': // gui.js:3574
        '\u09AC\u09B0\u09CD\u09A4\u09AE\u09BE\u09A8 \u09AE\u09A1\u09BF\u0989\u09B2 \u09B8\u0982\u09B8\u09CD\u0995\u09B0\u09A3',
    'Translations': // gui.js:3578
        '\u09AD\u09BE\u09B7\u09BE\u09A8\u09CD\u09A4\u09B0\u09B8\u09AE\u09C2\u09B9',
    'About Snap': // gui.js:3581
        'Snap! \u09B8\u09AE\u09CD\u09AA\u09B0\u09CD\u0995\u09BF\u09A4 \u09A4\u09A5\u09CD\u09AF',
    'Translators': // gui.js:3597
        '\u09AD\u09BE\u09B7\u09BE\u09A8\u09CD\u09A4\u09B0\u09BF\u0995\u09AC\u09C3\u09A8\u09CD\u09A6',
    'Back': // gui.js:3613
        '\u09AA\u09CD\u09B0\u09A4\u09CD\u09AF\u09BE\u09AC\u09B0\u09CD\u09A4\u09A8 \u0995\u09B0',
    'Modules': // gui.js:3646
        '\u09AE\u09A1\u09BF\u0989\u09B2',
    'Credits': // gui.js:3662
        '\u09B8\u09CD\u09AC\u09C0\u0995\u09C3\u09A4\u09BF',
    'Project Notes': // gui.js:3709
        '\u09AA\u09CD\u09B0\u0995\u09B2\u09CD\u09AA \u09B8\u09AE\u09CD\u09AA\u09B0\u09CD\u0995\u09BF\u09AF\u09C7 \u0995\u09CB\u09A8\u09A4 \u09AE\u09A8\u09CD\u09A4\u09AC\u09CD\u09AF',
    'Saving': // gui.js:3770
        undefined,
    'Saved': // gui.js:3788 gui.js:3796
        '\u09B8\u0982\u09B0\u0995\u09CD\u09B7\u09BF\u09A4 \u09B9\u09DF\u09C7\u099B\u09C7',
    'Save failed': // gui.js:3790
        undefined,
    'Exporting': // gui.js:3811 gui.js:5464 gui.js:5493 gui.js:5503 gui.js:5521 gui.js:5533
        undefined,
    'Exported': // gui.js:3816 gui.js:5471 gui.js:5497 gui.js:5507 gui.js:5527 gui.js:5539
        undefined,
    'Export failed': // gui.js:3819 gui.js:5475 gui.js:5500 gui.js:5530
        undefined,
    'this project doesn\'t have any\ncustom global blocks yet': // gui.js:3836
        '\u098F\u0987 \u09AA\u09CD\u09B0\u0995\u09B2\u09CD\u09AA\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF \u098F\u0996\u09A8\u09CB \u0995\u09CB\u09A8\u09CB \u0995\u09BE\u09B8\u09CD\u099F\u09AE \u0997\u09CD\u09B2\u09CB\u09AC\u09BE\u09B2 \u09AC\u09CD\u09B2\u0995 \u09A8\u09C7\u0987',
    'there are currently no unused\nglobal custom blocks in this project': // gui.js:3873
        undefined,
    'Untitled': // gui.js:3937 gui.js:8190 store.js:368 store.js:1651
        '\u09B6\u09BF\u09B0\u09CB\u09A8\u09BE\u09AE\u09B9\u09C0\u09A8',
    'Variables': // gui.js:3968 objects.js:153
        '\u099A\u09B2\u0995 (Variables)',
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
        '\u09AC\u09B0\u09CD\u09A4\u09AE\u09BE\u09A8 \u09AA\u09CD\u09B0\u0995\u09B2\u09CD\u09AA\u099F\u09BF \u09A8\u09A4\u09C1\u09A8 \u09AA\u09CD\u09B0\u0995\u09B2\u09CD\u09AA \u09A6\u09CD\u09AC\u09BE\u09B0\u09BE \u09AA\u09CD\u09B0\u09A4\u09BF\u09B8\u09CD\u09A5\u09BE\u09AA\u09A8 \u0995\u09B0\u09A4\u09C7 \u099A\u09BE\u0993?',
    'New Project': // gui.js:4915
        '\u09A8\u09A4\u09C1\u09A8 \u09AA\u09CD\u09B0\u0995\u09B2\u09CD\u09AA',
    'Generating {{ filename }} file': // gui.js:5011
        undefined,
    'Could not generate the language file': // gui.js:5039
        undefined,
    'build': // gui.js:5057
        undefined,
    'your own': // gui.js:5060
        undefined,
    'blocks': // gui.js:5064
        undefined,
    'normal (1x)': // gui.js:5106
        undefined,
    'demo (1.2x)': // gui.js:5107
        undefined,
    'presentation (1.4x)': // gui.js:5108
        undefined,
    'big (2x)': // gui.js:5109
        undefined,
    'huge (4x)': // gui.js:5110
        undefined,
    'giant (8x)': // gui.js:5111
        undefined,
    'monstrous (10x)': // gui.js:5112
        undefined,
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
        '\u09B8\u0982\u09B0\u0995\u09CD\u09B7\u09BF\u09A4 \u0995\u09CB\u09A8 \u09AA\u09CD\u09B0\u0995\u09B2\u09CD\u09AA \u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u099A\u09A8 \u0995\u09B0\u09C7 \u0996\u09CB\u09B2',
    'Cloud': // gui.js:5836
        '\u0995\u09CD\u09B2\u09BE\u0989\u09A1',
    'Browser': // gui.js:5837
        '\u09AC\u09CD\u09B0\u09BE\u0989\u099C\u09BE\u09B0',
    'Examples': // gui.js:5840 gui.js:6198 gui.js:6254 gui.js:6378
        '\u09A8\u09AE\u09C1\u09A8\u09BE \u09AA\u09CD\u09B0\u0995\u09B2\u09CD\u09AA',
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
        '\u09A4\u09C1\u09AE\u09BF \u0995\u09BF \u09AE\u09C1\u099B\u09C7 \u09A6\u09C7\u0993\u09AF\u09BC\u09BE\u09B0 \u09AC\u09BF\u09B7\u09AF\u09BC\u09C7 \u09A8\u09BF\u09B6\u09CD\u099A\u09BF\u09A4?\n"{{ projectName }}"?',
    'Delete Project': // gui.js:6500 gui.js:6524
        '\u09AA\u09CD\u09B0\u0995\u09B2\u09CD\u09AA \u09AE\u09C1\u099B\u09C7 \u09AB\u09C7\u09B2',
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
        undefined,
    'open a new window\nwith a picture of the stage': // gui.js:7361 objects.js:7432
        undefined,
    'show': // gui.js:7366 morphic.js:7568 objects.js:388
        '\u09AA\u09CD\u09B0\u09A6\u09B0\u09CD\u09B6\u09A8 \u0995\u09B0',
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
        '\u09AA\u09CD\u09B0\u09C7\u09B0\u09A3 \u0995\u09B0',
    'edit rotation point only': // gui.js:7702
        undefined,
    'rename costume': // gui.js:7755
        '\u09AA\u09B0\u09BF\u099A\u09CD\u099B\u09A6 \u09A8\u09A4\u09C1\u09A8 \u09A8\u09BE\u09AE\u0995\u09B0\u09A3 \u0995\u09B0',
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
        '\n\u09A8\u09A4\u09C1\u09A8/\u0985\u09A4\u09BF\u09B0\u09BF\u0995\u09CD\u09A4 \u09AA\u09B0\u09BF\u099A\u09CD\u099B\u09A6 \u09AC\u09CD\u09AF\u09AC\u09B9\u09BE\u09B0\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF \u09AA\u09CD\u09B0\u09A5\u09AE\u09C7 \u09A1\u09BE\u09A8 \u09A6\u09BF\u0995\u09C7\u09B0 \u09A8\u09BF\u099A\u09C7\u09B0 \u09AA\u09B0\u09BF\u099A\u09CD\u099B\u09A6 \u0986\u0987\u099F\u09C7\u09AE\u09C7 \u098F\u0995\u099F\u09BF \u0995\u09CD\u09B2\u09BF\u0995 \u0995\u09B0, \u09A4\u09BE\u09B0\u09AA\u09B0 \u0995\u09AE\u09CD\u09AA\u09BF\u0989\u099F\u09BE\u09B0 \u09A5\u09C7\u0995\u09C7 \u09AA\u09CD\u09B0\u09A4\u09CD\u09AF\u09BE\u09B6\u09BF\u09A4 \u099B\u09AC\u09BF\u09B0 \u09AB\u09BE\u0987\u09B2 \u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u099A\u09A8 \u0995\u09B0\u09C7\n\u098F\u0996\u09BE\u09A8\u09C7 \u0986\u09A8\u09AF\u09BC\u09A8 \u0995\u09B0 \n\n\n\u09A8\u09A4\u09C1\u09A8/\u0985\u09A4\u09BF\u09B0\u09BF\u0995\u09CD\u09A4 \u09B8\u09CD\u09AA\u09BE\u0987\u099F \u09AC\u09CD\u09AF\u09AC\u09B9\u09BE\u09B0\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF \u09AA\u09CD\u09B0\u09A5\u09AE\u09C7 \u09A1\u09BE\u09A8 \u09A6\u09BF\u0995\u09C7\u09B0 \u09A8\u09BF\u099A\u09C7\u09B0 \u09B8\u09CD\u09AA\u09BE\u0987\u099F \u0986\u0987\u099F\u09C7\u09AE\u09C7 \u098F\u0995\u099F\u09BF \u0995\u09CD\u09B2\u09BF\u0995 \u0995\u09B0, \u09A4\u09BE\u09B0\u09AA\u09B0 \u0995\u09AE\u09CD\u09AA\u09BF\u0989\u099F\u09BE\u09B0 \u09A5\u09C7\u0995\u09C7 \u09AA\u09CD\u09B0\u09A4\u09CD\u09AF\u09BE\u09B6\u09BF\u09A4 \u099B\u09AC\u09BF\u09B0 \u09AB\u09BE\u0987\u09B2 \u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u099A\u09A8 \u0995\u09B0\u09C7\n\u098F\u0996\u09BE\u09A8\u09C7 \u0986\u09A8\u09AF\u09BC\u09A8 \u0995\u09B0\n',
    'Stop': // gui.js:8345 gui.js:8367
        '\u09AC\u09A8\u09CD\u09A7 \u0995\u09B0',
    'Play': // gui.js:8345 gui.js:8375
        '\u09AC\u09BE\u099C\u09BE\u0993',
    'Play sound': // gui.js:8348 gui.js:8376
        '\u09B6\u09AC\u09CD\u09A6 \u09AC\u09BE\u099C\u09BE\u0993',
    'Stop sound': // gui.js:8368
        '\u09B6\u09AC\u09CD\u09A6 \u09AC\u09A8\u09CD\u09A7 \u0995\u09B0',
    'rename sound': // gui.js:8432
        '\u09B6\u09AC\u09CD\u09A6 \u09A8\u09A4\u09C1\u09A8 \u09A8\u09BE\u09AE\u0995\u09B0\u09A3 \u0995\u09B0',
    'import a sound from your computer\nby dragging it into here': // gui.js:8526
        '\n\u09B6\u09AC\u09CD\u09A6 \u09AC\u09CD\u09AF\u09AC\u09B9\u09BE\u09B0\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF \u0995\u09AE\u09CD\u09AA\u09BF\u0989\u099F\u09BE\u09B0 \u09A5\u09C7\u0995\u09C7 \u09AA\u09CD\u09B0\u09A4\u09CD\u09AF\u09BE\u09B6\u09BF\u09A4 \u09B6\u09AC\u09CD\u09A6\u09C7\u09B0 \u09AB\u09BE\u0987\u09B2 \u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u099A\u09A8 \u0995\u09B0\u09C7 \u098F\u0996\u09BE\u09A8\u09C7 \u0986\u09A8\u09AF\u09BC\u09A8 \u0995\u09B0\u09A4\u09C7 \u09AA\u09BE\u09B0',
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
        '\u09A6\u09C8\u09B0\u09CD\u0998\u09CD\u09AF',
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
        '(\u0996\u09BE\u09B2\u09BF)',
    'Are you sure you want to leave?': // morphic.js:12110
        undefined,
    'demo': // morphic.js:12173
        undefined,
    'sample morphs': // morphic.js:12173
        undefined,
    'hide all': // morphic.js:12175
        undefined,
    'show all': // morphic.js:12176 objects.js:7423
        '\u09B8\u09AC \u09AA\u09CD\u09B0\u09A6\u09B0\u09CD\u09B6\u09A8 \u0995\u09B0',
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
        '\u09B8\u09CD\u09B2\u09BE\u0987\u09A1\u09BE\u09B0',
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
        '\u0997\u09A4\u09BF (Motion)',
    'Control': // objects.js:147
        '\u09A8\u09BF\u09AF\u09BC\u09A8\u09CD\u09A4\u09CD\u09B0\u09A3 (Control)',
    'Looks': // objects.js:148
        '\u09B8\u09C7\u09D7\u09A8\u09CD\u09A6\u09B0\u09CD\u09AF (Looks)',
    'Sensing': // objects.js:149
        '\u0985\u09A8\u09C1\u09AD\u09C2\u09A4\u09BF (Sensing)',
    'Sound': // objects.js:150 objects.js:8570
        '\u09B6\u09AC\u09CD\u09A6 (Sound)',
    'Operators': // objects.js:151
        '\u099A\u09BE\u09B2\u0995 (Operators)',
    'Pen': // objects.js:152
        '\u09B2\u09C7\u0996\u09A8\u09C0 (Pen)',
    'Lists': // objects.js:154
        '\u09A4\u09BE\u09B2\u09BF\u0995\u09BE (Lists)',
    'Other': // objects.js:155
        '\u0985\u09A8\u09CD\u09AF\u09BE\u09A8\u09CD\u09AF',
    'move %n steps': // objects.js:201
        '\u0985\u0997\u09CD\u09B0\u09B8\u09B0 \u09B9\u0993 %n \u09A7\u09BE\u09AA',
    'turn %clockwise %n degrees': // objects.js:208
        '\u09A1\u09BE\u09A8\u09A6\u09BF\u0995\u09C7 %clockwise %n \u09A1\u09BF\u0997\u09CD\u09B0\u09C0\u0995\u09CB\u09A3\u09C7 \u0998\u09C7\u09BE\u09B0',
    'turn %counterclockwise %n degrees': // objects.js:215
        '\u09AC\u09BE\u09AE\u09A6\u09BF\u0995\u09C7 %counterclockwise %n \u09A1\u09BF\u0997\u09CD\u09B0\u09C0\u0995\u09CB\u09A3\u09C7 \u0998\u09C7\u09BE\u09B0',
    'point in direction %dir': // objects.js:222
        '\u09A6\u09BF\u0995 \u09A8\u09BF\u09B0\u09CD\u09A7\u09BE\u09B0\u09A3 \u0995\u09B0 %dir',
    'point towards %dst': // objects.js:228
        '\u09AA\u09CD\u09B0\u09A4\u09BF \u09A8\u09BF\u09B0\u09CD\u09A6\u09C7\u09B6 \u0995\u09B0 %dst',
    'go to x: %n y: %n': // objects.js:234
        'x: %n y: %n \u0985\u09AC\u09B8\u09CD\u09A5\u09BE\u09A8\u09C7 \u09AF\u09BE\u0993',
    'go to %dst': // objects.js:241
        '%dst \u09A6\u09C1\u09B0\u09A4\u09CD\u09AC\u09C7 \u09AF\u09BE\u0993',
    'glide %n secs to x: %n y: %n': // objects.js:247
        '\u0997\u09DC\u09BF\u09DF\u09C7 \u099A\u09B2 x: %n y: %n \u0985\u09AC\u09B8\u09CD\u09A5\u09BE\u09A8\u09C7 %n \u09B8\u09C7\u0995\u09C7\u09A8\u09CD\u09A1',
    'change x by %n': // objects.js:254
        'x \u09AA\u09B0\u09BF\u09AC\u09B0\u09CD\u09A4\u09A8 \u0995\u09B0 %n \u09A6\u09CD\u09AC\u09BE\u09B0\u09BE',
    'set x to %n': // objects.js:261
        'x \u09A8\u09BF\u09B0\u09CD\u09A7\u09BE\u09B0\u09A3 \u0995\u09B0 %n',
    'change y by %n': // objects.js:268
        'y \u09AA\u09B0\u09BF\u09AC\u09B0\u09CD\u09A4\u09A8 \u0995\u09B0 %n \u09A6\u09CD\u09AC\u09BE\u09B0\u09BE',
    'set y to %n': // objects.js:275
        'y \u09A8\u09BF\u09B0\u09CD\u09A7\u09BE\u09B0\u09A3 \u0995\u09B0 %n',
    'if on edge, bounce': // objects.js:282
        '\u09AA\u09CD\u09B0\u09BE\u09A8\u09CD\u09A4 \u09B8\u09CD\u09AA\u09B0\u09CD\u09B6 \u0995\u09B0\u09B2\u09C7 \u0989\u09B2\u09CD\u099F\u09CB \u09AB\u09BF\u09B0\u09C7 \u0986\u09B8',
    'switch to costume %cst': // objects.js:307
        '\u09AA\u09B0\u09BF\u099A\u09CD\u099B\u09A6 \u09AC\u09A6\u09B2 \u0995\u09B0 %cst',
    'next costume': // objects.js:312
        '\u09AA\u09B0\u09AC\u09B0\u09CD\u09A4\u09C0 \u09AA\u09B0\u09BF\u099A\u09CD\u099B\u09A6',
    'say %s for %n secs': // objects.js:323
        '\u09AC\u09B2 %s %n \u09B8\u09C7\u0995\u09C7\u09A8\u09CD\u09A1 \u09AA\u09B0\u09CD\u09AF\u09A8\u09CD\u09A4',
    'Hello!': // objects.js:324 objects.js:331
        '\u09B9\u09CD\u09AF\u09BE\u09B2\u09CB!',
    'say %s': // objects.js:330
        '\u09AC\u09B2 %s',
    'think %s for %n secs': // objects.js:337
        '\u09AD\u09BE\u09AC %s %n \u09B8\u09C7\u0995\u09C7\u09A8\u09CD\u09A1 \u09AA\u09B0\u09CD\u09AF\u09A8\u09CD\u09A4',
    'Hmm': // objects.js:338 objects.js:345
        '\u09B9\u09C1\u09AE',
    'think %s': // objects.js:344
        '\u09AD\u09BE\u09AC %s',
    'change %eff effect by %n': // objects.js:350
        '\u09AA\u09CD\u09B0\u09AD\u09BE\u09AC %eff \u09AA\u09B0\u09BF\u09AC\u09B0\u09CD\u09A4\u09A8 \u0995\u09B0\u09CB %n \u09A6\u09CD\u09AC\u09BE\u09B0\u09BE',
    'set %eff effect to %n': // objects.js:356
        '\u09AA\u09CD\u09B0\u09AD\u09BE\u09AC %eff %n \u0997\u09C1\u09A3 \u09A8\u09BF\u09B0\u09CD\u09A7\u09BE\u09B0\u09A3 \u0995\u09B0',
    'clear graphic effects': // objects.js:362
        '\u099A\u09BF\u09A4\u09CD\u09B0\u09B2\u09C7\u0996 \u09AA\u09CD\u09B0\u09AD\u09BE\u09AC \u09AA\u09B0\u09BF\u09B7\u09CD\u0995\u09BE\u09B0 \u0995\u09B0',
    'change size by %n': // objects.js:368
        '\u0986\u0995\u09BE\u09B0 %n \u0997\u09C1\u09A3 \u09AA\u09B0\u09BF\u09AC\u09B0\u09CD\u09A4\u09A8 \u0995\u09B0',
    'set size to %n %': // objects.js:375
        '\u0986\u0995\u09BE\u09B0 %n % \u09A8\u09BF\u09B0\u09CD\u09A7\u09BE\u09B0\u09A3 \u0995\u09B0',
    'go to front': // objects.js:400
        '\u09B8\u09BE\u09AE\u09A8\u09C7 \u09AF\u09BE\u0993',
    'go back %n layers': // objects.js:406
        '\u09AA\u09B6\u09CD\u099A\u09BE\u09A4\u09C7 \u09AF\u09BE\u0993 %n \u09B8\u09CD\u09A4\u09B0',
    'save %imgsource as costume named %s': // objects.js:412
        undefined,
    'wardrobe': // objects.js:421
        undefined,
    'alert %mult%s': // objects.js:428
        '\u09B8\u09A4\u09B0\u09CD\u0995: %mult%s',
    'console log %mult%s': // objects.js:434
        '\u0995\u09A8\u09B8\u09CB\u09B2 \u09B2\u0997: %mult%s',
    'play sound %snd': // objects.js:441
        '\u09B6\u09AC\u09CD\u09A6 \u09AC\u09BE\u099C\u09BE\u0993 %snd',
    'play sound %snd until done': // objects.js:446
        '%snd \u09B6\u09AC\u09CD\u09A6 \u09AC\u09BE\u099C\u09BE\u0993 \u09AF\u09A4\u0995\u09CD\u09B7\u09A3 \u09A8\u09BE',
    'stop all sounds': // objects.js:451
        '\u09B8\u0995\u09B2 \u09B6\u09AC\u09CD\u09A6 \u09AC\u09A8\u09CD\u09A7 \u0995\u09B0',
    'rest for %n beats': // objects.js:456
        '\u09A8\u09C0\u09B0\u09AC \u09A5\u09BE\u0995 %n \u09B8\u09CD\u09AC\u09B0\u0995\u09AE\u09CD\u09AA \u09AA\u09B0\u09CD\u09AF\u09A8\u09CD\u09A4',
    'play note %note for %n beats': // objects.js:462
        undefined,
    'set instrument to %inst': // objects.js:468
        undefined,
    'change tempo by %n': // objects.js:474
        '\u09B6\u09AC\u09CD\u09A6\u09C7\u09B0 \u0995\u09AE\u09CD\u09AA\u09A8\u09AE\u09BE\u09A4\u09CD\u09B0\u09BE %n \u09AA\u09B0\u09BF\u09AC\u09B0\u09CD\u09A4\u09A8 \u0995\u09B0',
    'set tempo to %n bpm': // objects.js:480
        '\u09B6\u09AC\u09CD\u09A6\u09C7\u09B0 \u0995\u09AE\u09CD\u09AA\u09A8\u09AE\u09BE\u09A4\u09CD\u09B0\u09BE %n \u09A8\u09BF\u09B0\u09CD\u09A7\u09BE\u09B0\u09A3 \u0995\u09B0',
    'tempo': // objects.js:486
        '\u09B6\u09AC\u09CD\u09A6\u09C7\u09B0 \u0995\u09AE\u09CD\u09AA\u09A8\u09AE\u09BE\u09A4\u09CD\u09B0\u09BE',
    'jukebox': // objects.js:494
        undefined,
    'clear': // objects.js:501 paint.js:230
        '\u09AA\u09B0\u09BF\u099A\u09CD\u099B\u09A6 \u09AA\u09B0\u09BF\u09B7\u09CD\u0995\u09BE\u09B0 \u0995\u09B0',
    'pen down': // objects.js:507
        '\u09B2\u09C7\u0996\u09A8\u09C0 \u09A8\u09BF\u09AE\u09CD\u09A8\u0997\u09BE\u09AE\u09C0 \u0995\u09B0',
    'pen up': // objects.js:513
        '\u09B2\u09C7\u0996\u09A8\u09C0 \u098A\u09B0\u09CD\u09A7\u09CD\u09AC\u0997\u09BE\u09AE\u09C0 \u0995\u09B0',
    'set pen color to %clr': // objects.js:519
        '\u09B2\u09C7\u0996\u09A8\u09C0\u09B0 \u09B0\u0999 %clr \u09A8\u09BF\u09B0\u09CD\u09A7\u09BE\u09B0\u09A3 \u0995\u09B0',
    'change pen color by %n': // objects.js:525
        '\u09B2\u09C7\u0996\u09A8\u09C0\u09B0 \u09B0\u0999 %n \u09AA\u09B0\u09BF\u09AC\u09B0\u09CD\u09A4\u09A8 \u0995\u09B0',
    'set pen color to %n': // objects.js:532
        '\u09B2\u09C7\u0996\u09A8\u09C0\u09B0 \u09B0\u0999 %n \u09A8\u09BF\u09B0\u09CD\u09A7\u09BE\u09B0\u09A3 \u0995\u09B0',
    'change pen shade by %n': // objects.js:539
        '\u09B2\u09C7\u0996\u09A8\u09C0\u09B0 \u099B\u09BE\u09AF\u09BC\u09BE %n \u09AA\u09B0\u09BF\u09AC\u09B0\u09CD\u09A4\u09A8 \u0995\u09B0',
    'set pen shade to %n': // objects.js:546
        '\u09B2\u09C7\u0996\u09A8\u09C0\u09B0 \u099B\u09BE\u09AF\u09BC\u09BE %n \u09A8\u09BF\u09B0\u09CD\u09A7\u09BE\u09B0\u09A3 \u0995\u09B0',
    'change pen size by %n': // objects.js:553
        '\u09B2\u09C7\u0996\u09A8\u09C0\u09B0 \u0986\u0995\u09BE\u09B0 \u09AA\u09B0\u09BF\u09AC\u09B0\u09CD\u09A4\u09A8 \u0995\u09B0 %n',
    'set pen size to %n': // objects.js:560
        '\u09B2\u09C7\u0996\u09A8\u09C0\u09B0 \u0986\u0995\u09BE\u09B0 \u09A8\u09BF\u09B0\u09CD\u09A7\u09BE\u09B0\u09A3 \u0995\u09B0 %n',
    'stamp': // objects.js:567
        '\u09B8\u09C0\u09B2\u09AE\u09C7\u09BE\u09B9\u09B0',
    'fill': // objects.js:573
        undefined,
    'when %greenflag clicked': // objects.js:585
        '\u09AF\u0996\u09A8 %greenflag \u0995\u09CD\u09B2\u09BF\u0995 \u0995\u09B0',
    'when %keyHat key pressed': // objects.js:590
        '\u09AF\u0996\u09A8 %keyHat \u0995\u09CD\u09B2\u09BF\u0995 \u0995\u09B0',
    'when I am %interaction': // objects.js:595
        undefined,
    'when I receive %msgHat': // objects.js:601
        '\u09AF\u0996\u09A8 \u0986\u09AE\u09BF \u0997\u09CD\u09B0\u09B9\u09A3 \u0995\u09B0\u09BF %msgHat',
    'when %b': // objects.js:606
        undefined,
    'broadcast %msg': // objects.js:611
        '\u09AC\u09BE\u09B0\u09CD\u09A4\u09BE \u09B8\u09AE\u09CD\u09AA\u09CD\u09B0\u099A\u09BE\u09B0 \u0995\u09B0 %msg',
    'broadcast %msg and wait': // objects.js:616
        '\u09AC\u09BE\u09B0\u09CD\u09A4\u09BE \u09B8\u09AE\u09CD\u09AA\u09CD\u09B0\u099A\u09BE\u09B0 \u0995\u09B0\u09C7 %msg \u0985\u09AA\u09C7\u0995\u09CD\u09B7\u09BE \u0995\u09B0',
    'message': // objects.js:621
        '\u09AC\u09BE\u09B0\u09CD\u09A4\u09BE',
    'wait %n secs': // objects.js:626
        '\u0985\u09AA\u09C7\u0995\u09CD\u09B7\u09BE \u0995\u09B0 %n \u09B8\u09C7\u0995\u09C7\u09A3\u09A1',
    'wait until %b': // objects.js:632
        '\u0985\u09AA\u09C7\u0995\u09CD\u09B7\u09BE \u0995\u09B0 %b \u09AF\u09A4\u0995\u09CD\u09B7\u09A3 \u09A8\u09BE',
    'forever %c': // objects.js:637
        '\u0985\u09A8\u09A8\u09CD\u09A4\u0995\u09BE\u09B2 \u0995\u09B0 %c',
    'repeat %n %c': // objects.js:642
        '\u09AA\u09C1\u09A8\u09B0\u09BE\u09AC\u09C3\u09A4\u09CD\u09A4\u09BF \u0995\u09B0 %n \u09AC\u09BE\u09B0 %c',
    'repeat until %b %c': // objects.js:648
        '\u09AA\u09C1\u09A8\u09B0\u09BE\u09AF\u09BC \u0995\u09B0 \u09AF\u09A4\u0995\u09CD\u09B7\u09A3 \u09A8\u09BE %b %c',
    'if %b %c': // objects.js:653
        '\u09AF\u09A6\u09BF \u09B9\u09AF\u09BC %b %c',
    'if %b %c else %c': // objects.js:658
        '\u09AF\u09A6\u09BF \u09B9\u09AF\u09BC %b %c \u0985\u09A8\u09CD\u09AF\u09A5\u09BE\u09AF\u09BC %c',
    'stop %stopChoices': // objects.js:678
        undefined,
    'run %cmdRing %inputs': // objects.js:693
        '\u099A\u09BE\u09B2\u09A8\u09BE \u0995\u09B0 %cmdRing %inputs',
    'launch %cmdRing %inputs': // objects.js:698
        '\u09B6\u09C1\u09B0\u09C1 \u0995\u09B0 %cmdRing %inputs',
    'call %repRing %inputs': // objects.js:703
        '\u0986\u09B9\u09CD\u09AC\u09BE\u09A8 \u0995\u09B0 %repRing %inputs',
    'report %s': // objects.js:708
        '\u09AA\u09CD\u09B0\u09A4\u09BF\u09AC\u09C7\u09A6\u09A8 %s',
    'run %cmdRing w/continuation': // objects.js:720
        '\u099A\u09BE\u09B2\u09A8\u09BE \u0995\u09B0 %cmdRing \u09A7\u09BE\u09B0\u09BE\u09AC\u09BE\u09B9\u09BF\u0995\u09A4\u09BE\u09B0 \u09B8\u0999\u09CD\u0997\u09C7',
    'call %cmdRing w/continuation': // objects.js:725
        '\u0986\u09B9\u09CD\u09AC\u09BE\u09A8 \u0995\u09B0 %cmdRing \u09A7\u09BE\u09B0\u09BE\u09AC\u09BE\u09B9\u09BF\u0995\u09A4\u09BE\u09B0 \u09B8\u0999\u09CD\u0997\u09C7',
    'warp %c': // objects.js:730
        '\u098F\u0995\u09A4\u09CD\u09B0\u09BF\u09A4 \u0995\u09B0 %c',
    'tell %spr to %cmdRing %inputs': // objects.js:739
        undefined,
    'ask %spr for %repRing %inputs': // objects.js:744
        undefined,
    'when I start as a clone': // objects.js:752
        '\u09AF\u0996\u09A8 \u0986\u09AE\u09BF \u098F\u0995\u099F\u09BF \u0995\u09CD\u09B2\u09CB\u09A8 \u09B9\u09BF\u09B8\u09C7\u09AC\u09C7 \u09B6\u09C1\u09B0\u09C1 \u0995\u09B0\u09BF',
    'create a clone of %cln': // objects.js:757
        '%cln \u098F\u0995\u099F\u09BF \u0995\u09CD\u09B2\u09CB\u09A8 \u098F\u09B0 \u09B8\u09C3\u09B7\u09CD\u099F\u09BF \u0995\u09B0',
    'a new clone of %cln': // objects.js:762
        undefined,
    'delete this clone': // objects.js:768
        '\u098F\u0987 \u0995\u09CD\u09B2\u09CB\u09A8\u099F\u09BF \u09AE\u09C1\u099B\u09C7 \u09AB\u09C7\u09B2',
    'pause all %pause': // objects.js:776
        '\u09B8\u09AC \u09B8\u09CD\u09A5\u0997\u09BF\u09A4 \u0995\u09B0 %pause',
    'touching %col ?': // objects.js:785
        '\u09B8\u09CD\u09AA\u09B0\u09CD\u09B6 \u0995\u09B0\u09C7\u099B\u09C7 \u0995\u09BF\u09A8\u09BE %col ?',
    'touching %clr ?': // objects.js:791
        '\u09B8\u09CD\u09AA\u09B0\u09CD\u09B6 \u09B0\u0999 %clr \u0995\u09BF\u09A8\u09BE?',
    'color %clr is touching %clr ?': // objects.js:797
        '%clr \u09B0\u0999 %clr \u09B0\u0999 \u0997\u09BE\u09AE\u09C0 \u0995\u09BF\u09A8\u09BE?',
    'filtered for %clr': // objects.js:803
        '\u09AB\u09BF\u09B2\u09CD\u099F\u09BE\u09B0 \u0995\u09B0\u09BE \u09B9\u09DF\u09C7\u099B\u09C7 %clr \u098F\u09B0 \u099C\u09A8\u09CD\u09AF',
    'stack size': // objects.js:809
        '\u09B8\u09CD\u099F\u09CD\u09AF\u09BE\u0995\u09C7\u09B0 \u0986\u0995\u09BE\u09B0',
    'frames': // objects.js:815
        '\u09AB\u09CD\u09B0\u09C7\u09AE\u09B8\u09AE\u09C2\u09B9',
    'processes': // objects.js:821
        undefined,
    'ask %s and wait': // objects.js:826
        '%s \u099C\u09BF\u099C\u09CD\u099E\u09BE\u09B8\u09BE \u0995\u09B0\u09C7 \u0985\u09AA\u09C7\u0995\u09CD\u09B7\u09BE \u0995\u09B0',
    'what\'s your name?': // objects.js:827
        '\u09A4\u09CB\u09AE\u09BE\u09B0 \u09A8\u09BE\u09AE \u0995\u09BF?',
    'answer': // objects.js:833 objects.js:838
        '\u099C\u09AC\u09BE\u09AC',
    'mouse x': // objects.js:843
        '\u09AE\u09BE\u0989\u09B8 x',
    'mouse y': // objects.js:848
        '\u09AE\u09BE\u0989\u09B8 y',
    'mouse down?': // objects.js:853
        '\u09AE\u09BE\u0989\u09B8 \u09AC\u09CB\u09A4\u09BE\u09AE \u099A\u09BE\u09AA\u09BE \u0995\u09BF\u09A8\u09BE?',
    'key %key pressed?': // objects.js:858
        '\u0995\u09CB\u09A8 \u0995\u09C0 %key \u099A\u09BE\u09AA\u09BE \u0995\u09BF\u09A8\u09BE?',
    '%rel to %dst': // objects.js:871
        undefined,
    'reset timer': // objects.js:877
        '\u09B8\u09AE\u09AF\u09BC \u09A8\u09BF\u09B0\u09CD\u09A3\u09BE\u09AF\u09BC\u0995 \u09AA\u09C1\u09A8:\u09B8\u09CD\u09A5\u09BE\u09AA\u09A8 \u0995\u09B0',
    'timer': // objects.js:883 objects.js:888
        '\u09B8\u09AE\u09AF\u09BC \u09A8\u09BF\u09B0\u09CD\u09A3\u09BE\u09AF\u09BC\u0995',
    '%att of %spr': // objects.js:893
        '%att \u09B2\u0995\u09CD\u09B7\u09A3 %spr \u098F\u09B0 ',
    'url %s': // objects.js:899
        undefined,
    'turbo mode?': // objects.js:905
        '\u099F\u09BE\u09B0\u09CD\u09AC\u09CB \u09AE\u09CB\u09A1 \u0995\u09BF\u09A8\u09BE?',
    'set turbo mode to %b': // objects.js:910
        '\u099F\u09BE\u09B0\u09CD\u09AC\u09CB \u09AE\u09CB\u09A1\u0995\u09C7 %b \u09A8\u09BF\u09B0\u09CD\u09A7\u09BE\u09B0\u09A3 \u0995\u09B0',
    'current %dates': // objects.js:915
        undefined,
    'my %get': // objects.js:920
        undefined,
    'round %n': // objects.js:968
        '%n \u098F\u09B0 \u09A8\u09BF\u0995\u099F\u09A4\u09AE \u09AA\u09C2\u09B0\u09CD\u09A3\u09B8\u0982\u0996\u09CD\u09AF\u09BE',
    '%fun of %n': // objects.js:973
        '%fun \u09A8\u09BF\u09B0\u09CD\u09A3\u09DF \u0995\u09B0 %n',
    '%n mod %n': // objects.js:979
        '%n \u09AD\u09BE\u0997 %n \u098F\u09B0 \u0985\u09AC\u09B6\u09BF\u09B7\u09CD\u099F',
    'pick random %n to %n': // objects.js:984
        '\u09AF\u09C7 \u0995\u09CB\u09A8\u09CB \u098F\u0995\u099F\u09BF \u09B8\u0982\u0996\u09CD\u09AF\u09BE %n \u09A5\u09C7\u0995\u09C7 %n \u09AA\u09B0\u09CD\u09AF\u09A8\u09CD\u09A4',
    '%b and %b': // objects.js:1005
        '%b \u098F\u09AC\u0982 %b',
    '%b or %b': // objects.js:1010
        '%b \u0985\u09A5\u09AC\u09BE %b',
    'not %b': // objects.js:1015
        '\u09A8\u09BE %b',
    'join %words': // objects.js:1033
        '\u09B8\u0982\u09AF\u09C1\u0995\u09CD\u09A4 \u0995\u09B0 %words',
    'hello': // objects.js:1034 objects.js:1075
        '\u09B9\u09CD\u09AF\u09BE\u09B2\u09CB',
    'world': // objects.js:1034 objects.js:1040 objects.js:1046 objects.js:1075
        '\u09AA\u09C3\u09A5\u09BF\u09AC\u09C0',
    'letter %n of %s': // objects.js:1039
        '%n -\u09A4\u09AE \u09AC\u09B0\u09CD\u09A3 %s \u098F\u09B0',
    'length of %s': // objects.js:1045
        '%s \u098F\u09B0 \u09AC\u09B0\u09CD\u09A3\u09A6\u09C8\u09B0\u09CD\u0998\u09CD\u09AF',
    'unicode of %s': // objects.js:1051
        '%s \u09AC\u09B0\u09CD\u09A3\u09C7\u09B0 \u0987\u0989\u09A8\u09BF\u0995\u09CB\u09A1',
    'unicode %n as letter': // objects.js:1057
        '\u0987\u0989\u09A8\u09BF\u0995\u09CB\u09A1 %n \u09AC\u09B0\u09CD\u09A3 \u09B9\u09BF\u09B8\u09C7\u09AC\u09C7',
    'is %s a %typ ?': // objects.js:1063
        '%s \u098F\u0987 \u09AA\u09CD\u09B0\u0995\u09BE\u09B0\u09C7\u09B0 \u0995\u09BF\u09A8\u09BE %typ ?',
    'is %s identical to %s ?': // objects.js:1069
        '%s \u098F\u09B0 \u09B8\u09AE\u09A4\u09C1\u09B2\u09CD\u09AF %s \u0995\u09BF\u09A8\u09BE?',
    'split %s by %delim': // objects.js:1074
        undefined,
    'JavaScript function ( %mult%s ) { %code }': // objects.js:1080
        undefined,
    'type of %s': // objects.js:1086
        '%s \u098F\u09B0 \u09AA\u09CD\u09B0\u0995\u09BE\u09B0\u09C7',
    '%txtfun of %s': // objects.js:1093
        undefined,
    'compile %repRing': // objects.js:1099
        undefined,
    'set %var to %s': // objects.js:1119
        '%var \u099A\u09B2\u0995\u099F\u09BF \u09AE\u09BE\u09A8 %s \u09A8\u09BF\u09B0\u09CD\u09A7\u09BE\u09B0\u09A3 \u0995\u09B0',
    'change %var by %n': // objects.js:1125
        '%var \u099A\u09B2\u0995\u099F\u09BF \u09AE\u09BE\u09A8 %n \u09A6\u09CD\u09AC\u09BE\u09B0\u09BE \u09AA\u09B0\u09BF\u09AC\u09B0\u09CD\u09A4\u09A8 \u0995\u09B0',
    'show variable %var': // objects.js:1131
        '%var \u099A\u09B2\u0995\u099F\u09BF \u09AA\u09CD\u09B0\u09A6\u09B0\u09CD\u09B6\u09A8 \u0995\u09B0',
    'hide variable %var': // objects.js:1136
        '%var \u099A\u09B2\u0995\u099F\u09BF \u0997\u09C7\u09BE\u09AA\u09A8 \u0995\u09B0',
    'script variables %scriptVars': // objects.js:1141
        '\u09B8\u09CD\u0995\u09CD\u09B0\u09BF\u09AA\u09CD\u099F \u099A\u09B2\u0995\u09B8\u09AE\u09C2\u09B9 %scriptVars',
    'inherit %shd': // objects.js:1148
        undefined,
    'list %exp': // objects.js:1155
        '\u09A4\u09BE\u09B2\u09BF\u0995\u09BE %exp',
    '%s in front of %l': // objects.js:1160
        '%s %l \u09A4\u09BE\u09B2\u09BF\u0995\u09BE\u09B0 \u09B8\u09BE\u09AE\u09A8\u09C7',
    'item %idx of %l': // objects.js:1165
        '%idx \u0989\u09AA\u09BE\u09A6\u09BE\u09A8\u099F\u09BF %l \u09A4\u09BE\u09B2\u09BF\u0995\u09BE\u09B0',
    'all but first of %l': // objects.js:1171
        '%l \u09A4\u09BE\u09B2\u09BF\u0995\u09BE\u09B0 \u09B8\u09AC \u0995\u09BF\u09A8\u09CD\u09A4\u09C1 \u09AA\u09CD\u09B0\u09A5\u09AE\u099F\u09BF \u09AC\u09BE\u09A6\u09C7',
    'length of %l': // objects.js:1176
        '%l \u09A4\u09BE\u09B2\u09BF\u0995\u09BE\u09B0 \u09A6\u09C8\u09B0\u09CD\u0998\u09CD\u09AF',
    '%l contains %s': // objects.js:1181
        '%l \u09A4\u09BE\u09B2\u09BF\u0995\u09BE %s \u0989\u09AA\u09BE\u09A6\u09BE\u09A8\u099F\u09BF \u09A7\u09BE\u09B0\u09A3 \u0995\u09B0\u09C7',
    'thing': // objects.js:1182 objects.js:1188 objects.js:1200 objects.js:1206
        '\u09AC\u09BF\u09B7\u09AF\u09BC',
    'add %s to %l': // objects.js:1187
        '%s \u0995\u09C7 %l \u09A4\u09C7 \u09B8\u0982\u09AF\u09C1\u0995\u09CD\u09A4 \u0995\u09B0',
    'delete %ida of %l': // objects.js:1193
        '%ida \u0995\u09C7 %l \u09A5\u09C7\u0995\u09C7 \u09AE\u09C1\u099B\u09C7 \u09AB\u09C7\u09B2',
    'insert %s at %idx of %l': // objects.js:1199
        '%s \u0995\u09C7 %idx \u09B8\u09CD\u09A5\u09BE\u09A8\u09C7 %l \u09A4\u09BE\u09B2\u09BF\u0995\u09BE\u09AF\u09BC \u09B8\u09A8\u09CD\u09A8\u09BF\u09AC\u09C7\u09B6\u09BF\u09A4 \u0995\u09B0',
    'replace item %idx of %l with %s': // objects.js:1205
        '%idx \u09B8\u09CD\u09A5\u09BE\u09A8\u09C7\u09B0 %l \u09A4\u09BE\u09B2\u09BF\u0995\u09BE\u09B0 \u0989\u09AA\u09BE\u09A6\u09BE\u09A8\u099F\u09BF %s \u09A6\u09CD\u09AC\u09BE\u09B0\u09BE \u09AA\u09CD\u09B0\u09A4\u09BF\u09B8\u09CD\u09A5\u09BE\u09AA\u09A8 \u0995\u09B0',
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
        '\u09B8\u09CD\u09AA\u09BE\u0987\u099F',
    'that name is already in use': // objects.js:1859 objects.js:7047
        undefined,
    'development mode\ndebugging primitives': // objects.js:1932 objects.js:2089 objects.js:2155 objects.js:2268 objects.js:7085 objects.js:7214 objects.js:7280 objects.js:7376
        '\u0989\u09A8\u09CD\u09A8\u09AF\u09BC\u09A8 \u09AE\u09CB\u09A1\n\u09A1\u09BF\u09AC\u09BE\u0997\u09BF\u0982 \u09AA\u09CD\u09B0\u09BF\u09AE\u09BF\u099F\u09BF\u09AD',
    'Make a variable': // objects.js:2184 objects.js:7309
        '\u098F\u0995\u099F\u09BF \u099A\u09B2\u0995 \u09A4\u09C8\u09B0\u09C0 \u0995\u09B0',
    'Delete a variable': // objects.js:2205 objects.js:7327
        '\u099A\u09B2\u0995\u099F\u09BF \u09AE\u09C1\u099B\u09C7 \u09AB\u09C7\u09B2',
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
        '\u09A6\u09C3\u09B6\u09CD\u09AF\u09B8\u09CD\u09A5\u09B2',
    'stop': // objects.js:6770 costumes/COSTUMES:486
        undefined,
    'terminate all running threads': // objects.js:6774
        undefined,
    'Stage selected:\nno motion primitives': // objects.js:7060
        '\u09B8\u09CD\u099F\u09C7\u099C \u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u099A\u09BF\u09A4 \u09B9\u09DF\u09C7\u099B\u09C7:\n \u0995\u09CB\u09A8 \u0997\u09A4\u09BF\u09B6\u09C0\u09B2 \u09AA\u09CD\u09B0\u09BF\u09AE\u09BF\u099F\u09BF\u09AD \u09A8\u09C7\u0987\ndisponibles',
    'turn all pen trails and stamps\ninto a new costume for the\ncurrently selected sprite': // objects.js:7445
        undefined,
    'turn all pen trails and stamps\ninto a new background for the stage': // objects.js:7447
        undefined,
    'Background': // objects.js:7817
        undefined,
    'a {{ className }}({{ name }})': // objects.js:8096
        undefined,
    'click or drag crosshairs to move the rotation center': // objects.js:8296
        '\u0998\u09C2\u09B0\u09CD\u09A3\u09A8 \u0995\u09C7\u09A8\u09CD\u09A6\u09CD\u09B0 \u09B8\u09B0\u09BE\u09A4\u09C7 crosshairs \u0995\u09CD\u09B2\u09BF\u0995 \u0995\u09B0 \u0985\u09A5\u09AC\u09BE \u099F\u09C7\u09A8\u09C7 \u0986\u09A8',
    'Costume Editor': // objects.js:8308
        '\u09AA\u09B0\u09BF\u099A\u09CD\u099B\u09A6 \u09B8\u09AE\u09CD\u09AA\u09BE\u09A6\u09A8\u0995\u09BE\u09B0\u09C0',
    'an {{ className }}({{ name }})': // objects.js:8395
        undefined,
    'Web Audio API is not supported\nin this browser': // objects.js:8629
        undefined,
    'normal': // objects.js:9452
        '\u09B8\u09CD\u09AC\u09BE\u09AD\u09BE\u09AC\u09BF\u0995',
    'large': // objects.js:9456
        '\u09AC\u09C3\u09B9\u09CE',
    'slider min': // objects.js:9466
        '\u09B8\u09CD\u09B2\u09BE\u0987\u09A1\u09BE\u09B0 \u09B8\u09B0\u09CD\u09AC\u09A8\u09BF\u09AE\u09CD\u09A8',
    'slider max': // objects.js:9470
        '\u09B8\u09CD\u09B2\u09BE\u0987\u09A1\u09BE\u09B0 \u09B8\u09B0\u09CD\u09AC\u09C7\u09BE\u099A\u09CD\u099A',
    'import': // objects.js:9475
        undefined,
    'Unable to import': // objects.js:9501
        undefined,
    '{{ appName }} can only import "text" files.\nYou selected a file of type "{{ type }}".': // objects.js:9502
        undefined,
    'Slider minimum value': // objects.js:9588
        '\u09B8\u09CD\u09B2\u09BE\u0987\u09A1\u09BE\u09B0\u09C7\u09B0 \u09B8\u09B0\u09CD\u09AC\u09A8\u09BF\u09AE\u09CD\u09A8 \u09AE\u09BE\u09A8',
    'Slider maximum value': // objects.js:9604
        '\u09B8\u09CD\u09B2\u09BE\u0987\u09A1\u09BE\u09B0\u09C7\u09B0 \u09B8\u09B0\u09CD\u09AC\u09C7\u09BE\u099A\u09CD\u099A \u09AE\u09BE\u09A8',
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
        '\u09B9\u09CD\u09AF\u09BE\u0981',
    'No': // widgets.js:1608
        '\u09A8\u09BE',
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
};

// ✂ - - - - - - - - - - - - - - - - -  -   -
// The following are strings that were used once by Snap! but not anymore
// (or just mispelled strings)
// Feel free to delete or keep them for future references
SnapTranslator.dict.bn.deprecated = {
    'add a new sprite':
        '\u098F\u0995\u099F\u09BF \u09A8\u09A4\u09C1\u09A8 \u09B8\u09CD\u09AA\u09BE\u0987\u099F \u09AF\u09CB\u0997 \u0995\u09B0',
    'play note %n for %n beats':
        '\u09AE\u09A8\u09CD\u09A4\u09AC\u09CD\u09AF %n \u09AC\u09BE\u099C\u09BE\u0993 %n \u09B8\u09CD\u09AC\u09B0\u0995\u09AE\u09CD\u09AA',
    'when I am clicked':
        '\u09AF\u0996\u09A8 \u0986\u09AE\u09BE\u0995\u09C7 \u0995\u09CD\u09B2\u09BF\u0995 \u0995\u09B0',
    'initialize':
        '\u0986\u09B0\u09AE\u09CD\u09AD \u0995\u09B0',
    'push':
        '\u09AA\u09C1\u09B6',
    'pull':
        '\u09AA\u09C1\u09B2',
    'stop block':
        '\u09AC\u09CD\u09B2\u0995 \u09AC\u09A8\u09CD\u09A7 \u0995\u09B0',
    'stop script':
        '\u09AC\u09B0\u09CD\u09A3\u09A8\u09BE \u09AC\u09A8\u09CD\u09A7 \u0995\u09B0',
    'stop all %stop':
        '\u09B8\u09AC \u09AC\u09A8\u09CD\u09A7 \u0995\u09B0 %stop',
    'distance to %dst':
        '\u09AA\u09B0\u09CD\u09AF\u09A8\u09CD\u09A4 \u09A6\u09C2\u09B0\u09A4\u09CD\u09AC %dst',
    'http:// %s':
        'http:// %s',
    'Snap! website':
        'Snap! \u0993\u09DF\u09C7\u09AC\u09B8\u09BE\u0987\u099F',
    'uncheck to allow\nscript reentrancy':
        '\u09AC\u09B0\u09CD\u09A3\u09A8\u09BE \u09AA\u09C1\u09A8\u09AA\u09CD\u09B0\u09AC\u09C7\u09B6 \u0985\u09A8\u09C1\u09AE\u09C7\u09BE\u09A6\u09A8 \u0995\u09B0\u09BE\u09B0 \u099C\u09A8\u09CD\u09AF \u0986\u09A8\u099A\u09C7\u0995 \u0995\u09B0',
    'check to disallow\nscript reentrancy':
        '\u09AC\u09B0\u09CD\u09A3\u09A8\u09BE \u09AA\u09C1\u09A8\u09AA\u09CD\u09B0\u09AC\u09C7\u09B6 \u0985\u09A8\u09C1\u09AE\u09C7\u09BE\u09A6\u09A8 \u09A8\u09BE \u0995\u09B0\u09BE\u09B0 \u099C\u09A8\u09CD\u09AF \u099A\u09C7\u0995 \u0995\u09B0',
    'Ok':
        '\u09A0\u09BF\u0995 \u0986\u099B\u09C7',
    'Saved!':
        '\u09B8\u0982\u09B0\u0995\u09CD\u09B7\u09BF\u09A4 \u09B9\u09DF\u09C7\u099B\u09C7!',
    'Are you sure you want to delete':
        '\u09A4\u09C1\u09AE\u09BF \u0995\u09BF \u09AE\u09C1\u099B\u09C7 \u09A6\u09C7\u0993\u09AF\u09BC\u09BE\u09B0 \u09AC\u09BF\u09B7\u09AF\u09BC\u09C7 \u09A8\u09BF\u09B6\u09CD\u099A\u09BF\u09A4?',
    'Save Project As':
        '\u09AA\u09CD\u09B0\u0995\u09B2\u09CD\u09AA\u099F\u09BF \u09A8\u09BE\u09AE\u09BE\u09A8\u09CD\u09A4\u09B0 \u0995\u09B0',
    'Single input.':
        '\u098F\u0995\u0995 \u0987\u09A8\u09AA\u09C1\u099F',
    'new':
        '\u09A8\u09A4\u09C1\u09A8 \u09AC\u09BE\u09B0\u09CD\u09A4\u09BE \u09B2\u09BF\u0996',
    '\u09AA\u09B0\u09AE\u09AE\u09BE\u09A8':
        'abs',
};
