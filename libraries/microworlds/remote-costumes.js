var ide = world.children.find(child => {
        return child instanceof IDE_Morph;
    }),
    prefix = 'rc_';


SnapExtensions.primitives.set(
    prefix+'load_costume(url, varName)',
    (src, varName = 'costume', context) => {
        ide.getURL(
            src,
            function(blob) {
                var reader = new window.FileReader();
                reader.readAsDataURL(blob);
                var image = new Image();

                let isSvg, base64;

                reader.onloadend = function() {
                    var base64 = reader.result;

                    isSvg = !!blob.type.match(/image\/svg\+xml/);

                    image.src = base64;
                };
                image.onload = function(){

                    let costume;

                    if(isSvg) {
                        costume = new SVG_Costume(image);
                    }

                    else {
                        var canvas = newCanvas();
                        ctx = canvas.getContext("2d");
                        canvas.width = image.width;
                        canvas.height = image.height;
                        ctx.drawImage(image, 0, 0);

                        costume = new Costume(canvas);
                    }



                    context.setVarNamed(varName,costume);
                }
            },
            'blob'
        );

    }
)