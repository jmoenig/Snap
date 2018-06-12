/*

	lang-ko.js

	Korean translation for SNAP!

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

SnapTranslator.dict.ko = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    Ä, ä   \u00c4, \u00e4
    Ö, ö   \u00d6, \u00f6
    Ü, ü   \u00dc, \u00fc
    ß      \u00df
*/

    // translations meta information
    'language_name':
        '한국어', // the name as it should appear in the language menu
    'language_translator':
        'Yunjae Jang', // your name for the Translators tab
    'translator_e-mail':
        'janggoons@gmail.com', // optional
    'last_changed':
        '2015-01-21', // this, too, will appear in the Translators tab

    // GUI
    // control bar:
    'untitled':
        '이름없음',
    'development mode':
        '개발자 모드',

    // categories:
    'Motion':
        '동작',
    'Looks':
        '형태',
    'Sound':
        '소리',
    'Pen':
        '펜',
    'Control':
        '제어',
    'Sensing':
        '관찰',
    'Operators':
        '연산',
    'Variables':
        '변수',
    'Lists':
        '리스트',
    'Other':
        '기타',

    // editor:
    'draggable':
        '마우스로 직접 움직이기',

    // tabs:
    'Scripts':
        '스크립트',
    'Costumes':
        '모양',
    'Sounds':
        '소리',

    // names:
    'Sprite':
        '스프라이트',
    'Stage':
        '무대',

    // rotation styles:
    'don\'t rotate':
        '회전할 수 없습니다',
    'can rotate':
        '회전가능',
    'only face left/right':
        '왼쪽에서 오른쪽으로만',

    // new sprite button:
    'add a new Turtle sprite':
        '새로운 스프라이트 추가하기',

    // new paint sprite button:
    'paint a new sprite':
        '새로운 스프라이트 그리기',

    // new paint costume button:
    'Paint a new costume':
        '새로운 모양 그리기',

    // tab help
    'costumes tab help':
        '다른 웹페이지나 컴퓨터에 있는 이미지 파일을\n'
            + '여기로 드래그해서 가져옵니다.',
    'import a sound from your computer\nby dragging it into here':
        '컴퓨터에 있는 소리 파일을\n 여기로 드래그해서 가져옵니다.',

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
        '무대 선택: 사용 가능한 동작 블록이 없습니다.',

    'move %n steps':
        '%n 만큼 움직이기',
    'turn %clockwise %n degrees':
        '%clockwise %n 도 돌기',
    'turn %counterclockwise %n degrees':
        '%counterclockwise %n 도 돌기',
    'point in direction %dir':
        '%dir 도 방향 보기',
    'point towards %dst':
        '%dst 쪽 보기',
    'go to x: %n y: %n':
        'x: %n 、y: %n 쪽으로 이동하기',
    'go to %dst':
        '%dst 위치로 이동하기',
    'glide %n secs to x: %n y: %n':
        '%n 초 동안 x: %n 、y: %n 쪽으로 이동하기',
    'change x by %n':
        'x좌표 %n 만큼 바꾸기',
    'set x to %n':
        'x좌표 %n (으)로 정하기',
    'change y by %n':
        'y좌표 %n 만큼 바꾸기',
    'set y to %n':
        'y좌표 %n (으)로 정하기',
    'if on edge, bounce':
        '벽에 닿으면 튕기기',
    'x position':
        'x좌표',
    'y position':
        'y좌표',
    'direction':
        '방향',

    // looks:
    'switch to costume %cst':
        '모양 %cst 로 바꾸기',
    'next costume':
        '다음 모양',
    'costume #':
        '모양 번호',
    'say %s for %n secs':
        '%s 을(를) %n 초 동안 말하기',
    'say %s':
        '%s 말하기',
    'think %s for %n secs':
        '%s 을(를) %n 초 동안 생각하기',
    'think %s':
        '%s 생각하기',
    'Hello!':
        '안녕!',
    'Hmm...':
        '흠…',
    'change %eff effect by %n':
        '%eff 효과를 %n 만큼 바꾸기',
    'set %eff effect to %n':
        '%eff 효과를 %n 만큼 정하기',
    'clear graphic effects':
        '그래픽 효과 지우기',
    'change size by %n':
        '크기를 %n 만큼 바꾸기',
    'set size to %n %':
        '크기를 %n % 로 정하기',
    'size':
        '크기',
    'show':
        '보이기',
    'hide':
        '숨기기',
    'go to front':
        '맨 앞으로 나오기',
    'go back %n layers':
        '%n 번째로 물러나기',

    'development mode \ndebugging primitives:':
        '개발자 모드\n디버깅 프리미티브:',
    'console log %mult%s':
        '콘솔 로그 %mult%s',
    'alert %mult%s':
        '경고: %mult%s',

    // sound:
    'play sound %snd':
        '%snd 소리내기',
    'play sound %snd until done':
        '%snd 을(를) 끝까지 소리내기',
    'stop all sounds':
        '모든 소리 끄기',
    'rest for %n beats':
        '%n 박자 동안 쉬기',
    'play note %n for %n beats':
        '%n 음을 %n 박자로 연주하기',
    'change tempo by %n':
        '빠르기를 %n 만큼 바꾸기',
    'set tempo to %n bpm':
        '빠르기를 %n bpm으로 정하기',
    'tempo':
        '빠르기',


    // pen:
    'clear':
        '펜 자국 지우기',
    'pen down':
        '펜 내리기',
    'pen up':
        '펜 올리기',
    'set pen color to %clr':
        '펜 색깔을 %clr 으로 정하기',
    'change pen color by %n':
        '펜 색깔을 %n 만큼 바꾸기',
    'set pen color to %n':
        '펜 색깔을 %n (으)로 정하기',
    'change pen shade by %n':
        '펜 음영을 %n 만큼 바꾸기',
    'set pen shade to %n':
        '펜 음영을 %n 으로 정하기',
    'change pen size by %n':
        '펜 굵기를 %n 만큼 바꾸기',
    'set pen size to %n':
        '펜 굵기를 %n (으)로 정하기',
    'stamp':
        '도장찍기',

    // control:
    'when %greenflag clicked':
        '%greenflag 클릭했을 때',
    'when %keyHat key pressed':
        '%keyHat 키를 눌렀을 때',
    'when I am clicked':
        '이 스프라이트를 클릭했을 때',
    'when I receive %msgHat':
        '%msgHat 을(를) 받았을 때',
    'broadcast %msg':
        '%msg 방송하기',
    'broadcast %msg and wait':
        '%msg 방송하고 기다리기',
    'Message name':
        '메시지 이름',
    'message':
        '메시지',
    'any message':
        '어떤 메시지',
    'wait %n secs':
        '%n 초 기다리기',
    'wait until %b':
        '%b 까지 기다리기',
    'forever %c':
        '무한 반복하기 %c',
    'repeat %n %c':
        '%n 번 반복하기 %c',
    'repeat until %b %c':
        '%b 까지 반복하기 %c',
    'if %b %c':
        '만약 %b 라면 %c',
    'if %b %c else %c':
        '만약 %b 라면 %c 아니면 %c',
    'report %s':
        '%s 출력하기',
    'stop %stopChoices':
        '%stopChoices 멈추기',
    'all':
        '모두',
    'this script':
        '이 스크립트',
    'this block':
        '이 블록',    
    'stop %stopOthersChoices':
        '%stopOthersChoices 멈추기',
    'all but this script':
        '이 스크립트를 제외한 모두',
    'other scripts in sprite':
        '이 스프라이트에 있는 다른 스크립트',    
    'pause all %pause':
        '모두 잠시 멈추기 %pause',
    'run %cmdRing %inputs':
        '%cmdRing 을(를) %inputs 으로 실행하기',
    'launch %cmdRing %inputs':
        '%cmdRing 을(를) %inputs 으로 동시실행하기',
    'call %repRing %inputs':
        '%repRing 을(를) %inputs 으로 호출하기',
    'run %cmdRing w/continuation':
        '반복해서 %cmdRing 을(를) 실행하기',
    'call %cmdRing w/continuation':
        '반복해서 %cmdRing 을(를) 호출하기',
    'warp %c':
        '워프 %c',
    'when I start as a clone':
        '복제되었을 때',
    'create a clone of %cln':
        '%cln 을(를) 복제하기',
    'myself':
        '나 자신',
    'delete this clone':
        '이 복제본 삭제하기',


    // sensing:
    'touching %col ?':
        '%col 에 닿았는가?',
    'touching %clr ?':
        '%clr 색에 닿았는가?',
    'color %clr is touching %clr ?':
        '%clr 색이 %clr 색에 닿았는가?',
    'ask %s and wait':
        '%s 을(를) 묻고 기다리기',
    'what\'s your name?':
        '당신의 이름은?',
    'answer':
        '대답',
    'mouse x':
        '마우스의 x좌표',
    'mouse y':
        '마우스의 y좌표',
    'mouse down?':
        '마우스를 클릭했는가?',
    'key %key pressed?':
        '%key 키를 눌렀는가?',
    'distance to %dst':
        '%dst 까지 거리',
    'reset timer':
        '타이머 초기화',
    'timer':
        '타이머',
    '%att of %spr':
        '%att ( %spr 에 대한)',
    'http:// %s':
        'http:// %s',
    'turbo mode?':
        '터보 모드인가?',
    'set turbo mode to %b':
        '터보 모드 %b 으로 설정하기',
    'filtered for %clr':
        '%clr 색 추출하기',
    'stack size':
        '스택 크기',
    'frames':
        '프레임',
    'current %dates':
        '현재 %dates',
    'year':
        '연도',
    'month':
        '월',
    'date':
        '일',
    'day of week':
        '요일(1~7)',
    'hour':
        '시간',
    'minute':
        '분',
    'second':
        '초',
    'time in milliseconds':
        '밀리세컨드초',

    // operators:
    '%n mod %n':
        '( %n / %n ) 의 나머지',
    'round %n':
        '%n 반올림',
    '%fun of %n':
        '%fun ( %n 에 대한)',
    'pick random %n to %n':
        '%n 부터 %n 사이의 난수',
    '%b and %b':
        '%b 그리고 %b',
    '%b or %b':
        '%b 또는 %b',
    'not %b':
        '%b 이(가) 아니다',
    'true':
        '참',
    'false':
        '거짓',
    'join %words':
        '%words 결합하기',
    'split %s by %delim':
        '%s 를 %delim 기준으로 나누기',
    'hello':
        '안녕',
    'world':
        '세상',
    'letter %idx of %s':
        '%idx 번째 글자 ( %s 에 대한)',
    'length of %s':
        '%s 의 길이',
    'unicode of %s':
        '%s 의 유니코드',
    'unicode %n as letter':
        '유니코드 %n 에 대한 문자',
    'is %s a %typ ?':
        '%s 이(가) %typ 인가?',
    'is %s identical to %s ?':
        '%s 와(과) %s 가 동일한가?',
    'type of %s':
        '%s 의 타입',

    // variables:
    'Make a variable':
        '변수 만들기',
    'Variable name':
        '변수 이름',
    'Delete a variable':
        '변수 삭제하기',

    'set %var to %s':
        '변수 %var 에 %s 저장하기',
    'change %var by %n':
        '변수 %var 을(를) %n 만큼 바꾸기',
    'show variable %var':
        '변수 %var 보이기',
    'hide variable %var':
        '변수 %var 숨기기',
    'script variables %scriptVars':
        '스크립트 변수 %scriptVars',

    // lists:
    'list %exp':
        '리스트 %exp',
    '%s in front of %l':
        '%s 을(를) 리스트 %l 의 맨 앞에 추가하기 ',
    'item %idx of %l':
        '%idx 번째 항목 (리스트 %l 에 대한)',
    'all but first of %l':
        '리스트 %l 에서 첫 번째 항목 제외하기',
    'length of %l':
        '리스트 %l 의 항목 갯수',
    '%l contains %s':
        '리스트 %l 에 %s 포함되었는가?',
    'thing':
        '어떤 것',
    'add %s to %l':
        '%s 을(를) 리스트 %l 의 마지막에 추가하기 ',
    'delete %ida of %l':
        '%ida 번째 항목 삭제하기 (리스트 %l 에 대한)',
    'insert %s at %idx of %l':
        '%s 을(를) %idx 위치에 추가하기 (리스트 %l 에 대한)',
    'replace item %idx of %l with %s':
        '%idx 번째 (리스트 %l 에 대한) 를 %s (으)로 바꾸기',

    // other
    'Make a block':
        '블록 만들기',

    // Paint Editor
    'Paint Editor':
        '그림 편집기',
    'undo':
        '되돌리기',
    'grow':
        '확대',
    'shrink':
        '축소',
    'flip ↔':
        '↔ 반전',
    'flip ↕':
        '↕ 반전',
    'Brush size':
        '펜 크기',
    'Constrain proportions of shapes?\n(you can also hold shift)':
        '도형 크기 비율을 고정하는가?\n(shift 키를 눌러서 사용할 수 있습니다.)',
    'Paintbrush tool\n(free draw)':
        '붓 도구',
    'Stroked Rectangle\n(shift: square)':
        '사각형 그리기 도구\n(shift: 정사각형)',
    'Stroked Ellipse\n(shift: circle)':
        '타원 그리기 도구\n(shift: 원)',
    'Eraser tool':
        '지우개 도구',
    'Set the rotation center':
        '회전축 설정하기',
    'Line tool\n(shift: vertical/horizontal)':
        '선 그리기 도구\n(shift: 수평/수직)',
    'Filled Rectangle\n(shift: square)':
        '채워진 사각형 그리기 도구\n(shift: 정사각형)',
    'Filled Ellipse\n(shift: circle)':
        '채워진 타원 그리기 도구\n(shift: 원)',
    'Fill a region':
        '색 채우기',
    'Pipette tool\n(pick a color anywhere)':
        '스포이드 도구\n(원하는 색 선택하기)',

    // menus
    // snap menu
    'About...':
        'Snap! 에 대해서...',
    'Reference manual':
        '참고자료 다운로드',
    'Snap! website':
        'Snap! 웹사이트',
    'Download source':
        '소스코드 다운로드',
    'Switch back to user mode':
        '사용자 모드로 전환',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        '고도의 모픽 컨텍스트 메뉴를 숨겨 사용자 친화적으로 보여줍니다.',
    'Switch to dev mode':
        '개발자 모드로 전환',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        '모픽 컨텍스트 메뉴와 인스펙터를 사용할 수 있으나, 사용자 친화적이지 않습니다!',

    // project menu
    'Project notes...':
        '프로젝트 메모...',
    'New':
        '새로 만들기',
    'Open...':
        '열기...',
    'Save':
        '저장하기',
    'Save to disk':
        '내 컴퓨터에 저장하기',
    'experimental - store this project\nin your downloads folder':
        '실험적 - 이 프로젝트를\n 다운로드 폴더에 저장합니다.',
    'Save As...':
        '다른 이름으로 저장하기...',
    'Import...':
        '가져오기...',
    'file menu import hint':
        '내보낸 프로젝트 파일, 블록 라이브러리\n'
		+ '스프라이트 모양 또는 소리를 가져옵니다.',
    'Export project as plain text...':
        '프로젝트를 텍스트 파일로 내보내기...',
    'Export project...':
        '프로젝트 내보내기...',
    'show project data as XML\nin a new browser window':
        '프로젝트 데이터를\n새로운 윈도우에 XML 형태로 보여주기',
    'Export blocks...':
        '블록 내보내기...',
    'show global custom block definitions as XML\nin a new browser window':
        '새롭게 정의한 전역 블록 데이터를\n새로운 윈도우에 XML 형태로 보여주기',
    'Export all scripts as pic...':
        '모든 스크립트를 그림파일로 내보내기',
    'show a picture of all scripts\nand block definitions':
        '모든 스크립트와 정의된 블록을 그림파일로 보여줍니다.',
    'Import tools':
        '추가 도구 가져오기',
    'load the official library of\npowerful blocks':
        '강력한 기능을 제공하는\n 블록들을 가져옵니다.',
    'Libraries...':
        '라이브러리...',
    'Select categories of additional blocks to add to this project.':
        '추가적인 블록을 선택해서\n 사용할 수 있습니다.',
    'Import library':
        '라이브러리 가져오기',

    // cloud menu
    'Login...':
        '로그인...',
    'Signup...':
        '계정만들기...',
    'Reset Password...':
        '비밀번호 재설정...',
    'url...':
        'url...',
    'export project media only...':
        'export project media only...',
    'export project without media...':
        'export project without media...',
    'export project as cloud data...':
        'export project as cloud data...',
    'open shared project from cloud...':
        'open shared project from cloud...',

    // settings menu
    'Language...':
        '언어선택...',
    'Zoom blocks...':
        '블록 크기 설정...',
    'Stage size...':
        '무대 크기 설정...',
    'Stage size':
        '무대 크기',
    'Stage width':
        '가로(너비)',
    'Stage height':
        '세로(높이)',
    'Default':
        '기본설정',
    
    'Blurred shadows':
        '반투명 그림자',
    'uncheck to use solid drop\nshadows and highlights':
        '체크해제하면, 그림자와 하이라이트가\n불투명 상태로 됩니다.',
    'check to use blurred drop\nshadows and highlights':
        '체크하면, 그림자와 하이라이트가\n반투명 상태로 됩니다.',
    
    'Zebra coloring':
        '중첩 블록 구분하기',
    'check to enable alternating\ncolors for nested blocks':
        '체크하면, 중첩된 블록을\n다른 색으로 구분할 수 있습니다.',
    'uncheck to disable alternating\ncolors for nested block':
        '체크해제하면, 중첩된 블록을\n다른 색으로 구분할 수 없습니다.',
    
    'Dynamic input labels':
        'Dynamic input labels',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'uncheck to disable dynamic\nlabels for variadic inputs',
    'check to enable dynamic\nlabels for variadic inputs':
        'check to enable dynamic\nlabels for variadic inputs',
    
    'Prefer empty slot drops':
        '빈 슬롯에 입력 가능',
    'settings menu prefer empty slots hint':
        '설정 메뉴에 빈 슬롯의\n힌트를 사용할 수 있습니다.',
    'uncheck to allow dropped\nreporters to kick out others':
        '체크해제하면, 기존 리포터 블록에\n새로운 리포터 블록으로 대체할 수 있습니다.',
    
    'Long form input dialog':
        '긴 형태의 입력 대화창',
    'check to always show slot\ntypes in the input dialog':
        '체크하면, 입력 대화창에\n항상 슬롯의 형태를 보여줍니다.',
    'uncheck to use the input\ndialog in short form':
        '체크해제하면, 입력 대화창을\n짧은 형태로 사용합니다.',
    
    'Plain prototype labels':
        '새로 만든 블록 인수 설정',
    'uncheck to always show (+) symbols\nin block prototype labels':
        '체크해제하면, 블록 편집기에서\n 블록 인수 추가 버튼(+)을\n 보입니다.',
    'check to hide (+) symbols\nin block prototype labels':
        '체크하면, 블록 편집기에서\n 블록 인수 추가 버튼(+)을\n 숨깁니다.',
    
    'Virtual keyboard':
        '가상 키보드',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        '체크해제하면, 모바일 기기에서\n가상 키보드를 사용할 수 없습니다.',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        '체크하면, 모바일 기기에서\n가상 키보드를 사용할 수 있습니다.',
    
    'Input sliders':
        '입력창에서 슬라이더 사용',
    'uncheck to disable\ninput sliders for\nentry fields':
        '체크해제하면, 입력창에서\n슬라이더를 사용할 수 없습니다.',
    'check to enable\ninput sliders for\nentry fields':
        '체크하면, 입력창에서\n슬라이더를 사용할 수 있습니다.',
    
    'Clicking sound':
        '블록 클릭시 소리',
    'uncheck to turn\nblock clicking\nsound off':
        '체크해제하면, 블록 클릭시\n소리가 꺼집니다.',
    'check to turn\nblock clicking\nsound on':
        '체크하면, 블록 클릭시\n소리가 켜집니다.',
    
    'Animations':
        '애니메이션',
    'uncheck to disable\nIDE animations':
        '체크해제하면, IDE 애니메이션을\n 사용할 수 없습니다.',
    
    'Turbo mode':
        '터보 모드',
    'check to prioritize\nscript execution':
        '체크하면, 스크립트를\n 빠르게 실행합니다.',
    'uncheck to run scripts\nat normal speed':
        '체크해제하면, 스크립트 실행 속도를\n 보통으로 합니다.',
    
    'Flat design':
        '플랫(Flat) 디자인',
    'uncheck for default\nGUI design':
        '체크해제하면,\n 기본 GUI 디자인으로\n 변경합니다.',
    'check for alternative\nGUI design':
        '체크하면, 플랫(Flat)\n 디자인으로 변경합니다.',
    
    'Sprite Nesting':
        'Sprite Nesting',
    'uncheck to disable\nsprite composition':
        'uncheck to disable\nsprite composition',
    'check to enable\nsprite composition':
        'check to enable\nsprite composition',

    'Thread safe scripts':
        '스레드 안전 스크립트',
    'uncheck to allow\nscript reentrance':
        '체크해제하면, 스크립트\n재진입성을 허락합니다.',
    'check to disallow\nscript reentrance':
        '체크하면, 스크립트\n재진입성을 허락하지 않습니다.',
    
    'Prefer smooth animations':
        '자연스러운 애니메이션',
    'uncheck for greater speed\nat variable frame rates':
        '체크해제하면, 프레임\n 전환 비율이 빨라집니다.',
    'check for smooth, predictable\nanimations across computers':
        '체크하면, 애니메이션이\n 자연스러워 집니다.',
    
    'Flat line ends':
        '선 끝을 평평하게 만들기',
    'check for flat ends of lines':
        '체크하면, 선 끝을\n 평평하게 만듭니다.',
    'uncheck for round ends of lines':
        '체크해제하면, 선 끝을\n 둥글게 만듭니다.',
    
    'Codification support':
        '체계화 지원',
    'uncheck to disable\nblock to text mapping features':
        'uncheck to disable\nblock to text mapping features',    
    'check for block\nto text mapping features':
        '체크하면, check for block\nto text mapping features', 

    // inputs
    'with inputs':
        '매개변수',
    'input names:':
        '매개변수이름:',
    'Input Names:':
        '매개변수이름:',

    // context menus:
    'help':
        '도움말',
    
    // palette:
    'find blocks...':
        '블록 찾기...',
    'hide primitives':
        '기본 블록 숨기기',
    'show primitives':
        '기본 블록 보이기',

    // blocks:
    'help...':
        '블록 도움말...',
    'relabel...':
        '블록 바꾸기...',
    'duplicate':
        '복사하기',
    'make a copy\nand pick it up':
        '복사해서\n들고 있습니다.',
    'delete':
        '삭제하기',
    'script pic...':
        '이 스크립트를 그림파일로 내보내기...',
    'open a new window\nwith a picture of this script':
        '이 스크립트 그림을\n새로운 윈도우에서 엽니다.',
    'ringify':
        '블록형태 변환하기',
    'unringify':
        'unringify',

    // custom blocks:
    'delete block definition...':
        '블록 삭제하기',
    'edit...':
        '편집…',

    // sprites:
    'edit':
        '스크립트 편집하기',
    'export...':
        '내보내기...',

    // stage:
    'show all':
        '모든 스프라이트 나타내기',
    'pic...':
        '그림파일로 내보내기...',
    'open a new window\nwith a picture of the stage':
        '새로운 창을 열고\n무대의 화면을\n그림파일로 저장한다.',

    // scripting area
    'clean up':
        '스크립트 정리하기',
    'arrange scripts\nvertically':
        '스크립트를\n수직으로 정렬한다.',
    'add comment':
        '주석 추가하기',
    'undrop':
        '마지막으로 가져온 블록',
    'undo the last\nblock drop\nin this pane':
        '마지막으로\n 가져온 블록을\n 확인한다.',
    'scripts pic...':
        '모든 스크립트를 그림파일로 내보내기...',
    'open a new window\nwith a picture of all scripts':
        '새로운 창을 열어서\n 모든 스크립트를\n 그림으로 저장한다.',
    'make a block...':
        '블록 만들기...',

    // costumes
    'rename':
        '이름 수정하기',
    'export':
        '내보내기',

    // sounds
    'Play sound':
        '소리 재생',
    'Stop sound':
        '소리 정지',
    'Stop':
        '정지',
    'Play':
        '재생',

    // dialogs
    // buttons
    'OK':
        '확인',
    'Ok':
        '확인',    
    'Cancel':
        '취소',
    'Yes':
        '예',
    'No':
        '아니오',

    // help
    'Help':
        '도움말',

    // zoom blocks
    'Zoom blocks':
        '블록 크기 설정',
    'build':
        '만들기',
    'your own':
        '나만의',
    'blocks':
        '블록',
    'normal (1x)':
        '기본 크기 (1x)',
    'demo (1.2x)':
        '데모 크기 (1.2x)',
    'presentation (1.4x)':
        '발표용 크기 (1.4x)',
    'big (2x)':
        '큰 크기 (2x)',
    'huge (4x)':
        '매우 큰 크기(4x)',
    'giant (8x)':
        '정말 큰 크기 (8x)',
    'monstrous (10x)':
        '믿을 수 없는 크기 (10x)',


    // costume editor
    'Costume Editor':
        '모양 편집기',
    'click or drag crosshairs to move the rotation center':
        '클릭 또는 드래그 해서 회전 중심 설정하기',

    // project notes
    'Project Notes':
        '프로젝트 메모',

    // new project
    'New Project':
        '새로운 프로젝트',
    'Replace the current project with a new one?':
        '현재 프로젝트를 새로운 프로젝트로 교체하시겠습니까?',

    // open project
    'Open Projekt':
        '프로젝트 열기',

    // save project
    'Save Project As...':
        '프로젝트 저장...',

    // export blocks
    'Export blocks':
        '블록 내보내기',
    'this project doesn\'t have any\ncustom global blocks yet':
        '이 프로젝트에는 아직 새로 만든 전역 블록이 없습니다.',
    'select':
        '선택',
    'all':
        '모두',
    'none':
        '모두 취소',

    // variable dialog
    'for all sprites':
        '모든 스프라이트에 대해',
    'for this sprite only':
        '이 스프라이트에 대해',

    // block dialog
    'Change block':
        '블록 변경',
    'Command':
        '커맨드',
    'Reporter':
        '리포터',
    'Predicate':
        '프레디키트',

    // block editor
    'Block Editor':
        '블록 편집기',
    'Apply':
        '적용',

    // block deletion dialog
    'Delete Custom Block':
        '블록 삭제하기',
    'block deletion dialog text':
        '이 블록과 모든 인스턴스를\n 삭제해도 괜찮습니까?',

    // input dialog
    'Create input name':
        '입력 이름 생성',
    'Edit input name':
        '입력 이름 편집',
    'Title text':
        '제목 텍스트',
    'Input name':
        '입력 이름',
    'Delete':
        '삭제',
    'Object':
        '객체',
    'Number':
        '숫자',
    'Text':
        '텍스트',
    'List':
        '리스트',
    'Any type':
        '아무타입',
    'Boolean (T/F)':
        '불리언 (참/거짓)',
    'Command\n(inline)':
        '커맨드\n(인라인)',
    'Command\n(C-shape)':
        '커맨드 \n(C-모양)',
    'Any\n(unevaluated)':
        '아무값\n(평가되지 않음)',
    'Boolean\n(unevaluated)':
        '불리언\n(평가되지 않음)',
    'Single input.':
        '단일 입력',
    'Default Value:':
        '기본 값:',
    'Multiple inputs (value is list of inputs)':
        '다중 입력 (값은 리스트의 입력값입니다)',
    'Upvar - make internal variable visible to caller':
        'Upvar - 호출자에게 내부 변수 보이게 만들기',

    // About Snap
    'About Snap':
        'Snap에 대해서',
    'Back...':
        '뒤로…',
    'License...':
        '라이센스...',
    'Modules...':
        '모듈...',
    'Credits...':
        '크레디트...',
    'Translators...':
        '번역자',
    'License':
        '라이센스',
    'current module versions:':
        '현재 모듈 버전:',
    'Contributors':
        '기여자:',
    'Translations':
        '번역',

    // variable watchers
    'normal':
        '보통 읽기',
    'large':
        '크게 보기',
    'slider':
        '슬라이더',
    'slider min...':
        '슬라이더 최소값 설정...',
    'slider max...':
        '슬라이더 최대값 설정...',
    'Slider minimum value':
        '슬라이더 최소값 설정',
    'Slider maximum value':
        '슬라이더 최대값 설정',

    // list watchers
    'length: ':
        '길이: ',

    // coments
    'add comment here...':
        '여기에 주석 추가…',
    'comment pic...':
        '주석을 그림파일로 내보내기...',

    // drow downs
    // directions
    '(90) right':
        '(90) 오른쪽',
    '(-90) left':
        '(-90) 왼쪽',
    '(0) up':
        '(0) 위',
    '(180) right':
        '(180) 아래',

    // collision detection
    'mouse-pointer':
        '마우스의 포인터',
    'edge':
        '벽',
    'pen trails':
        '펜의 궤적',

    // costumes
    'Turtle':
        '화살표',
    'Empty':
        'Leer',

        // graphical effects
    'brightness':
        '밝기',
    'ghost':
        '유령',
    'negative':
        '반전',
    'comic':
        '코믹',
    'confetti':
        '색종이',


    // keys
    'space':
        '스페이스',
    'up arrow':
        '위쪽 화살표',
    'down arrow':
        '아래쪽 화살표',
    'right arrow':
        '오른쪽 화살표',
    'left arrow':
        '왼쪽 화살표',
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
        '새로 만들기...',

    // math functions
    'abs':
        '절대값(abs)',
    'sqrt':
        '제곱근(sqrt)',
    'floor':
        '바닥(floor)',
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
        '글자',
    'whitespace':
        '빈칸',
    'line':
        '줄',
    'tab':
        '탭',
    'cr':
        '새줄(cr)',

    // data types
    'number':
        '숫자',
    'text':
        '문자',
    'Boolean':
        '불리언',
    'list':
        '리스트',
    'command':
        '커맨드',
    'reporter':
        '리포터',
    'predicate':
        '프레디키트',

    // list indices
    'last':
        '마지막',
    'any':
        '임의',

    // missing entries
    'Untitled':
        '이름없음',
    'Open Project':
        '프로젝트 열기',
    'Open':
        '열기',
    '(empty)':
        '(공란)',
    'Saved!':
        '저장했습니다!',
    'Delete Project':
        '프로젝트 삭제',
    'Are you sure you want to delete':
        '정말로 삭제합니까?',
    'unringify':
        '블록형태변환 취소하기',
    'rename...':
        '이름수정...',
    '(180) down':
        '(180) 아래',
    'Ok':
        '확인'

};
