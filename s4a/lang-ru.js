s4aTempDict = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)
    Ä, ä   \u00c4, \u00e4
    Ö, ö   \u00d6, \u00f6
    Ü, ü   \u00dc, \u00fc
    ß      \u00df
	à      \u00E0
	è      \u00E8
	’      \u2019
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
		'цифровой вход',

	'digital output':
		'цифровой виход',

	'PWM':
		'PWM',

	'servo':
		'серво',

	'clockwise':
		'по часовой стрелке',

	'clockwise (1500-1000)':
		'по часовой стрелке (1500-1000)',

	'counter-clockwise':
		'против часовой стрелки',

	'counter-clockwise (1500-2000)':
		'против часовой стрелки (1500-2000)',

	'stopped':
		'остановлен',

	'stopped (1500)':
		'остановлен (1500)',

	'angle (0-180)':
		'угол (0-180)',

    'connect to Arduino':
        'подключиться к Arduino',

    'disconnect Arduino':
        'отключиться от Arduino',

    'Connect Arduino':
        'Подключиться к Arduino',

    'Disconnect Arduino':
        'Отключиться от Arduino',

    'analog reading %analogPin':
        'аналоговое значение %analogPin',

    'digital reading %digitalPin':
        'цифровое значение %digitalPin',

    'connect arduino at %s':
        'подключиться к arduino через %s',

    'disconnect arduino':
        'Отключиться от arduino',

    'setup digital pin %digitalPin as %pinMode':
        'настроить режим цифрового разъема %digitalPin как %pinMode',

    'set digital pin %digitalPin to %b':
        'изменить статус цифрового разъема %digitalPin на %b',

    'set servo %servoPin to %servoValue':
        'изменить статус разъема серво %servoPin нa %servoValue',

    'set pin %pwmPin to value %n':
        'изменить статус разъема PWM %pwmPin на %n',

    'Connecting board at port\n': 
        'Подключение к плате через порт\n',

    'An Arduino board has been connected. Happy prototyping!':
        'Плата Arduino успешно подключена.\nИнтересных экспериментов!',

    'Board was disconnected from port\n':
        'Плату была отключена от порта\n',

    'It seems that someone pulled the cable!':
        'Возможно, USB кабель был отключен!',

    'Error connecting the board.':
        'Невозможно подключиться к плате.',

    'There is already a board connected to this sprite':
        'К этому спрайту уже подключена плата',

    'Could not connect an Arduino\nNo boards found':
        'Невозможно пдключиться к Arduino\nНе найдено ни одной платы',

    'Could not talk to Arduino in port\n':
        'Ошибка обмена данными с Arduino через порт\n',

    'Check if firmata is loaded.':
        'Проверить, загружен ли скетч Firmata.',

    'An error was detected on the board\n\n':
        'С данной платой возникли проблемы\n\n',

    'Board is not connected':
        'Плата отключена'

};

// Add attributes to original SnapTranslator.dict.ru
for (var attrname in s4aTempDict) { SnapTranslator.dict.ru[attrname] = s4aTempDict[attrname]; }
