/*

	lang-ja.js

	Japanese translation for SNAP!

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

SnapTranslator.dict.ja = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    Ä, ä   \u00c4, \u00e4
    Ö, ö   \u00d6, \u00f6
    Ü, ü   \u00dc, \u00fc
    ß      \u00df
*/

    // translations meta information
    'language_name':
        '日本語', // the name as it should appear in the language menu
    'language_translator':
        'Kazuhiro Abe', // your name for the Translators tab
    'translator_e-mail':
        'abee@squeakland.jp', // optional
    'last_changed':
        '2013-04-02', // this, too, will appear in the Translators tab

    // GUI
    // control bar:
    'untitled':
        '名称未設定',
    'development mode':
        '開発者モード',

    // categories:
    'Motion':
        '動き',
    'Looks':
        '見た目',
    'Sound':
        '音',
    'Pen':
        'ペン',
    'Control':
        '制御',
    'Sensing':
        '調べる',
    'Operators':
        '演算',
    'Variables':
        '変数',
    'Lists':
        'リスト',
    'Other':
        'その他',

    // editor:
    'draggable':
        'ドラッグ可能',

    // tabs:
    'Scripts':
        'スクリプト',
    'Costumes':
        'コスチューム',
    'Sounds':
        '音',

    // names:
    'Sprite':
        'スプライト',
    'Stage':
        'ステージ',

    // rotation styles:
    'don\'t rotate':
        '回転しない',
    'can rotate':
        '回転する',
    'only face left/right':
        '左右に反転するだけ',

    // new sprite button:
    'add a new sprite':
        '新しいスプライトを追加する',

    // tab help
    'costumes tab help':
        '他のWebページやコンピューター上の画像を\n'
            + 'ここにドロップして読み込みます',
    'import a sound from your computer\nby dragging it into here':
        'コンピューター上のサウンドを\nここにドラッグして読み込みます',

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
        '選択されたステージ:\n動きのプリミティブがありません',

    'move %n steps':
        '%n 歩動かす',
    'turn %clockwise %n degrees':
        '%clockwise %n 度回す',
    'turn %counterclockwise %n degrees':
        '%counterclockwise %n 度回す',
    'point in direction %dir':
        '%dir 度に向ける',
    'point towards %dst':
        '%dst へ向ける',
    'go to x: %n y: %n':
        'x座標を %n 、y座標を %n にする',
    'go to %dst':
        '%dst へ行く',
    'glide %n secs to x: %n y: %n':
        '%n 秒でx座標を %n に、y座標を %n に変える',
    'change x by %n':
        'x座標を %n ずつ変える',
    'set x to %n':
        'x座標を %n にする',
    'change y by %n':
        'y座標を %n ずつ変える',
    'set y to %n':
        '座標を %n にする',
    'if on edge, bounce':
        'もし端に着いたら、跳ね返る',
    'x position':
        'x座標',
    'y position':
        'y座標',
    'direction':
        '向き',

    // looks:
    'switch to costume %cst':
        'コスチュームを %cst にする',
    'next costume':
        '次のコスチュームにする',
    'costume #':
        'コスチュームの番号',
    'say %s for %n secs':
        '%s と %n 秒言う',
    'say %s':
        '%s という',
    'think %s for %n secs':
        '%s と %n 秒考える',
    'think %s':
        '%s と考える',
    'Hello!':
        'こんにちは!',
    'Hmm...':
        'うーん...',
    'change %eff effect by %n':
        '%eff の効果を %n ずつ変える',
    'set %eff effect to %n':
        '%eff の効果を %n にする',
    'clear graphic effects':
        '画像効果をなくす',
    'change size by %n':
        '大きさを %n ずつ変える',
    'set size to %n %':
        '大きさを %n にする',
    'size':
        '大きさ',
    'show':
        '表示する',
    'hide':
        '隠す',
    'go to front':
        '前に出す',
    'go back %n layers':
        '%n 層下げる',

    'development mode \ndebugging primitives:':
        '開発者モード\nデバッグ用プリミティブ:',
    'console log %mult%s':
        'コンソールログ %mult%s',
    'alert %mult%s':
        '警告: %mult%s',

    // sound:
    'play sound %snd':
        '%snd の音を鳴らす',
    'play sound %snd until done':
        '終わるまで %snd の音を鳴らす',
    'stop all sounds':
        'すべての音を止める',
    'rest for %n beats':
        '%n 拍休む',
    'play note %n for %n beats':
        '%n の音符を %n 拍鳴らす',
    'change tempo by %n':
        'テンポを %n ずつ変える',
    'set tempo to %n bpm':
        'テンポを %n BPMにする',
    'tempo':
        'テンポ',

    // pen:
    'clear':
        '消す',
    'pen down':
        'ペンを下ろす',
    'pen up':
        'ペンを上げる',
    'set pen color to %clr':
        'ペンの色を %clr にする',
    'change pen color by %n':
        'ペンの色を %n ずつ変える',
    'set pen color to %n':
        'ペンの色を %n にする',
    'change pen shade by %n':
        'ペンの濃さを %n ずつ変える',
    'set pen shade to %n':
        'ペンの濃さを %n にする',
    'change pen size by %n':
        'ペンの太さを %n ずつ変える',
    'set pen size to %n':
        'ペンの太さを %n にする',
    'stamp':
        'スタンプ',
    'fill':
        '塗りつぶす',

    // control:
    'when %greenflag clicked':
        '%greenflag が押されたとき',
    'when %keyHat key pressed':
        '%keyHat が押されたとき',
    'when I am clicked':
        '自分がクリックされたとき',
    'when I receive %msgHat':
        '%msgHat を受け取ったとき',
    'broadcast %msg':
        '%msg を送る',
    'broadcast %msg and wait':
        '%msg を送って待つ',
    'Message name':
        'メッセージ名',
    'wait %n secs':
        '%n 秒待つ',
    'wait until %b':
        '%b まで待つ',
    'forever %loop':
        'ずっと %loop',
    'repeat %n %loop':
        '%n 回繰り返す %loop',
    'repeat until %b %loop':
        '%b まで繰り返す %loop',
    'if %b %c':
        'もし %b なら %c',
    'if %b %c else %c':
        'もし %b なら %c でなければ %c',
    'report %s':
        '%s を返す',
    'stop block':
        'ブロックを止める',
    'stop script':
        'スクリプトを止める',
    'stop all %stop':
        'すべてを止める %stop',
    'run %cmdRing %inputs':
        '%cmdRing を %inputs で実行する',
    'launch %cmdRing %inputs':
        '%cmdRing を %inputs で起動する',
    'call %repRing %inputs':
        '%repRing を %inputs で呼ぶ',
    'run %cmdRing w/continuation':
        '継続付きで %cmdRing を実行する',
    'call %cmdRing w/continuation':
        '継続付きで %cmdRing を呼ぶ',
    'warp %c':
        'ワープする %c',
    'when I start as a clone':
        'クローンされたとき',
    'create a clone of %cln':
        '%cln のクローンを作る',
    'myself':
        '自分自身',
    'delete this clone':
        'このクローンを削除する',

    // sensing:
    'touching %col ?':
        '%col に触れた',
    'touching %clr ?':
        '%clr 色に触れた',
    'color %clr is touching %clr ?':
        '%clr 色が %clr 色に触れた',
    'ask %s and wait':
        '%s と聞いて待つ',
    'what\'s your name?':
        'あなたの名前は何ですか?',
    'answer':
        '答え',
    'mouse x':
        'マウスのx座標',
    'mouse y':
        'マウスのy座標',
    'mouse down?':
        'マウスが押された',
    'key %key pressed?':
        '%key が押された',
    'distance to %dst':
        '%dst までの距離',
    'reset timer':
        'タイマーをリセット',
    'timer':
        'タイマー',
    'http:// %s':
        'http:// %s',
    'turbo mode?':
        'ターボモード?',
    'set turbo mode to %b':
        'ターボーモードを %b にする',

    'filtered for %clr':
        '%clr 色を抽出',
    'stack size':
        'スタックの大きさ',
    'frames':
        'フレーム',

    // operators:
    '%n mod %n':
        '%n を %n で割った余り',
    'round %n':
        '%n を丸める',
    '%fun of %n':
        '%fun %n',
    'pick random %n to %n':
        '%n から %n までの乱数',
    '%b and %b':
        '%b かつ %b',
    '%b or %b':
        '%b または %b',
    'not %b':
        '%b ではない',
    'true':
        'はい',
    'false':
        'いいえ',
    'join %words':
        '%words をつなぐ',
    'hello':
        'ハロー',
    'world':
        'ワールド',
    'letter %idx of %s':
        '%idx 文字目の文字 %s',
    'length of %s':
        '%s の長さ',
    'unicode of %s':
        '%s のUnicode',
    'unicode %n as letter':
        'Unicodeで %n の文字',
    'is %s a %typ ?':
        '%s は %typ 型',
    'is %s identical to %s ?':
        '%s は %s と同一',

    'type of %s':
        '%s の型',

    // variables:
    'Make a variable':
        '新しい変数を作る',
    'Variable name':
        '変数名',
    'Delete a variable':
        '変数を削除',

    'set %var to %s':
        '%var を %s にする',
    'change %var by %n':
        '%var を %n ずつ変える',
    'show variable %var':
        '%var 表示する',
    'hide variable %var':
        '%var を隠す',
    'script variables %scriptVars':
        'スクリプト変数 %scriptVars',

    // lists:
    'list %exp':
        'リスト %exp',
    '%s in front of %l':
        '%s を %l の先頭に置く',
    'item %idx of %l':
        '%idx 番目 %l',
    'all but first of %l':
        '%l の先頭以外',
    'length of %l':
        '%l の長さ',
    '%l contains %s':
        '%l に %s が含まれているか',
    'thing':
        'なにか',
    'add %s to %l':
        '%s を %l に追加する',
    'delete %ida of %l':
        '%ida を %l から削除する',
    'insert %s at %idx of %l':
        '%s を %idx 番目に挿入する %l',
    'replace item %idx of %l with %s':
        '%idx 番目 %l を %s で置き換える',

    // other
    'Make a block':
        'ブロックを作る',

    // menus
    // snap menu
    'About...':
        'Snap!について...',
    'Snap! website':
        'Snap!のWebサイト',
    'Download source':
        'ソースをダウンロード',
    'Switch back to user mode':
        'ユーザーモードに切り替え',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        '高度なモーフィックコンテクストメニューを無効にして\nユーザーフレンドリーなメニューを表示する',
    'Switch to dev mode':
        '開発者モードに切り替える',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'ユーザーフレンドリーではない\nモーフィックコンテクストメニューと\nインスペクターを有効にする',

    // project menu
    'Project notes...':
        'プロジェクトのメモ...',
    'New':
        '新規',
    'Open...':
        '開く...',
    'Save':
        '保存',
    'Save As...':
        '名前をつけて保存...',
    'Import...':
        '読み込み...',
    'file menu import hint':
        'チェックするとレポーターをドラッグ&ドロップするとき\n'
		+ '空のレポーターにフォーカスします\n\n'
		+ 'いくつかのブラウザーではサポートされません',
    'Export project as plain text...':
        'テキストファイルとしてプロジェクトを書き出す...',
    'Export project...':
        'プロジェクトを書き出す...',
    'show project data as XML\nin a new browser window':
        'プロジェクトのデータをXMLとして\nブラウザの新しいウインドウに表示する',
    'Export blocks...':
        'ブロックを書き出す...',
    'show global custom block definitions as XML\nin a new browser window':
        'グローバルカスタムブロックの定義をXMLとして\nブラウザの新しいウインドウに表示する',
    'Import tools':
        'ツールを読み込む',
    'load the official library of\npowerful blocks':
        '強力なブロックの公式\nライブラリを読み込む',

    // cloud menu
    'Login...':
        'ログイン...',
    'Signup...':
        'サインアップ...',

    // settings menu
    'Language...':
        '言語...',
    'Zoom blocks...':
        'ブロックをズーム...',
    'Blurred shadows':
        '半透明の影',
    'uncheck to use solid drop\nshadows and highlights':
        'チェックを外すと単色の影と\nハイライトになります',
    'check to use blurred drop\nshadows and highlights':
        'チェックすると半透明の影と\nハイライトになります',
    'Zebra coloring':
        '縞々で表示',
    'check to enable alternating\ncolors for nested blocks':
        'チェックすると入れ子になった\nブロックを縞々で表示します',
    'uncheck to disable alternating\ncolors for nested block':
        'チェックを外すと入れ子になった\nブロックを普通に表示します',
    'Dynamic input labels':
        '動的な入力ラベル',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'チェックを外すと可変個引数の\n動的ラベルを不可にします',
    'check to enable dynamic\nlabels for variadic inputs':
        'チェックすると可変個引数の\n動的ラベルを可能にします',
    'Prefer empty slot drops':
        '空のスロットのドロップを許す',
    'settings menu prefer empty slots hint':
        '設定メニューが空のスロットのヒントを許します',
    'uncheck to allow dropped\nreporters to kick out others':
        'チェックを外すとドロップしたレポーターが\n他を押し出せるようになります',
    'Long form input dialog':
        '引数ダイアログを長い形式にする',
    'check to always show slot\ntypes in the input dialog':
        'チェックすると引数ダイアログに\n常にスロットの型を表示します',
    'uncheck to use the input\ndialog in short form':
        'チェックを外すと引数ダイアログを短く表示します',
    'Virtual keyboard':
        '仮想キーボード',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'チェックを外すとモバイル機器用の\n仮想キーボードを無効にします',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'チェックするとモバイル機器用の\n仮想キーボードを有効にします',
    'Input sliders':
        '入力スライダー',
    'uncheck to disable\ninput sliders for\nentry fields':
        'チェックを外すと入力フィールドのスライダーを無効にします',
    'check to enable\ninput sliders for\nentry fields':
        'チェックすると入力フィールドのスライダーを有効にします',
    'Clicking sound':
        'クリック音',
    'uncheck to turn\nblock clicking\nsound off':
        'チェックを外すとブロックの\nクリック音を切ります',
    'check to turn\nblock clicking\nsound on':
        'チェックを外すとブロックの\nクリック音を入れます',
    'Animations':
        'アニメーション',
    'uncheck to disable\nIDE animations':
        'チェックを外すとIDEの\nアニメーションを切ります',
    'check to prioritize\nscript execution':
        'チェックするとスクリプトの\n処理を優先します',
    'uncheck to run scripts\nat normal speed':
        'チェックを外すとスクリプトを\n通常の速度で実行します',
    'check to enable\nIDE animations':
        'チェックするとIDEの\nアニメーションを入れます',
    'Turbo mode':
        'ターボモード',
    'Thread safe scripts':
        'スクリプトをスレッドセーフにする',
    'uncheck to allow\nscript reentrancy':
        'チェックを外すとスクリプトを\n再入可能にします',
    'check to disallow\nscript reentrancy':
        'チェックするとスクリプトを\n再入不能にします',
    'Prefer smooth animations':
        'なめらかなアニメーションにする',
    'uncheck for greater speed\nat variable frame rates':
        'チェックを外すとフレームレート\n当たりの速度を上げます',
    'check for smooth, predictable\nanimations across computers':
        'チェックするとコンピューター間で\nなめらかで予測可能なアニメーションにします',

    // inputs
    'with inputs':
        '引数',
    'input names:':
        '引数名:',
    'Input Names:':
        '引数名:',
    'input list:':
        '引数リスト:',

    // context menus:
    'help':
        'ヘルプ',

    // blocks:
    'help...':
        'ヘルプ...',
    'duplicate':
        '複製',
    'make a copy\nand pick it up':
        'コピーを作って\nそれを掴みます',
    'only duplicate this block':
        'このブロックをコピーするだけ',
    'delete':
        '削除',
    'script pic...':
        'スクリプトの画像...',
    'open a new window\nwith a picture of this script':
        'このスクリプトの画像を表示する新しいウィンドウを開きます',
    'ringify':
        'リング化',
    'unringify':
        '非リング化',

    // custom blocks:
    'delete block definition...':
        'ブロックの定義を削除',
    'edit...':
        '編集...',

    // sprites:
    'edit':
        '編集',
    'export...':
        '書き出し...',

    // stage:
    'show all':
        'すべてを表示',
    'pic...':
        '画像...',
    'open a new window\nwith a picture of the stage':
        'このステージの画像で\n新しいウィンドウを開く',

    // scripting area
    'clean up':
        'きれいにする',
    'arrange scripts\nvertically':
        'スクリプトを\n縦に整列します',
    'add comment':
        'コメントを追加',
    'make a block...':
        'ブロックを作る...',

    // costumes
    'rename':
        '名前を変更',
    'export':
        '書き出し',
    'rename costume':
        'コスチュームの名前を変更',

    // sounds
    'Play sound':
        '音を鳴らす',
    'Stop sound':
        '音を止める',
    'Stop':
        '停止',
    'Play':
        '再生',
    'rename sound':
        '音の名前を変更',

    // dialogs
    // buttons
    'OK':
        'OK',
    'Ok':
        'OK',
    'Cancel':
        'キャンセル',
    'Yes':
        'はい',
    'No':
        'いいえ',

    // help
    'Help':
        'ヘルプ',

    // zoom blocks
    'Zoom blocks':
        'ブロックをズーム',
    'build':
        '作ろう',
    'your own':
        'あなた自身の',
    'blocks':
        'ブロックを',
    'normal (1x)':
        'ノーマル (1x)',
    'demo (1.2x)':
        'デモ (1.2x)',
    'presentation (1.4x)':
        'プレゼンテーション (1.4x)',
    'big (2x)':
        '大 (2x)',
    'huge (4x)':
        '特大 (4x)',
    'giant (8x)':
        '巨大 (8x)',
    'monstrous (10x)':
        '超巨大 (10x)',

    // Project Manager
    'Untitled':
        '名称未設定',
    'Open Project':
        'プロジェクトを開く',
    'Open':
        '開く',
    '(empty)':
        '(空)',
    'Saved!':
        '保存しました!',
    'Delete Project':
        'プロジェクトを削除',
    'Are you sure you want to delete':
        '本当に削除しますか',
    'rename...':
        '名前を変更...',

    // costume editor
    'Costume Editor':
        'コスチュームエディター',
    'click or drag crosshairs to move the rotation center':
        'クリックかドラッグで回転中心を移動する',

    // project notes
    'Project Notes':
        'プロジェクトのメモ',

    // new project
    'New Project':
        '新しいプロジェクト',
    'Replace the current project with a new one?':
        '現在のプロジェクトを新しいもので置き換えますか?',

    // open project
    'Open Projekt':
        'プロジェクトを開く',

    // save project
    'Save Project As...':
        '名前を付けてプロジェクトを保存...',

    // export blocks
    'Export blocks':
        'ブロックを書き出し',
    'Import blocks':
        'ブロックを読み込み',
    'this project doesn\'t have any\ncustom global blocks yet':
        'このプロジェクトはカスタムグローバルブロックを持っていません',
    'select':
        '選択',
    'all':
        'すべて',
    'none':
        'なし',

    // variable dialog
    'for all sprites':
        'すべてのスプライト用',
    'for this sprite only':
        'このスプライト用',

    // block dialog
    'Change block':
        'ブロックを変更',
    'Command':
        'コマンド',
    'Reporter':
        'モニター',
    'Predicate':
        '述語',

    // block editor
    'Block Editor':
        'ブロックエディター',
    'Apply':
        '適用',

    // block deletion dialog
    'Delete Custom Block':
        'カスタムブロックを削除',
    'block deletion dialog text':
        'このカスタムブロックとすべてのインスタンスを\n削除してもよいですか?',

    // input dialog
    'Create input name':
        '引数名を作成',
    'Edit input name':
        '引数名を編集',
    'Edit label fragment':
        'ラベルの断片を編集',
    'Title text':
        'タイトルテキスト',
    'Input name':
        '引数名',
    'Delete':
        '削除',
    'Object':
        'オブジェクト',
    'Number':
        '数',
    'Text':
        'テキスト',
    'List':
        'リスト',
    'Any type':
        '全タイプ',
    'Boolean (T/F)':
        '真偽値 (はい/いいえ)',
    'Command\n(inline)':
        'コマンド\n(インライン)',
    'Command\n(C-shape)':
        'コマンド \n(C形)',
    'Any\n(unevaluated)':
        '任意\n(未評価)',
    'Boolean\n(unevaluated)':
        '真偽値\n(未評価)',
    'Single input.':
        '単一引数.',
    'Default Value:':
        'デフォルト値:',
    'Multiple inputs (value is list of inputs)':
        '複数の引数 (値は引数のリスト)',
    'Upvar - make internal variable visible to caller':
        'Upvar - 呼び出し元から見える内部的な変数',

   // About Snap
    'About Snap':
        'Snapについて',
    'Back...':
        '戻る...',
    'License...':
        'ライセンス...',
    'Modules...':
        'モジュール...',
    'Credits...':
        'クレジット...',
    'Translators...':
        '翻訳者',
    'License':
        'ライセンス',
    'current module versions:':
        '現在のモジュールのバージョン:',
    'Contributors':
        '貢献者:',
    'Translations':
        '翻訳',

    // variable watchers
    'normal':
        '通常',
    'large':
        '大',
    'slider':
        'スライダー',
    'slider min...':
        'スライダーの最小値...',
    'slider max...':
        'スライダーの最大値...',
    'import...':
        '読み込み...',
    'Slider minimum value':
        'スライダーの最小値',
    'Slider maximum value':
        'スライダーの最大値',

    // list watchers
    'length: ':
        '長さ: ',

    // coments
    'add comment here...':
        'ここにコメントを追加...',

    // drow downs
    // directions
    '(90) right':
        '(90) 右',
    '(-90) left':
        '(-90) 左',
    '(0) up':
        '(0) 上',
    '(180) down':
        '(180) 下',

    // collision detection
    'mouse-pointer':
        'マウスのポインター',
    'edge':
        '端',
    'pen trails':
        'ペンの軌跡',

    // costumes
    'Turtle':
        'タートル',
    'Empty':
        '空',

    // graphical effects
    'ghost':
        '幽霊',

    // keys
    'space':
        'スペース',
    'up arrow':
        '上向き矢印',
    'down arrow':
        '下向き矢印',
    'right arrow':
        '右向き矢印',
    'left arrow':
        '左向き矢印',
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
        '新規...',

    // math functions
    'abs':
        '絶対値',
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
        '数',
    'text':
        'テキスト',
    'Boolean':
        '真偽値',
    'list':
        'リスト',
    'command':
        'コマンド',
    'reporter':
        'レポーター',
    'predicate':
        '述語',

    // list indices
    'last':
        '最後',
    'any':
        '任意',

    // missing entries
    'Reference manual':
        'リファレンスマニュアル',
    'Sign in':
        'サインイン',
    'User name:':
        'ユーザー名:',
    'Password:':
        'パスワード:',
    'stay signed in on this computer\nuntil logging out':
        'ログアウトするまでこのコンピューターに\nサインインしたままにする',
    'Sign up':
        'サインアップ',
    'User name:':
        'ユーザー名:',
    'Password:':
        'パスワード:',
    'Birth date:':
        '誕生月:',
    'Birth date:':
        '年:',
    'January':
        '1月',
    'February':
        '2月',
    'March':
        '3月',
    'April':
        '4月',
    'May':
        '5月',
    'June':
        '6月',
    'July':
        '7月',
    'August':
        '8月',
    'September':
        '9月',
    'October':
        '10月',
    'November':
        '11月',
    'December':
        '12月',
    '1993 or before':
        '1993年以前',
    'E-mail address:':
        '電子メールアドレス:',
    'Terms of Service...':
        'サービス利用規約...',
    'Privacy...':
        '個人情報...',
    'I have read and agree\nto the Terms of Service':
        'サービス利用規約を読み\nそれに同意します',

};
