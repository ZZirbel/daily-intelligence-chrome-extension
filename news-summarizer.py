#!/usr/bin/env python3
"""
Chrome Daily Dashboard - News Summarizer
Fetches RSS feeds and generates executive summaries with multi-layer article scoring.

Scoring System (WSJF-style):
- Groq AI Relevance Score (1-10): How relevant/important is this article?
- Source Authority Score (1-10): Is this from a trusted, authoritative source?
- Recency Score (1-10): How recent is the article?
- Combined Score = (AI_Score * 0.5) + (Source_Score * 0.3) + (Recency_Score * 0.2)
"""

import os
import json
import logging
import re
from datetime import datetime, timezone
from typing import Dict, List, Optional
from urllib.parse import urlparse
import feedparser
from groq import Groq
from dotenv import load_dotenv

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# RSS Feed Sources
FEED_SOURCES = {
    'ai_news': [
        'https://techcrunch.com/category/artificial-intelligence/feed/',
        'https://www.technologyreview.com/feed',
        'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml',
        'https://news.mit.edu/rss/topic/artificial-intelligence2',
        'https://blog.google/technology/ai/rss/',
        'https://openai.com/blog/rss.xml',
    ],
    'business_news': [
        'https://feeds.content.dowjones.io/public/rss/WSJcomUSBusiness',
        'https://www.economist.com/business/rss.xml',
        'https://sloanreview.mit.edu/feed/',
        'https://knowledge.wharton.upenn.edu/feed/',
        'https://qz.com/feed',
    ],
    'leadership_news': [
        'https://www.fastcompany.com/leadership/rss',
        'https://seths.blog/feed/',
        'https://www.lollydaskal.com/feed/',
        'https://leadershipfreak.blog/feed/',
        'https://michaelhyatt.com/feed/',
        'https://simonsinek.com/feed/',
    ]
}

# Source Authority Scoring
# Higher scores for educational institutions, research organizations, and industry leaders
SOURCE_AUTHORITY_SCORES = {
    # Educational & Research (Score: 9-10)
    '.edu': 10,
    '.gov': 10,
    'arxiv.org': 10,
    'nature.com': 10,
    'science.org': 10,
    'ieee.org': 9,
    'acm.org': 9,

    # Top-tier Industry Research & Consulting (Score: 8-9)
    'mckinsey.com': 9,
    'hbr.org': 9,
    'mit.edu': 10,
    'stanford.edu': 10,
    'sloanreview.mit.edu': 10,
    'knowledge.wharton.upenn.edu': 10,
    'technologyreview.com': 9,
    'deepmind.com': 9,
    'openai.com': 9,
    'anthropic.com': 9,
    'research.google': 9,
    'blog.google': 9,
    'ai.meta.com': 8,
    'huggingface.co': 8,

    # Respected Tech Publications (Score: 7-8)
    'techcrunch.com': 8,
    'wired.com': 8,
    'arstechnica.com': 8,
    'theverge.com': 7,
    'zdnet.com': 7,
    'venturebeat.com': 7,

    # Business Publications (Score: 7-8)
    'wsj.com': 8,
    'dowjones.io': 8,
    'ft.com': 8,
    'bloomberg.com': 8,
    'economist.com': 8,
    'qz.com': 7,
    'forbes.com': 7,
    'fortune.com': 7,
    'businessinsider.com': 6,

    # General Tech/Business (Score: 5-6)
    'fastcompany.com': 6,
    'inc.com': 6,
    'entrepreneur.com': 5,
    'strategy-business.com': 7,

    # Leadership Thought Leaders (Score: 7-8)
    'seths.blog': 8,
    'simonsinek.com': 8,
    'michaelhyatt.com': 7,
    'lollydaskal.com': 7,
    'leadershipfreak.blog': 7,
}

# Default score for unknown sources
DEFAULT_SOURCE_SCORE = 5


class NewsSummarizer:
    def __init__(self, api_key: str):
        """Initialize the news summarizer with Groq API key"""
        self.client = Groq(api_key=api_key)
        self.model = "llama-3.3-70b-versatile"

    def fetch_feed(self, url: str, max_entries: int = 10) -> List[Dict]:
        """Fetch and parse an RSS feed"""
        try:
            feed = feedparser.parse(url)
            articles = []

            for entry in feed.entries[:max_entries]:
                articles.append({
                    'title': entry.get('title', ''),
                    'link': entry.get('link', ''),
                    'description': entry.get('summary', entry.get('description', '')),
                    'published': entry.get('published', ''),
                    'source': feed.feed.get('title', url)
                })

            logger.info(f"Fetched {len(articles)} articles from {url}")
            return articles

        except Exception as e:
            logger.error(f"Error fetching feed {url}: {e}")
            return []

    def fetch_category_articles(self, category: str) -> List[Dict]:
        """Fetch articles from all feeds in a category"""
        all_articles = []

        for feed_url in FEED_SOURCES.get(category, []):
            articles = self.fetch_feed(feed_url)
            all_articles.extend(articles)

        # Remove duplicates based on title
        seen_titles = set()
        unique_articles = []
        for article in all_articles:
            title_lower = article['title'].lower().strip()
            if title_lower not in seen_titles:
                seen_titles.add(title_lower)
                unique_articles.append(article)

        logger.info(f"Total unique articles for {category}: {len(unique_articles)}")
        return unique_articles

    def get_source_score(self, article: Dict) -> float:
        """Calculate source authority score (1-10)"""
        link = article.get('link', '')
        if not link:
            return DEFAULT_SOURCE_SCORE

        try:
            parsed = urlparse(link)
            domain = parsed.netloc.lower()

            # Remove www. prefix
            if domain.startswith('www.'):
                domain = domain[4:]

            # Check exact domain matches first
            if domain in SOURCE_AUTHORITY_SCORES:
                return SOURCE_AUTHORITY_SCORES[domain]

            # Check for .edu and .gov TLDs
            if domain.endswith('.edu'):
                return SOURCE_AUTHORITY_SCORES['.edu']
            if domain.endswith('.gov'):
                return SOURCE_AUTHORITY_SCORES['.gov']

            # Check if domain contains any known source
            for source, score in SOURCE_AUTHORITY_SCORES.items():
                if source in domain:
                    return score

            return DEFAULT_SOURCE_SCORE

        except Exception:
            return DEFAULT_SOURCE_SCORE

    def get_recency_score(self, article: Dict) -> float:
        """Calculate recency score (1-10) based on days old"""
        published = article.get('published', '')
        if not published:
            return 5.0  # Default score for unknown dates

        try:
            # Try to parse the date
            from email.utils import parsedate_to_datetime
            pub_date = parsedate_to_datetime(published)

            # Calculate days old
            now = datetime.now(timezone.utc)
            delta = now - pub_date
            days_old = delta.days

            # Score: 10 for today, decreasing by 1.5 per day, minimum 1
            score = max(1.0, 10.0 - (days_old * 1.5))
            return round(score, 1)

        except Exception:
            return 5.0  # Default for unparseable dates

    def get_ai_relevance_scores(self, category: str, articles: List[Dict]) -> Dict[str, float]:
        """Use Groq to score article relevance (batch scoring for efficiency)"""
        if not articles:
            return {}

        # Prepare article list for scoring
        article_list = "\n".join([
            f"{i+1}. {art['title']}"
            for i, art in enumerate(articles[:15])  # Limit to 15 for token efficiency
        ])

        category_context = {
            'ai_news': 'AI, machine learning, and technology innovation',
            'business_news': 'business strategy, digital transformation, and enterprise operations',
            'leadership_news': 'leadership development, management practices, and organizational culture'
        }

        prompt = f"""Rate each article's relevance and importance for an executive focused on {category_context.get(category, 'business and technology')}.

Score each article from 1-10 where:
- 10 = Must-read, highly actionable strategic insight
- 7-9 = Important trend or valuable information
- 4-6 = Moderately interesting, nice to know
- 1-3 = Low relevance or mostly noise

Articles:
{article_list}

Respond ONLY with a JSON object mapping article numbers to scores, like:
{{"1": 8, "2": 6, "3": 9, ...}}

Be critical - not everything is a 10. Focus on actionable insights and strategic value."""

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": prompt}],
                temperature=0.2,
                max_tokens=200
            )

            content = response.choices[0].message.content.strip()

            # Extract JSON from response
            json_match = re.search(r'\{[^}]+\}', content)
            if json_match:
                scores_dict = json.loads(json_match.group())

                # Map back to article titles
                result = {}
                for i, art in enumerate(articles[:15]):
                    key = str(i + 1)
                    if key in scores_dict:
                        result[art['title']] = float(scores_dict[key])
                    else:
                        result[art['title']] = 5.0  # Default

                logger.info(f"Generated AI relevance scores for {category}")
                return result
            else:
                logger.warning(f"Could not parse AI scores for {category}")
                return {art['title']: 5.0 for art in articles}

        except Exception as e:
            logger.error(f"Error getting AI scores for {category}: {e}")
            return {art['title']: 5.0 for art in articles}

    def calculate_combined_score(self, ai_score: float, source_score: float, recency_score: float) -> float:
        """Calculate WSJF-style combined score"""
        # Weights: AI relevance 50%, Source authority 30%, Recency 20%
        combined = (ai_score * 0.5) + (source_score * 0.3) + (recency_score * 0.2)
        return round(combined, 2)

    def score_and_sort_articles(self, category: str, articles: List[Dict]) -> List[Dict]:
        """Score all articles and sort by combined score"""
        if not articles:
            return []

        # Get AI relevance scores (batch call)
        ai_scores = self.get_ai_relevance_scores(category, articles)

        # Calculate all scores for each article
        for article in articles:
            ai_score = ai_scores.get(article['title'], 5.0)
            source_score = self.get_source_score(article)
            recency_score = self.get_recency_score(article)
            combined_score = self.calculate_combined_score(ai_score, source_score, recency_score)

            article['scores'] = {
                'ai_relevance': ai_score,
                'source_authority': source_score,
                'recency': recency_score,
                'combined': combined_score
            }

        # Sort by combined score (descending)
        articles.sort(key=lambda x: x.get('scores', {}).get('combined', 0), reverse=True)

        return articles

    def generate_summary(self, category: str, articles: List[Dict]) -> str:
        """Generate an executive summary using Groq API"""
        if not articles:
            return "No articles available for summary."

        # Use top-scored articles for summary
        top_articles = articles[:8]

        article_text = "\n\n".join([
            f"Title: {art['title']}\n"
            f"Description: {art['description'][:200]}..."
            for art in top_articles
        ])

        category_names = {
            'ai_news': 'AI and Machine Learning',
            'business_news': 'Business Operations and Strategy',
            'leadership_news': 'Leadership and Management'
        }

        prompt = f"""You are a concise executive briefing assistant.

Summarize these {category_names.get(category, category)} articles in 3-4 sentences.
Focus on: key trends, actionable insights, and strategic implications for an executive leading enterprise technology transformation.

Articles:
{article_text}

Provide a brief, high-value summary:"""

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": prompt}],
                temperature=0.3,
                max_tokens=300
            )

            summary = response.choices[0].message.content.strip()
            logger.info(f"Generated summary for {category}")
            return summary

        except Exception as e:
            logger.error(f"Error generating summary for {category}: {e}")
            return f"Error generating summary: {str(e)}"

    def run(self) -> Dict:
        """Run the complete news summarization process with scoring"""
        logger.info("Starting news summarization with article scoring...")

        results = {
            'generated_at': datetime.now().isoformat(),
            'summaries': {}
        }

        for category in FEED_SOURCES.keys():
            logger.info(f"Processing category: {category}")

            # Fetch articles
            articles = self.fetch_category_articles(category)

            # Score and sort articles
            scored_articles = self.score_and_sort_articles(category, articles)

            # Generate summary (uses top articles)
            summary = self.generate_summary(category, scored_articles)

            # Store results
            results['summaries'][category] = {
                'summary': summary,
                'article_count': len(scored_articles),
                'sources': list(set(art['source'] for art in scored_articles)),
                'articles': scored_articles
            }

        logger.info("News summarization complete!")
        return results


def main():
    """Main execution function"""
    # Check for API key
    api_key = os.getenv('GROQ_API_KEY')
    if not api_key:
        logger.error("GROQ_API_KEY not found in environment variables!")
        logger.error("Please create a .env file with: GROQ_API_KEY=your_key_here")
        return

    # Initialize summarizer
    summarizer = NewsSummarizer(api_key)

    # Run summarization
    results = summarizer.run()

    # Save to JSON file
    output_file = 'summary.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)

    logger.info(f"Results saved to {output_file}")
    logger.info(f"Generated at: {results['generated_at']}")

    # Print summaries with top articles
    print("\n" + "="*70)
    print("EXECUTIVE SUMMARIES WITH SCORED ARTICLES")
    print("="*70 + "\n")

    for category, data in results['summaries'].items():
        print(f"\n{category.replace('_', ' ').upper()}")
        print("-" * 70)
        print(f"Total Articles: {data['article_count']}")
        print(f"Sources: {', '.join(data['sources'])}")
        print(f"\nSummary:\n{data['summary']}")

        print(f"\nTop 5 Articles (by combined score):")
        for i, art in enumerate(data['articles'][:5], 1):
            scores = art.get('scores', {})
            print(f"  {i}. [{scores.get('combined', 0):.1f}] {art['title'][:60]}...")
            print(f"      AI:{scores.get('ai_relevance', 0):.0f} | Source:{scores.get('source_authority', 0):.0f} | Recency:{scores.get('recency', 0):.0f}")
        print()


if __name__ == "__main__":
    main()
