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
        '数字输入',

    'digital output':
        '数字输出',

    'PWM':
        'PWM',

    'servo':
        '舵机',

    'clockwise':
        '顺时针',

    'clockwise (1500-1000)':
        '顺时针 (1500-1000)',

    'counter-clockwise':
        '逆时针',

    'counter-clockwise (1500-2000)':
        '逆时针 (1500-2000)',

    'stopped':
        '停止',

    'stopped (1500)':
        '停止 (1500)',

    'disconnected':
        '断开连接',

    'angle (0-180)':
        '角度 (0-180)',

    'connect to Arduino':
        '连接到Arduino板',

    'disconnect Arduino':
        '断开与Arduino的连接',

    'Connect Arduino':
        '连接到Arduino板',

    'Disconnect Arduino':
        '断开与Arduino的连接',

    'analog reading %analogPin':
        '模拟输入值 %analogPin',

    'digital reading %digitalPin':
        '数字输入值 %digitalPin',

    'connect arduino at %s':
        '连接位于 %s 的Arduino板',

    'disconnect arduino':
        '断开与Arduino的连接',

    'setup digital pin %digitalPin as %pinMode':
        '数字脚 %digitalPin 设置成 %pinMode',

    'set digital pin %digitalPin to %b':
        '数字脚 %digitalPin 设置成 %b',

    'set servo %servoPin to %servoValue':
        '%servoPin 脚的舵机设置成 %servoValue',

    'set pin %pwmPin to value %n':
        '%pwmPin 脚的值设置成 %n',

    'Connecting board at port\n': 
        '正在连接控制板，端口：\n',

    'An Arduino board has been connected. Happy prototyping!':
        '接上Arduino板了，祝你玩得愉快！',

    'Board was disconnected from port\n':
        '控制板已中断连接，端口：\n',

    'It seems that someone pulled the cable!':
        '看来有人拔掉连接线了！',

    'Error connecting the board.':
        '连接控制板时发生错误',

    'There is already a board connected to this sprite':
        '已经有一个控制板连接到这个角色了',

    'Could not connect an Arduino\nNo boards found':
        '无法连接到Arduino\n找不到控制板',

    'Could not talk to Arduino in port\n':
        '无法与Arduino联系，端口：\n',

    'Check if firmata is loaded.':
        '检查是否已经加载Firmata固件。',

    'An error was detected on the board\n\n':
        '在控制板上发现错误\n\n',

    'Board is not connected':
        '没有连接控制板',

    'New Arduino translatable project':
        '新增Arduino可转译项目',

    'select a port':
        '选择一个端口',

    'Network port':
        '网络端口  ',

    'Enter hostname or ip address:':
        '输入主机名或IP地址：',

    'Connecting to network port:\n':
        '连线到网络端口：\n',

    'This may take a few seconds...':
        '可能要等数秒…',

    'Network serial ports':
        '网络串口'
};

// Please change the LANG keyword in the lines below by your locale's two-digit code in lowercase,
// like en for English, ca for Catalan, zh for Mandarin or de for German.

// Add attributes to original SnapTranslator.dict.LANG
for (var attrname in s4aTempDict) { SnapTranslator.dict.zh_CN[attrname] = s4aTempDict[attrname]; }
