// ---- instrument and volume settings ----

function tsInstrumentKey(name) {
    var key = String(name).toLowerCase();
    if (!window.parent.instrumentData) {
        throw new Error('TuneScope is not loaded. Run Initialize TuneScope first.');
    }
    if (!window.parent.instrumentData[key]) {
        throw new Error('Unknown instrument "' + name + '". Choose one from the Set Instrument To menu.');
    }
    return tsCanonicalName(key);
}

// an old instrument name (TS_instruments.js ALIASES) becomes the name it means now
function tsCanonicalName(key) {
    return window.tsCanonicalInstrument ? window.tsCanonicalInstrument(key) : key;
}

function tsVolumeFraction(percent) {
    var n = Number(percent);
    if (percent === '' || percent === null || isNaN(n)) {
        throw new Error('Volume must be a number from 0 to 100, not "' + percent + '".');
    }
    return Math.min(100, Math.max(0, n)) / 100;
}

SnapExtensions.primitives.set(
    'ts_setinst(name)',
    function (name, proc) {
        var key = tsInstrumentKey(name);
        if (!tsInstrumentsLoaded(proc, [key])) return; // the block waits for the sound file
        window.parent.currentInstrumentName = key;
    }
);

SnapExtensions.primitives.set(
    'ts_setvol(percent)',
    function (percent) {
        window.parent.globalInstrumentVolume = tsVolumeFraction(percent);
    }
);

SnapExtensions.primitives.set(
    'ts_setinstvol(name, percent)',
    function (name, percent) {
        window.parent.instrumentVolumes[tsInstrumentKey(name)] = tsVolumeFraction(percent);
    }
);

SnapExtensions.primitives.set(
    'ts_playnote(note, duration)',
    function (note, noteLength, proc) {
        if (!tsInstrumentsLoaded(proc, [String(window.parent.currentInstrumentName).toLowerCase()])) return;
        window.playNote(note, noteLength);
    }
);

SnapExtensions.primitives.set(
    'ts_getcurrentnote()',
    function () {
        return window.currentNote
    }
)

SnapExtensions.primitives.set(
    'ts_parsemidifile()',
    function () {
        const getMidiFile = async () => {
            window._parsed = "";
            fileMidi = await window._selectFile(".mid", false);
            const arrayBuffer = await fileMidi.arrayBuffer();
            const _parsedMidi = await new window.Midi(arrayBuffer);
            window._parsed = _parsedMidi.toJSON();
            //return window._parsed
            // just send the json string to the snap front end
            world.children[0].broadcast("ts_file_input_received");
        }
        getMidiFile();
    }
)

/** can possibly delete this function */
SnapExtensions.primitives.set(
    'ts_getparsed()',
    function() {
        world.children[0].broadcast("ts_no_file_upload");
        let temp = window._objToArray(window._parsed);
        temp = window.convertArrayToListRecursive(temp);
        return temp;
    }
);

SnapExtensions.primitives.set(
    'ts_getmidijson()',
    function() {
        world.children[0].broadcast("ts_no_file_upload");
        return JSON.stringify(window._parsed);
    }
)

// ---- notation marks: articulation, dynamics and ornaments in Play Tracks ----
// A pair is (note, duration) or (note, duration, marks). The note text may end
// with marks: ~ tie, . staccato, > accent, - legato, / glide.
// The third item holds a dynamic (pp p mp mf f ff) and/or cresc or dim. The
// duration Grace is a grace note: 0 beats in the measure, sounding for a
// thirty-second taken from the start of the next note.
// A dynamic plays at the square of the MIDI velocity MuseScore gives it,
// relative to mf (80 of 127), the level of an unmarked note:
// pp 0.17, p 0.38, mp 0.64, mf 1, f 1.44, ff 1.96.
const TS_DYNAMIC_VELOCITY = { pp: 33, p: 49, mp: 64, mf: 80, f: 96, ff: 112 };
const TS_DYNAMICS = {};
Object.keys(TS_DYNAMIC_VELOCITY).forEach(function (k) { TS_DYNAMICS[k] = Math.pow(TS_DYNAMIC_VELOCITY[k] / 80, 2); });
const TS_DYNAMIC_ORDER = ['pp', 'p', 'mp', 'mf', 'f', 'ff'];
const TS_NOTE_MARKS = ['~', '.', '>', '-', '/', 'u', 'd']; // u bends up, with an optional size in whole steps; ud bends up and back
const TS_BEND_DEFAULT = 2;     // semitones a bend rises when u carries no number: a whole step, as u1
const TS_BEND_VALUE = 0.25;    // a bend rises over a sixteenth note at the tempo, at most half the note
const TS_ACCENT = 2;           // an accented note doubles its gain, about 6 dB, before the cap at full
const TS_STACCATO = 0.5;       // share of the written value a staccato note sounds
const TS_LEGATO_OVERLAP = 0.1; // seconds a legato note sounds into the next note

// "C#4~." -> {pitch: "C#4", marks: Set{"~", "."}}; MIDI numbers and rests pass through
function tsSplitMarks(text) {
    var s = String(text), marks = new Set(), found = true, i, m, bend, size, cycles = 0;
    while (found && s.length > 1) {
        found = false;
        size = /u(d?)(\d+(?:\.\d+)?|\.\d+)?$/i.exec(s); // a bend, with its size in whole steps after u or ud: u.5 a half step, u1.5, ud.5
        if (size && size.index > 0) {
            if (size[2] !== undefined) bend = parseFloat(size[2]) * 2; // in semitones; one size serves every repeat: C4ududud.25
            else if (bend === undefined) bend = TS_BEND_DEFAULT;
            marks.add('u');
            if (size[1]) { marks.add('d'); cycles += 1; } // ud repeated: that many cycles spread over the note
            s = s.slice(0, size.index);
            found = true;
            continue;
        }
        for (i = 0; i < TS_NOTE_MARKS.length; i++) {
            m = TS_NOTE_MARKS[i];
            if (s.length > m.length && s.slice(-m.length).toLowerCase() === m) {
                marks.add(m);
                s = s.slice(0, -m.length);
                found = true;
                break;
            }
        }
    }
    return { pitch: s, marks: marks, bend: bend, cycles: cycles };
}

// "p cresc" -> {dynamic: "p", change: "cresc"}
function tsParseMarksText(text) {
    var out = { dynamic: null, change: null };
    String(text == null ? '' : text).toLowerCase().split(/[\s,]+/).forEach(function (tok) {
        if (!tok) return;
        if (TS_DYNAMICS.hasOwnProperty(tok)) out.dynamic = tok;
        else if (tok === 'cresc' || tok === 'crescendo') out.change = 'cresc';
        else if (tok === 'dim' || tok === 'diminuendo' || tok === 'decresc') out.change = 'dim';
        else throw new Error('Unknown mark "' + tok + '". Use pp, p, mp, mf, f, ff, cresc or dim.');
    });
    return out;
}

function tsIsRest(p) {
    return typeof p === 'string' && p.toLowerCase() === 'r';
}

function tsPitchNumber(p) {
    if (typeof p === 'number') return p;
    if (typeof p !== 'string') return undefined;
    if (window.isNumber(p)) return +p;
    return window.parent.midiPitches[window._convertToSharp(p)];
}

// the highest note of a chord, which Current Note reports
function tsTopNote(notes) {
    var top = '', best = -Infinity;
    notes.forEach(function (n) {
        var name = (typeof n === 'string' && n.length && !window.isNumber(n)) ? n.charAt(0).toUpperCase() + n.slice(1) : n,
            v = tsPitchNumber(name);
        if (v !== undefined && v > best) { best = v; top = name; }
    });
    return top;
}

// compare by MIDI number so enharmonic ties (Eb4~ -> D#4) work
function tsSamePitches(a, b) {
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false;
        var as = a.map(tsPitchNumber).sort(), bs = b.map(tsPitchNumber).sort();
        return as.every(function (v, i) { return v !== undefined && v === bs[i]; });
    }
    if (Array.isArray(a) || Array.isArray(b)) return false;
    var na = tsPitchNumber(a);
    return na !== undefined && na === tsPitchNumber(b);
}

// one (note, duration, marks) pair -> a playback event
function tsCheckPitch(p) {
    if (Array.isArray(p)) {
        throw new Error('A list is where a note belongs. Put measures in a Section, not in another Measure, and give each pair one note or chord.');
    }
    if (typeof p === 'string' && (tsIsRest(p) || p === '')) return p;
    if (tsPitchNumber(p) === undefined) {
        throw new Error('Unknown note "' + p + '". Write a name like C4, F#4 or Bb3, or a MIDI number from 0 to 127.');
    }
    return p;
}

function tsEventFromPair(pair, tempo) {
    var note = pair[0], durText = pair[1], seconds, grace = false, marks = new Set(), pitch, split, durName, durValue, bend = null;
    if (typeof note === 'string') note = note.trim();
    if (typeof durText === 'string') durText = durText.trim();
    if (window.isNumber(durText)) {
        seconds = parseFloat(durText); // a number is seconds
    } else {
        durName = String(durText).toLowerCase().replace(/[\s\-]+/g, '');
        if (durName === 'grace') {
            grace = true;
            seconds = 0;
        } else {
            durValue = window.noteLengthNormalized[durName];
            if (durValue === undefined) {
                console.warn('TuneScope: unknown note duration "' + durText + '", using a quarter');
                durValue = window.noteLengthNormalized['quarter'];
            }
            seconds = durValue * (window.baseTempo / tempo);
        }
    }
    if (Array.isArray(note)) { // chord: a mark on any tone applies to the chord
        pitch = note.map(function (n) {
            if (typeof n !== 'string') return tsCheckPitch(n);
            var s = tsSplitMarks(n.trim());
            s.marks.forEach(function (m) { marks.add(m); });
            return tsCheckPitch(s.pitch);
        });
    } else if (typeof note === 'string') {
        split = tsSplitMarks(note);
        pitch = tsCheckPitch(split.pitch);
        marks = split.marks;
        if (marks.has('u') && split.bend) bend = { semitones: split.bend, release: marks.has('d'), cycles: split.cycles };
    } else {
        pitch = tsCheckPitch(note);
    }
    split = tsParseMarksText(pair.length > 2 ? pair[2] : '');
    return { note: pitch, written: seconds, grace: grace, marks: marks, dynamic: split.dynamic, change: split.change, tie: false, bend: bend };
}

// Merge tied notes: a pitch marked ~ followed by the same pitch becomes one
// longer event, chaining across any number of measures. Every event is copied,
// so expanded loops that repeat the same event objects stay independent.
function tsMergeTies(events) {
    var merged = [], i = 0, ev, next, out;
    while (i < events.length) {
        ev = events[i];
        out = { note: ev.note, written: ev.written, grace: ev.grace, marks: new Set(ev.marks), dynamic: ev.dynamic, change: ev.change, tie: false, glideStart: 0, bend: ev.bend || null };
        while (out.marks.has('~') && i + 1 < events.length && tsSamePitches(out.note, events[i + 1].note)) {
            next = events[i + 1];
            // a glide marked on a later tied segment waits for that segment: the
            // note holds steady until then and bends only across it
            if (next.marks.has('/') && !out.marks.has('/')) out.glideStart = out.written;
            out.written += next.written;
            out.marks.delete('~');
            next.marks.forEach(function (m) { out.marks.add(m); });
            if (!out.dynamic) out.dynamic = next.dynamic;
            if (!out.change) out.change = next.change;
            out.tie = true;
            i++;
        }
        if (out.marks.has('~')) {
            console.warn('Tied note has nothing to tie to and plays as a plain note:', out.note);
            out.marks.delete('~');
        }
        if (out.written > 0) out.grace = false; // a grace tied into a real note is that note
        merged.push(out);
        i++;
    }
    return merged;
}

// the named level one step above (dir 1) or below (dir -1) a level
function tsStepLevel(level, dir) {
    var nearest = 0, i;
    for (i = 1; i < TS_DYNAMIC_ORDER.length; i++) {
        if (Math.abs(TS_DYNAMICS[TS_DYNAMIC_ORDER[i]] - level) < Math.abs(TS_DYNAMICS[TS_DYNAMIC_ORDER[nearest]] - level)) nearest = i;
    }
    i = Math.min(TS_DYNAMIC_ORDER.length - 1, Math.max(0, nearest + dir));
    return TS_DYNAMICS[TS_DYNAMIC_ORDER[i]];
}

// A dynamic holds until the next one. cresc or dim changes the level note by
// note up to the next dynamic mark, reaching it on that mark's note; with no
// later mark the level moves one step by the last note.
function tsApplyDynamics(events) {
    var level = TS_DYNAMICS.mf, i, j, k, target;
    for (i = 0; i < events.length; i++) {
        if (events[i].dynamic) level = TS_DYNAMICS[events[i].dynamic];
        if (events[i].level === undefined) events[i].level = level;
        level = events[i].level;
        if (!events[i].change) continue;
        for (j = i + 1; j < events.length && !events[j].dynamic; j++) { /* find the next dynamic mark */ }
        if (j < events.length) {
            target = TS_DYNAMICS[events[j].dynamic];
        } else {
            j = events.length - 1;
            target = tsStepLevel(level, events[i].change === 'cresc' ? 1 : -1);
        }
        for (k = i + 1; k <= j; k++) {
            events[k].level = level + (target - level) * (k - i) / (j - i);
        }
    }
}

// sounding length, accent, glide and run for each event of one track
function tsApplyArticulation(events, instrument, tempo) {
    var data = window.parent.instrumentData[instrument];
    var isDrum = data.drumPitch !== undefined;
    var canSlide = window.tsCanSlide(instrument);
    var thirtySecond = 0.125 * (window.baseTempo / tempo);
    events.forEach(function (ev, i) {
        var next = events[i + 1], thisMidi, nextMidi, delta, n;
        ev.accent = ev.marks.has('>');
        ev.sound = ev.grace ? thirtySecond : ev.written;
        if (!ev.grace && ev.marks.has('.')) ev.sound = ev.written * TS_STACCATO;
        else if (!ev.grace && ev.marks.has('-') && next) ev.sound = ev.written + TS_LEGATO_OVERLAP;
        ev.glide = null;
        ev.run = null;
        if (isDrum || ev.grace || Array.isArray(ev.note) || tsIsRest(ev.note)) return;
        thisMidi = tsPitchNumber(ev.note);
        if (thisMidi === undefined) return;
        if (ev.marks.has('/') && next && !next.grace && !Array.isArray(next.note) && !tsIsRest(next.note)) {
            nextMidi = tsPitchNumber(next.note);
            delta = nextMidi - thisMidi;
            if (nextMidi !== undefined && delta !== 0) {
                if (canSlide) {
                    ev.glide = { delta: delta };
                } else { // every semitone from this note toward the next, within the written value
                    ev.run = [];
                    for (n = 0; n < Math.abs(delta); n++) ev.run.push(thisMidi + n * Math.sign(delta));
                }
            }
        }
        // a bend (u): the pitch rises over a sixteenth at the tempo, at most half the
        // note, and holds; ud comes back to the written pitch over the last sixteenth.
        // A slide to the next note starts from the bent pitch and replaces the release.
        ev.bendPoints = null;
        if (ev.bend && canSlide) ev.bendPoints = tsBendPoints(ev.bend, ev.sound, tempo, !!ev.glide);
    });
    tsJoinSlides(events);
}

// the pitch points of a bend, in semitones from the note and seconds from its
// start. ud written several times spreads that many up-and-down cycles evenly
// over the note, a wide slow vibrato.
function tsBendPoints(bend, sound, tempo, slidesOn) {
    var rise = Math.min(TS_BEND_VALUE * (window.baseTempo / tempo), sound / 2), points, period, k;
    if (bend.release && !slidesOn && bend.cycles > 1) {
        points = [];
        period = sound / bend.cycles;
        for (k = 0; k < bend.cycles; k++) {
            points.push({ delta: bend.semitones, when: (k + 0.5) * period });
            points.push({ delta: 0, when: (k + 1) * period });
        }
        return points;
    }
    points = [{ delta: bend.semitones, when: rise }];
    if (bend.release && !slidesOn) {
        points.push({ delta: bend.semitones, when: Math.max(rise, sound - rise) });
        points.push({ delta: 0, when: sound });
    }
    return points;
}

// A slide is one continuous sound: the note bends into the next note's pitch
// and then holds it for that note's duration, instead of striking the next
// note again. Slides chain through consecutive glides. The notes reached by
// the slide are absorbed: they keep their written value for the measure
// scan but make no sound of their own.
function tsJoinSlides(events) {
    var i, j, first, cur, next, when, delta, points, chain, bent;
    for (i = 0; i < events.length; i++) {
        first = events[i];
        if (!first.glide || first.absorbed) continue;
        points = [];
        chain = []; // the notes reached, with the moment each is reached
        when = 0;
        delta = 0;
        cur = first;
        j = i;
        for (;;) {
            next = events[j + 1]; // exists: a glide is only set when a target follows
            bent = cur.bendPoints ? cur.bend.semitones : 0; // a bend on this note: up first, then on to the next pitch
            if (bent) points.push({ delta: delta + bent, when: when + cur.bendPoints[0].when });
            if (cur.glideStart > 0) { // a tied note: hold until the segment marked / begins
                points.push({ delta: delta + bent, when: when + cur.glideStart });
                chain.push({ ev: cur, arrival: when + cur.glideStart });
            }
            when += cur.written;
            delta += cur.glide.delta;
            points.push({ delta: delta, when: when }); // reach the next pitch as it begins
            chain.push({ ev: next, arrival: when });
            next.absorbed = true;
            if (next.glide) { // and bend on from there
                cur = next;
                j += 1;
                continue;
            }
            if (next.bendPoints) { // the note reached has a bend of its own
                next.bendPoints.forEach(function (pt) { points.push({ delta: delta + pt.delta, when: when + pt.when }); });
                if (!next.bend.release) points.push({ delta: delta + next.bend.semitones, when: when + next.written });
            } else {
                points.push({ delta: delta, when: when + next.written }); // hold it
            }
            first.sound = when + next.sound; // the last note's articulation shapes the end
            break;
        }
        first.glide = { slides: points, chain: chain };
    }
}

// The loudness of a slide follows the notes it reaches: it swells or fades
// across each bend to the next note's level, relative to the first note's.
function tsSlideGains(ev, vol, global, instrumentScale) {
    var gains = [], changes = false;
    if (!(vol > 0) || !ev.glide || !ev.glide.chain) return undefined;
    ev.glide.chain.forEach(function (m) {
        var level = Math.min(1, global * instrumentScale * m.ev.level * (m.ev.accent ? TS_ACCENT : 1));
        gains.push({ ratio: level / vol, when: m.arrival });
        if (Math.abs(level - vol) > 0.000001) changes = true;
    });
    return changes ? gains : undefined;
}

function tsNoteText(note) {
    if (Array.isArray(note)) return 'chord ' + note.join(' ');
    if (tsIsRest(note)) return 'rest';
    return 'note ' + note;
}

// A note may not cross a barline unless it is tied. Checked before any sound,
// so that a measure with too many beats stops with a message instead of the
// barline snap that used to cut it.
function tsCheckBarlines(events, trackNumber, instrument, secondsPerMeasure) {
    var sum = 0, i, ev, end, measure, nextBar;
    for (i = 0; i < events.length; i++) {
        ev = events[i];
        end = sum + ev.written;
        measure = Math.floor(sum / secondsPerMeasure + 0.000001) + 1;
        nextBar = measure * secondsPerMeasure;
        if (!ev.tie && sum < nextBar - 0.000001 && end > nextBar + 0.000001) {
            throw new Error('The ' + tsNoteText(ev.note) + ' in track ' + trackNumber + ' (' + instrument + ') crosses the barline at the end of measure ' + measure
                + '. Check the measures with Beats in Measure, or tie the note across the barline with ~.');
        }
        sum = end;
    }
}

// Track lists -> [header, ...events] per track, ready to schedule. Runs before
// any sound so that a notation error reaches Snap as an ordinary error.
function tsPrepareTracks(tracksList, tempo, beatsPerMeasure) {
    if (!tracksList.contents) return null;
    var tracks = window.toLowerCaseRecursive(window.convertListToArrayRecursive(tracksList));
    var haveDefinitive = false, i, j, header, events, totalSeconds = 0, secondsInLoop, loopCount, expanded, prepared = [];

    for (i = 0; i < tracks.length; i++) {
        if (!Array.isArray(tracks[i]) || !Array.isArray(tracks[i][0])) {
            throw new Error('Each item of Play Tracks must be a Track or Drum Track block.');
        }
        header = tracks[i][0].slice();
        // toLowerCaseRecursive leaves strings with digits alone (note names), so an
        // instrument such as "Snare 1" or "Kick 2" is lowercased here
        header[0] = String(header[0]).toLowerCase();
        header[1] = tsCanonicalName(String(header[1]).toLowerCase());
        if (header[0] === 'melody' || header[0] === 'chords') haveDefinitive = true;
        if (!window.parent.instrumentData[header[1]]) {
            throw new Error('Unknown instrument "' + header[1] + '". Choose one from the Set Instrument To menu.');
        }
        events = [];
        for (j = 1; j < tracks[i].length; j++) {
            // a list of pairs where one pair belongs: its first item is a pair and its
            // second is another pair or missing (a chord pair has a duration there)
            if (Array.isArray(tracks[i][j]) && tracks[i][j].length && Array.isArray(tracks[i][j][0])
                    && (tracks[i][j].length < 2 || Array.isArray(tracks[i][j][1]))) {
                throw new Error('A list of pairs is where one pair belongs. Put measures in a Section, not in another Measure.');
            }
            if (!Array.isArray(tracks[i][j]) || tracks[i][j].length < 2) {
                throw new Error('Each note must be a (note, duration) pair, not "' + tracks[i][j] + '".');
            }
            events.push(tsEventFromPair(tracks[i][j], tempo));
        }
        prepared.push({ header: header, events: events });
    }
    if (!haveDefinitive) {
        console.error("No Melody or Chord track provided, only Chord/Drum Loop");
        return null;
    }

    // song length = the longest melody/chords track (loops repeat to fill it)
    for (i = 0; i < prepared.length; i++) {
        if (prepared[i].header[0] !== 'melody' && prepared[i].header[0] !== 'chords') continue;
        totalSeconds = Math.max(totalSeconds, prepared[i].events.reduce(function (s, ev) { return s + ev.written; }, 0));
    }

    for (i = 0; i < prepared.length; i++) {
        header = prepared[i].header;
        events = prepared[i].events;
        if (header[0] === 'loop-melody' || header[0] === 'loop-chords') {
            secondsInLoop = events.reduce(function (s, ev) { return s + ev.written; }, 0);
            // ceil, not truncate: the final partial repetition used to be dropped
            loopCount = secondsInLoop > 0 ? Math.ceil(totalSeconds / secondsInLoop - 0.000001) : 0;
            expanded = [];
            for (j = 0; j < loopCount; j++) expanded = expanded.concat(events);
            events = expanded;
            header[0] = header[0] === 'loop-chords' ? 'chords' : 'melody';
        }
        events = tsMergeTies(events);
        tsCheckBarlines(events, i + 1, header[1], (window.baseTempo / tempo) * beatsPerMeasure[0] * beatsPerMeasure[1]);
        tsApplyDynamics(events);
        tsApplyArticulation(events, header[1], tempo);
        prepared[i] = [header].concat(events);
    }
    return { tracks: prepared, totalSeconds: totalSeconds };
}

// start the sound(s) of one event at an absolute audio-clock time
function tsScheduleEvent(ev, sound, instrument, record, vol, when, gains) {
    var note = ev.note, i, sub, start;
    if (ev.absorbed) { // reached by a slide: already sounding
        if (record) window.currentNote = Array.isArray(note) ? tsTopNote(note) : note;
        return;
    }
    if (Array.isArray(note)) { // chord: every pitch starts at the same instant
        if (record) window.currentNote = tsTopNote(note);
        for (i = 0; i < note.length; i++) window.playNote(note[i], sound, instrument, false, vol, when);
        return;
    }
    if (ev.run) { // a keyboard glide: every semitone toward the next note, within the written value
        if (record) window.currentNote = note;
        // on a tied note the run waits for the segment marked /: the note itself
        // holds from the start until the first step, with one attack
        start = ev.glideStart || 0;
        sub = (ev.written - start) / ev.run.length;
        window.playNote(ev.run[0], start + sub, instrument, false, vol, when);
        for (i = 1; i < ev.run.length; i++) window.playNote(ev.run[i], sub, instrument, false, vol, when + start + i * sub);
        return;
    }
    window.playNote(note, sound, instrument, record, vol, when, ev.glide ? ev.glide.slides : (ev.bendPoints || undefined), gains);
}

// Notes are queued this far ahead of the audio clock.
const TS_SCHEDULE_AHEAD = 0.15;
// A performance that starts this close to the previous one's end starts exactly
// there, so Play Tracks blocks chained with Play Tracks and Wait join without a gap.
const TS_CHAIN_AHEAD = 0.3, TS_CHAIN_PAST = 0.1;

// the items of a Snap list as an array
function tsItems(list) {
    return list && typeof list.itemsArray === 'function' ? list.itemsArray() : (list && list.contents) || [];
}

// A Group is a list ["Group", time signature, tempo, tracks], made by Import
// MIDI File, or by the Group Tracks for Export block of older projects ("Track
// Group" was that block's first name). Play Tracks takes either Track blocks
// or Groups; the Export Tracks forms of older projects take Groups.
function tsIsTrackGroup(item) {
    var items = tsItems(item), marker = items.length >= 4 && typeof items[0] === 'string' ? items[0].trim().toLowerCase() : '';
    return marker === 'group' || marker === 'track group';
}

// The performances a Play Tracks or Export Tracks block describes: one per
// Group, each with the group's time signature and tempo (an empty tempo
// means the tempo of the moment). The older forms of the blocks, kept for
// saved projects, also take plain tracks with the block's own time signature
// (allowPlain).
function tsGroupsOf(tracksList, timeSignature, tempo, blockName, allowPlain) {
    var items = tsItems(tracksList), groups = items.filter(tsIsTrackGroup), name = blockName || 'Play Tracks';
    if (!groups.length) {
        if (allowPlain) return [{ tracks: tracksList, timeSignature: timeSignature, tempo: tempo }];
        throw new Error(name + ' takes only groups made with Group Tracks for Export.');
    }
    if (groups.length !== items.length) {
        throw new Error(allowPlain ? name + ' takes Track blocks or groups from Import MIDI File, not both.'
                                   : name + ' takes only groups made with Group Tracks for Export.');
    }
    return groups.map(function (g) {
        var fields = tsItems(g), groupTempo = +fields[2];
        return { tracks: fields[3], timeSignature: fields[1], tempo: groupTempo > 0 ? groupTempo : tempo };
    });
}

// Parses one performance: tracks with their time signature and tempo. Returns
// null when there is nothing to play (no Melody or Chords track). Throws
// where Snap shows an error on the block.
function tsPreparePerformance(tracksList, timeSignature, tempo) {
    const beatsPerMeasure = window.tsParseTimeSignature(timeSignature);
    const prepared = tsPrepareTracks(tracksList, tempo, beatsPerMeasure);
    if (!prepared) return null;
    // beat value included: a 6/8 measure is 6 eighth-note beats = 3
    // quarter-note units, matching the Beats in Measure validator
    const secondsPerMeasure = (window.baseTempo / tempo) * beatsPerMeasure[0] * beatsPerMeasure[1];
    // slack: a song a hair longer than N measures is N measures, not N + 1
    const totalMeasures = Math.ceil(prepared.totalSeconds / secondsPerMeasure - 0.000001);
    return { tracks: prepared.tracks, totalSeconds: prepared.totalSeconds, beatsPerMeasure: beatsPerMeasure, tempo: tempo,
             secondsPerMeasure: secondsPerMeasure, totalMeasures: totalMeasures, seconds: totalMeasures * secondsPerMeasure };
}

// Schedules a prepared performance on the audio clock and returns {start, end,
// done}: end is the final barline, loops included, and done settles when every
// note has been queued. options.startAt anchors the start; options.render
// lays every note out at once into the off-line context that tsRenderTarget
// points at (Export Tracks), with no pacing, pausing or chaining.
// options.fromMeasure (1 and up) starts the music at the barline before that
// measure; the measures before it are skipped.
function tsSchedulePerformance(prep, options) {
    const render = !!(options && options.render);
    const ctx = render ? options.render.context : window.audioContext;
    if (!render) window.parent._ts_pausePlayback = false;
    const performance = { start: 0, end: 0, done: null };

    const wait = (duration) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, duration)
        })
    }

    // Notes are scheduled on the AudioContext clock (each onset at an
    // absolute time derived from the measure start), not at "now" when the
    // JS timer happens to fire - setTimeout only paces the loop, staying
    // scheduleAheadTime ahead, so timer jitter never shifts or accumulates
    // into the audio.
    const scheduleAheadTime = TS_SCHEDULE_AHEAD;

    const playTrackMeasure = async (currTrack, measureIndex, beatsPerMeasure, tempo, instrument, currTrackIndex, measureStartTime, startOffset) => {
        // startOffset > 0 when a tied note spilled over the barline: this
        // measure's first note starts mid-measure, at its true position
        var elapsedMeasureTime = startOffset;
        var steal = 0; // seconds grace notes take from the start of the next note
        // measure length honors the beat value (beatsPerMeasure[1]): in 6/8
        // the eighth note gets the beat, so 6 beats span 3 quarter-note units
        const timeEndIndex = beatsPerMeasure[0] * beatsPerMeasure[1] * (window.baseTempo / tempo);

        // the same millionth-of-a-second slack as the measure cursor: sums of
        // triplet or dotted values can fall a hair short of the measure, which
        // used to pull the next measure's first note in here as well
        while (elapsedMeasureTime < timeEndIndex - 0.000001) {
            if (!render && window.parent._ts_pausePlayback) break;
            if(!currTrack[measureIndex]) break; // ran past the end of the track
            const ev = currTrack[measureIndex];
            measureIndex++; //increment for the next index in the track

            // the volume is read now, so Set Global Volume To during playback reaches the next note
            // a performance recorded for Export Tracks keeps the volumes of the moment it was recorded
            const volumes = prep.volumes || { global: window.parent.globalInstrumentVolume, instruments: window.parent.instrumentVolumes };
            const instrumentScale = (typeof volumes.instruments[instrument] === 'number')
                ? volumes.instruments[instrument] : 1;
            const vol = Math.min(1, volumes.global * instrumentScale * ev.level * (ev.accent ? TS_ACCENT : 1));
            const onset = measureStartTime + elapsedMeasureTime + steal;
            let sound = ev.sound;
            if (ev.grace) {
                steal += ev.sound;
            } else {
                sound = Math.max(0.02, sound - steal);
                steal = 0;
            }
            tsScheduleEvent(ev, sound, instrument, currTrackIndex === 0 && !render, vol, onset,
                tsSlideGains(ev, vol, volumes.global, instrumentScale));

            // the written value, not the sounding length, moves the measure along
            elapsedMeasureTime += ev.written;

            // pace the loop against the audio clock until shortly before the next onset
            const secondsUntilNextNote = (measureStartTime + elapsedMeasureTime)
                - ctx.currentTime - scheduleAheadTime;
            if (!render && secondsUntilNextNote > 0) await wait(secondsUntilNextNote * 1000);
            // an off-line rendering advances in windows: wait until it has reached the window that holds the next note
            if (render && options.render.clock) await options.render.clock.waitUntil(measureStartTime + elapsedMeasureTime);
        }

    }

    const playTracks = async (tracks, beatsPerMeasure, tempo) => {
        const secondsPerMeasure = prep.secondsPerMeasure;
        const totalMeasures = prep.totalMeasures;
        const firstMeasure = (options && options.fromMeasure > 1) ? options.fromMeasure - 1 : 0;

        // Anchor the whole performance to the audio clock: every note's time
        // is performanceStartTime + its measure's offset + its place in the
        // measure, so the tracks share one grid and cannot drift apart.
        // A performance begun as the previous one ends (Play Tracks and Wait
        // lets the script go on a scheduling lead before the final barline)
        // starts on that barline, so the two join seamlessly.
        const now = ctx.currentTime, prevEnd = window.tsPerformanceEnd;
        let performanceStartTime;
        if (options && typeof options.startAt === 'number') performanceStartTime = options.startAt;
        else if (typeof prevEnd === 'number' && prevEnd > now - TS_CHAIN_PAST && prevEnd < now + TS_CHAIN_AHEAD) performanceStartTime = prevEnd;
        else performanceStartTime = now + scheduleAheadTime;
        performance.start = performanceStartTime;
        performance.end = performanceStartTime + (totalMeasures - firstMeasure) * secondsPerMeasure;
        if (!render) window.tsPerformanceEnd = performance.end;

        // Each track walks the measures on its own, paced by its own notes.
        // Tracks never wait for one another: a track whose last note is tied
        // past a barline, or whose scheduling runs late, delays only itself.
        // (Until this change every track's measure was awaited before any
        // track began the next, and a tie past the barline held them all.)
        // The per-track cursor resumes each measure where the previous one
        // left off: elapsedTime only grows, so the start index only moves
        // forward and each duration is added once, in order, making the
        // whole play linear, not quadratic, in the number of notes.
        const playTrack = async (currTrack, j) => {
            const instrument = currTrack[0][1];
            const cur = { index: 1, sum: 0 };
            for (let i = firstMeasure; i < totalMeasures; i++) {
                if (!render && window.parent._ts_pausePlayback) break;
                const measureStartTime = performanceStartTime + (i - firstMeasure) * secondsPerMeasure;
                // elapsed seconds at this measure's barline
                const elapsedTime = i * secondsPerMeasure;
                // advance to the first event whose start (the sum of earlier
                // written values) reaches this barline
                while (cur.index < currTrack.length && cur.sum < elapsedTime - 0.000001) {
                    cur.sum += currTrack[cur.index].written;
                    cur.index++;
                }
                // track exhausted: nothing left to play
                if (cur.index >= currTrack.length) break;
                // only a tied note reaches past a barline (tsCheckBarlines refuses
                // anything else), so this measure's first note starts where the
                // tie ends: notes are never moved to re-align a track. In the
                // first measure played, the tie from a skipped measure is silent.
                const startOffset = Math.max(0, cur.sum - elapsedTime);
                await playTrackMeasure(currTrack, cur.index, beatsPerMeasure, tempo, instrument, j, measureStartTime, startOffset);
            }
        };
        await Promise.all(tracks.map((currTrack, j) => playTrack(currTrack, j)));
    }

    performance.done = playTracks(prep.tracks, prep.beatsPerMeasure, prep.tempo);
    return performance;
}

// Schedules prepared performances one after another, each starting on the
// previous one's final barline. Returns {start, end, done} of the whole, or
// null when none of them has anything to play. options.fromMeasure applies to
// the first performance only.
function tsScheduleSequence(preps, options) {
    var first = null, last = null, dones = [];
    preps.forEach(function (prep) {
        var perf;
        if (!prep) return;
        perf = tsSchedulePerformance(prep, Object.assign({}, options || {}, last ? { startAt: last.end, fromMeasure: 0 } : {}));
        if (!first) first = perf;
        last = perf;
        dones.push(perf.done);
    });
    return first ? { start: first.start, end: last.end, done: Promise.all(dones) } : null;
}
window.tsScheduleSequence = tsScheduleSequence;
window.tsPreparePerformance = tsPreparePerformance;

// prepares every group first, where Snap shows an error, then plays them in
// order; fromMeasure, when given, is a measure of the first group
function tsStartSequence(groups, fromMeasure) {
    var preps = groups.map(function (g) { return tsPreparePerformance(g.tracks, g.timeSignature, g.tempo); }), first;
    if (!(fromMeasure > 1)) return tsScheduleSequence(preps);
    first = preps[0];
    if (!first || fromMeasure > first.totalMeasures) {
        throw new Error('The music has ' + (first ? first.totalMeasures : 0) + ' measure' + (first && first.totalMeasures === 1 ? '' : 's')
            + ', so it cannot start from measure ' + fromMeasure + '.');
    }
    return tsScheduleSequence(preps, { fromMeasure: fromMeasure });
}

// Play Tracks. With the and Wait switch off the block returns at once, so two
// Play Tracks blocks in a row start together. With it on the block holds the
// script until the music reaches its final barline, letting go one scheduling
// lead early so that a Play Tracks block that follows starts exactly on that
// barline (tsSchedulePerformance anchors it there). The stop sign ends the wait.
// fromMeasure (1 and up, 1 when left out) is the measure the music starts on.
function tsPlayTracksPrimitive(tracksList, timeSignature, tempo, wait, proc, allowPlain, fromMeasure) {
    const groups = tsGroupsOf(tracksList, timeSignature, tempo, 'Play Tracks', allowPlain);
    groups.forEach(function (g) { window.tsParseTimeSignature(g.timeSignature); }); // a bad time signature is refused before anything loads
    if (fromMeasure === undefined) fromMeasure = 1;
    if (!(fromMeasure >= 1 && fromMeasure === Math.floor(fromMeasure))) {
        throw new Error('from Measure must be a whole number from 1 up, not "' + fromMeasure + '".');
    }
    if (proc && proc.tsRecording) return tsRecordPerformance(proc.tsRecording, groups, wait, fromMeasure);
    const keys = tsTrackInstruments(tracksList);
    if (wait !== true) {
        if (!tsInstrumentsLoaded(proc, keys)) return; // the block waits for the sound files
        tsStartSequence(groups, fromMeasure);
        return;
    }
    tsAwait(proc, function () {
        const pending = keys.filter(function (key) { return !tsInstrumentReady(key); });
        return Promise.all(pending.map(tsLoadInstrument)).then(function () {
            return tsStartSequence(groups, fromMeasure);
        });
    }, function (performance) {
        return !!performance && !window.parent._ts_pausePlayback
            && window.audioContext.currentTime < performance.end - TS_SCHEDULE_AHEAD;
    });
}

// A performance from measure fromMeasure on: the measures before it are cut
// off, and a note tied across the cut becomes a rest, as Play Tracks plays it.
function tsTrimPerformance(prep, fromMeasure) {
    var cut = (fromMeasure - 1) * prep.secondsPerMeasure, totalMeasures = prep.totalMeasures - fromMeasure + 1;
    if (fromMeasure > prep.totalMeasures) {
        throw new Error('The music has ' + prep.totalMeasures + ' measure' + (prep.totalMeasures === 1 ? '' : 's')
            + ', so it cannot start from measure ' + fromMeasure + '.');
    }
    if (fromMeasure <= 1) return prep;
    return Object.assign({}, prep, {
        totalMeasures: totalMeasures,
        seconds: totalMeasures * prep.secondsPerMeasure,
        totalSeconds: Math.max(0, prep.totalSeconds - cut),
        tracks: prep.tracks.map(function (track) {
            var out = [track[0]], sum = 0;
            track.slice(1).forEach(function (ev) {
                var end = sum + ev.written;
                if (sum >= cut - 0.000001) out.push(ev);
                else if (end > cut + 0.000001) {
                    out.push({ note: 'r', written: end - cut, sound: end - cut, grace: false, marks: new Set(), level: ev.level, accent: false, tie: false });
                }
                sum = end;
            });
            return out;
        })
    });
}

// Play Tracks inside the script of Export Tracks: the performance is added to
// the recording with the tempo and volumes of the moment, and nothing plays
function tsRecordPerformance(recording, groups, wait, fromMeasure) {
    if (wait !== true) {
        throw new Error('In Export Tracks, every Play Tracks block needs and Wait on.');
    }
    var volumes = { global: window.parent.globalInstrumentVolume, instruments: Object.assign({}, window.parent.instrumentVolumes) };
    groups.forEach(function (g, i) {
        var prep = tsPreparePerformance(g.tracks, g.timeSignature, g.tempo);
        if (!prep) {
            if (i === 0 && fromMeasure > 1) tsTrimPerformance({ totalMeasures: 0 }, fromMeasure);
            return;
        }
        if (i === 0) prep = tsTrimPerformance(prep, fromMeasure);
        prep.volumes = volumes;
        recording.preps.push(prep);
    });
}

// the Play Tracks block: tracks with the block's time signature at the tempo
// of the moment (Set Tempo), or groups from Import MIDI File, the
// and Wait switch, and the from Measure input, a list of no item (collapsed,
// measure 1) or one item (expanded; empty means measure 1)
SnapExtensions.primitives.set(
    'ts_playtracks(tracks, timesignature, currenttempo, wait, frommeasure)',
    function (tracksList, timeSignature, currentTempo, wait, fromMeasure, proc) {
        var m = (fromMeasure && typeof fromMeasure === 'object') ? tsItems(fromMeasure)[0] : fromMeasure;
        return tsPlayTracksPrimitive(tracksList, timeSignature, currentTempo, wait, proc, true,
            (m === '' || m === null || m === undefined) ? 1 : (isNaN(+m) ? m : +m));
    }
);

// the form called by the Play Tracks block of projects saved before the
// block lost its tempo input: an empty tempo means the tempo of the moment
SnapExtensions.primitives.set(
    'ts_playtracks(tracks, timesignature, tempo, currenttempo, wait)',
    function (tracksList, timeSignature, tempo, currentTempo, wait, proc) {
        var bpm = +tempo > 0 ? +tempo : currentTempo;
        return tsPlayTracksPrimitive(tracksList, timeSignature, bpm, wait, proc, true);
    }
);

// the forms with a time signature of their own, called by the Play Tracks
// block of projects saved before Groups existed: plain tracks allowed
SnapExtensions.primitives.set(
    'ts_playtracks(tracklist, timesignature, tempo, wait)',
    function (tracksList, timeSignature, tempo, wait, proc) {
        return tsPlayTracksPrimitive(tracksList, timeSignature, tempo, wait, proc, true);
    }
);
SnapExtensions.primitives.set(
    'ts_playtracks(tracklist, timesignature)',
    function (tracksList, timeSignature, tempo, proc) {
        return tsPlayTracksPrimitive(tracksList, timeSignature, tempo, false, proc, true);
    }
);

// ---- Export Tracks ----
// The performances of Play Tracks, written to a file: mid and musicxml from
// the written timeline, wav and mp3 from an off-line rendering of the same
// performance (TS_export.js). The block holds the script until the download
// starts; errors land on the block. While a wav or mp3 is made, Snap!'s
// message shows how far along the piece the rendering is, "Exporting 1:23 of
// 3:07" for a wav, or "Rendering 1:23 of 3:07" for an mp3, which then shows
// "Exporting: MP3 42%" as it encodes. The stop sign ends the export without a file.
function tsExportFormat(format) {
    const fmt = String(format == null ? '' : format).trim().toLowerCase();
    if (['mid', 'wav', 'mp3', 'musicxml'].indexOf(fmt) === -1) {
        throw new Error('Unknown export format "' + format + '". Choose mid, wav, mp3 or musicxml.');
    }
    return fmt;
}

// writes prepared performances, one after another, to a file; makePreps runs
// once, when the export starts
function tsExportPreps(makePreps, format, name, proc, rcvr) {
        const fmt = tsExportFormat(format);
        const fileName = String(name == null ? '' : name).trim() || 'TuneScope';
        tsAwait(proc, function () {
            if (!window.tsExport) throw new Error('TuneScope is not loaded. Run Initialize TuneScope first.');
            const preps = makePreps().filter(Boolean);
            if (!preps.length) throw new Error('Nothing to export. Add a Play Tracks block with a Melody or Chords track.');
            const exp = window.tsExport, score = exp.score(preps);
            if (fmt === 'mid') return exp.save(exp.midi(score), fileName, '.mid');
            if (fmt === 'musicxml') return exp.save(exp.musicXml(score), fileName, '.musicxml');
            const ide = (rcvr && typeof rcvr.parentThatIsA === 'function' && typeof IDE_Morph !== 'undefined') ? rcvr.parentThatIsA(IDE_Morph) : null;
            var message = null;
            const clock = function (seconds) { var s = Math.max(0, Math.round(seconds)); return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2); };
            const show = function (text) { if (!ide) return; if (message) message.destroy(); message = ide.showMessage(text); };
            const clear = function () { if (message) { message.destroy(); message = null; } };
            const stopped = function () { return !!(proc.readyToTerminate || proc.isDead || (typeof proc.isRunning === 'function' && !proc.isRunning())); };
            const keys = [];
            preps.forEach(function (prep) { prep.tracks.forEach(function (t) { if (keys.indexOf(t[0][1]) === -1) keys.push(t[0][1]); }); });
            const pending = keys.filter(function (key) { return !tsInstrumentReady(key); });
            return Promise.all(pending.map(tsLoadInstrument))
                .then(function () { return fmt === 'mp3' ? exp.loadMp3Encoder() : null; })
                .then(function () { return exp.render(preps, 44100, function (done, total) { if (stopped()) { clear(); return false; } show((fmt === 'mp3' ? 'Rendering ' : 'Exporting ') + clock(done) + ' of ' + clock(total)); return true; }); })
                .then(function (audio) {
                    if (!audio || stopped()) return null;
                    return fmt === 'wav' ? exp.wav(audio) : exp.mp3(audio, 128, function (fraction) { if (stopped()) { clear(); return false; } show('Exporting: MP3 ' + Math.round(fraction * 100) + '%'); return true; });
                })
                .then(function (blob) { clear(); return blob && !stopped() ? exp.save(blob, fileName, '.' + fmt) : false; },
                      function (e) { clear(); throw e; });
        });
}

// the forms of Export Tracks that take Groups or tracks
function tsExportTracksPrimitive(tracksList, timeSignature, tempo, format, name, proc, allowPlain, rcvr) {
        tsExportFormat(format);
        const groups = tsGroupsOf(tracksList, timeSignature, tempo, 'Export Tracks', allowPlain);
        groups.forEach(function (g) { window.tsParseTimeSignature(g.timeSignature); });
        tsExportPreps(function () {
            return groups.map(function (g) { return tsPreparePerformance(g.tracks, g.timeSignature, g.tempo); });
        }, format, name, proc, rcvr);
}

// the stage of a sprite or of the stage itself, for its tempo
function tsStageOf(rcvr) {
    return (rcvr && typeof rcvr.parentThatIsA === 'function' && typeof StageMorph !== 'undefined') ? rcvr.parentThatIsA(StageMorph) : null;
}

// The Export Tracks block runs its script with the recording on: each Play
// Tracks block in it adds its performance, at the tempo and volumes of that
// moment, instead of playing (tsRecordPerformance). The recording belongs to
// the block's process, so an error or the stop sign ends it with the process.
// The tempo is set back as it was before the script once the script has run.
SnapExtensions.primitives.set(
    'ts_exportrecordstart(format)',
    function (format, proc) {
        var stage = tsStageOf(this);
        tsExportFormat(format);
        proc.tsRecording = { preps: [], tempo: stage ? stage.getTempo() : null };
    }
);
SnapExtensions.primitives.set(
    'ts_exportrecordsave(format, name)',
    function (format, name, proc) {
        var recording = proc.tsRecording, stage = tsStageOf(this);
        if (recording) {
            proc.tsRecording = null;
            if (stage && recording.tempo !== null) stage.setTempo(recording.tempo);
        }
        return tsExportPreps(function () { return recording ? recording.preps : []; }, format, name, proc, this);
    }
);

// the form called by the Export Tracks block of projects saved before the
// block took a script: Groups
SnapExtensions.primitives.set(
    'ts_exporttracks(groups, tempo, format, name)',
    function (groups, tempo, format, name, proc) {
        return tsExportTracksPrimitive(groups, null, tempo, format, name, proc, false, this);
    }
);
// the first form of the block, with a time signature of its own
SnapExtensions.primitives.set(
    'ts_exporttracks(tracklist, timesignature, tempo, format, name)',
    function (tracksList, timeSignature, tempo, format, name, proc) {
        return tsExportTracksPrimitive(tracksList, timeSignature, tempo, format, name, proc, true, this);
    }
);

// ---- Play Note with marks ----
// The marks of Play Tracks (. staccato, > accent, - legato),
// typed or chosen in the block's "with" menu, and the duration Grace work in
// Play Note too; ~ and / are ignored there,
// having no next note. Loudness comes from Set Global Volume To and Set Instrument
// Volume. A number is a length in whole notes, as Play Note always took it.
// the "with" menu of Play Note and Play Chord -> the marks of Play Tracks
const TS_ARTICULATIONS = { staccato: '.', legato: '-', accented: '>', accent: '>' };

function tsArticulationMarks(articulations, marks) {
    var items = [];
    if (articulations && articulations.contents !== undefined) items = window.convertListToArrayRecursive(articulations);
    else if (Array.isArray(articulations)) items = articulations;
    else if (articulations !== undefined && articulations !== null && articulations !== '') items = [articulations];
    items.forEach(function (a) {
        var key = String(a == null ? '' : a).toLowerCase().trim(), mark = TS_ARTICULATIONS[key];
        if (key === '') return;
        if (!mark) throw new Error('Unknown articulation "' + a + '". Choose Staccato, Legato or Accent.');
        marks.add(mark);
    });
    return marks;
}

// Play Chord: every tone of the list at once, with the marks found on any of
// them (a chord block puts its articulation on the lowest note)
SnapExtensions.primitives.set(
    'ts_playchord(chord, duration, tempo)',
    function (chord, duration, tempo, proc) {
        var items = tsListItems(chord), marks = new Set(), tones = [], play;
        if (!tsInstrumentsLoaded(proc, [String(window.parent.currentInstrumentName).toLowerCase()])) return; // waits for the sound file
        items.forEach(function (item) {
            var split = (typeof item === 'string') ? tsSplitMarks(item.trim()) : { pitch: item, marks: new Set() };
            split.marks.forEach(function (m) { marks.add(m); });
            tones.push(split.pitch);
        });
        play = SnapExtensions.primitives.get('ts_playnotemarked(note, duration, tempo, articulations, inchord)');
        tones.forEach(function (pitch) { play.call(this, String(pitch) + Array.from(marks).join(''), duration, tempo, null, true, proc); }, this);
        window.currentNote = tsTopNote(tones);
    }
);

SnapExtensions.primitives.set(
    'ts_playnotemarked(note, duration, tempo, articulations, inchord)',
    function (note, duration, tempo, articulations, inchord, proc) {
        var bpm = Math.max(20, +tempo || 60), quarter = 60 / bpm, thirtySecond = 0.125 * quarter;
        if (!tsInstrumentsLoaded(proc, [String(window.parent.currentInstrumentName).toLowerCase()])) return; // waits for the sound file
        var split = { marks: new Set() }, pitch = note, seconds, sound, grace = false, durName, value;
        var name, instrumentScale, vol;
        if (typeof note === 'string') {
            split = tsSplitMarks(note.trim());
            pitch = split.pitch;
            if (pitch.length && !window.isNumber(pitch)) pitch = pitch.charAt(0).toUpperCase() + pitch.slice(1);
        }
        tsArticulationMarks(articulations, split.marks);
        if (pitch === '') return;
        if (!tsIsRest(pitch)) tsCheckPitch(pitch);
        if (!inchord) window.currentNote = pitch; // Play Chord records its top note instead
        if (tsIsRest(pitch)) return;
        if (window.isNumber(duration)) {
            seconds = parseFloat(duration) * 4 * quarter;
        } else {
            durName = String(duration).toLowerCase().replace(/[\s\-]+/g, '');
            if (durName === 'grace') {
                grace = true;
                seconds = thirtySecond;
            } else {
                value = window.noteLengthNormalized[durName];
                if (value === undefined) throw new Error('Unknown duration "' + duration + '". Choose one from the menu or give a number of whole notes.');
                seconds = value * quarter;
            }
        }
        sound = seconds;
        if (!grace && split.marks.has('.')) sound = seconds * TS_STACCATO;
        else if (!grace && split.marks.has('-')) sound = seconds + TS_LEGATO_OVERLAP;
        name = String(window.parent.currentInstrumentName).toLowerCase();
        instrumentScale = (typeof window.parent.instrumentVolumes[name] === 'number') ? window.parent.instrumentVolumes[name] : 1;
        vol = Math.min(1, window.parent.globalInstrumentVolume * instrumentScale * (split.marks.has('>') ? TS_ACCENT : 1));
        var bend = (!grace && split.marks.has('u') && split.bend && window.tsCanSlide(name)) ? tsBendPoints({ semitones: split.bend, release: split.marks.has('d'), cycles: split.cycles }, sound, bpm, false) : undefined;
        window.playNote(pitch, sound, undefined, false, vol, undefined, bend);
    }
);

// ---- Import MIDI File ----
// Opens the Open File window, parses the chosen MIDI file and stores the
// result in global variables: MIDI File Groups (one Group per section of the
// file, cut where the tempo or time signature changes, for Play Tracks),
// MIDI File Tracks (the whole piece at its first tempo and time
// signature, one track per voice), MIDI File Tempo and MIDI File Time
// Signature, numbered when the names are taken, and MIDI Warnings,
// overwritten. Each group and each track is also stored in its own variable,
// Track Group 1, Track Group 2, ... and one variable per track, Track 1: Lead,
// Track 2: Bass, ... (the file's own track names, or the instrument when it has
// none; a drum part is one track per kit sound), replacing those of the last
// import. A file with several time signatures stores the tracks of each span
// separately, numbered on in order; a tempo change alone does not divide them.
// the Delete MIDI Tracks block: removes every variable Import MIDI File makes,
// the Track variables, the Track Groups, MIDI File Tracks, Groups, Tempo and
// Time Signature (numbered copies too) and MIDI Warnings, with their watchers
SnapExtensions.primitives.set(
    'ts_deletemiditracks()',
    function (proc) {
        var rcvr = this, frame = rcvr.globalVariables();
        var pattern = /^(MIDI File (Tracks|Groups|Tempo|Time Signature)( \d+)?|MIDI Warnings|Track \d+(: .*)?|Track Group \d+)$/;
        Object.keys(frame.vars).forEach(function (name) {
            if (!pattern.test(name)) return;
            if (typeof rcvr.deleteVariableWatcher === 'function') rcvr.deleteVariableWatcher(name, true);
            frame.deleteVar(name);
        });
        tsRefreshVariablePalette(rcvr);
    }
);

SnapExtensions.primitives.set(
    'ts_importmidi()',
    function (proc) {
        var rcvr = this, result;
        result = tsAwait(proc, function () {
            if (typeof window.Midi !== 'function' || typeof window.tsConvertMidi !== 'function') {
                throw new Error('TuneScope is not loaded. Run Initialize TuneScope first.');
            }
            return window._selectFile('.mid,.midi,audio/midi', false).then(function (file) {
                if (!file) return null; // the window was cancelled
                if (!/\.midi?$/i.test(file.name)) throw new Error('"' + file.name + '" is not a MIDI file. Choose a file ending in .mid or .midi.');
                return file.arrayBuffer().then(function (buffer) {
                    var parsed;
                    try { parsed = new window.Midi(buffer); } catch (err) { throw new Error('"' + file.name + '" could not be read as a MIDI file.'); }
                    return window.tsConvertMidi(parsed, { bytes: new Uint8Array(buffer) });
                });
            });
        });
        if (proc.context.accumulator && !proc.context.accumulator.settled) return;
        if (!result) return; // cancelled
        // what names the track variables: read before convertArrayToListRecursive rewrites the arrays in place
        var describe = function (t) { return { instrument: String(t[0][1]), midiName: String(t.midiName || ''), midiTrack: t.midiTrack, staff: String(t.staff || ''), isDrum: !!t.isDrum }; };
        var spanMeta = result.spans.map(function (sp) { return sp.tracks.map(describe); });
        var suffix = '', n = 2, frame = rcvr.globalVariables();
        while (frame.vars['MIDI File Tracks' + suffix] !== undefined) { suffix = ' ' + n; n += 1; }
        var tracks = window.convertArrayToListRecursive(result.tracks);
        tsStoreGlobal(rcvr, 'MIDI File Tracks' + suffix, tracks, false);
        // the sections as Groups: MIDI File Groups, and Track Group 1, Track Group 2, ...
        var groups = window.convertArrayToListRecursive(result.groups.map(function (g) { return ['Group', g.timeSignature, g.tempo, g.tracks]; }));
        tsStoreGlobal(rcvr, 'MIDI File Groups' + suffix, groups, false);
        Object.keys(frame.vars).forEach(function (name) { if (/^Track Group \d+$/.test(name)) frame.deleteVar(name); });
        result.groups.forEach(function (_, i) { frame.addVar('Track Group ' + (i + 1), groups.at(i + 1)); });
        // one variable per track, named by the part: Track 1: Lead, Track 2: Bass, ... from the file's
        // own track names, or the instrument when the file has none. A melodic part is one track; a
        // two-staff part is two, Piano (upper) and Piano (lower); a drum part is one track per kit
        // sound, Drums (Kick 1), Drums (Snare 1), ... The tracks of each time-signature span follow
        // one another in the numbering. The previous import's are deleted first.
        Object.keys(frame.vars).forEach(function (name) { if (/^Track \d+(: .*)?$/.test(name)) frame.deleteVar(name); });
        var spanLists = window.convertArrayToListRecursive(result.spans.map(function (sp) { return sp.tracks; }));
        var count = 0;
        spanMeta.forEach(function (metas, k) {
            var labels = {};
            var labelOf = function (meta) {
                if (meta.isDrum) return meta.midiName ? meta.midiName + ' (' + meta.instrument + ')' : meta.instrument;
                return (meta.midiName || meta.instrument) + meta.staff;
            };
            metas.forEach(function (meta) { labels[labelOf(meta)] = (labels[labelOf(meta)] || 0) + 1; });
            metas.forEach(function (meta, i) {
                var label = labelOf(meta);
                if (labels[label] > 1 && !meta.isDrum && !meta.staff && meta.midiName) label += ' (' + meta.instrument + ')'; // the file gave two parts one name
                count += 1;
                frame.addVar('Track ' + count + ': ' + label, spanLists.at(k + 1).at(i + 1));
            });
        });
        tsRefreshVariablePalette(rcvr);
        tsStoreGlobal(rcvr, 'MIDI File Tempo' + suffix, result.tempo, false);
        tsStoreGlobal(rcvr, 'MIDI File Time Signature' + suffix, result.timeSignature, false);
        tsStoreGlobal(rcvr, 'MIDI Warnings', window.convertArrayToListRecursive(result.warnings.slice()), false);
    }
);

SnapExtensions.primitives.set(
    'ts_playMIDI(controller, instrument)',
    function (controller_name, instrument_name) {

        function onEnabled(controller, instrument) {
            let synth = window.WebMidi.getInputByName(controller);
            let keyboard = synth.channels[1];
            //remove any existing listeners
            keyboard.removeListener("noteon")

            // Listener for the keyboard, prints midi note number
            keyboard.addListener("noteon", e => {
                const key = tsCanonicalName(String(instrument || window.parent.currentInstrumentName).toLowerCase());
                tsLoadInstrument(key).then(() => window.playNote(e.note.identifier, 0.5, key));
            });
        }

        const playMidiController = async (controller, instrument) => {
            if(controller === null || controller === "") return;

            //enables the webmidi controller, doesn't record notes
            window.WebMidi.enable((err) => {
                if (err) {
                    alert(err);
                } else {
                    onEnabled(controller, instrument);
                }
            });
        }

        playMidiController(controller_name, instrument_name);
    }
);

SnapExtensions.primitives.set(
    'ts_stopMIDI()',
    function() {
        window.WebMidi.disable();
    }
)

SnapExtensions.primitives.set(
    'ts_settone(id, frequency, amplitude, balance)',
    function (id, freq, ampl, bal) {
        var created = false;
        if (!window.tones[id]) {
          window.tones[id] = new window._Tone(id);
          created = true;
        }

        window.tones[id].setFreq(freq);
        window.tones[id].setAmpl(ampl * 100);
        window.tones[id].setPan(bal);
        window.tones[id].turnOn();
    }
);

SnapExtensions.primitives.set(
    'ts_turntoneon(id, bool)',
    function (id, on) {
        if (!window.tones[id]) {
          return;
        }

        if (on) {
          window.tones[id].turnOn();
        } else {
          window.tones[id].turnOff();
        }
    }
);

SnapExtensions.primitives.set(
    'ts_stoptones()',
    function () {
        const vals = Object.values(window.tones);

        for (let i = 0; i < vals.length; i++) {
          const currTone = vals[i];
          currTone.turnOff();
        }
    }
);

// ---- chords ----
// Two blocks share one engine. "[Type] Chord: [Note] Octave: [n] [modifiers]"
// starts from a chord type, so every step (7th, 9th, ...) is a fixed number
// of half-steps as in a chord symbol. "[Type] Scale: [Note] Octave: [n]
// Chord Position: [I..VII] [modifiers]" starts from a scale, so the steps
// are the scale's own notes above the root; maj7 and the b/# alterations
// are fixed half-steps in both, since their job is to leave the scale.
// tsBuildChord and tsBuildScaleChord are pure and covered by
// test/chord_harness.js; ts_chord and ts_scalechord wrap them for Snap.

var TS_CHORD_TYPES = {
    major: {tones: [0, 4, 7], third: 4, fifth: 7},
    minor: {tones: [0, 3, 7], third: 3, fifth: 7},
    augmented: {tones: [0, 4, 8], third: 4, fifth: 8},
    diminished: {tones: [0, 3, 6], third: 3, fifth: 6},
    power: {tones: [0, 7, 12], third: null, fifth: 7} // root, fifth, and the root an octave up
};
var TS_FIXED_STEPS = {2: 2, 4: 5, 6: 9, 7: 10, 9: 14, 11: 17, 13: 21}; // half-steps above the root
var TS_PITCH_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
var TS_LETTER_SEMITONES = {c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11};
var TS_MODIFIER_ORDER = ['7', 'maj7', '9', 'maj9', '11', '13', '6', '6/9', 'add2', 'add4', 'add9', 'add11', 'add13',
                         'sus2', 'sus4', 'b5', '#5', 'b9', '#9', '#11', 'b13'];

// "C", "Eb", "F#", "Cb" plus an octave (or "C4" with a blank octave) -> {midi, letter, accidental}
function tsParseNote(note, octave) {
    var text = String(note == null ? '' : note).trim().replace(/♭/g, 'b').replace(/♯/g, '#');
    var m = /^([A-Ga-g])(##|#|bb|b)?(-?\d)?$/.exec(text);
    var oct = String(octave == null ? '' : octave).trim();
    var accidental;
    if (!m) {
        throw new Error('Unknown note "' + note + '". Use a letter from A to G, with # or b if needed.');
    }
    if (oct === '' && m[3] !== undefined) {
        oct = m[3];
    }
    if (!/^-?\d+$/.test(oct)) {
        throw new Error('The octave must be a whole number, not "' + octave + '".');
    }
    accidental = {'#': 1, '##': 2, 'b': -1, 'bb': -2}[m[2]] || 0;
    return {
        midi: 12 * (Number(oct) + 1) + TS_LETTER_SEMITONES[m[1].toLowerCase()] + accidental,
        letter: m[1].toUpperCase(),
        accidental: accidental
    };
}

function tsSharpName(midi) {
    return TS_PITCH_NAMES[midi % 12] + (Math.floor(midi / 12) - 1);
}

function tsNormalizeModifiers(modifiers) {
    var chosen = (modifiers || []).map(function (m) {
        return String(m == null ? '' : m).trim().toLowerCase().replace(/\s+/g, '').replace(/♭/g, 'b').replace(/♯/g, '#');
    }).filter(function (m) { return m !== ''; });
    chosen.forEach(function (m) {
        if (TS_MODIFIER_ORDER.indexOf(m) === -1) {
            throw new Error('Unknown chord modifier "' + m + '". Choose one from the menu.');
        }
    });
    return chosen;
}

// chord: {tones, third, fifth, seventh, stepOf}; tones are half-steps above the root
function tsApplyModifiers(chord, modifiers) {
    var tones = chord.tones.slice(), stepOf = chord.stepOf, steps,
        chosen = tsNormalizeModifiers(modifiers);
    var has = function (i) { return tones.indexOf(i) !== -1; };
    var add = function (i) { if (!has(i)) { tones.push(i); } };
    var replace = function (from, to) {
        var at = tones.indexOf(from);
        if (from === to) { add(to); return; } // the scale's own step already has the requested size
        if (at === -1) { add(to); } else if (has(to)) { tones.splice(at, 1); } else { tones[at] = to; }
    };
    var removeThird = function () {
        if (chord.third !== null) { tones = tones.filter(function (i) { return i !== chord.third; }); }
    };
    steps = {
        '7': function () { add(chord.seventh); },
        'maj7': function () { add(11); },
        '9': function () { add(chord.seventh); add(stepOf(9)); },
        'maj9': function () { add(11); add(stepOf(9)); },
        '11': function () { add(chord.seventh); add(stepOf(9)); add(stepOf(11)); },
        '13': function () { add(chord.seventh); add(stepOf(9)); add(stepOf(11)); add(stepOf(13)); },
        '6': function () { add(stepOf(6)); },
        '6/9': function () { add(stepOf(6)); add(stepOf(9)); },
        'add2': function () { add(stepOf(2)); },
        'add4': function () { add(stepOf(4)); },
        'add9': function () { add(stepOf(9)); },
        'add11': function () { add(stepOf(11)); },
        'add13': function () { add(stepOf(13)); },
        'sus2': function () { removeThird(); add(stepOf(2)); },
        'sus4': function () { removeThird(); add(stepOf(4)); },
        'b5': function () { replace(chord.fifth, 6); },
        '#5': function () { replace(chord.fifth, 8); },
        'b9': function () { replace(stepOf(9), 13); },
        '#9': function () { replace(stepOf(9), 15); },
        '#11': function () { replace(stepOf(11), 18); },
        'b13': function () { replace(stepOf(13), 20); }
    };
    // applied in a fixed order (extensions, added notes, suspensions, alterations),
    // so the order the modifiers were chosen in does not matter
    TS_MODIFIER_ORDER.forEach(function (m) { if (chosen.indexOf(m) !== -1) { steps[m](); } });
    return tones.sort(function (a, b) { return a - b; });
}

function tsChordNames(root, tones, nameOf, octave) {
    return tones.map(function (i) {
        var n = root + i;
        if (n < 0 || n > 127) {
            throw new Error('Octave ' + octave + ' puts this chord out of range. Choose a lower octave.');
        }
        return nameOf(n);
    });
}

function tsBuildChord(type, note, octave, modifiers) {
    var kind = String(type == null ? '' : type).trim().toLowerCase(), def = TS_CHORD_TYPES[kind], root;
    if (!def) {
        throw new Error('Unknown chord type "' + type + '". Choose Major, Minor, Augmented, Diminished or Power.');
    }
    root = tsParseNote(note, octave).midi;
    return tsChordNames(root, tsApplyModifiers({
        tones: def.tones,
        third: def.third,
        fifth: def.fifth,
        seventh: (kind === 'diminished') ? 9 : 10, // a diminished chord takes the diminished seventh
        stepOf: function (n) { return TS_FIXED_STEPS[n]; }
    }, modifiers), tsSharpName, octave);
}

// scaleNotes: one octave of note names, lowest first (what the Scale block reports);
// degree: 1-based position in the scale. Steps come from the scale, spellings too.
function tsBuildScaleChord(scaleNotes, degree, modifiers) {
    var parsed = (scaleNotes || []).map(function (n) { return tsParseNote(n, ''); }),
        pos = Number(degree), base, classes = [], spelling = {}, count, noteAt, root, stepOf;
    if (!parsed.length) {
        throw new Error('The scale has no notes.');
    }
    if (!Number.isInteger(pos) || pos < 1) {
        throw new Error('The chord position must be a Roman numeral from I to VII, not "' + degree + '".');
    }
    base = parsed[0].midi;
    parsed.forEach(function (n) { // distinct pitch classes above the first note, in scale order
        var c = ((n.midi - base) % 12 + 12) % 12;
        if (classes.indexOf(c) === -1) { classes.push(c); spelling[c] = n; }
    });
    classes.sort(function (a, b) { return a - b; });
    count = classes.length;
    noteAt = function (k) { // k-th scale note (0-based) counting upward from the first note
        return base + classes[k % count] + 12 * Math.floor(k / count);
    };
    root = noteAt(pos - 1);
    stepOf = function (n) { return noteAt(pos - 1 + n - 1) - root; };
    return tsChordNames(root, tsApplyModifiers({
        tones: [0, stepOf(3), stepOf(5)],
        third: stepOf(3),
        fifth: stepOf(5),
        seventh: stepOf(7),
        stepOf: stepOf
    }, modifiers), function (midi) {
        var c = ((midi - base) % 12 + 12) % 12, sp = spelling[c], natural, acc;
        if (!sp) { return tsSharpName(midi); } // a note outside the scale
        natural = midi - sp.accidental; // the octave number belongs to the letter, so Cb4 is below C4
        acc = {1: '#', 2: '##', '-1': 'b', '-2': 'bb'}[sp.accidental] || '';
        return sp.letter + acc + (Math.floor(natural / 12) - 1);
    }, '');
}
window.tsBuildChord = tsBuildChord;
window.tsBuildScaleChord = tsBuildScaleChord;

function tsListItems(list) {
    if (list && typeof list.itemsArray === 'function') { return list.itemsArray(); }
    if (list && list.contents) { return list.contents; }
    return Array.isArray(list) ? list : [];
}

// the chord blocks' articulation menu (Staccato, Legato, Accent): the marks go
// on the lowest note, and a mark on any note of a chord marks the whole chord
function tsArticulate(names, articulations) {
    var marks = tsArticulationMarks(tsListItems(articulations), new Set());
    if (!marks.size || !names.length) return names;
    names = names.slice();
    names[0] = names[0] + Array.from(marks).join('');
    return names;
}

SnapExtensions.primitives.set(
    'ts_chord(type, note, octave, modifiers, articulations)',
    function (type, note, octave, modifiers, articulations) {
        return new List(tsArticulate(tsBuildChord(type, note, octave, tsListItems(modifiers)), articulations));
    }
);

SnapExtensions.primitives.set(
    'ts_scalechord(scale, degree, modifiers, articulations)',
    function (scale, degree, modifiers, articulations) {
        return new List(tsArticulate(tsBuildScaleChord(tsListItems(scale), degree, tsListItems(modifiers)), articulations));
    }
);

// the blocks of projects saved before the articulation menu
SnapExtensions.primitives.set(
    'ts_chord(type, note, octave, modifiers)',
    function (type, note, octave, modifiers) {
        return new List(tsBuildChord(type, note, octave, tsListItems(modifiers)));
    }
);

SnapExtensions.primitives.set(
    'ts_scalechord(scale, degree, modifiers)',
    function (scale, degree, modifiers) {
        return new List(tsBuildScaleChord(tsListItems(scale), degree, tsListItems(modifiers)));
    }
);

// ---- MIDI: live play, click-track recording ----
// Blocks: Open MIDI Stream, Record MIDI Stream, Close MIDI Stream. The
// recorder itself lives in TS_midi.js (window.tsMidi).
//
// A primitive that has to wait for something (the MIDI permission prompt,
// the count-in) keeps its state in proc.context.accumulator and yields with
// pushContext('doYield') until it is done, the way Snap's own extension
// primitives wait. The block stays busy in the meantime and any error is
// thrown into the script once the wait is over.

function tsAwait(proc, makePromise, stillWaiting) {
    var acc = proc.context.accumulator;
    if (!acc) {
        acc = proc.context.accumulator = {settled: false, value: undefined, error: null};
        Promise.resolve().then(makePromise).then(
            function (value) { acc.value = value; acc.settled = true; },
            function (err) { acc.error = err; acc.settled = true; }
        );
    }
    if (!acc.settled || (!acc.error && stillWaiting && stillWaiting(acc.value))) {
        proc.pushContext('doYield');
        proc.pushContext();
        return;
    }
    if (acc.error) {
        throw (acc.error instanceof Error) ? acc.error : new Error(String(acc.error));
    }
    return acc.value;
}

function tsRefreshVariablePalette(rcvr) {
    var ide = (typeof IDE_Morph !== 'undefined') ? rcvr.parentThatIsA(IDE_Morph) : null;
    if (ide) {
        ide.flushBlocksCache('variables');
        ide.refreshPalette();
    }
}

// creates (or, when unique is false, overwrites) a global variable and returns its name
function tsStoreGlobal(rcvr, name, value, unique) {
    var frame = rcvr.globalVariables(), finalName = name, n = 2;
    if (unique) {
        while (frame.vars[finalName] !== undefined) {
            finalName = name + ' ' + n;
            n += 1;
        }
    }
    if (frame.vars[finalName] === undefined) {
        frame.addVar(finalName, value);
        tsRefreshVariablePalette(rcvr);
    } else {
        frame.setVar(finalName, value);
    }
    return finalName;
}

// the device menu of Open MIDI Stream: names of the connected MIDI inputs
SnapExtensions.primitives.set(
    'ts_mididevices()',
    function (proc) {
        return tsAwait(proc, function () {
            return Promise.all([
                tsLoadScript('libraries/TuneScope/webmidi.iife.js'),
                tsLoadScript('libraries/TuneScope/TS_midi.js')
            ]).then(function () {
                return window.tsMidi.inputNames();
            }).then(function (names) {
                return new List(names);
            });
        });
    }
);

SnapExtensions.primitives.set(
    'ts_openmidi(device, instrument)',
    function (device, instrument, proc) {
        tsAwait(proc, function () {
            return window.tsMidi.open(device, instrument);
        });
    }
);

SnapExtensions.primitives.set(
    'ts_recordmidi(timesignature, smallest, click, tempo)',
    function (timeSignature, smallest, click, tempo, proc) {
        // waits through the two count-in measures, so the next block runs as recording starts
        tsAwait(proc, function () {
            return window.tsMidi.record({
                tempo: tempo,
                timeSignature: timeSignature,
                smallestSubdivision: smallest,
                clickWhileRecording: click === true
            });
        }, function (take) {
            return !window.tsMidi.hasStarted(take);
        });
    }
);

SnapExtensions.primitives.set(
    'ts_closemidi()',
    function (proc) {
        var result, capture, warnings;
        if (!window.tsMidi) {
            return;
        }
        result = window.tsMidi.close();
        if (!result) {
            return; // nothing was being recorded
        }
        capture = window.convertArrayToListRecursive(result.pairs);
        warnings = new List(result.warnings.slice());
        tsStoreGlobal(this, 'MIDI Capture', capture, true);
        tsStoreGlobal(this, 'MIDI Warnings', warnings, false);
    }
);

// ---- loading: the code files, then the preload instruments; other instruments when first used ----
// The block "Load TuneScope Primitives" loads this file, calls ts_load() once,
// and waits until ts_loaded() reports true.

var TS_FILES = [
    'libraries/TuneScope/WebAudioFontPlayer.js',
    'libraries/TuneScope/webmidi.iife.js',
    'libraries/TuneScope/tonejs/package/build/Midi.js',
    'libraries/TuneScope/TS_instruments.js',
    'libraries/TuneScope/TS_import.js',
    'libraries/TuneScope/TS_export.js',
    'libraries/TuneScope/TS_init.js',
    'libraries/TuneScope/TS_midi.js',
];

var tsLoadState = { started: false, error: null };

var tsScriptLoads = {}; // url -> pending or settled load promise, so a file is never loaded twice

function tsLoadScript(url) {
    if (SnapExtensions.scripts.indexOf(url) !== -1) {
        return Promise.resolve();
    }
    if (!tsScriptLoads[url]) {
        tsScriptLoads[url] = new Promise(function (resolve, reject) {
            var script = document.createElement('script');
            script.onload = function () {
                SnapExtensions.scripts.push(url);
                resolve();
            };
            script.onerror = function () {
                delete tsScriptLoads[url]; // the next call retries
                reject(new Error('Could not load ' + url));
            };
            script.async = false; // run in list order: TS_init.js needs the player and the instrument table
            document.head.appendChild(script);
            script.src = url;
        });
    }
    return tsScriptLoads[url];
}

// Initialize TuneScope fetches only the preload instruments named in
// TS_instruments.js. Set Instrument To, Play Note, Play Tracks and Open MIDI
// Stream wait for the file of any other instrument the first time it is used.
var tsInstrumentLoads = {}; // file -> promise, so a file shared by many names (the Percussion kit) loads once

function tsInstrumentReady(key) {
    var data = window.parent.instrumentData && window.parent.instrumentData[key];
    var preset = data && window[data.name];
    return !!(preset && preset.zones && preset.zones.every(function (zone) { return zone.buffer; }));
}

// the .bin file of an instrument whose zones keep their audio there (see tsAttachSamples)
function tsLoadSamples(preset, scriptUrl) {
    var url;
    if (!preset.zones.some(function (z) { return z.fileLength !== undefined && !z.buffer && !z.fileData; })) {
        return Promise.resolve();
    }
    url = scriptUrl.replace(/\.js$/, '.bin');
    return fetch(url).then(function (response) {
        if (!response.ok) throw new Error('could not load ' + url + ' (' + response.status + ')');
        return response.arrayBuffer();
    }).then(function (buffer) { window.tsAttachSamples(preset, buffer); });
}

function tsLoadInstrument(key) {
    var data = window.parent.instrumentData && window.parent.instrumentData[key];
    if (!data) {
        return Promise.reject(new Error('Unknown instrument "' + key + '". Choose one from the Set Instrument To menu.'));
    }
    if (tsInstrumentReady(key)) {
        return Promise.resolve();
    }
    if (!tsInstrumentLoads[data.file]) {
        tsInstrumentLoads[data.file] = (window[data.name] ? Promise.resolve() : tsLoadScript(data.file))
            .then(function () {
                if (!window[data.name]) {
                    throw new Error('the file does not define ' + data.name);
                }
                return tsLoadSamples(window[data.name], data.file);
            })
            .then(function () {
                return window.tsDecodePreset(window[data.name]);
            })
            .catch(function (err) {
                delete tsInstrumentLoads[data.file]; // the next use retries
                throw new Error('The instrument "' + data.label + '" could not be loaded: ' + (err && err.message ? err.message : err));
            });
    }
    return tsInstrumentLoads[data.file];
}
window.tsLoadInstrument = tsLoadInstrument;
window.tsInstrumentReady = tsInstrumentReady;

// true when every named instrument is ready to play. Otherwise the loads are
// started and the process yields (tsAwait) until they settle; the caller returns
// at once and is called again, and a failed load reaches Snap as an error.
function tsInstrumentsLoaded(proc, keys) {
    var pending = keys.filter(function (key) { return !tsInstrumentReady(key); });
    if (!pending.length) {
        return true;
    }
    tsAwait(proc, function () { return Promise.all(pending.map(tsLoadInstrument)); });
    return !!(proc.context.accumulator && proc.context.accumulator.settled);
}

// the instrument names of a Play Tracks list, for loading; shape errors are left to tsPrepareTracks
function tsTrackInstruments(tracksList) {
    var keys = [];
    tsItems(tracksList).forEach(function (track) {
        var header, name, key;
        if (tsIsTrackGroup(track)) { // a Group: the instruments of its tracks
            tsTrackInstruments(tsItems(track)[3]).forEach(function (k) { if (keys.indexOf(k) === -1) keys.push(k); });
            return;
        }
        header = tsItems(track)[0];
        name = header ? tsItems(header)[1] : undefined;
        if (typeof name !== 'string') return;
        key = tsCanonicalName(name.toLowerCase());
        if (window.parent.instrumentData[key] && keys.indexOf(key) === -1) keys.push(key);
    });
    return keys;
}

SnapExtensions.primitives.set(
    'ts_load()',
    function () {
        if (tsLoadState.started) {
            return;
        }
        tsLoadState.started = true;
        Promise.all(TS_FILES.map(tsLoadScript))
            .then(function () { return Promise.all(window.tsInstrumentPreload.map(tsLoadInstrument)); })
            .then(function () { return window.tsDecodeAll(); })
            .then(function () { window.parent.loadedTuneScope = true; })
            .catch(function (err) { tsLoadState.error = err; });
    }
);

SnapExtensions.primitives.set(
    'ts_loaded()',
    function () {
        if (tsLoadState.error) {
            var err = tsLoadState.error;
            tsLoadState.error = null;
            tsLoadState.started = false; // the next Load call retries
            throw new Error('TuneScope failed to load: ' + err.message);
        }
        return window.parent.loadedTuneScope === true;
    }
);

// ---------------------------------------------------------------------------
// Visualizer: a Winamp-style display drawn on the stage, behind the sprites.
// "Turn On Visualizer" taps the mix (tsBus, see TS_init.js) with an analyser
// and redraws the stage about 30 times a second; "Turn Off Visualizer" stops.
// The styles are Bars and Waveform. Waveform is mode 10 of the Geiss engine
// (see the Geiss section below): the wave is drawn low on the stage, and
// earlier waves move up, narrow and fade, as if receding into the distance.
// ---------------------------------------------------------------------------
var tsViz = null;
var TS_VIZ_BARS = 32;          // spectrum bars
var TS_VIZ_FRAME_MS = 33;      // about 30 frames a second
var TS_VIZ_CAP_HOLD_MS = 500;  // a peak cap hangs this long before it falls
var TS_VIZ_CAP_FALL = 0.8;     // then falls this fraction of the stage height per second
var TS_VIZ_WAVE_GAIN = 2;      // the waveform is drawn this many times taller than the signal
var TS_VIZ_WAVE_MODE = 10;     // the Geiss mode that Waveform shows

function tsVizTick() {
    if (!tsViz) return;
    tsViz.raf = requestAnimationFrame(tsVizTick);
    var now = performance.now(), dt = now - tsViz.last;
    if (dt < TS_VIZ_FRAME_MS) return;
    tsViz.last = now;
    var v = tsViz, bins = v.freq.length, i, j;
    if (v.style === 'wave') {
        tsGeissStep(v);
        var waveStage = world.children[0].stage;
        if (waveStage) waveStage.rerender();
        return;
    }
    v.analyser.getByteFrequencyData(v.freq);
    for (i = 0; i < TS_VIZ_BARS; i++) {
        // bar edges are spaced evenly in pitch, from bin 1 up to half of the bins
        var lo = Math.max(1, Math.round(Math.pow(bins / 2, i / TS_VIZ_BARS)));
        var hi = Math.max(lo + 1, Math.round(Math.pow(bins / 2, (i + 1) / TS_VIZ_BARS)));
        var peak = 0;
        for (j = lo; j < hi; j++) peak = Math.max(peak, v.freq[j]);
        v.bars[i] = peak / 255;
        if (v.bars[i] >= v.caps[i]) {
            v.caps[i] = v.bars[i];
            v.hold[i] = TS_VIZ_CAP_HOLD_MS;
        } else if (v.hold[i] > 0) {
            v.hold[i] -= dt;
        } else {
            v.caps[i] = Math.max(v.bars[i], v.caps[i] - TS_VIZ_CAP_FALL * dt / 1000);
        }
    }
    var stage = world.children[0].stage;
    if (stage) stage.rerender();
}

function tsVizDraw(ctx, w, h) {
    var v = tsViz, i;
    ctx.save();
    if (v.style === 'wave') {
        if (v.geiss) {
            ctx.imageSmoothingEnabled = true;
            ctx.drawImage(v.geiss.canvas, 0, 0, w, h);
        }
        ctx.restore();
        return;
    }
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, h);
    if (v.style === 'bars') {
        // green at the bottom, yellow in the middle, red at the top
        var up = ctx.createLinearGradient(0, h, 0, 0);
        up.addColorStop(0, '#00e000');
        up.addColorStop(0.5, '#e0e000');
        up.addColorStop(1, '#e00000');
        ctx.fillStyle = up;
        var slot = w / TS_VIZ_BARS, gap = Math.max(1, slot * 0.15), capH = Math.max(2, h / 90);
        for (i = 0; i < TS_VIZ_BARS; i++) {
            var barH = v.bars[i] * h;
            ctx.fillRect(i * slot + gap / 2, h - barH, slot - gap, barH);
            ctx.fillRect(i * slot + gap / 2, Math.max(0, h - v.caps[i] * h - capH * 1.5), slot - gap, capH);
        }
    }
    ctx.restore();
}

// ---------------------------------------------------------------------------
// Geiss style: the sound wave trails through a swirling, color-cycling image,
// after the Geiss Winamp plug-in. Each frame is the previous frame pulled
// through a motion map (a zoom, spin or ripple) and dimmed slightly, with the
// wave drawn on top. Pixels hold brightness 0-255, and a 256-color palette
// turns them into colors. Each mode also turns on a few random effects (moving
// lines and dots, a sun, a grid, glowing blobs), which are drawn into the image
// before it moves. Geiss listens for beats: when the music has a steady beat,
// the wave flashes with it, and the motion mode, the center, the wave shape,
// the palette and the effects change on a big beat once TS_GEISS_MODE_FRAMES
// frames have passed (without a beat they change right then). A mode can be
// held instead (heldMode); Waveform holds mode 10. The Geiss style, with all
// 25 modes, is not on the block's menu for now.
//
// The motion modes, palettes, wave shapes, effects and beat detection are
// ported from Geiss (main.cpp: GenerateChunkOfNewMap, RenderFX, RenderDots and
// RenderWave; video.h: FX_Random_Palette, CrankPal; proc_map.cpp: Process_Map;
// Effects.h), https://github.com/geissomatik/geiss
//
// Copyright (c) 1998-2022 Ryan Geiss (@geissomatik)
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice, this
//    list of conditions and the following disclaimer.
//
// 2. Redistributions in binary form must reproduce the above copyright notice,
//    this list of conditions and the following disclaimer in the documentation
//    and/or other materials provided with the distribution.
//
// 3. Neither the name of the copyright holder nor the names of its
//    contributors may be used to endorse or promote products derived from
//    this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
// FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
// DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
// SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
// CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
// OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
// ---------------------------------------------------------------------------
var TS_GEISS_W = 480;              // the image is drawn at the stage's own size, 480 x 360
var TS_GEISS_H = 360;               // (Geiss's 320-wide settings are kept for TS_GEISS_W = 320)
var TS_GEISS_MODE_COUNT = 25;      // Geiss's modes are numbered 1 to 25
var TS_GEISS_SLOWED = [1, 2, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];  // modes that move at half speed
var TS_GEISS_DITHERED = [1, 9, 11]; // modes whose checkerboard pixels use a second spin and zoom
var TS_GEISS_MODE_FRAMES = 550;    // frames between mode changes (about 18 seconds)
var TS_GEISS_FADE = 246;           // the map's weights add up to 246/256, which dims each frame (Geiss used 250-255; lower means less glow)
var TS_GEISS_PALETTE_FRAMES = 18;  // a new palette blends in over this many frames
var TS_GEISS_R_LAG = 24;           // the mix is mono; this many samples later stands in for the right channel
var TS_GEISS_EDGE = 2;             // effects stay this many rows away from the top and bottom
var TS_GEISS_PAST = 120;           // frames of loudness kept for beat detection

// For each mode, how likely each effect is (out of 1000), how many effects it
// may have, how strong its sun is, and how much its center pixel dims each
// frame (1 = not at all). Geiss's values for its 256-color display.
var TS_GEISS_EFFECTS = ['chasers', 'bar', 'dots', 'solar', 'grid', 'nuclide', 'shade'];
var TS_GEISS_MODE_FX = {
    1:  { freq: [220, 150,  10, 680, 12, 170, 400], min: 1, max: 2, solar: 400, dwindle: 1 },
    2:  { freq: [750, 500, 750, 750,  8,   0,   0], min: 1, max: 5, solar: 35,  dwindle: 1 },
    3:  { freq: [100, 100, 100, 500, 18,   0, 300], min: 1, max: 2, solar: 60,  dwindle: 0.99 },
    4:  { freq: [500, 100, 100, 100, 38,   0,   0], min: 1, max: 2, solar: 34,  dwindle: 0.98 },
    5:  { freq: [100, 350, 100, 500, 23, 180, 500], min: 1, max: 2, solar: 60,  dwindle: 0.99 },
    6:  { freq: [400, 120, 200,   0,  8,   0,   0], min: 1, max: 2, solar: 60,  dwindle: 1 },
    7:  { freq: [ 50, 200,   0, 300,  8, 600, 350], min: 1, max: 2, solar: 65,  dwindle: 0.985 },
    8:  { freq: [150, 150, 150, 150, 33,   0,   0], min: 1, max: 2, solar: 60,  dwindle: 0.96 },
    9:  { freq: [450, 200,  50, 200,  8, 100, 200], min: 1, max: 2, solar: 50,  dwindle: 0.985 },
    10: { freq: [  0,  20,  80,   0,  8,  80,   0], min: 0, max: 2, solar: 0,   dwindle: 1 },  // no chasers (Geiss: 150)
    11: { freq: [360, 200, 230, 550, 18, 330, 150], min: 0, max: 4, solar: 750, dwindle: 1 },
    12: { freq: [360, 200, 230,   0,  8, 330,   0], min: 0, max: 2, solar: 500, dwindle: 0.915 },
    13: { freq: [500,   0, 100,   0, 38,   0,   0], min: 1, max: 2, solar: 34,  dwindle: 0.98 },
    14: { freq: [500,   0, 100,   0, 38,   0,   0], min: 1, max: 2, solar: 34,  dwindle: 0.98 },
    15: { freq: [  0,   0,   0,   0,  8, 200,   0], min: 0, max: 1, solar: 60,  dwindle: 1 },
    16: { freq: [500, 100, 100, 100, 38,   0,   0], min: 1, max: 2, solar: 34,  dwindle: 0.98 }
};
// modes 17 to 25 share one set of chances; 20 to 23 dim the center
(function () {
    for (var m = 17; m <= TS_GEISS_MODE_COUNT; m++) {
        TS_GEISS_MODE_FX[m] = { freq: [150, 150, 150, 150, 20, 0, 50], min: 1, max: 3, solar: 600,
                                dwindle: (m >= 20 && m <= 23) ? 0.98 : 1 };
    }
})();

// chosen: a mode number to hold, or null to change modes automatically
function tsGeissCreate(chosen) {
    var w = TS_GEISS_W, h = TS_GEISS_H;
    var canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    var c2d = canvas.getContext('2d');
    var image = c2d.createImageData(w, h);
    var g = {
        w: w, h: h, canvas: canvas, c2d: c2d, image: image,
        pixels: new Uint32Array(image.data.buffer),
        src: new Uint8Array(w * h), dst: new Uint8Array(w * h),
        offset: new Int32Array(w * h),   // top-left source pixel for each pixel
        weight: new Uint8Array(w * h * 4), // weights of that pixel, its right, below, and below-right
        mode: 0, wave: 1, xc: w / 2, yc: h / 2, frame: 0, modeFrame: 0,
        palOld: new Uint8Array(768), palNew: new Uint8Array(768),
        palLeft: 0, colors: new Uint32Array(256),
        fx: {}, fxFrame: 0, chaserOffset: Math.floor(Math.random() * 40000), gridDir: 1,
        bob: [0, 1, 2, 3, 4, 5, 6, 7].map(function (k) { return k < 4 ? 0.1 + 0.05 * Math.random() : 2 + 2.8 * Math.random(); }),
        dotX: new Int32Array(20).fill(-1), dotY: new Int32Array(20), dotC: new Uint8Array(20), dotPtr: 0,
        vol: 0, avgVol: 0, avgVolNarrow: 0, past: new Float32Array(TS_GEISS_PAST), pastPos: 0,
        beatMode: false, bigBeat: false, bigBeatThreshold: 1.1, silent: true
    };
    g.heldMode = chosen;
    tsGeissNewMode(g, chosen);
    return g;
}

// A curve that maps brightness 0-255 to one color channel (CrankPal in Geiss).
function tsGeissCurve(id, n) {
    switch (id) {
    case 1: return Math.sqrt(n) * 22.6;
    case 2: return n * 2;
    case 3: return n * n / 64;
    case 4: return 255 * Math.sin(n / 256 * 0.5 * Math.PI);
    case 5: return n * 3.5;
    case 6: return Math.pow(1.5, n / 20) - 1;  // dark
    default: return n * 1.5 + 32 + 32 * Math.sin(n * 0.3);
    }
}

function tsGeissNewPalette(g) {
    var pal = new Uint8Array(768), n, r, gr, b, k;
    if (Math.random() < 1 / 6) {
        // one of the four palettes from Geiss's earlier FX program; red, blue and
        // green each take one of three curves, and brightness above 127 is all one color
        var curves = [[3, 2, 1], [3, 1, 2], [1, 2, 3], [2, 3, 1]][Math.floor(Math.random() * 4)];
        for (n = 0; n < 256; n++) {
            k = Math.min(n, 127);
            pal[n * 3] = Math.min(255, tsGeissCurve(curves[0], k));
            pal[n * 3 + 2] = Math.min(255, tsGeissCurve(curves[1], k));
            pal[n * 3 + 1] = Math.min(255, tsGeissCurve(curves[2], k));
        }
    } else {
        // three random curves, at most one of them the dark one
        var ids, kinds = (Math.random() < 0.2) ? 7 : 6;
        do {
            ids = [0, 1, 2].map(function () { return Math.floor(Math.random() * kinds) + 1; });
        } while (ids.filter(function (id) { return id === 6; }).length > 1);
        // one time in ten, a band of brightness is drawn twice as bright
        var lo = -1, hi = -1;
        if (Math.random() < 0.1) {
            lo = 7 + Math.floor(Math.random() * 6);
            hi = 17 + Math.floor(Math.random() * 6);
        }
        for (n = 0; n < 256; n++) {
            var boost = (n > lo && n < hi) ? 2.2 : 1.1;
            r = tsGeissCurve(ids[0], n) * boost;
            b = tsGeissCurve(ids[1], n) * boost;
            gr = tsGeissCurve(ids[2], n) * boost;
            pal[n * 3] = Math.min(255, r);
            pal[n * 3 + 1] = Math.min(255, gr);
            pal[n * 3 + 2] = Math.min(255, b);
        }
    }
    g.palOld = tsGeissBlendPalette(g);
    g.palNew = pal;
    g.palLeft = TS_GEISS_PALETTE_FRAMES;
}

// the palette on screen now: part old, part new while a blend is under way
function tsGeissBlendPalette(g) {
    var t = g.palLeft / TS_GEISS_PALETTE_FRAMES, out = new Uint8Array(768);
    for (var i = 0; i < 768; i++) out[i] = g.palOld[i] * t + g.palNew[i] * (1 - t);
    return out;
}

// Random numbers that are the same every time for a given seed (mulberry32),
// so that each mode number always gets the same motion, center, wave and effects.
function tsGeissSeeded(seed) {
    var a = seed >>> 0;
    return function () {
        a = (a + 0x6D2B79F5) >>> 0;
        var t = Math.imul(a ^ (a >>> 15), a | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

// sets up a new motion mode (GenerateChunkOfNewMap): the given one, or a
// random one other than the current mode. Geiss picks a mode's settings at
// random each time; here they come from the mode number, so a mode always
// looks the same apart from its colors, which still change each time.
function tsGeissNewMode(g, chosen) {
    var w = g.w, h = g.h, mode = chosen, wave, R;
    while (!mode || (!chosen && mode === g.mode)) mode = 1 + Math.floor(Math.random() * TS_GEISS_MODE_COUNT);
    R = tsGeissSeeded(mode * 7919 + 17);
    do {
        wave = Math.floor(Math.floor(R() * 17) / 3) + 1;  // 1-6, with 6 picked less often
    } while ((mode === 6 && wave === 5) ||
             (mode === 12 && (wave === 4 || wave === 6)) ||
             (mode === 14 && (wave === 3 || wave === 4)) ||
             ((mode === 8 || mode === 23 || mode === 24) && wave === 6));
    g.mode = mode;
    g.wave = wave;
    g.xc = w / 2 - 1 + Math.floor(R() * 60) - 30;
    g.yc = h / 2 - 1 + Math.floor(R() * 30) - 15;
    g.modeFrame = 0;
    g.bigBeatThreshold = 1.1;
    tsGeissPickEffects(g, R);
    tsGeissNewMap(g, R);
    tsGeissNewPalette(g);
}

// builds the motion map for g.mode: for each pixel, which point of the last
// frame it shows, as a top-left pixel and 4 weights. R gives the mode's settings.
function tsGeissNewMap(g, R) {
    var w = g.w, h = g.h, mode = g.mode, xc = g.xc, yc = g.yc;
    var scale = 1, turn = 0.007 + 0.02 * R(), scale2, turn2, f1 = 0, f2 = 0, f3 = 0, k;
    if (mode === 1) {
        scale = 0.985 - 0.12 * Math.pow(R(), 2);
        turn = 0.01 + 0.01 * R();
        if (scale > 0.97 && R() < 1 / 3) turn = -turn;
    } else if (mode === 2) {
        scale = 1 + 0.02 * R();
        turn = 0.02 + 0.07 * R();
    } else if (mode === 3) {
        turn = 0.01 + 0.015 * R();
    } else if (mode === 5) {
        turn = 0.01 + 0.03 * R();
        f1 = 0.05 + 0.05 * R() + 0.07 * R();
        f2 = 0.99 - 0.01 * R() - 0.02 * R();
    } else if (mode === 6) {
        // vortex: 5 points that push, or swirl one way or the other
        var vort = [];
        for (k = 0; k < 5; k++) {
            var ang = R() * 6.28, mag = 1 + R() * 0.8;
            vort.push({ x: R() * w, y: TS_GEISS_EDGE + R() * (h - TS_GEISS_EDGE * 2),
                        i: Math.cos(ang) * mag, j: Math.sin(ang) * mag, type: Math.floor(R() * 3) });
        }
    } else if (mode === 7) {
        turn = 0.01 + 0.01 * R();
        f1 = 0.92 + 0.01 * R();
        f2 = 0.0006 + 0.0005 * R();
    } else if (mode === 8) {
        turn = 0.05 * R();
        f1 = Math.pow(R(), 4) * 8 + 1.5;
    } else if (mode === 9) {
        scale = 0.8 + 0.25 * R();
        turn = 0.01 + 0.03 * R();
        f1 = 0.98 + 0.01 * R();
        f2 = 0.0009 + 0.0012 * R();
    } else if (mode === 11) {
        scale = 1.008 + 0.008 * R();
        turn = 0.12 + 0.06 * R();
    } else if (mode === 13) {
        f1 = 0.92 + 0.16 * R();
    } else if (mode === 15) {
        turn = 0.04 * R() + 0.045 * R();
        f1 = Math.floor(R() * 5) + 2;  // number of petals
        f2 = 0.92 + 0.06 * R();
        f3 = 0.05 + 0.05 * R();
    }
    scale2 = scale;
    turn2 = turn;
    if (mode === 11) {
        turn *= -0.6;
        turn2 *= 0.1;
        scale *= 0.99;
        scale2 *= 1.01;
    }
    if (R() < 0.5) {
        turn = -turn;
        turn2 = -turn2;
    }
    turn *= 0.6;
    turn2 *= 0.6;
    if (mode === 24) turn = 0.05;  // fast swirl: always the same spin

    var cos = Math.cos(turn), sin = Math.sin(turn), cos2 = Math.cos(turn2), sin2 = Math.sin(turn2);
    var speed = (TS_GEISS_SLOWED.indexOf(mode) !== -1) ? 0.5 : 1;
    var dither = TS_GEISS_DITHERED.indexOf(mode) !== -1;
    var fade = TS_GEISS_FADE * ((mode === 12) ? 0.98 : 1);
    var rmult = 640 / w, unit = 2 / w;  // Geiss tuned its modes at 640 wide
    var x, y, i = 0;
    for (y = 0; y < h; y++) {
        for (x = 0; x < w; x++, i++) {
            var dx = x - xc, dy = y - yc, r = Math.sqrt(dx * dx + dy * dy), s = scale, rr, nx, ny;
            var ux = dx * unit, uy = dy * unit, ur = r * unit;  // about -1 to 1 across the image
            if (mode === 3) {
                s = 0.95 - dy * (480 / h) * 0.0005;            // terra: zoom in below, out above
            } else if (mode === 4) {
                s = 0.9 + r * rmult * 0.0025 * 0.14;            // sphere
            } else if (mode === 5) {
                rr = r / 200 * rmult;                           // super-perspective
                rr = g.fx.nuclide ? rr * 1.7 : Math.sqrt(rr);
                s = f2 - f1 * rr;
            } else if (mode === 7) {
                s = f1 - r * f2 * rmult + Math.floor(R() * 100) * 0.0005;  // fuzzy
            } else if (mode === 8) {
                s = 0.85 + 0.1 * Math.sin(Math.sqrt(r * rmult) * f1);  // ripples
            } else if (mode === 9) {
                s = f1 - r * f2 * rmult;                        // flower petals
            } else if (mode === 13) {
                rr = r * rmult;                                 // black hole
                s = (1.04 - rr * Math.sqrt(rr) * 0.00025 * 0.14 - 1) * f1 + 1;
            } else if (mode === 14) {
                s = 0.9 + 0.2 * Math.cos(dy * 12 / (h + R()));  // split world: bands up and down
            } else if (mode === 15) {
                s = f2 + f3 * Math.sin(Math.atan2(dy, dx) * f1);  // petals
            } else if (mode === 16) {
                rr = r * rmult;                                 // crystal ball
                s = Math.max(-1.5, 1.05 - rr * rr * 0.00025 * 0.09);
            } else if (mode === 17) {
                s = 0.97 - uy * uy * 0.4;                       // sideways tunnel
            } else if (mode === 18) {
                s = 0.97 - ux * ux * 0.4;                       // up-down tunnel
            } else if (mode === 19) {
                s = 1.04 - 0.25 * ur;                           // vortex: in at the center, out at the edges
            } else if (mode === 20) {
                s = 1.15 - Math.sqrt(uy + 1.4) * 0.2;           // terra
            } else if (mode === 21) {
                s = 0.95 - Math.floor(Math.abs(ux) * 10) * 0.03 - Math.floor(Math.abs(uy) * 10) * 0.03;  // diced
            } else if (mode === 22) {
                s = 0.95 - Math.floor(ur * 10) * 0.04;          // sonic rings
            } else if (mode === 23) {
                s = 0.95 - (Math.floor(ur * 20) % 4) * 0.12;    // sonic rings, faster
            } else if (mode === 24) {
                s = 0.96;                                       // fast swirl
            } else if (mode === 25) {
                s = 3 / (3 + ur);                               // smooth zoom
            }
            if (mode === 6) {
                var tx = 0, ty = 0, sum = 0;
                vort.forEach(function (c) {
                    var vx = c.x - x, vy = c.y - y, d2 = vx * vx + vy * vy, d = 1 / (d2 + 0.1), z;
                    sum += d;
                    if (c.type === 0) {
                        tx += c.i * d;
                        ty += c.j * d;
                    } else {
                        z = 1 / (Math.sqrt(d2) + 0.01);
                        d += d;
                        tx += (c.type === 1 ? -vy : vy) * d * z;
                        ty += (c.type === 1 ? vx : -vx) * d * z;
                    }
                });
                if (sum > 0.000001) {
                    tx *= 1.9 / sum;
                    ty *= 1.9 / sum;
                }
                nx = x + tx - 0.1;
                ny = y + ty + 0.6;
            } else if (mode === 10) {
                nx = dx * (1.03 + 0.03 * (y / h)) + xc;           // drips downward
                ny = y * 1.04;
            } else if (mode === 12) {
                // sideways splitter: streaks out from a vertical line
                nx = (dx < -0.5) ? -Math.sqrt(-dx) + xc + 0.9 : (dx > 0.5) ? Math.sqrt(dx) + xc - 0.9 : xc;
                ny = dy + yc;
            } else if (dither && (x % 2) !== (y % 2)) {
                nx = (dx * cos2 - dy * sin2) * scale2 + xc;
                ny = (dx * sin2 + dy * cos2) * scale2 + yc;
            } else {
                nx = (dx * cos - dy * sin) * s + xc;
                ny = (dx * sin + dy * cos) * s + yc;
            }
            nx = x + (nx - x) * speed;
            ny = y + (ny - y) * speed;
            while (nx < 0) nx += w - 1;
            while (nx > w - 1) nx -= w - 1;
            var a = Math.floor(nx), b = Math.floor(ny), off = b * w + a;
            off = Math.max(w * 2, Math.min(w * (h - 3) - 1, off));
            var fx = nx - a, fy = ny - b;
            g.offset[i] = off;
            g.weight[i * 4] = (1 - fx) * (1 - fy) * fade;
            g.weight[i * 4 + 1] = fx * (1 - fy) * fade;
            g.weight[i * 4 + 2] = (1 - fx) * fy * fade;
            g.weight[i * 4 + 3] = fx * fy * fade;
        }
    }
}

// turns effects on by the chances in TS_GEISS_MODE_FX, using the mode's
// numbers R. Geiss raised the chances and the minimum when no sound was
// playing; here they are always the same, so a mode's effects do not depend
// on whether music was playing when it started.
function tsGeissPickEffects(g, R) {
    var info = TS_GEISS_MODE_FX[g.mode], fx = {}, on = [], i, tries;
    TS_GEISS_EFFECTS.forEach(function (name, k) {
        fx[name] = R() * 1000 < info.freq[k] * 0.7;
        if (fx[name]) on.push(name);
    });
    // make sure there is something to watch when no sound is playing
    for (tries = 0; on.length < info.min && tries < 1000; tries++) {
        i = Math.floor(R() * TS_GEISS_EFFECTS.length);
        if (!fx[TS_GEISS_EFFECTS[i]] && R() * 1000 < info.freq[i]) {
            fx[TS_GEISS_EFFECTS[i]] = true;
            on.push(TS_GEISS_EFFECTS[i]);
        }
    }
    while (on.length > info.max) fx[on.splice(Math.floor(R() * on.length), 1)[0]] = false;
    if (fx.chasers) fx.chasers = (R() < 0.5) ? 1 : 2;  // one chaser or two
    if (fx.grid) fx.bar = false;
    g.gridDir = (R() < 0.5) ? 1 : -1;
    if (fx.nuclide && R() < 4 / 7) g.wave = 0;          // blobs instead of a wave
    if (g.mode === 10) g.wave = 1;
    if (g.mode === 15 && R() < 0.2) g.wave = 5;
    g.fx = fx;
    // the wandering soft dot's path
    g.bob = [0, 1, 2, 3, 4, 5, 6, 7].map(function (k) { return k < 4 ? 0.1 + 0.05 * R() : 2 + 2.8 * R(); });
    if (g.mode === 1 && R() < 0.5) tsGeissSun(g, 2000, true);  // start with a big sun
}

function tsGeissPlot(g, x, y, c) {
    x = Math.floor(x);
    y = Math.floor(y);
    if (x < 0 || x >= g.w || y < 0 || y >= g.h) return;
    var i = y * g.w + x;
    if (g.dst[i] < c) g.dst[i] = c;
}

// draws the wave into g.dst with brightness c (RenderWave in Geiss)
function tsGeissWave(g, s, amp, c) {
    var w = g.w, h = g.h, i, zL, zR, prevL, prevR;
    var L = function (n) { return s[n] * amp; };
    var Rt = function (n) { return s[n + TS_GEISS_R_LAG] * amp; };
    if (g.wave === 1) {             // one line across (in mode 10, lower and shorter)
        var yw = (g.mode === 10) ? Math.floor(((h - TS_GEISS_EDGE) + h * 0.5) * 0.5) : g.yc;
        var from = (g.mode === 10) ? 10 : 0, to = (g.mode === 10) ? w - 10 : w;
        zL = L(from >> 1) + yw;
        for (i = from; i < to; i++) {
            zL = zL * 0.9 + (L(i >> 1) + yw) * 0.1;
            tsGeissPlot(g, i, zL, c);
        }
    } else if (g.wave === 2) {      // two lines across
        var h1 = g.yc - h * 0.12, h2 = g.yc + h * 0.12;
        zL = L(0) * 0.7 + h1;
        zR = Rt(0) * 0.7 + h2;
        for (i = 0; i < w; i++) {
            zL = zL * 0.9 + (L(i >> 1) * 0.7 + h1) * 0.1;
            zR = zR * 0.9 + (Rt(i >> 1) * 0.7 + h2) * 0.1;
            tsGeissPlot(g, i, zL, c);
            tsGeissPlot(g, i, zR, c);
        }
    } else if (g.wave === 3) {      // one line down
        zL = L(0) + g.xc;
        for (i = 0; i < h; i++) {
            zL = zL * 0.9 + (L(i >> 1) + g.xc) * 0.1;
            tsGeissPlot(g, zL, i, c);
        }
    } else if (g.wave === 4) {      // two diagonal lines
        zL = L(0) * 0.9;
        zR = Rt(0) * 0.9;
        for (i = 0; i < h; i++) {
            zL = zL * 0.9 + L(i >> 1) * 0.9 * 0.1;
            zR = zR * 0.9 + Rt(i >> 1) * 0.9 * 0.1;
            tsGeissPlot(g, zL + i, i, c);
            tsGeissPlot(g, zR + i + (w - h), i, c);
        }
    } else if (g.wave === 5) {      // a ring around the center
        var ring = new Float32Array(182), base = (w === 320) ? 40 : w / 640 * 60, rad, amt;
        for (i = 0; i < 182; i++) ring[i] = L(i);
        for (i = 0; i < 25; i++) {  // blend the start into the end so the ring closes
            amt = i / 25;
            ring[i] = ring[i] * amt + ring[i + 157] * (1 - amt);
        }
        rad = base + ring[0] * 0.7;
        for (i = 0; i < 314; i++) {
            rad = rad * 0.5 + 0.5 * (base + ring[i >> 1] * 0.7);
            if (rad >= 5) tsGeissPlot(g, g.xc + rad * Math.cos(i * 0.02), g.yc + rad * Math.sin(i * 0.02), c);
        }
    } else {                        // a turning loop: the left channel against the right
        var ang = Math.sin(g.frame * 0.01), ca = Math.cos(ang), sa = Math.sin(ang);
        prevL = L(0);
        prevR = Rt(0);
        for (i = 0; i < 314; i++) {
            prevL = prevL * 0.5 + 0.5 * L(i) * 1.2;
            prevR = prevR * 0.5 + 0.5 * Rt(i) * 1.2;
            tsGeissPlot(g, prevL * ca + prevR * sa + g.xc, -prevL * sa + prevR * ca + g.yc, c);
        }
    }
}

// adds v to pixel i of buf, if the pixel is inside the image and below cap
function tsGeissAdd(g, buf, i, v, cap) {
    if (i >= 0 && i < buf.length && buf[i] < cap) buf[i] = Math.min(255, buf[i] + v);
}

// sparkles around the center (Drop_Solar_Particles): count of them, in a
// small disc, or in a big one with brighter sparks near the middle
function tsGeissSun(g, count, big) {
    var w = g.w, buf = g.src, R = Math.random, k, x, y, r, i0, i1, i2, o;
    for (k = 0; k < count; k++) {
        do {
            x = big ? Math.floor(R() * 96) - 48 : Math.floor(R() * 64) - 32;
            y = big ? Math.floor(R() * 72) - 36 : Math.floor(R() * 48) - 24;
            r = Math.sqrt(x * x + y * y);
        } while (r >= (big ? 35 : 17));
        x += g.xc;
        y += g.yc;
        if (y <= TS_GEISS_EDGE || y >= g.h - 1 - TS_GEISS_EDGE) continue;
        if (big) {
            i0 = 2 + Math.floor(R() * 2) + Math.floor((35 - r) / 9);
            i1 = i0 - 1;
            i2 = i1 - 1;
        } else {
            i0 = 2 + Math.floor(R() * 3);
            i1 = i0 >> 1;
            i2 = i1 >> 1;
        }
        o = y * w + x;
        if (buf[o] >= 207 - i0) continue;
        tsGeissAdd(g, buf, o, i0, 256);
        [o + 1, o - 1, o + w, o - w].forEach(function (j) { tsGeissAdd(g, buf, j, i1, 256); });
        [o - w - 1, o - w + 1, o + w - 1, o + w + 1].forEach(function (j) { tsGeissAdd(g, buf, j, i2, 256); });
    }
}

// a ring of 3-7 glowing blobs around the center, r pixels across (Nuclide)
function tsGeissBlobs(g, buf, r) {
    var w = g.w, R = Math.random, nodes = 3 + Math.floor(R() * 5), phase = Math.floor(R() * 1000);
    var rad = (w === 320) ? 22 + Math.floor(R() * 6) : 34 + Math.floor(R() * 8), n, x, y, val;
    for (n = 0; n < nodes; n++) {
        var cx = Math.floor(g.xc + rad * Math.cos(n / nodes * 6.28 + phase));
        var cy = Math.floor(g.yc + rad * Math.sin(n / nodes * 6.28 + phase));
        if (cy - 10 <= TS_GEISS_EDGE || cy + 10 >= g.h - 1 - TS_GEISS_EDGE) continue;
        for (y = -10; y <= 10; y++) {
            for (x = -10; x <= 10; x++) {
                val = Math.floor((r - Math.sqrt(x * x + y * y)) * 25);
                if (val > 0 && cx + x >= 0 && cx + x < w) tsGeissAdd(g, buf, (cy + y) * w + cx + x, val, 256);
            }
        }
    }
}

// the effects, drawn into the last frame before it moves (RenderFX)
function tsGeissEffects(g) {
    var w = g.w, h = g.h, buf = g.src, fx = g.fx, R = Math.random, info = TS_GEISS_MODE_FX[g.mode];
    var t = g.fxFrame + g.chaserOffset, k, pass, a, b, o, x, y;
    var inside = function (yy) { return yy > TS_GEISS_EDGE && yy < h - 1 - TS_GEISS_EDGE; };
    if (fx.shade) {
        // a dot that wanders around the center, leaving a soft glow
        var p = g.bob, f = g.fxFrame;
        a = g.xc + Math.floor(p[4] * Math.cos(f * p[0]) + p[6] * Math.cos(f * p[1]));
        b = g.yc + Math.floor(p[5] * Math.cos(f * p[2]) + p[7] * Math.cos(f * p[3]));
        for (k = 0; k < 4; k++) {
            a += Math.floor(R() * 5) - 2;
            b += Math.floor(R() * 5) - 2;
            if (!inside(b)) continue;
            o = b * w + a;
            tsGeissAdd(g, buf, o, 2, 250);
            [o + 1, o - 1, o + w, o - w].forEach(function (j) { tsGeissAdd(g, buf, j, 1, 250); });
        }
    }
    if (fx.chasers) {
        // one or two bright points that loop around the center
        var tc = t, s = w / 640, steps = Math.floor(20 * s);
        for (k = 0; k < steps; k++) {
            tc += 0.08 * 20 / steps;
            for (pass = 0; pass < fx.chasers; pass++) {
                if (pass === 0) {
                    a = g.xc + Math.floor(s * 74 * Math.cos(tc * 0.1102 + 10) + s * 65 * Math.cos(tc * 0.1312 + 20));
                    b = g.yc + Math.floor(s * 54 * Math.cos(tc * 0.1204 + 40) + s * 55 * Math.cos(tc * 0.1715 + 30));
                } else {
                    a = g.xc + Math.floor(s * 64 * Math.cos(tc * 0.1213 + 33) + s * 55 * Math.cos(tc * 0.1408 + 15));
                    b = g.yc + Math.floor(s * 52 * Math.cos(tc * 0.1304 + 12) + s * 51 * Math.cos(tc * 0.1103 + 21));
                }
                if (inside(b) && a >= 0 && a < w) buf[b * w + a] = 255 - (255 - buf[b * w + a]) * 0.6;
            }
        }
    }
    if (fx.bar) {
        // a short line that swings around the center
        var fb = (g.fxFrame + g.chaserOffset * 0.6) * 0.55 / 1.6;
        var sizes = (w === 320) ? [12, 15, 11, 10, 10, 13, 9, 11, 1] : [16, 15, 15, 10, 14, 13, 13, 11, w / 640];
        var z = sizes[8], len = (w === 320) ? 43 : Math.floor(z * 50);
        var x1 = g.xc + z * sizes[0] * Math.cos(fb * 0.1102 + 10) + z * sizes[1] * Math.cos(fb * 0.1312 + 20);
        var y1 = g.yc + z * sizes[2] * Math.cos(fb * 0.1204 + 40) + z * sizes[3] * Math.cos(fb * 0.1715 + 30);
        var x2 = g.xc + z * sizes[4] * Math.cos(fb * 0.1213 + 33) + z * sizes[5] * Math.cos(fb * 0.1408 + 15);
        var y2 = g.yc + z * sizes[6] * Math.cos(fb * 0.1304 + 12) + z * sizes[7] * Math.cos(fb * 0.1103 + 21);
        for (k = 0; k < len; k++) {
            a = Math.floor(x1 * (k / len) + x2 * (1 - k / len));
            b = Math.floor(y1 * (k / len) + y2 * (1 - k / len));
            if (inside(b)) tsGeissAdd(g, buf, b * w + a, 16, 223);
        }
    }
    if (fx.dots) {
        // a trail of 20 dots that drift to the right (One_Dotty_Chaser)
        var td = g.fxFrame, sd = w / 640;
        a = g.xc + Math.floor(sd * 64 * Math.cos(td * 0.0613 + 33) + sd * 55 * Math.cos(td * 0.0708 + 15));
        b = g.yc + Math.floor(sd * 52 * Math.cos(td * 0.0704 + 12) + sd * 51 * Math.cos(td * 0.0503 + 21));
        if (inside(b)) {
            g.dotPtr = (g.dotPtr + 1) % 20;
            g.dotX[g.dotPtr] = a;
            g.dotY[g.dotPtr] = b;
            g.dotC[g.dotPtr] = 127 + 126 * Math.sin(td * 0.0613 + 33);
            for (k = 0; k < 20; k++) {
                if (g.dotX[k] >= 0 && g.dotX[k] < w) buf[g.dotY[k] * w + g.dotX[k]] = g.dotC[k];
                if (g.dotX[k] >= 0) g.dotX[k]++;
            }
        }
    }
    if (fx.nuclide && g.silent && R() < 1 / 12) {
        tsGeissBlobs(g, buf, (w === 320) ? 2 + Math.floor(R() * 6) : 3 + Math.floor(R() * 8));
    }
    if (fx.grid) {
        // a grid of dots that slides sideways and pulses
        var step = Math.floor(w / 30), fr = g.frame;
        var lvl = Math.max(0, 65 + 45 * Math.sin(fr * 0.06033) + 35 * Math.cos(fr * 0.0471 + 1) + 25 * Math.cos(fr * 0.00523 - 1));
        var dir = (fr % step) * (g.gridDir === 1 ? -1 : 1);
        for (y = TS_GEISS_EDGE; y < h - TS_GEISS_EDGE; y += step) {
            for (x = 0; x < w; x += step) {
                o = y * w + x + dir;
                if (o >= 0 && o < buf.length && buf[o] < lvl) buf[o] = lvl;
            }
        }
    }
    if (fx.solar && w === 320) {
        var amount = Math.floor(3 + info.solar * (2.4 + 0.35 * Math.sin(g.frame * 0.05) + 0.4 * Math.sin(g.frame * 0.038 + 1)));
        tsGeissSun(g, Math.floor(amount * 0.01) * 4, false);
    } else if (fx.solar) {
        var amountBig = Math.floor(3 + info.solar * (1.6 + 0.43 * Math.sin(g.frame * 0.05) + 0.43 * Math.sin(g.frame * 0.038 + 1)));
        tsGeissSun(g, Math.floor(amountBig * 0.05) * 4, true);
    }
    if (info.dwindle < 0.999 && g.mode === 12) {
        // dim the splitter's center line so it does not burn in
        for (y = TS_GEISS_EDGE; y < h - TS_GEISS_EDGE; y++) {
            o = y * w + g.xc;
            buf[o - 1] *= info.dwindle;
            buf[o] *= info.dwindle;
            buf[o + 1] *= info.dwindle;
        }
    } else if (info.dwindle < 0.999) {
        // dim the center so it does not burn in
        o = g.yc * w + g.xc;
        [o, o - 1, o + 1, o + w, o - w].forEach(function (j) { if (buf[j] > 1) buf[j] = buf[j] * info.dwindle; });
    }
}

// loudness, beats and the wave's brightness (RenderDots and RenderWave)
function tsGeissListen(g, samples) {
    var lo = 0, hi = 0, i;
    for (i = 0; i < samples.length; i++) {
        lo = Math.min(lo, samples[i]);
        hi = Math.max(hi, samples[i]);
    }
    // Geiss measured the swing of 16-bit sound / 256: about 100-150 is normal music
    var vol = (hi - lo) * 128;
    g.vol = vol;
    g.silent = vol < 1;
    g.avgVolNarrow = g.avgVolNarrow * 0.3 + vol * 0.7;
    g.avgVol = g.avgVol * 0.85 + vol * 0.15;

    // a loudness jump draws a ring of blobs, sized by how big the jump is
    if (g.fx.nuclide && !g.silent && vol > g.avgVolNarrow * 1.1) {
        var jump = 40 * (vol / g.avgVolNarrow - 1.1);
        tsGeissBlobs(g, g.dst, (g.w === 320) ? Math.max(1, Math.min(7, Math.floor(2 + jump))) : Math.max(1, Math.min(10, Math.floor(3 + jump))));
    }

    g.pastPos = (g.pastPos + 1) % TS_GEISS_PAST;
    g.past[g.pastPos] = g.avgVolNarrow;
    var avg = 0, strength = 0, variance = 0, prev, cur, maxVol = 0;
    for (i = 0; i < TS_GEISS_PAST; i++) avg += g.past[i];
    avg /= TS_GEISS_PAST;
    // steady beat: the loudness keeps jumping by more than 15% of its average
    for (i = 1; i < TS_GEISS_PAST; i++) {
        prev = g.past[(g.pastPos + i) % TS_GEISS_PAST];
        cur = g.past[(g.pastPos + i + 1) % TS_GEISS_PAST];
        strength += Math.max(0, Math.abs(cur - prev) - avg * 0.15);
    }
    strength = (avg < 10) ? 0 : strength / avg * 10;
    if (strength > 109) g.beatMode = true;
    if (strength < 71) g.beatMode = false;
    for (i = 0; i < TS_GEISS_PAST; i++) variance += (g.past[i] - avg) * (g.past[i] - avg);
    var dev = Math.sqrt(variance / (TS_GEISS_PAST - 1));
    // big beat: louder than the loudest of 40 earlier frames (Geiss compares a
    // fixed third of its loudness history, which this keeps)
    for (i = 0; i < TS_GEISS_PAST / 3; i++) maxVol = Math.max(maxVol, g.past[i]);
    g.bigBeat = g.avgVolNarrow > maxVol * g.bigBeatThreshold;

    var bright = vol * 4 + g.avgVol * 0.4 - 10;
    if (g.beatMode && g.wave !== 6) {
        // with a steady beat, the wave shows only on the loud parts
        var scale = (vol - avg) / (dev * 0.5);
        bright *= (scale > 0) ? Math.min(1, scale) : 0;
    }
    return Math.max(0, Math.min(155, bright));
}

// one frame: draw the effects, move and dim the image, draw the wave, color it
function tsGeissStep(v) {
    var g = v.geiss, w = g.w, n = w * g.h, i, k, o;
    if (!g.heldMode && ++g.modeFrame >= TS_GEISS_MODE_FRAMES) {
        // with a steady beat, wait for a big one, a little more readily each frame
        if (g.beatMode && !g.bigBeat) g.bigBeatThreshold -= 0.2 / TS_GEISS_MODE_FRAMES;
        else tsGeissNewMode(g);
    }
    g.frame++;
    g.fxFrame += 1.6;

    tsGeissEffects(g);

    // Process_Map: each pixel is a weighted mix of 4 pixels of the last frame
    var src = g.src, dst = g.dst, off = g.offset, wt = g.weight;
    for (i = 0, k = 0; i < n; i++, k += 4) {
        o = off[i];
        dst[i] = (src[o] * wt[k] + src[o + 1] * wt[k + 1] + src[o + w] * wt[k + 2] + src[o + w + 1] * wt[k + 3]) >> 8;
    }

    v.analyser.getFloatTimeDomainData(v.samples);
    var bright = tsGeissListen(g, v.samples);
    // Geiss draws full-scale sound about 51 pixels from the center at 320 wide
    if (bright > 0 && g.wave > 0) tsGeissWave(g, v.samples, w * 0.16 * TS_VIZ_WAVE_GAIN, bright);

    if (g.palLeft > 0) {
        g.palLeft--;
        var pal = tsGeissBlendPalette(g);
        for (i = 0; i < 256; i++) {
            g.colors[i] = (255 << 24 | pal[i * 3 + 2] << 16 | pal[i * 3 + 1] << 8 | pal[i * 3]) >>> 0;
        }
    }
    var px = g.pixels, colors = g.colors;
    for (i = 0; i < n; i++) px[i] = colors[dst[i]];
    g.c2d.putImageData(g.image, 0, 0);

    g.src = dst;
    g.dst = src;
}

function tsVizOff() {
    if (!tsViz) return;
    var v = tsViz;
    tsViz = null;
    cancelAnimationFrame(v.raf);
    try { window.tsBus.disconnect(v.analyser); } catch (e) { /* already disconnected */ }
    var stage = world.children[0].stage;
    if (stage) stage.rerender(); // draws the stage without the display
}

function tsVizOn(style) {
    if (!window.tsBus) throw new Error('TuneScope is not loaded. Run Initialize TuneScope first.');
    var text = String(style == null ? '' : style).trim().toLowerCase();
    var kind = { bars: 'bars', waveform: 'wave' }[text] || null;
    if (!kind) throw new Error('Unknown visualizer style "' + style + '". Choose one from the menu.');
    if (!tsViz) {
        var analyser = audioContext.createAnalyser();
        analyser.fftSize = 1024;
        analyser.smoothingTimeConstant = 0.8;
        window.tsBus.connect(analyser);
        tsViz = {
            analyser: analyser, style: kind, last: 0, raf: 0,
            freq: new Uint8Array(analyser.frequencyBinCount),
            samples: new Float32Array(analyser.fftSize),
            geiss: null,
            bars: new Array(TS_VIZ_BARS).fill(0),
            caps: new Array(TS_VIZ_BARS).fill(0),
            hold: new Array(TS_VIZ_BARS).fill(0)
        };
        tsViz.raf = requestAnimationFrame(tsVizTick);
    }
    tsViz.style = kind;
    if (kind === 'wave' && !tsViz.geiss) tsViz.geiss = tsGeissCreate(TS_VIZ_WAVE_MODE);
}

// the stage paints the display after its own background and costume, which
// puts it behind the pen trails and the sprites
if (typeof StageMorph !== 'undefined' && !StageMorph.prototype.tsRenderWrapped) {
    StageMorph.prototype.tsRenderWrapped = true;
    var tsStageRender = StageMorph.prototype.render;
    StageMorph.prototype.render = function (ctx) {
        tsStageRender.call(this, ctx);
        if (tsViz) tsVizDraw(ctx, this.width(), this.height());
    };
}

SnapExtensions.primitives.set(
    'ts_vizon(style)',
    function (style) { tsVizOn(style); }
);

SnapExtensions.primitives.set(
    'ts_vizoff()',
    function () { tsVizOff(); }
);
