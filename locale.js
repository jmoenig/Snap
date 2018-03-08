/*

    locale.js

    spoken language translation for SNAP!

    written by Jens Mönig

    Copyright (C) 2018 by Jens Mönig

    This file is part of Snap!.

    Snap! is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of
    the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.


    Attention Translators!
    ----------------------
    Please refer to the documentation in the file

        lang-de.js

    or to the separate file

        translating Snap.txt

    (same contents) if you would like to contribute.

*/

// Global settings /////////////////////////////////////////////////////

/*global modules, contains, isObject, containsKey */

modules.locale = '2018-March-09';

// Global stuff

var Localizer;
var SnapTranslator = new Localizer();

function _(string, replacements) {
    return SnapTranslator.translate(string, replacements);
}

function _expr(expression, replacements) {
    return SnapTranslator.translate(expression, replacements);
}

// Localizer /////////////////////////////////////////////////////////////

function Localizer(language, dict) {
    this.language = language || 'en';
    this.dict = dict || { 'en': { strings: {} } };
}

Localizer.prototype.lookup = function (string) {
    return this.dict[this.language].strings[string];
}

Localizer.prototype.renderTemplate = function (template, vars) {
    var replacements = isObject(vars)
        ? function(match, key) {
            return containsKey(vars, key)
                ? ('' + vars[key]).toString()
                : '';
        }
        : ('' + vars).toString();
    return ('' + template).replace(/\{\{\s*(\w+)\s*\}\}/g, replacements);
}

Localizer.prototype.translate = function (string, replacements) {
    var original = '' + string,
        matches,
        translation;

    translation = this.lookup(original);
    if (translation) {
        return this.renderTemplate(translation, replacements);
    }

    // if none found... try the same string without trailing symbols
    matches = original.match(/(\.\.\.|:|\.)$/)
    if (matches) {
        original = original.slice(0, -matches[1].length);
        return this.translate(original, replacements) + matches[1];
    }

    // if none found... renders and returns the original string
    return this.renderTemplate(original, replacements);
};

Localizer.prototype.languages = function () {
    var property, arr = [];
    for (property in this.dict) {
        if (Object.prototype.hasOwnProperty.call(this.dict, property)) {
            arr.push(property);
        }
    }
    return arr.sort();
};

Localizer.prototype.languageName = function (lang) {
    return this.dict[lang].metadata.name || this.englishLanguageName(lang);
};

Localizer.prototype.englishLanguageName = function (lang) {
    return this.dict[lang].metadata.english_name || lang;
};

Localizer.prototype.credits = function () {
    var txt = '',
        myself = this;
    this.languages().forEach(function (lang) {
        var translators = myself.dict[lang].metadata.translators
            .map(function(translator) {
                return translator.split('<')[0].trim();
            })
            .join('/');
        txt = txt + '\n'
            + myself.languageName(lang)
            + ' (' + lang + ') - '
            + translators
            + ' - ' + myself.dict[lang].metadata.last_changed;
    });
    return txt;
};

Localizer.prototype.unload = function () {
    var dict,
        myself = this;
    this.languages()
        .forEach(function (lang) {
            dict = myself.dict[lang];
            delete dict.strings;
            dict.strings = {};
        });
};

// SnapTranslator initialization ///////////////////////////////////////

SnapTranslator.dict.en = {
    metadata: {
        name: // the name as it should appear in the language menu
            'English',
        english_name: // the english name of the language
            'English',
        translators: [ // translators authors for the Translators tab
            'Jens M\u00F6nig <jens@moenig.org>'
        ],
        last_changed: // this, too, will appear in the Translators tab
            '2015-12-22'
    },
    strings: {}
}

SnapTranslator.dict.de = {
    metadata: {
        name: // the name as it should appear in the language menu
            'Deutsch',
        english_name: // the english name of the language
            'German',
        translators: [ // translators authors for the Translators tab
            'Jens M\u00F6nig <jens@moenig.org>'
        ],
        last_changed: // this, too, will appear in the Translators tab
            '2018-03-09'
    },
    strings: {}
}

SnapTranslator.dict.it = {
    metadata: {
        name: // the name as it should appear in the language menu
            'Italiano',
        english_name: // the english name of the language
            'Italian',
        translators: [ // translators authors for the Translators tab
            'Stefano Federici <s_federici@yahoo.com>',
            'Alberto Firpo <albertofirpo12@gmail.com>',
            'Massimo Ghisalbert <zairik@gmail.com>'
        ],
        last_changed: // this, too, will appear in the Translators tab
            '2016-10-31'
    },
    strings: {}
}

SnapTranslator.dict.ja = {
    metadata: {
        name: // the name as it should appear in the language menu
            '\u65E5\u672C\u8A9E',
        english_name: // the english name of the language
            'Japanese',
        translators: [ // translators authors for the Translators tab
            'Kazuhiro Abe <abee@squeakland.jp>'
        ],
        last_changed: // this, too, will appear in the Translators tab
            '2013-04-02'
    },
    strings: {}
}

SnapTranslator.dict.ja_HIRA = {
    metadata: {
        name: // the name as it should appear in the language menu
            '\u306B\u307B\u3093\u3054',
        english_name: // the english name of the language
            'Japanese (Hiragana)',
        translators: [ // translators authors for the Translators tab
            'Kazuhiro Abe <abee@squeakland.jp>'
        ],
        last_changed: // this, too, will appear in the Translators tab
            '2013-04-02'
    },
    strings: {}
}

SnapTranslator.dict.ko = {
    metadata: {
        name: // the name as it should appear in the language menu
            '\uD55C\uAD6D\uC5B4',
        english_name: // the english name of the language
            'Korean',
        translators: [ // translators authors for the Translators tab
            'Yunjae Jang <janggoons@gmail.com>'
        ],
        last_changed: // this, too, will appear in the Translators tab
            '2015-01-21'
    },
    strings: {}
}

SnapTranslator.dict.pt = {
    metadata: {
        name: // the name as it should appear in the language menu
            'Portugu\u00EAs',
        english_name: // the english name of the language
            'Portuguese',
        translators: [ // translators authors for the Translators tab
            'Manuel Menezes de Sequeira <mmsequeira@gmail.com>'
        ],
        last_changed: // this, too, will appear in the Translators tab
            '2017-10-30'
    },
    strings: {}
}

SnapTranslator.dict.cs = {
    metadata: {
        name: // the name as it should appear in the language menu
            '\u010Cesky',
        english_name: // the english name of the language
            'Czech',
        translators: [ // translators authors for the Translators tab
            'Michal Moc <info@iguru.eu>',
            'Jan Tomsa <jan.tomsa.1976@gmail.com>'
        ],
        last_changed: // this, too, will appear in the Translators tab
            '2015-11-16'
    },
    strings: {}
}

SnapTranslator.dict.zh_CN = {
    metadata: {
        name: // the name as it should appear in the language menu
            '\u7B80\u4F53\u4E2D\u6587',
        english_name: // the english name of the language
            'Simplified Chinese',
        translators: [ // translators authors for the Translators tab
            '\u4E94\u767E\u5200 <ubertao@qq.com>',
            '\u9093\u6C5F\u534E <djh@rhjxx.cn>'
        ],
        last_changed: // this, too, will appear in the Translators tab
            '2018-01-22'
    },
    strings: {}
}

SnapTranslator.dict.eo = {
    metadata: {
        name: // the name as it should appear in the language menu
            'Esperanto',
        english_name: // the english name of the language
            'Esperanto',
        translators: [ // translators authors for the Translators tab
            'Sebastian CYPRYCH <sebacyp@gmail.com>'
        ],
        last_changed: // this, too, will appear in the Translators tab
            '2017-10-01'
    },
    strings: {}
}

SnapTranslator.dict.fr = {
    metadata: {
        name: // the name as it should appear in the language menu
            'Fran\u00E7ais',
        english_name: // the english name of the language
            'French',
        translators: [ // translators authors for the Translators tab
            'Jean-Jacques Valliet',
            'Mark Rafter',
            'Martin Quinson',
            'Damien Caselli'
        ],
        last_changed: // this, too, will appear in the Translators tab
            '2016-10-27'
    },
    strings: {}
}

SnapTranslator.dict.si = {
    metadata: {
        name: // the name as it should appear in the language menu
            'Sloven\u0161\u010Dina',
        english_name: // the english name of the language
            'Slovak',
        translators: [ // translators authors for the Translators tab
            'Sasa Divjak <sasa.divjak@fri.uni-lj.si>',
            'Gorazd Breskvar'
        ],
        last_changed: // this, too, will appear in the Translators tab
            '2016-04-22'
    },
    strings: {}
}

SnapTranslator.dict.ru = {
    metadata: {
        name: // the name as it should appear in the language menu
            '\u0420\u0443\u0441\u0441\u043A\u0438\u0439',
        english_name: // the english name of the language
            'Russian',
        translators: [ // translators authors for the Translators tab
            'Svetlana Ptashnaya <svetlanap@berkeley.edu>',
            '\u041F\u0440\u043E\u0441\u043A\u0443\u0440\u043D\u0451\u0432 \u0410\u0440\u0442\u0451\u043C <tema@school830.ru>'
        ],
        last_changed: // this, too, will appear in the Translators tab
            '2017-12-29'
    },
    strings: {}
}

SnapTranslator.dict.es = {
    metadata: {
        name: // the name as it should appear in the language menu
            'Espa\u00F1ol',
        english_name: // the english name of the language
            'Spanish',
        translators: [ // translators authors for the Translators tab
            'V\u00EDctor Manuel Muratalla Morales <victor.muratalla@yahoo.com>',
            'Cristi\u00E1n Rizzi Iribarren <rizzi.cristian@gmail.com>',
            'Alfonso Ruzafa <superruzafa@gmail.com>'
        ],
        last_changed: // this, too, will appear in the Translators tab
            '2018-02-19'
    },
    strings: {}
}

SnapTranslator.dict.nl = {
    metadata: {
        name: // the name as it should appear in the language menu
            'Nederlands',
        english_name: // the english name of the language
            'Dutch',
        translators: [ // translators authors for the Translators tab
            'Sjoerd Dirk Meijer <sjoerddirk@fromScratchEd.nl>',
            'Frank Sierens <frank.sierens@telenet.be>',
            'Jan-Gerard van der Toorn <jg.2019@xs4all.nl>'
        ],
        last_changed: // this, too, will appear in the Translators tab
            '2017-09-01'
    },
    strings: {}
}

SnapTranslator.dict.pl = {
    metadata: {
        name: // the name as it should appear in the language menu
            'Polski',
        english_name: // the english name of the language
            'Polish',
        translators: [ // translators authors for the Translators tab
            'Witek Kranas <witek@oeiizk.waw.pl>',
            'deKrain',
            'AB'
        ],
        last_changed: // this, too, will appear in the Translators tab
            '2017-11-09'
    },
    strings: {}
}

SnapTranslator.dict.zh_TW = {
    metadata: {
        name: // the name as it should appear in the language menu
            '\u7E41\u9AD4\u4E2D\u6587',
        english_name: // the english name of the language
            'Traditional Chinese',
        translators: [ // translators authors for the Translators tab
            'cch <cchuang2009@gmail.com>'
        ],
        last_changed: // this, too, will appear in the Translators tab
            '2013-8-14'
    },
    strings: {}
}

SnapTranslator.dict.no = {
    metadata: {
        name: // the name as it should appear in the language menu
            'Norsk',
        english_name: // the english name of the language
            'Norwegian',
        translators: [ // translators authors for the Translators tab
            'Olav A Marschall <mattebananer@gmail.com>'
        ],
        last_changed: // this, too, will appear in the Translators tab
            '2013-09-16'
    },
    strings: {}
}

SnapTranslator.dict.dk = {
    metadata: {
        name: // the name as it should appear in the language menu
            'Dansk',
        english_name: // the english name of the language
            'Danish',
        translators: [ // translators authors for the Translators tab
            'FAB <fab@nielsen.mail.dk>',
            'Pelle Hjek <hjek@mail.com>'
        ],
        last_changed: // this, too, will appear in the Translators tab
            '2016-11-16'
    },
    strings: {}
}

SnapTranslator.dict.el = {
    metadata: {
        name: // the name as it should appear in the language menu
            '\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC',
        english_name: // the english name of the language
            'Greek',
        translators: [ // translators authors for the Translators tab
            'Ino Samaras <ino.samaras@berkeley.edu>'
        ],
        last_changed: // this, too, will appear in the Translators tab
            '2018-01-19'
    },
    strings: {}
}

SnapTranslator.dict.ca = {
    metadata: {
        name: // the name as it should appear in the language menu
            'Catal\u00E0',
        english_name: // the english name of the language
            'Catalan',
        translators: [ // translators authors for the Translators tab
            'Bernat Romagosa Carrasquer <bernat@snap4arduino.rocks>',
            'Joan Guill\u00E9n i Pelegay <jguille2@xtec.cat>'
        ],
        last_changed: // this, too, will appear in the Translators tab
            '2017-11-15'
    },
    strings: {}
}

SnapTranslator.dict.ca_VA = {
    metadata: {
        name: // the name as it should appear in the language menu
            'Catal\u00E0 - Valenci\u00E0',
        english_name: // the english name of the language
            'Catalan - Valencian',
        translators: [ // translators authors for the Translators tab
            'Bernat Romagosa Carrasquer <bernat@snap4arduino.rocks>',
            'Joan Guill\u00E9n i Pelegay <jguille2@xtec.cat>',
            'Pilar Embid <embid_mar@gva.es>'
        ],
        last_changed: // this, too, will appear in the Translators tab
            '2018-02-08'
    },
    strings: {}
}

SnapTranslator.dict.fi = {
    metadata: {
        name: // the name as it should appear in the language menu
            'Suomi',
        english_name: // the english name of the language
            'Finnish',
        translators: [ // translators authors for the Translators tab
            'Jouni K. Sepp\u00E4nen <jks@iki.fi>'
        ],
        last_changed: // this, too, will appear in the Translators tab
            '2014-04-18'
    },
    strings: {}
}

SnapTranslator.dict.sv = {
    metadata: {
        name: // the name as it should appear in the language menu
            'Svenska',
        english_name: // the english name of the language
            'Swedish',
        translators: [ // translators authors for the Translators tab
            'Erik A Olsson <eolsson@gmail.com>'
        ],
        last_changed: // this, too, will appear in the Translators tab
            '2016-06-09'
    },
    strings: {}
}

SnapTranslator.dict.pt_BR = {
    metadata: {
        name: // the name as it should appear in the language menu
            'Portugu\u00EAs do Brasil',
        english_name: // the english name of the language
            'Portuguese (Brazil)',
        translators: [ // translators authors for the Translators tab
            'Aldo von Wangenheim <awangenh@inf.ufsc.br>'
        ],
        last_changed: // this, too, will appear in the Translators tab
            '2014-04-20'
    },
    strings: {}
}

SnapTranslator.dict.bn = {
    metadata: {
        name: // the name as it should appear in the language menu
            '\u09AC\u09BE\u0982\u09B2\u09BE',
        english_name: // the english name of the language
            'Bengali',
        translators: [ // translators authors for the Translators tab
            'Dr. Mokter Hossain <mokter@gmail.com>'
        ],
        last_changed: // this, too, will appear in the Translators tab
            '2014-07-02'
    },
    strings: {}
}

SnapTranslator.dict.kn = {
    metadata: {
        name: // the name as it should appear in the language menu
            '\u0C95\u0CA8\u0CCD\u0CA8\u0CA1',
        english_name: // the english name of the language
            'Kannada',
        translators: [ // translators authors for the Translators tab
            'Vinayakumar R <vnkmr7620@gmail.com>'
        ],
        last_changed: // this, too, will appear in the Translators tab
            '2014-25-11'
    },
    strings: {}
}

SnapTranslator.dict.ml = {
    metadata: {
        name: // the name as it should appear in the language menu
            '\u0D2E\u0D32\u0D2F\u0D3E\u0D33\u0D02',
        english_name: // the english name of the language
            'Malayalam',
        translators: [ // translators authors for the Translators tab
            'vinayakumar R <vnkmr7620@gmail.com>'
        ],
        last_changed: // this, too, will appear in the Translators tab
            '2015-02-20'
    },
    strings: {}
}

SnapTranslator.dict.ta = {
    metadata: {
        name: // the name as it should appear in the language menu
            '\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD',
        english_name: // the english name of the language
            'Tamil',
        translators: [ // translators authors for the Translators tab
            'vinayakumar R <vnkmr7620@gmail.com>'
        ],
        last_changed: // this, too, will appear in the Translators tab
            '2015-02-20'
    },
    strings: {}
}

SnapTranslator.dict.te = {
    metadata: {
        name: // the name as it should appear in the language menu
            '\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41',
        english_name: // the english name of the language
            'Telugu',
        translators: [ // translators authors for the Translators tab
            'vinayakumar R <vnkmr7620@gmail.com>'
        ],
        last_changed: // this, too, will appear in the Translators tab
            '2015-02-20'
    },
    strings: {}
}

SnapTranslator.dict.tr = {
    metadata: {
        name: // the name as it should appear in the language menu
            'T\u00FCrk\u00E7e',
        english_name: // the english name of the language
            'Turkish',
        translators: [ // translators authors for the Translators tab
            'Hakan Atas <hakanatas@gmail.com>',
            '3dRoboLab <mustafaipekbayrak@gmail.com> (www.3drobolab.com)'
        ],
        last_changed: // this, too, will appear in the Translators tab
            '2018-01-22'
    },
    strings: {}
}

SnapTranslator.dict.hu = {
    metadata: {
        name: // the name as it should appear in the language menu
            'Magyar',
        english_name: // the english name of the language
            'Hungarian',
        translators: [ // translators authors for the Translators tab
            'Mak\u00E1ny Gy\u00F6rgy <makany.gyorgy@gmail.com>'
        ],
        last_changed: // this, too, will appear in the Translators tab
            '2015-07-26'
    },
    strings: {}
}

SnapTranslator.dict.ia = {
    metadata: {
        name: // the name as it should appear in the language menu
            'Interlingua',
        english_name: // the english name of the language
            'Interlingua',
        translators: [ // translators authors for the Translators tab
            'Ken Dickey <ken.dickey@whidbey.com>'
        ],
        last_changed: // this, too, will appear in the Translators tab
            '2015-08-09'
    },
    strings: {}
}

SnapTranslator.dict.hr = {
    metadata: {
        name: // the name as it should appear in the language menu
            'Hrvatski',
        english_name: // the english name of the language
            'Croatian',
        translators: [ // translators authors for the Translators tab
            'u017Deljko Hrvoj <zeljko.hrvoj@zg.t-com.hr>'
        ],
        last_changed: // this, too, will appear in the Translators tab
            '2017-08-15'
    },
    strings: {}
}

SnapTranslator.dict.bg = {
    metadata: {
        name: // the name as it should appear in the language menu
            '\u0411\u044A\u043B\u0433\u0430\u0440\u0441\u043A\u0438',
        english_name: // the english name of the language
            'Bulgarian',
        translators: [ // translators authors for the Translators tab
            '\u0418\u0432\u0430\u043D \u0421\u0430\u0432\u043E\u0432 <ivan.savov@gmail.com>'
        ],
        last_changed: // this, too, will appear in the Translators tab
            '2015-11-02'
    },
    strings: {}
}

SnapTranslator.dict.ro = {
    metadata: {
        name: // the name as it should appear in the language menu
            'Rom\u00E2n\u0103',
        english_name: // the english name of the language
            'Romanian',
        translators: [ // translators authors for the Translators tab
            'Cristian Macarascu'
        ],
        last_changed: // this, too, will appear in the Translators tab
            '2015-10-24'
    },
    strings: {}
}

SnapTranslator.dict.ar = {
    metadata: {
        name: // the name as it should appear in the language menu
            '\u0627\u0644\u0639\u0631\u0628\u064A\u0629',
        english_name: // the english name of the language
            'Arabic',
        translators: [ // translators authors for the Translators tab
            '\u0637\u0627\u0631\u0642 \u062C\u0644\u0627\u0644 <tarekgalal46@hotmail.com>'
        ],
        last_changed: // this, too, will appear in the Translators tab
            '2016-01-23'
    },
    strings: {}
}

SnapTranslator.dict.id = {
    metadata: {
        name: // the name as it should appear in the language menu
            'Bahasa Indonesia',
        english_name: // the english name of the language
            'Indonesian',
        translators: [ // translators authors for the Translators tab
            'Alexander Raphael Liu <raphaxander@gmail.com>'
        ],
        last_changed: // this, too, will appear in the Translators tab
            '2016-05-02'
    },
    strings: {}
}

SnapTranslator.dict.et = {
    metadata: {
        name: // the name as it should appear in the language menu
            'Eesti',
        english_name: // the english name of the language
            'Estonian',
        translators: [ // translators authors for the Translators tab
            'Hasso Tepper <hasso.tepper@gmail.com>'
        ],
        last_changed: // this, too, will appear in the Translators tab
            '2016-03-01'
    },
    strings: {}
}

SnapTranslator.dict.gl = {
    metadata: {
        name: // the name as it should appear in the language menu
            'Galego',
        english_name: // the english name of the language
            'Galician',
        translators: [ // translators authors for the Translators tab
            'tecnoloxia'
        ],
        last_changed: // this, too, will appear in the Translators tab
            '2016-11-09'
    },
    strings: {}
}
