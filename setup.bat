@echo off
REM Quiz Battle Platform - Quick Start Script for Windows

echo.
echo ======================================
echo Quiz Battle Platform - Quick Start
echo ======================================
echo.

REM Check if Node.js is installed
node --version > nul 2>&1
if errorlevel 1 (
    echo Error: Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

echo Node.js version:
node --version
echo.

REM Create .env files from examples
echo Creating .env files...
if not exist "server\.env" (
    copy server\.env.example server\.env
    echo. Created server\.env (Please edit with your credentials)
) else (
    echo. server\.env already exists
)

if not exist "client\.env" (
    copy client\.env.example client\.env
    echo. Created client\.env (Please edit with your API URL)
) else (
    echo. client\.env already exists
)

echo.
echo Installing dependencies...
echo.

REM Install server dependencies
echo Installing server dependencies...
cd server
call npm install
cd ..
echo. Server dependencies installed
echo.

REM Install client dependencies
echo Installing client dependencies...
cd client
call npm install
cd ..
echo. Client dependencies installed
echo.

echo.
echo ======================================
echo Setup complete!
echo ======================================
echo.
echo Next steps:
echo 1. Edit server\.env with your credentials
echo 2. Edit client\.env with your API URL
echo.
echo To start development:
echo   Terminal 1: cd server ^&^& npm start
echo   Terminal 2: cd client ^&^& npm start
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo.
pause
