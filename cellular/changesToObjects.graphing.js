// DialogBoxMorph ops
var PLOT_WIDTH = 700;
var PLOT_HEIGHT = 500;
var PLOT_INTERVAL = 150;

// Add a plotGraph function to DialogBoxMorph from widgets.js
DialogBoxMorph.prototype.plotGraph = function (
    title,
    world,
    valueGetter
) {
    if (!this.key) {
        this.key = 'plotGraph' + title;
    }
    
    var me = this;
    
    var g = new CellularGraphing.GraphDisplay();
    me.currentSampleTime = 0;
	me.lastTimeSampled = null;
    var interval = setInterval(function() {
		var ide = me.world().children.reduce(function(previous, current) {
			if (current instanceof IDE_Morph) {
				return current;
			}
			return previous;
		}, null);
		var time = (new Date()).getTime();
		if (ide != null && ide.stage.threads.processes.length > 0) {
			if (me.lastTimeSampled != null) {
				me.currentSampleTime += (time - me.lastTimeSampled) / 1000.0;
			}

        	g.appendPoint(me.currentSampleTime, valueGetter());
		}
		me.lastTimeSampled = time;
    }, PLOT_INTERVAL);
    
    var m = new Morph();
    m.setWidth(PLOT_WIDTH);
    m.setHeight(PLOT_HEIGHT);
    m.setColor(new Color(255, 255, 255));
    
    function updateMorphRect() {
        g.setRect(m.left(), m.top(), m.width(), m.height());
    }
    
    function wrap(obj, functionName) {
        var oldFunc = obj[functionName];
        obj[functionName] = function() {
            oldFunc.apply(this, arguments);
            updateMorphRect();
        }
    }
    
    wrap(m, "stepFrame");
    wrap(m, "moveBy");
    wrap(m, "silentMoveBy");
    
    this.setPicture(m);
    this.labelString = title;
    this.createLabel();
    
    var close = this.addButton(
        function () {
            this.accept();
            g.destroy();
            clearInterval(interval);
        },
        'Close'
    );
    
    var clear = this.addButton(
        function () {
            g.clear();
			me.currentSampleTime = 0;
			me.lastTimeSampled = null;
        },
        'Clear'
    );
    
    var show = this.addButton(
        function () {
            var text = "time, value\n";
            g.values.forEach(function (d) {
                text += d.x + ", " + d.y + "\n";
            });
            window.open('data:text/csv;charset=UTF-8,' + encodeURIComponent(text));
        },
        'Download values (csv)...'
    );
    
    this.drawNew();
    this.fixLayout();
    this.popUp(world);
};

WatcherMorph.prototype.uberUserMenu = WatcherMorph.prototype.userMenu;
WatcherMorph.prototype.userMenu = function () {
    var menu = this.uberUserMenu();
    menu.addLine();
    menu.addItem(
        'plot...',
        'plot'
    );
    return menu;
}

WatcherMorph.prototype.plot = function() {
    var me = this;
    new DialogBoxMorph().plotGraph('Plot', this.world(), function () {
        if (me.target instanceof VariableFrame) {
            var variable = me.target.vars[me.getter];
            return variable ? variable.value : undefined;
        } else {
            return me.target[me.getter]();
        }
    });
}
