SnapExtensions.primitives.set(
  'SciS_SetSciSnapLogo()',
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
        var gradient = ctx.createLinearGradient(
          0,
          0,
          this.width(),
          0
          );
        gradient.addColorStop(0, 'black');
        gradient.addColorStop(0.5, myself.frameColor.toString());
        ctx.fillStyle = MorphicPreferences.isFlat ?
          myself.frameColor.toString() : gradient;
        ctx.fillRect(0, 0, this.width(), this.height());
        if (this.cachedTexture) {
          this.renderCachedTexture(ctx);
        } else if (this.texture) {
          this.renderTexture(this.texture, ctx);
        }
      };

      this.logo.renderCachedTexture = function (ctx) {
        ctx.drawImage(
          this.cachedTexture,
          5,
          Math.round((this.height() - this.cachedTexture.height) / 2)
          );
        this.changed();
      };

      this.logo.mouseClickLeft = function () {
        myself.snapMenu();
      };

      this.logo.color = BLACK;
      this.logo.setExtent(new Point(200, 28)); // dimensions are fixed
      this.add(this.logo);
    };
    var stage = this.parentThatIsA(StageMorph),
      ide = stage.parentThatIsA(IDE_Morph),
      world = stage.parentThatIsA(WorldMorph);
    ide.createLogo();
    ide.createControlBar();
    ide.fixLayout();
  }
);

SnapExtensions.primitives.set(
  'SciS_addMenuItemForSciSnapManuals()',
  function () {
    IDE_Morph.prototype.snapMenu = function () {
      var menu,
        world = this.world();

      menu = new MenuMorph(this);
      menu.addItem('About...', 'aboutSnap');
      menu.addLine();
      menu.addItem(
        'Reference manual',
        () => {
        var url = this.resourceURL('help', 'SnapManual.pdf');
        window.open(url, 'SnapReferenceManual');
      }
      );
      menu.addItem(
        'Snap! website',
        () => window.open('https://snap.berkeley.edu/', 'SnapWebsite')
      );
      menu.addItem(
        'SciSnap! manual',
        () => window.open('https://emu-online.de/ProgrammingWithSciSnap2.pdf', '')
      );
      menu.addItem(
        'SciSnap! Handbuch',
        () => window.open('https://emu-online.de/ProgrammierenMitSciSnap2.pdf', '')
      );
      menu.addItem(
        'Download source',
        () => window.open(
          'https://github.com/jmoenig/Snap/releases/latest',
          'SnapSource'
          )
      );
      if (world.isDevMode) {
        menu.addLine();
        menu.addItem(
          'Switch back to user mode',
          'switchToUserMode',
          'disable deep-Morphic\ncontext menus'
          + '\nand show user-friendly ones',
          new Color(0, 100, 0)
          );
      } else if (world.currentKey === 16) { // shift-click
        menu.addLine();
        menu.addItem(
          'Switch to dev mode',
          'switchToDevMode',
          'enable Morphic\ncontext menus\nand inspectors,'
          + '\nnot user-friendly!',
          new Color(100, 0, 0)
          );
      }
      menu.popup(world, this.logo.bottomLeft());
    };
  }
);

SnapExtensions.primitives.set(
//copied from Snap! library
  'SciS_setvalue(which,value)',
  function (which, value) {
    var stage = this.parentThatIsA(StageMorph),
      ide = stage.parentThatIsA(IDE_Morph),
      world = stage.parentThatIsA(WorldMorph);
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
          if ((value instanceof List) && value.length() == 2
            && !isNaN(value.at(1)) && !isNaN(value.at(2)))
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
  }
);

SnapExtensions.primitives.set(
  'SciS_uppercase(txt)',
  function (txt) {
    return txt.toUpperCase();
  }
);

SnapExtensions.primitives.set(
  'SciS_lowercase(txt)',
  function (txt) {
    return txt.toLowerCase();
  }
);

SnapExtensions.primitives.set(
  'SciS_indexof(sub,txt)',
  function (sub, txt) {
    return txt.indexOf(sub) + 1;
    ;
  }
);

SnapExtensions.primitives.set(
  'SciS_substring(aString,from,to)',
  function (aString, from, to) {
    from -= 1;
    if (to > aString.length)
      to = aString.length;
    if ((from >= 0) && (from < aString.length) && (to >= from))
      return aString.substring(from, to);
    else
      return "";
  }
);

SnapExtensions.primitives.set(
  'SciS_delete(substring,aString,choice)',
  function (substring, aString, choice) {
    var result = aString, pos = result.indexOf(substring);
    if (choice === 'first')
      return result.replace(substring, '');
    else {
      while (pos > -1) {
        result = result.replace(substring, '');
        pos = result.indexOf(substring);
      }
      return result;
    }
  }
);

SnapExtensions.primitives.set(
  'SciS_writeToFile(data,filename)',
  function (data, filename) {
    var ide = this.parentThatIsA(IDE_Morph);
    if (isString(data)) {
      ide.saveFileAs(data, 'text/plain;charset=utf-8', filename);
    }
  }
);

SnapExtensions.primitives.set(
  'SciS_replace(substring,replacement,aString,choice)',
  function (substring, replacement, aString, choice) {
    var result = aString, pos = result.indexOf(substring);
    if (choice === 'first')
      return result.replace(substring, replacement);
    else {
      while (pos > -1) {
        result = result.replace(substring, replacement);
        pos = result.indexOf(substring);
      }
      return result;
    }
  }
);

SnapExtensions.primitives.set(
  'SciS_costumecopy(costume)',
  function (costume) {
    if (typeof (costume) === "object")
      return costume.copy();
    else
      return "costume required!";
  }
);

SnapExtensions.primitives.set(
  'SciS_newcostume(w,h,r,g,b)',
  function (w, h, r, g, b) {
    var newCostume = new Costume();
    newCostume.contents.width = w;
    newCostume.contents.height = h;
    var ctx = newCostume.contents.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = new Color(r, g, b).toString();
    ctx.strokeStyle = new Color(0, 0, 0).toString();
    ctx.fillRect(0, 0, w, h);
    ctx.strokeRect(0, 0, w, h);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    newCostume.rotationCenter = new Point(w / 2, h / 2);
    return newCostume;
  }
);

SnapExtensions.primitives.set(
  'SciS_showmessage(title,message)',
  function (title, message) {
    this.parentThatIsA(IDE_Morph).inform(title, message);
  }
);

SnapExtensions.primitives.set(
  'SciS_copyOf(theList)',
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
  }
);

SnapExtensions.primitives.set(
  'SciS_mathpadaddaxes(cAttributes,type,maxValue,dimension,costume)',
  function (cAttributes, type, maxValue, dimension, costume) {
    var ctx, costumeWidth, costumeHeight, leftOffset = Number(cAttributes.at(6)), upperOffset = Number(cAttributes.at(7)),
      x0, y0, intervals, width = Number(cAttributes.at(8)), height = Number(cAttributes.at(9));

    function valueTOpixel(v) {
      return (v * width) / (2 * maxValue);
    }
    function pixelTOvalue(p) {
      return (2 * maxValue * p) / width;
    }

    //set values
    ctx = costume.contents.getContext('2d');
    costumeWidth = costume.contents.width;
    costumeHeight = costume.contents.height;
    x0 = width / 2;
    y0 = height / 2;
    intervals = 10 * Math.round(width / 500);

    //plot frame
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = new Color(0, 0, 0).toString();
    ctx.strokeRect(leftOffset, upperOffset, width, height);
    ctx.closePath();
    ctx.stroke();

    //plot axes
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = new Color(0, 0, 0).toString();
    ctx.fillStyle = new Color(0, 0, 0).toString();
    ctx.moveTo(leftOffset, upperOffset + y0);
    ctx.lineTo(leftOffset + width, upperOffset + y0);
    ctx.lineTo(leftOffset + width - 10, upperOffset + y0 - 6);
    ctx.lineTo(leftOffset + width - 10, upperOffset + y0 + 6);
    ctx.lineTo(leftOffset + width, upperOffset + y0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    if (type === "complex")
      ctx.fillText("Re", leftOffset + width - 25, upperOffset + y0 - 15);
    else
      ctx.fillText("x", leftOffset + width - 15, upperOffset + y0 + 15);
    ctx.moveTo(leftOffset + x0, upperOffset + height);
    ctx.lineTo(leftOffset + x0, upperOffset);
    ctx.lineTo(leftOffset + x0 - 6, upperOffset + 10);
    ctx.lineTo(leftOffset + x0 + 6, upperOffset + 10);
    ctx.lineTo(leftOffset + x0, upperOffset);
    if (dimension > 2) {
      ctx.fillText("z", leftOffset + x0 - 15, upperOffset + 15);
      ctx.moveTo(leftOffset, upperOffset + y0 + x0 / 2);
      ctx.lineTo(leftOffset + width, upperOffset + y0 - x0 / 2);
      ctx.lineTo(leftOffset + width - 12, upperOffset + y0 - x0 / 2);
      ctx.lineTo(leftOffset + width - 6, upperOffset + y0 - x0 / 2 + 8);
      ctx.lineTo(leftOffset + width, upperOffset + y0 - x0 / 2);
      ctx.fillText("y", leftOffset + width - 15, upperOffset + y0 - x0 / 2 - 5);
    } else {
      if (type === "complex")
        ctx.fillText("Im", leftOffset + x0 - 25, upperOffset + 15);
      else
        ctx.fillText("y", leftOffset + x0 + 15, upperOffset + 15);
    }

    //drawScales
    var dx = 2 * maxValue / intervals, delta = valueTOpixel(dx), xpos = x0, ypos = y0, zpos, text, pos = y0,
      zpos, zdelta, w, x, y, fac;
    while (xpos >= 0) {
      xpos = xpos - delta;
    }
    while (xpos <= 0) {
      xpos = xpos + delta;
    }
    x = pixelTOvalue(xpos - x0);
    while (xpos < width) {
      text = x.toPrecision(2);
      w = ctx.measureText(text).width;
      ctx.moveTo(leftOffset + xpos, upperOffset + pos - 3);
      ctx.lineTo(leftOffset + xpos, upperOffset + pos + 3);
      if ((xpos < width - 10) && (xpos !== x0)) {
        ctx.fillText(text, leftOffset + xpos - w / 2, upperOffset + pos + 15);
      }
      if (dimension > 2) {
        zpos = x0 - (x0 - xpos) * Math.cos(Math.PI / 6) * 0.8;
        ctx.moveTo(leftOffset + zpos, upperOffset + pos + (x0 - zpos) / 2 - 3);
        ctx.lineTo(leftOffset + zpos, upperOffset + pos + (x0 - zpos) / 2 + 3);
        if ((zpos !== x0) && (zpos < width - 10)) {
          ctx.fillText(text, leftOffset + zpos - w / 2, upperOffset + pos + (x0 - zpos) / 2 + 15);
        }
      }
      xpos = xpos + delta;
      x = pixelTOvalue(xpos - x0);
    }
    pos = x0;
    while (ypos >= 0) {
      ypos = ypos - delta;
    }
    ypos = ypos + delta;
    y = pixelTOvalue(y0 - ypos);
    while (ypos <= height) {
      text = y.toPrecision(2);
      w = ctx.measureText(text).width;
      ctx.moveTo(leftOffset + pos - 3, upperOffset + ypos);
      ctx.lineTo(leftOffset + pos + 3, upperOffset + ypos);
      if ((ypos !== y0) && (ypos > 10)) {
        ctx.fillText(text, leftOffset + pos + 5, upperOffset + ypos + 3);
      }
      ypos = ypos + delta;
      y = pixelTOvalue(y0 - ypos);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    return costume;
  }
);

SnapExtensions.primitives.set(
  'SciS_mathpadplot(costume,data,r,g,b,maxValue,linewidth,dimension,onlypoints,cAttributes,startpoint,choice)',
  function (costume, data, r, g, b, maxValue, linewidth, dimension, onlypoints, cAttributes, startpoint, choice) {
    function valueTOpixel(v) {
      return (v * width) / (2 * maxValue);
    }
    function pixelTOvalue(p) {
      return (2 * maxValue * p) / width;
    }
    function vectorTOcoordinates(v) {
      if (dimension > 2) {
        var x = Number(v.at(1)), y = Number(v.at(2)), z = Number(v.at(3)), ypos;
        ypos = valueTOpixel(y) * Math.cos(Math.PI / 6) * 0.8;
        return new List([valueTOpixel(x) + ypos, valueTOpixel(z) + ypos / 2]);
      } else {
        var x = Number(v.at(1)), y = Number(v.at(2));
        return new List([valueTOpixel(x), valueTOpixel(y)]);
      }
    }

    if (choice === 'object-of') {
      //variables
      var ctx = costume.contents.getContext('2d'), costumeWidth = costume.contents.width,
        costumeHeight = costume.contents.height, width = Number(cAttributes.at(8)),
        height = Number(cAttributes.at(9)), leftOffset = Number(cAttributes.at(6)),
        upperOffset = Number(cAttributes.at(7)), x0 = width / 2, y0 = height / 2, point;
      maxValue = Number(maxValue);
      ctx.beginPath();
      ctx.fillStyle = new Color(r, g, b).toString();
      ctx.strokeStyle = new Color(r, g, b).toString();
      ctx.lineWidth = Number(linewidth);
      point = vectorTOcoordinates(data.at(1));
      ctx.moveTo(leftOffset + point.at(1) + x0, upperOffset + y0 - point.at(2));
      for (var i = 2; i <= data.length(); i++) {
        point = vectorTOcoordinates(data.at(i));
        ctx.lineTo(leftOffset + point.at(1) + x0, upperOffset + y0 - point.at(2));
      }
      ctx.closePath();
      ctx.stroke();
      return costume;
    }

    //else plot a complex number, line, or vector
    //variables
    var ctx = costume.contents.getContext('2d'), costumeWidth = costume.contents.width,
      costumeHeight = costume.contents.height, width = Number(cAttributes.at(8)),
      height = Number(cAttributes.at(9)), leftOffset = Number(cAttributes.at(6)),
      upperOffset = Number(cAttributes.at(7)), x0 = width / 2, y0 = height / 2, point, l,
      xp, yp, alpha, dl, xe, ye, xs, ys;
    maxValue = Number(maxValue);
    ctx.beginPath();
    ctx.fillStyle = new Color(r, g, b).toString();
    ctx.strokeStyle = new Color(r, g, b).toString();
    ctx.lineWidth = Number(linewidth);
    point = vectorTOcoordinates(data);
    theStartpoint = vectorTOcoordinates(startpoint);
    xs = theStartpoint.at(1);
    ys = theStartpoint.at(2);
    if (onlypoints) {
      if (choice === "line-to") {
        ctx.moveTo(leftOffset + point.at(1) + x0, upperOffset + y0 - point.at(2));
        ctx.lineTo(leftOffset + point.at(1) + x0 + 1, upperOffset + y0 - point.at(2) + 1);
        ctx.closePath();
        ctx.stroke();
      } else {
        ctx.moveTo(leftOffset + point.at(1) + xs + x0, upperOffset + y0 - point.at(2) - ys);
        ctx.lineTo(leftOffset + point.at(1) + xs + x0 + 1, upperOffset + y0 - point.at(2) - ys + 1);
        ctx.closePath();
        ctx.stroke();
      }
    } else {
      ctx.moveTo(leftOffset + xs + x0, upperOffset + y0 - ys);
      if (choice === "line-to")
        ctx.lineTo(leftOffset + point.at(1) + x0, upperOffset + y0 - point.at(2));
      else
        ctx.lineTo(leftOffset + point.at(1) + xs + x0, upperOffset + y0 - point.at(2) - ys);
      ctx.closePath();
      ctx.stroke();
      if ((choice === "vector") || (choice === "complex-number")) {
        xp = point.at(1), yp = point.at(2);
        l = Math.sqrt(xp * xp + yp * yp);
        if (l > 15) {
          ctx.beginPath();
          alpha = Math.acos(xp / l);
          if (yp < 0)
            alpha = -alpha;
          xe = xp * (l - 10) / l;
          ye = yp * (l - 10) / l;
          ctx.moveTo(leftOffset + xp + xs + x0, upperOffset + y0 - yp - ys);
          ctx.lineTo(leftOffset + xe - 5 * Math.sin(alpha) + xs + x0, upperOffset + y0 - ye - 5 * Math.cos(alpha) - ys);
          ctx.lineTo(leftOffset + xe + 5 * Math.sin(alpha) + xs + x0, upperOffset + y0 - ye + 5 * Math.cos(alpha) - ys);
          ctx.lineTo(leftOffset + xp + xs + x0, upperOffset + y0 - yp - ys);
          ctx.closePath();
          ctx.stroke();
          ctx.fill();
        }
      }
    }
    return costume;
  }
);

SnapExtensions.primitives.set(
  'SciS_ispropertypresent(properties,name,value)',
  function (properties, name, value) {
    var result, props, i, found;
    try {
      result = this.variables.getVar(properties);
    } catch (error) {
      result = "null";
    }
    if (result === "null")
      return false;
    props = this.variables.getVar(properties);
    i = 1;
    found = false;
    while (!found && (i <= props.length())) {
      found = (props.at(i).at(1) === name) && (props.at(i).at(2) === value);
      i++;
    }
    return found;
  }
);


SnapExtensions.primitives.set(
  'SciS_extractFITSdata(FITSdata)',
  function (FITSdata) {
    function strToInt(high, low) {
      var left = high.toString(2), right = low.toString(2);
      while (left.length < 8)
        left = "0" + left;
      while (right.length < 8)
        right = "0" + right;
      var both = left + right, result = 0;
      var factor = 1;
      for (var i = 15; i >= 0; i--) {
        if (both.charAt(i) == '1')
          result = result + factor;
        factor = factor * 2;
      }
      return result;
    }

    var width = 0, height = 0, numberlength = 0;
    minValue = 32768, maxValue = -32769, header = [], pixelvalues = [],
      keyword = '', kwvalue = '', indexInLine = 0, i = 0, insideString = false, finished = false, c = ' ', n = 0,
      mask = Math.pow(2, 7) - 1;
    i = 0;
    while ((i < 2880) && (i < FITSdata.length)) {
      indexInLine = 1;
      keyword = '';
      c = FITSdata.charAt(i);
      while ((c != ' ') && (c != '=') && (i < 2880) && (i < FITSdata.length) && (indexInLine <= 80)) {
        keyword = keyword + c;
        i++;
        indexInLine++;
        c = FITSdata.charAt(i);
      }
      while (((c == ' ') || (c == '=')) && (i < 2880) && (i < FITSdata.length) && (indexInLine <= 80)) {
        i++;
        indexInLine++;
        c = FITSdata.charAt(i);
      }
      kwvalue = '';
      insideString = false;
      finished = false;
      while (!finished) {
        kwvalue = kwvalue + FITSdata.charAt(i);
        if (c == "'")
          insideString = !insideString;
        i++;
        indexInLine++;
        c = FITSdata.charAt(i);
        if (insideString)
          finished = (i >= 2880) || (i >= FITSdata.length) || (indexInLine > 80);
        else
          finished = (c == ' ') || (i >= 2880) || (i >= FITSdata.length) || (indexInLine > 80);
      }
      if (keyword.length > 0)
        header.push(new List([keyword, kwvalue]));
      if (keyword == 'NAXIS1')
        width = kwvalue;
      if (keyword == 'NAXIS2')
        height = kwvalue;
      if (keyword == 'BITPIX')
        numberlength = kwvalue;
      while ((i < 2880) && (i < FITSdata.length) && (indexInLine <= 80)) {
        i++;
        indexInLine++;
      }
    }

    if (numberlength == 16) {
      i = 2880;
      while (i < FITSdata.length - 1) {
        n = strToInt(FITSdata.charAt(i).charCodeAt(0), FITSdata.charAt(i + 1).charCodeAt(0));
        //n = -(n & mask) + (n & ~mask);  
        pixelvalues.push(n);
        if (n > maxValue)
          maxValue = n;
        if (n < minValue)
          minValue = n;
        i = i + 2;
      }
      return new List([width, height, minValue, maxValue, new List(header), new List(pixelvalues)]);
    } else
      return 'unsupported number format';
  }
);

SnapExtensions.primitives.set(
  'SciS_readFileWithFilepicker()',
  function () {
    var inp = document.createElement('input'), ide = this.parent.parent, result = 0, done = false;

    function userImport() {

      function txtOnlyMsg(ftype, anyway) {
        ide.confirm(
          localize(
            'Snap! can only import "text" files.\n' +
            'You selected a file of type "' +
            ftype +
            '".'
            ) + '\n\n' + localize('Open anyway?'),
          'Unable to import',
          anyway // callback
          );
      }

      function readText(aFile) {
        var frd = new FileReader(),
          ext = aFile.name.split('.').pop().toLowerCase();

        function isTextFile(aFile) {
          // special cases for Windows
          // check the file extension for text-like-ness
          return aFile.type.indexOf('text') !== -1 ||
            contains(['txt', 'csv', 'xml', 'json', 'tsv'], ext);
        }

        function isType(aFile, string) {
          return aFile.type.indexOf(string) !== -1 || (ext === string);
        }

        frd.onloadend = function (e) {
          done = true;
          if (isType(aFile, 'csv')) {
            result = Process.prototype.parseCSV(e.target.result);
          } else if (isType(aFile, 'json')) {
            result = Process.prototype.parseJSON(e.target.result);
          } else {
            result = e.target.result;
          }
        };

        if (isTextFile(aFile)) {
          frd.readAsText(aFile);
        } else {
          txtOnlyMsg(
            aFile.type,
            function () {
              frd.readAsText(aFile);
            }
          );
        }
      }

      document.body.removeChild(inp);
      ide.filePicker = null;
      if (inp.files.length > 0) {
        readText(inp.files[inp.files.length - 1]);
      }
    }

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
    inp.addEventListener(
      "change",
      userImport,
      false
      );
    document.body.appendChild(inp);
    ide.filePicker = inp;
    inp.click();
    return function () {
      return new List([done, result]);
    };
  }
);

SnapExtensions.primitives.set(
  'SciS_writetoCSVfile(data,filename)',
  function (data, filename) {
    var ide = this.parent.parent;
    ide.saveFileAs(data.asCSV(), 'text/csv;charset=utf-8', filename);
  }
);

SnapExtensions.primitives.set(
  'SciS_pooling(data,width,height,typeOfPooling,stride,typeOfData)',
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
  }
);

SnapExtensions.primitives.set(
  'SciS_convolution(kernel,data,width,height,typeOfData,mIndex,kWidth)',
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
  }
);


SnapExtensions.primitives.set(
  'SciS_variance(aList,mean)',
  function (aList, mean) {
    if (aList.length() === 0)
      return 0;
    var n = 0, isNumber, c, variance = 0;
    var i = 1, k, value;
    while (i <= aList.length()) {
      value = aList.at(i);
      if (typeof (value) === "number")
        isNumber = true;
      else {
        if (typeof (value) === "string") {
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
      }
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
  }
);

SnapExtensions.primitives.set(
  'SciS_propertiesoftable(selection,table,x,y)',
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
  }
);


SnapExtensions.primitives.set(
  'SciS_importCSVdata(data)',
  function (data) {
    var maxColumns = 0, help;
    for (var i = 1; i <= data.length(); i++)
    {
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
  }
);

SnapExtensions.primitives.set(
  'SciS_groupeddata(aTable,compaircolumn,operation,groupcolumn)',
  function (aTable, compaircolumn, operation, groupcolumn) {
    compaircolumn = Number(compaircolumn);
    groupcolumn = Number(groupcolumn);
    var min, max, sum, mean, n, result, i, value, oldgroup, newgroup, stored = false;

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
      stored = false;
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
        stored = true;
      }
      i++;
    }
    if (!stored) {
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
    }
    return result;
  }
);

SnapExtensions.primitives.set(
  'SciS_subsection(data,begin,end)',
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
  }
);

SnapExtensions.primitives.set(
  'SciS_subsectionImage(data,begin,end,width,height)',
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
  }
);

SnapExtensions.primitives.set(
  'SciS_k-means-clustering(k,data)',
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
        for (var j = 1; j <= dimension; j++) {  //for all dimensions
          sum = 0;
          n = 0;
          for (var m = 1; m <= data.length(); m++) {  //for all points
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
    //add cluster number 0 to data
    for (var i = 1; i <= data.length(); i++) {
      data.at(i).add(0);
    }
    //calculate min and max for all columns
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
    //choose k random centers
    for (var i = 1; i <= k; i++) {
      center = new List();
      for (var n = 1; n <= dimension; n++)
        center.add(Math.random() * (minmax.at(n).at(2) - minmax.at(n).at(1)) + minmax.at(n).at(1));
      center.add(i);
      centers.add(center);
    }
    //run till no changes are made, max 100 loops
    anyChanges = true;
    loops = 0;
    while (anyChanges && (loops < 100)) {
      loops++;
      buildClusters();
      adjustCenters();
    }
    return data;
  }
);

SnapExtensions.primitives.set(
  'SciS_LevenshteinDistance(s1,s2)',
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
    //construct empty matrix
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
    //fill matrix
    for (var i = 2; i <= lengthS2 + 1; i++) {
      for (var j = 2; j <= lengthS1 + 1; j++) {
        if (s1.charAt(j - 1) === s2.charAt(i - 1))
          D.at(i).put(min(new List([D.at(i - 1).at(j - 1), D.at(i - 1).at(j - 1) + 1, D.at(i - 1).at(j) + 1, D.at(i).at(j - 1) + 1])), j);
        else
          D.at(i).put(min(new List([D.at(i - 1).at(j - 1) + 1, D.at(i - 1).at(j) + 1, D.at(i).at(j - 1) + 1])), j);
      }
    }
    return D.at(lengthS2 + 1).at(lengthS1 + 1);
  }
);

SnapExtensions.primitives.set(
  'SciS_columncopy(data,cols,start,stop)',
  function (data, cols, start, stop) {
    var row;
    result = new List();
    for (var i = start; i <= stop; i++) {
      row = new List();
      for (var n = 1; n <= cols.length(); n++)
        row.add(data.at(i).at(cols.at(n)));
      result.add(row);
    }
    return result;
  }
);

SnapExtensions.primitives.set(
  'SciS_DBSCAN(data,r,minMembers)',
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
          p.put(0, dim + 1); //labeled as visited
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
        point.put(0, dim + 1); //labeled as visited
        neighbours = neighboursOf(point);
        if (neighbours.length() < minMembers)
          point.put(-2, dim + 1); //labeled as noise
        else {
          clusterNr++;
          point.put(clusterNr, dim + 1);
          expand(neighbours);
        }
      }
      n++;
    }
    return data;
  }
);

SnapExtensions.primitives.set(
  'SciS_createVars(varNames,global,proc)',
  function (varNames, global, proc) {
    var ide = this.parentThatIsA(IDE_Morph);
    for (var i = 1; i <= varNames.length(); i++) {
      varName = varNames.at(i);
      if (global && !proc.homeContext.variables.parentFrame.parentFrame.vars[varName])
        this.addVariable(varName, true);
      if (!global && !proc.homeContext.variables.parentFrame.vars[varName])
        this.addVariable(varName, false);
    }
    ide.flushBlocksCache('variables'); // b/c of inheritance
    ide.refreshPalette();
  }
);

SnapExtensions.primitives.set(
  'SciS_addGraphToPlotpad(costume,ranges,offsets,lineattributes,aFunction,proc)',
  function (costume, ranges, offsets, lineattributes, aFunction, proc) {
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
        return proc.reportAtomicMap(f, new List([x])).at(1); //copied from Snap!-code
    }

    function plotFunction(f, r, g, b, ) {
      var xpos, ypos, x, y, xpOld, ypOld, plottedDots = 0, missingDots = 0, style = 1, modus = 1;
      //firstLineattribute=lineattributes.at(1).split(" ")[0];
      if (lineattributes.at(1).trim() == 'continuous')
        style = 1;
      else if (lineattributes.at(1).trim() == 'dashed')
        style = 2;
      else if (lineattributes.at(1).trim() == 'dash-dot')
        style = 3;
      else if (lineattributes.at(1).trim() == 'dot-dot')
        style = 4;
      ctx.beginPath();
      ctx.strokeStyle = new Color(r, g, b).toString();
      ctx.fillStyle = new Color(r, g, b).toString();
      ctx.lineWidth = lineattributes.at(2);
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
      //ctx.fill();
      ctx.stroke();

    }

    // to ensure the correct type "Number" to number parameters
    var xLeft = Number(ranges.at(1)), xRight = Number(ranges.at(2)), yLower = Number(ranges.at(3)), yUpper = Number(ranges.at(4)),
      leftOffset = Number(offsets.at(1)), rightOffset = Number(offsets.at(2)), upperOffset = Number(offsets.at(3)),
      lowerOffset = Number(offsets.at(4));

    var ctx = costume.contents.getContext('2d');
    var rightCostumeEdge = costume.contents.width, lowerCostumeEdge = costume.contents.height,
      diagramWidth = rightCostumeEdge - leftOffset - rightOffset, diagramHeight = lowerCostumeEdge - lowerOffset - upperOffset;
    var x0 = xLeft / (xLeft - xRight) * diagramWidth, y0 = yUpper / (yUpper - yLower) * diagramHeight;

    function defineClip() {
      ctx.beginPath();
      ctx.linewidth = 0;
      ctx.strokeStyle = new Color(0, 0, 0);
      ctx.rect(leftOffset, upperOffset, diagramWidth, diagramHeight);
      ctx.closePath();
      ctx.clip();
    }

    ctx.save(); // SO WE CAN CLIP!
    defineClip();
    plotFunction(aFunction, Number(lineattributes.at(3)), Number(lineattributes.at(4)), Number(lineattributes.at(5)));
    ctx.restore();
    return costume;
  }
);

SnapExtensions.primitives.set(
  'SciS_addNumericDataplotToPlotpad(costume,ranges,offsets,labels,lineattributes,dataattributes,data)',
  function (costume, ranges, offsets, labels, lineattributes, dataattributes, data) {
    // global variables

    var xLeft = Number(ranges.at(1)), xRight = Number(ranges.at(2));
    var yLower = Number(ranges.at(3)), yUpper = Number(ranges.at(4));
    var upperOffset = Number(offsets.at(3)), lowerOffset = Number(offsets.at(4));
    var leftOffset = Number(offsets.at(1)), rightOffset = Number(offsets.at(2));

    var ctx = costume.contents.getContext('2d');
    var rightCostumeEdge = costume.contents.width, lowerCostumeEdge = costume.contents.height,
      diagramWidth = rightCostumeEdge - leftOffset - rightOffset, diagramHeight = lowerCostumeEdge - lowerOffset - upperOffset;
    var x0 = xLeft / (xLeft - xRight) * diagramWidth, y0 = yUpper / (yUpper - yLower) * diagramHeight;

    var lcolor = new Color(lineattributes.at(3), lineattributes.at(4), lineattributes.at(5)).toString();
    var mcolor = new Color(dataattributes.at(4), dataattributes.at(5), dataattributes.at(6)).toString();

    // functions

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

    function rainbow(f) { // RAINBOW COLOURS FROM RED (f=0) TO VIOLET (f=1) COURTESY OF 
      // https://www.instructables.com/id/How-to-Make-Proper-Rainbow-and-Random-Colors-With-/ 
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
      var linewidth = lineattributes.at(2), linestyle = 1, datawidth = dataattributes.at(2), datastyle = 1;
      var arraydata = data.asArray(), xpos, ypos, xpOld, ypOld, w, i, connected = dataattributes.at(3);
      var n = arraydata.length, frac = 0.;
      if (lineattributes.at(1).trim() == 'continuous')
        linestyle = 1;
      else if (lineattributes.at(1).trim() == 'dashed')
        linestyle = 2;
      else if (lineattributes.at(1).trim() == 'dash-dot')
        linestyle = 3;
      else if (lineattributes.at(1).trim() == 'dot-dot')
        linestyle = 4;
      else if (lineattributes.at(1).trim() == 'rainbow')
        linestyle = 5;
      else if (lineattributes.at(1).trim() == 'inverse-rainbow')
        linestyle = 6;
      else if (lineattributes.at(1).trim() == 'none')
        linestyle = 0;
      if (dataattributes.at(1).trim() == 'o circle')
        datastyle = 1;
      else if (dataattributes.at(1).trim() == 'o')
        datastyle = 1;
      else if (dataattributes.at(1).trim() == 'circle')
        datastyle = 1;
      else if (dataattributes.at(1).trim() == '._point')
        datastyle = 2;
      else if (dataattributes.at(1).trim() == '.')
        datastyle = 2;
      else if (dataattributes.at(1).trim() == 'point')
        datastyle = 2;
      else if (dataattributes.at(1).trim() == '*_asterix')
        datastyle = 3;
      else if (dataattributes.at(1).trim() == '*')
        datastyle = 3;
      else if (dataattributes.at(1).trim() == 'asterix')
        datastyle = 3;
      else if (dataattributes.at(1).trim() == '+_plus')
        datastyle = 4;
      else if (dataattributes.at(1).trim() == '+')
        datastyle = 4;
      else if (dataattributes.at(1).trim() == 'plus')
        datastyle = 4;
      else if (dataattributes.at(1).trim() == 'x_ex')
        datastyle = 5;
      else if (dataattributes.at(1).trim() == 'x')
        datastyle = 5;
      else if (dataattributes.at(1).trim() == 'ex')
        datastyle = 5;
      else if (dataattributes.at(1).trim() == 'square')
        datastyle = 6;
      else if (dataattributes.at(1).trim() == 'triangle')
        datastyle = 7;
      else if (dataattributes.at(1).trim() == 'none')
        datastyle = 0;
      ctx.lineWidth = linewidth;
      if (linestyle == 2) {
        ctx.setLineDash([10, 5]);
      } else if (linestyle == 3) {
        ctx.setLineDash([10, 2, 1, 2]);
      } else if (linestyle == 4) {
        ctx.setLineDash([1, 2]);
      } else {
        ctx.setLineDash([]);
      }

      // PLOT LINES
      if ((linestyle > 0) && connected)
      {
        ctx.beginPath();
        ctx.strokeStyle = lcolor;
        ctx.fillStyle = lcolor;
        if (n > 0) {
          xpOld = xTOxp(arraydata[0].at(1));
          ypOld = yTOyp(arraydata[0].at(2));
        }
        i = 0;
        while (i < n)
        {
          xpos = xTOxp(arraydata[i].at(1));
          ypos = yTOyp(arraydata[i].at(2));
          if (i > 0)
          {
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

      // PLOT MARKERS
      if (datastyle > 0)
      {
        ctx.strokeStyle = lcolor;
        ctx.fillStyle = mcolor;
        if (arraydata.length > 0) {
          xpOld = xTOxp(arraydata[0].at(1));
          ypOld = yTOyp(arraydata[0].at(2));
        }
        i = 0;
        while (i < arraydata.length)
        {
          ctx.beginPath();
          xpos = xTOxp(arraydata[i].at(1));
          ypos = yTOyp(arraydata[i].at(2));
          if (datastyle == 1)
            ctx.arc(xpos + leftOffset, ypos + upperOffset, datawidth / 2, 0, 6.28318531);
          else if (datastyle == 2)
            ctx.arc(xpos + leftOffset, ypos + upperOffset, 2, 0, 6.28318531);
          else if (datastyle == 3)
          {
            ctx.font = "" + 2 * datawidth * 3 + "px sans-serif";
            w = ctx.measureText("*").width;
            ctx.fillText("*", xpos + leftOffset - w / 2, ypos + upperOffset + datawidth / 2);
          } else if (datastyle == 4)
          {
            ctx.font = "" + datawidth * 3 + "px sans-serif";
            w = ctx.measureText("+").width;
            ctx.fillText("+", xpos + leftOffset - w / 2, ypos + upperOffset + datawidth / 2);
          } else if (datastyle == 5)
          {
            ctx.font = "" + datawidth * 3 + "px sans-serif";
            w = ctx.measureText("X").width;
            ctx.fillText("X", xpos + leftOffset - w / 2, ypos + upperOffset + datawidth / 2);
          } else if (datastyle == 6)
          {
            ctx.fillRect(xpos + leftOffset - datawidth / 2, ypos + upperOffset - datawidth / 2, datawidth, datawidth);
            ctx.strokeRect(xpos + leftOffset - datawidth / 2, ypos + upperOffset - datawidth / 2, datawidth, datawidth);
          } else if (datastyle == 7)
          {
            ctx.moveTo(xpos + leftOffset, ypos + upperOffset - datawidth / 2);
            ctx.lineTo(xpos + leftOffset - datawidth / 2, ypos + upperOffset + datawidth / 2);
            ctx.lineTo(xpos + leftOffset + datawidth / 2, ypos + upperOffset + datawidth / 2);
            ctx.lineTo(xpos + leftOffset, ypos + upperOffset - datawidth / 2);
          }
          ctx.closePath();
          ctx.fill();
          ctx.stroke()
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

    ctx.save(); // SO WE CAN CLIP!
    defineClip();
    plotData();
    ctx.restore();

    return costume;
  }
);

SnapExtensions.primitives.set(
  'SciS_addMixedDataplotToPlotpad(costume,ranges,offsets,labels,lineattributes,dataattributes,data)',
  function (costume, ranges, offsets, labels, lineattributes, dataattributes, data) {
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

    function rainbow(f) { // RAINBOW COLOURS FROM RED (f=0) TO VIOLET (f=1) COURTESY OF 
      //https://www.instructables.com/id/How-to-Make-Proper-Rainbow-and-Random-Colors-With-/ 
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
      var i = 0, linewidth = lineattributes.at(2), linestyle = 0, datawidth = dataattributes.at(2), datastyle = 1, dx, x;
      var arraydata = data.asArray(), xpos, ypos, xpOld, ypOld, w;
      if (lineattributes.at(1).trim() == 'continuous')
        linestyle = 1;
      else if (lineattributes.at(1).trim() == 'dashed')
        linestyle = 2;
      else if (lineattributes.at(1).trim() == 'dash-dot')
        linestyle = 3;
      else if (lineattributes.at(1).trim() == 'dot-dot')
        linestyle = 4;
      else if (lineattributes.at(1).trim() == 'rainbow')
        linestyle = 5;
      connected = linestyle > 0;
      if (dataattributes.at(1).trim() == 'o circle')
        datastyle = 1;
      else if (dataattributes.at(1).trim() == '._point')
        datastyle = 2;
      else if (dataattributes.at(1).trim() == '*_asterix')
        datastyle = 3;
      else if (dataattributes.at(1).trim() == '+_plus')
        datastyle = 4;
      else if (dataattributes.at(1).trim() == 'x_ex')
        datastyle = 5;
      else if (dataattributes.at(1).trim() == 'square')
        datastyle = 6;
      else if (dataattributes.at(1).trim() == 'triangle')
        datastyle = 7;
      else if (dataattributes.at(1).trim() == 'none')
        datastyle = 8;
      else
        datastyle = 1;
      ctx.strokeStyle = new Color(lineattributes.at(3), lineattributes.at(4), lineattributes.at(5)).toString();
      ctx.fillStyle = new Color(dataattributes.at(4), dataattributes.at(5), dataattributes.at(6)).toString();
      ctx.lineWidth = linewidth;
      if (linestyle == 2) {
        ctx.setLineDash([10, 10]);
      } else if (linestyle == 3) {
        ctx.setLineDash([10, 5, 2, 5]);
      } else if (linestyle == 4) {
        ctx.setLineDash([2, 5]);
      } else {
        ctx.setLineDash([]);
      }
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
        if (datastyle == 1) {
          ctx.arc(xpos + leftOffset, ypos + upperOffset, datawidth / 2, 0, 6.283185307179586476925286766559);
        }
        if (datastyle == 2) {
          ctx.arc(xpos + leftOffset, ypos + upperOffset, 2, 0, 6.283185307179586476925286766559);
        }
        if (datastyle == 3) {
          ctx.font = "" + datawidth + "px sans-serif";
          w = ctx.measureText("*").width;
          ctx.fillText("*", xpos + leftOffset - w / 2, ypos + upperOffset + datawidth / 2);
        }
        if (datastyle == 4) {
          ctx.font = "" + datawidth + "px sans-serif";
          w = ctx.measureText("+").width;
          ctx.fillText("+", xpos + leftOffset - w / 2, ypos + upperOffset + datawidth / 2);
        }
        if (datastyle == 5) {
          ctx.font = "" + datawidth + "px sans-serif";
          w = ctx.measureText("X").width;
          ctx.fillText("X", xpos + leftOffset - w / 2, ypos + upperOffset + datawidth / 2);
        }
        if (datastyle == 6) {
          ctx.fillRect(xpos + leftOffset - datawidth / 2, ypos + upperOffset - datawidth / 2, datawidth, datawidth);
          ctx.strokeRect(xpos + leftOffset - datawidth / 2, ypos + upperOffset - datawidth / 2, datawidth, datawidth);
        }
        if (datastyle == 7) {
          ctx.moveTo(xpos + leftOffset, ypos + upperOffset - datawidth / 2);
          ctx.lineTo(xpos + leftOffset - datawidth / 2, ypos + upperOffset + datawidth / 2);
          ctx.lineTo(xpos + leftOffset + datawidth / 2, ypos + upperOffset + datawidth / 2);
          ctx.lineTo(xpos + leftOffset, ypos + upperOffset - datawidth / 2);
        }
        if (datastyle == 0) {
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

// to ensure the correct type "Number" to number parameters
    xLeft = Number(ranges.at(1));
    xRight = Number(ranges.at(2));
    yLower = Number(ranges.at(3));
    yUpper = Number(ranges.at(4));
    upperOffset = Number(offsets.at(2));
    lowerOffset = Number(offsets.at(3));
    leftOffset = Number(offsets.at(1));

    var ctx = costume.contents.getContext('2d');
    var rightCostumeEdge = costume.contents.width, lowerCostumeEdge = costume.contents.height,
      diagramWidth = rightCostumeEdge - leftOffset, diagramHeight = lowerCostumeEdge - lowerOffset - upperOffset;
    var x0 = xLeft / (xLeft - xRight) * diagramWidth, y0 = yUpper / (yUpper - yLower) * diagramHeight;

    plotData();

    return costume;

  }
);

SnapExtensions.primitives.set(
  'SciS_addHistogramToPlotpad(costume,ranges,offsets,lineattributes,data,datapointattributes)',
  function (costume, ranges, offsets, lineattributes, data, datapointattributes) {
    // functions

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

    function plotHistogram() {
      var linewidth = lineattributes.at(2), linestyle = 1, yZero = yTOyp(0.);
      var arraydata = data.asArray(), xp, yp, i, xold;
      var n = arraydata.length;
      var lcolor = new Color(lineattributes.at(3), lineattributes.at(4), lineattributes.at(5)).toString();
      var x = arraydata[0].at(1);
      y = arraydata[0].at(2);
      var dx = arraydata[1].at(1) - x;
      if (n == 0)
        return;
      if (lineattributes.at(1).trim() == 'continuous')
        linestyle = 1;
      else if (lineattributes.at(1).trim() == 'dashed')
        linestyle = 2;
      else if (lineattributes.at(1).trim() == 'dash-dot')
        linestyle = 3;
      else if (lineattributes.at(1).trim() == 'dot-dot')
        linestyle = 4;
      else if (lineattributes.at(1).trim() == 'none')
        return;
      ctx.lineWidth = linewidth;
      if (linestyle == 2) {
        ctx.setLineDash([10, 5]);
      } else if (linestyle == 3) {
        ctx.setLineDash([10, 2, 1, 2]);
      } else if (linestyle == 4) {
        ctx.setLineDash([1, 2]);
      } else {
        ctx.setLineDash([]);
      }
      ctx.beginPath();
      ctx.strokeStyle = lcolor;
      ctx.fillStyle = new Color(datapointattributes.at(4), datapointattributes.at(5), datapointattributes.at(6)).toString();
      ;
      xp = xTOxp(x - 0.5 * dx);
      yp = yTOyp(0.);
      ctx.moveTo(xp, yp);
      i = 0;
      while (i < n)
      {
        xold = xp;
        x = arraydata[i].at(1);
        y = arraydata[i].at(2);
        yp = yTOyp(y);
        ctx.moveTo(xp, yZero);
        ctx.lineTo(xp, yp);
        xp = xTOxp(x + 0.5 * dx);
        ctx.lineTo(xp, yp);
        ctx.lineTo(xp, yZero);
        ctx.lineTo(xold, yZero);
        i = i + 1;
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

// to ensure the correct type "Number" to number parameters
    xLeft = Number(ranges.at(1));
    xRight = Number(ranges.at(2));
    yLower = Number(ranges.at(3));
    yUpper = Number(ranges.at(4));
    leftOffset = Number(offsets.at(1));
    rightOffset = Number(offsets.at(2));
    upperOffset = Number(offsets.at(3));
    lowerOffset = Number(offsets.at(4));

    var ctx = costume.contents.getContext('2d');
    var rightCostumeEdge = costume.contents.width;
    var lowerCostumeEdge = costume.contents.height;
    var diagramWidth = rightCostumeEdge - leftOffset - rightOffset;
    var diagramHeight = lowerCostumeEdge - lowerOffset - upperOffset;

    function defineClip() {
      ctx.beginPath();
      ctx.linewidth = 0;
      ctx.strokeStyle = new Color(0, 0, 0);
      ctx.rect(leftOffset, upperOffset, diagramWidth, diagramHeight);
      ctx.closePath();
      ctx.clip();
    }

    ctx.save(); // SO WE CAN CLIP!
    defineClip();
    plotHistogram();
    ctx.restore();

    return costume;
  }
);

SnapExtensions.primitives.set(
  'SciS_addAxesAndScalesToPlotpad(costume,scaleattributes,labels,offsets,ranges,plotcolors)',
  function (costume, scaleattributes, labels, offsets, ranges, plotcolors) {
    // global variables

    var ctx = costume.contents.getContext('2d');
    var xLeft = Number(ranges.at(1)), xRight = Number(ranges.at(2)), yLower = Number(ranges.at(3)), yUpper = Number(ranges.at(4));
    var leftOffset = Number(offsets.at(1)), rightOffset = Number(offsets.at(2));
    var upperOffset = Number(offsets.at(3)), lowerOffset = Number(offsets.at(4));
    var xprecision = Number(scaleattributes.at(1)), xtextheight = Number(scaleattributes.at(3)), xIntervals = Number(scaleattributes.at(5));
    var yprecision = Number(scaleattributes.at(2)), ytextheight = Number(scaleattributes.at(4)), yIntervals = Number(scaleattributes.at(6));
    var xstart = Number(scaleattributes.at(7)), xstep = Number(scaleattributes.at(9)), xscaling = Number(scaleattributes.at(11));
    var ystart = Number(scaleattributes.at(8)), ystep = Number(scaleattributes.at(10)), yscaling = Number(scaleattributes.at(12));
    var ticlength = Number(scaleattributes.at(13));
    var xminitic = Number(scaleattributes.at(14)), yminitic = Number(scaleattributes.at(15));
    var xgrid = scaleattributes.at(16), ygrid = scaleattributes.at(17);
    var xcentered = scaleattributes.at(18), ycentered = scaleattributes.at(19);
    var showXscale = scaleattributes.at(20), showYscale = scaleattributes.at(21);
    var border = Number(scaleattributes.at(22));
    var rightCostumeEdge = costume.contents.width, lowerCostumeEdge = costume.contents.height;

    var diagramWidth = rightCostumeEdge - leftOffset - rightOffset, diagramHeight = lowerCostumeEdge - lowerOffset - upperOffset;

    var rback = Number(plotcolors.at(3)), gback = Number(plotcolors.at(4)), bback = Number(plotcolors.at(5));
    var rfront = Number(plotcolors.at(8)), gfront = Number(plotcolors.at(9)), bfront = Number(plotcolors.at(10));

// functions

    function xTOxp(x) {
      return leftOffset + (x - xLeft) * diagramWidth / (xRight - xLeft);
    }      // x0+(x*diagramWidth/(xRight-xLeft));}
    function yTOyp(y) {
      return upperOffset + (yUpper - y) * diagramHeight / (yUpper - yLower);
    }  // 0-(y*diagramHeight/(yUpper-yLower));}
    function xpTOx(xp) {
      return xLeft + (xRight - xLeft) * (xp - leftOffset) / diagramWidth;
    }     // (xp-x0)*(xRight-xLeft)/diagramWidth;}
    function ypTOy(yp) {
      return yUpper - (yUpper - yLower) * (yp - upperOffset) / diagramHeight;
    } // (y0-yp)*(yUpper-yLower)/diagramHeight;}

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

    function special(s) {
      var a;
      for (var i = 0; i < conv.length; i++) {
        a = conv[i];
        s = s.replaceAll(a[0], a[1]);
      }
      return s;
    }

    function draw_title()
    {
      ctx.fillStyle = new Color(rfront, gfront, bfront).toString(); // 0,0,0).toString()
      var label = special(labels.at(1));
      var h = Number(labels.at(4));
      if (label.length > 0 && upperOffset > 0) {
        ctx.font = "" + labels.at(4) + "px sans-serif";
        var w = ctx.measureText(label).width;
        var yl = upperOffset / 2 + 0.4 * h;
        if (ticlength < 0)
          yl += ticlength / 2;
        ctx.fillText(label, leftOffset + diagramWidth / 2 - w / 2, yl);
      }
    }

    function draw_xlabel()
    {
      var xl, yl, w;
      var label = special(labels.at(2));
      var units = special(labels.at(7));
      var scaling = "" + xscaling.toPrecision(1);
      var idx = scaling.indexOf("1e+");
      if (idx > -1)
        scaling = scaling.replace("1e+", "10^");
      else {
        idx = scaling.indexOf("1e");
        if (idx > -1)
          scaling = scaling.replace("1e", "10^");
      }
      ctx.fillStyle = new Color(rfront, gfront, bfront).toString(); // 0,0,0).toString()
      if (xscaling < 0.99 || xscaling > 1.01) {
        label += "  /  " + scaling;
        if (units.length > 0)
          label += " " + units;
      } else if (units.length > 0) {
        label += "  [" + units + "]";
      }
      ctx.font = "" + labels.at(5) + "px sans-serif";
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
      // ctx.fillText("x,y,w,W="+xl.toFixed(0)+","+yl.toFixed(0)+","+w.toFixed(0)+","+label.length,20,20);
    }

    function draw_ylabel(xl)
    {
      var yl, w;
      var label = special(labels.at(3));
      var units = special(labels.at(8));
      var scaling = "" + yscaling.toPrecision(1);
      var idx = scaling.indexOf("1e+");
      if (idx > -1)
        scaling = scaling.replace("1e+", "10^");
      else {
        idx = scaling.indexOf("1e");
        if (idx > -1)
          scaling = scaling.replace("1e", "10^");
      }
      ctx.fillStyle = new Color(rfront, gfront, bfront).toString(); // 0,0,0).toString() 
      if (yscaling < 0.99 || yscaling > 1.01) {
        label += "  /  " + scaling;
        if (units.length > 0)
          label += " " + units;
      } else if (units.length > 0) {
        label += "  [" + units + "]";
      }
      ctx.font = "" + labels.at(6) + "px sans-serif";
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

    function draw_scales()
    {
      var w, text, x, y, xs, ys, xl, yl, xpos, ypos, xp, yp, dt, t, n, xtics, ytics, xp1, xp2, yp1, yp2, xpoff, ypoff, xx = leftOffset;

      // X-SCALES
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

      // X-SCALES
      if (showXscale) {
        if (xtics) { // MINI-XTICS BEFORE THE FIRST XTIC
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

        if (ycentered) {
          yl = yTOyp(0.) + 1.2 * ticlength + xtextheight;
        } else {
          yl = upperOffset + diagramHeight + xtextheight * 1.3;
        }
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

      // Y-SCALES
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

        if (ytics) { // MINI-YTICS BEFORE THE FIRST YTIC
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

        // ctx.textAlign = "right";
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
        // ctx.textAlign = "center";
        if (xcentered)
          xl = leftOffset - 1.2 * ytextheight;
      }
      return xx;
    }

//clear label regions

    ctx.beginPath();
    ctx.fillStyle = new Color(rback, gback, bback).toString();
    if (border)
      ctx.strokeStyle = new Color(rfront, gfront, bfront).toString();
    else
      ctx.strokeStyle = new Color(rback, gback, bback).toString();
    ctx.lineWidth = 1;

    ctx.fillRect(0, 0, rightCostumeEdge, upperOffset); // TITLE
    ctx.fillRect(0, 0, leftOffset, lowerCostumeEdge); // YLABEL
    ctx.fillRect(0, lowerCostumeEdge - lowerOffset + 1, rightCostumeEdge, lowerCostumeEdge); // XLABEL
    ctx.strokeRect(0, 0, rightCostumeEdge, lowerCostumeEdge);
    ctx.fillRect(rightCostumeEdge - 1, 0, 1, lowerCostumeEdge);


//draw labels

    var xx = draw_scales();
    draw_title();
    draw_xlabel();
    draw_ylabel(xx);

//draw axes box

// ctx.strokeStyle = new Color(rfront,gfront,bfront).toString();
// ctx.strokeRect(leftOffset,upperOffset,diagramWidth,diagramHeight);
    xp1 = leftOffset;
    xp2 = leftOffset + diagramWidth;
    yp1 = upperOffset;
    yp2 = upperOffset + diagramHeight;
    xp = xTOxp(0.);
    yp = yTOyp(0.);
// Y-BOX/-AXIS
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
// X-BOX/-AXIS
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

  }
);

SnapExtensions.primitives.set(
  'SciS_FITSpixelsOnStageForImagePad(data,min,max,gray,log,pixels,cAttributes,iAttributes)',
  function (data, min, max, gray, log, pixels, cAttributes, iAttributes) {
    var leftOffset = Number(cAttributes.at(6)), upperOffset = Number(cAttributes.at(7)), cWidth = Number(cAttributes.at(1)),
      cHeight = Number(cAttributes.at(2)), w = Number(iAttributes.at(2)), h = Number(iAttributes.at(3)), n, value,
      interval = (max - min) / 8, x = leftOffset + 1, y = upperOffset;

    for (var i = 1; i <= data.length(); i++) {
      value = data.at(i);
      n = value;
      if (value <= min)
        n = min + 1;
      if (value > max)
        n = max;
      if (log)
        n = Math.round(Math.log(n - min) / Math.log(max - min) * 255);
      else
        n = Math.round((n - min) / (max - min) * 255);
      if ((x <= cWidth) && (y <= cHeight) && (y <= h + upperOffset)) {
        if (gray)
          pixels.put(new List([n, n, n, 255]), y * cWidth + x);
        else {
          if (value <= min) {
            pixels.put(new List([0, 0, 0, 255]), y * w + x);
          } else if (value < min + interval)
            pixels.put(new List([0, 0, n, 255]), y * cWidth + x);
          else if (value < min + 2 * interval)
            pixels.put(new List([0, n, n, 255]), y * cWidth + x);
          else if (value < min + 3 * interval)
            pixels.put(new List([n, 0, n, 255]), y * cWidth + x);
          else if (value < min + 4 * interval)
            pixels.put(new List([0, n, 0, 255]), y * cWidth + x);
          else if (value < min + 5 * interval)
            pixels.put(new List([n, 0, 0, n]), y * cWidth + x);
          else if (value < min + 6 * interval)
            pixels.put(new List([n, n / 2, 0, 255]), y * cWidth + x);
          else if (value < min + 7 * interval)
            pixels.put(new List([n, n, 0, 255]), y * cWidth + x);
          else if (value < min + 8 * interval)
            pixels.put(new List([n, n, n, 255]), y * cWidth + x);
          else
            pixels.put(new List([255, 255, 255, 255]), y * cWidth + x);
        }
      }
      x++;
      if (x > w + leftOffset) {
        x = leftOffset + 1;
        y++;
      }
    }
    return pixels;
  }
);

SnapExtensions.primitives.set(
  'SciS_FITSpixelsOnSpriteForImagePad(data,min,max,gray,log,iAttributes)',
  function (data, min, max, gray, log, iAttributes) {
    var result = [], i = 1, n, value, interval = (max - min) / 8, w = Number(iAttributes.at(2)), h = Number(iAttributes.at(3));
    while ((i <= data.length()) && (i <= w * h)) {
      value = data.at(i);
      n = value;
      if (value <= min)
        n = min + 1;
      if (value > max)
        n = max;
      if (log)
        n = Math.round(Math.log(n - min) / Math.log(max - min) * 255);
      else
        n = Math.round((n - min) / (max - min) * 255);
      if (gray)
        result.push(new List([n, n, n, 255]));
      else { // result.push(new List([n,255-n,Math.round(255-n/2),255]));
        if (value <= min) {
          result.push(new List([0, 0, 0, 255]));
        } else if (value < min + interval)
          result.push(new List([0, 0, n, 255]));
        else if (value < min + 2 * interval)
          result.push(new List([0, n, n, 255]));
        else if (value < min + 3 * interval)
          result.push(new List([n, 0, n, 255]));
        else if (value < min + 4 * interval)
          result.push(new List([0, n, 0, 255]));
        else if (value < min + 5 * interval)
          result.push(new List([n, 0, 0, n]));
        else if (value < min + 6 * interval)
          result.push(new List([n, n / 2, 0, 255]));
        else if (value < min + 7 * interval)
          result.push(new List([n, n, 0, 255]));
        else if (value < min + 8 * interval)
          result.push(new List([n, n, n, 255]));
        else
          result.push(new List([255, 255, 255, 255]));
      }
      i = i + 1;
    }
    return new List(result);
  }
);

SnapExtensions.primitives.set(
  'SciS_RGBpixelsOnStageForImagePad(data,min,max,gray,log,pixels,cAttributes,iAttributes)',
  function (data, min, max, gray, log, pixels, cAttributes, iAttributes) {
    var leftOffset = Number(cAttributes.at(6)), upperOffset = Number(cAttributes.at(7)), cWidth = Number(cAttributes.at(1)),
      cHeight = Number(cAttributes.at(2)), w = Number(iAttributes.at(2)), h = Number(iAttributes.at(3)), n, value,
      interval = (max - min) / 8, x = leftOffset + 1, y = upperOffset;

    for (var i = 1; i <= data.length(); i++) {
      value = (data.at(i).at(1) + data.at(i).at(2) + data.at(i).at(3)) / 3;
      n = value;
      if (value <= min)
        n = min + 1;
      if (value > max)
        n = max;
      if (log)
        n = Math.round(Math.log(n - min) / Math.log(max - min) * 255);
      else
        n = Math.round((n - min) / (max - min) * 255);
      if ((x <= cWidth) && (y <= cHeight) && (y <= h + upperOffset)) {
        if (gray)
          pixels.put(new List([n, n, n, 255]), y * cWidth + x);
        else {
          if (value <= min) {
            pixels.put(new List([0, 0, 0, 255]), y * w + x);
          } else if (value < min + interval)
            pixels.put(new List([0, 0, n, 255]), y * cWidth + x);
          else if (value < min + 2 * interval)
            pixels.put(new List([0, n, n, 255]), y * cWidth + x);
          else if (value < min + 3 * interval)
            pixels.put(new List([n, 0, n, 255]), y * cWidth + x);
          else if (value < min + 4 * interval)
            pixels.put(new List([0, n, 0, 255]), y * cWidth + x);
          else if (value < min + 5 * interval)
            pixels.put(new List([n, 0, 0, n]), y * cWidth + x);
          else if (value < min + 6 * interval)
            pixels.put(new List([n, n / 2, 0, 255]), y * cWidth + x);
          else if (value < min + 7 * interval)
            pixels.put(new List([n, n, 0, 255]), y * cWidth + x);
          else if (value < min + 8 * interval)
            pixels.put(new List([n, n, n, 255]), y * cWidth + x);
          else
            pixels.put(new List([255, 255, 255, 255]), y * cWidth + x);
        }
      }
      x++;
      if (x > w + leftOffset) {
        x = leftOffset + 1;
        y++;
      }
    }
    return pixels;
  }
);

SnapExtensions.primitives.set(
  'SciS_RGBpixelsOnSpriteForImagePad(data,min,max,gray,log)',
  function (data, min, max, gray, log) {
    var result = [], i = 1, n, value, interval = (max - min) / 8;
    while (i <= data.length()) {
      value = (data.at(i).at(1) + data.at(i).at(2) + data.at(i).at(3)) / 3;
      n = value;
      if (value <= min)
        n = min + 1;
      if (value > max)
        n = max;
      if (log)
        n = Math.round(Math.log(n - min) / Math.log(max - min) * 255);
      else
        n = Math.round((n - min) / (max - min) * 255);
      if (gray)
        result.push(new List([n, n, n, 255]));
      else { // result.push(new List([n,255-n,Math.round(255-n/2),255]));
        if (value <= min) {
          result.push(new List([0, 0, 0, 255]));
        } else if (value < min + interval)
          result.push(new List([0, 0, n, 255]));
        else if (value < min + 2 * interval)
          result.push(new List([0, n, n, 255]));
        else if (value < min + 3 * interval)
          result.push(new List([n, 0, n, 255]));
        else if (value < min + 4 * interval)
          result.push(new List([0, n, 0, 255]));
        else if (value < min + 5 * interval)
          result.push(new List([n, 0, 0, n]));
        else if (value < min + 6 * interval)
          result.push(new List([n, n / 2, 0, 255]));
        else if (value < min + 7 * interval)
          result.push(new List([n, n, 0, 255]));
        else if (value < min + 8 * interval)
          result.push(new List([n, n, n, 255]));
        else
          result.push(new List([255, 255, 255, 255]));
      }
      i = i + 1;
    }
    return new List(result);
  }
);

SnapExtensions.primitives.set(
  'SciS_drawLineOnImagepad(costume,x1,y1,x2,y2,lineAttributes)',
  function (costume, x1, y1, x2, y2, lineAttributes) {
    x1 = Number(x1);
    y1 = Number(y1);
    x2 = Number(x2);
    y2 = Number(y2);
    var ctx = costume.contents.getContext('2d'),
      style = lineAttributes.at(1).trim(),
      w = Number(lineAttributes.at(2)),
      r = Number(lineAttributes.at(3)),
      g = Number(lineAttributes.at(4)),
      b = Number(lineAttributes.at(5));
    if (style == 'dashed') {
      ctx.setLineDash([10, 10]);
    } else if (style == 'dash-dot') {
      ctx.setLineDash([10, 5, 2, 5]);
    } else if (style == 'dot-dot') {
      ctx.setLineDash([2, 5]);
    } else {
      ctx.setLineDash([]);
    }
    ctx.beginPath();
    ctx.lineWidth = w;
    ctx.strokeStyle = new Color(r, g, b).toString();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.stroke();
    return costume;
  }
);

SnapExtensions.primitives.set(
  'SciS_drawRectangleOnImagepad(costume,x1,y1,width,height,lineAttributes)',
  function (costume, x1, y1, width, height, lineAttributes) {
    x1 = Number(x1);
    y1 = Number(y1);
    width = Number(width);
    height = Number(height);
    var ctx = costume.contents.getContext('2d'),
      style = lineAttributes.at(1).trim(),
      w = Number(lineAttributes.at(2)),
      r = Number(lineAttributes.at(3)),
      g = Number(lineAttributes.at(4)),
      b = Number(lineAttributes.at(5));
    if (style == 'dashed') {
      ctx.setLineDash([10, 10]);
    } else if (style == 'dash-dot') {
      ctx.setLineDash([10, 5, 2, 5]);
    } else if (style == 'dot-dot') {
      ctx.setLineDash([2, 5]);
    } else {
      ctx.setLineDash([]);
    }
    ctx.beginPath();
    ctx.lineWidth = w;
    ctx.strokeStyle = new Color(r, g, b).toString();
    ctx.strokeRect(x1, y1, width, height);
    ctx.closePath();
    ctx.stroke();
    return costume;
  }
);

SnapExtensions.primitives.set(
  'SciS_fillRectangleOnImagepad(costume,x1,y1,width,height,lineAttributes)',
  function (costume, x1, y1, width, height, lineAttributes) {
    x1 = Number(x1);
    y1 = Number(y1);
    width = Number(width);
    height = Number(height);
    var ctx = costume.contents.getContext('2d'),
      style = lineAttributes.at(1).trim(),
      w = Number(lineAttributes.at(2)),
      r = Number(lineAttributes.at(6)),
      g = Number(lineAttributes.at(7)),
      b = Number(lineAttributes.at(8));
    if (style == 'dashed') {
      ctx.setLineDash([10, 10]);
    } else if (style == 'dash-dot') {
      ctx.setLineDash([10, 5, 2, 5]);
    } else if (style == 'dot-dot') {
      ctx.setLineDash([2, 5]);
    } else {
      ctx.setLineDash([]);
    }
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.fillStyle = new Color(r, g, b).toString();
    ctx.fillRect(x1, y1, width, height);
    ctx.closePath();
    ctx.fill();
    return costume;
  }
);

SnapExtensions.primitives.set(
  'SciS_drawCircleOnImagepad(costume,x,y,radius,lineAttributes)',
  function (costume, x, y, radius, lineAttributes) {
    x = Number(x);
    y = Number(y);
    radius = Number(radius);
    var ctx = costume.contents.getContext('2d'),
      style = lineAttributes.at(1).trim(),
      w = Number(lineAttributes.at(2)),
      r = Number(lineAttributes.at(3)),
      g = Number(lineAttributes.at(4)),
      b = Number(lineAttributes.at(5));
    if (style == 'dashed') {
      ctx.setLineDash([10, 10]);
    } else if (style == 'dash-dot') {
      ctx.setLineDash([10, 5, 2, 5]);
    } else if (style == 'dot-dot') {
      ctx.setLineDash([2, 5]);
    } else {
      ctx.setLineDash([]);
    }
    ctx.beginPath();
    ctx.lineWidth = w;
    ctx.strokeStyle = new Color(r, g, b).toString();
    ctx.arc(x, y, radius, 0, 6.283185307179586476925286766559);
    ctx.closePath();
    ctx.stroke();
    return costume;
  }
);

SnapExtensions.primitives.set(
  'SciS_fillCircleOnImagepad(costume,x,y,radius,lineAttributes)',
  function (costume, x, y, radius, lineAttributes) {
    x = Number(x);
    y = Number(y);
    radius = Number(radius);
    var ctx = costume.contents.getContext('2d'),
      style = lineAttributes.at(1).trim(),
      w = Number(lineAttributes.at(2)),
      r = Number(lineAttributes.at(6)),
      g = Number(lineAttributes.at(7)),
      b = Number(lineAttributes.at(8));
    if (style == 'dashed') {
      ctx.setLineDash([10, 10]);
    } else if (style == 'dash-dot') {
      ctx.setLineDash([10, 5, 2, 5]);
    } else if (style == 'dot-dot') {
      ctx.setLineDash([2, 5]);
    } else {
      ctx.setLineDash([]);
    }
    ctx.beginPath();
    ctx.fillStyle = new Color(r, g, b).toString();
    ctx.arc(x, y, radius, 0, 6.283185307179586476925286766559);
    ctx.closePath();
    ctx.fill();
    return costume;
  }
);

SnapExtensions.primitives.set(
  'SciS_drawTextOnImagepad(costume,x,y,text,height,horizontal,lineAttributes)',
  function (costume, x, y, text, height, horizontal, lineAttributes) {
    var ctx = costume.contents.getContext('2d'),
      style = lineAttributes.at(1).trim(),
      w = Number(lineAttributes.at(2)),
      r = Number(lineAttributes.at(3)),
      g = Number(lineAttributes.at(4)),
      b = Number(lineAttributes.at(5));
    ctx.beginPath();
    ctx.fillStyle = new Color(r, g, b).toString();
    ctx.font = "" + height + "px sans-serif";
    if (horizontal)
      ctx.fillText(text, x, y);
    else {
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(text, -y, x);
      ctx.rotate(Math.PI / 2);
    }
    ctx.closePath();
    ctx.fill();
    return costume;
  }
);

SnapExtensions.primitives.set(
  'SciS_BrightnessOnImage(data,xpos,ypos,r,width,height,typeOfData)',
  function (data, xpos, ypos, r, width, height, typeOfData) {

    function imageValue(x, y) {
      if ((x > width) || (x < 1) || (y > height) || (y < 1))
        return 0;
      else
        return data.at(x + (y - 1) * width);
    }

    var value, sumOfValues = 0, points = 0, y = ypos - r, x;

    if (typeOfData == 'FITS') {
      sumOfValues = 0;
      while ((y <= ypos + r) && (y <= height)) {
        x = xpos - r;
        while ((x <= xpos + r) && (x <= width)) {
          if (r > Math.sqrt((xpos - x) * (xpos - x) + (ypos - y) * ypos - y)) {
            sumOfValues = sumOfValues + imageValue(Math.round(x), Math.round(y));
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
          if (r > Math.sqrt((xpos - x) * (xpos - x) + (ypos - y) * ypos - y)) {
            value = imageValue(Math.round(x), Math.round(y));
            sumOfValues = [sumOfValues[0] + value.at(1), sumOfValues[1] + value.at(2),
              sumOfValues[2] + value.at(3)];
            points++;
          }
          x++;
        }
        y++;
      }
    }
    return new List([new List(sumOfValues), points]);
  }
);

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
  }
);

SnapExtensions.primitives.set(
  'SciS_brightnessAround(data,xpos,ypos,r,width,height,typeOfData)',
  function (data, xpos, ypos, r, width, height, typeOfData) {

    function imageValue(x, y) {
      if ((x > width) || (x < 1) || (y > height) || (y < 1))
        return 0;
      else if (typeOfData == 'FITS')
        return data.at(x + (y - 1) * width);
      else {
        h = data.at(x + (y - 1) * width);
        return(h.at(1) + h.at(2) + h.at(3)) / 3;
      }
    }

    var xpos = Number(xpos), ypos = Number(ypos), r = Number(r), width = Number(width), height = Number(height),
      value, sumOfValues, points, x, y, h;

    sumOfValues = 0;
    points = 0;
    y = ypos - r;
    if (y < 1)
      y = 1;
    while ((y <= ypos + r) && (y <= height)) {
      x = xpos - r;
      if (x < 1)
        x = 1;
      while ((x <= xpos + r) && (x <= width)) {
        if (r > Math.sqrt((xpos - x) * (xpos - x) + (ypos - y) * ypos - y)) {
          sumOfValues = sumOfValues + imageValue(Math.round(x), Math.round(y));
          points++;
        }
        x++;
      }
      y++;
    }
    return new List([sumOfValues, points]);
  }
);

SnapExtensions.primitives.set(
  'SciS_drawListOfPoints(costume,data,shape,size,lineAttributes)',
  function (costume, data, shape, size, lineAttributes) {
    size = Number(size);
    var ctx = costume.contents.getContext('2d'),
      style = lineAttributes.at(1).trim(),
      w = Number(lineAttributes.at(2)),
      ro = Number(lineAttributes.at(3)),
      go = Number(lineAttributes.at(4)),
      bo = Number(lineAttributes.at(5)),
      r = Number(lineAttributes.at(6)),
      g = Number(lineAttributes.at(7)),
      b = Number(lineAttributes.at(8));
    if (style == 'dashed') {
      ctx.setLineDash([10, 10]);
    } else if (style == 'dash-dot') {
      ctx.setLineDash([10, 5, 2, 5]);
    } else if (style == 'dot-dot') {
      ctx.setLineDash([2, 5]);
    } else {
      ctx.setLineDash([]);
    }
    for (var i = 1; i <= data.length(); i++) {
      if (shape === "circles") {
        ctx.beginPath();
        ctx.strokeStyle = new Color(ro, go, bo).toString();
        ctx.fillStyle = new Color(r, g, b).toString();
        ctx.arc(data.at(i).at(1), data.at(i).at(2), size, 0, 6.283185307179586476925286766559);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
      if (shape === "squares") {
        ctx.beginPath();
        ctx.strokeStyle = new Color(ro, go, bo).toString();
        ctx.fillStyle = new Color(r, g, b).toString();
        ctx.fillRect(data.at(i).at(1) - size, data.at(i).at(2) - size, 2 * size, 2 * size);
        ctx.strokeRect(data.at(i).at(1) - size, data.at(i).at(2) - size, 2 * size, 2 * size);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
      }
    }
    return costume;
  }
);

SnapExtensions.primitives.set(
  'SciS_addVerticesToVertexlist(n,vlist,vAttributes)',
  function (n, vlist, vAttributes) {
    function rn(a, b) {
      return Math.round((b - a) * Math.random() + a);
    }

    n = Number(n);
    ranges = vAttributes.at(1);
    size = vAttributes.at(2);
    for (var i = 1; i <= n; i++) {
      //x,y,size,content,isMarked,colorNr,numberOfLinks
      vlist.add(new List([rn(ranges.at(1), ranges.at(2)), rn(ranges.at(3), ranges.at(4)), size, "", false, rn(1, 10), 0]));
    }
    return vlist;
  }
);

SnapExtensions.primitives.set(
  'SciS_addVerticesToAdjacencymatrix(n,amatrix)',
  function (n, amatrix) {
    n = Number(n);
    var w, row;
    if (amatrix.length() === 0)
      w = 0;
    else
      w = amatrix.at(1).length();
    for (var i = 1; i <= n; i++) {
      row = new List();
      for (var j = 1; j <= w; j++)
        row.add("X");
      amatrix.add(row);
    }
    for (var i = 1; i <= amatrix.length(); i++) {
      for (var j = 1; j <= n; j++) {
        amatrix.at(i).add("X");
      }
    }
    return amatrix;
  }
);

SnapExtensions.primitives.set(
  'SciS_addRandomEdgesToGraph(amatrix,n,lAttributes,vlist)',
  function (amatrix, n, lAttributes, vlist) {
    var v1 = 0, v2 = 0, i, length = vlist.length(), found, w, k,
      x1, y1, x2, y2, result, withWeights = lAttributes.at(6), directedEdges = lAttributes.at(5);
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
            x1 = vlist.at(v1).at(1);
            y1 = vlist.at(v1).at(2);
            x2 = vlist.at(v2).at(1);
            y2 = vlist.at(v2).at(2);
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
  }
);

SnapExtensions.primitives.set(
  'SciS_drawGraph(amatrix,vlist,cAttributes,vAttributes,lAttributes,oldCostume)',
  function (amatrix, vlist, cAttributes, vAttributes, lAttributes, oldCostume) {
    var costume = new Costume(), ctx = costume.contents.getContext('2d'), c, row, anz,
      w = Number(cAttributes.at(1)), h = Number(cAttributes.at(2)), v1, v2, x1, y1, x2, y2, n = amatrix.length(), label, textheight,
      weight, directed, marked, showWeights, xp, yp, alpha, l, dx, dy, dl, size, minsize = Number(vAttributes.at(2)), growing = vAttributes.at(3);
//create new costume or take old one
    //create new costume or take old one
    if (oldCostume === "null") {
      costume.contents.width = w;
      costume.contents.height = h;
      ctx.beginPath();
      ctx.fillStyle = new Color(cAttributes.at(3), cAttributes.at(4), cAttributes.at(5)).toString();
      ctx.strokeStyle = new Color(0, 0, 0).toString();
      ctx.fillRect(0, 0, w, h);
      ctx.strokeRect(0, 0, w, h);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      costume.rotationCenter = new Point(w / 2, h / 2);
    } else {
      costume = oldCostume;
      ctx = costume.contents.getContext('2d');
    }

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
      //else vlist.at(i).put(minsize,3); 
    }

//draw edges
    ctx.lineWidth = lAttributes.at(1);
    ctx.strokeStyle = new Color(lAttributes.at(2), lAttributes.at(3), lAttributes.at(4)).toString();
    ctx.fillStyle = new Color(lAttributes.at(2), lAttributes.at(3), lAttributes.at(4)).toString();
    directed = lAttributes.at(5);
    showWeights = lAttributes.at(7);
    v1 = 1;
    while (v1 <= n) {
      v2 = 1;
      while (v2 <= n) {
        weight = amatrix.at(v1).at(v2);
        if (weight != "X") {
          x1 = vlist.at(v1).at(1);
          y1 = vlist.at(v1).at(2);
          x2 = vlist.at(v2).at(1);
          y2 = vlist.at(v2).at(2);
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
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
              if (!vAttributes.at(4))
                l = l - size;
              else {
                if (vlist.at(v2).at(4).length === 0)
                  label = "VertexNr: " + v2;
                else
                  label = vlist.at(v2).at(4);
                textheight = Number(2 * vAttributes.at(2)) + 3 * Number(vlist.at(v2).at(7));
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
                  ctx.moveTo(x2, y2);
                  ctx.lineTo(x1 + (l - 10) * Math.cos(alpha) + dx, y1 + (l - 10) * Math.sin(alpha) - dy);
                  ctx.lineTo(x1 + (l - 10) * Math.cos(alpha) - dx, y1 + (l - 10) * Math.sin(alpha) + dy);
                } else {//right-up
                  x2 = x1 + l * Math.cos(alpha);
                  y2 = y1 - l * Math.sin(alpha);
                  ctx.moveTo(x2, y2);
                  ctx.lineTo(x1 + (l - 10) * Math.cos(alpha) - dx, y1 - (l - 10) * Math.sin(alpha) - dy);
                  ctx.lineTo(x1 + (l - 10) * Math.cos(alpha) + dx, y1 - (l - 10) * Math.sin(alpha) + dy);
                }
              else if (yp >= 0) {//left-down
                x2 = x1 - l * Math.cos(alpha);
                y2 = y1 + l * Math.sin(alpha);
                ctx.moveTo(x2, y2);
                ctx.lineTo(x1 - (l - 10) * Math.cos(alpha) + dx, y1 + (l - 10) * Math.sin(alpha) + dy);
                ctx.lineTo(x1 - (l - 10) * Math.cos(alpha) - dx, y1 + (l - 10) * Math.sin(alpha) - dy);
              } else {//left-up
                x2 = x1 - l * Math.cos(alpha);
                y2 = y1 - l * Math.sin(alpha);
                ctx.moveTo(x2, y2);
                ctx.lineTo(x1 - (l - 10) * Math.cos(alpha) + dx, y1 - (l - 10) * Math.sin(alpha) - dy);
                ctx.lineTo(x1 - (l - 10) * Math.cos(alpha) - dx, y1 - (l - 10) * Math.sin(alpha) + dy);
              }
              ctx.lineTo(x2, y2);
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
            ctx.fillText("" + weight, (x1 + x2) / 2, (y1 + y2) / 2 - 2);
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
      if (!vAttributes.at(4)) {
        if (marked) {
          ctx.beginPath();
          ctx.fillStyle = new Color(255, 0, 0).toString();
          ctx.strokeStyle = new Color(255, 0, 0).toString();
          ctx.arc(vlist.at(i).at(1), vlist.at(i).at(2), vlist.at(i).at(3) + 3, 0, 6.283185307179586476925286766559);
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
        ctx.arc(vlist.at(i).at(1), vlist.at(i).at(2), vlist.at(i).at(3), 0, 6.283185307179586476925286766559);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else {
        if (vlist.at(i).at(4).length === 0)
          label = "#" + i;
        else
          label = vlist.at(i).at(4);
        ctx.beginPath();
        if (vAttributes.at(3))
          textheight = Number(2 * vAttributes.at(2)) + 3 * Number(vlist.at(i).at(7));
        else
          textheight = Number(2 * vAttributes.at(2));
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
        ctx.fillRect(x1, y1, w, h);
        ctx.strokeRect(x1 + 1, y1 + 1, w - 3, h - 2);
        if (marked)
          ctx.fillStyle = new Color(255, 0, 0).toString();
        else
          ctx.fillStyle = new Color(0, 0, 0).toString();
        ctx.textAlign = "center";
        ctx.textBaseline = "center";
        ctx.fillText(label, x1 + w / 2, y1 + h - 7);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
    }
    return costume;
  }
);

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

SnapExtensions.primitives.set(
  'SciS_vertexnumberAtGraph(vlist,cAttributes,vAttributes,x,y)',
  function (vlist, cAttributes, vAttributes, x, y) {
    var costumeWidth, costumeHeight, vertexWidth, vertexHeight, showContent,
      xpos, ypos, size, xVertex, yVertex, i, label, textheight, w, h, ctx, help;
    help = new Costume();
    help.contents.width = 10;
    help.contents.height = 10;//only for text-measurement
    ctx = help.contents.getContext('2d');
    costumeWidth = Number(cAttributes.at(1));
    costumeHeight = Number(cAttributes.at(2));
    xPos = Math.round(costumeWidth / 2 + Number(x));
    yPos = Math.round(costumeHeight / 2 - Number(y));
    showContent = vAttributes.at(4);
    i = 1;
    while (i <= vlist.length()) {
      xVertex = vlist.at(i).at(1);
      yVertex = vlist.at(i).at(2);
      size = vlist.at(i).at(3);
      if (showContent) {
        if (vlist.at(i).at(4).length === 0)
          label = "VertexNr: " + i;
        else
          label = vlist.at(i).at(4);
        textheight = Number(2 * vAttributes.at(2)) + 3 * Number(vlist.at(i).at(7));
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
  }
);

SnapExtensions.primitives.set(
  'SciS_createDuplicate(sprite,spriteName)',
  function (sprite, spriteName) {
    var stage = this.parentThatIsA(StageMorph),
      ide = stage.parentThatIsA(IDE_Morph),
      world = stage.parentThatIsA(WorldMorph),
      duplicate = sprite.fullCopy();
    duplicate.isDown = false;
    duplicate.setPosition(world.hand.position());
    duplicate.appearIn(ide);
    duplicate.keepWithin(stage);
    duplicate.isDown = sprite.isDown;
    duplicate.name = spriteName;
    ide.selectSprite(duplicate);
    ide.recordUnsavedChanges();
    ide.createCorral();
    ide.fixLayout();
  }
);

SnapExtensions.primitives.set(
  'SciS_createPermanentClone(sprite,spriteName)',
  function (sprite, spriteName) {
    var stage = this.parentThatIsA(StageMorph),
      ide = stage.parentThatIsA(IDE_Morph),
      world = stage.parentThatIsA(WorldMorph),
      clone = sprite.fullCopy(true),
      hats = clone.allHatBlocksFor('__clone__init__');
    clone.isDown = false;
    clone.appearIn(ide);
    if (hats.length)
      clone.initClone(hats);
    else {
      clone.setPosition(world.hand.position());
      clone.keepWithin(stage);
    }
    clone.isDown = sprite.isDown;
    clone.name = spriteName;
    ide.selectSprite(clone);
    ide.recordUnsavedChanges();
    ide.createCorral();
    ide.fixLayout();
  }
);

SnapExtensions.primitives.set(
  'SciS_importSprite1()',
  function (txt) {
    var inp = document.createElement('input'),
      ide = this.parent.parent, result = 0, done = false;

    function userImport() {

      function txtOnlyMsg(ftype, anyway) {
        ide.confirm(
          localize(
            'Snap! can only import "text" files.\n' +
            'You selected a file of type "' +
            ftype +
            '".'
            ) + '\n\n' + localize('Open anyway?'),
          'Unable to import',
          anyway // callback
          );
      }

      function readText(aFile) {
        var frd = new FileReader(),
          ext = aFile.name.split('.').pop().toLowerCase();

        function isTextFile(aFile) {
          // special cases for Windows
          // check the file extension for text-like-ness
          return aFile.type.indexOf('text') !== -1 ||
            contains(['txt', 'csv', 'xml', 'json', 'tsv'], ext);
        }

        function isType(aFile, string) {
          return aFile.type.indexOf(string) !== -1 || (ext === string);
        }

        frd.onloadend = function (e) {
          done = true;
          if (isType(aFile, 'csv')) {
            result = Process.prototype.parseCSV(e.target.result);
          } else if (isType(aFile, 'json')) {
            result = Process.prototype.parseJSON(e.target.result);
          } else {
            result = e.target.result;
          }
        };

        if (isTextFile(aFile)) {
          frd.readAsText(aFile);
        } else {
          txtOnlyMsg(
            aFile.type,
            function () {
              frd.readAsText(aFile);
            }
          );
        }
      }

      document.body.removeChild(inp);
      ide.filePicker = null;
      if (inp.files.length > 0) {
        readText(inp.files[inp.files.length - 1]);
      }
    }

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
    inp.addEventListener(
      "change",
      userImport,
      false
      );
    document.body.appendChild(inp);
    ide.filePicker = inp;
    inp.click();
    return function () {
      return new List([done, result]);
    };
  }
);

SnapExtensions.primitives.set(
  'SciS_importSprite2(data)',
  function (data) {
    var stage = this.parentThatIsA(StageMorph),
      ide = stage.parentThatIsA(IDE_Morph),
      world = stage.parentThatIsA(WorldMorph),
      thisObj = this,
      cats = SpriteMorph.prototype.categories,
      colors = SpriteMorph.prototype.blockColor,
      i = 0, index = -1;
    ide.openSpritesString(data);
  }
);

SnapExtensions.primitives.set(
  'SciS_changeSpritenameTo(newName)',
  function (newName) {
    var stage = this.parentThatIsA(StageMorph),
      ide = stage.parentThatIsA(IDE_Morph),
      world = stage.parentThatIsA(WorldMorph),
      thisObj = this;
    ide.spriteBar.nameField.setContents(newName);
    ide.spriteBar.nameField.fixLayout();
    ide.createCorral();
    ide.fixLayout();
  }
);

SnapExtensions.primitives.set(
  'SciS_importLibrary1(catName)',
  function (catName) {
    var cats = SpriteMorph.prototype.categories, i = 0, index = -1;
    i = 0;  //is category visible?
    while ((i < cats.length) && (index < 0)) {
      if (cats[i].toLowerCase() === catName)
        index = i;
      i += 1;
    }
    if (index === -1)
      return false;
    else
      return true;
  }
);

SnapExtensions.primitives.set(
  'SciS_importLibrary2(src)',
  function (src) {
    var stage = this.parentThatIsA(StageMorph),
      ide = stage.parentThatIsA(IDE_Morph),
      world = stage.parentThatIsA(WorldMorph);
    ide.openBlocksString(src);
  }
);

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
  'SciS_NNshowStatus(cAttributes,nAttributes,weights,outputs,costume,sprite)',
  function (cAttributes, nAttributes, weights, outputs, costume, sprite) {
    var newCostume, ctx, costumeWidth, costumeHeight, netWidth, netHeight, layerWidth, depth, dx, dy, x, y, x1, y1, colorcode,
      leftOffset = cAttributes.at(6), upperOffset = cAttributes.at(7);

    netWidth = Number(nAttributes.at(3));
    netHeight = Number(nAttributes.at(4));
    layerWidth = Number(nAttributes.at(2));
    depth = Number(nAttributes.at(1));
    r = Number(cAttributes.at(3));
    g = Number(cAttributes.at(4));
    b = Number(cAttributes.at(5));

    if (sprite === "theStage") {
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
      costumeWidth = Number(cAttributes.at(1));
      costumeHeight = Number(cAttributes.at(2));
      newCostume = new Costume();
      newCostume.contents.width = costumeWidth;
      newCostume.contents.height = costumeHeight;
      ctx = newCostume.contents.getContext('2d');
      ctx.beginPath();
      ctx.fillStyle = new Color(r, g, b).toString();
      ctx.strokeStyle = new Color(0, 0, 0).toString();
      ctx.fillRect(0, 0, costumeWidth, costumeHeight);
      ctx.strokeRect(leftOffset, upperOffset, netWidth, netHeight);
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
        if (layer == depth)
          y = 3;
        else
          y = netHeight - layer * dy;
        for (var n = 1; n <= layerWidth; n++) {
          ctx.beginPath();
          x1 = 10 + (n - 1) * dx;
          if (layer == 1)
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
    if (sprite === "theStage")
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

SnapExtensions.primitives.set(
  'SciS_createNewSprite()',
  function () {
    this.parent.parent.addNewSprite();
  }
);

SnapExtensions.primitives.set(
  'SciS_removeThisSprite()',
  function () {
    this.parent.parent.removeSprite(this);
  }
);

SnapExtensions.primitives.set(
  'SciS_expandReinforcementTable(rifTable,pixel,xLeft,xRight,yUpper,yLower,value)',
  function (rifTable, pixel, xLeft, xRight, yUpper, yLower, value) {
    var red, green, blue, newColor;
    if (xLeft < 1) {
      xLeft = 1;
    }
    if (xRight > 40) {
      xRight = 40;
    }
    if (yUpper < 1) {
      yUpper = 1;
    }
    if (yLower > 30) {
      yLower = 30;
    }
    for (var y = yUpper; y <= yLower; y++) {
      for (var x = xLeft; x <= xRight; x++) {
        red = 0;
        green = 0;
        blue = 0;
        for (var dx = -3; dx <= 3; dx++) {
          for (var dy = -3; dy <= 3; dy++) {
            newColor = pixel.at(401 * (10 * y - 5 + dy - 1) + 10 * x - 5 + dx);
            red = red + newColor.at(1);
            green = green + newColor.at(2);
            blue = blue + newColor.at(3);
          }
        }
        red = red / 49;
        green = green / 49;
        blue = blue / 49;
        if (!((red > 80) && (red < 110) && (green > 200) && (blue < 30))) {
          rifTable.at(y).put(value, x);
        }
      }
    }
    return rifTable;
  }
);

SnapExtensions.primitives.set(
  'SciS_brightness(data,xpos,ypos,r,width,height,typeOfData)',
  function (data, xpos, ypos, r, width, height, typeOfData) {

    function imageValue(x, y) {
      if ((x > width) || (x < 1) || (y > height) || (y < 1))
        return 0;
      else
        return data.at(x + (y - 1) * width);
    }

    var value, sumOfValues = 0, points = 0, y = ypos - r, x;

    if (typeOfData == 'FITS') {
      sumOfValues = 0;
      while ((y <= ypos + r) && (y <= height)) {
        x = xpos - r;
        while ((x <= xpos + r) && (x <= width)) {
          if (r > Math.sqrt((xpos - x) * (xpos - x) + (ypos - y) * ypos - y)) {
            sumOfValues = sumOfValues + imageValue(Math.round(x), Math.round(y));
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
          if (r > Math.sqrt((xpos - x) * (xpos - x) + (ypos - y) * ypos - y)) {
            value = imageValue(Math.round(x), Math.round(y));
            sumOfValues = [sumOfValues[0] + value.at(1), sumOfValues[1] + value.at(2),
              sumOfValues[2] + value.at(3)];
            points++;
          }
          x++;
        }
        y++;
      }
    }
    return new List([new List(sumOfValues), points]);
  }
);

SnapExtensions.primitives.set(
  'SciS_isVector(data)',
  function (data) {
    var result = true;
    i = 1;
    while (result && (i <= data.length()))
    {
      row = data.at(i);
      if (!(row instanceof List))
        result = false;
      else if (row.length() != 1)
        result = false;
      else if (Number.isNaN(row.at(1)))
        result = false;
      i++;
    }
    return result;
  }
);

SnapExtensions.primitives.set(
  'SciS_isMatrix(data)',
  function (data) {
    var result = true, row, i, j, width;
    i = 1;
    while (result && (i <= data.length()))
    {
      row = data.at(i);
      if (!(row instanceof List))
        result = false;
      else
      {
        if (i == 1)
          width = row.length();
        if (width < 1)
          result = false;
        if (row.length() != width)
          result = false;
        else
        {
          j = 1;
          while (result && (j <= row.length()))
          {
            if (Number.isNaN(row.at(j)))
              result = false;
            j++;
          }
        }
      }
      i++;
    }
    return result;
  }
);

SnapExtensions.primitives.set(
  'SciS_isTable(data)',
  function (data) {
    var result = true, row, i, width;
    i = 1;
    while (result && (i <= data.length()))
    {
      row = data.at(i);
      if (!(row instanceof List))
        result = false;
      else
      {
        if (i == 1)
          width = row.length();
        if (row.length() != width)
          result = false;
      }
      i++;
    }
    return result;
  }
);

SnapExtensions.primitives.set(
  'SciS_FFTops(data,freq,choice)',
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
        result[i] = ["complexNumberCartesianStyle", result[i][0], result[i][1]];
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

  }
);

SnapExtensions.primitives.set(
  'SciS_addGridToImagePad(costume,gridProperties,colors,withLines,data)',
  function (costume, gridProperties, colors, withLines, data) {
    var ctx = costume.contents.getContext('2d'),
      xMax = Number(gridProperties.at(1)),
      yMax = Number(gridProperties.at(2)),
      cellWidth = Number(gridProperties.at(3)),
      cellHeight = Number(gridProperties.at(4)),
      maxColors = colors.length(),
      d;
    ctx.lineWidth = 1;
    ctx.strokeStyle = new Color(0, 0, 0).toString();
    for (var x = 1; x <= xMax; x++) {
      for (var y = 1; y <= yMax; y++) {
        ctx.beginPath();
        d = data.at(y).at(x);
        if (d > maxColors)
          d = maxColors;
        if (d < 1)
          d = 1;
        ctx.fillStyle = new Color(colors.at(d).at(1), colors.at(d).at(2), colors.at(d).at(3)).toString();
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
  'SciS_fillOnImagePadGridRandomlyOnImagePad(xMin,xMax,yMin,yMax,numbers,data)',
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
  'SciS_neighborhoodInGridOnImagePad(data,gridProperties,x,y,isTorus,typeOfNeighborhood)',
  function (data, gridProperties, x, y, isTorus, typeOfNeighborhood) {
    var xMax = Number(gridProperties.at(1)),
      yMax = Number(gridProperties.at(2)),
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
  'SciS_swapCellsOfGridOnImagePad(data,gridProperties,n,isTorus,range,xMin,xMax,yMin,yMax)',
  function (data, gridProperties, n, isTorus, range, xMin, xMax, yMin, yMax) {
    var result, rnd;

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
  'SciS_changeSurroundingValuesOfGridOnImagePag(data,gridProperties,ifValue,elseValue,surrValue,op,n,isTorus,withNoise,noise,xMin,xMax,yMin,yMax,oldValue)',
  function (data, gridProperties, ifValue, elseValue, surrValue, op, n, isTorus, withNoise, noise, xMin, xMax, yMin, yMax, oldValue) {
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
  'SciS_replaceValuesOfGridOnImagePad(data,gridProperties,operation,isTorus,xMin,xMax,yMin,yMax,range)',
  function (data, gridProperties, operation, isTorus, xMin, xMax, yMin, yMax,range) {
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
  'SciS_combineGridsOnImagePad(grid1,grid2,value1,operator,value2,ifValue,elseValue,xMax,yMax)',
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
  'SciS_applyWolframAutomatonToAgridOnImagePad(no,grid,color0,color1)',
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
 SnapExtensions.primitives.set(
 'SciS_empty(txt)',
 function (txt) {
 
 }
 );
 
 */





















