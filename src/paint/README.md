```
/*
    paint.js

    a paint editor for Snap!
    inspired by the Scratch paint editor.

    written by Kartik Chandra
    Copyright (C) 2016 by Kartik Chandra

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


    toc
    ---
    the following list shows the order in which all constructors are
    defined. Use this list to locate code in this document:

        PaintEditorMorph
        PaintColorPickerMorph
        PaintCanvasMorph


    credits
    -------
    Nathan Dinsmore contributed a fully working prototype,
    Nathan's brilliant flood-fill tool has been more or less
    directly imported into this paint implementation.

    Jens Mönig has contributed icons and bugfixes and says he has probably
    introduced many other bugs in that process. :-)


    revision history
    ----------------
    May 10 - first full release (Kartik)
    May 14 - bugfixes, Snap integration (Jens)
    May 16 - flat design adjustments (Jens)
    July 12 - pipette tool, code formatting adjustments (Jens)
    Sept 16 - flood fill freeze fix (Kartik)
    Jan 08 - mouse leave dragging fix (Kartik)
    Feb 11 - dynamically adjust to stage dimensions (Jens)
    Apr 30 - localizations (Manuel)
    June 3 - transformations (Kartik)
    June 4 - tweaks (Jens)
    Aug 24 - floodfill alpha-integer issue (Kartik)
    Sep 29 - tweaks (Jens)
    Sep 28 [of the following year :)] - Try to prevent antialiasing (Kartik)
    Oct 02 - revert disable smoothing (Jens)
    Dec 15 - center rotation point on costume creating (Craxic)
    Jan 18 - avoid pixel collision detection in PaintCanvas (Jens)
    Mar 22 - fixed automatic rotation center point mechanism (Jens)
    May 10 - retina display support adjustments (Jens)
    2017
    April 10 - getGlobalPixelColor adjustment for Chrome & retina (Jens)
*/
```