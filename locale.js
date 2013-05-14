/*

    locale.js

    spoken language translation for SNAP!

    written by Jens Mönig

    Copyright (C) 2013 by Jens Mönig

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

modules.locale = '2013-May-14';

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
        '2012-10-16',

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
            + 'custom block and all its instances?'
};

SnapTranslator.dict.de = {
    // meta information
    'language_name':
        'Deutsch',
    'language_translator':
        'Jens M\u00F6nig',
    'translator_e-mail':
        'jens@moenig.org',
    'last_changed':
        '2013-05-14'
};

SnapTranslator.dict.it = {
    // meta information
    'language_name':
        'Italiano',
    'language_translator':
        'Stefano Federici',
    'translator_e-mail':
        's_federici@yahoo.com',
    'last_changed':
        '2013-04-08'
};

SnapTranslator.dict.ja = {
    // meta information
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
    // meta information
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
    // meta information
    'language_name':
        '한국어',
    'language_translator':
        'Yunjae Jang',
    'translator_e-mail':
        'yunjae.jang@inc.korea.ac.kr',
    'last_changed':
        '2012-11-18'
};

SnapTranslator.dict.pt = {
    // meta information
    'language_name':
        'Português',
    'language_translator':
        'Manuel Menezes de Sequeira',
    'translator_e-mail':
        'mmsequeira@gmail.com',
    'last_changed':
        '2013-04-08'
};

SnapTranslator.dict.cs = {
    // meta information
    'language_name':
        'Česky',
    'language_translator':
        'Michal Moc',
    'translator_e-mail':
        'info@iguru.eu',
    'last_changed':
        '2013-03-11'
};

SnapTranslator.dict.zh = {
    // translations meta information
    'language_name':
        '简体中文',
    'language_translator':
        '邓江华',
    'translator_e-mail':
        'djh@rhjxx.cn',
    'last_changed':
        '2013-03-25'
};

SnapTranslator.dict.eo = {
    // translations meta information
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
    // translations meta information
    'language_name':
        'Fran\u00E7ais',
    'language_translator':
        'Jean-Jacques Valliet - Mark Rafter',
    'translator_e-mail':
        'i.scool@mac.com',
    'last_changed':
        '2012-11-27'
};

SnapTranslator.dict.si = {
    'language_name':
        'Sloven\u0161\u010Dina',
    'language_translator':
        'Sasa Divjak',
    'translator_e-mail':
        'sasa.divjak@fri.uni-lj.si',
    'last_changed':
        '2013-01-07'
};

SnapTranslator.dict.ru = {
    'language_name':
        'Русский',
    'language_translator':
        'Svetlana Ptashnaya',
    'translator_e-mail':
        'svetlanap@berkeley.edu',
    'last_changed':
        '2013-03-19'
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
