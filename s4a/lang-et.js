
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
        'digitaalne sisend',

    'digital output':
        'digitaalne väljund',

    'PWM':
        'PWM',

    'servo':
        'servo',

    'clockwise':
        'päripäeva',

    'clockwise (1500-1000)':
        'päripäeva (1500-1000)',

    'counter-clockwise':
        'vastupäeva',

    'counter-clockwise (1500-2000)':
        'vastupäeva (1500-2000)',

    'stopped':
        'peatatud',

    'stopped (1500)':
        'peatatud (1500)',

    'disconnected':
        'ühendus katkestatud',

    'angle (0-180)':
        'nurk (0-180)',

    'connect to Arduino':
        'ühenda Arduino',

    'disconnect Arduino':
        'katkesta ühendus Arduinoga',

    'Connect Arduino':
        'Ühenda Arduino',

    'Disconnect Arduino':
        'Katkesta ühendus Arduinoga',

    'analog reading %analogPin':
        'analooglugem viigult %analogPin',

    'digital reading %digitalPin':
        'digitaallugem viigult %digitalPin',

    'connect arduino at %s':
        'tekita ühendus arduinoga pordis %s',

    'disconnect arduino':
        'katkesta ühendus arduinoga',

    'setup digital pin %digitalPin as %pinMode':
        'määra digitaalviigu %digitalPin režiimiks %pinMode',

    'set digital pin %digitalPin to %b':
        'määra digitaalviigule %digitalPin väärtus %b',

    'set servo %servoPin to %servoValue':
        'määra servoviigule %servoPin väärtus %servoValue',

    'set pin %pwmPin to value %n':
        'määra viigule %pwmPin väärtus %n',

    'Connecting board at port\n': 
        'Ühenduse loomine plaadiga pordis\n',

    'An Arduino board has been connected. Happy prototyping!':
        'Arduino plaat on ühendatud. Jõudu tööle!',

    'Board was disconnected from port\n':
        'Plaat eemaldati pordist\n',

    'It seems that someone pulled the cable!':
        'Paistab, et keegi tõmbas kaabli välja.',

    'Error connecting the board.':
        'Viga plaadiga ühenduse loomisel.',

    'There is already a board connected to this sprite':
        'Selle spraidiga on juba plaat seotud.',

    'Could not connect an Arduino\nNo boards found':
        'Arduinoga ei saadud ühendust.\nPlaate ei leitud.',

    'Could not talk to Arduino in port\n':
        'Arduinoga suhtlemine ei õnnestu pordis\n',

    'Check if firmata is loaded.':
        'Veendu, et firmata oleks laaditud.',

    'An error was detected on the board\n\n':
        'Viga plaadil\n\n',

    'Board is not connected':
        'Plaat pole ühendatud',

    'New Arduino translatable project':
        'Uus tõlgitav Arduino projekt' 

};

// Please change the LANG keyword in the lines below by your locale's two-digit code in lowercase,
// like en for English, ca for Catalan, zh for Mandarin or de for German.

// Add attributes to original SnapTranslator.dict.LANG
for (var attrname in s4aTempDict) { SnapTranslator.dict.et[attrname] = s4aTempDict[attrname]; }
