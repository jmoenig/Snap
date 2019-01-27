/*

	lang-eo.js

	German translation for SNAP!

	written by Jens Mönig

	Copyright (C) 2012 by Jens Mönig

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
                'last value'
        }

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

SnapTranslator.dict.eo = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    Ĉ, ĉ   \u0108, \u0109
    Ĝ, ĝ   \u011c, \u011d
    Ĥ, ĥ   \u0124, \u0125
    Ĵ, ĵ   \u0134, \u0135
    Ŝ, ŝ   \u015c, \u015d
    Ŭ, ŭ   \u016c, \u016d
*/

    // translations meta information
    'language_name':
        'Esperanto',
    'language_translator':
        'Sebastian CYPRYCH',
    'translator_e-mail':
        'sebacyp(heliko)gmail(punkto)com',
    'last_changed':
        '2017-10-01',

    // GUI
    // control bar:
    'untitled':
        'sentitola',
    'development mode':
        'programada re\u011dimo',

    // categories:
    'Motion':
        'Movo',
    'Looks':
        'Aspekto',
    'Sound':
        'Sono',
    'Pen':
        'Skribilo',
    'Control':
        'Regado',
    'Sensing':
        'Sentado',
    'Operators':
        'Operatoroj',
    'Variables':
        'Variabloj',
    'Lists':
        'Listoj',
    'Other':
        'Aliaj',

    // editor:
    'draggable':
        'trenebla',

    // tabs:
    'Scripts':
        'Skriptoj',
    'Costumes':
        'Kost\u00fcme',
    'Backgrounds':
        'Fonoj',
    'Sounds':
        'Sonoj',

    // names:
    'Sprite':
        'Objekto',
    'Stage':
        'Scenejo',

    // rotation styles:
    'don\'t rotate':
        'ne turnebla',
    'can rotate':
        'turnebla',
    'only face left/right':
        'nur maldekstren/dekstren',

    // new sprite button:
    'add a new sprite':
        'aldoni novan objekton',

    // tab help
    'costumes tab help':
        'trenu tien bildojn\nel aliaj retpa\u011doj a\u016d de via komputilo',
    'import a sound from your computer\nby dragging it into here':
        'importu sonon de via komputilo\ntrenante \u011din \u0109i tien',

    // primitive blocks:

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

    // motion:
    'Stage selected:\nno motion primitives':
        'Scenejo elektita:\nneniuj movaj bazelementoj',
    'move %n steps':
        'iri %n pa\u015dojn',
    'turn %clockwise %n degrees':
        'turni %n gradojn %clockwise',
    'turn %counterclockwise %n degrees':
        'turni %n gradojn %counterclockwise',
    'point in direction %dir':
        'celi la\u016d direkto %dir',
    'point towards %dst':
        'celi al %dst',
    'go to x: %n y: %n':
        'iri al x: %n y: %n',
    'go to %dst':
        'iri al %dst',
    'glide %n secs to x: %n y: %n':
        'gliti dum %n sek. al x: %n y: %n',
    'change x by %n':
        '\u015dan\u011di x je %n',
    'set x to %n':
        '\u015dan\u011di x al %n',
    'change y by %n':
        '\u015dan\u011di y je %n',
    'set y to %n':
        '\u015dan\u011di y al %n',
    'if on edge, bounce':
        'resalti de la rando',
    'x position':
        'x pozicio',
    'y position':
        'y pozicio',
    'direction':
        'direkto',

    // looks:
    'switch to costume %cst':
        '\u015dan\u011di al kostumo %cst',
    'next costume':
        'sekva kostumo',
    'costume #':
        'numero de kostumo',
    'say %s for %n secs':
        'diri %s dum %n sek.',
    'say %s':
        'diri %s',
    'think %s for %n secs':
        'pensi %s dum %n sek.',
    'think %s':
        'pensi %s',
    'Hello!':
        'Saluton!',
    'Hmm...':
        'Hmm...',
    'change %eff effect by %n':
        '\u015dan\u011di %eff efekton je %n',
    'set %eff effect to %n':
        '\u015dan\u011di efekton %eff al %n',
    'clear graphic effects':
        'forigi grafikajn efektojn',
    'change size by %n':
        '\u015dan\u011di grandecon je %n',
    'set size to %n %':
        '\u015dan\u011di grandecon al %n',
    'size':
        'grandeco',
    'show':
        'montri',
    'hide':
        'ka\u015di',
    'go to front':
        'iri anta\u016den',
    'go back %n layers':
        'iri %n tavolojn malanta\u016den',

    'development mode \ndebugging primitives:':
        'programada re\u011dimo \nsencimigadaj bazelementoj:',
    'console log %mult%s':
        'konzola protokolo: %mult%oj',
    'alert %mult%s':
        'averto %mult%oj',

    // sound:
    'play sound %snd':
        'a\u016ddigi sonon %snd',
    'play sound %snd until done':
        'a\u016ddigi sonon %snd \u011dis finite',
    'stop all sounds':
        'haltigi \u0109iujn sonojn',
    'rest for %n beats':
        'pa\u016dzi dum %n taktoj',
    'play note %n for %n beats':
        'a\u016ddigi noton %n dum %n taktoj',
    'change tempo by %n':
        '\u015dan\u011di rapidecon je %n',
    'set tempo to %n bpm':
        '\u015dan\u011di rapidecon al %n taktoj minute',
    'tempo':
        'tempo',

    // pen:
    'clear':
        'forigi desegna\u0135on',
    'pen down':
        'malsuprenigi skribilon',
    'pen up':
        'suprenigi skribilon',
    'set pen color to %clr':
        '\u015dan\u011di skribilokoloron al %clr',
    'change pen color by %n':
        '\u015dan\u011di skribilokoloron je %n',
    'set pen color to %n':
        '\u015dan\u011di skribilokoloron al %n',
    'change pen shade by %n':
        '\u015dan\u011di kolorombron je %n',
    'set pen shade to %n':
        '\u015dan\u011di kolorombron al %n',
    'change pen size by %n':
        '\u015dan\u011di skribilodikecon je %n',
    'set pen size to %n':
        '\u015dan\u011di skribilodikecon al %n',
    'stamp':
        'stemple',
    'fill':
        'plenigi',

    // control:
    'when %greenflag clicked':
        'Kiam %greenflag estas alklakita',
    'when %keyHat key pressed':
        'se %keyHat klavo estas premita',
    'when I am %interaction':
        'Dum mi estas %interaction',
    'clicked':
        'alklakita',
    'pressed':
        'premita',
    'dropped':
        'demetita',
    'mouse-entered':
        'tu\u015data de musa montrilo',
    'mouse-departed':
        'lasita de musa montrilo',
    'when %b':
        'kiam %b',
    'when I receive %msgHat':
        'Kiam mi ricevas %msgHat',
    'broadcast %msg':
        'elsendi %msg al \u0109iuj',
    'broadcast %msg and wait':
        'elsendi %msg al \u0109iuj kaj atendi',
    'Message name':
        'Mesa\u011donomo',
    'message':
        'mesa\u011do',
    'any message':
        'iu mesa\u011do',
    'wait %n secs':
        'atendi %n sek.',
    'wait until %b':
        'atendi \u011dis %b',
    'forever %loop':
        'ripeti eterne %loop',
    'repeat %n %loop':
        'ripeti %n -foje %loop',
    'repeat until %b %loop':
        'ripeti \u011dis %b %loop',
    'if %b %c':
        'se %b %c',
    'if %b %c else %c':
        'se %b %c alie %c',
    'report %s':
        'raporti %s',
    'stop %stopChoices':
        'halti %stopChoices',
    'all':
        '\u0109ion',
    'this script':
        'tiun \u0109i skripton',
    'this block':
        'tiun \u0109i blokon',
    'stop %stopOthersChoices':
        'halti %stopOthersChoices',
    'all but this script':
        '\u0109ion krom tiu \u0109i skripto',
    'other scripts in sprite':
        'aliajn skriptojn en tiu objekto',
    'pause all %pause':
        'pa\u016dzi \u0109iujn %pause',
    'run %cmdRing %inputs':
        'ruli %cmdRing %inputs',
    'launch %cmdRing %inputs':
        'lan\u0109i %cmdRing %inputs',
    'call %repRing %inputs':
        'voki %repRing %inputs',
    'run %cmdRing w/continuation':
        'ruli %cmdRing %inputs kun da\u016drigo',
    'call %cmdRing w/continuation':
        'voki %cmdRing %inputs kun da\u016drigo',
    'warp %c':
        'nedisigeble %c',
    'when I start as a clone':
        'kiam mi estas klonita',
    'create a clone of %cln':
        'kloni %cln',
    'myself':
        'min',
    'delete this clone':
        'forigi tiun \u0109i klonon',

    // sensing:
    'touching %col ?':
        'tu\u015das %col ?',
    'touching %clr ?':
        'tu\u015das %clr ?',
    'color %clr is touching %clr ?':
        'koloro %clr tu\u015das %clr ?',
    'ask %s and wait':
        'demandi %s kaj atendi',
    'what\'s your name?':
        'Kiu estas via nomo?',
    'answer':
        'respondo',
    'mouse x':
        'musa x-pozicio',
    'mouse y':
        'musa y-pozicio',
    'mouse down?':
        'musklavo estas premita?',
    'key %key pressed?':
        'klavo %key estas premita?',
    'distance to %dst':
        'distanco de %dst',
    'reset timer':
        'nuligi klikhorlo\u011don',
    'timer':
        'klikhorlo\u011do',
    '%att of %spr':
        '%att de %spr',
    'my %get':
        'mia %get',
    'http:// %s':
        'http:// %s',
    'turbo mode?':
        'Rapida re\u011dimo?',
    'set turbo mode to %b':
        'apliki rapidan re\u011dimon al %b',
    'filtered for %clr':
        'filtrita por %clr',
    'stack size':
        'stakokapacito',
    'frames':
        'kadroj',

    // operators:
    '%n mod %n':
        '%n mod %n',
    'round %n':
        'rondigi %n',
    '%fun of %n':
        '%fun de %n',
    'pick random %n to %n':
        'elekti stokaston inter %n kaj %n',
    '%b and %b':
        '%b kaj %b',
    '%b or %b':
        '%b a\u016d %b',
    'not %b':
        'ne %b',
    'true':
        'vero',
    'false':
        'malvero',
    'join %words':
        'kunigi %words',
    'split %s by %delim':
        'dividi %s kun %delim',
    'hello':
        'saluton',
    'world':
        'mondo',
    'letter %idx of %s':
        'litero %idx el %s',
    'length of %s':
        'longeco de %s',
    'unicode of %s':
        'unikodo de %s',
    'unicode %n as letter':
        'unikodo %n kiel litero',
    'is %s a %typ ?':
        '\u0109u %s estas %typ ?',
    'is %s identical to %s ?':
        'estas %s identa kun %s ?',
    'type of %s':
        'tipo de %s',

    // variables:
    'Make a variable':
        'Krei variablon',
    'Variable name':
        'Variablonomo',
    'Script variable name':
        'Variablonomo de skripto',
    'Delete a variable':
        'Forigi variablon',
    'set %var to %s':
        '\u015dan\u011di %var al %s',
    'change %var by %n':
        '\u015dan\u011di %var je %n',
    'show variable %var':
        'montri variablon %var',
    'hide variable %var':
        'ka\u015di variablon %var',
    'script variables %scriptVars':
        'variabloj de skripto %scriptVars',

    // lists:
    'list %exp':
        'listo %exp',
    '%s in front of %l':
        '%s estas anta\u016d %l',
    'item %idx of %l':
        'elemento %idx el %l',
    'all but first of %l':
        '\u0109iuj krom la unua el %l',
    'length of %l':
        'longeco de %l',
    '%l contains %s':
        '%l enhavas %s',
    'thing':
        'io',
    'add %s to %l':
        'aldoni %s al %l',
    'delete %ida of %l':
        'forigi %ida el %l',
    'insert %s at %idx of %l':
        'enigi %s je %idx en %l',
    'replace item %idx of %l with %s':
        'astata\u016di elementon %idx de %l per %s',

    // other
    'Make a block':
        'Krei blokon',

    // menus
    // snap menu
    'About...':
        'Pri...',
    'Reference manual':
        'Manlibro',
    'Snap! website':
        'Snap! pa\u011daro',
    'Download source':
        'El\u015duti fontokodon',
    'Switch back to user mode':
        '\u015can\u011di reen al uzantore\u011dimo',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'mal\u015dalti deep-Morphic\nkuntekstajn menuojn\nkaj montri la afablajn',
    'Switch to dev mode':
        '\u015can\u011di al programada re\u011dimo',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        '\u015dalti Morphic\nkuntekstajn menuojn\nkaj kontrolilojn, \nne la afablajn!',

    // project menu
    'Project notes...':
        'Projektonotoj...',
    'New':
        'Nova',
    'Open...':
        'Malfermi...',
    'Save':
        'Konservi',
    'Save to disk':
        'Konservi al disko',
    'store this project\nin the downloads folder\n(in supporting browsers)':
        'konservi tiun \u0109i projekton\nen lokal el\u015dutan dosierujon\n'
            + '(ne \u0109iuj foliumiloj tion apogas)',
    'Save As...':
        'Konservi kiel...',
    'Import...':
        'Importi...',
    'file menu import hint':
        'el\u015dutu dosieron kun blokoj sonoj a\u016d kostumoj',
    'Export project as plain text...':
        'Eksporti projekton en plata teksta formo...',
    'Export project...':
        'Eksporti projekton...',
    'show project data as XML\nin a new browser window':
        'prezenti projekton kiel XML\nen nova fenestro de retumilo',
    'Export blocks...':
        'Eksporti blokojn...',
    'show global custom block definitions as XML\nin a new browser window':
        'prezenti mallokajn difinojn de propraj blokoj kiel XML\nen nova fenestro de retumilo',
    'Unused blocks...':
          'Neuzataj blokoj...',
    'find unused global custom blocks\nand remove their definitions':
        'trovi neuzatajn proprajn blokojn\nkaj forigi iliajn difinojn',
    'Remove unused blocks':
        'Forigi neuzatajn blokojn',
    'there are currently no unused\nglobal custom blocks in this project':
        'aktuale estas neniu neuzata\nmalloka propra bloko en tiu \u0109i projekto',
    'unused block(s) removed':
        'neuzata(j) bloko(j) forigitaj',
    'Export summary...':
        'Eksportresumo',
    'open a new browser browser window\n with a summary of this project':
        'malfermi projektresumon\nen nova fenestro de foliumilo',
    'Contents':
        'Enhavo',
    'Kind of':
        'Speco de',
    'Part of':
        'Parto de',
    'Parts':
        'Partoj',
    'Blocks':
        'Blokoj',
    'For all Sprites':
        'Por \u0109iu objekto',
    'Import tools':
        'Importi ilaron',
    'load the official library of\npowerful blocks':
        'importi oficialan bibliotekon\nde potencaj blokoj',
    'Libraries...':
        'Bibliotekoj...',
    'Import library':
        'Importi bibliotekon',

    // cloud menu
    'Login...':
        'Ensaluti...',
    'Signup...':
        'Krei konton...',

    // settings menu
    'Language...':
        'Lingvo...',
    'Zoom blocks...':
        'Zomi blokojn...',
    'Stage size...':
        'Grandeco de scenejo...',
    'Stage size':
        'Grandeco de scenejo',
    'Stage width':
        'Lar\u011deco de scenejo',
    'Stage height':
        'Alteco de scenejo',
    'Default':
        'Normala',
    'Blurred shadows':
        'Malklaraj ombroj',
    'uncheck to use solid drop\nshadows and highlights':
        'mal\u015daltu por uzi klarajn\nombrojn kaj emfazojn',
    'check to use blurred drop\nshadows and highlights':
        '\u015daltu por uzi malklarajn\nombrojn kaj emfazojn',
    'Zebra coloring':
        'Zebra kolorigado',
    'check to enable alternating\ncolors for nested blocks':
        '\u015daltu por ebligi diferencigadon\n de koloroj de stake kolektitaj blokoj',
    'uncheck to disable alternating\ncolors for nested block':
        'mal\u015daltu por malebligi diferencigadon\n de koloroj de stake kolektitaj blokoj',
    'Dynamic input labels':
        'Dinamikaj enigoetikedoj',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'mal\u015daltu por malebligi dinamikajn\nenigoetikedojn por enigo de variabloj',
    'check to enable dynamic\nlabels for variadic inputs':
        '\u015daltu por ebligi dinamikajn\nenigoetikedojn por enigo de variabloj',
    'Prefer empty slot drops':
        'Preferas malplenajn ingojn',
    'settings menu prefer empty slots hint':
        'agorda menuo preferas indikojn \u0109e malpenaj ingoj',
    'uncheck to allow dropped\nreporters to kick out others':
        'mal\u015daltu por ebligi demetatajn\nraportilojn for\u015dovi la aliajn',
    'Long form input dialog':
        'Eniga formularo en longa formo',
    'Plain prototype labels':
        'Krudaj prototipaj etikedoj',
    'uncheck to always show (+) symbols\nin block prototype labels':
        'mal\u015daltu por \u0109iam montri (+) signon\nen etikedoj de prototipaj blokoj',
    'check to hide (+) symbols\nin block prototype labels':
        '\u015daltu por ka\u015di (+) signon\nen etikedoj de prototipaj blokoj',
    'check to always show slot\ntypes in the input dialog':
        '\u015daltu por \u0109iam montri specon\nde ingo en eniga formularo',
    'uncheck to use the input\ndialog in short form':
        'mal\u015daltu por uzi la enigan\nformularon en mallonga formo',
    'Virtual keyboard':
        'Virtuala klavaro',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'mal\u015daltu por malebligi\nsubtenon de virtuala klavaro\npor porteblaj aparatoj',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        '\u015daltu por ebligi\nsubtenon de virtuala klavaro\npor porteblaj aparatoj',
    'Input sliders':
        'Enigaj \u015doviloj',
    'uncheck to disable\ninput sliders for\nentry fields':
        'mal\u015daltu por malebligi\nenigajn \u015dovilojn por\nenigaj kampoj',
    'check to enable\ninput sliders for\nentry fields':
        '\u015daltu por ebligi\nenigajn \u015dovilojn por\nenigaj kampoj',
    'Clicking sound':
        'Klakanta sono',
    'uncheck to turn\nblock clicking\nsound off':
        'mal\u015daltu por malebligi\nklakantan sonon',
    'check to turn\nblock clicking\nsound on':
        '\u015daltu por ebligi\nklakantan sonon',
    'Animations':
        'Animacioj',
    'uncheck to disable\nIDE animations':
        'mal\u015dalti por malebligi\nIDE-animaciojn',
    'Turbo mode':
        'Rapida re\u011dimo',
    'check to prioritize\nscript execution':
        '\u015dalti por asigni prioritaton\nde skriptoplenumado',
    'uncheck to run scripts\nat normal speed':
        'mal\u015dalti por plenumi skripton\nkun normala rapideco',
    'check to enable\nIDE animations':
        '\u015dalti por ebligi\nIDE-animaciojn',
    'Flat design':
        'Plata fasonado',
    'Nested auto-wrapping':
        'Ingita \u0109irka\u016dfulo',
    'Keyboard Editing':
        'Klavara redaktado',
    'Table support':
        'Subteno de tabeloj',
    'Table lines':
        'Linioj de tabelo',
    'Visible stepping':
        'Ponunupa\u015da plenumado',
    'Thread safe scripts':
        'Fadensekuraj skriptoj',
    'uncheck to allow\nscript reentrancy':
        'mal\u015daltu por ebligi\nreeniron en fadenon',
    'check to disallow\nscript reentrancy':
        '\u015daltu por malebligi\nreeniron en fadenon',
    'Prefer smooth animations':
        'Preferas glatajn animaciojn',
    'uncheck for greater speed\nat variable frame rates':
        'mal\u015daltu por pli granda rapideco\nkun varia bildorapido',
    'check for smooth, predictable\nanimations across computers':
        '\u015daltu por glataj, prognozeblaj\nanimacioj sur \u0109iuj komputiloj',
    'Flat line ends':
        'Malrondaj linifinoj',
    'check for flat ends of lines':
        '\u015daltu por malrondaj linifinoj',
    'uncheck for round ends of lines':
        'mal\u015daltu por rondaj linifinoj',
    'Inheritance support':
        'Subteno de heredado',

    // inputs
    'with inputs':
        'kun enigoj',
    'input names:':
        'enigonomoj:',
    'Input Names:':
        'Enigonomoj:',
    'input list:':
        'enigolisto:',

    // context menus:
    'help':
        'helpo',

    // palette:
    'hide primitives':
        'ka\u015di bazelementojn',
    'show primitives':
        'montri bazelementojn',

    // blocks:
    'help...':
        'helpo...',
    'relabel...':
        'Reetikedi...',
    'duplicate':
        'duobligi',
    'make a copy\nand pick it up':
        'krei kopion\nkaj elekt \u011din',
    'only duplicate this block':
        'duobligi nur tiun \u0109i blokon',
    'delete':
        'forigi',
    'script pic...':
        'bildo de skripto...',
    'open a new window\nwith a picture of this script':
        'malfermi novan fenestron\nkun bildo de \u0109i tiu skripto',
    'ringify':
        'procedurigi',
    'unringify':
        'malprocedurigi',
    'transient':
        'travidebla',
    'uncheck to save contents\nin the project':
        'mal\u015daltu por konservi enhavon\nen la projekton',
    'check to prevent contents\nfrom being saved':
        '\u015daltu por malebligi konservon de la enhavo\nen al projekton',

    // custom blocks:
    'delete block definition...':
        'forigi blokodifinon...',
    'edit...':
        'redakti...',

    // sprites:
    'edit':
        'redakti',
    'move':
        'movi',
    'detach from':
        'malligi de',
    'detach all parts':
        'malligi \u0109iujn partojn',
    'export...':
        'eksporti...',

    // stage:
    'show all':
        'montri \u0109ion',
    'pic...':
        'bildo...',
    'open a new window\nwith a picture of the stage':
        'malfermi novan fenestron\nkun bildon de scenejo',

    // scripting area
    'clean up':
        'purigi',
    'arrange scripts\nvertically':
        'ordigi skriptojn\nvertikale',
    'add comment':
        'aldoni komenton',
    'undrop':
        'maldemeti',
    'undo the last\nblock drop\nin this pane':
        'malfari la alstan\ndemeton de bloko\nen tiu \u0109i panelo',
    'redrop':
        'redemeti',
    'scripts pic...':
        'bildo de skriptoj...',
    'open a new window\nwith a picture of all scripts':
        'malfermi novan fenestron\nkun bildo de \u0109iuj skriptoj',
    'make a block...':
        'krei blokon...',

    // costumes
    'rename':
        'alinomi',
    'export':
        'eksporti',
    'rename costume':
	'Alinomi kostumon',

    // sounds
    'Play sound':
        'A\u016ddigi sonon',
    'Stop sound':
        'Halti sonon',
    'Stop':
        'Haltigi',
    'Play':
        'A\u016ddigi',
    'rename sound':
        'renomi sonon',

    // lists and tables
    'list view...':
        'lista vidigo',
    'table view...':
        'tabela vidigo',
    'open in dialog...':
        'malfermi en formularo...',
    'reset columns':
        'nuligi kolumnojn',
    'items':
        'elementoj',

    // dialogs
    // buttons
    'OK':
        'Bone',
    'Ok':
        'Bone',
    'Cancel':
        'Rezigni',
    'Yes':
        'Jes',
    'No':
        'Ne',
    'Open':
        'Malfermi',

    // help
    'Help':
        'Helpo',

    // zoom blocks
    'Zoom blocks':
        'Zomi vlokojn',
    'build':
        'konstrui',
    'your own':
        'propraj',
    'blocks':
        'blokoj',
    'normal (1x)':
        'normala (1x)',
    'demo (1.2x)':
        'provo (1,2x)',
    'presentation (1.4x)':
        'prezentado (1,4x)',
    'big (2x)':
        'granda (2x)',
    'huge (4x)':
        'grandega (4x)',
    'giant (8x)':
        'giganta (8x)',
    'monstrous (10x)':
        'monstra (10x)',

    // Project Manager
    'Untitled':
        'Sentitola',
    'Open Project':
        'Malfermi projekton',
    '(empty)':
        '(nenio)',
    'Saved!':
        'Konservita!',
    'Delete Project':
        'Forigi projekton',
    'Are you sure you want to delete':
        '\u0108u vi certe volas forigi?',
    'rename...':
        'alinomi...',

    // costume editor
    'Costume Editor':
        'Kostumoredaktilo',
    'click or drag crosshairs to move the rotation center':
        'klaku a\u016d trenu la krucon por movi la turnocentron',

    // project notes
    'Project Notes':
        'Projektonotoj',

    // new project
    'New Project':
        'Nova projekto',
    'Replace the current project with a new one?':
        'Anstata\u016di la aktualan projekton per la nova?',

    // save project
    'Save Project As...':
        'Konservi projekton kiel...',

    // export blocks
    'Export blocks':
        'Eksporti blokojn',
    'Import blocks':
        '',
    'this project doesn\'t have any\ncustom global blocks yet':
        '\u0109i tiu projekto\nhavas ankora\u016d neniun\npropran blokon',
    'select':
        'elekti',
    'none':
        'neniun',

    // variable dialog
    'for all sprites':
        'por \u0109iuj objektoj',
    'for this sprite only':
        'nur por \u0109i tiu objekto',

    // variables refactoring
    'rename only\nthis reporter':
        '',
    'rename all...':
        '',
    'rename all blocks that\naccess this variable':
        '',


    // block dialog
    'Change block':
        '\u015can\u011di blokon',
    'Command':
        'Komando',
    'Reporter':
        'Raportilo',
    'Predicate':
        'Predikato',

    // block editor
    'Block Editor':
        'Blokoredaktilo',
    'Apply':
        'Apliki',

    // block deletion dialog
    'Delete Custom Block':
        'Forigi propran blokon',
    'block deletion dialog text':
        'forigo de la bloko estas ne malfarebla, \u0109u vi vere volas \u011din forigi?',

    // input dialog
    'Create input name':
        'Krei enigonomon',
    'Edit input name':
        'Redakti enigonomon',
    'Edit label fragment':
        '',
    'Title text':
        'Teksto de titolo',
    'Input name':
        'Nomo de enigo',
    'Delete':
        'Forigi',
    'Object':
        'Objekto',
    'Number':
        'Nombro',
    'Text':
        'Teksto',
    'List':
        'Listo',
    'Any type':
        'Iu tipo',
    'Boolean (T/F)':
        'Buleo',
    'Command\n(inline)':
        'Komando\n(enlinia)',
    'Command\n(C-shape)':
        'Komando\n(C-forma)',
    'Any\n(unevaluated)':
        'Iu\n(nekalkulita)',
    'Boolean\n(unevaluated)':
        'Buleo\n(nekalkulita)',
    'Single input.':
        'Unuopa enigo.',
    'Default Value:':
        'Defa\u016dlta valoro:',
    'Multiple inputs (value is list of inputs)':
        'Pluraj enigoj (valoro estas listo de enigoj)',
    'Upvar - make internal variable visible to caller':
        'Fari internan variablon videblan por vokanto',

    // About Snap
    'About Snap':
        'Pri Snap',
    'Back...':
        'Reen...',
    'License...':
        'Licenco...',
    'Modules...':
        'Moduloj...',
    'Credits...':
        'Honoroj...',
    'Translators...':
        'Tradukantoj...',
    'License':
        'Licenco',
    'current module versions:':
        'versioj de aktualaj moduloj:',
    'Contributors':
        'Kontribuantoj',
    'Translations':
        'Tradukoj',

    // variable watchers
    'normal':
        'normala',
    'large':
        'lar\u011de',
    'slider':
        '\u015dovilo',
    'slider min...':
        '\u015dovilo min...',
    'slider max...':
        '\u015dovilo maks...',
    'import...':
        'importi...',
    'Slider minimum value':
        'Minimuma valoro de \u015dovilo',
    'Slider maximum value':
        'Maksimuma valoro de \u015dovilo',

    // list watchers
    'length: ':
        'longeco: ',

    // coments
    'add comment here...':
        'aldonu komenton \u0109i tie...',

    // drow downs
    // directions
    '(90) right':
        '(90) dekstren',
    '(-90) left':
        '(-90) maldekstren',
    '(0) up':
        '(0) supren',
    '(180) right':
        '(180) suben',

    // collision detection
    'mouse-pointer':
        'musmontrilo',
    'edge':
        'rando',
    'pen trails':
        'spuro de skribilo',

    // costumes
    'Turtle':
        'Testudo',
    'Empty':
        'Malplena',

    // graphical effects
    'color':
        'koloro',
    'fisheye':
        'fi\u015dokulo',
    'whirl':
        'kirlo',
    'pixelate':
        'bilderigi',
    'mosaic':
        'mozaiko',
    'saturation':
        'satureco',
    'brightness':
        'brileco',
    'ghost':
        'diafaneco',
    'negative':
        'negativo',
    'comic':
        'bildtrio',
    'confetti':
        'konfeto',

    // keys
    'space':
        'spacetklavo',
    'up arrow':
        'sago supren',
    'down arrow':
        'sago malsupren',
    'right arrow':
        'sago dekstren',
    'left arrow':
        'sago maldekstren',
    'any key':
        'ajna klavo',
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
        'kvo',
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
        'duobla v',
    'x':
        'ikso',
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

    // messages
    'new...':
        'nova...',

    // math functions
    'abs':
        'abs',
    'ceiling':
        '',
    'floor':
        '',
    'sqrt':
        'radiko',
    'sin':
        'sin',
    'cos':
        'cos',
    'tan':
        'tan',
    'asin':
        'asin',
    'acos':
        'acos',
    'atan':
        'atan',
    'ln':
        'ln',
    'e^':
        'e^',

    // delimiters
    'letter':
        'litero',
    'whitespace':
        'blankspaco',
    'line':
        'linio',
    'tab':
        'tabo',
    'cr':
        '\u0109aretreveno',

    // data types
    'number':
        'nombro',
    'text':
        'teksto',
    'Boolean':
        'Buleo',
    'list':
        'listo',
    'command':
        'komando',
    'reporter':
        'raportilo',
    'predicate':
        'predikato',
    'sprite':
        'objekto',

    // list indices
    'last':
        'lasta',
    'any':
        'ajna',

    // attributes
    'neighbors':
        'najbaroj',
    'self':
        'mem',
    'other sprites':
        'aliaj objektoj',
    'parts':
        'partoj',
    'anchor':
        'ankro',
    'parent':
        'parenco',
    'children':
        'idoj',
    'clones':
        'klonoj',
    'other clones':
        'aliaj klonoj',
    'dangling?':
        'misaj?',
    'rotation x':
        'rotacio x',
    'rotation y':
        'rotacio y',
    'center x':
        'centro x',
    'center y':
        'centro y',
    'name':
        'nomo',
    'stage':
        'scenejo'
};
