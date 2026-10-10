// TS_export.js - the Export Tracks block: the written timeline of prepared
// performances (score) and its writers, MIDI, MusicXML, WAV and MP3 (through
// lamejs, loaded only then), plus the off-line rendering the audio formats
// share. Loaded by Initialize TuneScope; the primitive lives in TuneScope.js.
(function () {
    'use strict';
    var PPQ = 480;             // MIDI ticks and MusicXML divisions per quarter note
    var RENDER_LEAD = 0.05;    // seconds before the first note of a rendering
    var RENDER_TAIL = 3;       // seconds rendered after the final barline, trimmed back to the last sound
    var SILENCE = 0.0001;      // a sample below this counts as silence when trimming
    var PEAK = 0.891;          // the loudest sample of a rendering is scaled to this, 1 dB under full scale
    var EPS = 0.000001;

    // General MIDI program (counted from 0) of every melodic instrument of the menu
    var PROGRAMS = {
        'piano': 0, 'piano, upright': 1, 'piano, electric 1': 4, 'piano, electric 2': 5, 'harpsichord': 6,
        'organ, drawbar': 16, 'organ, rock': 18, 'organ, church': 19, 'accordion': 21,
        'guitar, nylon': 24, 'guitar, acoustic': 25, 'guitar, distorted': 30, 'guitar, electric': 27, 'banjo': 105,
        'bass, acoustic': 32, 'bass, finger': 33, 'bass, picked': 34, 'bass, fretless': 35, 'bass, slap': 36, 'bass, synth': 38,
        'violin': 40, 'violin, mellotron': 40, 'fiddle': 110, 'viola': 41, 'cello': 42, 'cello, mellotron': 42, 'contrabass': 43,
        'strings': 48, 'strings, mellotron': 48, 'pizz. violins': 45, 'harp': 46,
        'piccolo': 72, 'flute': 73, 'flute, mellotron': 73, 'flute, pan': 75, 'shakuhachi': 77, 'oboe': 68, 'english horn': 69,
        'clarinet': 71, 'bassoon': 70, 'saxophone': 66, 'woodwind, mellotron': 71,
        'trumpet': 56, 'french horn': 60, 'trombone': 57, 'tuba': 58, 'brass section': 61, 'brass, mellotron': 61, 'brass, synth': 62,
        'timpani': 47, 'marimba': 12, 'xylophone': 13, 'vibraphone': 11, 'glockenspiel': 9, 'music box': 10, 'tubular bell': 14,
        'choir, mellotron': 52, 'harmonica': 22, 'dulcimer': 15, 'koto': 107, 'sitar': 104, 'orchestra hit': 55,
        'piano, toy': 8, 'whistle': 78,
        // the chip-tune set: square-wave leads, synth basses and strings
        'piano, chiptune': 80, 'organ, chiptune': 80, 'guitar, chiptune': 80, 'woodwind, chiptune': 80, 'orchestra hit, chiptune': 55,
        'bass 1, chiptune': 38, 'bass 2, chiptune': 39, 'strings 1, chiptune': 50, 'strings 2, chiptune': 51,
        'square wave 1': 80, 'square wave 2': 80, 'square wave 3': 80, 'square wave 4': 80
    };
    // kit sounds that sit on keys beyond the standard drum map: the standard key other players hit
    var DRUM_KEYS = {
        'kick 3': 36, 'snare 3': 38, 'snare 4': 40, 'snare 5': 38, 'snare 6': 40, 'clap, dry': 39, 'clap, wet': 39,
        'tom, low': 45, 'tom, high': 50, 'conga, high': 63, 'conga, mid': 62, 'conga, low': 64,
        'ct kick 3': 36, 'ct snare 2': 40, 'ct tom 1': 50
    };
    var BASS_CLEF = ['bass, acoustic', 'bass, finger', 'bass, picked', 'bass, fretless', 'bass, slap', 'bass, synth', 'bass 1, chiptune', 'bass 2, chiptune',
        'cello', 'cello, mellotron', 'contrabass', 'tuba', 'trombone', 'bassoon', 'timpani'];
    var VELOCITIES = { pp: 33, p: 49, mp: 64, mf: 80, f: 96, ff: 112 }; // MuseScore's, as TS_DYNAMIC_VELOCITY in TuneScope.js
    var DYNAMICS = {}; // the gain of each dynamic relative to mf, as TS_DYNAMICS
    Object.keys(VELOCITIES).forEach(function (n) { DYNAMICS[n] = Math.pow(VELOCITIES[n] / 80, 2); });
    var TYPES = [[4, 'whole'], [2, 'half'], [1, 'quarter'], [0.5, 'eighth'], [0.25, '16th'], [0.125, '32nd'], [0.0625, '64th']];

    function programOf(key) {
        var k = String(key).toLowerCase();
        if (PROGRAMS[k] === undefined) console.warn('TuneScope: no General MIDI program for "' + key + '", exporting it as a piano');
        return PROGRAMS[k] === undefined ? 0 : PROGRAMS[k];
    }
    function drumKeyOf(key, drumPitch) {
        var k = String(key).toLowerCase();
        return DRUM_KEYS[k] !== undefined ? DRUM_KEYS[k] : drumPitch;
    }
    // loudness as a MIDI velocity (0..1): the gain is the square of the velocity relative to
    // mf (80 of 127), so an unmarked note is 80 and each dynamic its MuseScore velocity
    function velocityOf(level, accent) {
        return Math.min(1, Math.max(0.05, (80 / 127) * Math.sqrt(level === undefined ? 1 : level) * (accent ? 1.25 : 1)));
    }
    function dynamicName(level) {
        var best = 'mf', names = Object.keys(DYNAMICS);
        names.forEach(function (n) { if (Math.abs(DYNAMICS[n] - level) < Math.abs(DYNAMICS[best] - level)) best = n; });
        return best;
    }
    function near(a, b) { return Math.abs(a - b) < 0.0001; }

    // ---- the timeline ----
    // The onset and sounding length of every event of one track, placed as the
    // scheduler of Play Tracks places them: onsets are the running sum of the
    // written values; a grace note sounds at the next note's position and pushes
    // that note later by its own length (the push is forgotten at each barline,
    // as the scheduler forgets it); elapsed is the written position.
    function timeline(events, secondsPerMeasure) {
        var out = [], elapsed = 0, steal = 0, measure = 0;
        events.forEach(function (ev) {
            var m = Math.floor(elapsed / secondsPerMeasure + EPS), onset, sound = ev.sound;
            if (m > measure) { measure = m; steal = 0; }
            onset = elapsed + steal;
            if (ev.grace) steal += ev.sound;
            else { sound = Math.max(0.02, sound - steal); steal = 0; }
            out.push({ ev: ev, elapsed: elapsed, onset: onset, sound: sound, written: ev.written });
            elapsed += ev.written;
        });
        return out;
    }
    function pitchesOf(note) {
        return (Array.isArray(note) ? note : [note]).map(function (p) { return { text: p, midi: window.tsPitchNumber(p) }; });
    }

    // prepared performances (tsPreparePerformance) -> sections of tracks of notes,
    // every position in quarter notes from the start of the piece
    function score(preps) {
        var sections = [], startQ = 0, startS = 0;
        preps.forEach(function (prep, index) {
            var spq = window.baseTempo / prep.tempo; // seconds per quarter note
            var qpm = prep.beatsPerMeasure[0] * prep.beatsPerMeasure[1];
            var sec = { index: index, tempo: prep.tempo, beats: prep.beatsPerMeasure[0], beatType: Math.round(4 / prep.beatsPerMeasure[1]),
                        quartersPerMeasure: qpm, totalMeasures: prep.totalMeasures, startQ: startQ, startS: startS,
                        quarters: prep.totalMeasures * qpm, seconds: prep.seconds, tracks: [] };
            prep.tracks.forEach(function (track) {
                var header = track[0], key = header[1], data = window.parent.instrumentData[key], notes = [];
                timeline(track.slice(1), prep.secondsPerMeasure).forEach(function (t) {
                    var ev = t.ev, endS, n, start, sub;
                    if (t.elapsed >= prep.seconds - EPS) return; // past the final barline: the tail of an expanded loop
                    endS = Math.min(t.elapsed + t.written, prep.seconds);
                    n = { writtenQ: t.elapsed / spq, durQ: (endS - t.elapsed) / spq,
                          startQ: t.onset / spq, soundQ: Math.min(t.sound, prep.seconds - t.onset) / spq,
                          rest: window.tsIsRest(ev.note) || ev.note === '', grace: !!ev.grace, level: ev.level === undefined ? 1 : ev.level,
                          accent: !!ev.accent, staccato: ev.marks.has('.'), legato: ev.marks.has('-'), pitches: [], performed: [] };
                    if (!n.rest) {
                        n.pitches = pitchesOf(ev.note);
                        if (ev.run) { // a keyboard glide sounds as a run of semitones toward the next note
                            start = ev.glideStart || 0;
                            sub = (ev.written - start) / ev.run.length;
                            ev.run.forEach(function (p, i) {
                                n.performed.push({ midi: window.tsPitchNumber(p), startQ: (t.onset + (i ? start + i * sub : 0)) / spq, soundQ: (i ? sub : start + sub) / spq });
                            });
                        } else {
                            n.pitches.forEach(function (p) { n.performed.push({ midi: p.midi, startQ: n.startQ, soundQ: n.soundQ }); });
                        }
                    }
                    notes.push(n);
                });
                sec.tracks.push({ key: key, label: data.label, isDrum: data.drumPitch !== undefined,
                                  drumKey: data.drumPitch !== undefined ? drumKeyOf(key, data.drumPitch) : undefined, notes: notes });
            });
            sections.push(sec);
            startQ += sec.quarters;
            startS += sec.seconds;
        });
        return { sections: sections, totalQ: startQ, totalS: startS };
    }

    // ---- MIDI ----
    // One MIDI track per instrument across the sections; drums on channel 10 (9
    // counted from 0), the others on the fifteen remaining channels in turn, so
    // more than fifteen melodic instruments share channels and programs.
    function midi(sc) {
        var m = new window.Midi(), tracks = new Map(), nextChannel = 0;
        m.header.tempos = sc.sections.map(function (s) { return { ticks: Math.round(s.startQ * PPQ), bpm: s.tempo }; });
        m.header.timeSignatures = sc.sections.map(function (s) { return { ticks: Math.round(s.startQ * PPQ), timeSignature: [s.beats, s.beatType] }; });
        m.header.update();
        sc.sections.forEach(function (sec) {
            sec.tracks.forEach(function (t) {
                var mt = tracks.get(t.key), c;
                if (!mt) {
                    mt = m.addTrack();
                    mt.name = t.label;
                    if (t.isDrum) {
                        mt.channel = 9;
                    } else {
                        c = nextChannel % 15;
                        mt.channel = c < 9 ? c : c + 1;
                        nextChannel++;
                        mt.instrument.number = programOf(t.key);
                    }
                    tracks.set(t.key, mt);
                }
                t.notes.forEach(function (n) {
                    if (n.rest) return;
                    n.performed.forEach(function (p) {
                        var number = t.isDrum ? t.drumKey : p.midi;
                        if (number === undefined || number === null) return;
                        mt.addNote({ midi: number, ticks: Math.round((sec.startQ + p.startQ) * PPQ),
                                     durationTicks: Math.max(1, Math.round(p.soundQ * PPQ)), velocity: velocityOf(n.level, n.accent) });
                    });
                });
            });
        });
        return new Blob([m.toArray()], { type: 'audio/midi' });
    }

    // ---- MusicXML ----
    function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
    // the note symbol of a length in quarter notes: plain, dotted, double dotted or a triplet; null when none fits
    function typeOf(q) {
        var i, b, name;
        for (i = 0; i < TYPES.length; i++) {
            b = TYPES[i][0]; name = TYPES[i][1];
            if (near(q, b)) return { type: name, dots: 0 };
            if (near(q, b * 1.5)) return { type: name, dots: 1 };
            if (near(q, b * 1.75)) return { type: name, dots: 2 };
            if (near(q, b * 2 / 3)) return { type: name, dots: 0, triplet: true };
        }
        return null;
    }
    // step, alter and octave of a pitch: the written spelling when it is a note name, else sharps
    function spell(p) {
        var m = typeof p.text === 'string' ? /^([A-Ga-g])([#b]?)(-?\d+)$/.exec(p.text.trim()) : null, names, midi;
        if (m) return { step: m[1].toUpperCase(), alter: m[2] === '#' ? 1 : (m[2] === 'b' ? -1 : 0), octave: +m[3] };
        midi = Math.round(p.midi);
        names = [['C', 0], ['C', 1], ['D', 0], ['D', 1], ['E', 0], ['F', 0], ['F', 1], ['G', 0], ['G', 1], ['A', 0], ['A', 1], ['B', 0]];
        return { step: names[((midi % 12) + 12) % 12][0], alter: names[((midi % 12) + 12) % 12][1], octave: Math.floor(midi / 12) - 1 };
    }
    function clefXml(part) {
        if (part.isDrum) return '<clef><sign>percussion</sign><line>2</line></clef>';
        if (BASS_CLEF.indexOf(part.key) !== -1) return '<clef><sign>F</sign><line>4</line></clef>';
        return '<clef><sign>G</sign><line>2</line></clef>';
    }
    // the notes of one track of one section cut into its measures: a note that
    // crosses a barline becomes tied pieces; what is left of a measure is a rest
    function measuresOf(notes, sec) {
        var measures = [], div = Math.round(sec.quartersPerMeasure * PPQ), mi, filled;
        for (mi = 0; mi < sec.totalMeasures; mi++) measures.push([]);
        notes.forEach(function (n) {
            var pos = n.writtenQ, remaining = n.durQ, first = true, m, end, piece, item;
            if (n.grace) {
                m = Math.min(sec.totalMeasures - 1, Math.floor(pos / sec.quartersPerMeasure + EPS));
                measures[m].push({ grace: true, pitches: n.pitches, div: 0, note: n });
                return;
            }
            while (remaining > EPS) {
                m = Math.floor(pos / sec.quartersPerMeasure + EPS);
                if (m >= sec.totalMeasures) break;
                end = (m + 1) * sec.quartersPerMeasure;
                piece = Math.min(remaining, end - pos);
                item = { rest: n.rest, pitches: n.pitches, q: piece, div: Math.round(piece * PPQ), note: n,
                         tieStart: !n.rest && remaining - piece > EPS, tieStop: !n.rest && !first };
                measures[m].push(item);
                pos += piece;
                remaining -= piece;
                first = false;
            }
        });
        measures.forEach(function (items) {
            filled = items.reduce(function (s, it) { return s + it.div; }, 0);
            if (filled < div) items.push({ rest: true, q: (div - filled) / PPQ, div: div - filled, fill: true, wholeMeasure: filled === 0 });
        });
        return measures;
    }
    function musicXml(sc) {
        var parts = [], byKey = new Map(), out = [];
        sc.sections.forEach(function (sec) {
            sec.tracks.forEach(function (t) {
                if (byKey.has(t.key)) return;
                var p = { id: 'P' + (parts.length + 1), key: t.key, label: t.label, isDrum: t.isDrum, drumKey: t.drumKey };
                parts.push(p);
                byKey.set(t.key, p);
            });
        });
        out.push('<?xml version="1.0" encoding="UTF-8"?>');
        out.push('<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 4.0 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">');
        out.push('<score-partwise version="4.0">');
        out.push('<identification><encoding><software>TuneScope</software></encoding></identification>');
        out.push('<part-list>');
        parts.forEach(function (p, i) {
            var iid = p.id + '-I1', c = i % 15, channel = p.isDrum ? 10 : (c < 9 ? c + 1 : c + 2);
            out.push('<score-part id="' + p.id + '"><part-name>' + esc(p.label) + '</part-name>' +
                '<score-instrument id="' + iid + '"><instrument-name>' + esc(p.label) + '</instrument-name></score-instrument>' +
                '<midi-instrument id="' + iid + '"><midi-channel>' + channel + '</midi-channel>' +
                (p.isDrum ? '<midi-unpitched>' + (p.drumKey + 1) + '</midi-unpitched>' : '<midi-program>' + (programOf(p.key) + 1) + '</midi-program>') +
                '</midi-instrument></score-part>');
        });
        out.push('</part-list>');
        parts.forEach(function (p) {
            var number = 0, lastDynamic = null, lastTime = null;
            out.push('<part id="' + p.id + '">');
            sc.sections.forEach(function (sec) {
                var track = sec.tracks.filter(function (t) { return t.key === p.key; })[0];
                var measures = measuresOf(track ? track.notes : [], sec), mi;
                for (mi = 0; mi < sec.totalMeasures; mi++) {
                    number++;
                    out.push('<measure number="' + number + '">');
                    if (mi === 0) {
                        var attrs = '<attributes>', time = sec.beats + '/' + sec.beatType;
                        if (number === 1) attrs += '<divisions>' + PPQ + '</divisions><key><fifths>0</fifths></key>';
                        if (time !== lastTime) { attrs += '<time><beats>' + sec.beats + '</beats><beat-type>' + sec.beatType + '</beat-type></time>'; lastTime = time; }
                        if (number === 1) attrs += clefXml(p);
                        out.push(attrs + '</attributes>');
                        out.push('<direction placement="above"><direction-type><metronome><beat-unit>quarter</beat-unit><per-minute>' + sec.tempo +
                                 '</per-minute></metronome></direction-type><sound tempo="' + sec.tempo + '"/></direction>');
                    }
                    measures[mi].forEach(function (item) {
                        var t, name, art, pitches, k, pitchXml, s;
                        if (item.rest) {
                            if (item.wholeMeasure) { out.push('<note><rest measure="yes"/><duration>' + item.div + '</duration></note>'); return; }
                            t = typeOf(item.q);
                            out.push('<note><rest/><duration>' + item.div + '</duration>' + (t ? '<type>' + t.type + '</type>' + '<dot/>'.repeat(t.dots) : '') + '</note>');
                            return;
                        }
                        name = dynamicName(item.note.level);
                        if (name !== lastDynamic) {
                            out.push('<direction placement="below"><direction-type><dynamics><' + name + '/></dynamics></direction-type></direction>');
                            lastDynamic = name;
                        }
                        t = item.grace ? { type: '32nd', dots: 0 } : typeOf(item.q);
                        art = [];
                        if (item.note.staccato) art.push('<staccato/>');
                        if (item.note.accent) art.push('<accent/>');
                        if (item.note.legato) art.push('<tenuto/>');
                        pitches = p.isDrum ? [null] : item.pitches;
                        for (k = 0; k < pitches.length; k++) {
                            if (p.isDrum) pitchXml = '<unpitched><display-step>E</display-step><display-octave>4</display-octave></unpitched>';
                            else { s = spell(pitches[k]); pitchXml = '<pitch><step>' + s.step + '</step>' + (s.alter ? '<alter>' + s.alter + '</alter>' : '') + '<octave>' + s.octave + '</octave></pitch>'; }
                            out.push('<note>' + (item.grace ? '<grace/>' : '') + (k ? '<chord/>' : '') + pitchXml +
                                (item.grace ? '' : '<duration>' + item.div + '</duration>') +
                                (item.tieStart ? '<tie type="start"/>' : '') + (item.tieStop ? '<tie type="stop"/>' : '') +
                                '<instrument id="' + p.id + '-I1"/>' +
                                (t ? '<type>' + t.type + '</type>' + '<dot/>'.repeat(t.dots) + (t.triplet ? '<time-modification><actual-notes>3</actual-notes><normal-notes>2</normal-notes></time-modification>' : '') : '') +
                                ((item.tieStart || item.tieStop || art.length) ? '<notations>' + (item.tieStop ? '<tied type="stop"/>' : '') + (item.tieStart ? '<tied type="start"/>' : '') +
                                    (art.length ? '<articulations>' + art.join('') + '</articulations>' : '') + '</notations>' : '') +
                                '</note>');
                        }
                    });
                    out.push('</measure>');
                }
            });
            out.push('</part>');
        });
        out.push('</score-partwise>');
        return new Blob([out.join('\n')], { type: 'application/vnd.recordare.musicxml+xml' });
    }

    // ---- audio ----
    // Renders prepared performances off-line, faster than real time: playNote
    // queues into the off-line context while tsRenderTarget points at it, and the
    // scheduler lays every note out at once (see tsSchedulePerformance).
    var RENDER_STEP = 1;       // seconds between the pauses of a rendering, at which the next notes are scheduled
    var RENDER_WINDOW = 2.5;   // seconds of notes scheduled ahead of the rendering
    // The rendering advances in windows. A track that reaches a note beyond the
    // window parks on the clock; at each pause the clock moves on and the parked
    // tracks schedule the next notes, so the audio graph holds a few seconds of
    // notes at a time instead of the whole piece, and a long piece renders in
    // seconds rather than minutes. onProgress(seconds, total) is called at each pause;
    // when it returns false the rendering is given up: the rest renders as silence and
    // the result is null.
    function renderClock() {
        var clock = { now: 0, waiters: [] };
        clock.waitUntil = function (onset) {
            if (onset <= clock.now + RENDER_WINDOW) return Promise.resolve();
            return new Promise(function (resolve) { clock.waiters.push({ at: onset - RENDER_WINDOW, resolve: resolve }); });
        };
        clock.advance = function (time) {
            var due = clock.waiters.filter(function (w) { return w.at <= time; });
            clock.now = time;
            clock.waiters = clock.waiters.filter(function (w) { return w.at > time; });
            due.forEach(function (w) { w.resolve(); });
        };
        return clock;
    }
    function render(preps, sampleRate, onProgress) {
        var total = preps.reduce(function (s, p) { return s + (p ? p.seconds : 0); }, 0);
        var duration = RENDER_LEAD + total + RENDER_TAIL;
        var ctx = new OfflineAudioContext(2, Math.ceil(duration * sampleRate), sampleRate);
        var windowed = typeof ctx.suspend === 'function', clock = windowed ? renderClock() : null, seq, failed = null, pauses, cancelled = false;
        var report = function (seconds) { if (onProgress && onProgress(Math.min(seconds, total), total) === false) cancelled = true; };
        window.tsRenderTarget = { context: ctx, player: new window.WebAudioFontPlayer() };
        try {
            seq = window.tsScheduleSequence(preps, { render: { context: ctx, clock: clock }, startAt: RENDER_LEAD });
        } catch (e) {
            window.tsRenderTarget = null;
            throw e;
        }
        if (seq && clock) seq.done.then(null, function (e) { failed = e; clock.advance(Infinity); });
        function pauseAt(time) { // armed before the rendering runs past it
            if (!seq || !clock || time >= duration || failed) { if (clock) clock.advance(Infinity); return Promise.resolve(); }
            return ctx.suspend(time).then(function () {
                clock.advance(time);
                report(time - RENDER_LEAD);
                if (cancelled) { clock.waiters = []; return null; } // the parked tracks stay parked
                return new Promise(function (resolve) { setTimeout(resolve, 0); }); // the tracks schedule up to the new window
            }).then(function () {
                var next = cancelled ? Promise.resolve() : pauseAt(time + RENDER_STEP);
                ctx.resume();
                return next;
            });
        }
        report(0);
        pauses = pauseAt(RENDER_STEP);
        // the render target stays set until the last window is scheduled: the tracks queue into the off-line context, never the speakers
        return ctx.startRendering().then(function (buffer) {
            return pauses.then(function () { return seq && !cancelled ? seq.done : null; }).then(function () {
                if (failed) throw failed;
                if (cancelled) return null;
                report(total);
                return normalize(trim(buffer));
            });
        }).then(function (audio) { window.tsRenderTarget = null; return audio; }, function (e) { window.tsRenderTarget = null; throw e; });
    }
    // The rendering is floating point and holds whatever the mix adds up to, so a
    // mix that would clip the speakers is intact here. Scaling it by its own peak
    // puts the loudest moment just under full scale and keeps every instrument's
    // share, whatever Set Global Volume To was.
    function normalize(audio) {
        var peak = 0, scale, c, i, d;
        for (c = 0; c < audio.channels.length; c++) { d = audio.channels[c]; for (i = 0; i < audio.length; i++) if (Math.abs(d[i]) > peak) peak = Math.abs(d[i]); }
        if (!(peak > 0)) return audio;
        scale = PEAK / peak;
        for (c = 0; c < audio.channels.length; c++) { d = audio.channels[c]; for (i = 0; i < audio.length; i++) d[i] *= scale; }
        audio.peakBefore = peak;
        audio.scale = scale;
        return audio;
    }
    // the rendering cut after its last sound, plus a fifth of a second
    function trim(buffer) {
        var channels = [], c, i, last = 0, n = buffer.length, length;
        for (c = 0; c < buffer.numberOfChannels; c++) channels.push(buffer.getChannelData(c));
        for (i = n - 1; i >= 0; i--) {
            if (channels.some(function (d) { return Math.abs(d[i]) > SILENCE; })) { last = i; break; }
        }
        length = Math.min(n, last + 1 + Math.round(0.2 * buffer.sampleRate));
        return { sampleRate: buffer.sampleRate, length: length, channels: channels.map(function (d) { return d.subarray(0, length); }) };
    }
    function writeString(view, offset, text) { for (var i = 0; i < text.length; i++) view.setUint8(offset + i, text.charCodeAt(i)); }
    // 16-bit PCM
    function wav(audio) {
        var ch = audio.channels.length, n = audio.length, sr = audio.sampleRate, bytes = 44 + n * ch * 2;
        var buf = new ArrayBuffer(bytes), v = new DataView(buf), off = 44, i, c, s;
        writeString(v, 0, 'RIFF'); v.setUint32(4, bytes - 8, true); writeString(v, 8, 'WAVE');
        writeString(v, 12, 'fmt '); v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, ch, true);
        v.setUint32(24, sr, true); v.setUint32(28, sr * ch * 2, true); v.setUint16(32, ch * 2, true); v.setUint16(34, 16, true);
        writeString(v, 36, 'data'); v.setUint32(40, n * ch * 2, true);
        for (i = 0; i < n; i++) {
            for (c = 0; c < ch; c++) {
                s = Math.max(-1, Math.min(1, audio.channels[c][i]));
                v.setInt16(off, s < 0 ? s * 32768 : s * 32767, true);
                off += 2;
            }
        }
        return new Blob([buf], { type: 'audio/wav' });
    }
    function toInt16(data) {
        var out = new Int16Array(data.length), i, s;
        for (i = 0; i < data.length; i++) { s = Math.max(-1, Math.min(1, data[i])); out[i] = s < 0 ? s * 32768 : s * 32767; }
        return out;
    }
    function loadMp3Encoder() {
        if (window.lamejs) return Promise.resolve();
        return window.tsLoadScript('libraries/TuneScope/lame.min.js').then(function () {
            if (!window.lamejs) throw new Error('The MP3 encoder (lame.min.js) did not load.');
        });
    }
    // encodes in slices between timer turns, so that Snap stays responsive on a long piece
    // onProgress(fraction) is called before each step of about five seconds of audio; when it returns false the encoding stops and the result is null
    function mp3(audio, kbps, onProgress) {
        var enc = new window.lamejs.Mp3Encoder(2, audio.sampleRate, kbps || 128);
        var left = toInt16(audio.channels[0]), right = toInt16(audio.channels[1] || audio.channels[0]), parts = [], block = 1152, i = 0;
        return new Promise(function (resolve) {
            function step() {
                var until = Math.min(left.length, i + block * 200), out;
                if (onProgress && onProgress(left.length ? i / left.length : 1) === false) { resolve(null); return; }
                for (; i < until; i += block) {
                    out = enc.encodeBuffer(left.subarray(i, i + block), right.subarray(i, i + block));
                    if (out.length) parts.push(out);
                }
                if (i < left.length) { setTimeout(step, 0); return; }
                out = enc.flush();
                if (out.length) parts.push(out);
                resolve(new Blob(parts, { type: 'audio/mpeg' }));
            }
            step();
        });
    }
    // hands the file to the browser as a download, through Snap's FileSaver
    function save(blob, name, ext) {
        window.saveAs(blob, name + ext, false);
        return true;
    }

    window.tsExport = { score: score, timeline: timeline, midi: midi, musicXml: musicXml, render: render, trim: trim, normalize: normalize, wav: wav, mp3: mp3,
                        loadMp3Encoder: loadMp3Encoder, save: save, programOf: programOf, drumKeyOf: drumKeyOf, velocityOf: velocityOf, typeOf: typeOf, PROGRAMS: PROGRAMS };
})();
