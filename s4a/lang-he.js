s4aTempDict = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    Ä, ä   \u00c4, \u00e4
    Ö, ö   \u00d6, \u00f6
    Ü, ü   \u00dc, \u00fc
    ß      \u00df
	à      \u00E0
	è      \u00E8
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
	'Arduino':'ארדוינו' ,
    'digital input':'כניסה דיגיטלית' ,
    'digital output': 'יציאה דיגיטלית' ,
    'PWM': 'מנוע' ,
    'servo': 'סרבו',
    'clockwise': 'השעון כוון עם' ,
    'clockwise (1500-1000)': '(1500-1000) השעון כוון עם' ,
    'counter-clockwise': 'השעון כוון נגד',
    'counter-clockwise (1500-2000)': '(1500-2000) השעון כוון נגד',
    'stopped': 'עצור',
    'stopped (1500)': '(1500) עצור',
    'angle (0-180)': '(זווית (0-180',
    'connect to Arduino': 'התחבר לארדוינו',
    'disconnect Arduino':  'התנתק מהארדוינו',
    'Connect Arduino': 'התחבר לארדוינו',

    'Disconnect Arduino':  'התנתק מהארדוינו',
    'analog reading %analogPin': '%analogPin מ אנלוגית קריאה',
    'digital reading %digitalPin': '%digitalPin מ ספרתית קריאה' ,
    'connect arduino at %s': '%s לפורט ארדוינו חבר',
    'disconnect arduino':  'התנתק מהארדוינו',
    'setup digital pin %digitalPin as %pinMode':  '%pinMode -ב %digitalPin  רגל קבע',
    
    'set digital pin %digitalPin to %b':  '%b -ל %digitalPin דיגיטליית רגל שנה',
    'set servo %servoPin to %servoValue': '%servoValue -ל %servoPin ברגל מנוע הבא',
    'set pin %pwmPin to value %n': '%n -ל %pwmPin ברגל PWM קבע',
    'Connecting board at port\n':  'חבר לכניסה\n',
    'An Arduino board has been connected. Happy prototyping!': 'ארדוינו חובר  בהצלחה!',
    
    'Board was disconnected from port\n': 'המעגל נותק\n',
    'It seems that someone pulled the cable!':  'נראה שמישהו ניתק את הכבל!',
    'Error connecting the board.': 'שגיאה בחיבור' ,
    'There is already a board connected to this sprite': 'יש ארדוינו שכבר מחובר לספרייט הזה' ,
    'Could not connect an Arduino\nNo boards found': 'לא נמצא ארדוינו לחבר',
    'Could not talk to Arduino in port\n':  'לא ניתן לתקשר עם הארדוינו\n',
    'Check if firmata is loaded.':   'נא בדוק שפירמטה טעון בארדוינו' ,
    'An error was detected on the board\n\n':  'אותרה שגיאה בארדוינו\n\n' ,
    'Board is not connected': 'הארדוינו לא מחובר'
    
};

// Add attributes to original SnapTranslator.dict.he
for (var attrname in s4aTempDict) { SnapTranslator.dict.he[attrname] = s4aTempDict[attrname]; }
