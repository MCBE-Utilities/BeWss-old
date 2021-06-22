#!/bin/sh
clear

cd .

if [ -d "bewss" ]; then
  cd ./bewss
fi

if [ ! -d "node_modules" ]; then
  source ./update.sh
fi

if [ ! -d "dist" ]; then
  source ./build.sh
fi

npm run start

echo "Press any key to continue..."
read -n 1 -s