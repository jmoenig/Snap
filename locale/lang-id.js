/*

    lang-id.js

    German translation for SNAP!

    written by Jens Mönig

    Copyright (C) 2016 by Jens Mönig

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

SnapTranslator.dict.id = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    Ä, ä   \u00c4, \u00e4
    Ö, ö   \u00d6, \u00f6
    Ü, ü   \u00dc, \u00fc
    ß      \u00df
*/

    // translations meta information
    'language_name':
        'Bahasa Indonesia', // the name as it should appear in the language menu
    'language_translator':
        'Alexander Raphael Liu', // your name for the Translators tab
    'translator_e-mail':
        'raphaxander@gmail.com', // optional
    'last_changed':
        '2016-5-2', // this, too, will appear in the Translators tab

    // GUI
    // control bar:
    'untitled':
        'tak bernama',
    'development mode':
        'mode percobaan',

    // categories:
    'Motion':
        'Gerakan',
    'Looks':
        'Penampilan',
    'Sound':
        'Suara',
    'Pen':
        'Pena',
    'Control':
        'Kontrol',
    'Sensing':
        'Sensor',
    'Operators':
        'Operator',
    'Variables':
        'Variabel',
    'Lists':
        'Daftar',
    'Other':
        'Lain-lain',

    // editor:
    'draggable':
        'bisa di drag',

    // tabs:
    'Scripts':
        'Skrip',
    'Costumes':
        'Kostum',
    'Sounds':
        'Suara',

    // names:
    'Sprite':
        'Karakter',
    'Stage':
        'Panggung',

    // rotation styles:
    'don\'t rotate':
        'jangan berputar',
    'can rotate':
        'bisa berputar',
    'only face left/right':
        'hanya boleh mengahadap kiri kanan',

    // new sprite button:
    'add a new sprite':
        'tambah sprite baru',

    // tab help
    'costumes tab help':
        'impor gambar dari site atau \n'
            + 'sebiah file dengan cara men-drag file nya',
    'import a sound from your computer\nby dragging it into here':
        'impor sebuah suara dari komputer mu dengan men-drag file nya kesini',

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
        'Panggung terpilih: tidak ada primitif (balok)\n'
            + 'gerak',

    'move %n steps':
        'maju %n langkah',
    'turn %clockwise %n degrees':
        'berputar %clockwise %n derajad',
    'turn %counterclockwise %n degrees':
        'berputar %counterclockwise %n derajad',
    'point in direction %dir':
        'tunjuk ke arah %dir',
    'point towards %dst':
        'tunjuk ke arah %dst',
    'go to x: %n y: %n':
        'pergi ke x: %n y: %n',
    'go to %dst':
        'pergi ke %dst',
    'glide %n secs to x: %n y: %n':
        'meluncur %n dtk. ke x: %n y: %n',
    'change x by %n':
        'ubah x sebanyak %n',
    'set x to %n':
        'atur x ke %n',
    'change y by %n':
        'ubah y sebanyak %n',
    'set y to %n':
        'set y ke %n',
    'if on edge, bounce':
        'jika ada di ujung, melambung',
    'x position':
        'posisi x',
    'y position':
        'posisi y',
    'direction':
        'arah',

    // looks:
    'switch to costume %cst':
        'ganti ke kostum %cst',
    'next costume':
        'kostum selanjutnya',
    'costume #':
        'nomor kostum',
    'say %s for %n secs':
        'katakan %s untuk %n dtk.',
    'say %s':
        'katakan %s',
    'think %s for %n secs':
        'pikirkan %s untuk %n dtk.',
    'think %s':
        'pikirkan %s',
    'Hello!':
        'Halo!',
    'Hmm...':
        'Hmm...',
    'change %eff effect by %n':
        'ubah efek %eff sebanyak %n',
    'set %eff effect to %n':
        'atur efek %eff ke %n',
    'clear graphic effects':
        'hapus efek grafik',
    'change size by %n':
        'ubah ukuran sebanyak %n',
    'set size to %n %':
        'atur ukuran ke %n %',
    'size':
        'ukuran',
    'show':
        'tampilkan',
    'hide':
        'sembunyikan',
    'go to front':
        'ke depan',
    'go back %n layers':
        'ke belakang %n lapisan',

    'development mode \ndebugging primitives:':
        'primitif debugging \nmode percobaan',
    'console log %mult%s':
        'catat di konsol %mult%s',
    'alert %mult%s':
        'tampilkan popup: %mult%s',

    // sound:
    'play sound %snd':
        'mainkan suara %snd',
    'play sound %snd until done':
        'mainkan %snd sampai selesai',
    'stop all sounds':
        'hentikan semua suara',
    'rest for %n beats':
        'istriahat untuk %n ketukan',
    'play note %n for %n beats':
        'mainkan not %n selama %n ketukan',
    'change tempo by %n':
        'ubah tempo sebanyak %n',
    'set tempo to %n bpm':
        'atur tempo ke %n ketukan per menit',
    'tempo':
        'ketukan',

    // pen:
    'clear':
        'bersihkan layar',
    'pen down':
        'turunkan pena',
    'pen up':
        'naikan pena',
    'set pen color to %clr':
        'atur warna pena ke %clr',
    'change pen color by %n':
        'ubah warna pena sebanyak %n',
    'set pen color to %n':
        'atur warna pena ke %n',
    'change pen shade by %n':
        'ubah kegelapan pena sebanyak %n',
    'set pen shade to %n':
        'atur kegelapan pena ke %n',
    'change pen size by %n':
        'ubah ukuran pena sebesar %n',
    'set pen size to %n':
        'atur ukuran pena ke %n',
    'stamp':
        'stempel',
    'fill':
        'isi dengan cat',

    // control:
    'when %greenflag clicked':
        'Ketika %greenflag diklik',
    'when %keyHat key pressed':
        'Ketika %keyHat ditekan',
    'when I am %interaction':
        'Ketika %interaction',
    'clicked':
        'aku diklik',
    'pressed':
        'aku ditekan',
    'dropped':
        'aku dijatuhkan',
    'mouse-entered':
        'aku dimasuki tetikus/mouse',
    'mouse-departed':
        'tetikus/mouse keluar',
    'when %b':
        'Ketika %b',
    'when I receive %msgHat':
        'Ketika aku menerima %msgHat',
    'broadcast %msg':
        'beritakan %msg',
    'broadcast %msg and wait':
        'beritakan %msg dan tunggu',
    'Message name':
        'Nama pesan',
    'message':
        'Pesan',
    'any message':
        'pesan apapun',
    'wait %n secs':
        'tungu %n dtk.',
    'wait until %b':
        'tunggu sampai %b',
    'forever %c':
        'selamanya lakukan: %c',
    'repeat %n %c':
        'ulangi %n kali %c',
    'repeat until %b %c':
        'ulangi sampai %b %c',
    'if %b %c':
        'jika %b %c',
    'if %b %c else %c':
        'jika %b %c jika tidak %c',
    'report %s':
        'laporkan %s',
    'stop %stopChoices':
        'hentikan %stopChoices',
    'all':
        'semuanya',
    'this script':
        'skrip ini',
    'this block':
        'blok ini',
    'stop %stopOthersChoices':
        'hentikan %stopOthersChoices',
    'all but this script':
        'semua selain skrip ini',
    'other scripts in sprite':
        'skrip lain di karakter ini',
    'pause all %pause':
        'paus semua %pause',
    'run %cmdRing %inputs':
        'jalankan %cmdRing %inputs',
    'launch %cmdRing %inputs':
        'luncurkan %cmdRing %inputs',
    'call %repRing %inputs':
        'panggil %repRing %inputs',
    'run %cmdRing w/continuation':
        'jalankan %cmdRing dengan kontinuasi',
    'call %cmdRing w/continuation':
        'panggil %cmdRing dengan kontinuasi',
    'warp %c':
        'bungkus %c',
    'when I start as a clone':
        'ketika aku mulai sebagai klon',
    'create a clone of %cln':
        'buat klon baru dari %cln',
    'myself':
        'diriku',
    'delete this clone':
        'hapus klon ini',

    // sensing:
    'touching %col ?':
        'menyentuh %col ?',
    'touching %clr ?':
        'menyentuh %clr ?',
    'color %clr is touching %clr ?':
        'warna %clr menyentuh %clr ?',
    'ask %s and wait':
        'tanya %s dan tunggu',
    'what\'s your name?':
        'Siapa namamu?',
    'answer':
        'jawaban',
    'mouse x':
        'posisi x tetikus/mouse',
    'mouse y':
        'posisi y tetikus/mouse',
    'mouse down?':
        'tetikus/mouse diklik?',
    'key %key pressed?':
        'kunci %key ditekan?',
    'distance to %dst':
        'jarak ke %dst',
    'reset timer':
        'atur ulang timer',
    'timer':
        'timer',
    '%att of %spr':
        '%att dari %spr',
    'http:// %s':
        'http:// %s',
    'turbo mode?':
        'mode turbo nyala?',
    'set turbo mode to %b':
        'atur mode turbo ke %b',

    'filtered for %clr':
        'disaring untuk %clr',
    'stack size':
        'ukuran tumpukan:',
    'frames':
        'jumlah frame:',

    // operators:
    '%n mod %n':
        '%n modulo %n',
    'round %n':
        'bulatkan %n',
    '%fun of %n':
        '%fun dari %n',
    'pick random %n to %n':
        'pilih angka acak dari %n ke %n',
    '%b and %b':
        '%b dan %b',
    '%b or %b':
        '%b atau %b',
    'not %b':
        'bukan %b',
    'true':
        'benar',
    'false':
        'salah',
    'join %words':
        'gabungkan %words',
    'split %s by %delim':
        'potong %s di setiap %delim',
    'hello':
        'halo',
    'world':
        'dunia',
    'letter %idx of %s':
        'huruf %idx dari %s',
    'length of %s':
        'panjang dari %s',
    'unicode of %s':
        'nilai unicode dari %s',
    'unicode %n as letter':
        'Unicode %n sebagai huruf',
    'is %s a %typ ?':
        'apakah %s sebuah %typ ?',
    'is %s identical to %s ?':
        'apakah %s identik dengan %s ?',

    'type of %s':
        'tipe dari %s',

    // variables:
    'Make a variable':
        'Buat variabel',
    'Variable name':
        'Nama variabel',
    'Script variable name':
        'Skrip nama variabel',
    'Delete a variable':
        'Hapus variabel',

    'set %var to %s':
        'atur %var ke %s',
    'change %var by %n':
        'ubah %var sebanyak %n',
    'show variable %var':
        'tampilkan variabel %var',
    'hide variable %var':
        'sembunyikan Variable %var',
    'script variables %scriptVars':
        'skrip variabel %scriptVars',

    // lists:
    'list %exp':
        'daftar %exp',
    '%s in front of %l':
        '%s di depan %l',
    'item %idx of %l':
        'barang %idx dari %l',
    'all but first of %l':
        'semua kecuali barang pertama dari %l',
    'length of %l':
        'panjang dari %l',
    '%l contains %s':
        '%l mempunyai %s',
    'thing':
        'barang',
    'add %s to %l':
        'tambahkan %s ke %l',
    'delete %ida of %l':
        'hapus %ida dari %l',
    'insert %s at %idx of %l':
        'tambahkan %s di %idx dari %l',
    'replace item %idx of %l with %s':
        'ganti barang %idx di %l dengan %s',

    // other
    'Make a block':
        'buat block baru',

    // menus
    // snap menu
    'About...':
        'Tentang Snap!...',
    'Reference manual':
        'Panduan',
    'Snap! website':
        'Website Snap!',
    'Download source':
        'Download kodenya',
    'Switch back to user mode':
        'Kembali ke mode pengunna',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'matikan konteks menu \ndeep-morphic dan \ntunjukan konteks \nmenu yang ramah',
    'Switch to dev mode':
        'ganti ke mode percobaan',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'nyalahkan Morphic \ncontext menu\ndan inspektor, \ntidak ramah!',

    // project menu
    'Project notes...':
        'Catatan Projek...',
    'New':
        'Baru',
    'Open...':
        'Buka',
    'Save':
        'Simpan',
    'Save to disk':
        'Simpan ke komputer',
    'store this project\nin the downloads folder\n(in supporting browsers)':
        'simpan projek ini\ndi folder downloads\n'
            + '(hanya untuk browser yang mendukung!)',
    'Save As...':
        'Simpan sebagai',
    'Import...':
        'Impor',
    'file menu import hint':
        'impor sebuah projek yang sudah diekspor atau\n '
            + 'pustaka blok,\n'
            + 'kostum atau suara',
    'Export project as plain text...':
        'expor projek sebagai file .txt',
    'Export project...':
        'Expor projek',
    'show project data as XML\nin a new browser window':
        'tunjukan data projek sebagai XML\ndi jendela browser',
    'Export blocks...':
        'Expor balok...',
    'show global custom block definitions as XML\nin a new browser window':
        'tunjukan definisi balok kostum global\nsebagai xml di jendela baru',
    'Unused blocks...':
          'Balok yang tidak dipakai',
    'find unused global custom blocks\nand remove their definitions':
        'cari balok kostum global yang tidak dipakai\ndan hapus definisi mereka',
    'Remove unused blocks':
        'Hapus balok yang tidak dipakai',
    'there are currently no unused\nglobal custom blocks in this project':
        'sekarang tidak ada balok kostum global\nyang tidak dipakai',
    'unused block(s) removed':
        'blok yang tidak dipakai terhapus',
    'Export summary...':
        'Expor ringkasan...',
    'open a new browser browser window\n with a summary of this project':
        'buka jendela browser baru\ndengan ringkasan dari projek ini',
    'Contents':
        'Konten',
    'Kind of':
        'Seperti',
    'Part of':
        'Bagian dari',
    'Parts':
        'Bagian',
    'Blocks':
        'Balok',
    'For all Sprites':
        'Untuk semua karakter',
    'Import tools':
        'Impor peralatan',
    'load the official library of\npowerful blocks':
        'impor modul resmi dari\nblok hebat',
    'Libraries...':
        'Pustaka...',
    'Import library':
        'Import modul/pustaka',

    // cloud menu
    'Login...':
        'Masuk...',
    'Signup...':
        'Daftar',

    // settings menu
    'Language...':
        'Bahasa...',
    'Zoom blocks...':
        'Perbesar balok',
    'Stage size...':
        'Ukuran panggung',
    'Stage size':
        'Ukuran panggung',
    'Stage width':
        'Lebar panggung',
    'Stage height':
        'Tinggi panggung',
    'Default':
        'Normal',
    'Blurred shadows':
        'Bayangan blur',
    'uncheck to use solid drop\nshadows and highlights':
        'jangan centang untuk mengunakan\nbayangan dan cahaya saat jatuh',
    'check to use blurred drop\nshadows and highlights':
        'centang untuk mengunakan bayangan \ndan cahaya blur saat jatuh',
    'Zebra coloring':
        'Warna zebra',
    'check to enable alternating\ncolors for nested blocks':
        'centang untuk menyalahkan warna\nberganti di blok bersarang',
    'uncheck to disable alternating\ncolors for nested block':
        'jangan centang untu mematikan\nwarna berganti di balok bersarang',
    'Dynamic input labels':
        'Label input yang dinamik',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'jangan centang untuk mematika\nlabel dinamik untuk input variadik',
    'check to enable dynamic\nlabels for variadic inputs':
        'centang untuk menyalahkan label\ndinamik untu input variadik',
    'Prefer empty slot drops':
        'Memilih jatuh slot kosong',
    'settings menu prefer empty slots hint':
        'jangan centang untuk mengizinkan reporter yang jatuh menendang'
            + 'yang lain',
    'uncheck to allow dropped\nreporters to kick out others':
        'jangan centang untuk mengizinkan reporter yang jatuh menendang'
            + 'yang lain',
    'Long form input dialog':
        'Form input panjang',
    'Plain prototype labels':
        'Label prototipe/purwarupa polos',
    'uncheck to always show (+) symbols\nin block prototype labels':
        'jangan centang untuk selalu menunjukan (+)\ndi label balok prototype',
    'check to hide (+) symbols\nin block prototype labels':
        'centang untuk menyembunykan (+)\ndi label balok prototype',
    'check to always show slot\ntypes in the input dialog':
        'centang untuk selalu menunjukan slot\ntipe di input dialog',
    'uncheck to use the input\ndialog in short form':
        'jangan centang untuk menggunakan input\ndialog dalam bentuk pendek',
    'Virtual keyboard':
        'Kibor virtual',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'jangan centang untuk mematikan\nkibor virtual untuk\n'
            + 'alat mobile',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'centang untuk meyalahkan\nkibor virtual untuk\n'
            + 'alat mobile',
    'Input sliders':
        'Slider input',
    'uncheck to disable\ninput sliders for\nentry fields':
        'jangan centang untuk mematikan\nslider input untuk\nbagian entry',
    'check to enable\ninput sliders for\nentry fields':
        'centang untuk menyalahkan\nslider input intuk\nbagian entry',
    'Clicking sound':
        'Suara klik',
    'uncheck to turn\nblock clicking\nsound off':
        'jangan centang untuk mematiakn\nsuara klik',
    'check to turn\nblock clicking\nsound on':
        'centang untuk menyalahkan\nsuara klik',
    'Animations':
        'Animasi',
    'uncheck to disable\nIDE animations':
        'jangan centang untuk mematikan\nanimasi IDE',
    'Turbo mode':
        'Mode turbo',
    'check to prioritize\nscript execution':
        'centang untuk mementingkan\neksekusi skrip',
    'uncheck to run scripts\nat normal speed':
        'jangan centang untuk menjalankan\nskrip pada kecepatan normal',
    'check to enable\nIDE animations':
        'centang untuk menyalahkan \nanimasi IDE',
    'Flat design':
        'Desain datar',
    'Keyboard Editing':
        'Editing melalui kibor',
    'Table support':
        'Dukungan tabel',
    'Table lines':
        'Garis tabel',
    'Thread safe scripts':
        'Skrip aman untuk thread',
    'uncheck to allow\nscript reentrance':
        'jangan centang, untuk\nmengizinkan skrip masuk ulang',
    'check to disallow\nscript reentrance':
        'klik untuk menghindari\nskrip masuk ulang',
    'Prefer smooth animations':
        'Memilih animasi lembut',
    'uncheck for greater speed\nat variable frame rates':
        'jangan centang untuk kecepatan lebih\ndan frame rate dinamis',
    'check for smooth, predictable\nanimations across computers':
        'centang untuk animasi lembut, bisa diramalkan\ndi komputer',
    'Flat line ends':
        'Garis ujung rata',
    'check for flat ends of lines':
        'centang untuk ujung rata dari\ngaris pena',
    'uncheck for round ends of lines':
        'matikan untuk ujung bulat dari\ngaris pena',
    'Inheritance support':
        'Dukungan inheritance',

    // inputs
    'with inputs':
        'dengan input',
    'input names:':
        'Nama input:',
    'Input Names:':
        'Nama input:',
    'input list:':
        'Dafta input:',

    // context menus:
    'help':
        'Tolong',

    // palette:
    'hide primitives':
        'sembunyikan primitif',
    'show primitives':
        'tampilkan primitif',

    // blocks:
    'help...':
        'bantuan...',
    'relabel...':
        'label ulang...',
    'duplicate':
        'gandakan',
    'make a copy\nand pick it up':
        'buat kopi\ndat ambil',
    'only duplicate this block':
        'hanya gandakan blok ini',
    'delete':
        'hapus',
    'script pic...':
        'gambar skrip...',
    'open a new window\nwith a picture of this script':
        'buka jendela baru\ndengan gambar dari skrip ini',
    'ringify':
        'cincinkan',
    'unringify':
        'hapus cincin',
    'transient':
        'sementara',
    'uncheck to save contents\nin the project':
        'jangan centang untuk\nmenymimpan konten di dalam\nprojek',
    'check to prevent contents\nfrom being saved':
        'centang untuk mencegah konten\ndisimpan',

    // custom blocks:
    'delete block definition...':
        'hapus definisi blok',
    'edit...':
        'edit...',

    // sprites:
    'edit':
        'edit',
    'move':
        'bergerak',
    'detach from':
        'lepaskan dari',
    'detach all parts':
        'lepaskan semua bagian',
    'export...':
        'expor...',

    // stage:
    'show all':
        'Tunjukan semua',
    'pic...':
        'expor gambar...',
    'open a new window\nwith a picture of the stage':
        'buka jendela baru\ndengan gambar dari panggung',

    // scripting area
    'clean up':
        'rapikan',
    'arrange scripts\nvertically':
        'urutkan skripnya\nsecara vertikal',
    'add comment':
        'tambahkan komen',
    'undrop':
        'undo jatuhkan',
    'undo the last\nblock drop\nin this pane':
        'undo mendrag\ndan jatuhkan\nblok terakhir\ndi panel ini',
    'scripts pic...':
        'Gambar skrip',
    'open a new window\nwith a picture of all scripts':
        'buka jendela baru\ndengan gambar semua skrip',
    'make a block...':
        'Buat blok baru.',

    // costumes
    'rename':
        'namakan ulang',
    'export':
        'expor',
    'rename costume':
        'namakan ulang kostum',

    // sounds
    'Play sound':
        'Mainkan suara',
    'Stop sound':
        'Hentikan suara',
    'Stop':
        'Berhenti',
    'Play':
        'mainkan bunyi',
    'rename sound':
        'namakan ulang bunyi',

    // lists and tables
    'list view...':
        'tampilan daftar',
    'table view...':
        'tampilan tabel',
    'open in dialog...':
        'buka di dialog...',
    'reset columns':
        'atur ulang kolum',
    'items':
        'barang',

    // dialogs
    // buttons
    'OK':
        'OK',
    'Ok':
        'oke',
    'Cancel':
        'Batalkan',
    'Yes':
        'Ya',
    'No':
        'tidak',

    // help
    'Help':
        'Bantuan',

    // zoom blocks
    'Zoom blocks':
        'balok zoom',
    'build':
        'bangun',
    'your own':
        'punyamu',
    'blocks':
        'balok',
    'normal (1x)':
        'normal (1x)',
    'demo (1.2x)':
        'demo (1.2x)',
    'presentation (1.4x)':
        'presentasi (1.4x)',
    'big (2x)':
        'gro\u00df (2x)',
    'huge (4x)':
        'besar sekali (4x)',
    'giant (8x)':
        'raksasa (8x)',
    'monstrous (10x)':
        'sangat besar (10x)',

    // Project Manager
    'Untitled':
        'Tak bernama',
    'Open Project':
        'Buka projek',
    '(empty)':
        '(kosong)',
    'Saved!':
        'Tersimpan!',
    'Delete Project':
        'Hapus projek',
    'Are you sure you want to delete':
        'Apakah kamu yakin mau menghapus?',
    'rename...':
        'Namakan ulang...',

    // costume editor
    'Costume Editor':
        'Editor kostum',
    'click or drag crosshairs to move the rotation center':
        'Kilk atau drag crosshair nya untuk megerakan pusat rotasi',

    // project notes
    'Project Notes':
        'Catatan projek',

    // new project
    'New Project':
        'Projek baru',
    'Replace the current project with a new one?':
        'Ganti projek yang sudah ada denagn yang baru?',

    // save project
    'Save Project As...':
        'Simpan projek sebagai',

    // export blocks
    'Export blocks':
        'Expor balok',
    'Import blocks':
        'Impor balok',
    'this project doesn\'t have any\ncustom global blocks yet':
        'projek ini sepertinya tidak \npunya blok global buatan sendiri',
    'select':
        'pilih',
    'none':
        'tidak ada',

    // variable dialog
    'for all sprites':
        'untuk semua sprite',
    'for this sprite only':
        'hanya untuk sprite ini',

    // block dialog
    'Change block':
        'Ganti blok',
    'Command':
        'Perintah',
    'Reporter':
        'Pelapor',
    'Predicate':
        'Predikat',

    // block editor
    'Block Editor':
        'Editor blok',
    'Apply':
        'Aplikasikan',

    // block deletion dialog
    'Delete Custom Block':
        'Hapus blok',
    'block deletion dialog text':
        'Apakah anda yaking anda mau menghapus\n' +
            'blok ini dan instans-nya?',

    // input dialog
    'Create input name':
        'Buat nama input',
    'Edit input name':
        'Edit nama input',
    'Edit label fragment':
        'Edit bagian label',
    'Title text':
        'Teks judul',
    'Input name':
        'Nama input',
    'Delete':
        'Hapus',
    'Object':
        'Objek',
    'Number':
        'Angka',
    'Text':
        'Teks',
    'List':
        'Daftar',
    'Any type':
        'Tipe apapun',
    'Boolean (T/F)':
        'Boolean (B/S)',
    'Command\n(inline)':
        'Perintah',
    'Command\n(C-shape)':
        'Perintah\n(bentuk-C)',
    'Any\n(unevaluated)':
        'Apapun\n(tidak dievaluasi)',
    'Boolean\n(unevaluated)':
        'Boolean\n(tidak dievaluasi)',
    'Single input.':
        'Input tunggal.',
    'Default Value:':
        'Nilai default:',
    'Multiple inputs (value is list of inputs)':
        'Input multipel (nilai adalah daftar input)',
    'Upvar - make internal variable visible to caller':
        'Upvar - membuat var internal mirip dengan pemanggil',

    // About Snap
    'About Snap':
        'Tentang Snap',
    'Back...':
        'Kembali...',
    'License...':
        'Lisensi...',
    'Modules...':
        'Modul...',
    'Credits...':
        'Kredit...',
    'Translators...':
        'Penerjemah',
    'License':
        'Lisensi',
    'current module versions:':
        'Versi komponen sekarang',
    'Contributors':
        'Kontributor',
    'Translations':
        'Terjemahan',

    // variable watchers
    'normal':
        'normal',
    'large':
        'besar',
    'slider':
        'slider',
    'slider min...':
        'Minimum slider...',
    'slider max...':
        'Maksimum slider...',
    'import...':
        'Impor...',
    'Slider minimum value':
        'Nilai minimum slider:',
    'Slider maximum value':
        'Nilai maksimum slider:',

    // list watchers
    'length: ':
        'panjang: ',

    // coments
    'add comment here...':
        'tambahkan komen disini...',

    // drow downs
    // directions
    '(90) right':
        '(90) kanan',
    '(-90) left':
        '(-90) kiri',
    '(0) up':
        '(0) atas',
    '(180) down':
        '(180) bawah',

    // collision detection
    'mouse-pointer':
        'penunjuk tetikus/mouse',
    'edge':
        'ujung',
    'pen trails':
        'jejak pena',

    // costumes
    'Turtle':
        'kura-kura',
    'Empty':
        'kosong',

    // graphical effects
    'brightness':
        'kecerahan',
    'ghost':
        'keburaman',
    'negative':
        'negatif',
    'comic':
        'komik',
    'confetti':
        'konfetti',

    // keys
    'space':
        'spasi',
    'up arrow':
        'panah bawah',
    'down arrow':
        'panah atas',
    'right arrow':
        'panah kanan',
    'left arrow':
        'panah kiri',
    'any key':
        'tombol apapun',
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
        'Neu...',

    // math functions
    'abs':
        'nilai absolut',
    'ceiling':
        'bulatkan keatas',
    'floor':
        'bulatkan kebawah',
    'sqrt':
        'akar',
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
        'huruf',
    'whitespace':
        'spasi',
    'line':
        'garis',
    'tab':
        'indentasi',
    'cr':
        'cr',

    // data types
    'number':
        'Zahl',
    'text':
        'Text',
    'Boolean':
        'Boole',
    'list':
        'Liste',
    'command':
        'perintah',
    'reporter':
        'pelapor',
    'predicate':
        'predikat',

    // list indices
    'last':
        'terakhir',
    'any':
        'apapun'
};
