
s4aTempDict = {

    /* ============================================

    s4a-lang-sv.js

    Swedish translation for Snap4Arduino

    Translated by Ove Risberg

    ============================================ */

    /*
       Special characters: (see <http://0xcc.net/jsescape/>)

       Å, å   \u00c5, \u00e5
       Ä, ä   \u00c4, \u00e4
       Ö, ö   \u00d6, \u00f6

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
        'Digital ing\u00e5ng',

    'digital output':
        'Digital utg\u00e5ng',

    'PWM':
        'PWM',

    'servo':
        'servo',

    'clockwise':
        'medsols',

    'clockwise (1500-1000)':
        'medsols (1500-1000)',

    'counter-clockwise':
        'motsols',

    'counter-clockwise (1500-2000)':
        'motsols (1500-2000)',

    'stopped':
        'stoppad',

    'stopped (1500)':
        'stoppad (1500)',

    'disconnected':
        'fr\u00e5nkopplad',

    'angle (0-180)':
        'vinkel (0-180)',

    'connect to Arduino':
        'anslut Arduino',

    'disconnect Arduino':
        'fr\u00e5koppla Arduino',

    'Connect Arduino':
        'Anslut Arduino',

    'Disconnect Arduino':
        'Fr\u00e5koppla Arduino',

    'analog reading %analogPin':
        'analog avl\u00e4sning %analogPin',

    'digital reading %digitalPin':
        'digital avl\u00e4sning %digitalPin',

    'connect arduino at %s':
        'anslut arduino till %s',

    'disconnect arduino':
        'fr\u00e5koppla arduino',

    'setup digital pin %digitalPin as %pinMode':
        'konfigurera digital pin %digitalPin som %pinMode',

    'set digital pin %digitalPin to %b':
        's\u00e4tt digital pin %digitalPin till %b',

    'set servo %servoPin to %servoValue':
        's\u00e4tt servo %servoPin till %servoValue',

    'set pin %pwmPin to value %n':
        's\u00e4tt pin %pwmPin till v\u00e4rde %n',

    'Connecting board at port\n': 
        'Ansluter arduino till port\n',

    'An Arduino board has been connected. Happy prototyping!':
        'Ett Arduino kort har anslutits. Skapa n\u00e5got trevligt.',

    'Board was disconnected from port\n':
        'Ett Arduino kort har fr\u00e5nkopplats fr\u00e5n port\n',

    'It seems that someone pulled the cable!':
        'Det ser ut som att n\u00e5gon drog ur kabeln!',

    'Error connecting the board.':
        'Ett fel uppstod n\u00e4r Arduino kortet skulle anslutas.',

    'There is already a board connected to this sprite':
        'Ett Arduino kort \u00e4r redan anslutet till denna sprite',

    'Could not connect an Arduino\nNo boards found':
        'Kunde inte ansluta\nInga Arduino kort hittades',

    'Could not talk to Arduino in port\n':
        'Kan inte kommunicera med Arduino på port\n',

    'Check if firmata is loaded.':
        'Kontrollera att firmata \u00e4r installerad.',

    'An error was detected on the board\n\n':
        'Ett fel har uppt\u00e4ckts på arduino kortet\n\n',

    'Board is not connected':
        'Arduino \u00e4r inte ansluten',

    'New Arduino translatable project':
        'Nytt \u00f6vers\u00e4ttningsbart Arduino projekt',

    'select a port':
        'v\u00e4lj en port',

    'Network port':
        'N\u00e4tverksport',

    'Enter hostname or ip address:':
        'Ange v\u00e4rdnamn eller ip-adress:',

    'Connecting to network port:\n':
        'Ansluter till n\u00e4tverksport:\n',

    'This may take a few seconds...':
        'Det kan ta n\u00e5gra sekunder...',

    'Network serial ports':
        'N\u00e4tverksserieportar',
    
    'Are you sure you want to leave?':
+        '\u00C4r du s\u00E4ker du vill avsluta?'
};

// Please change the LANG keyword in the lines below by your locale's two-digit code in lowercase,
// like en for English, ca for Catalan, zh for Mandarin or de for German.

// Add attributes to original SnapTranslator.dict.LANG
for (var attrname in s4aTempDict) { SnapTranslator.dict.sv[attrname] = s4aTempDict[attrname]; }
