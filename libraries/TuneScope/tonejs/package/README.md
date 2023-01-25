[![Build Status](https://travis-ci.org/Tonejs/Midi.svg?branch=master)](https://travis-ci.org/Tonejs/Midi)
[![codecov](https://codecov.io/gh/Tonejs/Midi/branch/master/graph/badge.svg)](https://codecov.io/gh/Tonejs/Midi)

## Installation

`npm install @tonejs/midi`

## [DEMO](https://tonejs.github.io/Midi/)

Midi makes it straightforward to read and write MIDI files with Javascript. It uses [midi-file](https://github.com/carter-thaxton/midi-file) for parsing and writing. 

## Import

Node.js:

```javascript
const { Midi } = require('@tonejs/midi')
```

Typescript / ES6

```javascript
import { Midi } from '@tonejs/midi'
```

Browser

```html
<script src="https://unpkg.com/@tonejs/midi"></script>
```
```javascript
const midi = new Midi()
```

## Basic Example


```javascript
// load a midi file in the browser
const midi = await Midi.fromUrl("path/to/midi.mid")
//the file name decoded from the first track
const name = midi.name
//get the tracks
midi.tracks.forEach(track => {
  //tracks have notes and controlChanges

  //notes are an array
  const notes = track.notes
  notes.forEach(note => {
    //note.midi, note.time, note.duration, note.name
  })

  //the control changes are an object
  //the keys are the CC number
  track.controlChanges[64]
  //they are also aliased to the CC number's common name (if it has one)
  track.controlChanges.sustain.forEach(cc => {
    // cc.ticks, cc.value, cc.time
  })

  //the track also has a channel and instrument
  //track.instrument.name
})
```

### Format

The data parsed from the midi file looks like this:

```javascript
{
  // the transport and timing data
  header: {
    name: String,                     // the name of the first empty track, 
                                      // which is usually the song name
    tempos: TempoEvent[],             // the tempo, e.g. 120
    timeSignatures: TimeSignatureEvent[],  // the time signature, e.g. [4, 4],

    PPQ: Number                       // the Pulses Per Quarter of the midi file
                                      // this is read only
  },

  duration: Number,                   // the time until the last note finishes

  // an array of midi tracks
  tracks: [
    {
      name: String,                   // the track name if one was given

      channel: Number,                // channel
                                      // the ID for this channel; 9 and 10 are
                                      // reserved for percussion
      notes: [
        {
          midi: Number,               // midi number, e.g. 60
          time: Number,               // time in seconds
          ticks: Number,              // time in ticks
          name: String,               // note name, e.g. "C4",
          pitch: String,              // the pitch class, e.g. "C",
          octave : Number,            // the octave, e.g. 4
          velocity: Number,           // normalized 0-1 velocity
          duration: Number,           // duration in seconds between noteOn and noteOff
        }
      ],

      // midi control changes
      controlChanges: {
        // if there are control changes in the midi file
        '91': [
          {
            number: Number,           // the cc number
            ticks: Number,            // time in ticks
            time: Number,             // time in seconds
            value: Number,            // normalized 0-1
          }
        ],
      },

      instrument: {                   // and object representing the program change events
        number : Number,              // the instrument number 0-127
        family: String,               // the family of instruments, read only.
        name : String,                // the name of the instrument
        percussion: Boolean,          // if the instrument is a percussion instrument
      },          
    }
  ]
}
```

### Raw Midi Parsing

If you are using Node.js or have the raw binary string from the midi file, just use the `parse` method:

```javascript
const midiData = fs.readFileSync("test.mid")
const midi = new Midi(midiData)
```

### Encoding Midi

You can also create midi files from scratch or by modifying an existing file.

```javascript
// create a new midi file
var midi = new Midi()
// add a track
const track = midi.addTrack()
track.addNote({
  midi : 60,
  time : 0,
  duration: 0.2
})
.addNote({
  name : 'C5',
  time : 0.3,
  duration: 0.1
})
.addCC({
  number : 64,
  value : 127,
  time : 0.2
})
 
// write the output
fs.writeFileSync("output.mid", new Buffer(midi.toArray()))
```

### Acknowledgment

Thank you [midi-file](https://github.com/carter-thaxton/midi-file)!
