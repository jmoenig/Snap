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
        let adjusted_percent = (percent === 0) ? 0.0001: percent;
        TuneScope.globalInstrumentVolume = adjusted_percent/100.0;
    }
);

SnapExtensions.primitives.set(
    'ts_setinstvol(name, percent)',
    function (instrumentName, percent) {
        instrumentName = instrumentName.toLowerCase();
        let adjusted_percent = (percent === 0) ? 0.0001: percent;
        TuneScope.instrumentVolumes[instrumentName] = adjusted_percent/100.0;
    }
);

SnapExtensions.primitives.set(
    'ts_playnote(note, duration)',
    function (note, noteLength) {
        TuneScope.playNote(note, noteLength, );
    }
);

SnapExtensions.primitives.set(
    'ts_playnoteIns(note, duration, instrument)',
    function (note, noteLength, instrument) {
        TuneScope.playNote(note, noteLength, instrument.toLowerCase());
    }
);

SnapExtensions.primitives.set(
    'ts_getcurrentnote()',
    function () {
        return TuneScope.currentNote
    }
)

SnapExtensions.primitives.set(
    'ts_parsemidifile()',
    function () {
        const getMidiFile = async () => {
            TuneScope.midi.parsed = "";
            fileMidi = await window._selectFile(".mid", false);
            const arrayBuffer = await fileMidi.arrayBuffer()
            const parsedMidi = await new window.Midi(arrayBuffer)
            TuneScope.midi.parsed = parsedMidi.toJSON();
            world.children[0].broadcast("ts_file_input_received")
        }
        getMidiFile();
    }
)

SnapExtensions.primitives.set(
    'ts_getparsed()',
    function() {
        world.children[0].broadcast("ts_no_file_upload")
        let temp = window._objToArray(TuneScope.midi.parsed);
        temp = window.convertArrayToListRecursive(temp);
        return temp;
    }
);

SnapExtensions.primitives.set(
    'ts_playMIDI(controller, instrument)',
    function (controller_name, instrument_name) {

        function onEnabled(controller, instrument) {
            let synth = window.WebMidi.getInputByName(controller);
            let keyboard = synth.channels[1];
            //remove any existing listeners
            keyboard.removeListener("noteon")

            // Listener for the keyboard, prints midi note number
            keyboard.addListener("noteon", e => {
                TuneScope.playNote(e.note.identifier, 0.5, instrument);
            });
        }

        const playMidiController = async (controller, instrument) => {
            if(controller === null || controller === "") return;

            //enables the webmidi controller, doesn't record notes
            window.WebMidi.enable((err) => {
                if (err) {
                    alert(err);
                } else {
                    onEnabled(controller, instrument);
                }
            });
        }

        playMidiController(controller_name, instrument_name);
    }
);

SnapExtensions.primitives.set(
    'ts_stopMIDI()',
    function() {
        window.WebMidi.disable();
    }
)

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
        if (!TuneScope.tones[id]) {
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
