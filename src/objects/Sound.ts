// Sound /////////////////////////////////////////////////////////////

// Sound instance creation

class Sound {
    constructor(audio, name) {
        this.audio = audio; // mandatory
        this.name = name || "Sound";
    }

    play() {
        // return an instance of an audio element which can be terminated
        // externally (i.e. by the stage)
        const aud = document.createElement('audio');
        aud.src = this.audio.src;
        aud.play();
        return aud;
    }

    copy() {
        const snd = document.createElement('audio');
        let cpy;

        snd.src = this.audio.src;
        cpy = new Sound(snd, this.name ? copy(this.name) : null);
        return cpy;
    }

    toDataURL() {
        return this.audio.src;
    }
}