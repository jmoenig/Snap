/*

    lang-kn.js

    Kannada translation for SNAP!

    written by Vinayakumar R

    Copyright (C) 2014 by Vinayakumar R

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

SnapTranslator.dict.kn = {


    // translations meta information
    'language_name':
        '\u0C95\u0CA8\u0CCD\u0CA8\u0CA1', // the name as it should appear in the language menu
    'language_translator':
        'Vinayakumar R', // your name for the Translators tab
    'translator_e-mail':
        'vnkmr7620@gmail.com', // optional
    'last_changed':
        '2014-25-11', // this, too, will appear in the Translators tab

    // GUI
    // control bar:
    'untitled':
        'Unbenannt',
    'development mode':
        'Hackermodus',

    // categories:
    'Motion':
        '\u0C9A\u0CB2\u0CA8\u0CC6',
    'Looks':
        '\u0C95\u0CBE\u0CA3\u0CC1\u0CB5\u0CC1\u0CA6\u0CC1',
    'Sound':
        '\u0CB6\u0CAC\u0CCD\u0CA6',
    'Pen':
        '\u0CB2\u0CC7\u0C96\u0CA8\u0CBF',
    'Control':
        '\u0CB9\u0CBF\u0CA1\u0CBF\u0CA4',
    'Sensing':
        '\u0C97\u0CCD\u0CB0\u0CB9\u0CBF\u0CB8\u0CC1\u0CB5\u0CC1\u0CA6\u0CC1',
    'Operators':
        '\u0C9A\u0CBF\u0CB9\u0CCD\u0CA8\u0CCD\u0CB9\u0CC6\u0C97\u0CB3\u0CC1',
    'Variables':
        '\u0CAA\u0CB0\u0CBF\u0CB5\u0CB0\u0CCD\u0CA4\u0CA8\u0CC6\u0C97\u0CB3\u0CC1',
    'Lists':
        '\u0CAA\u0C9F\u0CCD\u0C9F\u0CBF\u0C97\u0CB3\u0CC1',
    'Other':
        '\u0C87\u0CA4\u0CB0\u0CC6',

    // editor:
    'draggable':
        '\u0C8E\u0CB3\u0CC6\u0CAF\u0CAC\u0CB9\u0CC1\u0CA6\u0CBE\u0CA6',

    // tabs:
    'Scripts':
        '\u0C86\u0C9C\u0CCD\u0C9E\u0CCD\u0CB9\u0CC6\u0C97\u0CB3\u0CC1',
    'Costumes':
        '\u0C89\u0CA1\u0CC1\u0CAA\u0CC1\u0C97\u0CB3\u0CC1',
    'Sounds':
        '\u0CB6\u0CAC\u0CCD\u0CA6\u0C97\u0CB3\u0CC1',

    // names:
    'Sprite':
        '\u0CAF\u0C95\u0CCD\u0CB7\u0CBF\u0CA3\u0CBF',
    'Stage':
        '\u0CB5\u0CC7\u0CA6\u0CBF\u0C95\u0CC6',

    // rotation styles:
    'don\'t rotate':
        '\u0CA4\u0CBF\u0CB0\u0CC1\u0C97\u0CAC\u0CC7\u0CA1',
    'can rotate':
        '\u0CA4\u0CBF\u0CB0\u0CC1\u0C97\u0CBF\u0CB8\u0CAC\u0CB9\u0CC1\u0CA6\u0CC1',
    'only face left/right':
        '\u0CAE\u0CC1\u0C96\u0020\u0CAC\u0CB2\u0C97\u0CA1\u0CC6\u002F\u0C8E\u0CA1\u0C97\u0CA1\u0CC6',

    // new sprite button:
    'add a new sprite':
        '\u0CB9\u0CCA\u0CB8\u0020\u0CAF\u0C95\u0CCD\u0CB7\u0CBF\u0CA3\u0CBF\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0C95\u0CC2\u0CA1\u0CBF\u0CB8\u0CC1',

    // tab help
    'costumes tab help':
        '\u0C87\u0CA8\u0CCD\u0CA8\u0CBF\u0CA4\u0CB0\u0020\u0C9C\u0CBE\u0CB2\u0CA4\u0CBE\u0CA3\u0020\u0C85\u0CA5\u0CB5\u0CBE\u0020\u0CA8\u0CBF\u0CAE\u0CCD\u0CAE\u0020\u0C97\u0CA3\u0C95\u0CAF\u0C82\u0CA4\u0CCD\u0CB0\u0CA6\u0CBF\u0C82\u0CA6\u0020\u0C9A\u0CBF\u0CA4\u0CCD\u0CB0\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0C87\u0CB2\u0CCD\u0CB2\u0CBF\u0C97\u0CC6\u0020\u0C8E\u0CB3\u0CC6\u0CAF\u0CC1\u0CB5\u0CC1\u0CA6\u0CB0\u0CBF\u0C82\u0CA6\u0020\u0C86\u0CAE\u0CA6\u0CC1\u0020\u0CAE\u0CBE\u0CA1\u0CBF\u0C95\u0CCA\u0CB3\u0CCD\u0CB3\u0CAC\u0CB9\u0CC1\u0CA6\u0CC1\u0020'
           ,
    'import a sound from your computer\nby dragging it into here':
        '\u0CB6\u0CAC\u0CCD\u0CA6\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CA8\u0CBF\u0CAE\u0CCD\u0CAE\u0020\u0C97\u0CA3\u0C95\u0CAF\u0C82\u0CA4\u0CCD\u0CB0\u0CA6\u0CBF\u0C82\u0CA6\u0020\u0C87\u0CB2\u0CCD\u0CB2\u0CBF\u0C97\u0CC6\u0020\u0C8E\u0CB3\u0CC6\u0CAF\u0CC1\u0CB5\u0CC1\u0CA6\u0CB0\u0CBF\u0C82\u0CA6\u0020\u0C86\u0CAE\u0CA6\u0CC1\u0020\u0CAE\u0CBE\u0CA1\u0CBF\u0C95\u0CCA\u0CB3\u0CCD\u0CB3\u0CAC\u0CB9\u0CC1\u0CA6\u0CC1',

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
        'B\u00fchne ausgew\u00e4hlt:\nkeine Standardbewegungsbl\u00f6cke\n'
            + 'vorhanden',

    'move %n steps':
        '\u0C9A\u0CB2\u0CBF\u0CB8\u0CC1 %n \u0CB9\u0CC6\u0C9C\u0CCD\u0C9C\u0CC6\u0C97\u0CB3\u0CC1',
    'turn %clockwise %n degrees':
        '\u0CA4\u0CBF\u0CB0\u0CC1\u0C97\u0CC1 %clockwise %n \u0C95\u0CCB\u0CA8\u0CA6\u0CB2\u0CCD\u0CB2\u0CBF',
    'turn %counterclockwise %n degrees':
        '\u0CA4\u0CBF\u0CB0\u0CC1\u0C97\u0CC1 %counterclockwise %n \u0C95\u0CCB\u0CA8\u0CA6\u0CB2\u0CCD\u0CB2\u0CBF',
    'point in direction %dir':
        '\u0CAC\u0CBF\u0C82\u0CA6\u0CC1\u0CB5\u0CBF\u0CA8\u0020\u0CA6\u0CBF\u0C95\u0CCD\u0C95\u0CBF\u0CA8\u0020\u0C95\u0CA1\u0CC7 %dir',
    'point towards %dst':
        '\u0CA6\u0CBF\u0C95\u0CCD\u0C95\u0CBF\u0CA8\u0020\u0C95\u0CA1\u0CC7\u0C97\u0CC6 %dst',
    'go to x: %n y: %n':
        '\u0CB9\u0CCB\u0C97\u0CC1 x: %n y: %n',
    'go to %dst':
        '\u0CB9\u0CCB\u0C97\u0CC1 %dst',
    'glide %n secs to x: %n y: %n':
        '\u0CB8\u0CB0\u0CBF %n \u0CB8\u0CC6\u0C95\u0CC6\u0C82\u0CA1\u0CBF\u0CA8\u0CB2\u0CCD\u0CB2\u0CBF,\u0CAC\u0CBF\u0C82\u0CA6\u0CC1\u0CB5\u0CBF\u0C97\u0CC6 x: %n y: %n',
    'change x by %n':
        '\u0CAC\u0CA6\u0CB2\u0CBE\u0CB9\u0CBF\u0CB8\u0CC1 x \u0C85\u0CA8\u0CCD\u0CA8\u0CC1  %n',
    'set x to %n':
        '\u0CB9\u0CCA\u0C82\u0CA6\u0CBF\u0CB8\u0CC1 x \u0C85\u0CA8\u0CCD\u0CA8\u0CC1 %n',
    'change y by %n':
        '\u0CAC\u0CA6\u0CB2\u0CBE\u0CB9\u0CBF\u0CB8\u0CC1 y \u0C85\u0CA8\u0CCD\u0CA8\u0CC1  %n',
    'set y to %n':
        '\u0CB9\u0CCA\u0C82\u0CA6\u0CBF\u0CB8\u0CC1 y \u0C85\u0CA8\u0CCD\u0CA8\u0CC1 %n',
    'if on edge, bounce':
        '\u0C92\u0C82\u0CA6\u0CC1\u0020\u0CB5\u0CC7\u0CB3\u0CC6\u0020\u0C95\u0CCA\u0CA8\u0CC6\u0C97\u0CC6\u0020\u0CB9\u0CCB\u0CA6\u0CBE\u0C97\u0020\u0C9C\u0CBF\u0C97\u0CBF',
    'x position':
        'x-\u0CB8\u0CCD\u0CA5\u0CBE\u0CA8',
    'y position':
        'y-\u0CB8\u0CCD\u0CA5\u0CBE\u0CA8',
    'direction':
        '\u0CA6\u0CBF\u0C95\u0CCD\u0C95\u0CC1',

    // looks:
    'switch to costume %cst':
        '\u0C89\u0CA1\u0CC1\u0CAA\u0CA8\u0CCD\u0CA8\u0CC1 %cst \u0C97\u0CC6\u0020\u0CAC\u0CA6\u0CB2\u0CBE\u0CB9\u0CBF\u0CB8\u0CC1',
    'next costume':
        '\u0CAE\u0CC1\u0C82\u0CA6\u0CBF\u0CA8\u0020\u0C89\u0CA1\u0CC1\u0CAA\u0CC1',
    'costume #':
        '\u0C89\u0CA1\u0CC1\u0CAA\u0CC1',
    'say %s for %n secs':
        '\u0CB9\u0CC7\u0CB3\u0CC1 %s \u0C85\u0C82\u0CA4 %n \u0CB8\u0CC6\u0C95\u0CC6\u0C82\u0CA1\u0CBF\u0CA8\u0CB2\u0CCD\u0CB2\u0CBF',
    'say %s':
        '\u0CB9\u0CC7\u0CB3\u0CC1 %s',
    'think %s for %n secs':
        '\u0CAF\u0CCB\u0C9A\u0CBF\u0CB8\u0CC1 %s \u0C85\u0C82\u0CA4 %n \u0CB8\u0CC6\u0C95\u0CC6\u0C82\u0CA1\u0CC1\u0C97\u0CB3\u0CB5\u0CB0\u0C97\u0CC6',
    'think %s':
        '\u0CAF\u0CCB\u0C9A\u0CBF\u0CB8\u0CC1 %s',
    'Hello!':
        '\u0CA8\u0CAE\u0CB8\u0CCD\u0C95\u0CBE\u0CB0!',
    'Hmm...':
        '\u0C85\u0CB9\u0C83...',
    'change %eff effect by %n':
        '\u0CAA\u0CB0\u0CBF\u0CA3\u0CBE\u0CAE\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1 %eff \u0C97\u0CC6\u0020\u0CAC\u0CA6\u0CB2\u0CBE\u0CB9\u0CBF\u0CB8\u0CC1 %n',
    'set %eff effect to %n':
        '\u0CAA\u0CB0\u0CBF\u0CA3\u0CBE\u0CAE\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1 %eff \u0C97\u0CC6\u0020\u0CB9\u0CCA\u0C82\u0CA6\u0CBF\u0CB8\u0CC1 %n',
    'clear graphic effects':
        '\u0C8E\u0CB2\u0CCD\u0CB2\u0CBE\u0020\u0CAA\u0CB0\u0CBF\u0CA3\u0CBE\u0CAE\u0C97\u0CB3\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0C85\u0CB3\u0CBF\u0CB8\u0CC1',
    'change size by %n':
        '\u0CB0\u0CB7\u0CCD\u0C9F\u0CC1\u0020\u0C97\u0CBE\u0CA4\u0CCD\u0CB0\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CAC\u0CA6\u0CB2\u0CBE\u0CB9\u0CBF\u0CB8\u0CC1 %n',
    'set size to %n %':
        '\u0CB0\u0CB7\u0CCD\u0C9F\u0CC1\u0020\u0C97\u0CBE\u0CA4\u0CCD\u0CB0\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CB9\u0CCA\u0C82\u0CA6\u0CBF\u0CB8\u0CC1 %n %',
    'size':
        '\u0C97\u0CBE\u0CA4\u0CCD\u0CB0',
    'show':
        '\u0CA4\u0CCB\u0CB0\u0CBF\u0CB8\u0CC1',
    'hide':
        '\u0CAC\u0C9A\u0CCD\u0C9A\u0CBF\u0CA1\u0CC1',
    'go to front':
        '\u0CAE\u0CC1\u0C82\u0CA6\u0C95\u0CCD\u0C95\u0CC6\u0020\u0CB9\u0CCB\u0C97\u0CC1',
    'go back %n layers':
        '\u0CAA\u0CA6\u0CB0\u0C97\u0CB3\u0CC1 %n \u0CB0\u0CB7\u0CCD\u0C9F\u0CC1\u0020\u0CB9\u0CBF\u0C82\u0CA6\u0C95\u0CCD\u0C95\u0CC6\u0020\u0CB9\u0CCB\u0C97\u0CC1',

    'development mode \ndebugging primitives:':
        '\u0CAC\u0CC6\u0CB3\u0CB5\u0CA3\u0CBF\u0C97\u0CC6\u0CAF\u0020\u0C95\u0CCD\u0CB0\u0CAE \n\u0CA6\u0CCB\u0CB7\u0020\u0CA8\u0CBF\u0CA6\u0CBE\u0CA8\u0020\u0CAE\u0CC1\u0CB2\u0CBE\u0C97\u0CB3\u0CC1',
    'console log %mult%s':
        '\u0CAE\u0CC1\u0C96\u0CCD\u0CAF\u0020\u0C9F\u0CB0\u0CCD\u0CAE\u0CBF\u0CA8\u0CB2\u0CCD\u0020\u0C95\u0CA1\u0CA4: %mult%s',
    'alert %mult%s':
        '\u0C8E\u0C9A\u0CCD\u0C9A\u0CB0\u0CBF\u0C95\u0CC6 %mult%s',

    // sound:
    'play sound %snd':
        '\u0CB6\u0CAC\u0CCD\u0CA6\u0020\u0C95\u0CC7\u0CB3\u0CBF\u0CB8\u0CC1 %snd',
    'play sound %snd until done':
        '\u0C86\u0C97\u0CC1\u0CB5\u0CB5\u0CB0\u0C97\u0CC6\u0020 %snd \u0CB6\u0CAC\u0CCD\u0CA6\u0020\u0C95\u0CC7\u0CB3\u0CBF\u0CB8\u0CC1',
    'stop all sounds':
        '\u0C8E\u0CB2\u0CCD\u0CB2\u0CBE\u0020\u0CB6\u0CAC\u0CCD\u0CA6\u0C97\u0CB3\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CA8\u0CBF\u0CB2\u0CCD\u0CB2\u0CBF\u0CB8\u0CC1',
    'rest for %n beats':
        '\u0CB2\u0CAF\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1 %n \u0CB0\u0CB7\u0CCD\u0C9F\u0CC1\u0020\u0CA8\u0CBF\u0CB2\u0CCD\u0CB2\u0CBF\u0CB8\u0CBF',
    'play note %n for %n beats':
        '\u0CB8\u0C82\u0C97\u0CC0\u0CA4\u0CB8\u0CCD\u0CB5\u0CB0 %n \u0C85\u0CA8\u0CCD\u0CA8\u0CC1 %n \u0CB2\u0CAF\u0CA6\u0CB2\u0CCD\u0CB2\u0CBF\u0020\u0C95\u0CC7\u0CB3\u0CBF\u0CB8\u0CBF',
    'change tempo by %n':
        '\u0CB0\u0CB7\u0CCD\u0C9F\u0CC1\u0020\u0CA4\u0CBE\u0CB3\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CAC\u0CA6\u0CB2\u0CBE\u0CB9\u0CBF\u0CB8\u0CC1 %n',
    'set tempo to %n bpm':
        '\u0CA4\u0CBE\u0CB3\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1 %n \u0C97\u0CC6\u0020\u0CB9\u0CCA\u0C82\u0CA6\u0CBF\u0CB8\u0CC1',
    'tempo':
        '\u0CA4\u0CBE\u0CB3',

    // pen:
    'clear':
        '\u0C85\u0CB3\u0CBF\u0CB8\u0CC1',
    'pen down':
        '\u0CB2\u0CC7\u0C96\u0CA8\u0CBF\u0CAF\u0CC1\u0C95\u0CCD\u0CA4',
    'pen up':
        '\u0CB2\u0CC7\u0C96\u0CA8\u0CBF\u0CAE\u0CC1\u0C95\u0CCD\u0CA4',
    'set pen color to %clr':
        '\u0C97\u0CC6\u0020\u0CB2\u0CC7\u0C96\u0CA8\u0CBF\u0020\u0CAC\u0CA3\u0CCD\u0CA3\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CB9\u0CCA\u0C82\u0CA6\u0CBF\u0CB8\u0CC1 %clr',
    'change pen color by %n':
        '\u0C97\u0CC6\u0020\u0CB2\u0CC7\u0C96\u0CA8\u0CBF\u0020\u0CAC\u0CA3\u0CCD\u0CA3\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CAC\u0CA6\u0CB2\u0CBE\u0CB9\u0CBF\u0CB8\u0CC1 %n',
    'set pen color to %n':
         '\u0C97\u0CC6\u0020\u0CB2\u0CC7\u0C96\u0CA8\u0CBF\u0020\u0CAC\u0CA3\u0CCD\u0CA3\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CB9\u0CCA\u0C82\u0CA6\u0CBF\u0CB8\u0CC1 %n',
    'change pen shade by %n':
        '\u0CB0\u0CB7\u0CCD\u0C9F\u0CC1\u0020\u0CB2\u0CC7\u0C96\u0CA8\u0CBF\u0020\u0CA8\u0CC6\u0CB0\u0CB3\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CAC\u0CA6\u0CB2\u0CBE\u0CB9\u0CBF\u0CB8\u0CC1 %n',
    'set pen shade to %n':
        '\u0CB0\u0CB7\u0CCD\u0C9F\u0CC1\u0020\u0CB2\u0CC7\u0C96\u0CA8\u0CBF\u0020\u0CA8\u0CC6\u0CB0\u0CB3\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CB9\u0CCA\u0C82\u0CA6\u0CBF\u0CB8\u0CC1 %n',
    'change pen size by %n':
        '\u0CB0\u0CB7\u0CCD\u0C9F\u0CC1\u0020\u0CB2\u0CC7\u0C96\u0CA8\u0CBF\u0020\u0C97\u0CBE\u0CA4\u0CCD\u0CB0\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CAC\u0CA6\u0CB2\u0CBE\u0CB9\u0CBF\u0CB8\u0CC1 %n',
    'set pen size to %n':
        '\u0CB0\u0CB7\u0CCD\u0C9F\u0CC1\u0020\u0CB2\u0CC7\u0C96\u0CA8\u0CBF\u0020\u0C97\u0CBE\u0CA4\u0CCD\u0CB0\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CB9\u0CCA\u0C82\u0CA6\u0CBF\u0CB8\u0CC1 %n',
    'stamp':
        '\u0CAE\u0CC1\u0CA6\u0CCD\u0CB0\u0CBF\u0CB8\u0CC1',

    // control:
    'when %greenflag clicked':
        '\u0CAF\u0CBE\u0CB5\u0CBE\u0C97\u0CB2\u0CBE\u0CA6\u0CB0\u0CC2 %greenflag \u0C92\u0CA4\u0CCD\u0CA4\u0CBF\u0CA6\u0CBE\u0C97',
    'when %keyHat key pressed':
        '\u0CAF\u0CBE\u0CB5\u0CBE\u0C97\u0CB2\u0CBE\u0CA6\u0CB0\u0CC2 %keyHat \u0C95\u0CC0\u0020\u0C92\u0CA4\u0CCD\u0CA4\u0CBF\u0CA6\u0CBE\u0C97',
    'when I am clicked':
        '\u0CAF\u0CBE\u0CB5\u0CBE\u0C97\u0CB2\u0CBE\u0CA6\u0CB0\u0CC2\u0020\u0CA8\u0CBE\u0CA8\u0CC1\u0020\u0C92\u0CA4\u0CCD\u0CA4\u0CBF\u0CA6\u0CBE\u0C97',
    'when I receive %msgHat':
        '\u0CAF\u0CBE\u0CB5\u0CBE\u0C97\u0CB2\u0CBE\u0CA6\u0CB0\u0CC1 %msgHat \u0CB8\u0CCD\u0CB5\u0CC0\u0C95\u0CB0\u0CBF\u0CB8\u0CBF\u0CA6\u0CBE\u0C97',
    'broadcast %msg':
        '\u0CAA\u0CCD\u0CB0\u0CB8\u0CB0\u0CBF\u0CB8\u0CC1 %msg',
    'broadcast %msg and wait':
       '\u0CAA\u0CCD\u0CB0\u0CB8\u0CB0\u0CBF\u0CB8\u0CC1 %msg \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1\u0020\u0C95\u0CBE\u0CAF\u0CAC\u0CC7\u0C95\u0CC1',
    'Message name':
        '\u0CAE\u0CBE\u0CB9\u0CBF\u0CA4\u0CBF\u0CAF\u0020\u0CB9\u0CC6\u0CB8\u0CB0\u0CC1',
    'message':
        '\u0CAE\u0CBE\u0CB9\u0CBF\u0CA4\u0CBF',
    'any message':
        '\u0CAF\u0CBE\u0CB5\u0CC1\u0CA6\u0CBE\u0CA6\u0CB0\u0CC1\u0020\u0CAE\u0CBE\u0CB9\u0CBF\u0CA4\u0CBF',
    'wait %n secs':
        '\u0CA8\u0CBF\u0CA7\u0CBE\u0CA8\u0CBF\u0CB8\u0CC1 %n \u0CB8\u0CC6\u0C95\u0CC6\u0C82\u0CA1\u0CBF\u0CA8\u0CB7\u0CCD\u0C9F\u0CC1',
    'wait until %b':
        '\u0CB5\u0CB0\u0C97\u0CC2\u0020\u0C95\u0CBE\u0CAF\u0CAC\u0CC7\u0C95\u0CC1 %b',
    'forever %c':
        '\u0CAF\u0CBE\u0CB5\u0CBE\u0C97\u0CB2\u0CC1 %c',
    'repeat %n %c':
        '\u0CAE\u0CB0\u0CC1\u0C95\u0CB3\u0CBF\u0CB8\u0CC1 %n mal %c',
    'repeat until %b %c':
        '\u0CB5\u0CB0\u0CC6\u0C97\u0CC2\u0020\u0CAE\u0CB0\u0CC1\u0C95\u0CB3\u0CBF\u0CB8\u0CC1 %b %c',
    'if %b %c':
        '\u0C92\u0C82\u0CA6\u0CC1\u0CB5\u0CC7\u0CB3\u0CC6 %b %c',
    'if %b %c else %c':
        '\u0C92\u0C82\u0CA6\u0CC1\u0CB5\u0CC7\u0CB3\u0CC6 %b %c \u0C87\u0CB2\u0CCD\u0CB2\u0CA6\u0CBF\u0CA6\u0CCD\u0CA6\u0CB0\u0CC6 %c',
    'report %s':
        '\u0CA8\u0CBF\u0CB0\u0CC2\u0CAA\u0CBF\u0CB8\u0CC1 %s',
    'stop %stopChoices':
        '\u0CA8\u0CBF\u0CB2\u0CCD\u0CB2\u0CBF\u0CB8\u0CC1 %stopChoices',
    'all':
        '\u0C8E\u0CB2\u0CCD\u0CB2\u0CBE',
    'this script':
        '\u0C87\u0020\u0C86\u0C9C\u0CCD\u0C9E\u0CCD\u0CB9\u0CC6',
    'this block':
        '\u0C87\u0020\u0CB5\u0CBF\u0CAD\u0CBE\u0C97',
    'stop %stopOthersChoices':
        '\u0CA8\u0CBF\u0CB2\u0CCD\u0CB2\u0CBF\u0CB8\u0CC1 %stopOthersChoices',
    'all but this script':
        '\u0C87\u0020\u0C86\u0C9C\u0CCD\u0C9E\u0CCD\u0CB9\u0CC6\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CAC\u0CBF\u0C9F\u0CCD\u0C9F\u0CC1\u0020\u0CAE\u0CA4\u0CCD\u0CA4\u0CA6\u0CCD\u0CA6\u0CC6\u0CB2\u0CCD\u0CB2',
    'other scripts in sprite':
        '\u0C87\u0020\u0CAF\u0C95\u0CCD\u0CB7\u0CBF\u0CA3\u0CBF\u0CAF\u0CB2\u0CCD\u0CB2\u0CBF\u0020\u0C87\u0CA8\u0CCD\u0CA8\u0CBF\u0CA4\u0CB0\u0020\u0C86\u0C9C\u0CCD\u0C9E\u0CCD\u0CB9\u0CC6\u0C97\u0CB3\u0CC1',
    'pause all %pause':
        '\u0C8E\u0CB2\u0CCD\u0CB2\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CA8\u0CBF\u0CB2\u0CCD\u0CB2\u0CBF\u0CB8\u0CC1 %pause',
    'run %cmdRing %inputs':
        '\u0C93\u0CA1\u0CBF\u0CB8\u0CC1 %cmdRing %inputs',
    'launch %cmdRing %inputs':
        '\u0C89\u0CA1\u0CBE\u0CAF\u0CBF\u0CB8\u0CC1 %cmdRing %inputs',
    'call %repRing %inputs':
       '\u0C95\u0CB0\u0CC6 %repRing %inputs',
    'run %cmdRing w/continuation':
        '\u0C93\u0CA1\u0CBF\u0CB8\u0CC1 %cmdRing \u0C85\u0CA5\u0CB5\u0CBE\u0020\u0CAE\u0CC1\u0C82\u0CA6\u0CC1\u0CB5\u0CB0\u0CBF\u0C95\u0CC6',
    'call %cmdRing w/continuation':
        '\u0C95\u0CB0\u0CC6 %cmdRing \u0C85\u0CA5\u0CB5\u0CBE\u0020\u0CAE\u0CC1\u0C82\u0CA6\u0CC1\u0CB5\u0CB0\u0CBF\u0C95\u0CC6',
    'warp %c':
        '\u0CB8\u0CC1\u0CA4\u0CCD\u0CA4\u0CBF\u0CB9\u0CBE\u0C95\u0CC1 %c',
    'when I start as a clone':
        '\u0CAF\u0CBE\u0CB5\u0CBE\u0C97\u0CB2\u0CBE\u0CA6\u0CB0\u0CC1\u0020\u0CA4\u0CA6\u0CCD\u0CB0\u0CC2\u0CAA\u0CC1\u0020\u0CA4\u0CB0\u0CB9\u0020\u0CAA\u0CCD\u0CB0\u0CBE\u0CB0\u0C82\u0CAD\u0CBF\u0CB8\u0CBF\u0CA6\u0CBE\u0C97',
    'create a clone of %cln':
        '\u0CA8\u0C82\u0CA4\u0CC6\u0020\u0CA4\u0CA6\u0CCD\u0CB0\u0CC2\u0CAA\u0CC1\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CB0\u0C9A\u0CBF\u0CB8\u0CBF\u000A %cln',
    'myself':
        '\u0CB8\u0CCD\u0CB5\u0CA4\u0C83\u0020\u0CA8\u0CBE\u0CA8\u0CC1',
    'delete this clone':
        '\u0CA4\u0CA6\u0CCD\u0CB0\u0CC2\u0CAA\u0CC1\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0C85\u0CB3\u0CBF\u0CB8\u0CC1',

    // sensing:
    'touching %col ?':
        '\u0CAE\u0CC1\u0C9F\u0CCD\u0C9F\u0CBF\u0CA6\u0CB0\u0CC6 %col ?',
    'touching %clr ?':
        '\u0CAE\u0CC1\u0C9F\u0CCD\u0C9F\u0CBF\u0CA6\u0CBE\u0C97 %clr ?',
    'color %clr is touching %clr ?':
        '\u0CAC\u0CA3\u0CCD\u0CA3 %clr \u0C85\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CAE\u0CC1\u0C9F\u0CCD\u0C9F\u0CBF\u0CA6\u0CBE\u0C97\u0020 %clr ?',
    'ask %s and wait':
        '\u0C95\u0CC7\u0CB3\u0CC1 %s \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1\u0020\u0CA8\u0CBF\u0CA7\u0CBE\u0CA8\u0CBF\u0CB8\u0CC1',
    'what\'s your name?':
        '\u0CA8\u0CBF\u0CAE\u0CCD\u0CAE\u0020\u0CB9\u0CC6\u0CB8\u0CB0\u0CC7\u0CA8\u0CC1\u003F',
    'answer':
        '\u0C89\u0CA4\u0CCD\u0CA4\u0CB0',
    'mouse x':
        '\u0CAE\u0CCC\u0CB8\u0CCD\u0020\u0078',
    'mouse y':
        '\u0CAE\u0CCC\u0CB8\u0CCD\u0020\u0079',
    'mouse down?':
        '\u0CAE\u0CCC\u0CB8\u0CCD\u0020\u0CAE\u0CC1\u0C95\u0CCD\u0CA4?',
    'key %key pressed?':
        '\u0C95\u0CC0 %key \u0C92\u0CA4\u0CCD\u0CA4\u0CBF\u0CA6\u0CBE\u0C97?',
    'distance to %dst':
        '\u0C95\u0CCD\u0C95\u0CC6\u0020\u0CA6\u0CC2\u0CB0 %dst',
    'reset timer':
        '\u0CB8\u0CAE\u0CAF\u0CB8\u0CC2\u0C9A\u0C95\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CAE\u0CB0\u0CC1\u0CB9\u0CCA\u0C82\u0CA6\u0CBF\u0CB8\u0CC1',
    'timer':
        '\u0CB8\u0CAE\u0CAF\u0CB8\u0CC2\u0C9A\u0C95',
    '%att of %spr':
        '%att \u0C87\u0CA6\u0CB0\u0CA6\u0CCD\u0CA6\u0CC1 %spr',
    'http:// %s':
        'http:// %s',
    'turbo mode?':
        '\u0C97\u0CBE\u0CB3\u0CBF\u0020\u0CB5\u0CBF\u0CA7\u0CBE\u0CA8?',
    'set turbo mode to %b':
        '\u0C97\u0CC6\u0020\u0C97\u0CBE\u0CB3\u0CBF\u0020\u0CB5\u0CBF\u0CA7\u0CBE\u0CA8\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CB9\u0CCA\u0C82\u0CA6\u0CBF\u0CB8\u0CC1 %b',

    'filtered for %clr':
        '\u0C87\u0CA6\u0C95\u0CCD\u0C95\u0CC6\u0020\u0CB6\u0CCB\u0CA7\u0CBF\u0CB8\u0CB2\u0CBE\u0C97\u0CBF\u0CA6\u0CC6 %clr',
    'stack size':
        '\u0CAE\u0CC6\u0CA6\u0CC6\u0CAF\u0020\u0C97\u0CBE\u0CA4\u0CCD\u0CB0',
    'frames':
        '\u0C9A\u0CCC\u0C95\u0C9F\u0CCD\u0C9F\u0CC1\u0C97\u0CB3\u0CC1',

    // operators:
    '%n mod %n':
        '%n \u0CB6\u0CC7\u0CB7 %n',
    'round %n':
        '\u0CB8\u0CB0\u0CBF\u0CAE\u0CBE\u0CA1\u0CC1 %n',
    '%fun of %n':
        '%fun \u0CB0\u0CA6\u0CCD\u0CA6\u0CC1 %n',
    'pick random %n to %n':
        '\u0C8E\u0CB7\u0CCD\u0C9F\u0CA8\u0CBE\u0CA6\u0CB0\u0CC1\u0020\u0CAF\u0CBE\u0CA6\u0CC3\u0C9A\u0CBF\u0C95\u0CB5\u0CBE\u0C97\u0CBF\u0020\u0C86\u0CAF\u0CCD\u0CA6\u0CC1\u0C95\u0CCB %n \u0CB0\u0CBF\u0C82\u0CA6 %n',
    '%b and %b':
        '%b \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 %b',
    '%b or %b':
        '%b \u0C85\u0CA5\u0CB5\u0CBE %b',
    'not %b':
        '\u0C87\u0CB2\u0CCD\u0CB2 %b',
    '\u0CB8\u0CB0\u0CBF':
        'wahr',
    'false':
        '\u0CA4\u0CAA\u0CCD\u0CAA\u0CC1',
    'join %words':
        '\u0C95\u0CC2\u0CA1\u0CBF\u0CB8\u0CC1 %words',
    'split %s by %delim':
        '\u0CAC\u0CC7\u0CB0\u0CC6\u0CAE\u0CBE\u0CA1\u0CC1 %s \u0C85\u0CA8\u0CCD\u0CA8\u0CC1 %delim',
    'hello':
        '\u0CA8\u0CAE\u0CB8\u0CCD\u0C95\u0CBE\u0CB0',
    'world':
        '\u0CAA\u0CCD\u0CB0\u0CAA\u0C82\u0C9A',
    'letter %n of %s':
        '\u0C85\u0C95\u0CCD\u0CB7\u0CB0 %n \u0CB0\u0CB2\u0CCD\u0CB2\u0CBF %s',
    'length of %s':
        '\u0CA8\u0020\u0C89\u0CA6\u0CCD\u0CA6 %s',
    'unicode of %s':
        '\u0CB0\u0020\u0CAF\u0CC2\u0CA8\u0CBF\u0C95\u0CCB\u0CA1\u0CCD %s',
    'unicode %n as letter':
        '\u0CAF\u0CC2\u0CA8\u0CBF\u0C95\u0CCB\u0CA1\u0CCD %n \u0CA8\u0020\u0C85\u0C95\u0CCD\u0CB7\u0CB0\u0020',
    'is %s a %typ ?':
        '\u0C87\u0CA6\u0CC1 %s \u0C87\u0CA6\u0CB0\u0CA6\u0CC7 %typ ?',
    'is %s identical to %s ?':
       '\u0C87\u0CA6\u0CC1 %s \u0C92\u0C82\u0CA6\u0CC7\u0020\u0CB0\u0CC0\u0CA4\u0CBF\u0CAF\u0CBE\u0C97\u0CBF\u0CA6\u0CC6 %s ?',

    'type of %s':
        '\u0CAC\u0C97\u0CC6\u0020 %s',

    // variables:
    'Make a variable':
        '\u0CAA\u0CB0\u0CBF\u0CB5\u0CB0\u0CCD\u0CA4\u0CA8\u0CC6\u0020\u0CAE\u0CBE\u0CA1\u0CC1',
    'Variable name':
        '\u0CAA\u0CB0\u0CBF\u0CB5\u0CB0\u0CCD\u0CA4\u0CA8\u0CC6\u0CAF\u0020\u0CB9\u0CC6\u0CB8\u0CB0\u0CC1',
    'Script variable name':
        '\u0C86\u0C9C\u0CCD\u0C9E\u0CCD\u0CB9\u0CC6\u0020\u0CAA\u0CB0\u0CBF\u0CB5\u0CB0\u0CCD\u0CA4\u0CA8\u0CC6\u0CAF\u0020\u0CB9\u0CC6\u0CB8\u0CB0\u0CC1',
    'Delete a variable':
        '\u0CAA\u0CB0\u0CBF\u0CB5\u0CB0\u0CCD\u0CA4\u0CA8\u0CC6\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0C85\u0CB3\u0CBF\u0CB8\u0CC1',

    'set %var to %s':
        '\u0C97\u0CC6\u0020\u0C95\u0CC2\u0CA1\u0CBF\u0CB8\u0CC1 %var \u0C85\u0CA8\u0CCD\u0CA8\u0CC1 %s',
    'change %var by %n':
        '\u0CAC\u0CA6\u0CB2\u0CBE\u0CB9\u0CBF\u0CB8\u0CC1 %var \u0CB0\u0CB7\u0CCD\u0C9F\u0CC1 %n',
    'show variable %var':
        '\u0CAA\u0CB0\u0CBF\u0CB5\u0CB0\u0CCD\u0CA4\u0CA8\u0CC6\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CA4\u0CCB\u0CB0\u0CBF\u0CB8\u0CC1 %var',
    'hide variable %var':
        '\u0CAA\u0CB0\u0CBF\u0CB5\u0CB0\u0CCD\u0CA4\u0CA8\u0CC6\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CAC\u0C9A\u0CCD\u0C9A\u0CBF\u0CA1\u0CC1 %var',
    'script variables %scriptVars':
        '\u0C86\u0C9C\u0CCD\u0C9E\u0CCD\u0CB9\u0CC6\u0C97\u0CB3\u0020\u0CAA\u0CB0\u0CBF\u0CB5\u0CB0\u0CCD\u0CA4\u0C95\u0C97\u0CB3\u0CC1 %scriptVars',

    // lists:
    'list %exp':
        '\u0CAA\u0C9F\u0CCD\u0C9F\u0CBF %exp',
    '%s in front of %l':
        '%s \u0CAE\u0CC1\u0C82\u0CA6\u0CC6 %l',
    'item %idx of %l':
        '\u0C85\u0C82\u0CB6 %idx \u0CB0 %l',
    'all but first of %l':
        '\u0C8E\u0CB2\u0CCD\u0CB2\u0CBE\u0020\u0C86\u0CA6\u0CB0\u0CC6\u0020\u0CAE\u0CCA\u0CA6\u0CB2\u0CA8\u0CC6\u0CAF\u0CA6\u0CC1 %l',
    'length of %l':
        '\u0CA8\u0020\u0C89\u0CA6\u0CCD\u0CA6 %l',
    '%l contains %s':
        '%l \u0CB9\u0CCA\u0C82\u0CA6\u0CBF\u0CA6\u0CC6 %s',
    'thing':
        '\u0C85\u0C82\u0CB6',
    'add %s to %l':
        '\u0C95\u0CC2\u0CA1\u0CBF\u0CB8\u0CC1 %s \u0C97\u0CC6 %l',
    'delete %ida of %l':
        '\u0C85\u0CB3\u0CBF\u0CB8\u0CC1 %ida \u0CA8 %l',
    'insert %s at %idx of %l':
        '\u0C95\u0CC2\u0CA1\u0CBF\u0CB8\u0CC1 %s \u0CB0\u0CB2\u0CCD\u0CB2\u0CBF %idx \u0CA8 %l',
    'replace item %idx of %l with %s':
        '\u0C85\u0C82\u0CB6\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CAC\u0CA6\u0CB2\u0CBE\u0CB9\u0CBF\u0CB8\u0CC1 %idx \u0CB0 %l \u0C9C\u0CCA\u0CA4\u0CC6 %s',

    // other
    'Make a block':
        '\u0CB9\u0CCA\u0CB8\u0CA6\u0CBE\u0CA6\u0020\u0CB5\u0CBF\u0CAD\u0CBE\u0C97',

    // menus
    // snap menu
    'About...':
        '\u0CB8\u0CC1\u0CA4\u0CCD\u0CA4\u0CAE\u0CC1\u0CA4\u0CCD\u0CA4\u0020!...',
    'Reference manual':
        '\u0C89\u0CB2\u0CCD\u0CB2\u0CC7\u0C96\u0020\u0C95\u0CC8\u0CAA\u0CBF\u0CA1\u0CBF',
    'Snap! website':
        'Snap! \u0C9C\u0CBE\u0CB2\u0CA4\u0CBE\u0CA3',
    'Download source':
        '\u0C86\u0CA7\u0CBE\u0CB0\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0C87\u0CB3\u0CBF\u0CB8\u0CC1',
    'Switch back to user mode':
        '\u0CAC\u0CB3\u0C95\u0CC6\u0CA6\u0CBE\u0CB0\u0CB0\u0020\u0CA6\u0CBF\u0CB6\u0CC6\u0C97\u0CC6\u0020\u0CAE\u0CB0\u0CC1\u0C95\u0CB0\u0CB3\u0CBF\u0CB8\u0CBF',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'verl\u00e4sst Morphic',
    'Switch to dev mode':
        '\u0CAC\u0CC6\u0CB3\u0CB5\u0CA3\u0CBF\u0C97\u0CC6\u0CAF\u0020\u0CA6\u0CBF\u0CB6\u0CC6\u0C97\u0CC6\u0020\u0CAE\u0CB0\u0CC1\u0C95\u0CB0\u0CB3\u0CBF\u0CB8\u0CBF',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'erm\u00f6glicht Morphic Funktionen',

    // project menu
    'Project notes...':
        '\u0CAA\u0CCD\u0CB0\u0CBE\u0CAF\u0CCB\u0C9C\u0CA8\u0CC6\u0020\u0C9F\u0CBF\u0CAA\u0CCD\u0CAA\u0CA3\u0CBF\u0C97\u0CB3\u0CC1...',
    'New':
        '\u0CB9\u0CCA\u0CB8',
    'Open...':
        '\u0CA4\u0CC6\u0CB0\u0CC6...',
    'Save':
        '\u0C89\u0CB3\u0CBF\u0CB8\u0CC1',
    'Save As...':
        '\u0C8E\u0C82\u0CA6\u0CC1\u0020\u0C89\u0CB3\u0CBF\u0CB8\u0CC1...',
    'Import...':
        '\u0C86\u0CAE\u0CA6\u0CC1...',
    'file menu import hint':
        '\u0C95\u0CA1\u0CA4\u0CA6\u0020\u0CAA\u0CB0\u0CBF\u0CB5\u0CBF\u0CA1\u0CBF\u0020\u0CB8\u0CC2\u0C9A\u0CA8\u0CC6\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0C86\u0CAE\u0CA6\u0CC1\u0020\u0CAE\u0CBE\u0CA1\u0CBF\u0C95\u0CCA\u0CB3\u0CCD\u0CB3\u0CBF'
           ,
    'Export project as plain text...':
        '\u0CAA\u0CCD\u0CB0\u0CBE\u0CAF\u0CCB\u0C9C\u0CA8\u0CC6\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CB8\u0CCD\u0CAA\u0CB7\u0CCD\u0C9F\u0020\u0C85\u0C95\u0CCD\u0CB7\u0CB0\u0CA6\u0C82\u0CA4\u0CC6\u0020\u0CB0\u0CAA\u0CCD\u0CA4\u0CC1\u0020\u0CAE\u0CBE\u0CA1\u0CBF\u0CB0\u0CBF...',
    'Export project...':
        '\u0CAA\u0CCD\u0CB0\u0CBE\u0CAF\u0CCB\u0C9C\u0CA8\u0CC6\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CB0\u0CAA\u0CCD\u0CA4\u0CC1\u0020\u0CAE\u0CBE\u0CA1\u0CBF\u0CB0\u0CBF...',
    'show project data as XML\nin a new browser window':
        '\u0CB9\u0CCA\u0CB8\u0020\u0CB5\u0CC0\u0C95\u0CCD\u0CB7\u0C95\u0020\u0CA4\u0C82\u0CA4\u0CCD\u0CB0\u0CBE\u0C82\u0CB6\u0CA6\u0CB2\u0CCD\u0CB2\u0CBF\u005C\u006E\u0020\u0CAA\u0CCD\u0CB0\u0CBE\u0CAF\u0CCB\u0C9C\u0CA8\u0CC6\u0CAF\u0020\u0CA6\u0CA4\u0CCD\u0CA4\u0CBE\u0C82\u0CB6\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0058\u004D\u004C\u0020\u0CA8\u0C82\u0CA4\u0CC6\u0020\u0CA4\u0CCB\u0CB0\u0CBF\u0CB8\u0CBF\u0CB0\u0CBF\u0020',
    'Export blocks...':
        '\u0CB5\u0CBF\u0CAD\u0CBE\u0C97\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CB0\u0CAA\u0CCD\u0CA4\u0CC1\u0020\u0CAE\u0CBE\u0CA1\u0CBF\u0CB0\u0CBF...',
    'show global custom block definitions as XML\nin a new browser window':
        '\u0CB9\u0CCA\u0CB8\u0020\u0CB5\u0CC0\u0C95\u0CCD\u0CB7\u0C95\u0020\u0CA4\u0C82\u0CA4\u0CCD\u0CB0\u0CBE\u0C82\u0CB6\u0CA6\u0CB2\u0CCD\u0CB2\u0CBF\u005C\u006E\u0020\u0C9C\u0CBE\u0C97\u0CA4\u0CBF\u0C95\u0CB5\u0CBE\u0CA6\u0020\u0C97\u0CCD\u0CB0\u0CBE\u0CB9\u0C95\u0CC0\u0C95\u0CC3\u0CA4\u0020\u0CB5\u0CBF\u0CAD\u0CBE\u0C97\u0C97\u0CB3\u0020\u0CB5\u0CCD\u0CAF\u0CBE\u0C96\u0CCD\u0CAF\u0CC6\u0C97\u0CB3\u0CA8\u0CCD\u0CA8\u0CC2\u0020\u0CA4\u0CCB\u0CB0\u0CBF\u0CB8\u0CBF\u0CB0\u0CBF\u0020',
    'Import tools':
        '\u0C89\u0CAA\u0C95\u0CB0\u0CA3\u0C97\u0CB3\u0CA8\u0CCD\u0CA8\u0CC2\u0020\u0C86\u0CAE\u0CA6\u0CC1\u0020\u0CAE\u0CBE\u0CA1\u0CBF\u0C95\u0CCA\u0CB3\u0CCD\u0CB3\u0CBF\u0CB0\u0CBF',
    'load the official library of\npowerful blocks':
        '\u0CB6\u0C95\u0CCD\u0CA4\u0CBF\u0CAF\u0CC1\u0CA4\u0CB5\u0CBE\u0CA6\u0020\u0CB5\u0CBF\u0CAD\u0CBE\u0C97\u0C97\u0CB3\u005C\u006E\u0020\u0C85\u0CA7\u0CBF\u0C95\u0CC3\u0CA4\u0020\u0CAD\u0C82\u0CA1\u0CBE\u0CB0\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CA4\u0CC1\u0C82\u0CAC\u0CBF\u0CB8\u0CBF\u0CB0\u0CBF',
    'Libraries...':
        '\u0CAD\u0C82\u0CA1\u0CBE\u0CB0...',
    'Import library':
        '\u0CAD\u0C82\u0CA1\u0CBE\u0CB0\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0C86\u0CAE\u0CA6\u0CC1\u0020\u0CAE\u0CBE\u0CA1\u0CBF\u0C95\u0CCA\u0CB3\u0CCD\u0CB3\u0CBF',

    // cloud menu
    'Login...':
        '\u0CAA\u0CCD\u0CB0\u0CB5\u0CC7\u0CB6\u0CBF\u0CB8\u0CC1...',
    'Signup...':
        '\u0CB0\u0CC1\u0C9C\u0CC1\u0020\u0CAE\u0CBE\u0CA1\u0CC1...',

    // settings menu
    'Language...':
        '\u0CAD\u0CBE\u0CB7\u0CC6...',
    'Zoom blocks...':
        '\u0CB5\u0CBF\u0CAD\u0CBE\u0C97\u0C97\u0CB3\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CB9\u0CBF\u0C97\u0CCD\u0C97\u0CBF\u0CB8\u0CC1...',
    'Stage size...':
        '\u0CB5\u0CC7\u0CA6\u0CBF\u0C95\u0CC6\u0CAF\u0020\u0C97\u0CBE\u0CA4\u0CCD\u0CB0...',
    'Stage size':
        '\u0CB5\u0CC7\u0CA6\u0CBF\u0C95\u0CC6\u0CAF\u0020\u0C97\u0CBE\u0CA4\u0CCD\u0CB0',
    'Stage width':
        '\u0CB5\u0CC7\u0CA6\u0CBF\u0C95\u0CC6\u0CAF\u0020\u0C85\u0C97\u0CB2\u0020',
    'Stage height':
        '\u0CB5\u0CC7\u0CA6\u0CBF\u0C95\u0CC6\u0CAF\u0020\u0C89\u0CA6\u0CCD\u0CA6',
    'Default':
        '\u0C97\u0CC8\u0CB0\u0CC1\u0CB9\u0CBE\u0C9C\u0CB0\u0CBF',
    'Blurred shadows':
        '\u0C85\u0CB8\u0CCD\u0CAA\u0CB7\u0CCD\u0C9F\u0020\u0CA8\u0CC6\u0CB0\u0CB3\u0CC1',
    'uncheck to use solid drop\nshadows and highlights':
        '\u0CA6\u0CC3\u0CA2\u0020\u0C87\u0CB3\u0CBF\u0CA4\u0020\u0C89\u0CAA\u0CAF\u0CCB\u0C97\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CA8\u0CBF\u0CB7\u0CCD\u0C95\u0CCD\u0CB0\u0CBF\u0CAF\u0CC6\u0C97\u0CCA\u0CB3\u0CBF\u0CB8\u0CBF\n\u0CA8\u0CC6\u0CB0\u0CB3\u0CC1\u0020\u0CAE\u0CA4\u0CCD\u0CA4\u0CC1\u0020\u0CB8\u0CC1\u0CAA\u0CCD\u0CB0\u0C95\u0CBE\u0CB6\u0C95',
    'check to use blurred drop\nshadows and highlights':
        'einschalten f\u00fcr harte Schatten\nund Beleuchtung',
    'Zebra coloring':
        '\u0CAA\u0C9F\u0CCD\u0C9F\u0CC6\u0C95\u0CC1\u0CA6\u0CC1\u0CB0\u0CC6\u0020\u0CAC\u0CA3\u0CCD\u0CA3\u0020\u0CB9\u0C9A\u0CCD\u0C9A\u0CC1\u0CB5\u0CBF\u0C95\u0CC6',
    'check to enable alternating\ncolors for nested blocks':
        'einschalten \u00fcr abwechselnde Farbnuancen\nin Bl\u00f6cken',
    'uncheck to disable alternating\ncolors for nested block':
        'ausschalten verhindert abwechselnde\nFarbnuancen in Bl\u00f6cken',
    'Dynamic input labels':
        'Eingabenbeschriftung',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'ausschalten verhindert Beschriftung\nvon Mehrfacheingaben',
    'check to enable dynamic\nlabels for variadic inputs':
        'einschalten um Mehrfacheingabefelder\nautomatisch zu beschriften',
    'Prefer empty slot drops':
        'Leere Platzhalter bevorzugen',
    'settings menu prefer empty slots hint':
        'einschalten um leere Platzhalter\nbeim Platzieren von Bl\u00f6cken'
            + 'zu bevorzugen',
    'uncheck to allow dropped\nreporters to kick out others':
        'ausschalten um das "Rauskicken"\nvon platzierten Bl\u00f6cken\n'
            + 'zu erm\u00f6glichen',
    'Long form input dialog':
        'Ausf\u00fchrlicher Input-Dialog',
    'Plain prototype labels':
        'Einfache Prototyp-Beschriftung',
    'uncheck to always show (+) symbols\nin block prototype labels':
        'ausschalten, um (+) Zeichen\nim Blockeditor zu verbergen',
    'check to hide (+) symbols\nin block prototype labels':
        'einschalten, um (+) Zeichen\nim Blockeditor immer anzuzeigen',
    'check to always show slot\ntypes in the input dialog':
        'einschalten, um immer die Datentypen\nim Input-Dialog zu sehen',
    'uncheck to use the input\ndialog in short form':
        'ausschalten f\u00fcr kurzen\nInput-Dialog',
    'Virtual keyboard':
        'Virtuelle Tastatur',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'ausschalten um die virtuelle\nTastatur auf mobilen Ger\u00e4ten\n'
            + 'zu sperren',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'einschalten um die virtuelle\nTastatur auf mobilen Ger\u00e4ten\n'
            + 'zu erm\u00f6glichen',
    'Input sliders':
        'Eingabeschieber',
    'uncheck to disable\ninput sliders for\nentry fields':
        'ausschalten um Schieber\nin Eingabefeldern zu verhindern',
    'check to enable\ninput sliders for\nentry fields':
        'einschalten um Schieber\nin Eingabefeldern zu aktivieren',
    'Clicking sound':
        'Akustisches Klicken',
    'uncheck to turn\nblock clicking\nsound off':
        'ausschalten um akustisches\nKlicken zu deaktivieren',
    'check to turn\nblock clicking\nsound on':
        'einschalten um akustisches\nKlicken zu aktivieren',
    'Animations':
        'Animationen',
    'uncheck to disable\nIDE animations':
        'ausschalten um IDE-\nAnimationen zu verhindern',
    'Turbo mode':
        'Turbomodus',
    'check to prioritize\nscript execution':
        'einschalten, um Skripte\nzu priorisieren',
    'uncheck to run scripts\nat normal speed':
        'ausschalten, um Skripte\nnormal auszuf\u00fchren',
    'check to enable\nIDE animations':
        'einschalten um IDE-\nAnimationen zu erlauben',
    'Thread safe scripts':
        'Threadsicherheit',
    'uncheck to allow\nscript reentrance':
        'verhindert, dass unvollendete\nSkripte erneut gestartet werden',
    'check to disallow\nscript reentrance':
        'verhindert, dass unvollendete\nSkripte erneut gestartet werden',
    'Prefer smooth animations':
        'Fixe Framerate',
    'uncheck for greater speed\nat variable frame rates':
        'ausschalten, um Animationen \ndynamischer auszuf\u00fchren',
    'check for smooth, predictable\nanimations across computers':
        'einschalten, damit Animationen\n\u00fcberall gleich laufen',
    'Flat line ends':
        'Flache Pinselstriche',
    'check for flat ends of lines':
        'einschalten f\u00fcr flache\nPinselstrichenden',
    'uncheck for round ends of lines':
        'auschalten f\u00fcr runde\nPinselstrichenden',

    // inputs
    'with inputs':
        '\u0C8A\u0CA1\u0CBF\u0C95\u0CC6\u0CAF\u0020\u0C9C\u0CCA\u0CA4\u0CC6',
    'input names:':
        '\u0C8A\u0CA1\u0CBF\u0C95\u0CC6\u0CAF\u0020\u0CB9\u0CC6\u0CB8\u0CB0\u0CC1\u0C97\u0CB3\u0CC1:',
    'Input Names:':
        '\u0C8A\u0CA1\u0CBF\u0C95\u0CC6\u0CAF\u0020\u0CB9\u0CC6\u0CB8\u0CB0\u0CC1\u0C97\u0CB3\u0CC1:',
    'input list:':
        '\u0C8A\u0CA1\u0CBF\u0C95\u0CC6\u0CAF\u0020\u0CAA\u0C9F\u0CCD\u0C9F\u0CBF:',

    // context menus:
    'help':
        '\u0CB8\u0CB9\u0CBE\u0CAF',

    // palette:
    'hide primitives':
        'Basisbl\u00f6cke ausblenden',
    'show primitives':
        '\u0CAE\u0CC2\u0CB2\u0C97\u0CB3\u0CA8\u0CCD\u0CA8\u0CC2\u0020\u0CAC\u0C9A\u0CCD\u0C9A\u0CBF\u0CA1\u0CBF',

    // blocks:
    'help...':
        '\u0CB8\u0CB9\u0CBE\u0CAF...',
    'relabel...':
        '\u0CAE\u0CA4\u0CCD\u0CA4\u0CC6\u0020\u0CAC\u0CB0\u0CC6...',
    'duplicate':
        '\u0CA8\u0C95\u0CB2\u0CC1',
    'make a copy\nand pick it up':
        '\u0CA8\u0C95\u0CB2\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CAE\u0CBE\u0CA1\u0CBF\u0020\u005C\u006E\u0CAE\u0CA4\u0CCD\u0CA4\u0CC1\u0020\u0CA4\u0CC6\u0C97\u0CC6\u0CA6\u0CC1\u0C95\u0CCA\u0CB3\u0CCD\u0CB3\u0CBF',
    'only duplicate this block':
        '\u0C88\u0020\u0CB5\u0CBF\u0CAD\u0CBE\u0C97\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CAE\u0CBE\u0CA4\u0CCD\u0CB0\u0020\u0CA8\u0C95\u0CB2\u0CC1\u0020\u0CAE\u0CBE\u0CA1\u0CBF',
    'delete':
        '\u0C85\u0CB3\u0CBF\u0CB8\u0CC1',
    'script pic...':
        '\u0C86\u0C97\u0CCD\u0CA8\u0CCD\u0CB9\u0CC6\u0CAF\u0020\u0C9A\u0CBF\u0CA4\u0CCD\u0CB0...',
    'open a new window\nwith a picture of this script':
        '\u0C88\u0020\u0C86\u0C9C\u0CCD\u0C9E\u0CCD\u0CB9\u0CC6\u0CAF\u0020\u0C9A\u0CBF\u0CA4\u0CCD\u0CB0\u0CA6\u0020\u0C9C\u0CCA\u0CA4\u0CC6\u0020\u005C\u006E\u0CB9\u0CCA\u0CB8\u0020\u0C95\u0CBF\u0C9F\u0C95\u0CBF\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CA4\u0CC6\u0CB0\u0CC6',
    'ringify':
        'Umringen',
    'unringify':
        'Entringen',

    // custom blocks:
    'delete block definition...':
        '\u0CB5\u0CBF\u0CAD\u0CBE\u0C97\u0CA6\u0020\u0CB5\u0CCD\u0CAF\u0CBE\u0C96\u0CCD\u0CAF\u0CC6\u0C97\u0CB3\u0CA8\u0CCD\u0CA8\u0CC2\u0020\u0C85\u0CB3\u0CBF\u0CB8\u0CBF',
    'edit...':
        '\u0C9A\u0CBF\u0CA4\u0CCD\u0CB0\u0020\u0CB8\u0C82\u0C95\u0CB2\u0CA8...',

    // sprites:
    'edit':
        '\u0C9A\u0CBF\u0CA4\u0CCD\u0CB0\u0020\u0CB8\u0C82\u0C95\u0CB2\u0CA8',
    'move':
        '\u0C9A\u0CB2\u0CBF\u0CB8\u0CC1',
    'detach from':
        '\u0C87\u0CA6\u0CB0\u0CBF\u0C82\u0CA6\u0020\u0C85\u0C97\u0CC1\u0CB2\u0CBF\u0CB8\u0CC1',
    'detach all parts':
        '\u0C8E\u0CB2\u0CCD\u0CB2\u0CBE\u0020\u0CAD\u0CBE\u0C97\u0C97\u0CB3\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0C85\u0C97\u0CC1\u0CB2\u0CBF\u0CB8\u0CC1\u0020',
    'export...':
        '\u0CB0\u0CAB\u0CCD\u0CA4\u0CC1\u0CAE\u0CBE\u0CA1\u0CC1...',

    // stage:
    'show all':
        '\u0C8E\u0CB2\u0CCD\u0CB2\u0CBE\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CA4\u0CCB\u0CB0\u0CBF\u0CB8\u0CC1',
    'pic...':
        '\u0C9A\u0CBF\u0CA4\u0CCD\u0CB0...',
    'open a new window\nwith a picture of the stage':
        '\u0C88\u0020\u0CB5\u0CC7\u0CA6\u0CBF\u0C95\u0CC6\u0CAF\u0020\u0C9A\u0CBF\u0CA4\u0CCD\u0CB0\u0CA6\u0020\u0C9C\u0CCA\u0CA4\u0CC6\u005C\u006E\u0020\u0CB9\u0CCA\u0CB8\u0020\u0C95\u0CBF\u0C9F\u0C95\u0CBF\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CA4\u0CC6\u0CB0\u0CC6',

    // scripting area
    'clean up':
        '\u0C8E\u0CB2\u0CCD\u0CB2\u0CBE\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0C85\u0CB3\u0CBF\u0CB8\u0CC1\u0020',
    'arrange scripts\nvertically':
        '\u0CB2\u0C82\u0CAC\u0CB5\u0CBE\u0C97\u0CBF\u0020\u0C86\u0C9C\u0CCD\u0C9E\u0CCD\u0CB9\u0CC6\u0C97\u0CB3\u0CA8\u0CCD\u0CA8\u0CC2\u005C\u006E\u0020\u0020\u0CB9\u0CCA\u0C82\u0CA6\u0CBF\u0CB8\u0CBF\u0CB0\u0CBF\u0020',
    'add comment':
        '\u0C9F\u0CC0\u0C95\u0CC6\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0C95\u0CC2\u0CA1\u0CBF\u0CB8\u0CBF\u0020',
    'undrop':
        '\u0C85\u0CB5\u0CA8\u0CA4\u0CBF\u0020\u0CAE\u0CBE\u0CA1\u0CA6\u0020',
    'undo the last\nblock drop\nin this pane':
        '\u0C88\u0020\u0CAB\u0CB2\u0C95\u0CA6\u0CB2\u0CCD\u0CB2\u0CBF\u005C\u006E\u0020\u0C95\u0CCA\u0CA8\u0CC6\u0CAF\u0020\u0CB5\u0CBF\u0CAD\u0CBE\u0C97\u0CA6\u005C\u006E\u0020\u0C85\u0CB5\u0CA8\u0CA4\u0CBF\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CB0\u0CA6\u0CCD\u0CA6\u0CC1\u0020\u0CAE\u0CBE\u0CA1\u0CC1',
    'scripts pic...':
        '\u0C86\u0C9C\u0CCD\u0C9E\u0CCD\u0CB9\u0CC6\u0CAF\u0020\u0C9A\u0CBF\u0CA4\u0CCD\u0CB0\u0020...',
    'open a new window\nwith a picture of all scripts':
        '\u0C8E\u0CB2\u0CCD\u0CB2\u0CBE\u0020\u0C86\u0C9C\u0CCD\u0C9E\u0CCD\u0CB9\u0CC6\u0C97\u0CB3\u0020\u0C9A\u0CBF\u0CA4\u0CCD\u0CB0\u0CA6\u0020\u0C9C\u0CCA\u0CA4\u0CC6\u005C\u006E\u0020\u0CB9\u0CCA\u0CB8\u0020\u0C95\u0CBF\u0C9F\u0C95\u0CBF\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CA4\u0CC6\u0CB0\u0CC6\u0020',
    'make a block...':
        '\u0CB9\u0CCA\u0CB8\u0020\u0CB5\u0CBF\u0CAD\u0CBE\u0C97\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CAE\u0CBE\u0CA1\u0CBF\u0020...',

    // costumes
    'rename':
        '\u0CAA\u0CC1\u0CA8\u0CB0\u0CCD\u0CA8\u0CBE\u0CAE\u0C95\u0CB0\u0CA3',
    'export':
        '\u0CB0\u0CAA\u0CCD\u0CA4\u0CC1\u0020\u0CAE\u0CBE\u0CA1\u0CC1\u0020',
    'rename costume':
        '\u0C89\u0CA1\u0CC1\u0CAA\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CAA\u0CC1\u0CA8\u0CB0\u0CCD\u0CA8\u0CBE\u0CAE\u0C95\u0CB0\u0CA3\u0020\u0CAE\u0CBE\u0CA1\u0CC1\u0020',

    // sounds
    'Play sound':
        '\u0CB6\u0CAC\u0CCD\u0CA6\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0C95\u0CC7\u0CB3\u0CBF\u0CB8\u0CC1\u0020',
    'Stop sound':
        '\u0CB6\u0CAC\u0CCD\u0CA6\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CA8\u0CBF\u0CB2\u0CCD\u0CB2\u0CBF\u0CB8\u0CC1\u0020',
    'Stop':
        '\u0CA8\u0CBF\u0CB2\u0CCD\u0CB2\u0CBF\u0CB8\u0CC1\u0020',
    'Play':
        '\u0C95\u0CC7\u0CB3\u0CBF\u0CB8\u0CC1\u0020',
    'rename sound':
        '\u0CB6\u0CAC\u0CCD\u0CA6\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CAA\u0CC1\u0CA8\u0CB0\u0CCD\u0CA8\u0CBE\u0CAE\u0C95\u0CB0\u0CA3\u0020\u0CAE\u0CBE\u0CA1\u0CC1\u0020',

    // dialogs
    // buttons
    'OK':
        '\u0CB8\u0CB0\u0CBF',
    'Ok':
        '\u0CB8\u0CB0\u0CBF',
    'Cancel':
        '\u0CB0\u0CA6\u0CCD\u0CA6\u0CC1\u0CAE\u0CBE\u0CA1\u0CC1',
    'Yes':
        '\u0CB9\u0CCC\u0CA6\u0CC1',
    'No':
        '\u0C87\u0CB2\u0CCD\u0CB2',

    // help
    'Help':
        '\u0CB8\u0CB9\u0CBE\u0CAF',

    // zoom blocks
    'Zoom blocks':
        '\u0CB5\u0CBF\u0CAD\u0CBE\u0C97\u0C97\u0CB3\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CB9\u0CBF\u0C97\u0CCD\u0C97\u0CBF\u0CB8\u0CC1',
    'build':
        '\u0CA8\u0CBF\u0CB0\u0CCD\u0CAE\u0CBF\u0CB8\u0CC1',
    'your own':
        '\u0CA8\u0CBF\u0CAE\u0CCD\u0CAE\u0020\u0CB8\u0CCD\u0CB5\u0C82\u0CA4\u0CBF\u0C95\u0CC6',
    'blocks':
        '\u0CB5\u0CBF\u0CAD\u0CBE\u0C97\u0C97\u0CB3\u0CC1',
    'normal (1x)':
        '\u0CB8\u0CBE\u0CAE\u0CBE\u0CA8\u0CCD\u0CAF (1x)',
    'demo (1.2x)':
        '\u0CAA\u0CCD\u0CB0\u0CBE\u0CA4\u0CCD\u0CAF\u0C95\u0CCD\u0CB7\u0CBF\u0C95\u0CC6 (1.2x)',
    'presentation (1.4x)':
        '\u0CAA\u0CCD\u0CB0\u0CA6\u0CB0\u0CCD\u0CB6\u0CA8 (1.4x)',
    'big (2x)':
        '\u0CA6\u0CCA\u0CA1\u0CCD\u0CA1\u0CA6\u0CC1 (2x)',
    'huge (4x)':
        '\u0C85\u0CA7\u0CBF\u0C95 (4x)',
    'giant (8x)':
        '\u0020\u0CA6\u0CC8\u0CA4\u0CCD\u0CAF (8x)',
    'monstrous (10x)':
        '\u0C98\u0CCB\u0CB0\u0CBE\u0C95\u0CBE\u0CB0\u0CA6 (10x)',

    // Project Manager
    'Untitled':
        '\u0CB9\u0CC6\u0CB8\u0CB0\u0CBF\u0CA1\u0CA6\u0020',
    'Open Project':
        '\u0CAA\u0CCD\u0CB0\u0CBE\u0CAF\u0CCB\u0C9C\u0CA8\u0CC6\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CA4\u0CC6\u0CB0\u0CC6\u0020',
    '(empty)':
        '(\u0C96\u0CBE\u0CB2\u0CBF)',
    'Saved!':
        '\u0C89\u0CB3\u0CBF\u0CB8\u0CB2\u0CBE\u0C97\u0CBF\u0CA6\u0CC6!',
    'Delete Project':
        '\u0CAA\u0CCD\u0CB0\u0CBE\u0CAF\u0CCB\u0C9C\u0CA8\u0CC6\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0C85\u0CB3\u0CBF\u0CB8\u0CC1',
    'Are you sure you want to delete':
        '\u0CA8\u0CC0\u0CB5\u0CC1\u0020\u0C85\u0CB3\u0CBF\u0CB8\u0CB2\u0CC1\u0020\u0CB8\u0CBF\u0CA6\u0CCD\u0CA7\u0CB5\u0CBE\u0C97\u0CBF\u0CA6\u0CCD\u0CA6\u0CBF\u0CB0\u0CBE?',
    'rename...':
        '\u0CAA\u0CC1\u0CA8\u0CB0\u0CCD\u0CA8\u0CBE\u0CAE\u0C95\u0CB0\u0CA3...',

    // costume editor
    'Costume Editor':
        '\u0C89\u0CA1\u0CC1\u0CAA\u0CBF\u0CA8\u0020\u0CB8\u0C82\u0CAA\u0CBE\u0CA6\u0C95',
    'click or drag crosshairs to move the rotation center':
        'Fadenkreuz anklicken oder bewegen um den Drehpunkt zu setzen',

    // project notes
    'Project Notes':
        '\u0CAA\u0CCD\u0CB0\u0CBE\u0CAF\u0CCB\u0C9C\u0CA8\u0CC6\u0CAF\u0020\u0C9F\u0CBF\u0CAA\u0CCD\u0CAA\u0CA3\u0CBF\u0C97\u0CB3\u0CC1',

    // new project
    'New Project':
        '\u0CB9\u0CCA\u0CB8\u0020\u0CAA\u0CCD\u0CB0\u0CBE\u0CAF\u0CCB\u0C9C\u0CA8\u0CC6',
    'Replace the current project with a new one?':
        '\u0CB9\u0CC0\u0C97\u0CBF\u0CA8\u0020\u0CAA\u0CCD\u0CB0\u0CBE\u0CAF\u0CCB\u0C9C\u0CA8\u0CC6\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CB9\u0CCA\u0CB8\u0CA6\u0CB0\u0020\u0C9C\u0CCA\u0CA4\u0CC6\u0020\u0CAC\u0CA6\u0CB2\u0CBE\u0CAF\u0CBF\u0CB8\u0CBF\u0020?',

    // save project
    'Save Project As...':
        '\u0020\u0CAA\u0CCD\u0CB0\u0CBE\u0CAF\u0CCB\u0C9C\u0CA8\u0CC6\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0C8E\u0C82\u0CA6\u0CC1\u0020\u0C89\u0CB3\u0CBF\u0CB8\u0CBF\u0020...',

    // export blocks
    'Export blocks':
        '\u0CB5\u0CBF\u0CAD\u0CBE\u0C97\u0C97\u0CB3\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CB0\u0CAA\u0CCD\u0CA4\u0CC1\u0020\u0CAE\u0CBE\u0CA1\u0CBF\u0CB0\u0CBF\u0020',
    'Import blocks':
        '\u0CB5\u0CBF\u0CAD\u0CBE\u0C97\u0C97\u0CB3\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0C86\u0CAE\u0CA6\u0CC1\u0020\u0CAE\u0CBE\u0CA1\u0CBF\u0CB0\u0CBF\u0020',
    'this project doesn\'t have any\ncustom global blocks yet':
        'in diesem Projekt gibt es noch keine\nglobalen Bl\u00f6cke',
    'select':
        '\u0C86\u0CAF\u0CCD\u0C95\u0CC6\u0020',
    'none':
        '\u0CAF\u0CBE\u0CB5\u0CC1\u0CA6\u0CC2\u0020\u0C87\u0CB2\u0CCD\u0CB2',

    // variable dialog
    'for all sprites':
        '\u0C8E\u0CB2\u0CCD\u0CB2\u0CBE\u0020\u0CAF\u0C95\u0CCD\u0CB7\u0CBF\u0CA3\u0CBF\u0C97\u0CB3\u0CBF\u0C97\u0CC6',
    'for this sprite only':
        '\u0C88\u0020\u0CAF\u0C95\u0CCD\u0CB7\u0CBF\u0CA3\u0CBF\u0C97\u0CC6\u0020\u0CAE\u0CBE\u0CA4\u0CCD\u0CB0\u0020',

    // block dialog
    'Change block':
        '\u0CB5\u0CBF\u0CAD\u0CBE\u0C97\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CAC\u0CA6\u0CB2\u0CBE\u0CAF\u0CBF\u0CB8\u0CBF\u0020',
    'Command':
        '\u0C86\u0CA6\u0CC7\u0CB6',
    'Reporter':
        '\u0CB5\u0CB0\u0CA6\u0CBF\u0C97\u0CBE\u0CB0',
    'Predicate':
        '\u0CB5\u0CBF\u0C9C\u0CCD\u0C9D\u0CCD\u0CA8\u0CCD\u0CAF\u0CBE\u0CAA\u0CBF\u0CB8\u0CC1',

    // block editor
    'Block Editor':
        '\u0CB5\u0CBF\u0CAD\u0CBE\u0C97\u0C97\u0CB3\u0020\u0CB8\u0C82\u0CAA\u0CBE\u0CA6\u0C95',
    'Apply':
        '\u0C85\u0CA8\u0CCD\u0CB5\u0CAF\u0CBF\u0CB8\u0CC1',

    // block deletion dialog
    'Delete Custom Block':
        '\u0CB8\u0CCD\u0CB5\u0CAF\u0C82\u0020\u0CA8\u0CBF\u0CB0\u0CCD\u0CAE\u0CBF\u0CA4\u0020\u0CB5\u0CBF\u0CAD\u0CBE\u0C97\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0C85\u0CB3\u0CBF\u0CB8\u0CBF',
    'block deletion dialog text':
        '\u0CB5\u0CBF\u0CAD\u0CBE\u0C97\u0020\u0C85\u0CB3\u0CBF\u0CB8\u0CAC\u0CC7\u0C95\u0CBE\u0CA6\u0020\u0CB8\u0C82\u0CAD\u0CBE\u0CB7\u0CA3\u0CBE\u0020\u0CAA\u0CA0\u0CCD\u0CAF',
           
    // input dialog
    'Create input name':
        '\u0C8A\u0CA1\u0CBF\u0C95\u0CC6\u0CAF\u0020\u0CB9\u0CC6\u0CB8\u0CB0\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CB0\u0C9A\u0CBF\u0CB8\u0CBF',
    'Edit input name':
        '\u0C8A\u0CA1\u0CBF\u0C95\u0CC6\u0CAF\u0020\u0CB9\u0CC6\u0CB8\u0CB0\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CB8\u0C82\u0CAA\u0CBE\u0CA6\u0CBF\u0CB8\u0CC1',
    'Edit label fragment':
        '\u0CA4\u0CB2\u0CC6\u0C9A\u0CC0\u0C9F\u0CBF\u0CAF\u0020\u0C9A\u0CC2\u0CB0\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CB8\u0C82\u0CAA\u0CBE\u0CA6\u0CBF\u0CB8\u0CC1',
    'Title text':
        '\u0CB6\u0CC0\u0CB0\u0CCD\u0CB7\u0CBF\u0C95\u0CC6\u0CAF\u0020\u0C85\u0C95\u0CCD\u0CB7\u0CB0\u0020',
    'Input name':
        '\u0C8A\u0CA1\u0CBF\u0C95\u0CC6\u0CAF\u0020\u0CB9\u0CC6\u0CB8\u0CB0\u0CC1',
    'Delete':
        '\u0C85\u0CB3\u0CBF\u0CB8\u0CC1',
    'Object':
        '\u0CB5\u0CB8\u0CCD\u0CA4\u0CC1',
    'Number':
        '\u0C85\u0C82\u0C95\u0CBF',
    'Text':
        '\u0CAA\u0CA0\u0CCD\u0CAF',
    'List':
        '\u0CAA\u0C9F\u0CCD\u0C9F\u0CBF',
    'Any type':
        '\u0CAF\u0CBE\u0CB5\u0CC1\u0CA6\u0CBE\u0CA6\u0CB0\u0CC1\u0020\u0CAE\u0CBE\u0CA6\u0CB0\u0CBF',
    'Boolean (T/F)':
        '\u0CAC\u0CC2\u0CB2\u0CBF\u0CAF\u0CA8\u0CCD (\u0CB8\u0CB0\u0CBF\u002F\u0CA4\u0CAA\u0CCD\u0CAA\u0CC1)',
    'Command\n(inline)':
        '\u0C86\u0CA6\u0CC7\u0CB6\n(\u0CAE\u0CA7\u0CCD\u0CAF\u0CB8\u0CCD\u0CA5\u0020)',
    'Command\n(C-shape)':
        '\u0C86\u0CA6\u0CC7\u0CB6\n(\u0CB8\u0CBF-\u0C86\u0C95\u0CC3\u0CA4\u0CBF)',
    'Any\n(unevaluated)':
        '\u0CAF\u0CBE\u0CB5\u0CC1\u0CA6\u0CBE\u0CA6\u0CB0\u0CC1\u0020\n(\u0CAE\u0CCC\u0CB2\u0CCD\u0CAF\u0CC0\u0C95\u0CB0\u0CBF\u0CB8\u0CA6)',
    'Boolean\n(unevaluated)':
        '\u0CAC\u0CC2\u0CB2\u0CBF\u0CAF\u0CA8\u0CCD\n(\u0CAE\u0CCC\u0CB2\u0CCD\u0CAF\u0CC0\u0C95\u0CB0\u0CBF\u0CB8\u0CA6)',
    'Single input.':
        '\u0C92\u0C82\u0CA6\u0CC7\u0020\u0C92\u0C82\u0CA6\u0CC1\u0020\u0C8A\u0CA1\u0CBF\u0C95\u0CC6\u0020.',
    'Default Value:':
        '\u0C97\u0CC8\u0CB0\u0CC1\u0CB9\u0CBE\u0C9C\u0CB0\u0CBF\u0020\u0CAE\u0CCC\u0CB2\u0CCD\u0CAF:',
    'Multiple inputs (value is list of inputs)':
        '\u0CAC\u0CB9\u0CC1\u0CB0\u0CC0\u0CA4\u0CBF\u0CAF\u0020\u0C8A\u0CA1\u0CBF\u0C95\u0CC6 (\u0CAE\u0CCC\u0CB2\u0CCD\u0CAF\u0CB5\u0CC1\u0020\u0C92\u0C82\u0CA6\u0C95\u0CBF\u0C82\u0CA4\u0020\u0CB9\u0CC6\u0C9A\u0CCD\u0C9A\u0CBE\u0C97\u0CBF\u0CA6\u0CC6)',
    'Upvar - make internal variable visible to caller':
        '\u0CB9\u0CCA\u0CB0\u0C97\u0CA1\u0CC6\u0020\u0CAA\u0CB0\u0CBF\u0CB5\u0CB0\u0CCD\u0CA4\u0C95\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0CB0\u0C9A\u0CBF\u0CB8\u0CC1\u0CB5\u0CC1\u0CA6\u0CB0\u0CBF\u0C82\u0CA6\u0020\u0CAC\u0CC7\u0C9F\u0CBF\u0C97\u0CBE\u0CB0\u0CB0\u0CBF\u0C97\u0CC6\u0020\u0C95\u0CBE\u0CA3\u0CAC\u0CB9\u0CC1\u0CA6\u0CC1\u0020',

    // About Snap
    'About Snap':
        '\u0CB8\u0CCD\u0CA8\u0CCD\u0CAF\u0CBE\u0CAA\u0CCD\u0020\u0020\u0CA8\u0020\u0CAC\u0C97\u0CCD\u0C97\u0CC6\u0020',
    'Back...':
        '\u0CB9\u0CBF\u0C82\u0CA6\u0CC6...',
    'License...':
        '\u0C85\u0CA8\u0CC1\u0CAE\u0CA4\u0CBF...',
    'Modules...':
        '\u0C85\u0CA7\u0CCD\u0CAF\u0CBE\u0CAF\u0C97\u0CB3\u0CC1...',
    'Credits...':
        '\u0CAA\u0CCD\u0CB0\u0CA4\u0CCD\u0CAF\u0CAF\u0C97\u0CB3\u0CC1...',
    'Translators...':
        '\u0CAD\u0CBE\u0CB7\u0CBE\u0C82\u0CA4\u0CB0\u0C95\u0CBE\u0CB0...',
    'License':
       '\u0C85\u0CA8\u0CC1\u0CAE\u0CA4\u0CBF',
    'current module versions:':
        '\u0CB9\u0CC0\u0C97\u0CBF\u0CA8\u0020\u0C85\u0CA7\u0CCD\u0CAF\u0CBE\u0CAF\u0CA6\u0020\u0C86\u0CB5\u0CC3\u0CA4\u0CCD\u0CA4\u0CBF',
    'Contributors':
        '\u0CB8\u0CB9\u0CBE\u0CAF\u0C95',
    'Translations':
        '\u0CAD\u0CBE\u0CB7\u0CBE\u0C82\u0CA4\u0CB0\u0C95\u0CBE\u0CB0',

    // variable watchers
    'normal':
        '\u0CB8\u0CBE\u0CAE\u0CBE\u0CA8\u0CCD\u0CAF',
    'large':
        '\u0CA6\u0CCA\u0CA1\u0CCD\u0CA1\u0CA6\u0CC1',
    'slider':
        '\u0C9C\u0CBE\u0CB0\u0CC1\u0020\u0CA8\u0CBF\u0CAF\u0C82\u0CA4\u0CCD\u0CB0\u0C95',
    'slider min...':
        '\u0C95\u0CA1\u0CBF\u0CAE\u0CC6\u0020\u0C9C\u0CBE\u0CB0\u0CC1\u0020\u0CA8\u0CBF\u0CAF\u0C82\u0CA4\u0CCD\u0CB0\u0C95...',
    'slider max...':
        '\u0C85\u0CA7\u0CBF\u0C95\u0020\u0C9C\u0CBE\u0CB0\u0CC1\u0020\u0CA8\u0CBF\u0CAF\u0C82\u0CA4\u0CCD\u0CB0\u0C95...',
    'import...':
        '\u0C86\u0CAE\u0CA6\u0CC1...',
    'Slider minimum value':
        '\u0C9C\u0CBE\u0CB0\u0CC1\u0020\u0CA8\u0CBF\u0CAF\u0C82\u0CA4\u0CCD\u0CB0\u0C95\u0CA6\u0020\u0C95\u0CA1\u0CBF\u0CAE\u0CC6\u0020\u0CAE\u0CCC\u0CB2\u0CCD\u0CAF',
    'Slider maximum value':
        '\u0C9C\u0CBE\u0CB0\u0CC1\u0020\u0CA8\u0CBF\u0CAF\u0C82\u0CA4\u0CCD\u0CB0\u0C95\u0CA6\u0020\u0C85\u0CA7\u0CBF\u0C95\u0020\u0CAE\u0CCC\u0CB2\u0CCD\u0CAF',

    // list watchers
    'length: ':
        '\u0C89\u0CA6\u0CCD\u0CA6: ',

    // coments
    'add comment here...':
        '\u0C9F\u0CC0\u0C95\u0CC6\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1\u0020\u0C87\u0CB2\u0CCD\u0CB2\u0CBF\u0020\u0C95\u0CC2\u0CA1\u0CBF\u0CB8\u0CBF\u0020',

    // drow downs
    // directions
    '(90) right':
        '(90) \u0CAC\u0CB2\u0020\u0CAD\u0CBE\u0C97\u0020',
    '(-90) left':
        '(-90) \u0C8E\u0CA1\u0020\u0CAD\u0CBE\u0C97',
    '(0) up':
        '(0) \u0CAE\u0CC7\u0CB2\u0CC6',
    '(180) down':
        '(180) \u0C95\u0CC6\u0CB3\u0C97\u0CA1\u0CC6',

    // collision detection
    'mouse-pointer':
        '\u0CB8\u0CC2\u0C9A\u0C95\u0CB8\u0CBE\u0CA7\u0CA8\u0020\u0CAE\u0CCC\u0CB8\u0CCD',
    'edge':
        '\u0C85\u0C82\u0C9A\u0CC1',
    'pen trails':
        '\u0CB2\u0CC7\u0C96\u0CA8\u0CBF\u0CAF\u0020\u0CAA\u0CB0\u0CC0\u0C95\u0CCD\u0CB7\u0CA3\u0CC6',

    // costumes
    'Turtle':
        '\u0C86\u0CAE\u0CC6',
    'Empty':
        '\u0C96\u0CBE\u0CB2\u0CBF',

    // graphical effects
    'brightness':
        '\u0CAA\u0CCD\u0CB0\u0C95\u0CBE\u0CB6\u0CAE\u0CBE\u0CA8',
    'ghost':
        '\u0CA6\u0CC6\u0CB5\u0CCD\u0CB5',
    'negative':
        '\u0CA8\u0C95\u0CBE\u0CB0\u0CBE\u0CA4\u0CCD\u0CAE\u0C95',
    'comic':
        '\u0CB9\u0CBE\u0CB8\u0CCD\u0CAF',
    'confetti':
        'Farbverschiebung',

    // keys
    'space':
        '\u0C9C\u0CBE\u0C97\u0020',
    'up arrow':
        '\u0CAE\u0CC7\u0CB2\u0CBF\u0CA8\u0CAC\u0CBE\u0CA3',
    'down arrow':
        '\u0C95\u0CC6\u0CB3\u0CAE\u0CC1\u0C96\u0020\u0CAC\u0CBE\u0CA3',
    'right arrow':
        '\u0CAC\u0CB2\u0020\u0CAC\u0CBE\u0CA3',
    'left arrow':
        '\u0C8E\u0CA1\u0020\u0CAC\u0CBE\u0CA3',
    'a':
        'a',
    'b':
        'b',
    'c':
        'c',
    'd':
        'd',
    'e':
        'e',
    'f':
        'f',
    'g':
        'g',
    'h':
        'h',
    'i':
        'i',
    'j':
        'j',
    'k':
        'k',
    'l':
        'l',
    'm':
        'm',
    'n':
        'n',
    'o':
        'o',
    'p':
        'p',
    'q':
        'q',
    'r':
        'r',
    's':
        's',
    't':
        't',
    'u':
        'u',
    'v':
        'v',
    'w':
        'w',
    'x':
        'x',
    'y':
        'y',
    'z':
        'z',
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
        '\u0CB9\u0CCA\u0CB8...',

    // math functions
    'abs':
        'Betrag',
    'floor':
        'Abgerundet',
    'sqrt':
        'Wurzel',
    'sin':
        'sin',
    'cos':
        'cos',
    'tan':
        'tan',
    'asin':
        'asin',
    'acos':
        'acos',
    'atan':
        'atan',
    'ln':
        'ln',
    'e^':
        'e^',

    // delimiters
    'letter':
        '\u0C85\u0C95\u0CCD\u0CB7\u0CB0',
    'whitespace':
        '\u0C96\u0CBE\u0CB2\u0CBF\u0C9C\u0CBE\u0C97',
    'line':
        '\u0CB8\u0CBE\u0CB2\u0CC1',
    'tab':
        '\u0020\u0C95\u0CC0\u0CB2\u0CBF',
    'cr':
        '\u0CB8\u0CBF\u0C85\u0CB0\u0CCD',

    // data types
    'number':
        '\u0C85\u0C82\u0C95\u0CBF:',
    'text':
        '\u0CAA\u0CA0\u0CCD\u0CAF',
    'Boolean':
        '\u0CAC\u0CC2\u0CB2\u0CBF\u0CAF\u0CA8\u0CCD',
    'list':
        '\u0CAA\u0C9F\u0CCD\u0C9F\u0CBF',
    'command':
        '\u0C86\u0CA6\u0CC7\u0CB6\u0020',
    'reporter':
        '\u0CB5\u0CB0\u0CA6\u0CBF\u0C97\u0CBE\u0CB0',
    'predicate':
        '\u0CB5\u0CBF\u0C9C\u0CCD\u0C9D\u0CCD\u0CA8\u0CCD\u0CAF\u0CBE\u0CAA\u0CBF\u0CB8\u0CC1',

    // list indices
    'last':
        '\u0C95\u0CCA\u0CA8\u0CC6',
    'any':
        '\u0CAF\u0CBE\u0CB5\u0CC1\u0CA6\u0CBE\u0CA6\u0CB0\u0CC1\u0020'
};
