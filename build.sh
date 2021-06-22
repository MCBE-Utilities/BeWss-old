#!/bin/sh
clear
cd .

npm run build

echo "Build complete!"
# Pause
echo "Press any key to continue..."
read -n 1 -s