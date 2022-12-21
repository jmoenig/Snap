import { Header } from "./Header";
import { MidiPitchBendEvent } from "midi-file";
/**
 * Represents a pitch bend event.
 */
export declare class PitchBend implements PitchBendInterface {
    /**
     * The pitch value from...
     */
    value: number;
    /**
     * The tick time of the event.
     */
    ticks: number;
    /**
     * @param event
     * @param header
     */
    constructor(event: Partial<MidiPitchBendEvent & {
        absoluteTime: number;
    }>, header: Header);
    /**
     * The time of the event in seconds
     */
    get time(): number;
    set time(t: number);
    toJSON(): PitchBendJSON;
}
export interface PitchBendJSON {
    ticks: number;
    time: number;
    value: number;
}
export interface PitchBendInterface {
    ticks: number;
    time: number;
    value: number;
}
