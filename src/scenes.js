/*

    scenes.js

    multi-scene support for Snap!

    written by Jens Mönig
    jens@moenig.org

    Copyright (C) 2022 by Jens Mönig

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

    Project
    Scene

    credits
    -------
    scenes have been inspired by Ted Kaehlers's personal demos of HyperCard
    and many discussions with Ted about the design and practice of HyperCard,
    and by personal discussions with Wolfgang Slany about his design of
    scenes in Catrobat/PocketCode, which I love and admire.

*/

/*global modules, VariableFrame, StageMorph, SpriteMorph, Process, List,
normalizeCanvas, SnapSerializer, Costume, ThreadManager, IDE_Morph*/

/*jshint esversion: 6*/

// Global stuff ////////////////////////////////////////////////////////

modules.scenes = '2022-March-04';

// Projecct /////////////////////////////////////////////////////////

// I am a container for a set of one or more Snap! scenes,
// the IDE operates on an instance of me

// Project instance creation:

function Project(scenes, current) {
    var projectScene;

    this.scenes = scenes || new List();
    this.currentScene = current;

    // proxied for display
    this.name = null;
    this.notes = null;
    this.thumbnail = null;

    projectScene = this.scenes.at(1);
    if (projectScene) {
        this.name = projectScene.name;
        this.notes = projectScene.notes;
        this.thumbnail = normalizeCanvas(
            projectScene.stage.thumbnail(SnapSerializer.prototype.thumbnailSize)
        );
    }

    // for deserializing - do not persist
    this.sceneIdx = null;

    // for undeleting scenes - do not persist
    this.trash = [];
}

Project.prototype.initialize = function () {
    // initialize after deserializing
    // only to be called by store
    this.currentScene = this.scenes.at(+this.sceneIdx || 1);
    return this;
};

Project.prototype.addDefaultScene = function () {
    var scene = new Scene();
    scene.addDefaultSprite();
    this.scenes.add(scene);
};

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
    this.hasUnsavedEdits = false;
    this.unifiedPalette = false;
    this.showCategories = true;
    this.showPaletteButtons = true;

    // cached IDE state
    this.sprites = new List();
    this.currentSprite = null;

    // global settings (shared)
    this.hiddenPrimitives = {};
    this.codeMappings = {};
    this.codeHeaders = {};
    this.customCategories = new Map(); // key: name, value: color

    // global settings (copied)
    this.enableCodeMapping = false;
    this.enableInheritance = true;
    this.enableSublistIDs = false;
    this.enablePenLogging = false;
    this.useFlatLineEnds = false;
    this.enableLiveCoding = false;
    this.enableHyperOps = true;
    this.disableClickToRun = false;
    this.penColorModel = 'hsv'; // can also bei 'hsl'

    // for deserializing - do not persist
    this.spritesDict = {};
    this.targetStage = null;
    this.spriteIdx = null;

    // for undeleting sprites - do not persist
    this.trash = [];
}

Scene.prototype.initialize = function () {
    // initialize after deserializing
    // only to be called by store
    var objs = this.stage.children.filter(
        child => child instanceof SpriteMorph
    );
    objs.sort((x, y) => x.idx - y.idx);
    this.sprites = new List(objs);
    if (this.spriteIdx === null && this.sprites.length() > 0) {
        this.currentSprite = this.sprites.at(1);
    } else if (this.spriteIdx === 0) {
        this.currentSprite = this.stage;
    } else {
        this.currentSprite = this.sprites.at(this.spriteIdx) ||
            this.stage;
    }
    return this;
};

Scene.prototype.addDefaultSprite = function () {
    var sprite = new SpriteMorph(this.globalVariables);
    sprite.setPosition(
        this.stage.center().subtract(
            sprite.extent().divideBy(2)
        )
    );
    this.stage.add(sprite);
    this.sprites.add(sprite);
    this.currentSprite = sprite;
    return sprite;
};

// Scene - capturing global state locally:

Scene.prototype.captureGlobalSettings = function () {
    this.hiddenPrimitives = StageMorph.prototype.hiddenPrimitives;
    this.codeMappings = StageMorph.prototype.codeMappings;
    this.codeHeaders = StageMorph.prototype.codeHeaders;
    this.enableCodeMapping = StageMorph.prototype.enableCodeMapping;
    this.enableInheritance = StageMorph.prototype.enableInheritance;
    this.enableSublistIDs = StageMorph.prototype.enableSublistIDs;
    this.enablePenLogging = StageMorph.prototype.enablePenLogging;
    this.useFlatLineEnds = SpriteMorph.prototype.useFlatLineEnds;
    this.enableLiveCoding = Process.prototype.enableLiveCoding;
    this.enableHyperOps = Process.prototype.enableHyperOps;
    this.customCategories = SpriteMorph.prototype.customCategories;
    this.disableClickToRun = ThreadManager.prototype.disableClickToRun;
    this.penColorModel = SpriteMorph.prototype.penColorModel;
};

Scene.prototype.applyGlobalSettings = function () {
    Costume.prototype.maxDimensions = this.stage.dimensions;
    StageMorph.prototype.hiddenPrimitives = this.hiddenPrimitives;
    StageMorph.prototype.codeMappings = this.codeMappings;
    StageMorph.prototype.codeHeaders = this.codeHeaders;
    StageMorph.prototype.enableCodeMapping = this.enableCodeMapping;
    StageMorph.prototype.enableInheritance = this.enableInheritance;
    StageMorph.prototype.enableSublistIDs = this.enableSublistIDs;
    StageMorph.prototype.enablePenLogging = this.enablePenLogging;
    SpriteMorph.prototype.useFlatLineEnds = this.useFlatLineEnds;
    Process.prototype.enableLiveCoding = this.enableLiveCoding;
    Process.prototype.enableHyperOps = this.enableHyperOps;
    SpriteMorph.prototype.customCategories = this.customCategories;
    ThreadManager.prototype.disableClickToRun = this.disableClickToRun;
    SpriteMorph.prototype.penColorModel = this.penColorModel;
};

// Scene ops:

Scene.prototype.updateTrash = function () {
    this.trash = this.trash.filter(sprite => sprite.isCorpse);
};

Scene.prototype.stop = function (forGood) {
    var ide;
    if (this.stage.enableCustomHatBlocks || forGood) {
        this.stage.threads.pauseCustomHatBlocks = forGood ? true
            : !this.stage.threads.pauseCustomHatBlocks;
    } else {
        this.stage.threads.pauseCustomHatBlocks = false;
    }
    this.stage.stopAllActiveSounds();
    this.stage.threads.resumeAll(this.stage);
    this.stage.keysPressed = {};
    this.stage.runStopScripts();
    this.stage.threads.stopAll();
    if (this.stage.projectionSource) {
        this.stage.stopProjection();
    }
    this.stage.children.forEach(morph => {
        if (morph.stopTalking) {
            morph.stopTalking();
        }
    });
    this.stage.removeAllClones();
    ide = this.stage.parentThatIsA(IDE_Morph);
    if (ide) {
        ide.controlBar.pauseButton.refresh();
        ide.controlBar.stopButton.refresh();
    }
};
