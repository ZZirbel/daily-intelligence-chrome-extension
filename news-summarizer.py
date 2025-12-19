#!/usr/bin/env python3
"""
AI Daily Dashboard - News Summarizer
Fetches RSS feeds and generates executive summaries using Groq's Llama 3.1 70B model
"""

import os
import json
import logging
from datetime import datetime
from typing import Dict, List
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
    ],
    'business_news': [
        'https://hbr.org/feed',
        'https://www.mckinsey.com/featured-insights/rss',
        'https://www.strategy-business.com/rss',
    ],
    'leadership_news': [
        'https://hbr.org/topic/leadership/feed',
        'https://www.fastcompany.com/leadership/rss',
        'https://www.inc.com/rss/leadership.xml',
    ]
}


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
        
        # Sort by most recent and limit to top 10
        all_articles = sorted(
            all_articles, 
            key=lambda x: x.get('published', ''), 
            reverse=True
        )[:10]
        
        logger.info(f"Total articles for {category}: {len(all_articles)}")
        return all_articles
    
    def generate_summary(self, category: str, articles: List[Dict]) -> str:
        """Generate an executive summary using Groq API"""
        if not articles:
            return "No articles available for summary."
        
        # Prepare article text for summarization
        article_text = "\n\n".join([
            f"Title: {art['title']}\n"
            f"Description: {art['description'][:200]}..."
            for art in articles[:8]  # Limit to avoid token limits
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
        """Run the complete news summarization process"""
        logger.info("Starting news summarization...")
        
        results = {
            'generated_at': datetime.now().isoformat(),
            'summaries': {}
        }
        
        for category in FEED_SOURCES.keys():
            logger.info(f"Processing category: {category}")
            
            # Fetch articles
            articles = self.fetch_category_articles(category)
            
            # Generate summary
            summary = self.generate_summary(category, articles)
            
            # Store results
            results['summaries'][category] = {
                'summary': summary,
                'article_count': len(articles),
                'sources': list(set(art['source'] for art in articles)),
                'articles': articles
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
    
    # Print summaries
    print("\n" + "="*70)
    print("EXECUTIVE SUMMARIES")
    print("="*70 + "\n")
    
    for category, data in results['summaries'].items():
        print(f"\n{category.replace('_', ' ').title()}")
        print("-" * 70)
        print(f"Articles: {data['article_count']}")
        print(f"Sources: {', '.join(data['sources'])}")
        print(f"\nSummary:\n{data['summary']}\n")


if __name__ == "__main__":
    main()
