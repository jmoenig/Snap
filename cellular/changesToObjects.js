modules.cellularObjects = '2013-November-28';

/*********************************************************************/
/***************************** HELPERS *******************************/
/*********************************************************************/

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


/*********************************************************************/
/******************************* HOOKS *******************************/
/*********************************************************************/

/*
** This is where we add the new palettes and colours.
*/
SpriteMorph.prototype.categories.push("cells");
SpriteMorph.prototype.categories.push("objects");
SpriteMorph.prototype.categories.push("neighbours");

SpriteMorph.prototype.blockColor.cells = new Color(150, 200, 150);
SpriteMorph.prototype.blockColor.objects = new Color(150, 150, 200);
SpriteMorph.prototype.blockColor.neighbours = new Color(200, 150, 150);

/*
** This modifies the block for selector function (It gets the actual block class instance
** from a description) to apply the "arrow" style when required.
*/
SpriteMorph.prototype.uberBlockForSelector = SpriteMorph.prototype.blockForSelector;
SpriteMorph.prototype.blockForSelector = function (selector, setDefaults) {
	var block = this.uberBlockForSelector(selector, setDefaults);
	if (block instanceof ReporterBlockMorph)
	{
		block.isArrow = this.blocks[selector].type === 'arrow';
	}
	return block;
};

/*
** A helper function to divide up some of the work.
**
** It just creates the buttons under the "Cells"
** pallette that allow you to edit the cell attributes.
*/
function addCellAttributeButtons(blocks, block, cat, helpMenu)
{
	var myself = this;
	
	//First we add the "add Attribute" button
	var button = new PushButtonMorph(
		null,
		function () {
			new CellAttributeDialogMorph(
				null,
				function (pair) {
					if (pair) {
						if (!Cell.addAttribute(pair[0]))
							return;
						//Reset the cells pallette so it makes the new attribute appear
						
						destroyPalletteCache(myself instanceof StageMorph ? myself : myself.parentThatIsA(StageMorph), cat);
						
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
}

/*
** This is where all the new blocks are added to the sprite pallette.
*/
SpriteMorph.prototype.scribbleHookBlockTemplates = SpriteMorph.prototype.snapappsHookBlockTemplates;
SpriteMorph.prototype.snapappsHookBlockTemplates = function(blocks, block, cat, helpMenu)
{
	var myself = this;
	if (cat == "cells")
	{
		addCellAttributeButtons.call(this, blocks, block, cat, helpMenu);
		
		blocks.push('-');
		blocks.push(block('reportCellsX'));
		blocks.push(block('reportCellsY'));
		
		if (Cell.attributes.length > 0) {
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
	else if (cat == 'neighbours')
	{
		blocks.push(block("objectInCellDir"));
		blocks.push(block("objectInCellCell"));
		blocks.push(block("objectInCellReal"));
		blocks.push('-');
		blocks.push(block("allObjectsInCellDir"));
		blocks.push(block("allObjectsInCellCell"));
		blocks.push(block("allObjectsInCellReal"));
		blocks.push('-');
		blocks.push(block("allObjectsInNbrCells"));
		blocks.push(block("numFilledNbrCells"));
	}
	return this.scribbleHookBlockTemplates(blocks, block, cat);
}

/*
** This is where all the new blocks are added to the sprite pallette.
*/
StageMorph.prototype.scribbleHookBlockTemplates = StageMorph.prototype.snapappsHookBlockTemplates;
StageMorph.prototype.snapappsHookBlockTemplates = function(blocks, block, cat, helpMenu)
{
	var myself = this;
	if (cat == "cells")
	{
		addCellAttributeButtons.call(this, blocks, block, cat, helpMenu);
		
		blocks.push('-');
		blocks.push(block('reportCellsX'));
		blocks.push(block('reportCellsY'));
		
		if (Cell.attributes.length > 0) {
			blocks.push('-');
			blocks.push(block('showCellAttribute'));
			blocks.push(block('hideCellAttribute'));
			blocks.push('-');
			blocks.push(block('getCellAttribute'));
			blocks.push(block('getCellAttributeCell'));
			blocks.push('-');
			blocks.push(block('getCellAttributeAverage'));
			blocks.push(block('getCellAttributeMaximum'));
			blocks.push(block('getCellAttributeMinimum'));
			blocks.push('-');
			blocks.push(block('setCellAttribute'));
			blocks.push(block('setCellAttributeCell'));
			blocks.push(block('setCellAttributeEverywhere'));
			blocks.push('-');
			blocks.push(block('changeCellAttribute'));
			blocks.push(block('changeCellAttributeCell'));
			blocks.push(block('changeCellAttributeEverywhere'));
		}
	}
	else if (cat == 'control')
	{
		blocks.splice(blocks.length - 3, 0, block('getLastClone'));
		blocks.push('-');
		blocks.push(block('instanceCount'));
	}
	else if (cat == 'objects')
	{
		blocks.push(block('reportNobody'));
		blocks.push('-');
		blocks.push(block('isNobody'));
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
	else if (cat == 'neighbours')
	{
		blocks.push(block("objectInCellCell"));
		blocks.push(block("objectInCellReal"));
		blocks.push('-');
		blocks.push(block("allObjectsInCellCell"));
		blocks.push(block("allObjectsInCellReal"));
	}
	
	if (this.scribbleHookBlockTemplates)
		return this.scribbleHookBlockTemplates(blocks, block, cat);
}

/*
** This clears all the pallete caches (a cache of all the block objects 
** that appear to be dragged in) for the IDE. 
*/
function destroyPalletteCache(stage, cat)
{
	for (var i=0; i<stage.children.length; i++)
	{
		var ii = stage.children[i];
		if (ii instanceof SpriteMorph)
		{
			ii.blocksCache[cat] = null;
			ii.paletteCache[cat] = null;
		}
	}
	stage.blocksCache[cat] = null;
	stage.paletteCache[cat] = null;
}

/*
** Run when the delete cell attribute button is pressed in the 
** Cells pallette. 
*/
SpriteMorph.prototype.deleteCellAttribute = function(name)
{
	this.parentThatIsA(StageMorph).deleteCellAttribute(name);
}

/*
** Removes a cell attribute, refreshes block palette.
*/
StageMorph.prototype.deleteCellAttribute = function(name)
{
	for (var i=0; i<Cell.attributes.length; i++)
	{
		if (Cell.attributes[i] == name)
		{
			Cell.attributes.splice(i, 1);
			
			destroyPalletteCache(this, "cells");
			
			var ide = this.parentThatIsA(IDE_Morph);
			ide.refreshPalette();
			ide.refreshCellAttributes();
			ide.stage.setCellAttributeVisibility(name, false);
			return;
		}
	}
}

/*
** This is the function that creates all the block "selectors".
** We add our selectors in here
*/
SpriteMorph.prototype.uberInitBlocks = SpriteMorph.prototype.initBlocks;
SpriteMorph.prototype.initBlocks = function () {
	this.uberInitBlocks();
	this.addCellularBlocks();
}

/*
** This is where the block "selectors" go. 
*/
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
	SpriteMorph.prototype.blocks.reportCellsX = {
		type: 'reporter',
		category: 'cells',
		spec: 'cells X',
	};
	
	SpriteMorph.prototype.blocks.reportCellsY = {
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
	
	//neighbours
	SpriteMorph.prototype.blocks.objectInCellDir = {
		type: 'arrow',
		category: 'neighbours',
		spec: 'object in cell %celldir',
	};
	SpriteMorph.prototype.blocks.objectInCellCell = {
		type: 'arrow',
		category: 'neighbours',
		spec: 'object in cell cellX: %n cellY: %n',
	};
	SpriteMorph.prototype.blocks.objectInCellReal = {
		type: 'arrow',
		category: 'neighbours',
		spec: 'object in cell x: %n y: %n',
	};
	SpriteMorph.prototype.blocks.allObjectsInCellDir = {
		type: 'reporter',
		category: 'neighbours',
		spec: 'objects in cell %celldir',
	};
	SpriteMorph.prototype.blocks.allObjectsInCellCell = {
		type: 'reporter',
		category: 'neighbours',
		spec: 'objects in cell cellX: %n cellY: %n',
	};
	SpriteMorph.prototype.blocks.allObjectsInCellReal = {
		type: 'reporter',
		category: 'neighbours',
		spec: 'objects in cell x: %n y: %n',
	};
	SpriteMorph.prototype.blocks.allObjectsInNbrCells = {
		type: 'reporter',
		category: 'neighbours',
		spec: 'objects in nbr cells',
	};
	SpriteMorph.prototype.blocks.numFilledNbrCells = {
		type: 'reporter',
		category: 'neighbours',
		spec: 'num filled nbr cells',
	};
}


/*********************************************************************/
/**************************** BLOCK LOGIC ****************************/
/** This is where we store the implementations for the above blocks. */
/*********************************************************************/

/*
** Some constants for the object blocks.
*/
var NOT_AN_OBJECT = "Not an object!";
var NOBODY = "Nobody";

SpriteMorph.prototype.setObjectPosition = function(otherObject, x, y) { 
	return this.parentThatIsA(StageMorph).setObjectPosition(otherObject, x, y); 
}
StageMorph.prototype.setObjectPosition = function(otherObject, x, y)
{
	if (otherObject instanceof SpriteMorph)
		otherObject.gotoXY(x, y);
}

SpriteMorph.prototype.setObjectCellPosition = function(otherObject, x, y) { 
	return this.parentThatIsA(StageMorph).setObjectCellPosition(otherObject, x, y); 
}
StageMorph.prototype.setObjectCellPosition = function(otherObject, x, y)
{
	if (otherObject instanceof SpriteMorph)
		otherObject.moveToCell(x, y);
}

SpriteMorph.prototype.getObjectCellX = function(otherObject) { 
	return this.parentThatIsA(StageMorph).getObjectCellX(otherObject); 
}
StageMorph.prototype.getObjectCellX = function(otherObject)
{
	if (otherObject instanceof SpriteMorph)
		return otherObject.cellX();
	if (otherObject === null)
		return NOBODY;
	return NOT_AN_OBJECT;
}

SpriteMorph.prototype.getObjectCellY = function(otherObject) { 
	return this.parentThatIsA(StageMorph).getObjectCellY(otherObject); 
}
StageMorph.prototype.getObjectCellY = function(otherObject)
{
	if (otherObject instanceof SpriteMorph)
		return otherObject.cellY();
	if (otherObject === null)
		return NOBODY;
	return NOT_AN_OBJECT;
}

SpriteMorph.prototype.getObjectX = function(otherObject) { 
	return this.parentThatIsA(StageMorph).getObjectX(otherObject); 
}
StageMorph.prototype.getObjectX = function(otherObject)
{
	if (otherObject instanceof SpriteMorph)
		return otherObject.xPosition();
	if (otherObject === null)
		return NOBODY;
	return NOT_AN_OBJECT;
}

SpriteMorph.prototype.getObjectY = function(otherObject) { 
	return this.parentThatIsA(StageMorph).getObjectY(otherObject); 
}
StageMorph.prototype.getObjectY = function(otherObject)
{
	if (otherObject instanceof SpriteMorph)
		return otherObject.yPosition();
	if (otherObject === null)
		return NOBODY;
	return NOT_AN_OBJECT;
}

SpriteMorph.prototype.obliterate = function(otherObject) { 
	return this.parentThatIsA(StageMorph).obliterate(otherObject); 
}
StageMorph.prototype.listOfAllClones = function(otherObjectName)
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

SpriteMorph.prototype.obliterate = function(otherObject) { 
	return this.parentThatIsA(StageMorph).obliterate(otherObject); 
}
StageMorph.prototype.obliterate = function(otherObject)
{
	if (otherObject instanceof SpriteMorph)
	{
		otherObject.removeClone();
	}
}

SpriteMorph.prototype.objectIsA = function(otherObject) { 
	return this.parentThatIsA(StageMorph).objectIsA(otherObject); 
}
StageMorph.prototype.objectIsA = function(otherObject, spriteMorph)
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

SpriteMorph.prototype.getTypeName = function(otherObject) { 
	return this.parentThatIsA(StageMorph).getTypeName(otherObject); 
}
StageMorph.prototype.getTypeName = function(otherObject)
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

SpriteMorph.prototype.getCostumeNameObject = function(otherObject) { 
	return this.parentThatIsA(StageMorph).getCostumeNameObject(otherObject); 
}
StageMorph.prototype.getCostumeNameObject = function(otherObject)
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

SpriteMorph.prototype.reportNobody = function() { 
	return this.parentThatIsA(StageMorph).reportNobody(); 
}
StageMorph.prototype.reportNobody = function()
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

SpriteMorph.prototype.isNobody = function(x) { 
	return this.parentThatIsA(StageMorph).isNobody(x); 
}
StageMorph.prototype.isNobody = function(x)
{
	return x == null;
}

SpriteMorph.prototype.setVariable = function(n,v,x) { 
	return this.parentThatIsA(StageMorph).getVariable(n,v,x); 
}
StageMorph.prototype.setVariable = function(n,v,x)
{
	if (x instanceof SpriteMorph)
	{
		x.variables.setVar(n, v);
	}
}

SpriteMorph.prototype.getVariable = function(n,x) { 
	return this.parentThatIsA(StageMorph).getVariable(n,x); 
}
StageMorph.prototype.getVariable = function(n,x)
{
	if (x instanceof SpriteMorph)
	{
		return x.variables.getVar(n);
	}
	return 42;
}

SpriteMorph.prototype.changeVariable = function(n,v,x) { 
	return this.parentThatIsA(StageMorph).changeVariable(n,v,x); 
}
StageMorph.prototype.changeVariable = function(n,v,x)
{
	if (x instanceof SpriteMorph)
	{
		return x.variables.setVar(n, v + x.variables.getVar(n));
	}
}

SpriteMorph.prototype.changeCellAttributeCell = function(attribute, cx, cy, value) { return this.parentThatIsA(StageMorph).changeCellAttributeCell(attribute, cx, cy, value); }
StageMorph.prototype.changeCellAttributeCell = function(attribute, cx, cy, value)
{
	var cell = this.getCellAtCellCoords(cx,cy);
	if (!cell)
		return;
	cell.setAttribute(attribute, cell.getAttribute(attribute) + value);
}

SpriteMorph.prototype.changeCellAttributeEverywhere = function(attribute, value) { return this.parentThatIsA(StageMorph).changeCellAttributeEverywhere(attribute, value); }
StageMorph.prototype.changeCellAttributeEverywhere = function(attribute, value)
{
	var cells = this.cells;
	
	for (var i=0; i<cells.length; i++)
	{
		for (var j=0; j<cells[i].length; j++)
		{
			cells[i][j].setAttribute(attribute, cells[i][j].getAttribute(attribute) + value);
		}
	}
}

SpriteMorph.prototype.changeCellAttribute = function(attribute, x, y, value) { return this.parentThatIsA(StageMorph).changeCellAttribute(attribute, x, y, value); }
StageMorph.prototype.changeCellAttribute = function(attribute, x, y, value)
{
	var cell = this.getCellAtStageCoords(x,y);
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

SpriteMorph.prototype.setCellAttributeCell = function(attribute, cx, cy, value) { return this.parentThatIsA(StageMorph).setCellAttributeCell(attribute, cx, cy, value); }
StageMorph.prototype.setCellAttributeCell = function(attribute, cx, cy, value)
{
	var cell = this.getCellAtCellCoords(cx,cy);
	if (!cell)
		return;
	cell.setAttribute(attribute, value);
}

SpriteMorph.prototype.setCellAttribute = function(attribute, x, y, value) { return this.parentThatIsA(StageMorph).setCellAttribute(attribute, x, y, value); }
StageMorph.prototype.setCellAttribute = function(attribute, x, y, value)
{
	var cell = this.getCellAtStageCoords(x,y);
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

SpriteMorph.prototype.setCellAttributeEverywhere = function(attribute, value) { return this.parentThatIsA(StageMorph).setCellAttributeEverywhere(attribute, value); }
StageMorph.prototype.setCellAttributeEverywhere = function(attribute, value)
{
	var cells = this.cells;
	for (var i=0; i<cells.length; i++)
	{
		for (var j=0; j<cells[i].length; j++)
		{
			cells[i][j].setAttribute(attribute, value);
		}
	}
}

SpriteMorph.prototype.getCellAttributeCell = function(attribute, cx, cy) { return this.parentThatIsA(StageMorph).getCellAttributeCell(attribute, cx, cy); }
StageMorph.prototype.getCellAttributeCell = function(attribute, cx, cy)
{
	var cell = this.getCellAtCellCoords(cx, cy);
	if (!cell)
		return 0;
	return cell.getAttribute(attribute);
}

SpriteMorph.prototype.getCellAttribute = function(attribute, x, y) { return this.parentThatIsA(StageMorph).getCellAttribute(attribute, x, y); }
StageMorph.prototype.getCellAttribute = function(attribute, x, y)
{
	var cell = this.getCellAtStageCoords(x,y);
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

SpriteMorph.prototype.getCellAttributeAverage = function(attribute) { return this.parentThatIsA(StageMorph).getCellAttributeAverage(attribute); }
StageMorph.prototype.getCellAttributeAverage = function(attribute)
{
	var cells = this.cells;
	var total = 0;
	for (var i=0; i<this.cellsY; i++)
	{
		for (var j=0; j<this.cellsX; j++)
		{
			total += cells[i][j].getAttribute(attribute);
		}
	}
	return total / (this.cellsX * this.cellsY);
}

SpriteMorph.prototype.getCellAttributeMinimum = function(attribute) { return this.parentThatIsA(StageMorph).getCellAttributeMinimum(attribute); }
StageMorph.prototype.getCellAttributeMinimum = function(attribute)
{
	var cells = this.cells;
	var minimum = 0;
	for (var i=0; i<this.cellsY; i++)
	{
		for (var j=0; j<this.cellsX; j++)
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

SpriteMorph.prototype.getCellAttributeMaximum = function(attribute) { return this.parentThatIsA(StageMorph).getCellAttributeMaximum(attribute); }
StageMorph.prototype.getCellAttributeMaximum = function(attribute)
{
	var cells = this.cells;
	var maximum = 0;
	for (var i=0; i<this.cellsY; i++)
	{
		for (var j=0; j<this.cellsX; j++)
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

SpriteMorph.prototype.showCellAttribute = function(attribute) { return this.parentThatIsA(StageMorph).showCellAttribute(attribute); }
StageMorph.prototype.showCellAttribute = function(attribute)
{
	return this.setCellAttributeVisibility(attribute, true);
}

SpriteMorph.prototype.hideCellAttribute = function(attribute) { return this.parentThatIsA(StageMorph).hideCellAttribute(attribute); }
StageMorph.prototype.hideCellAttribute = function(attribute)
{
	return this.setCellAttributeVisibility(attribute, false);
}

SpriteMorph.prototype.reportCellsX = function() { return this.parentThatIsA(StageMorph).reportCellsX(); }
StageMorph.prototype.reportCellsX = function() {
	return this.cellsX;
}

SpriteMorph.prototype.reportCellsY = function() { return this.parentThatIsA(StageMorph).reportCellsY(); }
StageMorph.prototype.reportCellsY = function()
{
	return this.cellsY;
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

/*
** This function uses a tree (EmptyCellTree defined in cellular.js) to locate an empty cell.
** N is the cell you would like to get (out of the total number of empty cells)
*/
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

/*
** Some string to positions translations.
**
** Used in various of the below functions.
*/
var cellDirX = 
{
	'top left': -1,
	'above': 0,
	'top right': 1,
	'left': -1,
	'right': 1,
	'bottom left': -1,
	'below': 0,
	'bottom right': 1,
}

var cellDirY = 
{
	'top left': -1,
	'above': -1,
	'top right': -1,
	'left': 0,
	'right': 0,
	'bottom left': 1,
	'below': 1,
	'bottom right': 1,
}

SpriteMorph.prototype.objectInCellDir = function(cellDir)
{
	if (!cellDir || !cellDir[0])
		return null;
	var stage = this.parentThatIsA(StageMorph),
		cellPos = stage.screenToCellSpace(this.rotationCenter());
	
	cellPos.x += cellDirX[cellDir[0]];
	cellPos.y += cellDirY[cellDir[0]];
	
	var cell = stage.getCellAtCellCoords(cellPos);
	if (!cell)
		return null;
	if (cell.spriteMorphs.length == 0)
		return null;
	return cell.spriteMorphs[0];
}


SpriteMorph.prototype.objectInCellCell = function(cx, cy) { 
	return this.parentThatIsA(StageMorph).objectInCellCell(cx, cy); 
}
StageMorph.prototype.objectInCellCell = function(cx, cy)
{
	var stage = this.parentThatIsA(StageMorph);
	var cell = stage.getCellAtCellCoords(cx, cy);
	if (!cell)
		return null;
	if (cell.spriteMorphs.length == 0)
		return null;
	return cell.spriteMorphs[0];
}

SpriteMorph.prototype.objectInCellReal = function(x, y) { 
	return this.parentThatIsA(StageMorph).objectInCellReal(x, y); 
}
StageMorph.prototype.objectInCellReal = function(x, y)
{
	var stage = this.parentThatIsA(StageMorph);
	var cell = stage.getCellAt(stage.normalizeCoordinates(x, y));
	if (!cell)
		return null;
	if (cell.spriteMorphs.length == 0)
		return null;
	return cell.spriteMorphs[0];
}

SpriteMorph.prototype.allObjectsInCellDir = function(cellDir)
{
	if (!cellDir || !cellDir[0])
		return null;
	var stage = this.parentThatIsA(StageMorph),
		cellPos = stage.screenToCellSpace(this.rotationCenter());
	
	cellPos.x += cellDirX[cellDir[0]];
	cellPos.y += cellDirY[cellDir[0]];
	
	var cell = stage.getCellAtCellCoords(cellPos);
	if (!cell)
		return null;
	return new List(cell.spriteMorphs);
}

SpriteMorph.prototype.allObjectsInCellCell = function(cx, cy) { 
	return this.parentThatIsA(StageMorph).allObjectsInCellCell(cx, cy); 
}
StageMorph.prototype.allObjectsInCellCell = function(cx, cy)
{
	var stage = this.parentThatIsA(StageMorph);
	var cell = stage.getCellAtCellCoords(cx, cy);
	if (!cell)
		return null;
	return new List(cell.spriteMorphs);
}

SpriteMorph.prototype.allObjectsInCellReal = function(x, y) { 
	return this.parentThatIsA(StageMorph).allObjectsInCellReal(x, y); 
}
StageMorph.prototype.allObjectsInCellReal = function(x, y)
{
	var stage = this.parentThatIsA(StageMorph);
	var cell = stage.getCellAt(stage.normalizeCoordinates(x, y));
	if (!cell)
		return null;
	return new List(cell.spriteMorphs);
}

SpriteMorph.prototype.allObjectsInNbrCells = function()
{
	var stage = this.parentThatIsA(StageMorph),
		cellPos = stage.screenToCellSpace(this.rotationCenter()),
		objects = [];
	
	for (var i=-1; i<=1; i++)
	{
		for (var j=-1; j<=1; j++)
		{
			if (i == 0 && j == 0)
				continue;
			var cell = stage.getCellAtCellCoords(cellPos.x + i, cellPos.y + j);
			if (!cell)
				continue;
			objects = objects.concat(cell.spriteMorphs);
		}
	}
	return new List(objects);
}

SpriteMorph.prototype.numFilledNbrCells = function()
{
	var stage = this.parentThatIsA(StageMorph),
		cellPos = stage.screenToCellSpace(this.rotationCenter()),
		numFilled = 0;
	
	for (var i=-1; i<=1; i++)
	{
		for (var j=-1; j<=1; j++)
		{
			if (i == 0 && j == 0)
				continue;
			var cell = stage.getCellAtCellCoords(cellPos.x + i, cellPos.y + j);
			if (!cell)
				continue;
			if (cell.spriteMorphs.length != 0)
				numFilled++;
		}
	}
	return numFilled;
}

SpriteMorph.prototype.createClone = function () {
	var stage = this.parentThatIsA(StageMorph);
	if (stage) {
		var clone = this.createCellularClone();
		stage.add(clone);
		var hats = clone.allHatBlocksFor('__clone__init__');
		hats.forEach(function (block) {
			stage.threads.startProcess(block, stage.isThreadSafe, undefined, undefined, clone);
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

SpriteMorph.prototype.cellularScaler = 1.0;

SpriteMorph.prototype.uberGetScale = SpriteMorph.prototype.getScale;
SpriteMorph.prototype.getScale = function () {
	return this.uberGetScale() / this.cellularScaler;
};

SpriteMorph.prototype.uberSetScale = SpriteMorph.prototype.setScale;
SpriteMorph.prototype.setScale = function (percentage) {
	return this.uberSetScale(percentage * this.cellularScaler);
};

SpriteMorph.prototype.uberChangeScale = SpriteMorph.prototype.changeScale;
SpriteMorph.prototype.changeScale = function (delta) {
	return this.uberChangeScale(delta * this.cellularScaler);
};

/*********************************************************************/
/****************************** BACKEND ******************************/
/*********************************************************************/

/*
** Basic initialisation. 
*/
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

/*
** This keeps the cell data structures up to date when a sprite moves.
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

/*
** Below, we override some functions that deal with sprite movement in order to
** ensure updateCurrentCell() is called.
*/

SpriteMorph.prototype.uberExportSprite = SpriteMorph.prototype.exportSprite;
SpriteMorph.prototype.exportSprite = function () {
	if (this.isCoone) {return; }
	var ide = this.parentThatIsA(IDE_Morph);
	if (ide) {
		ide.exportSprite(this.parentSprite || this);
	}
};

SpriteMorph.prototype.uberEdit = SpriteMorph.prototype.edit;
SpriteMorph.prototype.edit = function () {
	var ide = this.parentThatIsA(IDE_Morph);
	if (ide && !ide.isAppMode) {
		ide.selectSprite(this.parentSprite || this);
	}
};

SpriteMorph.prototype.uberDuplicate = SpriteMorph.prototype.duplicate;
SpriteMorph.prototype.duplicate = function () {
	var ide = this.parentThatIsA(IDE_Morph);
	if (ide) {
		ide.duplicateSprite(this.parentSprite || this);
	}
};

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
** Linear interpolation function. Makes things a bit more readable.
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

/*
** Initializes the tree data structure used below.
*/
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

/*
** If the value of cellsX or cellsY changes, this function
** must be called.
*/
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

/*
** Gets the size that the default sprite morph sprite should be scaled by
*/
StageMorph.prototype.getScaleFactor = function()
{
	return 40 / this.cellsX * 0.4;
}

/*
** Alters the number of cells on the stage. Calls updateCells() for you.
*/
StageMorph.prototype.changeCellCount = function(newX, newY)
{
	this.cellsX = newX;
	this.cellsY = newY;
	this.updateCells();
}

/*
** Calculates the dimension of the cells and returns it.
*/
StageMorph.prototype.cellWidth  = function() { return this.bounds.width()  / this.cellsX; }
StageMorph.prototype.cellHeight = function() { return this.bounds.height() / this.cellsY; }

/*
** Used when a cell attribute changes. Adds the area that the cell occupies to a list 
** of rectangles that need to be re-drawn.
*/
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

/*
** Queues the entire stage for re-drawing.
*/
StageMorph.prototype.dirtyEntireStage = function()
{
	var world = this.world();
	if (world == null)
		return;
	if (world.broken == null)
		return;
	world.broken.push(this.bounds.spread());
}

StageMorph.prototype.visibleAttributes = ["CellAttr1"];

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

/*
** Converts a position in pixels to a position in cell coordinates.
*/
StageMorph.prototype.screenToCellSpace = function(pointOrX, y)
{
	if (pointOrX instanceof Point)
	{
		return this.screenToCellSpace(pointOrX.x, pointOrX.y);
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
** Gets a cell object at some cell coordinates.
*/
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
		if (!pointOrCX)
			return null;
		cx = pointOrCX;
	}
	cx = Math.floor(cx);
	cy = Math.floor(cy);
	if (cx < 0 || cx >= this.cellsX || cy < 0 || cy >= this.cellsY)
		return null;
	return this.cells[cy][cx];
}

/*
** Gets a cell object at stage coordinates. This is NOT the same as screen coordinates.
** This is the coordinate system that the user sees (using "x position" block, etc.)
*/
StageMorph.prototype.getCellAtStageCoords = function(pointOrX, y)
{
	return this.getCellAt(this.normalizeCoordinates(pointOrX, y));
}

/*
** Gets a cell object at screen coordinates.
*/
StageMorph.prototype.getCellAt = function(pointOrX, y)
{
	var point = this.screenToCellSpace(pointOrX, y);
	
	if (point == null)
	{
		return null;
	}
	else
	{
		return this.cells[Math.floor(point.y)][Math.floor(point.x)];
	}
}

/*
** Draws the cell grid.
*/
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

StageMorph.prototype.drawTool = false;

/*
** Override the mouseDownLeft callback to enable pen drawing.
*/
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
** Override the mouseMove callback to enable pen drawing.
*/
StageMorph.prototype.mouseMove = function(point)
{
	if (this.drawTool && this.world().hand.mouseButton === "left")
	{
		var previous = this.screenToCellSpace(this.previousPoint);
		var next = this.screenToCellSpace(point);
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
						cell.setAttribute(drawAttribute, newValue, false);
					}
				}
			}
			
			this.dirtyEntireStage();
		}
	}
	
	this.previousPoint = new Point(point.x, point.y);
}

/*
** This is how you create a cellular clone. 
** This is what we consider to be an instance of an object.
**
** You CANNOT use the default clone for SpriteMorph to do this.
*/
SpriteMorph.prototype.createCellularClone = function()
{
	var c = SpriteMorph.uber.fullCopy.call(this),
		arr = [],
		cb;

	c.stopTalking();
	c.color = this.color.copy();
	c.blocksCache = {};
	c.paletteCache = {};
	c.scripts = this.scripts;
	c.variables = this.variables.copy();
	c.variables.owner = c;
	c.parts = [];
	c.anchor = null;
	c.nestingScale = 1;
	c.rotatesWithAnchor = true;
	
	c.parentSprite = this.parentSprite || this;
	c.name = '';
	
	c.customBlocks = this.customBlocks;
	c.costumes = this.costumes;
	c.sounds = this.sounds;
	c.isDraggable = true;
	
	c.parentSprite.cloneCreated();
	
	return c;
}

/*
** Deals with the number of clones an object has
*/
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

/*
** Draws the sprite if it is a clone only (so there's no way to see
** a parent sprite)
*/
SpriteMorph.prototype.uberDrawOn = SpriteMorph.prototype.drawOn;
SpriteMorph.prototype.drawOn = function (aCanvas, aRect) 
{
	if (this.parentSprite != null) 
	{
		var stage = this.parentThatIsA(StageMorph);
		if (stage)
		{
			if (this.cellularScaler != stage.getScaleFactor())
			{
				var preScale = this.getScale();
				this.cellularScaler = stage.getScaleFactor();
				this.setScale(preScale);
			}
		}
		
		return this.uberDrawOn(aCanvas, aRect); 
	}
};

SpriteMorph.prototype.uberInit = SpriteMorph.prototype.init;
SpriteMorph.prototype.init = function(globals)
{
	this.uberInit(globals);
	this.isDraggable = false;
	this.areClonesDraggable = true;
}

/*
** By default every sprite is a prototype.
** When we make a clone, we set this field to 
** the parent sprite. This is how you know if
** a SpriteMorph is a clone or not, and how
** you know what the prototype object is.
*/
SpriteMorph.prototype.parentSprite = null;
SpriteMorph.prototype.shouldPerformEvents = function() { return this.parentSprite != null; };

//Prevent any events from being called on sprites that should not perform events.

//We have a final check being done in the ThreadManager (which deals with blocks being processed)
//but this shouldn't be the first defence.

//A helper
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

//We override double check at the start of the following functions:
SpriteMorph.prototype.uberMouseClickLeft = SpriteMorph.prototype.mouseClickLeft;
SpriteMorph.prototype.mouseClickLeft = function() {
	if (!this.shouldPerformEvents())
		return [];
	return this.uberMouseClickLeft();
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

Process.prototype.uberDoBroadcast = Process.prototype.doBroadcast;
Process.prototype.doBroadcast = function (message) {
	return removeNulls(this.uberDoBroadcast(message));
};

/*
** When a variable is added, we should ensure all our clones get 
** the update too (since their variables object is separate to 
** our own)
*/
SpriteMorph.prototype.addVariable = function (name, isGlobal) {
	var ide = this.parentThatIsA(IDE_Morph);
	if (isGlobal) {
		this.variables.parentFrame.addVar(name);
		if (ide) {
			ide.flushBlocksCache('variables');
		}
	} else {
		this.variables.addVar(name);
		this.blocksCache.variables = null;
				
		var myself = this;
		this.parentThatIsA(StageMorph).children.forEach(function (x) {
			if (x instanceof SpriteMorph && x.parentSprite == myself)
			{
				x.variables.addVar(name);
				x.blocksCache.variables = null;
			}
		});
	}
};

/*
** Same as above, just with deleting objects.
*/
SpriteMorph.prototype.deleteVariable = function (varName) {
	var ide = this.parentThatIsA(IDE_Morph);
	this.deleteVariableWatcher(varName);
	this.variables.deleteVar(varName);
	
	var myself = this;
	this.parentThatIsA(StageMorph).children.forEach(function (x) {
		if (x instanceof SpriteMorph && x.parentSprite == myself)
		{
			x.deleteVariableWatcher(varName);
			x.variables.deleteVar(varName);
		}
	});
	
	if (ide) {
		ide.flushBlocksCache('variables'); // b/c the var could be global
		ide.refreshPalette();
	}
};

/*
** When the sprite is told to wear a costume, it should
** wear it for all of the children too. This propagates
** calls from the GUI to all of the clones.
*/
SpriteMorph.prototype.uberWearCostume = SpriteMorph.prototype.wearCostume;
SpriteMorph.prototype.wearCostume = function (costume) 
{
	if (!this.parentSprite)
	{
		//I am a prototype sprite (since I don't have a parent)
		//Wear the costume for all my children.
		var myself = this;
		this.parentThatIsA(StageMorph).children.forEach(function (x) {
			if (x instanceof SpriteMorph && x.parentSprite == myself)
			{
				x.uberWearCostume(costume);
			}
		});
	}
	//Wear this costume regardless
	return this.uberWearCostume(costume);
};

/*********************************************************************/
/****************************** STATICS ******************************/
/*********************************************************************/
//Snap has already called initBlocks before we had a chance to modify it. We call addCellularBlocks 
//to add the new blocks.
SpriteMorph.prototype.addCellularBlocks();
