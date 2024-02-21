// 2023-03-20

var ide = world.children.find(child => {
        return child instanceof IDE_Morph;
    }),
    prefix = 'rs_';

SnapExtensions.primitives.set(
    prefix+'load_sound(url, varName)',
    (src, varName, context) => {
        ide.getURL(
            src,
            function (blob) {
                var reader = new window.FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = function() {
                    var base64 = reader.result;
                    context.setVarNamed(varName, 'data:audio/ogg;base64,' + base64.split(',')[1]);
                };
            },
            'blob'
        );
    }
)

SnapExtensions.primitives.set(
    prefix+'create_sound(base64)',
    base64 => new Sound(new Audio(base64))
)

SnapExtensions.primitives.set(
    prefix+'stop_all_speech_synthesis',
    () => {
        window.speechSynthesis.cancel();
    }
)

SnapExtensions.primitives.set(
    prefix+'is_speaking',
    () => {
        return window.speechSynthesis.speaking;
    }
)