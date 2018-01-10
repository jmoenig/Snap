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
        'entrada dixital',

    'digital output':
        'saída dixital',

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
        'conectar a Arduíno',

    'disconnect Arduino':
        'desconectar Arduíno',

    'Connect Arduino':
        'Conectar Arduíno',

    'Disconnect Arduino':
        'Desconectar Arduino',

    'analog reading %analogPin':
        'lectura analóxica %analogPin',

    'digital reading %digitalPin':
        'lectura dixital %digitalPin',

    'connect arduino at %s':
        'conectar Arduíno ao porto %s',

    'disconnect arduino':
        'desconectar Arduíno',

    'setup digital pin %digitalPin as %pinMode':
        'configurar pin %digitalPin como %pinMode',

    'set digital pin %digitalPin to %b':
        'fixar pin dixital %digitalPin en %b',

    'set servo %servoPin to %servoValue':
        'fixar servo %servoPin en %servoValue',

    'set pin %pwmPin to value %n':
        'fixar pin %pwmPin ao valor %n',

    'Connecting board at port\n': 
        'Conectando tarxeta no porto\n',

    'An Arduino board has been connected. Happy prototyping!':
        'Conectouse exitosamente unha tarxeta Arduíno.\n¡Feliz prototipaxe!',

    'Board was disconnected from port\n':
        'Desconectouse a tarxeta do porto\n',

    'It seems that someone pulled the cable!':
        'Parece que alguén desconectou o cable!',

    'Error connecting the board.':
        'Erro ao conectar a tarxeta',

    'There is already a board connected to this sprite':
        'Xa existe unha tarxeta conectada a este obxecto',

    'Could not connect an Arduino\nNo boards found':
        'Non se puido conectar un Arduino\nNon se atopou ningunha tarxeta',

    'Could not talk to Arduino in port\n':
        'Non se puido comunicar con Arduino no porto\n',

    'Check if firmata is loaded.':
        'Verifique se o firmware Firmata foi cargado.',

    'An error was detected on the board\n\n':
        'Detectouse un erro na tarxeta\n\n',

    'Board is not connected':
        'A tarxeta non está conectada',

    'New Arduino translatable project':
        'Novo proxecto traducible a Arduino', 

    'select a port':
        'seleccione un porto',

    'Network port':
        'Porto de rede',

    'Enter hostname or ip address:':
        'Introduza o nome do host ou a súa dirección IP',

    'Connecting to network port:\n':
        'Conectando a porto de rede:\n',

    'This may take a few seconds...':
        'isto pode tardar uns segundos...',

    'Network serial ports':
        'Portos serie sobre rede'
};

// Add attributes to original SnapTranslator.dict.gl
for (var attrname in s4aTempDict) { SnapTranslator.dict.gl[attrname] = s4aTempDict[attrname]; }
