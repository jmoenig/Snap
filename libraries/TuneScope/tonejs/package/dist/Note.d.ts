import { Header } from "./Header";
/**
 * A Note consists of a `noteOn` and `noteOff` event.
 */
export declare class Note implements NoteInterface {
    /**
     * The notes MIDI value.
     */
    midi: number;
    /**
     * The normalized velocity (0-1).
     */
    velocity: number;
    /**
     * The velocity of the note off.
     */
    noteOffVelocity: number;
    /**
     * The start time in ticks.
     */
    ticks: number;
    /**
     * The duration in ticks.
     */
    durationTicks: number;
    constructor(noteOn: NoteOnEvent, noteOff: NoteOffEvent, header: Header);
    /**
     * The note name and octave in scientific pitch notation, e.g. "C4".
     */
    get name(): string;
    set name(n: string);
    /**
     * The notes octave number.
     */
    get octave(): number;
    set octave(o: number);
    /**
     * The pitch class name. e.g. "A".
     */
    get pitch(): string;
    set pitch(p: string);
    /**
     * The duration of the segment in seconds.
     */
    get duration(): number;
    set duration(d: number);
    /**
     * The time of the event in seconds.
     */
    get time(): number;
    set time(t: number);
    /**
     * The number of measures (and partial measures) to this beat.
     * Takes into account time signature changes.
     * @readonly
     */
    get bars(): number;
    toJSON(): NoteJSON;
}
export interface NoteJSON {
    time: number;
    midi: number;
    name: string;
    velocity: number;
    duration: number;
    ticks: number;
    durationTicks: number;
}
export interface NoteOnEvent {
    ticks: number;
    velocity: number;
    midi: number;
}
export interface NoteOffEvent {
    ticks: number;
    velocity: number;
}
export interface NoteInterface {
    time: number;
    ticks: number;
    duration: number;
    durationTicks: number;
    midi: number;
    pitch: string;
    octave: number;
    name: string;
    noteOffVelocity: number;
    velocity: number;
}
declare type PitchDescription = {
    name: string;
} | {
    pitch: string;
    octave: number;
} | {
    midi: number;
};
declare type VelocityDescription = {
    velocity?: number;
    noteOffVelocity?: number;
};
declare type TimeDescription = {
    time: number;
    duration?: number;
} | {
    ticks: number;
    durationTicks?: number;
};
/**
 * @hidden
 */
export declare type NoteConstructorInterface = PitchDescription & VelocityDescription & TimeDescription;
export {};
