#!/bin/bash

if [[ $1 = "" ]]
then
    echo "Usage: desktop.sh PLATFORM [BUILDSOURCE]"
    exit 0
fi

# Requirements:
# git, zip, nodejs
# node-webkit (https://github.com/rogerwang/node-webkit), node-webkit-builder (https://github.com/mllrsohn/node-webkit-builder)

# binaries are in snap/build/Snap!

if [[ $2 == "" ]]
then
    git clone https://github.com/Gubolin/snap.git www
    cd www/
    git checkout mobileapp
else
    cp -R "$2" www
    cd www/
fi

nwbuild -p "$1" .
