#!/bin/bash

if [ ! -d "log" ] ;then
mkdir log
fi

nohup node server/my_server/index.js >> log/server.log 2>&1 &
echo "server started!"

if [ -z $1 ] ;then
echo "Please execute command like: sh run.sh web/mobile!"

elif [ $1 = "mobile" ] ;then
cd mobile/
nohup yarn serve >> ../log/mobile.log 2>&1 &
echo "mobile client started!"

elif [ $1 = "web" ] ;then
cd web/
nohup yarn serve >> ../log/web.log 2>&1 &
echo "web client started!"

fi
