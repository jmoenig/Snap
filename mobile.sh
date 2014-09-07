#!/bin/bash

# Requirements:
# git, nodejs, android SDK / other platform(s)
# cordova (https://cordova.apache.org/)

# binaries are in platform/android/ant-build/Snap-debug.apk

cordova create Snap-Mobile edu.berkeley.snap "Snap\!"
cd Snap-Mobile
rm -rf www config.xml
git clone https://github.com/Gubolin/snap.git www
cd www
git checkout mobileapp
cordova platform add android
cordova plugin add org.apache.cordova.plugin.softkeyboard
cordova plugin add org.apache.cordova.vibration
cordova plugin add org.apache.cordova.device-motion
cordova plugin add org.apache.cordova.device-orientation
cordova build android
