import type {
	MidiEvent,
	MidiProgramChangeEvent
} from "midi-file";

import { DrumKitByPatchID, instrumentByPatchID, InstrumentFamilyByID } from "./InstrumentMaps";
import { Track } from "./Track";

/**
 * @hidden
 */
const privateTrackMap = new WeakMap<Instrument, Track>();

/**
 * Describes the MIDI instrument of a track.
 */
export class Instrument {

	/**
	 * The instrument number. Defaults to 0.
	 */
	number = 0;

	/**
	 * @param trackData
	 * @param track 
	 */
	constructor(trackData: MidiEvent[], track: Track) {
		privateTrackMap.set(this, track);
		this.number = 0;

		if (trackData) {
			const programChange = trackData.find(
				e => e.type === "programChange"
			) as MidiProgramChangeEvent;

			// Set 'number' from 'programNumber' if exists.
			if (programChange) {
				this.number = programChange.programNumber;
			}
		}
	}

	/**
	 * The common name of the instrument.
	 */
	get name(): string {
		if (this.percussion) {
			return DrumKitByPatchID[this.number];
		} else {
			return instrumentByPatchID[this.number];
		}
	}

	set name(n: string) {
		const patchNumber = instrumentByPatchID.indexOf(n);
		if (patchNumber !== -1) {
			this.number = patchNumber;
		}
	}

	/**
	 * The instrument family, e.g. "piano".
	 */
	get family(): string {
		if (this.percussion) {
			return "drums";
		} else {
			return InstrumentFamilyByID[Math.floor(this.number / 8)];
		}
	}

	/**
	 * If the instrument is a percussion instrument.
	 */
	get percussion(): boolean {
		const track = privateTrackMap.get(this);
		return track.channel === 9;
	}

	/**
	 * Convert it to JSON form.
	 */
	toJSON(): InstrumentJSON {
		return {
			family: this.family,
			number: this.number,
			name: this.name
		};
	}

	/**
	 * Convert from JSON form.
	 */
	fromJSON(json: InstrumentJSON): void {
		this.number = json.number;
	}
}

export interface InstrumentJSON {
	family: string;
	number: number;
	name: string;
}
