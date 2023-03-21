import { ControlChange, ControlChangeJSON } from "./ControlChange";
export interface ControlChanges {
    [key: string]: ControlChange[];
    [key: number]: ControlChange[];
}
export interface ControlChangesJSON {
    [key: string]: ControlChangeJSON[];
    [key: number]: ControlChangeJSON[];
}
/**
 * Automatically creates an alias for named control values using Proxies
 * @hidden
 */
export declare function createControlChanges(): ControlChanges;
