/*

    santa.js

    XMas themed skin for Snap! hat blocks

    written by Jens Mönig
    jens@moenig.org

    Copyright (C) 2024 by Jens Mönig

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
    needs blocks.js, gui.js and morphic.js

*/

/*global modules, HatBlockMorph, MorphicPreferences, Color, radians, degrees,
WHITE, IDE_Morph*/

/*jshint esversion: 6*/

// Global stuff ////////////////////////////////////////////////////////

modules.santa = '2024-December-04';

// HatBlockMorph Xmas Skin (2024)

HatBlockMorph.prototype.xmasSkin =
    IDE_Morph.prototype.getSetting('skin') === 'xmas';

HatBlockMorph.prototype.render = function (ctx) {
    if (this.xmasSkin) {
        this.renderHatLess(ctx);
        switch (this.selector) {
        case 'receiveKey':
            return this.renderTrumpetHat(ctx);
        case 'receiveInteraction':
            return this.renderStarHat(ctx);
        case 'receiveCondition':
        case 'receiveConditionEvent':
            return this.renderAdventHat(ctx);
        case 'receiveMessage':
            return this.renderGiftHat(ctx);
        case 'receiveOnClone':
            return this.renderPretzelHat(ctx);
        default:
            return this.renderSantaHat(ctx);
        }
    }
    HatBlockMorph.uber.render.call(this, ctx);
};

HatBlockMorph.prototype.renderHatLess = function (ctx) {
    this.cachedClr = this.color.toString();
    this.cachedClrBright = this.bright();
    this.cachedClrDark = this.dark();

    if (MorphicPreferences.isFlat) {
        // draw the outline
        ctx.fillStyle = this.cachedClrDark;
        ctx.beginPath();
        this.noHatOutlinePath(ctx, 0);
        ctx.closePath();
        ctx.fill();

        // draw the inner filled shaped
        ctx.fillStyle = this.cachedClr;
        ctx.beginPath();
        this.noHatOutlinePath(ctx, this.flatEdge);
        ctx.closePath();
        ctx.fill();
    } else {
        // draw the flat shape
        ctx.fillStyle = this.cachedClr;
        ctx.beginPath();
        this.noHatOutlinePath(ctx, 0);
        ctx.closePath();
        ctx.fill();

        // add 3D-Effect:
        this.drawTopDentEdge(ctx, 0, 0);
        this.drawBottomDentEdge(ctx, 0, this.height() - this.corner);
        this.drawLeftEdge(ctx);
        this.drawRightEdge(ctx);
        this.drawBottomRightEdge(ctx);
    }
};

HatBlockMorph.prototype.noHatOutlinePath = function (ctx, inset) {
    var indent = this.corner * 2 + this.inset,
        bottom = this.height() - this.corner,
        bottomCorner = this.height() - this.corner * 2,
        radius = Math.max(this.corner - inset, 0),
        h = this.hatHeight;

    ctx.moveTo(inset, h + inset);

    // top right:
    ctx.arc(
        this.width() - this.corner,
        h + this.corner,
        radius,
        radians(-90),
        radians(-0),
        false
    );

    // bottom right:
    ctx.arc(
        this.width() - this.corner,
        bottomCorner,
        radius,
        radians(0),
        radians(90),
        false
    );

    if (!this.isStop()) {
        ctx.lineTo(this.width() - this.corner, bottom - inset);
        ctx.lineTo(this.corner * 3 + this.inset + this.dent, bottom - inset);
        ctx.lineTo(indent + this.dent, bottom + this.corner - inset);
        ctx.lineTo(indent, bottom + this.corner - inset);
        ctx.lineTo(this.corner + this.inset, bottom - inset);
    }

    // bottom left:
    ctx.arc(
        this.corner,
        bottomCorner,
        radius,
        radians(90),
        radians(180),
        false
    );
};

HatBlockMorph.prototype.renderSantaHat = function (ctx) {
    // draw Santa Hat
    ctx.fillStyle = new Color(200, 0, 0).toString();
    ctx.beginPath();
    this.santaHatPath(ctx, 0);
    ctx.closePath();
    ctx.fill();

    // top outline
    this.cachedClr = new Color(255, 0, 0).toString();
    this.cachedClrBright = new Color(200, 200, 200).toString();
    // top arc:
    ctx.strokeStyle = this.cachedClr;
    ctx.lineWidth = this.corner / 4;
    ctx.beginPath();
    this.santaHatTopPath(ctx);
    ctx.stroke();

    // hat bottom outline
    ctx.strokeStyle = new Color(100, 0, 0).toString();
    ctx.lineWidth = this.corner / 4;
    ctx.beginPath();
    ctx.arc(
        this.hatWidth * 0.9,
            this.hatHeight + this.corner * 6,
        this.hatWidth / 3,
        radians(-70),
        radians(-140),
        true
    );
    ctx.stroke();

    // brim
    ctx.strokeStyle = new Color(150, 150, 150).toString();
    ctx.lineWidth = this.corner * 2;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(this.corner * 0.75, this.hatHeight + this.corner * 0.5);
    ctx.lineTo(
        this.hatWidth * 0.6 + this.corner,
        this.hatHeight + this.corner * 0.5
    );
    ctx.stroke();

    ctx.strokeStyle = WHITE.toString();
    ctx.lineWidth = this.corner * 1.3;
    ctx.beginPath();
    ctx.moveTo(this.corner, this.hatHeight + this.corner * 0.4);
    ctx.lineTo(
        this.hatWidth * 0.6 + this.corner,
        this.hatHeight + this.corner * 0.4
    );
    ctx.stroke();

    // bobble
    ctx.fillStyle = new Color(150, 150, 150).toString();
    ctx.beginPath();
    ctx.arc(
        this.hatWidth,
        this.hatHeight * 0.6,
        this.corner * 2,
        radians(0),
        radians(360),
        false
    );
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = WHITE.toString();
    ctx.beginPath();
    ctx.arc(
        this.hatWidth,
        this.hatHeight * 0.5,
        this.corner * 1.2,
        radians(0),
        radians(360),
        false
    );
    ctx.closePath();
    ctx.fill();

    this.cachedClr = this.color.toString();
    this.cachedClrBright = this.bright();
    this.cachedClrDark = this.dark();

    // draw infinity / chain link icon if applicable
    if (this.isRuleHat()) {
        this.drawRuleIcon(ctx);
    }

    // draw location pin icon if applicable
    if (this.hasLocationPin()) {
        this.drawMethodIcon(ctx);
    }
};

HatBlockMorph.prototype.renderAdventHat = function (ctx) {
    var i;

    // wreath
    ctx.strokeStyle = new Color(0, 100, 0).toString();
    ctx.lineWidth = this.corner * 2;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(this.corner * 0.75, this.hatHeight + this.corner * 0.5);
    ctx.lineTo(
        this.hatWidth * 0.6 + this.corner,
        this.hatHeight + this.corner * 0.5
    );
    ctx.stroke();

    ctx.strokeStyle = new Color(0, 200, 0).toString();
    ctx.lineWidth = this.corner * 1.3;
    ctx.beginPath();
    ctx.moveTo(this.corner, this.hatHeight + this.corner * 0.4);
    ctx.lineTo(
        this.hatWidth * 0.6 + this.corner,
        this.hatHeight + this.corner * 0.4
    );
    ctx.stroke();

    // candles

    for (i = 1; i < 5; i +=1 ) {
        ctx.strokeStyle = new Color(100, 0, 0).toString();
        ctx.lineWidth = this.corner * 2;
        ctx.lineCap = 'butt';
        ctx.beginPath();
        ctx.moveTo(this.corner * 3 * i, this.hatHeight);
        ctx.lineTo(this.corner * 3 * i, this.corner);
        ctx.stroke();

        ctx.strokeStyle = new Color(200, 0, 0).toString();
        ctx.lineWidth = this.corner * 1.3;
        ctx.beginPath();
        ctx.moveTo(this.corner * 3 * i, this.hatHeight);
        ctx.lineTo(this.corner * 3 * i, this.corner);
        ctx.stroke();

        // flames
        ctx.shadowColor = WHITE.toString();
        ctx.shadowBlur = this.corner;

        ctx.strokeStyle = new Color(255, 255, 200).toString();
        ctx.lineWidth = this.corner * 1.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(this.corner * 3 * i, this.corner);
        ctx.lineTo(this.corner * 3 * i, this.corner);
        ctx.stroke();

        ctx.strokeStyle = new Color(255, 255, 100).toString();
        ctx.lineWidth = this.corner * 0.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(this.corner * 3 * i, this.corner);
        ctx.lineTo(this.corner * 3 * i, 0);
        ctx.stroke();

        ctx.shadowBlur = 0;
    }

    this.cachedClr = this.color.toString();
    this.cachedClrBright = this.bright();
    this.cachedClrDark = this.dark();

    // draw infinity / chain link icon if applicable
    if (this.isRuleHat()) {
        this.drawRuleIcon(ctx);
    }

    // draw location pin icon if applicable
    if (this.hasLocationPin()) {
        this.drawMethodIcon(ctx);
    }
};

HatBlockMorph.prototype.santaHatTopPath = function (ctx) {
    var s = this.hatWidth,
        h = this.hatHeight,
        r = ((4 * h * h) + (s * s)) / (8 * h),
        a = degrees(4 * Math.atan(2 * h / s)),
        sa = a / 2;

    ctx.moveTo(0, this.hatHeight + this.corner);
    ctx.arc(
        s / 2,
        r + (this.corner / 8),
        r,
        radians(-sa - 90),
        radians(-75),
        false
    );
};

HatBlockMorph.prototype.renderTrumpetHat = function (ctx) {
    ctx.strokeStyle = new Color(150, 150, 50).toString();
    ctx.fillStyle = new Color(150, 150, 50).toString();
    ctx.lineWidth = this.corner * 2;
    this.drawTrumpet(ctx);
    ctx.strokeStyle = new Color(255, 255, 100).toString();
    ctx.fillStyle = new Color(255, 255, 100).toString();
    ctx.lineWidth = this.corner * 1;
    this.drawTrumpet(ctx);
};

HatBlockMorph.prototype.drawTrumpet = function (ctx) {
    var i;

    // trumpet
    ctx.lineJoin = 'miter';
    ctx.beginPath();
    ctx.roundRect(
        this.corner * 5,
        this.corner * 2,
        this.hatWidth * 0.3,
        this.hatHeight * 0.7,
        [0, 0, this.corner * 2, this.corner * 2]
    );
    ctx.stroke();

    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(this.corner * 2, this.corner * 2);
    ctx.lineTo(this.corner * 5, this.corner * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.corner * 5 + this.hatWidth * 0.3, this.corner * 1.5);
    ctx.lineTo(this.hatWidth * 0.7, this.corner * 2 - ctx.lineWidth);
    ctx.lineTo(this.hatWidth * 0.7, this.corner * 2 + ctx.lineWidth);
    ctx.lineTo(this.corner * 5 + this.hatWidth * 0.3, this.corner * 2.5);
    ctx.closePath();

    ctx.fill();

    // keys
    for (i = 1; i < 4; i +=1 ) {
        ctx.beginPath();
        ctx.moveTo(this.corner * 4 + this.corner * 2 * i, this.corner * 2);
        ctx.lineTo(this.corner * 4 + this.corner * 2 * i, this.corner);
        ctx.stroke();
    }

    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    this.cachedClr = this.color.toString();
    this.cachedClrBright = this.bright();
    this.cachedClrDark = this.dark();
};

HatBlockMorph.prototype.renderStarHat = function (ctx) {
    // tail
    ctx.lineWidth = this.edge;
    ctx.strokeStyle = new Color(100, 100, 100).toString();
    ctx.fillStyle = new Color(200, 200, 200).toString();

    this.starTailPath(ctx);
    ctx.stroke();

    ctx.fillStyle = WHITE.toString();
    this.starTailPath(ctx);
    ctx.fill();

    // star
    this.starPath(ctx);
    ctx.stroke();

    ctx.fillStyle = WHITE.toString();
    this.starPath(ctx);
    ctx.fill();
};

HatBlockMorph.prototype.starTailPath = function (ctx) {
    ctx.beginPath();
    ctx.arc(
        this.hatWidth * 0.65,
        this.hatHeight * 3,
        this.hatWidth * 0.5,
        radians(-130),
        radians(-50),
        false
    );
    ctx.lineTo(this.hatWidth * 0.8, this.hatHeight - this.corner * 1.5);
    ctx.arc(
        this.hatWidth * 0.5,
        this.hatHeight * 3.7,
        this.hatWidth * 0.5,
        radians(-50),
        radians(-110),
        true
    );
    ctx.closePath();
};

HatBlockMorph.prototype.starPath = function (ctx) {
    ctx.beginPath();
    ctx.moveTo(this.edge, this.hatHeight * 0.8);
    ctx.lineTo(this.corner * 3, this.hatHeight);
    ctx.lineTo(this.corner * 2, this.hatHeight + this.corner);
    ctx.lineTo(this.corner * 5, this.hatHeight);
    ctx.lineTo(this.corner * 6, this.hatHeight + this.corner);
    ctx.lineTo(this.corner * 7, this.hatHeight);
    ctx.lineTo(this.corner * 9, this.hatHeight + this.corner);
    ctx.lineTo(this.corner * 8, this.hatHeight - this.corner);
    ctx.lineTo(this.corner * 12, this.hatHeight - this.corner * 2);
    ctx.lineTo(this.corner * 8, this.corner * 2);
    ctx.lineTo(this.corner * 8.5, this.edge);
    ctx.lineTo(this.corner * 6, this.corner * 1.5);
    ctx.lineTo(this.corner * 5, this.edge);
    ctx.lineTo(this.corner * 4.5, this.corner * 2);
    ctx.lineTo(this.corner * 1.5, this.corner * 0.5);
    ctx.lineTo(this.corner * 3, this.corner * 2.5);
    ctx.closePath();
};

HatBlockMorph.prototype.renderGiftHat = function (ctx) {
    // parcel
    ctx.fillStyle = new Color(0, 0, 255).toString();
    ctx.beginPath();
    ctx.rect(
        this.corner * 2,
        this.corner ,
        this.hatWidth * 0.3,
        this.hatHeight
    );
    ctx.fill();

    ctx.fillStyle = new Color(100, 100, 255).toString();
    ctx.beginPath();
    ctx.moveTo(this.corner * 2, this.corner);
    ctx.lineTo(this.corner * 3, 0);
    ctx.lineTo(this.corner * 3 + this.hatWidth * 0.3, 0);
    ctx.lineTo(this.corner * 2 + this.hatWidth * 0.3, this.corner);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = new Color(0, 0, 100).toString();
    ctx.beginPath();
    ctx.moveTo(this.corner * 3 + this.hatWidth * 0.3, 0);
    ctx.lineTo(this.corner * 2 + this.hatWidth * 0.3, this.corner);
    ctx.lineTo(
        this.corner * 2 + this.hatWidth * 0.3,
        this.corner + this.hatHeight
    );
    ctx.lineTo(this.corner * 3 + this.hatWidth * 0.3, this.hatHeight);
    ctx.closePath();
    ctx.fill();

    // ribbon
    ctx.strokeStyle = new Color(200, 0, 0).toString();
    ctx.lineCap = 'butt';
    ctx.lineWidth = this.corner;

    // horizontal
    ctx.beginPath();
    ctx.moveTo(this.corner * 2, this.corner + this.hatHeight * 0.5);
    ctx.lineTo(
        this.corner * 2 + this.hatWidth * 0.3,
        this.corner + this.hatHeight * 0.5
    );
    ctx.stroke();

    // vertical
    ctx.beginPath();
    ctx.moveTo(this.corner * 2 + this.hatWidth * 0.15, this.corner);
    ctx.lineTo(
        this.corner * 2 + this.hatWidth * 0.15,
        this.corner + this.hatHeight
    );
    ctx.stroke();

    // loop
    ctx.strokeStyle = new Color(250, 0, 0).toString();
    ctx.lineWidth = this.corner * 0.5;

    ctx.beginPath();
    ctx.ellipse(
        this.corner * 3 + this.hatWidth * 0.15,
        this.corner * 0.7,
        this.corner * 0.5,
        this.corner * 0.8,
        radians(60),
        0,
        2 * Math.PI
    );
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(
        this.corner + this.hatWidth * 0.15,
        this.corner * 0.7,
        this.corner * 0.5,
        this.corner,
        radians(-80),
        0,
        2 * Math.PI
    );
    ctx.stroke();
};

HatBlockMorph.prototype.renderPretzelHat = function (ctx) {
    ctx.strokeStyle = new Color(100, 40, 0);
    ctx.lineWidth = this.corner * 1.5;
    this.pretzelHatPath(ctx);

    ctx.strokeStyle = new Color(220, 80, 0);
    ctx.lineWidth = this.corner;
    this.pretzelHatPath(ctx);
};

HatBlockMorph.prototype.pretzelHatPath = function (ctx) {
    var i, x, y;
    ctx.beginPath();
    for (i = 105; i <= 255; i += 1) {
        x = Math.sin(radians(i * 3)) * this.hatWidth * 0.2;
        y = Math.cos(radians(i * 4)) * this.hatHeight * 0.48;
        ctx.lineTo(x + this.hatWidth * 0.3, y + this.hatHeight * 0.65);
    }
    ctx.stroke();
};

HatBlockMorph.prototype.santaHatPath = function (ctx, inset) {
    var s = this.hatWidth,
        h = this.hatHeight,
        r = ((4 * h * h) + (s * s)) / (8 * h),
        a = degrees(4 * Math.atan(2 * h / s)),
        sa = a / 2;

    // top arc:
    ctx.moveTo(inset, h + this.corner);
    ctx.arc(
        s / 2,
        r,
        r,
        radians(-sa - 90),
        radians(-75),
        false
    );

    ctx.arc(
        inset + this.hatWidth * 0.9,
        h + this.corner * 6,
        this.hatWidth / 3,
        radians(-70),
        radians(-140),
        true
    );

};

IDE_Morph.prototype.looksMenu = function () {
    var menu = this.looksMenuData();
    menu.addPreference(
        'Santa Hats',
        () => {
             HatBlockMorph.prototype.xmasSkin =
                !HatBlockMorph.prototype.xmasSkin;
             this.world().changed();
            if (HatBlockMorph.prototype.xmasSkin) {
                this.saveSetting('skin', 'xmas');
            } else {
                this.removeSetting('skin');
            }
        },
        HatBlockMorph.prototype.xmasSkin,
        'uncheck for default\nhat block skin',
        'check for XMas\nhat block skin',
        false
    );
    menu.popup(
        this.world(),
        this.controlBar.settingsButton.bottomLeft()
    );
};
