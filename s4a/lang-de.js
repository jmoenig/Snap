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
		'digitaler Eingang',

	'digital output':
		'digitaler Ausgang',

	'PWM':
		'PWM',

	'servo':
		'Servo',

	'clockwise':
		'im Uhrzeigersinn',

	'clockwise (1500-1000)':
		'im Uhrzeigersinn (1500-1000)',

	'counter-clockwise':
		'gegen den Uhrzeigersinn',

	'counter-clockwise (1500-2000)':
		'gegen den Uhrzeigersinn (1500-2000)',

	'stopped':
		'gestoppt',

	'stopped (1500)':
		'gestoppt (1500)',

	'angle (0-180)':
		'Winkel (0-180)',

    'connect to Arduino':
        'mit Arduino verbinden',

    'disconnect Arduino':
        'Verbindung zu Arduino trennen',

	'Connect Arduino':
        'Mit Arduino verbinden',

    'Disconnect Arduino':
        'Verbindung zu Arduino trennen',

    'analog reading %analogPin':
        'lies analogen Pin %analogPin',

    'digital reading %digitalPin':
        'lies digitalen Pin %digitalPin',

    'connect arduino at %s':
        'verbinde Arduino an Port %s',

    'disconnect arduino':
        'verbindung zu Arduino trennen',

    'setup digital pin %digitalPin as %pinMode':
        'Einrichten des digitalen Pins %digitalPin als %pinMode',

    'set digital pin %digitalPin to %b':
        'Setze digitalen Pin %digitalPin auf %b',

    'set servo %servoPin to %servoValue':
        'Setze Servo %servoPin auf %servoValue',

    'set pin %pwmPin to value %n':
        'Setze Pin %pwmPin auf %n',

    'Connecting board at port\n': 
        'Verbinde mit Board an Port\n',

    'An Arduino board has been connected. Happy prototyping!':
        'Ein Arduino-Board wurde verbunden. Fröhliches Prototyping!',

    'Board was disconnected from port\n':
        'Verbindung zum Board wurde getrennt an Port\n',

    'It seems that someone pulled the cable!':
        'Scheinbar hat jemand das Kabel gezogen!',

    'Error connecting the board.':
        'Fehler beim verbinden mit dem Board.',

    'There is already a board connected to this sprite':
        'Es ist bereits ein Board mit diesem Sprite verbunden',

    'Could not connect an Arduino\nNo boards found':
        'Konnte nicht mit Arduino verbinden\nKeine Boards gefunden',

    'Could not talk to Arduino in port\n':
        'Kommunikation mit Arduino fehlgeschlagen an Port\n',

    'Check if firmata is loaded.':
        'Überprüfe, ob die Firmata geladen wurde.',

    'An error was detected on the board\n\n':
        'Es wurde ein Fehler auf dem Board festgestellt\n\n',

    'Board is not connected':
        'Board ist nicht verbunden'

};

// Add attributes to original SnapTranslator.dict.de
for (var attrname in s4aTempDict) { SnapTranslator.dict.de[attrname] = s4aTempDict[attrname]; }
