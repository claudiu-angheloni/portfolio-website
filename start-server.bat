@echo off
cd /d "%~dp0"
echo Starting local server at http://localhost:4173
node serve.js
