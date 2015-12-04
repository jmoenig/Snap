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
        'English string'
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
        'scy(ĉe)epf.pl',
    'last_changed':
        '2012-11-11',

    // GUI
    // control bar:
    'untitled':
        'sentitola',
    'Untitled':
        'sentitola',
    'development mode':
        'programada reĝimo',

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
        'Kostumoj',
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
        'trenu tien bildojn\nel aliaj retpaĝoj aŭ de via komputilo',
    'import a sound from your computer\nby dragging it into here':
        'importu sonon de via komputilo\ntrenante ĝin ĉi tien',

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
        'iri %n paŝojn',
    'turn %clockwise %n degrees':
        'turni %n gradojn %clockwise',
    'turn %counterclockwise %n degrees':
        'turni %n gradojn %counterclockwise',
    'point in direction %dir':
        'celi laŭ direkto %dir',
    'point towards %dst':
        'celi al %dst',
    'go to x: %n y: %n':
        'iri al x: %n y: %n',
    'go to %dst':
        'iri al %dst',
    'glide %n secs to x: %n y: %n':
        'gliti dum %n sek. al x: %n y: %n',
    'change x by %n':
        'ŝanĝi x je %n',
    'set x to %n':
        'ŝanĝi x al %n',
    'change y by %n':
        'ŝanĝi y je %n',
    'set y to %n':
        'ŝanĝi y al %n',
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
        'ŝanĝi al kostumo %cst',
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
        'ŝanĝi %eff efekton je %n',
    'set %eff effect to %n':
        'ŝanĝi efekton %eff al %n',
    'clear graphic effects':
        'forigi grafikajn efektojn',
    'change size by %n':
        'ŝanĝi grandecon je %n',
    'set size to %n %':
        'ŝanĝi grandecon al %n',
    'size':
        'grandeco',
    'show':
        'montri',
    'hide':
        'kaŝi',
    'go to front':
        'iri antaŭen',
    'go back %n layers':
        'iri %n tavolojn malantaŭen',

    'development mode \ndebugging primitives:':
        'programada reĝimo \nsencimigadaj bazelementoj:',
    'console log %mult%s':
        'konzola protokolo: %mult%oj',
    'alert %mult%s':
        'averto %mult%oj',

    // sound:
    'play sound %snd':
        'aŭdigi sonon %snd',
    'play sound %snd until done':
        'aŭdigi sonon %snd ĝis finite',
    'stop all sounds':
        'finigi ĉiujn sonojn',

    // pen:
    'clear':
        'forigi desegnaĵon',
    'pen down':
        'malsuprenigi skribilon',
    'pen up':
        'suprenigi skribilon',
    'set pen color to %clr':
        'ŝanĝi skribilokoloron al %clr',
    'change pen color by %n':
        'ŝanĝi skribilokoloron je %n',
    'set pen color to %n':
        'ŝanĝi skribilokoloron al %n',
    'change pen shade by %n':
        'ŝanĝi kolorombron je %n',
    'set pen shade to %n':
        'ŝanĝi kolorombron al %n',
    'change pen size by %n':
        'ŝanĝi skribilodikecon je %n',
    'set pen size to %n':
        'ŝanĝi skribilodikecon al %n',
    'stamp':
        'stampi',

    // control:
    'when %greenflag clicked':
        'Kiam %greenflag estas alklakita',
    'when %keyHat key pressed':
        'Kiam klavo %keyHat estas premita',
    'when I am clicked':
        'Kiam mi estas alklakita',
    'when I receive %msgHat':
        'Kiam mi ricevas %msgHat',
    'broadcast %msg':
        'elsendi %msg al ĉiuj',
    'broadcast %msg and wait':
        'elsendi %msg al ĉiuj kaj atendi',
    'Message name':
        'Mesaĝonomo',
    'wait %n secs':
        'atendi %n sek.',
    'wait until %b':
        'atendi ĝis %b',
    'forever %c':
        'ripeti eterne %c',
    'repeat %n %c':
        'ripeti %n -foje %c',
    'repeat until %b %c':
        'ripeti ĝis %b %c',
    'if %b %c':
        'se %b %c',
    'if %b %c else %c':
        'se %b %c alie %c',
    'report %s':
        'raporti %s',
    'stop block':
        'halti blokon',
    'stop script':
        'halti skripton',
    'stop all %stop':
        'halti ĉiujn %stop',
    'run %cmdRing %inputs':
        'ruli %cmdRing %inputs',
    'launch %cmdRing %inputs':
        'lanĉi %cmdRing %inputs',
    'call %repRing %inputs':
        'voki %repRing %inputs',
    'run %cmdRing w/continuation':
        'ruli %cmdRing %inputs kun daŭrigo',
    'call %cmdRing w/continuation':
        'voki %cmdRing %inputs kun daŭrigo',
    'warp %c':
        'nedisigeble %c',

    // sensing:
    'touching %col ?':
        'tuŝas %col ?',
    'touching %clr ?':
        'tuŝas %clr ?',
    'color %clr is touching %clr ?':
        'koloro %clr tuŝas %clr ?',
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
        'nuligi klikhorloĝon',
    'timer':
        'klikhorloĝo',
    'http:// %s':
        'http:// %s',
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
        '%b aŭ %b',
    'not %b':
        'ne %b',
    'true':
        'vero',
    'false':
        'malvero',
    'join %words':
        'kunigi %words',
    'hello':
        'saluton',
    'world':
        'mondo',
    'letter %n of %s':
        'litero %n el %s',
    'length of %s':
        'longeco de %s',
    'unicode of %s':
        'unikodo de %s',
    'unicode %n as letter':
        'unikodo %n kiel litero',
    'is %s a %typ ?':
        'ĉu %s estas %typ ?',
    'type of %s':
        'tipo de %s',

    // variables:
    'Make a variable':
        'Krei variablon',
    'Variable name':
        'Variablonomo',
    'Delete a variable':
        'Forigi variablon',
    'set %var to %s':
        'ŝanĝi %var al %s',
    'change %var by %n':
        'ŝanĝi %var je %n',
    'show variable %var':
        'montri variablon %var',
    'hide variable %var':
        'kaŝi variablon %var',
    'script variables %scriptVars':
        'variabloj de skripto %scriptVars',

    // lists:
    'list %exp':
        'listo %exp',
    '%s in front of %l':
        '%s estas antaŭ %l',
    'item %idx of %l':
        'elemento %idx el %l',
    'all but first of %l':
        'ĉiuj krom la unua el %l',
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
        'astataŭi elementon %idx de %l per %s',

    // other
    'Make a block':
        'Krei blokon',

    // menus
    // snap menu
    'About...':
        'Pri...',
    'Snap! website':
        'Snap! paĝaro',
    'Download source':
        'Elŝuti fontokodon',
    'Switch back to user mode':
        'Ŝanĝi reen al uzantoreĝimo',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'malŝalti deep-Morphic\nkuntekstajn menuojn\nkaj montri la afablajn',
    'Switch to dev mode':
        'Ŝanĝi al programada reĝimo',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'ŝalti Morphic\nkuntekstajn menuojn\nkaj kontrolilojn, \nne la afablajn!',

    // project menu
    'Project notes...':
        'Projektonotoj...',
    'New':
        'Nova',
    'Open...':
        'Malfermi...',
    'Save':
        'Konservi',
    'Save As...':
        'Konservi kiel...',
    'Import...':
        'Importi...',
    'file menu import hint':
        'elŝutu dosieron kun blokoj sonoj aŭ kostumoj',
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
    'Delete Project':
        'Forigi projekton',
    'Are you sure you want to delete':
        'Ĉu vi certas ke vi volas forigi',

    // settings menu
    'Language...':
        'Lingvo...',
    'Blurred shadows':
        'Malklaraj ombroj',
    'uncheck to use solid drop\nshadows and highlights':
        'malŝaltu por uzi klarajn\nombrojn kaj emfazojn',
    'check to use blurred drop\nshadows and highlights':
        'ŝaltu por uzi malklarajn\nombrojn kaj emfazojn',
    'Zebra coloring':
        'Zebra kolorigado',
    'check to enable alternating\ncolors for nested blocks':
        'ŝaltu por ebligi diferencigadon\n de koloroj de stake kolektitaj blokoj',
    'uncheck to disable alternating\ncolors for nested block':
        'malŝaltu por malebligi diferencigadon\n de koloroj de stake kolektitaj blokoj',
    'Prefer empty slot drops':
        'Preferas malplenajn malplenajn ingojn',
    'settings menu prefer empty slots hint':
        'ŝaltu por malebligi demetatajn\nraportilojn forŝovi la aliajn',
    'uncheck to allow dropped\nreporters to kick out others':
        'malŝaltu por ebligi demetatajn\nraportilojn forŝovi la aliajn',
    'Long form input dialog':
        'Longa formo de eniga formularo',
    'check to always show slot\ntypes in the input dialog':
        'ŝaltu por uzi la enigan\nformularon en longa formo',
    'uncheck to use the input\ndialog in short form':
        'malŝaltu por uzi la enigan\nformularon en mallonga formo',
    'Virtual keyboard':
        'Virtuala klavaro',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'malŝaltu por malebligi\nsubtenon de virtuala klavaro\npor porteblaj aparatoj',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'ŝaltu por ebligi\nsubtenon de virtuala klavaro\npor porteblaj aparatoj',
    'Input sliders':
        'Enigaj ŝoviloj',
    'uncheck to disable\ninput sliders for\nentry fields':
        'malŝaltu por malebligi\nenigajn ŝovilojn por\nenigaj kampoj',
    'check to enable\ninput sliders for\nentry fields':
        'ŝaltu por ebligi\nenigajn ŝovilojn por\nenigaj kampoj',
    'Clicking sound':
        'Klakanta sono',
    'uncheck to turn\nblock clicking\nsound off':
        'malŝaltu por malebligi\nklakantan sonon',
    'check to turn\nblock clicking\nsound on':
        'ŝaltu por ebligi\nklakantan sonon',
    'Thread safe scripts':
        'Fadensekuraj skriptoj',
    'uncheck to allow\nscript reentrancy':
        'malŝaltu por ebligi\nreeniron en fadenon',
    'check to disallow\nscript reentrancy':
        'ŝaltu por malebligi\nreeniron en fadenon',

    // inputs
    'with inputs':
        'kun enigoj',
    'input names:':
        'enigonomoj:',
    'Input Names:':
        'Enigonomoj:',

    // context menus:
    'help':
        'helpo',

    // blocks:
    'help...':
        'help...',
    'duplicate':
        'duobligi',
    'make a copy\nand pick it up':
        'krei kopion\nkaj elekt ĝin',
    'delete':
        'forigi',
    'script pic...':
        'bildo de skripto...',
    'open a new window\nwith a picture of this script':
        'malfermi novan fenestron\nkun bildo de ĉi tiu skripto',
    'ringify':
        'procedurigi',
    'unringify':
        'malprocedurigi',

    // custom blocks:
    'delete block definition...':
        'forigi blokodifinon...',
    'edit...':
        'redakti...',

    // sprites:
    'edit':
        'redakti',
    'export...':
        'eksporti...',

    // scripting area
    'clean up':
        'purigi',
    'arrange scripts\nvertically':
        'ordigi skriptojn\nvertikale',
    'add comment':
        'aldoni komenton',
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
        'Aŭdigi sonon',
    'Stop sound':
        'Halti sonon',
    'Stop':
        'Haltigi',
    'Play':
        'Aŭdigi',

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

    // costume editor
    'Costume Editor':
        'Kostumoredaktilo',
    'click or drag crosshairs to move the rotation center':
        'klaku aŭ trenu la krucon por movi la turnocentron',

    // project notes
    'Project Notes':
        'Projektonotoj',

    // new project
    'New Project':
        'Nova projekto',
    'Replace the current project with a new one?':
        'Anstataŭi la aktualan projekton per la nova?',

    // open project
    'Open Project':
        'Malfermi projekton',
    '(empty)':
        '(nenio)',

    // save project
    'Save Project As...':
        'Konservi projekton kiel...',
    'Saved!':
        'Konservita!',

    // export blocks
    'Export blocks':
        'Eksporti blokojn',
    'this project doesn\'t have any\ncustom global blocks yet':
        'ĉi tiu projekto\nhavas ankoraŭ neniun\npropran blokon',
    'select':
        'elekti',
    'all':
        'ĉiujn',
    'none':
        'neniun',

    // variable dialog
    'for all sprites':
        'por ĉiuj objektoj',
    'for this sprite only':
        'nur por ĉi tiu objekto',

    // block dialog
    'Change block':
        'Ŝanĝi blokon',
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
        'forigo de la bloko estas ne malfarebla, ĉu vi vere volas ĝin forigi?',

    // input dialog
    'Create input name':
        'Krei enigonomon',
    'Edit input name':
        'Redakti enigonomon',
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
        'Defaŭlta valoro:',
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
        'larĝe',
    'slider':
        'ŝovilo',
    'slider min...':
        'ŝovilo min...',
    'slider max...':
        'ŝovilo maks...',
    'Slider minimum value':
        'Minimuma valoro de ŝovilo',
    'Slider maximum value':
        'Maksimuma valoro de ŝovilo',

    // list watchers
    'length: ':
        'longeco: ',

    // coments
    'add comment here...':
        'aldonu komenton ĉi tie...',

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

    // graphical effects
    'ghost':
        'diafaneco',

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
        'germana v',
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

    // list indices
    'last':
        'lasta',
    'any':
        'iu'
};
