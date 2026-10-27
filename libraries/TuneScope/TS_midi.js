/*
    TS_midi.js - live MIDI input, click-track recording and quantization
    for TuneScope.

    Loaded by ts_load() in TuneScope.js together with the other library
    files. Those files load in parallel, so this file only defines functions
    at load time and reads every other TuneScope global (window.WebMidi,
    window.audioContext, window.playNote, ...) when a function runs.

    Exposes
      window.tsQuantizeMidi(notes, opts) -> {pairs, velocities, diagnostics}
          A pure function: performed notes -> Play Tracks (note, duration)
          pairs. No clocks, no DOM. Unit-tested by test/midi_harness.js.
      window.tsMidi
          The recorder: open(), record(), close(), abort(), inputNames().
          Used by the ts_openmidi / ts_recordmidi / ts_closemidi primitives
          in TuneScope.js.
*/

(function () {
    'use strict';

    if (typeof window !== 'undefined' && window.tsMidi) {
        return; // already loaded
    }

    /* =====================================================================
       Quantizer

       Turns the notes of a performance recorded against the click track
       (known tempo, known time signature, known audio-clock time of beat 1)
       into Play Tracks pairs [note, durationName]. The ideas come from
       Simon Dixon's BeatRoot work (2001, 2007): only onsets are trusted,
       note lengths are taken from the gap to the next onset, a constant
       lag behind the click is measured with Dixon's asymmetric window
       (early strikes are read as late ones), and the grid inside each beat
       (straight or triplet) is the hypothesis that explains the onsets
       with the least error, scored beat by beat.

       Steps
        0. meter and grid constants
        1. validate and clean the notes
        2. group near-simultaneous notes into chords
        2b. measure and undo a constant tempo drift
        3. estimate the constant lag (latency) and remove it
        4. track slow phase drift
        5. assign notes to beats, drop count-in notes
        6-7. choose the grid of every beat (Viterbi over the beat sequence)
        8. snap onsets, merge collisions into chords
        9. note ends: durations and rests
        10. pad to whole measures
        11. emit pairs, splitting long spans into tied notes
        12. diagnostics
       ===================================================================== */

    var TPQ = 48; // ticks per quarter note: every duration name is a whole number of ticks
    var NAMES = [
        ['Whole', 192], ['Dotted Half', 144], ['Whole Triplet', 128], ['Half', 96],
        ['Dotted Quarter', 72], ['Half Triplet', 64], ['Quarter', 48], ['Dotted Eighth', 36],
        ['Quarter Triplet', 32], ['Eighth', 24], ['Dotted Sixteenth', 18], ['Eighth Triplet', 16],
        ['Sixteenth', 12], ['Dotted Thirtysecond', 9], ['Sixteenth Triplet', 8], ['Thirtysecond', 6],
        ['Thirtysecond Triplet', 4]
    ];
    var NAME_TICKS = {};
    NAMES.forEach(function (pair) { NAME_TICKS[pair[0]] = pair[1]; });
    // coarseness prior per grid (x 500 ms = absolute milliseconds): finer grids must earn their keep
    var KAPPA = {D: {1: 0, 2: 0.02, 4: 0.05, 8: 0.12, 16: 0.25}, T: {3: 0.05, 6: 0.20, 12: 0.35}};
    // strong beats (0-based) in simple meters; compound meters use every third eighth
    var STRONG = {4: [0, 2], 5: [0, 3], 6: [0, 3], 7: [0, 4]};
    var PITCH = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    var pitchName = function (n) { return PITCH[n % 12] + (Math.floor(n / 12) - 1); };

    var QUANTIZE_DEFAULTS = {
        tempo: 120, timeSignature: '4/4', gridStartSec: 0, stopSec: null,
        smallestSubdivision: 'Sixteenth', detectTriplets: true, allowSixteenthTriplets: false,
        latencySec: null, outputLatencySec: 0, followTempo: true, followPerformer: false,
        keepPickup: false, keepTrailingSilence: false,
        legatoRatio: 0.6, restBias: 0.65, minRestTicks: 0, chordWindowMs: 70, strumMaxMs: 150,
        snapBias: 0.45, ghostVelocity: 8, ghostHeldSec: 0.05, tau: 0.025, phaseAlpha: 1 / 8,
        driftWarnPercent: 4, driftMinPoints: 6, driftSigmas: 3, driftMinSpanSec: 0,
        allowSyncopatedHalf: true, allowSyncopatedQuarter: true
    };

    // "4/4" -> [beats per measure, beat value in quarter notes]
    function parseMeter(ts) {
        if (Array.isArray(ts) && ts.length === 2 && ts[0] > 0 && ts[1] > 0) return [ts[0], ts[1]];
        if (typeof window !== 'undefined' && typeof window.tsParseTimeSignature === 'function') {
            return window.tsParseTimeSignature(ts); // the shared parser from TS_init.js
        }
        var known = (typeof window !== 'undefined' && window.timeSignatureToBeatsPerMeasure) || {};
        var key = String(ts).replace(/\s+/g, '');
        if (known[key]) return known[key];
        var m = /^(\d+)\/(\d+)$/.exec(key);
        if (!m || [1, 2, 4, 8, 16].indexOf(+m[2]) === -1 || +m[1] < 1) {
            throw new Error('Unknown time signature "' + ts + '". Use one such as 4/4, 3/4 or 6/8.');
        }
        return [+m[1], 4 / +m[2]];
    }

    function quantizeMidiRecording(notes, opts) {
        var o = Object.assign({}, QUANTIZE_DEFAULTS, opts || {});
        if (!(o.tempo > 0)) throw new Error('The tempo must be a positive number of beats per minute.');
        var warn = [];

        // ---------- 0. meter and grid constants ----------
        var meter = parseMeter(o.timeSignature);
        var beatsPerMeasure = meter[0], beatQuarter = meter[1];
        var beatTicks = Math.round(beatQuarter * TPQ), measureTicks = beatsPerMeasure * beatTicks;
        var compound = (beatQuarter === 0.5 && beatsPerMeasure % 3 === 0);
        var groupTicks = compound ? 3 * beatTicks : beatTicks;
        var strongBeats = compound ? null : (STRONG[beatsPerMeasure] || [0]);
        var isStrongBeat = function (bi) { return compound ? (bi % 3 === 0) : strongBeats.indexOf(bi) !== -1; };
        var beatSec = 60 / o.tempo * beatQuarter, tickSec = beatSec / beatTicks, priorMs = 500;
        var minTicks = NAME_TICKS[o.smallestSubdivision] || 12;
        var cands = [];
        [1, 2, 4, 8, 16].forEach(function (d) {
            if (beatTicks % d === 0 && beatTicks / d >= minTicks) cands.push({d: d, fam: 'D', unit: beatTicks / d, kappa: KAPPA.D[d]});
        });
        var tripletsOn = o.detectTriplets && !compound;
        if (tripletsOn) {
            [3, 6, 12].forEach(function (d) {
                if (beatTicks % d === 0 && beatTicks / d >= (2 / 3) * minTicks && (d === 3 || o.allowSixteenthTriplets)) {
                    cands.push({d: d, fam: 'T', unit: beatTicks / d, kappa: KAPPA.T[d]});
                }
            });
        }
        var dupleUnits = cands.filter(function (c) { return c.fam === 'D'; }).map(function (c) { return c.unit; });
        var tripletUnits = cands.filter(function (c) { return c.fam === 'T'; }).map(function (c) { return c.unit; });
        var uMin = Math.min.apply(null, dupleUnits);                       // finest straight unit (ticks)
        var uAll = Math.min.apply(null, cands.map(function (c) { return c.unit; })); // finest unit of any kind
        var tripUnit = tripletUnits.length ? Math.max.apply(null, tripletUnits) : null; // eighth-triplet unit
        var uEst = (beatTicks % 12 === 0) ? 12 : uMin;                     // latency estimation unit: the sixteenth when it divides the beat
        var uMinSec = uMin * tickSec, uAllSec = uAll * tickSec, uEstSec = uEst * tickSec;
        var tolInner = function (uSec) { return Math.min(0.040, 0.25 * uSec); };
        var t0 = o.gridStartSec;
        var choice = null; // the grid chosen for every beat, set by the Viterbi pass below
        if (uMinSec < 0.08) warn.push('A ' + o.smallestSubdivision.toLowerCase() + ' note is under 80 ms at this tempo, too short to place reliably. Use a larger Smallest Note or a slower tempo.');
        var emptyMeasure = function () {
            return splitSpan(0, measureTicks, false).map(function (n) { return ['R', n]; });
        };
        var diagBase = function () {
            return {latencyOffsetSec: 0, autoOffsetSec: 0, finalPhaseSec: 0, beatGrids: [], tripletBeats: 0,
                    driftPercent: 0, effectiveBpm: o.tempo, timeScale: 1, droppedCountIn: 0, mergedChords: 0,
                    lossyMerges: 0, truncatedOverlaps: 0, totalMeasures: 1, warnings: warn};
        };

        // ---------- 1. validate and clean ----------
        (notes || []).forEach(function (n) {
            if (!Number.isInteger(n.velocity) || n.velocity < 0 || n.velocity > 127) {
                throw new Error('note velocity must be an integer 0-127 (got ' + n.velocity + ')');
            }
            if (!Number.isInteger(n.midiNumber) || n.midiNumber < 0 || n.midiNumber > 127) {
                throw new Error('midiNumber must be an integer 0-127 (got ' + n.midiNumber + ')');
            }
            if (!Number.isFinite(n.onsetSec)) throw new Error('onsetSec must be a finite number');
        });
        var stopRaw = o.stopSec == null
            ? Math.max.apply(null, (notes || []).map(function (n) { return n.offsetSec == null ? n.onsetSec + 1 : n.offsetSec; }))
            : o.stopSec;
        var lateStruck = 0;
        var ev = (notes || [])
            .filter(function (n) { return n.velocity > 0 && n.onsetSec < stopRaw; })
            .filter(function (n) {
                // struck less than 50 ms before Close and never released: not intended
                if ((n.offsetSec == null || n.offsetSec >= stopRaw) && stopRaw - n.onsetSec < 0.05) { lateStruck++; return false; }
                return true;
            })
            .map(function (n) {
                var heldAtStop = (n.offsetSec == null || n.offsetSec >= stopRaw);
                var off = heldAtStop ? stopRaw : Math.max(n.offsetSec, n.onsetSec + Math.max(tickSec, 0.02));
                return {on: n.onsetSec, off: off, num: n.midiNumber, vel: n.velocity, heldAtStop: heldAtStop};
            })
            .filter(function (n) { return !(n.vel <= o.ghostVelocity && (n.off - n.on) < o.ghostHeldSec); }) // ghost touches
            .sort(function (a, b) { return a.on - b.on || a.num - b.num; });
        if (lateStruck) warn.push(lateStruck + ' note(s) played in the last 50 ms before closing were left out. Close the stream a moment after your last note.');
        if (!ev.length) { warn.push('No notes were recorded. Check that the keyboard sounds when played, then record again.'); return {pairs: emptyMeasure(), diagnostics: diagBase()}; }
        // perceptual salience of a note (Dixon 2001, shifted to stay positive)
        var salOf = function (d, p, v) { return 300 * d + 4 * (72 - Math.min(72, Math.max(48, p))) + v + 1; };

        // ---------- 2. chord groups: anchored window plus strum extension ----------
        var chordWin = Math.min(o.chordWindowMs / 1000, Math.max(0.040, 0.45 * uAllSec), 0.55 * uAllSec);
        var strumStep = Math.min(Math.max(chordWin, 0.050), 0.55 * uAllSec);            // gap allowed between strum members
        var strumMax = Math.max(chordWin, Math.min(o.strumMaxMs / 1000, 0.45 * beatSec)); // total strum spread
        var groups = [];
        ev.forEach(function (n) {
            var g = groups[groups.length - 1];
            if (g && n.on - g.first <= chordWin) { g.members.push(n); g.core.push(n); return; }
            if (g && n.on - g.members[g.members.length - 1].on <= strumStep && n.on - g.first <= strumMax) {
                // strum tail: chained within the window, bounded spread, pitch moving in one direction
                var nums = g.members.map(function (m) { return m.num; });
                var dir = g.dir || Math.sign(n.num - nums[nums.length - 1]);
                var mono = dir !== 0
                    && nums.every(function (v, i) { return i === 0 || Math.sign(nums[i] - nums[i - 1]) === dir; })
                    && Math.sign(n.num - nums[nums.length - 1]) === dir;
                if (mono) { g.members.push(n); g.dir = dir; g.strum = true; return; }
            }
            groups.push({first: n.on, members: [n], core: [n]});
        });
        groups.forEach(function (g) {
            var m = g.members, byNum = new Map();
            m.forEach(function (x) {
                x.sal = salOf(x.off - x.on, x.num, x.vel);
                if (!byNum.has(x.num) || byNum.get(x.num).vel < x.vel) byNum.set(x.num, x);
            });
            var uniq = Array.from(byNum.values()).sort(function (a, b) { return a.num - b.num; });
            var sumSal = g.core.reduce(function (s, x) { return s + x.sal; }, 0);
            g.on = g.core.reduce(function (s, x) { return s + x.on * x.sal; }, 0) / sumSal; // salience-weighted onset
            g.off = Math.max.apply(null, m.map(function (x) { return x.off; }));
            var rels = m.map(function (x) { return x.off; }).sort(function (a, b) { return a - b; });
            g.offMed = rels[Math.floor(rels.length / 2)];                               // median release
            g.pitches = uniq.map(function (x) { return x.num; });
            g.vel = Math.max.apply(null, m.map(function (x) { return x.vel; }));
            g.heldAtStop = m.some(function (x) { return x.heldAtStop; });
            g.heldMed = m.filter(function (x) { return x.heldAtStop; }).length * 2 > m.length;
            g.sal = salOf(Math.max.apply(null, m.map(function (x) { return x.off - x.on; })), uniq[0].num,
                          m.reduce(function (s, x) { return s + x.vel; }, 0));
            g.w = 0.3 + 0.5 * g.vel / 127 + 0.2 * Math.min(1, (g.off - g.on) / beatSec); // weight in the grid choice
        });
        var resid = function (x, u) { return x - Math.round(x / u) * u; };
        var distTrip = function (rel) {
            if (!tripUnit) return Infinity;
            var u = tripUnit * tickSec, k = Math.round(rel / u);
            return (k <= 0 || k >= 3) ? Infinity : Math.abs(rel - k * u);
        };
        // an onset explained by the straight grid: within tolInner of a sixteenth line and nearer to it than to a triplet line
        var dupleClosest = function (onRel) {
            var r = Math.abs(resid(onRel, uEstSec));
            if (r > tolInner(uEstSec)) return false;
            var rel = ((onRel % beatSec) + beatSec) % beatSec;
            return r < distTrip(rel);
        };

        // ---------- 2b. constant tempo drift: regression of raw onsets on the click grid ----------
        var timeScale = 1, driftPercent = 0, effectiveBpm = o.tempo, driftMeasured = false, driftFit = null;
        var driftUnit = compound ? beatSec : beatSec / 2, driftMaxM = compound ? 6 : 4;
        (function () {
            var hb = driftUnit, chain = [], bestChain = [];
            var flush = function () { if (chain.length > bestChain.length) bestChain = chain; chain = []; };
            for (var i = 0; i < groups.length; i++) {
                if (i === 0) { chain = [{x: groups[0].first, G: 0}]; continue; }
                var ioi = groups[i].first - groups[i - 1].first, m = Math.round(ioi / hb), r = ioi / (m * hb);
                if (m >= 1 && m <= driftMaxM && r >= 0.85 && r <= 1.15) chain.push({x: groups[i].first, G: chain[chain.length - 1].G + m * hb});
                else { flush(); chain = [{x: groups[i].first, G: 0}]; }
            }
            flush();
            if (bestChain.length < Math.max(4, o.driftMinPoints)) return;
            var n = bestChain.length;
            var mx = bestChain.reduce(function (a, p) { return a + p.x; }, 0) / n;
            var mG = bestChain.reduce(function (a, p) { return a + p.G; }, 0) / n;
            var sxy = 0, sgg = 0;
            bestChain.forEach(function (p) { sxy += (p.x - mx) * (p.G - mG); sgg += Math.pow(p.G - mG, 2); });
            var slope = sxy / sgg; // performed seconds per click second (1 = on the click)
            var res2 = bestChain.reduce(function (a, p) { return a + Math.pow((p.x - mx) - slope * (p.G - mG), 2); }, 0) / Math.max(1, n - 2);
            var se = Math.sqrt(res2 / sgg), span = bestChain[n - 1].G;
            driftPercent = (slope - 1) * 100; effectiveBpm = o.tempo / slope; driftMeasured = true;
            driftFit = {n: n, slope: slope, se: se, spanSec: span, groups: groups.length};
            var confident = Math.abs(slope - 1) > o.driftSigmas * se && Math.abs(slope - 1) * span > 0.25 * uEstSec && span >= o.driftMinSpanSec;
            if (confident && o.followTempo) {
                timeScale = slope;
                warn.push('Your playing drifted ' + driftPercent.toFixed(1) + '% from the click, to about ' + effectiveBpm.toFixed(0) + ' BPM, so the notation was re-timed to match. To stay with the click, set the tempo to ' + effectiveBpm.toFixed(0) + ' or follow the count-in.');
                groups.forEach(function (g) {
                    g.on = t0 + (g.on - t0) / slope; g.off = t0 + (g.off - t0) / slope;
                    g.offMed = t0 + (g.offMed - t0) / slope; g.first = t0 + (g.first - t0) / slope;
                });
            } else if (confident && Math.abs(driftPercent) > o.driftWarnPercent) {
                warn.push('Your playing drifted ' + driftPercent.toFixed(1) + '% from the click, to about ' + effectiveBpm.toFixed(0) + ' BPM, but the notes were kept on the click grid. Play closer to the click or set the tempo to ' + effectiveBpm.toFixed(0) + '.');
            }
        }());

        // ---------- 3. constant lag (latency) ----------
        var L = o.outputLatencySec || 0, seed = L;
        var clampEarly = 0.4 * uEstSec, clampLate = Math.min(0.6 * uEstSec, 0.120);
        var foldLate = function (d) { return (d < -0.4 * uEstSec) ? d + uEstSec : d; }; // Dixon: beyond 0.4 unit early reads as late
        if (typeof o.latencySec === 'number') {
            L = o.latencySec;
        } else {
            var estimated = false, estLevel = uEstSec;
            if (groups.length >= 3) {
                var circ = function (uL) { // weighted circular mean of the onset residuals modulo uL
                    var sx = 0, sy = 0, sw = 0;
                    groups.forEach(function (g) {
                        var th = 2 * Math.PI * (((g.on - L - t0) % uL + uL) % uL) / uL;
                        sx += g.w * Math.cos(th); sy += g.w * Math.sin(th); sw += g.w;
                    });
                    return {R: Math.hypot(sx, sy) / sw, d: (uL / (2 * Math.PI)) * Math.atan2(sy, sx)};
                };
                var fine = circ(uEstSec); // pass 1a: modulo the sixteenth
                if (fine.R >= 0.6) {
                    var d = foldLate(fine.d), coarse = null;
                    for (var u = beatSec; u > uEstSec + 1e-9; u /= 2) { // pass 1b: a coarser grid picks among the aliases d + k*uEst
                        var c = circ(u);
                        if (c.R >= 0.6) { coarse = c.d; if (coarse < -0.4 * u) coarse += u; break; }
                    }
                    if (coarse != null) {
                        var trustCap = Math.min(0.120, 0.8 * uEstSec), bestA = d, bestD = Infinity;
                        [-1, 0, 1].forEach(function (k) {
                            var a = fine.d + k * uEstSec;
                            if (a > trustCap || a < -clampEarly) return;
                            var dd = Math.abs(a - coarse);
                            if (dd < bestD) { bestD = dd; bestA = a; }
                        });
                        if (bestA !== d) estLevel = beatSec;
                        d = bestA;
                    }
                    L += d; estimated = true;
                }
            }
            var inner = groups.filter(function (g) { return dupleClosest(g.on - L - t0); }); // pass 2: linear refinement
            if (inner.length >= 3) {
                var W = inner.reduce(function (s, g) { return s + g.w; }, 0);
                L += inner.reduce(function (s, g) { return s + g.w * resid(g.on - L - t0, uEstSec); }, 0) / W;
                estimated = true;
            }
            if (!estimated && groups.length >= 4) warn.push('Your timing was too uneven to measure your lag behind the click, so it was not corrected. Play steadily with the click or slow the tempo.');
            var clampLateEff = estLevel > uEstSec + 1e-9 ? Math.min(0.120, 0.8 * uEstSec) : clampLate;
            if (L - seed > clampLateEff) {
                warn.push('You played more than ' + Math.round(clampLateEff * 1000) + ' ms behind the click, more than can be corrected, so some notes may be written one Smallest Note late. Play closer to the click, slow the tempo, or use a larger Smallest Note.');
                L = seed + clampLateEff;
            } else if (L - seed < -clampEarly) {
                warn.push('You played more than ' + Math.round(clampEarly * 1000) + ' ms ahead of the click, more than can be corrected, so some notes may be written one Smallest Note early. Play closer to the click, slow the tempo, or use a larger Smallest Note.');
                L = seed - clampEarly;
            } else if (Math.abs(L - seed) > 0.3 * uEstSec) {
                warn.push('You played about ' + Math.abs(Math.round((L - seed) * 1000)) + ' ms ' + (L >= seed ? 'behind' : 'ahead of') + ' the click, close to half a Smallest Note, so some notes may be one step off. Check the notation and play closer to the click.');
            }
        }
        groups.forEach(function (g) { g.on -= L; g.off -= L; g.offMed -= L; });
        var stopSec = t0 + (stopRaw - L - t0) / timeScale;

        // ---------- 4. slow phase tracking (on straight-grid onsets only) ----------
        var phase = 0;
        groups.forEach(function (g) {
            g.x = g.on - phase; g.xoff = g.off - phase; g.xoffMed = g.offMed - phase;
            var eD = resid(g.x - t0, uEstSec);
            if (dupleClosest(g.x - t0)) {
                phase += o.phaseAlpha * eD;
                if (!o.followPerformer) phase = Math.max(-0.5 * uEstSec, Math.min(0.5 * uEstSec, phase));
            }
        });

        // ---------- 5. beat membership, count-in notes ----------
        var preTol = o.snapBias * uAllSec, shift = o.keepPickup ? beatsPerMeasure : 0;
        var keepTol = Math.max(preTol, 0.75 * uEstSec); // up to 0.75 sixteenth before beat 1 is an anticipated downbeat
        var dropped = 0;
        groups.forEach(function (g) {
            g.beat = Math.floor((g.x - t0 + preTol) / beatSec) + shift;
            if (g.beat < 0 && (t0 - g.x) <= keepTol) g.beat = 0;
            if (g.beat < 0) { g.drop = true; dropped++; }
        });
        var live = groups.filter(function (g) { return !g.drop; });
        if (dropped > 0) warn.push(dropped + ' note(s) or chord(s) played during the count-in were left out. Start on the first beat after the count-in.');
        if (!live.length) {
            warn.push('All notes were played during the count-in, so nothing was kept. Let the count-in finish, then play.');
            return {pairs: emptyMeasure(), diagnostics: Object.assign(diagBase(), {droppedCountIn: dropped})};
        }
        var numBeats = Math.max(Math.ceil((stopSec - t0) / beatSec) + shift, Math.max.apply(null, live.map(function (g) { return g.beat; })) + 1);
        var byBeat = [];
        for (var bi = 0; bi < numBeats; bi++) byBeat.push([]);
        live.forEach(function (g) { byBeat[g.beat].push(g); });

        // ---------- 6-7. grid hypotheses per beat, Viterbi over the beat sequence ----------
        var relOf = function (g, i) { return g.x - t0 - (i - shift) * beatSec; };
        var snapTo = function (g, i, c) {
            var u = c.unit * tickSec, x = relOf(g, i) / u;
            var slot = Math.max(0, Math.min(c.d, Math.floor(x + o.snapBias)));
            return {slot: slot, res: (x - slot) * u};
        };
        var tripOnly = function (g, i) {
            var rel = relOf(g, i), dD = Math.abs(resid(rel, uMinSec)), dT = distTrip(rel);
            return dT <= Math.min(0.040, 0.2 * tripUnit * tickSec) && dT < dD;
        };
        var BIG = 1e12;
        var E = byBeat.map(function (evs, i) {
            var nTrip = tripUnit ? evs.filter(function (g) { return tripOnly(g, i); }).length : 0;
            return cands.map(function (c) {
                if (!evs.length) return 0;
                if (c.fam === 'T') {
                    if (evs.length === 1 && nTrip === 0) return BIG;   // a lone on-grid onset never opens a triplet beat
                    if (c.d >= 6 && evs.length < 3) return BIG;         // sextuplets need three onsets
                    if (uMin >= beatTicks / 2 && nTrip < 2) return BIG; // Eighth setting: two triplet-only onsets needed
                }
                return evs.reduce(function (s, g) { return s + g.w * Math.abs(snapTo(g, i, c).res) * 1000; }, 0) + c.kappa * priorMs;
            });
        });
        var best = [], from = [];
        for (var i = 0; i < numBeats; i++) {
            best[i] = []; from[i] = [];
            for (var k = 0; k < cands.length; k++) {
                if (i === 0) { best[i][k] = E[i][k]; from[i][k] = -1; continue; }
                var bv = Infinity, bj = 0;
                for (var j = 0; j < cands.length; j++) {
                    // a single-onset beat may only continue a triplet run, never start one
                    if (cands[k].fam === 'T' && cands[j].fam !== 'T' && byBeat[i].length === 1) continue;
                    var v = best[i - 1][j] + (cands[j].fam !== cands[k].fam ? o.tau * priorMs : 0);
                    if (v < bv) { bv = v; bj = j; }
                }
                best[i][k] = bv + E[i][k]; from[i][k] = bj;
            }
        }
        choice = new Array(numBeats);
        var kBest = best[numBeats - 1].indexOf(Math.min.apply(null, best[numBeats - 1]));
        for (i = numBeats - 1; i >= 0; i--) { choice[i] = cands[kBest]; kBest = from[i][kBest]; }
        // grid helpers (hoisted; before the Viterbi pass every beat counts as the coarsest straight grid)
        function beatOf(tick) { return Math.max(0, Math.floor(tick / beatTicks)); }
        function gridAt(tick) { return (choice && choice[beatOf(tick)]) || cands[0]; }
        function famAt(tick) { return gridAt(tick).fam; }
        function splitUnitAt(tick) { return famAt(tick) === 'T' ? gridAt(tick).unit : uMin; } // grid for durations and splits
        function chosenUnitAt(tick) { return gridAt(tick).unit; }

        // ---------- 8. snap onsets, merge collisions into chords ----------
        live.forEach(function (g) {
            var s = snapTo(g, g.beat, choice[g.beat]);
            g.tick = g.beat * beatTicks + s.slot * choice[g.beat].unit;
        });
        live.sort(function (a, b) { return a.tick - b.tick || a.x - b.x; });
        var evs = [], merged = 0, lossy = 0;
        live.forEach(function (g) {
            var p = evs[evs.length - 1];
            if (p && p.tick === g.tick) {
                if (Math.abs(g.x - p.x) > 0.5 * uAllSec) lossy++; // two sequential onsets became one chord
                g.pitches.forEach(function (n) { if (p.pitches.indexOf(n) === -1) p.pitches.push(n); });
                p.pitches.sort(function (a, b) { return a - b; });
                p.xoff = Math.max(p.xoff, g.xoff); p.off = Math.max(p.off, g.off); p.xoffMed = Math.max(p.xoffMed, g.xoffMed);
                p.heldAtStop = p.heldAtStop || g.heldAtStop; p.heldMed = p.heldMed || g.heldMed;
                p.sal += g.sal; p.w = Math.max(p.w, g.w); merged++;
            } else {
                evs.push(g);
            }
        });
        if (lossy) warn.push(lossy + ' note(s) were closer together than the Smallest Note allows and were merged into chords. Use a smaller Smallest Note or a slower tempo.');

        // ---------- 9. note ends: durations and rests ----------
        var stopTick = Math.round((stopSec - t0) / tickSec) + shift * beatTicks;
        var restUnitAt = function (tick) { return famAt(tick) === 'T' ? chosenUnitAt(tick) : Math.max(uMin, Math.min(chosenUnitAt(tick), beatTicks / 2)); };
        var alignEnd = function (endTick, minTick) {
            var u = splitUnitAt(Math.max(0, endTick - 1)), e = Math.round(endTick / u) * u;
            return e < minTick ? minTick : e;
        };
        var segs = [], truncated = 0;
        if (evs[0].tick > 0) segs.push({start: 0, len: evs[0].tick, pitches: null});
        evs.forEach(function (e, idx) {
            var next = evs[idx + 1];
            var rawEnd = Math.min(stopTick, (e.xoff - t0) / tickSec + shift * beatTicks);
            var dur;
            if (next) {
                var ioi = next.tick - e.tick, heldSec = e.xoff - e.x, gapSec = next.x - e.xoff;
                if (gapSec <= 0) {                                              // overlap: cut at the next onset
                    if (rawEnd > next.tick + 1e-9) truncated++;
                    dur = ioi;
                } else if (heldSec >= o.legatoRatio * ioi * tickSec) {          // held long enough: legato
                    dur = ioi;
                } else {                                                        // released early: note plus rest
                    var uR = restUnitAt(Math.max(0, rawEnd - 1e-9)), minEnd = e.tick + uR;
                    var endTick = Math.floor(rawEnd / uR + o.restBias) * uR;
                    endTick = Math.min(next.tick, Math.max(minEnd, endTick));
                    endTick = Math.min(next.tick, alignEnd(endTick, Math.min(next.tick, minEnd)));
                    var rest = next.tick - endTick;
                    dur = (rest > 0 && rest >= o.minRestTicks) ? endTick - e.tick : ioi;
                }
                segs.push({start: e.tick, len: dur, pitches: e.pitches, vel: e.vel});
                if (dur < ioi) segs.push({start: e.tick + dur, len: ioi - dur, pitches: null});
            } else {
                // last event: median member release, rest grid as the floor
                var rawEndMed = Math.min(stopTick, (e.xoffMed - t0) / tickSec + shift * beatTicks);
                var H = (e.heldMed ? rawEnd : rawEndMed) - e.tick, ratio = e.heldMed ? 1.0 : 0.85;
                var uRl = restUnitAt(e.tick), unit = splitUnitAt(e.tick);
                var levels = famAt(e.tick) === 'T' ? [beatTicks, unit]
                    : (compound ? [groupTicks, beatTicks, uMin] : [beatTicks, beatTicks / 2, uMin]).filter(function (u) { return u >= uMin; });
                var D = null;
                for (var li = 0; li < levels.length; li++) {
                    var lu = levels[li], mm = Math.round((H / ratio) / lu);
                    if (mm >= 1 && H >= 0.55 * mm * lu && H <= 1.15 * mm * lu) { D = mm * lu; break; }
                }
                if (D == null) D = Math.max(uRl, Math.round(H / uRl) * uRl);
                var endLast = Math.max(e.tick + uRl, e.tick + D);
                endLast = alignEnd(endLast, e.tick + uRl);
                segs.push({start: e.tick, len: endLast - e.tick, pitches: e.pitches, vel: e.vel});
            }
        });
        if (truncated) warn.push(truncated + ' note(s) were still held when the next note began and were cut short there. A track plays one note or chord at a time, so release each key before the next or play the notes as a chord.');

        // ---------- 10. pad to whole measures ----------
        var lastSeg = segs[segs.length - 1], end = lastSeg.start + lastSeg.len;
        var total = Math.ceil(end / measureTicks) * measureTicks;
        if (total > end) segs.push({start: end, len: total - end, pitches: null});
        if (o.keepTrailingSilence) {
            var t2 = Math.ceil(stopTick / measureTicks) * measureTicks;
            if (t2 > total) segs.push({start: total, len: t2 - total, pitches: null});
        }

        // ---------- 11. emit ----------
        var pairs = [], vels = []; // vels: the loudest velocity behind each pair, null for a rest
        segs.forEach(function (s) {
            var pieces = splitSpan(s.start, s.len, !!s.pitches);
            pieces.forEach(function (p, pi) {
                var tie = s.pitches && pi < pieces.length - 1 ? '~' : '';
                var note = !s.pitches ? 'R'
                    : (s.pitches.length === 1 ? pitchName(s.pitches[0]) + tie
                       : s.pitches.map(function (n) { return pitchName(n) + tie; }));
                pairs.push([note, p]);
                vels.push(s.pitches ? (s.vel || 0) : null);
            });
        });

        // ---------- 12. diagnostics ----------
        if (!driftMeasured) { // short takes: median IOI ratio, report only
            var ratios = [], hb2 = beatSec / 2;
            for (var gi = 1; gi < groups.length; gi++) {
                var ioi2 = groups[gi].first - groups[gi - 1].first, m2 = Math.round(ioi2 / hb2);
                if (m2 >= 1 && m2 <= 4) { var r2 = ioi2 / (m2 * hb2); if (r2 >= 0.85 && r2 <= 1.15) ratios.push(r2); }
            }
            if (ratios.length >= 3) {
                ratios.sort(function (a, b) { return a - b; });
                var med = ratios[Math.floor(ratios.length / 2)];
                driftPercent = (med - 1) * 100; effectiveBpm = o.tempo / med;
            }
        }
        var nMeas = Math.ceil(total / measureTicks);
        for (var mi = 0; mi < nMeas; mi++) {
            var errs = evs.filter(function (e) { return Math.floor(e.tick / measureTicks) === mi; })
                .map(function (e) { return {a: Math.abs((e.x - t0) - (e.tick - shift * beatTicks) * tickSec), w: e.w}; })
                .sort(function (p, q) { return p.a - q.a; });
            if (errs.length < 3) continue;
            var Wm = errs.reduce(function (a, d) { return a + d.w; }, 0), acc = 0, medErr = 0;
            for (var ei = 0; ei < errs.length; ei++) { acc += errs[ei].w; if (acc >= Wm / 2) { medErr = errs[ei].a; break; } }
            if (medErr > 0.2 * uEstSec) warn.push('In measure ' + (mi + 1) + ' the notes were typically ' + Math.round(medErr * 1000) + ' ms off the beat, so its notation may be wrong. Check that measure or record it again closer to the click.');
        }
        return {
            pairs: pairs,
            velocities: vels,
            diagnostics: {
                latencyOffsetSec: L, autoOffsetSec: L - seed, finalPhaseSec: phase,
                beatGrids: choice.map(function (c) { return c.fam + c.d; }),
                tripletBeats: choice.filter(function (c) { return c.fam === 'T'; }).length,
                driftPercent: driftPercent, effectiveBpm: effectiveBpm, timeScale: timeScale, driftFit: driftFit,
                droppedCountIn: dropped, mergedChords: merged, lossyMerges: lossy, truncatedOverlaps: truncated,
                totalMeasures: total / measureTicks, warnings: warn
            }
        };

        // ---------- splitter: greedy largest-first over legal pieces; never throws ----------
        function pieceOk(pos, t, rem, isNote) {
            var endT = pos + t, beatStart = Math.floor(pos / beatTicks) * beatTicks;
            if (endT <= beatStart + beatTicks) return t % splitUnitAt(pos) === 0; // inside one beat: multiple of that beat's grid
            if (pos % beatTicks !== 0) {
                // off-beat pieces never cross the beat line, except a full-beat note starting on the
                // half beat (syncopated quarter) in a simple meter with straight beats on both sides
                var bi0 = Math.floor((pos % measureTicks) / beatTicks);
                return !!(o.allowSyncopatedQuarter && isNote && !compound && (pos % beatTicks) * 2 === beatTicks && t === beatTicks
                          && famAt(pos) !== 'T' && famAt(endT - 1) !== 'T' && !isStrongBeat(bi0 + 1) && rem === t);
            }
            var nBeats = (endT - pos) / beatTicks;
            if (endT % beatTicks !== 0) { // may end on the half of the landing beat
                if (compound && Math.floor(pos / groupTicks) !== Math.floor((endT - 1) / groupTicks)) return false; // only inside one 3-eighth group
                var landing = Math.floor(endT / beatTicks) * beatTicks;
                if ((endT - landing) * 2 !== beatTicks || (beatTicks / 2) % splitUnitAt(landing) !== 0) return false;
            }
            var b0 = (pos % measureTicks) / beatTicks, crosses = false;
            for (var b = b0 + 1; b < b0 + nBeats; b++) if (isStrongBeat(b)) crosses = true;
            if (!crosses) return true;
            if (compound) return pos % groupTicks === 0 && endT % groupTicks === 0;
            if (b0 === 0 && endT % measureTicks === 0) return true;                    // whole bar from beat 1
            if (b0 === 0 && beatsPerMeasure === 4 && nBeats === 3) return true;        // 4/4 dotted half from beat 1
            if (o.allowSyncopatedHalf && isNote && beatsPerMeasure === 4 && b0 === 1 && nBeats === 2 && rem === t) return true; // 4/4 syncopated half
            return false;
        }
        function splitSpan(start, len, isNote) {
            var out = [], pos = start, rem = len;
            while (rem > 0) {
                var limit = Math.min(rem, measureTicks - (pos % measureTicks)), pick = null;
                for (var ni = 0; ni < NAMES.length; ni++) {
                    if (NAMES[ni][1] <= limit && pieceOk(pos, NAMES[ni][1], rem, isNote)) { pick = NAMES[ni]; break; }
                }
                if (!pick) {
                    var su = splitUnitAt(pos);
                    var nm = NAMES.filter(function (p) { return p[1] === su; })[0];
                    pick = (nm && su <= rem) ? nm : (NAMES.filter(function (p) { return p[1] <= rem; })[0] || ['Thirtysecond Triplet', rem]);
                    warn.push('Internal problem: a note length at grid position ' + pos + ' could not be written with standard durations. Check the notation there and report this if it repeats.');
                }
                out.push(pick[0]); pos += pick[1]; rem -= pick[1];
            }
            return out;
        }
    }

    /* =====================================================================
       Recorder

       tsMidi.open(deviceName, instrumentName) -> Promise<deviceName>
           Enables Web MIDI, picks the input (exact name, then a name that
           contains the text, blank = first input) and plays every key live
           on the instrument until close().
       tsMidi.record({tempo, timeSignature, smallestSubdivision,
                      clickWhileRecording}) -> Promise<take>
           Schedules two count-in measures of clicks on the audio clock and
           records from then on. Resolves once the count-in is scheduled;
           the take's gridStartSec is the audio-clock time of beat 1.
       tsMidi.close() -> {pairs, warnings, diagnostics} | null
           Ends the take (if any), quantizes it, silences held notes and
           releases the device. null when no take was in progress.
       tsMidi.abort()
           The Stop sign: discards the take, silences everything, releases
           the device.
       tsMidi.inputNames() -> Promise<string[]>
       ===================================================================== */

    var LIVE_NOTE_SECONDS = 30;   // a held key sounds this long at most; note-off cuts it
    var COUNT_IN_MEASURES = 2;
    var START_LEAD_SEC = 0.15;    // first click this long after Record is called
    var CLICK_LOOKAHEAD_SEC = 0.6; // clicks are scheduled this far ahead on the audio clock
    var CLICK_TIMER_MS = 100;
    var CLICK = {instrument: 'hi-hat, closed', volume: 0.6, downbeatInstrument: 'tom, high', downbeatVolume: 1.0, seconds: 0.2};
    var SMALLEST = {eighth: 'Eighth', sixteenth: 'Sixteenth', thirtysecond: 'Thirtysecond'};

    var tsMidi = {
        state: 'closed',   // 'closed' | 'open'
        input: null,       // the WebMidi Input in use
        instrument: '',    // instrument name for live play ('' = the current TuneScope instrument)
        take: null,        // the recording in progress, see record()
        live: {},          // key -> [{env, when}] envelopes of keys held down
        generation: 0,     // bumped by close()/abort() so a late open() cannot resurrect the stream
        releasing: null    // the pending WebMidi.disable() of the last close, awaited before enabling again
    };

    function midiLib() {
        var wm = typeof window !== 'undefined' && window.WebMidi;
        if (!wm) throw new Error('TuneScope MIDI is not loaded. Run Initialize TuneScope first.');
        return wm;
    }

    function ensureEnabled() {
        var wm;
        try { wm = midiLib(); } catch (err) { return Promise.reject(err); }
        // WebMidi.disable() closes the ports asynchronously and reports "enabled" until it is done,
        // so a Close followed at once by an Open has to wait for the previous release to finish
        return Promise.resolve(tsMidi.releasing).then(function () {
            if (wm.enabled) return wm;
            if (typeof navigator === 'undefined' || !navigator.requestMIDIAccess) {
                throw new Error('Web MIDI is not available in this browser. Use Chrome, Edge or Opera.');
            }
            return Promise.resolve(wm.enable()).then(function () { return wm; }, function (err) {
                throw new Error('Could not access MIDI devices: ' + (err && err.message ? err.message : err));
            });
        });
    }

    function findInput(wm, name) {
        var inputs = wm.inputs || [], wanted = String(name == null ? '' : name).trim().toLowerCase(), hit;
        if (!inputs.length) throw new Error('No MIDI input devices found. Connect a MIDI keyboard or controller and try again.');
        if (!wanted) return inputs[0];
        hit = inputs.filter(function (i) { return String(i.name).toLowerCase() === wanted; })[0]
           || inputs.filter(function (i) { return String(i.name).toLowerCase().indexOf(wanted) !== -1; })[0];
        if (!hit) {
            throw new Error('MIDI device "' + name + '" not found. Connected: ' + inputs.map(function (i) { return i.name; }).join(', '));
        }
        return hit;
    }

    // performance.now() milliseconds -> audio-clock seconds of the sound being heard at that moment.
    // getOutputTimestamp pairs the two clocks at the output, so a key pressed on the heard click
    // maps to the click's scheduled time and the output latency cancels out.
    function perfToContextTime(perfMs) {
        var ctx = window.audioContext, ts;
        if (typeof ctx.getOutputTimestamp === 'function') {
            ts = ctx.getOutputTimestamp();
            if (ts && typeof ts.contextTime === 'number' && typeof ts.performanceTime === 'number' && ts.performanceTime > 0) {
                return ts.contextTime + (perfMs - ts.performanceTime) / 1000;
            }
        }
        return ctx.currentTime + (perfMs - performance.now()) / 1000;
    }

    function hasOutputTimestamp() {
        var ctx = window.audioContext, ts;
        if (typeof ctx.getOutputTimestamp !== 'function') return false;
        ts = ctx.getOutputTimestamp();
        return !!(ts && typeof ts.contextTime === 'number' && typeof ts.performanceTime === 'number' && ts.performanceTime > 0);
    }

    // the event's own timestamp, unless it is missing or on another clock (seen in some browsers)
    function eventPerfTime(e) {
        var now = performance.now(), t = e && e.timestamp;
        if (typeof t !== 'number' || !(t > 0) || Math.abs(t - now) > 5000) return now;
        return t;
    }

    function noteKey(e) {
        var ch = (e.message && e.message.channel) || (e.target && e.target.number) || 1;
        return ch * 128 + e.note.number;
    }

    function liveVolume(name, velocity) {
        var parentWin = window.parent || window;
        var global = typeof parentWin.globalInstrumentVolume === 'number' ? parentWin.globalInstrumentVolume : 1;
        var perInstrument = parentWin.instrumentVolumes && typeof parentWin.instrumentVolumes[name] === 'number' ? parentWin.instrumentVolumes[name] : 1;
        return global * perInstrument * Math.max(0, Math.min(127, velocity)) / 127;
    }

    function startLiveNote(e, key) {
        var parentWin = window.parent || window;
        var name = tsMidi.instrument || parentWin.currentInstrumentName;
        var env = window.playNote(e.note.identifier, LIVE_NOTE_SECONDS, name, true, liveVolume(String(name).toLowerCase(), e.note.rawAttack));
        // a percussion sound rings out; releasing the key does not cut it
        var cut = !(window.tsIsPercussion && window.tsIsPercussion(name));
        if (!tsMidi.live[key]) tsMidi.live[key] = [];
        tsMidi.live[key].push({env: cut ? env : null, when: env ? env.when : null});
    }

    function stopLiveNote(key) {
        var held = tsMidi.live[key], n;
        if (!held || !held.length) return;
        n = held.shift();
        // the player recycles envelopes: only cut it if it still carries our note
        if (n.env && n.env.when === n.when && typeof n.env.cancel === 'function') n.env.cancel();
    }

    function silenceLiveNotes() {
        Object.keys(tsMidi.live).forEach(function (key) {
            while (tsMidi.live[key] && tsMidi.live[key].length) stopLiveNote(key);
        });
        tsMidi.live = {};
    }

    function onNoteOn(e) {
        try {
            if (!e || !e.note || !(e.note.rawAttack > 0)) { onNoteOff(e); return; } // velocity 0 is a note-off
            var t = perfToContextTime(eventPerfTime(e)), key = noteKey(e), take = tsMidi.take, note;
            startLiveNote(e, key);
            if (take) {
                note = {onsetSec: t, offsetSec: null, midiNumber: e.note.number, velocity: e.note.rawAttack, channel: Math.floor(key / 128)};
                take.notes.push(note);
                if (!take.open[key]) take.open[key] = [];
                take.open[key].push(note); // oldest first: a re-struck key releases its oldest instance
            }
        } catch (err) {
            console.error('TuneScope MIDI note-on:', err);
        }
    }

    function onNoteOff(e) {
        try {
            if (!e || !e.note) return;
            var t = perfToContextTime(eventPerfTime(e)), key = noteKey(e), take = tsMidi.take, held;
            stopLiveNote(key);
            held = take && take.open[key];
            if (held && held.length) held.shift().offsetSec = t;
        } catch (err) {
            console.error('TuneScope MIDI note-off:', err);
        }
    }

    function onDisconnected() {
        if (tsMidi.take) tsMidi.take.warnings.push('The MIDI device disconnected during the recording. Check the cable, then open the stream and record again.');
        else console.warn('TuneScope MIDI: the device was disconnected');
    }

    function detach() {
        var input = tsMidi.input;
        if (!input) return;
        try {
            input.removeListener('noteon', onNoteOn);
            input.removeListener('noteoff', onNoteOff);
            input.removeListener('disconnected', onDisconnected);
        } catch (err) {
            // the input may already be gone (unplugged or disabled)
        }
        tsMidi.input = null;
    }

    function release() {
        var wm = typeof window !== 'undefined' && window.WebMidi;
        detach();
        silenceLiveNotes();
        tsMidi.state = 'closed';
        tsMidi.instrument = '';
        tsMidi.generation += 1;
        if (wm && wm.enabled) {
            tsMidi.releasing = Promise.resolve().then(function () { return wm.disable(); }).catch(function (err) {
                console.warn('TuneScope MIDI: could not release the MIDI devices:', err);
            });
        }
    }

    function open(deviceName, instrumentName) {
        var parentWin = window.parent || window;
        var name = String(instrumentName == null ? '' : instrumentName).trim().toLowerCase();
        var gen = tsMidi.generation;
        if (!parentWin.instrumentData) return Promise.reject(new Error('TuneScope is not loaded. Run Initialize TuneScope first.'));
        if (name && !parentWin.instrumentData[name]) {
            return Promise.reject(new Error('Unknown instrument "' + instrumentName + '". Choose one from the Instrument menu.'));
        }
        if (tsMidi.take) return Promise.reject(new Error('A MIDI recording is in progress. Close MIDI Stream first.'));
        if (name && window.tsCanonicalInstrument) name = window.tsCanonicalInstrument(name); // an old name means a new instrument
        // the instrument's sound file loads first, when it is not loaded yet
        var load = window.tsLoadInstrument ? window.tsLoadInstrument(name || String(parentWin.currentInstrumentName).toLowerCase()) : Promise.resolve();
        return load.then(function () { return ensureEnabled(); }).then(function (wm) {
            var input = findInput(wm, deviceName);
            if (gen !== tsMidi.generation) { // closed or stopped while we waited for permission
                throw new Error('The MIDI stream was closed before the device was ready.');
            }
            detach();
            input.addListener('noteon', onNoteOn);
            input.addListener('noteoff', onNoteOff);
            input.addListener('disconnected', onDisconnected);
            tsMidi.input = input;
            tsMidi.instrument = name;
            tsMidi.state = 'open';
            return input.name;
        });
    }

    function scheduleClicks(take) {
        var ctx = window.audioContext, horizon = ctx.currentTime + CLICK_LOOKAHEAD_SEC;
        var countInBeats = COUNT_IN_MEASURES * take.beats, k, when, downbeat, env;
        while (true) {
            k = take.nextClick;
            when = take.anchorSec + k * take.beatSec;
            if (k >= countInBeats && !take.clickWhileRecording) { stopClickTimer(take); break; }
            if (when > horizon) break;
            downbeat = (k % take.beats) === 0;
            env = window.playNote('C4', CLICK.seconds, downbeat ? CLICK.downbeatInstrument : CLICK.instrument, false,
                                  downbeat ? CLICK.downbeatVolume : CLICK.volume, when);
            if (env) take.clicks.push(env);
            take.nextClick = k + 1;
        }
        take.clicks = take.clicks.filter(function (e) { return e.when + e.duration > ctx.currentTime; });
    }

    function stopClickTimer(take) {
        if (take.timer !== null) { clearInterval(take.timer); take.timer = null; }
    }

    function stopClicks(take) {
        stopClickTimer(take);
        take.clicks.forEach(function (env) { if (typeof env.cancel === 'function') env.cancel(); });
        take.clicks = [];
    }

    function normalizeSmallest(value) {
        var key = String(value == null ? '' : value).toLowerCase().replace(/[\s\-]+/g, '');
        if (key === '') return 'Sixteenth';
        if (!SMALLEST[key]) throw new Error('Smallest note must be Eighth, Sixteenth or Thirtysecond, not "' + value + '".');
        return SMALLEST[key];
    }

    function record(opts) {
        var o = opts || {}, tempo = Number(o.tempo), meter, ctx, take;
        if (tsMidi.state !== 'open' || !tsMidi.input) return Promise.reject(new Error('Open MIDI Stream first.'));
        if (tsMidi.take) return Promise.reject(new Error('Already recording. Close MIDI Stream first.'));
        if (!(tempo > 0)) return Promise.reject(new Error('The tempo must be a positive number of beats per minute.'));
        try {
            meter = parseMeter(o.timeSignature);
            take = {
                tempo: tempo,
                timeSignature: o.timeSignature,
                beats: meter[0],
                beatSec: 60 / tempo * meter[1],
                smallestSubdivision: normalizeSmallest(o.smallestSubdivision),
                clickWhileRecording: !!o.clickWhileRecording,
                notes: [], open: {}, warnings: [],
                clicks: [], nextClick: 0, timer: null,
                anchorSec: null, gridStartSec: null, latencySeed: 0
            };
        } catch (err) {
            return Promise.reject(err);
        }
        ctx = window.audioContext;
        tsMidi.take = take;
        return Promise.resolve(ctx.state === 'running' ? null : ctx.resume()).then(function () {
            if (tsMidi.take !== take) return take; // closed or stopped meanwhile
            take.anchorSec = ctx.currentTime + START_LEAD_SEC;
            take.gridStartSec = take.anchorSec + COUNT_IN_MEASURES * take.beats * take.beatSec;
            take.latencySeed = hasOutputTimestamp() ? 0 : (ctx.outputLatency || ctx.baseLatency || 0);
            scheduleClicks(take);
            take.timer = setInterval(function () { scheduleClicks(take); }, CLICK_TIMER_MS);
            return take;
        }, function (err) {
            if (tsMidi.take === take) tsMidi.take = null;
            throw new Error('Could not start the audio clock: ' + (err && err.message ? err.message : err));
        });
    }

    // true once the count-in of this take is over (or the take is gone)
    function hasStarted(take) {
        return tsMidi.take !== take || (take.gridStartSec !== null && window.audioContext.currentTime >= take.gridStartSec);
    }

    function finishTake(take) {
        var stopSec = perfToContextTime(performance.now()), warnings = take.warnings.slice(), gridStart, out;
        stopClicks(take);
        if (take.gridStartSec === null || stopSec < take.gridStartSec) {
            warnings.push('The stream was closed during the count-in, so nothing was recorded. Let the count-in finish, play, then close the stream.');
        }
        gridStart = take.gridStartSec === null ? stopSec : take.gridStartSec;
        out = quantizeMidiRecording(take.notes, {
            tempo: take.tempo,
            timeSignature: take.timeSignature,
            gridStartSec: gridStart,
            stopSec: Math.max(stopSec, gridStart),
            smallestSubdivision: take.smallestSubdivision,
            outputLatencySec: take.latencySeed
        });
        return {pairs: out.pairs, warnings: warnings.concat(out.diagnostics.warnings), diagnostics: out.diagnostics};
    }

    function close() {
        var take = tsMidi.take, result = null;
        tsMidi.take = null;
        try {
            if (take) result = finishTake(take);
        } finally {
            release(); // also abandons an open() that is still waiting for the device
        }
        return result;
    }

    function abort() {
        var take = tsMidi.take;
        tsMidi.take = null;
        if (take) stopClicks(take);
        release();
    }

    function inputNames() {
        return ensureEnabled().then(function (wm) {
            return (wm.inputs || []).map(function (i) { return i.name; });
        });
    }

    tsMidi.open = open;
    tsMidi.record = record;
    tsMidi.hasStarted = hasStarted;
    tsMidi.close = close;
    tsMidi.abort = abort;
    tsMidi.inputNames = inputNames;
    tsMidi.perfToContextTime = perfToContextTime;

    // the Stop sign ends the stream: no click may keep running after the user stops everything
    if (typeof world !== 'undefined' && world.children && world.children[0] && typeof world.children[0].stopAllScripts === 'function') {
        (function (ide) {
            var previous = ide.stopAllScripts.bind(ide);
            ide.stopAllScripts = function () {
                previous();
                try { abort(); } catch (err) { console.error('TuneScope MIDI stop:', err); }
            };
        }(world.children[0]));
    }

    if (typeof window !== 'undefined') {
        window.tsQuantizeMidi = quantizeMidiRecording;
        window.tsMidi = tsMidi;
    }
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {quantizeMidiRecording: quantizeMidiRecording, parseMeter: parseMeter, tsMidi: tsMidi};
    }
}());
