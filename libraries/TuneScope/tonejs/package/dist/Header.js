"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = exports.keySignatureKeys = void 0;
var BinarySearch_1 = require("./BinarySearch");
var privatePPQMap = new WeakMap();
/**
 * @hidden
 */
exports.keySignatureKeys = [
    "Cb",
    "Gb",
    "Db",
    "Ab",
    "Eb",
    "Bb",
    "F",
    "C",
    "G",
    "D",
    "A",
    "E",
    "B",
    "F#",
    "C#",
];
/**
 * The parsed MIDI file header.
 */
var Header = /** @class */ (function () {
    function Header(midiData) {
        var _this = this;
        /**
         * The array of all the tempo events.
         */
        this.tempos = [];
        /**
         * The time signatures.
         */
        this.timeSignatures = [];
        /**
         * The time signatures.
         */
        this.keySignatures = [];
        /**
         * Additional meta events.
         */
        this.meta = [];
        /**
         * The name of the MIDI file;
         */
        this.name = "";
        // Look through all the tracks for tempo changes.
        privatePPQMap.set(this, 480);
        if (midiData) {
            privatePPQMap.set(this, midiData.header.ticksPerBeat);
            // Check time signature and tempo events from all of the tracks.
            midiData.tracks.forEach(function (track) {
                track.forEach(function (event) {
                    if (event.meta) {
                        if (event.type === "timeSignature") {
                            _this.timeSignatures.push({
                                ticks: event.absoluteTime,
                                timeSignature: [
                                    event.numerator,
                                    event.denominator,
                                ],
                            });
                        }
                        else if (event.type === "setTempo") {
                            _this.tempos.push({
                                bpm: 60000000 / event.microsecondsPerBeat,
                                ticks: event.absoluteTime,
                            });
                        }
                        else if (event.type === "keySignature") {
                            _this.keySignatures.push({
                                key: exports.keySignatureKeys[event.key + 7],
                                scale: event.scale === 0 ? "major" : "minor",
                                ticks: event.absoluteTime,
                            });
                        }
                    }
                });
            });
            // Check the first track for other relevant data.
            var firstTrackCurrentTicks_1 = 0; // Used for absolute times.
            midiData.tracks[0].forEach(function (event) {
                firstTrackCurrentTicks_1 += event.deltaTime;
                if (event.meta) {
                    if (event.type === "trackName") {
                        _this.name = event.text;
                    }
                    else if (event.type === "text" ||
                        event.type === "cuePoint" ||
                        event.type === "marker" ||
                        event.type === "lyrics") {
                        _this.meta.push({
                            text: event.text,
                            ticks: firstTrackCurrentTicks_1,
                            type: event.type,
                        });
                    }
                }
            });
            this.update();
        }
    }
    /**
     * This must be invoked after any changes are made to the tempo array
     * or the timeSignature array for the updated values to be reflected.
     */
    Header.prototype.update = function () {
        var _this = this;
        var currentTime = 0;
        var lastEventBeats = 0;
        // Make sure it's sorted;
        this.tempos.sort(function (a, b) { return a.ticks - b.ticks; });
        this.tempos.forEach(function (event, index) {
            var lastBPM = index > 0 ? _this.tempos[index - 1].bpm : _this.tempos[0].bpm;
            var beats = event.ticks / _this.ppq - lastEventBeats;
            var elapsedSeconds = (60 / lastBPM) * beats;
            event.time = elapsedSeconds + currentTime;
            currentTime = event.time;
            lastEventBeats += beats;
        });
        this.timeSignatures.sort(function (a, b) { return a.ticks - b.ticks; });
        this.timeSignatures.forEach(function (event, index) {
            var lastEvent = index > 0
                ? _this.timeSignatures[index - 1]
                : _this.timeSignatures[0];
            var elapsedBeats = (event.ticks - lastEvent.ticks) / _this.ppq;
            var elapsedMeasures = elapsedBeats /
                lastEvent.timeSignature[0] /
                (lastEvent.timeSignature[1] / 4);
            lastEvent.measures = lastEvent.measures || 0;
            event.measures = elapsedMeasures + lastEvent.measures;
        });
    };
    /**
     * Convert ticks into seconds based on the tempo changes.
     */
    Header.prototype.ticksToSeconds = function (ticks) {
        // Find the relevant position.
        var index = (0, BinarySearch_1.search)(this.tempos, ticks);
        if (index !== -1) {
            var tempo = this.tempos[index];
            var tempoTime = tempo.time;
            var elapsedBeats = (ticks - tempo.ticks) / this.ppq;
            return tempoTime + (60 / tempo.bpm) * elapsedBeats;
        }
        else {
            // Assume 120.
            var beats = ticks / this.ppq;
            return (60 / 120) * beats;
        }
    };
    /**
     * Convert ticks into measures based off of the time signatures.
     */
    Header.prototype.ticksToMeasures = function (ticks) {
        var index = (0, BinarySearch_1.search)(this.timeSignatures, ticks);
        if (index !== -1) {
            var timeSigEvent = this.timeSignatures[index];
            var elapsedBeats = (ticks - timeSigEvent.ticks) / this.ppq;
            return (timeSigEvent.measures +
                elapsedBeats /
                    (timeSigEvent.timeSignature[0] /
                        timeSigEvent.timeSignature[1]) /
                    4);
        }
        else {
            return ticks / this.ppq / 4;
        }
    };
    Object.defineProperty(Header.prototype, "ppq", {
        /**
         * The number of ticks per quarter note.
         */
        get: function () {
            return privatePPQMap.get(this);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Convert seconds to ticks based on the tempo events.
     */
    Header.prototype.secondsToTicks = function (seconds) {
        // Find the relevant position.
        var index = (0, BinarySearch_1.search)(this.tempos, seconds, "time");
        if (index !== -1) {
            var tempo = this.tempos[index];
            var tempoTime = tempo.time;
            var elapsedTime = seconds - tempoTime;
            var elapsedBeats = elapsedTime / (60 / tempo.bpm);
            return Math.round(tempo.ticks + elapsedBeats * this.ppq);
        }
        else {
            // Assume 120.
            var beats = seconds / (60 / 120);
            return Math.round(beats * this.ppq);
        }
    };
    /**
     * Convert the header into an object.
     */
    Header.prototype.toJSON = function () {
        return {
            keySignatures: this.keySignatures,
            meta: this.meta,
            name: this.name,
            ppq: this.ppq,
            tempos: this.tempos.map(function (t) {
                return {
                    bpm: t.bpm,
                    ticks: t.ticks,
                };
            }),
            timeSignatures: this.timeSignatures,
        };
    };
    /**
     * Parse a header json object.
     */
    Header.prototype.fromJSON = function (json) {
        this.name = json.name;
        // Clone all the attributes.
        this.tempos = json.tempos.map(function (t) { return Object.assign({}, t); });
        this.timeSignatures = json.timeSignatures.map(function (t) {
            return Object.assign({}, t);
        });
        this.keySignatures = json.keySignatures.map(function (t) {
            return Object.assign({}, t);
        });
        this.meta = json.meta.map(function (t) { return Object.assign({}, t); });
        privatePPQMap.set(this, json.ppq);
        this.update();
    };
    /**
     * Update the tempo of the midi to a single tempo. Will remove and replace
     * any other tempos currently set and update all of the event timing.
     * @param bpm The tempo in beats per second.
     */
    Header.prototype.setTempo = function (bpm) {
        this.tempos = [
            {
                bpm: bpm,
                ticks: 0,
            },
        ];
        this.update();
    };
    return Header;
}());
exports.Header = Header;
//# sourceMappingURL=Header.js.map