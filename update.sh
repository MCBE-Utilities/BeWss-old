#!/bin/sh
clear

cd .

function program_is_installed {
  local return_=1
  type $1 >/dev/null 2>&1 || { local return_=0; }
  echo "$return_"
}

NODE_INSTALLED="$(program_is_installed node)"
NPM_INSTALLED="$(program_is_installed npm)"

if test $NODE_INSTALLED == 0; then
  echo "Bewss requires node. Please install latest node.js release"
  # Pause
  echo "Press any key to continue..."
  read -n 1 -s

  exit 1
fi

if test $NPM_INSTALLED == 0; then
  echo "Bewss requires npm. Please install latest node.js release"
  # Pause
  echo "Press any key to continue..."
  read -n 1 -s

  exit 1
fi

echo "Installing Dependencies..."
npm i

if [ ! -d "dist" ]; then
  npm run build
fi