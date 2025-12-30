# ADR-004: Live RSS Fetching Architecture

**Status:** Accepted
**Date:** 2025-12-30
**Supersedes:** Previous architecture requiring external Python script

## Context

The original architecture required users to:
1. Run a Python script (`news-summarizer.py`) manually or via scheduled task
2. The script would fetch RSS feeds, call Groq API, and generate `summary.json`
3. The Chrome extension would read from the static `summary.json` file

This created friction:
- Users had to set up Python environment
- Required scheduled tasks (Task Scheduler, cron, launchd)
- News was only as fresh as the last script run
- Two separate configurations needed (`.env` for Python, nothing for extension)

## Decision

Move all RSS fetching and AI summarization directly into the Chrome extension JavaScript:

### New Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Chrome Extension                          │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────┐  │
│  │  RSS Feeds  │───>│  JS Parser  │───>│  Groq API       │  │
│  │  (Direct)   │    │  (DOMParser)│    │  (fetch)        │  │
│  └─────────────┘    └─────────────┘    └─────────────────┘  │
│         │                                      │             │
│         v                                      v             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              localStorage Cache                      │    │
│  │              (12-hour expiration)                    │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### Key Components

1. **RSS Fetching (`fetchRSSFeed`)**: Uses `fetch()` with cache-busting query parameters
2. **XML Parsing (`parseRSSXml`)**: Uses browser's native `DOMParser` for RSS/Atom parsing
3. **AI Scoring (`getAIRelevanceScores`)**: Batch scoring via Groq API (15 articles per call)
4. **Summary Generation (`generateSummary`)**: Per-category executive summaries
5. **Caching**: 12-hour localStorage cache to avoid re-fetching on every new tab

### Manifest Permissions

```json
{
  "permissions": ["storage"],
  "host_permissions": [
    "https://api.groq.com/*",
    "https://*.techcrunch.com/*",
    // ... other RSS feed domains
  ]
}
```

## Consequences

**Positive:**
- Zero Python dependency for basic usage
- News is fetched live when cache expires (every 12 hours)
- Single configuration file (`config.js`)
- Works on any platform without additional setup
- Manual refresh button fetches truly fresh content

**Negative:**
- Extension now requires explicit host permissions for each RSS domain
- API key must be stored in extension-accessible file (`config.js`)
- Slightly larger JavaScript bundle (~400 lines added)
- CORS restrictions may block some RSS feeds (mitigated by choosing CORS-friendly sources)

**Migration:**
- Python script (`news-summarizer.py`) remains available for offline/batch processing
- Users with existing `.env` files can continue using Python approach
- New users only need `config.js`

## Alternatives Considered

1. **Background Service Worker**: Would allow scheduled fetching but adds complexity
2. **Proxy Server**: Would solve CORS but requires server infrastructure
3. **Keep Python-only**: Rejected due to setup friction for non-technical users
4. **Browser Extension with Native Messaging**: Overkill for this use case
