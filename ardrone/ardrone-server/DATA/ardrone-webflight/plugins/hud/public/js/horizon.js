/*
 * This is heavily based on the JS from https://github.com/bjnortier/autopilot
 * by Benjamin Nortier.
 *
 * Original License:
 *
 * Copyright (c) 2010 Benjamin Nortier
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 */

(function (window, $, undefined) {
    'use strict';

    var AH,
        skyColor = '#33f',
        earthColor = '#992',
        frontCameraFovY = 70,
        majorWidth = 100,
        minorWidth = 60,
        zeroWidth = 200,
        zeroGap = 20,
        radialLimit = 60,
        tickRadius = 10,
        radialRadius = 178,
        speedIndicatorHeight = 250,
        speedIndicatorWidth = 60,
        zeroPadding = 100,
        speedAltOpacity = 0.2,
        pixelsPer10Kmph = 50,
        minorTicksPer10Kmph = 5,
        speedWarningWidth = 10,
        yellowBoundarySpeed = 100,
        redBoundarySpeed = 130,
        altIndicatorHeight = 250,
        altIndicatorWidth = 50,
        majorTickWidth = 10,
        minorTickWidth = 5,
        pixelsPer100Ft = 50,
        minorTicksPer100Ft = 5;


    AH = function AriticialHorizon(cockpit) {
        console.log("Loading Artificial Horizon plugin.");

        // Instance variables
        this.cockpit = cockpit;
        this.roll = 0;
        this.pitch = 0;
        this.altitude = 0;
        this.speed = 0;

        // Add required UI elements
        $("#cockpit").append('<canvas id="horizon" width="640" height="360"></canvas>');
        this.ctx = $("#horizon").get(0).getContext('2d');

        // Bind to navdata events on websockets
        var ah = this;
        this.cockpit.socket.on('navdata', function(data) {
            if (!jQuery.isEmptyObject(data)) {
                requestAnimationFrame(function() {
                    ah.render(data);
                });
            }
        });

        // Bind on window events to resize
        $(window).resize(function(event) {
            ah.draw();
        });

        this.draw();
    };

    AH.prototype.render = function(data) {
        this.setValues({
            roll : data.demo.rotation.roll * Math.PI / 180,
            pitch : data.demo.rotation.pitch * Math.PI / 180,
            altitude : data.demo.altitudeMeters,
            speed : data.demo.velocity.z
            // no idea...
        });

        this.draw();
    }
        
    AH.prototype.setValues = function setValues(values) {
        this.roll = values.roll;
        this.pitch = values.pitch;
        this.altitude = values.altitude;
        this.speed = values.speed;
    };

    AH.prototype.drawHorizon = function drawHorizon() {
        var pitchPixels, i, pitchAngle;
        this.ctx.save();
        this.ctx.translate(
            this.ctx.canvas.width / 2,
            this.ctx.canvas.height / 2
        );

        this.ctx.rotate(-this.roll);
        pitchPixels = this.pitch / (Math.PI * 2) * 360 * this.pixelsPerDeg;
        this.ctx.translate(0, pitchPixels);

        /*
        this.ctx.fillStyle = skyColor;
        this.ctx.fillRect(-10000, -10000, 20000, 10000);
        this.ctx.fillStyle = earthColor;
        this.ctx.fillRect(-10000, 0, 20000, 10000);
        */

        // horizon
        this.ctx.strokeStyle = '#fff';
        this.ctx.fillStyle = 'white';
        this.ctx.lineWidth = 2;

        this.ctx.beginPath();
        this.ctx.moveTo(-10000, 0);
        this.ctx.lineTo(20000, 0);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(
            0, -pitchPixels, radialRadius,
            0, Math.PI * 2,
            false /* anti-clockwise */
        );
        this.ctx.closePath();
        this.ctx.clip();

        this.ctx.beginPath();
        for (i = -18; i <= 18; ++i) {
            pitchAngle = i / 2 * 10;
            if (i !== 0) {
                if (i % 2 === 0) {
                    this.ctx.moveTo(
                        -majorWidth / 2,
                        -this.pixelsPerDeg * pitchAngle
                    );
                    this.ctx.lineTo(
                        +majorWidth / 2,
                        -this.pixelsPerDeg * pitchAngle
                    );

                    this.ctx.fillText(
                        pitchAngle,
                        -majorWidth / 2 - 20,
                        -this.pixelsPerDeg * 10 / 2 * i
                    );
                    this.ctx.fillText(
                        pitchAngle,
                        majorWidth / 2 + 10,
                        -this.pixelsPerDeg * 10 / 2 * i
                    );
                } else {
                    this.ctx.moveTo(
                        -minorWidth / 2,
                        -this.pixelsPerDeg * pitchAngle
                    );
                    this.ctx.lineTo(
                        +minorWidth / 2,
                        -this.pixelsPerDeg * pitchAngle
                    );
                }
            }
        }
        this.ctx.closePath();
        this.ctx.stroke();

        this.ctx.restore();
    };


    AH.prototype.drawZero = function drawZero() {
        var i;

        this.ctx.save();
        this.ctx.translate(
            this.ctx.canvas.width / 2,
            this.ctx.canvas.height / 2
        );

        this.ctx.strokeStyle = 'yellow';
        this.ctx.lineWidth = 2;

        this.ctx.beginPath();
        this.ctx.moveTo(-zeroWidth / 2, 0);
        this.ctx.lineTo(-zeroGap / 2, 0);
        this.ctx.moveTo(+zeroWidth / 2, 0);
        this.ctx.lineTo(+zeroGap / 2, 0);

        this.ctx.moveTo(-zeroGap / 2, zeroGap / 2);
        this.ctx.lineTo(0, 0);
        this.ctx.lineTo(+zeroGap / 2, zeroGap / 2);

        this.ctx.stroke();

        // The radial roll indicator
        this.ctx.beginPath();
        this.ctx.arc(
            0, 0, radialRadius,
            -Math.PI / 2 - Math.PI * radialLimit / 180,
            -Math.PI / 2 + Math.PI * radialLimit / 180,
            false /* anti-clockwise */
        );
        this.ctx.stroke();

        for (i = -4; i <= 4; ++i) {
            this.ctx.moveTo(
                (radialRadius - tickRadius) * Math.cos(
                    -Math.PI / 2 + i * 15 / 180 * Math.PI
                ),
                (radialRadius - tickRadius) * Math.sin(
                    -Math.PI / 2 + i * 15 / 180 * Math.PI
                )
            );
            this.ctx.lineTo(
                radialRadius * Math.cos(-Math.PI / 2 + i * 15 / 180 * Math.PI),
                radialRadius * Math.sin(-Math.PI / 2 + i * 15 / 180 * Math.PI)
            );
        }
        this.ctx.stroke();

        this.ctx.restore();
    };

    AH.prototype.drawRoll = function drawRoll() {
        this.ctx.save();
        this.ctx.translate(
            this.ctx.canvas.width / 2,
            this.ctx.canvas.height / 2
        );
        this.ctx.rotate(-this.roll);

        this.ctx.fillStyle = 'white';
        this.ctx.lineWidth = 2;

        this.ctx.beginPath();
        this.ctx.moveTo(0, -radialRadius);
        this.ctx.lineTo(-5, -radialRadius + 10);
        this.ctx.lineTo(+5, -radialRadius + 10);
        this.ctx.closePath();
        this.ctx.fill();

        var readableRollAngle = Math.round(this.roll / Math.PI / 2 * 360) % 360;
        if (readableRollAngle > 180) {
            readableRollAngle = readableRollAngle - 360;
        }

        this.ctx.fillRect(-20, -radialRadius + 9, 40, 16);

        this.ctx.font = '12px Arial';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(readableRollAngle, -7, -radialRadius + 22);

        this.ctx.restore();
    };


    AH.prototype.drawSpeed = function drawSpeed() {
        var yellowBoundaryY, redBoundaryY, yOffset, from, to, i, j;

        this.ctx.save();
        this.ctx.translate(
            this.ctx.canvas.width / 2,
            this.ctx.canvas.height / 2
        );
        this.ctx.translate(
            -zeroWidth / 2 - zeroPadding - speedIndicatorWidth,
            0
        );

        this.ctx.fillStyle = 'rgba(0,0,0,' + speedAltOpacity + ')';
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 2;

        this.ctx.strokeRect(
            0, -speedIndicatorHeight / 2,
            speedIndicatorWidth, speedIndicatorHeight
        );

        this.ctx.fillRect(
            0, -speedIndicatorHeight / 2,
            speedIndicatorWidth, speedIndicatorHeight
        );

        this.ctx.restore();

        this.ctx.save();
        this.ctx.translate(
            this.ctx.canvas.width / 2,
            this.ctx.canvas.height / 2
        );
        this.ctx.translate(
            -zeroWidth / 2 - zeroPadding - speedIndicatorWidth,
            0
        );

        this.ctx.rect(
            0, -speedIndicatorHeight / 2,
            speedIndicatorWidth, speedIndicatorHeight
        );
        this.ctx.clip();

        yellowBoundaryY = -(-this.speed + yellowBoundarySpeed) / 10 * pixelsPer10Kmph;
        redBoundaryY = -(-this.speed + redBoundarySpeed) / 10 * pixelsPer10Kmph;

        this.ctx.fillStyle = 'yellow';
        this.ctx.fillRect(
            speedIndicatorWidth - speedWarningWidth, yellowBoundaryY,
            speedWarningWidth, redBoundaryY - yellowBoundaryY
        );

        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(
            speedIndicatorWidth - speedWarningWidth, redBoundaryY,
            speedWarningWidth, -speedIndicatorHeight / 2 - redBoundaryY
        );

        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(
            speedIndicatorWidth - speedWarningWidth, yellowBoundaryY,
            speedWarningWidth, +speedIndicatorHeight / 2 - yellowBoundaryY
        );

        yOffset = this.speed / 10 * pixelsPer10Kmph;

        // The unclipped ticks to be rendered.
        // We render 100kmph either side of the center to be safe
        from = -Math.floor(this.speed / 10)  - 10;
        to = Math.ceil(this.speed / 10)  + 10;

        for (i = from; i < to; ++i) {

            this.ctx.moveTo(
                speedIndicatorWidth - speedWarningWidth,
                -i * pixelsPer10Kmph + yOffset
            );
            this.ctx.lineTo(
                speedIndicatorWidth - speedWarningWidth - majorTickWidth,
                -i * pixelsPer10Kmph + yOffset
            );

            for (j = 1; j < minorTicksPer10Kmph; ++j) {
                this.ctx.moveTo(
                    speedIndicatorWidth - speedWarningWidth,
                    -i * pixelsPer10Kmph - j * pixelsPer10Kmph /
                        minorTicksPer10Kmph + yOffset
                );
                this.ctx.lineTo(
                    speedIndicatorWidth - speedWarningWidth - minorTickWidth,
                    -i * pixelsPer10Kmph - j * pixelsPer10Kmph /
                        minorTicksPer10Kmph + yOffset
                );
            }
            this.ctx.font = '12px Arial';
            this.ctx.fillStyle = 'white';
            this.ctx.fillText(i * 10, 20, -i * pixelsPer10Kmph + yOffset + 4);
        }
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(
            speedIndicatorWidth - speedWarningWidth - minorTickWidth, 0
        );
        this.ctx.lineTo(
            speedIndicatorWidth - speedWarningWidth - minorTickWidth * 2, -5
        );
        this.ctx.lineTo(
            speedIndicatorWidth - speedWarningWidth - minorTickWidth * 2, -10
        );
        this.ctx.lineTo(0, -10);
        this.ctx.lineTo(0, 10);
        this.ctx.lineTo(
            speedIndicatorWidth - speedWarningWidth - minorTickWidth * 2, 10
        );
        this.ctx.lineTo(
            speedIndicatorWidth - speedWarningWidth - minorTickWidth * 2, 5
        );
        this.ctx.closePath();

        this.ctx.fill();
        this.ctx.strokeStyle = 'black';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(Math.round(this.speed * 100) / 100, 15, 4.5, altIndicatorHeight);

        this.ctx.restore();
    };

    AH.prototype.drawAltitude = function drawAltitude() {
        var yOffset, from, to, i, j;

        this.ctx.save();
        this.ctx.translate(
            this.ctx.canvas.width / 2,
            this.ctx.canvas.height / 2
        );
        this.ctx.translate(
            zeroWidth / 2 + zeroPadding,
            0
        );

        this.ctx.fillStyle = 'rgba(0,0,0,' + speedAltOpacity + ')';
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 2;

        this.ctx.fillRect(
            0, -altIndicatorHeight / 2,
            altIndicatorWidth, altIndicatorHeight
        );
        this.ctx.strokeRect(
            0, -altIndicatorHeight / 2,
            altIndicatorWidth, altIndicatorHeight
        );

        this.ctx.restore();

        this.ctx.save();
        this.ctx.translate(
            this.ctx.canvas.width / 2,
            this.ctx.canvas.height / 2
        );
        this.ctx.translate(
            zeroWidth / 2 + zeroPadding,
            0
        );

        this.ctx.rect(
            0, -altIndicatorHeight / 2,
            altIndicatorWidth, altIndicatorHeight
        );
        this.ctx.clip();

        yOffset = this.altitude / 100 * pixelsPer100Ft;

        // The unclipped ticks to be rendered. We render 500ft either side of
        // the center to be safe
        from = Math.floor(this.altitude / 100)  - 5;
        to = Math.ceil(this.altitude / 100)  + 5;

        for (i = from; i < to; ++i) {
            this.ctx.moveTo(0, -i * pixelsPer100Ft + yOffset);
            this.ctx.lineTo(majorTickWidth, -i * pixelsPer100Ft + yOffset);

            for (j = 1; j < minorTicksPer100Ft; ++j) {
                this.ctx.moveTo(
                    0,
                    -i * pixelsPer100Ft - j * pixelsPer100Ft /
                        minorTicksPer100Ft + yOffset
                );
                this.ctx.lineTo(
                    minorTickWidth,
                    -i * pixelsPer100Ft -
                        j * pixelsPer100Ft / minorTicksPer100Ft +
                        yOffset
                );
            }

            this.ctx.font = '12px Arial';
            this.ctx.fillStyle = 'white';
            this.ctx.fillText(i * 100, 15, -i * pixelsPer100Ft + yOffset + 4);
        }

        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        this.ctx.restore();

        this.ctx.save();
        this.ctx.translate(
            this.ctx.canvas.width / 2,
            this.ctx.canvas.height / 2
        );
        this.ctx.translate(
            zeroWidth / 2 + zeroPadding,
            0
        );

        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 2;

        this.ctx.font = '12px Arial';
        this.ctx.fillStyle = 'white';
        this.ctx.fillOpacity = 1.0;

        this.ctx.beginPath();
        this.ctx.moveTo(minorTickWidth, 0);
        this.ctx.lineTo(minorTickWidth * 2, -5);
        this.ctx.lineTo(minorTickWidth * 2, -10);
        this.ctx.lineTo(altIndicatorWidth, -10);
        this.ctx.lineTo(altIndicatorWidth, 10);
        this.ctx.lineTo(minorTickWidth * 2, 10);
        this.ctx.lineTo(minorTickWidth * 2, 5);
        this.ctx.closePath();

        this.ctx.fill();
        this.ctx.strokeStyle = 'black';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(
            Math.round(this.altitude * 200) / 100,
            15, 4.5, altIndicatorHeight
        );

        this.ctx.restore();
    };


    AH.prototype.draw = function draw() {
        var width = $('#cockpit').innerWidth();
        var height = $('#cockpit').innerHeight();
        this.ctx.canvas.width = width
        this.ctx.canvas.height = height
        this.pixelsPerDeg = height / (frontCameraFovY / 2);
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.drawHorizon();
        this.drawZero();
        this.drawRoll();
        this.drawSpeed();
        this.drawAltitude();
    };

    window.Cockpit.plugins.push(AH);

}(window, jQuery));
