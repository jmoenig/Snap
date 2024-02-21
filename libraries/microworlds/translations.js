var prefix = 't_';

var BLOCK_TRANSLATION_NAME = 'SNAP_BLOCK_DROPDOWN_TRANSLATIONS',
    BLOCK_TRANSLATION_FALLBACK = 'SNAP_BLOCK_TRANSLATION_FALLBACK';

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

SnapExtensions.primitives.set(
    prefix+'translate_input_options(translations, fallback)',
    function(translationsList, fallback) {
        const translations = JSON.parse(translationsList.asJSON());
        window[BLOCK_TRANSLATION_NAME] = translations;
        window[BLOCK_TRANSLATION_FALLBACK] = fallback;

    }
)

SnapExtensions.primitives.set(
    prefix+'slot_names(block)',
    function(block) {
        const declarations = block.expression?.definition?.declarations;
        if(!declarations) {
            return new List();
        }
        return new List(Array.from(declarations).map(item => item[0]));
    }
)


SnapExtensions.menus.set(
    prefix+'input_options',
    function() {
        const block = this.parentThatIsA(BlockMorph),
            label = block.definition.abstractBlockSpec();

        // index of the current input within the block
        const inputIndex = block.inputs().findIndex(item => item === this),
            currentInputName = Array.from(block.definition.declarations)[inputIndex][0],
            currentInputTranslations = window[BLOCK_TRANSLATION_NAME][label];

        const currentLanguageTranslations = currentInputTranslations
                ?.[SnapTranslator.language]
                ?.[currentInputName]
                ?.options,
            fallbackLanguageTranslations = currentInputTranslations
                ?.[window[BLOCK_TRANSLATION_FALLBACK] || 'en']
                ?.[currentInputName]
                ?.options;

        const currentOptionTranslations = currentLanguageTranslations || fallbackLanguageTranslations;


        if(!currentOptionTranslations) {
            return {"no translations found": "no translations found"}
        }

        const options = {};

        for(let option of currentOptionTranslations) {
            options[option] = option;
        }

        return options;
    }
)