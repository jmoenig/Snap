/*

    widgets.js

    additional GUI elements for morphic.js

    written by Jens Mönig
    jens@moenig.org

    Copyright (C) 2020 by Jens Mönig

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
    needs blocks.js and objects.js


    credits
    -------
    Lucas Karahadian contributed a first prototype of the piano keyboard


    I. hierarchy
    -------------
    the following tree lists all constructors hierarchically,
    indentation indicating inheritance. Refer to this list to get a
    contextual overview:

    Morph*
        AlignmentMorph
        DialogBoxMorph
        InputFieldMorph
    TriggerMorph*
        MenuItemMorph*
            PianoKeyMorph
        PushButtonMorph
            ToggleButtonMorph
                TabMorph
            ToggleMorph
        ToggleElementMorph
    MenuMorph*
        PianoMenuMorph

    * from Morphic.js


    II. toc
    -------
    the following list shows the order in which all constructors are
    defined. Use this list to locate code in this document:

    PushButtonMorph
    ToggleButtonMorph
    TabMorph
    ToggleMorph
    ToggleElementMorph
    DialogBoxMorph
    AlignmentMorph
    InputFieldMorph
    PianoMenuMorph
    PianoKeyMorph

*/

// Global settings /////////////////////////////////////////////////////

/*global TriggerMorph, modules, Color, Point, BoxMorph, radians, ZERO,
StringMorph, Morph, TextMorph, nop, detect, StringFieldMorph, BLACK, WHITE,
HTMLCanvasElement, fontHeight, SymbolMorph, localize, SpeechBubbleMorph,
ArrowMorph, MenuMorph, isString, isNil, SliderMorph, MorphicPreferences,
ScrollFrameMorph, MenuItemMorph, Note, useBlurredShadows*/

modules.widgets = '2020-October-06';

var PushButtonMorph;
var ToggleButtonMorph;
var TabMorph;
var ToggleMorph;
var ToggleElementMorph;
var DialogBoxMorph;
var AlignmentMorph;
var InputFieldMorph;
var PianoMenuMorph;
var PianoKeyMorph;

// PushButtonMorph /////////////////////////////////////////////////////

// I am a Button with rounded corners and 3D-ish graphical effects

// PushButtonMorph inherits from TriggerMorph:

PushButtonMorph.prototype = new TriggerMorph();
PushButtonMorph.prototype.constructor = PushButtonMorph;
PushButtonMorph.uber = TriggerMorph.prototype;

// PushButtonMorph preferences settings:

PushButtonMorph.prototype.fontSize = 10;
PushButtonMorph.prototype.fontStyle = 'sans-serif';
PushButtonMorph.prototype.labelColor = BLACK;
PushButtonMorph.prototype.labelShadowColor = WHITE;
PushButtonMorph.prototype.labelShadowOffset = new Point(1, 1);

PushButtonMorph.prototype.color = new Color(220, 220, 220);
PushButtonMorph.prototype.pressColor = new Color(115, 180, 240);
PushButtonMorph.prototype.highlightColor
    = PushButtonMorph.prototype.pressColor.lighter(50);
PushButtonMorph.prototype.outlineColor = new Color(30, 30, 30);
PushButtonMorph.prototype.outlineGradient = false;
PushButtonMorph.prototype.contrast = 60;

PushButtonMorph.prototype.edge = 2;
PushButtonMorph.prototype.corner = 5;
PushButtonMorph.prototype.outline = 1;
PushButtonMorph.prototype.padding = 3;

// PushButtonMorph instance creation:

function PushButtonMorph(
    target,
    action,
    labelString,
    environment,
    hint
) {
    this.init(
        target,
        action,
        labelString,
        environment,
        hint
    );
}

PushButtonMorph.prototype.init = function (
    target,
    action,
    labelString,
    environment,
    hint
) {
    // additional properties:
    this.is3D = false; // for "flat" design exceptions
    this.target = target || null;
    this.action = action || null;
    this.environment = environment || null;
    this.labelString = labelString || null;
    this.label = null;
    this.labelMinExtent = ZERO;
    this.hint = hint || null;
    this.isDisabled = false;

    // initialize inherited properties:
    TriggerMorph.uber.init.call(this);

    // override inherited properites:
    this.color = PushButtonMorph.prototype.color;
    this.createLabel();
    this.fixLayout();
    this.rerender();
};

// PushButtonMorph layout:

PushButtonMorph.prototype.fixLayout = function () {
    // make sure I at least encompass my label
    if (this.label !== null) {
        this.updateLabelColors();
        var padding = this.padding * 2 + this.outline * 2 + this.edge * 2;
        this.bounds.setWidth(
            Math.max(this.label.width(), this.labelMinExtent.x) + padding
        );
        this.bounds.setHeight(
            Math.max(
                this.label instanceof StringMorph ?
                    this.label.rawHeight() : this.label.height(),
                this.labelMinExtent.y
            ) + padding
        );
        this.label.setCenter(this.center());
    }
};

// PushButtonMorph events

PushButtonMorph.prototype.mouseDownLeft = function () {
    PushButtonMorph.uber.mouseDownLeft.call(this);
    if (this.label) {
        this.label.setCenter(this.center().add(1));
    }
};

PushButtonMorph.prototype.mouseClickLeft = function () {
    if (this.isDisabled) {return; }
    PushButtonMorph.uber.mouseClickLeft.call(this);
    if (this.label) {
        this.label.setCenter(this.center());
    }
};

PushButtonMorph.prototype.mouseLeave = function () {
    PushButtonMorph.uber.mouseLeave.call(this);
    if (this.label) {
        this.label.setCenter(this.center());
    }
};

// PushButtonMorph drawing:

PushButtonMorph.prototype.render = function (ctx) {
    if (this.userState === 'highlight') {
        this.drawOutline(ctx);
        this.drawBackground(ctx, this.highlightColor);
        this.drawEdges(
            ctx,
            this.highlightColor,
            this.highlightColor.lighter(this.contrast),
            this.highlightColor.darker(this.contrast)
        );
    } else if (this.userState === 'pressed') {
        this.drawOutline(ctx);
        this.drawBackground(ctx, this.pressColor);
        this.drawEdges(
            ctx,
            this.pressColor,
            this.pressColor.darker(this.contrast),
            this.pressColor.lighter(this.contrast)
        );
    } else {
        this.drawOutline(ctx);
        this.drawBackground(ctx, this.color);
        this.drawEdges(
            ctx,
            this.color,
            this.color.lighter(this.contrast),
            this.color.darker(this.contrast)
        );
    }
};

PushButtonMorph.prototype.drawOutline = function (ctx) {
    var outlineStyle,
        isFlat = MorphicPreferences.isFlat && !this.is3D;

    if (!this.outline || isFlat) {return null; }
    if (this.outlineGradient) {
        outlineStyle = ctx.createLinearGradient(
            0,
            0,
            0,
            this.height()
        );
        outlineStyle.addColorStop(0, this.outlineColor.darker().toString());
        outlineStyle.addColorStop(1, 'white');
    } else {
        outlineStyle = this.outlineColor.toString();
    }
    ctx.fillStyle = outlineStyle;
    ctx.beginPath();
    this.outlinePath(
        ctx,
        isFlat ? 0 : this.corner,
        0
    );
    ctx.closePath();
    ctx.fill();
};

PushButtonMorph.prototype.drawBackground = function (ctx, color) {
    var isFlat = MorphicPreferences.isFlat && !this.is3D;

    ctx.fillStyle = color.toString();
    ctx.beginPath();
    this.outlinePath(
        ctx,
        isFlat ? 0 : Math.max(this.corner - this.outline, 0),
        this.outline
    );
    ctx.closePath();
    ctx.fill();
    ctx.lineWidth = this.outline;
};

PushButtonMorph.prototype.drawEdges = function (
    ctx,
    color,
    topColor,
    bottomColor
) {
    if (MorphicPreferences.isFlat && !this.is3D) {return; }
    var minInset = Math.max(this.corner, this.outline + this.edge),
        w = this.width(),
        h = this.height(),
        gradient;

    // top:
    gradient = ctx.createLinearGradient(
        0,
        this.outline,
        0,
        this.outline + this.edge
    );
    gradient.addColorStop(0, topColor.toString());
    gradient.addColorStop(1, color.toString());

    ctx.strokeStyle = gradient;
    ctx.lineCap = 'round';
    ctx.lineWidth = this.edge;
    ctx.beginPath();
    ctx.moveTo(minInset, this.outline + this.edge / 2);
    ctx.lineTo(w - minInset, this.outline + this.edge / 2);
    ctx.stroke();

    // top-left corner:
    gradient = ctx.createRadialGradient(
        this.corner,
        this.corner,
        Math.max(this.corner - this.outline - this.edge, 0),
        this.corner,
        this.corner,
        Math.max(this.corner - this.outline, 0)
    );
    gradient.addColorStop(0, color.toString());
    gradient.addColorStop(1, topColor.toString());

    ctx.strokeStyle = gradient;
    ctx.lineCap = 'round';
    ctx.lineWidth = this.edge;
    ctx.beginPath();
    ctx.arc(
        this.corner,
        this.corner,
        Math.max(this.corner - this.outline - this.edge / 2, 0),
        radians(180),
        radians(270),
        false
    );
    ctx.stroke();

    // left:
    gradient = ctx.createLinearGradient(
        this.outline,
        0,
        this.outline + this.edge,
        0
    );
    gradient.addColorStop(0, topColor.toString());
    gradient.addColorStop(1, color.toString());

    ctx.strokeStyle = gradient;
    ctx.lineCap = 'round';
    ctx.lineWidth = this.edge;
    ctx.beginPath();
    ctx.moveTo(this.outline + this.edge / 2, minInset);
    ctx.lineTo(this.outline + this.edge / 2, h - minInset);
    ctx.stroke();

    // bottom:
    gradient = ctx.createLinearGradient(
        0,
        h - this.outline,
        0,
        h - this.outline - this.edge
    );
    gradient.addColorStop(0, bottomColor.toString());
    gradient.addColorStop(1, color.toString());

    ctx.strokeStyle = gradient;
    ctx.lineCap = 'round';
    ctx.lineWidth = this.edge;
    ctx.beginPath();
    ctx.moveTo(minInset, h - this.outline - this.edge / 2);
    ctx.lineTo(w - minInset, h - this.outline - this.edge / 2);
    ctx.stroke();

    // bottom-right corner:
    gradient = ctx.createRadialGradient(
        w - this.corner,
        h - this.corner,
        Math.max(this.corner - this.outline - this.edge, 0),
        w - this.corner,
        h - this.corner,
        Math.max(this.corner - this.outline, 0)
    );
    gradient.addColorStop(0, color.toString());
    gradient.addColorStop(1, bottomColor.toString());

    ctx.strokeStyle = gradient;
    ctx.lineCap = 'round';
    ctx.lineWidth = this.edge;
    ctx.beginPath();
    ctx.arc(
        w - this.corner,
        h - this.corner,
        Math.max(this.corner - this.outline - this.edge / 2, 0),
        radians(0),
        radians(90),
        false
    );
    ctx.stroke();

    // right:
    gradient = ctx.createLinearGradient(
        w - this.outline,
        0,
        w - this.outline - this.edge,
        0
    );
    gradient.addColorStop(0, bottomColor.toString());
    gradient.addColorStop(1, color.toString());

    ctx.strokeStyle = gradient;
    ctx.lineCap = 'round';
    ctx.lineWidth = this.edge;
    ctx.beginPath();
    ctx.moveTo(w - this.outline - this.edge / 2, minInset);
    ctx.lineTo(w - this.outline - this.edge / 2, h - minInset);
    ctx.stroke();
};

PushButtonMorph.prototype.outlinePath = BoxMorph.prototype.outlinePath;

PushButtonMorph.prototype.createLabel = function () {
    var shading = !MorphicPreferences.isFlat || this.is3D;

    if (this.label !== null) {
        this.label.destroy();
    }
    if (this.labelString instanceof SymbolMorph) {
        this.label = this.labelString.fullCopy();
        if (shading) {
            this.label.shadowOffset = this.labelShadowOffset;
            this.label.shadowColor = this.labelShadowColor;
        }
        this.label.color = this.labelColor;
    } else {
        this.label = new StringMorph(
            localize(this.labelString),
            this.fontSize,
            this.fontStyle,
            true,
            false,
            false,
            shading ? this.labelShadowOffset : null,
            this.labelShadowColor,
            this.labelColor
        );
    }
    this.add(this.label);
};

PushButtonMorph.prototype.updateLabelColors = function () {
    var shading = !MorphicPreferences.isFlat || this.is3D;
    if (this.label) {
        this.label.color = this.labelColor;
        this.label.fontSize = this.fontSize;
        if (shading) {
            this.label.shadowOffset = this.labelShadowOffset;
            this.label.shadowColor = this.labelShadowColor;
        }
        this.label.fixLayout(true); // just me
    }
};

// PushButtonMorph states

PushButtonMorph.prototype.disable = function () {
    this.isDisabled = true;
    this.forAllChildren(child =>
        child.alpha = 0.3
    );
    this.rerender();
};

PushButtonMorph.prototype.enable = function () {
    this.isDisabled = false;
    this.forAllChildren(child =>
        child.alpha = 1
    );
    this.rerender();
};

// ToggleButtonMorph ///////////////////////////////////////////////////////

/*
    I am a two-state PushButton. When my state is "true" I keep my "pressed"
    background color. I can also be set to not auto-layout my bounds, in
    which case my label will left-align.
*/

// ToggleButtonMorph inherits from PushButtonMorph:

ToggleButtonMorph.prototype = new PushButtonMorph();
ToggleButtonMorph.prototype.constructor = ToggleButtonMorph;
ToggleButtonMorph.uber = PushButtonMorph.prototype;

// ToggleButton settings

ToggleButtonMorph.prototype.contrast = 30;
ToggleButtonMorph.prototype.labelPressColor = null;

// ToggleButtonMorph instance creation:

function ToggleButtonMorph(
    colors, // color overrides, <array>: [normal, highlight, pressed]
    target,
    action, // a toggle function
    labelString,
    query, // predicate/selector
    environment,
    hint,
    minWidth, // <num> optional, if specified label will left-align
    hasPreview, // <bool> show press color on left edge (e.g. category)
    isPicture // treat label as picture, i.e. don't apply typography
) {
    this.init(
        colors,
        target,
        action,
        labelString,
        query,
        environment,
        hint,
        minWidth,
        hasPreview,
        isPicture
    );
}

ToggleButtonMorph.prototype.init = function (
    colors,
    target,
    action,
    labelString,
    query,
    environment,
    hint,
    minWidth,
    hasPreview,
    isPicture
) {
    // additional properties:
    this.state = false;
    this.query = query || (() => true);
    this.minWidth = minWidth || null;
    this.hasPreview = hasPreview || false;
    this.isPicture = isPicture || false;
    this.hasNeutralBackground = false;
    this.trueStateLabel = null;

    // initialize inherited properties:
    ToggleButtonMorph.uber.init.call(
        this,
        target,
        action,
        labelString,
        environment,
        hint
    );

    // override default colors if others are specified
    if (colors) {
        this.color = colors[0];
        this.highlightColor = colors[1];
        this.pressColor = colors[2];
    }

    this.refresh();
    this.rerender();
};

// ToggleButtonMorph events

ToggleButtonMorph.prototype.mouseEnter = function () {
    var contents = this.hint instanceof Function ? this.hint() : this.hint;
    if (!this.state || this.hasNeutralBackground) {
        this.userState = 'highlight';
        this.rerender();
    }
    if (contents) {
        this.bubbleHelp(contents);
    }
};

ToggleButtonMorph.prototype.mouseLeave = function () {
    if (!this.state || this.hasNeutralBackground) {
        this.userState = 'normal';
        this.rerender();
    }
    if (this.schedule) {
        this.schedule.isActive = false;
    }
    if (this.hint) {
        this.world().hand.destroyTemporaries();
    }
};

ToggleButtonMorph.prototype.mouseDownLeft = function () {
    if (!this.state) {
        this.userState = 'pressed';
        this.rerender();
    }
};

ToggleButtonMorph.prototype.mouseClickLeft = function () {
    if (!this.state) {
        this.userState = 'highlight';
        this.rerender();
    }
    this.trigger(); // allow me to be triggered again to force-update others
};

// ToggleButtonMorph action

ToggleButtonMorph.prototype.trigger = function () {
    ToggleButtonMorph.uber.trigger.call(this);
    this.refresh();
};

ToggleButtonMorph.prototype.refresh = function () {
/*
    if query is a function:
    execute the query with target as environment (can be null)
    for lambdafied (inline) actions

    else if query is a String:
    treat it as function property of target and execute it
    for selector-like queries
*/
    if (typeof this.query === 'function') {
        this.state = this.query.call(this.target);
    } else { // assume it's a String
        this.state = this.target[this.query]();
    }
    if (this.state) {
        this.userState = 'pressed';
        if (this.labelPressColor) {
            this.label.setColor(this.labelPressColor);
        }
        if (this.trueStateLabel) {
            this.label.hide();
            this.trueStateLabel.show();
        }
    } else {
        this.userState = 'normal';
        if (this.labelPressColor) {
            this.label.setColor(this.labelColor);
        }
        if (this.trueStateLabel) {
            this.label.show();
            this.trueStateLabel.hide();
        }
    }
    this.rerender();
};

// ToggleButtonMorph layout:

ToggleButtonMorph.prototype.fixLayout = function () {
    if (this.label !== null) {
        var padding = this.padding * 2 + this.outline * 2 + this.edge * 2,
            lw;

        this.updateLabelColors();
        lw = Math.max(this.label.width(), this.labelMinExtent.x);
        this.bounds.setWidth(this.minWidth ?
                Math.max(this.minWidth, lw) + padding
                    : lw + padding
        );
        this.bounds.setHeight(
            Math.max(this.label instanceof StringMorph ?
                    this.label.rawHeight() :
                        this.label.height(), this.labelMinExtent.y) + padding
        );
        this.label.setCenter(this.center());
        if (this.trueStateLabel) {
            this.trueStateLabel.setCenter(this.center());
        }
        if (this.minWidth) { // left-align along my corner
            this.label.setLeft(
                this.left()
                    + this.outline
                    + this.edge
                    + this.corner
                    + this.padding
            );
        }
    }
};

// ToggleButtonMorph drawing

ToggleButtonMorph.prototype.render = function (ctx) {
/*
    basically the same as inherited from PushButtonMorph, except for
    not inverting the pressed 3D-ish border (because it stays that way),
    and optionally coloring the left edge in the press-color, previewing
    the selection color (e.g. in the case of Snap palette-category
    selector. the latter is done in the drawEdges() method.
*/
    switch (this.userState) {
    case 'highlight':
        this.drawOutline(ctx);
        this.drawBackground(ctx, this.highlightColor);
        this.drawEdges(
            ctx,
            this.highlightColor,
            this.highlightColor.lighter(this.contrast),
            this.highlightColor.darker(this.contrast)
        );
        break;
    case 'pressed':
        // note: don't invert the 3D-ish edges for 'pressed' state, because
        // it will stay that way, and should not look inverted (or should it?)
        this.drawOutline(ctx);
        this.drawBackground(ctx, this.getPressRenderColor());
        this.drawEdges(
            ctx,
            this.pressColor,
            this.pressColor.lighter(40),
            this.pressColor.darker(40)
        );
        break;
    default:
        this.drawOutline(ctx);
        this.drawBackground(ctx, this.color);
        this.drawEdges(
            ctx,
            this.color,
            this.color.lighter(this.contrast),
            this.color.darker(this.contrast)
        );
    }
};

ToggleButtonMorph.prototype.getPressRenderColor = function () {
    // can be overridden by my children
    return this.pressColor;
};

ToggleButtonMorph.prototype.drawEdges = function (
    ctx,
    color,
    topColor,
    bottomColor
) {
    var gradient;

    ToggleButtonMorph.uber.drawEdges.call(
        this,
        ctx,
        color,
        topColor,
        bottomColor
    );

    if (this.hasPreview) { // indicate the possible selection color
        if (MorphicPreferences.isFlat && !this.is3D) {
            ctx.fillStyle = this.pressColor.toString();
            ctx.fillRect(
                this.outline,
                this.outline,
                this.corner,
                this.height() - this.outline * 2
            );
            return;
        }
        gradient = ctx.createLinearGradient(
            0,
            0,
            this.corner,
            0
        );
        gradient.addColorStop(0, this.pressColor.lighter(40).toString());
        gradient.addColorStop(1, this.pressColor.darker(40).toString());
        ctx.fillStyle = gradient; // this.pressColor.toString();
        ctx.beginPath();
        this.previewPath(
            ctx,
            Math.max(this.corner - this.outline, 0),
            this.outline
        );
        ctx.closePath();
        ctx.fill();
    }
};

ToggleButtonMorph.prototype.previewPath = function (ctx, radius, inset) {
    var offset = radius + inset,
        h = this.height();

    // top left:
    ctx.arc(
        offset,
        offset,
        radius,
        radians(-180),
        radians(-90),
        false
    );
    // bottom left:
    ctx.arc(
        offset,
        h - offset,
        radius,
        radians(90),
        radians(180),
        false
    );
};

ToggleButtonMorph.prototype.createLabel = function () {
    var shading = !MorphicPreferences.isFlat || this.is3D;

    if (this.label !== null) {
        this.label.destroy();
    }
    if (this.trueStateLabel !== null) {
        this.trueStateLabel.destroy();
    }
    if (this.labelString instanceof Array && this.labelString.length === 2) {
        if (this.labelString[0] instanceof SymbolMorph) {
            this.label = this.labelString[0].fullCopy();
            this.trueStateLabel = this.labelString[1].fullCopy();
            if (!this.isPicture) {
                this.label.shadowOffset = shading ?
                        this.labelShadowOffset : ZERO;
                this.label.shadowColor = this.labelShadowColor;
                this.label.color = this.labelColor;
                this.label.fixLayout();
                this.label.rerender();

                this.trueStateLabel.shadowOffset = shading ?
                        this.labelShadowOffset : ZERO;
                this.trueStateLabel.shadowColor = this.labelShadowColor;
                this.trueStateLabel.color = this.labelColor;
                this.trueStateLabel.fixLayout();
                this.trueStateLabel.rerender();
            }
        } else if (this.labelString[0] instanceof Morph) {
            this.label = this.labelString[0].fullCopy();
            this.trueStateLabel = this.labelString[1].fullCopy();
        } else {
            this.label = new StringMorph(
                localize(this.labelString[0]),
                this.fontSize,
                this.fontStyle,
                true,
                false,
                false,
                shading ? this.labelShadowOffset : null,
                this.labelShadowColor,
                this.labelColor
            );
            this.trueStateLabel = new StringMorph(
                localize(this.labelString[1]),
                this.fontSize,
                this.fontStyle,
                true,
                false,
                false,
                shading ? this.labelShadowOffset : null,
                this.labelShadowColor,
                this.labelColor
            );
        }
    } else {
        if (this.labelString instanceof SymbolMorph) {
            this.label = this.labelString.fullCopy();
            if (!this.isPicture) {
                this.label.shadowOffset = shading ?
                        this.labelShadowOffset : ZERO;
                this.label.shadowColor = this.labelShadowColor;
                this.label.color = this.labelColor;
                this.label.fixLayout();
                this.label.rerender();
            }
        } else if (this.labelString instanceof Morph) {
            this.label = this.labelString.fullCopy();
        } else {
            this.label = new StringMorph(
                localize(this.labelString),
                this.fontSize,
                this.fontStyle,
                true,
                false,
                false,
                shading ? this.labelShadowOffset : ZERO,
                this.labelShadowColor,
                this.labelColor
            );
        }
    }
    this.add(this.label);
    if (this.trueStateLabel) {
        this.add(this.trueStateLabel);
    }
};

ToggleButtonMorph.prototype.updateLabelColors = function () {
    var shading = !MorphicPreferences.isFlat || this.is3D;
    ToggleButtonMorph.uber.updateLabelColors.call(this);
    if (this.trueStateLabel) {
        this.trueStateLabel.color = this.labelColor;
        if (shading) {
            this.trueStateLabel.shadowOffset = this.labelShadowOffset;
            this.trueStateLabel.shadowColor = this.labelShadowColor;
        }
        this.trueStateLabel.fixLayout(true); // just me
    }
};

// TabMorph ///////////////////////////////////////////////////////

// TabMorph inherits from ToggleButtonMorph:

TabMorph.prototype = new ToggleButtonMorph();
TabMorph.prototype.constructor = TabMorph;
TabMorph.uber = ToggleButtonMorph.prototype;

// TabMorph instance creation:

function TabMorph(
    colors, // color overrides, <array>: [normal, highlight, pressed]
    target,
    action, // a toggle function
    labelString,
    query, // predicate/selector
    environment,
    hint
) {
    this.init(
        colors,
        target,
        action,
        labelString,
        query,
        environment,
        hint
    );
}

// TabMorph layout:

TabMorph.prototype.fixLayout = function () {
    if (this.label !== null) {
        this.updateLabelColors();
        this.setExtent(new Point(
            this.label.width()
                + this.padding * 2
                + this.corner * 3
                + this.edge * 2,
            (this.label instanceof StringMorph ?
                        this.label.rawHeight() : this.label.height())
                + this.padding * 2
                + this.edge
        ));
        this.label.setCenter(this.center());
    }
};

// TabMorph action:

TabMorph.prototype.refresh = function () {
    if (this.state) { // bring to front
        if (this.parent) {
            this.parent.add(this);
        }
    }
    TabMorph.uber.refresh.call(this);
};

// TabMorph drawing:

TabMorph.prototype.drawBackground = function (context, color) {
    var w = this.width(),
        h = this.height(),
        c = this.corner;

    context.fillStyle = color.toString();
    context.beginPath();
    context.moveTo(0, h);
    context.bezierCurveTo(c, h, c, 0, c * 2, 0);
    context.lineTo(w - c * 2, 0);
    context.bezierCurveTo(w - c, 0, w - c, h, w, h);
    context.closePath();
    context.fill();
};

TabMorph.prototype.drawOutline = function () {
    nop();
};

TabMorph.prototype.drawEdges = function (
    context,
    color,
    topColor,
    bottomColor
) {
    if (MorphicPreferences.isFlat && !this.is3D) {return; }

    var w = this.width(),
        h = this.height(),
        c = this.corner,
        e = this.edge,
        eh = e / 2,
        gradient;

    nop(color); // argument not needed here

    gradient = context.createLinearGradient(0, 0, w, 0);
    gradient.addColorStop(0, topColor.toString());
    gradient.addColorStop(1, bottomColor.toString());

    context.strokeStyle = gradient;
    context.lineCap = 'round';
    context.lineWidth = e;

    context.beginPath();
    context.moveTo(0, h + eh);
    context.bezierCurveTo(c, h, c, 0, c * 2, eh);
    context.lineTo(w - c * 2, eh);
    context.bezierCurveTo(w - c, 0, w - c, h, w, h + eh);
    context.stroke();
};

// ToggleMorph ///////////////////////////////////////////////////////

/*
    I am a PushButton which toggles a check mark (becoming check box)
    or a bullet (becoming a radio button). I can have both or either an
    additional label and an additional pictogram, whereas the pictogram
    can be either an instance of (any) Morph, in which case the pictogram
    will be an interactive toggle itself or a Canvas, in which case it
    is just going to be a picture.
*/

// ToggleMorph inherits from PushButtonMorph:

ToggleMorph.prototype = new PushButtonMorph();
ToggleMorph.prototype.constructor = ToggleMorph;
ToggleMorph.uber = PushButtonMorph.prototype;

// ToggleMorph instance creation:

function ToggleMorph(
    style, // 'checkbox' or 'radiobutton'
    target,
    action, // a toggle function
    labelString,
    query, // predicate/selector
    environment,
    hint,
    element, // optional Morph or Canvas to display
    builder // method which constructs the element (only for Morphs)
) {
    this.init(
        style,
        target,
        action,
        labelString,
        query,
        environment,
        hint,
        element,
        builder
    );
}

ToggleMorph.prototype.init = function (
    style,
    target,
    action,
    labelString,
    query,
    environment,
    hint,
    element,
    builder
) {
    // additional properties:
    this.padding = 1;
    style = style || 'checkbox';
    this.corner = (style === 'checkbox' ?
            0 : fontHeight(this.fontSize) / 2 + this.outline + this.padding);
    this.state = false;
    this.query = query || (() => true);
    this.tick = null;
    this.captionString = labelString || null;
    this.labelAlignment = 'right';
    this.element = element || null;
    this.builder = builder || null;
    this.toggleElement = null;

    // initialize inherited properties:
    ToggleMorph.uber.init.call(
        this,
        target,
        action,
        (style === 'checkbox' ? '\u2713' : '\u25CF'),
        environment,
        hint
    );
    this.fixLayout();
    this.refresh();
};

// ToggleMorph layout:

ToggleMorph.prototype.fixLayout = function () {
    var padding = this.padding * 2 + this.outline * 2,
        y;
    if (this.tick !== null) {
        this.bounds.setHeight(this.tick.rawHeight() + padding);
        this.bounds.setWidth(this.tick.width() + padding);
        this.bounds.setWidth(Math.max(this.width(), this.height()));
        this.bounds.setHeight(Math.max(this.width(), this.height()));
        this.tick.setCenter(this.center());
    }
    if (this.state) {
        this.tick.show();
    } else {
        this.tick.hide();
    }
    if (this.toggleElement && (this.labelAlignment === 'right')) {
        y = this.top() + (this.height() - this.toggleElement.height()) / 2;
        this.toggleElement.setPosition(new Point(
            this.right() + padding,
            y
        ));
    }
    if (this.label !== null) {
        y = this.top() + (this.height() - this.label.height()) / 2;
        if (this.labelAlignment === 'right') {
            this.label.setPosition(new Point(
                this.toggleElement ?
                        this.toggleElement instanceof ToggleElementMorph ?
                                this.toggleElement.right()
                                : this.toggleElement.right() + padding
                        : this.right() + padding,
                y
            ));
        } else {
            this.label.setPosition(new Point(
                this.left() - this.label.width() - padding,
                y
            ));
        }
    }
};

ToggleMorph.prototype.createLabel = function () {
    var shading = !MorphicPreferences.isFlat || this.is3D;

    if (this.label === null) {
        if (this.captionString) {
            this.label = new TextMorph(
                localize(this.captionString),
                this.fontSize,
                this.fontStyle,
                true
            );
            this.add(this.label);
        }
    }
    if (this.tick === null) {
        this.tick = new StringMorph(
            localize(this.labelString),
            this.fontSize,
            this.fontStyle,
            true,
            false,
            false,
            shading ? new Point(1, 1) : null,
            new Color(240, 240, 240)
        );
        this.add(this.tick);
    }
    if (this.toggleElement === null) {
        if (this.element) {
            if (this.element instanceof Morph) {
                this.toggleElement = new ToggleElementMorph(
                    this.target,
                    this.action,
                    this.element,
                    this.query,
                    this.environment,
                    this.hint,
                    this.builder
                );
            } else if (this.element instanceof HTMLCanvasElement) {
                this.toggleElement = new Morph();
                this.toggleElement.isCachingImage = true;
                this.toggleElement.bounds.setExtent(new Point(
                    this.element.width,
                    this.element.height
                ));
                this.toggleElement.cachedImage = this.element;
            }
            this.add(this.toggleElement);
        }
    }
};

// ToggleMorph action:

ToggleMorph.prototype.trigger = function () {
    ToggleMorph.uber.trigger.call(this);
    this.refresh();
};

ToggleMorph.prototype.refresh = function () {
    /*
    if query is a function:
    execute the query with target as environment (can be null)
    for lambdafied (inline) actions

    else if query is a String:
    treat it as function property of target and execute it
    for selector-like queries
    */
    if (typeof this.query === 'function') {
        this.state = this.query.call(this.target);
    } else { // assume it's a String
        this.state = this.target[this.query]();
    }
    if (this.state) {
        this.tick.show();
    } else {
        this.tick.hide();
    }
    if (this.toggleElement && this.toggleElement.refresh) {
        this.toggleElement.refresh();
    }
};

// ToggleMorph events

ToggleMorph.prototype.mouseDownLeft = function () {
    PushButtonMorph.uber.mouseDownLeft.call(this);
    if (this.tick) {
        this.tick.setCenter(this.center().add(1));
    }
};

ToggleMorph.prototype.mouseClickLeft = function () {
    PushButtonMorph.uber.mouseClickLeft.call(this);
    if (this.tick) {
        this.tick.setCenter(this.center());
    }
};

ToggleMorph.prototype.mouseLeave = function () {
    PushButtonMorph.uber.mouseLeave.call(this);
    if (this.tick) {
        this.tick.setCenter(this.center());
    }
};

// ToggleElementMorph /////////////////////////////////////////////////////
/*
    I am a picture of a Morph ("element") which acts as a toggle button.
    I am different from ToggleButton in that I neither create a label nor
    draw button outlines. Instead I display my element morph in specified
    contrasts of a given color, symbolizing whether it is selected or not
*/

// ToggleElementMorph inherits from TriggerMorph:

ToggleElementMorph.prototype = new TriggerMorph();
ToggleElementMorph.prototype.constructor = ToggleElementMorph;
ToggleElementMorph.uber = TriggerMorph.prototype;

// ToggleElementMorph preferences settings

ToggleElementMorph.prototype.contrast = 50;
ToggleElementMorph.prototype.shadowOffset = new Point(2, 2);
ToggleElementMorph.prototype.shadowAlpha = 0.6;
ToggleElementMorph.prototype.fontSize = 10; // only for (optional) labels
ToggleElementMorph.prototype.inactiveColor = new Color(180, 180, 180);

// ToggleElementMorph instance creation:

function ToggleElementMorph(
    target,
    action,
    element,
    query,
    environment,
    hint,
    builder,
    labelString
) {
    this.init(
        target,
        action,
        element,
        query,
        environment,
        hint,
        builder,
        labelString
    );
}

ToggleElementMorph.prototype.init = function (
    target,
    action,
    element, // mandatory
    query,
    environment,
    hint,
    builder, // optional function name that rebuilds the element
    labelString
) {
    // additional properties:
    this.target = target || null;
    this.action = action || null;
    this.element = element;
    this.query = query || (() => true);
    this.environment = environment || null;
    this.hint = hint || null;
    this.builder = builder || 'nop';
    this.captionString = labelString || null;
    this.labelAlignment = 'right';
    this.state = false;

    // initialize inherited properties:
    TriggerMorph.uber.init.call(this);

    // override inherited properties:
    this.color = element.color;
    this.createLabel();
};

// ToggleElementMorph drawing:

ToggleElementMorph.prototype.render = function (ctx) {
    var shading = !MorphicPreferences.isFlat || this.is3D,
        shadow = () => {
            if (shading) {
                this.element.addShadow(
                    this.shadowOffset,
                    this.userState === 'normal' ? 0 : this.shadowAlpha
                );
            }
        };

    this.color = this.element.color;
    this.element.removeShadow();
    this.element[this.builder]();
    if (this.userState !== 'pressed') {
        this.element.removeShadow();
        this.element.setColor(this.inactiveColor);
        this.element[this.builder](this.contrast);
        if (this.userState === 'highlight') {
            this.element.removeShadow();
            this.element.setColor(this.color.lighter(this.contrast));
            this.element[this.builder](this.contrast);
        }
    }
    if (this.element.doWithAlpha) {
        ctx.drawImage(
            this.element.doWithAlpha(
                1,
                () => {
                    shadow();
                    return this.element.fullImage();
                }
            ),
            0,
            0
        );
    } else {
        shadow();
        ctx.drawImage(this.element.fullImage(), 0, 0);
    }

    // reset element
    this.element.removeShadow();
    this.element.setColor(this.color);
    this.element[this.builder]();
};

ToggleElementMorph.prototype.setColor = function (aColor) {
    this.element.setColor(aColor);
    this.fixLayout();
    this.refresh();
};

// ToggleElementMorph layout:

ToggleElementMorph.prototype.fixLayout = function () {
    this.element.fixLayout();
    this.bounds.setExtent(
        this.element.fullBounds().extent().add(
            this.shadowBlur * 2
        )
    );
};

ToggleElementMorph.prototype.createLabel = function () {
    var y;
    if (this.captionString) {
        this.label = new StringMorph(
            this.captionString,
            this.fontSize,
            this.fontStyle,
            true
        );
        this.add(this.label);
        y = this.top() + (this.height() - this.label.height()) / 2;
        if (this.labelAlignment === 'right') {
            this.label.setPosition(new Point(
                this.right(),
                y
            ));
        } else {
            this.label.setPosition(new Point(
                this.left() - this.label.width(),
                y
            ));
        }
    }
};

// ToggleElementMorph action

ToggleElementMorph.prototype.trigger
    = ToggleButtonMorph.prototype.trigger;

ToggleElementMorph.prototype.refresh
    = ToggleButtonMorph.prototype.refresh;

// ToggleElementMorph events

ToggleElementMorph.prototype.mouseEnter
    = ToggleButtonMorph.prototype.mouseEnter;

ToggleElementMorph.prototype.mouseLeave
    = ToggleButtonMorph.prototype.mouseLeave;

ToggleElementMorph.prototype.mouseDownLeft
    = ToggleButtonMorph.prototype.mouseDownLeft;

ToggleElementMorph.prototype.mouseClickLeft
    = ToggleButtonMorph.prototype.mouseClickLeft;

// DialogBoxMorph /////////////////////////////////////////////////////

/*
    I am a DialogBox frame.

    Note:
    -----
    my key property keeps track of my purpose to prevent multiple instances
    on the same or similar objects
*/

// DialogBoxMorph inherits from Morph:

DialogBoxMorph.prototype = new Morph();
DialogBoxMorph.prototype.constructor = DialogBoxMorph;
DialogBoxMorph.uber = Morph.prototype;

// DialogBoxMorph preferences settings:

DialogBoxMorph.prototype.fontSize = 12;
DialogBoxMorph.prototype.titleFontSize = 14;
DialogBoxMorph.prototype.fontStyle = 'sans-serif';

DialogBoxMorph.prototype.color = PushButtonMorph.prototype.color;
DialogBoxMorph.prototype.titleTextColor = WHITE;
DialogBoxMorph.prototype.titleBarColor
    = PushButtonMorph.prototype.pressColor;

DialogBoxMorph.prototype.contrast = 40;

DialogBoxMorph.prototype.corner = 12;
DialogBoxMorph.prototype.padding = 14;
DialogBoxMorph.prototype.titlePadding = 6;

DialogBoxMorph.prototype.buttonContrast = 50;
DialogBoxMorph.prototype.buttonFontSize = 12;
DialogBoxMorph.prototype.buttonCorner = 12;
DialogBoxMorph.prototype.buttonEdge = 6;
DialogBoxMorph.prototype.buttonPadding = 0;
DialogBoxMorph.prototype.buttonOutline = 3;
DialogBoxMorph.prototype.buttonOutlineColor
    = PushButtonMorph.prototype.color;
DialogBoxMorph.prototype.buttonOutlineGradient = true;

DialogBoxMorph.prototype.instances = {}; // prevent multiple instances

// DialogBoxMorph instance creation:

function DialogBoxMorph(target, action, environment) {
    this.init(target, action, environment);
}

DialogBoxMorph.prototype.init = function (target, action, environment) {
    // additional properties:
    this.is3D = false; // for "flat" design exceptions
    this.target = target || null;
    this.action = action || null;
    this.environment = environment || null;
    this.key = null; // keep track of my purpose to prevent mulitple instances

    this.labelString = null;
    this.label = null;
    this.head = null;
    this.body = null;
    this.buttons = null;

    // initialize inherited properties:
    DialogBoxMorph.uber.init.call(this);

    // override inherited properites:
    this.isDraggable = true;
    this.noDropShadow = true;
    this.fullShadowSource = false;
    this.color = PushButtonMorph.prototype.color;
    this.createLabel();
    this.createButtons();
    this.setExtent(new Point(300, 150));
};

// DialogBoxMorph ops
DialogBoxMorph.prototype.inform = function (
    title,
    textString,
    world,
    pic
) {
    var txt = new TextMorph(
        textString,
        this.fontSize,
        this.fontStyle,
        true,
        false,
        'center',
        null,
        null,
        MorphicPreferences.isFlat ? null : new Point(1, 1),
        WHITE
    );

    if (!this.key) {
        this.key = 'inform' + title + textString;
    }

    txt.enableLinks = true; // let the user click on URLs to open in new tab
    this.labelString = title;
    this.createLabel();
    if (pic) {this.setPicture(pic); }
    if (textString) {
        this.addBody(txt);
    }
    this.addButton('ok', 'OK');
    this.fixLayout();
    this.popUp(world);
};

DialogBoxMorph.prototype.askYesNo = function (
    title,
    textString,
    world,
    pic
) {
    var txt = new TextMorph(
        textString,
        this.fontSize,
        this.fontStyle,
        true,
        false,
        'center',
        null,
        null,
        MorphicPreferences.isFlat ? null : new Point(1, 1),
        WHITE
    );

    if (!this.key) {
        this.key = 'decide' + title + textString;
    }

    this.labelString = title;
    this.createLabel();
    if (pic) {this.setPicture(pic); }
    this.addBody(txt);
    this.addButton('ok', 'Yes');
    this.addButton('cancel', 'No');
    this.fixLayout();
    this.popUp(world);
};

DialogBoxMorph.prototype.prompt = function (
    title,
    defaultString,
    world,
    pic,
    choices, // optional dictionary for drop-down of choices
    isReadOnly, // optional when using choices
    isNumeric, // optional
    sliderMin, // optional for numeric sliders
    sliderMax, // optional for numeric sliders
    sliderAction, // optional single-arg function for numeric slider
    decimals = 2 // optional number of decimal digits
) {
    var sld,
        head,
        precision = Math.pow(10, decimals),
        txt = new InputFieldMorph(
            defaultString,
            isNumeric || false, // numeric?
            choices || null, // drop-down dict, optional
            choices ? isReadOnly || false : false
        );
    txt.setWidth(250);
    if (isNumeric) {
        if (pic) {
            head = new AlignmentMorph('column', this.padding);
            pic.setPosition(head.position());
            head.add(pic);
        }
        if (!isNil(sliderMin) && !isNil(sliderMax)) {
            sld = new SliderMorph(
                sliderMin * precision,
                sliderMax * precision,
                parseFloat(defaultString) * precision,
                (sliderMax - sliderMin) / 10 * precision, // knob size
                'horizontal'
            );
            sld.alpha = 1;
            sld.color = this.color.lighter(50);
            sld.setHeight(txt.height() * 0.7);
            sld.setWidth(txt.width());
            sld.action = num => {
                if (sliderAction) {
                    sliderAction(num / precision);
                }
                txt.setContents(num / precision);
                txt.edit();
            };
            if (!head) {
                head = new AlignmentMorph('column', this.padding);
            }
            head.add(sld);
        }
        if (head) {
            head.fixLayout();
            this.setPicture(head);
            head.fixLayout();
        }
    } else {
        if (pic) {this.setPicture(pic); }
    }

    this.reactToChoice = function (inp) {
        if (sld) {
            sld.value = inp * precision;
            sld.fixLayout();
            sld.rerender();
        }
        if (sliderAction) {
            sliderAction(inp);
        }
    };

    txt.reactToInput = function () {
        var inp = txt.getValue();
        if (sld) {
            inp = Math.max(inp, sliderMin);
            sld.value = inp * precision;
            sld.fixLayout();
            sld.rerender();
        }
        if (sliderAction) {
            sliderAction(inp);
        }
    };

    this.labelString = title;
    this.createLabel();

    if (!this.key) {
        this.key = 'prompt' + title + defaultString;
    }

    this.addBody(txt);
    txt.fixLayout();
    this.addButton('ok', 'OK');
    this.addButton('cancel', 'Cancel');
    this.fixLayout();
    this.popUp(world);
};

DialogBoxMorph.prototype.promptCode = function (
    title,
    defaultString,
    world,
    pic,
    instructions
) {
    var frame = new ScrollFrameMorph(),
        text = new TextMorph(defaultString || ''),
        bdy = new AlignmentMorph('column', this.padding),
        size = pic ? Math.max(pic.width, 400) : 400;

    this.getInput = function () {
        return text.text;
    };

    function remarkText(string) {
        return new TextMorph(
            localize(string),
            10,
            null, // style
            false, // bold
            null, // italic
            null, // alignment
            null, // width
            null, // font name
            MorphicPreferences.isFlat ? null : new Point(1, 1),
            WHITE // shadowColor
        );
    }

    frame.padding = 6;
    frame.setWidth(size);
    frame.acceptsDrops = false;
    frame.contents.acceptsDrops = false;

    text.fontName = 'monospace';
    text.fontStyle = 'monospace';
    text.fontSize = 11;
    text.setPosition(frame.topLeft().add(frame.padding));
    text.enableSelecting();
    text.isEditable = true;

    frame.setHeight(size / 4);
    frame.fixLayout = nop;
    frame.edge = InputFieldMorph.prototype.edge;
    frame.fontSize = InputFieldMorph.prototype.fontSize;
    frame.typeInPadding = InputFieldMorph.prototype.typeInPadding;
    frame.contrast = InputFieldMorph.prototype.contrast;
    frame.render = InputFieldMorph.prototype.render;
    frame.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;

    frame.addContents(text);
    text.fixLayout();

    if (pic) {this.setPicture(pic); }

    this.labelString = title;
    this.createLabel();

    if (!this.key) {
        this.key = 'promptCode' + title + defaultString;
    }

    bdy.setColor(this.color);
    bdy.add(frame);
    if (instructions) {
        bdy.add(remarkText(instructions));
    }
    bdy.fixLayout();
    this.addBody(bdy);

    this.addButton('ok', 'OK');
    this.addButton('cancel', 'Cancel');
    this.fixLayout();
    this.popUp(world);
    text.edit();
};

DialogBoxMorph.prototype.promptVector = function (
    title,
    point,
    deflt,
    xLabel,
    yLabel,
    world,
    pic,
    msg
) {
    var vec = new AlignmentMorph('row', 4),
        xInp = new InputFieldMorph(point.x.toString(), true),
        yInp = new InputFieldMorph(point.y.toString(), true),
        xCol = new AlignmentMorph('column', 2),
        yCol = new AlignmentMorph('column', 2),
        inp = new AlignmentMorph('column', 2),
        bdy = new AlignmentMorph('column', this.padding);

    function labelText(string) {
        return new TextMorph(
            localize(string),
            10,
            null, // style
            false, // bold
            null, // italic
            null, // alignment
            null, // width
            null, // font name
            MorphicPreferences.isFlat ? null : new Point(1, 1),
            WHITE // shadowColor
        );
    }

    inp.alignment = 'left';
    inp.setColor(this.color);
    bdy.setColor(this.color);
    xCol.alignment = 'left';
    xCol.setColor(this.color);
    yCol.alignment = 'left';
    yCol.setColor(this.color);

    xCol.add(labelText(xLabel));
    xCol.add(xInp);
    yCol.add(labelText(yLabel));
    yCol.add(yInp);
    vec.add(xCol);
    vec.add(yCol);
    inp.add(vec);

    if (msg) {
        bdy.add(labelText(msg));
    }

    bdy.add(inp);

    vec.fixLayout();
    xCol.fixLayout();
    yCol.fixLayout();
    inp.fixLayout();
    bdy.fixLayout();

    this.labelString = title;
    this.createLabel();
    if (pic) {this.setPicture(pic); }

    this.addBody(bdy);

    this.addButton('ok', 'OK');

    if (deflt instanceof Point) {
        this.addButton(
            () => {
                xInp.setContents(deflt.x.toString());
                yInp.setContents(deflt.y.toString());
            },
            'Default'

        );
    }

    this.addButton('cancel', 'Cancel');
    this.fixLayout();

    this.edit = function () {
        xInp.edit();
    };

    this.getInput = function () {
        return new Point(xInp.getValue(), yInp.getValue());
    };

    if (!this.key) {
        this.key = 'vector' + title;
    }

    this.popUp(world);
};

DialogBoxMorph.prototype.promptCredentials = function (
    title,
    purpose,
    tosURL,
    tosLabel,
    prvURL,
    prvLabel,
    checkBoxLabel,
    world,
    pic,
    msg
) {
    var usr = new InputFieldMorph(),
        bmn,
        byr,
        emlLabel,
        eml = new InputFieldMorph(),
        pw1 = new InputFieldMorph(),
        pw2 = new InputFieldMorph(),
        opw = new InputFieldMorph(),
        agree = false,
        chk,
        dof = new AlignmentMorph('row', 4),
        mCol = new AlignmentMorph('column', 2),
        yCol = new AlignmentMorph('column', 2),
        inp = new AlignmentMorph('column', 2),
        lnk = new AlignmentMorph('row', 4),
        bdy = new AlignmentMorph('column', this.padding),
        years = {},
        currentYear = new Date().getFullYear(),
        firstYear = currentYear - 20,
        myself = this;

    function labelText(string) {
        return new TextMorph(
            localize(string),
            10,
            null, // style
            false, // bold
            null, // italic
            null, // alignment
            null, // width
            null, // font name
            MorphicPreferences.isFlat ? null : new Point(1, 1),
            WHITE // shadowColor
        );
    }

    function linkButton(label, url) {
        var btn = new PushButtonMorph(
            myself,
            () => window.open(url),
            '  ' + localize(label) + '  '
        );
        btn.fontSize = 10;
        btn.corner = myself.buttonCorner;
        btn.edge = myself.buttonEdge;
        btn.outline = myself.buttonOutline;
        btn.outlineColor = myself.buttonOutlineColor;
        btn.outlineGradient = myself.buttonOutlineGradient;
        btn.padding = myself.buttonPadding;
        btn.contrast = myself.buttonContrast;
        btn.fixLayout();
        return btn;
    }

    function age() {
        var today = new Date().getFullYear() + new Date().getMonth() / 12,
            year = +byr.getValue() || 0,
            monthName = bmn.getValue(),
            month,
            birthday;
        if (monthName instanceof Array) { // translatable
            monthName = monthName[0];
        }
        if (isNaN(year)) {
            year = 0;
        }
        month = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ].indexOf(monthName);
        if (isNaN(month)) {
            month = 0;
        }
        birthday = year + month / 12;
        return today - birthday;
    }

    bmn = new InputFieldMorph(
        null, // text
        false, // numeric?
        {
            'January' : ['January'],
            'February' : ['February'],
            'March' : ['March'],
            'April' : ['April'],
            'May' : ['May'],
            'June' : ['June'],
            'July' : ['July'],
            'August' : ['August'],
            'September' : ['September'],
            'October' : ['October'],
            'November' : ['November'],
            'December' : ['December']
        },
        true // read-only
    );
    for (currentYear; currentYear > firstYear; currentYear -= 1) {
        years[currentYear.toString() + ' '] = currentYear;
    }
    years[firstYear + ' ' + localize('or before')] = '< ' + currentYear;
    byr = new InputFieldMorph(
        null, // text
        false, // numeric?
        years,
        true // read-only
    );

    inp.alignment = 'left';
    inp.setColor(this.color);
    bdy.setColor(this.color);

    mCol.alignment = 'left';
    mCol.setColor(this.color);
    yCol.alignment = 'left';
    yCol.setColor(this.color);

    usr.setWidth(200);
    bmn.setWidth(100);
    byr.contents().minWidth = 80;
    byr.setWidth(80);
    eml.setWidth(200);
    pw1.setWidth(200);
    pw2.setWidth(200);
    opw.setWidth(200);
    pw1.contents().text.toggleIsPassword();
    pw2.contents().text.toggleIsPassword();
    opw.contents().text.toggleIsPassword();

    if (purpose === 'login') {
        inp.add(labelText('User name:'));
        inp.add(usr);
    }

    if (purpose === 'signup') {
        inp.add(labelText('User name:'));
        inp.add(usr);
        mCol.add(labelText('Birth date:'));
        mCol.add(bmn);
        yCol.add(labelText('year:'));
        yCol.add(byr);
        dof.add(mCol);
        dof.add(yCol);
        inp.add(dof);
        emlLabel = labelText('foo');
        inp.add(emlLabel);
        inp.add(eml);
        inp.add(labelText('Password:'));
        inp.add(pw1);
        inp.add(labelText('Repeat Password:'));
        inp.add(pw2);
    }

    if (purpose === 'login') {
        inp.add(labelText('Password:'));
        inp.add(pw1);
    }

    if (purpose === 'changePassword') {
        inp.add(labelText('Old password:'));
        inp.add(opw);
        inp.add(labelText('New password:'));
        inp.add(pw1);
        inp.add(labelText('Repeat new password:'));
        inp.add(pw2);
    }

    if (purpose === 'resetPassword' || purpose === 'resendVerification') {
        inp.add(labelText('User name:'));
        inp.add(usr);
    }

    if (msg) {
        bdy.add(labelText(msg));
    }

    bdy.add(inp);

    if (tosURL || prvURL) {
        bdy.add(lnk);
    }
    if (tosURL) {
        lnk.add(linkButton(tosLabel, tosURL));
    }
    if (prvURL) {
        lnk.add(linkButton(prvLabel, prvURL));
    }

    if (checkBoxLabel) {
        chk = new ToggleMorph(
            'checkbox',
            this,
            () => agree = !agree, // action,
            checkBoxLabel,
            () => agree //query
        );
        chk.edge = this.buttonEdge / 2;
        chk.outline = this.buttonOutline / 2;
        chk.outlineColor = this.buttonOutlineColor;
        chk.outlineGradient = this.buttonOutlineGradient;
        chk.contrast = this.buttonContrast;
        chk.fixLayout();
        bdy.add(chk);
    }

    dof.fixLayout();
    mCol.fixLayout();
    yCol.fixLayout();
    inp.fixLayout();
    lnk.fixLayout();
    bdy.fixLayout();

    this.labelString = title;
    this.createLabel();
    if (pic) {this.setPicture(pic); }

    this.addBody(bdy);

    this.addButton('ok', 'OK');
    this.addButton('cancel', 'Cancel');
    this.fixLayout();

    function validInputs() {
        var checklist,
            empty,
            em = eml.getValue();

        function indicate(morph, string) {
            var bubble = new SpeechBubbleMorph(localize(string));
            bubble.isPointingRight = false;
            bubble.fixLayout();
            bubble.popUp(
                world,
                morph.leftCenter().subtract(new Point(bubble.width() + 2, 0))
            );
            if (morph.edit) {
                morph.edit();
            }
        }

        if (purpose === 'login') {
            checklist = [usr, pw1];
        } else if (purpose === 'signup') {
            checklist = [usr, bmn, byr, eml, pw1, pw2];
        } else if (purpose === 'changePassword') {
            checklist = [opw, pw1, pw2];
        } else if (purpose === 'resetPassword' ||
                purpose === 'resendVerification') {
            checklist = [usr];
        }

        empty = detect(
            checklist,
            inp => !inp.getValue()
        );
        if (empty) {
            indicate(empty, 'please fill out\nthis field');
            return false;
        }
        if (purpose === 'signup') {
            if (usr.getValue().length < 4) {
                indicate(usr, 'User name must be four\ncharacters or longer');
                return false;
            }
            if (em.indexOf(' ') > -1 || em.indexOf('@') === -1
                    || em.indexOf('.') === -1 || em.length < 5) {
                indicate(eml, 'please provide a valid\nemail address');
                return false;
            }
        }
        if (purpose === 'changePassword' || purpose === 'signup') {
            if (pw1.getValue().length < 6) {
                indicate(pw1, 'password must be six\ncharacters or longer');
                return false;
            }
            if (pw1.getValue() !== pw2.getValue()) {
                indicate(pw2, 'passwords do\nnot match');
                return false;
            }
        }
        if (purpose === 'signup') {
            if (!agree) {
                indicate(chk, 'please agree to\nthe TOS');
                return false;
            }
        }
        return true;
    }

    this.accept = function () {
        if (validInputs()) {
            DialogBoxMorph.prototype.accept.call(myself);
        }
    };

    this.edit = function () {
        if (purpose === 'changePassword') {
            opw.edit();
        } else { // 'signup', 'login', 'resetPassword', 'resendVerification'
            usr.edit();
        }
    };

    this.getInput = function () {
        return {
            username: usr.getValue(),
            email: eml.getValue(),
            oldpassword: opw.getValue(),
            password: pw1.getValue(),
            passwordRepeat: pw2.getValue(),
            choice: agree
        };
    };

    this.reactToChoice = function () {
        if (purpose === 'signup') {
            emlLabel.changed();
            emlLabel.text = age() <= 13 ?
                    'E-mail address of parent or guardian:'
                        : 'E-mail address:';
            emlLabel.text = localize(emlLabel.text);
            emlLabel.fixLayout();
            emlLabel.rerender();
        }
    };

    this.reactToChoice(); // initialize e-mail label

    if (!this.key) {
        this.key = 'credentials' + title + purpose;
    }

    this.popUp(world);
};

DialogBoxMorph.prototype.accept = function () {
    /*
    if target is a function, use it as callback:
    execute target as callback function with action as argument
    in the environment as optionally specified.
    Note: if action is also a function, instead of becoming
    the argument itself it will be called to answer the argument.
    for selections, Yes/No Choices etc:

    else (if target is not a function):

        if action is a function:
        execute the action with target as environment (can be null)
        for lambdafied (inline) actions

        else if action is a String:
        treat it as function property of target and execute it
        for selector-like actions
    */
    if (this.action) {
        if (typeof this.target === 'function') {
            if (typeof this.action === 'function') {
                this.target.call(this.environment, this.action.call());
            } else {
                this.target.call(this.environment, this.action);
            }
        } else {
            if (typeof this.action === 'function') {
                this.action.call(this.target, this.getInput());
            } else { // assume it's a String
                this.target[this.action](this.getInput());
            }
        }
    }
    this.destroy();
};

DialogBoxMorph.prototype.withKey = function (key) {
    this.key = key;
    return this;
};

DialogBoxMorph.prototype.popUp = function (world) {
    if (world) {
        if (this.key) {
            if (this.instances[world.stamp]) {
                if (this.instances[world.stamp][this.key]) {
                    this.instances[world.stamp][this.key].destroy();
                }
                this.instances[world.stamp][this.key] = this;
            } else {
                this.instances[world.stamp] = {};
                this.instances[world.stamp][this.key] = this;
            }
        }
        world.add(this);
        world.keyboardFocus = this;
        this.setCenter(world.center());
        this.edit();
    }
};

DialogBoxMorph.prototype.destroy = function () {
    DialogBoxMorph.uber.destroy.call(this);
    if (this.key) {
        delete this.instances[this.key];
    }
};

DialogBoxMorph.prototype.ok = function () {
    this.accept();
};

DialogBoxMorph.prototype.cancel = function () {
    this.destroy();
};

DialogBoxMorph.prototype.edit = function () {
    this.children.forEach(c => {
        if (c.edit) {
            c.edit();
        }
    });
};

DialogBoxMorph.prototype.getInput = function () {
    if (this.body instanceof InputFieldMorph) {
        return this.body.getValue();
    }
    return null;
};

DialogBoxMorph.prototype.justDropped = function (hand) {
    hand.world.keyboardFocus = this;
    this.edit();
};

DialogBoxMorph.prototype.destroy = function () {
    var world = this.world();
    world.keyboardFocus = null;
    world.hand.destroyTemporaries();
    DialogBoxMorph.uber.destroy.call(this);
};

DialogBoxMorph.prototype.normalizeSpaces = function (string) {
    var ans = '', i, c, flag = false;

    for (i = 0; i < string.length; i += 1) {
        c = string[i];
        if (c === ' ') {
            if (flag) {
                ans += c;
                flag = false;
            }
        } else {
            ans += c;
            flag = true;
        }
    }
    return ans.trim();
};

// DialogBoxMorph submorph construction

DialogBoxMorph.prototype.createLabel = function () {
    var shading = !MorphicPreferences.isFlat || this.is3D;

    if (this.label) {
        this.label.destroy();
    }
    if (this.labelString) {
        this.label = new StringMorph(
            localize(this.labelString),
            this.titleFontSize,
            this.fontStyle,
            true,
            false,
            false,
            shading ? new Point(2, 1) : null,
            this.titleBarColor.darker(this.contrast)
        );
        this.label.color = this.titleTextColor;
        this.label.fixLayout();
        this.add(this.label);
    }
};

DialogBoxMorph.prototype.createButtons = function () {
    if (this.buttons) {
        this.buttons.destroy();
    }
    this.buttons = new AlignmentMorph('row', this.padding);
    this.add(this.buttons);
};

DialogBoxMorph.prototype.addButton = function (action, label) {
    var button = new PushButtonMorph(
        this,
        action || 'ok',
        '  ' + localize((label || 'OK')) + '  '
    );
    button.fontSize = this.buttonFontSize;
    button.corner = this.buttonCorner;
    button.edge = this.buttonEdge;
    button.outline = this.buttonOutline;
    button.outlineColor = this.buttonOutlineColor;
    button.outlineGradient = this.buttonOutlineGradient;
    button.padding = this.buttonPadding;
    button.contrast = this.buttonContrast;
    button.fixLayout();
    this.buttons.add(button);
    return button;
};

DialogBoxMorph.prototype.setPicture = function (aMorphOrCanvas) {
    var morph;
    if (aMorphOrCanvas instanceof Morph) {
        morph = aMorphOrCanvas;
    } else {
        morph = new Morph();
        morph.isCachingImage = true;
        morph.cachedImage = aMorphOrCanvas;
        morph.bounds.setWidth(aMorphOrCanvas.width);
        morph.bounds.setHeight(aMorphOrCanvas.height);
    }
    this.addHead(morph);
};

DialogBoxMorph.prototype.addHead = function (aMorph) {
    if (this.head) {
        this.head.destroy();
    }
    this.head = aMorph;
    this.add(this.head);
};

DialogBoxMorph.prototype.addBody = function (aMorph) {
    if (this.body) {
        this.body.destroy();
    }
    this.body = aMorph;
    this.add(this.body);
};

// DialogBoxMorph layout

DialogBoxMorph.prototype.fixLayout = function () {
    // determine by extent and arrange my components
    var th = fontHeight(this.titleFontSize) + this.titlePadding * 2, w;

    if (this.head) {
        this.head.setPosition(this.position().add(new Point(
            this.padding,
            th + this.padding
        )));
        this.bounds.setWidth(this.head.width() + this.padding * 2);
        this.bounds.setHeight(
            this.head.height()
                + this.padding * 2
                + th
        );
    }

    if (this.body) {
        if (this.head) {
            this.body.setPosition(this.head.bottomLeft().add(new Point(
                0,
                this.padding
            )));
            this.bounds.setWidth(Math.max(
                this.width(),
                this.body.width() + this.padding * 2
            ));
            this.bounds.setHeight(
                this.height()
                    + this.body.height()
                    + this.padding
            );
            w = this.width();
            this.head.setLeft(
                this.left()
                    + Math.round((w - this.head.width()) / 2)
            );
            this.body.setLeft(
                this.left()
                    + Math.round((w - this.body.width()) / 2)
            );
        } else {
            this.body.setPosition(this.position().add(new Point(
                this.padding,
                th + this.padding
            )));
            this.bounds.setWidth(this.body.width() + this.padding * 2);
            this.bounds.setHeight(
                this.body.height()
                    + this.padding * 2
                    + th
            );
        }
    }

    if (this.label) {
        this.label.setCenter(this.center());
        this.label.setTop(this.top() + (th - this.label.height()) / 2);
    }

    if (this.buttons && (this.buttons.children.length > 0)) {
        this.buttons.fixLayout();
        this.bounds.setHeight(
            this.height()
                    + this.buttons.height()
                    + this.padding
        );
        this.bounds.setWidth(Math.max(
                this.width(),
                this.buttons.width()
                        + (2 * this.padding)
            )
        );
        this.buttons.setCenter(this.center());
        this.buttons.setBottom(this.bottom() - this.padding);
    }

    // refresh a shallow shadow
    this.removeShadow();
    this.addShadow();
};

// DialogBoxMorph keyboard events

DialogBoxMorph.prototype.processKeyPress = nop;

DialogBoxMorph.prototype.processKeyDown = function (event) {
    // this.inspectKeyEvent(event);
    switch (event.keyCode) {
    case 13:
        this.ok();
        break;
    case 27:
        this.cancel();
        break;
    default:
        nop();
        // this.inspectKeyEvent(event);
    }
};

// DialogBoxMorph drawing

DialogBoxMorph.prototype.render = function (ctx) {
    var gradient,
        w = this.width(),
        h = this.height(),
        th = Math.floor(
            fontHeight(this.titleFontSize) + this.titlePadding * 2
        ),
        shift = this.corner / 2,
        x,
        y,
        isFlat = MorphicPreferences.isFlat && !this.is3D;

    // this.alpha = isFlat ? 0.9 : 1;

    // title bar
    if (isFlat) {
        ctx.fillStyle = this.titleBarColor.toString();
    } else {
        gradient = ctx.createLinearGradient(0, 0, 0, th);
        gradient.addColorStop(
            0,
            this.titleBarColor.lighter(this.contrast / 2).toString()
        );
        gradient.addColorStop(
            1,
            this.titleBarColor.darker(this.contrast).toString()
        );
        ctx.fillStyle = gradient;
    }
    ctx.beginPath();
    this.outlinePathTitle(
        ctx,
        isFlat ? 0 : this.corner
    );
    ctx.closePath();
    ctx.fill();

    // flat shape
    // body
    ctx.fillStyle = this.color.toString();
    ctx.beginPath();
    this.outlinePathBody(
        ctx,
        isFlat ? 0 : this.corner
    );
    ctx.closePath();
    ctx.fill();

    if (isFlat) {
        return;
    }

    // 3D-effect
    // bottom left corner
    gradient = ctx.createLinearGradient(
        0,
        h - this.corner,
        0,
        h
    );
    gradient.addColorStop(0, this.color.toString());
    gradient.addColorStop(1, this.color.darker(this.contrast.toString()));

    ctx.lineWidth = this.corner;
    ctx.lineCap = 'round';
    ctx.strokeStyle = gradient;

    ctx.beginPath();
    ctx.moveTo(this.corner, h - shift);
    ctx.lineTo(this.corner + 1, h - shift);
    ctx.stroke();

    // bottom edge
    gradient = ctx.createLinearGradient(
        0,
        h - this.corner,
        0,
        h
    );
    gradient.addColorStop(0, this.color.toString());
    gradient.addColorStop(1, this.color.darker(this.contrast.toString()));

    ctx.lineWidth = this.corner;
    ctx.lineCap = 'butt';
    ctx.strokeStyle = gradient;

    ctx.beginPath();
    ctx.moveTo(this.corner, h - shift);
    ctx.lineTo(w - this.corner, h - shift);
    ctx.stroke();

    // right body edge
    gradient = ctx.createLinearGradient(
        w - this.corner,
        0,
        w,
        0
    );
    gradient.addColorStop(0, this.color.toString());
    gradient.addColorStop(1, this.color.darker(this.contrast).toString());

    ctx.lineWidth = this.corner;
    ctx.lineCap = 'butt';
    ctx.strokeStyle = gradient;

    ctx.beginPath();
    ctx.moveTo(w - shift, th);
    ctx.lineTo(w - shift, h - this.corner);
    ctx.stroke();

    // bottom right corner
    x = w - this.corner;
    y = h - this.corner;

    gradient = ctx.createRadialGradient(
        x,
        y,
        0,
        x,
        y,
        this.corner
    );
    gradient.addColorStop(0, this.color.toString());
    gradient.addColorStop(1, this.color.darker(this.contrast.toString()));

    ctx.lineCap = 'butt';

    ctx.strokeStyle = gradient;

    ctx.beginPath();
    ctx.arc(
        x,
        y,
        shift,
        radians(90),
        radians(0),
        true
    );
    ctx.stroke();

    // left body edge
    gradient = ctx.createLinearGradient(
        0,
        0,
        this.corner,
        0
    );
    gradient.addColorStop(
        0,
        this.color.lighter(this.contrast).toString()
    );
    gradient.addColorStop(1, this.color.toString());

    ctx.lineCap = 'butt';
    ctx.strokeStyle = gradient;

    ctx.beginPath();
    ctx.moveTo(shift, th);
    ctx.lineTo(shift, h - this.corner * 2);
    ctx.stroke();

    // left vertical bottom corner
    gradient = ctx.createLinearGradient(
        0,
        0,
        this.corner,
        0
    );
    gradient.addColorStop(
        0,
        this.color.lighter(this.contrast).toString()
    );
    gradient.addColorStop(1, this.color.toString());

    ctx.lineCap = 'round';
    ctx.strokeStyle = gradient;

    ctx.beginPath();
    ctx.moveTo(shift, h - this.corner * 2);
    ctx.lineTo(shift, h - this.corner - shift);
    ctx.stroke();
};

DialogBoxMorph.prototype.outlinePathTitle = function (ctx, radius) {
    var w = this.width(),
        h = Math.ceil(fontHeight(this.titleFontSize)) + this.titlePadding * 2;

    // top left:
    ctx.arc(
        radius,
        radius,
        radius,
        radians(-180),
        radians(-90),
        false
    );
    // top right:
    ctx.arc(
        w - radius,
        radius,
        radius,
        radians(-90),
        radians(-0),
        false
    );
    // bottom right:
    ctx.lineTo(w, h);

    // bottom left:
    ctx.lineTo(0, h);
};

DialogBoxMorph.prototype.outlinePathBody = function (ctx, radius) {
    var w = this.width(),
        h = this.height(),
        th = Math.floor(fontHeight(this.titleFontSize)) +
            this.titlePadding * 2;

    // top left:
    ctx.moveTo(0, th);

    // top right:
    ctx.lineTo(w, th);

    // bottom right:
    ctx.arc(
        w - radius,
        h - radius,
        radius,
        radians(0),
        radians(90),
        false
    );
    // bottom left:
    ctx.arc(
        radius,
        h - radius,
        radius,
        radians(90),
        radians(180),
        false
    );
};

// AlignmentMorph /////////////////////////////////////////////////////

// I am a reified layout, either a row or a column of submorphs

// AlignmentMorph inherits from Morph:

AlignmentMorph.prototype = new Morph();
AlignmentMorph.prototype.constructor = AlignmentMorph;
AlignmentMorph.uber = Morph.prototype;

// AlignmentMorph instance creation:

function AlignmentMorph(orientation, padding) {
    this.init(orientation, padding);
}

AlignmentMorph.prototype.init = function (orientation, padding) {
    // additional properties:
    this.orientation = orientation || 'row'; // or 'column'
    this.alignment = 'center'; // or 'left' in a column
    this.padding = padding || 0;
    this.respectHiddens = false;

    // initialize inherited properties:
    AlignmentMorph.uber.init.call(this);

    // override inherited properites:
};

// AlignmentMorph displaying and layout

AlignmentMorph.prototype.render = function (ctx) {
    // override to not draw anything, as alignments are just containers
    // for layout of their components
    nop(ctx);
};

AlignmentMorph.prototype.fixLayout = function () {
    var last = null,
        newBounds;
    if (this.children.length === 0) {
        return null;
    }
    this.children.forEach(c => {
        var cfb = c.fullBounds(),
            lfb;
        if (c.isVisible || this.respectHiddens) {
            if (last) {
                lfb = last.fullBounds();
                if (this.orientation === 'row') {
                    c.setPosition(
                        lfb.topRight().add(new Point(
                            this.padding,
                            (lfb.height() - cfb.height()) / 2
                        ))
                    );
                } else { // orientation === 'column'
                    c.setPosition(
                        lfb.bottomLeft().add(new Point(
                            this.alignment === 'center' ?
                                    (lfb.width() - cfb.width()) / 2
                                            : 0,
                            this.padding
                        ))
                    );
                }
                cfb = c.fullBounds();
                newBounds = newBounds.merge(cfb);
            } else {
                newBounds = cfb;
            }
            last = c;
        }
    });
    this.bounds = newBounds;
};

// InputFieldMorph //////////////////////////////////////////////////////

// InputFieldMorph inherits from Morph:

InputFieldMorph.prototype = new Morph();
InputFieldMorph.prototype.constructor = InputFieldMorph;
InputFieldMorph.uber = Morph.prototype;

// InputFieldMorph settings

InputFieldMorph.prototype.edge = 2;
InputFieldMorph.prototype.fontSize = 12;
InputFieldMorph.prototype.typeInPadding = 2;
InputFieldMorph.prototype.contrast = 65;

// InputFieldMorph instance creation:

function InputFieldMorph(text, isNumeric, choiceDict, isReadOnly) {
    this.init(text, isNumeric, choiceDict, isReadOnly);
}

InputFieldMorph.prototype.init = function (
    text,
    isNumeric,
    choiceDict,
    isReadOnly
) {
    var contents = new StringFieldMorph(
            text || '',
            null, null, null, null, null,
            isNumeric || false
        ),
        arrow = new ArrowMorph(
            'down',
            0,
            Math.max(Math.floor(this.fontSize / 6), 1)
        );

    this.choices = choiceDict || null; // object, function or selector
    this.isReadOnly = isReadOnly || false;
    this.isNumeric = isNumeric || false;

    contents.alpha = 0;
    contents.fontSize = this.fontSize;
    contents.fixLayout();

    this.oldContentsExtent = contents.extent();

    InputFieldMorph.uber.init.call(this);
    this.color = WHITE;
    this.add(contents);
    this.add(arrow);
    contents.isDraggable = false;
    this.fixLayout();
};

// InputFieldMorph accessing:

InputFieldMorph.prototype.contents = function () {
    return detect(
        this.children,
        child => child instanceof StringFieldMorph
    );
};

InputFieldMorph.prototype.arrow = function () {
    return detect(
        this.children,
        child => child instanceof ArrowMorph
    );
};

InputFieldMorph.prototype.setChoice = function (aStringOrFloat) {
    this.setContents(aStringOrFloat);
    this.escalateEvent('reactToChoice', aStringOrFloat);
};

InputFieldMorph.prototype.setContents = function (aStringOrFloat) {
    var cnts = this.contents();
    cnts.text.text = aStringOrFloat;
    if (aStringOrFloat === undefined) {
        return null;
    }
    if (aStringOrFloat === null) {
        cnts.text.text = '';
    } else if (aStringOrFloat.toString) {
        cnts.text.text = aStringOrFloat.toString();
    }
    cnts.text.fixLayout();
    cnts.changed();
    cnts.fixLayout();
    cnts.rerender();
};

InputFieldMorph.prototype.edit = function () {
    var c = this.contents();
    c.text.edit();
    c.text.selectAll();
};

InputFieldMorph.prototype.setIsNumeric = function (bool) {
    var value;

    this.isNumeric = bool;
    this.contents().isNumeric = bool;
    this.contents().text.isNumeric = bool;

    // adjust my shown value to conform with the numeric flag
    value = this.getValue();
    if (this.isNumeric) {
        value = parseFloat(value);
        if (isNaN(value)) {
            value = null;
        }
    }
    this.setContents(value);
};

// InputFieldMorph drop-down menu:

InputFieldMorph.prototype.dropDownMenu = function () {
    var choices = this.choices,
        key,
        menu = new MenuMorph(
            this.setChoice,
            null,
            this,
            this.fontSize
        );

    if (choices instanceof Function) {
        choices = choices.call(this);
    } else if (isString(choices)) {
        choices = this[choices]();
    }
    if (!choices) {
        return null;
    }
    menu.addItem(' ', null);
    if (choices instanceof Array) {
        choices.forEach(choice => menu.addItem(choice[0], choice[1]));
    } else { // assuming a dictionary
        for (key in choices) {
            if (Object.prototype.hasOwnProperty.call(choices, key)) {
                if (key[0] === '~') {
                    menu.addLine();
                } else {
                    menu.addItem(key, choices[key]);
                }
            }
        }
    }
    if (menu.items.length > 0) {
        menu.popUpAtHand(this.world());
    } else {
        return null;
    }
};

// InputFieldMorph layout:

InputFieldMorph.prototype.fixLayout = function () {
    var contents = this.contents(),
        arrow = this.arrow();

    if (!contents) {return null; }
    contents.isNumeric = this.isNumeric;
    contents.isEditable = (!this.isReadOnly);
    if (this.choices) {
        arrow.setSize(this.fontSize);
        arrow.show();
    } else {
        arrow.setSize(0);
        arrow.hide();
    }
    this.bounds.setHeight(
        contents.height()
            + this.edge * 2
            + this.typeInPadding * 2
    );
    this.bounds.setWidth(Math.max(
        contents.minWidth
            + this.edge * 2
            + this.typeInPadding * 2,
        this.width()
    ));

    contents.setWidth(
        this.width() - this.edge - this.typeInPadding -
            (this.choices ? arrow.width() + this.typeInPadding : 0)
    );

    contents.setPosition(new Point(
        this.edge,
        this.edge
    ).add(this.typeInPadding).add(this.position()));

    arrow.setPosition(new Point(
        this.right() - arrow.width() - this.edge,
        contents.top()
    ));

};

// InputFieldMorph events:

InputFieldMorph.prototype.mouseClickLeft = function (pos) {
    if (this.arrow().bounds.containsPoint(pos)) {
        this.dropDownMenu();
    } else if (this.isReadOnly) {
        this.dropDownMenu();
    } else {
        this.escalateEvent('mouseClickLeft', pos);
    }
};

// InputFieldMorph retrieving:

InputFieldMorph.prototype.getValue = function () {
/*
    answer my content's text string. If I am numerical convert that
    string to a number. If the conversion fails answer the string
    otherwise the numerical value.
*/
    var num,
        contents = this.contents();
    if (this.isNumeric) {
        num = parseFloat(contents.text);
        if (!isNaN(num)) {
            return num;
        }
    }
    return this.normalizeSpaces(contents.string());
};

InputFieldMorph.prototype.normalizeSpaces
    = DialogBoxMorph.prototype.normalizeSpaces;

// InputFieldMorph drawing:

InputFieldMorph.prototype.render = function (ctx) {
    var borderColor;

    if (this.parent) {
        if (this.parent.color.eq(WHITE)) {
            this.color = this.parent.color.darker(this.contrast * 0.1);
        } else {
            this.color = this.parent.color.lighter(this.contrast * 0.75);
        }
        borderColor = this.parent.color;
    } else {
        borderColor = new Color(120, 120, 120);
    }
    ctx.fillStyle = this.color.toString();

    // cache my border colors
    this.cachedClr = borderColor.toString();
    this.cachedClrBright = borderColor.lighter(this.contrast)
        .toString();
    this.cachedClrDark = borderColor.darker(this.contrast).toString();

    ctx.fillRect(
        this.edge,
        this.edge,
        this.width() - this.edge * 2,
        this.height() - this.edge * 2
    );

    this.drawRectBorder(ctx);
};

InputFieldMorph.prototype.drawRectBorder = function (ctx) {
    var shift = this.edge * 0.5,
        gradient;

    if (MorphicPreferences.isFlat && !this.is3D) {return; }

    ctx.lineWidth = this.edge;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    if (useBlurredShadows) {
        ctx.shadowOffsetY = shift;
        ctx.shadowBlur = this.edge * 4;
        ctx.shadowColor = this.cachedClrDark;
    }

    gradient = ctx.createLinearGradient(
        0,
        0,
        0,
        this.edge
    );

    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrDark);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(this.edge, shift);
    ctx.lineTo(this.width() - this.edge - shift, shift);
    ctx.stroke();

    ctx.shadowOffsetY = 0;

    gradient = ctx.createLinearGradient(
        0,
        0,
        this.edge,
        0
    );
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrDark);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(shift, this.edge);
    ctx.lineTo(shift, this.height() - this.edge - shift);
    ctx.stroke();

    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;

    gradient = ctx.createLinearGradient(
        0,
        this.height() - this.edge,
        0,
        this.height()
    );
    gradient.addColorStop(0, this.cachedClrBright);
    gradient.addColorStop(1, this.cachedClr);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(this.edge, this.height() - shift);
    ctx.lineTo(this.width() - this.edge, this.height() - shift);
    ctx.stroke();

    gradient = ctx.createLinearGradient(
        this.width() - this.edge,
        0,
        this.width(),
        0
    );
    gradient.addColorStop(0, this.cachedClrBright);
    gradient.addColorStop(1, this.cachedClr);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(this.width() - shift, this.edge);
    ctx.lineTo(this.width() - shift, this.height() - this.edge);
    ctx.stroke();
};

// PianoMenuMorph //////////////////////////////////////////////////////
/* 
    I am a menu that looks like a piano keyboard.
*/

// PianoMenuMorph inherits from MenuMorph

PianoMenuMorph.prototype = new MenuMorph();
PianoMenuMorph.prototype.constructor = PianoMenuMorph;
PianoMenuMorph.uber = MenuMorph.prototype;

// PianoMenuMorph instance creation:

function PianoMenuMorph(target, environment, fontSize, soundType) {
    this.init(target, environment, fontSize, soundType);
}

PianoMenuMorph.prototype.init = function (
    target,
    environment,
    fontSize,
    soundType // number 1 - 4: 'sine', 'square', 'sawtooth' or 'triangle'
) {
    var choices, key;
    this.soundType = soundType;
    PianoMenuMorph.uber.init.call(this, target, null, environment, fontSize);
    choices = {
        'C (48)' : 48,
        'D (50)' : 50,
        'C# (49)' : 49,
        'E (52)' : 52,
        'Eb (51)' : 51,
        'F (53)' : 53,
        'G (55)' : 55,
        'F# (54)' : 54,
        'A (57)' : 57,
        'G# (56)' : 56,
        'B (59)' : 59,
        'Bb (58)' : 58,
        'C (60)' : 60,
        'D (62)' : 62,
        'C# (61)' : 61,
        'E (64)' : 64,
        'Eb (63)' : 63,
        'F (65)' : 65,
        'G (67)' : 67,
        'F# (66)' : 66,
        'A (69)' : 69,
        'G# (68)' : 68,
        'B (71)' : 71,
        'Bb (70)' : 70,
        'C (72)' : 72
    };
    for (key in choices) {
        if (Object.prototype.hasOwnProperty.call(choices, key)) {
            this.addItem(key, choices[key]);
        }
    }
};

PianoMenuMorph.prototype.createItems = function () {
    var item,
        fb,
        x,
        y,
        label,
        blackkey,
        key,
        keycolor,
        keywidth,
        keyheight,
        keyposition;

    this.children.forEach(m => m.destroy());
    this.children = [];
    if (!this.isListContents) {
        this.edge = MorphicPreferences.isFlat ? 0 : 5;
        this.border = MorphicPreferences.isFlat ? 1 : 2;
    }
    this.color = WHITE;
    this.borderColor = new Color(60, 60, 60);
    this.bounds.setExtent(ZERO);

    x = this.left() + 1;
    y = this.top() + (this.fontSize * 1.5) + 2;
    label = new StringMorph('', this.fontSize);
    this.items.forEach(tuple => {
        blackkey = tuple[0][1] !== " ";
        key = new BoxMorph(1, 1);
        if (blackkey) {
            keycolor = BLACK;
            keywidth = this.fontSize; // 9;
            keyheight = this.fontSize * 2.5;
            keyposition = new Point(x + 2 - (this.fontSize * 2), y);
        } else {
            keycolor = WHITE;
            keywidth = this.fontSize * 1.5;
            keyheight = this.fontSize * 4;
            keyposition = new Point(x + 1, y);
            x += keywidth - 1;
        }
        key.setColor(keycolor);
        key.setWidth(keywidth);
        key.setHeight(keyheight);
        item = new PianoKeyMorph(
            this.target,
            tuple[1],
            [key, tuple[0]],
            this.fontSize || MorphicPreferences.menuFontSize,
            MorphicPreferences.menuFontName,
            this.environment,
            tuple[2], // bubble help hint
            tuple[3], // color
            tuple[4], // bold
            tuple[5], // italic
            tuple[6], // doubleclick action
            label     // String to change
        );
        item.setPosition(keyposition);
        this.add(item);
    });
    fb = this.fullBounds();
    label.setPosition(new Point((fb.width() / 2) - this.fontSize, 2));
    this.add(label);
    fb = this.fullBounds();
    this.bounds.setExtent(fb.extent().add(2));
};

// PianoMenuMorph keyboard selecting a key:

PianoMenuMorph.prototype.select = function(aPianoKeyItem) {
    this.unselectAllItems();
    aPianoKeyItem.mouseEnter();
    this.selection = aPianoKeyItem;
    this.world.keyboardFocus = this;
    this.hasFocus = true;
};

PianoMenuMorph.prototype.unselectAllItems = function () {
    this.children.forEach(item => {
        if (item instanceof MenuItemMorph) {
            item.mouseLeave();
        }
    });
    this.changed();
};

PianoMenuMorph.prototype.selectKey = function (midiNum) {
    var key;
    if (isNil(midiNum)) {
        return;
    }
    key = detect(
        this.children,
        each => each.action === midiNum
    );
    if (key) {
        this.select(key);
    } else {
        this.selectKey(48);
    }
};

// PianoMenuMorph keyboard navigation & entry:

PianoMenuMorph.prototype.processKeyDown = function (event) {
    // console.log(event.keyCode);
    switch (event.keyCode) {
    case 13: // 'enter'
    case 32: // 'space'
        if (this.selection) {
            this.selection.mouseClickLeft();
        }
        return;
    case 27: // 'esc'
        return this.destroy();
    case 37: // 'left arrow'
    case 40: // 'down arrow'
    case 189: // -
        return this.selectDown();
    case 38: // 'up arrow'
    case 39: // 'right arrow'
    case 187: // +
    case 220: // #
        return this.selectUp();
    default:
        switch(event.key) {
        case 'C':
            return this.selectKey(48);
        case 'c':
            return this.selectKey(60);
        case 'D':
            return this.selectKey(50);
        case 'd':
            return this.selectKey(62);
        case 'E':
            return this.selectKey(52);
        case 'e':
            return this.selectKey(64);
        case 'F':
            return this.selectKey(53);
        case 'f':
            return this.selectKey(65);
        case 'G':
            return this.selectKey(55);
        case 'g':
            return this.selectKey(67);
        case 'A':
            return this.selectKey(57);
        case 'a':
            return this.selectKey(69);
        case 'B':
        case 'H':
            return this.selectKey(59);
        case 'b':
        case 'h':
            return this.selectKey(71);
        default:
            nop();
        }
    }
};

PianoMenuMorph.prototype.selectUp = function () {
    var next = 48;
    if (this.selection) {
        next = this.selection.action + 1;
        if (next > 72) {
            next = 48;
        }
    }
    this.selectKey(next);
};

PianoMenuMorph.prototype.selectDown = function () {
    var next = 48;
    if (this.selection) {
        next = this.selection.action - 1;
        if (next < 48) {
            next = 72;
        }
    }
    this.selectKey(next);
};

PianoMenuMorph.prototype.destroy = function () {
    this.children.forEach(key => {
        if (key.note) {
            key.note.stop();
        }
    });
    PianoMenuMorph.uber.destroy.call(this);
};


// PianoKeyMorph ///////////////////////////////////////////////////////

PianoKeyMorph.prototype = new MenuItemMorph();
PianoKeyMorph.prototype.constructor = PianoKeyMorph;
PianoKeyMorph.uber = MenuItemMorph.prototype;

function PianoKeyMorph(
    target,
    action,
    labelString, // can also be a Morph or a Canvas or a tuple: [icon, string]
    fontSize,
    fontStyle,
    environment,
    hint,
    color,
    bold,
    italic,
    doubleClickAction, // optional when used as list morph item
    label
) {
    this.init(
        target,
        action,
        labelString,
        fontSize,
        fontStyle,
        environment,
        hint,
        color,
        bold,
        italic,
        doubleClickAction,
        label
    );
    this.feedback = label;
}

PianoKeyMorph.prototype.init = function (
    target,
    action,
    labelString,
    fontSize,
    fontStyle,
    environment,
    hint,
    color,
    bold,
    italic,
    doubleClickAction,
    label
) {
    // additional "note" property for sound output:
    this.note = new Note(action);
    PianoKeyMorph.uber.init.call(
        this,
        target,
        action,
        labelString,
        fontSize,
        fontStyle,
        environment,
        hint,
        color,
        bold,
        italic,
        doubleClickAction,
        label
    );
};

PianoKeyMorph.prototype.createLabel = function () {
    var icon;
    if (this.label !== null) {
        this.label.destroy();
    }
    // assume its pattern is: [icon, string]
    this.label = new Morph();
    icon = this.createIcon(this.labelString[0]);
    this.label.add(icon);
    this.bounds.setExtent(icon.extent());
    this.label.bounds = this.position().extent(this.label.extent());
    this.label.bounds.setExtent(ZERO);
    this.add(this.label);
};

PianoKeyMorph.prototype.mouseEnter = function () {
    var piano = this.parentThatIsA(PianoMenuMorph),
        soundType = piano ? piano.soundType : 1;
    if (piano) {
        piano.unselectAllItems();
        piano.selection = this;
        piano.world.keyboardFocus = piano;
        piano.hasFocus = true;
    }
    this.label.children[0].hide();
    this.userState = 'highlight';
    this.rerender();
    this.feedback.text = this.labelString[1];
    this.feedback.fixLayout();
    this.note.play(soundType);
    setTimeout(
        () => this.note.stop(true),
        400
    );
};

PianoKeyMorph.prototype.mouseLeave = function () {
    this.note.stop(true);
    this.label.children[0].show();
    this.userState = 'normal';
    this.rerender();
};
