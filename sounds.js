// Global stuff ////////////////////////////////////////////////////////

var Sound;
var Note;

// Sound ///////////////////////////////////////////////////////////////

// Sound instance creation

function Sound(audio, name) {
    this.audio = audio; // mandatory
    this.name = name || "Sound";
}

Sound.prototype.play = function () {
    // return an instance of an audio element which can be terminated
    // externally (i.e. by the stage)
    var aud = document.createElement('audio');
    aud.src = this.audio.src;
    aud.play();
    return aud;
};

Sound.prototype.copy = function () {
    var snd = document.createElement('audio'),
        cpy;

    snd.src = this.audio.src;
    cpy = new Sound(snd, this.name ? copy(this.name) : null);
    return cpy;
};

Sound.prototype.toDataURL = function () {
    return this.audio.src;
};

// Note ////////////////////////////////////////////////////////////////

// I am a single musical note

// Note instance creation

function Note(pitch) {
    this.pitch = pitch === 0 ? 0 : pitch || 69;
    this.setupContext();
    this.oscillator = null;
}

// Note shared properties

Note.prototype.audioContext = null;
Note.prototype.gainNode = null;

// Note audio context

Note.prototype.setupContext = function () {
    if (this.audioContext) { return; }
    var AudioContext = (function () {
        // cross browser some day?
        var ctx = window.AudioContext ||
            window.mozAudioContext ||
            window.msAudioContext ||
            window.oAudioContext ||
            window.webkitAudioContext;
        if (!ctx.prototype.hasOwnProperty('createGain')) {
            ctx.prototype.createGain = ctx.prototype.createGainNode;
        }
        return ctx;
    }());
    if (!AudioContext) {
        throw new Error('Web Audio API is not supported\nin this browser');
    }
    Note.prototype.audioContext = new AudioContext();
    Note.prototype.gainNode = Note.prototype.audioContext.createGain();
    Note.prototype.gainNode.gain.value = 0.25; // reduce volume by 1/4
};

// Note playing

Note.prototype.play = function () {
    this.oscillator = this.audioContext.createOscillator();
    if (!this.oscillator.start) {
        this.oscillator.start = this.oscillator.noteOn;
    }
    if (!this.oscillator.stop) {
        this.oscillator.stop = this.oscillator.noteOff;
    }
    this.oscillator.type = 'sine';
    this.oscillator.frequency.value =
        Math.pow(2, (this.pitch - 69) / 12) * 440;
    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(this.audioContext.destination);
    this.oscillator.start(0);
};

Note.prototype.stop = function () {
    if (this.oscillator) {
        this.oscillator.stop(0);
        this.oscillator = null;
    }
};
