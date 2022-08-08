SnapExtensions.primitives.set(
    'ts_setinst(name)',
    function (name) {
        window.parent.currentInstrumentName = name.toLowerCase();
    }
);

SnapExtensions.primitives.set(
    'ts_setvol(percent)',
    function (percent) {
        window.parent.globalInstrumentVolume = percent/100;
    }
);

SnapExtensions.primitives.set(
    'ts_setinstvol(name, percent)',
    function (instrumentName, percent) {
        window.parent.instrumentVolumes[instrumentName] = percent/100;
    }
);

SnapExtensions.primitives.set(
    'ts_playnote(note, duration)',
    function (note, noteLength) {
        window.playNote(note, noteLength);
    }
);

SnapExtensions.primitives.set(
    'ts_playtracks(tracklist, timesignature)',
    function (tracksList, timeSignature, tempo) {
        const multiplyArray = (arr, length) =>
          Array.from({ length }, () => arr).flat()

        const wait = (duration) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, duration)
            })
        }

        const playTrackMeasure = async (currTrack, measureIndex, beatsPerMeasure, tempo, instrument) => {
            var beat = 0;
            const beatEndIndex = beatsPerMeasure[0];

         
            while (beat < beatEndIndex) {
                const note = currTrack[measureIndex][0];
                const noteLength = currTrack[measureIndex][1];
                measureIndex++; //increment for the next index in the track

                const durationInSeconds = noteLength * (window.baseTempo / tempo);

                // play the note and wait
                await window.playNote(note, durationInSeconds, instrument);
                await wait(durationInSeconds * 1000)

                // we increment i with respect to the number of beats the current note occupies in a measure
                beat += noteLength * beatsPerMeasure[1];
            }

        }

        const playTracks = async (tracksList, timeSignature, tempo) => {
            // verify inputs
            if (!tracksList.contents) return;

            const beatsPerMeasure = window.timeSignatureToBeatsPerMeasure[timeSignature];

            var tracks = window.convertListToArrayRecursive(tracksList);

            // convert all elements in the track to lowercase
            tracks = window.toLowerCaseRecursive(tracks);

            // check to make sure we have an actual melody/chord track rather than just a loop
            // this ensures that we have a definitive track length
            let haveSetTrackLength = false
            let definitiveTrackIndex = 0 //index of valid melody/chord track

            // check to make sure we have an actual melody/chord track rather than just a loop
            // this ensures that we have a deinitive track length
            for (let i = 0; i < tracks.length; i++) {
                let currTrack = tracks[i];
                if (currTrack[0][0] === "melody" || currTrack[0][0] === "chords") {
                    definitiveTrackIndex = i;
                    haveSetTrackLength = true;
                    break;
                }
            }


            if (!haveSetTrackLength) {
                console.error("No Melody or Chord track provided, only Chord/Drum Loop")
                return;
            }

            /*
                first, add up all the note values in the track
                to determine the total number of beats
                then, calculate the number of measures by considering the time signature
                and the total number of beats in the track list
            */

            // converts the strings of note length in each track to their respective duration values
            for (let i = 0; i < tracks.length; i++) {
                let currTrack = tracks[i];
                for (let j = 1; j < currTrack.length; j++) { //index from 1 to avoid the header
                    //Reassign the durations list to numerical duration values from strings
                    //jth (Note, Duration) pair
                    currTrack[j][1] = window.noteLengthToTimeValue[currTrack[j][1]]
                }
            }

            // properly encodes drum tracks
            for (let i = 0; i < tracks.length; i++) {
                let currTrack = tracks[i];
                // check each track's header to see whether it is a drum track
                // Header: (Instrument, Type)
                if (currTrack[0][0] === "loop-drums") {
                    var isBassDrum = (currTrack[0][1] === "bass drum");
                    for (let j = 1; j < currTrack.length; j++) {
                        if (currTrack[j][0] === "x") { // ("x", duration) encode a note
                            //check if the instrument is a bass drum
                            if (isBassDrum) {
                                currTrack[j][0] = "C2";
                            } else {
                                currTrack[j][0] = "C4";
                            }
                        } else { //(" ", duration) encode a rest
                            currTrack[j][0] = "R";
                        }

                        //converting the duration length to the appropriate value based on the timesignature
                        // If eighth notes get the beat, subdivide drum tracks into sixteenth notes
                        if (beatsPerMeasure[1] == 0.5) {
                            currTrack[j][1] = 0.25;
                        }
                    }
                }
            }

            // calculates the total number of beats in the song
            var totalBeats = 0;
            var defTrack = tracks[definitiveTrackIndex];
            for (let j = 1; j < defTrack.length; j++) {
                totalBeats += parseFloat(defTrack[j][1]);
            }

            // length of measure = total number of beats (w.r.t which note gets the beat) / beats per measure
            const totalMeasures = (totalBeats) / (beatsPerMeasure[0] * beatsPerMeasure[1]);

            //convert any melody/chord/drum loop to a regular track
            // done by repeatedly appending the array to itself
            for (let i = 0; i < tracks.length; i++) {
                let currTrack = tracks[i];
                //check if the current track is a loop
                if (currTrack[0][0] === "loop-melody" || currTrack[0][0] === "loop-chords" || currTrack[0][0] === "loop-drums") {
                    let beatsInLoop = 0;
                    for (let j = 1; j < currTrack.length; j++) {
                        beatsInLoop += parseFloat(currTrack[j][1]);
                    }
                    let loopCount = parseInt(totalBeats / beatsInLoop);

                    //appending the track to itself
                    //we don't repeat the header
                    let header = currTrack[0];
                    let newTrack = multiplyArray(currTrack.slice(1), loopCount);
                    newTrack.unshift(header)

                    if (header[0] === "loop-chords") {
                        newTrack[0][0] = "chords";
                    } else {
                        newTrack[0][0] = "melody";
                    }

                    //push the multiplied track to the tracks list
                    //and remove the original loop
                    tracks.push(newTrack)
                    tracks.splice(i,1)
                    i--;
                }
            }


            for (let i = 0; i < tracks.length; i++) {
                let currTrack = tracks[i];
                //find which elements of the track list are embedded chords
                if (currTrack[0][0] === "chords") {
                    let chordInstrument = currTrack[0][1];
                    let maxChordLen = 0;
                    for (let j = 1; j < currTrack.length; j++) {
                        // iterate through each chord in the track to find the largest chord (most # of notes)
                        maxChordLen = Math.max(maxChordLen, currTrack[j][0].length);
                    }
                    
                    //splits the notes of chords into separate tracks
                    for(let k = 0; k < maxChordLen; k++) {
                        // the new track will have the same instrument, but be encoded as a melody line
                        let newTrack = [["melody", chordInstrument]];
                        for (let j = 1; j < currTrack.length; j++) {
                            let currChord = currTrack[j][0];
                            // if the chord is large enough, add the kth note of the chord to the melody line
                            //otherwise, the melody will rest for that note in the track
                            if (k < currChord.length) {
                                // kth note of the chord, keep the duration of the chord
                                newTrack.push([currChord[k], currTrack[j][1]]);
                            }else {
                                newTrack.push(["r", currTrack[j][1]]);

                            }
                        }
                        //add this new track to the overarching tracklist
                        tracks.push(newTrack);
                    }
                    // delete original chord track from tracks
                    tracks.splice(i, 1);
                    i--;
                }
            }


            // Play Measures track by track
            for (let i = 0; i < totalMeasures; i++) {
                console.log("Playing measure " + (i + 1));
                const measureResults = [];

                // count for the number of beats that have passed since the last measure
                // e.g. in 4/4, measure 3 will have 2*4 = 8 beats elapsed. Next measure starts
                // on beat 8 (0 indexed)
                let elapsedBeats = i * beatsPerMeasure[0];

                //per track
                for (let j = 0; j < tracks.length; j++) {
                    let currTrack = tracks[j];
                    let instrument = currTrack[0][1];
                    let measureIndex = 0;
                    let elapsedSum = 0;

                    // identifying where in the track array to begin the measure
                    // since different tracks have different array lengths, but
                    // the same amount of beats, they will align at each measure
                    // beat-wise, but have different starting indices measure-wise
                    for (let k = 1; k < currTrack.length; k++) {
                        if (elapsedSum >= elapsedBeats) {
                            measureIndex = k;
                            break;
                        } else {
                            // add the value of the kth duration
                            elapsedSum += parseFloat(currTrack[k][1]);
                        }
                    }

                    measureResults.push(new Promise((resolve, reject) => {
                        playTrackMeasure(currTrack, measureIndex, beatsPerMeasure, tempo, instrument).then(() => {
                            resolve();
                        }).catch((err) => {
                            reject(err);
                        })
                    }));
                }
                await Promise.all(measureResults);
            }
        }

        playTracks(tracksList, timeSignature, tempo);
    }
);

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
    'ts_settone(id, frequency, amplitude)',
    function (id, freq, ampl) {
        var created = false;
        if (!window.tones[id]) {
          window.tones[id] = new window.Tone(id);
          created = true;
        }

        window.tones[id].setFreq(freq);
        window.tones[id].setAmpl(ampl * 100);
        created && window.tones[id].turnOn();
    }
);

SnapExtensions.primitives.set(
    'ts_turntoneon(id, bool)',
    function (id, on) {
        if (!window.tones[id]) {
          return;
        }

        if (on) {
          window.tones[id].turnOn();
        } else {
          window.tones[id].turnOff();
        }
    }
);

SnapExtensions.primitives.set(
    'ts_stoptones()',
    function () {
        const vals = Object.values(window.tones);

        for (let i = 0; i < vals.length; i++) {
          const currTone = vals[i];
          currTone.turnOff();
        }
    }
);

SnapExtensions.primitives.set(
    'ts_loaded()',
    function () {
        return window.parent.loadedTuneScope === true;
    }
);
