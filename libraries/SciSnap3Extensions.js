//================= start options ============================================================
//a new logo --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_SetSciSnapLogo()',
  function () {
    IDE_Morph.prototype.createLogo = function () {
      var myself = this;
      if (this.logo) {
        this.logo.destroy();
      }
      this.logo = new Morph();
      this.logo.texture = "data:image/png;base64," +
        "iVBORw0KGgoAAAANSUhEUgAAADwAAAAYCAYAAACmwZ5SAAAIPklEQVR42sWYBXjbSBbHFSpTb" +
        "EHAECgzHSwzMzMz827w4mVmDEhyksUyH1+5R21Thji2pVCZGXX/GY1lvixX3/e+4Tfzmwe2xB" +
        "mG0bF4uFQUKaF20+eSqCvSuZrMPx2U+cmaKrS3eAWjtVYwdEXwaYr4DvouXl+Zw4fWzPZw6VQP" +
        "6idSOpwwbhyXFqq3qEK/oCq8rgGqrU4wNn0lGkGFP4y+TQAMagqvody15WvR2Iwx1NcGZPG5lh" +
        "qHzdI5G+AnHhjWAxgVA1bgmDUjYHHw2wGwYf8kyYAFt2iKpGiqdHeLyp+p1QijfIptsO7NGqLJ" +
        "4kk65gK+Htbes2eChEsR1uiqcJ21MdvrxAAzuGiJhoXbPrlrHLGmZARk90trP/993vdR7q/i+8" +
        "MbXoHs2fqNSC7qa61Oyo/cYxzECpckQh+PkXrddePSfhYLr/ZwnRCTBcRC+me9MyNh/TX8JcR9" +
        "g3LWmqCS9zsuwUPmL64ck0HcNVGsttQLfWHxzwBuQLYiBJ4IqlyX73NAtkMKq3x/sOgnGjio8k" +
        "/CXQ9oChF+Heqnkf6NdVJ3XeG/CyrZ4zaP47rRlWPa0667eX7nS29amHbWVf9OPfmq5en0QNGH" +
        "SZnt8aQbs8+MiletNvekoJI1i3hKUBVXaIr90aDaJ8/AZbFLMuEgiQ5+6nWLU34sMJ4wsO5FzH" +
        "n5eoBOINkW5QpY9qZYy6588Nybtj0z9GWj1HVuSMlJ1yxOGXPZ4k70Lu5fnEFcD0Iv4EiJ+/Kt" +
        "j13UebbnzDS6Ybn7rMPFecVLnj77g4DimqYpOS2aKja11IrNrbXiAuw3D5l+NmQ8+qqbvdJ76H" +
        "sOMpac8+SrF3ec8MrcN+N8jyQHjolhJJjXALwElv4HsWxYkXOSUeYyQgKllf9342LneXReufMK" +
        "2i51ytHrneN/iaQE3eMglomH2P0pQ2yB9CgLm2KC+6ptDrj2bk3lP4y4tUHmQZ1PGc8UiCi/BP" +
        "Bxo6KD39VyxwX0QivcfRjkW0bRQLtR4nybtiucOb8G8CB7U1o0MA7l+6hvZ5pgxjm6IqnMI+4d" +
        "oeRSesAS1+iQ2wD6oFHsGmzNecGdB7CBUZsD1AR3jWGWvdS0tvtMur7UcSFpW3oqsvmEl/B8rg" +
        "MXbGV3a01Z3gDjQ5yblMmBMwbbm1LjshfNrij9lZkuWHgj5B+WEihkB/YmuVUlwtXnxLl0Rd9e" +
        "bOwP8WudQ9jYRFKyNQ9G6J6bKAyYAeZj/WE29nQS4M5DMqOBo/5NBRXxxQOTJQPAC9u/7slbG5" +
        "SGYtj5kVGcOzzstu6TzM0dX6AsN+e4r04Qw9Xs4Aosfko8sPM/zPI7Ua83def+ztTtfBBrPjDr" +
        "7t+HgCF/gf7LcFmNWLM6GfCwTD+Aw0+KwYCbvcLpAF2HxPUfxPAqv8yPjbFGMWQ3O8STzF3vN+" +
        "PRnWUlp3KMxQLTMddjGN/ALu7FKGCECZtTizmLwmvy3Ka7O2ymPtc1FjByAq2jRHtvJPDIrMYM" +
        "Agd37jY4058StrBlXS4VsHMAO09XhGtR3xJQxdviXPAZqTs2lU1ILjUaOHmWjpIS17vMK3LDFn" +
        "bcFQJG35KIS3oN4/+FtFoX8z2AB9oae1IL2/xd+9q2WsDWz5Ku8vdt/pq+DNzUUmvPBfhOJK5P" +
        "w9bNHRGRfR81IR19vy9w9Pqccxjk6RYw3DYM7FppzkOf6Q11uKQKVr/9ewL3oRa2RbszPQABhE" +
        "XbIGvoX81xXCdN4dcgntcxt72EblDsOicqaxfFA6M+DQfwRAEju0daB3Bj2dhpFnC5BfwdpJGB" +
        "fIjxjVbijAFG/d8sLD7Emj2WbsgwW2PvpH+3NFV8d9u3ohFQ+Hutv4EyX7X921yDtoty7CyTTk" +
        "X5OSzTRtsssVgZFDHO5t2TIGkdQHuzud5pZuRncUnxwFMxrjPXv9cEc1yJ8k/xwCw7Iy9AGggP" +
        "ypdo0nvX0dVMWk3Ug62HvOPCsvsgK/GT1DsErCv8pdu+zaJQVnJiCQsKd+BgVnyzGz7CYP9Cwi" +
        "TepV3XYmwbO+herHnC7I8GRv3PkFYzLPIlrJnH9E6Jd2m4vhnbx0kOAI7l0mFgf6fB9kA4hhGn" +
        "445MyzLIaxxRtLiSyzBfKPK6oG+iMSub/NGfYczneiDz2b+58vHTuSTPSY6l2Wdws+nvucfjST" +
        "VeKIhzq81PDxs4zB4ovI4z0mLH+iLRJGobRa7MMZyRMcDuL6Sw4RieMQgWBFQ6jVfBZ/05SfrA" +
        "dZ/R8RWDvMSbB+VSQ7/LWrWUr6n8DOLuQdnR0lTT9x2fXPCwX3Y/5pOHXDbL4+kV+gTk8cxOO/" +
        "NMAgvrskQYkAcMaKwZ9IRfdhX5awpe8Mv9i3zVfa16ZJ8P5bqqMSVtddxD6ypHl/hrBrwQVHOs" +
        "8dgxAnzgZdfSWH3JdCf+xIODhkuz3l6Z002Txat0xf4hLD5JU8TxQUVai3Jps7czvXHfrL6dCT" +
        "QR6iFsrebln9EU+7agyk/TVfsUTRZmaIo0PVSP6lMyp/oV98z2Om4mDjtTV/tMwX6zQuOxYwR4" +
        "/6s5rbH6kulOCBwLT6xttdmHAtPdhZEk5nVZuD7pepoHhOkImU9CF7f6U6EHKa16ZN/0nG4b64" +
        "Z3b6/kui2nJWlLtAx5XJQgkSGGz+bwXMfex7/fFw/LhZN/6kn0tREWfg8wCwKARnmx5hWvIZ6A" +
        "jH91s1c8X/MKL6N/bYsqDftZ3oJggO/xVaND+d6bkUshLxjUfdG3fVxm7yBcvL2efrY5ouHrJc" +
        "qjiPlDukr79uiKeKuVCCHkE1CsjBt3XRr5aOCBkMtNNMcyxs8g/wNEIKQzeRECpwAAAABJRU5E" +
        "rkJggg==";
      this.logo.render = function (ctx) {
        var gradient = ctx.createLinearGradient(0, 0, this.width(), 0);
        gradient.addColorStop(0, 'black');
        gradient.addColorStop(0.5, myself.frameColor.toString());
        ctx.fillStyle = MorphicPreferences.isFlat ? myself.frameColor.toString() : gradient;
        ctx.fillRect(0, 0, this.width(), this.height());
        if (this.cachedTexture) {
          this.renderCachedTexture(ctx);
        } else if (this.texture) {
          this.renderTexture(this.texture, ctx);
        }
      };
      this.logo.renderCachedTexture = function (ctx) {
        ctx.drawImage(this.cachedTexture, 5, Math.round((this.height() - this.cachedTexture.height) / 2));
        this.changed();
      };
      this.logo.mouseClickLeft = function () {
        myself.snapMenu();
      };
      this.logo.color = BLACK;
      this.logo.setExtent(new Point(200, 28)); // dimensions are fixed
      this.add(this.logo);
    };
    var stage = this.parentThatIsA(StageMorph), ide = stage.parentThatIsA(IDE_Morph), world = stage.parentThatIsA(WorldMorph);
    ide.createLogo();
    ide.createControlBar();
    ide.fixLayout();
  });
// new menu items --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_addMenuItemForSciSnapManuals()',
  function () {
    IDE_Morph.prototype.snapMenu = function () {
      var menu, world = this.world();
      menu = new MenuMorph(this);
      menu.addItem('About...', 'aboutSnap');
      menu.addLine();
      menu.addItem('Reference manual', () => {
        var url = this.resourceURL('help', 'SnapManual.pdf');
        window.open(url, 'SnapReferenceManual');
      });
      menu.addItem('Snap! website', () => window.open('https://snap.berkeley.edu/', 'SnapWebsite'));
      menu.addItem('SciSnap! manual', () => window.open('https://emu-online.de/ProgrammingWithSciSnap3.pdf', ''));
      menu.addItem('SciSnap! Handbuch', () => window.open('https://emu-online.de/ProgrammierenMitSciSnap3.pdf', ''));
      menu.addItem('Download source', () => window.open('https://github.com/jmoenig/Snap/releases/latest', 'SnapSource'));
      if (world.isDevMode) {
        menu.addLine();
        menu.addItem('Switch back to user mode', 'switchToUserMode', 'disable deep-Morphic\ncontext menus' + '\nand show user-friendly ones',
          new Color(0, 100, 0));
      } else if (world.currentKey === 16) { // shift-click   
        menu.addLine();
        menu.addItem('Switch to dev mode', 'switchToDevMode', 'enable Morphic\ncontext menus\nand inspectors,' + '\nnot user-friendly!', new Color(100, 0, 0));
      }
      menu.popup(world, this.logo.bottomLeft());
    };
  });

//================= additional options of the Pen-palette ============================================================
//make a drip --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_drip(xa,ya,width,height,dx,dy,color,costume,n)',
  function (xa, ya, width, height, dx, dy, color, costume, n) {
    var ctx = costume.contents.getContext('2d'), r = color.at(1), g = color.at(2), b = color.at(3),
      radius = Math.min(width, height) / 4, xm = xa + (width + dx) / 2, ym = ya + (height + dy) / 2, alpha, crad, nr, ng, nb;
    for (i = 0; i < n; i++) {
      ctx.beginPath();
      x = xm + Math.random() * width / 2;
      y = ym + Math.random() * height / 2;
      dist = Math.sqrt((x - xm) * (x - xm) + (y - ym) * (y - ym));
      if (dist < radius)
        crad = Math.random() * dist;
      else
        crad = Math.random() * 20 * radius / dist;
      nr = Math.abs(1.0 * r + 50.0 - 100.0 * Math.random());
      if (nr > 255)
        nr = 255;
      ng = Math.abs(1.0 * g + 50.0 - 100.0 * Math.random());
      if (ng > 255)
        ng = 255;
      nb = Math.abs(1.0 * b + 50.0 - 100.0 * Math.random());
      if (nb > 255)
        nb = 255;
      ctx.fillStyle = new Color(nr, ng, nb).toString();
      ctx.strokeStyle = ctx.fillStyle;
      alpha = 1 - Math.sqrt(Math.abs((x - xm) / width));
      if (alpha < 0.01)
        alpha = 0.01;
      for (var m = 1; m <= 20; m++) {
        ctx.beginPath();
        ctx.globalAlpha = m * alpha / 20;
        ctx.arc(x, y, Math.abs(crad * (1 - (m - 1) * 0.04)), 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
      }
    }
    return costume;
  });

//================= additional options of the Looks-palette ============================================================
//new costume --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_newcostume(w,h,color)',
  function (w, h, color) {
    var newCostume = new Costume();
    newCostume.contents.width = w;
    newCostume.contents.height = h;
    var ctx = newCostume.contents.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = new Color(color.at(1), color.at(2), color.at(3)).toString();
    ctx.strokeStyle = new Color(color.at(1), color.at(2), color.at(3)).toString();
    ctx.fillRect(0, 0, w, h);
    ctx.strokeRect(0, 0, w, h);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    newCostume.rotationCenter = new Point(w / 2, h / 2);
    return newCostume;
  });
//rename costume --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_renameCostume(costume,newName)', function (costume, newName) {
  costume.name = newName;
});
//show global message --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_showmessage(title,message)', function (title, message) {
  this.parentThatIsA(IDE_Morph).inform(title, message);
});
//layer --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_layer()', function () {
  if (!this.parent) {
    return null;
  }
  return this.parent.children.indexOf(this);
});
//show as dialog --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_showAsDialog(theList)', function (theList) {
  new TableDialogMorph(theList).popUp(this.world());
});
//set cursor --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_setCursor(cur,proc)', function (cur, proc) { //Many thanks to helicoptur on the Snap! user forum!
  function setTo(val) {
    document.body.style.cursor = val;
    top.window.document.body.style.cursor = val;
  }
  if (cur instanceof Costume || this.costumes.asArray().map(e => e.name).includes(cur) || cur === 'current') {
    alert("Sorry, costumes don't work very well for custom cursors at the moment.");
    return;
    let c = newCanvas(), ctx = c.getContext('2d');
    cur = proc.reportNewCostumeStretched(cur, 100, 100);
    c.width = cur.width();
    c.height = cur.height();
    ctx.drawImage(cur.contents, 0, 0);
    setTo('url("' + c.toDataURL() + '"), auto');
  } else if (`auto cell copy crosshair default grab grabbing help move not-allowed pointer progress text wait zoom-in zoom-out n-resize s-resize e-resize w-resize ne-resize se-resize nw-resize sw-resize`.split(' ').includes(cur))
  {
    setTo(cur);
  } else {
    setTo('url("' + cur + '"),auto');
  }
});

//================= additional options of the Control-palette ============================================================
//select a sprite as active sprite -------------------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_selectSprite(sprite)',
  function (sprite) {
  if((typeof(sprite) !== 'object')||(sprite===null)) return;
    var ide = this.parentThatIsA(IDE_Morph);
    ide.selectSprite(sprite, true);
  });
//create sprites, permanent clones , or duplicates --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_createObject(operation,sprite,spriteName)',
  function (operation, sprite, spriteName) {
  if((typeof(sprite) !== 'object')||(sprite===null)) return;
    var stage = this.parentThatIsA(StageMorph), ide = stage.parentThatIsA(IDE_Morph), world = stage.parentThatIsA(WorldMorph), result, hats;
    if (spriteName === "")
      spriteName = "notSet";
    if ((sprite === "")&&!(operation==="newSprite"))
      sprite = this;
    if (operation === 'duplicate') {
      return ide.duplicateSprite(sprite);
      }
    if (operation === 'permanentClone') {
      result = sprite.createClone();
      result.perpetuate();
      return null;
    }
    if (operation === 'newSprite') {
      ide.addNewSprite();
      return null;
    }
    return "ERROR: unknown operation";
  });
//import a stored sprite --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_importSprite(params)', //params: parte 1 or two, ev. data
  function (params) {
    if (Number(params.at(1)) === 1) {
      var inp = document.createElement('input'), ide = this.parent.parent, result = 0, done = false;
      function userImport() {
        function txtOnlyMsg(ftype, anyway) {
          ide.confirm('Snap! can only import "text" files.\n' + 'You selected a file of type "' + ftype + '".' + '\n\n' + 'Open anyway?', 'Unable to import', anyway);
        }
        function readText(aFile) {
          var frd = new FileReader(), ext = aFile.name.split('.').pop().toLowerCase();
          function isXMLFile(aFile) {
            return aFile.type.indexOf('xml') !== -1 || contains(['xml']);
          }
          function isType(aFile, string) {
            return aFile.type.indexOf(string) !== -1 || (ext === string);
          }
          frd.onloadend = function (e) {
            done = true;
            if (isType(aFile, 'xml')) {
              result = e.target.result;
            }
          };
          if (isXMLFile(aFile)) {
            frd.readAsText(aFile);
          } else {
            txtOnlyMsg(aFile.type, function () {
              frd.readAsText(aFile);
            });
          }
        }
        if (ide.filePicker) {
          document.body.removeChild(ide.filePicker);
          ide.filePicker = null;
        }
        if (inp.files.length > 0) {
          readText(inp.files[inp.files.length - 1]);
        }
      }
      inp.type = 'file';
      inp.style.color = "transparent";
      inp.style.backgroundColor = "transparent";
      inp.style.border = "none";
      inp.style.outline = "none";
      inp.style.position = "absolute";
      inp.style.top = "0px";
      inp.style.left = "0px";
      inp.style.width = "0px";
      inp.style.height = "0px";
      inp.style.display = "none";
      inp.addEventListener("change", userImport, false);
      document.body.appendChild(inp);
      ide.filePicker = inp;
      inp.click();
      return function () {
        return new List([done, result]);
      };
    } else if (Number(params.at(1)) === 2) {
      var stage = this.parentThatIsA(StageMorph), ide = stage.parentThatIsA(IDE_Morph), world = stage.parentThatIsA(WorldMorph), thisObj = this, cats = SpriteMorph.prototype.categories,
        colors = SpriteMorph.prototype.blockColor, data = params.at(2), i = 0, index = -1;
      ide.openSpritesString(data);
    }
  });
//remove sprite --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_removeSprite(sprite)', function (sprite) {
  if((typeof(sprite) !== 'object')||(sprite===null)) return;
  var stage = this.parentThatIsA(StageMorph), ide = stage.parentThatIsA(IDE_Morph);
  ide.removeSprite(sprite);
});
//change sprite name --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_changeSpritenameTo(sprite,newName)', function (sprite,newName) {
  if((typeof(sprite) !== 'object')||(sprite===null)) return;
  var stage = this.parentThatIsA(StageMorph), ide = stage.parentThatIsA(IDE_Morph), world = stage.parentThatIsA(WorldMorph);
  ide.spriteBar.nameField.setContents(newName);
  ide.spriteBar.nameField.fixLayout();
  sprite.name = newName;
  ide.recordUnsavedChanges();
  ide.createCorral();
  ide.fixLayout();
});
//attach/detach parts to the current sprite --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_attach part(choice,part)', function (choice, part) {
  if((typeof(part) !== 'object')||(part===null)) return;
  if (choice === "attach")
    this.attachPart(part);
  else if (choice === "detach")
    this.detachAllParts();
});
//adds dynamically an event-handler to a sprite --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_installEventHandler(data)', function (data) {
  var stage = this.parentThatIsA(StageMorph), ide = stage.parentThatIsA(IDE_Morph), world = stage.parentThatIsA(WorldMorph), object = ide.currentSprite, scripts = object.scripts, xml;
  if (Process.prototype.isCatchingErrors) {
    try {
      xml = ide.serializer.parse(data, true);
      ide.serializer.loadScripts(object, scripts, xml);
    } catch (err) {
      ide.showMessage('Load failed: ' + err);
    }
  } else {
    xml = ide.serializer.parse(data, true);
    ide.serializer.loadScripts(object, scripts, xml);
  }
  scripts.changed();
  ide.spriteBar.tabBar.tabTo('scripts');
});
//adds statically an event-handler to a sprite or removes it --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_onEventRun(aFunction,event)', function (aFunction, event) {
  if (event === 'mouseClickLeft') {
    if (aFunction === 'reset')
      this.mouseClickLeft = SpriteMorph.prototype.mouseClickLeft;
    else
      this.mouseClickLeft = function (pos) {
        invoke(aFunction, null, null, 1000, "too long", true, null, true);
      }
  }
  if (event === 'mouseClickRight') {
    if (aFunction === 'reset')
      this.mouseClickRight = SpriteMorph.prototype.mouseClickRight;
    else
      this.mouseClickRight = function (pos) {
        invoke(aFunction, null, null, 1000, "too long", true, null, true);
      }
  }
  if (event === 'mouseDownLeft') {
    if (aFunction === 'reset')
      this.mouseDownLeft = SpriteMorph.prototype.mouseDownLeft;
    else
      this.mouseDownLeft = function (pos) {
        invoke(aFunction, null, null, 1000, "too long", true, null, true);
      }
  }
  if (event === 'mouseDownRight') {
    if (aFunction === 'reset')
      this.mouseDownRight = SpriteMorph.prototype.mouseDownRight;
    else
      this.mouseDownRight = function (pos) {
        invoke(aFunction, null, null, 1000, "too long", true, null, true);
      }
  }
  if (event === 'mouseDoubleClick') {
    if (aFunction === 'reset')
      this.mouseDoubleClick = SpriteMorph.prototype.mouseDoubleClick;
    else
      this.mouseDoubleClick = function (pos) {
        invoke(aFunction, null, null, 1000, "too long", true, null, true);
      }
  }
  if (event === 'mouseEnter') {
    if (aFunction === 'reset')
      this.mouseEnter = SpriteMorph.prototype.mouseEnter;
    else
      this.mouseEnter = function (pos) {
        invoke(aFunction, null, null, 1000, "too long", true, null, true);
      }
  }
  if (event === 'mouseLeave') {
    if (aFunction === 'reset')
      this.mouseLeave = SpriteMorph.prototype.mouseLeave;
    else
      this.mouseLeave = function (pos) {
        invoke(aFunction, null, null, 1000, "too long", true, null, true);
      }
  }
  if (event === 'mouseMove') {
    if (aFunction === 'reset')
      this.mouseMove = SpriteMorph.prototype.mouseMove;
    else
      this.mouseMove = function (pos, button) {
        invoke(aFunction, null, null, 1000, "too long", true, null, true);
      }
  }
  if (event === 'mouseScroll') {
    if (aFunction === 'reset')
      this.mouseScroll = SpriteMorph.prototype.mouseScroll;
    else
      this.mouseScroll = function (pos, button) {
        invoke(aFunction, null, null, 1000, "too long", true, null, true);
      }
  }
  if (event === 'mouseEnterDragging') {
    if (aFunction === 'reset')
      this.mouseEnterDragging = SpriteMorph.prototype.mouseEnterDragging;
    else
      this.mouseEnterDragging = function (morph) {
        invoke(aFunction, null, null, 1000, "too long", true, null, true);
      }
  }
  if (event === 'mouseLeaveDragging') {
    if (aFunction === 'reset')
      this.mouseLeaveDragging = SpriteMorph.prototype.mouseLeaveDragging;
    else
      this.mouseLeaveDragging = function (morph) {
        invoke(aFunction, null, null, 1000, "too long", true, null, true);
      }
  }
  if (event === 'mouseEnterBounds') {
    if (aFunction === 'reset')
      this.mouseEnterBounds = SpriteMorph.prototype.mouseEnterBounds;
    else
      this.mouseEnterBounds = function (morph) {
        invoke(aFunction, null, null, 1000, "too long", true, null, true);
      }
  }
  if (event === 'mouseLeaveBounds') {
    if (aFunction === 'reset')
      this.mouseLeaveBounds = SpriteMorph.prototype.mouseLeaveBounds;
    else
      this.mouseLeaveBounds = function (morph) {
        invoke(aFunction, null, null, 1000, "too long", true, null, true);
      }
  }
});
//is sprite deleted? --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_isDeleted(sprite)', function (sprite) {
  if((typeof(sprite) !== 'object')||(sprite===null)) return true;
  return thisSprite.isCorpse;
});

//================= additional options of the Sensing-palette ============================================================
//is shift-key pressed? --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_currentKeyPressed()', function () {
  return this.world().currentKey;
});
//settings --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_setting(which)', //copied from Snap! library
  function (which) {
    var stage = this.parentThatIsA(StageMorph), ide = stage.parentThatIsA(IDE_Morph), world = stage.parentThatIsA(WorldMorph);
    switch (which) {
      case 'Project notes':
        return ide.projectNotes;
      case 'Project name':
        return ide.projectName;
      case 'User':
        return ide.cloud.username;
      case 'Presentation mode':
        return ide.isAppMode;
      case 'Language':
        return SnapTranslator.language;
      case 'Zoom blocks':
        return SyntaxElementMorph.prototype.scale;
      case 'Stage size':
        return new List([stage.dimensions.x, stage.dimensions.y]);
      case 'Stage scale':
        return stage.scale;
      case 'Retina display support':
        return isRetinaEnabled();
      case 'Long form input dialog':
        return InputSlotDialogMorph.prototype.isLaunchingExpanded;
      case 'Plain prototype labels':
        return BlockLabelPlaceHolderMorph.prototype.plainLabel;
      case 'Input sliders':
        return MorphicPreferences.useSliderForInput;
      case 'Execute on slider change':
        return ArgMorph.prototype.executeOnSliderEdit;
      case 'Clicking sound':
        return !!BlockMorph.prototype.snapSound;
      case 'Turbo mode':
        return stage.isFastTracked;
      case 'Flat design':
        return MorphicPreferences.isFlat;
      case 'Keyboard editing':
        return !!this.scripts.focus;
      case 'Visible stepping':
        return Process.prototype.enableSingleStepping;
      case 'Thread safe scripts':
        return stage.isThreadSafe;
      case 'Prefer smooth animations':
        return StageMorph.prototype.frameRate > 0;
      case 'Flat line ends':
        return SpriteMorph.prototype.useFlatLineEnds;
      case 'Codification support':
        return StageMorph.prototype.enableCodeMapping;
      case 'Inheritance support':
        return StageMorph.prototype.enableInheritance;
      case 'Hyper blocks support':
        return Process.prototype.enableHyperOps;
      case 'Visible palette':
        return ide.currentCategory;
      default:
        return which;
      }
  });
//set flag to --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_setFlagTo(which,tf)', //copied from Snap! library
  function (which, tf) {
    var stage = this.parentThatIsA(StageMorph), ide = stage.parentThatIsA(IDE_Morph), world = stage.parentThatIsA(WorldMorph), thisObj = this;
    if (tf != !!tf)
      return;
    try {
      ide.savingPreferences = false;
      switch (which) {
        case 'Presentation mode':
          if (tf != ide.isAppMode)
            ide.toggleAppMode();
          break;
        case 'Retina display support':
          if (tf != isRetinaEnabled())
            ide.toggleRetina();
          break;
        case 'Long form input dialog':
          if (tf != InputSlotDialogMorph.prototype.isLaunchingExpanded)
            ide.toggleLongFormInputDialog();
          break;
        case 'Plain prototype labels':
          if (tf != BlockLabelPlaceHolderMorph.prototype.plainLabel)
            ide.togglePlainPrototypeLabels();
          break;
        case 'Input sliders':
          MorphicPreferences.useSliderForInput = tf;
          break;
        case 'Execute on slider change':
          ArgMorph.prototype.executeOnSliderEdit = tf;
          break;
        case 'Clicking sound':
          if (tf != !!BlockMorph.prototype.snapSound)
            BlockMorph.prototype.toggleSnapSound();
          break;
        case 'Turbo mode':
          if (tf != stage.isFastTracked)
            ide.toggleFastTracking();
          break;
        case 'Flat design':
          if (tf == MorphicPreferences.isFlat)
            break;
          if (tf)
            ide.flatDesign();
          else
            ide.defaultDesign();
          break;
        case 'Keyboard editing':
          if (thisObj.scripts.focus && !tf) {
            thisObj.scripts.focus.stopEditing();
          } else if (tf && !thisObj.scripts.focus) {
            thisObj.scripts.toggleKeyboardEntry();
          }
          ;
          break;
        case 'Visible stepping':
          if (tf != Process.prototype.enableSingleStepping)
            ide.toggleSingleStepping();
          break;
        case 'Thread safe scripts':
          stage.isThreadSafe = tf;
          break;
        case 'Prefer smooth animations':
          if (tf != (StageMorph.prototype.frameRate > 0))
            ide.toggleVariableFrameRate();
          break;
        case 'Flat line ends':
          SpriteMorph.prototype.useFlatLineEnds = tf;
          break;
        case 'Codification support':
          if (tf != StageMorph.prototype.enableCodeMapping) {
            StageMorph.prototype.enableCodeMapping = tf;
            ide.currentSprite.blocksCache.variables = null;
            ide.currentSprite.paletteCache.variables = null;
            ide.refreshPalette();
          }
          break;
        case 'Inheritance support':
          if (tf != StageMorph.prototype.enableInheritance) {
            StageMorph.prototype.enableInheritance = tf;
            ide.currentSprite.blocksCache.variables = null;
            ide.currentSprite.paletteCache.variables = null;
            ide.refreshPalette();
          }
          break;
        case 'Hyper blocks support':
          Process.prototype.enableHyperOps = tf;
          break;
      }
      ;
    } finally {
      ide.savingPreferences = false;
    }
    ;
  });
//set value to --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_setValueTo(which,value)',
  function (which, value) {
    var stage = this.parentThatIsA(StageMorph), ide = stage.parentThatIsA(IDE_Morph), world = stage.parentThatIsA(WorldMorph);
    try {
      ide.savingPreferences = false;
      switch (which) {
        case 'Project notes':
          ide.projectNotes = value;
          break;
        case 'Project name':
          ide.setProjectName(value);
          break;
        case 'Language':
          ide.setLanguage(value);
          break;
        case 'Zoom blocks':
          if (!isNaN(value))
            ide.setBlocksScale(Math.min(value, 12));
          break;
        case 'Stage size':
          if ((value instanceof List) && value.length() == 2 && !isNaN(value.at(1)) && !isNaN(value.at(2)))
            ide.setStageExtent(new Point(value.at(1), value.at(2)));
          break;
        case 'Stage scale':
          ide.toggleStageSize(value != 1, Math.max(0.1, value));
          break;
        case 'Visible palette':
          ide.currentCategory = value.toLowerCase();
          ide.categories.children.forEach(function (each) {
            each.refresh();
          });
          ide.refreshPalette(true);
          break;
        }
      ;
    } finally {
      ide.savingPreferences = true;
    }
    ;
  });

//================= additional options of the Operators-palette ============================================================
//String operations --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_stringOperations(operation,params)', //params: txt, from, to, choice, sub, replace
  function (operation, params) {
    if (operation == 'substring') {
      var txt = params.at(1), from = Number(params.at(2)) - 1, to = Number(params.at(3));
      if (to > txt.length)
        to = txt.length;
      if ((from >= 0) && (from < txt.length) && (to >= from))
        return txt.substring(from, to);
      else
        return "";
    }
    if (operation == 'delete') {
      var choice = params.at(1), sub = params.at(2), txt = params.at(3), result = txt, pos = result.indexOf(sub);
      if (choice === 'first')
        return result.replace(sub, '');
      else {
        while (pos > -1) {
          result = result.replace(sub, '');
          pos = result.indexOf(sub);
        }
        return result;
      }
    }
    if (operation == 'replace') {
      var choice = params.at(1), sub = params.at(2), replace = params.at(3), txt = params.at(4), result = txt, pos = result.indexOf(sub);
      if (choice === 'first')
        return result.replace(sub, replace);
      else {
        while (pos > -1) {
          result = result.replace(sub, replace);
          pos = result.indexOf(sub);
        }
        return result;
      }
    }
    return 'ERROR: unknown string operation!';
  });

//================= options of the SciSnap!-globals palette ============================================================
//drawing on sprites or stage --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_drawOnCostume(operation,costume,params,properties)', //params: coordinates, radius, text, height
  function (operation, costume, params, properties) {
    function property(key) {
      var i = 1;
      while (i <= properties.length()) {
        if (properties.at(i).at(1) == key)
          return properties.at(i).at(2);
        i++;
      }
      return '-';
    }
    var ctx = costume.contents.getContext('2d'), x1 = Number(params.at(1)), y1 = Number(params.at(2)), style = property('lineStyle'), lineColor = property('lineColor'), fillColor = property('fillColor');
    if (style == 'dashed') {
      ctx.setLineDash([10, 10]);
    } else if (style == 'dash-dot') {
      ctx.setLineDash([10, 5, 2, 5]);
    } else if (style == 'dot-dot') {
      ctx.setLineDash([2, 5]);
    } else {
      ctx.setLineDash([]);
    }
    ctx.lineWidth = property('lineWidth');
    ctx.strokeStyle = new Color(lineColor.at(1), lineColor.at(2), lineColor.at(3)).toString();
    ctx.fillStyle = new Color(fillColor.at(1), fillColor.at(2), fillColor.at(3)).toString();
    if (operation == 'drawLine' || operation == 'drawRect' || operation == 'fillRect') {
      var x2 = Number(params.at(3)), y2 = Number(params.at(4));
      ctx.beginPath();
      if (operation == 'drawLine') {
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.closePath();
        ctx.stroke();
      }
      if (operation == 'drawRect') {
        ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
        ctx.closePath();
        ctx.stroke();
      }
      if (operation == 'fillRect') {
        ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
        ctx.closePath();
        ctx.fill();
      }
      return costume;
    }
    if (operation == 'drawCircle' || operation == 'fillCircle') {
      var r = Number(params.at(3));
      ctx.beginPath();
      if (operation == 'drawCircle') {
        ctx.arc(x1, y1, r, 0, 6.283185307179586476925286766559);
        ctx.closePath();
        ctx.stroke();
      }
      if (operation == 'fillCircle') {
        ctx.arc(x1, y1, r, 0, 6.283185307179586476925286766559);
        ctx.closePath();
        ctx.fill();
      }
      return costume;
    }
    if (operation == 'drawText') {
      var text = params.at(3), height = Number(params.at(4)), horizontal = params.at(5);
      ctx.fillStyle = new Color(lineColor.at(1), lineColor.at(2), lineColor.at(3)).toString();
      ctx.beginPath();
      ctx.font = "" + height + "px sans-serif";
      if (horizontal)
        ctx.fillText(text, x1, y1);
      else {
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(text, -y1, x1);
        ctx.rotate(Math.PI / 2);
      }
      ctx.closePath();
      ctx.stroke();
      return costume;
    }
    if (operation == 'widthOfText') {
      ctx.font = "" + params.at(2) + "px sans-serif";
      return Math.round(ctx.measureText(params.at(1)).width);
    }
  });
//file or filelist selection --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_selectFileWithFilepicker(choice)',
  function (choice) {
    var inp = document.createElement('input'), ide = this.parent.parent, result = 0, done = false;
    function setCursor(val) {
      document.body.style.cursor = val;
      top.window.document.body.style.cursor = val;
    }
    function userImport() {
      function readDir(fs) {
        done = true;
        result = [];
        for (var i = 0; i < fs.length; i++)
          result.push(new List([fs[i].name, fs[i]]));
        result = new List(result);
        if (choice === 'file')
          result = result.at(1);
      }
      document.body.removeChild(inp);
      ide.filePicker = null;
      if (inp.files.length > 0) {
        readDir(inp.files);
      }
    }
    //Some settings for the filepicker window
    if (ide.filePicker) {
      document.body.removeChild(ide.filePicker);
      ide.filePicker = null;
    }
    inp.type = 'file';
    inp.style.color = "transparent";
    inp.style.backgroundColor = "transparent";
    inp.style.border = "none";
    inp.style.outline = "none";
    inp.style.position = "absolute";
    inp.style.top = "0px";
    inp.style.left = "0px";
    inp.style.width = "0px";
    inp.style.height = "0px";
    inp.style.display = "none";
    if (choice === 'filelist')
      inp.multiple = true;
    //Import data with function "userImport"
    inp.addEventListener("change", userImport, false);
    document.body.appendChild(inp);
    ide.filePicker = inp;
    inp.click();
    //return a list of type [done,data]
    return function () {
      return new List([done, result]);
    };
  });
//read file as BLOB --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_readFileAsBLOB(source)',
  function (source) {
    var result = 0, done = false, isFITS = false, header, properties, min = 100000, max = -100000, typeOfData = 'undefined', filename = 'unknown', sum = 0;
    function setCursor(val) {
      document.body.style.cursor = val;
      top.window.document.body.style.cursor = val;
    }
    function getFITSdataFrom(anArrayBuffer) {
      function isDefined(key) {
        var i = 0, found = false;
        while ((i < properties.length) && !found) {
          found = properties.at(i).at(1) == key;
          i++;
        }
        ;
        return found;
      }
      var hlen, key, val, width, height = 1, depth = 1, bscale = 2, bzero = 0, bitpix = 16, numberOfPixels, numberOfBytes, imagevalues = [], imageIndex, fitsIndex, view, card, n, ok;
      header = [];
      properties = [];
      //read header block and properties
      for (hlen = 0; hlen < anArrayBuffer.byteLength; hlen += 80) {
        card = String.fromCharCode.apply(null, new Uint8Array(anArrayBuffer, hlen, 80));
        header.push(card);
        if (card.substring(0, 6) === 'END   ') {
          hlen += 80;
          break;
        } //END with spaces in the rest of the line
        if (card.indexOf('=') !== -1) {
          key = card.substring(0, 8).trim();
          val = card.substring(10).trim();
          if (val[0] == "'") {
            var s = val.substring(1);
            n = s.indexOf("'");
            val = s.substring(0, n);
          } else {
            n = val.indexOf('/');
            if (n != -1)
              val = val.substring(0, n).trim();
            if (val != 'T' && val != 'F' && key != 'COMMENT' && key != 'HISTORY' && key != 'HIERARCH')
              val = Number(val);
          }
          if (key === 'NAXIS1')
            width = val;
          if (key === 'NAXIS2')
            height = val;
          if (key === 'NAXIS3')
            depth = val;
          if (key === 'BSCALE')
            bscale = val;
          if (key === 'BZERO')
            bzero = val;
          if (key === 'BITPIX')
            bitpix = val;
          properties.push(new List([key, val]));
        }
      }
      //Is this file format supported?
      ok = isDefined('SIMPLE') && isDefined('BITPIX') && isDefined('NAXIS') && isDefined('NAXIS1') && isDefined('NAXIS2');
      if (!ok)
        return new List([new List(header), new List(properties), min, max, "ERROR: mandatory keywords missing!"]);
      ok = isDefined('NAXIS3') || (Math.abs(bitpix) > 32);
      if (ok)
        return new List([new List(header), new List(properties), min, max, "ERROR: file format not supported!"]);
      //Look for start value of data blocks
      if ((hlen % 2880) > 0)
        hlen += 2880 - (hlen % 2880);
      //calculate memory place needed
      numberOfPixels = width * height;
      numberOfBytes = numberOfPixels * Math.abs(bitpix) / 8;
      //read values
      imagevalues = new Array(numberOfPixels);
      view = new DataView(anArrayBuffer, hlen, numberOfBytes);
      imageIndex = 0;
      for (var y = 0; y < height; y++) {
        fitsIndex = (height - 1 - y) * width;
        for (var x = 0; x < width; x++) {
          if (bitpix == 8)
            val = view.getUint8(fitsIndex); //8-bit unsigned integer
          if (bitpix == 16)
            val = view.getInt16(2 * fitsIndex, false); //16-bit signed integer
          if (bitpix == 32)
            val = view.getInt32(4 * fitsIndex, false); //32-bit signed integer
          if (bitpix == -32)
            val = view.getFloat32(4 * fitsIndex, false); //single precision floating point value
          imagevalues[imageIndex] = bzero + bscale * val;
          if (imagevalues[imageIndex] > max)
            max = imagevalues[imageIndex];
          if (imagevalues[imageIndex] < min)
            min = imagevalues[imageIndex];
          sum += imagevalues[imageIndex];
          imageIndex++;
          fitsIndex++;
        }
      }
      return new List([new List(header), new List(properties), min, max, sum, new List(imagevalues), filename]);
    }
    //error message, only text content allowed
    function txtOnlyMsg(ftype, anyway) {
      ide.confirm(localize('Snap! can only import "text" files.\n' + 'You selected a file of type "' + ftype + '".') + '\n\n' + localize('Open anyway?'), 'Unable to import', anyway);
    }
    function readFile(aFile) {
      filename = aFile.name;
      //test for allowed file types
      function isTextFile(aFile) {
        isFITS = contains(['fts', 'fits'], ext);
        return aFile.type.indexOf('text') !== -1 || contains(['txt', 'csv', 'xml', 'json', 'csv'], ext);
      }
      //test for a special file type
      function isType(aFile, string) {
        return aFile.type.indexOf(string) !== -1 || (ext === string);
      }
      //use a filereader
      var frd = new FileReader(), ext = aFile.name.split('.').pop().toLowerCase();
      frd.onloadend = function (e) {
        done = true;
        if (isType(aFile, 'csv')) {
          result = Process.prototype.parseCSV(e.target.result);
        } //import CSV data
        else if (isType(aFile, 'json')) {
          result = Process.prototype.parseJSON(e.target.result);
        } //import JSON data
        else if (isFITS) {
          result = getFITSdataFrom(e.target.result);
        } //import FITS data
        else {
          result = e.target.result;
        } //import text data
      };
      if (isTextFile(aFile)) {
        frd.readAsText(aFile);
      } else if (isFITS) {
        frd.readAsArrayBuffer(aFile);
      } else {
        txtOnlyMsg(aFile.type, function () {
          frd.readAsText(aFile);
        });
      } //unknown file type
    }
    result = readFile(source);
    //return a list of type [done,data]
    setCursor('default');
    return function () {
      return new List([done, result]);
    };
  });
//write to file --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_write(data,type,filename)',
  function (data, type, filename) {
    var ide = this.parentThatIsA(IDE_Morph);
    if (type == 'TEXT') {
      ide.saveFileAs(data, 'text/plain;charset=utf-8', filename);
    }
    if (type == 'DATAASTEXT') {
      ide.saveFileAs(data.asTXT(), 'text/plain;charset=utf-8', filename);
    }
    if (type == 'CSV') {
      ide.saveFileAs(data.asCSV(), 'text/csv;charset=utf-8', filename);
    }
    if (type == 'JSON') {
      ide.saveFileAs(data.asJSON(true), 'text/json;charset=utf-8', filename);
    }
  });
//fetch binary data from url --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_fetchBinary(url)',
  function (url, proc) {
    var response, i, header;
    url = decodeURI(url);
    Process.prototype.checkURLAllowed(url);
    if (!proc.httpRequest) {
      proc.httpRequest = new XMLHttpRequest();
      proc.httpRequest.open("GET", url, true);
      proc.httpRequest.responseType = "arraybuffer";
      proc.httpRequest.send(null);
    } else if (proc.httpRequest.readyState === 4) {
      response = proc.httpRequest.response;
      proc.httpRequest = null;
      return response;
    }
    proc.pushContext('doYield');
    proc.pushContext();
  });
//read FITS data from an ArrayBuffer --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_readFITSdataFromArrayBuffer(arraybuffer)',
  function (arraybuffer) {
    var result = 0, header = [], properties = [], min = 100000, max = -100000, typeOfData = 'undefined', sum = 0;
    function getFITSdataFrom(anArrayBuffer) {
      function isDefined(key) {
        var i = 0, found = false;
        while ((i < properties.length) && !found) {
          found = properties.at(i).at(1) == key;
          i++;
        }
        return found;
      }
      var hlen, key, val, width, height = 1, depth = 1, bscale = 2, bzero = 0, bitpix = 16, numberOfPixels, numberOfBytes, imagevalues = [], imageIndex, fitsIndex, view, card, n, ok;
      for (hlen = 0; hlen < anArrayBuffer.byteLength; hlen += 80) {
        card = String.fromCharCode.apply(null, new Uint8Array(anArrayBuffer, hlen, 80));
        header.push(card);
        if (card.substring(0, 6) === 'END   ') {
          hlen += 80;
          break;
        }
        if (card.indexOf('=') !== -1) {
          key = card.substring(0, 8).trim();
          val = card.substring(10).trim();
          if (val[0] == "'") {
            var s = val.substring(1);
            n = s.indexOf("'");
            val = s.substring(0, n);
          } else {
            n = val.indexOf('/');
            if (n != -1)
              val = val.substring(0, n).trim();
            if (val != 'T' && val != 'F' && key != 'COMMENT' && key != 'HISTORY' && key != 'HIERARCH')
              val = Number(val);
          }
          if (key === 'NAXIS1')
            width = val;
          if (key === 'NAXIS2')
            height = val;
          if (key === 'NAXIS3')
            depth = val;
          if (key === 'BSCALE')
            bscale = val;
          if (key === 'BZERO')
            bzero = val;
          if (key === 'BITPIX')
            bitpix = val;
          properties.push(new List([key, val]));
        }
      }
      ok = isDefined('SIMPLE') && isDefined('BITPIX') && isDefined('NAXIS') && isDefined('NAXIS1') && isDefined('NAXIS2');
      if (!ok)
        return new List([new List(header), new List(properties), min, max, "ERROR: mandatory keywords missing!"]);
      ok = isDefined('NAXIS3') || (Math.abs(bitpix) > 32);
      if (ok)
        return new List([new List(header), new List(properties), min, max, "ERROR: file format not supported!"]);
      if ((hlen % 2880) > 0)
        hlen += 2880 - (hlen % 2880);
      numberOfPixels = width * height;
      numberOfBytes = numberOfPixels * Math.abs(bitpix) / 8;
      imagevalues = new Array(numberOfPixels);
      view = new DataView(anArrayBuffer, hlen, numberOfBytes);
      imageIndex = 0;
      for (var y = 0; y < height; y++) {
        fitsIndex = (height - 1 - y) * width;
        for (var x = 0; x < width; x++) {
          if (bitpix == 8)
            val = view.getUint8(fitsIndex); //8-bit unsigned integer
          if (bitpix == 16)
            val = view.getInt16(2 * fitsIndex, false); //16-bit signed integer
          if (bitpix == 32)
            val = view.getInt32(4 * fitsIndex, false); //32-bit signed integer
          if (bitpix == -32)
            val = view.getFloat32(4 * fitsIndex, false); //single precision floating point value
          imagevalues[imageIndex] = bzero + bscale * val;
          if (imagevalues[imageIndex] > max)
            max = imagevalues[imageIndex];
          if (imagevalues[imageIndex] < min)
            min = imagevalues[imageIndex];
          sum += imagevalues[imageIndex];
          imageIndex++;
          fitsIndex++;
        }
      }
      return new List([new List(header), new List(properties), min, max, sum, new List(imagevalues), 'from URL']);
    }
    return getFITSdataFrom(arraybuffer);
  });

//================= options of the Math-tools palette ============================================================
//Test on vector, matrix, or table ----------------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_isType(data,selection)',
  function (data, selection) {
    function isNumber(element) {
      if (String(element).trim() === "")
        return false;
      else
        return !Number.isNaN(Number(element));
    }
    function isRowVector(data) {
      var result = true, i = 1;
      if (data.length() === 0)
        return true;
      while (result && (i <= data.length())) {
        if (!isNumber(data.at(i)))
          result = false;
        i++;
      }
      return result;
    }
    function isColumnVector(data) {
      var result = true, i = 1;
      if (data.length() === 0)
        return true;
      while (result && (i <= data.length())) {
        row = data.at(i);
        if (!(row instanceof List))
          result = false;
        else if (row.length() != 1)
          result = false;
        else if (!isNumber(row.at(1)))
          result = false;
        i++;
      }
      return result;
    }
    function isMatrix(data) {
      var result = true, row, i = 1, j, width;
      if (data.length() === 0)
        return true;
      while (result && (i <= data.length())) {
        row = data.at(i);
        if (!(row instanceof List))
          result = false;
        else {
          if (i == 1) {
            width = row.length();
            if (width < 1)
              result = false;
          } else if (row.length() != width)
            result = false;
        }
        j = 1;
        while (result && (j <= row.length())) {
          if (!isNumber(row.at(j)))
            result = false;
          j++;
        }
        i++;
      }
      return result;
    }
    function isTable(data) {
      var result = true, row, i = 1, width;
      if (data.length() === 0)
        return true;
      while (result && (i <= data.length())) {
        row = data.at(i);
        if (!(row instanceof List))
          result = false;
        else {
          if (i == 1) {
            width = row.length();
            if (width < 1)
              result = false;
          } else if (row.length() != width)
            result = false;
        }
        i++;
      }
      return result;
    }
    if (selection === "vector") {
      if (isRowVector(data))
        return true;
      return isColumnVector(data);
    }
    if (selection === "row-vector") {
      return isRowVector(data);
    }
    if (selection === "column-vector") {
      return isColumnVector(data);
    }
    if (selection === "matrix") {
      return isMatrix(data);
    }
    if (selection === "table") {
      return isTable(data);
    }
    return "ERROR: wrong selection!";
  });
//Variance of vector or matrix ----------------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_variance(data,mean)',
  function (data, mean) {
    var n = 0, isNumber, c, variance = 0, i = 1, k, value;
    if (data.length() === 0)
      return 0;
    data = data.flatten();
    while (i <= data.length()) {
      value = data.at(i);
      if (typeof (value) === "number")
        isNumber = true;
      else if (typeof (value) === "string") {
        isNumber = true;
        k = 0;
        while ((k < value.length) && isNumber) {
          c = value.charAt(k);
          if ((c < '0') || (c > '9'))
            if ((c !== 'E') && (c !== 'e') && (c !== '+') && (c !== '-') && (c !== '.') && (c !== ','))
              isNumber = false;
          k++;
        }
      } else
        isNumber = false;
      if (isNumber) {
        value = Number(value);
        variance = Number(variance) + (Number(value) - Number(mean)) * (Number(value) - Number(mean));
        n++;
      }
      i++;
    }
    if (n > 0)
      variance = variance / n;
    else
      variance = NaN;
    return variance;
  });
//Transposition of vector, matrix, or table ----------------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_transpose(data)',
  function (data) {
    var width = 1, result = new List(), row;
    if (!(data instanceof List))
      return "ERROR: data are not transposable!";
    if (data.length() === 0)
      return data;
    if (data.at(1) instanceof List) {
      width = data.at(1).length();
      if (width === 1) {
        for (var y = 1; y <= data.length(); y++)
          if (data.at(y) instanceof List) {
            if (data.at(y).length() === 1)
              result.add(data.at(y).at(1));
            else
              return "ERROR: structure is not rectangular!";
          } else
            return "ERROR: structure is not rectangular!";
        return result;
      } else {
        for (var x = 1; x <= width; x++) {
          row = new List();
          for (var y = 1; y <= data.length(); y++)
            if (!(data.at(y) instanceof List))
              return "ERROR: structure is not rectangular!";
            else if ((x > data.at(y).length()) || ((x === width) && (x < data.at(y).length())))
              return "ERROR: structure is not rectangular!";
            else
              row.add(data.at(y).at(x));
          result.add(row);
        }
        return result;
      }
    } else {
      for (var x = 1; x <= data.length(); x++) {
        row = new List();
        row.add(data.at(x));
        result.add(row);
      }
      return result;
    }
  });
//MathPad add axes --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_MathpadAddAxes(costume,properties)', //cAttributes,type,xMax,xMin,yMax,yMin,zMax,zMin,dimensions
  function (costume, properties) {
    function property(key) {
      var i = 1;
      while (i <= properties.length()) {
        if (properties.at(i).at(1) == key)
          return properties.at(i).at(2);
        i++;
      }
      return '-';
    }
    function xTOxp(x) {
      return x * (width - x0) / xMax;
    }
    function xpTOx(xp) {
      return xMax * xp / (width - x0);
    }
    function yTOyp(y) {
      return y * y0 / yMax;
    }
    function ypTOy(yp) {
      return yMax * yp / y0;
    }
    function zTOzp(z) {
      return -z * 0.5 * (width - x0) / zMin;
    }
    function zpTOz(zp) {
      return -zMin * 2 * zp / (width - x0);
    }
    function vectorTOcoordinates(v) {
      if (dimensions > 2)
        return new List([xTOxp(Number(v.at(1))) - zTOzp(Number(v.at(3))) * Math.cos(Math.PI / 6) + x0, y0 - yTOyp(Number(v.at(2))) + zTOzp(Number(v.at(3))) * 0.5]);
      else
        return new List([xTOxp(Number(v.at(1))), yTOyp(Number(v.at(2)))]);
    }
    var leftOffset = Number(property('offsets').at(1)), upperOffset = Number(property('offsets').at(2)), type = property('typeOfData'),
      xMax = Number(property('xMax')), xMin = Number(property('xMin')), yMax = Number(property('yMax')), yMin = Number(property('yMin')),
      zMax = Number(property('zMax')), zMin = Number(property('zMin')), dimensions = Number(property('dimensions')), withGrid = property('withGrid?'),
      ctx, width, height, xpos, ypos, zpos, delta, text, x, y, z, zx, zy, w;
    //set values
    ctx = costume.contents.getContext('2d');
    width = Number(property('width'));
    height = Number(property('height'));
    x0 = -width * xMin / (xMax - xMin);
    y0 = height * yMax / (yMax - yMin);
    //plot frame
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = new Color(0, 0, 0).toString();
    ctx.strokeRect(leftOffset, upperOffset, width, height);
    ctx.closePath();
    ctx.stroke();
    if (dimensions == 1) { //to display sets
      delta = xTOxp((xMax - xMin) / (10 * Math.round(width / 500)));
      xpos = x0;
      y0 = height - 20;
      ctx.lineWidth = 1;
      ctx.strokeStyle = new Color(0, 0, 0).toString();
      ctx.fillStyle = new Color(0, 0, 0).toString();
      ctx.beginPath();
      ctx.moveTo(leftOffset, upperOffset + y0);
      ctx.lineTo(leftOffset + width, upperOffset + y0);
      ctx.lineTo(leftOffset + width - 10, upperOffset + y0 - 6);
      ctx.lineTo(leftOffset + width - 10, upperOffset + y0 + 6);
      ctx.lineTo(leftOffset + width, upperOffset + y0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      while (xpos >= 0) {
        xpos = xpos - delta;
      }
      while (xpos <= 0) {
        xpos = xpos + delta;
      }
      x = xpTOx(xpos - x0);
      while (xpos < width) {
        text = x.toPrecision(2);
        w = ctx.measureText(text).width;
        if (withGrid) {
          ctx.beginPath();
          ctx.lineWidth = 0.7;
          ctx.strokeStyle = new Color(200, 200, 200).toString();
          ctx.moveTo(leftOffset + xpos, upperOffset);
          ctx.lineTo(leftOffset + xpos, upperOffset + height - 20);
          ctx.closePath();
          ctx.stroke();
          ctx.beginPath();
          ctx.lineWidth = 1;
          ctx.strokeStyle = new Color(0, 0, 0).toString();
          ctx.closePath();
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.moveTo(leftOffset + xpos, upperOffset + y0 - 3);
          ctx.lineTo(leftOffset + xpos, upperOffset + y0 + 3);
          ctx.closePath();
          ctx.stroke();
        }
        if (xpos < width - 10) {
          ctx.beginPath();
          ctx.fillText(text, leftOffset + xpos - w / 2, upperOffset + y0 + 15);
          ctx.closePath();
          ctx.stroke();
        }
        xpos = xpos + delta;
        x = xpTOx(xpos - x0);
      }
      return costume;
    }
    //plot x-axis
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = new Color(0, 0, 0).toString();
    ctx.fillStyle = new Color(0, 0, 0).toString();
    ctx.moveTo(leftOffset, upperOffset + y0);
    ctx.lineTo(leftOffset + width, upperOffset + y0);
    ctx.lineTo(leftOffset + width - 10, upperOffset + y0 - 6);
    ctx.lineTo(leftOffset + width - 10, upperOffset + y0 + 6);
    ctx.lineTo(leftOffset + width, upperOffset + y0);
    if (type === "complex-number")
      ctx.fillText("Re", leftOffset + width - 25, upperOffset + y0 - 15);
    else
      ctx.fillText("x", leftOffset + width - 15, upperOffset + y0 + 15);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    //y-axis
    ctx.beginPath();
    ctx.moveTo(leftOffset + x0, upperOffset + height);
    ctx.lineTo(leftOffset + x0, upperOffset);
    ctx.lineTo(leftOffset + x0 - 6, upperOffset + 10);
    ctx.lineTo(leftOffset + x0 + 6, upperOffset + 10);
    ctx.lineTo(leftOffset + x0, upperOffset);
    if (type === "complex-number")
      ctx.fillText("Im", leftOffset + x0 + 10, upperOffset + 15);
    else
      ctx.fillText("y", leftOffset + x0 - 20, upperOffset + 15);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    //z-Axis
    if (dimensions > 2) {
      zy = y0 + x0 * Math.tan(Math.PI / 6);
      ctx.beginPath();
      ctx.moveTo(leftOffset, upperOffset + zy);
      ctx.lineTo(leftOffset + width, upperOffset + y0 - (width - x0) * Math.tan(Math.PI / 6));
      ctx.moveTo(leftOffset, upperOffset + zy);
      ctx.lineTo(leftOffset + 10, upperOffset + zy - 12);
      ctx.lineTo(leftOffset + 16, upperOffset + zy);
      ctx.fillText("z", leftOffset + 12, upperOffset + y0 + x0 * Math.tan(Math.PI / 6) - 15);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    //x-scale
    delta = xTOxp((xMax - xMin) / (10 * Math.round(width / 500)));
    xpos = x0;
    while (xpos >= 0) {
      xpos = xpos - delta;
    }
    while (xpos <= 0) {
      xpos = xpos + delta;
    }
    x = xpTOx(xpos - x0);
    ctx.beginPath();
    while (xpos < width) {
      text = x.toPrecision(2);
      w = ctx.measureText(text).width;
      if (withGrid && (xpos !== x0)) {
        ctx.beginPath();
        ctx.lineWidth = 0.7;
        ctx.strokeStyle = new Color(200, 200, 200).toString();
        ctx.moveTo(leftOffset + xpos, upperOffset);
        ctx.lineTo(leftOffset + xpos, upperOffset + height);
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = new Color(0, 0, 0).toString();
        ctx.closePath();
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(leftOffset + xpos, upperOffset + y0 - 3);
        ctx.lineTo(leftOffset + xpos, upperOffset + y0 + 3);
        ctx.closePath();
        ctx.stroke();
      }
      if (xpos < width - 10) {
        ctx.beginPath();
        ctx.fillText(text, leftOffset + xpos - w / 2, upperOffset + y0 + 15);
        ctx.closePath();
        ctx.stroke();
      }
      xpos = xpos + delta;
      x = xpTOx(xpos - x0);
    }
    //y-scale
    delta = yTOyp((yMax - yMin) / (10 * Math.round(height / 500)));
    ypos = y0;
    while (ypos <= height) {
      ypos = ypos + delta;
    }
    while (ypos > height) {
      ypos = ypos - delta;
    }
    y = ypTOy(y0 - ypos);
    ctx.beginPath();
    while (ypos > 0) {
      text = y.toPrecision(2);
      w = ctx.measureText(text).width;
      if (withGrid && (ypos !== y0)) {
        ctx.beginPath();
        ctx.lineWidth = 0.7;
        ctx.strokeStyle = new Color(200, 200, 200).toString();
        ctx.moveTo(leftOffset, upperOffset + ypos);
        ctx.lineTo(leftOffset + width, upperOffset + ypos);
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = new Color(0, 0, 0).toString();
        ctx.closePath();
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(leftOffset + x0 - 3, upperOffset + ypos);
        ctx.lineTo(leftOffset + x0 + 3, upperOffset + ypos);
        ctx.closePath();
        ctx.stroke();
      }
      if (ypos < height - 10) {
        ctx.beginPath();
        ctx.fillText(text, leftOffset + x0 + 7, upperOffset + ypos + 3);
        ctx.closePath();
        ctx.stroke();
      }
      ypos = ypos - delta;
      y = ypTOy(y0 - ypos);
    }
    //z-scale
    if (dimensions > 2) {
      delta = zTOzp((zMax - zMin) / (10 * Math.round(width / 500)));
      zpos = x0;
      while (zpos < width) {
        zpos = zpos + delta;
      }
      while (zpos >= width) {
        zpos = zpos - delta;
      }
      z = -zpTOz(zpos - x0);
      ctx.beginPath();
      while (zpos > 0) {
        text = z.toPrecision(2);
        w = ctx.measureText(text).width;
        zx = (zpos - x0) * Math.cos(Math.PI / 6);
        zy = -(zpos - x0) / 2;
        if (withGrid && (zx !== 0)) {
          ctx.beginPath();
          ctx.lineWidth = 0.7;
          ctx.strokeStyle = new Color(160, 160, 255).toString();
          ctx.moveTo(leftOffset + zx + x0, upperOffset);
          ctx.lineTo(leftOffset + zx + x0, upperOffset + height);
          ctx.closePath();
          ctx.stroke();
          ctx.beginPath();
          ctx.lineWidth = 1;
          ctx.strokeStyle = new Color(0, 0, 0).toString();
          ctx.closePath();
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.moveTo(leftOffset + zx + x0, upperOffset + y0 + zy - 3);
          ctx.lineTo(leftOffset + zx + x0, upperOffset + y0 + zy + 3);
          ctx.closePath();
          ctx.stroke();
        }
        if ((zpos !== x0) && (zpos < width - 10)) {
          ctx.fillText(text, leftOffset + zx + x0 - w / 2, upperOffset + y0 + zy + 15);
        }
        zpos = zpos - delta;
        z = -zpTOz(zpos - x0);
      }
    }
    return costume;
  });
//MathPad plot data --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_MathPadPlot(costume,data,color,properties,choice)',
  function (costume, data, color, properties, choice) {
    function property(key) {
      var i = 1;
      while (i <= properties.length()) {
        if (properties.at(i).at(1) == key)
          return properties.at(i).at(2);
        i++;
      }
      return '-';
    }
    function xTOxp(x) {
      return x * (width - x0) / xMax;
    }
    function xpTOx(xp) {
      return xMax * xp / (width - x0);
    }
    function yTOyp(y) {
      return y * y0 / yMax;
    }
    function ypTOy(yp) {
      return yMax * yp / y0;
    }
    function zTOzp(z) {
      return -z * 0.5 * (width - x0) / zMin;
    }
    function zpTOz(zp) {
      return -zMin * 2 * zp / (width - x0);
    }
    function vectorToXYcoordinates(v) {
      if (dimensions > 2)
        return new List([xTOxp(Number(v.at(1))) - zTOzp(Number(v.at(3))) * Math.cos(Math.PI / 6), yTOyp(Number(v.at(2))) - zTOzp(Number(v.at(3))) / 2]);
      else
        return new List([xTOxp(Number(v.at(1))), yTOyp(Number(v.at(2)))]);
    }
    function plotLine(x1, y1, x2, y2) {
      ctx.moveTo(leftOffset + x1 + x0, upperOffset + y0 - y1);
      ctx.lineTo(leftOffset + x0 + x2, upperOffset + y0 - y2);
    }
    var r = color.at(1), g = color.at(2), b = color.at(3), xMax = Number(property('xMax')), xMin = Number(property('xMin')), yMax = Number(property('yMax')),
      yMin = Number(property('yMin')), zMax = Number(property('zMax')), zMin = Number(property('zMin')), dimensions = Number(property('dimensions')),
      linewidth = Number(property('lineWidth')), onlypoints = Number(property('onlyPoints')), startpoint = property('startPoint'),
      width = Number(property('width')), height = Number(property('height')), leftOffset = Number(property('offsets').at(1)),
      upperOffset = Number(property('offsets').at(2)), ctx = costume.contents.getContext('2d'), costumeWidth = costume.contents.width,
      costumeHeight = costume.contents.height, x0, y0, point, l, xp, yp, alpha, dl, xe, ye, xs, ys, theStartpoint;
    x0 = -width * xMin / (xMax - xMin);
    y0 = height * yMax / (yMax - yMin);
    ctx.fillStyle = new Color(r, g, b).toString();
    ctx.strokeStyle = new Color(r, g, b).toString();
    ctx.lineWidth = linewidth;
    theStartpoint = vectorToXYcoordinates(startpoint);
    xs = theStartpoint.at(1);
    ys = theStartpoint.at(2);
    if (choice === 'object-of') {
      ctx.beginPath();
      point = vectorToXYcoordinates(data.at(1));
      ctx.moveTo(leftOffset + point.at(1) + x0, upperOffset + y0 - point.at(2));
      for (var i = 2; i <= data.length(); i++) {
        point = vectorToXYcoordinates(data.at(i));
        ctx.lineTo(leftOffset + point.at(1) + x0, upperOffset + y0 - point.at(2));
      }
      ctx.closePath();
      ctx.stroke();
      return costume;
    }
    if (choice === 'line-to') {
      point = vectorToXYcoordinates(data);
      xp = point.at(1);
      yp = point.at(2);
      ctx.beginPath();
      if (onlypoints)
        plotLine(xp, yp, xp + 1, yp);
      else
        plotLine(xs, ys, xp, yp);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      return costume;
    }
    if ((choice === "vector") || (choice === "complex-number")) {
      point = vectorToXYcoordinates(data);
      xp = point.at(1);
      yp = point.at(2);
      if (onlypoints) {
        ctx.beginPath();
        plotLine(xp, yp, xp + 1, yp);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        return costume;
      }
      ctx.beginPath();
      plotLine(xs, ys, xp + xs, yp + ys);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      l = Math.sqrt(xp * xp + yp * yp);
      if (l > 15) {
        alpha = Math.acos(xp / l);
        if (yp < 0)
          alpha = -alpha;
        xe = xp * (l - 10) / l;
        ye = yp * (l - 10) / l;
        ctx.beginPath();
        ctx.moveTo(leftOffset + xs + xp + x0, upperOffset + y0 - (ys + yp));
        ctx.lineTo(leftOffset + xs + xe - 5 * Math.sin(alpha) + x0, upperOffset + y0 - (ys + ye + 5 * Math.cos(alpha)));
        ctx.lineTo(leftOffset + xs + xe + 5 * Math.sin(alpha) + x0, upperOffset + y0 - (ys + ye - 5 * Math.cos(alpha)));
        ctx.lineTo(leftOffset + xs + xp + x0, upperOffset + y0 - (ys + yp));
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
      return costume;
    }
  });
//MathPad plot set --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_MathPadPlotSet(set,setname,properties,atY,costume)',
   function (set,setname,properties,atY,costume) {
     function property(key) {var i = 1; while (i <= properties.length()) {if (properties.at(i).at(1) == key) return properties.at(i).at(2); i++;} return '-';}
     function isElement(element,set,proc){
      var elements = set.at(3), intervals = set.at(4), predicate = set.at(5), interval, result;
      if (elements.contains(element)) return true;
      if (!isNaN(element)) {
        for (var i = 1; i <= intervals.length(); i++) {interval = intervals.at(i); result = false;
          if (interval.at(2) === "<") {if (interval.at(1) < element) result = true;} else {if (interval.at(1) <= element) result = true;}
          if (interval.at(3) === "<") {if (element < interval.at(4)) if (result) return true;} else {if (element <= interval.at(4)) if (result) return true;}}}
      if (!(predicate === "")) return Process.prototype.reportAtomicMap(predicate, new List([element])).at(1);
      return false;
      }
    var color = property('lineColor'), r = color.at(1), g = color.at(2), b = color.at(3), xMax = Number(property('xMax')), xMin = Number(property('xMin')),
        linewidth = Number(property('lineWidth')), width = Number(property('width')), height = Number(property('height')), leftOffset = Number(property('offsets').at(1)),
        upperOffset = Number(property('offsets').at(2)), ctx = costume.contents.getContext('2d'), x0 = -width * xMin / (xMax - xMin);
    ctx.strokeStyle = new Color(0, 0, 0).toString(); ctx.lineWidth = 1; ctx.font = "" + 12 + "px sans-serif"; 
    ctx.beginPath(); ctx.moveTo(leftOffset,atY); ctx.lineTo(width+leftOffset,atY); ctx.fillText(setname, leftOffset+5, atY+15); ctx.closePath(); ctx.stroke();
    ctx.strokeStyle = new Color(r, g, b).toString(); ctx.lineWidth = linewidth; ctx.beginPath();
    for(var x=1;x < width;x++){if(isElement(xMin-(x*xMin)/x0,set,'')){ctx.moveTo(x+leftOffset,atY-3); ctx.lineTo(x+leftOffset,atY+3);}}
    ctx.closePath(); ctx.stroke();
    return costume
  });
//Mathtools FFT --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_FFTops(data,freq,choice)',
  function (data, freq, choice) {
    function newComplex(re, im) {
      return [re, im];
    }
    function addComplex(c1, c2) {
      return newComplex(c1[0] + c2[0], c1[1] + c2[1]);
    }
    function subComplex(c1, c2) {
      return newComplex(c1[0] - c2[0], c1[1] - c2[1]);
    }
    function mulComplex(c1, c2) {
      return newComplex(c1[0] * c2[0] - c1[1] * c2[1], c1[0] * c2[1] + c1[1] * c2[0]);
    }
    function absComplex(c) {
      return Math.sqrt(c[0] * c[0] + c[1] * c[1]);
    }
    function complexToPolar(c) {
      return newComplex(absComplex(c), Math.atan(c[1] / c[0]));
    }
    function polarToComplex(c) {
      return newComplex(c[0] * Math.cos(c[1]), c[0] * Math.sin(c[1]));
    }
    function FFT(d) {
      var n = d.length, nDIV2 = n / 2, even = [], odd = [], result = [], evenPart, oddPart;
      if (n <= 1)
        return d;
      for (var i = 0; i < n; i++) {
        result.push(0);
      }
      for (var i = 0; i < nDIV2; i++) {
        even.push(d[2 * i]);
        odd.push(d[2 * i + 1]);
      }
      evenPart = FFT(even);
      oddPart = FFT(odd);
      f = -2 * Math.PI / n;
      for (var k = 0; k < nDIV2; k++) {
        g = mulComplex(newComplex(Math.cos(f * k), Math.sin(f * k)), oddPart[k]);
        result[k] = addComplex(evenPart[k], g);
        result[k + nDIV2] = subComplex(evenPart[k], g);
      }
      return result;
    }
    var rData = [], cData = [], N = 0, result, maxLength = data.length(), n;
    if (choice === "frequency_spectrum") {
      rData = data.asArray();
      //complete data up to length 2^N
      while (Math.pow(2, N) < rData.length) {
        N++;
      }
      while (rData.length < Math.pow(2, N)) {
        rData.push(0);
      }
      //convert to complex numbers
      for (var i = 0; i < rData.length; i++) {
        cData.push([Number(rData[i]), Number(0)]);
      }
      //calculate FFT
      result = FFT(cData);
      //shorten to length of original data
      while (result.length > maxLength) {
        result.pop();
      }
      //calculate normalized FFT data
      n = cData.length;
      for (var i = 0; i < result.length; i++) {
        result[i] = [1.0 * i / n * freq, 2 * absComplex(result[i]) / maxLength];
      }
      result[0][1] = result[0][1] / 2;
      //convert to List
      for (var i = 0; i < result.length; i++) {
        result[i] = new List(result[i]);
      }
      return new List(result);
    }
    if (choice === 'complex_FFTdata') {
      rData = data.asArray();
      //complete data up to length 2^N
      while (Math.pow(2, N) < rData.length) {
        N++;
      }
      while (rData.length < Math.pow(2, N)) {
        rData.push(0);
      }
      //convert to complex numbers
      for (var i = 0; i < rData.length; i++) {
        cData.push([Number(rData[i]), Number(0)]);
      }
      //calculate FFT
      result = FFT(cData);
      //use SciSnap! format for complex numbers
      for (var i = 0; i < result.length; i++) {
        result[i] = ["cnC", result[i][0], result[i][1]];
      }
      //shorten to length of original data
      while (result.length > maxLength) {
        result.pop();
      }
      //convert to List
      for (var i = 0; i < result.length; i++) {
        result[i] = new List(result[i]);
      }
      return new List(result);
    }
    if (choice === 'iFFT_of_FFTdata') {
      //convert data to conjugate complex array
      for (var i = 1; i <= data.length(); i++) {
        rData.push([data.at(i).at(1), -data.at(i).at(2)]);
      }
      //complete data up to length 2^N
      while (Math.pow(2, N) < rData.length) {
        N++;
      }
      while (rData.length < Math.pow(2, N)) {
        rData.push([0, 0]);
      }
      //calculate FFT
      result = FFT(rData);
      n = result.length;
      for (var i = 0; i < n; i++) {
        result[i] = result[i][0] / n;
      }
      //shorten to length of original data
      while (result.length > maxLength) {
        result.pop();
      }
      //convert to List
      return new List(result);
    }
    return "ERROR: incorrect selection!";
  });
//is e element of set? --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_isElementOfSet(set,element,proc)',
  function (set, element, proc) {
    var elements = set.at(3), intervals = set.at(4), predicate = set.at(5), interval, result;
    if (elements.contains(element))
      return true;
    if (!isNaN(element)) {
      for (var i = 1; i <= intervals.length(); i++) {
        interval = intervals.at(i);
        result = false;
        if (interval.at(2) === "<") {
          if (interval.at(1) < element)
            result = true;
        } else {
          if (interval.at(1) <= element)
            result = true;
        }
        if (interval.at(3) === "<") {
          if (element < interval.at(4))
            if (result)
              return true;
        } else {
          if (element <= interval.at(4))
            if (result)
              return true;
        }
      }
    }
    if (!(predicate === ""))
      return proc.reportAtomicMap(predicate, new List([element])).at(1);
    return false;
  });
//================= options of the Data-tools palette ============================================================
//copy of a list --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_copyOf(theList)',
  function (theList) {
    function listCopy(item) {
      var theCopy;
      if (item instanceof List) {
        theCopy = new List();
        for (var i = 1; i <= item.length(); i++)
          theCopy.add(listCopy(item.at(i)));
      } else
        theCopy = item;
      return theCopy;
    }
    return listCopy(theList);
  });
//conversion of CSV-data to a table --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_convertCSVToTable(data)',
  function (data) {
    var maxColumns = 0, help;
    for (var i = 1; i <= data.length(); i++) {
      if (data.at(i) instanceof List)
        if (data.at(i).length() > maxColumns)
          maxColumns = data.at(i).length();
    }
    for (var i = 1; i <= data.length(); i++) {
      if (data.at(i) instanceof List) {
        for (var j = data.at(i).length() + 1; j <= maxColumns; j++)
          data.at(i).add();
      } else {
        help = data.at(i);
        data.put(new List(), i);
        data.at(i).add(help);
        for (var j = data.at(i).length() + 1; j <= maxColumns; j++)
          data.at(i).add();
      }
    }
    return data;
  });
//conversion of data to different formats --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_convertData(data,type)',
  function (data, type) {
    if (type == 'DATAASTEXT')
      return data.asTXT();
    if (type == 'CSV')
      return data.asCSV();
    if (type == 'JSON')
      return data.asJSON(true);
    return "ERROR: unknown datatype!";
  });
//returns parts of different colums of a table --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_columncopy(data,cols,start,stop)',
  function (data, cols, start, stop) {
    var row, result = new List();
    for (var i = start; i <= stop; i++) {
      row = new List();
      for (var n = 1; n <= cols.length(); n++)
        row.add(data.at(i).at(cols.at(n)));
      result.add(row);
    }
    return result;
  });
//returns a subsection of a table --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_subsection(data,begin,end)',
  function (data, begin, end) {
    var x, y, x1 = begin.at(1), y1 = begin.at(2), x2 = end.at(1), y2 = end.at(2), row, result = new List();
    y = y1;
    while ((y <= y2) && (y <= data.length())) {
      x = x1;
      row = new List();
      while ((x <= x2) && (x <= data.at(1).length())) {
        row.add(data.at(y).at(x));
        x++;
      }
      result.add(row);
      y++;
    }
    return result;
  });
//returns subsection of an image --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_subsectionImage(data,begin,end,width,height)',
  function (data, begin, end, width, height) {
    var x, y, x1 = Number(begin.at(1)), y1 = Number(begin.at(2)), x2 = Number(end.at(1)), y2 = Number(end.at(2)), result = new List();
    width = Number(width);
    height = Number(height);
    y = y1;
    while ((y <= y2) && (y <= height)) {
      x = x1;
      while ((x <= x2) && (x <= width)) {
        result.add(data.at((y - 1) * width + x));
        x++;
      }
      y++;
    }
    return result;
  });
//pooling operation on image or data --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_pooling(data,width,height,typeOfPooling,stride,typeOfData)',
  function (data, width, height, typeOfPooling, stride, typeOfData) {
    function getValue(x, y) {
      return data.at((y - 1) * width + x);
    }
    var result = [], y, x, max, sum, mean, n, value, row;
    width = Number(width);
    height = Number(height);
    stride = Number(stride);
    result.push(Math.ceil(1.0 * width / stride));
    result.push(Math.ceil(1.0 * height / stride));
    if (typeOfData === "FITS") {
      y = 1;
      while (y <= height) {
        x = 1;
        while (x <= width) {
          max = 0;
          mean = 0;
          n = 0;
          sum = 0;
          for (var i = 0; i < stride; i++) {
            for (var j = 0; j < stride; j++) {
              if (((x + i) <= width) && ((y + j) <= height)) {
                n++;
                value = Number(getValue(x + i, y + j));
                sum = sum + value;
                if (value > max)
                  max = value;
              }
            }
          }
          if (n > 0)
            mean = 1.0 * sum / n;
          if (typeOfPooling === "max")
            result.push(max);
          else
            result.push(mean);
          x = x + stride;
        }
        y = y + stride;
      }
    }
    if (typeOfData === "RGB") {
      y = 1;
      while (y <= height) {
        x = 1;
        while (x <= width) {
          max = [0, 0, 0, 0];
          mean = [0, 0, 0, 0];
          n = 0;
          sum = [0, 0, 0, 0];
          for (var i = 0; i < stride; i++) {
            for (var j = 0; j < stride; j++) {
              if (((x + i) <= width) && ((y + j) <= height)) {
                n++;
                value = getValue(x + i, y + j);
                for (k = 0; k < 4; k++) {
                  sum[k] = sum[k] + Number(value.at(k + 1));
                  if (value.at(k + 1) > max[k])
                    max[k] = value.at(k + 1);
                }
              }
            }
          }
          if (n > 0)
            for (k = 0; k < 4; k++)
              mean[k] = 1.0 * sum[k] / n;
          if (typeOfPooling === "max")
            result.push(new List(max));
          else
            result.push(new List(mean));
          x = x + stride;
        }
        y = y + stride;
      }
    }
    if (typeOfData === "matrix") {
      y = 1;
      while (y <= height) {
        x = 1;
        row = new List();
        while (x <= width) {
          max = data.at(y).at(x);
          mean = 0;
          n = 0;
          sum = 0;
          for (var i = 0; i < stride; i++) {
            for (var j = 0; j < stride; j++) {
              if (((x + i) <= width) && ((y + j) <= height)) {
                n++;
                value = Number(data.at(y + j).at(x + i));
                sum = sum + value;
                if (value > max)
                  max = value;
              }
            }
          }
          if (n > 0)
            mean = 1.0 * sum / n;
          if (typeOfPooling === "max")
            row.add(max);
          else
            row.add(mean);
          x = x + stride;
        }
        result.push(row);
        y = y + stride;
      }
    }
    if (typeOfData === "vector") {
      x = 1;
      while (x <= width) {
        max = data.at(x);
        mean = 0;
        n = 0;
        sum = 0;
        for (var i = 0; i < stride; i++) {
          if ((x + i) <= width) {
            n++;
            value = Number(data.at(x + i));
            sum = sum + value;
            if (value > max)
              max = value;
          }
        }
        if (n > 0)
          mean = 1.0 * sum / n;
        if (typeOfPooling === "max")
          result.push(max);
        else
          result.push(mean);
        x = x + stride;
      }
    }
    return new List(result);
  });
//grouping of data --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_groupeddata(aTable,compaircolumn,operation,groupcolumn)',
  function (aTable, compaircolumn, operation, groupcolumn) {
    compaircolumn = Number(compaircolumn);
    groupcolumn = Number(groupcolumn);
    var min, max, sum, mean, n, result, i, value, oldgroup, newgroup;
    function isNumber(val) {
      var ok, k, c;
      if (typeof (val) === "number")
        ok = true;
      else {
        if (typeof (val) === "string") {
          ok = true;
          k = 0;
          while ((k < val.length) && ok) {
            c = val.charAt(k);
            if ((c < '0') || (c > '9'))
              if ((c !== 'E') && (c !== 'e') && (c !== '+') && (c !== '-') && (c !== '.') && (c !== ','))
                ok = false;
            k++;
          }
        } else
          ok = false;
      }
      return ok;
    }
    result = new List();
    result.add(new List(['value', operation]));
    if (aTable.contents.length === 0)
      return result;
    newgroup = aTable.at(1).at(groupcolumn);
    if (isNumber(newgroup))
      newgroup = Number(newgroup);
    oldgroup = newgroup;
    value = aTable.at(1).at(compaircolumn);
    if (isNumber(value)) {
      value = Number(value);
      sum = value;
    } else
      sum = "-";
    min = value;
    max = value;
    n = 1;
    i = 2;
    while (i <= aTable.length()) {
      newgroup = aTable.at(i).at(groupcolumn);
      if (isNumber(newgroup))
        newgroup = Number(newgroup);
      value = aTable.at(i).at(compaircolumn);
      if (isNumber(value))
        value = Number(value);
      if (isNumber(newgroup))
        newgroup = Number(newgroup);
      if (newgroup === oldgroup) {
        if (min > value)
          min = value;
        if (max < value)
          max = value;
        if (isNumber(value) && isNumber(sum))
          sum = Number(sum) + Number(value);
        else
          sum = "-";
        n++;
      } else {
        if (operation === 'min')
          result.add(new List([oldgroup, min]));
        if (operation === 'max')
          result.add(new List([oldgroup, max]));
        if (operation === 'number')
          result.add(new List([oldgroup, n]));
        if (operation === 'sum')
          result.add(new List([oldgroup, sum]));
        if (operation === 'mean')
          if (isNumber(sum))
            result.add(new List([oldgroup, 1.0 * sum / n]));
          else
            result.add(new List([oldgroup, "-"]));
        min = value;
        max = value;
        if (isNumber(value))
          sum = value;
        else
          sum = "-";
        n = 1;
        oldgroup = newgroup;
      }
      i++;
    }
    if (operation === 'min')
      result.add(new List([oldgroup, min]));
    if (operation === 'max')
      result.add(new List([oldgroup, max]));
    if (operation === 'number')
      result.add(new List([oldgroup, n]));
    if (operation === 'sum')
      result.add(new List([oldgroup, sum]));
    if (operation === 'mean')
      if (isNumber(sum))
        result.add(new List([oldgroup, 1.0 * sum / n]));
      else
        result.add(new List([oldgroup, "-"]));
    return result;
  });
//determines ranges, covariance, or correlation of two columns --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_propertiesoftable(selection,table,x,y)',
  function (selection, table, x, y) {
    x = Number(x);
    y = Number(y);
    var xmin, xmax, ymin, ymax, meanx, meany, cov, corr, varx, vary, i, valx, valy, sx, sy;
    if (table.contents.length < 1)
      return "bad data";
    xmin = Number(table.at(1).at(x));
    xmax = xmin;
    ymin = Number(table.at(1).at(y));
    ymax = ymin;
    meanx = xmin;
    meany = ymin;
    i = 2;
    while (i <= table.length()) {
      valx = Number(table.at(i).at(x));
      valy = Number(table.at(i).at(y));
      if (valx < xmin)
        xmin = valx;
      if (valx > xmax)
        xmax = valx;
      if (valy < ymin)
        ymin = valy;
      if (valy > ymax)
        ymax = valy;
      meanx = Number(meanx) + valx;
      meany = Number(meany) + valy;
      i++;
    }
    meanx = meanx / (i - 1);
    meany = meany / (i - 1);
    if (selection === "ranges")
      return new List([xmin, xmax, ymin, ymax]);
    i = 1;
    cov = 0;
    corr = 0;
    varx = 0;
    vary = 0;
    while (i <= table.length()) {
      valx = Number(table.at(i).at(x));
      valy = Number(table.at(i).at(y));
      cov = Number(cov) + (valx - meanx) * (valy - meany);
      varx = Number(varx) + (valx - meanx) * (valx - meanx);
      vary = Number(vary) + (valy - meany) * (valy - meany);
      i++;
    }
    sx = Math.sqrt(varx);
    sy = Math.sqrt(vary);
    corr = cov / (sx * sy);
    cov = cov / (i - 1);
    if (selection === "covariance")
      return cov;
    if (selection === "correlation")
      return corr;
    return "unknown";
  });
//use convolution kernel --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_convolution(kernel,data,width,height,typeOfData,mIndex,kWidth)',
  function (kernel, data, width, height, typeOfData, mIndex, kWidth) {
    function getValue(x, y) {
      if (typeOfData === 'FITS')
        return (data.at(x + (y - 1) * width));
      if (typeOfData === 'RGB')
        return (data.at(x + (y - 1) * width));
      if (typeOfData === 'table')
        return (data.at(y).at(x));
    }
    function getKernelValue(x, y) {
      return (kernel.at(y).at(x));
    }
    var result = [], x, y, value, r, g, b, s, row;
    width = Number(width);
    height = Number(height);
    mIndex = Number(mIndex);
    kWidth = Number(kWidth);
    for (var y = 1; y <= height; y++) {
      row = new List();
      for (var x = 1; x <= width; x++) {
        if (typeOfData === 'FITS')
          value = 0;
        if (typeOfData === 'RGB') {
          r = 0;
          g = 0;
          b = 0;
          s = 255;
        }
        ;
        if (typeOfData === 'table')
          value = 0;
        for (var ky = 1; ky <= kWidth; ky++)
          for (var kx = 1; kx <= kWidth; kx++)
            if ((y - mIndex + ky > 0) && (y - mIndex + ky <= height) && (x - mIndex + kx > 0) && (x - mIndex + kx <= width)) {
              if (typeOfData === 'FITS')
                value = value + getValue(x - mIndex + kx, y - mIndex + ky) * getKernelValue(kx, ky);
              if (typeOfData === 'table')
                value = value + getValue(x - mIndex + kx, y - mIndex + ky) * getKernelValue(kx, ky);
              if (typeOfData === 'RGB') {
                r = r + getValue(x - mIndex + kx, y - mIndex + ky).at(1) * getKernelValue(kx, ky);
                g = g + getValue(x - mIndex + kx, y - mIndex + ky).at(2) * getKernelValue(kx, ky);
                b = b + getValue(x - mIndex + kx, y - mIndex + ky).at(3) * getKernelValue(kx, ky);
              }
            }
        if (typeOfData === 'FITS')
          result.push(value);
        if (typeOfData === 'table')
          row.add(value);
        if (typeOfData === 'RGB')
          result.push(new List([r, g, b, s]));
      }
      if (typeOfData === 'table')
        result.push(row);
    }
    return new List(result);
  });
//k-means clustering --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_k-means-clustering(k,data)',
  function (k, data) {
    function distanceBetween(p1, p2) {
      var result = 0;
      for (var i = 1; i <= dimension; i++)
        result = result + (p1.at(i) - p2.at(i)) * (p1.at(i) - p2.at(i));
      return Math.sqrt(result);
    }
    function buildClusters() {
      var minDist, dist, nearestCenter;
      anyChanges = false;
      for (var i = 1; i <= data.length(); i++) {
        minDist = 1000000000;
        nearestCenter = 0;
        for (var n = 1; n <= k; n++) {
          dist = distanceBetween(data.at(i), centers.at(n));
          if (dist < minDist) {
            nearestCenter = n;
            minDist = dist;
          }
        }
        if (data.at(i).at(dimension + 1) != nearestCenter) {
          data.at(i).put(nearestCenter, dimension + 1);
          anyChanges = true;
        }
      }
    }
    function adjustCenters() {
      var sum, n;
      for (var i = 1; i <= k; i++) { //for all centers
        for (var j = 1; j <= dimension; j++) {
          sum = 0;
          n = 0;
          for (var m = 1; m <= data.length(); m++) {
            if (data.at(m).at(dimension + 1) === i) {
              n++;
              sum = sum + data.at(m).at(j);
            }
          }
          if (n > 0) {
            centers.at(i).put(1.0 * sum / n, j);
          }
        }
      }
    }
    var dimension = data.at(1).length(), minmax = new List(), min, max, value, centers = new List(), center, anyChanges, loops = 0;
    k = Number(k);
    for (var i = 1; i <= data.length(); i++) {
      data.at(i).add(0);
    }
    for (var i = 1; i <= dimension; i++) {
      min = 10000000;
      max = -min;
      for (var n = 1; n <= data.length(); n++) {
        value = Number(data.at(n).at(i));
        if (min > value) {
          min = value;
        }
        if (max < value) {
          max = value;
        }
      }
      minmax.add(new List([min, max]));
    }
    for (var i = 1; i <= k; i++) {
      center = new List();
      for (var n = 1; n <= dimension; n++)
        center.add(Math.random() * (minmax.at(n).at(2) - minmax.at(n).at(1)) + minmax.at(n).at(1));
      center.add(i);
      centers.add(center);
    }
    anyChanges = true;
    loops = 0;
    while (anyChanges && (loops < 100)) {
      loops++;
      buildClusters();
      adjustCenters();
    }
    return data;
  });
//returns Levenshtein distance between two strings --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_LevenshteinDistance(s1,s2)',
  function (s1, s2) {
    function min(vector) {
      var m = 10000000, i = 1;
      while (i <= vector.length()) {
        if (m > vector.at(i))
          m = vector.at(i);
        i++;
      }
      return m;
    }
    var lengthS1 = s1.length, lengthS2 = s2.length, D = new List(), line, result;
    for (var i = 0; i <= lengthS2; i++) {
      line = new List();
      for (var j = 0; j <= lengthS1; j++)
        line.add("");
      D.add(line);
    }
    for (var i = 0; i <= lengthS1; i++)
      D.at(1).put(i, i + 1);
    for (var i = 0; i <= lengthS2; i++)
      D.at(i + 1).put(i, 1);
    for (var i = 2; i <= lengthS2 + 1; i++) {
      for (var j = 2; j <= lengthS1 + 1; j++) {
        if (s1.charAt(j - 1) === s2.charAt(i - 1))
          D.at(i).put(min(new List([D.at(i - 1).at(j - 1), D.at(i - 1).at(j - 1) + 1, D.at(i - 1).at(j) + 1, D.at(i).at(j - 1) + 1])), j);
        else
          D.at(i).put(min(new List([D.at(i - 1).at(j - 1) + 1, D.at(i - 1).at(j) + 1, D.at(i).at(j - 1) + 1])), j);
      }
    }
    return D.at(lengthS2 + 1).at(lengthS1 + 1);
  });
//DBSCAN clustering --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_DBSCAN(data,r,minMembers)',
  function (data, r, minMembers) {
    function distance(p1, p2) {
      var result = 0;
      for (var i = 1; i <= dim; i++) {
        result = result + (p1.at(i) - p2.at(i)) * (p1.at(i) - p2.at(i));
      }
      ;
      return Math.sqrt(result);
    }
    function neighboursOf(p) {
      var result = new List();
      for (var i = 1; i <= data.length(); i++) {
        if ((p != data.at(i)) && (distance(p, data.at(i)) <= r))
          result.add(data.at(i));
      }
      return result;
    }
    function expand(neighs) {
      var p, newNeighbours;
      for (var i = 1; i <= neighs.length(); i++) {
        p = neighs.at(i);
        if (Number(p.at(dim + 1)) === -1) {
          p.put(0, dim + 1);
          newNeighbours = neighboursOf(p);
          if (newNeighbours.length() >= minMembers)
            for (var j = 1; j <= newNeighbours.length(); j++)
              if (!neighs.contains(newNeighbours.at(j)))
                neighs.add(newNeighbours.at(j));
          if (Number(p.at(dim + 1)) < 1)
            p.put(clusterNr, dim + 1);
        }
      }
    }
    var clusterNr = 0, n, point, dim = data.at(1).length() - 1, neighbours;
    n = 1;
    while (n <= data.length()) {
      point = data.at(n);
      if (Number(point.at(dim + 1)) === -1) {
        point.put(0, dim + 1);
        neighbours = neighboursOf(point);
        if (neighbours.length() < minMembers)
          point.put(-2, dim + 1);
        else {
          clusterNr++;
          point.put(clusterNr, dim + 1);
          expand(neighbours);
        }
      }
      n++;
    }
    return data;
  });
//returns a ID3-tree --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_ID3Tree(data)',
  function (data) {
    function quicksort(anArray) {
      if (anArray.length <= 1)
        return anArray;
      var pivot = anArray[0], left = [], right = [];
      for (var i = 1; i < anArray.length; i++)
        anArray[i] < pivot ? left.push(anArray[i]) : right.push(anArray[i]);
      return quicksort(left).concat(pivot, quicksort(right));
    }
    ;
    function sort(aList) {
      var result = [];
      for (var i = 1; i <= aList.length(); i++)
        result.push(Number(aList.at(i)));
      return new List(quicksort(result));
    }
    function tableSort(aTable, column) {
      var result = new List(), max, n;
      while (aTable.length() > 0) {
        max = Number(aTable.at(1).at(column));
        n = 1;
        for (var i = 2; i <= aTable.length(); i++)
          if (Number(aTable.at(i).at(column)) > max) {
            max = Number(aTable.at(i).at(column));
            n = i;
          }
        result.add(aTable.at(n));
        aTable.remove(n);
      }
      return result;
    }
    function countValuesIn(aList) {
      var sortedData, countedValues, value, n;
      sortedData = sort(aList);
      countedValues = new List();
      value = sortedData.at(1);
      n = 0;
      for (var i = 1; i <= sortedData.length(); i++)
        if (sortedData.at(i) === value)
          n++;
        else {
          countedValues.add(new List([value, n]));
          value = sortedData.at(i);
          n = 1;
        }
      countedValues.add(new List([value, n]));
      return countedValues;
    }
    function column(n, table) {
      var result = new List();
      for (var i = 1; i <= table.length(); i++)
        result.add(table.at(i).at(n));
      return result;
    }
    function random(max) {
      return Math.floor(Math.random() * max + 1);
    }
    function entropyOf(data) {
      var result = 0, values = countValuesIn(data);
      for (var i = 1; i <= values.length(); i++)
        if (values.at(i).at(2) > 0)
          result = result - values.at(i).at(2) / data.length() * Math.log(values.at(i).at(2) / data.length());
      return result;
    }
    function selectRowsWhere(table, column, value) {
      var result = new List();
      for (var i = 1; i <= table.length(); i++)
        if (typeof value ==='number')
          if(Number(table.at(i).at(column)) === Number(value)) result.add(table.at(i));
          if(table.at(i).at(column) === value) result.add(table.at(i));
      return result;
    }
    function deleteColumn(table, n) {
      var result = table.columns();
      result.remove(n);
      return result.columns();
    }
    function ID3Tree(data) {
      var countedValues, informationGains, newData, links, compareColumn, values, nTotal, result, help;
      if (data.length() === 0)
        return new List();
      countedValues = countValuesIn(column(data.at(1).length(), data));
      if (countedValues.length() === 1)
        return new List(["leaf", countedValues.at(1).at(1)]);
      if (data.at(1).length() === 1)
        return new List(["leaf (unambiguous)", countedValues.at(random(countedValues.length())).at(1)]);
      informationGains = new List();
      for (var i = 1; i <= data.at(1).length() - 1; i++) {
        nTotal = data.length();
        result = entropyOf(column(data.at(1).length(), data));
        values = countValuesIn(column(i, data));
        for (var j = 1; j <= values.length(); j++) {
          help = selectRowsWhere(data, i, values.at(j).at(1));
          result = result - values.at(j).at(2) / nTotal * entropyOf(column(data.at(1).length(), help));
          }
        informationGains.add(new List([i, result]));
      }
      informationGains = tableSort(informationGains, 2);
      compareColumn = informationGains.at(1).at(1);
      countedValues = countValuesIn(column(compareColumn, data));
      links = new List();
      for (var i = 1; i <= countedValues.length(); i++) {
        newData = selectRowsWhere(data, compareColumn, countedValues.at(i).at(1));
        newData = deleteColumn(newData, compareColumn);
        links.add(new List([countedValues.at(i).at(1), ID3Tree(newData)]));
      }
      return new List(["node", informationGains.at(1).at(1), links]);
    }
    return ID3Tree(data);
  });

//================= options of the PlotPad palette ============================================================
//add axes and scales on PlotPad--------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_addAxesAndScalesToPlotpad(costume,properties)',
  function (costume, properties) {
    function getProperty(key) {
      for (var i = 1; i <= properties.length(); i++)
        if (properties.at(i).at(1) === key)
          return properties.at(i).at(2);
      return "not found";
    }
    function xTOxp(x) {
      return leftOffset + (x - xLeft) * diagramWidth / (xRight - xLeft);
    }
    function yTOyp(y) {
      return upperOffset + (yUpper - y) * diagramHeight / (yUpper - yLower);
    }
    function xpTOx(xp) {
      return xLeft + (xRight - xLeft) * (xp - leftOffset) / diagramWidth;
    }
    function ypTOy(yp) {
      return yUpper - (yUpper - yLower) * (yp - upperOffset) / diagramHeight;
    }
    function round(x, n) {
      return Math.round(x * Math.pow(10, n)) / Math.pow(10, n);
    }
    function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    function special(s) {
      var a;
      for (var i = 0; i < conv.length; i++) {
        a = conv[i];
        s = s.replaceAll(a[0], a[1]);
      }
      return s;
    }
    function rainbow(f) {
      var angle = 300. * f, r, g, b;
      if (angle < 60.) {
        r = 255;
        g = Math.floor(angle * 4.25 - 0.01);
        b = 0;
      } else if (angle < 120.) {
        r = Math.floor((120 - angle) * 4.25 - 0.01);
        g = 255;
        b = 0;
      } else if (angle < 180.) {
        r = 0;
        g = 255;
        b = Math.floor((angle - 120) * 4.25 - 0.01);
      } else if (angle < 240.) {
        r = 0;
        g = Math.floor((240 - angle) * 4.25 - 0.01);
        b = 255;
      } else if (angle < 300.) {
        r = Math.floor((angle - 240) * 4.25 - 0.01);
        g = 0;
        b = 255;
      } else {
        r = 255;
        g = 0;
        b = Math.floor((360 - angle) * 4.25 - 0.01);
      }
      return new Color(r, g, b).toString();
    }
    var xLeft = Number(getProperty("xLeft")), xRight = Number(getProperty("xRight")), yLower = Number(getProperty("yLower")), yUpper = Number(getProperty("yUpper")),
      leftOffset = Number(getProperty("scaleLeftOffset")), rightOffset = Number(getProperty("scaleRightOffset")), upperOffset = Number(getProperty("scaleUpperOffset")),
      lowerOffset = Number(getProperty("scaleLowerOffset")), xprecision = Number(getProperty("scalesXprecision")), xtextheight = Number(getProperty("scalesXtextheight")),
      xIntervals = Number(getProperty("scalesXintervals")), yprecision = Number(getProperty("scalesYprecision")), ytextheight = Number(getProperty("scalesYtextheight")),
      yIntervals = Number(getProperty("scalesYintervals")), xstart = Number(getProperty("scalesXstart")), xstep = Number(getProperty("scalesXstep")),
      xscaling = Number(getProperty("scalesXscaling")), ystart = Number(getProperty("scalesYstart")), ystep = Number(getProperty("scalesYstep")),
      yscaling = Number(getProperty("scalesYscaling")), ticlength = Number(getProperty("scalesTiclength")), xminitic = Number(getProperty("scalesXminitics")),
      yminitic = Number(getProperty("scalesYminitics")), xgrid = getProperty("scalesXgrid"), ygrid = getProperty("scalesYgrid"), xcentered = getProperty("scalesXcentered"),
      ycentered = getProperty("scalesYcentered"), showXscale = Number(getProperty("scalesShowXscale")), showYscale = Number(getProperty("scalesShowYscale")),
      border = getProperty("plotBorder"), withclosebutton = getProperty("withCloseButton"), closebuttonleft = getProperty("closeButtonLeft"), closebuttonsize = Number(getProperty("closeButtonSize")),
      rback = Number(getProperty("backColor").at(1)), gback = Number(getProperty("backColor").at(2)), bback = Number(getProperty("backColor").at(3)),
      rfront = Number(getProperty("frontColor").at(1)), gfront = Number(getProperty("frontColor").at(2)), bfront = Number(getProperty("frontColor").at(1)),
      ctx = costume.contents.getContext('2d'), rightCostumeEdge = costume.contents.width, lowerCostumeEdge = costume.contents.height,
      diagramWidth = rightCostumeEdge - leftOffset - rightOffset, diagramHeight = lowerCostumeEdge - lowerOffset - upperOffset,
      x0 = xLeft / (xLeft - xRight) * diagramWidth, y0 = yUpper / (yUpper - yLower) * diagramHeight;
    var conv = [
      ["&Alpha;", "\u0391"], ["&Beta;", "\u0392"], ["&Gamma;", "\u0393"], ["&Delta;", "\u0394"], ["&Epsilon;", "\u0395"],
      ["&Zeta;", "\u0396"], ["&Eta;", "\u0397"], ["&Theta;", "\u0398"], ["&Iota;", "\u0399"], ["&Kappa;", "\u039A"],
      ["&Lambda;", "\u039B"], ["&Mu;", "\u039C"], ["&Nu;", "\u039D"], ["&Xi;", "\u039E"], ["&Omicron;", "\u039F"],
      ["&Pi;", "\u03A0"], ["&Rho;", "\u03A1"], ["&Sigma;", "\u03A2"], ["&Tau;", "\u03A3"], ["&Upsilon;", "\u03A4"],
      ["&upsih;", "\u03A5"], ["&Phi;", "\u03A6"], ["&Chi;", "\u03A7"], ["&Psi;", "\u03A8"], ["&Omega;", "\u03A9"],
      ["&alpha;", "\u03B1"], ["&beta;", "\u03B2"], ["&gamma;", "\u03B3"], ["&delta;", "\u03B4"], ["&epsilon;", "\u03B5"],
      ["&zeta;", "\u03B6"], ["&eta;", "\u03B7"], ["&theta;", "\u03B8"], ["&iota;", "\u03B9"], ["&kappa;", "\u03BA"],
      ["&lambda;", "\u03BB"], ["&mu;", "\u03BC"], ["&nu;", "\u03BD"], ["&xi;", "\u03BE"], ["&omicron;", "\u03BF"],
      ["&pi;", "\u03C0"], ["&rho;", "\u03C1"], ["&sigmaf;", "\u03C2"], ["&sigma;", "\u03C3"], ["&tau;", "\u03C4"],
      ["&upsilon;", "\u03C5"], ["&phi;", "\u03C6"], ["&chi;", "\u03C7"], ["&psi;", "\u03C8"], ["&omega;", "\u03C9"],
      ["&thetasym;", "\u03D1"], ["&piv;", "\u03D6"], ["&euro;", "\u20AC"], ["&pound;", "\xA3"], ["&yen;", "\xA5"],
      ["&deg;", "\xB0"], ["&plusmn;", "\xB1"], ["&sup2;", "\xB2"], ["&sup3;", "\xB3"], ["&micro;", "\xB5"],
      ["&times;", "\xD7"], ["&divide;", "\xF7"], ["&part;", "\u2202"], ["&nabla;", "\u2207"], ["&prop;", "\u221D"],
      ["&infin;", "\u221E"]];
    function draw_title() {
      var label = special(getProperty("title")), h = Number(getProperty("titleHeight"));
      ctx.fillStyle = new Color(rfront, gfront, bfront).toString();
      ctx.font = "" + getProperty("titleHeight") + "px sans-serif";
      if (label.length > 0 && upperOffset > 0) {
        var w = ctx.measureText(label).width, yl = upperOffset / 2 + 0.4 * h;
        if (ticlength < 0)
          yl += ticlength / 2;
        ctx.fillText(label, leftOffset + diagramWidth / 2 - w / 2, yl);
      }
    }
    function draw_xlabel() {
      var xl, yl, w, label = special(getProperty("xLabel")), units = special(getProperty("xUnit")), scaling = "" + xscaling.toPrecision(1), idx = scaling.indexOf("1e+");
      if (idx > -1)
        scaling = scaling.replace("1e+", "10^");
      else {
        idx = scaling.indexOf("1e");
        if (idx > -1)
          scaling = scaling.replace("1e", "10^");
      }
      ctx.fillStyle = new Color(rfront, gfront, bfront).toString();
      if (xscaling < 0.99 || xscaling > 1.01) {
        label += "  /  " + scaling;
        if (units.length > 0)
          label += " " + units;
      } else if (units.length > 0)
        label += "  [" + units + "]";
      ctx.font = "" + getProperty("xLabelHeight") + "px sans-serif";
      w = ctx.measureText(label).width;
      if (ycentered) {
        xl = leftOffset + diagramWidth - w;
        yl = yTOyp(0.) - 1.5 * ticlength;
      } else {
        xl = leftOffset + diagramWidth / 2 - w / 2;
        yl = upperOffset + diagramHeight + 3.2 * xtextheight;
        if (ticlength < 0)
          yl -= ticlength;
      }
      ctx.fillText(label, xl, yl);
    }
    function draw_ylabel(xl) {
      var yl, w, label = special(getProperty("yLabel")), units = special(getProperty("yUnit")), scaling = "" + yscaling.toPrecision(1), idx = scaling.indexOf("1e+");
      if (idx > -1)
        scaling = scaling.replace("1e+", "10^");
      else {
        idx = scaling.indexOf("1e");
        if (idx > -1)
          scaling = scaling.replace("1e", "10^");
      }
      ctx.fillStyle = new Color(rfront, gfront, bfront).toString();
      if (yscaling < 0.99 || yscaling > 1.01) {
        label += "  /  " + scaling;
        if (units.length > 0)
          label += " " + units;
      } else if (units.length > 0)
        label += "  [" + units + "]";
      ctx.font = "" + Number(getProperty("yLabelHeight")) + "px sans-serif";
      w = ctx.measureText(label).width;
      if (xcentered) {
        xl = xTOxp(0.) + 1.5 * ticlength;
        yl = upperOffset + 0.2 * ytextheight;
        ctx.fillText(label, xl, yl);
      } else {
        ctx.rotate(-Math.PI / 2);
        yl = xl - ytextheight;
        if (ticlength < 0)
          yl += ticlength;
        ctx.fillText(label, -w / 2 - lowerCostumeEdge / 2, yl);
        ctx.rotate(Math.PI / 2);
      }
    }
    function draw_scales() {
      var w, text, x, y, xs, ys, xl, yl, xpos, ypos, xp, yp, dt, t, n, xtics, ytics, xp1, xp2, yp1, yp2, xpoff, ypoff, xx = leftOffset;
      xs = xstart;
      x = xs * xscaling;
      xp = xTOxp(x);
      xpos = xp - leftOffset;
      ctx.lineWidth = 1;
      ctx.fillStyle = new Color(rfront, gfront, bfront).toString();
      ctx.strokeStyle = new Color(rfront, gfront, bfront).toString();
      ctx.font = "" + xtextheight + "px sans-serif";
      yp1 = diagramHeight + upperOffset;
      yp2 = upperOffset;
      ypoff = 0.;
      if (ycentered) {
        yp1 = yTOyp(0.);
        yp2 = yp1;
        ypoff = ticlength;
      }
      dt = xstep * xscaling / (xminitic + 1);
      n = 1;
      xtics = Math.abs(xTOxp(x + dt) - xTOxp(x)) > 4 && xminitic > 0;
      if (showXscale) {
        if (xtics) {
          while (n <= xminitic) {
            t = xTOxp(x - dt * n);
            if (t > leftOffset && t < leftOffset + diagramWidth) {
              ctx.moveTo(t, yp1 - ticlength / 2);
              ctx.lineTo(t, yp1 + ypoff / 2);
              if (!xcentered) {
                ctx.moveTo(t, yp2 - ypoff / 2);
                ctx.lineTo(t, yp2 + ticlength / 2);
              }
            }
            n += 1;
          }
        }
        if (ycentered)
          yl = yTOyp(0.) + 1.2 * ticlength + xtextheight;
        else
          yl = upperOffset + diagramHeight + xtextheight * 1.3;
        if (ticlength < 0)
          yl -= ticlength;
        while (xpos <= diagramWidth) {
          if (xpos >= 0) {
            text = xs.toFixed(xprecision);
            w = ctx.measureText(text).width;
            if (ygrid) {
              ctx.moveTo(xp, upperOffset);
              ctx.lineTo(xp, diagramHeight + upperOffset);
            }
            ctx.moveTo(xp, yp1 - ticlength);
            ctx.lineTo(xp, yp1 + ypoff);
            if (!xcentered) {
              ctx.moveTo(xp, yp2 - ypoff);
              ctx.lineTo(xp, yp2 + ticlength);
            }
            if (xtics) {
              n = 1;
              while (n <= xminitic) {
                t = xTOxp(x + dt * n);
                if (t > leftOffset && t < leftOffset + diagramWidth) {
                  ctx.moveTo(t, yp1 - ticlength / 2);
                  ctx.lineTo(t, yp1 + ypoff / 2);
                  if (!xcentered) {
                    ctx.moveTo(t, yp2 - ypoff / 2);
                    ctx.lineTo(t, yp2 + ticlength / 2);
                  }
                }
                n += 1;
              }
            }
            if (xp > w && xp < rightCostumeEdge - w)
              ctx.fillText(text, xp - w / 2, yl);
          }
          xs += xstep;
          w = xs / xstep;
          x = xs * xscaling;
          xp = xTOxp(x);
          xpos = xp - leftOffset;
        }
      }
      if (showYscale) {
        ctx.font = "" + ytextheight + "px sans-serif";
        ys = ystart;
        y = ys * yscaling;
        yp = yTOyp(y);
        ypos = yp - upperOffset;
        xp1 = leftOffset;
        xp2 = leftOffset + diagramWidth;
        xpoff = 0;
        if (xcentered) {
          xp1 = xTOxp(0.);
          xp2 = xp1;
          xpoff = ticlength;
        }
        dt = ystep * yscaling / (yminitic + 1);
        n = 1;
        ytics = Math.abs(yTOyp(y + dt) - yTOyp(y)) > 4 && yminitic > 0;
        if (ytics) {
          while (n <= yminitic) {
            t = yTOyp(y - dt * n);
            if (t > upperOffset && t < upperOffset + diagramHeight) {
              ctx.moveTo(xp1 - xpoff / 2, t);
              ctx.lineTo(xp1 + ticlength / 2, t);
              if (!ycentered) {
                ctx.moveTo(xp2 - ticlength / 2, t);
                ctx.lineTo(xp2 + xpoff / 2, t);
              }
            }
            n += 1;
          }
        }
        while (ypos >= 0) {
          if (ypos <= diagramHeight) {
            text = ys.toFixed(yprecision);
            w = ctx.measureText(text).width;
            if (xgrid) {
              ctx.moveTo(leftOffset, yp);
              ctx.lineTo(diagramWidth + leftOffset, yp);
            }
            ctx.moveTo(xp1 - xpoff, yp);
            ctx.lineTo(xp1 + ticlength, yp);
            if (!ycentered) {
              ctx.moveTo(xp2 - ticlength, yp);
              ctx.lineTo(xp2 + xpoff, yp);
            }
            if (ytics) {
              n = 1;
              while (n <= yminitic) {
                t = yTOyp(y + dt * n);
                if (t > upperOffset && t < upperOffset + diagramHeight) {
                  ctx.moveTo(xp1 - xpoff / 2, t);
                  ctx.lineTo(xp1 + ticlength / 2, t);
                  if (!ycentered) {
                    ctx.moveTo(xp2 - ticlength / 2, t);
                    ctx.lineTo(xp2 + xpoff / 2, t);
                  }
                }
                n += 1;
              }
            }
            if (xcentered) {
              xl = xTOxp(0.) - 1.2 * ticlength - w;
            } else {
              xl = leftOffset - 1.2 * ytextheight - 2 * w / 3;
              if (ticlength < 0)
                xl += ticlength;
            }
            if (yp > -w && yp < lowerCostumeEdge + w) {
              ctx.fillText(text, xl, yp + ytextheight * 0.4);
              if (xl < xx)
                xx = xl;
            }
          }
          ys += ystep;
          y = ys * yscaling;
          yp = yTOyp(y);
          ypos = yp - upperOffset;
        }
        if (xcentered)
          xl = leftOffset - 1.2 * ytextheight;
      }
      return xx;
    }
    ctx.beginPath();
    ctx.fillStyle = new Color(rback, gback, bback).toString();
    if (border)
      ctx.strokeStyle = new Color(rfront, gfront, bfront).toString();
    else
      ctx.strokeStyle = new Color(rback, gback, bback).toString();
    ctx.lineWidth = 1;
    if (!withclosebutton) {
      ctx.fillRect(0, 0, rightCostumeEdge, upperOffset);
      ctx.fillRect(rightCostumeEdge - 1, 0, 1, lowerCostumeEdge);
      ctx.fillRect(0, 0, leftOffset, lowerCostumeEdge);
    } else if (closebuttonleft) {
      ctx.fillRect(closebuttonsize + 1, 0, rightCostumeEdge, upperOffset);
      ctx.fillRect(rightCostumeEdge - 1, 0, 1, lowerCostumeEdge);
      ctx.fillRect(0, closebuttonsize + 1, leftOffset, lowerCostumeEdge);
    } else {
      ctx.fillRect(0, 0, rightCostumeEdge - closebuttonsize - 1, upperOffset);
      ctx.fillRect(rightCostumeEdge - 1, 0, 1, lowerCostumeEdge);
      ctx.fillRect(0, 0, leftOffset, lowerCostumeEdge);
    }
    ctx.fillRect(0, lowerCostumeEdge - lowerOffset + 1, rightCostumeEdge, lowerCostumeEdge);
    ctx.strokeRect(0, 0, rightCostumeEdge, lowerCostumeEdge);
    var xx = draw_scales();
    draw_title();
    draw_xlabel();
    draw_ylabel(xx + 4);
    xp1 = leftOffset;
    xp2 = leftOffset + diagramWidth;
    yp1 = upperOffset;
    yp2 = upperOffset + diagramHeight;
    xp = xTOxp(0.);
    yp = yTOyp(0.);
    if (xcentered && xp >= leftOffset && xp <= leftOffset + diagramWidth) {
      if (yUpper > yLower) {
        ctx.moveTo(xp, yp2);
        ctx.lineTo(xp, yp1 - ytextheight);
        ctx.lineTo(xp + 0.25 * ytextheight, yp1);
        ctx.lineTo(xp - 0.25 * ytextheight, yp1);
        ctx.lineTo(xp, yp1 - ytextheight);
      } else {
        ctx.moveTo(xp, yp1);
        ctx.lineTo(xp, yp2 + ytextheight);
        ctx.lineTo(xp + 0.25 * ytextheight, yp2);
        ctx.lineTo(xp - 0.25 * ytextheight, yp2);
        ctx.lineTo(xp, yp2 + ytextheight);
      }
    } else {
      ctx.moveTo(xp1, yp1);
      ctx.lineTo(xp1, yp2);
      if (!ycentered) {
        ctx.moveTo(xp2, yp1);
        ctx.lineTo(xp2, yp2);
      }
    }
    if (ycentered && yp >= upperOffset && yp <= upperOffset + diagramHeight) {
      if (xRight > xLeft) {
        ctx.moveTo(xp1, yp);
        ctx.lineTo(xp2 + xtextheight, yp);
        ctx.lineTo(xp2, yp + 0.25 * xtextheight);
        ctx.lineTo(xp2, yp - 0.25 * xtextheight);
        ctx.lineTo(xp2 + xtextheight, yp);
      } else {
        ctx.moveTo(xp2, yp);
        ctx.lineTo(xp1 - xtextheight, yp);
        ctx.lineTo(xp1, yp + 0.25 * ytextheight);
        ctx.lineTo(xp1, yp - 0.25 * ytextheight);
        ctx.lineTo(xp1 - xtextheight, yp);
      }
    } else {
      if (!xcentered) {
        ctx.moveTo(xp1, yp1);
        ctx.lineTo(xp2, yp1);
      }
      ctx.moveTo(xp1, yp2);
      ctx.lineTo(xp2, yp2);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    return costume;
  });
//Draw a graph on PlotPad--------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_addGraphToPlotpad(costume,properties,aFunction,proc)',
  function (costume, properties, aFunction, proc) {
    function xTOxp(x) {
      return x0 + (x * diagramWidth / (xRight - xLeft));
    }
    function yTOyp(y) {
      return y0 - (y * diagramHeight / (yUpper - yLower));
    }
    function xpTOx(xp) {
      return (xp - x0) * (xRight - xLeft) / diagramWidth;
    }
    function ypTOy(yp) {
      return (y0 - yp) * (yUpper - yLower) / diagramHeight;
    }
    function round(x, n) {
      return Math.round(x * Math.pow(10, n)) / Math.pow(10, n);
    }
    function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    function myFunction(f, x) {
      if (f instanceof List) {
        var grade = f.length(), result;
        if (grade == 0)
          return 0;
        else if (grade == 1)
          return Number(f.at(1));
        else {
          result = Number(f.at(1)) * Number(x) + Number(f.at(2));
          for (var i = 3; i <= grade; i++)
            result = result * Number(x) + Number(f.at(i));
          return result;
        }
      } else
        return proc.reportAtomicMap(f, new List([x])).at(1);
    }
    function plotFunction(f) {
      var xpos, ypos, x, y, xpOld, ypOld, plottedDots = 0, missingDots = 0, style = 1, modus = 1,
        r = Number(getProperty("lineColor").at(1)), g = Number(getProperty("lineColor").at(2)), b = Number(getProperty("lineColor").at(3)),
        lineStyle = getProperty("lineStyle"), lineWidth = Number(getProperty("lineWidth"));
      if (lineStyle.trim() == 'continuous')
        style = 1;
      else if (lineStyle.trim() == 'dashed')
        style = 2;
      else if (lineStyle.trim() == 'dash-dot')
        style = 3;
      else if (lineStyle.trim() == 'dot-dot')
        style = 4;
      ctx.beginPath();
      ctx.strokeStyle = new Color(r, g, b).toString();
      ctx.fillStyle = new Color(r, g, b).toString();
      ctx.lineWidth = lineWidth;
      xpOld = 0;
      x = xpTOx(xpOld);
      y = myFunction(f, x);
      ypOld = yTOyp(y);
      xpos = 1;
      while (xpos <= diagramWidth) {
        x = xpTOx(xpos);
        y = myFunction(f, x);
        ypos = yTOyp(y);
        if (modus > 0) {
          ctx.moveTo(xpOld + leftOffset, ypOld + upperOffset);
          ctx.lineTo(xpos + leftOffset, ypos + upperOffset);
          if (style > 1)
            plottedDots++;
        } else
          missingDots++;
        xpOld = xpos;
        ypOld = ypos;
        xpos = xpos + 1;
        if (style == 2) {
          if ((modus == 1) && (plottedDots > 3)) {
            modus = 0;
            plottedDots = 0;
            missingDots = 0;
          } else if ((modus == 0) && (missingDots > 2)) {
            modus = 1;
            plottedDots = 0;
            missingDots = 0;
          }
        }
        if (style == 3) {
          if ((modus == 1) && (plottedDots > 3)) {
            modus = 0;
            plottedDots = 0;
            missingDots = 0;
          } else if ((modus == 0) && (missingDots > 0)) {
            modus = 2;
            plottedDots = 0;
            missingDots = 0;
          } else if ((modus == 2) && (plottedDots > 0)) {
            modus = -1;
            plottedDots = 0;
            missingDots = 0;
          } else if ((modus == -1) && (missingDots > 0)) {
            modus = 1;
            plottedDots = 0;
            missingDots = 0;
          }
        }
        if (style == 4) {
          if ((modus == 1) && (plottedDots > 0)) {
            modus = 0;
            plottedDots = 0;
            missingDots = 0;
          } else if ((modus == 0) && (missingDots > 0)) {
            modus = 1;
            plottedDots = 0;
            missingDots = 0;
          }
        }
      }
      ctx.closePath();
      ctx.stroke();
    }
    function defineClip() {
      ctx.beginPath();
      ctx.linewidth = 0;
      ctx.strokeStyle = new Color(0, 0, 0);
      ctx.rect(leftOffset, upperOffset, diagramWidth, diagramHeight);
      ctx.closePath();
      ctx.clip();
    }
    function getProperty(key) {
      for (var i = 1; i <= properties.length(); i++)
        if (properties.at(i).at(1) === key)
          return properties.at(i).at(2);
      return "not found";
    }
    var xLeft = Number(getProperty("xLeft")), xRight = Number(getProperty("xRight")), yLower = Number(getProperty("yLower")), yUpper = Number(getProperty("yUpper")),
      leftOffset = Number(getProperty("scaleLeftOffset")), rightOffset = Number(getProperty("scaleRightOffset")), upperOffset = Number(getProperty("scaleUpperOffset")),
      lowerOffset = Number(getProperty("scaleLowerOffset")), ctx = costume.contents.getContext('2d'), rightCostumeEdge = costume.contents.width,
      lowerCostumeEdge = costume.contents.height, diagramWidth = rightCostumeEdge - leftOffset - rightOffset, diagramHeight = lowerCostumeEdge - lowerOffset - upperOffset,
      x0 = xLeft / (xLeft - xRight) * diagramWidth, y0 = yUpper / (yUpper - yLower) * diagramHeight;
    ctx.save();
    defineClip();
    plotFunction(aFunction);
    ctx.restore();
    return costume;
  });
//draw dataplot on PlotPad --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_addNumericDataplotToPlotPad(costume,properties,data)',
  function (costume, properties, data) {
    function getProperty(key) {
      for (var i = 1; i <= properties.length(); i++)
        if (properties.at(i).at(1) === key)
          return properties.at(i).at(2);
      return "not found";
    }
    function xTOxp(x) {
      return x0 + (x * diagramWidth / (xRight - xLeft));
    }
    function yTOyp(y) {
      return y0 - (y * diagramHeight / (yUpper - yLower));
    }
    function xpTOx(xp) {
      return (xp - x0) * (xRight - xLeft) / diagramWidth;
    }
    function ypTOy(yp) {
      return (y0 - yp) * (yUpper - yLower) / diagramHeight;
    }
    function round(x, n) {
      return Math.round(x * Math.pow(10, n)) / Math.pow(10, n);
    }
    function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    function rainbow(f) {
      var angle = 300. * f, r, g, b;
      if (angle < 60.) {
        r = 255;
        g = Math.floor(angle * 4.25 - 0.01);
        b = 0;
      } else if (angle < 120.) {
        r = Math.floor((120 - angle) * 4.25 - 0.01);
        g = 255;
        b = 0;
      } else if (angle < 180.) {
        r = 0;
        g = 255;
        b = Math.floor((angle - 120) * 4.25 - 0.01);
      } else if (angle < 240.) {
        r = 0;
        g = Math.floor((240 - angle) * 4.25 - 0.01);
        b = 255;
      } else if (angle < 300.) {
        r = Math.floor((angle - 240) * 4.25 - 0.01);
        g = 0;
        b = 255;
      } else {
        r = 255;
        g = 0;
        b = Math.floor((360 - angle) * 4.25 - 0.01);
      }
      return new Color(r, g, b).toString();
    }
    function plotData() {
      var linewidth = Number(getProperty("lineWidth")), linestyle = 1, datawidth = Number(getProperty("markerWidth")), datastyle = 1,
        arraydata = data.asArray(), xpos, ypos, xpOld, ypOld, w, i, connected = getProperty("markerConnected"), n = arraydata.length, frac = 0., attLineStyle, attDataStyle;
      attLineStyle = getProperty("lineStyle").trim();
      attDataStyle = getProperty("markerStyle").trim();
      if (attLineStyle == 'continuous')
        linestyle = 1;
      else if (attLineStyle == 'dashed')
        linestyle = 2;
      else if (attLineStyle == 'dash-dot')
        linestyle = 3;
      else if (attLineStyle == 'dot-dot')
        linestyle = 4;
      else if (attLineStyle == 'rainbow')
        linestyle = 5;
      else if (attLineStyle == 'inverse-rainbow')
        linestyle = 6;
      else if (attLineStyle == 'none')
        linestyle = 0;
      if (attDataStyle == 'o circle')
        datastyle = 1;
      else if (attDataStyle == 'o')
        datastyle = 1;
      else if (attDataStyle == 'circle')
        datastyle = 1;
      else if (attDataStyle == '._point')
        datastyle = 2;
      else if (attDataStyle == '.')
        datastyle = 2;
      else if (attDataStyle == 'point')
        datastyle = 2;
      else if (attDataStyle == '*_asterix')
        datastyle = 3;
      else if (attDataStyle == '*')
        datastyle = 3;
      else if (attDataStyle == 'asterix')
        datastyle = 3;
      else if (attDataStyle == '+_plus')
        datastyle = 4;
      else if (attDataStyle == '+')
        datastyle = 4;
      else if (attDataStyle == 'plus')
        datastyle = 4;
      else if (attDataStyle == 'x_ex')
        datastyle = 5;
      else if (attDataStyle == 'x')
        datastyle = 5;
      else if (attDataStyle == 'ex')
        datastyle = 5;
      else if (attDataStyle == 'square')
        datastyle = 6;
      else if (attDataStyle == 'triangle')
        datastyle = 7;
      else if (attDataStyle == 'none')
        datastyle = 0;
      ctx.lineWidth = linewidth;
      if (linestyle == 2)
        ctx.setLineDash([10, 5]);
      else if (linestyle == 3)
        ctx.setLineDash([10, 2, 1, 2]);
      else if (linestyle == 4)
        ctx.setLineDash([1, 2]);
      else
        ctx.setLineDash([]);
      if ((linestyle > 0) && connected) {
        ctx.beginPath();
        ctx.strokeStyle = lcolor;
        ctx.fillStyle = lcolor;
        if (n > 0) {
          xpOld = xTOxp(arraydata[0].at(1));
          ypOld = yTOyp(arraydata[0].at(2));
        }
        i = 0;
        while (i < n) {
          xpos = xTOxp(arraydata[i].at(1));
          ypos = yTOyp(arraydata[i].at(2));
          if (i > 0) {
            frac = (i + 0.) / (n + 0.);
            if (linestyle == 5)
              ctx.strokeStyle = rainbow(frac);
            ctx.moveTo(xpOld + leftOffset, ypOld + upperOffset);
            ctx.lineTo(xpos + leftOffset, ypos + upperOffset);
            if (linestyle == 5 || linestyle == 6) {
              ctx.closePath();
              ctx.fill();
              ctx.stroke();
              ctx.beginPath();
            }
          }
          xpOld = xpos;
          ypOld = ypos;
          i = i + 1;
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
      ctx.setLineDash([]);
      if (datastyle > 0) {
        ctx.strokeStyle = lcolor;
        ctx.fillStyle = mcolor;
        if (arraydata.length > 0) {
          xpOld = xTOxp(arraydata[0].at(1));
          ypOld = yTOyp(arraydata[0].at(2));
        }
        i = 0;
        while (i < arraydata.length) {
          ctx.beginPath();
          xpos = xTOxp(arraydata[i].at(1));
          ypos = yTOyp(arraydata[i].at(2));
          if (datastyle == 1)
            ctx.arc(xpos + leftOffset, ypos + upperOffset, datawidth / 2, 0, 6.28318531);
          else if (datastyle == 2)
            ctx.arc(xpos + leftOffset, ypos + upperOffset, 2, 0, 6.28318531);
          else if (datastyle == 3) {
            ctx.font = "" + 2 * datawidth * 3 + "px sans-serif";
            w = ctx.measureText("*").width;
            ctx.fillText("*", xpos + leftOffset - w / 2, ypos + upperOffset + datawidth / 2);
          } else if (datastyle == 4) {
            ctx.font = "" + datawidth * 3 + "px sans-serif";
            w = ctx.measureText("+").width;
            ctx.fillText("+", xpos + leftOffset - w / 2, ypos + upperOffset + datawidth / 2);
          } else if (datastyle == 5) {
            ctx.font = "" + datawidth * 3 + "px sans-serif";
            w = ctx.measureText("X").width;
            ctx.fillText("X", xpos + leftOffset - w / 2, ypos + upperOffset + datawidth / 2);
          } else if (datastyle == 6) {
            ctx.fillRect(xpos + leftOffset - datawidth / 2, ypos + upperOffset - datawidth / 2, datawidth, datawidth);
            ctx.strokeRect(xpos + leftOffset - datawidth / 2, ypos + upperOffset - datawidth / 2, datawidth, datawidth);
          } else if (datastyle == 7) {
            ctx.moveTo(xpos + leftOffset, ypos + upperOffset - datawidth / 2);
            ctx.lineTo(xpos + leftOffset - datawidth / 2, ypos + upperOffset + datawidth / 2);
            ctx.lineTo(xpos + leftOffset + datawidth / 2, ypos + upperOffset + datawidth / 2);
            ctx.lineTo(xpos + leftOffset, ypos + upperOffset - datawidth / 2);
          }
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          xpOld = xpos;
          ypOld = ypos;
          i = i + 1;
        }
      }
    }
    function defineClip() {
      ctx.beginPath();
      ctx.linewidth = 0;
      ctx.strokeStyle = new Color(0, 0, 0);
      ctx.rect(leftOffset, upperOffset, diagramWidth, diagramHeight);
      ctx.closePath();
      ctx.clip();
    }
    var xLeft = Number(getProperty("xLeft")), xRight = Number(getProperty("xRight")), yLower = Number(getProperty("yLower")), yUpper = Number(getProperty("yUpper")),
      leftOffset = Number(getProperty("scaleLeftOffset")), rightOffset = Number(getProperty("scaleRightOffset")), upperOffset = Number(getProperty("scaleUpperOffset")),
      lowerOffset = Number(getProperty("scaleLowerOffset")), ctx = costume.contents.getContext('2d'), rightCostumeEdge = costume.contents.width,
      lowerCostumeEdge = costume.contents.height, diagramWidth = rightCostumeEdge - leftOffset - rightOffset, diagramHeight = lowerCostumeEdge - lowerOffset - upperOffset,
      x0 = xLeft / (xLeft - xRight) * diagramWidth, y0 = yUpper / (yUpper - yLower) * diagramHeight,
      lcolor = new Color(Number(getProperty("lineColor").at(1)), Number(getProperty("lineColor").at(2)), Number(getProperty("lineColor").at(3))).toString(),
      mcolor = new Color(Number(getProperty("markerColor").at(1)), Number(getProperty("markerColor").at(2)), Number(getProperty("markerColor").at(3))).toString();
    ctx.save();
    defineClip();
    plotData();
    ctx.restore();
    return costume;
  });
//draw dataplot on PlotPad --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_addMixedDataplotToPlotPad(costume,properties,data)',
  function (costume, properties, data) {
    function getProperty(key) {
      for (var i = 1; i <= properties.length(); i++)
        if (properties.at(i).at(1) === key)
          return properties.at(i).at(2);
      return "not found";
    }
    function xTOxp(x) {
      return x0 + (x * diagramWidth / (xRight - xLeft));
    }
    function yTOyp(y) {
      return y0 - (y * diagramHeight / (yUpper - yLower));
    }
    function xpTOx(xp) {
      return (xp - x0) * (xRight - xLeft) / diagramWidth;
    }
    function ypTOy(yp) {
      return (y0 - yp) * (yUpper - yLower) / diagramHeight;
    }
    function round(x, n) {
      return Math.round(x * Math.pow(10, n)) / Math.pow(10, n);
    }
    function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    function rainbow(f) {
      var angle = 300. * f, r, g, b;
      if (angle < 60.) {
        r = 255;
        g = Math.floor(angle * 4.25 - 0.01);
        b = 0;
      } else if (angle < 120.) {
        r = Math.floor((120 - angle) * 4.25 - 0.01);
        g = 255;
        b = 0;
      } else if (angle < 180.) {
        r = 0;
        g = 255;
        b = Math.floor((angle - 120) * 4.25 - 0.01);
      } else if (angle < 240.) {
        r = 0;
        g = Math.floor((240 - angle) * 4.25 - 0.01);
        b = 255;
      } else if (angle < 300.) {
        r = Math.floor((angle - 240) * 4.25 - 0.01);
        g = 0;
        b = 255;
      } else {
        r = 255;
        g = 0;
        b = Math.floor((360 - angle) * 4.25 - 0.01);
      }
      return new Color(r, g, b).toString();
    }
    function plotData() {
      var linewidth = Number(getProperty("lineWidth")), linestyle = 0, datawidth = Number(getProperty("markerWidth")), datastyle = 1,
        arraydata = data.asArray(), xpos, ypos, xpOld, ypOld, w, i = 0, n = arraydata.length, frac = 0., attLineStyle, attDataStyle;
      attLineStyle = getProperty("lineStyle").trim();
      attDataStyle = getProperty("markerStyle").trim();
      if (attLineStyle == 'continuous')
        linestyle = 1;
      else if (attLineStyle == 'dashed')
        linestyle = 2;
      else if (attLineStyle == 'dash-dot')
        linestyle = 3;
      else if (attLineStyle == 'dot-dot')
        linestyle = 4;
      else if (attLineStyle == 'rainbow')
        linestyle = 5;
      else if (attLineStyle == 'inverse-rainbow')
        linestyle = 6;
      else if (attLineStyle == 'none')
        linestyle = 0;
      connected = linestyle > 0;
      if (attDataStyle == 'o circle')
        datastyle = 1;
      else if (attDataStyle == 'o')
        datastyle = 1;
      else if (attDataStyle == 'circle')
        datastyle = 1;
      else if (attDataStyle == '._point')
        datastyle = 2;
      else if (attDataStyle == '.')
        datastyle = 2;
      else if (attDataStyle == 'point')
        datastyle = 2;
      else if (attDataStyle == '*_asterix')
        datastyle = 3;
      else if (attDataStyle == '*')
        datastyle = 3;
      else if (attDataStyle == 'asterix')
        datastyle = 3;
      else if (attDataStyle == '+_plus')
        datastyle = 4;
      else if (attDataStyle == '+')
        datastyle = 4;
      else if (attDataStyle == 'plus')
        datastyle = 4;
      else if (attDataStyle == 'x_ex')
        datastyle = 5;
      else if (attDataStyle == 'x')
        datastyle = 5;
      else if (attDataStyle == 'ex')
        datastyle = 5;
      else if (attDataStyle == 'square')
        datastyle = 6;
      else if (attDataStyle == 'triangle')
        datastyle = 7;
      else if (attDataStyle == 'none')
        datastyle = 8;
      else
        datastyle = 1;
      ctx.strokeStyle = new Color(Number(getProperty("lineColor").at(1)), Number(getProperty("lineColor").at(2)), Number(getProperty("lineColor").at(3))).toString();
      ctx.fillStyle = new Color(Number(getProperty("markerColor").at(1)), Number(getProperty("markerColor").at(2)), Number(getProperty("markerColor").at(3))).toString();
      ctx.lineWidth = linewidth;
      if (linestyle == 2)
        ctx.setLineDash([10, 10]);
      else if (linestyle == 3)
        ctx.setLineDash([10, 5, 2, 5]);
      else if (linestyle == 4)
        ctx.setLineDash([2, 5]);
      else
        ctx.setLineDash([]);
      if (arraydata.length > 0) {
        dx = 0.9 * (xRight - xLeft) / (arraydata.length - 1);
        x = xLeft + 0.1 * dx;
        xpOld = xTOxp(x);
        ypOld = yTOyp(arraydata[0].at(2));
      }
      while (i < arraydata.length) {
        xpos = xTOxp(x);
        ypos = yTOyp(arraydata[i].at(2));
        if (connected && i > 0) {
          ctx.beginPath();
          if (linestyle == 5)
            ctx.strokeStyle = rainbow((i + 0.) / (arraydata.length + 0.));
          ctx.moveTo(xpOld + leftOffset, ypOld + upperOffset);
          ctx.lineTo(xpos + leftOffset, ypos + upperOffset);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }
        ctx.beginPath();
        if (datastyle == 1)
          ctx.arc(xpos + leftOffset, ypos + upperOffset, datawidth / 2, 0, 6.28318531);
        else if (datastyle == 2)
          ctx.arc(xpos + leftOffset, ypos + upperOffset, 2, 0, 6.28318531);
        else if (datastyle == 3) {
          ctx.font = "" + 2 * datawidth * 3 + "px sans-serif";
          w = ctx.measureText("*").width;
          ctx.fillText("*", xpos + leftOffset - w / 2, ypos + upperOffset + datawidth / 2);
        } else if (datastyle == 4) {
          ctx.font = "" + datawidth * 3 + "px sans-serif";
          w = ctx.measureText("+").width;
          ctx.fillText("+", xpos + leftOffset - w / 2, ypos + upperOffset + datawidth / 2);
        } else if (datastyle == 5) {
          ctx.font = "" + datawidth * 3 + "px sans-serif";
          w = ctx.measureText("X").width;
          ctx.fillText("X", xpos + leftOffset - w / 2, ypos + upperOffset + datawidth / 2);
        } else if (datastyle == 6) {
          ctx.fillRect(xpos + leftOffset - datawidth / 2, ypos + upperOffset - datawidth / 2, datawidth, datawidth);
          ctx.strokeRect(xpos + leftOffset - datawidth / 2, ypos + upperOffset - datawidth / 2, datawidth, datawidth);
        } else if (datastyle == 7) {
          ctx.moveTo(xpos + leftOffset, ypos + upperOffset - datawidth / 2);
          ctx.lineTo(xpos + leftOffset - datawidth / 2, ypos + upperOffset + datawidth / 2);
          ctx.lineTo(xpos + leftOffset + datawidth / 2, ypos + upperOffset + datawidth / 2);
          ctx.lineTo(xpos + leftOffset, ypos + upperOffset - datawidth / 2);
        } else if (datastyle == 8) {
          ctx.moveTo(xpos + leftOffset, ypos + upperOffset);
          ctx.lineTo(xpos + leftOffset, ypos + upperOffset + 1);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        xpOld = xpos;
        ypOld = ypos;
        i = i + 1;
        x = x + dx;
      }
      ctx.setLineDash([]);
    }
    var xLeft = Number(getProperty("xLeft")), xRight = Number(getProperty("xRight")), yLower = Number(getProperty("yLower")), yUpper = Number(getProperty("yUpper")),
      leftOffset = Number(getProperty("scaleLeftOffset")), rightOffset = Number(getProperty("scaleRightOffset")), upperOffset = Number(getProperty("scaleUpperOffset")),
      lowerOffset = Number(getProperty("scaleLowerOffset")), ctx = costume.contents.getContext('2d'), rightCostumeEdge = costume.contents.width,
      lowerCostumeEdge = costume.contents.height, diagramWidth = rightCostumeEdge - leftOffset - rightOffset, diagramHeight = lowerCostumeEdge - lowerOffset - upperOffset,
      x0 = xLeft / (xLeft - xRight) * diagramWidth, y0 = yUpper / (yUpper - yLower) * diagramHeight;
    plotData();
    ctx.restore();
    return costume;
  });
//draw histogram on PlotPad --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set(
  'SciS_addHistogramToPlotpad(costume,properties,data)',
  function (costume, properties, data) {
    function getProperty(key) {
      for (var i = 1; i <= properties.length(); i++)
        if (properties.at(i).at(1) === key)
          return properties.at(i).at(2);
      return "not found";
    }
    function xTOxp(x) {
      return x0 + (x * diagramWidth / (xRight - xLeft));
    }
    function yTOyp(y) {
      return y0 - (y * diagramHeight / (yUpper - yLower));
    }
    function xpTOx(xp) {
      return (xp - x0) * (xRight - xLeft) / diagramWidth;
    }
    function ypTOy(yp) {
      return (y0 - yp) * (yUpper - yLower) / diagramHeight;
    }
    function round(x, n) {
      return Math.round(x * Math.pow(10, n)) / Math.pow(10, n);
    }
    function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    function rainbow(f) {
      var angle = 300. * f, r, g, b;
      if (angle < 60.) {
        r = 255;
        g = Math.floor(angle * 4.25 - 0.01);
        b = 0;
      } else if (angle < 120.) {
        r = Math.floor((120 - angle) * 4.25 - 0.01);
        g = 255;
        b = 0;
      } else if (angle < 180.) {
        r = 0;
        g = 255;
        b = Math.floor((angle - 120) * 4.25 - 0.01);
      } else if (angle < 240.) {
        r = 0;
        g = Math.floor((240 - angle) * 4.25 - 0.01);
        b = 255;
      } else if (angle < 300.) {
        r = Math.floor((angle - 240) * 4.25 - 0.01);
        g = 0;
        b = 255;
      } else {
        r = 255;
        g = 0;
        b = Math.floor((360 - angle) * 4.25 - 0.01);
      }
      return new Color(r, g, b).toString();
    }
    function defineClip() {
      ctx.beginPath();
      ctx.linewidth = 0;
      ctx.strokeStyle = new Color(0, 0, 0);
      ctx.rect(leftOffset + 1, upperOffset + 1, diagramWidth - 2, diagramHeight - 2);
      ctx.closePath();
      ctx.clip();
    }
    function plotHistogram() {
      var linewidth = Number(getProperty("lineWidth")), linestyle = 1, yZero = yTOyp(0.), arraydata = data.asArray(), xp, yp, i, xold, n = arraydata.length, x = arraydata[0].at(1), y = arraydata[0].at(2),
        dx = arraydata[1].at(1) - x, lcolor = new Color(Number(getProperty("lineColor").at(1)), Number(getProperty("lineColor").at(2)), Number(getProperty("lineColor").at(3))).toString(), attLineStyle;
      attLineStyle = getProperty("lineStyle").trim();
      if (n == 0)
        return;
      if (attLineStyle == 'continuous')
        linestyle = 1;
      else if (attLineStyle == 'dashed')
        linestyle = 2;
      else if (attLineStyle == 'dash-dot')
        linestyle = 3;
      else if (attLineStyle == 'dot-dot')
        linestyle = 4;
      else if (attLineStyle == 'rainbow')
        linestyle = 5;
      else if (attLineStyle == 'inverse-rainbow')
        linestyle = 6;
      else if (attLineStyle == 'none')
        linestyle = 0;
      if (linestyle === 0)
        return;
      ctx.lineWidth = linewidth;
      if (linestyle == 2)
        ctx.setLineDash([10, 5]);
      else if (linestyle == 3)
        ctx.setLineDash([10, 2, 1, 2]);
      else if (linestyle == 4)
        ctx.setLineDash([1, 2]);
      else
        ctx.setLineDash([]);
      ctx.beginPath();
      ctx.strokeStyle = lcolor;
      ctx.fillStyle = new Color(Number(getProperty("markerColor").at(1)), Number(getProperty("markerColor").at(2)), Number(getProperty("markerColor").at(3))).toString();
      xp = xTOxp(x);
      yp = yTOyp(0.);
      ctx.moveTo(xp, yp);
      i = 0;
      while (i < n) {
        xold = xp;
        x = arraydata[i].at(1);
        y = arraydata[i].at(2);
        yp = yTOyp(y);
        ctx.moveTo(xp + leftOffset, yZero + upperOffset);
        ctx.lineTo(xp + leftOffset, yp + upperOffset);
        xp = xTOxp(x + dx);
        ctx.lineTo(xp + leftOffset, yp + upperOffset);
        ctx.lineTo(xp + leftOffset, yZero + upperOffset);
        ctx.lineTo(xold + leftOffset, yZero + upperOffset);
        i = i + 1;
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    var xLeft = Number(getProperty("xLeft")), xRight = Number(getProperty("xRight")), yLower = Number(getProperty("yLower")), yUpper = Number(getProperty("yUpper")),
      leftOffset = Number(getProperty("scaleLeftOffset")), rightOffset = Number(getProperty("scaleRightOffset")), upperOffset = Number(getProperty("scaleUpperOffset")),
      lowerOffset = Number(getProperty("scaleLowerOffset")), ctx = costume.contents.getContext('2d'), rightCostumeEdge = costume.contents.width,
      lowerCostumeEdge = costume.contents.height, diagramWidth = rightCostumeEdge - leftOffset - rightOffset, diagramHeight = lowerCostumeEdge - lowerOffset - upperOffset,
      x0 = xLeft / (xLeft - xRight) * diagramWidth, y0 = yUpper / (yUpper - yLower) * diagramHeight;
    ctx.save();
    defineClip();
    plotHistogram();
    ctx.restore();
    return costume;
  });

//================= options of the ImagePad palette ============================================================
//add image to ImagePad ----------------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_addImageToImagePad(data,properties,color,log,alpha,pixels,selection)', 
  function (data,properties,color,log,alpha,pixels,selection) {
    function property(key) {var i = 1;
      while (i <= properties.length()){if(properties.at(i).at(1) == key) return properties.at(i).at(2); i++;}
      return '-';}
    var leftOffset = Number(property("offsets").at(1)), upperOffset = Number(property("offsets").at(2)), imageWidth = Number(property("imageWidth")), imageHeight = Number(property("imageHeight")),
        costumeWidth = Number(property("costumeWidth")), costumeHeight = Number(property("costumeHeight")),max = Number(property("maxValue")), min = Number(property("minValue")), imageType = property("typeOfData"),
        oldPixel, newPixel, value, n, ratio, result, interval = (max - min) / 8, xLeft, xRight, yUpper, yLower, canvas, ctx, src, dta, i, k, px;
    if (data.length() == 0) return new Costume();
    xLeft= leftOffset+1; if(xLeft<1) xLeft=1; xRight = costumeWidth; if(leftOffset+imageWidth<xRight) xRight=leftOffset+imageWidth;
    yUpper = upperOffset+1; if(yUpper<1) yUpper=1; yLower = costumeHeight; if(upperOffset+imageHeight<yLower) yLower = upperOffset+imageHeight;
    for(var y=yUpper; y<=yLower; y++){
      for(var x=xLeft; x <= xRight;x++){
        oldPixel = pixels.at((y-1)*costumeWidth+x); // the pixel of present image
        newPixel = data.at((y-upperOffset-1)*imageWidth+x-leftOffset); //imagevalue of new image
        if (imageType === "FITS") value = newPixel; else if (color === "red") value = newPixel.at(1); else if (color === "green") value = newPixel.at(2);
        else if (color === "blue") value =newPixel.at(3); else value = (newPixel.at(1) + newPixel.at(2) + newPixel.at(3)) / 3;
        n = value; if (value <= min) n = min + 1; if (value > max) n = max;
        if (log) n = Math.round(Math.log(n - min) / Math.log(max - min) * 255); else n = Math.round((n - min) / (max - min) * 255);
        if ((color === "RGB") && ((value < min) || (value > max))) newPixel = new List([0, 0, 0, data.at(i).at(4)]);
        if (color === "gray") newPixel = new List([n, n, n, alpha]); if (color === "red") newPixel = new List([n, 0, 0, alpha]);
        if (color === "green") newPixel = new List([0, n, 0, alpha]); if (color === "blue") newPixel = new List([0, 0, n, alpha]);
        if (color === "false-color") {
          if (value <= min) newPixel = new List([0, 0, 0, alpha]); else if (value < min + interval) newPixel = new List([0, 0, n, alpha]);
          else if (value < min + 2 * interval) newPixel = new List([0, n, n, alpha]); else if (value < min + 3 * interval) newPixel = new List([n, 0, n, alpha]);
          else if (value < min + 4 * interval) newPixel = new List([0, n, 0, alpha]); else if (value < min + 5 * interval) newPixel = new List([n, 0, 0, alpha]);
          else if (value < min + 6 * interval) newPixel = new List([n, n / 2, 0, alpha]); else if (value < min + 7 * interval) newPixel = new List([n, n, 0, alpha]);
          else if (value < min + 8 * interval) newPixel = new List([n, n, n, alpha]); else newPixel = new List([255, 255, 255, alpha]);}
        result = new List(); 
        if(selection==='create') result = newPixel;
          else if(selection==='add'){for (var n = 1; n <= 4; n++) result.add(Math.min(newPixel.at(n) + oldPixel.at(n),255));}
                 else if(selection==='mix'){ratio = newPixel.at(4) / 255; for (var n = 1; n <= 4; n++) result.add(ratio * newPixel.at(n) + (1.0 - ratio) * oldPixel.at(n));}
        pixels.put(result,(y-1)*costumeWidth+x);
        }
      }
    canvas = newCanvas(new Point(costumeWidth,costumeHeight), true);  //modified Snap! source
    ctx = canvas.getContext('2d'); src = pixels.itemsArray(); dta = ctx.createImageData(costumeWidth, costumeHeight);
    for (i = 0; i < src.length; i += 1) {
        px = src[i] instanceof List ? src[i].itemsArray() : [src[i]];
        for (k = 0; k < 3; k += 1) {
            dta.data[(i * 4) + k] = px[k] === undefined ? +px[0] : +px[k];
        }
        dta.data[i * 4 + 3] = (px[3] === undefined ? 255 : +px[3]);
    }
    ctx.putImageData(dta, 0, 0);
    return new Costume(canvas,null,null,true,null);
  });
//drawListOfPoints on ImagePad ----------------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_drawListOfPoints(costume,data,shape,size,properties,withNoise,range)',
  function (costume, data, shape, size, properties,withNoise,range) {
    function property(key) {
      var i = 1;
      while (i <= properties.length()) {
        if (properties.at(i).at(1) == key)
          return properties.at(i).at(2);
        i++;
      }
      return '-';
    }
  function modify(value){
    value = value + Math.round(Math.random()*2*range-range);
    if(value>255) value = value+510-value;
    if(value<0) value = -value;
    return value;   
    }
    var ctx = costume.contents.getContext('2d'), style = property("lineStyle").trim(), w = Number(property("lineWidth")), lineColor = property("lineColor"), fillColor = property("fillColor"),
      ro = Number(lineColor.at(1)), go = Number(lineColor.at(2)), bo = Number(lineColor.at(3)), r = Number(fillColor.at(1)), g = Number(fillColor.at(2)), b = Number(fillColor.at(3));
    if (style == 'dashed')
      ctx.setLineDash([10, 10]);
    else if (style == 'dash-dot')
      ctx.setLineDash([10, 5, 2, 5]);
    else if (style == 'dot-dot')
      ctx.setLineDash([2, 5]);
    else
      ctx.setLineDash([]);
    size = Number(size);
    ctx.strokeStyle = new Color(ro, go, bo).toString();
    ctx.fillStyle = new Color(r, g, b).toString();
    for (var i = 1; i <= data.length(); i++) {
      if(withNoise){
        ctx.strokeStyle = new Color(modify(ro), modify(go), modify(bo)).toString();
        ctx.fillStyle = new Color(modify(r), modify(g), modify(b)).toString();
        }
      if (shape === "circles") {
        ctx.beginPath();
        ctx.arc(data.at(i).at(1), data.at(i).at(2), size, 0, 6.283185307179586476925286766559);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
      if (shape === "squares") {
        ctx.beginPath();
        ctx.fillRect(data.at(i).at(1) - size, data.at(i).at(2) - size, 2 * size, 2 * size);
        ctx.strokeRect(data.at(i).at(1) - size, data.at(i).at(2) - size, 2 * size, 2 * size);
        ctx.closePath();
        ctx.stroke();  
        ctx.fill();
      }
    }
    return costume;
  });
//brightness on ImagePad ----------------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set(
  'SciS_brightness(data,xpos,ypos,r,width,height,typeOfData,typeOfArea)',
  function (data, xpos, ypos, r, width, height, typeOfData, typeOfArea) {
    var value, sumOfValues, points, y, x;
    function imageValue(xp, yp) {
      if ((xp > width) || (xp < 1) || (yp > height) || (yp < 1))
        return -1;
      else
        return data.at(xp + (yp - 1) * width);
    }
    xpos=Number(xpos); ypos=Number(ypos); r=Number(r); width=Number(width); height=Number(height);
    sumOfValues = 0, points = 0, y = ypos - r;
    if (typeOfArea === 'circle') {
      if (typeOfData == 'FITS') {
        while ((y <= ypos + r) && (y <= height)) {
          x = xpos - r;
          while ((x <= xpos + r) && (x <= width)) {
            if (r >= Math.sqrt((xpos - x) * (xpos - x) + (ypos - y) * (ypos - y))) {
              value = imageValue(Math.round(x), Math.round(y));
              if (value !== -1) {
                sumOfValues = sumOfValues + value;
                points++;
              }
            }
            x++;
          }
          y++;
        }
        return new List([sumOfValues, points]);
      } else {
        sumOfValues = [0, 0, 0];
        while ((y <= ypos + r) && (y <= height)) {
          x = xpos - r;
          while ((x <= xpos + r) && (x <= width)) {
            if (r >= Math.sqrt((xpos - x) * (xpos - x) + (ypos - y) * (ypos - y))) {
              value = imageValue(Math.round(x), Math.round(y));
              if (value !== -1) {
                sumOfValues = [sumOfValues[0] + value.at(1), sumOfValues[1] + value.at(2), sumOfValues[2] + value.at(3)];
                points++;
              }
            }
            x++;
          }
          y++;
        }
        return new List([new List(sumOfValues), points]);
      }
    }
    if (typeOfArea === 'square') {
      if (typeOfData == 'FITS') {
        while ((y <= ypos + r) && (y <= height)) {
          x = xpos - r;
          while ((x <= xpos + r) && (x <= width)) {
            value = imageValue(Math.round(x), Math.round(y));
            if (value !== -1) {
              sumOfValues = sumOfValues + value;
              points++;
            }
            x++;
          }
          y++;
        }
        return new List([sumOfValues, points]);
      } else {
        sumOfValues = [0, 0, 0];
        while ((y <= ypos + r) && (y <= height)) {
          x = xpos - r;
          while ((x <= xpos + r) && (x <= width)) {
            value = imageValue(Math.round(x), Math.round(y));
            if (value !== -1) {
              sumOfValues = [sumOfValues[0] + value.at(1), sumOfValues[1] + value.at(2), sumOfValues[2] + value.at(3)];
              points++;
            }
            x++;
          }
          y++;
        }
      }
      return new List([new List(sumOfValues), points]);
    }
  });
//affine transformation of a costume ----------------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set(
  'SciS_affineTransformation(a11,a12,a13,a21,a22,a23,w,h,data,typeOfData)',
  function (a11, a12, a13, a21, a22, a23, w, h, data, typeOfData) {
    var x, y, xnew, ynew, value, newdata = [];
    for (var i = 1; i <= data.contents.length; i++)
      if (typeOfData == 'FITS')
        newdata.push(0);
      else
        newdata.push(new List([0, 0, 0, 255]));
    for (var y = 1; y <= h; y++)
      for (var x = 1; x <= w; x++) {
        value = data.at(x + (y - 1) * w);
        xnew = Math.round(a11 * x + a12 * y + a13);
        ynew = Math.round(a21 * x + a22 * y + a23);
        if ((xnew > 0) && (xnew <= w) && (ynew > 0) && (ynew <= h))
          newdata[xnew - 1 + (ynew - 1) * w - 1] = value;
      }
    return new List(newdata);
  });
//collect slice data of an image ----------------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_collectSliceData(p1,p2,dist,imageData,width,height,imageType)',
  function (p1, p2, dist, imageData, width, height, imageType) {
    var x1 = Number(p1.at(1)), y1 = Number(p1.at(2)), x2 = Number(p2.at(1)), y2 = Number(p2.at(2)), dx, dy, i, result;
    dist = Number(dist);
    width = Number(width);
    height = Number(height);
    function imageValue(x, y) {
      if ((x > width) || (x < 1) || (y > height) || (y < 1)) {
        if (imageType === 'FITS')
          return 0;
        else
          return new List([0, 0, 0]);
      } else
        return imageData.at(x + (y - 1) * width);
    }
    dx = (x2 - x1) / dist;
    dy = (y2 - y1) / dist;
    i = 0;
    result = [];
    while (i <= dist) {
      result.push(new List([i, imageValue(Math.round(x1 + i * dx), Math.round(y1 + i * dy))]));
      i++;
    }
    return new List(result);
  });
//create new costums for ImagePad tools --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_changeToolCostume(size,tool,color)',
  function (size, tool, color) {
    var minSize, result = [], x = 1, y = 1, r, d = size / 2, d2 = Math.sqrt(2) * (d - size / 5);
    if ((tool === 'lineEnd1') || (tool === 'lineEnd2'))
      minSize = size / 2;
    else
      minSize = size / 5;
    if (color.length() < 4)
      color.add(255);
    while (y <= size) {
      if ((tool === 'lineEnd1') || (tool === 'lineEnd2'))
        if (Math.sqrt((x - minSize) * (x - minSize) + (y - minSize) * (y - minSize)) > minSize)
          result.push(new List([255, 255, 255, 0]));
        else
          result.push(color);
      if (tool === 'squareTool') {
        r = Math.sqrt((x - d) * (x - d) + (y - d) * (y - d));
        if ((x == 1) || (x == size) || (y == 1) || (y == size))
          result.push(color);
        else if (((x <= minSize) || (x >= size - minSize)) && ((y <= minSize) || (y >= size - minSize)))
          result.push(color);
        else if ((r < d2 + 1) && (r > d2 - 1))
          result.push(color);
        else
          result.push(new List([255, 255, 255, 0]));
      }
      x++;
      if (x > size) {
        x = 1;
        y++;
      }
    }
    return new List(result);
  });
//image arthmetic --------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_imageArithmetic(image1,image2,imageType,xOffset,yOffset,width1,height1,width2,height2,operation)',
  function (image1, image2, imageType, xOffset, yOffset, width1, height1, width2, height2, operation) {
    var result = [], result2, pixel1, pixel2, newPixel, min = 1000000, max = -1000000;
    function isImagePointOfImage2(x, y) {
      return((x > 0) && (x <= width2) && (y > 0) && (y <= height2));
    }
    if (imageType === 'FITS') {
      for (var y = 1; y <= height1; y++)
        for (var x = 1; x <= width1; x++) {
          pixel1 = image1.at((y - 1) * width1 + x);
          if (!isImagePointOfImage2(x - xOffset, y - yOffset))
            result.push(pixel1);
          else {
            pixel2 = image2.at((y - yOffset - 1) * width2 + x - xOffset);
            if (operation === '+')
              result.push(pixel1 + pixel2);
            if (operation === '-')
              result.push(pixel1 - pixel2);
            if (operation === '*')
              result.push(pixel1 * pixel2);
            if (operation === '/')
              if (pixel2 !== 0)
                result.push(pixel1 / pixel2);
              else
                result.push(0);
          }
        }
       return new List(result);
    }
    if (imageType === 'RGB') {
      for (var y = 1; y <= height1; y++)
        for (var x = 1; x <= width1; x++) {
          pixel1 = image1.at((y - 1) * width1 + x);
          if (!isImagePointOfImage2(x - xOffset, y - yOffset))
            result.push(pixel1);
          else {
            pixel2 = image2.at((y - yOffset - 1) * width2 + x - xOffset);
            if (operation === '+')
              newPixel = new List([pixel1.at(1) + pixel2.at(1), pixel1.at(2) + pixel2.at(2), pixel1.at(3) + pixel2.at(3), pixel1.at(4) + pixel2.at(4)]);
            if (operation === '-')
              newPixel = new List([pixel1.at(1) - pixel2.at(1), pixel1.at(2) - pixel2.at(2), pixel1.at(3) - pixel2.at(3), pixel1.at(4) - pixel2.at(4)]);
            if (operation === '*')
              newPixel = new List([pixel1.at(1) * pixel2.at(1), pixel1.at(2) * pixel2.at(2), pixel1.at(3) * pixel2.at(3), pixel1.at(4) * pixel2.at(4)]);
            if (operation === '/') {
              newPixel = new List([]);
              for (var i = 1; i < 5; i++) {
                if (pixel2.at(i) !== 0)
                  newPixel.add(pixel1.at(i) / pixel2.at(i));
                else
                  newPixel.add(0);
              }
            }
            result.push(newPixel);
          }
        }
      for (var i = 0; i < result.length; i++)
        for (var j = 1; j < 5; j++) {
          if (result[i].at(j) > max)
            max = result[i].at(j);
          if (result[i].at(j) < min)
            min = result[i].at(j);
        }
      result = new List(result);
      if(max===min) return result;
      else{
        result2 = new List([]);
        for (var i = 1; i <= result.length(); i++) {
          pixel1 = result.at(i);
          newPixel = new List([]);
          for (var j = 1; j < 5; j++)
            newPixel.add(Math.round(255.0 * (pixel1.at(j) - min) / (max - min)));
          result2.add(newPixel);
          }
        return result2;
        }
      }
  })
//================= options of the GraphPad palette ============================================================
//add vertices to vertexlist ----------------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_addVerticesToGraph(n,amatrix,vlist,properties,point)',
  function (n, amatrix,vlist, properties,point) {
    function property(key) {
      var i = 1;
      while (i <= properties.length()) {
        if (properties.at(i).at(1) == key)
          return properties.at(i).at(2);
        i++;
      }
      return '-';
    }
    function randomValue(a, b) {
      return Math.round((b - a) * Math.random() + a);
    }
    var xLeft = Number(property('xLeft')), xRight = Number(property('xRight')), yUpper = Number(property('yUpper')), yLower = Number(property('yLower')), 
         size = Number(property('verticesMinRadius')), dx = Math.abs(0.1*(xRight-xLeft)), dy = Math.abs(0.1*(yLower-yUpper));
    //first add vertices to vertexlist
    if(point==='null'){ //random positions
      n = Number(n);
      for (var i = 1; i <= n; i++) { //vertex attributes are: x,y,size,content,isMarked,colorNr,numberOfLinks
        vlist.add(new List([randomValue(xLeft+dx, xRight-dx), randomValue(yUpper+dy, yLower-dy), size, "", false, randomValue(1, 10), 0]));}}
      else { n=1; vlist.add(new List([point.at(1),point.at(2), size, "", false, randomValue(1, 10), 0]));} //only one vertex, if coordinates are submitted
    //now add vertices to adjacencymatrix
    var w, row;
    if (amatrix.length() === 0) w = 0; else w = amatrix.at(1).length();
    for (var i = 1; i <= n; i++) { row = new List();
      for (var j = 1; j <= w; j++) row.add("X");
      amatrix.add(row);
      }
    for (var i = 1; i <= amatrix.length(); i++) {
      for (var j = 1; j <= n; j++) {
        amatrix.at(i).add("X");
      }
    }
    return 'ok';
  });
//draw graph on GraphPad -----------------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_drawGraphOnGraphPad(amatrix,vlist,properties)',
  function (amatrix, vlist, properties) {
    function property(key) {
      var i = 1;
      while (i <= properties.length()) {
        if (properties.at(i).at(1) == key)
          return properties.at(i).at(2);
        i++;
      }
      return '-';
    }
    var costume = property('initialCostume'), ctx = costume.contents.getContext('2d'), costumeWidth = Number(property('costumeWidth')), costumeHeight = Number(property('costumeHeight')), 
        graphWidth = Number(property('width')), graphHeight = Number(property('heighth')), bcolor = property('backColor'),
        lineWidth = Number(property('lineWidth')), lcolor = property('lineColor'), minsize = Number(property('verticesMinRadius')), growing = property('verticesGrowing'),
        contentShown = property('verticesContentShown'), withWeights = property('edgesWithWeights'), showWeights = property('edgesShowWeights'),
        directed = property('edgesDirected'), leftOffset = Number(property('offsets').at(1)), upperOffset = Number(property('offsets').at(2)),c, row, anz, v1, v2, x1, y1, x2, y2, n = amatrix.length(), 
        label, textheight, weight, marked, xp, yp, alpha, l, dx, dy, dl, size;
    //count edges per vertex an set size per vertex
    for (var i = 1; i <= amatrix.length(); i++) {
      anz = 0;
      row = amatrix.at(i);
      for (var j = 1; j <= row.length(); j++)
        if (row.at(j) !== "X")
          anz++;
      vlist.at(i).put(anz, 7);
      if (growing)
        vlist.at(i).put(minsize + 2 * vlist.at(i).at(7), 3);
    }
    //draw edges
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = new Color(Number(lcolor.at(1)), Number(lcolor.at(2)), Number(lcolor.at(3))).toString();
    ctx.fillStyle = new Color(Number(lcolor.at(1)), Number(lcolor.at(2)), Number(lcolor.at(3))).toString();
    v1 = 1;
    while (v1 <= n) {
      v2 = 1;
      while (v2 <= n) {
        weight = amatrix.at(v1).at(v2);
        if (weight != "X") {
          weight = Number(weight);
          x1 = Number(vlist.at(v1).at(1));
          y1 = Number(vlist.at(v1).at(2));
          x2 = Number(vlist.at(v2).at(1));
          y2 = Number(vlist.at(v2).at(2));
          ctx.beginPath();
          ctx.moveTo(x1+leftOffset, y1+upperOffset);
          ctx.lineTo(x2+leftOffset, y2+upperOffset);
          ctx.closePath();
          ctx.stroke();
          if (directed) {
            xp = x2 - x1;
            yp = y2 - y1;
            size = vlist.at(v2).at(3);
            l = Math.sqrt(xp * xp + yp * yp);
            if (l > 15) {
              ctx.beginPath();
              alpha = Math.acos(Math.abs(xp) / l);
              if (!contentShown)
                l = l - size;
              else {
                if (vlist.at(v2).at(4).length === 0)
                  label = "VertexNr: " + v2;
                else
                  label = vlist.at(v2).at(4);
                textheight = Number(2 * minsize) + 3 * Number(vlist.at(v2).at(7));
                ctx.font = "" + textheight + "px sans-serif";
                w = ctx.measureText(label).width + 20;
                h = textheight + 10;
                if (x1 === x2)
                  l = l - h / 2;
                else if (y1 === y2)
                  l = l - w / 2;
                else {
                  dx = w / 2;
                  dl = Math.abs(l * dx / xp);
                  dy = Math.abs(dl * Math.sin(alpha));
                  if (dy > h / 2)
                    dl = h / 2 / Math.sin(alpha);
                  l = l - dl;
                }
              }
              dx = 5 * Math.sin(alpha);
              dy = 5 * Math.cos(alpha);
              if (xp >= 0)
                if (yp >= 0) {//right-down
                  x2 = x1 + l * Math.cos(alpha);
                  y2 = y1 + l * Math.sin(alpha);
                  ctx.moveTo(x2+leftOffset, y2+upperOffset);
                  ctx.lineTo(x1 + (l - 10) * Math.cos(alpha) + dx+leftOffset, y1 + (l - 10) * Math.sin(alpha) - dy+upperOffset);
                  ctx.lineTo(x1 + (l - 10) * Math.cos(alpha) - dx+leftOffset, y1 + (l - 10) * Math.sin(alpha) + dy+upperOffset);
                } else {//right-up
                  x2 = x1 + l * Math.cos(alpha);
                  y2 = y1 - l * Math.sin(alpha);
                  ctx.moveTo(x2+leftOffset, y2+upperOffset);
                  ctx.lineTo(x1 + (l - 10) * Math.cos(alpha) - dx+leftOffset, y1 - (l - 10) * Math.sin(alpha) - dy+upperOffset);
                  ctx.lineTo(x1 + (l - 10) * Math.cos(alpha) + dx+leftOffset, y1 - (l - 10) * Math.sin(alpha) + dy+upperOffset);
                }
              else if (yp >= 0) {//left-down
                x2 = x1 - l * Math.cos(alpha);
                y2 = y1 + l * Math.sin(alpha);
                ctx.moveTo(x2+leftOffset, y2+upperOffset);
                ctx.lineTo(x1 - (l - 10) * Math.cos(alpha) + dx+leftOffset, y1 + (l - 10) * Math.sin(alpha) + dy+upperOffset);
                ctx.lineTo(x1 - (l - 10) * Math.cos(alpha) - dx+leftOffset, y1 + (l - 10) * Math.sin(alpha) - dy+upperOffset);
              } else {//left-up
                x2 = x1 - l * Math.cos(alpha);
                y2 = y1 - l * Math.sin(alpha);
                ctx.moveTo(x2+leftOffset, y2+upperOffset);
                ctx.lineTo(x1 - (l - 10) * Math.cos(alpha) + dx+leftOffset, y1 - (l - 10) * Math.sin(alpha) - dy+upperOffset);
                ctx.lineTo(x1 - (l - 10) * Math.cos(alpha) - dx+leftOffset, y1 - (l - 10) * Math.sin(alpha) + dy+upperOffset);
              }
              ctx.lineTo(x2+leftOffset, y2+upperOffset);
              ctx.closePath();
              ctx.stroke();
              ctx.fill();
            }
          }
        }
        if (showWeights) {
          ctx.font = "" + 12 + "px sans-serif";
          ctx.beginPath();
          if (weight != "X")
            ctx.fillText("" + weight, (x1 + x2) / 2+leftOffset, (y1 + y2) / 2 - 2+upperOffset);
          ctx.closePath();
          ctx.fill();
        }
        v2++;
      }
      v1++;
    }
    //color connected vertices in same color
    var connectedVertices, row, color, processedVertices = new List();
    for (var vNr = 1; vNr <= vlist.length(); vNr++) {
      if (!(processedVertices.contains(vNr))) {
        color = Math.round(9 * Math.random() + 1);
        connectedVertices = new List();
        connectedVertices.add(vNr);
        while (connectedVertices.length() > 0) {
          v1 = connectedVertices.at(1);
          processedVertices.add(v1);
          connectedVertices.remove(1);
          vlist.at(v1).put(color, 6);
          row = amatrix.at(v1);
          for (var i = 1; i <= row.length(); i++)
            if ((row.at(i) != "X") && (connectedVertices.indexOf(i) < 1) && (processedVertices.indexOf(i) < 1))
              connectedVertices.add(i);
        }
      }
    }
    //draw vertices
    ctx.lineWidth = 1;
    ctx.strokeStyle = new Color(0, 0, 0).toString();
    for (var i = 1; i <= vlist.length(); i++) {
      marked = vlist.at(i).at(5);
      if (!contentShown) {
        if (marked) {
          ctx.beginPath();
          ctx.fillStyle = new Color(255, 0, 0).toString();
          ctx.strokeStyle = new Color(255, 0, 0).toString();
          ctx.arc(Number(vlist.at(i).at(1))+Number(leftOffset), Number(vlist.at(i).at(2))+Number(upperOffset), Number(vlist.at(i).at(3)) + 3, 0, 6.283185307179586476925286766559);
          ctx.strokeStyle = new Color(0, 0, 0).toString();
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }
        ctx.beginPath();
        c = vlist.at(i).at(6);
        if (c === 1)
          ctx.fillStyle = new Color(0, 0, 255).toString();
        else if (c === 2)
          ctx.fillStyle = new Color(0, 155, 255).toString();
        else if (c === 3)
          ctx.fillStyle = new Color(255, 0, 255).toString();
        else if (c === 4)
          ctx.fillStyle = new Color(255, 0, 0).toString();
        else if (c === 5)
          ctx.fillStyle = new Color(0, 255, 0).toString();
        else if (c === 6)
          ctx.fillStyle = new Color(0, 255, 155).toString();
        else if (c === 7)
          ctx.fillStyle = new Color(255, 255, 0).toString();
        else if (c === 8)
          ctx.fillStyle = new Color(0, 0, 0).toString();
        else if (c === 9)
          ctx.fillStyle = new Color(255, 255, 255).toString();
        else
          ctx.fillStyle = new Color(155, 155, 155).toString();
        ctx.arc(Number(vlist.at(i).at(1))+Number(leftOffset), Number(vlist.at(i).at(2))+Number(upperOffset), Number(vlist.at(i).at(3)), 0, 6.283185307179586476925286766559);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else {
        if (vlist.at(i).at(4).length === 0)
          label = "#" + i;
        else
          label = vlist.at(i).at(4);
        ctx.beginPath();
        if (growing)
          textheight = Number(2 * minsize) + 3 * Number(vlist.at(i).at(7));
        else
          textheight = Number(2 * minsize);
        ctx.font = "" + textheight + "px sans-serif";
        w = ctx.measureText(label).width + 20;
        h = textheight + 10;
        ctx.fillStyle = new Color(255, 255, 255).toString();
        if (marked)
          ctx.strokeStyle = new Color(255, 0, 0).toString();
        else
          ctx.strokeStyle = new Color(0, 0, 0).toString();
        x1 = vlist.at(i).at(1) - w / 2;
        y1 = vlist.at(i).at(2) - h / 2;
        ctx.fillRect(x1+leftOffset, y1+upperOffset, w, h);
        ctx.strokeRect(x1 + 1+leftOffset, y1 + 1+upperOffset, w - 3, h - 2);
        if (marked)
          ctx.fillStyle = new Color(255, 0, 0).toString();
        else
          ctx.fillStyle = new Color(0, 0, 0).toString();
        ctx.textAlign = "center";
        ctx.textBaseline = "center";
        ctx.fillText(label, x1 + w / 2+leftOffset, y1 + h - 7+upperOffset);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
    }
    return costume;
  });
//add n random edges to graph -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_addRandomEdgesToGraph(amatrix,n,properties,vlist)',
  function (amatrix, n, properties, vlist) {
    function property(key) {
      var i = 1;
      while (i <= properties.length()) {
        if (properties.at(i).at(1) == key)
          return properties.at(i).at(2);
        i++;
      }
      return '-';
    }
    var v1 = 0, v2 = 0, i, length = vlist.length(), found, w, k, x1, y1, x2, y2, result, withWeights = property('edgesWithWeights'), directedEdges = property('edgesDirected');
    if (length > 1) {
      n = Number(n);
      k = 1;
      while (k <= n) {
        do {
          v1 = Math.floor(Math.random() * length) + 1;
        } while (v1 > length);
        i = 1;
        found = false;
        while (!found && (i < 100)) {
          do {
            v2 = Math.floor(Math.random() * length) + 1;
          } while (v2 > length);
          found = (v1 !== v2) && (amatrix.at(v1).at(v2) === "X");
          i++;
        }
        if (found) {
          if (withWeights) { //takes the distance/10 as weight in the beginning
            x1 = Number(vlist.at(v1).at(1));
            y1 = Number(vlist.at(v1).at(2));
            x2 = Number(vlist.at(v2).at(1));
            y2 = Number(vlist.at(v2).at(2));
            w = Math.round(Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)) / 10);
          } else
            w = 1;
          amatrix.at(v1).put(w, v2);
          vlist.at(v1).put(vlist.at(v1).at(7) + 1, 7);
          if (!directedEdges) {
            amatrix.at(v2).put(w, v1);
            vlist.at(v2).put(vlist.at(v2).at(7) + 1, 7);
          }
          vlist.at(v2).put(vlist.at(v1).at(6), 6);
        }
        k++;
      }
    }
    result = new List();
    result.add(amatrix);
    result.add(vlist);
    return result;
  });
//depth first search on graph -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set(
  'SciS_depthFirstSearch(amatrix,vlist,cont,n)',
  function (amatrix, vlist, cont, n) {
    function depthFirstSearch(content, nr) {
      var nextVertices = new List(), found, vertexNr, result;
      vlist.at(nr).put(true, 5); //mark vertex
      if (vlist.at(nr).at(4) === content)
        return new List([true, "" + content + " found in vertex " + nr]); //content is found!
      else {
        for (var i = 1; i <= vlist.length(); i++) {
          if ((amatrix.at(nr).at(i) != "X") && (!vlist.at(i).at(5)))
            nextVertices.add(i);
          for (var j = 1; j <= nextVertices.length(); j++)
            vlist.at(j).put(false, 5);
          found = false;
          while ((nextVertices.length() > 0) && !found) {
            vertexNr = nextVertices.at(1);
            nextVertices.remove(1);
            result = depthFirstSearch(content, vertexNr);
            found = result.at(1);
            if (found)
              return result;
          }
        }
        return new List([false, "" + content + " not found!"]);
      }
    }
    //delete all markers
    //for(var i=1;i<=vlist.length();i++) vlist.at(i).put(false,5);
    return depthFirstSearch(cont, n);
  }
);
//breath first search on graph ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set(
  'SciS_breadthFirstSearch(amatrix,vlist,cont,n)',
  function (amatrix, vlist, cont, n) {
    function breadthFirstSearch(content, nr) {
      var nextVertices = new List([n]), vertexNr;
      while (nextVertices.length() > 0) {
        vertexNr = nextVertices.at(1);
        nextVertices.remove(1);
        vlist.at(vertexNr).put(true, 5); //mark vertex
        if (vlist.at(vertexNr).at(4) === content)
          return new List([true, "" + content + " found in vertex " + vertexNr]); //content is found!
        else {
          for (var i = 1; i <= amatrix.length(); i++) {
            if ((amatrix.at(vertexNr).at(i) != "X") && (!vlist.at(i).at(5)))
              nextVertices.add(i);
          }
        }
      }
      return new List([false, "" + content + " not found!"]);
    }
    //for(var i=1;i<=vlist.length();i++) vlist.at(i).put(false,5); //delete all markers
    return breadthFirstSearch(cont, n);
  }
);
//shortest path on graph -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set(
  'SciS_shortestPath(amatrix,start,end)',
  function (amatrix, start, end) {
    var completedVertices = new List(), distances = new List(), openTuples = new List(), result, actualTuple, actualDistance, i, j, k;
    openTuples.add(new List([start, 0, ""])); //initialization
    while (openTuples.length() > 0) { //use all connected vertices
      actualTuple = openTuples.at(1); //take the first tuple in openTuples and delete it from list, add it to completedVertices and the new distance to distances
      openTuples.remove(1);
      completedVertices.add(actualTuple.at(1));
      distances.add(new List([actualTuple.at(1), actualTuple.at(2)]));
      for (var i = 1; i <= amatrix.length(); i++) { //add a new "message" for every connected vertex to openTuples
        if (!completedVertices.contains(i) && (amatrix.at(actualTuple.at(1)).at(i) != "X")) {
          actualDistance = amatrix.at(actualTuple.at(1)).at(i) + actualTuple.at(2);
          openTuples.add(new List([i, actualDistance, actualTuple.at(1)]));
          for (var j = 1; j <= distances.length(); j++) { //relaxation
            if (distances.at(j).at(1) === i)
              if (actualDistance < distances.at(j).at(2))
                distances.put(new List([i, actualDistance]), j);
          }
        }
      }
      openTuples = new List(openTuples.asArray().sort(function (a, b) {
        return a.at(2) - b.at(2);
      })); //sort openTuples by distances
      i = 1;
      while (i < openTuples.length()) { //delete doubles
        k = openTuples.at(i).at(1);
        j = i + 1;
        while (j <= openTuples.length())
          if (openTuples.at(j).at(1) === k)
            openTuples.remove(j);
          else
            j++;
        i++;
      }
    }
    result = -1;
    for (var i = 1; i <= distances.length(); i++) //look for the distance to endvertex
      if (distances.at(i).at(1) === end)
        result = distances.at(i).at(2);
    return result;
  }
);
//all shortest paths on graph ---------------------------------------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set(
  'SciS_allShortestPaths(amatrix,start)',
  function (amatrix, start) {
    var completedVertices = new List(), distances = new List(), openTuples = new List(), result, actualTuple, actualDistance, i, j, k;
    openTuples.add(new List([start, 0, ""])); //initialization
    while (openTuples.length() > 0) { //use all connected vertices
      actualTuple = openTuples.at(1); //take the first tuple in openTuples and delete it from list, add it to completedVertices and the new distance to distances
      openTuples.remove(1);
      completedVertices.add(actualTuple.at(1));
      distances.add(new List([actualTuple.at(1), actualTuple.at(2)]));
      for (var i = 1; i <= amatrix.length(); i++) { //add a new "message" for every connected vertex to openTuples
        if (!completedVertices.contains(i) && (amatrix.at(actualTuple.at(1)).at(i) != "X")) {
          actualDistance = amatrix.at(actualTuple.at(1)).at(i) + actualTuple.at(2);
          openTuples.add(new List([i, actualDistance, actualTuple.at(1)]));
          for (var j = 1; j <= distances.length(); j++) { //relaxation
            if (distances.at(j).at(1) === i)
              if (actualDistance < distances.at(j).at(2))
                distances.put(new List([i, actualDistance]), j);
          }
        }
      }
      openTuples = new List(openTuples.asArray().sort(function (a, b) {
        return a.at(2) - b.at(2);
      })); //sort openTuples by distances
      i = 1;
      while (i < openTuples.length()) { //delete doubles
        k = openTuples.at(i).at(1);
        j = i + 1;
        while (j <= openTuples.length())
          if (openTuples.at(j).at(1) === k)
            openTuples.remove(j);
          else
            j++;
        i++;
      }
    }
    return new List(distances.asArray().sort(function (a, b) {
      return a.at(1) - b.at(1);
    })); //sort distances by vertexnumber
  }
);
//vertex number on graph ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set(
  'SciS_vertexnumberAtGraph(vlist,properties,position)',
  function (vlist, properties,position) {
    function property(key) {
      var i = 1;
      while (i <= properties.length()) {
        if (properties.at(i).at(1) == key)
          return properties.at(i).at(2);
        i++;
      }
      return '-';
    }
    var vertexWidth, vertexHeight, showContent, offsets,
         xpos, ypos, size, xVertex, yVertex, i, label, textheight, w, h, ctx, help;
    help = new Costume();
    help.contents.width = 10;
    help.contents.height = 10;//only for text-measurement
    ctx = help.contents.getContext('2d');
    offsets = property('offsets');
    xPos = Math.round(Number(offsets.at(1)) + Number(position.at(1)));
    yPos = Math.round(Number(offsets.at(2)) + Number(position.at(2)));
    showContent = property('verticesContentShown');
    i = 1;
    while (i <= vlist.length()) {
      xVertex = Number(vlist.at(i).at(1));
      yVertex = Number(vlist.at(i).at(2));
      size = Number(vlist.at(i).at(3));
      if (showContent) {
        if (vlist.at(i).at(4).length === 0)
          label = "VertexNr: " + i;
        else
          label = vlist.at(i).at(4);
        textheight = Number(2 * property('verticesMinRadius')) + 3 * Number(vlist.at(i).at(7));
        ctx.font = "" + textheight + "px sans-serif";
        w = ctx.measureText(label).width + 20;
        h = textheight + 10;
        if ((xPos >= xVertex - w / 2) && (xPos <= xVertex + w / 2) && (yPos >= yVertex - h / 2) && (yPos <= yVertex + h / 2))
          return i;
      } else {
        if (Math.sqrt((xPos - xVertex) * (xPos - xVertex) + (yPos - yVertex) * (yPos - yVertex)) <= size)
          return i;
      }
      i++;
    }
    return("no vertex at this position!");  
  });

//================= options of the NNPad palette ============================================================
//NN output ----------------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set(
  'SciS_NNoutput(weights,width,depth,n,input)',
  function (weights, width, depth, n, input) {
    var inp = new List(), layerNr = 1, layer, output, sum;
    for (var i = 1; i <= input.length(); i++)
      inp.add(input.at(i));
    if ((n === "last") || (n > depth))
      n = Number(depth);
    else
      n = Number(n);
    while (layerNr <= n) {
      inp.add(0.1);
      layer = weights.at(layerNr);
      output = new List();
      for (var i = 1; i <= layer.length(); i++) {
        sum = 0;
        for (var j = 1; j <= inp.length(); j++)
          sum = sum + layer.at(i).at(j) * inp.at(j);
        output.add(sum);
      }
      inp = new List();
      for (var i = 1; i <= output.length(); i++)
        inp.add(1.0 / (1 + Math.exp(-output.at(i))));
      layerNr++;
    }
    return inp;
  }
);

SnapExtensions.primitives.set(
  'SciS_NNshowStatus(properties,weights,outputs,costume,isStage)',
  function (properties,weights,outputs,costume,isStage) {
    function property(key) {
      var i = 1;
      while (i <= properties.length()) {
        if (properties.at(i).at(1) === key)
          return properties.at(i).at(2);
        i++;
      }
     return '-';
    }

    var newCostume, ctx, costumeWidth, costumeHeight, netWidth, netHeight, layerWidth, depth, r, g, b, dx, dy, x, y, x1, y1, colorcode, offsets;

    costumeWidth = Number(property('costumeWidth'));
    costumeHeight = Number(property('costumeHeight'));
    netWidth = Number(property('netWidth'));
    netHeight = Number(property('netHeight'));
    layerWidth = Number(property('layerWidth'));
    depth = Number(property('numberOfLayers'));
    r = Number(property('backColor').at(1));
    g = Number(property('backColor').at(2));
    b = Number(property('backColor').at(3));
    leftOffset = Number(property('offsets').at(1));
    upperOffset = Number(property('offsets').at(2));
    if (isStage) {
      ctx = costume.contents.getContext('2d');
      ctx.beginPath();
      ctx.fillStyle = new Color(r, g, b).toString();
      ctx.strokeStyle = new Color(0, 0, 0).toString();
      ctx.fillRect(leftOffset, upperOffset, netWidth, netHeight);
      ctx.strokeRect(leftOffset, upperOffset, netWidth, netHeight);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

    } else {
      //new costume
      newCostume = new Costume();
      newCostume.contents.width = costumeWidth;
      newCostume.contents.height = costumeHeight;
      ctx = newCostume.contents.getContext('2d');
      ctx.beginPath();
      ctx.fillStyle = new Color(r, g, b).toString();
      ctx.strokeStyle = new Color(0, 0, 0).toString();
      ctx.fillRect(0, 0, costumeWidth, costumeHeight);
      ctx.strokeRect(0, 0, netWidth, netHeight);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      newCostume.rotationCenter = new Point(costumeWidth / 2, costumeHeight / 2);
    }

//draw frame
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(leftOffset + netWidth - 15, upperOffset + netHeight - 20);
    ctx.lineTo(leftOffset + netWidth - 15, upperOffset + 40);
    ctx.lineTo(leftOffset + netWidth - 20, upperOffset + 40);
    ctx.lineTo(leftOffset + netWidth - 15, upperOffset + 20);
    ctx.lineTo(leftOffset + netWidth - 10, upperOffset + 40);
    ctx.lineTo(leftOffset + netWidth - 15, upperOffset + 40);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(leftOffset + netWidth - 30, upperOffset + 1);
    ctx.lineTo(leftOffset + netWidth - 30, upperOffset + netHeight - 1);
    ctx.closePath();
    ctx.stroke();

//draw connections
    if (layerWidth > 1)
      dx = 1.0 * (netWidth - 50) / (layerWidth - 1);
    else
      dx = 1.0 * (netWidth - 15) / 2;
    if (depth > 1)
      dy = 1.0 * netHeight / depth;
    else
      dy = 1.0 * netHeight / 2;
    ctx.lineWidth = 1;
    for (var layer = 1; layer <= depth; layer++) {
      for (var i = 1; i <= layerWidth; i++) {
        x = 10 + (i - 1) * dx;
        if (layer === depth)
          y = 3;
        else
          y = netHeight - layer * dy;
        for (var n = 1; n <= layerWidth; n++) {
          ctx.beginPath();
          x1 = 10 + (n - 1) * dx;
          if (layer === 1)
            y1 = netHeight - 3;
          else
            y1 = netHeight - (layer - 1) * dy;
          colorcode = Math.round(255 * weights.at(layer).at(i).at(n));
          if (colorcode < 0)
            ctx.strokeStyle = new Color(-colorcode, 0, 0).toString();
          else
            ctx.strokeStyle = new Color(0, colorcode, 0).toString();
          ctx.moveTo(leftOffset + x, upperOffset + y);
          ctx.lineTo(leftOffset + x1, upperOffset + y1);
          ctx.closePath();
          ctx.stroke();
        }
      }
    }

//draw connectors
    if (layerWidth > 1)
      dx = 1.0 * (netWidth - 50) / (layerWidth - 1);
    else
      dx = 1.0 * (netWidth - 15) / 2;
    if (depth > 1)
      dy = 1.0 * (netHeight - 30) / (depth - 1);
    else
      dy = 1.0 * (netHeight - 15) / 2;
    ctx.lineWidth = 1;
    for (var i = 0; i < layerWidth; i++) {
      ctx.beginPath();
      x = 5 + i * dx;
      y = 1;
      colorcode = Math.round(255 * outputs.at(depth + 1).at(i + 1));
      if (colorcode < 0)
        ctx.fillStyle = new Color(-colorcode, 0, 0).toString();
      else
        ctx.fillStyle = new Color(0, colorcode, 0).toString();
      ctx.strokeRect(leftOffset + x, upperOffset + y, 10, 5);
      ctx.fillRect(leftOffset + x, upperOffset + y, 10, 5);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
      y = netHeight - 6;
      colorcode = Math.round(255 * outputs.at(1).at(i + 1));
      if (colorcode < 0)
        ctx.fillStyle = new Color(-colorcode, 0, 0).toString();
      else
        ctx.fillStyle = new Color(0, colorcode, 0).toString();
      ctx.strokeRect(leftOffset + x, upperOffset + y, 10, 5);
      ctx.fillRect(leftOffset + x, upperOffset + y, 10, 5);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
    }

//draw inner layers
    if (layerWidth > 1)
      dx = 1.0 * (netWidth - 50) / (layerWidth - 1);
    else
      dx = 1.0 * (netWidth - 15) / 2;
    if (depth > 1)
      dy = 1.0 * netHeight / depth;
    else
      dy = 1.0 * netHeight / 2;
    for (var layer = 2; layer <= depth; layer++) {
      for (var i = 0; i < layerWidth; i++) {
        ctx.beginPath();
        x = 10 + i * dx;
        y = netHeight - (layer - 1) * dy;
        colorcode = Math.round(255 * outputs.at(layer).at(i + 1));
        if (colorcode < 0)
          ctx.fillStyle = new Color(-colorcode, 0, 0).toString();
        else
          ctx.fillStyle = new Color(0, colorcode, 0).toString();
        ctx.arc(leftOffset + x, upperOffset + y, 5, 0, 6.283185307179586476925286766559);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
      }
    }
   if (isStage)
      return costume;
    else
      return newCostume;
  }
);

SnapExtensions.primitives.set(
  'SciS_NNteach(weights,width,depth,input,output,eta)',
  function (weights, width, depth, input, output, eta) {
    function NNoutput(n, input) {
      var inp = new List(), layerNr = 1, layer, out, sum;
      for (var i = 1; i <= input.length(); i++)
        inp.add(input.at(i));
      n = Number(n);
      while (layerNr <= n) {
        inp.add(0.1);
        layer = weights.at(layerNr);
        out = new List();
        for (var i = 1; i <= layer.length(); i++) {
          sum = 0;
          for (var j = 1; j <= inp.length(); j++)
            sum = sum + layer.at(i).at(j) * inp.at(j);
          out.add(sum);
        }
        inp = new List();
        for (var i = 1; i <= output.length(); i++)
          inp.add(1.0 / (1 + Math.exp(-output.at(i))));
        layerNr++;
      }
      return inp;
    }

    var lNr = depth, currentLayer, currentOutput, delta, h, previousDelta;
    while (lNr >= 1) {
      currentLayer = weights.at(lNr);
      currentOutput = NNoutput(lNr, input);
      if (lNr === 1)
        nextOutput = input;
      else
        nextOutput = NNoutput(lNr - 1, input);
      if (lNr === depth) {
        delta = new List();
        for (var i = 1; i <= width; i++) {
          h = currentOutput.at(i) * (1 - currentOutput.at(i)) * (currentOutput.at(i) - output.at(i));
          delta.add(h);
          for (var n = 1; n <= width; n++)
            currentLayer.at(i).put(currentLayer.at(i).at(n) - eta * h * nextOutput.at(n), n);
        }
        previousDelta = delta;
      } else {
        delta = new List();
        for (var i = 1; i <= width; i++) {
          h = 0;
          for (var k = 1; k <= width; k++)
            h = h + previousDelta.at(k) * weights.at(lNr + 1).at(i).at(k);
          h = h * currentOutput.at(i) * (1 - currentOutput.at(i));
          delta.add(h);
          for (var n = 1; n <= width; n++)
            currentLayer.at(i).put(currentLayer.at(i).at(n) - eta * h * nextOutput.at(n), n);
        }
        previousDelta = delta;
      }
      lNr--;
    }
    return weights;
  }
);

//================= options of the GridPad palette ============================================================
//add grid to GridPad ----------------------------------------------------------------------------------------------------------------------------------------------
SnapExtensions.primitives.set('SciS_addGridToGridPad(costume,properties,withLines,data)',
 function (costume,properties,withLines,data) {
    function property(key) {
      var i = 1;
      while (i <= properties.length()) {
        if (properties.at(i).at(1) === key)
          return properties.at(i).at(2);
        i++;
      }
     return '-';
    }

  var ctx = costume.contents.getContext('2d'),
      xMax = Number(property('numberOfGridColumns')),
      yMax = Number(property('numberOfGridRows')),
      cellWidth = Number(property('cellWidth')),
      cellHeight = Number(property('cellHeight')),
      colors = property('cellColors'),
      maxColors = colors.length(),
      cellcolor, d;
    ctx.lineWidth = Number(property('lineWidth'));
    ctx.strokeStyle = new Color(0, 0, 0).toString();
    for (var x = 1; x <= xMax; x++) {
      for (var y = 1; y <= yMax; y++) {
        ctx.beginPath();
        d = data.at(y).at(x); 
        if (d > maxColors)
          d = maxColors;
        if (d < 1)
          d = 1;
        cellcolor = colors.at(d).at(1); 
        ctx.fillStyle = new Color(cellcolor.at(1), cellcolor.at(2), cellcolor.at(3)).toString();
        ctx.fillRect((x - 1) * cellWidth, (y - 1) * cellHeight, cellWidth, cellHeight);
        ctx.closePath();
        ctx.fill();
      }
    }
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(xMax * cellWidth, 0);
    ctx.lineTo(xMax * cellWidth, yMax * cellHeight);
    ctx.lineTo(0, yMax * cellHeight);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.stroke();
    if (!withLines)
      return costume;
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = new Color(0, 0, 0).toString();
    for (var y = 0; y <= yMax; y++) {
      ctx.moveTo(0, cellHeight * y);
      ctx.lineTo(cellWidth * xMax, cellHeight * y);
    }
    for (var x = 0; x <= xMax; x++) {
      ctx.moveTo(cellWidth * x, 0);
      ctx.lineTo(cellWidth * x, cellHeight * yMax);
    }
    ctx.closePath();
    ctx.stroke();
    return costume;

    }
);

SnapExtensions.primitives.set(
  'SciS_fillOnGridPadGridRandomlyOnImagePad(xMin,xMax,yMin,yMax,numbers,data)',
   function (xMin, xMax, yMin, yMax, numbers, data) {
    var result, maxNumber = numbers.length(), h;

    function listCopy(item) {
      var theCopy;
      if (item instanceof List) {
        theCopy = new List();
        for (var i = 1; i <= item.length(); i++)
          theCopy.add(listCopy(item.at(i)));
      } else
        theCopy = item;
      return theCopy;
    }

    function myRandom(min, max) {
      if (max < min) {
        var h = max;
        max = min;
        min = h;
      }
      return Math.floor(Math.random() * (Number(max) - Number(min)) + Number(min) + 0.5);
    }

    result = listCopy(data);
    xMin = Math.abs(xMin);
    xMax = Math.abs(xMax);
    yMin = Math.abs(yMin);
    yMax = Math.abs(yMax);
    if (xMin > xMax) {
      h = xMin;
      xMin = xMax;
      xMax = h;
    }
    if (yMin > yMax) {
      h = yMin;
      yMin = yMax;
      yMax = h;
    }
    for (var y = yMin; y <= yMax; y++)
      for (var x = xMin; x <= xMax; x++)
        result.at(y).put(numbers.at(myRandom(1, maxNumber)), x);
    return result;
  }
);

SnapExtensions.primitives.set(
  'SciS_neighborhoodInGridOnImagePad(data,properties,x,y,isTorus,typeOfNeighborhood)',
  function (data, properties, x, y, isTorus, typeOfNeighborhood) {
    function property(key) {
      var i = 1;
      while (i <= properties.length()) {
        if (properties.at(i).at(1) === key)
          return properties.at(i).at(2);
        i++;
      }
     return '-';
    }

    var xMax = Number(property('numberOfGridColumns')),
      yMax = Number(property('numberOfGridrows')),
      result = [], xg, yg;
    if ((x < 1) || (x > xMax) || (y < 1) || (y > yMax))
      return "ERROR: index out of bounds!";
    for (var xp = x - 1; xp <= x + 1; xp++) {
      for (var yp = y - 1; yp <= y + 1; yp++) {
        xg = xp;
        yg = yp;
        if (xp < 1) {
          if (isTorus) {
            xg = xMax;
          } else {
            xg = 0;
          }
        }
        if (xp > xMax) {
          if (isTorus) {
            xg = 1;
          } else {
            xg = 0;
          }
        }
        if (yp < 1) {
          if (isTorus) {
            yg = yMax;
          } else {
            yg = 0;
          }
        }
        if (yp > yMax) {
          if (isTorus) {
            yg = 1;
          } else {
            yg = 0;
          }
        }
        if ((xg > 0) && (yg > 0)) {
          result.push(data.at(yg).at(xg));
        } else {
          result.push("");
        }
      }
    }
    if (typeOfNeighborhood === "Moore")
      return new List([result[3], result[6], result[7], result[8], result[5], result[2], result[1], result[0]]);
    else
      return new List([result[3], result[7], result[5], result[1], ]);
  }
);

SnapExtensions.primitives.set(
  'SciS_swapCellsOfGridOnGridPad(data,n,isTorus,range,xMin,xMax,yMin,yMax)',
  function (data, n, isTorus, range, xMin, xMax, yMin, yMax) {

    function listCopy(item) {
      var theCopy;
      if (item instanceof List) {
        theCopy = new List();
        for (var i = 1; i <= item.length(); i++)
          theCopy.add(listCopy(item.at(i)));
      } else
        theCopy = item;
      return theCopy;
    }

    function myRandom(min, max) {
      if (max < min) {
        var h = max;
        max = min;
        min = h;
      }
      return Math.floor(Math.random() * (Number(max) - Number(min)) + Number(min) + 0.5);
    }

    function swap(x, y) {
      var xNew, yNew;
      if (isTorus) {
        xNew = x + myRandom(-range, range);
        yNew = y + myRandom(-range, range);
        if (xNew < 1)
          xNew = xMax;
        if (xNew > xMax)
          xNew = 1;
        if (yNew < 1)
          yNew = yMax;
        if (yNew > yMax)
          yNew = 1;
      } else {
        do {
          xNew = x + myRandom(-range, range);
        } while ((xNew < 1) || (xNew > xMax));
        do {
          yNew = y + myRandom(-range, range);
        } while ((yNew < 1) || (yNew > yMax));
      }
      result.at(y).put(data.at(yNew).at(xNew), x);
      result.at(yNew).put(data.at(y).at(x), xNew);
    }

    data = listCopy(data);
    result = listCopy(data);
    xMin = Math.abs(xMin);
    xMax = Math.abs(xMax);
    yMin = Math.abs(yMin);
    yMax = Math.abs(yMax);
    if (xMin > xMax) {
      h = xMin;
      xMin = xMax;
      xMax = h;
    }
    if (yMin > yMax) {
      h = yMin;
      yMin = yMax;
      yMax = h;
    }

    for (i = 1; i <= n; i++) {
      rnd = myRandom(1, 8);
      if (rnd === 1) {
        for (var x = xMin; x <= xMax; x++)
          for (var y = yMin; y <= yMax; y++)
            swap(x, y);
      }
      if (rnd === 2) {
        for (var x = xMin; x <= xMax; x++)
          for (var y = yMax; y >= yMin; y--)
            swap(x, y);
      }
      if (rnd === 3) {
        for (var x = xMax; x >= xMin; x--)
          for (var y = yMin; y <= yMax; y++)
            swap(x, y);
      }
      if (rnd === 4) {
        for (var x = xMax; x >= xMin; x--)
          for (var y = yMax; y >= yMin; y--)
            swap(x, y);
      }
      if (rnd === 5) {
        for (var y = yMin; y <= yMax; y++)
          for (var x = xMin; x <= xMax; x++)
            swap(x, y);
      }
      if (rnd === 6) {
        for (var y = yMax; y >= yMin; y--)
          for (var x = xMin; x <= xMax; x++)
            swap(x, y);
      }
      if (rnd === 7) {
        for (var y = yMin; y <= yMax; y++)
          for (var x = xMax; x >= xMin; x--)
            swap(x, y);
      }
      if (rnd === 8) {
        for (var y = yMax; y >= yMin; y--)
          for (var x = xMax; x >= xMin; x--)
            swap(x, y);
      }
      data = result;
      result = listCopy(data);
    }
    return result;
  }
);

SnapExtensions.primitives.set(
  'SciS_changeSurroundingValuesOfGridOnGridPad(data,ifValue,elseValue,surrValue,op,n,isTorus,withNoise,noise,xMin,xMax,yMin,yMax,oldValue)',
  function (data, ifValue, elseValue, surrValue, op, n, isTorus, withNoise, noise, xMin, xMax, yMin, yMax, oldValue) {
    var result;

    function listCopy(item) {
      var theCopy;
      if (item instanceof List) {
        theCopy = new List();
        for (var i = 1; i <= item.length(); i++)
          theCopy.add(listCopy(item.at(i)));
      } else
        theCopy = item;
      return theCopy;
    }

    function myRandom(min, max) {
      if (max < min) {
        var h = max;
        max = min;
        min = h;
      }
      return Math.floor(Math.random() * (Number(max) - Number(min)) + Number(min) + 0.5);
    }

    function actWith(x, y) {
      var xg, yg, res = 0, ok, val;
      if ((oldValue === 0) || (data.at(y).at(x) === oldValue)) {
        for (var xp = x - 1; xp <= x + 1; xp++) {
          for (var yp = y - 1; yp <= y + 1; yp++) {
            xg = xp;
            yg = yp;
            if (xp < 1) {
              if (isTorus) {
                xg = xMax;
              } else {
                xg = 0;
              }
            }
            if (xp > xMax) {
              if (isTorus) {
                xg = 1;
              } else {
                xg = 0;
              }
            }
            if (yp < 1) {
              if (isTorus) {
                yg = yMax;
              } else {
                yg = 0;
              }
            }
            if (yp > yMax) {
              if (isTorus) {
                yg = 1;
              } else {
                yg = 0;
              }
            }
            if ((xg > 0) && (yg > 0) && (data.at(yg).at(xg) === surrValue))
              res++;
          }
        }
        if((oldValue!==0)&&(data.at(y).at(x)===surrValue)) res--;
        ok = false;
        if ((op === "greater-than") && (res > n))
          ok = true;
        if ((op === "equal-to") && (res == n))
          ok = true;
        if ((op === "smaller-than") && (res < n))
          ok = true;
        if ((op === "different-from") && (res !== n))
          ok = true;
        if (ok)
          result.at(y).put(ifValue, x);
        else
          result.at(y).put(elseValue, x);
        if (withNoise) {
          if (Math.random() * 100 <= noise)
            if (Math.random() <= 0.5)
              result.at(y).put(ifValue, x);
            else
              result.at(y).put(elseValue, x);
        }
      }
    }

    result = listCopy(data);
    xMin = Math.abs(xMin);
    xMax = Math.abs(xMax);
    yMin = Math.abs(yMin);
    yMax = Math.abs(yMax);
    if (xMin > xMax) {
      h = xMin;
      xMin = xMax;
      xMax = h;
    }
    if (yMin > yMax) {
      h = yMin;
      yMin = yMax;
      yMax = h;
    }
    if (oldValue === "any")
      oldValue = 0;
    oldValue = Number(oldValue);
    for (var x = xMin; x <= xMax; x++)
      for (var y = yMin; y <= yMax; y++)
        actWith(x, y);
    return result;
  }
);

SnapExtensions.primitives.set(
  'SciS_replaceValuesOfGridOnImagePad(data,operation,isTorus,xMin,xMax,yMin,yMax,range)',
  function (data, operation, isTorus, xMin, xMax, yMin, yMax,range) {
    var result;

    function listCopy(item) {
      var theCopy;
      if (item instanceof List) {
        theCopy = new List();
        for (var i = 1; i <= item.length(); i++)
          theCopy.add(listCopy(item.at(i)));
      } else
        theCopy = item;
      return theCopy;
    }

    function actWith(x, y) {
     var xg, yg,sum=0, max=-100000, min=100000, n=0, z;
     for (var xp = x - range; xp <= x + range; xp++) {
       for (var yp = y - range; yp <= y + range; yp++) {
         xg = xp;
         yg = yp;
         if (xp < 1) {
           if (isTorus) {
             xg = xMax+xp;
           } else {
             xg = 0;
           }
         }
         if (xp > xMax) {
           if (isTorus) {
             xg = xp-xMax;
           } else {
             xg = 0;
           }
         }
         if (yp < 1) {
           if (isTorus) {
             yg = yMax+yp;
           } else {
             yg = 0;
           }
         }
         if (yp > yMax) {
           if (isTorus) {
             yg = yp-yMax;
           } else {
             yg = 0;
           }
         }
        if ((xg > 0) && (yg > 0)) {
          z = data.at(yg).at(xg);
          sum = sum + z;
          n++;
          if (z > max)
            max = z;
          if (z < min)
            min = z;
         }
       }
     } 
      if (operation === "sum")
        result.at(y).put(sum, x);
      if (operation === "min")
        result.at(y).put(min, x);
      if (operation === "max")
        result.at(y).put(max, x);
      if (operation === "mean")
        if (n > 0)
          result.at(y).put(1.0 * sum / n, x);
        else
          result.at(y).put("", x);
   } 


    result = listCopy(data);
    xMin = Math.abs(xMin);
    xMax = Math.abs(xMax);
    yMin = Math.abs(yMin);
    yMax = Math.abs(yMax);
    range=Number(range);
    if (xMin > xMax) {
      h = xMin;
      xMin = xMax;
      xMax = h;
    }
    if (yMin > yMax) {
      h = yMin;
      yMin = yMax;
      yMax = h;
    }
    for (var x = xMin; x <= xMax; x++)
      for (var y = yMin; y <= yMax; y++)
        actWith(x, y);
    return result;
  }
);

SnapExtensions.primitives.set(
  'SciS_combineGridsOnGridPad(grid1,grid2,value1,operator,value2,ifValue,elseValue,xMax,yMax)',
  function (grid1, grid2, value1, operator, value2, ifValue, elseValue, xMax, yMax) {
    var result = new List(), row, ok, ok1, ok2;
    for (var y = 1; y <= yMax; y++) {
      row = new List();
      for (var x = 1; x <= xMax; x++) {
        ok1 = grid1.at(y).at(x) === value1;
        ok2 = grid2.at(y).at(x) === value2;
        ok = false;
        if ((operator === "and") && (ok1 && ok2))
          ok = true;
        if ((operator === "or") && (ok1 || ok2))
          ok = true;
        if ((operator === "xor") && ((ok1 && !ok2) || (!ok1 && ok2)))
          ok = true;
        if ((operator === "not-and") && (!(ok1 && ok2)))
          ok = true;
        if ((operator === "not-or") && (!(ok1 || ok2)))
          ok = true;
        if ((operator === "not-xor") && (!((ok1 && !ok2) || (!ok1 && ok2))))
          ok = true;
        if (operator === "minus")
          if (ok2)
            ok = false;
          else
            ok = ok1;
        if (ok)
          row.add(ifValue);
        else
          row.add(elseValue);
      }
      result.add(row);
    }
    return result;

  }
);

SnapExtensions.primitives.set(
  'SciS_applyWolframAutomatonToAgridOnGridPad(no,grid,color0,color1)',
  function (no, grid, color0, color1) {
    var WolframData, gridWidth = grid.at(1).length(), lineData = new List(), lineLength, result;

    function numberToBits(n) {
      var result = [0, 0, 0, 0, 0, 0, 0, 0], bit;
      for (var i = 7; i >= 0; i--) {
        bit = Math.floor(1.0 * n / Math.pow(2, i));
        result[i] = bit;
        n = n - bit * Math.pow(2, i);
      }
      return result;
    }

    no = Number(no);
    color0 = Number(color0);
    color1 = Number(color1);
    if ((no > 255) || (no < 0))
      return "ERROR: number out of range!";
    WolframData = new List(numberToBits(no));
    for (var i = 1; i <= 3 * gridWidth; i++)
      lineData.add(color0);
    for (var i = gridWidth + 1; i <= 2 * gridWidth; i++)
      lineData.put(grid.at(1).at(i - gridWidth), i);
    lineLength = lineData.length();
    for (var y = 1; y < grid.length(); y++) {
      result = new List();
      for (var i = 1; i <= lineLength; i++) {
        if (i === 1) {
          if (lineData.at(1) === color1)
            n = 2;
          else
            n = 0;
          if (lineData.at(2) === color1)
            n++;
        } else if (i === lineLength) {
          if (lineData.at(i - 1) === color1)
            n = 4;
          else
            n = 0;
          if (lineData.at(i) === color1)
            n = n + 2;
        } else {
          if (lineData.at(i - 1) === color1)
            n = 4;
          else
            n = 0;
          if (lineData.at(i) === color1)
            n = n + 2;
          if (lineData.at(i + 1) === color1)
            n++;
        }
        if (WolframData.at(n + 1) === 1) {
          result.add(color1);
          if ((i > gridWidth) && (i <= 2 * gridWidth))
            grid.at(y + 1).put(color1, i - gridWidth);
        } else {
          result.add(color0);
          if ((i > gridWidth) && (i <= 2 * gridWidth))
            grid.at(y + 1).put(color0, i - gridWidth);
        }
      }
      lineData = result;
    }
    return grid;
  }
);


/*
 //empty example --------------------------------------------------------------------------------------------------------------------------------------
 SnapExtensions.primitives.set('SciS_emptyExample(params)',
 function (params) {
 });
 */


