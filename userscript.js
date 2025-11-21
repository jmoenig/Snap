// ==UserScript==
// @name         Split! (userscript version)
// @namespace    http://github.com/e016/split-mod
// @version      2025-11-21
// @description  Make Snap! look like Scratch
// @author       d016
// @match        https://snap.berkeley.edu/snap/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=snap.berkeley.edu
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    SyntaxElementMorph.prototype.setScale = function (num) {
        var scale = Math.max(num, 1);
        var highContrast;
        try {
            highContrast = SpriteMorph?.prototype?.isHighContrast || false
        } catch (error) {
            highContrast = false
        }
        this.contrast = highContrast ? 70 : 25;//65;
        this.scale = scale;
        this.corner = 3 * scale;
        this.rounding = 9 * scale;
        this.edge = scale;
        this.flatEdge = scale * (highContrast ? 1 : 0.65);
        this.jag = 10 * scale;
        this.dentPlus = 1.4 * scale;
        this.dentCorner = 3.5 * scale;
        this.inset = 6.5 * scale;
        this.hatHeight = 15 * scale;
        this.hatWidth = 60 * scale;
        this.rfBorder = 0 * scale;
        this.minWidth = 6 * scale;
        this.dent = 11 * scale;
        this.bottomPadding = 9 * scale; //7 * scale;
        this.cSlotPadding = 4 * scale;
        this.typeInPadding = 3 * scale;
        this.labelPadding = 4 * scale;
        this.labelFontName = "Helvetica, Arial"; //'Verdana';
        this.labelFontStyle = "sans-serif";
        this.fontSize = 9.5 * scale; //10 * scale;
        this.embossing = new Point(
            -1 * Math.max(scale / 2, 1),
            -1 * Math.max(scale / 2, 1)
        );
        this.labelWidth = 450 * scale;
        this.labelWordWrap = true;
        this.dynamicInputLabels = true;
        this.feedbackMinHeight = 5;
        this.minSnapDistance = 20;
        this.reporterDropFeedbackPadding = 10 * scale;
        this.labelContrast = 25;
        this.activeHighlight = new Color(255, 242, 0);
        this.errorHighlight = new Color(255, 0, 0);
        this.activeBlur = 8 * this.scale;
        this.activeBorder = 3 * this.scale;
        this.rfColor = new Color(120, 120, 120);
    };
    SyntaxElementMorph.prototype.fixLayout = function () {
        var nb,
            parts = this.parts(),
            pos = this.position(),
            x = 0,
            y,
            lineHeight = 0,
            maxX = 0,
            blockWidth = this.minWidth,
            blockHeight,
            myself = this,
            l = [],
            lines = [],
            space = this.isPrototype ? 1 : Math.floor(fontHeight(this.fontSize) / 3),
            ico =
            this instanceof BlockMorph && this.hasLocationPin()
        ? this.methodIconExtent().x + space
        : 0,
            bottomCorrection,
            rightCorrection = 0,
            rightMost,
            hasLoopCSlot = false,
            hasLoopArrow = false;

        if (this instanceof MultiArgMorph && this.slotSpec !== "%cs") {
            blockWidth += this.arrows().width();
        } else if (this instanceof ReporterBlockMorph) {
            blockWidth += this.rounding * 2 + this.edge * 2;
        } else {
            blockWidth +=
                this.corner * 0.9 + this.edge * 2 + this.inset * 3 + this.dent;
        }

        if (this.nextBlock) {
            nb = this.nextBlock();
        }

        // determine lines
        parts.forEach((part) => {
            if (
                part instanceof CSlotMorph ||
                (part instanceof MultiArgMorph && part.slotSpec.includes("%cs"))
            ) {
                if (l.length > 0) {
                    lines.push(l);
                    lines.push([part]);
                    l = [];
                    x = 0;
                } else {
                    lines.push([part]);
                }
            } else if (this.isVertical() && !(part instanceof FrameMorph)) {
                // variadic ring-inputs are arranged vertically
                // except the arrows for expanding and collapsing them
                if (l.length > 0) {
                    lines.push(l);
                }
                if (part.isVisible) {
                    // ignore hidden collapse labels
                    l = [part];
                    x = part.fullBounds().width() + space;
                }
            } else {
                if (part.isVisible) {
                    x += part.fullBounds().width() + space;
                }
                if (x > this.labelWidth || part.isBlockLabelBreak) {
                    if (l.length > 0) {
                        lines.push(l);
                        l = [];
                        x = part.fullBounds().width() + space;
                    }
                }
                l.push(part);
                if (part.isBlockLabelBreak) {
                    x = 0;
                }
            }
        });
        if (l.length > 0) {
            lines.push(l);
        }

        // distribute parts on lines
        if (this instanceof CommandBlockMorph) {
            y = this.top() + this.corner + this.edge;
            if (this instanceof HatBlockMorph) {
                y += this.hatHeight;
            }
        } else if (this instanceof ReporterBlockMorph) {
            y = this.top() + this.edge * 2;
        } else if (this instanceof MultiArgMorph || this instanceof ArgLabelMorph) {
            y = this.top();
            if (this.slotSpec === "%cs" && this.inputs().length > 0) {
                y -= this.rounding;
            }
        }
        this.alwaysRound = lines.length == 1;
        this.lineCount = lines.length;
        lines.forEach((line, index) => {
            if (hasLoopCSlot) {
                hasLoopArrow = true;
                hasLoopCSlot = false;
            }
            x =
                this.left() +
                ico +
                this.edge +
                this.labelPadding /
                (line[0] instanceof InputSlotMorph &&
                 this.constructor.name.includes("ReporterBlockMorph") &&
                 !line[0]?.isReadOnly
                 ? 2
                 : 1);
            if (this instanceof RingMorph) {
                x = this.left() + space; //this.labelPadding;
            } else if (this?.isPredicate) {
                x = this.left() + ico + this.rounding * 1.3;
            } else if (this instanceof MultiArgMorph || this instanceof ArgLabelMorph) {
                x = this.left();
            } else if (
                this instanceof ReporterBlockMorph &&
                line[0] instanceof BlockLabelMorph
            ) {
                x =
                    this.left() +
                    ico +
                    this.edge +
                    this.labelPadding * (line[0] instanceof InputSlotMorph ? 1 : 1.5) + //(!(lines.length > 1) * 1.5) +
                    this.height() * ((lines.length > 1) * 0.5);
            }

            y += lineHeight;

            lineHeight = 0;
            line.forEach((part) => {
                if (part.isLoop) {
                    hasLoopCSlot = true;
                }
                if (
                    index == 0 && (!part?.isBlockLabelBreak && (part instanceof InputSlotMorph ||
                                                                part instanceof ReporterBlockMorph ||
                                                                (!(part instanceof BlockLabelMorph) &&
                                                                 !(part instanceof CSlotMorph) &&
                                                                 !(part instanceof ArrowMorph) &&
                                                                 !(part instanceof MultiArgMorph && part.slotSpec.includes("%cs")) &&
                                                                 !(part instanceof SymbolMorph)))) &&
                    this.constructor.name.includes("CommandBlockMorph")
                ) {
                    if (typeof x == "number") {
                        x = Math.max(
                            x,
                            this.left() + this.dent + this.inset + this.corner * 4
                        );
                    }
                }

                if (part instanceof CSlotMorph) {
                    x -= this.corner / 2;
                    if (this.isPredicate) {
                        x = this.left() + ico + this.rounding;
                    }
                    part.setColor(this.color);
                    part.setPosition(new Point(x, y));
                    lineHeight = part.height();
                } else if (
                    part instanceof MultiArgMorph &&
                    part.slotSpec.includes("%cs")
                ) {
                    if (this.isPredicate) {
                        x += this.corner;
                    }
                    part.setPosition(new Point(x, y));
                    lineHeight = part.height();
                    maxX = Math.max(
                        maxX,
                        Math.max(
                            ...part.children
                            .filter((each) => each.isVisible && !(each instanceof CSlotMorph))
                            .map((each) => each.right())
                        )
                    );
                } else {
                    if (part?.name == "loop") {
                        y += part.scale * 10;
                    }
                    if (
                        part instanceof MultiArgMorph &&
                        index == 0 &&
                        this.constructor.name.includes("ReporterBlockMorph") &&
                        !(this instanceof RingMorph)
                    ) {
                        x -= this.labelPadding / 2;
                    }
                    part.setPosition(new Point(x, y));
                    if (!part.isBlockLabelBreak) {
                        if (part.slotSpec === "%c" || part.slotSpec === "%loop") {
                            x += part.width();
                        } else if (part.isVisible) {
                            x += part.fullBounds().width() + space;
                        }
                    }
                    maxX = Math.max(maxX, x);
                    lineHeight = Math.max(
                        lineHeight,
                        part instanceof StringMorph ? part.rawHeight() : part.height()
                    );
                }
                var i = this instanceof CommandBlockMorph ? -2 : 0;
                lineHeight =
                    Math.max(
                    lineHeight - i,
                    this instanceof CommandBlockMorph ? this.scale * 22 : this.scale * 18
                ) + i;
            });

            // adjust label row below a loop-arrow C-slot to accomodate the loop icon
            if (hasLoopArrow) {
                x += this.fontSize * 1.5;
                maxX = Math.max(maxX, x);
                hasLoopArrow = false;
            }

            // center parts vertically on each line:
            line.forEach((part) => {
                part.moveBy(
                    new Point(
                        0,
                        Math.floor((lineHeight - part.height()) / 2) -
                        (part instanceof BlockLabelMorph ? 0.2 * this.scale : 0)
                    )
                );
            });
        });

        // determine my height:
        y += lineHeight;
        if (this.children.some((any) => any instanceof CSlotMorph)) {
            bottomCorrection = this.bottomPadding;
            rightMost = this.inputs()[this.inputs().length - 1];
            if (rightMost instanceof MultiArgMorph) {
                bottomCorrection = -this.bottomPadding;
                if (rightMost.slotSpec.includes("%cs")) {
                    if (rightMost.inputs().length) {
                        bottomCorrection -= this.bottomPadding;
                    } else {
                        bottomCorrection += this.bottomPadding / 4;
                    }
                }
            }
            if (this instanceof ReporterBlockMorph && !this.isPredicate) {
                bottomCorrection = Math.max(
                    this.bottomPadding,
                    this.rounding - this.bottomPadding
                );
            }
            y += bottomCorrection;
        }
        if (this instanceof CommandBlockMorph) {
            blockHeight = y - this.top() + this.corner * 2;
        } else if (this instanceof ReporterBlockMorph) {
            blockHeight = y - this.top() + this.edge * 2;
        } else if (this instanceof MultiArgMorph || this instanceof ArgLabelMorph) {
            blockHeight = y - this.top();
        }

        // determine my width:
        if (this.isPredicate) {
            blockWidth = Math.max(blockWidth, maxX - this.left() + this.rounding);
            rightCorrection = space;
        } else if (
            (this instanceof MultiArgMorph && this.slotSpec !== "%cs") ||
            this instanceof ArgLabelMorph
        ) {
            blockWidth = Math.max(blockWidth, maxX - this.left() - space);
        } else {
            blockWidth = Math.max(
                blockWidth,
                maxX - this.left() + this.labelPadding - this.edge
            );
            rightCorrection = space;
        }

        // adjust right padding if rightmost input has arrows
        rightMost = parts[parts.length - 1];
        if (
            rightMost instanceof MultiArgMorph &&
            rightMost.isVisible &&
            lines.length === 1
        ) {
            blockWidth -= rightCorrection;
        }
        // adjust right padding if rightmost input in a reporter is round
        if (
            rightMost instanceof InputSlotMorph && (this?.squareStrings ? !rightMost?.isStatic && this.isNumeric : !rightMost?.isStatic) &&
            this instanceof ReporterBlockMorph &&
            lines.length === 1
        ) {
            blockWidth -= this.labelPadding / 2;
        }

        // adjust width to hat width
        if (this instanceof HatBlockMorph) {
            blockWidth = Math.max(blockWidth, this.hatWidth * 1.1);
        }
        // adjust CSlotMorphs

        if (
            !(this.constructor.name == "JaggedBlockMorph") &&
            parts.some((part) => part instanceof CSlotMorph)
        ) {
            blockWidth = Math.max(blockWidth, 89 * this.scale);
        }
        // set my extent (silently, because we'll redraw later anyway):
        this.bounds.setWidth(blockWidth);
        this.bounds.setHeight(
            blockHeight + (this instanceof CommandBlockMorph ? this.dentPlus : 0)
        );

        // adjust CSlots and collect holes
        this.holes = [];
        parts.forEach((part) => {
            var adjustMultiWidth = 0;
            if (
                part instanceof CSlotMorph ||
                (part.slotSpec && part.slotSpec.includes("%cs"))
            ) {
                if (this.isPredicate) {
                    part.bounds.setWidth(
                        blockWidth - ico - this.rounding - this.inset - this.corner
                    );
                    adjustMultiWidth = this.corner;
                } else {
                    part.setRight(this.left() + this.width());
                    part.setLeft(this.left() + this.labelPadding);
                    part.bounds.corner.x =
                        part.bounds.origin.x + (this.width() - this.labelPadding);
                    //part.setWidth(this.width() - this.labelPadding);
                    //adjustMultiWidth = this.corner + this.edge;
                }
                if (part.fixLoopLayout) {
                    part.fixLoopLayout();
                }
            }
            if (part instanceof MultiArgMorph && part.slotSpec.includes("%cs")) {
                part
                    .inputs()
                    .filter((each) => each instanceof CSlotMorph)
                    .forEach(
                    (slot) =>
                    !(slot instanceof ArrowMorph) &&
                    slot.setLeft(this.left() + this.labelPadding)
                );
            }
            part.fixHolesLayout();
            this.holes.push.apply(
                this.holes,
                part.holes.map((hole) => hole.translateBy(part.position().subtract(pos)))
            );
        });

        // position next block:
        if (nb) {
            nb.setPosition(
                new Point(
                    this.left(),
                    this.bottom() - (this.corner + this.dentPlus + this.flatEdge)
                )
            );
        }

        // find out if one of my parents needs to be fixed
        if (this instanceof BlockMorph && this.parent && this.parent.fixLayout) {
            this.parent.fixLayout();
            this.parent.changed();
            if (this.parent instanceof SyntaxElementMorph) {
                return;
            }
        }

        this.fixHighlight();
    };
    var blockStyles = function () {
        CommandBlockMorph.prototype.outlinePath = function (ctx, inset) {
            var indent = this.corner * 2 + this.inset,
                bottom = this.height() - this.corner,
                bottomCorner = this.height() - this.corner * 2,
                radius = Math.max(this.corner - inset, 0),
                pos = this.position();

            // top left:
            ctx.arc(this.corner, this.corner, radius, radians(-180), radians(-90), false);

            // top dent:
            if (false) {
                ctx.lineTo(this.corner + this.inset, inset); //before dent
                ctx.arc(
                    this.corner / 2 + this.inset,
                    this.corner,
                    radius,
                    radians(-90),
                    radians(-45),
                    false
                );
                ctx.lineTo(indent / 1.1, this.corner / 2 + this.dentPlus + inset); //left edge of dent
                if (false) {
                    ctx.arc(
                        indent + this.corner / 2,
                        (this.corner + this.dentPlus + inset) / 1.5,
                        radius,
                        radians(45),
                        radians(180),
                        false
                    );
                }
                ctx.lineTo(indent, this.corner + this.dentPlus + inset);
                ctx.lineTo(indent + this.dent, this.corner + this.dentPlus + inset);
                ctx.lineTo(this.corner * 3 + this.inset + this.deltaPoint, inset); //right edge
                ctx.arc(
                    this.corner * 3.5 + this.inset + this.dent,
                    this.corner,
                    radius,
                    radians(-135),
                    radians(-90),
                    false
                );
            } else {
                var w = this.dent * 1.75 + this.corner / 2,
                    h = this.corner + this.dentPlus + inset / 2,
                    offset = this.inset + this.corner / 2,
                    c = this.dentCorner;
                ctx.lineTo(0 + offset, -h + h + inset);
                ctx.bezierCurveTo(
                    c + offset,
                    -h + h + inset,
                    c + offset,
                    -0 + h + inset,
                    c * 2 + offset,
                    -0 + h + inset / 4
                );
                ctx.lineTo(w - c * 2 + offset, h + inset / 4);
                ctx.bezierCurveTo(
                    w - c + offset,
                    0 + h + inset,
                    w - c + offset,
                    -h + h + inset,
                    w + offset,
                    -h + h + inset
                );
            }

            ctx.lineTo(this.width() - this.corner, inset); // after dent

            // top right:
            ctx.arc(
                this.width() - this.corner,
                this.corner,
                radius,
                radians(-90),
                radians(-0),
                false
            );

            // C-Slots
            this.cSlots().forEach((slot) => {
                slot.outlinePath(ctx, inset, slot.position().subtract(pos));
            });

            // bottom right:
            ctx.arc(
                this.width() - this.corner,
                bottomCorner - this.dentPlus,
                radius,
                radians(0),
                radians(90),
                false
            );

            if (!this.isStop()) {
                if (false) {
                    ctx.lineTo(this.width() - this.corner, bottom - inset - this.dentPlus);
                    ctx.lineTo(
                        this.corner * 3 + this.inset + this.dent,
                        bottom - inset + 0 - this.dentPlus
                    );
                    ctx.lineTo(indent + this.dent, bottom + this.corner - inset + 0);
                    ctx.lineTo(indent, bottom + this.corner - inset - 0);
                    ctx.arc(
                        this.corner / 0.9 + this.inset,
                        bottom + inset,
                        radius,
                        radians(-90),
                        radians(-45),
                        false
                    );
                } else {
                    ctx.save();
                    ctx.translate(0, bottom - this.dentPlus);
                    h -= inset;
                    ctx.lineTo(0 + offset, -h + h - inset);
                    ctx.bezierCurveTo(
                        c + offset,
                        -h + h - inset,
                        c + offset,
                        -0 + h - inset,
                        c * 2 + offset,
                        -0 + h - inset / 4
                    );
                    ctx.lineTo(w - c * 2 + offset, h - inset / 4);
                    ctx.bezierCurveTo(
                        w - c + offset,
                        0 + h - inset,
                        w - c + offset,
                        -h + h - inset,
                        w + offset,
                        -h + h - inset
                    );
                    ctx.restore();
                }
                ctx.lineTo(this.corner + this.inset, bottom - inset - this.dentPlus);
            }

            // bottom left:
            ctx.arc(
                this.corner,
                bottomCorner - this.dentPlus,
                radius,
                radians(90),
                radians(180),
                false
            );
        };
        ReporterBlockMorph.prototype.outlinePathOval = function (ctx, inset) {
            // draw the 'flat' shape
            var h = this.height(),
                r =
                this?.alwaysRound && !(this instanceof RingMorph)
            ? h / 2
            : Math.min((1 * this.rounding), h / 2),
                radius = Math.max(r - inset, 0),
                w = this.width(),
                pos = this.position();

            // top left:
            ctx.arc(r, r, radius, radians(-180), radians(-90), false);

            // top right:
            ctx.arc(w - r, r, radius, radians(-90), radians(-0), false);

            // C-Slots
            this.cSlots().forEach((slot) => {
                slot.outlinePath(ctx, inset, slot.position().subtract(pos));
            });

            // bottom right:
            ctx.arc(w - r, h - r, radius, radians(0), radians(90), false);

            // bottom left:
            ctx.arc(r, h - r, radius, radians(90), radians(180), false);

            ctx.lineTo(r - radius, r); // close the path so we can clip it for rings
        };

        ReporterBlockMorph.prototype.outlinePathDiamond = function (ctx, inset) {
            // draw the 'flat' shape:
            var w = this.width(),
                h = this.height(),
                h2 = Math.floor(h / 2),
                r = h / 2,
                right = w - r,
                pos = this.position(),
                cslots = this.cSlots();

            ctx.moveTo(inset, h2);
            ctx.lineTo(r, inset);
            ctx.lineTo(right - inset, inset);

            if (cslots.length) {
                this.cSlots().forEach((slot) => {
                    slot.outlinePath(ctx, inset, slot.position().subtract(pos));
                });
            } else {
                ctx.lineTo(w - inset, h2);
            }

            ctx.lineTo(right - inset, h - inset);
            ctx.lineTo(r, h - inset);
        };
        InputSlotMorph.prototype.render = function (ctx) {
            var borderColor, r, highContrast = SpriteMorph.prototype.isHighContrast;

            // initialize my surface property
            if (this.cachedNormalColor) {
                // if flashing
                borderColor = this.color;
            } else if (this.parent) {
                borderColor = this.parent.color;
            } else {
                borderColor = new Color(120, 120, 120);
            }
            ctx.fillStyle = highContrast ? this.color.darker(70).toString() : this.color.toString();
            if (this.isReadOnly && !this.cachedNormalColor) {
                // unless flashing
                ctx.fillStyle = borderColor.darker(highContrast ? 80 : 10).toString();
                if (this.isStatic) {
                    ctx.fillStyle = highContrast ? borderColor.darker(70).toString() : borderColor.toString();
                }
            }

            // cache my border colors
            this.cachedClr = borderColor.toString();
            this.cachedClrBright = borderColor.lighter(this.contrast).toString();
            this.cachedClrDark = borderColor.darker(this.contrast).toString();
            ctx.strokeStyle = this.parent.color.darker(20).toString();
            ctx.lineWidth = (this.isStatic || this.isReadOnly ? 1 : 1) * this.scale;
            if (this.squareStrings ? ((!this.isNumeric) && (!this.isReadOnly || this.isStatic)) : (this.isStatic || this instanceof TextSlotMorph)) {
                ctx.beginPath();
                if (false) {
                    ctx.strokeRect(
                        this.edge,
                        this.edge,
                        this.width() - this.edge * 2,
                        this.height() - this.edge * 2
                    );
                    ctx.fillRect(
                        this.edge,
                        this.edge,
                        this.width() - this.edge * 2,
                        this.height() - this.edge * 2
                    );
                }
                ctx.save();
                ctx.translate(ctx.lineWidth / 1.5, ctx.lineWidth / 1.5);
                ctx.arc(this.corner, this.corner, this.corner, radians(-180), radians(-90));
                ctx.arc(
                    this.width() - this.corner * 1.5,
                    this.corner,
                    this.corner,
                    radians(-90),
                    radians(0)
                );
                ctx.arc(
                    this.width() - this.corner * 1.5,
                    this.height() - this.corner * 1.5,
                    this.corner,
                    radians(0),
                    radians(90)
                );
                ctx.arc(
                    this.corner,
                    this.height() - this.corner * 1.5,
                    this.corner,
                    radians(90),
                    radians(180)
                );
                ctx.arc(this.corner, this.corner, this.corner, radians(-180), radians(-90));
                ctx.stroke();
                ctx.fill();
                ctx.restore();
                if (!MorphicPreferences.isFlat) {
                    this.drawRectBorder(ctx);
                }
            } else {
                r = Math.max((this.height() - this.edge * 2) / 2, 0);
                ctx.beginPath();
                ctx.arc(r + this.edge, r + this.edge, r, radians(90), radians(-90), false);
                ctx.arc(
                    this.width() - r - this.edge,
                    r + this.edge,
                    r,
                    radians(-90),
                    radians(90),
                    false
                );
                ctx.closePath();

                ctx.stroke();
                ctx.fill();
                if (!MorphicPreferences.isFlat) {
                    this.drawRoundBorder(ctx);
                }
            }

            // draw my "wish" block, if any
            if (this.selectedBlock) {
                ctx.drawImage(
                    this.doWithAlpha(1, () => this.selectedBlock.fullImage()),
                    this.edge + this.typeInPadding,
                    this.edge
                );
            }
        };
        // InputSlotMorph layout:

        InputSlotMorph.prototype.fixLayout = function () {
            var width,
                height,
                arrowWidth,
                contents = this.contents(),
                arrow = this.arrow(),
                tp = this.topBlock(),
                attempt = (x) => {
                    try {return x()} catch(e) {}
                },
                highContrast = attempt(()=>(SpriteMorph.prototype.isHighContrast));

            contents.isNumeric = this.isNumeric && !this.isAlphanumeric;
            contents.isEditable = !this.isReadOnly;
            if (this.isReadOnly) {
                contents.disableSelecting();
                contents.color = WHITE;
            } else {
                contents.enableSelecting();
                contents.color = highContrast ? WHITE : new Color(87, 94, 117);
                //contents.color = new Color(87, 94, 117);
            }
            arrow.color = this.isReadOnly || this.isStatic ? WHITE : (highContrast ? WHITE : BLACK);

            if (this.choices) {
                arrow.setSize(fontHeight(this.fontSize));
                arrow.show();
            } else {
                arrow.hide();
            }
            arrowWidth = arrow.isVisible ? arrow.width() + 4 * this.scale : 0;
            var arrowWidth0 = arrow.isVisible ? arrow.width() : 0;

            // determine slot dimensions
            if (this.selectedBlock) {
                // a "wish" in the OF-block's left slot
                height = this.selectedBlock.height() + this.edge * 2;
                width =
                    this.selectedBlock.width() +
                    arrowWidth +
                    this.edge * 2 +
                    this.typeInPadding * 2;
            } else if (this.symbol) {
                this.symbol.fixLayout();
                this.symbol.setPosition(this.position().add(this.edge * 2));
                height = this.symbol.height() + this.edge * 4;
                width =
                    this.symbol.width() + arrowWidth + this.edge * 4 + this.typeInPadding * 2;
            } else {
                height = contents.height() + this.edge * 8; // + this.typeInPadding * 2
                if (this.squareStrings ? !((!this.isNumeric) && (!this.isReadOnly || this.isStatic)) : (!(this instanceof TextSlotMorph) || !this.isStatic)) {

                    width = Math.max(
                        contents.width() +
                        Math.floor(arrowWidth * 0.5) +
                        height +
                        arrowWidth / 6 -
                        this.typeInPadding * 1.5,
                        this.scale * (this.isReadOnly ? 30 : 24)
                    );
                } else {
                    width = Math.max(
                        contents.width() +
                        arrowWidth +
                        this.edge * (arrowWidth > 0 ? 2 : 6) +
                        arrowWidth / 6 +
                        this.typeInPadding,
                        contents.rawHeight // single vs. multi-line contents
                        ? contents.rawHeight() + arrowWidth
                        : fontHeight(contents.fontSize) / 1.3 + arrowWidth,
                        this.scale * (this.isReadOnly ? 30 : 24)//this.minWidth // for text-type slots
                    );
                }
            }
            this.bounds.setExtent(new Point(width, height));
            //move everything inside
            if (true) {
                //this.isReadOnly || !(this instanceof TextSlotMorph)) {
                //this.isNumeric) {
                contents.setPosition(
                    new Point(
                        Math.floor(width / 2) -
                        contents.width() / 2 -
                        this.typeInPadding -
                        arrowWidth / 3,
                        this.edge + this.typeInPadding * 0.9
                    )
                    .add(new Point(this.typeInPadding, 0))
                    .add(this.position())
                );
            } else {
                contents.setPosition(
                    new Point(this.edge, this.edge + this.typeInPadding * 0.7)
                    .add(new Point(this.typeInPadding, 0))
                    .add(this.position())
                );
            }

            if (arrow.isVisible) {
                arrow.setPosition(
                    new Point(
                        this.right() - arrowWidth - this.edge,
                        contents.top() - arrowWidth0 / 8
                    )
                );
            }

            if (this.parent && this.parent.fixLayout) {
                tp.fullChanged();
                this.parent.fixLayout();
                tp.fullChanged();
            }
        };
        BooleanSlotMorph.prototype.drawDiamond = function (ctx, progress) {
            var w = this.width(),
                h = this.height(),
                r = h / 2,
                w2 = w / 2,
                shift = this.edge / 2,
                gradient;

            // draw the 'flat' shape:
            if (this.cachedNormalColor) {
                // if flashing
                ctx.fillStyle = this.color.toString();
            } else if (progress < 0) {
                // 'fade'
                ctx.fillStyle = this.color.darker(25).toString();
            } else {
                switch (this.value) {
                    case true:
                        ctx.fillStyle = "rgb(0, 200, 0)";
                        break;
                    case false:
                        ctx.fillStyle = "rgb(200, 0, 0)";
                        break;
                    default:
                        ctx.fillStyle = this.color.darker(25).toString();
                }
            }

            if (progress > 0 && !this.isEmptySlot()) {
                // left half:
                ctx.fillStyle = "rgb(0, 200, 0)";
                ctx.beginPath();
                ctx.moveTo(0, r);
                ctx.lineTo(r, 0);
                ctx.lineTo(w2, 0);
                ctx.lineTo(w2, h);
                ctx.lineTo(r, h);
                ctx.closePath();

                ctx.fill();

                // right half:
                ctx.fillStyle = "rgb(200, 0, 0)";
                ctx.beginPath();
                ctx.moveTo(w2, 0);
                ctx.lineTo(w - r, 0);
                ctx.lineTo(w, r);
                ctx.lineTo(w - r, h);
                ctx.lineTo(w2, h);
                ctx.closePath();
                ctx.fill();
            } else {
            }
            ctx.beginPath();
            ctx.moveTo(0, r);
            ctx.lineTo(r, 0);
            ctx.lineTo(w - r, 0);
            ctx.lineTo(w, r);
            ctx.lineTo(w - r, h);
            ctx.lineTo(r, h);
            ctx.closePath();
            ctx.lineWidth = 2 * this.scale;
            ctx.strokeStyle = this.color.darker();
            if (progress < 1) ctx.fill();

            if (MorphicPreferences.isFlat) {
                return;
            }

            // add 3D-Effect:
            ctx.lineWidth = this.edge;
            ctx.lineJoin = "round";
            ctx.lineCap = "round";

            if (useBlurredShadows) {
                ctx.shadowOffsetX = shift;
                ctx.shadowBlur = shift;
                ctx.shadowColor = "black";
            }

            // top edge: left corner
            gradient = ctx.createLinearGradient(
                0,
                r,
                this.edge * 0.6,
                r + this.edge * 0.6
            );
            gradient.addColorStop(1, this.cachedClrDark);
            gradient.addColorStop(0, this.cachedClr);
            ctx.strokeStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(shift, r);
            ctx.lineTo(r, shift);
            ctx.closePath();
            ctx.stroke();

            // top edge: straight line
            if (useBlurredShadows) {
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = shift;
                ctx.shadowBlur = this.edge;
            }

            gradient = ctx.createLinearGradient(0, 0, 0, this.edge);
            gradient.addColorStop(1, this.cachedClrDark);
            gradient.addColorStop(0, this.cachedClr);
            ctx.strokeStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(r, shift);
            ctx.lineTo(w - r, shift);
            ctx.closePath();
            ctx.stroke();

            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 0;

            // bottom edge: right corner
            gradient = ctx.createLinearGradient(
                w - r - this.edge * 0.6,
                h - this.edge * 0.6,
                w - r,
                h
            );
            gradient.addColorStop(1, this.cachedClr);
            gradient.addColorStop(0, this.cachedClrBright);
            ctx.strokeStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(w - r, h - shift);
            ctx.lineTo(w - shift, r);
            ctx.closePath();
            ctx.stroke();

            // bottom edge: straight line
            gradient = ctx.createLinearGradient(0, h - this.edge, 0, h);
            gradient.addColorStop(1, this.cachedClr);
            gradient.addColorStop(0, this.cachedClrBright);
            ctx.strokeStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(r, h - shift);
            ctx.lineTo(w - r - shift, h - shift);
            ctx.closePath();
            ctx.stroke();
        };
        BooleanSlotMorph.prototype.fixLayout = function () {
            // determine my extent
            var text, h;
            if (this.isWide()) {
                text = this.textLabelExtent();
                h = text.y + this.edge * 3;
                this.bounds.setWidth(text.x + h * 1.5 + this.edge * 2);
                this.bounds.setHeight(h + this.edge * 3);
            } else {
                this.bounds.setWidth((this.fontSize + this.edge * 3) * 2);
                this.bounds.setHeight(this.fontSize + this.edge * 7);
            }
        };
        SyntaxElementMorph.prototype.labelPart = function (spec) {
            var info = this.labelParts[spec],
                part,
                tokens,
                cnts,
                i;
            if (
                ((info && Object.hasOwn(info, "type")) ||
                 (spec[0] === "%" && spec.length > 1)) &&
                (this.selector !== "reportGetVar" ||
                 (["$turtleOutline", "$pipette"].includes(spec) &&
                  this.isObjInputFragment()))
            ) {
                // check for variable multi-arg-slot:
                if (spec.length > 5 && spec.slice(0, 5) === "%mult") {
                    part = new MultiArgMorph(
                        spec.slice(5),
                        null,
                        null,
                        null,
                        WHITE
                    );
                    part.initialSlots = 1;
                    part.addInput();
                    return part;
                }
                // check for input group multi-arg-slot:
                if (spec.length > 6 && spec.slice(0, 6) === "%group") {
                    tokens = spec
                        .slice(7)
                        .split("%")
                        .map((each) => "%" + each);
                    part = new MultiArgMorph(
                        tokens,
                        null,
                        null,
                        null,
                        WHITE
                    );
                    part.groupInputs = tokens.length;
                    return part;
                }

                // single-arg and specialized multi-arg slots:

                // look up the spec
                if (!info || !Object.hasOwn(info, "type")) {
                    throw new Error('label part spec not found: "' + spec + '"');
                }

                // create the morph
                switch (info.type) {
                    case "input":
                        part = new InputSlotMorph(null, null, info.menu);
                        part.onSetContents = info.react || null;
                        break;
                    case "text entry":
                        part = new TextSlotMorph();
                        break;
                    case "slot":
                        part = new ArgMorph(info.kind);
                        break;
                    case "boolean":
                        part = new BooleanSlotMorph();
                        break;
                    case "symbol":
                        part = new BlockSymbolMorph(info.name);
                        part.size = this.fontSize * (info.scale || 1);
                        part.color =
                            info.color || (WHITE);
                        part.shadowColor = this.color.darker(this.labelContrast);
                        part.shadowOffset = MorphicPreferences.isFlat ? ZERO : this.embossing;
                        part.fixLayout();
                        break;
                    case "c":
                        part = new CSlotMorph();
                        break;
                    case "command slot":
                        part = new CommandSlotMorph();
                        break;
                    case "ring":
                        part = new RingMorph();
                        part.color = SpriteMorph.prototype.blockColor.other;
                        part.selector = info.selector;
                        part.setSpec(info.spec);
                        part.isDraggable = true;
                        break;
                    case "ring slot":
                        switch (info.kind) {
                            case "command":
                                part = new RingCommandSlotMorph();
                                break;
                            case "reporter":
                                part = new RingReporterSlotMorph();
                                break;
                            case "predicate":
                                part = new RingReporterSlotMorph(true);
                                break;
                            default:
                                throw new Error('unknown ring kind: "' + info.kind + '"');
                        }
                        break;
                    case "template":
                        part = new TemplateSlotMorph(info.label);
                        break;
                    case "color":
                        part = new ColorSlotMorph();
                        break;
                    case "break":
                        part = new Morph();
                        part.setExtent(ZERO);
                        part.isBlockLabelBreak = true;
                        part.getSpec = () => "%br";
                        break;
                    case "variable":
                        part = new TemplateSlotMorph(info.label);
                        part = new ReporterBlockMorph();
                        part.category = "variables";
                        part.color = SpriteMorph.prototype.blockColor.variables;
                        part.setSpec(localize("Input name"));
                        break;
                    case "multi":
                        part = new MultiArgMorph(
                            info.slots,
                            info.label,
                            info.min || 0,
                            spec,
                            WHITE,
                            null,
                            null,
                            null,
                            null,
                            info.infix,
                            info.collapse,
                            info.dflt,
                            info.group
                        );
                        part.setMaxSlots(info.max);
                        part.initialSlots = Math.max(
                            // this needs some fixing
                            part.initialSlots,
                            isNil(info.min) ? 0 : +info.min,
                            isNil(info.defaults) ? 0 : +info.defaults
                        );
                        for (i = 0; i < info.defaults || 0; i += 1) {
                            part.addInput();
                        }
                        break;
                    default:
                        throw new Error('unknown label part type: "' + info.type + '"');
                }

                // apply the tags
                // ---------------
                // input: numeric, numstring, alphanum, read-only, unevaluated,
                //        landscape, static
                // text entry: monospace
                // boolean: unevaluated, static
                // symbol: static, fading, protected
                // c: loop, static, lambda
                // command slot: (none)
                // ring: static
                // ring slot: static
                // template: (none)
                // color: static
                // break: (none)
                // variable: (none)
                // multi: widget

                if (info.tags) {
                    info.tags.split(" ").forEach((tag) => {
                        if (tag) {
                            switch (tag) {
                                case "numeric":
                                    part.isNumeric = true;
                                    break;
                                case "alphanum":
                                    part.isNumeric = true;
                                    part.isAlphanumeric = true;
                                    break;
                                case "numstring":
                                    part.isNumeric = true;
                                    part.evaluateAsString = true;
                                    break;
                                case "read-only":
                                    part.isReadOnly = true;
                                    if (!MorphicPreferences.isFlat) {
                                        // addjust initial dimensions
                                        cnts = part.contents();
                                        cnts.shadowOffset = new Point(1, 1);
                                        cnts.fixLayout();
                                    }
                                    break;
                                case "unevaluated":
                                    part.isUnevaluated = true;
                                    break;
                                case "static":
                                    part.isStatic = true;
                                    break;
                                case "landscape":
                                    part.minWidth = part.height() * 1.7;
                                    break;
                                case "monospace":
                                    part.contents().fontName = "monospace";
                                    part.contents().fontStyle = "monospace";
                                    break;
                                case "fading":
                                    part.isFading = true;
                                    break;
                                case "protected":
                                    part.isProtectedLabel = true;
                                    break;
                                case "loop":
                                    part.isLoop = true;
                                    var labelPart = this.labelPart("$loopArrow");
                                    if (labelPart.name == "loop") {
                                        labelPart.changed();
                                        labelPart.size = labelPart.size * 2;
                                        labelPart.fixLayout();
                                    }
                                    part.add(labelPart);
                                    break;
                                case "lambda":
                                    part.isLambda = true;
                                    break;
                                case "widget":
                                    part.canBeEmpty = false;
                                    break;
                                default:
                                    throw new Error('unknown label part tag: "' + tag + '"');
                            }
                        }
                    });
                    part.fixLayout();
                }

                // apply the default value
                // -----------------------
                // only for input slots and Boolean inputs,
                // and only for rare exceptions where we cannot
                // specify the default values in the block specs,
                // e.g. for expandable "reeiver" slots in "broadcast"

                if (!isNil(info.value)) {
                    part.setContents(info.value);
                }
            } else if (
                spec[0] === "$" &&
                spec.length > 1 &&
                this.selector !== "reportGetVar"
            ) {
                // allow GUI symbols as label icons
                // usage: $symbolName[-size-r-g-b], size and color values are optional
                // If there isn't a symbol under that name, it just styles whatever is
                // after "$", so you can add unicode icons to your blocks, for example
                // ☺️
                tokens = spec.slice(1).split("-");
                if (!contains(SymbolMorph.prototype.names, tokens[0])) {
                    part = new StringMorph(tokens[0]);
                    part.isBold = true;
                    part.fontName = this.labelFontName;
                    part.fontStyle = this.labelFontStyle;
                    part.fontSize = this.fontSize * (+tokens[1] || 1);
                } else {
                    part = new BlockSymbolMorph(tokens[0]);
                    part.size = this.fontSize * (+tokens[1] || 1.2);
                }
                part.color = new Color(
                    +tokens[2] === 0 ? 0 : +tokens[2] || 255,
                    +tokens[3] === 0 ? 0 : +tokens[3] || 255,
                    +tokens[4] === 0 ? 0 : +tokens[4] || 255
                );
                part.isProtectedLabel = tokens.length > 2; // zebra colors
                part.shadowColor = this.color.darker(this.labelContrast);
                part.shadowOffset = MorphicPreferences.isFlat ? ZERO : this.embossing;
                part.fixLayout();
            } else {
                part = new BlockLabelMorph(
                    spec, // text
                    this.fontSize, // fontSize
                    this.labelFontStyle, // fontStyle
                    false, //true, // bold
                    false, // italic
                    false, // isNumeric
                    MorphicPreferences.isFlat ? ZERO : this.embossing, // shadowOffset
                    this.color.darker(this.labelContrast), // shadowColor
                    WHITE, // color
                    this.labelFontName // fontName
                );
            }


            return part;
        };
        ColorSlotMorph.prototype.getUserColor = function () {
            var myself = this,
                world = this.world(),
                hand = world.hand,
                posInDocument = getDocumentPositionOf(world.worldCanvas),
                mouseMoveBak = hand.processMouseMove,
                mouseDownBak = hand.processMouseDown,
                mouseUpBak = hand.processMouseUp,
                pal = new ColorPaletteMorph(
                    null,
                    new Point(this.fontSize * 16, this.fontSize * 10)
                ),
                gPal = new GrayPaletteMorph(
                    null,
                    new Point(this.fontSize * 16, this.fontSize * 1)
                ),
                ctx;
            world.add(pal);
            world.add(gPal);
            pal.setPosition(this.bottomLeft().add(new Point(0, this.edge)));
            gPal.setPosition(
                this.bottomLeft().add(new Point(0, this.edge + this.fontSize * 10))
            );

            // cache the world surface property (its full image)
            // to prevent memory issues from constantly generating
            // huge canvasses and and reading back pixel data only once
            // note: this optimization makes it hard / impossible for the
            // user to "catch" and sample the color of moving sprites
            // but without it Chrome crashes as of Fall 2023
            ctx = Morph.prototype.fullImage
                .call(world)
                .getContext("2d", { willReadFrequently: true });

            hand.processMouseMove = function (event) {
                var pos = hand.position(),
                    dta = ctx.getImageData(pos.x, pos.y, 1, 1).data;
                hand.setPosition(
                    new Point(event.pageX - posInDocument.x, event.pageY - posInDocument.y)
                );
                myself.setColor(new Color(dta[0], dta[1], dta[2]));
            };

            hand.processMouseDown = nop;

            hand.processMouseUp = function () {
                pal.destroy();
                gPal.destroy();
                hand.processMouseMove = mouseMoveBak;
                hand.processMouseDown = mouseDownBak;
                hand.processMouseUp = mouseUpBak;
            };
        };
        ColorSlotMorph.prototype.fixLayout = function () {
            // determine my extent
            var side = this.fontSize + this.edge * 2 + this.typeInPadding * 2;
            this.bounds.setWidth(side * 1.3);
            this.bounds.setHeight(side * 1.1);
        };

        ColorSlotMorph.prototype.render = function (ctx) {
            var borderColor;

            if (this.parent) {
                borderColor = this.parent.color;
            } else {
                borderColor = new Color(120, 120, 120);
            }
            ctx.fillStyle = this.color.toString();
            ctx.strokeStyle = "#FFFFFF";
            ctx.lineWidth = 1 * this.scale;
            // cache my border colors
            this.cachedClr = borderColor.toString();
            this.cachedClrBright = borderColor.lighter(this.contrast).toString();

            this.cachedClrDark = borderColor.darker(this.contrast).toString();

            if (false) {
                ctx.fillRect(
                    this.edge,
                    this.edge,
                    this.width() - this.edge * 2,
                    this.height() - this.edge * 2
                );
            } else {
                var r = Math.max((this.height() - this.edge * 2) / 2, 0);
                ctx.beginPath();
                ctx.arc(r + this.edge, r + this.edge, r, radians(90), radians(-90), false);
                ctx.arc(
                    this.width() - r - this.edge,
                    r + this.edge,
                    r,
                    radians(-90),
                    radians(90),
                    false
                );
                ctx.closePath();

                ctx.stroke();
                ctx.fill();
            }
            if (!MorphicPreferences.isFlat) {
                this.drawRectBorder(ctx);
            }
        };
        CSlotMorph.prototype.outlinePath = function (ctx, inset, offset) {
            var ox = offset.x,
                oy = offset.y,
                radius = Math.max(this.corner - inset, 0);

            // top corner:
            ctx.lineTo(this.width() + ox - inset, oy);

            // top right:
            ctx.arc(
                this.width() - this.corner + ox,
                oy,
                radius,
                radians(90),
                radians(0),
                true
            );

            // jigsaw shape:
            ctx.lineTo(this.width() - this.corner + ox, this.corner + oy - inset);
            if (false) {
                ctx.lineTo(
                    this.inset * 2 + this.corner * 3 + this.dent + ox,
                    this.corner + oy - inset
                );
                ctx.lineTo(
                    this.inset * 2 + this.corner * 2 + this.dent + ox,
                    this.corner * 2 + oy - inset + this.dentPlus
                );
                ctx.lineTo(
                    this.inset * 2 + this.corner * 2 + ox,
                    this.corner * 2 + oy - inset + this.dentPlus
                );

                ctx.lineTo(this.inset * 2 + this.corner + ox, this.corner + oy - inset);
                ctx.lineTo(this.inset + this.corner + ox, this.corner + oy - inset);
            } else {
                var w = this.dent * 1.75 + this.corner / 2,
                    h = this.corner + this.dentPlus,
                    offset = this.inset * 1 + this.dent / 1.6 + ox,
                    c = this.dentCorner;
                ctx.save();
                ctx.translate(1 * this.scale, this.corner + oy - inset);
                ctx.lineTo(0 + offset, -h + h);
                ctx.bezierCurveTo(
                    c + offset,
                    -h + h,
                    c + offset,
                    -0 + h,
                    c * 2 + offset,
                    -0 + h
                );
                ctx.lineTo(w - c * 2 + offset, h);
                ctx.bezierCurveTo(
                    w - c + offset,
                    0 + h,
                    w - c + offset,
                    -h + h,
                    w + offset,
                    -h + h
                );
                ctx.restore();
            }
            ctx.arc(
                this.inset + this.corner + ox,
                this.corner * 2 + oy,
                this.corner + inset,
                radians(270),
                radians(180),
                true
            );

            // bottom:
            ctx.lineTo(
                this.inset + ox - inset,
                this.height() - this.corner * 2 + oy - this.dentPlus
            );
            ctx.arc(
                this.inset + this.corner + ox,
                this.height() - this.corner * 2 + oy - this.dentPlus,
                this.corner + inset,
                radians(180),
                radians(90),
                true
            );
            var block = this.nestedBlock(),
                flatEdge = true;
            if (!isNil(block)) {
                /*while (!isNil(block) && !(block.isUnattached())) {
    if(isNil(block) || (block.isUnattached())) {
      flatEdge = false
      break
    } else {
      block = block.nextBlock()
    }
  }
    */
            }
            if (flatEdge) {
                ctx.save();
                ctx.translate(1 * this.scale, this.height() - this.corner + oy + inset - this.dentPlus);
                ctx.lineTo(0 + offset, -h + h);
                ctx.bezierCurveTo(
                    c + offset,
                    -h + h,
                    c + offset,
                    -0 + h,
                    c * 2 + offset,
                    -0 + h
                );
                ctx.lineTo(w - c * 2 + offset, h);
                ctx.bezierCurveTo(
                    w - c + offset,
                    0 + h,
                    w - c + offset,
                    -h + h,
                    w + offset,
                    -h + h
                );
                ctx.restore();
                ctx.lineTo(
                    this.width() - this.corner + ox,
                    this.height() - this.corner + oy + inset - this.dentPlus
                );
            }
            ctx.arc(
                this.width() - this.corner + ox,
                this.height() + oy - this.dentPlus,
                radius,
                radians(-90),
                radians(-0),
                false
            );
        };
        // CSlotMorph layout:

        CSlotMorph.prototype.fixLayout = function () {
            var nb = this.nestedBlock();
            if (nb) {
                nb.setPosition(
                    new Point(this.left() + this.inset, this.top() + this.corner)
                );
                this.bounds.setHeight(nb.fullBounds().height() + this.corner);
                this.bounds.setWidth(nb.fullBounds().width() + this.cSlotPadding * 2);
            } else {
                this.bounds.setHeight(this.corner * 6 + this.cSlotPadding); // default
                this.bounds.setWidth(
                    this.corner * 4 + this.inset * 2 + this.dent + this.cSlotPadding * 2
                );
            }

            if (this.parent && this.parent.fixLayout) {
                this.parent.fixLayout();
            }
        };

        CSlotMorph.prototype.fixLoopLayout = function () {
            var loop;
            if (this.isLoop) {
                loop = this.loop();
                if (loop) {
                    loop.setRight(this.right() - this.corner);
                    loop.setBottom(this.bottom() + this.cSlotPadding + this.edge * 5);
                }
            }
        };
        // HatBlockMorph drawing:

        HatBlockMorph.prototype.outlinePath = function (ctx, inset) {
            var indent = this.corner * 2 + this.inset,
                bottom = this.height() - this.corner,
                bottomCorner = this.height() - this.corner * 2,
                radius = Math.max(this.corner - inset, 0),
                s = this.hatWidth,
                h = this.hatHeight,
                r = (4 * h * h + s * s) / (8 * h),
                a = degrees(4 * Math.atan((2 * h) / s)),
                sa = a / 2,
                sp = Math.min(s * 1.7, this.width() - this.corner),
                pos = this.position();

            // top arc:
            ctx.moveTo(inset, h + this.corner);
            ctx.ellipse(
                s / 2,
                r / 1.4 + inset + 4 * this.scale,
                r,
                r / 1.4,
                0,
                radians(-sa - 90),
                radians(-90),
                0
            );
            ctx.ellipse(
                s / 2,
                r / 1.4 + inset + 4 * this.scale,
                r,
                r / 1.4,
                0,
                radians(-sa - 90),
                radians(sa - 90)
            );
            /*ctx.bezierCurveTo(
        s,
        0,
        s,
        h,
        sp,
        h
    );*/

            // top right:
            ctx.arc(
                this.width() - this.corner,
                h + this.corner,
                radius,
                radians(-90),
                radians(-0),
                false
            );

            // C-Slots
            this.cSlots().forEach((slot) => {
                slot.outlinePath(ctx, inset, slot.position().subtract(pos));
            });

            // bottom right:
            ctx.arc(
                this.width() - this.corner,
                bottomCorner - this.dentPlus,
                radius,
                radians(0),
                radians(90),
                false
            );

            if (!this.isStop()) {
                if (false) {
                    ctx.lineTo(this.width() - this.corner, bottom - inset - this.dentPlus);
                    ctx.lineTo(
                        this.corner * 3 + this.inset + this.dent,
                        bottom - inset - this.dentPlus
                    );
                    ctx.lineTo(indent + this.dent, bottom + this.corner - inset);
                    ctx.lineTo(indent, bottom + this.corner - inset);
                    ctx.lineTo(this.corner + this.inset, bottom - inset - this.dentPlus);
                } else {
                    var w = this.dent * 1.75 + this.corner / 2,
                        h = this.corner + this.dentPlus,
                        offset = this.inset + this.corner / 2,
                        c = this.dentCorner;
                    ctx.save();
                    ctx.translate(0, bottom - inset - this.dentPlus * 1);
                    ctx.lineTo(0 + offset, -h + h);
                    ctx.bezierCurveTo(
                        c + offset,
                        -h + h,
                        c + offset,
                        -0 + h,
                        c * 2 + offset,
                        -0 + h
                    );
                    ctx.lineTo(w - c * 2 + offset, h);
                    ctx.bezierCurveTo(
                        w - c + offset,
                        0 + h,
                        w - c + offset,
                        -h + h,
                        w + offset,
                        -h + h
                    );
                    ctx.restore();
                }
            }

            // bottom left:
            ctx.arc(
                this.corner,
                bottomCorner - this.dentPlus,
                radius,
                radians(90),
                radians(180),
                false
            );
        };
        CommandBlockMorph.prototype.nextBlock = function (block) {
            // set / get the block attached to my bottom
            if (block) {
                var nb = this.nextBlock(),
                    affected = this.parentThatIsA(CommandSlotMorph, ReporterSlotMorph);
                this.add(block);
                if (nb) {
                    block.bottomBlock().nextBlock(nb);
                }
                block.setPosition(
                    new Point(
                        this.left(),
                        this.bottom() - this.corner - this.dentPlus - this.flatEdge
                    )
                );
                if (affected) {
                    affected.fixLayout();
                }
            } else {
                return detect(
                    this.children,
                    (child) => child instanceof CommandBlockMorph && !child.isPrototype
                );
            }
        };
        CommandSlotMorph.prototype.fixLayout = function () {
  var nb = this.nestedBlock();
  if (this.parent) {
    if (!this.color.eq(this.parent.color)) {
      this.setColor(this.parent.color);
    }
  }
  if (nb) {
    nb.setPosition(
      new Point(
        this.left() + this.edge + this.rfBorder,
        this.top() + this.edge + this.rfBorder
      )
    );
    this.bounds.setWidth(
      nb.fullBounds().width() + (this.edge + this.rfBorder) * 2
    );
    this.bounds.setHeight(
      nb.fullBounds().height() +
        this.edge +
        this.rfBorder * 2 -
        (this.corner - this.edge)
    );
  } else {
    this.bounds.setHeight(this.corner * 5);
    this.bounds.setWidth(this.corner * 4 + this.inset + this.dent * 1.3);
  }
  if (this.parent && this.parent.fixLayout) {
    this.parent.fixLayout();
  }
};
        RingCommandSlotMorph.prototype.outlinePath = function (ctx, offset) {
  var ox = offset.x,
    oy = offset.y,
    isFilled = this.nestedBlock() !== null,
    ins = isFilled ? this.inset : this.inset / 2,
    dent = isFilled ? this.dent : this.dent,
    indent = this.corner * 2 + ins,
    edge = this.edge,
    w = this.width(),
    h = this.height(),
    rf = isFilled ? this.rfBorder : 0,
    y = h - this.corner - edge;

  // top left:
  ctx.arc(
    this.corner + edge + ox,
    this.corner + edge + oy,
    this.corner,
    radians(-180),
    radians(-90),
    false
  );

  // dent:
  //ctx.lineTo(this.corner + ins + edge + rf * 2 + ox, edge + oy);
  if (false) {
    ctx.lineTo(
      indent + edge + rf * 2 + ox,
      this.corner + edge + oy + this.dentPlus
    );
    ctx.lineTo(
      indent + edge + rf * 2 + (dent - rf * 2) + ox,
      this.corner + edge + oy + this.dentPlus
    );
    ctx.lineTo(
      indent + edge + rf * 2 + (dent - rf * 2) + this.corner + ox,
      edge + oy
    );
  } else {
    (() => {
      const dentW = this.dent * 1.75 + this.corner / 2,
        inset = oy,
        dentH = this.corner + this.dentPlus,
        dentOffset = this.corner / 2 + ins + edge + rf * 2 + ox,
        c = this.dentCorner;
      ctx.save();
      ctx.translate(0, inset + 1);
      ctx.lineTo(0 + dentOffset, -dentH + dentH);
      ctx.bezierCurveTo(
        c + dentOffset,
        -dentH + dentH,
        c + dentOffset,
        -0 + dentH,
        c * 2 + dentOffset,
        -0 + dentH
      );
      ctx.lineTo(dentW - c * 2 + dentOffset, dentH);
      ctx.bezierCurveTo(
        dentW - c + dentOffset,
        0 + dentH,
        dentW - c + dentOffset,
        -dentH + dentH,
        dentW + dentOffset,
        -dentH + dentH
      );
      ctx.restore();
    })();
  }
  ctx.lineTo(this.width() - this.corner - edge + ox, edge + oy);

  // top right:
  ctx.arc(
    w - this.corner - edge + ox,
    this.corner + edge + oy,
    this.corner,
    radians(-90),
    radians(-0),
    false
  );

  // bottom right:
  ctx.arc(
    this.width() - this.corner - edge + ox,
    y + oy - this.dentPlus,
    this.corner,
    radians(0),
    radians(90),
    false
  );

  // bottom left:
  ctx.arc(
    this.corner + edge + ox,
    y + oy - this.dentPlus,
    this.corner,
    radians(90),
    radians(180),
    false
  );

  // close the path, so we can clip it:
  ctx.lineTo(
    this.corner + edge + ox - this.corner, // this needs to be adjusted
    this.corner + edge + oy
  );
};
        RingReporterSlotMorph.prototype.outlinePathOval = function (ctx, offset) {
  var ox = offset.x,
    oy = offset.y,
    w = this.width(),
    h = this.height(),
    r = Math.min(h / 2, h / 2);

  // top left:
  ctx.arc(
    r + this.edge + ox,
    r + this.edge + oy,
    r,
    radians(-180),
    radians(-90),
    false
  );

  // top right:
  ctx.arc(
    w - r - this.edge + ox,
    r + this.edge + oy,
    r,
    radians(-90),
    radians(-0),
    false
  );

  // bottom right:
  ctx.arc(
    w - r - this.edge + ox,
    h - r - this.edge + oy,
    r,
    radians(0),
    radians(90),
    false
  );

  // bottom left:
  ctx.arc(
    r + this.edge + ox,
    h - r - this.edge + oy,
    r,
    radians(90),
    radians(180),
    false
  );

  // "close" the path
  ctx.lineTo(this.edge + ox, r + this.edge + oy);
};

RingReporterSlotMorph.prototype.drawEdgesOval = function (ctx) {
  var h = this.height(),
    r = Math.min(h / 2, h / 2),
    w = this.width(),
    shift = this.edge / 2,
    gradient;

  // add 3D-Effect:
  ctx.lineWidth = this.edge;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  // bottom left corner
  ctx.strokeStyle = this.cachedClr;
  ctx.beginPath();
  ctx.arc(r, h - r, r - shift, radians(90), radians(180), false);
  ctx.stroke();

  // top right corner
  ctx.strokeStyle = this.cachedClr;
  ctx.beginPath();
  ctx.arc(w - r, r, r - shift, radians(-90), radians(0), false);
  ctx.stroke();

  // normal gradient edges

  if (useBlurredShadows) {
    ctx.shadowOffsetX = shift;
    ctx.shadowOffsetY = shift;
    ctx.shadowBlur = this.edge;
    ctx.shadowColor = this.color.darker(80).toString();
  }

  // top edge: straight line
  gradient = ctx.createLinearGradient(0, 0, 0, this.edge);
  gradient.addColorStop(1, this.cachedClrDark);
  gradient.addColorStop(0, this.cachedClr);
  ctx.strokeStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(r - shift, shift);
  ctx.lineTo(w - r + shift, shift);
  ctx.stroke();

  // top edge: left corner
  gradient = ctx.createRadialGradient(r, r, r - this.edge, r, r, r);
  gradient.addColorStop(1, this.cachedClr);
  gradient.addColorStop(0, this.cachedClrDark);
  ctx.strokeStyle = gradient;
  ctx.beginPath();
  ctx.arc(r, r, r - shift, radians(180), radians(270), false);
  ctx.stroke();

  // left edge: straight vertical line
  gradient = ctx.createLinearGradient(0, 0, this.edge, 0);
  gradient.addColorStop(1, this.cachedClrDark);
  gradient.addColorStop(0, this.cachedClr);
  ctx.strokeStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(shift, r);
  ctx.lineTo(shift, h - r);
  ctx.stroke();

  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 0;

  // bottom edge: right corner
  gradient = ctx.createRadialGradient(
    w - r,
    h - r,
    r - this.edge,
    w - r,
    h - r,
    r
  );
  gradient.addColorStop(1, this.cachedClr);
  gradient.addColorStop(0, this.cachedClrBright);
  ctx.strokeStyle = gradient;
  ctx.beginPath();
  ctx.arc(w - r, h - r, r - shift, radians(0), radians(90), false);
  ctx.stroke();

  // bottom edge: straight line
  gradient = ctx.createLinearGradient(0, h - this.edge, 0, h);
  gradient.addColorStop(1, this.cachedClr);
  gradient.addColorStop(0, this.cachedClrBright);
  ctx.strokeStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(r - shift, h - shift);
  ctx.lineTo(w - r + shift, h - shift);
  ctx.stroke();

  // right edge: straight vertical line
  gradient = ctx.createLinearGradient(w - this.edge, 0, w, 0);
  gradient.addColorStop(1, this.cachedClr);
  gradient.addColorStop(0, this.cachedClrBright);
  ctx.strokeStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(w - shift, r + shift);
  ctx.lineTo(w - shift, h - r);
  ctx.stroke();
};

RingReporterSlotMorph.prototype.outlinePathDiamond = function (ctx, offset) {
  var ox = offset.x,
    oy = offset.y,
    w = this.width(),
    h = this.height(),
    h2 = Math.floor(h / 2),
    r = Math.min(h2, h2);

  ctx.moveTo(ox + this.edge, h2 + oy);
  ctx.lineTo(r + this.edge + ox, this.edge + oy);
  ctx.lineTo(w - r - this.edge + ox, this.edge + oy);
  ctx.lineTo(w - this.edge + ox, h2 + oy);
  ctx.lineTo(w - r - this.edge + ox, h - this.edge + oy);
  ctx.lineTo(r + this.edge + ox, h - this.edge + oy);
  ctx.lineTo(ox + this.edge, h2 + oy);
};

RingReporterSlotMorph.prototype.drawEdgesDiamond = function (ctx) {
  var w = this.width(),
    h = this.height(),
    h2 = Math.floor(h / 2),
    r = h2, //Math.min(this.rounding, h2),
    shift = this.edge / 2,
    gradient;

  // add 3D-Effect:
  ctx.lineWidth = this.edge;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  // half-tone edges
  // bottom left corner
  ctx.strokeStyle = this.cachedClr;
  ctx.beginPath();
  ctx.moveTo(shift, h2);
  ctx.lineTo(r, h - shift);
  ctx.stroke();

  // top right corner
  ctx.strokeStyle = this.cachedClr;
  ctx.beginPath();
  ctx.moveTo(w - shift, h2);
  ctx.lineTo(w - r, shift);
  ctx.stroke();

  // normal gradient edges
  // top edge: left corner

  if (useBlurredShadows) {
    ctx.shadowOffsetX = shift;
    ctx.shadowOffsetY = shift;
    ctx.shadowBlur = this.edge;
    ctx.shadowColor = this.color.darker(80).toString();
  }

  gradient = ctx.createLinearGradient(0, 0, r, 0);
  gradient.addColorStop(1, this.cachedClrDark);
  gradient.addColorStop(0, this.cachedClr);
  ctx.strokeStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(shift, h2);
  ctx.lineTo(r, shift);
  ctx.stroke();

  // top edge: straight line
  gradient = ctx.createLinearGradient(0, 0, 0, this.edge);
  gradient.addColorStop(1, this.cachedClrDark);
  gradient.addColorStop(0, this.cachedClr);
  ctx.strokeStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(r, shift);
  ctx.lineTo(w - r, shift);
  ctx.stroke();

  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 0;

  // bottom edge: right corner
  gradient = ctx.createLinearGradient(w - r, 0, w, 0);
  gradient.addColorStop(1, this.cachedClr);
  gradient.addColorStop(0, this.cachedClrBright);
  ctx.strokeStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(w - r, h - shift);
  ctx.lineTo(w - shift, h2);
  ctx.stroke();

  // bottom edge: straight line
  gradient = ctx.createLinearGradient(0, h - this.edge, 0, h);
  gradient.addColorStop(1, this.cachedClr);
  gradient.addColorStop(0, this.cachedClrBright);
  ctx.strokeStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(r + shift, h - shift);
  ctx.lineTo(w - r - shift, h - shift);
  ctx.stroke();
};
        ReporterSlotMorph.prototype.fixLayout = function () {
  var contents = this.contents();
  if (!contents) {
    contents = this.emptySlot();
    this.add(contents);
  }
  this.bounds.setExtent(
    contents.extent().add(this.edge * 2 + this.rfBorder * 2)
  );
  contents.setCenter(this.center());
  if (this.parent) {
    if (this.parent.fixLayout) {
      this.parent.fixLayout();
    }
  }
};
        ReporterSlotMorph.prototype.emptySlot = function () {
  var empty = new ArgMorph(),
    shrink = 0; //this.rfBorder * 2 + this.edge * 2;
  empty.color = this.rfColor;
  empty.alpha = 0;
  empty.bounds.setExtent(
    new Point(
      (this.fontSize + this.edge * 2) * (this.isBoolean ? 2.5 : 2) - shrink,
      this.fontSize * 1.3 + this.edge * 3 - shrink
    )
  );
  return empty;
};

    };
    function setSymbolImages() {
        SymbolMorph.prototype.symbolWidth = function () {
            // private
            var size = this.size;

            switch (this.name) {
                case "pointRight":
                    return Math.sqrt(size * size - Math.pow(size / 2, 2));
                case "verticalEllipsis":
                    return size * 0.2;
                case "dot":
                    return size * 0.4;
                case "listNarrow":
                    return size * 0.5;
                case "location":
                    return size * 0.6;
                case "flash":
                case "file":
                case "list":
                    return size * 0.8;
                case "smallStage":
                case "normalStage":
                    return size * 1.2;
                case "turtle":
                case "turtleOutline":
                case "stage":
                    return size * 1.3;
                case "cloud":
                case "cloudGradient":
                case "cloudOutline":
                case "turnBack":
                case "turnForward":
                case "keyboard":
                case "keyboardFilled":
                    return size * 1.6;
                case "infinity":
                    return size * 1.75;
                case "turnRight":
                case "turnLeft":
                    return size;
                case "loop":
                    return size * 1.1;
                default:
                    return size;
            }
        };

        SymbolMorph.prototype.flagSymbol = new Image();
        SymbolMorph.prototype.flagSymbol.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJMYXllcl8xIiBkYXRhLW5hbWU9IkxheWVyIDEiIHZpZXdCb3g9IjAgMCAxNi42MyAxNy41Ij48ZGVmcz48c3R5bGU+LmNscy0xLC5jbHMtMntmaWxsOiM0Y2JmNTY7c3Ryb2tlOiM0NTk5M2Q7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO30uY2xzLTJ7c3Ryb2tlLXdpZHRoOjEuNXB4O308L3N0eWxlPjwvZGVmcz48dGl0bGU+aWNvbi0tZ3JlZW4tZmxhZzwvdGl0bGU+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNLjc1LDJBNi40NCw2LjQ0LDAsMCwxLDguNDQsMmgwYTYuNDQsNi40NCwwLDAsMCw3LjY5LDBWMTIuNGE2LjQ0LDYuNDQsMCwwLDEtNy42OSwwaDBhNi40NCw2LjQ0LDAsMCwwLTcuNjksMCIvPjxsaW5lIGNsYXNzPSJjbHMtMiIgeDE9IjAuNzUiIHkxPSIxNi43NSIgeDI9IjAuNzUiIHkyPSIwLjc1Ii8+PC9zdmc+";
        SymbolMorph.prototype.flagSymbolRed = new Image();
        SymbolMorph.prototype.flagSymbolRed.src = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJMYXllcl8xIiBkYXRhLW5hbWU9IkxheWVyIDEiIHZpZXdCb3g9IjAgMCAxNi42MyAxNy41Ij4KICA8ZGVmcz4KICAgIDxzdHlsZT4uY2xzLTEsLmNscy0ye2ZpbGw6IzRjYmY1NjtzdHJva2U6IzQ1OTkzZDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7fS5jbHMtMntzdHJva2Utd2lkdGg6MS41cHg7fTwvc3R5bGU+CiAgPC9kZWZzPgogIDx0aXRsZT5pY29uLS1ncmVlbi1mbGFnPC90aXRsZT4KICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0uNzUsMkE2LjQ0LDYuNDQsMCwwLDEsOC40NCwyaDBhNi40NCw2LjQ0LDAsMCwwLDcuNjksMFYxMi40YTYuNDQsNi40NCwwLDAsMS03LjY5LDBoMGE2LjQ0LDYuNDQsMCwwLDAtNy42OSwwIiBzdHlsZT0iZmlsbDogcmdiKDIzNiwgODksIDg5KTsgc3Ryb2tlOiByZ2IoMTg0LCA3MiwgNzIpOyIvPgogIDxsaW5lIGNsYXNzPSJjbHMtMiIgeDE9IjAuNzUiIHkxPSIxNi43NSIgeDI9IjAuNzUiIHkyPSIwLjc1IiBzdHlsZT0ic3Ryb2tlOiByZ2IoMTg0LCA3MiwgNzIpOyBmaWxsOiByZ2IoMjM2LCA4OSwgODkpOyIvPgo8L3N2Zz4=";
        SymbolMorph.prototype.stopSymbol = new Image();
        SymbolMorph.prototype.stopSymbol.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDE0IDE0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxNCAxNDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNFQzU5NTk7c3Ryb2tlOiNCODQ4NDg7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEwO30KPC9zdHlsZT4KPHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSI0LjMsMC41IDkuNywwLjUgMTMuNSw0LjMgMTMuNSw5LjcgOS43LDEzLjUgNC4zLDEzLjUgMC41LDkuNyAwLjUsNC4zICIvPgo8L3N2Zz4=";

        SymbolMorph.prototype.turnRightImage = new Image();
        SymbolMorph.prototype.turnRightImage.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTIyLjY4IDEyLjJhMS42IDEuNiAwIDAgMS0xLjI3LjYzaC03LjY5YTEuNTkgMS41OSAwIDAgMS0xLjE2LTIuNThsMS4xMi0xLjQxYTQuODIgNC44MiAwIDAgMC0zLjE0LS43NyA0LjMxIDQuMzEgMCAwIDAtMiAuOEE0LjI1IDQuMjUgMCAwIDAgNy4yIDEwLjZhNS4wNiA1LjA2IDAgMCAwIC41NCA0LjYyQTUuNTggNS41OCAwIDAgMCAxMiAxNy43NGEyLjI2IDIuMjYgMCAwIDEtLjE2IDQuNTJBMTAuMjUgMTAuMjUgMCAwIDEgMy43NCAxOGExMC4xNCAxMC4xNCAwIDAgMS0xLjQ5LTkuMjIgOS43IDkuNyAwIDAgMSAyLjgzLTQuMTRBOS45MiA5LjkyIDAgMCAxIDkuNjYgMi41YTEwLjY2IDEwLjY2IDAgMCAxIDcuNzIgMS42OGwxLjA4LTEuMzVhMS41NyAxLjU3IDAgMCAxIDEuMjQtLjYgMS42IDEuNiAwIDAgMSAxLjU0IDEuMjFsMS43IDcuMzdhMS41NyAxLjU3IDAgMCAxLS4yNiAxLjM5WiIgc3R5bGU9ImZpbGw6IzAwMDMiLz48cGF0aCBkPSJNMjEuMzggMTEuODNoLTcuNjFhLjU5LjU5IDAgMCAxLS40My0xbDEuNzUtMi4xOWE1LjkgNS45IDAgMCAwLTQuNy0xLjU4IDUuMDcgNS4wNyAwIDAgMC00LjExIDMuMTdBNiA2IDAgMCAwIDcgMTUuNzdhNi41MSA2LjUxIDAgMCAwIDUgMi45MiAxLjMxIDEuMzEgMCAwIDEtLjA4IDIuNjIgOS4zIDkuMyAwIDAgMS03LjM1LTMuODIgOS4xNiA5LjE2IDAgMCAxLTEuNC04LjM3QTguNTEgOC41MSAwIDAgMSA1LjcxIDUuNGE4Ljc2IDguNzYgMCAwIDEgNC4xMS0xLjkyIDkuNzEgOS43MSAwIDAgMSA3Ljc1IDIuMDdsMS42Ny0yLjFhLjU5LjU5IDAgMCAxIDEgLjIxTDIyIDExLjA4YS41OS41OSAwIDAgMS0uNjIuNzVaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+";
        SymbolMorph.prototype.turnRightImageBlack = new Image();
        SymbolMorph.prototype.turnRightImageBlack.src = "data:image/svg+xml;base64,PHN2ZyBpZD0icm90YXRlLWNvdW50ZXItY2xvY2t3aXNlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiMwMDB9PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTIxLjM4IDExLjgzaC03LjYxYS41OS41OSAwIDAgMS0uNDMtMWwxLjc1LTIuMTlhNS45IDUuOSAwIDAgMC00LjctMS41OCA1LjA3IDUuMDcgMCAwIDAtNC4xMSAzLjE3QTYgNiAwIDAgMCA3IDE1Ljc3YTYuNTEgNi41MSAwIDAgMCA1IDIuOTIgMS4zMSAxLjMxIDAgMCAxLS4wOCAyLjYyIDkuMyA5LjMgMCAwIDEtNy4zNS0zLjgyIDkuMTYgOS4xNiAwIDAgMS0xLjQtOC4zN0E4LjUxIDguNTEgMCAwIDEgNS43MSA1LjRhOC43NiA4Ljc2IDAgMCAxIDQuMTEtMS45MiA5LjcxIDkuNzEgMCAwIDEgNy43NSAyLjA3bDEuNjctMi4xYS41OS41OSAwIDAgMSAxIC4yMUwyMiAxMS4wOGEuNTkuNTkgMCAwIDEtLjYyLjc1WiIgc3R5bGU9ImZpbGw6IzAwMCIvPjwvc3ZnPg==";
        SymbolMorph.prototype.turnLeftImage = new Image();
        SymbolMorph.prototype.turnLeftImage.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTIwLjM0IDE4LjIxYTEwLjI0IDEwLjI0IDAgMCAxLTguMSA0LjIyIDIuMjYgMi4yNiAwIDAgMS0uMTYtNC41MiA1LjU4IDUuNTggMCAwIDAgNC4yNS0yLjUzIDUuMDYgNS4wNiAwIDAgMCAuNTQtNC42MkE0LjI1IDQuMjUgMCAwIDAgMTUuNTUgOWE0LjMxIDQuMzEgMCAwIDAtMi0uOCA0LjgyIDQuODIgMCAwIDAtMy4xNS44bDEuMTIgMS40MUExLjU5IDEuNTkgMCAwIDEgMTAuMzYgMTNIMi42N2ExLjU2IDEuNTYgMCAwIDEtMS4yNi0uNjNBMS41NCAxLjU0IDAgMCAxIDEuMTMgMTFsMS43Mi03LjQzQTEuNTkgMS41OSAwIDAgMSA0LjM4IDIuNGExLjU3IDEuNTcgMCAwIDEgMS4yNC42TDYuNyA0LjM1YTEwLjY2IDEwLjY2IDAgMCAxIDcuNzItMS42OEE5Ljg4IDkuODggMCAwIDEgMTkgNC44MSA5LjYxIDkuNjEgMCAwIDEgMjEuODMgOWExMC4wOCAxMC4wOCAwIDAgMS0xLjQ5IDkuMjFaIiBzdHlsZT0iZmlsbDojMDAwMyIvPjxwYXRoIGQ9Ik0xOS41NiAxNy42NWE5LjI5IDkuMjkgMCAwIDEtNy4zNSAzLjgzIDEuMzEgMS4zMSAwIDAgMS0uMDgtMi42MiA2LjUzIDYuNTMgMCAwIDAgNS0yLjkyIDYuMDUgNi4wNSAwIDAgMCAuNjctNS41MSA1LjMyIDUuMzIgMCAwIDAtMS42NC0yLjE2IDUuMjEgNS4yMSAwIDAgMC0yLjQ4LTFBNS44NiA1Ljg2IDAgMCAwIDkgOC44NEwxMC43NCAxMWEuNTkuNTkgMCAwIDEtLjQzIDFIMi43YS42LjYgMCAwIDEtLjYtLjc1bDEuNzEtNy40MmEuNTkuNTkgMCAwIDEgMS0uMjFsMS42NyAyLjFhOS43MSA5LjcxIDAgMCAxIDcuNzUtMi4wNyA4Ljg0IDguODQgMCAwIDEgNC4xMiAxLjkyIDguNjggOC42OCAwIDAgMSAyLjU0IDMuNzIgOS4xNCA5LjE0IDAgMCAxLTEuMzMgOC4zNloiIHN0eWxlPSJmaWxsOiNmZmYiLz48L3N2Zz4=";
        SymbolMorph.prototype.turnLeftImageBlack = new Image();
        SymbolMorph.prototype.turnLeftImageBlack.src = "data:image/svg+xml;base64,PHN2ZyBpZD0icm90YXRlLWNsb2Nrd2lzZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDojM2Q3OWNjfTwvc3R5bGU+PC9kZWZzPjxwYXRoIGQ9Ik0xOS41NiAxNy42NWE5LjI5IDkuMjkgMCAwIDEtNy4zNSAzLjgzIDEuMzEgMS4zMSAwIDAgMS0uMDgtMi42MiA2LjUzIDYuNTMgMCAwIDAgNS0yLjkyIDYuMDUgNi4wNSAwIDAgMCAuNjctNS41MSA1LjMyIDUuMzIgMCAwIDAtMS42NC0yLjE2IDUuMjEgNS4yMSAwIDAgMC0yLjQ4LTFBNS44NiA1Ljg2IDAgMCAwIDkgOC44NEwxMC43NCAxMWEuNTkuNTkgMCAwIDEtLjQzIDFIMi43YS42LjYgMCAwIDEtLjYtLjc1bDEuNzEtNy40MmEuNTkuNTkgMCAwIDEgMS0uMjFsMS42NyAyLjFhOS43MSA5LjcxIDAgMCAxIDcuNzUtMi4wNyA4Ljg0IDguODQgMCAwIDEgNC4xMiAxLjkyIDguNjggOC42OCAwIDAgMSAyLjU0IDMuNzIgOS4xNCA5LjE0IDAgMCAxLTEuMzMgOC4zNloiIHN0eWxlPSJmaWxsOiMwMDAiLz48L3N2Zz4=";
        SymbolMorph.prototype.arrowImage = new Image();
        SymbolMorph.prototype.arrowImage.src = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTggMTgiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDE2IDE2Ij4KICA8c3R5bGU+LnN0MntmaWxsOiNmZmZ9PC9zdHlsZT4KICA8ZyBpZD0iVHV0b3JpYWxzX3gyRl9OYXZpZ2F0aW9uX3gyRl9OZXh0IiB0cmFuc2Zvcm09Im1hdHJpeCgwLCAtMSwgMSwgMCwgLTcsIC03KSIgc3R5bGU9InRyYW5zZm9ybS1vcmlnaW46IDE2cHggMTZweDsiPgogICAgPHBhdGggZD0iTTIyLjYgMTYuM3pNMTYuMiAxOWwtNS42LS44YTIuNSAyLjUgMCAwIDEtMi4xLTIuNHYtLjNjLjItMS4xIDEtMS45IDItMmw1LjYtLjh2LTEuMWMwLS43LjQtMS4zIDEtMS42LjYtLjMgMS4zLS4xIDEuOC40bDQuMyA0LjNjLjMuMy41LjcuNSAxLjIgMCAuNC0uMi45LS41IDEuMkwxOSAyMS40Yy0uNS41LTEuMi42LTEuOC4zLS42LS4zLTEtLjktMS0xLjVWMTl6IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIuMSIvPgogICAgPGRlZnM+CiAgICAgIDxmaWx0ZXIgaWQ9IkFkb2JlX09wYWNpdHlNYXNrRmlsdGVyIiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIHg9IjYiIHk9IjYiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CiAgICAgICAgPGZlQ29sb3JNYXRyaXggdmFsdWVzPSIxIDAgMCAwIDAgMCAxIDAgMCAwIDAgMCAxIDAgMCAwIDAgMCAxIDAiLz4KICAgICAgPC9maWx0ZXI+CiAgICA8L2RlZnM+CiAgICA8bWFzayBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4PSI2IiB5PSI2IiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGlkPSJtYXNrLTJfMV8iPgogICAgICA8ZyBmaWx0ZXI9InVybCgjQWRvYmVfT3BhY2l0eU1hc2tGaWx0ZXIpIj4KICAgICAgICA8cGF0aCBpZD0icGF0aC0xXzFfIiBjbGFzcz0ic3QyIiBkPSJNMjMgMTYuNyAxOC43IDIxYy0uNC4zLS45LjQtMS4zLjJzLS43LS42LS43LTEuMXYtMS42bC02LS44Yy0xLS4xLTEuNy0uOS0xLjctMS45di0uMmMuMS0uOS44LTEuNSAxLjYtMS42bDYtLjl2LTEuNmMwLS41LjMtLjkuNy0xLjEuNC0uMi45LS4xIDEuMy4zTDIzIDE1Yy4yLjIuMy41LjMuOGwtLjMuOXoiLz4KICAgICAgPC9nPgogICAgPC9tYXNrPgogICAgPGcgaWQ9IkNvbG9yX3gyRl9XaGl0ZSIgbWFzaz0idXJsKCNtYXNrLTJfMV8pIj4KICAgICAgPHBhdGggY2xhc3M9InN0MiIgZD0iTTYgNmgyMHYyMEg2eiIgaWQ9IkNvbG9yIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4=";
        SymbolMorph.prototype.arrowImageBlack = new Image();
        SymbolMorph.prototype.arrowImageBlack.src = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTggMTgiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDE2IDE2Ij4KICA8c3R5bGU+LnN0MntmaWxsOiNmZmZ9PC9zdHlsZT4KICA8ZyBpZD0iVHV0b3JpYWxzX3gyRl9OYXZpZ2F0aW9uX3gyRl9OZXh0IiB0cmFuc2Zvcm09Im1hdHJpeCgwLCAtMSwgMSwgMCwgLTcsIC03KSIgc3R5bGU9InRyYW5zZm9ybS1vcmlnaW46IDE2cHggMTZweDsiPgogICAgPHBhdGggZD0iTTIyLjYgMTYuM3pNMTYuMiAxOWwtNS42LS44YTIuNSAyLjUgMCAwIDEtMi4xLTIuNHYtLjNjLjItMS4xIDEtMS45IDItMmw1LjYtLjh2LTEuMWMwLS43LjQtMS4zIDEtMS42LjYtLjMgMS4zLS4xIDEuOC40bDQuMyA0LjNjLjMuMy41LjcuNSAxLjIgMCAuNC0uMi45LS41IDEuMkwxOSAyMS40Yy0uNS41LTEuMi42LTEuOC4zLS42LS4zLTEtLjktMS0xLjVWMTl6IiBzdHJva2Utb3BhY2l0eT0iLjEiIHN0eWxlPSJzdHJva2UtbWl0ZXJsaW1pdDogNC4yMjsgc3Ryb2tlLXdpZHRoOiAwcHg7Ii8+CiAgICA8ZGVmcz4KICAgICAgPGZpbHRlciBpZD0iQWRvYmVfT3BhY2l0eU1hc2tGaWx0ZXIiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeD0iNiIgeT0iNiIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIj4KICAgICAgICA8ZmVDb2xvck1hdHJpeCB2YWx1ZXM9IjEgMCAwIDAgMCAwIDEgMCAwIDAgMCAwIDEgMCAwIDAgMCAwIDEgMCIvPgogICAgICA8L2ZpbHRlcj4KICAgIDwvZGVmcz4KICAgIDxtYXNrIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiIHg9IjYiIHk9IjYiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgaWQ9Im1hc2stMl8xXyI+CiAgICAgIDxnIGZpbHRlcj0idXJsKCNBZG9iZV9PcGFjaXR5TWFza0ZpbHRlcikiPgogICAgICAgIDxwYXRoIGlkPSJwYXRoLTFfMV8iIGNsYXNzPSJzdDIiIGQ9Ik0yMyAxNi43IDE4LjcgMjFjLS40LjMtLjkuNC0xLjMuMnMtLjctLjYtLjctMS4xdi0xLjZsLTYtLjhjLTEtLjEtMS43LS45LTEuNy0xLjl2LS4yYy4xLS45LjgtMS41IDEuNi0xLjZsNi0uOXYtMS42YzAtLjUuMy0uOS43LTEuMS40LS4yLjktLjEgMS4zLjNMMjMgMTVjLjIuMi4zLjUuMy44bC0uMy45eiIvPgogICAgICA8L2c+CiAgICA8L21hc2s+CiAgICA8ZyBpZD0iQ29sb3JfeDJGX1doaXRlIiBtYXNrPSJ1cmwoI21hc2stMl8xXykiPgogICAgICA8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNiA2aDIwdjIwSDZ6IiBpZD0iQ29sb3IiIHN0eWxlPSJzdHJva2UtbWl0ZXJsaW1pdDogNC4yMjsgc3Ryb2tlLXdpZHRoOiAwcHg7IGZpbGw6IHJnYigwLCAwLCAwKTsiLz4KICAgIDwvZz4KICA8L2c+Cjwvc3ZnPg==";
        SymbolMorph.prototype.arrowOutImage = new Image();
        SymbolMorph.prototype.arrowOutImage.src = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTggMTgiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDE2IDE2Ij4KICA8c3R5bGU+LnN0MntmaWxsOiNmZmZ9PC9zdHlsZT4KICA8ZyBpZD0iVHV0b3JpYWxzX3gyRl9OYXZpZ2F0aW9uX3gyRl9OZXh0IiB0cmFuc2Zvcm09Im1hdHJpeCgwLCAtMSwgMSwgMCwgLTcsIC03KSIgc3R5bGU9InRyYW5zZm9ybS1vcmlnaW46IDE2cHggMTZweDsiPgogICAgPHBhdGggZD0iTSAyMi41IDE2LjQzNiBaIE0gMTYuMSAxOS4xMzYgTCAxMC41IDE4LjMzNiBDIDkuMzE1IDE4LjE0NCA4LjQzMyAxNy4xMzYgOC40IDE1LjkzNiBMIDguNCAxNS42MzYgQyA4LjYgMTQuNTM2IDkuNCAxMy43MzYgMTAuNCAxMy42MzYgTCAxNiAxMi44MzYgTCAxNiAxMS43MzYgQyAxNiAxMS4wMzYgMTYuNCAxMC40MzYgMTcgMTAuMTM2IEMgMTcuNiA5LjgzNiAxOC4zIDEwLjAzNiAxOC44IDEwLjUzNiBMIDIzLjEgMTQuODM2IEMgMjMuNCAxNS4xMzYgMjMuNiAxNS41MzYgMjMuNiAxNi4wMzYgQyAyMy42IDE2LjQzNiAyMy40IDE2LjkzNiAyMy4xIDE3LjIzNiBMIDE4LjkgMjEuNTM2IEMgMTguNCAyMi4wMzYgMTcuNyAyMi4xMzYgMTcuMSAyMS44MzYgQyAxNi41IDIxLjUzNiAxNi4xIDIwLjkzNiAxNi4xIDIwLjMzNiBMIDE2LjEgMTkuMTM2IFoiIHN0eWxlPSJmaWxsOiBub25lOyBzdHJva2U6IHJnYigyNTUsIDI1NSwgMjU1KTsiLz4KICA8L2c+Cjwvc3ZnPg==";
        SymbolMorph.prototype.arrowOutImageBlack = new Image();
        SymbolMorph.prototype.arrowOutImageBlack.src = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTggMTgiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDE2IDE2Ij4KICA8c3R5bGU+LnN0MntmaWxsOiNmZmZ9PC9zdHlsZT4KICA8ZyBpZD0iVHV0b3JpYWxzX3gyRl9OYXZpZ2F0aW9uX3gyRl9OZXh0IiB0cmFuc2Zvcm09Im1hdHJpeCgwLCAtMSwgMSwgMCwgLTcsIC03KSIgc3R5bGU9InRyYW5zZm9ybS1vcmlnaW46IDE2cHggMTZweDsiPgogICAgPHBhdGggZD0iTSAyMi41IDE2LjQzNiBaIE0gMTYuMSAxOS4xMzYgTCAxMC41IDE4LjMzNiBDIDkuMzE1IDE4LjE0NCA4LjQzMyAxNy4xMzYgOC40IDE1LjkzNiBMIDguNCAxNS42MzYgQyA4LjYgMTQuNTM2IDkuNCAxMy43MzYgMTAuNCAxMy42MzYgTCAxNiAxMi44MzYgTCAxNiAxMS43MzYgQyAxNiAxMS4wMzYgMTYuNCAxMC40MzYgMTcgMTAuMTM2IEMgMTcuNiA5LjgzNiAxOC4zIDEwLjAzNiAxOC44IDEwLjUzNiBMIDIzLjEgMTQuODM2IEMgMjMuNCAxNS4xMzYgMjMuNiAxNS41MzYgMjMuNiAxNi4wMzYgQyAyMy42IDE2LjQzNiAyMy40IDE2LjkzNiAyMy4xIDE3LjIzNiBMIDE4LjkgMjEuNTM2IEMgMTguNCAyMi4wMzYgMTcuNyAyMi4xMzYgMTcuMSAyMS44MzYgQyAxNi41IDIxLjUzNiAxNi4xIDIwLjkzNiAxNi4xIDIwLjMzNiBMIDE2LjEgMTkuMTM2IFoiIHN0eWxlPSJmaWxsOiBub25lOyBzdHJva2U6IHJnYigwLCAwLCAwKTsiLz4KICA8L2c+Cjwvc3ZnPg==";
        SymbolMorph.prototype.loopSymbol = new Image();
        SymbolMorph.prototype.loopSymbol.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjQgMjQiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxwYXRoIGQ9Ik0yMy4zIDExYy0uMy42LS45IDEtMS41IDFoLTEuNmMtLjEgMS4zLS41IDIuNS0xLjEgMy42LS45IDEuNy0yLjMgMy4yLTQuMSA0LjEtMS43LjktMy42IDEuMi01LjUuOS0xLjgtLjMtMy41LTEuMS00LjktMi4zLS43LS43LS43LTEuOSAwLTIuNi42LS42IDEuNi0uNyAyLjMtLjJIN2MuOS42IDEuOS45IDIuOS45czEuOS0uMyAyLjctLjljMS4xLS44IDEuOC0yLjEgMS44LTMuNWgtMS41Yy0uOSAwLTEuNy0uNy0xLjctMS43IDAtLjQuMi0uOS41LTEuMmw0LjQtNC40Yy43LS42IDEuNy0uNiAyLjQgMEwyMyA5LjJjLjUuNS42IDEuMi4zIDEuOHoiIHN0eWxlPSJmaWxsOiMwMDAzIi8+PHBhdGggZD0iTTIxLjggMTFoLTIuNmMwIDEuNS0uMyAyLjktMSA0LjItLjggMS42LTIuMSAyLjgtMy43IDMuNi0xLjUuOC0zLjMgMS4xLTQuOS44LTEuNi0uMi0zLjItMS00LjQtMi4xLS40LS4zLS40LS45LS4xLTEuMi4zLS40LjktLjQgMS4yLS4xIDEgLjcgMi4yIDEuMSAzLjQgMS4xczIuMy0uMyAzLjMtMWMuOS0uNiAxLjYtMS41IDItMi42LjMtLjkuNC0xLjguMi0yLjhoLTIuNGMtLjQgMC0uNy0uMy0uNy0uNyAwLS4yLjEtLjMuMi0uNGw0LjQtNC40Yy4zLS4zLjctLjMuOSAwTDIyIDkuOGMuMy4zLjQuNi4zLjlzLS4zLjMtLjUuM3oiIHN0eWxlPSJmaWxsOiNmZmYiLz48L3N2Zz4=";
        SymbolMorph.prototype.loopSymbolBlack = new Image();
        SymbolMorph.prototype.loopSymbolBlack.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjQgMjQiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxwYXRoIGQ9Ik0yMS44IDExaC0yLjZjMCAxLjUtLjMgMi45LTEgNC4yLS44IDEuNi0yLjEgMi44LTMuNyAzLjYtMS41LjgtMy4zIDEuMS00LjkuOC0xLjYtLjItMy4yLTEtNC40LTIuMS0uNC0uMy0uNC0uOS0uMS0xLjIuMy0uNC45LS40IDEuMi0uMSAxIC43IDIuMiAxLjEgMy40IDEuMXMyLjMtLjMgMy4zLTFjLjktLjYgMS42LTEuNSAyLTIuNi4zLS45LjQtMS44LjItMi44aC0yLjRjLS40IDAtLjctLjMtLjctLjcgMC0uMi4xLS4zLjItLjRsNC40LTQuNGMuMy0uMy43LS4zLjkgMEwyMiA5LjhjLjMuMy40LjYuMy45cy0uMy4zLS41LjN6IiBzdHlsZT0iZmlsbDojMDAwIi8+PC9zdmc+";
        SymbolMorph.prototype.drawImage = function (ctx, image) {
            if (!isRetinaEnabled()) {
                ctx.drawImage(image, 0, 0, this.width(), this.height());
                return;
            }
            // I have a feeling that this might be turning into spagetti code...
            var prW =
                document.getElementById("world").getAttribute("width") / document.getElementById("world").width,
                prH =
                document.getElementById("world").getAttribute("height") / document.getElementById("world").height,
                w = this.width(),
                h = this.height(),
                ow = image.width,
                oh = image.height
            image.width = (ow * prW);
            image.height = (oh * prH);
            var canvas = newCanvas(new Point(ow, oh));
            canvas.getContext("2d").drawImage(image, 0, 0, ow, oh);
            ctx.drawImage(canvas, 0, 0, w, h);
            image.width = ow;
            image.height = oh;
        };
        SymbolMorph.prototype.renderSymbolFlag = function (ctx, color) {
            // draw a flag
            var w = this.symbolWidth(),
                h = this.size,
                l = Math.max(w / 12, 1);
            this.drawImage(
                ctx,
                this[color.eq(new Color(255, 0, 0)) ? "flagSymbolRed" : "flagSymbol"]
            );
            return;
            ctx.lineWidth = l;
            ctx.strokeStyle = color.toString();
            ctx.beginPath();
            ctx.moveTo(l / 2, 0);
            ctx.lineTo(l / 2, h);
            ctx.stroke();

            ctx.lineWidth = h / 2;
            ctx.beginPath();
            ctx.moveTo(0, h / 4);
            ctx.ellipse(w / 2, h / 2, w / 24, w / 12, 0, 0, Math.PI);
            /*ctx.bezierCurveTo(
        w * 0.8,
        h / 4,
        w * 0.1,
        h * 0.5,
        w,
        h * 0.5
    );*/
            ctx.stroke();
        };

        SymbolMorph.prototype.renderSymbolOctagon = function (ctx, color) {
            // draw an octagon
            var side = this.symbolWidth(),
                vert = (side - side * 0.383) / 2;
            this.drawImage(ctx, this.stopSymbol);

            return;
            ctx.fillStyle = color.toString();
            ctx.beginPath();
            ctx.moveTo(vert, 0);
            ctx.lineTo(side - vert, 0);
            ctx.lineTo(side, vert);
            ctx.lineTo(side, side - vert);
            ctx.lineTo(side - vert, side);
            ctx.lineTo(vert, side);
            ctx.lineTo(0, side - vert);
            ctx.lineTo(0, vert);
            ctx.closePath();
            ctx.fill();
        };
        SymbolMorph.prototype.renderSymbolTurnRight = function (ctx, color) {
            // draw a right-turning arrow
            var w = this.symbolWidth(),
                l = Math.max(w / 10, 1),
                r = w / 2;
            this.drawImage(
                ctx,
                this[color.eq(BLACK) ? "turnRightImageBlack" : "turnRightImage"]
            );
            return;
            ctx.lineWidth = l;
            ctx.strokeStyle = color.toString();
            ctx.beginPath();
            ctx.arc(r, r * 2, r - l / 2, radians(0), radians(-90), false);
            ctx.stroke();

            ctx.fillStyle = color.toString();
            ctx.beginPath();
            ctx.moveTo(w, r);
            ctx.lineTo(r, 0);
            ctx.lineTo(r, r * 2);
            ctx.closePath();
            ctx.fill();
        };

        SymbolMorph.prototype.renderSymbolTurnLeft = function (ctx, color) {
            // draw a left-turning arrow
            var w = this.symbolWidth(),
                l = Math.max(w / 10, 1),
                r = w / 2;
            this.drawImage(
                ctx,
                this[color.eq(BLACK) ? "turnLeftImageBlack" : "turnLeftImage"]
            );
            return;
            ctx.lineWidth = l;
            ctx.strokeStyle = color.toString();
            ctx.beginPath();
            ctx.arc(r, r * 2, r - l / 2, radians(180), radians(-90), true);
            ctx.stroke();

            ctx.fillStyle = color.toString();
            ctx.beginPath();
            ctx.moveTo(0, r);
            ctx.lineTo(r, 0);
            ctx.lineTo(r, r * 2);
            ctx.closePath();
            ctx.fill();
        };
        SymbolMorph.prototype.renderSymbolLoop = function (ctx, aColor) {
            var w = this.symbolWidth(),
                h = this.size,
                w2 = w / 2,
                w4 = w2 / 2,
                h2 = h / 2,
                l = Math.max(h / 10, 0.5);
            this.drawImage(
                ctx,
                this[aColor.eq(BLACK) ? "loopSymbolBlack" : "loopSymbol"]
            );
            return;
            ctx.lineWidth = l * 2;
            ctx.strokeStyle = aColor.toString();
            ctx.beginPath();
            ctx.moveTo(0, h - l);
            ctx.lineTo(w2, h - l);
            ctx.arc(w2, h2, h2 - l, radians(90), radians(0), true);
            ctx.stroke();
            ctx.fillStyle = aColor.toString();
            ctx.beginPath();
            ctx.moveTo(w4 * 3 - l, 0);
            ctx.lineTo(w2 - l, h2);
            ctx.lineTo(w, h2);
            ctx.closePath();
            ctx.fill();
        };
        SymbolMorph.prototype.renderSymbolArrowUp = function (ctx, color) {
            // draw an up arrow
            var w = this.symbolWidth(),
                h = this.size,
                n = w / 2,
                l = Math.max(w / 20, 0.5);
            this.drawImage(ctx, this[color.eq(BLACK) ? "arrowImageBlack" : "arrowImage"]);
            return;
            ctx.fillStyle = color.toString();
            ctx.lineWidth = l * 2;
            ctx.beginPath();
            ctx.moveTo(l, n);
            ctx.lineTo(n, l);
            ctx.lineTo(w - l, n);
            ctx.lineTo(w * 0.65, n);
            ctx.lineTo(w * 0.65, h - l);
            ctx.lineTo(w * 0.35, h - l);
            ctx.lineTo(w * 0.35, n);
            ctx.closePath();
            ctx.fill();
        };

        SymbolMorph.prototype.renderSymbolArrowUpOutline = function (ctx, color) {
            // draw an up arrow
            var w = this.symbolWidth(),
                h = this.size,
                n = w / 2,
                l = Math.max(w / 20, 0.5);
            this.drawImage(
                ctx,
                this[color.eq(BLACK) ? "arrowOutImageBlack" : "arrowOutImage"]
            );
            return;
            ctx.strokeStyle = color.toString();
            ctx.lineWidth = l * 2;
            ctx.beginPath();
            ctx.moveTo(l, n);
            ctx.lineTo(n, l);
            ctx.lineTo(w - l, n);
            ctx.lineTo(w * 0.65, n);
            ctx.lineTo(w * 0.65, h - l);
            ctx.lineTo(w * 0.35, h - l);
            ctx.lineTo(w * 0.35, n);
            ctx.closePath();
            ctx.stroke();
        };
        ArrowMorph.prototype.whiteArrow = new Image();
        ArrowMorph.prototype.whiteArrow.src = "data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMi43MSIgaGVpZ2h0PSI4Ljc5IiB2aWV3Qm94PSIwIDAgMTIuNzEgOC43OSI+PHRpdGxlPmRyb3Bkb3duLWFycm93PC90aXRsZT48ZyBvcGFjaXR5PSIwLjEiPjxwYXRoIGQ9Ik0xMi43MSwyLjQ0QTIuNDEsMi40MSwwLDAsMSwxMiw0LjE2TDguMDgsOC4wOGEyLjQ1LDIuNDUsMCwwLDEtMy40NSwwTDAuNzIsNC4xNkEyLjQyLDIuNDIsMCwwLDEsMCwyLjQ0LDIuNDgsMi40OCwwLDAsMSwuNzEuNzFDMSwwLjQ3LDEuNDMsMCw2LjM2LDBTMTEuNzUsMC40NiwxMiwuNzFBMi40NCwyLjQ0LDAsMCwxLDEyLjcxLDIuNDRaIiBmaWxsPSIjMjMxZjIwIi8+PC9nPjxwYXRoIGQ9Ik02LjM2LDcuNzlhMS40MywxLjQzLDAsMCwxLTEtLjQyTDEuNDIsMy40NWExLjQ0LDEuNDQsMCwwLDEsMC0yYzAuNTYtLjU2LDkuMzEtMC41Niw5Ljg3LDBhMS40NCwxLjQ0LDAsMCwxLDAsMkw3LjM3LDcuMzdBMS40MywxLjQzLDAsMCwxLDYuMzYsNy43OVoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=";
        ArrowMorph.prototype.blackArrow = new Image();
        ArrowMorph.prototype.blackArrow.src = "data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMi43MSIgaGVpZ2h0PSI4Ljc5IiB2aWV3Qm94PSIwIDAgMTIuNzEgOC43OSI+PHRpdGxlPmRyb3Bkb3duLWFycm93PC90aXRsZT48ZyBvcGFjaXR5PSIwLjEiPjxwYXRoIGQ9Ik0xMi43MSwyLjQ0QTIuNDEsMi40MSwwLDAsMSwxMiw0LjE2TDguMDgsOC4wOGEyLjQ1LDIuNDUsMCwwLDEtMy40NSwwTDAuNzIsNC4xNkEyLjQyLDIuNDIsMCwwLDEsMCwyLjQ0LDIuNDgsMi40OCwwLDAsMSwuNzEuNzFDMSwwLjQ3LDEuNDMsMCw2LjM2LDBTMTEuNzUsMC40NiwxMiwuNzFBMi40NCwyLjQ0LDAsMCwxLDEyLjcxLDIuNDRaIiBmaWxsPSIjMjMxZjIwIi8+PC9nPjxwYXRoIGQ9Ik02LjM2LDcuNzlhMS40MywxLjQzLDAsMCwxLTEtLjQyTDEuNDIsMy40NWExLjQ0LDEuNDQsMCwwLDEsMC0yYzAuNTYtLjU2LDkuMzEtMC41Niw5Ljg3LDBhMS40NCwxLjQ0LDAsMCwxLDAsMkw3LjM3LDcuMzdBMS40MywxLjQzLDAsMCwxLDYuMzYsNy43OVoiIGZpbGw9IiMwMDAiLz48L3N2Zz4=";
       /* ArrowMorph.prototype.drawImage = function (ctx, image, horiz) {
            // I have a feeling that this might be turning into spagetti code...
            var pr = !isRetinaEnabled() ? 1 : window.devicePixelRatio || 1,
                pad = horiz ? 0 : this.padding + (this.parent instanceof InputFieldMorph ? 0 : 2) * this.scale,
                w = this.width(),
                h = this.height(),
                ow = image.width,
                oh = image.height,
                i1 = [pad - ow / 10 * this.scale, h - h / 1.7],
                i2 = [w - pad - (0.5 * this.scale), h / 2];
            image.width = (ow / pr) * pr;
            image.height = (oh / pr) * pr;
            ctx.drawImage(
                image,
                ...(!horiz ? i1 : [i1[1], i1[0]]),
                ...(!horiz ? i2 : [i2[1], i2[0]])
            );
            image.width = ow;
            image.height = oh;
            return;
        };
        ArrowMorph.prototype.render = function (ctx) {
            // initialize my surface property
            var pad = this.padding,
                h = this.height(),
                h2 = h / 2,
                w = this.width(),
                w2 = w / 2;
            if (true) {
                ctx.save();
                var horiz = Math.abs(this.direction) == 90,
                    nw = horiz ? h : w,
                    nh = horiz ? w : h;
                ctx.translate(nw / 2, nh / 2);
                ctx.rotate(
                    radians(
                        ((d) => {
                            switch (d) {
                                case "down":
                                    return 0;
                                case "up":
                                    return 180;
                                case "left":
                                    return 90;
                                case "right":
                                    return -90;
                            }
                        })(this.direction)
                    )
                );
                ctx.translate(nw / -2, nh / -2);
                this.drawImage(
                    ctx,
                    this.color.b < 118
                    ? ArrowMorph.prototype.blackArrow
                    : ArrowMorph.prototype.whiteArrow,
                    horiz
                );

                ctx.restore();
                return;
            }
            ctx.fillStyle = this.getRenderColor().toString();
            ctx.beginPath();
            if (this.direction === "down") {
                ctx.moveTo(pad, h2);
                ctx.lineTo(w - pad, h2);
                ctx.lineTo(w2, h - pad);
            } else if (this.direction === "up") {
                ctx.moveTo(pad, h2);
                ctx.lineTo(w - pad, h2);
                ctx.lineTo(w2, pad);
            } else if (this.direction === "left") {
                ctx.moveTo(pad, h2);
                ctx.lineTo(w2, pad);
                ctx.lineTo(w2, h - pad);
            } else {
                // 'right'
                ctx.moveTo(w2, pad);
                ctx.lineTo(w - pad, h2);
                ctx.lineTo(w2, h - pad);
            }
            ctx.closePath();
            ctx.fill();
        };*/

    }
    blockStyles()
    setSymbolImages()
    SpriteMorph.prototype.blockColor = {
        motion : new Color(76, 151, 255),
        looks : new Color(151, 100, 251),
        sound : new Color(207, 99, 207),
        pen : new Color(15, 189, 140),
        events : new Color(255, 191, 0),
        control : new Color(255, 171, 25),
        sensing : new Color(92, 177, 214),
        operators : new Color(89, 192, 89),
        variables : new Color(255, 140, 26),
        lists : new Color(255, 102, 26),
        other: new Color(191, 191, 191)
    };
    SyntaxElementMorph.prototype.setScale(SyntaxElementMorph.prototype.scale);
    world.children[0].refreshIDE()
})();