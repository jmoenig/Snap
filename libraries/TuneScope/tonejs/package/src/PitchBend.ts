import { Header } from "./Header";
import { MidiPitchBendEvent } from "midi-file";

const privateHeaderMap = new WeakMap<PitchBend, Header>();

/**
 * Represents a pitch bend event.
 */
export class PitchBend implements PitchBendInterface {

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
	constructor(event: Partial<MidiPitchBendEvent & { absoluteTime: number; }>, header: Header) {
		privateHeaderMap.set(this, header);

		this.ticks = event.absoluteTime;
		this.value = event.value;
	}

	/**
	 * The time of the event in seconds
	 */
	get time(): number {
		const header = privateHeaderMap.get(this);
		return header.ticksToSeconds(this.ticks);
	}

	set time(t: number) {
		const header = privateHeaderMap.get(this);
		this.ticks = header.secondsToTicks(t);
	}

	toJSON(): PitchBendJSON {
		return {
			ticks: this.ticks,
			time: this.time,
			value: this.value,
		};
	}
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
