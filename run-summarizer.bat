@echo off
REM AI Daily Dashboard - News Summarizer Runner
REM This script is designed to be run by Windows Task Scheduler

REM Change to the script directory
cd /d "%~dp0"

REM Log start time
echo ========================================== >> news.log
echo Starting news summarization at %date% %time% >> news.log

REM Run the Python script
python news-summarizer.py >> news.log 2>&1

REM Log completion
echo Completed at %date% %time% >> news.log
echo ========================================== >> news.log
