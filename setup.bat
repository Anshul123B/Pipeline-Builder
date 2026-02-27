@echo off
REM Quick start script for MERN Pipeline Builder (Windows)

echo Installing backend dependencies...
cd backend
call npm install

if %ERRORLEVEL% neq 0 (
    echo Error installing backend dependencies!
    exit /b 1
)

echo Backend dependencies installed
echo.
echo Installing frontend dependencies...
cd ..\frontend
call npm install

if %ERRORLEVEL% neq 0 (
    echo Error installing frontend dependencies!
    exit /b 1
)

echo Frontend dependencies installed
echo.
echo Setup complete!
echo.
echo To start the application:
echo.
echo Terminal 1 (Backend):
echo   cd backend ^&^& npm start
echo.
echo Terminal 2 (Frontend):
echo   cd frontend ^&^& npm start
echo.
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:3000
