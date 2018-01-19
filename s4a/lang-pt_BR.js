s4aTempDict = {

    /* ============================================

    s4a-lang-pt_BR.js

    Brazilian Portuguese translation for Snap4Arduino

    translated by Aldo von Wangenheim

    Copyright (C) 2016 by Aldo von Wangenheim
    http://www.computacaonaescola.ufsc.br/

    ============================================

    This file is part of Snap4Arduino.

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
        'no sentido horário',

    'clockwise (1500-1000)':
        'no sentido horário (1500-1000)',

    'counter-clockwise':
        'no sentido anti-horário',

    'counter-clockwise (1500-2000)':
        'no sentido anti-horário (1500-2000)',

    'stopped':
        'parado',

    'stopped (1500)':
        'parado (1500)',

    'disconnected':
        'desligado',

    'angle (0-180)':
        'com ângulo (0-180)',

    'connect to Arduino':
        'conectar ao Arduino',

    'disconnect Arduino':
        'desconectar do Arduino',

    'Connect Arduino':
        'Conectar Arduino',

    'Disconnect Arduino':
        'Desconectar Arduino',

    'analog reading %analogPin':
        'o valor analógico no pino %analogPin',

    'digital reading %digitalPin':
        'o valor booleano no pino digital %digitalPin é «verdadeiro»',

    'connect arduino at %s':
        'conecte Arduino em %s',

    'disconnect arduino':
        'desconecte Arduino',

    'setup digital pin %digitalPin as %pinMode':
        'configure o pino digital %digitalPin como %pinMode',

    'set digital pin %digitalPin to %b':
        'coloque no pino digital %digitalPin o valor booleano %b',

    'set servo %servoPin to %servoValue':
        'posicione o servo %servoPin em %servoValue',

    'set pin %pwmPin to value %n':
        'coloque no pino %pwmPin o valor %n',

    'Connecting board at port\n': 
        'Conectando o Arduino na porta\n',

    'An Arduino board has been connected. Happy prototyping!':
        'Um Arduino foi conectado.\nFeliz prototipagem!',

    'Board was disconnected from port\n':
        'A placa foi desconectada da porta\n',

    'It seems that someone pulled the cable!':
        'Parece que alguém desconectou o cabo!',

    'Error connecting the board.':
        'Erro ao conectar ao Arduino',

    'There is already a board connected to this sprite':
        'Já há um Arduino conectado e este ator',

    'Could not connect an Arduino\nNo boards found':
        'Não consegui conectar a um Arduino\nNão encontrei nenhuma placa',

    'Could not talk to Arduino in port\n':
        'Não consegui comunicar com Arduino na porta\n',

    'Check if firmata is loaded.':
        'Verifique se Firmata foi gravado no Arduino',

    'An error was detected on the board\n\n':
        'Foi detectado um erro na placa\n\n',

    'Board is not connected':
        'O Arduino não está conectado',

    'New Arduino translatable project':
        'Novo projeto tradutível para Arduino' 

};

// Add attributes to original SnapTranslator.dict.pt
for (var attrname in s4aTempDict) { SnapTranslator.dict.pt_BR[attrname] = s4aTempDict[attrname]; }
