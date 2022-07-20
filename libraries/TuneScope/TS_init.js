// play note function
var AudioContextFunc = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContextFunc();

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

const _convertToSharp = (note) => {
    const splitByFlat = note.split("b");
    if (splitByFlat.length < 2) return note; // does not include a flat

    const letter = splitByFlat[0];
    const number = splitByFlat[1];

    const indexOfLetter = notes.indexOf(letter);
    if (indexOfLetter === -1) return note; // TODO: handle this error
    let previousSharp;
    if (indexOfLetter === 0) {
        previousSharp = notes[notes.length - 1];
    } else {
        previousSharp = notes[indexOfLetter - 1];
    }
    return previousSharp + number;
}
window.parent.midiPitches = tempMidiPitches;
window.parent.midiFreqs = tempMidiFreqs;


window.playNote = (note, noteLength, instrumentName, volume) => {
   if (note == "R" || note == "r") return;

   note = _convertToSharp(note);
   
			var player=new WebAudioFontPlayer();
   instrumentName = instrumentName || window.parent.currentInstrumentName;
   instrumentName = instrumentName.toLowerCase()
   // console.log(instrumentName);
   let currentInstrumentData = window.parent.instrumentData[instrumentName]
			player.loader.decodeAfterLoading(audioContext, currentInstrumentData.name);
   
			function play(){
    const vol = volume || window.parent.instrumentVolumes[instrumentName] || window.parent.globalInstrumentVolume;
    console.log(note, noteLength, instrumentName, vol)
				player.queueWaveTable(audioContext, audioContext.destination
					, window[currentInstrumentData.name], 0, window.parent.midiPitches[note], noteLength, vol
    );
				return false;
			}
   play();
}

window.timeSignatureToBeatsPerMeasure = {
    "4/4": [4,1], // 4 beats per measure, Quarter note gets the beat
    "3/4": [3,1],
    "5/4": [5,1],
    "7/4": [7,1],
    "6/8": [6,0.5], // 6 beats per measure, Eighth note gets the beat
    "9/8": [9,0.5],
    "12/8": [12,0.5]
}

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
    "whole triplet": 2.667,
    "half triplet": 1.333,
    "quarter triplet": 0.667,
    "eighth triplet": 0.333,
    "sixteenth triplet": 0.167,
    "thirtysecond triplet": 0.0417
}

// instrument data
window.parent.instrumentData = {
    "accordion": {
        path: "https://surikov.github.io/webaudiofontdata/sound/0230_Aspirin_sf2_file.js",
        name: "_tone_0230_Aspirin_sf2_file"
    },
    "bass, acoustic": {
        path: "https://surikov.github.io/webaudiofontdata/sound/0320_GeneralUserGS_sf2_file.js",
        name: "_tone_0320_GeneralUserGS_sf2_file"
    },
    "bass, electric (finger)": {
        path: "https://surikov.github.io/webaudiofontdata/sound/0350_JCLive_sf2_file.js",
        name: "_tone_0350_JCLive_sf2_file"
    },
    "guitar, acoustic": {
        path: "https://surikov.github.io/webaudiofontdata/sound/0241_JCLive_sf2_file.js",
        name: "_tone_0241_JCLive_sf2_file"
    },
    "guitar, electric": {
        path: "https://surikov.github.io/webaudiofontdata/sound/0260_JCLive_sf2_file.js",
        name: "_tone_0260_JCLive_sf2_file"
    },
    "piano": {
        path: "https://surikov.github.io/webaudiofontdata/sound/0020_JCLive_sf2_file.js",
        name: "_tone_0020_JCLive_sf2_file"
    },
    "organ": {
        path: "https://surikov.github.io/webaudiofontdata/sound/0180_Chaos_sf2_file.js",
        name: "_tone_0180_Chaos_sf2_file"
    },
    "banjo": {
        path: "https://surikov.github.io/webaudiofontdata/sound/1050_FluidR3_GM_sf2_file.js",
        name: "_tone_1050_FluidR3_GM_sf2_file"
    },
    "saxophone": {
        path: "https://surikov.github.io/webaudiofontdata/sound/0650_FluidR3_GM_sf2_file.js",
        name: "_tone_0650_FluidR3_GM_sf2_file"
    },
    "shakuhachi": {
        path: "https://surikov.github.io/webaudiofontdata/sound/0770_SBLive_sf2.js",
        name: "_tone_0770_SBLive_sf2"
    },
    "sitar": {
        path: "https://surikov.github.io/webaudiofontdata/sound/1040_Aspirin_sf2_file.js",
        name: "_tone_1040_Aspirin_sf2_file"
    },
    "bassoon": {
        path: "https://surikov.github.io/webaudiofontdata/sound/0700_FluidR3_GM_sf2_file.js",
        name: "_tone_0700_FluidR3_GM_sf2_file"
    },
    "bass": {
        path: "https://surikov.github.io/webaudiofontdata/sound/0350_JCLive_sf2_file.js",
        name: "_tone_0350_JCLive_sf2_file"
    },
    "violin": {
        path: "https://surikov.github.io/webaudiofontdata/sound/0400_JCLive_sf2_file.js",
        name: "_tone_0400_JCLive_sf2_file"
    },
    "cello": {
        path: "https://surikov.github.io/webaudiofontdata/sound/0420_JCLive_sf2_file.js",
        name: "_tone_0420_JCLive_sf2_file"
    },
    "clarinet": {
        path: "https://surikov.github.io/webaudiofontdata/sound/0710_Chaos_sf2_file.js",
        name: "_tone_0710_Chaos_sf2_file"
    },
    "flute": {
        path: "https://surikov.github.io/webaudiofontdata/sound/0730_JCLive_sf2_file.js",
        name: "_tone_0730_JCLive_sf2_file"
    },
    "french horn": {
        path: "https://surikov.github.io/webaudiofontdata/sound/0600_GeneralUserGS_sf2_file.js",
        name: "_tone_0600_GeneralUserGS_sf2_file"
    },
    "harp": {
        path: "https://surikov.github.io/webaudiofontdata/sound/0460_GeneralUserGS_sf2_file.js",
        name: "_tone_0460_GeneralUserGS_sf2_file"
    },
    "koto": {
        path: "https://surikov.github.io/webaudiofontdata/sound/1070_FluidR3_GM_sf2_file.js",
        name: "_tone_1070_FluidR3_GM_sf2_file"
    },
    "marimba": {
        path: "https://surikov.github.io/webaudiofontdata/sound/0121_FluidR3_GM_sf2_file.js",
        name: "_tone_0121_FluidR3_GM_sf2_file"
    },
    "oboe": {
        path: "https://surikov.github.io/webaudiofontdata/sound/0680_JCLive_sf2_file.js",
        name: "_tone_0680_JCLive_sf2_file"
    },
    "trumpet": {
        path: "https://surikov.github.io/webaudiofontdata/sound/0560_GeneralUserGS_sf2_file.js",
        name: "_tone_0560_GeneralUserGS_sf2_file"
    },
    "tuba": {
        path: "https://surikov.github.io/webaudiofontdata/sound/0580_GeneralUserGS_sf2_file.js",
        name: "_tone_0580_GeneralUserGS_sf2_file"
    },

    // drums

    "cabasa": {
        path: "https://surikov.github.io/webaudiofontdata/sound/12869_6_JCLive_sf2_file.js",
        name: "_drum_69_6_JCLive_sf2_file"
    },
    "snare drum": {
        path: "https://surikov.github.io/webaudiofontdata/sound/12840_6_JCLive_sf2_file.js",
        name: "_drum_40_6_JCLive_sf2_file"
    },
    "bass drum": {
        path: "https://surikov.github.io/webaudiofontdata/sound/12835_21_FluidR3_GM_sf2_file.js",
        name: "_drum_35_21_FluidR3_GM_sf2_file"
    },
    "closed hi-hat": {
        path: "https://surikov.github.io/webaudiofontdata/sound/12842_0_FluidR3_GM_sf2_file.js",
        name: "_drum_42_0_FluidR3_GM_sf2_file"
    },
    "open hi-hat": {
        path: "https://surikov.github.io/webaudiofontdata/sound/12846_0_FluidR3_GM_sf2_file.js",
        name: "_drum_46_0_FluidR3_GM_sf2_file"
    },
    "mid tom": {
        path: "https://surikov.github.io/webaudiofontdata/sound/12847_21_FluidR3_GM_sf2_file.js",
        name: "_drum_47_21_FluidR3_GM_sf2_file"
    },
    "high tom": {
        path: "https://surikov.github.io/webaudiofontdata/sound/12848_21_FluidR3_GM_sf2_file.js",
        name: "_drum_48_21_FluidR3_GM_sf2_file"
    },
    "crash cymbal": {
        path: "https://surikov.github.io/webaudiofontdata/sound/12849_21_FluidR3_GM_sf2_file.js",
        name: "_drum_49_21_FluidR3_GM_sf2_file"
    },
}

// load all instruments
let instrumentNames = Object.keys(window.parent.instrumentData);
window.parent.currentInstrumentName = "piano";

// initialize volumes
window.parent.instrumentVolumes = {}
window.parent.globalInstrumentVolume = 0.5;

// tones
class Tone {
  constructor(id) {
    this.id = id;
    this.on = false;

    const thisPlayer = new Object;
    thisPlayer.context = new AudioContext();
    thisPlayer.oscillator = thisPlayer.context.createOscillator();
    thisPlayer.gainobj = thisPlayer.context.createGain();
    thisPlayer.oscillator.frequency.value = 100;
    thisPlayer.gainobj.gain.value = 1;
    thisPlayer.oscillator.connect(thisPlayer.gainobj);
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
window.Tone = Tone;
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

function hasNumber(myString) {
  return /\d/.test(myString);
}
window.hasNumber = hasNumber;

function deep_copy(array) {
  return JSON.parse(JSON.stringify(array));
}
window.deep_copy = deep_copy;

// play dummy sound to initialize

setTimeout(() => {
  console.log("playing initialization sound")
  for (let i = 0; i < instrumentNames.length; i++) {
    let instrumentName = instrumentNames[i];
    if (instrumentName === "shakuhachi") return;
    window.playNote("C4", 1, instrumentName, 0);
  }
}, 1000 * 3);

// set loaded to true

setTimeout(() => {
  console.log("TuneScope Loaded")
  window.parent.loadedTuneScope = true;
}, 1000 * 4)
