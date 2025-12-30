# ADR-005: API Key Security Strategy for Public Repository

**Status:** Accepted
**Date:** 2025-12-30

## Context

This Chrome extension requires a Groq API key for AI-powered features:
- Article relevance scoring
- Executive summary generation

The repository is public, meaning:
- Source code is visible to everyone
- Users fork the repo to use it
- API keys must NEVER be committed to version control

## Decision

Implement a **template file pattern** with strict gitignore rules:

### File Structure

```
├── config.example.js     # Template file (committed, safe)
├── config.js             # User's actual key (gitignored, never committed)
├── .env.example          # Python template (committed, safe)
├── .env                  # Python key (gitignored, never committed)
└── .gitignore            # Excludes sensitive files
```

### Template File (`config.example.js`)

```javascript
// Configuration for Daily Intelligence Extension
// SETUP: Copy this file to config.js and add your API key

var CONFIG = {
    GROQ_API_KEY: 'your_groq_api_key_here'
};
```

### Gitignore Rules

```gitignore
# Sensitive files - NEVER commit
config.js
.env
.env.local
.env.*.local
```

### Loading Strategy

```javascript
function loadApiKey() {
    if (typeof CONFIG !== 'undefined' && CONFIG.GROQ_API_KEY) {
        // Key loaded from config.js
        return CONFIG.GROQ_API_KEY;
    }
    return null; // Graceful degradation
}
```

### Security Measures

1. **DEBUG flag**: Console logging is disabled by default (`DEBUG = false`)
2. **Masked display**: Settings modal shows only `gsk_xxxx...xxxx` format
3. **No logging of key**: API key value is never written to console
4. **Graceful degradation**: Extension works without key (RSS only, no AI)

## Consequences

**Positive:**
- API keys never enter version control
- Clear setup instructions for forked repos
- Single source of truth for configuration
- Works for both extension (config.js) and Python (.env)

**Negative:**
- Users must manually create config.js (minor friction)
- No automatic key rotation mechanism
- Key stored in plain text on disk (acceptable for personal use)

**Security Verification Checklist:**
- [ ] `git status` never shows `config.js` or `.env`
- [ ] `git check-ignore config.js .env` confirms both are ignored
- [ ] No `gsk_` patterns in committed files (except examples)
- [ ] DEBUG flag is `false` in production

## Alternatives Considered

1. **Chrome Storage API**: More secure but requires user input on each install
2. **Environment Variables**: Not accessible to Chrome extensions
3. **Encrypted Config**: Overkill for personal API key, key still needed somewhere
4. **OAuth Flow**: Groq doesn't support OAuth for API access
5. **Prompt on First Use**: Poor UX, considered for fallback only

## For Repository Maintainers

When reviewing PRs, verify:
1. No `config.js` or `.env` files are included
2. No hardcoded API keys (search for `gsk_` pattern)
3. `.gitignore` changes don't remove sensitive file exclusions
