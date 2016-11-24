/*

	lang-it.js

	Italian  translation for SNAP!

	written by Jens Mönig

	Copyright (C) 2012 by Jens Mönig

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

    Ä, ä   \u00c4, \u00e4
    Ö, ö   \u00d6, \u00f6
    Ü, ü   \u00dc, \u00fc
    ß      \u00df
*/

    // translations meta information
    'language_name':
        'Italiano', // the name as it should appear in the language menu
    'language_translator':
        'Stefano Federici, Alberto Firpo, Massimo Ghisalberti', // your name for the Translators tab
    'translator_e-mail':
        's_federici@yahoo.com, albertofirpo12@gmail.com, zairik@gmail.com', // optional
    'last_changed':
        '2016-10-31', // this, too, will appear in the Translators tab

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
    'change %eff effect by %n':
        'cambia effetto %eff di %n',
    'set %eff effect to %n':
        'porta effetto %eff a %n',
    'clear graphic effects':
        'rimuovi effetti grafici',
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
    'go to front':
        'vai in primo piano',
    'go back %n layers':
        'vai indietro di %n livelli',

    'development mode \ndebugging primitives:':
        'modalit\u00E0 sviluppo\nComandi di debug',
    'console log %mult%s':
        'console log: %mult%s',
    'alert %mult%s':
        'avviso: %mult%s',

    // sound:
    'play sound %snd':
        'produci suono %snd',
    'play sound %snd until done':
        'produci suono %snd e attendi la fine',
    'stop all sounds':
        'arresta tutti i suoni',
    'rest for %n beats':
        'fai una pausa di %n battute',
    'play note %n for %n beats':
        'suona nota %n per %n battute',
    'change tempo by %n':
        'cambia tempo di %n',
    'set tempo to %n bpm':
        'porta tempo a %n bpm',
    'tempo':
        'tempo',

    // pen:
    'clear':
        'pulisci',
    'pen down':
        'penna gi\u00F9',
    'pen up':
        'penna su',
    'set pen color to %clr':
        'usa penna di colore %clr',
    'change pen color by %n':
        'cambia colore penna di %n',
    'set pen color to %n':
        'usa penna di colore %n',
    'change pen shade by %n':
        'cambia luminosit\u00E0 penna di %n',
    'set pen shade to %n':
        'porta luminosit\u00E0 penna a %n',
    'change pen size by %n':
        'cambia dimensione penna di %n',
    'set pen size to %n':
        'porta dimensione penna a %n',
    'stamp':
        'timbra',
    'fill':
        'riempi',

    // control:
    'when %b':
        'quando %b',
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
        'il mouse entra',
    'mouse-departed':
        'il mouse esce',
    'when I am clicked':
        'quando vengo cliccato',
    'when I receive %msgHat':
        'quando ricevo %msgHat',
    'broadcast %msg':
        'invia a tutti %msg',
    'broadcast %msg and wait':
        'invia a tutti %msg e attendi',
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
    'forever %c':
        'per sempre %c',
    'repeat %n %c':
        'ripeti %n volte %c',
    'repeat until %b %c':
        'ripeti fino a quando %b %c',
    'if %b %c':
        'se %b %c',
    'if %b %c else %c':
        'se %b %c altrimenti %c',
    'report %s':
        'risultato %s',
    'stop block':
        'ferma il blocco',
	  'stop %stopOthersChoices':
		  'ferma %stopOthersChoices',
	  'stop %stopChoices':
		  'ferma %stopChoices',        
        
    'all':
        'tutti',
    'this script':
        'questo script',
    'this block':
        'questo Blocco',
    'stop script':
        'ferma lo script',
    'stop all %stop':
        'ferma tutto %stop',
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
    'myself':
        'me stesso',
    'delete this clone':
        'elimina questo clone',

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
    'distance to %dst':
        'distanza da %dst',
    'reset timer':
        'azzera cronometro',
    'timer':
        'cronometro',
    '%att of %spr':
        '%att di %spr',
    'my %get':
        'attributo %get',
    'http:// %s':
        'leggi pagina web http:// %s',
    'turbo mode?':
        'modalit\u00E0 turbo attiva',
    'set turbo mode to %b':
        'porta modalit\u00E0 turbo a %b',
        
    'current %dates':
        '%dates attuale',
        
  	'year':
          'anno',
    'month':
          'mese',
    'date':
          'giorno',
    'hour':
          'ora',
    'minute':
          'minuto',
    'second':
          'secondo',
    'time in milliseconds':
	    'ora in millisecondi',
    'day of week':
	    'giorno della settimana',

    'filtered for %clr':
        'selezionati per colore %clr',
    'stack size':
        'dimensione stack',
    'frames':
        'frame',

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
        'separa %s di %delim',
    'hello':
        'ciao',
    'world':
        'mondo',
    'letter %n of %s':
        'lettera in posizione %n di %s',
    'length of %s':
        'lunghezza di %s',
    'unicode of %s':
        'codice unicode di %s',
    'unicode %n as letter':
        'lettera del codice unicode %n',
    'is %s a %typ ?':
        '%s \u00E8 di tipo %typ',
    'is %s identical to %s ?':
        '%s \u00E8 identico a %s ?',
    'type of %s':
        'tipo di %s',
    'JavaScript function ( %mult%s ) { %code }':
        'funzione JavaScript ( %mult%s ) { %code }',

    // variables:
    'Make a variable':
        'Nuova variabile',
    'Variable name':
        'Nome della variabile?',
    'Script variable name':
        'Nome della variabile locale?',
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

    'Export summary...':
        'Esporta sommario...',
    'open a new browser browser window\n with a summary of this project':
        'apre una nuova finestra del browser\ncon un sommario del progetto',

    // project menu
    'Project notes...':
        'Note di Progetto...',
    'New':
        'Nuovo',
    'Open...':
        'Apri...',
    'Save':
        'Salva',
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
    'show project data as XML\nin a new browser window':
        'mostra i dati del progetto in formato XML\nin una nuova finestra del browser',
    'Export blocks...':
        'Esporta blocchi...',
    'show global custom block definitions as XML\nin a new browser window':
        'mostra in formato XML le definizione dei nuovi blocchi\nin una nuova finestra del browser',
    'Import tools':
        'Importa tools',
    'load the official library of\npowerful blocks':
        'carica la libreria ufficiale di\nblocchi Snap',
   'Libraries...':
        'Modulo...',
    'Import library':
        'Importa modulo',

    // cloud menu
    'Login...':
        'Accedi...',
    'Signup...':
        'Registrati...',

    // settings menu
    'Language...':
        'Lingua...',
    'Zoom blocks...':
        'Zoom dei blocchi...',
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
        'Usa slider per gli input',
    'uncheck to disable\ninput sliders for\nentry fields':
        'disabilitare per non visualizzare gli slider\n per inserire valori numerici',
    'check to enable\ninput sliders for\nentry fields':
        'abilitare per visualizzare gli slider\n per inserire valori numerici',
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
        'disabilitare per eseguire gli script\na velocità normale',
    'check to enable\nIDE animations':
        'abilitare per nconsentire\nanimazioni dell\u0027IDE',
    'Thread safe scripts':
        'Script sicuri per i thread',
    'check to disallow\nscript reentrance':
        'attivare per disabilitare\nla \'rientranza\' degli script',
    'uncheck to allow\nscript reentrance':
        'disattivare per abilitare\nla \'rientranza\' degli script',
    'uncheck to allow\nscript reentrancy':
        'disabilitare per permettere agli script di rientrare',
    'check to disallow\nscript reentrancy':
        'abilitare per impedire agli script di rientrare',
    'Prefer smooth animations':
        'Animazioni a framerate fisso',
    'uncheck for greater speed\nat variable frame rates':
        'disabilitare per massima velocità\na framerate variabile',
    'check for smooth, predictable\nanimations across computers':
        'abilitare per avere animazioni\nfluide su tutti i computer',
    'Flat line ends':
        'fine linea piana',
    'check for flat ends of lines':
        'abilitare per fine linea netti',
    'uncheck for round ends of lines':
        'disabilitare per fine linea arrotondati',
    'Inheritance support':
        'Supporto ereditarietà degli sprite',
    'check for sprite\ninheritance features':
        'attivare per\n la ereditarietà degli sprite',   
     'uncheck to disable\nsprite inheritance features':   
        'disattivare per rimuovere\n la ereditarietà degli sprite',  
    'Codification support':
        'Supporto per il codice nei blocchi',
    'check for block\nto text mapping features':
        'attivare per il supporto\n al codice nei blocchi',
    'uncheck to disable\nblock to text mapping features':
        'disattivare per disabilitare\n il supporto al codice nei blocchi',
    'Flat design':
        'Aspetto piatto interfaccia',
    'check for alternative\nGUI design':
        'attivare per una interfaccia alternativa',  
    'uncheck for default\nGUI design':
        'disattivare per la interfaccia normale',       
    'Keyboard Editing':
        'Modifica della tastiera',
    'check to enable\nkeyboard editing support':
        'attivare per la modifica della tastiera',
    'uncheck to disable\nkeyboard editing support':
        'disattivare per la modifica della tastiera',
    'Table support':
        'Supporto per le tabelle',
    'Table lines':
        'Tabelle con linee',
    'Visible stepping':
        'Evidenzia esecuzione',
    'uncheck to turn off\nvisible stepping':
        'Deseleziona per disattivare la\nevidenziazione dell\'esecuzione',
    'check to turn on\n visible stepping (slow)':
        'Seleziona per attivare la\nevidenziazione dell\'esecuzione',
    'check for multi-column\nlist view support':
        'attiva la vista multicolonna',
    'uncheck to disable\nmulti-column list views':
        'disattiva la vista multicolonna',
    'check for higher contrast\ntable views':
        'attivare per un maggior contrasto',
    'uncheck for less contrast\nmulti-column list views':
        'disattivare per un minor contrasto',
        
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
    'hide primitives':
        'nascondi primitive',
    'show primitives':
        'mostra primitive',

    // blocks:
    'help...':
        'aiuto...',
    'relabel...':
        'rinomina...',
    'duplicate':
        'duplica',
    'make a copy\nand pick it up':
        'crea una copia',
    'only duplicate this block':
        'duplica solo questo blocco',
    'delete':
        'cancella',
    'script pic...':
        'immagine script...',
    'open a new window\nwith a picture of this script':
        'apri una nuova finestra\ncon un\'immagine di questo script',
    'ringify':
        'inserisci in un anello',
    'unringify':
        'estrai dall\'anello',

    // custom blocks:
    'delete block definition...':
        'cancella la definizione del blocco...',
    'edit...':
        'modifica...',

    // sprites:
    'edit':
        'modifica',
    'move':
        'muovi',
    'detach from':
        'stacca da',
    'detach all parts':
        'stacca tutte le parti',
    'export...':
        'esporta...',

    // stage:
    'show all':
        'mostra tutti gli sprite',
    'pic...':
        'salva immagine dello Stage...',
    'open a new window\nwith a picture of the stage':
        'apre una nuova finestra con un\u0027immagine dello Stage',

    // scripting area
    'clean up':
        'riordina',
    'arrange scripts\nvertically':
        'riordina gli script\nuno sotto l\'altro',
    'add comment':
        'aggiungi un commento',
    'undrop':
        'annulla cancellazione',
    'undo the last\nblock drop\nin this pane':
        'annulla ultima cancellazione\ndi blocco\n in questo pannello',
    'scripts pic...':
        'immagine script...',
    'open a new window\nwith a picture of all scripts':
        'apri una nuova finestra\ncon immagine dello script',

    'make a block...':
        'crea un blocco...',

    // costumes
    'rename':
        'rinomina',
    'export':
        'esporta',
    'rename costume':
        'rinomina costume',

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

    // Project Manager
    'Untitled':
        'Senza Titolo',
    'Open Project':
        'Apri Progetto',
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

    // costume editor
    'Costume Editor':
        'Editor di Immagini',
    'click or drag crosshairs to move the rotation center':
        'clicca e trascina la croce per spostare il centro di rotazione',

    // project notes
    'Project Notes':
        'Note di Progetto',

    // new project
    'New Project':
        'Nuovo Progetto',
    'Replace the current project with a new one?':
        'Vuoi sostituire il progetto attuale con uno nuovo?',

    // open project
    'Open Projekt':
        'Apri Progetto',

    // save project
    'Save Project As...':
        'Salva Progetto Come...',

    // export blocks
    'Export blocks':
        'Esporta blocchi',
    'Import blocks':
        'Importa blocchi',
    'this project doesn\'t have any\ncustom global blocks yet':
        'in questo progetto non sono stati ancora definiti dei nuovi blocchi',
    'select':
        'seleziona',
    'all':
        'tutti',
    'none':
        'nessuno',

    // variable dialog
    'for all sprites':
        'per tutti gli sprite',
    'for this sprite only':
        'solo per questo sprite',

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
        'Traduttori',

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

    // collision detection
    'mouse-pointer':
        'puntatore del mouse',
    'edge':
        'bordo',
    'pen trails':
        'tratti della penna',

    // costumes
    'Turtle':
        'Tartaruga',
    'Empty':
        'Vuoto',

    // graphical effects
    'brightness':
        'Luminosita',
    'ghost':
        'fantasma',
    'negative':
        'negativo',
    'comic':
        'comic',
    'confetti':
        'confetti',


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

    // math functions
    'abs':
        'abs',
    'sqrt':
        'sqrt',
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
        'lettera',
    'whitespace':
        'spazio',
    'line':
        'linea',
    'tab':
        'tabulatore',
    'cr':
        'A capo',

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

    // list indices
    'last':
        'ultimo',
    'any':
        'qualunque',
        
    // attributes
    'neighbors':
        'vicinato',
    'self':
        'me stesso',
    'other sprites':
        'altri sprite',
    'parts':
        'parti',
    'anchor':
        'ancora',
    'parent':
        'genitore',
    'children':
        'figli',
    'clones':
        'cloni',
    'other clones':
        'altri cloni',
    'dangling?':
        'pendente?',
    'rotation x':
        'rotazione x',
    'rotation y':
        'rotazione y',
    'center x':
        'centro x',
    'center y':
        'centro y',
    'name':
        'nome',
    'stage':
        'stage',    
    
    // Paint.js
    'Paint editor':
        'Editor grafico',
    'undo':
        'annulla',
    'Paintbrush tool\n(free draw)':
        'Pennello (disegno libero)',
    'Stroked Rectangle\n(shift: square)':
        'Rettangolo\n(shift: quadrato)',
    'Stroked Ellipse\n(shift: circle)':
        'Ellisse\n(shift: cerchio)',
    'Eraser tool':
        'Gomma per cancellare',
    'Set the rotation center':
        'imposta centro di rotazione',
    'Line tool\n(shift: vertical/horizontal)':
        'Linea\n(shift: verticale/orizzontale)',
    'Filled Rectangle\n(shift: square)':
        'Rettangolo pieno\n(shift: quadrato)',
    'Filled Ellipse\n(shift: circle)':
        'Ellisse piena\n(shift: cerchio)',
    'Fill a region':
        'Riempi un\'area',
    'Pipette tool\n(pick a color anywhere)':
        'contagocce\n(preleva un colore dovunque)',
    'grow':
        'ingrandisci',
    'shrink':
        'rimpicciolisci',
    'flip \u2194':
        'capovolgi ↔ ',
    'flip \u2195':
        'capovolgi ↕',
    'Brush size':
        'dimensione del pennello',
    'Constrain proportions of shapes?\n(you can also hold shift)':
        'Costringi le proporzioni della figura?\n(puoi tenere premuto il tasto: shift)',

    // thread.js
    'a variable of name \'':
        'una variabile di nome \'',
    '\'\ndoes not exist in this context':
        '\'\nnon esiste in questo contesto',
    'expecting':
        'aspettando',
    'input(s), but getting':
        'entra(s), ma arriva'
};
