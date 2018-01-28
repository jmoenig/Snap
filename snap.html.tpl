<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Snap! Build Your Own Blocks</title>
        <link rel="shortcut icon" href="favicon.ico">
        <script type="text/javascript" src="dist/app.min.js?v=${VERSION}"></script>
        <script type="text/javascript" src="FileSaver.min.js"></script>
        <script type="text/javascript">
            var world;
            window.onload = function () {
                world = new WorldMorph(document.getElementById('world'));
                world.worldCanvas.focus();
                new IDE_Morph().openIn(world);
                loop();
            };
            function loop() {
                requestAnimationFrame(loop);
                world.doOneCycle();
            }
        </script>
    </head>
    <body style="margin: 0;">
        <canvas id="world" tabindex="1" style="position: absolute;"></canvas>
    </body>
</html>
