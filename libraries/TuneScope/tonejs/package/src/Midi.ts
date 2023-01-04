import type {
	MidiData,
	MidiEvent
} from "midi-file";

import { parseMidi } from "midi-file";

import { Header, HeaderJSON } from "./Header";
import { Track, TrackJSON } from "./Track";
import { encode } from "./Encode";

/**
 * The main midi parsing class.
 */
export class Midi {

	/**
	 * Download and parse the MIDI file. Returns a promise
	 * which resolves to the generated MIDI file.
	 * @param url The URL to fetch.
	 */
	static async fromUrl(url: string): Promise<Midi> {
		const response = await fetch(url);
		if (response.ok) {
			const arrayBuffer = await response.arrayBuffer();
			return new Midi(arrayBuffer);
		} else {
			throw new Error(`Could not load '${url}'`);
		}
	}

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
	constructor(midiArray?: (ArrayLike<number> | ArrayBuffer)) {
		// Parse the MIDI data if there is any.
		let midiData: (MidiData | null) = null;
		if (midiArray) {
			// Transform midiArray to ArrayLike<number>
			// only if it's an ArrayBuffer.
			const midiArrayLike: ArrayLike<number> = midiArray instanceof ArrayBuffer
				? new Uint8Array(midiArray)
				: midiArray;

			// Parse MIDI data.
			midiData = parseMidi(midiArrayLike);

			// Add the absolute times to each of the tracks.
			midiData.tracks.forEach(track => {
				let currentTicks = 0;

				track.forEach((event: MidiEvent & { absoluteTime: number; }) => {
					currentTicks += event.deltaTime;
					event.absoluteTime = currentTicks;
				});
			});

			// Ensure at most one instrument per track.
			midiData.tracks = splitTracks(midiData.tracks);
		}

		this.header = new Header(midiData);
		this.tracks = [];

		// Parse MIDI data.
		if (midiArray) {
			// Format 0, everything is on the same track.
			this.tracks = midiData.tracks.map(trackData => new Track(trackData, this.header));

			// If it's format 1 and there are no notes on the first track, remove it.
			if (midiData.header.format === 1 && this.tracks[0].duration === 0) {
				this.tracks.shift();
			}
		}
	}

	/**
	 * The name of the midi file, taken from the first track.
	 */
	get name(): string {
		return this.header.name;
	}

	set name(n) {
		this.header.name = n;
	}

	/**
	 * The total length of the file in seconds.
	 */
	get duration(): number {
		// Get the max of the last note of all the tracks.
		const durations = this.tracks.map(t => t.duration);
		return Math.max(...durations);
	}

	/**
	 * The total length of the file in ticks.
	 */
	get durationTicks(): number {
		// Get the max of the last note of all the tracks.
		const durationTicks = this.tracks.map(t => t.durationTicks);
		return Math.max(...durationTicks);
	}

	/**
	 * Add a track to the MIDI file.
	 */
	addTrack(): Track {
		const track = new Track(undefined, this.header);
		this.tracks.push(track);

		return track;
	}

	/**
	 * Encode the MIDI as a Uint8Array.
	 */
	toArray(): Uint8Array {
		return encode(this);
	}

	/**
	 * Convert the MIDI object to JSON.
	 */
	toJSON(): MidiJSON {
		return {
			header: this.header.toJSON(),
			tracks: this.tracks.map(track => track.toJSON()),
		};
	}

	/**
	 * Parse a JSON representation of the object. Will overwrite the current
	 * tracks and header.
	 */
	fromJSON(json: MidiJSON): void {
		this.header = new Header();
		this.header.fromJSON(json.header);
		this.tracks = json.tracks.map(trackJSON => {
			const track = new Track(undefined, this.header);
			track.fromJSON(trackJSON);

			return track;
		});
	}

	/**
	 * Clone the entire object MIDI object.
	 */
	clone(): Midi {
		const midi = new Midi();
		midi.fromJSON(this.toJSON());

		return midi;
	}
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

/**
 * Given a list of MIDI tracks, make sure that each channel corresponds to at
 * most one channel and at most one instrument. This means splitting up tracks
 * that contain more than one channel or instrument.
 */
function splitTracks(tracks: Array<MidiEvent[]>): Array<MidiEvent[]> {
	const newTracks = [];

	for (let i = 0; i < tracks.length; i++) {
		const defaultTrack = newTracks.length;
		// a map from [program, channel] tuples to new track numbers
		const trackMap = new Map<string, number>();
		// a map from channel numbers to current program numbers
		const currentProgram = Array(16).fill(0) as Array<number>;

		for (const event of tracks[i]) {
			let targetTrack = defaultTrack;

			// If the event has a channel, we need to find that channel's current
			// program number and the appropriate track for this [program, channel]
			// pair.
			const channel = (event as (MidiEvent & { channel?: number })).channel;
			if (channel !== undefined) {
				if (event.type === "programChange") {
					currentProgram[channel] = event.programNumber;
				}

				const program = currentProgram[channel];
				const trackKey = `${program} ${channel}`;
				
				if (trackMap.has(trackKey)) {
					targetTrack = trackMap.get(trackKey);
				} else {
					targetTrack = defaultTrack + trackMap.size;
					trackMap.set(trackKey, targetTrack);
				}
			}

			if (!newTracks[targetTrack]) {
				newTracks.push([]);
			}

			newTracks[targetTrack].push(event);
		}
	}

	return newTracks;
}
