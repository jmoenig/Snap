/*

    lang-hu.js

    Hungarian translation for Snap!

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
SnapTranslator.dict.hu = {
    metadata: {
        'name': // the name as it should appear in the language menu
            'Magyar',
        'english_name': // the english name of the language
            'Hungarian',
        'translators': [ // translators authors for the Translators tab
            'Mak\u00E1ny Gy\u00F6rgy <makany.gyorgy@gmail.com>'
        ],
        'last_changed': // this, too, will appear in the Translators tab
            '2015-07-26',
    },
    strings: {},
};
// ✂ - - - - - - - - - - - - - - - - -  -   -

SnapTranslator.dict.hu.strings = {
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
        'ceruza nyomvonalak',
    'stage image': // blocks.js:821
        undefined,
    'with inputs': // blocks.js:831
        'bevitelekkel',
    'block variables': // blocks.js:840 byob.js:1053
        undefined,
    'Input Names': // blocks.js:844
        'Beviteli n\u00E9v',
    'input names': // blocks.js:850
        'beviteli n\u00E9v',
    'Input name': // blocks.js:902 blocks.js:5344
        'A bevitel neve',
    '(90) right': // blocks.js:935 morphic.js:4888
        '(90) jobbra',
    '(-90) left': // blocks.js:936 morphic.js:4889
        '(-90) balra',
    '(0) up': // blocks.js:937 morphic.js:4890
        '(0) fel',
    '(180) down': // blocks.js:938 morphic.js:4891
        '(180) le',
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
        'janu\u00E1r',
    'February': // blocks.js:969 widgets.js:1942
        'febru\u00E1r',
    'March': // blocks.js:970 widgets.js:1943
        'm\u00E1rcius',
    'April': // blocks.js:971 widgets.js:1944
        '\u00E1prilis',
    'May': // blocks.js:972 widgets.js:1945
        'm\u00E1jus',
    'June': // blocks.js:973 widgets.js:1946
        'j\u00FAnius',
    'July': // blocks.js:974 widgets.js:1947
        'j\u00FAlius',
    'August': // blocks.js:975 widgets.js:1948
        'augusztus',
    'September': // blocks.js:976 widgets.js:1949
        'szeptember',
    'October': // blocks.js:977 widgets.js:1950
        'okt\u00F3ber',
    'November': // blocks.js:978 widgets.js:1951
        'november',
    'December': // blocks.js:979 widgets.js:1952
        'december',
    'clicked': // blocks.js:988
        'r\u00E1m kattintanak',
    'pressed': // blocks.js:989
        'gombnyom\u00E1s t\u00F6rt\u00E9nik',
    'dropped': // blocks.js:990
        'leejtenek',
    'mouse-entered': // blocks.js:991
        'az eg\u00E9r f\u00F6l\u00E9m ker\u00FCl',
    'mouse-departed': // blocks.js:992
        'az eg\u00E9r lemegy r\u00F3lam',
    'scrolled-up': // blocks.js:993
        undefined,
    'scrolled-down': // blocks.js:994
        undefined,
    'year': // blocks.js:1004 widgets.js:2063
        '\u00E9v',
    'month': // blocks.js:1005
        'h\u00F3nap',
    'date': // blocks.js:1006
        'nap',
    'day of week': // blocks.js:1007
        'a h\u00E9t napja',
    'hour': // blocks.js:1008
        '\u00F3ra',
    'minute': // blocks.js:1009
        'perc',
    'second': // blocks.js:1010
        'm\u00E1sodperc',
    'time in milliseconds': // blocks.js:1011
        'id\u0151 (ezredm\u00E1sodpercben)',
    'letter': // blocks.js:1021
        'bet\u0171',
    'whitespace': // blocks.js:1022
        'sz\u00F3k\u00F6z',
    'line': // blocks.js:1023 symbols.js:113
        '\u00FAjsor',
    'tab': // blocks.js:1024
        'tabul\u00E1tor',
    'cr': // blocks.js:1025
        'kocsivissza',
    'csv': // blocks.js:1026
        undefined,
    'last': // blocks.js:1036 blocks.js:1048
        'utols\u00F3',
    'all': // blocks.js:1038 blocks.js:1265 byob.js:3874
        'minden feladat',
    'any': // blocks.js:1049
        'b\u00E1rmilyen',
    'distance': // blocks.js:1058
        undefined,
    'direction': // blocks.js:1059 blocks.js:2483 blocks.js:8556 objects.js:300
        'ir\u00E1ny',
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
        'megkett\u0151z\u00E9s',
    'negative': // blocks.js:1123
        'negat\u00EDv',
    'comic': // blocks.js:1124
        'mo\u00E1r\u00E9',
    'confetti': // blocks.js:1125
        'konfetti',
    'saturation': // blocks.js:1126
        undefined,
    'brightness': // blocks.js:1127
        'vil\u00E1goss\u00E1g',
    'ghost': // blocks.js:1128
        '\u00E1tl\u00E1tsz\u00F3s\u00E1g',
    'any key': // blocks.js:1146
        undefined,
    'up arrow': // blocks.js:1147
        'felfel\u00E9 ny\u00EDl',
    'down arrow': // blocks.js:1148
        'lefel\u00E9 ny\u00EDl',
    'right arrow': // blocks.js:1149
        'jobbra ny\u00EDl',
    'left arrow': // blocks.js:1150
        'balra ny\u00EDl',
    'space': // blocks.js:1151
        'sz\u00F3k\u00F6z',
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
        'abszol\u00FAt\u00E9rt\u00E9k',
    'ceiling': // blocks.js:1227 morphic.js:7085 morphic.js:7088
        undefined,
    'floor': // blocks.js:1228 morphic.js:7069 morphic.js:7072
        'eg\u00E9szr\u00E9sz',
    'sqrt': // blocks.js:1229
        'n\u00E9gyzetgy\u00F6k',
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
        'ez a feladat',
    'this block': // blocks.js:1267
        'ez a blokk',
    'all but this script': // blocks.js:1268
        'minden m\u00E1s feladat',
    'other scripts in sprite': // blocks.js:1269
        'ennek a szerepl\u0151nek minden m\u00E1s feladata',
    'String': // blocks.js:1290
        undefined,
    'Number': // blocks.js:1291 byob.js:3286
        'Sz\u00E1m',
    'true': // blocks.js:1292 blocks.js:9529 blocks.js:9919 objects.js:2979
        'igaz',
    'false': // blocks.js:1293 blocks.js:9544 blocks.js:9930 objects.js:2979
        'hamis',
    'code': // blocks.js:1334
        'k\u00F3d',
    'header': // blocks.js:1335
        'fejl\u00E9c',
    'list': // blocks.js:1408 blocks.js:8487
        'lista',
    'item': // blocks.js:1409
        undefined,
    'delimiter': // blocks.js:1410
        'hat\u00E1rol\u00F3',
    'collection': // blocks.js:1419
        'gy\u0171jtem\u00E9ny',
    'variables': // blocks.js:1420
        'v\u00E1ltoz\u00F3k',
    'parameters': // blocks.js:1421
        'param\u00E9terek',
    'untitled': // blocks.js:1993 blocks.js:2604 blocks.js:6443 blocks.js:11919 byob.js:1037 byob.js:3910 gui.js:979 gui.js:4036 store.js:296
        'n\u00E9vtelen',
    '{{ projectName }} script pic': // blocks.js:1993 blocks.js:2602 blocks.js:6441 byob.js:1035
        undefined,
    'script target cannot be found for orphaned block': // blocks.js:2203
        undefined,
    'a {{ className }} ("{{ value }}...")': // blocks.js:2207 morphic.js:8466 morphic.js:9146
        undefined,
    'Variable name': // blocks.js:2377 blocks.js:3262 objects.js:2179 objects.js:7304
        'V\u00E1ltoz\u00F3n\u00E9v',
    'help': // blocks.js:2386 objects.js:1851 objects.js:2308
        'S\u00FAg\u00F3',
    'script pic with result': // blocks.js:2393
        'a program k\u00E9pe az eredm\u00E9nnyel',
    'open a new window\nwith a picture of both\nthis script and its result': // blocks.js:2397
        '\u00DAj b\u00F6ng\u00E9sz\u0151ablak megnyit\u00E1sa a programnak \u00E9s eredm\u00E9ny\u00E9nek k\u00E9p\u00E9vel.',
    'rename': // blocks.js:2409 blocks.js:2458 blocks.js:2521 gui.js:7708 gui.js:8409 morphic.js:7656
        '\u00E1tnevez\u00E9s',
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
        't\u0171nj el',
    'x position': // blocks.js:2481 blocks.js:8554 objects.js:288
        'x hely',
    'y position': // blocks.js:2482 blocks.js:8555 objects.js:294
        'y hely',
    'size': // blocks.js:2484 blocks.js:8559 objects.js:382
        'm\u00E9ret',
    'costume #': // blocks.js:2485 blocks.js:8557 blocks.js:8561 objects.js:317
        'a jelmez sorsz\u00E1ma',
    'header mapping': // blocks.js:2507 blocks.js:2677
        'mapeamento para cabe\u00E7alho',
    'code mapping': // blocks.js:2511 blocks.js:2681
        'k\u00F3d lek\u00E9pez\u00E9s',
    'relabel': // blocks.js:2527 blocks.js:2538
        '\u00E1tcimk\u00E9z\u00E9s',
    'make a copy\nand pick it up': // blocks.js:2564 blocks.js:11908 morphic.js:4171
        'm\u00E1solat felv\u00E9tele',
    'only duplicate this block': // blocks.js:2586
        'csak k\u00E9sz\u00EDtsen egy m\u00E1solatot\nerr\u0151l a blokkr\u00F3l',
    'delete': // blocks.js:2590 blocks.js:11910 gui.js:7372 gui.js:7711 gui.js:8410 morphic.js:4215 objects.js:3242
        't\u00F6rl\u00E9s',
    'script pic': // blocks.js:2594 byob.js:1030
        'Program k\u00E9pe',
    'open a new window\nwith a picture of this script': // blocks.js:2608 byob.js:1041
        '\u00FAj b\u00F6ng\u00E9sz\u0151ablak megnyit\u00E1sa\nennek a programnak a k\u00E9p\u00E9vel',
    'download script': // blocks.js:2612
        undefined,
    '{{ name }} script': // blocks.js:2622
        undefined,
    'download this script\nas an XML file': // blocks.js:2627
        undefined,
    'unringify': // blocks.js:2657
        'k\u00F6r\u00FClfog\u00E1s megsz\u00FCntet\u00E9se',
    'ringify': // blocks.js:2661 blocks.js:2673
        'k\u00F6r\u00FClvesz',
    'delete block': // blocks.js:2691
        undefined,
    'spec': // blocks.js:2692 blocks.js:2699
        undefined,
    'Help': // blocks.js:2980 blocks.js:2997
        'S\u00FAg\u00F3',
    'Enter code that corresponds to the block\'s definition. Use the formal parameter\nnames as shown and <body> to reference the definition body\'s generated text code.': // blocks.js:3026
        'G\u00E9pelje be a blokk defin\u00EDci\u00F3j\u00E1nak megfelel\u0151 programk\u00F3dot. Haszn\u00E1lja a l\u00E1that\u00F3 form\u00E1lis param\u00E9tereket \u00E9s a <body> referenci\u00E1t a t\u00F6rzs gener\u00E1lt sz\u00F6vegk\u00F3dj\u00E1hoz.',
    'Enter code that corresponds to the block\'s definition. Choose your own\nformal parameter names (ignoring the ones shown).': // blocks.js:3029
        'G\u00E9pelje be a blokk defin\u00EDci\u00F3j\u00E1nak megfelel\u0151 programk\u00F3dot. Haszn\u00E1lja a saj\u00E1t form\u00E1lis param\u00E9tereit (hagyja figyelmen k\u00EDv\u00FCl a l\u00E1that\u00F3kat).',
    'Header mapping': // blocks.js:3043
        'A fejl\u00E9c lek\u00E9pez\u00E9se',
    'Code mapping': // blocks.js:3072
        'K\u00F3d lek\u00E9pez\u00E9s',
    'Enter code that corresponds to the block\'s operation (usually a single\nfunction invocation). Use <#n> to reference actual arguments as shown.': // blocks.js:3077
        'G\u00E9pelje be a blokk m\u0171k\u00F6d\u00E9s\u00E9nek megfelel\u0151 programk\u00F3dot (\u00E1ltal\u00E1ban egy f\u00FCggv\u00E9ny bevezet\u00E9s\u00E9vel). Haszn\u00E1lja a <#n> hivatkoz\u00E1si helyen l\u00E1that\u00F3 aktu\u00E1lis argumentumokat.',
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
        'Feladatv\u00E1ltoz\u00F3 n\u00E9v',
    'undrop': // blocks.js:6320 blocks.js:6709
        'visszav\u00E9tel',
    'undo the last\nblock drop\nin this pane': // blocks.js:6324
        'az utols\u00F3 blokk visszav\u00E9tele err\u0151l a lapr\u00F3l',
    'redrop': // blocks.js:6335 blocks.js:6722
        undefined,
    'redo the last undone\nblock drop\nin this pane': // blocks.js:6339
        undefined,
    'clear undrop queue': // blocks.js:6345
        undefined,
    'forget recorded block drops\non this pane': // blocks.js:6351
        undefined,
    'clean up': // blocks.js:6359
        't\u00F6rl\u00E9s',
    'arrange scripts\nvertically': // blocks.js:6359
        'a program f\u00FCgg\u0151leges \u00E1tm\u00E9retez\u00E9se',
    'add comment': // blocks.js:6360
        'megjegyz\u00E9s hozz\u00E1ad\u00E1sa',
    'scripts pic': // blocks.js:6362
        'minden feladat k\u00E9pp\u00E9',
    'open a new window\nwith a picture of all scripts': // blocks.js:6364
        '\u00FAj ablak nyit\u00E1sa\naz \u00F6sszes program k\u00E9p\u00E9vel',
    'make a block': // blocks.js:6380
        'blokk l\u00E9trehoz\u00E1sa',
    'Make a block': // blocks.js:6398 objects.js:2303 objects.js:2352 objects.js:2411
        'Blokk k\u00E9sz\u00EDt\u00E9se',
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
        'Az \u00FCzenet neve',
    'any message': // blocks.js:8360
        'b\u00E1rmilyen \u00FCzenet',
    'mouse-pointer': // blocks.js:8391 blocks.js:8420
        'eg\u00E9rmutat\u00F3',
    'edge': // blocks.js:8392
        'cs\u00FAcs',
    'random position': // blocks.js:8418
        undefined,
    'myself': // blocks.js:8445
        'magadr\u00F3l',
    'number': // blocks.js:8484
        'sz\u00E1m',
    'text': // blocks.js:8485 morphic.js:12305
        'sz\u00F6veg',
    'Boolean': // blocks.js:8486
        'logikai',
    'sprite': // blocks.js:8490
        undefined,
    'costume': // blocks.js:8492 objects.js:3069
        undefined,
    'sound': // blocks.js:8493
        undefined,
    'command': // blocks.js:8494
        'parancsblokk',
    'reporter': // blocks.js:8495
        'f\u00FCggv\u00E9nyblokk',
    'predicate': // blocks.js:8496
        'kijelent\u00E9s',
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
        'sz\u00EDnpad',
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
        'a jelmez neve',
    'Turtle': // blocks.js:8582 gui.js:7941 objects.js:3166 threads.js:3349
        'Tekn\u0151s',
    'Empty': // blocks.js:8584 gui.js:7941 objects.js:3166 threads.js:3350
        '\u00DCres',
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
        'Beviteli lista',
    'add comment here': // blocks.js:11762
        'tegye ide a megjegyz\u00E9st',
    'comment pic': // blocks.js:11912
        'megjegyz\u00E9s k\u00E9pe',
    '{{ projectName }} comment pic': // blocks.js:11917
        undefined,
    'open a new window\nwith a picture of this comment': // blocks.js:11923
        '\u00FAj ablak megnyit\u00E1sa\nennek a megjegyz\u00E9snek a k\u00E9p\u00E9vel',
    'Change block': // byob.js:885
        'Blokk v\u00E1ltoztat\u00E1sa',
    '{{ varName }} (temporary)': // byob.js:1011 objects.js:9431 threads.js:1670
        '{{ varName }} (ideiglenes)',
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
        'blokkdefin\u00EDci\u00F3 t\u00F6rl\u00E9se',
    'edit': // byob.js:1157 gui.js:7699 morphic.js:8730 morphic.js:9477 objects.js:3255 objects.js:3261 objects.js:7422
        'szerkeszt\u00E9s',
    'Delete Custom Block': // byob.js:1228
        'Felhaszn\u00E1l\u00F3i blokk t\u00F6rl\u00E9se',
    'Are you sure you want to delete this\ncustom block and all its instances?': // byob.js:1229
        'Biztos, hogy elt\u00E1vol\u00EDtja ezt\na blokkot \u00E9s minden p\u00E9ld\u00E1ny\u00E1t?',
    'OK': // byob.js:1648 byob.js:2117 byob.js:3237 byob.js:3848 gui.js:3713 morphic.js:3958 morphic.js:4028 morphic.js:4054 objects.js:8312 paint.js:161 tables.js:1212 widgets.js:1574 widgets.js:1708 widgets.js:1791 widgets.js:1874 widgets.js:2155 widgets.js:2434
        'OK',
    'Cancel': // byob.js:1649 byob.js:2120 byob.js:3243 byob.js:3849 gui.js:3371 gui.js:3714 gui.js:5941 gui.js:6843 gui.js:8996 gui.js:9134 morphic.js:4031 morphic.js:4057 objects.js:8313 paint.js:162 widgets.js:1709 widgets.js:1792 widgets.js:1887 widgets.js:2156
        'M\u00E9gsem',
    'Command': // byob.js:1770
        'Parancs',
    'Reporter': // byob.js:1779 byob.js:3290
        'F\u00FCggv\u00E9ny',
    'Predicate': // byob.js:1788 byob.js:3291
        'Kijelent\u00E9s',
    'for all sprites': // byob.js:1850 byob.js:3662
        'minden alakzatra',
    'for this sprite only': // byob.js:1855 byob.js:3667
        'csak erre az alakzatra',
    'Block Editor': // byob.js:2065
        'Blokk szerkeszt\u0151',
    'Method Editor': // byob.js:2066
        undefined,
    'Apply': // byob.js:2119
        'Alkalmaz\u00E1s',
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
        'A c\u00EDmke r\u00E9sz szerkeszt\u00E9se',
    'Create input name': // byob.js:2754
        'A bevitel nev\u00E9nek l\u00E9trehoz\u00E1sa',
    'Edit input name': // byob.js:2755
        'A bevitel nev\u00E9nek szerkeszt\u00E9se',
    'new line': // byob.js:2800 byob.js:3266
        undefined,
    'Title text': // byob.js:3061
        'A c\u00EDm sz\u00F6vege',
    'Delete': // byob.js:3239 gui.js:5940
        'T\u00F6rl\u00E9s',
    'Object': // byob.js:3283
        'Objektum',
    'Text': // byob.js:3284
        'Sz\u00F6veg',
    'List': // byob.js:3285
        'Lista',
    'Any type': // byob.js:3287
        'B\u00E1rmilyen t\u00EDpus',
    'Boolean (T/F)': // byob.js:3288
        'Logikai (I/H)',
    'Command\n(inline)': // byob.js:3289
        'Parancs\n(inline)',
    'Command\n(C-shape)': // byob.js:3292
        'Parancs\n(C-Form)',
    'Any\n(unevaluated)': // byob.js:3293
        'B\u00E1rmilyen\n(nem ki\u00E9rt\u00E9kelt)',
    'Boolean\n(unevaluated)': // byob.js:3294
        'Logikai(nem ki\u00E9rt\u00E9kelt)',
    'Single input': // byob.js:3299
        'Egyszer\u0171 bevitel',
    'Multiple inputs (value is list of inputs)': // byob.js:3304
        'T\u00F6bb \u00E9rt\u00E9k bevitele (az \u00E9rt\u00E9k a bevitelek list\u00E1ja)',
    'Upvar - make internal variable visible to caller': // byob.js:3309
        'A bels\u0151 v\u00E1ltoz\u00F3k l\u00E1that\u00F3v\u00E1 t\u00E9tele a h\u00EDv\u00F3 sz\u00E1m\u00E1ra',
    'Default Value': // byob.js:3314
        'Alap\u00E9rt\u00E9k',
    'options': // byob.js:3570
        'be\u00E1ll\u00EDt\u00E1sok',
    'read-only': // byob.js:3573
        'csak olvashat\u00F3',
    'Input Slot Options': // byob.js:3593
        'Bemen\u0151 adat csatlakoz\u00E1si lehet\u0151s\u00E9gek',
    'Enter one option per line.\nOptionally use "=" as key/value delimiter and {} for submenus. e.g.\n   the answer=42': // byob.js:3597
        undefined,
    'Export blocks': // byob.js:3776 byob.js:3914 gui.js:3187 gui.js:3835
        'Blokkok exportja',
    'select': // byob.js:3873
        'v\u00E1laszt\u00E1s',
    'none': // byob.js:3875 objects.js:5421 objects.js:5427
        'egyik sem',
    '{{ projectName }} blocks': // byob.js:3910
        undefined,
    'no blocks were selected': // byob.js:3915 byob.js:4009 byob.js:4102
        undefined,
    'Import blocks': // byob.js:3962 byob.js:3963 byob.js:4008
        'Blokkok importja',
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
        'M\u00E9g nem l\u00E9pett be',
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
        'Projekt let\u00F6lt\u00E9se\na felh\u0151b\u0151l',
    'Opening project': // gui.js:430 gui.js:470 gui.js:2627 gui.js:4222
        'Projekt megnyit\u00E1sa',
    'Saved project\n{{ name }}': // gui.js:506
        undefined,
    'Visible stepping': // gui.js:716 gui.js:2756
        undefined,
    'development mode': // gui.js:990 morphic.js:12252
        'fejleszt\u0151i m\u00F3d',
    'don\'t rotate': // gui.js:1222
        'nem foroghat',
    'can rotate': // gui.js:1223
        'foroghat',
    'only face left/right': // gui.js:1224
        'jobbra-balra fordulhat',
    'draggable': // gui.js:1329
        'vonszolhat\u00F3',
    'Scripts': // gui.js:1371 gui.js:4179
        'Feladatok',
    'Costumes': // gui.js:1391 gui.js:3252 gui.js:3255 gui.js:4156
        'Jelmezek',
    'Backgrounds': // gui.js:1392 gui.js:3252 gui.js:3255
        undefined,
    'Sounds': // gui.js:1411 gui.js:3262 gui.js:3264 gui.js:4167
        'Hangok',
    'add a new Turtle sprite': // gui.js:1545
        '\u00FAj tekn\u0151c rajz\u00E1nak hozz\u00E1ad\u00E1sa',
    'paint a new sprite': // gui.js:1567
        '\u00FAj alakzat rajzol\u00E1sa',
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
        'A Snap! n\u00E9vjegye',
    'Reference manual': // gui.js:2474
        'K\u00E9zik\u00F6nyv',
    '{{ site }} website': // gui.js:2481
        'A {{ site }} webhelye',
    'Download source': // gui.js:2487
        'A forr\u00E1sk\u00F3d let\u00F6lt\u00E9se',
    'Switch back to user mode': // gui.js:2498
        'Vissza a felhaszn\u00E1l\u00F3i \u00FCzemm\u00F3dra',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones': // gui.js:2500
        'A deep-Morphic\nhelyzet\u00E9rz\u00E9keny men\u00FCk\n\u00E9s a felhaszn\u00E1l\u00F3bar\u00E1t men\u00FCk kikapcsol\u00E1sa',
    'Switch to dev mode': // gui.js:2507
        '\u00C1tkapcsol\u00E1s fejleszt\u0151i m\u00F3dba',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!': // gui.js:2509
        'A Morphic helyzet\u00E9rz\u00E9keny men\u00FCk, nyomk\u00F6vet\u0151k\n\u00E9s a nem felhaszn\u00E1l\u00F3bar\u00E1t m\u00F3d bekapcsol\u00E1sa',
    'Cloud URL': // gui.js:2527 gui.js:5654
        undefined,
    'Login': // gui.js:2536
        'Bel\u00E9p\u00E9s',
    'Signup': // gui.js:2540
        '\u00DAj regisztr\u00E1ci\u00F3',
    'Reset Password': // gui.js:2544
        'A jelsz\u00F3 alaphelyzetre \u00E1ll\u00EDt\u00E1sa',
    'Resend Verification Email': // gui.js:2548
        undefined,
    'Logout {{ username }}': // gui.js:2553
        'Kijelentkez\u00E9s {{ username }}',
    'Change Password': // gui.js:2557 gui.js:5420
        'Jelsz\u00F3 megv\u00E1ltoztat\u00E1sa',
    'Export project media only': // gui.js:2564
        undefined,
    'Export Project As': // gui.js:2569 gui.js:2583 gui.js:2597 gui.js:3158 gui.js:3176
        'Projekt export\u00E1l\u00E1sa mint',
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
        'Nyelv',
    'Generate {{ filename }} file': // gui.js:2679 gui.js:5035
        undefined,
    'builds the {{ language }} translation file': // gui.js:2684
        undefined,
    'Zoom blocks': // gui.js:2692 gui.js:5120
        'Blokkokra k\u00F6zel\u00EDt\u00E9s',
    'Stage size': // gui.js:2696 gui.js:5163
        'A j\u00E1t\u00E9kt\u00E9r m\u00E9rete',
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
        'Beviteli cs\u00FAszk\u00E1k',
    'uncheck to disable\ninput sliders for\nentry fields': // gui.js:2736
        'kikapcsolva letiltja a cs\u00FAszk\u00E1kat\na beviteli mez\u0151kn\u00E9l',
    'check to enable\ninput sliders for\nentry fields': // gui.js:2737
        'bekapcsolva enged\u00E9lyezi a cs\u00FAszk\u00E1kat\na beviteli mez\u0151kn\u00E9l',
    'Execute on slider change': // gui.js:2741
        undefined,
    'uncheck to suppress\nrunning scripts\nwhen moving the slider': // gui.js:2744
        undefined,
    'check to run\nthe edited script\nwhen moving the slider': // gui.js:2745
        undefined,
    'Turbo mode': // gui.js:2749
        'Turb\u00F3 m\u00F3d',
    'uncheck to run scripts\nat normal speed': // gui.js:2752
        'kikapcsolva norm\u00E1l sebess\u00E9gen\nfutnak a programok',
    'check to prioritize\nscript execution': // gui.js:2753
        'bekapcsolva a programozott\nv\u00E9grehajt\u00E1s lesz az els\u0151dleges',
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
        'Elmos\u00F3d\u00F3 \u00E1rny\u00E9kok',
    'uncheck to use solid drop\nshadows and highlights': // gui.js:2787
        'vegye ki a jel\u00F6l\u00E9st, ha \u00E9les \u00E1rny\u00E9kokat\n\u00E9s kiemel\u00E9seket k\u00EDv\u00E1n haszn\u00E1lni',
    'check to use blurred drop\nshadows and highlights': // gui.js:2788
        'jel\u00F6lje be, ha elmos\u00F3d\u00F3 \u00E1rny\u00E9kokat\n\u00E9s kiemel\u00E9seket k\u00EDv\u00E1n haszn\u00E1lni',
    'Zebra coloring': // gui.js:2792
        'Zebra sz\u00EDnez\u00E9s',
    'uncheck to disable alternating\ncolors for nested block': // gui.js:2795
        'tiltja a be\u00E1gyazott blokkok\nelt\u00E9r\u0151 sz\u00EDnez\u00E9s\u00E9t',
    'check to enable alternating\ncolors for nested blocks': // gui.js:2796
        'enged\u00E9lyezi a be\u00E1gyazott blokkok\nelt\u00E9r\u0151 sz\u00EDnez\u00E9s\u00E9t',
    'Dynamic input labels': // gui.js:2800
        'Dinamikus beviteli feliratok',
    'uncheck to disable dynamic\nlabels for variadic inputs': // gui.js:2803
        '\u00FCresen hagyva tiltja a t\u00F6bbsz\u00F6r\u00F6s\nbeviteli mez\u0151k dinamikus feliratait',
    'check to enable dynamic\nlabels for variadic inputs': // gui.js:2804
        'bejel\u00F6lve enged\u00E9lyezi a t\u00F6bbsz\u00F6r\u00F6s\nbeviteli mez\u0151k dinamikus feliratait',
    'Prefer empty slot drops': // gui.js:2808
        'Sz\u00F3k\u00F6z haszn\u00E1lata \u00FCres karakterk\u00E9nt',
    'uncheck to allow dropped\nreporters to kick out others': // gui.js:2811
        'ausschalten um das "Rauskicken"\nvon platzierten Bl\u00F6cken\nzu erm\u00F6glichen',
    'check to focus on empty slots\nwhen dragging & dropping reporters': // gui.js:2812
        'einschalten um leere Platzhalter\nbeim Platzieren von Bl\u00F6ckenzu bevorzugen',
    'Long form input dialog': // gui.js:2816
        'Hossz\u00FA form\u00E1tum\u00FA beviteli p\u00E1rbesz\u00E9d',
    'uncheck to use the input\ndialog in short form': // gui.js:2819
        'kapcsolja ki, ha r\u00F6vid\u00EDtett\np\u00E1rbesz\u00E9dablakot akar haszn\u00E1lni',
    'check to always show slot\ntypes in the input dialog': // gui.js:2820
        'bejel\u00F6lve mindig l\u00E1tszik a csatlakoz\u00E1s t\u00EDpusa a beviteli p\u00E1rbesz\u00E9dablakban',
    'Plain prototype labels': // gui.js:2823
        'Egyszer\u0171 blokk protot\u00EDpus c\u00EDmk\u00E9k',
    'uncheck to always show (+) symbols\nin block prototype labels': // gui.js:2826
        '\u00FCresen hagyva mindig l\u00E1tszik a (+) jel\na blokk protot\u00EDpus cimk\u00E9j\u00E9ben',
    'check to hide (+) symbols\nin block prototype labels': // gui.js:2827
        'bejel\u00F6lve l\u00E1tszik a (+) jel\na blokk protot\u00EDpus cimk\u00E9j\u00E9ben',
    'Virtual keyboard': // gui.js:2830
        'Virtu\u00E1lis billenty\u0171zet',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices': // gui.js:2833
        'kikapcsolva letiltja a virtu\u00E1lis\nbillenty\u0171zetet a mobil eszk\u00F6z\u00F6k\u00F6n',
    'check to enable\nvirtual keyboard support\nfor mobile devices': // gui.js:2834
        'bejel\u00F6lve enged\u00E9lyezi a virtu\u00E1lis\nbillenty\u0171zetet a mobil eszk\u00F6z\u00F6k\u00F6n',
    'Clicking sound': // gui.js:2838
        'A kattint\u00E1s hangja',
    'uncheck to turn\nblock clicking\nsound off': // gui.js:2848
        'kikapcsolva letiltja a blokkra kattint\u00E1s hangj\u00E1t',
    'check to turn\nblock clicking\nsound on': // gui.js:2849
        'bekapcsolva enged\u00E9lyezi a blokkra kattint\u00E1s hangj\u00E1t',
    'Animations': // gui.js:2852
        'Anim\u00E1ci\u00F3k',
    'uncheck to disable\nIDE animations': // gui.js:2855
        'kikapcsolva letiltja\naz IDE anim\u00E1ci\u00F3it',
    'check to enable\nIDE animations': // gui.js:2856
        'bekapcsolva enged\u00E9lyezi\naz IDE anim\u00E1ci\u00F3it',
    'Cache Inputs': // gui.js:2860
        undefined,
    'uncheck to stop caching\ninputs (for debugging the evaluator)': // gui.js:2866
        undefined,
    'check to cache inputs\nboosts recursion': // gui.js:2867
        undefined,
    'Rasterize SVGs': // gui.js:2871
        'SVG \u00E1talak\u00EDt\u00E1sa bitt\u00E9rk\u00E9pbe',
    'uncheck for smooth\nscaling of vector costumes': // gui.js:2877
        undefined,
    'check to rasterize\nSVGs on import': // gui.js:2878
        'SVG bitt\u00E9rk\u00E9pp\u00E9 alak\u00EDthat\u00F3s\u00E1g\u00E1nak\nellen\u0151rz\u00E9se az import\u00E1l\u00E1s sor\u00E1n',
    'Flat design': // gui.js:2882
        'S\u00EDkbeli tervez\u00E9s',
    'uncheck for default\nGUI design': // gui.js:2890
        undefined,
    'check for alternative\nGUI design': // gui.js:2891
        'm\u00E1s grafikus fel\u00FClet ellen\u0151rz\u00E9se',
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
        'Szerepl\u0151k \u00F6sszef\u0171z\u00E9se',
    'uncheck to disable\nsprite composition': // gui.js:2932
        'kapcsolja ki a szerepl\u0151k \u00F6sszef\u0171z\u00E9s\u00E9nek megakad\u00E1lyoz\u00E1s\u00E1hoz.',
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
        'Biztons\u00E1gos programsz\u00E1lak',
    'uncheck to allow\nscript reentrance': // gui.js:3035
        'kikapcsolva enged\u00E9lyezi a programok\nt\u00F6bbsz\u00F6r\u00F6s v\u00E9grehajt\u00E1s\u00E1t',
    'check to disallow\nscript reentrance': // gui.js:3036
        'bekapcsolva enged\u00E9lyezi a programok\nt\u00F6bbsz\u00F6r\u00F6s v\u00E9grehajt\u00E1s\u00E1t',
    'Prefer smooth animations': // gui.js:3039
        'Finom anim\u00E1ci\u00F3k',
    'uncheck for greater speed\nat variable frame rates': // gui.js:3042
        'kapcsolja ki, ha nagyobb sebess\u00E9get\nakar v\u00E1ltoztathat\u00F3 k\u00E9pfriss\u00EDt\u00E9sekn\u00E9l',
    'check for smooth, predictable\nanimations across computers': // gui.js:3043
        'kapcsolja be, ha finomabb, kisz\u00E1m\u00EDthat\u00F3bb\nanim\u00E1ci\u00F3kat akar minden sz\u00E1m\u00EDt\u00F3g\u00E9pen',
    'Flat line ends': // gui.js:3047
        'Egyszer\u0171 vonalv\u00E9gz\u0151d\u00E9s',
    'uncheck for round ends of lines': // gui.js:3053
        'kapcsolja ki a\nlekerek\u00EDtett vonalv\u00E9gz\u0151d\u00E9sekhez',
    'check for flat ends of lines': // gui.js:3054
        'kapcsolja be az\negyszer\u0171 vonalv\u00E9gz\u0151d\u00E9shez',
    'Codification support': // gui.js:3057
        'A kodifik\u00E1ci\u00F3 t\u00E1mogat\u00E1sa',
    'uncheck to disable\nblock to text mapping features': // gui.js:3066
        undefined,
    'check for block\nto text mapping features': // gui.js:3067
        'Assinalar para funcionalidades\nde mapeamento entre blocos e texto.',
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
        'Projektadatok',
    'New': // gui.js:3109
        '\u00DAj',
    'Open': // gui.js:3110 gui.js:5924
        'Megnyit\u00E1s',
    'Save': // gui.js:3111 gui.js:5927 gui.js:8995 gui.js:9133
        'Ment\u00E9s',
    'Save As': // gui.js:3112
        'Ment\u00E9s m\u00E1sk\u00E9nt',
    'Import': // gui.js:3115 gui.js:3370 gui.js:6842
        'Import',
    'load an exported project file\nor block library, a costume\nor a sound': // gui.js:3146
        'egy export\u00E1lt projekt, feladatk\u00F6nyvt\u00E1r,\njelmez vagy hang bet\u00F6lt\u00E9se',
    'Export project (in a new window)': // gui.js:3153
        undefined,
    'show project data as XML\nin a new browser window': // gui.js:3164
        'a projekt adatainak megtekint\u00E9se\negy \u00FAj b\u00F6ng\u00E9sz\u0151ablakban',
    'Export project as plain text': // gui.js:3170
        'Projekt export\u00E1l\u00E1sa egyszer\u0171 sz\u00F6vegk\u00E9nt',
    'Export project': // gui.js:3171
        'Projekt export\u00E1l\u00E1sa',
    'save project data as XML\nto your downloads folder': // gui.js:3181
        undefined,
    'show global custom block definitions as XML\nin a new browser window': // gui.js:3189
        'glob\u00E1lis felhaszn\u00E1l\u00F3i blokk defin\u00EDci\u00F3k\nmegtekint\u00E9se egy \u00FAj b\u00F6ng\u00E9sz\u0151ablakban',
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
        'Minden feladat export\u00E1l\u00E1sa k\u00E9pk\u00E9nt',
    'show a picture of all scripts\nand block definitions': // gui.js:3219
        'minden feladat \u00E9s blokk\ndefin\u00EDci\u00F3r\u00F3l k\u00E9sz\u00FClt k\u00E9p mutat\u00E1sa',
    'Import tools': // gui.js:3226
        'Eszk\u00F6z\u00F6k import\u00E1l\u00E1sa',
    'load the official library of\npowerful blocks': // gui.js:3235
        'a hivatalos k\u00F6nyvt\u00E1ri\nblokkok bet\u00F6lt\u00E9se',
    'Libraries': // gui.js:3238
        'Modulk\u00F6nyvt\u00E1rak',
    'select categories of additional blocks to add to this project': // gui.js:3248
        'V\u00E1lassza ki a projekthez adand\u00F3 blokkok kateg\u00F3ri\u00E1it',
    'Select a costume from the media library': // gui.js:3259
        'V\u00E1lasszon ki egy jelmezt a m\u00E9diak\u00F6nyvt\u00E1rb\u00F3l.',
    'Select a sound from the media library': // gui.js:3266
        'V\u00E1lasszon ki egy hangot a m\u00E9diak\u00F6nyvt\u00E1rb\u00F3l.',
    'Opening {{ resource }}': // gui.js:3341
        undefined,
    'License': // gui.js:3529 gui.js:3630
        'Licenc',
    'Contributors': // gui.js:3548
        'K\u00F6zrem\u0171k\u00F6d\u0151k',
    'current module versions': // gui.js:3574
        'a jelenlegi modulverzi\u00F3k',
    'Translations': // gui.js:3578
        'Ford\u00EDt\u00E1sok',
    'About Snap': // gui.js:3581
        'A Snap n\u00E9vjegye',
    'Translators': // gui.js:3597
        'Ford\u00EDt\u00F3k',
    'Back': // gui.js:3613
        'Vissza',
    'Modules': // gui.js:3646
        'Modulok',
    'Credits': // gui.js:3662
        'K\u00F6zrem\u0171k\u00F6d\u0151k',
    'Project Notes': // gui.js:3709
        'A projekt tudnival\u00F3i',
    'Saving': // gui.js:3770
        undefined,
    'Saved': // gui.js:3788 gui.js:3796
        'Mentve',
    'Save failed': // gui.js:3790
        undefined,
    'Exporting': // gui.js:3811 gui.js:5464 gui.js:5493 gui.js:5503 gui.js:5521 gui.js:5533
        undefined,
    'Exported': // gui.js:3816 gui.js:5471 gui.js:5497 gui.js:5507 gui.js:5527 gui.js:5539
        undefined,
    'Export failed': // gui.js:3819 gui.js:5475 gui.js:5500 gui.js:5530
        undefined,
    'this project doesn\'t have any\ncustom global blocks yet': // gui.js:3836
        'ennek a projektnek m\u00E9g nincs glob\u00E1lis felhaszn\u00E1l\u00F3i blokkjai',
    'there are currently no unused\nglobal custom blocks in this project': // gui.js:3873
        undefined,
    'Untitled': // gui.js:3937 gui.js:8190 store.js:368 store.js:1651
        'N\u00E9vtelen',
    'Variables': // gui.js:3968 objects.js:153
        'V\u00E1ltoz\u00F3k',
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
        'Fel\u00FCl\u00EDrja az aktu\u00E1lis projektet egy \u00FAjjal?',
    'New Project': // gui.js:4915
        '\u00DAj projekt',
    'Generating {{ filename }} file': // gui.js:5011
        undefined,
    'Could not generate the language file': // gui.js:5039
        undefined,
    'build': // gui.js:5057
        '\u00E9p\u00EDt\u00E9s',
    'your own': // gui.js:5060
        'saj\u00E1t',
    'blocks': // gui.js:5064
        'blokkok',
    'normal (1x)': // gui.js:5106
        'norm\u00E1l (1x)',
    'demo (1.2x)': // gui.js:5107
        'Dem\u00F3 (1.2x)',
    'presentation (1.4x)': // gui.js:5108
        'Prezent\u00E1ci\u00F3 (1.4x)',
    'big (2x)': // gui.js:5109
        'nagy (2x)',
    'huge (4x)': // gui.js:5110
        '\u00F3ri\u00E1si (4x)',
    'giant (8x)': // gui.js:5111
        'gigantikus (8x)',
    'monstrous (10x)': // gui.js:5112
        'sz\u00F6rnyeteg (10x)',
    'Stage width': // gui.js:5166
        'A j\u00E1t\u00E9kt\u00E9r sz\u00E9less\u00E9ge',
    'Stage height': // gui.js:5167
        'A j\u00E1t\u00E9kt\u00E9r magass\u00E1ga',
    '{{ count }} days left': // gui.js:5253
        undefined,
    'You are now logged in, and your account\nis enabled for three days.\nPlease use the verification link that\nwas sent to your email address when you\nsigned up.\n\nIf you cannot find that email, please\ncheck your spam folder. If you still\ncannot find it, please use the "Resend\nVerification Email..." option in the cloud\nmenu.\n\nYou have {{ count }} days left.': // gui.js:5254
        undefined,
    'Sign in': // gui.js:5277
        'Regisztr\u00E1ci\u00F3',
    'stay signed in on this computer\nuntil logging out': // gui.js:5283
        'maradjon bejelentkezve, am\u00EDg ki nem jelentkezem a sz\u00E1m\u00EDt\u00F3g\u00E9pr\u0151l',
    'You can now log in': // gui.js:5305
        undefined,
    'Sign up': // gui.js:5314
        '\u00DAjk\u00E9nt regisztr\u00E1lni',
    'Terms of Service': // gui.js:5317
        'Felhaszn\u00E1l\u00E1si felt\u00E9telek',
    'Privacy': // gui.js:5319
        'Jogv\u00E9delem',
    'I have read and agree\nto the Terms of Service': // gui.js:5320
        'Elolvastam \u00E9s egyet\u00E9rtek\na felhaszn\u00E1l\u00E1si felt\u00E9telekkel',
    'An e-mail with a link to\nreset your password\nhas been sent to the address provided': // gui.js:5340
        undefined,
    'Reset password': // gui.js:5352
        'A jelsz\u00F3 alaphelyzetre \u00E1ll\u00EDt\u00E1sa',
    'An e-mail with a link to\nverify your account\nhas been sent to the address provided': // gui.js:5378
        undefined,
    'Resend verification email': // gui.js:5390
        undefined,
    'password has been changed': // gui.js:5414
        'a jelsz\u00F3 megv\u00E1ltozott',
    'disconnected': // gui.js:5437 gui.js:5440
        'lev\u00E1lasztva',
    'Saving project\nto the cloud': // gui.js:5448 gui.js:6476
        'Projekt ment\u00E9se\na felh\u0151be',
    'saved': // gui.js:5452 gui.js:6481
        'mentve',
    '{{ projectName }} media': // gui.js:5468
        undefined,
    'Cloud Connection': // gui.js:5552
        undefined,
    'Successfully connected to\n{{ url }}': // gui.js:5553
        undefined,
    '{{ server }} (secure)': // gui.js:5646
        undefined,
    'Save Project': // gui.js:5799
        'A projekt ment\u00E9se',
    'Open Project': // gui.js:5800
        'Projekt megnyit\u00E1sa',
    'Cloud': // gui.js:5836
        'Felh\u0151',
    'Browser': // gui.js:5837
        'B\u00F6ng\u00E9sz\u0151',
    'Examples': // gui.js:5840 gui.js:6198 gui.js:6254 gui.js:6378
        'P\u00E9ld\u00E1k',
    'Share': // gui.js:5930
        'Megoszt\u00E1s',
    'Unshare': // gui.js:5931
        'Nincs megoszt\u00E1s',
    '(no matches)': // gui.js:6095
        undefined,
    'Updating\nproject list': // gui.js:6119
        'A projeklista friss\u00EDt\u00E9se',
    'last changed\n{{ date }}': // gui.js:6314
        'utolj\u00E1ra v\u00E1ltoztatva\n{{ date }}',
    'Are you sure you want to replace\n"{{ projectName }}"?': // gui.js:6436 gui.js:6454
        undefined,
    'Replace Project': // gui.js:6438 gui.js:6456
        undefined,
    'Are you sure you want to delete\n"{{ projectName }}"?': // gui.js:6498 gui.js:6522
        'Biztos, hogy t\u00F6rl\u00F6d?\n"{{ projectName }}"?',
    'Delete Project': // gui.js:6500 gui.js:6524
        'Projekt t\u00F6rl\u00E9se',
    'Are you sure you want to share\n"{{ projectName }}"?': // gui.js:6542
        undefined,
    'Share Project': // gui.js:6544
        'A projekt megoszt\u00E1sa',
    'sharing\nproject': // gui.js:6546
        'a projekt\nmegoszt\u00E1sa',
    'shared': // gui.js:6563
        'megosztva',
    'Are you sure you want to unshare\n"{{ projectName }}"?': // gui.js:6590
        undefined,
    'Unshare Project': // gui.js:6592
        'A projekt megoszt\u00E1s\u00E1nak megsz\u00FCntet\u00E9se',
    'unsharing\nproject': // gui.js:6594
        'a projekt megoszt\u00E1s\u00E1nak\nmegsz\u00FCntet\u00E9se',
    'unshared': // gui.js:6612
        'nincs megosztva',
    'Are you sure you want to publish\n"{{ projectName }}"?': // gui.js:6632
        'Biztosan nyilv\u00E1noss\u00E1 teszi\n"{{ projectName }}"?',
    'Publish Project': // gui.js:6634
        undefined,
    'publishing\nproject': // gui.js:6636
        undefined,
    'published': // gui.js:6651
        undefined,
    'Are you sure you want to unpublish\n"{{ projectName }}"?': // gui.js:6677
        'Biztos, hogy nemnyilv\u00E1noss\u00E1 teszi\n"{{ projectName }}"?',
    'Unpublish Project': // gui.js:6679
        undefined,
    'unpublishing\nproject': // gui.js:6681
        undefined,
    'unpublished': // gui.js:6696
        undefined,
    'Import library': // gui.js:6828
        'Modulk\u00F6nyvt\u00E1r import\u00E1l\u00E1sa',
    'Loading {{ resource }}': // gui.js:6926 gui.js:7059
        undefined,
    'Imported {{ resource }}': // gui.js:7054
        undefined,
    'pic': // gui.js:7353 morphic.js:4194 objects.js:7425
        'k\u00E9p export\u00E1l\u00E1sa',
    'open a new window\nwith a picture of the stage': // gui.js:7361 objects.js:7432
        '\u00FAj ablak nyit\u00E1sa a sz\u00EDnpad k\u00E9p\u00E9vel',
    'show': // gui.js:7366 morphic.js:7568 objects.js:388
        'jelenj meg',
    'clone': // gui.js:7370 objects.js:3238
        undefined,
    'release': // gui.js:7388
        undefined,
    'make temporary and\nhide in the sprite corral': // gui.js:7390
        undefined,
    'detach from {{ name }}': // gui.js:7396 objects.js:3266
        'lev\u00E1laszt\u00E1s err\u0151l {{ name }}',
    'detach all parts': // gui.js:7402 objects.js:3271
        'minden r\u00E9sz sz\u00E9tv\u00E1laszt\u00E1sa',
    'export': // gui.js:7406 gui.js:7713 objects.js:3273 objects.js:9542
        'export\u00E1l\u00E1s',
    'edit rotation point only': // gui.js:7702
        'csak a forg\u00E1spont szerkeszt\u00E9se',
    'rename costume': // gui.js:7755
        'a jelmez \u00E1tnevez\u00E9se',
    'rename background': // gui.js:7756
        undefined,
    'default': // gui.js:7893
        undefined,
    'pen': // gui.js:7975 morphic.js:12402
        'toll',
    'tip': // gui.js:7982
        'tipp',
    'middle': // gui.js:7991
        'k\u00F6z\u00E9p',
    'Paint a new costume': // gui.js:8085
        '\u00DAj jelmez rajzol\u00E1sa',
    'Import a new costume from your webcam': // gui.js:8110
        undefined,
    'import a picture from another web page or from\na file on your computer by dropping it here': // gui.js:8134
        'K\u00E9p import\u00E1l\u00E1sa egy webhelyr\u0151l vagy a sz\u00E1m\u00EDt\u00F3g\u00E9pr\u0151l',
    'Stop': // gui.js:8345 gui.js:8367
        '\u00C1llj',
    'Play': // gui.js:8345 gui.js:8375
        'Lej\u00E1tsz\u00E1s',
    'Play sound': // gui.js:8348 gui.js:8376
        'Hang lej\u00E1tsz\u00E1sa',
    'Stop sound': // gui.js:8368
        'A hang le\u00E1ll\u00EDt\u00E1sa',
    'rename sound': // gui.js:8432
        'A hang \u00E1tnevez\u00E9se',
    'import a sound from your computer\nby dragging it into here': // gui.js:8526
        'Hang import\u00E1l\u00E1sa egy webhelyr\u0151l vagy a sz\u00E1m\u00EDt\u00F3g\u00E9pr\u0151l',
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
        'Hossz',
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
        'mozgat\u00E1s',
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
        '(\u00FCres)',
    'Are you sure you want to leave?': // morphic.js:12110
        undefined,
    'demo': // morphic.js:12173
        undefined,
    'sample morphs': // morphic.js:12173
        undefined,
    'hide all': // morphic.js:12175
        undefined,
    'show all': // morphic.js:12176 objects.js:7423
        'mindent mutat',
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
        't\u00E9glalap',
    'box': // morphic.js:12270
        undefined,
    'circle box': // morphic.js:12273
        undefined,
    'slider': // morphic.js:12277 objects.js:9461
        'cs\u00FAszka',
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
        'Mozg\u00E1s',
    'Control': // objects.js:147
        'Vez\u00E9rl\u00E9s',
    'Looks': // objects.js:148
        'Kin\u00E9zet',
    'Sensing': // objects.js:149
        '\u00C9rz\u00E9kel\u00E9s',
    'Sound': // objects.js:150 objects.js:8570
        'Hang',
    'Operators': // objects.js:151
        'M\u0171veletek',
    'Pen': // objects.js:152
        'Toll',
    'Lists': // objects.js:154
        'List\u00E1k',
    'Other': // objects.js:155
        'Egyebek',
    'move %n steps': // objects.js:201
        'menj %n l\u00E9p\u00E9st',
    'turn %clockwise %n degrees': // objects.js:208
        'fordulj %clockwise %n fokot',
    'turn %counterclockwise %n degrees': // objects.js:215
        'fordulj %counterclockwise %n fokot',
    'point in direction %dir': // objects.js:222
        'n\u00E9zz %dir fokos ir\u00E1nyba',
    'point towards %dst': // objects.js:228
        'n\u00E9zz %dst ir\u00E1ny\u00E1ba',
    'go to x: %n y: %n': // objects.js:234
        'ugorj x: %n y: %n',
    'go to %dst': // objects.js:241
        'ugorj %dst hely\u00E9re',
    'glide %n secs to x: %n y: %n': // objects.js:247
        'cs\u00FAssz %n mp-ig x: %n y: %n',
    'change x by %n': // objects.js:254
        'x v\u00E1ltozzon: %n',
    'set x to %n': // objects.js:261
        'x legyen %n',
    'change y by %n': // objects.js:268
        'y v\u00E1ltozzon: %n',
    'set y to %n': // objects.js:275
        'y legyen %n',
    'if on edge, bounce': // objects.js:282
        'ha sz\u00E9len vagy, pattanj vissza',
    'switch to costume %cst': // objects.js:307
        'a jelmez legyen %cst',
    'next costume': // objects.js:312
        'a k\u00F6vetkez\u0151 jelmez',
    'say %s for %n secs': // objects.js:323
        'mondd %s %n mp-ig',
    'Hello!': // objects.js:324 objects.js:331
        'Szia!',
    'say %s': // objects.js:330
        'mondd %s',
    'think %s for %n secs': // objects.js:337
        'gondold %s %n mp-ig',
    'Hmm': // objects.js:338 objects.js:345
        'Hmm',
    'think %s': // objects.js:344
        'gondold %s',
    'change %eff effect by %n': // objects.js:350
        '%eff hat\u00E1s v\u00E1ltozzon %n',
    'set %eff effect to %n': // objects.js:356
        '%eff hat\u00E1s legyen %n',
    'clear graphic effects': // objects.js:362
        't\u00F6r\u00F6ld a grafikus hat\u00E1sokat',
    'change size by %n': // objects.js:368
        'a m\u00E9ret v\u00E1ltozzon %n',
    'set size to %n %': // objects.js:375
        'a m\u00E9ret legyen %n %',
    'go to front': // objects.js:400
        'ker\u00FClj legel\u0151re',
    'go back %n layers': // objects.js:406
        'ker\u00FClj %n szinttel h\u00E1tr\u00E9bb',
    'save %imgsource as costume named %s': // objects.js:412
        undefined,
    'wardrobe': // objects.js:421
        undefined,
    'alert %mult%s': // objects.js:428
        'Felbukkan\u00F3: %mult%',
    'console log %mult%s': // objects.js:434
        'konzolra \u00EDr\u00E1s: %mult%',
    'play sound %snd': // objects.js:441
        'j\u00E1tszd le: %snd',
    'play sound %snd until done': // objects.js:446
        'j\u00E1tszd le: %snd \u00E9s v\u00E1rd meg',
    'stop all sounds': // objects.js:451
        'minden hangot \u00E1ll\u00EDts le',
    'rest for %n beats': // objects.js:456
        'sz\u00FCnetelj %n \u00FCtemet',
    'play note %note for %n beats': // objects.js:462
        undefined,
    'set instrument to %inst': // objects.js:468
        undefined,
    'change tempo by %n': // objects.js:474
        'a temp\u00F3 v\u00E1ltozzon: %n',
    'set tempo to %n bpm': // objects.js:480
        'a temp\u00F3 legyen %n \u00FCtem/perc',
    'tempo': // objects.js:486
        'temp\u00F3',
    'jukebox': // objects.js:494
        undefined,
    'clear': // objects.js:501 paint.js:230
        't\u00F6r\u00F6ld a rajzokat',
    'pen down': // objects.js:507
        'tollat le',
    'pen up': // objects.js:513
        'tollat fel',
    'set pen color to %clr': // objects.js:519
        'a tollsz\u00EDn legyen %clr',
    'change pen color by %n': // objects.js:525
        'a tollsz\u00EDn v\u00E1ltozzon %n',
    'set pen color to %n': // objects.js:532
        'a tollsz\u00EDn legyen %n',
    'change pen shade by %n': // objects.js:539
        'a toll\u00E1rnyalat v\u00E1ltozzon %n',
    'set pen shade to %n': // objects.js:546
        'a toll\u00E1rnyalat legyen %n',
    'change pen size by %n': // objects.js:553
        'a tollm\u00E9ret v\u00E1ltozzon %n',
    'set pen size to %n': // objects.js:560
        'a tollm\u00E9ret legyen %n',
    'stamp': // objects.js:567
        'k\u00E9sz\u00EDts lenyomatot',
    'fill': // objects.js:573
        undefined,
    'when %greenflag clicked': // objects.js:585
        '%greenflag -ra kattint\u00E1skor',
    'when %keyHat key pressed': // objects.js:590
        '%keyHat lenyom\u00E1sakor',
    'when I am %interaction': // objects.js:595
        'amikor %interaction',
    'when I receive %msgHat': // objects.js:601
        '%msgHat \u00FCzenet \u00E9rkez\u00E9sekor',
    'when %b': // objects.js:606
        undefined,
    'broadcast %msg': // objects.js:611
        'k\u00FCldj mindenkinek %msg \u00FCzenetet',
    'broadcast %msg and wait': // objects.js:616
        'k\u00FCldj mindenkinek %msg \u00FCzenetet \u00E9s v\u00E1rj',
    'message': // objects.js:621
        '\u00FCzenet',
    'wait %n secs': // objects.js:626
        'v\u00E1rj %n mp-et',
    'wait until %b': // objects.js:632
        'v\u00E1rj am\u00EDg %b',
    'forever %c': // objects.js:637
        'mindig %c',
    'repeat %n %c': // objects.js:642
        'ism\u00E9teld %n -szer %c',
    'repeat until %b %c': // objects.js:648
        'ism\u00E9teld am\u00EDg %b %c',
    'if %b %c': // objects.js:653
        'ha %b %c',
    'if %b %c else %c': // objects.js:658
        'ha %b %c k\u00FCl\u00F6nben %c',
    'stop %stopChoices': // objects.js:678
        '%stopChoices \u00E1lljon le',
    'run %cmdRing %inputs': // objects.js:693
        'futtasd %cmdRing %inputs \u00E9rt\u00E9kkel',
    'launch %cmdRing %inputs': // objects.js:698
        'induljon %cmdRing %inputs',
    'call %repRing %inputs': // objects.js:703
        'h\u00EDvd %repRing auf %inputs',
    'report %s': // objects.js:708
        'jelents %s',
    'run %cmdRing w/continuation': // objects.js:720
        'futtat\u00E1s %cmdRing folytat\u00E1s\u00E1val',
    'call %cmdRing w/continuation': // objects.js:725
        'h\u00EDvd meg %cmdRing folytat\u00E1s\u00E1val',
    'warp %c': // objects.js:730
        'Warp %c',
    'tell %spr to %cmdRing %inputs': // objects.js:739
        undefined,
    'ask %spr for %repRing %inputs': // objects.js:744
        undefined,
    'when I start as a clone': // objects.js:752
        'm\u00E1solatk\u00E9nt ind\u00EDtva',
    'create a clone of %cln': // objects.js:757
        'k\u00E9sz\u00EDts m\u00E1solatot %cln',
    'a new clone of %cln': // objects.js:762
        undefined,
    'delete this clone': // objects.js:768
        't\u00F6r\u00F6ld ezt a m\u00E1solatot',
    'pause all %pause': // objects.js:776
        'V\u00E1rakozzon minden %pause',
    'touching %col ?': // objects.js:785
        '\u00E9rint %col sz\u00EDnt?',
    'touching %clr ?': // objects.js:791
        '\u00E9rint %clr sz\u00EDnt?',
    'color %clr is touching %clr ?': // objects.js:797
        '%clr sz\u00EDn \u00E9rint %clr sz\u00EDnt?',
    'filtered for %clr': // objects.js:803
        '%clr sz\u00EDn sz\u0171r\u00E9se',
    'stack size': // objects.js:809
        'Veremm\u00E9ret',
    'frames': // objects.js:815
        'Keretek',
    'processes': // objects.js:821
        undefined,
    'ask %s and wait': // objects.js:826
        'K\u00E9rdezd meg %s \u00E9s v\u00E1rj',
    'what\'s your name?': // objects.js:827
        'Mi a neved?',
    'answer': // objects.js:833 objects.js:838
        'V\u00E1lasz',
    'mouse x': // objects.js:843
        'eg\u00E9r x',
    'mouse y': // objects.js:848
        'eg\u00E9r y',
    'mouse down?': // objects.js:853
        'Eg\u00E9r lenyomva?',
    'key %key pressed?': // objects.js:858
        '%key gomb lenyomva?',
    '%rel to %dst': // objects.js:871
        undefined,
    'reset timer': // objects.js:877
        'Null\u00E1zd az \u00F3r\u00E1t',
    'timer': // objects.js:883 objects.js:888
        'Stopper',
    '%att of %spr': // objects.js:893
        '%att %spr objektum\u00E9rt\u00E9k',
    'url %s': // objects.js:899
        undefined,
    'turbo mode?': // objects.js:905
        'Turb\u00F3 m\u00F3d?',
    'set turbo mode to %b': // objects.js:910
        '%b turb\u00F3 m\u00F3dj\u00E1nak bekapcsol\u00E1sa',
    'current %dates': // objects.js:915
        'aktu\u00E1lis %dates',
    'my %get': // objects.js:920
        undefined,
    'round %n': // objects.js:968
        '%n kerek\u00EDtve',
    '%fun of %n': // objects.js:973
        '%fun %n',
    '%n mod %n': // objects.js:979
        '%n osztva %n marad\u00E9ka',
    'pick random %n to %n': // objects.js:984
        'v\u00E9letlen %n \u00E9s %n k\u00F6z\u00F6tt',
    '%b and %b': // objects.js:1005
        '%b \u00C9S %b',
    '%b or %b': // objects.js:1010
        '%b VAGY %b',
    'not %b': // objects.js:1015
        'NEM %b',
    'join %words': // objects.js:1033
        '\u00F6sszef\u0171z %words',
    'hello': // objects.js:1034 objects.js:1075
        'szia',
    'world': // objects.js:1034 objects.js:1040 objects.js:1046 objects.js:1075
        'vil\u00E1g',
    'letter %n of %s': // objects.js:1039
        '%n karaktere ennek: %s',
    'length of %s': // objects.js:1045
        '%s hossza',
    'unicode of %s': // objects.js:1051
        '%s Unicode-ra alak\u00EDtva',
    'unicode %n as letter': // objects.js:1057
        'Unicode %n bet\u0171k\u00E9nt',
    'is %s a %typ ?': // objects.js:1063
        '%s egy %typ ?',
    'is %s identical to %s ?': // objects.js:1069
        '%s ugyanaz, mint %s ?',
    'split %s by %delim': // objects.js:1074
        '%s sz\u00E9tv\u00E1g\u00E1sa %delim jelekn\u00E9l',
    'JavaScript function ( %mult%s ) { %code }': // objects.js:1080
        'JavaScript f\u00FCggv\u00E9ny ( %mult%s ) { %code }',
    'type of %s': // objects.js:1086
        't\u00EDpus: %s',
    '%txtfun of %s': // objects.js:1093
        undefined,
    'compile %repRing': // objects.js:1099
        undefined,
    'set %var to %s': // objects.js:1119
        '%var legyen %s',
    'change %var by %n': // objects.js:1125
        '%var v\u00E1ltozzon ennyivel: %n',
    'show variable %var': // objects.js:1131
        '\u00EDrd ki: %var',
    'hide variable %var': // objects.js:1136
        'rejtsd el: %var',
    'script variables %scriptVars': // objects.js:1141
        'feladatv\u00E1ltoz\u00F3: %scriptVars',
    'inherit %shd': // objects.js:1148
        undefined,
    'list %exp': // objects.js:1155
        'lista %exp',
    '%s in front of %l': // objects.js:1160
        '%s megel\u0151zi %l',
    'item %idx of %l': // objects.js:1165
        '%idx eleme a %l list\u00E1nak',
    'all but first of %l': // objects.js:1171
        '%l els\u0151nk\u00EDv\u00FCli elemei',
    'length of %l': // objects.js:1176
        '%l hossza',
    '%l contains %s': // objects.js:1181
        '%l tartalmazza %s -t',
    'thing': // objects.js:1182 objects.js:1188 objects.js:1200 objects.js:1206
        'dolog',
    'add %s to %l': // objects.js:1187
        '%s hozz\u00E1ad\u00E1sa %l list\u00E1hoz',
    'delete %ida of %l': // objects.js:1193
        '%ida elem t\u00F6rl\u00E9se %l list\u00E1b\u00F3l',
    'insert %s at %idx of %l': // objects.js:1199
        '%s besz\u00FAr\u00E1sa %idx . poz\u00EDci\u00F3ba ebbe: %l',
    'replace item %idx of %l with %s': // objects.js:1205
        '%idx helyettes\u00EDt\u00E9se %l list\u00E1ban erre: %s',
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
        undefined,
    'map %codeListPart of %codeListKind to code %code': // objects.js:1256
        'mapear %codeListPart de %codeListKind no c\u00F3digo %code',
    'code of %cmdRing': // objects.js:1261
        '%cmdRing k\u00F3dja',
    'Sprite': // objects.js:1404
        'Szerepl\u0151',
    'that name is already in use': // objects.js:1859 objects.js:7047
        undefined,
    'development mode\ndebugging primitives': // objects.js:1932 objects.js:2089 objects.js:2155 objects.js:2268 objects.js:7085 objects.js:7214 objects.js:7280 objects.js:7376
        'Fejleszt\u0151 m\u00F3d\nblokkok hibakeres\u00E9se',
    'Make a variable': // objects.js:2184 objects.js:7309
        '\u00DAj v\u00E1ltoz\u00F3',
    'Delete a variable': // objects.js:2205 objects.js:7327
        'V\u00E1ltoz\u00F3 t\u00F6rl\u00E9se',
    'find blocks': // objects.js:2398 objects.js:2469
        'blokkok keres\u00E9se',
    'hide primitives': // objects.js:2476
        'az alapvet\u0151k elrejt\u00E9se',
    'show primitives': // objects.js:2494
        'az alapvet\u0151k megjelent\u00E9se',
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
        'J\u00E1t\u00E9kt\u00E9r',
    'stop': // objects.js:6770 costumes/COSTUMES:486
        undefined,
    'terminate all running threads': // objects.js:6774
        undefined,
    'Stage selected:\nno motion primitives': // objects.js:7060
        'V\u00E1lasztott j\u00E1t\u00E9kt\u00E9r:\nnincs mozg\u00F3 elem',
    'turn all pen trails and stamps\ninto a new costume for the\ncurrently selected sprite': // objects.js:7445
        'minden tollbe\u00E1ll\u00EDt\u00E1s \u00E1t\u00E1ll\u00EDt\u00E1sa\n\u00E9s \u00E1tvitele az aktu\u00E1lis\nalak egy \u00FAj jelmez\u00E9be',
    'turn all pen trails and stamps\ninto a new background for the stage': // objects.js:7447
        undefined,
    'Background': // objects.js:7817
        undefined,
    'a {{ className }}({{ name }})': // objects.js:8096
        undefined,
    'click or drag crosshairs to move the rotation center': // objects.js:8296
        'kattints oda vagy vidd a sz\u00E1lkeresztet a forg\u00E1s k\u00F6z\u00E9ppontj\u00E1ba',
    'Costume Editor': // objects.js:8308
        'Jelmezszerkeszt\u0151',
    'an {{ className }}({{ name }})': // objects.js:8395
        undefined,
    'Web Audio API is not supported\nin this browser': // objects.js:8629
        undefined,
    'normal': // objects.js:9452
        'norm\u00E1l',
    'large': // objects.js:9456
        'nagy',
    'slider min': // objects.js:9466
        'a cs\u00FAszka minimuma',
    'slider max': // objects.js:9470
        'a cs\u00FAszka maximuma',
    'import': // objects.js:9475
        'import\u00E1l\u00E1s',
    'Unable to import': // objects.js:9501
        undefined,
    '{{ appName }} can only import "text" files.\nYou selected a file of type "{{ type }}".': // objects.js:9502
        undefined,
    'Slider minimum value': // objects.js:9588
        'A cs\u00FAszka minim\u00E1lis \u00E9rt\u00E9ke',
    'Slider maximum value': // objects.js:9604
        'A cs\u00FAszka maxim\u00E1lis \u00E9rt\u00E9ke',
    'Paint Editor': // paint.js:111
        'K\u00E9pszerkeszt\u0151',
    'Paintbrush tool\n(free draw)': // paint.js:172
        'Fest\u0151ecset eszk\u00F6z\n(szabadk\u00E9zi rajz)',
    'Stroked Rectangle\n(shift: square)': // paint.js:174
        'T\u00E9glalap\n(shift: n\u00E9gyzet)',
    'Stroked Ellipse\n(shift: circle)': // paint.js:176
        'Ellipszis\n(shift: k\u00F6r)',
    'Eraser tool': // paint.js:178
        'T\u00F6rl\u0151 eszk\u00F6z',
    'Set the rotation center': // paint.js:180
        'A forgat\u00E1s k\u00F6z\u00E9ppontj\u00E1nak be\u00E1ll\u00EDt\u00E1sa',
    'Line tool\n(shift: vertical/horizontal)': // paint.js:183
        'Vonalrajzol\u00F3 eszk\u00F6z\n(shift: f\u00FCgg\u0151leges/v\u00EDzszintes)',
    'Filled Rectangle\n(shift: square)': // paint.js:185
        'Kit\u00F6lt\u00F6tt t\u00E9glalap\n(shift: n\u00E9gyzet)',
    'Filled Ellipse\n(shift: circle)': // paint.js:187
        'Kit\u00F6lt\u00F6tt ellipszis\n(shift: k\u00F6r)',
    'Fill a region': // paint.js:189
        'Ter\u00FClet kit\u00F6lt\u00E9se',
    'Pipette tool\n(pick a color anywhere)': // paint.js:191
        'Pipetta\n(sz\u00EDn felv\u00E9tele b\u00E1rhonnan)',
    'undo': // paint.js:225
        'visszavon',
    'grow': // paint.js:239
        'n\u00F6veked\u00E9s',
    'shrink': // paint.js:243
        'kicsiny\u00EDt\u00E9s',
    'flip \u2194': // paint.js:247
        't\u00FCkr\u00F6z\u00E9s \u2194',
    'flip \u2195': // paint.js:251
        't\u00FCkr\u00F6z\u00E9s \u2195',
    'Constrain proportions of shapes?\n(you can also hold shift)': // paint.js:407
        'Megmaradjanak az alakzat ar\u00E1nyai?\n(ehhez haszn\u00E1lhatja a SHIFT billenty\u0171t is)',
    'Brush size': // paint.js:413
        'Ecsetm\u00E9ret',
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
        'n\u00E9gyzet',
    'pointRight': // symbols.js:86
        'h\u00E1romsz\u00F6g jobbra',
    'stepForward': // symbols.js:87
        undefined,
    'gears': // symbols.js:88
        'fogasker\u00E9k',
    'file': // symbols.js:89
        '\u00E1llom\u00E1ny',
    'fullScreen': // symbols.js:90
        'teljes k\u00E9perny\u0151',
    'normalScreen': // symbols.js:91
        'norm\u00E1l k\u00E9perny\u0151',
    'smallStage': // symbols.js:92
        'kis sz\u00EDnpad',
    'normalStage': // symbols.js:93
        'norm\u00E1l sz\u00EDnpad',
    'turtle': // symbols.js:94
        'tekn\u0151s',
    'turtleOutline': // symbols.js:96
        'a tekn\u0151s k\u00F6rvonala',
    'pause': // symbols.js:97
        'sz\u00FCnet',
    'flag': // symbols.js:98
        'z\u00E1szl\u00F3',
    'octagon': // symbols.js:99
        'nyolcsz\u00F6g',
    'cloud': // symbols.js:100 costumes/COSTUMES:170
        'felh\u0151',
    'cloudOutline': // symbols.js:101
        'a felh\u0151 k\u00F6rvonala',
    'cloudGradient': // symbols.js:102
        'a felh\u0151 \u00E1ttetsz\u0151s\u00E9ge',
    'turnRight': // symbols.js:103
        'fordulj jobbra',
    'turnLeft': // symbols.js:104
        'fordulj balra',
    'storage': // symbols.js:105
        't\u00E1rol\u00E1s',
    'poster': // symbols.js:106
        'h\u00E1tt\u00E9rk\u00E9p',
    'flash': // symbols.js:107
        'vill\u00E1m',
    'brush': // symbols.js:108
        'ecset',
    'rectangleSolid': // symbols.js:110
        'kit\u00F6lt\u00F6tt t\u00E9glalap',
    'circle': // symbols.js:111
        'k\u00F6r',
    'circleSolid': // symbols.js:112
        'kit\u00F6lt\u00F6tt k\u00F6r',
    'cross': // symbols.js:114
        undefined,
    'crosshairs': // symbols.js:115
        'sz\u00E1lkereszt',
    'paintbucket': // symbols.js:116
        'fest\u00E9kesv\u00F6d\u00F6r',
    'eraser': // symbols.js:117
        'rad\u00EDr',
    'pipette': // symbols.js:118
        'pipetta',
    'speechBubble': // symbols.js:119
        'bubor\u00E9k',
    'speechBubbleOutline': // symbols.js:120
        'a bubor\u00E9k k\u00F6rvonala',
    'turnBack': // symbols.js:121
        undefined,
    'turnForward': // symbols.js:122
        undefined,
    'arrowUp': // symbols.js:123
        'felfel\u00E9 ny\u00EDl',
    'arrowUpOutline': // symbols.js:124
        'a felfel\u00E9ny\u00EDl k\u00F6rvonala',
    'arrowLeft': // symbols.js:125
        'balra ny\u00EDl',
    'arrowLeftOutline': // symbols.js:126
        'a balra ny\u00EDl k\u00F6rvonala',
    'arrowDown': // symbols.js:127
        'lefel\u00E9 ny\u00EDl',
    'arrowDownOutline': // symbols.js:128
        'a lefel\u00E9ny\u00EDl k\u00F6rvonala',
    'arrowRight': // symbols.js:129
        'jobbra ny\u00EDl',
    'arrowRightOutline': // symbols.js:130
        'a jobbrany\u00EDl k\u00F6rvonala',
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
        'k\u00F6telez\u0151 {{ expected }} adatbevitel, de ez \u00E9rkezett {{ actual }}',
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
        'ilyen nev\u0171 v\u00E1ltoz\u00F3 \u00AB{{ name }}\u00BB\nnincs ebben a k\u00F6rnyezetben',
    'Yes': // widgets.js:1607
        'Igen',
    'No': // widgets.js:1608
        'Nem',
    'Default': // widgets.js:1882
        'Alap\u00E9rt\u00E9k',
    '{{ year }} or before': // widgets.js:2024
        '{{ year }} vagy el\u0151tte',
    'User name': // widgets.js:2054 widgets.js:2059 widgets.js:2092
        'Felhaszn\u00E1l\u00F3i n\u00E9v',
    'Birth date': // widgets.js:2061
        'Sz\u00FClet\u00E9si id\u0151',
    'Password': // widgets.js:2071 widgets.js:2078
        'Jelsz\u00F3',
    'Repeat Password': // widgets.js:2073
        undefined,
    'Old password': // widgets.js:2083
        'A jelenlegi jelsz\u00F3',
    'New password': // widgets.js:2085
        '\u00DAj jelsz\u00F3',
    'Repeat new password': // widgets.js:2087
        'Az \u00FAj jelsz\u00F3 ism\u00E9t',
    'please fill out\nthis field': // widgets.js:2196
        'k\u00E9rem, t\u00F6ltse ki\nezt a mez\u0151t.',
    'User name must be four\ncharacters or longer': // widgets.js:2201
        'A felhaszn\u00E1l\u00F3i n\u00E9v legal\u00E1bb\nn\u00E9gy karakteres legyen.',
    'please provide a valid\nemail address': // widgets.js:2206
        'k\u00E9rem, adjon meg egy\n\u00E9rv\u00E9nyes email c\u00EDmet.',
    'password must be six\ncharacters or longer': // widgets.js:2212
        'a jelsz\u00F3 legyen legal\u00E1bb\nhat karakter hossz\u00FA.',
    'passwords do\nnot match': // widgets.js:2216
        'A jelszavak nem egyeznek.',
    'please agree to\nthe TOS': // widgets.js:2222
        'fogadja el a felhaszn\u00E1l\u00E1si felt\u00E9teleket.',
    'E-mail address of parent or guardian': // widgets.js:2258
        'A sz\u00FCl\u0151 vagy gondoz\u00F3 email c\u00EDme',
    'E-mail address': // widgets.js:2259
        'E-mail c\u00EDm',
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
SnapTranslator.dict.hu.deprecated = {
    'add a new sprite':
        '\u00DAj szerepl\u0151',
    'play note %n for %n beats':
        'sz\u00F3ljon %n %n \u00FCtemig',
    'stop %stopOthersChoices':
        '%stopOthersChoices \u00E1lljon le',
    'distance to %dst':
        't\u00E1vols\u00E1g: %dst',
    'http:// %s':
        'http:// %s',
    'Snap! website':
        'A Snap! webhelye',
    'Save to disk':
        'Lemezre \u00EDr\u00E1s',
    'store this project\nin the downloads folder\n(in supporting browsers)':
        'a projekt t\u00E1rol\u00E1sa\na let\u00F6lt\u00E9si mapp\u00E1ba\n(ha a b\u00F6ng\u00E9sz\u0151 engedi)',
    'detach from':
        'lev\u00E1laszt\u00E1s err\u0151l',
    'Ok':
        'Ok',
    'Saved!':
        'Mentve!',
    'Are you sure you want to delete':
        'Biztos, hogy t\u00F6rl\u00F6d?',
    'Save Project As':
        'Projekt ment\u00E9se m\u00E1sk\u00E9nt',
    'Single input.':
        'Egyszer\u0171 bevitel.',
    'new':
        '\u00FAj',
    'Snap!Cloud':
        'Snap!Felh\u0151',
    'could not connect to':
        'nem tud csatlakozni ide',
    'Service':
        'Szolg\u00E1ltat\u00E1s',
    'login':
        'bejelentkez\u00E9s',
    'ERROR: INVALID PASSWORD':
        'HIBA: \u00C9RV\u00C9NYTELEN JELSZ\u00D3',
    'Logout':
        'Kijelentkez\u00E9s',
    'Account created.':
        'Az azonos\u00EDt\u00F3 l\u00E9trej\u00F6tt.',
    'An e-mail with your password\nhas been sent to the address provided':
        'A megadott c\u00EDmre e-mailben elk\u00FCldt\u00FCk a jelszav\u00E1t.',
    'now connected.':
        'csatlakozva.',
    'disconnected.':
        'lev\u00E1lasztva.',
    'or before':
        'vagy el\u0151tte',
    'saved.':
        'mentve.',
    'Enter one option per line.Optionally use "=" as key/value delimiter\ne.g.\n   the answer=42':
        'Soronk\u00E9nt egy lehet\u0151s\u00E9get \u00EDrjon be.\nSz\u00FCks\u00E9g eset\u00E9n haszn\u00E1lhatja az "=" jelet\nkulcs/\u00E9rt\u00E9k p\u00E1r elv\u00E1laszt\u00E1s\u00E1ra, pl.\na v\u00E1lasz=42',
    'turn pen trails into new costume':
        'a toll be\u00E1ll\u00EDt\u00E1sainak alkalmaz\u00E1sa egy \u00FAj jelmezre',
    'last changed':
        'utolj\u00E1ra v\u00E1ltoztatva',
    'Are you sure you want to publish':
        'Biztosan nyilv\u00E1noss\u00E1 teszi',
    'Are you sure you want to unpublish':
        'Biztos, hogy nemnyilv\u00E1noss\u00E1 teszi',
    'shared.':
        'megosztva.',
    'unshared.':
        'nincs megosztva.',
    'password has been changed.':
        'a jelsz\u00F3 megv\u00E1ltozott.',
    'SVG costumes are\nnot yet fully supported\nin every browser':
        'Az SVG \u00E1br\u00E1kat nem minden b\u00F6ng\u00E9sz\u0151 t\u00E1mogatja',
    'Select categories of additional blocks to add to this project.':
        'V\u00E1lassza ki a projekthez adand\u00F3 blokkok kateg\u00F3ri\u00E1it.',
    'Import sound':
        'Hang import\u00E1l\u00E1sa',
    'a variable of name \'':
        'ilyen nev\u0171 v\u00E1ltoz\u00F3 \u00AB',
    '\'\ndoes not exist in this context':
        '\u00BB\nnincs ebben a k\u00F6rnyezetben',
    '(temporary)':
        '(ideiglenes)',
    'expecting':
        'k\u00F6telez\u0151',
    'input(s), but getting':
        'adatbevitel, de ez \u00E9rkezett',
    'map String to code %code':
        'mapear texto no c\u00F3digo %code',
};
