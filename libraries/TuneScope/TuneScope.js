// Load urls

// SnapExtensions.primitives.get('src_load(url)')()

// extension functions

SnapExtensions.primitives.set(
    'ts_setinst(name)',
    function (name) {
        TuneScope.currentInstrumentName = name.toLowerCase();
    }
);

SnapExtensions.primitives.set(
    'ts_setvol(percent)',
    function (percent) {
        TuneScope.globalInstrumentVolume = percent/100;
    }
);

SnapExtensions.primitives.set(
    'ts_setinstvol(name, percent)',
    function (instrumentName, percent) {
        TuneScope.instrumentVolumes[instrumentName] = percent/100;
    }
);

SnapExtensions.primitives.set(
    'ts_playnote(note, duration)',
    function (note, noteLength) {
        TuneScope.playNote(note, noteLength);
    }
);

SnapExtensions.primitives.set(
    'ts_playnoteIns(note, duration, instrument)',
    function (note, noteLength, instrument) {
        TuneScope.playNote(note, noteLength, instrument.toLowerCase());
    }
);

SnapExtensions.primitives.set(
    'ts_playtracks(tracklist, timesignature, tempo)',
    'ts_getcurrentnote()',
    function () {
        return TuneScope.currentNote
    }
)

SnapExtensions.primitives.set(
    'ts_playMIDI(controller, instrument)',
    function (controller_name, instrument) {
        var current_controller = controller_name;
        var midi_instrument = instrument;

        function onEnabled() {
            let synth = window.WebMidi.getInputByName(current_controller);
            let keyboard = synth.channels[1];

            // Listener for the keyboard, prints midi note number
            keyboard.addListener("noteon", e => {
                window.playNote(e.note.identifier, 0.5, midi_instrument);
            });
        }

        const playMidiController = async (controller, instrument) => {
            if(controller === null || controller === "") return;
            current_controller = controller;

            //enables the webmidi controller, doesn't record notes
            window.WebMidi.enable((err) => {
                if (err) {
                    alert(err);
                } else {
                    onEnabled();
                }
            });
        }

        playMidiController(controller_name, instrument);
    }
);

SnapExtensions.primitives.set(
    'ts_settone(id, frequency, amplitude, balance)',
    function (id, freq, ampl, bal) {
        var created = false;
        if (!window.tones[id]) {
          TuneScope.tones[id] = new window.Tone(id);
          created = true;
        } else {
            TuneScope.tones[id].turnOff();
            created = true;
        }

        TuneScope.tones[id].setFreq(freq);
        TuneScope.tones[id].setAmpl(ampl * 100);
        TuneScope.tones[id].setPan(bal);
        created && TuneScope.tones[id].turnOn();
    }
);

SnapExtensions.primitives.set(
    'ts_turntoneon(id, bool)',
    function (id, on) {
        if (!window.tones[id]) {
          return;
        }

        if (on) {
          TuneScope.tones[id].turnOn();
        } else {
          TuneScope.tones[id].turnOff();
        }
    }
);

SnapExtensions.primitives.set(
    'ts_stoptones()',
    function () {
        const vals = Object.values(TuneScope.tones);

        for (let i = 0; i < vals.length; i++) {
          const currTone = vals[i];
          currTone.turnOff();
        }
    }
);

SnapExtensions.primitives.set(
    'ts_loaded()',
    function () {
        return TuneScope.loadedTuneScope === true;
    }
);
