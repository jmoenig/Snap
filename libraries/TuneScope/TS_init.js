// play note function
var AudioContextFunc = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContextFunc();

class TuneScope {
    playNote = function (note, noteLength, instrumentName, volume) {
        this.currentNote = note
        if (note == "R" || note == "r") return;

        note = this.noteNum(note)
        noteLength = this.noteLengthToTimeValue(noteLength)

        // note = _convertToSharp(note);

        var player = new WebAudioFontPlayer();
        instrumentName = instrumentName || this.currentInstrumentName;
        instrumentName = instrumentName.toLowerCase()
        // console.log(instrumentName);
        let currentInstrumentData = this.instrumentData[instrumentName]
        player.loader.decodeAfterLoading(audioContext, currentInstrumentData.name);
window._currentNote = ""
window._parsed = ""
window._isParsed = false
window.parent._ts_pausePlayback = false;

const _ide = world.children[0];
const original_stop = _ide.stopAllScripts.bind(_ide);
_ide.stopAllScripts = function() {
  original_stop();
  window.parent._ts_pausePlayback = true;
}

        play = () => {
            const vol = volume || this.instrumentVolumes[instrumentName] || this.globalInstrumentVolume;
            // console.log(note, noteLength, instrumentName, vol)
            player.queueWaveTable(audioContext, audioContext.destination, window[currentInstrumentData.name], 0, this.noteNum(note), noteLength, vol);
            return false;
        }
        play();
    }

    _playNote = (note, noteLength, instrumentName, volume) => {
        window._currentNote = note
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

    timeSignatureToBeatsPerMeasure = function (time) {
        timeSig = time.split('/')
        // newTime = (timeSig[0]*4)/timeSig[1]
        newTime = [parseInt(timeSig[0]), 4 / timeSig[1]]
        console.log(newTime)
        return newTime
    }

    baseTempo = 60;

    // converts note lengths (quarter, half, whole)
    // to corresponding time value (1, 2, 4)
    noteLengthToTimeValue = function (duration) {
        if (parseFloat(duration) != duration) {
            splitDuration = duration.split(' ');

            let notes = {
                'whole': 4,
                'half': 2,
                'quarter': 1,
                'eighth': 0.5,
                'sixteenth': 0.25,
                'thirtysecond': 0.125
            };

            var dots = 0;

            function dotted(duration) {
                dots += 1;
                return duration + (start * Math.pow(0.5, dots));
            };

            modifiers = {
                'dotted': dotted,
                'tie': (d) => {
                    return d * 2;
                },
                'triplet': (d) => {
                    return (((d > 0) ? d : 1) * 2) / 3;
                }
            }

            for (let i = 0; i < splitDuration.length; i++) {
                splitDuration[i] = splitDuration[i].toLowerCase();
            }

            var noteDur = notes[splitDuration.find(e => notes[e] != undefined)]
            start = noteDur;

            console.log(splitDuration);
            for (let keyword = 0; keyword < splitDuration.length; keyword++) {
                console.log(keyword, splitDuration[keyword]);
                console.log(noteDur);
                if (modifiers[splitDuration[keyword]] != undefined) {
                    noteDur = modifiers[splitDuration[keyword]](noteDur);
                }
            }
            return noteDur;
        } else {
            return parseFloat(duration);
        }
    }

    noteNum = function (noteName) {
        if (Array.isArray(noteName)) {
            return noteName.map((e) => {
                return noteNum(e);
            })
        }

        if (typeof noteName == 'string' && isNaN(noteName)) {
            function range(start, end) {
                if (end == undefined) {
                    end = start;
                    start = 0;
                }

                if (start > end) {
                    return Array.from(new Array(start - end + 1), (x, i) => i + end).reverse()
                } else if (start == end) {
                    return [start];
                } else {
                    return Array.from(new Array(end - start + 1), (x, i) => i + start);
                }
            }

            function letter(string, list) {
                var result = [];
                if (typeof list == 'object') {
                    for (let i = 0; i < list.length; i++) {
                        result.push(string[list[i]]);
                    }
                } else {
                    result = string[list];
                }
                return result;
            }

            splitNoteName = noteName.split('')
            var index = splitNoteName.indexOf(splitNoteName.find(e => !isNaN(e) || e == '-'))
            var octiveNum = ((index > 0) ? letter(noteName, range(index, noteName.length)) : ['4']).join('')
            console.log(octiveNum)
            var octive = parseFloat((!isNaN(octiveNum) ? octiveNum : 4))
            let notes = {
                'c': 1,
                'd': 3,
                'e': 5,
                'f': 6,
                'g': 8,
                'a': 10,
                'b': 12
            };
            var note = notes[letter(noteName, 0).toLowerCase()];

            var accidentals = letter(noteName, range(0, (index > 0) ? index - 1 : noteName.length));

            for (i = 0; i < accidentals.length; i++) {
                item = accidentals[i];

                if (item == undefined) {
                    continue;
                }

                if (item == '#' || item == 's') {
                    note += 1;
                } else if (item == '♭' || item == 'b') {
                    note -= 1;
                }
            }

            return ((note + ((13 * (octive + 1)) - octive)) - 2);
        } else {
            return parseFloat(noteName);
        }
    }

    // instrument data
    instrumentData = {
        "accordion": {
            path: "libraries/TuneScope/0230_Aspirin_sf2_file.js",
            name: "_tone_0230_Aspirin_sf2_file"
        },
        "bass, acoustic": {
            path: "libraries/TuneScope/0320_GeneralUserGS_sf2_file.js",
            name: "_tone_0320_GeneralUserGS_sf2_file"
        },
        "bass, electric (finger)": {
            path: "libraries/TuneScope/0350_JCLive_sf2_file.js",
            name: "_tone_0350_JCLive_sf2_file"
        },
        "guitar, acoustic": {
            path: "libraries/TuneScope/0241_JCLive_sf2_file.js",
            name: "_tone_0241_JCLive_sf2_file"
        },
        "guitar, electric": {
            path: "libraries/TuneScope/0260_JCLive_sf2_file.js",
            name: "_tone_0260_JCLive_sf2_file"
        },
        "guitar, overdrive": {
            path: "libraries/TuneScope/0291_LesPaul_sf2_file.js",
            name: "_tone_0291_LesPaul_sf2_file"
        },
        "piano": {
            path: "libraries/TuneScope/0020_JCLive_sf2_file.js",
            name: "_tone_0020_JCLive_sf2_file"
        },
        "organ": {
            path: "libraries/TuneScope/0180_Chaos_sf2_file.js",
            name: "_tone_0180_Chaos_sf2_file"
        },
        "banjo": {
            path: "libraries/TuneScope/1050_FluidR3_GM_sf2_file.js",
            name: "_tone_1050_FluidR3_GM_sf2_file"
        },
        "saxophone": {
            path: "libraries/TuneScope/0650_FluidR3_GM_sf2_file.js",
            name: "_tone_0650_FluidR3_GM_sf2_file"
        },
        "shakuhachi": {
            path: "libraries/TuneScope/0770_SBLive_sf2.js",
            name: "_tone_0770_SBLive_sf2"
        },
        "sitar": {
            path: "libraries/TuneScope/1040_Aspirin_sf2_file.js",
            name: "_tone_1040_Aspirin_sf2_file"
        },
        "bassoon": {
            path: "libraries/TuneScope/0700_FluidR3_GM_sf2_file.js",
            name: "_tone_0700_FluidR3_GM_sf2_file"
        },
        "bass": {
            path: "libraries/TuneScope/0350_JCLive_sf2_file.js",
            name: "_tone_0350_JCLive_sf2_file"
        },
        "violin": {
            path: "libraries/TuneScope/0400_JCLive_sf2_file.js",
            name: "_tone_0400_JCLive_sf2_file"
        },
        "cello": {
            path: "libraries/TuneScope/0420_JCLive_sf2_file.js",
            name: "_tone_0420_JCLive_sf2_file"
        },
        "clarinet": {
            path: "libraries/TuneScope/0710_Chaos_sf2_file.js",
            name: "_tone_0710_Chaos_sf2_file"
        },
        "flute": {
            path: "libraries/TuneScope/0730_JCLive_sf2_file.js",
            name: "_tone_0730_JCLive_sf2_file"
        },
        "french horn": {
            path: "libraries/TuneScope/0600_GeneralUserGS_sf2_file.js",
            name: "_tone_0600_GeneralUserGS_sf2_file"
        },
        "harp": {
            path: "libraries/TuneScope/0460_GeneralUserGS_sf2_file.js",
            name: "_tone_0460_GeneralUserGS_sf2_file"
        },
        "koto": {
            path: "libraries/TuneScope/1070_FluidR3_GM_sf2_file.js",
            name: "_tone_1070_FluidR3_GM_sf2_file"
        },
        "marimba": {
            path: "libraries/TuneScope/0121_FluidR3_GM_sf2_file.js",
            name: "_tone_0121_FluidR3_GM_sf2_file"
        },
        "music box": {
            path: "libraries/TuneScope/0100_SBLive_sf2.js",
            name: "_tone_0100_SBLive_sf2"
        },
        "oboe": {
            path: "libraries/TuneScope/0680_JCLive_sf2_file.js",
            name: "_tone_0680_JCLive_sf2_file"
        },
        "trumpet": {
            path: "libraries/TuneScope/0560_GeneralUserGS_sf2_file.js",
            name: "_tone_0560_GeneralUserGS_sf2_file"
        },
        "tuba": {
            path: "libraries/TuneScope/0580_GeneralUserGS_sf2_file.js",
            name: "_tone_0580_GeneralUserGS_sf2_file"
        },
        "vibraphone": {
            path: "libraries/TuneScope/0110_GeneralUserGS_sf2_file.js",
            name: "_tone_0110_GeneralUserGS_sf2_file"
        },
    
        // drums
    
        "cabasa": {
            path: "libraries/TuneScope/12869_6_JCLive_sf2_file.js",
            name: "_drum_69_6_JCLive_sf2_file"
        },
        "snare drum": {
            path: "libraries/TuneScope/12840_6_JCLive_sf2_file.js",
            name: "_drum_40_6_JCLive_sf2_file"
        },
        "bass drum": {
            path: "libraries/TuneScope/12835_21_FluidR3_GM_sf2_file.js",
            name: "_drum_35_21_FluidR3_GM_sf2_file"
        },
        "closed hi-hat": {
            path: "libraries/TuneScope/12842_0_FluidR3_GM_sf2_file.js",
            name: "_drum_42_0_FluidR3_GM_sf2_file"
        },
        "open hi-hat": {
            path: "libraries/TuneScope/12846_0_FluidR3_GM_sf2_file.js",
            name: "_drum_46_0_FluidR3_GM_sf2_file"
        },
        "mid tom": {
            path: "libraries/TuneScope/12847_21_FluidR3_GM_sf2_file.js",
            name: "_drum_47_21_FluidR3_GM_sf2_file"
        },
        "high tom": {
            path: "libraries/TuneScope/12848_21_FluidR3_GM_sf2_file.js",
            name: "_drum_48_21_FluidR3_GM_sf2_file"
        },
        "crash cymbal": {
            path: "libraries/TuneScope/12849_21_FluidR3_GM_sf2_file.js",
            name: "_drum_49_21_FluidR3_GM_sf2_file"
        },
    }

    // load all instruments
    instrumentNames = Object.keys(TuneScope.instrumentData);
    currentInstrumentName = "piano";

    // initialize volumes
    instrumentVolumes = {}
    globalInstrumentVolume = 0.5;
}

// tones
class Tone {
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

    Tone = Tone;
    tones = {};
}

/* Auxillary Functions */
// repeats an array n times
// similar to [1,2,3] * 2 = [1,2,3,1,2,3] in Python
window.multiplyArray = (arr, length) =>
    Array.from({
        length
    }, () => arr).flat()


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
class Queue {
    constructor() {

        // initialise the queue and offset
        var queue = [];
        var offset = 0;

        // Returns the length of the queue.
        this.getLength = function () {
            return (queue.length - offset);
        };

        // Returns true if the queue is empty, and false otherwise.
        this.isEmpty = function () {
            return (queue.length === 0);
        };

        /* Enqueues the specified item. The parameter is:
         *
         * item - the item to enqueue
         */
        this.enqueue = function (item) {
            queue.push(item);
        };

        /* Dequeues an item and returns it. If the queue is empty, the value
         * 'undefined' is returned.
         */
        this.dequeue = function () {

            // if the queue is empty, return immediately
            if (queue.length === 0)
                return undefined;

            // store the item at the front of the queue
            var item = queue[offset];

            // increment the offset and remove the free space if necessary
            if (++offset * 2 >= queue.length) {
                queue = queue.slice(offset);
                offset = 0;
            }

            // return the dequeued item
            return item;

        };

        /* Returns the item at the front of the queue (without dequeuing it). If the
         * queue is empty then undefined is returned.
         */
        this.peek = function () {
            return (queue.length > 0 ? queue[offset] : undefined);
        };

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
        } else { //case with note values, which contain numbers
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

function _typeOf(value) {
    return Object.prototype.toString.call(value).slice(8, -1);
}

const _isObject = (obj) => {
  return (typeof obj === "object" || _typeOf(obj) === "Array") && obj !== null;
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

function isNumber(myString) {
  return /^\d+\.\d+$/.test(myString);
}
window.isNumber = isNumber;

function hasNumber(myString) {
    return /\d/.test(myString);
}
window.hasNumber = hasNumber;

function deep_copy(array) {
    return JSON.parse(JSON.stringify(array));
}
window.deep_copy = deep_copy;

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

        input.click();
    });
}
window._selectFile = _selectFile;

// play dummy sound to initialize

setTimeout(() => {
    console.log("playing initialization sound")
    for (let i = 0; i < TuneScope.instrumentNames.length; i++) {
        let instrumentName = TuneScope.instrumentNames[i];
        if (instrumentName === "shakuhachi") return;
        TuneScope.playNote("C4", 1, instrumentName, 0);
    }
}, 1000 * 3);

// set loaded to true

setTimeout(() => {
    console.log("TuneScope Loaded")
    TuneScope.loadedTuneScope = true;
}, 1000 * 4)
