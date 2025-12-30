# ADR-006: Modular Content Architecture

**Status:** Accepted
**Date:** 2025-12-30

## Context

The Daily Intelligence extension requires substantial static content for three sections:
- **Leadership Insights**: 60 curated insights across 9 categories
- **Microlearnings**: 100 learning modules with quizzes across 17 categories
- **Daily Reflections**: 52 introspective questions across 8 themes

Initially, this content was embedded directly in `dashboard.js`. As the content library grew to 212 total items with complex nested structures (quizzes, sources, themes), this approach created problems:

1. **File size**: `dashboard.js` became unwieldy (2000+ lines mixing logic and data)
2. **Maintainability**: Content updates required navigating through application logic
3. **Context limits**: AI-assisted content generation hit token limits with large single files
4. **Separation of concerns**: Business logic mixed with static data

## Decision

Separate static content into dedicated JavaScript files under a `content/` directory:

### File Structure

```
content/
├── insights-content.js       # 60 leadership insights (INSIGHTS array)
├── microlearnings-content.js # 100 microlearnings (MICROLEARNINGS array)
└── reflections-content.js    # 52 reflections (REFLECTIONS array)
```

### Loading Strategy

Content files are loaded via `<script>` tags in `daily-intelligence.html` **before** `dashboard.js`:

```html
<script src="config.js"></script>
<script src="content/insights-content.js"></script>
<script src="content/microlearnings-content.js"></script>
<script src="content/reflections-content.js"></script>
<script src="dashboard.js"></script>
```

This ensures global arrays (`INSIGHTS`, `MICROLEARNINGS`, `REFLECTIONS`) are defined before `dashboard.js` references them.

### Content File Format

Each content file defines a single global constant array:

```javascript
// insights-content.js
const INSIGHTS = [
    {
        id: 1,
        insight: "...",
        category: "Visionary Leadership",
        sources: [
            { title: "Source Name", url: "https://..." }
        ]
    },
    // ...
];
```

```javascript
// microlearnings-content.js
const MICROLEARNINGS = [
    {
        id: 1,
        topic: "...",
        category: "AI/ML Fundamentals",
        content: "...",
        sources: [...],
        quiz: {
            question: "...",
            options: ["...", "...", "...", "..."],
            correct: 0,
            explanation: "...",
            brushUpLink: { title: "...", url: "..." }
        },
        difficulty: "intermediate"
    },
    // ...
];
```

```javascript
// reflections-content.js
const REFLECTIONS = [
    { id: 1, question: "...", theme: "Personal Evolution" },
    // ...
];
```

## Content Distribution

### Leadership Insights (60 total)
| Category | Count |
|----------|-------|
| Visionary Leadership | 12 |
| Empowering Leadership | 12 |
| Decisive Action | 10 |
| Coaching & Development | 8 |
| Strategic Execution | 6 |
| Technical Leadership | 5 |
| Change Leadership | 3 |
| Team Dynamics | 2 |
| Communication Excellence | 2 |

### Microlearnings (100 total)
| Category | Count |
|----------|-------|
| Knowledge Graphs | 10 |
| AI/ML Fundamentals | 8 |
| Cloud Architecture | 7 |
| Agile/DevOps | 6 |
| System Design | 6 |
| Technology Strategy | 6 |
| Business Case Building | 6 |
| ROI Analysis | 6 |
| Digital Transformation | 5 |
| Change Management | 5 |
| Innovation Frameworks | 5 |
| Team Psychology | 5 |
| Strategic Thinking | 5 |
| Communication | 5 |
| Decision-Making | 5 |
| Organizational Design | 5 |
| Software Development | 5 |

### Daily Reflections (52 total)
| Theme | Count |
|-------|-------|
| Personal Evolution | 10 |
| Leadership Blind Spots | 10 |
| Team Dynamics | 8 |
| Decisive Action | 6 |
| Vulnerability | 6 |
| Growth Edges | 5 |
| Purpose | 4 |
| Systems Thinking | 3 |

## Consequences

**Positive:**
- **Cleaner separation**: `dashboard.js` contains only application logic (~1400 lines vs 2000+)
- **Easier content updates**: Edit content without touching business logic
- **Batch-friendly**: Content files can be regenerated independently
- **Better tooling**: AI assistants can work with smaller, focused files
- **Parallel loading**: Browser can parse content files in parallel

**Negative:**
- **More HTTP requests**: 4 script files instead of 2 (negligible for local extension)
- **Global namespace**: Content arrays are global variables (acceptable for Chrome extension scope)
- **Load order dependency**: Scripts must be ordered correctly in HTML

**Neutral:**
- **No bundling**: This extension doesn't use a build system; direct script loading is appropriate for its simplicity

## Alternatives Considered

1. **ES6 Modules**: Cleaner imports but requires module bundler or native ESM support complicating the extension
2. **JSON files with fetch()**: Adds async complexity; script tags are simpler
3. **Single merged content file**: Still creates one large file to manage
4. **IndexedDB storage**: Overkill for static read-only content
5. **Keep in dashboard.js**: Rejected due to maintainability issues at scale

## Future Considerations

- Content could be externalized to a CDN if the extension becomes distributed
- A build step could bundle content for production if performance becomes critical
- Content versioning could be added for cache invalidation
