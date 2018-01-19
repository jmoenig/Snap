s4aTempDict = {

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

    // arduino:

	'digital input':
		'masukan digital',

	'digital output':
		'keluaran digital',

	'PWM':
		'PWM',

	'servo':
		'servo',

	'clockwise':
		'searah jarum jam',

	'clockwise (1500-1000)':
		'searah jarum jam (1500-1000)',

	'counter-clockwise':
		'berlawanan jarum jam',

	'counter-clockwise (1500-2000)':
		'berlawanan jarum jam (1500-2000)',

	'stopped':
		'berhenti',

	'stopped (1500)':
		'berhenti (1500)',

	'angle (0-180)':
		'sudut (0-180)',

    'connect to Arduino':
        'hubungkan dengan Arduino',

    'disconnect Arduino':
        'lepaskan hubungan dengan Arduino',

    'Connect Arduino':
        'Hubungkan Arduino',

    'Disconnect Arduino':
        'Lepaskan hubungan Arduino',

    'analog reading %analogPin':
        'pembacaan analog %analogPin',

    'digital reading %digitalPin':
        'pembacaan digital %digitalPin',

    'connect arduino at %s':
        'hubungkan arduino ke port %s',

    'disconnect arduino':
        'lepaskan hubungan dengan arduino',

    'setup digital pin %digitalPin as %pinMode':
        'atur pin digital %digitalPin sebagai %pinMode',

    'set digital pin %digitalPin to %b':
        'set pin digital %digitalPin menjadi %b',

    'set servo %servoPin to %servoValue':
        'set servo %servoPin menjadi %servoValue',

    'set pin %pwmPin to value %n':
        'set pin %pwmPin menjadi bernilai %n',

    'Connecting board at port\n':
        'Menghubungkan target pada port\n',

    'An Arduino board has been connected. Happy prototyping!':
        'Target telah terhubung. Selamat berkarya!',

    'Board was disconnected from port\n':
        'Target telah terlepas dari port\n',

    'It seems that someone pulled the cable!':
        'Sepertinya ada yang mencabut kabelnya!',

    'Error connecting the board.':
        'Terjadi kesalahan saat menghubungkan target',

    'There is already a board connected to this sprite':
        'Sudah ada target yang terhubung ke sprite ini',

    'Could not connect an Arduino\nNo boards found':
        'Tidak dapat terhubung dengan Arduino\nTarget tidak ditemukan',

    'Could not talk to Arduino in port\n':
        'Tidak dapat terhubung dengan Arduino pada port\n',

    'Check if firmata is loaded.':
        'Periksalah apakah firmata telah terpasang.',

    'An error was detected on the board\n\n':
        'Ditemukan adanya kesalahan pada target\n\n',

    'Board is not connected':
        'Target tidak terhubung',

    'New Arduino translatable project':
        'Buat proyek yang dapat dikonversi ke Arduino', 

    'select a port':
        'pilih port',

    'Network port':
        'Port jaringan',

    'Enter hostname or ip address:':
        'masukkan nama host atau alamat ip:',

    'Connecting to network port:\n':
        'Menghubungkan ke port jaringan:\n',

    'This may take a few seconds...':
        'Ini mungkin membutuhkan beberapa detik...',

    'Network serial ports':
	'Port serial jaringan'
};

// Add attributes to original SnapTranslator.dict.id
for (var attrname in s4aTempDict) { SnapTranslator.dict.id[attrname] = s4aTempDict[attrname]; }
