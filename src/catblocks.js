var EarsMorph;

// EarsMorph ////////////////////////////////////////////////////////////////

// I am a cute cat face for HatBlockMorphs

// EarsMorph inherits from Morph:

EarsMorph.prototype = new Morph();
EarsMorph.prototype.constructor = EarsMorph;
EarsMorph.uber = Morph.prototype;

function EarsMorph() {}
EarsMorph.prototype.init = function () {
  EarsMorph.uber.init.call(this);
};

// HatBlockMorph Cat Skin (2025)
BlockMorph.prototype.addEars = function () {
    if(!this.constructor.name.includes("HatBlockMorph")) {
        return
    }
  var ears = new EarsMorph();
  ears.setExtent(new Point(this.hatWidth, 25 * this.scale));
  ears.setPosition(
    this.topLeft().add(new Point(0.5, -6).multiplyBy(this.scale))
  );
  ears.setColor(this.color);
  this.ears = ears;
  this.addBack(ears);
};

BlockMorph.prototype.init = function (...params) {
  SyntaxElementMorph.uber.init.call(this, ...params);
  this.addEars()
};

SyntaxElementMorph.prototype.parts = function () {
  // answer my non-control submorphs
  var nb = null;
  if (this.nextBlock) {
    // if I am a CommandBlock or a HatBlock
    nb = this.nextBlock();
  }
  return this.children.filter(
    (child) =>
      child !== nb &&
      !(child instanceof ShadowMorph) &&
      !(child instanceof BlockHighlightMorph) &&
      child !== this?.ears
  );
};

HatBlockMorph.prototype.isCatBlocks = IDE_Morph.prototype.getSetting('skin') === 'cat';
EarsMorph.prototype.render = function (ctx) {
  if(!HatBlockMorph.prototype.isCatBlocks) {
    return;
  }
  // console.log(this) // nope! you can always inspect things in dev mode!
  var w = this.parent.hatWidth,
    h = this.parent.hatHeight,
    c = this.parent.corner,
    prototypeHat = this.parent instanceof PrototypeHatBlockMorph;
  ctx.fillStyle = this.parent.color;
  if (HatBlockMorph.prototype.isCatBlocks) {
    let xOffset = 2,
      yOffset = -6 + this.parent.flatEdge;
    if (prototypeHat) {
      // If I am a block definition hat
      yOffset += 10;
      xOffset = 4;
    }
    const baseW = 80;
    const baseH = 25;
    function sx(ox) {
      return c + w * ((ox + xOffset) / baseW);
    }
    function sy(oy) {
      return c + h * ((oy + yOffset) / (baseH / 1.3));
    }
    function zx(ox) {
      return c + w * (ox / baseW);
    }
    function zy(oy) {
      return c + h * (oy / baseH);
    }

    // Be warned, I converted the SVG path code directly because I didn't want to accidentally break something, so the values look really weird
    function drawLeftEarShape(inset) {
      xOffset = 0;
      ctx.beginPath();
      ctx.moveTo(sx(0.829) + inset, sy(23.267) - inset);
      ctx.bezierCurveTo(
        sx(-0.08) + inset,
        sy(11.905) - inset,
        sx(5.647) + inset,
        sy(2.089) - inset,
        sx(8.464) + inset,
        sy(0.725) - inset
      );
      ctx.bezierCurveTo(
        sx(11.827) + inset,
        sy(-0.911) - inset,
        sx(23.462) + inset,
        sy(12.632) - inset,
        sx(25.189) + inset,
        sy(14.723) - inset
      );
      ctx.bezierCurveTo(
        sx(25.23) + inset,
        sy(14.717) - inset,
        sx(0.945) + inset,
        sy(23.343) - inset,
        sx(0.945) + inset,
        sy(23.343) - inset
      );
      ctx.bezierCurveTo(
        sx(0.945) + inset,
        sy(23.343) - inset,
        sx(0.754) + inset,
        sy(23.314) - inset,
        sx(0.829) + inset,
        sy(23.267) - inset
      );
    }

    function drawRightEarShape(inset) {
      xOffset = 70;
      if (prototypeHat) xOffset = 72;
      ctx.moveTo(sx(-0.829) + inset, sy(23.267) - inset);
      ctx.bezierCurveTo(
        sx(0.08) + inset,
        sy(11.905) - inset,
        sx(-5.647) + inset,
        sy(2.089) - inset,
        sx(-8.464) + inset,
        sy(0.725) - inset
      );
      ctx.bezierCurveTo(
        sx(-11.827) + inset,
        sy(-0.911) - inset,
        sx(-23.462) + inset,
        sy(12.632) - inset,
        sx(-25.189) + inset,
        sy(14.723) - inset
      );
      ctx.bezierCurveTo(
        sx(-25.23) + inset,
        sy(14.717) - inset,
        sx(-0.945) + inset,
        sy(23.343) - inset,
        sx(-0.945) + inset,
        sy(23.343) - inset
      );
      ctx.bezierCurveTo(
        sx(-0.945) + inset,
        sy(23.343) - inset,
        sx(-0.754) + inset,
        sy(23.314) - inset,
        sx(-0.829) + inset,
        sy(23.267) - inset
      );
    }

    // Cat face
    function drawCatEyes() {
      xOffset = 23;
      yOffset = 20;
      if(prototypeHat) {
        yOffset += 5;
      }
      ctx.beginPath();
      ctx.arc(sx(-2), sy(-2), zy(-1.5), 0, Math.PI * 2);
      ctx.arc(sx(25), sy(-2), zy(-1.5), 0, Math.PI * 2);
    }

    function drawCatMouth() {
      xOffset -= 1;
      yOffset -= 4;
      ctx.beginPath();
      ctx.moveTo(sx(45.6), sy(0.1));
      ctx.bezierCurveTo(
        sx(44.7),
        sy(0.1),
        sx(43.9),
        sy(-0.2),
        sx(43.3),
        sy(-0.8)
      );
      ctx.bezierCurveTo(sx(42.7), sy(-0.2), sx(42), sy(0.1), sx(41.1), sy(0.1));
      ctx.bezierCurveTo(
        sx(40.2),
        sy(0.1),
        sx(39.3),
        sy(-0.2),
        sx(38.8),
        sy(-0.8)
      );
      ctx.bezierCurveTo(
        sx(37.8),
        sy(-1.9),
        sx(37.7),
        sy(-3.4),
        sx(37.7),
        sy(-3.6)
      );
      ctx.bezierCurveTo(
        sx(37.7),
        sy(-4.1),
        sx(38.2),
        sy(-4.6),
        sx(38.7),
        sy(-4.6)
      );
      ctx.bezierCurveTo(
        sx(39.3),
        sy(-4.6),
        sx(39.7),
        sy(-4.1),
        sx(39.7),
        sy(-3.6)
      );
      ctx.bezierCurveTo(
        sx(39.7),
        sy(-3.2),
        sx(39.8),
        sy(-1.9),
        sx(41.1),
        sy(-1.9)
      );
      ctx.bezierCurveTo(
        sx(41.6),
        sy(-1.9),
        sx(41.8),
        sy(-2.1),
        sx(41.9),
        sy(-2.2)
      );
      ctx.bezierCurveTo(
        sx(42.2),
        sy(-2.5),
        sx(42.3),
        sy(-3.2),
        sx(42.3),
        sy(-3.5)
      );
      ctx.bezierCurveTo(
        sx(42.3),
        sy(-3.6),
        sx(42.3),
        sy(-3.6),
        sx(42.3),
        sy(-3.8)
      );
      ctx.bezierCurveTo(
        sx(42.3),
        sy(-4.3),
        sx(42.8),
        sy(-4.8),
        sx(43.3),
        sy(-4.8)
      );
      ctx.bezierCurveTo(
        sx(44.2),
        sy(-4.8),
        sx(45.1),
        sy(-4.4),
        sx(45.1),
        sy(-3.8)
      );
      ctx.bezierCurveTo(
        sx(45.1),
        sy(-3.8),
        sx(45.1),
        sy(-3.7),
        sx(45.1),
        sy(-3.6)
      );
      ctx.bezierCurveTo(
        sx(45.1),
        sy(-3.3),
        sx(45.2),
        sy(-2.7),
        sx(45.5),
        sy(-2.4)
      );
      ctx.bezierCurveTo(sx(44.8), sy(-2.2), sx(45), sy(-2), sx(45.5), sy(-2));
      ctx.bezierCurveTo(sx(46), sy(-2), sx(46.2), sy(-2.2), sx(46.3), sy(-2.3));
      ctx.bezierCurveTo(
        sx(46.6),
        sy(-2.7),
        sx(46.7),
        sy(-3.4),
        sx(46.6),
        sy(-3.6)
      );
      ctx.bezierCurveTo(
        sx(46.6),
        sy(-4.1),
        sx(47),
        sy(-4.6),
        sx(47.5),
        sy(-4.7)
      );
      ctx.bezierCurveTo(
        sx(48),
        sy(-4.7),
        sx(48.5),
        sy(-4.3),
        sx(48.6),
        sy(-3.8)
      );
      ctx.bezierCurveTo(
        sx(48.6),
        sy(-3.6),
        sx(48.7),
        sy(-2),
        sx(47.8),
        sy(-0.9)
      );
      ctx.bezierCurveTo(
        sx(47.5),
        sy(-0.4),
        sx(46.8),
        sy(0.1),
        sx(45.6),
        sy(0.1)
      );
    }
    // They are in different functions because the offset breaks them if they aren't
    ctx.fillStyle = this.parent.cachedClrDark;
    ctx.beginPath();
    drawLeftEarShape(this.parent.flatEdge);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    drawRightEarShape(this.parent.flatEdge);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = this.parent.cachedClr;

    ctx.beginPath();
    drawLeftEarShape(0);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    drawRightEarShape(0);
    ctx.closePath();
    ctx.fill();

    // Left ear pink part
    xOffset = 2;
    yOffset -= 1;
    if (this.parent.constructor.name == "PrototypeHatBlockMorph" || this.parent instanceof PrototypeHatBlockMorph) {
      
      xOffset = 4;
    }
    ctx.beginPath();
    ctx.moveTo(sx(14.069), sy(13.084));
    ctx.bezierCurveTo(
      sx(12.369),
      sy(8.884),
      sx(9.569),
      sy(3.984),
      sx(8.269),
      sy(4.584)
    );
    ctx.bezierCurveTo(
      sx(6.669),
      sy(5.384),
      sx(2.869),
      sy(12.484),
      sx(3.269),
      sy(19.984)
    );
    ctx.bezierCurveTo(
      sx(3.269),
      sy(20.584),
      sx(3.969),
      sy(20.684),
      sx(4.369),
      sy(20.484)
    );
    ctx.bezierCurveTo(
      sx(7.369),
      sy(18.884),
      sx(10.769),
      sy(17.684),
      sx(12.969),
      sy(16.884)
    );
    ctx.bezierCurveTo(
      sx(14.469),
      sy(16.384),
      sx(14.869),
      sy(14.984),
      sx(14.069),
      sy(13.084)
    );
    ctx.closePath();
    ctx.fillStyle = "#FFD5E6";
    ctx.fill();

    // right ear pink part

    xOffset = 69;
    ctx.beginPath();
    ctx.moveTo(sx(-14.069), sy(13.084));
    ctx.bezierCurveTo(
      sx(-12.369),
      sy(8.884),
      sx(-9.569),
      sy(3.984),
      sx(-8.269),
      sy(4.584)
    );
    ctx.bezierCurveTo(
      sx(-6.669),
      sy(5.384),
      sx(-2.869),
      sy(12.484),
      sx(-3.269),
      sy(19.984)
    );
    ctx.bezierCurveTo(
      sx(-3.269),
      sy(20.584),
      sx(-3.969),
      sy(20.684),
      sx(-4.369),
      sy(20.484)
    );
    ctx.bezierCurveTo(
      sx(-7.369),
      sy(18.884),
      sx(-10.769),
      sy(17.684),
      sx(-12.969),
      sy(16.884)
    );
    ctx.bezierCurveTo(
      sx(-14.469),
      sy(16.384),
      sx(-14.869),
      sy(14.984),
      sx(-14.069),
      sy(13.084)
    );
    ctx.closePath();
    ctx.fillStyle = "#FFD5E6";
    ctx.fill();

    ctx.fillStyle = "rgba(0,0,0,0.6)";
    drawCatEyes();
    ctx.closePath();
    ctx.fill();

    xOffset = -6;
    yOffset = 25;
    drawCatMouth();
    ctx.closePath();
    ctx.fill();
  }
};

IDE_Morph.prototype.looksMenu = function () {
    var menu = this.looksMenuData();
    menu.addPreference(
        'Cat Blocks',
        () => {
             HatBlockMorph.prototype.xmasSkin =
                !HatBlockMorph.prototype.xmasSkin;
            this.world().changed();
            if(!HatBlockMorph.prototype.isCatBlocks) {
              this.saveSetting('skin', 'cat');
              HatBlockMorph.prototype.isCatBlocks = true;
            } else {
              this.removeSetting('skin');
              HatBlockMorph.prototype.isCatBlocks = false;
            }
            this.refreshIDE()
        },
        HatBlockMorph.prototype.isCatBlocks,
        'uncheck for default\nhat block skin',
        'check for cute\n cat hat block skin',
        false
    );
    menu.popup(
        this.world(),
        this.controlBar.settingsButton.bottomLeft()
    );
};
