s4aTempDict = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    À      \u00C0
    à      \u00E0
    É      \u00C9
    è      \u00E8
    é      \u00E9
    ê      \u00EA
    ç      \u00E7
    ï      \u00EF
    ô      \u00F4
    ù      \u00F9
    °      \u00B0
    '      \u0027
    «      \u00AB
    »      \u00BB
    ↔      \u2194
    ↕      \u2195
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
		'entr\u00E9e num\u00E9rique',

	'digital output':
		'sortie num\u00E9rique',

	'PWM':
		'PWM',

	'servo':
		'servo',

	'clockwise':
		'sens horaire',

	'clockwise (1500-1000)':
		'sens horaire (1500-1000)',

	'counter-clockwise':
		'sens anti-horaire',

	'counter-clockwise (1500-2000)':
		'sens anti-horaire (1500-2000)',

	'stopped':
		'arr\u00E9t',

	'stopped (1500)':
		'arr\u00E9t (1500)',

	'angle (0-180)':
		'angle (0-180)',

    'connect to Arduino':
        'connect\u00E9 \u00E0 Arduino',

    'disconnect Arduino':
        'd\u00E9connect\u00E9 \u00E0 Arduino',

    'Connect Arduino':
        'Connecter Arduino',

    'Disconnect Arduino':
        'D\u00E9connecter Arduino',

    'analog reading %analogPin':
        'lecture analogique %analogPin',

    'digital reading %digitalPin':
        'lecture num\u00E9rique %digitalPin',

    'connect arduino at %s':
        'connecte arduino au port %s',

    'disconnect arduino':
        'd\u00E9connecte arduino',

    'setup digital pin %digitalPin as %pinMode':
        'mettre la pin num\u00E9rique %digitalPin en %pinMode',

    'set digital pin %digitalPin to %b':
        'mettre la pin num\u00E9rique %digitalPin \u00E0 %b',

    'set servo %servoPin to %servoValue':
        'mettre le servo %servoPin \u00E0 %servoValue',

    'set pin %pwmPin to value %n':
        'mettre la pin %pwmPin \u00E0 %n',

    'Connecting board at port\n':
        'Connexion de la carte au port\n',

    'An Arduino board has been connected. Happy prototyping!':
        'La carte Arduino a \u00E9t\u00E9 connect\u00E9e. Bon prototypage !',

    'Board was disconnected from port\n':
        'La carte a \u00E9t\u00E9 d\u00E9connect\u00E9e du port\n',

    'It seems that someone pulled the cable!':
        'Il semble que quelqu\'un ait arrach\u00E9 le cable !',

    'Error connecting the board.':
        'Erreur de connexion \u00E0 la carte',

    'There is already a board connected to this sprite':
        'Il y a d\u00E9j\u00E0 une carte connect\u00E9e \u00E0 ce lutin',

    'Could not connect an Arduino\nNo boards found':
        'Impossible de se connecter \u00E0 Arduino\nAucune carte trouv\u00E9e',

    'Could not talk to Arduino in port\n':
        'Impossible de communiquer avec Arduino sur le port\n',

    'Check if firmata is loaded.':
        'V\u00E9rifier que firmata est charg\u00E9.',

    'An error was detected on the board\n\n':
        'Une erreur a \u00E9t\u00E9 d\u00E9tect\u00E9e sur la carte\n\n',

    'Board is not connected':
        'La carte n\'est pas connect\u00E9'

};

// Add attributes to original SnapTranslator.dict.it
for (var attrname in s4aTempDict) { SnapTranslator.dict.fr[attrname] = s4aTempDict[attrname]; }
