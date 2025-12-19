# Daily Intelligence - Complete Setup Guide

This guide walks you through setting up the Daily Intelligence Chrome Extension, including:
1. Groq API configuration
2. Git repository setup
3. Chrome extension installation
4. Automated daily execution (Windows Task Scheduler)

---

## Part 1: Groq API Setup

### Step 1.1: Create a Groq Account

1. Visit [https://console.groq.com/](https://console.groq.com/)
2. Click **"Sign Up"** (top right)
3. Sign up with:
   - Google account, OR
   - GitHub account, OR
   - Email and password
4. Verify your email if required

### Step 1.2: Generate an API Key

1. After logging in, click on **"API Keys"** in the left sidebar
   - Direct link: [https://console.groq.com/keys](https://console.groq.com/keys)
2. Click **"Create API Key"**
3. Give it a name like "AI Dashboard"
4. Click **"Create"**
5. **IMPORTANT:** Copy the API key immediately! It starts with `gsk_` and looks like:
   ```
   gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
   (It's about 56 characters long)

> **Warning:** The key is only shown once. If you lose it, you'll need to create a new one.

### Step 1.3: Free Tier Limits

Groq's free tier includes:
- **30 requests/minute**
- **14,400 requests/day**
- **6,000 tokens per minute** (approximately)

This is more than enough for daily news summaries (typically 1-2 requests per category).

### Step 1.4: Create Your .env File

In the dashboard folder, create a file named `.env`:

```bash
# Windows (Command Prompt):
echo GROQ_API_KEY=gsk_your_actual_key_here > .env

# Windows (PowerShell):
"GROQ_API_KEY=gsk_your_actual_key_here" | Out-File -FilePath .env -Encoding utf8
```

Or manually create `.env` with this content:
```
GROQ_API_KEY=gsk_your_actual_key_here
```

### Step 1.5: Test Your API Key

Run this Python test:

```python
# test-api.py
from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()
client = Groq(api_key=os.getenv('GROQ_API_KEY'))

response = client.chat.completions.create(
    model="llama-3.1-70b-versatile",
    messages=[{"role": "user", "content": "Say 'API working!' in 3 words."}],
    max_tokens=10
)
print(response.choices[0].message.content)
```

Expected output: `API working!` (or similar)

### Common API Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `401 Unauthorized` | Invalid API key | Double-check key in .env file |
| `429 Too Many Requests` | Rate limit exceeded | Wait a minute, or reduce request frequency |
| `500 Internal Server Error` | Groq service issue | Try again in a few minutes |

---

## Part 2: Git Repository Setup

### Step 2.1: Initialize Repository

Open a terminal in the dashboard folder and run:

```bash
# Initialize git repository
git init

# Add all files (except those in .gitignore)
git add .

# Create initial commit
git commit -m "Initial commit: Daily Intelligence with news summarization"
```

### Step 2.2: Verify .gitignore is Working

Run this to confirm sensitive files are excluded:

```bash
git status
```

You should NOT see:
- `.env` (contains your API key)
- `summary.json` (generated file)
- Any `.log` files

### Step 2.3: Link to GitHub (Optional)

1. Create a new repository on GitHub (https://github.com/new)
2. Don't initialize with README (we already have one)
3. Link and push:

```bash
git remote add origin https://github.com/YOUR_USERNAME/daily-intelligence-chrome-extension.git
git branch -M main
git push -u origin main
```

### Repository Structure

```
daily-intelligence-chrome-extension/
├── daily-intelligence.html       # Main dashboard
├── news-summarizer.py                # Python summarizer script
├── generate-icons.py                 # Icon generator for Chrome extension
├── requirements.txt                  # Python dependencies
├── manifest.json                     # Chrome extension manifest
├── .env.example                      # Template for API key (safe to commit)
├── .env                              # Your actual API key (DO NOT COMMIT!)
├── .gitignore                        # Git ignore rules
├── README.md                         # Project documentation
├── SETUP.md                          # This setup guide
└── icons/                            # Chrome extension icons
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

---

## Part 3: Chrome Extension Installation

### Step 3.1: Install Python Dependencies

```bash
pip install -r requirements.txt
pip install pillow  # For icon generation
```

### Step 3.2: Generate Extension Icons

```bash
python generate-icons.py
```

This creates `icons/icon16.png`, `icons/icon48.png`, and `icons/icon128.png`.

### Step 3.3: Load the Extension in Chrome

1. Open Chrome and go to: `chrome://extensions/`
2. Enable **"Developer mode"** (toggle in top right)
3. Click **"Load unpacked"**
4. Navigate to and select your `daily-intelligence-chrome-extension` folder
5. The extension should appear in your extensions list

### Step 3.4: Test the Extension

1. Open a new tab (Ctrl+T or Cmd+T)
2. You should see the Daily Intelligence instead of Chrome's default new tab page
3. If you see "Executive summaries not yet generated," that's expected - run the Python script first

### Troubleshooting Chrome Extension

**Extension not loading:**
- Make sure `manifest.json` is in the root folder
- Check for JSON syntax errors in manifest.json
- Ensure all icon files exist

**Dashboard shows "file://" errors:**
- The extension needs to access `summary.json` from the same folder
- Run `news-summarizer.py` before using the extension

**New tab still shows Google:**
- Check if another extension is overriding new tab
- Disable other new tab extensions temporarily
- Verify the extension is enabled in chrome://extensions/

### Updating the Extension

After making changes to HTML or JS:
1. Go to `chrome://extensions/`
2. Find "Daily Intelligence"
3. Click the refresh icon (🔄) or "Reload"

---

## Part 4: Windows Task Scheduler Setup

Automate `news-summarizer.py` to run every morning at 6 AM.

### Step 4.1: Create a Batch File

Create `run-summarizer.bat` in your dashboard folder:

```batch
@echo off
cd /d "C:\Users\ZanZirbel\Obsidian\personal-repos\daily-intelligence-chrome-extension"
python news-summarizer.py >> news.log 2>&1
echo Completed at %date% %time% >> news.log
```

### Step 4.2: Open Task Scheduler

1. Press `Win + R`
2. Type `taskschd.msc` and press Enter
3. Or search "Task Scheduler" in Start menu

### Step 4.3: Create the Task

1. In the right panel, click **"Create Task..."** (not "Create Basic Task")

2. **General Tab:**
   - Name: `AI Dashboard News Update`
   - Description: `Fetches news and generates AI summaries daily`
   - Select: "Run whether user is logged on or not"
   - Check: "Run with highest privileges"

3. **Triggers Tab:**
   - Click "New..."
   - Begin the task: "On a schedule"
   - Settings: Daily
   - Start: Select today's date, set time to `6:00:00 AM`
   - Recur every: `1` days
   - Check: "Enabled"
   - Click "OK"

4. **Actions Tab:**
   - Click "New..."
   - Action: "Start a program"
   - Program/script: `C:\Users\ZanZirbel\Obsidian\personal-repos\daily-intelligence-chrome-extension\run-summarizer.bat`
   - Start in: `C:\Users\ZanZirbel\Obsidian\personal-repos\daily-intelligence-chrome-extension`
   - Click "OK"

5. **Conditions Tab:**
   - Uncheck "Start the task only if the computer is on AC power"
   - (This ensures it runs on battery too)

6. **Settings Tab:**
   - Check: "Allow task to be run on demand"
   - Check: "Run task as soon as possible after a scheduled start is missed"
   - Check: "If the task fails, restart every: 10 minutes"
   - Stop the task if it runs longer than: `1 hour`

7. Click "OK" and enter your Windows password when prompted

### Step 4.4: Test the Task

1. In Task Scheduler, find "AI Dashboard News Update"
2. Right-click and select **"Run"**
3. Wait for it to complete (check Status column)
4. Verify `summary.json` was created/updated
5. Check `news.log` for any errors

### Step 4.5: Verify Scheduled Execution

After 6 AM the next day:
1. Open `news.log` to see execution time
2. Check `summary.json` for fresh `generated_at` timestamp
3. Open the dashboard to see new summaries

### Troubleshooting Task Scheduler

**Task shows "Last Run Result: 0x1"**
- Usually means Python wasn't found
- Use full path to python.exe in the batch file:
  ```batch
  "C:\Users\ZanZirbel\AppData\Local\Programs\Python\Python311\python.exe" news-summarizer.py
  ```

**Task shows "Running" but never completes:**
- Check if there's a Python prompt waiting
- Ensure .env file exists and has valid API key
- Run manually first to verify it works

**No output in news.log:**
- Check "Start in" directory is correct
- Ensure batch file has correct path
- Try running batch file directly first

---

## Part 5: Testing Checklist

Use this checklist to verify everything works:

### Groq API
- [ ] `.env` file exists with `GROQ_API_KEY=gsk_...`
- [ ] Running `python news-summarizer.py` completes without errors
- [ ] `summary.json` is created with valid JSON
- [ ] Each category has a `summary` and `articles` array

### Chrome Extension
- [ ] Icons exist in `icons/` folder (16, 48, 128 px)
- [ ] Extension loads without errors in chrome://extensions/
- [ ] Opening new tab shows the dashboard
- [ ] Dashboard loads and displays content

### News Features
- [ ] When `summary.json` exists: Executive summaries appear
- [ ] When `summary.json` missing: Helpful message shown
- [ ] Clicking article header expands the description
- [ ] Expanded articles show RSS description
- [ ] "Read Full Article" link works
- [ ] Viewed articles show checkmark indicator
- [ ] Expanded state persists after page reload

### Automation
- [ ] `run-summarizer.bat` runs successfully when double-clicked
- [ ] Task appears in Task Scheduler
- [ ] Manual "Run" creates fresh `summary.json`
- [ ] `news.log` shows execution timestamps

### Git Repository
- [ ] `git status` shows clean working tree (after initial commit)
- [ ] `.env` is NOT tracked (check with `git status --ignored`)
- [ ] `summary.json` is NOT tracked

---

## Part 6: Quick Reference Commands

```bash
# Install dependencies
pip install -r requirements.txt
pip install pillow

# Generate summaries manually
python news-summarizer.py

# Generate extension icons
python generate-icons.py

# Check if summary.json is valid
python -c "import json; print(json.load(open('summary.json'))['generated_at'])"

# View recent log entries
type news.log | more

# Git: Add changes and commit
git add .
git commit -m "Update dashboard"
git push
```

---

## Maintenance

### Weekly
- Check `news.log` for any errors
- Verify summaries are being generated

### Monthly
- Update Python packages: `pip install --upgrade -r requirements.txt`
- Check Groq API for any quota changes
- Clear old log entries if file gets large

### If Things Break
1. Run `python news-summarizer.py` manually to see error output
2. Check `.env` file still exists and has valid key
3. Visit https://console.groq.com/ to verify API key status
4. Check internet connectivity
5. Review `news.log` for error patterns

---

**Setup complete!** Your Daily Intelligence should now:
- Open automatically in new Chrome tabs
- Display AI-generated executive summaries
- Update automatically every morning at 6 AM
- Track your reading progress with expandable articles
