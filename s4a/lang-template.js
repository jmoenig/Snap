
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
        '',

    'digital output':
        '',

    'PWM':
        '',

    'servo':
        '',

    'clockwise':
        '',

    'clockwise (1500-1000)':
        '',

    'counter-clockwise':
        '',

    'counter-clockwise (1500-2000)':
        '',

    'stopped':
        '',

    'stopped (1500)':
        '',

    'disconnected':
        '',

    'angle (0-180)':
        '',

    'connect to Arduino':
        '',

    'disconnect Arduino':
        '',

    'Connect Arduino':
        '',

    'Disconnect Arduino':
        '',

    'analog reading %analogPin':
        '',

    'digital reading %digitalPin':
        '',

    'connect arduino at %s':
        '',

    'disconnect arduino':
        '',

    'setup digital pin %digitalPin as %pinMode':
        '',

    'set digital pin %digitalPin to %b':
        '',

    'set servo %servoPin to %servoValue':
        '',

    'set pin %pwmPin to value %n':
        '',

    'Connecting board at port\n': 
        '',

    'An Arduino board has been connected. Happy prototyping!':
        '',

    'Board was disconnected from port\n':
        '',

    'It seems that someone pulled the cable!':
        '',

    'Error connecting the board.':
        '',

    'There is already a board connected to this sprite':
        '',

    'Could not connect an Arduino\nNo boards found':
        '',

    'Could not talk to Arduino in port\n':
        '',

    'Check if firmata is loaded.':
        '',

    'An error was detected on the board\n\n':
        '',

    'Board is not connected':
        '',

    'New Arduino translatable project':
        '',

    'select a port':
        '',

    'Network port':
        '',

    'Enter hostname or ip address:':
        '',

    'Connecting to network port:\n':
        '',

    'This may take a few seconds...':
        '',

    'Network serial ports':
        ''
};

// Please change the LANG keyword in the lines below by your locale's two-digit code in lowercase,
// like en for English, ca for Catalan, zh for Mandarin or de for German.

// Add attributes to original SnapTranslator.dict.LANG
for (var attrname in s4aTempDict) { SnapTranslator.dict.LANG[attrname] = s4aTempDict[attrname]; }
