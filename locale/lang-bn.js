/*

    lang-bn.js

   	বাংলা (Bangla) translation for SNAP!

    written by Dr. Mokter Hossain

    Copyright (C) 2014 by Dr. Mokter Hossain

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
		bn - Bengali(Bangla) => lang-bn.js
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

SnapTranslator.dict.bn = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    Ä, ä   \u00c4, \u00e4
    Ö, ö   \u00d6, \u00f6
    Ü, ü   \u00dc, \u00fc
    ß      \u00df
*/
    // translations meta information
    'language_name':
        'বাংলা', // the name as it should appear in the language menu
    'language_translator':
        'Dr. Mokter Hossain', // your name for the Translators tab
    'translator_e-mail':
        'mokter@gmail.com', // optional
    'last_changed':
        '2014-07-02', // this, too, will appear in the Translators tab


    // GUI
    // control bar:
    'untitled':
        'শিরোনামহীন',
    'development mode':
        'উন্নয়ন মোড',

    // categories:
    'Motion':
        'গতি (Motion)',
    'Looks':
        'সৌন্দর্য (Looks)',
    'Sound':
        'শব্দ (Sound)',
    'Pen':
        'লেখনী (Pen)',
    'Control':
        'নিয়ন্ত্রণ (Control)',
    'Sensing':
        'অনুভূতি (Sensing)',
    'Operators':
        'চালক (Operators)',
    'Variables':
        'চলক (Variables)',
    'Lists':
        'তালিকা (Lists)',
    'Other':
        'অন্যান্য',

    // editor:
    'draggable':
        'টেনে আনার যোগ্য',

    // tabs:
    'Scripts':
        'প্রোগ্রাম স্ক্রিপ্ট (Scripts)',
    'Costumes':
        'পরিচ্ছদ (Costumes)',
    'Sounds':
        'শব্দমালা (Sounds)',

    // names:
    'Sprite':
        'স্পাইট',
    'Stage':
        'দৃশ্যস্থল',

    // rotation styles:
    'don\'t rotate':
        'ঘোরতে পারে না',
    'can rotate':
        'ঘোরতে পারে',
    'only face left/right':
        'একমাত্র  ডানে/বামে মুখ',

    // new sprite button:
    'add a new sprite':
        'একটি নতুন স্পাইট যোগ কর',

    // tab help
    'costumes tab help':
        '\nনতুন/অতিরিক্ত পরিচ্ছদ ব্যবহারের জন্য প্রথমে ডান দিকের নিচের পরিচ্ছদ আইটেমে একটি ক্লিক কর, তারপর কম্পিউটার থেকে প্রত্যাশিত ছবির ফাইল নির্বাচন করে\nএখানে আনয়ন কর \n'
    	+'\n\n'+
    	'নতুন/অতিরিক্ত স্পাইট ব্যবহারের জন্য প্রথমে ডান দিকের নিচের স্পাইট আইটেমে একটি ক্লিক কর, তারপর কম্পিউটার থেকে প্রত্যাশিত ছবির ফাইল নির্বাচন করে\nএখানে আনয়ন কর \n',
    'import a sound from your computer\nby dragging it into here':
        '\nশব্দ ব্যবহারের জন্য কম্পিউটার থেকে প্রত্যাশিত শব্দের ফাইল নির্বাচন করে এখানে আনয়ন করতে পার',

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
        'স্টেজ নির্বাচিত হয়েছে:\n কোন গতিশীল প্রিমিটিভ নেই\n'
            + 'disponibles',

    'move %n steps':
        'অগ্রসর হও %n ধাপ',
    'turn %clockwise %n degrees':
        'ডানদিকে %clockwise %n ডিগ্রীকোণে ঘোর',
    'turn %counterclockwise %n degrees':
        'বামদিকে %counterclockwise %n ডিগ্রীকোণে ঘোর',
    'point in direction %dir':
        'দিক নির্ধারণ কর  %dir',
    'point towards %dst':
        'প্রতি নির্দেশ কর  %dst',
    'go to x: %n y: %n':
        'x: %n y: %n অবস্থানে যাও',
    'go to %dst':
        '%dst দুরত্বে যাও',
    'glide %n secs to x: %n y: %n':
        'গড়িয়ে চল x: %n y: %n অবস্থানে  %n সেকেন্ড  ',
    'change x by %n':
        'x পরিবর্তন কর %n দ্বারা',
    'set x to %n':
        'x নির্ধারণ কর %n',
    'change y by %n':
        'y পরিবর্তন কর %n দ্বারা',
    'set y to %n':
        'y নির্ধারণ কর  %n',
    'if on edge, bounce':
        'প্রান্ত স্পর্শ করলে উল্টো ফিরে আস',
    'x position':
        'এর  x অবস্থান',
    'y position':
        'এর  y অবস্থান',
    'direction':
        'এর গতিপথ',

    // looks:
    'switch to costume %cst':
        'পরিচ্ছদ বদল  কর  %cst',
    'next costume':
        'পরবর্তী পরিচ্ছদ',
    'costume #':
        'এর পরিচ্ছদ #',
    'say %s for %n secs':
        'বল  %s %n সেকেন্ড পর্যন্ত',
    'say %s':
        'বল  %s',
    'think %s for %n secs':
        'ভাব  %s %n সেকেন্ড পর্যন্ত',
    'think %s':
        'ভাব  %s',
    'Hello!':
        'হ্যালো!',
    'Hmm...':
        'হুম ...',
    'change %eff effect by %n':
        'প্রভাব   %eff পরিবর্তন করো  %n দ্বারা ',
    'set %eff effect to %n':
        'প্রভাব  %eff %n গুণ নির্ধারণ কর',
    'clear graphic effects':
        'চিত্রলেখ প্রভাব পরিষ্কার কর',
    'change size by %n':
        'আকার    %n গুণ পরিবর্তন কর',
    'set size to %n %':
        'আকার   %n % নির্ধারণ কর',
    'size':
        'এর আকার',
    'show':
        'প্রদর্শন কর',
    'hide':
        'গোপন কর',
    'go to front':
        'সামনে যাও',
    'go back %n layers':
        'পশ্চাতে যাও %n স্তর',

    'development mode \ndebugging primitives:':
        'উন্নয়ন মোড \n ডিবাগিং প্রিমিটিভ',
    'console log %mult%s':
        'কনসোল লগ: %mult%s',
    'alert %mult%s':
        'সতর্ক: %mult%s',

    // sound:
    'play sound %snd':
        'শব্দ বাজাও  %snd',
    'play sound %snd until done':
        '%snd শব্দ বাজাও যতক্ষণ না',
    'stop all sounds':
        'সকল শব্দ বন্ধ কর',
    'rest for %n beats':
        'নীরব থাক %n স্বরকম্প পর্যন্ত',
    'play note %n for %n beats':
        'মন্তব্য %n বাজাও  %n স্বরকম্প',
    'change tempo by %n':
        'শব্দের কম্পনমাত্রা %n পরিবর্তন কর',
    'set tempo to %n bpm':
        'শব্দের কম্পনমাত্রা %n নির্ধারণ কর',
    'tempo':
        'শব্দের কম্পনমাত্রা',

    // pen:
    'clear':
        'পরিচ্ছদ পরিষ্কার কর',
    'pen down':
        'লেখনী নিম্নগামী কর',
    'pen up':
        'লেখনী ঊর্ধ্বগামী কর',
    'set pen color to %clr':
        'লেখনীর রঙ %clr নির্ধারণ কর',
    'change pen color by %n':
        'লেখনীর রঙ %n পরিবর্তন কর',
    'set pen color to %n':
        'লেখনীর রঙ %n নির্ধারণ কর',
    'change pen shade by %n':
        'লেখনীর ছায়া %n পরিবর্তন কর',
    'set pen shade to %n':
        'লেখনীর ছায়া %n নির্ধারণ কর',
    'change pen size by %n':
        'লেখনীর আকার পরিবর্তন কর %n',
    'set pen size to %n':
        'লেখনীর আকার নির্ধারণ কর %n',
    'stamp':
        'সীলমোহর',
        
    // control:
    'when %greenflag clicked':
        'যখন  %greenflag ক্লিক কর',
    'when %keyHat key pressed':
        'যখন   %keyHat ক্লিক কর',
    'when I am clicked':
        'যখন আমাকে ক্লিক কর',
    'when I receive %msgHat':
        'যখন আমি গ্রহণ করি  %msgHat',
    'broadcast %msg':
        'বার্তা সম্প্রচার কর  %msg',
    'broadcast %msg and wait':
        'বার্তা সম্প্রচার করে   %msg অপেক্ষা কর',
    'Message name':
        'বার্তা লিখ',
    'message':
        'বার্তা',
    'any message':
        'যে কোন বার্তা',
    'initialize':
        'আরম্ভ কর',
    'push':
        'পুশ',
    'pull':
        'পুল',
        
    'wait %n secs':
        'অপেক্ষা কর   %n সেকেণড',
    'wait until %b':
        'অপেক্ষা কর  %b যতক্ষণ না',
    'forever %loop':
        'অনন্তকাল কর %loop',
    'repeat %n %loop':
        'পুনরাবৃত্তি কর  %n বার  %loop ',
    'repeat until %b %loop':
        'পুনরায় কর যতক্ষণ না  %b %loop',
    'if %b %c':
        'যদি হয়  %b %c',
    'if %b %c else %c':
        'যদি হয়  %b %c অন্যথায়  %c',
    'report %s':
        'প্রতিবেদন %s',
    'stop block':
        'ব্লক বন্ধ কর',
    'stop script':
        'বর্ণনা বন্ধ কর',
    'stop all %stop':
        'সব বন্ধ কর  %stop',
    'pause all %pause':
        'সব স্থগিত কর %pause',
    'run %cmdRing %inputs':
        'চালনা কর %cmdRing %inputs',
    'launch %cmdRing %inputs':
        'শুরু কর %cmdRing %inputs',
    'call %repRing %inputs':
        'আহ্বান কর %repRing %inputs',
    'run %cmdRing w/continuation':
        'চালনা কর  %cmdRing ধারাবাহিকতার সঙ্গে',
    'call %cmdRing w/continuation':
        'আহ্বান কর  %cmdRing ধারাবাহিকতার সঙ্গে',
    'warp %c':
        'একত্রিত কর  %c',
    'when I start as a clone':
        'যখন আমি একটি ক্লোন হিসেবে শুরু করি',
    'create a clone of %cln':
        '%cln একটি ক্লোন এর সৃষ্টি কর',
    'myself':
        'স্বীয়',
    'delete this clone':
        'এই ক্লোনটি মুছে ফেল',

    // sensing:
    'touching %col ?':
        'স্পর্শ করেছে কিনা %col ?',
    'touching %clr ?':
        'স্পর্শ রঙ  %clr কিনা?',
    'color %clr is touching %clr ?':
        '%clr রঙ  %clr রঙ গামী কিনা?',
    'ask %s and wait':
        '%s জিজ্ঞাসা করে অপেক্ষা কর',
    'what\'s your name?':
        'তোমার নাম কি?',
    'answer':
        'জবাব',
    'mouse x':
        'মাউস x',
    'mouse y':
        'মাউস y',
    'mouse down?':
        'মাউস বোতাম চাপা কিনা?',
    'key %key pressed?':
        'কোন কী %key চাপা কিনা?',
    'distance to %dst':
        'পর্যন্ত দূরত্ব %dst',
    'reset timer':
        'সময় নির্ণায়ক পুন:স্থাপন কর',
    'timer':
        'সময় নির্ণায়ক',
    '%att of %spr':
        '%att লক্ষণ  %spr এর',    
    'http:// %s':
        'http:// %s',
    'turbo mode?':
        'টার্বো মোড কিনা?',
     'set turbo mode to %b':
        'টার্বো মোডকে  %b নির্ধারণ কর',

    'filtered for %clr':
        'ফিল্টার করা  হয়েছে  %clr এর জন্য',
    'stack size':
        'স্ট্যাকের আকার',
    'frames':
        'ফ্রেমসমূহ',

    // operators:
    '%n mod %n':
        '%n ভাগ  %n এর অবশিষ্ট',
    'round %n':
        '%n এর নিকটতম পূর্ণসংখ্যা',
    '%fun of %n':
        '%fun নির্ণয় কর  %n',
    'pick random %n to %n':
        'যে কোনো একটি সংখ্যা  %n থেকে   %n পর্যন্ত',
    '%b and %b':
        '%b এবং %b',
    '%b or %b':
        '%b অথবা  %b',
    'not %b':
        'না %b',
    'true':
        'সত্য',
    'false':
        'মিথ্যা',
    'join %words':
        'সংযুক্ত কর  %words',
    'hello':
        'হ্যালো',
    'world':
        'পৃথিবী',
    'letter %idx of %s':
        '%idx -তম বর্ণ    %s এর',
    'length of %s':
        '%s এর বর্ণদৈর্ঘ্য ',
    'unicode of %s':
        '%s বর্ণের ইউনিকোড',
    'unicode %n as letter':
        'ইউনিকোড %n বর্ণ হিসেবে',
    'is %s a %typ ?':
        '%s এই  প্রকারের কিনা %typ ?',
    'is %s identical to %s ?':
        '%s এর সমতুল্য  %s কিনা?',

    'type of %s':
        '%s এর প্রকারে',

    // variables:
    'Make a variable':
        'একটি   চলক তৈরী কর',
    'Variable name':
        'চলকের নাম',
    'Delete a variable':
        'চলকটি মুছে ফেল',
    'set %var to %s':
        '%var চলকটি মান %s নির্ধারণ কর',
    'change %var by %n':
        '%var চলকটি মান  %n দ্বারা পরিবর্তন কর',
    'show variable %var':
        '%var চলকটি প্রদর্শন কর',
    'hide variable %var':
        '%var চলকটি গোপন কর',
    'script variables %scriptVars':
        'স্ক্রিপ্ট চলকসমূহ  %scriptVars',

    'list %exp':
    	'তালিকা %exp',
    '%s in front of %l':
    	'%s %l তালিকার সামনে',
    'item %idx of %l':
    	'%idx উপাদানটি  %l তালিকার',
    'all but first of %l':
    	'%l তালিকার সব কিন্তু প্রথমটি বাদে',
    'length of %l':
     	'%l তালিকার দৈর্ঘ্য',
    '%l contains %s':
    	'%l তালিকা  %s উপাদানটি ধারণ করে',
    'thing':
    	'বিষয়',
    'add %s to %l':
    	'%s কে  %l তে সংযুক্ত কর',
    'delete %ida of %l':
    	'%ida কে  %l থেকে মুছে ফেল',
    'insert %s at %idx of %l':
     	'%s কে  %idx স্থানে  %l তালিকায় সন্নিবেশিত কর',
     'replace item %idx of %l with %s':
    	'%idx স্থানের  %l তালিকার উপাদানটি  %s দ্বারা প্রতিস্থাপন কর',

    // other
    'Make a block':
        'একটি ব্লক তৈরী কর',

    // menus
    // snap menu
    'About...':
        'Snap! সম্পর্কিত তথ্য...',
     'Reference manual':
        'Snap! রেফারেন্স ম্যানুয়াল',
    'Snap! website':
        'Snap! ওয়েবসাইট',
    'Download source':
        'Snap! সোর্সকোড',
    'Switch back to user mode':
        'ইউজার মোডে ফিরে যাও',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'দীর্ঘ-মরফিক প্রসঙ্গ তালিকা এবংপরিদর্শক নিস্ক্রিয় করে একটি ব্যবহারকারী বান্ধব তালিকা দেখাও',
    'Switch to dev mode':
        'ডেভেলপার মোডে ফিরে যাও',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'মরফিক প্রসঙ্গ তালিকা এবংপরিদর্শক সক্রিয় কর,তবে এটি ব্যবহারকারী বান্ধব নহে!',

    // project menu
    'Project notes...':
        'প্রকল্প সম্পর্কিত মন্তব্য...',
    'New':
        'নতুন প্রকল্প তৈরী কর',
    'Open...':
        'সংরক্ষিত প্রকল্প খোল...',
    'Save':
        'প্রকল্পটি সংরক্ষণ কর',
    'Save As...':
        'প্রকল্পটির নামান্তর কর...',
    'Import...':
        'প্রকল্প ইম্পোর্ট কর...',
    'file menu import hint':
        'XMLফাইল হিসেবে সংরক্ষিত কোন প্রকল্প ইম্পোর্ট কর',
    'Export project as plain text...':
        'প্রকল্পটি প্লেইন টেক্সট হিসাবে এক্সপোর্ট কর ...',
    'Export project...':
        'প্রকল্পটি এক্সপোর্ট কর...',
    'show project data as XML\nin a new browser window':
        'প্রকল্প উপাত্ত একটি নতুন ব্রাউজার উইন্ডোতে XMLফাইল হিসেবে প্রদর্শন কর',
    'Export blocks...':
        'ব্লকসমূহ এক্সপোর্ট কর...',
    'show global custom block definitions as XML\nin a new browser window':
        'সার্বজনীন কাস্টম ব্লক সংজ্ঞার্থ একটি নতুন ব্রাউজার উইন্ডোতে XMLফাইল হিসেবে প্রদর্শন কর',
    'Import tools':
        'যন্ত্রপাতি ইম্পোর্ট কর',
     'Libraries...':
        'লাইব্রেরি লোড কর',
     'Costumes...':
        'পরিচ্ছদ লোড কর',
     'Sounds...':
        'শব্দের ফাইল লোড কর',
    'load the official library of\npowerful blocks':
        'শক্তিশালী ব্লকের অফিসিয়াল লাইব্রেরি লোড কর',

    // cloud menu
    'Login...':
        'ক্লাউড লগ ইন...',
    'Signup...':
        'ক্লাউড সাইন আপ...',
    'Reset Password...':
        'পাসওয়ার্ড পরিবর্তন কর...',
            
        
    // settings menu
    'Language...':
        'ভাষা পরিবর্তন কর...',
    'Zoom blocks...':
        'ব্লকসমূহ জুম্ কর...',
    'Stage size...':
        'দৃশ্যস্থলের আকার পরিবর্তন কর...',
    'Blurred shadows':
        'ঝাপসা ছায়া',
    'uncheck to use solid drop\nshadows and highlights':
        'নিরেট ড্রপ ছায়া এবং হাইলাইট ব্যবহার আনচেক কর',
    'check to use blurred drop\nshadows and highlights':
        'ঝাপসা ছায়া এবং হাইলাইট ব্যবহার চেক কর',
    'Zebra coloring':
        'জেব্রা চেহারা',
    'check to enable alternating\ncolors for nested blocks':
        'নেস্টেড ব্লকের পরিবর্তিত রঙ সক্রিয় করার জন্য চেক কর',
    'uncheck to disable alternating\ncolors for nested block':
        'নেস্টেড ব্লকের পরিবর্তিত রঙ নিস্ক্রিয় করার জন্য আনচেক কর',
    'Dynamic input labels':
        'গতিশীল  ইনপুট লেবেল',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'ভারিয়াদিক  ইনপুট এর গতিশীল লেবেল নিস্ক্রিয় করার জন্য আনচেক কর',
    'check to enable dynamic\nlabels for variadic inputs':
        'ভারিয়াদিক  ইনপুট এর গতিশীল লেবেল সক্রিয় করার জন্য চেক কর',
    'Prefer empty slot drops':
        'খালি স্লট ড্রপ পছন্দ কর',
    'settings menu prefer empty slots hint':
        'খালি স্লট মেনু স্থাপন করার সাহায্যপূর্ণ ইঙ্গিত',
    'uncheck to allow dropped\nreporters to kick out others':
        'ঝরে পরা রিপোর্টারসমূহ অন্যদের বের করে দেওয়ার জন্য আনচেক কর',
    'Long form input dialog':
        'দীর্ঘ আকারের ডায়লগ ইনপুট',
    'Plain prototype labels':
        'সাধারণ প্রোটোটাইপ লেবেল',
            
    'check to always show slot\ntypes in the input dialog':
        'সর্বদা ইনপুট ডায়লগে স্লট এর ধরন দেখানোর জন্য চেক কর',
    'uncheck to use the input\ndialog in short form':
        'সংক্ষিপ্ত আকারের ইনপুট ডায়লগ ব্যবহারের জন্য আনচেক কর',
    'Virtual keyboard':
        'ভার্চুয়াল কিবোর্ড',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'মোবাইল ডিভাইসে ভার্চুয়াল কিবোর্ড সহায়তা নিস্ক্রিয় করার জন্য চেক কর',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'মোবাইল ডিভাইসে ভার্চুয়াল কিবোর্ড সহায়তা সক্রিয় করার জন্য চেক কর',
    'Input sliders':
        'ইনপুট স্লাইডার',
    'uncheck to disable\ninput sliders for\nentry fields':
        'এন্ট্রি ফিল্ডে ইনপুট স্লাইডার নিস্ক্রিয় করার জন্য আনচেক কর',
    'check to enable\ninput sliders for\nentry fields':
        'এন্ট্রি ফিল্ডে ইনপুট স্লাইডার সক্রিয় করার জন্য চেক কর',
    'Clicking sound':
        'ক্লিক শব্দ',
    'Turbo mode':
        'টার্বো মোড',
    'Flat design':
        'ফ্লাট ডিজাইন',
    'uncheck to turn\nblock clicking\nsound off':
        'ক্লিক শব্দ বন্ধ করার জন্য আনচেক কর',
    'check to turn\nblock clicking\nsound on':
        'ক্লিক শব্দ চালু করার জন্য চেক কর',
    'Animations':
        'প্রাণবন্ততা',
    'uncheck to disable\nIDE animations':
        'IDE প্রাণবন্ততা বন্ধ করার জন্য আনচেক কর',
    'check to enable\nIDE animations':
        'IDE প্রাণবন্ততা চালু করার জন্য চেক কর',
    'Thread safe scripts':
        'নির্বিঘ্ন বর্ণনা যোগসূত্র',
    'uncheck to allow\nscript reentrancy':
        'বর্ণনা পুনপ্রবেশ অনুমোদন করার জন্য আনচেক কর',
    'check to disallow\nscript reentrancy':
        'বর্ণনা পুনপ্রবেশ অনুমোদন না  করার জন্য চেক কর',
    'Prefer smooth animations':
       'মসৃণ অ্যানিমেশন পছন্দ কর',
    'Flat line ends':
        'ফ্লাট লাইনের সমাপ্তি',
    'Codification support':
        'সারসংগ্রহ সমর্থন',   
        
    // inputs
    'with inputs':
        'ইনপুট দ্বারা',
    'input names:':
        'ইনপুট নাম:',
    'Input Names:':
        'ইনপুট নাম:',
    'input list:':
        'ইনপুট তালিকা:',

    // context menus:
    'help':
        'সাহায্য কর',

    // blocks:
    'help...':
        'সাহায্য কর...',
    'relabel...':
        'নামান্তর কর...',
    'duplicate':
        'এটির প্রতিলিপি তৈরী কর',
    'make a copy\nand pick it up':
        'এটি কপি কর এবং  নির্বাচন কর',
    'only duplicate this block':
        'শুধুমাত্র এই ব্লকের প্রতিলিপি তৈরী কর',
    'delete':
        'এটি মুছে ফেল',
    'script pic...':
        'স্ক্রিপ্ট ছবি...',
    'open a new window\nwith a picture of this script':
        'এই স্ক্রিপ্টর ছবি দিয়ে একটা নতুন উইন্ডো খোল',
    'ringify':
        'পরিবেষ্টন কর',
    'unringify':
        'পরিবেষ্টনমুক্ত করা',

    // custom blocks:
    'delete block definition...':
        'ব্লক সংজ্ঞা মুছে ফেল',
    'edit...':
        'সম্পাদন কর...',

    // sprites:
    'edit':
        'সম্পাদন কর',
    'export...':
        'প্রেরণ কর...',

    // stage:
    'show all':
        'সব প্রদর্শন কর',

    // scripting area
    'clean up':
        'পরিষ্কার-পরিচ্ছন্ন কর',
    'arrange scripts\nvertically':
        'উল্লম্বভাবে \nস্ক্রিপ্টস সুবিন্যস্ত কর',
    'add comment':
        'মন্তব্য যোগ কর',
    'make a block...':
        'একটি ব্লক তৈরী কর...',

    // costumes
    'rename':
        'নতুন নামকরণ কর',
    'export':
        'প্রেরণ কর',
    'rename costume':
        'পরিচ্ছদ নতুন নামকরণ কর',

    // sounds
    'Play sound':
        'শব্দ বাজাও',
    'Stop sound':
        'শব্দ বন্ধ কর',
    'Stop':
        'বন্ধ কর',
    'Play':
        'বাজাও',
    'rename sound':
        'শব্দ নতুন নামকরণ কর',

    // dialogs
    // buttons
    'OK':
        'ঠিক আছে',
    'Ok':
        'ঠিক আছে',
    'Cancel':
        'বাতিল কর',
    'Yes':
        'হ্যাঁ',
    'No':
        'না',
    'Open':
        'খোল',
    'Cloud':
        'ক্লাউড',
    'Browser':
        'ব্রাউজার',
    'Examples':
        'নমুনা প্রকল্প',

    // help
    'Help':
        'সাহায্য কর',

    // Project Manager
    'Untitled':
        'শিরোনামহীন',
    'Open Project':
        'সংরক্ষিত কোন প্রকল্প নির্বাচন করে খোল',
    '(empty)':
        '(খালি)',
    'Saved!':
        'সংরক্ষিত হয়েছে!',
    'Delete Project':
        'প্রকল্প মুছে ফেল',
    'Are you sure you want to delete':
        'তুমি কি মুছে দেওয়ার বিষয়ে নিশ্চিত?',
    'rename...':
        'নতুন নামকরণ কর...',

    // costume editor
    'Costume Editor':
        'পরিচ্ছদ সম্পাদনকারী',
    'click or drag crosshairs to move the rotation center':
        'ঘূর্ণন কেন্দ্র সরাতে crosshairs ক্লিক কর অথবা টেনে আন',

    // project notes
    'Project Notes':
        'প্রকল্প সম্পর্কিযে কোনত মন্তব্য',

    // new project
    'New Project':
        'নতুন প্রকল্প',
    'Replace the current project with a new one?':
        'বর্তমান প্রকল্পটি নতুন প্রকল্প দ্বারা প্রতিস্থাপন করতে চাও?',

    // save project
    'Save Project As...':
        'প্রকল্পটি নামান্তর কর...',

    // export blocks
    'Export blocks':
        'ব্লক এক্সপোর্ট কর',
    'Import blocks':
        'ব্লক ইম্পোর্ট কর',
    'this project doesn\'t have any\ncustom global blocks yet':
        'এই প্রকল্পের জন্য এখনো কোনো কাস্টম গ্লোবাল ব্লক নেই',
    'select':
        'নির্বাচন কর',
    'all':
        'সকল',
    'none':
        'কোনোটাই না',

    // variable dialog
    'for all sprites':
        'সব স্পাইটের জন্য',
    'for this sprite only':
        'শুধুমাত্র এই স্পাইটের জন্য',

    // block dialog
    'Change block':
        'ব্লক পরিবর্তন ব্লক',
    'Command':
        'আদেশ',
    'Reporter':
        'প্রতিবেদক',
    'Predicate':
        'সূত্রের বিধেয়',

    // block editor
    'Block Editor':
        'ব্লক সম্পাদনকারী',
    'Apply':
        'প্রয়োগ কর',

    // block deletion dialog
    'Delete Custom Block':
        'কাস্টম ব্লক মুছে দাও',
    'block deletion dialog text':
        'তুমি কি এই কাস্টম ব্লক এবং সংশ্লিষ্ট সকল উপাদান মুছে দেওয়ার জন্য নিশ্চিত?',

    // input dialog
    'Create input name':
        'ইনপুট নাম তৈরি কর',
    'Edit input name':
        'ইনপুট নাম সম্পাদনা কর',
    'Edit label fragment':
        'লেবেল টুকরা সম্পাদনা কর',
    'Title text':
        'শিরোনাম পাঠ্য',
    'Input name':
        'ইনপুট নাম',
    'Delete':
        'মুছে ফেল',
    'Object':
        'লক্ষ্যবস্তু',
    'Number':
        'সংখ্যা',
    'Text':
        'বর্ণ',
    'List':
        'তালিকা',
    'Any type':
        'যেকোন প্রকার',
    'Boolean (T/F)':
        'বুলিয়ান (সত্য/মিথ্যা)',
    'Command\n(inline)':
        'আদেশ \n(ইনলাইন)',
    'Command\n(C-shape)':
        'আদেশ \n(C-আকৃতি)',
    'Any\n(unevaluated)':
        'যেকোন \n(সংখ্যা অনির্ণয় করা)',
    'Boolean\n(unevaluated)':
        'বুলিয়ান \n(সংখ্যা অনির্ণয় করা)',
    'Single input.':
        'একক ইনপুট',
    'Default Value:':
        'ডিফল্ট (অনুপস্থিত)মান:',
    'Multiple inputs (value is list of inputs)':
        'একাধিক ইনপুট (মান ইনপুট তালিকা)',
    'Upvar - make internal variable visible to caller':
        'অভ্যন্তরীণ চলক আহ্বানকারীকে দৃশ্যমান কর',

    // About Snap
    'About Snap':
        'Snap! সম্পর্কিত তথ্য',
    'Back...':
        'প্রত্যাবর্তন কর...',
    'License...':
        'লাইসেন্স...',
    'Modules...':
        'মডিউল...',
    'Credits...':
        'স্বীকৃতি...',
    'Translators...':
        'ভাষান্তরিকবৃন্দ',
    'License':
        'লাইসেন্স',
    'current module versions:':
        'বর্তমান মডিউল সংস্করণ',
    'Contributors':
        'সাহায্যকারীবৃন্দ',
    'Translations':
        'ভাষান্তরসমূহ',

    // variable watchers
    'normal':
        'স্বাভাবিক',
    'large':
        'বৃহৎ',
    'slider':
        'স্লাইডার',
    'slider min...':
        'স্লাইডার সর্বনিম্ন...',
    'slider max...':
        'স্লাইডার সর্বোচ্চ...',
    'Slider minimum value':
        'স্লাইডারের সর্বনিম্ন মান',
    'Slider maximum value':
        'স্লাইডারের সর্বোচ্চ মান',

    // list watchers
    'length: ':
        'দৈর্ঘ্য: ',

    // coments
    'add comment here...':
        'এখানে মন্তব্য যোগ কর',

    // drow downs
    // directions
    '(90) right':
        '(90) ডিগ্রী ডান',
    '(-90) left':
        '(-90) ডিগ্রী বামে',
    '(0) up':
        '(0) উপরে',
    '(180) down':
        '(180) নিচে',

    // collision detection
    'mouse-pointer':
        'মাউস-পয়েন্টার',
    'edge':
        'প্রান্ত',
    'pen trails':
        'কলম ভ্রমণ',

    // costumes
    'Turtle':
        'কচ্ছপ',

    // graphical effects
    'ghost':
        'উপচ্ছায়া',

    // keys
    'space':
        'স্পেসবার',
    'up arrow':
        'আপ অ্যারো',
    'down arrow':
        'ডাউন অ্যারো',
    'right arrow':
        'রাইট অ্যারো',
    'left arrow':
        'লেফট অ্যারো',
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
        'নতুন বার্তা লিখ...',

    // math functions
    'পরমমান':
        'abs',
    'sqrt':
        'বর্গমূল',
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
        'সংখ্যা',
    'text':
        'বর্ণ',
    'Boolean':
        'বুলিয়ান',
    'list':
        'তালিকা',
    'command':
        'নির্দেশ',
    'reporter':
        'রিপোর্টার',
    'predicate':
        'সূত্রের বিধেয়',

    // list indices
    'last':
        'সর্বশেষ',
    'any':
        'যেকোনো'
};
