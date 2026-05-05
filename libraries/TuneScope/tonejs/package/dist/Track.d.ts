import type { MidiEvent } from "midi-file";
import { ControlChangeInterface } from "./ControlChange";
import { ControlChangesJSON } from "./ControlChanges";
import { PitchBend, PitchBendInterface, PitchBendJSON } from "./PitchBend";
import { Header } from "./Header";
import { Instrument, InstrumentJSON } from "./Instrument";
import { Note, NoteConstructorInterface, NoteJSON } from "./Note";
/**
 * A Track is a collection of 'notes' and 'controlChanges'.
 */
export declare class Track {
    /**
     * The name of the track.
     */
    name: string;
    /**
     * The instrument associated with the track.
     */
    instrument: Instrument;
    /**
     * The track's note events.
     */
    notes: Note[];
    /**
     * The channel number of the track. Applies this channel
     * to all events associated with the channel.
     */
    channel: number;
    /**
     * The control change events.
     */
    controlChanges: import("./ControlChanges").ControlChanges;
    /**
     * The end of track event (if it exists) in ticks.
     */
    endOfTrackTicks?: number;
    /**
     * The pitch bend events.
     */
    pitchBends: PitchBend[];
    constructor(trackData: MidiEvent[], header: Header);
    /**
     * Add a note to the notes array.
     * @param props The note properties to add.
     */
    addNote(props: NoteConstructorInterface): this;
    /**
     * Add a control change to the track.
     * @param props
     */
    addCC(props: Omit<ControlChangeInterface, "ticks"> | Omit<ControlChangeInterface, "time">): this;
    /**
     * Add a control change to the track.
     */
    addPitchBend(props: Omit<PitchBendInterface, "ticks"> | Omit<PitchBendInterface, "time">): this;
    /**
     * The end time of the last event in the track.
     */
    get duration(): number;
    /**
     * The end time of the last event in the track in ticks.
     */
    get durationTicks(): number;
    /**
     * Assign the JSON values to this track.
     */
    fromJSON(json: TrackJSON): void;
    /**
     * Convert the track into a JSON format.
     */
    toJSON(): TrackJSON;
}
export interface TrackJSON {
    name: string;
    notes: NoteJSON[];
    channel: number;
    instrument: InstrumentJSON;
    controlChanges: ControlChangesJSON;
    pitchBends: PitchBendJSON[];
    endOfTrackTicks?: number;
}
