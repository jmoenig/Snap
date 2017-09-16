// Global Functions ////////////////////////////////////////////////////

import {MorphicPreferences} from "./settings";

export function nop(): void {
    // do explicitly nothing
}

// TODO
export function localize(string: string) {
    // override this function with custom localizations
    return string;
}

export function isNil(thing: any) {
    return thing === undefined || thing === null;
}

export function contains<T>(list: T[], element: T) {
    // answer true if element is a member of list
    return list.indexOf(element) !== -1;
}

export function detect<T>(list: T[], predicate: (thing: T) => boolean) {
    // answer the first element of list for which predicate evaluates
    // true, otherwise answer null
    const size = list.length;
    for (let i = 0; i < size; i += 1) {
        if (predicate.call(null, list[i])) {
            return list[i];
        }
    }
    return null;
}

export function sizeOf(object: any) {
    // answer the number of own properties
    let size = 0;
    for (let key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            size += 1;
        }
    }
    return size;
}

export function isString(target: any) {
    return typeof target === 'string' || target instanceof String;
}

export function isObject(target: any) {
    return target !== null &&
        (typeof target === 'object' || target instanceof Object);
}

export function radians(degrees: number) {
    return degrees * Math.PI / 180;
}

export function degrees(radians: number) {
    return radians * 180 / Math.PI;
}

export function fontHeight(height: number) {
    const minHeight = Math.max(height, MorphicPreferences.minimumFontHeight);
    return minHeight * 1.2; // assuming 1/5 font size for ascenders
}

export function isWordChar(aCharacter: string) {
    // can't use \b or \w because they ignore diacritics
    return aCharacter.match(/[A-zÀ-ÿ0-9]/);
}

export interface IPosition {
    x: number;
    y: number;
}

export function newCanvas(extentPoint: IPosition = {x: 0, y: 0}, nonRetina?: boolean): HTMLCanvasElement {
    // answer a new empty instance of Canvas, don't display anywhere
    // nonRetina - optional Boolean "false"
    // by default retina support is automatic
    const ext = extentPoint;
    const canvas = document.createElement('canvas');
    canvas.width = ext.x;
    canvas.height = ext.y;
    if (nonRetina && canvas.isRetinaEnabled) { // TODO
        canvas.isRetinaEnabled = false;
    }
    return canvas;
}

export function getMinimumFontHeight() {
    // answer the height of the smallest font renderable in pixels
    const str = 'I',
        size = 50,
        canvas = document.createElement('canvas');
    let ctx,
        maxX,
        data,
        x,
        y;
    canvas.width = size;
    canvas.height = size;
    ctx = canvas.getContext('2d');
    ctx.font = '1px serif';
    maxX = ctx.measureText(str).width;
    ctx.fillStyle = 'black';
    ctx.textBaseline = 'bottom';
    ctx.fillText(str, 0, size);
    for (y = 0; y < size; y += 1) {
        for (x = 0; x < maxX; x += 1) {
            data = ctx.getImageData(x, y, 1, 1);
            if (data.data[3] !== 0) {
                return size - y + 1;
            }
        }
    }
    return 0;
}

export function getBlurredShadowSupport() {
    // check for Chrome issue 90001
    // http://code.google.com/p/chromium/issues/detail?id=90001
    let source, target, ctx;
    source = document.createElement('canvas');
    source.width = 10;
    source.height = 10;
    ctx = source.getContext('2d');
    ctx.fillStyle = 'rgb(255, 0, 0)';
    ctx.beginPath();
    ctx.arc(5, 5, 5, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    target = document.createElement('canvas');
    target.width = 10;
    target.height = 10;
    ctx = target.getContext('2d');
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(0, 0, 255, 1)';
    ctx.drawImage(source, 0, 0);
    return !!ctx.getImageData(0, 0, 1, 1).data[3];
}

export function getDocumentPositionOf(aDOMelement: HTMLElement) {
    // answer the absolute coordinates of a DOM element in the document
    let pos: IPosition, offsetParent: HTMLElement;
    if (aDOMelement === null) {
        return {x: 0, y: 0};
    }
    pos = {x: aDOMelement.offsetLeft, y: aDOMelement.offsetTop};
    offsetParent = <HTMLElement> aDOMelement.offsetParent;
    while (offsetParent !== null) {
        pos.x += offsetParent.offsetLeft;
        pos.y += offsetParent.offsetTop;
        if (offsetParent !== document.body &&
                offsetParent !== document.documentElement) {
            pos.x -= offsetParent.scrollLeft;
            pos.y -= offsetParent.scrollTop;
        }
        offsetParent = <HTMLElement> offsetParent.offsetParent;
    }
    return pos;
}

export function copy<T>(target: T): T {
    // answer a shallow copy of target
    let c: any;

    if (typeof target !== 'object') {
        return target;
    }
    let value = target.valueOf();
    if (target !== value) {
        return new (<any> target.constructor)(value); // TODO
    }
    if (target instanceof target.constructor &&
            target.constructor !== Object) {
        c = Object.create(target.constructor.prototype);
        const keys = Object.keys(target);
        for (let l = keys.length, i = 0; i < l; i += 1) {
            const property = keys[i];
            c[property] = (<any> target)[property];
        }
    } else {
        c = {};
        for (let property in target) {
            c[property] = target[property];
        }
    }
    return c;
}

// Retina Display Support //////////////////////////////////////////////

/*
    By default retina support gets installed when Morphic.js loads. There
    are two global functions that let you test for retina availability:

        isRetinaSupported() - Boolean, whether retina support is available
        isRetinaEnabled()   - Boolean, whether currently in retina mode

    and two more functions that let you control retina support if it is
    available:

        enableRetinaSupport()
        disableRetinaSupport()

    Both of these internally test whether retina is available, so they are
    safe to call directly.

    Even when in retina mode it often makes sense to use non-high-resolution
    canvasses for simple shapes in order to save system resources and
    optimize performance. Examples are costumes and backgrounds in Snap.
    In Morphic you can create new canvas elements using
    
        newCanvas(extentPoint [, nonRetinaFlag])

    If retina support is enabled such new canvasses will automatically be
    high-resolution canvasses, unless the newCanvas() function is given an
    otherwise optional second Boolean <true> argument that explicitly makes
    it a non-retina canvas.

    Not the whole canvas API is supported by Morphic's retina utilities.
    Especially if your code uses putImageData() you will want to "downgrade"
    a target high-resolution canvas to a normal-resolution ("non-retina")
    one before using

        normalizeCanvas(aCanvas [, copyFlag])

    This will change the target canvas' resolution in place (!). If you
    pass in the optional second Boolean <true> flag the function returns
    a non-retina copy and leaves the target canvas unchanged. An example
    of this normalize mechanism is converting the penTrails layer of Snap's
    stage (high-resolution) into a sprite-costume (normal resolution).
*/

// TODO: Rewrite!
export function enableRetinaSupport() {
/*
    === contributed by Bartosz Leper ===

    This installs a series of utilities that allow using Canvas the same way
    on retina and non-retina displays. If the display is a retina one, the
    underlying dimensions of the Canvas elements are doubled, but this will
    be transparent to the code that uses Canvas. All dimensions read or
    written to the Canvas element will be scaled appropriately.

    NOTE: This implementation is not exhaustive; it only implements what is
    needed by the Snap! UI.
    
    [Jens]: like all other retina screen support implementations I've seen
    Bartosz's patch also does not address putImageData() compatibility when
    mixing retina-enabled and non-retina canvasses. If you need to manipulate
    pixels in such mixed canvasses, make sure to "downgrade" them all using
    normalizeCanvas() below.
*/

    // Get the window's pixel ratio for canvas elements.
    // See: http://www.html5rocks.com/en/tutorials/canvas/hidpi/
    const ctx = document.createElement("canvas").getContext("2d"),
        backingStorePixelRatio = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1,

        // Unfortunately, it's really hard to make this work well when changing
        // zoom level, so let's leave it like this right now, and stick to
        // whatever the ratio was in the beginning.

        // originalDevicePixelRatio = window.devicePixelRatio,

        // [Jens]: As of summer 2016 non-integer devicePixelRatios lead to
        // artifacts when blitting images onto canvas elements in all browsers
        // except Chrome, especially Firefox, Edge, IE (Safari doesn't even
        // support retina mode as implemented here).
        // therefore - to ensure crisp fonts - use the ceiling of whatever
        // the devicePixelRatio is. This needs more memory, but looks nicer.

        originalDevicePixelRatio = Math.ceil(window.devicePixelRatio),

        canvasProto = HTMLCanvasElement.prototype,
        contextProto = CanvasRenderingContext2D.prototype,

        // [Jens]: keep track of original properties in a dictionary
        // so they can be iterated over and restored
        uber = {
            drawImage: contextProto.drawImage,
            getImageData: contextProto.getImageData,

            width: Object.getOwnPropertyDescriptor(
                canvasProto,
                'width'
            ),
            height: Object.getOwnPropertyDescriptor(
                canvasProto,
                'height'
            ),
            shadowOffsetX: Object.getOwnPropertyDescriptor(
                contextProto,
                'shadowOffsetX'
            ),
            shadowOffsetY: Object.getOwnPropertyDescriptor(
                contextProto,
                'shadowOffsetY'
            ),
            shadowBlur: Object.getOwnPropertyDescriptor(
                contextProto,
                'shadowBlur'
            )
        };

    // [Jens]: only install retina utilities if the display supports them
    if (backingStorePixelRatio === originalDevicePixelRatio) {return; }
    // [Jens]: check whether properties can be overridden, needed for Safari
    if (Object.keys(uber).some(function (any) {
            const prop = uber[any];
            return prop.hasOwnProperty('configurable') && (!prop.configurable);
    })) {return; }

    function getPixelRatio(imageSource) {
        return imageSource.isRetinaEnabled ?
            (originalDevicePixelRatio || 1) / backingStorePixelRatio : 1;
    }

    canvasProto._isRetinaEnabled = true;
    // [Jens]: remember the original non-retina properties,
    // so they can be restored again
    canvasProto._bak = uber;

    Object.defineProperty(canvasProto, 'isRetinaEnabled', {
        get: function() {
            return this._isRetinaEnabled;
        },
        set: function(enabled) {
            const prevPixelRatio = getPixelRatio(this),
                prevWidth = this.width,
                prevHeight = this.height;

            this._isRetinaEnabled = enabled;
            if (getPixelRatio(this) != prevPixelRatio) {
                this.width = prevWidth;
                this.height = prevHeight;
            }
        },
        configurable: true // [Jens]: allow to be deleted an reconfigured
    });

    Object.defineProperty(canvasProto, 'width', {
        get: function() {
            return uber.width.get.call(this) / getPixelRatio(this);
        },
        set: function(width) {
            try { // workaround one of FF's dreaded NS_ERROR_FAILURE bugs
                // this should be taken out as soon as FF gets fixed again
                const pixelRatio = getPixelRatio(this);
                let context;
                uber.width.set.call(this, width * pixelRatio);
                context = this.getContext('2d');
                context.restore();
                context.save();
                context.scale(pixelRatio, pixelRatio);
            } catch (err) {
                console.log('Retina Display Support Problem', err);
                uber.width.set.call(this, width);
            }
        }
    });

    Object.defineProperty(canvasProto, 'height', {
        get: function() {
            return uber.height.get.call(this) / getPixelRatio(this);
        },
        set: function(height) {
            const pixelRatio = getPixelRatio(this);
            let context;
            uber.height.set.call(this, height * pixelRatio);
            context = this.getContext('2d');
            context.restore();
            context.save();
            context.scale(pixelRatio, pixelRatio);
        }
    });

    contextProto.drawImage = function(image) {
        const pixelRatio = getPixelRatio(image);
        let sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight;

        // Different signatures of drawImage() method have different
        // parameter assignments.
        switch (arguments.length) {
            case 9:
                sx = arguments[1];
                sy = arguments[2];
                sWidth = arguments[3];
                sHeight = arguments[4];
                dx = arguments[5];
                dy = arguments[6];
                dWidth = arguments[7];
                dHeight = arguments[8];
                break;

            case 5:
                sx = 0;
                sy = 0;
                sWidth = image.width;
                sHeight = image.height;
                dx = arguments[1];
                dy = arguments[2];
                dWidth = arguments[3];
                dHeight = arguments[4];
                break;

            case 3:
                sx = 0;
                sy = 0;
                sWidth = image.width;
                sHeight = image.height;
                dx = arguments[1];
                dy = arguments[2];
                dWidth = image.width;
                dHeight = image.height;
                break;

            default:
                throw Error('Called drawImage() with ' + arguments.length +
                        ' arguments');
        }
        uber.drawImage.call(
                this, image,
                sx * pixelRatio, sy * pixelRatio,
                sWidth * pixelRatio, sHeight * pixelRatio,
                dx, dy,
                dWidth, dHeight);
    };

    contextProto.getImageData = function(sx, sy, sw, sh) {
        const pixelRatio = getPixelRatio(this.canvas);
        return uber.getImageData.call(
                this,
                sx * pixelRatio, sy * pixelRatio,
                sw * pixelRatio, sh * pixelRatio);
    };

    Object.defineProperty(contextProto, 'shadowOffsetX', {
        get: function() {
            return uber.shadowOffsetX.get.call(this) /
                getPixelRatio(this.canvas);
        },
        set: function(offset) {
            const pixelRatio = getPixelRatio(this.canvas);
            uber.shadowOffsetX.set.call(this, offset * pixelRatio);
        }
    });

    Object.defineProperty(contextProto, 'shadowOffsetY', {
        get: function() {
            return uber.shadowOffsetY.get.call(this) /
                getPixelRatio(this.canvas);
        },
        set: function(offset) {
            const pixelRatio = getPixelRatio(this.canvas);
            uber.shadowOffsetY.set.call(this, offset * pixelRatio);
        }
    });

    Object.defineProperty(contextProto, 'shadowBlur', {
        get: function() {
            return uber.shadowBlur.get.call(this) /
                getPixelRatio(this.canvas);
        },
        set: function(blur) {
            const pixelRatio = getPixelRatio(this.canvas);
            uber.shadowBlur.set.call(this, blur * pixelRatio);
        }
    });
}

export function isRetinaSupported () {
    const ctx = document.createElement("canvas").getContext("2d"),
        backingStorePixelRatio = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1,
        canvasProto = HTMLCanvasElement.prototype,
        contextProto = CanvasRenderingContext2D.prototype,
        uber = {
            drawImage: contextProto.drawImage,
            getImageData: contextProto.getImageData,

            width: Object.getOwnPropertyDescriptor(
                canvasProto,
                'width'
            ),
            height: Object.getOwnPropertyDescriptor(
                canvasProto,
                'height'
            ),
            shadowOffsetX: Object.getOwnPropertyDescriptor(
                contextProto,
                'shadowOffsetX'
            ),
            shadowOffsetY: Object.getOwnPropertyDescriptor(
                contextProto,
                'shadowOffsetY'
            ),
            shadowBlur: Object.getOwnPropertyDescriptor(
                contextProto,
                'shadowBlur'
            )
        };
    return backingStorePixelRatio !== window.devicePixelRatio &&
        !(Object.keys(uber).some(function (any) {
                const prop = uber[any];
                return prop.hasOwnProperty('configurable') && (!prop.configurable);
        })
    );
}

export function isRetinaEnabled () {
    return HTMLCanvasElement.prototype.hasOwnProperty('_isRetinaEnabled');
}

export function disableRetinaSupport() {
    // uninstalls Retina utilities. Make sure to re-create every Canvas
    // element afterwards
    let canvasProto, contextProto, uber;
    if (!isRetinaEnabled()) {return; }
    canvasProto = HTMLCanvasElement.prototype;
    contextProto = CanvasRenderingContext2D.prototype;
    uber = canvasProto._bak;
    Object.defineProperty(canvasProto, 'width', uber.width);
    Object.defineProperty(canvasProto, 'height', uber.height);
    contextProto.drawImage = uber.drawImage;
    contextProto.getImageData = uber.getImageData;
    Object.defineProperty(contextProto, 'shadowOffsetX', uber.shadowOffsetX);
    Object.defineProperty(contextProto, 'shadowOffsetY', uber.shadowOffsetY);
    Object.defineProperty(contextProto, 'shadowBlur', uber.shadowBlur);
    delete canvasProto._isRetinaEnabled;
    delete canvasProto.isRetinaEnabled;
    delete canvasProto._bak;
}

export function normalizeCanvas(aCanvas, getCopy) {
    // make sure aCanvas is non-retina, otherwise convert it in place (!)
    // or answer a normalized copy if the "getCopy" flag is <true>
    let cpy;
    if (!aCanvas.isRetinaEnabled) {return aCanvas; }
    cpy = newCanvas(new Point(aCanvas.width, aCanvas.height), true);
    cpy.getContext('2d').drawImage(aCanvas, 0, 0);
    if (getCopy) {return cpy; }
    aCanvas.isRetinaEnabled = false;
    aCanvas.width = cpy.width;
    aCanvas.height = cpy.height;
    aCanvas.getContext('2d').drawImage(cpy, 0, 0);
    return aCanvas;
}
