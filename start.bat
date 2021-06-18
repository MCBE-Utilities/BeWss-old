@echo off
cd bewss

if not exist "node_modules" call update.bat

call npm run start