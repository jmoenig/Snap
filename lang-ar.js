/*

    lang-ar.js

    Arabic transelation  for SNAP!

    written by Jens MÃ¶nig

    Copyright (C) 2014 by Jens MÃ¶nig

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

SnapTranslator.dict.ar = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    Ã„, Ã¤   \u00c4, \u00e4
    Ã–, Ã¶   \u00d6, \u00f6
    Ãœ, Ã¼   \u00dc, \u00fc
    ÃŸ      \u00df
*/

    // translations meta information
    'language_name':
        'العربية', // the name as it should appear in the language menu
    'language_translator':
        'طارق جلال', // your name for the Translators tab
    'translator_e-mail':
        'tarekgalal46@hotmail.com', // optional
    'last_changed':
        '2016-01-23', // this, too, will appear in the Translators tab

    // GUI
    // control bar:
    'untitled':
        'بدون عنوان',
    'development mode':
        'وضع التصميم',

    // categories:
    'Motion':
        'الحركة',
    'Looks':
        'المظهر',
    'Sound':
        'الصوت',
    'Pen':
        'القلم',
    'Control':
        'التحكم',
    'Sensing':
        'الاستشعار',
    'Operators':
        'العمليات',
    'Variables':
        'المتغيرات',
    'Lists':
        'قوائم(مصفوفات)',
    'Other':
        'لبنات اضافيه',

    // editor:
    'draggable':
        'قابل للسحب',

    // tabs:
    'Scripts':
        'المقاطع البرمجيه',
    'Costumes':
        'المظاهر',
    'Sounds':
        'الاصوات',

    // names:
    'Sprite':
        'كائن',
    'Stage':
        'المنصة',

    // rotation styles:
    'don\'t rotate':
        'غير قابل للدوران',
    'can rotate':
        'قابل للدوران',
    'only face left/right':
        'مواجهة يمين-يسار',

    // new sprite button:
    'add a new sprite':
        'اضافة كائن جديد',

    // tab help
    'costumes tab help':
        'استيراد الصور من الحاسوب او من الانترنت  \n بسحب و افلات الملف هنا', 
    'import a sound from your computer\nby dragging it into here':
        'استيراد الاصوات من الحاسوب او من الانترنت  \n بسحب و افلات الملف هنا', 
    

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
        'B\u00fchne ausgew\u00e4hlt:\nkeine Standardbewegungsbl\u00f6cke\n'
            + 'vorhanden',

    'move %n steps':
        'خطوة %n تحرك',
    'turn %clockwise %n degrees':
        'درجة %n %clockwise استدر',
    'turn %counterclockwise %n degrees':
        'درجة %n %counterclockwise استدر',
    'point in direction %dir':
        ' %dir الاتجاه نحو إتجه',
    'point towards %dst':
        ' %dst نحو إتجه ',
    'go to x: %n y: %n':
        '%n =س %n =ص للنقطة أذهب',
    'go to %dst':
        ' %dst الي إذهب',
    'glide %n secs to x: %n y: %n':
        'ثوان %n خلال %n =س %n =ص النقطة إلي إنزلق',
    'change x by %n':
        ' %n بمقدار س غير',
    'set x to %n':
        '%n تساوي س إجعل',
    'change y by %n':
        ' %n بمقدار ص غير',
    'set y to %n':
        '%n تساوي ص إجعل',
    'if on edge, bounce':
        'الحافة عند كنت إذا أرتد',
    'x position':
        'س الموضع',
    'y position':
        'ص الموضع',
    'direction':
        'الاتجاه',

    // looks:
    'switch to costume %cst':
        '%cst المظهر إلي إنتقل',
    'next costume':
        'التالي المظهر',
    'costume #':
        'المظهر ( ترتيب / رقم )',
    'say %s for %n secs':
        ' %s قـل ثانية %n لمدة',
    'say %s':
        '%s قـل',
    'think %s for %n secs':
        '%s فكر ثانية %n لمدة',
    'think %s':
        ' %s فكـر',
    'Hello!':
        '!مـرحبـا',
    'Hmm...':
        'هممم...',
    'change %eff effect by %n':
        ' %eff التأثير قيمـة %n بمقدار غيّر',
    'set %eff effect to %n':
        ' %eff التأثير لقيـمة %n المقدار حدد',
    'clear graphic effects':
        'الرسومية التأثيرات أحذف',
    'change size by %n':
        ' %n بمقدار الحجم غيّـر',
    'set size to %n %':
        '% %n  لـ مساوياً الحجم إجعل ',
    'size':
        'الحجم',
    'show':
        'إظهَر',
    'hide':
        'إختَفي',
    'go to front':
        'المقدمة الي إنتقل',
    'go back %n layers':
        'طبقات  %n بمقدار الخلف الي انتقل',

    'development mode \ndebugging primitives:':
        'نمط البرمجه \nو تصحيح الاخطاء',
    'console log %mult%s':
        'console log %mult%s',
    'alert %mult%s':
        'تنبيه: %mult%s',

    // sound:
    'play sound %snd':
        '%snd الصـوت شغّـل',
    'play sound %snd until done':
        'أنتهـاءة إنتظر ثم %snd الصـوت شغّـل',
    'stop all sounds':
        'الأصوات جميع أوقف',
    'rest for %n beats':
        'إقـاع وحدة %n لمدة إستـرح',
    'play note %n for %n beats':
        ' %n رقـم النوتـة أعزف ، إيـقاع وحـدة %n بمقدار',
    'change tempo by %n':
        '%n بمقـدار الصوت شـدّة غيّـر',
    'set tempo to %n bpm':
        '%n مسـاوية الصوت شدّة إجعل',
    'tempo':
        'الصوت شدّة مقـدار',

    // pen:
    'clear':
        'امسح',
    'pen down':
        'القلـم أنـزل',
    'pen up':
        'القلـم إرفـع',
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
    'forever %c':
        'باستمرار كرر %c',
    'repeat %n %c':
        ' %n كرر %c',
    'repeat until %b %c':
        '%b حتي كرر %c',
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
    'letter %n of %s':
        '%n الحرف أوجد %s العبارة من',
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
        'إنشاء لبنة مخصصة',

     // menus
    // snap menu
    'About...':
        'عن SNAP!...',
    'Reference manual':
        'دليل التشغيل',
    'Snap! website':
        'الموقع الرسمي',
    'Download source':
        'تنزيل البرنامج',
    'Switch back to user mode':
        'التبديل الى وضع المستخدم',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'user-friendlyعرض القوائم ',
    'Switch to dev mode':
        'التبديل الي وضع المطورين',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'user-friendlyعرض القوائم تعطيل ',
        
     // project menu
    'Project notes...':
        'ملاحظات عن المشروع...',
    'New':
        'جديد',
    'Open...':
        'فتح...',
    'Save':
        'حفظ',
    'Save to disk':
        'حفظ في المستعرض',
    'store this project\nin the downloads folder\n(in supporting browsers)':
        'حفظ المشروع فى مجلد التنزيلات الخاص بالمتصفح المحدد',
    'Save As...':
        'حفظ بأسم ...',
    'Import...':
        'استيراد...',
    'file menu import hint':
        'استيراد مشروع تم تصديره من قبل',
    'Export project as plain text...':
        'تصدير المشروع كمستند نصي ...',
    'Export project...':
        'تصدير المشروع...',
    'show project data as XML\nin a new browser window':
        'عرض المشروع في صيغة XML',
    'Export blocks...':
        'تصدير اللبنات...',
    'show global custom block definitions as XML\nin a new browser window':
        'عرض جميع اللبنات المخصصة في صيغة XML',
		
	'Unused blocks...':
          'لبنات غير مستخدمة...',
    'find unused global custom blocks\nand remove their definitions':
        'إيجاد اللبنات المخصصة الغير مستخدمة لحذفها من المشروع',
    'Remove unused blocks':
        'حذف اللبنات المخصصة الغير مستخدمة',
    'there are currently no unused\nglobal custom blocks in this project':
        'لايوجد لبنات مخصصة غير مستخدمة في هذا المشروع',
    'unused block(s) removed':
        'تم ازالة اللبنات الغير مستخدمة',
    'Export summary...':
        'تصدير ملخص المشروع...',
    'open a new browser browser window\n with a summary of this project':
        'عرض ملخص المشروع فى نافذة مستعرض جديدة',
    'Contents':
        'محتويات',
    'Kind of':
        'نوع من أنواع',
    'Part of':
        'جزء من',
    'Parts':
        'أجزاء',
    'Blocks':
        'بلوكات',
    'For all Sprites':
        'لكل الكائنات',
	'Import tools':
        'استيراد أدوات',
    'load the official library of\npowerful blocks':
        'تحميل مكتبة اللبنات الرسمية لمزيد من التحكم',
    'Libraries...':
        'المكتبات...',
    'Import library':
        'استيراد مكتبة',
        
    // cloud menu
    'Login...':
        'تسجيل دخول...',
    'Signup...':
        'تسجيل خروج...',
        
    // settings menu
    'Language...':
        'تغيير اللغة...',
    'Zoom blocks...':
        'التحكم فى حجم اللبنات...',
    'Stage size...':
        'مساحة المنصة...',
    'Stage width':
        'عرض المنصة',
    'Stage height':
        'ارتفاع المنصة',
    'Default':
        'افتراضى',
    'Blurred shadows':
        'ظلال شبه شفافة',
    'uncheck to use solid drop\nshadows and highlights':
        'ازل لاستخدام الظلال المعتمة',
    'check to use blurred drop\nshadows and highlights':
        'حدد لاستخدام الظلال الضبابية',
    'Zebra coloring':
        'تلوين ZEBRA',
    'check to enable alternating\ncolors for nested blocks':
        'حدد لتفعيل اختيار الوان\n متبادلة للبلوكات المتداخلة',
    'uncheck to disable alternating\ncolors for nested block':
        'ازل لعدم لتفعيل اختيار الوان\n متبادلة للبلوكات المتداخلة ',
    'Dynamic input labels':
        'بطاقات الادخال الديناميكية',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'ازل لالغاء تفعيل بطاقات الادخال الديناميكية للمدخلات',
    'check to enable dynamic\nlabels for variadic inputs':
        'حدد لتفعيل بطاقات الادخال الديناميكية للمدخلات',
    'Prefer empty slot drops':
        'Prefer empty slot drops',
    'settings menu prefer empty slots hint':
        'settings menu prefer empty slots hint',
    'uncheck to allow dropped\nreporters to kick out others':
        'uncheck to allow dropped\nreporters to kick out others',
    'Long form input dialog':
        'صندوق حوار تفصيلي لتعريف المدخلات',
    'Plain prototype labels':
        'تسميات عادية لنماذج البلوكات',
    'uncheck to always show (+) symbols\nin block prototype labels':
        'ازل التحديد لاظهار (+) \n في تسمسة نموذج البلوك',
    'check to hide (+) symbols\nin block prototype labels':
        'حدد لأخفاء (+) \n من تسمسة نموذج البلوك',
    'check to always show slot\ntypes in the input dialog':
        'حدد حتي تظهر دائما\n تصنيف بيانات الادخال \n في صندوق حوار تعريف المدخلات',
    'uncheck to use the input\ndialog in short form':
        'ازل التحديد لاستخدام صندوق الحوار المبسط لتعريف المدخلات',
    'Virtual keyboard':
        'لوحة المفاتيح الافتراضية',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'ازل لالغاء تفعيل لوحة المفاتيح الافتراضية للاجهزة اللوحية',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'حدد لتفعيل لوحة المفاتيح الافتراضية للاجهزة اللوحية',
    'Input sliders':
        'ألواح الأدخال',
    'uncheck to disable\ninput sliders for\nentry fields':
        'أزل لالغاء\nالواح الادخال للحقول',
    'check to enable\ninput sliders for\nentry fields':
        'حدد لتفعيل\nالواح الادخال للحقول',
    'Clicking sound':
        'المؤثرات الصوتية',
    'uncheck to turn\nblock clicking\nsound off':
        'أزل لإيقاف\n أصوات النقر على اللبنات',
    'check to turn\nblock clicking\nsound on':
        'حدد لتفعيل\nأصوات النقر على اللبنات',
    'Animations':
        'مؤثرات حركية',
    'uncheck to disable\nIDE animations':
        'أزل لابطال مؤثرات IDE-\nالحركة',
    'Turbo mode':
        'الوضع السريع',
    'check to prioritize\nscript execution':
        'حدد  لرفع درجة\n أولوية تنفيذ الاسكربت',
    'uncheck to run scripts\nat normal speed':
        'أزل, ليتم تنفيذ\n الاسكربت بالسرعة العادية',
    'check to enable\nIDE animations':
        'حدد لتشغيل المؤثرات IDE-\nالحركية',
	'Flat design':
        'تصميم مُصطَّح بسيط',
    'Keyboard Editing':
        'دعم لوحة المفاتيح',
    'Thread safe scripts':
        'تأمين الاسكربتات',
    'uncheck to allow\nscript reentrance':
        'أزل للسماح\n للاسكربت باعادة الدخول',
    'check to disallow\nscript reentrance':
        'حدد, لمنع\n الاسكربت من اعادة الدخول',
    'Prefer smooth animations':
        'الرسوم المتحركة على نحو سلس',
    'uncheck for greater speed\nat variable frame rates':
        'أزل للحصول علي سرعه اعلي\nمع معدلات تتبابع اطارات متغيره',
    'check for smooth, predictable\nanimations across computers':
        'حدد للحصول على\nحركة ناعمة',
    'Flat line ends':
        'نهايات الخطوط',
    'check for flat ends of lines':
        'حدد لجعل نهايات الخطوط\n قائمة الزاوية',
    'uncheck for round ends of lines':
        'أزل لجعل نهايات الخطوط \nدائرية',
    'Inheritance support':
        ' توريث الخصائص بين الكائنات',
	'uncheck to disable\nsprite inheritance features':
        'أزل لألغاء تفعيل توريث الخصائص بين الكائنات',
    'check for sprite\ninheritance features':
        'حدد لتفعيل توريث الخصائص بين الكائنات',

    // inputs
    'with inputs':
        'مستخدماً القيم التالية',
    'input names:':
        'مع المدخلات',
    'Input Names:':
        'أسماء المدخلات',
    'input list:':
        'قائمة المدخلات',

    // context menus:
    'help':
        'مساعدة',

    // palette:
    'hide primitives':
        'أخفاء اللبنات',
    'show primitives':
        'إظهار اللبنات',

    // blocks:
    'help...':
        'مساعدة...',
    'relabel...':
        'اعادة تسمية...',
    'duplicate':
        'مضاعفة',
    'make a copy\nand pick it up':
        'اصنع نسخة و التقطها',
    'only duplicate this block':
        'ضاعف هذا البلوك فقط',
    'delete':
        'حذف',
    'script pic...':
        'صورة نقطية للبلوك...',
    'open a new window\nwith a picture of this script':
        'افتح نافذه جديده و اعرض النص البرمجي خلالها',
    'ringify':
        'احاطة',
    'unringify':
        'عدم احاطة',

    // custom blocks:
    'delete block definition...':
        'حذف تعريف البلوك',
    'edit...':
        'تحرير...',

    // sprites:
    'edit':
        'تحرير',
    'move':
        'تحرك',
    'detach from':
        'افصل عن',
    'detach all parts':
        'افصل كل الاجزاء',
    'export...':
        'تصدير...',

    // stage:
    'show all':
        'إظهار الكل',
    'pic...':
        'الصورة المصدره...',
    'open a new window\nwith a picture of the stage':
        'فتح نافذه جديده مع لقطه من المسرح',

    // scripting area
    'clean up':
        'محاذاة اللبنات',
    'arrange scripts\nvertically':
        'محاذا اللبنات عموديا',
    'add comment':
        'اضافة تعليق',
    'undrop':
        'تراجع عن الافلات',
    'undo the last\nblock drop\nin this pane':
        'تراجع عن الافلات الاخير للبلوك',
    'scripts pic...':
        'تصوير لقطة من الاسكربت...',
    'open a new window\nwith a picture of all scripts':
        'فتح نافذه جديده\n مع صورة لجميع الاسكربتات',
    'make a block...':
        'أنشئ لَبِـنَة جديدة...',

    // costumes
    'rename':
        'اعادة تسمية',
    'export':
        'تصدير',
    'rename costume':
        'اعاده تسمية',

    // sounds
    'Play sound':
        'شغل الصوت',
    'Stop sound':
        'اوقف الصوت',
    'Stop':
        'قف',
    'Play':
        'شغل',
    'rename sound':
        'اعد تسمية الصوت',

    // dialogs
    // buttons
    'OK':
        'موافق',
    'Ok':
        'موافق',
    'Cancel':
        'الغاء الامر',
    'Yes':
        'نعم',
    'No':
        'لا',

    // help
    'Help':
        'مساعده',

    // zoom blocks
    'Zoom blocks':
        'حجم اللبنات',
    'build':
        ' لَبِناتِك إصنع',
    'your own':
        'الخاصة',
    'blocks':
        'بنفسك',
    'normal (1x)':
        'عادي (1x)',
    'demo (1.2x)':
        'تجريبي (1.2x)',
    'presentation (1.4x)':
        'استعراضي (1.4x)',
    'big (2x)':
        'كبير (2x)',
    'huge (4x)':
        'ضخم (4x)',
    'giant (8x)':
        'عملاق (8x)',
    'monstrous (10x)':
        'عملاق جدا (10x)',
 
 // Project Manager
    'Untitled':
        'بدون عنوان',
    'Open Project':
        'فتح مشروع',
    '(empty)':
        '(فارغ)',
    'Saved!':
        'تم الحفظ!',
    'Delete Project':
        'حذف مشروع',
    'Are you sure you want to delete':
        'هل انت متأكد من رغبتك في الحذف?',
    'rename...':
        'اعاده تسميه...',

    // costume editor
    'Costume Editor':
        'محرر المظاهر',
    'click or drag crosshairs to move the rotation center':
        'انقر أو اسحب علامة المركز لنقل مركز دوران الكائن',

    // project notes
    'Project Notes':
        'ملاحظات المشروع',

    // new project
    'New Project':
        'مشروع جديد',
    'Replace the current project with a new one?':
        'استبدال المشروع الحالي بأخر جديد?',

    // save project
    'Save Project As...':
        'حفظ المشروع باسم...',

    // export blocks
    'Export blocks':
        'تصدير البلوكات',
    'Import blocks':
        'استيراد البلوكات',
    'this project doesn\'t have any\ncustom global blocks yet':
        'هذا المشروع لا يحتوى علي بلوكات مخصصة ',
    'select':
        'حدد',
    'none':
        'لا شيء',

    // variable dialog
    'for all sprites':
        'لجميع الكائنات',
    'for this sprite only':
        'لهذا الكائن فقط',

    // block dialog
    'Change block':
        'تغيير البلوك',
    'Command':
        'امر',
    'Reporter':
        'Reporter مُقَرِرات',
    'Predicate':
        'Predicate اسنادات تأكيدية',

    // block editor
    'Block Editor':
        'محرر البلوكات',
    'Apply':
        'طبق',

    // block deletion dialog
    'Delete Custom Block':
        'حذف بلوك مخصص',
    'block deletion dialog text':
        'هل تريد حقا حذف هذه الكتلة مع جميع النسخ منها',

    // input dialog
    'Create input name':
        'إنشاء تسمية لمُدخَل جديد',
    'Edit input name':
        'تعديل تسمية مُدخَل',
    'Edit label fragment':
        'Edit label fragment',
    'Title text':
        'نص العنوان',
    'Input name':
        'أسم المُدخَل',
    'Delete':
        'حذف',
    'Object':
        'كائن',
    'Number':
        'رقم',
    'Text':
        'نص',
    'List':
        'لائحة',
    'Any type':
        'اي نوع',
    'Boolean (T/F)':
        'منطقي (W/F)',
    'Command\n(inline)':
        'لبنة مستطيلة الشكل',
    'Command\n(C-shape)':
        'لبنة هلالية الشكل',
    'Any\n(unevaluated)':
        'أي نوع\n(خام لم يُقَيَّم)',
    'Boolean\n(unevaluated)':
        'منطقي\n(خام لم يُقَيَّم)',
    'Single input.':
        'ادخال مفرد.',
    'Default Value:':
        'القيمة الافتراضية:',
    'Multiple inputs (value is list of inputs)':
        'متعدد الادخالات (عبارة عن لائحة او مصفوفة من المدخلات)',
    'Upvar - make internal variable visible to caller':
        'Upvar - اجعل المتغيرات الداخلية مرئية بواسطة المُستَدعي',

    // About Snap
    'About Snap':
        'عن Snap',
    'Back...':
        'للخلف...',
    'License...':
        'الترخيص...',
    'Modules...':
        'البرمجه...',
    'Credits...':
        'الاشارات...',
    'Translators...':
        'المترجمون',
    'License':
        'الترخيص',
    'current module versions:':
        'الاصدار الحالي',
    'Contributors':
        'المساهمون',
    'Translations':
        'المترجمون',

    // variable watchers
    'normal':
        'عادي',
    'large':
        'كبير',
    'slider':
        'شريط التمرير',
    'slider min...':
        'ادني حد...',
    'slider max...':
        'اقصي حد...',
    'import...':
        'استيراد...',
    'Slider minimum value':
        'القيمة الصغري لشريط التمرير',
    'Slider maximum value':
        'القيمة العظمي لشريط التمرير',

    // list watchers
    'length: ':
        'الطول: ',

    // coments
    'add comment here...':
        'اضف تعليق هنا',

    // drow downs
    // directions
    '(90) right':
        '(90) يمين',
    '(-90) left':
        '(-90) يسار',
    '(0) up':
        '(0) اعلي',
    '(180) down':
        '(180) اسفل',

    // collision detection
    'mouse-pointer':
        'مؤشر_الفأرة',
    'edge':
        'الحافة',
    'pen trails':
        'اثار_القلم',

    // costumes
    'Turtle':
        'السلحف',
    'Empty':
        'فارغ',

    // graphical effects
    'brightness':
        'التوهج',
    'ghost':
        'شبح',
    'negative':
        'معكوس',
    'comic':
        'كوميدي',
    'confetti':
        'تحول اللون',

    // keys
    'space':
        'المسافه',
    'up arrow':
        'السهم العلوي',
    'down arrow':
        'السهم السفلي',
    'right arrow':
        'السهم الايمن',
    'left arrow':
        'السهم الايسر',
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
        'جديد...',

    // math functions
    'abs':
        'abs',
    'floor':
        'floor',
    'sqrt':
        'الجذر التربيعي',
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
        'الحروف',
    'whitespace':
        'الفراغات_البينية',
    'line':
        'علامات_الأسطر',
    'tab':
        'المسافات_البادئة',
    'cr':
        'أكتب_ما_تريد',

    // data types
    'number':
        'رقم',
    'text':
        'نص',
    'Boolean':
        'منطقي',
    'list':
        'مصفوفة',
    'command':
        'لبنات_اجرائية',
    'reporter':
        'لبنات_تقريرية',
    'predicate':
        'لبنات_تأكيدية',

    // list indices
    'last':
        'الاخير',
    'any':
        'أي موضع',
		
		
		// miscellaneous
	'find blocks...':
		'البحث عن لبنة...',
	
	'Reset Password...':
		'إعادة تعيين كلمة المرور',
	
	'Codification support':
		'مساعد التكويد',
	'uncheck to disable\nblock to text mapping features':
		'أزل التحديد لألغاء مساعد التكويد',
	'check for block\nto text mapping features':
		'حَدد لتفعيل مساعد التكويد',
	'current %dates':
		'التاريخ الحالي %dates',
	'year':'سنة',
	'month':'شهر',
	'date':'يوم',
	'hour':'ساعة',
	'minute':'دقيقة',
	'second':'ثانية',
	'time in milliseconds':
		'ملي_ثانية',
	'day of week':
		'ترتيب_اليوم_في_الاسبوع',

	'JavaScript function ( %mult%s ) { %code }':
		' ( %mult%s ) { %code } جافاسكربت دالة',


	// Copy / Paste
	'Press CTRL+C one more time to effectively copy to clipboard.':
		'إضغط CTRL+C مرة أخري لتأكيد نسخ محتويات الحافظة.',
	'Press CTRL+V one more time to effectively paste from clipboard.':
		'إضغط CTRL+V مرة أخري لتأكيد لصق محتويات الحافظة.',
	'Press CTRL+X one more time to effectively cut to clipboard.':
		'إضغط CTRL+X مرة أخري لتأكيد لصق محتويات الحافظة.',

	// Paint.js
	'undo':'تراجع',
	'Paintbrush tool\n(free draw)':
		'اداة الرسم الحر',
	'Stroked Rectangle\n(shift: square)':
		'اداة رسم المستطيل',
	'Stroked Ellipse\n(shift: circle)':
		'اداة رسم الشكل البيضاوى',
	'Eraser tool':
		'اداة الممحاة',
	'Set the rotation center':
		'ضبط مركز الدوران',
	'Line tool\n(shift: vertical/horizontal)':
		'اداة رسم الخط المستقيم رأسيا أو أفقيا',
	'Filled Rectangle\n(shift: square)':
		'أداة رسم مستطيل ممتلئ بالون محدد',
	'Filled Ellipse\n(shift: circle)':
		'أداة رسم شكل بيضاوى ممتلئ بلون محدد',
	'Fill a region':
		'أداة الملئ بالون',
	'Pipette tool\n(pick a color anywhere)':
		'أداة إلتقاط الألوان',
	'grow':'تكبير',
	'shrink':'تصغير',
	'flip \u2194':
		'إنعكاس \u2194',
	'flip \u2195':
		'إنعكاس \u2195',
	'Brush size':
		'حجم الفرشـاة',
	'Constrain proportions of shapes?\n(you can also hold shift)':
		'تأمين نسبة الأرتفاع الي العرض?\n(يمكنك ايضا استخدام مفتاح Shift)'


};
