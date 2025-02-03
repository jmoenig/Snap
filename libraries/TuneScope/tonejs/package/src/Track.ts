import type {
	MidiControllerEvent,
	MidiEndOfTrackEvent,
	MidiEvent,
	MidiNoteOffEvent, MidiNoteOnEvent,
	MidiPitchBendEvent, MidiTrackNameEvent
} from "midi-file";

// Used to add `absoluteTime` property to 'MidiEvent's.
type WithAbsoluteTime = { absoluteTime: number; };

import { insert } from "./BinarySearch";
import { ControlChange, ControlChangeInterface } from "./ControlChange";
import { ControlChangesJSON, createControlChanges } from "./ControlChanges";
import { PitchBend, PitchBendInterface, PitchBendJSON } from "./PitchBend";

import { Header } from "./Header";
import { Instrument, InstrumentJSON } from "./Instrument";
import { Note, NoteConstructorInterface, NoteJSON } from "./Note";

const privateHeaderMap = new WeakMap<Track, Header>();

/**
 * A Track is a collection of 'notes' and 'controlChanges'.
 */
export class Track {
	/**
	 * The name of the track.
	 */
	name = "";

	/**
	 * The instrument associated with the track.
	 */
	instrument: Instrument;

	/**
	 * The track's note events.
	 */
	notes: Note[] = [];

	/**
	 * The channel number of the track. Applies this channel
	 * to all events associated with the channel.
	 */
	channel: number;

	/**
	 * The control change events.
	 */
	controlChanges = createControlChanges();

	/**
	 * The end of track event (if it exists) in ticks.
	 */
	endOfTrackTicks?: number;

	/**
	 * The pitch bend events.
	 */
	pitchBends: PitchBend[] = [];

	constructor(trackData: MidiEvent[], header: Header) {
		privateHeaderMap.set(this, header);

		if (trackData) {
			// Get the name of the track.
			const nameEvent = trackData.find(
				(e) => e.type === "trackName"
			) as MidiTrackNameEvent;

			// Set empty name if 'trackName' event isn't found.
			this.name = nameEvent ? nameEvent.text : "";
		}

		this.instrument = new Instrument(trackData, this);

		// Defaults to 0.
		this.channel = 0;

		if (trackData) {
			const noteOns = trackData.filter(
				(event) => event.type === "noteOn"
			) as (MidiNoteOnEvent & WithAbsoluteTime)[];

			const noteOffs = trackData.filter(
				(event) => event.type === "noteOff"
			) as (MidiNoteOffEvent & WithAbsoluteTime)[];

			while (noteOns.length) {
				const currentNote = noteOns.shift();

				// Set the channel based on the note.
				this.channel = currentNote.channel;

				// Find the corresponding note off.
				const offIndex = noteOffs.findIndex(
					(note) =>
						note.noteNumber === currentNote.noteNumber &&
						note.absoluteTime >= currentNote.absoluteTime
				);

				if (offIndex !== -1) {
					// Once it's got the note off, add it.
					const noteOff = noteOffs.splice(offIndex, 1)[0];

					this.addNote({
						durationTicks:
							noteOff.absoluteTime - currentNote.absoluteTime,
						midi: currentNote.noteNumber,
						noteOffVelocity: noteOff.velocity / 127,
						ticks: currentNote.absoluteTime,
						velocity: currentNote.velocity / 127,
					});
				}
			}

			const controlChanges = trackData.filter(
				(event) => event.type === "controller"
			) as (MidiControllerEvent & WithAbsoluteTime)[];
			controlChanges.forEach((event) => {
				this.addCC({
					number: event.controllerType,
					ticks: event.absoluteTime,
					value: event.value / 127,
				});
			});

			const pitchBends = trackData.filter(
				(event) => event.type === "pitchBend"
			) as (MidiPitchBendEvent & WithAbsoluteTime)[];
			pitchBends.forEach((event) => {
				this.addPitchBend({
					ticks: event.absoluteTime,
					// Scale the value between -2^13 to 2^13 to -2 to 2.
					value: event.value / Math.pow(2, 13),
				});
			});

			const endOfTrackEvent:
			| (MidiEndOfTrackEvent & WithAbsoluteTime)
			| undefined = trackData.find(
				(event): event is (MidiEndOfTrackEvent & WithAbsoluteTime) =>
					event.type === "endOfTrack"
			);

			this.endOfTrackTicks =
				endOfTrackEvent !== undefined
					? endOfTrackEvent.absoluteTime
					: undefined;
		}
	}

	/**
	 * Add a note to the notes array.
	 * @param props The note properties to add.
	 */
	addNote(props: NoteConstructorInterface): this {
		const header = privateHeaderMap.get(this);
		const note = new Note(
			{
				midi: 0,
				ticks: 0,
				velocity: 1,
			},
			{
				ticks: 0,
				velocity: 0,
			},
			header
		);

		Object.assign(note, props);
		insert(this.notes, note, "ticks");
		return this;
	}

	/**
	 * Add a control change to the track.
	 * @param props
	 */
	addCC(
		props:
		| Omit<ControlChangeInterface, "ticks">
		| Omit<ControlChangeInterface, "time">
	): this {
		const header = privateHeaderMap.get(this);
		const cc = new ControlChange(
			{
				controllerType: props.number,
			},
			header
		);
		delete props.number;
		Object.assign(cc, props);
		if (!Array.isArray(this.controlChanges[cc.number])) {
			this.controlChanges[cc.number] = [];
		}
		insert(this.controlChanges[cc.number], cc, "ticks");
		return this;
	}

	/**
	 * Add a control change to the track.
	 */
	addPitchBend(
		props:
		| Omit<PitchBendInterface, "ticks">
		| Omit<PitchBendInterface, "time">
	): this {
		const header = privateHeaderMap.get(this);
		const pb = new PitchBend({}, header);
		Object.assign(pb, props);
		insert(this.pitchBends, pb, "ticks");
		return this;
	}

	/**
	 * The end time of the last event in the track.
	 */
	get duration(): number {
		if (!this.notes.length) {
			return 0;
		}

		let maxDuration =
			this.notes[this.notes.length - 1].time +
			this.notes[this.notes.length - 1].duration;

		for (let i = 0; i < this.notes.length - 1; i++) {
			const duration = this.notes[i].time + this.notes[i].duration;
			if (maxDuration < duration) {
				maxDuration = duration;
			}
		}

		return maxDuration;
	}

	/**
	 * The end time of the last event in the track in ticks.
	 */
	get durationTicks(): number {
		if (!this.notes.length) {
			return 0;
		}

		let maxDuration =
			this.notes[this.notes.length - 1].ticks +
			this.notes[this.notes.length - 1].durationTicks;
		for (let i = 0; i < this.notes.length - 1; i++) {
			const duration = this.notes[i].ticks + this.notes[i].durationTicks;
			if (maxDuration < duration) {
				maxDuration = duration;
			}
		}

		return maxDuration;
	}

	/**
	 * Assign the JSON values to this track.
	 */
	fromJSON(json: TrackJSON): void {
		this.name = json.name;
		this.channel = json.channel;
		this.instrument = new Instrument(undefined, this);
		this.instrument.fromJSON(json.instrument);

		if (json.endOfTrackTicks !== undefined) {
			this.endOfTrackTicks = json.endOfTrackTicks;
		}

		for (const number in json.controlChanges) {
			if (json.controlChanges[number]) {
				json.controlChanges[number].forEach((cc) => {
					this.addCC({
						number: cc.number,
						ticks: cc.ticks,
						value: cc.value,
					});
				});
			}
		}

		json.notes.forEach((n) => {
			this.addNote({
				durationTicks: n.durationTicks,
				midi: n.midi,
				ticks: n.ticks,
				velocity: n.velocity,
			});
		});
	}

	/**
	 * Convert the track into a JSON format.
	 */
	toJSON(): TrackJSON {
		// Convert all the CCs to JSON.
		const controlChanges = {};
		for (let i = 0; i < 127; i++) {
			if (this.controlChanges.hasOwnProperty(i)) {
				controlChanges[i] = this.controlChanges[i].map((c) =>
					c.toJSON()
				);
			}
		}

		const json: TrackJSON = {
			channel: this.channel,
			controlChanges,
			pitchBends: this.pitchBends.map((pb) => pb.toJSON()),
			instrument: this.instrument.toJSON(),
			name: this.name,
			notes: this.notes.map((n) => n.toJSON()),
		};

		if (this.endOfTrackTicks !== undefined) {
			json.endOfTrackTicks = this.endOfTrackTicks;
		}

		return json;
	}
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
