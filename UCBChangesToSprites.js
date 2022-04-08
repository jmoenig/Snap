// SpriteIconMorph menu

SpriteIconMorph.prototype.userMenu = function () {
    var menu = new MenuMorph(this);

    if (this.object instanceof StageMorph) {
        menu.addItem(
            'pic...',
            () => {
                var ide = this.parentThatIsA(IDE_Morph);
                ide.saveCanvasAs(
                    this.object.fullImage(),
                    this.object.name
                );
            },
            'save a picture\nof the stage'
        );
        if (this.object.trailsLog.length) {
            menu.addItem(
                'svg...',
                () => this.object.exportTrailsLogAsSVG(),
                'export pen trails\nline segments as SVG'
            );
        }
        return menu;
    }
    if (!(this.object instanceof SpriteMorph)) {return null; }
    menu.addItem("show", 'showSpriteOnStage');
    menu.addLine();
    menu.addItem("duplicate", 'duplicateSprite');
    if (StageMorph.prototype.enableInheritance) {
        menu.addItem("clone", 'instantiateSprite');
    }
    menu.addItem("delete", 'removeSprite');
    menu.addLine();
    if (StageMorph.prototype.enableInheritance) {
        /* version that hides refactoring capability unless shift-clicked
        if (this.world().currentKey === 16) { // shift-clicked
            menu.addItem(
                "parent...",
                'chooseExemplar',
                null,
                new Color(100, 0, 0)
            );
        }
        */
        menu.addItem("parent...", 'chooseExemplar');
        if (this.object.exemplar) {
            menu.addItem(
                "release",
                'releaseSprite',
                'make temporary and\nhide in the sprite corral'
            );
        }
    }
    if (this.object.anchor) {
        menu.addItem(
            localize('detach from') + ' ' + this.object.anchor.name,
            () => this.object.detachFromAnchor()
        );
    }
    if (this.object.parts.length) {
        menu.addItem(
            'detach all parts',
            () => this.object.detachAllParts()
        );
    }
    menu.addItem("export...", 'exportSprite');

    function injectScriptPic(ide, xml, pic) {
        const inbDelim = "Snap\tBlocks\tEmbedded";      // in-band XML delimeter

        const crc32 = (str, crc) => {
            let table = [...Array(256).keys()].map(it => 
                [...Array(8)].reduce((cc) => 
                (cc & 1) ? (0xedb88320 ^ (cc >>> 1)) : (cc >>> 1), it)
                );
            crc = [...str].reduce((crc, ch) => { 
                return (crc >>> 8) ^ table[(crc ^ ch.charCodeAt(0)) & 0xff]
            }, (crc ||= 0) ^ (-1));
            return ( crc ^ (-1) ) >>> 0;
        };
        const arr2Str = (arr) => { 
            return arr.reduce((res, byte) => res + String.fromCharCode(byte), '');
        };
        const int2BStr = (val) => { 
            return arr2Str(Array.from(new Uint8Array(new Uint32Array( [val] ).buffer)).reverse());
        };
        const buildChunk = (data) => { 
            let res = "iTXt" + data; 
            return int2BStr(data.length) + res + int2BStr(crc32(res));
        };

        let parts = pic.toDataURL("image/png").split(","),
            bPart = atob(parts[1]).split("");
        let newChunk = buildChunk("Snap!_XML\0\0\0\0\0"+inbDelim+xml+inbDelim),
            name = top?.definition?.spec || top.selector;
        bPart.splice(-12, 0, ...newChunk);
        parts[1] = btoa(bPart.join(""));
        ide.saveFileAs(parts.join(','), 'image/png', name);
    }

    menu.addItem("sprite and xml...", 
        () => {
            var ide = this.parentThatIsA(IDE_Morph),
                xml = this.object.toXMLString(),
                pic = this.object.getImage();
            
            injectScriptPic(ide, xml, pic);
        },
        "export this sprite and its xml"
    )

    return menu;
};