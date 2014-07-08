(function(window, document, $) {

        var Video = function Video(cockpit) {
            console.log("Initializing video stream plugin.");
            var video = this;
            
            // Add some UI elements
            $('#cockpit').append('<div id="dronestream"></div>');

            // Start the stream
            cockpit.videostream = new NodecopterStream(
                document.getElementById("dronestream"),
                {port: 3001}
            );
        };

        window.Cockpit.plugins.push(Video);
}(window, document, jQuery));
