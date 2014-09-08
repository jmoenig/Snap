#!/bin/bash

if [[ $1 = "" ]]
then
    echo "Usage: desktop.sh PLATFORM [BUILDSOURCE]"
    exit 0
fi

scriptdir=$(readlink -e ".")

# Requirements:
# git, zip, nodejs
# node-webkit (https://github.com/rogerwang/node-webkit), node-webkit-builder (https://github.com/mllrsohn/node-webkit-builder)

builddir=$(mktemp -d)

if [[ $2 == "" ]]
then
    git clone https://github.com/Gubolin/snap.git $builddir
    cd $builddir/
    git checkout mobileapp
else
    mv "$2" $builddir
    cd $builddir/
fi

# remove mobile config
rm config.xml

nwbuild -p "$1" .

mv build/* $scriptdir/
