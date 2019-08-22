/*

    lang-de.js

    German translation for SNAP!

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



    Note to Translators:
    --------------------
    At this stage of development, Snap! can be translated to any LTR language
    maintaining the current order of inputs (formal parameters in blocks).

    Translating Snap! is easy:


    1. Download

    Download the sources and extract them into a local folder on your
    computer:

        <http://snap.berkeley.edu/snapsource/snap.zip>

    Use the German translation file (named 'lang-de.js') as template for your
    own translations. Start with editing the original file, because that way
    you will be able to immediately check the results in your browsers while
    you're working on your translation (keep the local copy of snap.html open
    in your web browser, and refresh it as you progress with your
    translation).


    2. Edit

    Edit the translation file with a regular text editor, or with your
    favorite JavaScript editor.

    In the first non-commented line (the one right below this
    note) replace "de" with the two-letter ISO 639-1 code for your language,
    e.g.

        fr - French => SnapTranslator.dict.fr = {
        it - Italian => SnapTranslator.dict.it = {
        pl - Polish => SnapTranslator.dict.pl = {
        pt - Portuguese => SnapTranslator.dict.pt = {
        es - Spanish => SnapTranslator.dict.es = {
        el - Greek => => SnapTranslator.dict.el = {

    etc. (see <http://en.wikipedia.org/wiki/ISO_639-1>)


    3. Translate

    Then work through the dictionary, replacing the German strings against
    your translations. The dictionary is a straight-forward JavaScript ad-hoc
    object, for review purposes it should be formatted as follows:

        {
            'English string':
                'Translation string',
            'last key':
        }       'last value'

    and you only edit the indented value strings. Note that each key-value
    pair needs to be delimited by a comma, but that there shouldn't be a comma
    after the last pair (again, just overwrite the template file and you'll be
    fine).

    If something doesn't work, or if you're unsure about the formalities you
    should check your file with

        <http://JSLint.com>

    This will inform you about any missed commas etc.


    4. Accented characters

    Depending on which text editor and which file encoding you use you can
    directly enter special characters (e.g. Umlaut, accented characters) on
    your keyboard. However, I've noticed that some browsers may not display
    special characters correctly, even if other browsers do. So it's best to
    check your results in several browsers. If you want to be on the safe
    side, it's even better to escape these characters using Unicode.

        see: <http://0xcc.net/jsescape/>


    5. Block specs:

    At this time your translation of block specs will only work
    correctly, if the order of formal parameters and their types
    are unchanged. Placeholders for inputs (formal parameters) are
    indicated by a preceding % prefix and followed by a type
    abbreviation.

    For example:

        'say %s for %n secs'

    can currently not be changed into

        'say %n secs long %s'

    and still work as intended.

    Similarly

        'point towards %dst'

    cannot be changed into

        'point towards %cst'

    without breaking its functionality.


    6. Submit

    When you're done, rename the edited file by replacing the "de" part of the
    filename with the two-letter ISO 639-1 code for your language, e.g.

        fr - French => lang-fr.js
        it - Italian => lang-it.js
        pl - Polish => lang-pl.js
        pt - Portuguese => lang-pt.js
        es - Spanish => lang-es.js
        el - Greek => => lang-el.js

    and send it to me for inclusion in the official Snap! distribution.
    Once your translation has been included, Your name will the shown in the
    "Translators" tab in the "About Snap!" dialog box, and you will be able to
    directly launch a translated version of Snap! in your browser by appending

        lang:xx

    to the URL, xx representing your translations two-letter code.


    7. Known issues

    In some browsers accents or ornaments located in typographic ascenders
    above the cap height are currently (partially) cut-off.

    Enjoy!
    -Jens
*/

/*global SnapTranslator*/

SnapTranslator.dict.tr = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    Ä, ä   \u00c4, \u00e4
    Ö, ö   \u00d6, \u00f6
    Ü, ü   \u00dc, \u00fc
    ß      \u00df
*/

    // translations meta information
    'language_name':
        'Türkçe', // the name as it should appear in the language menu (Dil menüsünde görünmesi gereken isim)
    'language_translator':
        'Hakan Atas - www.3drobolab.com, Turgut Güneysu', // your name for the Translators tab (Çevirenlerin isimleri)
    'translator_e-mail':
        'hakanatas@gmail.com, tguneysu@msn.com, mustafaipekbayrak@gmail.com', // optional (Mail adresleri)
    'last_changed':
        '2019-01-22', // this, too, will appear in the Translators tab (Son güncelleme tarihi)

    // GUI
    // control bar:
    'untitled':
        'kaydedilmemiş',
    'development mode':
        'geliştirici modu',

    // categories:
    'Motion':
        'Hareket',
    'Looks':
        'Görünümler',
    'Sound':
        'Ses',
    'Pen':
        'Kalem',
    'Control':
        'Kontrol',
    'Sensing':
        'Algılama',
    'Operators':
        'İşlemler',
    'Variables':
        'Değişkenler',
    'Lists':
        'Listeler',
    'Other':
        'Diğerleri',

    // editor:
    'draggable':
        'sürüklenebilir',

    // tabs:
    'Scripts':
        'Betikler',
    'Costumes':
        'Kostümler',
    'Backgrounds':
        'Arka Planlar',
    'Sounds':
        'Sesler',

    // names:
    'Sprite':
        'Kukla',
    'Stage':
        'Sahne',

    // rotation styles:
    'don\'t rotate':
        'dönemez',
    'can rotate':
        'dönebilir',
    'only face left/right':
        'sadece sağa/sola bakabilir',

    // new sprite button:
    'add a new sprite':
        'yeni bir kukla ekle',
    'add a new Turtle sprite':
        'yeni bir kaplumbağa kukla ekle',
    'paint a new sprite':
        'yeni bir kukla resmi yap',
    'take a camera snapshot and\nimport it as a new sprite':
        'bir kamera görüntüsü al ve \nonu yeni bir kukla olarak ekle',

    // tab help
    'costumes tab help':
        'bilgisayarınızdan bir resmi\nburaya sürükleyerek içeri aktarın',

    'import a sound from your computer\nby dragging it into here':
        'bilgisayarınızdan bir sesi\nburaya sürükleyerek içeri aktarın',

    // primitive blocks:

    /*
        Attention Translators:
        ----------------------
        At this time your translation of block specs will only work
        correctly, if the order of formal parameters and their types
        are unchanged. Placeholders for inputs (formal parameters) are
        indicated by a preceding % prefix and followed by a type
        abbreviation.

        For example:

            'say %s for %n secs'

        can currently not be changed into

            'say %n secs long %s'

        and still work as intended.

        Similarly

            'point towards %dst'

        cannot be changed into

            'point towards %cst'

        without breaking its functionality.
    */

    // motion:
    'Stage selected:\nno motion primitives':
        'Seçili sahne:\nhareket temel blokları yok',

    'move %n steps':
        '%n adım git',
    'turn %clockwise %n degrees':
        '%clockwise yönünde %n derece dön',
    'turn %counterclockwise %n degrees':
        '%counterclockwise yönünde %n derece dön',
    'point in direction %dir':
        '%dir yönüne dön',
    'point towards %dst':
        '%dst  doğru dön',
    'go to x: %n y: %n':
        'x: %n y: %n git',
    'go to %dst':
        '%dst git',
    'glide %n secs to x: %n y: %n':
        '%n saniyede x: %n y: %n noktasına kay',
    'change x by %n':
        'x\'i %n değiştir',
    'set x to %n':
        'x\'i %n yap',
    'change y by %n':
        'y\'i %n değiştir',
    'set y to %n':
        'y\'i %n yap',
    'if on edge, bounce':
        'kenardaysan sek',
    'x position':
        'x-pozisyonu',
    'y position':
        'y-pozisyonu',
    'direction':
        'yön',

    // looks:
    'switch to costume %cst':
        'kostümü %cst yap',
    'next costume':
        'sonraki kostüm',
    'costume #':
        'kostüm #',
    'say %s for %n secs':
        '%s de %n saniye',
    'say %s':
        '%s de',
    'think %s for %n secs':
        '%s diye düşün %n saniye',
    'think %s':
        '%s diye düşün',
    'Hello!':
        'Merhaba!',
    'Hmm...':
        'Hmm...',
    'change %eff effect by %n':
        '%eff etkisini %n değiştir',
    'set %eff effect to %n':
        '%eff etkisini %n yap',
    'clear graphic effects':
        'görsel etkileri temizle',
    'change size by %n':
        'büyüklüğü %n değiştir',
    'set size to %n %':
        'büyüklüğü % %n yap',
    'size':
        'büyüklük',
    'show':
        'göster',
    'hide':
        'gizle',
    'go to front':
        'öne git',
    'go to %layer layer':
        'katman %layer git',
    'front':
        'öne',
    'back':
        'arkaya',
    'go back %n layers':
        '%n katman arkaya git',

    'development mode \ndebugging primitives:':
        'geliştirici modu\nhata ayıklama temel blokları',
    'console log %mult%s':
        'log dosyasına yaz %mult%s',
    'alert %mult%s':
        'uyarı: %mult%s',

    // sound:
    'play sound %snd':
        '%snd sesini çal',
    'play sound %snd until done':
        '%snd sesini bitene kadar çal',
    'stop all sounds':
        'tüm sesleri durdur',
    'rest for %n beats':
        '%n vuruş sus',
    'play note %note for %n beats':
        '%note notasını %n vuruş çal',
    'set instrument to %inst':
        'enstrümanı %inst yap',
    'change tempo by %n':
        'tempoyu %n değiştir',
    'set tempo to %n bpm':
        'tempoyu %n yap',
    'tempo':
        'tempo',

    // "instruments", i.e. wave forms
    '(1) sine':
        '(1) Sinus',
    '(2) square':
        '(2) Kare',
    '(3) sawtooth':
        '(3) Testere',
    '(4) triangle':
        '(4) Üçgen',


    // pen:
    'clear':
        'temizle',
    'pen down':
        'kalemi bastır',
    'pen up':
        'kalemi kaldır',
    'set pen color to %clr':
        'kalemin rengini %clr yap',
    'change pen color by %n':
        'kalemin rengini %n değiştir',
    'set pen color to %n':
        'kalemin rengini %n yap',
    'change pen %hsva by %n':
        'Kalemin %hsva  %n değiştir',
    'set pen %hsva to %n':
        'Kalemin %hsva  %n yap',
    'change pen size by %n':
        'kalemin kalınlığını %n değiştir',
    'set pen size to %n':
        'kalemin kalınlığını %n yap',
    'stamp':
        'damgala',
    'fill':
        'doldur',



    // control:
    'when %greenflag clicked':
        '%greenflag tıklanınca',
    'when %keyHat key pressed':
        '%keyHat tuşu basılınca',
    'when I am %interaction':
        'kukla %interaction zaman',
    'clicked':
        'tıklandığı',
    'pressed':
        'basıldığı',
    'dropped':
        'bırakıldığı',
    'mouse-entered':
        'fare geldiği',
    'mouse-departed':
        'fare gittiği',
    'scrolled-down':
        'aşağı kaydırıldığı',
    'scrolled-up':
        'yukarı kaydırıldığı',
    'stopped':
        'durdurulduğu',
    'when %b':
        '%b olunca',
    'when I receive %msgHat':
        '%msgHat haberi gelince',
    'broadcast %msg':
        '%msg yayımla',
    'broadcast %msg and wait':
        '%msg yayımla ve bekle',
    'Message name':
        'Mesaj adı',
    'message':
        'mesaj',
    'any message':
        'herhangi bir mesaj',
    'wait %n secs':
        '%n sn bekle',
    'wait until %b':
        '%b olana kadar bekle',
    'forever %c':
        'sürekli %c',
    'repeat %n %c':
        'tekrarla %n kere %c',
    'repeat until %b %c':
        'tekrarla %b olana kadar %c',
    'if %b %c':
        'eğer %b %c',
    'if %b %c else %c':
        'eğer %b %c değilse %c',
    'report %s':
        'bildir %s',
    'stop %stopChoices':
        'durdur %stopChoices',
    'all':
        'tümü',
    'this script':
        'bu betik',
    'this block':
        'bu blok',
    'stop %stopOthersChoices':
        'durdur %stopOthersChoices',
    'all but this script':
        'bu betik hariç diğerleri',
    'other scripts in sprite':
        'bu kukla içindeki diğer betikler',
    'pause all %pause':
        'tümünü beklet %pause',
    'run %cmdRing %inputs':
        'çalıştır %cmdRing  %inputs',
    'launch %cmdRing %inputs':
        'başlat %cmdRing %inputs',
    'call %repRing %inputs':
        'çağır %repRing %inputs',
    'run %cmdRing w/continuation':
        'çalıştır %cmdRing (arta kalanlı)',
    'call %cmdRing w/continuation':
        'çağır %cmdRing (arta kalanlı)',
    'warp %c':
        'Turbo %c',
    'when I start as a clone':
        'Klon olarak başladığımda',
    'create a clone of %cln':
        '%cln klonunu oluştur',
    'a new clone of %cln':
        '%cln in yeni bir klonu',
    'myself':
        'kendim',
    'delete this clone':
        'bu klonu sil',
    'tell %spr to %cmdRing %inputs':
        'söyle %spr bunu yapsın %cmdRing  %inputs',
    'ask %spr for %repRing %inputs':
        'sor %spr bunun cevabı %repRing %inputs',

    // sensing:
    'touching %col ?':
        '%col değiyor mu?',
    'touching %clr ?':
        '%clr rengine değiyor mu?',
    'color %clr is touching %clr ?':
        '%clr rengi %clr rengine değiyor mu?',
    'ask %s and wait':
        '%s sor ve bekle',
    'what\'s your name?':
        'adınız ne?',
    'answer':
        'cevap',
    'mouse x':
        'Fare x-konumu',
    'mouse y':
        'Fare y-konumu',
    'mouse down?':
        'fare basılı mı?',
    'key %key pressed?':
        '%key tuşu basılı mı?',
    '%rel to %dst':
        '%rel buna: %dst',
    'distance':
        'mesafe',
//    '%asp at %loc' :
//        '%asp bei %loc',
    'sprites' :
        'kuklalar',
    'reset timer':
        'zamanlayıcıyı sıfırla',
    'timer':
        'zamanlayıcı',
    
    '%att of %spr':
        '%att bunun: %spr',
    'my %get':
        'benim %get',
    'http:// %s':
        'http:// %s',
    'turbo mode?':
        'turbo mod?',
    'set turbo mode to %b':
        'turbo modu %b yap',
    'current %dates':
        'şu anki %dates',
    'year':
        'yıl',
    'month':
        'ay',
    'date':
        'gün',
    'day of week':
        'haftanın günü',
    'hour':
        'saat',
    'minute':
        'dakika',
    'second':
        'saniye',
    'time in milliseconds':
        'milisaniye',

    'filtered for %clr':
        '%clr için filtrele',
    'stack size':
        'yığıt boyutu',
    'frames':
        'çerçeveler',

    // operators:
    '%n mod %n':
        '%n mod %n',
    'round %n':
        '%n yuvarla',
    '%fun of %n':
        '%fun bunun: %n',
    'pick random %n to %n':
        '%n ile %n arasında rastgele sayı',
    '%b and %b':
        '%b ve %b',
    '%b or %b':
        '%b veya %b',
    'not %b':
        '%b değil',
    'true':
        'doğru',
    'false':
        'yanlış',
    'join %words':
        '%words birleştir',
    'split %s by %delim':
        '%s ayır %delim e göre',
    'hello':
        'merhaba',
    'world':
        'dünya',
    'letter %idx of %s':
        '%idx harfi bunun: %s',
    'length of %s':
        '%s in uzunluğu',
    'unicode of %s':
        '%s harfinin unicode değeri',
    'unicode %n as letter':
        '%n unicode değerinin harfi',
    'is %s a %typ ?':
        '%s bir %typ mi?',
    'is %s identical to %s ?':
        '%s ile %s aynı mı?',
    'JavaScript function ( %mult%s ) { %code }':
        'JavaScript fonksiyonu ( %mult%s ) { %code }',
    'compile %repRing':
        'derle %repRing',
    'type of %s':
        '%s un tipi',

    // variables:
    'Make a variable':
        'Değişken oluştur',
    'Variable name':
        'Değişken adı',
    'Script variable name':
        'Betik değişken adı',
    'inherit %shd':
        'kalıt al: %shd',
    'Delete a variable':
        'Değişkeni sil',

    'set %var to %s':
        '%var  %s olsun',
    'change %var by %n':
        '%var i %n değiştir',
    'show variable %var':
        '%var değişkenini göster',
    'hide variable %var':
        '%var değişkenini gizle',
    'script variables %scriptVars':
        'betik değişkenleri: %scriptVars',

    // lists:
    'list %exp':
        'liste %exp',
    '%s in front of %l':
        '%s i %l en öne koy',
    'item %idx of %l':
        'öğe %idx  %l listesinin',
    'all but first of %l':
        '%l in ilk elemanı hariç tümü',
    'length of %l':
        '%l nin uzunluğu',
    '%l contains %s':
        '%l %s i içeriyor',
    'thing':
        'şey',
    'add %s to %l':
        '%s i %l ye ekle',
    'delete %ida of %l':
        'sil %ida öğesini %l listesinin',
    'insert %s at %idx of %l':
        'ekle %s %idx öğesine %l listesinin',
    'replace item %idx of %l with %s':
        'değiştir %idx öğesini %l listesinin %s ile',

    // other
    'Make a block':
        'Yeni bir blok oluştur',

    // menus
    // snap menu
    'About...':
        'Snap Hakkında!...',
    'Reference manual':
        'Başvuru kitabı',
    'Snap! website':
        'Snap! web sitesi',
    'Download source':
        'Kaynak kodu indir',
    'Switch back to user mode':
        'Kullanıcı moduna geri dön',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'Morfik içerik menüsünü\nkapat\nve kullanımı kolay olanları göster',
    'Switch to dev mode':
        'geliştirici moduna dön',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'Morfik içerik menüsü\nve gözlemleme etkinleştir\nkullanımı kolay değil',

    // project menu
    'Project notes...':
        'Proje notları...',
    'New':
        'Yeni',
    'Open...':
        'Aç...',
    'Save':
        'Kaydet',
    'Save to disk':
        'Diske kaydet',
    'store this project\nin the downloads folder\n(in supporting browsers)':
        'bu projeyi indirilenler\nklasörüne kaydet \n(destekleyen tarayıcılarda)',
    'Save As...':
        'Farklı kaydet...',
    'Import...':
        'İçeri aktar...',
    'file menu import hint':
        'Bilgisayarınızdaki bir projeyi, kütüphaneyi,\nblokları, kostümleri veya sesleri\nSNAP! a yükleyin',
    'Export project as plain text...':
        'Projeyi düz metin olarak dışarı aktar...',
    'Export project...':
        'Projeyi dışarı aktar...',
    'save project data as XML\nto your downloads folder':
        'proje verilerini indirme klasörünüze \nXML olarak kaydedin',
    'show project data as XML\nin a new browser window':
        'Proje verilerini XML olarak\nyeni bir pencerede göster',
    'Export blocks...':
        'Blokları dışarı aktar...',
    'show global custom block definitions as XML\nin a new browser window':
        'global özel blok tanımlarını\nXML olarak indirme klasörünüze kaydedin',
    'Unused blocks...':
          'kullanılmayan bloklar...',
    'find unused global custom blocks\nand remove their definitions':
        'kullanılmayan global özel blokları bulun\nve tanımlarını kaldırın',
    'Remove unused blocks':
        'kullanılmayan blokları kaldırın',
    'there are currently no unused\nglobal custom blocks in this project':
        'şu anda bu projede\nkullanılmamış özel blok yok',
    'unused block(s) removed':
        'kullanılmayan bloklar kaldırıldı',
    'Export summary...':
        'Dışarı aktarım özeti...',
    'open a new browser browser window\n with a summary of this project':
        'bu projenin bir özetini içeren\nverileri indirme klasörünüze \nXML olarak kaydedin',
    'Contents':
        'İçerikler',
    'Kind of':
        'Tipi',
    'Part of':
        'Parçası',
    'Parts':
        'Parçalar',
    'Blocks':
        'Bloklar',
    'For all Sprites':
        'Tüm kuklalar için',
    'Import tools':
        'TOOLS ktp içeri aktar',
    'load the official library of\npowerful blocks':
        'güçlü blokların resmi\nkütüphanesini yükletin',
    'Libraries...':
        'Kütüphaneler...',
    'Select categories of additional blocks to add to this project.':
        'Bu projeye eklemek için ek blok kategorileri seçin.',
    'Select a costume from the media library':
        'Medya kütüphanesinden bir kostüm seçin',
    'Select a sound from the media library':
        'Medya kütüphanesinden bir ses seçin',

    //Libraries
    'Import library':
        'Kütüphaneyi içeri aktar',
    'Loading':
        'Yükleniyor',
    'Imported':
        'İçeri aktarıldı',
    'Iteration, composition':
        'Yineleme, kompozisyon',
    'List utilities':
        'liste yardımcı programları',
    'Variadic reporters':
        'Çok girdili bildirenler',
    'Web services access (https)':
        'Web servislerine ulaşım (https)',
    'Multi-branched conditional (switch)':
        'Çok dallı koşullu (switch)',
    'LEAP Motion controller':
        'LEAP Motion denetleyicisi',
    'Words, sentences':
        'kelimelerö cümleler',
    'Catch errors in a script':
        'Betikteki hataları bul',
    'Set RGB or HSV pen color':
        'Kalem rengini RGB veya HSV olarak ayarla',
    'Text to speech':
        'Metinden konuşmaya',
    'Provide 100 selected colors':
        '100 seçili renk sağlayın',
    'Infinite precision integers, exact rationals, complex':
        'Sonsuz hassasiyetli tam sayılar, kesin rasyonlar, karışık sayılar',
    'Provide getters and setters for all GUI-controlled global settings':
        'GUI kontrollü tüm global ayarlar için alıcılar ve ayarlayıcılar sağlayın',
    'Allow multi-line text input to a block':
        'Bloklara çok satırlı metin girişi sağla',
    'create variables in program':
        'Betiklerde değişken yarat',
    // cloud menu
    'Login...':
        'Giriş yap...',
    'Signup...':
        'Kayıt ol...',
    'Logout':
        'Çıkış yap',
    'Change Password...':
        'Şifre değiştir...',
    'Reset Password...':
        'Şifre yenile...',
    'Resend Verification Email...':
        'Doğrulama e-postasını tekrar gönder...',
    // settings menu
    'Language...':
        'Dil...',
    'Zoom blocks...':
        'Blokları büyült...',
    'Stage size...':
        'Sahne boyutu...',
    'Stage size':
        'Sahne boyutu',
    'Stage width':
        'Sahne genişliği',
    'Stage height':
        'Sahne yüksekliği',
    'Default':
        'Varsayılan',
    'Blurred shadows':
        'Bulanmış gölgeler',
    'uncheck to use solid drop\nshadows and highlights':
        'katı gölge ve parlaklık kullanmak\niçin seçimi kaldırın',
    'check to use blurred drop\nshadows and highlights':
        'gölge ve parlaklıkları bulanık\nhale getirmek için seçim yapın',
    'Zebra coloring':
        'çizgili boyama',
    'check to enable alternating\ncolors for nested blocks':
        'iç içe bloklarda değişmeli\nrenkler için seçim yapın',
    'uncheck to disable alternating\ncolors for nested block':
        'iç içe bloklarda değişmeli renkleri\nkaldırmak için seçimi kaldırın',
    'Dynamic input labels':
        'Dinamik girdi etiketleri',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'farklı girdiler için dinamik etiketlemeyi\nkaldırmak için seçimi kaldırın',
    'check to enable dynamic\nlabels for variadic inputs':
        'farklı girdiler için dinamik etiketlemeyi\netkinleştirmek için seçim yapın',
    'Prefer empty slot drops':
        'Boş yer tutucuları atmayı tercih et',
    'settings menu prefer empty slots hint':
        'boş yer tutucuları için menü ayarları',
    'uncheck to allow dropped\nreporters to kick out others':
        'kullanılmayan bildirenlerin başkalarını atmaları için işareti kaldır',
    'check to turn on\n visible stepping (slow)':
        'görünür adım adım yürütüm\niçin seçin (yavaş)',
    'uncheck to turn off\nvisible stepping':
        'görünür adım adım yürütümü\nkapatmak için işareti kaldır',
    'Long form input dialog':
        'girdi dialogları için uzun form',
    'Plain prototype labels':
        'Sade prototip etiketleri',
    'uncheck to always show (+) symbols\nin block prototype labels':
        'prototip etiketinde (+) sembolünün\ngörünmesi için seçimi kaldırın',
    'check to hide (+) symbols\nin block prototype labels':
        'prototip etiketinde (+) sembolünün\ngizlenmesi için seçim yapın',
    'check to always show slot\ntypes in the input dialog':
        'girdi dialoglarında girdi tipinin \ngörünmesi için seçim yapın',
    'uncheck to use the input\ndialog in short form':
        'girdi dialoglarını kısa form\nolarak kullanmak için seçimi kaldırın',
    'Virtual keyboard':
        'Sanal klavye',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'mobil araçlar için\nsanal klavye desteğini\nkaldırmak için seçimi kaldırın',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'mobil araçlar için\nsanal klavye desteğini\naktifleştirmek için seçim yapın',
    'Input sliders':
        'Girdi sürgüleri',
    'uncheck to disable\ninput sliders for\nentry fields':
        'girdi alanlarındanki girdi sürgülerini etkisizleştirmek için seçimi kaldırın',
    'check to enable\ninput sliders for\nentry fields':
        'girdi alanlarındanki girdi sürgülerini \naktifleştirmek için seçim yapın',
    'Retina display support':
        'Retina ekran desteği',
    'uncheck for lower resolution,\nsaves computing resources':
        'düşük çözünürlük için işareti kaldırın,\nbilgi işlem kaynaklarını korur',
    'check for higher resolution,\nuses more computing resources':
        'daha yüksek çözünürlük için kontrol edin\ndaha fazla bilgi işlem kaynağını kullanır',
    'Codification support':
        'Kodlama desteği',
    'Clicking sound':
        'Tıklama sesi',
    'uncheck to turn\nblock clicking\nsound off':
        'blok tıklama sesini \nkapatmak için seçimi kaldırın',
    'check to turn\nblock clicking\nsound on':
        'blok tıklama sesini \naçmak için seçim yapın',
    'Animations':
        'Animasyonlar',
    'uncheck to disable\nIDE animations':
        'IDE animasyonları etkisizliştirmek için\nseçimi kaldırın',
    'Turbo mode':
        'Turbo Mod',
    'check to prioritize\nscript execution':
        'Betik çalışmasına öncelik\nvermek için seçim yapın',
    'uncheck to run scripts\nat normal speed':
        'betiklerin normal hızla çalışması\niçin seçimi kaldırın',
    'check to enable\nIDE animations':
        'IDE animasyonlarını\naktifleştirmek için seçim yapın',
    'Flat design':
        'Sade tasarım',
    'check for alternative\nGUI design':
        'alternatif GUI tasarımı için seçin',
    'uncheck for default\nGUI design':
        'varsayılan GUI tasarımı için seçimi kaldırın',
    'Nested auto-wrapping':
        'İç içe automatik kaydırma',
    'Keyboard Editing':
        'Klavyeyle düzenleme',
    'Table support':
        'Tablo desteği',
    'Table lines':
        'Tablo çizgileri',
    'Visible stepping':
        'Adım adım yürütüm',
    'Thread safe scripts':
        'Olay yinelemeyi yoksay',
    'uncheck to allow\nscript reentrance':
        'betiğe tekrar girişe\nizin vermek için seçimi kaldırın',
    'check to disallow\nscript reentrance':
        'betiğe tekrar girişe\nizin vermemek için seçim yapın',
    'Prefer smooth animations':
        'Pürüzsüz animasyonu tercih et',
    'uncheck for greater speed\nat variable frame rates':
        'Değişken kare hızlarında \ndaha yüksek hız için işareti kaldırın',
    'check for smooth, predictable\nanimations across computers':
        'bilgisayarlar arası düz,tahmin edilebilir\nanimasyonlar için seçim yapın',
    'Flat line ends':
        'Düz çizgi bitimleri',
    'check for flat ends of lines':
        'düz biten çizgiler\niçin seçin',
    'uncheck for round ends of lines':
        'yuvarlak biten çizgiler\niçin seçimi kaldırın',
    'Ternary Boolean slots':
        'Üçlü Boole yer tutucuları',
    'Inheritance support':
        'Kalıtım desteği',
    // inputs
    'with inputs':
        'girdi ile',
    'input names:':
        'girdi isimleri:',
    'Input Names:':
        'Girdi isimleri:',
    'input list:':
        'girdi listesi:',

    // context menus:
    'help':
        'yardım',

    // palette:
    'find blocks':
        'blokları bul',
    'hide primitives':
        'temel blokları gizle',
    'show primitives':
        'temel blokları göster',

    // blocks:
    'help...':
        'yardım...',
    'relabel...':
        'yeniden adlandır...',
    'duplicate':
        'kopyala',
    'make a copy\nand pick it up':
        'kopya oluştur\nve onu al',
    'only duplicate this block':
        'sadece bu bloğun kopyasını oluştur',
    'delete':
        'sil',
    'script pic...':
        'betik resmi...',
    'open a new window\nwith a picture of this script':
        'bu betiğin resmini\nyeni bir pencerede açın',
    'ringify':
        'ringify - veri yap',
    'unringify':
        'unringify - veri yapma',
    'transient':
        'geçici',
    'uncheck to save contents\nin the project':
        'içeriğin projede kaydedilmesi\niçin işareti kaldırın',
    'check to prevent contents\nfrom being saved':
        'içeriğin projede\nkaydedilmemesi için seçin',
    'new line':
        'yeni satır',
    // custom blocks:
    'delete block definition...':
        'blok tanımlarını sil...',
    'duplicate block definition...':
        'çifte blok tanımı...',
    'edit...':
        'düzenle...',

    // sprites:
    'edit':
        'kalıcı klon ol',
    'clone':
        'klon yap',
    'move':
        'hareket et',
    'pivot':
        'dönme noktası',
    'edit the costume\'s\nrotation center':
        'kostümün dönme\nmerkezini düzenle',
    'rotate':
        'Dön',
    'detach from':
        'kukladan ayır: ',
    'detach all parts':
        'tüm parçaları ayır',
    'export...':
        'dışarı aktar...',
    'parent...':
        'üst öğe...',
    'current parent':
        'şimdiki üst öğe',
    'release':
        'geçici klon ol',
    'make temporary and\nhide in the sprite corral':
        'geçici yap ve kukla alanında gizle',
    // stage:
    'show all':
        'hepsini göster',
    'pic...':
        'resimler...',
    'open a new window\nwith a picture of the stage':
        'sahnenin resmini\n yeni bir pencerede aç',
    'turn all pen trails and stamps\ninto a new background for the stage':
        'tüm kalem izlerini ve damgaları sahne için yeni bir arka plana dönüştür',
    'turn all pen trails and stamps\ninto a new costume for the\ncurrently selected sprite':
        'tüm kalem izlerini ve damgaları şimdiki kukla için yeni bir kostüme dönüştür',
    // scripting area
    'clean up':
        'temizle',
    'arrange scripts\nvertically':
        'betikleri dikey olarak düzenle',
    'add comment':
        'yorum ekle',
    'undrop':
        'Geri al',
    'undo the last\nblock drop\nin this pane':
        'alana bıraktığın\n son bloğu geri al',
    'redrop':
        'yine bırak',
    'use the keyboard\nto enter blocks':
        'blokları klavyeden gir',
    'scripts pic...':
        'betik resimleri...',
    'open a new window\nwith a picture of all scripts':
        'tüm betiklerin resmini\nyeni bir pencerede aç',
    'make a block...':
        'bir blok oluştur...',

    // costumes
    'rename':
        'yeniden adlandır',
    'export':
        'dışarı aktar',
    'rename costume':
        'Köstümü yeniden adlandır',

    // sounds
    'Play sound':
        'Sesi çal',
    'Stop sound':
        'Sesi durdur',
    'Stop':
        'Durdur',
    'Play':
        'Çal',
    'rename sound':
        'sesi yeniden adlandır',

    // lists and tables
    'list view...':
        'liste görünümü...',
    'table view...':
        'tablo görünümü...',
    'Table view':
        'Tablo görünümü',
    'open in dialog...':
        'yeni pencerede aç',
    'reset columns':
        'sütunları sıfırla',
    'items':
        'öğeler',

    // dialogs
    // buttons
    'OK':
        'TAMAM',
    'Ok':
        'Tamam',
    'Cancel':
        'İptal',
    'Yes':
        'Evet',
    'No':
        'Hayır',

    // help
    'Help':
        'Yardım',

    // zoom blocks
    'Zoom blocks':
        'Blokları büyült',
    'build':
        'Kendi',
    'your own':
        'bloklarını',
    'blocks':
        'oluştur',
    'normal (1x)':
        'normal (1x)',
    'demo (1.2x)':
        'demo (1.2x)',
    'presentation (1.4x)':
        'sunum (1.4x)',
    'big (2x)':
        'büyük (2x)',
    'huge (4x)':
        'kocaman (4x)',
    'giant (8x)':
        'devasa (8x)',
    'monstrous (10x)':
        'çok büyük (10x)',

    // Project Manager
    'Untitled':
        'Kayıtlanmamış',
    'Open Project':
        'Projec aç',
    'Open':
        'Aç',
    '(empty)':
        '(boş)',
    'Saved!':
        'Kaydedildi!',
    'Delete Project':
        'Projeyi sil',
    'Are you sure you want to delete':
        'Silmek istediğinize emin misiniz?',
    'rename...':
        'yeniden adlandır...',
    'Examples':
        'Örnekler',
    'Share':
        'Paylaş',
    'Updating\nproject list...':
        'Proje listesi güncelleniyor...',
    'Recover':
        'Kurtar',
    'Today':
        'Bugün',
    'Yesterday':
        'Dün',
    // costume editor
    'Costume Editor':
        'Kostüm Editörü',
    'Paint Editor':
        'Resim Editörü',
    'click or drag crosshairs to move the rotation center':
        'dönme merkezini ayarlamak için resmi tıklayın veya artı ikonunu sürükleyin',
    'undo':
        'geri al',
    'Vector':
        'Vektör',
    'Paintbrush tool\n(free draw)':
        'Fırça (serbest çizme)',
    'Stroked Rectangle\n(Shift: square)':
        'Konturlu Dikdörtgen (Shift: kare)',
    'Stroked Ellipse\n(Shift: circle)':
        'Konturlu Elips\n(Shift: daire)',
    'Eraser tool':
        'Silgi',
    'Set the rotation center':
        'Dönme noktasını ayarla',
    'Line tool\n(Shift: vertical/horizontal)':
        'Çizgi\n(Shift: yatay/dikey)',
    'Filled Rectangle\n(Shift: square)':
        'dolu Dikdörtgen\n(Shift: kare)',
    'Filled Ellipse\n(Shift: circle)':
        'dolu Elips\n(Shift: daire)',
    'Fill a region':
        'alanı seçilmiş renkle doldur',
    'Pipette tool\n(pick a color anywhere)':
        'Pipet (herhangi bir yere tıklayıp oradaki rengi seçin)',
    'Brush size':
        'Fırça boyutu',
    'Constrain proportions of shapes?\n(you can also hold shift)':
        'Şekillerin oranlarını sınırlama\n(Shift-Tuşu da yapar)',
    'grow':
        'büyült',
    'shrink':
        'ufalt',
    'flip ↔':
        'yatay çevir ↔',
    'flip ↕':
        'dikey çevir ↕',

    'Vector Paint Editor':
        'Vektör Resim Editörü',
    'Rectangle\n(shift: square)':
        'Dikdörtgen (Shift: kare)',
    'Ellipse\n(shift: circle)':
        'Elips\n(Shift: daire)',
    'Selection tool':
        'Seçme Aracı',
    'Line tool\n(shift: constrain to 45º)':
        'Çizgi\n(Shift: 45° dereceli ayarlar)',
    'Closed brush\n(free draw)':
        'Kontoru kapanan dolu şekil\n(serbest çizme)',
    'Paint a shape\n(shift: secondary color)':
        'alanı seçilmiş 1ci renkle doldur\n(Shift: 2ci renk)',
    'Pipette tool\n(pick a color from anywhere\nshift: secondary color)':
        'Pipet\nherhangi bir yere tıklayıp oradaki\nrengi seçin (Shift: 2ci renk)',
    'grow':
        'büyült',
    'shrink':
        'küçült',
    'flip \u2194':
        'yatay çevir \u2194',
    'flip \u2195':
        'dikey çevir \u2195',
    'Primary color      Secondary color':
        '1ci Renk               2ci Renk',
    'Top':
        'Üst',
    'Bottom':
        'Alt',
    'Up':
        'Yukarı',
    'Down':
        'Aşağı',

   // project notes
    'Project Notes':
        'Proje Notları',

    // new project
    'New Project':
        'Yeni proje',
    'Replace the current project with a new one?':
        'Şu an ki projeyi yenisiyle değiştirelim mi?',

    // save project
    'Save Project As...':
        'Projeyi farklı kaydet...',
    'Save Project':
        'Projeyi kaydet',
    // export blocks
    'Export blocks':
        'Blokları dışarı aktar',
    'Import blocks':
        'Blokları içeri aktar',
    'this project doesn\'t have any\ncustom global blocks yet':
        'bu proje henüz herhangi bir özel genel blok içermiyor',
    'select':
        'seç',
    'none':
        'hiçbiri',

    // variable dialog
    'for all sprites':
        'tüm kuklalar için',
    'for this sprite only':
        'sadece bu kukla için',
    // variables refactoring
    'rename only\nthis reporter':
        'yalnız bu bildirenin adını değiştir',
    'rename all...':
        'tümünün adını değiştir...',
    'rename all blocks that\naccess this variable':
        'bu bloğu kullanan tüm blokların adını değiştir',

    // block dialog
    'Change block':
        'Bloğu değiştir',
    'Command':
        'Komut',
    'Reporter':
        'Bildiren',
    'Predicate':
        'Karşılaştırma',

    // block editor
    'Block Editor':
        'Blok Editörü',
    'Method Editor':
        'Metod Editörü',
    'Apply':
        'Uygula',

    // block deletion dialog
    'Delete Custom Block':
        'Özel Blok Tanımlarını Sil',
    'block deletion dialog text':
        'Blok tanımları hakikaten silinsin mi?',

    // input dialog
    'Create input name':
        'Girdi adı oluştur',
    'Edit input name':
        'Girdi adını düzenle',
    'Edit label fragment':
        'Etiketi düzenle',
    'Title text':
        'Başlık',
    'Input name':
        'Girdi Adı',
    'Delete':
        'Sil',
    'Object':
        'Nesne',
    'Number':
        'Sayı',
    'Text':
        'Metin',
    'List':
        'Liste',
    'Any type':
        'Herhangi bir tip',
    'Boolean (T/F)':
        'Mantıksal (D/Y)',
    'Command\n(inline)':
        'Komut\n(satıriçi)',
    'Command\n(C-shape)':
        'Komut\n(C-şeklinde)',
    'Any\n(unevaluated)':
        'Herhangi\n(değerlendirilmemiş)',
    'Boolean\n(unevaluated)':
        'Mantıksal\n(değerlendirilmemiş)',
    'Single input.':
        'Tek girdi.',
    'Default Value:':
        'Varsayılan değer:',
    'Multiple inputs (value is list of inputs)':
        'Çoklu girdi (liste olarak)',
    'Upvar - make internal variable visible to caller':
        'İç değişkeni çağırıcıya görünür kıl',

    // About Snap
    'About Snap':
        'Snap hakkında',
    'Back...':
        'Geriye...',
    'License...':
        'Lisans...',
    'Modules...':
        'Modüller...',
    'Credits...':
        'Katkıda bulunanlar...',
    'Translators...':
        'Çevirmenler...',
    'License':
        'Lisans',
    'current module versions:':
        'Şu anki versiyonlar',
    'Contributors':
        'Katkıda bulunanlar',
    'Translations':
        'Çeviriler',

    // variable watchers
    'normal':
        'normal',
    'large':
        'büyük',
    'slider':
        'sürgü',
    'slider min...':
        'sürgü en düşük...',
    'slider max...':
        'sürgü en yüksek...',
    'import...':
        'içeri aktar...',
    'Slider minimum value':
        'Sürgünün en düşük değeri',
    'Slider maximum value':
        'Sürgünün en yüksek değeri',

    // list watchers
    'length: ':
        'uzunluk: ',

    // comments
    'add comment here...':
        '... buraya yorum ekle',
    'comment pic...':
        'Yorum resmi',
    'open a new window\nwith a picture of this comment':
        'Bu yorumun resmini içeren\nyeni bir pencere aç',
    // drow downs
    // directions
    '(90) right':
        '(90) sağ',
    '(-90) left':
        '(-90) sol',
    '(0) up':
        '(0) yukarı',
    '(180) down':
        '(180) aşağı',
    'random':
        'rasgele',
     'random position':
        'rasgele konuma',

    // collision detection
    'mouse-pointer':
        'fare-imlecine',
    'edge':
        'kenara',
    'pen trails':
        'kalem izlerine',
    'center':
        'orta noktaya',

    // costumes
    'Turtle':
        'Kaplumbağa',
    'Empty':
        'Boş',
    'Paint a new costume':
        'Yeni bir kostüm yap',
    'Import a new costume from your webcam':
        'Web kamerasından yeni bir kostüm aktar',
    'Please make sure your web browser is up to date\nand your camera is properly configured. \n\nSome browsers also require you to access Snap!\nthrough HTTPS to use the camera.\n\nPlase replace the "http://" part of the address\nin your browser by "https://" and try again.':
        'Lütfen web tarayıcınızın güncel olduğundan ve\nkameranızın uygun şekilde yapılandırıldığından\nemin olun. Bazı tarayıcılar ayrıca Snap! Kamerayı\nkullanmak için HTTPS öngörürler. Lütfen tarayıcınızın\nadresinin "http: //" bölümünü "https: //" ile\ndeğiştirin ve tekrar deneyin.',
    'Camera':
        'Kamera',

    // sounds
    'Record a new sound':
        'Yeni bir ses kaydedin',



    // graphical effects
    'color':
        'renk',
    'hue':
        'Renk tonu',
    'fisheye':
        'balık gözü',
    'whirl':
        'fırıldat',
    'pixelate':
        'pikselle',
    'mosaic':
        'mosayik',
    'saturation':
        'doygunluk',
    'brightness':
        'parlaklık',
    'transparency':
        'şeffaflık',
    'ghost':
        'şeffaflık',
    'negative':
        'negatif',
    'comic':
        'Moire-hareli',
    'confetti':
        'konfeti',

    // keys
    'space':
        'boşluk',
    'up arrow':
        'yukarı ok',
    'down arrow':
        'aşağı ok',
    'right arrow':
        'sağ ok',
    'left arrow':
        'sol ok',
    'any key':
        'herhangi bir tuş',
    'a':
        'a',
    'b':
        'b',
    'c':
        'c',
    'd':
        'd',
    'e':
        'e',
    'f':
        'f',
    'g':
        'g',
    'h':
        'h',
    'i':
        'i',
    'j':
        'j',
    'k':
        'k',
    'l':
        'l',
    'm':
        'm',
    'n':
        'n',
    'o':
        'o',
    'p':
        'p',
    'q':
        'q',
    'r':
        'r',
    's':
        's',
    't':
        't',
    'u':
        'u',
    'v':
        'v',
    'w':
        'w',
    'x':
        'x',
    'y':
        'y',
    'z':
        'z',
    '0':
        '0',
    '1':
        '1',
    '2':
        '2',
    '3':
        '3',
    '4':
        '4',
    '5':
        '5',
    '6':
        '6',
    '7':
        '7',
    '8':
        '8',
    '9':
        '9',

    // messages
    'new...':
        'yeni...',

    // math functions
    'abs':
        'mutlakdeğer',
    'ceiling':
        'yukarı yuvarla',
    'floor':
        'aşağı yuvarla',
    'sqrt':
        'karekök',
    'sin':
        'sin',
    'cos':
        'cos',
    'tan':
        'tan',
    'asin':
        'asin',
    'acos':
        'acos',
    'atan':
        'atan',
    'ln':
        'ln',
    'e^':
        'e^',

    // Boolean expressions keyboard entry
    'not':
        'değil',
    // delimiters
    'letter':
        'harf',
    'whitespace':
        'harf olmayan',
    'line':
        'satır',
    'tab':
        'sekme',
    'cr':
        'satır başı',

    // data types
    'number':
        'sayı',
    'text':
        'metin',
    'Boolean':
        'Mantıksal',
    'list':
        'liste',
    'command':
        'komut',
    'reporter':
        'bildiren',
    'predicate':
        'karşılaştırma',
    'sprite':
        'kukla',
    // list indices
    'last':
        'son',
    'any':
        'herhangi',

    // attributes
    'my':
        'benim',
    'neighbors':
        'yakınımdakiler',
    'self':
        'kendim',
    'other sprites':
        'öteki kuklalar',
    'parts':
        'parçalarım',
    'anchor':
        'bağlı olduğum',
    'parent':
        'üst öğem',
    'children':
        'alt öğem',
    'clones':
        'klonlarım',
    'other clones':
        'öteki klonlar',
    'dangling?':
        'serbest dönebilmem?',
    'rotation x':
        'dönme x',
    'rotation y':
        'dönme y',
    'center x':
        'merkez x',
    'center y':
        'merkez y',
    'name':
        'adım',
    'stage':
        'sahnem',
    'costumes':
        'kostümlerim',
    'sounds':
        'seslerim',
    'scripts':
        'betiklerim',

    // inheritance
    'inherited':
        'kalıtsal',
    'check to inherit\nfrom':
        'kalıt almak için seçin',
    'uncheck to\ndisinherit':
        'kalıt almamak için\nişareti kaldırın'
};
