import type { MidiControllerEvent } from "midi-file";
import { Header } from "./Header";
/**
 * @hidden
 */
export declare type ControlChangeName = "modulationWheel" | "breath" | "footController" | "portamentoTime" | "volume" | "balance" | "pan" | "sustain" | "portamentoTime" | "sostenuto" | "softPedal" | "legatoFootswitch" | "portamentoControl";
interface ControlChangeMap {
    [key: number]: ControlChangeName;
}
/**
 * A map of values to control change names
 * @hidden
 */
export declare const controlChangeNames: ControlChangeMap;
/**
 * swap the keys and values
 * @hidden
 */
export declare const controlChangeIds: {};
/**
 * Represents a control change event
 */
export declare class ControlChange implements ControlChangeInterface {
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
    constructor(event: Partial<MidiControllerEvent & {
        absoluteTime: number;
    }>, header: Header);
    /**
     * The controller number
     */
    get number(): number;
    /**
     * return the common name of the control number if it exists
     */
    get name(): ControlChangeName;
    /**
     * The time of the event in seconds
     */
    get time(): number;
    set time(t: number);
    toJSON(): ControlChangeJSON;
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
export {};
