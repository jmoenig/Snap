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

/*global modules, List, StageMorph, Costume, SpeechSynthesisUtterance, Sound,
IDE_Morph, CamSnapshotDialogMorph, SoundRecorderDialogMorph, SpriteMorph,
isSnapObject*/

modules.extensions = '2021-June-16';

// Global stuff

var SnapExtensions = new Map();

/*
    SnapExtensions is a global dictionary of named functions which appear
    in the drop-down menus of the hidden extension "primitive" blocks sorted
    alphabetically.

    naming conventions
    ------------------
    domain-prefix_function-name(parameter-list)
    example: 'lst_sort(list, fn)'

    - domain-prefix:    max 3-letter lowercase identifier
                        followed by an underscore
               e.g.:    err_, lst_, txt_, dta_, map_, tts_, xhr_, geo_, mda_

    - function-name: short, single word if possible, lowercase
    - parameter-list: comma separated names or type indicators

    function semantics
    ------------------
    - functions are called by the "primitive" blocks with any arguments provided
    - "this" refers to the current snap object (sprite or stage) at call-time
    - a reference to the current process is always passed as last argument
*/

// errors & exceptions (err_):

SnapExtensions.set(
    'err_error(msg)',
    function (msg) {
        throw new Error(msg);
    }
);

SnapExtensions.set(
    'err_try(cmd, catch, err)',
    function (action, exception, errVarName, proc) {
        proc.tryCatch(action, exception, errVarName);
    }
);

SnapExtensions.set(
    'err_reset',
    function (proc) {
        proc.resetErrorHandling();
    }
);

// list utils (lst_):

SnapExtensions.set(
    'lst_sort(list, fn)',
    function (data, fn, proc) {
        return proc.reportAtomicSort(data, fn);
    }
);

SnapExtensions.set(
    'lst_linked(list)',
    function (data) {
        return data.isLinked;
    }
);

// text utils (txt_):

SnapExtensions.set(
    'txt_lowercase(txt)',
    function (txt) {
        return txt.toLowerCase();
    }
);

// data sciene & frequency distribution analysis (dta_):

SnapExtensions.set(
    'dta_analyze(list)',
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
    'dta_group(list, fn)',
    function (data, fn, proc) {
        return proc.reportAtomicGroup(data, fn);
    }
);

// World map (map_):

SnapExtensions.set(
    'map_zoom',
    function () {
        return this.parentThatIsA(StageMorph).worldMap.zoom;
    }
);

SnapExtensions.set(
    'map_zoom(n)',
    function (num) {
        this.parentThatIsA(StageMorph).worldMap.setZoom(num);
    }
);

SnapExtensions.set(
    'map_lon(x)',
    function (x) {
        return this.parentThatIsA(StageMorph).worldMap.lonFromSnapX(x);
    }
);

SnapExtensions.set(
    'map_lat(y)',
    function (y) {
        return this.parentThatIsA(StageMorph).worldMap.latFromSnapY(y);
    }
);

SnapExtensions.set(
    'map_view(lon, lat)',
    function (lon, lat) {
        this.parentThatIsA(StageMorph).worldMap.setView(lon, lat);
    }
);

SnapExtensions.set(
    'map_y(lat)',
    function (lat) {
        return this.parentThatIsA(StageMorph).worldMap.snapYfromLat(lat);
    }
);

SnapExtensions.set(
    'map_x(lon)',
    function (lon) {
        return this.parentThatIsA(StageMorph).worldMap.snapXfromLon(lon);
    }
);

SnapExtensions.set(
    'map_pan(x, y)',
    function (x, y) {
        this.parentThatIsA(StageMorph).worldMap.panBy(x, y);
    }
);

SnapExtensions.set(
    'map_dist(lat1, lon1, lat2, lon2)',
    function (lat1, lon1, lat2, lon2) {
        return this.parentThatIsA(StageMorph).worldMap.distanceInKm(
            lat1,
            lon1,
            lat2,
            lon2
        );
    }
);

SnapExtensions.set(
    'map_update',
    function () {
        var stage = this.parentThatIsA(StageMorph);
        stage.worldMap.extent = stage.dimensions;
        stage.worldMap.render();
    }
);

SnapExtensions.set(
    'map_loaded',
    function () {
        return !this.parentThatIsA(StageMorph).worldMap.loading;
    }
);

SnapExtensions.set(
    'map_costume',
    function () {
        return new Costume(
            this.parentThatIsA(StageMorph).worldMap.canvas,
            'map'
        );
    }
);

SnapExtensions.set(
    'map_style(name)',
    function (name) {
        this.parentThatIsA(StageMorph).worldMap.setHost(name);
    }
);

// text-to-speech (tts_):

SnapExtensions.set(
    'tts_speak(txt, lang, pitch, rate)',
    function (msg, accent, pitch, rate) {
        var utter = new SpeechSynthesisUtterance(msg),
            isDone = false;
        utter.lang = accent;
        utter.pitch = pitch;
        utter.rate = rate;
        utter.onend = () => isDone = true;
        window.speechSynthesis.speak(utter);
        return () => isDone;
    }
);

// XHR:

SnapExtensions.set(
    'xhr_request(mth, url, dta, hdrs)',
    function (method, url, data, headers, proc) {
        var response, i, header;
        if (!proc.httpRequest) {
            proc.httpRequest = new XMLHttpRequest();
            proc.httpRequest.open(method, url, true);
            proc.assertType(headers, 'list');
            for (i = 1; i <= headers.length(); i += 1) {
                header = headers.at(i);
                proc.assertType(header, 'list');
                proc.httpRequest.setRequestHeader(
                    header.at(1),
                    header.at(2)
                );
            }
            proc.httpRequest.send(data || null);
        } else if (proc.httpRequest.readyState === 4) {
            response = proc.httpRequest.responseText;
            proc.httpRequest = null;
            return response;
        }
        proc.pushContext('doYield');
        proc.pushContext();
    }
);

// Geo-location (geo_)

SnapExtensions.set(
    'geo_location(acc?)',
    function (includeAccuracy) {
        var crd = new List(),
            myself = this,
            options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };

        function success(pos) {
            crd = new List([
                pos.coords.latitude,
                pos.coords.longitude
            ]);
            if (includeAccuracy) {
                crd.add(pos.coords.accuracy);
            }
        }

        function error(err) {
            crd = new List([37.872099, -122.257852]);
            myself.inform('Warning:\nGeolocation failed.');
        }

        navigator.geolocation.getCurrentPosition(
            success,
            error,
            options
        );
        return () => crd;
    }
);

// MediaComp (mda_)

SnapExtensions.set(
    'mda_snap',
    function () {
        var camDialog,
            result = false;
        camDialog = new CamSnapshotDialogMorph(
            this.parentThatIsA(IDE_Morph),
            this,
            () => result = null,
            function (costume) {
                result = costume;
                this.close();
            }
        );
        camDialog.key = 'camera';
        camDialog.popUp(this.world());
        return () => result;
    }
);

SnapExtensions.set(
    'mda_record',
    function () {
        var soundRecorder,
            result = false;
        soundRecorder = new SoundRecorderDialogMorph(
            function (audio) {
                if (audio) {
                    result = new Sound(audio, 'recording');
                } else {
                    result = null;
                    this.destroy();
                }
            }
        );

        soundRecorder.cancel = function () {
            result = null;
            this.destroy();
        };

        soundRecorder.key = 'microphone';
        soundRecorder.popUp(this.world());
        return () => result;
    }
);

// Database (db_):

SnapExtensions.set(
    'db_store(key, val)',
    function (key, value, proc) {
        proc.assertType(key, ['text', 'number']);
        proc.assertType(value, ['text', 'number']);
        window.localStorage.setItem('-snap-project-' + key, '' + value);
    }
);

SnapExtensions.set(
    'db_getall',
    function () {
        var str = window.localStorage,
            len = str.length,
            result = [],
            key,
            i;
        for (i = 0; i < len; i += 1) {
            key = str.key(i);
            if (key.startsWith('-snap-project-')) {
                result.push(new List([key.slice(14), str.getItem(key)]));
            }
        }
        return new List(result);
    }
);

SnapExtensions.set(
    'db_remove(key)',
    function (key, proc) {
        proc.assertType(key, ['text', 'number']);
        window.localStorage.removeItem('-snap-project-' + key);
    }
);

SnapExtensions.set(
    'db_get(key)',
    function (key) {
        var str = window.localStorage,
            result = str.getItem('-snap-project-'+key);
        if (!result) {
           return false;
        }
        return result;
    }
);

// Object properties (obj_)

SnapExtensions.set(
    'obj_name(obj, name)',
    function (obj, name, proc) {
        var ide = this.parentThatIsA(IDE_Morph);
        proc.assertType(obj, [SpriteMorph, StageMorph, Costume, Sound]);
        if (isSnapObject(obj)) {
            obj.setName(ide.newSpriteName(name, obj));
            ide.recordUnsavedChanges();
        } else if (obj instanceof Costume) {
            obj.name = this.newCostumeName(name, obj);
            obj.version = Date.now();
            ide.hasChangedMedia = true;
            ide.recordUnsavedChanges();
        } else if (obj instanceof Sound) {
            obj.name = ide.newSoundName(name);
            ide.hasChangedMedia = true;
            ide.recordUnsavedChanges();
        }
    }
);
