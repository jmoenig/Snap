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
        ' %dir פנה לכיוון',
    'point towards %dst':
        ' %dst פנה לעבר ',
    'go to x: %n y: %n':
        'לך אל  x: %n y: %n',
    'go to %dst':
        ' %dst לך אל',
    'glide %n secs to x: %n y: %n':
        'החלק %n שניות אל x: %n y: %n',
    'change x by %n':
        ' %n שנה x ב',
    'set x to %n':
        '%n הגדר x ל',
    'change y by %n':
        ' %n שנה y ב',
    'set y to %n':
        '%n הגדר y ל',
    'if on edge, bounce':
        'אם בקצה, קפוץ',
    'x position':
        'מיקום x',
    'y position':
        'מיקום y',
    'direction':
        'כיוון',

    // looks:
    'switch to costume %cst':
        '%cst החלף לתלבושת',
    'next costume':
        'התלבושת הבאה',
    'costume #':
        'תלבושת מספר',
    'say %s for %n secs':
        'אמור %s למשך %n שניות ',
    'say %s':
        '%s אמור',
    'think %s for %n secs':
        'תחשוב %s למשך %n שניות',
    'think %s':
        ' %s תחשוב',
    'Hello!':
        '!שלום',
    'Hmm...':
        'המממ...',
    'change %eff effect by %n':
        'שנה %eff אפקט ב %n',
    'set %eff effect to %n':
        'קבע %eff אפקט ל %n',
    'clear graphic effects':
        'נקה אפקטים גרפיים',
    'change size by %n':
        ' %n שנה גודל ב',
    'set size to %n %':
        '% %n קבע גודל ל',
    'size':
        'גודל',
    'show':
        'הראה',
    'hide':
        'הסתר',
    'go to front':
        'העבר לחזית',
    'go back %n layers':
        'שכבות %n הזז לאחור',

    'development mode \ndebugging primitives:':
        'מצב פיתוח\nמשתני דיבאג',
    'console log %mult%s':
        'console log %mult%s',
    'alert %mult%s':
        'התראה %mult%s',

    // sound:
    'play sound %snd':
        '%snd נגן צליל',
    'play sound %snd until done':
        'נגן צליל %snd עד לסיומו',
    'stop all sounds':
        'עצור את כל הצלילים',
    'rest for %n beats':
        'נוח למשך %n ביטים',
    'play note %n for %n beats':
        'נגן תו %n למשך %n ביטים',
    'change tempo by %n':
        '%n שנה קצב ביטים ב',
    'set tempo to %n bpm':
        'קבע קצב ל %n ביטים בדקה',
    'tempo':
        'קצב',

    // pen:
    'clear':
        'נקה',
    'pen down':
        'עט למטה',
    'pen up':
        'עט למעלה',
    'set pen color to %clr':
        ' %clr لـ مسـاوياً القلم لون إجعل',
    'change pen color by %n':
        ' %n بمقدار القلم لون غيّـر',
    'set pen color to %n':
        ' %n تسـاوي القلم لـون قيمة إجعـل',
    'change pen shade by %n':
        '%n بمقدار القلم لون (تعتيم/سطوع) درجة غيّر',
    'set pen shade to %n':
        '%n تساوي القلم لون (تعتيم/سطوع) درجة إجعل',
    'change pen size by %n':
        '%n بمقدار القلم حجـم غيّـر',
    'set pen size to %n':
        ' %n لـ مساوياً (حجم/سُـمك)القلـم إجعل',
    'stamp':
        'اطبع',

    // control:
    'when %greenflag clicked':
        'الأخضر العـَلم %greenflag نقر عنـد',
    'when %keyHat key pressed':
        '%keyHat مفتـاح ضغط عند',
    'when I am %interaction':
        'الفـأرة مـؤشْـر %interaction لـ أتعرض عندما',
    'clicked':
        'نقـر',
    'pressed':
        'ضغـط',
    'dropped':
        'الإفـلات_من',
    'mouse-entered':
        'دخـول',
    'mouse-departed':
        'مغـادرة',
    'when %b':
        '%b عندما',
    'when I receive %msgHat':
        '%msgHat رسـالة أستقبال عند',
    'broadcast %msg':
        '  %msg بث',
    'broadcast %msg and wait':
        'إنتظـر ثم %msg بِـث',
    'Message name':
        'اسم الرسالة',
    'message':
        'الرسالة',
    'any message':
        'اي رسالة',
    'wait %n secs':
        ' %n لـ إنتظـر',
    'wait until %b':
        '%b الشرط يتحقق حتي إنتظر',
    'forever %loop':
        'باستمرار كرر %loop',
    'repeat %n %loop':
        ' %n كرر %loop',
    'repeat until %b %loop':
        '%b حتي كرر %loop',
    'if %b %c':
        ' %b اذا %c',
    'if %b %c else %c':
        '%b اذا %c وإلا %c',
    'report %s':
        '%s وَضِّـح',
    'stop %stopChoices':
        '%stopChoices اوقف',
    'all':
        'الكل',
    'this script':
        'هذا_المقطع_البرمجي',
    'this block':
        'هذا_البلوك',
    'stop %stopOthersChoices':
        '%stopOthersChoices أوقف',
    'all but this script':
        'كل_المقاطع_البرمجيه_للكائنات_عدا_هذا_المقطع',
    'other scripts in sprite':
        'كل_المقاطع_البرمجية_للكائن_عدا_هذا_المقطع',
    'pause all %pause':
        '%pause مـؤقتاً التنفيذ أوقف',
    'run %cmdRing %inputs':
        'نفّذ %cmdRing  %inputs',
    'launch %cmdRing %inputs':
        'شغّل %cmdRing %inputs',
    'call %repRing %inputs':
        'إستدع %repRing  %inputs',
    'run %cmdRing w/continuation':
        'نفّذ %cmdRing (الفاعلية استمرار بقاء مع)',
    'call %cmdRing w/continuation':
        'استدع %cmdRing (الفاعلية استمرار بقاء مع)',
    'warp %c':
        'تسريع %c',
    'when I start as a clone':
        'مطابقة كنسخةٌ أبدأ عندما',
    'create a clone of %cln':
        '%cln من أستنسـاخاً أنشئ',
    'myself':
        'نفسي',
    'delete this clone':
        'الإستنساخ هذا إحذف',

    // sensing:
    'touching %col ?':
        '؟ %col لـ ملامس هـل ',
    'touching %clr ?':
        '؟ %clr لـ ملامس هـل',
    'color %clr is touching %clr ?':
        '؟ %clr اللون ملامس %clr اللون هل',
    'ask %s and wait':
        '%s اسأل و انتظر ',
    'what\'s your name?':
        '؟ إسمك هـو مـا',
    'answer':
        'الاجابة',
    'mouse x':
        'للفأرة س الموضع',
    'mouse y':
        'للفأرة ص الموضع',
    'mouse down?':
        '؟ مضغوط الايسر الفأرة زر هل',
    'key %key pressed?':
        '؟ مضغوط %key  المفتاح هل',
    'distance to %dst':
        ' %dst إلي المسـافة',
    'reset timer':
        'المؤقت تعيين إعـادة',
    'timer':
        'المؤقت',
    '%att of %spr':
        '؟ %att قيمة ما %spr للكائن',
    'http:// %s':
        'http:// %s',
    'turbo mode?':
        '؟ التوربو وضع في التشغيل هل',
    'set turbo mode to %b':
        '%b التوربو وضـع تفعيل ',
    'filtered for %clr':
        'خلال هذه الفتره %clr gefiltert',
    'stack size':
        'Stapelgr\u00f6\u00dfe',
    'frames':
        'Rahmenz\u00e4hler',

    // operators:
    '%n mod %n':
        '%n للرقم %n علي القسمة باقي',
    'round %n':
        'صحيح لعدد %n قَرّب',
    '%fun of %n':
        '%fun قيمة إحسب %n للعدد',
    'pick random %n to %n':
        ' %n و %n بين عشوائي عدد إختر',
    '%b and %b':
        '%b و %b',
    '%b or %b':
        '%b أو %b',
    'not %b':
        'ليس %b',
    'true':
        ' صحيح ',
    'false':
        ' خـطأً ',
    'join %words':
        '%words يلي مـا أَوصـل ',
    'split %s by %delim':
        '%s جـَزَّء ،كفواصل %delim بإستخدام',
    'hello':
        'مرحبا',
    'world':
        'ايها العالم',
    'letter %idx of %s':
        '%idx الحرف أوجد %s العبارة من',
    'length of %s':
        '%s أحرف عدد',
    'unicode of %s':
        ' %s للحرف يونيكود ترميز قيمة',
    'unicode %n as letter':
        ' %n يونيكود لترميز المقابل الحرف ',
    'is %s a %typ ?':
        '%s يوافق %typ النوع',
    'is %s identical to %s ?':
        '؟ %s مع متماثل %s هل',
    'type of %s':
        'من نوع %s',

    // variables:
    'Make a variable':
        'انشئ متغيرا',
    'Variable name':
        'اسم المتغير',
    'Script variable name':
        'اسم الكائن',
    'Delete a variable':
        'احذف متغيرا',
    'set %var to %s':
        '%var للمتغيّر %s القيمة خصص',
    'change %var by %n':
        ' %var المتغير قيمة %n بمقدار غيّـر',
    'show variable %var':
        ' %var المُتَغيّر أظهـِر',
    'hide variable %var':
        ' %var المُتَغيّر أخفِ',
    'script variables %scriptVars':
        '%scriptVars مَحَلْي مُتَغَيِّر',

    // lists:
    'list %exp':
        '%exp المصفوفة',
    '%s in front of %l':
        '%s ادرج %l بداية في',
    'item %idx of %l':
        '%idx العنصر أظهـِر %l في',
    'all but first of %l':
        'الأول عـدا الكل أظهـِر %l في',
    'length of %l':
        '%l عناصر عدد',
    '%l contains %s':
        '%l محتويات ضمن %s القيمة',
    'thing':
        'شيئ',
    'add %s to %l':
        '%s القيمة %l في أَدْرِج',
    'delete %ida of %l':
        '%ida العنصر احذف %l من',
    'insert %s at %idx of %l':
        '%s القيمة %idx بالموضع %l في أَدْرِج',
    'replace item %idx of %l with %s':
        ' %idx العنصر بدل %l المصفوفة في %s القيمة ضـع',

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
        'כליי יבור',
    'load the official library of\npowerful blocks':
        'טען את הספריה הרשמית של\n powerful blocks',
    'Libraries...':
        'ספריות...',
    'Import library':
        'ייבא ספריה',
        
    // cloud menu
    'Login...':
        'הכנס...',
    'Signup...':
        'הירשם...',
        
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
        'ازل لالغاء تفعيل لوحة المفاتيح الافتراضية للاجهزة اللوحية',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'حدد لتفعيل لوحة المفاتيح الافتراضية للاجهزة اللوحية',
    'Input sliders':
        'סרגלי קלט',
    'uncheck to disable\ninput sliders for\nentry fields':
        'בטל סימון כדי לבטל סרגלי קלט',
    'check to enable\ninput sliders for\nentry fields':
        'הוסף סימון כדי לאפשר סרגלי קלט',
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

    // custom blocks:
    'delete block definition...':
        'הגדרת מחיקת בלוקים...',
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

    // stage:
    'show all':
        'הצג הכל',
    'pic...':
        'תמונה...',
    'open a new window\nwith a picture of the stage':
        'פתח חלון חדש\nעם תמונת הבמה',

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

    // costumes
    'rename':
        'שנה שם',
    'export':
        'ייצא',
    'rename costume':
        'שנה שם לתחפושת',

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

    // costume editor
    'Costume Editor':
        'עורך מותאם אישית',
    'click or drag crosshairs to move the rotation center':
        'גרור את הכוונת כדי לקבע את מרגז הסיבוב',

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
        'الاصدار الحالي',
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

    // list watchers
    'length: ':
        'אורך: ',

    // coments
    'add comment here...':
        'הוסף הערה כאן',

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

    // collision detection
    'mouse-pointer':
        'סמן עכבר',
    'edge':
        'קצה',
    'pen trails':
        'שבילי עט',

    // costumes
    'Turtle':
        'צב',
    'Empty':
        'ריק',

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

    // math functions
    'abs':
        'ערך מוחלט',
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

    // delimiters
    'letter':
        'אות',
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
		' ( %mult%s ) { %code } פונקציית גאווהסקריפט',


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
		'כדי לשמור על פרופורציות\n אפשר ללחוץ על SHIFT'


};
