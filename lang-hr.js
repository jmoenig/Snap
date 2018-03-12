/*

    lang-hr.js

    Croatian translation for Snap!

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
SnapTranslator.dict.hr = {
    metadata: {
        'name': // the name as it should appear in the language menu
            'Hrvatski',
        'english_name': // the english name of the language
            'Croatian',
        'translators': [ // translators authors for the Translators tab
            'u017Deljko Hrvoj <zeljko.hrvoj@zg.t-com.hr>'
        ],
        'last_changed': // this, too, will appear in the Translators tab
            '2017-08-15',
    },
    strings: {},
};
// ✂ - - - - - - - - - - - - - - - - -  -   -

SnapTranslator.dict.hr.strings = {
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
        'tragovi olovke',
    'stage image': // blocks.js:821
        undefined,
    'with inputs': // blocks.js:831
        's parametrima',
    'block variables': // blocks.js:840 byob.js:1053
        undefined,
    'Input Names': // blocks.js:844
        'Imena parametara',
    'input names': // blocks.js:850
        'imena parametara',
    'Input name': // blocks.js:902 blocks.js:5344
        'Ime parametra',
    '(90) right': // blocks.js:935 morphic.js:4888
        '(90) desno',
    '(-90) left': // blocks.js:936 morphic.js:4889
        '(-90) lijevo',
    '(0) up': // blocks.js:937 morphic.js:4890
        '(0) gore',
    '(180) down': // blocks.js:938 morphic.js:4891
        '(180) dolje',
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
        'Sije\u010Danj',
    'February': // blocks.js:969 widgets.js:1942
        'Velja\u010Da',
    'March': // blocks.js:970 widgets.js:1943
        'O\u017Eujak',
    'April': // blocks.js:971 widgets.js:1944
        'Travanj',
    'May': // blocks.js:972 widgets.js:1945
        'Svibanj',
    'June': // blocks.js:973 widgets.js:1946
        'Lipanj',
    'July': // blocks.js:974 widgets.js:1947
        'Srpanj',
    'August': // blocks.js:975 widgets.js:1948
        'Kolovoz',
    'September': // blocks.js:976 widgets.js:1949
        'Rujan',
    'October': // blocks.js:977 widgets.js:1950
        'Listopad',
    'November': // blocks.js:978 widgets.js:1951
        'Studeni',
    'December': // blocks.js:979 widgets.js:1952
        'Prosinac',
    'clicked': // blocks.js:988
        'klikne\u0161',
    'pressed': // blocks.js:989
        'pritisne\u0161',
    'dropped': // blocks.js:990
        'ispusti\u0161',
    'mouse-entered': // blocks.js:991
        'mi\u0161 posjeti',
    'mouse-departed': // blocks.js:992
        'mi\u0161 napusti',
    'scrolled-up': // blocks.js:993
        undefined,
    'scrolled-down': // blocks.js:994
        undefined,
    'year': // blocks.js:1004 widgets.js:2063
        'godina',
    'month': // blocks.js:1005
        'mjesec',
    'date': // blocks.js:1006
        'dan',
    'day of week': // blocks.js:1007
        'dan u tjednu',
    'hour': // blocks.js:1008
        'sat',
    'minute': // blocks.js:1009
        'minuta',
    'second': // blocks.js:1010
        'sekunda',
    'time in milliseconds': // blocks.js:1011
        'vrijeme u ms',
    'letter': // blocks.js:1021
        'znak',
    'whitespace': // blocks.js:1022
        'razmak',
    'line': // blocks.js:1023 symbols.js:113
        'linija',
    'tab': // blocks.js:1024
        'tabulator',
    'cr': // blocks.js:1025
        'novi red',
    'csv': // blocks.js:1026
        undefined,
    'last': // blocks.js:1036 blocks.js:1048
        'zadnji',
    'all': // blocks.js:1038 blocks.js:1265 byob.js:3874
        'sve',
    'any': // blocks.js:1049
        'bilo koji',
    'distance': // blocks.js:1058
        undefined,
    'direction': // blocks.js:1059 blocks.js:2483 blocks.js:8556 objects.js:300
        'smjer',
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
        'dupliciraj',
    'negative': // blocks.js:1123
        'negativ',
    'comic': // blocks.js:1124
        'komi\u010Dno',
    'confetti': // blocks.js:1125
        '\u0161areno',
    'saturation': // blocks.js:1126
        undefined,
    'brightness': // blocks.js:1127
        'svjetlina',
    'ghost': // blocks.js:1128
        'prozirnost',
    'any key': // blocks.js:1146
        undefined,
    'up arrow': // blocks.js:1147
        'strelica gore',
    'down arrow': // blocks.js:1148
        'strelica dolje',
    'right arrow': // blocks.js:1149
        'strelica desno',
    'left arrow': // blocks.js:1150
        'strelica lijevo',
    'space': // blocks.js:1151
        'razmaknica',
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
        'floor',
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
        'ovu skriptu',
    'this block': // blocks.js:1267
        'ovaj blok',
    'all but this script': // blocks.js:1268
        'sve osim ove skripte',
    'other scripts in sprite': // blocks.js:1269
        'ostale skripte objekta',
    'String': // blocks.js:1290
        undefined,
    'Number': // blocks.js:1291 byob.js:3286
        'Broj',
    'true': // blocks.js:1292 blocks.js:9529 blocks.js:9919 objects.js:2979
        'istina',
    'false': // blocks.js:1293 blocks.js:9544 blocks.js:9930 objects.js:2979
        'la\u017E',
    'code': // blocks.js:1334
        undefined,
    'header': // blocks.js:1335
        undefined,
    'list': // blocks.js:1408 blocks.js:8487
        'lista',
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
        'bez imena',
    '{{ projectName }} script pic': // blocks.js:1993 blocks.js:2602 blocks.js:6441 byob.js:1035
        undefined,
    'script target cannot be found for orphaned block': // blocks.js:2203
        undefined,
    'a {{ className }} ("{{ value }}...")': // blocks.js:2207 morphic.js:8466 morphic.js:9146
        undefined,
    'Variable name': // blocks.js:2377 blocks.js:3262 objects.js:2179 objects.js:7304
        'Ime varijable',
    'help': // blocks.js:2386 objects.js:1851 objects.js:2308
        'pomo\u0107',
    'script pic with result': // blocks.js:2393
        undefined,
    'open a new window\nwith a picture of both\nthis script and its result': // blocks.js:2397
        undefined,
    'rename': // blocks.js:2409 blocks.js:2458 blocks.js:2521 gui.js:7708 gui.js:8409 morphic.js:7656
        'preimenuj',
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
        'sakrij',
    'x position': // blocks.js:2481 blocks.js:8554 objects.js:288
        'polo\u017Eaj x',
    'y position': // blocks.js:2482 blocks.js:8555 objects.js:294
        'polo\u017Eaj y',
    'size': // blocks.js:2484 blocks.js:8559 objects.js:382
        'veli\u010Dina',
    'costume #': // blocks.js:2485 blocks.js:8557 blocks.js:8561 objects.js:317
        'kostim br.',
    'header mapping': // blocks.js:2507 blocks.js:2677
        undefined,
    'code mapping': // blocks.js:2511 blocks.js:2681
        undefined,
    'relabel': // blocks.js:2527 blocks.js:2538
        'promijeni tip',
    'make a copy\nand pick it up': // blocks.js:2564 blocks.js:11908 morphic.js:4171
        'napravi kopiju\ni pokupi',
    'only duplicate this block': // blocks.js:2586
        'dupliciraj samo taj blok',
    'delete': // blocks.js:2590 blocks.js:11910 gui.js:7372 gui.js:7711 gui.js:8410 morphic.js:4215 objects.js:3242
        'izbri\u0161i',
    'script pic': // blocks.js:2594 byob.js:1030
        'slikaj skriptu',
    'open a new window\nwith a picture of this script': // blocks.js:2608 byob.js:1041
        'otvori novi prozor\nsa slikom te skripte',
    'download script': // blocks.js:2612
        undefined,
    '{{ name }} script': // blocks.js:2622
        undefined,
    'download this script\nas an XML file': // blocks.js:2627
        undefined,
    'unringify': // blocks.js:2657
        'odstrani obru\u010D',
    'ringify': // blocks.js:2661 blocks.js:2673
        'opkru\u017Ei',
    'delete block': // blocks.js:2691
        undefined,
    'spec': // blocks.js:2692 blocks.js:2699
        undefined,
    'Help': // blocks.js:2980 blocks.js:2997
        'Pomo\u0107',
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
        'Ime skriptne varijable',
    'undrop': // blocks.js:6320 blocks.js:6709
        'poni\u0161ti ispu\u0161tanje',
    'undo the last\nblock drop\nin this pane': // blocks.js:6324
        'poni\u0161ti zadnje ispu\u0161tanje\nbloka u tom okviru',
    'redrop': // blocks.js:6335 blocks.js:6722
        undefined,
    'redo the last undone\nblock drop\nin this pane': // blocks.js:6339
        undefined,
    'clear undrop queue': // blocks.js:6345
        undefined,
    'forget recorded block drops\non this pane': // blocks.js:6351
        undefined,
    'clean up': // blocks.js:6359
        'poslo\u017Ei',
    'arrange scripts\nvertically': // blocks.js:6359
        'poslo\u017Ei skripte\nokomito',
    'add comment': // blocks.js:6360
        'dodaj komentar',
    'scripts pic': // blocks.js:6362
        'slikaj skriptu',
    'open a new window\nwith a picture of all scripts': // blocks.js:6364
        'otvori novi prozor\nsa slikom svih skripti',
    'make a block': // blocks.js:6380
        'napravi novi blok',
    'Make a block': // blocks.js:6398 objects.js:2303 objects.js:2352 objects.js:2411
        'Napravi novi blok',
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
        'Ime doga\u0111aja',
    'any message': // blocks.js:8360
        'bilo koji doga\u0111aj',
    'mouse-pointer': // blocks.js:8391 blocks.js:8420
        'strelica mi\u0161a',
    'edge': // blocks.js:8392
        'rub',
    'random position': // blocks.js:8418
        undefined,
    'myself': // blocks.js:8445
        'mene',
    'number': // blocks.js:8484
        'brojka',
    'text': // blocks.js:8485 morphic.js:12305
        'tekst',
    'Boolean': // blocks.js:8486
        'logi\u010Dki',
    'sprite': // blocks.js:8490
        undefined,
    'costume': // blocks.js:8492 objects.js:3069
        undefined,
    'sound': // blocks.js:8493
        undefined,
    'command': // blocks.js:8494
        'potprogram',
    'reporter': // blocks.js:8495
        'funkcija',
    'predicate': // blocks.js:8496
        'tvrdnja',
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
        'ime kostima',
    'Turtle': // blocks.js:8582 gui.js:7941 objects.js:3166 threads.js:3349
        'Kostim zero',
    'Empty': // blocks.js:8584 gui.js:7941 objects.js:3166 threads.js:3350
        'Prazno',
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
        'lista parametara',
    'add comment here': // blocks.js:11762
        'ovdje napi\u0161i komentar',
    'comment pic': // blocks.js:11912
        undefined,
    '{{ projectName }} comment pic': // blocks.js:11917
        undefined,
    'open a new window\nwith a picture of this comment': // blocks.js:11923
        undefined,
    'Change block': // byob.js:885
        'Promijeni blok',
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
        'obri\u0161i definiciju bloka',
    'edit': // byob.js:1157 gui.js:7699 morphic.js:8730 morphic.js:9477 objects.js:3255 objects.js:3261 objects.js:7422
        'uredi',
    'Delete Custom Block': // byob.js:1228
        'Obri\u0161i korisni\u010Dki blok',
    'Are you sure you want to delete this\ncustom block and all its instances?': // byob.js:1229
        'Da li da obri\u0161em taj blok\nsa svim potprogramima?',
    'OK': // byob.js:1648 byob.js:2117 byob.js:3237 byob.js:3848 gui.js:3713 morphic.js:3958 morphic.js:4028 morphic.js:4054 objects.js:8312 paint.js:161 tables.js:1212 widgets.js:1574 widgets.js:1708 widgets.js:1791 widgets.js:1874 widgets.js:2155 widgets.js:2434
        'OK',
    'Cancel': // byob.js:1649 byob.js:2120 byob.js:3243 byob.js:3849 gui.js:3371 gui.js:3714 gui.js:5941 gui.js:6843 gui.js:8996 gui.js:9134 morphic.js:4031 morphic.js:4057 objects.js:8313 paint.js:162 widgets.js:1709 widgets.js:1792 widgets.js:1887 widgets.js:2156
        'Odustani',
    'Command': // byob.js:1770
        'Potprogram',
    'Reporter': // byob.js:1779 byob.js:3290
        'Funkcija',
    'Predicate': // byob.js:1788 byob.js:3291
        'Tvrdnja',
    'for all sprites': // byob.js:1850 byob.js:3662
        'za sve objekte',
    'for this sprite only': // byob.js:1855 byob.js:3667
        'samo za trenutni objekt',
    'Block Editor': // byob.js:2065
        'Ure\u0111iva\u010D blokova',
    'Method Editor': // byob.js:2066
        undefined,
    'Apply': // byob.js:2119
        'Primijeni',
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
        'Uredi oznaku',
    'Create input name': // byob.js:2754
        'Kreiraj ime parametra',
    'Edit input name': // byob.js:2755
        'Uredi ime parametra',
    'new line': // byob.js:2800 byob.js:3266
        undefined,
    'Title text': // byob.js:3061
        'Tekst u naslovu',
    'Delete': // byob.js:3239 gui.js:5940
        'Obri\u0161i',
    'Object': // byob.js:3283
        'Objekt',
    'Text': // byob.js:3284
        'Tekst',
    'List': // byob.js:3285
        'Lista',
    'Any type': // byob.js:3287
        'Bilo koji tip',
    'Boolean (T/F)': // byob.js:3288
        'Logi\u010Dki (T/F)',
    'Command\n(inline)': // byob.js:3289
        'Naredba\n(u liniji)',
    'Command\n(C-shape)': // byob.js:3292
        'Naredba\n(C-oblika)',
    'Any\n(unevaluated)': // byob.js:3293
        'Bilo koji\n(neizra\u010Dunat)',
    'Boolean\n(unevaluated)': // byob.js:3294
        'Logi\u010Dki\n(neizra\u010Dunat)',
    'Single input': // byob.js:3299
        'Jedan parametar',
    'Multiple inputs (value is list of inputs)': // byob.js:3304
        'Vi\u0161e parametara (vrijednost je lista parametara)',
    'Upvar - make internal variable visible to caller': // byob.js:3309
        'Interna varijabla vidljiva pozivaocu',
    'Default Value': // byob.js:3314
        'Default vrijednost',
    'options': // byob.js:3570
        'opcije',
    'read-only': // byob.js:3573
        'samo za \u010Ditanje',
    'Input Slot Options': // byob.js:3593
        'Opcije ulaznog utora',
    'Enter one option per line.\nOptionally use "=" as key/value delimiter and {} for submenus. e.g.\n   the answer=42': // byob.js:3597
        undefined,
    'Export blocks': // byob.js:3776 byob.js:3914 gui.js:3187 gui.js:3835
        'Izvezi blokove',
    'select': // byob.js:3873
        'izaberi',
    'none': // byob.js:3875 objects.js:5421 objects.js:5427
        'nijedan',
    '{{ projectName }} blocks': // byob.js:3910
        undefined,
    'no blocks were selected': // byob.js:3915 byob.js:4009 byob.js:4102
        undefined,
    'Import blocks': // byob.js:3962 byob.js:3963 byob.js:4008
        'Uvezi blokove',
    'Imported Blocks Module': // byob.js:4002 byob.js:4003 gui.js:4355
        undefined,
    'Remove unused blocks': // byob.js:4056 byob.js:4057 byob.js:4101 gui.js:3872
        'Makni nekori\u0161tene blokove',
    '{{ count }} unused block(s) removed': // byob.js:4096
        '{{ count }} nekori\u0161tenih blokova izbrisano',
    'There was an error while trying to access\na {{ cloudName }} service. Please try again later.': // cloud.js:90
        undefined,
    'Cloud Error': // cloud.js:159
        undefined,
    'You are not logged in': // cloud.js:188 cloud.js:436
        'Niste prijavljeni',
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
        'Povla\u010Denje projekta\niz oblaka',
    'Opening project': // gui.js:430 gui.js:470 gui.js:2627 gui.js:4222
        'Otvaram projekt',
    'Saved project\n{{ name }}': // gui.js:506
        undefined,
    'Visible stepping': // gui.js:716 gui.js:2756
        'Prikazuj izvr\u0161avanje blokova',
    'development mode': // gui.js:990 morphic.js:12252
        'razvojni na\u010Din',
    'don\'t rotate': // gui.js:1222
        'ne rotiraj',
    'can rotate': // gui.js:1223
        'mo\u017Ee se rotirati',
    'only face left/right': // gui.js:1224
        'gledaj samo lijevo-desno',
    'draggable': // gui.js:1329
        'povla\u010Div',
    'Scripts': // gui.js:1371 gui.js:4179
        'Skripte',
    'Costumes': // gui.js:1391 gui.js:3252 gui.js:3255 gui.js:4156
        'Kostimi',
    'Backgrounds': // gui.js:1392 gui.js:3252 gui.js:3255
        'Pozadine',
    'Sounds': // gui.js:1411 gui.js:3262 gui.js:3264 gui.js:4167
        'Zvukovi',
    'add a new Turtle sprite': // gui.js:1545
        'dodaj novi objekt',
    'paint a new sprite': // gui.js:1567
        'nacrtaj novi objekt',
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
        'O programu',
    'Reference manual': // gui.js:2474
        'Korisni\u010Dki priru\u010Dnik',
    '{{ site }} website': // gui.js:2481
        '{{ site }} web stranica',
    'Download source': // gui.js:2487
        'Skini izvorni kod',
    'Switch back to user mode': // gui.js:2498
        'Prebaci natrag na korisni\u0161ki na\u010Din',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones': // gui.js:2500
        'onemogu\u0107i deep-Morphic\nkontekstne menije\ni koristi user-friendly menije',
    'Switch to dev mode': // gui.js:2507
        'Prebaci na razvojni na\u010Din',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!': // gui.js:2509
        'omogu\u0107i Morphic\nkontekstne menije\ni inspektore,\nnisu ba\u0161 user-friendly',
    'Cloud URL': // gui.js:2527 gui.js:5654
        undefined,
    'Login': // gui.js:2536
        'Prijava',
    'Signup': // gui.js:2540
        'Registracija',
    'Reset Password': // gui.js:2544
        'Obnova zaporke',
    'Resend Verification Email': // gui.js:2548
        undefined,
    'Logout {{ username }}': // gui.js:2553
        'Odjava {{ username }}',
    'Change Password': // gui.js:2557 gui.js:5420
        'Promjena zaporke',
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
        'Jezik',
    'Generate {{ filename }} file': // gui.js:2679 gui.js:5035
        undefined,
    'builds the {{ language }} translation file': // gui.js:2684
        undefined,
    'Zoom blocks': // gui.js:2692 gui.js:5120
        'Zumiraj blok',
    'Stage size': // gui.js:2696 gui.js:5163
        'Veli\u010Dina scene',
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
        'Kliza\u010Di za parametre',
    'uncheck to disable\ninput sliders for\nentry fields': // gui.js:2736
        'odzna\u010Di da isklju\u010Di\u0161\nkliza\u010De vrijednosti\nkod parametara',
    'check to enable\ninput sliders for\nentry fields': // gui.js:2737
        'ozna\u010Di da uklju\u010Di\u0161\nkliza\u010De vrijednosti\nkod parametara',
    'Execute on slider change': // gui.js:2741
        undefined,
    'uncheck to suppress\nrunning scripts\nwhen moving the slider': // gui.js:2744
        undefined,
    'check to run\nthe edited script\nwhen moving the slider': // gui.js:2745
        undefined,
    'Turbo mode': // gui.js:2749
        'Turbo na\u010Din',
    'uncheck to run scripts\nat normal speed': // gui.js:2752
        'odzna\u010Di za normalni prioritet izvr\u0161avanja skripti',
    'check to prioritize\nscript execution': // gui.js:2753
        'ozna\u010Di da da\u0161 prioritet izvr\u0161avanju skripti',
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
        'Zamagljene sjene',
    'uncheck to use solid drop\nshadows and highlights': // gui.js:2787
        'odzna\u010Di za \u010Dvrste\nsjene i osvjetljenja',
    'check to use blurred drop\nshadows and highlights': // gui.js:2788
        'ozna\u010Di za zamagljene\nsjene i osvjetljenja',
    'Zebra coloring': // gui.js:2792
        'Zebra boje',
    'uncheck to disable alternating\ncolors for nested block': // gui.js:2795
        'odzna\u010Di da ne nijansiram\nboje ugnje\u017E\u0111enih blokova',
    'check to enable alternating\ncolors for nested blocks': // gui.js:2796
        'ozna\u010Di za nijansiranje\nboja ugnje\u017E\u0111enih blokova',
    'Dynamic input labels': // gui.js:2800
        'Dinami\u010Dke oznake parametara',
    'uncheck to disable dynamic\nlabels for variadic inputs': // gui.js:2803
        'odzna\u010Di za isklju\u010Diti\ndinami\u010Dke oznake',
    'check to enable dynamic\nlabels for variadic inputs': // gui.js:2804
        'ozna\u010Di za omogu\u0107iti\ndinami\u010Dke oznake',
    'Prefer empty slot drops': // gui.js:2808
        'Preferiraj spu\u0161tanje u prazne utore',
    'uncheck to allow dropped\nreporters to kick out others': // gui.js:2811
        'odzna\u010Di za to da ispu\u0161tene\nvrijednosti izbacuju druge',
    'check to focus on empty slots\nwhen dragging & dropping reporters': // gui.js:2812
        'uklju\u010Di da se blokovi radije\nspu\u0161taju na slobodna mjesta pri postavljanju',
    'Long form input dialog': // gui.js:2816
        'Du\u017Ei dijalog parametara',
    'uncheck to use the input\ndialog in short form': // gui.js:2819
        'odzna\u010Di za kratke dijaloge parametara',
    'check to always show slot\ntypes in the input dialog': // gui.js:2820
        'ozna\u010Di da bi uvijek pokazao\nsve opcije u dijalogu\nparametara',
    'Plain prototype labels': // gui.js:2823
        'Ozna\u010Davanje blokova',
    'uncheck to always show (+) symbols\nin block prototype labels': // gui.js:2826
        'odzna\u010Di za uvijek prikazati (+) simbol\nu oznakama novih blokova',
    'check to hide (+) symbols\nin block prototype labels': // gui.js:2827
        'ozna\u010Di za sakriti (+) simbol\nu oznakama novih blokova',
    'Virtual keyboard': // gui.js:2830
        'Virtualna tipkovnica',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices': // gui.js:2833
        'odzna\u010Di da se\nne koristi virtualna\ntipkovnica za mobilne ure\u0111aje',
    'check to enable\nvirtual keyboard support\nfor mobile devices': // gui.js:2834
        'ozna\u010Di da se\nmo\u017Ee koristiti virtualna\ntipkovnica za mobilne ure\u0111aje',
    'Clicking sound': // gui.js:2838
        'Zvuk klikanja',
    'uncheck to turn\nblock clicking\nsound off': // gui.js:2848
        'odzna\u010Di da\nisklju\u010Di\u0161 zvuk\nklikanja bloka',
    'check to turn\nblock clicking\nsound on': // gui.js:2849
        'ozna\u010Di da\nuklju\u010Di\u0161 zvuk\nklikanja bloka',
    'Animations': // gui.js:2852
        'Animacije',
    'uncheck to disable\nIDE animations': // gui.js:2855
        'odzna\u010Di da onemogu\u0107i\u0161 IDE-\nanimacije',
    'check to enable\nIDE animations': // gui.js:2856
        'ozna\u010Di da se omogu\u0107i\u0161 IDE-\nanimacije',
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
        'Flat design',
    'uncheck for default\nGUI design': // gui.js:2890
        undefined,
    'check for alternative\nGUI design': // gui.js:2891
        undefined,
    'Nested auto-wrapping': // gui.js:2895
        'Automatsko ugnje\u017E\u0111ivanje',
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
        'Ugnje\u017E\u0111ivanje objekata',
    'uncheck to disable\nsprite composition': // gui.js:2932
        'odzna\u010Dite da onemogu\u0107ite\nkombiniranje objekata',
    'check to enable\nsprite composition': // gui.js:2933
        undefined,
    'First-Class Sprites': // gui.js:2937
        undefined,
    'uncheck to disable support\nfor first-class sprites': // gui.js:2946
        undefined,
    'check to enable support\nfor first-class sprite': // gui.js:2947
        undefined,
    'Keyboard Editing': // gui.js:2951
        'Ure\u0111ivanje tipkovnicom',
    'uncheck to disable\nkeyboard editing support': // gui.js:2963
        undefined,
    'check to enable\nkeyboard editing support': // gui.js:2964
        undefined,
    'Table support': // gui.js:2968
        'Podr\u0161ka za tablice',
    'uncheck to disable\nmulti-column list views': // gui.js:2979
        undefined,
    'check for multi-column\nlist view support': // gui.js:2980
        undefined,
    'Table lines': // gui.js:2985
        'Linije tablica',
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
        'Skripte - vi\u0161estrukost',
    'uncheck to allow\nscript reentrance': // gui.js:3035
        'odzna\u010Di da dopusti\u0161\nvi\u0161ekratni poziv skripti',
    'check to disallow\nscript reentrance': // gui.js:3036
        'ozna\u010Di da zabrani\u0161\nvi\u0161ekratni poziv skripti',
    'Prefer smooth animations': // gui.js:3039
        'Preferiraj glatke animacije',
    'uncheck for greater speed\nat variable frame rates': // gui.js:3042
        'odzna\u010Di za ve\u0107u brzinu kod\npromjenljive frekvencije osvje\u017Eavanja',
    'check for smooth, predictable\nanimations across computers': // gui.js:3043
        'ozna\u010Di za glatke, predvidive animacije na raznim ra\u010Dunalima',
    'Flat line ends': // gui.js:3047
        'Ravni zavr\u0161eci linija',
    'uncheck for round ends of lines': // gui.js:3053
        'odzna\u010Di za zaobljene zavr\u0161etke linija',
    'check for flat ends of lines': // gui.js:3054
        'ozna\u010Di za ravne zavr\u0161etke linija',
    'Codification support': // gui.js:3057
        'Podr\u0161ka za kodiranje',
    'uncheck to disable\nblock to text mapping features': // gui.js:3066
        undefined,
    'check for block\nto text mapping features': // gui.js:3067
        'ozna\u010Di za pretvaranje\nblokova u kod',
    'Inheritance support': // gui.js:3071
        'Podr\u017Ei naslje\u0111ivanje',
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
        'Napomene o projektu',
    'New': // gui.js:3109
        'Novi',
    'Open': // gui.js:3110 gui.js:5924
        'Otvori',
    'Save': // gui.js:3111 gui.js:5927 gui.js:8995 gui.js:9133
        'Spremi',
    'Save As': // gui.js:3112
        'Spremi kao',
    'Import': // gui.js:3115 gui.js:3370 gui.js:6842
        'Uvezi',
    'load an exported project file\nor block library, a costume\nor a sound': // gui.js:3146
        'uvoz izvezenog projekta tj.\nbiblioteke s blokovima, kostimima i/ili zvukovima',
    'Export project (in a new window)': // gui.js:3153
        undefined,
    'show project data as XML\nin a new browser window': // gui.js:3164
        'prikaz projekta u XML obliku\nu novom prozoru preglednika',
    'Export project as plain text': // gui.js:3170
        'Izvezi projekt kao obi\u010Dni tekst',
    'Export project': // gui.js:3171
        'Izvoz projekta',
    'save project data as XML\nto your downloads folder': // gui.js:3181
        undefined,
    'show global custom block definitions as XML\nin a new browser window': // gui.js:3189
        'prikaz globalnih definicija korisni\u010Dkih blokova u XML obliku\nu novom prozoru preglednika',
    'Unused blocks': // gui.js:3193
        'Nekori\u0161teni blokovi',
    'find unused global custom blocks\nand remove their definitions': // gui.js:3195
        'Napravljeni blokovi - nekori\u0161teni',
    'Export summary': // gui.js:3201
        'Izvezi sa\u017Eetak',
    'open a new browser browser window\nwith a summary of this project': // gui.js:3203
        'otvara novi prozor preglednika\nsa sa\u017Eetkom projekta',
    'Export summary with drop-shadows': // gui.js:3208
        undefined,
    'open a new browser browser window\nwith a summary of this project\nwith drop-shadows on all pictures.\nnot supported by all browsers': // gui.js:3210
        undefined,
    'Export all scripts as pic': // gui.js:3217
        'Izvezi sve skripte kao sliku',
    'show a picture of all scripts\nand block definitions': // gui.js:3219
        'poka\u017E \u017Ei sliku svih skripti\ni definicija blokova',
    'Import tools': // gui.js:3226
        'Uvezi alate',
    'load the official library of\npowerful blocks': // gui.js:3235
        'u\u010Ditaj slu\u017Ebenu biblioteku\ns naprednim blokovima',
    'Libraries': // gui.js:3238
        'Biblioteke',
    'select categories of additional blocks to add to this project': // gui.js:3248
        undefined,
    'Select a costume from the media library': // gui.js:3259
        undefined,
    'Select a sound from the media library': // gui.js:3266
        undefined,
    'Opening {{ resource }}': // gui.js:3341
        undefined,
    'License': // gui.js:3529 gui.js:3630
        'Licenca',
    'Contributors': // gui.js:3548
        'Doprinijeli',
    'current module versions': // gui.js:3574
        'Verzije u\u010Ditanih modula',
    'Translations': // gui.js:3578
        'Prijevodi',
    'About Snap': // gui.js:3581
        'O Snap-u',
    'Translators': // gui.js:3597
        'Prevoditelji',
    'Back': // gui.js:3613
        'Natrag',
    'Modules': // gui.js:3646
        'Moduli',
    'Credits': // gui.js:3662
        'Suradnici',
    'Project Notes': // gui.js:3709
        'Napomene o projektu',
    'Saving': // gui.js:3770
        undefined,
    'Saved': // gui.js:3788 gui.js:3796
        'Spremljeno',
    'Save failed': // gui.js:3790
        undefined,
    'Exporting': // gui.js:3811 gui.js:5464 gui.js:5493 gui.js:5503 gui.js:5521 gui.js:5533
        undefined,
    'Exported': // gui.js:3816 gui.js:5471 gui.js:5497 gui.js:5507 gui.js:5527 gui.js:5539
        undefined,
    'Export failed': // gui.js:3819 gui.js:5475 gui.js:5500 gui.js:5530
        undefined,
    'this project doesn\'t have any\ncustom global blocks yet': // gui.js:3836
        'ovaj projekt nema jo\u0161 nijedan korisni\u010Dki globalni blok',
    'there are currently no unused\nglobal custom blocks in this project': // gui.js:3873
        'nema nekori\u0161tenih blokova\nu ovom projektu',
    'Untitled': // gui.js:3937 gui.js:8190 store.js:368 store.js:1651
        'Bez imena',
    'Variables': // gui.js:3968 objects.js:153
        'Varijable',
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
        'Zamijeniti trenutni projekt s novim?',
    'New Project': // gui.js:4915
        'Novi projekt',
    'Generating {{ filename }} file': // gui.js:5011
        undefined,
    'Could not generate the language file': // gui.js:5039
        undefined,
    'build': // gui.js:5057
        'napravi',
    'your own': // gui.js:5060
        'svoje vlastite',
    'blocks': // gui.js:5064
        'blokove',
    'normal (1x)': // gui.js:5106
        'normal (1x)',
    'demo (1.2x)': // gui.js:5107
        'demo (1.2x)',
    'presentation (1.4x)': // gui.js:5108
        'prezentacija (1.4x)',
    'big (2x)': // gui.js:5109
        'velik (2x)',
    'huge (4x)': // gui.js:5110
        'ogroman (4x)',
    'giant (8x)': // gui.js:5111
        'gigantski (8x)',
    'monstrous (10x)': // gui.js:5112
        'monstruozni (10x)',
    'Stage width': // gui.js:5166
        '\u0160irina scene',
    'Stage height': // gui.js:5167
        'Visina scene',
    '{{ count }} days left': // gui.js:5253
        undefined,
    'You are now logged in, and your account\nis enabled for three days.\nPlease use the verification link that\nwas sent to your email address when you\nsigned up.\n\nIf you cannot find that email, please\ncheck your spam folder. If you still\ncannot find it, please use the "Resend\nVerification Email..." option in the cloud\nmenu.\n\nYou have {{ count }} days left.': // gui.js:5254
        undefined,
    'Sign in': // gui.js:5277
        'Prijava',
    'stay signed in on this computer\nuntil logging out': // gui.js:5283
        'ostani prijavljen na\nra\u010Dunalu do odjave',
    'You can now log in': // gui.js:5305
        undefined,
    'Sign up': // gui.js:5314
        'Registracija',
    'Terms of Service': // gui.js:5317
        'Uvjeti kori\u0161tenja',
    'Privacy': // gui.js:5319
        'Privatnost',
    'I have read and agree\nto the Terms of Service': // gui.js:5320
        'Pro\u010Ditao/la sam i sla\u017Eem se\ns uvjetima kori\u0161tenja',
    'An e-mail with a link to\nreset your password\nhas been sent to the address provided': // gui.js:5340
        undefined,
    'Reset password': // gui.js:5352
        'Obnova zaporke',
    'An e-mail with a link to\nverify your account\nhas been sent to the address provided': // gui.js:5378
        undefined,
    'Resend verification email': // gui.js:5390
        undefined,
    'password has been changed': // gui.js:5414
        undefined,
    'disconnected': // gui.js:5437 gui.js:5440
        'odspojen',
    'Saving project\nto the cloud': // gui.js:5448 gui.js:6476
        'Spremanje projekta\nu oblak',
    'saved': // gui.js:5452 gui.js:6481
        'spremljeno',
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
        'Otvori projekt',
    'Cloud': // gui.js:5836
        'Oblak',
    'Browser': // gui.js:5837
        'Preglednik',
    'Examples': // gui.js:5840 gui.js:6198 gui.js:6254 gui.js:6378
        'Primjeri',
    'Share': // gui.js:5930
        'Dijeli',
    'Unshare': // gui.js:5931
        undefined,
    '(no matches)': // gui.js:6095
        undefined,
    'Updating\nproject list': // gui.js:6119
        'Osvje\u017Eavam\nlistu projekata',
    'last changed\n{{ date }}': // gui.js:6314
        'zadnja promjena\n{{ date }}',
    'Are you sure you want to replace\n"{{ projectName }}"?': // gui.js:6436 gui.js:6454
        undefined,
    'Replace Project': // gui.js:6438 gui.js:6456
        undefined,
    'Are you sure you want to delete\n"{{ projectName }}"?': // gui.js:6498 gui.js:6522
        'Jesi siguran da \u017Eeli\u0161 izbrisati?\n"{{ projectName }}"?',
    'Delete Project': // gui.js:6500 gui.js:6524
        'Izbrisati projekt',
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
        'Uvezi bibloteku',
    'Loading {{ resource }}': // gui.js:6926 gui.js:7059
        undefined,
    'Imported {{ resource }}': // gui.js:7054
        undefined,
    'pic': // gui.js:7353 morphic.js:4194 objects.js:7425
        'slikaj',
    'open a new window\nwith a picture of the stage': // gui.js:7361 objects.js:7432
        'otvori novi prozor\nsa slikom scene',
    'show': // gui.js:7366 morphic.js:7568 objects.js:388
        'poka\u017Ei',
    'clone': // gui.js:7370 objects.js:3238
        undefined,
    'release': // gui.js:7388
        undefined,
    'make temporary and\nhide in the sprite corral': // gui.js:7390
        undefined,
    'detach from {{ name }}': // gui.js:7396 objects.js:3266
        'odlijepi od {{ name }}',
    'detach all parts': // gui.js:7402 objects.js:3271
        'odlijepi sve dijelove',
    'export': // gui.js:7406 gui.js:7713 objects.js:3273 objects.js:9542
        'izvezi',
    'edit rotation point only': // gui.js:7702
        undefined,
    'rename costume': // gui.js:7755
        'preimenuj kostim',
    'rename background': // gui.js:7756
        undefined,
    'default': // gui.js:7893
        undefined,
    'pen': // gui.js:7975 morphic.js:12402
        'pero',
    'tip': // gui.js:7982
        'vrh',
    'middle': // gui.js:7991
        'sredina',
    'Paint a new costume': // gui.js:8085
        'nacrtaj novi kostim',
    'Import a new costume from your webcam': // gui.js:8110
        undefined,
    'import a picture from another web page or from\na file on your computer by dropping it here': // gui.js:8134
        'Slike uvozi\u0161 povla\u010Denjem s druge\nweb stranice ili s ra\u010Dunala',
    'Stop': // gui.js:8345 gui.js:8367
        'Zaustavi',
    'Play': // gui.js:8345 gui.js:8375
        'Sviraj',
    'Play sound': // gui.js:8348 gui.js:8376
        'Sviraj zvuk',
    'Stop sound': // gui.js:8368
        'Zaustavi zvuk',
    'rename sound': // gui.js:8432
        'preimenuj zvuk',
    'import a sound from your computer\nby dragging it into here': // gui.js:8526
        'Zvuk uvozi\u0161 tako, da ga povu\u010De\u0161 ovdje',
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
        'duljina',
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
        'pomakni',
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
        '(prazno)',
    'Are you sure you want to leave?': // morphic.js:12110
        undefined,
    'demo': // morphic.js:12173
        undefined,
    'sample morphs': // morphic.js:12173
        undefined,
    'hide all': // morphic.js:12175
        undefined,
    'show all': // morphic.js:12176 objects.js:7423
        'poka\u017Ei sve',
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
        'pravokutnik',
    'box': // morphic.js:12270
        undefined,
    'circle box': // morphic.js:12273
        undefined,
    'slider': // morphic.js:12277 objects.js:9461
        'kliza\u010D',
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
        'Kretanje',
    'Control': // objects.js:147
        'Upravljanje',
    'Looks': // objects.js:148
        'Izgled',
    'Sensing': // objects.js:149
        'Osjetila',
    'Sound': // objects.js:150 objects.js:8570
        'Zvuk',
    'Operators': // objects.js:151
        'Operatori',
    'Pen': // objects.js:152
        'Olovka',
    'Lists': // objects.js:154
        'Liste',
    'Other': // objects.js:155
        'Ostalo',
    'move %n steps': // objects.js:201
        'pomak %n koraka',
    'turn %clockwise %n degrees': // objects.js:208
        'okreni se %clockwise %n stupnjeva',
    'turn %counterclockwise %n degrees': // objects.js:215
        'okreni se %counterclockwise %n stupnjeva',
    'point in direction %dir': // objects.js:222
        'okreni se u smjeru %dir',
    'point towards %dst': // objects.js:228
        'okreni se prema %dst',
    'go to x: %n y: %n': // objects.js:234
        'kreni na x: %n y: %n',
    'go to %dst': // objects.js:241
        'kreni na %dst',
    'glide %n secs to x: %n y: %n': // objects.js:247
        'kli\u017Ei %n s do x: %n y: %n',
    'change x by %n': // objects.js:254
        'promijeni x za %n',
    'set x to %n': // objects.js:261
        'postavi x na %n',
    'change y by %n': // objects.js:268
        'promijeni y za %n',
    'set y to %n': // objects.js:275
        'postavi y na %n',
    'if on edge, bounce': // objects.js:282
        'kad bude\u0161 na rubu, odbij se',
    'switch to costume %cst': // objects.js:307
        'prebaci na kostim %cst',
    'next costume': // objects.js:312
        'idu\u0107i kostim',
    'say %s for %n secs': // objects.js:323
        'reci %s tokom %n s',
    'Hello!': // objects.js:324 objects.js:331
        'Pozdrav!',
    'say %s': // objects.js:330
        'reci %s',
    'think %s for %n secs': // objects.js:337
        'razmi\u0161ljaj %s tokom %n s',
    'Hmm': // objects.js:338 objects.js:345
        'Hmm',
    'think %s': // objects.js:344
        'razmi\u0161ljaj %s',
    'change %eff effect by %n': // objects.js:350
        'promijeni efekt %eff za %n',
    'set %eff effect to %n': // objects.js:356
        'postavi efekt %eff na %n',
    'clear graphic effects': // objects.js:362
        'isklju\u010Di grafi\u010Dke efekte',
    'change size by %n': // objects.js:368
        'promijeni veli\u010Dinu za %n',
    'set size to %n %': // objects.js:375
        'postavi veli\u010Dinu na %n %',
    'go to front': // objects.js:400
        'prebaci u prednji plan',
    'go back %n layers': // objects.js:406
        'idi natrag %n slojeva',
    'save %imgsource as costume named %s': // objects.js:412
        undefined,
    'wardrobe': // objects.js:421
        undefined,
    'alert %mult%s': // objects.js:428
        'upozorenje: %mult%s',
    'console log %mult%s': // objects.js:434
        'ispi\u0161i na konzolu %mult%s',
    'play sound %snd': // objects.js:441
        'odsviraj zvuk %snd',
    'play sound %snd until done': // objects.js:446
        'odsviraj zvuk %snd do kraja',
    'stop all sounds': // objects.js:451
        'zaustavi sve zvukove',
    'rest for %n beats': // objects.js:456
        'sviraj pauzu tokom %n udaraca',
    'play note %note for %n beats': // objects.js:462
        undefined,
    'set instrument to %inst': // objects.js:468
        undefined,
    'change tempo by %n': // objects.js:474
        'promijeni tempo za %n',
    'set tempo to %n bpm': // objects.js:480
        'postavi tempo na %n udar./min.',
    'tempo': // objects.js:486
        'Tempo',
    'jukebox': // objects.js:494
        undefined,
    'clear': // objects.js:501 paint.js:230
        'obri\u0161i',
    'pen down': // objects.js:507
        'olovku pritisni',
    'pen up': // objects.js:513
        'olovku digni',
    'set pen color to %clr': // objects.js:519
        'boja olovke %clr',
    'change pen color by %n': // objects.js:525
        'promijeni boju olovke za %n',
    'set pen color to %n': // objects.js:532
        'boja olovke %n',
    'change pen shade by %n': // objects.js:539
        'promijeni sjenu olovke za %n',
    'set pen shade to %n': // objects.js:546
        'sjena olovke %n',
    'change pen size by %n': // objects.js:553
        'promijeni veli\u010Dinu olovke za %n',
    'set pen size to %n': // objects.js:560
        'veli\u010Dina olovke %n',
    'stamp': // objects.js:567
        'pe\u010Dat',
    'fill': // objects.js:573
        undefined,
    'when %greenflag clicked': // objects.js:585
        'kad kliknem na %greenflag',
    'when %keyHat key pressed': // objects.js:590
        'kad pritisnem tipku %keyHat',
    'when I am %interaction': // objects.js:595
        'kad me %interaction',
    'when I receive %msgHat': // objects.js:601
        'kad spazim doga\u0111aj %msgHat',
    'when %b': // objects.js:606
        undefined,
    'broadcast %msg': // objects.js:611
        'objavljujem doga\u0111aj %msg',
    'broadcast %msg and wait': // objects.js:616
        'objavljujem doga\u0111aj %msg i \u010Dekam',
    'message': // objects.js:621
        'doga\u0111aj',
    'wait %n secs': // objects.js:626
        '\u010Dekam %n s',
    'wait until %b': // objects.js:632
        '\u010Dekam dok ne bude %b',
    'forever %c': // objects.js:637
        'zauvijek %c',
    'repeat %n %c': // objects.js:642
        'ponavljaj %n %c',
    'repeat until %b %c': // objects.js:648
        'ponavljaj dok ne bude %b %c',
    'if %b %c': // objects.js:653
        'ako %b %c',
    'if %b %c else %c': // objects.js:658
        'ako %b %c ina\u010De %c',
    'stop %stopChoices': // objects.js:678
        'zaustavi %stopChoices',
    'run %cmdRing %inputs': // objects.js:693
        'pokreni %cmdRing %inputs',
    'launch %cmdRing %inputs': // objects.js:698
        'startaj %cmdRing %inputs',
    'call %repRing %inputs': // objects.js:703
        'pozovi %repRing %inputs',
    'report %s': // objects.js:708
        'vrati vrijednost ili tvrdnju %s',
    'run %cmdRing w/continuation': // objects.js:720
        'pokreni %cmdRing s nastavkom',
    'call %cmdRing w/continuation': // objects.js:725
        'pozovi %cmdRing s nastavkom',
    'warp %c': // objects.js:730
        'warp %c',
    'tell %spr to %cmdRing %inputs': // objects.js:739
        undefined,
    'ask %spr for %repRing %inputs': // objects.js:744
        undefined,
    'when I start as a clone': // objects.js:752
        'kad startam kao klon',
    'create a clone of %cln': // objects.js:757
        'stvori klona od %cln',
    'a new clone of %cln': // objects.js:762
        undefined,
    'delete this clone': // objects.js:768
        'obri\u0161i ovog klona',
    'pause all %pause': // objects.js:776
        'pauziraj sve %pause',
    'touching %col ?': // objects.js:785
        'dodiruje %col ?',
    'touching %clr ?': // objects.js:791
        'dodiruje %clr ?',
    'color %clr is touching %clr ?': // objects.js:797
        'boja %clr dodiruje %clr ?',
    'filtered for %clr': // objects.js:803
        'filtrirano za %clr',
    'stack size': // objects.js:809
        'veli\u010Dina stoga',
    'frames': // objects.js:815
        'sli\u010Dice',
    'processes': // objects.js:821
        undefined,
    'ask %s and wait': // objects.js:826
        'pitaj %s i \u010Dekaj',
    'what\'s your name?': // objects.js:827
        'kako ti je ime?',
    'answer': // objects.js:833 objects.js:838
        'odgovor',
    'mouse x': // objects.js:843
        'x polo\u017Eaj mi\u0161a',
    'mouse y': // objects.js:848
        'y polo\u017Eaj mi\u0161a',
    'mouse down?': // objects.js:853
        'gumb mi\u0161a pritisnut?',
    'key %key pressed?': // objects.js:858
        'tipka %key pritisnuta?',
    '%rel to %dst': // objects.js:871
        undefined,
    'reset timer': // objects.js:877
        'resetiraj timer',
    'timer': // objects.js:883 objects.js:888
        'timer',
    '%att of %spr': // objects.js:893
        '%att od %spr',
    'url %s': // objects.js:899
        undefined,
    'turbo mode?': // objects.js:905
        'turbo na\u010Din?',
    'set turbo mode to %b': // objects.js:910
        'postavi turbo na\u010Din na %b',
    'current %dates': // objects.js:915
        'trenutni %dates',
    'my %get': // objects.js:920
        undefined,
    'round %n': // objects.js:968
        'round %n',
    '%fun of %n': // objects.js:973
        '%fun od %n',
    '%n mod %n': // objects.js:979
        '%n modul %n',
    'pick random %n to %n': // objects.js:984
        'slu\u010Dajni broj od %n do %n',
    '%b and %b': // objects.js:1005
        '%b i %b',
    '%b or %b': // objects.js:1010
        '%b ili %b',
    'not %b': // objects.js:1015
        'ne %b',
    'join %words': // objects.js:1033
        'spoji %words',
    'hello': // objects.js:1034 objects.js:1075
        'pozdrav',
    'world': // objects.js:1034 objects.js:1040 objects.js:1046 objects.js:1075
        'svijet',
    'letter %n of %s': // objects.js:1039
        'znak %n od %s',
    'length of %s': // objects.js:1045
        'duljina od %s',
    'unicode of %s': // objects.js:1051
        'unicode vrijednost od %s',
    'unicode %n as letter': // objects.js:1057
        'unicode %n kao znak',
    'is %s a %typ ?': // objects.js:1063
        'da li je %s tipa %typ ?',
    'is %s identical to %s ?': // objects.js:1069
        'da li je %s isti kao %s ?',
    'split %s by %delim': // objects.js:1074
        'razdvoji %s kod %delim',
    'JavaScript function ( %mult%s ) { %code }': // objects.js:1080
        undefined,
    'type of %s': // objects.js:1086
        'tip od %s',
    '%txtfun of %s': // objects.js:1093
        undefined,
    'compile %repRing': // objects.js:1099
        undefined,
    'set %var to %s': // objects.js:1119
        'postavi %var na %s',
    'change %var by %n': // objects.js:1125
        'promijeni varijablu %var za %n',
    'show variable %var': // objects.js:1131
        'prika\u017Ei varijablu %var',
    'hide variable %var': // objects.js:1136
        'sakrij varijablu %var',
    'script variables %scriptVars': // objects.js:1141
        'skriptna varijabla %scriptVars',
    'inherit %shd': // objects.js:1148
        undefined,
    'list %exp': // objects.js:1155
        'lista %exp',
    '%s in front of %l': // objects.js:1160
        '%s ispred %l',
    'item %idx of %l': // objects.js:1165
        'element %idx liste %l',
    'all but first of %l': // objects.js:1171
        'svi osim prvog iz liste %l',
    'length of %l': // objects.js:1176
        'duljina liste %l',
    '%l contains %s': // objects.js:1181
        'lista %l sadr\u017Ei %s',
    'thing': // objects.js:1182 objects.js:1188 objects.js:1200 objects.js:1206
        'stvar',
    'add %s to %l': // objects.js:1187
        'dodaj %s na listu %l',
    'delete %ida of %l': // objects.js:1193
        'obri\u0161i %ida iz liste %l',
    'insert %s at %idx of %l': // objects.js:1199
        'ubaci %s na %idx mjesto liste %l',
    'replace item %idx of %l with %s': // objects.js:1205
        'zamijeni %idx element liste %l sa %s',
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
        'Objekt',
    'that name is already in use': // objects.js:1859 objects.js:7047
        undefined,
    'development mode\ndebugging primitives': // objects.js:1932 objects.js:2089 objects.js:2155 objects.js:2268 objects.js:7085 objects.js:7214 objects.js:7280 objects.js:7376
        'razvojni na\u010Din\ndebagiranje osnovnih blokova',
    'Make a variable': // objects.js:2184 objects.js:7309
        'Napravi varijablu',
    'Delete a variable': // objects.js:2205 objects.js:7327
        'Obri\u0161i varijablu',
    'find blocks': // objects.js:2398 objects.js:2469
        'na\u0111i blokove',
    'hide primitives': // objects.js:2476
        'sakrij osnovne blokove',
    'show primitives': // objects.js:2494
        'poka\u017Ei osnovne blokove',
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
        'Scena',
    'stop': // objects.js:6770 costumes/COSTUMES:486
        undefined,
    'terminate all running threads': // objects.js:6774
        undefined,
    'Stage selected:\nno motion primitives': // objects.js:7060
        'Scena je izabrana: \n- bez blokova kretanja',
    'turn all pen trails and stamps\ninto a new costume for the\ncurrently selected sprite': // objects.js:7445
        'pretvori sve tragove olovke\ni \u017Eigove u novi kostim\nza trenutni objekt',
    'turn all pen trails and stamps\ninto a new background for the stage': // objects.js:7447
        undefined,
    'Background': // objects.js:7817
        undefined,
    'a {{ className }}({{ name }})': // objects.js:8096
        undefined,
    'click or drag crosshairs to move the rotation center': // objects.js:8296
        'Klikni ili povuci kri\u017Ei\u0107 za promjenu centra rotacije',
    'Costume Editor': // objects.js:8308
        'Ure\u0111iva\u010D kostima',
    'an {{ className }}({{ name }})': // objects.js:8395
        undefined,
    'Web Audio API is not supported\nin this browser': // objects.js:8629
        undefined,
    'normal': // objects.js:9452
        'normalno',
    'large': // objects.js:9456
        'veliko',
    'slider min': // objects.js:9466
        'kliza\u010D min',
    'slider max': // objects.js:9470
        'kliza\u010D max',
    'import': // objects.js:9475
        'uvezi',
    'Unable to import': // objects.js:9501
        undefined,
    '{{ appName }} can only import "text" files.\nYou selected a file of type "{{ type }}".': // objects.js:9502
        undefined,
    'Slider minimum value': // objects.js:9588
        'Minimalna vrijednost kliza\u010Da',
    'Slider maximum value': // objects.js:9604
        'Maksimalna vrijednost kliza\u010Da',
    'Paint Editor': // paint.js:111
        'Ure\u0111iva\u010D slika',
    'Paintbrush tool\n(free draw)': // paint.js:172
        'Olovka\n(slobodno crtanje)',
    'Stroked Rectangle\n(shift: square)': // paint.js:174
        'Pravokutnik\n(shift: kvadrat)',
    'Stroked Ellipse\n(shift: circle)': // paint.js:176
        'Elipsa\n(shift: krug)',
    'Eraser tool': // paint.js:178
        'Brisalica\n(gumica)',
    'Set the rotation center': // paint.js:180
        'Postavi centar rotacije',
    'Line tool\n(shift: vertical/horizontal)': // paint.js:183
        'L\u00EDnije\n(shift: okomite/vodoravne)',
    'Filled Rectangle\n(shift: square)': // paint.js:185
        'Ispunjeni pravokutnik\n(shift: kvadrat)',
    'Filled Ellipse\n(shift: circle)': // paint.js:187
        'Ispunjena elipsa\n(shift: krug)',
    'Fill a region': // paint.js:189
        'Ispuna podru\u010Dja',
    'Pipette tool\n(pick a color anywhere)': // paint.js:191
        'Kapaljka\n(pokupit \u0107e uzorak boje)',
    'undo': // paint.js:225
        'poni\u0161ti',
    'grow': // paint.js:239
        've\u0107e',
    'shrink': // paint.js:243
        'manje',
    'flip \u2194': // paint.js:247
        'izvrni \u2194',
    'flip \u2195': // paint.js:251
        'izvrni \u2195',
    'Constrain proportions of shapes?\n(you can also hold shift)': // paint.js:407
        'Odr\u017Eati proporcije?\n(mo\u017Eete i dr\u017Eati shift)',
    'Brush size': // paint.js:413
        'Veli\u010Dina olovke',
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
        'kvadrat',
    'pointRight': // symbols.js:86
        'pointRight',
    'stepForward': // symbols.js:87
        undefined,
    'gears': // symbols.js:88
        'gears',
    'file': // symbols.js:89
        'file',
    'fullScreen': // symbols.js:90
        'pun ekran',
    'normalScreen': // symbols.js:91
        'normal ekran',
    'smallStage': // symbols.js:92
        'mala scena',
    'normalStage': // symbols.js:93
        'normal scena',
    'turtle': // symbols.js:94
        'objekt',
    'turtleOutline': // symbols.js:96
        'obris objekta',
    'pause': // symbols.js:97
        'pauza',
    'flag': // symbols.js:98
        'zastava',
    'octagon': // symbols.js:99
        'oktogon',
    'cloud': // symbols.js:100 costumes/COSTUMES:170
        'oblak',
    'cloudOutline': // symbols.js:101
        'obris oblaka',
    'cloudGradient': // symbols.js:102
        'gradijent oblaka',
    'turnRight': // symbols.js:103
        'okreni desno',
    'turnLeft': // symbols.js:104
        'okreni lijevo',
    'storage': // symbols.js:105
        'pohrana',
    'poster': // symbols.js:106
        'poster',
    'flash': // symbols.js:107
        'flash',
    'brush': // symbols.js:108
        'olovka',
    'rectangleSolid': // symbols.js:110
        'ispunjeni pravokutnik',
    'circle': // symbols.js:111
        'krug',
    'circleSolid': // symbols.js:112
        'ispunjeni krug',
    'cross': // symbols.js:114
        undefined,
    'crosshairs': // symbols.js:115
        'kri\u017Ei\u0107',
    'paintbucket': // symbols.js:116
        'kanta s bojom',
    'eraser': // symbols.js:117
        'brisalica\n(gumica)',
    'pipette': // symbols.js:118
        'kapaljka',
    'speechBubble': // symbols.js:119
        'balon\u010Di\u0107 teksta',
    'speechBubbleOutline': // symbols.js:120
        'obris balon\u010Di\u0107a teksta',
    'turnBack': // symbols.js:121
        undefined,
    'turnForward': // symbols.js:122
        undefined,
    'arrowUp': // symbols.js:123
        'strelica gore',
    'arrowUpOutline': // symbols.js:124
        'obris strelice gore',
    'arrowLeft': // symbols.js:125
        'strelica lijevo',
    'arrowLeftOutline': // symbols.js:126
        'obris strelice lijevo',
    'arrowDown': // symbols.js:127
        'strelica dolje',
    'arrowDownOutline': // symbols.js:128
        'obris strelice dolje',
    'arrowRight': // symbols.js:129
        'strelica desno',
    'arrowRightOutline': // symbols.js:130
        'obris strelice desno',
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
        'Da',
    'No': // widgets.js:1608
        'Ne',
    'Default': // widgets.js:1882
        'Default',
    '{{ year }} or before': // widgets.js:2024
        '{{ year }} ili prije',
    'User name': // widgets.js:2054 widgets.js:2059 widgets.js:2092
        'Korisni\u010Dko ime',
    'Birth date': // widgets.js:2061
        'Datum ro\u0111enja',
    'Password': // widgets.js:2071 widgets.js:2078
        'Zaporka',
    'Repeat Password': // widgets.js:2073
        undefined,
    'Old password': // widgets.js:2083
        'Stara zaporka',
    'New password': // widgets.js:2085
        'Nova zaporka',
    'Repeat new password': // widgets.js:2087
        'Ponovi novu zaporku',
    'please fill out\nthis field': // widgets.js:2196
        'molimo ispunite\novo polje',
    'User name must be four\ncharacters or longer': // widgets.js:2201
        'Korisni\u010Dko ime mora\nimati vi\u0161e od 4 znaka',
    'please provide a valid\nemail address': // widgets.js:2206
        'molimo upi\u0161ite\nva\u017Ee\u0107u e-mail adresu',
    'password must be six\ncharacters or longer': // widgets.js:2212
        'zaporka mora imati\n6 znakova ili vi\u0161e',
    'passwords do\nnot match': // widgets.js:2216
        'zaporke se\nne podudaraju',
    'please agree to\nthe TOS': // widgets.js:2222
        'molimo prihvatite\nuvjete',
    'E-mail address of parent or guardian': // widgets.js:2258
        'E-mail adresa roditelja ili staratelja',
    'E-mail address': // widgets.js:2259
        'E-mail adresa',
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
SnapTranslator.dict.hr.deprecated = {
    'add a new sprite':
        'dodaj novi objekt',
    'play note %n for %n beats':
        'sviraj notu %n tokom %n udaraca',
    'stop %stopOthersChoices':
        'zaustavi %stopOthersChoices',
    'distance to %dst':
        'udaljenost do %dst',
    'http:// %s':
        'http:// %s',
    'Snap! website':
        'Snap! web stranica',
    'Save to disk':
        'Spremi na disk',
    'store this project\nin the downloads folder\n(in supporting browsers)':
        'spremi ovaj projekt u Download mapu(nije podr\u017Eano ba\u0161 kod svih preglednika)',
    'unused block(s) removed':
        'nekori\u0161tenih blokova izbrisano',
    'detach from':
        'odlijepi od',
    'Ok':
        'Ok',
    'Saved!':
        'Spremljeno!',
    'Are you sure you want to delete':
        'Jesi siguran da \u017Eeli\u0161 izbrisati?',
    'Save Project As':
        'Spremi projekt kao',
    'Single input.':
        'Jedan parametar.',
    'new':
        'novo',
    'Snap!Cloud':
        'Snap!Cloud',
    'could not connect to':
        'ne mo\u017Ee se spojiti na',
    'Service':
        'Servis',
    'login':
        'prijava',
    'ERROR: INVALID PASSWORD':
        'Gre\u0161ka: neva\u017Ee\u0107a zaporka',
    'Logout':
        'Odjava',
    'Account created.':
        'Ra\u010Dun je kreiran.',
    'An e-mail with your password\nhas been sent to the address provided':
        'E-mail sa zaporkom je\nposlan na upisanu adresu',
    'now connected.':
        'sad sam spojen.',
    'disconnected.':
        'odspojen.',
    'or before':
        'ili prije',
    'saved.':
        'spremljeno.',
    'Enter one option per line.Optionally use "=" as key/value delimiter\ne.g.\n   the answer=42':
        'Upi\u0161ite jednu opciju po liniji.\nKoristite "=" kao key/value delimiter\nnpr: odgovor=42',
    'turn pen trails into new costume':
        'pretvori trag olovke u novi kostim',
    'last changed':
        'zadnja promjena',
};
