
@echo off
title Infallible Academy - GitHub Updater

echo.
echo ==========================================
echo       INFALLIBLE ACADEMY WEBSITE
echo            GITHUB UPDATER
echo ==========================================
echo.

cd /d "%~dp0"

echo [1/3] Adding website files...
git add .

echo.
echo [2/3] Creating commit...
set /p msg=Enter update message: 

if "%msg%"=="" set msg=Website updated

git diff --cached --quiet

if %errorlevel%==0 (
    echo.
    echo No new changes to upload.
    pause
    exit /b
)

git commit -m "%msg%"

if errorlevel 1 (
    echo Commit failed!
    pause
    exit /b 1
)

echo.
echo [3/3] Uploading to GitHub...
git push origin main

if errorlevel 1 (
    echo.
    echo Upload failed! Please check your internet or GitHub login.
) else (
    echo.
    echo ==========================================
    echo       WEBSITE UPDATED SUCCESSFULLY!
    echo ==========================================
    echo.
    echo Live Website:
    echo https://srivastavadivyansh014-byte.github.io/infallible-academy/
)

echo.
pause
