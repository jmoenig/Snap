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
        'entrada digital',

    'digital output':
        'salida digital',

    'PWM':
        'PWM',

    'servo':
        'servo',

    'clockwise':
        'sentido horario',

    'clockwise (1500-1000)':
        'sentido horario (1500-1000)',

    'counter-clockwise':
        'sentido anti-horario',

    'counter-clockwise (1500-2000)':
        'sentido anti-horario (1500-2000)',

    'stopped':
        'parado',

    'stopped (1500)':
        'parado (1500)',

    'angle (0-180)':
        'ángulo (0-180)',

    'connect to Arduino':
        'conectar a Arduino',

    'disconnect Arduino':
        'desconectar Arduino',

    'Connect Arduino':
        'Conectar Arduino',

    'Disconnect Arduino':
        'Desconectar Arduino',

    'analog reading %analogPin':
        'lectura analógica %analogPin',

    'digital reading %digitalPin':
        'lectura digital %digitalPin',

    'connect arduino at %s':
        'conectar arduino al puerto %s',

    'disconnect arduino':
        'desconectar arduino',

    'setup digital pin %digitalPin as %pinMode':
        'configurar pin %digitalPin como %pinMode',

    'set digital pin %digitalPin to %b':
        'fijar pin digital %digitalPin en %b',

    'set servo %servoPin to %servoValue':
        'fijar servo %servoPin en %servoValue',

    'set pin %pwmPin to value %n':
        'fijar pin %pwmPin al valor %n',

    'Connecting board at port\n': 
        'Conectando tarjeta en la puerta\n',

    'An Arduino board has been connected. Happy prototyping!':
        'Se conectó exitosamente una tarjeta Arduino.\n¡Feliz prototipeo!',

    'Board was disconnected from port\n':
        'Se deconectó la tarjeta de la puerta\n',

    'It seems that someone pulled the cable!':
        '¡Parece que alguien desconectó el cable!',

    'Error connecting the board.':
        'Error al conectar la tarjeta',

    'There is already a board connected to this sprite':
        'Ya existe una tarjeta conectada a este objeto',

    'Could not connect an Arduino\nNo boards found':
        'No se pudo conectar un Arduino\nNo se encontró ninguna tarjeta',

    'Could not talk to Arduino in port\n':
        'No se pudo comunicar con Arduino en la puerta\n',

    'Check if firmata is loaded.':
        'Revise si tiene cargado el firmware Firmata.',

    'An error was detected on the board\n\n':
        'Se detectó un error en la tarjeta\n\n',

    'Board is not connected':
        'La tarjeta no está conectada',

    'New Arduino translatable project':
        'Nuevo proyecto traducible a Arduino', 

    'select a port':
        'seleccione una puerta',

    'Network port':
        'Puerta de red',

    'Enter hostname or ip address:':
        'Introduzca el nombre del host o su dirección IP',

    'Connecting to network port:\n':
        'Conectando a puerta de red:\n',

    'This may take a few seconds...':
        'Esto puede tardar unos segundos...',

    'Network serial ports':
        'Puertas serie sobre red'
};

// Add attributes to original SnapTranslator.dict.es
for (var attrname in s4aTempDict) { SnapTranslator.dict.es[attrname] = s4aTempDict[attrname]; }
