# Daily Intelligence

Your personal intelligence hub for leadership development, continuous learning, and staying informed. A Chrome extension designed for executives leading enterprise technology transformation.

## Features

### Daily Insight
- **60 curated leadership insights** across 9 categories:
  - Visionary Leadership (12), Empowering Leadership (12), Decisive Action (10)
  - Coaching & Development (8), Strategic Execution (6), Technical Leadership (5)
  - Change Leadership (3), Team Dynamics (2), Communication Excellence (2)
- Sourced from top leadership books and Harvard Business Review articles
- No-repeat rotation until all insights have been seen

### Microlearning with Spaced Repetition
- **100 microlearnings** across 17 technical and strategic categories:
  - AI/ML Fundamentals, Cloud Architecture, Agile/DevOps, System Design
  - Technology Strategy, Business Case Building, ROI Analysis
  - Digital Transformation, Change Management, Innovation Frameworks
  - Team Psychology, Strategic Thinking, Communication, Decision-Making
  - Organizational Design, Knowledge Graphs, Software Development
- Interactive quizzes with instant feedback
- Progress tracking (New → Learning → Reviewing → Mastered)
- "Brush Up" links for incorrect answers

### AI-Powered News Summaries
- **Live RSS fetching** from curated news sources (AI, Business, Leadership)
- AI-generated executive summaries via Groq API
- Multi-factor article scoring (relevance, source authority, recency)
- 12-hour intelligent caching

### Daily Reflection
- **52 deep introspective questions** across 8 themes:
  - Personal Evolution (10), Leadership Blind Spots (10), Team Dynamics (8)
  - Decisive Action (6), Vulnerability (6), Growth Edges (5)
  - Purpose (4), Systems Thinking (3)
- Save reflections with timestamps
- Export all reflections as Markdown

---

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/daily-intelligence-chrome-extension.git
cd daily-intelligence-chrome-extension
```

### 2. Configure API Key

```bash
# Copy the template
cp config.example.js config.js

# Edit config.js and add your Groq API key
# Get a free key at: https://console.groq.com/keys
```

Your `config.js` should look like:
```javascript
var CONFIG = {
    GROQ_API_KEY: 'gsk_your_actual_key_here'
};
```

> **Important:** `config.js` is gitignored and will never be committed.

### 3. Install the Extension

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top right)
3. Click **Load unpacked**
4. Select the `daily-intelligence-chrome-extension` folder
5. Open a new tab to see your dashboard

---

## Architecture

This extension fetches RSS feeds and generates AI summaries directly in the browser:

```
┌─────────────────────────────────────────────────────────────┐
│                    Chrome Extension                          │
│                                                              │
│   RSS Feeds ──> JavaScript Parser ──> Groq API ──> Display  │
│       │                                    │                 │
│       └──────── localStorage Cache ────────┘                 │
│                 (12-hour expiration)                         │
└─────────────────────────────────────────────────────────────┘
```

**No Python required** for basic usage. The extension handles everything.

---

## Configuration

### Required: `config.js`

Contains your Groq API key for AI features:

```javascript
var CONFIG = {
    GROQ_API_KEY: 'gsk_your_key_here'
};
```

Without an API key, the extension still works but without AI summaries.

### Optional: `.env` (for Python script)

If you want to use the Python summarizer for offline/batch processing:

```
GROQ_API_KEY=gsk_your_key_here
```

---

## Project Structure

```
daily-intelligence-chrome-extension/
├── daily-intelligence.html   # Main dashboard UI
├── dashboard.js              # Core JavaScript logic
├── config.example.js         # API key template (copy to config.js)
├── config.js                 # Your API key (gitignored)
├── manifest.json             # Chrome extension manifest
├── content/                  # Modular content files
│   ├── insights-content.js       # 60 leadership insights
│   ├── microlearnings-content.js # 100 microlearnings with quizzes
│   └── reflections-content.js    # 52 daily reflections
├── news-summarizer.py        # Optional Python script
├── .env.example              # Python API key template
├── .gitignore                # Excludes sensitive files
├── docs/
│   └── adr/                  # Architecture Decision Records
│       ├── 001-multi-layer-article-scoring.md
│       ├── 002-chrome-extension-csp-architecture.md
│       ├── 003-rss-feed-source-strategy.md
│       ├── 004-live-rss-fetching-architecture.md
│       ├── 005-api-key-security-strategy.md
│       └── 006-modular-content-architecture.md
└── icons/                    # Extension icons
```

---

## News Sources

The extension fetches from these RSS feeds:

**AI News:**
- TechCrunch AI
- MIT Technology Review
- The Verge AI
- MIT News AI
- OpenAI Blog

**Business News:**
- Wall Street Journal Business
- The Economist Business
- Quartz

**Leadership News:**
- Fast Company Leadership
- Seth's Blog
- Leadership Freak

---

## Troubleshooting

### "Configure API Key" button appears instead of summaries

Your `config.js` file is missing or doesn't have a valid API key.

**Solution:**
```bash
cp config.example.js config.js
# Edit config.js with your Groq API key
```

### News sections show "Fetching live news..." but never load

CORS issues or network problems.

**Solution:**
1. Check browser console (F12) for errors
2. Verify internet connection
3. Some corporate networks block RSS feeds

### Extension not appearing after installation

**Solution:**
1. Ensure all files are in the folder (especially `manifest.json`)
2. Check `chrome://extensions/` for error messages
3. Click the refresh icon on the extension card

### Need to update the extension after code changes

1. Go to `chrome://extensions/`
2. Find "Daily Intelligence"
3. Click the refresh icon (🔄)

---

## Security

- **API keys are never committed** - `config.js` and `.env` are gitignored
- **Debug logging disabled** - No sensitive info in console by default
- **Minimal permissions** - Only `storage` and specific host permissions
- **XSS protection** - All external content is sanitized

See [SECURITY.md](SECURITY.md) for full security policy.

---

## Development

### Debug Mode

Enable verbose logging by editing `dashboard.js`:

```javascript
var DEBUG = true;  // Set to true for development
```

### Adding New RSS Sources

Edit `RSS_FEED_SOURCES` in `dashboard.js`:

```javascript
var RSS_FEED_SOURCES = {
    ai_news: [
        'https://your-new-feed.com/rss',
        // ...
    ],
};
```

Note: New domains must be added to `host_permissions` in `manifest.json`.

### Architecture Decisions

See the [docs/adr](docs/adr/) folder for detailed architecture decision records.

---

## Optional: Python Script

The Python summarizer (`news-summarizer.py`) is available for:
- Offline batch processing
- Scheduled updates via Task Scheduler/cron
- Generating `summary.json` for static hosting

See [SETUP.md](SETUP.md) for Python setup instructions.

---

## License

This project is provided as-is for personal use. Feel free to modify and customize.

---

## Acknowledgments

- Leadership content inspired by Simon Sinek, Brené Brown, and HBR
- News summaries powered by Groq's Llama 3.3 70B model
- Multi-layer scoring inspired by WSJF methodology

---

*Last updated: December 30, 2025*
