import type { MidiEvent } from "midi-file";
import { Track } from "./Track";
/**
 * Describes the MIDI instrument of a track.
 */
export declare class Instrument {
    /**
     * The instrument number. Defaults to 0.
     */
    number: number;
    /**
     * @param trackData
     * @param track
     */
    constructor(trackData: MidiEvent[], track: Track);
    /**
     * The common name of the instrument.
     */
    get name(): string;
    set name(n: string);
    /**
     * The instrument family, e.g. "piano".
     */
    get family(): string;
    /**
     * If the instrument is a percussion instrument.
     */
    get percussion(): boolean;
    /**
     * Convert it to JSON form.
     */
    toJSON(): InstrumentJSON;
    /**
     * Convert from JSON form.
     */
    fromJSON(json: InstrumentJSON): void;
}
export interface InstrumentJSON {
    family: string;
    number: number;
    name: string;
}
