import { controlChangeIds } from "./ControlChange";
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
export function createControlChanges(): ControlChanges {
	return new Proxy({}, {
		// tslint:disable-next-line: typedef
		get(target, handler) {
			if (target[handler]) {
				return target[handler];
			} else if (controlChangeIds.hasOwnProperty(handler)) {
				return target[controlChangeIds[handler]];
			}
		},
		// tslint:disable-next-line: typedef
		set(target, handler, value) {
			if (controlChangeIds.hasOwnProperty(handler)) {
				target[controlChangeIds[handler]] = value;
			} else {
				target[handler] = value;
			}
			return true;
		},
	});
}
