@echo off

set bewssDir=%cd%

cd /d %bewssDir%

if exist "bewss" cd bewss

if not exist "node_modules" call update.cmd

if not exist "dist" call npm run build

call npm run start

pause