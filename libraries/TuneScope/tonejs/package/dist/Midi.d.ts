import { Header, HeaderJSON } from "./Header";
import { Track, TrackJSON } from "./Track";
/**
 * The main midi parsing class.
 */
export declare class Midi {
    /**
     * Download and parse the MIDI file. Returns a promise
     * which resolves to the generated MIDI file.
     * @param url The URL to fetch.
     */
    static fromUrl(url: string): Promise<Midi>;
    /**
     * The header information, includes things like tempo and meta events.
     */
    header: Header;
    /**
     * The midi tracks.
     */
    tracks: Track[];
    /**
     * Parse the midi data
     */
    constructor(midiArray?: (ArrayLike<number> | ArrayBuffer));
    /**
     * The name of the midi file, taken from the first track.
     */
    get name(): string;
    set name(n: string);
    /**
     * The total length of the file in seconds.
     */
    get duration(): number;
    /**
     * The total length of the file in ticks.
     */
    get durationTicks(): number;
    /**
     * Add a track to the MIDI file.
     */
    addTrack(): Track;
    /**
     * Encode the MIDI as a Uint8Array.
     */
    toArray(): Uint8Array;
    /**
     * Convert the MIDI object to JSON.
     */
    toJSON(): MidiJSON;
    /**
     * Parse a JSON representation of the object. Will overwrite the current
     * tracks and header.
     */
    fromJSON(json: MidiJSON): void;
    /**
     * Clone the entire object MIDI object.
     */
    clone(): Midi;
}
/**
 * The MIDI data in JSON format.
 */
export interface MidiJSON {
    header: HeaderJSON;
    tracks: TrackJSON[];
}
export { TrackJSON, Track } from "./Track";
export { HeaderJSON, Header } from "./Header";
