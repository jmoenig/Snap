import type { MidiControllerEvent } from "midi-file";
import { Header } from "./Header";

/**
 * @hidden
 */
export type ControlChangeName =
	| "modulationWheel"
	| "breath"
	| "footController"
	| "portamentoTime"
	| "volume"
	| "balance"
	| "pan"
	| "sustain"
	| "portamentoTime"
	| "sostenuto"
	| "softPedal"
	| "legatoFootswitch"
	| "portamentoControl";

interface ControlChangeMap {
	[key: number]: ControlChangeName;
}
/**
 * A map of values to control change names
 * @hidden
 */
export const controlChangeNames: ControlChangeMap = {
	1: "modulationWheel",
	2: "breath",
	4: "footController",
	5: "portamentoTime",
	7: "volume",
	8: "balance",
	10: "pan",
	64: "sustain",
	65: "portamentoTime",
	66: "sostenuto",
	67: "softPedal",
	68: "legatoFootswitch",
	84: "portamentoControl",
};

/**
 * swap the keys and values
 * @hidden
 */
export const controlChangeIds = Object.keys(controlChangeNames).reduce((obj, key) => {
	obj[controlChangeNames[key]] = key;
	return obj;
}, {});

const privateHeaderMap = new WeakMap<ControlChange, Header>();
const privateCCNumberMap = new WeakMap<ControlChange, number>();

/**
 * Represents a control change event
 */
export class ControlChange implements ControlChangeInterface {

	/**
	 * The number value of the event
	 */
	value: number;

	/**
	 * The tick time of the event
	 */
	ticks: number;

	/**
	 * @param event
	 * @param header
	 */
	constructor(event: Partial<MidiControllerEvent & { absoluteTime: number }>, header: Header) {
		privateHeaderMap.set(this, header);
		privateCCNumberMap.set(this, event.controllerType);

		this.ticks = event.absoluteTime;
		this.value = event.value;
	}

	/**
	 * The controller number
	 */
	get number(): number {
		return privateCCNumberMap.get(this);
	}

	/**
	 * return the common name of the control number if it exists
	 */
	get name(): ControlChangeName {
		if (controlChangeNames[this.number]) {
			return controlChangeNames[this.number];
		} else {
			return null;
		}
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

	toJSON(): ControlChangeJSON {
		return {
			number: this.number,
			ticks: this.ticks,
			time: this.time,
			value: this.value,
		};
	}
}

export interface ControlChangeJSON {
	number: number;
	ticks: number;
	time: number;
	value: number;
}

export interface ControlChangeInterface {
	number: number;
	ticks: number;
	time: number;
	value: number;
}
