/*

    lang-ru.js

    Russian translation for SNAP!

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

SnapTranslator.dict.ru = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    ,    \u00c4, \u00e4
,    \u00d6, \u00f6
    ,    \u00dc, \u00fc
    §      \u00df
*/

    // translations meta information
    'language_name':
        'Русский', // the name as it should appear in the language menu
    'language_translator':
        'Svetlana Ptashnaya', // your name for the Translators tab
    'translator_e-mail':
        'svetlanap@berkeley.edu', // optional
    'last_changed':
        '2013-03-19', // this, too, will appear in the Translators tab

    // GUI
    // control bar:
    'untitled':
        'неозаглавленный',
    'development mode':
        'разрабатываемая версия',

    // categories:
    'Motion':
        'Движение',
    'Looks':
        'Изображение',
    'Sound':
        'Звук',
    'Pen':
        'Перо',
    'Control':
        'Управление',
    'Sensing':
        'Состояние',
    'Operators':
        'Операторы',
    'Variables':
        'Переменные',
    'Lists':
        'Списки',
    'Other':
        'Прочее',

    // editor:
    'draggable':
        'движимый',

    // tabs:
    'Scripts':
        'Скрипты',
    'Costumes':
        'Маски',
    'Sounds':
        'Звучания',

    // names:
    'Sprite':
        'Образ',
    'Stage':
        'Сцена',

    // rotation styles:
    'don\'t rotate':
        'не вращаемый',
    'can rotate':
        'вращаемый',
    'only face left/right':
        'вращаемый только слева направо',

    // new sprite button:
    'add a new sprite':
        'Добавить новый Образ',

    // tab help
    'costumes tab help':
        'импорт изображение с другого веб-сайта\nили со своего компьютера скопировав его сюда',
    'import a sound from your computer\nby dragging it into here':
        'импорт звук со своего компьютера\nскопировав его сюда',

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
        'Сцена-клавиша нажата:\nДвижение-примитивы отключены',

    'move %n steps':
        'передвинуть на %n шагов',
    'turn %clockwise %n degrees':
        'повернуть %clockwise на %n градусов',
    'turn %counterclockwise %n degrees':
        'повернуть %counterclockwise на %n градусов',
    'point in direction %dir':
        'указывать в направл. %dir',
    'point towards %dst':
        'указывать на %dst',
    'go to x: %n y: %n':
        'перейти в точку x %n y %n',
    'go to %dst':
        'перейти в точку %dst',
    'glide %n secs to x: %n y: %n':
        'скользить %n сек к x %n y %n',
    'change x by %n':
        'изменить х на %n',
    'set x to %n':
        'установить х %n',
    'change y by %n':
        'изменить y на %n',
    'set y to %n':
        'установить y %n',
    'if on edge, bounce':
        'на грани развернуться',
    'x position':
        'x позиция',
    'y position':
        'y позиция',
    'direction':
        'направление',

    // looks:
    'switch to costume %cst':
        'измен. маску на %cst',
    'next costume':
        'следующая маска',
    'costume #':
        'маска #',
    'say %s for %n secs':
        'произн. %s в теч. %n сек.',
    'say %s':
        'произнести %s',
    'think %s for %n secs':
        'думать %s в теч. %n сек.',
    'think %s':
        'думать %s',
    'Hello!':
        'Привет!',
    'Hmm...':
        'Хмм...',
    'change %eff effect by %n':
        'измен. %eff эфф. на %n',
    'set %eff effect to %n':
        'устан. %eff эфф. %n',
    'clear graphic effects':
        'аннулировать графич. эфф-ты',
    'change size by %n':
        'изменить размер на %n',
    'set size to %n %':
        'установить размер %n %',
    'size':
        'размер',
    'show':
        'показывать',
    'hide':
        'прятать',
    'go to front':
        'переместить вперед',
    'go back %n layers':
        'перемест. на %n уровня назад',

    'development mode \ndebugging primitives:':
        'Разрабатываемая версия \nотладка примитивов:',
    'console log %mult%s':
        'консоль-регистрация %mult%',
    'alert %mult%s':
        'предупреждение %mult%',

    // sound:
    'play sound %snd':
        'воспроизводить звук %snd',
    'play sound %snd until done':
        'воспроизв. звук %snd до конца',
    'stop all sounds':
        'остановить все звуки',
    'rest for %n beats':
        'пауза %n тактов',
    'play note %n for %n beats':
        'сыграть ноту %n %n тактов',
    'change tempo by %n':
        'изменить темп на %n',
    'set tempo to %n bpm':
        'устан. темп %n ударов в мин.',
    'tempo':
        'темп',

    // pen:
    'clear':
        'убрать все',
    'pen down':
        'опустить перо',
    'pen up':
        'поднять перо',
    'set pen color to %clr':
        'установить цвет пера %clr',
    'change pen color by %n':
        'изменить цвет пера на %n',
    'set pen color to %n':
        'установить цвет пера %n',
    'change pen shade by %n':
        'изменить яркость пера на %n',
    'set pen shade to %n':
        'установить яркость пера %n',
    'change pen size by %n':
        'изменить размер пера на %n',
    'set pen size to %n':
        'установить размер пера %n',
    'stamp':
        'оттиск',

    // control:
    'when %greenflag clicked':
        'когда щелкнуть на %greenflag',
    'when %keyHat key pressed':
        'когда нажать %keyHat клавишу',
    'when I am clicked':
        'когда щелкнуть на меня',
    'when I receive %msgHat':
        'когда я получу %msgHat',
    'broadcast %msg':
        'переслать %msg всем',
    'broadcast %msg and wait':
        'переслать %msg всем и ждать',
    'Message name':
        'Название сообщения',
    'wait %n secs':
        'ждать %n сек.',
    'wait until %b':
        'ждать пока %b',
    'forever %c':
        'непрерывно %c',
    'repeat %n %c':
        'повторять %n %c',
    'repeat until %b %c':
        'повторять пока %b %c',
    'if %b %c':
        'если %b %c',
    'if %b %c else %c':
        'если %b %c иначе %c',
    'report %s':
        'результат %s',
    'stop block':
        'стоп блок',
    'stop script':
        'стоп скрипт',
    'stop all %stop':
        'стоп все %stop',
    'run %cmdRing %inputs':
        'выполнять %cmdRing %inputs',
    'launch %cmdRing %inputs':
        'запустить %cmdRing %inputs',
    'call %repRing %inputs':
        'вызвать %repRing %inputs',
    'run %cmdRing w/continuation':
        'выполнять %cmdRing с продолжением',
    'call %cmdRing w/continuation':
        'вызвать %cmdRing с продолжением',
    'warp %c':
        'warp %c',

    // sensing:
    'touching %col ?':
        'касаеться %col ?',
    'touching %clr ?':
        'касаеться %clr ?',
    'color %clr is touching %clr ?':
        'цвет %clr касаеться %clr ?',
    'ask %s and wait':
        'спросить %s и ждать',
    'what\'s your name?':
        'как вас зовут?',
    'answer':
        'ответ',
    'mouse x':
        'мышка x-позиция',
    'mouse y':
        'мышка y-позиция',
    'mouse down?':
        'клавиша мышки нажата?',
    'key %key pressed?':
        'клавиша %key нажата?',
    'distance to %dst':
        'расстояние до %dst',
    'reset timer':
        'переустановить таймер',
    'timer':
        'таймер',
    'http:// %s':
        'http:// %s',

    'filtered for %clr':
        'отфильтровано для %clr',
    'stack size':
        'размер стека',
    'frames':
        'рамки',

    // operators:
    '%n mod %n':
        '%n по модулю %n',
    'round %n':
        'округлить %n',
    '%fun of %n':
        '%fun %n',
    'pick random %n to %n':
        'случайное число от %n до %n',
    '%b and %b':
        '%b и %b',
    '%b or %b':
        '%b или %b',
    'not %b':
        'не %b',
    'true':
        'истина',
    'false':
        'ложь',
    'join %words':
        'объединить %words',
    'hello':
        'привет',
    'world':
        'мир',
    'letter %n of %s':
        '%n буква слова %s',
    'length of %s':
        'длина %s',
    'unicode of %s':
        'Unicode  буквы %s',
    'unicode %n as letter':
        'буква с Unicode %n',
    'is %s a %typ ?':
        '%s это %typ ?',
    'is %s identical to %s ?':
        '%s тождественно %s ?',

    'type of %s':
        'тип %s',

    // variables:
    'Make a variable':
        'Объявить переменную',
    'Variable name':
        'Имя переменной',
    'Delete a variable':
        'Удалить переменную',

    'set %var to %s':
        'придать %var значение %s',
    'change %var by %n':
        'изменить %var на %n',
    'show variable %var':
        'показать переменную %var',
    'hide variable %var':
        'спрятать переменную %var',
    'script variables %scriptVars':
        'переменные скрипта %scriptVars',

    // lists:
    'list %exp':
        'список %exp',
    '%s in front of %l':
        '%s впереди %l',
    'item %idx of %l':
        'элемент %idx из %l',
    'all but first of %l':
        'все кроме первого из %l',
    'length of %l':
        'длина %l',
    '%l contains %s':
        '%l содержит %s',
    'thing':
        'что-либо',
    'add %s to %l':
        'добавить %s к %l',
    'delete %ida of %l':
        'удалить %ida из %l',
    'insert %s at %idx of %l':
        'встав. %s в полож. %idx в %l',
    'replace item %idx of %l with %s':
        'заменить элем. %idx в %l на %s',

    // other
    'Make a block':
        'Новый блок',

    // menus
    // snap menu
    'About...':
        'Snap!  Реквизиты',
    'Snap! website':
        'Snap! веб-сайт',
    'Download source':
        'Загрузить материалы источника',
    'Switch back to user mode':
        'Вернуться в режим пользователя',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'отключить deep-Morphic\nконтекст меню',
    'Switch to dev mode':
        'перейти в режим разрабатываемой версии',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'включить Morphic\nконтекст меню',

    // project menu
    'Project notes...':
        'Проектные Записки...',
    'New':
        'Новый проект',
    'Open...':
        'Открыть...',
    'Save':
        'Сохранить',
    'Save As...':
        'Сохранить как...',
    'Import...':
        'Импорт...',
    'file menu import hint':
        'загрузить экспортированный проект\nили библиотеку блоков, маску или звук',
    'Export project as plain text...':
        'Экспорт проект как текстовый файл...',
    'Export project...':
        'Экспорт проект...',
    'show project data as XML\nin a new browser window':
        'представить проектные данные как XML\nв новом окне браузера',
    'Export blocks...':
        'Экспорт блоки...',
    'show global custom block definitions as XML\nin a new browser window':
        'представить определения глобальных пользовательских блоков как XML\nв новом окне браузера',
    'Import tools':
        'Импорт сервисные ср-ва',
    'load the official library of\npowerful blocks':
        'загрузить служебную библиотеку блоков',

    // settings menu
    'Language...':
        'Язык...',
    'Blurred shadows':
        'Контрастность тени',
    'uncheck to use solid drop\nshadows and highlights':
        'убрать метку - использовать сплошные\nтени и подсветки',
    'check to use blurred drop\nshadows and highlights':
        'поставить метку - использовать размытые\nтени и подсветки',
    'Zebra coloring':
        'Использование альтернативных цветов',
    'check to enable alternating\ncolors for nested blocks':
        'поставить метку - разрешить использование\nперемежающихся цветов для вложенных блоков',
    'uncheck to disable alternating\ncolors for nested block':
        'убрать метку - отключить использование\nперемежающихся цветов для вложенных блоков',
    'Dynamic input labels':
        'Использование динамических обозначений',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'убрать метку - отключить использование динамических обозначений\nпри вводе с переменным числом аргументов',
    'check to enable dynamic\nlabels for variadic inputs':
        'поставить метку - разрешить использование динамических обозначений\nпри вводе с переменным числом аргументов',
    'Prefer empty slot drops':
        'Использование незанятых ячеек ввода',
    'settings menu prefer empty slots hint':
        'поставить метку - помещать генераторы значений\nтолько в незанятые ячейки ввода',
    'uncheck to allow dropped\nreporters to kick out others':
        'убрать метку - разрешить помещать генераторы значений\nв занятые ячейки ввода',
    'Long form input dialog':
        'Расширенная форма диалога ввода',
    'check to always show slot\ntypes in the input dialog':
        'поставить метку - указывать типы ячеек ввода\nв диалоге ввода',
    'uncheck to use the input\ndialog in short form':
        'убрать метку - использовать краткую форму\nдиалога ввода',
    'Virtual keyboard':
        'Виртуальная клавиатура',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'убрать метку - отключить использование виртуальной клавиатуры\nдля мобильных устройств',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'поставить метку - разрешить использование виртуальной клавиатуры\nдля мобильных устройств',
    'Input sliders':
        'Использование бегунков ввода',
    'uncheck to disable\ninput sliders for\nentry fields':
        'убрать метку - отключить использование бегунков\nпри заполнении полей ввода',
    'check to enable\ninput sliders for\nentry fields':
        'поставить метку - разрешить использование бегунков\nпри заполнении полей ввода',
    'Clicking sound':
        'Щелк-звук',
    'uncheck to turn\nblock clicking\nsound off':
        'убрать метку - выключить звук\nпри щелчке на блок',
    'check to turn\nblock clicking\nsound on':
        'поставить метку - включить звук\nпри щелчке на блок',
    'Animations':
        'Aнимация',
    'uncheck to disable\nIDE animations':
        'убрать метку - отключить\nIDE aнимацию',
    'check to enable\nIDE animations':
        'поставить метку - разрешить\nIDE aнимацию',
    'Thread safe scripts':
        'Защищенность скрипта в многопоточном режиме',
    'uncheck to allow\nscript reentrancy':
        'убрать метку - разрешить\nповторное вхождение в скрипт',
    'check to disallow\nscript reentrancy':
        'поставить метку - отключить\nповторное вхождение в скрипт',

    // inputs
    'with inputs':
        'с вводимыми данными',
    'input names:':
        'имена вводимых данных:',
    'Input Names:':
        'Имена Вводимых Данных:',
    'input list:':
        'вводимый список:',

    // context menus:
    'help':
        'Справка',

    // blocks:
    'help...':
        'справка...',
    'relabel...':
        'переобозначить...',
    'duplicate':
        'продублировать',
    'make a copy\nand pick it up':
        'скопировать\nи запомнить',
    'only duplicate this block':
        'продублировать только данный блок',
    'delete':
        'удалить',
    'script pic...':
        'изображение скрипта...',
    'open a new window\nwith a picture of this script':
        'представить изображение скрипта\nна новой странице',
    'ringify':
        'обвести',
    'unringify':
        'убрать обводку',

    // custom blocks:
    'delete block definition...':
        'удалить определение блока',
    'edit...':
        'редактировать...',

    // sprites:
    'edit':
        'редактировать',
    'export...':
        'экспорт...',

    // stage:
    'show all':
        'показать все',

    // scripting area
    'clean up':
        'упорядочить',
    'arrange scripts\nvertically':
        'размещать скрипты\nвертикально',
    'add comment':
        'добавить комментарий',
    'make a block...':
        'новый блок...',

    // costumes
    'rename':
        'переименовать',
    'export':
        'экспорт',
    'rename costume':
        'переименовать маску',

    // sounds
    'Play sound':
        'Воспроизводить звук',
    'Stop sound':
        'Остановить звук',
    'Stop':
        'Стоп',
    'Play':
        'Воспроизводить',
    'rename sound':
        'переименовать звук',

    // dialogs
    // buttons
    'OK':
        'OK',
    'Ok':
        'Ok',
    'Cancel':
        'Отменить',
    'Yes':
        'Да',
    'No':
        'Нет',

    // help
    'Help':
        'Справка',

    // Project Manager
    'Untitled':
        'Неозаглавленный',
    'Open Project':
        'Открыть Проект',
    '(empty)':
        '(пусто)',
    'Saved!':
        'Сохранен!',
    'Delete Project':
        'Удалить Проект',
    'Are you sure you want to delete':
        'Вы уверены вы хотите удалить?',
    'rename...':
        'переименовать...',

    // costume editor
    'Costume Editor':
        'Редактор Масок',
    'click or drag crosshairs to move the rotation center':
        'щелкните на перекрестье переместить центр поворота',

    // project notes
    'Project Notes':
        'Проектные Записки',

    // new project
    'New Project':
        'Новый Проект',
    'Replace the current project with a new one?':
        'Заменить данный проект на новый?',

    // save project
    'Save Project As...':
        'Сохранить Проект как...',

    // export blocks
    'Export blocks':
        'Экспорт блоки',
    'Import blocks':
        'Импорт блоки',
    'this project doesn\'t have any\ncustom global blocks yet':
        'У этого проекта пока нет глобальных\nпользовательских блоков',
    'select':
        'выделить',
    'all':
        'все',
    'none':
        'ничего',

    // variable dialog
    'for all sprites':
        'применительно ко всем Образам',
    'for this sprite only':
        'применительно только к данному Образу',

    // block dialog
    'Change block':
        'Заменить блок',
    'Command':
        'Команда',
    'Reporter':
        'Генератор значений',
    'Predicate':
        'Предикат',

    // block editor
    'Block Editor':
        'Редактор Блоков',
    'Apply':
        'Применить',

    // block deletion dialog
    'Delete Custom Block':
        'Удалить Пользовательский Блок',
    'block deletion dialog text':
        'Вы уверены вы хотите удалить этот блок?',

    // input dialog
    'Create input name':
        'Определить имя вводимых данных',
    'Edit input name':
        'Редактировать имя вводимых данных',
    'Edit label fragment':
        'Редактировать фрагмент обозначения',
    'Title text':
        'Заголовок текста',
    'Input name':
        'Имя вводимых данных',
    'Delete':
        'Удалить',
    'Object':
        'Объект',
    'Number':
        'Число',
    'Text':
        'Tекст',
    'List':
        'Список',
    'Any type':
        'Любой тип',
    'Boolean (T/F)':
        'Булев (И/Л)',
    'Command\n(inline)':
        'Команда\n(встроенная)',
    'Command\n(C-shape)':
        'Команда\n(С-форма)',
    'Any\n(unevaluated)':
        'Любой\n(неопределенный)',
    'Boolean\n(unevaluated)':
        'Булев\n(неопределенный)',
    'Single input.':
        'Единичный ввод.',
    'Default Value:':
        'Значение по умолчанию:',
    'Multiple inputs (value is list of inputs)':
        'Многократный ввод (список)',
    'Upvar - make internal variable visible to caller':
        'Сделать внутреннюю переменную видимой извне',

    // About Snap
    'About Snap':
        'Snap!  Реквизиты',
    'Back...':
        'Bозврат...',
    'License...':
        'Лицензия...',
    'Modules...':
        'Модули...',
    'Credits...':
        'Сотрудники...',
    'Translators...':
        'Переводчики',
    'License':
        'Лицензия',
    'current module versions:':
        'Komponenten-Versionen',
    'Contributors':
        'Участники',
    'Translations':
        'Переводы',

    // variable watchers
    'normal':
        'стандартный',
    'large':
        'масштабированный',
    'slider':
        'бегунок',
    'slider min...':
        'бегунок min...',
    'slider max...':
        'бегунок max...',
    'import...':
        'импорт...',
    'Slider minimum value':
        'Бегунок - min значение',
    'Slider maximum value':
        'Бегунок - max значение',

    // list watchers
    'length: ':
        'длина: ',

    // coments
    'add comment here...':
        'добавить комментарий сюда...',

    // drow downs
    // directions
    '(90) right':
        '(90) направо',
    '(-90) left':
        '(-90) налево',
    '(0) up':
        '(0) вверх',
    '(180) down':
        '(180) вниз',

    // collision detection
    'mouse-pointer':
        'курсор мышки',
    'edge':
        'грань',
    'pen trails':
        'линии пера',

    // costumes
    'Turtle':
        'Горлица',

    // graphical effects
    'ghost':
        'прозрачн.',

    // keys
    'space':
        'пробел',
    'up arrow':
        'стрелка вверх',
    'down arrow':
        'стрелка вниз',
    'right arrow':
        'стрелка вправо',
    'left arrow':
        'стрелка влево',
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
        'новый...',

    // math functions
    'abs':
        'абсолютное значение',
    'sqrt':
        'квадратный корень',
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
        'число',
    'text':
        'текст',
    'Boolean':
        'булев',
    'list':
        'список',
    'command':
        'команда',
    'reporter':
        'генератор значений',
    'predicate':
        'предикат',

    // list indices
    'last':
        'последний',
    'any':
        'любой'
};
