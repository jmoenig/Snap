/*********************************************************************/
/******************************* HOOKS *******************************/
/*********because sometimes you HAVE to mod the original file*********/
/*********************************************************************/

/*
 * Hooks into SpriteMorph.blockTemplates
 * 
 * Adds the blocks to the UI
 */
SpriteMorph.prototype.scribbleHookBlockTemplates = function(blocks, block, cat)
{
    if (cat === 'operators')
    {
        blocks.push(block('reportExpression'));
    }
    if (cat === 'shapes') { 
        /* Scribble Shapes */
        blocks.push(block('clear'));
        blocks.push('-');
        blocks.push(block('startShape'));
        blocks.push(block('endShape'));
        blocks.push('-');
        blocks.push(block('changeShapeHue'));
        blocks.push(block('setShapeHue'));
        blocks.push('-');
        blocks.push(block('changeShapeBrightness'));
        blocks.push(block('setShapeBrightness'));
        blocks.push('-');
        blocks.push(block('changeShapeGhosting'));
        blocks.push(block('setShapeGhosting'));
    }
}

/*********************************************************************/
/***************************** OVERRIDES *****************************/
/*********************************************************************/

/*
 * Add the shape category
 */
SpriteMorph.prototype.blockColor.shapes = new Color(215, 45, 45);
SpriteMorph.prototype.categories.push("shapes");

/*
 * Override for the default implementation of SpriteMorph.initBlocks
 * 
 * We must add scribble's blocks to the menus!
 */
var override_spriteMorph_prototype_initBlocks = SpriteMorph.prototype.initBlocks;

SpriteMorph.prototype.initBlocks = function () {
    override_spriteMorph_prototype_initBlocks.call(this);
    this.addScribbleBlocks();
}

SpriteMorph.prototype.addScribbleBlocks = function () {
    SpriteMorph.prototype.blocks.startShape = {
        type: 'command',
        category: 'shapes',
        spec: 'start shape'
    };
    
    SpriteMorph.prototype.blocks.endShape = {
        type: 'command',
        category: 'shapes',
        spec: 'end shape'
    };

    SpriteMorph.prototype.blocks.changeShapeHue = {
        type: 'command',
        category: 'shapes',
        spec: 'change fill color by %n',
        defaults: [10]
    };
    
    SpriteMorph.prototype.blocks.setShapeHue = {
        type: 'command',
        category: 'shapes',
        spec: 'set fill color to %n',
        defaults: [0]
    };
    
    SpriteMorph.prototype.blocks.changeShapeBrightness = {
        type: 'command',
        category: 'shapes',
        spec: 'change fill shade by %n',
        defaults: [10]
    };
    
    SpriteMorph.prototype.blocks.setShapeBrightness = {
        type: 'command',
        category: 'shapes',
        spec: 'set fill shade to %n',
        defaults: [100]
    };
    
    SpriteMorph.prototype.blocks.changeShapeGhosting = {
        type: 'command',
        category: 'shapes',
        spec: 'change fill ghosting by %n',
        defaults: [10]
    };
    
    SpriteMorph.prototype.blocks.setShapeGhosting = {
        type: 'command',
        category: 'shapes',
        spec: 'set fill ghosting to %n',
        defaults: [100]
    };
    
    /* The lambda expression*/
    SpriteMorph.prototype.blocks.reportExpression = {
        type: 'reporter',
        category: 'operators',
        spec: '\u03BB %s'
    };
}

/*
 * Override for the default implementation of SpriteMorph.drawLine
 * 
 * Simply updates the current shape that the spritemorph holds when ever
 * the pen should be updated.
 */
var override_spriteMorph_prototype_drawLine = SpriteMorph.prototype.drawLine;

SpriteMorph.prototype.drawLine = function (start, dest) {
    override_spriteMorph_prototype_drawLine.call(this, start, dest);
    
    if (this.currentShape != null)
    {
        this.currentShape.addPoint(dest.x, dest.y);
    }
}

/*
 * Override for the default implementation of SpriteMorph.init
 * 
 * Called when a spritemorph is initialised.
 */
var override_spriteMorph_prototype_init = SpriteMorph.prototype.init
SpriteMorph.prototype.init = function(globals)
{
    override_spriteMorph_prototype_init.call(this, globals);
    
    //Black initially
    this.fillColor = new Color(0,0,0);
}

StageMorph.prototype.drawTool = false;
StageMorph.prototype.previousPoint = null;
/*
 * Override for the default implementation of StageMorph.mouseClickLeft
 * 
 * Called to clear the current point when the mouse is released
 */
StageMorph.prototype.mouseClickLeft = function()
{
    if (this.drawTool)
    {
        this.previousPoint = null;
        
        /*this.fps = this.pfps;
        if (this.fps == 1000)
            this.fps = 20;*/
    }
}

/*
 * Override for the default implementation of StageMorph.mouseDownLeft
 * 
 * Called to clear the current point when the mouse is first pressed
 */
StageMorph.prototype.mouseDownLeft = function()
{
    this.previousPoint = null;
    if (this.drawTool)
    {
        /* I'm not sure about this, so I'll comment it out for now. */
        /*this.pfps = this.fps;
        this.fps = 1000;*/
    }
}

/*
 * Override for the default implementation of StageMorph.mouseDownLeft
 * 
 * Called to draw if the pen is in use
 */
StageMorph.prototype.mouseMove = function(point)
{
    if (this.drawTool && this.world().hand.mouseButton === "left")
    {
        if (this.previousPoint == null)
        {
            this.previousPoint = point;
            return;
        }
        //This code draws the path to the canvas
        
        var context = this.penTrails().getContext('2d');
        
        //Save current transform
        context.save();
        
        //Update transform
        //The pen draws to a bitmap that does not change size,
        //so we must scale the real coordinates down to it.
        context.scale(1 / this.scale, 1 / this.scale);
        context.translate(-this.left(), -this.top());
        
        context.beginPath();
        context.moveTo(this.previousPoint.x, this.previousPoint.y);
        context.lineTo(point.x, point.y);
        context.fillStyle = "black";
        context.stroke();
        
        //Restore transform
        context.restore();
        
        var minX = Math.min(this.previousPoint.x, point.x) - 2, 
        maxX = Math.max(this.previousPoint.x, point.x) + 2, 
        minY = Math.min(this.previousPoint.y, point.y) - 2, 
        maxY = Math.max(this.previousPoint.y, point.y) + 2;
        //Dirty area
        this.world().fullDrawOn(this.world().worldCanvas,//.broken.push(//
            new Rectangle(minX, minY, maxX, maxY)
                .intersect(
                    this.parent.visibleBounds())
                        .spread() /* Snaps to integral coordinates */);
                        
        this.previousPoint = point;
    }
    else
    {
        this.previousPoint = null;
    }
}

/*********************************************************************/
/****************************** OBJECTS ******************************/
/*********************************************************************/

/*
 * ScribbleShape
 * 
 * Simple container for a set of points. May grow in future, but for now,
 * it's just a class
 */
var ScribbleShape = function()
{
    this.points = [];
};

ScribbleShape.prototype.addPoint = function (x, y)
{
    this.points.push(new Point(x,y));
}

/*********************************************************************/
/**************************** BLOCK LOGIC ****************************/
/*********************************************************************/

/*
 * SpriteMorph.startShape
 * 
 * Implements block logic that clears the current shape and makes 
 * a new one
 */
SpriteMorph.prototype.startShape = function () {
    var stage = this.parent,
        context = stage.penTrails().getContext('2d');

    this.currentShape = new ScribbleShape();
    
    //Place the initial point
    var rotCentre = this.rotationCenter();
    this.currentShape.addPoint(rotCentre.x, rotCentre.y);

    this.changed();
};

/*
 * Implements the lambda expression. Back end is simple, we simply sanitise
 * the input and use eval()!
 */
function scribble_lambda_random(n)
{
    if (typeof n === "undefined")
        return Math.random();
    return Math.random() * n;
}
function scribble_lambda_lengthOf(s)
{
    if (typeof s !== "String")
        throw { name: "Type Mismatch", message: "You can only use strings with lengthOf!" };
    return s.length;
}
SpriteMorph.prototype.lambdas = { }
SpriteMorph.prototype.reportExpression = function (str) {
    var found = this.lambdas[str];
    if (typeof found === "undefined" || found === null)
    {
        this.lambdas[str] = found = getLambdaFunction(str);
    }
    return found.call(this);
};

SpriteMorph.prototype.setShapeHue = function (num) {
    var hsv = this.fillColor.hsv(),
        x = this.xPosition(),
        y = this.yPosition();

    hsv[0] = Math.max(Math.min(+num || 0, 100), 0) / 100;
    hsv[1] = 1;    
    this.fillColor.set_hsv.apply(this.fillColor, hsv);
    if (!this.costume) {
        this.drawNew();
        this.changed();
    }
    this.gotoXY(x, y);
};

/*
 * SpriteMorph.getShapeHue
 * 
 * Implements block logic that gets the hue of the shape
 */
SpriteMorph.prototype.getShapeHue = function () {
    return this.fillColor.hsv()[0] * 100;
};

/*
 * SpriteMorph.getShapeHue
 * 
 * Implements block logic that changes the hue of the shape
 * relative to its previous value
 */
SpriteMorph.prototype.changeShapeHue = function (delta) {
    this.setShapeHue(this.getShapeHue() + (+delta || 0));
};

/*
 * SpriteMorph.setShapeBrightness
 * 
 * Implements block logic that sets the brightness of the shape
 */
SpriteMorph.prototype.setShapeBrightness = function (num) {
    var hsv = this.fillColor.hsv(),
        x = this.xPosition(),
        y = this.yPosition();

    hsv[1] = Math.max(Math.min(+num || 0, 100), 0) / 100;
    hsv[2] = 1;
    this.fillColor.set_hsv.apply(this.fillColor, hsv);
    if (!this.costume) {
        this.drawNew();
        this.changed();
    }
    this.gotoXY(x, y);
};

/*
 * SpriteMorph.getShapeBrightness
 * 
 * Implements block logic that gets the brightness of the shape
 */
SpriteMorph.prototype.getShapeBrightness = function () {
    return this.fillColor.hsv()[1] * 100;
};
    
/*
 * SpriteMorph.getShapeBrightness
 * 
 * Implements block logic that changes the brightness of the shape
 * relative to its previous value
 */
SpriteMorph.prototype.changeShapeBrightness = function (delta) {
    this.setShapeBrightness(this.getShapeBrightness() + (+delta || 0));
};

/*
 * SpriteMorph.setShapeGhosting
 * 
 * Implements block logic that sets the ghosting(alpha) of the shape
 */
SpriteMorph.prototype.setShapeGhosting = function (num) {
    var x = this.xPosition(),
        y = this.yPosition();
        
    this.fillColor.a = Math.max(0,Math.min(num, 100)) / 100;
    if (!this.costume) {
        this.drawNew();
        this.changed();
    }
    this.gotoXY(x, y);
};

/*
 * SpriteMorph.getShapeGhosting
 * 
 * Implements block logic that gets the ghosting(alpha) of the shape
 */
SpriteMorph.prototype.getShapeGhosting = function () {
    return this.fillColor.a * 100;
};
      
/*
 * SpriteMorph.getShapeBrightness
 * 
 * Implements block logic that changes the ghosting(alpha) of the shape
 * relative to its previous value
 */
SpriteMorph.prototype.changeShapeGhosting = function (delta) {
    this.setShapeGhosting(this.getShapeGhosting() + (+delta || 0));
};
   
/*
 * SpriteMorph.startShape
 * 
 * Implements block logic that clears the current shape and makes 
 * a new one
 */
SpriteMorph.prototype.startShape = function () {
    var stage = this.parent,
        context = stage.penTrails().getContext('2d');

    this.currentShape = new ScribbleShape();
    
    //Place the initial point
    var rotCentre = this.rotationCenter();
    this.currentShape.addPoint(rotCentre.x, rotCentre.y);

    this.changed();
};
   
/*
 * SpriteMorph.endShape
 * 
 * Implements block logic that closes the current shape and draws
 * it to the canvas
 */
SpriteMorph.prototype.endShape = function () {
    var stage = this.parent,
        context = stage.penTrails().getContext('2d')
        currentShape = this.currentShape
        fillColor = this.fillColor;
    
    if (currentShape == null || currentShape.points.length == 0)
        return;
       
    //This code draws the path to the canvas
    var minX = currentShape.points[0].x, 
    maxX = minX, 
    minY = currentShape.points[0].y, 
    maxY = minY;
    
    //Save current transform
    context.save();
    
    //Update transform
    //The pen draws to a bitmap that does not change size,
    //so we must scale the real coordinates down to it.
    context.scale(1 / stage.scale, 1 / stage.scale);
    context.translate(-stage.left(), -stage.top());
    
    context.beginPath();
    for (var i=0; i<currentShape.points.length; i++) {
        var x = currentShape.points[i].x,
            y = currentShape.points[i].y;
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;        
        if (y > maxY) maxY = y;
        context.lineTo(x, y);
    }
    var stringy = "rgba("+Math.round(fillColor.r)+","+Math.round(fillColor.g)+","+Math.round(fillColor.b)+","+fillColor.a+")";

    context.fillStyle = stringy;
    context.closePath();
    context.fill();
    
    //Restore transform
    context.restore();
    
    //Dirty area
    this.world().broken.push(
        new Rectangle(minX, minY, maxX, maxY)
            .intersect(
                this.parent.visibleBounds())
                    .spread() /* Snaps to integral coordinates */);

    this.changed();
};

/*********************************************************************/
/****************************** STATICS ******************************/
/*********************************************************************/
//Snap calls this after initBlocks is defined. We call addScribbleBlocks to add the new blocks.
SpriteMorph.prototype.addScribbleBlocks();
