#!/bin/bash

if [[ "$snapsource" == "" ]]
then
    export snapsource="https://github.com/Gubolin/snap.git"
fi

if [[ $# < 2 ]]
then
    echo "Usage: binary.sh OPTION PLATFORM [FILE/URL]"
    echo ""
    echo "OPTIONS:"
    echo "  -m      Mobile"
    echo "  -d      Desktop"
    echo ""
    echo "PLATFORMS:"
    echo "  Mobile      amazon-fireos android blackberry10 firefoxos ios ubuntu wp8 win8 tizen"
    echo "  Desktop     win32 win64 osx linux32 linux64"
    echo ""
    echo "If FILE/URL is given, it will be #open-ed inside Snap! immediately. URL will be loaded at runtime."
    echo "If URL starts with a hash ('#'), it will be used as initial base url suffix"
    echo " (for example '#present:UserName=foo\&ProjectName=bar', escape the '&')."
    echo ""
    echo ""
    echo "The following environment variables will be used, if available:"
    echo "  snapsource  Path or URL to the Snap! git repository. This repository must contain the branch"
    echo "              mobileapp with the configuration files! Default: https://github.com/Gubolin/snap.git"
    echo "  crosswalk   Path to a crosswalk-cordova directory. Download \"Cordova Android\" here:"
    echo "              https://crosswalk-project.org/documentation/downloads.html"
    echo "              If omitted, standard cordova will be used."
    exit 0
fi

scriptdir=$(readlink -e ".")

# Requirements:
# git
# UglifyJS2 (https://github.com/mishoo/UglifyJS2)

ide=true
platform=$2

# presentation mode
if [[ "$3" != "" ]]
then
    ide=false
fi

buildsource=$(mktemp -d)
git clone $snapsource $buildsource
cd "$buildsource"
git checkout mobileapp

if [ $ide == false ]
then
    # minimize everything
    rm *.sh *.pdf *.txt
    rm -r help/ Costumes/ Backgrounds/ Sounds/

    # if a file was given, move it to "project.xml"
    # it will be loaded like an URL then
    if [ -f "$3" ]
    then
        cp "$3" "project.xml"
        url="project.xml"
    else
        url=$3
    fi

    if [[ $url == \#* ]]
    then
        # load custom project from cloud or string
        sed -i "s/snap.html/snap.html${url}/g" config.xml package.json
    else
        # load custom project from url
        sed -i "/ide\.openIn/a\
            ide.droppedText(ide.getURL('$url'));" snap.html
        sed -i "/this.toggleAppMode(false)/d" gui.js
        sed -i "s/snap.html/snap.html#run:/g" config.xml package.json
    fi
fi

# compress all js files
find . -name '*.js' | xargs -I {} uglifyjs {} -o {} -c 2> /dev/null

# return to the directory where the script was called from
cd "$scriptdir"

# run helper scripts for building

if [[ $1 == "-m" ]]
then
    ./mobile.sh "$2" "$buildsource"
else
    ./desktop.sh "$2" "$buildsource"
fi
