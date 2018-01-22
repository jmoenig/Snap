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
        'dönebilir',
    'can rotate':
        'dönemez',
    'only face left/right':
        'sadece sağa/sola dönebilir',

    // new sprite button:
    'add a new sprite':
        'yeni bir karakter ekle',

    // tab help
    'costumes tab help':
        'kostüm sekmesi yardımı',
    'import a sound from your computer\nby dragging it into here':
        'bilgisayarınızdan bir sesi\n'
            + 'buraya sürükleyerek içeri aktarın',

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
        'Seçili sahne:\nhareket temelleri yok',
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
        '%n saniyede x: %n y: %n noktasına git',
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
        'doğrultu',

    // looks:
    'switch to costume %cst':
        'kostümü %cst olarak değiştir',
    'next costume':
        'sonraki kostüm',
    'costume #':
        'kostüm no:',
    'say %s for %n secs':
        '%s saniye %n söyle',
    'say %s':
        '%s söyle',
    'think %s for %n secs':
        '%s saniye %n diye düşün',
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
        'geliştirici modu \nhata ayıklama temelleri',
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
        '%n notasını %n vuruş çal',
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
    'forever %c':
        'sürekli %c',
    'repeat %n %c':
        '%n kere tekrarla %c',
    'repeat until %b %c':
        '%b olana kadar tekrarla %c',
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
        'bu script',
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
        'çarpıtmak %c',
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
    'distance to %dst':
        '%dst a mesafe',
    'reset timer':
        'zamanlayıcıyı sıfırla',
    'timer':
        'zamanlayıcı',
    '%att of %spr':
        '%spr nun %att ',
    'http:// %s':
        'http:// %s',
    'turbo mode?':
        'Turbomod?',
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
        '%fun un %n si',
    'pick random %n to %n':
        '%n ile %n arasında rastgele bir sayı seç',
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
        'parçala ayır %s , %delim e gore',
    'hello':
        'merhaba',
    'world':
        'dünya',
    'letter %n of %s':
        '%n in harfleri %s',
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
        'Script değişken adı',
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
        '%scriptVars script değişkenleri',

    // lists:
    'list %exp':
        'Liste %exp',
    '%s in front of %l':
        '%s nin %l önündeki',
    'item %idx of %l':
        'item %idx of %l',
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
        'sil %ida nın %l',
    'insert %s at %idx of %l':
        'ekle %s %idx indeksine %l listesinin',
    'replace item %idx of %l with %s':
        'yer değiştir %idx %l listesinin %s ile',

    // other
    'Make a block':
        'Yeni bir blok oluştur',

    // menus
    // snap menu
    'About...':
        'Snap Hakkında!...',
    'Reference manual':
        'El kitapçığı',
    'Snap! website':
        'Snap! web sitesi',
    'Download source':
        'Indirilebilir kaynak',
    'Switch back to user mode':
        'Kullanıcı moduna geri dön',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'verl\u00e4sst Morphic',
    'Switch to dev mode':
        'geliştirici moduna dön',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'etkinleştir Morfik\niçerik menüsü\nve gözlemleme\nkullanıcı dostu değil ',

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
        'Bulanış gölgeler',
    'uncheck to use solid drop\nshadows and highlights':
        'katı gölge ve ışıkları kullanmak için seçimi kaldırın',
    'check to use blurred drop\nshadows and highlights':
        'gölge ve ışıkları bulanık hale getirmek için\nseçim yapın',
    'Zebra coloring':
        'çizgili boyama',
    'check to enable alternating\ncolors for nested blocks':
        'iç içe bloklarda değişmeli renkler için\ntik atın',
    'uncheck to disable alternating\ncolors for nested block':
        'iç içe bloklarda değişmeli renkleri\n kaldırmak için seçimi kaldırın',
    'Dynamic input labels':
        'Dinamik girdi etiketleri',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'farklı girdiler için dinamik etkiletlemeyi\nkaldırmak için seçimi kaldırın',
    'check to enable dynamic\nlabels for variadic inputs':
        'farklı girdiler için dinamik etkiletlemeyi\netkinleştirmek için seçimi kaldırın',
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
        'prototip etiketinde (+) sembolünün\ngizlenmesi için seçin',
    'check to always show slot\ntypes in the input dialog':
        'girdi dialoglarında\ntipinin görünmesi için seçin',
    'uncheck to use the input\ndialog in short form':
        'girdi dialoglarını kısa form\nolarak kullanmak için seçimi kaldırın',
    'Virtual keyboard':
        'Sanal klavye',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'mobil araçlar için\nsanal klavye desteğini\nkaldırmak için seçimi kaldırın',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'mobil araçlar için\nsanal klavye desteğini\naktifleştirmek için seçin',
    'Input sliders':
        'Girdi sürgüleri',
    'uncheck to disable\ninput sliders for\nentry fields':
        'girdi alanlarındanki girdi sürgülerini etkisizleştirmek için seçimi kaldırın',
    'check to enable\ninput sliders for\nentry fields':
        'girdi alanlarındanki girdi sürgülerini etkisizleştirmek için seçin',
    'Clicking sound':
        'Sesi tıklayın',
    'uncheck to turn\nblock clicking\nsound off':
        'sesi kapatmak için\nseçimi kaldırın',
    'check to turn\nblock clicking\nsound on':
        'sesi açmak için\nseçim yapın',
    'Animations':
        'Animasyonlar',
    'uncheck to disable\nIDE animations':
        'animasyonları etkisezliştirmek için\nseçimi kaldırın',
    'Turbo mode':
        'Turbo Mod',
    'check to prioritize\nscript execution':
        'Betikleme çalışmasına öncelik\nvermek için seçim yapın',
    'uncheck to run scripts\nat normal speed':
        'betiklemelerin normal hızla çalışması\niçin seçimi kaldırın',
    'check to enable\nIDE animations':
        'IDE animasyonlarını\naktifleştirmek için seçim yapın',
    'Thread safe scripts':
        'Güvenli betik parçacığı',
    'uncheck to allow\nscript reentrance':
        'betiklemeye tekrar girişe\nizin vermek için seçimi kaldırın',
    'check to disallow\nscript reentrance':
        'vbetiklemeye tekrar girişe\nizin vermemek için seçimi kaldırın',
    'Prefer smooth animations':
        'Pürüzsüz animayonu tercih et',
    'uncheck for greater speed\nat variable frame rates':
        'çerçevelerin daha hızlanması\niçin seçimi kaldırın',
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
        'girdi isimleri:',
    'input list:':
        'girdi listesi:',

    // context menus:
    'help':
        'yardım',

    // palette:
    'hide primitives':
        'primitifleri gizle',
    'show primitives':
        'primitifleri göster',

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
        'ringify',
    'unringify':
        'unringify',

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
        'dşıarı aktar...',

    // stage:
    'show all':
        'hepsini göster',
    'pic...':
        'resimler...',
    'open a new window\nwith a picture of the stage':
        'sahnenin bir resmi ile\n yeni bir pence aç',

    // scripting area
    'clean up':
        'temizle',
    'arrange scripts\nvertically':
        'scriptleri dikey olarak düzenle',
    'add comment':
        'yorum ekle',
    'undrop':
        'bırak',
    'undo the last\nblock drop\nin this pane':
        'levhaya bıraktığın\n son bloğu geri al',
    'scripts pic...':
        'script resimleri...',
    'open a new window\nwith a picture of all scripts':
        'tüm scriptleri bir resim ile\n yeni bir pencerede aç',
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
        'Sesi oynat',
    'Stop sound':
        'Sesi durdur',
    'Stop':
        'Durdur',
    'Play':
        'Oyna',
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
        'Demo (1.2x)',
    'presentation (1.4x)':
        'Sunum (1.4x)',
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
        'bu proje henüz herhangi bir global blok içermiyor',
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
        'Fonksiyon',
    'Predicate':
        'Beyan etme',

    // block editor
    'Block Editor':
        'Blok Editörü',
    'Apply':
        'Uygula',

    // block deletion dialog
    'Delete Custom Block':
        'Bloğu Sil',
    'block deletion dialog text':
        'BSoll dieser Block mit allen seinen Exemplare\n' +
            'wirklich gel\u00f6scht werden?',

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
        'Obje',
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
        'Komut\n(C-Şenlinde)',
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
        'Komponenten...',
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

    // coments
    'add comment here...':
        '.. buraya yorum ekle',

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
        'Fare-İşaretçisi',
    'corner':
        'kenar',
    'pen trails':
        'Malspuren',

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
        'çizgi',
    'tab':
        'sekme',
    'cr':
        'karakter',

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
        'fonksiyonlar',
    'predicate':
        'ön ek',

    // list indices
    'last':
        'son',
    'any':
        'herhangi',

    // miscellaneous
    'find blocks...':
        'blokları bul...',
    'hide primitives':
        'temelleri sakla',
    'show primitives':
        'temelleri göster',
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
        'yeni pencere aç\nyeni bölüm ile',
    'scripts pic...':
        'görüntü betikleri...',
    'open a new window\nwith a picture of all scripts':
        'yeni pencere aç\ntüm görüntü betikleri ile',
    'Stage size...':
        'Bölüm Boyutu...',
    'Zoom blocks...':
        'Blokları yakınlaştır...',

    'Plain prototype labels':
        'Düz prototip isimleri',
    'uncheck to always show (+) symbols\nin block prototype labels':
        'daima göster (+) sembollerini kapat\nblok prototip isimleri içinde',
    'check to hide (+) symbols\nin block prototype labels':
        'gizle (+) sembollerini işaretle\nblok prototip isimleri içinde',

    'check for flat ends of lines':
        'çizgilerin düz sonları için işaretle',
    'uncheck for round ends of lines':
        'çizgilerin yuvarlatılmış sonları için işareti kaldır',
    'Flat line ends':
        'Fiz çizgi sonları',

    'Codification support':
        'Kodlaştırma desteği',
    'uncheck to disable\nblock to text mapping features':
        'etkisizleştirmeyi kaldır\nbloktan metine haritalandırma özellikleri',
    'check for block\nto text mapping features':
        'blok için kontrol et\nmetine dönüştürme özellikleri ',

    'Inheritance support':
        'Miras Desteği',

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
        'hareket ettiği',
    'mouse-entered':
        'fare geldiği',
    'mouse-departed':
        'fare gittiği',
    'when %b':
        '%b olduğunda',

    'JavaScript function ( %mult%s ) { %code }':
        'fonction JavaScript ( %mult%s ) { %code }',


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
        'fırça\n(serbest çizim)',
    'Stroked Rectangle\n(shift: square)':
        'dikdörtgen\n(shift: kare)',
    'Stroked Ellipse\n(shift: circle)':
        'ekips\n(shift : cercle)',
    'Eraser tool':
        'silgi',
    'Set the rotation center':
        'döndürme merkezini ayarla',
    'Line tool\n(shift: vertical/horizontal)':
        'çizgi çizme\n(shift: yatay/dikey)',
    'Filled Rectangle\n(shift: square)':
        'içi dolu dikdörtgen\n(shift: kare)',
    'Filled Ellipse\n(shift: circle)':
        'içi dolu elips\n(shift: daire)',
    'Fill a region':
        'bölgenin içini doldur',
    'Pipette tool\n(pick a color anywhere)':
        'pipet\n(herhangibir yerden renk seç)',
    'grow':
        'büyüt',
    'shrink':
        'küçült',
    'flip \u2194':
        'ayna görüntüsü \u2194',
    'flip \u2195':
        'ayna görüntüsü \u2195',
    'Brush size':
        'fırça boyutu',
    'Constrain proportions of shapes?\n(you can also hold shift)':
        'şekil bölümleri içerir mi?\n(shift tuşuna basabilirsiniz)'

};
