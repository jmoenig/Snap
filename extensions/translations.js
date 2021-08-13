var prefix = 't_';

SnapExtensions.primitives.set(
    prefix+'add_placeholders(string, placeholders)',
    (string, placeholders) => {
        if(placeholders instanceof List){
            placeholders = placeholders.contents;
        }

        if(!Array.isArray(placeholders)){
            throw new Error("Expecting List of placeholders");
        }

        return string.replace(/(\\*)\$[0-9]+/g, function(match){


            if(match.substring(0,1) === '\\'){
                return match.substring(1);
            }

            var index = parseInt(match.substring(1)) - 1;

            if(index > -1 && index < placeholders.length){
                return placeholders[index];
            }

            return match;
        });
    }
)