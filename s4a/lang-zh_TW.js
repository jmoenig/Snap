
s4aTempDict = {

    /*
       Special characters: (see <http://0xcc.net/jsescape/>)

       Ä, ä   \u00c4, \u00e4
       Ö, ö   \u00d6, \u00f6
       Ü, ü   \u00dc, \u00fc
       ß      \u00df
       */
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

    // arduino:

    'digital input':
        '數位輸入',

    'digital output':
        '數位輸出',

    'PWM':
        'PWM',

    'servo':
        '伺服馬達',

    'clockwise':
        '順時針',

    'clockwise (1500-1000)':
        '順時針 (1500-1000)',

    'counter-clockwise':
        '逆時針',

    'counter-clockwise (1500-2000)':
        '逆時針 (1500-2000)',

    'stopped':
        '停止',

    'stopped (1500)':
        '停止 (1500)',

    'disconnected':
        '斷開連接',

    'angle (0-180)':
        '角度 (0-180)',

    'connect to Arduino':
        '連接到Arduino板',

    'disconnect Arduino':
        '斷開與Arduino的連接',

    'Connect Arduino':
        '連接到Arduino板',

    'Disconnect Arduino':
        '斷開與Arduino的連接',

    'analog reading %analogPin':
        '類比輸入值 %analogPin',

    'digital reading %digitalPin':
        '數位輸入值 %digitalPin',

    'connect arduino at %s':
        '連接位於 %s 的Arduino板',

    'disconnect arduino':
        '斷開與Arduino的連接',

    'setup digital pin %digitalPin as %pinMode':
        '數位腳 %digitalPin 設置成 %pinMode',

    'set digital pin %digitalPin to %b':
        '數位腳 %digitalPin 設定成 %b',

    'set servo %servoPin to %servoValue':
        '%servoPin 腳的伺服馬達設定成 %servoValue',

    'set pin %pwmPin to value %n':
        '%pwmPin 腳的值設定成 %n',

    'Connecting board at port\n': 
        '正在連接控制板，通訊埠：\n',

    'An Arduino board has been connected. Happy prototyping!':
        '接上Arduino板了，祝你玩得愉快！',

    'Board was disconnected from port\n':
        '控制板已中斷連線了，通訊埠：\n',

    'It seems that someone pulled the cable!':
        '看來有人拔掉連接線了！',

    'Error connecting the board.':
        '連接控制板時發生錯誤',

    'There is already a board connected to this sprite':
        '已經有一個控制板連接到這個角色了',

    'Could not connect an Arduino\nNo boards found':
        '無法連接到Arduino\n找不到控制板',

    'Could not talk to Arduino in port\n':
        '無法與Arduino聯繫，通訊埠：\n',

    'Check if firmata is loaded.':
        '檢查是否已經載入Firmata韌體。',

    'An error was detected on the board\n\n':
        '在控制板上發現錯誤\n\n',

    'Board is not connected':
        '沒有連接控制板',

    'New Arduino translatable project':
        '新增Arduino可轉譯專案',

    'select a port':
        '選擇一個通訊埠',

    'Network port':
        '網路通訊埠',

    'Enter hostname or ip address:':
        '輸入主機名稱或IP位址：',

    'Connecting to network port:\n':
        '連線到網路通訊埠：\n',

    'This may take a few seconds...':
        '可能要等數秒…',

    'Network serial ports':
        '網路序列埠'
};

// Please change the LANG keyword in the lines below by your locale's two-digit code in lowercase,
// like en for English, ca for Catalan, zh for Mandarin or de for German.

// Add attributes to original SnapTranslator.dict.LANG
for (var attrname in s4aTempDict) { SnapTranslator.dict.zh_TW[attrname] = s4aTempDict[attrname]; }
