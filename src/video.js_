/*

    video.js

    video motion detection for morphic.js and Snap!

    written by Josep Ferràndiz i Farré
    https://github.com/jferran6

    Copyright (C) 2019 by Josep Ferràndiz i Farré

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
    needs morphic.js


    edit history:
    --------------
    2019-05-07 - optimized imageData caching (jens)

*/

/*global modules, StageMorph*/

// Global stuff ////////////////////////////////////////////////////////

modules.video = '2019-May-22';

var VideoMotion;

// VideoMotion /////////////////////////////////////////////////////////////////

function VideoMotion(width, height) {
/*
 * Calculate, based on two consecutive video frames, the amount of movement and
 * direction of this movement both on the stage and on the sprite.
 * It's based on Scratch 3 (optical flow algorithm).
 */
    this.width = width;
    this.height = height;
    this.frameNumber = 0;
    this.winSize = 8;
    this.lastAnalyzedFrame = 0;
    this.motionAmount = 0;
    this.motionDirection = 0;
    this.imageBuffer = new ArrayBuffer(this.width * this.height * 2);
    this.curr = new Uint8ClampedArray(
        this.imageBuffer,
        0,
        this.width * this.height
    );
    this.prev = new Uint8ClampedArray(
        this.imageBuffer,
        this.width * this.height,
        this.width * this.height
    );
    this.threshold = 30;
    this.amountScale = 100;
    this.toDegree = 180 / Math.PI;
}

VideoMotion.prototype.reset = function(width, height){
/*
 * Reset videoElement and videoMotion dimensions.
 * This function is called when stage dimensions change.
 */
    this.width = width;
    this.height = height;
    this.frameNumber = 0;
    this.lastAnalyzedFrame = 0;
    this.imageBuffer = new ArrayBuffer(this.width * this.height * 2);
    this.curr = new Uint8ClampedArray(
        this.imageBuffer,
        0,
        this.width * this.height
    );
    this.prev = new Uint8ClampedArray(
        this.imageBuffer,
        this.width * this.height,
        this.width * this.height
    );
};

VideoMotion.prototype.addFrame = function(imageData) {
    var i,
        temp = this.prev,
        frame = new Uint32Array(imageData.buffer.slice(0)); //ABGR
    this.frameNumber++;
    this.prev = this.curr;
    this.curr = temp;
    for (i = 0; i < frame.length; i++) {
        this.curr[i] = frame[i] & 0xff;
    }
};

VideoMotion.prototype.getStageMotion = function() {
    var uu = 0, // Accumulate 2d motion vectors from groups
        vv = 0, // of pixels and average it later.
        n = 0,
        vector = {
            u: 0,
            v: 0
        },
        i, j, address, nextAddress, maxAddress,
        winStep = this.winSize * 2 + 1,
        wmax = this.width - this.winSize - 1,
        hmax = this.height - this.winSize - 1,
    // Optical Flow vars
        A2, A1B2, B1, C1, C2,
        gradX, gradY, gradT;

    if (!this.curr || !this.prev) {
        this.motionAmount = this.motionDirection = -1;
        // Don't have two frames to analyze yet
        return;
    }
    // Return early if new data has not been received.
    if (this.lastAnalyzedFrame === this.frameNumber) {
        return;
    }
    this.lastAnalyzedFrame = this.frameNumber;
    // Iterate over groups of cells building up the components to determine
    // a motion vector for each cell instead of the whole frame to avoid
    // integer overflows.
    for (i = this.winSize + 1; i < hmax; i += winStep) {
        for (j = this.winSize + 1; j < wmax; j += winStep) {
            A2 = 0;
            A1B2 = 0;
            B1 = 0;
            C1 = 0;
            C2 = 0;
            // This is a performance critical math region.
            address = ((i - this.winSize) * this.width) + j - this.winSize;
            nextAddress = address + winStep;
            maxAddress = ((i + this.winSize) * this.width) + j + this.winSize;
            for (; address <= maxAddress; address += this.width - winStep,
                nextAddress += this.width) {
                for (; address <= nextAddress; address += 1) {
                    // The difference in color between the last frame and
                    // the current frame.
                    gradT = ((this.prev[address]) - (this.curr[address]));
                    // The difference between the pixel to the left and the
                    // pixel to the right.
                    gradX = ((this.curr[address - 1]) - (this.curr[address + 1]));
                    // The difference between the pixel above and the pixel
                    // below.
                    gradY = ((
                        this.curr[address - this.width])
                        - (this.curr[address + this.width]));
                    // Add the combined values of this pixel to previously
                    // considered pixels.
                    A2 += gradX * gradX;
                    A1B2 += gradX * gradY;
                    B1 += gradY * gradY;
                    C2 += gradX * gradT;
                    C1 += gradY * gradT;
                }
            }
            // Use the accumulated values from the for loop to determine a
            // motion direction.
            vector = this.getMotionVector(A2, A1B2, B1, C2, C1);
            // If u and v are within negative winStep to positive winStep,
            // add them to a sum that will later be averaged.
            if (-winStep < vector.u
                    && vector.u < winStep
                    && -winStep < vector.v
                    && vector.v < winStep) {
                uu += vector.u;
                vv += vector.v;
                n++;
            }
        }
    }
    // Average the summed vector values of all of the motion groups.
    uu /= n;
    vv /= n;
    // Scale the magnitude of the averaged UV vector.
    this.motionAmount = Math.round(this.amountScale * Math.hypot(uu, vv));
    if (this.motionAmount > this.threshold) {
        this.motionDirection = (((Math.atan2(vv, uu) * this.toDegree + 270) % 360) - 180)
            .toFixed(2); // Snap direction
    }
};

VideoMotion.prototype.getMotionVector = function(A2, A1B2, B1, C2, C1) {
/**
 * Determine a motion vector combinations of the color component difference
 * on the x axis, y axis, and temporal axis.
 * A2 - a sum of x axis squared
 * A1B2 - a sum of x axis times y axis
 * B1 - a sum of y axis squared
 * C2 - a sum of x axis times temporal axis
 * C1 - a sum of y axis times temporal axis
 * Returns a uv vector representing the motion for the given input
 */
    // Compare sums of X * Y and sums of X squared and Y squared.
    var norm,
        IGradNorm,
        delta = ((A1B2 * A1B2) - (A2 * B1)),
        deltaX, deltaY, Idelta,
        motionVector = {
            u: 0,
            v: 0
        };

    if (delta) {
        // System is not singular - solving by Kramer method.
        deltaX = -((C1 * A1B2) - (C2 * B1));
        deltaY = -((A1B2 * C2) - (A2 * C1));
        Idelta = 8 / delta;
        motionVector.u = deltaX * Idelta;
        motionVector.v = deltaY * Idelta;
    } else {
        // Singular system - find optical flow in gradient direction.
        norm = ((A1B2 + A2) * (A1B2 + A2)) + ((B1 + A1B2) * (B1 + A1B2));
        if (norm) {
            IGradNorm = 8 / norm;
            motionVector.u = (A1B2 + A2) * (-(C1 + C2) * IGradNorm);
            motionVector.v = (B1 + A1B2) * (-(C1 + C2) * IGradNorm);
        } else {
            motionVector.u = 0;
            motionVector.v = 0;
        }
    }
    return motionVector;
};

VideoMotion.prototype.getLocalMotion = function(aSprite) {
/**
 * Calculate motion amount and direction values based on stored frames
 * (current and previous) that overlaps a given sprite.
 */
    var stage = aSprite.parentThatIsA(StageMorph),
        activePixelNum = 0,
        i, j, xmin, xmax, ymin, ymax, gradT, gradX, gradY,
        spriteWidth = Math.floor(aSprite.width() / stage.scale),
        winSize = this.winSize,
        vector = {
            u: 0,
            v: 0
        },
        A2 = 0,
        A1B2 = 0,
        B1 = 0,
        C1 = 0,
        C2 = 0,
        localThreshold = this.threshold / 3,
        localMaxAmount = 100,
        localAmountScale = this.amountScale * 2e-4,
        scaleFactor = 0,
        address = 0,
        spriteImage,
        cb,
        pixel;

    if (!this.curr || !this.prev) {
        aSprite.motionAmount = aSprite.motionDirection = -1;
        // Don't have two frames to analyze yet
        return;
    }
    // Skip if the current frame has already been considered
    // for this state.
    if (aSprite.frameNumber !== this.frameNumber) {
        spriteImage = aSprite.getImageData();
        // Consider only the area of the current frame overlapped
        // with the given sprite.
        cb = getClippedBounds(aSprite);
        xmin = Math.max(
            Math.floor((aSprite.left() - stage.left()) / stage.scale),
            0);
        ymin = Math.max(
            Math.floor((aSprite.top() - stage.top()) / stage.scale),
            0);
        xmax = Math.min(cb.sw + xmin, stage.dimensions.x);
        ymax = Math.min(cb.sh + ymin, stage.dimensions.y - 1);
        // This is a performance critical math region.
        pixel = cb.sy * spriteWidth + cb.sx;
        for (i = ymin; i < ymax; i++, pixel += spriteWidth - cb.sw) { //rows
            for (j = xmin; j < xmax; j++, ++pixel) { //cols
                if (j > 0 && j < this.width && i > 0 && i < this.height
                    && (spriteImage[pixel] >> 24 & 0xff) == 0xff) {
                    address = (i * this.width) + j;
                    // The difference in color between the last frame and
                    // the current frame.
                    gradT = ((this.prev[address]) - (this.curr[address]));
                    // The difference between the pixel to the left and the
                    // pixel to the right.
                    gradX = ((this.curr[address - 1]) - (this.curr[address + 1]));
                    // The difference between the pixel above and the pixel
                    // below.
                    gradY = (
                        (this.curr[address - this.width])
                        - (this.curr[address + this.width]));
                    // Add the combined values of this pixel to previously
                    // considered pixels.
                    A2 += gradX * gradX;
                    A1B2 += gradX * gradY;
                    B1 += gradY * gradY;
                    C2 += gradX * gradT;
                    C1 += gradY * gradT;
                    scaleFactor++;
                }
            }
        }
        // Use the accumulated values from the for loop to determine a
        // motion direction.
        vector = this.getMotionVector(A2, A1B2, B1, C2, C1);
        if (scaleFactor) {
            // Store the area of the sprite in pixels
            activePixelNum = scaleFactor;
            scaleFactor /= (2 * winSize * 2 * winSize);
            vector.u = vector.u / scaleFactor;
            vector.v = vector.v / scaleFactor;
        }
        // Scale the magnitude of the averaged UV vector and the number of
        // overlapping solid pixels.
        aSprite.motionAmount = Math.round(
            localAmountScale * activePixelNum
            * Math.hypot(vector.u, vector.v)
        );
        if (aSprite.motionAmount > localMaxAmount) {
            // Clip all magnitudes greater than 100.
            aSprite.motionAmount = Math.min(localMaxAmount, 100);
        }
        if (aSprite.motionAmount > localThreshold) {
            // Snap direction.
            aSprite.motionDirection = (((
                Math.atan2(vector.v, vector.u)
                * this.toDegree + 270) % 360) - 180)
                .toFixed(2);
        }
        // Skip future calls on this state until a new frame is added.
        aSprite.frameNumber = this.frameNumber;
    }

    /*
     * Return sprite's visible part bounds
     */
    function getClippedBounds(sprite) {
        var stage = sprite.parentThatIsA(StageMorph),
            scale = stage.scale,
            bounds = {
                sx: 0,
                sy: 0,
                sw: Math.floor(sprite.extent().x / scale),
                sh: Math.floor(sprite.extent().y / scale)
            };
        // Clipping X
        if (sprite.left() < stage.left()) { // sprite outer left stage
            bounds.sw = Math.max(
                Math.floor((sprite.right() - stage.left()) / scale),
                0);
            bounds.sx = Math.floor(sprite.width() / scale - bounds.sw);
        }
        if (sprite.right() > stage.right()) { // sprite outer right stage
            bounds.sw = Math.max(
                Math.floor((stage.right() - sprite.left()) / scale),
                0);
        }
        //Clipping Y
        if (sprite.top() < stage.top()) { // sprite upper top
            bounds.sh = Math.max(
                Math.floor((sprite.bottom() - stage.top()) / scale),
                0);
            bounds.sy = Math.floor(sprite.height() / scale - bounds.sh);
        }
        if (sprite.bottom() > stage.bottom()) { // sprite lower bottom
            bounds.sh = Math.max(
                Math.floor((stage.bottom() - sprite.top()) / scale),
                0);
        }
        return bounds;
    }
};
