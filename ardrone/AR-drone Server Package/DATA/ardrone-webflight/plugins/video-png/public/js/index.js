(function(window, document) {

        var Video = function Video(cockpit) {
            console.log("Initializing video plugin.");
            
            // Add some UI elements
            $('#cockpit').append('<img id="video" src="" />');

            // Update image at 20fps
            var videoImg = $("#video");
            videoImg.attr("src", '/camera/' + new Date().getTime());

            setInterval(function() {
                videoImg.attr("src", '/camera/' + new Date().getTime());
            }, 100);
        };

        window.Cockpit.plugins.push(Video);
}(window, document));
