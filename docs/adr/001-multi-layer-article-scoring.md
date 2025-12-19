# ADR-001: Multi-Layer Article Scoring System

**Status:** Accepted
**Date:** 2025-12-19

## Context

The dashboard aggregates news from multiple RSS feeds across AI, Business, and Leadership categories. Users need a way to surface the most relevant and valuable articles without manually scanning dozens of items daily.

## Decision

Implement a WSJF-inspired (Weighted Shortest Job First) scoring system with three independent factors:

| Factor | Weight | Range | Rationale |
|--------|--------|-------|-----------|
| **AI Relevance** | 50% | 1-10 | Groq LLM scores strategic value for executive audience |
| **Source Authority** | 30% | 1-10 | Domain-based scoring (.edu=10, research=9, publications=7-8) |
| **Recency** | 20% | 1-10 | 10 for today, -1.5 per day, minimum 1 |

**Combined Score** = (AI × 0.5) + (Source × 0.3) + (Recency × 0.2)

## Consequences

**Positive:**
- Top 3 articles per category surface highest-value content
- Transparent scoring (badge visible on each article)
- Extensible - weights and factors can be tuned

**Negative:**
- AI scoring adds API latency (~1s per category)
- Source authority requires manual domain curation
- Batch scoring limits to 15 articles per API call

## Alternatives Considered

1. **Chronological only** - Simple but surfaces noise over signal
2. **Source authority only** - Misses relevance context
3. **User feedback loop** - Too complex for v1, consider for future
