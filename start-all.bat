@echo off
REM DP Studio - Start All Services Script for Windows
echo.
echo ============================================
echo    DP Studio - Starting All Services
echo ============================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo Error: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Start MongoDB (optional - comment out if using Atlas)
echo.
echo Starting MongoDB...
start cmd /k mongod

REM Start Backend
echo.
echo Starting Backend Server...
start cmd /k "cd server && npm run dev"

REM Wait for backend to start
timeout /t 3 /nobreak

REM Start Frontend
echo.
echo Starting Frontend Server...
start cmd /k "cd client && npm run dev"

echo.
echo ============================================
echo All services started!
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo MongoDB:  mongodb://localhost:27017
echo.
echo Close any window to stop that service.
echo ============================================
pause
