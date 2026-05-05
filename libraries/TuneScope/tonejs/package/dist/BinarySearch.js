"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insert = exports.search = void 0;
/**
 * Return the index of the element at or before the given property
 * @hidden
 */
function search(array, value, prop) {
    if (prop === void 0) { prop = "ticks"; }
    var beginning = 0;
    var len = array.length;
    var end = len;
    if (len > 0 && array[len - 1][prop] <= value) {
        return len - 1;
    }
    while (beginning < end) {
        // calculate the midpoint for roughly equal partition
        var midPoint = Math.floor(beginning + (end - beginning) / 2);
        var event_1 = array[midPoint];
        var nextEvent = array[midPoint + 1];
        if (event_1[prop] === value) {
            // choose the last one that has the same value
            for (var i = midPoint; i < array.length; i++) {
                var testEvent = array[i];
                if (testEvent[prop] === value) {
                    midPoint = i;
                }
            }
            return midPoint;
        }
        else if (event_1[prop] < value && nextEvent[prop] > value) {
            return midPoint;
        }
        else if (event_1[prop] > value) {
            // search lower
            end = midPoint;
        }
        else if (event_1[prop] < value) {
            // search upper
            beginning = midPoint + 1;
        }
    }
    return -1;
}
exports.search = search;
/**
 * Does a binary search to insert the note
 * in the correct spot in the array
 * @hidden
 */
function insert(array, event, prop) {
    if (prop === void 0) { prop = "ticks"; }
    if (array.length) {
        var index = search(array, event[prop], prop);
        array.splice(index + 1, 0, event);
    }
    else {
        array.push(event);
    }
}
exports.insert = insert;
//# sourceMappingURL=BinarySearch.js.map