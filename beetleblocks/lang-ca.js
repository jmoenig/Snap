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
		'Exportar model 3D a STL',
	'Export 3D model as OBJ':
		'Exportar model 3D a OBJ',
	'Reset Camera':
		'Reinicia càmera',
	'Zoom to fit':
		'Mostra escena sencera',
	'Set background color':
		'Defineix el color de fons',
	'Set grid interval':
		'Defineix l\'interval de la graella',
	'Set grid color':
		'Defineix el color de la graella',
	'Turbo mode':
		'Mode turbo',
	'Beetle':
		'Beetle',
	'Axes':
		'Eixos',
	'Wireframe':
		'Model de filferros',
	'2D mode':
		'Mode 2D',
	'Grid':
		'Graella',
	'Position: ':
		'Posició: ',
	'Rotation: ':
		'Rotació: ',
	'Scale: ':
		'Escala: ',
	'Color: ':
		'Color: ',
	'HSL:' :
		'HSL: ',
	'Opacity: ':
		'Opacitat: ',
	'Grid intervals':
		'Intervals de la graella:',
	'x interval':
		'interval x',
	'y interval':
		'interval y',
	'export as STL':
		'exportar a STL',
	'export as OBJ':
		'exportar a OBJ',

	// Movement
	'go home':
		'torna a casa',
	'move %n':
		'mou-te %n passos',
	'rotate %axes by %n':
		'rota la %axes en %n graus',
	'go to x: %n y: %n z: %n':
		'ves a x: %n y: %n z: %n',
	'set %axes to %n':
		'fixa la %axes a %n',
	'change absolute %axes by %n':
		'canvia la %axes absoluta en %n',
	'set %axes rotation to %n':
		'fixa la rotació %axes a %n',
	'point to x: %n y: %n z: %n':
		'apunta a x: %n y: %n z: %n',
	'%axes position':
		'posició %axes',
	'%axes rotation':
		'rotació %axes',
	'push position':
		'apila posició',
	'pop position':
		'desempila posició',
	'set scale to %n':
		'fixa l\'escala a %n',
	'change scale by %n':
		'canvia l\'escala en %n',
	'scale':
		'escala',
	'origin':
		'origen',
	
	// Control
	'reset':
		'reinicia',

	// Shapes
	'Shapes':
		'Formes',
	'cube Dim. %n':
		'cub Dim. %n',
	'cuboid l: %n w: %n h: %n':
		'cuboide ll. %n am. %n al. %n',
	'sphere Dia. %n':
		'esfera Dia. %n',
	'tube l: %n outer: %n inner: %n':
		'tub ll. %n ext: %n int: %n',
	'text %s H: %n W: %n':
		'text %s al. %n am. %n',
	'hello':
		'hola',
	'2D text %s size: %n':
		'text 2D %s mida: %n',
	'start drawing %drawStyle':
		'comença a dibuixar %drawStyle',
	'stop drawing':
		'deixa de dibuixar',
        'lines':
                'línies',
        'splines':
                'corbes',
        'curves':
                'corbes',
	'start extruding %drawStyle':
		'comença a extrudir %drawStyle',
	'stop extruding':
		'deixa d\'extrudir',
	'set extrusion Dia. to %n':
		'fixa el Dia. d\'extrusió a %n',
	'change extrusion Dia. by %n':
		'canvia el Dia. d\'extrusió en %n',
	'start negative geometry':
		'activa la geometria negativa',
	'stop negative geometry':
		'desactiva la geometria negativa',

	// Colors
	'Colors':
		'Colors',
	'set %hsla to %n':
		'fixa %hsla a %n',
	'change %hsla by %n':
		'canvia %hsla en %n',
	'color %hsla':
		'%hsla del color',
	'hue':
		'to',
	'saturation':
		'saturació',
	'lightness':
		'brillantor',
	'opacity':
		'opacitat',

	// Sensors
	'request user input %s':
		'demana %s a l\'usuari',

	// My blocks
	'My blocks':
		'Blocs propis',

	// Missing strings
	'JavaScript function ( %mult%s ) { %code }':
		'funció JavaScript ( %mult%s ) { %code }',
	'Reset Password...':
		'Restablir contrasenya...',
	'Reset password':
		'Restablir contrasenya',
	'User name:':
		'Nom d\'usuari:',
	'User name:':
		'Nom d\'usuari:',
	'Codification support':
		'Suport per a codificació',
	'check for block\nto text mapping features':
		'marca\'m per activar les\nfuncionalitats de conversió\nde blocs a codi',
	'current %dates':
		'%dates actual',
	'year':
		'any',
	'month':
		'mes',
	'date':
		'dia',
	'day of week':
		'dia de la setmana',
	'hour':
		'hora',
	'minute':
		'minut',
	'second':
		'segon',
	'time in milliseconds':
		'temps en milisegons'
};

// Add attributes to original SnapTranslator.dict.ca
for (var attrname in tempDict) { SnapTranslator.dict.ca[attrname] = tempDict[attrname]; }
