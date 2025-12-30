// Daily Intelligence - Main JavaScript
// Complete functionality for insights, microlearning, news, and reflections

// Debug mode - set to true for verbose console logging
var DEBUG = false;

function debugLog(message, data) {
    if (DEBUG) {
        if (data !== undefined) {
            console.log('[DI] ' + message, data);
        } else {
            console.log('[DI] ' + message);
        }
    }
}

// Content arrays (INSIGHTS, MICROLEARNINGS, REFLECTIONS) are loaded from separate files:
// - content/insights-content.js (60 items)
// - content/microlearnings-content.js (100 items)
// - content/reflections-content.js (52 items)
// NOTE: The content files must be loaded BEFORE this file in the HTML

// State Management
const state = {
    seenInsights: [],
    seenMicrolearnings: [],
    seenReflections: [],
    quizProgress: {},
    reflections: {},
    currentInsight: null,
    currentMicrolearning: null,
    currentReflection: null,
    expandedArticles: [],
    viewedArticles: []
};

// Daily cache for persisting dashboard content across new tabs
// Refreshes after 12 hours to ensure daily content rotation
const DAILY_CACHE_KEY = 'dashboard_daily_cache';
const CACHE_DURATION_MS = 12 * 60 * 60 * 1000; // 12 hours in milliseconds
let dailyCache = null;

// Check if the cached data is still valid (less than 12 hours old)
function isCacheValid(cache) {
    if (!cache || !cache.timestamp) {
        return false;
    }

    var now = Date.now();
    var cacheAge = now - cache.timestamp;

    // Cache is valid if it's less than 12 hours old
    return cacheAge < CACHE_DURATION_MS;
}

// Load daily cache from localStorage
function loadDailyCache() {
    try {
        var saved = localStorage.getItem(DAILY_CACHE_KEY);
        if (saved) {
            var parsed = JSON.parse(saved);
            if (isCacheValid(parsed)) {
                dailyCache = parsed;
                var hoursRemaining = Math.round((CACHE_DURATION_MS - (Date.now() - parsed.timestamp)) / (60 * 60 * 1000) * 10) / 10;
                debugLog('Cache valid - ' + hoursRemaining + ' hours until refresh');
                return true;
            } else {
                var hoursOld = Math.round((Date.now() - parsed.timestamp) / (60 * 60 * 1000) * 10) / 10;
                debugLog('Cache expired (' + hoursOld + ' hours old)');
                localStorage.removeItem(DAILY_CACHE_KEY);
            }
        }
    } catch (e) {
        console.error('Failed to load daily cache:', e);
        localStorage.removeItem(DAILY_CACHE_KEY);
    }
    dailyCache = null;
    return false;
}

// Save daily cache to localStorage
function saveDailyCache() {
    try {
        if (dailyCache) {
            localStorage.setItem(DAILY_CACHE_KEY, JSON.stringify(dailyCache));
        }
    } catch (e) {
        console.error('Failed to save daily cache:', e);
    }
}

// Initialize a new daily cache
function initDailyCache() {
    dailyCache = {
        timestamp: Date.now(),
        insight: null,
        microlearning: null,
        reflection: null,
        newsData: null
    };
}

// Force refresh all content (manual override)
var isRefreshing = false;

function refreshAllContent() {
    // Prevent rapid clicks causing race conditions
    if (isRefreshing) return;
    isRefreshing = true;

    debugLog('Manual refresh triggered');

    // Preserve reflection question so user doesn't lose their current prompt
    var preservedReflection = dailyCache ? dailyCache.reflection : null;

    // Clear localStorage cache
    localStorage.removeItem(DAILY_CACHE_KEY);

    // Reset in-memory cache
    dailyCache = null;
    summaryData = null;

    // Re-initialize fresh cache
    initDailyCache();

    // Restore reflection question if it existed
    if (preservedReflection && dailyCache) {
        dailyCache.reflection = preservedReflection;
    }

    // Reload all content sections
    loadDailyInsight();
    loadMicrolearning();
    loadDailyReflection();
    loadNews();

    // Reset refresh guard after delay
    setTimeout(function() { isRefreshing = false; }, 1000);

    debugLog('Content refresh complete');
}

// Valid state keys for safe loading
const VALID_STATE_KEYS = ['seenInsights', 'seenMicrolearnings', 'seenReflections',
    'quizProgress', 'reflections', 'expandedArticles', 'viewedArticles'];

// Summary data loaded from summary.json
let summaryData = null;

// Initialize
function init() {
    loadState();
    var cacheIsValid = loadDailyCache();

    // If no valid cache exists, initialize a new one
    if (!cacheIsValid) {
        initDailyCache();
    }

    displayCurrentDate();
    loadDailyInsight();
    loadMicrolearning();
    loadDailyReflection();

    // Load API key first, then load news
    loadApiKey().then(function(key) {
        if (!key) {
            debugLog('No API key - using basic RSS fetching without AI summaries');
        }
        loadNews();
    });

    updateReflectionTrigger();
    setupEventListeners();
}

// Setup all event listeners (no inline handlers)
function setupEventListeners() {
    // Close reflection modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeReflectionModal();
            closeInstructionsModal();
        }
    });

    // Reflection modal backdrop click
    var reflectionModal = document.getElementById('reflectionModal');
    if (reflectionModal) {
        reflectionModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeReflectionModal();
            }
        });
    }

    // Reflection trigger button
    var reflectionTrigger = document.getElementById('reflectionTrigger');
    if (reflectionTrigger) {
        reflectionTrigger.addEventListener('click', openReflectionModal);
    }

    // Reflection modal close button
    var reflectionClose = document.getElementById('reflectionModalClose');
    if (reflectionClose) {
        reflectionClose.addEventListener('click', closeReflectionModal);
    }

    // Next insight button
    var nextInsightBtn = document.getElementById('nextInsightBtn');
    if (nextInsightBtn) {
        nextInsightBtn.addEventListener('click', refreshInsight);
    }

    // Refresh content button
    var refreshBtn = document.getElementById('refreshContentBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', refreshAllContent);
    }

    // Event delegation for dynamically created elements
    document.addEventListener('click', function(e) {
        var target = e.target;

        // Quiz button
        if (target.classList.contains('show-quiz-btn')) {
            var learningId = parseInt(target.getAttribute('data-learning-id'), 10);
            showQuiz(learningId);
            return;
        }

        // Quiz option
        if (target.classList.contains('quiz-option')) {
            var quizId = parseInt(target.getAttribute('data-quiz-id'), 10);
            var optionIdx = parseInt(target.getAttribute('data-option-idx'), 10);
            checkAnswer(quizId, optionIdx);
            return;
        }

        // News header (article toggle)
        var newsHeader = target.closest('.news-header');
        if (newsHeader) {
            var articleId = newsHeader.getAttribute('data-article-id');
            if (articleId) {
                toggleArticle(articleId);
            }
            return;
        }

        // More articles toggle
        if (target.classList.contains('more-articles-toggle') || target.closest('.more-articles-toggle')) {
            var toggleBtn = target.classList.contains('more-articles-toggle') ? target : target.closest('.more-articles-toggle');
            var categoryKey = toggleBtn.getAttribute('data-category');
            if (categoryKey) {
                toggleMoreArticles(categoryKey);
            }
            return;
        }

        // Show regenerate instructions button
        if (target.classList.contains('show-instructions-btn')) {
            showRegenerateInstructions();
            return;
        }

        // Instructions modal close/backdrop
        if (target.id === 'instructions-modal' || target.classList.contains('instructions-modal-close')) {
            closeInstructionsModal();
            return;
        }

        // Save reflection button
        if (target.classList.contains('save-reflection-btn')) {
            saveReflection();
            return;
        }

        // Export reflections button
        if (target.classList.contains('export-reflections-btn')) {
            exportReflections();
            return;
        }
    });
}

function loadState() {
    try {
        var saved = localStorage.getItem('dashboard_state');
        if (saved) {
            var parsed = JSON.parse(saved);
            // Only copy valid/expected properties to prevent injection
            VALID_STATE_KEYS.forEach(function(key) {
                if (parsed.hasOwnProperty(key)) {
                    state[key] = parsed[key];
                }
            });
        }
    } catch (e) {
        console.error('Failed to load state, using defaults:', e);
        localStorage.removeItem('dashboard_state');
    }
}

function saveState() {
    localStorage.setItem('dashboard_state', JSON.stringify(state));
}

function displayCurrentDate() {
    var now = new Date();
    document.getElementById('currentDate').textContent =
        now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

// Daily Insight
function loadDailyInsight() {
    // Guard against empty data array
    if (INSIGHTS.length === 0) {
        document.getElementById('insightDisplay').innerHTML =
            '<p style="color: var(--text-tertiary);">No insights available.</p>';
        return;
    }

    // Check if we have a cached insight for today
    if (dailyCache && dailyCache.insight) {
        var insight = dailyCache.insight;
        state.currentInsight = insight;
        renderInsight(insight);
        return;
    }

    // Generate new insight
    var available = INSIGHTS.filter(function(i) { return state.seenInsights.indexOf(i.id) === -1; });
    if (available.length === 0) {
        state.seenInsights = [];
        available = INSIGHTS; // Use full array instead of recursion
    }

    var insight = available[Math.floor(Math.random() * available.length)];
    state.currentInsight = insight;
    state.seenInsights.push(insight.id);
    saveState();

    // Cache the insight for today
    if (dailyCache) {
        dailyCache.insight = insight;
        saveDailyCache();
    }

    renderInsight(insight);
}

// Render insight to the display
function renderInsight(insight) {
    var sourcesHtml = insight.sources.map(function(s) {
        return '<a href="' + s.url + '" class="source-link" target="_blank">' + s.title + '</a>';
    }).join('');

    document.getElementById('insightDisplay').innerHTML =
        '<span class="insight-category">' + insight.category + '</span>' +
        '<p style="font-size: 1.15rem; line-height: 1.8; margin: 1rem 0; color: var(--text-secondary);">' +
            insight.insight +
        '</p>' +
        '<div style="margin-top: 1.5rem;">' +
            '<div style="font-size: 0.85rem; font-weight: 600; color: var(--text-tertiary); margin-bottom: 0.75rem;">SOURCES</div>' +
            sourcesHtml +
        '</div>';
}

function refreshInsight() {
    // Clear cached insight so a new one is generated
    if (dailyCache) {
        dailyCache.insight = null;
    }
    loadDailyInsight();
}

// Microlearning
function loadMicrolearning() {
    // Guard against empty data array
    if (MICROLEARNINGS.length === 0) {
        document.getElementById('microlearningDisplay').innerHTML =
            '<p style="color: var(--text-tertiary);">No microlearnings available.</p>';
        return;
    }

    // Check if we have a cached microlearning for today
    if (dailyCache && dailyCache.microlearning) {
        var learning = dailyCache.microlearning;
        state.currentMicrolearning = learning;
        renderMicrolearning(learning);
        return;
    }

    // Generate new microlearning
    var available = MICROLEARNINGS.filter(function(m) { return state.seenMicrolearnings.indexOf(m.id) === -1; });
    if (available.length === 0) {
        state.seenMicrolearnings = [];
        available = MICROLEARNINGS; // Use full array instead of recursion
    }

    var learning = available[Math.floor(Math.random() * available.length)];
    state.currentMicrolearning = learning;
    state.seenMicrolearnings.push(learning.id);
    saveState();

    // Cache the microlearning for today
    if (dailyCache) {
        dailyCache.microlearning = learning;
        saveDailyCache();
    }

    renderMicrolearning(learning);
}

// Render microlearning to the display
function renderMicrolearning(learning) {
    var masteredCount = Object.values(state.quizProgress).filter(function(p) { return p.mastery === 'mastered'; }).length;

    var sourcesHtml = learning.sources.map(function(s) {
        return '<a href="' + s.url + '" class="source-link" target="_blank">' + s.title + '</a>';
    }).join('');

    document.getElementById('microlearningDisplay').innerHTML =
        '<div class="progress-bar">' +
            '<div class="progress-fill" style="width: ' + ((masteredCount / MICROLEARNINGS.length) * 100) + '%"></div>' +
        '</div>' +
        '<p style="font-size: 0.85rem; text-align: center; color: var(--text-tertiary); margin-bottom: 1.5rem;">' +
            masteredCount + ' of ' + MICROLEARNINGS.length + ' mastered' +
        '</p>' +
        '<span class="insight-category">' + learning.category + '</span>' +
        '<h3 style="font-size: 1.25rem; margin: 1rem 0;">' + learning.topic + '</h3>' +
        '<p style="line-height: 1.7; color: var(--text-secondary); margin-bottom: 1rem;">' +
            learning.content +
        '</p>' +
        '<div style="margin: 1rem 0;">' + sourcesHtml + '</div>' +
        '<button class="btn show-quiz-btn" data-learning-id="' + learning.id + '">Test Your Knowledge</button>' +
        '<div id="quiz-' + learning.id + '" class="quiz-container"></div>';
}

function showQuiz(id) {
    var learning = MICROLEARNINGS.find(function(m) { return m.id === id; });
    var container = document.getElementById('quiz-' + id);

    var optionsHtml = learning.quiz.options.map(function(opt, idx) {
        return '<div class="quiz-option" data-quiz-id="' + id + '" data-option-idx="' + idx + '">' + opt + '</div>';
    }).join('');

    container.innerHTML =
        '<div style="font-size: 1.1rem; font-weight: 600; margin-bottom: 1.5rem;">' + learning.quiz.question + '</div>' +
        '<div id="options-' + id + '">' + optionsHtml + '</div>' +
        '<div id="feedback-' + id + '"></div>';

    container.style.display = 'block';
}

function checkAnswer(id, selected) {
    var learning = MICROLEARNINGS.find(function(m) { return m.id === id; });
    var isCorrect = selected === learning.quiz.correct;

    var options = document.querySelectorAll('#options-' + id + ' .quiz-option');
    options.forEach(function(opt, idx) {
        opt.style.pointerEvents = 'none';
        if (idx === learning.quiz.correct) opt.classList.add('correct');
        if (idx === selected && !isCorrect) opt.classList.add('incorrect');
    });

    if (!state.quizProgress[id]) {
        state.quizProgress[id] = { correct: 0, attempts: 0, mastery: 'new' };
    }

    state.quizProgress[id].attempts++;
    if (isCorrect) {
        state.quizProgress[id].correct++;
        if (state.quizProgress[id].correct >= 4) {
            state.quizProgress[id].mastery = 'mastered';
        }
    }
    saveState();

    var feedbackHtml = isCorrect
        ? '<div style="margin-top: 1.5rem; padding: 1rem; background: rgba(16, 185, 129, 0.1); border: 1px solid var(--success); border-radius: 8px;">' +
              '<strong>Correct!</strong> ' + learning.quiz.explanation +
          '</div>'
        : '<div style="margin-top: 1.5rem; padding: 1rem; background: rgba(239, 68, 68, 0.1); border: 1px solid var(--error); border-radius: 8px;">' +
              '<strong>Incorrect.</strong> ' + learning.quiz.explanation +
              '<div style="margin-top: 1rem;">' +
                  '<a href="' + learning.quiz.brushUpLink.url + '" class="btn" target="_blank">Brush Up</a>' +
              '</div>' +
          '</div>';

    document.getElementById('feedback-' + id).innerHTML = feedbackHtml;

    // Update the progress bar immediately after answering
    updateProgressBar();
}

// Update just the progress bar without re-rendering the entire microlearning section
function updateProgressBar() {
    var masteredCount = Object.values(state.quizProgress).filter(function(p) { return p.mastery === 'mastered'; }).length;
    var progressFill = document.querySelector('.progress-fill');
    var progressText = document.querySelector('#microlearningDisplay > p');

    if (progressFill) {
        progressFill.style.width = ((masteredCount / MICROLEARNINGS.length) * 100) + '%';
    }
    if (progressText) {
        progressText.textContent = masteredCount + ' of ' + MICROLEARNINGS.length + ' mastered';
    }
}

// ============================================
// NEWS SECTION - Summary.json Integration
// ============================================

// Sample fallback data when summary.json is not available
var FALLBACK_NEWS = {
    ai_news: [
        { title: "Claude 4 Achieves New Benchmarks", source: "TechCrunch", link: "#", description: "Anthropic's latest model shows significant improvements in reasoning and coding benchmarks, marking a new milestone in AI development." },
        { title: "DeepMind's AlphaProof Breakthrough", source: "MIT Tech Review", link: "#", description: "Google DeepMind announces mathematical proof-finding capabilities that could revolutionize formal verification." },
        { title: "OpenAI Introduces GPT-5 Preview", source: "The Verge", link: "#", description: "Early access to next-generation language model shows impressive multimodal reasoning capabilities." }
    ],
    business_news: [
        { title: "Future of Work: Hybrid Models", source: "HBR", link: "#", description: "New research reveals optimal strategies for balancing remote and in-office work to maximize productivity and employee satisfaction." },
        { title: "Digital Transformation ROI 2025", source: "McKinsey", link: "#", description: "Companies investing strategically in AI and cloud see 40% higher returns on digital initiatives." },
        { title: "Platform Business Models", source: "Strategy+Business", link: "#", description: "How network effects and ecosystem thinking are reshaping competitive advantage across industries." }
    ],
    leadership_news: [
        { title: "Building Psychological Safety", source: "HBR Leadership", link: "#", description: "Leaders who create safe environments for risk-taking see 35% higher innovation rates in their teams." },
        { title: "New Rules of Leadership Presence", source: "Fast Company", link: "#", description: "Virtual leadership requires new skills in communication, trust-building, and digital body language." },
        { title: "High-Trust Teams", source: "Inc.", link: "#", description: "Research shows trust accelerates decision-making and reduces management overhead by up to 50%." }
    ]
};

// ============================================
// LIVE RSS FEED FETCHING & GROQ INTEGRATION
// ============================================

// RSS Feed Sources
var RSS_FEED_SOURCES = {
    ai_news: [
        'https://techcrunch.com/category/artificial-intelligence/feed/',
        'https://www.technologyreview.com/feed',
        'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml',
        'https://news.mit.edu/rss/topic/artificial-intelligence2',
        'https://openai.com/blog/rss.xml'
    ],
    business_news: [
        'https://feeds.content.dowjones.io/public/rss/WSJcomUSBusiness',
        'https://www.economist.com/business/rss.xml',
        'https://qz.com/feed'
    ],
    leadership_news: [
        'https://www.fastcompany.com/leadership/rss',
        'https://seths.blog/feed/',
        'https://leadershipfreak.blog/feed/'
    ]
};

// Source Authority Scores (1-10)
var SOURCE_AUTHORITY_SCORES = {
    'mit.edu': 10, 'stanford.edu': 10, 'wharton.upenn.edu': 10,
    'mckinsey.com': 9, 'hbr.org': 9, 'technologyreview.com': 9,
    'openai.com': 9, 'anthropic.com': 9, 'deepmind.com': 9,
    'techcrunch.com': 8, 'wired.com': 8, 'arstechnica.com': 8,
    'theverge.com': 7, 'wsj.com': 8, 'dowjones.io': 8,
    'economist.com': 8, 'qz.com': 7, 'fastcompany.com': 6,
    'seths.blog': 8, 'simonsinek.com': 8, 'leadershipfreak.blog': 7
};

// Groq API Key management
// Loaded from config.js (CONFIG.GROQ_API_KEY)
var groqApiKey = null;

// Load API key from config.js
function loadApiKey() {
    return new Promise(function(resolve) {
        // Use CONFIG from config.js if available
        if (typeof CONFIG !== 'undefined' && CONFIG.GROQ_API_KEY) {
            groqApiKey = CONFIG.GROQ_API_KEY;
            debugLog('API key loaded');
            resolve(groqApiKey);
        } else {
            debugLog('No API key configured');
            groqApiKey = null;
            resolve(null);
        }
    });
}

// Parse RSS XML to articles
function parseRSSXml(xmlText, sourceUrl) {
    var articles = [];
    try {
        var parser = new DOMParser();
        var xml = parser.parseFromString(xmlText, 'text/xml');

        // Try RSS 2.0 format first
        var items = xml.querySelectorAll('item');
        if (items.length === 0) {
            // Try Atom format
            items = xml.querySelectorAll('entry');
        }

        items.forEach(function(item, index) {
            if (index >= 10) return; // Limit to 10 per feed

            var title = item.querySelector('title');
            var link = item.querySelector('link');
            var description = item.querySelector('description, summary, content');
            var pubDate = item.querySelector('pubDate, published, updated');
            var source = xml.querySelector('channel > title, feed > title');

            // Handle Atom link format
            var linkHref = link ? (link.getAttribute('href') || link.textContent) : '';

            // Clean description (remove HTML tags for display)
            var descText = description ? description.textContent : '';
            descText = descText.replace(/<[^>]*>/g, '').substring(0, 300);

            articles.push({
                title: title ? title.textContent.trim() : 'Untitled',
                link: linkHref.trim(),
                description: descText.trim(),
                published: pubDate ? pubDate.textContent : '',
                source: source ? source.textContent.trim() : sourceUrl
            });
        });
    } catch (e) {
        console.error('Error parsing RSS:', e);
    }
    return articles;
}

// Fetch a single RSS feed
function fetchRSSFeed(url) {
    return new Promise(function(resolve) {
        var cacheBuster = Date.now();
        var fetchUrl = url + (url.includes('?') ? '&' : '?') + '_cb=' + cacheBuster;

        fetch(fetchUrl, {
            headers: {
                'Accept': 'application/rss+xml, application/xml, text/xml, application/atom+xml'
            }
        })
        .then(function(response) {
            if (!response.ok) throw new Error('HTTP ' + response.status);
            return response.text();
        })
        .then(function(xmlText) {
            var articles = parseRSSXml(xmlText, url);
            debugLog('Fetched ' + articles.length + ' articles from ' + url);
            resolve(articles);
        })
        .catch(function(error) {
            console.warn('Failed to fetch ' + url + ':', error.message);
            resolve([]);
        });
    });
}

// Fetch all feeds for a category
function fetchCategoryFeeds(category) {
    var feeds = RSS_FEED_SOURCES[category] || [];
    var promises = feeds.map(function(url) {
        return fetchRSSFeed(url);
    });

    return Promise.all(promises).then(function(results) {
        // Flatten and dedupe by title
        var allArticles = [];
        var seenTitles = {};

        results.forEach(function(articles) {
            articles.forEach(function(article) {
                var titleLower = article.title.toLowerCase().trim();
                if (!seenTitles[titleLower]) {
                    seenTitles[titleLower] = true;
                    allArticles.push(article);
                }
            });
        });

        return allArticles;
    });
}

// Get source authority score
function getSourceScore(article) {
    var link = article.link || '';
    try {
        var url = new URL(link);
        var domain = url.hostname.replace('www.', '');

        // Check exact match
        if (SOURCE_AUTHORITY_SCORES[domain]) {
            return SOURCE_AUTHORITY_SCORES[domain];
        }

        // Check partial matches
        for (var source in SOURCE_AUTHORITY_SCORES) {
            if (domain.includes(source) || source.includes(domain)) {
                return SOURCE_AUTHORITY_SCORES[source];
            }
        }

        // Check TLDs
        if (domain.endsWith('.edu')) return 10;
        if (domain.endsWith('.gov')) return 10;

    } catch (e) {}
    return 5; // Default
}

// Calculate recency score (1-10)
function getRecencyScore(article) {
    var published = article.published;
    if (!published) return 5;

    try {
        var pubDate = new Date(published);
        var now = new Date();
        var daysOld = (now - pubDate) / (1000 * 60 * 60 * 24);

        // 10 for today, decreasing by 1.5 per day, minimum 1
        return Math.max(1, Math.round((10 - daysOld * 1.5) * 10) / 10);
    } catch (e) {
        return 5;
    }
}

// Call Groq API for relevance scoring
function getAIRelevanceScores(category, articles) {
    if (!groqApiKey || articles.length === 0) {
        // Return default scores if no API key
        var defaultScores = {};
        articles.forEach(function(art) {
            defaultScores[art.title] = 5;
        });
        return Promise.resolve(defaultScores);
    }

    var articleList = articles.slice(0, 15).map(function(art, i) {
        return (i + 1) + '. ' + art.title;
    }).join('\n');

    var categoryContext = {
        'ai_news': 'AI, machine learning, and technology innovation',
        'business_news': 'business strategy, digital transformation, and enterprise operations',
        'leadership_news': 'leadership development, management practices, and organizational culture'
    };

    var prompt = 'Rate each article\'s relevance (1-10) for an executive focused on ' +
        (categoryContext[category] || 'business') + '.\n\n' +
        'Articles:\n' + articleList + '\n\n' +
        'Respond ONLY with JSON like: {"1": 8, "2": 6, "3": 9}';

    return fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + groqApiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.2,
            max_tokens: 200
        })
    })
    .then(function(response) {
        if (!response.ok) throw new Error('Groq API error');
        return response.json();
    })
    .then(function(data) {
        var content = data.choices[0].message.content;
        var jsonMatch = content.match(/\{[^}]+\}/);
        if (jsonMatch) {
            var scores = JSON.parse(jsonMatch[0]);
            var result = {};
            articles.slice(0, 15).forEach(function(art, i) {
                result[art.title] = scores[String(i + 1)] || 5;
            });
            return result;
        }
        throw new Error('Invalid response');
    })
    .catch(function(error) {
        console.warn('AI scoring failed:', error.message);
        var defaultScores = {};
        articles.forEach(function(art) {
            defaultScores[art.title] = 5;
        });
        return defaultScores;
    });
}

// Generate executive summary using Groq
function generateSummary(category, articles) {
    if (!groqApiKey || articles.length === 0) {
        return Promise.resolve(null);
    }

    var articleText = articles.slice(0, 8).map(function(art) {
        return 'Title: ' + art.title + '\nDescription: ' + (art.description || '').substring(0, 200);
    }).join('\n\n');

    var categoryNames = {
        'ai_news': 'AI and Machine Learning',
        'business_news': 'Business Operations and Strategy',
        'leadership_news': 'Leadership and Management'
    };

    var prompt = 'Summarize these ' + (categoryNames[category] || category) +
        ' articles in 3-4 sentences for an executive. Focus on key trends and actionable insights.\n\n' +
        articleText + '\n\nProvide a brief, high-value summary:';

    return fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + groqApiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.3,
            max_tokens: 300
        })
    })
    .then(function(response) {
        if (!response.ok) throw new Error('Groq API error');
        return response.json();
    })
    .then(function(data) {
        return data.choices[0].message.content.trim();
    })
    .catch(function(error) {
        console.warn('Summary generation failed:', error.message);
        return null;
    });
}

// Score and sort articles
function scoreAndSortArticles(category, articles, aiScores) {
    articles.forEach(function(article) {
        var aiScore = aiScores[article.title] || 5;
        var sourceScore = getSourceScore(article);
        var recencyScore = getRecencyScore(article);
        var combined = (aiScore * 0.5) + (sourceScore * 0.3) + (recencyScore * 0.2);

        article.scores = {
            ai_relevance: aiScore,
            source_authority: sourceScore,
            recency: recencyScore,
            combined: Math.round(combined * 100) / 100
        };
    });

    articles.sort(function(a, b) {
        return (b.scores.combined || 0) - (a.scores.combined || 0);
    });

    return articles;
}

// Fetch and process all news for a category
function fetchAndProcessCategory(category) {
    return fetchCategoryFeeds(category)
        .then(function(articles) {
            if (articles.length === 0) {
                return { articles: [], summary: null };
            }

            return getAIRelevanceScores(category, articles)
                .then(function(aiScores) {
                    var scoredArticles = scoreAndSortArticles(category, articles, aiScores);
                    return generateSummary(category, scoredArticles)
                        .then(function(summary) {
                            return {
                                articles: scoredArticles,
                                summary: summary,
                                article_count: scoredArticles.length,
                                sources: [...new Set(scoredArticles.map(function(a) { return a.source; }))]
                            };
                        });
                });
        });
}

// Helper: Convert timestamp to human-readable "time ago" format
function timeAgo(dateString) {
    if (!dateString) return '';

    try {
        var date = new Date(dateString);
        var now = new Date();
        var diffMs = now - date;
        var diffMins = Math.floor(diffMs / 60000);
        var diffHours = Math.floor(diffMs / 3600000);
        var diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) return diffMins + ' minute' + (diffMins !== 1 ? 's' : '') + ' ago';
        if (diffHours < 24) return diffHours + ' hour' + (diffHours !== 1 ? 's' : '') + ' ago';
        if (diffDays < 7) return diffDays + ' day' + (diffDays !== 1 ? 's' : '') + ' ago';

        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch (e) {
        return '';
    }
}

// Helper: Escape HTML to prevent XSS (for use with innerHTML)
function escapeHTML(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Alias for backward compatibility
var sanitizeHTML = escapeHTML;

// Helper: Validate URL is safe (http/https only)
function isValidURL(str) {
    try {
        var url = new URL(str);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (e) {
        return false;
    }
}

// Helper: Safe URL for href attributes
function safeURL(str) {
    return isValidURL(str) ? str : '#';
}

// Helper: Truncate text with ellipsis
function truncateText(text, maxLength) {
    maxLength = maxLength || 300;
    if (!text || text.length <= maxLength) return text || '';
    return text.substring(0, maxLength).trim() + '...';
}

// Helper: Create a unique ID for an article
function getArticleId(article) {
    return article.link || article.title || '';
}

// Helper: Unicode-safe encoding for element IDs
function safeEncodeId(str) {
    try {
        return btoa(encodeURIComponent(str)).replace(/[^a-zA-Z0-9]/g, '');
    } catch (e) {
        // Fallback to simple hash for problematic strings
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash |= 0;
        }
        return 'id' + Math.abs(hash);
    }
}

// Toggle article expansion
function toggleArticle(articleId) {
    var encodedId = safeEncodeId(articleId);
    var element = document.getElementById('article-' + encodedId);

    if (!element) return;

    var isExpanded = element.classList.contains('expanded');

    if (isExpanded) {
        element.classList.remove('expanded');
        state.expandedArticles = state.expandedArticles.filter(function(id) { return id !== articleId; });
    } else {
        element.classList.add('expanded');
        if (state.expandedArticles.indexOf(articleId) === -1) {
            state.expandedArticles.push(articleId);
        }
        if (state.viewedArticles.indexOf(articleId) === -1) {
            state.viewedArticles.push(articleId);
            element.classList.add('viewed');
        }
    }

    saveState();
}

// Load news by fetching live RSS feeds
function loadNews() {
    // Check if we have cached news data for today
    if (dailyCache && dailyCache.newsData) {
        debugLog('Using cached news data');
        summaryData = dailyCache.newsData;
        renderNewsSectionFromCache();
        return;
    }

    // Show loading state
    var newsContainers = ['aiNewsDisplay', 'businessNewsDisplay', 'leadershipNewsDisplay'];
    newsContainers.forEach(function(id) {
        var container = document.getElementById(id);
        if (container) {
            container.innerHTML = '<p style="color: var(--text-tertiary); text-align: center; padding: 2rem;">Fetching live news from RSS feeds...</p>';
        }
    });

    debugLog('Fetching live RSS feeds...');

    // Fetch all three categories in parallel
    var categories = ['ai_news', 'business_news', 'leadership_news'];
    var displayIds = ['aiNewsDisplay', 'businessNewsDisplay', 'leadershipNewsDisplay'];

    // Process each category
    categories.forEach(function(category, index) {
        fetchAndProcessCategory(category)
            .then(function(categoryData) {
                debugLog('Processed ' + category + ': ' + categoryData.articles.length + ' articles');

                // Store in summaryData structure
                if (!summaryData) {
                    summaryData = { generated_at: new Date().toISOString(), summaries: {} };
                }
                summaryData.summaries[category] = categoryData;

                // Render this section
                renderNewsSection(displayIds[index], category, categoryData);

                // Cache after all categories are done
                if (summaryData.summaries.ai_news && summaryData.summaries.business_news && summaryData.summaries.leadership_news) {
                    if (dailyCache) {
                        dailyCache.newsData = summaryData;
                        saveDailyCache();
                        debugLog('News data cached');
                    }
                }
            })
            .catch(function(error) {
                console.error('Error fetching ' + category + ':', error);
                renderNewsSection(displayIds[index], category, null);
            });
    });
}

// Render news sections from cached data
function renderNewsSectionFromCache() {
    if (summaryData && summaryData.summaries) {
        renderNewsSection('aiNewsDisplay', 'ai_news', summaryData.summaries.ai_news);
        renderNewsSection('businessNewsDisplay', 'business_news', summaryData.summaries.business_news);
        renderNewsSection('leadershipNewsDisplay', 'leadership_news', summaryData.summaries.leadership_news);
    } else {
        renderNewsSection('aiNewsDisplay', 'ai_news', null);
        renderNewsSection('businessNewsDisplay', 'business_news', null);
        renderNewsSection('leadershipNewsDisplay', 'leadership_news', null);
    }
}

// Render a single article item (no inline handlers)
function renderArticleItem(article) {
    var articleId = getArticleId(article);
    var encodedId = safeEncodeId(articleId);
    var isViewed = state.viewedArticles.indexOf(articleId) !== -1;
    var isExpanded = state.expandedArticles.indexOf(articleId) !== -1;
    var timeAgoStr = timeAgo(article.published);
    var description = escapeHTML(article.description || article.summary || '');
    var displayDescription = description || 'No description available.';
    var articleLink = safeURL(article.link || article.url || '');

    // Score badge (only show if scores exist)
    var scoreBadge = '';
    if (article.scores && article.scores.combined) {
        scoreBadge = '<span class="article-score-badge">' + article.scores.combined.toFixed(1) + '</span>';
    }

    return '<div id="article-' + encodedId + '" class="news-item ' + (isViewed ? 'viewed' : '') + ' ' + (isExpanded ? 'expanded' : '') + '">' +
        '<div class="news-header" data-article-id="' + escapeHTML(articleId) + '">' +
            '<span class="expand-icon">&#9654;</span>' +
            '<div class="news-content">' +
                '<div class="news-title">' +
                    '<a href="' + articleLink + '" target="_blank" rel="noopener noreferrer">' + escapeHTML(article.title) + '</a>' +
                    scoreBadge +
                '</div>' +
                '<div style="font-size: 0.8rem; color: var(--text-tertiary); margin-top: 0.35rem;">' +
                    escapeHTML(article.source) + (timeAgoStr ? ' - ' + timeAgoStr : '') +
                '</div>' +
            '</div>' +
        '</div>' +
        '<div class="news-description">' +
            '<p class="news-description-text">' + truncateText(displayDescription, 400) + '</p>' +
            '<a href="' + articleLink + '" class="read-full-link" target="_blank" rel="noopener noreferrer">Read Full Article &rarr;</a>' +
        '</div>' +
    '</div>';
}

// Toggle more articles visibility
function toggleMoreArticles(categoryKey) {
    var toggle = document.getElementById('more-toggle-' + categoryKey);
    var container = document.getElementById('more-articles-' + categoryKey);

    if (toggle && container) {
        toggle.classList.toggle('expanded');
        container.classList.toggle('expanded');
    }
}

// Render a complete news section with summary and articles (top 3 + collapsible rest)
function renderNewsSection(elementId, categoryKey, categoryData) {
    var container = document.getElementById(elementId);
    var html = '';

    if (categoryData && categoryData.summary) {
        var generatedAt = summaryData && summaryData.generated_at
            ? new Date(summaryData.generated_at).toLocaleString('en-US', {
                month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
              })
            : 'Unknown';
        var articleCount = categoryData.article_count || (categoryData.articles ? categoryData.articles.length : 0);

        html += '<div class="executive-summary">' +
            '<div class="executive-summary-header">' +
                '<span class="executive-summary-title">Executive Summary</span>' +
                '<span class="executive-summary-meta">' + articleCount + ' articles - Generated ' + generatedAt + '</span>' +
            '</div>' +
            '<p class="executive-summary-text">' + sanitizeHTML(categoryData.summary) + '</p>' +
        '</div>';
    } else {
        html += '<div class="summary-unavailable">' +
            '<p class="summary-unavailable-text">Add a Groq API key to enable AI-powered executive summaries.</p>' +
            '<button class="btn-secondary show-instructions-btn">Configure API Key</button>' +
        '</div>';
    }

    var articles = (categoryData && categoryData.articles) ? categoryData.articles : (FALLBACK_NEWS[categoryKey] || []);

    // Split into top 3 and the rest
    var topArticles = articles.slice(0, 3);
    var moreArticles = articles.slice(3);

    // Render top 3 articles
    html += '<div class="top-articles-section">';
    topArticles.forEach(function(article) {
        html += renderArticleItem(article);
    });
    html += '</div>';

    // Render remaining articles in collapsible section
    if (moreArticles.length > 0) {
        html += '<button id="more-toggle-' + categoryKey + '" class="more-articles-toggle" data-category="' + categoryKey + '">' +
            '<span class="toggle-icon">&#9660;</span>' +
            '<span>' + moreArticles.length + ' more article' + (moreArticles.length > 1 ? 's' : '') + '</span>' +
        '</button>';

        html += '<div id="more-articles-' + categoryKey + '" class="more-articles-container">';
        moreArticles.forEach(function(article) {
            html += renderArticleItem(article);
        });
        html += '</div>';
    }

    container.innerHTML = html;
}

// Show API key settings modal
function showRegenerateInstructions() {
    var hasKey = groqApiKey ? true : false;
    var maskedKey = hasKey ? groqApiKey.substring(0, 8) + '...' + groqApiKey.substring(groqApiKey.length - 4) : '';

    var modal = document.createElement('div');
    modal.id = 'instructions-modal';
    modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:1000;';

    var content = '<div style="background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:12px;padding:2rem;max-width:500px;margin:1rem;">' +
        '<h3 style="font-family:var(--font-display);margin-bottom:1.5rem;color:var(--accent-amber);">News Settings</h3>';

    if (hasKey) {
        content += '<p style="color:var(--success);margin-bottom:1rem;">API key configured: ' + maskedKey + '</p>' +
            '<p style="color:var(--text-secondary);margin-bottom:1.5rem;">AI-powered executive summaries and relevance scoring are enabled.</p>';
    } else {
        content += '<p style="color:var(--text-secondary);margin-bottom:1rem;">To enable AI-powered summaries, add your Groq API key to <code style="background:var(--bg-primary);padding:0.2rem 0.4rem;border-radius:4px;">config.js</code>:</p>' +
            '<pre style="background:var(--bg-primary);padding:1rem;border-radius:6px;margin-bottom:1rem;overflow-x:auto;font-size:0.85rem;color:var(--text-secondary);">var CONFIG = {\n    GROQ_API_KEY: \'your_key_here\'\n};</pre>' +
            '<p style="color:var(--text-tertiary);font-size:0.85rem;margin-bottom:1.5rem;">Get a free key at <a href="https://console.groq.com/keys" target="_blank" style="color:var(--accent-cyan);">console.groq.com/keys</a></p>';
    }

    content += '<button class="btn instructions-modal-close">Got it</button>' +
        '</div>';

    modal.innerHTML = content;
    document.body.appendChild(modal);
}

function closeInstructionsModal() {
    var modal = document.getElementById('instructions-modal');
    if (modal) {
        modal.remove();
    }
}

// Reflection - Show question in dashboard, button opens input modal
function loadDailyReflection() {
    // Guard against empty data array
    if (REFLECTIONS.length === 0) {
        var questionDisplay = document.getElementById('reflectionQuestionDisplay');
        if (questionDisplay) {
            questionDisplay.innerHTML = '<p style="color: var(--text-tertiary);">No reflections available.</p>';
        }
        return;
    }

    var today = new Date().toISOString().split('T')[0];

    // Check if we already have a saved reflection for today
    if (state.reflections[today]) {
        state.currentReflection = { question: state.reflections[today].question };
        renderReflectionQuestion(state.reflections[today].question);
        renderReflectionModal(state.reflections[today].question, state.reflections[today].response);
        return;
    }

    // Check if we have a cached reflection question for today (even without saved response)
    if (dailyCache && dailyCache.reflection) {
        var reflection = dailyCache.reflection;
        state.currentReflection = reflection;
        renderReflectionQuestion(reflection.question);
        renderReflectionModal(reflection.question, '');
        return;
    }

    // Get a new reflection question
    var available = REFLECTIONS.filter(function(r) { return state.seenReflections.indexOf(r.id) === -1; });
    if (available.length === 0) {
        state.seenReflections = [];
        available = REFLECTIONS; // Use full array instead of recursion
    }

    var reflection = available[Math.floor(Math.random() * available.length)];
    state.currentReflection = reflection;
    state.seenReflections.push(reflection.id);
    saveState();

    // Cache the reflection question for today
    if (dailyCache) {
        dailyCache.reflection = reflection;
        saveDailyCache();
    }

    renderReflectionQuestion(reflection.question);
    renderReflectionModal(reflection.question, '');
}

// Render the reflection question in the dashboard (always visible)
function renderReflectionQuestion(question) {
    var questionDisplay = document.getElementById('reflectionQuestionDisplay');
    if (questionDisplay) {
        questionDisplay.innerHTML = '<p class="reflection-question">' + question + '</p>';
    }
}

// Render the reflection modal content (input area)
function renderReflectionModal(question, savedResponse) {
    var modalContent = document.getElementById('reflectionModalContent');
    if (modalContent) {
        var lastSavedText = '';
        var today = new Date().toISOString().split('T')[0];
        if (state.reflections[today] && state.reflections[today].timestamp) {
            lastSavedText = '<p style="color: var(--text-tertiary); font-size: 0.85rem; margin-top: 1rem;">Last saved: ' + new Date(state.reflections[today].timestamp).toLocaleString() + '</p>';
        }

        modalContent.innerHTML =
            '<p class="reflection-question" style="margin-bottom: 1.5rem;">' + question + '</p>' +
            '<textarea id="reflectionText" class="reflection-textarea" placeholder="Take your time... this is for you.">' + (savedResponse || '') + '</textarea>' +
            '<div class="reflection-actions" style="margin-top: 1rem;">' +
                '<button class="btn save-reflection-btn">' + (savedResponse ? 'Update Reflection' : 'Save Reflection') + '</button>' +
                '<button class="btn export-reflections-btn">Export as Markdown</button>' +
            '</div>' +
            lastSavedText;
    }
}

function saveReflection() {
    var today = new Date().toISOString().split('T')[0];
    var textArea = document.getElementById('reflectionText');
    var text = textArea ? textArea.value : '';

    if (!text.trim()) {
        alert('Please write something before saving');
        return;
    }

    state.reflections[today] = {
        question: state.currentReflection.question,
        response: text,
        timestamp: new Date().toISOString()
    };

    saveState();
    updateReflectionTrigger();
    renderReflectionModal(state.currentReflection.question, text);
    alert('Reflection saved!');
}

// Reflection Modal Functions
function openReflectionModal() {
    document.getElementById('reflectionModal').classList.add('active');
    document.body.style.overflow = 'hidden';
    // Focus on textarea
    var textArea = document.getElementById('reflectionText');
    if (textArea) {
        textArea.focus();
    }
}

function closeReflectionModal() {
    var modal = document.getElementById('reflectionModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function updateReflectionTrigger() {
    var today = new Date().toISOString().split('T')[0];
    var trigger = document.getElementById('reflectionTrigger');
    if (!trigger) return;

    var hasResponse = state.reflections[today] && state.reflections[today].response;

    if (hasResponse) {
        trigger.classList.add('has-response');
        trigger.innerHTML = '<span>&#10003; View/Edit Reflection</span>';
    } else {
        trigger.classList.remove('has-response');
        trigger.innerHTML = '<span>Write Reflection</span>';
    }
}

function exportReflections() {
    var entries = Object.entries(state.reflections).sort(function(a, b) { return b[0].localeCompare(a[0]); });

    if (entries.length === 0) {
        alert('No reflections to export');
        return;
    }

    var markdown = '# Daily Reflections\n\n';
    entries.forEach(function(entry) {
        var date = entry[0];
        var data = entry[1];
        var formatted = new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        markdown += '## ' + formatted + '\n\n';
        markdown += '**Question:** ' + data.question + '\n\n';
        markdown += data.response + '\n\n';
        markdown += '---\n\n';
    });

    var blob = new Blob([markdown], { type: 'text/markdown' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'reflections-' + new Date().toISOString().split('T')[0] + '.md';
    a.click();
    URL.revokeObjectURL(url);
}

// Start App
window.addEventListener('DOMContentLoaded', init);
