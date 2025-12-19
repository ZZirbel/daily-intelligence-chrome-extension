# ADR-002: Chrome Extension CSP-Compliant Architecture

**Status:** Accepted
**Date:** 2025-12-19

## Context

Chrome extensions using Manifest V3 enforce strict Content Security Policy (CSP) that prohibits inline JavaScript (`onclick`, `<script>` blocks). The dashboard needed interactive elements while remaining CSP-compliant.

## Decision

Adopt an **external script + event delegation** architecture:

1. **External JavaScript file** (`dashboard.js`) loaded via `<script src="...">`
2. **Event delegation** via single document-level click listener
3. **Data attributes** (`data-article-id`, `data-category`) instead of inline handlers
4. **ID-based binding** for static elements (`#reflectionTrigger`, `#nextInsightBtn`)

```javascript
// Single delegated listener handles all dynamic elements
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('more-articles-toggle')) {
        var category = e.target.getAttribute('data-category');
        toggleMoreArticles(category);
    }
    // ... other handlers
});
```

## Consequences

**Positive:**
- Full CSP compliance - no inline script violations
- Better performance - single listener vs many
- Cleaner HTML - no JavaScript in markup
- Easier testing - handlers are regular functions

**Negative:**
- More complex event routing logic
- Data attributes required for dynamic content
- Slightly more verbose HTML generation

## Alternatives Considered

1. **Unsafe-inline CSP exception** - Defeats security purpose
2. **Multiple addEventListener calls** - Memory overhead for dynamic content
3. **Framework (React/Vue)** - Overkill for single-page dashboard
