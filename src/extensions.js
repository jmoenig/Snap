/*

    extensions.js

    additional primitives for SNAP!

    written by Jens Mönig

    Copyright (C) 2021 by Jens Mönig

    This file is part of Snap!.

    Snap! is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of
    the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

// Global settings /////////////////////////////////////////////////////

/*global modules, List*/

modules.extensions = '2021-June-14';

// Global stuff

var SnapExtensions = new Map();

// exceptions:

SnapExtensions.set(
    'error(msg)',
    function (msg) {
        throw new Error(msg);
    }
);

// list utils:

SnapExtensions.set(
    'sort(list, fn)',
    function (data, fn, proc) {
        return proc.reportAtomicSort(data, fn);
    }
);

SnapExtensions.set(
    'linked(list)',
    function (data) {
        return data.isLinked;
    }
);

// text utils:

SnapExtensions.set(
    'lowercase(txt)',
    function (txt) {
        return txt.toLowerCase();
    }
);

// frequency distribution analysis:

SnapExtensions.set(
    'analyze(list)',
    function (list) {
        var dict = new Map(),
            result = [],
            data = list.itemsArray(),
            len = data.length,
            i;
        for (i = 0; i < len; i += 1) {
            if (dict.has(data[i])) {
                dict.set(data[i], dict.get(data[i]) + 1);
            } else {
                dict.set(data[i], 1);
            }
        }
        dict.forEach(function (value, key) {
            result.push(new List([key, value]));
        });
        return new List(result);
    }
);

SnapExtensions.set(
    'group(list, fn)',
    function (data, fn, proc) {
        return proc.reportAtomicGroup(data, fn);
    }
);
