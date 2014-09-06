#!/bin/bash

# Requirements:
# git, zip, nodejs
# node-webkit (https://github.com/rogerwang/node-webkit), node-webkit-builder (https://github.com/mllrsohn/node-webkit-builder)

# binaries are in snap/build/Snap!

git clone https://github.com/Gubolin/snap.git
cd "snap"
git checkout mobileapp
nwbuild -p win,osx,linux32,linux64 .
