/* TuneScope MIDI file import
 *
 * Turns a MIDI file parsed by @tonejs/midi into TuneScope tracks for the
 * Play Tracks block:
 *
 *   window.tsConvertMidi(midi) -> {tracks, tempo, timeSignature, groups, warnings}
 *
 * tracks is an array of [["Melody", instrument], [note, duration, marks?], ...]; each
 * track array also carries midiName (the file's own name for the track it came from),
 * midiTrack (that track's index), staff (" (upper)" or " (lower)" when a two-staff part
 * was divided, else "") and isDrum (one kit sound of a drum track)
 * ready for Play Tracks. Each MIDI track becomes one or more tracks: notes
 * that overlap are split into voices, notes that start together and stop
 * within a thirty-second of each other become chords, gaps become rests, and
 * the drum channel becomes one track
 * per drum sound. Note lengths are rounded to a 48th of a quarter note and
 * written as named values joined by ties, split at barlines so that every
 * measure adds up. A track with uneven, hand-played timing goes through the
 * recorder's quantizer (TS_midi.js) instead. Velocity becomes a dynamic mark
 * when it changes level.
 *
 * Loads in the browser as part of TuneScope and in Node for the harness.
 */
(function () {
    'use strict';

    var TPQ = 48; // grid units per quarter note: thirty-seconds and triplets down to thirty-second triplets

    // General MIDI programs, counted from 0, to TuneScope instruments (TS_instruments.js); null = dropped
    var GM_FAMILIES = [
        [[0, 0], 'Piano'], [[1, 1], 'Piano'], [[2, 2], 'Piano'], [[3, 3], 'Piano, Upright'], [[4, 4], 'Piano, Electric 1'],
        [[5, 5], 'Piano, Electric 2'], [[6, 7], 'Harpsichord'], [[8, 9], 'Glockenspiel'], [[10, 10], 'Music Box'], [[11, 11], 'Vibraphone'], [[12, 12], 'Marimba'],
        [[13, 13], 'Xylophone'], [[14, 14], 'Tubular Bell'], [[15, 15], 'Dulcimer'], [[16, 16], 'Organ, Drawbar'], [[17, 17], 'Organ, Drawbar'],
        [[18, 18], 'Organ, Rock'], [[19, 19], 'Organ, Church'], [[20, 21], 'Accordion'], [[22, 22], 'Harmonica'], [[23, 23], 'Accordion'],
        [[24, 24], 'Guitar, Nylon'], [[25, 25], 'Guitar, Acoustic'], [[26, 28], 'Guitar, Electric'], [[29, 30], 'Guitar, Overdrive'], [[31, 31], 'Guitar, Electric'],
        [[32, 32], 'Bass, Acoustic'], [[33, 33], 'Bass, Finger'], [[34, 34], 'Bass, Picked'], [[35, 35], 'Bass, Fretless'], [[36, 37], 'Bass, Slap'],
        [[38, 39], 'Bass, Synth'], [[40, 40], 'Violin'], [[41, 41], 'Viola'], [[42, 42], 'Cello'],
        [[43, 43], 'Contrabass'], [[44, 44], 'Strings'], [[45, 45], 'Pizz. Violins'], [[46, 46], 'Harp'], [[47, 47], 'Timpani'], [[48, 48], 'Strings'],
        [[49, 49], 'Strings'], [[50, 50], 'Strings'], [[51, 51], 'Strings, Mellotron'], [[52, 54], 'Choir, Mellotron'], [[55, 55], 'Orchestra Hit'],
        [[56, 56], 'Trumpet'], [[57, 57], 'Trombone'], [[58, 58], 'Tuba'], [[59, 59], 'Trumpet'], [[60, 60], 'French Horn'],
        [[61, 61], 'Brass Section'], [[62, 62], 'Brass, Synth'], [[63, 63], 'Brass, Synth'], [[64, 65], 'Saxophone'], [[66, 66], 'Saxophone'],
        [[67, 67], 'Saxophone'], [[68, 68], 'Oboe'], [[69, 69], 'English Horn'], [[70, 70], 'Bassoon'], [[71, 71], 'Clarinet'], [[72, 72], 'Piccolo'],
        [[73, 74], 'Flute'], [[75, 76], 'Flute, Pan'], [[77, 77], 'Shakuhachi'], [[78, 79], 'Flute'], [[80, 80], 'Brass, Synth'],
        [[81, 81], 'Brass, Synth'], [[82, 82], 'Flute, Pan'], [[83, 83], 'Brass, Synth'], [[84, 84], 'Brass, Synth'], [[85, 85], 'Choir, Mellotron'], [[86, 86], 'Brass, Synth'],
        [[87, 87], 'Bass, Synth'], [[88, 89], 'Strings, Mellotron'], [[90, 90], 'Brass, Synth'], [[91, 91], 'Choir, Mellotron'], [[92, 92], 'Strings'],
        [[93, 93], 'Vibraphone'], [[94, 94], 'Choir, Mellotron'], [[95, 95], 'Strings'], [[96, 96], 'Music Box'], [[97, 97], 'Strings, Mellotron'],
        [[98, 98], 'Music Box'], [[99, 99], 'Harp'], [[100, 100], 'Vibraphone'], [[101, 101], 'Choir, Mellotron'], [[102, 102], 'Vibraphone'], [[103, 103], 'Brass, Synth'],
        [[104, 104], 'Sitar'], [[105, 105], 'Banjo'], [[106, 106], 'Koto'], [[107, 107], 'Koto'], [[108, 108], 'Marimba'], [[109, 109], 'Accordion'],
        [[110, 110], 'Fiddle'], [[111, 111], 'Oboe'], [[112, 112], 'Glockenspiel'], [[113, 113], 'Cowbell, High'], [[114, 114], 'Vibraphone'],
        [[115, 115], 'Wood Block, Hi'], [[116, 116], 'Kick 1'], [[117, 117], 'Tom, Low'], [[118, 118], 'Snare 3'],
        [[119, 119], 'Cymbal, Crash 1'], [[120, 120], 'Guitar, Acoustic'], [[121, 121], 'Flute'], [[122, 127], null]
    ];
    var GM_NAMES = ['Acoustic Grand Piano', 'Bright Acoustic Piano', 'Electric Grand Piano', 'Honky-tonk Piano', 'Electric Piano 1', 'Electric Piano 2', 'Harpsichord', 'Clavinet',
        'Celesta', 'Glockenspiel', 'Music Box', 'Vibraphone', 'Marimba', 'Xylophone', 'Tubular Bells', 'Dulcimer', 'Drawbar Organ', 'Percussive Organ', 'Rock Organ', 'Church Organ',
        'Reed Organ', 'Accordion', 'Harmonica', 'Tango Accordion', 'Nylon Guitar', 'Steel Guitar', 'Jazz Guitar', 'Clean Guitar', 'Muted Guitar', 'Overdriven Guitar', 'Distortion Guitar',
        'Guitar Harmonics', 'Acoustic Bass', 'Electric Bass (finger)', 'Electric Bass (pick)', 'Fretless Bass', 'Slap Bass 1', 'Slap Bass 2', 'Synth Bass 1', 'Synth Bass 2', 'Violin', 'Viola',
        'Cello', 'Contrabass', 'Tremolo Strings', 'Pizzicato Strings', 'Orchestral Harp', 'Timpani', 'String Ensemble 1', 'String Ensemble 2', 'Synth Strings 1', 'Synth Strings 2',
        'Choir Aahs', 'Voice Oohs', 'Synth Voice', 'Orchestra Hit', 'Trumpet', 'Trombone', 'Tuba', 'Muted Trumpet', 'French Horn', 'Brass Section', 'Synth Brass 1', 'Synth Brass 2',
        'Soprano Sax', 'Alto Sax', 'Tenor Sax', 'Baritone Sax', 'Oboe', 'English Horn', 'Bassoon', 'Clarinet', 'Piccolo', 'Flute', 'Recorder', 'Pan Flute', 'Blown Bottle', 'Shakuhachi',
        'Whistle', 'Ocarina', 'Square Lead', 'Sawtooth Lead', 'Calliope Lead', 'Chiff Lead', 'Charang Lead', 'Voice Lead', 'Fifths Lead', 'Bass and Lead', 'New Age Pad', 'Warm Pad',
        'Polysynth Pad', 'Choir Pad', 'Bowed Pad', 'Metallic Pad', 'Halo Pad', 'Sweep Pad', 'Rain', 'Soundtrack', 'Crystal', 'Atmosphere', 'Brightness', 'Goblins', 'Echoes', 'Sci-fi',
        'Sitar', 'Banjo', 'Shamisen', 'Koto', 'Kalimba', 'Bagpipe', 'Fiddle', 'Shanai', 'Tinkle Bell', 'Agogo', 'Steel Drums', 'Woodblock', 'Taiko Drum', 'Melodic Tom', 'Synth Drum',
        'Reverse Cymbal', 'Guitar Fret Noise', 'Breath Noise', 'Seashore', 'Bird Tweet', 'Telephone Ring', 'Helicopter', 'Applause', 'Gunshot'];

    // drum channel: General MIDI drum key to the Percussion sound of that key (TS_instruments.js);
    // keys whose sound was left out of the kit go to a near relative (ride bell to the ride cymbal,
    // cabasa and maracas to the shaker, claves to the wood block, bell tree to the jingle bell,
    // the second surdo to the first), and High Q (27) and the whistles (71, 72) are dropped
    var DRUMS = {};
    [
     [[28, 28], 'Slap'], [[29, 29], 'Scratch, Push'], [[30, 30], 'Scratch, Pull'], [[31, 33], 'Sticks'], [[34, 34], 'Triangle'], [[35, 35], 'Kick 1'],
     [[36, 36], 'Kick 2'], [[37, 37], 'Rim'], [[38, 38], 'Snare 1'], [[39, 39], 'Clap, Dry'], [[40, 40], 'Snare 2'],
     [[41, 41], 'Tom, Low Floor'], [[42, 42], 'Hi-Hat, Closed'], [[43, 43], 'Tom, High Floor'], [[44, 44], 'Hi-Hat, Closed'],
     [[45, 45], 'Tom, High Floor'], [[46, 46], 'Hi-Hat, Open'], [[47, 47], 'Tom, Low'], [[48, 48], 'Tom, High'],
     [[49, 49], 'Cymbal, Crash 1'], [[50, 50], 'Tom, High'], [[51, 51], 'Cymbal, Ride 1'], [[52, 52], 'Cymbal, Crash 2'], [[53, 53], 'Cymbal, Ride 1'],
     [[54, 54], 'Tambourine'], [[55, 55], 'Cymbal, Splash'], [[56, 56], 'Cowbell, Low'], [[57, 57], 'Cymbal, Crash 2'], [[58, 58], 'Vibraslap'],
     [[59, 59], 'Cymbal, Ride 2'], [[60, 60], 'Bongo, Hi'], [[61, 61], 'Bongo, Low'], [[62, 62], 'Conga, High'], [[63, 63], 'Conga, High'],
     [[64, 64], 'Conga, Low'], [[65, 65], 'Timbale, High'], [[66, 66], 'Timbale, Low'], [[67, 67], 'Cowbell, High'], [[68, 68], 'Cowbell, Low'],
     [[69, 69], 'Shaker'], [[70, 70], 'Shaker'], [[73, 73], 'Guiro, Short'], [[74, 74], 'Guiro, Long'], [[75, 75], 'Wood Block, Hi'],
     [[76, 76], 'Wood Block, Hi'], [[77, 77], 'Wood Block, Low'], [[78, 78], 'Cuica, Mute'], [[79, 79], 'Cuica, Open'], [[80, 80], 'Triangle'],
     [[81, 81], 'Triangle'], [[82, 82], 'Shaker'], [[83, 83], 'Jingle Bell'], [[84, 84], 'Jingle Bell'], [[85, 85], 'Castanets'],
     [[86, 86], 'Surdo, Mute'], [[87, 87], 'Surdo, Open'], [[88, 88], 'Surdo, Open']
    ].forEach(function (row) { for (var n = row[0][0]; n <= row[0][1]; n++) DRUMS[n] = row[1]; });
    var DRUM_NAMES = {27: 'High Q', 28: 'Slap', 29: 'Scratch Push', 30: 'Scratch Pull', 31: 'Sticks', 32: 'Square Click', 33: 'Metronome Click', 34: 'Metronome Bell',
        35: 'Acoustic Bass Drum', 36: 'Bass Drum 1', 37: 'Side Stick', 38: 'Acoustic Snare', 39: 'Hand Clap', 40: 'Electric Snare', 41: 'Low Floor Tom', 42: 'Closed Hi-Hat',
        43: 'High Floor Tom', 44: 'Pedal Hi-Hat', 45: 'Low Tom', 46: 'Open Hi-Hat', 47: 'Low-Mid Tom', 48: 'Hi-Mid Tom', 49: 'Crash Cymbal 1', 50: 'High Tom', 51: 'Ride Cymbal 1',
        52: 'Chinese Cymbal', 53: 'Ride Bell', 54: 'Tambourine', 55: 'Splash Cymbal', 56: 'Cowbell', 57: 'Crash Cymbal 2', 58: 'Vibraslap', 59: 'Ride Cymbal 2', 60: 'Hi Bongo',
        61: 'Low Bongo', 62: 'Mute Hi Conga', 63: 'Open Hi Conga', 64: 'Low Conga', 65: 'High Timbale', 66: 'Low Timbale', 67: 'High Agogo', 68: 'Low Agogo', 69: 'Cabasa', 70: 'Maracas',
        71: 'Short Whistle', 72: 'Long Whistle', 73: 'Short Guiro', 74: 'Long Guiro', 75: 'Claves', 76: 'Hi Wood Block', 77: 'Low Wood Block', 78: 'Mute Cuica', 79: 'Open Cuica',
        80: 'Mute Triangle', 81: 'Open Triangle', 82: 'Shaker', 83: 'Jingle Bell', 84: 'Bell Tree', 85: 'Castanets', 86: 'Mute Surdo', 87: 'Open Surdo', 88: 'Open Surdo 2'};

    // named values in grid units, longest first; duple values, then triplets
    var VALUES = [[192, 'Whole'], [144, 'Dotted Half'], [96, 'Half'], [72, 'Dotted Quarter'], [48, 'Quarter'], [36, 'Dotted Eighth'], [24, 'Eighth'],
                  [18, 'Dotted Sixteenth'], [12, 'Sixteenth'], [6, 'Thirtysecond']];
    var TRIPLETS = [[64, 'Half Triplet'], [32, 'Quarter Triplet'], [16, 'Eighth Triplet'], [8, 'Sixteenth Triplet'], [4, 'Thirtysecond Triplet']];
    var UNIT_OF = {};
    VALUES.concat(TRIPLETS).forEach(function (v) { UNIT_OF[v[1].toLowerCase()] = v[0]; });
    var NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    var LEVELS = [[0.25, 'pp'], [0.4, 'p'], [0.55, 'mp'], [0.7, 'mf'], [0.85, 'f'], [1.01, 'ff']];

    // nearest point of a grid made of two unit sizes: thirty-seconds (6) and
    // sixteenth triplets (8) for files written by software, sixteenths (12) and
    // eighth triplets (16) for unevenly timed, hand-played files
    function snap(x, u1, u2) {
        var a = Math.round(x / u1) * u1, b = Math.round(x / u2) * u2;
        return Math.abs(b - x) < Math.abs(a - x) ? b : a;
    }

    function fontFor(program) {
        var i;
        for (i = 0; i < GM_FAMILIES.length; i++) {
            if (program >= GM_FAMILIES[i][0][0] && program <= GM_FAMILIES[i][0][1]) return GM_FAMILIES[i][1];
        }
        return 'Piano';
    }

    function noteName(midi) {
        return NOTE_NAMES[midi % 12] + (Math.floor(midi / 12) - 1);
    }

    function levelFor(velocity) {
        var i;
        for (i = 0; i < LEVELS.length; i++) if (velocity <= LEVELS[i][0]) return LEVELS[i][1];
        return 'ff';
    }

    // a length in grid units as named values: multiples of six are duple
    // values, other multiples of four are triplet values, and the remaining
    // even lengths mix the two, with the smallest triplet share that leaves a
    // duple remainder. Every even length of four units or more has a name;
    // two units has none, so mendVoice removes two-unit gaps and events first.
    function nameLength(units) {
        var names = [], rest, i, t;
        function take(table, amount) {
            rest = amount;
            for (i = 0; i < table.length; i++) {
                while (rest >= table[i][0]) { names.push(table[i][1]); rest -= table[i][0]; }
            }
        }
        if (units % 6 === 0) { take(VALUES, units); return names; }
        if (units % 4 === 0) { take(TRIPLETS, units); return names; }
        for (t = 4; t <= units; t += 4) {
            if ((units - t) % 6 === 0) { take(VALUES, units - t); take(TRIPLETS, t); return names; }
        }
        take(VALUES, units); take(TRIPLETS, rest); // odd or two units: as near as names allow
        return names;
    }

    // Two units, a twenty-fourth of a quarter note, has no name. It arises
    // where a thirty-second position meets a triplet position, as a two-unit
    // gap between events or a two-unit event. The gap is given to the event
    // before it; a two-unit event is stretched to a thirty-second triplet when
    // the next event leaves room, and otherwise left out as a ghost note.
    function mendVoice(events, stats) {
        var i, ev, next, pass;
        for (pass = 0; pass < 2; pass++) { // a removal can leave a new two-unit gap behind it
            for (i = 0; i < events.length; i++) {
                ev = events[i];
                next = events[i + 1];
                if (next && next.start - ev.end === 2) ev.end = next.start;
                if (ev.end - ev.start === 2) {
                    if (!next || next.start - ev.start >= 4) {
                        ev.end = ev.start + 4;
                        if (next && next.start - ev.end === 2) ev.end = next.start;
                    } else { events.splice(i, 1); i--; if (stats) stats.lost++; }
                }
            }
        }
        return events;
    }

    // the measures of a finished track: the first barline that an untied pair
    // crosses, or null when every measure adds up
    function brokenMeasure(track, measureUnits) {
        var at = 0, i, p, text, tied, units, bar;
        for (i = 1; i < track.length; i++) {
            p = track[i];
            units = UNIT_OF[String(p[1]).toLowerCase()];
            if (units === undefined) return { measure: Math.floor(at / measureUnits) + 1, why: 'an unknown length ' + p[1] };
            text = Array.isArray(p[0]) ? p[0][0] : p[0];
            tied = /~$/.test(String(text));
            bar = (Math.floor(at / measureUnits) + 1) * measureUnits;
            if (at + units > bar && !tied) return { measure: bar / measureUnits, why: 'a note or rest that crosses the barline' };
            at += units;
        }
        return null;
    }

    // one sounding event (note, chord or rest) spanning [start, end) in grid
    // units -> pairs, split at barlines and joined by ties
    function eventToPairs(pitches, start, end, measureUnits, marks, isRest) {
        var pairs = [], at = start, segEnd, names, k, text, tieMark;
        while (at < end) {
            segEnd = Math.min(end, (Math.floor(at / measureUnits) + 1) * measureUnits);
            names = nameLength(segEnd - at);
            for (k = 0; k < names.length; k++) {
                tieMark = (!isRest && (k < names.length - 1 || segEnd < end)) ? '~' : '';
                if (isRest) text = 'R';
                else if (pitches.length === 1) text = pitches[0] + tieMark;
                else text = pitches.map(function (p) { return p + tieMark; });
                pairs.push(marks && pairs.length === 0 ? [text, names[k], marks] : [text, names[k]]);
            }
            at = segEnd;
        }
        return pairs;
    }

    // notes of one instrument -> one voice: notes starting together form a chord,
    // held to its longest tone; a note still sounding when the next event begins
    // is cut short there, so a part stays one track. counter.cut counts the cuts.
    function oneVoice(notes, stats, counter) {
        var events = [], i, n, last, name;
        notes.sort(function (a, b) { return a.start - b.start || a.midi - b.midi; });
        for (i = 0; i < notes.length; i++) {
            n = notes[i];
            last = events[events.length - 1];
            name = noteName(n.midi);
            if (last && last.start === n.start) { // a chord tone
                if (last.pitches.indexOf(name) === -1) last.pitches.push(name);
                if (n.end !== last.end && stats && !last.uneven) { last.uneven = true; stats.chords++; }
                last.end = Math.max(last.end, n.end);
                last.velocity = Math.max(last.velocity, n.velocity);
                continue;
            }
            if (last && last.end > n.start) { last.end = n.start; if (counter) counter.cut++; }
            events.push({ start: n.start, end: n.end, pitches: [name], velocity: n.velocity });
        }
        return events;
    }

    // how many notes one voice would cut short
    function cutsOf(notes) {
        var counter = { cut: 0 };
        oneVoice(notes.slice(), null, counter);
        return counter.cut;
    }

    // A part written on two staves, a left hand under a right hand, is two parts:
    // when one voice would cut short a tenth or more of the notes and a pitch
    // split removes at least half of those cuts, the notes below the split become
    // the lower part. A keyboard part (a piano or organ program) splits sooner: a
    // twentieth of the notes cut, a quarter of them saved. Each side needs a tenth
    // of the notes, so a stray low or high note does not make a part of its own.
    function twoStaves(notes, program) {
        var keyboard = program >= 0 && program <= 23 && (program <= 7 || program >= 16); // pianos and organs
        var need = keyboard ? 0.05 : 0.1, keep = keyboard ? 0.75 : 0.5;
        var whole = cutsOf(notes), pitches = [], best = null, i, split, lo, hi, cuts, minShare;
        if (notes.length < 16 || whole < Math.max(8, notes.length * need)) return [{ staff: '', notes: notes }];
        notes.forEach(function (n) { if (pitches.indexOf(n.midi) === -1) pitches.push(n.midi); });
        pitches.sort(function (a, b) { return a - b; });
        minShare = Math.max(4, Math.round(notes.length * 0.1));
        for (i = 1; i < pitches.length; i++) {
            split = pitches[i];
            lo = notes.filter(function (n) { return n.midi < split; });
            hi = notes.filter(function (n) { return n.midi >= split; });
            if (lo.length < minShare || hi.length < minShare) continue;
            cuts = cutsOf(lo) + cutsOf(hi);
            if (!best || cuts < best.cuts) best = { cuts: cuts, lo: lo, hi: hi };
        }
        if (!best || best.cuts > whole * keep) return [{ staff: '', notes: notes }];
        return [{ staff: ' (upper)', notes: best.hi }, { staff: ' (lower)', notes: best.lo }];
    }

    // a voice of events -> a TuneScope track: rests fill the gaps, a dynamic
    // mark is written where the level changes
    function voiceToTrack(instrument, events, measureUnits, withDynamics) {
        var track = [['Melody', instrument]], at = 0, i, ev, level, current = null, marks;
        for (i = 0; i < events.length; i++) {
            ev = events[i];
            if (ev.start > at) track = track.concat(eventToPairs(null, at, ev.start, measureUnits, null, true));
            marks = null;
            if (withDynamics) {
                level = levelFor(ev.velocity);
                if (level !== current) { marks = level; current = level; }
            }
            track = track.concat(eventToPairs(ev.pitches, ev.start, ev.end, measureUnits, marks, false));
            at = ev.end;
        }
        return track;
    }

    function quantizer() {
        if (typeof window !== 'undefined' && typeof window.tsQuantizeMidi === 'function') return window.tsQuantizeMidi;
        if (typeof require === 'function') { try { return require('./TS_midi.js').quantizeMidiRecording; } catch (e) { return null; } }
        return null;
    }

    // Uneven, hand-played timing: the voice is formed on the raw times, notes
    // within 70 ms joining as a chord and a note still sounding at the next onset
    // cut there, then the recorder's quantizer fits it to the beat. A file has no
    // click lag and no tempo drift, so both corrections are switched off.
    function oneVoiceRaw(notes, counter) {
        var voice = [];
        notes.sort(function (a, b) { return a.on - b.on || a.midi - b.midi; });
        notes.forEach(function (n) {
            var k;
            if (voice.length && Math.abs(n.on - voice.lastOn) <= 0.07) { voice.push(n); voice.maxOff = Math.max(voice.maxOff, n.off); return; } // a chord member
            for (k = voice.length - 1; k >= 0 && voice[k].on >= voice.lastOn - 0.07; k--) { // the last chord: cut what still sounds
                if (voice[k].off > n.on) { voice[k].off = n.on; if (counter) counter.cut++; }
            }
            voice.push(n); voice.lastOn = n.on; voice.maxOff = n.off;
        });
        return voice;
    }

    function quantizeVoice(instrument, voice, tempo, sigText, label, warnings, withDynamics, isDrum, counter) {
        var q = quantizer(), result, track = [['Melody', instrument]], level, current = null, i, pair, held;
        var notes = voice.map(function (n) {
            return { onsetSec: n.on, offsetSec: n.off, midiNumber: n.midi, velocity: Math.max(1, Math.min(127, Math.round(n.velocity * 127))) };
        });
        // the stop is the last release: the last note counts as held to the end,
        // so its length is read as written rather than as released early
        var stopSec = Math.max.apply(null, voice.map(function (n) { return n.off; }));
        result = q(notes, { tempo: tempo, timeSignature: sigText, smallestSubdivision: 'Sixteenth', latencySec: 0, followTempo: false,
                            driftWarnPercent: 1e9, keepPickup: false, keepTrailingSilence: false, stopSec: stopSec });
        ((result.diagnostics && result.diagnostics.warnings) || []).forEach(function (w) {
            if (/No notes were recorded|played in the last 50 ms/.test(w)) return; // recording advice that does not apply to a file
            held = /^(\d+) note\(s\) were still held when the next note began/.exec(w);
            if (held && counter) { counter.cut += +held[1]; return; } // counted with the importer's own cuts
            w = w.replace(/ or record it again closer to the click\./, '.').replace(/ Use a smaller Smallest Note or a slower tempo\./, '')
                 .replace(/ Use a larger Smallest Note or a slower tempo\./, '');
            warnings.push(label + ': ' + w);
        });
        for (i = 0; i < result.pairs.length; i++) {
            pair = result.pairs[i].slice();
            if (isDrum && pair[0] !== 'R') pair[0] = Array.isArray(pair[0]) ? 'C4' + (/~$/.test(pair[0][0]) ? '~' : '') : pair[0].replace(/^[A-G]#?-?\d+/, 'C4'); // a drum has one sound
            if (withDynamics && pair[0] !== 'R' && result.velocities && result.velocities[i] != null) {
                level = levelFor(result.velocities[i] / 127);
                if (level !== current) { pair.push(level); current = level; }
            }
            track.push(pair);
        }
        return track;
    }

    // The parser splits a track chunk whose program changes after other channel
    // messages and leaves the chunk's name on the first piece, so the note tracks
    // come out nameless. This reads the chunks itself and gives a nameless track
    // the name of the one named chunk that plays notes on its channel.
    function chunkNames(bytes) {
        var data = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes), chunks = [], pos = 14, id, len;
        try {
            if (data.length < 14 || String.fromCharCode(data[0], data[1], data[2], data[3]) !== 'MThd') return chunks;
            while (pos + 8 <= data.length) {
                id = String.fromCharCode(data[pos], data[pos + 1], data[pos + 2], data[pos + 3]);
                len = (data[pos + 4] * 16777216) + (data[pos + 5] << 16) + (data[pos + 6] << 8) + data[pos + 7];
                if (id === 'MTrk') chunks.push(scanChunk(data.subarray(pos + 8, pos + 8 + len)));
                pos += 8 + len;
            }
        } catch (e) { return chunks; }
        return chunks;
    }
    // the names in one chunk, each with the channel of the first channel message
    // after it: a chunk per part names its one channel, and a single chunk holding
    // every part (format 0) names each channel in turn
    function scanChunk(d) {
        var i = 0, status = 0, pending = [], names = [], b, type, L, c, hi, ch, k, text;
        function varint() { var val = 0; do { c = d[i++]; val = (val << 7) | (c & 0x7f); } while (c & 0x80 && i < d.length); return val; }
        while (i < d.length) {
            varint();
            b = d[i];
            if (b === 0xFF) {
                type = d[i + 1]; i += 2; L = varint();
                if (type === 3) { text = ''; for (k = i; k < i + L && k < d.length; k++) text += String.fromCharCode(d[k]); text = text.replace(/\s+/g, ' ').trim(); if (text) pending.push(text); }
                i += L; continue;
            }
            if (b === 0xF0 || b === 0xF7) { i += 1; L = varint(); i += L; continue; }
            if (b & 0x80) { status = b; i += 1; }
            hi = status & 0xF0; ch = status & 0x0F;
            i += (hi === 0xC0 || hi === 0xD0) ? 1 : 2;
            if (hi >= 0x80 && hi <= 0xE0 && pending.length) { pending.forEach(function (n) { names.push({ name: n, channel: ch }); }); pending = []; }
        }
        return names;
    }
    function applyChunkNames(midiTracks, bytes) {
        var byChannel = {};
        chunkNames(bytes).forEach(function (names) { names.forEach(function (n) { (byChannel[n.channel] = byChannel[n.channel] || []).push(n.name); }); });
        midiTracks.forEach(function (tr) {
            var names, distinct;
            if (String(tr.name || '').trim() || !tr.notes || !tr.notes.length) return;
            names = byChannel[tr.channel] || [];
            distinct = names.filter(function (n, k) { return names.indexOf(n) === k; });
            if (distinct.length === 1) tr.name = distinct[0];
        });
    }

    function measureTicks(sig, ppq) { return sig[0] * (4 / sig[1]) * ppq; }
    function validSig(sig) { return !!sig && [1, 2, 4, 8, 16, 32].indexOf(sig[1]) !== -1 && sig[0] >= 1; }

    // The piece cut into sections: its measures, one after another, merged while
    // the time signature and the measure's tempo stay the same. A tempo change
    // inside a measure is averaged over that measure, so sections begin on
    // barlines; a time-signature change begins a measure where it falls.
    function sectionsOf(header, ppq, endTick, warnings) {
        var sigs = (header.timeSignatures || []).slice().sort(function (x, y) { return x.ticks - y.ticks; });
        var tempos = (header.tempos || []).slice().sort(function (x, y) { return x.ticks - y.ticks; });
        var sigChanges = [], tempoMap = [], measures = [], sections = [], start = 0, cur, end, prev, offGrid = 0;
        sigs.forEach(function (t) {
            var sig = t.timeSignature;
            if (!validSig(sig)) { warnings.push('The time signature ' + sig[0] + '/' + sig[1] + ' is not supported; 4/4 is used.'); sig = [4, 4]; }
            if (sigChanges.length && sigChanges[sigChanges.length - 1].ticks === t.ticks) sigChanges.pop();
            sigChanges.push({ ticks: t.ticks, sig: sig });
        });
        if (!sigChanges.length || sigChanges[0].ticks > 0) sigChanges.unshift({ ticks: 0, sig: sigChanges.length ? sigChanges[0].sig : [4, 4] });
        tempos.forEach(function (t) {
            if (tempoMap.length && tempoMap[tempoMap.length - 1].ticks === t.ticks) tempoMap.pop();
            tempoMap.push({ ticks: t.ticks, bpm: t.bpm });
        });
        if (!tempoMap.length || tempoMap[0].ticks > 0) tempoMap.unshift({ ticks: 0, bpm: tempoMap.length ? tempoMap[0].bpm : 120 });
        function secondsBetween(x, y) { // through every tempo in between
            var total = 0, k, from, to;
            for (k = 0; k < tempoMap.length; k++) {
                from = Math.max(x, tempoMap[k].ticks);
                to = Math.min(y, k + 1 < tempoMap.length ? tempoMap[k + 1].ticks : Infinity);
                if (to > from) total += (to - from) / ppq * 60 / tempoMap[k].bpm;
            }
            return total;
        }
        function sigAt(tick) { var k, found = sigChanges[0]; for (k = 0; k < sigChanges.length; k++) if (sigChanges[k].ticks <= tick) found = sigChanges[k]; return found; }
        function nextSigChange(tick) { var k; for (k = 0; k < sigChanges.length; k++) if (sigChanges[k].ticks > tick) return sigChanges[k].ticks; return Infinity; }
        if (!(endTick > 0)) endTick = 1;
        while (start < endTick - 0.5) {
            cur = sigAt(start);
            end = Math.min(start + measureTicks(cur.sig, ppq), nextSigChange(start));
            measures.push({ start: start, end: end, sig: cur.sig, tempo: Math.round((end - start) / ppq / secondsBetween(start, end) * 60 * 10) / 10 });
            start = end;
        }
        tempoMap.forEach(function (t) { // a change anywhere inside a measure, the last one included, is averaged
            if (t.ticks > 0 && t.ticks < measures[measures.length - 1].end && !measures.some(function (mm) { return mm.start === t.ticks; })) offGrid++;
        });
        measures.forEach(function (mm, idx) {
            prev = sections[sections.length - 1];
            if (prev && prev.sig[0] === mm.sig[0] && prev.sig[1] === mm.sig[1] && prev.tempo === mm.tempo) { prev.endTick = mm.end; return; }
            sections.push({ startTick: mm.start, endTick: mm.end, sig: mm.sig, sigText: mm.sig[0] + '/' + mm.sig[1], tempo: mm.tempo, firstMeasure: idx + 1 });
        });
        return { sections: sections, offGridTempoChanges: offGrid };
    }

    // the notes of every track that fall between two ticks, moved to start at the first; a note held across the first tick restarts there
    function clipTracks(midiTracks, startTick, endTick, c) {
        return (midiTracks || []).map(function (tr) {
            var notes = [];
            (tr.notes || []).forEach(function (n) {
                var from = Math.max(n.ticks, startTick), to = Math.min(n.ticks + n.durationTicks, endTick);
                if (to <= from) return;
                if (n.ticks < startTick) c.restarted++;
                notes.push({ midi: n.midi, ticks: from - startTick, durationTicks: to - from, velocity: n.velocity });
            });
            return { name: tr.name, channel: tr.channel, instrument: tr.instrument, controlChanges: tr.controlChanges, pitchBends: tr.pitchBends, notes: notes };
        });
    }

    function cutWarning(label, cut, warnings) {
        if (cut) warnings.push(label + ': ' + cut + ' note' + (cut === 1 ? ' was' : 's were') + ' still sounding when the next note began and cut short there, so the part stays one track.');
    }

    // the tracks of one span of the file at one tempo and time signature; c counts what was changed
    function convertTracks(midiTracks, ppq, tempo, sigText, measureUnits, o, warnings, c) {
        var tracks = [];
        (midiTracks || []).forEach(function (tr, index) {
            var notes = [], label = 'track ' + (index + 1) + (tr.name ? ' (' + tr.name + ')' : ''), program, font, byDrum = {}, dropped = {};
            // the file's own track name, the source track's index and whether it is a kit sound ride along, to name the variables
            var add = function (t, drum, staff) { t.midiName = String(tr.name || '').replace(/\s+/g, ' ').trim(); t.midiTrack = index; t.isDrum = !!drum; t.staff = staff || ''; tracks.push(t); };
            if (!tr.notes || !tr.notes.length) return;
            // a drum hit's length means nothing, and sequencers often write it as a
            // few ticks, so the ghost-note rule applies to melodic tracks only
            var isDrumTrack = tr.channel === 9 || (tr.instrument && tr.instrument.percussion);
            tr.notes.forEach(function (n) {
                var rawStart = n.ticks / ppq * TPQ, rawEnd = (n.ticks + n.durationTicks) / ppq * TPQ;
                if (!isDrumTrack && rawEnd - rawStart < 2) { c.lost++; return; } // under a 24th of a quarter: a ghost note
                notes.push({ midi: n.midi, rawStart: rawStart, rawEnd: rawEnd, velocity: n.velocity });
            });
            // exact files land on the fine grid; an uneven, hand-played track goes
            // through the quantizer instead (or the sixteenth grid without it)
            var offGrid = notes.filter(function (n) { return Math.abs(snap(n.rawStart, 6, 8) - n.rawStart) > 1; }).length;
            var uneven = notes.length && offGrid / notes.length > 0.1;
            var useQuantizer = uneven && quantizer();
            var secPerUnit = 60 / tempo / TPQ;
            notes.forEach(function (n) {
                n.on = n.rawStart * secPerUnit;
                n.off = n.rawEnd * secPerUnit;
                n.start = uneven ? snap(n.rawStart, 12, 16) : snap(n.rawStart, 6, 8);
                n.end = uneven ? snap(n.rawEnd, 12, 16) : snap(n.rawEnd, 6, 8);
                if (n.end <= n.start) n.end = n.start + (uneven ? 12 : 6);
            });
            c.counted += notes.length;
            if (uneven && !useQuantizer) c.moved += notes.length;
            if (useQuantizer) {
                warnings.push(label + ' has uneven timing, as if played live, so the quantizer fitted its notes to the beat. Check them with Beats in Measure.');
                if (tr.channel === 9 || (tr.instrument && tr.instrument.percussion)) {
                    notes.forEach(function (n) {
                        var drum = DRUMS[n.midi];
                        if (!drum) { dropped[DRUM_NAMES[n.midi] || ('note ' + n.midi)] = true; return; }
                        (byDrum[drum] = byDrum[drum] || []).push(n);
                    });
                    Object.keys(byDrum).forEach(function (drum) {
                        var hits = byDrum[drum].sort(function (a, b) { return a.on - b.on; }).filter(function (h, i, arr) { return i === 0 || h.on - arr[i - 1].on > 0.03; });
                        hits.forEach(function (h, i) { if (i + 1 < hits.length && h.off > hits[i + 1].on) h.off = hits[i + 1].on; });
                        hits[hits.length - 1].off = Math.max(hits[hits.length - 1].off, hits[hits.length - 1].on + 0.2); // a drum's length is not meaningful
                        add(quantizeVoice(drum, hits, tempo, sigText, label, warnings, o.dynamics !== false, true));
                    });
                    if (Object.keys(dropped).length) warnings.push('Drum sounds with no TuneScope drum were left out of ' + label + ': ' + Object.keys(dropped).join(', ') + '.');
                    return;
                }
                program = tr.instrument && typeof tr.instrument.number === 'number' ? tr.instrument.number : 0;
                font = fontFor(program);
                if (!font) { warnings.push(label + ' was left out because its sound effect, "' + GM_NAMES[program] + '", has no TuneScope instrument.'); return; }
                twoStaves(notes, program).forEach(function (part) {
                    var counter = { cut: 0 }, voice = oneVoiceRaw(part.notes, counter);
                    add(quantizeVoice(font, voice, tempo, sigText, label + part.staff, warnings, o.dynamics !== false, false, counter), false, part.staff);
                    cutWarning(label + part.staff, counter.cut, warnings);
                });
                return;
            }
            if (!notes.length) return;
            if (tr.channel === 9 || (tr.instrument && tr.instrument.percussion)) {
                notes.forEach(function (n) {
                    var drum = DRUMS[n.midi];
                    if (!drum) { dropped[DRUM_NAMES[n.midi] || ('note ' + n.midi)] = true; return; }
                    (byDrum[drum] = byDrum[drum] || []).push(n);
                });
                Object.keys(byDrum).forEach(function (drum) {
                    var hits = byDrum[drum].sort(function (a, b) { return a.start - b.start; }), events = [], i, end;
                    for (i = 0; i < hits.length; i++) {
                        if (i > 0 && hits[i].start === hits[i - 1].start) continue; // a double hit is one hit
                        end = Math.min(hits[i].end, i + 1 < hits.length ? hits[i + 1].start : hits[i].end);
                        events.push({ start: hits[i].start, end: Math.max(end, hits[i].start + 6), pitches: ['C4'], velocity: hits[i].velocity });
                        if (i + 1 < hits.length && events[events.length - 1].end > hits[i + 1].start) events[events.length - 1].end = hits[i + 1].start;
                    }
                    add(voiceToTrack(drum, mendVoice(events, c.stats), measureUnits, o.dynamics !== false), true);
                });
                if (Object.keys(dropped).length) warnings.push('Drum sounds with no TuneScope drum were left out of ' + label + ': ' + Object.keys(dropped).join(', ') + '.');
                return;
            }
            program = tr.instrument && typeof tr.instrument.number === 'number' ? tr.instrument.number : 0;
            font = fontFor(program);
            if (!font) { warnings.push(label + ' was left out because its sound effect, "' + GM_NAMES[program] + '", has no TuneScope instrument.'); return; }
            twoStaves(notes, program).forEach(function (part) {
                var counter = { cut: 0 }, events = oneVoice(part.notes, c.stats, counter);
                add(voiceToTrack(font, mendVoice(events, c.stats), measureUnits, o.dynamics !== false), false, part.staff);
                cutWarning(label + part.staff, counter.cut, warnings);
            });
        });
        tracks.forEach(function (t, k) { // every track must fit the measures, or Play Tracks refuses it
            var broken = brokenMeasure(t, measureUnits);
            if (broken) warnings.push('Track ' + (k + 1) + ' (' + t[0][1] + ') does not fit the measures: ' + broken.why + ' in measure ' + broken.measure + '. Play Tracks will refuse it. Please report this file.');
        });
        return tracks;
    }

    function convert(midi, options) {
        var o = options || {}, warnings = [], ppq, tempo, sig, sigText, tracks, groups, endTick = 0, cut, pedal = 0, bends = 0;
        var c = { lost: 0, moved: 0, counted: 0, restarted: 0, stats: { chords: 0, lost: 0 } };
        var header = midi.header || {}, tempos = header.tempos || [], sigs = header.timeSignatures || [], midiTracks = midi.tracks || [];
        var spanDefs = [], spans, cg;
        ppq = header.ppq || 480;
        if (o.bytes) applyChunkNames(midiTracks, o.bytes);
        midiTracks.forEach(function (tr) {
            if (tr.controlChanges && tr.controlChanges[64] && tr.controlChanges[64].length) pedal++;
            if (tr.pitchBends && tr.pitchBends.length) bends++;
            (tr.notes || []).forEach(function (n) { endTick = Math.max(endTick, n.ticks + n.durationTicks); });
        });
        // the first tempo and time signature, for MIDI File Tempo, MIDI File Time Signature and MIDI File Tracks
        tempo = tempos.length ? Math.round(tempos[0].bpm * 10) / 10 : 120;
        sig = sigs.length ? sigs[0].timeSignature : [4, 4];
        if (!validSig(sig)) sig = [4, 4];
        sigText = sig[0] + '/' + sig[1];
        cut = sectionsOf(header, ppq, endTick, warnings);
        // the spans of one time signature, for the Track variables: a tempo change does
        // not divide a part, and a span plays at the tempo of its first measure
        cut.sections.forEach(function (section) {
            var last = spanDefs[spanDefs.length - 1];
            if (last && last.sigText === section.sigText) last.endTick = section.endTick;
            else spanDefs.push({ sig: section.sig, sigText: section.sigText, tempo: section.tempo, firstMeasure: section.firstMeasure, startTick: section.startTick, endTick: section.endTick });
        });
        spans = spanDefs.map(function (span) {
            var units = Math.round(span.sig[0] * (4 / span.sig[1]) * TPQ);
            return { timeSignature: span.sigText, tempo: span.tempo, firstMeasure: span.firstMeasure,
                     tracks: convertTracks(clipTracks(midiTracks, span.startTick, span.endTick, c), ppq, span.tempo, span.sigText, units, o, warnings, c) };
        });
        // the sections, cut at tempo changes too, as Groups for Play Tracks; their own warnings repeat the spans' and are dropped
        cg = { lost: 0, moved: 0, counted: 0, restarted: 0, stats: { chords: 0, lost: 0 } };
        groups = cut.sections.length === 1 ? [{ timeSignature: spans[0].timeSignature, tempo: spans[0].tempo, firstMeasure: spans[0].firstMeasure, tracks: spans[0].tracks }]
            : cut.sections.map(function (section) {
                var units = Math.round(section.sig[0] * (4 / section.sig[1]) * TPQ);
                return { timeSignature: section.sigText, tempo: section.tempo, firstMeasure: section.firstMeasure,
                         tracks: convertTracks(clipTracks(midiTracks, section.startTick, section.endTick, cg), ppq, section.tempo, section.sigText, units, o, [], cg) };
            });
        c.restarted = cg.restarted;
        if (groups.length === 1) {
            tracks = groups[0].tracks;
            tempo = groups[0].tempo; // the measure average when a tempo change falls inside the only section
            sigText = groups[0].timeSignature;
        } else if (spans.length === 1) {
            tracks = spans[0].tracks; // the whole piece at the tempo of its first measure, as the Track variables hold it
            tempo = spans[0].tempo;
            sigText = spans[0].timeSignature;
        } else {
            // the whole piece at its first tempo and time signature, as the earlier blocks expect it; its own warnings are not repeated
            tracks = convertTracks(midiTracks, ppq, tempo, sigText, Math.round(sig[0] * (4 / sig[1]) * TPQ), o, [], { lost: 0, moved: 0, counted: 0, restarted: 0, stats: { chords: 0, lost: 0 } });
        }
        if (cut.offGridTempoChanges) warnings.push(cut.offGridTempoChanges + ' tempo change' + (cut.offGridTempoChanges === 1 ? '' : 's') + ' inside a measure ' + (cut.offGridTempoChanges === 1 ? 'was' : 'were') + ' averaged over the measure.');
        if (c.restarted) warnings.push(c.restarted + ' note' + (c.restarted === 1 ? '' : 's') + ' held across a section change restart' + (c.restarted === 1 ? 's' : '') + ' at the change.');
        c.lost += c.stats.lost;
        if (c.lost) warnings.push(c.lost + ' note' + (c.lost === 1 ? '' : 's') + ' shorter than a thirty-second triplet ' + (c.lost === 1 ? 'was' : 'were') + ' left out.');
        if (c.moved) warnings.push('The timing in this file is uneven and the quantizer did not load, so ' + c.moved + ' of ' + c.counted + ' notes were moved to the nearest sixteenth or eighth triplet. Check the result with Beats in Measure.');
        if (c.stats.chords) warnings.push(c.stats.chords + ' chord' + (c.stats.chords === 1 ? '' : 's') + ' had tones of different lengths; each chord is held to its longest tone.');
        if (bends) warnings.push('Pitch bends in ' + bends + ' track' + (bends === 1 ? '' : 's') + ' are ignored.');
        if (pedal) warnings.push('The sustain pedal in ' + pedal + ' track' + (pedal === 1 ? '' : 's') + ' is ignored, so held notes end when their keys are released.');
        if (!tracks.length) warnings.push('No notes were found in the file.');
        warnings = warnings.filter(function (w, i) { return warnings.indexOf(w) === i; }); // one line per fact, whatever the number of sections
        return { tracks: tracks, tempo: tempo, timeSignature: sigText, groups: groups, spans: spans, warnings: warnings };
    }

    var api = { convert: convert, fontFor: fontFor, nameLength: nameLength, noteName: noteName, DRUMS: DRUMS, GM_NAMES: GM_NAMES, DRUM_NAMES: DRUM_NAMES };
    if (typeof window !== 'undefined') window.tsConvertMidi = convert;
    if (typeof module !== 'undefined' && module.exports) module.exports = api;
}());
