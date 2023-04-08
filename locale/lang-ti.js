/*

    lang-de.js

    German translation for SNAP!

    written by Jens Mönig

    Copyright (C) 2022 by Jens Mönig

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

SnapTranslator.dict.ti = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    Ä, ä   \u00c4, \u00e4
    Ö, ö   \u00d6, \u00f6
    Ü, ü   \u00dc, \u00fc
    ß      \u00df
*/

    // translations meta information
    'language_name':
        'ትግርኛ', // the name as it should appear in the language menu
    'language_translator':
        'ተስፋልደት ነጋሽ እያሱ, ሄራን ተወልደ ስዩም', // your name for the Translators tab
    'translator_e-mail':
        'tesfaldet.negash@gmail.com, heran.sium@web.de', // optional
    'last_changed':
        '2022-12-25', // this, too, will appear in the Translators tab

    // GUI
    // control bar:
    'untitled':
        'ኣርእስቲ ዘይተዋህቦ',
    'development mode':
        'መዳይ ጠቢብ',

    // categories:
    'Motion':
        'ምንቅስቓስ',
    'Looks':
        'ምስሊ',
    'Sound':
        'ድምጺ',
    'Pen':
        'ብርዒ',
    'Control':
        'መቆጻጸሪ',
    'Sensing':
        'ምህዋስ',
    'Operators':
        'ኣስራሕቲ',
    'Variables':
        'ተቐያየርቲ',
    'Lists':
        'ዝርዝራት',
    'Other':
        'ተወሳኺ',

    // editor:
    'draggable':
        'ዝስሓብ',

    // tabs:
    'Scripts':
        'መርሓ',
    'Costumes':
        'ኣልባሳት',
    'Backgrounds':
        'ድሕረ ባይታ',
    'Sounds':
        'ድምጺ',

    // names:
    'Sprite':
        'ውዱዕ',
    'Stage':
        'መድረኽ',

    // rotation styles:
    'don\'t rotate':
        'ዘይዘውር',
    'can rotate':
        'ዝዘውር',
    'only face left/right':
        'ናብ የማን ወይ ናብ ጸጋም ጥራይ ዝዘወር',

    // new sprite button:
    'add a new sprite':
        'ሓድሽ ውዱዕ ወስኽ',
    'add a new Turtle sprite':
        'ሓድሽ ውዱዕ ወስኽ',
    'paint a new sprite':
        'ሓድሽ ውዱዕ ስኣል',
    'take a camera snapshot and\nimport it as a new sprite':
        'ብመስኣሊት ዝተላዕለ ዉዱዕ ወስኽ',
    

    // tab help
    'costumes tab help':
        'ስእሊ ንምእታው፡ \nመዝገብ ስእሊ ካብ ኮምፒዩተር\n'
            + 'ወይ ካብ ገጻት መርበብ ሓበሬታ ናብዚ ሰሓብ',
    'import a sound from your computer\nby dragging it into here':
        'ድምጺ ንምእታው፡ \nመዝገብ ድምጺ ካብ ኮምፒዩተር ናብዚ ስሓብ',

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
        'መድረኽ ተመሪጹ፥\nመስረቲ ምንቅስቓስ \n'
            + 'ሕጡባት ኣይተረኽቡን',

    'move %n steps':
        '%n ስጉምቲ ኪድ',
    'turn %clockwise %n degrees':
        '%clockwise %n ደረጃ ዙር',
    'turn %counterclockwise %n degrees':
        '%counterclockwise %n ደረጃ ዙር',
    'point in direction %dir':
        'ኣንፈትካ ናብ %dir ደረጃ ቀይር',
    'point towards %dst':
        'ናብ %dst ኣንፍት',
    'go to x: %n y: %n':
        'ናብ ነቑጣ ሀ: %n ሰ: %n ኪድ',
    'go to %dst':
        'ናብ %dst ኪድ',
    'glide %n secs to x: %n y: %n':
        'ን %n ካልኢት ናብ ነቑጣ ሀ: %n ሰ: %n ኣንሳፍፍ',
    'change x by %n':
        'ሀ ብዓቐን %n ቀይር',
    'set x to %n':
        'ሀ ናብ %n ቀይር',
    'change y by %n':
        'ሰ ብዓቐን %n ቀይር',
    'set y to %n':
        'ሰ ናብ %n ቀይር',
    'if on edge, bounce':
        'ደረት እንተ ተንኪፍካ፡ ተመለስ',
    'x position':
        'ነቑጣ ሀ',
    'y position':
        'ነቑጣ ሰ',
    'direction':
        'ኣንፈት',

    // looks:
    'switch to costume %cst':
        'ልብሲ %cst ቀይር',
    'next costume':
        'ቀጺላ ዘላ ልብሲ',
    'costume #':
        'ልብሲ ቁጽሪ',
    'say %s for %n secs':
        '%s በል ን %n ካልኢት',
    'say %s':
        '%s በል',
    'think %s for %n secs':
        '%s ብምባል ን %n ካልኢት ኣስተንትን',
    'think %s':
        '%s ብምባል ኣስተንትን',
    'Hello!':
        'ከመዓልኪ!',
    'Hmm...':
        'እህህ...',
    '%img of costume %cst':
        '%img ናይ ልብሲ %cst',
    'new costume %l width %dim height %dim':
        'ሓድሽ ልብሲ %l ጎድኒ %dim ቁመት %dim',
    'stretch %cst x: %n y: %n %':
        'ምጠጥ %cst ሀ: %n ሰ: %n %',
    'change %eff effect by %n':
        'ናይ %eff ተጽዕኖ ብ %n ቀይር',
    'set %eff effect to %n':
        '%eff ተጽዕኖ ናብ %n ቀይር',
    'clear graphic effects':
        'ስእላዊ ተጽዕኖ እለይ',
    '%eff effect':
        '%eff ተጽዕኖ',
    'change size by %n':
        'ዓቐን ብ %n ቀይር',
    'set size to %n %':
        'ዓቐን ናብ %n % ቀይር',
    'size':
        'ዓቐን',
    'show':
        'ኣርኢ',
    'hide':
        'ከውል',
    'shown?':
        'ተራእዩ፧',
    'go to %layer layer':
        'ናብ %layer ቀጸላ ኪድ',
    'front':
        'ቀዳማይ',
    'back':
        'ዳሕረዋይ',
    'go back %n layers':
        '%n ቀጸላ ንድሕሪት ተመለስ',

    'development mode \ndebugging primitives:':
        'መዳይ ጠቢብ \n መጸጸይ መስረቲ ሕጡባት',
    'console log %mult%s':
        'ኣብ ሰደቓ መዝግብ፥ %mult%s ',
    'alert %mult%s':
        'ሓብር፥ %mult%s',

    'pixels':
        'ዋህዮ ስእሊ (ፒክሰል)',
    'current':
        'ህሉው',

    // sound:
    'play sound %snd':
        'ንድምጺ %snd ኣቃልሕ',
    'play sound %snd until done':
        'ንድምጺ %snd ክሳብ ትውዳእ ኣቃልሕ',
    'stop all sounds':
        'ኩሎም ድምጽታት ደው ኣብሎም',
    'rest for %n beats':
        'ምቅልሕ ን %n ህርመት ደው ኣብል',
    'play sound %snd at %rate Hz':
        'ንድምጺ %snd ብ %rate ሀርጽ(Hz) ኣቃልሕ',
    '%aa of sound %snd':
        '%aa ናይ ድምጺ %snd',
    'duration':
        'ዕምሪ',
    'length':
        'ንውሓት',
    'number of channels':
        'ብዝሒ መስመራት',
    'new sound %l rate %rate Hz':
        'ሓድሽ ድምጺ %l ብመጠን ህርመት %rate ሀርጽ(Hz)',
    'play note %note for %n beats':
        'ንቃና %note ን %n ህርመት ኣቃልሕ',
    'set instrument to %inst':
        'መሳርሒ ናብ %inst ቀይር',
    'change tempo by %n':
        'ፍጥነት ህርመት ብ %n ቀይር',
    'set tempo to %n bpm':
        'ፍጥነት ህርመት ናብ %n ህርመት/ደቒቕ ቀይር',
    'tempo':
        'ፍጥነት ህርመት',
    'change volume by %n':
        'ዓውታ ብ %n ቀይር',
    'set volume to %n %':
        'ዓውታ ናብ %n % ቀይር',
    'change balance by %n':
        'ሚዛን ብ %n ቀይር',
    'set balance to %n':
        'ሚዛን ናብ %n ቀይር',
    'balance':
        'ሚዛን',
    'play frequency %n Hz':
        'ድግግም %n ሀርጽ(Hz) ኣቃልሕ',
    'stop frequency':
        'ድግግም ደው ኣብል',
    'play %n Hz for %n secs':
        '%n ሀርጽ(Hz) ን %n ካልኢት ኣቃልሕ',

    // "instruments", i.e. wave forms
    '(1) sine':
        '(1) ሳይን',
    '(2) square':
        '(2) ርቡዕ ኩርናዕ',
    '(3) sawtooth':
        '(3) ስኒ መጋዝ',
    '(4) triangle':
        '(4) ስሉስ ኩርናዕ',

    // pen:
    'clear':
        'ደምስስ',
    'pen down':
        'ብርዒ ታሕቲ',
    'pen up':
        'ብርዒ ላዕሊ',
    'pen down?':
        'ብርዒ ታሕቲ፧',
    'set pen color to %clr':
        'ሕብሪ ብርዒ ናብ %clr ቀይር',
    'set background color to %clr':
        'ሕብሪ ድሕረባይታ ናብ %clr ቀይር',
    'change pen %clrdim by %n':
        'ናይ ብርዒ %clrdim ብ %n ቀይር',
    'change background %clrdim by %n':
        'ናይ ድሕረባይታ %clrdim ብ %n ቀይር',
    'set pen %clrdim to %n':
        'ናይ ብርዒ %clrdim ናብ %n ቀይር',
    'set background %clrdim to %n':
        'ናይ ድሕረባይታ %clrdim ናብ %n ቀይር',
    'pen %pen':
        'ብርዒ %pen',
    'change pen size by %n':
        'ርጉዲ ብርዒ ብ %n ቀይር',
    'set pen size to %n':
        'ርጉዲ ብርዒ ናብ %n ቀይር',
    'stamp':
        'ሕተም',
    'fill':
        'ቅባእ',
    'write %s size %n':
        '%s ብዓቐን %n ጽሓፍ',
    'paste on %spr':
        'ናብ %spr ለጥፍ',
    'cut from %spr':
        'ካብ %spr ቆሪጽካ እለ',
    'pen vectors':
        'ሕንጻጻት ብርዒ',

    // control:
    'when %greenflag clicked':
        ' %greenflag ምስ ተጠወቐ',
    'when %keyHat key pressed %keyName':
        'መፍትሕ %keyHat ምስ ተጸቕጠ %keyName',
    'key':
        'መፍትሕ',
    'when I am %interaction':
        'ኣነ %interaction',
    'clicked':
        'ምስ ተጠወቕኩ',
    'pressed':
        ' ምስ ተጸቐጥኩ',
    'dropped':
        'ምስ ጠፋእኩ',
    'mouse-entered':
        'ኣንጭዋ ምስ ዝትንክፈኒ',
    'mouse-departed':
        'ኣንጭዋ ምስ ዝፍንተተኒ',
    'scrolled-down':
    	'ንታሕቲ ምስ ዝጥቕለል',
    'scrolled-up':
        'ንላዕሊ ምስ ዝጥቕለል',
    'stopped':
        'ደው ምስ ዝብል',
    'when %b':
        '%b ምስ ኮነ',
    'when I receive %msgHat %message':
        'ኣነ %msgHat ምስ ዝቕበል %message',
    'broadcast %msg %receive':
        'ፈንው %msg %receive',
    'broadcast %msg %receive and wait':
        'ፈንው %msg %receive እሞ ተጸበ',
    'to':
        'ናብ',
    'with data':
        'ምስ ሰነድ',
    'Message name':
        'ስም መልእኽቲ',
    'message':
        'መልእኽቲ',
    'any message':
        'ዝኾነ መልእኽቲ',
    'data':
        'ሰነድ',
    'wait %n secs':
        '%n ካልኢት ተጸበ',
    'wait until %b':
        'ክሳብ %b ተጸበ',
    'forever %loop':
        'ቀጻሊ ድገም %loop',
    'repeat %n %loop':
        '%n ግዜ ድገም %loop',
    'repeat until %b %loop':
        'ክሳብ %b ድገም %loop',
    'for %upvar = %n to %n %cla':
        'ን %upvar = %n ክሳብ %n %cla',
    'if %b %c':
        '%b እንተ %c',
    'if %b %c else %c':
        '%b እንተ %c እንተዘየሎ %c',
    'if %b then %s else %s':
        '%b እንተ ሽዑ %s እንተዘየሎ %s',
    'report %s':
        'ጸብጻብ ሃብ %s',
    'stop %stopChoices':
        '%stopChoices ደው ኣብል',
    'all':
        'ኩሉ',
    'all scenes':
        'ኩሉ ዓውደ ፍጻመ',
    'this script':
        'እዛ መርሓ',
    'this block':
        'እዛ ሕጡብ',
    'stop %stopOthersChoices':
        '%stopOthersChoices ደው ኣብል',
    'all but this script':
        'ኩሉ ብዘይካ እዛ መርሓ',
    'other scripts in sprite':
        'ካልእ መርሓታት ኣብዚ ዉዱዕ',
    'pause all %pause':
        'ንኹሉ ኣዕርፍ %pause',
    'run %cmdRing %inputs':
        '%cmdRing ፈጽም %inputs',
    'launch %cmdRing %inputs':
        '%cmdRing ጀምር %inputs',
    'call %repRing %inputs':
        '%repRing ጸውዕ %inputs',
    'run %cmdRing w/continuation':
        '%cmdRing ፈጽም ምስ መቐጸልታ',
    'call %cmdRing w/continuation':
        '%cmdRing ጸውዕ ምስ መቐጸልታ',
    'warp %c':
        'ፍጡን %c',
    'when I start as a clone':
        'ከም ቅዳሕ እንተ ጀሚረ',
    'create a clone of %cln':
        ' ናይ %cln ቅዳሕ ኣዳሉ',
    'a new clone of %cln':
        'ሓድሽ ናይ ቅዳሕ %cln',
    'myself':
        'ባዕለይ',
    'delete this clone':
        'ነዚ ቅዳሕ ደምስስ',
    'switch to scene %scn %send':
        'ናብ ዓውደ ፍጻመ %scn ቀይር %send',
    'and send':
        'እሞ ልኣኽ',
    'next':
        'ቀዳሚ',
    'previous':
        'ሰዓቢ',
    'tell %spr to %cmdRing %inputs':
        'ን %spr %cmdRing ንገር %inputs',
    'ask %spr for %repRing %inputs':
        'ን %spr ሕተት %repRing %inputs',
    'When %edit is edited %message':
        'ኣብልዕሊ %edit ኣርትዖት ምስዝፍጸም %message',
    'anything':
        'ዝኾነ ነገር',

    // sensing:
    'touching %col ?':
        '%col እንተ ተተንኪፉ፧',
    'touching %clr ?':
        '%clr እንተ ተተንኪፉ፧',
    'color %clr is touching %clr ?':
        'ሕብሪ %clr ን %clr እንተ ተተንኪፉ፧',
    'ask %s and wait':
        'ሕተት %s እሞ ተጸበ',
    'what\'s your name?':
        'መን እዩ ስምካ፧',
    'answer':
        'መልሲ',
    'mouse position':
        'ነቑጣ ኣንጭዋ',
    'mouse x':
        'ሀ ነቑጣ ኣንጭዋ',
    'mouse y':
        'ሰ ነቑጣ ኣንጭዋ',
    'mouse down?':
        'መጥልዕ ኣንጭዋ ተጸቒጡ፧',
    'key %key pressed?':
        'መፍትሕ %key ተጸቒጡ፧',
    '%rel to %dst':
        '%rel ናብ %dst',
    'distance':
    	'ርሕቀት',
    'ray length':
        'ቁመት ጩራ',
    '%asp at %loc' :
        '%asp ኣብ %loc',
    'r-g-b-a':
        'ቀ-ቀ-ሰ-ጋ (R-G-B-A) መጠናት ሕብሪ',
    'sprites' :
        'ውዱዓት',
    'reset timer':
        'ሰዓት ዓቐን ከም ብሓድሽ ጀምር',
    'timer':
        'ሰዓት ዓቐን',
    '%att of %spr':
        '%att ናይ %spr',
    'my %get':
        'መለለዪ %get',
    'object %self':
        'ውዱዕ %self',
    'http:// %s':
        'http:// %s',
    'turbo mode':
        'ፈጣን',
    'flat line ends':
        'ገፊሕ ሕንጻጽ',
    'is %setting on?':
        ' %setting ዶ እዩ፧?',
    'set %setting to %b':
        '%setting ናብ %b ቀይር',
    'current %dates':
        'ህሉው %dates',
    'year':
        'ዓመት',
    'month':
        'ወርሒ',
    'date':
        'ዕለት',
    'day of week':
        'መዓልቲ',
    'hour':
        'ሰዓት',
    'minute':
        'ደቒቕ',
    'second':
        'ካልኢት',
    'time in milliseconds':
        'ግዜ ብ ሚሊካልኢት',
    'microphone %audio':
        'ማይክሮፎን %audio',
    'volume':
        'ዓውታ',
    'note':
        'ቃና',
    'frequency':
        'ድግግም',
    'samples':
        'Signale',
    'sample rate':
        'መጠን ናሙና',
    'spectrum':
        'ዝርገሐ ድግግም',
    'resolution':
        'ንጻረ',
    'Microphone resolution...':
        'ንጻረ ማይክሮፎን...',
    'Microphone':
        'ማይክሮፎን',
    'low':
        'ታሕቲ',
    'high':
        'ላዕሊ',
    'max':
        'ዝለዓለ',
    'video %vid on %self':
        'ቪድዮ %vid ኣብ %self',
    'motion':
        'ምንቅስቓስ',
    'snap':
        'ስናፕ',
    'set video transparency to %n':
        'ናይ ቪዲዮ ሽፋፍ ናብ %n ቀይር',
    'video capture':
        'ቪድዮ ምቕራጽ',
    'mirror video':
        'ቪድዮ መረጼን',
    'filtered for %clr':
        'ን %clr ዝተመምየ',
    'stack size':
        'ዓቐን ቅሚጦ',
    'frames':
        'መቓናት',
    'log pen vectors':
        'መዝገብ ሕንጻጻት ብርዒ',
    '%block of block %repRing':
        '%block ናይ ሕጡብ %repRing',
    'label':
        'ዕላመት',
    'definition':
        'መግለጺ',
    'category':
        'ምድብ',
    'custom?':
        'ዓሚላዊ?',
    'global?':
        'ሓፈሻዊ?',
    'type':
        'ዓይነት',
    'scope':
        'ዓውዲ',
    'slots':
        'ቃጽዖታት',
    'defaults':
        'ውህብቶታት',
    'menus':
        'ዝርዝራት',
    'editables':
        'ኣተውቲ',
    'set %byob of block %repRing to %s':
        '%byob ናይ ሕጡብ %repRing ናብ %s ቀይር',
    'define %upvar %s %repRing':
        '%upvar %s %repRing ኣቑም',
    'delete block %repRing':
        'ሕጡብ %repRing ደምስስ',
    'block':
        'ሕጡብ',

    // operators:
    'sum':
        'ድምር',
    'product':
        'ርባሕ',
    'minimum':
        'ዝተሓተ',
    'maximum':
        'ዝለዓለ',
    '%n mod %n':
        '%n ተረፍ %n',
    'round %n':
        '%n ኣጸጋግዕ',
    '%fun of %n':
        '%fun ናይ %n',
    'pick random %n to %n':
        'ናይ ሃውሪ ቁጽሪ ካብ %n ናብ %n',
    '%b and %b':
        '%b ምስ %b',
    '%b or %b':
        '%b ወይ %b',
    'not %b':
        'ዘይ %b',
    'true':
        'ቅኑዕ',
    'false':
        'ጌጋ',
    'join %words':
        'ኣታሓሕዝ %words',
    'split %s by %delim':
        '%s ኣብ %delim ፍለ',
    'hello':
        'ከመዓልኪ',
    'world':
        'ዓለም',
    'letter %idx of %s':
        '%idx ፊደል ናይ %s',
    'length of %s':
        'ንውሓት ናይ ጽሕፈት %s',
    'unicode of %s':
        'ዩኒኮደ ናይ %s',
    'unicode %n as letter':
        'ዩኒኮደ %n ብፊደል',
    'is %s a %typ ?':
        '%s %typ ዶ እዩ፧',
    'is %s identical to %s ?':
        '%s ምስ %s ሓደ ዓይነት ዶ እዮም፧',
    'JavaScript function ( %mult%s ) { %code }':
        'ጃቫስክሪፕት ተግባር ( %mult%s ) { %code }',
    'compile %repRing':
    	'%repRing ኣርንብ',

    'type of %s':
        'ዓይነት ናይ %s',

    // variables:
    'Make a variable':
        'ሓድሽ ተቐያያሪ',
    'Variable name':
        'ስም ተቐያያሪ',
    'Script variable name':
        'ናይ መርሓ ስም ተቐያያሪ',
    'inherit %shd':
        'ውረስ %shd',
    'Delete a variable':
        'ተቐያያሪ ደምስስ',

    'set %var to %s':
        '%var ብ %s ምላእ',
    'change %var by %n':
        '%var ብ %n ለውጥ',
    'show variable %var':
        'ተቐያያሪ %var ኣርኢ',
    'hide variable %var':
        'ተቐያያሪ %var ከውል',
    'script variables %scriptVars':
        'ናይ መርሓ ተቐያያሪ %scriptVars',

    // lists:
    'list %exp':
        'ዝርዝር %exp',
    'numbers from %n to %n':
        'ኣሃዛት ካብ %n ናብ %n',
    '%s in front of %l':
        '%s ኣብ መጀመርታ ናይ %l',
    'item %idx of %l':
        'ኣባል %idx ናይ %l',
    'all but first of %l':
        'ኵሉ ብዘይካ ቀዳማይ ናይ %l',
    '%la of %l':
        '%la ናይ %l',
    'rank':
        'ጽፍሒ',
    'dimensions':
        'ዓቐናት',
    'flatten':
        'ዘርዝር',
    'columns':
        'ዓምድታት',
    'reverse':
        'ግልባጥ',
    'lines':
        'መስመራት ጽሑፍ',
    '%l contains %s':
        '%l አጠቓልል ን %s',
    'thing':
        'ገለ ነገር',
    'is %l empty?':
        '%l ባዶ ዶ እዩ?',
    'index of %s in %l':
        'ተርታ ናይ %s ኣብ %l',
    'map %repRing over %l':
        'ኣተግብር %repRing ኣብ ልዕሊ %l',
    'keep items %predRing from %l':
        'ኣባላት መሚኻ ኣትርፍ፡ %predRing ካብ %l',
    'find first item %predRing in %l':
        'ቀዳማይ ኣባል ርኸብ፡ %predRing ኣብ %l',
    'combine %l using %repRing':
        'ጸንብር ንኣባልት ናይ %l ምስ %repRing',
    '%blitz map %repRing over %l':
        '%blitz ኣተግብር %repRing ኣብ ልዕሊ %l',
    '%blitz keep items %predRing from %l':
        '%blitz ኣባላት መሚኻ ኣትርፍ፡ %predRing ካብ %l',
    '%blitz find first item %predRing in %l':
        '%blitz ቀዳማይ ኣባል ርኸብ፡ %predRing ኣብ %l',
    '%blitz combine %l using %repRing':
        '%blitz ጸንብር ንኣባልት ናይ %l ምስ %repRing',
    'for each %upvar in %l %cla':
        'ንነፍሲ-ወከፍ %upvar ኣብ %l %cla',
    'item':
        'ኣባል',
    'value':
        'ትሕዝቶ',
    'index':
        'ተርታ',
    'append %lists':
        'ለቅብ %lists',
    'combinations %lists':
        'ጽንባረታት %lists',
    'reshape %l to %nums':
        'ዳግም ስራዕ %l ብ %nums',
    'add %s to %l':
        'ን %s ናብ %l መልእ',
    'delete %ida of %l':
        '%ida ካብ %l እለ',
    'insert %s at %idx of %l':
        '%s ኣብ %idx ናይ %l ኣእቱ',
    'replace item %idx of %l with %s':
        'ንኣባል %idx ናይ %l ብ %s ተክእ',

    // other
    'Make a block':
        'ሓድሽ ሕጡብ',

    // menus
    // snap menu
    'About...':
        'ብዛዕባ ስናፕ!...',
    'Reference manual':
        'መወከሲ መጽሓፍ',
    'Snap! website':
        'ስናፕ! መርበብ ሓበሬታ',
    'Download source':
        'መበቆላዊ ኮድ ኣራግፍ',
    'Switch back to user mode':
        'ናብ መዳይ ተጠቃሚ ተመለስ',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'ሞርፊክ ደው ኣብል',
    'Switch to dev mode':
        'ናብ መዳይ ጠቢብ ቀይር',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'ተግባራት ሞርፊክ ኣበራብር',

    // project menu
    'Project notes...':
        'ምልክታታት ፕሮጀክት...',
    'New':
        'ሓድሽ',
    'Open...':
        'ክፈት...',
    'Save':
        'ዓቅብ',
    'Save to disk':
        'ዓቅብ ኣብ መኽዘን ጭብጥታት',
    'store this project\nin the downloads folder\n(in supporting browsers)':
        'ነዛ ፕሮጀክት ኣራግፍ\nኣብ ውሽጣዊ መኽዘን ዓቅብ\n'
            + '(ብኩለን ባባት መርበብ ሓበሬታ ክይድገፍ ይኽእል)',
    'Save As...':
        'ዓቅብ ኣብ...',
    'Import...':
        'ኣእቱ...',
    'file menu import hint':
        'ፕሮጀክት ካብ ደገ ጸዓን,\nእኩብ ሕጡባት,\n'
            + 'ልብሲ ወይ ድምጺ',
    'Export project as plain text...':
        'ፕሮጀክት ከም ተራ ጽሑፍ ናብ ደገ ስደድ...',
    'Export project...':
        'ፕሮጀክት ናብ ደገ ስደድ...',
    'save project data as XML\nto your downloads folder':
        'ፕሮጀክት ከም ሰነድ XML\n ኣብ መኽዘን ዝተራገፈ ሰነዳት\nናይ ባብ መርበብ ሓበሬታ ዓቅብ',
    'show project data as XML\nin a new browser window':
        'ፕሮጀክት ከም XML\nኣብ መስኮት ባብ መርበብ ሓበሬታ ኣርኢ',
    'Export blocks...':
        'ሕጡባት ናብ ደገ ስደድ...',
    'save global custom block\ndefinitions as XML':
        'ኩሎም ዓሚላውያን ሕጡባት\nከም ሰነድ XML ዓቅብ',
    'Unused blocks...':
          'ኣብ ጥቕሚ ዘይወዓሉ ሕጡባት...',
    'find unused global custom blocks\nand remove their definitions':
        'ኣብ ጥቕሚ ዘይወዓሉ ሕጡባት\nረኺብካ እለይ',
    'Remove unused blocks':
        'ኣብ ጥቕሚ ዘይወዓሉ ሕጡባት እለይ',
    'there are currently no unused\nglobal custom blocks in this project':
        'እዚ ፕሮጀክት ኣብዚ ህሞት\nኣብ ጥቕሚ ዘይወዓሉ ሕጡባት የብሉን',
    'unused block(s) removed':
        'ኣብ ጥቕሚ ዘይወዓሉ ሕጡባት ተኣልዮም',
    'Hide blocks...':
        'ሕጡባት ከውል...',
    'New category...':
        'ሓድሽ ምድብ...',
    'Remove a category...':
        'ምድብ እለይ...',
    'Scenes...':
        'ዓውደ ፍጻመታት...',
    'New scene':
        'ሓድሽ ዓውደ ፍጻመ',
    'Add scene...':
        'ዓውደ ፍጻመ ወስኽ...',
    'Export summary...':
        'ጽማቝ ሓበሬታ ናብ ደገ ስደድ...',
    'save a summary\nof this project':
        'ናይ ፕሮጀክት ጽማቝ ሓበሬታ ዓቅብ',
    'Contents':
        'ትሕዝቶ',
    'Kind of':
        'ዓይነት ናይ',
    'Part of':
        'ክፋል ናይ',
    'Parts':
        'ክፋላት',
    'Blocks':
        'ሕጡባት',
    'For all Sprites':
        'ንኩሉ ብሓባር',
    'Libraries...':
        'ኣሃዱታት...',
    'Select categories of additional blocks to add to this project.':
        'ብቴማ ዝተጠርነፉ ሕጡባት መሪጽካ\nናብ እዚ ፕሮጀክት ወስኽ',
    'Select a costume from the media library':
        'ልብሲ ካብ ማዕከን ስእላዊ ሓበሬታ ምረጽ',
    'Select a sound from the media library':
        'ድምጺ ካብ ማዕከን ድምጻዊ ሓበሬታ ምረጽ',
    'Undelete sprites...':
        'ድምሰሳ ውዱዓት ሰርዝ...',
    'Bring back deleted sprites':
        'ዝተደምሰሱ ውዱዓት ምለስ',
    'trash is empty':
        'ዘንቢል ጉሓፍ ጥራዩ እዩ',

    //Libraries
    'Import library':
        'ኣሃዱ ጸዓን',
    'Loading':
        'እጻዓን ኣሎ',
    'Imported':
        'ኣትዩ',
    'Iteration, composition':
        'ምድግጋም, ምቛም',
    'List utilities':
        'ናውቲ ዝርዝር',
    'Variadic reporters':
        'ቫርያዳውያን (Variadic) ተግባራት',
    'Web services access (https)':
        'ኣገልግሎታት መርበብ ሓበሬታ ምብጻሕ (https)',
    'Multi-branched conditional (switch)':
        'ብዙሕ ዝጨንፈሮም ኩነታውያን (Switch)',
    'LEAP Motion controller':
        'ሊፕ ተቖጻጻሪ ምንቅስቓስ (LEAP Motion Controller)',
    'Words, sentences':
        'ቃላት ፡ ምሉእ ሓሳባት',
    'Catch errors in a script':
        'ኣተኣላልያ ጌጋታተ ኣብ መርሓ',
    'Set RGB or HSV pen color':
        'ሕብሪ ብርዒ ናብ RGB ወይ HSV ቀይር',
    'Text to speech':
        'ጽሑፍ ናብ ዘረባ',
    'Provide 100 selected colors':
        '100 ዝተመርጹ ሕብርታት',
    'Infinite precision integers, exact rationals, complex':
        'ደረት ኣልቦ ትኽክል ምሉኣት ቁጽርታት, ትኽክል ተመቕራሒ ቁጽርታት, ሓሳባውያን ቁጽርታት',
    'Provide getters and setters for all GUI-controlled global settings':
        'ባእታታት ባብ ተጠቃሚ (GUI) ብመርሓ ተቖጻጸር',
    'Allow multi-line text input to a block':
        ' ብዓል ብዙሕ መስመር ጽሕፍ ናብ ሕጡብ ምውሳኽ ኣኽእል',
    'Create variables in program':
        'ተቓያየርቲ ኣብ መርሓ ኣእቱ',

    // cloud menu
    'Login...':
        'እቶ...',
    'Signup...':
        'ተመዝገብ...',
    'Logout':
        'ውጻእ',
    'Change Password...':
        'ቃለ-ምስጢር ቀይር...',
    'Reset Password...':
        'ቃለ-ምስጢር ናብ ፋልማይ ምለስ...',
    'Resend Verification Email...':
        'መረጋገጺ ኢ-መይል (ኤ-ድብዳበ) ከም ብሓደሽ ስደድ...',
    'Open in Community Site':
        'ገጽ ሓበሬታ ናይ ፕሮጀክት ክፈት',

    // settings menu
    'Language...':
        'ቋንቋ...',
    'Zoom blocks...':
        'ሕጡባት ኣጉልሕ...',
    'Fade blocks...':
        'ሕጡባት ኣህስስ...',
    'Stage size...':
        'ዓቐን መድረኽ...',
    'Stage size':
        'ዓቐን መድረኽ',
    'Stage width':
        'ጎድኒ መድረኽ',
    'Stage height':
        'ቁመት መድረኽ',
    'Default':
        'ውህብ',
    'Blurred shadows':
        'ደብዛዝ ጽላሎት',
    'uncheck to use solid drop\nshadows and highlights':
        'ድሙቐ ጽላሎትን ብርሃንን\nንምጥቃም ኣጥፍእ',
    'check to use blurred drop\nshadows and highlights':
        'ደብዛዝ ጽላሎትን ብርሃንን\nንምጥቃም ወልዕ',
    'Zebra coloring':
        'Zebrafarben',
    'check to enable alternating\ncolors for nested blocks':
        'einschalten \u00fcr abwechselnde Farbnuancen\nin Bl\u00f6cken',
    'uncheck to disable alternating\ncolors for nested block':
        'ausschalten verhindert abwechselnde\nFarbnuancen in Bl\u00f6cken',
    'Dynamic input labels':
        'Eingabenbeschriftung',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'ausschalten verhindert Beschriftung\nvon Mehrfacheingaben',
    'check to enable dynamic\nlabels for variadic inputs':
        'einschalten um Mehrfacheingabefelder\nautomatisch zu beschriften',
    'Prefer empty slot drops':
        'Leere Platzhalter bevorzugen',
    'settings menu prefer empty slots hint':
        'einschalten um leere Platzhalter\nbeim Platzieren von Bl\u00f6cken'
            + 'zu bevorzugen',
    'uncheck to allow dropped\nreporters to kick out others':
        'ausschalten um das "Rauskicken"\nvon platzierten Bl\u00f6cken\n'
            + 'zu erm\u00f6glichen',
    'check to turn on\n visible stepping (slow)':
        'einschalten um Programmausführung\nzu verfolgen (schrittweise)',
    'uncheck to turn off\nvisible stepping':
        'ausschalten um Programmausführung\nnicht mehr zu verfolgen',
    'Long form input dialog':
        'Ausf\u00fchrlicher Input-Dialog',
    'Plain prototype labels':
        'Einfache Prototyp-Beschriftung',
    'uncheck to always show (+) symbols\nin block prototype labels':
        'ausschalten, um (+) Zeichen\nim Blockeditor zu verbergen',
    'check to hide (+) symbols\nin block prototype labels':
        'einschalten, um (+) Zeichen\nim Blockeditor immer anzuzeigen',
    'check to always show slot\ntypes in the input dialog':
        'einschalten, um immer die Datentypen\nim Input-Dialog zu sehen',
    'uncheck to use the input\ndialog in short form':
        'ausschalten f\u00fcr kurzen\nInput-Dialog',
    'JavaScript extensions':
        'JavaScript Erweiterungen',
    'check to support\nnative JavaScript functions':
        'einschalten um JavaScript-Funktionen\ndirekt in Snap! zu ermöglichen',
    'uncheck to disable support for\nnative JavaScript functions':
        'ausschalten, um potentiell gefährliche\nJavaScript-Funktionen zu verhindern',
    'JavaScript extensions for Snap!\nare turned off':
        'JavaScript Erweiterungen für Snap!\nsind ausgeschaltet',
    'Extension blocks':
        'Erweiterungsblöcke',
    'uncheck to hide extension\nprimitives in the palette':
        'ausschalten um Blöcke für Erweiterungen\nin der Palette zu verbergen',
    'check to show extension\nprimitives in the palette':
        'einschalten um Blöcke für Erweiterungen\nin der Palette anzuzeigen',
    'Input sliders':
        'Eingabeschieber',
    'uncheck to disable\ninput sliders for\nentry fields':
        'ausschalten um Schieber\nin Eingabefeldern zu verhindern',
    'check to enable\ninput sliders for\nentry fields':
        'einschalten um Schieber\nin Eingabefeldern zu aktivieren',
    'Retina display support':
        'Retina Bildschirmauflösung',
    'uncheck for lower resolution,\nsaves computing resources':
        'ausschalten um eine niedrigere Auflösung zu erhalten\nund weniger Rechenleistung zu benötigen',
    'check for higher resolution,\nuses more computing resources':
        'einschalten um eine höhere Auflösung zu erhalten,\nbenötigt mehr Rechenleistung',
    'Codification support':
        'Kodifikation',
    'Clicking sound':
        'Akustisches Klicken',
    'uncheck to turn\nblock clicking\nsound off':
        'ausschalten um akustisches\nKlicken zu deaktivieren',
    'check to turn\nblock clicking\nsound on':
        'einschalten um akustisches\nKlicken zu aktivieren',
    'Animations':
        'Animationen',
    'uncheck to disable\nIDE animations':
        'ausschalten um IDE-\nAnimationen zu verhindern',
    'Turbo mode':
        'Turbomodus',
    'check to prioritize\nscript execution':
        'einschalten, um Skripte\nzu priorisieren',
    'uncheck to run scripts\nat normal speed':
        'ausschalten, um Skripte\nnormal auszuf\u00fchren',
    'check to enable\nIDE animations':
        'einschalten um IDE-\nAnimationen zu erlauben',
    'Flat design':
        'Helles Design',
    'check for alternative\nGUI design':
        'einschalten für alternative Nutzeroberfläche',
    'uncheck for default\nGUI design':
        'ausschalten für Standard-Nutzeroberfläche',
    'Nested auto-wrapping':
        'Automatisches Umklammern',
    'Keyboard Editing':
        'Tastaturunterstützung',
    'Table support':
        'Tabellenunterstützung',
    'Table lines':
        'Tabellen mit Linien',
    'Visible stepping':
        'Programmausführung verfolgen',
    'Thread safe scripts':
        'Threadsicherheit',
    'uncheck to allow\nscript reentrance':
        'verhindert, dass unvollendete\nSkripte erneut gestartet werden',
    'check to disallow\nscript reentrance':
        'verhindert, dass unvollendete\nSkripte erneut gestartet werden',
    'Flat line ends':
        'Flache Pinselstriche',
    'check for flat ends of lines':
        'einschalten f\u00fcr flache\nPinselstrichenden',
    'uncheck for round ends of lines':
        'auschalten f\u00fcr runde\nPinselstrichenden',
    'Ternary Boolean slots':
        'Ternäre Bool\'sche Inputs',
    'Inheritance support':
        'Prototypische Vererbung',
    'Hyper blocks support':
        'Hyper-Blöcke',
    'uncheck to disable\nusing operators on lists and tables':
         'erweiterte Anwendung von Operatoren\nauf Listen und Tabellen',
    'check to enable\nusing operators on lists and tables':
         'erweiterte Anwendung von Operatoren\nauf Listen und Tabellen',
    'Log pen vectors':
        'Malstiftvektoren aufzeichnen',
    'uncheck to turn off\nlogging pen vectors':
        'ausschalten, um Malstiftbewegungen\nnicht mehr aufzuzeichnen',
    'check to turn on\nlogging pen vectors':
        'einschalten, um Malstiftbewegungen\nals Vektor aufzuzeichnen',
    'Single palette':
        'Einheitliche Palette',
    'check to show all blocks in a single palette':
        'einschalten, um alle Blöcke in\neiner einzigen Palette zu sehen',
    'uncheck to show only the selected category\'s blocks':
        'ausschalten, um nur die Blöcke der ausgewählten Kategorie zu sehen',
    'Show categories':
        'Kategorien anzeigen',
    'uncheck to hide\ncategory names\nin the palette':
        'ausschalten, um die\nNamen der Kategorien\nin der Palette zu verbergen',
    'check to show\ncategory names\nin the palette':
        'einschalten, umd die\nNamen der Kategorien\nin der Palette anzuzeigen',
    'Show buttons':
        'Knöpfe anzeigen',
    'uncheck to hide buttons\nin the palette':
        'ausschalten, um Knöpfe in\nder Palette zu verbergen',
    'check to show buttons\nin the palette':
        'einschalten, um Knöpfe in\nder Palette anzuzeigen',
    'HSL pen color model':
        'HSL Farbmodell',
     'uncheck to switch pen colors\nand graphic effects to HSV':
        'ausschalten, um das Farbmodell\nfür den Malstift und die Grafikeffekte\nauf HSV zurückzusetzen',
    'check to switch pen colors\nand graphic effects to HSL':
        'einschalten, um das Farbmodell\nfür den Malstift und die Grafikeffekte\nauf HSL zu setzen',
    'Disable click-to-run':
        'Block-Klicks deaktivieren',
    'uncheck to enable\ndirectly running blocks\nby clicking on them':
        'ausschhalten, um direktes Ausführen\nvon Blöcken durch Anklicken\nzu ermöglichen',
    'check to disable\ndirectly running blocks\nby clicking on them':
        'einschhalten, um direktes Ausführen\nvon Blöcken durch Anklicken\nzu verhindern',
    'Disable dragging data':
        'Daten-Herausziehen deaktivieren',
    'uncheck to drag media\nand blocks out of\nwatchers and balloons':
        'ausschalten, um Medien und Blöcke\naus Variablen und Sprechblasen\nherauszuziehen',
    'disable dragging media\nand blocks out of\nwatchers and balloons':
        'verhindert, dass Medien und Blöcke\naus Variablen und Sprechblasen\nherausgezogen werden können',

    // inputs
    'with inputs':
        'mit Eingaben',
    'input names:':
        'Eingaben:',
    'Input Names:':
        'Eingaben:',
    'input list:':
        'Eingabeliste:',

    // context menus:
    'help':
        'Hilfe',

    // palette:
    'find blocks':
        'Blöcke finden',
    'hide blocks...':
        'Blöcke verbergen...',
    'Hide blocks in palette':
        'Blöcke verbergen',
    'unused':
        'nicht verwendete',
    'make a category...':
        'Neue Kategorie...',
    'New Category':
        'Neue Kategorie',
    'Blocks category name:':
        'Name der neuen Block-Gruppe:',
    'Category color':
        'Kategoriefarbe',
    'red':
        'rot',
    'green':
        'grün',
    'blue':
        'blau',
    'delete a category...':
        'Kategorie löschen...',

    // blocks:
    'help...':
        'Hilfe...',
    'relabel...':
        'Umbenennen...',
    'compile':
        'Kompilieren',
    'uncompile':
        'Entkompilieren',
    'duplicate':
        'Duplizieren',
    'make a copy\nand pick it up':
        'eine Kopie aufnehmen',
    'only duplicate this block':
        'nur diesen Block duplizieren',
    'extract':
        'herausziehen',
    'only grab this block':
        'nur diesen Block bewegen',
    'delete':
        'L\u00f6schen',
    'senders...':
        'Sender...',
    'receivers...':
        'Empfänger...',
    'script pic...':
        'Skriptbild...',
    'save a picture\nof this script':
        'ein Bild dieses\nSkripts speichern',
    'result pic...':
        'Ergebnisbild...',
    'save a picture of both\nthis script and its result':
        'ein Bild dieses Skripts mit\nseinem Ergebnis speichern',
    'export script':
        'Skript exportieren',
    'download this script\nas an XML file':
        'dieses Skript als XML\nDatei herunterladen',
    'ringify':
        'Umringen',
    'unringify':
        'Entringen',
    'transient':
        'nicht persistent',
    'uncheck to save contents\nin the project':
        'ausschalten, um den Inhalt\nim Projekt zu speichern',
    'check to prevent contents\nfrom being saved':
        'einschalten, um das Speichern des Inhalts\nim Projekt zu verhindern',
    'new line':
        'neue Zeile',

    // custom blocks:
    'delete block definition...':
        'Blockdefinition l\u00f6schen...',
    'duplicate block definition...':
        'Blockdefinition duplizieren...',
    'export block definition...':
        'Blockdefinition exportieren...',
    'including dependencies':
        'mit allen verwendeten Blöcken',
    'edit...':
        'Bearbeiten...',
    'translations...':
        'Übersetzungen...',
    'block variables...':
        'Blockvariablen...',
    'in palette':
        'In der Palette',

    // sprites:
    'edit':
        'Bearbeiten',
    'clone':
        'Klonen',
    'move':
        'Verschieben',
    'pivot':
        'Angelpunkt',
    'edit the costume\'s\nrotation center':
        'Drehpunkt des Kostüms\nanzeigen und verschieben',
    'rotate':
    	'Drehen',
    'stick to':
        'Befestigen an',
    'detach from':
        'Abtrennen von',
    'detach all parts':
        'Alle Teile abtrennen',
    'export...':
        'Exportieren...',
    'parent...':
        'Vorfahr...',
    'current parent':
        'aktueller Vorfahr',
    'release':
        'Entlassen',
    'make temporary and\nhide in the sprite corral':
        'temporär machen\nund Icon verstecken',

    // stage:
    'show all':
        'Alles zeigen',
    'pic...':
        'Bild exportieren...',
    'save a picture\nof the stage':
        'ein Bild der\nBühne speichern',
    'svg...':
        'SVG exportieren...',
    'export pen trails\nline segments as SVG':
        'Striche in Malspuren als\nVektorgraphik exportieren',
    'there are currently no\nvectorizable pen trail segments':
        'momentan gibt es keine\nvektorisierbaren Malspuren',
    'turn all pen trails and stamps\ninto a new background for the stage':
        'Hintergrund aus allen Malspuren und\nStempelabdrücken auf der Bühne erstellen',
    'turn all pen trails and stamps\ninto a new costume for the\ncurrently selected sprite':
        'aus allen Malspuren und Stempelabdrücken ein\nKostüm für die momentan ausgewählte Figur erstellen',

    // scripting area
    'clean up':
        'Aufr\u00e4umen',
    'arrange scripts\nvertically':
        'Skripte der Reihe nach\nanordnen',
    'add comment':
        'Anmerkung hinzuf\u00fcgen',
    'undrop':
        'R\u00fcckg\u00e4ngig',
    'undo the last\nblock drop\nin this pane':
        'Setzen des letzten Blocks\nwiderrufen',
    'redrop':
        'Wiederherstellen',
    'use the keyboard\nto enter blocks':
    	'Blöcke per Tastatur\neingeben',
    'scripts pic...':
        'Bild aller Skripte...',
    'save a picture\nof all scripts':
        'ein Bild aller\nSkripte speichern',
    'make a block...':
        'Neuen Block bauen...',

    // costumes
    'rename':
        'Umbenennen',
    'export':
        'Exportieren',
    'rename costume':
        'Kost\u00fcm umbenennen',
    'rename background':
        'Hintergrund umbenennen',
    'get blocks':
        'Blöcke extrahieren',
    'get data':
        'Daten extrahieren',

    // sounds
    'Play sound':
        'Klang\nabspielen',
    'Stop sound':
        'Klang\nanhalten',
    'Stop':
        'Halt',
    'Play':
        'Los',
    'rename sound':
        'Klang umbenennen',

    // lists and tables
    'list view...':
        'Listenansicht...',
    'table view...':
        'tabellarische Ansicht...',
    'Table view':
        'Tabelle',
    'open in dialog...':
        'in neuem Fenster \u00f6ffnen',
    'blockify':
        'als Block',
    'reset columns':
        'Spaltenbreiten zur\u00fccksetzen',
    'items':
        'Elemente',

    // dialogs
    // buttons
    'OK':
        'OK',
    'Ok':
        'OK',
    'Cancel':
        'Abbrechen',
    'Yes':
        'Ja',
    'No':
        'Nein',

    // help
    'Help':
        'Hilfe',

    // zoom blocks
    'Zoom blocks':
        'Bl\u00f6cke vergr\u00f6\u00dfern',
    'build':
        'baue',
    'your own':
        'eigene',
    'blocks':
        'Bl\u00f6cke',
    'normal (1x)':
        'normal (1x)',
    'demo (1.2x)':
        'Demo (1.2x)',
    'presentation (1.4x)':
        'Pr\u00e4sentation (1.4x)',
    'big (2x)':
        'gro\u00df (2x)',
    'huge (4x)':
        'riesig (4x)',
    'giant (8x)':
        'gigantisch (8x)',
    'monstrous (10x)':
        'ungeheuerlich (10x)',

    // fade blocks
    'Fade blocks':
        'Bl\u00f6cke ausblenden',
    'block-solid (0)':
        'normal (0)',
    'medium (50)':
        'mittel (50)',
    'light (70)':
        'leicht (70)',
    'shimmering (80)':
        'schimmernd (80)',
    'elegant (90)':
        'elegant (90)',
    'subtle (95)':
        'angedeutet (95)',
    'text-only (100)':
        'nur Text (100)',

    // Project Manager
    'Untitled':
        'ኣርእስቲ ዘይተዋህቦ',
    'Open Project':
        'Projekt \u00f6ffnen',
    'Open':
        '\u00d6ffnen',
    '(empty)':
        '(leer)',
    'Saved!':
        'Gesichert!',
    'Delete Project':
        'Projekt l\u00f6schen',
    'Are you sure you want to delete':
        'Wirklich l\u00f6schen?',
    'rename...':
        'Umbenennen...',
    'Examples':
        'Beispiele',
    'Share':
        'Teilen',
    'Unshare':
        'Nicht mehr teilen',
    'Publish':
        'Veröffentlichen',
    'Unpublish':
        'Nicht mehr veröffentlichen',
    'Updating\nproject list...':
        'Projektliste laden',
    'Recover':
        'Wiederherstellen',
    'Today':
        'Heute',
    'Yesterday':
        'Gestern',

    // costume editor
    'Costume Editor':
        'Kost\u00fcmeditor',
    'Paint Editor':
        'Kostümeditor',
    'click or drag crosshairs to move the rotation center':
        'Fadenkreuz anklicken oder bewegen um den Drehpunkt zu setzen',
    'undo':
        'rückgängig',
    'Vector':
        'Vektor',
    'Paintbrush tool\n(free draw)':
        'Pinsel\n(freies Zeichnen)',
    'Stroked Rectangle\n(shift: square)':
        'Rechteck\n(Shift: Quadrat)',
    'Stroked Ellipse\n(shift: circle)':
        'Ellipse\n(Shift: Kreis)',
    'Eraser tool':
        'Radiergummi',
    'Set the rotation center':
        'Drehpunkt setzen',
    'Line tool\n(shift: vertical/horizontal)':
        'Linie\n(Shift: vertikal/horizontal)',
    'Filled Rectangle\n(shift: square)':
        'gefülltes Rechteck\n(Shift: Quadrat)',
    'Filled Ellipse\n(shift: circle)':
        'gefüllte Ellipse\n(Shift: Kreis)',
    'Fill a region':
        'fülle einen Bereich mit\nder gewählten Farbe',
    'Pipette tool\n(pick a color anywhere)':
        'Pipette (klicke irgendwo auf die gewünschte\nFarbe, um sie aufzunehmen)',
    'Brush size':
        'Pinselstärke',
    'Constrain proportions of shapes?\n(you can also hold shift)':
        'Proportionen festlegen\n(auch über Shift-Taste)',
    //'grow':
    //    'größer',
    //'shrink':
    //    'kleiner',
    //'flip ↔':
    //    'drehen ↔',
    //'flip ↕':
    //    'drehen ↕',
    
    'Vector Paint Editor':
        'Vektor-Editor',
    'Rectangle\n(shift: square)':
        'Rechteck\n(Shift: Quadrat)',
    'Ellipse\n(shift: circle)':
        'Ellipse\n(Shift: Kreis)',
    'Selection tool':
        'Auswählen',
    'Line tool\n(shift: constrain to 45º)':
        'Linie\n(Shift: Vielfache von 45°)',
    'Closed brush\n(free draw)':
        'geschlossene, gefüllte Form\n(freies Zeichnen)',
    'Paint a shape\n(shift: secondary color)':
        'fülle einen Bereich mit der gewählten Farbe\n(Shift: Sekundärfarbe)',
    'Pipette tool\n(pick a color from anywhere\nshift: secondary color)':
        'Pipette\nklicke irgendwo auf die gewünschte Farbe\n um sie aufzunehmen (Shift: Sekundärfarbe)',
    'Edge color\n(left click)':
        'Randfarbe\n(Linksklick)',
    'Fill color\n(right click)':
        'Füllfarbe\n(Rechtsklick)',
   // 'Top':
   //     'oben',
   // 'Bottom':
   //     'unten',
   // 'Up':
   //     'nach oben',
   // 'Down':
   //     'nach unten',


    // project notes
    'Project Notes':
        'Projektanmerkungen',

    // new project
    'New Project':
        'Neues Projekt',
    'Unsaved Changes!':
        'Ungespeicherte Änderungen!',
    'Replace the current project with a new one?':
        'Das aktuelle Projekt durch ein neues ersetzen?',
    'Backup failed.\nThis cannot be undone, proceed anyway?':
        'Backup nicht möglich.\nTrotzdem fortfahren?',

    // save project
    'Save Project As...':
        'Projekt Sichern Als...',
    'Save Project':
        'Projekt sichern',

    // export blocks
    'Export blocks':
        'Bl\u00f6cke exportieren',
    'Import blocks':
        'Bl\u00f6cke importieren',
    'this project doesn\'t have any\ncustom global blocks yet':
        'in diesem Projekt gibt es noch keine\nglobalen Bl\u00f6cke',
    'select':
        'ausw\u00e4hlen',
    'none':
        'nichts',

    // variable dialog
    'for all sprites':
        'f\u00fcr alle',
    'for this sprite only':
        'nur f\u00fcr dieses Objekt',

    // variables refactoring
    'rename only\nthis reporter':
        'nur diesen Block\numbenennen',
    'rename all...':
        'alle umbenennen...',
    'rename all blocks that\naccess this variable':
        'alle Blöcke umbenennen,\ndie diese Variable referenzieren',


    // block dialog
    'Change block':
        'Block ver\u00e4ndern',
    'Command':
        'Befehl',
    'Reporter':
        'Funktion',
    'Predicate':
        'Pr\u00e4dikat',

    // block editor
    'Block Editor':
        'Blockeditor',
    'Method Editor':
        'Methodeneditor',
    'Apply':
        'Anwenden',

    // block deletion dialog
    'Delete Custom Block':
        'Block L\u00f6schen',
    'block deletion dialog text':
        'Soll dieser Block mit allen seinen Exemplare\n' +
            'wirklich gel\u00f6scht werden?',

    // input dialog
    'Create input name':
        'Eingabe erstellen',
    'Edit input name':
        'Eingabe bearbeiten',
    'Edit label fragment':
        'Beschriftung bearbeiten',
    'Title text':
        'Beschriftung',
    'Input name':
        'Eingabe',
    'Delete':
        'L\u00f6schen',
    'Object':
        'Objekt',
    'Number':
        'Zahl',
    'Text':
        'Text',
    'List':
        'Liste',
    'Any type':
        'Beliebig',
    'Boolean (T/F)':
        'Boolsch (W/F)',
    'Command\n(inline)':
        'Befehl',
    'Command\n(C-shape)':
        'Befehl\n(C-Form)',
    'Any\n(unevaluated)':
        'Beliebig\n(zitiert)',
    'Boolean\n(unevaluated)':
        'Boolsch\n(zitiert)',
    'Single input.':
        'Einzeleingabe.',
    'Default Value:':
        'Standardwert:',
    'Multiple inputs (value is list of inputs)':
        'Mehrere Eingaben (als Liste)',
    'Upvar - make internal variable visible to caller':
        'Interne Variable au\u00dfen sichtbar machen',

    // About Snap
    'About Snap':
        '\u00dcber Snap',
    'Back...':
        'Zur\u00fcck...',
    'License...':
        'Lizenz...',
    'Modules...':
        'Komponenten...',
    'Credits...':
        'Mitwirkende...',
    'Translators...':
        '\u00dcbersetzer',
    'License':
        'Lizenz',
    'current module versions:':
        'Komponenten-Versionen',
    'Contributors':
        'Mitwirkende',
    'Translations':
        '\u00dcbersetzungen',

    // variable watchers
    'normal':
        'normal',
    'large':
        'gro\u00df',
    'slider':
        'Regler',
    'slider min...':
        'Minimalwert...',
    'slider max...':
        'Maximalwert...',
    'import...':
        'Importieren...',
    'raw data...':
        'Rohdaten...',
    'import without attempting to\nparse or format data':
        'Daten unformatiert\nimportieren',
    'Slider minimum value':
        'Minimalwert des Reglers',
    'Slider maximum value':
        'Maximalwert des Reglers',

    // list watchers
    'length: ':
        'L\u00e4nge: ',

    // comments
    'add comment here...':
        'Anmerkung hier hinzuf\u00fcgen',
    'comment pic...':
        'Kommentarbild',
    'save a picture\nof this comment':
        'ein Bild dieser\nAnmerkung speichern',

    // drow downs
    // directions
    '(90) right':
        '(90) rechts',
    '(-90) left':
        '(-90) links',
    '(0) up':
        '(0) oben',
    '(180) down':
        '(180) unten',
    'random':
    	'zufällig',
     'random position':
     	'zufällige Position',

    // collision detection
    'mouse-pointer':
        'Mauszeiger',
    'edge':
        'Kante',
    'pen trails':
        'Malspuren',
    'center':
        'Mitte',

    // costumes
    'Turtle':
        'Richtungszeiger',
    'Empty':
        'Leer',
    'Paint a new costume':
        'neues Kostüm zeichnen',
    'Import a new costume from your webcam':
        'neues Kostüm mit der Webcam aufnehmen',
    'Please make sure your web browser is up to date\nand your camera is properly configured. \n\nSome browsers also require you to access Snap!\nthrough HTTPS to use the camera.\n\nPlase replace the "http://" part of the address\nin your browser by "https://" and try again.':
        'Überprüfe, ob der Browser auf dem aktuellsten Stand \nund die Webcam korrekt konfiguriert ist.\n\nFür einige Browser muss Snap! mit HTTPS geöffnet\nwerden, um auf die Kamera zuzugreifen.\n\nErsetze dafür den "http://"-Teil in der Adresszeile mit"https://"',
    'Camera':
        'Kamera',
    
    // sounds
    'Record a new sound':
        'neuen Klang aufnehmen',
    

    // graphical effects, pen color
    'color':
        'Farbe',
    'hue':
        'Farbton',
    'fisheye':
        'Fischauge',
    'whirl':
        'Wirbel',
    'pixelate':
        'Pixel',
    'mosaic':
        'Mosaik',
    'saturation':
        'Sättigung',
    'brightness':
        'Helligkeit',
    'lightness':
        'Helligkeit',
    'transparency':
        'Transparenz',
    'ghost':
        'Durchsichtigkeit',
    'negative':
        'Farbumkehr',
    'comic':
        'Moire',
    'confetti':
        'Farbverschiebung',

    // keys
    'space':
        'Leertaste',
    'enter':
        'Eingabetaste',
    'up arrow':
        'Pfeil nach oben',
    'down arrow':
        'Pfeil nach unten',
    'right arrow':
        'Pfeil nach rechts',
    'left arrow':
        'Pfeil nach links',
    'any key':
        'beliebige Taste',
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
        'Neu...',
    '__shout__go__':
        'grüne Flagge angeklickt',

    // math functions
    'abs':
        'Betrag',
    'ceiling':
        'Aufgerundet',
    'floor':
        'Abgerundet',
    'sqrt':
        'Wurzel',
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
        'nicht',

    // delimiters
    'letter':
        'Buchstabe',
    'word':
        'Wort',
    'whitespace':
        'Leerraum',
    'line':
        'Zeilenvorschub',
    'tab':
        'Tabulator',
    'cr':
        'Wagenr\u00fccklauf',

    // data types
    'number':
        'Zahl',
    'text':
        'Text',
    'Boolean':
        'Boole',
    'list':
        'Liste',
    'command':
        'Befehlsblock',
    'reporter':
        'Funktionsblock',
    'predicate':
        'Pr\u00e4dikat',
    'sprite':
        'Objekt',
    'ring':
        'Ring',
    'nothing':
        'nichts',

    // list indices
    'last':
        'letztes',
    'any':
        'beliebig',

    // attributes
    'my':
        'Attribut',
    'neighbors':
        'Nachbarn',
    'self':
        'selbst',
    'other sprites':
        'andere Objekte',
    'parts':
        'Teile',
    'anchor':
        'Verankerung',
    'parent':
        'Vorfahr',
    'temporary?':
        'temporär?',
    'children':
        'Abkömmlinge',
    'clones':
        'Klone',
    'other clones':
        'andere Klone',
    'dangling?':
        'baumelnd?',
    'draggable?':
        'greifbar?',
    'rotation style':
        'Drehtyp',
    'rotation x':
        'Drehpunkt x',
    'rotation y':
        'Drehpunkt y',
    'center x':
        'Mittelpunkt x',
    'center y':
        'Mittelpunkt y',
    'name':
        'Name',
    'costume':
        'Kostüm',
    'stage':
        'B\u00fchne',
    'costumes':
        'Kostüme',
    'sounds':
        'ድምጺ',
    'scripts':
        'Skripte',
    'width':
        'Breite',
    'height':
        'Höhe',
    'left':
        'Rand links',
    'right':
        'Rand rechts',
    'top':
        'Rand oben',
    'bottom':
        'Rand unten',
    'position':
        'Position',
    'variables':
        'Variablen',
    'costume name':
        'Kostümname',
    'categories':
        'Kategorien',

    // attributes in the SET block's dropdown
    'my anchor':
        'Attribut Verankerung',
    'my parent':
        'Attribut Vorfahr',
    'my name':
        'Attribut Name',
    'my temporary?':
        'Attribut temporär?',
    'my dangling?':
        'Attribut baumelnd?',
    'my draggable?':
        'Attribut greifbar?',
    'my rotation style':
        'Attribut Drehtyp',
    'my rotation x':
        'Attribut Drehpunkt x',
    'my rotation y':
        'Attribut Drehpunkt y',

    // inheritance
    'inherited':
        'geerbt',
    'check to inherit\nfrom':
        'einschalten, um zu erben\nvon',
    'uncheck to\ndisinherit':
        'ausschalten, um \nnicht mehr zu erben',

    // editing slots inside variadic inputs
    'insert a slot':
        'Ein Feld einfügen',
    'delete slot':
        'Feld löschen',
    'insert a variable':
        'Eine Variable einfügen',
    'delete variable':
        'Variable löschen',
    'variable':
        'Variable',

    // error messages
    'Error':
        'Fehler',
    'a variable of name \'':
        'Eine Variable mit dem Namen \'',
    '\'\ndoes not exist in this context':
        '\'\ngibt es an dieser Stelle nicht',
    'expecting a':
        'Erwarte',
    'but getting a':
        'bekomme aber',
    'expecting':
        'Erwarte',
    'Inside a custom block':
        'In einem benutzerdefinierten Block',
    'The question came up at':
        'Die Frage stellte sich bei',
    'continuations cannot be forked':
        'Continuations können nicht separat gestartet werden',
    'unable to convert to':
        'Kann die Liste nicht umwandeln in',
    'Request blocked':
        'Die Anfrage wurde blockiert',
    'cannot operate on a deleted sprite':
        'kann nicht mit einem gelöschten Objekt arbeiten',
    'cannot send media,\nsprites or procedures\nto another scene':
        'Kann keine Medien, Objekte oder Programme\nan eine andere Szene senden',
    'unsupported attribute':
        'Attribut wird nicht unterstützt',
    'unable to nest\n(disabled or circular?)':
        'Kann nicht verschachteln\n(ausgeschaltet oder zirkulär?)',
    'unable to inherit\n(disabled or circular?)':
        'Kann nicht erben\n(ausgeschaltet oder zirkulär?)',
    'is read-only':
        'kann nur gelesen werden',
    'is not a valid option':
        'ist keine erlaubte Auswahl',
    'unsupported data type':
        'Nicht unterstützter Datentyp',
    'cannot handle zero width or height':
        'Breite oder Höhe dürfen nicht Null sein',
    'expecting a finite number\nbut getting Infinity or NaN':
        'Erwarte eine endliche Zahl\nbekomme aber Unendlich oder eine Nicht-Zahl',
    'the predicate takes\ntoo long for a\ncustom hat block':
        'Das Prädikat dauert zu lang für einen\nbenutzerdefinierten Ereignisblock',
    'missing / unspecified extension':
        'Fehlende / undefinierte Erweiterung',
    'reporter didn\'t report':
        'Der Rückgabewert fehlt bei einer Funktion',
    'a custom block definition is missing':
        'Ein Block ist undefiniert',
    'exceeding maximum number of clones':
        'Die maximale Anzahl von Klonen wird überschritten',
    'can only write text or numbers, not a':
        'Kann nur Text oder Zahlen schreiben, kein',
    'unsupported graphic effect':
        'Nicht unterstützter Grafikeffekt',
    'setting the rotation center requires a costume':
        'Der Drehpunkt kann nur zusammen\nmit einem Kostüm gesetzt werden',
    'Web Audio API is not supported\nin this browser':
        'Das Web Audio API wird von\ndiesem Browser nicht unterstützt',
    'several block definitions\nalready match this label':
        'Mehrere Blöcke passen\nzu dieser Aufschrift'
        
};
