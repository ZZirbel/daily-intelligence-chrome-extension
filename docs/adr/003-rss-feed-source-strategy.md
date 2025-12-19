# ADR-003: RSS Feed Source Strategy

**Status:** Accepted
**Date:** 2025-12-19

## Context

Many high-profile publications (HBR, McKinsey) block or throttle RSS access. The dashboard needs reliable, high-quality content sources that remain accessible.

## Decision

Curate RSS feeds prioritizing **accessibility and authority**:

| Category | Primary Sources | Authority Score |
|----------|-----------------|-----------------|
| **AI News** | TechCrunch, MIT Tech Review, The Verge, MIT News, Google AI Blog, OpenAI Blog | 8-10 |
| **Business** | WSJ (Dow Jones), The Economist, MIT Sloan Review, Wharton, Quartz | 7-10 |
| **Leadership** | Fast Company, Seth Godin, Simon Sinek, Michael Hyatt, Leadership Freak | 6-8 |

**Selection Criteria:**
1. Feed must return >0 articles consistently
2. Prefer `.edu` and research institutions
3. Include thought leaders with active blogs
4. Avoid paywalled or rate-limited feeds

## Consequences

**Positive:**
- 50+ articles per category (vs 0 with blocked feeds)
- Mix of institutional and practitioner perspectives
- Reliable daily content generation

**Negative:**
- Missing some premium sources (full HBR, FT)
- Thought leader blogs may have lower update frequency
- Requires periodic feed health monitoring

## Feed Health Check

Run periodically to verify feeds:
```python
python -c "import feedparser; print(len(feedparser.parse('URL').entries))"
```
