HandMorph.prototype.processDrop = function (event) {
/*
    find out whether an external image or audio file was dropped
    onto the world canvas, turn it into an offscreen canvas or audio
    element and dispatch the

        droppedImage(canvas, name)
        droppedSVG(image, name)
        droppedAudio(audio, name)
        droppedText(text, name, type)

    events to interested Morphs at the mouse pointer.

    In case multiple files are dropped simulateneously also displatch
    the events

        beginBulkDrop()
        endBulkDrop()

    to Morphs interested in bracketing the bulk operation
*/
    var files = event instanceof FileList ? event
                : event.target.files || event.dataTransfer.files,
        file,
        fileCount,
        url = event.dataTransfer ?
                event.dataTransfer.getData('URL') : null,
        txt = event.dataTransfer ?
                event.dataTransfer.getData('Text/HTML') : null,
        suffix,
        src,
        target = this.morphAtPointer(),
        img = new Image(),
        canvas,
        i;

    function readSVG(aFile) {
        var pic = new Image(),
            frd = new FileReader(),
            trg = target;
        while (!trg.droppedSVG) {
            trg = trg.parent;
        }
        pic.onload = () => {
            trg.droppedSVG(pic, aFile.name);
            bulkDrop();
        };
        frd = new FileReader();
        frd.onloadend = (e) => pic.src = e.target.result;
        frd.readAsDataURL(aFile);
    }

    function readImage(aFile) {
        var pic = new Image(),
            frd = new FileReader(),
            trg = target;
        while (!trg.droppedImage) {
            trg = trg.parent;
        }
        
        /* UCB Script Pic Edit:
            *  - Added new process for accepting images dropped on script window
            *  - Images are searched for XML metadata, and if present, users are able to:
            *      1. Process the script as an XML file and load script
            *      2. Process the script as an image and load it into the costumes
            *  - Base code credit given do Snap-Forum user Dardoro
            */
        function arr2Str(arr) { 
            return arr.reduce((acc, b) => acc + String.fromCharCode(b), "");
        };
        
        let ide = world.children[0],
            url = event.dataTransfer?.getData( "text/uri-list"),
            file = event.dataTransfer?.files?.[0],
            menu = new MenuMorph(this, "Process Dropped Object");

        pic.onload = () => {
            canvas = newCanvas(new Point(pic.width, pic.height), true);
            canvas.getContext('2d').drawImage(pic, 0, 0);

            (async () => {
                if (!file && url) {
                    file = await fetch("https://api.allorigins.win/raw?url="+url)
                };
                let buff = new Uint8Array(await file?.arrayBuffer()),
                    strBuff = arr2Str(buff),
                    blocks;
                
                strBuff.includes("Snap\tBlocks\tEmbedded") 
                    ? blocks = decodeURIComponent(escape((strBuff)?.split("Snap\tBlocks\tEmbedded")[1]))
                    : blocks = null;

                if (blocks) { 
                    menu.addItem(
                        "Interpret script pic as blocks.", 
                        () => {
                            ide.droppedText(blocks, file.name, "");
                        },
                        "Interpret the code within\nthis script pic as code."
                    )
                    menu.addItem(
                        "Interpret script pic as an image.",
                        () => {
                            trg.droppedImage(canvas, aFile.name);
                            bulkDrop();
                        },
                        "Interpret the code within\nthis script pic as an image."
                    )
                    menu.popUpCenteredInWorld(this.world);
                } else {
                    trg.droppedImage(canvas, aFile.name);
                    bulkDrop();
                }
            })()
        };

        frd = new FileReader();
        frd.onloadend = (e) => pic.src = e.target.result;
        frd.readAsDataURL(aFile);
    }

    function readAudio(aFile) {
        var snd = new Audio(),
            frd = new FileReader(),
            trg = target;
        while (!trg.droppedAudio) {
            trg = trg.parent;
        }
        frd.onloadend = (e) => {
            snd.src = e.target.result;
            trg.droppedAudio(snd, aFile.name);
            bulkDrop();
        };
        frd.readAsDataURL(aFile);
    }

    function readText(aFile) {
        var frd = new FileReader(),
            trg = target;
        while (!trg.droppedText) {
            trg = trg.parent;
        }
        frd.onloadend = (e) => {
            trg.droppedText(e.target.result, aFile.name, aFile.type);
            bulkDrop();
        };
        frd.readAsText(aFile);
    }

    function readBinary(aFile) {
        var frd = new FileReader(),
            trg = target;
        while (!trg.droppedBinary) {
            trg = trg.parent;
        }
        frd.onloadend = (e) => {
            trg.droppedBinary(e.target.result, aFile.name);
            bulkDrop();
        };
        frd.readAsArrayBuffer(aFile);
    }

    function beginBulkDrop() {
        var trg = target;
        while (!trg.beginBulkDrop) {
            trg = trg.parent;
        }
        trg.beginBulkDrop();
    }

    function bulkDrop() {
        var trg = target;
            fileCount -= 1;
        if (files.length > 1 && fileCount === 0) {
            while (!trg.endBulkDrop) {
                trg = trg.parent;
            }
            trg.endBulkDrop();
        }
    }

    function readURL(url, callback) {
        var request = new XMLHttpRequest();
        request.open('GET', url);
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.responseText) {
                    callback(request.responseText);
                } else {
                    throw new Error('unable to retrieve ' + url);
                }
            }
        };
        request.send();
    }

    function parseImgURL(html) {
        var iurl = '',
            idx,
            c,
            start = html.indexOf('<img src="');
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
        fileCount = files.length;
        if (fileCount > 1) {
            beginBulkDrop();
        }
        for (i = 0; i < files.length; i += 1) {
            file = files[i];
            suffix = file.name.slice(
                file.name.lastIndexOf('.') + 1
            ).toLowerCase();
            if (file.type.indexOf("svg") !== -1
                    && !MorphicPreferences.rasterizeSVGs) {
                readSVG(file);
            } else if (file.type.indexOf("image") === 0) {
                readImage(file);
            } else if (file.type.indexOf("audio") === 0 ||
                    file.type.indexOf("ogg") > -1) {
                    // check the file-extension because Firefox
                    // thinks OGGs are videos
                readAudio(file);
            } else if ((file.type.indexOf("text") === 0) ||
                    contains(['txt', 'csv', 'json'], suffix)) {
                    // check the file-extension because Windows
                    // doesn't specify CSVs to be text/csv, sigh
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
                    var pic = new Image();
                    pic.onload = () => {
                        target.droppedSVG(
                            pic,
                            url.slice(
                                url.lastIndexOf('/') + 1,
                                url.lastIndexOf('.')
                            )
                        );
                    };
                    pic.src = 'data:image/svg+xml;utf8,' +
                        encodeURIComponent(txt);
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
};