#!/bin/bash

echo make sure there is no other server instances running pointing to the wrong client code

function redirectClientCode()
{
  if [ ! -L src/browser ]; then
    echo redirecting the client code
    rm src/browser -rf
    ln -s  ../../ src/browser
  else
    echo WARN: is already symlinked.
  fi

  # print out the head
  cd src/browser
  echo "#########"
  echo client code pointing to:
  git log -1
  echo
  echo with changes to:
  git ls-files . -m
  echo "#########"
  cd ../../
}

if [ -d .server ]; then

  cd .server
  git clean -fd
  git checkout .
  git checkout master
  git pull
  redirectClientCode
  npm i

else # it's the first time

  echo pulling the server
  rm -rf .server
  git clone --recurse-submodules https://github.com/NetsBlox/NetsBlox.git .server
  cd .server
  redirectClientCode
  echo installing the required packages
  npm i

fi

npm run test-client
