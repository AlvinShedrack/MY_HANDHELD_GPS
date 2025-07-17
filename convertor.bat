@echo off
:: Set your commit message
set /p message="Enter commit message: "

:: Navigate to your project folder
cd /d "D:\Cordinate Convertor"

:: Add all changes
git add .

:: Commit with user message
git commit -m "%message%"

:: Push to GitHub
git push origin main

pause
