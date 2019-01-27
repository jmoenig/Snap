/*

    lang-bg.js

    Bulgarian translation for SNAP!

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

SnapTranslator.dict.bg = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    ,    \u00c4, \u00e4

,    \u00d6, \u00f6
    ,    \u00dc, \u00fc
    §      \u00df
*/

    // translations meta information
    'language_name':
        'Български', // the name as it should appear in the language menu
    'language_translator':
        'Иван Савов', // your name for the Translators tab
    'translator_e-mail':
        'ivan.savov@gmail.com', // optional
    'last_changed':
        '2015-11-02', // this, too, will appear in the Translators tab

    // GUI
    // control bar:
    'untitled':
        'Без име',
    'development mode':
        'Режим за програмисти',

    // categories:
    'Motion':
        'Движение',
    'Looks':
        'Външност',
    'Sound':
        'Звуци',
    'Pen':
        'Молив',
    'Control':
        'Управление',
    'Sensing':
        'Сензори',
    'Operators':
        'Оператори',
    'Variables':
        'Променливи',
    'Lists':
        'Списъци',
    'Other':
        'Други',

    // editor:
    'draggable':
        'движимо',

    // tabs:
    'Scripts':
        'Скриптове',
    'Costumes':
        'Костюми',
    'Sounds':
        'Звуци',

    // names:
    'Sprite':
        'Спрайт',
    'Stage':
        'Сцена',

    // rotation styles:
    'don\'t rotate':
        'не се върти',
    'can rotate':
        'върти се',
    'only face left/right':
        'само ляво-дясно ориентация',

    // new sprite button:
    'add a new sprite':
        'Добави нов спрайт',

    // tab help
    'costumes tab help':
        'импортирай изображения от друг уеб-сайт\nили от твоя компютър пускайки ги тук',
    'import a sound from your computer\nby dragging it into here':
        'добави звуци от твоя компютър\nпускайки ги тук ',

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
        'Избрана сцена:\nняма блокове с движение',

    'move %n steps':
        'напред с %n стъпки',
    'turn %clockwise %n degrees':
        ' %clockwise с %n градуса',
    'turn %counterclockwise %n degrees':
        'завърти %counterclockwise с %n градуса',
    'point in direction %dir':
        'обърни се в посока %dir',
    'point towards %dst':
        'обърни се към %dst',
    'go to x: %n y: %n':
        'премини към x %n y %n',
    'go to %dst':
        'премини в точка %dst',
    'glide %n secs to x: %n y: %n':
        'плъзгане %n сек до x %n y %n',
    'change x by %n':
        'промени х с %n',
    'set x to %n':
        'настрой х на %n',
    'change y by %n':
        'промени y с %n',
    'set y to %n':
        'настрой y на %n',
    'if on edge, bounce':
        'ако е в края, отблъсни се',
    'x position':
        'x позиция',
    'y position':
        'y позиция',
    'direction':
        'посока',

    // looks:
    'switch to costume %cst':
        'смени костюм с %cst',
    'next costume':
        'следващия костюм',
    'costume #':
        'костюм №',
    'say %s for %n secs':
        'кажи %s за %n сек',
    'say %s':
        'кажи %s',
    'think %s for %n secs':
        'мисли %s за %n сек',
    'think %s':
        'мисли %s',
    'Hello!':
        'Здрасти!',
    'Hmm...':
        'Хмм...',
    'change %eff effect by %n':
        'смени %eff ефект с %n',
    'set %eff effect to %n':
        'настрой ефект %eff на %n',
    'clear graphic effects':
        'махни ефектите',
    'change size by %n':
        'промени размера с %n',
    'set size to %n %':
        'настрой размера на %n',
    'size':
        'размер',
    'show':
        'покажи',
    'hide':
        'скрий',
    'go to front':
        'премини най-отпред',
    'go back %n layers':
        'премини с %n слоя назад',

    'development mode \ndebugging primitives:':
        'Режим за програмисти \nпримитиви за дебъгиране:',
    'console log %mult%s':
        'напиши в конзолата %mult%s',
    'alert %mult%s':
        'предупреждение %mult%s',

    // sound:
    'play sound %snd':
        'пусни звук %snd',
    'play sound %snd until done':
        'пусни звук %snd до край',
    'stop all sounds':
        'спри всички звуци',
    'rest for %n beats':
        'пауза за %n такта',
    'play note %n for %n beats':
        'пусни нота %n за %n такта',
    'change tempo by %n':
        'промени темпото с %n',
    'set tempo to %n bpm':
        'настрой темпо %n удара в мин.',
    'tempo':
        'темпо',

    // pen:
    'clear':
        'изчисти всичко',
    'pen down':
        'натисни молива',
    'pen up':
        'вдигни молива',
    'set pen color to %clr':
        'избери молив с цвят %clr',
    'change pen color by %n':
        'промени цвята на молива с %n',
    'set pen color to %n':
        'избери цвят %n',
    'change pen shade by %n':
        'промени яркостта с %n',
    'set pen shade to %n':
        'настрой яркостта на %n',
    'change pen size by %n':
        'промени размера с %n',
    'set pen size to %n':
        'ибери молив с размер %n',
    'stamp':
        'печатче',

    // control:
    'when %greenflag clicked':
        'когато %greenflag е кликнат',
    'when %keyHat key pressed':
        'когато бутон %keyHat е натиснат',
    'when I am clicked':
        'когато кликнеш върху мен',
    'when I receive %msgHat':
        'когато получа %msgHat',
    'broadcast %msg':
        'изпрати %msg към всички',
    'broadcast %msg and wait':
        'изпрати %msg към всички и изчакай',
    'Message name':
        'Име на съобщение',
    'wait %n secs':
        'изчакай %n сек',
    'wait until %b':
        'изчакай до %b',
    'forever %loop':
        'завинаги %loop',
    'repeat %n %loop':
        'повтори %n %loop',
    'repeat until %b %loop':
        'повтори докато %b %loop',
    'if %b %c':
        'ако %b %c',
    'if %b %c else %c':
        'ако %b %c иначе %c',
    'report %s':
        'резултат %s',
    'stop block':
        'спри блока',
    'stop script':
        'спри скрипта',
    'stop all %stop':
        'спри всичко %stop',
    'run %cmdRing %inputs':
        'изпълни %cmdRing %inputs',
    'launch %cmdRing %inputs':
        'пусни %cmdRing %inputs',
    'call %repRing %inputs':
        'извикай %repRing %inputs',
    'run %cmdRing w/continuation':
        'изпълни %cmdRing с продължение',
    'call %cmdRing w/continuation':
        'извикай %cmdRing с продължение',
    'warp %c':
        'warp %c',

    // sensing:
    'touching %col ?':
        'допира ли %col ?',
    'touching %clr ?':
        'допира ли %clr ?',
    'color %clr is touching %clr ?':
        'цвят %clr допира ли %clr ?',
    'ask %s and wait':
        'попитай %s и изчакай',
    'what\'s your name?':
        'как се казваш?',
    'answer':
        'отговор',
    'mouse x':
        'мишка x-позиция',
    'mouse y':
        'мишка y-позиция',
    'mouse down?':
        'натиснат бутон на мишката?',
    'key %key pressed?':
        'бутон %key натиснат?',
    'distance to %dst':
        'растояние до %dst',
    'reset timer':
        'нулирай таймер',
    'timer':
        'таймер',
    'http:// %s':
        'http:// %s',

    'filtered for %clr':
        'филтър за %clr',
    'stack size':
        'размер на стека',
    'frames':
        'рамки',

    // operators:
    '%n mod %n':
        '%n модул %n',
    'round %n':
        'закръгли %n',
    '%fun of %n':
        '%fun от %n',
    'pick random %n to %n':
        'произволно число между %n и %n',
    '%b and %b':
        '%b и %b',
    '%b or %b':
        '%b или %b',
    'not %b':
        'не %b',
    'true':
        'true',
    'false':
        'false',
    'join %words':
        'съедини %words',
    'hello':
        'здравейте',
    'world':
        'хора',
    'letter %idx of %s':
        'буква %idx от %s',
    'length of %s':
        'дължина на %s',
    'unicode of %s':
        'Unicode на %s',
    'unicode %n as letter':
        'буква с Unicode %n',
    'is %s a %typ ?':
        '%s от тип %typ ли е ?',
    'is %s identical to %s ?':
        '%s идентичен с %s ?',

    'type of %s':
        'тип на %s',

    // variables:
    'Make a variable':
        'Направи променлива',
    'Variable name':
        'Име на променливата',
    'Delete a variable':
        'Изтрий променлива',

    'set %var to %s':
        'настрой %var на стойност %s',
    'change %var by %n':
        'промени %var с %n',
    'show variable %var':
        'покажи променлива %var',
    'hide variable %var':
        'скрий променлива %var',
    'script variables %scriptVars':
        'променливи на скрипта %scriptVars',

    // lists:
    'list %exp':
        'списък %exp',
    '%s in front of %l':
        '%s пред %l',
    'item %idx of %l':
        'елемент %idx от %l',
    'all but first of %l':
        'всичко осрен първия от %l',
    'length of %l':
        'дължина на %l',
    '%l contains %s':
        '%l съдържа %s',
    'thing':
        'нещо',
    'add %s to %l':
        'добави %s към %l',
    'delete %ida of %l':
        'изтрий %ida от %l',
    'insert %s at %idx of %l':
        'вмъкни %s на позиция %idx в %l',
    'replace item %idx of %l with %s':
        'замести елемент %idx в %l с %s',

    // other
    'Make a block':
        'Нов блок',

    // menus
    // snap menu
    'About...':
        'За Snap!',
    'Snap! website':
        'Уебсайт на Snap!',
    'Download source':
        'Издърпай програмния код',
    'Switch back to user mode':
        'Премини към режим на потребителя',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'изключи deep-Morphic\nконтекст меню',
    'Switch to dev mode':
        'Премини към режим за порграмисти',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'включи Morphic\nконтекст менюта\nи инспектори,\nмното сложно!',

    // project menu
    'Project notes...':
        'Записки по проекта...',
    'New':
        'Нов проект',
    'Open...':
        'Отвори...',
    'Save':
        'Запиши',
    'Save As...':
        'Запиши като...',
    'Import...':
        'Импорт...',
    'file menu import hint':
        'Зареди проект,\nблокова библиотека,\nспрайт или звук',
    'Export project as plain text...':
        'Експорт проекта како текст файл...',
    'Export project...':
        'Експорт на проект...',
    'show project data as XML\nin a new browser window':
        'Покажи XML данните на проекта\nв нов прозорец на браузъра',
    'Export blocks...':
        'Експорт на блокове...',
    'show global custom block definitions as XML\nin a new browser window':
        'Покажи XML дефинициите на custom блокове\nв нов прозорец на браузъра',
    'Import tools':
        'Импорт опции',
    'load the official library of\npowerful blocks':
        'Зареди официалната библиотеката от мощните блокове',

    // settings menu
    'Language...':
        'Език...',
    'Blurred shadows':
        'Размити сенки',
    'uncheck to use solid drop\nshadows and highlights':
        'откажи за да използваш плътни\nсенки и очертания',
    'check to use blurred drop\nshadows and highlights':
        'избери за да използваш плътни\nсенки и очертания',
    'Zebra coloring':
        'Зеброви цветове',
    'check to enable alternating\ncolors for nested blocks':
        'избери за да включиш\nалтениращи цветове за блоковете',
    'uncheck to disable alternating\ncolors for nested block':
        'откажи за да изключиш\nалтениращи цветове за блоковете',
    'Dynamic input labels':
        'Динамични входни етикети',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'откажи за да изключиш динамични входни етикети\nза входни с множество стйности',
    'check to enable dynamic\nlabels for variadic inputs':
        'избери за да използваш динамични входни етикети\nза входни с множество стйности',
    'Prefer empty slot drops':
        'Предпочиай несвързани блокове',
    'settings menu prefer empty slots hint':
        'избери и новите блокове ще\nотместват старите',
    'uncheck to allow dropped\nreporters to kick out others':
        'откажи за да позволиш новите блокове\nда изместват старите',
    'Long form input dialog':
        'Дълга форма за входни',
    'check to always show slot\ntypes in the input dialog':
        'избери за да са покаже типът\nна всички входните',
    'uncheck to use the input\ndialog in short form':
        'откажи за да използвап кратка форма\nза входни променливи',
    'Virtual keyboard':
        'Виртуална клавиатура',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'откажи за да изключиш виртуалната клавиатура',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'избери за да изпозваш виртуална\nклавиатура за мобилни устройства',
    'Input sliders':
        'Слайдери',
    'uncheck to disable\ninput sliders for\nentry fields':
        'откажи за да изключиш слайдерите\nза входни полета',
    'check to enable\ninput sliders for\nentry fields':
        'избери за да изпозваш слайдери\nза входни полета',
    'Clicking sound':
        'Звук на клик',
    'uncheck to turn\nblock clicking\nsound off':
        'откажи за да изключиш звука\nпри кликване върху блок',
    'check to turn\nblock clicking\nsound on':
        'избери за да включиш звука\nпри кликване върху блок',
    'Animations':
        'Aнимации',
    'uncheck to disable\nIDE animations':
        'откажи за да изключиш\nIDE aнимациите',
    'check to enable\nIDE animations':
        'избери за да включиш\nIDE aнимациите',
    'Thread safe scripts':
        'Thread safe скриптове',
    'uncheck to allow\nscript reentrancy':
        'откажи за да изключиш\nthread safe скриптове',
    'check to disallow\nscript reentrancy':
        'избери за да включиш\nthread safe скриптове',

    // inputs
    'with inputs':
        'с вход на данни',
    'input names:':
        'имена на входните данни:',
    'Input Names:':
        'Имена на входните данни:',
    'input list:':
        'Вход на списък:',

    // context menus:
    'help':
        'помощ',

    // blocks:
    'help...':
        'помощ...',
    'relabel...':
        'смени етикета...',
    'duplicate':
        'дупликация',
    'make a copy\nand pick it up':
        'копирай\nи вземи',
    'only duplicate this block':
        'копирай само този блок',
    'delete':
        'изтрий',
    'script pic...':
        'изображение на скрипта...',
    'open a new window\nwith a picture of this script':
        'отвори нов екран\n с изображение на скрипта',
    'ringify':
        'ringify',
    'unringify':
        'unringify',

    // custom blocks:
    'delete block definition...':
        'изтрий дефиницията на блока',
    'edit...':
        'редактирай...',

    // sprites:
    'edit':
        'редактирай',
    'export...':
        'експорт...',

    // stage:
    'show all':
        'почажи всичко',

    // scripting area
    'clean up':
        'разчисти',
    'arrange scripts\nvertically':
        'вертикално подреждане на скриптовере',
    'add comment':
        'добави коментар',
    'make a block...':
        'нов блок...',

    // costumes
    'rename':
        'Преименуване',
    'export':
        'Експорт',
    'rename costume':
        'Преименуване на костюм',

    // sounds
    'Play sound':
        'Пусни звука',
    'Stop sound':
        'Спри звука',
    'Stop':
        'Стоп',
    'Play':
        'Пусни',
    'rename sound':
        'Преименувай звука',

    // dialogs
    // buttons
    'OK':
        'OK',
    'Ok':
        'Ok',
    'Cancel':
        'Отмени',
    'Yes':
        'Да',
    'No':
        'Не',

    // help
    'Help':
        'Помощ',

    // Project Manager
    'Untitled':
        'Без име',
    'Open Project':
        'Отвори Проект',
    '(empty)':
        '(празно)',
    'Saved!':
        'Записан!',
    'Delete Project':
        'Изтрий Проект',
    'Are you sure you want to delete':
        'Сирурен ли си че искаш да изтриеш?',
    'rename...':
        'Преименуване...',

    // costume editor
    'Costume Editor':
        'Редактор на Костюми',
    'click or drag crosshairs to move the rotation center':
        'кликни за да преместиш центра на ротацията',

    // project notes
    'Project Notes':
        'Записки по проекта',

    // new project
    'New Project':
        'Нов Проект',
    'Replace the current project with a new one?':
        'Замени проекта с нов?',

    // save project
    'Save Project As...':
        'Запиши проекта като...',

    // export blocks
    'Export blocks':
        'Експорт на блокове',
    'Import blocks':
        'Импорт на блокове',
    'this project doesn\'t have any\ncustom global blocks yet':
        'Този проект не съдъжа\nглобални custom\nблокове',
    'select':
        'избери',
    'all':
        'всичко',
    'none':
        'нищо',

    // variable dialog
    'for all sprites':
        'за вскички спрайтове',
    'for this sprite only':
        'само за този спрайт',

    // block dialog
    'Change block':
        'Замени блок',
    'Command':
        'Команда',
    'Reporter':
        'Репортер',
    'Predicate':
        'Предикат',

    // block editor
    'Block Editor':
        'Редактор на блокове',
    'Apply':
        'Приложи',

    // block deletion dialog
    'Delete Custom Block':
        'Изтрий custom блок',
    'block deletion dialog text':
        'Сигурен ли си че искаш да изтиреш този блок?',

    // input dialog
    'Create input name':
        'Направи нов вход с име',
    'Edit input name':
        'Редактирай име на вход',
    'Edit label fragment':
        'Редактирай текста етикет',
    'Title text':
        'Текст заглавие',
    'Input name':
        'Име на входа на данни',
    'Delete':
        'Изтрий',
    'Object':
        'Обект',
    'Number':
        'Число',
    'Text':
        'Tекст',
    'List':
        'Списък',
    'Any type':
        'Произволен тип',
    'Boolean (T/F)':
        'Булев (Т/F)',
    'Command\n(inline)':
        'Команда\n(inline)',
    'Command\n(C-shape)':
        'Команда\n(С-форма)',
    'Any\n(unevaluated)':
        'Произволен\n(unevaluated)',
    'Boolean\n(unevaluated)':
        'Булев\n(unevaluated)',
    'Single input.':
        'Единичен вход',
    'Default Value:':
        'Default стойност:',
    'Multiple inputs (value is list of inputs)':
        'Множество входни (спиък от данни)',
    'Upvar - make internal variable visible to caller':
        'Upvar - направи вътрешна променлива видима от извиквача',

    // About Snap
    'About Snap':
        'За Snap!',
    'Back...':
        'Назад...',
    'License...':
        'Лиценз...',
    'Modules...':
        'Модули...',
    'Credits...':
        'Кредити...',
    'Translators...':
        'Преводачи',
    'License':
        'Лиценз',
    'current module versions:':
        'Версии на модулие',
    'Contributors':
        'Участници',
    'Translations':
        'Преводи',

    // variable watchers
    'normal':
        'нормален',
    'large':
        'голям',
    'slider':
        'слайдер',
    'slider min...':
        'слайдер min...',
    'slider max...':
        'слайдер max...',
    'import...':
        'импорт...',
    'Slider minimum value':
        'Слайдер с min стойност',
    'Slider maximum value':
        'Слайдер с max стойност',

    // list watchers
    'length: ':
        'дължина: ',

    // coments
    'add comment here...':
        'добави коментар тук...',

    // drow downs
    // directions
    '(90) right':
        '(90) надясно',
    '(-90) left':
        '(-90) наляво',
    '(0) up':
        '(0) нагоре',
    '(180) down':
        '(180) надолу',

    // collision detection
    'mouse-pointer':
        'курсор на мишката',
    'edge':
        'край',
    'pen trails':
        'линии след молива',

    // costumes
    'Turtle':
        'Костенурка',

    // graphical effects
    'ghost':
        'прозрачност',

    // keys
    'space':
        'интервал',
    'up arrow':
        'стрелка нагоре',
    'down arrow':
        'стрелка надолу',
    'right arrow':
        'стрелка надясно',
    'left arrow':
        'стрелка наляво',
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
        'нов...',

    // math functions
    'abs':
        'абсолютна стойност',
    'sqrt':
        'корен квадратен',
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
        'списък',
    'command':
        'команда',
    'reporter':
        'репортер',
    'predicate':
        'предикат',

    // list indices
    'last':
        'последен',
    'any':
        'някой',
    'now connected':
        'конектиран',
    'undo':
        'въстанови'
};
