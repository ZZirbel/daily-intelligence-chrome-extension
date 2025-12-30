# Daily Intelligence - Setup Guide

Complete setup instructions for the Daily Intelligence Chrome Extension.

---

## Quick Setup (5 minutes)

### Step 1: Get a Groq API Key

1. Visit [https://console.groq.com/](https://console.groq.com/)
2. Sign up for a free account
3. Go to **API Keys** → **Create API Key**
4. Copy the key (starts with `gsk_`)

> **Free tier includes:** 30 requests/minute, 14,400 requests/day

### Step 2: Configure the Extension

```bash
# Navigate to the extension folder
cd daily-intelligence-chrome-extension

# Copy the template file
cp config.example.js config.js
```

Edit `config.js` with your API key:

```javascript
var CONFIG = {
    GROQ_API_KEY: 'gsk_your_actual_key_here'
};
```

### Step 3: Install in Chrome

1. Open `chrome://extensions/`
2. Enable **Developer mode** (top right toggle)
3. Click **Load unpacked**
4. Select the `daily-intelligence-chrome-extension` folder
5. Open a new tab - you should see the dashboard!

---

## Verification Checklist

After setup, verify everything works:

- [ ] New tab shows the Daily Intelligence dashboard
- [ ] "Fetching live news from RSS feeds..." appears briefly
- [ ] Executive summaries appear in news sections
- [ ] No "Configure API Key" buttons visible
- [ ] Console (F12) shows no errors

---

## File Structure

```
daily-intelligence-chrome-extension/
├── config.example.js    # Template (copy this)
├── config.js            # Your API key (gitignored)
├── daily-intelligence.html
├── dashboard.js
├── manifest.json
└── icons/
```

**Important:** `config.js` is gitignored and will never be committed.

---

## Optional: Python Script Setup

The extension works without Python. However, if you want offline batch processing:

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Configure Environment

```bash
cp .env.example .env
# Edit .env with your API key
```

### Run Manually

```bash
python news-summarizer.py
```

### Automate with Task Scheduler (Windows)

1. Create `run-summarizer.bat`:
   ```batch
   @echo off
   cd /d "C:\path\to\daily-intelligence-chrome-extension"
   python news-summarizer.py >> news.log 2>&1
   ```

2. Open Task Scheduler → Create Task
3. Set trigger: Daily at 6:00 AM
4. Set action: Run `run-summarizer.bat`

### Automate with cron (Mac/Linux)

```bash
crontab -e
# Add this line:
0 6 * * * cd ~/daily-intelligence-chrome-extension && python3 news-summarizer.py >> news.log 2>&1
```

---

## Troubleshooting

### "Configure API Key" button appears

**Cause:** `config.js` is missing or has invalid key

**Fix:**
```bash
cp config.example.js config.js
# Edit config.js with your Groq API key
# Reload extension in chrome://extensions/
```

### News never loads

**Cause:** Network issues or CORS restrictions

**Fix:**
1. Check browser console (F12) for errors
2. Verify internet connection
3. Try reloading the extension

### Extension shows errors on install

**Cause:** Missing files or invalid manifest

**Fix:**
1. Ensure all files are present (especially `manifest.json`)
2. Check for JSON syntax errors
3. Verify icon files exist in `icons/` folder

### API Key errors

**Cause:** Invalid or expired key

**Fix:**
1. Check key at [console.groq.com/keys](https://console.groq.com/keys)
2. Verify no extra spaces in `config.js`
3. Ensure key starts with `gsk_`

---

## Updating the Extension

After making changes:

1. Go to `chrome://extensions/`
2. Find "Daily Intelligence"
3. Click the refresh icon (🔄)

---

## Security Notes

- **Never commit `config.js`** - it's gitignored for your protection
- **API key is only sent to Groq API** - nowhere else
- **Debug mode is off by default** - no sensitive logging

See [SECURITY.md](SECURITY.md) for full security policy.

---

## Getting Help

1. Check the [README.md](README.md) for common issues
2. Review browser console (F12) for JavaScript errors
3. Verify your API key works at [console.groq.com](https://console.groq.com/)

---

*Last updated: December 30, 2025*
