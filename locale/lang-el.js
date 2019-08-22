/*

    lang-el.js

    Greek translation for SNAP!

    written by Ino Samaras

    Copyright (C) 2013 by Ino Samaras

    This file is part of Snap!.

    Snap! is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of
    the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.



    Note to Translators:
    --------------------
    At this stage of development, Snap! can be translated to any LTR language
    maintaining the current order of inputs (formal parameters in blocks).

    Translating Snap! is easy:


    1. Download

    Download the sources and extract them into a local folder on your
    computer:

        <http://snap.berkeley.edu/snapsource/snap.zip>

    Use the German translation file (named 'lang-de.js') as template for your
    own translations. Start with editing the original file, because that way
    you will be able to immediately check the results in your browsers while
    you're working on your translation (keep the local copy of snap.html open
    in your web browser, and refresh it as you progress with your
    translation).


    2. Edit

    Edit the translation file with a regular text editor, or with your
    favorite JavaScript editor.

    In the first non-commented line (the one right below this
    note) replace "de" with the two-letter ISO 639-1 code for your language,
    e.g.

        fr - French => SnapTranslator.dict.fr = {
        it - Italian => SnapTranslator.dict.it = {
        pl - Polish => SnapTranslator.dict.pl = {
        pt - Portuguese => SnapTranslator.dict.pt = {
        es - Spanish => SnapTranslator.dict.es = {
        el - Greek => => SnapTranslator.dict.el = {

    etc. (see <http://en.wikipedia.org/wiki/ISO_639-1>)


    3. Translate

    Then work through the dictionary, replacing the German strings against
    your translations. The dictionary is a straight-forward JavaScript ad-hoc
    object, for review purposes it should be formatted as follows:

        {
            'English string':
                'Translation string',
            'last key':
        }       'last value'

    and you only edit the indented value strings. Note that each key-value
    pair needs to be delimited by a comma, but that there shouldn't be a comma
    after the last pair (again, just overwrite the template file and you'll be
    fine).

    If something doesn't work, or if you're unsure about the formalities you
    should check your file with

        <http://JSLint.com>

    This will inform you about any missed commas etc.


    4. Accented characters

    Depending on which text editor and which file encoding you use you can
    directly enter special characters (e.g. Umlaut, accented characters) on
    your keyboard. However, I've noticed that some browsers may not display
    special characters correctly, even if other browsers do. So it's best to
    check your results in several browsers. If you want to be on the safe
    side, it's even better to escape these characters using Unicode.

        see: <http://0xcc.net/jsescape/>


    5. Block specs:

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


    6. Submit

    When you're done, rename the edited file by replacing the "de" part of the
    filename with the two-letter ISO 639-1 code for your language, e.g.

        fr - French => lang-fr.js
        it - Italian => lang-it.js
        pl - Polish => lang-pl.js
        pt - Portuguese => lang-pt.js
        es - Spanish => lang-es.js
        el - Greek => => lang-el.js

    and send it to me for inclusion in the official Snap! distribution.
    Once your translation has been included, Your name will the shown in the
    "Translators" tab in the "About Snap!" dialog box, and you will be able to
    directly launch a translated version of Snap! in your browser by appending

        lang:xx

    to the URL, xx representing your translations two-letter code.


    7. Known issues

    In some browsers accents or ornaments located in typographic ascenders
    above the cap height are currently (partially) cut-off.

    Enjoy!
    -Jens
*/

/*global SnapTranslator*/

SnapTranslator.dict.el = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    Ä, ä   \u00c4, \u00e4
    Ö, ö   \u00d6, \u00f6
    Ü, ü   \u00dc, \u00fc
    ß      \u00df
*/

    // translations meta information
    'language_name':
        'Ελληνικά', // the name as it should appear in the language menu
    'language_translator':
        'Ino Samaras , Alexandros Prekates' ,// your name for the Translators tab
    'translator_e-mail':
        'ino.samaras@berkeley.edu , aprekates@sch.gr' , // optional
    'last_changed':
        '2019-01-28', // this, too, will appear in the Translators tab

    // GUI
    // control bar:
    'untitled':
        'χωρίς τίτλο',
    'development mode':
        'λειτουργία ανάπτυξης',

    // categories:
    'Motion':
        'Κίνηση',
    'Looks':
        'Εμφάνιση',
    'Sound':
        'Ήχος',
    'Pen':
        'Στυλό',
    'Control':
        'Έλεγχος',
    'Sensing':
        'Αισθητήρες',
    'Operators':
        'Τελεστές',
    'Variables':
        'Μεταβλητές',
    'Lists':
        'Λίστες',
    'Other':
        'Άλλο',

    // editor:
    'draggable':
        'συρόμενο',

    // tabs:
    'Scripts':
        'Σενάρια',
    'Costumes':
        'Κοστούμια',
    'Sounds':
        'Ήχοι',
    'Backgrounds':
        'Yπόβαθρα',

    // names:
    'Sprite':
        'Φιγούρα',
    'Stage':
	'Σκηνή',

    // Painting
    'Paint a new costume':
         'Ζωγράφισε ένα νέο κουστούμι',

    // rotation styles:
    'don\'t rotate':
        'χωρίς δυνατότητα περιστροφής',
    'can rotate':
        'με δυνατότητα περιστροφής',
    'only face left/right':
        'με κατεύθυνση μόνο αριστερά/δεξιά',

    // new sprite button:
    'add a new sprite':
       'προσθέστε μια νέα φιγούρα',
    'add a new Turtle sprite':
        'πρόσθεσε μια καινούρα φιγούρα χελώνα',
    'paint a new sprite':
        'ζωγράφισε μια καινούργια φιγούρα',
    'take a camera snapshot and\nimport it as a new sprite':
        'πάρε μια φωτογραφία με τη κάμερα\nτου υπολογιστή και εισηγαγέ τη\nσαν καινούργια φιγούρα',
    

    // tab help
    'costumes tab help':
        'εισαγωγή εικόνας από τον υπολογιστή σας ή μια ιστοσελίδα' 
	+ 'σέρνοντας την εικόνα στην περιοχή των κοστουμιών',
    'import a sound from your computer\nby dragging it into here':
        'εισαγωγή ήχου από τον υπολογιστή σας σέρνοντας το αρχείο του ήχου εδώ',

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

    // motion:
    'Stage selected:\nno motion primitives':
        'Επιλεγμένο Σταδιο:\nχωρίς αρχέτυπο κίνησης',

    'move %n steps':
        'κάνε %n βήματα',
    'turn %clockwise %n degrees':
        'γύρνα δεξιόστροφα %clockwise %n μοίρες',
    'turn %counterclockwise %n degrees':
        'γύρνα αριστερόστροφα %counterclockwise %n μοίρες',
    'point in direction %dir':
        'κοίτα προς την κατεύθυνση %dir',
    'point towards %dst':
        'κοίτα προς %dst',
    'go to x: %n y: %n':
        'πήγαινε στο x: %n y: %n',
    'go to %dst':
        'πήγαινε στο %dst',
    'glide %n secs to x: %n y: %n':
        'γλίστρα %n δευτ. μέχρι το x: %n y: %n',
    'change x by %n':
        'άλλαξε το x κατά %n',
    'set x to %n':
        'θέσε το x να είναι %n',
    'change y by %n':
        'άλλαξε το y κατά %n',
    'set y to %n':
        'θέσε το y να είναι %n',
    'if on edge, bounce':
        'αν είσαι σε άκρο, πήδα',
    'x position':
        'x-θέση',
    'y position':
        'y-θέση',
    'direction':
        'κατεύθυνση',

    // looks:
    'switch to costume %cst':
        'άλλαξε το κοστούμι σε %cst',
    'next costume':
        'επόμενο κοστούμι',
    'costume #':
        'κοστούμι #',
    'say %s for %n secs':
        'πες %s για %n δευτ.',
    'say %s':
        'πες %s',
    'think %s for %n secs':
        'σκέψου %s για %n δευτ.',
    'think %s':
        'σκέψου %s',
    'Hello!':
        'Γεια!',
    'Hmm...':
        'Μμμ...',
    'change %eff effect by %n':
        'άλλαξε το εφέ %eff κατά %n',
    'set %eff effect to %n':
        'θέσε το εφέ %eff να είναι %n',
    'clear graphic effects':
        'καθάρισε τα γραφικά εφέ',
    'change size by %n':
        'άλλαξε το μέγεθος κατά %n',
    'set size to %n %':
        'θέσε το μέγεθος να είναι %n %',
    'size':
        'μέγεθος',
    'show':
        'εμφανίσου',
    'hide':
        'κρύψου',
    'go to front':
        'πήγαινε μπροστά',
    'go back %n layers':
        'πήγαινε πίσω %n στρώματα',

    'development mode \ndebugging primitives:':
        'λειτουργία ανάπτυξης \nαρχέτυπα debugging',
    'console log %mult%s':
        'γράψτε στην κονσόλα: %mult%s',
    'alert %mult%s':
        'Ειδοποίηση: %mult%s',

    // sound:
    'play sound %snd':
        'παίξε τον ήχο %snd',
    'play sound %snd until done':
        'παίξε τον ήχο %snd μέχρι να τελειώσει',
    'stop all sounds':
        'σταμάτα όλους τους ήχους',
    'rest for %n beats':
        'κάνε παύση για %n ρυθμούς',
    'play note %note for %n beats':
         'παίξε την νότα %note για %n ρυθμούς',
    'set instrument to %inst':
         'θέσε το όργανο σε %inst' ,
    'change tempo by %n':
        'άλλαξε την ταχύτητα του ρυθμού κατά %n',
    'set tempo to %n bpm':
        'θέσε την ταχύτητα του ρυθμού να είναι %n ρυθμούς το δευτ.',
    'tempo':
        'ταχύτητα του ρυθμού',

    // pen:
    'clear':
        'καθαρισμός',
    'pen down':
        'στυλό κάτω',
    'pen up':
        'στυλό πάνω',
    'set pen color to %clr':
        'θέσε το χρώμα του στυλού να είναι %clr',
    'change pen %hsva by %n':
         'άλλαξε %hsva του στυλού κατά %n',
    'hue':
        'απόχρωση',
    'saturation':
         'κορεσμός',
    'brightness':
         'φωτεινότητα' ,
    'transparency':
         'διαφάνεια',
    'set pen %hsva to %n':
        'θέσε %hsva του στυλού να είναι %n',
    'change pen shade by %n':
        'άλλαξε την σκιά του στυλού κατά %n',
    'set pen shade to %n':
        'θέσε την σκιά του στυλού να είναι %n',
    'change pen size by %n':
        'άλλαξε το μέγεθος του στυλού κατά %n',
    'set pen size to %n':
        'θέσε το μέγεθος του στυλού να είναι %n',
    'stamp':
        'σφραγίδα',
    'fill':
         'γέμισμα',

    // control:
    'when %greenflag clicked':
        'όταν το %greenflag πατηθεί',
    'when %keyHat key pressed':
        'όταν το %keyHat πλήκτρο πατηθεί',
    'when I am %interaction':
        'όταν μου συμβεί %interaction',
    'clicked':
         'να μου κάνουν κλικ',
    'pressed':
          'να με πατάνε',
    'dropped':
          'να με αφήνουν',
    'mouse-entered':
          'να εισέρχεται ο δείκτης του ποντικίου',
    'mouse-departed':
           'να εξέρχεται ο δείκτης του ποντικίου',
    'scrolled-down':
    	'κύλιση-κάτω',
    'scrolled-up':
        'κύλιση-πάνω',
    'stopped':
        'σταματημένο',
    'when %b':
        'Όταν %b',
    'when I receive %msgHat':
        'Όταν δεχτώ %msgHat',
    'broadcast %msg':
        'στείλε το %msg',
    'broadcast %msg and wait':
        'στείλε το %msg και περίμενε',
    'Message name':
        'όνομα μηνύματος',
    'message':
        'μήνυμα',
    'any message':
        'οποιοδήποτε μήνυμα',
    'wait %n secs':
        'περίμενε %n δευτ.',
    'wait until %b':
        'περίμενε μέχρι %b',
    'forever %loop':
        'για πάντα %loop',
    'repeat %n %loop':
        'επανέλαβε %n %loop',
    'repeat until %b %loop':
        'επανέλαβε μέχρι %b %loop',
    'if %b %c':
        'αν %b %c',
    'if %b %c else %c':
        'αν %b %c αλλιώς %c',
    'report %s':
        'δήλωσε %s',
    'stop %stopChoices':
        'σταμάτα %stopChoices',
    'all':
        'τα πάντα',
    'this script':
        'αυτό το σενάριο',
    'this block':
        'αυτό το μπλοκ',
    'stop %stopOthersChoices':
        'σταμάτα %stopOthersChoices',
    'all but this scrip':
        'τα πάντα εκτός από αυτό το σενάριο',
    'other scripts in sprite':
        'τα υπόλοιπα σενάρια της φιγούρας',
    'pause all %pause':
        'κάνε παύση σε όλα %pause',
    'run %cmdRing %inputs':
        'εκτέλεσε %cmdRing επάνω σε %inputs',
    'launch %cmdRing %inputs':
        'ξεκίνα %cmdRing επάνω σε %inputs',
    'call %repRing %inputs':
        'κάλεσε %repRing επάνω σε %inputs',
    'run %cmdRing w/continuation':
        'εκτέλεσε %cmdRing με συνέχεια',
    'call %cmdRing w/continuation':
        'κάλεσε %cmdRing με συνέχεια',
    'warp %c':
        'επιτάχυνση %c',
    'when I start as a clone':
        'όταν ξεκινάω ως κλώνος',
    'create a clone of %cln':
        'δημιούργησε έναν κλώνο του %cln',
    'a new clone of %cln':
        'ένας νέος κλώνος του %cln',
    'myself':
        'ο εαυτός μου',
    'delete this clone':
         'κατάργησε αυτόν τον κλόνο',
    'tell %spr to %cmdRing %inputs':
        'πες το %spr να %cmdRing  %inputs',
    'ask %spr for %repRing %inputs':
        'ρώτα %spr για %repRing %inputs',

    // sensing:
    'touching %col ?':
        'ακουμπάει %col ?',
    'touching %clr ?':
        'ακουμπάει %clr ?',
    'color %clr is touching %clr ?':
        'χρώμα %clr ακουμπάει %clr ?',
    'ask %s and wait':
        'ρώτα %s και περίμενε',
    'what\'s your name?':
        'Ποιο είναι το όνομά σου;',
    'answer':
        'απάντηση',
    'mouse x':
        'ποντίκι x-θέση',
    'mouse y':
        'ποντίκι y-θέση',
    'mouse down?':
        'είναι το ποντικι κάτω;',
    'key %key pressed?':
        'είναι το πλήκτρο %key πατημένο;',
     '%rel to %dst':
        '%rel από %dst',
    'distance':
    	'απόσταση',
    '%asp at %loc' :
        '%asp στο %loc',
    'sprites' :
        'φιγούρες',
     'reset timer':
        'επανέφερε το χρονόμετρο',
    'timer':
        'χρονόμετρο',
    '%att of %spr':
        '%att του %spr',
    'my %get':
        'το δικό μου  %get',
    'http:// %s':
        'http:// %s',
    'turbo mode?':
        'είναι σε λειτουργία τούρμπο;',
    'set turbo mode to %b':
        'θέσε την λειτουργεία τούρμπο να είναι %b',
    'current %dates':
        'τρέχων %dates',
    'year':
        'έτος',
    'month':
        'μήνας',
    'date':
        'ημερομηνία',
    'day of week':
        'ημέρα της εβδομάδας',
    'hour':
        'ώρα',
    'minute':
        'λεπτά',
    'second':
        'δευτερόλεπτα',
    'time in milliseconds':
        'χρόνος σε χιλιοστά του δευτερολέπτου', 
    'filtered for %clr':
        'φίλτραρε για %clr',
    'stack size':
        'μέγεθος στοίβας',
    'frames':
        'κάδρα',

    // operators:
    '%n mod %n':
        'το υπόλοιπο του %n διαίρεμενο από %n',
    'round %n':
        '%n στρογγυλοποιημένο',
    '%fun of %n':
        '%fun του %n',
    'pick random %n to %n':
        'δίαλεξε στην τύχη μεταξύ του %n και του %n',
    '%b and %b':
        '%b και %b',
    '%b or %b':
        '%b ή %b',
    'not %b':
        'όχι το %b',
    'true':
        'σωστό',
    'false':
        'λάθος',
    'join %words':
        'συνένωσε %words',
    'split %s by %delim':
        'χώρισε %s ως προς το %delim',
    'hello':
        'γεια',
    'world':
        'κόσμος',
    'letter %idx of %s':
        'γράμμα %idx του %s',
    'length of %s':
        'μήκος του %s',
    'unicode of %s':
        'unicode του %s',
    'unicode %n as letter':
        'unicode του %n ως γράμμα',
    'is %s a %typ ?':
        'είναι το %s καποιο %typ ;',
    'is %s identical to %s ?':
        'είναι το %s παρόμοιο με το %s ?',
    'JavaScript function ( %mult%s ) { %code }':
        'JavaScript συνάρτηση( %mult%s ) { %code }',
    'compile %repRing':
    	'μεταγλώττισε %repRing',
    
    'type of %s':
        'τύπος του %s',

    // variables:
    'Make a variable':
        'Δημιούργησε μία μεταβλητή',
    'Variable name':
        'Όνομα μεταβλητής',
    'Script variable name':
        'Όνομα μεταβλητής του σεναρίου',
    'inherit %shd':
        'Κληρονόμησε %shd',
    'Delete a variable':
        'Κάτάργηση μιας μεταβλητής',

    'set %var to %s':
        'θέσε το %var να είναι %s',
    'change %var by %n':
        'άλλαξε το %var κατά %n',
    'show variable %var':
        'εμφάνισε το %var',
    'hide variable %var':
        'κρύψε το %var',
    'script variables %scriptVars':
        'μεταβλητές του σεναρίου %scriptVars',

    // lists:
    'list %exp':
        'λίστα %exp',
    '%s in front of %l':
        '%s μπροστά από το %l',
    'item %idx of %l':
        'στοιχείο %idx του %l',
    'all but first of %l':
        'όλα εκτός από το πρώτο του %l',
    'length of %l':
        'μήκος του %l',
    '%l contains %s':
        '%l περιέχει το %s',
    'thing':
        'πράγμα',
    'add %s to %l':
        'πρόσθεσε το %s στο %l',
    'delete %ida of %l':
        'κατάργησε το %ida του %l',
    'insert %s at %idx of %l':
        'εισήγαγε το %s στο %idx του %l',
    'replace item %idx of %l with %s':
        'αντικατέστησε το στοιχείο %idx του %l με %s',

    // other
    'Make a block':
        'Δημιούργησε ένα μπλοκ',

    // menus
    // snap menu
    'About...':
        'Περί του Snap!…',
    'Reference manual':
        'Εγχειρίδιο αναφοράς',
    'Snap! website':
        'Snap! Ιστοσελίδα',
    'Download source':
        'Κατέβασε των πηγαίο κώδικα',
    'Switch back to user mode':
        'Επιστροφη στην λειτουργία του χρήστη',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'verl\u00e4sst Morphic',
    'Switch to dev mode':
        'Εναλλαγή σε λειτουργία ανάπτυξη'  ,
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'erm\u00f6glicht Morphic Funktionen',

    // project menu
    'Project notes...':
        'Σημειώσης πάνω στην εργασία...',
    'New':
        'Νέο',
    'Open...':
        'Άνοιγμα...',
    'Save':
        'Αποθήκευση',
    'Save As...':
         'Αποθήκευση Ως...',
     'Save to disk':
        'Αποθήκευση στο δίσκο',
    'store this project\nin the downloads folder\n(in supporting browsers)':
    'αποθήκευση αυτό το έργοn\στον φάκελό λήψεων\n(στους πλοηγούς που το υποστηρίζουν',
    'Import...':
        'Εισαγωγή...',
    'file menu import hint':
        'μπορείτε να φορτώσετε ένα αρχείο από το browser σας στον\n κατάλογο του ήχου η των' +
            'κοστουμιών που ',
    'Export project as plain text...':
        'Εξαγωγη της εργασίας ως σκέτο κείμενο...',
    'Export project...':
        'Εξαγωγή εργασίας...',
    'show project data as XML\nin a new browser window':
        'εμφάνιση δεδομένων εργασίας ως XML\nσε καινούριο παράθυρο του browser',
    'Export blocks...':
        'Εξαγωγή των μπλοκ...',
    'show global custom block definitions as XML\nin a new browser window':
        'Εμφάνιση παγκοσμίων προσαρμοσμένων ορισμών των μπλοκ ως XML\nσε καινούριο' +
            'παράθυρο του browser',
    'Import tools':
        'Εισαγωγή εργαλείων',
    'load the official library of\npowerful blocks':
        'Φόρτωση της επίσημης βιβλιοθήκης\n των δυναμικών μπλοκ',
    'Libraries...':
        'Βιβλιοθήκες...',
    'Import library':
        'Εισαγωγή βιβλιοθήκης',

    // cloud menu
    'Login...':
        'Σύνδεση...',
    'Signup...':
        'Εγγραφή...',

    // settings menu
    'Language...':
        'Γλώσσα...',
    'Zoom blocks...':
        'Μεγέθυνση των μπλοκ…',
    'Blurred shadows':
        'Θολές σκιές',
    'uncheck to use solid drop\nshadows and highlights':
        'απενεργοποιήστε για να εμφανίσετε\n την σκίαση και τα στερεά σήματα',
    'check to use blurred drop\nshadows and highlights':
        'ενεργοποιήστε για να εμφανίσετε\n την σκίαση και τα θολά σήματα',
    'Zebra coloring':
        'Χρωματισμός ζέβρα',
    'check to enable alternating\ncolors for nested blocks':
        'ενεργοποιήστε για να εμφανίσετε εναλασσόμενα\n χρώματα για τα ένθετα μπλοκ',
    'uncheck to disable alternating\ncolors for nested block':
        'απενεργοποιήστε για να εξαφανίσετε τα εναλασσόμενα\n χρώματα για τα ένθετα μπλοκ',
    'Dynamic input labels':
        'Ετικέτες για τις δυναμικές τιμές',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'απενεργοποιήστε για να εξαφανίσετε τις δυναμικες\nετικέτες για μεταβλητές τιμές',
    'check to enable dynamic\nlabels for variadic inputs':
        'ενεργοποιήστε για να εμφανίσετε τις δυναμικες\nετικέτες για μεταβλητές τιμές',
    'Prefer empty slot drops':
        'Ευνοούν την προσκόλληση σε κενές θέσεις',
    'settings menu prefer empty slots hint':
        'διευκολύνουν την εισαγωγλη σε κενές υποδοχές\nόταν σύρετε και αφήσετε τον ρεπόρτερ',
    'uncheck to allow dropped\nreporters to kick out others':
        'απενεργοποιήστε για να μπορούν οι ρεπορτερ που αφήνετε\nνα αντικαταστούν τους άλλους',
    'Long form input dialog':
        'Χρησιμοποιήστε το παράθυρο της εκτεταμένης τιμής',
    'check to always show slot\ntypes in the input dialog':
        'ενεργοποιήστε για να εμφανίζετε πάντα\nο τύπος τον κενών για τις τιμές',
    'uncheck to use the input\ndialog in short form':
        'απενεργοποιήστε για να εμφανίσετε τις τιμές\nστην συπμαγή μορφή',
    'Virtual keyboard':
        'Εικονικό Πληκτρολόγιο',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'απενεργοποιήστε για να μην έχετε το εικονοκό\nπληκτρολόγιο στο κινητό σας',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'ενεργοποιήστε για να έχετε το εικονοκό\nπληκτρολόγιο στο κινητό σας',
    'Input sliders':
        'Ρυθμιστής τιμής',
    'uncheck to disable\ninput sliders for\nentry fields':
        'απενεργοποιήστε για να μην έχετε\nρυθμιστές τιμών για τα πεδία εισαγωγής',
    'check to enable\ninput sliders for\nentry fields':
        'ενεργοποιήστε για να έχετε\nρυθμιστές τιμών για τα πεδία εισαγωγής',
    'Clicking sound':
        'Ήχος του κλικ',
    'uncheck to turn\nblock clicking\nsound off':
        'απενεργοποιήστε για να μην έχετε τον ήχο του κλικ',
    'check to turn\nblock clicking\nsound on':
        'ενεργοποιήστε για να έχετε τον ήχο του κλικ',
    'Animations':
        'Animations (διάφορες κινήσεις)',
    'uncheck to disable\nIDE animations':
        'απενεργοποιήστε για να μην εχετε\nIDE animations',
    'Turbo mode':
        'Λειτουργία Τούρμπο',
    'check to prioritize\nscript execution':
        'ενεργοποιήστε για να βάλετε σε\nπροτεραιότητα την εκτέλεση του κώδικα',
    'uncheck to run scripts\nat normal speed':
        'απενεργοποιήστε για να εκτελέσετε τον κώδικα\nμε κανονική ταχύτητα',
    'check to enable\nIDE animations':
        'ενεργοποιήστε για να εχετε\nIDE animations',
    'Thread safe scripts':
        'Thread safe κώδικας',
    'uncheck to allow\nscript reentrance':
        'απενεργοποιήστε για να επιτρέψετε\nτην επανεισδοχή στον κώδικα',
    'check to disallow\nscript reentrance':
        'ενεργοποιήστε για να μην επιτρέπετε\nη επανεισδοχή στον κώδικα',
    'Prefer smooth animations':
        'Ευνοεί ομαλά animations',
    'uncheck for greater speed\nat variable frame rates':
        'απενεργοποιήστε για να έχετε μεγαλύτερη ταχύτητα\nστσ μεταβλητά frame-rates',
    'check for smooth, predictable\nanimations across computers':
        'ενεργοποιήστε για ομαλά, προβλέψημα\nanimations στους υπολογιστές',

    // inputs
    'with inputs':
        'με τιμές',
    'input names:':
        'ονόματα τιμών:',
    'Input Names:':
        'Ονόματα τιμών:',
    'input list:':
        'λίστα τιμών:',

    // context menus:
    'help':
        'Βοήθεια',

    // palette:
    'hide primitives':
        'Απόκρυψη αρχέτυπων',
    'show primitives':
        'Εμφάνιση αρχέτυπων',

    // blocks:
    'help...':
        'βοήθεια...',
    'relabel...':
        'μετονόμαση...',
    'duplicate':
        'διπλασίαση',
    'make a copy\nand pick it up':
        'δημιουργία αντίγραφου\n και κράτηση του',
    'only duplicate this block':
        'διπλασίαση μόνο αυτού του μπλοκ',
    'delete':
        'διαγραφή',
    'script pic...':
        'εικόνα του κώδικα...',
    'open a new window\nwith a picture of this script':
        'άνοιγμα νέου παραθύρου\nμε την εικόνα αυτού του κώδικα',
    'ringify':
        'εισαγωγή σε δαχτυλίδι',
    'unringify':
        'εξαγωγή από το δαχτυλίδι',

    // custom blocks:
    'delete block definition...':
        'διαγραφή του προσαρμοσμένου μπλοκ',
    'edit...':
        'επεξεργασία...',

    // sprites:
    'edit':
        'επεξεργασία',
    'detach from':
        'αποσύνδεση από',
    'detach all parts':
        'αποσύνδεση όλων των κομματιών',
    'export...':
        'εξαγωγή...',

    // stage:
    'show all':
        'εμφάνιση όλων',
    'pic...':
        'εικόνα...',
    'open a new window\nwith a picture of the stage':
        'άνοιγμα νέου παραθύρου\nμε την εικόνα της σκηνής',

    // scripting area
    'clean up':
        'καθαρισμός',
    'arrange scripts\nvertically':
        'οργάνωση ου κώδικα\nκάθετα',
    'add comment':
        'δημιουργία σχόλιου',
    'undrop':
        'επενακράτηση',
    'undo the last\nblock drop\nin this pane':
        'αναίρεση του τελευταίου\nμπλοκ που αφήσατε μέσα\nσε αυτό το παράθυρο',
    'scripts pic...':
        'εικόνα του κώδικα...',
    'open a new window\nwith a picture of all scripts':
        'άνοιγμα νέου παραθύρου\nμε μια εικόνα όλου του κώδικα',
    'make a block...':
        'δημιουργία ενός μπλοκ...',

    // costumes
    'rename':
        'μετονόμαση',
    'export':
        'εξαγωγή',
    'rename costume':
        'μετονόμαση κοστουμιού',

    // sounds
    'Play sound':
        'Παίξημο ήχου',
    'Stop sound':
        'Διακοπή ήχου',
    'Stop':
        'Διακοπή',
    'Play':
        'Παίξημο',
    'rename sound':
        'μετονόμαση ήχου',

    // dialogs
    // buttons
    'OK':
        'OK',
    'Ok':
        'Oκ',
    'Cancel':
        'Ακύρωση',
    'Yes':
        'Ναι',
    'No':
        'Όχι',

    // help
    'Help':
        'Βοήθεια',

    // zoom blocks
    'Zoom blocks':
        'μεγένθυση των μπλοκ',
    'build':
        'κατασκευή',
    'your own':
        'το δικό σας',
    'blocks':
        'μπλοκ',
    'normal (1x)':
        'κανονικό (1x)',
    'demo (1.2x)':
        'επίδειξη (1.2x)',
    'presentation (1.4x)':
        'παρουσίαση (1.4x)',
    'big (2x)':
        'μεγάλο (2x)',
    'huge (4x)':
        'πολύ μεγάλο (4x)',
    'giant (8x)':
        'γιγαντιαίο (8x)',
    'monstrous (10x)':
        'τεράστιο (10x)',

    // Project Manager
    'Untitled':
        'Χωρίς Τίτλο',
    'Open Project':
        'Άνοιγμα Εργασίας',
    '(empty)':
        '(άδειο)',
    'Saved!':
        'Αποθηκεύτηκε!',
    'Delete Project':
        'Διαγραφή Εργασίας',
    'Are you sure you want to delete':
        'Είστε σίγουροι ότι θέλετε να γίνει διαγραφή?',
    'rename...':
        'μετονόμαση...',

    // costume editor
    'Costume Editor':
         'Επεξεργαστής κουστουμιών',
    'Paint Editor':
        'Επεξεργαστής ζωγραφικής',
    'click or drag crosshairs to move the rotation center':
        'Κάντε κλικ ή ρύρετε το στόχαστρο για να μετακινήσετε το άξονα περιστροφής',
    'undo':
        'αναίρεση',
    'Vector':
        'Διανυσματική Σχεδίαση',
    'Paintbrush tool\n(free draw)':
        'Πινέλο\n(ελεύθερη σχεδίαση)',
    'Stroked Rectangle\n(shift: square)':
        'Ορθογώνιο\n(Shift: τετράγωνο)',
    'Stroked Ellipse\n(shift: circle)':
        'Έλλειψη\n(Shift: κύκλος)',
    'Eraser tool':
        'Σβήστρα',
    'Set the rotation center':
        'Θέσε το κέντρο περιστροφής',
    'Line tool\n(shift: vertical/horizontal)':
        'Ευθεία γραμμή\n(Shift: κάθετη/οριζόντια)',
    'Filled Rectangle\n(shift: square)':
        'Γεμάτο Ορθογώνιο\n(Shift: τετράγωνο)',
    'Filled Ellipse\n(shift: circle)':
        'Γεμάτη Έλλειψη\n(Shift: κύκλος)',
    'Fill a region':
        'Γέμισε μια περιοχή',
    'Pipette tool\n(pick a color anywhere)':
        'Επιλογή χρώματος\n(διάλεξε ένα χρώμα από όπουδήποτε)',
    'Brush size':
        'Μέγεθος πινέλου',
    'Constrain proportions of shapes?\n(you can also hold shift)':
        'Ενεργοποίηση περιορισμού σχημάτων\n(εναλλακτικά πατώντας shift)',
    'grow':
        'μεγάλωσε',
     'shrink':
       'μίκρυνε',
     'flip ↔':
       'εναλλαγή ↔',
     'flip ↕':
       'εναλλαγή ↕',
    
    'Vector Paint Editor':
        'Επεξεργαστής Διανυσματικών γραφικών',
    'Rectangle\n(shift: square)':
        'Ορθογώνιο\n(Shift: Quadrat)',
    'Ellipse\n(shift: circle)':
        'Έλλειψη\n(Shift: κύκλος)',
    'Selection tool':
        'Εργαλείο επιλογής',
    'Line tool\n(shift: constrain to 45º)':
        'Ευθεία γραμμή\n(Shift: περιορισμός σε 45°)',
    'Closed brush\n(free draw)':
        'Πινέλο\n(ελεύθερη σχεδίαση)',
    'Paint a shape\n(shift: secondary color)':
        'Ζωγράφισε ένα σχήμα\n(Shift: δευτερεύων χρώμα)',
    'Pipette tool\n(pick a color from anywhere\nshift: secondary color)':
        'Εργαλείο επιλογής χρώματος\n(διάλεξε ένα χρώμα από οπουδήποτε\nshift: δευτερεύων χρώμα)',
    'Primary color      Secondary color':
        'Πρωτεύων χρώμα          Δευτερεύων χρώμα',
    'Top':
        'Πάνω',
    'Bottom':
       'Κάτω',
   'Up':
       'προς τα πάνω',
   'Down':
       'προς τα κάτω',


    // project notes
    'Project Notes':
        'Σχόλια Εργασίας',

    // new project
    'New Project':
        'Νέα Εργασία',
    'Replace the current project with a new one?':
        'Θέλετε να αντικαταστήσετε την τρέχουσα εργασία με μία καινούρια?',

    // save project
    'Save Project As...':
        'Αποθήκευση Εργασίας Ως...',

    // export blocks
    'Export blocks':
        'Εξαγωγή των μπλοκ',
    'Import blocks':
        'Εισαγωγή των μπλοκ',
    'this project doesn\'t have any\ncustom global blocks yet':
        'αυτή η εργασία δεν έχει κανενα\nπροσαρμοσμένο παγκόσμιο μπλοκ ακόμα',
    'select':
        'επιλογή',
    'all':
        'όλα',
    'none':
        'τίποτα',

    // variable dialog
    'for all sprites':
        'για όλα τα sprite',
    'for this sprite only':
        'μόνο για αυτό το sprite',

    // block dialog
    'Change block':
        'Αλλαγή του μπλοκ',
    'Command':
        'Εντολή',
    'Reporter':
        'Αναφορέας',
    'Predicate':
        'Κατηγόρημα',

    // block editor
    'Block Editor':
        'Επεξεργαστής του μπλοκ',
    'Apply':
        'Εφαρμογή',

    // block deletion dialog
    'Delete Custom Block':
        'Διαγραφή προσαρμοσμένου μπλοκ',
    'block deletion dialog text':
        'Είστε σίγουροι ότι θέλετε να διαγράψετε αυτο το μπλολ\n' +
        'Και όλων των εμφανίσεών του?',

    // input dialog
    'Create input name':
        'Δημιουργία ονόματος τιμής',
    'Edit input name':
        'Επεξεργασία ονόματος τιμής',
    'Edit label fragment':
        'Επεξεργασία κομματιού της ετικέτας',
    'Title text':
        'Τίτλος κειμένου',
    'Input name':
        'Όνομα τιμής',
    'Delete':
        'Διαγραφή',
    'Object':
        'Αντικείμενο',
    'Number':
        'Νούμερο',
    'Text':
        'Κείμενο',
    'List':
        'Λίστα',
    'Any type':
        'Οποιουδήποτε τύπου ',
    'Boolean (T/F)':
        'Boolean Σωστό/Λάθος (Σ/Λ)',
    'Command\n(inline)':
        'Εντολή\n(στη σειρά)',
    'Command\n(C-shape)':
        'Εντολή\n(C-μορφή)',
    'Any\n(unevaluated)':
        'Οτιδήποτε\n(δεν έχει αξιολογηθεί)',
    'Boolean\n(unevaluated)':
        'Boolean(σωστό/λάθος)\n(δεν έχει αξιολογηθεί)',
    'Single input.':
        'Μία τιμή.',
    'Default Value:':
        'Προεπιλογή:',
    'Multiple inputs (value is list of inputs)':
        'Πολλές τιμές (η αξία είναι η λίστα με τις τιμές)',
    'Upvar - make internal variable visible to caller':
        'Κανε την παράμετρο ορατή προς τα έξω',

    // About Snap
    'About Snap':
        'Πληροφορίες για το Snap',
    'Back...':
        'Πίσω...',
    'License...':
        'Άδιεα...',
    'Modules...':
        'Ενότητες...',
    'Credits...':
        'Συντελεστές...',
    'Translators...':
        'Μεταφραστές...',
    'License':
        'Άδεια',
    'current module versions:':
        'Τρέχουσα έκδοση των ενοτήτων',
    'Contributors':
        'Συντελεστές',
    'Translations':
        'Μεταφράσεις',

    // variable watchers
    'normal':
        'κανονικό',
    'large':
        'μεγάλο',
    'slider':
        'Ρυθμιστής',
    'slider min...':
        'ελάχιστη αξία...',
    'slider max...':
        'μέγιστη αξία...',
    'import...':
        'εισαγωγή...',
    'Slider minimum value':
        'Ελάχιστη τιμή του ρυθμιστή',
    'Slider maximum value':
        'Μέγιστη τιμή του ρυθμιστή',

    // list watchers
    'length: ':
        'μήκος: ',

    // coments
    'add comment here...':
        'πρόσθεσε κάποιο σχόλιο εδώ...',

    // drow downs
    // directions
    '(90) right':
        '(90) δεξιά',
    '(-90) left':
        '(-90) αριστερά',
    '(0) up':
        '(0) πάνω',
    '(180) down':
        '(180) κάτω',

    // collision detection
    'mouse-pointer':
        'δείκτης-ποντικιού',
    'edge':
        'άκρη',
    'pen trails':
        'ίχνοι στυλού',

    // costumes
    'Turtle':
        'Χελώνα',
    'Empty':
        'Άδειο',

    // graphical effects
    'ghost':
        'φάντασμα',

    // keys
    'space':
        'κενό',
    'up arrow':
        'πάνω βέλος',
    'down arrow':
        'κάτω βέλος',
    'right arrow':
        'δεξί βέλος',
    'left arrow':
        'αριστερό βέλος',
    'a':
        'α',
    'b':
        'β',
    'c':
        'ψ',
    'd':
        'δ',
    'e':
        'ε',
    'f':
        'φ',
    'g':
        'γ',
    'h':
        'η',
    'i':
        'ι',
    'j':
        'ξ',
    'k':
        'κ',
    'l':
        'λ',
    'm':
        'μ',
    'n':
        'ν',
    'o':
        'ο',
    'p':
        'π',
    'q':
        'q',
    'r':
        'ρ',
    's':
        'σ',
    't':
        'τ',
    'u':
        'θ',
    'v':
        'ω',
    'w':
        'ς',
    'x':
        'χ',
    'y':
        'υ',
    'z':
        'ζ',
    '0':
        '0',
    '1':
        '1',
    '2':
        '2',
    '3':
        '3',
    '4':
        '4',
    '5':
        '5',
    '6':
        '6',
    '7':
        '7',
    '8':
        '8',
    '9':
        '9',

    // messages
    'new...':
        'νέο...',

    // math functions
    'abs':
        'απόλυτη τιμή',
    'floor':
        'σε μορφή ακέραιου αριθμού',
    'sqrt':
        'ρίζα',
    'sin':
        'ημίτονο',
    'cos':
        'συνημίτονο',
    'tan':
        'εφαπτομένη',
    'asin':
        'τόξο ημιτόνου',
    'acos':
        'τόξο συνημιτόνου',
    'atan':
        'τόξο εφαπτομένης',
    'ln':
        'ln',
    'e^':
        'e^',

    // data types
    'number':
        'νούμερο',
    'text':
        'κείμενο',
    'Boolean':
        'Boole',
    'list':
        'λίστα',
    'command':
        'εντολή',
    'reporter':
        'αναφορέας',
    'predicate':
        'κατηγορούμενο',

    // list indices
    'last':
        'τελευταίο',
    'any':
        'οποιοδήποτε'
};
