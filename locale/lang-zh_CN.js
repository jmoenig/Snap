/*
    lang-zh_CN.js
    Simplified Chinese translation for SNAP!
    written by 五百刀/邓江华/孟锡峰
    Copyright (C) 2016 by Jens Mönig
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

SnapTranslator.dict.zh_CN = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)
    Ä, ä   \u00c4, \u00e4
    Ö, ö   \u00d6, \u00f6
    Ü, ü   \u00dc, \u00fc
    ß      \u00df
*/

    // translations meta information
    'language_name':
        '简体中文',
    'language_translator':
        '五百刀/邓江华/曹儒林',
    'translator_e-mail':
        'ubertao@qq.com/djh@rhjxx.cn',
    'last_changed':
        '2020-05-13',

    // GUI
    // control bar:
    'untitled':
        '无名项目',
    'development mode':
        '开发模式',

    // categories:
    'Motion':
        '运动',
    'Looks':
        '外观',
    'Sound':
        '声音',
    'Pen':
        '画笔',
    'Control':
        '控制',
    'Sensing':
        '探测',
    'Operators':
        '运算',
    'Variables':
        '变量',
    'Lists':
        '列表',
    'Other':
        '其他',

    // editor:
    'draggable':
        '允许拖动',

    // tabs:
    'Scripts':
        '脚本',
    'Costumes':
        '造型',
    'Backgrounds':
        '背景',
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
        '添加角色',
    'add a new Turtle sprite':
        '添加一个海龟角色',
    'paint a new sprite':
        '绘制一个新角色',
    'take a camera snapshot and\nimport it as a new sprite':
        '用摄像头拍摄一个新角色',    

    // tab help
    'costumes tab help':
        '把网页或电脑中的图片拖到这里，可以添加一个造型',

    'import a sound from your computer\nby dragging it into here':
        '把电脑中的声音文件拖到这里，可以添加一个声音',

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
        '选中了舞台:\n舞台不能使用运动积木',


    'move %n steps':
        '移动 %n 歩',
    'turn %clockwise %n degrees':
        '旋转 %clockwise %n 度',
    'turn %counterclockwise %n degrees':
        '旋转 %counterclockwise %n 度',
    'point in direction %dir':
        '面向 %dir 度',
    'point towards %dst':
        '面向 %dst',
    'go to x: %n y: %n':
        '移到 x: %n y: %n',
    'go to %dst':
        '移到 %dst',
    'glide %n secs to x: %n y: %n':
        '在 %n 秒钟内滑到 x: %n y: %n',
    'change x by %n':
        '把x坐标增加 %n',
    'set x to %n':
        '把x坐标设定为 %n',
    'change y by %n':
        '把y坐标增加 %n',
    'set y to %n':
        '把y坐标设定为 %n',
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
        '换成 %cst 造型',
    'next costume':
        '下一个造型',
    'costume #':
        '造型编号',
    'new costume %l width %dim height %dim':
        '创建造型 %l 宽度 %dim 高度 %dim',
    'say %s for %n secs':
        '说 %s %n 秒',
    'say %s':
        '说 %s',
    'think %s for %n secs':
        '思考 %s %n 秒',
    'think %s':
        '思考 %s',
    'Hello!':
        '你好！',
    'Hmm...':
        '嗯……',
    '%img of costume %cst':
        '取 %img 于 %cst', 
    'pixels':
        '像素',
    'current':
        '当前造型',    
    'stretch %cst x: %n y: %n %':
        '拉伸 %cst 比例 x: %n y: %n %',               
    'change %eff effect by %n':
        '把 %eff 效果增加 %n',
    'set %eff effect to %n':
        '把 %eff 效果设定为 %n',
    'clear graphic effects':
        '清除所有图形效果',
    '%eff effect':
        '%eff 效果',        
    'change size by %n':
        '把角色的大小增加 %n',
    'set size to %n %':
        '把角色的大小设定为 %n %',
    'size':
        '大小',
    'show':
        '显示',
    'hide':
        '隐藏',
    'shown?':
        '已显示?',
    'go to %layer layer':
        '移至 %layer 层',
    'front':
        '顶',
    'back':
        '底',        
    'go back %n layers':
        '下移 %n 层',

    // development mode
    'development mode \ndebugging primitives:':
        '开发模式\n调试积木：',
    'wardrobe':
        '全部造型',
    'console log %mult%s':
        '控制台日志 %mult%s',
    'alert %mult%s':
        '警告: %mult%s',
    'save %imgsource as costume named %s':
        '把 %imgsource 保存为造型，命名为 %s',
    'stage image':
        '舞台图片',
    'jukebox':
        '全部声音',
    'processes':
        '进程数量',
    '%txtfun of %s':
        '%txtfun %s',
    'map %repRing over %l':
        'map %repRing over %l',
    'for %upvar in %l %cl':
        'for %upvar in %l %cl',
    'each item':
        '每一项',
    'show table %l':
        '显示表格 %l',
    'entering development mode.\n\nerror catching is turned off,\nuse the browser\'s web console\nto see error messages.':
        '进入开发模式。\n\n错误捕捉已关闭，请使用\n浏览器控制台查看错误消息。',
    'entering user mode':
        '进入用户模式',

    // development mode: morph context menu
    'user features...':
        '用户菜单…',
    'color...':
        '颜色…',
    'choose another color \nfor this morph':
        '指定morph的颜色',
    'transparency...':
        '透明度…',
    'set this morph\'s\nalpha value':
        '设置morph的alpha通道值',
    'resize...':
        '改变大小…',
    'show a handle\nwhich can be dragged\nto change this morph\'s extent':
        '显示一个把手，\n拖动可改变morph大小',
    'pick up':
        '抓起',
    'disattach and put \ninto the hand':
        '断开连接拿起morph',
    'attach...':
        '连接到…',
    'stick this morph\nto another one':
        '连接到另外一个morph',
    'move...':
        '移动…',
    'show a handle\nwhich can be dragged\nto move this morph':
        '显示一个把手，\n拖动可移动这个morph',
    'inspect...':
        '查看…',
    'open a window\non all properties':
        '打开新的窗口\n显示所有属性',
    'open a new window\nwith a picture of this morph': // pick up
        '打开新窗口\n展示这个morph的图片',
    'lock':
        '锁定',
    'make this morph\nunmovable':
        '固定morph不可移动',
    'unlock':
        '解锁',
    'make this morph\nmovable':
        '可以移动morph',
    'World...':
        'World…', // don't translate "World"
    'show the\nWorld\'s menu':
        '显示World菜单',
    'font size...':
        '字体大小…',
    'set this String\'s\nfont point size':
        '设置字符串的字体点数',
    'align left':
        '靠左',
    'align right':
        '靠右',
    'align center':
        '居中',
    'serif':
        '衬线字体',
    'sans-serif':
        '无衬线字体',
    'italic':
        '斜体',
    'normal style':
        '直体',
    'bold':
        '粗体',
    'normal weight':
        '正常粗细',
    'show blanks':
        '显示空格',
    'hide blanks':
        '隐藏空格',
    'hide characters':
        '隐藏字符',
    'show characters':
        '显示字符',
    'delete block':
        '删除积木',
    'spec...':
        '描述…',
    'spec':
        '描述',
    'border width...':
        '边框粗细…',
    'set the border\'s\nline size':
        '设置边框线条尺寸',
    'border color...':
        '边框颜色…',
    'set the border\'s\nline color':
        '设置边框线条颜色',
    'corner size...':
        '圆角大小…',
    'set the corner\'s\nradius':
        '设置圆角半径',
    'alpha\nvalue:':
        '透明度：',
    'color:':
        '颜色：',

    // development mode: morph inspector
    'show...':
        '显示…',
    'close':
        '关闭',
    'attributes':
        '属性',
    'methods':
        '方法',
    'mark own':
        '标记自有属性',
    'un-mark own':
        '取消自有属性标记',
    'save':
        '保存',
    'add property...':
        '增加属性…',
    'remove...':
        '删除…',
    'new property name:':
        '新属性名：',
    'property name:':
        '属性名：',
    'in new inspector...':
        '新窗口…',
    'here...':
        '此窗口…',

    // development mode: WorldMorph context menu
    'demo...':
        '演示…',
    'sample morphs':
        '各种morph示例',
    'hide all...':
        '全部隐藏…',
    'show all...':
        '全部显示…',
    'move all inside...':
        '全部围住…',
    'keep all submorphs\nwithin and visible':
        '围入所有子morph\n全部可见',
    'auto line wrap on...':
        '自动折行',
    'enable automatic\nline wrapping':
        '打开自动折行功能',
    'auto line wrap off...':
        '不自动折行',
    'turn automatic\nline wrapping\noff':
        '关闭自动折行功能',
    'screenshot...':
        '屏幕截图…',
    'restore display':
        '恢复显示',
    'redraw the\nscreen once':
        '重画屏幕',
    'fill page...':
        '填满页面…',
    'let the World automatically\nadjust to browser resizings':
        '让Wolrd随浏览器改变大小',
    'sharp shadows...':
        '锐利的阴影…',
    'sharp drop shadows\nuse for old browsers':
        '对老旧浏览器\n使用锐利的阴影',
    'blurred shadows...':
        '模糊的阴影…',
    'blurry shades,\n use for new browsers':
        '对新浏览器\n使用模糊的阴影',
    'choose the World\'s\nbackground color':
        '选择World的背景颜色',
    'touch screen settings':
        '适合触摸屏',
    'bigger menu fonts\nand sliders':
        '使用大号菜单字体和游标',
    'standard settings':
        '适合普通屏幕',
    'smaller menu fonts\nand sliders':
        '使用小号菜单字体和游标',
    'user mode...':
        '用户模式…',
    'disable developers\'\ncontext menus':
        '禁用开发者快捷菜单',
    'about morphic.js...':
        '关于morphic.js…',
    'development mode...':
        '开发者模式…',

    // development mode: World's demo context menu
    'make a morph':
        '创建morph',
    'rectangle':
        '矩形',
    'box':
        '圆角框',
    'circle box':
        '圆头框',
    'frame':
        '框架',
    'scroll frame':
        '可滚动框架',
    'handle':
        '把手',
    'string':
        '字符串',
    'speech bubble':
        '对话气泡',
    'gray scale palette':
        '灰度调色板',
    'color palette':
        '彩色调色板',
    'color picker':
        '颜色选择器',
    'sensor demo':
        '传感器演示',
    'animation demo':
        '动画演示',
    'pen':
        '画笔',

    // sound:
    'play sound %snd':
        '播放声音 %snd',
    'play sound %snd until done':
        '播放声音 %snd 直到播放完毕',
    'stop all sounds':
        '停止所有声音',     
    'rest for %n beats':
        '停止 %n 拍',
    'play sound %snd at %rate Hz':
        '播放声音 %snd 于频率 %rate 赫兹',        
    'play note %note for %n beats':
        '弹奏音符 %note 持续 %n 拍',
    '%aa of sound %snd':
        '取 %aa 于声音 %snd',
    'duration':
        '持续时间',
    'length':
        '长度',
    'number of channels':
        '通道数',
    'new sound %l rate %rate Hz':
        '创建声音 %l 频率 %rate Hz',    
    'sample rate':
        '样本频率',
    'samples':
        '样本数据',          
    'change volume by %n':
        '把音量增加 %n',
    'set volume to %n %':
        '把音量设定为 %n %',  
    'volume':
        '音量',
    'change balance by %n':
        '把声音平衡增加 %n',
    'set balance to %n':
        '设置声音平衡为 %n',
    'balance':
        '声音平衡',                       
    'set instrument to %inst':
        '将乐器设定为 %inst',
    'change tempo by %n':
        '把节奏加快 %n',
    'set tempo to %n bpm':
        '把节奏设定为 %n',
    'tempo':
        '节奏',
    'play frequency %n Hz':
        '演奏频率 %n 赫兹',
    'stop frequency':
        '停止演奏频率', 
    'play %n Hz for %n secs':
        '演奏频率 %n 赫兹 %n 秒',

    // pen:
    'clear':
        '清空',
    'pen down':
        '落笔',
    'pen down?':
        '画笔已落下?',        
    'pen up':
        '抬笔',
    'set pen color to %clr':
        '把画笔的颜色值设定为 %clr',        
    'change pen %hsva by %n':
        '把画笔的 %hsva 增加 %n',
    'set pen %hsva to %n':
        '把画笔的 %hsva 设定为 %n',        
    'hue':
        '色调',
    'transparency':
        '透明度',
    'pen %pen':
        '画笔的 %pen',        
    'change pen color by %n':
        '把画笔的颜色值增加 %n',
    'set pen color to %n':
        '把画笔的颜色值设定为 %n',
    'change pen shade by %n':
        '把画笔的色度增加 %n',
    'set pen shade to %n':
        '把画笔的色度设定为 %n',
    'change pen size by %n':
        '把画笔的大小增加 %n',
    'set pen size to %n':
        '把画笔的大小设定为 %n',
    'set background color to %clr':
        '把背景色设置为 %clr',
    'change background %hsva by %n':
        '把背景的 %hsva 增加 %n',        
    'set background %hsva to %n':
        '把背景的 %hsva 设定为 %n',        
    'stamp':
        '图章',
    'fill':
        '填充',
    'write %s size %n':
        '写字 %s 字号 %n',        
    'tip':
        '尖端',
    'middle':
        '中间',
    'paste on %spr':
        '拼贴在 %spr 上',
    'pen vectors':
        '画笔矢量',    

  // control:
    'when %greenflag clicked':
        '当 %greenflag 被点击',
    'when %keyHat key pressed':
        '当按下 %keyHat 键',
    'when I am %interaction':
        '当 %interaction 我',
    'clicked':
        '点击',
    'pressed':
        '按下',
    'dropped':
        '放下',
    'mouse-entered':
        '鼠标碰到',
    'mouse-departed':
        '鼠标离开',
    'scrolled-up':
        '向上滚动滚轮',
    'scrolled-down':
        '向下滚动滚轮',    
    'stopped':
        '停止',    
    'when %b':
        '当 %b',
    'when I receive %msgHat':
        '当接收到 %msgHat',
    'broadcast %msg':
        '广播 %msg',
    'broadcast %msg and wait':
        '广播 %msg 并等待',
    'send %msg to %spr':
        '发送消息 %msg 给 %spr',
    'Message name':
        '消息名称',
    'message':
        '消息',
    'any message':
        '任何消息',
    'wait %n secs':
        '等待 %n 秒',
    'wait until %b':
        '直到 %b 前都等待',
    'forever %loop':
        '重复执行 %loop',
    'repeat %n %loop':
        '重复执行 %n 次 %loop',
    'repeat until %b %loop':
        '重复执行直到 %b %loop',
    'for %upvar = %n to %n %cla':
        '重复执行 因子 %upvar 从 %n 到 %n %cla',        
    'if %b %c':
        '如果 %b %c',
    'if %b %c else %c':
        '如果 %b %c 否则 %c',
    'if %b then %s else %s':
        '如果 %b 返回 %s 否则 %s',        
    'report %s':
        '报告 %s',
    'stop %stopChoices':
        '停止 %stopChoices',
    'all':
        '全部',
    'this script':
        '这个脚本',
    'this block':
        '这块积木',
    'stop %stopOthersChoices':
        '停止 %stopOthersChoices',
    'all but this script':
        '所有其他脚本',
    'other scripts in sprite':
        '这个角色的其他脚本',
    'pause all %pause':
        '暂停所有的 %pause',
    'run %cmdRing %inputs':
        '运行 %cmdRing %inputs',
    'launch %cmdRing %inputs':
        '启动 %cmdRing %inputs',
    'call %repRing %inputs':
        '调用 %repRing %inputs',
    'tell %spr to %cmdRing %inputs':
        '命令 %spr 运行 %cmdRing %inputs',
    'ask %spr for %repRing %inputs':
        '请求 %spr 返回 %repRing %inputs',
    'run %cmdRing w/continuation':
        '带延续运行 %cmdRing',
    'call %cmdRing w/continuation':
        '带延续调用 %cmdRing',
    'warp %c':
        '一步完成 %c',
    'when I start as a clone':
        '当我被克隆',
    'create a clone of %cln':
        '克隆一个 %cln',
    'a new clone of %cln':
        '%cln 的一个新克隆',
    'myself':
        '自己',
    'delete this clone':
        '删除这个克隆',

    // sensing:
    'touching %col ?':
        '碰到 %col ？',
    'touching %clr ?':
        '碰到颜色 %clr ？',
    'color %clr is touching %clr ?':
        '颜色 %clr 碰到颜色 %clr ？',
    'ask %s and wait':
        '询问 %s 并等待',
    'what\'s your name?':
        '你的名字？',
    'answer':
        '回答',
    'mouse x':
        '鼠标的x坐标',
    'mouse y':
        '鼠标的y坐标',
    'mouse down?':
        '按下了鼠标？',
    'key %key pressed?':
        '按下了 %key 键？',
    '%rel to %dst':
        '%rel 到 %dst',    
    '%asp at %loc' :
        '%asp 于 %loc',    
    'sprites':
        '角色',
    'object %self':
        '对象 %self',                
    'distance to %dst':
        '到 %dst 的距离',
    'distance':
    	'距离',
    'reset timer':
        '计时器归零',
    'timer':
        '计时器',
    '%att of %spr':
        '取 %att 于 %spr',
    'my %get':
        '我的 %get',
    'http:// %s':
        'http:// %s',
    'turbo mode?':
        '启动了加速模式？',
    'set turbo mode to %b':
        '设置加速模式为 %b',

    'filtered for %clr':
        '用 %clr 过滤造型',
    'stack size':
        '堆栈大小',
    'frames':
        '栈帧层数',

    'current %dates':
        '当前的 %dates',
    'year':
        '年份',
    'month':
        '月份',
    'date':
        '日期',
    'hour':
        '钟点',
    'minute':
        '分钟',
    'second':
        '秒钟',
    'time in milliseconds':
        '毫秒',
    'day of week':
        '星期几',
    'to':
        '到',
    'at':
        '于',
    'microphone %audio':
        '麦克风 %audio',   
    'Microphone resolution...':
        '麦克风分辨率...',
    'Microphone':
        '麦克风',
    'low':
        '低',
    'high':
        '高',
    'max':
        '最大',    
    'note':
        '音符',
    'frequency':
        '频率',
    'spectrum':
        '声谱',
    'resolution':
        '分辨率',
    'video %vid on %self':
        '视频 %vid 对 %self',
    'snap':
        '快照',
    'motion':
        '动作',
    'set video transparency to %n':
        '把视频透明度设置为 %n',       
    'is %setting on?':
        '%setting 已启用?',
    'set %setting to %b':
        '设置 %setting 为 %b',        
    'turbo mode':
        '加速模式',
    'flat line ends':
        '平头线条',
    'video capture':
        '视频捕捉',     
    'mirror video':
        '视频镜像',      
    'frames':
        '帧',    
    'log pen vectors':
        '记录画笔矢量',    

    // operators:
    '%n mod %n':
        '%n 除以 %n 的余数',
    'round %n':
        '把 %n 四舍五入',
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
        '真',
    'false':
        '假',
    'join %words':
        '把 %words 连起来',
    'split %s by %delim':
        '把 %s 按 %delim 分开',
    'hello':
        '你好',
    'world':
        '世界',
    'letter %idx of %s':
        '第 %idx 个字符在文字 %s 中',
    'length of %s':
        '%s 的长度',
    'unicode of %s':
        '字符 %s 的Unicode码',
    'unicode %n as letter':
        'Unicode码为 %n 的字符',
    'is %s a %typ ?':
        '%s 的类型是 %typ 吗？',
    'is %s identical to %s ?':
        '%s 与 %s 是相同的？',

    'type of %s':
        '%s 的类型',

    // variables:
    'Make a variable':
        '新建一个变量',
    'Variable name':
        '变量名',
    'Script variable name':
        '脚本变量名',
    'inherit %shd':
        '继承 %shd',
    'Delete a variable':
        '删除变量',

    'set %var to %s':
        '把 %var 设定为 %s',
    'change %var by %n':
        '把 %var 增加 %n',
    'show variable %var':
        '显示变量 %var',
    'hide variable %var':
        '隐藏变量 %var',
    'script variables %scriptVars':
        '脚本变量 %scriptVars',

    // lists:
    'list %exp':
        '列表 %exp',
    '%s in front of %l':
        '%s 放在 %l 前面',
    'item %idx of %l':
        '第 %idx 项 %l',
    'all but first of %l':
        '%l 第一项以外',
    'length of %l':
        '%l 的长度',
    '%l contains %s':
        '%l 含有 %s',
    'thing':
        '东西',
    'add %s to %l':
        '把 %s 放到 %l 后面',
    'delete %ida of %l':
        '删除第 %ida 项 %l',
    'insert %s at %idx of %l':
        '把 %s 插入到第 %idx 项 %l',
    'replace item %idx of %l with %s':
        '把第 %idx 项 %l 替换为 %s',
    'numbers from %n to %n':
        '从 %n 到 %n 的数字',
    'is %l empty?':
        '%l 为空?',
    'map %repRing over %l':
        '映射 %repRing ，来源 %l', 
    'keep items %predRing from %l':
        '保留满足条件 %predRing 的数据,来源 %l',  
    'find first item %predRing in %l':
        '满足条件 %predRing 的第一个数据,来源 %l',    
    'combine %l using %repRing':
        '合并 %l 方法为 %repRing',      
    'for each %upvar in %l %cla':
        '逐个执行 %upvar 来自 %l %cla',
    'item':
        '项',                                      

    // other
    'Make a block':
        '制作积木',

    // menus
    // snap menu
    'About...':
        '关于Snap!…',
    'Reference manual':
        '参考手册',
    'Snap! website':
        '官方网站',
    'Download source':
        '下载源代码',
    'Camera support':
        '支持摄像头支持',
    'Switch back to user mode':
        '回到用户模式',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        '禁用Morphic快捷菜单\n显示正常的用户界面',
    'Switch to dev mode':
        '切换到开发者模式',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        '启用Morphic快捷菜单和查看器\n对用户不友好',

    // project menu
    'Project notes...':
        '项目备注…',
    'New':
        '新建',
    'Open...':
        '打开…',
    'Save':
        '保存',
    'Save to disk':
        '存盘',
    'store this project\nin the downloads folder\n(in supporting browsers)':
        '保存到下载文件夹\n（部分浏览器支持）',

    'Save As...':
        '另存为…',
    'Import...':
        '导入…',
    'file menu import hint':
        '加载导出的项目、积木库、造型或声音',


    'Export project as plain text...':
        '用文字格式导出项目…',
    'Export project...':
        '导出项目…',
    '(in a new window)':
        '（打开新窗口）',
    'save project data as XML\nto your downloads folder':
        '把项目数据以XML格式\n保存到下载文件夹',
    'show project data as XML\nin a new browser window':
        '打开新窗口，展示项目的XML数据',
    'Export Project As...':
        '把项目导出到…',
    'Exported!':
        '导出好了！',
    'Export blocks...':
        '导出积木…',
    'show global custom block definitions as XML\nin a new browser window':
        '打开新窗口，以XML格式展示全局自制积木',
    'Unused blocks...':
        '没用到的积木…',
    'find unused global custom blocks\nand remove their definitions':
        '查找没用到的全局自制积木，\n删除它们的定义',
    'Remove unused blocks':
        '删除没用到的积木',
    'there are currently no unused\nglobal custom blocks in this project':
        '这个项目里目前没有\n没用到的全局自制积木',
    'unused block(s) removed':
        '删掉了没用到的积木',
    'Export summary...':
        '以HTML格式导出项目',
    'open a new browser browser window\n with a summary of this project':
        '打开新窗口，展示这个项目',
    'Export summary with drop-shadows...':
        '以HTML格式导出项目（带阴影）…',
    'open a new browser browser window\nwith a summary of this project\nwith drop-shadows on all pictures.\nnot supported by all browsers':
        '打开新窗口，使用带有阴影的图形\n展示这个项目\n（只有部分浏览器可以）',

    'Contents':
        '内容',
    'Kind of':
        '类型：',
    'Part of':
        '属于：',
    'Parts':
        '组件',
    'Blocks':
        '积木',
    'For all Sprites':
        '对所有角色',
    'Import tools':
        '导入工具包',
    'load the official library of\npowerful blocks':
        '载入强大的官方积木库',
    'Libraries...':
        '积木库…',
    'Select categories of additional blocks to add to this project.':
        '挑选更多积木，添加到项目中。',
    'Select a costume from the media library':
        '从媒体库中挑选一个造型',
    'Select a sound from the media library':
        '从媒体库中挑选一个声音',
    'Import':
        '导入',
    'Import library':
        '导入积木库',
    'Backgrounds':
        '背景',

    // cloud menu
    'Login...':
        '登录…',
    'Signup...':
        '注册…',
    'Reset Password...':
        '重设密码…',
    'Logout':
        '登出',
    'Change Password...':
        '修改密码…',
    'Change Password':
        '修改密码',
    'password has been changed.':
        '密码改好了。',
    'Export all scripts as pic...':
        '把所有脚本导出为图片…',
    'show a picture of all scripts\nand block definitions':
        '把所有脚本展示成一张图片',
    'url...':
        '网址…',
    'Service:':
        '服务：',
    'Reset Password':
        '重设密码',
    'An e-mail with a link to\nreset your password\nhas been sent to the address provided':
        '重设密码的网址已发往你的电子邮件地址',
    'Signup':
        '注册',
    'export project media only...':
        '仅导出项目中的媒体文件…',
    'export project without media...':
        '导出项目，不含媒体…',
    'export project as cloud data...':
        '把项目以云端数据格式导出…',
    'open shared project from cloud...':
        '打开共享在云端的项目…',

    // Sign up dialog
    'Sign up':
        '注册',
    'User name:':
        '用户名：',
    'Birth date:':
        '出生日期：',
    'year:':
        '年：',
    'E-mail address:':
        '电子邮件：',
    'E-mail address of parent or guardian:':
        '家长电子邮件：',
    'Terms of Service...':
        '服务条款…',
    'Privacy...':
        '隐私政策…',
    'I have read and agree\nto the Terms of Service':
        '我已阅读并同意《服务条款》',
    'January':
        '一月',
    'February':
        '二月',
    'March':
        '三月',
    'April':
        '四月',
    'May':
        '五月',
    'June':
        '六月',
    'July':
        '七月',
    'August':
        '八月',
    'September':
        '九月',
    'October':
        '十月',
    'November':
        '十一月',
    'December':
        '十二月',
    'or before':
        '或更早',
    'please fill out\nthis field':
        '请填写这里',
    'User name must be four\ncharacters or longer':
        '用户名不能少于4个字符',
    'please provide a valid\nemail address':
        '请填写有效的电子邮件地址',
    'password must be six\ncharacters or longer':
        '密码不能少于6个字符',
    'passwords do\nnot match':
        '两次填写的密码不一致',
    'please agree to\nthe TOS':
        '请同意《服务条款》',
    'Sign in':
        '登录',
    'Password:':
        '密码：',
    'stay signed in on this computer\nuntil logging out':
        '保持登录，直到登出',
    'Reset password':
        '重设密码',
    'could not connect to:':
        '连不上这个网站：',
    'now connected.':
        '已经登录到云端。',
    'disconnected.':
        '已经从云端登出。',
    'Old password:':
        '老密码：',
    'New password:':
        '新密码：',
    'Repeat new password:':
        '重复一遍新密码：',

    // settings menu
    'Language...':
        '语言…',
    'Zoom blocks...':
        '放大积木…',
    'Stage size...':
        '舞台大小…',
    'Stage size':
        '舞台大小',
    'Stage width':
        '舞台宽度',
    'Stage height':
        '舞台高度',
    'Default':
        '默认',
    'Blurred shadows':
        '半透明阴影',
    'uncheck to use solid drop\nshadows and highlights':
        '使用不透明的阴影和加亮',
    'check to use blurred drop\nshadows and highlights':
        '使用透明的阴影和加亮',
    'Zebra coloring':
        '积木颜色相间',
    'check to enable alternating\ncolors for nested blocks':
        '使用深浅相间的颜色\n显示嵌套的同类积木',
    'uncheck to disable alternating\ncolors for nested block':
        '使用同样的颜色\n显示嵌套的同类积木',
    'Dynamic input labels':
        '动态输入标记',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        '可变输入项不使用动态标记',
    'check to enable dynamic\nlabels for variadic inputs':
        '可变输入项使用动态标记',
    'Prefer empty slot drops':
        '只放空白项',
    'settings menu prefer empty slots hint':
        '“报告积木”优先\n放在没有积木的输入项上',
    'uncheck to allow dropped\nreporters to kick out others':
        '“报告积木”可以\n替换输入项上已有的积木',
    'Long form input dialog':
        '输入类型说明',
    'check to always show slot\ntypes in the input dialog':
        '在输入项对话框里显示类型说明',
    'uncheck to use the input\ndialog in short form':
        '显示简洁的输入项对话框',
    'Plain prototype labels':
        '简洁的设计图',
    'uncheck to always show (+) symbols\nin block prototype labels':
        '在积木设计图上显示(+)号',
    'check to hide (+) symbols\nin block prototype labels':
        '不在积木设计图上显示(+)号',
    'Virtual keyboard':
        '虚拟键盘',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        '不使用移动设备的虚拟键盘',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        '使用移动设备的虚拟键盘',
    'Input sliders':
        '使用游标',
    'uncheck to disable\ninput sliders for\nentry fields':
        '不使用游标修改输入字段',
    'check to enable\ninput sliders for\nentry fields':
        '使用游标修改输入字段',
    'Execute on slider change':
        '游标改变时运行脚本',
    'uncheck to supress\nrunning scripts\nwhen moving the slider':
        '滑动游标时暂停运行脚本',
    'check to run\nthe edited script\nwhen moving the slider':
        '滑动游标时运行改变的脚本',
    'Clicking sound':
        '点击音效',
    'uncheck to turn\nblock clicking\nsound off':
        '点击积木时不发出声音',
    'check to turn\nblock clicking\nsound on':
        '点击积木发出声音',
    'Animations':
        '动画',
    'uncheck to disable\nIDE animations':
        '不显示编辑器动画效果',
    'Turbo mode':
        '加速模式',
    'check to prioritize\nscript execution':
        '加速脚本运行',
    'uncheck to run scripts\nat normal speed':
        '正常速度运行脚本',
    'check to enable\nIDE animations':
        '显示编辑器动画效果',
    'Flat design':
        '扁平外观',
    'check for alternative\nGUI design':
        '使用扁平风格的用户界面',
    'uncheck for default\nGUI design':
        '使用默认的用户界面',
    'Keyboard Editing':
        '键盘编辑',
    'uncheck to disable\nkeyboard editing support':
        '不使用键盘编辑',
    'check to enable\nkeyboard editing support':
        '使用键盘编辑',
    'Table support':
        '使用表格功能',
    'uncheck to disable\nmulti-column list views':
        '不使用多栏(如2维)列表',
    'check for multi-column\nlist view support':
        '使用多栏(如2维)列表',
    'Table lines':
        '表格线',
    'uncheck for less contrast\nmulti-column list views':
        '浅色表格线',
    'check for higher contrast\ntable views':
        '深色表格线',
    'Visible stepping':
        '可视化单步运行',    
    'Thread safe scripts':
        '线程安全的脚本',
    'uncheck to allow\nscript reentrance':
        '允许脚本重入',
    'check to disallow\nscript reentrance':
        '不允许脚本重入',
    'Prefer smooth animations':
        '动画尽可能平滑',
    'uncheck for greater speed\nat variable frame rates':
        '改变帧率保证播放速度\n(牺牲平滑程度)',
    'check for smooth, predictable\nanimations across computers':
        '平滑地显示动画\n(牺牲播放速度)',
    'Flat line ends':
        '平头线条',
    'check for flat ends of lines':
        '线条的端点是平的',
    'uncheck for round ends of lines':
        '线条的端点是圆的',
    'Codification support':
        '转换成代码',
    'uncheck to disable\nblock to text mapping features':
        '关闭积木转文字的功能',
    'check for block\nto text mapping features':
        '打开积木转文字的功能',
    'Inheritance support':
        '支持继承',
    'uncheck to disable\nsprite inheritance features':
        '角色不可以继承',
    'check for sprite\ninheritance features':
        '角色可以继承',
    'Sprite Nesting':
        '角色组合',
    'check to enable\nsprite composition':
        '允许角色组合',
    'uncheck to disable\nsprite composition':
        '不允许角色组合',
    'First-Class Sprites':
        '高等角色',
    'uncheck to disable support\nfor first-class sprites':
        '不使用高等角色',
    'check to enable support\n for first-class sprite':
        '使用高等角色',
    'Dragging threshold...':
        '拖放最小距离…',
    'specify the distance the hand has to move\nbefore it picks up an object':
        '要抓起东西\n鼠标需要移动的最小距离',
    'Cache Inputs':
        '缓存输入数据',
    'uncheck to stop caching\ninputs (for debugging the evaluator)':
        '不缓存输入数据\n（以便调试求值过程）',
    'check to cache inputs\nboosts recursion':
        '缓存输入数据\n递归速度更快',
    'Project URLs':
        '项目网址',
    'check to enable\nproject data in URLs':
        '网址携带项目数据',
    'uncheck to disable\nproject data in URLs':
        '网址不携带项目数据',
    'Rasterize SVGs':
        'SVG点阵化',
    'uncheck for smooth\nscaling of vector costumes':
        '矢量造型平滑缩放',
    'check to rasterize\nSVGs on import':
        '导入SVG时把它点阵化',
    'Persist linked sublist IDs':
        '保存子列表ID',
    'uncheck to disable\nsaving linked sublist identities':
        '不保存子列表的ID',
    'check to enable\nsaving linked sublist identities':
        '保存子列表的ID',
    // inputs
    'with inputs':
        '输入项',
    'input names:':
        '输入项：',
    'Input Names:':
        '输入项：',
    'input list:':
        '输入列表：',
    'options...':
        '选项…',
    'read-only':
        '只读',
    'Input Slot Options':
        '输入项选项',
    'Enter one option per line.Optionally use "=" as key/value delimiter\ne.g.\n   the answer=42':
        '每行一个选项。可使用“=”作为键和值的分隔符。例如：\n　　　　答案=42',
    // context menus:
    'help':
        '帮助',

    // palette:
    'hide primitives':
        '隐藏原始积木',
    'show primitives':
        '显示原始积木',
    'header mapping...':
        '对应的定义代码…',
    'code mapping...':
        '对应的调用代码…',
    'code list mapping...':
        '列表对应的代码…',
    'code item mapping...':
        '列表项对应的代码…',
    'code delimiter mapping...':
        '列表项分隔符对应的代码…',

    // codification dialog:
    'Header mapping':
        '对应的定义代码',
    'Code mapping':
        '对应的调用代码',
    'Code mapping - ':
        '对应的代码 -',
    'Code mapping - String <#1>':
        '对应的代码 - 字符串 <#1>',
    'Code mapping - list contents <#1>':
        '对应的代码 - 列表内容 <#1>',
    'Code mapping - list item <#1>':
        '对应的代码 - 列表项',
    'Code mapping - list item delimiter':
        '对应的代码 - 列表项分隔符',
    'Enter code that corresponds to the block\'s definition. Use the formal parameter\nnames as shown and <body> to reference the definition body\'s generated text code.':
        '输入积木对应的定义/实现部分代码。\n使用上图所示的形参名，使用<body>来引用积木的定义。',
    'Enter code that corresponds to the block\'s definition. Choose your own\nformal parameter names (ignoring the ones shown).':
        '输入积木对应的定义/实现部分代码。\n使用自己选择的形参名字（忽略上图所示的形参名）。',
    'Enter code that corresponds to the block\'s operation (usually a single\nfunction invocation). Use <#n> to reference actual arguments as shown.':
        '输入积木对应的调用代码。\n用<#n>来引用上图所示的实参。',

    // codification blocks
    'map %cmdRing to %codeKind %code':
        '把 %cmdRing 转换成 %codeKind %code',
    'map String to code %code':
        '把字符串转成代码 %code',
    'map %codeListPart of %codeListKind to code %code':
        '把 %codeListKind 的 %codeListPart 转成代码 %code',
    'code of %cmdRing':
        '%cmdRing 的代码',
    'item':
        '项',
    'delimiter':
        '分隔符',
    'collection':
        '集合',
    'variables':
        '变量',
    'parameters':
        '参数',
    'code':
        '调用代码',
    'header':
        '定义代码',
    'code string mapping...':
        '字符串对应的代码…',
    // sprites:
    'parent:':
        '母角色：',
    'parent...':
        '母角色…',
    'current parent':
        '目前的母角色',

    // blocks:
    'help...':
        '帮助…',
    'relabel...':
        '更换…',
    'duplicate':
        '复制',
    'make a copy\nand pick it up':
        '复制并抓起这个积木',
    'only duplicate this block':
        '复制单个积木',
    'delete':
        '删除',
    'script pic...':
        '显示脚本图片…',
    'open a new window\nwith a picture of this script':
        '打开一个新窗口，\n显示这个脚本的图片',
    'script pic with result...':
        '带结果的脚本图片…',
    'open a new window\nwith a picture of both\nthis script and its result':
        '打开一个新窗口，\n显示这个脚本和运行结果的图片',
    'ringify':
        '加上环',
    'unringify':
        '去掉环',
    'transient':
        '不记录',
    'uncheck to save contents\nin the project':
        '把变量内容保存在项目里',
    'check to prevent contents\nfrom being saved':
        '不保存变量内容',
    'find blocks...':
        '找积木…',

    // custom blocks:
    'delete block definition...':
        '删除积木定义…',
    'duplicate block definition...':
        '复制积木定义…',
    'edit...':
        '编辑…',

    // sprites:
    'edit':
        '编辑',
    'move':
        '移动',
    'detach from':
        '脱离',
    'detach all parts':
        '所有组件脱离',
    'export...':
        '导出…',
    'paint a new sprite':
        '画一个新角色',

    // stage:
    'show all':
        '显示所有',
    'pic...':
        '展示图片…',
    'open a new window\nwith a picture of the stage':
        '打开一个新窗口，显示舞台的图片',
    'turn pen trails into new costume...':
        '把笔迹变成新造型…',
    'turn all pen trails and stamps\ninto a new costume for the\ncurrently selected sprite':
        '把所有笔迹和图章变成当前选中角色的一个新造型',

    // scripting area
    'clean up':
        '整理',
    'arrange scripts\nvertically':
        '垂直排列脚本',
    'add comment':
        '添加说明',
    'undrop':
        '收回积木',
    'undo the last\nblock drop\nin this pane':
        '收回刚刚放下的积木',
    'scripts pic...':
        '脚本图片…',
    'open a new window\nwith a picture of all scripts':
        '打开一个新窗口，展示所有脚本的图片',
    'make a block...':
        '制作新积木…',

    // costumes
    'rename':
        '改名',
    'export':
        '导出',
    'rename costume':
        '给造型改名',
    'Paint a new costume':
        '画一个新造型',
    'edit rotation point only...':
        '修改旋转中心点…',

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
        '给声音改名',

    // lists and tables
    'list view...':
        '展示为列表…',
    'table view...':
        '展示为表格…',
    'open in dialog...':
        '在对话框中查看…',
    'open in another dialog...':
        '在另一个对话框中查看…',
    'reset columns':
        '重置列',
    'items':
        '项',
    'Table view':
        '查看表格',

    // dialogs
    // buttons
    'OK':
        '确定',
    'Ok':
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
        '放大积木',
    'build':
        '建立',
    'your own':
        '你自己',
    'blocks':
        '积木',
    'normal (1x)':
        '标准 (1x)',
    'demo (1.2x)':
        '演示 (1.2倍)',
    'presentation (1.4x)':
        '幻灯片 (1.4x)',
    'big (2x)':
        '大(2x)',
    'huge (4x)':
        '超大 (4x)',
    'giant (8x)':
        '巨大 (8x)',
    'monstrous (10x)':
        '最大 (10x)',

    // Project Manager
    'Untitled':
        '无名项目',
    'Open Project':
        '打开项目',
    '(empty)':
        '(空)',
    'Saved!':
        '已保存！',
    'Delete Project':
        '删除项目',
    'Are you sure you want to delete':
        '你确定要删除',
    'rename...':
        '改名为…',
    'Open':
        '打开',
    'Cloud':
        '云端',
    'Snap!Cloud':
        'Snap！云端',
    'Browser':
        '浏览器',
    'Examples':
        '例子',
    'You are not logged in':
        '你还没有登录',
    'Updating\nproject list...':
        '正在更新项目列表…',
    'last changed':
        '最后修改',
    'Share':
        '分享',
    'Unshare':
        '不分享',
    'Share Project':
        '分享项目',
    'Unshare Project':
        '不分享项目',
    'Are you sure you want to publish':
        '确定让其他人看到项目',
    'Are you sure you want to unpublish':
        '确定不让其他人看到项目',
    'sharing\nproject...':
        '正在分享项目…',
    'shared.':
        '项目已分享给其他人。',
    'unsharing\nproject...':
        '正在取消项目分享…',
    'unshared.':
        '其他人已看不到项目。',
    'Fetching project\nfrom the cloud...':
        '从云端下载下项目…',
    'Opening project...':
        '正在打开项目…',
    'Save Project':
        '保存项目…',
    'Saving project\nto the cloud...':
        '把项目保存到云端…',
    'saved.':
        '项目已保存。',

    // costume editor
    'Costume Editor':
        '造型编辑器',
    'click or drag crosshairs to move the rotation center':
        '点击或拖动准星，设置旋转中心点',

    // project notes
    'Project Notes':
        '项目备注',

    // new project
    'New Project':
        '新建项目',
    'Replace the current project with a new one?':
        '你要放弃正在编辑的项目，重新开始吗？',

    // save project
    'Save Project As...':
        '项目另存为…',

    // export blocks
    'Export blocks':
        '导出积木',
    'Import blocks':
        '导入积木',
    'this project doesn\'t have any\ncustom global blocks yet':
        '这个项目没有包含全局性的自制积木',
    'select':
        '选择',
    'none':
        '无',

    // variable dialog
    'for all sprites':
        '给所有角色用',
    'for this sprite only':
        '给这个角色用',

    // block dialog
    'Change block':
        '修改积木',
    'Command':
        '命令',
    'Reporter':
        '报告',
    'Predicate':
        '谓语',

    // block editor
    'Block Editor':
        '积木编辑器',
    'Apply':
        '应用',

    // block deletion dialog
    'Delete Custom Block':
        '删除自制积木',
    'block deletion dialog text':
        '你确实要删除所有这种自制积木和它的定义吗？',
    'block variables...':
        '积木变量…',
    'block variables':
        '积木变量',
    'Block variable name':
        '积木变量名字',
    'remove block variables...':
        '删除积木变量…',
    '(temporary)':
        '(临时)',

    // input dialog
    'Create input name':
        '创建输入项',
    'Edit input name':
        '编辑输入项',
    'Edit label fragment':
        '编辑标签片段',
    'Title text':
        '标题文本',
    'Input name':
        '输入项',
    'Delete':
        '删除',
    'Object':
        '对象',
    'Number':
        '数字',
    'Text':
        '文本',
    'List':
        '列表',
    'Any type':
        '任一类型',
    'Boolean (T/F)':
        '布尔（真/假）',
    'Command\n(inline)':
        '命令（嵌入）',
    'Command\n(C-shape)':
        '命令（C型）',
    'Any\n(unevaluated)':
        '任意（不计算）',
    'Boolean\n(unevaluated)':
        '布尔（不计算）',
    'Single input.':
        '输入单个值。',
    'Default Value:':
        '默认值：',
    'Multiple inputs (value is list of inputs)':
        '输入多个值（列表）',
    'Upvar - make internal variable visible to caller':
        '回传变量 - 让调用者可以使用这个变量',

    // About Snap
    'About Snap':
        '关于 Snap',
    'Back...':
        '返回…',
    'License...':
        '许可…',
    'Modules...':
        '模块…',
    'Credits...':
        '光荣榜…',
    'Translators...':
        '翻译者…',
    'License':
        '许可协议',
    'current module versions:':
        '目前模块的版本：',
    'Contributors':
        '贡献者：',
    'Translations':
        '翻译者',

    // variable watchers
    'normal':
        '标准',
    'large':
        '大型',
    'slider':
        '游标',
    'slider min...':
        '游标最小值…',
    'slider max...':
        '游标最大值…',
    'import...':
        '导入…',
    'Slider minimum value':
        '游标的最小值',
    'Slider maximum value':
        '游标的最大值',

    // list watchers
    'length: ':
        '长度：',

    // comments
    'add comment here...':
        '在这里添加说明…',
    'comment pic...':
        '展示图片…',
    'open a new window\nwith a picture of this comment':
        '打开新窗口，展示这条说明的图片',

    // drow downs
    // directions
    '(90) right':
        '右(90)',
    '(-90) left':
        '左(-90)',
    '(0) up':
        '上(0)',
    '(180) down':
        '下(180)',
    'random':
        '任意',
    'distance':
        '距离',

    // collision detection
    'mouse-pointer':
        '鼠标指针',
    'random position':
        '任意位置',
    'center':
        '舞台中心',
    'edge':
        '边缘',
    'pen trails':
        '画笔轨迹',

    // costumes
    'Turtle':
        '海龟',
    'Empty':
        '空白',

    // graphical effects
    'color':
        '色彩',
    'fisheye':
        '鱼眼',
    'whirl':
        '旋转',
    'pixelate':
        '像素化',
    'mosaic':
        '马赛克',
    'saturation':
        '饱和',
    'brightness':
        '亮度',
    'ghost':
        '透明',
    'negative':
        '底片',
    'comic':
        '漫画',
    'confetti':
        '彩纸',

    // keys
    'space':
        '空格',
    'up arrow':
        '↑',
    'down arrow':
        '↓',
    'right arrow':
        '→',
    'left arrow':
        '←',
    'any key':
        '任意',
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
        '新建…',

    // math functions
    'abs':
        '绝对值',
    'ceiling':
        '向上取整',
    'floor':
        '向下取整',
    'sqrt':
        '平方根',
    'sin':
        '正弦',
    'cos':
        '余弦',
    'tan':
        '正切',
    'asin':
        '反正弦',
    'acos':
        '反余弦',
    'atan':
        '反正切',
    'ln':
        '自然对数',
    'e^':
        'e^',

    // delimiters
    'character':
        '字符',
    'letter':
        '字母',
    'whitespace':
        '空符',
    'line':
        '行',
    'tab':
        '制表符',
    'cr':
        '回车',

    // data types
    'number':
        '数字',
    'text':
        '文字',
    'Boolean':
        '布尔',
    'list':
        '列表',
    'command':
        '命令',
    'reporter':
        '记录',
    'predicate':
        '判断',
    'sprite':
        '角色',

    // list indices
    'last':
        '最后',
    'any':
        '任意',

    // attributes
    'neighbors':
        '邻居',
    'self':
        '本身',
    'other sprites':
        '其他角色',
    'parts':
        '组件',
    'anchor':
        '组合母体',
    'parent':
        '母角色',
    'children':
        '子角色',
    'clones':
        '克隆',
    'other clones':
        '其他克隆',
    'costumes':
        '造型',
    'sounds':
        '声音',
    'dangling?':
        '是否悬垂？',
    'rotation x':
        '旋转点x坐标',
    'rotation y':
        '旋转点y坐标',
    'center x':
        '中心点x坐标',
    'center y':
        '中心店y坐标',
    'pen is down?':
        '画笔已落下？',
    'name':
        '名字',
    'stage':
        '舞台',
    'width':
        '宽度',
    'height':
        '高度',
                
    // Paint.js
    'Paint Editor':
        '画板',
    'undo':
        '撤销',
    'Paintbrush tool\n(free draw)':
        '画笔(鼠标作画)',
    'Stroked Rectangle\n(shift: square)':
        '矩形框\n(shift: 正方形)',
    'Stroked Ellipse\n(shift: circle)':
        '椭圆\n(shift: 圆)',
    'Eraser tool':
        '橡皮',
    'Set the rotation center':
        '设定旋转中心点',
    'Line tool\n(shift: vertical/horizontal)':
        '直线\n(shift: 垂直或水平)',
    'Filled Rectangle\n(shift: square)':
        '实心矩形\n(shift: 正方形)',
    'Filled Ellipse\n(shift: circle)':
        '实心椭圆\n(shift: 圆)',
    'Fill a region':
        '涂满一个区域',
    'Pipette tool\n(pick a color anywhere)':
        '滴管\n(从屏幕上选一个颜色)',
    'grow':
        '增大',
    'shrink':
        '减小',
    'flip \u2194':
        '↔ 翻',
    'flip \u2195':
        '↕ 翻',
    'Brush size':
        '画笔粗细',
    'Constrain proportions of shapes?\n(you can also hold shift)':
        '只画正方形/圆形/垂直或水平线\n(相当于按住shift键)',

    // thread.js
    'a variable of name \'':
        '这个上下文中不存在“',
    '\'\ndoes not exist in this context':
        '”这个变量',
    'expecting':
        '此处要求填写',
    'input(s), but getting':
        '个输入项，但实际得到输入项个数是',    		
    'Vector':
        '矢量',
    'Bitmap':
        '位图'        

};
