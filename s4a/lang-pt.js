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
        'saída digital',

    'PWM':
        'PWM',

    'servo':
        'servo',

    'clockwise':
        'no sentido dos ponteiros do relógio',

    'clockwise (1500-1000)':
        'no sentido dos ponteiros do relógio (1500-1000)',

    'counter-clockwise':
        'no sentido contrário aos ponteiros do relógio',

    'counter-clockwise (1500-2000)':
        'no sentido contrário aos ponteiros do relógio (1500-2000)',

    'stopped':
        'parado',

    'stopped (1500)':
        'parado (1500)',

    'disconnected':
        'desligado',

    'angle (0-180)':
        'com ângulo (0-180)',

    'connect to Arduino':
        'ligar ao Arduino',

    'disconnect Arduino':
        'desligar do Arduino',

    'Connect Arduino':
        'Ligar Arduino',

    'Disconnect Arduino':
        'Desligar Arduino',

    'analog reading %analogPin':
        'o valor analógico no pino %analogPin',

    'digital reading %digitalPin':
        'o valor booleano no pino digital %digitalPin é «verdadeiro»',

    'connect arduino at %s':
        'liga ao Arduino em %s',

    'disconnect arduino':
        'desliga do Arduino',

    'setup digital pin %digitalPin as %pinMode':
        'configura o pino digital %digitalPin como %pinMode',

    'set digital pin %digitalPin to %b':
        'coloca no pino digital %digitalPin o valor booleano %b',

    'set servo %servoPin to %servoValue':
        'coloca o servo %servoPin %servoValue',

    'set pin %pwmPin to value %n':
        'coloca no pino (PWM) %pwmPin o valor %n',

    'Connecting board at port\n': 
        'Ligando placa no porto\n',

    'An Arduino board has been connected. Happy prototyping!':
        'Uma placa Arduino foi ligada.\nFeliz prototipagem!',

    'Board was disconnected from port\n':
        'A placa foi desligada do porto\n',

    'It seems that someone pulled the cable!':
        'Parece que alguém desligou o cabo!',

    'Error connecting the board.':
        'Erro ao ligar à placa',

    'There is already a board connected to this sprite':
        'Este objecto já tem uma placa ligada',

    'Could not connect an Arduino\nNo boards found':
        'Não foi possível ligar a um Arduino\nNão foram encontradas placas',

    'Could not talk to Arduino in port\n':
        'Não foi possível comunicar com o Arduino no porto\n',

    'Check if firmata is loaded.':
        'Verifique se a firmata já foi carregada.',

    'An error was detected on the board\n\n':
        'Detectou-se um erro na placa\n\n',

    'Board is not connected':
        'A placa não está ligada',

    'New Arduino translatable project':
        'Novo projecto traduzível para Arduino' 

};

// Add attributes to original SnapTranslator.dict.pt
for (var attrname in s4aTempDict) { SnapTranslator.dict.pt[attrname] = s4aTempDict[attrname]; }
