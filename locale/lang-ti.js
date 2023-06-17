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
        'winna.programming@gmail.com', // optional
    'last_changed':
        '2023-05-29', // this, too, will appear in the Translators tab

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
        'ትንኩሊብ',
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
        'ሓድሽ ትንኩሊብ ወስኽ',
    'add a new Turtle sprite':
        'ሓድሽ ትንኩሊብ ወስኽ',
    'paint a new sprite':
        'ሓድሽ ትንኩሊብ ስኣል',
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
        'መድረኽ ተመሪጹ፥\nመባእታውይን\n'
            + 'ናይ ምንቅስቓስ ሕጡባት ኣይተረኽቡን',

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
        'መዳይ ጠቢብ \n መጸጸይ መባእታውይን ሕጡባት',
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
        'ብርዒ ንታሕቲ',
    'pen up':
        'ብርዒ ንላዕሊ',
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
        'ምስ ሓበሬታ',
    'Message name':
        'ስም መልእኽቲ',
    'message':
        'መልእኽቲ',
    'any message':
        'ዝኾነ መልእኽቲ',
    'data':
        'ሓበሬታ',
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
        'እንተ %b %c',
    'if %b %c else %c':
        'እንተ %b %c እንተዘይኮነ %c',
    'if %b then %s else %s':
        'እንተ %b ሽዑ %s እንተዘይኮነ %s',
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
        '%edit ምስ ዝእረም %message',
    'anything':
        'ዝኾነ ነገር',

    // sensing:
    'touching %col ?':
        '%col ተተንኪፉ፧',
    'touching %clr ?':
        '%clr ተተንኪፉ፧',
    'color %clr is touching %clr ?':
        'ሕብሪ %clr ን %clr ተተንኪፉ፧',
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
        'ትንኩሊባት',
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
        'ትኽ ዝበለ መወዳእታ ሕንጻጽ',
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
        'ሕንጻጻት ብርዒ መዝገብ',
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
        'ተግባር ጃቫስክሪፕት ( %mult%s ) { %code }',
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
        '%ida ካብ %l ደምስስ',
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
        'መግለጺታት ፕሮጀክት...',
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
        'ፕሮጀክት ከም ተራ ጽሑፍ ናብ ደገ ልኣኽ...',
    'Export project...':
        'ፕሮጀክት ናብ ደገ ልኣኽ...',
    'save project data as XML\nto your downloads folder':
        'ፕሮጀክት ከም ሰነድ XML\n ኣብ መኽዘን ዝተራገፈ ሰነዳት\nናይ ባብ መርበብ ሓበሬታ ዓቅብ',
    'show project data as XML\nin a new browser window':
        'ፕሮጀክት ከም XML\nኣብ መስኮት ባብ መርበብ ሓበሬታ ኣርኢ',
    'Export blocks...':
        'ሕጡባት ናብ ደገ ልኣኽ...',
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
        'ጽማቝ ሓበሬታ ናብ ደገ ልኣኽ....',
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
        'ድምሰሳ ትንኩሊባት ሰርዝ...',
    'Bring back deleted sprites':
        'ዝተደምሰሱ ትንኩሊባት ምለስ',
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
        'ኣገልግሎታት ዝርዝር',
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
        'ውሁብ',
    'Blurred shadows':
        'ደብዛዝ ጽላሎት',
    'uncheck to use solid drop\nshadows and highlights':
        'ኣጥፍእ፡ ድሙቐ ጽላሎትን ብርሃንን\nንምጥቃም',
    'check to use blurred drop\nshadows and highlights':
        'ወልዕ፡ ደብዛዝ ጽላሎትን ብርሃንን\nንምጥቃም',
    'Zebra coloring':
        'ሕብሪ ዘብራ',
    'check to enable alternating\ncolors for nested blocks':
        'ወልዕ፡ ተለወዋጢ ሕብሪ\nዝተሳኹዑ ሕጡባት',
    'uncheck to disable alternating\ncolors for nested block':
        'ኣጥፍእ፡ ተለወዋጢ ሕብሪ\nዝተሳኹዑ ሕጡባት',
    'Dynamic input labels':
        'ተለወዋጢ ዕላመት ኣታዊ',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'ኣጥፍእ፡ ንቫርያዳውያን (variadic) ኣትውቲ\nተለወዋጢ ዕላመታት ንምኽልካል',
    'check to enable dynamic\nlabels for variadic inputs':
        'ወልዕ፡ ንቫርያዳውያን (variadic) ኣትውቲ\nተለወዋጢ ዕላመትታት ንምሃብ',
    'Prefer empty slot drops':
        'ባዶ ተሓዝ-ቦታ ሕረ',
    'settings menu prefer empty slots hint':
        'ወልዕ፡ ኣብ ምንባር ሕጡባት\nባዶ ትሓዝቲ-ቦታ ንምሕራይ',
    'uncheck to allow dropped\nreporters to kick out others':
        'ኣጥፍእ፡ ዝተነብሩ ሕጡባት ምልጋስ ንምኻል ',
    'check to turn on\n visible stepping (slow)':
        'ወልዕ፡ መስርሕ መርሓ\nንምክትታል (ዘገምታዊ መስርሕ) ',
    'uncheck to turn off\nvisible stepping':
        'ኣጥፍእ፡ ዘገምታዊ መስርሕ መርሓ\nደው ንምባል ',
    'Long form input dialog':
        'ስፊሕ ቅጥዒ ኣታዊ',
    'Plain prototype labels':
        'ተራ ዕላመት ቅድመ-መርኣያ',
    'uncheck to always show (+) symbols\nin block prototype labels':
        'ኣጥፍእ፡ ንምልክት (+)\nካብ ዕላመት ሕጡባት ቅድመ-መርኣያ ክትስውር',
    'check to hide (+) symbols\nin block prototype labels':
        'ወልዕ፡ ንምልክት (+)\nኣብ ዕላመት ሕጡባት ቅድመ-መርኣያ ክተርኢ',
    'check to always show slot\ntypes in the input dialog':
        'ወልዕ፡ ዓይነት ሰነድ\nኣብ ቅጥዒ ኣታዊ ንምርኣይ',
    'uncheck to use the input\ndialog in short form':
        'ኣጥፍእ፡ ሓጺር ቅጥዒ ኣታዊ\nንምጥቃም',
    'JavaScript extensions':
        'ተወሰኽቲ ጃቫስችሪፕት ',
    'check to support\nnative JavaScript functions':
        'ወልዕ፡ ተግባራት ጃቫስክሪፕት\nብቐጥታ ኣብ ስናፕ(Snap!) ንምጥቃም',
    'uncheck to disable support for\nnative JavaScript functions':
        'ኣጥፍእ፡ ዝውታረ መበቆላውያን\nተግባራት ጃቫስክሪፕት ንምውጋድ',
    'JavaScript extensions for Snap!\nare turned off':
        'ተወሰኽቲ ጃቫስችሪፕት ናይ ስናፕ(Snap!)\nካብ ንጥፈት ደው ኢሎም',
    'Extension blocks':
        'ተወሰኽቲ ሕጡባት',
    'uncheck to hide extension\nprimitives in the palette':
        'ኣጥፍእ፡ ተወሰኽቲ ሕጡባት\nካብ ጽላት ንምኽዋል',
    'check to show extension\nprimitives in the palette':
        'ወልዕ፡ ተወሰኽቲ ሕጡባት\nኣብ ጽላት ንምርኣይ',
    'Input sliders':
        'ኣንሻታቲ ኣታዊ',
    'uncheck to disable\ninput sliders for\nentry fields':
        'ኣጥፍእ፡ ኣንሻታቲ ኣታዊ\nካብ ሳጹን ምዝገባ ንምውጋድ',
    'check to enable\ninput sliders for\nentry fields':
        'ወልዕ፡ ኣንሻታቲ ኣታዊ\nኣብ ሳጹን ምዝገባ ንምጥቃም',
    'Retina display support':
        'ረቲና ጉልሒ ዓልባ-ምርኢት',
    'uncheck for lower resolution,\nsaves computing resources':
        'ኣጥፍእ፡ ብትሑት ጉልሒ\nናይ ቅምራ ሓይሊ ንምዕቃብ',
    'check for higher resolution,\nuses more computing resources':
        'ወልዕ፡ ልዑል ጉልሒ ንምጥቃም፡\nአዚ ብዙሕ ናይ ቅምራ ሓይሊ ይጠልብ',
    'Codification support':
        'ናብ ኮደ ተርጎሚ',
    'Clicking sound':
        'ድምጺ ቃዕታ',
    'uncheck to turn\nblock clicking\nsound off':
        'ኣጥፍእ፡ ድምጺ ቃዕታ ንምውጋድ',
    'check to turn\nblock clicking\nsound on':
        'ወልዕ፡ ድምጺ ቃዕታ ንምቅላሕ',
    'Animations':
        'ምንቅስቓሳት',
    'uncheck to disable\nIDE animations':
        'ኣጥፍእ፡ ምንቅስቓሳት\nስደቓ-ዕዮ (IDE) ንምግታእ',
    'Turbo mode':
        'ፈጣን',
    'check to prioritize\nscript execution':
        'ወልዕ፡ ፍጻመ\nመርሓ ንምቕዳም',
    'uncheck to run scripts\nat normal speed':
        'ኣጥፍእ፡ ፍጻመ መርሓ\nናብ ንቡር ቅልጣፈ ንምምላስ',
    'check to enable\nIDE animations':
        'ወልዕ፡ ምንቅስቓሳት\nስደቓ፡ዕዮ (IDE) ንምፍቃድ',
    'Flat design':
        'ብሩህ ንድፊ',
    'check for alternative\nGUI design':
        'ወልዕ፡ ንኣማራጺ ንድፊ\nባብ ተጠቃሚ (GUI)',
    'uncheck for default\nGUI design':
        'ኣጥፍእ፡ ንልሙድ ንድፊ\nባብ ተጠቃሚ (GUI) ',
    'Nested auto-wrapping':
        'ዝተሳኹዐ ጥማር',
    'Keyboard Editing':
        'መአረምታ ብሰሌዳ መፋትሕ',
    'Table support':
        'ሰንጠረዥ ምጥቃም ኣኽእል',
    'Table lines':
        'መስመራት ሰንጠረዥ',
    'Visible stepping':
        'ዘገምታዊ መስርሕ መርሓ መደብ',
    'Thread safe scripts':
        'ሰንስለታት-መስርሕ(Thread)\nዝጻወሩ መርሓታት',
    'uncheck to allow\nscript reentrance':
        'ኣጥፍእ፡ ኣብ መፈጸምታ ዘይበጽሐ መስርሕ\nመርሓታት ምቕጻል ንምኽኣል',
    'check to disallow\nscript reentrance':
        'ወልዕ፡ ኣብ መፈጸምታ ዘይበጽሐ መስርሕ\nመርሓታት ካብ ምቕጻል ንምግታእ',
    'Flat line ends':
        'ትኽ ዝበለ መወዳእታ ሕንጻጽ',
    'check for flat ends of lines':
        'ወልዕ፡ ንትኽ ዝበለ\nመወዳእታ ሕንጻጽ',
    'uncheck for round ends of lines':
        'ኣጥፍእ፡ ንዓንኬላዊ\nመወዳእታ ሕንጻጽ',
    'Ternary Boolean slots':
        'ኣተውቲ ስለስተ ትሕዝቶኡ\nመንጠቕያ (Boolean) ',
    'Inheritance support':
        'ዓይነታዊ ምውራስ',
    'Hyper blocks support':
        'ንጡፋት ሕጡባት',
    'uncheck to disable\nusing operators on lists and tables':
         'ኣጥፍእ፡ ምጥቃም ተግባራት\nናይ ዝርዝራተን ሰንጠረጃትን ንምግታእ',
    'check to enable\nusing operators on lists and tables':
         'ወልዕ፡ ተግባራት\nናይ ዝርዝራተን ሰንጠረጃትን ንምጥቃም',
    'Log pen vectors':
        'ሕንጻጻት ብርዒ መዝገብ',
    'uncheck to turn off\nlogging pen vectors':
        'ኣጥፍእ፡ ምዝገባ\nሕንጻጻት ብርዒ ደው ንምባል',
    'check to turn on\nlogging pen vectors':
        'ወልዕ፡ ሕንጻጻት ብርዒ\nንምምዝጋብ',
    'Single palette':
        'ንጽል ጽላት',
    'check to show all blocks in a single palette':
        'ወልዕ፡ ኩሎም ሕጡባት\nኣብ ንጽል ጽላት ንምርኣይ',
    'uncheck to show only the selected category\'s blocks':
        'ኣጥፍእ፡ ሕጡባት\nናይ ዝተመርጸ ምድብ ጥራይ ንምርኣይ',
    'Show categories':
        'ምድባት ኣርኢ',
    'uncheck to hide\ncategory names\nin the palette':
        'ኣጥፍእ፡ ኣስማት ምድባት\nካብ ጽላት ንምኽዋል',
    'check to show\ncategory names\nin the palette':
        'ወልዕ፡ ኣስማት ምድባት\nኣብ ጽላት ንምርኣይ',
    'Show buttons':
        'መላጉም ኣርኢ',
    'uncheck to hide buttons\nin the palette':
        'ኣጥፍእ፡ መላጉም\nካብ ጽላት ንምኽዋል',
    'check to show buttons\nin the palette':
        'ወልዕ፡ መላጉም\nኣብ ጽላት ንምርኣይ',
    'HSL pen color model':
        'HSL ዓይነት ሕብሪ',
     'uncheck to switch pen colors\nand graphic effects to HSV':
        'ኣጥፍእ፡ ሕብሪ ብርዒን\nስእላዊ ተጽዕኖታት ናብ HSV ንምቕያር',
    'check to switch pen colors\nand graphic effects to HSL':
        'ወልዕ፡ ሕብሪ ብርዒን\nስእላዊ ተጽዕኖታት ናብ HSL ንምቕያር',
    'Disable click-to-run':
        'ሕጡባት ምጥዋቕ ግታእ',
    'uncheck to enable\ndirectly running blocks\nby clicking on them':
        'ኣጥፍእ፡ ሕጡባት\nምስተጠወቑ ብቐጥታ ስራሕ\nከምዝጅምሩ ንምግባር',
    'check to disable\ndirectly running blocks\nby clicking on them':
        'ወልዕ፡ ሕጡባት\nምስተጠወቑ ብቐጥታ ስራሕ\nከምዘይጅምሩ ንምግባር',
    'Disable dragging data':
        'ምስሓብ ሰነድ ግታእ',
    'uncheck to drag media\nand blocks out of\nwatchers and balloons':
        'ኣጥፍእ፡ ሰነዳትን ሕጡባትን\nካብ ትቓያየርትን ዓፍራታት ዘረባን\nስሒብካ ንምውጻእ',
    'disable dragging media\nand blocks out of\nwatchers and balloons':
        'ወልዕ፡ ሰነዳትን ሕጡባትን\nካብ ትቓያየርትን ዓፍራታት ዘረባን\nስሒብካ ካብ ምውጻእ ምግታእ',

    // inputs
    'with inputs':
        'ምስ ኣተውቲ',
    'input names:':
        'ኣስማት ኣተውቲ፦',
    'Input Names:':
        'ኣስማት ኣተውቲ፦',
    'input list:':
        'ዝርዝር ኣተውቲ፦',

    // context menus:
    'help':
        'ሓገዝ',

    // palette:
    'find blocks':
        'ሕጡባት ኣናዲ',
    'hide blocks...':
        'ሕጡባት ከውል...',
    'Hide blocks in palette':
        'ናይ ጽላት ሕጡባት ከውል',
    'unused':
        'ኣብ ጥቕሚ ዘይወዓለ',
    'make a category...':
        'ሓድሽ ምድብ ኣዳሉ...',
    'New Category':
        'ሓድሽ ምድብ',
    'Blocks category name:':
        'ስም ምድብ፦',
    'Category color':
        'ሕብሪ ምድብ',
    'red':
        'ቀይሕ',
    'green':
        'ቀጠልያ',
    'blue':
        'ሰመያዊ',
    'delete a category...':
        'ምድብ ደምስስ...',

    // blocks:
    'help...':
        'ሓገዝ...',
    'relabel...':
        'ዕላመት ቀይር...',
    'compile':
        'ኣርንብ',
    'uncompile':
        'ዝተኣርነበ ፍታሕ',
    'duplicate':
        'ኣባዝሕ',
    'make a copy\nand pick it up':
        'ቅዳሕ\nንቕዳሕ ካኣ ሓዝ',
    'only duplicate this block':
        'ነዛ ሕጡብ ጥራይ ኣባዝሕ',
    'extract':
        'ኣውጽእ',
    'only grab this block':
        'ነዛ ሕጡብ ጥራይ ኣንቀሳቕስ',
    'delete':
        'ደምስስ',
    'senders...':
        'ሰዳዲ...',
    'receivers...':
        'ተቐባሊ...',
    'script pic...':
        'ስእሊ መርሓ...',
    'save a picture\nof this script':
        'ስእሊ ናይ\nእዚ መርሓ ዓቅብ',
    'result pic...':
        'ስእሊ ውጽኢት...',
    'save a picture of both\nthis script and its result':
        'ስእሊ ናይ እዚ መርሓን\nውጽኢቱን ዓቅብ',
    'export script':
        'መርሓ ናብ ደገ ልኣኽ',
    'download this script\nas an XML file':
        'ነዚ መርሓ ከም\nሰነድ XML ኣራግፍ',
    'ringify':
        'ኣብ ቀለቤት ኣእቱ',
    'unringify':
        'ካብ ቀለቤት ኣውጽእ',
    'transient':
        'ግዜያዊ',
    'uncheck to save contents\nin the project':
        'ወልዕ፡ ትሕዝቶ ኣብ ውሽጢ\nፕሮጀክት ንምዕቃብ',
    'check to prevent contents\nfrom being saved':
        'ኣጥፍእ፡ ምዕቃብ ትሕዝቶ\nኣብ ውሽጢ ፕሮጀክት ንምግትእ',
    'new line':
        'ሓድሽ መስመር',

    // custom blocks:
    'delete block definition...':
        'መምርሒ ሕጡብ ደምስስ...',
    'duplicate block definition...':
        'መምርሒ ሕጡብ ኣባዝሕ...',
    'export block definition...':
        'መምርሒ ሕጡብ ናብ ደገ ልኣኽ...',
    'including dependencies':
        'ምስ ኩሎም ኣብ ጥቕሚ ዘለው ሕጥባት',
    'edit...':
        'ኣተዓራሪ...',
    'translations...':
        'ትርጉማት...',
    'block variables...':
        'ተቓያየርቲ ናይ ሕጡብ...',
    'in palette':
        'ኣብ ጽላት',

    // sprites:
    'edit':
        'ኣተዓራሪ',
    'clone':
        'ቅዳሕ',
    'move':
        'ኣንቀሳቕስ',
    'pivot':
        'መቐልስ',
    'edit the costume\'s\nrotation center':
        'ማእከል ዙረት ናይ ልብሲ\nኣርኢን ኣተዓራርን',
    'rotate':
    	'ኣዙር',
    'stick to':
        'ኣጥብቕ ኣብ',
    'detach from':
        'ፍለ ካብ',
    'detach all parts':
        'ኩሎም ኣባላት ፈላሊ',
    'export...':
        'ናብ ደገ ልኣኽ...',
    'parent...':
        'ወላዲ...',
    'current parent':
        'እዋናዊ ወላዲ',
    'release':
        'ፍታሕ',
    'make temporary and\nhide in the sprite corral':
        'ግዜያዊ ግበር\nኣብመዕቆቢ ትንኩሊብ ድማ ሕባእ',

    // stage:
    'show all':
        'ኩሉ ኣርኢ',
    'pic...':
        'ስእሊ ናብ ደገ ልኣኽ...',
    'save a picture\nof the stage':
        'ስእሊ ናይ መድረኽ\nዓቅብ',
    'svg...':
        'SVG ናብ ደገ ልኣኽ...',
    'export pen trails\nline segments as SVG':
        'ሕንጻጻት ኣብ ኣሰራት ብርዒ\nከም SVG ናብ ደገ ልኣኽ',
    'there are currently no\nvectorizable pen trail segments':
        'ሕጂ ናብ SVG ክቕየሩ ዝኽእሉ\nኣሰራት ብርዒ የለዉን',
    'turn all pen trails and stamps\ninto a new background for the stage':
        'ኩሉ ኣሰራት ብርዒን ማሕተማትን\nናብ ድሕረ ባይታ ናይ መድረኽ ቀይር',
    'turn all pen trails and stamps\ninto a new costume for the\ncurrently selected sprite':
        'ካብ ኩሉ ኣሰራት ብርዒን ማሕተማትን\nሓድሽ ልብሲ ነታ ተመሪጻ ዘላ ትንኩሊብ ሰንዕ',

    // scripting area
    'clean up':
        'ኣጽሪ',
    'arrange scripts\nvertically':
        'መርሓ ንትኹል ስራዕ',
    'add comment':
        'መብርሂ ወስኽ',
    'undrop':
        'ኣልዕል',
    'undo the last\nblock drop\nin this pane':
        'ኣብ መወዳእ\nዝተንብረት\nሕጡብ ኣልዕል',
    'redrop':
        'ዳግም ኣንብር',
    'use the keyboard\nto enter blocks':
    	'ሕጡባት ንምምባር\nሰሌዳ መፋትሕ ተጠቀም',
    'scripts pic...':
        'ስእሊ ናይ መርሓ...',
    'save a picture\nof all scripts':
        'ስእሊ ናይ ኩሎም\nመርሓታት ዓቅብ',
    'make a block...':
        'ሓድሽ ሕጡብ ህነጽ...',

    // costumes
    'rename':
        'ዳግም ሰይም',
    'export':
        'ናብ ደገ ልኣኽ',
    'rename costume':
        'ልብሲ ዳግም ሰይም',
    'rename background':
        'ድሕረ ባይታ ዳግም ሰይም',
    'get blocks':
        'ሕጡባት ኣምጽእ',
    'get data':
        'ሰነዳት ኣምጽእ',

    // sounds
    'Play sound':
        'ድምጺ ኣቃልሕ',
    'Stop sound':
        'ምቅላሕ ደው ኣብል',
    'Stop':
        'ደው ኣብል',
    'Play':
        'ኣቃልሕ',
    'rename sound':
        'ድምጺ ዳግም ሰይም',

    // lists and tables
    'list view...':
        'ትርኢት ዝርዝር...',
    'table view...':
        'ትርኢት ሰንጠረጅ...',
    'Table view':
        'ትርኢት ሰንጠረጅ',
    'open in dialog...':
        'ኣብ ሓድሽ መስኮት ክፈት',
    'blockify':
        'ከም ሕጡብ',
    'reset columns':
        'ግፍሒ ዓምዲታት ናብ ፈለማ ምለስ',
    'items':
        'ባእታታት',

    // dialogs
    // buttons
    'OK':
        'ሕራይ',
    'Ok':
        'ሕራይ',
    'Cancel':
        'ሰርዝ',
    'Yes':
        'እወ',
    'No':
        'ኣይፋል',

    // help
    'Help':
        'ሓገዝ',

    // zoom blocks
    'Zoom blocks':
        'ሕጡባት ኣጉልሕ',
    'build':
        'ህነጽ',
    'your own':
        'ናትካ',
    'blocks':
        'ሕጡባት',
    'normal (1x)':
        'ልሙድ (1x)',
    'demo (1.2x)':
        'መፈተኒ (1.2x)',
    'presentation (1.4x)':
        'መርኣይ (1.4x)',
    'big (2x)':
        'ዓቢ (2x)',
    'huge (4x)':
        'ገዚፍ (4x)',
    'giant (8x)':
        'ደርማስ (8x)',
    'monstrous (10x)':
        'ዓርሞሸሽ (10x)',

    // fade blocks
    'Fade blocks':
        'ሕጡባት ኣህስስ',
    'block-solid (0)':
        'ልሙድ (0)',
    'medium (50)':
        'ማእከላይ (50)',
    'light (70)':
        'ፈኵስ (70)',
    'shimmering (80)':
        'ዘብለጭልጭ (80)',
    'elegant (90)':
        'ምዕሩግ (90)',
    'subtle (95)':
        'ደብዛዝ (95)',
    'text-only (100)':
        'ጽሑፍ ጥራይ (100)',

    // Project Manager
    'Untitled':
        'ኣርእስቲ ዘይተዋህቦ',
    'Open Project':
        'ፕሮጀክት ክፈት',
    'Open':
        'ክፈት',
    '(empty)':
        '(ጥራዩ)',
    'Saved!':
        'ተዓቂቡ!',
    'Delete Project':
        'ፕሮጀክት ደምስስ',
    'Are you sure you want to delete':
        'ብርግጽ ክትድምስስ ደሊኻ፧',
    'rename...':
        'ዳግም ሰይም...',
    'Examples':
        'ኣብነታት',
    'Share':
        'ኣካፍል',
    'Unshare':
        'ምክፋል ደው ኣብል',
    'Publish':
        'ዘርግሕ',
    'Unpublish':
        'ምዝርግሕ ደው ኣብል',
    'Updating\nproject list...':
        'ዝርዝር ፕሮጀክታት\nእዝምን...',
    'Recover':
        'ኣምለሰ',
    'Today':
        'ሎሚ',
    'Yesterday':
        'ትማሊ',

    // costume editor
    'Costume Editor':
        'ሰደቓ-ዕዮ ልብሲ',
    'Paint Editor':
        'ሰደቓ-ዕዮ ስእሊ',
    'click or drag crosshairs to move the rotation center':
        'መስቀል-ዕላማ ጠውቕ ወይ ስሓብ ማእከል ዙረት ንምቕያር',
    'undo':
        'ምለስ',
    'Vector':
        'መኣጠን',
    'Paintbrush tool\n(free draw)':
        'መስኣሊ ኣስባስላ\n(ናጻ ስኣል)',
    'Stroked Rectangle\n(shift: square)':
        'ርቡዕኩርናዕ\n(መፍትሕ-ምቅይያር፦ ትርብዒት)',
    'Stroked Ellipse\n(shift: circle)':
        'ኤሊፕስ\n(መፍትሕ-ምቅይያር፦ ዓንኬል)',
    'Eraser tool':
        'መደምሰስ',
    'Set the rotation center':
        'ማእከል ዙረት ኣንብር',
    'Line tool\n(shift: vertical/horizontal)':
        'ሕንጻጽ\n(መፍትሕ-ምቅይያር፦ ትኹል/ጋድም)',
    'Filled Rectangle\n(shift: square)':
        'ዝመልአ ርቡዕኩርናዕ\n(መፍትሕ-ምቅይያር፦ ትርብዒት)',
    'Filled Ellipse\n(shift: circle)':
        'ዝመልአ ኤሊፕስ\n(መፍትሕ-ምቅይያር፦ ዓንኬል)',
    'Fill a region':
        'ንዓውዲ ብዝመረጽካዮ\nሕብሪ ቅባእ',
    'Pipette tool\n(pick a color anywhere)':
        'መምጸይ\n(ብምጥዋቕ፡ ዝደለኻዮ ሕብሪ መሪጽካ ኣልዕል)',
    'Brush size':
        'ዓቐን ኣስባስላ',
    'Constrain proportions of shapes?\n(you can also hold shift)':
        'ምጣነ ቅርጽታት ሓሉ\n(መፍትሕ-ምቅይያር ብምጽቃጥ ውን ክፍጸም ይካኣል)',
    //'grow':
    //    'größer',
    //'shrink':
    //    'kleiner',
    //'flip ↔':
    //    'drehen ↔',
    //'flip ↕':
    //    'drehen ↕',
    
    'Vector Paint Editor':
        'ሰደቓ-ዕዮ ስእሊ መኣጠን',
    'Rectangle\n(shift: square)':
        'ርቡዕኩርናዕ\n(መፍትሕ-ምቅይያር፦ ትርብዒት)',
    'Ellipse\n(shift: circle)':
        'ኤሊፕስ\n(መፍትሕ-ምቅይያር፦ ዓንኬል)',
    'Selection tool':
        'ምረጽ',
    'Line tool\n(መፍትሕ-ምቅይያር፦ constrain to 45º)':
        'ሕንጻጽ\n(Shift: ብዙሕ ዕጽፊ ናይ 45°)',
    'Closed brush\n(free draw)':
        'ዕጹው፡ ምሉእ ቅርጺ\n(ናጻ ስኣል)',
    'Paint a shape\n(shift: secondary color)':
        'ንቕርጺ ሕብሪ ቅባእ\n(መፍትሕ-ምቅይያር፦ ካልኣውያን ሕብርታት)',
    'Pipette tool\n(pick a color from anywhere\nshift: secondary color)':
        'መምጸይ\nብምጥዋቕ፡ ዝደለኻዮ ሕብሪ መሪጽካ ኣልዕል\n(መፍትሕ-ምቅይያር፦ ካልኣውያን ሕብርታት)',
    'Edge color\n(left click)':
        'ሕብሪ ደረት\n(ጸጋም ጠውቕ)',
    'Fill color\n(right click)':
        'ሕብሪ ማእከል\n(የማን ጠውቕ)',
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
        'መግለጺታት ፕሮጀክት',

    // new project
    'New Project':
        'ሓድሽ ፕሮጀክት',
    'Unsaved Changes!':
        'ዘይተዓቀበ ለውጥታት!',
    'Replace the current project with a new one?':
        'ነዛ ፕሮጀክት ብሓዳሽ ፕሮጀክት ተክኣያ?',
    'Backup failed.\nThis cannot be undone, proceed anyway?':
        'መሐለውታ ምድላው ኣይሰርሐን።\n ብዘየገድስ ቀጽል፧ ',

    // save project
    'Save Project As...':
        'ፕሮጀክት ዓቅብ፡ ብስም...',
    'Save Project':
        'ፕሮጀክት ዓቅብ',

    // export blocks
    'Export blocks':
        'ሕጡባት ናብ ደገ ልኣኽ',
    'Import blocks':
        'ሕጡባት ካብ ደገ ጸዓን',
    'this project doesn\'t have any\ncustom global blocks yet':
        'ኣብ\'ዚ ፕሮጀክት ገና\nሓፈሻውያን ሕጡባት የለውን',
    'select':
        'ምረጽ',
    'none':
        'ዋላ ሓደ',

    // variable dialog
    'for all sprites':
        'ንኹለን ትንኩሊባት',
    'for this sprite only':
        'ነዛ ትንኩሊብ ጥራይ',

    // variables refactoring
    'rename only\nthis reporter':
        'ነዚ ሕጡብ ጥራይ\nዳግም ሰይም',
    'rename all...':
        'ንኹሎም ዳግም ሰይም...',
    'rename all blocks that\naccess this variable':
        'ኩሎም ነዚ ተቓያያሪ ዝውከሱ\nሕጡባት ዳግም ሰይም',


    // block dialog
    'Change block':
        'ሕጡብ ቀይር',
    'Command':
        'ትእዛዝ',
    'Reporter':
        'ተግባር',
    'Predicate':
        'ኣረጋጋጺ',

    // block editor
    'Block Editor':
        'ሰደቓ-ዕዮ ሕጡብ',
    'Method Editor':
        'ሰደቓ-ዕዮ ሜላ',
    'Apply':
        'ተጠቀም',

    // block deletion dialog
    'Delete Custom Block':
        'ሕጡብ ደምስስ',
    'block deletion dialog text':
        'እዚ ሕጡብ ምስኩሎም ኣብነታቱ\n ብርግጽ ዶ ክድምሰስ፧',

    // input dialog
    'Create input name':
        'ኣታዊ ሰይም',
    'Edit input name':
        'ስም ኣታዊ ኣርም',
    'Edit label fragment':
        'ዕላመት ኣርም',
    'Title text':
        'ኣርእስቲ',
    'Input name':
        'ስም ኣታዊ',
    'Delete':
        'ደምስስ',
    'Object':
        'ውዱዕ',
    'Number':
        'ኣሃዝ',
    'Text':
        'ፊደል',
    'List':
        'ዝርዝር',
    'Any type':
        'ኩሉ ዓይነት',
    'Boolean (T/F)':
        'መንጠቕያ (ሓ/ጌ)',
    'Command\n(inline)':
        'ትእዛዝ',
    'Command\n(C-shape)':
        'ትእዛዝ\n(ር-ቅርጹ)',
    'Any\n(unevaluated)':
        'ኩሉ ዓይነት\n(ዘይተቐመረ)',
    'Boolean\n(unevaluated)':
        'መንጠቕያ\n(ዘይተቐመረ)',
    'Single input.':
        'ንጽል ኣታዊ.',
    'Default Value:':
        'ውሁብ ዋጋ:',
    'Multiple inputs (value is list of inputs)':
        'ብዙሓት ኣተውቲ (ከም ዝርዝር)',
    'Upvar - make internal variable visible to caller':
        'ውሽጣውያን ተቐያየርቲ ኣብ ደገ (ንጸዋዒ) ከም ዝራኣዩ ግበር',

    // About Snap
    'About Snap':
        'ብዛዕባ ስናፕ',
    'Back...':
        'ተመለስ...',
    'License...':
        'ፍቓድ...',
    'Modules...':
        'ክፍለ-ኣካላት...',
    'Credits...':
        'ኣበርከቲ...',
    'Translators...':
        'ተርጐምቲ',
    'License':
        'ፍቓድ',
    'current module versions:':
        'ህሉው ሕታማት ክፍለ-ኣካላት',
    'Contributors':
        'ኣበርከቲ',
    'Translations':
        'ትርጉማት',

    // variable watchers
    'normal':
        'ልሙድ',
    'large':
        'ዓቢ',
    'slider':
        'ኣንሻታቲ',
    'slider min...':
        'ታሕተዋይ ዋጋ...',
    'slider max...':
        'ላዕልዋይ ዋጋ...',
    'import...':
        'ካብ ደገ ኣእቱ...',
    'raw data...':
        'ጥረ ሓበሬታ...',
    'import without attempting to\nparse or format data':
        'ሓበሬታ ወይ ሰነድ\nብዘይ ምቅይያር ካብ ደገ ኣእቱ',
    'Slider minimum value':
        'ታሕተዋይ ዋጋ ኣንሻታቲ',
    'Slider maximum value':
        'ላዕልዋይ ዋጋ ኣንሻታቲ',

    // list watchers
    'length: ':
        'ንውሓት: ',

    // comments
    'add comment here...':
        'ኣብዚ መብርሂ ወስኽ',
    'comment pic...':
        'ስእሊ መብርሂ...',
    'save a picture\nof this comment':
        'ናይዚ መብርሂ\nስእሊ ዓቅብ',

    // drow downs
    // directions
    '(90) right':
        '(90) የማን',
    '(-90) left':
        '(-90) ጸጋም',
    '(0) up':
        '(0) ላዕሊ',
    '(180) down':
        '(180) ታሕቲ',
    'random':
    	'ሃውሪ',
     'random position':
     	'ናይ ሃውሪ ነቑጣ',

    // collision detection
    'mouse-pointer':
        'ኣመልካቲ-ኣንጭዋ',
    'edge':
        'ደረት',
    'pen trails':
        'ኣሰራት ብርዒ',
    'center':
        'ማእከል',

    // costumes
    'Turtle':
        'ሓባሪ መኣዝን',
    'Empty':
        'ባዶ',
    'Paint a new costume':
        'ሓድሽ ልብሲ ሰኣል',
    'Import a new costume from your webcam':
        'ሓድሽ ልብሲ ካብ ሰኣሊት ኣእቱ',
    'Please make sure your web browser is up to date\nand your camera is properly configured. \n\nSome browsers also require you to access Snap!\nthrough HTTPS to use the camera.\n\nPlase replace the "http://" part of the address\nin your browser by "https://" and try again.':
        'ባብ መርበብ ሓበሬታ እዋናዊ ሙኻኑን\nሰኣሊት ክምዝተስታኻኸልትን ኣረጋግጽ።\n\nኣብ ግሊኡ ባባት መርበብ ሓበሬታ ሰኣሊት ንምጥቃም፡\nስናፕ! ብ HTTPS ክኽፍት ኣለዎ።\n\nአዚ ንምግባር ን "http://" ክፋል ኣድራሻ መርበብ ሓበሬታ\nብ "https://" ተክእ።',
    'Camera':
        'ሰኣሊት',
    
    // sounds
    'Record a new sound':
        'ሓድሽ ድምጺ ቅረጽ',
    

    // graphical effects, pen color
    'color':
        'ሕብሪ',
    'hue':
        'ሕብሪ',
    'fisheye':
        'ዓይኒ ዓሳ',
    'whirl':
        'ሕምብሊል',
    'pixelate':
        'ዋህዮ ስእሊ',
    'mosaic':
        'ሞዛይክ',
    'saturation':
        'ቅጸት',
    'brightness':
        'ድምቀት',
    'lightness':
        'ብርሃንነት',
    'transparency':
        'ሽፋፍነት',
    'ghost':
        'ምትሃት',
    'negative':
        'ኣሉታ ስእሊ',
    'comic':
        'ውቁጥ',
    'confetti':
        'ኮንፈቲ',

    // keys
    'space':
        'ባዶ ቦታ',
    'enter':
        'ኣእቱ',
    'up arrow':
        'ኲናት ንላዕሊ',
    'down arrow':
        'ኲናት ንታሕቲ',
    'right arrow':
        'ኲናት ንየማን',
    'left arrow':
        'ኲናት ንጸጋም',
    'any key':
        'ዝኾነ መፍትሕ',
    'a':
        'አ',
    'b':
        'ብ',
    'c':
        'ች',
    'd':
        'ድ',
    'e':
        'እ',
    'f':
        'ፍ',
    'g':
        'ግ',
    'h':
        'ህ',
    'i':
        'ኢ',
    'j':
        'ጅ',
    'k':
        'ክ',
    'l':
        'ል',
    'm':
        'ም',
    'n':
        'ን',
    'o':
        'ኦ',
    'p':
        'ፕ',
    'q':
        'ቅ',
    'r':
        'ር',
    's':
        'ስ',
    't':
        'ት',
    'u':
        'ኡ',
    'v':
        'ቭ',
    'w':
        'ው',
    'x':
        'ሽ',
    'y':
        'ይ',
    'z':
        'ዝ',
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
        'ሓድሽ...',
    '__shout__go__':
        'ቀጠልያ ባንዴራ ተጠዊቓ',

    // math functions
    'abs':
        'ፍጹም ብዝሒ',
    'ceiling':
        'ንላዕሊ ኣጸጋግዕ',
    'floor':
        'ንታሕቲ ኣጸጋግዕ',
    'sqrt':
        'ሱር ትርብዒት',
    'sin':
        'ሳይን',
    'cos':
        'ኮስይን',
    'tan':
        'ታንጀንት',
    'asin':
        'ኣርክስይን',
    'acos':
        'ኣርክኮስይን',
    'atan':
        'ኣርክታንጀንት',
    'ln':
        'ln',
    'e^':
        'e^',

    // Boolean expressions keyboard entry
    'not':
        'ዘይኮነ',

    // delimiters
    'letter':
        'ፊደል',
    'word':
        'ቃል',
    'whitespace':
        'ባዶ ቦታ',
    'line':
        'መስመር',
    'tab':
        'መፈላልጦ',
    'cr':
        'ሓድሽ መስመር',

    // data types
    'number':
        'ኣሃዝ',
    'text':
        'ጽሑፍ',
    'Boolean':
        'መንጠቕያ',
    'list':
        'ዝርዝር',
    'command':
        'ትእዛዝ',
    'reporter':
        'ተግባር',
    'predicate':
        'ኣረጋጋጺ',
    'sprite':
        'ትንኩሊብ',
    'ring':
        'ቀለቤት',
    'nothing':
        'ዋላ ሓደ',

    // list indices
    'last':
        'መወዳእታ',
    'any':
        'ዝኾነ',

    // attributes
    'my':
        'መለለዪ',
    'neighbors':
        'ጎረባብቲ',
    'self':
        'ገዛእ-ርእሲ',
    'other sprites':
        'ካልእ ትንኩሊባት',
    'parts':
        'ክፋላት',
    'anchor':
        'መልህቕ',
    'parent':
        'ወላዲ',
    'temporary?':
        'ግዜያዊ?',
    'children':
        'ውሉዳት',
    'clones':
        'ቅዳሓት',
    'other clones':
        'ካልኦት ቅዳሓት',
    'dangling?':
        'ዝተንጠልጠለ?',
    'draggable?':
        'ዝሰሓብ?',
    'rotation style':
        'ዓይነት ዙረት',
    'rotation x':
        'ማእከል ዙረት ሀ',
    'rotation y':
        'ማእከል ዙረት ሰ',
    'center x':
        ' ማእከላይ ነጥቢ ሀ',
    'center y':
        ' ማእከላይ ነጥቢ ሰ',
    'name':
        'ስም',
    'costume':
        'ልብሲ',
    'stage':
        'መድረኽ',
    'costumes':
        'ኣልባሳት',
    'sounds':
        'ድምጺ',
    'scripts':
        'መርሓታት',
    'width':
        'ጎድኒ',
    'height':
        'ቁመት',
    'left':
        'ጸጋማይ ደረት',
    'right':
        'የማናይ ደረት',
    'top':
        'ላዕለዋይ ደረት',
    'bottom':
        'ታሕተዋይ ደረት',
    'position':
        'ነቑጣ',
    'variables':
        'ተቐያየርቲ',
    'costume name':
        'ስም ልብሲ',
    'categories':
        'ምድባት',

    // attributes in the SET block's dropdown
    'my anchor':
        'መለለዪ መልህቕ',
    'my parent':
        'መለለዪ ወላዲ',
    'my name':
        'መለለዪ ስም',
    'my temporary?':
        'መለለዪ ግዜያዊ?',
    'my dangling?':
        'መለለዪ ዝተንጠልጠለ?',
    'my draggable?':
        'መለለዪ ዝሰሓብ?',
    'my rotation style':
        'መለለዪ ዓይነት ዙረት',
    'my rotation x':
        'መለለዪ ማእከል ዙረት ሀ',
    'my rotation y':
        'መለለዪ ማእከል ዙረት ሰ',

    // inheritance
    'inherited':
        'ዝተወርሰ',
    'check to inherit\nfrom':
        'ወልዕ፡ ንኽትወርስ\nካብ',
    'uncheck to\ndisinherit':
        'ኣጥፍእ፡ ምውራስ\nድው ንምባል',

    // editing slots inside variadic inputs
    'insert a slot':
        'ሳጹን ኣእቱ',
    'delete slot':
        'ሳጹን ደምስስ',
    'insert a variable':
        'ተቐያያሪ ኣእቱ',
    'delete variable':
        'ተቐያያሪ ድምስስ',
    'variable':
        'ተቐያያሪ',

    // error messages
    'Error':
        'ጌጋ',
    'a variable of name \'':
        'ተቐያያሪ ብስም \'',
    '\'\ndoes not exist in this context':
        '\'\nኣብዚ መዳይ የለን',
    'expecting a':
        'ትጽቢት',
    'but getting a':
        'ትረኽቦ ግን',
    'expecting':
        'ትጽቢት',
    'Inside a custom block':
        'ኣብ ሓደ ዓሚላዊ ሕጡብ',
    'The question came up at':
        'እቲ ሕቶ ተላዒሉ ኣብ',
    'continuations cannot be forked':
        'መቐጸልታታት በይኖም ክጅምሩ ኣይክእሉን እዮም',
    'unable to convert to':
        'ኣይክኣልን ምቕያር ናብ',
    'Request blocked':
        'ጻዊዒት ተዓጊቱ',
    'cannot operate on a deleted sprite':
        'ኣብ ዝተደምሰሰት ትንኩሊብ ዝኾነ ተግባራት ክፍጸም ኣይካኣልን እዩ',
    'cannot send media,\nsprites or procedures\nto another scene':
        'ዝኾን ሓበሬታ፡ ውዱዕ ወይ መርሓ\nናብ ካልእ ዓውደ ፍጻመ ምስዳድ ኣይተኻእለን ',
    'unsupported attribute':
        'መለለዪ ደገፍ የብሉን',
    'unable to nest\n(disabled or circular?)':
        'ክሳዃዕ ኣይከኣለን\n(ዝጠፍአ ወይ ዓንኬላዊ?)',
    'unable to inherit\n(disabled or circular?)':
        'ክወርስ ኣይከኣለን\n(ዝጠፍአ ወይ ዓንኬላዊ?)',
    'is read-only':
        'ክንበብ ጥራይ ዝኽእል',
    'is not a valid option':
        'ብቑዕ ኣማራጺ ኣይኮነን',
    'unsupported data type':
        'ዘይተደገፈ ዓይነት ሓብሪታ',
    'cannot handle zero width or height':
        'ጎድኒ ወይ ቁመት ባዶ ክኾኑ የብሎምን',
    'expecting a finite number\nbut getting Infinity or NaN':
        'ትጽቢት ታእላው ኣሃዝ\nዝተረኽበ ግን ኢታእላው ኣሃዝ ወይ ኣሃዝ ዝይኮነ',
    'the predicate takes\ntoo long for a\ncustom hat block':
        'እዛ ኣረጋጋጺት ተግባር\nንዓሚላዊ ናይ ፍጻመ ሕጡብ\nብዙሕ ግዜ ትወስድ ኣላ',
    'missing / unspecified extension':
        'ዝጎደለ / ዘይተወሰነ ተወሳኺ',
    'reporter didn\'t report':
        'ጸብጻቢ ተግባር መልሲ ኣይሃበን',
    'a custom block definition is missing':
        'ዓሚላዊ ሕጡብ ኣይተዋደደን ',
    'exceeding maximum number of clones':
        'ዝለዓለ ፍቑድ ብዝሒ ቅዳሓት ተጣሒሱ',
    'can only write text or numbers, not a':
        'ፊደላት ወይ ኣሃዛት ጥራይ እዩ ክጸሓፍ ዝፍቀድ፡ ሓደ ካብ ዘይፍቑዳት',
    'unsupported graphic effect':
        'ዘይተደገፈ ስእላዊ ተጽዕኖ',
    'setting the rotation center requires a costume':
        'ማእከል ዙረት ምስ ልብሲ ጥራይ እዩ ክንበር ዝከኣል',
    'Web Audio API is not supported\nin this browser':
        'እዚ ድምጺ መርበብ API\nበዚ ባብ መርበብ ሓበሬታ ኣይድገፈን እዩ',
    'several block definitions\nalready match this label':
        'ከም እዚ ዕላመት ዘለወን\nድሮ ብዙሓት ሕጡባት ተዋዲደን ኣለዋ'
        
};
