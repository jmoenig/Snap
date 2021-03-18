/*

    scenes.js

    multi-scene support for Snap!

    written by Jens Mönig
    jens@moenig.org

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


    prerequisites:
    --------------
    needs morphic.js and objects.js

    toc
    ---
    the following list shows the order in which all constructors are
    defined. Use this list to locate code in this document:

    Scene

    credits
    -------
    scenes have been inspired by Ted Kaehlers's personal demos of HyperCard
    and many discussions with Ted about the design and practice of HyperCard,
    and by personal discussions with Wolfgang Slany about his design of
    scenes in Catrobat/PocketCode, which I love and admire.

*/

// Global stuff ////////////////////////////////////////////////////////

/*global modules, VariableFrame, StageMorph, SpriteMorph*/

modules.scenes = '2021-March-18';

// Scene /////////////////////////////////////////////////////////

// I am a container for a Snap! stage, scene-global variables
// and its associated settings.
// I can be used as a slide in a presentation, a chapter in a narrative,
// a level in a game, etc.

// Scene instance creation:

function Scene(aStageMorph) {
    this.name = '';
    this.notes = '';
    this.globalVariables = aStageMorph ?
        aStageMorph.globalVariables() : new VariableFrame();
    this.stage = aStageMorph || new StageMorph(this.globalVariables);

    // for deserializing - do not persist
    this.sprites = {};
    this.targetStage = null;
}

Scene.prototype.addDefaultSprite = function () {
    var sprite = new SpriteMorph(this.globalVariables);
    sprite.setPosition(
        this.stage.center().subtract(
            sprite.extent().divideBy(2)
        )
    );
    this.stage.add(sprite);
    return sprite;
};
