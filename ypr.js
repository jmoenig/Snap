/*

Copyright 2012 Nathan Dinsmore

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

var sb = (function (sb) {
    'use strict';
    
    function extend(o, p) {
        var key;
        for (key in p) if (p.hasOwnProperty(key)) {
            o[key] = p[key];
        }
    }
    sb.$extend = extend;

    extend((sb.Ref = function (id) {
        this.id = id;
    }).prototype, {
        isRef: true
    });

    extend((sb.Dictionary = function (keys, values) {
        this.keys = keys;
        this.values = values;
    }).prototype, {
        get: function (key) {
            return this.values[this.keys.indexOf(key)];
        },
        set: function (key, value) {
            var i = this.keys.indexOf(key);
            if (i === -1) {
                this.keys.push(key);
                this.values.push(value);
            } else {
                this.values[i] = value;
            }
        }
    });

    sb.Color = function (rgb, a) {
        this.r = (rgb / 0x100000 | 0) % 0x400 / (0x400 - 1);
        this.g = (rgb / 0x400 | 0) % 0x400 / (0x400 - 1);
        this.b = (rgb % 0x400) / (0x400 - 1);
        this.a = a / (0x100 - 1);
    };
    sb.Point = function (x, y) {
        this.x = x;
        this.y = y;
    };
    sb.Rectangle = function (x, y, x2, y2) {
        this.origin = new sb.Point(x, y);
        this.corner = new sb.Point(x2, y2);
    };

    sb.indexedColors = [
        [1, 1, 1, 1],
        [0, 0, 0, 1],
        [1, 1, 1, 1],
        [.5, .5, .5, 1],
        [1, 0, 0, 1],
        [0, 1, 0, 1],
        [0, 0, 1, 1],
        [0, 1, 1, 1],
        [1, 1, 0, 1],
        [1, 0, 1, 1],
        [.125, .125, .125, 1],
        [.25, .25, .25, 1],
        [.375, .375, .375, 1],
        [.625, .625, .625, 1],
        [.75, .75, .75, 1],
        [.875, .875, .875, 1]
    ];
    (function () {
        var i, r, g, b, grayVal;
        for (i = 1; i <= 31; ++i) {
            if (i % 4 != 0) {
                grayVal = i / 32;
                sb.indexedColors[i + 15] = [grayVal, grayVal, grayVal, 1];
            }
        }
        for (r = 0; r < 6; ++r) {
            for (g = 0; g < 6; ++g) {
                for (b = 0; b < 6; ++b) {
                    i = 40 + 36 * r + 6 * b + g;
                    sb.indexedColors[i] = [r / 5, g / 5, b / 5, 1];
                }
            }
        }
    })();

    sb.colorDepthLengths = {
        1: 1,
        2: 2,
        4: 4,
        8: 8,
        15: 5,
        16: 5,
        12: 4,
        9: 3
    };
    extend((sb.ColorStream = function (bitmap, depth) {
        var i = 0,
            l = bitmap.length,
            b = this.bits = [],
            n;
        this.length = sb.colorDepthLengths[this.depth = depth];
        this.position = 0;
        while (i < l) {
            n = bitmap[i++];
            b.push(n / 0x80 & 1);
            b.push(n / 0x40 & 1);
            b.push(n / 0x20 & 1);
            b.push(n / 0x10 & 1);
            b.push(n / 0x8 & 1);
            b.push(n / 0x4 & 1);
            b.push(n / 0x2 & 1);
            b.push(n & 1);
        }
    }).prototype, {
        read: function () {
            var i = this.length,
                b = this.bits,
                n = 0;
            while (i--) {
                n = n * 2 + b[this.position++];
            }
            return n;
        }
    });

    extend((sb.ColorStreamIndexed = function (bitmap, depth) {
        sb.ColorStream.call(this, bitmap, depth);
    }).prototype = Object.create(sb.ColorStream.prototype), {
        next: function (b) {
            var c = sb.indexedColors[this.read()];
            if (!c) return c;
            b[0] = c[0];
            b[1] = c[1];
            b[2] = c[2];
            b[3] = c[3];
        }
    });

    extend((sb.ColorStreamRGB = function (bitmap, depth) {
        sb.ColorStream.call(this, bitmap, depth);
        this.max = Math.pow(2, this.length) - 1;
    }).prototype = Object.create(sb.ColorStream.prototype), {
        next: function (b) {
            var c;
            switch (this.depth) {
            case 16:
                ++this.position;
                c = [this.read() / this.max, this.read() / this.max, this.read() / this.max, 1];
                if (c[0] + c[1] + c[2] === 0) {
                    return b[0] = b[1] = b[2] = b[3] = 0;
                }
                b[0] = c[0];
                b[1] = c[1];
                b[2] = c[2];
                b[3] = c[3];
                return;
            case 12:
                this.position += 3;
                break;
            }
            b[0] = this.read() / this.max;
            b[1] = this.read() / this.max;
            b[2] = this.read() / this.max;
            b[3] = 1;
        }
    });

    extend((sb.ColorStream32 = function (bitmap, depth) {
        this.bytes = bitmap;
        if (depth === 32) {
            this.next = this.nextAlpha;
        }
        this.position = 0;
    }).prototype, {
        next: function (b) {
            b[0] = this.read() / 255;
            b[1] = this.read() / 255;
            b[2] = this.read() / 255;
            b[3] = 1;
        },
        nextAlpha: function (b) {
            var a = this.read() / 255;
            b[0] = this.read() / 255;
            b[1] = this.read() / 255;
            b[2] = this.read() / 255
            b[3] = a;
        },
        read: function () {
            return this.bytes[this.position++];
        }
    });

    sb.colorStreams = {
        1: sb.ColorStreamIndexed,
        2: sb.ColorStreamIndexed,
        4: sb.ColorStreamIndexed,
        8: sb.ColorStreamIndexed,
        15: sb.ColorStreamRGB,
        16: sb.ColorStreamRGB,
        32: sb.ColorStream32,
        24: sb.ColorStream32,
        12: sb.ColorStreamRGB,
        9: sb.ColorStreamRGB
    };

    sb.getColorStream = function (bitmap, depth) {
        return new sb.colorStreams[depth](bitmap, depth);
    };

    extend((sb.Form = function (w, h, d, o, b) {
        this.width = w;
        this.height = h;
        this.depth = d;
        this.offset = o;
        this.bits = b;
    }).prototype, {
        init: function (bm) {
            if (this.bits.isBitmap) {
                this.bitmap = this.bits;
            } else {
                this.decompress(bm);
            }
            this.image = document.createElement('canvas');
            this.image.width = this.width;
            this.image.height = this.height;
        },
        decompress: function (bm) {
            var b = this.bits,
                p = 0,
                q = 0,
                r = !!bm,
                length = (i = b[p++], i <= 223 ? i : i < 255 ? (i - 224) * 256 + b[p++] : (b[p++] << 24) + (b[p++] << 16) + (b[p++] << 8) + b[p++]),
                bm, i, n, d, e, f, g;
            // stream = new sb.Reader().on(this.bits),
            this.bitmap = bm || (bm = []);
            while (p < b.length) {
                i = b[p++];
                if (i > 223) {
                    i = i < 255 ? (i - 224) * 256 + b[p++] : (b[p++] << 24) + (b[p++] << 16) + (b[p++] << 8) + b[p++];
                }
                n = i >> 2;
                switch (i & 3) {
                case 1:
                    d = b[p++];
                    n *= 4;
                    while (n--) {
                        bm[q++] = d;
                    }
                    break;
                case 2:
                    // d = stream.readBytes(4);
                    d = b[p++];
                    e = b[p++];
                    f = b[p++];
                    g = b[p++];
                    while (n--) {
                        if (r) {
                            bm[q++] = e;
                            bm[q++] = f;
                            bm[q++] = g;
                            bm[q++] = d;
                        } else {
                            bm[q++] = d;
                            bm[q++] = e;
                            bm[q++] = f;
                            bm[q++] = g;
                        }
                    }
                    break;
                case 3:
                    while (n--) {
                        if (r) {
                            d = b[p++];
                            bm[q++] = b[p++];
                            bm[q++] = b[p++];
                            bm[q++] = b[p++];
                            bm[q++] = d;
                        } else {
                            bm[q++] = b[p++];
                            bm[q++] = b[p++];
                            bm[q++] = b[p++];
                            bm[q++] = b[p++];
                        }
                    }
                    // bm.push.apply(bm, stream.readBytes(n * 4));
                    break;
                }
            }
        },
        load: function () {
            var w = this.width,
                h = this.height,
                x, y, i, imageData, data, context, colors, color, b;
            if (this.depth === 32) {
                this.image = document.createElement('canvas');
                this.image.width = this.width;
                this.image.height = this.height;
                data = (imageData = (context = this.image.getContext('2d')).createImageData(this.width, this.height)).data;
                this.decompress(data);
                context.putImageData(imageData, 0, 0);
                return;
            }
            color = [0, 0, 0, 0];
            if (this.depth === 16) {
                w = this.width += 1;
            }
            this.init();
            colors = sb.getColorStream(this.bitmap, this.depth);
            data = (imageData = (context = this.image.getContext('2d')).createImageData(this.width, this.height)).data;
            for (x = 0; x < w; ++x) {
                for (y = 0; y < h; ++y) {
                    colors.next(color);
                    if (!color) continue;
                    i = (x * h + y) * 4;
                    data[i] = color[0] * 255;
                    data[i + 1] = color[1] * 255;
                    data[i + 2] = color[2] * 255;
                    data[i + 3] = color[3] * 255;
                }
            }
            context.putImageData(imageData, 0, 0);
        }
    });

    extend((sb.ColorForm = function (w, h, d, o, b, c) {
        this.width = w;
        this.height = h;
        this.depth = d;
        this.offset = o;
        this.bits = b;
        this.colors = c;
    }).prototype = Object.create(sb.Form.prototype), {
        load: function () {
            var w = this.width,
                h = this.height,
                colors = this.colors,
                bits, x, y, i, imageData, data, context, color;
            this.init();
            data = (imageData = (context = this.image.getContext('2d')).createImageData(this.width, this.height)).data;
            bits = this.bitmap;
            for (x = 0; x < w; ++x) {
                for (y = 0; y < h; ++y) {
                    color = colors[bits[x * h + y]];
                    if (!color) continue;
                    i = (x * h + y) * 4;
                    data[i] = color.r * 255;
                    data[i + 1] = color.g * 255;
                    data[i + 2] = color.b * 255;
                    data[i + 3] = color.a * 255;
                }
            }
            context.putImageData(imageData, 0, 0);
        }
    });

    sb.fields = {};
    sb.classIDs = {};
    sb.classNames = {};
    sb.addFields = function (id, name, base, fields) {
        sb.classIDs[name] = id;
        sb.classNames[id] = name;
        fields = fields.length ? fields.split(',') : [];
        if (base) {
            base = sb.fields[sb.classIDs[base]];
            if (!base) throw new Error('Initialization error');
            fields = base.concat(fields);
        }
        sb.fields[id] = fields;
    };

	sb.addFields(100, 'Morph', '', 'bounds,owner,submorphs,color,flags,properties');
	sb.addFields(101, 'BorderedMorph', 'Morph', 'borderWidth,borderColor');
	sb.addFields(102, 'RectangleMorph', 'BorderedMorph', '');
	sb.addFields(103, 'EllipseMorph', 'BorderedMorph', '');
	sb.addFields(104, 'AlignmentMorph', 'RectangleMorph', 'orientation,centering,hResizing,vResizing,inset');
	sb.addFields(105, 'StringMorph', 'Morph', 'fontSpec,emphasis,contents');

	sb.addFields(-1, 'Slider', 'BorderedMorph', 'slider,value,setValueSelector,sliderShadow,sliderColor,descending,model');
	sb.addFields(-2, 'AbstractSound', '', '');
	sb.addFields(-3, 'ScriptableScratchMorph', 'Morph', 'objName,vars,blocksBin,customBlocks,isClone,media,costume');
	sb.addFields(-4, 'ArgMorph', 'BorderedMorph', 'labelMorph');
	sb.addFields(-5, 'PasteUpMorph', 'BorderedMorph', '');
	sb.addFields(-6, 'ScratchMedia', '', 'mediaName');
	sb.addFields(-7, 'ScrollFrameMorph', 'BorderedMorph', '');

	sb.addFields(106, 'UpdatingStringMorph', 'StringMorph', 'format,target,getSelector,putSelector,parameter,floatPrecision,growable,stepTime');
	sb.addFields(107, 'SimpleSliderMorph', 'Slider', 'target,arguments,minVal,maxVal,truncate,sliderThickness');
	sb.addFields(108, 'SimpleButtonMorph', 'RectangleMorph', 'target,actionSelector,arguments,actWhen');
	sb.addFields(109, 'SampledSound', 'AbstractSound', 'envelopes,scaledVol,initialCount,samples,originalSamplingRate,samplesSize,scaledIncrement,scaledInitialIndex');
	sb.addFields(110, 'ImageMorph', 'Morph', 'form,transparency');
	sb.addFields(111, 'SketchMorph', 'Morph', 'originalForm,rotationCenter,rotationDegrees,rotationStyle,scalePoint,offsetWhenRotated');
	sb.addFields(123, 'SensorBoardMorph', 'Morph', 'portNum');
	sb.addFields(124, 'ScratchSpriteMorph', 'ScriptableScratchMorph', 'visibility,scalePoint,rotationDegrees,rotationStyle,volume,tempoBPM,draggable,sceneStates,lists,virtualScale,ownerSprite,subsprites,rotateWithOwner,refPos,prototype,deletedAttributes');
	sb.addFields(125, 'ScratchStageMorph', 'ScriptableScratchMorph', 'zoom,hPan,vPan,obsoleteSavedState,sprites,volume,tempoBPM,sceneStates,lists');
	sb.addFields(140, 'ChoiceArgMorph', 'ArgMorph', 'isBoolean,options,choice,getOptionsSelector');
	sb.addFields(141, 'ColorArgMorph', 'ArgMorph', '');
	sb.addFields(142, 'ExpressionArgMorph', 'ArgMorph', 'isNumber');
	sb.addFields(145, 'SpriteArgMorph', 'ArgMorph', 'morph');
	sb.addFields(147, 'BlockMorph', 'Morph', 'isSpecialForm,oldColor');
	sb.addFields(148, 'CommandBlockMorph', 'BlockMorph', 'commandSpec,argMorphs,titleMorph,receiver,selector,isReporter,isTimed,wantsName,wantsPossession');
	sb.addFields(149, 'CBlockMorph', 'CommandBlockMorph', 'nestedBlock,nextBlock');
	sb.addFields(151, 'HatBlockMorph', 'CommandBlockMorph', 'scriptNameMorph,indicatorMorph,scriptOwner,parameters,isClickable');
	sb.addFields(153, 'ScratchScriptsMorph', 'PasteUpMorph', '');
	sb.addFields(154, 'ScratchSliderMorph', 'AlignmentMorph', 'slider,sliderMin,sliderMax,variable');
	sb.addFields(155, 'WatcherMorph', 'AlignmentMorph', 'titleMorph,readout,readoutFrame,scratchSlider,watcher,isSpriteSpecific,unused,sliderMin,sliderMax,isLarge');
	sb.addFields(157, 'SetterBlockMorph', 'CommandBlockMorph', 'variable');
	sb.addFields(158, 'EventHatMorph', 'HatBlockMorph', '');
	sb.addFields(170, 'ReporterBlockMorph', 'CommandBlockMorph', 'isBoolean');
	sb.addFields(160, 'VariableBlockMorph', 'ReporterBlockMorph', '');
	sb.addFields(162, 'ImageMedia', 'ScratchMedia', 'form,rotationCenter,textBox,jpegBytes,compositeForm');
	sb.addFields(163, 'MovieMedia', 'ScratchMedia', 'fileName,fade,fadeColor,zoom,hPan,vPan,msecsPerFrame,currentFrame,moviePlaying');
	sb.addFields(164, 'SoundMedia', 'ScratchMedia', 'originalSound,volume,balance,compressedSampleRate,compressedBitsPerSample,compressedData');
	sb.addFields(165, 'KeyEventHatMorph', 'HatBlockMorph', '');
	sb.addFields(166, 'BooleanArgMorph', 'ArgMorph', '');
	sb.addFields(167, 'EventTitleMorph', 'ArgMorph', '');
	sb.addFields(168, 'MouseClickEventHatMorph', 'HatBlockMorph', '');
	sb.addFields(169, 'ExpressionArgMorphWithMenu', 'ExpressionArgMorph', 'menuMorph,getMenuSelector,specialValue');
	sb.addFields(171, 'MultilineStringMorph', 'BorderedMorph', 'fontSpec,textColor,selectionColor,lines');
	sb.addFields(172, 'ToggleButton', 'SimpleButtonMorph', 'onForm,offForm,overForm,disabledForm,isMomentary,toggleMode,isOn,isDisabled');
	sb.addFields(173, 'WatcherReadoutFrameMorph', 'BorderedMorph', '');
	sb.addFields(174, 'WatcherSliderMorph', 'SimpleSliderMorph', '');
	sb.addFields(175, 'ScratchListMorph', 'BorderedMorph', 'listName,strings,target,complex');
	sb.addFields(176, 'ScrollingStringMorph', 'BorderedMorph', 'fontSpec,showScrollbar,firstVisibleLine,textColor,selectionColor,lines');

	sb.addFields(180, 'ScrollFrameMorph2', 'ScrollFrameMorph', '');
	sb.addFields(181, 'ListMultilineStringMorph', 'MultilineStringMorph', '');
	sb.addFields(182, 'ScratchScrollBar', 'Morph', '');

	sb.addFields(200, 'CustomCommandBlockMorph', 'CommandBlockMorph', 'userSpec');
	sb.addFields(201, 'CustomBlockDefinition', '', 'userSpec,blockVars,isAtomic,isReporter,isBoolean,body,answer,type,category,declarations,defaults,isGlobal');
	sb.addFields(203, 'ReporterScriptBlockMorph', 'ReporterBlockMorph', '');
	sb.addFields(202, 'CommandScriptBlockMorph', 'ReporterScriptBlockMorph', '');
	sb.addFields(205, 'VariableFrame', '', 'vars');
	sb.addFields(206, 'CustomReporterBlockMorph', 'ReporterBlockMorph', 'userSpec');

	sb.addFields(207, 'CReporterSlotMorph', 'ReporterScriptBlockMorph', '');

	sb.addFields(300, 'StringFieldMorph', 'BorderedMorph', '');
	sb.addFields(301, 'MultiArgReporterBlockMorph', 'ReporterBlockMorph', '');

	(function (C, p) {

		p.on = function (bytes) {
			this.bytes = bytes;
			if (!bytes.subarray) bytes.subarray = bytes.slice;
			this.position = 0;
			return this;
		};
		p.readYPR = function (bytes) {
			var version, infoSize, info, stage;
			console.time('readSB');
			this.on(bytes);

			// skip header
			this.matchBytes([66, 108, 111, 120, 69, 120, 112, 86]);
			version = +(String.fromCharCode(this.next()) + String.fromCharCode(this.next()));
			if (version < 1) {
				throw new Error('Invalid version');
			}

			// read info
			infoSize = this.uint32();
			info = this.read();

			this.position = infoSize + 14; // header + uint32
			stage = this.read();

			this.onload({
				reader: this,
				info: info,
				stage: stage
			});
			console.timeEnd('readSB');
		};
		p.readInfo = function (bytes) {
			var version, infoSize, info;
			this.on(bytes);

			this.matchBytes([66, 108, 111, 120, 69, 120, 112, 86]);
			version = +(String.fromCharCode(this.next()) + String.fromCharCode(this.next()));
			if (version < 1) {
				throw new Error('Invalid version');
			}

			// read info
			infoSize = this.uint32();
			info = this.read();

			this.onload({
				reader: this,
				info: info
			});
		};
		p.read = function () {
			var i, objectCount;
			this.objects = [];
			this.readHeader();
			objectCount = this.uint32();

			i = objectCount;
			while (i--) {
				this.objects.push(this.readObject());
			}
			i = objectCount;
			while (i--) {
				this.fixReferences(this.objects[i]);
			}
			return this.objects[0][1];
		};
		p.fixReferences = function (object) {
			var classID = object[0],
				value = object[1],
				i = 0,
				fields, source;
			if (classID < 99) {
				this.fixFixedFormat(classID, value);
			} else {
				this.fixArray(object[3]);
				fields = sb.fields[classID];
				if (!fields)
					throw new Error('Invalid class ID ' + classID);
				source = value.fields;
				delete value.fields;
				value.className = sb.classNames[classID];
				i = fields.length;
				while (i--) {
					value[fields[i]] = source[i];
				}
			}
		};
		p.fixArray = function (a) {
			var i = a.length,
				o;
			while (i--) {
				if ((o = a[i]) && o.isRef) {
					if (o.id > this.objects.length) {
						throw new Error('Invalid object reference');
					}
					a[i] = this.objects[o.id - 1][1];
				}
			}
		};
		p.targetObjectFor = function (o) {
			if (o && o.isRef) {
				if (o.id > this.objects.length)
					throw new Error('Invalid object reference');
				return this.objects[o.id - 1][1];
			}
			return o;
		};
		p.fixFixedFormat = function (classID, object) {
			switch (classID) {
			case 20: // Array
			case 21: // OrderedCollection
			case 22: // Set
			case 23: // IdentitySet
				this.fixArray(object);
				return object;
			case 24: // Dictionary
			case 25: // IdentityDictionary
				this.fixArray(object.keys);
				this.fixArray(object.values);
				break;
			case 32: // Point
				object.x = this.targetObjectFor(object.x);
				object.y = this.targetObjectFor(object.y);
				break;
			case 33: // Rectangle
				object.origin.x = this.targetObjectFor(object.origin.x);
				object.origin.y = this.targetObjectFor(object.origin.y);
				object.corner.x = this.targetObjectFor(object.corner.x);
				object.corner.y = this.targetObjectFor(object.corner.y);
				break;
			case 34: // Form
				object.offset = this.targetObjectFor(object.offset);
				object.bits = this.targetObjectFor(object.bits);
				object.load();
				break;
			case 35: // ColorForm
				object.offset = this.targetObjectFor(object.offset);
				object.bits = this.targetObjectFor(object.bits);
				object.colors = this.targetObjectFor(object.colors);
				object.load();
				break;
			}
			return object;
		};
		p.readObject = function () {
			var classID = this.next(),
				version, fieldCount, fields;
			if (classID > 99) {
				version = this.next();
				fieldCount = this.next();
				fields = [];
				while (fieldCount--) {
					fields.push(this.readField());
				}
				return [classID, { fields: fields }, version, fields];
			}
			return [classID, this.readFixedFormat(classID)];
		};
		p.readField = function () {
			var classID = this.next();
			if (classID === 99) {
				return new sb.Ref(this.uint24());
			}
			return this.readFixedFormat(classID);
		};
		p.readFixedFormat = function (classID) {
			var a, n;
			switch (classID) {
			case 1: // UndefinedObject
				return null;
			case 2: // True
				return true;
			case 3: // False
				return false;
			case 4: // SmallInteger
				return this.int32();
			case 5: // SmallInteger16
				return this.int16();
			case 6: // LargePositiveInteger
			case 7: // LargeNegativeInteger
				n = this.uint16();
				a = 0;
				while (n--) {
					a *= 0x100;
					a += this.next();
				}
				return a;
			case 8: // Float
				return this.float64();
			case 9: // String
			case 10: // Symbol
			case 14: // UTF8
				a = [].slice.call(this.readBytes(n = this.uint32()));
				while (n--) {
					a[n] = String.fromCharCode(a[n]);
				}
				return a.join('');
			case 11: // ByteArray
				return this.readBytes(this.uint32());
			case 12: // SoundBuffer
				a = [];
				n = this.uint32();
				while (n--) {
					a.push(this.int16());
				}
				return a;
			case 13: // Bitmap
				a = [];
				a.isBitmap = true;
				n = this.uint32();
				while (n--) {
					a.push(this.uint32());
				}
				return a;
			case 20: // Array
			case 21: // OrderedCollection
			case 22: // Set
			case 23: // IdentitySet
				a = [];
				n = this.uint32();
				while (n--) {
					a.push(this.readField());
				}
				return a;
			case 24: // Dictionary
			case 25: // IdentityDictionary
				a = new sb.Dictionary([], []);
				n = this.uint32();
				while (n--) {
					a.keys.push(this.readField());
					a.values.push(this.readField());
				}
				return a;
			case 30: // Color
				return new sb.Color(this.uint32(), 255);
			case 31: // TranslucentColor
				return new sb.Color(this.uint32(), this.uint8());
			case 32: // Point
				return new sb.Point(this.readField(), this.readField());
			case 33: // Rectangle
				return new sb.Rectangle(this.readField(), this.readField(), this.readField(), this.readField());
			case 34: // Form
				return new sb.Form(this.readField(), this.readField(), this.readField(), this.readField(), this.readField());
			case 35: // ColorForm
				return new sb.ColorForm(this.readField(), this.readField(), this.readField(), this.readField(), this.readField(), this.readField());
			}
			throw new Error('Invalid fixed-format class ID');
		};
		p.readHeader = function () {
			this.matchBytes([79, 98, 106, 83, 1, 83, 116, 99, 104, 1]);
		};
		p.readBytes = function (length) {
			return this.bytes.subarray(this.position, this.position += length);
		};
		p.matchBytes = function (bytes) {
			var i = bytes.length,
				r = this.readBytes(i);
			while (i--) {
				if (r[i] !== bytes[i]) {
					throw new Error('Invalid format');
				}
			}
		};
		p.skip = function (length) {
			this.position += length;
		};
		p.next = p.uint8 = function () {
			return this.bytes[this.position++];
		};
		p.hasNext = function () {
			return this.position < this.bytes.length;
		};
		p.uint16 = function () {
			return this.next() * 0x100 + this.next();
		};
		p.uint24 = function () {
			return this.next() * 0x10000 + this.next() * 0x100 + this.next();
		};
		p.uint32 = function () {
			return this.next() * 0x1000000 + this.next() * 0x10000 + this.next() * 0x100 + this.next();
		};
		p.int8 = function () {
			var v = this.bytes[++this.position];
			return v >= 0x80 ? v - 0x100 : v;
		};
		p.int16 = function () {
			var d = this.next(),
				v = d * 0x100 + this.next();
			return d >= 0x80 ? v - 0x10000 : v;
		};
		p.int24 = function () {
			var d = this.next(),
				v = d * 0x10000 + this.next() * 0x100 + this.next();
			return d >= 0x80 ? v - 0x1000000 : v;
		};
		p.int32 = function () {
			var d = this.next(),
				v = d * 0x1000000 + this.next() * 0x10000 + this.next() * 0x100 + this.next();
			return d >= 0x80 ? v - 0x100000000 : v;
		};
		p.string = function () {
			var length = this.uint16(),
				bytes = this.readBytes(length),
				i = length;
			while (i--) {
				bytes[i] = String.fromCharCode(bytes[i]);
			}
			return bytes.join('');
		};
		p.float64 = function () {
			return this.ieee(8, 11, 52, 1023);
		};
		p.ieee = function (n, ebits, mbits) {
			var bias = (1 << (ebits - 1)) - 1,
				string = '',
				i = n,
				b, sign, exponent, mantissa, result;
			while (i--) {
				b = this.next().toString(2);
				string = string + Array(9 - b.length).join('0') + b;
			}
			sign = string.charAt(0) === '0' ? 1 : -1;
			exponent = parseInt(string.substr(1, ebits), 2);
			mantissa = parseInt(string.substr(ebits + 1), 2);
			if (exponent === 0) {
				return mantissa === 0 ? sign * 0 : sign * Math.pow(2, 1 - bias) * mantissa / Math.pow(2, mbits);
			}
			if (exponent === (1 << ebits) - 1) {
				return mantissa === 0 ? sign / 0 : NaN;
			}
			return sign * Math.pow(2, exponent - bias) * (1 + mantissa / Math.pow(2, mbits));
		};

	})(sb.Reader = function () {}, sb.Reader.prototype);

	(function (C, p) {

		var rotationStyles = {
			normal: 1,
			leftRight: 2,
			none: 0
		}, customBlockInputs = {
			object: '%obj',
			objectList: '%mult%obj',
			number: '%n',
			numberList: '%mult%n',
			text: '%txt',
			textList: '%mult%txt',
			list: '%l',
			listList: '%mult%l',
			any: '%s',
			anyList: '%mult%s',
			'boolean': '%b',
			booleanList: '%mult%b',
			command: '%cmdRing',
			commandList: '%mult%cmdRing',
			reporter: '%repRing',
			reporterList: '%mult%repRing',
			predicate: '%predRing',
			predicateList: '%mult%predRing',
			loop: '%cs',
			loopList: '%mult%cs',
			unevaluated: '%anyUE',
			unevaluatedList: '%mult%anyUE',
			unevaluatedBoolean: '%boolUE',
			unevaluatedBooleanList: '%mult%boolUE',
			template: '%upvar'
		}, blockSelectors = {
			// Motion': '',
			'forward:': 'forward',
			'turnLeft:': 'turn',
			'turnRight:': 'turnLeft',
			'heading:': 'setHeading',
			'pointTowards:': 'doFaceTowards',
			'gotoX:y:': 'gotoXY',
			'gotoSpriteOrMouse:': 'doGotoObject',
			'glideSecs:toX:y:elapsed:from:': 'doGlide',
			'changeXposBy:': 'changeXPosition',
			'xpos:': 'setXPosition',
			'changeYposBy:': 'changeYPosition',
			'ypos:': 'setYPosition',
			'bounceOffEdge': 'bounceOffEdge',
			'xpos': 'xPosition',
			'ypos': 'yPosition',
			'heading': 'direction',

			// Looks
			'lookLike:': 'doSwitchToCostume',
            'showBackground:': 'doSwitchToCostume',
			'nextCostume': 'doWearNextCostume',
			'nextBackground': 'doWearNextCostume',
			'costumeIndex': 'getCostumeIdx',
			'say:duration:elapsed:from:': 'doSayFor',
			'say:': 'bubble',
			'think:duration:elapsed:from:': 'doThinkFor',
			'think:': 'doThink',
			'changeGraphicEffect:by:': 'changeEffect',
			'setGraphicEffect:to:': 'setEffect',
			'filterReset': 'clearEffects',
			'setSizeTo:': 'setScale',
            'changeSizeBy:': 'changeScale',
			'scale': 'getScale',
			'show': 'show',
			'hide': 'hide',
			'comeToFront': 'comeToFront',
			'goBackByLayers:': 'goBack',

			// Sound
			'playSound:': 'playSound',
			'doPlaySoundAndWait': 'doPlaySoundUntilDone',
			'stopAllSounds': 'doStopAllSounds',
			// 'drum:duration:elapsed:from:': '',
			'rest:elapsed:from:': 'doRest',
			'noteOn:duration:elapsed:from:': 'doPlayNote',
			// 'midiInstrument:': '',
			// 'changeVolumeBy:': '',
			// 'setVolumeTo:': '',
			// 'volume': '',
			'changeTempoBy:': 'doChangeTempo',
			'setTempoTo:': 'doSetTempo',
			'tempo': 'getTempo',

			// Pen
			'clearPenTrails': 'clear',
			'putPenDown': 'down',
			'putPenUp': 'up',
			'penColor:': 'setColor',
			'changePenHueBy:': 'changeHue',
			'setPenHueTo:': 'setHue',
            '_changePenHueBy:': 'changeHue',
            '_setPenHueTo:': 'setHue',
			'changePenShadeBy:': 'changeBrightness',
			'setPenShadeTo:': 'setBrightness',
			'changePenSizeBy:': 'changeSize',
			'penSize:': 'setSize',
			'stampCostume': 'doStamp',

			// Control
			// 'whenStartClicked': '',
			// 'whenKeyPressed:': '',
			// 'whenSpriteClicked': '',
			'wait:elapsed:from:': 'doWait',
			'doForever': 'doForever',
			'doRepeat': 'doRepeat',
			'broadcast:': 'doBroadcast',
			'doBroadcastAndWait': 'doBroadcastAndWait',
			// 'whenMessageReceived:': '',
			// TODO 'doForeverIf': '',
			'doIf': 'doIf',
			'doIfElse': 'doIfElse',
			'doWaitUntil': 'doWaitUntil',
			'doUntil': 'doUntil',
			'doReturn': 'doStop',
			'stopAll': 'doStopAll',
			'doRun': 'doRun',
			'doRunBlockWithArgs': 'doRun',
			'doRunBlockWithArgList': 'doRun',
			'doFork': 'fork',
			'doForkBlockWithArgs': 'fork',
			'doForkBlockWithArgList': 'fork',
			'doReport': 'evaluate',
			'doCallBlockWithArgs': 'evaluate',
			'doCallBlockWithArgList': 'evaluate',
			'doAnswer': 'doReport',
			'doStopBlock': 'doStopBlock',
			// 'doPauseThread': '',
			// 'doPauseThreadReporter': '',

			// Sensing
			'touching:': 'reportTouchingObject',
			'touchingColor:': 'reportTouchingColor',
			'color:sees:': 'reportColorIsTouchingColor',
			'doAsk': 'doAsk',
			'answer': 'reportLastAnswer',
			'mouseX': 'reportMouseX',
			'mouseY': 'reportMouseY',
			'mousePressed': 'reportMouseDown',
			'keyPressed:': 'reportKeyPressed',
			'distanceTo:': 'reportDistanceTo',
			'timerReset': 'doResetTimer',
			'timer': 'reportTimer',
			// 'getAttribute:of:': '',
			// 'attribute:of:': '',
			// 'soundLevel': '',
			// 'isLoud': '',
			// 'sensor:': '',
			// 'sensorPressed:': '',
			// 'getObject:': '',
			// 'get:': '',

			// Operators
			'+': 'reportSum',
			'-': 'reportDifference',
			'*': 'reportProduct',
			'/': 'reportQuotient',
			'randomFrom:to:': 'reportRandom',
			'<': 'reportLessThan',
			'=': 'reportEquals',
			'>': 'reportGreaterThan',
			'&': 'reportAnd',
			'|': 'reportOr',
			'not': 'reportNot',
			'getTrue': 'reportTrue',
			'getFalse': 'reportFalse',
			'concatenate:with:': 'reportJoinWords',
			'letter:of:': 'reportLetter',
			'stringLength:': 'reportStringSize',
			'asciiCodeOf:': 'reportUnicode',
			'asciiLetter:': 'reportUnicodeAsLetter',
			'\\\\': 'reportModulus',
			'rounded': 'reportRound',
			'computeFunction:of:': 'reportMonadic',
			'isObject:type:': 'reportIsA',
			// 'procedure': 'reifyScript',
			// 'procedureWithArgs': 'reifyScript',
			// 'function': 'reifyReporter',
			// 'functionWithArgs': 'reifyReporter',
			// 'spawn': '',

			// Variables
			'setVar:to:': 'doSetVar',
			'changeVar:by:': 'doChangeVar',
			// 'deleteObject:': '',
			'showVariable:': 'doShowVar',
			'hideVariable:': 'doHideVar',
			'doDeclareVariables': 'doDeclareVariables',
			'newList:': 'reportNewList',
			'append:toList:': 'doAddToList',
			'deleteLine:ofList:': 'doDeleteFromList',
			'insert:at:ofList:': 'doInsertInList',
			'setLine:ofList:to:': 'doReplaceInList',
			'getLine:ofList:': 'reportListItem',
			'lineCountOfList:': 'reportListLength',
			'list:contains:': 'reportListContainsItem',
			// 'contentsOfList:': '',
			// 'copyOfList:': ''

			// Kludge
			_warp: 'doWarp'
		};

		function escapeXML(string) {
            // over-cautious due to some morphic bugs
			return string.replace(/&/g, '&amp;')/*.replace(/[\n\r]|\r\n/g, '&#10;')*/.replace(/</g, '&lt;').replace(/"/g, '&quot;');
		}
		function costumeIndex(object) {
			return object.media.filter(function (m) { return m.className === 'ImageMedia' }).indexOf(object.costume) + 1;
		}

		function Text(value) {
			this.value = '' + value;
		}
		Text.prototype.toXML = function (string) {
			string.push(escapeXML(this.value));
		};

		function Element(tagName) {
			this.tagName = tagName;
		}
		Element.prototype.toXML = function (string) {
			var attributes = this.attributes, key;
			string.push('<', this.tagName);
			for (key in attributes) if (attributes.hasOwnProperty(key)) {
				string.push(' ', key, '="', escapeXML('' + attributes[key]), '"');
			}
			if (this.children.length) {
				string.push('>');
				this.children.forEach(function (child) {
					if (!child.toXML) {
						console.error('Invalid', child);
					}
					child.toXML(string);
				});
				string.push('</', this.tagName, '>');
			} else {
				string.push('/>');
			}
		};

		function n(tagName, attributes, children) {
			var el = new Element(tagName), key;
			el.attributes = attributes || {};
			el.children = children || [];
			return el;
		}
		function t(value) {
			return new Text(value);
		}

		p.write = function (projectName, project) {
			var a, xml, out, objectID = 0, customBlocks = {};
			function id(n) {
				return n.attributes.id ? n('ref', { id: n.attributes.id }) : n.attributes.id = ++objectID, n;
			}
			function preCustomBlocks(scope, blocks) {
				var sc = customBlocks[scope] = {};
				if (!blocks) return;
				blocks.forEach(function (ypr) {
					sc[ypr.userSpec] = ypr;
					ypr.userSpec = ypr.userSpec.replace(/^\s+|\s+$/g, '').replace(/\s{2,}/g, ' ').replace(/'/g, '');
					ypr.__blockSpec__ = ypr.userSpec.replace(/%(\S+)/g, function (_, name) {
						var type = customBlockInputs[ypr.declarations.get(name)];
						if (type === undefined) {
							if (ypr.declarations.get(name) === undefined) {
								type = '%s';
							} else {
								console.warn('Missing input type ' + ypr.declarations.get(name));
							}
						}
						return type;
					});
					ypr.__types__ = (ypr.userSpec.match(/%\S+/g) || []).map(function (arg) {
						return ypr.declarations.get(arg.substr(1)) || 'any';
					});
				});
			}
			function nsCustomBlocks(blocks, globals) {
				if (!blocks) return [];
				return (globals ? blocks : blocks.filter(function (b) { return !b.isGlobal })).map(function (ypr) {
					var args = (ypr.userSpec.match(/%\S+/g) || []).map(function (arg) {
							var name = arg.substr(1),
								type = customBlockInputs[ypr.declarations.get(name)];
							if (type === undefined) {
								type = '%s';
							}
							return n('input', {
								type: type
							}, [t(ypr.defaults.get(name))]);
						}),
						spec = ypr.userSpec.replace(/%(\S+)/g, '%\'$1\'');
					ypr.body = ypr.body || [];
					if (ypr.answer && ypr.answer.pop) {
						ypr.body.push(['byob', '', 'doAnswer', ypr.answer[0]]);
					}
                    if (ypr.blockVars.length) {
                        ypr.body.unshift(['byob', '', 'doDeclareVariables'].concat(ypr.blockVars.map(function (n) {
                            return [0, 0, 0, n];
                        })));
                    }
					if (ypr.isAtomic) {
						ypr.body = [['byob', '', '_warp', ypr.body]];
					}
					return n('block-definition', {
						s: spec,
						// type: ypr.isBoolean ? 'predicate' : ypr.isReporter ? 'reporter' : 'command',
						type: ypr.type === 'boolean' ? 'predicate' : ypr.answer !== null ? 'reporter' : 'command',
						category:
							ypr.category === 'none' ? 'other' :
							ypr.category === 'list' ? 'lists' : ypr.category
					}, [
						n('inputs', {}, args),
						n('script', {}, nsScript(ypr.body))
					]);
				});
			}
			function nsScript(script) {
				return script.map(function (block) {
					return nBlock(block);
				});
			}
			function nBlock(block) {
				var node, a;
				node = n('block');
				switch (block[2]) {
				case 'EventHatMorph':
					if (block[3] === 'Scratch-StartClicked') {
						node.attributes.s = 'receiveGo';
					} else {
						node.attributes.s = 'receiveMessage';
						node.children.push(n('l', {}, [t(block[3])]));
					}
					return node;
				case 'MouseClickEventHatMorph':
					node.attributes.s = 'receiveClick';
					return node;
				case 'KeyEventHatMorph':
					node.attributes.s = 'receiveKey';
					node.children.push(n('l', {}, [t(block[3])]));
					return node;
				case 'doRunBlockWithArgs':
				case 'doCallBlockWithArgs':
				case 'doForkBlockWithArgs':
					a = block.length - 5;
					while (a--) {
						if (block[5 + a].pop) {
							block[5 + a] = ['block', '', [block[5 + a]]];
						}
					}
					a = {
						className: 'ScratchListMorph',
						complex: block.slice(5)
					};
					block = block.slice(0, 4);
					block.push(a);
					break;
				case 'doRunBlockWithArgList':
				case 'doCallBlockWithArgList':
				case 'doForkBlockWithArgList':
					a = block[5];
					block = block.slice(0, 4);
					block.push(a);
					break;
				case 'doDeclareVariables':
					block = ['byob', '', 'doDeclareVariables', {
						className: 'ScratchListMorph',
						complex: block.slice(3).map(function (block) {
							return block[3];
						})
					}];
					break;
				case 'getLine:ofList:':
				case 'append:toList:':
				case 'deleteLine:ofList:':
				case 'setLine:ofList:to:':
				case 'getLine:ofList:':
				case 'insert:at:ofList:':
				case 'lineCountOfList:':
				case 'list:contains:':
					a = block[2] === 'insert:at:ofList:' ? 5 :
						block[2] === 'lineCountOfList:' || block[2] === 'list:contains:' ? 3 : 4;
					if (typeof block[a] === 'string') {
						block[a] = block[a] === '' ? null : ['byob', '', 'readVariable', block[a]];
					}
					break;
				case 'readBlockVariable':
				case 'readVariable':
				case 'listNamed:':
					node.attributes['var'] = block[3];
					return node;
				case 'function':
				case 'functionWithArgs':
					node.attributes.s = 'reifyReporter';
					block.pop();
					node.children.push(n('autolambda', {}, [nBlock(block[8])]));
					if (block[2] === 'functionWithArgs') {
						node.children.push(n('list', {}, block.slice(9).map(function (arg) {
							return n('l', {}, [t(arg[3])]);
						})));
					}
					return node;
				case 'procedure':
				case 'procedureWithArgs':
					node.attributes.s = 'reifyScript';
					node.children.push(n('script', {}, nsScript(block.pop())));
					node.children.push(n('list', {}, block.slice(8).map(function (arg) {
						return n('l', {}, [t(arg[3])]);
					})));
					return node;
				case 'autoBlock':
				case 'autoPredicate':
					node.attributes.s = block[2] === 'autoPredicate' ? 'reifyPredicate' : 'reifyReporter';
					node.children.push(n('autolambda', {}, block[3] ? [nBlock(block[3][0])] : []));
					return node;
				case 'concatenate:with:':
					block = block.slice(0, 3).concat({
						className: 'ScratchListMorph',
						complex: block.slice(3)
					});
					a = 2;
					while (a--) {
						if (block[3].complex[a].pop) {
							block[3].complex[a] = ['block', '', [block[3].complex[a]]];
						}
					}
					break;
				case 'loopLambda':
					return n('script', {}, block[8] ? nsScript(block[8]) : []);
				case 'autoLambda':
					// node.attributes.s = block[2] === 'loopLambda' ? 'reifyScript' : 'reifyReporter';
                    node.attributes.s = 'reifyScript';
					node.children.push(n('script', {}, block[8] ? nsScript(block[8]) : []));
					return node;
				case 'changeVariable':
				case 'changeBlockVariable':
					block = [0, 0, block[4], block[3], block[block[2] === 'changeBlockVariable' ? 6 : 5]];
					break;
                case 'distanceTo:':
                case 'gotoSpriteOrMouse:':
                case 'pointTowards:':
                case 'touching:':
                    if (block[3] === 'mouse') {
                        block[3] = 'mouse-pointer';
                    } else {
                        block[3] = block[3].objName;
                    }
                    break;
                case 'doForeverIf':
                    block = [0, 0, 'doForever', [[0, 0, 'doIf', block[3], block[4]]]]
                    break;
                case '\\\\':
                case '+':
                case '-':
                case '*':
                case '/':
                    if (block[3] === ' ') {
                        block[3] = '';
                    }
                    if (block[4] === ' ') {
                        block[4] = '';
                    }
                    break;
                case 'setPenHueTo:':
                case 'changePenHueBy:':
                    block[3] = ['byob', 0, '/', block[3], '2'];
                    break;
				}
				if (block[2] === 'doCustomBlock') {
					a = customBlocks[block[1] === 'Stage' ? '__global__' : block[1]][block[3]];
					node = n('custom-block', {
						s: a.__blockSpec__
					});
					if (block[1] !== 'Stage' && !a.isGlobal) {
						node.attributes.scope = block[1];
					}
					a.__types__.forEach(function (type, i) {
						if (type === 'template') {
							block[4 + i] = block[4 + i][3];
						}
					});
					block.shift();
				} else {
					if ((node.attributes.s = blockSelectors[block[2]]) === undefined) {
						console.warn('Missing selector mapping for "' + block[2] + '"', block);
					}
				}
				block.slice(3).forEach(function (arg) {
					if (arg && arg.pop) {
						if (typeof arg[0] === 'string') {
							node.children.push(nBlock(arg));
						} else {
							node.children.push(n('script', {}, nsScript(arg)));
						}
					} else {
						node.children.push(nValue(arg));
					}
				});
				return node;
			}
			function nsVariables(vars, lists) {
				return vars.keys.map(function (key, i) {
					return n('variable', { name: key }, [nValue(vars.values[i], true)]);
				}).concat(lists.keys.map(function (key, i) {
					return n('variable', { name: key }, [nValue(lists.values[i], true)]);
				}));
			}
			function nValue(value, listHasItems) {
				return typeof value === 'string' || typeof value === 'number' ? n('l', {}, [t(value)]) :
					value == null || typeof value === 'boolean' ? n('l') :
					value.className === 'ScratchListMorph' ? id(n('list', {}, value.complex.map(function (object, i) {
						var item = object == null ? n('l', {}, [t((item = value.strings[i]) === 'nil' ? '' : item)]) :
							typeof object === 'string' ? nValue(object) :
							object && object[0] === 'block' ? nsScript(object[2])[0] : n('l');
						return listHasItems ? n('item', {}, [item]) : item;
					}))) :
					// (function () { throw 'Unimplemented' })();
					value.constructor === sb.Color ? n('color', {}, [t([value.r * 255, value.g * 255, value.b * 255, value.a * 255])]) :
					value.constructor === sb.Dictionary ? id(n('list')) :
					(function () { console.warn('No serializer for', value); return n('__undefined__') })();
			}
			function nsCostumes(media) {
				return [id(n('list', {}, media.filter(function (m) { return m.className === 'ImageMedia' }).map(function (c) {
					return n('item', {}, [
						n('costume', {
							name: c.mediaName,
							'center-x': c.rotationCenter.x,
							'center-y': c.rotationCenter.y,
							image: c.form.image.toDataURL()
						})
					]);
				})))];
			}
			function nsSounds(media) {
				if (media.filter(function (m) { return m.className === 'SoundMedia' }).length > 0) {
					console.warn('Sounds are unimplemented');
				}
				return [id(n('list'))];
			}
			function nsScripts(scripts) {
				return scripts.map(function (script) {
					if (script[1][0] && script[1][0][2] === 'scratchComment') {
						return n('comment', {
							x: script[0].x,
							y: script[0].y,
							w: script[1][0][5],
							collapsed: !script[1][0][4]
						}, [t(script[1][0][3])]);
					}
					return n('script', {
						x: script[0].x,
						y: script[0].y
					}, nsScript(script[1]));
				});
			}
			function nsSprites(sprites, vars, lists) {
				return sprites.map(function (sprite) {
					return id(n('sprite', {
						name: sprite.objName,
						x: (sprite.bounds.origin.x + sprite.bounds.corner.x) / 2 - 240,
						y: 180 - (sprite.bounds.origin.y + sprite.bounds.corner.y) / 2,
						heading: sprite.rotationDegrees + 90,
						scale: sprite.scalePoint.x,
						rotation: rotationStyles[sprite.rotationStyle],
						draggable: sprite.draggable,
						costume: costumeIndex(sprite),
						color: (sprite.color.r * 255 | 0) + ',' + (sprite.color.g * 255 | 0) + ',' + (sprite.color.b * 255 | 0)
					}, [
						n('variables', {}, nsVariables(sprite.vars, sprite.lists)),
						n('costumes', {}, nsCostumes(sprite.media)),
						n('sounds', {}, nsSounds(sprite.media)),
						n('blocks', {}, nsCustomBlocks(sprite.customBlocks, false)),
						n('scripts', {}, nsScripts(sprite.blocksBin))
					]));
				}).concat(vars.keys.concat(lists.keys).map(function (name) {
					return n('watcher', {
						'var': name,
						style: 'normal',
						x: 10,
						y: 10,
						color: '243,118,29',
						hidden: true
					});
				}));
			}
			
			preCustomBlocks('__global__', project.stage.customBlocks);
			project.stage.sprites.forEach(function (sprite) {
				preCustomBlocks(sprite.objName, sprite.customBlocks);
			});
			xml = n('project', {
				name: projectName,
				app: 'Snap! 4.0, http://snap.berkeley.edu; serialized by yprxml, http://dl.dropbox.com/u/10715865/Web/sb/yprxml.html',
				version: '1'
			}, [
				n('notes', {}, [t(project.info.get('comment') || '')]),
				n('thumbnail', {}, [t((a = project.info.get('thumbnail')) ? a.image.toDataURL() : '')]),
				id(n('stage', {
					costume: costumeIndex(project.stage),
					threadsafe: 'false'
				}, [
					n('pentrails', {}, [t((a = project.info.get('penTrails')) ? a.image.toDataURL() : '')]),
					n('costumes', {}, nsCostumes(project.stage.media)),
					n('sounds', {}, nsSounds(project.stage.media)),
					n('blocks', {}, []),
					n('variables', {}, []),
					n('scripts', {}, nsScripts(project.stage.blocksBin)),
					n('sprites', {}, nsSprites(project.stage.sprites, project.stage.vars, project.stage.lists))
				])),
				n('variables', {}, nsVariables(project.stage.vars, project.stage.lists)),
				n('blocks', {}, nsCustomBlocks(project.stage.customBlocks, true))
			]);
			xml.toXML(out = []);
			return out.join('');
		};

	})(sb.XMLWriter = function () {}, sb.XMLWriter.prototype);

	return sb;

})({});
