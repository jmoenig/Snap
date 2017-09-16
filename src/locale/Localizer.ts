// Localizer /////////////////////////////////////////////////////////////

class Localizer {
    constructor(language, dict) {
        this.language = language || 'en';
        this.dict = dict || {};
    }

    translate(string) {
        return Object.prototype.hasOwnProperty.call(
            this.dict[this.language],
            string
        ) ? this.dict[this.language][string] : string;
    }

    languages() {
        let property;
        const arr = [];
        for (property in this.dict) {
            if (Object.prototype.hasOwnProperty.call(this.dict, property)) {
                arr.push(property);
            }
        }
        return arr.sort();
    }

    languageName(lang) {
        return this.dict[lang].language_name || lang;
    }

    credits() {
        let txt = '';
        const myself = this;
        this.languages().forEach(lang => {
            txt = `${txt}\n${myself.languageName(lang)} (${lang}) - ${myself.dict[lang].language_translator} - ${myself.dict[lang].last_changed}`;
        });
        return txt;
    }

    unload() {
        let dict;
        const keep = ['language_name', 'language_translator', 'last_changed'];
        const myself = this;
        this.languages().forEach(lang => {
            let key;
            if (lang !== 'en') {
                dict = myself.dict[lang];
                for (key in dict) {
                    if (Object.prototype.hasOwnProperty.call(dict, key)
                            && !contains(keep, key)) {
                        delete dict[key];
                    }
                }
            }
        });
    }
}