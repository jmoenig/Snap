/*

    lang-et.js

    Estonian translation for SNAP!

    written by Hasso Tepper

    Copyright (C) 2014 by Jens Mönig

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

*/

/*global SnapTranslator*/

SnapTranslator.dict.et = {

    // translations meta information
    'language_name':
        'Eesti', // the name as it should appear in the language menu
    'language_translator':
        'Hasso Tepper', // your name for the Translators tab
    'translator_e-mail':
        'hasso.tepper@gmail.com', // optional
    'last_changed':
        '2016-03-01', // this, too, will appear in the Translators tab

    // GUI
    // control bar:
    'untitled':
        'Nimetu',
    'development mode':
        'Arendusrežiim',

    // categories:
    'Motion':
        'Liikumine',
    'Looks':
        'Välimus',
    'Sound':
        'Heli',
    'Pen':
        'Pliiats',
    'Control':
        'Juhtimine',
    'Sensing':
        'Taju',
    'Operators':
        'Operaatorid',
    'Variables':
        'Muutujad',
    'Lists':
        'Loendid',
    'Other':
        'Muud',

    // editor:
    'draggable':
        'Hiirega lohistatav',

    // tabs:
    'Scripts':
        'Skriptid',
    'Costumes':
        'Kostüümid',
    'Sounds':
        'Helid',

    // names:
    'Sprite':
        'Sprait',
    'Stage':
        'Taust',

    // rotation styles:
    'don\'t rotate':
        'Ei pöörle üldse',
    'can rotate':
        'Saab vabalt pöörelda',
    'only face left/right':
        'Saab osutada ainult paremale ja vasakule',

    // new sprite button:
    'add a new sprite':
        'Lisa uus sprait',

    // tab help
    'costumes tab help':
	'Pilte saad Snapi\'i lisada lohistades neid\n'
	    + 'oma arvutist või veebilehtedelt siia.',
    'import a sound from your computer\nby dragging it into here':
        'Helifaile saad Snap\'i lisada lohistades\n'
            + 'neid oma arvutist siia.',

    // primitive blocks:

    // motion:
    'Stage selected:\nno motion primitives':
        'Hetkel on valitud taust\nja sellel liikumiskäske pole.',

    'move %n steps':
        'liigu %n sammu',
    'turn %clockwise %n degrees':
        'pööra %clockwise %n kraadi',
    'turn %counterclockwise %n degrees':
        'pööra %counterclockwise %n kraadi',
    'point in direction %dir':
        'osuta suunda %dir',
    'point towards %dst':
        'osuta %dst suunas',
    'go to x: %n y: %n':
        'liigu punkti x: %n y: %n',
    'go to %dst':
        'liigu %dst juurde',
    'glide %n secs to x: %n y: %n':
        'liigu %n s punkti x: %n y: %n',
    'change x by %n':
        'muuda x väärtust %n võrra',
    'set x to %n':
        'määra x väärtuseks %n',
    'change y by %n':
        'muuda y väärtust %n võrra',
    'set y to %n':
        'määra y väärtuseks %n',
    'if on edge, bounce':
        'kui serval, põrka tagasi',
    'x position':
        'asukoht x-teljel',
    'y position':
        'asukoht y-teljel',
    'direction':
        'suund',

    // looks:
    'switch to costume %cst':
        'vaheta kostüümiks %cst',
    'next costume':
        'järgmine kostüüm',
    'costume #':
        'kostüümi nr',
    'say %s for %n secs':
        'ütle %s %n sekundit',
    'say %s':
        'ütle %s',
    'think %s for %n secs':
        'mõtle %s %n sekundit',
    'think %s':
        'mõtle %s',
    'Hello!':
        'Tere!',
    'Hmm...':
        'Hmm ...',
    'change %eff effect by %n':
        'muuda efekti %eff %n võrra',
    'set %eff effect to %n':
        'määra efekti %eff väärtuseks %n',
    'clear graphic effects':
        'eemalda graafikaefektid',
    'change size by %n':
        'muuda suurust %n võrra',
    'set size to %n %':
        'määra suuruseks %n %',
    'size':
        'suurus',
    'show':
        'näita',
    'hide':
        'peida',
    'go to front':
        'too ette',
    'go back %n layers':
        'vii %n kihti tahapoole',

    'development mode \ndebugging primitives:':
        'Arendusrežiimi \nsilumismeetodid:',
    'console log %mult%s':
        'Kirjuta konsoolile: %mult%s',
    'alert %mult%s':
        'Popup dialoog: %mult%s',

    // sound:
    'play sound %snd':
        'mängi heli %snd',
    'play sound %snd until done':
        'mängi heli %snd lõpuni',
    'stop all sounds':
        'peata kõigi helide mängimine',
    'rest for %n beats':
        'paus %n lööki',
    'play note %n for %n beats':
        'noot %n %n lööki',
    'change tempo by %n':
        'muuda tempot %n võrra',
    'set tempo to %n bpm':
        'määra tempoks %n lööki/min',
    'tempo':
        'tempo',

    // pen:
    'clear':
        'puhasta',
    'pen down':
        'pliiats alla',
    'pen up':
        'pliiats üles',
    'set pen color to %clr':
        'määra pliiatsi värviks %clr',
    'change pen color by %n':
        'muuda pliiatsi värvi %n võrra',
    'set pen color to %n':
        'määra pliiatsi värviks %n',
    'change pen shade by %n':
        'muuta pliiatsi heledust %n võrra.',
    'set pen shade to %n':
        'määra pliiatsi heleduseks %n %',
    'change pen size by %n':
        'muuta pliiatsi jämedust %n võrra',
    'set pen size to %n':
        'määra pliiatsi jämeduseks %n',
    'stamp':
        'tempel',
    'fill':
        'täida värviga',

    // control:
    'when %greenflag clicked':
        'kui vajutatakse %greenflag',
    'when %keyHat key pressed':
        'kui vajutatakse klahvi %keyHat',
    'when I am %interaction':
        'kui minul %interaction',
    'clicked':
        'vajutatakse hiirega',
    'pressed':
        'vajutatakse klahvi',
    'dropped':
        'kukutatakse',
    'mouse-entered':
        'hiirekursor saabub',
    'mouse-departed':
        'hiirekursor lahkub',
    'when %b':
        'kui %b',
    'when I receive %msgHat':
        'kui saan teate %msgHat',
    'broadcast %msg':
        'saada teade %msg',
    'broadcast %msg and wait':
        'saada teade %msg ja oota',
    'Message name':
        'Teate nimi',
    'message':
        'teade',
    'any message':
        'Mistahes teade',
    'wait %n secs':
        'oota %n sekundit',
    'wait until %b':
        'oota kuni %b',
    'forever %loop':
        'lõputult %loop',
    'repeat %n %loop':
        'korda %n korda %loop',
    'repeat until %b %loop':
        'korda kuni %b %loop',
    'if %b %c':
        'kui %b %c',
    'if %b %c else %c':
        'kui %b %c vastasel juhul %c',
    'report %s':
        'tagasta %s',
    'stop %stopChoices':
        'lõpeta %stopChoices',
    'all':
        'kõik tööd',
    'this script':
        'selle skripti töö',
    'this block':
        'selle ploki töö',
    'stop %stopOthersChoices':
        'lõpeta %stopOthersChoices',
    'all but this script':
        'kõigi teiste skriptide töö',
    'other scripts in sprite':
        'kõigi selle spraidi teiste skriptide töö',
    'pause all %pause':
        'peata kõik %pause',
    'run %cmdRing %inputs':
        'käivita %cmdRing %inputs',
    'launch %cmdRing %inputs':
        'käivita taustal %cmdRing %inputs',
    'call %repRing %inputs':
        'kutsu välja %repRing %inputs',
    'run %cmdRing w/continuation':
        'käivita jätkuga %cmdRing',
    'call %cmdRing w/continuation':
        'kutsu jätkuga välja %cmdRing',
    'warp %c':
        'warpkiirusega %c',
    'when I start as a clone':
        'kui alustan kloonina',
    'create a clone of %cln':
        'tekita %cln kloon',
    'myself':
        'minu',
    'delete this clone':
        'kustuta see kloon',

    // sensing:
    'touching %col ?':
        'kas puudutab objekti %col ?',
    'touching %clr ?':
        'kas puudutab värvi %clr ?',
    'color %clr is touching %clr ?':
        'kas värv %clr puudutab värvi %clr ?',
    'ask %s and wait':
        'küsi %s ja oota',
    'what\'s your name?':
        'Mis su nimi on?',
    'answer':
        'vastus',
    'mouse x':
        'hiire asukoht x-teljel',
    'mouse y':
        'hiire asukoht y-teljel',
    'mouse down?':
        'kas hiire nupp on all?',
    'key %key pressed?':
        'kas klahv %key on all?',
    'distance to %dst':
        'kaugus objektini %dst',
    'reset timer':
        'nulli taimer',
    'timer':
        'taimer',
    '%att of %spr':
        '%att kostüümil %spr',
    'http:// %s':
        'http:// %s',
    'turbo mode?':
        'turborežiim?',
    'set turbo mode to %b':
        'määra turborežiimi väärtuseks %b',

    'filtered for %clr':
        'filtered for %clr',
    'stack size':
        'pinu suurus',
    'frames':
        'frames',

    // operators:
    '%n mod %n':
        '%n / %n jääk',
    'round %n':
        'ümardatud %n',
    '%fun of %n':
        '%fun %n',
    'pick random %n to %n':
        'juhuslik arv %n ja %n vahel',
    '%b and %b':
        '%b ja %b',
    '%b or %b':
        '%b või %b',
    'not %b':
        'pole %b',
    'true':
        'tõene',
    'false':
        'väär',
    'join %words':
        'ühendatud %words',
    'split %s by %delim':
        'tükeldatud %s kohalt %delim',
    'hello':
        'Tere',
    'world':
        'maailm',
    'letter %idx of %s':
        'sümbol nr %idx tekstis %s',
    'length of %s':
        'teksti %s pikkus',
    'unicode of %s':
        '%s Unicode',
    'unicode %n as letter':
        'Unicode %n sümbol',
    'is %s a %typ ?':
        'on %s %typ ?',
    'is %s identical to %s ?':
        'on %s sama kui %s ?',

    'type of %s':
        '%s tüüp',

    // variables:
    'Make a variable':
        'Uus muutuja',
    'Variable name':
        'Muutuja nimi',
    'Script variable name':
        'Skriptimuutuja nimi',
    'Delete a variable':
        'Kustuta muutuja',

    'set %var to %s':
        'aseta muutujasse %var väärtus %s',
    'change %var by %n':
        'muuda muutujat %var %n võrra',
    'show variable %var':
        'näita muutujat %var',
    'hide variable %var':
        'peida muutuja %var',
    'script variables %scriptVars':
        'skriptimuutujad %scriptVars',

    // lists:
    'list %exp':
        'loend %exp',
    '%s in front of %l':
        '%s loendi %l algusesse',
    'item %idx of %l':
        '%idx kirje loendis %l',
    'all but first of %l':
        'kõik kirjed peale esimese loendis %l',
    'length of %l':
        'loendi %l pikkus',
    '%l contains %s':
        '%l sisaldab %s',
    'thing':
        'midagi',
    'add %s to %l':
        'lisa %s loendisse %l',
    'delete %ida of %l':
        'kustuta %ida kirje(d) loendist %l',
    'insert %s at %idx of %l':
        'lisa %s asukohta %idx loendis %l',
    'replace item %idx of %l with %s':
        'asenda %idx kirje loendis %l väärtusega %s',

    // other
    'Make a block':
        'Uus plokk',

    // menus
    // snap menu
    'About...':
        'Snap! info ...',
    'Reference manual':
        'Reference manual',
    'Snap! website':
        'Snap! koduleht',
    'Download source':
        'Laadi lähtekood alla',
    'Switch back to user mode':
        'Tagasi kasutajarežiimi',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'Lülitab Morphic kontekstmenüüd välja,\net kasutajasõbralikke näidata.',
    'Switch to dev mode':
        'Lülitu arendusrežiimi',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'Lülitab sisse Morphic kontekstmenüüd\nja inspektorid. See pole kasutajale.',

    // project menu
    'Project notes...':
        'Projekti märkmed ...',
    'New':
        'Uus',
    'Open...':
        'Ava ...',
    'Save':
        'Salvesta',
    'Save to disk':
        'Salvesta kettale',
    'store this project\nin the downloads folder\n(in supporting browsers)':
        'Salvestab selle projekti\nallalaadimiste kausta\n(kui brauser seda toetab).\n',
    'Save As...':
        'Salvesta kui ...',
    'Import...':
        'Import ...',
    'file menu import hint':
        'Eksporditud projekti,\nplokkide teegi, kostüümi\nvõi heli laadimine.',
    'Export project as plain text...':
        'Ekspordi projekt tavatekstiks ...',
    'Export project...':
        'Ekspordi projekt ...',
    'show project data as XML\nin a new browser window':
        'Näitab uues brauseri aknas\nXML vormingus projekti.',
    'Export blocks...':
        'Ekspordi plokid ...',
    'show global custom block definitions as XML\nin a new browser window':
        'Näitab uues brauseri aknas XML vormingus\nkasutaja loodud plokkide definitsioone.',
    'Unused blocks...':
        'Kasutamata plokid ...',
    'find unused global custom blocks\nand remove their definitions':
        'Otsib projektist üles kasutamata kasutaja loodud\nplokid ja eemaldab nende definitsioonid.',
    'Remove unused blocks':
        'Eemalda kasutamata plokid',
    'there are currently no unused\nglobal custom blocks in this project':
        'Selles projektis pole hetkel\nkasutaja loodud kasutamata plokke.',
    'unused block(s) removed':
        'Kasutamata plokid on eemaldatud.',
    'Export summary...':
        'Ekspordi kokkuvõte ...',
    'open a new browser browser window\n with a summary of this project':
        'Avab uue brauseriakna selle\nprojekti kokkuvõttega.',
    'Contents':
        'Sisu',
    'Kind of':
        'Kind of',
    'Part of':
        'Part of',
    'Parts':
        'Osad',
    'Blocks':
        'Plokid',
    'For all Sprites':
        'Kõikidele spraitidele',
    'Import tools':
        'Impordi tööriistad',
    'load the official library of\npowerful blocks':
        'Laadib juurde ametliku võimalusterohke\nplokkide teegi.',
    'Libraries...':
        'Teegid ...',
    'Import library':
        'Impordi teek',

    // cloud menu
    'Login...':
        'Logi sisse ...',
    'Signup...':
        'Tekita konto ...',

    // settings menu
    'Language...':
        'Keel ...',
    'Zoom blocks...':
        'Plokkide suurendus ...',
    'Stage size...':
        'Lava suurus ...',
    'Stage size':
        'Lava suurus',
    'Stage width':
        'Lava laius',
    'Stage height':
        'Lava kõrgus',
    'Default':
        'Vaikeväärtus',
    'Blurred shadows':
        'Udused varjud',
    'uncheck to use solid drop\nshadows and highlights':
        'Konkreetsete piirete kasutamiseks varjudel ja\nesiletõstudel lülita see välja.',
    'check to use blurred drop\nshadows and highlights':
        'Uduste piirete kasutamiseks varjudel ja\nesiletõstudel lülita see sisse.',
    'Zebra coloring':
        'Sebravärvid',
    'check to enable alternating\ncolors for nested blocks':
        'check to enable alternating\ncolors for nested blocks',
    'uncheck to disable alternating\ncolors for nested block':
        'uncheck to disable alternating\ncolors for nested block',
    'Dynamic input labels':
        'Dynamic input labels',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'uncheck to disable dynamic\nlabels for variadic inputs',
    'check to enable dynamic\nlabels for variadic inputs':
        'check to enable dynamic\nlabels for variadic inputs',
    'Prefer empty slot drops':
        'Tühjade pesade eelistamine',
    'settings menu prefer empty slots hint':
        'Funktsioonide lohistamisel ja\nkukutamisel tühjadele pesadele\nkeskendumiseks lülita see sisse.',
    'uncheck to allow dropped\nreporters to kick out others':
        'Et lubada kukutatavatel\nfunktsioonidel teisi oma kohalt\nvälja lüüa, lülita see välja.',
    'Long form input dialog':
        'Long form input dialog',
    'Plain prototype labels':
        'Plain prototype labels',
    'uncheck to always show (+) symbols\nin block prototype labels':
        'uncheck to always show (+) symbols\nin block prototype labels',
    'check to hide (+) symbols\nin block prototype labels':
        'check to hide (+) symbols\nin block prototype labels',
    'check to always show slot\ntypes in the input dialog':
        'check to always show slot\ntypes in the input dialog',
    'uncheck to use the input\ndialog in short form':
        'uncheck to use the input\ndialog in short form',
    'Virtual keyboard':
        'Virtuaalne klaviatuur',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'Mobiilsetel seadmetel virtuaalse\nklaviatuuri kasutamise keelamiseks\nlülita see välja.',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'Mobiilsetel seadmetel virtuaalse\nklaviatuuri kasutamiseks lülita\nsee sisse.',
    'Input sliders':
        'Liugurid sisenditel',
    'uncheck to disable\ninput sliders for\nentry fields':
        'uncheck to disable\ninput sliders for\nentry fields',
    'check to enable\ninput sliders for\nentry fields':
        'check to enable\ninput sliders for\nentry fields',
    'Clicking sound':
        'Klõpsuv heli',
    'uncheck to turn\nblock clicking\nsound off':
        'Plokkide ühendamisel tekkiva\nklõpsuva heli vaigistamiseks\nlülita see välja.',
    'check to turn\nblock clicking\nsound on':
        'Plokkide ühendamisel tekkiva\nklõpsuva heli kuulmiseks\nlülita see sisse.',
    'Animations':
        'Animatsioonid',
    'uncheck to disable\nIDE animations':
        'IDE animatsioonide keelamiseks\nlülita see välja.',
    'Turbo mode':
        'Turbokiirus',
    'check to prioritize\nscript execution':
        'Skriptide jooksutamise eelistamiseks\nlülita see sisse.',
    'uncheck to run scripts\nat normal speed':
        'Skriptide normaalkiirusel jooksutamiseks\nlülita see välja.',
    'check to enable\nIDE animations':
        'IDE-s animatsioonide kasutamiseks\nlülita see sisse.',
    'Flat design':
        'Lame kasutajaliides',
    'Keyboard Editing':
        'Klaviatuurilt muudatuste tegemise tugi',
    'Table support':
        'Tabelite tugi',
    'Table lines':
        'Jooned tabelitel',
    'Thread safe scripts':
        'Skriptide ohutu käivitamine',
    'uncheck to allow\nscript reentrance':
        'Skriptide töö katkestamise ja jätkamise\n(reentrance) lubamiseks lülita see välja.',
    'check to disallow\nscript reentrance':
        'Skriptide töö katkestamise ja jätkamise\n(reentrance) keelamiseks lülita see sisse.',
    'Prefer smooth animations':
        'Sujuvate animatsioonide eelistamine',
    'uncheck for greater speed\nat variable frame rates':
        'Parema kiiruse, kuid kõikuva kaadrisageduse\nkasutamiseks lülita see sisse.',
    'check for smooth, predictable\nanimations across computers':
        'Kui soovid, et animatsioonid oleks kõigil\nplatvormidel sujuvad, lülita see sisse.',
    'Flat line ends':
        'Sirged jooneotsad',
    'check for flat ends of lines':
        'Sirgete jooneotste tekitamiseks lülita see sisse.',
    'uncheck for round ends of lines':
        'Ümarate jooneotste tekitamiseks lülita see välja.',
    'Inheritance support':
        'Pärimise tugi',

    // inputs
    'with inputs':
        'with inputs',
    'input names:':
        'input names:',
    'Input Names:':
        'Input Names:',
    'input list:':
        'input list:',

    // context menus:
    'help':
        'Abi',

    // palette:
    'hide primitives':
        'Peida primitiivid',
    'show primitives':
        'Näita primitiive',

    // blocks:
    'help...':
        'Abi ...',
    'relabel...':
        'Nimeta ümber ...',
    'duplicate':
        'Kopeeri',
    'make a copy\nand pick it up':
        'Tekitab koopia ja korjab selle üles',
    'only duplicate this block':
        'Kopeerib ainult selle ploki',
    'delete':
        'Kustuta',
    'script pic...':
        'Skripti pilt ...',
    'open a new window\nwith a picture of this script':
        'Avab uue akna vaid selle skripti pildiga',
    'ringify':
        'Ümbritse ringiga',
    'unringify':
        'Eemalda ring',
    'transient':
        'Ajutine',
    'uncheck to save contents\nin the project':
        'Sisu projekti salvestamiseks lülita see välja.',
    'check to prevent contents\nfrom being saved':
        'Sisu projekti mitte salvestamiseks lülita see sisse.',

    // custom blocks:
    'delete block definition...':
        'Kustuta ploki definitsioon ...',
    'edit...':
        'Muuda ...',

    // sprites:
    'edit':
        'Muuda',
    'move':
        'Liiguta',
    'detach from':
        'Eralda',
    'detach all parts':
        'Eralda kõik osad',
    'export...':
        'Eksport ...',

    // stage:
    'show all':
        'Näita kõiki',
    'pic...':
        'Pilt ...',
    'open a new window\nwith a picture of the stage':
        'Avab uues aknas lava pildi.',

    // scripting area
    'clean up':
        'Puhasta',
    'arrange scripts\nvertically':
        'Paiguta skriptid vertikaalselt',
    'add comment':
        'Lisa kommentaar',
    'undrop':
        'Tõsta üles',
    'undo the last\nblock drop\nin this pane':
        'Tõstab viimase asetatud\nploki uuesti üles.',
    'scripts pic...':
        'Skriptide pilt ...',
    'open a new window\nwith a picture of all scripts':
        'Avab uues aknas pildi\nkõigi skriptidega.',
    'make a block...':
        'Tekita uus plokk ...',

    // costumes
    'rename':
        'Nimeta ümber',
    'export':
        'Eksport',
    'rename costume':
        'Kostüümi ümbernimetamine',

    // sounds
    'Play sound':
        'Helifaili esitamine',
    'Stop sound':
        'Esitamise peatamine',
    'Stop':
        'Peata',
    'Play':
        'Esita',
    'rename sound':
        'Nimeta ümber',

    // lists and tables
    'list view...':
        'Nimekirja vaade ...',
    'table view...':
        'Tabeli vaade ...',
    'open in dialog...':
        'Ava dialoogis ...',
    'reset columns':
        'Lähtesta veerud',
    'items':
        'Elemendid',

    // dialogs
    // buttons
    'OK':
        'OK',
    'Ok':
        'OK',
    'Cancel':
        'Loobu',
    'Yes':
        'Jah',
    'No':
        'Ei',

    // help
    'Help':
        'Abi',

    // zoom blocks
    'Zoom blocks':
        'Plokkide suurendus',
    'build':
        'ehita',
    'your own':
        'ise oma',
    'blocks':
        'plokid',
    'normal (1x)':
        'normaalsed (1x)',
    'demo (1.2x)':
        'demo (1.2x)',
    'presentation (1.4x)':
        'esitus (1.4x)',
    'big (2x)':
        'suured (2x)',
    'huge (4x)':
        'väga suured (4x)',
    'giant (8x)':
        'hiiglaslikud (8x)',
    'monstrous (10x)':
        'koletud (10x)',

    // Project Manager
    'Untitled':
        'Nimetu',
    'Open Project':
        'Ava projekt',
    '(empty)':
        '(tühi)',
    'Saved!':
        'Salvestatud.',
    'Delete Project':
        'Kustuta projekt',
    'Are you sure you want to delete':
        'Oled kindel, et soovid projekti kustutada?',
    'rename...':
        'Nimeta ümber ...',

    // costume editor
    'Costume Editor':
        'Kostüümi redaktor',
    'click or drag crosshairs to move the rotation center':
        'Pöörlemiskeskme muutmiseks lohista risti.',

    // project notes
    'Project Notes':
        'Projekti märkmed',

    // new project
    'New Project':
        'Uus projekt',
    'Replace the current project with a new one?':
        'Kas asendada see projekt uuega?',

    // save project
    'Save Project As...':
        'Salvesta projekt kui ...',

    // export blocks
    'Export blocks':
        'Plokkide eksport',
    'Import blocks':
        'Plokkide import',
    'this project doesn\'t have any\ncustom global blocks yet':
	'Selles projektis pole veel ühtegi omaloodud plokki.',
    'select':
        'select',
    'none':
        'none',

    // variable dialog
    'for all sprites':
        'Kõigile spraitidele',
    'for this sprite only':
        'Ainult sellele spraidile',

    // block dialog
    'Change block':
        'Ploki muutmine',
    'Command':
        'Käsk',
    'Reporter':
        'Funktsioon',
    'Predicate':
        'Predikaat',

    // block editor
    'Block Editor':
        'Ploki redaktor',
    'Apply':
        'Rakenda',

    // block deletion dialog
    'Delete Custom Block':
        'Kustuta omaloodud plokk',
    'block deletion dialog text':
        'Kas kustutada see plokk ja kõik selle koopiad?',


    // input dialog
    'Create input name':
        'Argumendi loomine',
    'Edit input name':
        'Argumendi muutmine',
    'Edit label fragment':
        'Ploki fragmendi muutmine',
    'Title text':
        'Nimi',
    'Input name':
        'Argument',
    'Delete':
        'Kustuta',
    'Object':
        'Objekt',
    'Number':
        'Arv',
    'Text':
        'Tekst',
    'List':
        'Loend',
    'Any type':
        'Mistahes tüüpi',
    'Boolean (T/F)':
        'Tõeväärtus',
    'Command\n(inline)':
        'Käsuplokk',
    'Command\n(C-shape)':
        'Käsuplokk\n(C-kujuline)',
    'Any\n(unevaluated)':
        'Mistahes tüüp\n(ei arvestata)',
    'Boolean\n(unevaluated)':
        'Tõeväärtus\n(eo arvestata)',
    'Single input.':
        'Üksik sisend.',
    'Default Value:':
        'Vaikeväärtus:',
    'Multiple inputs (value is list of inputs)':
        'Mitu sisendit (sisendite loend)',
    'Upvar - make internal variable visible to caller':
        'Sisemine muutuja tehakse väljakutsujale nähtavaks',

    // About Snap
    'About Snap':
        'Snap! info',
    'Back...':
        'Tagasi ...',
    'License...':
        'Litsents ...',
    'Modules...':
        'Moodulid ...',
    'Credits...':
        'Tänud ...',
    'Translators...':
        'Tõlkijad ...',
    'License':
        'Litsents',
    'current module versions:':
        'Hetkel kasutusel olevad moodulid:',
    'Contributors':
        'Kaastööd teinud',
    'Translations':
        'Tõlkijad',

    // variable watchers
    'normal':
        'Tavaline',
    'large':
        'Suur',
    'slider':
        'Liugur',
    'slider min...':
        'Miinimum ...',
    'slider max...':
        'Maksimum ...',
    'import...':
        'Import ...',
    'Slider minimum value':
        'Liuguri miinimumväärtus',
    'Slider maximum value':
        'Liuguri maksimumväärtus',

    // list watchers
    'length: ':
        'pikkus: ',

    // coments
    'add comment here...':
        'Kommentaarid kirjuta siia ...',

    // drow downs
    // directions
    '(90) right':
        '(90) paremale',
    '(-90) left':
        '(-90) vasakule',
    '(0) up':
        '(0) üles',
    '(180) down':
        '(180) alla',

    // collision detection
    'mouse-pointer':
        'hiirekursori',
    'edge':
        'serva',
    'pen trails':
        'pliiatsi joone',

    // costumes
    'Turtle':
        'Nool',
    'Empty':
        'Tühi',

    // graphical effects
    'brightness':
        'heledus',
    'ghost':
        'läbipaistvus',
    'negative':
        'negatiiv',
    'comic':
        'muaree',
    'confetti':
        'värvimuutus',

    // keys
    'space':
        'tühik',
    'up arrow':
        'nool üles',
    'down arrow':
        'nool alla',
    'right arrow':
        'nool paremale',
    'left arrow':
        'nool vasakule',
    'any key':
        'mistahes klahv',
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
        'Uus ...',

    // math functions
    'abs':
        'absoluutväärtus',
    'ceiling':
        'ümardamine üles',
    'floor':
        'ümardamine alla',
    'sqrt':
        'ruutjuur',
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
        'sümbol',
    'whitespace':
        'tühik',
    'line':
        'realõpp (lf)',
    'tab':
        'tabulaator (tab)',
    'cr':
        'reavahetus (cr)',

    // data types
    'number':
        'arv',
    'text':
        'tekst',
    'Boolean':
        'tõeväärtus',
    'list':
        'loend',
    'command':
        'käsuplokk',
    'reporter':
        'funktsioon',
    'predicate':
        'predikaat',

    // list indices
    'last':
        'viimane',
    'any':
        'mistahes',

    // Saksa keele failist puuduvad stringid
    'grow':
        'Suurenda',
    'shrink':
        'Vähenda',
    'flip ↔':
        'Flipi ↔',
    'flip ↕':
        'Flipi ↕',
    'Export all scripts as pic...':
        'Ekspordi kõik skriptid pilti ...',
    'show a picture of all scripts\nand block definitions':
        'Näitab pilti kõigi skriptide\nja plokkide definitsioonidega.',
    'current %dates':
        'current %dates',
    'year':
        'year',
    'month':
        'month',
    'date':
        'date',
    'day of week':
        'day of week',
    'hour':
        'hour',
    'minute':
        'minute',
    'second':
        'second',
    'time in milliseconds':
        'aeg (ms)',
    'find blocks...':
        'Otsi plokke ...',
    'costume name':
        'kostüümi nimi',
    'Open':
        'Ava',
    'Share':
        'Jaga',
    'Snap!Cloud':
        'Snap! pilv',
    'Cloud':
        'Pilv',
    'could not connect to:':
        'Ühendust ei õnnestunud luua:',
    'Service:':
        'Teenus:',
    'login':
        'login',
    'ERROR: INVALID PASSWORD':
        'VIGA: VALE PAROOL',
    'Browser':
        'Brauser',
    'Sign up':
        'Sign up',
    'Signup':
        'Signup',
    'Sign in':
        'Logi sisse',
    'Logout':
        'Logi välja',
    'Change Password...':
        'Muuda parooli ...',
    'Change Password':
        'Parooli muutmine',
    'Account created.':
        'Konto on loodud.',
    'An e-mail with your password\nhas been sent to the address provided':
        'E-kiri parooliga saadeti sinu\nantud aadressile.',
    'now connected.':
        'now connected.',
    'disconnected.':
        'disconnected.',
    'Reset password':
        'Parooli lähtestamine',
    'Reset Password...':
        'Lähtesta parool ...',
    'User name:':
        'Kasutajanimi:',
    'Password:':
        'Parool:',
    'Old password:':
        'Kehtiv parool:',
    'New password:':
        'Uus parool:',
    'Repeat new password:':
        'Uue parooli kordus:',
    'Birth date:':
        'Sünnikuupäev:',
    'January':
        'jaanuar',
    'February':
        'veebruar',
    'March':
        'märts',
    'April':
        'áprill',
    'May':
        'mai',
    'June':
        'juuni',
    'July':
        'juuli',
    'August':
        'august',
    'September':
        'september',
    'October':
        'oktoober',
    'November':
        'november',
    'December':
        'detsember',
    'year:':
        'aasta:',
    ' or before':
        ' or before',
    'E-mail address:':
        'E-posti aadress:',
    'E-mail address of parent or guardian:':
        'Lapsevanema või hooldaja e-posti aadress:',
    'Terms of Service...':
        'Teenuse Tingimused ...',
    'Privacy...':
        'Privaatsus ...',
    'I have read and agree\nto the Terms of Service':
        'Ma olen Teenuse Tingimusi lugenud\nja nendega nõustunud',
    'stay signed in on this computer\nuntil logging out':
        'stay signed in on this computer\nuntil logging out',
    'please fill out\nthis field':
        'Palun täida\nsee väli.',
    'User name must be four\ncharacters or longer':
        'Kasutajanimes peab olema\nvähemalt neli sümbolit.',
    'please provide a valid\nemail address':
        'Palun sisesta korrektne\ne-posti aadress.',
    'password must be six\ncharacters or longer':
        'Paroolis peab olema\nvähemalt kuus sümbolit.',
    'passwords do\nnot match':
        'Paroolid ei kattu.',
    'please agree to\nthe TOS':
        'Palun nõustu teenuse tingimustega.',
    'Examples':
        'Näited',
    'You are not logged in':
        'Sa pole end sisse loginud',
    'Updating\nproject list...':
        'Projektide nimekirja uuendamine ...',
    'Opening project...':
        'Projekti avamine ...',
    'Fetching project\nfrom the cloud...':
        'Projekti allalaadimine\npilvest ...',
    'Saving project\nto the cloud...':
        'Projekti salvestamine\npilve ...',
    'Sprite Nesting':
        'Sprite Nesting',
    'uncheck to disable\nsprite composition':
        'uncheck to disable\nsprite composition',
    'Codification support':
        'Kodifitseerimise tugi',
    'check for block\nto text mapping features':
        'Kui soovid kasutada plokkide tekstiks\nteisendamist, lülita see sisse.',
    'saved.':
        'salvestatud.',
    'options...':
        'valikud ...',
    'read-only':
        'ainult loetav',
    'Input Slot Options':
        'Input Slot Options',
    'Enter one option per line.Optionally use "=" as key/value delimiter\ne.g.\n   the answer=42':
        'Enter one option per line.Optionally use "=" as key/value delimiter\ne.g.\n   the answer=42',
    'paint a new sprite':
        'paint a new sprite',
    'Paint a new costume':
        'Paint a new costume',
    'add a new Turtle sprite':
        'add a new Turtle sprite',
    'Flat design':
        'Lame kasutajaliides',
    'check for alternative\nGUI design':
        'Alternatiivse kasutajaliidese disaini\nkasutamiseks lülita see sisse.',
    'Rasterize SVGs':
        'SVG-de rasteriseerimine',
    'check to rasterize\nSVGs on import':
        'SVG graafika rasteriseerimiseks\nimpordil lülita see sisse.',
    'comment pic...':
        'megjegyzés képe…',
    'open a new window\nwith a picture of this comment':
        'új ablak megnyitása\nennek a megjegyzésnek a képével',
    'undo':
        'Võta tagasi',
    'Brush size':
        'Joone laius',
    'Constrain proportions of shapes?\n(you can also hold shift)':
        'Soovid kujundi proportsioone piirata?\n(proovi SHIFT klahvi all hoida)',
    'Eraser tool':
        'Kustukumm',
    'Paintbrush tool\n(free draw)':
        'Vabakäe joonistamine',
    'Line tool\n(shift: vertical/horizontal)':
        'Joon\n(shift: vertikaalne/horisontaalne)',
    'Stroked Rectangle\n(shift: square)':
        'Ristkülik\n(shift: ruut)',
    'Filled Rectangle\n(shift: square)':
        'Täidetud ristkülik\n(shift: ruut)',
    'Stroked Ellipse\n(shift: circle)':
        'Ellips\n(shift: ring)',
    'Filled Ellipse\n(shift: circle)':
        'Täidetud ellips\n(shift: ring)',
    'Fill a region':
        'Ala täitmine',
    'Set the rotation center':
        'Pöörlemiskeskme määramine',
    'Pipette tool\n(pick a color anywhere)':
        'Pipett\n(värvi võtmine)',
    'Paint Editor':
        'Joonistusala',
    'square':
        'ruut',
    'pointRight':
        'pointRight',
    'gears':
        'gears',
    'file':
        'file',
    'fullScreen':
        'fullScreen',
    'normalScreen':
        'normalScreen',
    'smallStage':
        'smallStage',
    'normalStage':
        'normalStage',
    'turtle':
        'kilpkonn',
    'stage':
        'lava',
    'turtleOutline':
        'turtleOutline',
    'pause':
        'paus',
    'flag':
        'lipp',
    'octagon':
        'octagon',
    'cloud':
        'pilv',
    'cloudOutline':
        'cloudOutline',
    'cloudGradient':
        'cloudGradient',
    'turnRight':
        'turnRight',
    'turnLeft':
        'turnLeft',
    'storage':
        'storage',
    'poster':
        'poster',
    'flash':
        'flash',
    'brush':
        'brush',
    'rectangle':
        'ristkülik',
    'rectangleSolid':
        'täidetud ristkülik',
    'circle':
        'ring',
    'circleSolid':
        'täidetud ring',
    'crosshairs':
        'crosshairs',
    'paintbucket':
        'värviämber',
    'eraser':
        'kustukumm',
    'pipette':
        'Pipett',
    'speechBubble':
        'jutumull',
    'speechBubbleOutline':
        'speechBubbleOutline',
    'arrowUp':
        'arrowUp',
    'arrowUpOutline':
        'arrowUpOutline',
    'arrowLeft':
        'arrowLeft',
    'arrowLeftOutline':
        'arrowLeftOutline',
    'arrowDown':
        'arrowDown',
    'arrowDownOutline':
        'arrowDownOutline',
    'arrowRight':
        'arrowRight',
    'arrowRightOutline':
        'arrowRightOutline',
    'robot':
        'robot',
    'turn pen trails into new costume...':
        'turn pen trails into new costume...',
    'turn all pen trails and stamps\ninto a new costume for the\ncurrently selected sprite':
        'turn all pen trails and stamps\ninto a new costume for the\ncurrently selected sprite',
    'pen':
        'Pliiats',
    'tip':
        'Tipus',
    'middle':
        'Keskkohas',
    'last changed':
        'Viimati muudetud',
    'Are you sure you want to publish':
        'Oled sa kindel, et soovid avaldalda?',
    'Are you sure you want to unpublish':
        'Oled sa kindel, et soovid avaldamise lõpetada?',
    'Share Project':
        'Projekti jagamine',
    'Unshare Project':
        'Projekti jagamise lõpetamine',
    'sharing\nproject...':
        'Projekti\njagamine ...',
    'unsharing\nproject...':
        'Projekti jagamise\nlõpetamine ...',
    'shared.':
        'jagatud.',
    'unshared.':
        'jagamine lõpetatud.',
    'Unshare':
        'Lõpeta jagamine',
    'password has been changed.':
        'parool on muudetud.',
    'SVG costumes are\nnot yet fully supported\nin every browser':
        'SVG kostüümid pole veel kõigis brauserites täielikult toetatud.',
    'Save Project':
        'Projekti salvestamine',
    'script pic with result...':
        'script pic with result...',
    'open a new window\nwith a picture of both\nthis script and its result':
        'open a new window\nwith a picture of both\nthis script and its result',
    'JavaScript function ( %mult%s ) { %code }':
        'JavaScript funktsioon ( %mult%s ) { %code }',
    'Select categories of additional blocks to add to this project.':
        'Select categories of additional blocks to add to this project.',
    'Import sound':
        'Helide import',
    'Select a sound from the media library':
        'Helifaili valimine meediateegist.',
    'Import':
        'Import -',
    'Select a costume from the media library':
        'Kostüümi valimine meediateegist.',
    'edit rotation point only...':
        'edit rotation point only...',
    'Export Project As...':
        'Projekti eksport kui ...',
    'a variable of name \'':
        'muutujat nimega „',
    '\'\ndoes not exist in this context':
        '“\nselles kontekstis ei eksisteeri',
    '(temporary)':
        '(ajutine)',
    'expecting':
        'Oodati',
    'input(s), but getting':
        'sisendit/sisendeid, kuid saadi',

    // code
    'map %cmdRing to %codeKind %code':
        'map %cmdRing to %codeKind %code',
    'map String to code %code':
        'map String to code %code',
    'map %codeListPart of %codeListKind to code %code':
        'map %codeListPart of %codeListKind to code %code',
    'code of %cmdRing':
        '%cmdRing kood',
    'delimiter':
        'eraldaja',
    'collection':
        'collection',
    'variables':
        'muutujad',
    'parameters':
        'parameetrid',
    'code':
        'kood',
    'header':
        'päis',
    'header mapping...':
        'header mapping...',
    'code mapping...':
        'code mapping...',
    'Code mapping':
        'Code mapping',
    'Header mapping':
        'Header mapping',
    'Enter code that corresponds to the block\'s definition. Use the formal parameter\nnames as shown and <body> to reference the definition body\'s generated text code.':
        'Enter code that corresponds to the block\'s definition. Use the formal parameter\nnames as shown and <body> to reference the definition body\'s generated text code.',
    'Enter code that corresponds to the block\'s definition. Choose your own\nformal parameter names (ignoring the ones shown).':
        'Enter code that corresponds to the block\'s definition. Choose your own\nformal parameter names (ignoring the ones shown).',
    'Enter code that corresponds to the block\'s operation (usually a single\nfunction invocation). Use <#n> to reference actual arguments as shown.':
        'Enter code that corresponds to the block\'s operation (usually a single\nfunction invocation). Use <#n> to reference actual arguments as shown.'
};
