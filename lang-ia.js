/*

    lang-ia.js

    Interlingua translation for SNAP!

    edited for Interlingua by Ken Dickey

    Copyright (C) 2015 by Jens Mönig

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

    Or via GitHub:
	git clone https://github.com/jmoenig/Snap--Build-Your-Own-Blocks.git

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
        ia - Interlingua => => SnapTranslator.dict.ia = {

    etc. (see <http://en.wikipedia.org/wiki/ISO_639-1>)


    3. Translate

    Then work through the dictionary, replacing the German strings against
    your translations. The dictionary is a straight-forward JavaScript ad-hoc
    object, for review purposes it should be formatted as follows:

        {
            'English string':
                'Translation string',
            'last key':
        }       'last value'

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
        ia - Interlingua => lange-ia.js

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

/*
 * De nota:
 * 
 * https://translatewiki.net/wiki/Portal:Ia
 * 
 * In my view, a "variable" is a box (cassa) in which one
 * stores a value -- vs a "constant", which is a named value.
 */

/*global SnapTranslator*/

SnapTranslator.dict.ia = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

	None
*/

    // translations meta information
    'language_name':
        'Interlingua', // the name as it should appear in the language menu
    'language_translator':
        'Ken Dickey', // your name for the Translators tab
    'translator_e-mail':
        'Ken.Dickey@whidbey.com', // optional
    'last_changed':
        '2015-08-09', // this, too, will appear in the Translators tab

    // GUI
    // control bar:
    'untitled':
        'innominate', // 'nulle titulo'
    'development mode':
        'disveloppation moda',

    // categories:
    'Motion':
        'Movimento',
    'Looks':
        'Apparentia',
    'Sound':
        'Sono',
    'Pen':
        'Penna',
    'Control':
        'Reger',
    'Sensing':
        'Sensation',
    'Operators':
        'Operators',
    'Variables':
        'Cassas',
    'Lists':
        'Listas',
    'Other':
        'Altere',

    // editor:
    'draggable':
        'traheribile',

    // tabs:
    'Scripts':
        'Scriptes',
    'Costumes':
        'Costumes',
    'Sounds':
        'Sonas',

    // names:
    'Sprite':
        'Spirito', // 'Animo'
    'Stage':
        'Scena',

    // rotation styles:
    'don\'t rotate':
        'non rota',
    'can rotate':
        'capabile de rota',
    'only face left/right':
        'sol facie sinistre o dextre',

    // new sprite button:
    'add a new sprite':
        'adde spirito nove',

    // tab help
    'costumes tab help':
        'costumes adjuta',
    'import a sound from your computer\nby dragging it into here':
        'face importa un sono per trahe hic',

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
        'Scena selecte:\n'
	+ 'nulle motion primitives',

    'move %n steps':
        'move %n passos',
    'turn %clockwise %n degrees':
        'torna %clockwise %n grados',  // dirige
    'turn %counterclockwise %n degrees':
        'torna %counterclockwise %n grados',
    'point in direction %dir':
        'puncta direction %dir',
    'point towards %dst':
        'puncta erga %dst',
    'go to x: %n y: %n':
        'ir a x: %n y: %n',  // 'adi'
    'go to %dst':
        'ir a %dst',
    'glide %n secs to x: %n y: %n':
        'glissa %n secundes a x: %n y: %n',
    'change x by %n':
        'cambia x per %n',
    'set x to %n':
        'in x pone %n', // 'pone in x le valo %n',
    'change y by %n':
        'cambia y per %n',
    'set y to %n':
        'in y pone %n',
    'if on edge, bounce':
        'si in bordo talia, recula',
    'x position':
        'x position',
    'y position':
        'y position',
    'direction':
        'direction',

    // looks:
    'switch to costume %cst':
        'cambio a costume %cst',
    'next costume':
        'proxime costume',
    'costume #':
        'costume numero',
    'say %s for %n secs':
        'dice %s per %n secundes',
    'say %s':
        'dice %s',
    'think %s for %n secs':
        'pensa %s per %n secundes',
    'think %s':
        'pensa %s',
    'Hello!':
        'Hallo!',
    'Hmm...':
        'Hmm...',
    'change %eff effect by %n':
        'cambia %eff effecto per %n',
    'set %eff effect to %n':
        'in %eff pone effecto %n',
    'clear graphic effects':
        'depura effectos graphic',
    'change size by %n':
        'accrescimento dimensiones per %n',
    'set size to %n %':
        'delimita dimentiones a %n %',
    'size':
        'dimentiones',
    'show':
        'expone',  // 'monstra'
    'hide':
        'cela',   // 'occulta'
    'go to front':
        'antepone',  // 'ir maxima ante',
    'go back %n layers':
        'ir detra %n strato',

    'development mode \ndebugging primitives:':
        'disveloppa modo \n'
	+ 'anti-defacto primitives',
    'console log %mult%s':
        'entra in registration %mult%s',
    'alert %mult%s':
        'alerte %mult%s',

    // sound:
    'play sound %snd':
        'sona %snd',  // 'face sono %snd',
    'play sound %snd until done':
        'sona %snd usque complete', // 'sona %snd integral',
    'stop all sounds':
        'cessar sona tote',
    'rest for %n beats':
        'pausa per %n pulsia',
    'play note %n for %n beats':
        'sona nota %n per %n pulsia',
    'change tempo by %n':
        'cambio tempo per %n',
    'set tempo to %n bpm':
        'face tempo a %n pulsia per minuta',
    'tempo':
        'tempo',

    // pen:
    'clear':
        'depura',
    'pen down':
        'face penna a basso',
    'pen up':
        'face penna in alto',
    'set pen color to %clr':
        'face color del penna a %clr',
    'change pen color by %n':
        'cambia color del penna a %n',
    'set pen color to %n':
        'face color del penna a %n',
    'change pen shade by %n':
        'cambio tinta del penna per %n', 
    'set pen shade to %n':
        'face tinta del penna a %n',
    'change pen size by %n':
        'cambio dimension del penna per %n',
    'set pen size to %n':
        'face dimension del penna a %n',
    'stamp':
        'timbra',  // 'cunea' 'stampa'

    // control:
    'when %greenflag clicked':
        'cuando %greenflag clic',
    'when %keyHat key pressed':
        'cuando %keyHat clave pressa',
    'when I am %interaction':
        'cuando io es %interaction',
    'clicked':
        'clicco',
    'pressed':
        'pressa',
    'dropped':
        'depone',
    'mouse-entered':
        'mure entra',
    'mouse-departed':
        'mure parti',  // 'quita'
    'when I receive %msgHat':
        'cuando io recipe %msgHat',
    'broadcast %msg':
        'mitte %msg a omne',
    'broadcast %msg and wait':
        'mitte %msg a omni e attende',
    'Message name':
        'Nomine de message',
    'message':
        'message',
    'any message':
        'qualcosa message',  // 'cualcunque message'
    'wait %n secs':
        'attende %n secundes',
    'wait until %b':
        'attende donec %b',
    'forever %c':
        'sin termino %c',
    'repeat %n %c':
        'itera %n %c',
    'repeat until %b %c':
        'itera donec %b %c',
    'if %b %c':
        'si %b %c',
    'if %b %c else %c':
        'si %b %c nisi %c',
    'report %s':
        'reporta %s', // 'valor restituite'
    'stop %stopChoices':
        'cessa %stopChoices',
    'all':
        'omni',
    'this script':
        'iste scripte',  // 'este'
    'this block':
        'iste bloco',
    'stop %stopOthersChoices':
        'cessa %stopOthersChoices',
    'all but this script':
        'omni excepte iste scripte',
    'other scripts in sprite':
        'altere scriptes in iste spirito',
    'pause all %pause':
        'pausa omni %pause',
    'run %cmdRing %inputs':
        'comencia %cmdRing %inputs', // 'initio'
    'launch %cmdRing %inputs':
        'lancea %cmdRing %inputs',
    'call %repRing %inputs':
        'evoca %repRing %inputs',
    'run %cmdRing w/continuation':
        'comencia %cmdRing con continuation',
    'call %cmdRing w/continuation':
        'evoca %cmdRing con continuation',
    'warp %c':
        'ordi %c',  // 'ordito'
    'when I start as a clone':
        'quando io comencia como copia',
    'create a clone of %cln':
        'face un copia de %cln',
    'myself':
        'io mesme',
    'delete this clone':
        'dele ista copia',

    // sensing:
    'touching %col ?':
        'continge %col ?',
    'touching %clr ?':
        'continge %clr ?',
    'color %clr is touching %clr ?':
        'color %clr es continge %clr ?',
    'ask %s and wait':
        'demanda %s e attende',
    'what\'s your name?':
        'que es tu nomine?',
    'answer':
        'responde',
    'mouse x':
        'mure x position',
    'mouse y':
        'mure y position',
    'mouse down?':
        'a mure es a basso?',
    'key %key pressed?':
        'a clave %key pressa?',
    'distance to %dst':
        'distantia a %dst',
    'reset timer':
        'recomenciar le chronometria',
    'timer':
        'chronometria',
    '%att of %spr':
        '%att de %spr',
    'http:// %s':
        'http:// %s',
    'turbo mode?':
        'a turbo modo?',
    'set turbo mode to %b':
        'face turbo modo a %b',

    'filtered for %clr':
        'filtra per %clr',
    'stack size':
        'pila dimensione',
    'frames':
        'quadros',

    // operators:
    '%n mod %n':
        '%n modulo %n',
    'round %n':
        '%n rotunda',
    '%fun of %n':
        '%fun de %n',
    'pick random %n to %n':
        'al aventura inter %n e %n',  // 'al hasardo'
    '%b and %b':
        '%b e %b',
    '%b or %b':
        '%b o %b',
    'not %b':
        'non %b',
    'true':
        'ver',
    'false':
        'false',
    'join %words':
        'junge %words',
    'split %s by %delim':
        'fisse %s de %delim',
    'hello':
        'Hallo',
    'world':
        'Mundo',
    'letter %idx of %s':
        'character %idx de %s',
    'length of %s':
        'longor de %s',
    'unicode of %s':
        'Unicode valor de %s',
    'unicode %n as letter':
        'Unicode character pro %n',
    'is %s a %typ ?':
        'a es %s de %typ ?',
    'is %s identical to %s ?':
        'a es %s identic a %s ?', // 'mesme' ?

    'type of %s':
        'typo de %s',

    // variables:
    'Make a variable':
        'Nove Cassa',  // 'Face Cassa'
    'Variable name':
        'Nomine de Cassa',  // global?
    'Script variable name':
        'Nomine de Scripte Cassa',
    'Delete a variable':
        'Dele un Cassa',

    'set %var to %s':
        'in %var pone %s',
    'change %var by %n':
        'cambio %var per %n',
    'show variable %var':
        'expone cassa %var',
    'hide variable %var':
        'cella cassa %var',  // 'occulta'
    'script variables %scriptVars':
        'cassas de scripte %scriptVars',

    // lists:
    'list %exp':
        'Liste %exp',
    '%s in front of %l':
        '%s es ante que %l',
    'item %idx of %l':
        'elemento %idx de %l',
    'all but first of %l':
        'onme excepte prime de %l',
    'length of %l':
        'longor de %l',
    '%l contains %s':
        '%l contine %s',
    'thing':
        'cosa',
    'add %s to %l':
        'adde %s e %l',
    'delete %ida of %l':
        'dele %ida de %l',
    'insert %s at %idx of %l':
        'inserta %s in %idx de %l',
    'replace item %idx of %l with %s':
        'reimplacia elemento %idx de %l con %s',  // surroga

    // other
    'Make a block':
        'Face un bloco',

    // menus
    // snap menu
    'About...':
        'In re Snap!...',  
    'Reference manual':
        'Manual referentia ',
    'Snap! website':
        'Snap! sito web',
    'Download source':
        'Discarga fonte',
    'Switch back to user mode':
        'Cambio retro a modo usator',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'Face inactive profunde Morphic\n'
        + 'menus contexto e\n'
        + 'expone se usator amicabile',
    'Switch to dev mode':
        'Cambio a modo disveloppator',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'Face active Morphic\n'
		+ 'menus contexto e inspector,\n'
		+ 'non amicabile de usatores',

    // project menu
    'Project notes...':
        'Annotos de projecto...',
    'New':
        'Nova',
    'Open...':
        'Aperte...',
    'Save':
        'Salvo', // 'Secur'
    'Save to disk':
        'Salvo in file',  // 'Salve/Secur a systema de files'
    'store this project\nin the downloads folder\n(in supporting browsers)':
        'Pone esti projecto\n'
        + 'in dossier discarga\n'
        + '(per navigators sustene)',
    'Save As...':
        'Salvo como nomine...',
    'Import...':
        'Importa...',
    'file menu import hint':
        'Importa insinua per menu de file ',
    'Export project as plain text...':
        'Exporta projecto in texto simple...',
    'Export project...':
        'Exporta projecto...',
    'show project data as XML\nin a new browser window':
        'Expone dato de projecto in XML\n'
        + 'immane nove fenestra de navigator',
        // vitrina
    'Export blocks...':
        'Exporta blocos...',
    'show global custom block definitions as XML\nin a new browser window':
        'Expone blocos artificiose global como XML\n'
        + 'immane nove fenestra de navigator',
    'Import tools':
        'Importa utensiles',
    'load the official library of\npowerful blocks':
        'Incarga bibliotheca official de blocos potente',
    'Libraries...':
        'Bibliothecas...',
    'Import library':
        'Importa bibliotheca',

    // cloud menu
    'Login...':
        'Authenticar se...',
    'Signup...':
        'Abonamento...',

    // settings menu
    'Language...':
        'Lingua...',
    'Zoom blocks...':
        'Zoom blocos...',
    'Stage size...':
        'Scena dimensiones...',
    'Stage size':
        'Scena dimensiones',
    'Stage width':
        'Scena traverso',
    'Stage height':
        'Scena statura',
    'Default':
        'Normal',
    'Blurred shadows':
        'Umbre indistincte',
    'uncheck to use solid drop\nshadows and highlights':
        'dismarca por usa gutta umbras\n'
        + 'e accentuas solide',
    'check to use blurred drop\nshadows and highlights':
        'marca a selecte por usa gutta umbras\n'
        + 'e accentuas indistincte',
    'Zebra coloring':
        'Zebra colorito',
    'check to enable alternating\ncolors for nested blocks':
        'marca a selecta colors alternative\n'
        + 'por blocos annida',
    'uncheck to disable alternating\ncolors for nested block':
        'dismarca a disactiva colors alternative\n'
        + 'por blocos annida',
    'Dynamic input labels':
        'Dynamic etiquettas entrata',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'dismarca a disactiva dynamic\n'
        + 'etiquettas varia entrata', // 'variante'
    'check to enable dynamic\nlabels for variadic inputs':
        'marca a activa dynamic\n'
        + 'etiquetta varia entrata',
    'Prefer empty slot drops':
        'Dar le preferentia a cader in apatur vacue', 
				// ..' in foramine vacue'
    'settings menu prefer empty slots hint':
        'Dar le preferentia in menu predefinite\n'
        + ' per apatur vacue insinua',
    'uncheck to allow dropped\nreporters to kick out others':
        'dismarca a activar reporters cadera\n'
            + 'a capabile displacia alteres',
    'Long form input dialog':
        'Usa dialogo entrata forma longe',
    'Plain prototype labels':
        'Face plan le etiquettas prototypic',
    'uncheck to always show (+) symbols\nin block prototype labels':
        'dismarca a expone (+) symbolos\n'
        + 'in etiquettas prototypic per blocos ',
    'check to hide (+) symbols\nin block prototype labels':
        'marca a cella (+) symbols\n'
        + 'in etiquettas prototypic per blocos',
    'check to always show slot\ntypes in the input dialog':
        'marca a expone apatur typos\n'
        + 'in dialogo entrata',
    'uncheck to use the input\ndialog in short form':
        'dismarka a usa dialogo entrata forma curte',
    'Virtual keyboard':
        'Virtual claviero',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'dismarca a disactivar virtual claviero\n'
            + 'per dispositivo mobile',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'marca a activar virtual claviero\n'
            + 'per dispositivo mobile',
    'Input sliders':
        'Entrata glissatores',
    'uncheck to disable\ninput sliders for\nentry fields':
        'dismarca a disactivar\n'
        + 'entrata glissatores\n'
        + 'pro campos entrate',
    'check to enable\ninput sliders for\nentry fields':
        'marca a activar\n'
         + 'entrata glissatores\n'
         + 'pro campos entrate',
    'Clicking sound':
        'Sona de clicca',
    'uncheck to turn\nblock clicking\nsound off':
        'dismarca a disactivar\nsona de clicca',
    'check to turn\nblock clicking\nsound on':
        'marca a activar\nsona de clicca',
    'Animations':
        'Animations',
    'uncheck to disable\nIDE animations':
        'dismarca a disactivar\nIDE-Animations',
    'Turbo mode':
        'Turbo modo',
    'check to prioritize\nscript execution':
        'marca a prioitate\nexecution de scripte', // 'exequer'
    'uncheck to run scripts\nat normal speed':
        'dismarca a comencia scriptes\n'
        + 'a velocitate normal', // 'celeritate'
    'check to enable\nIDE animations':
        'marca a activar \nIDE animations',
    'Thread safe scripts':
        'Filo secur scriptes',
    'uncheck to allow\nscript reentrance':
        'dismarca a permitte\nscripte readmitte',
    'check to disallow\nscript reentrance':
        'marca a prohibi\nscripte readmitte',
    'Prefer smooth animations':
        'Prefere aminationes lisia',
    'uncheck for greater speed\nat variable frame rates':
        'dismarca pro plus veloce\n'  // 'accelera'
         + 'ma variable rata\n'
         + 'de frame monstra',
    'check for smooth, predictable\nanimations across computers':
        'marca pro predice lisia\n'
        + 'animationes trans computator systemas', // multi-platteforma
    'Flat line ends':
        'Lineas fin quadrate',
    'check for flat ends of lines':
        'marca pro lineas fin quadrate',
    'uncheck for round ends of lines':
        'dismarca pro lineas fin rotunde',

    // inputs
    'with inputs':
        'Con entratas',
    'input names:':
        'Entrata nomines:',
    'Input Names:':
        'Entrata nomines:',
    'input list:':
        'Entrata Listes:',

    // context menus:
    'help':
        'adjuva',

    // palette:
    'hide primitives':
        'cela primativos',
    'show primitives':
        'expone primativos',

    // blocks:
    'help...':
        'adjunta...',
    'relabel...':
        'redacto etiquettas...',
    'duplicate':
        'duplica',
    'make a copy\nand pick it up':
        'duplica e prende in mano',
    'only duplicate this block':
        'duploca solo esto bloco',
    'delete':
        'dele',
    'script pic...':
        'scripte pictura...',
    'open a new window\nwith a picture of this script':
        'Aperte fenestra nove\n'
        + 'con pictura de este scripte',
    'ringify':
        'Anulamento',
    'unringify':
        'Disanulamento',

    // custom blocks:
    'delete block definition...':
        'dele definition del bloco',
    'edit...':
        'edita...',

    // sprites:
    'edit':
        'edita',
    'move':
        'move',
    'detach from':
        'distacca de',
    'detach all parts':
        'distacca omni partes',
    'export...':
        'exporta...',

    // stage:
    'show all':
        'monstra omni',
    'pic...':
        'pictura...',
    'open a new window\nwith a picture of the stage':
        'expone nove fenestra\n'
		+ 'con pictura del scena',

    // scripting area
    'clean up':
        'abluenta',
    'arrange scripts\nvertically':
        'presentar scriptes\n' + 'verticalitate',
    'add comment':
        'adde un commento',
    'undrop':
        'disdepone',
    'undo the last\nblock drop\nin this pane':
        'disfacer bloco depone antea\n'
		+ 'in este pannello',
    'scripts pic...':
        'scriptes pictura...',
    'open a new window\nwith a picture of all scripts':
        'expone nove fenestra\n'
		+ 'con pictura del omni scriptes',
    'make a block...':
        'face un bloco...',

    // costumes
    'rename':
        'edita le nomine',
    'export':
        'exporta',
    'rename costume':
        'edita le nomine del costume',

    // sounds
    'Play sound':
        'Sona le sono',
    'Stop sound':
        'Arresta sono',
    'Stop':
        'Halto',
    'Play':
        'Sona',
    'rename sound':
        'Edita le nomine del sono',

    // dialogs
    // buttons
    'OK':
        'OK',
    'Ok':
        'OK',
    'Cancel':
        'Revoca',
    'Yes':
        'Si',
    'No':
        'Non',

    // help
    'Help':
        'Adjuta',

    // zoom blocks
    'Zoom blocks':
        'Zoom blocos',
    'build':
        'edifica',
    'your own':
        'vostre',
    'blocks':
        'blocos',
    'normal (1x)':
        'normal (1x)',
    'demo (1.2x)':
        'por demonstration (1.2x)',
    'presentation (1.4x)':
        'por presentation (1.4x)',
    'big (2x)':
        'grande (2x)',
    'huge (4x)':
        'grosse (4x)',
    'giant (8x)':
        'gigante (8x)',
    'monstrous (10x)':  // 'monstruose'
        'maxima (10x)',

    // Project Manager
    'Untitled':
        'Nulle titulo',  // 'Innominate'
    'Open Project':
        'Aperte Projecto',
    '(empty)':
        '(vacue)',
    'Saved!':
        'Secur!',  // 'Faceva secur per salvo a file'
    'Delete Project':
        'Dele Projecto',
    'Are you sure you want to delete':
        'A certe que vos vole a dele?',
    'rename...':
        'Edita le nomine...',

    // costume editor
    'Costume Editor':
        'Costume Editor',
    'click or drag crosshairs to move the rotation center':
        'clicca o trahe capilo cruce \n'
        + 'a move le centro de rotation',

    // project notes
    'Project Notes':
        'Annotos del projecto',

    // new project
    'New Project':
        'Projecto Nove',
    'Replace the current project with a new one?':
        'A surroga le projecto existente pro un nove?',

    // save project
    'Save Project As...':
        'Secur Projecto Como...',

    // export blocks
    'Export blocks':
        'Exporta blocos',
    'Import blocks':
        'Importa blocos',
    'this project doesn\'t have any\ncustom global blocks yet':
        'esti projecto no trova\n'
        + 'blocos artificiose global',
    'select':
        'selecta',
    'none':
        'necun',  // 'necuno'

    // variable dialog
    'for all sprites':
        'por omni spiritos',
    'for this sprite only':
        'solo por este spirito',

    // block dialog
    'Change block':
        'Cambia bloco',
    'Command':
        'Commando',
    'Reporter':
        'Reporter',
    'Predicate':
        'Proposition',

    // block editor
    'Block Editor':
        'Editor de blocos',
    'Apply':
        'Applica',

    // block deletion dialog
    'Delete Custom Block':
        'Dele bloco artificiose',
    'block deletion dialog text':
        'Edita bloco dele dialogo texto',  //??

    // input dialog
    'Create input name':
        'Crea entrata nomine',
    'Edit input name':
        'Edita entrata nomine',
    'Edit label fragment':
        'Edita etiquetta fragmento',  // 'Edit texto clasma'
    'Title text':
        'Titulo texto',
    'Input name':
        'Entrata nomine',
    'Delete':
        'Dele',
    'Object':
        'Objecto',
    'Number':
        'Numero',
    'Text':
        'Texto',
    'List':
        'Liste',
    'Any type':
        'Qualcunque Typo',
    'Boolean (T/F)':
        'Ver o False (V/F)',
    'Command\n(inline)':
        'Commando\n(in linea)',
    'Command\n(C-shape)':
        'Commando\n(C-forma)',
    'Any\n(unevaluated)':
        'Qualcunque\n(non-evaluta)',
    'Boolean\n(unevaluated)':
        'Ver o False\n(non-evaluta)',
    'Single input.':
        'Sol entrata',
    'Default Value:':
        'Valor predefiniva:', // normal
    'Multiple inputs (value is list of inputs)':
        'entrata plure (valor es lista)',  // 'aliquot'
    'Upvar - make internal variable visible to caller':
        'Cassa in Alto - face cassa interne visible a evocator', 

    // About Snap
    'About Snap':
        'in re Snap',
    'Back...':
        'a retro!...',
    'License...':
        'Licentia...',
    'Modules...':
        'Modulos...',
    'Credits...':
        'Credito...',
    'Translators...':
        'Traductores...',
    'License':
        'Licentia',
    'current module versions:':
        'currente modulo versiones',
    'Contributors':
        'Contribuentes',
    'Translations':
        'Traductiones..',

    // variable watchers (observa loco de valores = cassa)
    'normal':
        'normal',
    'large':
        'grande',
    'slider':
        'glissator',
    'slider min...':
        'glissator minime...',
    'slider max...':
        'glissator maxime...',
    'import...':
        'importa...',
    'Slider minimum value':
        'glissator minime valor',
    'Slider maximum value':
        'glissator maxime valor',

    // list watchers
    'length: ':
        'Longor: ',

    // coments
    'add comment here...':
        'adde commento hic',

    // drow downs
    // directions
    '(90) right':
        '(90) dextera',
    '(-90) left':
        '(-90) sinistra',
    '(0) up':
        '(0) alto',
    '(180) down':
        '(180) basso',

    // collision detection
    'mouse-pointer':
        'mure punctator',
    'edge':
        'bordo talia',
    'pen trails':
        'penna tracia',

    // costumes
    'Turtle':
        'Tortuca',
    'Empty':
        'Vacue',

    // graphical effects
    'brightness':
        'brillantia', // 'nitor'
    'ghost':
        'apparition',  // 'spectro'
    'negative':
        'negative',
    'comic':
        'comic',
    'confetti':
        'confetti',

    // keys
    'space':
        'spatio vacue',
    'up arrow':
        'alto flecha',  // 'sagitta'
    'down arrow':
        'basso flecha',
    'right arrow':
        'dextera flecha',
    'left arrow':
        'sinistra flecha',
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
        'q',
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
        'w',
    'x':
        'x',
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
        'Nove...',

    // math functions
    'abs':
        'abs',
    'floor':
        'floor',
    'sqrt':
        'sqrt',
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
        'character',
    'whitespace':
        'spatio blanco',  // spatio vacue'
    'line':
        'linea',
    'tab':
        'tabulator',
    'cr':
        'fin de linea',

    // data types
    'number':
        'Numero',
    'text':
        'Texto',
    'Boolean':
        'Ver o False',
    'list':
        'Lista',
    'command':
        'Commando',
    'reporter':
        'Reporter',
    'predicate':
        'Proposition',

    // list indices
    'last':
        'ultime',
    'any':
        'alcuno'  // 'qualcun'
};
