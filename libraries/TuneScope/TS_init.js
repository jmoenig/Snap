// play note function
var AudioContextFunc = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContextFunc();
window.audioContext = audioContext;


// calculate midi pitches and frequencies
var tempMidiPitches = {}
var tempMidiFreqs = {}

let notes = [
    "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"
]

for (var i = 0; i <= 127; i++) {
    let note = notes[i % 12] + Math.floor((i-12)/12);
    tempMidiPitches[note] = i;
    tempMidiFreqs[note] = 440 * Math.pow(2, (i - 69)/12)
}

window.currentNote = ""
window._parsed = ""
window._isParsed = false
window.parent._ts_pausePlayback = false;

const _ide = world.children[0];
const original_stop = _ide.stopAllScripts.bind(_ide);
_ide.stopAllScripts = function() {
  original_stop();
  window.parent._ts_pausePlayback = true;
  window.tsPerformanceEnd = null; // the next Play Tracks starts afresh, not where the stopped one would have ended
  if (window.tsPlayer) window.tsPlayer.cancelQueue(audioContext); // silence notes still sounding
}

const _convertToSharp = (note) => {
    if (typeof note !== "string") return note;
    // E# and B# have no key of their own: E#4 is F4, B#3 is C4
    if (/^E#-?\d+$/.test(note)) return "F" + note.slice(2);
    if (/^B#-?\d+$/.test(note)) return "C" + (parseInt(note.slice(2), 10) + 1);
    const splitByFlat = note.split("b");
    if (splitByFlat.length < 2) return note; // does not include a flat

    const letter = splitByFlat[0];
    const number = splitByFlat[1];

    const indexOfLetter = notes.indexOf(letter);
    if (indexOfLetter === -1) return note; // TODO: handle this error
    if (indexOfLetter === 0) {
        // Cb wraps to B in the octave below (Cb4 = B3); other flats stay in octave
        return notes[notes.length - 1] + (parseInt(number, 10) - 1);
    }
    return notes[indexOfLetter - 1] + number;
}
window._convertToSharp = _convertToSharp;
window.parent.midiPitches = tempMidiPitches;
window.parent.midiFreqs = tempMidiFreqs;


// one player for all notes, so that finished sound nodes are reused and the
// stop button can silence everything that is still sounding
const tsPlayer = new WebAudioFontPlayer();
window.tsPlayer = tsPlayer;

// Every note on the speakers passes through this gain node, so the visualizer
// can listen to the mix by connecting an analyser to it (see TuneScope.js).
const tsBus = audioContext.createGain();
tsBus.connect(audioContext.destination);
window.tsBus = tsBus;

// A few output stages for notes whose loudness changes while they sound (a
// slide that swells into a louder note). The player reuses its envelopes per
// output node, so a small fixed set keeps its pool from growing.
const tsStages = [];
let tsNextStage = 0;
function tsGainStage(ctx, start, gains) {
  if (ctx !== audioContext) { // a rendering: a fresh stage, nothing to reuse
    const stage = ctx.createGain();
    stage.connect(ctx.destination);
    stage.gain.setValueAtTime(1, start);
    gains.forEach((g) => stage.gain.linearRampToValueAtTime(Math.max(0.000001, g.ratio), start + g.when));
    return stage;
  }
  if (tsStages.length < 16) {
    const stage = audioContext.createGain();
    stage.connect(tsBus);
    tsStages.push(stage);
  }
  const stage = tsStages[tsNextStage];
  tsNextStage = (tsNextStage + 1) % 16;
  stage.gain.cancelScheduledValues(start);
  stage.gain.setValueAtTime(1, start);
  gains.forEach((g) => stage.gain.linearRampToValueAtTime(Math.max(0.000001, g.ratio), start + g.when));
  return stage;
}

// A slide re-pitches one recording by playing it faster or slower. Past the
// range that recording covers, its vibrato and tone change with the speed: an
// octave up doubles the vibrato. So when a bend reaches a pitch that another
// zone of the font covers, that zone's recording is faded in across the bend
// while the old one fades out, as a sampler does. The incoming recording
// starts a little early, silent, at the pitch sounding then, so its attack
// has passed before it is heard: one continuous sound, as in a slur.
const TS_XFADE_LEAD = 0.1;                            // seconds of silent head start
const TS_XFADE_OUT = [1, 0.924, 0.707, 0.383, 0];      // equal-power fade: cos 0..90 degrees
const TS_XFADE_IN = [0, 0.383, 0.707, 0.924, 1];       // and sin
const tsFades = [];
let tsNextFade = 0;
function tsFadeStage(ctx, out) {
  if (ctx !== audioContext) { // a rendering
    const stage = ctx.createGain();
    stage.connect(out);
    return stage;
  }
  if (tsFades.length < 32) tsFades.push(audioContext.createGain());
  const stage = tsFades[tsNextFade];
  tsNextFade = (tsNextFade + 1) % 32;
  stage.disconnect();
  stage.connect(out);
  return stage;
}
function tsRampSteps(param, values, t0, t1) {
  for (let k = 1; k < values.length; k++) param.linearRampToValueAtTime(values[k], t0 + (t1 - t0) * k / (values.length - 1));
}
// the legs of a slide: one per recording, each with its start, its own slide
// points and the bends across which it fades in or out
window.tsSlideLegs = (preset, pitch, slides, length, player, ctx) => {
  const pts = [{ delta: 0, when: 0 }].concat(slides.slice().sort((a, b) => a.when - b.when));
  const pitchAt = (t) => {
    for (let i = 1; i < pts.length; i++) {
      if (t <= pts[i].when) {
        const a = pts[i - 1], b = pts[i];
        return pitch + a.delta + (b.when > a.when ? (b.delta - a.delta) * (t - a.when) / (b.when - a.when) : 0);
      }
    }
    return pitch + pts[pts.length - 1].delta;
  };
  const zoneOf = (p) => (player || tsPlayer).findZone(ctx || audioContext, preset, p);
  const legs = [{ zone: zoneOf(pitch), start: 0, pitch: pitch, fadeIn: null, fadeOut: null, end: length }];
  for (let i = 1; i < pts.length; i++) {
    if (pts[i].delta === pts[i - 1].delta) continue;                 // a hold
    const zone = zoneOf(pitch + pts[i].delta), leg = legs[legs.length - 1];
    if (zone === leg.zone || !zone) continue;                        // the same recording serves
    const t0 = pts[i - 1].when, t1 = pts[i].when, start = Math.max(leg.start + 0.001, t0 - TS_XFADE_LEAD);
    leg.fadeOut = { t0: t0, t1: t1 };
    leg.end = t1;
    legs.push({ zone: zone, start: start, pitch: pitchAt(start), fadeIn: { t0: t0, t1: t1 }, fadeOut: null, end: length });
  }
  legs.forEach((leg) => {
    leg.duration = leg.end - leg.start;
    leg.slides = pts.filter((q) => q.when > leg.start && q.when <= leg.end)
                    .map((q) => ({ delta: pitch + q.delta - leg.pitch, when: q.when - leg.start }));
    // a recording other than the font's own choice for the pitch: offer it alone
    leg.preset = (leg === legs[0]) ? preset : { zones: [Object.assign({}, leg.zone, { keyRangeLow: 0, keyRangeHigh: 127 })] };
  });
  return legs;
};

// Export Tracks renders a performance off-line: while tsRenderTarget is set,
// playNote queues its sounds into that context through that player instead of
// the speakers (see TS_export.js).
window.tsRenderTarget = null;

// slides: optional [{delta: semitones, when: seconds}] pitch changes inside the note
// gains: optional [{ratio, when: seconds}] loudness changes inside the note, relative to volume
window.playNote = (note, noteLength, instrumentName, recordNote, volume, when, slides, gains) => {
  const ctx = window.tsRenderTarget ? window.tsRenderTarget.context : audioContext;
  const player = window.tsRenderTarget ? window.tsRenderTarget.player : tsPlayer;
  if (recordNote) window.currentNote = note;
  if (note == "R" || note == "r") return;
  // a tie marker that reaches this far degrades to a plain note instead of silence
  if (typeof note === "string" && note.charAt(note.length - 1) === "~") note = note.slice(0, -1);

  let name = (instrumentName || window.parent.currentInstrumentName).toLowerCase();
  if (window.tsCanonicalInstrument) name = window.tsCanonicalInstrument(name); // an old name means a new instrument
  const data = window.parent.instrumentData[name];
  if (!data) throw new Error('Unknown instrument "' + name + '". Choose one from the Set Instrument To menu.');
  const preset = window[data.name];
  if (!preset || !preset.zones || !preset.zones.every(zone => zone.buffer)) {
    if (!window.parent.loadedTuneScope) throw new Error('TuneScope is not loaded. Run Initialize TuneScope first.');
    if (window.tsLoadInstrument) window.tsLoadInstrument(name); // fetch it now, for the next try
    throw new Error('The instrument "' + name + '" is still loading. Try again in a moment.');
  }

  // a drum plays its own key; a MIDI number is used directly; a note name is looked up
  const pitch = (data.drumPitch !== undefined) ? data.drumPitch
              : (parseFloat(note) === +note) ? +note : window.parent.midiPitches[_convertToSharp(note)];

  // an explicit volume wins; otherwise the instrument's volume (default 100%) scales the global volume
  const instrumentScale = (typeof window.parent.instrumentVolumes[name] === 'number')
      ? window.parent.instrumentVolumes[name] : 1;
  const vol = (typeof volume === 'number') ? volume : window.parent.globalInstrumentVolume * instrumentScale;

  // zero means silence: the player would treat a volume of 0 as "not given" and play at 0.5
  if (!(vol > 0)) return null;

  // a percussion sound rings for its whole recording, as on a drum machine, whatever
  // length it is written with; the written length still places the next note.
  // A looped recording has no end, so it keeps the written length.
  if (data.percussion) {
    const zone = player.findZone(ctx, preset, pitch);
    if (zone && zone.buffer && !(zone.loopEnd > zone.loopStart && zone.loopStart > 0)) {
      const rate = Math.pow(2, (100 * pitch - (zone.originalPitch - 100 * zone.coarseTune - zone.fineTune)) / 1200);
      noteLength = Math.max(noteLength, (zone.buffer.duration - (zone.delay || 0)) / rate);
    }
  }

  // the envelope is returned so that a live MIDI note can be cut when its key is released
  const startWhen = Math.max(when || 0, ctx.currentTime);
  const target = (gains && gains.length) ? tsGainStage(ctx, startWhen, gains) : (ctx === audioContext ? tsBus : ctx.destination);
  const legs = (slides && slides.length) ? window.tsSlideLegs(preset, pitch, slides, noteLength, player, ctx) : null;
  if (!legs || legs.length === 1) return player.queueWaveTable(ctx, target, preset, when || 0, pitch, noteLength, vol, slides);
  let first = null;
  legs.forEach((leg) => {
    const stage = tsFadeStage(ctx, target), begin = startWhen + leg.start;
    stage.gain.cancelScheduledValues(begin);
    if (leg.fadeIn) {
      stage.gain.setValueAtTime(0, begin);
      stage.gain.setValueAtTime(0, startWhen + leg.fadeIn.t0);
      tsRampSteps(stage.gain, TS_XFADE_IN, startWhen + leg.fadeIn.t0, startWhen + leg.fadeIn.t1);
    } else {
      stage.gain.setValueAtTime(1, begin);
    }
    if (leg.fadeOut) {
      stage.gain.setValueAtTime(1, startWhen + leg.fadeOut.t0);
      tsRampSteps(stage.gain, TS_XFADE_OUT, startWhen + leg.fadeOut.t0, startWhen + leg.fadeOut.t1);
    }
    const env = player.queueWaveTable(ctx, stage, leg.preset, begin, leg.pitch, leg.duration, vol, leg.slides);
    if (!first) first = env;
  });
  return first;
}

// [beats per measure, length of one beat in quarter notes]: a measure lasts
// beats * beat value quarter notes, and a quarter note lasts 60 / tempo seconds
window.timeSignatureToBeatsPerMeasure = {
    "2/2": [2, 2],  // cut time: 2 beats per measure, half note gets the beat
    "3/2": [3, 2],
    "2/4": [2, 1],
    "3/4": [3, 1],
    "4/4": [4, 1],  // 4 beats per measure, quarter note gets the beat
    "5/4": [5, 1],
    "6/4": [6, 1],
    "7/4": [7, 1],
    "3/8": [3, 0.5],
    "5/8": [5, 0.5],
    "6/8": [6, 0.5], // 6 beats per measure, eighth note gets the beat
    "7/8": [7, 0.5],
    "9/8": [9, 0.5],
    "12/8": [12, 0.5]
}

// "n/d" -> [n, 4 / d]; the table above first, then any beats/note-value pair
window.tsParseTimeSignature = (text) => {
    const key = String(text == null ? '' : text).replace(/\s+/g, '');
    const known = window.timeSignatureToBeatsPerMeasure[key];
    if (known) return known;
    const m = /^(\d+)\/(\d+)$/.exec(key);
    if (!m || +m[1] < 1 || [1, 2, 4, 8, 16, 32].indexOf(+m[2]) === -1) {
        throw new Error('Unknown time signature "' + text + '". Write beats per measure over the beat value, such as 3/4 or 6/8.');
    }
    return [+m[1], 4 / +m[2]];
}

// instruments whose pitch can slide continuously (a / glide mark bends the
// note into the next); the others play a glide as a run of semitones, and
// drums ignore it
// a glide bends the pitch on the instruments marked bends in TS_instruments.js;
// on the others it plays every semitone instead
// true for the sounds of the Percussion group, which ring out whatever their written length
window.tsIsPercussion = (name) => {
    let key = String(name).toLowerCase();
    if (window.tsCanonicalInstrument) key = window.tsCanonicalInstrument(key);
    const data = window.parent.instrumentData && window.parent.instrumentData[key];
    return !!(data && data.percussion);
};

window.tsCanSlide = (name) => {
    const data = window.parent.instrumentData && window.parent.instrumentData[String(name).toLowerCase()];
    return !!(data && data.bends);
};

window.baseTempo = 60;

// converts note lengths (quarter, half, whole)
// to corresponding time value (1, 2, 4)
window.noteLengthToTimeValue = {
    "dotted whole": 6,
    "whole": 4,
    "dotted half": 3,
    "half": 2,
    "dotted quarter": 1.5,
    "quarter": 1,
    "dotted eighth": 0.75,
    "eighth": 0.5,
    "dotted sixteenth": 0.375,
    "sixteenth": 0.25,
    "dotted thirtysecond": 0.1875,
    "thirtysecond": 0.125,
    "whole triplet": 8/3,
    "half triplet": 4/3,
    "quarter triplet": 2/3,
    "eighth triplet": 1/3,
    "sixteenth triplet": 1/6,
    "thirtysecond triplet": 1/12,
    "thirty second triplet": 1/12
}

// Match note-duration names regardless of case, spaces, or hyphens, so
// "thirty-second", "thirty second", and "Thirtysecond" all resolve.
window.noteLengthNormalized = {};
for (var __dk in window.noteLengthToTimeValue) {
    if (Object.prototype.hasOwnProperty.call(window.noteLengthToTimeValue, __dk)) {
        window.noteLengthNormalized[__dk.toLowerCase().replace(/[\s\-]+/g, '')] = window.noteLengthToTimeValue[__dk];
    }
}


// instrument data
// The instrument table, name -> {name: the sound file's variable, file, drumPitch?, bends},
// is built by TS_instruments.js, which stores it as window.parent.instrumentData.
window.parent.currentInstrumentName = "piano";

// initialize volumes
window.parent.instrumentVolumes = {}
window.parent.globalInstrumentVolume = 0.5;

// tones
class _Tone {
  constructor(id) {
    this.id = id;
    this.on = false;

    //const pannerNode = new StereoPannerNode(audioContext, -1);
    const thisPlayer = new Object;
    thisPlayer.context = new AudioContext();
    thisPlayer.oscillator = thisPlayer.context.createOscillator();
    thisPlayer.panner = thisPlayer.context.createStereoPanner();
    thisPlayer.gainobj = thisPlayer.context.createGain();
    thisPlayer.oscillator.frequency.value = 100;
    thisPlayer.panner.pan.value = 0;
    thisPlayer.gainobj.gain.value = 1;
    thisPlayer.oscillator.connect(thisPlayer.panner);
    thisPlayer.panner.connect(thisPlayer.gainobj);
    thisPlayer.gainobj.connect(thisPlayer.context.destination);

    this.player = thisPlayer;
  }

  dBFS2gain = (dbfs) => {
    //return Math.pow(10, dbfs / 20);
    return (dbfs / 100).toFixed(2);
  }

  setFreq = (freq) => {
    this.freq = freq;
    this.player.oscillator.frequency.value = Math.max(freq, 0);
  }

  setAmpl = (ampl) => {
    this.ampl = ampl;
    this.player.gainobj.gain.value = this.dBFS2gain(parseInt(ampl));
  }

  setPan = (pan) => {
    this.pan = Math.min(Math.max(pan, -100), 100);
    this.player.panner.pan.setValueAtTime(this.pan / 100, this.player.context.currentTime);
  }

  turnOn = () => {
    console.log("on");
    if (this.on) return;
    console.log("turning on");
    if (!this.started) {
      this.player.oscillator.start(0);
      this.started = true;
    } else {
      this.player.context.resume();
    }
    this.on = true;
  }

  turnOff = () => {
    console.log("off");
    if (!this.on) return;
    console.log("turning off");
    this.player.context.suspend();
    this.on = false;
  }

}
window._Tone = _Tone;
window.tones = {};

/* Auxillary Functions */
// repeats an array n times
// similar to [1,2,3] * 2 = [1,2,3,1,2,3] in Python
window.multiplyArray = (arr, length) =>
  Array.from({ length }, () => arr).flat()


/*
Queue.js
A function to represent a queue
Created by Kate Morley - http://code.iamkate.com/ - and released under the terms
of the CC0 1.0 Universal legal code:
http://creativecommons.org/publicdomain/zero/1.0/legalcode
*/

/**
 * Creates a new queue. A queue is a first-in-first-out (FIFO) data structure -
 * items are added to the end of the queue and removed from the front.
 */
function Queue() {

  // initialise the queue and offset
  var queue = [];
  var offset = 0;

  // Returns the length of the queue.
  this.getLength = function () {
    return (queue.length - offset);
  }

  // Returns true if the queue is empty, and false otherwise.
  this.isEmpty = function () {
    return (queue.length === 0);
  }

  /* Enqueues the specified item. The parameter is:
   *
   * item - the item to enqueue
   */
  this.enqueue = function (item) {
    queue.push(item);
  }

  /* Dequeues an item and returns it. If the queue is empty, the value
   * 'undefined' is returned.
   */
  this.dequeue = function () {

    // if the queue is empty, return immediately
    if (queue.length === 0) return undefined;

    // store the item at the front of the queue
    var item = queue[offset];

    // increment the offset and remove the free space if necessary
    if (++offset * 2 >= queue.length) {
      queue = queue.slice(offset);
      offset = 0;
    }

    // return the dequeued item
    return item;

  }

  /* Returns the item at the front of the queue (without dequeuing it). If the
   * queue is empty then undefined is returned.
   */
  this.peek = function () {
    return (queue.length > 0 ? queue[offset] : undefined);
  }

}
window.Queue = Queue;

/**
 * Converts all elements in a nested array (2D, 3D, etc) to lowercase
 * @param {*} arr
 */
function toLowerCaseRecursive(array) {
  //check for arrays and recurse
  if (Array.isArray(array)) {
    for (var i = 0; i < array.length; i++) {
      array[i] = toLowerCaseRecursive(array[i]);
    }
    return array;
  }
  //check for string vs non-strings
  if (typeof array === "string") {
    if (!hasNumber(array)) { //contains no numbers, so it isn't a note value
      return array.toLowerCase();
    } else {  //case with note values, which contain numbers
      //capitalize the first character in the string
      return array[0].toUpperCase() + array.slice(1);
    }
  } else {
    return array;
  }
}
window.toLowerCaseRecursive = toLowerCaseRecursive;

function convertListToArrayRecursive(list) {
    let temp = []
    // need to do more testing for chords and nested lists
    if (!(list.contents === undefined)) {
      for (var i = 0; i < list.contents.length; i++) {
          temp[i] = convertListToArrayRecursive(list.contents[i]);
      }
      return temp;
    } else {
      return list;
    }
}
window.convertListToArrayRecursive = convertListToArrayRecursive;

const convertArrayToListRecursive = (array) => {
    if (Array.isArray(array)) {
        for (var i = 0; i < array.length; i++) {
            array[i] = convertArrayToListRecursive(array[i]);
        }
        return IDE_Morph.prototype.newList(array);
    }
    return array;
}
window.convertArrayToListRecursive = convertArrayToListRecursive;

function typeOf(value) {
    return Object.prototype.toString.call(value).slice(8, -1);
}

const _isObject = (obj) => {
  //typeof obj === 'object'
  return (typeof obj === "object" || typeOf(obj) === "Array") && obj !== null;

}

const _objToArray = (obj) => {
  return Object.keys(obj).map((key) => {
    return [key, _isObject(obj[key]) ? 
        _objToArray(obj[key]) :
        obj[key]
    ];
  });    
}
window._objToArray = _objToArray;

function hasNumber(myString) {
  return /\d/.test(myString);
}
window.hasNumber = hasNumber;

function isNumber(myString) {
  return /^\d*\.?\d+$/.test(String(myString));
}
window.isNumber = isNumber;

function deep_copy(array) {
  return JSON.parse(JSON.stringify(array));
}
window.deep_copy = deep_copy;

// decode one instrument file's recordings so that its first note plays at once.
// Resolves when every sample buffer is ready.
// The compressed audio of an instrument is in a .bin file beside its .js file;
// each zone names its bytes there with fileOffset and fileLength.
window.tsAttachSamples = (preset, buffer) => {
  preset.zones.forEach(zone => {
    if (zone.fileLength !== undefined && !zone.buffer && !zone.fileData) {
      zone.fileData = buffer.slice(zone.fileOffset, zone.fileOffset + zone.fileLength);
    }
  });
};

window.tsDecodePreset = (preset) => {
  tsPlayer.adjustPreset(audioContext, preset);
  return new Promise(resolve => {
    const check = () => {
      if (preset.zones.every(zone => zone.buffer)) resolve();
      else setTimeout(check, 50);
    };
    check();
  });
};

// decode every instrument whose file is loaded; called by ts_load() in TuneScope.js
// after the preload instruments arrive, which then sets window.parent.loadedTuneScope.
window.tsDecodeAll = () => {
  const presets = Object.values(window.parent.instrumentData)
    .map(data => window[data.name])
    .filter((preset, i, all) => preset && preset.zones && all.indexOf(preset) === i);
  return Promise.all(presets.map(window.tsDecodePreset)).then(() => undefined);
};

/**
 * Select file(s).
 * @param {String} contentType The content type of files you wish to select. For instance, use "image/*" to select all types of images.
 * @param {Boolean} multiple Indicates if the user can select multiple files.
 * @returns {Promise<File|File[]>} A promise of a file or array of files in case the multiple parameter is true.
 */
function _selectFile(contentType, multiple) {
    return new Promise(resolve => {
        let input = document.createElement('input');
        input.type = 'file';
        input.multiple = multiple;
        input.accept = contentType;

        input.onchange = () => {
            let files = Array.from(input.files);
            if (multiple)
                resolve(files);
            else
                resolve(files[0]);
        };
        // the window was closed without a choice (browsers from 2023 on fire this)
        input.addEventListener('cancel', () => resolve(multiple ? [] : null));

        input.click();
    });
}
window._selectFile = _selectFile;
