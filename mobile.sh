#!/bin/bash

if [[ "$snapsource" == "" ]]
then
    export snapsource="https://github.com/Gubolin/snap.git"
fi

if [[ $1 = "" ]]
then
    echo "Usage: mobile.sh PLATFORM [BUILDSOURCE]"
    exit 0
fi

scriptdir=$(readlink -e ".")

# Requirements:
# git, nodejs, android SDK / other platform(s)
# cordova (https://cordova.apache.org/)
# optional: crosswalk-cordova (https://github.com/crosswalk-project/crosswalk-cordova-android)

if [[ $2 != "" ]]
then
    buildsource=$(readlink -e "$2")
fi

builddir=$(mktemp -d)

cordova create $builddir edu.berkeley.snap "Snap\!"
cd $builddir
rm -rf www config.xml

if [[ $2 == "" ]]
then
    git clone "$snapsource" www
    cd www/
    git checkout mobileapp
else
    mv "$buildsource" www
    cd www
fi

# add mobile-specific library; it's made available at runtime
sed -i '/link rel="shortcut icon"/a\
       <script type="text/javascript" src="cordova.js"></script>' snap.html

echo "Adding cordova plugins"
# add everything needed and build for $device
cordova platform add "$1" > /dev/null
cordova plugin add org.apache.cordova.plugin.softkeyboard \
    org.apache.cordova.vibration \
    org.apache.cordova.device-motion \
    org.apache.cordova.device-orientation \
    org.apache.cordova.geolocation \
    de.appplant.cordova.plugin.local-notification 2> /dev/null

if [[ $1 == "android" ]]
then
    # Remove default icons
    cd "$builddir/platforms/android"
    find -name '*.png' | xargs rm

    if [[ $crosswalk != "" ]]
    then
        # adapted from https://crosswalk-project.org/documentation/cordova/migrate_an_application.html#migrate
        echo "Preparing crosswalk"
        rm -Rf "$builddir/platforms/android/CordovaLib/*"
        cp -a $crosswalk/framework/* "$builddir/platforms/android/CordovaLib/"
        cp -a "$crosswalk/VERSION" "$builddir/platforms/android/"
        export ANDROID_HOME=$(dirname $(dirname $(which android)))
        cd "$builddir/platforms/android/CordovaLib/"
        android update project --subprojects --target android-21 --path . > /dev/null
        ant debug > /dev/null
        cd "$builddir"
        # prepend permissions to end of manifest
        sed -i "s,</manifest>,\
                <uses-permission android:name=\"android.permission.ACCESS_WIFI_STATE\" />\
                <uses-permission android:name=\"android.permission.ACCESS_NETWORK_STATE\" />\
                <uses-permission android:name=\"android.permission.INTERACT_ACROSS_USERS\" />\
            </manifest>,g" \
            "$builddir/platforms/android/AndroidManifest.xml"
    fi
fi

echo "Building application"
cordova build "$1" > /dev/null

cd $builddir
# TODO other platforms
find -name '*.apk' | xargs -I {} mv {} $scriptdir
echo "Finished."
