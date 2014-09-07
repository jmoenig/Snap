#!/bin/bash

# Requirements:
# git
# UglifyJS2 (https://github.com/mishoo/UglifyJS2)

git clone https://github.com/Gubolin/snap.git
cd "snap"
git checkout mobileapp

rm -rf .git/
rm lang* ypr.js paint.js cloud.js gui.js

find . -name '*.js' | xargs -I {} uglifyjs {} -o {} -c

sed -i '/paint\.js"/d' snap.html
sed -i '/cloud\.js"/d' snap.html
sed -i 's/gui\.js"/binary\.js"/' snap.html

find . \( \! -name '*.js' \! -name 'snap.html' \! -name 'mobile.sh' \! -name 'desktop.sh' \! -name 'snap_logo_sm.png' \! -name 'config.xml' \! -name 'package.json' -type f \) -print0 | xargs -0 rm
find . -type d -empty -print0 | xargs -0 rm -r
