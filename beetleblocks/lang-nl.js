tempDict = {

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

	// UI
	'Export 3D model as STL':
		'Exporteer 3D-model als STL',
	'Export 3D model as OBJ':
		'Exporteer 3D-model als OBJ',
	'Reset Camera':
		'Reset camera',
	'Zoom to fit':
		'Passend maken',
	'Set background color':
		'Achtergrondkleur instellen',
	'Set grid interval':
		'Raster-interval instellen',
	'Set grid color':
		'Raster-kleur instellen',
	'Turbo mode':
		'Turbo-modus',
	'Beetle':
		'Kever',
	'Axes':
		'Assen',
	'Wireframe':
		'Wireframe',
	'2D mode':
		'2D modus',
	'Grid':
		'Raster',
	'Position: ':
		'Positie: ',
	'Rotation: ':
		'Rotatie: ',
	'Scale: ':
		'Schaal: ',
	'Color: ':
		'Kleur: ',
	'HSL: ':
		'HSL: ',
	'Opacity: ':
		'Ondoorzichtigheid: ',
	'Grid intervals':
		'Raster-interval:',
	'x interval':
		'x-interval',
	'y interval':
		'y-interval',
	'export as STL':
		'exporteer als STL',
	'export as OBJ':
		'exporteer als OBJ',

	// Movement
	'go home':
		'naar home',
	'move %n':
		'verplaats %n',
	'rotate %axes by %n':
		'draai %axes met %n',
	'go to x: %n y: %n z: %n':
		'ga naar x: %n y: %n z: %n',
	'set %axes to %n':
		'maak %axes %n',
	'change absolute %axes by %n':
		'verander %axes absoluut met %n',
	'set %axes rotation to %n':
		'maak %axes -rotatie %n',
	'point to x: %n y: %n z: %n':
		'wijs naar x: %n y: %n z: %n',
	'%axes position':
		'%axes -positie',
	'%axes rotation':
		'%axes -rotatie',
	'push position':
		'push positie',
	'pop position':
		'pop positie',
	'set scale to %n':
		'maak schaal %n',
	'change scale by %n':
		'verander schaal met %n',
	'scale':
		'schaal',
	'origin':
		'oorsprong',
	
	// Control
	'reset':
		'reset',

	// Shapes
	'Shapes':
		'Vormen',
	'cube Dim. %n':
		'kubus afm. %n',
	'cuboid l: %n w: %n h: %n':
		'kuboid l: %n b: %n h: %n',
	'sphere Dia. %n':
		'bol diam. %n',
	'tube l: %n outer: %n inner: %n':
		'buis l: %n buiten: %n binnen: %n',
	'text %s H: %n W: %n':
		'tekst %s h: %n b: %n',
	'hello':
		'hallo',
	'2D text %s size: %n':
		'2D-tekst %s formaat: %n',
  'start drawing %drawStyle':
		'start tekenen %drawStyle',
	'stop drawing':
		'stop tekenen',
  'lines':
    'lijnen',
  'splines':
    'splines',
	'start extruding':
		'start extruden',
	'stop extruding':
		'stop extruden',
	'set extrusion Dia. to %n':
		'maak extrusie-diam. %n',
	'change extrusion Dia. by %n':
		'verander extrusie-diam. met %n',
	'start negative geometry':
		'start negatieve geometrie',
	'stop negative geometry':
		'stop negatieve geometrie',

	// Colors
	'Colors':
		'Kleuren',
	'set %hsla to %n':
		'maak %hsla %n',
	'change %hsla by %n':
		'verander %hsla met %n',
	'color %hsla':
		'kleur %hsla',
	'hue':
		'tint',
	'saturation':
		'verzadiging',
	'lightness':
		'helderheid',
	'opacity':
		'ondoorzichtigheid',

	// Sensors
	'request user input %s':
		'gebruikersinvoer %s',

	// My blocks
	'My blocks':
		'Mijn blokken',

	// Missing strings
	'JavaScript function ( %mult%s ) { %code }':
		'JavaScript-functie ( %mult%s ) { %code }',
	'Reset Password...':
		'Wachtwoord herstellen...',
	'Reset password':
		'Wachtwoord herstellen',
	'User name:':
		'Gebruikersnaam:',
	'User name:':
		'Gebruikersnaam:',
	'Codification support':
		'Codoficatie-ondersteuning',
	'check for block\nto text mapping features':
		'inschakelen voor blok\nnaar tekst-\nmapping-mogelijkheden',
	'current %dates':
		'huidig(e) %dates',
	'year':
		'jaar',
	'month':
		'maand',
	'date':
		'datum',
	'day of week':
		'dag van de week',
	'hour':
		'uur',
	'minute':
		'minuut',
	'second':
		'seconde',
	'time in milliseconds':
		'tijd in milliseconden'
};

// Add attributes to original SnapTranslator.dict.es
for (var attrname in tempDict) { SnapTranslator.dict.nl[attrname] = tempDict[attrname]; }
