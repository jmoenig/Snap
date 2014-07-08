(function(window, document) {
        'use strict';

        /*
         * Constructuor
         */
        var Blackbox = function Blackbox(cockpit) {
                console.log("Loading Blackbox plugin.");
                this.cockpit = cockpit;
                this.recording = false;

                // Register the various event handlers
                this.listen();
        };

        /*
         * Register keyboard event listener
         */
        Blackbox.prototype.listen = function listen() {
                var self = this;
                $(document).keydown(function(ev) {
                        self.keyDown(ev);
                });
        };

        /*
         * Process onkeydown. 
         */
        Blackbox.prototype.keyDown = function keyDown(ev) {
                if ([ev.keyCode] != 82) {
                        return;
                } 
                ev.preventDefault();

                this.recording = !this.recording;
                var cmd = this.recording ? "stop" : "start";
                this.cockpit.socket.emit("/blackbox/" + cmd, {});
        };

        window.Cockpit.plugins.push(Blackbox);

}(window, document));
