@echo off
cd .

echo.
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: BeWss requires npm. Please install node.js first 1>&2
    exit /b %errorlevel%
) 
echo ^> npm i
call npm i

if not exist "dist" call npm run build