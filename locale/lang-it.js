/*

	lang-it.js

	Italian  translation for SNAP!

	written by Jens MÃ¶nig

	Copyright (C) 2012 by Jens MÃ¶nig

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

SnapTranslator.dict.it = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    Ã„, Ã¤   \u00c4, \u00e4
    Ã–, Ã¶   \u00d6, \u00f6
    Ãœ, Ã¼   \u00dc, \u00fc
    ÃŸ      \u00df
*/

    // translations meta information
    'language_name':
        'Italiano', // the name as it should appear in the language menu
    'language_translator':
        'Stefano Federici, Alice Andrea Deiana, Alberto Firpo, Massimo Ghisalberti', // your name for the Translators tab
    'translator_e-mail':
        's_federici@yahoo.com, albertofirpo12@gmail.com, zairik@gmail.com', // optional
    'last_changed':
        '2020-11-19', // this, too, will appear in the Translators tab

    // GUI
    // control bar:
    'untitled':
        'SenzaTitolo',
    'development mode':
        'modalit\u00E0 sviluppo',

    // categories:
    'Motion':
        'Movimento',
    'Looks':
        'Aspetto',
    'Sound':
        'Suono',
    'Pen':
        'Penna',
    'Control':
        'Controllo',
    'Sensing':
        'Sensori',
    'Operators':
        'Operatori',
    'Variables':
        'Variabili',
    'Lists':
        'Liste',
    'Other':
        'Altro',

    // editor:
    'draggable':
        'trascinabile',

    // tabs:
    'Scripts':
        'Script',
    'Costumes':
        'Costumi',
    'Backgrounds':
        'Sfondi',
    'Sounds':
        'Suoni',

    // names:
    'Sprite':
        'Sprite',
    'Stage':
        'Stage',

    // rotation styles:
    'don\'t rotate':
        'non ruotare',
    'can rotate':
        'pu\u00F2 ruotare',
    'only face left/right':
        'voltati solo a destra/sinistra',

    // new sprite button:
    'add a new sprite':
        'aggiungi un nuovo sprite',
    'add a new Turtle sprite':
        'aggiungi una nuova Tartaruga',
    'paint a new sprite':
        'disegna un nuovo sprite',
    'take a camera snapshot and\nimport it as a new sprite':
        'scatta una foto\ne usala come un nuovo sprite',


    // tab help
    'costumes tab help':
        'Importa un\'immagine da una pagina web\n'
            + 'o da un file sul tuo computer trascinandolo qui',
    'import a sound from your computer\nby dragging it into here':
        'Importa un suono dal tuo computer trascinandolo qui',

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
        'Stage selezionato:\nNessun blocco per il movimento\n',

    'move %n steps':
        'fai %n passi',
    'turn %clockwise %n degrees':
        'ruota di %clockwise %n gradi',
    'turn %counterclockwise %n degrees':
        'ruota di %counterclockwise %n gradi',
    'point in direction %dir':
        'punta in direzione %dir',
    'point towards %dst':
        'punta verso %dst',
    'go to x: %n y: %n':
        'vai a x: %n y: %n',
    'go to %dst':
        'raggiungi %dst',
    'glide %n secs to x: %n y: %n':
        'scivola in %n secondi a x: %n y: %n',
    'change x by %n':
        'cambia x di %n',
    'set x to %n':
        'vai dove x \u00E8 %n',
    'change y by %n':
        'cambia y di %n',
    'set y to %n':
        'vai dove y \u00E8 %n',
    'if on edge, bounce':
        'rimbalza quando tocchi il bordo',
    'x position':
        'posizione x',
    'y position':
        'posizione y',
    'direction':
        'direzione',

    // looks:
    'switch to costume %cst':
        'passa al costume %cst',
    'next costume':
        'passa al costume seguente',
    'costume #':
        'numero costume',
    'say %s for %n secs':
        'dire %s per %n secondi',
    'say %s':
        'dire %s',
    'think %s for %n secs':
        'pensa %s per %n secondi',
    'think %s':
        'pensa %s',
    'Hello!':
        'Ciao!',
    'Hmm...':
        'Hmm...',
    '%img of costume %cst':
        '%img del costume %cst',
    'new costume %l width %dim height %dim':
        'nuovo costume %l larghezza %dim altezza %dim',
    'stretch %cst x: %n y: %n %':
        'allunga %cst del %n % in orizzontale e del %n % in verticale',
    'change %eff effect by %n':
        'cambia effetto %eff di %n',
    'set %eff effect to %n':
        'porta effetto %eff a %n',
    'clear graphic effects':
        'rimuovi effetti grafici',
    '%eff effect':
        'effetto %eff',
    'change size by %n':
        'cambia dimensione di %n',
    'set size to %n %':
        'porta dimensione a %n %',
    'size':
        'dimensione',
    'show':
        'mostra',
    'hide':
        'nascondi',
    'shown?':
        'visibile',
    'go to %layer layer':
        'vai in %layer piano',
    'front':
        'primo',
    'back':
        'secondo',
    'go back %n layers':
        'vai indietro di %n livelli',

    'development mode \ndebugging primitives:':
        'modalit\u00E0 sviluppo\nComandi di debug',
    'console log %mult%s':
        'console log: %mult%s',
    'alert %mult%s':
        'avviso: %mult%s',

    'pixels':
        'pixel',
    'current':
        'attuale',

    // sound:
    'play sound %snd':
        'produci suono %snd',
    'play sound %snd until done':
        'produci suono %snd e attendi la fine',
    'stop all sounds':
        'arresta tutti i suoni',
    'rest for %n beats':
        'fai una pausa di %n battute',
    'play sound %snd at %rate Hz':
        'riproduci suono %snd a %rate Hz',
    '%aa of sound %snd':
        '%aa del suono %snd',
    'duration':
        'durata',
    'length':
        'lunghezza',
    'number of channels':
        'numero di canali',
    'new sound %l rate %rate Hz':
        'nuovo suono %l frequenza %rate Hz',
    'play note %note for %n beats':
        'riproduci nota %note per %n battute',
    'set instrument to %inst':
        'passa a strumento %inst',
    'change tempo by %n':
        'cambia tempo di %n',
    'set tempo to %n bpm':
        'porta tempo a %n bpm',
    'tempo':
        'tempo',
    'change volume by %n':
        'cambia volume di %n',
    'set volume to %n %':
        'porta volume a %n %',
    'change balance by %n':
        'cambia bilanciamento di %n',
    'set balance to %n':
        'porta bilanciamento a %n',
    'balance':
        'bilanciamento',
    'play frequency %n Hz':
        'riproduci frequenza %n Hz',
    'stop frequency':
        'interrompi riproduzione frequenza',
    'play %n Hz for %n secs':
        'riproduci %n Hz per %n secondi',

    // "instruments", i.e. wave forms
    '(1) sine':
        '(1) con onda sinusoidale',
    '(2) square':
        '(2) con onda quadrata',
    '(3) sawtooth':
        '(3) con onda a dente di sega',
    '(4) triangle':
        '(4) con onda triangolare',

    // pen:
    'clear':
        'pulisci',
    'pen down':
        'penna gi\u00F9',
    'pen up':
        'penna su',
    'pen down?':
        'penna giÃ¹',
    'set pen color to %clr':
        'usa penna di colore %clr',
    'set background color to %clr':
        'porta colore sfondo a %clr',
    'change pen %hsva by %n':
        'cambia %hsva della penna di %n',
    'change background %hsva by %n':
        'cambia %hsva sfondo di %n',
    'set pen %hsva to %n':
        'porta %hsva della penna a %n',
    'set background %hsva to %n':
        'porta %hsva sfondo a %n',
    'pen %pen':
        '%pen della penna',
    'change pen size by %n':
        'cambia dimensione penna di %n',
    'set pen size to %n':
        'porta dimensione penna a %n',
    'stamp':
        'timbra',
    'fill':
        'riempi',
    'write %s size %n':
        'scrivi %s di dimensione %n',
    'paste on %spr':
        'timbra su %spr',
    'cut from %spr':
        'ritaglia da %spr',
    'pen vectors':
        'vettori penna',

    // control:
    'when %greenflag clicked':
        'quando si clicca su %greenflag',
    'when %keyHat key pressed':
        'quando si preme il tasto %keyHat',
    'when I am %interaction':
        'quando sono %interaction',
    'clicked':
        'cliccato',
    'pressed':
        'premuto',
    'dropped':
        'lasciato',
    'mouse-entered':
        'a contatto con il mouse',
    'mouse-departed':
        'non a contatto con il mouse',
    'scrolled-down':
    	'scrollato verso il basso',
    'scrolled-up':
        'scrollato verso l\u0027alto',
    'stopped':
        'fermo',
    'when %b':
        'quando %b',
    'when I receive %msgHat':
        'quando ricevo %msgHat',
    'broadcast %msg':
        'invia a tutti %msg',
    'broadcast %msg and wait':
        'invia a tutti %msg e attendi',
    'send %msg to %spr':
        'invia %msg a %spr',
    'Message name':
        'Nome messaggio',
    'message':
        'messaggio',
    'any message':
        'qualunque messaggio',
    'wait %n secs':
        'attendi %n secondi',
    'wait until %b':
        'attendi fino a quando %b',
    'forever %loop':
        'per sempre %loop',
    'repeat %n %loop':
        'ripeti %n volte %loop',
    'repeat until %b %loop':
        'ripeti fino a quando %b %loop',
    'for %upvar = %n to %n %cla':
        'per %upvar = %n a %n %cla',
    'if %b %c':
        'se %b %c',
    'if %b %c else %c':
        'se %b %c altrimenti %c',
    'if %b then %s else %s':
        'se %b allora %s altrimenti %s',
    'report %s':
        'risultato %s',
    'stop %stopChoices':
		  'ferma %stopChoices',
    'all':
        'tutti',
    'this script':
        'questo script',
    'this block':
        'questo blocco',
    'stop %stopOthersChoices':
        'ferma %stopOthersChoices',
    'all but this script':
        'tutto tranne questo script',
    'other scripts in sprite':
        'altri script dello sprite',
    'pause all %pause':
        'pausa tutto %pause',
    'run %cmdRing %inputs':
        'esegui %cmdRing %inputs',
    'launch %cmdRing %inputs':
        'lancia %cmdRing %inputs',
    'call %repRing %inputs':
        'chiama %repRing %inputs',
    'run %cmdRing w/continuation':
        'esegui %cmdRing con continuazione',
    'call %cmdRing w/continuation':
        'chiama %cmdRing con continuazione',
    'warp %c':
        'esegui in modalit\u00E0 turbo %c',
    'when I start as a clone':
        'quando vengo clonato',
    'create a clone of %cln':
        'crea un clone di %cln',
    'a new clone of %cln':
        'un nuovo clone di %cln',
    'myself':
        'me stesso',
    'delete this clone':
        'elimina questo clone',
    'tell %spr to %cmdRing %inputs':
        'chiedi a %spr di eseguire %cmdRing %inputs',
    'ask %spr for %repRing %inputs':
        'chiedi a %spr il valore di %repRing %inputs',

    // sensing:
    'touching %col ?':
        'sta toccando %col',
    'touching %clr ?':
        'sta toccando il colore %clr',
    'color %clr is touching %clr ?':
        'il colore %clr sta toccando il colore %clr',
    'ask %s and wait':
        'chiedi %s e attendi',
    'what\'s your name?':
        'come ti chiami?',
    'answer':
        'risposta',
    'mouse x':
        'x del mouse',
    'mouse y':
        'y del mouse',
    'mouse down?':
        'tasto del mouse premuto',
    'key %key pressed?':
        'tasto %key premuto',
    '%rel to %dst':
        '%rel da %dst',
    'distance':
    	'distanza',
    '%asp at %loc' :
        'valore di %asp alla posizione %loc',
    'r-g-b-a':
        'RGBA',
    'sprites' :
        'elenco sprite',
    'reset timer':
        'azzera cronometro',
    'timer':
        'cronometro',
    '%att of %spr':
        '%att di %spr',
    'my %get':
        'attributo %get',
    'object %self':
        'oggetto %self',
    'http:// %s':
        'leggi pagina web http:// %s',
    'turbo mode?':
        'modalit\u00E0 turbo attiva',
    'flat line ends':
        'terminazione piatta delle linee',
    'is %setting on?':
        '%setting attivo',
    'set %setting to %b':
        'porta %setting a %b',
    'current %dates':
        '%dates attuale',
  	'year':
          'anno',
    'month':
          'mese',
    'date':
          'giorno',
    'day of week':
	    'giorno della settimana',
    'hour':
          'ora',
    'minute':
          'minuto',
    'second':
          'secondo',
    'time in milliseconds':
	    'ora in millisecondi',
    'microphone %audio':
        '%audio del microfono',
    'volume':
        'volume',
    'note':
        'nota',
    'frequency':
        'frequenza',
    'samples':
        'campioni',
    'sample rate':
        'frequenza di campionamento',
    'spectrum':
        'spettro',
    'resolution':
        'risoluzione',
    'Microphone resolution...':
        'Risoluzione microfono...',
    'Microphone':
        'microfono',
    'low':
        'basso',
    'high':
        'alto',
    'max':
        'max',
    'video %vid on %self':
        '%vid del  video su %self',
    'motion':
        'movimento',
    'snap':
        'porzione',
    'set video transparency to %n':
        'porta trasparenza del video a %n',
    'video capture':
        'cattura video',
    'mirror video':
        'video riflesso',
    'filtered for %clr':
        'selezionati per colore %clr',
    'stack size':
        'dimensione stack',
    'frames':
        'frame',
    'log pen vectors':
        'log vettori della penna',

    // operators:
    '%n mod %n':
        'resto della divisione di %n diviso %n',
    'round %n':
        'arrotonda %n',
    '%fun of %n':
        '%fun di %n',
    'pick random %n to %n':
        'numero a caso tra %n e %n',
    '%b and %b':
        '%b e %b',
    '%b or %b':
        '%b o %b',
    'not %b':
        'non %b',
    'true':
        'vero',
    'false':
        'falso',
    'join %words':
        'unione di %words',
   'split %s by %delim':
        'separa %s ad ogni %delim',
    'hello':
        'ciao',
    'world':
        'mondo',
    'letter %idx of %s':
        'lettera in posizione %idx di %s',
    'length of %s':
        'lunghezza di %s',
    'unicode of %s':
        'codice unicode di %s',
    'unicode %n as letter':
        'lettera con codice unicode %n',
    'is %s a %typ ?':
        '%s \u00E8 di tipo %typ',
    'is %s identical to %s ?':
        '%s \u00E8 identico a %s ',
    'JavaScript function ( %mult%s ) { %code }':
        'funzione JavaScript ( %mult%s ) { %code }',
    'compile %repRing':
    	'compila %repRing',

    'type of %s':
        'tipo di %s',

    // variables:
    'Make a variable':
        'Nuova variabile',
    'Variable name':
        'Nome della variabile?',
    'Script variable name':
        'Nome della variabile locale?',
    'inherit %shd':
        'eredita %shd',
    'Delete a variable':
        'Cancella variabile',

    'set %var to %s':
        'porta %var a %s',
    'change %var by %n':
        'cambia %var di %n',
    'show variable %var':
        'mostra variabile %var',
    'hide variable %var':
        'nascondi variabile %var',
    'script variables %scriptVars':
        'variabili dello script: %scriptVars',

    // lists:
    'list %exp':
        'lista %exp',
    'numbers from %n to %n':
        'numeri da %n a %n',
    '%s in front of %l':
        '%s davanti a %l',
    'item %idx of %l':
        'elemento %idx di %l',
    'all but first of %l':
        'tutto meno il primo elemento di %l',
    'length of %l':
        'lunghezza di %l',
    '%l contains %s':
        '%l contiene %s',
    'thing':
        'cosa',
    'is %l empty?':
        '%l \u00E8 vuota',
    'index of %s in %l':
        'posizione di %s in %l',
    'map %repRing over %l':
        'applica %repRing su %l',
    'keep items %predRing from %l':
        'seleziona elementi %predRing in %l',
    'find first item %predRing in %l':
        'trova il primo elemento %predRing di %l',
    'combine %l using %repRing':
        'combina elementi di %l usando %repRing',
    '%blitz map %repRing over %l':
        '%blitz applica %repRing su %l',
    '%blitz keep items %predRing from %l':
        '%blitz seleziona elementi %predRing in %l',
    '%blitz find first item %predRing in %l':
        '%blitz trova il primo elemento %predRing di %l',
    '%blitz combine %l using %repRing':
        '%blitz combina elementi di %l usando %repRing',
    'for each %upvar in %l %cla':
        'per ogni %upvar di %l %cla',
    'item':
        'elemento',
    'value':
        'Wert',
    'index':
        'posizione',
    'append %lists':
        'unisci %lists',
    'add %s to %l':
        'aggiungi %s a %l',
    'delete %ida of %l':
        'cancella %ida da %l',
    'insert %s at %idx of %l':
        'inserisci %s alla posizione %idx di %l',
    'replace item %idx of %l with %s':
        'sostituisci elemento %idx di %l con %s',

    // other
    'Make a block':
        'Crea un blocco',

    // menus
    // snap menu
    'About...':
        'Informazioni su Snap!...',
   'Reference manual':
        'Manuale',
    'Snap! website':
        'Sito web di Snap!',
    'Download source':
        'Scarica il codice sorgente',
    'Switch back to user mode':
        'Torna alla modalit\u00E0 utente',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'disabilita i menu contestuali\ndi Morphic e mostra quelli user-friendly',
    'Switch to dev mode':
        'Passa alla modalit\u00E0 sviluppo',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'Abilita i menu contestuali\ndi Morphic e l\'inspector,\n non user-friendly',

    // project menu
    'Project notes...':
        'Note di Progetto...',
    'New':
        'Nuovo',
    'Open...':
        'Apri...',
    'Save':
        'Salva',
    'Save to disk':
        'Salva su disco',
    'store this project\nin the downloads folder\n(in supporting browsers)':
	    'salva questo progetto\nnella cartella Download\n'
            + '(nei browser compatibili)',
    'Save As...':
        'Salva con nome...',
    'Import...':
        'Importa...',
    'file menu import hint':
        'carica un file di progetto,\nuna libreria di blocchi,'
            + '\nun costume o un suono esportati'
            + '\n\nNon supportato da tutti i browser',
    'Export project as plain text...':
        'Esporta il progetto come un file di testo...',
    'Export project...':
        'Esporta il progetto...',
    'save project data as XML\nto your downloads folder':
        'salva i dati del progetto in formato XML\nnella cartella Download',
    'show project data as XML\nin a new browser window':
        'mostra i dati del progetto in formato XML\nin una nuova finestra del browser',
    'Export blocks...':
        'Esporta blocchi...',
    'save global custom block\ndefinitions as XML':
        'salva le definizioni dei nuovi blocchi globali\nin formato XML',
    'Unused blocks...':
          'Blocchi inutilizzati...',
    'find unused global custom blocks\nand remove their definitions':
        'trova i nuobi blocchi inutilizzati\ne rimuove le loro definizioni',
    'Remove unused blocks':
        'Rimuovi blocchi inutilizzati',
    'there are currently no unused\nglobal custom blocks in this project':
        'al momento non sono presenti\nin questo progetto nuovi blocchi inutilizzati',
    'unused block(s) removed':
        'blocchi inutilizzati rimossi',
    'Export summary...':
        'Esporta sommario...',
    'save a summary\nof this project':
        'salva un sommario\ndi questo progetto',
    'Contents':
        'Contenuti',
    'Kind of':
        'Tipo di',
    'Part of':
        'Parte di',
    'Parts':
        'Parti',
    'Blocks':
        'Blocchi',
    'For all Sprites':
        'Per tutti gli sprite',
    'Libraries...':
        'Modulo...',
    'Select categories of additional blocks to add to this project.':
        'Seleziona le categorie di blocchi addizionali da aggiungere al progetto.',
    'Select a costume from the media library':
        'Seleziona un costume dalla libreria dei media',
    'Select a sound from the media library':
        'Seleziona un suono dalla libreria dei media',

    //Libraries
    'Import library':
        'Importa modulo',
    'Loading':
        'Caricamento in corso',
    'Imported':
        'Importato',
    'Iteration, composition':
        'Iterazione, composizione',
    'List utilities':
        'Operazioni su liste',
    'Variadic reporters':
        'Monitor con argomenti variabili',
    'Web services access (https)':
        'Accesso ai servizi web (https)',
    'Multi-branched conditional (switch)':
        'Strutture di controllo ramificate (switch)',
    'Controller LEAP Motion':
        'LEAP Motion Controller',
    'Words, sentences':
        'Parole, frasi',
    'Catch errors in a script':
        'Intercettare errori degli script',
    'Set RGB or HSV pen color':
        'Colori della penna RGB o HSV',
    'Text to speech':
        'Da testo a voce',
    'Provide 100 selected colors':
        '100 colori',
    'Infinite precision integers, exact rationals, complex':
        'Interi a precisione arbitraria, razionali esatti, complessi',
    'Provide getters and setters for all GUI-controlled global settings':
        'Getter e setter per le impostazioni che controllano la GUI',
    'Allow multi-line text input to a block':
        'Argomenti multilinea di tipo testo per i blocchi',
    'Create variables in program':
        'Creare variabili programmaticamente',

    // cloud menu
    'Login...':
        'Accedi...',
    'Signup...':
        'Registrati...',
    'Logout':
        'Logout',
    'Change Password...':
        'Cambia Password...',
    'Reset Password...':
        'Azzera Password...',
    'Resend Verification Email...':
        'Invia di nuovo Email di Verifica...',
    'Open in Community Site':
        'Apri nel Sito di Snap',

    // settings menu
    'Language...':
        'Lingua...',
    'Zoom blocks...':
        'Zoom dei blocchi...',
    'Fade blocks...':
        'Trasparenza dei blocchi...',
    'Stage size...':
        'Dimensione pannello...',
    'Stage size':
        'Dimensione pannello',
    'Stage width':
        'Larghezza pannello',
    'Stage height':
        'Altezza pannello',
    'Default':
        'Default',
    'Blurred shadows':
        'Ombreggiature attenuate',
    'uncheck to use solid drop\nshadows and highlights':
        'disabilitare per visualizzare ombreggiature\ned evidenziature solide',
    'check to use blurred drop\nshadows and highlights':
        'abilitare per visualizzare ombreggiature\ned evidenziature attenuate',
    'Zebra coloring':
        'Colorazione alternata',
    'check to enable alternating\ncolors for nested blocks':
        'abilitare per visualizzare a colori\nalternati i blocchi annidati',
    'uncheck to disable alternating\ncolors for nested block':
        'disabilitare per non visualizzare a colori\nalternati i blocchi annidati',
    'Dynamic input labels':
        'Etichette degli input dinamiche',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'disabilitare per non avere etichette\ndinamiche per input variabili',
    'check to enable dynamic\nlabels for variadic inputs':
        'abilitare per avere etichette\ndinamiche per input variabili',
    'Prefer empty slot drops':
        'Favorisci l\'aggancio a slot vuoti',
    'settings menu prefer empty slots hint':
        'abilitare per favorire l\'inserimento in slot vuoti\nquando si trascinano e rilasciano dei reporter',

    'uncheck to allow dropped\nreporters to kick out others':
        'disabilitare per permettere agli slot di espellere\ni reporter inclusi al loro interno',

    'check to turn on\n visible stepping (slow)':
        'abilitare per avviare\nesecuzione passo passo (lenta)',
    'uncheck to turn off\nvisible stepping':
        'disabilitare per interrompere\nesecuzione passo passo',
    'Long form input dialog':
        'Usa finestra degli input estesa',
    'Plain prototype labels':
        'Etichetta prototipo base',
    'uncheck to always show (+) symbols\nin block prototype labels':
        'disabilitare per visualizzare sempre (+) \nnelle etichette dei blocchi prototipo',
    'check to hide (+) symbols\nin block prototype labels':
        'abilitare per visualizzare sempre (+) \nnelle etichette dei blocchi prototipo',
    'check to always show slot\ntypes in the input dialog':
        'abilitare per mostrare sempre i tipi degli slot\nnella finestra di creazione degli input',
    'uncheck to use the input\ndialog in short form':
        'disabilitare per non mostrare automaticamente i tipi degli slot\nnella finestra di creazione degli input',
    'Virtual keyboard':
        'Tastiera virtuale',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'disabilitare per non usare il supporto\ndella tastiera virtuale con i dispositivi mobili',

    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'abilitare per usare il supporto della\ntastiera virtuale con i dispositivi mobili',

    'Input sliders':
        'Usa cursore per gli input',
    'uncheck to disable\ninput sliders for\nentry fields':
        'disabilitare per non visualizzare i cursori\n per inserire valori numerici',
    'check to enable\ninput sliders for\nentry fields':
        'abilitare per visualizzare i cursori\n per inserire valori numerici',
    'Retina display support':
        'Supporto schermo Retina',
    'uncheck for lower resolution,\nsaves computing resources':
	    'disabilitare per bassa risoluzione,\nrisparmi risorse di calcolo',
    'check for higher resolution,\nuses more computing resources':
	    'abilitare per alta risoluzione,\nusa maggiori risorse di calcolo',
    'Codification support':
        'Supporto codificazione',
    'Clicking sound':
        'Click di aggancio dei blocchi',
    'uncheck to turn\nblock clicking\nsound off':
        'disabilitare per non riprodurre il suono di aggancio dei blocchi',
    'check to turn\nblock clicking\nsound on':
        'abilitare per riprodurre il suono di aggancio dei blocchi',
    'Animations':
        'Animazioni',
    'uncheck to disable\nIDE animations':
        'disabilitare per non consentire\nanimazioni dell\u0027IDE',
    'Turbo mode':
        'Modalit\u00E0 Turbo',
    'check to prioritize\nscript execution':
        'abilitare per dare priorit\u00E0\nall\u0027esecuzione degli script',
    'uncheck to run scripts\nat normal speed':
        'disabilitare per eseguire gli script\na velocitÃ  normale',
    'check to enable\nIDE animations':
        'abilitare per nconsentire\nanimazioni dell\u0027IDE',
    'Flat design':
        'Aspetto piatto interfaccia',
    'check for alternative\nGUI design':
        'abilitare per GUI alternativa',
    'uncheck for default\nGUI design':
        'disabilitare per GUI standard',
    'Nested auto-wrapping':
        'Autowrapping annidato',
    'Keyboard Editing':
        'Modifica della tastiera',
    'Table support':
        'Supporto per le tabelle',
    'Table lines':
        'Tabelle con linee',
    'Visible stepping':
        'Esecuzione passo-passo',
    'Thread safe scripts':
        'Script interrompibili',
    'uncheck to allow\nscript reentrance':
	    'disabilitare per\npermettere di interrompere gli script',
    'check to disallow\nscript reentrance':
	    'abilitare per\nimpedire di interrompere gli script',
    'Prefer smooth animations':
        'Animazioni a framerate fisso',
    'uncheck for greater speed\nat variable frame rates':
        'disabilitare per massima velocitÃ \na framerate variabile',
    'check for smooth, predictable\nanimations across computers':
        'abilitare per avere animazioni\nfluide su tutti i computer',
    'Flat line ends':
        'Estremit\u00E0 delle linee squadrata',
    'check for flat ends of lines':
        'abilitare per estremit\u00E0 delle linee squadrate',
    'uncheck for round ends of lines':
        'disabilitare per estremit\u00E0 delle linee arrotondate',
    'Ternary Boolean slots':
        'Argomenti Booleani Ternari',
    'Inheritance support':
        'Supporto ereditarietÃ  degli sprite',
    'Hyper blocks support':
        'Supporto Iperblocchi',
    'uncheck to disable\nusing operators on lists and tables':
         'disabilitare per non usare\ngli operatori su liste e tabelle',
    'check to enable\nusing operators on lists and tables':
         'abilitare per usare\ngli operatori su liste e tabelle',
    'Log pen vectors':
        'Log dei vettori della penna',
    'uncheck to turn off\nlogging pen vectors':
        'disattiva per non loggare\ni vettori della penna',
    'check to turn on\nlogging pen vectors':
        'attiva per loggare\ni vettori della penna',


    // inputs
    'with inputs':
        'con argomenti',
    'input names:':
        'con variabili:',
    'Input Names:':
        'Con Variabili:',
    'input list:':
        'con liste:',

    // context menus:
    'help':
        'aiuto',

    // palette:
    'find blocks':
        'trova blocchi',
    'hide primitives':
        'nascondi primitive',
    'show primitives':
        'mostra primitive',

    // blocks:
    'help...':
        'aiuto...',
    'relabel...':
        'rinomina...',
    'compile':
        'compila',
    'uncompile':
        'decompila',
    'duplicate':
        'duplica',
    'make a copy\nand pick it up':
        'crea una copia',
    'only duplicate this block':
        'duplica solo questo blocco',
    'extract':
        'estrai',
    'only grab this block':
        'estrae solo questo blocco',
    'delete':
        'cancella',
    'senders...':
        'mittenti...',
    'receivers...':
        'destinatari...',
    'script pic...':
        'immagine script...',
    'save a picture\nof this script':
        'salva un\'immagine\ndi questo script',
    'result pic...':
        'immagine risultato...',
    'save a picture of both\nthis script and its result':
        'salva un\'immagine\ndello scrip e del risultato',
    'ringify':
        'inserisci in un anello',
    'unringify':
        'estrai dall\'anello',
    'transient':
        'non persistente',
    'uncheck to save contents\nin the project':
        'disabilitare per salvare i contenuti\nnel progetto',
    'check to prevent contents\nfrom being saved':
        'abilitare per prevenire\nil salvataggio dei contenuti',
    'new line':
        'neue Zeile',

    // custom blocks:
    'delete block definition...':
        'cancella la definizione del blocco...',
    'duplicate block definition...':
        'duplica la definizione del blocco...',
    'export block definition...':
        'esporta la definizione del blocco...',
    'including dependencies':
        'incluse le dipendenze',
    'edit...':
        'modifica...',

    // sprites
    'edit':
        'modifica',
    'clone':
        'clona',
    'move':
        'muovi',
    'pivot':
        'Angelpunkt',
    'edit the costume\'s\nrotation center':
        'cambia il centro di rotazione\ndel costume',
    'rotate':
    	'ruota',
    'stick to':
        'attacca a',
    'detach from':
        'stacca da',
    'detach all parts':
        'stacca tutte le parti',
    'export...':
        'esporta...',
    'parent...':
        'genitore...',
    'current parent':
        'genitore attuale',
    'release':
        'rilascia',
    'make temporary and\nhide in the sprite corral':
        'diventa temporaneo e\nnasconditi nel corral degli sprite',

    // stage:
    'show all':
        'mostra tutti gli sprite',
    'pic...':
        'salva immagine dello Stage...',
    'save a picture\nof the stage':
        'salva immagine\ndello Stage',
    'svg...':
        'esporta come SVG...',
    'export pen trails\nline segments as SVG':
        'esporta i tratti\ndella penna come SVG',
    'there are currently no\nvectorizable pen trail segments':
        'al momento non sono presenti\ntratti della penna vettoriali',
    'turn all pen trails and stamps\ninto a new background for the stage':
        'crea un nuovo sfondo\nusando tratti della penna e timbri',
    'turn all pen trails and stamps\ninto a new costume for the\ncurrently selected sprite':
        'crea un nuovo costume\nper lo sprite selezionato\nusando i tratti della penna e i timbri',

    // scripting area
    'clean up':
        'riordina',
    'arrange scripts\nvertically':
        'riordina gli script\nuno sotto l\'altro',
    'add comment':
        'aggiungi un commento',
    'undrop':
        'annulla inserimento',
    'undo the last\nblock drop\nin this pane':
        'annulla ultimo inserimento\ndi un blocco\n in questo pannello',
    'redrop':
        'ripristina ultimo inserimento\ndi un blocco\n in questo pannello',
    'use the keyboard\nto enter blocks':
    	'usa la tastiera\nper inserire blocchi',
    'scripts pic...':
        'immagine script...',
    'save a picture\nof all scripts':
        'salva immagine\ndi tutti gli script',
    'make a block...':
        'crea un blocco...',

    // costumes
    'rename':
        'rinomina',
    'export':
        'esporta',
    'rename costume':
        'rinomina costume',
    'rename background':
        'rinomina sfondo',

    // sounds
    'Play sound':
        'Riproduci\nquesto suono',
    'Stop sound':
        'Ferma\nil suono',
    'Stop':
        'Stop',
    'Play':
        'Play',
    'rename sound':
        'rinomina suono',

    // lists and tables
    'list view...':
        'vista lista...',
    'table view...':
        'vista tabella...',
    'Table view':
        'Vista tabella',
    'open in dialog...':
        'apri in una finestra...',
    'blockify':
        'crea script',
    'reset columns':
        'resetta colonne',
    'items':
        'elementi',

    // dialogs
    // buttons
    'OK':
        'OK',
    'Ok':
        'OK',
    'Cancel':
        'Annulla',
    'Yes':
        'Si',
    'No':
        'No',

    // help
    'Help':
        'Aiuto',

    // zoom blocks
    'Zoom blocks':
        'Zoom dei blocchi',
    'build':
        'costruisci',
    'your own':
        'i tuoi',
    'blocks':
        'blocchi',
    'normal (1x)':
        'normale (1x)',
    'demo (1.2x)':
        'Demo (1.2x)',
    'presentation (1.4x)':
        'presentazione(1.4x)',
    'big (2x)':
        'grandi (2x)',
    'huge (4x)':
        'molto grandi (4x)',
    'giant (8x)':
        'giganti (8x)',
    'monstrous (10x)':
        'grandissimi (10x)',

    // fade blocks
    'Fade blocks':
        'Trasparenza blocchi',
    'block-solid (0)':
        'nessuna (0)',
    'medium (50)':
        'media (50)',
    'light (70)':
        'leggera (70)',
    'shimmering (80)':
        'accentuata (80)',
    'elegant (90)':
        'elevata(90)',
    'subtle (95)':
        'molto elevata (95)',
    'text-only (100)':
        'solo testo (100)',

    // Project Manager
    'Untitled':
        'Senza Titolo',
    'Open Project':
        'Apri Progetto',
    'Open':
        'Apri',
    '(empty)':
        '(vuoto)',
    'Saved!':
        'Salvato!',
    'Delete Project':
        'Elimina Progetto',
    'Are you sure you want to delete':
        'Sei sicuro di voler eliminare',
    'rename...':
        'rinomina...',
    'Examples':
        'Esempi',
    'Share':
        'Condividi',
    'Unshare':
        'Non condividere',
    'Publish':
        'Pubblica',
    'Unpublish':
        'Non pubblicare',
    'Updating\nproject list...':
        'Aggiornamento\nlista dei progetti...',
    'Recover':
        'Recupera',
    'Today':
        'Oggi',
    'Yesterday':
        'Ieri',

    // costume editor
    'Costume Editor':
        'Editor di Costumi',
    'Paint Editor':
        'Editor di Immagini',
    'click or drag crosshairs to move the rotation center':
        'clicca e trascina la croce per spostare il centro di rotazione',
    'undo':
        'annulla',
    'Vector':
        'Immagine vettoriale',
    'Paintbrush tool\n(free draw)':
        'Pennello\n(disegno a mano libera)',
    'Stroked Rectangle\n(shift: square)':
        'Rettangolo\n(shift: quadrato)',
    'Stroked Ellipse\n(shift: circle)':
        'Ellisse\n(shift: cerchio)',
    'Eraser tool':
        'Gomma',
    'Set the rotation center':
        'Imposta il centro di rotazione',
    'Line tool\n(shift: vertical/horizontal)':
        'Linea\n(shift: verticale/orizzontale)',
    'Filled Rectangle\n(shift: square)':
        'Rettangolo pieno\n(shift: quadrato)',
    'Filled Ellipse\n(shift: circle)':
        'Ellisse piena\n(shift: cerchio)',
    'Fill a region':
        'Riempie un\'area',
    'Pipette tool\n(pick a color anywhere)':
        'Contagocce\n(seleziona un colore)',
    'Brush size':
        'Dimensione pennello',
    'Constrain proportions of shapes?\n(you can also hold shift)':
        'Vincola proporzioni delle forme?\n(in alternativa puoi\ntenere premuto shift)',
    //'grow':
    //    'grÃ¶ÃŸer',
    //'shrink':
    //    'kleiner',
    //'flip â†”':
    //    'drehen â†”',
    //'flip â†•':
    //    'drehen â†•',

    'Vector Paint Editor':
        'Editor di Immagini Vettoriale',
    'Rectangle\n(shift: square)':
        'Rettangolo\n(shift: quadrato)',
    'Ellipse\n(shift: circle)':
        'Ellisse\n(shift: cerchio)',
    'Selection tool':
        'Selezione',
    'Line tool\n(shift: constrain to 45Âº)':
        'Linea\n(shift: linee a 45Â°)',
    'Closed brush\n(free draw)':
        'Pennello\n(disegno a mano libera)',
    'Paint a shape\n(shift: secondary color)':
        'Colora una forma\n(shift: colore secondario)',
    'Pipette tool\n(pick a color from anywhere\nshift: secondary color)':
        'Contagocce\n(seleziona un colore\nshift: colore secondario)',
    'Edge color\n(left click)':
        'Colore Bordo\n(click sinistro)',
    'Fill color\n(right click)':
        'Colore riempimento\n(click destro)',
   // 'Top':
   //     'oben',
   // 'Bottom':
   //     'unten',
   // 'Up':
   //     'nach oben',
   // 'Down':
   //     'nach unten',


    // project notes
    'Project Notes':
        'Note di Progetto',

    // new project
    'New Project':
        'Nuovo Progetto',
    'Replace the current project with a new one?':
        'Vuoi sostituire il progetto attuale con uno nuovo?',

    // save project
    'Save Project As...':
        'Salva Progetto Come...',
    'Save Project':
        'Salva Progetto',

    // export blocks
    'Export blocks':
        'Esporta blocchi',
    'Import blocks':
        'Importa blocchi',
    'this project doesn\'t have any\ncustom global blocks yet':
        'in questo progetto non sono stati ancora definiti dei nuovi blocchi',
    'select':
        'seleziona',
    'none':
        'nessuno',

    // variable dialog
    'for all sprites':
        'per tutti gli sprite',
    'for this sprite only':
        'solo per questo sprite',

    // variables refactoring
    'rename only\nthis reporter':
        'rinomina solo\nquesto blocco',
    'rename all...':
        'rinomina tutto...',
    'rename all blocks that\naccess this variable':
        'rinomina tutti i blocchi che\naccedono questa variabile',


    // block dialog
    'Change block':
        'Cambia categoria e tipo del blocco',
    'Command':
        'Comando',
    'Reporter':
        'Monitor',
    'Predicate':
        'Condizione',

    // block editor
    'Block Editor':
        'Editor di Blocchi',
    'Method Editor':
        'Editor di Metodi',
    'Apply':
        'Applica',

    // block deletion dialog
    'Delete Custom Block':
        'Cancella Blocco',
    'block deletion dialog text':
        'Sei sicuro di voler cancellare questo blocco\n' +
            'e tutte le sue occorrenze?',

    // input dialog
    'Create input name':
        'Crea parametro',
    'Edit input name':
        'Modifica parametro',
    'Edit label fragment':
        'Modifica porzione di etichetta',
    'Title text':
        'Parole della definizione',
    'Input name':
        'Parametro',
    'Delete':
        'Cancella',
    'Object':
        'Oggetto',
    'Number':
        'Numero',
    'Text':
        'Testo',
    'List':
        'Lista',
    'Any type':
        'Qualunque tipo',
    'Boolean (T/F)':
        'Booleano (V/F)',
    'Command\n(inline)':
        'Comando\n(in linea)',
    'Command\n(C-shape)':
        'Comando \n(a forma di C)',
    'Any\n(unevaluated)':
        'Qualunque\n(non valutato)',
    'Boolean\n(unevaluated)':
        'Booleano\n(non valutato)',
    'Single input.':
        'Un solo valore.',
    'Default Value:':
        'Valore predefinito:',
    'Multiple inputs (value is list of inputs)':
        'Molti valori (il valore \u00E8 una lista di argomenti)',
    'Upvar - make internal variable visible to caller':
        'Rendi il parametro visibile all\'esterno',

    // About Snap
    'About Snap':
        'Informazioni su Snap',
    'Back...':
        'Indietro...',
    'License...':
        'Licenza...',
    'Modules...':
        'Moduli...',
    'Credits...':
        'Crediti...',
    'Translators...':
        'Traduttori',
    'License':
        'Licenza',
    'current module versions:':
        'versione corrente dei moduli:',
    'Contributors':
        'Hanno contribuito:',
    'Translations':
        'Traduzioni',

    // variable watchers
    'normal':
        'normale',
    'large':
        'grande',
    'slider':
        'cursore',
    'slider min...':
        'Scegli il min del cursore...',
    'slider max...':
        'Scegli il max del cursore...',
    'import...':
        'importa...',
    'raw data...':
        'formato originale...',
    'import without attempting to\nparse or format data':
        'importa i dati senza tentare\ndi elaborarli o formattarli',
    'Slider minimum value':
        'Valore minimo del cursore',
    'Slider maximum value':
        'Valore massimo del cursore',

    // list watchers
    'length: ':
        'lunghezza: ',

    // coments
    'add comment here...':
        'aggiunto un commento in questo punto...',
    'comment pic...':
        'immagine commento...',
    'save a picture\nof this comment':
        'salva un\'immagine\ndi questo commento',

    // drow downs
    // directions
    '(90) right':
        '(90) destra',
    '(-90) left':
        '(-90) sinistra',
    '(0) up':
        '(0) su',
    '(180) down':
        '(180) gi\u00F9',
    'random':
    	'casuale',
     'random position':
     	'posizione casuale',

    // collision detection
    'mouse-pointer':
        'puntatore del mouse',
    'edge':
        'bordo',
    'pen trails':
        'tratti della penna',
    'center':
        'centro dello Stage',

    // costumes
    'Turtle':
        'Tartaruga',
    'Empty':
        'Vuoto',
    'Paint a new costume':
        'Disegna un nuovo costume',
    'Import a new costume from your webcam':
        'Scatta una foto con la webcam',
	'Please make sure your web browser is up to date\nand your camera is properly configured. \n\nSome browsers also require you to access Snap!\nthrough HTTPS to use the camera.\n\nPlase replace the "http://" part of the address\nin your browser by "https://" and try again.':
        'Assicurati che il tuo browser sia aggiornato\ne che la webcam sia correttamente configurata. \n\nAlcuni browser richiedono di accedere a Snap!\via HTTPS"',
    'Camera':
        'Webcam',

    // sounds
    'Record a new sound':
        'Registra un suono',


    // graphical effects
    'color':
        'colore',
    'hue':
        'tonalit\u00E0',
    'fisheye':
        'fisheye',
    'whirl':
        'mulinello',
    'pixelate':
        'pixel',
    'mosaic':
        'mosaico',
    'saturation':
        'saturazione',
    'brightness':
        'luminosit\u00E0',
    'transparency':
        'trasparenza',
    'ghost':
        'fantasma',
    'negative':
        'negativo',
    'comic':
        'fumetto',
    'confetti':
        'coriandoli',

    // keys
    'space':
        'spazio',
    'up arrow':
        'freccia su',
    'down arrow':
        'freccia gi\u00F9',
    'right arrow':
        'freccia destra',
    'left arrow':
        'freccia sinistra',
    'any key':
        'qualsiasi tasto',
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
        'nuovo...',
    '__shout__go__':
        'cliccata bandiera verde',

    // math functions
    'abs':
        'abs',
    'ceiling':
        'intero superiore',
    'floor':
        'intero superiore',
    'sqrt':
        'sqrt',
    'sin':
        'sen',
    'cos':
        'cos',
    'tan':
        'tan',
    'asin':
        'asen',
    'acos':
        'acos',
    'atan':
        'atan',
    'ln':
        'ln',
    'e^':
        'e^',

    // Boolean expressions keyboard entry
    'not':
        'non',

    // delimiters
    'letter':
        'lettera',
    'word':
        'parola',
    'whitespace':
        'spazio',
    'line':
        'linea',
    'tab':
        'tabulatore',
    'cr':
        'Accapo',

    // data types
    'number':
        'numero',
    'text':
        'testo',
    'Boolean':
        'booleano',
    'list':
        'lista',
    'command':
        'comando',
    'reporter':
        'monitor',
    'predicate':
        'condizione',
    'sprite':
        'oggetto',

    // list indices
    'last':
        'ultimo',
    'any':
        'qualunque',

    // attributes
    'my':
        'attributo',
    'neighbors':
        'vicini',
    'self':
        'me stesso',
    'other sprites':
        'altri sprite',
    'parts':
        'parti',
    'anchor':
        'ancoraggio',
    'parent':
        'genitore',
    'temporary?':
        'temporaneo',
    'children':
        'figli',
    'clones':
        'cloni',
    'other clones':
        'altri cloni',
    'dangling?':
        'appeso',
    'draggable?':
        'trascinabile',
    'rotation style':
        'stile di rotazione',
    'rotation x':
        'x del centro di rotazione',
    'rotation y':
        'y del centro di rotazione',
    'center x':
        'x del centro',
    'center y':
        'y del centro',
    'name':
        'nome',
    'costume':
        'costume',
    'stage':
        'stage',
    'costumes':
        'costumi',
    'sounds':
        'suoni',
    'scripts':
        'script',
    'width':
        'larghezza',
    'height':
        'altezza',
    'left':
        'estremo sinistro',
    'right':
        'estremo destro',
    'top':
        'estremo superiore',
    'bottom':
        'estremo inferiore',

    // attributes in the SET block's dropdown
    'my anchor':
        'ancora',
    'my parent':
        'genitore',
    'my name':
        'nome',
    'my temporary?':
        'temporaneo',
    'my dangling?':
        'appeso',
    'my draggable?':
        'trascinabile',
    'my rotation style':
        'stile di rotazione',
    'my rotation x':
        'rotazione x',
    'my rotation y':
        'rotazione y',

    // inheritance
    'inherited':
        'ereditato',
    'check to inherit\nfrom':
        'abilita per ereditare',
    'uncheck to\ndisinherit':
        'disabilita per non ereditare'
};

