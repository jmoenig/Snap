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
		'Exportar modelo 3D a STL',
	'Export 3D model as OBJ':
		'Exportar modelo 3D a OBJ',
	'Reset Camera':
		'Reinicia cámara',
	'Zoom to fit':
		'Muestra escena completa',
	'Set background color':
		'Define el color de fondo',
	'Set grid interval':
		'Define el intervalo de la rejilla',
	'Set grid color':
		'Define el color de rejilla',
	'Turbo mode':
		'Modo turbo',
	'Beetle':
		'Beetle',
	'Axes':
		'Ejes',
	'Wireframe':
		'Modelo de alambre',
	'Parallel projection':
		'Proyección paralela',
	'Grid':
		'Rejilla',
	'Position: ':
		'Posición: ',
	'Rotation: ':
		'Rotación: ',
	'Scale: ':
		'Escala: ',
	'Color: ':
		'Color: ',
	'HSL: ':
		'HSL: ',
	'Opacity: ':
		'Opacidad: ',
	'Grid intervals':
		'Intervalos de la rejilla:',
	'x interval':
		'intervalo x',
	'y interval':
		'intervalo y',
	'export as STL':
		'exportar a STL',
	'export as OBJ':
		'exportar a OBJ',

	// Movement
	'go home':
		'vuelve a casa',
	'move %n':
		'muévete %n pasos',
	'rotate %axes by %n':
		'rota la %axes en %n grados',
	'go to x: %n y: %n z: %n':
		've a x: %n y: %n z: %n',
	'set %axes to %n':
		'fija la %axes a %n',
	'change absolute %axes by %n':
		'cambia la %axes absoluta en %n',
	'set %axes rotation to %n':
		'fija la rotación %axes a %n',
	'point to x: %n y: %n z: %n':
		'apunta a x: %n y: %n z: %n',
	'%axes position':
		'posición %axes',
	'%axes rotation':
		'rotación %axes',
	'push position':
		'apila posición',
	'pop position':
		'desapila posición',
	'set scale to %n':
		'fija la escala a %n',
	'change scale by %n':
		'cambia la escala en %n',
	'scale':
		'escala',
	'origin':
		'origen',
	
	// Control
	'reset':
		'reinicia',

	// Shapes
	'Shapes':
		'Formas',
	'cube Dim. %n':
		'cubo Dim. %n',
	'cuboid l: %n w: %n h: %n':
		'cuboide l. %n an. %n al. %n',
	'sphere Dia. %n':
		'esfera Dia. %n',
	'tube l: %n outer: %n inner: %n':
		'tubo l. %n ext: %n int: %n',
	'text %s H: %n W: %n':
		'texto %s al. %n an. %n',
	'hello':
		'hola',
	'2D text %s size: %n':
		'texto 2D %s tamaño: %n',
        'start drawing %drawStyle':
		'empieza a dibujar %drawStyle',
	'stop drawing':
		'deja de dibujar',
        'lines':
                'líneas',
        'splines':
                'curvas',
        'curves':
                'curvas',
	'start extruding %drawStyle':
		'empieza a extrudir %drawStyle',
	'stop extruding':
		'deja de extrudir',
	'set extrusion Dia. to %n':
		'fija el Dia. de extrusión a %n',
	'change extrusion Dia. by %n':
		'cambia el Dia. de extrusión en %n',
	'start negative geometry':
		'activa la geometria negativa',
	'stop negative geometry':
		'desactiva la geometria negativa',

	// Colors
	'Colors':
		'Colores',
	'set %hsla to %n':
		'fija %hsla a %n',
	'change %hsla by %n':
		'cambia %hsla en %n',
	'color %hsla':
		'%hsla del color',
	'hue':
		'tono',
	'saturation':
		'saturación',
	'lightness':
		'brillo',
	'opacity':
		'opacidad',

	// Sensors
	'request user input %s':
		'pide %s al usuario',

	// My blocks
	'My blocks':
		'Mis bloques',

	// Missing strings
	'JavaScript function ( %mult%s ) { %code }':
		'función JavaScript ( %mult%s ) { %code }',
	'Reset Password...':
		'Reestablecer contraseña...',
	'Reset password':
		'Reestablecer contraseña',
	'User name:':
		'Nombre de usuario:',
	'User name:':
		'Nombre de usuario:',
	'Codification support':
		'Soporte para codificación',
	'check for block\nto text mapping features':
		'márcame para activar las\nfuncionalidades de conversión\nde bloques a código',
	'current %dates':
		'%dates actual',
	'year':
		'año',
	'month':
		'mes',
	'date':
		'día',
	'day of week':
		'día de la semana',
	'hour':
		'hora',
	'minute':
		'minuto',
	'second':
		'segundo',
	'time in milliseconds':
		'tiempo en milisegundos'
};

// Add attributes to original SnapTranslator.dict.es
for (var attrname in tempDict) { SnapTranslator.dict.es[attrname] = tempDict[attrname]; }
