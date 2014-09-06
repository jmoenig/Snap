#!/bin/bash
cordova create Snap-Mobile edu.berkeley.snap "Snap\!"
cd Snap-Mobile
rm -rf www config.xml
git clone https://github.com/Gubolin/snap.git www
cd www
git checkout mobileapp
cordova platform add android
cordova build android
