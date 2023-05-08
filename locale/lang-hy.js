/*

    lang-hy.js

    Armenian translation for SNAP!

    Translated "Symotec" LLC
    
    Translation reviewed by Armath team
	
    Thanks to: Copyright (C) 2017 by Jens Mönig
	
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

SnapTranslator.dict.hy = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    Ä, ä   \u00c4, \u00e4
    Ö, ö   \u00d6, \u00f6
    Ü, ü   \u00dc, \u00fc
    ß      \u00df
*/

    // translations meta information
    'language_name':
        'Հայերեն', // the name as it should appear in the language menu
    'language_translator':
        'Symotec LLC and Armath team', // your name for the Translators tab
    'translator_e-mail':
        'info@symotec.am and info@armath.am', // optional
    'last_changed':
        '2023-04-12', // this, too, will appear in the Translators tab

    // GUI
    // control bar:
    'untitled':
        'Անանուն',
    'development mode':
        'Մշակման ռեժիմ',

    // categories:
    'Motion':
        'Շարժ',
    'Looks':
        'Տեսք',
    'Sound':
        'Ձայն',
    'Pen':
        'Գրիչ',
    'Control':
        'Կառավարում',
    'Sensing':
        'Ընկալում',
    'Operators':
        'Հաշվարկ',
    'Variables':
        'Փոփոխական',
    'Lists':
        'Ցուցակ',
    'Other':
        'Այլ',

    // editor:
    'draggable':
        'քաշվող',

    // tabs:
    'Scripts':
        'Սցենար',
    'Costumes':
        'Զգեստներ',
    'Backgrounds':
        'Ետնապատկեր',
    'Sounds':
        'Ձայն',

    // names:
    'Sprite':
        'Կերպար',
    'Stage':
        'Բեմ',

    // rotation styles:
    'don\'t rotate':
        'չպտտել',
    'can rotate':
        'Կարողանալ պտտվել',
    'only face left/right':
        'միայն դեմքը՝ աջ-ձախ',

    // new sprite button:
    'add a new sprite':
        'Ավելացնել նոր կերպար',

    // tab help
    'costumes tab help':
        'Զգեստների էջի օգնություն/n'
            + 'Ներմուծել համացանցից, կամ ձեր համակարգչից/n',
    'import a sound from your computer\nby dragging it into here':
        'Ներմուծե՛ք ձայնը ձեր համակարգչից\n քաշելով այն այստեղ',

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
        'Բեմն ընտրված է:\nշարժման ստանդարտ մասնիկներ չկան\n',
//            + 'vorhanden',
    'move %n steps':
        'տեղափոխվել %n քայլ',
    'turn %clockwise %n degrees':
        'շրջվել %clockwise %n աստիճան',
    'turn %counterclockwise %n degrees':
        'շրջվել %counterclockwise %n աստիճան',
    'point in direction %dir':
        'շրջվել %dir ուղղությամբ',
    'point towards %dst':
        'շրջվել դեպի %dst',
    'go to x: %n y: %n':
        'գնալ դեպի x: %n y: %n',
    'go to %dst':
        'գնալ դեպի %dst',
    'glide %n secs to x: %n y: %n':
        'սահել %n վայրկյան դեպի x: %n y: %n',
    'change x by %n':
        'փոխել x -ը %n -ով',
    'set x to %n':
        'x -ը՝ %n',
    'change y by %n':
        'փոխել y -ը %n -ով',
    'set y to %n':
        'y -ը՝ %n',
    'if on edge, bounce':
        'եթե եզրին է, հրվել',
    'x position':
        'x -ը',
    'y position':
        'y -ը',
    'direction':
        'ուղղություն',

    // looks:
    'switch to costume %cst':
        'զգեստը՝ %cst',
    'next costume':
        'հաջորդ զգեստը',
    'costume #':
        'զգեստ #',
    'say %s for %n secs':
        'ասել %s %n վայրկյան',
    'say %s':
        'ասել %s',
    'think %s for %n secs':
        'մտածել %s %n վայրկյան',
    'think %s':
        'մտածել %s',
    'Hello!':
        'Բարև',
    'Hmm...':
        'Հմմ...',
    'change %eff effect by %n':
        'փոխել %eff էֆեկտը %n -ով',
    'set %eff effect to %n':
        'կիրառել %eff էֆեկտը %n արժեքով',
    'clear graphic effects':
        'մաքրել գրաֆիկական էֆեկտները',
    'change size by %n':
        'փոխել չափսը %n -ով',
    'set size to %n %':
        'չափսը՝ %n %',
    'size':
        'չափս',
    'show':
        'ցույց տալ',
    'hide':
        'թաքցնել',
    'go to %layer layer':
        'գնալ %layer շերտ',
    'go back %n layers':
        'վերադառնալ %n շերտ',

    'development mode \ndebugging primitives:':
        'Hackermodus \nDebugging-Bl\u00f6cke',
    'console log %mult%s':
        'schreibe in die Konsole: %mult%s',
    'alert %mult%s':
        'Pop-up: %mult%s',

    // sound:
    'play sound %snd':
        'արտաբերել %snd ձայնը',
    'play sound %snd until done':
        'արտաբերել %snd ձայնը մինչև ավարտը',
    'stop all sounds':
        'դադարեցնել բոլոր ձայները',
    'rest for %n beats':
        'սպասել %n տակտ',
    'play note %note for %n beats':
        'նվագել %note նոտան %n տակտ',
    'change tempo by %n':
        'փոխել տեմպը %n -ով',
    'set tempo to %n bpm':
        'տեմպը՝ %n զարկ/րոպե',
    'tempo':
        'տեմպ',

    // pen:
    'clear':
        'մաքրել',
    'pen down':
        'գրիչն իջեցնել',
    'pen down?':
        'գրիչը ցած?',
    'pen up':
        'գրիչը բարձրացնել',
    'set pen color to %clr':
        'գրչի գույնը՝ %clr',
    'change pen %clrdim by %n':
        'թոխել գրիչի %clrdim %n -ով',
    'set pen %clrdim to %n':
        'գրիչի %clrdim %n',
    'change pen shade by %n':
        'փոխել գրչի ստվերը %n -ով',
    'set pen shade to %n':
        'գրչի ստվերը՝ %n',
    'change pen size by %n':
        'գրչի չափը փոխել %n -ով',
    'set pen size to %n':
        'գրչի չափսը՝ %n',
    'stamp':
        'կնիք',
    'fill':
        'լցնել',

    // control:
    'when %greenflag clicked':
        'Երբ %greenflag սեղմված է',
    'when %keyHat key pressed %keyName':
        'Երբ %keyHat ստեղնը սեղմված է %keyName',
    'when I am %interaction':
        'Երբ %interaction',
    'clicked':
        'սեղմված է',
    'pressed':
        'սեղմված է',
    'dropped':
        'գցված է',
    'mouse-entered':
        'մկնիկը սեղմված է',
    'mouse-departed':
        'մկնիկը բաց է թողնված',
    'when %b':
        'երբ %b',
    'when I receive %msgHat %message':
        'երբ ստանում եմ %msgHat %message',
    'broadcast %msg %receive':
        'հաղորդել %msg %receive',
    'broadcast %msg %receive and wait':
        'հաղորդել %msg %receive և սպասել',
    'Message name':
        'հաղորդագրության անունը',
    'message':
        'հաղորդագրություն',
    'any message':
        'ցանկացած հաղորդագրություն',
    'wait %n secs':
        'սպասել %n վայրկյան',
    'wait until %b':
        'սպասել մինչև %b',
    'forever %loop':
        'անվերջ %loop',
    'repeat %n %loop':
        'կրկնել %n %loop',
    'repeat until %b %loop':
        'կրկնել մինչև %b %loop',
    'if %b %c':
        'եթե %b %c',
    'if %b %c else %c':
        'եթե %b %c այլապես %c',
    'report %s':
        'զեկուցել %s',
    'stop %stopChoices':
        'դադարեցնել %stopChoices',
    'all':
        'ամենը',
    'this script':
        'այս սցենարը',
    'this block':
        'այս մասնիկը',
    'stop %stopOthersChoices':
        'դադարեցնել %stopOthersChoices',
    'all but this script':
        'ամենը, բացի այս սցենարից',
    'other scripts in sprite':
        'կերպարի այլ սցենարները',
    'pause all %pause':
        'դադարեցնել ամենը %pause',
    'run %cmdRing %inputs':
        'գործարկել %cmdRing -ը %inputs -ից',
    'launch %cmdRing %inputs':
        'բացել %cmdRing -ը %inputs -ից',
    'call %repRing %inputs':
        'կանչել %repRing -ը %inputs -ից',
    'run %cmdRing w/continuation':
        'գործարկել %cmdRing -ը w/շարունակությամբ',
    'call %cmdRing w/continuation':
        'կանչել %cmdRing -ը w/շարունակությամբ',
    'warp %c':
        'անմիջապես %c',
    'when I start as a clone':
        'երբ սկսում եմ որպես կրկնօրինակ',
    'create a clone of %cln':
        'ստեղծել %cln -ի կրկնօրինակը',
    'myself':
        'ինքս',
    'delete this clone':
        'ջնջել այս կրկնօրինակը',

    // sensing:
    'touching %col ?':
        'հպվո՞ւմ է %col գույնին',
    'touching %clr ?':
        'հպվո՞ւմ է %clr -ին',
    'color %clr is touching %clr ?':
        '%clr գույնը հպվո՞ւմ է %clr -ին',
    'ask %s and wait':
        'հարցնել %s -ը և սպասել',
    'what\'s your name?':
        'Ի՞նչ է քո անունը։',
    'answer':
        'պատասխան',
    'mouse x':
        'մկնիկի x -ը',
    'mouse y':
        'մկնիկի y -ը',
    'mouse down?':
        'մկնիկը սեղմվա՞ծ է',
    'key %key pressed?':
        '%key ստեղնը սեղմվա՞ծ է',
    '%rel to %dst':
        '%rel մինչև %dst',
    'reset timer':
        'զրոյացնել վարկյանաչափը',
    'timer':
        'վարկյանաչափ',
    '%att of %spr':
        '%spr -ի %att',
    'my %get':
        'իմ %get -ը',
    'http:// %s':
        'http:// %s',
    'turbo mode?':
        'տուրբո ռեժիմը միացվա՞ծ է',
    'set turbo mode to %b':
        'տուրբո ռեժիմը՝ %b',

    'filtered for %clr':
        'զտված է %clr -ի համար',
    'stack size':
        'ստեկի չափը',
    'frames':
        'շրջանակներ',

    // operators:
    '%n mod %n':
        '%n մնացորդ %n',
    'round %n':
        'կլորացնել %n -ը',
    '%fun of %n':
        '%fun %n -ից',
    'pick random %n to %n':
        'պատահական թիվ՝ %n -ից %n -ը',
    'and':
        'և',
    'or':
        'կամ',
    'not %b':
        'ոչ %b',
    'true':
        'ճիշտ',
    'false':
        'սխալ',
    'join %words':
        'միավորել %words -ը',
    'split %s by %delim':
        'բաժանել %s -ը ըստ %delim -ի',
    'hello':
        'բարև',
    'world':
        'աշխարհ',
    'letter %ix of %s':
        '%ix -ի %s -րդ տառը',
    '%ta of text %s':
        '%ta տողիի %s',
    'unicode of %s':
        '%s -ի յունիկոդը',
    'unicode %n as letter':
        '%n յունիկոդը որպես տառ',
    'is %s a %typ ?':
        'արդյո՞ք %s -ը %typ է',
    'is %s identical to %s ?':
        '%s -ը նույնակա՞ն է %s -ի հետ',
    'identical to':
        '-ը նույնակա՞ն է -ի հետ',

    'type of %s':
        '%s -ի տիպը',

    // variables:
    'Make a variable':
        'Ստեղծել փոփոխական',
    'Variable name':
        'Փոփոխականի անունը',
    'Script variable name':
        'Ծրագրային փոփոխականի անունը',
    'Delete a variable':
        'Ջնջել փոփոխականը',

    'set %var to %s':
        '%var -ին տալ %s արժեքը',
    'change %var by %n':
        'փոխել %var -ը %n -ով',
    'show variable %var':
        'ցույց տալ %var փոփոխականը',
    'hide variable %var':
        'թաքցնել %var փոփոխականը',
    'script variables %scriptVars':
        'ծրագրային փոփոխականներ %scriptVars',

    // lists:
    'list %exp':
        'ցուցակ %exp',
    '%s in front of %l':
        '%s -ը %l -ի առջևում',
    'item %idx of %l':
        '%idx տարրը %l -ում',
    'all but first of %l':
        'բոլորը, բացի %l -ի առաջինից',
    '%la of %l':
        '%la -ի %l',
    '%l contains %s':
        '%l -ը պարունակում է %s',
    'thing':
        'կերպար',
    'add %s to %l':
        'ավելացնել %s -ը %l -ին',
    'delete %ida of %l':
        'ջնջել %ida -ը %l -ում',
    'insert %s at %idx of %l':
        'հավելել %s -ը  %idx դիրքում %l -ում ',
    'replace item %idx of %l with %s':
        'փոխարինել թիվ %idx տարրը %l -ում %s -ով',

    // other
    'Make a block':
        'ստեղծել նոր մասնիկ',

    // menus
    // snap menu
    'About...':
        'Snap! -ի մասին ...',
    'Reference manual':
        'Հրահանգների ձեռնարկ',
    'Snap! website':
        'Snap! -ի վեբկայքը',
    'Download source':
        'Ներբեռնել աղբյուրը',
    'Switch back to user mode':
        'Անցնել օգտագործման ռեժիմին',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'verl\u00e4sst Morphic',
    'Switch to dev mode':
        'Անցնել մշակման ռեժիմին',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'erm\u00f6glicht Morphic Funktionen',

    // project menu
    'Project notes...':
        'Նախագծի նշումները...',
    'New':
        'Նոր',
    'Open...':
        'Բացել...',
    'Save':
        'Պահել',
    'Save to disk':
        'Պահել սկավառակի վրա',
    'store this project\nin the downloads folder\n(in supporting browsers)':
        'պահել նախագիծը\n«ներբռնումներ» թղթապանակում\n(աջակցվող զննարկիչներում)',
    'Save As...':
        'Պահել որպես...',
    'Import...':
        'Ներմուծել...',
    'file menu import hint':
        'Նիշքի ընտրացանկի ներմուծման ակնարկ',
    'Export project as plain text...':
        'Արտահանել նախագիծը տեքստի տեսքով...',
    'Export project...':
        'Արտահանել նախագիծը...',
    'show project data as XML\nin a new browser window':
        'Ցույց տալ նախագծի տվյալները XML ձևաչափով\nզննարկիչի նոր պատուհանում',
    'Export blocks...':
        'Արտահանել մասնիկները...',
    'show global custom block definitions as XML\nin a new browser window':
        'Ցույց տալ բոլոր նոր մասնիկների սահմանումները XML ձևաչափով\nզննարկիչի նոր պատուհանում',
    'Unused blocks...':
          'Չօգտագործված մասնիկներ...',
    'find unused global custom blocks\nand remove their definitions':
        'գտնել չօգտագործվող մասնիկները\nև հեռացնել դրանց սահմանումները',
    'Remove unused blocks':
        'Հեռացնել չօգտագործված մասնիկները',
    'there are currently no unused\nglobal custom blocks in this project':
        'այս պահին նախագծում չի գտնվել\nնոր մասնիկներ',
    'unused block(s) removed':
        'չօգտագործված մասնիկ(ներ)ը հեռացվել է',
    'Export summary...':
        'Արտահանել ամփոփագիրը...',
    'open a new browser browser window\n with a summary of this project':
        'բածել զննարկիչի նոր պատուհան\n այս նախագծի ամփոփումով',
    'Contents':
        'Բովանդակություն',
    'Kind of':
        'Տեսակը',
    'Part of':
        'Մասը',
    'Parts':
        'Մասերը',
    'Blocks':
        'Մասնիկներ',
    'For all Sprites':
        'Բոլոր կերպարների համար',
    'Import tools':
        'Ներմուծել գործիքներ',
    'load the official library of\npowerful blocks':
        'բեռնել հզոր մասնիկների\n պաշտոնական գրադարանը',
    'Libraries...':
        'Գրադարաններ...',
    'Import library':
        'Ներառել գրադարան',

    // cloud menu
    'Login...':
        'Մուտք...',
    'Signup...':
        'Գրանցվել...',

    // settings menu
    'Language...':
        'Լեզու...',
    'Zoom blocks...':
        'Մեծացնել մասնիկները...',
    'Stage size...':
        'Բեմի չափսը...',
    'Stage size':
        'Տեսարանի չափը',
    'Stage width':
        'Բեմի լայնությունը',
    'Stage height':
        'Բեմի բարձրությունը',
    'Default':
        'Գործարանային',
    'Blurred shadows':
        'Մշուշված ստվեր',
    'uncheck to use solid drop\nshadows and highlights':
        'հանել նշումը, հստակ\n ստվերներ ու ընդգծումներ տեսնելու համար',
    'check to use blurred drop\nshadows and highlights':
        'նշել, մշուշված ստվերներ\nու ընդգծումներ տեսնելու համար',
    'Zebra coloring':
        'Զեբրա գունավորում',
    'check to enable alternating\ncolors for nested blocks':
        'նշել, ներառված մասնիկները\nայլ գույնով տեսնելու համար',
    'uncheck to disable alternating\ncolors for nested block':
        'հանել, նշումը ներառված մասնիկները\nնույն գույնով տեսնելու համար',
    'Dynamic input labels':
        'Մուտքերի փոփոխվող պիտակներ',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'հանել, նշումը տարատեսակ մուտքերի\nփոփոխվող պիտակների համար',
    'check to enable dynamic\nlabels for variadic inputs':
        'նշել, փոփոխական գործառույթներով մուտքերի\nփոփոխվող պիտակները գործարկելու համար',
    'Prefer empty slot drops':
        'Նախընտրել դատարկ դաշտերը (slot drops)',
    'settings menu prefer empty slots hint':
        'կարգավորումների մենյուն նախընտրել դատարկ տեղերում',
    'uncheck to allow dropped\nreporters to kick out others':
        'հանել, զեկուցողներին\nթույլ տալու դուրս մղել մյուսներին',
    'Long form input dialog':
        'Մուտքի երկխոսության երկար ձևաչափ',
    'Plain prototype labels':
        'Հարթ նախատիպի պիտակներ',
    'uncheck to always show (+) symbols\nin block prototype labels':
        'հանել, (+) նշանը մասնիկի նախատիպի\n պիտակում մշտապես ցույց տալու համար',
    'check to hide (+) symbols\nin block prototype labels':
        'նշել, (+) նշանը մասնիկի նախատիպի\n պիտակում թաքցնելու համար',
    'check to always show slot\ntypes in the input dialog':
        'նշել, դատարկ դաշտի տեսակը մուտքի\nերկխոսությունում մշտապես ցույց տալու համար',
    'uncheck to use the input\ndialog in short form':
        'հանել նշումը, մուտքի երկխոսությունից\n կարճ տեսքով օգտվելու համար',
    'Virtual keyboard':
        'Վերացական ստեղնաշար',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'հանել նշումը, շարժական սարքերում\n վերացական ստեղնաշարը ապաակտիվացնելու համար',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'նշել, շարժական սարքերում\n վերացական ստեղնաշարը ակտիվացնելու համար',
    'Input sliders':
        'Մուտքի սահուն կոճակներ',
    'uncheck to disable\ninput sliders for\nentry fields':
        'հանել նշումը, մուտքային\n դաշտերում սահուն կոճակները\n ապաակտիվացնելու համար',
    'check to enable\ninput sliders for\nentry fields':
        'նշել, մուտքային\n դաշտերում սահուն կոճակները\n ակտիվացնելու համար',
    'Clicking sound':
        'Կտտոցի ձայնը',
    'uncheck to turn\nblock clicking\nsound off':
        'հանել նշումը, մասնիկի կտտոցի\n ձայնը անջատելու համար',
    'check to turn\nblock clicking\nsound on':
        'նշել, մասնիկի կտտոցի\n ձայնը միացնելու համար',
    'Animations':
        'Շարժապատկերներ',
    'uncheck to disable\nIDE animations':
        'հանել նշումը, միջավայրում\n շարժապատկերները արգելելու համար',
    'Turbo mode':
        'Տուրբո ռեժիմ',
    'check to prioritize\nscript execution':
        'նշել, սցենարի կատարումը\nնախապատվություններով իրականացնելու համար',
    'uncheck to run scripts\nat normal speed':
        'հանել, նշումը ծրագիրը նորմալ\n արագությամբ կատարելու համար',
    'check to enable\nIDE animations':
        'նշել, միջավայրում\nշարժապատկերները թուլատրելու համար',
    'Flat design':
        'Հարթ ձևավորում',
    'Nested auto-wrapping':
        'Ներկառուցված ինքնաձևավորում',
    'Keyboard Editing':
        'Ստեղնաշարի խմբագրում',
    'Table support':
        'Աղյուսակների օժանդակում',
    'Table lines':
        'Աղյուսակի տողեր',
    'Visible stepping':
        'Տեսանելի քայլ',
    'Սցենարների անվտանգ հոսքեր':
        'Thread safe scripts',
    'uncheck to allow\nscript reentrance':
        'հանել նշումը, ծրագրի\n վերադարձը թուլատրելու համար',
    'check to disallow\nscript reentrance':
        'նշել, ծրագրի\n վերադարձն արգելելու համար',
    'Prefer smooth animations':
        'Նախընտրել սահուն շարժապատկերներ',
    'uncheck for greater speed\nat variable frame rates':
        'հանել նշումը, փոփոխականների մշակման ավելի բարձր\nարագություն (frame rates) ունենալու համար',
    'check for smooth, predictable\nanimations across computers':
        'նշել, համակարգիչների մեջ սահուն,\n կանխատեսելի շարժապատկերներ ունենալու համար',
    'Flat line ends':
        'Գծերի հարթ ծայրեր',
    'check for flat ends of lines':
        'Նշել, գծերի հարթ ծայրեր ունենալու համար',
    'uncheck for round ends of lines':
        'հանել նշումը, գծերի կլոր ծայրեր ունենալու համար',
    'Ternary Boolean slots':
        'Եռակի երկուական դատարկ դաշտեր',
    'Inheritance support':
        'Ժառանգության աջակցություն',

    // inputs
    'with inputs':
        'մուտքերով',
    'input names:':
        'մուտքերի անունները:',
    'Input Names:':
        'Մուտքերի անունները:',
    'input list:':
        'մուտքերի ցուցակ:',

    // context menus:
    'help':
        'օգնություն',

    // palette:
    'hide primitives':
        'թաքցնել պարզունակները (primitives)',
    'show primitives':
        'ցուցադրել պարզունակները (primitives)',

    // blocks:
    'help...':
        'օգնություն...',
    'relabel...':
        'վերանշել...',
    'duplicate':
        'կրկնօրինակել',
    'make a copy\nand pick it up':
        'ստեղծել կրկնօրինակն\nու վերցնել այն',
    'only duplicate this block':
        'միայն կրկնօրինակել այս մասնիկը',
    'delete':
        'ջնջել',
    'script pic...':
        'սցենարի պատկերը...',
    'open a new window\nwith a picture of this script':
        'բացել նոր պատուհան\nայս սցենարի պատկերով',
    'ringify':
        'օղակավորել',
    'unringify':
        'օղակազրկել',
    'transient':
        'անցումային',
    'uncheck to save contents\nin the project':
        'հանել նշումը, նախագծի բովանդակությունը \nպահպանելու համար',
    'check to prevent contents\nfrom being saved':
        'նշել, բովանդակության\nպահպանումն արգելելու համար',
    'new line':
        'նոր տող',

    // custom blocks:
    'delete block definition...':
        'ջնջել մասնիկի սահմանումը',
    'edit...':
        'խմբագրել',

    // sprites:
    'edit':
        'խմբագրել',
    'move':
        'տեղափոխել',
    'detach from':
        'անջատել',
    'detach all parts':
        'անջատել բոլոր մասերը',
    'export...':
        'արտահանել...',

    // stage:
    'show all':
        'ցուցադրել բոլորը',
    'pic...':
        'վերցնել...',
    'open a new window\nwith a picture of the stage':
        'բացել նոր պատուհան\nբեմի պատկերով',

    // scripting area
    'clean up':
        'մաքրել',
    'arrange scripts\nvertically':
        'դասավորել սցենարները\ուղղահայաց տեսքով',
    'add comment':
        'ավելացնել մեկնաբանություն',
    'undrop':
        'հետ տանել (undrop)',
    'undo the last\nblock drop\nin this pane':
        'չեղարկել վերջին\nմասնիկի հետարկումը\n այս վահանակի վրա',
    'redrop':
        'կրկին քաշել այստեղ',
    'scripts pic...':
        'սցենարի պատկերը...',
    'open a new window\nwith a picture of all scripts':
        'բացել նոր պատուհան\nբոլոր սեցնարների պատկերով',
    'make a block...':
        'ստեղծել մասնիկ...',

    // costumes
    'rename':
        'վերանվանել',
    'export':
        'արտահանել',
    'rename costume':
        'վերանվանել զգեստը',

    // sounds
    'Play sound':
        'արտաբերել ձայնը',
    'Stop sound':
        'Դադարեցնել ձայնը',
    'Stop':
        'Դադար',
    'Play':
        'Արտաբերել',
    'rename sound':
        'վերանվանել ձայնը',

    // lists and tables
    'list view...':
        'ցուցակային դիտում...',
    'table view...':
        'աղյուսակային դիտում...',
    'open in dialog...':
        'բացել երկխոսությունում',
    'reset columns':
        'վերարկել սյուները',
    'items':
        'տարրերը',

    // dialogs
    // buttons
    'OK':
        'ԼԱՎ',
    'Ok':
        'Լավ',
    'Cancel':
        'Չեղարկել',
    'Yes':
        'Այո',
    'No':
        'Ոչ',

    // help
    'Help':
        'Օգնություն',

    // zoom blocks
    'Zoom blocks':
        'Մեծացնել մասնիկները',
    'build':
        'կառուցել',
    'your own':
        'ձեր սեփական',
    'blocks':
        'մասնիկները',
    'normal (1x)':
        'նորմալ (1x)',
    'demo (1.2x)':
        'ցուցադրական (1.2x)',
    'presentation (1.4x)':
        'ներկայացման համար (1.4x)',
    'big (2x)':
        'մեծ (2x)',
    'huge (4x)':
        'խոշոր (4x)',
    'giant (8x)':
        'հսկա (8x)',
    'monstrous (10x)':
        'վիթխարի (10x)',

    // Project Manager
    'Untitled':
        'Անանուն',
    'Open Project':
        'Բացել նախագիծը',
    '(empty)':
        '(դատարկ)',
    'Saved!':
        'Պահված!',
    'Delete Project':
        'Ջնջել նախագիծը',
    'Are you sure you want to delete':
        'Վստա՞հ եք, որ ուզում եք ջնջել',
    'rename...':
        'վերանվանել...',

    // costume editor
    'Costume Editor':
        'զգեստի խմբագիր',
    'click or drag crosshairs to move the rotation center':
        'սեղմել կամ քաշել խաչմերուկը պտտման կենտրոն տեղափոխելու համար',

    // project notes
    'Project Notes':
        'Նախագշի նշումները',

    // new project
    'New Project':
        'Նոր Նախագիծ',
    'Replace the current project with a new one?':
        'Փոխարինե՞լ ընթացիկ նախագիծը նորով',

    // save project
    'Save Project As...':
        'Պահել նախագիծը որպես...',

    // export blocks
    'Export blocks':
        'Արտահանել մասնիկները',
    'Import blocks':
        'Ներմուշել մասնիկներ',
    'this project doesn\'t have any\ncustom global blocks yet':
        'այս նախագծում դեռ առկա չէ\n նոր ստեղծված մասնիկներ',
    'select':
        'ընտրել',
    'none':
        'ոչ մի',

    // variable dialog
    'for all sprites':
        'բոլոր կերպարների համար',
    'for this sprite only':
        'միայն այս կերպարի համար',

    // variables refactoring
    'rename only\nthis reporter':
        'վերանվանել միայն\n այս զեկուցողին',
    'rename all...':
        'վերանվանել բոլորը...',
    'rename all blocks that\naccess this variable':
        'վերանվանել այն բոլոր մասնիկները որոնք\nունեն հասանելիություն այս փոփոխականին',


    // block dialog
    'Change block':
        'Փոխել մասնիկը',
    'Command':
        'Հրաման',
    'Reporter':
        'Զեկուցող',
    'Predicate':
        'Տրամաբանական',

    // block editor
    'Block Editor':
        'Մասնիկների խմբագիր',
    'Apply':
        'Կիրառել',

    // block deletion dialog
    'Delete Custom Block':
        'Ջնջել նորաստեղծ մասնիկը',
    'block deletion dialog text':
        'Մասնիկների ջնջման երկխոսության տեքստ',

    // input dialog
    'Create input name':
        'Ստեղծել մուտքի անուն',
    'Edit input name':
        'Խմբագրել մուտքի անունը',
    'Edit label fragment':
        'Խմբագրել պիտակի մի մասը',
    'Title text':
        'Վերնագրել տեքստը',
    'Input name':
        'Մուտքանուն',
    'Delete':
        'Ջնջել',
    'Object':
        'Առարկա',
    'Number':
        'Թիվ',
    'Text':
        'Տեքստ',
    'List':
        'Ցուցակ',
    'Any type':
        'Ցանկացած տիպի',
    'Boolean (T/F)':
        'Բուլյան (Ճ/Ս)',
    'Command\n(inline)':
        'Հրաման (մեկ տողով)',
    'Command\n(C-shape)':
        'Հրաման\n(C-տեսքի)',
    'Any\n(unevaluated)':
        'Կամայական\n(չգնահատված)',
    'Boolean\n(unevaluated)':
        'Բուլյան\n(չգնահատված)',
    'Single input.':
        'Եզակի մուտք։',
    'Default Value:':
        'Գործարանային արժեքը:',
    'Multiple inputs (value is list of inputs)':
        'Բազմակի մուտքեր (արժեքը մուտքերի ցանկն է)',
    'Upvar - make internal variable visible to caller':
        'Upvar - ներքին փոփոխականը տեսանելի դարձնել կանչի համար',

    // About Snap
    'About Snap':
        'Snap-ի մասին',
    'Back...':
        'Հետ...',
    'License...':
        'Արտոնագիր...',
    'Modules...':
        'Մոդուլներ...',
    'Credits...':
        'Երախտիք...',
    'Translators...':
        'Թարգմանիչներ',
    'License':
        'Հավաստագիր',
    'current module versions:':
        'մոդուլի ներկա տարբերակները',
    'Contributors':
        'Աջակվողներ',
    'Translations':
        'Թարգմանություններ',

    // variable watchers
    'normal':
        'նորմալ',
    'large':
        'մեծ',
    'slider':
        'սահուն կոճակ',
    'slider min...':
        'սողնակի նվազագույնը...',
    'slider max...':
        'սողնակի առավելագույնը...',
    'import...':
        'ներմուծել...',
    'Slider minimum value':
        'Սողնակի նվազագույն արժեքը',
    'Slider maximum value':
        'Սողնակի առավելագույն արժեքը',

    // list watchers
    'length: ':
        'երկարություն՝ ',

    // coments
    'add comment here...':
        'ավելացնել մեկնաբանություն',

    // drow downs
    // directions
    '(90) right':
        '(90) աջ',
    '(-90) left':
        '(-90) ձախ',
    '(0) up':
        '(0) վեր',
    '(180) down':
        '(180) վար',

    // collision detection
    'mouse-pointer':
        'մկնիկի ցուցիչը',
    'edge':
        'եզր',
    'pen trails':
        'գրչի ակոսներ',

    // costumes
    'Turtle':
        'Կրիայ',
    'Empty':
        'Դատարկ',

    // graphical effects
    'color':
        'գույն',
    'fisheye':
        'ձկան աչք',
    'whirl':
        'մրրիկ',
    'pixelate':
        'պիքսելների խոշորացում',
    'mosaic':
        'մանրապատկեր',
    'saturation':
        'հագեցածություն',
    'brightness':
        'պայծառություն',
    'ghost':
        'ուրվական',
    'negative':
        'բացասական',
    'comic':
        'զվարճալի',
    'confetti':
        'պուտավոր',

    // keys
    'space':
        'բացատ',
    'up arrow':
        'սլաք վեր',
    'down arrow':
        'սլաք վար',
    'right arrow':
        'սլաք աջ',
    'left arrow':
        'սլաք ձախ',
    'any key':
        'կամայական կոճակ',
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
        'նոր...',

    // math functions
    'abs':
        'բացարձակ արժեք',
    'ceiling':
        'առավելագույնը',
    'floor':
        'նվազագույնը',
    'sqrt':
        'քառակուսի արմատ',
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

    // Boolean expressions keyboard entry
    'not':
        'ոչ',

    // delimiters
    'letter':
        'տառ',
    'whitespace':
        'բացատ',
    'line':
        'գիծ',
    'tab':
        'ներդիր',
    'cr':
        'տողադարձ (cr)',

    // data types
    'number':
        'թիվ',
    'text':
        'տեքստ',
    'Boolean':
        'Բուլյան',
    'list':
        'ցուցակ',
    'command':
        'հրահանգ',
    'reporter':
        'զեկուցող',
    'predicate':
        'կանխել',
    'sprite':
        'կերպար',

    // list indices
    'last':
        'վերջին',
    'any':
        'որևէ',

    // attributes
    'neighbors':
        'հարևանները',
    'self':
        'սեփական',
    'other sprites':
        'այլ կերպարներ',
    'parts':
        'մասերը',
    'anchor':
        'խարիսխ',
    'parent':
        'ծնող',
    'children':
        'զավակներ',
    'clones':
        'կրկնօրինակներ',
    'other clones':
        'այլ կրկնօրինակներ',
    'dangling?':
        'կախվե՞լ է',
    'rotation x':
        'x պտույտ',
    'rotation y':
        'y պտույտ',
    'center x':
        'x կենտրոն',
    'center y':
        'y կենտրոն',
    'name':
        'անուն',
    'stage':
        'բեմ',
};
