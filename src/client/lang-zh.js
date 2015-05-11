/*

	lang-zh.js

	Simplified Chinese translation for SNAP!
	SNAP 简体中文翻译版

	written by Jens Mönig

	Copyright (C) 2012 by Jens Mönig

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

SnapTranslator.dict.zh = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    Ä, ä   \u00c4, \u00e4
    Ö, ö   \u00d6, \u00f6
    Ü, ü   \u00dc, \u00fc
    ß      \u00df
*/

    // translations meta information
    'language_name':
        '简体中文', // the name as it should appear in the language menu
    'language_translator':
        '邓江华', // your name for the Translators tab
    'translator_e-mail':
        'djh@rhjxx.cn', // optional
    'last_changed':
        '2013-3-25', // this, too, will appear in the Translators tab

    // GUI
    // control bar:
    'untitled':
        '无标题',
    'development mode':
        '开发模式',

    // categories:
    'Motion':
        '动作',
    'Looks':
        '外观',
    'Sound':
        '声音',
    'Pen':
        '画笔',
    'Control':
        '控制',
    'Sensing':
        '侦测',
    'Operators':
        '运算',
    'Variables':
        '变量',
    'Lists':
        '链表',
    'Other':
        '其他',

    // editor:
    'draggable':
        '可拖动',

    // tabs:
    'Scripts':
        '脚本',
    'Costumes':
        '造型',
    'Sounds':
        '声音',

    // names:
    'Sprite':
        '角色',
    'Stage':
        '舞台',

    // rotation styles:
    'don\'t rotate':
        '不能旋转',
    'can rotate':
        '可以旋转',
    'only face left/right':
        '只能水平翻转',

    // new sprite button:
    'add a new sprite':
        '新建角色',

    // tab help
    'costumes tab help':
        '造型选卡帮助\n要使用另外网站上的图片或计算机中的图像'
            + '只需拖到图像到这里即可',
    'import a sound from your computer\nby dragging it into here':
        '从计算机中导入声音文件\n只需拖动声音文件到这里即可',

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
        '舞台选择:\n没有动作程序语言',

    'move %n steps':
        '移动 %n 歩',
    'turn %clockwise %n degrees':
        '旋转 %clockwise %n 度',
    'turn %counterclockwise %n degrees':
        '旋转 %counterclockwise %n 度',
    'point in direction %dir':
        '面向 %dir 度',
    'point towards %dst':
        '面向 %dst ',
    'go to x: %n y: %n':
        '移到 x: %n  y: %n ',
    'go to %dst':
        '移到 %dst ',
    'glide %n secs to x: %n y: %n':
        '在 %n 秒内，平滑移动到 x: %n  y: %n ',
    'change x by %n':
        '将x坐标增加 %n ',
    'set x to %n':
        '将x坐标设定为 %n ',
    'change y by %n':
        '将y坐标增加 %n ',
    'set y to %n':
        '将y坐标设定为 %n ',
    'if on edge, bounce':
        '碰到边缘就反弹',
    'x position':
        'x坐标',
    'y position':
        'y坐标',
    'direction':
        '方向',

    // looks:
    'switch to costume %cst':
        '切换到造型 %cst ',
    'next costume':
        '下一个造型',
    'costume #':
        '造型编号',
    'say %s for %n secs':
        '说 %s  %n 秒',
    'say %s':
        '说 %s ',
    'think %s for %n secs':
        '思考 %s  %n 秒',
    'think %s':
        '思考 %s ',
    'Hello!':
        '你好！',
    'Hmm...':
        '嗯...',
    'change %eff effect by %n':
        '将 %eff 特效增加 %n ',
    'set %eff effect to %n':
        '将 %eff 特效设定为 %n ',
    'clear graphic effects':
        '清除所有图形特效',
    'change size by %n':
        '将角色的大小增加 %n ',
    'set size to %n %':
        '将角色的大小设定为 %n ',
    'size':
        '大小',
    'show':
        '显示',
    'hide':
        '隐藏',
    'go to front':
        '移至最上层',
    'go back %n layers':
        '下移 %n 层',

    'development mode \ndebugging primitives:':
        '开发模式\n调式程序语言:',
    'console log %mult%s':
        '控制台日志 %mult%s',
    'alert %mult%s':
        '警告: %mult%s',

    // sound:
    'play sound %snd':
        '播放声音 %snd ',
    'play sound %snd until done':
        '播放声音 %snd 直到播放完毕',
    'stop all sounds':
        '停止所有声音',
    'rest for %n beats':
        '停止 %n 秒',
    'play note %n for %n beats':
        '弹奏 %n  %n 拍',
    'change tempo by %n':
        '将节奏加快 %n',
    'set tempo to %n bpm':
        '将节奏设定为 %n',
    'tempo':
        '节奏',

    // pen:
    'clear':
        '清除所有画笔',
    'pen down':
        '落笔',
    'pen up':
        '抬笔',
    'set pen color to %clr':
        '将画笔的颜色设定为 %clr ',
    'change pen color by %n':
        '将画笔的颜色值增加 %n ',
    'set pen color to %n':
        '将画笔的颜色值设定为 %n ',
    'change pen shade by %n':
        '将画笔的色度增加 %n ',
    'set pen shade to %n':
        '将画笔的色度设定为 %n ',
    'change pen size by %n':
        '将画笔的大小增加 %n ',
    'set pen size to %n':
        '将画笔的大小设定为 %n ',
    'stamp':
        '图章',

    // control:
    'when %greenflag clicked':
        '当 %greenflag 被点击',
    'when %keyHat key pressed':
        '当按下 %keyHat',
    'when I am clicked':
        '当角色被点击',
    'when I receive %msgHat':
        '当接收到 %msgHat',
    'broadcast %msg':
        '广播 %msg ',
    'broadcast %msg and wait':
        '广播 %msg 并等待',
    'Message name':
        '信息名称',
    'wait %n secs':
        '等待 %n 秒',
    'wait until %b':
        '直到 %b 前都等待阗',
    'forever %c':
        '重复执行 %c',
    'repeat %n %c':
        '重复执行 %n  %c',
    'repeat until %b %c':
        '重复执行直到 %b  %c',
    'if %b %c':
        '如果 %b  %c',
    'if %b %c else %c':
        '如果 %b  %c 否则 %c',
    'report %s':
        '报告 %s ',
    'stop block':
        '停止程序块',
    'stop script':
        '停止脚本',
    'stop all %stop':
        '全部停止 %stop',
    'run %cmdRing %inputs':
        '运行 %cmdRing %inputs ',
    'launch %cmdRing %inputs':
        '启动 %cmdRing  %inputs ',
    'call %repRing %inputs':
        '调用 %repRing  %inputs ',
    'run %cmdRing w/continuation':
        '持续运行 %cmdRing ',
    'call %cmdRing w/continuation':
        '持续调用 %cmdRing ',
    'warp %c':
        '直接运行 %c',
    'when I start as a clone':
        '当我开始克隆',
    'create a clone of %cln':
        '新建一个克隆 %cln',
    'myself':
        '自己',
    'delete this clone':
        '删除这个克隆',

    // sensing:
    'touching %col ?':
        '碰到 %col ',
    'touching %clr ?':
        '碰到颜色 %clr ',
    'color %clr is touching %clr ?':
        '颜色 %clr 碰到了颜色 %clr ？',
    'ask %s and wait':
        '询问 %s 并等待',
    'what\'s your name?':
        '你的名字?',
    'answer':
        '回答',
    'mouse x':
        '鼠标的x坐标',
    'mouse y':
        '鼠标的y坐标',
    'mouse down?':
        '按下鼠标？',
    'key %key pressed?':
        '按键 %key 是否按下？',
    'distance to %dst':
        '到 %dst 的距离',
    'reset timer':
        '计时器归零',
    'timer':
        '计时器',
    'http:// %s':
        'http:// %s',
    'turbo mode?':
        'Turbo模式',
    'set turbo mode to %b':
        '设置Turbo模式 %b',

    'filtered for %clr':
        '选择颜色  %clr ',
    'stack size':
        '堆栈大小',
    'frames':
        '框架',

    // operators:
    '%n mod %n':
        '%n 除以 %n 的余数',
    'round %n':
        '将 %n 四舍五入',
    '%fun of %n':
        '%fun %n',
    'pick random %n to %n':
        '在 %n 到 %n 间随机选一个数',
    '%b and %b':
        '%b 且 %b',
    '%b or %b':
        '%b 或 %b',
    'not %b':
        '%b 不成立',
    'true':
        '成立',
    'false':
        '不成立',
    'join %words':
        '将 %words 加入到',
    'hello':
        '你好',
    'world':
        '行者老邓',
    'letter %n of %s':
        '第 %n 位在文字 %s 中',
    'length of %s':
        '%s 的长度',
    'unicode of %s':
        '字符 %s 的Unicode编码值',
    'unicode %n as letter':
        'Unicode编码值为 %n 的字符',
    'is %s a %typ ?':
        '%s 是 %typ 类型？',
    'is %s identical to %s ?':
        '%s 与 %s 相同吗？',

    'type of %s':
        '%s 类型',

    // variables:
    'Make a variable':
        '新建一个变量',
    'Variable name':
        '变量名',
    'Delete a variable':
        '删除变量',

    'set %var to %s':
        '将变量 %var 的值设定为 %s ',
    'change %var by %n':
        '将变量 %var 的值增加 %n ',
    'show variable %var':
        '显示变量 %var ',
    'hide variable %var':
        '隐藏变量 %var ',
    'script variables %scriptVars':
        '脚本变量 %scriptVars',

    // lists:
    'list %exp':
        '链表 %exp',
    '%s in front of %l':
        '设定 %s 为链表 %l 第一项',
    'item %idx of %l':
        '第 %idx 项在链表 %l 中',
    'all but first of %l':
        '链表 %l 除第一记录以外内容',
    'length of %l':
        '链表 %l 的长度',
    '%l contains %s':
        '链表 %l 包含 %s ',
    'thing':
        '东西',
    'add %s to %l':
        '将 %s 加入链表 %l ',
    'delete %ida of %l':
        '删除链表 %ida 第 %l 项',
    'insert %s at %idx of %l':
        '将 %s 插入到第 %idx 项在 %l 中',
    'replace item %idx of %l with %s':
        '将第 %idx 项在链表 %l 中替换为 %s ',

    // other
    'Make a block':
        '新建程序块',

    // menus
    // snap menu
    'About...':
        '关于Snap!...',
    'Reference manual':
        '参考手册',
    'Snap! website':
        '官方网站',
    'Download source':
        '下载源码',
    'Switch back to user mode':
        '切换到用户模式',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        '禁用 变形语式\n快捷菜单\n\n与非\n友好用户界面',
    'Switch to dev mode':
        '切换到开发人员模式',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        '启用 正常语式\n快捷菜单\n与非检查\n友好用户界面',


    // project menu
    'Project notes...':
        '项目说明...',
    'New':
        '新建',
    'Open...':
        '打开...',
    'Save':
        '保存',
    'Save As...':
        '另存为...',
    'Import...':
        '导入...',
    'file menu import hint':
        '当你拖动到系统，注意查看检查报告\n'
		+ '要注意检查报告为空\n\n'
		+ '有一些浏览器不支持这一功能',
    'Export project as plain text...':
        '纯文本格式导出项目...',
    'Export project...':
        '导出项目...',
    'show project data as XML\nin a new browser window':
        '新浏览窗以XML格式显示项目',
    'Export blocks...':
        '导出程序块...',
    'show global custom block definitions as XML\nin a new browser window':
        '新浏览窗以XML格式显示全局自定义程序块',
    'Import tools':
        '导入工具包',
    'load the official library of\npowerful blocks':
        '载入官方库和强大的程序块',

    // cloud menu
    'Login...':
        '登录...',
    'Signup...':
        '注册...',
    // settings menu
    'Language...':
        '语言选择...',
    'Zoom blocks...':
        '放大程序块...',
    'Blurred shadows':
        '半透明阴影',
    'uncheck to use solid drop\nshadows and highlights':
        '取消选中 降低阴影和高亮的清晰度',
    'check to use blurred drop\nshadows and highlights':
        '检测 降低阴影和高亮的模糊度',
    'Zebra coloring':
        '斑马着色',
    'check to enable alternating\ncolors for nested blocks':
        '检测 使嵌套块的颜色交换',
    'uncheck to disable alternating\ncolors for nested block':
        '取消选中 使嵌套块的颜色交换',
    'Dynamic input labels':
        '动态输入标签',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        '取消选中要禁用动态可变参数输入标签',
    '检查启用动态可变参数输入标签':
        'marcar para habilitar etiquetas\ndin\u00E1micas para entradas varidic',
    'Prefer empty slot drops':
        '喜欢减少空槽',
    'settings menu prefer empty slots hint':
        '喜欢空槽设置菜单',
    'uncheck to allow dropped\nreporters to kick out others':
        '取消选中 允许下降报告并取消其它报告',
    'Long form input dialog':
        '长形式输入对话框',
    'check to always show slot\ntypes in the input dialog':
        '检查显示插槽在输入对话框中的类型',
    'uncheck to use the input\ndialog in short form':
        '取消选择 输入窗并显示简洁对话框',
    'Virtual keyboard':
        '虚拟键盘',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        '取消选中 禁用虚拟键盘、可移动设备',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        '检查 使用虚拟键、可移动设备',
    'Input sliders':
        '输入滑块',
    'uncheck to disable\ninput sliders for\nentry fields':
        '取消选中 禁用输入滑块、输入字段',
    'check to enable\ninput sliders for\nentry fields':
        '检查 使用输入滑块、输入字段',
    'Clicking sound':
        '点击声音',
    'uncheck to turn\nblock clicking\nsound off':
        '取消选中 关闭点击程序块的声音',
    'check to turn\nblock clicking\nsound on':
        '检查 关闭点击程序块的声音',
    'Animations':
        '动画',
    'uncheck to disable\nIDE animations':
        '取消选中禁用IDE动画',
    'Turbo mode':
        'Turbo模式',
    'check to prioritize\nscript execution':
        '检查的优先执行脚本顺序',
    'uncheck to run scripts\nat normal speed':
        '取消选中正常速度运行脚本',
    'check to enable\nIDE animations':
        '检查启用IDE动画',
    'Thread safe scripts':
        '线程安全的脚本',
    'uncheck to allow\nscript reentrance':
        '取消选中 允许脚本重新载入',
    'check to disallow\nscript reentrance':
        '检查 不允许脚本重新载入',
    'Prefer smooth animations':
        '不流畅的动画',
    'uncheck for greater speed\nat variable frame rates':
        '取消选中在可变帧频更快的速度',
    'check for smooth, predictable\nanimations across computers':
        '检查是否平滑，可预见的多台电脑动画',

    // inputs
    'with inputs':
        '参数',
    'input names:':
        '参数名:',
    'Input Names:':
        '参数名:',
    'input list:':
        '输入列表:',

    // context menus:
    'help':
        '帮助',

    // blocks:
    'help...':
        '帮助...',
    'relabel...':
        '重新标记...',
    'duplicate':
        '复制',
    'make a copy\nand pick it up':
        '创建一个副本并抓起',
    'only duplicate this block':
        '只复制此块',
    'delete':
        '删除',
    'script pic...':
        '将脚本存为图像...',
    'open a new window\nwith a picture of this script':
        '新浏览窗口中打开脚本的图片',
    'ringify':
        '环',
    'unringify':
        '删除环',

    // custom blocks:
    'delete block definition...':
        '删除自定义程序块',
    'edit...':
        '编辑...',

    // sprites:
    'edit':
        '编辑',
    'export...':
        '导出...',

    'show all':
        '显示所有',
    'pic...':
        '导出图像...',
    'open a new window\nwith a picture of the stage':
        '打开一张图片舞台的新窗口，',
    // scripting area
    'clean up':
        '清除',
    'arrange scripts\nvertically':
        '整理脚本，垂直排列',
    'add comment':
        '添加注释',
    'make a block...':
        '创建程序块...',

    // costumes
    'rename':
        '重命名',
    'export':
        '导出',
    'rename costume':
        '重命名造型',

    // sounds
    'Play sound':
        '播放声音',
    'Stop sound':
        '停止声音',
    'Stop':
        '停止',
    'Play':
        '播放',
    'rename sound':
        '重命名声音',

    // dialogs
    // buttons
    'OK':
        '确定',
    'Cancel':
        '取消',
    'Yes':
        '是',
    'No':
        '否',

    // help
    'Help':
        '帮助',
    // zoom blocks
    'Zoom blocks':
        '放大程序块',
    'build':
        '建立',
    'your own':
        '你自己',
    'blocks':
        '程序块',
    'normal (1x)':
        '标准 (1x)',
    'demo (1.2x)':
        '演示 (1.2x)',
    'presentation (1.4x)':
        '演示文稿 (1.4x)',
    'big (2x)':
        '大(2x)',
    'huge (4x)':
        '超大型 (4x)',
    'giant (8x)':
        '巨人型 (8x)',
    'monstrous (10x)':
        '无敌型 (10x)',

 'Untitled':
        '无标题',
    'Open Project':
        '打开项目',
    'Open':
        '打开',
    '(empty)':
        '(空)',
    'Saved!':
        '已保存！',
    'Delete Project':
        '删除项目',
    'Are you sure you want to delete':
        '你确定要删除吗？',
    'rename...':
        '重命名...',
    // costume editor
    'Costume Editor':
        '造型编辑器',
    'click or drag crosshairs to move the rotation center':
        '点击或拖动十字准线，设置旋转中心',

    // project notes
    'Project Notes':
        '项目注释',

    // new project
    'New Project':
        '新建项目',
    'Replace the current project with a new one?':
        '你要取消当前编辑的项目，重新建立项目吗？',

    // open project
    'Open Projekt':
        '打开项目',

    // save project
    'Save Project As...':
        '项目另存为...',

    // export blocks
    'Export blocks':
        '导出程序块',
    'Import blocks':
        '导入程序块',
    'this project doesn\'t have any\ncustom global blocks yet':
        '这个项目没有包含全局性的自定义程序块',
    'select':
        '选择',
    'all':
        '全部',
    'none':
        '无',

    // variable dialog
    'for all sprites':
        '对所有的角色',
    'for this sprite only':
        '只对这个角色',

    // block dialog
    'Change block':
        '修改程序块',
    'Command':
        '命令',
    'Reporter':
        '记录',
    'Predicate':
        '谓语',

    // block editor
    'Block Editor':
        '程序块编辑器',
    'Apply':
        '应用',

    // block deletion dialog
    'Delete Custom Block':
        '删除自定义程序块',
    'block deletion dialog text':
        '你确定要删除自定义程序块及所有实例吗？',

    // input dialog
    'Create input name':
        '创建参数名',
    'Edit input name':
        '编辑参数名',
    'Edit label fragment':
        '编辑标签片段',
    'Title text':
        '标题文本',
    'Input name':
        '参数名',
    'Delete':
        '删除',
    'Object':
        '对象',
    'Number':
        '数字',
    'Text':
        '文本',
    'List':
        '链表',
    'Any type':
        '所有类型',
    'Boolean (T/F)':
        '布尔值（是/否）',
    'Command\n(inline)':
        '命令（内置）',
    'Command\n(C-shape)':
        '命令(C型)',
    'Any\n(unevaluated)':
        '任意(未评价)',
    'Boolean\n(unevaluated)':
        '布尔（评价）',
    'Single input.':
        '单一参数.',
    'Default Value:':
        '默认值:',
    'Multiple inputs (value is list of inputs)':
        '多行输入（值为参数列表）',
    'Upvar - make internal variable visible to caller':
        '上传变量 - 使内部变量对调用者可见',

    // About Snap
    'About Snap':
        '关于 Snap',
    'Back...':
        '返回...',
    'License...':
        '许可...',
    'Modules...':
        '模块...',
    'Credits...':
        '光荣榜...',
    'Translators...':
        '翻译者',
    'License':
        '许可',
    'current module versions:':
        '目前版本的模块:',
    'Contributors':
        '贡献者:',
    'Translations':
        '翻译者',

    // variable watchers
    'normal':
        '标准',
    'large':
        '大型',
    'slider':
        '滑块',
    'slider min...':
        '滑块的最小值...',
    'slider max...':
        '滑块的最大值...',
    'import...':
        '导入...',
    'Slider minimum value':
        '滑块的最小值',
    'Slider maximum value':
        '滑块的最大值',

    // list watchers
    'length: ':
        '长度: ',

    // coments
    'add comment here...':
        '在这里添加注释...',

    // drow downs
    // directions
    '(90) right':
        '(90) 右',
    '(-90) left':
        '(-90) 左',
    '(0) up':
        '(0) 上',
    '(180) right':
        '(180) 右',

    // collision detection
    'mouse-pointer':
        '鼠标指针',
    'edge':
        '边缘',
    'pen trails':
        '画笔轨迹',

    // costumes
    'Turtle':
        '海龟',

    // graphical effects
    'ghost':
        '鬼影',

    // keys
    'space':
        '空格键',
    'up arrow':
        '上移键',
    'down arrow':
        '下移键',
    'right arrow':
        '右移键',
    'left arrow':
        '左移键',
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
        '新建...',

    // math functions
    'abs':
        '绝对值',
    'sqrt':
        '平方根',
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
        '数字',
    'text':
        '文本',
    'Boolean':
        '布尔值',
    'list':
        '链表',
    'command':
        '命令',
    'reporter':
        '记录',
    'predicate':
        '谓语',

    // list indices
    'last':
        '最后',
    'any':
        '任意',

    // missing entries
    'Untitled':
        '无标题',
    'Open Project':
        '打开项目',
    'Open':
        '打开',
    '(empty)':
        '(空)',
    'Saved!':
        '已保存！',
    'Delete Project':
        '删除项目',
    'Are you sure you want to delete':
        '你确定要删除吗？',
    'unringify':
        '删除环',
    'rename...':
        '重命名为...',
    '(180) down':
        '(180) 下',
    'Ok':
        '确定'

};
