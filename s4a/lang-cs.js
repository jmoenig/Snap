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
		'digitální vstup',

	'digital output':
		'digitální výstup',

	'PWM':
		'PWM',

	'servo':
		'servo',

	'clockwise':
		'po směru hodin',

	'clockwise (1500-1000)':
		'po směru hodin (1500-1000)',

	'counter-clockwise':
		'proti směru hodin',

	'counter-clockwise (1500-2000)':
		'proti směru hodin (1500-2000)',

	'stopped':
		'zastaveno',

	'stopped (1500)':
		'zastaveno (1500)',

	'angle (0-180)':
		'úhel (0-180)',

    'connect to Arduino':
        'připojit Arduino',

    'disconnect Arduino':
        'odpojit Arduino',

    'Connect Arduino':
        'Připojit Arduino',

    'Disconnect Arduino':
        'Odpojit Arduino',

    'analog reading %analogPin':
        'analogový vstup %analogPin',

    'digital reading %digitalPin':
        'digitální vstup %digitalPin',

    'connect arduino at %s':
        'připojit Arduino na portu %s',

    'disconnect arduino':
        'odpojit Arduino',

    'setup digital pin %digitalPin as %pinMode':
        'nastav digitální pin %digitalPin jako %pinMode',

    'set digital pin %digitalPin to %b':
        'nastav digitální pin %digitalPin na %b',

    'set servo %servoPin to %servoValue':
        'nastav servo %servoPin na %servoValue',

    'set pin %pwmPin to value %n':
        'nastav PWM pin %pwmPin na %n',

    'Connecting board at port\n': 
        'Připojuji desku na port\n',

    'An Arduino board has been connected. Happy prototyping!':
        'Deska Arduino byla připojena. Veselé prototypování!',

    'Board was disconnected from port\n':
        'Deska byla odpojena od portu\n',

    'It seems that someone pulled the cable!':
        'Zdá se, že někdo vytáhl kabel!',

    'Error connecting the board.':
        'Chyba při připojení k desce.',

    'There is already a board connected to this sprite':
        'K tomuto sprite je již deska připojena',

    'Could not connect an Arduino\nNo boards found':
        'Nezdařilo se připojení k Arduinu\nNenalezena žádná deska',

    'Could not talk to Arduino in port\n':
        'Komunikace s Arduinem se nedaří na portu\n',

    'Check if firmata is loaded.':
        'Zkontrolujte, zda je na desce nahrána Firmata.',

    'An error was detected on the board\n\n':
        'Detekována chyba na desce\n\n',

    'Board is not connected':
        'Deska není připojena'

};

// Add attributes to original SnapTranslator.dict.de
for (var attrname in s4aTempDict) { SnapTranslator.dict.cs[attrname] = s4aTempDict[attrname]; }
