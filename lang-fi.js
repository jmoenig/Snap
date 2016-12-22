/*

    lang-fi.js

    Finnish translation for SNAP!

    written by Jouni K. Seppänen

    Copyright (C) 2014 by Jens Mönig

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

SnapTranslator.dict.fi = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    Ä, ä   \u00c4, \u00e4
    Ö, ö   \u00d6, \u00f6
    →     \u2192
    \u200B zero-width space, useful to escape % at the beginning of words
*/

    // translations meta information
    'language_name':
        'suomi', // the name as it should appear in the language menu
    'language_translator':
        'Jouni K. Sepp\u00e4nen', // your name for the Translators tab
    'translator_e-mail':
        'jks@iki.fi', // optional
    'last_changed':
        '2014-04-18', // this, too, will appear in the Translators tab

    // GUI
    // control bar:
    'untitled':
        'nimet\u00f6n',
    'development mode':
        'kehitysmoodi',

    // categories:
    'Motion':
        'Liike',
    'Looks':
        'Ulkon\u00e4k\u00f6',
    'Sound':
        '\u00c4\u00e4ni',
    'Pen':
        'Kyn\u00e4',
    'Control':
        'Ohjaus',
    'Sensing':
        'Tuntoaisti',
    'Operators':
        'Laskenta',
    'Variables':
        'Muuttujat',
    'Lists':
        'Listat',
    'Other':
        'Muut',

    // editor:
    'draggable':
        'hiirell\u00e4 liikuteltava',

    // tabs:
    'Scripts':
        'Skriptit',
    'Costumes':
        'Asut',
    'Sounds':
        '\u00c4\u00e4net',

    // names:
    'Sprite':
        'Hahmo',
    'Stage':
        'Esiintymislava',

    // rotation styles:
    'don\'t rotate':
        'ei py\u00f6ri',
    'can rotate':
        'py\u00f6rii vapaasti',
    'only face left/right':
        'k\u00e4\u00e4ntyy vain vasemmalle ja oikealle',

    // new sprite button:
    'add a new sprite':
        'lis\u00e4\u00e4 uusi hahmo',

    // tab help
    'costumes tab help':
        'Tuo kuva verkosta tai koneeltasi\n'
            + 'siirt\u00e4m\u00e4ll\u00e4 se hiirell\u00e4 t\u00e4h\u00e4n',
    'import a sound from your computer\nby dragging it into here':
        'Tuo \u00e4\u00e4ni koneeltasi\n'
            + 'siirt\u00e4m\u00e4ll\u00e4 se hiirell\u00e4 t\u00e4h\u00e4n',

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
        'Esiintymislava valittuna\nei liikekomentoja',

    'move %n steps':
        'liiku %n askelta',
    'turn %clockwise %n degrees':
        'k\u00e4\u00e4nny %clockwise %n astetta',
    'turn %counterclockwise %n degrees':
        'k\u00e4\u00e4nny %counterclockwise %n astetta',
    'point in direction %dir':
        'osoita suuntaan %dir',
    'point towards %dst':
        'osoita hahmoa %dst kohti',
    'go to x: %n y: %n':
        'mene paikkaan x: %n y: %n',
    'go to %dst':
        'mene hahmon %dst luo',
    'glide %n secs to x: %n y: %n':
        'liu\'u %n s \u2192 x: %n y: %n',
    'change x by %n':
        'muuta x:\u00e4\u00e4 %n askelta',
    'set x to %n':
        'aseta x:ksi %n',
    'change y by %n':
        'muuta y:t\u00e4 %n askelta',
    'set y to %n':
        'aseta y:ksi %n',
    'if on edge, bounce':
        'kimpoa reunasta',
    'x position':
        'x-paikka',
    'y position':
        'y-paikka',
    'direction':
        'suunta',

    // looks:
    'switch to costume %cst':
        'vaihda asuun %cst',
    'next costume':
        'seuraava asu',
    'costume #':
        'asun nro',
    'say %s for %n secs':
        'sano %s %n sekunnin ajan',
    'say %s':
        'sano %s',
    'think %s for %n secs':
        'ajattele %s %n sekunnin ajan',
    'think %s':
        'ajattele %s',
    'Hello!':
        'Hei!',
    'Hmm...':
        'Hmm...',
    'change %eff effect by %n':
        'muuta efekti\u00e4 %eff %n yksikk\u00f6\u00e4',
    'set %eff effect to %n':
        'aseta efektin %eff m\u00e4\u00e4r\u00e4ksi %n',
    'clear graphic effects':
        'poista efektit',
    'change size by %n':
        // using a zero-width space to hide % at word beginning
        'muuta kokoa %n \u200B%-yksikk\u00f6\u00e4',
    'set size to %n %':
        'aseta kooksi %n %',
    'size':
        'koko',
    'show':
        'n\u00e4yt\u00e4',
    'hide':
        'piilota',
    'go to front':
        'tule etualalle',
    'go back %n layers':
        'siirry %n kerrosta taakse',

    'development mode \ndebugging primitives:':
        'Kehitysmoodin \ndebuggauskomennot:',
    'console log %mult%s':
        'kirjoita konsoliin: %mult%s',
    'alert %mult%s':
        'ponnahdusikkuna: %mult%s',

    // sound:
    'play sound %snd':
        'soita \u00e4\u00e4ni %snd',
    'play sound %snd until done':
        'soita \u00e4\u00e4ni %snd kokonaan',
    'stop all sounds':
        'pys\u00e4yt\u00e4 kaikki \u00e4\u00e4net',
    'rest for %n beats':
        'tauko %n iskua',
    'play note %n for %n beats':
        'nuotti %n %n iskua',
    'change tempo by %n':
        'vaihda tempoa %n iskulla/min',
    'set tempo to %n bpm':
        'aseta tempoksi %n iskua/min',
    'tempo':
        'tempo',

    // pen:
    'clear':
        'tyhjenn\u00e4',
    'pen down':
        'kyn\u00e4 alas',
    'pen up':
        'kyn\u00e4 yl\u00f6s',
    'set pen color to %clr':
        'aseta kyn\u00e4n v\u00e4riksi %clr',
    'change pen color by %n':
        'vaihda kyn\u00e4n v\u00e4ri\u00e4 m\u00e4\u00e4r\u00e4ll\u00e4 %n',
    'set pen color to %n':
        'aseta kyn\u00e4n v\u00e4riksi %n',
    'change pen shade by %n':
        // using a zero-width space to hide % at word beginning
        'muuta kirkkautta %n \u200b%-yks.',
    'set pen shade to %n':
        'aseta kirkkaudeksi %n %',
    'change pen size by %n':
        'muuta paksuutta m\u00e4\u00e4r\u00e4ll\u00e4 %n',
    'set pen size to %n':
        'aseta kyn\u00e4n paksuudeksi %n',
    'stamp':
        'leimaa',

    // control:
    'when %greenflag clicked':
        'kun klikataan %greenflag',
    'when %keyHat key pressed':
        'kun painetaan %keyHat',
    'when I am clicked':
        'kun minua klikataan',
    'when I receive %msgHat':
        'kun vastaanotan sanoman %msgHat',
    'broadcast %msg':
        'l\u00e4het\u00e4 sanoma %msg',
    'broadcast %msg and wait':
        'l\u00e4het\u00e4 sanoma %msg ja odota',
    'Message name':
        'Sanoma',
    'message':
        'sanoma',
    'any message':
        'mik\u00e4 tahansa',
    'wait %n secs':
        'odota %n sekuntia',
    'wait until %b':
        'odota kunnes %b',
    'forever %c':
        'ikuisesti %c',
    'repeat %n %c':
        'toista %n kertaa %c',
    'repeat until %b %c':
        'toista kunnes %b %c',
    'if %b %c':
        'jos %b %c',
    'if %b %c else %c':
        'jos %b %c muuten %c',
    'report %s':
        'vastaa %s',
    'stop %stopChoices':
        'pys\u00e4yt\u00e4 %stopChoices',
    'all':
        'kaikki',
    'this script':
        't\u00e4m\u00e4 skripti',
    'this block':
        't\u00e4m\u00e4 palikka',
    'stop %stopOthersChoices':
        'pys\u00e4yt\u00e4 %stopOthersChoices',
    'all but this script':
        'kaikki paitsi t\u00e4m\u00e4 skripti',
    'other scripts in sprite':
        'hahmon muut skriptit',
    'pause all %pause':
        'keskeyt\u00e4 kaikki %pause',
    'run %cmdRing %inputs':
        'suorita %cmdRing %inputs',
    'launch %cmdRing %inputs':
        'k\u00e4ynnist\u00e4 %cmdRing %inputs',
    'call %repRing %inputs':
        'kutsu %repRing %inputs',
    'run %cmdRing w/continuation':
        'suorita %cmdRing kontinuaatiolla',
    'call %cmdRing w/continuation':
        'kutsu %cmdRing kontinuaatiolla',
    'warp %c':
        'supernopeasti %c',
    'when I start as a clone':
        'Kun aloitan kloonina',
    'create a clone of %cln':
        'kloonaa %cln',
    'myself':
        'minut',
    'delete this clone':
        'poista t\u00e4m\u00e4 klooni',

    // sensing:
    'touching %col ?':
        'koskettaa hahmoa %col ?',
    'touching %clr ?':
        'koskettaa v\u00e4ri\u00e4 %clr ?',
    'color %clr is touching %clr ?':
        'v\u00e4ri %clr koskettaa v\u00e4ri\u00e4 %clr ?',
    'ask %s and wait':
        'kysy %s ja odota',
    'what\'s your name?':
        'Mik\u00e4 sinun nimesi on?',
    'answer':
        'vastaus',
    'mouse x':
        'hiiren x-paikka',
    'mouse y':
        'hiiren y-paikka',
    'mouse down?':
        'hiiren n\u00e4pp\u00e4in painettuna?',
    'key %key pressed?':
        'n\u00e4pp\u00e4in %key painettuna?',
    'distance to %dst':
        'et\u00e4isyys hahmoon %dst',
    'reset timer':
        'nollaa ajastin',
    'timer':
        'ajastin',
    '%att of %spr':
        '%att hahmolla %spr',
    'http:// %s':
        'http:// %s',
    'turbo mode?':
        'turbonopeus?',
    'set turbo mode to %b':
        'kytke turbonopeus p\u00e4\u00e4lle jos %b',

    'filtered for %clr':
        'suodatettuna v\u00e4ri %clr',
    'stack size':
        'pinon koko',
    'frames':
        'ruutuja',

    // operators:
    '%n mod %n':
        'jakoj\u00e4\u00e4nn\u00f6s laskusta %n / %n',
    'round %n':
        'py\u00f6rist\u00e4 %n',
    '%fun of %n':
        '%fun %n',
    'pick random %n to %n':
        'arvo satunnaisluku %n .. %n',
    '%b and %b':
        '%b ja %b',
    '%b or %b':
        '%b tai %b',
    'not %b':
        'ei %b',
    'true':
        'tosi',
    'false':
        'ep\u00e4tosi',
    'join %words':
        'yhdist\u00e4 %words',
    'split %s by %delim':
        'pilko %s %delim kohdalta',
    'hello':
        'Hei',
    'world':
        'maailma',
    'letter %n of %s':
        'kirjain nro %n tekstist\u00e4 %s',
    'length of %s':
        'tekstin %s pituus',
    'unicode of %s':
        'merkin %s Unicode-arvo',
    'unicode %n as letter':
        'Unicode-arvoa %n vastaava merkki',
    'is %s a %typ ?':
        'onko %s %typ ?',
    'is %s identical to %s ?':
        'onko %s sama kuin %s ?',

    'type of %s':
        '%s:n tyyppi',

    // variables:
    'Make a variable':
        'Uusi muuttuja',
    'Variable name':
        'Muuttujan nimi',
    'Script variable name':
        'Skriptimuuttujan nimi',
    'Delete a variable':
        'poista muuttuja',

    'set %var to %s':
        'aseta muuttujan %var arvoksi %s',
    'change %var by %n':
        'muuta muuttujaa %var m\u00e4\u00e4r\u00e4ll\u00e4 %n',
    'show variable %var':
        'n\u00e4yt\u00e4 muuttuja %var',
    'hide variable %var':
        'piilota muuttuja %var',
    'script variables %scriptVars':
        'skriptimuuttujat %scriptVars',

    // lists:
    'list %exp':
        'lista %exp',
    '%s in front of %l':
        '%s listan %l aluksi',
    'item %idx of %l':
        'alkio kohdassa %idx listassa %l',
    'all but first of %l':
        'kaikki paitsi ensimm\u00e4inen alkio listasta %l',
    'length of %l':
        'listan %l pituus',
    '%l contains %s':
        'lista %l sis\u00e4lt\u00e4\u00e4 %s',
    'thing':
        'alkio',
    'add %s to %l':
        'lis\u00e4\u00e4 %s listaan %l',
    'delete %ida of %l':
        'poista %ida listasta %l',
    'insert %s at %idx of %l':
        'lis\u00e4\u00e4 %s kohtaan %idx listassa %l',
    'replace item %idx of %l with %s':
        'vaihda kohtaan %idx listassa %l alkio %s',

    // other
    'Make a block':
        'Uusi palikka',

    // menus
    // snap menu
    'About...':
        'Tietoa Snapista...',
    'Reference manual':
        'K\u00e4ytt\u00f6ohje',
    'Snap! website':
        'Snapin kotisivu',
    'Download source':
        'Lataa l\u00e4hdekoodi',
    'Switch back to user mode':
        'Palaa k\u00e4ytt\u00e4j\u00e4moodiin',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'poista Morphic-valikot k\u00e4yt\u00f6st\u00e4\n'
            + 'ja n\u00e4yt\u00e4 helpot valikot',
    'Switch to dev mode':
        'vaihda kehitysmoodiin',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'n\u00e4yt\u00e4 Morphic-toiminnot,\n'
            + 'ei kovin helppok\u00e4ytt\u00f6isi\u00e4',

    // project menu
    'Project notes...':
        'Projektimerkint\u00f6j\u00e4...',
    'New':
        'Uusi',
    'Open...':
        'Avaa...',
    'Save':
        'Tallenna',
    'Save As...':
        'Tallenna nimell\u00e4...',
    'Import...':
        'Tuo...',
    'file menu import hint':
        'lataa viety projekti,\npalikkakirjasto, asu\ntai \u00e4\u00e4ni',
    'Export project as plain text...':
        'Vie projekti tekstin\u00e4...',
    'Export project...':
        'Vie projekti...',
    'show project data as XML\nin a new browser window':
        'n\u00e4yt\u00e4 projekti XML-muodossa\nuudessa selainikkunassa',
    'Export blocks...':
        'Vie palikoita...',
    'show global custom block definitions as XML\nin a new browser window':
        'n\u00e4yt\u00e4 yhteiset palikkam\u00e4\u00e4rittelyt\n'
            + 'XML-muodossa uudessa selainikkunassa',
    'Import tools':
        'Tuo ty\u00f6kaluja',
    'load the official library of\npowerful blocks':
        'lataa virallinen tehopalikoiden kirjasto',
    'Libraries...':
        'Kirjastot...',
    'Import library':
        'Tuo kirjasto',

    // cloud menu
    'Login...':
        'Kirjaudu...',
    'Signup...':
        'Luo k\u00e4ytt\u00e4j\u00e4tili...',

    // settings menu
    'Language...':
        'Kieli...',
    'Zoom blocks...':
        'Suurenna palikoita...',
    'Stage size...':
        'Esiintymislavan koko...',
    'Stage size':
        'Esiintymislavan koko',
    'Stage width':
        'Esiintymislavan leveys',
    'Stage height':
        'Esiintymislavan korkeus',
    'Default':
        'Tavallinen',
    'Blurred shadows':
        'Sumeat varjot',
    'uncheck to use solid drop\nshadows and highlights':
        'poistamalla saat kiinte\u00e4t varjot\nja korostukset',
    'check to use blurred drop\nshadows and highlights':
        'asettamalla saat sumeat varjot\nja korostukset',
    'Zebra coloring':
        'Seeprav\u00e4ritys',
    'check to enable alternating\ncolors for nested blocks':
        'asettamalla saat vaihtuvat v\u00e4rit\nsis\u00e4kk\u00e4isille palikoille',
    'uncheck to disable alternating\ncolors for nested block':
        'poistamalla saat samat v\u00e4rit\nsis\u00e4kk\u00e4isille palikoille',
    'Dynamic input labels':
        'Vaihtuvat sy\u00f6tetunnukset',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'poistamalla est\u00e4t vaihtuvien\nsy\u00f6tteiden vaihtuvat tunnukset',
    'check to enable dynamic\nlabels for variadic inputs':
        'asettamalla saat vaihtuville\nsy\u00f6tteille vaihtuvat tunnukset',
    'Prefer empty slot drops':
        'Suosi asettamista tyhjiin aukkoihin',
    'settings menu prefer empty slots hint':
        'asettamalla saat asetettavat\npalikat osumaan tyhjiin aukkoihin',
    'uncheck to allow dropped\nreporters to kick out others':
        'poistamalla sallit asetettujen\npalikoiden pois potkimisen',
    'Long form input dialog':
        'Yksityiskohtainen sy\u00f6tevalinta',
    'Plain prototype labels':
        'Yksinkertaiset palikkatunnisteet',
    'uncheck to always show (+) symbols\nin block prototype labels':
        'poistamalla saat (+)-merkit\nn\u00e4kym\u00e4\u00e4n aina\n'
            + 'palikan muokkauksessa',
    'check to hide (+) symbols\nin block prototype labels':
        'asettamalla piilotat (+)-merkit\npalikan muokkauksessa',
    'check to always show slot\ntypes in the input dialog':
        'asettamalla n\u00e4et aina\ntietotyyppivalinnat\n'
            + 'palikan sy\u00f6tteit\u00e4 lis\u00e4tess\u00e4',
    'uncheck to use the input\ndialog in short form':
        'poistamalla teet palikan\nsy\u00f6tteiden lis\u00e4\u00e4misikkunasta\n'
            + 'yksinkertaisen',
    'Virtual keyboard':
        'Virtuaalin\u00e4pp\u00e4imist\u00f6',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'poistamalla est\u00e4t mobiililaitteiden\n'
            + 'virtuaalin\u00e4pp\u00e4imist\u00f6n k\u00e4yt\u00f6n',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'asettamalla sallit mobiililaitteiden\n'
            + 'virtuaalin\u00e4pp\u00e4imist\u00f6n k\u00e4yt\u00f6n',
    'Input sliders':
        'Liukus\u00e4\u00e4timet',
    'uncheck to disable\ninput sliders for\nentry fields':
        'poistamalla piilotat\nliukus\u00e4\u00e4timet sy\u00f6tekentist\u00e4\n',
    'check to enable\ninput sliders for\nentry fields':
        'asettamalla saat\nsy\u00f6tekenttiin liukus\u00e4\u00e4timet',
    'Clicking sound':
        'Klikkaus\u00e4\u00e4ni',
    'uncheck to turn\nblock clicking\nsound off':
        'poistamalla hiljenn\u00e4t\npalikoiden klikkaus\u00e4\u00e4nen',
    'check to turn\nblock clicking\nsound on':
        'asettamalla kytket p\u00e4\u00e4lle\npalikoiden klikkaus\u00e4\u00e4nen',
    'Animations':
        'Animaatiot',
    'uncheck to disable\nIDE animations':
        'poistamalla piilotat\nk\u00e4ytt\u00f6liittym\u00e4n animaatiot',
    'Turbo mode':
        'Turbonopeus',
    'check to prioritize\nscript execution':
        'asettamalla nostat\nskriptien prioriteettia',
    'uncheck to run scripts\nat normal speed':
        'poistamalla ajat\nskriptit normaalinopeudella',
    'check to enable\nIDE animations':
        'asettamalla kytket p\u00e4\u00e4lle\n'
            + 'k\u00e4ytt\u00f6liittym\u00e4n animaatiot',
    'Thread safe scripts':
        'S\u00e4ieturvalliset skriptit',
    'uncheck to allow\nscript reentrance':
        'poistamalla sallit skriptin\nk\u00e4ynnistymisen vaikka se on ajossa',
    'check to disallow\nscript reentrance':
        'asettamalla est\u00e4t skriptin\nk\u00e4ynnistymisen jos se on jo ajossa',
    'Prefer smooth animations':
        'Pyri sulaviin animaatioihin',
    'uncheck for greater speed\nat variable frame rates':
        'poistamalla saat lis\u00e4\u00e4 nopeutta\n'
            + 'mutta p\u00e4ivitystaajuus vaihtelee',
    'check for smooth, predictable\nanimations across computers':
        'asettamalla saat sulavat\nanimaatiot eri tietokoneilla',
    'Flat line ends':
        'Tasaiset viivanp\u00e4\u00e4t',
    'check for flat ends of lines':
        'asettamalla saat viivan p\u00e4ist\u00e4 suorat',
    'uncheck for round ends of lines':
        'poistamalla saat viivan p\u00e4ist\u00e4 py\u00f6ristetyt',

    // inputs
    'with inputs':
        'sy\u00f6tteill\u00e4',
    'input names:':
        'sy\u00f6tteet:',
    'Input Names:':
        'Sy\u00f6tteet:',
    'input list:':
        'sy\u00f6telista:',

    // context menus:
    'help':
        'apua',

    // palette:
    'hide primitives':
        'piilota peruspalikat',
    'show primitives':
        'n\u00e4yt\u00e4 peruspalikat',

    // blocks:
    'help...':
        'apua...',
    'relabel...':
        'nime\u00e4 uudestaan...',
    'duplicate':
        'kopioi',
    'make a copy\nand pick it up':
        'ota kopio mukaan',
    'only duplicate this block':
        'kopioi vain t\u00e4m\u00e4 palikka',
    'delete':
        'poista',
    'script pic...':
        'kuva skriptist\u00e4...',
    'open a new window\nwith a picture of this script':
        'avaa kuva t\u00e4st\u00e4 skriptist\u00e4\nuudessa selainikkunassa',
    'ringify':
        'ympyr\u00f6i',
    'unringify':
        'poista ympyr\u00f6inti',

    // custom blocks:
    'delete block definition...':
        'poista palikkam\u00e4\u00e4rittely',
    'edit...':
        'muokkaa...',

    // sprites:
    'edit':
        'muokkaa',
    'detach from':
        'irrota',
    'detach all parts':
        'irrota kaikki osat',
    'export...':
        'Vie...',

    // stage:
    'show all':
        'N\u00e4yt\u00e4 kaikki',
    'pic...':
        'Vie kuva...',
    'open a new window\nwith a picture of the stage':
        'Avaa esiintymislavan kuva\nuuteen selainikkunaan',

    // scripting area
    'clean up':
        'siivoa',
    'arrange scripts\nvertically':
        'j\u00e4rjest\u00e4 pystysuorasti',
    'add comment':
        'lis\u00e4\u00e4 kommentti',
    'undrop':
        'peruuta asetus',
    'undo the last\nblock drop\nin this pane':
        'peruuta viimeisin\npalikan asetus',
    'scripts pic...':
        'kuva skripteist\u00e4...',
    'open a new window\nwith a picture of all scripts':
        'avaa kuva\nkaikista skripteist\u00e4\nuudessa selainikkunassa',
    'make a block...':
        'tee uusi palikka...',

    // costumes
    'rename':
        'nime\u00e4 uudestaan',
    'export':
        'vie',
    'rename costume':
        'nime\u00e4 asu uudestaan',

    // sounds
    'Play sound':
        'Soita \u00e4\u00e4ni',
    'Stop sound':
        'Pys\u00e4yt\u00e4 \u00e4\u00e4ni',
    'Stop':
        'Pys\u00e4yt\u00e4',
    'Play':
        'Soita',
    'rename sound':
        'nime\u00e4 \u00e4\u00e4ni uudestaan',

    // dialogs
    // buttons
    'OK':
        'OK',
    'Ok':
        'OK',
    'Cancel':
        'Peruuta',
    'Yes':
        'Kyll\u00e4',
    'No':
        'Ei',

    // help
    'Help':
        'Apua',

    // zoom blocks
    'Zoom blocks':
        'Suurenna palikoita',
    'build':
        'rakenna',
    'your own':
        'omia',
    'blocks':
        'palikoita',
    'normal (1x)':
        'normaali (1x)',
    'demo (1.2x)':
        'demo (1.2x)',
    'presentation (1.4x)':
        'esitys (1.4x)',
    'big (2x)':
        'iso (2x)',
    'huge (4x)':
        'valtava (4x)',
    'giant (8x)':
        'j\u00e4ttim\u00e4inen (8x)',
    'monstrous (10x)':
        'hirvi\u00f6m\u00e4inen (10x)',

    // Project Manager
    'Untitled':
        'Nimet\u00f6n',
    'Open Project':
        'Avaa projekti',
    '(empty)':
        '(tyhj\u00e4)',
    'Saved!':
        'Tallennettu!',
    'Delete Project':
        'Poista projekti',
    'Are you sure you want to delete':
        'Poistetaanko varmasti?',
    'rename...':
        'nime\u00e4 uusiksi...',

    // costume editor
    'Costume Editor':
        'Asun muokkaus',
    'click or drag crosshairs to move the rotation center':
        'siirr\u00e4 kiertokeskusta klikkaamalla\n'
            + 'tai pit\u00e4m\u00e4ll\u00e4 hiirt\u00e4 '
            + 'painettuna ja liikuttamalla',

    // project notes
    'Project Notes':
        'Projektin muistiinpanot',

    // new project
    'New Project':
        'Uusi projekti',
    'Replace the current project with a new one?':
        'Korvataanko nykyinen projekti uudella?',

    // save project
    'Save Project As...':
        'Tallenna projekti nimell\u00e4...',

    // export blocks
    'Export blocks':
        'Vie palikoita',
    'Import blocks':
        'Tuo palikoita',
    'this project doesn\'t have any\ncustom global blocks yet':
        'projektilla ei ole viel\u00e4\nyht\u00e4\u00e4n yhteist\u00e4\n'
            + 'muokattua palikkaa',
    'select':
        'valitse',
    'none':
        'ei mit\u00e4\u00e4n',

    // variable dialog
    'for all sprites':
        'kaikille hahmoille',
    'for this sprite only':
        'vain t\u00e4lle hahmolle',

    // block dialog
    'Change block':
        'Muuta palikkaa',
    'Command':
        'Komento',
    'Reporter':
        'Funktio',
    'Predicate':
        'Predikaatti',

    // block editor
    'Block Editor':
        'Palikan muokkaus',
    'Apply':
        'Tee muutokset',

    // block deletion dialog
    'Delete Custom Block':
        'Poista palikka',
    'block deletion dialog text':
        'Poistetaanko t\u00e4m\u00e4 palikka\n ja kaikki sen esiintym\u00e4t?',


    // input dialog
    'Create input name':
        'Nime\u00e4 sy\u00f6te',
    'Edit input name':
        'Muokkaa sy\u00f6tteen nime\u00e4',
    'Edit label fragment':
        'Muokkaa otsikkoa',
    'Title text':
        'Otsikko',
    'Input name':
        'Sy\u00f6te',
    'Delete':
        'Poista',
    'Object':
        'Objekti',
    'Number':
        'Luku',
    'Text':
        'Teksti',
    'List':
        'Lista',
    'Any type':
        'Mik\u00e4 vain',
    'Boolean (T/F)':
        'Totuusarvo',
    'Command\n(inline)':
        'Komento',
    'Command\n(C-shape)':
        'Komento\n(C-muoto)',
    'Any\n(unevaluated)':
        'Mik\u00e4 vain\n(sitaatti)',
    'Boolean\n(unevaluated)':
        'Totuusarvo\n(sitaatti)',
    'Single input.':
        'Yksi sy\u00f6te.',
    'Default Value:':
        'Oletusarvo:',
    'Multiple inputs (value is list of inputs)':
        'Useita sy\u00f6tteit\u00e4 (listana)',
    'Upvar - make internal variable visible to caller':
        'Paljasta sis\u00e4inen muuttuja ulkopuolelle',

    // About Snap
    'About Snap':
        'Tietoa Snapista',
    'Back...':
        'Takaisin...',
    'License...':
        'Tekij\u00e4noikeudet...',
    'Modules...':
        'Osat...',
    'Credits...':
        'Kiitokset...',
    'Translators...':
        'K\u00e4\u00e4nt\u00e4j\u00e4t...',
    'License':
        'Tekij\u00e4noikeudet',
    'current module versions:':
        'Osien versiot:',
    'Contributors':
        'Osallistujat',
    'Translations':
        'K\u00e4\u00e4nn\u00f6kset',

    // variable watchers
    'normal':
        'tavallinen',
    'large':
        'suuri',
    'slider':
        'liukus\u00e4\u00e4din',
    'slider min...':
        'minimiarvo...',
    'slider max...':
        'maksimiarvo...',
    'import...':
        'tuo...',
    'Slider minimum value':
        'Liukus\u00e4\u00e4timen minimiarvo',
    'Slider maximum value':
        'Liukus\u00e4\u00e4timen maksimiarvo',

    // list watchers
    'length: ':
        'pituus: ',

    // coments
    'add comment here...':
        'Kirjoita kommentti t\u00e4h\u00e4n...',

    // drow downs
    // directions
    '(90) right':
        '(90) oikealle',
    '(-90) left':
        '(-90) vasemmalle',
    '(0) up':
        '(0) yl\u00f6s',
    '(180) down':
        '(180) alas',

    // collision detection
    'mouse-pointer':
        'hiiren osoitin',
    'edge':
        'reuna',
    'pen trails':
        'kyn\u00e4n j\u00e4lki',

    // costumes
    'Turtle':
        'Osoitin',
    'Empty':
        'Tyhj\u00e4',

    // graphical effects
    'ghost':
        'l\u00e4pin\u00e4kyvyys',

    // keys
    'space':
        'v\u00e4lily\u00f6nti',
    'up arrow':
        'nuoli yl\u00f6s',
    'down arrow':
        'nuoli alas',
    'right arrow':
        'nuoli oikealle',
    'left arrow':
        'nuoli vasemmalle',
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
        'uusi...',

    // math functions
    'abs':
        'itseisarvo',
    'floor':
        'py\u00f6ristys alas',
    'sqrt':
        'neli\u00f6juuri',
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
    'whitespace':
        'tyhjien v\u00e4lien',
    'line':
        'rivinvaihtojen (lf)',
    'tab':
        'sarkaimien (tab)',
    'cr':
        'vaununpalautusten (cr)',

    // data types
    'number':
        'luku',
    'text':
        'teksti',
    'Boolean':
        'totuusarvo',
    'list':
        'lista',
    'command':
        'komentopalikka',
    'reporter':
        'funktiopalikka',
    'predicate':
        'predikaatti',

    // list indices
    'last':
        'viimeinen',
    'any':
        'mik\u00e4 tahansa'
};
