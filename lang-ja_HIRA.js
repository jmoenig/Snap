/*

	lang-ja_HIRA.js

	Japanese Hiragana translation for SNAP!

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

SnapTranslator.dict.ja_HIRA = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    Ä, ä   \u00c4, \u00e4
    Ö, ö   \u00d6, \u00f6
    Ü, ü   \u00dc, \u00fc
    ß      \u00df
*/

    // translations meta information
    'language_name':
        'にほんご', // the name as it should appear in the language menu
    'language_translator':
        'Kazuhiro Abe', // your name for the Translators tab
    'translator_e-mail':
        'abee@squeakland.jp', // optional
    'last_changed':
        '2013-04-02', // this, too, will appear in the Translators tab

    // GUI
    // control bar:
    'untitled':
        'めいしょうみせってい',
    'development mode':
        'かいはつしゃモード',

    // categories:
    'Motion':
        'うごき',
    'Looks':
        'みため',
    'Sound':
        'おと',
    'Pen':
        'ペン',
    'Control':
        'せいぎょ',
    'Sensing':
        'しらべる',
    'Operators':
        'えんざん',
    'Variables':
        'へんすう',
    'Lists':
        'リスト',
    'Other':
        'そのた',

    // editor:
    'draggable':
        'ドラッグかのう',

    // tabs:
    'Scripts':
        'スクリプト',
    'Costumes':
        'コスチューム',
    'Sounds':
        'おと',

    // names:
    'Sprite':
        'スプライト',
    'Stage':
        'ステージ',

    // rotation styles:
    'don\'t rotate':
        'かいてんしない',
    'can rotate':
        'かいてんする',
    'only face left/right':
        'さゆうにはんてんするだけ',

    // new sprite button:
    'add a new sprite':
        'あたらしいスプライトをついかする',

    // tab help
    'costumes tab help':
        'ほかのWebページやコンピューターじょうのがぞうを\n'
            + 'ここにドロップしてよみこみます',
    'import a sound from your computer\nby dragging it into here':
        'コンピューターじょうのサウンドを\nここにドラッグしてよみこみます',

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
        'せんたくされたステージ:\nうごきのプリミティブがありません',

    'move %n steps':
        '%n ほうごかす',
    'turn %clockwise %n degrees':
        '%clockwise %n どまわす',
    'turn %counterclockwise %n degrees':
        '%counterclockwise %n どまわす',
    'point in direction %dir':
        '%dir どにむける',
    'point towards %dst':
        '%dst へむける',
    'go to x: %n y: %n':
        'xざひょうを %n 、yざひょうを %n にする',
    'go to %dst':
        '%dst へいく',
    'glide %n secs to x: %n y: %n':
        '%n びょうでxざひょうを %n に、yざひょうを %n にかえる',
    'change x by %n':
        'xざひょうを %n ずつかえる',
    'set x to %n':
        'xざひょうを %n にする',
    'change y by %n':
        'yざひょうを %n ずつかえる',
    'set y to %n':
        'ざひょうを %n にする',
    'if on edge, bounce':
        'もしはしについたら、はねかえる',
    'x position':
        'xざひょう',
    'y position':
        'yざひょう',
    'direction':
        'むき',

    // looks:
    'switch to costume %cst':
        'コスチュームを %cst にする',
    'next costume':
        'つぎのコスチュームにする',
    'costume #':
        'コスチュームのばんごう',
    'say %s for %n secs':
        '%s と %n びょういう',
    'say %s':
        '%s という',
    'think %s for %n secs':
        '%s と %n びょうかんがえる',
    'think %s':
        '%s とかんがえる',
    'Hello!':
        'こんにちは!',
    'Hmm...':
        'うーん...',
    'change %eff effect by %n':
        '%eff のこうかを %n ずつかえる',
    'set %eff effect to %n':
        '%eff のこうかを %n にする',
    'clear graphic effects':
        'がぞうこうかをなくす',
    'change size by %n':
        'おおきさを %n ずつかえる',
    'set size to %n %':
        'おおきさを %n にする',
    'size':
        'おおきさ',
    'show':
        'ひょうじする',
    'hide':
        'かくす',
    'go to front':
        'まえにだす',
    'go back %n layers':
        '%n そうさげる',

    'development mode \ndebugging primitives:':
        'かいはつしゃモード\nデバッグようプリミティブ:',
    'console log %mult%s':
        'コンソールログ %mult%s',
    'alert %mult%s':
        'けいこく: %mult%s',

    // sound:
    'play sound %snd':
        '%snd のおとをならす',
    'play sound %snd until done':
        'おわるまで %snd のおとをならす',
    'stop all sounds':
        'すべてのおとをとめる',
    'rest for %n beats':
        '%n はくやすむ',
    'play note %n for %n beats':
        '%n のおんぷを %n はくならす',
    'change tempo by %n':
        'テンポを %n ずつかえる',
    'set tempo to %n bpm':
        'テンポを %n BPMにする',
    'tempo':
        'テンポ',

    // pen:
    'clear':
        'けす',
    'pen down':
        'ペンをおろす',
    'pen up':
        'ペンをあげる',
    'set pen color to %clr':
        'ペンのいろを %clr にする',
    'change pen color by %n':
        'ペンのいろを %n ずつかえる',
    'set pen color to %n':
        'ペンのいろを %n にする',
    'change pen shade by %n':
        'ペンのこさを %n ずつかえる',
    'set pen shade to %n':
        'ペンのこさを %n にする',
    'change pen size by %n':
        'ペンのふとさを %n ずつかえる',
    'set pen size to %n':
        'ペンのふとさを %n にする',
    'stamp':
        'スタンプ',

    // control:
    'when %greenflag clicked':
        '%greenflag がおされたとき',
    'when %keyHat key pressed':
        '%keyHat がおされたとき',
    'when I am clicked':
        'じぶんがクリックされたとき',
    'when I receive %msgHat':
        '%msgHat をうけとったとき',
    'broadcast %msg':
        '%msg をおくる',
    'broadcast %msg and wait':
        '%msg をおくってまつ',
    'Message name':
        'メッセージめい',
    'wait %n secs':
        '%n びょうまつ',
    'wait until %b':
        '%b までまつ',
    'forever %c':
        'ずっと %c',
    'repeat %n %c':
        '%n かいくりかえす %c',
    'repeat until %b %c':
        '%b までくりかえす %c',
    'if %b %c':
        'もし %b なら %c',
    'if %b %c else %c':
        'もし %b なら %c でなければ %c',
    'report %s':
        '%s をかえす',
    'stop block':
        'ブロックをとめる',
    'stop script':
        'スクリプトをとめる',
    'stop all %stop':
        'すべてをとめる %stop',
    'run %cmdRing %inputs':
        '%cmdRing を %inputs でじっこうする',
    'launch %cmdRing %inputs':
        '%cmdRing を %inputs できどうする',
    'call %repRing %inputs':
        '%repRing を %inputs でよぶ',
    'run %cmdRing w/continuation':
        'けいぞくつきで %cmdRing をじっこうする',
    'call %cmdRing w/continuation':
        'けいぞくつきで %cmdRing をよぶ',
    'warp %c':
        'ワープする %c',
    'when I start as a clone':
        'クローンされたとき',
    'create a clone of %cln':
        '%cln のクローンをつくる',
    'myself':
        'じぶんじしん',
    'delete this clone':
        'このクローンをさくじょする',

    // sensing:
    'touching %col ?':
        '%col にふれた',
    'touching %clr ?':
        '%clr いろにふれた',
    'color %clr is touching %clr ?':
        '%clr いろが %clr いろにふれた',
    'ask %s and wait':
        '%s ときいてまつ',
    'what\'s your name?':
        'あなたのなまえはなんですか?',
    'answer':
        'こたえ',
    'mouse x':
        'マウスのxざひょう',
    'mouse y':
        'マウスのyざひょう',
    'mouse down?':
        'マウスがおされた',
    'key %key pressed?':
        '%key がおされた',
    'distance to %dst':
        '%dst までのきょり',
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
        '%clr いろをちゅうしゅつ',
    'stack size':
        'スタックのおおきさ',
    'frames':
        'フレーム',

    // operators:
    '%n mod %n':
        '%n を %n でわったあまり',
    'round %n':
        '%n をまるめる',
    '%fun of %n':
        '%fun %n',
    'pick random %n to %n':
        '%n から %n までのらんすう',
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
    'letter %n of %s':
        '%n もじめのもじ %s',
    'length of %s':
        '%s のながさ',
    'unicode of %s':
        '%s のUnicode',
    'unicode %n as letter':
        'Unicodeで %n のもじ',
    'is %s a %typ ?':
        '%s は %typ がた',
    'is %s identical to %s ?':
        '%s は %s とどういつ',

    'type of %s':
        '%s のかた',

    // variables:
    'Make a variable':
        'あたらしいへんすうをつくる',
    'Variable name':
        'へんすうめい',
    'Delete a variable':
        'へんすうをさくじょ',

    'set %var to %s':
        '%var を %s にする',
    'change %var by %n':
        '%var を %n ずつかえる',
    'show variable %var':
        '%var ひょうじする',
    'hide variable %var':
        '%var をかくす',
    'script variables %scriptVars':
        'スクリプトへんすう %scriptVars',

    // lists:
    'list %exp':
        'リスト %exp',
    '%s in front of %l':
        '%s を %l のせんとうにおく',
    'item %idx of %l':
        '%idx ばんめ %l',
    'all but first of %l':
        '%l のせんとういがい',
    'length of %l':
        '%l のながさ',
    '%l contains %s':
        '%l に %s がふくまれているか',
    'thing':
        'なにか',
    'add %s to %l':
        '%s を %l についかする',
    'delete %ida of %l':
        '%ida を %l からさくじょする',
    'insert %s at %idx of %l':
        '%s を %idx ばんめにそうにゅうする %l',
    'replace item %idx of %l with %s':
        '%idx ばんめ %l を %s でおきかえる',

    // other
    'Make a block':
        'ブロックをつくる',

    // menus
    // snap menu
    'About...':
        'Snap!について...',
    'Snap! website':
        'Snap!のWebサイト',
    'Download source':
        'ソースをダウンロード',
    'Switch back to user mode':
        'ユーザーモードにきりかえ',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'こうどなモーフィックコンテクストメニューをむこうにして\nユーザーフレンドリーなメニューをひょうじする',
    'Switch to dev mode':
        'かいはつしゃモードにきりかえる',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'ユーザーフレンドリーではない\nモーフィックコンテクストメニューと\nインスペクターをゆうこうにする',

    // project menu
    'Project notes...':
        'プロジェクトのメモ...',
    'New':
        'しんき',
    'Open...':
        'ひらく...',
    'Save':
        'ほぞん',
    'Save As...':
        'なまえをつけてほぞん...',
    'Import...':
        'よみこみ...',
    'file menu import hint':
        'チェックするとレポーターをドラッグ&ドロップするとき\n'
		+ 'そらのレポーターにフォーカスします\n\n'
		+ 'いくつかのブラウザーではサポートされません',
    'Export project as plain text...':
        'テキストファイルとしてプロジェクトをかきだす...',
    'Export project...':
        'プロジェクトをかきだす...',
    'show project data as XML\nin a new browser window':
        'プロジェクトのデータをXMLとして\nブラウザのあたらしいウインドウにひょうじする',
    'Export blocks...':
        'ブロックをかきだす...',
    'show global custom block definitions as XML\nin a new browser window':
        'グローバルカスタムブロックのていぎをXMLとして\nブラウザのあたらしいウインドウにひょうじする',
    'Import tools':
        'ツールをよみこむ',
    'load the official library of\npowerful blocks':
        'きょうりょくなブロックのこうしき\nライブラリをよみこむ',

    // cloud menu
    'Login...':
        'ログイン...',
    'Signup...':
        'サインアップ...',

    // settings menu
    'Language...':
        'げんご...',
    'Zoom blocks...':
        'ブロックをズーム...',
    'Blurred shadows':
        'はんとうめいのかげ',
    'uncheck to use solid drop\nshadows and highlights':
        'チェックをはずすとたんしょくのかげと\nハイライトになります',
    'check to use blurred drop\nshadows and highlights':
        'チェックするとはんとうめいのかげと\nハイライトになります',
    'Zebra coloring':
        'じま々でひょうじ',
    'check to enable alternating\ncolors for nested blocks':
        'チェックするといれこになった\nブロックをじま々でひょうじします',
    'uncheck to disable alternating\ncolors for nested block':
        'チェックをはずすといれこになった\nブロックをふつうにひょうじします',
    'Dynamic input labels':
        'どうてきなにゅうりょくラベル',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'チェックをはずすとかへんこひきすうの\nどうてきラベルをふかにします',
    'check to enable dynamic\nlabels for variadic inputs':
        'チェックするとかへんこひきすうの\nどうてきラベルをかのうにします',
    'Prefer empty slot drops':
        'そらのスロットのドロップをゆるす',
    'settings menu prefer empty slots hint':
        'せっていメニューがそらのスロットのヒントをゆるします',
    'uncheck to allow dropped\nreporters to kick out others':
        'チェックをはずすとドロップしたレポーターが\nほかをおしだせるようになります',
    'Long form input dialog':
        'ひきすうダイアログをながいけいしきにする',
    'check to always show slot\ntypes in the input dialog':
        'チェックするとひきすうダイアログに\nつねにスロットのかたをひょうじします',
    'uncheck to use the input\ndialog in short form':
        'チェックをはずすとひきすうダイアログをみじかくひょうじします',
    'Virtual keyboard':
        'かそうキーボード',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'チェックをはずすとモバイルききようの\nかそうキーボードをむこうにします',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'チェックするとモバイルききようの\nかそうキーボードをゆうこうにします',
    'Input sliders':
        'にゅうりょくスライダー',
    'uncheck to disable\ninput sliders for\nentry fields':
        'チェックをはずすとにゅうりょくフィールドのスライダーをむこうにします',
    'check to enable\ninput sliders for\nentry fields':
        'チェックするとにゅうりょくフィールドのスライダーをゆうこうにします',
    'Clicking sound':
        'クリックおん',
    'uncheck to turn\nblock clicking\nsound off':
        'チェックをはずすとブロックの\nクリックおんをきります',
    'check to turn\nblock clicking\nsound on':
        'チェックをはずすとブロックの\nクリックおんをいれます',
    'Animations':
        'アニメーション',
    'uncheck to disable\nIDE animations':
        'チェックをはずすとIDEの\nアニメーションをきります',
    'check to prioritize\nscript execution':
        'チェックするとスクリプトの\nしょりをゆうせんします',
    'uncheck to run scripts\nat normal speed':
        'チェックをはずすとスクリプトを\nつうじょうのそくどでじっこうします',
    'check to enable\nIDE animations':
        'チェックするとIDEの\nアニメーションをいれます',
    'Turbo mode':
        'ターボモード',
    'Thread safe scripts':
        'スクリプトをスレッドセーフにする',
    'uncheck to allow\nscript reentrancy':
        'チェックをはずすとスクリプトを\nさいにゅうかのうにします',
    'check to disallow\nscript reentrancy':
        'チェックするとスクリプトを\nさいにゅうふのうにします',
    'Prefer smooth animations':
        'なめらかなアニメーションにする',
    'uncheck for greater speed\nat variable frame rates':
        'チェックをはずすとフレームレート\nあたりのそくどをあげます',
    'check for smooth, predictable\nanimations across computers':
        'チェックするとコンピューターかんで\nなめらかでよそくかのうなアニメーションにします',

    // inputs
    'with inputs':
        'ひきすう',
    'input names:':
        'ひきすうめい:',
    'Input Names:':
        'ひきすうめい:',
    'input list:':
        'ひきすうリスト:',

    // context menus:
    'help':
        'ヘルプ',

    // blocks:
    'help...':
        'ヘルプ...',
    'duplicate':
        'ふくせい',
    'make a copy\nand pick it up':
        'コピーをつくって\nそれをつかみます',
    'only duplicate this block':
        'このブロックをコピーするだけ',
    'delete':
        'さくじょ',
    'script pic...':
        'スクリプトのがぞう...',
    'open a new window\nwith a picture of this script':
        'このスクリプトのがぞうをひょうじするあたらしいウィンドウをひらきます',
    'ringify':
        'リングか',
    'unringify':
        'ひリングか',

    // custom blocks:
    'delete block definition...':
        'ブロックのていぎをさくじょ',
    'edit...':
        'へんしゅう...',

    // sprites:
    'edit':
        'へんしゅう',
    'export...':
        'かきだし...',

    // stage:
    'show all':
        'すべてをひょうじ',
    'pic...':
        'がぞう...',
    'open a new window\nwith a picture of the stage':
        'このステージのがぞうで\nあたらしいウィンドウをひらく',

    // scripting area
    'clean up':
        'きれいにする',
    'arrange scripts\nvertically':
        'スクリプトを\nたてにせいれつします',
    'add comment':
        'コメントをついか',
    'make a block...':
        'ブロックをつくる...',

    // costumes
    'rename':
        'なまえをへんこう',
    'export':
        'かきだし',
    'rename costume':
        'コスチュームのなまえをへんこう',

    // sounds
    'Play sound':
        'おとをならす',
    'Stop sound':
        'おとをとめる',
    'Stop':
        'ていし',
    'Play':
        'さいせい',
    'rename sound':
        'おとのなまえをへんこう',

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
        'つくろう',
    'your own':
        'あなたじしんの',
    'blocks':
        'ブロックを',
    'normal (1x)':
        'ノーマル (1x)',
    'demo (1.2x)':
        'デモ (1.2x)',
    'presentation (1.4x)':
        'プレゼンテーション (1.4x)',
    'big (2x)':
        'だい (2x)',
    'huge (4x)':
        'とくだい (4x)',
    'giant (8x)':
        'きょだい (8x)',
    'monstrous (10x)':
        'ちょうきょだい (10x)',

    // Project Manager
    'Untitled':
        'めいしょうみせってい',
    'Open Project':
        'プロジェクトをひらく',
    'Open':
        'ひらく',
    '(empty)':
        '(そら)',
    'Saved!':
        'ほぞんしました!',
    'Delete Project':
        'プロジェクトをさくじょ',
    'Are you sure you want to delete':
        'ほんとうにさくじょしますか',
    'rename...':
        'なまえをへんこう...',

    // costume editor
    'Costume Editor':
        'コスチュームエディター',
    'click or drag crosshairs to move the rotation center':
        'クリックかドラッグでかいてんちゅうしんをいどうする',

    // project notes
    'Project Notes':
        'プロジェクトのメモ',

    // new project
    'New Project':
        'あたらしいプロジェクト',
    'Replace the current project with a new one?':
        'げんざいのプロジェクトをあたらしいものでおきかえますか?',

    // open project
    'Open Projekt':
        'プロジェクトをひらく',

    // save project
    'Save Project As...':
        'なまえをつけてプロジェクトをほぞん...',

    // export blocks
    'Export blocks':
        'ブロックをかきだし',
    'Import blocks':
        'ブロックをよみこみ',
    'this project doesn\'t have any\ncustom global blocks yet':
        'このプロジェクトはカスタムグローバルブロックをもっていません',
    'select':
        'せんたく',
    'all':
        'すべて',
    'none':
        'なし',

    // variable dialog
    'for all sprites':
        'すべてのスプライトよう',
    'for this sprite only':
        'このスプライトよう',

    // block dialog
    'Change block':
        'ブロックをへんこう',
    'Command':
        'コマンド',
    'Reporter':
        'モニター',
    'Predicate':
        'じゅつご',

    // block editor
    'Block Editor':
        'ブロックエディター',
    'Apply':
        'てきよう',

    // block deletion dialog
    'Delete Custom Block':
        'カスタムブロックをさくじょ',
    'block deletion dialog text':
        'このカスタムブロックとすべてのインスタンスを\nさくじょしてもよいですか?',

    // input dialog
    'Create input name':
        'ひきすうめいをさくせい',
    'Edit input name':
        'ひきすうめいをへんしゅう',
    'Edit label fragment':
        'ラベルのだんぺんをへんしゅう',
    'Title text':
        'タイトルテキスト',
    'Input name':
        'ひきすうめい',
    'Delete':
        'さくじょ',
    'Object':
        'オブジェクト',
    'Number':
        'かず',
    'Text':
        'テキスト',
    'List':
        'リスト',
    'Any type':
        'ぜんタイプ',
    'Boolean (T/F)':
        'しんぎち (はい/いいえ)',
    'Command\n(inline)':
        'コマンド\n(インライン)',
    'Command\n(C-shape)':
        'コマンド \n(Cけい)',
    'Any\n(unevaluated)':
        'にんい\n(みひょうか)',
    'Boolean\n(unevaluated)':
        'しんぎち\n(みひょうか)',
    'Single input.':
        'たんいつひきすう.',
    'Default Value:':
        'デフォルトち:',
    'Multiple inputs (value is list of inputs)':
        'ふくすうのひきすう (あたいはひきすうのリスト)',
    'Upvar - make internal variable visible to caller':
        'Upvar - よびだしもとからみえるないぶてきなへんすう',

   // About Snap
    'About Snap':
        'Snapについて',
    'Back...':
        'もどる...',
    'License...':
        'ライセンス...',
    'Modules...':
        'モジュール...',
    'Credits...':
        'クレジット...',
    'Translators...':
        'ほんやくしゃ',
    'License':
        'ライセンス',
    'current module versions:':
        'げんざいのモジュールのバージョン:',
    'Contributors':
        'こうけんしゃ:',
    'Translations':
        'ほんやく',

    // variable watchers
    'normal':
        'つうじょう',
    'large':
        'だい',
    'slider':
        'スライダー',
    'slider min...':
        'スライダーのさいしょうち...',
    'slider max...':
        'スライダーのさいだいち...',
    'import...':
        'よみこみ...',
    'Slider minimum value':
        'スライダーのさいしょうち',
    'Slider maximum value':
        'スライダーのさいだいち',

    // list watchers
    'length: ':
        'ながさ: ',

    // coments
    'add comment here...':
        'ここにコメントをついか...',

    // drow downs
    // directions
    '(90) right':
        '(90) みぎ',
    '(-90) left':
        '(-90) ひだり',
    '(0) up':
        '(0) じょう',
    '(180) down':
        '(180) か',

    // collision detection
    'mouse-pointer':
        'マウスのポインター',
    'edge':
        'はし',
    'pen trails':
        'ペンのきせき',

    // costumes
    'Turtle':
        'タートル',
    'Empty':
        'そら',

    // graphical effects
    'ghost':
        'ゆうれい',

    // keys
    'space':
        'スペース',
    'up arrow':
        'うわむきやじるし',
    'down arrow':
        'したむきやじるし',
    'right arrow':
        'みぎむきやじるし',
    'left arrow':
        'ひだりむきやじるし',
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
        'しんき...',

    // math functions
    'abs':
        'ぜったいち',
    'sqrt':
        'へいほうこん',
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
        'かず',
    'text':
        'テキスト',
    'Boolean':
        'しんぎち',
    'list':
        'リスト',
    'command':
        'コマンド',
    'reporter':
        'レポーター',
    'predicate':
        'じゅつご',

    // list indices
    'last':
        'さいご',
    'any':
        'にんい',

    // missing entries
    'Reference manual':
        'リファレンスマニュアル',
    'Sign in':
        'サインイン',
    'User name:':
        'ユーザーめい:',
    'Password:':
        'パスワード:',
    'stay signed in on this computer\nuntil logging out':
        'ログアウトするまでこのコンピューターに\nサインインしたままにする',
    'Sign up':
        'サインアップ',
    'User name:':
        'ユーザーめい:',
    'Password:':
        'パスワード:',
    'Birth date:':
        'たんじょうづき:',
    'Birth date:':
        'とし:',
    'January':
        '１がつ',
    'February':
        '２がつ',
    'March':
        '３がつ',
    'April':
        '４がつ',
    'May':
        '５がつ',
    'June':
        '６がつ',
    'July':
        '７がつ',
    'August':
        '８がつ',
    'September':
        '９がつ',
    'October':
        '１０がつ',
    'November':
        '１１がつ',
    'December':
        '１２がつ',
    '1993 or before':
        '１９９３ねんいぜん',
    'E-mail address:':
        'でんしメールアドレス:',
    'Terms of Service...':
        'サービスりようきやく...',
    'Privacy...':
        'こじんじょうほう...',
    'I have read and agree\nto the Terms of Service':
        'サービスりようきやくをよみ\nそれにどういします',

};
