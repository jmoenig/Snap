import Node from "../Node";
import Rectangle from "../Rectangle";
import {contains, copy, detect, newCanvas, nop} from "../util";
import MenuMorph from "./MenuMorph";
import WorldMorph from "./WorldMorph";
import Point from "../Point";
import ShadowMorph from "./ShadowMorph";
import {MorphicPreferences, useBlurredShadows} from "../settings";
import ScrollFrameMorph from "./ScrollFrameMorph";
import FrameMorph from "./FrameMorph";
import HandMorph from "./HandMorph";
import InspectorMorph from "./InspectorMorph";
import HandleMorph from "./HandleMorph";
import Animation, {Easing} from "../Animation";
import StringFieldMorph from "./StringFieldMorph";
import SliderMorph from "./SliderMorph";
import ColorPickerMorph from "./ColorPickerMorph";
import {localize} from "../../locale/SnapTranslator";
import StringMorph from "./StringMorph";
import TextMorph from "./TextMorph";

// Morph settings:

/*
    damage list housekeeping

    the trackChanges property of the Morph prototype is a Boolean switch
    that determines whether the World's damage list ('broken' rectangles)
    tracks changes. By default the switch is always on. If set to false
    changes are not stored. This can be very useful for housekeeping of
    the damage list in situations where a large number of (sub-) morphs
    are changed more or less at once. Instead of keeping track of every
    single submorph's changes tremendous performance improvements can be
    achieved by setting the trackChanges flag to false before propagating
    the layout changes, setting it to true again and then storing the full
    bounds of the surrounding morph. As an example refer to the

        fixLayout()

    method of InspectorMorph, or the

        startLayout()
        endLayout()

    methods of SyntaxElementMorph in the Snap application.
*/

export interface ISituation {
    origin: Morph,
    position: Point
}

export default class Morph extends Node {
    public trackChanges: boolean; // prototype
    public shadowBlur: number; // prototype

    public step: Function; // prototype
    public nop: Function; // prototype

    public isMorph = true;
    public image: HTMLCanvasElement = null;
    public bounds = new Rectangle(0, 0, 50, 40);
    public cachedFullImage: HTMLCanvasElement = null; // TODO?
    public cachedFullBounds: Rectangle = null; // TODO?
    public color = new Color(80, 80, 80);
    public texture: string = null;
    public cachedTexture: HTMLImageElement = null;
    public alpha = 1;
    public isVisible = true;
    public isDraggable = false;
    public isTemplate = false;
    public acceptsDrops = false;
    public noticesTransparentClick = false;
    public fps = 0;
    public customContextMenu: MenuMorph = null;
    public lastTime = Date.now();
    public onNextStep: () => void = null;

    public children: Morph[]; // children should be morphs

    constructor(noDraw?: boolean) {
        super();

        if (!noDraw) {this.drawNew(); }
    }

    // Morph string representation: e.g. 'a Morph 2 [20@45 | 130@250]'

    toString() {
        return `a ${this.constructor.name ||
        this.constructor.toString().split(' ')[1].split('(')[0]} ${this.children.length.toString()} ${this.bounds}`;
    }

    // Morph deleting:

    destroy() {
        if (this.parent !== null) {
            this.fullChanged();
            this.parent.removeChild(this);
        }
    }

    // Morph stepping:

    stepFrame() {
        if (!this.step) {
            return;
        }
        let current;
        let elapsed;
        let leftover;
        let nxt;
        current = Date.now();
        elapsed = current - this.lastTime;
        if (this.fps > 0) {
            leftover = (1000 / this.fps) - elapsed;
        } else {
            leftover = 0;
        }
        if (leftover < 1) {
            this.lastTime = current;
            if (this.onNextStep) {
                nxt = this.onNextStep;
                this.onNextStep = null;
                nxt.call(this);
            }
            this.step();
            this.children.forEach(child => {
                child.stepFrame();
            });
        }
    }

    nextSteps(arrayOfFunctions: (() => void)[]) { // TODO: Fix O(n^2) method
        const lst = arrayOfFunctions || [];
        const nxt = lst.shift();
        if (nxt) {
            this.onNextStep = () => {
                nxt.call(this);
                this.nextSteps(lst);
            };
        }
    }

    // Morph accessing - geometry getting:

    left() {
        return this.bounds.left();
    }

    right() {
        return this.bounds.right();
    }

    top() {
        return this.bounds.top();
    }

    bottom() {
        return this.bounds.bottom();
    }

    center() {
        return this.bounds.center();
    }

    bottomCenter() {
        return this.bounds.bottomCenter();
    }

    bottomLeft() {
        return this.bounds.bottomLeft();
    }

    bottomRight() {
        return this.bounds.bottomRight();
    }

    boundingBox() {
        return this.bounds;
    }

    corners() {
        return this.bounds.corners();
    }

    leftCenter() {
        return this.bounds.leftCenter();
    }

    rightCenter() {
        return this.bounds.rightCenter();
    }

    topCenter() {
        return this.bounds.topCenter();
    }

    topLeft() {
        return this.bounds.topLeft();
    }

    topRight() {
        return this.bounds.topRight();
    }

    position() {
        return this.bounds.origin;
    }

    extent() {
        return this.bounds.extent();
    }

    width() {
        return this.bounds.width();
    }

    height() {
        return this.bounds.height();
    }

    fullBounds() {
        let result = this.bounds;
        this.children.forEach(child => {
            if (child.isVisible) {
                result = result.merge(child.fullBounds());
            }
        });
        return result;
    }

    fullBoundsNoShadow() {
        // answer my full bounds but ignore any shadow
        let result = this.bounds;
        this.children.forEach(child => {
            if (!(child instanceof ShadowMorph) && (child.isVisible)) {
                result = result.merge(child.fullBounds());
            }
        });
        return result;
    }

    visibleBounds() {
        // answer which part of me is not clipped by a Frame
        let visible = this.bounds;

        const frames = this.allParents().filter(p => p instanceof FrameMorph);
        frames.forEach((f: FrameMorph) => {
            visible = visible.intersect(f.bounds);
        });
        return visible;
    }

    // Morph accessing - simple changes:

    moveBy(delta: Point | number) {
        this.fullChanged(); // TODO: ???
        this.silentMoveBy(delta);
        this.fullChanged();
    }

    silentMoveBy(delta: Point | number) {
        const children = this.children;
        let i = children.length;
        this.bounds = this.bounds.translateBy(delta);
        if (this.cachedFullBounds) {
            this.cachedFullBounds = this.cachedFullBounds.translateBy(delta);
        }
        // ugly optimization avoiding forEach()
        for (i; i > 0; i -= 1) {
            children[i - 1].silentMoveBy(delta);
        }
    }

    setPosition(aPoint: Point) {
        const delta = aPoint.subtract(this.topLeft());
        if ((delta.x !== 0) || (delta.y !== 0)) {
            this.moveBy(delta);
        }
    }

    silentSetPosition(aPoint: Point) {
        const delta = aPoint.subtract(this.topLeft());
        if ((delta.x !== 0) || (delta.y !== 0)) {
            this.silentMoveBy(delta);
        }
    }

    setLeft(x: number) {
        this.setPosition(
            new Point(
                x,
                this.top()
            )
        );
    }

    setRight(x: number) {
        this.setPosition(
            new Point(
                x - this.width(),
                this.top()
            )
        );
    }

    setTop(y: number) {
        this.setPosition(
            new Point(
                this.left(),
                y
            )
        );
    }

    setBottom(y: number) {
        this.setPosition(
            new Point(
                this.left(),
                y - this.height()
            )
        );
    }

    setCenter(aPoint: Point) {
        this.setPosition(
            aPoint.subtract(
                this.extent().floorDivideBy(2)
            )
        );
    }

    setFullCenter(aPoint: Point) {
        this.setPosition(
            aPoint.subtract(
                this.fullBounds().extent().floorDivideBy(2)
            )
        );
    }

    keepWithin(aMorph: Morph) {
        // make sure I am completely within another Morph's bounds
        let leftOff;

        let rightOff;
        let topOff;
        let bottomOff;
        leftOff = this.fullBounds().left() - aMorph.left();
        if (leftOff < 0) {
            this.moveBy(new Point(-leftOff, 0));
        }
        rightOff = this.fullBounds().right() - aMorph.right();
        if (rightOff > 0) {
            this.moveBy(new Point(-rightOff, 0));
        }
        topOff = this.fullBounds().top() - aMorph.top();
        if (topOff < 0) {
            this.moveBy(new Point(0, -topOff));
        }
        bottomOff = this.fullBounds().bottom() - aMorph.bottom();
        if (bottomOff > 0) {
            this.moveBy(new Point(0, -bottomOff));
        }
    }

    scrollIntoView() {
        let leftOff;
        let rightOff;
        let topOff;
        let bottomOff;
        const sf = <ScrollFrameMorph> this.parentThatIsA(ScrollFrameMorph);
        if (!sf) {return; }
        rightOff = Math.min(
            this.fullBounds().right() - sf.right(),
            sf.contents.right() - sf.right()
        );
        if (rightOff > 0) {
            sf.contents.moveBy(new Point(-rightOff, 0));
        }
        leftOff = this.fullBounds().left() - sf.left();
        if (leftOff < 0) {
            sf.contents.moveBy(new Point(-leftOff, 0));
        }
        topOff = this.fullBounds().top() - sf.top();
        if (topOff < 0) {
            sf.contents.moveBy(new Point(0, -topOff));
        }
        bottomOff = this.fullBounds().bottom() - sf.bottom();
        if (bottomOff > 0) {
            sf.contents.moveBy(new Point(0, -bottomOff));
        }
        sf.adjustScrollBars();
    }

    // Morph accessing - dimensional changes requiring a complete redraw

    setExtent(aPoint: Point, silently?: boolean) {
        // silently avoids redrawing the receiver
        if (silently) {
            this.silentSetExtent(aPoint);
            return;
        }
        if (!aPoint.eq(this.extent())) {
            this.changed();
            this.silentSetExtent(aPoint);
            this.changed();
            this.drawNew();
        }
    }

    silentSetExtent(aPoint: Point) {
        let ext;
        let newWidth;
        let newHeight;
        ext = aPoint.round();
        newWidth = Math.max(ext.x, 0);
        newHeight = Math.max(ext.y, 0);
        this.bounds.corner = new Point(
            this.bounds.origin.x + newWidth,
            this.bounds.origin.y + newHeight
        );
    }

    setWidth(width: number) {
        this.setExtent(new Point(width || 0, this.height()));
    }

    silentSetWidth(width: number) {
        // do not drawNew() just yet
        const w = Math.max(Math.round(width || 0), 0);
        this.bounds.corner = new Point(
            this.bounds.origin.x + w,
            this.bounds.corner.y
        );
    }

    setHeight(height: number) {
        this.setExtent(new Point(this.width(), height || 0));
    }

    silentSetHeight(height: number) {
        // do not drawNew() just yet
        const h = Math.max(Math.round(height || 0), 0);
        this.bounds.corner = new Point(
            this.bounds.corner.x,
            this.bounds.origin.y + h
        );
    }

    setColor(aColor: Color) {
        if (aColor) {
            if (!this.color.eq(aColor)) {
                this.color = aColor;
                this.changed();
                this.drawNew();
            }
        }
    }

    // Morph displaying:

    drawNew() {
        // initialize my surface property
        this.image = newCanvas(this.extent());
        const context = this.image.getContext('2d');
        context.fillStyle = this.color.toString();

        /*
            Chrome issue:

                when filling a rectangular area, versions of Chrome beginning with
                57.0.2987.133 start introducing vertical transparent stripes
                to the right of the rectangle.
                The following code replaces the original fillRect() call with
                an explicit almost-rectangular path that miraculously  makes
                sure the whole rectangle gets filled correctly.

            Important: This needs to be monitored in the future so we can
            revert to sane code once this Chrome issue has been resolved again.
        */

        // context.fillRect(0, 0, this.width(), this.height()); // taken out

        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(this.image.width, 0);
        context.lineTo(this.image.width, this.image.height);
        context.lineTo(0, this.image.height + 0.0001); // yeah, I luv Chrome!
        context.closePath();
        context.fill();

        if (this.cachedTexture) {
            this.drawCachedTexture();
        } else if (this.texture) {
            this.drawTexture(this.texture);
        }
    }

    drawTexture(url: string) {
        const myself = this;
        this.cachedTexture = new Image();
        this.cachedTexture.onload = () => {
            myself.drawCachedTexture();
        };
        this.cachedTexture.src = this.texture = url; // make absolute
    }

    drawCachedTexture() {
        const bg = this.cachedTexture;
        const cols = Math.floor(this.image.width / bg.width);
        const lines = Math.floor(this.image.height / bg.height);
        let x;
        let y;
        const context = this.image.getContext('2d');

        for (y = 0; y <= lines; y += 1) {
            for (x = 0; x <= cols; x += 1) {
                context.drawImage(bg, x * bg.width, y * bg.height);
            }
        }
        this.changed();
    }

    /*
    Morph.prototype.drawCachedTexture = function () {
        var context = this.image.getContext('2d'),
            pattern = context.createPattern(this.cachedTexture, 'repeat');
        context.fillStyle = pattern;
        context.fillRect(0, 0, this.image.width, this.image.height);
        this.changed();
    };
    */

    drawOn(aCanvas: HTMLCanvasElement, aRect?: Rectangle) {
        let rectangle;
        let area;
        let delta;
        let src;
        let context;
        let w;
        let h;
        let sl;
        let st;
        const pic = this.cachedFullImage || this.image;
        const bounds = this.cachedFullBounds || this.bounds;
        if (!this.isVisible) {
            return;
        }
        rectangle = aRect || bounds;
        area = rectangle.intersect(bounds);
        if (area.extent().gt(new Point(0, 0))) {
            delta = bounds.position().neg();
            src = area.copy().translateBy(delta);
            context = aCanvas.getContext('2d');
            context.globalAlpha = this.alpha;

            sl = src.left();
            st = src.top();
            w = Math.min(src.width(), pic.width - sl);
            h = Math.min(src.height(), pic.height - st);

            if (w < 1 || h < 1) {
                return;
            }

            context.drawImage(
                pic,
                sl,
                st,
                w,
                h,
                area.left(),
                area.top(),
                w,
                h
            );
        }
    }

    fullDrawOn(aCanvas: HTMLCanvasElement, aRect?: Rectangle) {
        if (!this.isVisible) {
            return;
        }
        const rectangle = aRect || this.cachedFullBounds || this.fullBounds();
        this.drawOn(aCanvas, rectangle);
        if (this.cachedFullImage) {return; }
        this.children.forEach(child => {
            child.fullDrawOn(aCanvas, rectangle);
        });
    }

    hide() {
        this.isVisible = false;
        this.changed();
        this.children.forEach((child: Morph) => {
            child.hide();
        });
    }

    show() {
        this.isVisible = true;
        this.changed();
        this.children.forEach((child: Morph) => {
            child.show();
        });
    }

    toggleVisibility() {
        this.isVisible = (!this.isVisible);
        this.changed();
        this.children.forEach((child: Morph) => {
            child.toggleVisibility();
        });
    }

    // Morph full image:

    fullImageClassic() {
        // use the cache since fullDrawOn() will
        const fb = this.cachedFullBounds || this.fullBounds();

        const img = newCanvas(fb.extent());
        const ctx = img.getContext('2d');
        ctx.translate(-fb.origin.x, -fb.origin.y);
        this.fullDrawOn(img, fb);
        img.globalAlpha = this.alpha;
        return img;
    }

    fullImage() {
        let img = newCanvas(this.fullBounds().extent());
        let ctx = img.getContext('2d');
        let fb = this.fullBounds();

        this.allChildren().forEach((morph: Morph) => {
            if (morph.isVisible) {
                ctx.globalAlpha = morph.alpha;
                if (morph.image.width && morph.image.height) {
                    ctx.drawImage(
                        morph.image,
                        morph.bounds.origin.x - fb.origin.x,
                        morph.bounds.origin.y - fb.origin.y
                    );
                }
            }
        });
        return img;
    }

    // Morph shadow:

    shadowImage(off: Point, color: Color) {
        // fallback for Windows Chrome-Shadow bug
        let fb;

        let img;
        let outline;
        let sha;
        let ctx;
        const offset = off || new Point(7, 7);
        const clr = color || new Color(0, 0, 0);
        fb = this.fullBounds().extent();
        img = this.fullImage();
        outline = newCanvas(fb);
        ctx = outline.getContext('2d');
        ctx.drawImage(img, 0, 0);
        ctx.globalCompositeOperation = 'destination-out';
        ctx.drawImage(
            img,
            -offset.x,
            -offset.y
        );
        sha = newCanvas(fb);
        ctx = sha.getContext('2d');
        ctx.drawImage(outline, 0, 0);
        ctx.globalCompositeOperation = 'source-atop';
        ctx.fillStyle = clr.toString();
        ctx.fillRect(0, 0, fb.x, fb.y);
        return sha;
    }

    shadowImageBlurred(off: Point, color: Color) {
        let fb;
        let img;
        let sha;
        let ctx;
        const offset = off || new Point(7, 7);
        const blur = this.shadowBlur;
        const clr = color || new Color(0, 0, 0);
        fb = this.fullBounds().extent().add(blur * 2);
        img = this.fullImage();
        sha = newCanvas(fb);
        ctx = sha.getContext('2d');
        ctx.shadowOffsetX = offset.x;
        ctx.shadowOffsetY = offset.y;
        ctx.shadowBlur = blur;
        ctx.shadowColor = clr.toString();
        ctx.drawImage(
            img,
            blur - offset.x,
            blur - offset.y
        );
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0;
        ctx.globalCompositeOperation = 'destination-out';
        ctx.drawImage(
            img,
            blur - offset.x,
            blur - offset.y
        );
        return sha;
    }

    shadow(off: Point = new Point(7, 7), a?: number, color?: Color) {
        const shadow = new ShadowMorph();
        const offset = off;
        const alpha = a || ((a === 0) ? 0 : 0.2);
        const fb = this.fullBounds();
        shadow.setExtent(fb.extent().add(this.shadowBlur * 2));
        if (useBlurredShadows && !MorphicPreferences.isFlat) {
            shadow.image = this.shadowImageBlurred(offset, color);
            shadow.alpha = alpha;
            shadow.setPosition(fb.origin.add(offset).subtract(this.shadowBlur));
        } else {
            shadow.image = this.shadowImage(offset, color);
            shadow.alpha = alpha;
            shadow.setPosition(fb.origin.add(offset));
        }
        return shadow;
    }

    addShadow(off: Point = new Point(7, 7), a?: number, color?: Color) {
        let shadow;
        const offset = off;
        const alpha = a || ((a === 0) ? 0 : 0.2);
        shadow = this.shadow(offset, alpha, color);
        this.addBack(shadow);
        this.fullChanged();
        return shadow;
    }

    getShadow() {
        let shadows;
        shadows = this.children.slice(0).reverse().filter(
            child => child instanceof ShadowMorph
        );
        if (shadows.length !== 0) {
            return shadows[0];
        }
        return null;
    }

    removeShadow() {
        const shadow = this.getShadow();
        if (shadow !== null) {
            this.fullChanged();
            this.removeChild(shadow);
        }
    }

    // Morph pen trails:

    penTrails() {
        // answer my pen trails canvas. default is to answer my image
        return this.image;
    }

    // Morph updating:

    changed() {
        if (this.trackChanges) {
            const w = this.root();
            if (w instanceof WorldMorph) {
                w.broken.push(this.visibleBounds().spread());
            }
        }
        if (this.parent && this.parent instanceof Morph) {
            this.parent.childChanged(this);
        }
    }

    fullChanged() {
        if (this.trackChanges) {
            const w = this.root();
            if (w instanceof WorldMorph) {
                w.broken.push(
                    (this.cachedFullBounds || this.fullBounds()).spread()
                );
            }
        }
    }

    childChanged(morph?: Morph) {
        // react to a change in one of my children,
        // default is to just pass this message on upwards
        // override this method for Morphs that need to adjust accordingly
        if (this.parent && this.parent instanceof Morph) {
            this.parent.childChanged(this);
        }
    }

    // Morph accessing - structure:

    world(): WorldMorph {
        const root = this.root();
        if (root instanceof WorldMorph) {
            return root;
        }
        if (root instanceof HandMorph) {
            return root.world;
        }
        return null;
    }

    add(aMorph: Morph) {
        const owner = aMorph.parent;
        if (owner !== null) {
            owner.removeChild(aMorph);
        }
        this.addChild(aMorph);
    }

    addBack(aMorph: Morph) {
        const owner = aMorph.parent;
        if (owner !== null) {
            owner.removeChild(aMorph);
        }
        this.addChildFirst(aMorph);
    }

    topMorphAt(point: Point): Morph {
        let i;
        let result;
        if (!this.isVisible) {return null; }
        for (i = this.children.length - 1; i >= 0; i -= 1) {
            result = this.children[i].topMorphAt(point);
            if (result) { return result; }
        }
        return this.bounds.containsPoint(point) &&
            (this.noticesTransparentClick || !this.isTransparentAt(point)) ? this
                  : null;
    }

    topMorphSuchThat(predicate: (morph: Morph) => boolean): Morph {
        let next;
        if (predicate.call(null, this)) {
            next = detect(
                this.children.slice(0).reverse(),
                predicate
            );
            if (next) {
                return next.topMorphSuchThat(predicate);
            }
            return this;
        }
        return null;
    }

    overlappedMorphs() {
        //exclude the World
        const world = this.world();

        const fb = this.fullBounds();
        const myself = this;
        const allParents = this.allParents();
        const allChildren = this.allChildren();

        const morphs = world.allChildren();
        return morphs.filter(m => m.isVisible &&
            m !== myself &&
            m !== world &&
            !contains(allParents, m) &&
            !contains(allChildren, m) &&
            m.fullBounds().intersects(fb));
    }

    // Morph pixel access:

    getPixelColor(aPoint: Point) {
        let point;
        let context;
        let data;
        point = aPoint.subtract(this.bounds.origin);
        context = this.image.getContext('2d');
        data = context.getImageData(point.x, point.y, 1, 1);
        return new Color(
            data.data[0],
            data.data[1],
            data.data[2],
            data.data[3] / 255
        );
    }

    isTransparentAt(aPoint: Point) {
        let point;
        let context;
        let data;
        if (this.bounds.containsPoint(aPoint)) {
            if (this.texture) {
                return false;
            }
            point = aPoint.subtract(this.bounds.origin);
            context = this.image.getContext('2d');
            data = context.getImageData(
                Math.floor(point.x),
                Math.floor(point.y),
                1,
                1
            );
            return data.data[3] === 0;
        }
        return false;
    }

    // Morph duplicating:

    copy() {
        const c = copy(this);
        c.parent = null;
        c.children = [];
        c.bounds = this.bounds.copy();
        return c;
    }

    fullCopy() {
        /*
        Produce a copy of me with my entire tree of submorphs. Morphs
        mentioned more than once are all directed to a single new copy.
        Other properties are also *shallow* copied, so you must override
        to deep copy Arrays and (complex) Objects
        */
        const map: Map<Morph, Morph> = new Map();

        let c;
        c = this.copyRecordingReferences(map);
        c.forAllChildren((m: Morph) => {
            m.updateReferences(map);
        });
        return c;
    }

    copyRecordingReferences(map: Map<Morph, Morph>) {
        /*
        Recursively copy this entire composite morph, recording the
        correspondence between old and new morphs in the given dictionary.
        This dictionary will be used to update intra-composite references
        in the copy. See updateReferences().

        Note: This default implementation copies ONLY morphs. If a morph
        stores morphs in other properties that it wants to copy, then it
        should override this method to do so. The same goes for morphs that
        contain other complex data that should be copied when the morph is
        duplicated.
        */
        const c = this.copy();
        map.set(this, c);
        this.children.forEach(m => {
            c.add(m.copyRecordingReferences(map));
        });
        return c;
    }

    updateReferences(map: Map<Morph, Morph>) {
        /*
        Update intra-morph references within a composite morph that has
        been copied. For example, if a button refers to morph X in the
        orginal composite then the copy of that button in the new composite
        should refer to the copy of X in new composite, not the original X.
        */
        const properties = Object.keys(this);

        const l = properties.length;
        let property;
        let value;
        let reference;
        let i;
        for (i = 0; i < l; i += 1) {
            property = properties[i];
            value = (<any> this)[property]; // TODO
            if (value && value.isMorph) {
                reference = map.get(value);
                if (reference) { (<any> this)[property] = reference; }
            }
        }
    }

    // Morph dragging and dropping:

    rootForGrab(): Morph {
        if (this instanceof ShadowMorph) {
            return (<Morph> this.parent).rootForGrab();
        }
        if (this.parent instanceof ScrollFrameMorph) {
            return this.parent;
        }
        if (this.parent === null ||
                this.parent instanceof WorldMorph ||
                this.parent instanceof FrameMorph ||
                this.isDraggable === true) {
            return this;
        }
        return (<Morph> this.parent).rootForGrab();
    }

    isCorrectingOutsideDrag() {
        // make sure I don't "trail behind" the hand when dragged
        // override for morphs that you want to be dragged outside
        // their full bounds
        return true;
    }

    wantsDropOf(aMorph: Morph) {
        // default is to answer the general flag - change for my heirs
        if ((aMorph instanceof HandleMorph) ||
                (aMorph instanceof MenuMorph) ||
                (aMorph instanceof InspectorMorph)) {
            return false;
        }
        return this.acceptsDrops;
    }

    pickUp(world: WorldMorph = this.world()) {
        this.setPosition(
            world.hand.position().subtract(
                this.extent().floorDivideBy(2)
            )
        );
        world.hand.grab(this);
    }

    isPickedUp() {
        return this.parentThatIsA(HandMorph) !== null;
    }

    situation(): ISituation {
        // answer a dictionary specifying where I am right now, so
        // I can slide back to it if I'm dropped somewhere else
        if (this.parent && this.parent instanceof Morph) {
            return {
                origin: this.parent,
                position: this.position().subtract(this.parent.position())
            };
        }
        return null;
    }

    slideBackTo(situation: ISituation, msecs: number, onBeforeDrop?: () => void, onComplete?: () => void) {
        const pos = situation.origin.position().add(situation.position);
        this.glideTo(
            pos,
            msecs,
            null, // easing
            () => {
                situation.origin.add(this);
                if (onBeforeDrop) {onBeforeDrop(); }
                if (this.justDropped) {this.justDropped(); }
                if (situation.origin.reactToDropOf) {
                    situation.origin.reactToDropOf(this);
                }
                if (onComplete) {onComplete(); }
            }
        );
    }

    // Morph animating:

    glideTo(endPoint: Point, msecs: number, easing: string | Easing, onComplete?: () => void) {
        const world = this.world();
        const myself = this;
        world.animations.push(new Animation(
            x => {myself.setLeft(x); },
            () => myself.left(),
            -(this.left() - endPoint.x),
            msecs || 100,
            easing,
            onComplete
        ));
        world.animations.push(new Animation(
            y => {myself.setTop(y); },
            () => myself.top(),
            -(this.top() - endPoint.y),
            msecs || 100,
            easing
        ));
    }

    fadeTo(endAlpha: number, msecs: number, easing: string | Easing, onComplete?: () => void) {
        // include all my children, restore all original transparencies
        // on completion, so I can be recovered
        const world = this.world();

        const myself = this;
        const oldAlpha = this.alpha;
        this.children.forEach(child => {
            child.fadeTo(endAlpha, msecs, easing);
        });
        world.animations.push(new Animation(
            n => {
                myself.alpha = n;
                myself.changed();
            },
            () => myself.alpha,
            endAlpha - this.alpha,
            msecs || 200,
            easing,
            () => {
                myself.alpha = oldAlpha;
                if (onComplete) {onComplete(); }
            }
        ));
    }

    perish(msecs: number, onComplete?: () => void) {
        const myself = this;
        this.fadeTo(
            0,
            msecs || 100,
            null,
            () => {
                myself.destroy();
                if (onComplete) {onComplete(); }
            }
        );
    }

    resize() {
        this.world().activeHandle = new HandleMorph(this);
    }

    move() {
        this.world().activeHandle = new HandleMorph(
            this,
            null,
            null,
            null,
            null,
            'move'
        );
    }

    moveCenter() {
        this.world().activeHandle = new HandleMorph(
            this,
            null,
            null,
            null,
            null,
            'moveCenter'
        );
    }

    hint(msg: string) {
        let m;
        let text;
        text = msg;
        if (msg) {
            if (msg.toString) {
                text = msg.toString();
            }
        } else {
            text = 'NULL';
        }
        m = new MenuMorph(this, text);
        m.isDraggable = true;
        m.popUpCenteredAtHand(this.world());
    }

    inform(msg: string) {
        let m;
        let text;
        text = msg;
        if (msg) {
            if (msg.toString) {
                text = msg.toString();
            }
        } else {
            text = 'NULL';
        }
        m = new MenuMorph(this, text);
        m.addItem("Ok");
        m.isDraggable = true;
        m.popUpCenteredAtHand(this.world());
    }

    prompt(
        msg: string,
        callback: () => void,
        environment: any, // TODO
        defaultContents = "",
        width = 100,
        floorNum?: number,
        ceilingNum?: number,
        isRounded?: boolean) {
        let slider;
        let isNumeric;
        if (ceilingNum) {
            isNumeric = true;
        }
        const menu = new MenuMorph(
            callback || null,
            msg || '',
            environment || null
        );
        const entryField = new StringFieldMorph(
            defaultContents,
            width,
            MorphicPreferences.prompterFontSize,
            MorphicPreferences.prompterFontName,
            false,
            false,
            isNumeric
        );
        menu.items.push(entryField);
        if (ceilingNum || MorphicPreferences.useSliderForInput) {
            slider = new SliderMorph(
                floorNum || 0,
                ceilingNum,
                parseFloat(defaultContents),
                Math.floor((ceilingNum - floorNum) / 4),
                'horizontal'
            );
            slider.alpha = 1;
            slider.color = new Color(225, 225, 225);
            slider.button.color = menu.borderColor;
            slider.button.highlightColor = slider.button.color.copy();
            slider.button.highlightColor.b += 100;
            slider.button.pressColor = slider.button.color.copy();
            slider.button.pressColor.b += 150;
            slider.setHeight(MorphicPreferences.prompterSliderSize);
            if (isRounded) {
                slider.action = num => {
                    entryField.changed();
                    entryField.text.text = Math.round(num).toString();
                    entryField.text.drawNew();
                    entryField.text.changed();
                    entryField.text.edit();
                };
            } else {
                slider.action = num => {
                    entryField.changed();
                    entryField.text.text = num.toString();
                    entryField.text.drawNew();
                    entryField.text.changed();
                };
            }
            menu.items.push(slider);
        }

        menu.addLine(2);
        menu.addItem('Ok', () => entryField.string());
        menu.addItem('Cancel', () => null);
        menu.isDraggable = true;
        menu.popUpAtHand(this.world());
        entryField.text.edit();
    }

    pickColor(msg: string = "", callback: () => void = null, environment: any /* TODO */ = null, defaultContents?: Color) {
        const menu = new MenuMorph(
            callback,
            msg,
            environment
        );
        const colorPicker = new ColorPickerMorph(defaultContents);
        menu.items.push(colorPicker);
        menu.addLine(2);
        menu.addItem('Ok', () => colorPicker.getChoice());
        menu.addItem('Cancel', () => null);
        menu.isDraggable = true;
        menu.popUpAtHand(this.world());
    }

    inspect(anotherObject: Morph) {
        const world: WorldMorph = this.world instanceof Function ?
                this.world() : this.root() || this.world;

        let inspector;
        let inspectee: Morph = this;

        if (anotherObject) {
            inspectee = anotherObject;
        }
        inspector = new InspectorMorph(inspectee);
        inspector.setPosition(world.hand.position());
        inspector.keepWithin(world);
        world.add(inspector);
        inspector.changed();
    }

    // Morph menus:

    contextMenu() {
        let world;

        if (this.customContextMenu) {
            return this.customContextMenu;
        }
        world = this.world instanceof Function ? this.world() : this.world;
        if (world && world.isDevMode) {
            if (this.parent === world) {
                return this.developersMenu();
            }
            return this.hierarchyMenu();
        }
        return this.userMenu() ||
            (this.parent && this.parent.userMenu());
    }

    hierarchyMenu() {
        const parents = this.allParents();
        const world = this.world instanceof Function ? this.world() : this.world;
        const menu = new MenuMorph(this, null);

        parents.forEach((each: Morph) => {
            if (each.developersMenu && (each !== world)) {
                menu.addMenu(
                    each.toString().slice(0, 50),
                    each.developersMenu()
                );
            /*
                menu.addItem(each.toString().slice(0, 50), function () {
                    each.developersMenu().popUpAtHand(world);
                });
            */
            }
        });
        return menu;
    }

    developersMenu() {
        // 'name' is not an official property of a function, hence:
        const world: WorldMorph = this.world instanceof Function ? this.world() : this.world;

        const userMenu = this.userMenu() ||
            (this.parent && (<Morph> this.parent).userMenu());

        const menu = new MenuMorph(this, this.constructor.name ||
            this.constructor.toString().split(' ')[1].split('(')[0]);

        if (userMenu) {
            menu.addMenu('user features', userMenu);
            menu.addLine();
        }
        menu.addItem(
            "color...",
            function () {
                this.pickColor(
                    menu.title + localize('\ncolor:'),
                    this.setColor,
                    this,
                    this.color
                );
            },
            'choose another color \nfor this morph'
        );
        menu.addItem(
            "transparency...",
            function () {
                this.prompt(
                    menu.title + localize('\nalpha\nvalue:'),
                    this.setAlphaScaled,
                    this,
                    (this.alpha * 100).toString(),
                    null,
                    1,
                    100,
                    true
                );
            },
            'set this morph\'s\nalpha value'
        );
        menu.addItem(
            "resize...",
            'resize',
            'show a handle\nwhich can be dragged\nto change this morph\'s' +
                ' extent'
        );
        menu.addLine();
        menu.addItem(
            "duplicate",
            function () {
                this.fullCopy().pickUp(this.world());
            },
            'make a copy\nand pick it up'
        );
        menu.addItem(
            "pick up",
            'pickUp',
            'detach and put \ninto the hand'
        );
        menu.addItem(
            "attach...",
            'attach',
            'stick this morph\nto another one'
        );
        menu.addItem(
            "move...",
            'move',
            'show a handle\nwhich can be dragged\nto move this morph'
        );
        menu.addItem(
            "inspect...",
            'inspect',
            'open a window\non all properties'
        );
        menu.addItem(
            "pic...",
            function () {
                window.open(this.fullImageClassic().toDataURL());
            },
            'open a new window\nwith a picture of this morph'
        );
        menu.addLine();
        if (this.isDraggable) {
            menu.addItem(
                "lock",
                'toggleIsDraggable',
                'make this morph\nunmovable'
            );
        } else {
            menu.addItem(
                "unlock",
                'toggleIsDraggable',
                'make this morph\nmovable'
            );
        }
        menu.addItem("hide", 'hide');
        menu.addItem("delete", 'destroy');
        if (!(this instanceof WorldMorph)) {
            menu.addLine();
            menu.addItem(
                "World...",
                () => {
                    world.contextMenu().popUpAtHand(world);
                },
                'show the\nWorld\'s menu'
            );
        }
        return menu;
    }

    userMenu(): MenuMorph {
        return null;
    }

    // Morph menu actions

    setAlphaScaled(alpha: number) {
        // for context menu demo purposes
        let newAlpha;

        let unscaled;
        if (typeof alpha === 'number') {
            unscaled = alpha / 100;
            this.alpha = Math.min(Math.max(unscaled, 0.1), 1);
        } else {
            newAlpha = parseFloat(alpha);
            if (!isNaN(newAlpha)) {
                unscaled = newAlpha / 100;
                this.alpha = Math.min(Math.max(unscaled, 0.1), 1);
            }
        }
        this.changed();
    }

    attach() {
        const choices = this.overlappedMorphs();
        const menu = new MenuMorph(this, 'choose new parent:');
        const myself = this;

        choices.forEach(each => {
            menu.addItem(each.toString().slice(0, 50), () => {
                each.add(myself);
                myself.isDraggable = false;
            });
        });
        if (choices.length > 0) {
            menu.popUpAtHand(this.world());
        }
    }

    toggleIsDraggable() {
        // for context menu demo purposes
        this.isDraggable = !this.isDraggable;
    }

    colorSetters() {
        // for context menu demo purposes
        return ['color'];
    }

    numericalSetters() {
        // for context menu demo purposes
        return [
            'setLeft',
            'setTop',
            'setWidth',
            'setHeight',
            'setAlphaScaled'
        ];
    }

    // Morph entry field tabbing:

    allEntryFields() {
        return this.allChildren().filter(each => each.isEditable &&
            (each instanceof StringMorph ||
                each instanceof TextMorph));
    }

    nextEntryField(current: Morph) {
        const fields = this.allEntryFields();
        const idx = fields.indexOf(current);
        if (idx !== -1) {
            if (fields.length > idx + 1) {
                return fields[idx + 1];
            }
        }
        return fields[0];
    }

    previousEntryField(current: Morph) {
        const fields = this.allEntryFields();
        const idx = fields.indexOf(current);
        if (idx !== -1) {
            if (idx > 0) {
                return fields[idx - 1];
            }
            return fields[fields.length - 1];
        }
        return fields[0];
    }

    tab(editField: Morph) {
    /*
        the <tab> key was pressed in one of my edit fields.
        invoke my "nextTab()" function if it exists, else
        propagate it up my owner chain.
    */
        if (this.nextTab) {
            this.nextTab(editField);
        } else if (this.parent) {
            this.parent.tab(editField);
        }
    }

    backTab(editField: Morph) {
    /*
        the <back tab> key was pressed in one of my edit fields.
        invoke my "previousTab()" function if it exists, else
        propagate it up my owner chain.
    */
        if (this.previousTab) {
            this.previousTab(editField);
        } else if (this.parent) {
            this.parent.backTab(editField);
        }
    }

    /*
        the following are examples of what the navigation methods should
        look like. Insert these at the World level for fallback, and at lower
        levels in the Morphic tree (e.g. dialog boxes) for a more fine-grained
        control over the tabbing cycle.

    Morph.prototype.nextTab = function (editField) {
        var next = this.nextEntryField(editField);
        editField.clearSelection();
        next.selectAll();
        next.edit();
    };

    Morph.prototype.previousTab = function (editField) {
        var prev = this.previousEntryField(editField);
        editField.clearSelection();
        prev.selectAll();
        prev.edit();
    };

    */

    // Morph events:

    escalateEvent(functionName: string, arg: any) {
        let handler: any = this.parent; // TODO
        while (!handler[functionName] && handler.parent !== null) {
            handler = handler.parent;
        }
        if (handler[functionName]) {
            handler[functionName](arg);
        }
    }

    // Morph eval:
    // TODO: Scope/context, etc.
    evaluateString(code: string) {
        let result;

        try {
            result = eval(code);
            this.drawNew();
            this.changed();
        } catch (err) {
            this.inform(err);
        }
        return result;
    }

    // Morph collision detection:

    isTouching(otherMorph: Morph) {
        const oImg = this.overlappingImage(otherMorph);
        let data;
        if (!oImg.width || !oImg.height) {
            return false;
        }
        data = oImg.getContext('2d')
            .getImageData(1, 1, oImg.width, oImg.height)
            .data;
        return detect(
            data,
            each => each !== 0
        ) !== null;
    }

    overlappingImage(otherMorph: Morph) {
        const fb = this.fullBounds();
        const otherFb = otherMorph.fullBounds();
        const oRect = fb.intersect(otherFb);
        const oImg = newCanvas(oRect.extent());
        const ctx = oImg.getContext('2d');
        if (oRect.width() < 1 || oRect.height() < 1) {
            return newCanvas(new Point(1, 1));
        }
        ctx.drawImage(
            this.fullImage(),
            oRect.origin.x - fb.origin.x,
            oRect.origin.y - fb.origin.y
        );
        ctx.globalCompositeOperation = 'source-in';
        ctx.drawImage(
            otherMorph.fullImage(),
            otherFb.origin.x - oRect.origin.x,
            otherFb.origin.y - oRect.origin.y
        );
        return oImg;
    }
}

Morph.prototype.trackChanges = true;
Morph.prototype.shadowBlur = 4;

Morph.prototype.step = nop;

// Morph utilities:

Morph.prototype.nop = nop;

