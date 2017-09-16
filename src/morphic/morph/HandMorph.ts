// HandMorph ///////////////////////////////////////////////////////////

// I represent the Mouse cursor

import Morph, {ISituation} from "./Morph"
import Rectangle from "../Rectangle";
import Point from "../Point";
import WorldMorph from "./WorldMorph";
import {contains, nop, getDocumentPositionOf, newCanvas} from "../util";
import {MorphicPreferences} from "../settings";
import ScrollFrameMorph from "./ScrollFrameMorph";

// HandMorph instance creation:

export default class HandMorph extends Morph {
    public _world: WorldMorph;

    world(): WorldMorph {
        return this._world;
    }

    public mouseButton: "left" | "right" | "middle" = null;
    public mouseOverList: Morph[] = [];
    public morphToGrab: Morph = null;
    public grabPosition: Point = null;
    public grabOrigin: ISituation = null;
    public temporaries: Morph[] = [];
    public touchHoldTimeout: number = null;
    public contextMenuEnabled = false;

    constructor(aWorld: WorldMorph) {
        super(true);

        this.bounds = new Rectangle();

        // additional properties:
        this._world = aWorld;
    }

    // HandMorph initialization:


    changed() {
        let b;
        if (this._world !== null) {
            b = this.fullBounds();
            if (!b.extent().eq(new Point())) {
                this._world.broken.push(b.spread());
            }
        }
    }

    // HandMorph navigation:

    morphAtPointer() {
        return this._world.topMorphAt(this.bounds.origin) || this._world;
    }

    allMorphsAtPointer() {
        const morphs = this._world.allChildren();
        const myself = this;
        return morphs.filter((m: Morph) => m.isVisible &&
            m.visibleBounds().containsPoint(myself.bounds.origin));
    }

    // HandMorph dragging and dropping:
    /*
        drag 'n' drop events, method(arg) -> receiver:

            prepareToBeGrabbed(handMorph) -> grabTarget
            reactToGrabOf(grabbedMorph) -> oldParent
            wantsDropOf(morphToDrop) ->  newParent
            justDropped(handMorph) -> droppedMorph
            reactToDropOf(droppedMorph, handMorph) -> newParent
    */

    dropTargetFor(aMorph: Morph) {
        let target = this.morphAtPointer();
        while (!target.wantsDropOf(aMorph)) {
            target = target.parent;
        }
        return target;
    }

    grab(aMorph: Morph) {
        const oldParent = aMorph.parent;
        if (aMorph instanceof WorldMorph) {
            return;
        }
        if (this.children.length === 0) {
            this._world.stopEditing();
            this.grabOrigin = aMorph.situation();
            aMorph.addShadow();
            if (aMorph.prepareToBeGrabbed) {
                aMorph.prepareToBeGrabbed(this);
            }
            aMorph.cachedFullImage = aMorph.fullImageClassic();
            aMorph.cachedFullBounds = aMorph.fullBounds();
            this.add(aMorph);
            this.changed();
            if (oldParent && oldParent.reactToGrabOf) {
                oldParent.reactToGrabOf(aMorph);
            }
        }
    }

    drop() {
        let target;
        let morphToDrop;
        if (this.children.length !== 0) {
            morphToDrop = this.children[0];
            target = this.dropTargetFor(morphToDrop);
            target = target.selectForEdit ? target.selectForEdit() : target;
            this.changed();
            target.add(morphToDrop);
            morphToDrop.cachedFullImage = null;
            morphToDrop.cachedFullBounds = null;
            morphToDrop.changed();
            morphToDrop.removeShadow();
            this.children = [];
            this.setExtent(new Point());
            if (morphToDrop.justDropped) {
                morphToDrop.justDropped(this);
            }
            if (target.reactToDropOf) {
                target.reactToDropOf(morphToDrop, this);
            }
        }
    }

    // HandMorph event dispatching:
    /*
        mouse events:

            mouseDownLeft
            mouseDownRight
            mouseClickLeft
            mouseClickRight
            mouseDoubleClick
            mouseEnter
            mouseLeave
            mouseEnterDragging
            mouseLeaveDragging
            mouseMove
            mouseScroll
    */

    processMouseDown(event: MouseEvent) {
        this.destroyTemporaries();
        this.contextMenuEnabled = true;
        this.morphToGrab = null;
        this.grabPosition = null;
        if (this.children.length !== 0) {
            this.drop();
            this.mouseButton = null;
        } else {
            const morph = this.morphAtPointer();
            if (this._world.activeMenu) {
                if (!contains(
                        morph.allParents(),
                        this._world.activeMenu
                    )) {
                    this._world.activeMenu.destroy();
                } else {
                    clearInterval(this.touchHoldTimeout);
                }
            }
            if (this._world.activeHandle) {
                if (morph !== this._world.activeHandle) {
                    this._world.activeHandle.destroy();
                }
            }
            if (this._world.cursor) {
                if (morph !== this._world.cursor.target) {
                    this._world.stopEditing();
                }
            }
            if (!morph.mouseMove) {
                this.morphToGrab = morph.rootForGrab();
                this.grabPosition = this.bounds.origin.copy();
            }
            let actualClick: string;
            if (event.button === 2 || event.ctrlKey) {
                this.mouseButton = 'right';
                actualClick = 'mouseDownRight';
            } else {
                this.mouseButton = 'left';
                actualClick = 'mouseDownLeft';
            }
            while (!morph[actualClick]) { // TODO
                morph = morph.parent;
            }
            morph[actualClick](this.bounds.origin);
        }
    }

    processTouchStart(event: TouchEvent) {
        const myself = this;
        MorphicPreferences.isTouchDevice = true;
        clearInterval(this.touchHoldTimeout);
        if (event.touches.length === 1) {
            this.touchHoldTimeout = setInterval( // simulate mouseRightClick
                () => {
                    myself.processMouseDown({button: 2});
                    myself.processMouseUp({button: 2}); // TODO: ???
                    event.preventDefault();
                    clearInterval(myself.touchHoldTimeout);
                },
                400
            );
            this.processMouseMove(event.touches[0]); // update my position
            this.processMouseDown({button: 0});
            event.preventDefault();
        }
    }

    processTouchMove(event: TouchEvent) {
        MorphicPreferences.isTouchDevice = true;
        if (event.touches.length === 1) {
            const touch = event.touches[0];
            this.processMouseMove(touch);
            clearInterval(this.touchHoldTimeout);
        }
    }

    processTouchEnd(event: TouchEvent) {
        MorphicPreferences.isTouchDevice = true;
        clearInterval(this.touchHoldTimeout);
        // nop(event);
        this.processMouseUp({button: 0}); // TODO: ???
    }

    processMouseUp() {
        let morph = this.morphAtPointer();
        let context;
        let contextMenu;
        let expectedClick;

        this.destroyTemporaries();
        if (this.children.length !== 0) {
            this.drop();
        } else {
            if (this.mouseButton === 'left') {
                expectedClick = 'mouseClickLeft';
            } else {
                expectedClick = 'mouseClickRight';
                if (this.mouseButton && this.contextMenuEnabled) {
                    context = morph;
                    contextMenu = context.contextMenu();
                    while ((!contextMenu) &&
                    context.parent) {
                        context = context.parent;
                        contextMenu = context.contextMenu();
                    }
                    if (contextMenu) {
                        contextMenu.popUpAtHand(this._world);
                    }
                }
            }
            while (!morph[expectedClick]) {
                morph = morph.parent;
            }
            morph[expectedClick](this.bounds.origin);
        }
        this.mouseButton = null;
    }

    processDoubleClick() {
        let morph = this.morphAtPointer();

        this.destroyTemporaries();
        if (this.children.length !== 0) {
            this.drop();
        } else {
            while (morph && !morph.mouseDoubleClick) {
                morph = morph.parent;
            }
            if (morph) {
                morph.mouseDoubleClick(this.bounds.origin);
            }
        }
        this.mouseButton = null;
    }

    processMouseMove(event: MouseEvent) {
        let pos;
        const posInDocument = getDocumentPositionOf(this._world.worldCanvas);
        const myself = this;

        pos = new Point(
            event.pageX - posInDocument.x,
            event.pageY - posInDocument.y
        );

        this.setPosition(pos);

        // determine the new mouse-over-list:
        // mouseOverNew = this.allMorphsAtPointer();
        const mouseOverNew = this.morphAtPointer().allParents();

        if (!this.children.length && this.mouseButton) {
            const topMorph = this.morphAtPointer();
            const morph = topMorph.rootForGrab();
            if (topMorph.mouseMove) {
                topMorph.mouseMove(pos, this.mouseButton);
                if (this.mouseButton === 'right') {
                    this.contextMenuEnabled = false;
                }
            }

            // if a morph is marked for grabbing, just grab it
            if (this.mouseButton === 'left' &&
                this.morphToGrab &&
                (this.grabPosition.distanceTo(this.bounds.origin) >
                    MorphicPreferences.grabThreshold)) {
                this.setPosition(this.grabPosition);
                if (this.morphToGrab.isDraggable) {
                    morph = this.morphToGrab.selectForEdit ?
                        this.morphToGrab.selectForEdit() : this.morphToGrab;
                    this.grab(morph);
                } else if (this.morphToGrab.isTemplate) {
                    morph = this.morphToGrab.fullCopy();
                    morph.isTemplate = false;
                    morph.isDraggable = true;
                    if (morph.reactToTemplateCopy) {
                        morph.reactToTemplateCopy();
                    }
                    this.grab(morph);
                    this.grabOrigin = this.morphToGrab.situation();
                }
                this.setPosition(pos);
            }
        }

        this.mouseOverList.forEach(old => {
            if (!contains(mouseOverNew, old)) {
                if (old.mouseLeave) {
                    old.mouseLeave();
                }
                if (old.mouseLeaveDragging && myself.mouseButton) {
                    old.mouseLeaveDragging();
                }
            }
        });
        mouseOverNew.forEach(newMorph => {
            if (!contains(myself.mouseOverList, newMorph)) {
                if (newMorph.mouseEnter) {
                    newMorph.mouseEnter();
                }
                if (newMorph.mouseEnterDragging && myself.mouseButton) {
                    newMorph.mouseEnterDragging();
                }
            }

            // autoScrolling support:
            if (myself.children.length > 0) {
                if (newMorph instanceof ScrollFrameMorph &&
                    newMorph.enableAutoScrolling &&
                    newMorph.contents.allChildren().some(any => any.wantsDropOf(myself.children[0]))
                ) {
                    if (!newMorph.bounds.insetBy(
                            MorphicPreferences.scrollBarSize * 3
                        ).containsPoint(myself.bounds.origin)) {
                        newMorph.startAutoScrolling();
                    }
                }
            }
        });
        this.mouseOverList = mouseOverNew;
    }

    processMouseScroll(event: MouseEvent) {
        let morph = this.morphAtPointer();
        while (morph && !morph.mouseScroll) {
            morph = morph.parent;
        }
        if (morph) {
            morph.mouseScroll(
                (event.detail / -3) || (
                    Object.prototype.hasOwnProperty.call(
                        event,
                        'wheelDeltaY'
                    ) ?
                        event.wheelDeltaY / 120 :
                        event.wheelDelta / 120
                ),
                event.wheelDeltaX / 120 || 0
            );
        }
    }

    /*
        drop event:

            droppedImage
            droppedSVG
            droppedAudio
            droppedText
    */

    processDrop(event: DragEvent) {
        /*
            find out whether an external image or audio file was dropped
            onto the world canvas, turn it into an offscreen canvas or audio
            element and dispatch the

                droppedImage(canvas, name)
                droppedSVG(image, name)
                droppedAudio(audio, name)

            events to interested Morphs at the mouse pointer
        */
        const files = event instanceof FileList ? event
            : (<any> event.target).files || event.dataTransfer.files;

        let file;

        const url = event.dataTransfer ?
            event.dataTransfer.getData('URL') : null;

        const txt = event.dataTransfer ?
            event.dataTransfer.getData('Text/HTML') : null;

        let suffix;
        let src;
        let target = this.morphAtPointer();
        let img = new Image();
        let canvas;

        function readSVG(aFile: File) {
            const pic = new Image();
            let frd = new FileReader();
            while (!target.droppedSVG) {
                target = target.parent;
            }
            pic.onload = () => {
                target.droppedSVG(pic, aFile.name);
            };
            frd = new FileReader();
            frd.onloadend = e => {
                pic.src = e.target.result;
            };
            frd.readAsDataURL(aFile);
        }

        function readImage(aFile: File) {
            const pic = new Image();
            let frd = new FileReader();
            while (!target.droppedImage) {
                target = target.parent;
            }
            pic.onload = () => {
                canvas = newCanvas(new Point(pic.width, pic.height), true);
                canvas.getContext('2d').drawImage(pic, 0, 0);
                target.droppedImage(canvas, aFile.name);
            };
            frd = new FileReader();
            frd.onloadend = e => {
                pic.src = e.target.result;
            };
            frd.readAsDataURL(aFile);
        }

        function readAudio(aFile: File) {
            const snd = new Audio();
            const frd = new FileReader();
            while (!target.droppedAudio) {
                target = target.parent;
            }
            frd.onloadend = e => {
                snd.src = e.target.result;
                target.droppedAudio(snd, aFile.name);
            };
            frd.readAsDataURL(aFile);
        }

        function readText(aFile: File) {
            const frd = new FileReader();
            while (!target.droppedText) {
                target = target.parent;
            }
            frd.onloadend = e => {
                target.droppedText(e.target.result, aFile.name);
            };
            frd.readAsText(aFile);
        }

        function readBinary(aFile: File) {
            const frd = new FileReader();
            while (!target.droppedBinary) {
                target = target.parent;
            }
            frd.onloadend = e => {
                target.droppedBinary(e.target.result, aFile.name);
            };
            frd.readAsArrayBuffer(aFile);
        }

        function readURL(url: string, callback: (response: string) => void) {
            const request = new XMLHttpRequest();
            request.open('GET', url);
            request.onreadystatechange = () => {
                if (request.readyState === 4) {
                    if (request.responseText) {
                        callback(request.responseText);
                    } else {
                        throw new Error(`unable to retrieve ${url}`);
                    }
                }
            };
            request.send();
        }

        function parseImgURL(html: string) {
            let iurl = '';
            let idx;
            let c;
            let start = html.indexOf('<img src="');
            if (start === -1) {return null; }
            start += 10;
            for (idx = start; idx < html.length; idx += 1) {
                c = html[idx];
                if (c === '"') {
                    return iurl;
                }
                iurl = iurl.concat(c);
            }
            return null;
        }

        if (files.length > 0) {
            for (let i = 0; i < files.length; i += 1) {
                file = files[i];
                if (file.type.includes("svg")
                    && !MorphicPreferences.rasterizeSVGs) {
                    readSVG(file);
                } else if (file.type.indexOf("image") === 0) {
                    readImage(file);
                } else if (file.type.indexOf("audio") === 0) {
                    readAudio(file);
                } else if (file.type.indexOf("text") === 0) {
                    readText(file);
                } else { // assume it's meant to be binary
                    readBinary(file);
                }
            }
        } else if (url) {
            suffix = url.slice(url.lastIndexOf('.') + 1).toLowerCase();
            if (
                contains(
                    ['gif', 'png', 'jpg', 'jpeg', 'bmp'],
                    suffix
                )
            ) {
                while (!target.droppedImage) {
                    target = target.parent;
                }
                img = new Image();
                img.onload = () => {
                    canvas = newCanvas(new Point(img.width, img.height), true);
                    canvas.getContext('2d').drawImage(img, 0, 0);
                    target.droppedImage(canvas);
                };
                img.src = url;
            } else if (suffix === 'svg' && !MorphicPreferences.rasterizeSVGs) {
                while (!target.droppedSVG) {
                    target = target.parent;
                }
                readURL(
                    url,
                    txt => {
                        const pic = new Image();
                        pic.onload = () => {
                            target.droppedSVG(
                                pic,
                                url.slice(
                                    url.lastIndexOf('/') + 1,
                                    url.lastIndexOf('.')
                                )
                            );
                        };
                        pic.src = `data:image/svg+xml;utf8,${encodeURIComponent(txt)}`;
                    }
                );
            }
        } else if (txt) {
            while (!target.droppedImage) {
                target = target.parent;
            }
            img = new Image();
            img.onload = () => {
                canvas = newCanvas(new Point(img.width, img.height), true);
                canvas.getContext('2d').drawImage(img, 0, 0);
                target.droppedImage(canvas);
            };
            src = parseImgURL(txt);
            if (src) {img.src = src; }
        }
    }

    // HandMorph tools

    destroyTemporaries() {
        /*
            temporaries are just an array of morphs which will be deleted upon
            the next mouse click, or whenever another temporary Morph decides
            that it needs to remove them. The primary purpose of temporaries is
            to display tools tips of speech bubble help.
        */
        const myself = this;
        this.temporaries.forEach(morph => {
            if (!(morph.isClickable
                    && morph.bounds.containsPoint(myself.position()))) {
                morph.destroy();
                myself.temporaries.splice(myself.temporaries.indexOf(morph), 1);
            }
        });
    }
}

HandMorph.prototype.fullChanged = HandMorph.prototype.changed;