// DialogBoxMorph ops
var PLOT_WIDTH = 700;
var PLOT_HEIGHT = 500;
var PLOT_INTERVAL = 100;

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
    me.currentTime = 0;
    var interval = setInterval(function() {
        g.appendPoint(me.currentTime, valueGetter());
        me.currentTime += PLOT_INTERVAL / 1000.0;
    }, PLOT_INTERVAL);
    
    var m = new Morph();
    m.setWidth(PLOT_WIDTH);
    m.setHeight(PLOT_HEIGHT);
    m.setColor(new Color(255, 255, 255));
    
    function updateMorphRect() {
        console.log("stepframe");
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
            me.currentTime = 0;
        },
        'Clear'
    );
    
    var show = this.addButton(
        function () {
            text = "time, value\n";
            g.values.forEach(function (d) {
                text += d.x + ", " + d.y + "\n";
            });
            window.open('data:text/csv;charset=UTF-8,' + encodeURIComponent(text));
        },
        'Show values...'
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
