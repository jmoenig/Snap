var CellularGraphing = (function() {
    "use strict";
    var MAX_VALUES = 256;
    
    function GraphDisplay() {
        var me = this;
        me.values = [];
        me.visibleValues = [];
        me.skip = 1;
        me.skipMax = 1;
        me.data = [
            {
              values: me.visibleValues,      //values - represents the array of {x,y} data points
              key: 'Values', //key  - the name of the series.
              color: '#ff7f0e',  //color - optional: choose your own line color.
              // area: true // Disabled because it looks hidious with a non-zero duration
            }
        ];
        me.chartElement = d3.select('body').append('svg')
                            .style("position", "absolute")
                            .style("z-index", 10)
                            .style("pointer-events", "none");
        nv.addGraph(function() {
            me.chart = nv.models.lineChart()
                       .useInteractiveGuideline(true) // We want nice looking tooltips and a guideline!
                       .duration(100)                 // How fast do you want the lines to transition?
                       .showLegend(false)             // Show the legend, allowing users to turn on/off line series.
                       .showYAxis(true)               // Show the y-axis
                       .showXAxis(true);              // Show the x-axis

            // Chart x-axis settings
            me.chart.xAxis
                  .axisLabel('Time (s)')
                  .tickFormat(d3.format('.02f'));

            // Chart y-axis settings
            me.chart.yAxis
                  .axisLabel('Value')
                  .tickFormat(d3.format('.02f'));

            // Done setting the chart up? Time to render it!
            me.chartElement.datum(me.data)    //Populate the <svg> element with chart data...
                           .call(me.chart);   //Finally, render the chart!

            // Update the chart when window resizes.
            me.windowResizeCallback = nv.utils.windowResize(function() { 
                if (me.chart) {
                    me.chart.update() 
                }
            });
        });
    };
    
    GraphDisplay.prototype.appendPoint = function(time, value) {
        if (this.values) {
            var val = {x: time, y: value};
            this.values.push(val);
            
            // To make sure the graph doesn't lag, we want to make sure we have no more than 
            // MAX_VALUES values on the screen at once. 
            // When the number of visible values exceeds this number, we remove every second value
            // and double skipMax.
            // Assuming a constant time between each point, we need to skip a certain number of new
            // values to maintain a consistent visible sampling interval.
            this.skip--;
            if (this.skip > 0) {
                // Skip this value
                return;
            }
            this.skip = this.skipMax;
            this.visibleValues.push(val);

            if (this.visibleValues.length > MAX_VALUES) {
                // Too many values! Let's kill every second one, starting from the 2nd one.
                for (var i = 1; i < this.visibleValues.length; i++) {
                    this.visibleValues.splice(i, 1);
                }
                // Now update skipMax
                this.skipMax *= 2;
                this.skip = this.skipMax;
            }

            if (this.chart) {
                this.chart.update();
            }
        }
    };
    
    GraphDisplay.prototype.clear = function() {
        this.skipMax = 1;
        this.skip = 1;
        this.visibleValues.splice(0, this.visibleValues.length);
        this.values.splice(0, this.values.length);
    }
    
    GraphDisplay.prototype.setRect = function(x, y, width, height) {
        if (this.chartElement) {
            var changed = false;
            if (width !== this.oldWidth) {
                this.chartElement.attr("width", width)
                                 .style("width", width + "px");
                this.oldWidth = width;
                changed = true;
            }
            if (height !== this.oldHeight) {
                this.chartElement.attr("height", height)
                                 .style("height", height + "px");
                this.oldHeight = height;
                changed = true;
            }
            if (x !== this.oldX) {
                this.chartElement.style("left", x + "px");
                this.oldX = x;
                changed = true;
            }
            if (y !== this.oldY) {
                this.chartElement.style("top", y + "px");
                this.oldY = y;
                changed = true;
            }
            if (this.chart && changed) {
                this.chart.update();
            }
        }
    };
    
    GraphDisplay.prototype.destroy = function() {
        if (this.chartElement) {
            this.windowResizeCallback.clear();
            this.chartElement.remove();
            this.destroyed = true;
            
            delete this.windowResizeCallback;
            delete this.chartElement;
            delete this.chart;
            delete this.values;
            delete this.visibleValues;
            delete this.data;
        }
    };
    
    return {
        GraphDisplay: GraphDisplay
    };
})(); 
