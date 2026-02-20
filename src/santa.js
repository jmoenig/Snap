/*

    santa.js

    XMas themed skin for Snap! hat blocks and dialogs

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
    needs blocks.js, gui.js, locale.js and morphic.js

*/

/*global modules, HatBlockMorph, DialogBoxMorph, MorphicPreferences, Color,
radians, degrees, WHITE, IDE_Morph, BLACK, PrototypeHatBlockMorph, fontHeight,
SnapTranslator*/

/*jshint esversion: 6*/

// Global stuff ////////////////////////////////////////////////////////

modules.santa = '2025-December-01';

// HatBlockMorph Xmas Skin (2024, 2025)

HatBlockMorph.prototype.xmasSkin =
    IDE_Morph.prototype.getSetting('skin') === 'xmas';

HatBlockMorph.prototype.render = function (ctx) {
    if (this.xmasSkin) {
        this.renderHatLess(ctx);
        if (this instanceof PrototypeHatBlockMorph) {
            return this.renderHouseHat(ctx);
        }
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
        case 'receiveUserEdit':
            return this.renderLetterHat(ctx);
        case 'receiveSlotEvent':
            return this.renderTrainHat(ctx);
        default:
            return this.renderSantaHat(ctx);
        }
    }
    HatBlockMorph.uber.render.call(this, ctx);
};

HatBlockMorph.prototype.renderHatLess = function (ctx) {
    var c = this.corner;

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
        this.drawBottomDentEdge(ctx, 0, this.height() - c);
        this.drawLeftEdge(ctx);
        this.drawRightEdge(ctx);
        this.drawBottomRightEdge(ctx);
    }
};

HatBlockMorph.prototype.noHatOutlinePath = function (ctx, inset) {
    var c = this.corner,
        indent = c * 2 + this.inset,
        bottom = this.height() - c,
        bottomCorner = this.height() - c * 2,
        radius = Math.max(c - inset, 0),
        h = this.hatHeight,
        pos = this.position();

    ctx.moveTo(inset, h + inset);

    // top right:
    ctx.arc(
        this.width() - c,
        h + c,
        radius,
        radians(-90),
        radians(-0),
        false
    );

    // C-Slots
    this.cSlots().forEach(slot => {
        slot.outlinePath(ctx, inset, slot.position().subtract(pos));
    });

    // bottom right:
    ctx.arc(
        this.width() - c,
        bottomCorner,
        radius,
        radians(0),
        radians(90),
        false
    );

    if (!this.isStop()) {
        ctx.lineTo(this.width() - c, bottom - inset);
        ctx.lineTo(c * 3 + this.inset + this.dent, bottom - inset);
        ctx.lineTo(indent + this.dent, bottom + c - inset);
        ctx.lineTo(indent, bottom + c - inset);
        ctx.lineTo(c + this.inset, bottom - inset);
    }

    // bottom left:
    ctx.arc(
        c,
        bottomCorner,
        radius,
        radians(90),
        radians(180),
        false
    );
};

HatBlockMorph.prototype.renderSantaHat = function (ctx) {
    var w = this.hatWidth,
        h = this.hatHeight,
        c = this.corner,
        r = ((4 * h * h) + (w * w)) / (8 * h),
        a = degrees(4 * Math.atan(2 * h / w)),
        sa = a / 2,

        red = new Color(200, 0, 0).toString(),
        brightRed = new Color(255, 0, 0).toString(),
        darkRed = new Color(100, 0, 0).toString(),
        gray = new Color(200, 200, 200).toString(),
        darkGray = new Color(150, 150, 150).toString(),
        white = WHITE.toString(),

        hat = () => {
            // top arc:
            ctx.moveTo(0, h + c);
            ctx.arc(
                w / 2,
                r,
                r,
                radians(-sa - 90),
                radians(-75),
                false
            );
            ctx.arc(
                w * 0.9,
                h + c * 6,
                w / 3,
                radians(-70),
                radians(-140),
                true
            );
        };

    // draw Santa Hat
    ctx.fillStyle = red;
    ctx.beginPath();
    hat();
    ctx.closePath();
    ctx.fill();

    // top outline
    this.cachedClr = brightRed;
    this.cachedClrBright = gray;
    // top arc:
    ctx.strokeStyle = this.cachedClr;
    ctx.lineWidth = c / 4;
    ctx.beginPath();
    hat();
    ctx.stroke();

    // hat bottom outline
    ctx.strokeStyle = darkRed;
    ctx.lineWidth = c / 4;
    ctx.beginPath();
    ctx.arc(
        w * 0.9,
        h + c * 6,
        w / 3,
        radians(-70),
        radians(-140),
        true
    );
    ctx.stroke();

    // brim
    ctx.strokeStyle = darkGray;
    ctx.lineWidth = c * 2;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(c * 0.75, h + c * 0.5);
    ctx.lineTo(
        w * 0.6 + c,
        h + c * 0.5
    );
    ctx.stroke();

    ctx.strokeStyle = white;
    ctx.lineWidth = c * 1.3;
    ctx.beginPath();
    ctx.moveTo(c, h + c * 0.4);
    ctx.lineTo(
        w * 0.6 + c,
        h + c * 0.4
    );
    ctx.stroke();

    // bobble
    ctx.fillStyle = darkGray;
    ctx.beginPath();
    ctx.arc(
        w,
        h * 0.6,
        c * 2,
        radians(0),
        radians(360),
        false
    );
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = white;
    ctx.beginPath();
    ctx.arc(
        w,
        h * 0.5,
        c * 1.2,
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
    var c = this.corner,
        w = this.hatWidth,
        h = this.hatHeight,
        i,

        red = new Color(200, 0, 0).toString(),
        darkRed = new Color(100, 0, 0).toString(),
        green = new Color(0, 200, 0).toString(),
        darkGreen = new Color(0, 100, 0).toString(),
        yellow = new Color(255, 255, 100).toString(),
        brightYellow = new Color(255, 255, 200).toString(),
        white = WHITE.toString();

    // wreath
    ctx.strokeStyle = darkGreen;
    ctx.lineWidth = c * 2;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(c * 0.75, h + c * 0.5);
    ctx.lineTo(
        w * 0.6 + c,
        h + c * 0.5
    );
    ctx.stroke();

    ctx.strokeStyle = green;
    ctx.lineWidth = c * 1.3;
    ctx.beginPath();
    ctx.moveTo(c, h + c * 0.4);
    ctx.lineTo(
        w * 0.6 + c,
        h + c * 0.4
    );
    ctx.stroke();

    // candles

    for (i = 1; i < 5; i +=1 ) {
        ctx.strokeStyle = darkRed;
        ctx.lineWidth = c * 2;
        ctx.lineCap = 'butt';
        ctx.beginPath();
        ctx.moveTo(c * 3 * i, h);
        ctx.lineTo(c * 3 * i, c);
        ctx.stroke();

        ctx.strokeStyle = red;
        ctx.lineWidth = c * 1.3;
        ctx.beginPath();
        ctx.moveTo(c * 3 * i, h);
        ctx.lineTo(c * 3 * i, c);
        ctx.stroke();

        // flames
        ctx.shadowColor = white;
        ctx.shadowBlur = c;

        ctx.strokeStyle = brightYellow;
        ctx.lineWidth = c * 1.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(c * 3 * i, c);
        ctx.lineTo(c * 3 * i, c);
        ctx.stroke();

        ctx.strokeStyle = yellow;
        ctx.lineWidth = c * 0.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(c * 3 * i, c);
        ctx.lineTo(c * 3 * i, 0);
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

HatBlockMorph.prototype.renderTrumpetHat = function (ctx) {
    var c = this.corner,
        w = this.hatWidth,
        h = this.hatHeight,
        i,

        yellow = new Color(255, 255, 100).toString(),
        darkYellow = new Color(150, 150, 50).toString(),

        trumpet = () => {
            // trumpet
            ctx.lineJoin = 'miter';
            ctx.beginPath();
            ctx.roundRect(
                c * 5,
                c * 2,
                w * 0.3,
                h * 0.7,
                [0, 0, c * 2, c * 2]
            );
            ctx.stroke();

            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(c * 2, c * 2);
            ctx.lineTo(c * 5, c * 2);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(c * 5 + w * 0.3, c * 1.5);
            ctx.lineTo(w * 0.7, c * 2 - ctx.lineWidth);
            ctx.lineTo(w * 0.7, c * 2 + ctx.lineWidth);
            ctx.lineTo(c * 5 + w * 0.3, c * 2.5);
            ctx.closePath();

            ctx.fill();

            // keys
            for (i = 1; i < 4; i +=1 ) {
                ctx.beginPath();
                ctx.moveTo(c * 4 + c * 2 * i, c * 2);
                ctx.lineTo(c * 4 + c * 2 * i, c);
                ctx.stroke();
            }
        };

    ctx.strokeStyle = darkYellow;
    ctx.fillStyle = darkYellow;
    ctx.lineWidth = c * 2;
    trumpet();
    ctx.strokeStyle = yellow;
    ctx.fillStyle = yellow;
    ctx.lineWidth = c * 1;
    trumpet();

    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    this.cachedClr = this.color.toString();
    this.cachedClrBright = this.bright();
    this.cachedClrDark = this.dark();
};

HatBlockMorph.prototype.renderStarHat = function (ctx) {
    var c = this.corner,
        w = this.hatWidth,
        h = this.hatHeight,

        gray = new Color(200, 200, 200).toString(),
        darkGray = new Color(100, 100, 100).toString(),
        white = WHITE.toString(),

        star = () => {
            ctx.beginPath();
            ctx.moveTo(this.edge, h * 0.8);
            ctx.lineTo(c * 3, h);
            ctx.lineTo(c * 2, h + c);
            ctx.lineTo(c * 5, h);
            ctx.lineTo(c * 6, h + c);
            ctx.lineTo(c * 7, h);
            ctx.lineTo(c * 9, h + c);
            ctx.lineTo(c * 8, h - c);
            ctx.lineTo(c * 12, h - c * 2);
            ctx.lineTo(c * 8, c * 2);
            ctx.lineTo(c * 8.5, this.edge);
            ctx.lineTo(c * 6, c * 1.5);
            ctx.lineTo(c * 5, this.edge);
            ctx.lineTo(c * 4.5, c * 2);
            ctx.lineTo(c * 1.5, c * 0.5);
            ctx.lineTo(c * 3, c * 2.5);
            ctx.closePath();
        },

        tail = () => {
            ctx.beginPath();
            ctx.arc(
                w * 0.65,
                h * 3,
                w * 0.5,
                radians(-130),
                radians(-50),
                false
            );
            ctx.lineTo(w * 0.8, h - c * 1.5);
            ctx.arc(
                w * 0.5,
                h * 3.7,
                w * 0.5,
                radians(-50),
                radians(-110),
                true
            );
            ctx.closePath();
        };

    // tail
    ctx.lineWidth = this.edge;
    ctx.strokeStyle = darkGray;
    ctx.fillStyle = gray;

    tail();
    ctx.stroke();

    ctx.fillStyle = white;
    tail();
    ctx.fill();

    // star
    star();
    ctx.stroke();

    ctx.fillStyle = white;
    star();
    ctx.fill();
};

HatBlockMorph.prototype.renderGiftHat = function (ctx) {
    var c = this.corner,
        w = this.hatWidth,
        h = this.hatHeight,

        blue = new Color(0, 0, 255).toString(),
        brightBlue = new Color(100, 100, 255).toString(),
        darkBlue = new Color(0, 0, 100).toString(),
        red = new Color(200, 0, 0).toString(),
        brightRed = new Color(250, 0, 0).toString();

    // parcel
    ctx.fillStyle = blue;
    ctx.beginPath();
    ctx.rect(
        c * 2,
        c ,
        w * 0.3,
        h
    );
    ctx.fill();

    ctx.fillStyle = brightBlue;
    ctx.beginPath();
    ctx.moveTo(c * 2, c);
    ctx.lineTo(c * 3, 0);
    ctx.lineTo(c * 3 + w * 0.3, 0);
    ctx.lineTo(c * 2 + w * 0.3, c);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = darkBlue;
    ctx.beginPath();
    ctx.moveTo(c * 3 + w * 0.3, 0);
    ctx.lineTo(c * 2 + w * 0.3, c);
    ctx.lineTo(
        c * 2 + w * 0.3,
        c + h
    );
    ctx.lineTo(c * 3 + w * 0.3, h);
    ctx.closePath();
    ctx.fill();

    // ribbon
    ctx.strokeStyle = red;
    ctx.lineCap = 'butt';
    ctx.lineWidth = c;

    // horizontal
    ctx.beginPath();
    ctx.moveTo(c * 2, c + h * 0.5);
    ctx.lineTo(
        c * 2 + w * 0.3,
        c + h * 0.5
    );
    ctx.stroke();

    // vertical
    ctx.beginPath();
    ctx.moveTo(c * 2 + w * 0.15, c);
    ctx.lineTo(
        c * 2 + w * 0.15,
        c + h
    );
    ctx.stroke();

    // loop
    ctx.strokeStyle = brightRed;
    ctx.lineWidth = c * 0.5;

    ctx.beginPath();
    ctx.ellipse(
        c * 3 + w * 0.15,
        c * 0.7,
        c * 0.5,
        c * 0.8,
        radians(60),
        0,
        2 * Math.PI
    );
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(
        c + w * 0.15,
        c * 0.7,
        c * 0.5,
        c,
        radians(-80),
        0,
        2 * Math.PI
    );
    ctx.stroke();
};

HatBlockMorph.prototype.renderPretzelHat = function (ctx) {
    var c = this.corner,
        w = this.hatWidth,
        h = this.hatHeight,

        brown = new Color(220, 80, 0).toString(),
        darkBrown = new Color(100, 40, 0).toString(),

        pretzel = () => {
            var i, x, y;
            ctx.beginPath();
            for (i = 105; i <= 255; i += 1) {
                x = Math.sin(radians(i * 3)) * w * 0.2;
                y = Math.cos(radians(i * 4)) * h * 0.48;
                ctx.lineTo(x + w * 0.3, y + h * 0.65);
            }
            ctx.stroke();
        };

    ctx.strokeStyle = darkBrown;
    ctx.lineWidth = c * 1.5;
    pretzel();

    ctx.strokeStyle = brown;
    ctx.lineWidth = c;
    pretzel();
};

HatBlockMorph.prototype.renderLetterHat = function (ctx) {
    var c = this.corner,

        gray = new Color(150, 150, 150).toString(),
        red = new Color(200, 0, 0).toString(),
        blue = new Color(0, 0, 180).toString(),
        white = WHITE.toString(),
    
        letter = () => {
            ctx.beginPath();
            ctx.moveTo(c * 4, c * 2);
            ctx.lineTo(c * 14, c * 0.25);
            ctx.lineTo(c * 14.75, c * 4);
            ctx.lineTo(c * 4.75, c * 6.25);
            ctx.closePath();
        },

        stamp = () => {
            ctx.beginPath();
            ctx.moveTo(c * 12, c * 1.25);
            ctx.lineTo(c * 13.5, c * 1);
            ctx.lineTo(c * 13.75, c * 2);
            ctx.lineTo(c * 12.25, c * 2.35);
            ctx.closePath();
        };

    // letter
    ctx.lineWidth = c * 0.5;
    ctx.strokeStyle = gray;
    letter();
    ctx.stroke();
    ctx.fillStyle = white;
    letter();
    ctx.fill();

    // stamp
    ctx.fillStyle = red;
    stamp();
    ctx.fill();

    // address
    ctx.lineCap = 'round';
    ctx.setLineDash([c* 0.5, c * 0.5, c * 1.2, c * 0.5]);
    ctx.strokeStyle = blue;
    ctx.beginPath();
    ctx.moveTo(c * 6, c * 3.6);
    ctx.lineTo(c * 9, c * 3);
    ctx.moveTo(c * 6.3, c * 4.7);
    ctx.lineTo(c * 9.3, c * 4);
    ctx.stroke();
    ctx.setLineDash([]);
};

HatBlockMorph.prototype.renderTrainHat = function (ctx) {
    var c = this.corner,
        w = this.hatWidth,

        gray = new Color(200, 200, 200).toString(),
        red = new Color(200, 0, 0).toString(),
        green = new Color(0, 200, 0).toString(),
        darkGreen = new Color(0, 100, 0).toString(),
        black = BLACK.toString(),
    
    chimney = () => {
        ctx.beginPath();
        ctx.roundRect(
            c * 12,
            c * 0.5,
            c * 2,
            c * 0.75,
            [c * 0.5, c * 0.5,
            c * 0.5, c * 0.5]
        );
        ctx.rect(
            c * 12.5,
            c * 1.25,
            c * 1,
            c * 1.25
        );
    },

    wheels = (start, stop) => {
        var i;
        for (i = start; i <= stop; i += 1) {
            ctx.beginPath();
            ctx.fillStyle = black;
            ctx.arc(
                c * 4 + c * i * 2.5,
                c * 5,
                c * 1.2,
                radians(0),
                radians(360),
                false
            );
            ctx.fill();
        }
        ctx.fillStyle = red;
        for (i = start; i <= stop; i += 1) {
            ctx.beginPath();
            ctx.arc(
                c * 4 + c * i * 2.5,
                c * 5,
                c * 0.8,
                radians(0),
                radians(360),
                false
            );
            ctx.fill();
        }
    },

    boiler = () => {
        ctx.roundRect(
            c * 5,
            c * 2,
            w * 0.5,
            c * 2,
            [0, c * 2, c * 2, 0]
        );
    },

    cabin = () => {
        ctx.rect(
            c * 5,
            c * 0.5,
            c * 2,
            c * 1.75
        );
    },

    roof = () => {
        ctx.moveTo(c * 4, c * 0.5);
        ctx.lineTo(c * 8, c * 0.5);
    },

    catcher = () => {
        ctx.beginPath();
        ctx.moveTo(c * 4, c * 4);
        ctx.lineTo(c * 4 + w * 0.5, c * 4);
        ctx.lineTo(c * 5 + w * 0.5, c * 5);
        ctx.lineTo(c * 4, c * 5);
        ctx.closePath();
    };

    ctx.lineCap = 'round';
    ctx.lineJoin = 'miter';

    // outline
    // chimney
    ctx.strokeStyle = gray;
    ctx.lineWidth = c * 0.5;
    ctx.beginPath();
    chimney();
    ctx.stroke();
    
    // boiler
    ctx.beginPath();
    boiler();
    ctx.stroke();

    // cabin
    ctx.lineWidth = c;
    ctx.beginPath();
    cabin();
    ctx.stroke();
    ctx.beginPath();
    roof();
    ctx.stroke();

    // catcher
    ctx.lineWidth = c * 0.5;
    catcher();
    ctx.stroke();


    // inner shape:
    // chimney
    ctx.fillStyle = red;
    ctx.beginPath();
    chimney();
    ctx.fill();

    // front wheels
    wheels(3, 4);

    // boiler
    ctx.fillStyle = green;
    ctx.beginPath();
    boiler();
    ctx.fill();

    // cabin
    ctx.strokeStyle = red;
    ctx.lineWidth = c * 0.5;
    ctx.beginPath();
    cabin();
    ctx.stroke();
    //ctx.lineWidth = c;
    ctx.beginPath();
    roof();
    ctx.stroke();

    // catcher
    ctx.fillStyle = darkGreen;
    catcher();
    ctx.fill();

    // rear wheels
    wheels(1, 2);
};

HatBlockMorph.prototype.renderHouseHat = function (ctx) {
    var c = this.corner,

        brown = new Color(220, 80, 0),
        white = WHITE.toString(),
        i,
    
        house = () => {
            ctx.beginPath();
            ctx.moveTo(c * 4, c * 2.5);
            ctx.lineTo(c * 2, c * 2.5);

            ctx.lineTo(c * 4, c * 0.5);
            ctx.lineTo(c * 12, c * 0.5);

            ctx.lineTo(c * 14, c * 2.5);
            ctx.lineTo(c * 12, c * 2.5);

            ctx.lineTo(c * 12, c * 4.5);
            ctx.lineTo(c * 4, c * 4.5);
            ctx.closePath();
        };

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // house
    ctx.lineWidth = c;
    ctx.strokeStyle = brown;
    house();
    ctx.stroke();

    ctx.fillStyle = brown;
    house();
    ctx.fill();
    
    ctx.lineWidth = c * 0.25;
    ctx.strokeStyle = white;
    house();
    ctx.stroke();

    // tiles
    ctx.beginPath();
    for (i = 0; i < 7; i += 1) {
        ctx.arc(
            c * 5 + (c * i),
            c * 1.25,
            c * 0.5,
            radians(-200),
            radians(20),
            true
        );
    }
    ctx.stroke();

    // door
    ctx.beginPath();
    ctx.moveTo(c * 5, c * 4.5);
    ctx.lineTo(c * 5, c * 3.5);
    ctx.arc(
        c * 6,
        c * 3.5,
        c,
        radians(-180),
        radians(0)
    );
    ctx.lineTo(c * 7, c * 4.5);
    ctx.moveTo(c * 6, c * 4.5);
    ctx.lineTo(c * 6, c * 3.5);
    ctx.stroke();


    // window
    ctx.beginPath();
    ctx.rect(
        c * 8.5,
        c * 2.7,
        c * 2,
        c * 1.2
    );
    ctx.stroke();
};

IDE_Morph.prototype.looksMenu = function () {
    var menu = this.looksMenuData();
    menu.addPreference(
        'Santa Hats',
        () => {
             HatBlockMorph.prototype.xmasSkin =
                !HatBlockMorph.prototype.xmasSkin;
            this.world().changed();
            this.bakeYourOwnBlocks();
            this.flushBlocksCache();
            this.refreshPalette();
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

// DialogBoxMorph Xmas Skin (2025)

DialogBoxMorph.prototype.nativeRender = DialogBoxMorph.prototype.render;

DialogBoxMorph.prototype.render = function (ctx) {
    this.nativeRender(ctx);
    if (HatBlockMorph.prototype.xmasSkin) {
        this.renderTreeHat(ctx);
    }
};

DialogBoxMorph.prototype.nativeOutlinePathTitle =
    DialogBoxMorph.prototype.outlinePathTitle;

DialogBoxMorph.prototype.outlinePathTitle = function (ctx, radius) {
    var h = Math.ceil(fontHeight(this.titleFontSize)) + this.titlePadding * 2;
    if (HatBlockMorph.prototype.xmasSkin) {
        ctx.roundRect(
            h * 1.5,
            0,
            this.width() - h * 1.5,
            Math.ceil(fontHeight(this.titleFontSize)) + this.titlePadding * 2,
            [radius, radius, 0, 0]
        );
    } else {
        this.nativeOutlinePathTitle(ctx, radius);
    }
};

DialogBoxMorph.prototype.renderTreeHat = function (ctx) {
    var h = Math.ceil(fontHeight(this.titleFontSize)) + this.titlePadding * 2,
        b = h / 4,
        l = this.titlePadding / 6,

        green = new Color(0, 200, 0).toString(),
        darkGreen = new Color(0, 100, 0).toString(),
        darkGray = new Color(150, 150, 150).toString(),
        red = new Color(200, 0, 0).toString(),
        white = WHITE.toString();

    // tree
    ctx.beginPath();
    ctx.moveTo(h, 0);
    ctx.lineTo(b * 2, b);
    ctx.lineTo(b * 3, b);
    ctx.lineTo(b, b * 2);
    ctx.lineTo(b * 3, b * 2);
    ctx.lineTo(0, b * 3);
    ctx.lineTo(b * 3.7, b * 3);
    ctx.lineTo(b * 3.7, h);
    ctx.lineTo(b * 4.3, h);
    ctx.lineTo(b * 4.3, b * 3);
    ctx.lineTo(h * 2, b * 3);
    ctx.lineTo(b * 5, b * 2);
    ctx.lineTo(b * 7, b * 2);
    ctx.lineTo(b * 5, b);
    ctx.lineTo(b * 6, b);
    ctx.closePath();

    ctx.strokeStyle = green;
    ctx.fillStyle = darkGreen;
    ctx.lineWidth = l;
    ctx.lineCap = 'miter';
    ctx.fill();
    ctx.stroke();

    // snow
    ctx.beginPath();
    ctx.moveTo(h, l);
    ctx.lineTo(b * 2, b);
    ctx.moveTo(b * 3, b);
    ctx.lineTo(b, b * 2);
    ctx.moveTo(b * 3, b * 2);
    ctx.lineTo(0, b * 3);

    ctx.lineCap = 'round';
    ctx.strokeStyle = darkGray;
    ctx.lineWidth = l * 2.5;
    ctx.stroke();
    ctx.strokeStyle = white;
    ctx.lineWidth = l * 1.5;
    ctx.stroke();

    // baubles
    [
        [b * 2, b],
        [b * 3.5, b * 0.7],
        [b * 5, b],

        [b, b * 2],
        [b * 2.7, b * 1.8],
        [b * 4.3, b * 1.8],
        [b * 6, b * 2],

        [0, b * 3],
        [b * 1.5, b * 3],
        [b * 3, b * 2.8],
        [b * 5.3, b * 2.8],
        [b * 7, b * 3]
    ].forEach(p => {
        ctx.fillStyle = white;
        ctx.beginPath();
        ctx.arc(
            p[0] + (b / 2),
            p[1] + l / 2,
            b / 2.8,
            radians(0),
            radians(360),
            false
        );
        ctx.fill();

        ctx.fillStyle = red;
        ctx.beginPath();
        ctx.arc(
            p[0] + (b / 2),
            p[1] + (b / 5),
            b / 3,
            radians(0),
            radians(360),
            false
        );
        ctx.fill();
    });
};

IDE_Morph.prototype.bakeYourOwnBlocks = function () {
    if (HatBlockMorph.prototype.xmasSkin) {
        SnapTranslator.dict.en['Make a block'] = 'Bake a block';
        SnapTranslator.dict.en['Make a block...'] = 'Bake a block...';
        SnapTranslator.dict.en['make a block...'] = 'bake a block...';
        SnapTranslator.dict.en['Block Editor'] = 'Block Bakery';
        this.saveSetting('skin', 'xmas');
    } else {
        delete SnapTranslator.dict.en['Make a block'];
        delete SnapTranslator.dict.en['Make a block...'];
        delete SnapTranslator.dict.en['make a block...'];
        delete SnapTranslator.dict.en['Block Editor'];
        this.removeSetting('skin');
    }
};

IDE_Morph.prototype.bakeYourOwnBlocks();
