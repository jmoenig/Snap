/*

	lang-zh_TW.js

	Traditional Chinese translation for SNAP!
	SNAP 繁體中文翻譯版

	written by chu-chung Huang

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

SnapTranslator.dict.zh_TW = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    Ä, ä   \u00c4, \u00e4
    Ö, ö   \u00d6, \u00f6
    Ü, ü   \u00dc, \u00fc
    ß      \u00df
*/

    // translations meta information
    'language_name':
        '繁體中文', // the name as it should appear in the language menu
    'language_translator':
        'cch', // your name for the Translators tab
    'translator_e-mail':
        'cchuang2009@gmail.com', // optional
    'last_changed':
        '2013-8-14', // this, too, will appear in the Translators tab

    // GUI
    // control bar:
    'untitled':
        '無標題',
    'development mode':
        '開發模式',

    // categories:
    'Motion':
        '動作',
    'Looks':
        '外觀',
    'Sound':
        '聲音',
    'Pen':
        '畫筆',
    'Control':
        '控制',
    'Sensing':
        '偵測',
    'Operators':
        '運算',
    'Variables':
        '變數',
    'Lists':
        '鏈表',
    'Other':
        '其他',

    // editor:
    'draggable':
        '可拖動',

    // tabs:
    'Scripts':
        '腳本',
    'Costumes':
        '造型',
    'Sounds':
        '聲音',

    // names:
    'Sprite':
        '角色',
    'Stage':
        '舞臺',

    // rotation styles:
    'don\'t rotate':
        '不能旋轉',
    'can rotate':
        '可以旋轉',
    'only face left/right':
        '只能左右翻轉',

    // new sprite button:
    'add a new sprite':
        '新增角色',

    // tab help
    'costumes tab help':
        '造型選卡幫助\n要使用另外網站上的圖片或電腦中的圖像'
            + '只需拖到圖像到這裏即可',
    'import a sound from your computer\nby dragging it into here':
        '從電腦中導入音效檔案\n只需拖動音效檔案到這裏即可',

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
        '舞臺選擇:\n沒有動作程式語言',

    'move %n steps':
        '移動 %n 歩',
    'turn %clockwise %n degrees':
        '順時鐘旋轉 %clockwise %n 度',
    'turn %counterclockwise %n degrees':
        '逆時鐘旋轉 %counterclockwise %n 度',
    'point in direction %dir':
        '面向 %dir 度',
    'point towards %dst':
        '面向 %dst ',
    'go to x: %n y: %n':
        '移到 x: %n  y: %n ',
    'go to %dst':
        '移到 %dst ',
    'glide %n secs to x: %n y: %n':
        ' %n 秒內，移到 x: %n y: %n ',
    'change x by %n':
        '增加 x 座標 %n ',
    'set x to %n':
        '設定 x 座標為 %n ',
    'change y by %n':
        '增加 y 座標 %n ',
    'set y to %n':
        '設定 y 座標為 %n ',
    'if on edge, bounce':
        '碰到邊緣就反彈',
    'x position':
        'x 座標',
    'y position':
        'y 座標',
    'direction':
        '方向',

    // looks:
    'switch to costume %cst':
        '切換到造型 %cst ',
    'next costume':
        '下一個造型',
    'costume #':
        '造型編號',
    'say %s for %n secs':
        '說 %s  %n 秒',
    'say %s':
        '說 %s ',
    'think %s for %n secs':
        '思考 %s  %n 秒',
    'think %s':
        '思考 %s ',
    'Hello!':
        '你好！',
    'Hmm...':
        '嗯...',
    'change %eff effect by %n':
        '將 %eff 特效增加 %n ',
    'set %eff effect to %n':
        '將 %eff 特效設定為 %n ',
    'clear graphic effects':
        '清除所有圖形特效',
    'change size by %n':
        '增加角色的大小 %n ',
    'set size to %n %':
        '設定角色的大小為 %n ',
    'size':
        '大小',
    'show':
        '顯示',
    'hide':
        '隱藏',
    'go to front':
        '移至最上層',
    'go back %n layers':
        '下移 %n 層',

    'development mode \ndebugging primitives:':
        '開發模式\n調式程式語言:',
    'console log %mult%s':
        '控制臺日誌 %mult%s',
    'alert %mult%s':
        '警告: %mult%s',

    // sound:
    'play sound %snd':
        '播放聲音 %snd ',
    'play sound %snd until done':
        '播放聲音 %snd 直到播放完畢',
    'stop all sounds':
        '停止所有聲音',
    'rest for %n beats':
        '停止 %n 秒',
    'play note %n for %n beats':
        '彈奏 %n  %n 拍',
    'change tempo by %n':
        '加快節奏 %n',
    'set tempo to %n bpm':
        '設定節奏為 %n',
    'tempo':
        '節奏',

    // pen:
    'clear':
        '清除所有畫筆',
    'pen down':
        '落筆',
    'pen up':
        '抬筆',
    'set pen color to %clr':
        '設定畫筆顏色為 %clr ',
    'change pen color by %n':
        '增加畫筆顏色值 %n ',
    'set pen color to %n':
        '設定畫筆顏色值為 %n ',
    'change pen shade by %n':
        '增加畫筆色度 %n ',
    'set pen shade to %n':
        '設定畫筆色度為 %n ',
    'change pen size by %n':
        '增加畫筆粗細 %n ',
    'set pen size to %n':
        '設定畫筆的粗細為 %n ',
    'stamp':
        '圖章',

    // control:
    'when %greenflag clicked':
        '當 %greenflag 被點擊',
    'when %keyHat key pressed':
        '當按下 %keyHat',
    'when I am clicked':
        '當角色被點擊',
    'when I receive %msgHat':
        '當接收到 %msgHat',
    'broadcast %msg':
        '廣播 %msg ',
    'broadcast %msg and wait':
        '廣播 %msg 並等待',
    'Message name':
        '資訊名稱',
    'wait %n secs':
        '等待 %n 秒',
    'wait until %b':
        '直到 %b 前都等待闐',
    'forever %c':
        '重複執行 %c',
    'repeat %n %c':
        '重複執行 %n  %c',
    'repeat until %b %c':
        '重複執行直到 %b  %c',
    'if %b %c':
        '如果 %b  %c',
    'if %b %c else %c':
        '如果 %b  %c 否則 %c',
    'report %s':
        '報告 %s ',
    'stop block':
        '停止程式塊',
    'stop script':
        '停止腳本',
    'stop all %stop':
        '全部停止 %stop',
    'run %cmdRing %inputs':
        ' 行 %cmdRing %inputs ',
    'launch %cmdRing %inputs':
        '啟動 %cmdRing  %inputs ',
    'call %repRing %inputs':
        '調用 %repRing  %inputs ',
    'run %cmdRing/continuation':
        '持續執行 %cmdRing ',
    'call %cmdRing w/continuation':
        '持續調用 %cmdRing ',
    'warp %c':
        '直接運行 %c',
    'when I start as a clone':
        '以複製身份開始',
    'create a clone of %cln':
        '複製 %cln',
    'myself':
        '自身',
    'delete this clone':
        '刪除這個複製',

    // sensing:
    'touching %col ?':
        '碰到 %col ',
    'touching %clr ?':
        '碰到顏色 %clr ',
    'color %clr is touching %clr ?':
        '顏色 %clr 碰到了顏色 %clr ？',
    'ask %s and wait':
        '詢問 %s 並等待',
    'what\'s your name?':
        '你的名字?',
    'answer':
        '回答',
    'mouse x':
        '滑鼠的 x 座標',
    'mouse y':
        '滑鼠的 y 座標',
    'mouse down?':
        '按下滑鼠？',
    'key %key pressed?':
        '按鍵 %key 是否按下？',
    'distance to %dst':
        '到 %dst 的距離',
    'reset timer':
        '計時器歸零',
    'timer':
        '計時器',
    'http:// %s':
        'http:// %s',
    'turbo mode?':
        'Turbo模式',
    'set turbo mode to %b':
        '設置 Turbo 模式 %b',

    'filtered for %clr':
        '選擇顏色  %clr ',
    'stack size':
        '堆疊大小',
    'frames':
        '框架',

    // operators:
    '%n mod %n':
        '%n 除以 %n 的餘數',
    'round %n':
        '將 %n 四捨五入',
    '%fun of %n':
        '%fun %n',
    'pick random %n to %n':
        '隨機在 %n 到 %n 間選一個數',
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
        '將 %words 加入到',
    'hello':
        '歡迎',
    'world':
        '光臨',
    'letter %idx of %s':
        '第 %idx 位元在文字 %s 中',
    'length of %s':
        '%s 的長度',
    'unicode of %s':
        '字元 %s 的Unicode編碼值',
    'unicode %n as letter':
        'Unicode編碼值為 %n 的字元',
    'is %s a %typ ?':
        '%s 是 %typ 類型？',
    'is %s identical to %s ?':
        '%s 與 %s 相同嗎？',

    'type of %s':
        '%s 類型',

    // variables:
    'Make a variable':
        '新建變數',
    'Variable name':
        '變數名',
    'Delete a variable':
        '刪除變數',

    'set %var to %s':
        '設定變數 %var 的值為 %s ',
    'change %var by %n':
        '增加變數 %var 的值 %n ',
    'show variable %var':
        '顯示變數 %var ',
    'hide variable %var':
        '隱藏變數 %var ',
    'script variables %scriptVars':
        '腳本變數 %scriptVars',

    // lists:
    'list %exp':
        '表列 %exp',
    '%s in front of %l':
        '設定 %s 為 %l 第一項',
    'item %idx of %l':
        '第 %idx 項在 %l 中',
    'all but first of %l':
        ' %l 中除第一項之外內容',
    'length of %l':
        ' %l 的大小',
    '%l contains %s':
        ' %l 包含 %s ',
    'thing':
        '事項',
    'add %s to %l':
        '將 %s 加入 %l ',
    'delete %ida of %l':
        '刪除 %ida 第 %l 項',
    'insert %s at %idx of %l':
        '插入 %s 到第 %idx 項在 %l 中',
    'replace item %idx of %l with %s':
        '替換第 %idx 項在 %l 中為 %s ',

    // other
    'Make a block':
        '新建程式塊',

    // menus
    // snap menu
    'About...':
        '關於Snap!...',
    'Reference manual':
        '參考手冊',
    'Snap! website':
        '官方網站',
    'Download source':
        '下載源碼',
    'Switch back to user mode':
        '切換到使用者模式',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        '停用 變形語式\n快顯功能表\n\n與非\n友好使用者介面',
    'Switch to dev mode':
        '切換到開發人員模式',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        '啟用 正常語式\n快顯功能表\n與非檢查\n友好使用者介面',


    // project menu
    'Project notes...':
        '專案說明...',
    'New':
        '新建',
    'Open...':
        '打開...',
    'Save':
        '存',
    'Save As...':
        '另存為...',
    'Import...':
        '導入...',
    'file menu import hint':
        '當你拖動到系統，注意查看檢查報告\n'
		+ '要注意檢查報告為空\n\n'
		+ '有一些流覽器不支持這一功能',
    'Export project as plain text...':
        '純文本格式導出專案...',
    'Export project...':
        '導出項目...',
    'show project data as XML\nin a new browser window':
        '新瀏覽視窗以XML格式顯示專案',
    'Export blocks...':
        '輸出程式塊...',
    'show global custom block definitions as XML\nin a new browser window':
        '新瀏覽視窗以XML格式顯示全局自定義程式塊',
    'Import tools':
        '導入工具包',
    'load the official library of\npowerful blocks':
        '載入官方庫和強大的程式塊',

    // cloud menu
    'Login...':
        '登錄...',
    'Signup...':
        '註冊...',
    // settings menu
    'Language...':
        '語言選擇...',
    'Zoom blocks...':
        '放大程式塊...',
    'Blurred shadows':
        '半透明陰影',
    'uncheck to use solid drop\nshadows and highlights':
        '取消選中 降低陰影和高亮的清晰度',
    'check to use blurred drop\nshadows and highlights':
        '檢測 降低陰影和高亮的模糊度',
    'Zebra coloring':
        '斑馬著色',
    'check to enable alternating\ncolors for nested blocks':
        '檢測 使嵌套塊的顏色交換',
    'uncheck to disable alternating\ncolors for nested block':
        '取消選中 使嵌套塊的顏色交換',
    'Dynamic input labels':
        '動態輸入標籤',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        '取消選中要禁用動態可變參數輸入標籤',
    '檢查啟用動態可變參數輸入標籤':
        'marcar para habilitar etiquetas\ndin\u00E1micas para entradas varidic',
    'Prefer empty slot drops':
        '喜歡減少空槽',
    'settings menu prefer empty slots hint':
        '喜歡空槽設置菜單',
    'uncheck to allow dropped\nreporters to kick out others':
        '取消選中 允許下降報告並取消其他報告',
    'Long form input dialog':
        '長形式輸入對話方塊',
    'check to always show slot\ntypes in the input dialog':
        '檢查顯示插槽在輸入對話方塊中的類型',
    'uncheck to use the input\ndialog in short form':
        '取消選擇 輸入窗並顯示簡潔對話方塊',
    'Virtual keyboard':
        '虛擬鍵盤',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        '取消選中 禁用虛擬鍵盤、可移動設備',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        '檢查 使用虛擬鍵、可移動設備',
    'Input sliders':
        '輸入滑塊',
    'uncheck to disable\ninput sliders for\nentry fields':
        '取消選中 禁用輸入滑塊、輸入欄位',
    'check to enable\ninput sliders for\nentry fields':
        '檢查 使用輸入滑塊、輸入欄位',
    'Clicking sound':
        '點擊聲音',
    'uncheck to turn\nblock clicking\nsound off':
        '取消選中 關閉點擊程式塊的聲音',
    'check to turn\nblock clicking\nsound on':
        '檢查 關閉點擊程式塊的聲音',
    'Animations':
        '動畫',
    'uncheck to disable\nIDE animations':
        '取消選中禁用IDE動畫',
    'Turbo mode':
        'Turbo模式',
    'check to prioritize\nscript execution':
        '檢查的優先執行腳本順序',
    'uncheck to run scripts\nat normal speed':
        '取消選中正常速度運行腳本',
    'check to enable\nIDE animations':
        '檢查啟用IDE動畫',
    'Thread safe scripts':
        '線程安全的腳本',
    'uncheck to allow\nscript reentrance':
        '取消選中 允許腳本重新載入',
    'check to disallow\nscript reentrance':
        '檢查 不允許腳本重新載入',
    'Prefer smooth animations':
        '不流暢的動畫',
    'uncheck for greater speed\nat variable frame rates':
        '取消選中在可變幀頻更快的速度',
    'check for smooth, predictable\nanimations across computers':
        '檢查是否平滑，可預見的多台電腦動畫',

    // inputs
    'with inputs':
        '參數',
    'input names:':
        '參數名:',
    'Input Names:':
        '參數名:',
    'input list:':
        '輸入列表:',

    // context menus:
    'help':
        '説明',

    // blocks:
    'help...':
        '説明...',
    'relabel...':
        '重新標記...',
    'duplicate':
        '複製',
    'make a copy\nand pick it up':
        '創建一個副本並抓起',
    'only duplicate this block':
        '只複製此塊',
    'delete':
        '刪除',
    'script pic...':
        '將腳本存為圖像...',
    'open a new window\nwith a picture of this script':
        '新流覽視窗中打開腳本的圖片',
    'ringify':
        '環',
    'unringify':
        '刪除環',

    // custom blocks:
    'delete block definition...':
        '刪除自定義程式塊',
    'edit...':
        '編輯...',

    // sprites:
    'edit':
        '編輯',
    'export...':
        '導出...',

    'show all':
        '顯示所有',
    'pic...':
        '導出圖像...',
    'open a new window\nwith a picture of the stage':
        '打開一張圖片舞臺的新視窗，',
    // scripting area
    'clean up':
        '清除',
    'arrange scripts\nvertically':
        '整理腳本，垂直排列',
    'add comment':
        '添加注釋',
    'make a block...':
        '創建程式塊...',

    // costumes
    'rename':
        '重命名',
    'export':
        '導出',
    'rename costume':
        '重命名造型',

    // sounds
    'Play sound':
        '播放聲音',
    'Stop sound':
        '停止聲音',
    'Stop':
        '停止',
    'Play':
        '播放',
    'rename sound':
        '重命名聲音',

    // dialogs
    // buttons
    'OK':
        '確定',
    'Cancel':
        '取消',
    'Yes':
        '是',
    'No':
        '否',

    // help
    'Help':
        '説明',
    // zoom blocks
    'Zoom blocks':
        '放大程式塊',
    'build':
        '建立',
    'your own':
        '你自己',
    'blocks':
        '程式塊',
    'normal (1x)':
        '標準 (1x)',
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
        '無敵型 (10x)',

 'Untitled':
        '無標題',
    'Open Project':
        '打開項目',
    'Open':
        '打開',
    '(empty)':
        '(空)',
    'Saved!':
        '已保存！',
    'Delete Project':
        '刪除項目',
    'Are you sure you want to delete':
        '你確定要刪除嗎？',
    'rename...':
        '重命名...',
    // costume editor
    'Costume Editor':
        '造型編輯器',
    'click or drag crosshairs to move the rotation center':
        '點擊或拖動十字准線，設置旋轉中心',

    // project notes
    'Project Notes':
        '項目注釋',

    // new project
    'New Project':
        '新建項目',
    'Replace the current project with a new one?':
        '你要取消當前編輯的專案，重新建立專案嗎？',

    // open project
    'Open Projekt':
        '打開項目',

    // save project
    'Save Project As...':
        '項目另存為...',

    // export blocks
    'Export blocks':
        '導出程式塊',
    'Import blocks':
        '導入程式塊',
    'this project doesn\'t have any\ncustom global blocks yet':
        '這個項目沒有包含全局性的自定義程式塊',
    'select':
        '選擇',
    'all':
        '全部',
    'none':
        '無',

    // variable dialog
    'for all sprites':
        '對所有的角色',
    'for this sprite only':
        '只對這個角色',

    // block dialog
    'Change block':
        '修改程式塊',
    'Command':
        '命令',
    'Reporter':
        '記錄',
    'Predicate':
        '謂語',

    // block editor
    'Block Editor':
        '程式塊編輯器',
    'Apply':
        '應用',

    // block deletion dialog
    'Delete Custom Block':
        '刪除自定義程式塊',
    'block deletion dialog text':
        '你確定要刪除自定義程式塊及所有實例嗎？',

    // input dialog
    'Create input name':
        '創建參數名',
    'Edit input name':
        '編輯參數名',
    'Edit label fragment':
        '編輯標籤片段',
    'Title text':
        '標題文本',
    'Input name':
        '參數名',
    'Delete':
        '刪除',
    'Object':
        '對象',
    'Number':
        '數字',
    'Text':
        '文本',
    'List':
        '鏈表',
    'Any type':
        '所有類型',
    'Boolean (T/F)':
        '布林值（是/否）',
    'Command\n(inline)':
        '命令（內置）',
    'Command\n(C-shape)':
        '命令(C型)',
    'Any\n(unevaluated)':
        '任意(未評價)',
    'Boolean\n(unevaluated)':
        '布林（評價）',
    'Single input.':
        '單一參數.',
    'Default Value:':
        '預設值:',
    'Multiple inputs (value is list of inputs)':
        '多行輸入（值為參數列表）',
    'Upvar - make internal variable visible to caller':
        '上傳變數 - 使內部變數對調用者可見',

    // About Snap
    'About Snap':
        '關於 Snap',
    'Back...':
        '返回...',
    'License...':
        '許可...',
    'Modules...':
        '模組...',
    'Credits...':
        '光榮榜...',
    'Translators...':
        '翻譯者',
    'License':
        '版權',
    'current module versions:':
        '目前模組版本:',
    'Contributors':
        '貢獻者:',
    'Translations':
        '翻譯者',

    // variable watchers
    'normal':
        '標準',
    'large':
        '大型',
    'slider':
        '滑塊',
    'slider min...':
        '滑塊的最小值...',
    'slider max...':
        '滑塊的最大值...',
    'import...':
        '導入...',
    'Slider minimum value':
        '滑塊的最小值',
    'Slider maximum value':
        '滑塊的最大值',

    // list watchers
    'length: ':
        '長度: ',

    // coments
    'add comment here...':
        '在這裏添加注釋...',

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
        '滑鼠指標',
    'edge':
        '邊緣',
    'pen trails':
        '畫筆軌跡',

    // costumes
    'Turtle':
        '海龜',

    // graphical effects
    'ghost':
        '鬼影',

    // keys
    'space':
        '空白鍵',
    'up arrow':
        '上移鍵',
    'down arrow':
        '下移鍵',
    'right arrow':
        '右移鍵',
    'left arrow':
        '左移鍵',
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
        '新增...',

    // math functions
    'abs':
        'abs',
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

    // data types
    'number':
        '數字',
    'text':
        '文字',
    'Boolean':
        '布林值',
    'list':
        '表列',
    'command':
        '命令',
    'reporter':
        '記錄',
    'predicate':
        '謂語',

    // list indices
    'last':
        '最後',
    'any':
        '任意',

    // missing entries
    'Untitled':
        '無標題',
    'Open Project':
        '打開專案',
    'Open':
        '打開',
    '(empty)':
        '(空)',
    'Saved!':
        '已保存！',
    'Delete Project':
        '刪除項目',
    'Are you sure you want to delete':
        '確定要刪除嗎？',
    'unringify':
        '刪除環',
    'rename...':
        '重命名為...',
    '(180) down':
        '(180) 下',
    'Ok':
        '確定'

};
