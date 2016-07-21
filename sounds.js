// Global stuff ////////////////////////////////////////////////////////

var SnapAudioContext;
var Sound;
var SoundPlayer;
var SoundBank;
var SnapSoundBank;
var Note;
var Microphone;

function getAudioContext () {
    var AudioContext = window.AudioContext || window.webkitAudioContext,
        ctx, fixOnClick;

    if (!AudioContext) {
        throw new Error('Web Audio API is not supported\nin this browser');
    }
    if (!AudioContext.prototype.hasOwnProperty('createGain')) {
        AudioContext.prototype.createGain = AudioContext.prototype.createGainNode;
    }

    var ctx = new AudioContext();
    if (ctx.state === 'suspended') {
        // On Safari, the context is suspended unless triggered by user interaction
        fixOnClick = function () {
            window.removeEventListener('click', fixOnClick, false);
            ctx.resume();
        };
        window.addEventListener('click', fixOnClick, false);
    }
    return ctx;
}

SnapAudioContext = getAudioContext();

function pitchForKey (key) {
    key = Math.max(0, Math.min(key, 127));
    return Math.pow(2, (key - 69) / 12) * 440;
}

// Sound ///////////////////////////////////////////////////////////////

// Sound instance creation

function Sound(url, name, buffer) {
    var request,
        myself = this;

    this.url = url; // mandatory
    this.name = name || "Sound";
    this.version = Date.now();

    if (buffer) {
        this.buffer = buffer;
        this.loaded = true;
    } else {
        request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';
        request.onload = function () {
            SnapAudioContext.decodeAudioData(
                request.response,
                function (buffer) {
                    myself.buffer = buffer;
                    myself.loaded = true;
                    myself.version = Date.now();
                },
                function (error) {
                    throw error;
                }
            );
        };
        request.send();
    }
}

Sound.prototype.play = function (destination) {
    // return an instance of a sound player which can be terminated
    // externally (i.e. by the stage)
    var player = new SoundPlayer(this.buffer, destination);
    player.play();
    return player;
};

Sound.prototype.copy = function () {
    return new Sound(
        this.url,
        this.name ? copy(this.name) : null,
        this.buffer
    );
};

Sound.prototype.toDataURL = function () {
    return this.url;
};

// SoundPlayer /////////////////////////////////////////////////////////

function SoundPlayer(buffer, destination) {
    this.buffer = buffer;
    this.destination = destination;
    this.source = null;

    this.startTime = 0;
    this.pauseTime = 0;

    this.ended = false;
    this.terminated = false;
    this.onended = null;
}

SoundPlayer.prototype.play = function () {
    var myself = this;

    this.source = SnapAudioContext.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.connect(this.destination);
    this.source.onended = function () {
        if (typeof myself.onended === 'function') {
            myself.onended();
        }
        myself.ended = true;
    };
    this.source.start(0, this.pauseTime);

    this.startTime = SnapAudioContext.currentTime;
};

SoundPlayer.prototype.pause = function () {
    if (this.source) {
        this.source.onended = null;
        this.source.stop();
    }
    this.pauseTime = SnapAudioContext.currentTime - this.startTime;
};

// SoundBank ////////////////////////////////////////////////////

// I store all instrument and drum samples.

function SoundBank() {
    this.samples = {};
    this.samplesRequested = false;
    this.samplesLoaded = false;
}

SoundBank.prototype.loadSamples = function () {
    var myself = myself = this,
        allSamplesRequested = false,
        samplesRequested = 0,
        samplesReceived = 0;

    function loadSample (dir, sampleName) {
        var request;

        if (myself.samples[sampleName] !== undefined) { return; }
        myself.samples[sampleName] = null;
        samplesRequested += 1;

        request = new XMLHttpRequest();
        request.open('GET', 'soundbank/' + dir + '/' + sampleName + '.wav', true);
        request.responseType = 'arraybuffer';
        request.onload = function () {
            SnapAudioContext.decodeAudioData(
                request.response,
                function (buffer) {
                    myself.samples[sampleName] = buffer;
                    samplesReceived += 1;
                    if (allSamplesRequested && samplesReceived === samplesRequested) {
                        myself.samplesLoaded = true;
                    }
                },
                function (error) {
                    throw error;
                }
            );
        };
        request.send();
    }

    this.samplesRequested = true;
    this.instruments.forEach(function (samples) {
        samples.forEach(function (sample) {
            loadSample('instruments', sample.name);
        });
    });
    this.drums.forEach(function (drum) {
        loadSample('drums', drum.name);
    });
    allSamplesRequested = true;
};

SoundBank.prototype.getNote = function (key, instrument, duration, destination) {
    var samples = this.instruments[instrument],
        sampleKey, sampleInfo;
    for (sampleKey in samples) {
        if (samples.hasOwnProperty(sampleKey)) {
            sampleInfo = samples[sampleKey];
            if (key <= sampleInfo.topKey) { break; }
        }
    }
    return new Note(key, sampleInfo, duration, destination);
};

SoundBank.prototype.getDrum = function (number, duration, destination) {
    var drumInfo = this.drums[number];
    return new Note(60 + drumInfo.pitchAdjust, drumInfo, duration, destination);
};

SoundBank.prototype.instruments = [
    [
        {
            topKey: 38,
            name: 'AcousticPiano_As3',
            key: 58,
            looped: true,
            loopStart: 10266,
            loopEnd: 17053,
            envelope: [0, 100, 22]
        },
        {
            topKey: 44,
            name: 'AcousticPiano_C4',
            key: 60,
            looped: true,
            loopStart: 13968,
            loopEnd: 18975,
            envelope: [0, 100, 20]
        },
        {
            topKey: 51,
            name: 'AcousticPiano_G4',
            key: 67,
            looped: true,
            loopStart: 12200,
            loopEnd: 12370,
            envelope: [0, 80, 18]
        },
        {
            topKey: 62,
            name: 'AcousticPiano_C6',
            key: 84,
            looped: true,
            loopStart: 13042,
            loopEnd: 13276,
            envelope: [0, 80, 16]
        },
        {
            topKey: 70,
            name: 'AcousticPiano_F5',
            key: 77,
            looped: true,
            loopStart: 12425,
            loopEnd: 12965,
            envelope: [0, 40, 14]
        },
        {
            topKey: 77,
            name: 'AcousticPiano_Ds6',
            key: 87,
            looped: true,
            loopStart: 12368,
            loopEnd: 12869,
            envelope: [0, 20, 10]
        },
        {
            topKey: 85,
            name: 'AcousticPiano_Ds6',
            key: 87,
            looped: true,
            loopStart: 12368,
            loopEnd: 12869,
            envelope: [0, 0, 8]
        },
        {
            topKey: 90,
            name: 'AcousticPiano_Ds6',
            key: 87,
            looped: true,
            loopStart: 12368,
            loopEnd: 12869,
            envelope: [0, 0, 6]
        },
        {
            topKey: 96,
            name: 'AcousticPiano_D7',
            key: 98,
            looped: true,
            loopStart: 7454,
            loopEnd: 7606,
            envelope: [0, 0, 3]
        },
        {
            topKey: 128,
            name: 'AcousticPiano_D7',
            key: 98,
            looped: true,
            loopStart: 7454,
            loopEnd: 7606,
            envelope: [0, 0, 2]
        }
    ],
    [
        {
            topKey: 48,
            name: 'ElectricPiano_C2',
            key: 36,
            looped: true,
            loopStart: 15338,
            loopEnd: 17360,
            envelope: [0, 80, 10]
        },
        {
            topKey: 74,
            name: 'ElectricPiano_C4',
            key: 60,
            looped: true,
            loopStart: 11426,
            loopEnd: 12016,
            envelope: [0, 40, 8]
        },
        {
            topKey: 128,
            name: 'ElectricPiano_C4',
            key: 60,
            looped: true,
            loopStart: 11426,
            loopEnd: 12016,
            envelope: [0, 0, 6]
        }
    ],
    [
        {
            topKey: 128,
            name: 'Organ_G2',
            key: 43,
            looped: true,
            loopStart: 1306,
            loopEnd: 3330,
            envelope: null
        }
    ],
    [
        {
            topKey: 40,
            name: 'AcousticGuitar_F3',
            key: 53,
            looped: true,
            loopStart: 36665,
            loopEnd: 36791,
            envelope: [0, 0, 15]
        },
        {
            topKey: 56,
            name: 'AcousticGuitar_F3',
            key: 53,
            looped: true,
            loopStart: 36665,
            loopEnd: 36791,
            envelope: [0, 0, 13.5]
        },
        {
            topKey: 60,
            name: 'AcousticGuitar_F3',
            key: 53,
            looped: true,
            loopStart: 36665,
            loopEnd: 36791,
            envelope: [0, 0, 12]
        },
        {
            topKey: 67,
            name: 'AcousticGuitar_F3',
            key: 53,
            looped: true,
            loopStart: 36665,
            loopEnd: 36791,
            envelope: [0, 0, 8.5]
        },
        {
            topKey: 72,
            name: 'AcousticGuitar_F3',
            key: 53,
            looped: true,
            loopStart: 36665,
            loopEnd: 36791,
            envelope: [0, 0, 7]
        },
        {
            topKey: 83,
            name: 'AcousticGuitar_F3',
            key: 53,
            looped: true,
            loopStart: 36665,
            loopEnd: 36791,
            envelope: [0, 0, 5.5]
        },
        {
            topKey: 128,
            name: 'AcousticGuitar_F3',
            key: 53,
            looped: true,
            loopStart: 36665,
            loopEnd: 36791,
            envelope: [0, 0, 4.5]
        }
    ],
    [
        {
            topKey: 40,
            name: 'ElectricGuitar_F3',
            key: 53,
            looped: true,
            loopStart: 34692,
            loopEnd: 34945,
            envelope: [0, 0, 15]
        },
        {
            topKey: 56,
            name: 'ElectricGuitar_F3',
            key: 53,
            looped: true,
            loopStart: 34692,
            loopEnd: 34945,
            envelope: [0, 0, 13.5]
        },
        {
            topKey: 60,
            name: 'ElectricGuitar_F3',
            key: 53,
            looped: true,
            loopStart: 34692,
            loopEnd: 34945,
            envelope: [0, 0, 12]
        },
        {
            topKey: 67,
            name: 'ElectricGuitar_F3',
            key: 53,
            looped: true,
            loopStart: 34692,
            loopEnd: 34945,
            envelope: [0, 0, 8.5]
        },
        {
            topKey: 72,
            name: 'ElectricGuitar_F3',
            key: 53,
            looped: true,
            loopStart: 34692,
            loopEnd: 34945,
            envelope: [0, 0, 7]
        },
        {
            topKey: 83,
            name: 'ElectricGuitar_F3',
            key: 53,
            looped: true,
            loopStart: 34692,
            loopEnd: 34945,
            envelope: [0, 0, 5.5]
        },
        {
            topKey: 128,
            name: 'ElectricGuitar_F3',
            key: 53,
            looped: true,
            loopStart: 34692,
            loopEnd: 34945,
            envelope: [0, 0, 4.5]
        }
    ],
    [
        {
            topKey: 34,
            name: 'ElectricBass_G1',
            key: 31,
            looped: true,
            loopStart: 41912,
            loopEnd: 42363,
            envelope: [0, 0, 17]
        },
        {
            topKey: 48,
            name: 'ElectricBass_G1',
            key: 31,
            looped: true,
            loopStart: 41912,
            loopEnd: 42363,
            envelope: [0, 0, 14]
        },
        {
            topKey: 64,
            name: 'ElectricBass_G1',
            key: 31,
            looped: true,
            loopStart: 41912,
            loopEnd: 42363,
            envelope: [0, 0, 12]
        },
        {
            topKey: 128,
            name: 'ElectricBass_G1',
            key: 31,
            looped: true,
            loopStart: 41912,
            loopEnd: 42363,
            envelope: [0, 0, 10]
        }
    ],
    [
        {
            topKey: 38,
            name: 'Pizz_G2',
            key: 43,
            looped: true,
            loopStart: 8554,
            loopEnd: 8782,
            envelope: [0, 0, 5]
        },
        {
            topKey: 45,
            name: 'Pizz_G2',
            key: 43,
            looped: true,
            loopStart: 8554,
            loopEnd: 8782,
            envelope: [0, 12, 4]
        },
        {
            topKey: 56,
            name: 'Pizz_A3',
            key: 57,
            looped: true,
            loopStart: 11460,
            loopEnd: 11659,
            envelope: [0, 0, 4]
        },
        {
            topKey: 64,
            name: 'Pizz_A3',
            key: 57,
            looped: true,
            loopStart: 11460,
            loopEnd: 11659,
            envelope: [0, 0, 3.2]
        },
        {
            topKey: 72,
            name: 'Pizz_E4',
            key: 64,
            looped: true,
            loopStart: 17525,
            loopEnd: 17592,
            envelope: [0, 0, 2.8]
        },
        {
            topKey: 80,
            name: 'Pizz_E4',
            key: 64,
            looped: true,
            loopStart: 17525,
            loopEnd: 17592,
            envelope: [0, 0, 2.2]
        },
        {
            topKey: 128,
            name: 'Pizz_E4',
            key: 64,
            looped: true,
            loopStart: 17525,
            loopEnd: 17592,
            envelope: [0, 0, 1.5]
        }
    ],
    [
        {
            topKey: 41,
            name: 'Cello_C2',
            key: 36,
            looped: true,
            loopStart: 8548,
            loopEnd: 8885,
            envelope: null
        },
        {
            topKey: 52,
            name: 'Cello_As2',
            key: 46,
            looped: true,
            loopStart: 7465,
            loopEnd: 7845,
            envelope: null
        },
        {
            topKey: 62,
            name: 'Violin_D4',
            key: 62,
            looped: true,
            loopStart: 10608,
            loopEnd: 11360,
            envelope: null
        },
        {
            topKey: 75,
            name: 'Violin_A4',
            key: 69,
            looped: true,
            loopStart: 3111,
            loopEnd: 3314,
            envelope: [70, 0, 0]
        },
        {
            topKey: 128,
            name: 'Violin_E5',
            key: 76,
            looped: true,
            loopStart: 2383,
            loopEnd: 2484,
            envelope: null
        }
    ],
    [
        {
            topKey: 30,
            name: 'BassTrombone_A2_3',
            key: 45,
            looped: true,
            loopStart: 1357,
            loopEnd: 2360,
            envelope: null
        },
        {
            topKey: 40,
            name: 'BassTrombone_A2_2',
            key: 45,
            looped: true,
            loopStart: 1893,
            loopEnd: 2896,
            envelope: null
        },
        {
            topKey: 55,
            name: 'Trombone_B3',
            key: 59,
            looped: true,
            loopStart: 2646,
            loopEnd: 3897,
            envelope: null
        },
        {
            topKey: 88,
            name: 'Trombone_B3',
            key: 59,
            looped: true,
            loopStart: 2646,
            loopEnd: 3897,
            envelope: [50, 0, 0]
        },
        {
            topKey: 128,
            name: 'Trumpet_E5',
            key: 76,
            looped: true,
            loopStart: 2884,
            loopEnd: 3152,
            envelope: null
        }
    ],
    [
        {
            topKey: 128,
            name: 'Clarinet_C4',
            key: 60,
            looped: true,
            loopStart: 14540,
            loopEnd: 15468,
            envelope: null
        }
    ],
    [
        {
            topKey: 40,
            name: 'TenorSax_C3',
            key: 48,
            looped: true,
            loopStart: 8939,
            loopEnd: 10794,
            envelope: null
        },
        {
            topKey: 50,
            name: 'TenorSax_C3',
            key: 48,
            looped: true,
            loopStart: 8939,
            loopEnd: 10794,
            envelope: [20, 0, 0]
        },
        {
            topKey: 59,
            name: 'TenorSax_C3',
            key: 48,
            looped: true,
            loopStart: 8939,
            loopEnd: 10794,
            envelope: [40, 0, 0]
        },
        {
            topKey: 67,
            name: 'AltoSax_A3',
            key: 57,
            looped: true,
            loopStart: 8546,
            loopEnd: 9049,
            envelope: null
        },
        {
            topKey: 75,
            name: 'AltoSax_A3',
            key: 57,
            looped: true,
            loopStart: 8546,
            loopEnd: 9049,
            envelope: [20, 0, 0]
        },
        {
            topKey: 80,
            name: 'AltoSax_A3',
            key: 57,
            looped: true,
            loopStart: 8546,
            loopEnd: 9049,
            envelope: [20, 0, 0]
        },
        {
            topKey: 128,
            name: 'AltoSax_C6',
            key: 84,
            looped: true,
            loopStart: 1258,
            loopEnd: 1848,
            envelope: null
        }
    ],
    [
        {
            topKey: 61,
            name: 'Flute_B5_2',
            key: 83,
            looped: true,
            loopStart: 1859,
            loopEnd: 2259,
            envelope: null
        },
        {
            topKey: 128,
            name: 'Flute_B5_1',
            key: 83,
            looped: true,
            loopStart: 2418,
            loopEnd: 2818,
            envelope: null
        }
    ],
    [
        {
            topKey: 128,
            name: 'WoodenFlute_C5',
            key: 72,
            looped: true,
            loopStart: 11426,
            loopEnd: 15724,
            envelope: null
        }
    ],
    [
        {
            topKey: 57,
            name: 'Bassoon_C3',
            key: 48,
            looped: true,
            loopStart: 2428,
            loopEnd: 4284,
            envelope: null
        },
        {
            topKey: 67,
            name: 'Bassoon_C3',
            key: 48,
            looped: true,
            loopStart: 2428,
            loopEnd: 4284,
            envelope: [40, 0, 0]
        },
        {
            topKey: 76,
            name: 'Bassoon_C3',
            key: 48,
            looped: true,
            loopStart: 2428,
            loopEnd: 4284,
            envelope: [80, 0, 0]
        },
        {
            topKey: 84,
            name: 'EnglishHorn_F3',
            key: 53,
            looped: true,
            loopStart: 7538,
            loopEnd: 8930,
            envelope: [40, 0, 0]
        },
        {
            topKey: 128,
            name: 'EnglishHorn_D4',
            key: 62,
            looped: true,
            loopStart: 4857,
            loopEnd: 5231,
            envelope: null
        }
    ],
    [
        {
            topKey: 39,
            name: 'Choir_F3',
            key: 53,
            looped: true,
            loopStart: 14007,
            loopEnd: 41281,
            envelope: null
        },
        {
            topKey: 50,
            name: 'Choir_F3',
            key: 53,
            looped: true,
            loopStart: 14007,
            loopEnd: 41281,
            envelope: [40, 0, 0]
        },
        {
            topKey: 61,
            name: 'Choir_F3',
            key: 53,
            looped: true,
            loopStart: 14007,
            loopEnd: 41281,
            envelope: [60, 0, 0]
        },
        {
            topKey: 72,
            name: 'Choir_F4',
            key: 65,
            looped: true,
            loopStart: 16351,
            loopEnd: 46436,
            envelope: null
        },
        {
            topKey: 128,
            name: 'Choir_F5',
            key: 77,
            looped: true,
            loopStart: 18440,
            loopEnd: 45391,
            envelope: null
        }
    ],
    [
        {
            topKey: 38,
            name: 'Vibraphone_C3',
            key: 48,
            looped: true,
            loopStart: 6202,
            loopEnd: 6370,
            envelope: [0, 100, 8]
        },
        {
            topKey: 48,
            name: 'Vibraphone_C3',
            key: 48,
            looped: true,
            loopStart: 6202,
            loopEnd: 6370,
            envelope: [0, 100, 7.5]
        },
        {
            topKey: 59,
            name: 'Vibraphone_C3',
            key: 48,
            looped: true,
            loopStart: 6202,
            loopEnd: 6370,
            envelope: [0, 60, 7]
        },
        {
            topKey: 70,
            name: 'Vibraphone_C3',
            key: 48,
            looped: true,
            loopStart: 6202,
            loopEnd: 6370,
            envelope: [0, 40, 6]
        },
        {
            topKey: 78,
            name: 'Vibraphone_C3',
            key: 48,
            looped: true,
            loopStart: 6202,
            loopEnd: 6370,
            envelope: [0, 20, 5]
        },
        {
            topKey: 86,
            name: 'Vibraphone_C3',
            key: 48,
            looped: true,
            loopStart: 6202,
            loopEnd: 6370,
            envelope: [0, 0, 4]
        },
        {
            topKey: 128,
            name: 'Vibraphone_C3',
            key: 48,
            looped: true,
            loopStart: 6202,
            loopEnd: 6370,
            envelope: [0, 0, 3]
        }
    ],
    [
        {
            topKey: 128,
            name: 'MusicBox_C4',
            key: 60,
            looped: true,
            loopStart: 14278,
            loopEnd: 14700,
            envelope: [0, 0, 2]
        }
    ],
    [
        {
            topKey: 128,
            name: 'SteelDrum_D5',
            key: 74.4,
            looped: false,
            envelope: [0, 0, 2]
        }
    ],
    [
        {
            topKey: 128,
            name: 'Marimba_C4',
            key: 60,
            looped: false,
            envelope: null
        }
    ],
    [
        {
            topKey: 80,
            name: 'SynthLead_C4',
            key: 60,
            looped: true,
            loopStart: 135,
            loopEnd: 1400,
            envelope: null
        },
        {
            topKey: 128,
            name: 'SynthLead_C6',
            key: 84,
            looped: true,
            loopStart: 124,
            loopEnd: 356,
            envelope: null
        }
    ],
    [
        {
            topKey: 38,
            name: 'SynthPad_A3',
            key: 57,
            looped: true,
            loopStart: 4212,
            loopEnd: 88017,
            envelope: [50, 0, 0]
        },
        {
            topKey: 50,
            name: 'SynthPad_A3',
            key: 57,
            looped: true,
            loopStart: 4212,
            loopEnd: 88017,
            envelope: [80, 0, 0]
        },
        {
            topKey: 62,
            name: 'SynthPad_A3',
            key: 57,
            looped: true,
            loopStart: 4212,
            loopEnd: 88017,
            envelope: [110, 0, 0]
        },
        {
            topKey: 74,
            name: 'SynthPad_A3',
            key: 57,
            looped: true,
            loopStart: 4212,
            loopEnd: 88017,
            envelope: [150, 0, 0]
        },
        {
            topKey: 86,
            name: 'SynthPad_A3',
            key: 57,
            looped: true,
            loopStart: 4212,
            loopEnd: 88017,
            envelope: [200, 0, 0]
        },
        {
            topKey: 128,
            name: 'SynthPad_C6',
            key: 84,
            looped: true,
            loopStart: 2575,
            loopEnd: 9202,
            envelope: null
        }
    ]
];

SoundBank.prototype.drums = [
    {
        name: 'SnareDrum',
        key: 60,
        pitchAdjust: 0,
        looped: false,
        envelope: null
    },
    {
        name: 'Tom',
        key: 60,
        pitchAdjust: 0,
        looped: false,
        envelope: null
    },
    {
        name: 'SideStick',
        key: 60,
        pitchAdjust: 0,
        looped: false,
        envelope: null
    },
    {
        name: 'Crash',
        key: 60,
        pitchAdjust: -7,
        looped: false,
        envelope: null
    },
    {
        name: 'HiHatOpen',
        key: 60,
        pitchAdjust: -8,
        looped: false,
        envelope: null
    },
    {
        name: 'HiHatClosed',
        key: 60,
        pitchAdjust: 0,
        looped: false,
        envelope: null
    },
    {
        name: 'Tambourine',
        key: 60,
        pitchAdjust: 0,
        looped: false,
        envelope: null
    },
    {
        name: 'Clap',
        key: 60,
        pitchAdjust: 0,
        looped: false,
        envelope: null
    },
    {
        name: 'Claves',
        key: 60,
        pitchAdjust: 0,
        looped: false,
        envelope: null
    },
    {
        name: 'WoodBlock',
        key: 60,
        pitchAdjust: -4,
        looped: false,
        envelope: null
    },
    {
        name: 'Cowbell',
        key: 60,
        pitchAdjust: 0,
        looped: false,
        envelope: null
    },
    {
        name: 'Triangle',
        key: 60,
        pitchAdjust: -6,
        looped: true,
        loopStart: 16843,
        loopEnd: 17255,
        envelope: [0, 0, 2]
    },
    {
        name: 'Bongo',
        key: 60,
        pitchAdjust: 2,
        looped: false,
        envelope: null
    },
    {
        name: 'Conga',
        key: 60,
        pitchAdjust: -7,
        looped: true,
        loopStart: 4247,
        loopEnd: 4499,
        envelope: [0, 0, 2]
    },
    {
        name: 'Cabasa',
        key: 60,
        pitchAdjust: 0,
        looped: false,
        envelope: null
    },
    {
        name: 'GuiroLong',
        key: 60,
        pitchAdjust: 0,
        looped: false,
        envelope: null
    },
    {
        name: 'Vibraslap',
        key: 60,
        pitchAdjust: -6,
        looped: false,
        envelope: null
    },
    {
        name: 'Cuica',
        key: 60,
        pitchAdjust: -5,
        looped: false,
        envelope: null
    }
];

SnapSoundBank = new SoundBank();

// Note ////////////////////////////////////////////////////////////////

// I am a single musical note

// Note instance creation

function Note(key, sampleInfo, duration, destination) {
    this.key = key === 0 ? 0 : key || 69;
    this.duration = duration;
    this.sampleInfo = sampleInfo;
    this.destination = destination;
    this.source = null;
    this.gainNode = null;

    this.startTime = 0;
    this.pauseTime = 0;
    this.lastGain = 0;

    this.ended = false;
    this.terminated = false;
}

// Note playing

Note.prototype.play = function () {
    var originalPitch, loopStart, loopEnd, loopLength,
        attackEnd, holdEnd, delayEnd, duration, gain, time,
        sampleRate, duration, end, noteOver,
        myself = this;

    if (this.ended || this.terminated) {
        return null;
    }

    sampleRate = 22050;
    duration = this.duration - this.pauseTime;
    end = duration + 500 / sampleRate;

    this.source = SnapAudioContext.createBufferSource();
    this.source.buffer = SnapSoundBank.samples[this.sampleInfo.name];

    originalPitch = pitchForKey(this.sampleInfo.key);
    loopStart = this.sampleInfo.loopStart / sampleRate;
    loopEnd = this.sampleInfo.loopEnd / sampleRate;
    loopLength = loopEnd - loopStart;

    if (this.sampleInfo.looped) {
        this.source.loop = true;
        this.source.loopStart = loopStart;
        this.source.loopEnd = loopEnd;

        // Calculate more accurate original pitch
        var cycles = Math.round(originalPitch * loopLength);
        originalPitch = cycles / loopLength;
    }

    this.source.playbackRate.value = pitchForKey(this.key) / originalPitch;
    this.gainNode = SnapAudioContext.createGain();
    time = SnapAudioContext.currentTime;

    if (this.sampleInfo.envelope) {
        attackEnd = this.sampleInfo.envelope[0] / 1000 - this.pauseTime;
        holdEnd = attackEnd + this.sampleInfo.envelope[1] / 1000;
        decayEnd = holdEnd + this.sampleInfo.envelope[2];
        gain = this.gainNode.gain;
        noteOver = false;

        gain.setValueAtTime(this.lastGain, time);
        if (attackEnd > this.pauseTime) {
            if (attackEnd < duration) {
                gain.linearRampToValueAtTime(1, time + attackEnd);
            } else {
                gain.linearRampToValueAtTime(
                    duration / attackEnd,
                    time + duration
                );
                noteOver = true;
            }
        } else {
            gain.setValueAtTime(1, time);
        }
        if (holdEnd > attackEnd && holdEnd > 0 && !noteOver) {
            if (holdEnd < duration) {
                gain.linearRampToValueAtTime(1, time + holdEnd);
            } else {
                gain.linearRampToValueAtTime(1, time + duration);
                noteOver = true;
            }
        }
        if (decayEnd > holdEnd && holdEnd > 0 && !noteOver) {
            if (decayEnd < duration) {
                gain.linearRampToValueAtTime(0, time + decayEnd);
            } else {
                gain.linearRampToValueAtTime(
                    1 - (duration - holdEnd) / (decayEnd - holdEnd),
                    time + duration
                );
            }
        }
        // Reduce volume to 0 after duration to avoid popping
        gain.linearRampToValueAtTime(0, time + end);
    }

    this.source.connect(this.gainNode);
    this.gainNode.connect(this.destination);
    this.source.onended = function () {
        myself.ended = true;
    };
    this.source.start(0, this.pauseTime);
    this.source.stop(time + end); // Note will stop itself unless interrupted
    this.startTime = time;
};

Note.prototype.pause = function () {
    if (this.source) {
        this.source.onended = null;
        this.source.stop();
    }
    this.pauseTime = SnapAudioContext.currentTime - this.startTime;
};

Note.prototype.stop = function () {
    if (this.source) {
        this.source.onended = null;
        this.source.stop();
    }
    this.terminated = true;
};

// Microphone //////////////////////////////////////////////////////////

function Microphone () {
    var myself = this;

    this.mediaStream = null;
    this.source = null;
    this.scriptProcessor = null;
    this.analyser = null;

    this.error = null;

    // Request permission to access the user's microphone
    navigator.getUserMedia = navigator.getUserMedia
                          || navigator.webkitGetUserMedia
                          || navigator.mozGetUserMedia;
    if (!navigator.getUserMedia) {
        this.error = new Error('getUserMedia is not supported in this browser');
        return;
    }
    navigator.getUserMedia(
        {audio: true},
        function (mediaStream) {
            myself.gotUserMedia(mediaStream);
        },
        function (error) {
            myself.error = error;
        }
    );
}

Microphone.prototype.gotUserMedia = function (mediaStream) {
    var myself = this;

    this.mediaStream = mediaStream;
    this.source = SnapAudioContext.createMediaStreamSource(mediaStream);

    this.analyser = SnapAudioContext.createAnalyser();
    this.analyser.fftSize = 256;
    this.analyser.smoothingTimeConstant = 0;
    this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);

    this.source.connect(this.analyser);
};

Microphone.prototype.getLoudness = function () {
    var max, length, total, mean;

    if (!this.analyser) {
        return 0;
    }

    this.analyser.getByteFrequencyData(this.frequencyData);

    length = this.frequencyData.length;
    total = 0;
    for (i = 0; i < length; i++) {
        total += this.frequencyData[i];
    }
    mean = total / length;

    return Math.round(mean * 100 / 255);
};
