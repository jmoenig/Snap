# Using Snap! Without an Internet Connection

last updated on Nov. 25, 2021

Snap! is a web application hosted at
[https://snap.berkeley.edu/run](https://snap.berkeley.edu/run "Snap! online").

If you would like to use Snap! without being connected to the internet, e.g. in a remote area
or in a school with limited or unreliable online service there are two ways to set up Snap! locally
on your computer: Either as a "progressive web app" (PWA) or by downloading the sources and opening
them locally in your browser.

## Installing Snap! as PWA

The easiest way set up Snap! locally on your computer is to open the Snap! IDE in your browser and then to select "install" in the browser's url bar, usually found on the far right. This will let
you use Snap! just like any other app on your computer, tablet or phone, even if you have no
internet connection. You will also be able to import costumes, backgrounds, souds and additional
blocks just like you would if you were online, using the same dialogs and user interface.

Currently the ability to install Snap! as a PWA is supported by Chrome, Edge, Safari on iOS, and Firefox on Android. If you're using one of these browsers, this is the preferred method for you:
Install once and you're done.

## Downloading Snap!'s Sources

If your preferred web browser does not support PWAs, e.g. if you're using Desktop Firefox, you can still use Snap! offline by following these

### Simple Steps:

1. Download the latest Snap! Release from
[https://github.com/jmoenig/Snap/releases/latest](https://github.com/jmoenig/Snap/releases/latest "Snap! Source Code"), and unpack the contents of the archive to your local disk.
2. Open the file `snap.html` in your browser.
3. There is no step 3.

Snap! is just a web page, you can open it locally in your browser, no need to install anything
on your computer. You can use whichever operating system you like, you don't even need
admin rights. You can also use a memory stick to distribute the directory with source files
among the participants of a workshop or the students of your class, even if some of them
are using MacOS and others run MS Windows or Linux.

### Remember to Unpack

Windows users, this is for you.

Once you've downloaded the source code, please remember to actually unpack the archive
to your computer. If you downloaded the zip file please actually unzip it, before you open
`snap.html`. If you use a Mac simple double-clicking the zip file unpacks it. But if you're
on Windows double clicking the zip fie will *not* unzip it but instead show you the contents of
the archive.

### Which Web Browser?

It's best to open Snap! in Chrome, Edge, Safari or Firefox.

Snap! is using web standards and runs in any modern web browser. Some browsers are faster
than others, which makes using Snap! more fun. For the best user experience we recommend
Chrome or Firefox. IE does not comply with modern web standards and will not work. The new Edge browser is based on Chrome and will work just fine, if you have an old Windows version with an old version of Edge it will also work, but some operations will be so slow it takes the fun out of programming and playing.

### What about Tablets?

Snap! works on most modern tablets, but the UI isn't yet optimized for mobile use. Therefore we recommend to use a stylus or "pencil". This makes is much easier to click on small elements like
input slots, drop-down menus and expansion arrows. If a tablet is your primary computing device
for programming we also recommend an external Bluetooth keyboard. You'll be able to use Snap!
with the "soft" keyboard as well, but you might find it getting in the way of other UI elements
you'd like to see, e.g. blocks or sprites.

### Restrictions of the Offline Version

You can't access the cloud, duh. Everything else just works.

Aside from accessing the cloud using Snap! offline in the browser by opening the `snap.html`
file locally there aren't any restrictions. You can use all the blocks, import pictures, sounds,
libraries, take snapshots with the webcom, record sounds with the microphone, draw your
own costumes etc.

### Saving and Loading

When you use Snap! locally you will not be able to save projects to the cloud, nor can you
access projects saved in the cloud. Instead projects will be exported as xml-files to your
computer, from where they can also be opened again.

There are two ways to load projects and assets from your computer when you use Snap!
without an internet connection:

1. Using the options in Snap's file menu opens an OS-native file dialog that lets you select
which file to import or load.
2. Alternatively you can drag projects and assets (extension libraries, pictures, sounds etc.)
from your computer directly into Snap! and drop it. If you import sounds or images you can
also drag and drop several files all at once.

Easy, isn't it?

### Keeping Snap! up-to-date

From time to time it's wise to check whether a new version of Snap! is available. You can
find out the lastest release using the link above, and compare that to the offline sources on
your computer. If there is a newer version, simply replace the source files with the newer ones.


Enjoy!

-Jens
