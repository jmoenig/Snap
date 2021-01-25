/*

    lang-ta.js

    Tamil translation for SNAP!

    written by Barthdry and One More

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

SnapTranslator.dict.ta = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    Ä, ä   \u00c4, \u00e4
    Ö, ö   \u00d6, \u00f6
    Ü, ü   \u00dc, \u00fc
    ß      \u00df
*/

    // translations meta information
    'language_name':
        'Tamil', // the name as it should appear in the language menu
    'language_translator':
        'vinayakumar R, Barthdry', // your name for the Translators tab
    'translator_e-mail':
        'vnkmr7620@gmail.com', // optional
    'last_changed':
        '2021-01-25', // this, too, will appear in the Translators tab

    // GUI
    // control bar:
    'untitled':
        'பெயர் இல்லாதது',
    'development mode':
        'டெவோலோப்மென்ட் பயன்முறை',

    // categories:
    'Motion':
        'நகர்ச்ச',
    'Looks':
        'தோற்றம்',
    'Sound':
        'ஒல',
    'Pen':
        'பேனா',
    'Control':
        'கன்ட்ரொல்',
    'Sensing':
        'உணருதல்',
    'Operators':
        'ஆபரேட்டர்கள்',
    'Variables':
        'வேரியபில்கள்',
    'Lists':
        'பட்டியல்',
    'Other':
        'மற்றொன்று',

    // editor:
    'draggable':
        'இழுக்கக்கூடியது',

    // tabs:
    'Scripts':
        'லிபி',
    'Costumes':
        'உடைகள்',
    'Sounds':
        'ஒலஒல',

    // names:
    'Sprite':
        'ஸ்ப்ரைட்',
    'Stage':
        'மேட',

    // rotation styles:
    'don\'t rotate':
        'சுழற்றாத',
    'can rotate':
        'சுழற்ற முடியும்',
    'only face left/right':
        'வலது மற்றும் இடது முகம் மட்டுமே',

    // new sprite button:
    'add a new sprite':
        'புதிய மனிதனைச் சேர்க்கவும்',

    // tab help
    'costumes tab help':
        'மற்றொரு வலைப்பக்கத்திலிருந்து படத்தை எடுக்கவும்\n'
            + 'அல்லது கணினியிலிருந்து இங்கே கைவிடுவதன் மூலம்',
    'import a sound from your computer\nby dragging it into here':
        'இங்கே இழுப்பதன் மூலம் கணினியிலிருந்து ஒரு ஒலியை இறக்குமதி செய்க',

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
        'நிலை தேர்ந்தெடுக்கப்பட்டது. மோஷன் பிளாக்ஸ் இல்லை',

    'move %n steps':
        '%n அடிகள் நகரவும்',
    'turn %clockwise %n degrees':
        'திரும்பவும் %clockwise %n அளவு',
    'turn %counterclockwise %n degrees':
        'திரும்பவும் %counterclockwise %n அளவு',
    'point in direction %dir':
        '%dir திசையை சுட்டிக்கட்டவும்',
    'point towards %dst':
        '%dst நோக்கி சுட்டிக்கட்டவும்',
    'go to x: %n y: %n':
        'x: %n y: %n க்கு செல்லவும்',
    'go to %dst':
        '%dst க்கு செல்லவும்',
    'glide %n secs to x: %n y: %n':
        'gleite %n Sek. zu x: %n y: %n',
    'change x by %n':
        'x %n அளவு மாற்றவும்',
    'set x to %n':
        'x %n ஆக்கவும்',
    'change y by %n':
        'y %n அளவு மாற்றவும்',
    'set y to %n':
        'y %n ஆக்கவும்',
    'if on edge, bounce':
        'விளிம்பில் பவுன்ஸ்',
    'x position':
        'x இடம்',
    'y position':
        'y இடம்',
    'direction':
        'திச',

    // looks:
    'switch to costume %cst':
        '%cst உடைக்கு மாற்ற',
    'next costume':
        'அடுத்த உட',
    'costume #':
        'உட #',
    'say %s for %n secs':
        '%n விநாடிகள் %s சொல்',
    'say %s':
        '%s சொல்',
    'think %s for %n secs':
        '%n விநாடிகள் %s யோச',
    'think %s':
        '%s யோச',
    'Hello!':
        'வணக்கம்!',
    'Hmm...':
        'Hmm...',
    'change %eff effect by %n':
        '\u00e4ndere %eff -Effekt um %n',
    'set %eff effect to %n':
        'setze %eff -Effekt auf %n',
    'clear graphic effects':
        'க்ராபிக்ஸ் எபெக்ட்டை அழித்து விடு',
    'change size by %n':
        'கன அளவை %n அளவு மாற்றவும்',
    'set size to %n %':
        'கனம் %n % ஆக்கவும்',
    'size':
        'பரிமாணம்',
    'show':
        'காண்ப',
    'hide':
        'மறைக்கவும்',
    'go to front':
        'முன் செல்லவும்',
    'go back %n layers':
        '%n அடுக்குகள் பின்னால் செல்லவும்',

    'development mode \ndebugging primitives:':
        'Hackermodus \nDebugging-Bl\u00f6cke',
    'console log %mult%s':
        'schreibe in die Konsole: %mult%s',
    'alert %mult%s':
        'Pop-up: %mult%s',

    // sound:
    'play sound %snd':
        '%snd ஒலிக்கவும்',
    'play sound %snd until done':
        'நிற்க்கும் வரை %snd ஒலிக்கவும்',
    'stop all sounds':
        'எல்லா ஒலிகளையும் நிருத்த',
    'rest for %n beats':
        '%n தாள தட்டு காத்திருக்கவும்',
    'play note %n for %n beats':
        '%n ஸ்வரம் %n தாள தட்டு வாசிக்கவும்',
    'change tempo by %n':
        '%n அளவு தாளத்தை மாற்றவும்',
    'set tempo to %n bpm':
        'தாளம் %n bpm ஆக்கவும்',
    'tempo':
        'தாளம்',

    // pen:
    'clear':
        'அழ',
    'pen down':
        'பேனா கீழே',
    'pen up':
        'பேனா மேல',
    'set pen color to %clr':
        'பேனா நிரம் %clr ஆக்கவும்',
    'change pen color by %n':
        'பேனா நிறத்தை %n அளவு மாற்றவும்',
    'set pen color to %n':
        'பேனா நிரம் %n ஆக்கவும்',
    'change pen shade by %n':
        'பேனா ஷெடை %n அளவு மாற்றவும்',
    'set pen shade to %n':
        'பேனா ஷேட் %n ஆக்கவும்',
    'change pen size by %n':
        'பேனா கன அளவை %n அளவு மாற்றவும்',
    'set pen size to %n':
        'பேனா கனம் %n ஆக்கவும்',
    'stamp':
        'அச்சு',

    // control:
    'when %greenflag clicked':
        '%greenflag அழுத்தும்பொழுது',
    'when %keyHat key pressed':
        '%keyHat கீ அழுத்தும்பொழுது',
    'when I am clicked':
        'நான் சொடுக்கும் போது',
    'when I receive %msgHat':
        '%msgHat பெறுகையில்',
    'broadcast %msg':
        '%msg செலித்தி',
    'broadcast %msg and wait':
        '%msg செலித்தி காத்திருக்கவும்',
    'Message name':
        'செய்தி பெயர்',
    'message':
        'செய்தி',
    'any message':
        'எந்த செய்தியும்',
    'wait %n secs':
        '%n விநாடிகள் காத்திருக்கவும்',
    'wait until %b':
        '%b வரை காத்திருக்கவும்',
    'forever %loop':
        'எப்போதும் %loop',
    'repeat %n %loop':
        'திரும்பச்செய் %n %loop',
    'repeat until %b %loop':
        '%b %loop வரை திரும்பச்செய்',
    'if %b %c':
        '%b %c என்றால்',
    'if %b %c else %c':
        '%b என்றால் அல்லது %c',
    'report %s':
        'அறிக்கை %s',
    'stop %stopChoices':
        'நிருத்து %stopChoices',
    'all':
        'அனைத்தும்',
    'this script':
        'இந்த ச்கிரிப்ட்ட',
    'this block':
        'இது Block',
    'stop %stopOthersChoices':
        'நிறுத்து %stopOthersChoices',
    'all but this script':
        'அனைத்தும் ஆனால் இந்த ஸ்கிரிப்ட்',
    'other scripts in sprite':
        'ஸ்பிரிட்டில் பிற ஸ்கிரிப்ட்கள்',
    'pause all %pause':
        'அனைத்தையும் இடைநிறுத்துங்கள் %pause',
    'run %cmdRing %inputs':
        'f\u00fchre %cmdRing aus %inputs',
    'launch %cmdRing %inputs':
        'starte %cmdRing %inputs',
    'call %repRing %inputs':
        'rufe %repRing auf %inputs',
    'run %cmdRing w/continuation':
        'f\u00fchre %cmdRing mit Continuation aus',
    'call %cmdRing w/continuation':
        'rufe %cmdRing mit Continuation auf',
    'warp %c':
        'போரிடு %c',
    'when I start as a clone':
        'நான் குளோனைத் தொடங்கும்போது',
    'create a clone of %cln':
        'குளோன் %cln',
    'myself':
        'நானே',
    'delete this clone':
        'குளோனை நீக்கு',

    // sensing:
    'touching %col ?':
        'தொடுகிரதா %col ?',
    'touching %clr ?':
        'தொடுகிரதா %clr ?',
    'color %clr is touching %clr ?':
        '%clr கலர் %clr யை தொடுகிரதா?',
    'ask %s and wait':
        '%s காத்திருக்க சொல்',
    'what\'s your name?':
        'உங்கள் பெயர் என்ன ?',
    'answer':
        'பதில்',
    'mouse x':
        'மவுஸ் x',
    'mouse y':
        'மவுஸ் y',
    'mouse down?':
        'சுட்டி கீழே?',
    'key %key pressed?':
        '%key கீ அழுத்தி இருக்கிரதா',
    'distance to %dst':
        '%dst வரை தூரம்',
    'reset timer':
        'டைமெர் ரீசெட்',
    'timer':
        'டைமெர்',
    '%att of %spr':
        '%att von %spr',
    'http:// %s':
        'http:// %s',
    'turbo mode?':
        'turbo mode?',
    'set turbo mode to %b':
        'setze Turbomodus auf %b',

    'filtered for %clr':
        'nach %clr gefiltert',
    'stack size':
        'Stapelgr\u00f6\u00dfe',
    'frames':
        'Rahmenz\u00e4hler',

    // operators:
    '%n mod %n':
        '%n மாட் %n',
    'round %n':
        '%n gerundet',
    '%fun of %n':
        '%fun ன் %n',
    'pick random %n to %n':
        'இளஞ்சிவப்பு சீரற்ற %n to %n',
    '%b and %b':
        '%b மற்றும் %b',
    '%b or %b':
        '%b அல்லத %b',
    'not %b':
        'இல்ல %b',
    'true':
        'சர',
    'false':
        'தவறு',
    'join %words':
        'சேர்க்கவும் %words',
    'split %s by %delim':
        'trenne %s nach %delim',
    'hello':
        'வணக்கம்',
    'world':
        'உலகம்',
    'letter %idx of %s':
        '%idx வது எழுத்து , %s ன்',
    'length of %s':
        '%s ன் நீளம்',
    'unicode of %s':
        'யூனிகோட் %s',
    'unicode %n as letter':
        'யூனிகோட் %n கடிதமாக',
    'is %s a %typ ?':
        'இது %s ஒரு %typ ?',
    'is %s identical to %s ?':
        'இது %s ஒத்த %s ?',

    'type of %s':
        'வகை %s',

    // variables:
    'Make a variable':
        'வேரியபில் செய்',
    'Variable name':
        'மாறிழியின் பெயர்',
    'Script variable name':
        'ச்கிரிப்ட்ட மாறிழியின் பெயர்',
    'Delete a variable':
        'வேரியபில் அழி',

    'set %var to %s':
        '%var %n ஆக்கவும்',
    'change %var by %n':
        '%var %n அளவு மாற்றவும்',
    'show variable %var':
        '%var மாறி காண்பி',
    'hide variable %var':
        '%var மாறி மறைக்கவும்',
    'script variables %scriptVars':
        'ஸ்கிரிப்ட் மாறி %scriptVars',

    // lists:
    'list %exp':
        'பட்டியல் %exp',
    '%s in front of %l':
        '%s am Anfang von %l',
    'item %idx of %l':
        'Element %idx von %l',
    'all but first of %l':
        'alles au\u00dfer dem ersten von %l',
    'length of %l':
        'L\u00e4nge von %l',
    '%l contains %s':
        '%l enth\u00e4lt %s',
    'thing':
        'etwas',
    'add %s to %l':
        'f\u00fcge %s zu %l hinzu',
    'delete %ida of %l':
        'entferne %ida aus %l',
    'insert %s at %idx of %l':
        'f\u00fcge %s als %idx in %l ein',
    'replace item %idx of %l with %s':
        'ersetze Element %idx in %l durch %s',

    // other
    'Make a block':
        'ஒரு தொகுதி செய்யுங்கள்',

    // menus
    // snap menu
    'About...':
        'பற்றி . . . ',
    'Reference manual':
        'Handbuch lesen',
    'Snap! website':
        'Snap! website',
    'Download source':
        'மூலத்தைப் பதிவிறக்குங்கள்',
    'Switch back to user mode':
        'பயனர் பயன்முறைக்கு மாறவும்',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'verl\u00e4sst Morphic',
    'Switch to dev mode':
        'தேவ் பயன்முறைக்கு மாறவும்',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'erm\u00f6glicht Morphic Funktionen',

    // project menu
    'Project notes...':
        'திட்ட குறிப்பு ...',
    'New':
        'புதிய புதிய பின்னணி',
    'Open...':
        'திறக்க...',
    'Save':
        'சேம',
    'Save As...':
        'எனச் சேம...',
    'Import...':
        'இறக்குமதி...',
    'file menu import hint':
        'l\u00e4dt ein exportiertes Projekt,\neine Bibliothek mit '
            + 'Bl\u00f6cken\n'
            + 'ein Kost\u00fcm oder einen Klang',
    'Export project as plain text...':
        'திட்டத்தை எளிய உரையாக ஏற்றுமதி செய்க',
    'Export project...':
        'ஏற்றுமதி திட்டம்...',
    'show project data as XML\nin a new browser window':
        'zeigt das Projekt als XML\nin einem neuen Browserfenster an',
    'Export blocks...':
        'Export Blocks...',
    'show global custom block definitions as XML\nin a new browser window':
        'zeigt globale Benutzerblockdefinitionen\nals XML im Browser an',
    'Import tools':
        'Tools laden',
    'load the official library of\npowerful blocks':
        'das offizielle Modul mit\nm\u00e4chtigen Bl\u00f6cken laden',
    'Libraries...':
        'நூலகங்கள்...',
    'Import library':
        'நூலகங்கள் நூலகங்கள்',

    // cloud menu
    'Login...':
        'உள்நுழைய...',
    'Signup...':
        'பதிவுபெறுதல்...',

    // settings menu
    'Language...':
        'மொழ...',
    'Zoom blocks...':
        'Zoom blocks...',
    'Stage size...':
        'Stage size...',
    'Stage size':
        'Stage size',
    'Stage width':
        'Stage width',
    'Stage height':
        'Stage height',
    'Default':
        'Default',
    'Blurred shadows':
        'Weiche Schatten',
    'uncheck to use solid drop\nshadows and highlights':
        'abschalten f\u00fcr harte Schatten\nund Beleuchtung',
    'check to use blurred drop\nshadows and highlights':
        'einschalten f\u00fcr harte Schatten\nund Beleuchtung',
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
        'Virtual keyboard',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'uncheck to disable\nvirtual keyboard support\nfor mobile devices',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'check to enable\nvirtual keyboard support\nfor mobile devices',
    'Input sliders':
        'Input Slider',
    'uncheck to disable\ninput sliders for\nentry fields':
        'uncheck to disable\ninput sliders for\nentry fields',
    'check to enable\ninput sliders for\nentry fields':
        'check to enable\ninput sliders for\nentry fields',
    'Clicking sound':
        'Clicking sound',
    'uncheck to turn\nblock clicking\nsound off':
        'uncheck to turn\nblock clicking\nsound off',
    'check to turn\nblock clicking\nsound on':
        'check to turn\nblock clicking\nsound on',
    'Animations':
        'Animations',
    'uncheck to disable\nIDE animations':
        'uncheck to disable\nIDE animations',
    'Turbo mode':
        'Turbo mode',
    'check to prioritize\nscript execution':
        'check to prioritize\nscript execution',
    'uncheck to run scripts\nat normal speed':
        'uncheck to run scripts\nat normal speed',
    'check to enable\nIDE animations':
        'check to enable\nIDE animations',
    'Thread safe scripts':
        'Thread safe scripts',
    'uncheck to allow\nscript reentrance':
        'uncheck to allow\nscript reentrance',
    'check to disallow\nscript reentrance':
        'check to disallow\nscript reentrance',
    'Prefer smooth animations':
        'Prefer smooth animations',
    'uncheck for greater speed\nat variable frame rates':
        'uncheck for greater speed\nat variable frame rates',
    'check for smooth, predictable\nanimations across computers':
        'check for smooth, predictable\nanimations across computers',
    'Flat line ends':
        'Flat line ends',
    'check for flat ends of lines':
        'check for flat ends of lines',
    'uncheck for round ends of lines':
        'uncheck for round ends of lines',

    // inputs
    'with inputs':
        'உள்ளீட்டுடன்',
    'input names:':
        'உள்ளீட்டு பெயர்கள்:',
    'Input Names:':
        'உள்ளீட்டு பெயர்கள்:',
    'input list:':
        'உள்ளீட்டு பட்டியல்:',

    // context menus:
    'help':
        'உதவி',

    // palette:
    'hide primitives':
        'hide primitive',
    'show primitives':
        'show primitive',

    // blocks:
    'help...':
        'உதவ...',
    'relabel...':
        'Umbenennen...',
    'duplicate':
        'நகல் செய்',
    'make a copy\nand pick it up':
        'eine Kopie aufnehmen',
    'only duplicate this block':
        'nur diesen Block duplizieren',
    'delete':
        'அழ',
    'script pic...':
        'Skriptbild...',
    'open a new window\nwith a picture of this script':
        'ein neues Browserfenster mit einem\nBild dieses Skripts \u00f6ffnen',
    'ringify':
        'வளையமாக ஆக்குங்கள்',
    'unringify':
        'வளையத்திலிருந்து உடைக்க',

    // custom blocks:
    'delete block definition...':
        'Blockdefinition l\u00f6schen',
    'edit...':
        'தொகு...',

    // sprites:
    'edit':
        'திருத்த',
    'move':
        'நகர்த்து',
    'detach from':
        'இருந்து பிரிக்கவும்',
    'detach all parts':
        'எல்லாம் பிரிக்கவும்',
    'export...':
        'ஏற்றுமதி...',

    // stage:
    'show all':
        'அனைத்தையும் காட்டு',
    'pic...':
        'ஏற்றுமதி மேடை...',
    'open a new window\nwith a picture of the stage':
        'ein neues Browserfenster mit einem\nBild der B\u00fchne \u00f6ffnen',

    // scripting area
    'clean up':
        'சுத்தம் செய்',
    'arrange scripts\nvertically':
        'arrange scripts\nvertically',
    'add comment':
        'add comment',
    'undrop':
        'R\u00fcckg\u00e4ngig',
    'undo the last\nblock drop\nin this pane':
        'Setzen des letzten Blocks\nwiderrufen',
    'scripts pic...':
        'Bild aller Scripte...',
    'open a new window\nwith a picture of all scripts':
        'ein neues Browserfenster mit einem\nBild aller Skripte \u00f6ffnen',
    'make a block...':
        'Neuen Block bauen...',

    // costumes
    'rename':
        'மறுபெயரிடு',
    'export':
        'ஏற்றுமதி',
    'rename costume':
        'ஆடை மறுபெயரிடு',

    // sounds
    'Play sound':
        'ஒலியைத் தொடங்குங்கள்',
    'Stop sound':
        'ஒலியை நிறுத்துங்கள்',
    'Stop':
        'நிறுத்து',
    'Play':
        'தொடங்கு',
    'rename sound':
        'ஒலி மறுபெயரிடு',

    // dialogs
    // buttons
    'OK':
        'சரி',
    'Ok':
        'சரி',
    'Cancel':
        'கென்செல்',
    'Yes':
        'ஆம்',
    'No':
        'இல்ல',

    // help
    'Help':
        'உதவ',

    // zoom blocks
    'Zoom blocks':
        'Bl\u00f6cke vergr\u00f6\u00dfern',
    'build':
        'கட்ட',
    'your own':
        'உங்கள் சொந்தமானது',
    'blocks':
        'தொகுதி',
    'normal (1x)':
        'normal (1x)',
    'demo (1.2x)':
        'Demo (1.2x)',
    'presentation (1.4x)':
        'presentation (1.4x)',
    'big (2x)':
        'big (2x)',
    'huge (4x)':
        'huge (4x)',
    'giant (8x)':
        'giant (8x)',
    'monstrous (10x)':
        'Ultra Giant (10x)',

    // Project Manager
    'Untitled':
        'பெயரிடப்படாதது',
    'Open Project':
        'திறந்த வேலை',
    '(empty)':
        'காலியாக',
    'Saved!':
        'Saved!',
    'Delete Project':
        'Delete Project',
    'Are you sure you want to delete':
        'Are you sure you want to delete',
    'rename...':
        'மறுபெயரிடு...',

    // costume editor
    'Costume Editor':
        'ஆடை ஆசிரியர்',
    'click or drag crosshairs to move the rotation center':
        'சுழற்சி மையத்தை நகர்த்த குறுக்கு நாற்காலிகள் கிளிக் செய்யவும் அல்லது இழுக்கவும்',

    // project notes
    'Project Notes':
        'வேலை குறிப்புகள்',

    // new project
    'New Project':
        'புதிய திட்டம்',
    'Replace the current project with a new one?':
        'தற்போதைய திட்டத்தை புதியதாக மாற்றவா?',

    // save project
    'Save Project As...':
        'திட்டத்தை சேமிக்கவும்...',

    // export blocks
    'Export blocks':
        'Export blocks',
    'Import blocks':
        'Import blocks',
    'this project doesn\'t have any\ncustom global blocks yet':
        'this project doesn\'t have any\ncustom global blocks yet',
    'select':
        'தேர்ந்தெடுக்கவும்',
    'none':
        'எதுவும் இல்லை',

    // variable dialog
    'for all sprites':
        'எல்லா உருவங்களுக்கும்',
    'for this sprite only':
        'இந்த உருவங்களுக்கு',

    // block dialog
    'Change block':
        'தொகுதி மாற்ற',
    'Command':
        'Command:',
    'Reporter':
        'Reporter',
    'Predicate':
        'Predicate',

    // block editor
    'Block Editor':
        'Block Editor',
    'Apply':
        'விண்ணப்பிக்கவும்',

    // block deletion dialog
    'Delete Custom Block':
        'Delete Custom Block',
    'block deletion dialog text':
        'Soll dieser Block mit allen seinen Exemplare\n' +
            'wirklich gel\u00f6scht werden?',

    // input dialog
    'Create input name':
        'Create input name',
    'Edit input name':
        'Edit input name',
    'Edit label fragment':
        'Edit label fragment',
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

    // About Snap and contributors 
    'About Snap':
        'ஸ்னாப் பற்றி',
    'Back...':
        'பின்புறம்..',
    'License...':
        'License...',
    'Modules...':
        'Modules...',
    'Credits...':
        'Credits...',
    'Translators...':
        'Translators',
    'License':
        'License',
    'current module versions:':
        'current module versions',
    'Contributors':
        'Contributors',
    'Translations':
        'Translations',

    // variable watchers
    'normal':
        'இயல்பான',
    'large':
        'பெரியது',
    'slider':
        'ஸ்லைடர்',
    'slider min...':
        'குறைந்தபட்ச ஸ்லைடு...',
    'slider max...':
        'அதிகபட்ச ஸ்லைடு...',
    'import...':
        'இறக்குமதி...',
    'Slider minimum value':
        'குறைந்தபட்ச ஸ்லைடு',
    'Slider maximum value':
        'அதிகபட்ச ஸ்லைடு',

    // list watchers
    'length: ':
        'நீளம்: ',

    // comments
    'add comment here...':
        'add comment here',

    // drow downs
    // directions
    '(90) right':
        '(90) right',
    '(-90) left':
        '(-90) left',
    '(0) up':
        '(0) up',
    '(180) down':
        '(180) down',

    // collision detection
    'mouse-pointer':
        'mouse-pointer',
    'edge':
        'edge',
    'pen trails':
        'pen trails',

    // costumes
    'Turtle':
        'Turtle',
    'Empty':
        'Empty',

    // graphical effects
    'brightness':
        'brightness',
    'ghost':
        'ghost',
    'negative':
        'negative',
    'comic':
        'comic',
    'confetti':
        'confetti',

    // keys
    'space':
        'space',
    'up arrow':
        'up arrow',
    'down arrow':
        'down arrow',
    'right arrow':
        'right  arrow',
    'left arrow':
        'left arrow',
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
        'புதியது...',

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
        'letter',
    'whitespace':
        'whitespace',
    'line':
        'line',
    'tab':
        'tab',
    'cr':
        'cr',

    // data types
    'number':
        'number',
    'text':
        'text',
    'Boolean':
        'Boolean',
    'list':
        'list',
    'command':
        'command',
    'reporter':
        'reporter',
    'predicate':
        'predicate',

    // list indices
    'last':
        'last',
    'any':
        'any'
};
/* Tamil Language locale is completed upto 85% by 
Revision 1 and 2:- vinayakumar 40
 Revision 3 to 5 :- barthdry   45 */
