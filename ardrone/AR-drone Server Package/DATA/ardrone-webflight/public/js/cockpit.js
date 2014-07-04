(function(window, document, $, undefined) {
        
    var hostname = document.location.hostname ? document.location.hostname : "localhost";

    var Cockpit = function Cockpit() {
        this.socket = io.connect('http://' + hostname);
        this.loadPlugins();

        // Fullscreen on doubleclick
        $("#glasspane").dblclick(function(ev) {
            ev.preventDefault();
            $(document).toggleFullScreen();
            return false;
        });

        // Basic socket messages
        this.socket.on('/message', function(data) {
            $.notifyBar({
                html     : JSON.stringify(data)
              });
        });
        this.socket.on('/success', function(data) {
            $.notifyBar({
                cssClass : "success",
                html     : 'Success : ' + JSON.stringify(data)
              });
        });
        this.socket.on('/warning', function(data) {
            $.notifyBar({
                cssClass : "warning",
                html     : JSON.stringify(data)
              });
        });
        this.socket.on('/error', function(e) {
            $.notifyBar({
                cssClass : "error",
                html     : 'Error : ' + JSON.stringify(e)
              });
        });
        
    };

    Cockpit.prototype.loadPlugins = function loadPlugins() {
        var cockpit = this;
        Cockpit.plugins.forEach(function(plugin) {
            new plugin(cockpit);
        });
    };

    // Static array containing all plugins to load
    Cockpit.plugins = [];

    window.Cockpit = Cockpit;
}(window, document, jQuery));
