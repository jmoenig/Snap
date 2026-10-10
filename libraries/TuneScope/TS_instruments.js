/* TuneScope instruments: the menu tree and the sound behind every name.
 *
 * Edit this file to add, remove, rename or regroup instruments, then run
 *     node tools/instrument_menus.js
 * to rewrite the instrument menus of the library blocks from it. Names must
 * be unique, since blocks refer to an instrument by name alone.
 *
 *   preset(name, stem[, bends])  a preset converted from a SoundFont by tools/sf2_to_webaudiofont.py:
 *                                sounds/v1/<stem>.js defines the variable _<stem>
 *   font(name, stem[, bends])    a WebAudioFont file kept from the earlier set:
 *                                sounds/v1/<stem>.js defines _tone_<stem>
 *                                (the MP3 recordings of either kind are in sounds/v1/<stem>.bin,
 *                                fetched with the .js file; see tsLoadSamples in TuneScope.js)
 *   kit(name, key[, stem])       one sound of a drum-kit preset, played at that key: the
 *                                Percussion preset, or the preset of the given stem
 *   bends                        true when a glide (/) bends the pitch into the next
 *                                note; otherwise a glide plays every semitone
 *   Percussion group             every sound in it rings for its whole recording,
 *                                whatever note length it is written with
 *
 * Initialize TuneScope loads only the PRELOAD instruments' files. Every other
 * file is fetched the first time one of its instruments is used.
 *
 * ALIASES keeps the names of the earlier set working: the table holds them too,
 * and the engine turns them into the names they mean (window.tsCanonicalInstrument).
 *
 * Loads in the browser (window.tsInstrumentTree, window.tsInstrumentTable,
 * window.tsInstrumentPreload, window.tsCanonicalInstrument, and the engine's
 * window.parent.instrumentData) and in Node (module.exports = {tree, table,
 * aliases, canonical, preload}).
 */
(function () {
    'use strict';

    var SOUNDS = 'libraries/TuneScope/sounds/v1/';
    var PERCUSSION = 'ts_b128_p0_percussion';
    var CHIPTUNE_KIT = 'ts_gb_b0_p127_guitar_drumkit_sub'; // the Game Boy font's noise-channel kit

    function preset(name, stem, bends) { return { name: name, file: SOUNDS + stem + '.js', variable: '_' + stem, bends: !!bends }; }
    function font(name, stem, bends) { return { name: name, file: SOUNDS + stem + '.js', variable: '_tone_' + stem, bends: !!bends }; }
    function kit(name, key, stem) { stem = stem || PERCUSSION; return { name: name, file: SOUNDS + stem + '.js', variable: '_' + stem, drumPitch: key, bends: false }; }
    function group(name, items) { return { group: name, items: items }; }

    var TREE = [
        group('Keyboards', [
            font('Accordion', '0230_Aspirin_sf2_file'),
            preset('Harpsichord', 'ts_b0_p6_harpsichord'),
            preset('Organ, Chiptune', 'ts_gb_b0_p81_scc_organ2'),
            preset('Organ, Church', 'ts_b0_p19_church_organ'),
            preset('Organ, Drawbar', 'ts_b0_p16_drawbar_organ'),
            preset('Organ, Rock', 'ts_b0_p18_rock_organ'),
            preset('Piano', 'ts_b0_p0_acoustic_piano'),
            preset('Piano, Chiptune', 'ts_gb_b0_p83_scc_piano'),
            preset('Piano, Electric 1', 'ts_b0_p4_e_piano_1'),
            preset('Piano, Electric 2', 'ts_b0_p5_e_piano_2'),
            preset('Piano, Toy', 'ts_toy_b5_p0_piano'),
            preset('Piano, Upright', 'ts_b0_p1_upright_piano')
        ]),
        group('Guitars & Basses', [
            preset('Banjo', 'ts_b0_p105_banjo', true),
            preset('Bass 1, Chiptune', 'ts_gb_b0_p37_bass', true),
            preset('Bass 2, Chiptune', 'ts_gb_b0_p38_bass', true),
            preset('Bass, Acoustic', 'ts_b0_p32_acoustic_bass', true),
            preset('Bass, Finger', 'ts_b0_p33_finger_bass', true),
            preset('Bass, Fretless', 'ts_b0_p35_fretless_bass', true),
            preset('Bass, Picked', 'ts_b0_p34_picked_bass', true),
            preset('Bass, Slap', 'ts_b0_p36_slap_bass', true),
            preset('Bass, Synth', 'ts_b0_p38_synth_bass_1', true),
            font('Guitar, Acoustic', '0241_JCLive_sf2_file', true),
            preset('Guitar, Chiptune', 'ts_gb_b0_p28_guitar', true),
            preset('Guitar, Distorted', 'ts_distorted_b0_p0_z_distortion_guitar', true),
            preset('Guitar, Electric', 'ts_b0_p26_jazz_guitar', true),
            font('Guitar, Nylon', '0240_JCLive_sf2_file', true)
        ]),
        group('Strings', [
            preset('Cello', 'ts_b1_p15_cello', true),
            preset('Cello, Mellotron', 'ts_b3_p4_cello', true),
            preset('Contrabass', 'ts_b0_p43_contrabass', true),
            preset('Fiddle', 'ts_b0_p110_fiddle', true),
            preset('Harp', 'ts_b0_p46_harp'),
            preset('Pizz. Violins', 'ts_b1_p26_pizz_violins'),
            preset('Strings', 'ts_b1_p13_strings_2', true),
            preset('Strings 1, Chiptune', 'ts_gb_b0_p42_strings', true),
            preset('Strings 2, Chiptune', 'ts_gb_b0_p45_strings', true),
            preset('Strings, Mellotron', 'ts_b3_p6_string_section', true),
            preset('Viola', 'ts_b1_p16_viola', true),
            preset('Violin', 'ts_b1_p17_violin', true),
            preset('Violin, Mellotron', 'ts_b3_p3_violin', true)
        ]),
        group('Brass', [
            preset('Brass Section', 'ts_b0_p61_brass_section', true),
            preset('Brass, Mellotron', 'ts_mellotron_b0_p9_mkii_brass', true),
            preset('Brass, Synth', 'ts_b0_p62_synth_brass_1', true),
            preset('French Horn', 'ts_b1_p48_french_horn_ff', true),
            preset('Trombone', 'ts_b0_p57_trombone', true),
            preset('Trumpet', 'ts_b1_p45_trumpet_ff', true),
            preset('Tuba', 'ts_b0_p58_tuba', true)
        ]),
        group('Woodwinds', [
            preset('Bassoon', 'ts_b1_p36_bassoon', true),
            preset('Clarinet', 'ts_b1_p33_clarinet', true),
            preset('English Horn', 'ts_b1_p37_english_horn', true),
            preset('Flute', 'ts_b1_p28_flute', true),
            preset('Flute, Mellotron', 'ts_b3_p10_flute', true),
            preset('Flute, Pan', 'ts_b0_p75_pan_flute', true),
            preset('Oboe', 'ts_b1_p38_oboe', true),
            preset('Piccolo', 'ts_b1_p31_piccolo', true),
            preset('Saxophone', 'ts_b0_p66_tenor_sax', true),
            preset('Shakuhachi', 'ts_b0_p77_shakuhachi', true),
            preset('Woodwind, Chiptune', 'ts_gb_b0_p65_winds', true),
            preset('Woodwind, Mellotron', 'ts_b3_p7_woodwind', true)
        ]),
        group('Other', [
            preset('Choir, Mellotron', 'ts_b3_p5_choir', true),
            preset('Dulcimer', 'ts_b0_p15_dulcimer'),
            preset('Harmonica', 'ts_b0_p22_harmonica', true),
            preset('Koto', 'ts_b0_p107_koto', true),
            preset('Orchestra Hit', 'ts_b0_p55_orchestra_hit'),
            preset('Orchestra Hit, Chiptune', 'ts_gb_b0_p55_orchestra_hit'),
            font('Sitar', '1040_Aspirin_sf2_file', true),
            preset('Square Wave 1', 'ts_gb_b0_p22_vrc6_sq_2_16', true),
            preset('Square Wave 2', 'ts_gb_b0_p20_vrc6_sq_4_16', true),
            preset('Square Wave 3', 'ts_gb_b0_p18_vrc6_sq_6_16', true),
            preset('Square Wave 4', 'ts_gb_b0_p16_vrc6_sq_8_16', true),
            preset('Whistle', 'ts_whistle_b0_p0_whistle', true)
        ]),
        group('Percussion', [
            group('Pitched', [
                preset('Glockenspiel', 'ts_b0_p9_glockenspiel'),
                preset('Marimba', 'ts_b0_p12_marimba'),
                preset('Music Box', 'ts_b0_p10_music_box'),
                preset('Timpani', 'ts_b0_p47_timpani'),
                preset('Vibraphone', 'ts_b0_p11_vibraphone'),
                preset('Xylophone', 'ts_b0_p13_xylophone')
            ]),
            group('Bass', [
                kit('Kick 1', 35),
                kit('Kick 2', 36),
                kit('Kick 3', 89)
            ]),
            group('Rims & Claps', [
                kit('Clap, Dry', 106),
                kit('Clap, Wet', 107),
                kit('Rim', 37),
                kit('Slap', 28),
                kit('Sticks', 31)
            ]),
            group('Snares', [
                kit('Snare 1', 38),
                kit('Snare 2', 40),
                kit('Snare 3', 94),
                kit('Snare 4', 95),
                kit('Snare 5', 102),
                kit('Snare 6', 105)
            ]),
            group('Hi-Hats & Toms', [
                kit('Hi-Hat, Closed', 44),
                kit('Hi-Hat, Open', 46),
                kit('Tom, High', 111),
                kit('Tom, High Floor', 43),
                kit('Tom, Low', 110),
                kit('Tom, Low Floor', 41)
            ]),
            group('Cymbals', [
                kit('Cymbal, Crash 1', 49),
                kit('Cymbal, Crash 2', 57),
                kit('Cymbal, Ride 1', 51),
                kit('Cymbal, Ride 2', 59),
                kit('Cymbal, Splash', 55)
            ]),
            group('Blocks & Shakers', [
                kit('Castanets', 85),
                kit('Shaker', 82),
                kit('Tambourine', 54),
                kit('Vibraslap', 58),
                kit('Wood Block, Hi', 76),
                kit('Wood Block, Low', 77)
            ]),
            group('Bells & Triangles', [
                kit('Cowbell, High', 67),
                kit('Cowbell, Low', 68),
                kit('Jingle Bell', 83),
                kit('Triangle', 81),
                preset('Tubular Bell', 'ts_b0_p14_tubular_bell')
            ]),
            group('Latin Drums', [
                kit('Bongo, Hi', 60),
                kit('Bongo, Low', 61),
                kit('Conga, High', 116),
                kit('Conga, Low', 114),
                kit('Conga, Mid', 115),
                kit('Cuica, Mute', 78),
                kit('Cuica, Open', 79),
                kit('Guiro, Long', 74),
                kit('Guiro, Short', 73),
                kit('Surdo, Mute', 86),
                kit('Surdo, Open', 87),
                kit('Timbale, High', 65),
                kit('Timbale, Low', 66)
            ]),
            group('Chiptune', [ // the Game Boy font's kit; CT keeps its names apart from the main kit's
                kit('CT Cowbell', 56, CHIPTUNE_KIT),
                kit('CT Cymbal, Crash', 49, CHIPTUNE_KIT),
                kit('CT Cymbal, Reverse', 55, CHIPTUNE_KIT),
                kit('CT Cymbal, Ride 1', 51, CHIPTUNE_KIT),
                kit('CT Cymbal, Ride 2', 59, CHIPTUNE_KIT),
                kit('CT Cymbal, Ride Bell', 53, CHIPTUNE_KIT),
                kit('CT Hi-Hat, Closed', 42, CHIPTUNE_KIT),
                kit('CT Hi-Hat, Open', 46, CHIPTUNE_KIT),
                kit('CT Kick 1', 36, CHIPTUNE_KIT),
                kit('CT Kick 2', 35, CHIPTUNE_KIT),
                kit('CT Kick 3', 34, CHIPTUNE_KIT),
                kit('CT Snare 1', 40, CHIPTUNE_KIT),
                kit('CT Snare 2', 39, CHIPTUNE_KIT),
                kit('CT Tambourine', 54, CHIPTUNE_KIT),
                kit('CT Tom 1', 52, CHIPTUNE_KIT),
                kit('CT Tom 2', 48, CHIPTUNE_KIT),
                kit('CT Tom 3', 45, CHIPTUNE_KIT),
                kit('CT Tom 4', 41, CHIPTUNE_KIT),
                kit('CT Vibraslap', 58, CHIPTUNE_KIT)
            ]),
            group('Other', [
                kit('Scratch, Pull', 30),
                kit('Scratch, Push', 29)
            ])
        ])
    ];

    // loaded by Initialize TuneScope: the default instrument and the Percussion file
    var PRELOAD = ['Piano', 'Snare 1'];

    // names of the earlier instrument set, so that saved projects still play:
    // old name -> the instrument it means now. They are not in the menus.
    var ALIASES = {
        'Organ': 'Organ, Rock',
        'Bass, Electric (Finger)': 'Bass, Finger', 'Guitar, Overdrive': 'Guitar, Distorted', 'Guitar, Jazz': 'Guitar, Electric', 'Piano, Honky Tonk': 'Piano, Upright',
        'Bass Drum': 'Kick 1', 'Snare Drum': 'Snare 1', 'Closed Hi-Hat': 'Hi-Hat, Closed', 'Open Hi-Hat': 'Hi-Hat, Open',
        'Mid Tom': 'Tom, Low', 'High Tom': 'Tom, High', 'Crash Cymbal': 'Cymbal, Crash 1'
    };

    // name (lower case) -> {label, name: the file's variable, file, bends, percussion, drumPitch?}
    // percussion: every sound under the Percussion group; such a sound rings for
    // its whole recording whatever note length it is written with
    function table(tree) {
        var out = {};
        (function walk(items, percussion) {
            items.forEach(function (it) {
                var key;
                if (it.group) { walk(it.items, percussion || it.group === 'Percussion'); return; }
                key = it.name.toLowerCase();
                if (out[key]) throw new Error('TuneScope instruments: the name "' + it.name + '" is used twice.');
                out[key] = { label: it.name, name: it.variable, file: it.file, bends: it.bends, percussion: !!percussion };
                if (it.drumPitch !== undefined) out[key].drumPitch = it.drumPitch;
            });
        }(tree, false));
        return out;
    }

    var TABLE = table(TREE);
    var CANONICAL = {}; // alias (lower case) -> the name it means (lower case)
    Object.keys(ALIASES).forEach(function (old) {
        var key = old.toLowerCase(), target = ALIASES[old].toLowerCase();
        if (TABLE[key]) throw new Error('TuneScope instruments: the alias "' + old + '" is also an instrument name.');
        if (!TABLE[target]) throw new Error('TuneScope instruments: the alias "' + old + '" points to an unknown instrument "' + ALIASES[old] + '".');
        TABLE[key] = TABLE[target];
        CANONICAL[key] = target;
    });
    // the name an instrument is known by: an alias becomes the name it means
    function canonical(key) { return CANONICAL[key] || key; }

    var api = { tree: TREE, table: TABLE, aliases: ALIASES, canonical: canonical, preload: PRELOAD.map(function (n) { return n.toLowerCase(); }) };
    api.preload.forEach(function (n) { if (!TABLE[n]) throw new Error('TuneScope instruments: PRELOAD names an unknown instrument "' + n + '".'); });

    if (typeof window !== 'undefined') {
        window.tsInstrumentTree = TREE;
        window.tsInstrumentTable = TABLE;
        window.tsInstrumentPreload = api.preload;
        window.tsCanonicalInstrument = canonical;
        (window.parent || window).instrumentData = TABLE;
    }
    if (typeof module !== 'undefined' && module.exports) module.exports = api;
}());
