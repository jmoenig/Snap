/*

	lang-de.js

	German translation for SNAP!

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

SnapTranslator.dict.fr = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    Ä, ä   \u00c4, \u00e4
    Ö, ö   \u00d6, \u00f6
    Ü, ü   \u00dc, \u00fc
    ß      \u00df
*/

    // translations meta information
    'language_name':
        'Fran\u00E7ais', // the name as it should appear in the language menu
    'language_translator':
        'Jean-Jacques Valliet - Mark Rafter', // your name for the Translators tab
    'translator_e-mail':
        'i.scool@mac.com', // optional
    'last_changed':
        '2012-11-27', // this, too, will appear in the Translators tab

    // GUI
    // control bar:
    'untitled':
        'Sans Titre',
    'development mode':
        'mode de d\u00E9veloppeur',

    // categories:
    'Motion':
        'Mouvement',
    'Looks':
        'Apparence',
    'Sound':
        'Sons',
    'Pen':
        'Stylo',
    'Control':
        'Contr\u00F4les',
    'Sensing':
        'Capteurs',
    'Operators':
        'Op\u00E9rateurs',
    'Variables':
        'Variables',
    'Lists':
        'Listes',
    'Other':
        'Autres',

    // editor:
    'draggable':
        'd\u00E9pla\u00E7able avec la souris',

    // tabs:
    'Scripts':
        'Scripts',
    'Costumes':
        'Costumes',
    'Sounds':
        'Sons',
		
   // names:
    'Sprite':
        'Lutin',
    'Stage':
        'Sc\u00E8ne',

    // rotation styles:
    'don\'t rotate':
        'le lutin ne pivote pas \nautour de son centre de rotation',
    'can rotate':
        'le lutin pivote \nautour de son centre de rotation',
    'only face left/right':
        'le lutin reste en position horizontale \nsoit vers la gauche soit vers la droite ',

    // new sprite button:
    'add a new Sprite':
        'ajouter un nouveau lutin',

    // tab help
    'costumes tab help':
        'Importer une image depuis votre ordinateur ou une page web \npar un presser-glisser-d\u00E9poser dans l\u0027aire des costumes',
    'import a sound from your computer\nby dragging it into here':
        'Importer un son depuis votre ordinateur \npar un presser-glisser-d\u00E9poser dans l\u0027aire des sons',

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
        'Stage selected:\nno motion primitives'
            + 'disponible',

    'move %n steps':
        'avancer de %n pas',
    'turn %clockwise %n degrees':
        'tourner de %n degr\u00E9s  %clockwise' ,
    'turn %counterclockwise %n degrees':
        'tourner de %n degr\u00E9s  %counterclockwise',
    'point in direction %dir':
        'se diriger en faisant un angle de %dir',
    'point towards %dst':
        'se diriger vers %dst',
    'go to x: %n y: %n':
        'aller \u00E0 x: %n y: %n',
    'go to %dst':
        'aller \u00E0 %dst',
    'glide %n secs to x: %n y: %n':
        'glisser en %n sec. \u00E0 x: %n y: %n',
    'change x by %n':
        'ajouter %n \u00E0 x',
    'set x to %n':
        'donner la valeur %n \u00E0 x',
    'change y by %n':
        'ajouter %n \u00E0 y',
    'set y to %n':
        'donner la valeur %n \u00E0 y',
    'if on edge, bounce':
        'rebondir si le bord est atteint',
    'x position':
        'position x',
    'y position':
        'position y',
    'direction':
        'direction',

    // looks:
    'switch to costume %cst':
        'basculer sur le costume %cst',
    'next costume':
        'costume suivant',
    'costume #':
        'costume n\u00B0',
    'say %s for %n secs':
        'dire %s pendant %n sec.',
    'say %s':
        'dire %s',
    'think %s for %n secs':
        'penser %s pendant %n sec.',
    'think %s':
        'penser %s',
    'Hello!':
        'Salut!',
    'Hmm...':
        'Mmmh...',
    'change %eff effect by %n':
        'ajouter  \u00E0 l\u0027effet %eff  %n',
    'set %eff effect to %n':
        'mettre l\u0027effet %eff \u00E0 %n',
    'clear graphic effects':
        'annuler les effets graphiques',
    'change size by %n':
        'ajouter %n \u00E0 la taille',
    'set size to %n %':
        'choisir %n % de la taille initiale',
    'size':
        'taille',
    'show':
        'montrer',
    'hide':
        'cacher',
    'go to front':
        'envoyer au premier plan',
    'go back %n layers':
        'd\u00E9placer de %n plan arri\u00E8re',

    'development mode \ndebugging primitives:':
        'mode d\u00E9veloppement \ndebugging primitives:',
    'console log %mult%s':
        'console log %mult%s',
    'alert %mult%s':
        'Pop-up: %mult%s',

    // sound:
    'play sound %snd':
        'jouer le son %snd',
    'play sound %snd until done':
        'jouer le son %snd jusqu\u0027au bout',
    'stop all sounds':
        'arr\u00EAter tous les sons',
    'rest for %n beats':
        'faire une pause pour %n temps',
    'play note %n for %n beats':
        'jouer la note %n pour %n temps',
    'change tempo by %n':
        'ajouter %n au tempo',
    'set tempo to %n bpm':
        'choisir le tempo \u00E0 %n bpm',
    'tempo':
        'tempo',

    // pen:
    'clear':
        'effacer tout',
    'pen down':
        'stylo en position d\u0027\u00EAcriture',
    'pen up':
        'relever le stylo',
    'set pen color to %clr':
        'mettre la couleur %clr pour le stylo',
    'change pen color by %n':
        'ajouter %n \u00E0 la couleur du stylo',
    'set pen color to %n':
        'choisir la couleur %n pour le stylo',
    'change pen shade by %n':
        'ajouter %n \u00E0 l\u0027intensit\u00E9 du stylo ',
    'set pen shade to %n':
        'choisir l\u0027intensit\u00E9 %n pour le stylo',
    'change pen size by %n':
        'ajouter %n \u00E0 la taille du stylo ',
    'set pen size to %n':
        'choisir la taille %n pour le stylo',
    'stamp':
        'estampiller',

      // control:
    'when %greenflag clicked':
        'Quand %greenflag est press\u00E9',
    'when %key key pressed':
        'Quand %key est press\u00E9',
    'when I am clicked':
        'Quand je suis press\u00E9 ',
    'when I receive %msg':
        'Quand je re\u00E7ois %msg',
    'broadcast %msg':
        'envoyer \u00E0 tous %msg',
    'broadcast %msg and wait':
        'envoyer \u00E0 tous %msg et attendre',
    'Message name':
        'Nom du message',
    'wait %n secs':
        'attends %n sec.',
    'wait until %b':
        'attendre jusqu\u0027\u00E0 %b',
    'forever %c':
        'r\u00E9p\u00E9ter ind\u00E9finiment %c',
    'repeat %n %c':
        'r\u00E9p\u00E9ter %n fois %c',
    'repeat until %b %c':
        'r\u00E9p\u00E9ter ind\u00E9finiment si %b %c',
    'if %b %c':
        'si %b  %c',
    'if %b %c else %c':
        'si %b  %c sinon %c',
    'report %s':
        'rapporte %s',
    'stop block':
        'arr\u00EAter le bloc',
    'stop script':
        'arr\u00EAter le script',
    'stop all %stop':
        'arr\u00EAter tout %stop',
    'run %cmdRing %inputs':
        'ex\u00E9cute %cmdRing  %inputs',
    'launch %cmdRing %inputs':
        'lance %cmdRing %inputs',
    'call %repRing %inputs':
        'appelle %repRing  %inputs',
    'run %cmdRing w/continuation':
        'run %cmdRing w/continuation',
    'call %cmdRing w/continuation':
        'call %cmdRing w/continuation',
    'warp %c':
        'Warp %c',

     // sensing:
    'touching %col ?':
        ' %col touch\u00E9?',
    'touching %clr ?':
        ' couleur %clr touch\u00E9e?',
    'color %clr is touching %clr ?':
        'couleur %clr touche %clr ?',
    'ask %s and wait':
        'demander %s et attendre',
    'what\'s your name?':
        'Quel est ton nom?',
    'answer':
        'r\u00E9ponse',
    'mouse x':
        'souris x',
    'mouse y':
        'souris y',
    'mouse down?':
        'souris press\u00E9e?',
    'key %key pressed?':
        'touche %key press\u00E9e?',
    'distance to %dst':
        'distance de %dst',
    'reset timer':
        'r\u00E9initialiser le chronom\u00E8tre',
    'timer':
        'chronom\u00E8tre',
    'http:// %s':
        'http:// %s',

    'filtered for %clr':
        'filtr\u00E9 pour %clr ',
    'stack size':
        'taille de la pile',
    'frames':
        'cadres',

    // operators:
    '%n mod %n':
        '%n mod %n',
    'round %n':
        'arrondi de %n',
    '%fun of %n':
        '%fun appliqu\u00E9 \u00E0 %n',
    'pick random %n to %n':
        'nombre al\u00E9atoire entre %n et %n',
    '%b and %b':
        '%b et %b',
    '%b or %b':
        '%b ou %b',
    'not %b':
        'non %b',
    'true':
        'vrai',
    'false':
        'faux',
    'join %words':
        'regroupe %words',
    'hello':
        'Bonjour',
    'world':
        'Monde',
    'letter %n of %s':
        'lettre %n de %s',
    'length of %s':
        'longueur de %s',
    'unicode of %s':
        'valeur unicode de %s',
    'unicode %n as letter':
        'unicode %n comme lettre',
    'is %s a %typ ?':
        'est %s un(e) %typ ?',

    'type of %s':
        'type de %s',

     // variables:
    'Make a variable':
        'Nouvelle variable',
    'Variable name':
        'Nom de la variable',
    'Delete a variable':
        'Supprimer une variable',

    'set %var to %s':
        '%var prend la valeur %s',
    'change %var by %n':
        'ajouter \u00E0 %var %n ',
    'show variable %var':
        'afficher la variable  %var',
    'hide variable %var':
        'cacher la variable %var',
    'script variables %scriptVars':
        'script variables %scriptVars',

    // lists:
    'list %exp':
        'liste %exp',
    '%s in front of %l':
        '%s au d\u00E9but de %l',
    'item %idx of %l':
        '\u00E9l\u00E9ment %idx de %l',
    'all but first of %l':
        'tous sauf le premier de  %l',
    'length of %l':
        'longueur de %l',
    '%l contains %s':
        '%l contient %s',
    'thing':
        'qqchose',
    'add %s to %l':
        'ajouter %s \u00E0 %l',
    'delete %ida of %l':
        'supprimer l\u0027\u00E9l\u00E9ment %ida de %l',
    'insert %s at %idx of %l':
        'ins\u00E9rer %s en position %idx de %l',
    'replace item %idx of %l with %s':
        'remplacer l\u0027\u00E9l\u00E9ment %idx de %l par %s',

    // other
    'Make a block':
        'Nouveau bloc',

   // menus
    // snap menu
    'About...':
        'A propos de Snap! ...',
    'Snap! website':
        'Snap! le site web',
    'Download source':
        'T\u00E9l\u00E9charger le code source',
    'Switch back to user mode':
        'Revenir en mode utilisateur',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'd\u00E9sactiver la fonction morphic',
    'Switch to dev mode':
        'Passer en mode d\u00E9velopper',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'activer la fonction morphic',

    // project menu
    'Project Notes...':
        'Notes du projet...',
    'New':
        'Nouveau',
    'Open...':
        'Ouvrir...',
    'Save':
        'Sauvegarder',
    'Save As...':
        'Sauvegarder sous...',
    'Import...':
        'Importer...',
    'file menu import hint':
        'importer un projet export\u00E9,\nune biblioth\u00E8que de '
            + 'blocs\n'
            + 'un costume ou un son',
    'Export project as plain text ...':
        'Exporter le projet comme texte...',
    'Export project...':
        'Exporter le projet...',
    'show project data as XML\nin a new browser window':
        'ouvrir le projet au format XML\ndans une nouvelle fen\u00EAtre de votre navigateur',
    'Export blocks ...':
        'Exporter les blocs ',
    'show global custom block definitions as XML\nin a new browser window':
        'montrer les d\u00E9finitions de bloc global personnalis\u00E9 au format XML \ndans une nouvelle fen\u00EAtre de navigateur',

    // settings menu
    'Language...':
        'Langue...',
    'Blurred shadows':
        'Ombres floues',
    'uncheck to use solid drop\nshadows and highlights':
        'D\u00E9cocher pour utiliser des rehauts et des ombres \n port\u00E9es floues',
    'check to use blurred drop\nshadows and highlights':
        'Cocher pour utiliser des rehauts et des ombres \n port\u00E9es pleines',
    'Zebra coloring':
        'Colorations altern\u00E9es',
    'check to enable alternating\ncolors for nested blocks':
        'Cocher pour activer des couleurs altern\u00E9es \n pour les blocs embo\u00EEt\u00E9s',
    'uncheck to disable alternating\ncolors for nested block':
        'D\u00E9cocher pour d\u00E9sactiver des couleurs altern\u00E9es \n pour les blocs embo\u00EEt\u00E9s',
    'Prefer empty slot drops':
        'Pr\u00E9f\u00E9rer des entr\u00E9es vides',
    'settings menu prefer empty slots hint':
        'Cocher pour pr\u00E9f\u00E9rer des entr\u00E9es vides \n'
            + 'lors du glisser-d\u00E9poser d\u0027un reporter',
    'uncheck to allow dropped\nreporters to kick out others':
        'D\u00E9cocher pour ne pas pr\u00E9f\u00E9rer des entr\u00E9es vides \n'
		+ 'lors du glisser-d\u00E9poser d\u0027un reporter',
    'Long form input dialog':
        'Bo\u00EEte d\u0027entr\u00E9e en mode d\u00E9taill\u00E9',
    'check to always show slot\ntypes in the input dialog':
        'Cocher pour toujours ouvrir la bo\u00EEte de dialogue \nd\u0027entr\u00E9e en mode d\u00E9taill\u00E9 : avec tous les types de blocs',
    'uncheck to use the input\ndialog in short form':
        'D\u00E9cocher pour utiliser la bo\u00EEte de dialogue \nd\u0027entr\u00E9e en mode simple ',
    'Virtual keyboard':
        'Clavier virtuel',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'D\u00E9cocher pour d\u00E9sactiver le clavier virtuel pour \nles tablettes et smartphones : mobile devices  ',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'Cocher pour activer le clavier virtuel pour \nles tablettes et smartphones : mobile devices  ',
    'Input sliders':
        'Entr\u00E9e curseurs',
    'uncheck to disable\ninput sliders for\nentry fields':
        'D\u00E9cocher pour d\u00E9sactiver le curseur coulissant \ndans le champ de saisie',
    'check to enable\ninput sliders for\nentry fields':
        'Cocher pour activer un curseur coulissant \ndans le champ de saisie ',
    'Clicking sound':
        'Cliquetis',
    'uncheck to turn\nblock clicking\nsound off':
        'D\u00E9cocher pour d\u00E9sactiver le cliquetis \n'
		+'lors de l\u0027embo\u00EEtement des blocs' ,
    'check to turn\nblock clicking\nsound on':
        'Cocher pour activer le cliquetis \n'
		+'lors de l\u0027embo\u00EEtement des blocs',
    'Thread safe scripts':
        'Scripts thread-safe',
    'uncheck to allow\nscript reentrancy':
        'D\u00E9cocher pour permettre\n des scripts r\u00E9entrants',
    'check to disallow\nscript reentrancy':
        'Cocher pour interdire\n des scripts r\u00E9entrants',
    // inputs
    'with inputs':
        'avec entr\u00E9es',
    'input names:':
        'renseigner un nom:',
    'Input Names:':
        'renseigner un nom:',

    // context menus:
    'help':
        'Aide',

    // blocks:
    'help...':
        'Aide...',
    'duplicate':
        'dupliquer',
    'make a copy\nand pick it up':
        'faire une copie\n et le d\u00E9placer',
    'delete':
        'supprimer',
    'script pic...':
        'image du script...',
    'open a new window\nwith a picture of this script':
        'ouvrir une nouvelle fen\u00EAtre avec une \nimage .png de ce script',
    'ringify':
        'entourer',
    'unringify':
        'd\u00E9tourer',

    // custom blocks:
    'delete block definition...':
        'supprimer les d\u00E9finitions de bloc',
    'edit...':
        '\u00E9diter...',

    // sprites:
    'edit':
        '\u00E9diter',
    'export...':
        'exporter...',

    // scripting area
    'clean up':
        'effacer',
    'arrange scripts\nvertically':
        'arrange scripts\nvertically',
    'add comment':
        'ajouter un commentaire',
    'make a block...':
        'cr\u00E9er un nouveau bloc...',

        // costumes
    'rename':
        'renommer',
    'export':
        'exporter',
    'rename costume':
        'renommer un costume',

    // sounds
    'Play sound':
        'jouer un son',
    'Stop sound':
        'arr\u00EAter un son',
    'Stop':
        'arr\u00EAter',
    'Play':
        'jouer',
    'rename sound':
        'renommer un son',

    // dialogs
    // buttons
    'OK':
        'OK',
    'Ok':
        'Ok',
    'Cancel':
        'Annuler',
    'Yes':
        'Oui',
    'No':
        'Non',

    // help
    'Help':
        'Aide',

    // Project Manager
    'Untitled':
        'Sans titre',
    'Open Project':
        'Ouvrir un projet',
    '(empty)':
        '(vide)',
    'Saved!':
        'Enregistr\u00EA !',
    'Delete Project':
        'Supprimer un projet',
    'Are you sure you want to delete':
        'Est ce que vous voulez le supprimer?',
    'rename...':
        'Renommer',

     // costume editor
    'Costume Editor':
        '\u00EAditeur de costumes',
    'click or drag crosshairs to move the rotation center':
        'cliquez ou faites d\u00EAfiler la ligne de mire  pour d\u00EAfinir le centre de rotation du costume',

    // project notes
    'Project Notes':
        'Notes du projet',

    // new project
    'New Project':
        'Nouveau projet',
    'Replace the current project with a new one?':
        'Remplacer le projet actuel par un nouveau?',

    // open project
    'Open Projekt':
        'Ouvrir un projet',

    // save project
    'Save Project As...':
        'Sauvegarder un projet sous...',

    // export blocks
    'Export blocks':
        'exporter des blocs',
    'this project doesn\'t have any\ncustom global blocks yet':
        'ce projet ne contient pas \nde bloc global personnalis\u00E9',
    'select':
        's\u00E9lectionner',
    'all':
        'tout',
    'none':
        'aucun',

    // variable dialog
    'for all sprites':
        'pour tous les lutins',
    'for this sprite only':
        'pour ce lutin uniquement',

    // block dialog
    'Change block':
        'Changer le bloc',
    'Command':
        'Commande',
    'Reporter':
        'Reporter',
    'Predicate':
        'Pr\u00E9dicat',

 // block editor
    'Block Editor':
        '\u00C9diteur de bloc',
    'Apply':
        'Appliquer',

    // block deletion dialog
    'Delete Custom Block':
        'Effacer le bloc personnalis\u00E9',
    'block deletion dialog text':
        'Etes-vous s\u00FBr de supprimer ce bloc personnalis\u00E9 \net ' +
            'toutes ces instances?',

    // input dialog
     'Create input name':
        'Cr\u00E9er le nom de l\u0027entr\u00E9e',
    'Edit input name':
        '\u00C9diter le nom de l\u0027entr\u00E9e',
    'Edit label fragment':
        '\u00C9diter le fragment du label',
    'Title text':
        'Texte du titre',
    'Input name':
        'Nom de l\u0027entr\u00E9e',
    'Delete':
        'Supprimer',
    'Object':
        'Objet',
    'Number':
        'Nombre',
    'Text':
        'Texte',
    'List':
        'Liste',
    'Any type':
        'Tout type',
    'Boolean (T/F)':
        'Bool\u00E9en (V/F)',
    'Command\n(inline)':
        'Commande\n(en ligne)',
    'Command\n(C-shape)':
        'Commande\n(en forme de C)',
    'Any\n(unevaluated)':
        'Tout type\n(non \u00E9valu\u00E9e)',
    'Boolean\n(unevaluated)':
        'Bool\u00E9en\n(non \u00E9valu\u00E9e)',
    'Single input.':
        'Entr\u00E9e unique.',
    'Default Value:':
        'Valeur par d\u00E9faut:',
    'Multiple inputs (value is list of inputs)':
        'Entr\u00E9es multiples (la valeur est une liste des entr\u00E9es)',
    'Upvar - make internal variable visible to caller':
        'Upvar - Rendre la variable interne visible pour l\u0027appelant',
  // About Snap
    'About Snap':
        'A propos de Snap',
    'Back...':
        'Retour...',
    'License...':
        'Licence...',
    'Modules...':
        'Modules...',
    'Credits...':
        'Contributeurs...',
    'Translators...':
        'Traducteurs',
    'License':
        'License',
    'current module versions:':
        'Versions du module courant',
    'Contributors':
        'Contributeurs',
    'Translations':
        'Traductions',

    // variable watchers
    'normal':
        'normal',
    'large':
        'grand',
    'slider':
        'curseur',
    'slider min...':
        'min...',
    'slider max...':
        'max...',
    'Slider minimum value':
        'Valeur minimale du curseur',
    'Slider maximum value':
        'Valeur maximale du curseur',

    // list watchers
    'length: ':
        'Longueur: ',

    // coments
    'add comment here...':
        'ajoute un commentaire ici',

    // drow downs
    // directions
    '(90) right':
        '(90) \u00E0 droite',
    '(-90) left':
        '(-90) \u00E0 gauche',
    '(0) up':
        '(0) vers le haut',
    '(180) right':
        '(180) vers le bas',

    // collision detection
    'mouse-pointer':
        'pointeur souris',
    'edge':
        'bord',
    'pen trails':
        'traces de stylo',

    // costumes
    'Turtle':
        'Pointeur',

    // graphical effects
    'ghost':
        'transparence',

    // keys
    'space':
        'espace',
    'up arrow':
        'fl\u00E8che vers le haut',
    'down arrow':
        'fl\u00E8che vers le bas',
    'right arrow':
        'fl\u00E8che vers la droite',
    'left arrow':
        'fl\u00E8che vers la gauche',
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
        'nouveau...',

    // math functions
    'abs':
        'v. absolue',
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

    // data types
    'number':
        'nombre',
    'text':
        'texte',
    'Boolean':
        'bool\u00E9en',
    'list':
        'liste',
    'command':
        'bloc de commande',
    'reporter':
        'bloc reporter',
    'predicate':
        'pr\u00E9dicat',

    // list indices
    'last':
        'dernier',
    'any':
        'n\u0027importe quel'
};
