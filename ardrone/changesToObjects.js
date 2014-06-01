modules.ardroneObjects = '2014-June-1';

/*********************************************************************/
/******************************* HOOKS *******************************/
/*********************************************************************/

/*
** This is where we add the new palettes and colours.
*/
SpriteMorph.prototype.categories.push("ardrone");

SpriteMorph.prototype.blockColor.ardrone = new Color(150, 200, 150);

function addARDroneBlocks(blocks, block, cat)
{
	blocks.push(block('connectToServer'));
	blocks.push(block('connectionStatus'));
	blocks.push('-');
	blocks.push(block('takeoff'));
	blocks.push(block('land'));
	blocks.push('-');
	blocks.push(block('fly'));
	blocks.push(block('rotateCW'));
	blocks.push(block('rotateCCW'));
	blocks.push('-');
	blocks.push(block('disableEmergency'));
	blocks.push(block('flatTrim'));
	
	var tm = new TextMorph("Speeds go from 0.0 to 1.0");
	tm.color = new Color(255, 255, 255);
	tm.drawNew();
	blocks.push(tm);
}

/*
** This is where all the new blocks are added to the sprite pallette.
*/
SpriteMorph.prototype.scribbleHookBlockTemplates = SpriteMorph.prototype.snapappsHookBlockTemplates;
SpriteMorph.prototype.snapappsHookBlockTemplates = function(blocks, block, cat, helpMenu)
{
	var myself = this;
	if (cat == 'ardrone')
	{
		var tm = new TextMorph("Please select the stage\nfor the AR-Drone blocks");
		tm.color = new Color(255, 255, 255);
		tm.drawNew();
		blocks.push(tm);
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
	if (cat == "ardrone")
	{
		addARDroneBlocks(blocks, block, cat);
	}
	
	if (this.scribbleHookBlockTemplates)
		return this.scribbleHookBlockTemplates(blocks, block, cat);
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
    SpriteMorph.prototype.blocks.connectToServer = {
        type: 'command',
        category: 'ardrone',
        spec: 'connect to ardrone-webflight server with hostname: %s',
		defaults: ['localhost:3000']
    };
    SpriteMorph.prototype.blocks.connectionStatus = {
        type: 'reporter',
        category: 'ardrone',
        spec: 'connection status'
    };
    SpriteMorph.prototype.blocks.takeoff = {
        type: 'command',
        category: 'ardrone',
        spec: 'takeoff',
    };
    SpriteMorph.prototype.blocks.land = {
        type: 'command',
        category: 'ardrone',
        spec: 'land',
    };
    SpriteMorph.prototype.blocks.fly = {
        type: 'command',
        category: 'ardrone',
        spec: 'fly %flydir speed: %n',
    };
    SpriteMorph.prototype.blocks.rotateCW = {
        type: 'command',
        category: 'ardrone',
        spec: 'rotate at %n speed clockwise',
		defaults: ['1.0']
    };
    SpriteMorph.prototype.blocks.rotateCCW = {
        type: 'command',
        category: 'ardrone',
        spec: 'rotate at %n speed counter-clockwise',
		defaults: ['1.0']
    };
    SpriteMorph.prototype.blocks.disableEmergency = {
        type: 'command',
        category: 'ardrone',
        spec: 'disable emergency mode',
    };
    SpriteMorph.prototype.blocks.flatTrim = {
        type: 'command',
        category: 'ardrone',
        spec: 'flat trim',
    };
}


/*********************************************************************/
/**************************** BLOCK LOGIC ****************************/
/** This is where we store the implementations for the above blocks. */
/*********************************************************************/
var CONNECTION_ATTEMPTING = 'Attempting connection';
var CONNECTION_OK = 'Connection succeeded!';
var CONNECTION_DC = 'Connection disconnected!';
var CONNECTION_FAILED = 'Connection failed';
StageMorph.prototype.connectToServer = function(hostname) {
	var myself = this;
	
	this.ardroneConnectionStatus = CONNECTION_ATTEMPTING;
	var socket = io.connect('http://' + hostname);
	this.ardroneConnection = socket;
	
	socket.on('connect', function(){
		myself.ardroneConnectionStatus = CONNECTION_OK;
	});
	
	socket.on('disconnect', function(){
		myself.ardroneConnectionStatus = CONNECTION_DC;
	});
	
	socket.on('error', function(data){
		myself.ardroneConnectionStatus = CONNECTION_FAILED;
	});
}

StageMorph.prototype.connectionStatus = function() {
	return this.ardroneConnectionStatus;
}

StageMorph.prototype.requireDrone = function()
{
	if (this.ardroneConnection === undefined)
	{
		throw {
			name: 'No AR-Drone Connection',
			message: 'Please connect to a server using the connect block'
		};
	};
}

StageMorph.prototype.fixSpeed = function(speed)
{
	speed = parseFloat(speed);
	if (isNaN(speed))
		return 0;
	if (speed > 1)
		return 1;
	if (speed < 0)
		return 0;
	return speed;
}

StageMorph.prototype.fixDir = function(dir)
{
	switch (dir)
	{
		case "forward": 
			return "front";
		break;
		case "back": 
		case "left": 
		case "right": 
		case "up": 
		case "down": 
			return dir;
		break;
	}
}

StageMorph.prototype.takeoff = function() {
	this.requireDrone();
	
	this.ardroneConnection.emit("/pilot/drone", {
		action : 'takeoff'
	});
}

StageMorph.prototype.land = function() {
	this.requireDrone();
	
	this.ardroneConnection.emit("/pilot/drone", {
		action : 'land'
	});
}

StageMorph.prototype.rotateCW = function(speed) {
	this.requireDrone();
	speed = this.fixSpeed(speed);
	
	this.ardroneConnection.emit("/pilot/move", {
		action : 'clockwise',
		speed : speed
	});
}

StageMorph.prototype.rotateCCW = function(speed) {
	this.requireDrone();
	speed = this.fixSpeed(speed);
	
	this.ardroneConnection.emit("/pilot/move", {
		action : 'counterClockwise',
		speed : speed
	});
}

StageMorph.prototype.fly = function(dir, speed) {
	this.requireDrone();
	speed = this.fixSpeed(speed);
	dir = this.fixDir(dir[0]);
	
	this.ardroneConnection.emit("/pilot/move", {
		action : dir,
		speed : speed
	});
}

StageMorph.prototype.disableEmergency = function() {
	this.requireDrone();
	
	this.ardroneConnection.emit("/pilot/drone", {
		action : 'disableEmergency'
	});
}

StageMorph.prototype.flatTrim = function() {
	this.requireDrone();
	
	this.ardroneConnection.emit("/pilot/ftrim");
}


/*********************************************************************/
/****************************** STATICS ******************************/
/*********************************************************************/
//Snap has already called initBlocks before we had a chance to modify it. We call addCellularBlocks 
//to add the new blocks.
SpriteMorph.prototype.addCellularBlocks();