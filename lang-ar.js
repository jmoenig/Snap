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
        '2015-10-23', // this, too, will appear in the Translators tab

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
        'التحسس',
    'Operators':
        'العمليات',
    'Variables':
        'المتغيرات',
    'Lists':
        'البيانات',
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
        'الكائنات',
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
        'تحرك %n خطوة',
    'turn %clockwise %n degrees':
        'استدر %clockwise %n درجه',
    'turn %counterclockwise %n degrees':
        'استدر %counterclockwise %n درجه',
    'point in direction %dir':
        'اتجه نحو الاتجاه %dir',
    'point towards %dst':
        'اتجه نحو %dst',
    'go to x: %n y: %n':
        'اذهب للموضع س: %n ص: %n',
    'go to %dst':
        'اذهب الي %dst',
    'glide %n secs to x: %n y: %n':
        'انزلق خلال ث %n الي الموضع س: %n ص: %n',
    'change x by %n':
        'غير س بمقدار %n',
    'set x to %n':
        'اجعل س تساوي %n',
    'change y by %n':
        'غير ص بمقدار %n',
    'set y to %n':
        'اجعل ص تساوي %n',
    'if on edge, bounce':
        'ارتد اذا كنت عند الحافة',
    'x position':
        'الموضع س',
    'y position':
        'الموضع ص',
    'direction':
        'الاتجاه',

    // looks:
    'switch to costume %cst':
        'غير المظهر الى %cst',
    'next costume':
        'المظهر التالي',
    'costume #':
        'رقم المظهر',
    'say %s for %n secs':
        'قل %s لمده %n ث',
    'say %s':
        'قل %s',
    'think %s for %n secs':
        'فكر %s لمدة %n ث',
    'think %s':
        'فكر %s',
    'Hello!':
        'مرحبا!',
    'Hmm...':
        'هممم...',
    'change %eff effect by %n':
        'غير تأثير %eff بمقدار %n',
    'set %eff effect to %n':
        'اجعل تأثير %eff مساويا ل %n',
    'clear graphic effects':
        'ازل التأثيرات الرسومية',
    'change size by %n':
        'غير الحجم بمقدار %n',
    'set size to %n %':
        'اجعل الحجم مساويا ل %n %',
    'size':
        'الحجم',
    'show':
        'اظهر',
    'hide':
        'اختف',
    'go to front':
        'انتقل الى المقدمة',
    'go back %n layers':
        'انتقل  %n طبقة الى الخلف',

    'development mode \ndebugging primitives:':
        'نمط البرمجه \nو تصحيح الاخطاء',
    'console log %mult%s':
        'console log %mult%s',
    'alert %mult%s':
        'تنبيه: %mult%s',

    // sound:
    'play sound %snd':
        'شغل الصوت %snd',
    'play sound %snd until done':
        'شغل الصوت %snd وانتظر انتهاءه',
    'stop all sounds':
        'أوقف جميع الاصوات',
    'rest for %n beats':
        'استرح لمدة %n وحدة ايقاع',
    'play note %n for %n beats':
        ' اعزف النوته  %n لمدة %n وحدة ايقاع',
    'change tempo by %n':
        'غير شده الصوت بمقدار %n',
    'set tempo to %n bpm':
        'اجعل شدة الصوت مساوية %n',
    'tempo':
        'شدة الصوت',

    // pen:
    'clear':
        'امسح',
    'pen down':
        'انزل القلم',
    'pen up':
        'ارفع القلم',
    'set pen color to %clr':
        'اجعل لون القلم مساويا لـ %clr',
    'change pen color by %n':
        'غير لون القلم بمقدار %n',
    'set pen color to %n':
        'اجعل لون القلم مساويا لـ %n',
    'change pen shade by %n':
        'غير تظليل القلم بمقدار %n',
    'set pen shade to %n':
        'اجعل تظليل القلم مساويا لـ %n',
    'change pen size by %n':
        'غير حجم القلم بمقدار %n',
    'set pen size to %n':
        ' اجعل حجم القلم مساويا لـ %n',
    'stamp':
        'اطبع',

    // control:
    'when %greenflag clicked':
        'عند نقر %greenflag ',
    'when %keyHat key pressed':
        'عند ضغط مفتاح %keyHat ',
    'when I am %interaction':
        'عندما اكون %interaction ',
    'clicked':
        'عند نقر هذا الكائن',
    'pressed':
        'عند ضغط الكائن',
    'dropped':
        'عند  افلات الكائن',
    'mouse-entered':
        'عند دخول الفأرة حيز الكائن',
    'mouse-departed':
        'عند خروج الفأرة من حيز الكائن',
    'when I receive %msgHat':
        'عندما استقبل رسالة %msgHat ',
    'broadcast %msg':
        ' بث %msg ',
    'broadcast %msg and wait':
        ' بث و انتظر %msg ',
    'Message name':
        'اسم الرسالة',
    'message':
        'الرسالة',
    'any message':
        'اي رسالة',
    'wait %n secs':
        ' انتظر لـ %n ث',
    'wait until %b':
        'انتظر حتي %b',
    'forever %c':
        'كرر باستمرار %c',
    'repeat %n %c':
        'كرر %n %c',
    'repeat until %b %c':
        'كرر حتي %b %c',
    'if %b %c':
        'اذا %b %c',
    'if %b %c else %c':
        'اذا %b %c وإلا %c',
    'report %s':
        'berichte %s',
    'stop %stopChoices':
        'اوقف %stopChoices',
    'all':
        'الكل',
    'this script':
        'هذا المقطع البرمجي',
    'this block':
        'هذا البلوك',
    'stop %stopOthersChoices':
        'stoppe %stopOthersChoices',
    'all but this script':
        'الكل باثتثناء هذا المقطع',
    'other scripts in sprite':
        'المقاطع الاخري في هذا الكائن',
    'pause all %pause':
        ' ايقاف الكل مؤقتا %pause',
    'run %cmdRing %inputs':
        'تشغيل %cmdRing  مع مدخلات %inputs',
    'launch %cmdRing %inputs':
        'تلقيم %cmdRing مع مدخلات %inputs',
    'call %repRing %inputs':
        'استدعاء %repRing مع مدخلات %inputs',
    'run %cmdRing w/continuation':
        'شغل %cmdRing باستمرار',
    'call %cmdRing w/continuation':
        'استدع %cmdRing باستمرار',
    'warp %c':
        'Warp %c',
    'when I start as a clone':
        'عندما تبدأ نسخة مني',
    'create a clone of %cln':
        ' انشئ نسخه مني %cln',
    'myself':
        'انا',
    'delete this clone':
        'احذف هذه النسخة',

    // sensing:
    'touching %col ?':
        'ملامس لـ %col ?',
    'touching %clr ?':
        'ملامس للون %clr ?',
    'color %clr is touching %clr ?':
        'اللون %clr لامس اللون %clr ?',
    'ask %s and wait':
        'اسأل و انتظر %s ',
    'what\'s your name?':
        'ما هو اسمك؟?',
    'answer':
        'الاجابة',
    'mouse x':
        'الموضع س للفأرة',
    'mouse y':
        'الموضع ص للفأره',
    'mouse down?':
        'زر الفأره الايسر مضغوط?',
    'key %key pressed?':
        'المفتاح %key مضغوط?',
    'distance to %dst':
        'المسافة الي %dst',
    'reset timer':
        'صفر المؤقت',
    'timer':
        'المؤقت',
    '%att of %spr':
        '%att علي %spr',
    'http:// %s':
        'http:// %s',
    'turbo mode?':
        'الوضع السريع?',
    'set turbo mode to %b':
        'اضبط الوضع السريع لـ %b',
    'filtered for %clr':
        'خلال هذه الفتره %clr gefiltert',
    'stack size':
        'Stapelgr\u00f6\u00dfe',
    'frames':
        'Rahmenz\u00e4hler',

    // operators:
    '%n mod %n':
        '%n باقي قسمة %n',
    'round %n':
        '%n قرب',
    '%fun of %n':
        '%fun للقيمة %n',
    'pick random %n to %n':
        'اختر عدد عشوائي بين %n و %n',
    '%b and %b':
        '%b و %b',
    '%b or %b':
        '%b أو %b',
    'not %b':
        'ليس %b',
    'true':
        'صحيح منطقيا',
    'false':
        'خطأ منطقيا',
    'join %words':
        'أربط %words',
    'split %s by %delim':
        'قسم %s علي مستوي %delim',
    'hello':
        'مرحبا',
    'world':
        'ايها العالم',
    'letter %n of %s':
        'الحرف %n من %s',
    'length of %s':
        'طول  %s',
    'unicode of %s':
        'قيمة ترميز يونيكود لـ %s',
    'unicode %n as letter':
        'الحرف المقابل لقيمة الترميز %n هو',
    'is %s a %typ ?':
        'هل %s من النوع %typ ?',
    'is %s identical to %s ?':
        'هل %s مشابه لـ %s ?',
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
        ' اجعل قيمة %var تساوى %s',
    'change %var by %n':
        'غير قيمة المتغير %var  بمقدار %n',
    'show variable %var':
        'اظهر المتغير %var',
    'hide variable %var':
        'اخف المتغير %var',
    'script variables %scriptVars':
        'متغيرات هذا الاسكربت %scriptVars',

    // lists:
    'list %exp':
        'القائمة %exp',
    '%s in front of %l':
        ' في الموقع %s ادرج %l من',
    'item %idx of %l':
        ' العنصر %idx من %l',
    'all but first of %l':
        'الكل باثتثناء الاول من %l',
    'length of %l':
        ' طول  %l',
    '%l contains %s':
        '%l يحتوى %s',
    'thing':
        'شيئ',
    'add %s to %l':
        'أضف %s الي %l ',
    'delete %ida of %l':
        'احذف %ida من %l',
    'insert %s at %idx of %l':
        'ادرج %s فى الموضع %idx ضمن %l',
    'replace item %idx of %l with %s':
        ' استبدل قيمة العنصر ذو الترتيب %idx من %l بالقيمة %s',

    // other
    'Make a block':
        'انشاء لبنة',

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
        'القوائم',
    'Open...':
        'فتح...',
    'Save':
        'حفظ',
    'Save to disk':
        'حفظ في المستعرض',
    'store this project\nin the downloads folder\n(in supporting browsers)':
        'حفظ المشروع فى مجلد التنزيلاتالخاص بالمتصفح المحدد',
    'Save As...':
        'حفظ بأسم جديد...',
    'Import...':
        'استيراد...',
    'file menu import hint':
        'استيراد مشروع تم تصديره من قبل',
    'Export project as plain text...':
        'تصدير المشروع كمستند نصي ...',
    'Export project...':
        'تصدير المشروع...',
    'show project data as XML\nin a new browser window':
        'عرض المشروع فى شكل XML',
    'Export blocks...':
        'تصدير اللبنات...',
    'show global custom block definitions as XML\nin a new browser window':
        'عرض جميع اللبنات المخصصة في شكل XML',
    'Import tools':
        'استيراد أدوات',
    'load the official library of\npowerful blocks':
        'تحميل المكتبة اللبنات الرسمية لمزيد من التحكم',
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
        'ظلال ضبابية',
    'uncheck to use solid drop\nshadows and highlights':
        'ازل لاستخدام الظلال المعتمة',
    'check to use blurred drop\nshadows and highlights':
        'حدد لاستخدام الظلال الضبابية',
    'Zebra coloring':
        'تلوين ZEBRA',
    'check to enable alternating\ncolors for nested blocks':
        'حدد لتفعيل اختيار الوان\n متبادلة للبلوكات المتداخلة',
    'uncheck to disable alternating\ncolors for nested block':
        'ازل لعدملتفعيل اختيار الوان\n متبادلة للبلوكات المتداخلة ',
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
        'لوحة المفاتيح الافتراضية',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'ازل لالغاء تفعيل لوحة المفاتيح الافتراضية لاجهزة المحمول',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'einschalten um die virtuelle\nTastatur auf mobilen Ger\u00e4ten\n'
            + 'zu erm\u00f6glichen',
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
    'Thread safe scripts':
        'تأمين الاسكربتات',
    'uncheck to allow\nscript reentrance':
        'أزل للسماح\n للاسكربت باعادة الدخول',
    'check to disallow\nscript reentrance':
        'حدد, لمنع\n الاسكربت من اعادة الدخول',
    'Prefer smooth animations':
        'أطارات  الحركه',
    'uncheck for greater speed\nat variable frame rates':
        'أزل للحصول علي سرعه اعلي\nمع نسبة اطارات متغيره',
    'check for smooth, predictable\nanimations across computers':
        'حدد للحصول على\nحركة ناعمة',
    'Flat line ends':
        'نهايات الخطوط',
    'check for flat ends of lines':
        'حدد لجعل نهايات الخطوط\n قائمة الزاوية',
    'uncheck for round ends of lines':
        'أزل لجعل نهايات الخطوط \nدائرية',

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
        'مساعدة',

    // palette:
    'hide primitives':
        'اخفاءprimitives',
    'show primitives':
        'أظهار primitivesال',

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
        'script pic...',
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
        'مسح',
    'arrange scripts\nvertically':
        'محاذا البلوكات عموديا',
    'add comment':
        'اضافة تعليق',
    'undrop':
        'تراجع عن الافلات',
    'undo the last\nblock drop\nin this pane':
        'تراجع عن الافلات الاخير للبلوك',
    'scripts pic...':
        'صور الاسكربت...',
    'open a new window\nwith a picture of all scripts':
        'فتح نافذه جديده\n مع صورة لجميع الاسكربتات',
    'make a block...':
        'اصنع بلوك...',

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
        'build',
    'your own':
        'اغراضك',
    'blocks':
        'لبنات',
    'normal (1x)':
        'عادي (1x)',
    'demo (1.2x)':
        'تجريبي (1.2x)',
    'presentation (1.4x)':
        'استعراضي (1.4x)',
    'big (2x)':
        'كبير (2x)',
    'كبير (4x)':
        'ضخم (4x)',
    'عملاق (8x)':
        'gigantisch (8x)',
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
        'محرر المخصصات',
    'click or drag crosshairs to move the rotation center':
        'انقر أو اسحب مرمى لنقل مركز دوران',

    // project notes
    'Project Notes':
        'ملاحظات المشروع',

    // new project
    'New Project':
        'مشروع جديد',
    'Replace the current project with a new one?':
        'Dاستبدال المشروع الحالي بأخر جديد?',

    // save project
    'Save Project As...':
        'حفظ المشروع باسم...',

    // export blocks
    'Export blocks':
        'تصدير البلوكات',
    'Import blocks':
        'استيراد البلوكات',
    'this project doesn\'t have any\ncustom global blocks yet':
        'هذا المشروع خالي من  global blocks ',
    'select':
        'حدد',
    'none':
        'لا شيء',

    // variable dialog
    'for all sprites':
        'لكل المشروع',
    'for this sprite only':
        'لهذا الكائن فقط',

    // block dialog
    'Change block':
        'تغيير البلوك',
    'Command':
        'امر',
    'Reporter':
        'Reporter',
    'Predicate':
        'Predicate الاسنادات',

    // block editor
    'Block Editor':
        'محرر البلوكات',
    'Apply':
        'طبق',

    // block deletion dialog
    'Delete Custom Block':
        'حذف بلوك مخصص',
    'block deletion dialog text':
        'حذف بلوك مخصص',

    // input dialog
    'Create input name':
        'Create input name',
    'Edit input name':
        'Edit input name',
    'Edit label fragment':
        'Edit label fragment',
    'Title text':
        'نص العنوان',
    'Input name':
        'ادخل الاسم',
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
        'inline',
    'Command\n(C-shape)':
        'Command\n(C-Form)',
    'Any\n(unevaluated)':
        'اي\n(غير مقيم)',
    'Boolean\n(unevaluated)':
        'منطقي\n(غير مقيم)',
    'Single input.':
        'ادخال مفرد.',
    'Default Value:':
        'القيمة الافتراضية:',
    'Multiple inputs (value is list of inputs)':
        'متعدد الادخالات (A LIST)',
    'Upvar - make internal variable visible to caller':
        'Upvar - اجعل متغير الفترات مرئي بالنسبة callerلل',

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
        'المساهمين',
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
        'مؤشر الفأرة',
    'edge':
        'الحافة',
    'pen trails':
        'اثار القلم',

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
        'السهم لاعلي',
    'down arrow':
        'السهم لاسفل',
    'right arrow':
        'السهم لليمين',
    'left arrow':
        'السهم لليسار',
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
        'حروف',
    'whitespace':
        'مسافة فارغة',
    'line':
        'سطر',
    'tab':
        'مسافة بادئة',
    'cr':
        'انتر',

    // data types
    'number':
        'رقم',
    'text':
        'نص',
    'Boolean':
        'منطقي',
    'list':
        'لائحة',
    'command':
        'امر',
    'reporter':
        'reporter',
    'predicate':
        'predicate',

    // list indices
    'last':
        'الاخير',
    'any':
        'أي'
};
