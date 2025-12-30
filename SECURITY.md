# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please report it responsibly.

### How to Report

1. **Do NOT** create a public GitHub issue for security vulnerabilities
2. Email the maintainer directly or use GitHub's private vulnerability reporting feature
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### Response Timeline

- **Acknowledgment**: Within 48 hours
- **Assessment**: Severity determination within 7 days
- **Resolution**: Critical vulnerabilities within 14 days

---

## API Key Security

### Template File Pattern

This repository uses a **template file pattern** to protect API keys:

| File | Purpose | Committed? |
|------|---------|------------|
| `config.example.js` | Template for Chrome extension | Yes (safe) |
| `config.js` | Your actual API key | **No** (gitignored) |
| `.env.example` | Template for Python script | Yes (safe) |
| `.env` | Your actual API key | **No** (gitignored) |

### Verification

Run these commands to verify your keys are protected:

```bash
# Check that sensitive files are gitignored
git check-ignore config.js .env

# Verify they don't appear in git status
git status

# Search for accidentally committed keys
git log -p | grep -i "gsk_"
```

### If You Accidentally Commit an API Key

1. **Immediately rotate the key** at [console.groq.com/keys](https://console.groq.com/keys)
2. Remove from git history:
   ```bash
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch config.js .env" \
     --prune-empty --tag-name-filter cat -- --all
   git push origin --force --all
   ```
3. Update your local `config.js` with the new key

---

## Debug Logging

By default, debug logging is **disabled** (`DEBUG = false` in `dashboard.js`).

This prevents:
- API key presence/absence from being logged
- Configuration details from appearing in console
- Internal architecture information leakage

To enable for development:
```javascript
var DEBUG = true;  // Only for local development
```

**Never commit with `DEBUG = true`.**

---

## Chrome Extension Security

### Permissions

This extension requests minimal permissions:

```json
{
  "permissions": ["storage"],
  "host_permissions": [
    "https://api.groq.com/*",
    "https://*.techcrunch.com/*",
    // ... specific RSS feed domains only
  ]
}
```

**What this means:**
- ✅ Can store settings in Chrome storage
- ✅ Can fetch from listed RSS feeds and Groq API
- ❌ No access to browsing history
- ❌ No access to other websites
- ❌ No access to cookies or passwords
- ❌ No background processes

### Content Security

- **XSS Protection**: All RSS content is sanitized via `escapeHTML()`
- **URL Validation**: Links are validated before rendering (`safeURL()`)
- **No Inline Scripts**: All JavaScript is in external files
- **No eval()**: No dynamic code execution

---

## Data Privacy

### What Data Stays Local

| Data | Storage | Leaves Device? |
|------|---------|----------------|
| Reflections | localStorage | Never |
| Quiz progress | localStorage | Never |
| Seen articles | localStorage | Never |
| API key | config.js file | Only to Groq API |
| News cache | localStorage | Never |

### What Data is Sent Externally

| Destination | Data Sent | Purpose |
|-------------|-----------|---------|
| RSS Feeds | None (GET request) | Fetch articles |
| Groq API | Article titles, descriptions | Generate summaries |

### Groq API Privacy

- Article titles and descriptions are sent for summarization
- No personal data is sent
- See [Groq's Privacy Policy](https://groq.com/privacy-policy/)

---

## Third-Party Dependencies

### JavaScript (Frontend)
- **No external libraries** - Pure vanilla JavaScript
- Google Fonts loaded from CDN (display only)

### Python (Optional)
- `feedparser` - RSS parsing
- `groq` - Groq API client
- `python-dotenv` - Environment variable loading

**Keep dependencies updated:**
```bash
pip install --upgrade -r requirements.txt
```

---

## Security Checklist for Contributors

Before submitting a PR:

- [ ] No `config.js` or `.env` files included
- [ ] No hardcoded API keys (search for `gsk_`)
- [ ] `DEBUG` flag is `false`
- [ ] No new `eval()` or `innerHTML` with unsanitized content
- [ ] New external domains added to `host_permissions` are justified
- [ ] `.gitignore` still excludes sensitive files

---

## Security Features Summary

| Feature | Implementation |
|---------|---------------|
| API Key Protection | Template file pattern + gitignore |
| XSS Prevention | `escapeHTML()` + `safeURL()` |
| Debug Info Leakage | `DEBUG = false` by default |
| Minimal Permissions | Only `storage` + specific hosts |
| No Tracking | No analytics, no external logging |
| Local Data | All user data stays in localStorage |
