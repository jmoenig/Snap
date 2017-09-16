```
/*

    objects.js

    a scriptable microworld
    based on morphic.js, blocks.js and threads.js
    inspired by Scratch

    written by Jens Mönig
    jens@moenig.org

    Copyright (C) 2017 by Jens Mönig

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


    prerequisites:
    --------------
    needs blocks.js, threads.js, morphic.js and widgets.js


    toc
    ---
    the following list shows the order in which all constructors are
    defined. Use this list to locate code in this document:

        SpriteMorph
        SpriteHighlightMorph
        StageMorph
        Costume
            SVG_Costume
        CostumeEditorMorph
        Sound
        Note
        CellMorph
        WatcherMorph
        StagePrompterMorph

        SpeechBubbleMorph*
            SpriteBubbleMorph

    * defined in Morphic.js


    credits
    -------
    Ian Reynolds contributed initial porting of primitives from Squeak and
    sound handling
    Achal Dave contributed research and prototyping for creating music
    using the Web Audio API
    Yuan Yuan and Dylan Servilla contributed graphic effects for costumes

*/
```