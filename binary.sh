#!/bin/bash

if [[ $# < 2 ]]
then
    echo "Usage: binary.sh OPTION PLATFORM [FILE]"
    echo ""
    echo "OPTIONS:"
    echo "  -m      Mobile"
    echo "  -d      Desktop"
    echo ""
    echo "PLATFORMS:"
    echo "  Mobile      amazon-fireos android blackberry10 firefoxos ios ubuntu wp8 win8 tizen"
    echo "  Desktop     win osx linux32 linux64"
    echo ""
    echo "If FILE is given, it will be #open-ed inside Snap\! immediately"
    exit 0
fi

# Requirements:
# git
# UglifyJS2 (https://github.com/mishoo/UglifyJS2)

ide=true
platform=$2

if [[ "$3" != "" ]]
then
    ide=false
fi

if [ $ide == false ]
then
   if [ -f "$3" ]
    then
        content=$(cat "$3")
    else
        ide=true
    fi
fi

git clone "https://github.com/Gubolin/snap.git"
cd "snap"
git checkout mobileapp

rm -rf .git/

if [ $ide == false ]
then
    rm lang* ypr.js paint.js cloud.js gui.js

    sed -i '/paint\.js"/d' snap.html
    sed -i '/cloud\.js"/d' snap.html
    sed -i 's/gui\.js"/binary\.js"/' snap.html

    sed -i "/ide\.openIn/a\
        ide.droppedText(\'$content\'); " snap.html
fi

find . -name '*.js' | xargs -I {} uglifyjs {} -o {} -c

find . \( \! -name '*.js' \! -name 'snap.html' \! -name 'mobile.sh' \! -name 'desktop.sh' \! -name 'snap_logo_sm.png' \! -name 'config.xml' \! -name 'package.json' -type f \) -print0 | xargs -0 rm
find . -type d -empty -print0 | xargs -0 rm -r

cd ..

if [[ $1 == "-m" ]]
then
    ./mobile.sh "$2" "snap"
else
    ./desktop.sh "$2" "snap"
fi
