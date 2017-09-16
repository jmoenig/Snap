// Note /////////////////////////////////////////////////////////

// I am a single musical note

// Note instance creation

export default class Note {
    constructor(pitch) {
        this.pitch = pitch === 0 ? 0 : pitch || 69;
        this.setupContext();
        this.oscillator = null;
    }

    // Note audio context

    setupContext() {
        if (this.audioContext) { return; }
        const AudioContext = ((() => {
            // cross browser some day?
            const ctx = window.AudioContext ||
                window.mozAudioContext ||
                window.msAudioContext ||
                window.oAudioContext ||
                window.webkitAudioContext;
            if (!ctx.prototype.createGain) {
                ctx.prototype.createGain = ctx.prototype.createGainNode;
            }
            return ctx;
        })());
        if (!AudioContext) {
            throw new Error('Web Audio API is not supported\nin this browser');
        }
        Note.prototype.audioContext = new AudioContext();
        Note.prototype.gainNode = Note.prototype.audioContext.createGain();
        Note.prototype.gainNode.gain.value = 0.25; // reduce volume by 1/4
    }

    // Note playing

    play(type) {
        this.oscillator = this.audioContext.createOscillator();
        if (!this.oscillator.start) {
            this.oscillator.start = this.oscillator.noteOn;
        }
        if (!this.oscillator.stop) {
            this.oscillator.stop = this.oscillator.noteOff;
        }
        this.oscillator.type = [
            'sine',
            'square',
            'sawtooth',
            'triangle'
        ][(type || 1) - 1];
        this.oscillator.frequency.value =
            2 ** ((this.pitch - 69) / 12) * 440;
        this.oscillator.connect(this.gainNode);
        this.gainNode.connect(this.audioContext.destination);
        this.oscillator.start(0);
    }

    stop() {
        if (this.oscillator) {
            this.oscillator.stop(0);
            this.oscillator = null;
        }
    }
}

// Note shared properties

Note.prototype.audioContext = null;
Note.prototype.gainNode = null;