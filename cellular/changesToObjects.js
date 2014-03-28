modules.cellularObjects = '2013-November-28';

/*********************************************************************/
/***************************** HELPERS *******************************/
/*********************************************************************/

/*
** Defines getTimestamp. Thanks to 
** http://stackoverflow.com/questions/6875625/does-javascript-provide-a-high-resolution-timer
*/
var getTimestamp;
if (window.performance.now) {
	getTimestamp = function() { return window.performance.now(); };
} else {
	if (window.performance.webkitNow) {
		getTimestamp = function() { return window.performance.webkitNow(); };
	} else {
		getTimestamp = function() { return new Date().getTime(); };
	}
}

/*********************************************************************/
/******************************* HOOKS *******************************/
/*********************************************************************/

SpriteMorph.prototype.uberBlockForSelector = SpriteMorph.prototype.blockForSelector;
SpriteMorph.prototype.blockForSelector = function (selector, setDefaults) {
	var block = this.uberBlockForSelector(selector, setDefaults);
	if (block instanceof ReporterBlockMorph)
	{
		block.isArrow = this.blocks[selector].type === 'arrow';
	}
	return block;
};
 
SpriteMorph.prototype.scribbleHookBlockTemplates = SpriteMorph.prototype.snapappsHookBlockTemplates;
SpriteMorph.prototype.snapappsHookBlockTemplates = function(blocks, block, cat, helpMenu)
{
	var myself = this;
	if (cat == "cells")
	{
		//First we add the "add Attribute" button
		button = new PushButtonMorph(
			null,
			function () {
				new CellAttributeDialogMorph(
					null,
					function (pair) {
						if (pair) {
							if (!Cell.addAttribute(pair[0]))
								return;
							//Reset the cells pallette so it makes the new attribute appear
							myself.blocksCache[cat] = null;
							myself.paletteCache[cat] = null;
							var ide = myself.parentThatIsA(IDE_Morph);
							ide.stage.setCellAttributeVisibility(pair[0], true);
							ide.refreshPalette();
							ide.refreshCellAttributes();
							ide.attributeSelector.setChoice(pair[0]);
						}
					},
					myself
				).prompt(
					'Cell attribute name',
					null,
					myself.world()
				);
			},
			'Make a cell attribute'
		);
		button.userMenu = helpMenu;
		button.selector = 'addCellAttribute';
		button.showHelp = BlockMorph.prototype.showHelp;
		blocks.push(button);

		if (Cell.attributes.length > 0) {
			button = new PushButtonMorph(
				null,
				function () {
					var menu = new MenuMorph(
						myself.deleteCellAttribute,
						null,
						myself
					);
					for (var i=0; i<Cell.attributes.length; i++)
					{
						var name = Cell.attributes[i];
						menu.addItem(name, name);
					};
					menu.popUpAtHand(myself.world());
				},
				'Delete a cell attribute'
			);
			button.userMenu = helpMenu;
			button.selector = 'deleteCellAttribute';
			button.showHelp = BlockMorph.prototype.showHelp;
			blocks.push(button);
		}

		blocks.push('-');

		if (Cell.attributes.length > 0) {
			for (var i=0; i<Cell.attributes.length; i++)
			{
				var toggle = new ToggleMorph(
					'checkbox',
					{cellAttribute: Cell.attributes[i]},
					function () {
						myself.parentThatIsA(IDE_Morph).stage.toggleCellAttributeVisibility(this.cellAttribute);
					},
					null,
					function () {
						return myself.parentThatIsA(IDE_Morph).stage.getCellAttributeVisibility(this.cellAttribute);
					},
					null
				);
				toggle.nextIsRight = true;
				blocks.push(toggle);
				
				var colour = new ColorSlotMorph();
				colour.isStatic = true;
				colour.setColor(new Color(100,100,100));
				colour.cellAttribute = Cell.attributes[i];
				colour.oldSetColour = colour.setColor;
				colour.setColor = function(col)
				{
					Cell.attributeColours[this.cellAttribute] = col;
					myself.parentThatIsA(IDE_Morph).stage.dirtyEntireStage();
					return this.oldSetColour(col);
				}
				colour.oldSetColour(Cell.attributeColours[Cell.attributes[i]]);
				colour.nextIsRight = true;
				blocks.push(colour);
				
				var fromField;
				fromField = new InputFieldMorph(Cell.attributeDrawRange[Cell.attributes[i]][0].toString());
				fromField.corner = 12;
				fromField.padding = 0;
				fromField.contrast = this.buttonContrast;
				fromField.hint = "from value";
				fromField.contents().minWidth = 0;
				fromField.setWidth(32); // fixed dimensions
				fromField.drawNew();
				fromField.cellAttribute = Cell.attributes[i];
				fromField.accept = function () {
					var value = Number(fromField.getValue());
					if (isNaN(value))
					{
						fromField.setContents(0);
						return;
					}
					Cell.attributeDrawRange[this.cellAttribute][0] = value;
					myself.parentThatIsA(IDE_Morph).stage.dirtyEntireStage();
				};
				fromField.nextIsRight = true;
				blocks.push(fromField);
				
				var toField;
				toField = new InputFieldMorph(Cell.attributeDrawRange[Cell.attributes[i]][1].toString());
				toField.corner = 12;
				toField.padding = 0;
				toField.contrast = this.buttonContrast;
				toField.hint = "from value";
				toField.contents().minWidth = 0;
				toField.setWidth(32); // fixed dimensions
				toField.drawNew();
				toField.cellAttribute = Cell.attributes[i];
				toField.accept = function () {
					var value = Number(toField.getValue());
					if (isNaN(value))
					{
						toField.setContents(0);
						return;
					}
					Cell.attributeDrawRange[this.cellAttribute][1] = value;
					myself.parentThatIsA(IDE_Morph).stage.dirtyEntireStage();
				};
				blocks.push(toField);
				
				var txt = new TextMorph(toggle.target.cellAttribute);
				txt.fontSize = 12;
				txt.setLeft(toField.right());
				txt.setColor(this.paletteTextColor);
				blocks.push(txt);
			}
			blocks.push('-');
			blocks.push(block('cellsX'));
			blocks.push(block('cellsY'));
			blocks.push('-');
			blocks.push(block('showCellAttribute'));
			blocks.push(block('hideCellAttribute'));
			blocks.push('-');
			blocks.push(block('getCellAttribute'));
			blocks.push(block('getCellAttributeCell'));
			blocks.push(block('getCellAttributeHere'));
			blocks.push('-');
			blocks.push(block('getCellAttributeAverage'));
			blocks.push(block('getCellAttributeMaximum'));
			blocks.push(block('getCellAttributeMinimum'));
			blocks.push('-');
			blocks.push(block('setCellAttribute'));
			blocks.push(block('setCellAttributeCell'));
			blocks.push(block('setCellAttributeHere'));
			blocks.push(block('setCellAttributeEverywhere'));
			blocks.push('-');
			blocks.push(block('changeCellAttribute'));
			blocks.push(block('changeCellAttributeCell'));
			blocks.push(block('changeCellAttributeHere'));
			blocks.push(block('changeCellAttributeEverywhere'));
		}
	}
	else if (cat == 'motion')
	{
		blocks.push('-');
		blocks.push(block('cellX'));
		blocks.push(block('cellY'));
		blocks.push('-');
		blocks.push(block('moveToCell'));
		blocks.push(block('moveToNbrCell'));
		blocks.push(block('moveToEmptyNbrCell'));
		blocks.push(block('moveToAnyCell'));
		blocks.push(block('moveToAnyEmptyCell'));
		blocks.push('-');
		blocks.push(block('snapToCell'));
	}
	else if (cat == 'control')
	{
		blocks.splice(blocks.length - 3, 0, block('getLastClone'));
		blocks.push('-');
		blocks.push(block('instanceCount'));
	}
	else if (cat == 'looks')
	{
		blocks.push('-');
		blocks.push(block('getCostumeName'));
	}
	else if (cat == 'objects')
	{
		blocks.push(block('reportNobody'));
		blocks.push(block('reportThis'));
		blocks.push('-');
		blocks.push(block('isNobody'));
		blocks.push(block('isThis'));
		blocks.push('-');
		blocks.push(block('setVariable'));
		blocks.push(block('getVariable'));
		blocks.push(block('changeVariable'));
		blocks.push('-');
		blocks.push(block('getCostumeNameObject'));
		blocks.push(block('getTypeName'));
		blocks.push(block('objectIsA'));
		blocks.push(block('obliterate'));
		blocks.push('-');
		blocks.push(block('listOfAllClones'));
		blocks.push('-');
		blocks.push(block('getObjectX'));
		blocks.push(block('getObjectY'));
		blocks.push(block('setObjectPosition'));
		blocks.push('-');
		blocks.push(block('getObjectCellX'));
		blocks.push(block('getObjectCellY'));
		blocks.push(block('setObjectCellPosition'));
		blocks.push('-');
		blocks.push(block('asObject'));
		blocks.push(block('nearestObject'));
	}
    return this.scribbleHookBlockTemplates(blocks, block, cat);
}

SpriteMorph.prototype.deleteCellAttribute = function(name)
{
	for (var i=0; i<Cell.attributes.length; i++)
	{
		if (Cell.attributes[i] == name)
		{
			Cell.attributes.splice(i, 1);
			this.blocksCache["cells"] = null;
			this.paletteCache["cells"] = null;
			var ide = this.parentThatIsA(IDE_Morph);
			ide.refreshPalette();
			ide.refreshCellAttributes();
			ide.stage.setCellAttributeVisibility(name, false);
			return;
		}
	}
}

SpriteMorph.prototype.categories.push("cells");
SpriteMorph.prototype.categories.push("objects");

SpriteMorph.prototype.blockColor.cells = new Color(150, 200, 150);
SpriteMorph.prototype.blockColor.objects = new Color(150, 150, 200);

SpriteMorph.prototype.uberInitBlocks = SpriteMorph.prototype.initBlocks;
SpriteMorph.prototype.initBlocks = function () {
    this.uberInitBlocks();
    this.addCellularBlocks();
}

SpriteMorph.prototype.addCellularBlocks = function () {

	//control
    SpriteMorph.prototype.blocks.getLastClone = {
        type: 'arrow',
        category: 'control',
        spec: 'last created clone',
    };
    SpriteMorph.prototype.blocks.instanceCount = {
        type: 'reporter',
        category: 'control',
        spec: 'instance count of %cln',
    };
	
	//motion
    SpriteMorph.prototype.blocks.cellX = {
        type: 'reporter',
        category: 'motion',
        spec: 'cell X',
    };
    SpriteMorph.prototype.blocks.cellY = {
        type: 'reporter',
        category: 'motion',
        spec: 'cell Y',
    };
    SpriteMorph.prototype.blocks.moveToNbrCell = {
        type: 'command',
        category: 'motion',
        spec: 'move to nbr cell',
    };
    SpriteMorph.prototype.blocks.moveToEmptyNbrCell = {
        type: 'command',
        category: 'motion',
        spec: 'move to empty nbr cell',
    };
    SpriteMorph.prototype.blocks.moveToAnyCell = {
        type: 'command',
        category: 'motion',
        spec: 'move to any cell',
    };
    SpriteMorph.prototype.blocks.moveToAnyEmptyCell = {
        type: 'command',
        category: 'motion',
        spec: 'move to any empty cell',
    };
    SpriteMorph.prototype.blocks.moveToCell = {
        type: 'command',
        category: 'motion',
        spec: 'move to cell at cell x: %n cell y: %n',
    };
    SpriteMorph.prototype.blocks.snapToCell = {
        type: 'command',
        category: 'motion',
        spec: 'snap to centre of cell',
    };
	
	//cells
    SpriteMorph.prototype.blocks.cellsX = {
        type: 'reporter',
        category: 'cells',
        spec: 'cells X',
    };
	
    SpriteMorph.prototype.blocks.cellsY = {
        type: 'reporter',
        category: 'cells',
        spec: 'cells Y',
    };
	
    SpriteMorph.prototype.blocks.showCellAttribute = {
        type: 'command',
        category: 'cells',
        spec: 'show cell attribute %clat',
    };
	
    SpriteMorph.prototype.blocks.hideCellAttribute = {
        type: 'command',
        category: 'cells',
        spec: 'hide cell attribute %clat',
    };
	
    SpriteMorph.prototype.blocks.getCellAttribute = {
        type: 'reporter',
        category: 'cells',
        spec: 'value of %clat at x: %n y: %n',
    };
	
    SpriteMorph.prototype.blocks.getCellAttributeCell = {
        type: 'reporter',
        category: 'cells',
        spec: 'value of %clat at cell x: %n cell y: %n',
    };
	
    SpriteMorph.prototype.blocks.getCellAttributeHere = {
        type: 'reporter',
        category: 'cells',
        spec: 'value of %clat here',
    };
	
    SpriteMorph.prototype.blocks.getCellAttributeAverage = {
        type: 'reporter',
        category: 'cells',
        spec: 'average value of %clat',
    };
	
    SpriteMorph.prototype.blocks.getCellAttributeMinimum = {
        type: 'reporter',
        category: 'cells',
        spec: 'minimum value of %clat',
    };
	
    SpriteMorph.prototype.blocks.getCellAttributeMaximum = {
        type: 'reporter',
        category: 'cells',
        spec: 'maximum value of %clat',
    };
	
    SpriteMorph.prototype.blocks.setCellAttribute = {
        type: 'command',
        category: 'cells',
        spec: 'set %clat at x: %n y: %n to %n',
    };
	
    SpriteMorph.prototype.blocks.setCellAttributeCell = {
        type: 'command',
        category: 'cells',
        spec: 'set %clat at cell x: %n cell y: %n to %n',
    };
	
    SpriteMorph.prototype.blocks.setCellAttributeHere = {
        type: 'command',
        category: 'cells',
        spec: 'set %clat here to %n',
    };
	
    SpriteMorph.prototype.blocks.setCellAttributeEverywhere = {
        type: 'command',
        category: 'cells',
        spec: 'set %clat everywhere to %n',
    };
	
    SpriteMorph.prototype.blocks.changeCellAttribute = {
        type: 'command',
        category: 'cells',
        spec: 'change %clat at x: %n y: %n by %n',
    };
	
    SpriteMorph.prototype.blocks.changeCellAttributeCell = {
        type: 'command',
        category: 'cells',
        spec: 'change %clat at cell x: %n cell y: %n by %n',
    };
	
    SpriteMorph.prototype.blocks.changeCellAttributeHere = {
        type: 'command',
        category: 'cells',
        spec: 'change %clat here by %n',
    };
	
    SpriteMorph.prototype.blocks.changeCellAttributeEverywhere = {
        type: 'command',
        category: 'cells',
        spec: 'change %clat everywhere by %n',
    };
	
	//objects
    SpriteMorph.prototype.blocks.reportNobody = {
        type: 'arrow',
        category: 'objects',
        spec: 'nobody',
    };
    SpriteMorph.prototype.blocks.reportThis = {
        type: 'arrow',
        category: 'objects',
        spec: 'this',
    };
    SpriteMorph.prototype.blocks.isThis = {
        type: 'predicate',
        category: 'objects',
        spec: '%obj is this',
    };
    SpriteMorph.prototype.blocks.isNobody = {
        type: 'predicate',
        category: 'objects',
        spec: '%obj is nobody',
    };
    SpriteMorph.prototype.blocks.setVariable = {
        type: 'command',
        category: 'objects',
        spec: 'set var %s to %s in %obj',
    };
    SpriteMorph.prototype.blocks.getVariable = {
        type: 'reporter',
        category: 'objects',
        spec: 'get var %s in %obj',
    };
    SpriteMorph.prototype.blocks.changeVariable = {
        type: 'reporter',
        category: 'objects',
        spec: 'change var %s by %s in %obj',
    };
    SpriteMorph.prototype.blocks.getCostumeName = {
        type: 'reporter',
        category: 'looks',
        spec: 'costume name',
    };
    SpriteMorph.prototype.blocks.getCostumeNameObject = {
        type: 'reporter',
        category: 'objects',
        spec: 'costume name of %obj',
    };
    SpriteMorph.prototype.blocks.getTypeName = {
        type: 'reporter',
        category: 'objects',
        spec: 'type of %obj',
    };
    SpriteMorph.prototype.blocks.objectIsA = {
        type: 'predicate',
        category: 'objects',
        spec: '%obj is a %spr',
    };
    SpriteMorph.prototype.blocks.obliterate = {
        type: 'command',
        category: 'objects',
        spec: 'obliterate %obj',
    };
    SpriteMorph.prototype.blocks.listOfAllClones = {
        type: 'reporter',
        category: 'objects',
        spec: 'list of all %cln',
    };
    SpriteMorph.prototype.blocks.getObjectX = {
        type: 'reporter',
        category: 'objects',
        spec: 'x position of %obj',
    };
    SpriteMorph.prototype.blocks.getObjectY = {
        type: 'reporter',
        category: 'objects',
        spec: 'y position of %obj',
    };
    SpriteMorph.prototype.blocks.getObjectCellX = {
        type: 'reporter',
        category: 'objects',
        spec: 'cell x position of %obj',
    };
    SpriteMorph.prototype.blocks.getObjectCellY = {
        type: 'reporter',
        category: 'objects',
        spec: 'cell y position of %obj',
    };
    SpriteMorph.prototype.blocks.setObjectPosition = {
        type: 'command',
        category: 'objects',
        spec: 'move %obj to x: %n y: %n',
    };
    SpriteMorph.prototype.blocks.setObjectCellPosition = {
        type: 'command',
        category: 'objects',
        spec: 'move %obj to cell x: %n cell y: %n',
    };
    SpriteMorph.prototype.blocks.nearestObject = {
        type: 'reporter',
        category: 'objects',
        spec: 'nearest %cln to x: %n y: %n where %predRing',
    };
    SpriteMorph.prototype.blocks.asObject = {
        type: 'command',
        category: 'objects',
        spec: 'as %obj %c',
    };
}

var NOT_AN_OBJECT = "Not an object!";
var NOBODY = "Nobody";

SpriteMorph.prototype.setObjectPosition = function(otherObject, x, y)
{
	if (otherObject instanceof SpriteMorph)
		otherObject.gotoXY(x, y);
}

SpriteMorph.prototype.setObjectCellPosition = function(otherObject, x, y)
{
	if (otherObject instanceof SpriteMorph)
		otherObject.moveToCell(x, y);
}

SpriteMorph.prototype.getObjectCellX = function(otherObject)
{
	if (otherObject instanceof SpriteMorph)
		return otherObject.cellX();
	if (otherObject === null)
		return NOBODY;
	return NOT_AN_OBJECT;
}

SpriteMorph.prototype.getObjectCellY = function(otherObject)
{
	if (otherObject instanceof SpriteMorph)
		return otherObject.cellY();
	if (otherObject === null)
		return NOBODY;
	return NOT_AN_OBJECT;
}

SpriteMorph.prototype.getObjectX = function(otherObject)
{
	if (otherObject instanceof SpriteMorph)
		return otherObject.xPosition();
	if (otherObject === null)
		return NOBODY;
	return NOT_AN_OBJECT;
}

SpriteMorph.prototype.getObjectY = function(otherObject)
{
	if (otherObject instanceof SpriteMorph)
		return otherObject.yPosition();
	if (otherObject === null)
		return NOBODY;
	return NOT_AN_OBJECT;
}

SpriteMorph.prototype.listOfAllClones = function(otherObjectName)
{
	if (!otherObjectName) { return null; }
	if (otherObjectName == "myself")
		otherObjectName = this.parentSprite ? this.parentSprite.name : this.name;
	var arrayToReturn = [];
	this.parentThatIsA(StageMorph).children.forEach(function (x) {
		if (x instanceof SpriteMorph && x.parentSprite && x.parentSprite.name == otherObjectName)
		{
			arrayToReturn.push(x);
		}
	});
	
	return new List(arrayToReturn);
}

SpriteMorph.prototype.obliterate = function(otherObject)
{
	if (otherObject instanceof SpriteMorph)
	{
		otherObject.removeClone();
	}
}

SpriteMorph.prototype.objectIsA = function(otherObject, spriteMorph)
{
	if (otherObject instanceof SpriteMorph)
	{
		if (otherObject.parentSprite)
			return spriteMorph === otherObject.parentSprite.name;
		else
			return spriteMorph === otherObject.name;
	}
	else
	{
		return false;
	}
}

SpriteMorph.prototype.getTypeName = function(otherObject)
{
	if (otherObject instanceof SpriteMorph)
	{
		if (otherObject.parentSprite)
			return otherObject.parentSprite.name;
		else
			return otherObject.name;
	}
	else if (otherObject === null)
	{
		return NOBODY;
	}
	else 
		return NOT_AN_OBJECT;
}

SpriteMorph.prototype.getCostumeNameObject = function(otherObject)
{
	if (otherObject instanceof SpriteMorph)
	{
		return otherObject.getCostumeName();
	}
	else if (otherObject === null)
	{
		return NOBODY;
	}
	else 
		return NOT_AN_OBJECT;
}

SpriteMorph.prototype.getCostumeName = function()
{
	return this.costume ? this.costume.name : "";
}

SpriteMorph.prototype.reportNobody = function()
{
	return null;
}

SpriteMorph.prototype.reportThis = function()
{
	return this;
}

SpriteMorph.prototype.isThis = function(x)
{
	return x == this;
}

SpriteMorph.prototype.isNobody = function(x)
{
	return x == null;
}

SpriteMorph.prototype.setVariable = function(n,v,x)
{
	if (x instanceof SpriteMorph)
	{
		x.variables.setVar(n, v);
	}
}

SpriteMorph.prototype.getVariable = function(n,x)
{
	if (x instanceof SpriteMorph)
	{
		return x.variables.getVar(n);
	}
	return 42;
}

SpriteMorph.prototype.changeVariable = function(n,v,x)
{
	if (x instanceof SpriteMorph)
	{
		return x.variables.setVar(n, v + x.variables.getVar(n));
	}
}

SpriteMorph.prototype.changeCellAttributeCell = function(attribute, cx, cy, value)
{
	var cell = this.parentThatIsA(StageMorph).getCellAtCellCoords(cx,cy);
	if (!cell)
		return;
	cell.setAttribute(attribute, cell.getAttribute(attribute) + value);
}

SpriteMorph.prototype.changeCellAttributeEverywhere = function(attribute, value)
{
	var cells = this.parentThatIsA(StageMorph).cells;
	
	for (var i=0; i<cells.length; i++)
	{
		for (var j=0; j<cells[i].length; j++)
		{
			cells[i][j].setAttribute(attribute, cells[i][j].getAttribute(attribute) + value);
		}
	}
}

SpriteMorph.prototype.changeCellAttribute = function(attribute, x, y, value)
{
	var cell = this.parentThatIsA(StageMorph).getCellAtStageCoords(x,y);
	if (!cell)
		return;
	cell.setAttribute(attribute, cell.getAttribute(attribute) + value);
}

SpriteMorph.prototype.changeCellAttributeHere = function(attribute, value) {
    var rotCentre = this.rotationCenter();
	var cell = this.parentThatIsA(StageMorph).getCellAt(rotCentre.x, rotCentre.y);
	if (!cell)
		return;
	cell.setAttribute(attribute, cell.getAttribute(attribute) + value);
}

SpriteMorph.prototype.setCellAttributeCell = function(attribute, cx, cy, value)
{
	var cell = this.parentThatIsA(StageMorph).getCellAtCellCoords(cx,cy);
	if (!cell)
		return;
	cell.setAttribute(attribute, value);
}

SpriteMorph.prototype.setCellAttribute = function(attribute, x, y, value)
{
	var cell = this.parentThatIsA(StageMorph).getCellAtStageCoords(x,y);
	if (!cell)
		return;
	cell.setAttribute(attribute, value);
}

SpriteMorph.prototype.setCellAttributeHere = function(attribute, value) {
    var rotCentre = this.rotationCenter();
	var cell = this.parentThatIsA(StageMorph).getCellAt(rotCentre.x, rotCentre.y);
	if (!cell)
		return;
	cell.setAttribute(attribute, value);
}

SpriteMorph.prototype.setCellAttributeEverywhere = function(attribute, value)
{
	var cells = this.parentThatIsA(StageMorph).cells;
	for (var i=0; i<cells.length; i++)
	{
		for (var j=0; j<cells[i].length; j++)
		{
			cells[i][j].setAttribute(attribute, value);
		}
	}
}

SpriteMorph.prototype.getCellAttributeCell = function(attribute, cx, cy)
{
	var cell = this.parentThatIsA(StageMorph).getCellAtCellCoords(cx, cy);
	if (!cell)
		return 0;
	return cell.getAttribute(attribute);
}

SpriteMorph.prototype.getCellAttribute = function(attribute, x, y)
{
	var cell = this.parentThatIsA(StageMorph).getCellAtStageCoords(x,y);
	if (!cell)
		return 0;
	return cell.getAttribute(attribute);
}

SpriteMorph.prototype.getCellAttributeHere = function(attribute) {
    var rotCentre = this.rotationCenter();
	var cell = this.parentThatIsA(StageMorph).getCellAt(rotCentre.x, rotCentre.y);
	if (!cell)
		return 0;
	return cell.getAttribute(attribute);
}

SpriteMorph.prototype.getCellAttributeAverage = function(attribute)
{
	var stage = this.parentThatIsA(StageMorph);
	var cells = stage.cells;
	var total = 0;
	for (var i=0; i<stage.cellsY; i++)
	{
		for (var j=0; j<stage.cellsX; j++)
		{
			total += cells[i][j].getAttribute(attribute);
		}
	}
	return total / (stage.cellsX * stage.cellsY);
}

SpriteMorph.prototype.getCellAttributeMinimum = function(attribute)
{
	var stage = this.parentThatIsA(StageMorph);
	var cells = stage.cells;
	var minimum = 0;
	for (var i=0; i<stage.cellsY; i++)
	{
		for (var j=0; j<stage.cellsX; j++)
		{
			if (i == 0 && j == 0)
			{
				minimum = cells[i][j].getAttribute(attribute);
			}
			else
			{
				minimum = Math.min(cells[i][j].getAttribute(attribute), minimum);
			}
		}
	}
	return minimum;
}

SpriteMorph.prototype.getCellAttributeMaximum = function(attribute)
{
	var stage = this.parentThatIsA(StageMorph);
	var cells = stage.cells;
	var maximum = 0;
	for (var i=0; i<stage.cellsY; i++)
	{
		for (var j=0; j<stage.cellsX; j++)
		{
			if (i == 0 && j == 0)
			{
				maximum = cells[i][j].getAttribute(attribute);
			}
			else
			{
				maximum = Math.max(cells[i][j].getAttribute(attribute), maximum);
			}
		}
	}
	return maximum;
}

SpriteMorph.prototype.showCellAttribute = function(attribute)
{
	return this.parentThatIsA(StageMorph).setCellAttributeVisibility(attribute, true);
}

SpriteMorph.prototype.hideCellAttribute = function(attribute)
{
	return this.parentThatIsA(StageMorph).setCellAttributeVisibility(attribute, false);
}

SpriteMorph.prototype.cellsX = function()
{
	return this.parentThatIsA(StageMorph).cellsX;
}

SpriteMorph.prototype.cellsY = function()
{
	return this.parentThatIsA(StageMorph).cellsY;
}

SpriteMorph.prototype.cellX = function()
{
    var rotCentre = this.rotationCenter();
    var stage = this.parentThatIsA(StageMorph);
	
	return Math.floor((rotCentre.x - stage.left()) / stage.width() * stage.cellsX);
}

SpriteMorph.prototype.cellY = function()
{
    var rotCentre = this.rotationCenter();
    var stage = this.parentThatIsA(StageMorph);
	
	return Math.floor((rotCentre.y - stage.top()) / stage.height() * stage.cellsY);
}

SpriteMorph.prototype.moveToNbrCellBase = function(open)
{
	var cellX = this.cellX();
	var cellY = this.cellY();
    var stage = this.parentThatIsA(StageMorph);
	var cellW = stage.cellWidth();
	var cellH = stage.cellHeight();
	
	var nOpenCells = 0;
	for (var x=-1; x<=1; x++)
	{
		for (var y=-1; y<=1; y++)
		{
			if (open.call(this, cellX + x, cellY + y))
				nOpenCells++;
		}
	}
	
	var cell = Process.prototype.reportRandom.call(this, 0, nOpenCells - 1);
	
	for (var x=-1; x<=1; x++)
	{
		for (var y=-1; y<=1; y++)
		{
			if (open.call(this, cellX + x, cellY + y) && (cell-- == 0))
			{
				this.moveBy(new Point(x * cellW, y * cellH));
				return;
			}
		}
	}
}

SpriteMorph.prototype.moveToNbrCell = function()
{
    var stage = this.parentThatIsA(StageMorph);
	var cellX = this.cellX();
	var cellY = this.cellY();
	var cellsX = stage.cellsX;
	var cellsY = stage.cellsY;
	
	this.moveToNbrCellBase(function(cx, cy)
	{
		if (cx < 0 || cy < 0 || cx >= cellsX || cy >= cellsY)
			return false; //OOB
		if (cx == cellX && cy == cellY)
			return false; //My cell
		return true;
	});
}

SpriteMorph.prototype.moveToEmptyNbrCell = function()
{
    var stage = this.parentThatIsA(StageMorph);
	var cellX = this.cellX();
	var cellY = this.cellY();
	var cellsX = stage.cellsX;
	var cellsY = stage.cellsY;
	
	this.moveToNbrCellBase(function(cx, cy)
	{
		if (cx < 0 || cy < 0 || cx >= cellsX || cy >= cellsY)
			return false; //OOB
		if (stage.cells[cy][cx].spriteMorphs.length > 0)
			return false; //Not empty
		return true;
	});
}

SpriteMorph.prototype.moveToCell = function(cellX, cellY)
{
    var stage = this.parentThatIsA(StageMorph);
	var cellsX = stage.cellsX;
	var cellsY = stage.cellsY;
	var cellW = stage.cellWidth();
	var cellH = stage.cellHeight();
	
	this.gotoXY((cellX + 0.5) * cellW - 240, 180 - (cellY + 0.5) * cellH);
}

SpriteMorph.prototype.snapToCell = function()
{
    this.moveToCell(this.cellX(), this.cellY());
}

SpriteMorph.prototype.moveToAnyCell = function()
{
    var stage = this.parentThatIsA(StageMorph);
	var cellsX = stage.cellsX;
	var cellsY = stage.cellsY;
	
	this.moveToCell(Math.floor(Math.random() * cellsX), Math.floor(Math.random() * cellsY));
}

StageMorph.prototype.getEmptyCell = function(tree, n)
{
    if (tree.leafNode)
    {
        if (n == 1)
        {
            return tree.childB;
        }
        else
        {
            return tree.childA.spriteMorphs.length == 0 ? tree.childA : tree.childB;
        }
    }
    else
    {
        if (n < tree.childA.nEmpty)
        {
            return this.getEmptyCell(tree.childA, n);
        }
        else
        {
            return this.getEmptyCell(tree.childB, n - tree.childA.nEmpty);
        }
    }
}

SpriteMorph.prototype.moveToAnyEmptyCell = function()
{
    var stage = this.parentThatIsA(StageMorph);
	var cellsX = stage.cellsX;
	var cellsY = stage.cellsY;
	
	if (stage.emptyCellTree.nEmpty != 0)
	{
        var cellNum = Process.prototype.reportRandom.call(this, 0, stage.emptyCellTree.nEmpty - 1);
        var cell = stage.getEmptyCell(stage.emptyCellTree, cellNum);
		this.moveToCell(cell.x, cell.y);
    }
}

/*********************************************************************/
/***************************** OVERRIDES *****************************/
/*********************************************************************/

/*
**	When we move cells, we need to remove ourselves from the old cell, and add ourselves to the new one.
*/
SpriteMorph.prototype.currentCell = null;
SpriteMorph.prototype.updateCurrentCell = function()
{
	if (!this.parentSprite)
		return; //No parent, thus this is a prototype sprite morph and is 'sposed to be invisible.
		
    var stage = this.parentThatIsA(StageMorph);
	if (!stage)
		return; //No stage, can't go on!
		
	var newCell = stage.getCellAt(this.rotationCenter());
	
	//If we haven't exited the cell, do nothing.
	if (this.currentCell == newCell)
		return;
	
	//Otherwise, remove from old cell:
	if (this.currentCell)
	{
		this.currentCell.removeSpriteMorph(this);
		if (this.currentCell.spriteMorphs.length == 0)
		{
    		this.currentCell.parentECT.cellMadeEmpty();
	    }
	}
	
	this.currentCell = newCell;
	
	//... and add to new one
	if (this.currentCell)
	{
		if (this.currentCell.spriteMorphs.length == 0)
		{
    		this.currentCell.parentECT.cellFilled();
		}
		this.currentCell.addSpriteMorph(this);
	}
}

SpriteMorph.prototype.uberMoveBy = SpriteMorph.prototype.moveBy;
SpriteMorph.prototype.moveBy = function (delta, justMe) {
	var ret = this.uberMoveBy(delta, justMe);
	this.updateCurrentCell();
	return ret;
}

StageMorph.prototype.uberAddChild = StageMorph.prototype.addChild;
StageMorph.prototype.addChild = function (aNode) {
    var ret = this.uberAddChild(aNode);
	if (aNode instanceof SpriteMorph)
		aNode.updateCurrentCell();
	return ret;
};

StageMorph.prototype.uberAddChildFirst = StageMorph.prototype.addChildFirst;
StageMorph.prototype.addChildFirst = function (aNode) {
    var ret = this.addChildFirst(aNode);
	if (aNode instanceof SpriteMorph)
		aNode.updateCurrentCell();
	return ret;
};

StageMorph.prototype.uberRemoveChild = StageMorph.prototype.removeChild;
StageMorph.prototype.removeChild = function (aNode) {
	if (aNode instanceof SpriteMorph)
	{
		if (aNode.currentCell)
		{
			aNode.currentCell.removeSpriteMorph(aNode);
			if (aNode.currentCell.spriteMorphs.length == 0)
                aNode.currentCell.parentECT.cellMadeEmpty();
			aNode.currentCell = null;
		}
	}
    return this.uberRemoveChild(aNode);
};

/*
** Super simple linear interpol
*/
function valueInterpolate(from, to, mix)
{
	mix = Math.max(0, Math.min(1, mix));
	return from * (1 - mix) + to * mix;
}
/*
** This is used to get the attributes of the cell at (u, v) where u and v are [0,1] and not 
** neccessarily exactly on a cell. The result of the operation puts all the interpolated 
** cellAttributes into the resultCell
*/
function cellInterpolate(resultCell, cellArray, cellArrayWidth, cellArrayHeight, u, v)
{
	// Basically, we get the 4 pixels that surround the u,v position we're given.
	//
	// (floor(u), floor(v))
	// |
	// |       (ceil(u), floor(v))
	// |       |
	// V       V
	// X       X
	// 
	//     . <--(u,v)
	//
    // X       X
	// ^       ^
	// |       |
	// |       (ceil(u), ceil(v))
	// |       
	// (floor(u), ceil(v))
	//
	// Then we get the interpolated (over x axis) cell attribute of the bottom 2 and the top 2 at that u position
	// From there, we interpolate again over y axis between those two values.
	
	// Get position of top left point
	var leftXFloat = u * cellArrayWidth - 0.5;
	var topYFloat = v * cellArrayHeight - 0.5;
	
	var leftX = Math.floor(leftXFloat), topY = Math.floor(topYFloat);
	var rightX = leftX+1, bottomY = topY+1;
	
	//Ensure inside boundaries.
	leftX = Math.max(0, Math.min(cellArrayWidth - 1, leftX));
	topY = Math.max(0, Math.min(cellArrayHeight - 1, topY));
	rightX = Math.max(0, Math.min(cellArrayWidth - 1, rightX));
	bottomY = Math.max(0, Math.min(cellArrayHeight - 1, bottomY));
		
	//Get interpolation thingys, we know these are [0,1]
	var uInterpol = leftXFloat - leftX;
	var vInterpol = topYFloat - topY;
	
	//Actually interpolate
	for (var i = 0; i < Cell.attributes.length; i++)
	{
		var attribute = Cell.attributes[i];
		var topLeftValue = cellArray[topY][leftX].getAttribute(attribute);
		var topRightValue = cellArray[topY][rightX].getAttribute(attribute);
		var bottomLeftValue = cellArray[bottomY][leftX].getAttribute(attribute);
		var bottomRightValue = cellArray[bottomY][rightX].getAttribute(attribute);
		
		var topValue = valueInterpolate(topLeftValue, topRightValue, uInterpol);
		var bottomValue = valueInterpolate(bottomLeftValue, bottomRightValue, uInterpol);
		
		var result = valueInterpolate(topValue, bottomValue, vInterpol);
		
		resultCell.setAttribute(attribute, result, false);
	}
}

StageMorph.prototype.getCellFromNumber = function(n)
{
    return this.cells[Math.floor(n / this.cellsX)][n % this.cellsX];
}

StageMorph.prototype.createECT = function(from, to)
{
    //To & From are inclusive bounds.
    if (to - from > 1)
    {
        var midpoint = Math.floor((from + to) / 2);
        return new EmptyCellTree(
            this.createECT(from, midpoint),
            this.createECT(midpoint + 1, to));
    }
    else
    {
        if (from == to)
            return new EmptyCellTree(
                this.getCellFromNumber(from),
                null
            );
        else
            return new EmptyCellTree(
                this.getCellFromNumber(from),
                this.getCellFromNumber(to)
            );
    }
}

StageMorph.prototype.updateCells = function ()
{
	var oldCells = null;
	var oldCellsX = 0;
	var oldCellsY = 0;
	if (this.cells != undefined && this.cells != null && this.cells.length > 0)
	{
		oldCells = this.cells;
		oldCellsY = oldCells.length;
		oldCellsX = oldCells[0].length;
	}
	
	var newCellsX = this.cellsX, newCellsY = this.cellsY;
	if (oldCellsY == newCellsY && oldCellsX == newCellsX) {
		return;
	}
	
	var newCells = [];
	for (var y=0; y<newCellsY; y++)
	{
		var newRow = []
		for (var x=0; x<newCellsX; x++)
		{
			newRow.push(new Cell(x,y, this));
		}
		newCells.push(newRow);
	}
	
	if (oldCells != null)
	{
		for (var y=0; y<newCellsY; y++)
		{
			for (var x=0; x<newCellsX; x++)
			{
				cellInterpolate(newCells[y][x], oldCells, oldCellsX, oldCellsY, (x + 0.5) / newCellsX, (y + 0.5) / newCellsY);
			}	
		}
	}
	
	this.cells = newCells;
	this.emptyCellTree = this.createECT(0, this.cellsX * this.cellsY - 1);
	
	for (var i=0; i<this.children.length; i++)
	{
		var child = this.children[i];
		if (child instanceof SpriteMorph)
		{
			child.currentCell = null;
			child.updateCurrentCell();
		}
	}
	
	this.dirtyEntireStage();
}

StageMorph.prototype.superInit = StageMorph.prototype.init;
StageMorph.prototype.init = function (globals) {
	this.superInit(globals);
	this.cellsX = 40;
	this.cellsY = 30;
	this.drawGrid = true;
	this.cells = [];
	this.strokeSize = 2;
	this.strokeHardness = 0.5;
	this.strokeValue = 10;
	this.updateCells();
}

StageMorph.prototype.changeCellCount = function(newX, newY)
{
	this.cellsX = newX;
	this.cellsY = newY;
	this.updateCells();
}

StageMorph.prototype.cellWidth  = function() { return this.bounds.width()  / this.cellsX; }
StageMorph.prototype.cellHeight = function() { return this.bounds.height() / this.cellsY; }

StageMorph.prototype.dirtyCellAt = function(x, y)
{
	var cellWidth = this.cellWidth();
	var cellHeight = this.cellHeight();
    this.world().broken.push(
        new Rectangle(
			this.bounds.left() + cellWidth * x,
			this.bounds.top() + cellHeight * y,
			this.bounds.left() + cellWidth * (x+1),
			this.bounds.top() + cellHeight * (y+1)).spread());
}

StageMorph.prototype.dirtyEntireStage = function()
{
	var world = this.world();
	if (world == null)
		return;
	if (world.broken == null)
		return;
    world.broken.push(this.bounds.spread());
}

StageMorph.prototype.visibleAttributes = [];

StageMorph.prototype.toggleCellAttributeVisibility = function(name)
{
	this.dirtyEntireStage();
	
	for (var i=0; i<this.visibleAttributes.length; i++)
	{
		if (this.visibleAttributes[i] == name)
		{
			this.visibleAttributes.splice(i, 1);
			this.dirtyEntireStage();
			return;
		}
	}
	this.visibleAttributes.push(name);
	this.dirtyEntireStage();
}

StageMorph.prototype.setCellAttributeVisibility = function(name, val)
{
	for (var i=0; i<this.visibleAttributes.length; i++)
	{
		if (this.visibleAttributes[i] == name)
		{
			if (!val)
			{
				this.visibleAttributes.splice(i, 1);
				this.dirtyEntireStage();
			}
			return;
		}
	}
	if (val)
	{
		this.visibleAttributes.push(name);
		this.dirtyEntireStage();
	}
}

StageMorph.prototype.getCellAttributeVisibility = function(name)
{
	for (var i=0; i<this.visibleAttributes.length; i++)
	{
		if (this.visibleAttributes[i] == name)
		{
			return true;
		}
	}
	return false;
}

StageMorph.prototype.getCellPositionAt = function(pointOrX, y)
{
	if (pointOrX instanceof Point)
	{
		return this.getCellPositionAt(pointOrX.x, pointOrX.y);
	}
	else
	{
		var cellX = (pointOrX - this.bounds.left()) / this.bounds.width() * this.cellsX;
		var cellY = (y - this.bounds.top()) / this.bounds.height() * this.cellsY;
		if (cellX < this.cellsX && cellX >= 0 && cellY < this.cellsY && cellY >= 0)
			return new Point(cellX, cellY);
		return null;
	}
}

/*
** Converts annoying stage coordinates ([-240,240],[-180,180]) to normal screen coordinates 
*/
StageMorph.prototype.normalizeCoordinates = function(pointOrX, y)
{
	var x;
	if (pointOrX instanceof Point) 
	{
		x = pointOrX.x;
		y = pointOrX.y;
	}
	else
	{
		x = pointOrX;
	}
	return new Point(
		(x / 240 / 2 + 0.5) * this.width() + this.left(),
		(-y / 180 / 2 + 0.5) * this.height() + this.top());
}


StageMorph.prototype.getCellAtCellCoords = function(pointOrCX, cy)
{
	var cx;
	if (pointOrCX instanceof Point) 
	{
		cx = pointOrCX.x;
		cy = pointOrCX.y;
	}
	else
	{
		cx = pointOrCX;
	}
	cx = Math.floor(cx);
	cy = Math.floor(cy);
	if (cx < 0 || cx >= this.cellsX || cy < 0 || cy >= this.cellsY)
		return null;
	return this.cells[cy][cx];
}

StageMorph.prototype.getCellAtStageCoords = function(pointOrX, y)
{
	return this.getCellAt(this.normalizeCoordinates(pointOrX, y));
}

StageMorph.prototype.getCellAt = function(pointOrX, y)
{
    var point = this.getCellPositionAt(pointOrX, y);
    
	if (point == null)
	{
		return null;
	}
	else
	{
		return this.cells[Math.floor(point.y)][Math.floor(point.x)];
	}
}

StageMorph.prototype.superDrawOn = StageMorph.prototype.drawOn;
StageMorph.prototype.drawOn = function (aCanvas, aRect) {
	var retnVal = this.superDrawOn(aCanvas, aRect);
    if (this.drawGrid)
	{
		var rectangle, area;
		if (!this.isVisible) {
			return null;
		}
		rectangle = aRect || this.bounds;
		area = rectangle.intersect(this.bounds).round();
		if (area.extent().gt(new Point(0, 0))) {
			var ctx = aCanvas.getContext('2d');
			
			ctx.save();
			
			ctx.beginPath();
			ctx.rect(area.left(), area.top(), area.width(), area.height());
			ctx.clip();
			
			var cellWidth = this.cellWidth();
			var cellHeight = this.cellHeight();
			var startCellX = Math.floor((area.left()-this.bounds.left())/cellWidth);
			var endCellX = Math.ceil((area.right()-this.bounds.left())/cellWidth);
			var startX = startCellX*cellWidth + this.bounds.left();
			var startCellY = Math.floor((area.top()-this.bounds.top())/cellHeight);
			var endCellY = Math.ceil((area.bottom()-this.bounds.top())/cellHeight);
			var startY = startCellY*cellHeight + this.bounds.top();
			
			//Draw cells
			if (this.cells != undefined && this.cells != null)
			{
				for (var y=startCellY; y<endCellY; y++)
				{
					var cellRow = this.cells[y];
					if (cellRow == null || cellRow == undefined)
						break;
					for (var x=startCellX; x<endCellX; x++)
					{
						var cell = cellRow[x];
						if (cell == null || cell == undefined)
							break;
							
						for (var i=0; i<this.visibleAttributes.length; i++)
						{
							var value = cell.getAttribute(this.visibleAttributes[i]);
							if (value > 0)
							{
								ctx.beginPath();
								ctx.rect(x*cellWidth + this.bounds.left() + 1, y*cellHeight + this.bounds.top() + 1, cellWidth - 1, cellHeight - 1);
								var col = Cell.attributeColours[this.visibleAttributes[i]];
								var dr = Cell.attributeDrawRange[this.visibleAttributes[i]];
								var alp = (value - dr[0]) / (dr[1] - dr[0]);
								if (alp > 1) alp = 1;
								if (alp < 0) alp = 0;
								ctx.fillStyle = 'rgba('+Math.round(col.r)+','+Math.round(col.g)+','+Math.round(col.b)+',' + alp.toFixed(4) + ')';
								ctx.fill();
							}
						}
					}
				}
			}
			
			//Draw grid
			ctx.lineWidth = 1;
			ctx.strokeStyle = "rgba(0,0,0,0.25)";
			ctx.beginPath();
			for (var x=startX; x<area.right(); x+=cellWidth)
			{
				ctx.moveTo(x+0.5, area.top());
				ctx.lineTo(x+0.5, area.bottom());
			}
			for (var y=startY; y<area.bottom(); y+=cellHeight)
			{
				ctx.moveTo(area.left(), y+0.5);
				ctx.lineTo(area.right(), y+0.5);
			}
			ctx.stroke();
			
			ctx.restore();
		}
	}
	
	return retnVal;
};

//This is the cell attribute draw tool
StageMorph.prototype.drawTool = false;

StageMorph.prototype.uberMouseDownLeft = StageMorph.prototype.mouseDownLeft;
StageMorph.prototype.mouseDownLeft = function()
{
    if (this.drawTool)
    {
        var worldhand = this.world().hand;
        this.previousPoint = new Point(worldhand.bounds.origin.x, worldhand.bounds.origin.y);
    }
	if (this.uberMouseDownLeft)
		return this.uberMouseDownLeft();
}

/*
** Many thanks to Grumdrig (http://stackoverflow.com/users/167531/grumdrig) from StackOverflow.com for this snippet
** http://stackoverflow.com/questions/849211/shortest-distance-between-a-point-and-a-line-segment
**
** BEGIN SNIPPET
*/
function sqr(x) { return x * x }
function dist2(v, w) { return sqr(v.x - w.x) + sqr(v.y - w.y) }
function distToSegmentSquared(p, v, w) {
  var l2 = dist2(v, w);
  if (l2 == 0) return dist2(p, v);
  var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
  if (t < 0) return dist2(p, v);
  if (t > 1) return dist2(p, w);
  return dist2(p, { x: v.x + t * (w.x - v.x),
                    y: v.y + t * (w.y - v.y) });
}
function distToSegment(p, v, w) { return Math.sqrt(distToSegmentSquared(p, v, w)); }
/*
** END SNIPPET
*/

/*
 * Override for the default implementation of StageMorph.mouseDownLeft
 * 
 * Called to draw if the pen is in use
 */
StageMorph.prototype.mouseMove = function(point)
{
    if (this.drawTool && this.world().hand.mouseButton === "left")
    {
        var previous = this.getCellPositionAt(this.previousPoint);
        var next = this.getCellPositionAt(point);
        if (previous != null && next != null)
        {
			var strokeDecayWidth = Math.max(0, this.strokeSize);
			var strokeFullWidth = strokeDecayWidth * Math.max(0, Math.min(1, this.strokeHardness));
			var drawAttribute = this.parentThatIsA(IDE_Morph).attributeSelector.getValue();
			
			if (strokeDecayWidth < strokeFullWidth)
				strokeFullWidth = strokeDecayWidth;
			
			var strokeGrad = 1 / (strokeFullWidth - strokeDecayWidth);
			var strokeXIntercept = strokeDecayWidth;
			
			var minX, minY, maxX, maxY;
			
			if (previous.x < next.x) {
				minX = previous.x - strokeDecayWidth;
				maxX = next.x + strokeDecayWidth;
			} else {
				minX = next.x - strokeDecayWidth;
				maxX = previous.x + strokeDecayWidth;
			}
			
			if (previous.y < next.y) {
				minY = previous.y - strokeDecayWidth;
				maxY = next.y + strokeDecayWidth;
			} else {
				minY = next.y - strokeDecayWidth;
				maxY = previous.y + strokeDecayWidth;
			}
			
			minX = Math.floor(minX);
			minY = Math.floor(minY);
			maxX = Math.ceil(maxX);
			maxY = Math.ceil(maxY);
			
			minX  = Math.max(0, Math.min(this.cellsX-1, minX));
			minY = Math.max(0, Math.min(this.cellsY-1, minY));
			maxX = Math.max(0, Math.min(this.cellsX-1, maxX));
			maxY = Math.max(0, Math.min(this.cellsY-1, maxY));
			
            for (var y=minY; y<=maxY; y++)
            {
                for (var x=minX; x<=maxX; x++)
                {
                    var cell = this.cells[y][x];
					var lineWidth = previous.x - next.x;
					var lineHeight = previous.y - next.y;
					var distanceToLine = distToSegment({x: x + 0.5, y: y + 0.5}, previous, next); 
					var alpha;
					if (this.strokeHardness == 1)
					{
						if (distanceToLine < strokeFullWidth)
							alpha = 1;
						else
							alpha = 0;
					}
					else
					{
						alpha = Math.min(1, (distanceToLine - strokeXIntercept) * strokeGrad);
					}
		            if (alpha > 0 && cell != null)
		            {
						var newValue = cell.getAttribute(drawAttribute) * (1 - alpha) + this.strokeValue * alpha;
						cell.setAttribute(drawAttribute, newValue);
		            }
                }
            }
        }
    }
    
    this.previousPoint = new Point(point.x, point.y);
}

SpriteMorph.prototype.createCellularClone = function()
{
	var clone = this.fullCopy();
	clone.parentSprite = this.parentSprite || this;
	clone.scripts = this.scripts;
	clone.name = '';
	clone.parentSprite.cloneCreated();
	
    clone.customBlocks = this.customBlocks;
    clone.costumes = this.costumes;
	clone.sounds = this.sounds;
	clone.isDraggable = true;
	
	return clone;
}
SpriteMorph.prototype.cloneCount = 0;
SpriteMorph.prototype.cloneCreated = function()
{
	this.cloneCount++;
	if (this.spriteIconMorph)
		this.spriteIconMorph.updateDuplicator();
}

SpriteMorph.prototype.cloneDestroyed = function()
{
	this.cloneCount--;
	if (this.spriteIconMorph)
		this.spriteIconMorph.updateDuplicator();
}

SpriteMorph.prototype.uberDrawOn = SpriteMorph.prototype.drawOn;
SpriteMorph.prototype.drawOn =
function (aCanvas, aRect) 
	{
	if (this.parentSprite != null) {
		return this.uberDrawOn(aCanvas, aRect); 
	}
};
SpriteMorph.prototype.uberDrawNew = SpriteMorph.prototype.drawNew;
SpriteMorph.prototype.drawNew = 
function ()
{
	if (this.parentSprite != null)
	{
		return this.uberDrawNew();
	}
};

//By default every sprite is a prototype
//When we make a clone, we set this field 
//to the parent sprite so we can tell who came from where
SpriteMorph.prototype.parentSprite = null;
SpriteMorph.prototype.shouldPerformEvents = function() { return this.parentSprite != null; };

//Prevent any events from being called on sprites that should not perform events.
//We have a final check being done in the ThreadManager, but this shouldn't be the first
//defence since it returns null in a function that previously did not.

//We override double check at the start of the following functions:
SpriteMorph.prototype.uberMouseClickLeft = SpriteMorph.prototype.mouseClickLeft;
SpriteMorph.prototype.mouseClickLeft = function() {
	if (!this.shouldPerformEvents())
		return [];
	return this.uberMouseClickLeft();
};

function removeNulls(array)
{
	if (array instanceof Array)
	{
		for (var i=0; i<array.length; i++)
		{
			if (array[i] == null)
			{
				array.splice(i,1);
				i--;
			}
		}
	}
	return array;
};

//Here, we just remove the null processes from what uberX returns, to avoid copy/paste.
StageMorph.prototype.uberFireKeyEvent = StageMorph.prototype.fireKeyEvent;
StageMorph.prototype.fireKeyEvent = function (key) {
	return removeNulls(this.uberFireKeyEvent(key));
};

StageMorph.prototype.uberFireGreenFlagEvent = StageMorph.prototype.fireGreenFlagEvent;
StageMorph.prototype.fireGreenFlagEvent = function () {
	return removeNulls(this.uberFireGreenFlagEvent());
};

//This ones a bit more complex, since we want to override that functionality anyway.
SpriteMorph.prototype.createClone = function () {
    var stage = this.parentThatIsA(StageMorph);
    if (stage) {
        var clone = this.createCellularClone();
		stage.add(clone);
        var hats = clone.allHatBlocksFor('__clone__init__');
        hats.forEach(function (block) {
            stage.threads.startProcess(block, clone, stage.isThreadSafe);
        });
		return clone;
    }
};

SpriteMorph.prototype.removeClone = function () {
	if (this.removed)
		return;
	this.removed = true;
	this.parent.threads.stopAllForReceiver(this);
	this.parentSprite.cloneDestroyed();
	this.destroy();
};

SpriteMorph.prototype.uberInit = SpriteMorph.prototype.init;
SpriteMorph.prototype.init = function(globals)
{
	this.uberInit(globals);
	this.isDraggable = false;
}

Process.prototype.uberDoBroadcast = Process.prototype.doBroadcast;
Process.prototype.doBroadcast = function (message) {
	return removeNulls(this.uberDoBroadcast(message));
};

//InputSlotMorph.prototype.reactToSliderEdit also runs blocks but does not use the
//return value of startProcess so we will not deal with it here.

/*********************************************************************/
/****************************** STATICS ******************************/
/*********************************************************************/
//Snap has already called initBlocks before we had a chance to modify it. We call addCellularBlocks 
//to add the new blocks.
SpriteMorph.prototype.addCellularBlocks();