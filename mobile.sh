#!/bin/bash

if [[ $1 = "" ]]
then
    echo "Usage: mobile.sh PLATFORM [BUILDSOURCE]"
    exit 0
fi

# Requirements:
# git, nodejs, android SDK / other platform(s)
# cordova (https://cordova.apache.org/)

# binaries are in platform/android/ant-build/Snap-debug.apk

if [[ $2 != "" ]]
then
    copyfrom=$(readlink -e "$2")
fi

cordova create Snap-Mobile edu.berkeley.snap "Snap\!"
cd Snap-Mobile
rm -rf www config.xml

if [[ $2 == "" ]]
then
    git clone https://github.com/Gubolin/snap.git www
    cd www/
    git checkout mobileapp
else
    cp -R "$copyfrom/" .
    mv "$copyfrom" www
    cd www
fi

sed -i '/link rel="shortcut icon"/a\
        <script type="text/javascript" src="cordova.js"></script>' snap.html

cordova platform add "$1"
cordova plugin add org.apache.cordova.plugin.softkeyboard
cordova plugin add org.apache.cordova.vibration
cordova plugin add org.apache.cordova.device-motion
cordova plugin add org.apache.cordova.device-orientation
cordova plugin add org.apache.cordova.geolocation
cordova build "$1"
