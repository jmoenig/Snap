// Morph additions

Morph.fromImageURL = function(url) {
    var m = new Morph();

    m.texture = url;

    m.drawNew = function() {
        this.image = newCanvas(this.extent());
        var context = this.image.getContext('2d');
        context.fillStyle = 'rgba(0,0,0,0)';
        context.fillRect(0, 0, this.width(), this.height());
        if (this.texture) {
            this.drawTexture(this.texture);
        }
    }

    m.drawCachedTexture = function () {
        var context = this.image.getContext('2d');
        context.drawImage(
                this.cachedTexture,
                0,
                Math.round((this.height() - this.cachedTexture.height) / 2)
                );
        this.changed();
    };

    m.drawNew();

    m.setExtent(new Point(m.cachedTexture.width, m.cachedTexture.height));

    return m;
};

// MenuMorph additions

MenuMorph.prototype.addHoverItem = function(labelString, action) {
    this.items.push(new MenuHoverItemMorph(localize(labelString || 'close'), action, this));
};

MenuMorph.prototype.drawNew = function () {
    var myself = this,
        item,
        fb,
        x,
        y,
        isLine = false;

    this.children.forEach(function (m) {
        m.destroy();
    });
    this.children = [];
    if (!this.isListContents) {
        this.edge = MorphicPreferences.isFlat ? 0 : 5;
        this.border = MorphicPreferences.isFlat ? 1 : 2;
    }
    this.color = new Color(255, 255, 255);
    this.borderColor = new Color(60, 60, 60);
    this.silentSetExtent(new Point(0, 0));

    y = 2;
    x = this.left() + 4;
    if (!this.isListContents) {
        if (this.title) {
            this.createLabel();
            this.label.setPosition(this.bounds.origin.add(4));
            this.add(this.label);
            y = this.label.bottom();
        } else {
            y = this.top() + 4;
        }
    }
    y += 1;
    this.items.forEach(function (tuple) {
        isLine = false;
        if (tuple instanceof StringFieldMorph ||
                tuple instanceof ColorPickerMorph ||
                tuple instanceof SliderMorph ||
                tuple instanceof MenuHoverItemMorph) { // added
            item = tuple;
        } else if (tuple[0] === 0) {
            isLine = true;
            item = new Morph();
            item.color = myself.borderColor;
            item.setHeight(tuple[1]);
        } else {
            item = new MenuItemMorph(
                myself.target,
                tuple[1],
                tuple[0],
                myself.fontSize || MorphicPreferences.menuFontSize,
                MorphicPreferences.menuFontName,
                myself.environment,
                tuple[2], // bubble help hint
                tuple[3], // color
                tuple[4], // bold
                tuple[5], // italic
                tuple[6] // doubleclick action
            );
        }
        if (isLine) {
            y += 1;
        }
        item.setPosition(new Point(x, y));
        myself.add(item);
        y = y + item.height();
        if (isLine) {
            y += 1;
        }
    });

    fb = this.fullBounds();
    this.silentSetExtent(fb.extent().add(4));
    this.adjustWidths();
    MenuMorph.uber.drawNew.call(this);
};

var MenuHoverItemMorph;
MenuHoverItemMorph.prototype = new MenuItemMorph();
MenuHoverItemMorph.prototype.constructor = MenuHoverItemMorph;
MenuHoverItemMorph.uber = MenuItemMorph.prototype;

function MenuHoverItemMorph(labelString, submenu, parentMenu) {
    var myself = this;
    
    this.submenu = submenu;
    this.parentMenu = parentMenu;

    this.init(
        parentMenu.target,
        myself.revealSubmenu,
        labelString,
        parentMenu.fontSize,
        MorphicPreferences.menuFontName,
        parentMenu.environment,
        null,
        null,
        false,
        false,
        null
    );
};

MenuHoverItemMorph.prototype.revealSubmenu = function() {
    var myself = this;

    this.image = this.highlightImage;
    this.submenu.drawNew();
    this.submenu.setPosition(this.topRight());
    this.submenu.addShadow(new Point(2, 2), 80);
    this.submenu.keepWithin(world);
    if (this.submenu.items.length < 1 && !this.submenu.title) { // don't show empty menus
        return;
    }
    world.add(this.submenu);
    world.activeMenu = this.submenu;
    this.submenu.world = world; // optionally enable keyboard support
    this.submenu.fullChanged();
    this.changed();
    
    this.submenu.mouseLeave = function() {
        this.destroy();
        if (!myself.boundingBox().containsPoint(world.hand.position())) {
            myself.image = myself.normalImage;
            myself.changed();
        }
        world.activeMenu = myself.parentMenu;
    }
};

MenuHoverItemMorph.prototype.mouseEnter = MenuHoverItemMorph.prototype.revealSubmenu;
MenuHoverItemMorph.prototype.mouseClickLeft = MenuHoverItemMorph.prototype.revealSubmenu;

MenuHoverItemMorph.prototype.mouseLeave = function() {
    if (!this.submenu.boundingBox().containsPoint(world.hand.position())) {
        this.submenu.destroy();
        this.image = this.normalImage;
        this.changed();
        world.activeMenu = this.parentMenu;
    }
};

// World additions

WorldMorph.prototype.flushKeyboardState = function() {
    this.currentKey = null; 
};

WorldMorph.prototype.originalInit = WorldMorph.prototype.init;
WorldMorph.prototype.init = function(aCanvas, fillPage) {
    var myself = this;

    this.originalInit(aCanvas, fillPage);

    aCanvas.onblur = function() { myself.flushKeyboardState};
    aCanvas.onmouseout = function() { myself.flushKeyboardState };
};

WorldMorph.prototype.originalSlide = WorldMorph.prototype.slide;
WorldMorph.prototype.slide = function(aStringOrTextMorph) {
    if (!aStringOrTextMorph.parentThatIsA(InputSlotMorph)) { return };
    this.originalSlide(aStringOrTextMorph)
};

// Tutorial additions

var TriangleBoxMorph;

TriangleBoxMorph.prototype = new Morph();
TriangleBoxMorph.prototype.constructor = TriangleBoxMorph;
TriangleBoxMorph.uber = Morph.prototype;

function TriangleBoxMorph(orientation) {
    this.init(orientation);
};

TriangleBoxMorph.prototype.init = function (orientation) {
    TriangleBoxMorph.uber.init.call(this);
    this.orientation = orientation ? orientation : 'left';
    this.setExtent(new Point(20, 28));
};

TriangleBoxMorph.prototype.drawNew = function () {
    var context,
    ext,
    myself = this;

    this.image = newCanvas(this.extent());
    context = this.image.getContext('2d');

    context.fillStyle = myself.color.toString();
    context.beginPath();

    if (this.orientation == 'left') {
        context.moveTo(0,  14);
        context.lineTo(20, 0);
        context.lineTo(20, 28);	
    } else if (this.orientation == 'right') {
        context.moveTo(0,  0);
        context.lineTo(20, 14);
        context.lineTo(0,  28);	
    } else if (this.orientation == 'bottom') {
        context.moveTo(0,  0);
        context.lineTo(10, 28);
        context.lineTo(20,  0);	
    } else if (this.orientation == 'top') {
        context.moveTo(0,  28);
        context.lineTo(10, 0);
        context.lineTo(20,  28);	
    }


    context.closePath();
    context.fill();
};

var AnimationMorph;

AnimationMorph.prototype = new Morph();
AnimationMorph.prototype.constructor = AnimationMorph;
AnimationMorph.uber = Morph.prototype;

function AnimationMorph(path, frameCount, frameDuration, extent) {
    this.init(path, frameCount, frameDuration, extent);
};

AnimationMorph.prototype.init = function(path, frameCount, frameDuration, extent) {
    var myself = this;

    this.path = path;
    this.frameCount = frameCount;
    this.frameDuration = frameDuration || 1; // frames per rendering cycle
    this.frames = [];
    this.lastFrameTime = Date.now();
    this.currentFrameIndex = 0;

    this.loadImages(function() { myself.stepFrame() });

    this.setExtent(extent);
    this.image.width = extent.x;
    this.image.height = extent.y;
};

AnimationMorph.prototype.loadImages = function(callback) {
    var myself = this,
        img;

    for (i = 0; i < this.frameCount; i++ ) {
        img = new Image();
        img.src = this.path + 'Frame (' + i + ').jpg';
        myself.frames.push(img);
    }

    img.onload = callback;
};

AnimationMorph.prototype.currentFrame = function() {
    return this.frames[this.currentFrameIndex];
};

AnimationMorph.prototype.drawNew = function () {
    var context = this.image.getContext('2d');
    context.clearRect(0, 0, this.width(), this.height());
    context.drawImage(this.currentFrame(), 0, 0, this.width(), this.height());
};

AnimationMorph.prototype.step = function() {
    if (Date.now() - this.lastFrameTime >= this.frameDuration) {
        this.currentFrameIndex = (this.currentFrameIndex + 1) % this.frameCount;
        this.lastFrameTime = Date.now();
        this.changed();
        this.drawNew();
    }
};

// Hue Wheel

var HueWheelMorph;

// ColorPaletteMorph inherits from Morph:

HueWheelMorph.prototype = new ColorPaletteMorph();
HueWheelMorph.prototype.constructor = HueWheelMorph;
HueWheelMorph.uber = ColorPaletteMorph.prototype;

// ColorPaletteMorph instance creation:

function HueWheelMorph(target, sizePoint) {
    this.init(
        target || null,
        sizePoint || new Point(80, 50)
    );
};

HueWheelMorph.prototype.drawNew = function () {
    var context, ext, x, y, radius;

    ext = this.extent();
    this.image = newCanvas(this.extent());
    context = this.image.getContext('2d');
    this.choice = new Color();
    x = this.image.width / 2 + 2;
    y = this.image.height / 2;
    radius = this.image.width / 2 - 22;

    context.font = '9px Arial';
    context.fillStyle = 'rgb(200,200,200)';
    context.fillRect(0, 0, this.image.width, this.image.height);
    context.strokeRect(0, 0, this.image.width, this.image.height);

    context.textAlign = 'center';
    context.textBaseline = 'middle';

    for (var angle = 360; angle > 0; angle --) {
        var startAngle = (angle - 1) * Math.PI/180;
        var endAngle = (angle + 1) * Math.PI/180;
        context.beginPath();
        context.moveTo(x, y);
        context.arc(x, y, radius, startAngle, endAngle, false);
        context.closePath();
        context.fillStyle = 'hsl(' + angle + ', 100%, 50%)';
        context.fill();
        
        if (angle % 30 == 0) {
            var tx = x + (radius + 12) * Math.cos(radians(angle)),
                ty = y + (radius + 12) * Math.sin(radians(angle));

            context.fillStyle = 'rgb(10,10,10)';

            if (angle % 90 == 0) {
                context.fillText(angle % 360 + '°', tx, ty);
            } else {
                context.beginPath()
                context.moveTo(tx, ty);
                context.lineTo(tx + 5 * Math.cos(radians(angle)), ty + 5 * Math.sin(radians(angle)));
                context.stroke();
            }
        }
    }
};
