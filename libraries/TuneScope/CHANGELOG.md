# TuneScope Library Update History

## Added to the Official Snap Extension Library with Snap! 8.0.0

### December 2022
*   Added MIDI file conversion to TuneScope. Users can now import MIDI files and convert them to TuneScope track format with the `Import MIDI File` and `Convert MIDI to TuneScope` blocks
*   Enabled users to specify note duration in seconds for Track blocks
*   Added `Stop MIDI` block for MIDI controller playback
*   `Drum Track` can now be played independently of melody tracks
*   Fixed bug where clicking `Play MIDI` twice would result in instrument layering
*   Updated `webmidi` distribution to latest release
*   Fixed issue where the Snap! stop button failed to halt playback of `Play Tracks`  blocks
*   Added `Note to MIDI` and `MIDI to Note` blocks

### September 2022
*   Enabled panning for `Play Tone` block via native Snap! balance block
*   Changed TuneScope note blocks to account for double accidentals (sharps, flats)
*   Added `Current Note` block to report the last played or currently playing note
*   Fixed bug where the Vibraphone instrument would not play notes