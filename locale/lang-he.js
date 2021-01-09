/*

    lang-he.js

    Hebrew transelation  for SNAP!

    written by Yossi Cohen

    Copyright (C) 2014 by Yossi Cohen

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

SnapTranslator.dict.he = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    Ã„, Ã¤   \u00c4, \u00e4
    Ã–, Ã¶   \u00d6, \u00f6
    Ãœ, Ã¼   \u00dc, \u00fc
    ÃŸ      \u00df
*/

    // translations meta information
    'language_name':
        'עברית', // the name as it should appear in the language menu
    'language_translator':
        'יוסי כהן', // your name for the Translators tab
    'translator_e-mail':
        'cohenyossi81@gmail.com', // optional
    'last_changed':
        '2020-04-21', // this, too, will appear in the Translators tab

    // GUI
    // control bar:
    'untitled':
        'ללא כותרת',
    'development mode':
        'מצב פיתוח',

    // categories:
    'Motion':
        'תנועה',
    'Looks':
        'מראה',
    'Sound':
        'צליל',
    'Pen':
        'עט',
    'Control':
        'בקרה',
    'Sensing':
        'חיישנים',
    'Operators':
        'הפעלה',
    'Variables':
        'משתנים',
    'Lists':
        'רשימות',
    'Other':
        'אחר',

    // editor:
    'draggable':
        'פריטים נגררים',

    // tabs:
    'Scripts':
        'תסריטים',
    'Costumes':
        'תלבושות',
    'Sounds':
        'צלילים',
    'Backgrounds':
        'רקעים',


    // names:
    'Sprite':
        'דמות',
    'Stage':
        'במה',

    // rotation styles:
    'don\'t rotate':
        'ללא סיבוב',
    'can rotate':
        'ניתן לסובב',
    'only face left/right':
        'רק פנים ימינה-שמאלה',

    // new sprite button:
    'add a new sprite':
        'הוסף דמות חדשה',
    'add a new Turtle sprite':
        'הוסף דמות צב חדשה',
    'paint a new sprite':
        'צייר דמות חדשה',
    'take a camera snapshot and\nimport it as a new sprite':
        'השתמש במצלמה לייצר דמות חדשה',

    // tab help
    'costumes tab help':
        // 'import a picture from another web page or from\n'
        // + 'a file on your computer by dropping it here\n',
        'ייבא תמונה מאתר אינטרנט\n' + 'או מהמחשב שלך על ידי גרירתה לכאן',
    'import a sound from your computer\nby dragging it into here':
        'ייבא צלילים מהמחשב שלך על-ידי גרירתם לכאן',



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
        'במה נבחרה: ללא תנועה',

    'move %n steps':
        'צעדים %n זוז',
    'turn %clockwise %n degrees':
        'מעלות %n %clockwise פנה',
    'turn %counterclockwise %n degrees':
        'מעלות %n %counterclockwise פנה',
    'point in direction %dir':
        ' %dir פנה_לכיוון',
    'point towards %dst':
        ' %dst פנה_לעבר ',
    'go to x: %n y: %n':
        'לך_אל  x: %n y: %n',
    'go to %dst':
        ' %dst לך_אל',
    'glide %n secs to x: %n y: %n':
        'שניות %n גלוש_במשך x: %n y: %n',
    'change x by %n':
        ' %n ב x שנה',
    'set x to %n':
        '%n ל x הגדר',
    'change y by %n':
        ' %n ב y שנה',
    'set y to %n':
        '%n ל y הגדר',
    'if on edge, bounce':
        'אם_בקצה_אז_קפוץ',
    'x position':
        ' x מיקום ',
    'y position':
        ' y מיקום ',
    'direction':
        'כיוון',

    // looks:
    'switch to costume %cst':
        '%cst החלף_לתלבושת',
    'next costume':
        'התלבושת_הבאה',
    'costume #':
        'תלבושת_מספר',
    'say %s for %n secs':
        ' %s שניות_אמור %n למשך ',
    'say %s':
        '%s אמור',
    'think %s for %n secs':
        ' %s שניות_תחשוב %n למשך ',
    'think %s':
        ' %s תחשוב',
    'Hello!':
        '!שלום',
    'Hmm...':
        'המממ...',
    'change %eff effect by %n':
        '%eff שינוי_ב_אפקט %n',
    'set %eff effect to %n':
        '%eff קביעת_ערך_אפקט %n',
    'clear graphic effects':
        'נקה_אפקטים_גרפיים',
    'change size by %n':
        ' שנוי_גודל %n',
    'set size to %n %':
        '% %n קבע_גודל_ל',
    'size':
        'גודל',
    'show':
        'הראה',
    'hide':
        'הסתר',
    'go to front':
        'העבר_לחזית',
    'go back %n layers':
        'שכבות %n הזז_לאחור',
    '%img of costume %cst':
        '%img מאפיין_של_תלבושת %cst',
    'new costume %l width %dim height %dim':
        'תלבושת_חדשה %l רוחב %dim גובה %dim',
    'stretch %cst x: %n y: %n %':
        'מתיחה %cst x: %n y: %n %',
    '%eff effect':
        '%eff אפקט',
    'shown?':
        'מוצגת?',
    'go to %layer layer':
        'לך_אל %layer',
    'front':
        'חזית',
    'back':
        'רקע',

    'development mode \ndebugging primitives:':
        'מצב פיתוח\nמשתני דיבאג',
    'console log %mult%s':
        'console log %mult%s',
    'alert %mult%s':
        'התראה %mult%s',

    'pixels':
        'פיקסלים',
    'current':
        'נוכחי',

    // sound:
    'play sound %snd':
        '%snd נגן_צליל',
    'play sound %snd until done':
        'נגן_צליל_והמתן_לסיום %snd',
    'stop all sounds':
        'עצור_את_כל_הצלילים',
    'rest for %n beats':
        'נוח_למשך %n',
    'play note %n for %n beats':
        'נגן תו %n למשך %n ביטים',
    'change tempo by %n':
        '%n שנה קצב ביטים ב',
    'set tempo to %n bpm':
        'קבע קצב ל %n ביטים בדקה',
    'tempo':
        'קצב',
    'play sound %snd at %rate Hz':
        'נגן_צליל %snd בקצב %rate Hz',
    '%aa of sound %snd':
        '%aa של_צליל %snd',
    'duration':
        'למשך',
    'length':
        'אורך',
    'number of channels':
        'מספר ערוצים',
    'new sound %l rate %rate Hz':
        'צליל_חדש %l בקצב %rate Hz',
    'play note %note for %n beats':
        '%note ביטים_עם_טון %n נגן_תו_למשך',
    'set instrument to %inst':
        'קבע_כלי_נגינה %inst',
    'change volume by %n':
        'שנה_עוצמת_צליל_ב %n',
    'set volume to %n %':
        'קבע_עוצמת_צליל_ל %n %',
    'change balance by %n':
        'שנה_איזון_ב %n',
    'set balance to %n':
        'קבע_איזון_ל %n',
    'balance':
        'איזון',
    'volume':
        'עוצמת_צליל',
    'play frequency %n Hz':
        'נגן_תדר %n Hz',
    'stop frequency':
        'עצור_(ניגון_תדר',
    'play %n Hz for %n secs':
        'נגן %n Hz למשך %n שניות',
    'Record a new sound':
        'הקלט צליל חדש',

    // "instruments", i.e. wave forms
    '(1) sine':
        '(1) סינוס',
    '(2) square':
        '(2) ריבועי',
    '(3) sawtooth':
        '(3) שיני_מסור',
    '(4) triangle':
        '(4) משולש',


    // pen:
    'clear':
        'נקה',
    'pen down':
        'עט_למטה',
    'pen up':
        'עט_למעלה',
    'set pen color to %clr':
        ' %clr קבע_צבע_עט_ל',
    'change pen color by %n':
        ' %n שנה_צבע_עט_ב',
    'set pen color to %n':
        ' %n קבע_צבע_עט_ל',
    'change pen shade by %n':
        '%n שנה_גוון_עט_ב',
    'set pen shade to %n':
        '%n קווע_גוון_עט_ל',
    'change pen size by %n':
        '%n שנה_גודל_עט_ב',
    'set pen size to %n':
        ' %n קבע_גודל_עט_ל',
    'stamp':
        'חותמת',
    'pen down?':
        'עט_למטה?',
    'set background color to %clr':
        'קבע_צבע_רקע %clr',
    'change pen %hsva by %n':
        'שנה_עט_ב %hsva %n',
    'change background %hsva by %n':
        'שנה_רקע_ב %hsva %n',
    'set pen %hsva to %n':
        'קבע_עט_ל %hsva %n',
    'set background %hsva to %n':
        'קבע_רקע_ל %hsva  %n',
    'pen %pen':
        'עט %pen',
    'fill':
        'מלא',
    'write %s size %n':
        'כתוב_בגודל %s %n',
    'paste on %spr':
        'הדבק_על %spr',
    'pen vectors':
        'סימוני_עט_וקטור',


    // control:
    'when %greenflag clicked':
        'נלחץ %greenflag כאשר_כפתור',
    'when %keyHat key pressed':
        'נלחץ %keyHat כאשר_כפתור',
    'when I am %interaction':
        'כאשר_אני %interaction',
    'clicked':
        'הקלקה',
    'pressed':
        'לחיצה',
    'dropped':
        'הפלה',
    'mouse-entered':
        'עכבר-נכנס',
    'mouse-departed':
        'עכבר-יוצא',
    'when %b':
        '%b כאשר',
    'when I receive %msgHat':
        '%msgHat כאשר_אני_מקבל',
    'broadcast %msg':
        'שדר_הודעה %msg',
    'broadcast %msg and wait':
        'והמתן %msg שדר_הודעה',
    'Message name':
        'שם ההודעה',
    'message':
        'הודעה',
    'any message':
        'כל הודעה',
    'wait %n secs':
        'שניות %n המתן',
    'wait until %b':
        '%b המתן_עד_ש',
    'forever %loop':
        'לנצח %loop',
    'repeat %n %loop':
        'חזור %n %loop',
    'repeat until %b %loop':
        'חזור_עד_ש %b %loop',
    'if %b %c':
        'אם %b %c',
    'if %b %c else %c':
        'אם %b %c אחרת %c',
    'report %s':
        '%s דווח',
    'stop %stopChoices':
        '%stopChoices עצור',
    'all':
        'לכל',
    'this script':
        'התסריט הזה',
    'this block':
        'הבלוק הזה',
    'stop %stopOthersChoices':
        '%stopOthersChoices עצור',
    'all but this script':
        'הכל מלבד תסריט זה',
    'other scripts in sprite':
        'תסריטים אחרים בדמות',
    'pause all %pause':
        '%pause הקפא הכל',
    'run %cmdRing %inputs':
        'הרץ %cmdRing  %inputs',
    'launch %cmdRing %inputs':
        'הפעל %cmdRing %inputs',
    'call %repRing %inputs':
        'קרא %repRing  %inputs',
    'run %cmdRing w/continuation':
        'הרץ %cmdRing מתמשך',
    'call %cmdRing w/continuation':
        'קרא_ל %cmdRing מתמשך',
    'warp %c':
        'מעטפת %c',
    'when I start as a clone':
        'כשאני_מתחיל_בתור_שכפול',
    'create a clone of %cln':
        '%cln צור_שכפול_של',
    'myself':
        'אני',
    'delete this clone':
        'מחק_את_השכפול_הזה',
    'scrolled-down':
        'נגלל_למטה',
    'scrolled-up':
        'נגלל_למעלה',
    'stopped':
        'נעצר',
    'for %upvar = %n to %n %cla':
        'ספור_במשתנה_בטווח %upvar = %n %n %cla',
    'if %b then %s else %s':
        '→אם %b אז %s אחרת %s',
    'a new clone of %cln':
        'שכפול_חדש_של %cln',
    'tell %spr to %cmdRing %inputs':
        'תודיע_לעצם_אחר_לבצע %spr %cmdRing %inputs',
    'ask %spr for %repRing %inputs':
        'שאל_עצם_אחר %spr %repRing %inputs',

    // sensing:
    'touching %col ?':
        'נוגע %col ?',
    'touching %clr ?':
        'נוגע %clr ?',
    'color %clr is touching %clr ?':
        '%clr צבע_נוגע_בצבע %clr ?',
    'ask %s and wait':
        '%s שאל_והמתן',
    'what\'s your name?':
        '?מה_השם_שלך',
    'answer':
        'תשובה',
    'mouse x':
        'x עכבר',
    'mouse y':
        'y עכבר',
    'mouse down?':
        'עכבר_למטה?',
    'key %key pressed?':
        'מקש_נלחץ %key ?',
    'distance to %dst':
        ' %dst מרחק_אל',
    'reset timer':
        'איפוס טיימר',
    'timer':
        'טיימר',
    '%att of %spr':
        '%att של %spr',
    'http:// %s':
        'http:// %s',
    'turbo mode?':
        'מצב מהיר?',
    'set turbo mode to %b':
        'קבע_מצב_מהיר_ל %b',
    'filtered for %clr':
        'סינון_עבור %clr',
    'stack size':
        'גודל מחסנית',
    'frames':
        'פריימים',
    '%rel to %dst':
        '%rel חשב %dst',
    'distance':
        'מרחק',
    '%asp at %loc' :
        '%asp של %loc',
    'r-g-b-a':
        'R-G-B-A ערכי_צבע',
    'sprites' :
        'דמויות',
    'my %get':
        'מאפיין %get',
    'object %self':
        'אובייקט %self',
    'turbo mode':
        'מצב מהיר',
    'flat line ends':
        'סיום קו ישר',
    'is %setting on?':
        '%setting האם_הגדרה_פעילה',
    'set %setting to %b':
        'קבע_הגדרה %setting  %b',
    'microphone %audio':
        'מיקרופון %audio',
    'note':
        'תו',
    'frequency':
        'תדר',
    'samples':
        'דגימות',
    'sample rate':
        'קצב דגימה',
    'spectrum':
        'ספקטרום',
    'resolution':
        'רזולוציה',
    'Microphone resolution...':
        'רזולוציית_מיקרופון...',
    'Microphone':
        'מיקרופון',
    'low':
        'נמוך',
    'high':
        'גבוה',
    'max':
        'מקסימום',
    'video %vid on %self':
        'וידאו_על %vid  %self',
    'motion':
        'תנועה',
    'snap':
        'הצמדה',
    'set video transparency to %n':
        'קבע_שקיפות_וידאו_ל %n',
    'video capture':
        'לכוד_וידאו',
    'mirror video':
        'וידאו_תמונת_ראי',
    'log pen vectors':
        'קווים_ישרים_וארוכים',

    // operators:
    '%n mod %n':
        '%n שארית_חלוקה %n',
    'round %n':
        'עגל_למספר_שלם %n',
    '%fun of %n':
        '%fun של %n',
    'pick random %n to %n':
        'בחר_מספר_אקראי_בתחום %n - %n',
    '%b and %b':
        '%b וגם %b',
    '%b or %b':
        '%b או %b',
    'not %b':
        'לא %b',
    'true':
        ' אמת ',
    'false':
        ' שקר ',
    'join %words':
        'שרשר_מילים %words',
    'split %s by %delim':
        'הפרדת_אותיות_לפי_סימן_מפריד %s  %delim',
    'hello':
        'שלום',
    'world':
        'עולם',
    'letter %idx of %s':
        'מיקום_אות_במילה %idx  %s',
    'length of %s':
        '%s האורך_של',
    'unicode of %s':
        'יוניקוד_של %s',
    'unicode %n as letter':
        'המר_יוניקוד_לאות %n ',
    'is %s a %typ ?':
        'האם_משתנה_מסוג %s %typ ?',
    'is %s identical to %s ?':
        '? %s האם_זהים %s',
    'type of %s':
        'הסוג של %s',
    'compile %repRing':
        'קומפייל %repRing',

    // variables:
    'Make a variable':
        'צור משתנה',
    'Variable name':
        'שם משתנה',
    'Script variable name':
        'שם משתנה תסריט',
    'Delete a variable':
        'מחק משתנה',
    'set %var to %s':
        '%var הכנסת_ערך_ל %s',
    'change %var by %n':
        ' %var שנה_ערך_משתנה_ב %n',
    'show variable %var':
        ' %var הצג_משתנה',
    'hide variable %var':
        ' %var הסתר_משתנהِ',
    'script variables %scriptVars':
        '%scriptVars משתניי_תסריט',
    'inherit %shd':
        'הורש %shd',

    // lists:
    'list %exp':
        '%exp רשימה',
    'numbers from %n to %n':
        'מערך_מספרים_בטווח %n עד %n',
    '%s in front of %l':
        '%s בתחילת_רשימה %l',
    'item %idx of %l':
        ' %idx בחר_פריט_מתוך %l',
    'all but first of %l':
        'הכל_מלבד_הראשון %l',
    'length of %l':
        '%l מספר_פריטים ',
    '%l contains %s':
        '%l נמצא_בתוך %s',
    'thing':
        'פריט',
    'add %s to %l':
        'הוסף_את %s ל %l',
    'delete %ida of %l':
        'מחק_פריט_מספר %ida %l',
    'insert %s at %idx of %l':
        'הוסף_פריט_במיקום %s %idx %l',
    'replace item %idx of %l with %s':
        'החלף_פריט_במיקום %idx %l %s',
    'is %l empty?':
        'האם_ריקה %l ?',
    'map %repRing over %l':
        'צור_מיפוי %repRing  %l',
    'keep items %predRing from %l':
        'שמור_פריטים_של %predRing %l',
    'find first item %predRing in %l':
        'מצא_פריט_ראשון %predRing  %l',
    'combine %l using %repRing':
        'מזג_רשימה_באמצעות %l mit %repRing',
    '%blitz map %repRing over %l':
        '%blitz צור_מיפוי %repRing %l',
    '%blitz keep items %predRing from %l':
        '%blitz שמור_פריטים_של %predRing %l',
    '%blitz find first item %predRing in %l':
        '%blitz מצא_פריט_ראשון %predRing %l',
    '%blitz combine %l using %repRing':
        '%blitz מזג_רשימה_באמצעות %l %repRing',
    'for each %upvar in %l %cla':
        ' %upvar עבור_כל %l %cla',
    'item':
        'פריט',
    'value':
        'ערך',
    'index':
        'אינדקס',

    // other
    'Make a block':
        'צור בלוק',

     // menus
    // snap menu
    'About...':
        'אודות SNAP!...',
    'Reference manual':
        'מדריך משתמש',
    'Snap! website':
        'אתר רשמי',
    'Download source':
        'הורדה...',
    'Switch back to user mode':
        'חזור למצב משתמש',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'בטל תכונות מתקדמות',
    'Switch to dev mode':
        'עבור למצב מפתח',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'הפעל תכונות מתקדמות',
        
     // project menu
    'Project notes...':
        'הערות לפרוייקט...',
    'New':
        'חדש',
    'Open...':
        'פתח...',
    'Save':
        'שמור',
    'Save to disk':
        'שמור לדיסק',
    'store this project\nin the downloads folder\n(in supporting browsers)':
        'הפרוייקט יישמר בתקיית הורדות',
    'Save As...':
        'שמור בשם...',
    'Import...':
        'ייבוא...',
    'file menu import hint':
        'ייבא פרוייק מקובץ',
    'Export project as plain text...':
        'ייצא פרוייקט כטקסט בלבד...',
    'Export project...':
        'ייצא פרוייקט...',
    'show project data as XML\nin a new browser window':
        'הצג את מידע הפרוייקט\nבחלון חדש (XML)',
    'Export blocks...':
        'ייצא בלוקים...',
    'show global custom block definitions as XML\nin a new browser window':
        'הצג מידע אודות בלוקים מותאמים\nאישית בחלון חדש (XML)',
		
	'Unused blocks...':
          'בלוקים לא בשימוש...',
    'find unused global custom blocks\nand remove their definitions':
        'מצא בלוקים שאינם בשימוש והסר את הגדרתם',
    'Remove unused blocks':
        'הסר בלוקים שאינם בשימוש',
    'there are currently no unused\nglobal custom blocks in this project':
        'אין כרגע בלוקים שאינם בשימוש בפרוייקט זה',
    'unused block(s) removed':
        'בלוקים שאינם בשימוש הוסרו',
    'Export summary...':
        'דוח ייצוא...',
    'open a new browser browser window\n with a summary of this project':
        'פתח חלון חדש עם סיכום על פרוייקט זה',
    'Contents':
        'תכולה',
    'Kind of':
        'סוג',
    'Part of':
        'חלק מ',
    'Parts':
        'חלקים',
    'Blocks':
        'בלוקים',
    'For all Sprites':
        'עבור כל הדמויות',
	'Import tools':
        'כליי יבוא',
    'load the official library of\npowerful blocks':
        'טען את הספריה הרשמית של\n powerful blocks',
    'Libraries...':
        'ספריות...',
    'save project data as XML\nto your downloads folder':
        'שמור פרוייקט בתיקיית הורדות כקובץ XML',
    'Select categories of additional blocks to add to this project.':
        'בחר קטגוריית בלוקיי הרחבה לפרוייקט זה',
    'Select a costume from the media library':
        'בחר תלבושת מספריית המדיה',
    'Select a sound from the media library':
        'בחר צליל מבפריית המדיה',

    //Libraries
    'Import library':
        'ייבא ספריה',
    'Loading':
        'טוען',
    'Imported':
        'מיובא',
    'Iteration, composition':
        'איטרציה, קומפוזיציה',
    'List utilities':
        'עזריי רשימות',
    'Variadic reporters':
        'מדווחי משתנים',
    'Web services access (https)':
        'גישה לשירותי רשת מאובטחים',
    'Multi-branched conditional (switch)':
        'תנאי מרובה ענפים (סוויצ)',
    'LEAP Motion controller':
        'LEAP בקר_תנועה',
    'Words, sentences':
        'מילים, משפטים',
    'Catch errors in a script':
        'תפוס שגיאות בתסריט',
    'Set RGB or HSV pen color':
        'קביעת צבע מתקדמת',
    'Text to speech':
        'טקסט לדיבור',
    'Provide 100 selected colors':
        '100 צבעים נבחרים',
    'Infinite precision integers, exact rationals, complex':
        'מספרים מדוייקים, רציונאלים ומרוכבים',
    'Provide getters and setters for all GUI-controlled global settings':
        ' הגדרת מאפייני ממשק ',
    'Allow multi-line text input to a block':
        'אפשר קליטת משפטים מרוביי שורות',
    'Create variables in program':
        'צור משתנים בתוכנית',
        
    // cloud menu
    'Login...':
        'הכנס...',
    'Signup...':
        'הירשם...',
    'Logout':
        'התנתק',
    'Change Password...':
        'שנה סיסמה...',
    'Resend Verification Email...':
        'שלח מחדש מייל ווידוא...',
    'Open in Community Site':
        'פתח באתר הקהילתי',
        
    // settings menu
    'Language...':
        'שפה...',
    'Zoom blocks...':
        'גודל בלוקים...',
    'Stage size...':
        'גודל במה...',
    'Stage width':
        'רוחב במה',
    'Stage height':
        'גובה במה',
    'Default':
        'ברירת מחדל',
    'Blurred shadows':
        'צללים מעומעמים',
    'uncheck to use solid drop\nshadows and highlights':
        'בטל סימון לצל והדגשה רגילים',
    'check to use blurred drop\nshadows and highlights':
        'הוסף סימון לצל והדגשה מעומעמים',
    'Zebra coloring':
        'צביעת זברה',
    'check to enable alternating\ncolors for nested blocks':
        'הוסף סימון כדי לאפשר צבעים מתחלפים\nעבור בלוקים משורשרים',
    'uncheck to disable alternating\ncolors for nested block':
        'בטל סימון כדי לבטל צבעים מתחלפים\nעבור בלוקים משורשרים',
    'Dynamic input labels':
        'תגיות קלט דינאמיות',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'בטל סימון כדי לבטל תווית\nדינאמית למשתנים',
    'check to enable dynamic\nlabels for variadic inputs':
        'הוסף סימון כדי לבצע תווית\nדינאמית למשתנים',
    'Prefer empty slot drops':
        'העדף הפלה לתאים ריקים',
    'settings menu prefer empty slots hint':
        'תפרית העדפת רמיזה לתאים ריקים',
    'uncheck to allow dropped\nreporters to kick out others':
        'בטל סימון לאפשר החלפת הקיימים\nעל ידי החדשים',
    'Long form input dialog':
        'פקד קלט ארוך',
    'Plain prototype labels':
        'תויות אבטיפוס בסיסיות',
    'uncheck to always show (+) symbols\nin block prototype labels':
        'בטל סימון כדי להציג (+) \n בתוית בלוק אבטיפוס',
    'check to hide (+) symbols\nin block prototype labels':
        'הוסף סימון כדי להסתיר (+) \n בתוית בלוק אבטיפוס',
    'check to always show slot\ntypes in the input dialog':
        'הוסף סימון כדי להציג תמיד\nסוג כניסה בדיאלוג קלט',
    'uncheck to use the input\ndialog in short form':
        'בטל סימון כדי להשתמש בדיאלוג קלט מקוצר',
    'Virtual keyboard':
        'מקלדת וירטואלית',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'בטל סימון כדי להסתיר\nמקלדת וירטואלית במכשירים ניידים',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'הוסף סימון כדי להציג\nמקלדת וירטואלית במכשירים ניידים',
    'Input sliders':
        'סרגלי קלט',
    'uncheck to disable\ninput sliders for\nentry fields':
        'בטל סימון כדי לבטל סרגלי קלט',
    'check to enable\ninput sliders for\nentry fields':
        'הוסף סימון כדי לאפשר סרגלי קלט',
    'Retina display support':
        'תמיכה במסך רטינה',
    'uncheck for lower resolution,\nsaves computing resources':
        'בטל סימון כדי לשפר ביצועים על חשבון רזולוציה איכותית',
    'check for higher resolution,\nuses more computing resources':
        'הוסף סימון כדי להעדיף רזולוציה איכותית על חשבון ביצועים',
    'Clicking sound':
        'צלילי לחיצה',
    'uncheck to turn\nblock clicking\nsound off':
        'בטל סימון כדי לכבות צלילי לחיצת בלוקים',
    'check to turn\nblock clicking\nsound on':
        'הוסף סימון כדי להפעיל צלילי לחיצת בלוקים',
    'Animations':
        'הנפשה',
    'uncheck to disable\nIDE animations':
        'בטל סימון כדי לכבות הנפשת סביבת עבודה',
    'check to enable\nIDE animations':
        'הוסף סימון כדי להפעיל הנפשת סביבת עבודה',
    'Turbo mode':
        'מצב עבודה מהיר',
    'check to prioritize\nscript execution':
        'הוסף סימון כדי להפעיל העדפת הפעלת תסריטים',
    'uncheck to run scripts\nat normal speed':
        'בטל סימון כדי להפעיל תסריטים במהירות רגילה',
	'Flat design':
        'עיצוב שטוח',
    'check for alternative\nGUI design':
        'הוסף סימון למראה אלטרנטיבי - שטוח',
    'uncheck for default\nGUI design':
        'בטל סימון למראה רגיל תבליטי',
    'Keyboard Editing':
        'עריכת מקלדת',
    'Thread safe scripts':
        'תסריטים מוגני מיקבול',
    'uncheck to allow\nscript reentrance':
        'בטל סימון כדי לאפשר תסריטים ממוקבלים',
    'check to disallow\nscript reentrance':
        'הוסף סימון כדי למנוע תסריטים ממוקבלים',
    'Prefer smooth animations':
        'העדף הנפשה חלקה',
    'uncheck for greater speed\nat variable frame rates':
        'בטל סימון כדי להעדיף מהירות גבוהה בקצב שעשוי להשתנות',
    'check for smooth, predictable\nanimations across computers':
        'הוסף סימון להנפשה בקצב קבוע וחזוי מראש',
    'Flat line ends':
        'סוף קו ישר',
    'check for flat ends of lines':
        'הוסף סימון לקימור ישר של קווים',
    'uncheck for round ends of lines':
        'בטל סימון לגימור מעוגל של קווים',
    'Inheritance support':
        'תמיכה בהורשה',
	'uncheck to disable\nsprite inheritance features':
        'בטל סימון לבטל הורשת\nתכונות מאפייני דמות',
    'check for sprite\ninheritance features':
        'הוסף סימון לאפשר הורשת\nתכונות מאפייני דמות',
    'Stage size':
        'גודל הבמה',
    'check to turn on\n visible stepping (slow)':
        'הוסף סימון כדי להפעיל המחשת צעדים (איטי)',
    'uncheck to turn off\nvisible stepping':
        'בטל סימון כדי לא להמחיש צעדים',
    'Nested auto-wrapping':
        'עטיפה אוטומטית',
    'Table support':
        'תמיכה בטבלאות',
    'Table lines':
        'שורות של טבלאות',
    'Visible stepping':
        'המחשת צעדים',
    'Ternary Boolean slots':
        'בולאני עם שלושה אפשרויות',
    'Log pen vectors':
        'הקלט מיקומי עט',
    'uncheck to turn off\nlogging pen vectors':
        'בטל סימון כדי לא לזכור מיקומי עט',
    'check to turn on\nlogging pen vectors':
        'הוסף סימון להקליט מיקומי עט',

    // inputs
    'with inputs':
        'עם קלטים',
    'input names:':
        'שמות קלט:',
    'Input Names:':
        'שמות קלט:',
    'input list:':
        'רשימת קלט:',

    // context menus:
    'help':
        'עזרה',

    // palette:
    'find blocks':
        'מצא בלוקים',
    'hide primitives':
        'הסתר בסיסיים',
    'show primitives':
        'הצג בסיסיים',

    // blocks:
    'help...':
        'עזרה...',
    'relabel...':
        'תייג מחדש...',
    'duplicate':
        'שכפל',
    'make a copy\nand pick it up':
        'צור עותק\nוהרם',
    'only duplicate this block':
        'שכפול בלוק זה בלבד',
    'delete':
        'מחק',
    'script pic...':
        'תסריט תמונה...',
    'open a new window\nwith a picture of this script':
        'פתח חלון חדש\nעם תמונה של תסריט זה',
    'ringify':
        'מיסגור',
    'unringify':
        'ביטול מיסגור',
    'compile':
        'בצע קומפילציה',
    'uncompile':
        'בטל קומפילציה',
    'transient':
        'זמני',
    'uncheck to save contents\nin the project':
        'בטל סימון כדי לשמור תוכן בפרוייקט',
    'check to prevent contents\nfrom being saved':
        'הוסף סימון כדי לא לשמור תוכן בפרוייקט',
    'new line':
        'שורה חדשה',

    // custom blocks:
    'delete block definition...':
        'הגדרת מחיקת בלוקים...',
    'duplicate block definition...':
        'שכפל הגדרת בלוק...',
    'edit...':
        'ערוך...',

    // sprites:
    'edit':
        'ערוך',
    'move':
        'הזז',
    'detach from':
        'נתק מ...',
    'detach all parts':
        'נתק כל החלקים',
    'export...':
        'ייצא...',
    'clone':
        'שכפל',
    'pivot':
        'ציר',
    'edit the costume\'s\nrotation center':
        'ערוך את מרכז הסיבוב של הדמות',
    'rotate':
        'סובב',
    'stick to':
        'הצמד_אל',
    'parent...':
        'הורה...',
    'current parent':
        'ההורה הנוכחי',
    'release':
        'שחרר',
    'make temporary and\nhide in the sprite corral':
        'הפוך לזמני והסתר תחום דמות',

    // stage:
    'show all':
        'הצג הכל',
    'pic...':
        'תמונה...',
    'open a new window\nwith a picture of the stage':
        'פתח חלון חדש\nעם תמונת הבמה',
    'svg...':
        'SVG ייצא_לקובץ...',
    'export pen trails\nline segments as SVG':
        'ייצא את עקבות העט לקובץ SVG',
    'there are currently no\nvectorizable pen trail segments':
        'אין כרגע עקבות עט הניתנון לוקטוריזציה',
    'turn all pen trails and stamps\ninto a new background for the stage':
        'הפוך את סימוני העט והחותמת לרקע חדש לבמה',
    'turn all pen trails and stamps\ninto a new costume for the\ncurrently selected sprite':
        'הפוך את סימוני העט והחותמת לתלבושת חדשה עבור הדמות הנוכחית',

    // scripting area
    'clean up':
        'נקה',
    'arrange scripts\nvertically':
        'סדר תסריטים במאונך',
    'add comment':
        'הוסף הערה',
    'undrop':
        'בטל הפלה',
    'undo the last\nblock drop\nin this pane':
        'בטל את הפלת\nהבלוק האחרונה',
    'scripts pic...':
        'תמונת תסריטים...',
    'open a new window\nwith a picture of all scripts':
        'פתח חלון חדש\nעם תמונה של כל התסריטים',
    'make a block...':
        'צור בלוק...',
    'redrop':
        'נתב מחדש',
    'use the keyboard\nto enter blocks':
        'השתמש במקלדת להכנס לבלוקים',

    // costumes
    'rename':
        'שנה שם',
    'export':
        'ייצא',
    'rename costume':
        'שנה שם לתלבושת',
    'Turtle':
        'צב',
    'Empty':
        'ריק',
    'Paint a new costume':
        'צייר תלבושת חדשה',
    'Import a new costume from your webcam':
        'ייבא תלבושת ממצלמה',
    'Please make sure your web browser is up to date\nand your camera is properly configured. \n\nSome browsers also require you to access Snap!\nthrough HTTPS to use the camera.\n\nPlase replace the "http://" part of the address\nin your browser by "https://" and try again.':
        'נא וודא שהדפדפן מעודכן \n' +
        'ושהמצלמה מתואמת כראוי.\n\n' +
        'חלק מהדפדפנים יבקשו אישור גישה למצלמה\n' +
        'בחיבור מאובטח.\n\n' +
        'נסה להחליף בתחילת הכתובת את  "http://"-ב "https://"',
    'Camera':
        'מצלמה',

    // sounds
    'Play sound':
        'נגן צליל',
    'Stop sound':
        'עצור צליל',
    'Stop':
        'עצור',
    'Play':
        'נגן',
    'rename sound':
        'שנה שם לצליל',

    // lists and tables
    'list view...':
        'תצוגת רשימה...',
    'table view...':
        'תצוגת טבלה...',
    'Table view':
        'הצג טבלא',
    'open in dialog...':
        'פתח בחלונית דיאלוג',
    'reset columns':
        'אתחל עמודות',
    'items':
        'פריטים',

    // dialogs
    // buttons
    'OK':
        'אישור',
    'Ok':
        'אישור',
    'Cancel':
        'ביטול',
    'Yes':
        'כן',
    'No':
        'לא',

    // help
    'Help':
        'עזרה',

    // zoom blocks
    'Zoom blocks':
        'הקדל בלוקים',
    'build':
        'בנה',
    'your own':
        'משלך',
    'blocks':
        'בלוקים',
    'normal (1x)':
        'רגיל (1x)',
    'demo (1.2x)':
        'הדגמה (1.2x)',
    'presentation (1.4x)':
        'מצגת (1.4x)',
    'big (2x)':
        'גדול (2x)',
    'huge (4x)':
        'ענק (4x)',
    'giant (8x)':
        'ענקי (8x)',
    'monstrous (10x)':
        'מפלצתי (10x)',
 
 // Project Manager
    'Untitled':
        'ללא שם',
    'Open Project':
        'פתח פרוייקט',
    '(empty)':
        '(ריק)',
    'Saved!':
        'נשמר!',
    'Delete Project':
        'מחק פרוייקט',
    'Are you sure you want to delete':
        'האם אתה בטוח שברצונך למחוק?',
    'rename...':
        'שנה שם...',
    'Open':
        '\u00d6ffnen',
    'Examples':
        'דוגמאות',
    'Share':
        'שתף',
    'Unshare':
        'בטל שיתוף',
    'Publish':
        'פרסם',
    'Unpublish':
        'בטל פרסום',
    'Updating\nproject list...':
        'מעדכן רשימת פרוייקטים',
    'Recover':
        'שחזר',
    'Today':
        'היום',
    'Yesterday':
        'אתמול',



    // costume editor
    'Costume Editor':
        'עורך תלבושות',
    'click or drag crosshairs to move the rotation center':
        'גרור את הכוונת כדי לקבע את מרכז הסיבוב',
    'Vector Paint Editor':
        'עריכה ווקטורית',
    'Rectangle\n(shift: square)':
        'מלבן (^ריבוע)',
    'Ellipse\n(shift: circle)':
        'אליפסה (^עיגול)',
    'Selection tool':
        'כלי בחירה',
    'Line tool\n(shift: constrain to 45º)':
        'קווים ישרים\n(Shift: בזווית 45°)',
    'Closed brush\n(free draw)':
        'צורה סגורה \n ציור חופשי',
    'Paint a shape\n(shift: secondary color)':
        'צבע צורה \n(Shift: צבע שני)',
    'Pipette tool\n(pick a color from anywhere\nshift: secondary color)':
        'דגום צבע\n (Shift: צבע שני)',
    'Edge color\n(left click)':
        'צבע חיצוני\n(קליק שמאלי)',
    'Fill color\n(right click)':
        'צבע פנימי\n(קליק ימני)',
    'Paint Editor':
        'עורך ציור',
    'Vector':
        'ווקטור',


    // project notes
    'Project Notes':
        'הערות לפרוייקט',

    // new project
    'New Project':
        'פרוייקט חדש',
    'Replace the current project with a new one?':
        'להחליף את הפרוייקט הזה בחדש?',

    // save project
    'Save Project As...':
        'שמור פרוייקט בשם...',
    'Save Project':
        'שמור פרוייקט',

    // export blocks
    'Export blocks':
        'ייצא בלוקים',
    'Import blocks':
        'ייבא בלוקים',
    'this project doesn\'t have any\ncustom global blocks yet':
        'בפרוייקט אין בלוקים מותאמים אישית',
    'select':
        'בחר',
    'none':
        'שום דבר',

    // variable dialog
    'for all sprites':
        'עבור כל הדמויות',
    'for this sprite only':
        'עבור דמות זו בלבד',

    // variables refactoring
    'rename only\nthis reporter':
        'שנה שם של מדווח זה בלבד',
    'rename all...':
        'שנה שם להכל...',
    'rename all blocks that\naccess this variable':
        'שנה שם לכל הבלוקים \n  הניגשים למשתנה זה',

    // block dialog
    'Change block':
        'שנה בלוק',
    'Command':
        'פקודה',
    'Reporter':
        'מדווח',
    'Predicate':
        'עבור תנאי',

    // block editor
    'Block Editor':
        'עורך הבלוקים',
    'Apply':
        'החל',
    'Method Editor':
        'עורך השיטות',


    // block deletion dialog
    'Delete Custom Block':
        'מחק בלוק מותאם אישית',
    'block deletion dialog text':
        'מלל דיאלוג מניעת מחיקה',

    // input dialog
    'Create input name':
        'צור שם קלט',
    'Edit input name':
        'ערוך שם קלט',
    'Edit label fragment':
        'ערוך את התווית',
    'Title text':
        'מלל כותרת',
    'Input name':
        'הכנס שם',
    'Delete':
        'מחק',
    'Object':
        'אובייקט',
    'Number':
        'מספר',
    'Text':
        'טקסט',
    'List':
        'רשימה',
    'Any type':
        'כל סוג',
    'Boolean (T/F)':
        'בולאני (T/F)',
    'Command\n(inline)':
        'פקודה\nבאותה השורה',
    'Command\n(C-shape)':
        'פקודה\n (C-shape)',
    'Any\n(unevaluated)':
        'לכל\n(לא ידוע)',
    'Boolean\n(unevaluated)':
        'בולאני\n(לא ידוע)',
    'Single input.':
        'ערך יחיד.',
    'Default Value:':
        'ערך ברירת מחדל:',
    'Multiple inputs (value is list of inputs)':
        'קלטים מרובים (הערך הוא רשימה של קלטים)',
    'Upvar - make internal variable visible to caller':
        'Upvar - גרום למשתנה פנימי להיות חשוף לקורא',

    // About Snap
    'About Snap':
        'אודות Snap',
    'Back...':
        'חזרה...',
    'License...':
        'רשיון...',
    'Modules...':
        'רכיבים...',
    'Credits...':
        'תודות...',
    'Translators...':
        'מתרגמים...',
    'License':
        'רישיון',
    'current module versions:':
        'גרסה נוכחית',
    'Contributors':
        'תורמים',
    'Translations':
        'תרגומים',

    // variable watchers
    'normal':
        'רגיל',
    'large':
        'גדול',
    'slider':
        'סליידר - סרגל בחירה',
    'slider min...':
        'מינימום סליידר...',
    'slider max...':
        'מקסימום סליידר...',
    'import...':
        'ייבא...',
    'Slider minimum value':
        'ערך מינימלי של הסליידר',
    'Slider maximum value':
        'ערך מקסימלי של הסליידר',
    'raw data...':
        'מידע גולמי...',
    'import without attempting to\nparse or format data':
        'ייבא מבלי לעבד את המידע',

    // list watchers
    'length: ':
        'אורך: ',

    // coments
    'add comment here...':
        'הוסף הערה כאן',
    'comment pic...':
        'הערה לצמונה',
    'open a new window\nwith a picture of this comment':
        'פתח תמונה והערה בחלון חדש',

    // drow downs
    // directions
    '(90) right':
        '(90) ימינה',
    '(-90) left':
        '(-90) שמאלה',
    '(0) up':
        '(0) למעלה',
    '(180) down':
        '(180) למטה',
    'random':
        'אקראי',
    'random position':
        'מיקום אקראי',

    // collision detection
    'mouse-pointer':
        'סמן עכבר',
    'edge':
        'קצה',
    'pen trails':
        'סימוני_עט',
    'center':
        'מרכז',

    // graphical effects
    'brightness':
        'בהירות',
    'ghost':
        'רוח רפאים',
    'negative':
        'נגטיב',
    'comic':
        'קומיקס',
    'confetti':
        'קונפטי',
    'color':
        'צבע',
    'hue':
        'גוון',
    'fisheye':
        'עין_הדג',
    'whirl':
        'מערבולת',
    'pixelate':
        'פיקסלים',
    'mosaic':
        'פסיפס',
    'saturation':
        'רוויה',
    'transparency':
        'שקיפות',

    // keys
    'space':
        'רווח',
    'up arrow':
        'חץ למעלה',
    'down arrow':
        'חץ למטה',
    'right arrow':
        'חץ ימינה',
    'left arrow':
        'חץ שמאלה',
    'any key':
        'מקש כלשהו',
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
        'חדש...',
    '__shout__go__':
        'לחץ על דגל ירוק',

    // math functions
    'abs':
        'ערך מוחלט',
    'ceiling':
        'תקרה',
    'floor':
        'רצפה',
    'sqrt':
        'שורש ריבועי',
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
        'שלילה',

    // delimiters
    'letter':
        'אות',
    'word':
        'מילה',
    'whitespace':
        'רווח',
    'line':
        'שורה',
    'tab':
        'מרווח טאב',
    'cr':
        'תחילת שורה',

    // data types
    'number':
        'מספר',
    'text':
        'טקסט',
    'Boolean':
        'בולאני',
    'list':
        'רשימה',
    'command':
        'פקודה',
    'reporter':
        'מדווח',
    'predicate':
        'הצהרה',
    'sprite':
        'דמות',
    'sound':
        'צליל',
    // list indices
    'last':
        'אחרון',
    'any':
        'כלשהו',
		
		
		// miscellaneous
	'find blocks...':
		'מצא בלוקים...',
	
	'Reset Password...':
		'אפס סיסמה',
	
	'Codification support':
		'תמיכה בקידוד',
	'uncheck to disable\nblock to text mapping features':
		'בטל סימון לביטול מיפוי בין טקסט לבלוק',
	'check for block\nto text mapping features':
		'סמן למיפוי טקסט לבלוק',
	'current %dates':
		'הנוכחי %dates',
	'year':'שנה',
	'month':'חודש',
	'date':'תאריך',
	'hour':'שעה',
	'minute':'דקה',
	'second':'שניה',
	'time in milliseconds':
		'זמן במילי שניות',
	'day of week':
		'יום בשבוע',

	'JavaScript function ( %mult%s ) { %code }':
		' ( %mult%s ) { %code } פונקציית_גאווהסקריפט',


	// Copy / Paste
	'Press CTRL+C one more time to effectively copy to clipboard.':
		'לחץ CTRL+C פעם נוספת כדי להעתיק ביעילות.',
	'Press CTRL+V one more time to effectively paste from clipboard.':
        'לחץ CTRL+V פעם נוספת כדי להדביק ביעילות.',
	'Press CTRL+X one more time to effectively cut to clipboard.':
        'לחץ CTRL+X פעם נוספת כדי לגזור ביעילות.',

	// Paint.js
	'undo':'בטל',
	'Paintbrush tool\n(free draw)':
		'מברשת לצביעה חופשית',
	'Stroked Rectangle\n(shift: square)':
		'מסגרת מלבן (^ריבוע)',
	'Stroked Ellipse\n(shift: circle)':
        'מסגרת אליפסה (^עיגול)',
	'Eraser tool':
		'מחק',
	'Set the rotation center':
		'קבע את מרכז הסיבוב',
	'Line tool\n(shift: vertical/horizontal)':
		'ציור קו חופשי (^קו מאוזן/מאונך)',
	'Filled Rectangle\n(shift: square)':
        'מלבן מלא (^ריבוע)',
	'Filled Ellipse\n(shift: circle)':
        'אליפסה מלאה (^עיגול)',
	'Fill a region':
		'דלי צבע',
	'Pipette tool\n(pick a color anywhere)':
		'דגימת צבע',
	'grow':'הגדל',
	'shrink':'כווץ',
	'flip \u2194':
		'הפוך \u2194',
	'flip \u2195':
		'הפוך \u2195',
	'Brush size':
		'גודל מברשת',
	'Constrain proportions of shapes?\n(you can also hold shift)':
		'כדי לשמור על פרופורציות\n אפשר ללחוץ על SHIFT',


    // attributes
    'my':
        'מאפיינים',
    'neighbors':
        'שכנים',
    'self':
        'עצמי',
    'other sprites':
        'דמויות_אחרות',
    'parts':
        'חלקים',
    'anchor':
        'עוגן',
    'parent':
        'הורה',
    'temporary?':
        'זמני?',
    'children':
        'צאצא',
    'clones':
        'שיכפולים',
    'other clones':
        'שכפול אחר',
    'dangling?':
        'מתנדנד?',
    'draggable?':
        'ניתן_לגרור?',
    'rotation style':
        'סוג סיבוב',
    'rotation x':
        'סיבוב x',
    'rotation y':
        'סיבוב y',
    'center x':
        'מרכז x',
    'center y':
        'מרכז y',
    'name':
        'שם',
    'costume':
        'תלבושת',
    'stage':
        'במה',
    'costumes':
        'תלבושות',
    'sounds':
        'צלילים',
    'scripts':
        'תסריטים',
    'width':
        'רוחב',
    'height':
        'גובה',
    'left':
        'שמאל',
    'right':
        'ימין',
    'top':
        'למעלה',
    'bottom':
        'למטה',

    // inheritance
    'inherited':
        'נורש',
    'check to inherit\nfrom':
        'סמן_לרשת_מ',
    'uncheck to\ndisinherit':
        'בטל_סימון_לביטול_הורשה'

};
