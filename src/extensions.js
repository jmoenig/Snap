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

/*global modules, List, StageMorph, Costume*/

modules.extensions = '2021-June-15';

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

// World map:

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
    'map_location',
    function () {
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

        return function () {return crd; };
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
