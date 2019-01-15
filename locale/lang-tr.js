/*

	lang-de.js

	German translation for SNAP!

	written by Jens Mönig

	Copyright (C) 2012 by Jens Mönig

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
        'Hakan Atas, www.3drobolab.com', // your name for the Translators tab (Çevirenlerin isimleri)
    'translator_e-mail':
        'hakanatas@gmail.com, mustafaipekbayrak@gmail.com', // optional (Mail adresleri)
    'last_changed':
        '2018-01-22', // this, too, will appear in the Translators tab (Son güncelleme tarihi)

    // GUI
    // control bar:
    'untitled':
        'adsız',
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
    'Sounds':
        'Sesler',

    // names:
    'Sprite':
        'Karakter',
    'Stage':
        'Sahne',

    // rotation styles:
    'don\'t rotate':
        'dönemez',
    'can rotate':
        'dönebilir',
    'only face left/right':
        'sadece sağa/sola dönebilir',

    // new sprite button:
    'add a new sprite':
        'yeni bir karakter ekle',

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
        '%dst e doğru dön',
    'go to x: %n y: %n':
        'x: %n y: %n git',
    'go to %dst':
        '%dst git',
    'glide %n secs to x: %n y: %n':
        '%n saniyede x: %n y: %n noktasına kay',
    'change x by %n':
        'x\'i %n değiştir',
    'set x to %n':
        'x\'i %n ayarla',
    'change y by %n':
        'y\'i %n değiştir',
    'set y to %n':
        'y\'i %n olarak ayarla',
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
        'kostümü %cst olarak değiştir',
    'next costume':
        'sonraki kostüm',
    'costume #':
        'kostüm #',
    'say %s for %n secs':
        '%s söyle %n saniye',
    'say %s':
        '%s söyle',
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
        'büyüklüğünü %n değiştir',
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
    'go back %n layers':
        '%n katman alta in',

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
    'play note %n for %n beats':
        'nota çal %n ı %n vuruş',
	'set instrument to %n':
		'enstrümanı %n yap',
    'change tempo by %n':
        'tempoyu %n değiştir',
    'set tempo to %n bpm':
        'tempoyu %n yap',
    'tempo':
        'tempo',

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
    'change pen shade by %n':
        'kalemin tonunu %n değiştir',
    'set pen shade to %n':
        'kalemin tonunu %n yap',
    'change pen size by %n':
        'kalemin kalınlığını %n değiştir',
    'set pen size to %n':
        'kalemin kalınlığını %n yap',
    'stamp':
        'damga',
	'fill':
        'doldur',
	'Malspuren':
        'Kalem Izleri',

    // control:
    'when %greenflag clicked':
        '%greenflag tıklanınca',
    'when %keyHat key pressed':
        '%keyHat tuşu basılınca',
    'when I am clicked':
        'bu kukla tıklanınca',
   'when I am %interaction':
    'kukla %interaction zaman',
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
    'forever %loop':
        'sürekli %loop',
    'repeat %n %loop':
        '%n kere tekrarla %loop',
    'repeat until %b %loop':
        '%b olana kadar tekrarla %loop',
    'if %b %c':
        'eğer %b %c',
    'if %b %c else %c':
        'eğer %b %c değilse %c',
    'report %s':
        'rapor %s',
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
        'bu hariç diğerleri',
    'other scripts in sprite':
        'bu karakter içindeki diğer betikler',
    'pause all %pause':
        'tümünü beklet %pause',
    'run %cmdRing %inputs':
        'çalıştır %cmdRing  %inputs',
    'launch %cmdRing %inputs':
        'başlat %cmdRing %inputs',
    'call %repRing %inputs':
        'çağır %repRing %inputs',
    'run %cmdRing w/continuation':
        'çalıştır %cmdRing w/sürekli',
    'call %cmdRing w/continuation':
        'çağır %cmdRing w/sürekli',
    'warp %c':
        'Turbo %c',
    'when I start as a clone':
        'Klon olarak başlatığında',
    'create a clone of %cln':
        '%cln klonunu oluştur',
    'myself':
        'kendim',
    'delete this clone':
        'bu klonu sil',

    // sensing:
    'touching %col ?':
        '%col a değiyor mu?',
    'touching %clr ?':
        '%clr rengine değiyor mu?',
    'color %clr is touching %clr ?':
        '%clr rengi %clr rengine değdi mi?',
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
        'fareye basılı mı?',
    'key %key pressed?':
        '%key tuşu basılı mı?',
    '%distance to %dst':
        'mesafe buna: %dst',
    'reset timer':
        'zamanlayıcıyı sıfırla',
    'timer':
        'zamanlayıcı',
    '%att of %spr':
        '%att bunun: %spr',
    'http:// %s':
        'http:// %s',
    'turbo mode?':
        'Turbo mod?',
    'set turbo mode to %b':
        'turbo modu %b yap',

    'filtered for %clr':
        '%clr için filtrele',
    'stack size':
        'yığın büyüklüğü',
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
        '%s ayır, %delim e göre',
    'hello':
        'merhaba',
    'world':
        'dünya',
    'letter %idx of %s':
        '%idx in harfleri %s',
    'length of %s':
        '%s in uzunluğu',
    'unicode of %s':
        '%s in unicode hali',
    'unicode %n as letter':
        'unicode %n in harf hali',
    'is %s a %typ ?':
        '%s bir %typ mi?',
    'is %s identical to %s ?':
        '%s ile %s aynı mı?',

    'type of %s':
        '%s un tipi',

    // variables:
    'Make a variable':
        'Değişken oluştur',
    'Variable name':
        'Değişken adı',
    'Script variable name':
        'Betik değişken adı',
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
        '%scriptVars betik değişkenleri',

    // lists:
    'list %exp':
        'Liste %exp',
    '%s in front of %l':
        '%s i %l önüne koy',
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
        'ekle %s %idx indeksine %l listesinin',
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
    'Save As...':
        'Farklı kaydet...',
    'Import...':
        'İçeri aktar...',
    'file menu import hint':
        'dosya menü içeri aktar ipucu',
    'Export project as plain text...':
        'Düz metin olarak projeyi dışarı aktar...',
    'Export project...':
        'Projeyi dışarı aktar...',
    'show project data as XML\nin a new browser window':
        'Yeni bir pencerede\nproje verilerini XML olarak göster',
    'Export blocks...':
        'Blokları dışarı aktar...',
    'show global custom block definitions as XML\nin a new browser window':
        'blok tanımlarını XML dosyası olarak\nyeni bir pencerede göster',
    'Import tools':
        'Araçları içeri aktar',
    'load the official library of\npowerful blocks':
        'güçlü blokların\nresmi kütüphanesini yükletin',
    'Libraries...':
        'Kütüphaneler...',
    'Import library':
        'Kütüphaneyi içeri aktar',

    // cloud menu
    'Login...':
        'Giriş yap...',
    'Signup...':
        'Kayıt ol...',

    // settings menu
    'Language...':
        'Dil...',
    'Zoom blocks...':
        'Yaklaşma blokları...',
    'Stage size...':
        'Sahne büyüklüğü...',
    'Stage size':
        'Sahne büyüküğü',
    'Stage width':
        'Sahne genişliği',
    'Stage height':
        'Sahne yüksekliği',
    'Default':
        'Varsayılan',
    'Blurred shadows':
        'Bulanmış gölgeler',
    'uncheck to use solid drop\nshadows and highlights':
        'katı gölge ve parlaklık kullanmak için seçimi kaldırın',
    'check to use blurred drop\nshadows and highlights':
        'gölge ve parlaklıkları bulanık \nhale getirmek için seçim yapın',
    'Zebra coloring':
        'çizgili boyama',
    'check to enable alternating\ncolors for nested blocks':
        'iç içe bloklarda değişmeli \nrenkler için seçim yapın',
    'uncheck to disable alternating\ncolors for nested block':
        'iç içe bloklarda değişmeli renkleri\n kaldırmak için seçimi kaldırın',
    'Dynamic input labels':
        'Dinamik girdi etiketleri',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'farklı girdiler için dinamik etiketlemeyi\nkaldırmak için seçimi kaldırın',
    'check to enable dynamic\nlabels for variadic inputs':
        'farklı girdiler için dinamik etiketlemeyi\netkinleştirmek için seçim yapın',
    'Prefer empty slot drops':
        'Boş slotları tercih et',
    'settings menu prefer empty slots hint':
        'boş slotlar için menü ayarları',
    'uncheck to allow dropped\nreporters to kick out others':
        'uncheck to allow dropped\nreporters to kick out others',
    'Long form input dialog':
        'girdi dialogları için uzun form',
    'Plain prototype labels':
        'Düz protatip etkiletleri',
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
    'Clicking sound':
        'Tıklama sesi',
    'uncheck to turn\nblock clicking\nsound off':
        'blok tıklama sesini \nkapatmak için seçimi kaldırın',
    'check to turn\nblock clicking\nsound on':
        'blok tıklama sesini \naçmak için seçim yapın',
    'Animations':
        'Animasyonlar',
    'uncheck to disable\nIDE animations':
        'animasyonları etkisizliştirmek için\nseçimi kaldırın',
    'Turbo mode':
        'Turbo Mod',
    'check to prioritize\nscript execution':
        'Betik çalışmasına öncelik\nvermek için seçim yapın',
    'uncheck to run scripts\nat normal speed':
        'betiklerin normal hızla çalışması\niçin seçimi kaldırın',
    'check to enable\nIDE animations':
        'IDE animasyonlarını\naktifleştirmek için seçim yapın',
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
        'düz biten bitim çizgileri\niçin seçin',
    'uncheck for round ends of lines':
        'yumuşak köşeli bitim çizgileri\niçin seçimi kaldırın',

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
        'bu betiğin resmini\n yeni bir pencerede açın',
    'ringify':
        'ringify - veri yap',
    'unringify':
        'unringify - veri yapma',

    // custom blocks:
    'delete block definition...':
        'blok tanımlarını sil...',
    'edit...':
        'düzenle...',

    // sprites:
    'edit':
        'düzenle',
    'move':
        'hareket et',
    'detach from':
        'parçayı ayır',
    'detach all parts':
        'tüm parçaları ayır',
    'export...':
        'dışarı aktar...',

    // stage:
    'show all':
        'hepsini göster',
    'pic...':
        'resimler...',
    'open a new window\nwith a picture of the stage':
        'sahnenin resmini\n yeni bir pencerede aç',

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
    'scripts pic...':
        'betik resimleri...',
    'open a new window\nwith a picture of all scripts':
        'tüm betiklerin resmini\n yeni bir pencerede aç',
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
        'Yakınlaştırma blokları',
    'build':
        'inşaa et',
    'your own':
        'kendinizin',
    'blocks':
        'blokları',
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
        'Adsız',
    'Open Project':
        'Projec aç',
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

    // costume editor
    'Costume Editor':
        'Kostüm editörü',
    'click or drag crosshairs to move the rotation center':
        'dönme merkezini hareket ettirmek için referans noktasına tıklayın ya da sürükleyin',

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
        'tüm karakterler için',
    'for this sprite only':
        'sadece bu karakter için',

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
    'Apply':
        'Uygula',

    // block deletion dialog
    'Delete Custom Block':
        'Blok Tanımlarını Sil',
    'block deletion dialog text':
        'Blok tanımları hakikaten silinsin mi?',											 

    // input dialog
    'Create input name':
        'Girdi oluştur',
    'Edit input name':
        'Girdiyi düzenle',
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
        'Komut',
    'Command\n(C-shape)':
        'Komut\n(C-Şeklinde)',
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
        'geniş',
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

    // collision detection
    'mouse-pointer':
        'Fare-İmleci',
    'corner':
        'kenar',
    'pen trails':
        'Kalem İzleri',

    // costumes
    'Turtle':
        'Kaplumbağa',
    'Empty':
        'Boş',

    // graphical effects
    'brightness':
        'parlaklık',
    'ghost':
        'hayalet',
    'negative':
        'negatif',
    'comic':
        'komik',
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
        'sol ok',
    'left arrow':
        'sağ ok',
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
        'MutlakDeğer',
    'floor':
        'alt değer',
    'sqrt':
        'Karekök',
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

    // delimiters
    'letter':
        'harf',
    'whitespace':
        'alfabe dışı',
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
        'mantıksal',
    'list':
        'Liste',
    'command':
        'komut',
    'reporter':
        'bildiren',
    'predicate':
        'karşılaştırma',

    // list indices
    'last':
        'son',
    'any':
        'herhangi',

    // miscellaneous
    'find blocks...':
        'blokları bul...',
    'hide primitives':
        'temel blokları sakla',
    'show primitives':
        'temel blokları göster',
    'Login...':
        'Bağlan...',
    'Signup...':
        'Giriş Yap...',
    'Reset Password...':
        'Şifre Değiştir...',
    'show all':
        'tümünü göster',
    'pic...':
        'görüntü...',
    'open a new window\nwith a picture of the stage':
        'yeni sahne ile\nyeni pencere aç',
    'scripts pic...':
        'betik görüntüleri...',
    'open a new window\nwith a picture of all scripts':
        'tüm betik görüntüleri ile\nyeni pencere aç',
    'Stage size...':
        'Sahne Boyutu...',
    'Zoom blocks...':
        'Blokları yakınlaştır...',

    'Plain prototype labels':
        'Düz prototip isimleri',
    'uncheck to always show (+) symbols\nin block prototype labels':
        'blok prototip isimleri içinde,\n(+) sembollerini göstermek için işareti kaldır',
    'check to hide (+) symbols\nin block prototype labels':
        'blok prototip isimleri içinde,\n(+) sembollerini gizlemek için işaretle',

    'check for flat ends of lines':
        'çizgilerin düz sonları için işaretle',
    'uncheck for round ends of lines':
        'çizgilerin yuvarlatılmış sonları için işareti kaldır',
    'Flat line ends':
        'Düz çizgi sonları',

    'Codification support':
        'Kodlaştırma desteği',
    'uncheck to disable\nblock to text mapping features':
        'bloktan metine eşleştirme özelliklerini \niptal için işareti kaldır',
    'check for block\nto text mapping features':
        'bloktan metine eşleştirme \nözellikleri için işaretle',

    'Inheritance support':
        'Kalıtım desteği',

    'current %dates':
        'mevcut %dates',
    'year':
        'yıl',
    'month':
        'ay',
    'date':
        'tarih',
    'hour':
        'saat',
    'minute':
        'dakika',
    'second':
        'saniye',
    'time in milliseconds':
        'milisaniye zaman',
    'day of week':
        'haftanın günü',

    'brightness':
        'parlaklık',
    'transparence':
        'transparant',
    'negative':
        'negatif',
    'comic':
        'dergi',

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
    'when %b':
        '%b olduğunda',

    'JavaScript function ( %mult%s ) { %code }':
        'JavaScript function ( %mult%s ) { %code }',


    // Copy / Paste
    'Press CTRL+C one more time to effectively copy to clipboard.':
        'CTRL+C tuşuna bir kez daha basarak panoya kopyala',
    'Press CTRL+V one more time to effectively paste from clipboard.':
        'CTRL+V tuşuna bir kez daha basarak tabloya yapıştır',
    'Press CTRL+X one more time to effectively cut to clipboard.':
        'CTRL+X tuşuna bir kezdaha basarak panodan kes',

    // Paint.js
    'undo':
        'geri',
    'Paintbrush tool\n(free draw)':
        'Fırça\n(serbest çizim)',
    'Stroked Rectangle\n(shift: square)':
        'Dikdörtgen\n(shift: kare)',
    'Stroked Ellipse\n(shift: circle)':
        'Elips\n(shift: daire)',
    'Eraser tool':
        'Silgi',
    'Set the rotation center':
        'Döndürme merkezini ayarla',
    'Line tool\n(shift: vertical/horizontal)':
        'Çizgi çizme\n(shift: yatay/dikey)',
    'Filled Rectangle\n(shift: square)':
        'İçi dolu dikdörtgen\n(shift: kare)',
    'Filled Ellipse\n(shift: circle)':
        'içi dolu elips\n(shift: daire)',
    'Fill a region':
        'Bölgenin içini doldur',
    'Pipette tool\n(pick a color anywhere)':
        'Pipet\n(herhangibir yerden renk seç)',
    'grow':
        'büyüt',
    'shrink':
        'küçült',
    'flip \u2194':
        'ayna görüntüsü \u2194',
    'flip \u2195':
        'ayna görüntüsü \u2195',
    'Brush size':
        'Fırça boyutu',
    'Constrain proportions of shapes?\n(you can also hold shift)':
        'Şekil oranlarını sınırla?\n(shift tuşuna basabilirsiniz)'

};
