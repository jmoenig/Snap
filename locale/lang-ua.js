/*

    lang-ua.js

    Ukrainian translation for SNAP!

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

SnapTranslator.dict.ua = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    ,    \u00c4, \u00e4

,    \u00d6, \u00f6
    ,    \u00dc, \u00fc
    §      \u00df
*/

    // translations meta information
    'language_name':
        'Українська', // the name as it should appear in the language menu
    'language_translator':
        'Serhiy Kryzhanovsky', // your name for the Translators tab
    'translator_e-mail':
        'kseryj@gmail.com', // optional
    'last_changed':
        '2018-10-14', // this, too, will appear in the Translators tab

    // GUI
    // control bar:
    'untitled':
        'Без назви',
    'development mode':
        'Версія в розробці',

    // categories:
    'Motion':
        'Рух',
    'Looks':
        'Вигляд',
    'Sound':
        'Звук',
    'Pen':
        'Олівець',
    'Control':
        'Керування',
    'Sensing':
        'Датчики',
    'Operators':
        'Оператори',
    'Variables':
        'Величини',
    'Lists':
        'Списки',
    'Other':
        'Інше',

    // editor:
    'draggable':
        'рухомий',

    // tabs:
    'Scripts':
        'Скрипти',
    'Costumes':
        'Образи',
    'Backgrounds':
        'Фони',
    'Sounds':
        'Звуки',

    // names:
    'Sprite':
        'Спрайт',
    'Stage':
        'Сцена',

    // rotation styles:
    'don\'t rotate':
        'без обертання',
    'can rotate':
        'з обертанням',
    'only face left/right':
        'обертання ліво/право',

    // new sprite button:
    'add a new sprite':
        'Додати новый спрайт',

    // tab help
    'costumes tab help':
        'Перенесіть образ спрайту з ПК',
    'import a sound from your computer\nby dragging it into here':
        'Перенесіть звуковий файл з вашого ПК',

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
        'Обрана сцена:\nвідсутні блоки руху',

    'move %n steps':
        'перемістити на %n кроків',
    'turn %clockwise %n degrees':
        'поворот %clockwise на %n градусів',
    'turn %counterclockwise %n degrees':
        'поворот %counterclockwise на %n градусів',
    'point in direction %dir':
        'повернути у напрямку %dir',
    'point towards %dst':
        'слідувати за %dst',
    'go to x: %n y: %n':
        'перемістити в x %n y %n',
    'go to %dst':
        'перемістити в  %dst',
    'glide %n secs to x: %n y: %n':
        'ковзати %n сек до x %n y %n',
    'change x by %n':
        'змінити х на %n',
    'set x to %n':
        'задати значення х %n',
    'change y by %n':
        'змінити y на %n',
    'set y to %n':
        'задати значення y %n',
    'if on edge, bounce':
        'якщо на межі, відбити',
    'x position':
        'значення x',
    'y position':
        'значення y',
    'direction':
        'напрямок',

    // looks:
    'switch to costume %cst':
        'змінити образ на %cst',
    'next costume':
        'наступний образ',
    'costume #':
        'образ №',
    'say %s for %n secs':
        'говорити %s %n сек',
    'say %s':
        'говорити %s',
    'think %s for %n secs':
        'подумати %s  %n сек',
    'think %s':
        'подумати %s',
    'Hello!':
        'Привіт!',
    'Hmm...':
        'Хмм...',
    'change %eff effect by %n':
        'змінити ефект %eff на %n',
    'set %eff effect to %n':
        'встановити ефектт %eff в %n',
    'clear graphic effects':
        'очистити графічні ефекти',
    'change size by %n':
        'змінити розмір на %n %',
    'set size to %n %':
        'встановити розмір в %n %',
    'size':
        'розмір',
    'show':
        'показати',
    'hide':
        'сховати',
    'go to front':
        'стати попереду всіх',
    'go back %n layers':
        'стати позаду %n рівнів',

    'development mode \ndebugging primitives:':
        'Режим розробки \n налагодження примітивів:',
    'console log %mult%s':
        'консоль-реєстрація %mult%',
    'alert %mult%s':
        'Попередження %mult%',

    // sound:
    'play sound %snd':
        'Грати звук %snd',
    'play sound %snd until done':
        'грати звук %snd до завершення',
    'stop all sounds':
        'зупинити всі звуки',
    'rest for %n beats':
        'пауза %n тактів',
    'play note %note for %n beats':
        'грати ноту %note %n тактів',
    'change tempo by %n':
        'змінити темп на %n',
    'set tempo to %n bpm':
        'встановити темп в %n уд/хв',
    'set instrument to %inst':
        'задати інструмент %inst',
    'tempo':
        'темп',
    'sine':
        'синус (sine)',
    'square':
        'квадрат (square)',
    'sawtooth':
        'пила (sawtooth)',
    'triangle':
        'трикутник (triangle)',
    '(1) sine':
        '(1) синус (sine)',
    '(2) square':
        '(2) квадрат (square)',
    '(3) sawtooth':
        '(3) пила (sawtooth)',
    '(4) triangle':
        '(4) трикутник (triangle)',

    // pen:
    'clear':
        'очистити',
    'pen down':
        'опустити олівець',
    'pen up':
        'підняти олівець',
    'set pen color to %clr':
        'колір олівця %clr',
    'change pen color by %n':
        'змінити колір олівця на %n',
    'set pen color to %n':
        'задати колір олівця %n',
    'change pen shade by %n':
        'змінити яскравість олівця на %n',
    'set pen shade to %n':
        'задати яскравість олівця %n',
    'change pen size by %n':
        'змінити розмір олівця на %n',
    'set pen size to %n':
        'задати розмір олівця %n',
    'stamp':
        'штамп',
    'fill':
        'заливка',

    // control:
    'when %greenflag clicked':
        'коли натиснуто %greenflag',
    'when %keyHat key pressed':
        'коли натиснуто клавішу %keyHat',
    'when I am %interaction':
        'коли мене %interaction',
    'clicked':
        'клікнуть',
    'pressed':
        'натиснуть',
    'dropped':
        'кинуть',
    'mouse-entered':
        'торкнеться курсор',
    'mouse-departed':
        'залишить курсор',
    'scrolled-down':
    	'прокручування вниз',
    'scrolled-up':
        'прокручування ввгору',
    'stopped':
        'зупинка',
    'when %b':
        'коли %b',
    'when I receive %msgHat':
        'коли я отримаю %msgHat',
    'broadcast %msg':
        'надіслати %msg всім',
    'broadcast %msg and wait':
        'надіслати %msg всім і чекати',
    'Message name':
        'назва повідомлення',
    'message':
        'повідомлення',
    'any message':
        'будь-яке повідомлення',
    'wait %n secs':
        'чекати %n сек.',
    'wait until %b':
        'чекати до %b',
    'forever %loop':
        'завжди %loop',
    'repeat %n %loop':
        'повторити %n %loop',
    'repeat until %b %loop':
        'повторити поки не %b %loop',
    'if %b %c':
        'якщо %b %c',
    'if %b %c else %c':
        'якщо %b то %c інакше %c',
    'report %s':
        'результат %s',
    'stop %stopChoices':
        'зупинити %stopChoices',
    'all':
        'все',
    'this script':
        'цей скрипт',
    'this block':
        'цей блок',
    'stop %stopOthersChoices':
        'стоп %stopOthersChoices',
    'all but this script':
        'всіх, окрім мене',
    'other scripts in sprite':
        'всі інші мої скрипти',
    'run %cmdRing %inputs':
        'виконати %cmdRing %inputs',
    'launch %cmdRing %inputs':
        'запустити %cmdRing %inputs',
    'call %repRing %inputs':
        'викликати %repRing %inputs',
    'run %cmdRing w/continuation':
        'виконати %cmdRing з продовженням',
    'call %cmdRing w/continuation':
        'викликати %cmdRing з продовженням',
    'tell %spr to %cmdRing %inputs':
        'передать %spr команды %cmdRing %inputs',
    'ask %spr for %repRing %inputs':
        'запросить у %spr информацию %cmdRing %inputs',
    'warp %c':
        'відразу %c',
    'when I start as a clone':
        'Коли я починаю як клон',
    'create a clone of %cln':
        'клонувати %cln',
    'a new clone of %cln':
        'новий клон %cln',
    'myself':
        'з мене',
    'delete this clone':
        'видалити клон',
    'pause all %pause':
        'пауза для всіх %pause',

    // sensing:
    'touching %col ?':
        'доторкається %col ?',
    'touching %clr ?':
        'доторкається %clr ?',
    'color %clr is touching %clr ?':
        'колір %clr торкається %clr ?',
    'ask %s and wait':
        'запитати %s і чекати',
    'what\'s your name?':
        'Як твоє імʼя?',
    'answer':
        'відповідь',
    'mouse x':
        'мишка x',
    'mouse y':
        'мишка y',
    'mouse down?':
        'мишку натиснуто?',
    'key %key pressed?':
        'клавішу %key натиснуто?',
    'distance to %dst':
        'відстань до %dst',
     '%rel to %dst':
        '%rel до %dst',
    'distance':
    	'відстань',
    'reset timer':
        'скинути таймер',
    'timer':
        'таймер',
    '%att of %spr':
        '%att у %spr',
    'my %get':
        'атрибут %get',
    'http:// %s':
        'http:// %s',
    'turbo mode?':
        'режим турбо?',
    'set turbo mode to %b':
        'встановити турбо-режим %b',

    'filtered for %clr':
        'фільтрація для %clr',
    'stack size':
        'размір стека',
    'frames':
        'рамки',

    // operators:
    '%n mod %n':
        '%n остача від ділення %n',
    'round %n':
        'округлити %n',
    '%fun of %n':
        '%fun %n',
    'pick random %n to %n':
        'випадкове значення від %n до %n',
    '%b and %b':
        '%b та %b',
    '%b or %b':
        '%b або %b',
    'not %b':
        'не %b',
    'true':
        'true',
    'false':
        'false',
    'join %words':
        'зʼєднати %words',
    'hello':
        'Привіт',
    'world':
        'світ',
    'letter %idx of %s':
        '%idx літера слова %s',
    'length of %s':
        'довжина %s',
    'unicode of %s':
        'Unicode  літери %s',
    'unicode %n as letter':
        'літера з Unicode %n',
    'is %s a %typ ?':
        '%s це %typ ?',
    'is %s identical to %s ?':
        '%s тотожно %s ?',
    'split %s by %delim':
        'розділити %s по %delim',

    'type of %s':
        'тип %s',

    // variables:
    'Make a variable':
        'Створити змінну',
    'Variable name':
        'Імʼя змінної',
    'Delete a variable':
        'Видалити змінну',

    'set %var to %s':
        'надати %var значення %s',
    'change %var by %n':
        'змінити %var на %n',
    'show variable %var':
        'показати змінну %var',
    'hide variable %var':
        'сховати змінну %var',
    'script variables %scriptVars':
        'змінні скрипта %scriptVars',
    'inherit %shd':
        'переймати %shd',

    // lists:
    'list %exp':
        'список %exp',
    '%s in front of %l':
        '%s попереду %l',
    'item %idx of %l':
        'елемент %idx з %l',
    'all but first of %l':
        'всі окрім першого з %l',
    'length of %l':
        'довжина %l',
    '%l contains %s':
        '%l вміщує %s',
    'thing':
        'що-небудь',
    'add %s to %l':
        'додати %s до %l',
    'delete %ida of %l':
        'вилучити %ida з %l',
    'insert %s at %idx of %l':
        'встав. %s в позицію %idx в %l',
    'replace item %idx of %l with %s':
        'замінити елемент %idx в %l на %s',
    'empty? %l':
        'порожній? %l',

    // other
    'Make a block':
        'Створити новий блок',
    'find blocks...':
        'Знайти блоки...',

    // menus
    // snap menu
    'About...':
        'Про програму',
    'Snap! website':
        'Веб-сайт програми Snap!',
    'Download source':
        'Завантажити джерельний код',
    'Switch back to user mode':
        'Повернутись в режим користувача',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'вимкнути deep-Morphic\nконтекстне меню',
    'Switch to dev mode':
        'перейти в режим розробки',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'ввімкнути Morphic\nконтекстне меню',

    // project menu
    'Project notes...':
        'Проектні нотатки...',
    'New':
        'Новий проект',
    'Open...':
        'Відкрити...',
    'Save':
        'Зберегти',
    'Save As...':
        'Зберегти як...',
    'Import...':
        'Імпортувати...',
    'file menu import hint':
        'завантажити експортований проект\nабо бібліотеку блоків, маску чи звук',
    'Export project as plain text...':
        'Експортувати проект як текстовий файл...',
    'Export project...':
        'Експортувати проект...',
    'save project data as XML\nto your downloads folder':
        'зберегти і завантажити проект як XML',
    'Export summary...':
        'Експортована інформація...',
    'open a new browser browser window\n with a summary of this project':
        'відобразити проектні дані як XML\nв новом вікні браузера',
    'Export blocks...':
        'Експортувати блоки...',
    'show global custom block definitions as XML\nin a new browser window':
        'відобразити визначення глобальних користувацьких блоків як XML\nв новом вікні браузера',
    'Unused blocks...':
        'Невикористовувані блоки...',
    'find unused global custom blocks\nand remove their definitions':
        'пошук і видалення невикористовуваних блоків',
    'Import tools':
        'Імпортувати сервісні засоби',
    'load the official library of\npowerful blocks':
        'завантажити службову бібліотеку блоків',
    'Backgrounds...':
        'Тло...',
    'Libraries...':
        'Бібліотеки...',
    'Select categories of additional blocks to add to this project.':
        'обрати додаткові бібліотеки блоків\nдля добавання в проект',
    'Select a costume from the media library':
        'Додати образ з бібліотеки',
    'Select a sound from the media library':
        'Добдати звук з бібліотеки',

    // settings menu
    'Language...':
        'Мова...',
    'Zoom blocks...':
       'Збільшити розмір блоків...',
    'Stage size...':
        'Розмір сцени...',
    'Retina display support':
        'Підтримка Retina display',
    'uncheck for lower resolution,\nsaves computing resources':
        'вимкніть для зменшення роздільної здатності\nзменшує навантаження на ресурси ПК',
    'check for higher resolution,\nuses more computing resources':
        'увімкніть, для збільшення роздільної здатності\nзбільшує навантаження на ресурси ПК',
    'Stage size':
        'Розмір сцени',
    'Stage width':
        'Ширина сцени',
    'Stage height':
        'Висота сцени',
    'Blurred shadows':
        'Контрастність тіні',
    'uncheck to use solid drop\nshadows and highlights':
        'вимкніть для використання суцільних\nтіней та освітлення',
    'check to use blurred drop\nshadows and highlights':
        'увімкніть для використання розмитих\nтіней та освітлення',
    'Zebra coloring':
        'Використання альтернативних кольорів',
    'check to enable alternating\ncolors for nested blocks':
        'увімкніть, щоб для використання\nкольорів для вкладених блоків',
    'uncheck to disable alternating\ncolors for nested block':
        'вимкніть, для відміни використання\nкольорів для вкладених блоків',
    'Dynamic input labels':
        'Використання динамічних позначок',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'вимкніть щоб не використовувати динамічні позначення\nпри введенні зі змінним числом аргументів',
    'check to enable dynamic\nlabels for variadic inputs':
        'увімкніть,для використання динамічних позначень\nпри введенні зі змінним числом аргументів',
    'Prefer empty slot drops':
        'Використання порожніх комірок введення',
    'settings menu prefer empty slots hint':
        'увімкніть, щоб генерувати значення\nлише в порожніх клітинках',
    'uncheck to allow dropped\nreporters to kick out others':
        'вимкніть, щоб мати змогу генерувати значення\nв зайнятих комірках',
    'Long form input dialog':
        'Розширена форма діалогу введення',
    'check to always show slot\ntypes in the input dialog':
        'увімкніть,щоб вказати тип комірок\nв діалозі введення',
    'uncheck to use the input\ndialog in short form':
        'вимкніть, для використання короткої форми\nдіалогу введення',
    'Virtual keyboard':
        'Віртуальная клавіатура',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'вимкніть, щоб не використовувати віртуальну клавіатуру\nдля мобільних пристоїв',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'увімкніть, для використання віртуальної клавіатури\nдля мобільних пристоїв',
    'Input sliders':
        'Використання слайдерів',
    'uncheck to disable\ninput sliders for\nentry fields':
        'вимкніть, щоб не використовувати слайдери\nпри заповненні полів введення',
    'check to enable\ninput sliders for\nentry fields':
        'увімкніть, щоб використати слайдери\nпри заповненні полів введеня',
    'Clicking sound':
        'Звук кліку',
    'uncheck to turn\nblock clicking\nsound off':
        'вимкніть, щоб відключити звук\nкліку на блок',
    'check to turn\nblock clicking\nsound on':
        'увімкніть,щоб використовувати звук\nкліку блок',
    'Animations':
        'Aнимація',
    'uncheck to disable\nIDE animations':
        'вимкніть, щоб не використовувати\nIDE aнимацію',
    'check to enable\nIDE animations':
        'увімкніть, для використання\nIDE aнимації',
    'Turbo mode':
        'Режим Турбо',
    'check to prioritize\nscript execution':
        'увімкніть, для прискорення виконання скрипта',
    'uncheck to run scripts\nat normal speed':
        'вимкніть, для виконанная скрипта\nз нормальною швидкістю',
    'Flat design':
        'Плаский дизайн',
    'check for alternative\nGUI design':
        'увімкніть для використання\nальтернативного дизайну',
    'uncheck for default\nGUI design':
        'вимкніть для переходу до\nстандартного дизайну',
    'Nested auto-wrapping':
        'Nested auto-wrapping',
    'Keyboard Editing':
        'Редагування з клавіатури',
    'check to enable\nkeyboard editing support':
        'увімкніть, щоб отримати\nможливість програмування з клавіатури (Shift+Клик на блок)',
    'uncheck to disable\nkeyboard editing support':
        'вимкніть, щоб програмувати\nбез використання',
    'Table support':
        'Підтримка таблиць',
    'uncheck to disable\nmulti-column list views':
        'увімкніть для відображення\nсписку як таблицю',
    'check for multi-column\nlist view support':
        'вимкніть, щоб не відображати\nсписок як таблицю',
    'Table lines':
        'межі таблиць',
    'uncheck for less contrast\nmulti-column list views':
        'вимкніть, щоб зменшити контраст меж\nтаблиці у вікні',
    'check for higher contrast\ntable views':
        'увімкніть, для збільшення контрасту меж\nтаблиці у вікні',
    'Visible stepping':
        'Відображення кроків виконання',
    'check to turn on\n visible stepping (slow)':
        'увімкніть, для відображення кроків\nвиконання скрипта (повільно)',
    'uncheck to turn off\nvisible stepping':
        'вимкніть, щоб не відображати\nкроки виконання скрипта',
    'Thread safe scripts':
        'Захищенність скрипта в багатопоточном режимі',
    'uncheck to allow\nscript reentrance':
        'вимкніть, щоб дозволити\nповторний вхід в скрипт',
    'check to disallow\nscript reentrance':
        'увімкніть, щоб заборонити\nповторний вхід в скрипт',
    'Plain prototype labels':
        'Прості заголовки блоків',
    'uncheck to always show (+) symbols\nin block prototype labels':
        'вимкніть, щоб відображати (+)\nпід час редагування заголовка',
    'check to hide (+) symbols\nin block prototype labels':
        'увімкніть, щоб не відображати (+)\nпід час редагування заголовка',
    'Flat line ends':
        'Прямокутні кінці ліній',
    'uncheck for round ends of lines':
        'вимкніть, для закруглення\nкінців мальованих ліній',
    'check for flat ends of lines':
        'увімкніть, щоб не закруглювати\nкінці мальованих ліній',
    'Codification support':
        'Підтримка кодифікації блоків',
    'uncheck to disable\nblock to text mapping features':
        'вимкніть, щоб прибрати блоки\nтрансляції в текст на іншу мову програмування',
    'check for block\nto text mapping features':
        'увімкніть, щоб додати блоки\nтрансляції в текст на іншу мову програмування',
    'Inheritance support':
        'Підтримка наслідування',
    'uncheck to disable\nsprite inheritance features':
        'вимкніть, щоб відмінити\nнаслідування властивостей спрайтів',
    'check for sprite\ninheritance features':
        'увімкніть, щоб задіяти\nнаслідування властивостей спрайтів',

    // inputs
    'with inputs':
        'разом з вхідними даними',
    'input names:':
        'імена вхідних даних:',
    'Input Names:':
        'Імена Вхідних Даних:',
    'input list:':
        'вводимый список:',

    // context menus:
    'help':
        'Довідка',

    // blocks:
    'help...':
        'довідка...',
    'relabel...':
        'перепозначити...',
    'duplicate':
        'дублювати',
    'make a copy\nand pick it up':
        'копіювати\nта запамʼятати',
    'only duplicate this block':
        'дублювати лише даний блок',
    'delete':
        'видалити',
    'script pic...':
        'зображення скрипта...',
    'open a new window\nwith a picture of this script':
        'відкрити зображення скрипта\nу новому вікні',
    'ringify':
        'обвести',
    'unringify':
        'прибрати обведення',
    'find blocks':
        'знайти блоки',
    'hide primitives':
        'приховати стандартні блоки',
    'show primitives':
        'показати стандартні блоки',

    // custom blocks:
    'delete block definition...':
        'видалити визначення блока',
    'edit...':
        'редагувати...',

    // sprites:
    'edit':
        'редагувати',
    'move':
        'перемістити',
    'clone':
        'клонувати',
    'export...':
        'експорт...',
    'parent...':
        'джерело...',
    'release':
        'звільнити',
    'make temporary and\nhide in the sprite corral':
        'зробити тимчасовим\nта сховати окремий спрайт',
    'current parent':
        'джерело спрайта',
    'add a new Turtle sprite':
        'створити новий Базовий спрайт',
    'paint a new sprite':
        'малювати новий спрайт',
    'take a camera snapshot and\nimport it as a new sprite':
        'створити фото камерою\n та використати зображення як новий спрайт',
    'pivot':
        'центр обертання',
    'edit the costume\'s\nrotation center':
        'вказати центр обертання для образу',

    // stage:
    'show all':
        'показати все',
    'pic...':
        'зображення...',
    'open a new window\nwith a picture of the stage':
        'перетворити вид сцени\nна зображення',

    // scripting area
    'clean up':
        'упорядкувати',
    'arrange scripts\nvertically':
        'вертикальне розміщення\nскриптів',
    'add comment':
        'додати коментар',
    'scripts pic...':
        'перетворити скрипт на зображення...',
    'open a new window\nwith a picture of all scripts':
        'перетворити всі скрипти аркуша\nна зображення',
    'make a block...':
        'створити новий блок...',
    'use the keyboard\nto enter blocks':
        'використати клавіатуру\nдля роботи з блоками',
    'undrop':
        'відмінити',
    'undo the last\nblock drop\nin this pane':
        'відмінити останню\nдію з блоком',
    'redrop':
        'повернути',
    'redo the last undone\nblock drop\nin this pane':
        'повторити відмінену\nдію з блоком',

    // costumes
    'rename':
        'перейменувати',
    'export':
        'експорт',
    'rename costume':
        'перейменувати образ',

    // sounds
    'Play sound':
        'Відтворити звук',
    'Stop sound':
        'Зупинити звук',
    'Stop':
        'Стоп',
    'Play':
        'Відтворити',
    'rename sound':
        'перейменувати звук',

    // dialogs
    'Import library':
        'Завантаження бібліотек',
    'Table view':
        'Табличний вигляд',
    'Save project':
        'Збереження проекту',
    'Export Project As...':
        'Експортувати проект як...',
    'Cloud':
        'Хмара',
    'Browser':
        'Браузер',
    'Examples':
        'Приклади',
    
    
    // buttons
    'OK':
        'OK',
    'Ok':
        'Ok',
    'Cancel':
        'Відмінити',
    'Yes':
        'Так',
    'No':
        'Ні',
    'Open':
        'Відкрити',
    'Empty':
        'Порожньо',
    'Import':
        'Імпортувати',

    // help
    'Help':
        'Довідка',

    // Project Manager
    'Untitled':
        'Без заголовку',
    'Open Project':
        'Відкрити Проект',
    '(empty)':
        '(порожньо)',
    'Saved!':
        'Збережено!',
    'Delete Project':
        'Видалити Проект',
    'Are you sure you want to delete':
        'Ви впевнені, що бажаєте видалити?',
    'rename...':
        'перейменувати...',

    // costume editor
    'Costume Editor':
        'Редактор образів',
    'click or drag crosshairs to move the rotation center':
        'клікніть на перехрестя для переміщення центра повороту',

    // project notes
    'Project Notes':
        'Проектні нотатки',

    // new project
    'New Project':
        'Новий Проект',
    'Replace the current project with a new one?':
        'Замінити даний проект на новий?',

    // save project
    'Save Project As...':
        'Зберегти Проект Як...',

    // export blocks
    'Export blocks':
        'Експортувати блоки',
    'Import blocks':
        'Імпортувати блоки',
    'this project doesn\'t have any\ncustom global blocks yet':
        'У проекта відсутні глобальні\nкористувацькі блоки',
    'select':
        'виділити',
    'none':
        'нічого',

    // variable dialog
    'for all sprites':
        'для всіх спрайтів',
    'for this sprite only':
        'тільки для поточного спрайту',

    // block dialog
    'Change block':
        'Замінити блок',
    'Command':
        'Команда',
    'Reporter':
        'Генератор значень',
    'Predicate':
        'Предикат',

    // block editor
    'Block Editor':
        'Редактор Блоків',
    'Apply':
        'Застосувати',
    'translations...':
        'переклади',
    'block variables...':
        'змінні блоку...',
    'rename all...':
        'перейменувати все...',
    'block variables':
        'змінні блоку',
    'Block variable name':
        'Імʼя змінної блоку',
    'remove block variables...':
        'видалити змінні блоку',

    // block deletion dialog
    'Delete Custom Block':
        'Видалити Користувацький Блок',
    'block deletion dialog text':
        'Ви впевнені, що бажаєте видалити цей блок?',

    // input dialog
    'Create input name':
        'Створити імʼя вхідних даних',
    'Edit input name':
        'Редагувати імʼя вхідних даних',
    'Edit label fragment':
        'Редагувати фрагмнт позначення',
    'Title text':
        'Заголовок тексту',
    'Input name':
        'Імʼя вхідних даних',
    'Delete':
        'Видалити',
    'Object':
        'Обʼєкт',
    'Number':
        'Число',
    'Text':
        'Tекст',
    'List':
        'Список',
    'Any type':
        'Будь-якийтип',
    'Boolean (T/F)':
        'Бульовий (И/Л)',
    'Command\n(inline)':
        'Команда\n(вбудована)',
    'Command\n(C-shape)':
        'Команда\n(С-форма)',
    'Any\n(unevaluated)':
        'Будь-який\n(невизначений)',
    'Boolean\n(unevaluated)':
        'Бульовий\n(невизначений)',
    'Single input.':
        'Одноразове введення.',
    'Default Value:':
        'Значення за замовчуванням:',
    'Multiple inputs (value is list of inputs)':
        'Багаторазове ввдення (список)',
    'Upvar - make internal variable visible to caller':
        'Створити внутрішню змінну видимою ззовні',

    // About Snap
    'About Snap':
        'Про Snap',
    'Back...':
        'Повернутися...',
    'License...':
        'Ліцензія...',
    'Modules...':
        'Модулі...',
    'Credits...':
        'Співробітники...',
    'Translators...':
        'Перекладачі',
    'License':
        'Ліцензія',
    'current module versions:':
        'Komponenten-Versionen',
    'Contributors':
        'Учасники',
    'Translations':
        'Переклади',
    'Reference manual':
        'Інструкція користувача',

    // variable watchers
    'normal':
        'Стандартний',
    'large':
        'збільшений',
    'slider':
        'слайдер',
    'slider min...':
        'слайдер min...',
    'slider max...':
        'слайдер max...',
    'import...':
        'імпорт...',
    'Slider minimum value':
        'Слайдер - min значення',
    'Slider maximum value':
        'Слайдер - max значення',

    // list watchers
    'length: ':
        'довжина: ',
    'list view...':
        'відобразити як список...',
    'table view...':
        'відобразити як таблицю...',
    'open in dialog...':
        'відкрити у окремому вікні...',
    'open in another dialog...':
        'відкрити в іншому вікні...',

    // coments
    'add comment here...':
        'додати коментар сюди...',

    // drow downs
    // directions
    '(90) right':
        '(90) направо',
    '(-90) left':
        '(-90) наліво',
    '(0) up':
        '(0) ввгору',
    '(180) down':
        '(180) вниз',
     'random':
    	'випадкове значення',
     'random position':
     	'випадкова позиція',

    // collision detection
    'mouse-pointer':
        'курсор мишки',
    'edge':
        'межа',
    'pen trails':
        'лінія олівця',
    'center':
        'центр',

    // costumes
    'Turtle':
        'Вказівник',
    'Opening Costumes...':
        'Завантаження образів...',
    'pen':
        'олівець',
    'tip':
        'на кінці',
    'middle':
        'посередині',
    'Paint a new costume':
        'Намалювати новий образ',
    'Import a new costume from your webcam':
        'Створити образ із фото з веб-камери',

    // graphical effects
    'ghost':
        'прозорість',
    'color':
        'колір',
    'fisheye':
        'рибʼяче око',
    'whirl':
        'вихор',
    'pixelate':
        'пікселізація',
    'mosaic':
        'мозаїка',
    'negative':
        'негатив',
    'comic':
        'комікс',
    'confetti':
        'конфетті',
    'saturation':
        'насиченість',
    'brightness':
        'яскравість',

    // keys
    'space':
        'пропуск',
    'any key':
        'будь-яка клавіша',
    'up arrow':
        'стрілка вгору',
    'down arrow':
        'стрілка вниз',
    'right arrow':
        'стрілка вправо',
    'left arrow':
        'стрілка вліво',
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
        'новий...',

    // math functions
    'abs':
        'по модулю',
    'ceiling':
        'округлення до більшого',
    'floor':
        'округлення до меншого',
    'sqrt':
        'квадратний корінь',
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
        'літерам',
    'whitespace':
        'пробілом',
    'line':
        'рядкам',
    'tab':
        'табуляторам',
    'cr':
        'кінцям рядків',
        
    // data types
    'number':
        'число',
    'text':
        'текст',
    'Boolean':
        'бульовий',
    'list':
        'список',
    'command':
        'команда',
    'reporter':
        'генератор значень',
    'predicate':
        'предікат',
    'sprite':
        'спрайт',
    'costume':
        'образ',
    'sound':
        'звук',

    // list indices
    'last':
        'останній',
    'any':
        'будь-який',
    'now connected':
        'зʼєднання встановлено',
    'undo':
        'відмінити',
        
    // attributes
    'neighbors':
        'сусіди',
    'self':
        'я',
    'other sprites':
        'інші спрайти',
    'parts':
        'частини',
    'anchor':
        'якір',
    'parent':
        'джерело',
    'children':
        'нащадок',
    'clones':
        'клони',
    'other clones':
        'інші клони',
    'dangling?':
        'підвішений?',
    'rotation x':
        'зміщення за x',
    'rotation y':
        'зміщення за y',
    'center x':
        'x центр спрайту',
    'center y':
        'y центр спрайту',
    'name':
        'Імʼя',
    'stage':
        'сцена',
    'costumes':
        'образи',
    'sounds':
        'звуки',

    //Paint editor
    'Paint Editor':
        'Графічний редактор',
    'flip \u2194':
        'віддзеркалити \u2194',
    'flip \u2195':
        'віддзеркалити \u2195',
    'grow':
        'збільшити',
    'shrink':
        'зменшити',
    'Brush size':
        'Розмір пера',
    'Constrain proportions of shapes?\n(you can also hold shift)':
        'Зберігати пропорції фігур (коло, квадрат)?\nможна використати Shift',
	'Paintbrush tool\n(free draw)':
		'пензлик (довільне малювання)',
	'Stroked Rectangle\n(shift: square)':
		'Прямокутник\n(shift: квадрат)',
	'Stroked Ellipse\n(shift: circle)':
		'Еліпс\n(shift: коло)',
	'Eraser tool':
		'Гумка',
	'Set the rotation center':
		'Встановлення центру обертання',
	'Line tool\n(shift: vertical/horizontal)':
		'Лінія\n(shift: вертикальна/горизонтальна)',
	'Filled Rectangle\n(shift: square)':
		'Зафарбований прямокутник\n(shift: квадрат)',
	'Filled Ellipse\n(shift: circle)':
		'Зафарбований еліпс\n(shift: круг)',
	'Fill a region':
		'Заливка',
	'Pipette tool\n(pick a color anywhere)':
		'Вибір кольору\n(взяти колір кліком на будь-яку точку)',

    'experimental -\nunder construction':
        'експериментальна можливість -\nв розробці',
    'Camera':
        'Камера',
    'Camera not supported':
        'Камера не підтримується',
    'Please make sure your web browser is up to date\nand your camera is properly configured. \n\nSome browsers also require you to access Snap!\nthrough HTTPS to use the camera.\n\nPlase replace the "http://" part of the address\nin your browser by "https://" and try again.':
        'Будь ласка перевірте оновлення вашого браузера до останньої версії\nі чи Ваша камера правильно сконфігурована. \n\nдеякі браузерипотребують протокола HTTPS\nдля достума Snap до камери.\n\nСпробуйте змінити "http://" в рядку адреси\nВашого браузера на "https://" і спробуйте ще раз.',
    'current %dates':
        'зараз %dates',
    'year':
        'рік',
    'month':
        'місяць',
    'date':
        'день',
    'day of week':
        'день тижня',
    'hour':
        'годин',
    'minute':
        'хвилин',
    'second':
        'секунд',
    'time in milliseconds':
        'час в мілісекундах',
    'costume name':
        'Імʼя образу'
    
};
