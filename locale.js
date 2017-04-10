/*

    locale.js

    spoken language translation for SNAP!

    written by Jens Mönig

    Copyright (C) 2017 by Jens Mönig

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

/*global modules, contains*/

modules.locale = '2017-January-13';

// Global stuff

var Localizer;
var SnapTranslator = new Localizer();

function localize(string) {
    return SnapTranslator.translate(string);
}

// Localizer /////////////////////////////////////////////////////////////

function Localizer(language, dict) {
    this.language = language || 'en';
    this.dict = dict || {};
}

Localizer.prototype.translate = function (string) {
    return Object.prototype.hasOwnProperty.call(
        this.dict[this.language],
        string
    ) ? this.dict[this.language][string] : string;
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
    return this.dict[lang].language_name || lang;
};

Localizer.prototype.credits = function () {
    var txt = '',
        myself = this;
    this.languages().forEach(function (lang) {
        txt = txt + '\n'
            + myself.languageName(lang)
            + ' (' + lang + ') - '
            + myself.dict[lang].language_translator
            + ' - ' + myself.dict[lang].last_changed;
    });
    return txt;
};

Localizer.prototype.unload = function () {
    var dict,
        keep = ['language_name', 'language_translator', 'last_changed'],
        myself = this;
    this.languages().forEach(function (lang) {
        var key;
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
};

// SnapTranslator initialization

SnapTranslator.dict.en = {
    // meta information
    'language_name':
        'English',
    'language_translator':
        'Jens M\u00F6nig',
    'translator_e-mail':
        'jens@moenig.org',
    'last_changed':
        '2015-12-22',

    // rewordings in English avoiding having to adjust all other translations
    'any':
        'random',

    // long strings look-up only
    'file menu import hint':
        'load an exported project file\nor block library, a costume\n'
            + 'or a sound',
    'settings menu prefer empty slots hint':
        'check to focus on empty slots\nwhen dragging & '
                + 'dropping reporters',
    'costumes tab help':
        'import a picture from another web page or from\n'
            + 'a file on your computer by dropping it here\n',
    'block deletion dialog text':
        'Are you sure you want to delete this\n'
            + 'custom block and all its instances?',
    'download to disk text':
        'This item could not be opened in a new tab.\n' +
        'It has been saved to your browser\'s downloads folder.',
    'unable to export text':
        'This item could not be exported from Snap!.\n' +
        'It\'s likely that your project may contain a lot of media ' +
        '(sounds and images) or that you are using an older browser.' +
        'Please try using a recent version of Chrome, Firefox, or Safari.'
};

SnapTranslator.dict.de = {
    'language_name':
        'Deutsch',
    'language_translator':
        'Jens M\u00F6nig',
    'translator_e-mail':
        'jens@moenig.org',
    'last_changed':
        '2017-01-10'
};

SnapTranslator.dict.it = {
    'language_name':
        'Italiano',
    'language_translator':
        'Stefano Federici, Alberto Firpo, Massimo Ghisalberti',
    'translator_e-mail':
        's_federici@yahoo.com, albertofirpo12@gmail.com, zairik@gmail.com',
    'last_changed':
        '2016-05-10'
};

SnapTranslator.dict.ja = {
    'language_name':
        '日本語',
    'language_translator':
        'Kazuhiro Abe',
    'translator_e-mail':
        'abee@squeakland.jp',
    'last_changed':
        '2012-04-02'
};

SnapTranslator.dict.ja_HIRA = {
    'language_name':
        'にほんご',
    'language_translator':
        'Kazuhiro Abe',
    'translator_e-mail':
        'abee@squeakland.jp',
    'last_changed':
        '2012-04-02'
};

SnapTranslator.dict.ko = {
    'language_name':
        '한국어',
    'language_translator':
        'Yunjae Jang',
    'translator_e-mail':
        'janggoons@gmail.com',
    'last_changed':
        '2015-01-21'
};

SnapTranslator.dict.pt = {
    'language_name':
        'Português',
    'language_translator':
        'Manuel Menezes de Sequeira',
    'translator_e-mail':
        'mmsequeira@gmail.com',
    'last_changed':
        '2016-10-30'
};

SnapTranslator.dict.cs = {
    'language_name':
        'Česky',
    'language_translator':
        'Michal Moc, Jan Tomsa',
    'translator_e-mail':
        'info@iguru.eu, jan.tomsa.1976@gmail.com',
    'last_changed':
        '2015-11-16'
};

SnapTranslator.dict.zh_CN = {
    'language_name':
        '简体中文',
    'language_translator':
        '五百刀/邓江华',
    'translator_e-mail':
        'ubertao@qq.com/djh@rhjxx.cn',
    'last_changed':
        '2016-05-09'
};

SnapTranslator.dict.eo = {
    'language_name':
        'Esperanto',
    'language_translator':
        'Sebastian Cyprych',
    'translator_e-mail':
        'scy(ĉe)epf.pl',
    'last_changed':
        '2012-11-11'
};

SnapTranslator.dict.fr = {
    'language_name':
        'Fran\u00E7ais',
    'language_translator':
        'Jean-Jacques Valliet, Mark Rafter, Martin Quinson, Damien Caselli',
    'translator_e-mail':
        'i.scool@mac.com',
    'last_changed':
        '2016-10-27'
};

SnapTranslator.dict.si = {
    'language_name':
        'Sloven\u0161\u010Dina',
    'language_translator':
        'Sasa Divjak, Gorazd Breskvar',
    'translator_e-mail':
        'sasa.divjak@fri.uni-lj.si',
    'last_changed':
        '2016-04-22'
};

SnapTranslator.dict.ru = {
    'language_name':
        'Русский',
    'language_translator':
        'Svetlana Ptashnaya, Проскурнёв Артём',
    'translator_e-mail':
        'svetlanap@berkeley.edu, tema@school830.ru',
    'last_changed':
        '2016-06-21'
};

SnapTranslator.dict.es = {
    'language_name':
        'Espa\u00F1ol',
    'language_translator':
        'V\u00EDctor Manuel Muratalla Morales',
    'translator_e-mail':
        'victor.muratalla@yahoo.com',
    'last_changed':
        '2013-03-25'
};

SnapTranslator.dict.nl = {
    'language_name':
        'Nederlands',
    'language_translator':
        'Frank Sierens, Sjoerd Dirk Meijer',
    'translator_e-mail':
        'frank.sierens@telenet.be, sjoerddirk@fromScratchEd.nl',
    'last_changed':
        '2015-12-15'
};

SnapTranslator.dict.pl = {
    'language_name':
        'Polski',
    'language_translator':
        'Witek Kranas & deKrain',
    'translator_e-mail':
        'witek@oeiizk.waw.pl',
    'last_changed':
        '2016-11-14'
};

SnapTranslator.dict.zh_TW = {
    'language_name':
        '繁體中文',
    'language_translator':
        'cch',
    'translator_e-mail':
        'cchuang2009@gmail.com',
    'last_changed':
        '2013-8-14'
};

SnapTranslator.dict.no = {
    'language_name':
        'Norsk',
    'language_translator':
        'Olav A Marschall',
    'translator_e-mail':
        'mattebananer@gmail.com',
    'last_changed':
        '2013-09-16'
};

SnapTranslator.dict.dk = {
    'language_name':
        'Dansk',
    'language_translator':
        'FAB, Pelle Hjek',
    'translator_e-mail':
        'fab@nielsen.mail.dk, hjek@mail.com',
    'last_changed':
        '2016-11-16'
};

SnapTranslator.dict.el = {
    'language_name':
        'Ελληνικά',
    'language_translator':
        'Ino Samaras',
    'translator_e-mail':
        'ino.samaras@berkeley.edu',
    'last_changed':
        '2013-09-16'
};

SnapTranslator.dict.ca = {
    'language_name':
        'Català',
    'language_translator':
        'Bernat Romagosa Carrasquer, Joan Guillén i Pelegay',
    'translator_e-mail':
        'bernat@arduino.org, jguille2@xtec.cat',
    'last_changed':
        '2017-01-09'
};

SnapTranslator.dict.fi = {
    'language_name':
        'suomi',
    'language_translator':
        'Jouni K. Sepp\u00e4nen',
    'translator_e-mail':
        'jks@iki.fi',
    'last_changed':
        '2014-04-18'
};

SnapTranslator.dict.sv = {
    'language_name':
        'svenska',
    'language_translator':
        'Erik A. Olsson',
    'translator_e-mail':
        'eolsson@gmail.com',
    'last_changed':
        '2016-06-09'
};

SnapTranslator.dict.pt_BR = {
    'language_name':
        'Português do Brasil',
    'language_translator':
        'Aldo von Wangenheim',
    'translator_e-mail':
        'awangenh@inf.ufsc.br',
    'last_changed':
        '2014-04-20'
};

SnapTranslator.dict.bn = {
    'language_name':
        'বাংলা',
    'language_translator':
        'Dr. Mokter Hossain',
    'translator_e-mail':
        'mokter@gmail.com',
    'last_changed':
        '2014-07-02'
};

SnapTranslator.dict.kn = {
    'language_name':
        '\u0C95\u0CA8\u0CCD\u0CA8\u0CA1',
    'language_translator':
        'Vinayakumar R',
    'translator_e-mail':
        'vnkmr7620@gmail.com',
    'last_changed':
        '2014-12-02'
};

SnapTranslator.dict.ml = {
    'language_name':
        'Malayalam',
    'language_translator':
        'vinayakumar R',
    'translator_e-mail':
        'vnkmr7620@gmail.com',
    'last_changed':
        '2015-02-20'
};

SnapTranslator.dict.ta = {
    'language_name':
        'Tamil',
    'language_translator':
        'vinayakumar R',
    'translator_e-mail':
        'vnkmr7620@gmail.com',
    'last_changed':
        '2015-02-20'
};

SnapTranslator.dict.te = {
    'language_name':
        'Telagu', // the name as it should appear in the language menu
    'language_translator':
        'vinayakumar R', // your name for the Translators tab
    'translator_e-mail':
        'vnkmr7620@gmail.com', // optional
    'last_changed':
        '2015-02-20'
};

SnapTranslator.dict.tr = {
    'language_name':
        'Türkçe',
    'language_translator':
        'Hakan Atas',
    'translator_e-mail':
        'hakanatas@gmail.com',
    'last_changed':
        '2015-7-27'
};

SnapTranslator.dict.hu = {
    'language_name':
        'Magyar',
    'language_translator':
        'Makány György',
    'translator_e-mail':
        'makany.gyorgy@gmail.com',
    'last_changed':
        '2015-07-27'
};

SnapTranslator.dict.ia = {
    'language_name':
        'Interlingua',
    'language_translator':
        'Ken Dickey',
    'translator_e-mail':
        'Ken.Dickey@whidbey.com',
    'last_changed':
        '2015-08-09'
};

SnapTranslator.dict.hr = {
    'language_name':
        'Hrvatski',
    'language_translator':
        '\u017Deljko Hrvoj',
    'translator_e-mail':
        'zeljko.hrvoj@zg.t-com.hr',
    'last_changed':
        '2015-09-15'
};

SnapTranslator.dict.bg = {
    'language_name':
        'Български',
    'language_translator':
        'Ivan Savov',
    'translator_e-mail':
        'ivan.savov@gmail.com',
    'last_changed':
        '2015-11-16'
};

SnapTranslator.dict.ro = {
    'language_name':
        'Român',
    'language_translator':
        'Cristian Macarascu',
    'translator_e-mail':
        '',
    'last_changed':
        '2015-10-24'
};

SnapTranslator.dict.ar = {
    'language_name':
        'العربية', // the name as it should appear in the language menu
    'language_translator':
        'طارق جلال', // your name for the Translators tab
    'translator_e-mail':
        'tarekgalal46@hotmail.com', // optional
    'last_changed':
        '2016-02-24'
};

SnapTranslator.dict.id = {
    'language_name':
        'Bahasa Indonesia',
    'language_translator':
        'Alexander Raphael Liu',
    'translator_e-mail':
        'raphaxander@gmail.com',
    'last_changed':
        '2016-5-2'
};

SnapTranslator.dict.et = {
    'language_name':
        'Eesti',
    'language_translator':
        'Hasso Tepper',
    'translator_e-mail':
        'hasso.tepper@gmail.com',
    'last_changed':
        '2016-05-03'
};

SnapTranslator.dict.gl = {
    'language_name':
        'Galego',
    'language_translator':
        'tecnoloxia',
    'translator_e-mail':
        '',
    'last_changed':
        '2016-11-09'
};
