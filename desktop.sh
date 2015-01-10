#!/bin/bash

if [[ "$snapsource" == "" ]]
then
    export snapsource="https://github.com/Gubolin/snap.git"
fi

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
    git clone "$snapsource" $builddir
    cd $builddir/
    git checkout mobileapp
else
    mv "$2" $builddir
    cd $builddir/
fi

nwbuild -p "$1" .

mv build/* $scriptdir/
